import { expect, test } from "@playwright/test";
import {
  beforeSourceMovesTitle, coaxialShadowExample, coaxialShadowTitle,
  firstSourceMovesTitle, secondSourceMovesTitle,
} from "../../src/learning/mebiCoaxialShadow";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("the same axis K and L keep separate shadow areas under four moves offline", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "golge-yari-golge", search: "Gölge ve yarı gölge" });
  const nav = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const jump = nav.getByRole("button", { name: coaxialShadowTitle, exact: true });
  if (!(await jump.isVisible())) await nav.getByText("İçindekiler", { exact: true }).press("Enter");
  await jump.press("Enter");

  const scope = 'figure[data-section-figure="' + coaxialShadowTitle + '"]';
  const figure = page.locator(scope);
  const next = figure.getByRole("button", { name: "İleri", exact: true });
  const areas = [["20,2", "15,2"], ["25,66", "9,74"], ["20,2", "36,35"], ["14,73", "7,4"], ["25,94", "21,18"]];
  for (const [step, [inner, ring]] of areas.entries()) {
    if (step) await next.press("Enter");
    await expect(figure).toContainText(`İç daire (tam gölge) ${inner} cm². Halka (yarı gölge) ${ring} cm².`);
  }
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  const drawing = figure.getByRole("img");
  await drawing.evaluate(node => node.scrollIntoView({ block: "center" }));
  await drawing.screenshot({ path: info.outputPath("coaxial-shadow174.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("the study sheet compares the two distinct source moves", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-132");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: coaxialShadowExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await solution.locator("summary").press("Enter");
  for (const title of [beforeSourceMovesTitle, firstSourceMovesTitle, secondSourceMovesTitle]) {
    await expect(solution.locator('figure[data-section-figure="' + title + '"]').getByRole("img")).toBeVisible();
  }
});
