import { expect, test } from "@playwright/test";
import { bounceEnergyTitle } from "../../src/learning/bounceEnergy059";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("sıçrama tepesindeki enerji ve yükseklik aynı çevrimdışı modelden gelir", async ({ page, context }) => {
  test.setTimeout(90_000);
  await prepare(page, true);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "enerji-ve-hareket", search: "Enerji ve hareket" });
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: bounceEnergyTitle, exact: true }).press("Enter");
  const scope = `figure[data-section-figure="${bounceEnergyTitle}"]`;
  const figure = page.locator(scope);
  await expect(figure).toContainText("Tepe 1 m. Mekanik enerji 10 J.");
  await expect(figure).toContainText("toplam 30 J aktarıldı");
  await figure.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(figure).toContainText("Tepe 0,25 m. Mekanik enerji 2,5 J.");
  await expect(figure).toContainText("toplam 37,5 J aktarıldı");
  await figure.getByRole("slider", { name: /Çarpışma hız oranı/ }).press("End");
  await expect(figure).toContainText("Tepe 2,088 m. Mekanik enerji 20,88 J.");
  await expect(figure).toContainText("Birlikte 40 J.");

  const layout = await page.evaluate(svgLayoutAudit, { scope, figuresOnly: true, explore: true });
  expect(layout.issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(initial);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("sıçrama tablosu ve çözümlü örnek ayrı Kopya Kağıdı’nda çevrimdışı açılır", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 850 });
  await prepare(page);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await page.goto("/#/cheatsheets?topic=detail-118");
  const section = page.locator(".cheat-section").filter({
    has: page.getByRole("heading", { name: bounceEnergyTitle, exact: true }),
  });
  await expect(section.getByRole("rowheader")).toHaveText(["Başlangıç", "1. sıçrama", "2. sıçrama"]);
  await expect(section.getByRole("cell")).toHaveText(["4 m", "40 J", "0 J", "1 m", "10 J", "30 J", "0,25 m", "2,5 J", "37,5 J"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: "Yarı sürat, çeyrek yükseklik" });
  await example.locator(":scope > summary").press("Enter");
  const solution = example.locator(".cheat-solution");
  await expect(solution.getByRole("img")).toHaveCount(0);
  await solution.locator("summary").press("Enter");
  await expect(solution.getByRole("img")).toBeVisible();
  await expect(solution).toContainText("Mekanik enerji 37,5 J azaldı.");
  expect(learning(await storage(page))).toEqual(initial);
});
