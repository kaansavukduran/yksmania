import { expect, test } from "@playwright/test";
import { manometerReferenceExample, manometerReferenceTitle } from "../../src/learning/mebiManometerReadings";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const course = { lesson: "basinc", search: "Basınç" };
const diagram = `figure[data-section-figure="${manometerReferenceTitle}"]`;
test.use({ viewport: { width: 320, height: 860 }, reducedMotion: "reduce" });

test("gaz yüzeyinin sırası ile açık ve kapalı referansı sonucu değiştirir", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: manometerReferenceTitle, exact: true }).press("Enter");
  const figure = page.locator(diagram);
  const slider = figure.getByRole("slider", { name: /Düşey fark/ });
  const next = figure.getByRole("button", { name: "İleri", exact: true });
  await expect(figure).toContainText("70 + 5 = 75 cmHg");
  await slider.press("End");
  await expect(figure).toContainText("70 + 10 = 80 cmHg");
  await next.press("Enter");
  await expect(figure).toContainText("70 − 10 = 60 cmHg");
  await slider.press("Home");
  await expect(figure).toContainText("70 + 0 = 70 cmHg");
  await next.press("Enter");
  await slider.press("End");
  await expect(figure).toContainText("0 + 10 = 10 cmHg");
  await expect(figure.getByRole("img")).toHaveAccessibleName(/cıva yüzeyi/i);
  expect((await page.evaluate(svgLayoutAudit, { scope: diagram, figuresOnly: true, explore: true })).issues).toEqual([]);
  await figure.getByRole("img").screenshot({ path: info.outputPath("manometer084-closed.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("ayrı Kopya Kağıdı atmosferi ekleyen tablolu örneği çevrimdışı açar", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-125");
  const table = page.locator(".cheat-section").filter({
    has: page.getByRole("heading", { name: manometerReferenceTitle, exact: true }),
  });
  await expect(table.getByRole("columnheader")).toHaveText(["Düzenek", "Referans basıncı", "Gaz basıncı, 5 cm farkla"]);
  await expect(table.locator(".guide-table-cell-value")).toHaveText([
    "Açık uç, gaz yüzeyi alçak", "70 cmHg", "75 cmHg",
    "Açık uç, gaz yüzeyi yüksek", "70 cmHg", "65 cmHg",
    "Kapalı uç, yaklaşık vakum", "0 cmHg", "5 cmHg",
  ]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: manometerReferenceExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(diagram).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("70 + 5 = 75 cmHg");
  expect(learning(await storage(page))).toEqual(before);
});

test("su manometresi ipucunda sonucu açmaz, kalıcı son çözümü çevrimdışı geri getirir", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, course);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (let i = 0; i < 6; i += 1) {
    await page.locator(".answer-options .answer").first().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  const given = page.getByRole("figure", { name: "Açık uçlu su manometresi", exact: true });
  const hint = page.getByRole("figure", { name: "Açık yüzeyden aynı seviyeye in", exact: true });
  const result = page.getByRole("figure", { name: "Açık hava ile sütun farkını topla", exact: true });
  await expect(given.getByRole("img")).toHaveAccessibleDescription(/0,2 metre alçak.*100000 paskal/);
  await expect(result).toHaveCount(0);
  const before = await storage(page);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(hint.getByRole("img")).toHaveAccessibleDescription(/aynı seviyede/);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  const next = page.getByRole("button", { name: "Sonraki adım", exact: true });
  for (const level of [3, 4, 5]) {
    await expect(result).toHaveCount(0);
    await next.press("Enter");
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(level);
  }
  await expect(result.getByRole("math")).toHaveAccessibleName(/102000 paskal/);
  const helped = await storage(page);
  expect(learning({ ...helped, draft: before.draft })).toEqual(learning(before));
  await page.reload();
  await expect(result.getByRole("math")).toHaveAccessibleName(/102000 paskal/);
  await expect(given.getByRole("img")).toBeVisible();
  expect(await storage(page)).toEqual(helped);
  expect((await page.evaluate(svgLayoutAudit, { scope: "figure.source-question-figure" })).issues).toEqual([]);
  await given.getByRole("img").screenshot({ path: info.outputPath("manometer084-question.png") });
});
