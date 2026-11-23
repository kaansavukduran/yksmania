import { expect, test } from "@playwright/test";
import { hydropowerTitle } from "../../src/learning/hydropower062";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("hidroelektrik çizimi aynı debide değişen yüksekliği ve çıkışı çevrimdışı gösterir", async ({ page, context }) => {
  test.setTimeout(80_000);
  await prepare(page, true);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "enerji-ve-hareket", search: "Enerji ve hareket" });
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: hydropowerTitle, exact: true }).press("Enter");

  const scope = `figure[data-section-figure="${hydropowerTitle}"]`;
  const figure = page.locator(scope);
  const slider = figure.getByRole("slider", { name: /Yükseklik farkı/ });
  await expect(figure).toContainText("Su gücü 200 kW.");
  await slider.press("End");
  await expect(figure).toContainText("Su gücü 400 kW.");
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure.getByText(/\d\/3 · Akış ve türbin/)).toBeVisible();
  await expect(figure).toContainText("Aşağı inen su türbini döndürür.");
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure.getByText(/\d\/3 · Jeneratör ve elektrik/)).toBeVisible();
  await expect(figure).toContainText("Elektrik çıkışı 300 kW.");
  await expect(figure).toContainText("100 kW aktarılıyor.");
  const layout = await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true });
  expect(layout.issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(initial);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("ayrı Kopya Kağıdı aynı debide iki yüksekliğin gerçek güç hesabını gösterir", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 850 });
  await prepare(page);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-118");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: hydropowerTitle, exact: true }) });
  await expect(section.getByRole("rowheader")).toHaveText(["10 m", "15 m"]);
  await expect(section.getByRole("cell")).toHaveText(["200 kW", "150 kW", "50 kW", "300 kW", "225 kW", "75 kW"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: "Aynı debi, 15 metre yükseklik farkı" });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Elektrik çıkışı 225 kW.");
  expect(learning(await storage(page))).toEqual(initial);
});
