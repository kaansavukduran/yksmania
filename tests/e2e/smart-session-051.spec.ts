import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

test("Today starts a 15-minute interleaved session with hidden topic labels; recovery is a short 3-question round", async ({ page }) => {
  await page.goto("/#/today");
  const panel = page.locator(".smart-session");
  await expect(panel.getByRole("heading", { name: "Akıllı oturum" })).toBeVisible();
  const axe = await new AxeBuilder({ page }).include(".smart-session").analyze();
  expect(axe.violations).toEqual([]);
  await panel.getByRole("button", { name: "15 dk · 8 soru" }).click();
  await expect(page.locator(".exam-question-meta")).toContainText("Soru 1 / 8");
  await expect(page.locator(".exam-question-meta")).toContainText("Konu gizli (karma pratik)");
  // While a session runs, Today does not start another one.
  await page.goto("/#/today");
  await expect(panel.getByRole("button", { name: "5 dk kurtarma · 3 soru" })).toBeDisabled();
  await expect(panel).toContainText("Önce devam eden denemeyi bitir");
});

test("the recovery round fits a 320 px phone", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/#/today");
  await page.locator(".smart-session").getByRole("button", { name: "5 dk kurtarma · 3 soru" }).click();
  await expect(page.locator(".exam-question-meta")).toContainText("Soru 1 / 3");
  await expect(page.locator(".exam-question-meta")).not.toContainText("Konu gizli");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});
