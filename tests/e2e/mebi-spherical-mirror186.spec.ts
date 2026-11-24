import { expect, test } from "@playwright/test";
import {
  sphericalAxisTitle, sphericalConcaveTitle, sphericalConvexTitle, sphericalMirrorExample, sphericalSurfaceTitle,
} from "../../src/learning/mebiSphericalMirror";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("changing the mirror surface and ray height shows real versus virtual crossing offline", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "kuresel-aynalar", search: "Küresel aynalar" });
  const contents = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const entry = contents.getByRole("button", { name: sphericalSurfaceTitle, exact: true });
  if (!(await entry.isVisible())) await contents.getByText("İçindekiler", { exact: true }).press("Enter");
  await entry.press("Enter");
  const scope = `figure[data-section-figure="${sphericalSurfaceTitle}"]`;
  const figure = page.locator(scope);
  await expect(figure).toContainText("Gerçek ışınlar aynanın önünde kesişir. T’ye uzaklık 1,79 birim.");
  const height = figure.getByRole("slider", { name: "Işının eksene uzaklığı", exact: true });
  await height.press("End");
  await expect(figure).toContainText("T’ye uzaklık 1,52 birim.");
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("Geri uzantılar aynanın arkasında kesişir. T’ye uzaklık 1,52 birim.");
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  await figure.getByRole("img").screenshot({ path: info.outputPath("spherical-mirror186.png") });
  const axis = contents.getByRole("button", { name: sphericalAxisTitle, exact: true });
  if (!(await axis.isVisible())) await contents.getByText("İçindekiler", { exact: true }).press("Enter");
  await axis.press("Enter");
  await expect(page.locator(`figure[data-section-figure="${sphericalAxisTitle}"]`)).toContainText("MT = 3,6 birim. TF = FM = 1,8 birim.");
  expect(learning(await storage(page))).toEqual(before);
});

test("the Kopya Kağıdı has one real crossing and one backward-extension drawing", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-134");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: sphericalMirrorExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  for (const title of [sphericalConcaveTitle, sphericalConvexTitle]) {
    await expect(solution.locator(`figure[data-section-figure="${title}"]`).getByRole("img")).toBeVisible();
  }
});
