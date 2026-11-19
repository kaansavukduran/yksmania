import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { openGuidePage } from "./helpers/guidePages";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

async function stored(page: Page) {
  return page.evaluate(
    () =>
      new Promise<any>((resolve, reject) => {
        const request = indexedDB.open("yksmania", 2);
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
          const db = request.result;
          const read = db.transaction("state").objectStore("state").get("current");
          read.onsuccess = () => {
            resolve(read.result);
            db.close();
          };
        };
      }),
  );
}

for (const width of [1280, 320])
  test(`045 Malazgirt battle plays stage by stage at ${width}px without learning evidence`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Bugün", exact: true })).toBeVisible();
    const before = await stored(page);
    await page.goto("/#/lesson?id=selcuklu-yerlesme-devletlesme");
    await openGuidePage(page, "Malazgirt ile kuruluş tarihini ayır");
    const fig = page.locator('figure[data-section-figure="Malazgirt ile kuruluş tarihini ayır"]');
    await expect(fig).toBeVisible();
    const readout = fig.locator(".sf-readout");
    await expect(readout).toContainText("Aşama 1/6: Ordular karşı karşıya");
    const slider = fig.getByRole("slider");
    await slider.focus();
    await slider.press("End");
    await expect(readout).toContainText("Aşama 6/6: İmparator esir");
    await expect(readout).toContainText("1077");
    await slider.press("Home");
    await expect(readout).toContainText("Aşama 1/6");
    // Playback runs forward on its own and stops at the last stage.
    const play = fig.getByRole("button", { name: "Oynat", exact: true });
    const box = (await play.boundingBox())!;
    expect(box.height).toBeGreaterThanOrEqual(44);
    await play.click();
    await expect(readout).toContainText("Aşama 6/6", { timeout: 25_000 });
    await expect(fig.getByRole("button", { name: "Oynat", exact: true })).toBeVisible();
    const docWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(docWidth).toBeLessThanOrEqual(width + 1);
    const axe = await new AxeBuilder({ page }).include('figure[data-section-figure="Malazgirt ile kuruluş tarihini ayır"]').analyze();
    expect(axe.violations).toEqual([]);

    await openGuidePage(page, "Üç baskı hattını karıştırma");
    const line = page.locator('figure[data-section-figure="Üç baskı hattını karıştırma"]');
    await expect(line.locator(".sf-readout")).toContainText("1071 Malazgirt: Büyük Selçuklu – Bizans");
    for (let i = 0; i < 3; i++) await line.getByRole("button", { name: "İleri", exact: true }).click();
    await expect(line.locator(".sf-readout")).toContainText("1243 Kösedağ: Türkiye Selçuklu – Moğollar");

    const after = await stored(page);
    expect(after?.sessions ?? []).toEqual(before?.sessions ?? []);
    expect(after?.topicProgress ?? {}).toEqual(before?.topicProgress ?? {});
    expect(after?.reviews ?? []).toEqual(before?.reviews ?? []);
  });
