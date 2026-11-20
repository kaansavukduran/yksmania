import { typeset } from "../../src/domain/typeset";
import {
  expect,
  test,
  type BrowserContext,
  type Page,
  type TestInfo,
} from "@playwright/test";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";
import {
  initialState,
  type AppState,
  type Lesson,
} from "../../src/domain/model";
import type { ExamItem } from "../../src/domain/examModel";
import type { ExamSpec } from "../../src/domain/exams";
import {
  questionIdentity,
  type QuestionGuidance,
} from "../../src/domain/questionHelpModel";

type ProgressDraft = NonNullable<AppState["draft"]> & {
  helpPanelCount?: number;
};
type ProgressExam = NonNullable<AppState["examDraft"]> & {
  helpPanelCounts?: Record<string, number>;
};
type ProgressState = Omit<AppState, "draft" | "examDraft"> & {
  draft: ProgressDraft | null;
  examDraft: ProgressExam | null;
};
type HelpRow = { id: string; identity: string; guidance: QuestionGuidance };
const lessonId = "sayi-basamaklari";
const firstId = "f013-foundation-sayi-basamaklari-1";
const originalHint = "Rakamın bulunduğu konumu sağdan sola belirle.";
let lesson: Lesson;
let rows: HelpRow[];
let subjectName: string;
let beginExam: typeof import("../../src/domain/exams").beginExam;
let validateState: typeof import("../../src/domain/storage").validateState;

test.use({ locale: "tr-TR" });

// Only metadata/fixture construction runs in Node. Vite handles the app's
// existing JSON imports; it serves no browser and closes after loading source.
test.beforeAll(async ({}, testInfo) => {
  const root = fileURLToPath(new URL("../..", import.meta.url));
  const source = await createServer({
    root,
    configFile: false,
    cacheDir: testInfo.outputPath("help-fixture-source-cache"),
    optimizeDeps: { noDiscovery: true, include: [] },
    server: { middlewareMode: true, hmr: false },
    appType: "custom",
  });
  try {
    const [content, exams, storage, mathJSON] = await Promise.all([
      source.ssrLoadModule("/src/domain/content.ts"),
      source.ssrLoadModule("/src/domain/exams.ts"),
      source.ssrLoadModule("/src/domain/storage.ts"),
      readFile(`${root}/src/learning/guidance027Math.json`, "utf8"),
    ]);
    lesson = content.lessonById(lessonId);
    subjectName = content.subjectById(lesson.subjectId).name.tr;
    beginExam = exams.beginExam;
    validateState = storage.validateState;
    const mathRows: HelpRow[] = JSON.parse(mathJSON);
    rows = lesson.questions.slice(0, 2).map((question) => {
      const row = mathRows.find((entry) => entry.id === question.id)!;
      expect(row.identity).toBe(
        questionIdentity({
          id: question.id,
          prompt: question.prompt.tr,
          passage: question.passage?.tr,
          options: question.options.map((option) => option.tr),
          answer: question.answer,
          hint: question.hint.tr,
          explanation: question.explanation.tr,
        }),
      );
      expect(question.guidance).toBeUndefined();
      expect(row.guidance.steps).toHaveLength(3);
      expect(row.guidance.optionReasons).toHaveLength(5);
      return row;
    });
    expect(lesson.questions[0].id).toBe(firstId);
    expect(lesson.questions[0].hint.tr).toBe(originalHint);
    // None of these actual new steps repeats the original hint. This browser
    // case asserts its real first panel; later-step mapping has a unit oracle.
    expect(rows[0].guidance.steps).not.toContain(originalHint);
  } finally {
    await source.close();
  }
});

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const counter = window as unknown as { __help027StateWrites: number };
    counter.__help027StateWrites = 0;
    const original = IDBObjectStore.prototype.put;
    IDBObjectStore.prototype.put = function (
      ...args: Parameters<IDBObjectStore["put"]>
    ) {
      if (this.name === "state" && args[1] === "current")
        counter.__help027StateWrites++;
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

async function stored(page: Page): Promise<ProgressState> {
  return page.evaluate(
    () =>
      new Promise<ProgressState>((resolve, reject) => {
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
            else reject(new Error("Expected a durable help state"));
          };
        };
      }),
  );
}

const writes = (page: Page) =>
  page.evaluate(
    () =>
      (window as unknown as { __help027StateWrites: number })
        .__help027StateWrites,
  );

function fixtureBase(): AppState {
  const state = initialState();
  state.notes = { "help027-preserved": "Eski defter notu; ÇĞİÖŞÜ +12 −5." };
  state.readingPages = { "help027-preserved": 7 };
  state.explorations = { "help027-preserved": { record: 2, reveal: false } };
  return state;
}

function legacyStudy(level: 1 | 2, checked: boolean): ProgressState {
  const state = fixtureBase();
  const question = lesson.questions[0];
  state.draft = {
    lessonId,
    phase: "practice",
    index: 0,
    responses: checked
      ? [
          {
            questionId: question.id,
            selected: question.answer,
            correct: true,
            assisted: true,
            confidence: "medium",
            helpLevel: level,
          },
        ]
      : [],
    selected: checked ? question.answer : null,
    checked,
    hint: true,
    helpLevel: level,
    confidence: "medium",
    note: `Eski yardım sırası ${level}; özgün not ÇĞİÖŞÜ.`,
    startedAt: Date.now() - 12_000,
  };
  return validateState(state);
}

function examFixture(inlineGuidance: boolean): ProgressState {
  const items: ExamItem[] = lesson.questions
    .slice(0, 2)
    .map((question, index) => ({
      id: question.id,
      lessonId,
      subjectId: lesson.subjectId,
      subjectName,
      lessonTitle: lesson.title.tr,
      prompt: question.prompt.tr,
      options: question.options.map((option) => option.tr),
      answer: question.answer,
      explanation: question.explanation.tr,
      hint: question.hint.tr,
      ...(inlineGuidance
        ? { guidance: structuredClone(rows[index].guidance) }
        : {}),
    }));
  const spec: ExamSpec = {
    id: inlineGuidance ? "help027-fresh-inline-two" : "help027-legacy-raw-two",
    title: inlineGuidance ? "Yeni rehberli iki soru" : "Eski ham iki soru",
    exam: "TYT",
    kind: "branch",
    items,
    durationSeconds: 3600,
    fullLength: false,
    missingSubjects: [],
  };
  const state = beginExam(fixtureBase(), spec, Date.now(), "learning");
  state.examDraft = {
    ...state.examDraft!,
    answers: inlineGuidance ? [null, null] : [items[0].answer, null],
    flagged: inlineGuidance ? [] : [1],
    helpLevels: inlineGuidance ? [2, 0] : [2, 1],
  };
  return validateState(state);
}

async function seedAndMount(
  page: Page,
  fixture: ProgressState,
  route: "/practice" | "/exams",
) {
  // Synthetic current-schema setup: no historical application binary is run.
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Bugün", exact: true }),
  ).toBeVisible();
  await page.evaluate(
    (state) =>
      new Promise<void>((resolve, reject) => {
        const request = indexedDB.open("yksmania");
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const database = request.result;
          const transaction = database.transaction("state", "readwrite");
          transaction.objectStore("state").put(state, "current");
          transaction.oncomplete = () => {
            database.close();
            resolve();
          };
          transaction.onerror = () => reject(transaction.error);
          transaction.onabort = () => reject(transaction.error);
        };
      }),
    fixture,
  );
  await page.evaluate((target) => {
    location.hash = target;
  }, route);
  await page.reload();
  await expect(
    page.locator(route === "/practice" ? ".question-panel" : ".exam-runner"),
  ).toBeVisible();
}

async function offlineReload(page: Page, context: BrowserContext) {
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
  await context.setOffline(true);
  await page.reload();
}

async function expectFull(page: Page) {
  await expect(page.locator(".help-full-solution")).toBeVisible();
  await expect(page.locator(".help-full-solution ol > li")).toHaveText(
    rows[0].guidance.optionReasons,
  );
  await expect(page.locator(".help-full-solution ol > li")).toHaveCount(5);
  await expect(page.locator(".help-content h3")).toHaveText([
    "Bilmen gerekenler",
    "Çözüm yolu",
    "1. adım",
    "2. adım",
    "3. adım",
    "Tam çözüm",
  ]);
}

async function expectMethod(page: Page) {
  await expect(page.locator(".help-content h3")).toHaveText([
    "Bilmen gerekenler",
    "Çözüm yolu",
  ]);
  await expect(
    page.locator(".help-content > section").nth(1).locator("p"),
  ).toHaveText(rows[0].guidance.strategy);
  await expect(page.locator(".help-full-solution")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "1. adım aç", exact: true }),
  ).toBeVisible();
}

async function unchanged(page: Page, fixture: ProgressState) {
  const actual = await stored(page);
  expect(actual).toEqual(fixture);
  expect(JSON.stringify(actual)).toBe(JSON.stringify(fixture));
  expect(await writes(page)).toBe(0);
  return actual;
}

async function attachState(testInfo: TestInfo, value: unknown) {
  await testInfo.attach("help-027-persisted-state.json", {
    body: Buffer.from(JSON.stringify(value, null, 2)),
    contentType: "application/json",
  });
}

test("old checked basic draft level2 remains the full solution with five reasons and no automatic write offline", async ({
  page,
  context,
}, testInfo) => {
  test.setTimeout(60_000);
  const fixture = legacyStudy(2, true);
  expect(Object.hasOwn(fixture.draft!, "helpPanelCount")).toBe(false);
  expect(Object.hasOwn(fixture.draft!.responses[0], "helpPanelCount")).toBe(
    false,
  );
  await seedAndMount(page, fixture, "/practice");
  await expect(page.locator(".question-panel h2")).toHaveText(typeset(lesson.questions[0].prompt.tr));
  await expectFull(page);
  const mounted = await unchanged(page, fixture);
  await offlineReload(page, context);
  await expectFull(page);
  const reloaded = await unchanged(page, fixture);
  await attachState(testInfo, {
    fixture,
    mounted,
    reloaded,
    writesAfterReload: await writes(page),
  });
});

test("old hint1 opens its actual original-hint panel without becoming full or rewriting the draft", async ({
  page,
  context,
}, testInfo) => {
  test.setTimeout(60_000);
  const fixture = legacyStudy(1, false);
  await seedAndMount(page, fixture, "/practice");
  await expect(page.locator(".help-content h3")).toHaveText([
    "Bilmen gerekenler",
  ]);
  await expect(
    page
      .locator(".help-content > section")
      .first()
      .getByText(originalHint, { exact: true }),
  ).toBeVisible();
  await expect(page.locator(".help-full-solution")).toHaveCount(0);
  await expect(
    page.getByRole("button", { name: "Çözüm yolu aç", exact: true }),
  ).toBeVisible();
  const mounted = await unchanged(page, fixture);
  await offlineReload(page, context);
  await expect(page.locator(".help-content h3")).toHaveText([
    "Bilmen gerekenler",
  ]);
  await expect(
    page.locator(".help-content").getByText(originalHint, { exact: true }),
  ).toBeVisible();
  await expect(page.locator(".help-full-solution")).toHaveCount(0);
  const reloaded = await unchanged(page, fixture);
  await attachState(testInfo, { fixture, mounted, reloaded });
});

test("two fresh explicit study help clicks save count5 and level2 as method across offline reload", async ({
  page,
  context,
}, testInfo) => {
  test.setTimeout(60_000);
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Bugün", exact: true }),
  ).toBeVisible();
  await nav(page, "Sorular");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(lesson.title.tr);
  await page.locator(`.ready-topic[data-lesson-id="${lessonId}"]`).click();
  await expect(page.locator(".question-panel h2")).toHaveText(typeset(lesson.questions[0].prompt.tr));
  await expect(page.locator(".hint-box")).toHaveCount(0);
  await expect
    .poll(async () => (await stored(page)).draft?.lessonId)
    .toBe(lessonId);
  const before = await stored(page);
  await page.getByRole("button", { name: "İpucu al", exact: true }).click();
  await expect(page.locator(".help-content h3")).toHaveText([
    "Bilmen gerekenler",
  ]);
  await expect
    .poll(async () => (await stored(page)).draft?.helpPanelCount)
    .toBe(5);
  expect((await stored(page)).draft!.helpLevel).toBe(1);
  await page
    .getByRole("button", { name: "Çözüm yolu aç", exact: true })
    .click();
  await expectMethod(page);
  await expect.poll(async () => (await stored(page)).draft?.helpLevel).toBe(2);
  const helped = await stored(page);
  expect(helped.draft!.helpPanelCount).toBe(5);
  expect(helped.draft!.hint).toBe(true);
  const {
    hint: _oldHint,
    helpLevel: _oldLevel,
    helpPanelCount: _oldCount,
    ...beforeCore
  } = before.draft!;
  const {
    hint: _newHint,
    helpLevel: _newLevel,
    helpPanelCount: _newCount,
    ...afterCore
  } = helped.draft!;
  expect(afterCore).toEqual(beforeCore);
  expect({ ...helped, draft: before.draft }).toEqual(before);
  await offlineReload(page, context);
  await expectMethod(page);
  const reloaded = await unchanged(page, helped);
  await attachState(testInfo, { before, helped, reloaded });
});

test("old raw custom exam level2 remains full without changing its snapshot order, deadline, answers or flags", async ({
  page,
  context,
}, testInfo) => {
  test.setTimeout(60_000);
  const fixture = examFixture(false);
  expect(fixture.examDraft!.items.map((item) => item.id)).toEqual([
    firstId,
    "f013-foundation-sayi-basamaklari-2",
  ]);
  expect(
    fixture.examDraft!.items.every((item) => !Object.hasOwn(item, "guidance")),
  ).toBe(true);
  expect(Object.hasOwn(fixture.examDraft!, "helpPanelCounts")).toBe(false);
  const rawItemBytes = JSON.stringify(fixture.examDraft!.items);
  await seedAndMount(page, fixture, "/exams");
  await expect(page.locator(".exam-question h2")).toHaveText(
    fixture.examDraft!.items[0].prompt,
  );
  await expectFull(page);
  const mounted = await unchanged(page, fixture);
  await offlineReload(page, context);
  await expectFull(page);
  const reloaded = await unchanged(page, fixture);
  expect(JSON.stringify(reloaded.examDraft!.items)).toBe(rawItemBytes);
  expect(reloaded.examDraft!.answers).toEqual([
    lesson.questions[0].answer,
    null,
  ]);
  expect(reloaded.examDraft!.flagged).toEqual([1]);
  expect(reloaded.examDraft!.deadline).toBe(fixture.examDraft!.deadline);
  await attachState(testInfo, { fixture, mounted, reloaded, rawItemBytes });
});

test("fresh inline-guidance exam level2 remains method and its next explicit help click writes canonical count5", async ({
  page,
  context,
}, testInfo) => {
  test.setTimeout(60_000);
  const fixture = examFixture(true);
  expect(Object.hasOwn(fixture.examDraft!, "helpPanelCounts")).toBe(false);
  expect(fixture.examDraft!.items[0].guidance).toEqual(rows[0].guidance);
  const rawItemBytes = JSON.stringify(fixture.examDraft!.items);
  await seedAndMount(page, fixture, "/exams");
  await expectMethod(page);
  const mounted = await unchanged(page, fixture);
  await page.getByRole("button", { name: "1. adım aç", exact: true }).click();
  await expect(page.locator(".help-content h3")).toHaveText([
    "Bilmen gerekenler",
    "Çözüm yolu",
    "1. adım",
  ]);
  await expect(page.locator(".help-full-solution")).toHaveCount(0);
  await expect
    .poll(async () => (await stored(page)).examDraft?.helpLevels)
    .toEqual([3, 0]);
  const helped = await stored(page);
  expect(helped.examDraft!.helpPanelCounts).toEqual({ 0: 5 });
  expect(JSON.stringify(helped.examDraft!.items)).toBe(rawItemBytes);
  const {
    helpLevels: _oldLevels,
    helpPanelCounts: _oldCounts,
    ...beforeCore
  } = fixture.examDraft!;
  const {
    helpLevels: _newLevels,
    helpPanelCounts: _newCounts,
    ...afterCore
  } = helped.examDraft!;
  expect(afterCore).toEqual(beforeCore);
  expect({ ...helped, examDraft: fixture.examDraft }).toEqual(fixture);
  expect(await writes(page)).toBe(1);
  await offlineReload(page, context);
  await expect(page.locator(".help-content h3")).toHaveText([
    "Bilmen gerekenler",
    "Çözüm yolu",
    "1. adım",
  ]);
  await expect(
    page.locator(".help-content > section").nth(2).locator("p"),
  ).toHaveText(rows[0].guidance.steps[0]);
  await expect(page.locator(".help-full-solution")).toHaveCount(0);
  const reloaded = await unchanged(page, helped);
  await attachState(testInfo, { fixture, mounted, helped, reloaded });
});
