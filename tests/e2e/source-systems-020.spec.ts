import { setThemePreference } from "./helpers/theme";
import { test, expect, type Page, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { units } from "./forge020-unit-cases";
import type { AppState } from "../../src/domain/model";
import versionMetadata from "../../package.json" with { type: "json" };

test.describe.configure({ mode: "parallel" });

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul", hasTouch: true });

async function nav(page: Page, name: string) {
  await expect(page.locator(".sidebar")).toBeAttached();
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}

async function stored(page: Page): Promise<AppState | undefined> {
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
          record.onerror = () => reject(record.error);
        };
        request.onerror = () => reject(request.error);
      }),
  );
}

function learningEvidence(state: AppState | undefined) {
  return {
    sessions: state?.sessions ?? [],
    reviews: state?.reviews ?? [],
    theoryReviewCompletions: state?.theoryReviewCompletions ?? [],
    topicProgress: state?.topicProgress ?? {},
    unlocked: state?.unlocked ?? [],
  };
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

export type LessonCase = {
  id: string;
  exam: "TYT" | "AYT";
  firstExplanation: string;
  title: string;
  firstQuestion: string;
  lab: string;
  result: string;
  model?: string;
  exploration: string;
  interact: (page: Page, lab: Locator) => Promise<void>;
  assertOutcome: (page: Page, lab: Locator) => Promise<void>;
};

async function openFromCourses(page: Page, lesson: LessonCase) {
  await nav(page, "Konu Anlatımı");
  await expect(page.locator(".sidebar-version")).toHaveText(
    `${versionMetadata.version} alpha`,
  );
  await page.getByRole("button", { name: lesson.exam, exact: true }).click();
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(lesson.title);
  await page.locator(`.ready-topic[data-lesson-id="${lesson.id}"]`).click();
  await expect(page.locator(".study-title h1")).toHaveText(lesson.title);
  await expect(page.locator(lesson.lab)).toBeVisible();
  await expect(page.locator(".guide-section")).not.toHaveCount(0);
  await expect(page.locator('input[type="file"]')).toHaveCount(0);
  await expect(page.locator(".question-panel")).toHaveCount(0);
}

async function saveNote(page: Page, lesson: LessonCase) {
  const note = `Kendi açıklamam (${lesson.id}): sonucu başlangıç koşullarıyla karşılaştırırım.`;
  await page
    .locator(".study-notes")
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill(note);
  await expect
    .poll(async () => (await stored(page))?.notes[`lesson:${lesson.id}`])
    .toBe(note);
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  return note;
}

async function readableGeometry(page: Page, lesson: LessonCase) {
  // Bounds, scroll sizes and fonts come from the same rendered frame.
  const geometry = await page
    .locator(lesson.lab)
    .evaluate((lab, resultSelector) => {
      const bounds = lab.getBoundingClientRect();
      const style = getComputedStyle(lab);
      const result = lab.querySelector<HTMLElement>(resultSelector)!;
      const article = document
        .querySelector(".lesson-article")!
        .getBoundingClientRect();
      const notes = document
        .querySelector(".study-notes")!
        .getBoundingClientRect();
      const controls = [
        ...lab.querySelectorAll<HTMLElement>("button,input,select,textarea"),
      ]
        .map((control) => {
          const target = control.matches(
            'input[type="radio"],input[type="checkbox"]',
          )
            ? (control.closest("label") ?? control)
            : control;
          const rect = target.getBoundingClientRect();
          return {
            left: rect.left,
            right: rect.right,
            width: rect.width,
            height: rect.height,
          };
        })
        .filter((rect) => rect.width > 0 && rect.height > 0);
      const words: {
        word: string;
        lines: number;
        font: string;
        control: boolean;
      }[] = [];
      for (const element of lab.querySelectorAll<HTMLElement>(
        "button,strong,h3,h4,p,label,legend,li,figcaption,output,dt,dd",
      )) {
        if (!element.getClientRects().length) continue;
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        let node: Node | null;
        while ((node = walker.nextNode())) {
          for (const match of (node.textContent ?? "").matchAll(
            /\p{L}[\p{L}\p{M}]*/gu,
          )) {
            const range = document.createRange();
            range.setStart(node, match.index!);
            range.setEnd(node, match.index! + match[0].length);
            const rows = [...range.getClientRects()].filter(
              (rect) => rect.width > 0,
            );
            words.push({
              word: match[0],
              lines: new Set(rows.map((rect) => Math.round(rect.top * 2) / 2))
                .size,
              font: getComputedStyle(element).fontSize,
              control:
                element.tagName === "BUTTON" ||
                (element.tagName === "STRONG" &&
                  !!element.closest('[role="status"],[data-feedback]')),
            });
          }
        }
      }
      return {
        words,
        labFont: style.fontSize,
        duplicateIds: [...document.querySelectorAll("[id]")]
          .map((element) => element.id)
          .filter((id, i, all) => id && all.indexOf(id) !== i),
        documentWidth: document.documentElement.scrollWidth,
        viewport: innerWidth,
        rootFont: getComputedStyle(document.documentElement).fontSize,
        textScale: getComputedStyle(document.documentElement)
          .getPropertyValue("--text-scale")
          .trim(),
        left: bounds.left,
        right: bounds.right,
        clientWidth: lab.clientWidth,
        scrollWidth: lab.scrollWidth,
        readingWidth:
          lab.clientWidth -
          parseFloat(style.paddingLeft) -
          parseFloat(style.paddingRight),
        resultIsHtml:
          result.namespaceURI === "http://www.w3.org/1999/xhtml" &&
          !result.closest("svg"),
        resultText: result.textContent?.trim(),
        resultFont: parseFloat(getComputedStyle(result).fontSize),
        articleBottom: article.bottom,
        noteTop: notes.top,
        controls,
      };
    }, lesson.result);
  expect(geometry.documentWidth).toBeLessThanOrEqual(geometry.viewport + 1);
  expect(geometry.duplicateIds).toEqual([]);
  expect(geometry.left).toBeGreaterThanOrEqual(0);
  expect(geometry.right).toBeLessThanOrEqual(geometry.viewport + 1);
  expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth + 1);
  expect(geometry.rootFont).toBe("32px");
  expect(geometry.textScale).toBe("1.5");
  expect(geometry.readingWidth).toBeGreaterThanOrEqual(220);
  expect(geometry.resultIsHtml).toBe(true);
  expect(geometry.resultText!.length).toBeGreaterThan(20);
  expect(geometry.resultFont).toBeGreaterThanOrEqual(24);
  expect(geometry.noteTop).toBeGreaterThanOrEqual(geometry.articleBottom);
  const splitWords = geometry.words.filter((word) => word.lines !== 1);
  if (splitWords.length)
    await test.info().attach("split-visible-words", {
      body: JSON.stringify(
        { lessonId: lesson.id, labFont: geometry.labFont, words: splitWords },
        null,
        2,
      ),
      contentType: "application/json",
    });
  expect(geometry.words.length).toBeGreaterThan(0);
  for (const word of geometry.words) {
    if (word.control)
      expect(
        word.font,
        `${lesson.id}: ${word.word} keeps the selected size`,
      ).toBe(geometry.labFont);
    else expect(parseFloat(word.font)).toBeGreaterThanOrEqual(24);
    expect(word.lines, `${lesson.id}: ${word.word} stays whole`).toBe(1);
  }
  expect(geometry.controls.length).toBeGreaterThan(0);
  for (const control of geometry.controls) {
    expect(control.left).toBeGreaterThanOrEqual(geometry.left - 1);
    expect(control.right).toBeLessThanOrEqual(geometry.right + 1);
    expect(control.width).toBeGreaterThanOrEqual(44);
    expect(control.height).toBeGreaterThanOrEqual(44);
  }
}

test("all twenty-nine newly taught units have independent end-to-end cases", () => {
  expect(units).toHaveLength(29);
  expect(new Set(units.map((unit) => unit.id)).size).toBe(29);
});

for (const lesson of units) {
  test(`${lesson.id}: normal course entry changes the model and keeps it and its note offline without learning credit`, async ({
    page,
    context,
  }) => {
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Bugün", exact: true }),
    ).toBeVisible();
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(String(e)));
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
    const before = learningEvidence(await stored(page));
    await openFromCourses(page, lesson);
    const lab = page.locator(lesson.lab);
    const model = lab.locator(lesson.model ?? "svg").first();
    await expect(model).toBeVisible();
    const beforeModel = await model.innerHTML();
    await lesson.interact(page, lab);
    await lesson.assertOutcome(page, lab);
    expect(await model.innerHTML()).not.toBe(beforeModel);
    const note = await saveNote(page, lesson);
    const saved = await stored(page);
    expect(saved?.explorations[lesson.exploration]).toBeDefined();
    expect(learningEvidence(saved)).toEqual(before);
    await offlineReady(page);
    await context.setOffline(true);
    await page.reload();
    await lesson.assertOutcome(page, lab);
    await expect(
      page
        .locator(".study-notes")
        .getByRole("textbox", { name: "Notun", exact: true }),
    ).toHaveValue(note);
    expect((await stored(page))?.explorations[lesson.exploration]).toEqual(
      saved!.explorations[lesson.exploration],
    );
    expect(learningEvidence(await stored(page))).toEqual(before);
    await page.getByRole("button", { name: "Sorulara geç", exact: true }).tap();
    await expect(page.locator(".question-meta")).toContainText("Soru 1 / 10");
    await expect(page.locator(".answer")).toHaveCount(5);
    await expect(page.locator(".question-panel h2")).toHaveText(
      lesson.firstQuestion,
    );
    await page.locator(".answer").first().tap();
    await page
      .getByRole("button", { name: "Cevabı kontrol et", exact: true })
      .tap();
    await expect(page.locator(".feedback")).toBeVisible();
    await expect(page.locator(".feedback p")).toHaveText(
      lesson.firstExplanation,
    );
    await expect(page.locator(".save-status")).toContainText(
      "Bu cihazda kaydedildi",
    );
    await page.reload();
    await expect(page.locator(".feedback")).toBeVisible();
    expect(learningEvidence(await stored(page))).toEqual(before);
    expect(errors).toEqual([]);
  });
  test(`${lesson.id}: actual touch interaction and HTML results fit 320px with UI200/text150 and reduced motion`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(String(error)));
    page.on("console", (message) => {
      if (
        message.type() === "error" &&
        !/\/favicon\.ico(?:[?#]|$)/.test(message.location().url)
      )
        errors.push(message.text());
    });
    await page.goto("/");
    await nav(page, "Ayarlar");
    await setThemePreference(page, "light");
    await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
    await page
      .getByLabel("Yalnızca yazı boyutu %", { exact: true })
      .fill("150");
    await page.getByRole("switch", { name: /Aion animasyonu/ }).uncheck();
    await expect(page.locator(".save-status")).toContainText(
      "Bu cihazda kaydedildi",
    );
    await page.setViewportSize({ width: 320, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await openFromCourses(page, lesson);
    const lab = page.locator(lesson.lab);
    await lesson.interact(page, lab);
    await lesson.assertOutcome(page, lab);
    await readableGeometry(page, lesson);
    await nav(page, "Ayarlar");
    await page.getByLabel("Yazı tipi", { exact: true }).selectOption("lexend");
    const loadedFonts = await page.evaluate(async () => {
      const rows = [];
      for (const weight of [400, 600, 700]) {
        const faces = await document.fonts.load(
          `${weight} 45px "Lexend"`,
          "Çığ Öş Üç İğ Aa",
        );
        rows.push({
          weight,
          count: faces.length,
          loaded: faces.every((f) => f.status === "loaded"),
        });
      }
      return rows;
    });
    for (const font of loadedFonts) {
      expect(font.count, `Lexend ${font.weight}`).toBeGreaterThan(0);
      expect(font.loaded).toBe(true);
    }
    await openFromCourses(page, lesson);
    await lesson.assertOutcome(page, page.locator(lesson.lab));
    await readableGeometry(page, lesson);
    const scan = await new AxeBuilder({ page }).include("main").analyze();
    expect(
      scan.violations.filter((v) =>
        ["serious", "critical"].includes(v.impact ?? ""),
      ),
    ).toEqual([]);
    expect(errors).toEqual([]);
  });
}
