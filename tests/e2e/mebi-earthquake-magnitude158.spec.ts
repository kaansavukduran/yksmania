import { expect, test } from "@playwright/test";
import {
  localIntensityTitle, magnitudeDifferenceTitle, magnitudeExample, magnitudeRatioTitle, magnitudeScaleTitle, magnitudeTitle,
} from "../../src/learning/mebiEarthquakeMagnitude";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("the same earthquake and the magnitude ratio scale remain readable offline", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "ses-deprem-dalgalari", search: "Ses ve deprem" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const item = toc.getByRole("button", { name: magnitudeTitle, exact: true });
  if (!(await item.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await item.press("Enter");
  const scope = `figure[data-section-figure="${magnitudeTitle}"]`;
  const figure = page.locator(scope);
  const svg = figure.getByRole("img");
  await expect(svg.getByText("Tek deprem, M 6", { exact: true })).toBeVisible();
  await expect(figure).toContainText("A’da eşyalar sallandı. B’de duvarlarda çatlak görüldü.");
  await svg.evaluate(node => node.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("earthquake-158-local.png") });
  await expect(figure.getByRole("slider")).toHaveCount(0);
  const ratioItem = toc.getByRole("button", { name: magnitudeRatioTitle, exact: true });
  if (!(await ratioItem.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await ratioItem.press("Enter");
  const ratioScope = `figure[data-section-figure="${magnitudeRatioTitle}"]`;
  const ratioFigure = page.locator(ratioScope);
  const ratioSvg = ratioFigure.getByRole("img");
  const difference = ratioFigure.getByRole("slider", { name: "Büyüklük farkı", exact: true });
  await expect(ratioFigure).toContainText("Genlik oranı 10 kat.");
  await expect(ratioFigure).toContainText("Yaklaşık enerji oranı 31,62 kat.");
  await difference.press("Home");
  await expect(ratioFigure).toContainText("Genlik oranı 1 kat.");
  await expect(ratioFigure).toContainText("Yaklaşık enerji oranı 1 kat.");
  await difference.press("End");
  await expect(ratioFigure).toContainText("Genlik oranı 100 kat.");
  await expect(ratioFigure).toContainText("Yaklaşık enerji oranı 1.000 kat.");
  await ratioSvg.evaluate(node => node.scrollIntoView({ block: "center" }));
  await ratioSvg.screenshot({ path: info.outputPath("earthquake-158-ratios.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect((await page.evaluate(svgLayoutAudit, { scope: ratioScope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı büyüklük hesabını ve yerel gözlemi ilgili adımlarda gösterir", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-130");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: magnitudeExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(`figure[data-section-figure="${magnitudeDifferenceTitle}"]`)).toContainText("Büyüklük farkı 1.");
  await expect(solution.locator(`figure[data-section-figure="${magnitudeScaleTitle}"]`)).toContainText("31,62 kat.");
  await expect(solution.locator(`figure[data-section-figure="${localIntensityTitle}"]`)).toContainText("İki gözlem aynı M 6 depremini anlatıyor.");
});
