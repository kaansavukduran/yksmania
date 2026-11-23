import { expect, test } from "@playwright/test";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";
import { frictionThresholdTitle } from "../../src/learning/newtonFrictionThreshold";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("sürtünme eşiğinde 25 N ile 26 N farklı rejimlere düşer", async ({ page, context }) => {
  test.setTimeout(60_000);
  await prepare(page, true);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "newton", search: "Kuvvet ve Newton" });
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: frictionThresholdTitle, exact: true }).press("Enter");
  const figure = page.locator(`figure[data-section-figure="${frictionThresholdTitle}"]`);
  const applied = figure.getByRole("slider", { name: /Uygulanan kuvvet/ });
  await expect(figure.getByRole("img")).toHaveAccessibleName(/İvme 25 N’ye kadar sıfır/);
  await expect(figure.locator("circle.sf-dot-hollow")).toHaveCount(1);
  await expect(figure).toContainText("F = 25 N · Kutu duruyor.");
  await expect(figure).toContainText("Sürtünme 25 N · Net kuvvet 0 N · İvme 0 m/s².");
  await applied.press("ArrowRight");
  await expect(figure).toContainText("F = 26 N · Kutu kayıyor.");
  await expect(figure).toContainText("Sürtünme 20 N · Net kuvvet 6 N · İvme 1,2 m/s².");
  await applied.press("End");
  await expect(figure).toContainText("Sürtünme 20 N · Net kuvvet 20 N · İvme 4 m/s².");
  const layout = await page.evaluate(svgLayoutAudit, {
    scope: `figure[data-section-figure="${frictionThresholdTitle}"]`, figuresOnly: true, explore: true,
  });
  expect(layout.issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(initial);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("sürtünme Kopya Kağıdı çözümü ve tabloyu çevrimdışı açar", async ({ page, context }) => {
  await page.setViewportSize({ width: 430, height: 850 });
  await prepare(page);
  await context.setOffline(true);
  const initial = learning(await storage(page));
  await page.getByRole("button", { name: "Menüyü aç", exact: true }).press("Enter");
  await page.locator(".sidebar").getByRole("button", { name: "Kopya Kağıtları", exact: true }).press("Enter");
  await page.getByRole("textbox", { name: "Ders veya konu ara", exact: true }).fill("Newton hareket");
  await page.getByRole("button", { name: "Newton hareket yasaları", exact: true }).press("Enter");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: frictionThresholdTitle, exact: true }) });
  const table = section.getByRole("table");
  await expect(table.getByRole("rowheader")).toHaveText(["24", "25", "26", "30"]);
  const at26 = table.getByRole("row").filter({ has: page.getByRole("rowheader", { name: "26", exact: true }) });
  await expect(at26.getByRole("cell")).toHaveText(["20", "1,2", "Kayıyor"]);
  const example = page.locator(".cheat-examples .worked-example").filter({ hasText: "25 N’den 26 N’ye geçerken ne değişir?" });
  await example.locator(":scope > summary").press("Enter");
  const answer = example.locator(".cheat-solution");
  await expect(answer.getByRole("img")).toHaveCount(0);
  await answer.locator("summary").press("Enter");
  await expect(answer.getByRole("img")).toBeVisible();
  await expect(answer).toContainText("1,2 m/s²");
  expect(learning(await storage(page))).toEqual(initial);
});
