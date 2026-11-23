import { expect, test, type Locator, type Page } from "@playwright/test";
import type { AppState } from "../../src/domain/model";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
import { setThemePreference } from "./helpers/theme";

registerOfflineBootDiagnostics();
test.use({
  locale: "tr-TR",
  timezoneId: "Europe/Istanbul",
  reducedMotion: "reduce",
});
const id = "tyt-geo-dik-ucgen-031";
const title = "Dik üçgen: Pisagor, özel açılar ve Öklid bağıntıları";
const summaryListTitle = "Dik üçgen: Pisagor ve Öklid";
async function stored(page: Page): Promise<AppState> {
  return page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const request = indexedDB.open("yksmania", 2);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const tx = db.transaction("state");
          const read = tx.objectStore("state").get("current");
          read.onsuccess = () => resolve(read.result);
          tx.oncomplete = () => db.close();
          tx.onabort = () => reject(tx.error);
        };
      }),
  );
}
function unchangedRecords(state: AppState) {
  const { explorations: _explorations, ...rest } = state;
  return rest;
}
async function open(page: Page, mode: "theory" | "summary") {
  const listTitle = mode === "theory" ? title : summaryListTitle;
  await page.goto(mode === "theory" ? "/#/courses" : "/#/cheatsheets");
  await page.locator(".toolbar .search input").fill("Dik üçgen");
  await page
    .locator(
      mode === "theory" ? `[data-lesson-id="${id}"]` : ".cheatsheet-topic",
    )
    .filter({ hasText: listTitle })
    .click();
  const lab = page.locator(".g031-lab");
  await expect(lab).toBeVisible();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(title);
  await expect(page).toHaveURL(
    mode === "theory"
      ? `/#/lesson?id=${id}`
      : `/#/cheatsheets?topic=topic-${id}`,
  );
  return lab;
}
async function fit(lab: Locator) {
  const result = await lab.locator("svg").evaluate((node) => {
    const svg = node as SVGSVGElement;
    const view = svg.viewBox.baseVal;
    const triangle = svg
      .querySelector<SVGPolygonElement>(".g031-triangle")!
      .getBBox();
    const shapes = [
      ...svg.querySelectorAll<SVGGraphicsElement>(
        "polygon,line,path,polyline,circle,text",
      ),
    ].map((node) => {
      const b = node.getBBox();
      return {
        kind: node.tagName,
        text: node.textContent,
        x: b.x,
        y: b.y,
        right: b.x + b.width,
        bottom: b.y + b.height,
      };
    });
    return {
      view: [view.x, view.y, view.width, view.height],
      triangle: { width: triangle.width, height: triangle.height },
      shapes,
      overflow: document.documentElement.scrollWidth - innerWidth,
      font:
        (parseFloat(getComputedStyle(svg.querySelector("text")!).fontSize) *
          svg.getBoundingClientRect().width) /
        view.width,
      animation: [...svg.querySelectorAll(".g031-reveal")].map(
        (node) => getComputedStyle(node).animationName,
      ),
    };
  });
  expect(result.view).toEqual([0, 0, 640, 530]);
  expect(result.overflow).toBeLessThanOrEqual(1);
  expect(result.font).toBeGreaterThanOrEqual(14.5);
  for (const shape of result.shapes) {
    expect(shape.x, JSON.stringify(shape)).toBeGreaterThanOrEqual(0);
    expect(shape.y, JSON.stringify(shape)).toBeGreaterThanOrEqual(0);
    expect(shape.right, JSON.stringify(shape)).toBeLessThanOrEqual(640);
    expect(shape.bottom, JSON.stringify(shape)).toBeLessThanOrEqual(530);
  }
  const labels = result.shapes.filter((shape) => shape.kind === "text");
  for (let i = 0; i < labels.length; i++)
    for (let j = i + 1; j < labels.length; j++) {
      const a = labels[i],
        b = labels[j];
      const overlapWidth = Math.min(a.right, b.right) - Math.max(a.x, b.x);
      const overlapHeight = Math.min(a.bottom, b.bottom) - Math.max(a.y, b.y);
      expect(
        overlapWidth <= 0 || overlapHeight <= 0,
        `${a.text} and ${b.text} overlap`,
      ).toBe(true);
    }
  for (const animation of result.animation) expect(animation).toBe("none");
  return result;
}
async function start(lab: Locator) {
  const previous = lab.getByRole("button", {
    name: "Önceki adım",
    exact: true,
  });
  while (await previous.isEnabled()) await previous.click();
}
for (const profile of [
  { name: "desktop", width: 1280, large: false },
  { name: "320px Matrix 45px", width: 320, large: true },
]) {
  test(`024 right triangle uses its available figure area in theory and separate summary: ${profile.name}`, async ({
    page,
    context,
  }, info) => {
    test.setTimeout(120_000);
    await page.setViewportSize({ width: profile.width, height: 1000 });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/#/settings");
    await setThemePreference(page, "matrix");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "matrix");
    if (profile.large) {
      await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
      await page
        .getByLabel("Yalnızca yazı boyutu %", { exact: true })
        .fill("150");
    }
    await open(page, "theory");
    await page
      .locator(".study-notes textarea")
      .fill("Dik üçgen çalışma notum.");
    await open(page, "summary");
    await page.locator(".cheat-note textarea").fill("Öklid kısa tekrar notum.");
    await expect
      .poll(async () => (await stored(page))?.notes[`cheatsheet:topic-${id}`])
      .toBe("Öklid kısa tekrar notum.");
    const before = unchangedRecords(await stored(page));
    for (const mode of ["theory", "summary"] as const) {
      const lab = await open(page, mode);
      await start(lab);
      const ab = lab.getByRole("slider", {
        name: "AB dik kenarı",
        exact: true,
      });
      const ac = lab.getByRole("slider", {
        name: "AC dik kenarı",
        exact: true,
      });
      for (const [abValue, acValue] of [
        [6, 8],
        [12, 2],
        [2, 12],
      ]) {
        await ab.press("Home");
        for (let n = 2; n < abValue; n++) await ab.press("ArrowRight");
        await ac.press("Home");
        for (let n = 2; n < acValue; n++) await ac.press("ArrowRight");
        await start(lab);
        for (let step = 0; step < 4; step++) {
          const measured = await fit(lab);
          await expect(lab.locator("svg polygon")).toHaveCount(
            step === 1 ? 3 : step === 2 ? 4 : 1,
          );
          if (abValue === 6 && acValue === 8 && (step === 0 || step === 3)) {
            expect(measured.triangle.width).toBeCloseTo(255, 8);
            expect(measured.triangle.height).toBeCloseTo(340, 8);
          }
          if (abValue === 6 && acValue === 8) {
            await lab
              .locator("svg")
              .screenshot({ path: info.outputPath(`${mode}-${step}.png`) });
            if (step < 3)
              await expect(lab.locator("dl")).toContainText(
                "36 + 64 = 100 birim²",
              );
            else await expect(lab.locator("dl")).toContainText("23,04 birim²");
          }
          if (step < 3)
            await lab
              .getByRole("button", { name: "Sonraki adım", exact: true })
              .click();
        }
      }
      // Real mouse interaction on the supported range; the drawing and readout
      // must follow the same model, without a synthetic handler invocation.
      await ac.press("Home");
      await ab.scrollIntoViewIfNeeded();
      const box = (await ab.boundingBox())!;
      await page.mouse.click(box.x + box.width - 1, box.y + box.height / 2);
      await expect(ab).toHaveValue("12");
      await expect(lab.locator("svg")).toHaveAccessibleName(
        /AB 12, AC 2, BC 12,2 birim/,
      );
      await fit(lab);
      if (profile.large)
        await expect(lab.locator("dd").first()).toHaveCSS("font-size", "45px");
    }
    await expect
      .poll(async () => unchangedRecords(await stored(page)))
      .toEqual(before);
    const saved = await stored(page);
    await page.evaluate(async () => {
      await navigator.serviceWorker.ready;
    });
    await context.setOffline(true);
    await page.reload();
    const lab = page.locator(".g031-lab");
    await expect(lab.locator("svg")).toHaveAccessibleName(/AB 12, AC 2/);
    await expect(page.locator(".cheat-note textarea")).toHaveValue(
      "Öklid kısa tekrar notum.",
    );
    await fit(lab);
    expect(await stored(page)).toEqual(saved);
    await open(page, "theory");
    await expect(page.locator(".study-notes textarea")).toHaveValue(
      "Dik üçgen çalışma notum.",
    );
    await expect(page.locator(".g031-lab svg")).toHaveAccessibleName(
      /AB 12, AC 2/,
    );
    expect(await stored(page)).toEqual(saved);
    expect(errors).toEqual([]);
  });
}
