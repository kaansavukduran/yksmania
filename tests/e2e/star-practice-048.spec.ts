import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

test("difficulty-star practice: equal bands, short practice with a star badge, fits 320 px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/#/exams");
  await page.getByRole("button", { name: "Zorluk yıldızı" }).click();
  const panel = page.locator(".star-practice");
  await expect(panel.getByRole("heading", { name: "Zorluk yıldızına göre çalış" })).toBeVisible();
  await expect(panel).toContainText("resmî ÖSYM zorluğu veya başarı olasılığı değildir");
  const counts = await panel.locator(".star-count").allTextContents();
  expect(counts).toHaveLength(10);
  const n = counts.map(Number);
  expect(Math.max(...n) - Math.min(...n)).toBeLessThanOrEqual(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  const axe = await new AxeBuilder({ page }).include(".star-practice").analyze();
  expect(axe.violations).toEqual([]);
  await panel.getByRole("button", { name: "Seçici (9–10 yıldız)" }).click();
  await panel.getByRole("button", { name: /9–10 yıldız alıştırmasını başlat/ }).click();
  const badge = page.locator(".exam-question-meta .star-badge");
  await expect(badge).toBeVisible();
  const text = (await badge.textContent()) ?? "";
  const star = Number(text.match(/(\d+)\/10/)?.[1]);
  expect(star).toBeGreaterThanOrEqual(9);
});
