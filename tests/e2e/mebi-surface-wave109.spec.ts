import { expect, test } from "@playwright/test";
import { surfaceWaveExample, surfaceWaveTitle } from "../../src/learning/mebiSurfaceWave";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const model = `figure[data-section-figure="${surfaceWaveTitle}"]`;

test("su yüzeyinde işaret aynı yere dönüyor, tepe ilerlemeye devam ediyor", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 860 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "su-dalgalari", search: "Su dalgaları", title: "Su dalgaları: dalga cephesinden kırılmaya" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: surfaceWaveTitle, exact: true }).press("Enter");
  const figure = page.locator(model);
  const svg = figure.getByRole("img");
  await expect(svg).toHaveAccessibleName(/P işareti çember çizer/i);
  const time = figure.getByRole("slider", { name: "Geçen süre" });
  await time.press("ArrowRight");
  await time.press("ArrowRight");
  await expect(figure).toContainText("P’nin yatay konumu 3,4 m. İzlenen tepenin yatay konumu 4,5 m.");
  await time.press("End");
  await expect(figure).toContainText("P’nin yatay konumu 3 m. İzlenen tepenin yatay konumu 9 m.");
  expect((await page.evaluate(svgLayoutAudit, { scope: model, figuresOnly: true, explore: true })).issues).toEqual([]);
  await svg.screenshot({ path: info.outputPath("mebi-surface-wave109.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("ayrı Kopya Kağıdı yörüngenin dört çeyreğini ve son çözüm şeklini veriyor", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-129");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: surfaceWaveTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "3T/4 Denge seviyesinde, solda 7,5 m", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: surfaceWaveExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(model).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Tepe 6 m sağa ilerler. Yüzen işaretin net yatay yer değiştirmesi 0 m olur.");
});
