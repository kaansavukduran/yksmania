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
    await expect(map.getByRole("group", { name: /Bölge haritası/ })).toBeVisible();
    await expect(map.locator(".place-legend li")).toHaveText([/Çaldıran Savaşı/, /Mercidabık Savaşı/, /Ridaniye Savaşı/]);
    // A pin opens a focus card; zoom and reset work from the keyboard-reachable buttons.
    await expect(map.getByRole("button", { name: "Seçili yere yakınlaştır" })).toBeDisabled();
    await map.getByRole("button", { name: /^2\. Mercidabık Savaşı/ }).click();
    await expect(map.locator(".place-focus-card")).toContainText("Mercidabık Savaşı");
    await map.getByRole("button", { name: "Seçili yere yakınlaştır" }).click();
    await expect(map.locator(".place-zoom-level")).toHaveText("%300");
    await map.getByRole("button", { name: "Sıfırla" }).click();
    await expect(map.locator(".place-zoom-level")).toHaveText("%100");
    await expect(map.locator(".place-focus-card")).toHaveCount(0);
    await map.locator(".place-legend").getByRole("button", { name: /Ridaniye Savaşı/ }).click();
    await expect(map.locator(".place-focus-card")).toContainText("Ridaniye Savaşı");
    // Both panels have the same size, and the regional map zooms with the wheel.
    const [worldBox, regionBox] = await Promise.all([
      map.getByRole("img", { name: /Dünya haritasında konum/ }).boundingBox(),
      map.getByRole("group", { name: /Bölge haritası/ }).boundingBox(),
    ]);
    expect(Math.abs(worldBox!.width - regionBox!.width)).toBeLessThan(2);
    expect(Math.abs(worldBox!.height - regionBox!.height)).toBeLessThan(2);
    if (width > 600) {
      await page.mouse.move(regionBox!.x + regionBox!.width / 2, regionBox!.y + regionBox!.height / 2);
      await page.mouse.wheel(0, -400);
      await expect(map.locator(".place-zoom-level")).not.toHaveText("%100");
      await map.getByRole("button", { name: "Sıfırla" }).click();
    }
    const docWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(docWidth).toBeLessThanOrEqual(width + 1);
    const axe = await new AxeBuilder({ page }).include(".place-map").analyze();
    expect(axe.violations).toEqual([]);
  });
