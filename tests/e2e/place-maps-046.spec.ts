import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { openGuidePage } from "./helpers/guidePages";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

for (const width of [1280, 320])
  test(`046 a page naming battles shows world and regional maps at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/#/lesson?id=dunya-gucu-osmanli");
    await openGuidePage(page, "I. Selim: doğu ve güneyi aynı rakip sanma");
    const section = page.locator("section.guide-section", {
      has: page.getByRole("heading", { name: "I. Selim: doğu ve güneyi aynı rakip sanma" }),
    });
    const map = section.locator(".place-map");
    await expect(map).toBeVisible();
    await expect(map.getByRole("img", { name: /Dünya haritasında konum/ })).toBeVisible();
    await expect(map.getByRole("img", { name: /Bölge haritası/ })).toBeVisible();
    await expect(map.locator(".place-legend li")).toHaveText([/Çaldıran Savaşı/, /Mercidabık Savaşı/, /Ridaniye Savaşı/]);
    const docWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(docWidth).toBeLessThanOrEqual(width + 1);
    const axe = await new AxeBuilder({ page }).include(".place-map").analyze();
    expect(axe.violations).toEqual([]);
  });
