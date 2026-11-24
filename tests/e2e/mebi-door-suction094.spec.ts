import { expect, test } from "@playwright/test";
import { doorPressureTitle, liquidSuctionExample, liquidSuctionExampleTitle, liquidSuctionTitle } from "../../src/learning/mebiDoorSuction";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const course = { lesson: "basinc", search: "Basınç" };
const diagram = (title: string) => `figure[data-section-figure="${title}"]`;
test.use({ viewport: { width: 320, height: 860 }, reducedMotion: "reduce" });

test("kapının net basınç kuvveti farkla ters döner", async ({ page, context }) => {
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: doorPressureTitle, exact: true }).press("Enter");
  const figure = page.locator(diagram(doorPressureTitle));
  const slider = figure.getByRole("slider", { name: /Oda − dış basınç farkı/ });
  await expect(figure).toContainText("Oda: 100 kPa. Dışarı: 99,8 kPa.");
  await expect(figure).toContainText("Net basınç kuvveti: Dışarı 100 N.");
  await slider.press("Home");
  await expect(figure).toContainText("Net basınç kuvveti: İçeri 100 N.");
  await slider.press("ArrowRight");
  await slider.press("ArrowRight");
  await expect(figure).toContainText("Net basınç kuvveti: 0 N.");
  expect((await page.evaluate(svgLayoutAudit, { scope: diagram(doorPressureTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("depo sıvısı ancak açık musluk ve eşik üstünde ana boruya geçer", async ({ page, context }, info) => {
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: liquidSuctionTitle, exact: true }).press("Enter");
  const figure = page.locator(diagram(liquidSuctionTitle));
  const slider = figure.getByRole("slider", { name: /Depo − dar kesit basınç farkı/ });
  await expect(figure).toContainText("Fark: 4 kPa · Yükselme eşiği: 3 kPa.");
  await expect(figure).toContainText("Musluk kapalı. Ana boruya geçiş yok.");
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("Katkı sıvısı ana boruya geçebilir.");
  await slider.press("ArrowLeft");
  await expect(figure).toContainText("Sıvı boru girişinde dengede.");
  await slider.press("ArrowLeft");
  await expect(figure).toContainText("Sıvı boru girişine ulaşmaz.");
  await slider.press("End");
  const svg = figure.getByRole("img");
  await expect(svg).toHaveAccessibleName(/musluk ve U biçimli yan boruyla depoya/);
  await svg.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("suction094-flow.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: diagram(liquidSuctionTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı eşiği ve açık musluklu örneği çevrimdışı gösterir", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-125");
  const row = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: liquidSuctionTitle, exact: true }) });
  await expect(row.getByRole("columnheader")).toHaveText(["Musluk", "Basınç farkı", "Katkı sıvısı"]);
  await expect(row.locator(".guide-table-cell-value")).toHaveText([
    "Kapalı", "Her değer", "Ana boruya geçmez", "Açık", "3 kPa’dan az", "Boru girişine ulaşmaz",
    "Açık", "3 kPa", "Seviye girişte dengelenir", "Açık", "3 kPa’dan fazla", "Ana boruya geçebilir",
  ]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: liquidSuctionExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  const figure = solution.locator(diagram(liquidSuctionExampleTitle));
  await expect(figure.getByRole("img")).toBeVisible();
  await expect(figure).toContainText("Fark: 4 kPa · Yükselme eşiği: 3 kPa.");
  expect(learning(await storage(page))).toEqual(before);
});
