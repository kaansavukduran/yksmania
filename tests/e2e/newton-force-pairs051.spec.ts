import { expect, test } from "@playwright/test";
import { learning, openCourse, prepare, storage } from "./helpers/revisedCourse";
import { svgLayoutAudit } from "./helpers/svgAudit";
import { forcePairsTitle } from "../../src/learning/newtonForcePairs";

test.use({ viewport: { width: 320, height: 850 }, reducedMotion: "reduce" });

test("normal ve ağırlığın kuvvet çiftlerini gerçek hedeflerinde çevrimdışı gösterir", async ({ page, context }) => {
  test.setTimeout(60_000);
  await prepare(page, true);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await openCourse(page, { lesson: "newton", search: "Kuvvet ve Newton" });
  await page.getByText("İçindekiler", { exact: true }).click();
  await page.getByRole("button", { name: forcePairsTitle, exact: true }).press("Enter");
  const figure = page.locator(`figure[data-section-figure="${forcePairsTitle}"]`);
  const advance = figure.getByRole("button", { name: "İleri", exact: true });
  const pull = figure.getByRole("slider", { name: /Yukarı çekiş/ });
  await expect(figure).toContainText(/normal yukarı 14 N.*ağırlık aşağı 20 N.*Düşey toplam 0 N/);
  await pull.press("End");
  await expect(figure).toContainText(/normal yukarı 8 N.*ağırlık aşağı 20 N/);
  await advance.press("Enter");
  await expect(figure).toContainText("Masa → Kutu: 8 N yukarı.");
  await expect(figure).toContainText("Kutu → Masa: 8 N aşağı.");
  await advance.press("Enter");
  await expect(figure).toContainText("Dünya → Kutu: 20 N aşağı.");
  await expect(figure).toContainText("Kutu → Dünya: 20 N yukarı.");
  await pull.press("Home");
  await expect(figure).toContainText("Dünya → Kutu: 20 N aşağı.");
  await expect(figure).toContainText("Kutu → Dünya: 20 N yukarı.");
  const layout = await page.evaluate(svgLayoutAudit, {
    scope: `figure[data-section-figure="${forcePairsTitle}"]`, figuresOnly: true, explore: true,
  });
  expect(layout.issues).toEqual([]);
  expect(learning(await storage(page))).toEqual(initial);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
});

test("ayrı Kopya Kağıdı iki kuvvet çiftini semantik tablo ve çizimle tekrar ettirir", async ({ page, context }) => {
  await prepare(page);
  const initial = learning(await storage(page));
  await context.setOffline(true);
  await page.getByRole("button", { name: "Menüyü aç", exact: true }).press("Enter");
  await page.locator(".sidebar").getByRole("button", { name: "Kopya Kağıtları", exact: true }).press("Enter");
  await page.getByRole("textbox", { name: "Ders veya konu ara", exact: true }).fill("Newton hareket");
  await page.getByRole("button", { name: "Newton hareket yasaları", exact: true }).press("Enter");
  const section = page.locator(".cheat-section").filter({ has: page.getByRole("heading", { name: forcePairsTitle, exact: true }) });
  const table = section.getByRole("table");
  await expect(table.getByRole("columnheader")).toHaveText(["Kuvveti uygulayan", "Kuvveti alan", "Yön ve büyüklük"]);
  await expect(table.getByRole("rowheader")).toHaveText(["Masa", "Kutu", "Dünya", "Kutu"]);
  await expect(table.getByRole("cell")).toHaveText(["Kutu", "Yukarı 14 N", "Masa", "Aşağı 14 N", "Kutu", "Aşağı 20 N", "Dünya", "Yukarı 20 N"]);
  const model = section.locator(".section-figure");
  await model.getByRole("button", { name: "İleri", exact: true }).press("Enter");
  await expect(model).toContainText("Kutu → Masa: 14 N aşağı.");
  expect(learning(await storage(page))).toEqual(initial);
});
