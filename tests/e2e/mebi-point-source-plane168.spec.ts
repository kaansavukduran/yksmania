import { expect, test } from "@playwright/test";
import { beamDistanceExample, beamDistanceTitle, parallelBeamTitle, pointBeamTitle } from "../../src/learning/mebiBeamDistance";
import { pointSourcePlaneTitle } from "../../src/learning/mebiPointSourcePlane";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("normal angle, longer ray and parallel beam are readable in the offline optics lesson", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 890 });
  await prepare(page, true);
  const prior = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "isik-bilgisi", search: "Işık bilgisi" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  async function jump(title: string) {
    const item = nav.getByRole("button", { name: title, exact: true });
    if (!(await item.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
    await item.press("Enter");
    return page.locator('figure[data-section-figure="' + title + '"]');
  }
  const plane = await jump(pointSourcePlaneTitle);
  await expect(plane).toContainText("Eğik yol 5 m, normal açısı 53,1°, aydınlanma 5,4 lx.");
  const slider = plane.getByRole("slider", { name: "A’nın B’den aşağı uzaklığı", exact: true });
  await slider.press("Home");
  await expect(plane).toContainText("A ile B aynı konumda.");
  await slider.press("End");
  const image = plane.getByRole("img");
  await image.evaluate(node => node.scrollIntoView({ block: "center" }));
  await image.screenshot({ path: info.outputPath("point-source-plane168.png") });
  const beam = await jump(beamDistanceTitle);
  await expect(beam).toContainText("4 m ölçüm düzlemi 5 lx.");
  await beam.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(beam).toContainText("4 m ölçüm düzlemi 20 lx.");
  for (const title of [pointSourcePlaneTitle, beamDistanceTitle]) {
    const scope = 'figure[data-section-figure="' + title + '"]';
    await jump(title);
    expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  }
  expect(learning(await storage(page))).toEqual(prior);
});

test("the two distance models appear on different study sheet steps", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-131");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: beamDistanceExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  await expect(solution.locator('figure[data-section-figure="' + pointBeamTitle + '"]')).toContainText("4 m ölçüm düzlemi 5 lx.");
  await expect(solution.locator('figure[data-section-figure="' + parallelBeamTitle + '"]')).toContainText("4 m ölçüm düzlemi 20 lx.");
});
