import { expect, test } from "@playwright/test";
import { airBuoyancyExample, airBuoyancyExampleTitle, airBuoyancyTitle } from "../../src/learning/mebiAirBuoyancy";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const course = { lesson: "sivilarin-kaldirma-kuvveti", search: "Kaldırma kuvveti", title: "Sıvılarda kaldırma kuvveti: yer değiştiren hacmi izle" };
const diagram = (title: string) => `figure[data-section-figure="${title}"]`;
test.use({ viewport: { width: 320, height: 860 }, reducedMotion: "reduce" });

test("eşit hacimli balonlarda L’nin kütlesi hareket yönünü değiştirir", async ({ page, context }, info) => {
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: airBuoyancyTitle, exact: true }).press("Enter");
  const figure = page.locator(diagram(airBuoyancyTitle));
  await expect(figure).toContainText("K: Kaldırma 0,12 N · ağırlık 0,2 N · net 0,08 N aşağı.");
  await expect(figure).toContainText("L: Kaldırma 0,12 N · ağırlık 0,08 N · net 0,04 N yukarı.");
  const svg = figure.getByRole("img");
  await expect(svg).toHaveAccessibleName(/aynı boyutta K ve L balonu/);
  await svg.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("air-buoyancy098-model.png") });
  const mass = figure.getByRole("slider", { name: /L’nin zar ve gaz dahil kütlesi/ });
  await mass.press("ArrowRight");
  await mass.press("ArrowRight");
  await expect(figure).toContainText("L: Kaldırma 0,12 N · ağırlık 0,12 N · net 0 N.");
  await mass.press("End");
  await expect(figure).toContainText("L: Kaldırma 0,12 N · ağırlık 0,2 N · net 0,08 N aşağı.");
  expect((await page.evaluate(svgLayoutAudit, { scope: diagram(airBuoyancyTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı ortak kaldırmayı ve zıt net kuvvetleri çevrimdışı gösterir", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-126");
  const row = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: airBuoyancyTitle, exact: true }) });
  await expect(row.getByRole("columnheader")).toHaveText(["10 L balon", "Ortalama yoğunluk", "Kaldırma ve ağırlık", "İlk hareket"]);
  await expect(row.locator(".guide-table-cell-value")).toContainText(["8 g", "0,8 kg/m³", "0,12 N > 0,08 N", "Yukarı", "12 g", "1,2 kg/m³", "0,12 N = 0,12 N", "Yerinde kalır", "20 g", "2 kg/m³", "0,12 N < 0,20 N", "Aşağı"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: airBuoyancyExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(diagram(airBuoyancyExampleTitle))).toContainText("net 0,04 N yukarı.");
  expect(learning(await storage(page))).toEqual(before);
});

test("K ve L’nin çizimi kökte, yoğunluk tablosu son kalıcı çözümde", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, course);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (let i = 0; i < 10; i++) {
    await page.locator(".answer-options .answer").first().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  const given = page.getByRole("figure", { name: "K ve L balonlarının ilk ivme yönleri", exact: true });
  const hint = page.getByRole("figure", { name: "Yukarı yönü pozitif seç", exact: true });
  const result = page.getByRole("figure", { name: "İki balonun yoğunluğunu havayla karşılaştır", exact: true });
  await expect(given.getByRole("img")).toHaveAccessibleDescription(/K’nın oku aşağı, L’nin oku yukarı/);
  await expect(result).toHaveCount(0);
  await expect(hint).toHaveCount(0);
  const before = await storage(page);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(hint.getByRole("math")).toHaveAccessibleName(/kaldırma eksi aşağı ağırlıktır/);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  for (const level of [3, 4, 5]) {
    await expect(result).toHaveCount(0);
    await page.getByRole("button", { name: "Sonraki adım", exact: true }).press("Enter");
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(level);
  }
  await expect(result.getByRole("table").getByRole("row", { name: "K Daha büyük" })).toBeVisible();
  await expect(result.getByRole("table").getByRole("row", { name: "L Daha küçük" })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  const state = await storage(page);
  expect(learning({ ...state, draft: before.draft })).toEqual(learning(before));
  await page.reload();
  await expect(result.getByRole("table")).toBeVisible();
  await given.getByRole("img").screenshot({ path: info.outputPath("air-buoyancy098-question.png") });
});
