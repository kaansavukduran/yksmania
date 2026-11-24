import { expect, test } from "@playwright/test";
import { commonNormalTitle, roughSurfaceExample, roughSurfaceTitle, tiltedNormalsTitle } from "../../src/learning/mebiRoughSurfaceReflection";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("local surface normals change the reflected rays while every angle equality remains", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "duzlem-ayna", search: "Düzlem ayna" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const jump = nav.getByRole("button", { name: roughSurfaceTitle, exact: true });
  if (!(await jump.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
  await jump.press("Enter");
  const scope = `figure[data-section-figure="${roughSurfaceTitle}"]`;
  const figure = page.locator(scope);
  const slider = figure.getByRole("slider", { name: "Yüzey parçalarının eğimi", exact: true });
  await slider.press("Home");
  await expect(figure).toContainText("Üç yerel eğimde i = r: 35° · 35° · 35°.");
  await slider.press("End");
  await expect(figure).toContainText("Üç yerel eğimde i = r: 15° · 45° · 28,3°.");
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  const drawing = figure.getByRole("img");
  await drawing.evaluate(node => node.scrollIntoView({ block: "center" }));
  await drawing.screenshot({ path: info.outputPath("rough-surface-reflection182.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("the separate study sheet shows parallel and spreading rays in two different steps", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-133");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: roughSurfaceExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(`figure[data-section-figure="${commonNormalTitle}"]`)).toContainText("35° · 35° · 35°");
  await expect(solution.locator(`figure[data-section-figure="${tiltedNormalsTitle}"]`)).toContainText("15° · 45° · 28,3°");
});
