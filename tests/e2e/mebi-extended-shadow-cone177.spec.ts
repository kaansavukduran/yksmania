import { expect, test } from "@playwright/test";
import { afterApexTitle, apexScreenTitle, beforeApexTitle, extendedConeExample, extendedConeTitle } from "../../src/learning/mebiExtendedShadowCone";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("the three screens follow the umbra tip in the lesson offline", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "golge-yari-golge", search: "Gölge ve yarı gölge" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const jump = nav.getByRole("button", { name: extendedConeTitle, exact: true });
  if (!(await jump.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
  await jump.press("Enter");
  const scope = 'figure[data-section-figure="' + extendedConeTitle + '"]';
  const figure = page.locator(scope);
  const slider = figure.getByRole("slider", { name: "Kaynak ile perde arası", exact: true });
  for (const [index, text] of ["Tam gölge çapı 1,03 cm.", "Tam gölge sınırı tek noktaya indi.", "Tam gölge yok."].entries()) {
    if (index > 0) await slider.press("ArrowRight");
    await expect(figure).toContainText(text);
    await expect(figure.getByText("Merkez ×7", { exact: true })).toBeVisible();
    expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
    const drawing = figure.getByRole("img");
    await drawing.evaluate(node => node.scrollIntoView({ block: "center" }));
    await drawing.screenshot({ path: info.outputPath(`shadow-cone177-${index + 1}.png`) });
  }
  expect(learning(await storage(page))).toEqual(before);
});

test("the offline Kopya Kağıdı keeps before, at and after the tip visually distinct", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-132");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: extendedConeExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  await expect(solution.locator('figure[data-section-figure="' + beforeApexTitle + '"]')).toContainText("1,03 cm");
  await expect(solution.locator('figure[data-section-figure="' + apexScreenTitle + '"]')).toContainText("Alanı sıfır.");
  await expect(solution.locator('figure[data-section-figure="' + afterApexTitle + '"]')).toContainText("halkalı görünüm");
});
