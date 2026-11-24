import { expect, test } from "@playwright/test";
import { virtualWaterExample, virtualWaterReflectionTitle, virtualWaterTitle } from "../../src/learning/mebiVirtualWater";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const selector = `figure[data-section-figure="${virtualWaterTitle}"]`;

test("engele göre eş uzaklıktaki iki merkez ve aynı tepe aralığı çevrimdışı çalışır", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const baseline = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "su-dalgalari", search: "Su dalgaları" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const section = toc.getByRole("button", { name: virtualWaterTitle, exact: true });
  if (!(await section.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await section.press("Enter");
  const figure = page.locator(selector);
  const drawing = figure.getByRole("img");
  await expect(drawing).toHaveAccessibleName(/gerçek O noktası/);
  const slider = figure.getByRole("slider", { name: "Kaynak uzaklığı", exact: true });
  await slider.press("End");
  await expect(figure).toContainText("O, düz engelin 5 cm önünde.");
  await expect(drawing.getByText("O′", { exact: true })).toHaveCount(0);
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("O′, düz engelin 5 cm arkasında.");
  await expect(figure).toContainText("Ardışık tepe aralığı 0,8 cm.");
  await expect(drawing.getByText("O′", { exact: true })).toBeVisible();
  expect((await page.evaluate(svgLayoutAudit, { scope: selector, figuresOnly: true, explore: true })).issues).toEqual([]);
  await drawing.evaluate((svg) => svg.scrollIntoView({ block: "center", behavior: "instant" }));
  await page.screenshot({ path: info.outputPath("mebi-virtual-water133.png") });
  expect(learning(await storage(page))).toEqual(baseline);
});

test("Kopya Kağıdı O′yi yalnız ilgili yansıma adımında çizer", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-129");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: virtualWaterExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(selector).getByText("O′", { exact: true })).toHaveCount(0);
  const second = solution.locator(`figure[data-section-figure="${virtualWaterReflectionTitle}"]`);
  await expect(second.getByText("O′", { exact: true })).toBeVisible();
  await expect(second).toContainText("O′, düz engelin 3 cm arkasında.");
});
