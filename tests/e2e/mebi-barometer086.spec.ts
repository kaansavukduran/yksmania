import { expect, test } from "@playwright/test";
import { atmosphereHeightTitle, barometerExample, barometerHeightTitle } from "../../src/learning/mebiBarometerReadings";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const course = { lesson: "basinc", search: "Basınç" };
const diagram = (title: string) => `figure[data-section-figure="${title}"]`;
test.use({ viewport: { width: 320, height: 860 }, reducedMotion: "reduce" });

test("barometre yüksekliği kaynak okumaları ve eğik tüp bağıntısıyla çevrimdışı güncellenir", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, course);
  const toc = page.getByRole("navigation", { name: "Anlatım içeriği" });
  await toc.getByText("İçindekiler", { exact: true }).press("Enter");
  await toc.getByRole("button", { name: atmosphereHeightTitle, exact: true }).press("Enter");
  const air = page.locator(diagram(atmosphereHeightTitle));
  await expect(air).toContainText("0 m örnek okuması: 760 mmHg.");
  await air.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(air).toContainText("1.500 m örnek okuması: 650 mmHg.");
  await toc.getByRole("button", { name: barometerHeightTitle, exact: true }).press("Enter");
  const column = page.locator(diagram(barometerHeightTitle));
  await expect(column).toContainText("Her iki düşey yükseklik: 76 cm.");
  await expect(column).toContainText("tüpte sıvı uzunluğu: 152 cm.");
  const density = column.getByRole("slider", { name: /Sıvı yoğunluğu/ });
  await density.press("Home");
  await expect(column).toContainText("Her iki düşey yükseklik: 152 cm.");
  await expect(column).toContainText("tüpte sıvı uzunluğu: 304 cm.");
  await column.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(column).toContainText("Her iki düşey yükseklik: 130 cm.");
  await expect(column).toContainText("tüpte sıvı uzunluğu: 260 cm.");
  expect((await page.evaluate(svgLayoutAudit, { scope: diagram(atmosphereHeightTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  expect((await page.evaluate(svgLayoutAudit, { scope: diagram(barometerHeightTitle), figuresOnly: true, explore: true })).issues).toEqual([]);
  const svg = column.getByRole("img");
  await svg.evaluate((element) => element.scrollIntoView({ block: "center" }));
  await svg.screenshot({ path: info.outputPath("barometer086-column.png") });
  expect(learning(await storage(page))).toEqual(before);
});

test("barometre Kopya Kağıdı 760 ve 650 mmHg'yi tablosunda, eğik tüpü çözümünde gösterir", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 860 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-125");
  const row = page.locator(".cheat-section").filter({
    has: page.getByRole("heading", { name: atmosphereHeightTitle, exact: true }),
  });
  await expect(row.getByRole("columnheader")).toHaveText(["Yükseklik", "Kaynakta hava basıncı", "Cıva sütunu"]);
  await expect(row.locator(".guide-table-cell-value")).toHaveText(["0 m", "760 mmHg", "76 cm", "1.500 m", "650 mmHg", "65 cm"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: barometerExample.title });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(diagram(barometerHeightTitle)).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("152 cm");
  expect(learning(await storage(page))).toEqual(before);
});

test("barometre sorusunda iki kat ancak kalıcı son işlem çiziminde görünür", async ({ page, context }, info) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  await context.setOffline(true);
  await openCourse(page, course);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (let i = 0; i < 7; i += 1) {
    await page.locator(".answer-options .answer").first().click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  }
  const given = page.getByRole("figure", { name: "İdeal sıvılı barometrenin ilk okuması", exact: true });
  const hint = page.getByRole("figure", { name: "Sabit kalan dış basıncı işaretle", exact: true });
  const result = page.getByRole("figure", { name: "Yeni düşey yüksekliği bul", exact: true });
  await expect(given.getByRole("img")).toHaveAccessibleDescription(/yaklaşık vakum.*düşey yüksekliği h/);
  await expect(result).toHaveCount(0);
  const before = await storage(page);
  await page.getByRole("button", { name: "İpucu al", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(1);
  await expect(hint.getByRole("img")).toHaveAccessibleDescription(/Dış basınç ve yerçekimi sabit/);
  await page.getByRole("button", { name: "Adım adım çözüm", exact: true }).press("Enter");
  await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(2);
  const next = page.getByRole("button", { name: "Sonraki adım", exact: true });
  for (const level of [3, 4, 5]) {
    await expect(result).toHaveCount(0);
    await next.press("Enter");
    await expect.poll(async () => (await storage(page)).draft?.helpLevel).toBe(level);
  }
  await expect(result.getByRole("math")).toHaveAccessibleName(/ilk yüksekliğin iki katı/);
  const helped = await storage(page);
  expect(learning({ ...helped, draft: before.draft })).toEqual(learning(before));
  await page.reload();
  await expect(result.getByRole("math")).toHaveAccessibleName(/ilk yüksekliğin iki katı/);
  await expect(given.getByRole("img")).toBeVisible();
  expect(await storage(page)).toEqual(helped);
  expect((await page.evaluate(svgLayoutAudit, { scope: "figure.source-question-figure" })).issues).toEqual([]);
  await given.getByRole("img").screenshot({ path: info.outputPath("barometer086-question.png") });
});
