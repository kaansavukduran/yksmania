import { expect, test } from "@playwright/test";
import { reflectedCrestsTitle, waterReflectionExample, waterReflectionTitle } from "../../src/learning/mebiWaterReflection";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const selector = `figure[data-section-figure="${waterReflectionTitle}"]`;

test("düz engelde her iki cephe kendi hızına dik ve tepe aralığı aynı", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "su-dalgalari", search: "Su dalgaları" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const section = toc.getByRole("button", { name: waterReflectionTitle, exact: true });
  if (!(await section.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await section.press("Enter");
  const figure = page.locator(selector);
  const drawing = figure.getByRole("img");
  await expect(drawing).toHaveAccessibleName(/gelen ve yansıyan üç tepe çizgisi/i);
  await expect(figure).toContainText("i = r = 35°");
  await expect(figure).toContainText("Engel ile hız oku arası 55°.");
  const slider = figure.getByRole("slider", { name: "Gelme açısı i", exact: true });
  await slider.press("Home");
  await expect(figure).toContainText("i = r = 0°");
  await expect(drawing.getByText("Gelen cepheler", { exact: true })).toBeVisible();
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(drawing.getByText("Yansıyan cepheler", { exact: true })).toBeVisible();
  await slider.press("End");
  await expect(figure).toContainText("i = r = 75°");
  await expect(figure).toContainText("Aynı derinlikte tepe arası 2 cm.");
  expect((await page.evaluate(svgLayoutAudit, { scope: selector, figuresOnly: true, explore: true })).issues).toEqual([]);
  await drawing.evaluate((svg) => svg.scrollIntoView({ block: "center", behavior: "instant" }));
  await page.screenshot({ path: info.outputPath("mebi-water-reflection131.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı ölçülen açıyı ve tepe aralığını aynı şekille açıklar", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-129");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: waterReflectionExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(selector)).toHaveCount(1);
  const reflected = solution.locator(`figure[data-section-figure="${reflectedCrestsTitle}"]`);
  await expect(reflected.getByText("Yansıyan cepheler", { exact: true })).toBeVisible();
  await expect(reflected.getByRole("img")).toHaveAccessibleName(/yansıyan tepe çizgisi/i);
  await expect(solution).toContainText("Gelme 35°, yansıma 35°.");
});
