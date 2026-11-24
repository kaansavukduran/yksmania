import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

test("theory pages switch between page-by-page and full view with a sticky position bar, remembered on this device", async ({ page, context }) => {
  await page.goto("/#/lesson?id=rasyonel-sayilar");
  const modes = page.getByRole("group", { name: "Okuma biçimi" });
  await expect(modes.getByRole("button", { name: "Tümünü gör" })).toHaveAttribute("aria-pressed", "true");
  const sections = page.locator(".guide-section");
  const total = await sections.count();
  expect(total).toBeGreaterThan(3);
  const bar = page.getByRole("progressbar", { name: "Anlatımda konum" });
  await expect(bar).toHaveAttribute("aria-valuenow", "1");

  await modes.getByRole("button", { name: /^Sayfa sayfa \(1\/\d+\)$/ }).click();
  await expect(sections).toHaveCount(1);
  await expect(page.locator(".guide-examples")).toHaveCount(0);
  await page.getByRole("navigation", { name: "Anlatım sayfaları" }).getByRole("button", { name: /Sonraki sayfa/ }).click();
  await expect(bar).toHaveAttribute("aria-valuenow", "2");
  await expect(modes.getByRole("button", { name: /^Sayfa sayfa \(2\/\d+\)$/ })).toBeVisible();
  await expect(sections).toHaveCount(1);
  await expect(page.locator(".guide-section > h2").first()).toBeFocused();
  // Bar stays at the top while reading.
  await page.mouse.wheel(0, 900);
  const box = await bar.boundingBox();
  expect(box && box.y).toBeLessThan(40);

  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(modes.getByRole("button", { name: /^Sayfa sayfa/ })).toHaveAttribute("aria-pressed", "true");
  await expect(sections).toHaveCount(1);
  await modes.getByRole("button", { name: "Tümünü gör" }).click();
  await expect(sections).toHaveCount(total);
  await expect(page.locator(".guide-examples")).toHaveCount(1);
});

test("page mode stays usable at 320 px without horizontal scrolling", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/#/settings");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await expect(page.locator(".save-status")).toContainText("Bu cihazda kaydedildi");
  await page.goto("/#/lesson?id=basit-esitsizlikler");
  const modes = page.getByRole("group", { name: "Okuma biçimi" });
  await modes.getByRole("button", { name: /^Sayfa sayfa/ }).click();
  await expect(page.locator(".guide-section")).toHaveCount(1);
  const pager = page.getByRole("navigation", { name: "Anlatım sayfaları" });
  const next = pager.getByRole("button", { name: "Sonraki sayfa", exact: true });
  await expect(next).toBeInViewport({ ratio: 1 });
  const before = await pager.boundingBox();
  expect(before?.height).toBeLessThanOrEqual(96);
  await next.press("Enter");
  const heading = page.locator(".guide-section > h2");
  await expect(heading).toBeFocused();
  await expect(heading).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  const axe = await new AxeBuilder({ page }).include(".learning-journey").include(".guide-progress").include(".journey-actions").analyze();
  expect(axe.violations).toEqual([]);
});
