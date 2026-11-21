import { typeset } from "../../src/domain/typeset";
import {
  expect,
  test,
  type Page,
  type Locator,
  type TestInfo,
} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { readFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import type { AppState, Lesson } from "../../src/domain/model";
import type { QuestionGuidance } from "../../src/domain/questionHelpModel";

import type { WorkedExample } from "../../src/learning/guides/types";
import { expectGuideSections, guideSectionCount } from "./helpers/guidePages";

// Node and Playwright read these frozen literal fixtures without importing
// production presentation functions or requiring JSON module attributes.
type PromptFixture = {
  id: string;
  revision: number;
  before: {
    id: string;
    prompt: string;
    options: string[];
    answer: number;
    hint: string;
    explanation: string;
    passage?: string;
  };
  prompt: string;
};
const promptFixtures: PromptFixture[] = JSON.parse(
  readFileSync(
    new URL("../fixtures/question-presentation-030.json", import.meta.url),
    "utf8",
  ),
);
const virusWorkedFixture = JSON.parse(
  readFileSync(
    new URL("../fixtures/virus-worked-030.json", import.meta.url),
    "utf8",
  ),
) as {
  before: WorkedExample;
  after: WorkedExample;
};
const plantsWorkedFixture = JSON.parse(
  readFileSync(
    new URL("../fixtures/plants-worked-030.json", import.meta.url),
    "utf8",
  ),
) as {
  index: number;
  before: WorkedExample;
  after: WorkedExample;
}[];

const cases = [
  ["Matematik", "sayi-problemleri", "Math"],
  ["Fizik", "basinc", "Physics"],
  ["Kimya", "kovalent-adlandirma-metalik-bag", "Chemistry"],
  ["Biyoloji A", "virusler", "BiologyA"],
  ["Biyoloji B", "omurgasizlar", "BiologyB"],
  ["Türkçe", "zarflar", "Humanities"],
  ["Tarih", "degisim-caginda-avrupa-osmanli", "Humanities"],
] as const;
let lessons: Lesson[];
const guidance = new Map<string, QuestionGuidance>();
type ReaderMetadata = {
  guideMinutes: number;
  guideSections: number;
  guideExamples: number;
  guideRecall: number;
  sheetTopicId: string;
  sheetTitle: string;
  sheetSections: number;
  sheetExamples: number;
  sheetRecall: number;
  sheetCount: number;
};
const readerMetadata = new Map<string, ReaderMetadata>();
const diagnostics = new WeakMap<
  Page,
  { warnings: string[]; consoleErrors: string[]; pageErrors: string[] }
>();
const promptById = new Map(promptFixtures.map((row) => [row.id, row]));
const shownPrompt = (q: Lesson["questions"][number]) =>
  promptById.get(q.id)?.prompt ?? q.prompt.tr;
const shownExplanation = (q: Lesson["questions"][number]) => typeset(q.explanation.tr);
const flat = (q: Lesson["questions"][number]) => ({
  id: q.id,
  prompt: q.prompt.tr,
  options: q.options.map((option) => option.tr),
  answer: q.answer,
  hint: q.hint.tr,
  explanation: q.explanation.tr,
  ...(q.passage ? { passage: q.passage.tr } : {}),
});
test.use({ locale: "tr-TR" });

test.beforeAll(async ({}, info) => {
  const root = fileURLToPath(new URL("../..", import.meta.url));
  const source = await createServer({
    root,
    configFile: false,
    cacheDir: info.outputPath("guidance030-source-cache"),
    optimizeDeps: { noDiscovery: true, include: [] },
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
  });
  try {
    lessons = (await source.ssrLoadModule("/src/domain/content.ts")).lessons;
    const families = [...new Set(cases.map(([, , family]) => family))];
    for (const family of families) {
      const rows: { id: string; guidance: QuestionGuidance }[] = JSON.parse(
        await readFile(
          `${root}/src/learning/guidance030${family}.json`,
          "utf8",
        ),
      );
      expect(rows).toHaveLength(
        family === "Physics" ? 40 : family === "Humanities" ? 60 : 50,
      );
      for (const row of rows) {
        expect(guidance.has(row.id)).toBe(false);
        guidance.set(row.id, row.guidance);
      }
    }
    expect(guidance.size).toBe(300);
    expect(guardedCases.map((target) => target.id).sort()).toEqual(
      promptFixtures.map((target) => target.id).sort(),
    );
    for (const [, id] of cases) {
      const lesson = lessons.find((item) => item.id === id)!;
      expect(lesson.questions).toHaveLength(10);
      for (const q of lesson.questions) expect(guidance.has(q.id)).toBe(true);
    }
    for (const target of promptFixtures) {
      const lesson = lessons.find((item) =>
        item.questions.some((q) => q.id === target.id),
      )!;
      expect(flat(lesson.questions.find((q) => q.id === target.id)!)).toEqual(
        target.before,
      );
      expect(guidance.has(target.id)).toBe(true);
    }
    const guides = await source.ssrLoadModule("/src/learning/guides/index.ts");
    const sheets = await source.ssrLoadModule(
      "/src/learning/cheatsheetContent.ts",
    );
    for (const id of ["virusler", "bitkiler"]) {
      const guide = guides.lessonGuides.get(id);
      const sheet = [...sheets.builtInCheatSheets.values()].find(
        (item: unknown) => (item as { lessonId?: string }).lessonId === id,
      ) as {
        topicId: string;
        title: string;
        sections: unknown[];
        examples: { title: string; prompt: string }[];
        recall: unknown[];
      };
      expect(sheet).toBeDefined();
      if (id === "virusler")
        expect(guide.examples[1]).toEqual(virusWorkedFixture.before);
      else
        for (const fixture of plantsWorkedFixture)
          expect(guide.examples[fixture.index]).toEqual(fixture.before);
      readerMetadata.set(id, {
        guideMinutes: guide.minutes,
        guideSections: guide.sections.length,
        guideExamples: guide.examples.length,
        guideRecall: guide.recall.length,
        sheetTopicId: sheet.topicId,
        sheetTitle: sheet.title,
        sheetSections: sheet.sections.length,
        sheetExamples: sheet.examples.length,
        sheetRecall: sheet.recall.length,
        sheetCount: sheets.builtInCheatSheets.size,
      });
    }
  } finally {
    await source.close();
  }
});

test.beforeEach(async ({ page }) => {
  const observed = {
    warnings: [] as string[],
    consoleErrors: [] as string[],
    pageErrors: [] as string[],
  };
  diagnostics.set(page, observed);
  page.on("console", (message) => {
    if (message.type() === "warning") observed.warnings.push(message.text());
    if (message.type() === "error") observed.consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => observed.pageErrors.push(error.message));
  await page.addInitScript(() => {
    const state = window as unknown as {
      __guidance030Writes: number;
      __guidance030AllWrites: { store: string; operation: string }[];
    };
    state.__guidance030Writes = 0;
    state.__guidance030AllWrites = [];
    for (const operation of ["put", "add", "delete", "clear"] as const) {
      const original = IDBObjectStore.prototype[operation];
      (
        IDBObjectStore.prototype as unknown as Record<
          string,
          (...args: unknown[]) => unknown
        >
      )[operation] = function (this: IDBObjectStore, ...args: unknown[]) {
        state.__guidance030AllWrites.push({ store: this.name, operation });
        if (
          operation === "put" &&
          this.name === "state" &&
          args[1] === "current"
        )
          state.__guidance030Writes++;
        return Reflect.apply(original, this, args);
      };
    }
  });
});

test.afterEach(async ({ page }, info) => {
  const observed = diagnostics.get(page)!;
  await info.attach("actual-page-diagnostics.json", {
    body: Buffer.from(JSON.stringify(observed, null, 2)),
    contentType: "application/json",
  });
  expect(observed.pageErrors).toEqual([]);
  expect(observed.warnings).toEqual([]);
  // Console errors are retained verbatim: offline resource errors and page
  // exceptions are distinct evidence. Never label them all zero from SSR.
});

async function stored(page: Page): Promise<AppState> {
  return page.evaluate(
    () =>
      new Promise<AppState>((resolve, reject) => {
        const request = indexedDB.open("yksmania");
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const item = db
            .transaction("state")
            .objectStore("state")
            .get("current");
          item.onerror = () => {
            db.close();
            reject(item.error);
          };
          item.onsuccess = () => {
            db.close();
            item.result
              ? resolve(item.result)
              : reject(Error("No saved state"));
          };
        };
      }),
  );
}

async function nav(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}

async function offlineReady(page: Page) {
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller)
      await new Promise<void>((resolve) =>
        navigator.serviceWorker.addEventListener(
          "controllerchange",
          () => resolve(),
          {
            once: true,
          },
        ),
      );
  });
}

for (const [subject, lessonId] of cases) {
  test(`${subject}: new guidance stages, real saved session and offline mistakes`, async ({
    page,
    context,
  }, info) => {
    test.setTimeout(90_000);
    const lesson = lessons.find((item) => item.id === lessonId)!;
    expect(lesson).toBeDefined();
    const question = lesson.questions[0];
    const help = guidance.get(question.id)!;
    expect(help).toBeDefined();
    const rawBytes = JSON.stringify(lesson.questions);
    const note = `030 ${subject} · öğrenme notu ÇĞİÖŞÜ +2 −1.`;
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Bugün", exact: true }),
    ).toBeVisible();
    await nav(page, "Sorular");
    await page.getByRole("button", { name: "TYT", exact: true }).click();
    await page
      .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
      .fill(lesson.title.tr);
    await page.locator(`.ready-topic[data-lesson-id="${lesson.id}"]`).click();
    await expect(page.locator(".question-panel h2")).toHaveText(
      shownPrompt(question),
    );
    await expect(page.locator(".answer > span:nth-child(2)")).toHaveText(
      question.options.map((o) => o.tr),
    );
    await expect(
      page.getByRole("region", { name: "Tam çözüm", exact: true }),
    ).toHaveCount(0);
    await page.getByRole("textbox", { name: "Notun", exact: true }).fill(note);
    await expect.poll(async () => (await stored(page)).draft?.note).toBe(note);
    const before = await stored(page);
    const startedAt = before.draft!.startedAt;
    const expectedPanels = [
      ["Bilmen gerekenler", help.knowledge],
      ["Çözüm yolu", [help.strategy]],
      ...help.steps.map((step, i) => [`${i + 1}. adım`, [step]]),
    ] as [string, string[]][];
    for (let i = 0; i < expectedPanels.length; i++) {
      await page.locator(".help-next").click();
      const visible = page.locator(".help-content > section");
      await expect(visible).toHaveCount(i + 1);
      await expect(visible.nth(i).locator("h3")).toHaveText(
        expectedPanels[i][0],
      );
      for (const paragraph of expectedPanels[i][1])
        await expect(visible.nth(i)).toContainText(typeset(paragraph));
      await expect(page.locator(".help-full-solution")).toHaveCount(0);
      await expect
        .poll(async () => (await stored(page)).draft?.helpLevel)
        .toBe(i + 1);
    }
    await page.locator(".help-next").click();
    const full = page.locator(".help-full-solution");
    await expect(full).toBeVisible();
    await expect(full.locator("li")).toHaveText(help.optionReasons.map(typeset));
    await expect(full).toContainText(typeset(help.commonError));
    await expect(full).toContainText(typeset(help.check));
    await expect(full).toContainText(shownExplanation(question));
    await expect(page.locator(".help-next")).toHaveCount(0);
    await expect
      .poll(async () => (await stored(page)).draft?.helpLevel)
      .toBe(6);
    const helped = await stored(page);
    // XP is derived from saved learning evidence; opening help changes only
    // this unfinished draft, without adding a session, review or completion.
    expect({ ...helped, draft: before.draft }).toEqual(before);
    expect(helped.sessions).toEqual([]);
    expect(helped.reviews).toEqual([]);
    expect(helped.draft).toMatchObject({
      lessonId,
      note,
      startedAt,
      checked: false,
      helpLevel: 6,
      helpPanelCount: 5,
    });
    await offlineReady(page);
    await context.setOffline(true);
    await page.reload();
    await expect(page.locator(".help-full-solution li")).toHaveText(
      help.optionReasons.map(typeset),
    );
    await expect(
      page.getByRole("textbox", { name: "Notun", exact: true }),
    ).toHaveValue(note);
    expect(await stored(page)).toEqual(helped);
    expect(
      await page.evaluate(
        () =>
          (window as unknown as { __guidance030Writes: number })
            .__guidance030Writes,
      ),
    ).toBe(0);

    expect(await allWrites(page)).toEqual([]);
    const expectedResponses = lesson.questions.map((q, i) => ({
      questionId: q.id,
      selected: i === 0 ? (q.answer + 1) % q.options.length : q.answer,
      correct: i !== 0,
      assisted: i === 0,
      confidence: "medium",
      ...(i === 0 ? { helpLevel: 6, helpPanelCount: 5 } : {}),
    }));
    for (let i = 0; i < lesson.questions.length; i++) {
      const q = lesson.questions[i];
      await expect(page.locator(".question-panel h2")).toHaveText(
        shownPrompt(q),
      );
      await page.locator(".answer").nth(expectedResponses[i].selected).click();
      await page
        .getByRole("button", { name: "Cevabı kontrol et", exact: true })
        .click();
      await expect(
        page.locator(i === 0 ? ".feedback.repair" : ".feedback.correct"),
      ).toBeVisible();
      await expect
        .poll(async () => (await stored(page)).draft?.responses)
        .toEqual(expectedResponses.slice(0, i + 1));
      await page
        .getByRole("button", {
          name:
            i === lesson.questions.length - 1
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
      id: `session:${startedAt}:${lessonId}`,
      lessonId,
      note,
      responses: expectedResponses,
      kind: "learn",
      includesTheory: false,
    });
    await nav(page, "Yanlışlarım");
    const mistake = page.locator(".mistake-card");
    await expect(mistake).toHaveCount(1);
    await expect(mistake.locator("h2")).toHaveText(shownPrompt(question));
    await mistake.locator("details > summary").click();
    await expect(mistake.locator("details strong")).toContainText(
      question.options[question.answer].tr,
    );
    await expect(mistake.locator("details > p").last()).toHaveText(
      shownExplanation(question),
    );
    expect(await stored(page)).toEqual(completed);
    await page.reload();
    await expect(page.locator(".mistake-card h2")).toHaveText(
      shownPrompt(question),
    );
    expect(await stored(page)).toEqual(completed);
    expect(JSON.stringify(lesson.questions)).toBe(rawBytes);
    await info.attach("actual-guidance-session.json", {
      body: Buffer.from(JSON.stringify({ helped, completed }, null, 2)),
      contentType: "application/json",
    });
  });
}

// Only ROOT-approved static fixtures supply expected display literals.
// No expected prompt or explanation is calculated by a production view helper.
const guardedLocations = [
  { id: "f011-viruses-3", lessonId: "virusler", index: 2, selected: 2 },
  { id: "f011-plants-1", lessonId: "bitkiler", index: 0, selected: 0 },
  { id: "f011-plants-4", lessonId: "bitkiler", index: 3, selected: 2 },
  {
    id: "f011-chem-kovalent-adlandirma-metalik-bag-7",
    lessonId: "kovalent-adlandirma-metalik-bag",
    index: 6,
    selected: 1,
  },
  {
    id: "f011-chem-maddenin-halleri-2",
    lessonId: "maddenin-halleri",
    index: 1,
    selected: 1,
  },
  {
    id: "dalgalara-giris-q3",
    lessonId: "dalgalara-giris",
    index: 2,
    selected: 0,
  },
  {
    id: "dalgalara-giris-q10",
    lessonId: "dalgalara-giris",
    index: 9,
    selected: 4,
  },
] as const;
const guardedCases = guardedLocations.map((location) => {
  const fixture = promptById.get(location.id)!;
  return {
    ...location,
    before: fixture.before,
    prompt: fixture.prompt,
    answer: fixture.before.answer,
    options: fixture.before.options,
    explanation: fixture.before.explanation,
  };
});

async function openQuestionLesson(page: Page, lesson: Lesson) {
  await nav(page, "Sorular");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(lesson.title.tr);
  const entry = page.locator(`.ready-topic[data-lesson-id="${lesson.id}"]`);
  await expect(entry).toContainText(`${lesson.questions.length} özgün soru`);
  await entry.click();
}

async function stateWrites(page: Page) {
  return page.evaluate(
    () =>
      (window as unknown as { __guidance030Writes: number })
        .__guidance030Writes,
  );
}

async function allWrites(page: Page) {
  return page.evaluate(
    () =>
      (
        window as unknown as {
          __guidance030AllWrites: { store: string; operation: string }[];
        }
      ).__guidance030AllWrites,
  );
}

async function settleRead(page: Page) {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      ),
  );
}

for (const target of guardedCases) {
  test(`${target.id}: ordinary question route retains guarded units/grammar, real answers and full help offline`, async ({
    page,
    context,
  }, info) => {
    test.setTimeout(120_000);
    const lesson = lessons.find((item) => item.id === target.lessonId)!;
    expect(lesson.questions).toHaveLength(10);
    const original = lesson.questions[target.index],
      help = guidance.get(target.id)!;
    expect(original.id).toBe(target.id);
    expect(flat(original)).toEqual(target.before);
    expect(original.options.map((option) => option.tr)).toEqual(target.options);
    expect(original.answer).toBe(target.answer);
    expect(original.prompt.tr).not.toBe(target.prompt);
    expect(help).toBeDefined();
    const rawBytes = JSON.stringify(lesson.questions);
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Bugün", exact: true }),
    ).toBeVisible();
    await expect(page.locator(".page-heading .quiet-chip")).toHaveText("0 XP");
    await openQuestionLesson(page, lesson);
    const responses = [] as NonNullable<AppState["draft"]>["responses"];
    // Reach the target by actual answer/check/next actions. No draft/IDB seed.
    for (let i = 0; i < target.index; i++) {
      const previous = lesson.questions[i];
      await expect(page.locator(".question-panel h2")).toHaveText(
        shownPrompt(previous),
      );
      await expect(page.locator(".answer > span:nth-child(2)")).toHaveText(
        previous.options.map((option) => option.tr),
      );
      await page.locator(".answer").nth(previous.answer).click();
      await page
        .getByRole("button", { name: "Cevabı kontrol et", exact: true })
        .click();
      await expect(page.locator(".feedback.correct")).toBeVisible();
      responses.push({
        questionId: previous.id,
        selected: previous.answer,
        correct: true,
        assisted: false,
        confidence: "medium",
      });
      await expect
        .poll(async () => (await stored(page)).draft?.responses)
        .toEqual(responses);
      await page
        .getByRole("button", { name: "Sonraki soru", exact: true })
        .click();
      await expect
        .poll(async () => (await stored(page)).draft?.index)
        .toBe(i + 1);
    }
    await expect(page.locator(".question-panel h2")).toHaveText(target.prompt);
    await expect(page.locator(".question-panel")).toContainText(
      `Soru ${target.index + 1} / 10`,
    );
    await expect(page.locator(".answer > span:nth-child(2)")).toHaveText(
      target.options,
    );
    const note = `030 ${target.id} · gerçek UI notu Δc ve tamlayan ÇĞİÖŞÜ.`;
    await page.getByRole("textbox", { name: "Notun", exact: true }).fill(note);
    await expect.poll(async () => (await stored(page)).draft?.note).toBe(note);
    const before = await stored(page);
    expect(before.sessions).toEqual([]);
    expect(before.reviews).toEqual([]);
    expect(before.topicProgress).toEqual({});
    const panels = [
      ["Bilmen gerekenler", help.knowledge],
      ["Çözüm yolu", [help.strategy]],
      ...help.steps.map((step, i) => [`${i + 1}. adım`, [step]]),
    ] as [string, string[]][];
    for (let level = 1; level <= 6; level++) {
      await page.locator(".help-next").click();
      await expect
        .poll(async () => (await stored(page)).draft?.helpLevel)
        .toBe(level);
      if (level <= 5) {
        const sections = page.locator(".help-content > section");
        await expect(sections).toHaveCount(level);
        await expect(sections.nth(level - 1).locator("h3")).toHaveText(
          panels[level - 1][0],
        );
        for (const paragraph of panels[level - 1][1])
          await expect(sections.nth(level - 1)).toContainText(typeset(paragraph));
        await expect(page.locator(".help-full-solution")).toHaveCount(0);
      }
    }
    const full = page.locator(".help-full-solution");
    await expect(full).toBeVisible();
    await expect(full.locator("li")).toHaveText(help.optionReasons.map(typeset));
    await expect(full).toContainText(target.explanation);
    await expect(full).toContainText(typeset(help.commonError));
    await expect(full).toContainText(typeset(help.check));
    await expect(page.locator(".help-next")).toHaveCount(0);
    await page.locator(".answer").nth(target.selected).click();
    await page
      .getByRole("button", { name: "Cevabı kontrol et", exact: true })
      .click();
    const targetCorrect = target.selected === target.answer;
    await expect(
      page.locator(targetCorrect ? ".feedback.correct" : ".feedback.repair"),
    ).toBeVisible();
    await expect(page.locator(".answer.answer-wrong")).toHaveCount(
      targetCorrect ? 0 : 1,
    );
    await expect(page.locator(".answer.chosen")).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    await expect(page.locator(".answer.answer-correct")).toHaveCount(1);
    await expect(
      page.locator(".answer.answer-correct > span:nth-child(2)"),
    ).toHaveText(target.options[target.answer]);
    responses.push({
      questionId: target.id,
      selected: target.selected,
      correct: targetCorrect,
      assisted: true,
      confidence: "medium",
      helpLevel: 6,
      helpPanelCount: 5,
    });
    await expect
      .poll(async () => (await stored(page)).draft?.responses)
      .toEqual(responses);
    const helped = await stored(page);
    expect({ ...helped, draft: before.draft }).toEqual(before);
    expect(helped.draft).toMatchObject({
      lessonId: target.lessonId,
      index: target.index,
      selected: target.selected,
      checked: true,
      note,
      responses,
      helpLevel: 6,
      helpPanelCount: 5,
      hint: true,
      startedAt: before.draft!.startedAt,
    });
    await offlineReady(page);
    await context.setOffline(true);
    await page.reload();
    await expect(page.locator(".question-panel h2")).toHaveText(target.prompt);
    await expect(page.locator(".answer > span:nth-child(2)")).toHaveText(
      target.options,
    );
    await expect(
      page.locator(".answer.answer-correct > span:nth-child(2)"),
    ).toHaveText(target.options[target.answer]);
    await expect(
      page.locator(targetCorrect ? ".feedback.correct" : ".feedback.repair"),
    ).toBeVisible();
    await expect(page.locator(".answer.chosen > span:nth-child(2)")).toHaveText(
      target.options[target.selected],
    );
    await expect(page.locator(".answer.answer-wrong")).toHaveCount(
      targetCorrect ? 0 : 1,
    );
    await expect(page.locator(".help-full-solution li")).toHaveText(
      help.optionReasons.map(typeset),
    );
    await expect(page.locator(".help-full-solution")).toContainText(
      target.explanation,
    );
    await expect(
      page.getByRole("textbox", { name: "Notun", exact: true }),
    ).toHaveValue(note);
    await expect(page.locator(".help-next")).toHaveCount(0);
    await settleRead(page);
    expect(await stored(page)).toEqual(helped);
    expect(await stateWrites(page)).toBe(0);
    expect(await allWrites(page)).toEqual([]);
    expect(JSON.stringify(lesson.questions)).toBe(rawBytes);
    await info.attach(`${target.id}-offline-state.json`, {
      body: Buffer.from(JSON.stringify({ before, helped }, null, 2)),
      contentType: "application/json",
    });
    await info.attach(`${target.id}-offline.png`, {
      body: await page.screenshot({ fullPage: true }),
      contentType: "image/png",
    });
    await nav(page, "Bugün");
    await expect(page.locator(".page-heading .quiet-chip")).toHaveText("0 XP");
    expect(await stored(page)).toEqual(helped);
    expect(await stateWrites(page)).toBe(0);
    expect(await allWrites(page)).toEqual([]);
  });
}

async function activate(locator: Locator, touch: boolean) {
  if (touch) await locator.tap();
  else await locator.click();
}

async function useLexend(page: Page, scale: number, textSize: number) {
  await nav(page, "Ayarlar");
  await page
    .getByRole("combobox", { name: "Yazı tipi", exact: true })
    .selectOption("lexend");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill(String(scale));
  await page
    .getByLabel("Yalnızca yazı boyutu %", { exact: true })
    .fill(String(textSize));
  await page.getByRole("switch", { name: /Aion animasyonu/ }).uncheck();
  await expect
    .poll(async () => {
      const state = await stored(page);
      return {
        font: state.settings.font,
        scale: state.settings.scale,
        textSize: state.settings.textSize,
        motion: state.settings.motion,
      };
    })
    .toEqual({ font: "lexend", scale, textSize, motion: false });
}

async function readingGeometry(
  page: Page,
  scope: Locator,
  phone: boolean,
  fontProbe: Locator = scope.locator(".example-prompt"),
  expectedSize: string = phone ? "45px" : "15px",
) {
  const font = await fontProbe.evaluate(async (element) => {
    await document.fonts.ready;
    const style = getComputedStyle(element);
    const faces = await document.fonts.load(
      `${style.fontWeight} ${style.fontSize} Lexend`,
    );
    return {
      family: style.fontFamily,
      size: style.fontSize,
      loaded: faces.map((face) => face.status),
      available: document.fonts.check(
        `${style.fontWeight} ${style.fontSize} Lexend`,
      ),
      rootSize: getComputedStyle(document.documentElement).fontSize,
      textScale: getComputedStyle(document.documentElement)
        .getPropertyValue("--text-scale")
        .trim(),
    };
  });
  expect(font.family).toContain("Lexend");
  expect(font.available).toBe(true);
  expect(font.loaded.length).toBeGreaterThan(0);
  expect(font.loaded.every((status) => status === "loaded")).toBe(true);
  expect(font.size).toBe(expectedSize);
  expect(font.rootSize).toBe(phone ? "32px" : "16px");
  expect(font.textScale).toBe(phone ? "1.5" : "1");
  const layout = await scope.evaluate((element) => {
    const outer = element.getBoundingClientRect(),
      outside: string[] = [];
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
    let node: Node | null;
    while ((node = walker.nextNode())) {
      if (!node.textContent?.trim()) continue;
      const parent = node.parentElement;
      if (!parent || !parent.getClientRects().length) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      for (const rect of range.getClientRects()) {
        if (
          rect.width &&
          (rect.left < outer.left - 2 || rect.right > outer.right + 2)
        )
          outside.push(node.textContent.trim());
      }
    }
    return {
      viewport: innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      scopeWidth: outer.width,
      outside: [...new Set(outside)],
    };
  });
  expect(layout.documentWidth).toBeLessThanOrEqual(layout.viewport + 1);
  expect(layout.outside).toEqual([]);
  return { font, layout };
}

const readerCases = [
  {
    id: "virusler",
    sheetTitle: "Virüsler",
    minutes: 65,
    sections: 8,
    examples: 4,
    recall: 5,
    topic: "detail-14",
    theory: [virusWorkedFixture.after],
    sheet: [virusWorkedFixture.after],
  },
  {
    id: "bitkiler",
    sheetTitle: "Bitki",
    minutes: 70,
    sections: 8,
    examples: 4,
    recall: 5,
    topic: "detail-17",
    theory: plantsWorkedFixture.map((f) => f.after),
    sheet: [plantsWorkedFixture[0].after],
  },
] as const;
const readerProfiles = [
  {
    name: "normal Lexend",
    width: 1280,
    height: 900,
    scale: 100,
    text: 100,
    phone: false,
  },
  {
    name: "320px phone Lexend UI200 text150",
    width: 320,
    height: 844,
    scale: 200,
    text: 150,
    phone: true,
  },
] as const;

async function theoryWorked(
  page: Page,
  expected: WorkedExample,
  touch: boolean,
) {
  const example = page
    .locator(".guide-examples > .worked-example")
    .filter({ has: page.getByText(expected.title, { exact: true }) });
  await expect(example).toHaveCount(1);
  await activate(example.locator(":scope > summary"), touch);
  await expect(example.locator(".example-prompt")).toHaveText(expected.prompt);
  await expect(example.locator(".worked-steps > li")).toHaveCount(0);
  await expect(example.locator(".worked-conclusion")).toHaveCount(0);
  for (let i = 0; i < 3; i++) {
    await activate(
      example.getByRole("button", {
        name: i === 0 ? "İlk adımı göster" : "Sonraki adım",
        exact: true,
      }),
      touch,
    );
    const steps = example.locator(".worked-steps > li");
    await expect(steps).toHaveCount(i + 1);
    await expect(steps.nth(i).locator(":scope > strong")).toHaveText(
      expected.steps[i].label,
    );
    if (expected.steps[i].expression)
      await expect(steps.nth(i).locator(".math-expression")).toHaveText(
        expected.steps[i].expression!,
      );
    await expect(steps.nth(i).locator("p").last()).toHaveText(
      expected.steps[i].explanation,
    );
    await expect(example.locator(".worked-conclusion")).toHaveCount(
      i === 2 ? 1 : 0,
    );
  }
  await expect(example.locator(".worked-conclusion > p")).toHaveText([
    `Sonuç: ${expected.answer}`,
    `Kontrol: ${expected.check}`,
    `Dikkat: ${expected.pitfall}`,
  ]);
  return example;
}
async function sheetWorked(
  page: Page,
  expected: WorkedExample,
  touch: boolean,
) {
  const example = page
    .locator(".cheat-examples > .worked-example")
    .filter({ has: page.getByText(expected.title, { exact: true }) });
  await expect(example).toHaveCount(1);
  await activate(example.locator(":scope > summary"), touch);
  await expect(example.locator(".example-prompt")).toHaveText(expected.prompt);
  const solution = example.locator(".cheat-solution");
  await expect(solution).not.toHaveAttribute("open", "");
  await activate(solution.locator(":scope > summary"), touch);
  await expect(solution.locator("li")).toHaveText(
    expected.steps.map((step) =>
      [step.label, step.expression, step.explanation]
        .filter(Boolean)
        .join(" · "),
    ),
  );
  await expect(solution.locator(":scope > p")).toHaveText(
    `Sonuç ve kontrol: ${expected.answer} ${expected.check}`,
  );
  return example;
}
async function axeRead(page: Page, info: TestInfo, name: string) {
  const report = await new AxeBuilder({ page }).analyze();
  await info.attach(name, {
    body: Buffer.from(JSON.stringify(report, null, 2)),
    contentType: "application/json",
  });
  expect(
    report.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
}

test.describe("030 linked virus and plant guides and built-in sheets", () => {
  test.use({ hasTouch: true });
  for (const profile of readerProfiles) {
    test(`${profile.name}: approved worked conditions, notes and offline readers preserve all learning state`, async ({
      page,
      context,
    }, info) => {
      test.setTimeout(180_000);
      await page.setViewportSize({
        width: profile.width,
        height: profile.height,
      });
      await page.goto("/");
      await expect(
        page.getByRole("heading", { name: "Bugün", exact: true }),
      ).toBeVisible();
      await useLexend(page, profile.scale, profile.text);
      let baseline = await stored(page);
      expect(baseline.sessions).toEqual([]);
      expect(baseline.draft).toBeNull();
      expect(baseline.topicProgress).toEqual({});
      for (const target of readerCases) {
        const lesson = lessons.find((l) => l.id === target.id)!;
        const rawLessonBytes = JSON.stringify(lesson);
        expect(lesson.questions).toHaveLength(10);
        expect(readerMetadata.get(target.id)).toEqual({
          guideMinutes: target.minutes,
          guideSections: target.sections,
          guideExamples: target.examples,
          guideRecall: target.recall,
          sheetTopicId: target.topic,
          sheetTitle: target.sheetTitle,
          sheetSections: target.sections,
          sheetExamples: 2,
          sheetRecall: target.recall,
          sheetCount: 505,
        });
        await nav(page, "Konu Anlatımı");
        await page.getByRole("button", { name: "TYT", exact: true }).click();
        await page
          .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
          .fill(lesson.title.tr);
        const entry = page.locator(
          `.ready-topic[data-lesson-id="${target.id}"]`,
        );
        await expect(entry).toContainText(`${target.minutes} dk`);
        await activate(entry, profile.phone);
        await expect(page.locator(".study-title h1")).toHaveText(
          lesson.title.tr,
        );
        await expectGuideSections(page, target.sections);
        await expect(
          page.locator(".guide-examples > .worked-example"),
        ).toHaveCount(target.examples);
        await expect(page.locator(".guide-recall > details")).toHaveCount(
          target.recall,
        );
        await expect(page.locator(".guide-contents")).toContainText(
          `Yaklaşık ${target.minutes} dk`,
        );
        await settleRead(page);
        expect(await stored(page)).toEqual(baseline);
        const theoryNote = `030 ${profile.name} ${target.id} · yaşam döngüsü / stok 0. ÇĞİÖŞÜ`;
        await page
          .getByRole("textbox", { name: "Notun", exact: true })
          .fill(theoryNote);
        await expect
          .poll(async () => (await stored(page)).notes[`lesson:${target.id}`])
          .toBe(theoryNote);
        const noted = await stored(page);
        expect(noted).toEqual({
          ...baseline,
          notes: { ...baseline.notes, [`lesson:${target.id}`]: theoryNote },
        });
        for (const example of target.theory)
          await theoryWorked(page, example, profile.phone);
        expect(await stored(page)).toEqual(noted);
        await offlineReady(page);
        await context.setOffline(true);
        await page.reload();
        await expect(page.locator(".study-title h1")).toHaveText(
          lesson.title.tr,
        );
        await expect(
          page.getByRole("textbox", { name: "Notun", exact: true }),
        ).toHaveValue(theoryNote);
        await settleRead(page);
        expect(await stored(page)).toEqual(noted);
        expect(await allWrites(page)).toEqual([]);
        const geometries = [];
        for (const example of target.theory) {
          const actual = await theoryWorked(page, example, profile.phone);
          geometries.push(await readingGeometry(page, actual, profile.phone));
          await info.attach(
            `${profile.name}-${target.id}-${example.title}-theory.png`,
            { body: await actual.screenshot(), contentType: "image/png" },
          );
        }
        await axeRead(
          page,
          info,
          `${profile.name}-${target.id}-theory-axe.json`,
        );
        expect(await stored(page)).toEqual(noted);
        expect(await allWrites(page)).toEqual([]);
        await nav(page, "Kopya Kağıtları");
        await expect(page.locator(".page-heading")).toContainText(
          "505 hazır kağıt",
        );
        await page.getByRole("button", { name: "TYT", exact: true }).click();
        await page
          .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
          .fill(target.sheetTitle);
        await activate(
          page.getByRole("button", { name: target.sheetTitle, exact: true }),
          profile.phone,
        );
        await expect(page.locator(".study-title h1")).toHaveText(
          target.sheetTitle,
        );
        await expect(
          page.locator(".cheat-sections > .cheat-section"),
        ).toHaveCount(target.sections);
        await expect(
          page.locator(".cheat-examples > .worked-example"),
        ).toHaveCount(2);
        await expect(page.locator(".cheat-recall-card")).toHaveCount(
          target.recall,
        );
        await settleRead(page);
        expect(await stored(page)).toEqual(noted);
        expect(await allWrites(page)).toEqual([]);
        const sheetNote = `030 ${profile.name} ${target.id} · kopya notu: grup özelliği / hazır stok yok.`;
        await page
          .getByRole("textbox", { name: "Notun", exact: true })
          .fill(sheetNote);
        await expect
          .poll(
            async () =>
              (await stored(page)).notes[`cheatsheet:${target.topic}`],
          )
          .toBe(sheetNote);
        const sheetNoted = await stored(page);
        expect(sheetNoted).toEqual({
          ...noted,
          notes: { ...noted.notes, [`cheatsheet:${target.topic}`]: sheetNote },
        });
        for (const example of target.sheet)
          await sheetWorked(page, example, profile.phone);
        expect(await stored(page)).toEqual(sheetNoted);
        await page.reload();
        await expect(page.locator(".study-title h1")).toHaveText(
          target.sheetTitle,
        );
        await expect(
          page.getByRole("textbox", { name: "Notun", exact: true }),
        ).toHaveValue(sheetNote);
        await settleRead(page);
        expect(await stored(page)).toEqual(sheetNoted);
        expect(await allWrites(page)).toEqual([]);
        for (const example of target.sheet) {
          const actual = await sheetWorked(page, example, profile.phone);
          geometries.push(await readingGeometry(page, actual, profile.phone));
          await info.attach(
            `${profile.name}-${target.id}-${example.title}-sheet.png`,
            { body: await actual.screenshot(), contentType: "image/png" },
          );
        }
        await axeRead(
          page,
          info,
          `${profile.name}-${target.id}-sheet-axe.json`,
        );
        expect(await stored(page)).toEqual(sheetNoted);
        expect(await allWrites(page)).toEqual([]);
        expect(JSON.stringify(lesson)).toBe(rawLessonBytes);
        await info.attach(
          `${profile.name}-${target.id}-reader-state-geometry.json`,
          {
            body: Buffer.from(
              JSON.stringify(
                { baseline, noted, sheetNoted, geometries },
                null,
                2,
              ),
            ),
            contentType: "application/json",
          },
        );
        await nav(page, "Bugün");
        await expect(page.locator(".page-heading .quiet-chip")).toHaveText(
          "0 XP",
        );
        expect(await stored(page)).toEqual(sheetNoted);
        expect(await allWrites(page)).toEqual([]);
        baseline = sheetNoted;
      }
    });
  }
});

test.describe("030 mobile full staged question help", () => {
  test.use({ hasTouch: true });
  test("320px Lexend UI200 text150: actual algebra, all five reasons and bottom note persist offline without learning writes", async ({
    page,
    context,
  }, info) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: 320, height: 844 });
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Bugün", exact: true }),
    ).toBeVisible();
    await useLexend(page, 200, 150);
    const lesson = lessons.find((l) => l.id === "sayi-problemleri")!;
    const index = 6,
      question = lesson.questions[index],
      help = guidance.get(question.id)!;
    expect(question.id).toBe("sayi-problemleri-011-7");
    expect(help.optionReasons).toHaveLength(5);
    const rawBytes = JSON.stringify(lesson.questions);
    await openQuestionLesson(page, lesson);
    const responses = [] as NonNullable<AppState["draft"]>["responses"];
    for (let i = 0; i < index; i++) {
      const q = lesson.questions[i];
      await expect(page.locator(".question-panel h2")).toHaveText(
        shownPrompt(q),
      );
      await page.locator(".answer").nth(q.answer).click();
      await page
        .getByRole("button", { name: "Cevabı kontrol et", exact: true })
        .click();
      await expect(page.locator(".feedback.correct")).toBeVisible();
      responses.push({
        questionId: q.id,
        selected: q.answer,
        correct: true,
        assisted: false,
        confidence: "medium",
      });
      await expect
        .poll(async () => (await stored(page)).draft?.responses)
        .toEqual(responses);
      await page
        .getByRole("button", { name: "Sonraki soru", exact: true })
        .click();
    }
    await expect(page.locator(".question-panel h2")).toHaveText(typeset(question.prompt.tr));
    await expect(page.locator(".answer > span:nth-child(2)")).toHaveText(
      question.options.map((o) => o.tr),
    );
    await expect(page.locator(".help-full-solution")).toHaveCount(0);
    const note = "030 telefon alt notu · 14a + 6b = 8a + 8b; 6a = 2b. ÇĞİÖŞÜ";
    await page.getByRole("textbox", { name: "Notun", exact: true }).fill(note);
    await expect.poll(async () => (await stored(page)).draft?.note).toBe(note);
    const before = await stored(page);
    expect(before.sessions).toEqual([]);
    expect(before.reviews).toEqual([]);
    expect(before.topicProgress).toEqual({});
    for (let level = 1; level <= 6; level++) {
      await page.locator(".help-next").click();
      await expect
        .poll(async () => (await stored(page)).draft?.helpLevel)
        .toBe(level);
      if (level < 6)
        await expect(page.locator(".help-full-solution")).toHaveCount(0);
    }
    const full = page.locator(".help-full-solution");
    await expect(full.locator("li")).toHaveText(help.optionReasons.map(typeset));
    await expect(full).toContainText(question.explanation.tr);
    await expect(full).toContainText(typeset(help.commonError));
    await expect(full).toContainText(typeset(help.check));
    for (const paragraph of [...help.knowledge, help.strategy, ...help.steps].map(typeset))
      await expect(page.locator(".help-content")).toContainText(paragraph);
    await expect(page.locator(".help-next")).toHaveCount(0);
    const helped = await stored(page);
    expect({ ...helped, draft: before.draft }).toEqual(before);
    expect(helped.draft).toMatchObject({
      lessonId: lesson.id,
      index,
      selected: null,
      checked: false,
      note,
      responses,
      helpLevel: 6,
      helpPanelCount: 5,
      hint: true,
    });
    const geometry = await readingGeometry(
      page,
      page.locator(".question-panel"),
      true,
      full.locator("li").first(),
      "38.25px",
    );
    const placement = await page.locator(".practice-note").evaluate((el) => ({
      top: el.getBoundingClientRect().top,
      panelBottom: document
        .querySelector(".question-panel")!
        .getBoundingClientRect().bottom,
    }));
    expect(placement.top).toBeGreaterThanOrEqual(placement.panelBottom - 1);
    await full.locator("li").nth(3).scrollIntoViewIfNeeded();
    await info.attach("phone-full-help-formula-viewport.png", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
    await axeRead(page, info, "phone-full-help-axe.json");
    await offlineReady(page);
    await context.setOffline(true);
    await page.reload();
    await expect(page.locator(".question-panel h2")).toHaveText(typeset(question.prompt.tr));
    await expect(page.locator(".help-full-solution li")).toHaveText(
      help.optionReasons.map(typeset),
    );
    await expect(
      page.getByRole("textbox", { name: "Notun", exact: true }),
    ).toHaveValue(note);
    await settleRead(page);
    expect(await stored(page)).toEqual(helped);
    expect(await allWrites(page)).toEqual([]);
    const offlineGeometry = await readingGeometry(
      page,
      page.locator(".question-panel"),
      true,
      page.locator(".help-full-solution li").first(),
      "38.25px",
    );
    await page
      .getByRole("textbox", { name: "Notun", exact: true })
      .scrollIntoViewIfNeeded();
    await info.attach("phone-bottom-note-offline-viewport.png", {
      body: await page.screenshot(),
      contentType: "image/png",
    });
    const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
    if (await menu.isVisible()) await menu.click();
    await expect(
      page
        .locator(".sidebar")
        .getByRole("button", { name: "Sorular", exact: true }),
    ).toBeVisible();
    await nav(page, "Bugün");
    await expect(page.locator(".page-heading .quiet-chip")).toHaveText("0 XP");
    expect(await stored(page)).toEqual(helped);
    expect(await allWrites(page)).toEqual([]);
    expect(JSON.stringify(lesson.questions)).toBe(rawBytes);
    await info.attach("phone-full-help-state-geometry.json", {
      body: Buffer.from(
        JSON.stringify(
          { before, helped, geometry, offlineGeometry, placement },
          null,
          2,
        ),
      ),
      contentType: "application/json",
    });
  });
});
