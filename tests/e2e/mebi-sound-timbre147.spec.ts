import { expect, test } from "@playwright/test";
import { timbreExample, timbreHarmonicTitle, timbreTitle, timbreWaveTitle } from "../../src/learning/mebiSoundTimbre";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("aynı periyotla farklı tını üreten bileşenler çevrimdışı açılır", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "ses-deprem-dalgalari", search: "Ses ve deprem" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const item = toc.getByRole("button", { name: timbreTitle, exact: true });
  if (!(await item.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await item.press("Enter");
  const scope = `figure[data-section-figure="${timbreTitle}"]`;
  const figure = page.locator(scope);
  const svg = figure.getByRole("img");
  await expect(svg).toHaveAccessibleName(/eş periyotlu iki temsilî eğri/i);
  await expect(figure).toContainText("İki temel frekans da 300 Hz. Periyot yaklaşık 3,33 ms.");
  await svg.evaluate(node => node.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("timbre-wave147.png") });
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("600 Hz bileşeni keman örneğinde 0,55, piyanoda 0,19.");
  await expect(figure).toContainText("900 Hz bileşeni keman örneğinde 0,22, piyanoda 0,37.");
  await expect(svg.getByText("Göreli genlik", { exact: true })).toBeVisible();
  await svg.evaluate(node => node.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("timbre-harmonics147.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı bağlı tabloyu, periyodu ve harmonikleri ayrı adımlarda gösterir", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-130");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: timbreTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "600 0,55 0,19", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: timbreExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(`figure[data-section-figure="${timbreWaveTitle}"]`)).toContainText("Periyot yaklaşık 3,33 ms.");
  await expect(solution.locator(`figure[data-section-figure="${timbreHarmonicTitle}"]`)).toContainText("600 Hz bileşeni");
});
