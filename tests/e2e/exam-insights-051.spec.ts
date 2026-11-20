import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

test("a finished 16-question session shows a fatigue curve and a +5 net compass from the saved answers only", async ({ page }) => {
  await page.goto("/#/today");
  await page.locator(".smart-session").getByRole("button", { name: "30 dk · 16 soru" }).click();
  await expect(page.locator(".exam-question-meta")).toContainText("Soru 1 / 16");
  // Answer the first question with A, leave the rest blank.
  await page.locator(".exam-answer").first().click();
  await page.getByRole("button", { name: "Denemeyi bitir", exact: true }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Bitir ve sonucu gör", exact: true }).click();
  const insights = page.getByRole("region", { name: "Deneme analizi" });
  await expect(insights.getByRole("heading", { name: "Deneme analizi" })).toBeVisible();
  await expect(insights.getByRole("img")).toHaveAttribute("aria-label", /1\. çeyrek yüzde \d+ doğru/);
  await expect(insights).toContainText("+5 Net Pusulası");
  await expect(insights).toContainText("En kısa yol:");
  await expect(insights).toContainText("YKS puanı ya da sıralama tahmini değildir");
  const axe = await new AxeBuilder({ page }).include(".exam-insights").analyze();
  expect(axe.violations).toEqual([]);
  await page.setViewportSize({ width: 320, height: 800 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});
