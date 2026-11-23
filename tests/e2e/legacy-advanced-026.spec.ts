import { typeset } from "../../src/domain/typeset";
import { expect, test, type Locator, type Page } from "@playwright/test";
import {
  legacy026QuestionLessons,
  legacy026Topics,
} from "../../src/learning/legacy026";
import { mathematicsNarratives } from "../../src/learning/narratives/mathematics";
import { narrativeLesson } from "../../src/learning/narratives/types";
import { foundation013QuestionsByLesson } from "../../src/learning/forge013FoundationQuestions";
import type { AppState, Lesson, Question } from "../../src/domain/model";
import type { QuestionGuidance } from "../../src/domain/questionHelpModel";
import { practiceQuestionView } from "../../src/learning/practiceQuestionView";

// Expected copy comes from the accepted production question sets. These tests
// verify routing, staged rendering, scoring flags and durable UI state; they do
// not independently certify the scientific answer keys or guidance semantics.
const advancedSets = legacy026QuestionLessons;
if (
  advancedSets.length !== 28 ||
  new Set(advancedSets.map((lesson) => lesson.id)).size !== 28
)
  throw new Error(
    "026 advanced UI cohort must contain exactly 28 distinct sets",
  );

const cases = advancedSets.map((lesson) => {
  const question = lesson.questions[0];
  const guidance = question?.guidance;
  if (
    !lesson.tags.includes("soru-seti") ||
    !lesson.subjectId.startsWith("tyt-") ||
    question.options.length !== 5 ||
    !guidance ||
    guidance.optionReasons.length !== 5 ||
    guidance.steps.length < 3
  )
    throw new Error(`026 advanced first-card contract: ${lesson.id}`);
  return { lesson, question, guidance };
});

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul", hasTouch: true });

async function nav026Advanced(page: Page, name: string) {
  await expect(page.locator(".sidebar")).toBeAttached();
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}

async function stored026Advanced(page: Page): Promise<AppState | undefined> {
  return page.evaluate(
    () =>
      new Promise<AppState | undefined>((resolve, reject) => {
        const request = indexedDB.open("yksmania");
        request.onsuccess = () => {
          const db = request.result;
          const record = db
            .transaction("state")
            .objectStore("state")
            .get("current");
          record.onsuccess = () => {
            db.close();
            resolve(record.result);
          };
          record.onerror = () => {
            db.close();
            reject(record.error);
          };
        };
        request.onerror = () => reject(request.error);
      }),
  );
}

function completed026Evidence(state: AppState | undefined) {
  return {
    sessions: state?.sessions ?? [],
    reviews: state?.reviews ?? [],
    theoryReviewCompletions: state?.theoryReviewCompletions ?? [],
    topicProgress: state?.topicProgress ?? {},
    unlocked: state?.unlocked ?? [],
    examSessions: state?.examSessions ?? [],
    examDraft: state?.examDraft ?? null,
  };
}
const noCompleted026Evidence = {
  sessions: [],
  reviews: [],
  theoryReviewCompletions: [],
  topicProgress: {},
  unlocked: [],
  examSessions: [],
  examDraft: null,
};

async function offline026Ready(page: Page) {
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

async function saved026Advanced(page: Page) {
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
}

function collect026Errors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(String(error)));
  page.on("console", (message) => {
    if (
      (message.type() === "error" &&
        !/\/favicon\.ico(?:[?#]|$)/.test(message.location().url)) ||
      /Maximum update depth|Minified React error|Too many re-renders|Invalid hook call/.test(
        message.text(),
      )
    )
      errors.push(message.text());
  });
  return errors;
}

async function first026Card(page: Page, lesson: Lesson, question: Question) {
  await expect(page.locator(".study-title h1")).toHaveText(lesson.title.tr);
  await expect(page.locator(".question-meta")).toContainText(
    `Soru 1 / ${lesson.questions.length}`,
  );
  await expect(page.locator(".question-panel h2")).toHaveText(typeset(question.prompt.tr));
  const answers = page.locator(".question-panel .answer");
  await expect(answers).toHaveCount(5);
  for (const [index, option] of question.options.entries())
    await expect(answers.nth(index).locator("span").nth(1)).toHaveText(
      typeset(option.tr),
    );
  if (question.passage)
    await expect(page.locator(".question-passage p")).toHaveText(
      typeset(question.passage.tr),
    );
  else await expect(page.locator(".question-passage")).toHaveCount(0);
}

async function stage026Saved(page: Page, level: number, panelCount: number) {
  await expect
    .poll(async () => {
      const draft = (await stored026Advanced(page))?.draft;
      return {
        level: draft?.helpLevel,
        panelCount: draft?.helpPanelCount,
        assisted: draft?.hint,
        responses: draft?.responses,
      };
    })
    .toEqual({ level, panelCount, assisted: true, responses: [] });
  await saved026Advanced(page);
}

async function no026FullAnswer(page: Page) {
  await expect(page.locator(".help-full-solution")).toHaveCount(0);
  await expect(page.locator(".feedback")).toHaveCount(0);
  await expect(page.locator(".help-content")).not.toContainText("Doğru yanıt:");
}

async function full026Solution(
  page: Page,
  question: Question,
  guidance: QuestionGuidance,
) {
  const full = page.locator(".help-full-solution");
  await expect(full).toBeVisible();
  await expect(full.locator(":scope > p")).toHaveCount(4);
  await expect(full.locator(":scope > p").nth(0)).toHaveText(
    `Doğru yanıt: ${String.fromCharCode(65 + question.answer)} · ${typeset(question.options[question.answer].tr)}`,
  );
  await expect(full.locator(":scope > p").nth(1)).toHaveText(typeset(question.explanation.tr));
  // The step-by-step final lists each option with its reason (autopsy).
  await expect(
    full.locator(".help-autopsy-body > span:last-child"),
  ).toHaveText(guidance.optionReasons.map(typeset));
  await expect(full.locator(":scope > p").nth(2)).toHaveText(
    typeset(guidance.commonError),
  );
  await expect(full.locator(":scope > p").nth(3)).toHaveText(typeset(guidance.check));
  await expect(page.locator(".help-next")).toHaveCount(0);
}

async function checked026Card(page: Page, question: Question) {
  await expect(page.locator(".feedback")).toHaveClass("feedback correct");
  await expect(page.locator(".feedback strong")).toHaveText("Doğru");
  await expect(page.locator(".feedback p")).toHaveText(typeset(question.explanation.tr));
  const selected = page.locator(".answer").nth(question.answer);
  await expect(selected).toHaveAttribute("aria-pressed", "true");
  await expect(selected).toHaveClass(/\bchosen\b/);
  await expect(selected).toHaveClass(/\banswer-correct\b/);
  await expect(page.locator(".answer-wrong")).toHaveCount(0);
  for (const answer of await page.locator(".answer").all())
    await expect(answer).toBeDisabled();
  await expect(page.locator(".question-actions .small")).toHaveText(
    "Yardım alındı",
  );
}

// Playwright's page/context fixtures are fresh for every generated test. No
// storage seeding, terminal session completion or direct route bypass is used.
for (const { lesson, question, guidance } of cases) {
  test(`${lesson.id}: ordinary Questions entry, staged assistance and checked first-card draft survive offline reload without completion credit`, async ({
    page,
    context,
  }) => {
    const errors = collect026Errors(page);
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Bugün", exact: true }),
    ).toBeVisible();
    await expect(page.locator(".page-heading .quiet-chip")).toHaveText("0 XP");
    const baseline = completed026Evidence(await stored026Advanced(page));
    expect(baseline).toEqual(noCompleted026Evidence);

    await nav026Advanced(page, "Sorular");
    await page.getByRole("button", { name: "TYT", exact: true }).click();
    await page
      .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
      .fill(lesson.title.tr);
    const row = page.locator(`.ready-topic[data-lesson-id="${lesson.id}"]`);
    await expect(row).toHaveCount(1);
    await expect(row).toContainText(`${lesson.questions.length} özgün soru`);
    await row.click();
    await first026Card(page, lesson, question);
    await expect(page.locator(".lesson-article")).toHaveCount(0);

    await offline026Ready(page);
    await context.setOffline(true);
    const note = `026 ileri (${lesson.id}): ilk soruyu yardım adımlarıyla denetledim.`;
    await page.locator(".practice-note textarea").fill(note);
    await expect
      .poll(async () => (await stored026Advanced(page))?.draft?.note)
      .toBe(note);
    await saved026Advanced(page);
    const initial = (await stored026Advanced(page))!.draft!;
    expect(initial).toMatchObject({
      lessonId: lesson.id,
      phase: "practice",
      index: 0,
      responses: [],
      selected: null,
      checked: false,
      hint: false,
      note,
    });
    await expect(page.locator(".hint-box")).toHaveCount(0);

    const panelCount = guidance.steps.length + 2;
    const fullLevel = panelCount + 1;
    await page.getByRole("button", { name: "İpucu al", exact: true }).click();
    let panels: Locator = page.locator(".help-content > section");
    await expect(panels).toHaveCount(1);
    await expect(panels.first().locator("h3")).toHaveText("Bilmen gerekenler");
    await expect(panels.first().locator("p")).toContainText(guidance.knowledge.map(typeset));
    const shownKnowledge = (
      await panels.first().locator("p").allTextContents()
    ).map((text) => text.replace(/\s+/g, " ").trim());
    const activeHint = practiceQuestionView({
      id: question.id,
      prompt: question.prompt.tr,
      passage: question.passage?.tr,
      options: question.options.map((option) => option.tr),
      answer: question.answer,
      explanation: question.explanation.tr,
      hint: question.hint.tr,
    }).hint;
    const allowedKnowledge = [activeHint, ...guidance.knowledge]
      .filter((text): text is string => text !== undefined)
      .map((text) => typeset(text).replace(/\s+/g, " ").trim());
    if (activeHint && activeHint !== question.hint.tr) {
      expect(shownKnowledge).toContain(typeset(activeHint));
    }
    expect(shownKnowledge.length).toBeGreaterThanOrEqual(
      guidance.knowledge.length,
    );
    expect(shownKnowledge.length).toBeLessThanOrEqual(
      guidance.knowledge.length + 1,
    );
    expect(
      shownKnowledge.every((text) => allowedKnowledge.includes(text)),
    ).toBe(true);
    await expect(
      page.getByRole("heading", { name: "Çözüm yolu", exact: true }),
    ).toHaveCount(0);
    await expect(
      page.getByRole("heading", { name: "1. adım", exact: true }),
    ).toHaveCount(0);
    await expect(page.locator(".help-content")).not.toContainText(
      typeset(guidance.strategy),
    );
    for (const step of guidance.steps.map(typeset))
      await expect(page.locator(".help-content")).not.toContainText(step);
    await no026FullAnswer(page);
    await stage026Saved(page, 1, panelCount);

    // The steps live in the separate "Adım adım çözüm" panel; opening it
    // after the hint opens step 2 (the method).
    await page
      .getByRole("button", { name: "Adım adım çözüm", exact: true })
      .click();
    panels = page.locator(".help-content > section");
    await expect(panels).toHaveCount(2);
    await expect(panels.nth(1).locator("h3")).toHaveText("Çözüm yolu");
    await expect(panels.nth(1).locator(":scope > p")).toHaveText(typeset(guidance.strategy));
    await no026FullAnswer(page);
    await stage026Saved(page, 2, panelCount);

    for (const [index, step] of guidance.steps.map(typeset).entries()) {
      await page
        .getByRole("button", { name: "Sonraki adım", exact: true })
        .click();
      panels = page.locator(".help-content > section");
      await expect(panels).toHaveCount(index + 3);
      await expect(panels.nth(index + 2).locator("h3")).toHaveText(
        `${index + 1}. adım`,
      );
      await expect(panels.nth(index + 2).locator(":scope > p")).toHaveText(step);
      if (index + 1 < guidance.steps.length)
        await expect(
          page.getByRole("heading", {
            name: `${index + 2}. adım`,
            exact: true,
          }),
        ).toHaveCount(0);
      await no026FullAnswer(page);
      await stage026Saved(page, index + 3, panelCount);
    }
    await page
      .getByRole("button", { name: "Son adım: tam çözüm", exact: true })
      .click();
    await full026Solution(page, question, guidance);
    await stage026Saved(page, fullLevel, panelCount);
    expect(completed026Evidence(await stored026Advanced(page))).toEqual(
      baseline,
    );

    await page.locator(".answer").nth(question.answer).click();
    await expect
      .poll(async () => (await stored026Advanced(page))?.draft?.selected)
      .toBe(question.answer);
    await page
      .getByRole("button", { name: "Cevabı kontrol et", exact: true })
      .click();
    await checked026Card(page, question);
    const expectedResponse = {
      questionId: question.id,
      selected: question.answer,
      correct: true,
      assisted: true,
      confidence: "medium",
      helpLevel: fullLevel,
      helpPanelCount: panelCount,
    };
    await expect
      .poll(async () => (await stored026Advanced(page))?.draft?.responses)
      .toEqual([expectedResponse]);
    await saved026Advanced(page);
    const checked = (await stored026Advanced(page))!;
    expect(checked.draft).toMatchObject({
      lessonId: lesson.id,
      index: 0,
      selected: question.answer,
      checked: true,
      hint: true,
      helpLevel: fullLevel,
      helpPanelCount: panelCount,
      note,
    });
    expect(completed026Evidence(checked)).toEqual(baseline);

    await page.reload();
    await first026Card(page, lesson, question);
    await full026Solution(page, question, guidance);
    await checked026Card(page, question);
    await expect(page.locator(".practice-note textarea")).toHaveValue(note);
    await expect
      .poll(async () => (await stored026Advanced(page))?.draft)
      .toEqual(checked.draft);
    expect(completed026Evidence(await stored026Advanced(page))).toEqual(
      baseline,
    );

    // XP is checked in the actual Today UI, after checking only one question.
    // The full draft remains resumable; no final-session save is clicked.
    await nav026Advanced(page, "Bugün");
    await expect(page.locator(".page-heading .quiet-chip")).toHaveText("0 XP");
    expect(completed026Evidence(await stored026Advanced(page))).toEqual(
      baseline,
    );
    await page
      .getByRole("button", { name: "Kaldığın yerden devam et", exact: true })
      .click();
    await checked026Card(page, question);
    await expect(page.locator(".practice-note textarea")).toHaveValue(note);
    expect((await stored026Advanced(page))?.draft).toEqual(checked.draft);
    expect(errors).toEqual([]);
  });
}

test("sayi-basamaklari: canonical theory hides its advanced-only row and the article CTA opens both actual topic question sets", async ({
  page,
}) => {
  // Use the same raw canonical metadata sources as forge026-math-cases;
  // importing browser domain/content directly would require Node JSON attributes.
  const canonicalPack = mathematicsNarratives.find(
    (pack) => pack.id === "sayi-basamaklari",
  )!;
  const canonical: Lesson = {
    ...narrativeLesson(canonicalPack),
    questions: foundation013QuestionsByLesson[canonicalPack.id],
  };
  const related = advancedSets.filter(
    (lesson) => legacy026Topics[lesson.id] === canonicalPack.topicId,
  );
  expect(related).toHaveLength(1);
  const advanced = related[0];
  const commonSearch = canonical.title.tr.split(":")[0];
  expect(advanced.title.tr).toContain(commonSearch);
  const errors = collect026Errors(page);
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Bugün", exact: true }),
  ).toBeVisible();
  await nav026Advanced(page, "Konu Anlatımı");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(commonSearch);
  const oldRow = page.locator(`.ready-topic[data-lesson-id="${canonical.id}"]`);
  await expect(oldRow).toBeVisible();
  await expect(oldRow).toContainText(canonical.title.tr);
  await expect(
    page.locator(`.ready-topic[data-lesson-id="${advanced.id}"]`),
  ).toHaveCount(0);
  await oldRow.click();
  await expect(page.locator(".study-title h1")).toHaveText(canonical.title.tr);
  await expect(page.locator(".lesson-article")).toBeVisible();
  await expect(page.locator(".question-panel")).toHaveCount(0);
  await page
    .locator(".lesson-article")
    .getByRole("button", { name: "Bu konunun soru setleri (2)", exact: true })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Uygulamadaki soru setleri",
      exact: true,
    }),
  ).toBeVisible();
  const topicRows = page.locator(".topic-study .ready-topic");
  await expect(topicRows).toHaveCount(2);
  expect(
    (
      await topicRows.evaluateAll((rows) =>
        rows.map((row) => row.getAttribute("data-lesson-id")),
      )
    ).sort(),
  ).toEqual([canonical.id, advanced.id].sort());
  for (const lesson of [canonical, advanced]) {
    const row = page.locator(
      `.topic-study .ready-topic[data-lesson-id="${lesson.id}"]`,
    );
    await expect(row).toContainText(lesson.title.tr);
    await expect(row).toContainText(`${lesson.questions.length} özgün soru`);
  }
  await page
    .locator(`.topic-study .ready-topic[data-lesson-id="${advanced.id}"]`)
    .click();
  await first026Card(page, advanced, advanced.questions[0]);
  expect(completed026Evidence(await stored026Advanced(page))).toEqual(
    noCompleted026Evidence,
  );
  expect(errors).toEqual([]);
});
