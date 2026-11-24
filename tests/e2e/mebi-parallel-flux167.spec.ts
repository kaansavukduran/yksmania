import { expect, test } from "@playwright/test";
import {
  grazingFluxTitle, parallelFluxExample, parallelFluxTitle, tiltedFluxTitle,
} from "../../src/learning/mebiParallelFlux";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("the surface tilts through all three angles and reports zero flux at grazing incidence offline", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "isik-bilgisi", search: "Işık bilgisi" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const item = nav.getByRole("button", { name: parallelFluxTitle, exact: true });
  if (!(await item.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
  await item.press("Enter");
  const scope = 'figure[data-section-figure="' + parallelFluxTitle + '"]';
  const figure = page.locator(scope);
  const next = figure.getByRole("button", { name: "İleri", exact: true });
  await expect(figure).toContainText("48 lm");
  await next.press("Enter");
  await expect(figure).toContainText("24 lm");
  const image = figure.getByRole("img");
  await image.evaluate(node => node.scrollIntoView({ block: "center" }));
  await image.screenshot({ path: info.outputPath("parallel-flux167.png") });
  await next.press("Enter");
  await expect(figure).toContainText("Yüzeye düşen ışık akısı 0 lm.");
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("a study-sheet solution uses the separate tilt and grazing figures", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-131");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: parallelFluxExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator('figure[data-section-figure="' + tiltedFluxTitle + '"]')).toContainText("24 lm");
  await expect(solution.locator('figure[data-section-figure="' + grazingFluxTitle + '"]')).toContainText("0 lm");
});
