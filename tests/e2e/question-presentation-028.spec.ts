import { typeset } from "../../src/domain/typeset";
import {
  test,
  expect,
  type Locator,
  type Page,
  type TestInfo,
} from "@playwright/test";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import {
  initialState,
  type AppState,
  type Question,
} from "../../src/domain/model";
import type { ExamSpec } from "../../src/domain/exams";
import type { ExamDraft, ExamItem } from "../../src/domain/examModel";
import type {
  HelpQuestion,
  QuestionGuidance,
} from "../../src/domain/questionHelpModel";
import { expectGuideSections, guideSectionCount } from "./helpers/guidePages";

registerOfflineBootDiagnostics();

// Approved copy is deliberately literal: expected views are never obtained by
// calling the presentation function under test. Unchanged fields use real raw Qs.
const corrections: Record<string, Partial<HelpQuestion>> = {
  "snd-10": {
    options: [
      "Başla kökündeki a, ı’ya daralmıştır.",
      "Başla- tabanının a’sı korunur; -yor önündeki daralma bu gelecek zaman biçimine genellenmez.",
      "Kök başlangıçta başlı olduğu için ses olayı yoktur.",
      "Her y harfi ünsüz türemesi olduğu için iki y yazılmalıdır.",
      "Doğru yazım başlıyacak olmalıdır.",
    ],
  },
  "periodic-4": {
    hint: "Periyot için elektron içeren katmanları say; katmanların tam dolu olması gerekmez.",
    explanation:
      "Al’nin nötr temel hâl dağılımı 2,8,3 olduğundan elektron içeren üç katmanı vardır ve element 3. periyottadır. Periyot için katmanların tam dolu olması gerekmez; son katmanda 3 elektron bulunur. Toplam 13 elektron, nötr Al’nin atom numarasıdır; periyot numarası değildir.",
  },
  "eq-2": {
    prompt:
      "Sabit sıcaklıkta, ideal gazların A(g) ⇌ B(g) homojen dengesinde [A]=1 mol/L ve [B]=2 mol/L’dir. Derişimler cinsinden denge sabiti Kc kaçtır?",
  },
  "eq-5": {
    prompt:
      "Sabit sıcaklıkta, ideal gazların A(g) ⇌ B(g) homojen dengesi için Kc=2 ve toplam denge derişimi [A]+[B]=6 mol/L’dir. Denge karışımı hangisidir?",
  },
  "iyonik-bilesik-adlandirma-q2": {
    prompt:
      "Fe₂O₃’te oksidin yükü −2’dir ve her Fe aynı yükü taşır. Stock (Roma rakamlı) iyonik adlandırmaya göre bileşiğin adı hangisidir?",
  },
  "f013-foundation-katman-elektron-dizilimi-3": {
    explanation:
      "İyonun elektron sayısı 18, yükü +2 olduğundan Z=e+q=18+2=20 olur. Nötr Ca atomunun temel hâl dağılımı 2,8,8,2 ve periyodu 4’tür. İyonun elektron içeren üç katmanı, elementin periyodunu 3’e indirmez.",
  },
  "f013-foundation-katman-elektron-dizilimi-7": {
    explanation:
      "Ne için e=10; Na⁺ için e=11−1=10; Mg²⁺ için e=12−2=10 bulunur. Proton sayıları 10,11,12 olarak farklı kaldığından aynı elemente dönüşmüş sayılmazlar. Temel hâlde ele alınırlarsa üçünün de katman dağılımı 2,8 olur; bu koşulda elektron sayıları ve dizilimleri aynı olduğundan izoelektroniktirler. Kökte temel hâl verildiği varsayılmaz.",
  },
};
const ids = Object.keys(corrections);
const guideCases = [
  {
    id: "periyodik-sistem",
    paragraph: 2,
    text: "Nötr ve temel hâlde ilk 20 element için elektron içeren katman sayısı periyodu verir. Burada katmanın elektron içermesi sayılır; kapasitesinin tamamen dolu olması gerekmez. Al için 2,8,3 dağılımında üç katmanda elektron bulunur; 3. periyottadır. Ana gruplarda son katmandaki elektron sayısı grup hakkında bilgi verir: 1→1. grup, 2→2. grup; 3…8 ise genellikle 13…18. gruplara karşılık gelir. Eski A grubu adları bu son gruplar için 3A…8A biçimindedir.",
  },
  {
    id: "katman-elektron-dizilimi",
    paragraph: 4,
    text: "İlk 20 ana grup elementinde nötr temel hâlde elektron içeren katman sayısı periyodu verir. Bu sayım için katmanların tamamen dolu olması gerekmez. Değerlik elektron sayısı elektron içeren en dış katmandaki elektron sayısıdır; 1 ve 2 elektron 1. ve 2. gruplarla, 3…8 elektron 13…18. gruplarla ilişkilidir. He iki elektronuna rağmen 18. gruptadır; ilk katmanı tam doludur.",
  },
  {
    id: "ayt-periyodik-sistem-atom-capi",
    paragraph: 1,
    text: "Bu çalışmanın ilk 36 nötr atom kapsamında temel hâlde elektron bulunan orbitaller arasındaki en büyük n, periyodu verir. Bir orbitalde tek elektron bulunması da bu sayım için yeterlidir; orbitalin iki elektronla tam dolu olması gerekmez. Bütün elementlere istisnasız bir tanım diye genişletme; daha ileri Pd gibi düzenler ayrı ele alınır. Bu kuralı elektron kaybetmiş iyonda elektron içeren en dış katmana uygulayıp elementin yerini değiştirme. Na⁺ iyonunda elektron içeren iki katman olsa da Na elementi üçüncü periyotta kalır; Z değişmemiştir.",
  },
];

let lessons: typeof import("../../src/domain/content").lessons;
let subjects: typeof import("../../src/domain/content").subjects;
let beginExam: typeof import("../../src/domain/exams").beginExam;
let validateState: typeof import("../../src/domain/storage").validateState;
let eqGuidance: QuestionGuidance;
const guideMetadata = new Map<
  string,
  {
    sections: number;
    examples: number;
    sheetId: string;
    sheetSections: number;
    sheetExamples: number;
  }
>();

function flat(question: Question): HelpQuestion {
  return {
    id: question.id,
    prompt: question.prompt.tr,
    ...(question.passage ? { passage: question.passage.tr } : {}),
    options: question.options.map((option) => option.tr),
    answer: question.answer,
    explanation: question.explanation.tr,
    hint: question.hint.tr,
  };
}
function expected(question: Question | ExamItem): HelpQuestion {
  const raw =
    typeof question.prompt === "string"
      ? (question as ExamItem)
      : flat(question as Question);
  return { ...raw, ...corrections[question.id] };
}
function sourceCard(id: string) {
  const lesson = lessons.find((lesson) =>
    lesson.questions.some((question) => question.id === id),
  )!;
  expect(lesson, `Real old lesson for ${id}`).toBeTruthy();
  const index = lesson.questions.findIndex((question) => question.id === id);
  return { lesson, index, raw: lesson.questions[index] };
}

// Vite handles the actual app's existing JSON imports; native Node ESM does not.
// The server is metadata-only and is closed even if source validation fails.
test.beforeAll(async ({}, testInfo) => {
  const source = await createServer({
    root: fileURLToPath(new URL("../..", import.meta.url)),
    configFile: false,
    cacheDir: testInfo.outputPath("source-metadata-cache"),
    optimizeDeps: { noDiscovery: true, include: [] },
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
  });
  try {
    const [content, exams, storage, presentation, guides, sheets, rows] =
      await Promise.all([
        source.ssrLoadModule("/src/domain/content.ts"),
        source.ssrLoadModule("/src/domain/exams.ts"),
        source.ssrLoadModule("/src/domain/storage.ts"),
        source.ssrLoadModule("/src/domain/questionPresentation.ts"),
        source.ssrLoadModule("/src/learning/guides/index.ts"),
        source.ssrLoadModule("/src/learning/cheatsheetContent.ts"),
        source.ssrLoadModule("/src/learning/guidance028ChemistryB.json"),
      ]);
    lessons = content.lessons;
    subjects = content.subjects;
    beginExam = exams.beginExam;
    validateState = storage.validateState;
    expect(
      presentation.questionPresentationRevisions
        .filter((row: { id: string }) => ids.includes(row.id))
        .map((row: { id: string }) => row.id)
        .sort(),
    ).toEqual([...ids].sort());
    for (const id of ids) {
      const before = presentation.questionPresentationRevisions.find(
        (row: { id: string }) => row.id === id,
      ).before;
      expect(flat(sourceCard(id).raw)).toEqual(before);
    }
    eqGuidance = rows.default.find(
      (row: { id: string }) => row.id === "eq-2",
    ).guidance;
    expect(eqGuidance.steps).toHaveLength(3);
    expect(eqGuidance.optionReasons).toHaveLength(3);
    for (const item of guideCases) {
      const guide = guides.lessonGuides.get(item.id);
      const sheet = [...sheets.builtInCheatSheets.values()].find(
        (sheet) => (sheet as { lessonId?: string }).lessonId === item.id,
      ) as { topicId: string; sections: unknown[]; examples: unknown[] };
      expect(guide).toBeTruthy();
      expect(sheet).toBeTruthy();
      guideMetadata.set(item.id, {
        sections: guide.sections.length,
        examples: guide.examples.length,
        sheetId: sheet.topicId,
        sheetSections: sheet.sections.length,
        sheetExamples: sheet.examples.length,
      });
    }
  } finally {
    await source.close();
  }
});
test.use({ locale: "tr-TR" });
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const counter = window as unknown as { __presentation028Writes: number };
    counter.__presentation028Writes = 0;
    const original = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (
      ...args: Parameters<IDBObjectStore["put"]>
    ) {
      if (this.name === "state" && args[1] === "current")
        counter.__presentation028Writes++;
      return original.apply(this, args);
    };
  });
});
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
            else reject(new Error("Expected durable presentation state"));
          };
        };
      }),
  );
}
const writes = (page: Page) =>
  page.evaluate(
    () =>
      (window as unknown as { __presentation028Writes: number })
        .__presentation028Writes,
  );
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
async function startQuestions(page: Page, lesson: (typeof lessons)[number]) {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Bugün", exact: true }),
  ).toBeVisible();
  await nav(page, "Sorular");
  await page
    .getByRole("button", {
      name: lesson.subjectId.startsWith("ayt-") ? "AYT" : "TYT",
      exact: true,
    })
    .click();
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(lesson.title.tr);
  await page.locator(`.ready-topic[data-lesson-id="${lesson.id}"]`).click();
  await expect(page.locator(".question-panel")).toBeVisible();
}
async function visibleCard(
  panel: Locator,
  card: HelpQuestion,
  answerClass: string,
) {
  await expect(panel.locator("h2")).toHaveText(card.prompt);
  await expect(panel.locator(`${answerClass} > span:nth-child(2)`)).toHaveText(
    card.options,
  );
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
async function evidence(testInfo: TestInfo, name: string, value: unknown) {
  await testInfo.attach(name, {
    body: Buffer.from(JSON.stringify(value, null, 2)),
    contentType: "application/json",
  });
}

for (const id of ids) {
  test(`${id}: ordinary complete old set, corrected feedback, offline Mistakes and exact saved answers`, async ({
    page,
    context,
  }, testInfo) => {
    // A bounded 5–10-card real UI flow, including checked-draft and result reloads.
    test.setTimeout(90_000);
    const { lesson, index: target } = sourceCard(id);
    const rawBytes = JSON.stringify(lesson.questions);
    const note = `Sunum 028 · ${id} · ÇĞİÖŞÜ +2 −1.`;
    const selections = lesson.questions.map((question, index) =>
      index === target
        ? (question.answer + 1) % question.options.length
        : question.answer,
    );
    const responses = lesson.questions.map((question, index) => ({
      questionId: question.id,
      selected: selections[index],
      correct: index !== target,
      assisted: index === target && id === "periodic-4",
      confidence: "medium",
      ...(index === target && id === "periodic-4"
        ? { helpLevel: 1, helpPanelCount: 5 }
        : {}),
    }));
    await startQuestions(page, lesson);
    await page.getByRole("textbox", { name: "Notun", exact: true }).fill(note);
    await expect.poll(async () => (await stored(page)).draft?.note).toBe(note);
    const startedAt = (await stored(page)).draft!.startedAt;
    let checkedTarget: AppState["draft"] = null;
    for (let index = 0; index < lesson.questions.length; index++) {
      const card = expected(lesson.questions[index]);
      await expect(page.locator(".question-meta")).toContainText(
        `Soru ${index + 1} / ${lesson.questions.length}`,
      );
      await visibleCard(page.locator(".question-panel"), card, ".answer");
      if (index === target && id === "periodic-4") {
        await page.locator(".help-next").click();
        await expect(
          page.locator(".help-content > section").first(),
        ).toContainText(corrections[id].hint!);
      }
      await checkStudyAnswer(page, selections[index], index !== target);
      if (index === target) {
        await expect(page.locator(".feedback.repair > p")).toHaveText(
          card.explanation,
        );
        await expect
          .poll(async () => (await stored(page)).draft?.responses)
          .toEqual(responses.slice(0, index + 1));
        checkedTarget = (await stored(page)).draft!;
        expect(checkedTarget).toMatchObject({
          lessonId: lesson.id,
          index,
          selected: selections[index],
          checked: true,
          note,
          startedAt,
        });
        await offlineReady(page);
        await context.setOffline(true);
        await page.reload();
        await visibleCard(page.locator(".question-panel"), card, ".answer");
        await expect(page.locator(".feedback.repair > p")).toHaveText(
          card.explanation,
        );
        await expect(
          page.getByRole("textbox", { name: "Notun", exact: true }),
        ).toHaveValue(note);
        expect((await stored(page)).draft).toEqual(checkedTarget);
        expect(await writes(page)).toBe(0);
      }
      await page
        .getByRole("button", {
          name:
            index === lesson.questions.length - 1
              ? "Çalışmayı kaydet"
              : "Sonraki soru",
          exact: true,
        })
        .click();
    }
    await expect(
      page.locator(".result-stats > div").first().locator("strong"),
    ).toHaveText(`${lesson.questions.length - 1}/${lesson.questions.length}`);
    await expect.poll(async () => (await stored(page)).sessions.length).toBe(1);
    const completed = await stored(page);
    expect(completed.draft).toBeNull();
    expect(completed.sessions[0]).toMatchObject({
      id: `session:${startedAt}:${lesson.id}`,
      lessonId: lesson.id,
      note,
      responses,
      kind: "learn",
      includesTheory: false,
    });
    const sessionBytes = JSON.stringify(completed.sessions);
    await page.reload();
    await expect(
      page.locator(".result-stats > div").first().locator("strong"),
    ).toHaveText(`${lesson.questions.length - 1}/${lesson.questions.length}`);
    await nav(page, "Yanlışlarım");
    const mistake = page.locator(".mistake-card");
    const view = expected(lesson.questions[target]);
    await expect(mistake).toHaveCount(1);
    await expect(mistake.locator("h2")).toHaveText(view.prompt);
    await expect(mistake.locator(":scope > p")).toContainText(
      view.options[selections[target]],
    );
    await mistake.locator("details > summary").click();
    await expect(mistake.locator("details strong")).toContainText(
      view.options[view.answer],
    );
    await expect(mistake.locator("details > p").last()).toHaveText(
      view.explanation,
    );
    const viewed = await stored(page);
    expect(JSON.stringify(viewed.sessions)).toBe(sessionBytes);
    expect(viewed).toEqual(completed);
    expect(await writes(page)).toBe(0);
    expect(JSON.stringify(lesson.questions)).toBe(rawBytes);
    await evidence(testInfo, "ordinary-persisted-state.json", {
      note,
      startedAt,
      checkedTarget,
      completed,
      viewed,
    });
  });
}

test("synthetic validated legacy TYT five-item raw paper: active and finished views clarify copy without rewriting snapshots", async ({
  page,
  context,
}, testInfo) => {
  test.setTimeout(90_000);
  // Current-schema pre-update fixture. No old application binary or migration
  // is exercised; only the original raw paper and absent inline guide are real.
  const examIds = [
    "snd-10",
    "periodic-4",
    "f013-foundation-katman-elektron-dizilimi-3",
    "f013-foundation-katman-elektron-dizilimi-7",
    "iyonik-bilesik-adlandirma-q2",
  ];
  const rawItems: ExamItem[] = examIds.map((id) => {
    const { lesson, raw } = sourceCard(id);
    const subject = subjects.find(
      (subject) => subject.id === lesson.subjectId,
    )!;
    const question = flat(raw);
    return {
      id,
      lessonId: lesson.id,
      subjectId: subject.id,
      subjectName: subject.name.tr,
      lessonTitle: lesson.title.tr,
      prompt: question.prompt,
      options: question.options,
      answer: question.answer,
      explanation: question.explanation,
      hint: question.hint,
    };
  });
  const rawBytes = JSON.stringify(rawItems);
  const spec: ExamSpec = {
    id: "presentation-028-synthetic-old-tyt-five",
    title: "Beş ham özgün kart · kayıtlı TYT örneği",
    exam: "TYT",
    kind: "mixed",
    items: rawItems,
    durationSeconds: 3600,
    fullLength: false,
    missingSubjects: [],
  };
  const fixture = beginExam(initialState(), spec, Date.now(), "learning");
  fixture.examDraft!.answers = rawItems.map((item, index) =>
    index === 0 ? (item.answer + 1) % item.options.length : item.answer,
  );
  fixture.examDraft!.flagged = [0, 4];
  fixture.examDraft!.helpLevels = rawItems.map(() => 2);
  const draft = validateState(fixture).examDraft!;
  expect(JSON.stringify(draft.items)).toBe(rawBytes);
  expect(draft.items.every((item) => !Object.hasOwn(item, "guidance"))).toBe(
    true,
  );
  expect(Object.hasOwn(draft, "helpPanelCounts")).toBe(false);
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
          transaction.onerror = () => {
            database.close();
            reject(transaction.error);
          };
          transaction.onabort = () => {
            database.close();
            reject(transaction.error);
          };
        };
      }),
    // saveState has always persisted the schema's canonical property order.
    // A fresh page has no record yet, so its synthetic fallback must match it.
    { examDraft: draft, fallback: validateState(initialState()) },
  );
  expect(validateState(seeded.after)).toEqual(seeded.after);
  expect(JSON.stringify(seeded.before)).toBe(
    JSON.stringify(validateState(seeded.before)),
  );
  expect(JSON.stringify(seeded.after)).toBe(
    JSON.stringify(validateState(seeded.after)),
  );
  expect({ ...seeded.after, examDraft: seeded.before.examDraft }).toEqual(
    seeded.before,
  );
  await page.reload();
  await nav(page, "Sınavlar");
  await expect(page.locator(".exam-runner")).toBeVisible();
  expect(await stored(page)).toEqual(seeded.after);
  expect(await writes(page)).toBe(0);
  for (let index = 0; index < rawItems.length; index++) {
    const card = expected(rawItems[index]);
    await visibleCard(page.locator(".exam-question"), card, ".exam-answer");
    await expect(
      page.locator(".exam-answer").nth(draft.answers[index]!),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".help-full-solution > p").nth(1)).toHaveText(
      card.explanation,
    );
    await expect(page.locator(".help-full-solution > ol > li")).toHaveCount(
      card.options.length,
    );
    if (card.id === "periodic-4")
      await expect(
        page.locator(".help-content > section").first(),
      ).toContainText(corrections[card.id].hint!);
    const current = (await stored(page)).examDraft!;
    expect({ ...current, index: 0 }).toEqual(draft);
    expect(JSON.stringify(current.items)).toBe(rawBytes);
    if (index < rawItems.length - 1) {
      await page
        .getByRole("button", { name: "Sonraki soru", exact: true })
        .click();
      await expect
        .poll(async () => (await stored(page)).examDraft?.index)
        .toBe(index + 1);
    }
  }
  const answered = (await stored(page)).examDraft!;
  await offlineReady(page);
  await context.setOffline(true);
  await page.reload();
  await visibleCard(
    page.locator(".exam-question"),
    expected(rawItems[4]),
    ".exam-answer",
  );
  expect((await stored(page)).examDraft).toEqual(answered);
  expect(await writes(page)).toBe(0);
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
  const { finishedAt, timedOut, ...saved } = completed.examSessions[0];
  expect(saved).toEqual(answered);
  expect(finishedAt).toBeGreaterThanOrEqual(draft.startedAt);
  expect(finishedAt).toBeLessThan(draft.deadline);
  expect(timedOut).toBe(false);
  expect({
    ...completed,
    examDraft: seeded.before.examDraft,
    examSessions: seeded.before.examSessions,
  }).toEqual(seeded.before);
  const showSolutions = async () => {
    for (let index = 0; index < rawItems.length; index++) {
      const solution = page.locator(".exam-solution").nth(index);
      const card = expected(rawItems[index]);
      await solution.locator("summary").click();
      await expect(solution.locator(":scope > h3")).toHaveText(card.prompt);
      await expect(solution.locator(":scope > ol > li")).toHaveText(
        card.options.map(
          (option, i) =>
            option +
            (i === card.answer ? " · Doğru yanıt" : "") +
            (i === draft.answers[index] ? " · Senin yanıtın" : ""),
        ),
      );
      await expect(solution.locator(".exam-explanation > p")).toHaveText(
        card.explanation,
      );
      if (card.id === "periodic-4") {
        await solution.locator(".help-next").click();
        await expect(
          solution.locator(".help-content > section").first(),
        ).toContainText(corrections[card.id].hint!);
      }
    }
  };
  await showSolutions();
  expect(await stored(page)).toEqual(completed);
  await page.reload();
  await expect(page.locator(".exam-results")).toBeVisible();
  await showSolutions();
  const reloaded = await stored(page);
  expect(JSON.stringify(reloaded.examSessions[0].items)).toBe(rawBytes);
  expect(reloaded).toEqual(completed);
  expect(await writes(page)).toBe(0);
  await evidence(testInfo, "synthetic-raw-exam-persisted-state.json", {
    fixtureDraft: draft,
    seeded,
    answered,
    completed,
    reloaded,
  });
});

test("eq-2: three real options, five explicit panels then full6, canonical marker5 and no unfinished learning credit offline", async ({
  page,
  context,
}, testInfo) => {
  test.setTimeout(90_000);
  const { lesson, index } = sourceCard("eq-2");
  await startQuestions(page, lesson);
  for (let prior = 0; prior < index; prior++) {
    await checkStudyAnswer(page, lesson.questions[prior].answer, true);
    await page
      .getByRole("button", { name: "Sonraki soru", exact: true })
      .click();
  }
  const card = expected(lesson.questions[index]);
  await visibleCard(page.locator(".question-panel"), card, ".answer");
  await expect(page.locator(".answer")).toHaveCount(3);
  await expect.poll(async () => (await stored(page)).draft?.index).toBe(index);
  const before = await stored(page);
  const titles = [
    "Bilmen gerekenler",
    "Çözüm yolu",
    "1. adım",
    "2. adım",
    "3. adım",
  ];
  for (let level = 1; level <= 6; level++) {
    await page.locator(".help-next").click();
    await expect
      .poll(async () => (await stored(page)).draft?.helpLevel)
      .toBe(level);
    await expect(page.locator(".help-content > section > h3")).toHaveText(
      level <= 5 ? titles.slice(0, level) : [...titles, "Tam çözüm"],
    );
    await expect(page.locator(".help-full-solution")).toHaveCount(
      level === 6 ? 1 : 0,
    );
    if (level === 2)
      await expect(
        page.locator(".help-content > section").nth(1).locator(":scope > p"),
      ).toHaveText(typeset(eqGuidance.strategy));
    const current = await stored(page);
    expect(current.draft).toMatchObject({
      index,
      checked: false,
      selected: null,
      hint: true,
      helpLevel: level,
      helpPanelCount: 5,
      responses: before.draft!.responses,
    });
    expect({ ...current, draft: before.draft }).toEqual(before);
  }
  await expect(
    page.locator(".help-full-solution .help-autopsy-body > span:last-child"),
  ).toHaveText(eqGuidance.optionReasons.map(typeset));
  await expect(page.locator(".help-full-solution > ol > li")).toHaveCount(3);
  await expect(page.locator(".help-full-solution > p").first()).toHaveText(
    "Doğru yanıt: C · 2",
  );
  await expect(page.locator(".help-full-solution > p").nth(1)).toHaveText(
    card.explanation,
  );
  await expect(page.locator(".help-next")).toHaveCount(0);
  const full = await stored(page);
  expect(full.sessions).toEqual([]);
  expect(full.reviews).toEqual([]);
  expect(full.topicProgress).toEqual({});
  expect(full.unlocked).toEqual([]);
  await offlineReady(page);
  await context.setOffline(true);
  await page.reload();
  await visibleCard(page.locator(".question-panel"), card, ".answer");
  await expect(
    page.locator(".help-full-solution .help-autopsy-body > span:last-child"),
  ).toHaveText(eqGuidance.optionReasons.map(typeset));
  await expect(page.locator(".help-next")).toHaveCount(0);
  expect(await stored(page)).toEqual(full);
  expect(await writes(page)).toBe(0);
  await evidence(testInfo, "three-option-help-unfinished-state.json", {
    before,
    full,
    reloaded: await stored(page),
  });
});

test("three Guide views: Theory and Sheet show occupied-shell meaning offline while notes, structure and learning counters persist", async ({
  page,
  context,
}, testInfo) => {
  test.setTimeout(90_000);
  // Notes are written through each actual UI; only later passive display is
  // compared. No PDF, imported document or completed-learning fixture is used.
  for (const item of guideCases) {
    const lesson = lessons.find((lesson) => lesson.id === item.id)!;
    const meta = guideMetadata.get(item.id)!;
    await page.goto(`/#/lesson?id=${encodeURIComponent(item.id)}`);
    await expect(
      page.getByRole("heading", { name: lesson.title.tr, exact: true }),
    ).toBeVisible();
    await page
      .getByRole("textbox", { name: "Notun", exact: true })
      .fill(`Kanonik teori notu · ${item.id} · 2,8,3`);
    await expect
      .poll(async () => (await stored(page)).notes[`lesson:${item.id}`])
      .toBe(`Kanonik teori notu · ${item.id} · 2,8,3`);
    await page.goto(`/#/cheatsheets?topic=${encodeURIComponent(meta.sheetId)}`);
    await expect(page.locator(".cheat-reader")).toBeVisible();
    await page
      .getByRole("textbox", { name: "Notun", exact: true })
      .fill(`Kanonik kağıt notu · ${meta.sheetId} · ÇĞİÖŞÜ`);
    await expect
      .poll(
        async () => (await stored(page)).notes[`cheatsheet:${meta.sheetId}`],
      )
      .toBe(`Kanonik kağıt notu · ${meta.sheetId} · ÇĞİÖŞÜ`);
  }
  const before = await stored(page);
  expect(before.sessions).toEqual([]);
  expect(before.reviews).toEqual([]);
  expect(before.topicProgress).toEqual({});
  expect(before.unlocked).toEqual([]);
  await offlineReady(page);
  await context.setOffline(true);
  await page.reload();
  for (const item of guideCases) {
    const meta = guideMetadata.get(item.id)!;
    await page.goto(`/#/lesson?id=${encodeURIComponent(item.id)}`);
    await expectGuideSections(page, meta.sections);
    await expect(page.locator(".guide-examples .worked-example")).toHaveCount(
      meta.examples,
    );
    await expect(
      page.locator(".guide-section").nth(item.paragraph).locator(":scope > p"),
    ).toContainText([item.text]);
    await expect(
      page.getByRole("textbox", { name: "Notun", exact: true }),
    ).toHaveValue(before.notes[`lesson:${item.id}`]);
    expect(await stored(page)).toEqual(before);
    expect(await writes(page)).toBe(0);
    await page.goto(`/#/cheatsheets?topic=${encodeURIComponent(meta.sheetId)}`);
    await expect(page.locator(".cheat-section")).toHaveCount(
      meta.sheetSections,
    );
    await expect(page.locator(".cheat-examples .worked-example")).toHaveCount(
      meta.sheetExamples,
    );
    await expect(
      page.locator(".cheat-section").nth(item.paragraph).locator(":scope > p"),
    ).toContainText([item.text]);
    await expect(
      page.getByRole("textbox", { name: "Notun", exact: true }),
    ).toHaveValue(before.notes[`cheatsheet:${meta.sheetId}`]);
    expect(await stored(page)).toEqual(before);
    expect(await writes(page)).toBe(0);
  }
  await evidence(testInfo, "guide-notes-and-counters.json", {
    before,
    after: await stored(page),
  });
});
