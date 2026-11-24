import { expect, test } from "@playwright/test";
import { tuningForkExample, tuningForkTitle } from "../../src/learning/mebiTuningFork";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const selector = `figure[data-section-figure="${tuningForkTitle}"]`;

test("the tuning fork and air model respond to the keyboard offline without changing learning records", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 860 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "dalgalara-giris", search: "Dalgalara giriş" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: tuningForkTitle, exact: true }).press("Enter");
  const figure = page.locator(selector);
  const svg = figure.getByRole("img");
  await expect(svg).toHaveAccessibleName(/plastik tokmak ve iki kollu diyapazon/i);
  const slider = figure.getByRole("slider", { name: "Geçen süre" });
  const initial = await svg.innerHTML();
  await slider.press("ArrowRight");
  await slider.press("ArrowRight");
  await expect(slider).toHaveValue("0.25");
  expect(await svg.innerHTML()).not.toBe(initial);
  await expect(figure).toContainText("İşaretli nokta kendi denge çizgisi çevresinde yatay salınır.");
  expect((await page.evaluate(svgLayoutAudit, { scope: selector, figuresOnly: true, explore: true })).issues).toEqual([]);
  await svg.screenshot({ path: info.outputPath("mebi-tuning-fork106.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("the offline cheat sheet provides a semantic table and reveals the figure in the matching solution step", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-127");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: tuningForkTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "Sıkışma Komşu hava noktaları yakın", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: tuningForkExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(selector).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Havada yayılan ses mekanik ve boyuna dalgadır.");
  expect(learning(await storage(page))).toEqual(before);
});
