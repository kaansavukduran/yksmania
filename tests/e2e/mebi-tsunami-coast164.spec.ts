import { expect, test } from "@playwright/test";
import { coastEvacuationTitle, coastRetreatTitle, tsunamiCoastExample, tsunamiCoastTitle } from "../../src/learning/mebiTsunamiCoast";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("the retreat and uphill route are separate, readable steps in an offline lesson", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const previous = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "ses-deprem-dalgalari", search: "Ses ve deprem" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const item = nav.getByRole("button", { name: tsunamiCoastTitle, exact: true });
  if (!(await item.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
  await item.press("Enter");
  const scope = 'figure[data-section-figure="' + tsunamiCoastTitle + '"]';
  const figure = page.locator(scope);
  await expect(figure).toContainText("Aradaki zemin açığa çıktı.");
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("Tahliye oku kıyıdan uzaklaşıp yüksek alana yöneliyor.");
  const image = figure.getByRole("img");
  await image.evaluate(node => node.scrollIntoView({ block: "center" }));
  await image.screenshot({ path: info.outputPath("tsunami-coast164.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(previous);
});

test("Kopya Kağıdı opens the changed shore and the uphill route on their own steps", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-130");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: tsunamiCoastExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator('figure[data-section-figure="' + coastRetreatTitle + '"]').getByRole("img")).toBeVisible();
  await expect(solution.locator('figure[data-section-figure="' + coastEvacuationTitle + '"]').getByRole("img")).toBeVisible();
});
