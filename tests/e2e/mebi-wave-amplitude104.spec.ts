import { expect, test } from "@playwright/test";
import { waterAmplitudeTitle, waveAmplitudeExample, waveAmplitudeTitle } from "../../src/learning/mebiWaveAmplitude";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const figure = (title: string) => `figure[data-section-figure="${title}"]`;

test("zaman grafiğinde genlik değişirken çeyrek periyotların konumu sabit kalır", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 860 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "dalgalara-giris", search: "Dalgalara giriş" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: waveAmplitudeTitle, exact: true }).press("Enter");
  const model = page.locator(figure(waveAmplitudeTitle));
  const svg = model.getByRole("img");
  await expect(svg).toHaveAccessibleName(/T\/4’te \+A, 3T\/4’te −A/);
  await expect(model).toContainText("Genlik: 3 cm. Tepe: +3 cm. Çukur: −3 cm.");
  await expect(model).toContainText("İki uç arası düşey uzaklık: 6 cm.");
  await svg.screenshot({ path: info.outputPath("amplitude104-time.png") });
  const xTicks = async () => svg.locator("text").evaluateAll((labels) => labels.filter((label) => /^(?:T(?:\/[24])?|3T\/4)$/.test(label.textContent ?? "")).map((label) => [label.textContent, label.getAttribute("x")]));
  const beforeTicks = await xTicks();
  expect(beforeTicks).toHaveLength(4);
  await model.getByRole("slider", { name: /Genlik A/ }).press("ArrowRight");
  await expect(model).toContainText("Genlik: 4 cm. Tepe: +4 cm. Çukur: −4 cm.");
  await expect(model).toContainText("İki uç arası düşey uzaklık: 8 cm.");
  expect(await xTicks()).toEqual(beforeTicks);
  expect((await page.evaluate(svgLayoutAudit, { scope: figure(waveAmplitudeTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı su seviyesini ve son işlemdeki zaman grafiğini açar", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-127");
  const water = page.locator(figure(waterAmplitudeTitle)).getByRole("img");
  await expect(water).toHaveAccessibleName(/İkisi de durgun seviyeye 3 santimetre uzaklıkta/);
  await water.screenshot({ path: info.outputPath("amplitude104-water.png") });
  const table = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: waveAmplitudeTitle, exact: true }) });
  await expect(table.getByRole("row", { name: "3T/4 −A En aşağıda", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: waveAmplitudeExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(figure(waveAmplitudeTitle)).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Genlik 3 cm, iki uç konum arası düşey uzaklık 6 cm’dir.");
  expect(learning(await storage(page))).toEqual(before);
});
