import { expect, test } from "@playwright/test";
import {
  equalExtendedShadowExample, equalExtendedShadowTitle, equalShadowFarTitle, equalShadowNearTitle,
} from "../../src/learning/mebiEqualExtendedShadow";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("equal-size source and blocker keep the same full shadow across two screens", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "golge-yari-golge", search: "Gölge ve yarı gölge" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const jump = nav.getByRole("button", { name: equalExtendedShadowTitle, exact: true });
  if (!(await jump.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
  await jump.press("Enter");
  const scope = 'figure[data-section-figure="' + equalExtendedShadowTitle + '"]';
  const figure = page.locator(scope);
  await expect(figure).toContainText("8 cm perdede tam gölge çapı 3 cm. Yarı gölge alanı 19,11 cm².");
  await figure.getByRole("slider", { name: "Kaynak ile perde arası", exact: true }).press("End");
  await expect(figure).toContainText("12 cm perdede tam gölge çapı 3 cm. Yarı gölge alanı 77,75 cm².");
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  const drawing = figure.getByRole("img");
  await drawing.evaluate(node => node.scrollIntoView({ block: "center" }));
  await drawing.screenshot({ path: info.outputPath("equal-source175.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("the separate study sheet distinguishes the two penumbra areas", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-132");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: equalExtendedShadowExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  await expect(solution.locator('figure[data-section-figure="' + equalShadowNearTitle + '"]')).toContainText("19,11 cm²");
  await expect(solution.locator('figure[data-section-figure="' + equalShadowFarTitle + '"]')).toContainText("77,75 cm²");
});
