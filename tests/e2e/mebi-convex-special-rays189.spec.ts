import { expect, test } from "@playwright/test";
import { convexSpecialExample, convexSpecialSteps, convexSpecialTitle } from "../../src/learning/mebiConvexSpecialRays";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("all four convex paths distinguish real rays and backward extensions offline", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "kuresel-aynalar", search: "Küresel aynalar" });
  const contents = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const entry = contents.getByRole("button", { name: convexSpecialTitle, exact: true });
  if (!(await entry.isVisible())) await contents.getByText("İçindekiler", { exact: true }).press("Enter");
  await entry.press("Enter");
  const scope = `figure[data-section-figure="${convexSpecialTitle}"]`;
  const figure = page.locator(scope);
  await expect(figure).toContainText("Sanal kesişim tepeden 1,79 birim arkada.");
  await figure.getByRole("slider", { name: "Temas noktasının yüksekliği", exact: true }).press("End");
  await expect(figure).toContainText("Sanal kesişim tepeden 1,59 birim arkada.");
  for (const text of ["Yansıma asal eksene paralel.", "Geliş ve yansıma 0°.", "Gelme 30°, yansıma 30°."]) {
    await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
    await expect(figure).toContainText(text);
  }
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  await figure.getByRole("img").screenshot({ path: info.outputPath("convex-special189.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("the separate Kopya Kağıdı gives the four convex solution steps their own SVGs", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-134");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: convexSpecialExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  for (const title of convexSpecialSteps) {
    await expect(solution.locator(`figure[data-section-figure="${title}"]`).getByRole("img")).toBeVisible();
  }
});
