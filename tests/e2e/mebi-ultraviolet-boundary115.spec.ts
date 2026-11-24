import { expect, test } from "@playwright/test";
import { ultravioletBoundaryExample, ultravioletBoundaryTitle } from "../../src/learning/mebiUltravioletBoundary";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const selector = `figure[data-section-figure="${ultravioletBoundaryTitle}"]`;

test("morötesi ve görünür bölge sınırı klavyeyle ve çevrimdışı incelenir", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 860 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "dalgalara-giris", search: "Dalgalara giriş" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: ultravioletBoundaryTitle, exact: true }).press("Enter");
  const figure = page.locator(selector);
  const svg = figure.getByRole("img");
  await expect(svg).toHaveAccessibleName(/380 nanometrede kesikli sınır/);
  await expect(figure).toContainText("350 nm · Morötesi");
  const initial = await svg.innerHTML();
  const slider = figure.getByRole("slider", { name: "Dalga boyu" });
  for (let n = 0; n < 3; n += 1) await slider.press("ArrowRight");
  await expect(figure).toContainText("380 nm · Yaklaşık sınır");
  await slider.press("End");
  await expect(figure).toContainText("480 nm · Görünür bölge");
  expect(await svg.innerHTML()).not.toBe(initial);
  expect((await page.evaluate(svgLayoutAudit, { scope: selector, figuresOnly: true, explore: true })).issues).toEqual([]);
  await svg.screenshot({ path: info.outputPath("mebi-ultraviolet-boundary115.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı sınır tablosunu ve ışın karşılaştırmasını açar", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-127");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: ultravioletBoundaryTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "380 nm Yaklaşık sınır", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: ultravioletBoundaryExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(selector).first().getByRole("img")).toBeVisible();
  await expect(solution).toContainText("350 nm morötesi, 440 nm görünür bölgededir.");
});
