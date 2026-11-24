import { expect, test } from "@playwright/test";
import {
  farScreenTitle, nearScreenTitle, sphereShadowExample, sphereShadowTitle,
} from "../../src/learning/mebiPointSphereShadow";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("moving the screen changes the measured shadow without changing progress", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "golge-yari-golge", search: "Gölge ve yarı gölge" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const jump = nav.getByRole("button", { name: sphereShadowTitle, exact: true });
  if (!(await jump.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
  await jump.press("Enter");
  const scope = 'figure[data-section-figure="' + sphereShadowTitle + '"]';
  const model = page.locator(scope);
  await expect(model).toContainText("Tam gölge çapı 15 cm.");
  await model.getByRole("slider", { name: "Kaynak ile perde arası", exact: true }).press("End");
  await expect(model).toContainText("Tam gölge çapı 21 cm.");
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  const drawing = model.getByRole("img");
  await drawing.evaluate(node => node.scrollIntoView({ block: "center" }));
  await drawing.screenshot({ path: info.outputPath("sphere-shadow173.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("the two shadow diameters are separate steps of an offline study sheet", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-132");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: sphereShadowExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  await expect(solution.locator('figure[data-section-figure="' + nearScreenTitle + '"]')).toContainText("Tam gölge çapı 15 cm.");
  await expect(solution.locator('figure[data-section-figure="' + farScreenTitle + '"]')).toContainText("Tam gölge çapı 21 cm.");
});
