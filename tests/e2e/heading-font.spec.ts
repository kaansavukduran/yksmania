import { test, expect } from "@playwright/test";

test("Bricolage headings load with Turkish glyphs offline and explicit Lexend remains the user's choice", async ({ page, context }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Bugün", exact: true })).toBeVisible();
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await context.setOffline(true);
  await page.reload();
  const heading = page.getByRole("heading", { name: "Bugün", exact: true });
  await expect(heading).toBeVisible();
  expect(await page.evaluate(async () => {
    const faces = await document.fonts.load('650 32px "Bricolage Grotesque Variable"', "ÇĞİIÖŞÜçğıiöşü");
    return faces.length > 0 && faces.every((face) => face.status === "loaded");
  })).toBe(true);
  expect(await heading.evaluate((node) => getComputedStyle(node).fontFamily)).toContain("Bricolage Grotesque Variable");
  expect(await page.locator("body").evaluate((node) => getComputedStyle(node).fontFamily)).not.toContain("Bricolage");
  await page.locator(".sidebar").getByRole("button", { name: "Ayarlar", exact: true }).click();
  await page.getByLabel("Yazı tipi", { exact: true }).selectOption("lexend");
  await expect(page.locator(".save-status")).toContainText("Bu cihazda kaydedildi");
  await page.reload();
  await expect(page.getByLabel("Yazı tipi", { exact: true })).toHaveValue("lexend");
  expect(await page.getByRole("heading", { name: "Ayarlar", exact: true }).evaluate((node) => getComputedStyle(node).fontFamily)).toContain("Lexend");
});
