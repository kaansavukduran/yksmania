import { expect, test } from "@playwright/test";
import { parabolaTranslationTitle } from "../../src/learning/parabolaTranslation075";
import { learning, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const scope = `figure[data-section-figure="${parabolaTranslationTitle}"]`;
test.use({ viewport: { width: 320, height: 880 }, reducedMotion: "reduce" });

test("iki parabolde tepe ve işaretli nokta klavyeyle aynı vektörle değişir", async ({ page, context }, info) => {
  test.setTimeout(85_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/lesson?id=donusum-oteleme-donme");
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: parabolaTranslationTitle, exact: true }).press("Enter");
  const figure = page.locator(scope);
  const shift = figure.getByRole("slider", { name: /Yatay öteleme/ });
  await expect(shift).toHaveValue("3");
  await expect(figure).toContainText("T′ (2; 1). C (0; 3) → C′ (3; 2).");
  await shift.press("ArrowLeft");
  await expect(shift).toHaveValue("2");
  await expect(figure).toContainText("T′ (1; 1). C (0; 3) → C′ (2; 2).");
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("T′ (1; 2). C (0; 3) → C′ (2; 3).");
  await shift.press("ArrowLeft");
  await shift.press("ArrowLeft");
  await expect(shift).toHaveValue("0");
  await expect(figure).toContainText("İki grafik üst üste gelir.");
  await expect(figure.getByRole("img").locator("text").filter({ hasText: "T = T′" })).toBeVisible();
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  await figure.getByRole("img").screenshot({ path: info.outputPath("parabol075-model.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("ayrı Kopya Kağıdı iki noktanın tablosunu ve işaretli çözüm grafiğini çevrimdışı açar", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 880 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-405");
  const chart = page.getByRole("region", { name: `${parabolaTranslationTitle} tablosu` });
  await expect(chart.getByRole("columnheader")).toHaveText(["Nokta", "Başlangıç", "Görüntü", "Değişim"]);
  await expect(chart.locator(".guide-table-cell-value")).toHaveText(["Tepe T", "(−1; 2)", "(2; 1)", "(+3; −1)", "İşaretli C", "(0; 3)", "(3; 2)", "(+3; −1)"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: "Sağa üç, aşağı bir kaydırılan parabol" });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(scope).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("g(2) = 1 ve g(3) = 2.");
  expect(learning(await storage(page))).toEqual(before);
});
