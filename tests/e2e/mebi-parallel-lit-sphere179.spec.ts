import { expect, test } from "@playwright/test";
import { parallelLitSphereExample, parallelLitSphereTitle, raisedLitSphereTitle, sideLitSphereTitle } from "../../src/learning/mebiParallelLitSphere";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("parallel rays keep the same illuminated hemisphere at all offline viewpoints", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "golge-yari-golge", search: "Gölge ve yarı gölge" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const jump = nav.getByRole("button", { name: parallelLitSphereTitle, exact: true });
  if (!(await jump.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
  await jump.press("Enter");
  const scope = `figure[data-section-figure="${parallelLitSphereTitle}"]`;
  const figure = page.locator(scope);
  await expect(figure).toContainText("Görünen diskin aydınlık oranı %50.");
  const drawing = figure.getByRole("img");
  await drawing.evaluate(node => node.scrollIntoView({ block: "center" }));
  await drawing.screenshot({ path: info.outputPath("parallel-lit-sphere179-side.png") });
  const slider = figure.getByRole("slider", { name: "Gözlemcinin yataya göre açısı", exact: true });
  await slider.press("ArrowRight");
  await slider.press("ArrowRight");
  await expect(figure).toContainText("Görünen diskin aydınlık oranı %75.");
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  await drawing.evaluate(node => node.scrollIntoView({ block: "center" }));
  await drawing.screenshot({ path: info.outputPath("parallel-lit-sphere179-raised.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("the study sheet separately shows the half disk and the three-quarter disk", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-132");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: parallelLitSphereExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(`figure[data-section-figure="${sideLitSphereTitle}"]`)).toContainText("%50.");
  await expect(solution.locator(`figure[data-section-figure="${raisedLitSphereTitle}"]`)).toContainText("%75.");
});
