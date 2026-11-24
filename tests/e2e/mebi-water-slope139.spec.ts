import { expect, test } from "@playwright/test";
import { waterSlopeExample, waterSlopeTitle } from "../../src/learning/mebiWaterSlope";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("eğimli taban tepe aralığını değiştirirken kaynak frekansını korur", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "su-dalgalari", search: "Su dalgaları" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const section = toc.getByRole("button", { name: waterSlopeTitle, exact: true });
  if (!(await section.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await section.press("Enter");
  const scope = `figure[data-section-figure="${waterSlopeTitle}"]`;
  const figure = page.locator(scope);
  await expect(figure.getByRole("img")).toHaveAccessibleName(/sağa doğru derinleşen leğen/i);
  await expect(figure).toContainText("Girişte 6 cm/s, yerel λ 1,5 cm.");
  await expect(figure).toContainText("Çıkışta 12 cm/s, yerel λ 3 cm.");
  const ratio = figure.getByRole("slider", { name: "Sağ derinliğin sola oranı", exact: true });
  await ratio.press("Home");
  await expect(figure).toContainText("Çıkışta 6 cm/s, yerel λ 1,5 cm.");
  await ratio.press("End");
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("Yarım periyot sonra");
  await expect(figure).toContainText("Kaynak frekansı 4 Hz.");
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  const svg = figure.getByRole("img");
  const stripGap = await svg.evaluate((node) => {
    const polygons = [...node.querySelectorAll("polygon")];
    const profile = polygons.find((shape) => shape.points.numberOfItems > 100);
    const strip = polygons.find((shape) => shape.points.numberOfItems === 4);
    if (!profile || !strip) throw new Error("Expected the side profile and a separate projection strip");
    return strip.getBoundingClientRect().top - profile.getBoundingClientRect().bottom;
  });
  expect(stripGap).toBeGreaterThan(4);
  await svg.screenshot({ path: info.outputPath("water-slope139.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı çıkış sürati ve tepe aralığını aynı eğimde hesaplar", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-129");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: waterSlopeExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(`figure[data-section-figure="${waterSlopeTitle}"]`)).toHaveCount(2);
  await expect(solution).toContainText("Çıkış sürati 12 cm/s. Yerel dalga boyu girişte 1,5 cm, çıkışta 3 cm.");
});
