import { expect, test } from "@playwright/test";
import { wireDiameterSolutionTitle, wireMaterialSection, wireResistanceExample, wireResistanceTitle } from "../../src/learning/wireResistance076";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const scope = `figure[data-section-figure="${wireResistanceTitle}"]`;
const entry = { lesson: "elektrik-akimi", search: "Elektrik akımı" };
test.use({ viewport: { width: 320, height: 880 }, reducedMotion: "reduce" });

test("telin boyu, alanı, çapı ve malzemesi aynı fizik modelini çevrimdışı değiştirir", async ({ page, context }, info) => {
  test.setTimeout(85_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, entry);
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: wireResistanceTitle, exact: true }).press("Enter");
  const model = page.locator(scope);
  await expect(model).toContainText("Bakır, 20 °C. Başlangıç 0,017 Ω.");
  const next = model.getByRole("button", { name: "İleri", exact: true });
  await next.press("Enter");
  await expect(model).toContainText("Yeni tel 2 m, 1 mm². Direnç 0,034 Ω.");
  await next.press("Enter");
  await expect(model).toContainText("Yeni tel 1 m, 2 mm². Direnç 0,0085 Ω.");
  await next.press("Enter");
  await expect(model).toContainText("Yeni tel 1 m, 4 mm². Direnç 0,00425 Ω.");
  await model.getByRole("button", { name: "Gümüş", exact: true }).press("Enter");
  await expect(model).toContainText("Yeni tel 1 m, 4 mm². Direnç 0,003975 Ω.");
  await model.getByRole("img").screenshot({ path: info.outputPath("tel076-model.png") });
  expect((await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true })).issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("ayrı Kopya Kağıdı kaynak tablosunu ve tamamlanmış çözüm çizimini gösterir", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 880 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-123");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: wireMaterialSection.title, exact: true }) });
  await expect(section.getByRole("columnheader")).toHaveText(["Madde", "Öz direnç (Ω·m)"]);
  await expect(section.locator(".guide-table-cell-value")).toHaveText([
    "Gümüş", "1,59 × 10⁻⁸", "Bakır", "1,7 × 10⁻⁸", "Alüminyum", "2,82 × 10⁻⁸",
  ]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: wireResistanceExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(`figure[data-section-figure="${wireDiameterSolutionTitle}"]`).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("0,00425 Ω");
  expect(learning(await storage(page))).toEqual(before);
});

test("tel sorusu verilenleri şekle bağlar ve çözüm çizimini kayıt başarılı olunca açar", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, entry);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (let index = 0; index < 4; index++) {
    await page.locator(".answer-options .answer").first().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  const given = page.getByRole("figure", { name: "Eşit boylu X ve Y telleri", exact: true });
  const final = page.getByRole("figure", { name: "Direnç oranını bul", exact: true });
  await expect(given.getByRole("img")).toHaveAccessibleDescription(/çapı 2d/);
  await expect(final).toHaveCount(0);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(page.getByRole("figure", { name: "Çaptan kesit alanına geç", exact: true })).toBeVisible();
  await expect(final).toHaveCount(0);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  for (const level of [3, 4, 5]) {
    await expect(final).toHaveCount(0);
    await page.getByRole("button", { name: "Sonraki adım", exact: true }).press("Enter");
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(level);
  }
  await expect(final).toBeVisible();
  await given.screenshot({ path: info.outputPath("tel076-soru.png") });
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});
