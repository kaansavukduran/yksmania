import { expect, test, type Page } from "@playwright/test";
import { rotationFromCenterTitle, transformationMethodsTitle } from "../../src/learning/translationMethods072";
import { learning, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

const scope = `figure[data-section-figure="${rotationFromCenterTitle}"]`;

async function checkMethods(page: Page) {
  const table = page.getByRole("region", { name: `${transformationMethodsTitle} tablosu` }).getByRole("table");
  await expect(table.getByRole("columnheader")).toHaveText([
    "Koşul ve ilk adım", "Geçerli örnek", "Sınır veya yakın hata", "Yeni bağlam",
  ]);
  await expect(table.getByRole("row")).toHaveCount(5);
  await expect(table.getByRole("row").nth(4).locator(".guide-table-cell-value")).toHaveText([
    "Bileşke · işlem sırasını yaz",
    "P(1; 0), 2 sağa sonra +90° ile (0; 3) olur.",
    "Önce dönüp sonra ötelersen (2; 1) olur.",
    "Uzaklık, açı ve alan korunur. Son konum sıraya bağlı olabilir.",
  ]);
  const matchingHeaders = await table.evaluate((node) => {
    const headers = Array.from(node.querySelectorAll("th"), (header) => header.id);
    return Array.from(node.querySelectorAll("tbody tr")).every((row) =>
      Array.from(row.querySelectorAll("td"), (cell) => cell.headers).every((header, index) => header === headers[index]));
  });
  expect(matchingHeaders).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
}

test("ders tablosu ve merkezden dönme çizimi %200 ölçekle çevrimdışı ve klavyeyle çalışır", async ({ page, context }) => {
  test.setTimeout(80_000);
  await page.setViewportSize({ width: 320, height: 880 });
  await prepare(page, true);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/lesson?id=donusum-oteleme-donme");
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: transformationMethodsTitle, exact: true }).press("Enter");
  await checkMethods(page);
  const region = page.getByRole("region", { name: `${transformationMethodsTitle} tablosu` });
  await expect(region.locator(".guide-table-cell-label").first()).toBeVisible();
  await region.focus();
  await expect(region).toBeFocused();
  if (await page.locator(".guide-contents details").getAttribute("open") === null)
    await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: rotationFromCenterTitle, exact: true }).press("Enter");
  const model = page.locator(scope);
  const angle = model.getByRole("slider", { name: /Merkezli dönme açısı/ });
  await expect(angle).toHaveValue("-90");
  await expect(model).toContainText("görüntü P′(0; −2).");
  await angle.press("End");
  await expect(model).toContainText("görüntü P′(4; 4).");
  await expect(model).toContainText("İki uzaklığın karesi de 13.");
  const audit = await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true });
  expect(audit.issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(before);
});

test("ayrı Kopya Kağıdı aynı tabloyu, çizimi ve çözümlü örneği gösterir", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 880 });
  await prepare(page);
  const before = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-405");
  await checkMethods(page);
  await expect(page.locator(".cheat-section").locator(scope).getByRole("img")).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: "Başka merkezde saat yönünü izle" });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.locator(scope).getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Merkeze uzaklığın karesi 13.");
  expect(learning(await storage(page))).toEqual(before);
});
