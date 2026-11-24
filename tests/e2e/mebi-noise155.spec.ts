import { expect, test } from "@playwright/test";
import { noiseExample, noiseLevelTitle, noiseSourcesTitle, noiseTitle } from "../../src/learning/mebiNoise";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("bağımsız kaynak sayısı çevrimdışı şiddet bloklarını ve desibel sonucunu değiştirir", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "ses-deprem-dalgalari", search: "Ses ve deprem" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const item = toc.getByRole("button", { name: noiseTitle, exact: true });
  if (!(await item.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await item.press("Enter");
  const scope = `figure[data-section-figure="${noiseTitle}"]`;
  const figure = page.locator(scope);
  const svg = figure.getByRole("img");
  const count = figure.getByRole("slider", { name: "Aynı düzeydeki kaynak sayısı", exact: true });
  await expect(svg.getByText("Kaynak 2", { exact: true })).toBeVisible();
  await count.press("End");
  await expect(svg.getByText("Kaynak 4", { exact: true })).toBeVisible();
  await expect(figure).toContainText("Toplam 4 birim.");
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("4 kaynak toplam 61,02 dB.");
  await count.press("Home");
  await expect(figure).toContainText("1 kaynak toplam 55 dB.");
  await count.press("ArrowRight");
  await expect(figure).toContainText("2 kaynak toplam 58,01 dB.");
  await svg.evaluate(node => node.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("noise-total155.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı şiddeti ve desibeli iki ayrı adımda açar", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-130");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: noiseTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "2 2 kat 58,01", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: noiseExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(`figure[data-section-figure="${noiseSourcesTitle}"]`)).toContainText("Toplam 2 birim.");
  await expect(solution.locator(`figure[data-section-figure="${noiseLevelTitle}"]`)).toContainText("Düzey farkı 3,01 dB.");
});
