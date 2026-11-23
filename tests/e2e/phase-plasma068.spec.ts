import { expect, test } from "@playwright/test";
import { phasePlasmaTitle } from "../../src/learning/phasePlasma068";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("iyonlaşmayı ve yeniden birleşmeyi çevrimdışı aynı yüklerle gösterir", async ({ page, context }) => {
  test.setTimeout(80_000);
  await prepare(page, true);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "hal-degisimi", search: "Hâl değişimi" });
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: phasePlasmaTitle, exact: true }).press("Enter");
  const scope = `figure[data-section-figure="${phasePlasmaTitle}"]`;
  const figure = page.locator(scope);
  await expect(figure).toContainText("Enerji alır.");
  await expect(figure.getByRole("img").locator("text")).toContainText(["0", "+e", "−e"]);
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("Enerji verir.");
  await expect(figure).toContainText("Pozitif iyon elektronu bağlayabilir.");
  await figure.getByRole("button", { name: "Geri", exact: true }).press("Enter");
  await expect(figure).toContainText("Enerji alır.");
  const layout = await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true });
  expect(layout.issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(initial);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("ayrı Kopya Kağıdı iki yönü tabloyla ve yükü çözümlü görselle gösterir", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 850 });
  await prepare(page);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-121");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: phasePlasmaTitle, exact: true }) });
  await expect(section.getByRole("rowheader")).toHaveText(["İyonlaşma", "Yeniden birleşme"]);
  await expect(section.getByRole("cell")).toHaveText([
    "Nötr gaz", "İyon ve serbest elektron", "Enerji alır",
    "İyon ve serbest elektron", "Nötr gaz", "Enerji verir",
  ]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: "İyon ile elektronun toplam yükü" });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Net yük 0. Geçiş iyonlaşma.");
  expect(learning(await storage(page))).toEqual(initial);
});
