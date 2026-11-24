import { expect, test } from "@playwright/test";
import {
  fullSphereFluxTitle, lampComparisonTitle, photometryUnitsExample, photometryUnitsTitle, squareMetreFluxTitle,
} from "../../src/learning/mebiPhotometryUnits";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("watt and candela remain separately readable with the source lamp comparison offline", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 890 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "isik-bilgisi", search: "Işık bilgisi" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const item = nav.getByRole("button", { name: photometryUnitsTitle, exact: true });
  if (!(await item.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
  await item.press("Enter");
  const scope = 'figure[data-section-figure="' + lampComparisonTitle + '"]';
  const figure = page.locator(scope);
  await expect(figure).toContainText("25 W elektrik gücü. Örnek ölçüm 12 cd.");
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("50 W elektrik gücü. Örnek ölçüm 24 cd.");
  const image = figure.getByRole("img");
  await image.evaluate(node => node.scrollIntoView({ block: "center" }));
  await image.screenshot({ path: info.outputPath("photometry-units167.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("the study sheet keeps total flux and the one-square-metre flux at different steps", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-131");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: photometryUnitsExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator('figure[data-section-figure="' + fullSphereFluxTitle + '"]')).toContainText("4π lm");
  await expect(solution.locator('figure[data-section-figure="' + squareMetreFluxTitle + '"]')).toContainText("1 m² parçaya düşen akı 1 lm.");
});
