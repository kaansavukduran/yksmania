import { expect, test } from "@playwright/test";
import { convexExample, convexWaterReflectedTitle, convexWaterTitle, surfaceNormalTitle } from "../../src/learning/mebiConvexWater";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const selector = `figure[data-section-figure="${convexWaterTitle}"]`;

test("tümsek engel su tarafında dağıtır ve sanal F’yi arkada gösterir", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "su-dalgalari", search: "Su dalgaları" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const section = toc.getByRole("button", { name: convexWaterTitle, exact: true });
  if (!(await section.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await section.press("Enter");
  const figure = page.locator(selector);
  const drawing = figure.getByRole("img");
  await expect(drawing).toHaveAccessibleName(/sanal F yakınında/);
  await expect(drawing.getByText("F", { exact: true })).toHaveCount(0);
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(drawing.getByText("F", { exact: true })).toBeVisible();
  await expect(figure).toContainText("F engelin arkasında, tepeye yaklaşık 6 cm uzaklıkta.");
  expect((await page.evaluate(svgLayoutAudit, { scope: selector, figuresOnly: true, explore: true })).issues).toEqual([]);
  await drawing.evaluate((svg) => svg.scrollIntoView({ block: "center", behavior: "instant" }));
  await page.screenshot({ path: info.outputPath("mebi-convex-water134.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı diklik ve sanal odağı ayrı çözüm çizimlerinde gösterir", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-129");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: convexExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  const normal = solution.locator(`figure[data-section-figure="${surfaceNormalTitle}"]`);
  await expect(normal.getByRole("img")).toHaveAccessibleName(/90 derece diklik/);
  const reflected = solution.locator(`figure[data-section-figure="${convexWaterReflectedTitle}"]`);
  await expect(reflected.getByText("F", { exact: true })).toBeVisible();
  await expect(reflected).toContainText("Yansıyan oklar birbirinden uzaklaşır.");
});
