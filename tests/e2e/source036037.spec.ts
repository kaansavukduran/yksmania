import { typeset } from "../../src/domain/typeset";
import release from "../../package.json" with { type: "json" };
import flow from "../fixtures/source036037-question-flow.json" with { type: "json" };
import { test, expect, type Page, type Locator } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { AppState } from "../../src/domain/model";
import { setThemePreference } from "./helpers/theme";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
// @ts-expect-error The shared executable acceptance harness is plain JavaScript.
import { forge036037SmokeCases } from "../../scripts/forge036037-smoke-cases.mjs";
registerOfflineBootDiagnostics();

// Old saved theme preferences remain supported without adding new UI choices.
// Inspect rendered colors and geometry rather than the CSS source literals.
async function renderedContrast(lab: Locator) {
  return lab.evaluate((root) => {
    const rgb = (value: string) => {
      const parts = value.match(/[\d.]+/g)?.map(Number);
      if (!parts || parts.length < 3) throw Error(`Unresolved color: ${value}`);
      return parts.slice(0, 3);
    };
    const luminance = (color: number[]) =>
      color
        .map((channel) => {
          const v = channel / 255;
          return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
        })
        .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
    const ratio = (a: number[], b: number[]) => {
      const x = luminance(a),
        y = luminance(b);
      return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
    };
    let ancestor: Element | null = root;
    while (ancestor) {
      const value = getComputedStyle(ancestor).backgroundColor;
      if (value !== "transparent" && value !== "rgba(0, 0, 0, 0)") break;
      ancestor = ancestor.parentElement;
    }
    if (!ancestor) throw Error("No rendered opaque background");
    const background = rgb(getComputedStyle(ancestor).backgroundColor);
    const rows: {
      kind: string;
      label: string;
      ratio: number;
      minimum: number;
    }[] = [];
    for (const item of root.querySelectorAll(
      ".f037-lines dl dt, .f037-lines dl dd",
    )) {
      rows.push({
        kind: "interval-text",
        label: item.textContent ?? "",
        ratio: ratio(rgb(getComputedStyle(item).color), background),
        minimum: 4.5,
      });
    }
    for (const text of root.querySelectorAll<SVGTextElement>("svg text")) {
      const box = text.getBBox(),
        x = box.x + box.width / 2,
        y = box.y + box.height / 2;
      const backing = [
        ...text.ownerSVGElement!.querySelectorAll<SVGRectElement>(
          ".f036-box, .f036-box-a, .f036-box-b",
        ),
      ].find((rect) => {
        const b = rect.getBBox();
        return (
          x >= b.x && x <= b.x + b.width && y >= b.y && y <= b.y + b.height
        );
      });
      rows.push({
        kind: backing ? "boxed-svg-text" : "svg-text",
        label: text.textContent ?? "",
        ratio: ratio(
          rgb(getComputedStyle(text).fill),
          backing ? rgb(getComputedStyle(backing).fill) : background,
        ),
        minimum: 4.5,
      });
    }
    for (const item of root.querySelectorAll<SVGGraphicsElement>(
      ".f036-bar-a, .f036-bar-b, .f036-dot-a, .f036-dot-b, .f037-axis",
    )) {
      const box = item.getBBox();
      if (!box.width && !box.height) continue;
      const style = getComputedStyle(item),
        axis = item.classList.contains("f037-axis");
      const color = rgb(axis ? style.stroke : style.fill);
      const opacity =
        Number(style.opacity) *
        Number(axis ? style.strokeOpacity : style.fillOpacity);
      const rendered = color.map(
        (v, i) => v * opacity + background[i] * (1 - opacity),
      );
      rows.push({
        kind: axis ? "axis" : "model-mark",
        label: item.getAttribute("class") ?? "",
        ratio: ratio(rendered, background),
        minimum: 3,
      });
    }
    return rows;
  });
}

type Unit = {
  id: string;
  title: string;
  selector: string;
  storedKey: string;
  note: string;
  persisted: Record<string, unknown>;
  act(lab: Locator, onMode?: (mode: string) => Promise<void>): Promise<void>;
  assertModel(lab: Locator): Promise<void>;
};
const units = forge036037SmokeCases as Unit[];
const stored = (page: Page): Promise<AppState> =>
  page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const request = indexedDB.open("yksmania", 2);
        request.onerror = () => reject(request.error);
        request.onblocked = () =>
          reject(new Error("Readonly QA database was blocked"));
        request.onsuccess = () => {
          const db = request.result,
            tx = db.transaction("state", "readonly"),
            read = tx.objectStore("state").get("current");
          read.onerror = () => {
            db.close();
            reject(read.error);
          };
          read.onsuccess = () => {
            db.close();
            resolve(read.result);
          };
        };
      }),
  );
const learning = (s: AppState) => ({
  sessions: s.sessions,
  reviews: s.reviews,
  theoryReviewCompletions: s.theoryReviewCompletions,
  topicProgress: s.topicProgress,
  notes: s.notes,
  settings: s.settings,
  draft: s.draft,
  examDraft: s.examDraft,
  examSessions: s.examSessions,
  unlocked: s.unlocked,
  focusTimer: s.focusTimer,
});
async function nav(page: Page, name: string) {
  await expect(page.locator(".topbar")).toBeVisible();
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function enter(page: Page, unit: Unit) {
  await nav(page, "Konu Anlatımı");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(unit.title);
  const entry = page.locator(`.ready-topic[data-lesson-id="${unit.id}"]`);
  if (!(await entry.isVisible()))
    await page
      .locator(".subject-panel")
      .filter({
        has: page.getByRole("heading", { name: "Matematik", exact: true }),
      })
      .locator(".subject-header")
      .click();
  await entry.click();
  await expect(
    page.locator(".guide-section").first().locator(unit.selector),
  ).toBeVisible();
  return page.locator(unit.selector);
}
async function ready(page: Page) {
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.waitForFunction(
    () => navigator.serviceWorker.controller?.state === "activated",
    undefined,
    { timeout: 30_000 },
  );
}
async function diagramGeometry(lab: Locator) {
  const labels = await lab.locator("svg text").evaluateAll((nodes) =>
    nodes.map((node) => {
      const text = node as SVGGraphicsElement,
        box = text.getBBox(),
        view = text.ownerSVGElement!.viewBox.baseVal,
        matrix = text.getScreenCTM();
      return {
        label: text.textContent,
        x: box.x,
        y: box.y,
        right: box.x + box.width,
        bottom: box.y + box.height,
        minX: view.x,
        minY: view.y,
        maxX: view.x + view.width,
        maxY: view.y + view.height,
        renderedFontPx:
          parseFloat(getComputedStyle(text).fontSize) *
          (matrix ? Math.hypot(matrix.a, matrix.b) : 0),
      };
    }),
  );
  for (const label of labels) {
    expect(label.x, label.label ?? "").toBeGreaterThanOrEqual(label.minX);
    expect(label.y, label.label ?? "").toBeGreaterThanOrEqual(label.minY);
    expect(label.right, label.label ?? "").toBeLessThanOrEqual(label.maxX);
    expect(label.bottom, label.label ?? "").toBeLessThanOrEqual(label.maxY);
    expect(label.renderedFontPx).toBeGreaterThan(0);
  }
  return labels;
}

for (const unit of units)
  for (const profile of [
    { name: "1440dark", width: 1440, large: false },
    { name: "320MatrixLexendUI200text150", width: 320, large: true },
  ])
    test.describe(`${unit.id} ${profile.name}`, () => {
      test.use({
        viewport: { width: profile.width, height: 1000 },
        hasTouch: true,
        locale: "tr-TR",
        reducedMotion: "reduce",
      });
      test("seven real model modes, invalid branches, notes and first-use offline state remain unscored", async ({
        page,
        context,
      }, info) => {
        test.setTimeout(180_000);
        const errors: string[] = [],
          captures: unknown[] = [];
        page.on("pageerror", (error) => errors.push(error.message));
        await page.goto("/#/settings");
        await expect(page.locator(".sidebar-version")).toContainText(
          release.version,
        );
        await setThemePreference(page, profile.large ? "matrix" : "dark");
        if (profile.large) {
          await page
            .getByLabel("Yazı tipi", { exact: true })
            .selectOption("lexend");
          await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
          await page
            .getByLabel("Yalnızca yazı boyutu %", { exact: true })
            .fill("150");
          await page.evaluate(async () => {
            await document.fonts.load("400 45px Lexend");
            await document.fonts.load("600 45px Lexend");
          });
        }
        await ready(page);
        const before = learning(await stored(page));
        await context.setOffline(true);
        const lab = await enter(page, unit);
        await expect(page.locator('input[type="file"]')).toHaveCount(0);
        await unit.act(lab, async (mode) => {
          const labels = await diagramGeometry(lab);
          const legend = lab.locator("[data-diagram-values]");
          let legendMetrics: unknown[] = [];
          if (unit.id.endsWith("036")) {
            await expect(legend.first()).toBeVisible();
            const expectedValues: Record<string, [string, string][]> = {
              balance: [
                ["Üst çubuk: sol taraf", "15"],
                ["Alt çubuk: sağ taraf", "17"],
              ],
              distribution: [
                ["Soldaki kutu: x terimi", "(-2)x"],
                ["Sağdaki kutu: sabit", "6"],
              ],
              fractions: [
                ["Soldaki payın çarpanı", "3"],
                ["Ortadaki payın çarpanı", "-4"],
                ["Sağ tarafın çarpanı", "12"],
                ["Elde edilen denklem", "(-1)x+(10)=12"],
              ],
              excluded: [
                ["Birinci renkli nokta", "İzinli kök 3"],
                ["Çarpılı boş nokta", "1: tanım kümesinin dışında"],
              ],
              words: [
                ["İlk renkli kutu: birinci işlem", "(5) ekle"],
                ["İkinci renkli kutu: ikinci işlem", "3 ile çarp"],
              ],
              pattern: [
                ["Soldaki ilk işaret", "1. adım: 5"],
                ["Sağdaki son işaret", "17. adım: 69"],
                ["İşaretler arasındaki geçiş", "16"],
              ],
              tickets: [
                ["Y yazılı yetişkin biletleri", "2 adet; her biri s+45 TL"],
                ["Ö yazılı öğrenci biletleri", "3 adet; her biri s TL"],
              ],
            };
            for (const [label, value] of expectedValues[mode])
              await expect(
                lab
                  .locator("[data-diagram-values] > div")
                  .filter({ has: page.getByText(label, { exact: true }) })
                  .locator("dd"),
              ).toHaveText(value);
            if (mode === "pattern") {
              await lab
                .getByRole("slider", {
                  name: "Çizilen adım numarası",
                  exact: true,
                })
                .press("Home");
              await expect(
                lab
                  .locator("[data-diagram-values] > div")
                  .filter({
                    has: page.getByText("Tek işaret: ilk ve son adım", {
                      exact: true,
                    }),
                  })
                  .locator("dd"),
              ).toHaveText("1. adım: 5");
              await expect(
                lab.locator("[data-diagram-values] > div").filter({
                  has: page.getByText("Sağdaki son işaret", { exact: true }),
                }),
              ).toHaveCount(0);
              await expect(lab.locator("svg .f036-first")).toHaveCount(1);
              await expect(lab.locator("svg .f036-step")).toHaveCount(0);
              await lab
                .getByRole("button", {
                  name: "İlk 5, artış 4, hedef 69",
                  exact: true,
                })
                .click();
              await expect(
                lab
                  .locator("[data-diagram-values] > div")
                  .filter({
                    has: page.getByText("Sağdaki son işaret", { exact: true }),
                  })
                  .locator("dd"),
              ).toHaveText("17. adım: 69");
            }
            legendMetrics = await legend.locator("dt,dd").evaluateAll((nodes) =>
              nodes.map((node) => {
                const rect = node.getBoundingClientRect();
                return {
                  text: node.textContent,
                  font: parseFloat(getComputedStyle(node).fontSize),
                  bodyFont: parseFloat(
                    getComputedStyle(document.body).fontSize,
                  ),
                  left: rect.left,
                  right: rect.right,
                  viewport: innerWidth,
                };
              }),
            );
            for (const metric of legendMetrics as {
              font: number;
              bodyFont: number;
              left: number;
              right: number;
              viewport: number;
            }[]) {
              expect(metric.font).toBeGreaterThanOrEqual(metric.bodyFont);
              expect(metric.left).toBeGreaterThanOrEqual(0);
              expect(metric.right).toBeLessThanOrEqual(metric.viewport);
            }
          }
          expect(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
          ).toBe(true);
          for (const bounds of await lab
            .locator("button,input[type=range],select")
            .evaluateAll((nodes) =>
              nodes.map((node) => ({
                width: node.getBoundingClientRect().width,
                height: node.getBoundingClientRect().height,
                left: node.getBoundingClientRect().left,
                right: node.getBoundingClientRect().right,
                viewport: innerWidth,
              })),
            )) {
            expect(bounds.height).toBeGreaterThanOrEqual(44);
            expect(bounds.width).toBeGreaterThan(0);
            expect(bounds.left).toBeGreaterThanOrEqual(0);
            expect(bounds.right).toBeLessThanOrEqual(bounds.viewport);
          }
          const diagram = lab.locator("[data-mode] svg").first();
          if (await diagram.isVisible()) await diagram.scrollIntoViewIfNeeded();
          await page.screenshot({
            path: info.outputPath(`${mode}-${profile.width}-viewport.png`),
          });
          captures.push({ mode, labels, legendMetrics });
        });
        expect(captures).toHaveLength(7);
        await unit.assertModel(lab);
        await expect
          .poll(async () => (await stored(page)).explorations[unit.storedKey])
          .toMatchObject(unit.persisted);
        expect(learning(await stored(page))).toEqual(before);
        await page
          .getByRole("textbox", { name: "Notun", exact: true })
          .fill(unit.note);
        await expect
          .poll(async () => (await stored(page)).notes[`lesson:${unit.id}`])
          .toBe(unit.note);
        const saved = await stored(page);
        await page.reload();
        await unit.assertModel(await enter(page, unit));
        await expect(
          page.getByRole("textbox", { name: "Notun", exact: true }),
        ).toHaveValue(unit.note);
        expect((await stored(page)).explorations[unit.storedKey]).toEqual(
          saved.explorations[unit.storedKey],
        );
        expect(learning(await stored(page))).toEqual(learning(saved));
        const accessibility = await new AxeBuilder({ page })
          .include(unit.selector)
          .analyze();
        expect(
          accessibility.violations.filter((v) =>
            ["serious", "critical"].includes(v.impact ?? ""),
          ),
        ).toEqual([]);
        expect(errors).toEqual([]);
        await info.attach("actual-source-model-offline-acceptance", {
          body: JSON.stringify({
            version: release.version,
            lessonId: unit.id,
            profile,
            captures,
            persisted: saved.explorations[unit.storedKey],
            unchangedLearning: true,
            offlineReload: true,
            rendererErrors: errors,
          }),
          contentType: "application/json",
        });
      });
    });

for (const unit of units)
  test(`${unit.id}: complete reviewed card flow saves exact score, Today and original review dates offline`, async ({
    page,
    context,
  }, info) => {
    test.setTimeout(180_000);
    const expected = flow.units.find((candidate) => candidate.id === unit.id)!;
    expect(expected).toBeDefined();
    const count = unit.id.endsWith("036") ? 42 : 45,
      topicId = `topic-${unit.id}`;
    expect(expected.cards).toHaveLength(count);
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.clock.setFixedTime(new Date("2026-11-17T12:00:00Z"));
    await page.goto("/#/settings");
    await setThemePreference(page, "dark");
    await ready(page);
    await context.setOffline(true);
    await enter(page, unit);
    await page
      .getByRole("textbox", { name: "Notun", exact: true })
      .fill(unit.note);
    await expect
      .poll(async () => (await stored(page)).notes[`lesson:${unit.id}`])
      .toBe(unit.note);
    const before = await stored(page);
    await page
      .getByRole("button", { name: "Sorulara geç", exact: true })
      .click();
    for (const [index, card] of expected.cards.entries()) {
      await expect(page.locator(".question-meta")).toContainText(
        `${index + 1} / ${count}`,
      );
      await expect(page.locator(".question-panel h2")).toHaveText(typeset(card.prompt));
      const answers = page.locator(".answer-options .answer");
      await expect(answers).toHaveCount(5);
      expect(
        (await answers.locator("span:last-child").allTextContents())
          .map((text) => text.trim())
          .sort(),
      ).toEqual([...card.options].map(typeset).sort());
      await answers
        .filter({ has: page.getByText(typeset(card.correct), { exact: true }) })
        .click();
      await page
        .getByRole("button", { name: "Cevabı kontrol et", exact: true })
        .click();
      await expect(page.locator(".feedback.correct")).toBeVisible();
      if (index === 0 || index === count - 2) {
        await expect
          .poll(async () => (await stored(page)).draft?.responses.length)
          .toBe(index + 1);
        const partial = await stored(page);
        await page.reload();
        await expect(page.locator(".feedback.correct")).toBeVisible();
        expect((await stored(page)).draft).toEqual(partial.draft);
        expect((await stored(page)).sessions).toEqual(before.sessions);
        expect((await stored(page)).reviews).toEqual(before.reviews);
      }
      if (index < count - 1)
        await page
          .getByRole("button", { name: "Sonraki soru", exact: true })
          .click();
    }
    const checked = await stored(page);
    expect(checked.draft?.responses).toHaveLength(count);
    expect(
      checked.draft?.responses.every(
        (response) => response.correct && !response.assisted,
      ),
    ).toBe(true);
    expect(checked.sessions).toEqual(before.sessions);
    await page
      .getByRole("button", { name: "Çalışmayı kaydet", exact: true })
      .click();
    await expect(page.locator(".result-stats > div strong")).toHaveText([
      `${count}/${count}`,
      `${count}/${count}`,
      "0",
    ]);
    const saved = await stored(page),
      session = saved.sessions.at(-1)!;
    expect(session.lessonId).toBe(unit.id);
    expect(session.responses).toHaveLength(count);
    expect(
      session.responses.every(
        (response) => response.correct && !response.assisted,
      ),
    ).toBe(true);
    expect(saved.sessions).toHaveLength(before.sessions.length + 1);
    expect(saved.settings).toEqual(before.settings);
    expect(saved.notes).toEqual(before.notes);
    expect(saved.topicProgress[topicId]?.theory).toBeUndefined();
    const reviews = saved.reviews.filter(
      (review) => review.originSessionId === session.id,
    );
    expect(reviews.map((review) => [review.stage, review.targetDate])).toEqual([
      [3, "2026-11-19"],
      [7, "2026-11-23"],
      [21, "2026-12-07"],
    ]);
    const official = page.locator(".past-exam-reference");
    await expect(official).toHaveCount(1);
    await expect(official).toContainText(
      "Kaynakla ilişkili özgün öğretim örneği",
    );
    for (const label of [
      "Çözümü adım adım aç",
      "Sonraki çözüm adımı",
      "Sonraki çözüm adımı",
    ]) {
      await official.getByRole("button", { name: label, exact: true }).click();
      expect(await stored(page)).toEqual(saved);
    }
    await expect(official.locator(".worked-conclusion")).toContainText(
      unit.id.endsWith("036") ? "96 parça." : "10.000<b<20.000 TL",
    );
    await official.locator("summary").click();
    await expect(official.locator("details")).toContainText("Resmî cevap: A.");
    await expect(official.locator("details")).toContainText(
      `Soru sayfası ${unit.id.endsWith("036") ? 24 : 26}, cevap kaynağı sayfa 43.`,
    );
    await expect(
      official.getByRole("link", {
        name: "Resmî kaynak kaydı (internet)",
        exact: true,
      }),
    ).toHaveAttribute(
      "href",
      new RegExp(`#page=${unit.id.endsWith("036") ? 24 : 26}$`),
    );
    expect(await stored(page)).toEqual(saved);
    await page.reload();
    await expect(page.locator(".result-stats > div strong")).toHaveText([
      `${count}/${count}`,
      `${count}/${count}`,
      "0",
    ]);
    expect((await stored(page)).sessions).toEqual(saved.sessions);
    expect((await stored(page)).reviews).toEqual(saved.reviews);
    await nav(page, "Bugün");
    const theory = page
      .getByRole("region", { name: "Konu planı", exact: true })
      .locator(".planned-topic")
      .filter({ hasText: unit.title });
    const questions = page
      .getByRole("region", { name: "Soru planı", exact: true })
      .locator(".planned-topic")
      .filter({ hasText: unit.title });
    await expect(questions.locator(".topic-score")).toHaveText(
      `Son sonuç: ${count} soruda ${count} doğru · 0 yanlış`,
    );
    await expect(theory.locator(".topic-state")).toHaveText(
      "Konu henüz işaretlenmedi",
    );
    await theory
      .getByRole("button", { name: "Konuyu çalıştım", exact: true })
      .click();
    await expect(theory.locator(".topic-state")).toHaveText("Konu tamamlandı");
    const manual = await stored(page);
    expect(manual.sessions).toEqual(saved.sessions);
    expect(manual.reviews).toEqual(saved.reviews);
    expect(manual.topicProgress[topicId]?.theory).toBe("2026-11-17");
    await page.reload();
    await expect(questions.locator(".topic-score")).toHaveText(
      `Son sonuç: ${count} soruda ${count} doğru · 0 yanlış`,
    );
    expect((await stored(page)).sessions).toEqual(saved.sessions);
    await page.screenshot({
      path: info.outputPath(`actual${count}of${count}-today.png`),
    });
    expect(errors).toEqual([]);
    await info.attach("actual-complete-practice-flow", {
      body: JSON.stringify({
        version: release.version,
        lessonId: unit.id,
        count,
        correct: count,
        assisted: 0,
        session,
        reviews,
        manualTheorySeparate: true,
        offlineReload: true,
        rendererErrors: errors,
      }),
      contentType: "application/json",
    });
  });

for (const theme of ["light", "system"] as const) {
  test(`legacy ${theme} preference keeps both source models readable offline`, async ({
    page,
    context,
  }, testInfo) => {
    test.setTimeout(120_000);
    await page.emulateMedia({ colorScheme: "light" });
    await page.goto("/");
    await nav(page, "Ayarlar");
    await setThemePreference(page, theme);
    await ready(page);
    const before = learning(await stored(page));
    await context.setOffline(true);
    const observations: {
      unit: string;
      mode: string;
      rows: Awaited<ReturnType<typeof renderedContrast>>;
    }[] = [];
    for (const unit of units) {
      const lab = await enter(page, unit);
      await unit.act(lab, async (mode) => {
        observations.push({
          unit: unit.id,
          mode,
          rows: await renderedContrast(lab),
        });
          if (mode === "distribution" || mode === "compound") {
            const path = testInfo.outputPath(`${theme}-${unit.id}-${mode}.png`);
            await lab.screenshot({ path, animations: "disabled" });
            await testInfo.attach("rendered-legacy-theme-model", {
              path,
              contentType: "image/png",
            });
          }
      });
      // Model changes are written to IndexedDB asynchronously; wait until the
      // stored explorations stop changing so the reload sees the last click.
      let lastSnapshot = "";
      await expect
        .poll(
          async () => {
            const now = JSON.stringify((await stored(page)).explorations ?? {});
            const settled = now === lastSnapshot;
            lastSnapshot = now;
            return settled;
          },
          { intervals: [300], timeout: 10_000 },
        )
        .toBe(true);
      await page.reload();
      await expect(page.locator(unit.selector)).toBeVisible();
      await unit.assertModel(page.locator(unit.selector));
    }
    expect(learning(await stored(page))).toEqual(before);
    expect(observations).toHaveLength(14);
    const failures = observations.flatMap(({ unit, mode, rows }) =>
      rows
        .filter((row) => row.ratio + 1e-8 < row.minimum)
        .map((row) => ({ unit, mode, ...row })),
    );
    expect(observations.flatMap((row) => row.rows).length).toBeGreaterThan(20);
    await testInfo.attach("rendered-legacy-theme-contrast", {
      body: JSON.stringify({ theme, observations, failures }),
      contentType: "application/json",
    });
    expect(
      failures,
      "Rendered SVG labels, interval values and model marks must stay readable",
    ).toEqual([]);
  });
}
