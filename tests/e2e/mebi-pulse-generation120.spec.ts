import { expect, test } from "@playwright/test";
import { pulseGenerationExample, pulseGenerationTitle } from "../../src/learning/mebiPulseGeneration";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const selector = `figure[data-section-figure="${pulseGenerationTitle}"]`;

test("kaynak önce yukarı veya aşağı hareket eder ve sonra dengeye döner", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 860 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "yay-dalgalari", search: "Yay dalgaları" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: pulseGenerationTitle, exact: true }).press("Enter");
  const figure = page.locator(selector);
  const drawing = figure.getByRole("img");
  await expect(drawing).toHaveAccessibleName(/Sol uçta hareket edebilen kaynak noktası/);
  await expect(figure).toContainText("Kaynak ucu 1,25 m");
  const crest = await drawing.innerHTML();
  await drawing.getByText("Çukur", { exact: true }).click();
  await expect(figure).toContainText(/Kaynak ucu [-−]1,25 m/);
  expect(await drawing.innerHTML()).not.toBe(crest);
  await figure.getByRole("slider", { name: "Geçen süre" }).press("End");
  await expect(figure).toContainText("Kaynak ucu 0 m. Arka sınır 1 m, ön sınır 4 m. Genişlik 3 m.");
  expect((await page.evaluate(svgLayoutAudit, { scope: selector, figuresOnly: true, explore: true })).issues).toEqual([]);
  await drawing.screenshot({ path: info.outputPath("mebi-pulse-generation120.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı kaynak durduktan sonraki genişliği aynı şekille gösterir", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-128");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: pulseGenerationTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "2 s 4 m 1 m 3 m", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: pulseGenerationExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(selector).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Arka sınır 1 m’de, ön sınır 4 m’de. Genişlik 3 m.");
});
