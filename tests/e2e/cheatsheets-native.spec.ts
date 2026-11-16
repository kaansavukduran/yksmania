import { setThemePreference } from "./helpers/theme";
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
registerOfflineBootDiagnostics();
test.use({ locale: "tr-TR", hasTouch: true });
async function nav(page: Page, name: string) {
  await expect(page.locator(".sidebar")).toBeAttached();
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function sheet(page: Page, name: string) {
  await nav(page, "Kopya Kağıtları");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(name);
  await page.getByRole("button", { name, exact: true }).click();
  await expect(page.locator(".cheat-reader")).toBeVisible();
}
test("built-in sheet opens through subject search, reveals real explanations and preserves notes offline without a source upload", async ({
  page,
  context,
}) => {
  // First online cache installation plus offline flow; public SW ready measured 28.6s.
  test.setTimeout(90_000);
  await page.goto("/");
  await sheet(page, "Rasyonel Sayılar");
  await expect(page.locator('.cheat-reader input[type="file"]')).toHaveCount(0);
  await expect(
    page.locator(".cheat-reader").getByRole("button", {
      name: /(?:PDF|dosya|katalog).*(?:ekle|yükle)|Kaynak dosyalarını yönet/i,
    }),
  ).toHaveCount(0);
  await expect(
    page.locator(".cheat-reader").getByRole("link", {
      name: /(?:PDF|dosya|katalog).*(?:ekle|yükle)|Kaynak dosyalarını yönet/i,
    }),
  ).toHaveCount(0);
  const recall = page.locator(".cheat-recall-card").first();
  await recall
    .getByRole("button", { name: "Yanıtı göster", exact: true })
    .click();
  await expect(recall.locator(".cheat-recall-answer")).toBeVisible();
  const example = page.locator(".cheat-examples .worked-example").first();
  await example.locator("summary").first().click();
  await example.getByText("Çözümü adım adım gör", { exact: true }).click();
  await expect(example).toContainText("Sonuç ve kontrol");
  await page
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("Payda sıfır olamaz.");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator(".cheat-reader")).toBeVisible();
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("Payda sıfır olamaz.");
  await expect(page.locator(".hourglass-time")).toBeVisible();
  await sheet(page, "Basınç");
  await expect(page.locator(".cheat-reader")).toContainText("P=F⊥/A");
  await expect(page.locator(".cheat-reader")).toContainText("PV/T");
});
test("native sheets stay readable with large Turkish text, touch and light theme at320px", async ({
  page,
}) => {
  await page.goto("/");
  await nav(page, "Ayarlar");
  await setThemePreference(page, "light");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.setViewportSize({ width: 320, height: 844 });
  await sheet(page, "Hücre Organelleri");
  await expect(page.locator(".cheat-reader")).toContainText("Ribozom");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
  expect(
    (await new AxeBuilder({ page }).analyze()).violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
  const metrics = await page.locator(".cheat-reader").evaluate((e) => ({
    width: e.clientWidth,
    padding: parseFloat(getComputedStyle(e).paddingLeft),
  }));
  expect(metrics.width - 2 * metrics.padding).toBeGreaterThanOrEqual(220);
});
