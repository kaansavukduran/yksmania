import { setThemePreference } from "./helpers/theme";
import { units as olderUnits } from "./forge023-unit-cases";
import { restoredCases } from "./forge024-restored-case-meta";
import { test, expect, type Page, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { units } from "./forge024-unit-cases";
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
  questionCount: number;
  optionCount?: number;
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
          // Native menu options and textarea values are painted by the control,
          // not by descendant HTML text ranges. Control dimensions and values
          // are checked separately; the chosen option also has visible HTML.
          if (node.parentElement?.closest("option, textarea")) continue;
          for (const match of (node.textContent ?? "").matchAll(
            /\p{L}[\p{L}\p{M}]*/gu,
          )) {
            const range = document.createRange();
            range.setStart(node, match.index!);
            range.setEnd(node, match.index! + match[0].length);
            let rows = [...range.getClientRects()].filter(
              (rect) => rect.width > 0,
            );
            // Chromium includes a preceding discretionary hyphen's rectangle
            // in a range beginning immediately after it. Remove only that
            // exact rectangle; genuine suffix wrapping still spans two rows.
            if (node.textContent?.[match.index! - 1] === "\u00ad") {
              const hyphen = document.createRange();
              hyphen.setStart(node, match.index! - 1);
              hyphen.setEnd(node, match.index!);
              const hyphenRects = [...hyphen.getClientRects()].filter(
                (rect) => rect.width > 0,
              );
              rows = rows.filter(
                (rect) =>
                  !hyphenRects.some(
                    (mark) =>
                      Math.abs(mark.left - rect.left) < 0.01 &&
                      Math.abs(mark.top - rect.top) < 0.01 &&
                      Math.abs(mark.width - rect.width) < 0.01 &&
                      Math.abs(mark.height - rect.height) < 0.01,
                  ),
              );
            }
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

test("all twenty-nine new units and one extended unit have independent end-to-end cases", () => {
  expect(units).toHaveLength(30);
  expect(new Set(units.map((unit) => unit.id)).size).toBe(30);
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
    await expect(page.locator(".question-meta")).toContainText(
      `Soru 1 / ${lesson.questionCount}`,
    );
    await expect(page.locator(".answer")).toHaveCount(lesson.optionCount ?? 5);
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

for (const restored of restoredCases) {
  test(`${restored.id}: raw wrong-type persisted model selection cannot reopen feedback and recovers on explicit input`, async ({
    page,
  }) => {
    const unit = (units.find((u) => u.id === restored.id) ??
      olderUnits.find((u) => u.id === restored.id))!;
    await page.goto("/");
    await openFromCourses(page, unit);
    const lab = page.locator(unit.lab);
    await unit.interact(page, lab);
    await unit.assertOutcome(page, lab);
    await expect(page.locator(".save-status")).toContainText(
      "Bu cihazda kaydedildi",
    );
    const before = (await stored(page))!;
    const record = before.explorations[restored.key];
    expect(record).toBeDefined();
    const field =
      restored.activeFields?.[String(record.mode)] ?? restored.field;
    expect(Object.hasOwn(record, field)).toBe(true);
    expect(typeof restored.wrong).not.toBe(typeof record[field]);
    await page.evaluate(
      async ({ key, field, wrong }) =>
        new Promise<void>((resolve, reject) => {
          const request = indexedDB.open("yksmania");
          request.onerror = () => reject(request.error);
          request.onsuccess = () => {
            const db = request.result,
              tx = db.transaction("state", "readwrite"),
              table = tx.objectStore("state"),
              read = table.get("current");
            read.onsuccess = () => {
              const state = read.result;
              state.explorations[key] = {
                ...state.explorations[key],
                [field]: wrong,
              };
              table.put(state, "current");
            };
            tx.oncomplete = () => {
              db.close();
              resolve();
            };
            tx.onerror = tx.onabort = () => {
              db.close();
              reject(tx.error);
            };
          };
        }),
      { key: restored.key, field, wrong: restored.wrong },
    );
    await page.reload();
    await expect(lab).toBeVisible();
    const feedback = lab.locator(restored.feedback);
    if (restored.hiddenText) {
      await expect(feedback).toContainText(restored.hiddenText);
      await expect(feedback).not.toContainText(restored.revealedText!);
    } else await expect(feedback).toHaveCount(0);
    await expect(
      lab.getByRole("button", { name: restored.button, exact: true }),
    ).toBeDisabled();
    expect(learningEvidence(await stored(page))).toEqual(
      learningEvidence(before),
    );
    await lab
      .getByRole("textbox", { name: restored.reasonLabel, exact: true })
      .fill(restored.freshReason);
    await expect
      .poll(
        async () =>
          typeof (await stored(page))?.explorations[restored.key]?.[field],
      )
      .toBe(typeof record[field]);
    if (restored.guessLabel) {
      const guess = lab.getByRole("combobox", {
        name: restored.guessLabel,
        exact: true,
      });
      const value =
        restored.guessValue ??
        (await guess
          .locator('option[value]:not([value=""])')
          .first()
          .getAttribute("value"));
      await guess.selectOption(value!);
      await lab
        .getByRole("textbox", { name: restored.reasonLabel, exact: true })
        .fill(restored.freshReason);
    }
    await expect(
      lab.getByRole("button", { name: restored.button, exact: true }),
    ).toBeEnabled();
    await lab
      .getByRole("button", { name: restored.button, exact: true })
      .click();
    if (restored.revealedText)
      await expect(feedback).toContainText(restored.revealedText);
    else await expect(feedback).toBeVisible();
    await expect
      .poll(
        async () =>
          typeof (await stored(page))?.explorations[restored.key]?.[field],
      )
      .toBe(typeof record[field]);
    const repaired = (await stored(page))!.explorations[restored.key];
    await page.reload();
    if (restored.revealedText)
      await expect(feedback).toContainText(restored.revealedText);
    else await expect(feedback).toBeVisible();
    expect((await stored(page))!.explorations[restored.key]).toEqual(repaired);
    expect(learningEvidence(await stored(page))).toEqual(
      learningEvidence(before),
    );
  });
}

for (const sectionCount of [undefined, 11]) {
  test(`turev-teget: legacy examples bookmark with ${sectionCount ?? "missing"} section count keeps its activity until explicit next`, async ({
    page,
  }) => {
    const unit = units.find((u) => u.id === "turev-teget")!;
    await page.goto("/");
    await openFromCourses(page, unit);
    await page
      .locator(".derivative-lab")
      .getByRole("combobox", { name: "Fonksiyon", exact: true })
      .selectOption("absolute");
    const note = "Türev notum: eski örnek konumum.";
    await page
      .locator(".study-notes")
      .getByRole("textbox", { name: "Notun", exact: true })
      .fill(note);
    await expect
      .poll(async () => (await stored(page))?.explorations.derivative?.absolute)
      .toBe(true);
    await expect(page.locator(".save-status")).toContainText(
      "Bu cihazda kaydedildi",
    );
    const before = (await stored(page))!;
    const journey = {
      step: 11,
      guided: true,
      ...(sectionCount === undefined ? {} : { sectionCount }),
    };
    await page.evaluate(
      async (journey) =>
        new Promise<void>((resolve, reject) => {
          const request = indexedDB.open("yksmania");
          request.onerror = () => reject(request.error);
          request.onsuccess = () => {
            const db = request.result,
              tx = db.transaction("state", "readwrite"),
              table = tx.objectStore("state"),
              read = table.get("current");
            read.onsuccess = () => {
              const state = read.result;
              state.explorations["guide:turev-teget"] = journey;
              table.put(state, "current");
            };
            tx.oncomplete = () => {
              db.close();
              resolve();
            };
            tx.onerror = tx.onabort = () => {
              db.close();
              reject(tx.error);
            };
          };
        }),
      journey,
    );
    await page.reload();
    await expect(page.locator(".guide-examples h2")).toHaveText(
      "Çözümlü örnekler",
    );
    await expect(page.locator(".worked-example")).toHaveCount(12);
    await expect(page.locator(".learning-journey")).toContainText(
      "Bölüm 20 / 21",
    );
    await expect(
      page
        .locator(".study-notes")
        .getByRole("textbox", { name: "Notun", exact: true }),
    ).toHaveValue(note);
    expect((await stored(page))!.explorations["guide:turev-teget"]).toEqual(
      journey,
    );
    expect((await stored(page))!.explorations.derivative).toEqual(
      before.explorations.derivative,
    );
    expect(learningEvidence(await stored(page))).toEqual(
      learningEvidence(before),
    );
    await page
      .getByRole("button", { name: "Sonraki bölüm", exact: true })
      .click();
    await expect(page.locator(".guide-recall h2")).toHaveText(
      "Anlatmadan önce hatırla",
    );
    await expect
      .poll(async () => (await stored(page))?.explorations["guide:turev-teget"])
      .toEqual({ step: 20, guided: true, sectionCount: 19 });
    expect((await stored(page))!.explorations.derivative).toEqual(
      before.explorations.derivative,
    );
    expect(learningEvidence(await stored(page))).toEqual(
      learningEvidence(before),
    );
  });
}

test("anadoluda-islam: canonical long place name uses visible discretionary hyphenation at large text", async ({
  page,
}) => {
  await page.goto("/");
  await nav(page, "Ayarlar");
  await setThemePreference(page, "light");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.getByLabel("Yazı tipi", { exact: true }).selectOption("lexend");
  await page.getByRole("switch", { name: /Aion animasyonu/ }).uncheck();
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const loaded = await page.evaluate(async () => {
    const groups = await Promise.all(
      [400, 600, 700].map((weight) =>
        document.fonts.load(`${weight} 45px Lexend`, "Sulucakarahöyük Çığ"),
      ),
    );
    return groups.every(
      (faces) => faces.length > 0 && faces.every((f) => f.status === "loaded"),
    );
  });
  expect(loaded).toBe(true);
  const unit = units.find((u) => u.id === "anadoluda-islam")!;
  await openFromCourses(page, unit);
  const lab = page.locator(unit.lab),
    person = lab.getByRole("combobox", {
      name: "Temel şahsiyet kartı",
      exact: true,
    });
  const option = person
    .locator("option")
    .filter({ hasText: /Hacı.*Bektaş/ })
    .first();
  await person.selectOption((await option.getAttribute("value"))!);
  const names = lab.locator('[aria-label="Sulucakarahöyük"]');
  expect(await names.count()).toBeGreaterThan(0);
  for (const name of await names.all()) {
    await expect(name).toBeVisible();
    expect((await name.innerText()).replace(/\u00ad/g, "")).toBe(
      "Sulucakarahöyük",
    );
  }
  await readableGeometry(page, unit);
  const scan = await new AxeBuilder({ page }).include("main").analyze();
  expect(
    scan.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
  await names.first().scrollIntoViewIfNeeded();
  await test.info().attach("canonical-place-name-large-text", {
    body: await page.screenshot(),
    contentType: "image/png",
  });
});
