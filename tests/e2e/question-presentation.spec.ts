import { test, expect, type Locator, type Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import type { ExamSpec } from "../../src/domain/exams";
import type { ExamDraft, ExamItem } from "../../src/domain/examModel";
import { initialState, type AppState } from "../../src/domain/model";
import { questionPresentationRevisions } from "../../src/domain/questionPresentation";

let lessonById: typeof import("../../src/domain/content").lessonById;
let subjects: typeof import("../../src/domain/content").subjects;
let beginExam: typeof import("../../src/domain/exams").beginExam;
let validateState: typeof import("../../src/domain/storage").validateState;

// Load the actual source modules with the app's JSON handling. Native Node ESM
// cannot directly import content.ts's existing JSON imports without attributes.
test.beforeAll(async ({}, testInfo) => {
  const source = await createServer({
    root: fileURLToPath(new URL("../..", import.meta.url)),
    configFile: false,
    cacheDir: testInfo.outputPath("fixture-source-cache"),
    optimizeDeps: { noDiscovery: true, include: [] },
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
  });
  try {
    const [content, exams, storage] = await Promise.all([
      source.ssrLoadModule("/src/domain/content.ts"),
      source.ssrLoadModule("/src/domain/exams.ts"),
      source.ssrLoadModule("/src/domain/storage.ts"),
    ]);
    lessonById = content.lessonById;
    subjects = content.subjects;
    beginExam = exams.beginExam;
    validateState = storage.validateState;
  } finally {
    await source.close();
  }
});

// These science expectations are independent of the presentation implementation.
const cases = [
  {
    lessonId: "dogrusal-hareket",
    questionId: "ns-motion-4",
    prompt:
      "Doğrusal hareket yapan bir cismin hız–zaman ilişkisinin ilk bölümü boyunca hızı sıfır veya pozitif, ikinci bölümü boyunca sıfır veya negatiftir. İlk bölümdeki işaretli alan +12 m, ikinci bölümdeki işaretli alan −5 m’dir. Başka bölüm yoktur. Toplam yer değiştirme ve alınan yol nedir?",
    conditions: [
      "Doğrusal hareket yapan",
      "ilk bölümü boyunca hızı sıfır veya pozitif",
      "ikinci bölümü boyunca sıfır veya negatiftir",
    ],
  },
  {
    lessonId: "enerji-ve-hareket",
    questionId: "ns-energy-4",
    prompt:
      "Başlangıçta mekanik enerjisi 200 J olan bir sistemde mekanik enerji yalnız kinetik enerji ile yerçekimi potansiyel enerjisinin toplamıdır. Mekanik enerjinin 40 J kadarı iç enerjiye aktarılır; mekanik enerjiyi değiştiren başka bir aktarım yoktur. Son yerçekimi potansiyel enerjisi 60 J ise son kinetik enerji nedir?",
    conditions: [
      "Başlangıçta mekanik enerjisi 200 J",
      "mekanik enerji yalnız kinetik enerji ile yerçekimi potansiyel enerjisinin toplamıdır",
      "Mekanik enerjinin 40 J kadarı iç enerjiye aktarılır",
      "mekanik enerjiyi değiştiren başka bir aktarım yoktur",
    ],
  },
];

test.use({ locale: "tr-TR" });

async function nav(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}

async function stored(page: Page): Promise<AppState> {
  return page.evaluate(
    () =>
      new Promise<AppState>((resolve, reject) => {
        const request = indexedDB.open("yksmania");
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const database = request.result;
          const read = database
            .transaction("state")
            .objectStore("state")
            .get("current");
          read.onerror = () => {
            database.close();
            reject(read.error);
          };
          read.onsuccess = () => {
            database.close();
            if (read.result) resolve(read.result);
            else reject(new Error("Expected a durable application state"));
          };
        };
      }),
  );
}

async function offlineReady(page: Page) {
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller)
      await new Promise<void>((resolve) =>
        navigator.serviceWorker.addEventListener(
          "controllerchange",
          () => resolve(),
          { once: true },
        ),
      );
  });
}

async function expectConditions(
  heading: Locator,
  item: (typeof cases)[number],
) {
  await expect(heading).toBeVisible();
  await expect(heading).toHaveText(item.prompt);
  for (const condition of item.conditions)
    await expect(heading).toContainText(condition);
}

async function checkStudyAnswer(
  page: Page,
  selected: number,
  correct: boolean,
) {
  const answer = page.locator(".answer").nth(selected);
  await answer.click();
  await expect(answer).toHaveAttribute("aria-pressed", "true");
  await page
    .getByRole("button", { name: "Cevabı kontrol et", exact: true })
    .click();
  await expect(
    page.locator(correct ? ".feedback.correct" : ".feedback.repair"),
  ).toBeVisible();
}

for (const item of cases) {
  test(`${item.questionId}: ordinary Questions and offline Mistakes clarify the stem without rewriting the attempt`, async ({
    page,
    context,
  }, testInfo) => {
    test.setTimeout(90_000);
    const lesson = lessonById(item.lessonId)!;
    const rawQuestions = JSON.stringify(lesson.questions);
    expect(lesson.questions).toHaveLength(5);
    expect(lesson.questions[3].id).toBe(item.questionId);
    const note = `Sunum revizyonu kaydı: ${item.questionId}; ÇĞİÖŞÜ +12 −5.`;
    const selections = lesson.questions.map((question, index) =>
      index === 3
        ? (question.answer + 1) % question.options.length
        : question.answer,
    );
    const responses = lesson.questions.map((question, index) => ({
      questionId: question.id,
      selected: selections[index],
      correct: index !== 3,
      assisted: false,
      confidence: "medium",
    }));

    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Bugün", exact: true }),
    ).toBeVisible();
    await nav(page, "Sorular");
    await page
      .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
      .fill(lesson.title.tr);
    await page
      .locator(`.ready-topic[data-lesson-id="${item.lessonId}"]`)
      .click();
    await expect(page.locator(".question-panel")).toBeVisible();
    await page.getByRole("textbox", { name: "Notun", exact: true }).fill(note);
    await expect.poll(async () => (await stored(page)).draft?.note).toBe(note);
    const startedAt = (await stored(page)).draft!.startedAt;
    expect(startedAt).toBeGreaterThan(0);

    for (let index = 0; index < 3; index++) {
      await expect(page.locator(".question-meta")).toContainText(
        `Soru ${index + 1} / 5`,
      );
      await expect(page.locator(".question-panel h2")).toHaveText(
        lesson.questions[index].prompt.tr,
      );
      await checkStudyAnswer(page, selections[index], true);
      await page
        .getByRole("button", { name: "Sonraki soru", exact: true })
        .click();
    }

    await expectConditions(page.locator(".question-panel h2"), item);
    await checkStudyAnswer(page, selections[3], false);
    await expect
      .poll(async () => (await stored(page)).draft?.responses)
      .toEqual(responses.slice(0, 4));
    const checkedFourth = (await stored(page)).draft!;
    expect(checkedFourth).toMatchObject({
      lessonId: item.lessonId,
      index: 3,
      selected: selections[3],
      checked: true,
      note,
      startedAt,
    });

    await offlineReady(page);
    await context.setOffline(true);
    await page.reload();
    await expectConditions(page.locator(".question-panel h2"), item);
    await expect(page.locator(".feedback.repair")).toBeVisible();
    await expect(
      page.getByRole("textbox", { name: "Notun", exact: true }),
    ).toHaveValue(note);
    expect((await stored(page)).draft).toEqual(checkedFourth);
    await page
      .getByRole("button", { name: "Sonraki soru", exact: true })
      .click();
    await expect(page.locator(".question-panel h2")).toHaveText(
      lesson.questions[4].prompt.tr,
    );
    await checkStudyAnswer(page, selections[4], true);
    await page
      .getByRole("button", { name: "Çalışmayı kaydet", exact: true })
      .click();
    await expect(
      page.locator(".result-stats > div").first().locator("strong"),
    ).toHaveText("4/5");
    await expect.poll(async () => (await stored(page)).sessions.length).toBe(1);
    const completed = await stored(page);
    expect(completed.draft).toBeNull();
    expect(completed.sessions[0]).toMatchObject({
      id: `session:${startedAt}:${item.lessonId}`,
      lessonId: item.lessonId,
      note,
      responses,
      kind: "learn",
      includesTheory: false,
    });
    expect(
      completed.sessions[0].responses.filter((response) => response.correct),
    ).toHaveLength(4);
    const sessionBytes = JSON.stringify(completed.sessions);

    await page.reload();
    await expect(
      page.locator(".result-stats > div").first().locator("strong"),
    ).toHaveText("4/5");
    await nav(page, "Yanlışlarım");
    await expect(page.locator(".mistake-card")).toHaveCount(1);
    await expectConditions(page.locator(".mistake-card h2"), item);
    const viewed = await stored(page);
    expect(JSON.stringify(viewed.sessions)).toBe(sessionBytes);
    expect(viewed).toEqual(completed);
    expect(JSON.stringify(lesson.questions)).toBe(rawQuestions);
    await testInfo.attach("presentation-study-persisted-state.json", {
      body: Buffer.from(
        JSON.stringify(
          { canonicalNote: note, startedAt, checkedFourth, completed, viewed },
          null,
          2,
        ),
      ),
      contentType: "application/json",
    });
  });
}

test("a validated legacy raw two-item exam renders clarified conditions while retaining its original saved paper", async ({
  page,
  context,
}, testInfo) => {
  test.setTimeout(90_000);
  // This is a current-schema fixture, not a claim that an old binary was run.
  const rawItems: ExamItem[] = cases.map((item) => {
    const lesson = lessonById(item.lessonId)!;
    const subject = subjects.find((entry) => entry.id === lesson.subjectId)!;
    const before = questionPresentationRevisions.find(
      (revision) => revision.id === item.questionId,
    )!.before;
    return {
      id: before.id,
      lessonId: lesson.id,
      subjectId: subject.id,
      subjectName: subject.name.tr,
      lessonTitle: lesson.title.tr,
      prompt: before.prompt,
      options: [...before.options],
      answer: before.answer,
      explanation: before.explanation,
      hint: before.hint,
    };
  });
  const rawItemBytes = JSON.stringify(rawItems);
  const spec: ExamSpec = {
    id: "presentation-e2e-legacy-raw-two",
    title: "İki özgün fizik sorusu · kayıtlı ham sınav",
    exam: "TYT",
    kind: "branch",
    items: rawItems,
    durationSeconds: 3600,
    fullLength: false,
    missingSubjects: [],
  };
  const fixture = validateState(
    beginExam(initialState(), spec, Date.now(), "learning"),
  );
  const draft = fixture.examDraft!;
  expect(JSON.stringify(draft.items)).toBe(rawItemBytes);
  for (let index = 0; index < cases.length; index++)
    expect(draft.items[index].prompt).not.toBe(cases[index].prompt);

  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Bugün", exact: true }),
  ).toBeVisible();
  const seeded = await page.evaluate(
    ({ examDraft, fallback }: { examDraft: ExamDraft; fallback: AppState }) =>
      new Promise<{ before: AppState; after: AppState }>((resolve, reject) => {
        const request = indexedDB.open("yksmania");
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const database = request.result;
          const transaction = database.transaction("state", "readwrite");
          const store = transaction.objectStore("state");
          const read = store.get("current");
          let before: AppState, after: AppState;
          read.onsuccess = () => {
            before = read.result ?? fallback;
            after = { ...before, examDraft };
            store.put(after, "current");
          };
          transaction.oncomplete = () => {
            database.close();
            resolve({ before, after });
          };
          transaction.onerror = () => reject(transaction.error);
          transaction.onabort = () => reject(transaction.error);
        };
      }),
    { examDraft: draft, fallback: initialState() },
  );
  expect(validateState(seeded.after)).toEqual(seeded.after);
  expect({ ...seeded.after, examDraft: seeded.before.examDraft }).toEqual(
    seeded.before,
  );
  await page.reload();
  await nav(page, "Sınavlar");
  await expect(page.locator(".exam-runner")).toBeVisible();
  expect(await stored(page)).toEqual(seeded.after);

  for (let index = 0; index < cases.length; index++) {
    await expectConditions(page.locator(".exam-question h2"), cases[index]);
    expect(JSON.stringify((await stored(page)).examDraft!.items)).toBe(
      rawItemBytes,
    );
    const answer = page.locator(".exam-answer").nth(rawItems[index].answer);
    await answer.click();
    await expect(answer).toHaveAttribute("aria-pressed", "true");
    await expect
      .poll(async () => (await stored(page)).examDraft?.answers[index])
      .toBe(rawItems[index].answer);
    if (index === 0) {
      await page
        .getByRole("button", {
          name: "Sonra bakmak için işaretle",
          exact: true,
        })
        .click();
      await expect(
        page.getByRole("button", {
          name: "Soru 1, yanıtlandı, işaretli",
          exact: true,
        }),
      ).toBeVisible();
      await page
        .getByRole("button", { name: "Sonraki soru", exact: true })
        .click();
    }
  }
  const answeredDraft = (await stored(page)).examDraft!;
  expect(answeredDraft.answers).toEqual(rawItems.map((item) => item.answer));
  expect(answeredDraft.flagged).toEqual([0]);
  expect(answeredDraft.deadline).toBe(draft.deadline);
  expect(answeredDraft.startedAt).toBe(draft.startedAt);
  expect(JSON.stringify(answeredDraft.items)).toBe(rawItemBytes);

  await page
    .getByRole("button", { name: "Denemeyi bitir", exact: true })
    .click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Bitir ve sonucu gör", exact: true })
    .click();
  await expect(page.locator(".exam-results")).toBeVisible();
  await expect
    .poll(async () => (await stored(page)).examSessions.length)
    .toBe(1);
  const completed = await stored(page);
  expect(completed.examDraft).toBeNull();
  const { finishedAt, timedOut, ...savedDraft } = completed.examSessions[0];
  expect(savedDraft).toEqual(answeredDraft);
  expect(finishedAt).toBeGreaterThanOrEqual(draft.startedAt);
  expect(finishedAt).toBeLessThan(draft.deadline);
  expect(timedOut).toBe(false);
  expect({
    ...completed,
    examDraft: seeded.before.examDraft,
    examSessions: seeded.before.examSessions,
  }).toEqual(seeded.before);
  const sessionBytes = JSON.stringify(completed.examSessions);

  for (let index = 0; index < cases.length; index++) {
    const solution = page.locator(".exam-solution").nth(index);
    await solution.locator("summary").click();
    await expectConditions(solution.locator("h3"), cases[index]);
  }
  expect(await stored(page)).toEqual(completed);
  await offlineReady(page);
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator(".exam-results")).toBeVisible();
  for (let index = 0; index < cases.length; index++) {
    const solution = page.locator(".exam-solution").nth(index);
    await solution.locator("summary").click();
    await expectConditions(solution.locator("h3"), cases[index]);
  }
  const reloaded = await stored(page);
  expect(JSON.stringify(reloaded.examSessions)).toBe(sessionBytes);
  expect(JSON.stringify(reloaded.examSessions[0].items)).toBe(rawItemBytes);
  expect(reloaded).toEqual(completed);
  await testInfo.attach("presentation-exam-persisted-state.json", {
    body: Buffer.from(
      JSON.stringify(
        { fixtureDraft: draft, seeded, answeredDraft, completed, reloaded },
        null,
        2,
      ),
    ),
    contentType: "application/json",
  });
});
