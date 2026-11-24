import { expect, test } from "@playwright/test";
import { concaveImageZonesExample, concaveImageZonesSteps, concaveImageZonesTitle } from "../../src/learning/mebiConcaveImageZones";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("three concave image positions link physical figures to an independent reading session", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "kuresel-aynalar", search: "Küresel aynalar" });
  const contents = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const entry = contents.getByRole("button", { name: concaveImageZonesTitle, exact: true });
  if (!(await entry.isVisible())) await contents.getByText("İçindekiler", { exact: true }).press("Enter");
  await entry.press("Enter");
  const scope = `figure[data-section-figure="${concaveImageZonesTitle}"]`;
  const figure = page.locator(scope);
  await expect(figure).toContainText("F: aynanın 2 cm önünde, nokta görüntü.");
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("v = 3, m = -0,5");
  await expect(figure).toContainText("Görüntü gerçek, ters, küçük");
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("v = 4, m = -1");
  await expect(figure).toContainText("Görüntü gerçek, ters, eş boylu");
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  await figure.getByRole("img").screenshot({ path: info.outputPath("concave-image190.png") });
  expect(learning(await storage(page))).toEqual(initial);
});

test("three concave image solution steps have separate Kopya Kağıdı figures offline", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-134");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: concaveImageZonesExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  for (const title of concaveImageZonesSteps) {
    const figure = solution.locator(`figure[data-section-figure="${title}"]`);
    await expect(figure.getByRole("img")).toBeVisible();
    await expect(figure.getByRole("img")).toHaveAccessibleName(/.+/);
  }
});
