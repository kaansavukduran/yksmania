import { expect, test } from "@playwright/test";
import {
  brightFringeTitle, darkFringeTitle, lightModelsExample, lightModelsTitle, youngFringesTitle,
} from "../../src/learning/mebiLightModels";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("the lesson shows wavelength spacing and its model table offline at large text", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 890 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "isik-bilgisi", search: "Işık bilgisi" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const item = nav.getByRole("button", { name: lightModelsTitle, exact: true });
  if (!(await item.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
  await item.press("Enter");
  const section = page.locator(".guide-section").filter({ has: page.getByRole("heading", { name: lightModelsTitle, exact: true }) });
  await expect(section.getByRole("columnheader", { name: "Gözlem", exact: true })).toBeVisible();
  await expect(section.getByRole("row", { name: /Compton.*momentum/ })).toBeVisible();
  const scope = 'figure[data-section-figure="' + youngFringesTitle + '"]';
  const figure = section.locator(scope);
  const slider = figure.getByRole("slider", { name: "Dalga boyu", exact: true });
  await slider.press("Home");
  await expect(figure).toContainText("yaklaşık 2,25 mm");
  await slider.press("End");
  await expect(figure).toContainText("yaklaşık 3,25 mm");
  const image = figure.getByRole("img");
  await image.evaluate(node => node.scrollIntoView({ block: "center" }));
  await image.screenshot({ path: info.outputPath("young-fringes166.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("the study sheet opens the two comparisons only when the solution opens", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-131");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: lightModelsExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator('figure[data-section-figure="' + brightFringeTitle + '"]')).toContainText("eş fazdaki dalgalar güçlenir");
  await expect(solution.locator('figure[data-section-figure="' + darkFringeTitle + '"]')).toContainText("eş genlikli dalgalar birbirini söndürür");
});
