import { expect, test } from "@playwright/test";
import { radioWaveExample, radioWaveTitle } from "../../src/learning/mebiRadioWaves";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const selector = `figure[data-section-figure="${radioWaveTitle}"]`;

test("radyo frekansı klavyeyle değişince aynı verici çevresindeki cephelerin arası değişir", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 860 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "dalgalara-giris", search: "Dalgalara giriş" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: radioWaveTitle, exact: true }).press("Enter");
  const figure = page.locator(selector);
  const svg = figure.getByRole("img");
  await expect(svg).toHaveAccessibleName(/kulesinin tepesindeki antenin her iki yanında dalga cepheleri/i);
  await expect(figure).toContainText("100 MHz. Boşlukta komşu iki cephe arası 3 m.");
  const initial = await svg.innerHTML();
  const frequency = figure.getByRole("slider", { name: "Verici frekansı" });
  await frequency.press("Home");
  await expect(figure).toContainText("50 MHz. Boşlukta komşu iki cephe arası 6 m.");
  expect(await svg.innerHTML()).not.toBe(initial);
  await frequency.press("End");
  await expect(figure).toContainText("150 MHz. Boşlukta komşu iki cephe arası 2 m.");
  expect((await page.evaluate(svgLayoutAudit, { scope: selector, figuresOnly: true, explore: true })).issues).toEqual([]);
  await svg.screenshot({ path: info.outputPath("mebi-radio-waves111.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("ayrı Kopya Kağıdı frekans tablosunu ve ilgili çözüm çizimini açar", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-127");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: radioWaveTitle, exact: true }) });
  await expect(section.getByRole("row", { name: "125 MHz 2,4 m", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: radioWaveExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(selector).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("100 MHz için 3 m. 50 MHz için 6 m.");
});
