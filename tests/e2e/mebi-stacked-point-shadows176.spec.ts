import { expect, test } from "@playwright/test";
import {
  overlappingShadowTitle, separatedShadowTitle, stackedShadowExample, stackedShadowTitle,
} from "../../src/learning/mebiStackedPointShadows";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("two stacked sources lose their common shadow but keep two single-source dark intervals", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "golge-yari-golge", search: "Gölge ve yarı gölge" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const jump = nav.getByRole("button", { name: stackedShadowTitle, exact: true });
  if (!(await jump.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
  await jump.press("Enter");
  const scope = 'figure[data-section-figure="' + stackedShadowTitle + '"]';
  const figure = page.locator(scope);
  await expect(figure).toContainText("Tam gölge kesiti 2,26 cm.");
  await expect(figure.getByText("Önden", { exact: true })).toBeVisible();
  const drawing = figure.getByRole("img");
  await drawing.evaluate(node => node.scrollIntoView({ block: "center" }));
  await drawing.screenshot({ path: info.outputPath("stacked-overlap176.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  await figure.getByRole("slider", { name: "Her kaynağın eksenden uzaklığı", exact: true }).press("End");
  await expect(figure).toContainText("Ortak tam gölge yok.");
  await expect(figure).toContainText("Yarı gölge aralıklarının toplam uzunluğu 8,17 cm.");
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  await drawing.evaluate(node => node.scrollIntoView({ block: "center" }));
  await drawing.screenshot({ path: info.outputPath("stacked-sources176.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("the worked example remains two different visuals in the offline study sheet", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-132");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: stackedShadowExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  await expect(solution.locator('figure[data-section-figure="' + overlappingShadowTitle + '"]')).toContainText("Tam gölge kesiti 2,26 cm.");
  await expect(solution.locator('figure[data-section-figure="' + separatedShadowTitle + '"]')).toContainText("Ortak tam gölge yok.");
});
