import { expect, test } from "@playwright/test";
import { equalDepthTitle, fillingGraphExample, fillingGraphTitle } from "../../src/learning/mebiHydrostaticFilling";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const course = { lesson: "basinc", search: "Basınç" };
const figure = (title: string) => `figure[data-section-figure="${title}"]`;
test.use({ viewport: { width: 320, height: 860 }, reducedMotion: "reduce" });

test("eş derinlik ve üç dolum eğrisi çevrimdışı aynı basınç hesabını kullanır", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: equalDepthTitle, exact: true }).press("Enter");
  const depth = page.locator(figure(equalDepthTitle));
  await expect(depth).toContainText("I, II ve III: 10 kPa su basıncı.");
  await depth.getByRole("slider", { name: "Derinlik h (m)" }).press("ArrowRight");
  await expect(depth).toContainText("I, II ve III: 12,5 kPa su basıncı.");
  await toc.getByRole("button", { name: fillingGraphTitle, exact: true }).press("Enter");
  const fill = page.locator(figure(fillingGraphTitle));
  await expect(fill).toContainText("Taban su basıncı 15 kPa.");
  await expect(fill).toContainText("Sabit eğim.");
  await fill.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(fill).toContainText("Taban su basıncı 12,915 kPa.");
  await expect(fill).toContainText("Azalan eğim.");
  await fill.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(fill).toContainText("Taban su basıncı 20 kPa.");
  await expect(fill).toContainText("Artan eğim.");
  await fill.getByRole("slider", { name: "Dolum süresi (s)" }).press("Home");
  await expect(fill).toContainText("Taban su basıncı 0 kPa.");
  await fill.getByRole("slider", { name: "Dolum süresi (s)" }).press("End");
  await fill.getByRole("img").screenshot({ path: info.outputPath("hydrostatic080-graph.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: figure(fillingGraphTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı kap biçimlerini karşılaştırır ve son işlem çizimini taşır", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-125");
  const table = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: fillingGraphTitle, exact: true }) });
  await expect(table.getByRole("columnheader")).toHaveText(["Kap", "Yükselirken kesit", "h ve P grafiklerinin eğimi"]);
  await expect(table.locator(".guide-table-cell-value")).toHaveText([
    "Dik kenarlı kap", "Sabit", "Sabit eğim", "Yukarı genişleyen kap", "Büyür", "Azalan eğim", "Yukarı daralan kap", "Küçülür", "Artan eğim",
  ]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: fillingGraphExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(figure(fillingGraphTitle)).getByRole("img")).toBeVisible();
  expect(learning(await storage(page))).toEqual(before);
});

test("K ve L sorusu oranı açıklamadan önce soru çizimini gösterir", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, course);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (let i = 0; i < 3; i++) {
    await page.locator(".answer-options .answer").first().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  const stem = page.getByRole("figure", { name: "K ve L'nin düşey derinliği", exact: true });
  const final = page.getByRole("figure", { name: "Basınç oranını sadeleştir", exact: true });
  await expect(stem.getByRole("img")).toHaveAccessibleDescription(/0,4 metre/);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(page.getByRole("figure", { name: "Kendi su yüzeyinden ölç" })).toBeVisible();
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  const next = page.getByRole("button", { name: "Sonraki adım", exact: true });
  for (const level of [3, 4, 5]) {
    await expect(final).toHaveCount(0);
    await expect(next).toBeEnabled();
    await next.press("Enter");
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(level);
  }
  await expect(final.getByRole("math")).toHaveAccessibleName(/basıncı birdir/);
  await stem.getByRole("img").screenshot({ path: info.outputPath("hydrostatic080-question.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: "figure.source-question-figure" })).issues).toEqual([]);
});
