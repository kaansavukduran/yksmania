import { expect, test } from "@playwright/test";
import { waveClassificationExample, waveClassificationTitle } from "../../src/learning/mebiWaveClassification";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const classificationFigure = `figure[data-section-figure="${waveClassificationTitle}"]`;

test("dalga ağacında klavyeyle ortam ve titreşim yönü birlikte seçilir", async ({ page, context }, info) => {
  await page.setViewportSize({ width: 375, height: 860 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "dalgalara-giris", search: "Dalgalara giriş" });
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: waveClassificationTitle, exact: true }).press("Enter");
  const figure = page.locator(classificationFigure);
  const svg = figure.getByRole("img");
  await expect(svg).toHaveAccessibleName(/ortam kolu mekanik ve elektromanyetiğe/i);
  const original = await svg.innerHTML();
  const sound = figure.getByRole("button", { name: "Havada ses", exact: true });
  await sound.press("Enter");
  await expect(sound).toHaveAttribute("aria-pressed", "true");
  await expect(figure.locator(".sf-pick-card")).toContainText("Mekanik · boyuna");
  expect(await svg.innerHTML()).not.toBe(original);
  await svg.screenshot({ path: info.outputPath("wave-classification105-sound.png") });
  await figure.getByRole("button", { name: "Boşlukta ışık", exact: true }).press("Enter");
  await expect(sound).toHaveAttribute("aria-pressed", "false");
  await expect(figure.locator(".sf-pick-card")).toContainText("Elektromanyetik · enine");
  await figure.getByRole("button", { name: "Su yüzeyi", exact: true }).press("Enter");
  await expect(figure.locator(".sf-pick-card")).toContainText("Mekanik · yatay ve düşey bileşenler");
  expect((await page.evaluate(svgLayoutAudit, { scope: classificationFigure, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("ayrı Kopya Kağıdı iki ölçütü tablo ve çözüm ağacında gösterir", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-127");
  const summary = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: waveClassificationTitle, exact: true }) });
  await expect(summary.getByRole("columnheader")).toHaveText(["Örnek", "Ortam ölçütü", "Titreşim doğrultusu"]);
  await expect(summary.getByRole("row", { name: "Deprem P dalgası Mekanik Boyuna", exact: true })).toBeVisible();
  await expect(summary.getByRole("row", { name: "Deprem S dalgası Mekanik Enine", exact: true })).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: waveClassificationExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(classificationFigure).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Tel dalgası mekanik ve enine. Havada ses mekanik ve boyuna.");
  expect(learning(await storage(page))).toEqual(before);
});
