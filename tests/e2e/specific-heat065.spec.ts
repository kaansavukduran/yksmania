import { expect, test } from "@playwright/test";
import { equalHeatTitle, specificHeatTitle } from "../../src/learning/specificHeat065";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("öz ısı birimini ve su ile demirin sıcaklık farkını ayrı çizimlerde çevrimdışı gösterir", async ({ page, context }) => {
  test.setTimeout(85_000);
  await prepare(page, true);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "isi-ve-sicaklik", search: "Isı ve sıcaklık" });

  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: specificHeatTitle, exact: true }).press("Enter");
  const substanceScope = `figure[data-section-figure="${specificHeatTitle}"]`;
  const substances = page.locator(substanceScope);
  await expect(substances).toContainText("Demir 448, su 4.186 J/(kg·K).");
  await substances.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(substances).toContainText("Demir yaklaşık 0,107, su yaklaşık 1,000 cal/(g·°C).");
  const substanceLayout = await page.evaluate(svgLayoutAudit, { scope: substanceScope, figuresOnly: true, explore: true });
  expect(substanceLayout.issues).toEqual([]);

  const contents = page.getByRole("navigation", { name: "Anlatım içeriği", exact: true });
  if (await contents.locator("details").getAttribute("open") === null) {
    await contents.getByText("İçindekiler", { exact: true }).click();
  }
  await contents.getByRole("button", { name: equalHeatTitle, exact: true }).press("Enter");
  const temperatureScope = `figure[data-section-figure="${equalHeatTitle}"]`;
  const temperatures = page.locator(temperatureScope);
  await expect(temperatures).toContainText("Su 1 °C ısınır.");
  await expect(temperatures).toContainText("Demir 9,34 °C ısınır.");
  await temperatures.getByRole("slider", { name: /Her cisme verilen enerji/ }).press("End");
  await expect(temperatures).toContainText("Su 2 °C ısınır.");
  await expect(temperatures).toContainText("Demir 18,69 °C ısınır.");
  const temperatureLayout = await page.evaluate(svgLayoutAudit, { scope: temperatureScope, figuresOnly: true, explore: true });
  expect(temperatureLayout.issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(initial);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("ayrı Kopya Kağıdı düzeltilmiş demir satırını ve sıcaklık artışı çözüm çizimini açar", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 850 });
  await prepare(page);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-119");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: specificHeatTitle, exact: true }) });
  await expect(section.getByRole("rowheader")).toHaveCount(7);
  const iron = section.getByRole("row").filter({ has: page.getByRole("rowheader", { name: "Demir", exact: true }) });
  await expect(iron.getByRole("cell")).toHaveText(["448", "0,107"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: "Suda 1 °C, demirde kaç °C?" });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Su yaklaşık 1 °C, demir yaklaşık 9,34 °C ısınır.");
  expect(learning(await storage(page))).toEqual(initial);
});
