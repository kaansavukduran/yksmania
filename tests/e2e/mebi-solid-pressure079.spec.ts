import { expect, test } from "@playwright/test";
import { brickPressureExample, brickPressureTitle, uprightPrismTitle } from "../../src/learning/mebiSolidPressure";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const course = { lesson: "basinc", search: "Basınç" };
const figure = (title: string) => `figure[data-section-figure="${title}"]`;
test.use({ viewport: { width: 320, height: 860 }, reducedMotion: "reduce" });

test("tuğla düzenleri ve prizma kesitleri çevrimdışı aynı kuvvet ve alanı kullanır", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: brickPressureTitle, exact: true }).press("Enter");
  const stacks = page.locator(figure(brickPressureTitle));
  await expect(stacks).toContainText("Ortalama basınç: 2G/S.");
  await stacks.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(stacks).toContainText("Ortalama basınç: G/S.");
  await stacks.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(stacks).toContainText("Ortalama basınç: 3G/(2S).");
  await stacks.getByRole("img").screenshot({ path: info.outputPath("solid079-bricks.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: figure(brickPressureTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  await toc.getByRole("button", { name: uprightPrismTitle, exact: true }).press("Enter");
  const prism = page.locator(figure(uprightPrismTitle));
  await expect(prism).toContainText("4 m² taban: 16.000 N / 4 m² = 4.000 Pa.");
  await prism.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(prism).toContainText("1 m² taban: 4.000 N / 1 m² = 4.000 Pa.");
  await expect(prism).toContainText("3 m² taban: 12.000 N / 3 m² = 4.000 Pa.");
  await prism.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(prism).toContainText("4 m² taban: 8.000 N / 4 m² = 2.000 Pa.");
  expect((await page.evaluate(svgLayoutAudit, { scope: figure(uprightPrismTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("Kopya Kağıdı tuğla tablosunu ve kapalı çözüm çizimini gösterir", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-125");
  const table = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: brickPressureTitle, exact: true }) });
  await expect(table.getByRole("columnheader")).toHaveText(["Düzenek", "Dik kuvvet", "Temas alanı", "Basınç"]);
  await expect(table.locator(".guide-table-cell-value")).toHaveText(["I", "2G", "S", "2G/S", "II", "2G", "2S", "G/S", "III", "3G", "2S", "3G/(2S)"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: brickPressureExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(figure(brickPressureTitle)).getByRole("img")).toBeVisible();
  expect(learning(await storage(page))).toEqual(before);
});

test("blok sorusu 2000 Pa sonucunu kalıcı çözüm açılışından önce göstermez", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, course);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  await page.locator(".answer-options .answer").first().click();
  await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
  await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  const given = page.getByRole("figure", { name: "İple desteklenen blok", exact: true });
  const final = page.getByRole("figure", { name: "Zemin kuvvetini alana böl", exact: true });
  await expect(given.getByRole("img")).toHaveAccessibleDescription(/40 newtonla yukarı/);
  await expect(final).toHaveCount(0);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  const hint = page.getByRole("figure", { name: "Kuvvetlerin yönünü belirle", exact: true });
  await expect(hint.getByRole("img")).toHaveAccessibleDescription(/zemin tepkisi yukarı/);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  const next = page.getByRole("button", { name: "Sonraki adım", exact: true });
  for (const level of [3, 4, 5]) {
    await expect(final).toHaveCount(0);
    await expect(next).toBeEnabled();
    await next.press("Enter");
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(level);
  }
  await expect(final.getByRole("math")).toHaveAccessibleName(/2000 paskal/);
  await hint.getByRole("img").screenshot({ path: info.outputPath("solid079-hint.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope: "figure.source-question-figure" })).issues).toEqual([]);
});
