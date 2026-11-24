import { expect, test } from "@playwright/test";
import { airFlowManometerExample, airFlowManometerExampleTitle, airFlowManometerTitle } from "../../src/learning/mebiAirFlowManometer";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const course = { lesson: "basinc", search: "Basınç" };
const diagram = (title: string) => `figure[data-section-figure="${title}"]`;
test.use({ viewport: { width: 320, height: 860 }, reducedMotion: "reduce" });

test("M ve L'nin su seviyeleri durgun ve akan havada şekille eşleşir", async ({ page, context }, info) => {
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: airFlowManometerTitle, exact: true }).press("Enter");
  const figure = page.locator(diagram(airFlowManometerTitle));
  const slider = figure.getByRole("slider", { name: /Geniş kesitte hava sürati/ });
  await expect(figure).toContainText("M: 10 m/s · L: 20 m/s.");
  await expect(figure).toContainText("P(M) − P(L): 180 Pa.");
  await expect(figure).toContainText("L kolundaki su 1,8 cm daha yüksek.");
  await slider.press("Home");
  await expect(figure).toContainText("P(M) − P(L): 0 Pa.");
  await expect(figure).toContainText("Su seviyeleri eşit.");
  await slider.press("End");
  await expect(figure).toContainText("M: 20 m/s · L: 40 m/s.");
  await expect(figure).toContainText("P(M) − P(L): 720 Pa.");
  await expect(figure).toContainText("L kolundaki su 7,2 cm daha yüksek.");
  const svg = figure.getByRole("img");
  await expect(svg).toHaveAccessibleName(/geniş kesiti M koluna.*dar kesiti L koluna/);
  await svg.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("air093-manometer.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: diagram(airFlowManometerTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("ayrı Kopya Kağıdı iki durumu ve 1,8 cm çözüm çizimini açar", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-125");
  const row = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: airFlowManometerTitle, exact: true }) });
  await expect(row.getByRole("columnheader")).toHaveText(["K borusundaki hava", "Statik basınçlar", "U borusundaki su"]);
  await expect(row.locator(".guide-table-cell-value")).toHaveText(["Durgun", "P(M) = P(L)", "Aynı seviyede", "Akıyor", "P(M) > P(L)", "L kolunda daha yüksek"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: airFlowManometerExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  const figure = solution.locator(diagram(airFlowManometerExampleTitle));
  await expect(figure.getByRole("img")).toBeVisible();
  await expect(figure).toContainText("L kolundaki su 1,8 cm daha yüksek.");
  expect(learning(await storage(page))).toEqual(before);
});
