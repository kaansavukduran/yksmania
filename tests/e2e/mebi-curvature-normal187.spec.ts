import { expect, test } from "@playwright/test";
import {
  concaveNormalExample, concaveNormalTitle, concaveReturnTitle, curvatureFocusTitle,
} from "../../src/learning/mebiConcaveRay";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("radius and local-normal controls keep focal intervals and two angles aligned offline", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "kuresel-aynalar", search: "Küresel aynalar" });
  const contents = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const radiusEntry = contents.getByRole("button", { name: curvatureFocusTitle, exact: true });
  if (!(await radiusEntry.isVisible())) await contents.getByText("İçindekiler", { exact: true }).press("Enter");
  await radiusEntry.press("Enter");
  const radiusScope = `figure[data-section-figure="${curvatureFocusTitle}"]`;
  const radius = page.locator(radiusScope);
  await expect(radius).toContainText("Odak uzaklığı f = 1,8 birim.");
  await radius.getByRole("slider", { name: "Eğrilik yarıçapı", exact: true }).press("End");
  await expect(radius).toContainText("R = 6 birim. Odak uzaklığı f = 3 birim.");
  await radius.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(radius).toContainText("F ve M aynanın arkasında.");
  expect((await page.evaluate(svgLayoutAudit, { scope: radiusScope, figuresOnly: true, explore: true })).issues).toEqual([]);
  const rayEntry = contents.getByRole("button", { name: concaveNormalTitle, exact: true });
  if (!(await rayEntry.isVisible())) await contents.getByText("İçindekiler", { exact: true }).press("Enter");
  await rayEntry.press("Enter");
  const scope = `figure[data-section-figure="${concaveNormalTitle}"]`;
  const figure = page.locator(scope);
  await expect(figure).toContainText("Normalden ölçülen gelme açısı 30°.");
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("Gelme 30°, yansıma 30°.");
  const angle = figure.getByRole("slider", { name: "Yerel normalden gelme açısı", exact: true });
  await angle.press("Home");
  await expect(figure).toContainText("Gelme 0°, yansıma 0°.");
  await angle.press("End");
  await expect(figure).toContainText("Gelme 45°, yansıma 45°.");
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  await figure.getByRole("img").screenshot({ path: info.outputPath("curvature-normal187.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("the Kopya Kağıdı separates the normal from the completed ray path", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-134");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: concaveNormalExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  for (const title of [concaveNormalTitle, concaveReturnTitle]) {
    await expect(solution.locator(`figure[data-section-figure="${title}"]`).getByRole("img")).toBeVisible();
  }
  await expect(solution.locator(`figure[data-section-figure="${concaveReturnTitle}"]`)).toContainText("Gelme 30°, yansıma 30°.");
});
