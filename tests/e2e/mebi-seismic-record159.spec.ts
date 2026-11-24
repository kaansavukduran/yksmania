import { expect, test } from "@playwright/test";
import {
  seismicRecordDifferenceTitle, seismicRecordExampleTitle, seismicRecordReadTitle, seismicRecordTitle,
} from "../../src/learning/mebiSeismicRecord";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test("a real offline course makes the calculated P and S arrivals accessible", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 320, height: 870 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "ses-deprem-dalgalari", search: "Ses ve deprem" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  const item = toc.getByRole("button", { name: seismicRecordTitle, exact: true });
  if (!(await item.isVisible())) await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await item.press("Enter");
  const scope = `figure[data-section-figure="${seismicRecordTitle}"]`;
  const figure = page.locator(scope);
  const image = figure.getByRole("img");
  const station = figure.getByRole("slider", { name: "İstasyonun dış merkeze uzaklığı", exact: true });
  await expect(image.getByText("P 1,67 s", { exact: true })).toBeVisible();
  await expect(image.getByText("S 3,33 s", { exact: true })).toBeVisible();
  await expect(figure).toContainText("S, P’den 1,67 s sonra geliyor.");
  await image.evaluate(node => node.scrollIntoView({ block: "center" }));
  await image.screenshot({ path: info.outputPath("seismic-record159.png") });
  await station.press("Home");
  await expect(image.getByText("P 1 s", { exact: true })).toBeVisible();
  await expect(figure).toContainText("S, P’den 1 s sonra geliyor.");
  await station.press("End");
  await expect(image.getByText("S 4,47 s", { exact: true })).toBeVisible();
  await expect(figure).toContainText("S, P’den 2,24 s sonra geliyor.");
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("the example opens the trace and interval drawings with fixed values", async ({ page, context }) => {
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-130");
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: seismicRecordExampleTitle });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(`figure[data-section-figure="${seismicRecordReadTitle}"]`)).toContainText("P 1,67 s, S 3,33 s.");
  await expect(solution.locator(`figure[data-section-figure="${seismicRecordDifferenceTitle}"]`)).toContainText("S, P’den 1,67 s sonra geliyor.");
  await expect(solution.getByRole("slider")).toHaveCount(0);
});
