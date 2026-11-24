import { expect, test } from "@playwright/test";
import { buoyancyEquilibriumExample, buoyancyEquilibriumExampleTitle, buoyancyEquilibriumTitle } from "../../src/learning/mebiBuoyancyEquilibrium";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const course = { lesson: "sivilarin-kaldirma-kuvveti", search: "Kaldırma kuvveti", title: "Sıvılarda kaldırma kuvveti: yer değiştiren hacmi izle" };
const diagram = (title: string) => `figure[data-section-figure="${title}"]`;
test.use({ viewport: { width: 320, height: 860 }, reducedMotion: "reduce" });

test("A, B ve C ilk hareket ile son dengeyi farklı gösterir", async ({ page, context }, info) => {
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: buoyancyEquilibriumTitle, exact: true }).press("Enter");
  const figure = page.locator(diagram(buoyancyEquilibriumTitle));
  await expect(figure).toContainText("A: Kaldırma 20 N · ağırlık 12 N · net 8 N yukarı.");
  await expect(figure).toContainText("B: Kaldırma 20 N · ağırlık 20 N · net 0 N.");
  await expect(figure).toContainText("C: Kaldırma 20 N · ağırlık 25 N · net 5 N aşağı.");
  const svg = figure.getByRole("img");
  await expect(svg).toHaveAccessibleName(/A üçgen, B kare, C daire/);
  await svg.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("buoyancy097-release.png") });
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("A yüzeyde. Batık hacim 1,2 L. Kaldırma 12 N · destek 0 N · net 0 N.");
  await expect(figure).toContainText("B askıda. Batık hacim 2 L. Kaldırma 20 N · destek 0 N · net 0 N.");
  await expect(figure).toContainText("C tabanda. Batık hacim 2 L. Kaldırma 20 N · destek 5 N · net 0 N.");
  await svg.screenshot({ path: info.outputPath("buoyancy097-equilibrium.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: diagram(buoyancyEquilibriumTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı ilk hareketi ve A’nın son dengesini ayrı gösterir", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-126");
  const row = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: buoyancyEquilibriumTitle, exact: true }) });
  await expect(row.getByRole("columnheader")).toHaveText(["Cisim", "Yoğunluk", "İlk net kuvvet", "Dengedeki konum"]);
  await expect(row.locator(".guide-table-cell-value")).toContainText(["A", "600 kg/m³", "8 N yukarı", "Kısmen batık, yüzeyde", "B", "1000 kg/m³", "0 N", "Tam batık, askıda", "C", "1250 kg/m³", "5 N aşağı", "Tam batık, tabanda"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: buoyancyEquilibriumExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  const figure = solution.locator(diagram(buoyancyEquilibriumExampleTitle));
  await expect(figure.getByRole("img")).toBeVisible();
  await expect(figure).toContainText("A yüzeyde. Batık hacim 1,2 L.");
  expect(learning(await storage(page))).toEqual(before);
});

test("yüzme sorusunun şeması sonucu çözümden önce vermez", async ({ page, context }, info) => {
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, course);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  await page.getByRole("button", { name: "B 24", exact: true }).click();
  await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
  await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  const given = page.getByRole("figure", { name: "Suyun üzerinde serbest yüzen blok", exact: true });
  const hint = page.getByRole("figure", { name: "Yukarı ve aşağı kuvvetleri eşitle", exact: true });
  const result = page.getByRole("figure", { name: "Hacim ile hacim oranını karşılaştır", exact: true });
  await expect(given.getByRole("img")).toHaveAccessibleDescription(/batık hacim verilmemiş/i);
  await expect(given).toContainText("Çizim ölçekli değildir.");
  await expect(given).not.toContainText("0,8 L");
  await expect(hint).toHaveCount(0);
  await expect(result).toHaveCount(0);
  const before = await storage(page);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(hint.getByRole("math")).toHaveAccessibleName(/yukarı kaldırmanın büyüklüğü/i);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  const next = page.getByRole("button", { name: "Sonraki adım", exact: true });
  for (const level of [3, 4, 5]) {
    await expect(result).toHaveCount(0);
    await next.press("Enter");
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(level);
  }
  await expect(result.getByRole("table").getByRole("cell", { name: "0,8 L", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
  const state = await storage(page);
  expect(learning({ ...state, draft: before.draft })).toEqual(learning(before));
  await page.reload();
  await expect(result.getByRole("table")).toBeVisible();
  await given.getByRole("img").screenshot({ path: info.outputPath("buoyancy097-question.png") });
});
