import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

const LESSON = "Negatif sayılar ve işaret kuralları";

async function openLesson(page: Page) {
  await page.goto("/#/today");
  await page.getByRole("navigation").getByRole("button", { name: "Temel İnşa" }).click();
  await expect(page.getByRole("heading", { level: 1, name: "Temel İnşa" })).toBeVisible();
  const card = page.locator(".foundation-card", { hasText: LESSON });
  await card.getByRole("button", { name: /Başla/ }).click();
  await expect(page.getByRole("heading", { level: 1, name: LESSON })).toBeVisible();
}

test("Temel İnşa opens from the sidebar, pages one by one, checks explain wrong choices and never add plan progress", async ({ page, context }) => {
  await page.goto("/#/today");
  await expect(page.locator(".hero-progress-chip")).toContainText("0 / 505 konu çalışıldı");
  await openLesson(page);
  const modes = page.getByRole("group", { name: "Okuma biçimi" });
  await expect(modes.getByRole("button", { name: "Sayfa sayfa (1/5)" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByRole("progressbar", { name: "Okuma ilerlemesi" })).toHaveAttribute("aria-valuenow", "20");
  await page.getByRole("button", { name: "Cevabı göster" }).click();
  await expect(page.locator(".foundation-answer")).toContainText("−3");
  await page.getByRole("button", { name: /^Sonraki/ }).click();
  await expect(modes.getByRole("button", { name: "Sayfa sayfa (2/5)" })).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Çıkarma = zıttını ekleme" })).toBeVisible();
  const fig = page.locator("figure.section-figure").first();
  await fig.locator("svg text.sf-pickable", { hasText: /^3 − \(−4\)$/ }).click();
  await expect(fig.locator(".sf-pick-card")).toContainText("3 + 4 = 7");

  await page.getByRole("button", { name: "4. sayfa: Çözümlü örnekler" }).click();
  const example = page.locator(".foundation-example", { hasText: "Üs tuzağı" });
  for (let i = 0; i < 3; i++) await example.getByRole("button").click();
  await expect(example).toContainText("Sonuç: 0");

  await page.getByRole("button", { name: "5. sayfa: Kendini sına" }).click();
  await expect(page.getByText("Özgün alıştırma · ÖSYM sorusu değildir")).toBeVisible();
  const check = page.locator(".foundation-check").first();
  await check.getByRole("button", { name: /−13/ }).click();
  await expect(check.locator(".foundation-feedback")).toContainText("Yanlış: doğru cevap B.");
  await expect(check.locator(".foundation-feedback")).toContainText("İkinci eksi işaretinin anlamı atlanmış.");
  await check.getByRole("button", { name: "Yeniden dene" }).click();
  await check.getByRole("button", { name: /^B 3$/ }).click();
  await expect(check.locator(".foundation-feedback")).toContainText("Doğru.");
  await expect(page.getByRole("button", { name: "Ön derslere dön" })).toBeVisible();

  await modes.getByRole("button", { name: "Tümünü gör" }).click();
  await expect(page.locator(".foundation-section")).toHaveCount(5);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(page.getByRole("heading", { level: 1, name: LESSON })).toBeVisible();
  await expect(modes.getByRole("button", { name: "Tümünü gör" })).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator(".foundation-section")).toHaveCount(5);
  await page.getByRole("navigation").getByRole("button", { name: "Bugün" }).click();
  await expect(page.locator(".hero-progress-chip")).toContainText("0 / 505 konu çalışıldı");
});

test("Temel İnşa covers every TYT subject and stays readable at 320 px with large text", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto("/#/foundations");
  await page.evaluate(() => document.documentElement.style.setProperty("--text-scale", "1.5"));
  const subjects = page.getByRole("group", { name: "Ders seç" });
  await expect(subjects.getByRole("button", { name: /Matematik.*7 ön ders/ })).toHaveAttribute("aria-pressed", "true");
  for (const [name, n] of [["Türkçe", 2], ["Geometri", 3], ["Fizik", 4], ["Kimya", 3], ["Biyoloji", 2], ["Tarih", 1], ["Coğrafya", 1], ["Felsefe", 1], ["Din Kültürü", 1]] as const) {
    await subjects.getByRole("button", { name: new RegExp(`${name}.*${n} ön ders`) }).click();
    await expect(page.locator(".foundation-card")).toHaveCount(n);
  }
  await expect(page.locator(".foundation-empty")).toHaveCount(0);
  await subjects.getByRole("button", { name: /Matematik/ }).click();
  await expect(page.locator(".foundation-card")).toHaveCount(7);
  await page.goto("/#/foundations?id=temel-mat-negatif-sayilar");
  await page.getByRole("button", { name: "3. sayfa: Çarpma ve bölmede işaret" }).click();
  const fig = page.locator("figure.section-figure").first();
  await fig.locator("svg text.sf-pickable", { hasText: "(−) × (−)" }).click();
  await expect(fig.locator(".sf-pick-card")).toContainText("(−3) × (−2) = 6");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  const axe = await new AxeBuilder({ page }).include(".foundation-reader").analyze();
  expect(axe.violations).toEqual([]);
});
