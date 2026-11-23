import { expect, test } from "@playwright/test";
import { exactTemperatureTitle } from "../../src/learning/exactTemperature064";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("aynı sıcaklığı üç ölçeğin ortak seviyesinde çevrimdışı gösterir", async ({ page, context }) => {
  test.setTimeout(80_000);
  await prepare(page, true);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "isi-ve-sicaklik", search: "Isı ve sıcaklık" });
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: exactTemperatureTitle, exact: true }).press("Enter");
  const scope = `figure[data-section-figure="${exactTemperatureTitle}"]`;
  const figure = page.locator(scope);
  const slider = figure.getByRole("slider", { name: /Sıcaklık/ });
  await expect(figure).toContainText("20 °C = 68 °F = 293,15 K.");
  await slider.press("Home");
  await expect(figure).toContainText(/[-−]40 °C = [-−]40 °F = 233,15 K\./);
  await slider.press("End");
  await expect(figure).toContainText("100 °C = 212 °F = 373,15 K.");
  await slider.fill("0");
  await expect(figure.getByRole("img").locator("text")).toContainText(["0 °C", "32 °F", "273,15 K"]);
  const layout = await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true });
  expect(layout.issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(initial);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("ayrı Kopya Kağıdı sıcaklık ve fark işlemlerini karşılaştırır", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 850 });
  await prepare(page);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-119");
  const section = page.locator(".cheat-section").filter({
    has: page.getByRole("heading", { name: exactTemperatureTitle, exact: true }),
  });
  await expect(section.getByRole("rowheader")).toHaveText([
    "Saf suyun donması (yaklaşık)", "Saf suyun kaynaması (yaklaşık)", "Mutlak sıfır",
  ]);
  await expect(section.getByRole("cell")).toHaveText([
    "0 °C", "32 °F", "273,15 K", "100 °C", "212 °F", "373,15 K", "−273,15 °C", "−459,67 °F", "0 K",
  ]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: "−10 °C ile 0 °C arasındaki artış" });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Artış 18 °F veya 10 K.");
  expect(learning(await storage(page))).toEqual(initial);
});
