import { expect, test } from "@playwright/test";
import { railEnergyTitle } from "../../src/learning/railEnergy060";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("rayın A, D ve son C duruşlarını çevrimdışı karşılaştırır", async ({ page, context }) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "enerji-ve-hareket", search: "Enerji ve hareket" });
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: railEnergyTitle, exact: true }).press("Enter");

  const scope = `figure[data-section-figure="${railEnergyTitle}"]`;
  const figure = page.locator(scope);
  const next = figure.getByRole("button", { name: "İleri", exact: true });
  await expect(figure).toContainText("Yükseklik 4,5 m. Mekanik enerji 90 J.");
  await expect(figure).toContainText("Sürtünme nedeniyle cisim E’ye ulaşmaz.");
  await next.press("Enter");
  await expect(figure).toContainText("Yükseklik 1,5 m. Mekanik enerji 30 J.");
  await expect(figure).toContainText("60 J ısıl enerjiye ve diğer biçimlere geçti.");
  await next.press("Enter");
  await expect(figure).toContainText("C anında hız 0. Yükseklik 0 m. Mekanik enerji 0 J.");
  await expect(figure).toContainText("C’den ilk geçişte hız sıfır değildi.");
  await figure.getByRole("slider", { name: /Temel yükseklik/ }).press("End");
  await expect(figure).toContainText("150 J ısıl enerjiye ve diğer biçimlere geçti.");

  const layout = await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true });
  expect(layout.issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(initial);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("aynı rayın duruş tablosu ve enerji örneği ayrı Kopya Kağıdı’nda açılır", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 850 });
  await prepare(page);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-118");
  const section = page.locator(".cheat-section").filter({
    has: page.getByRole("heading", { name: railEnergyTitle, exact: true }),
  });
  await expect(section.getByRole("rowheader")).toHaveText(["A · Bırakma", "D · Dönüş", "C · Son duruş"]);
  await expect(section.getByRole("cell")).toHaveText(["3E₀", "0", "0", "E₀", "0", "2E₀", "0", "0", "3E₀"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: "C’den geçmek ile C’de durmak" });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.getByRole("img")).toBeVisible();
  await expect(solution).toContainText("A’dan D’ye 60 J, D’den son C’ye 30 J aktarılır.");
  expect(learning(await storage(page))).toEqual(initial);
});
