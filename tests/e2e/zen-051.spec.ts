import { test, expect } from "@playwright/test";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

test("Zen focus mode hides navigation with F or the topbar button, exits with Escape and is remembered", async ({ page }) => {
  await page.goto("/#/lesson?id=rasyonel-sayilar");
  const sidebar = page.locator(".sidebar");
  await expect(sidebar).toBeVisible();
  await page.getByRole("button", { name: /Odak/ }).click();
  await expect(sidebar).toBeHidden();
  await expect(page.locator(".topbar")).toBeHidden();
  await expect(page.getByRole("button", { name: "Odaktan çık" })).toBeVisible();
  await page.reload();
  await expect(sidebar).toBeHidden();
  await page.keyboard.press("Escape");
  await expect(sidebar).toBeVisible();
  await page.locator("body").click({ position: { x: 600, y: 300 } });
  await page.keyboard.press("f");
  await expect(sidebar).toBeHidden();
  await page.keyboard.press("F");
  await expect(sidebar).toBeVisible();
});

test("F typed into a text field does not toggle Zen", async ({ page }) => {
  await page.goto("/#/courses");
  const search = page.getByRole("textbox", { name: "Ara" });
  await search.fill("");
  await search.press("f");
  await expect(search).toHaveValue("f");
  await expect(page.locator(".sidebar")).toBeVisible();
});
