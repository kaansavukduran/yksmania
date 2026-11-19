import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul" });

const TITLE = "Kronolojiyi bir karşılaştırma aracı yap";

async function openFigure(page: import("@playwright/test").Page) {
  await page.goto("/#/lesson?id=ataturkculuk-inkilap");
  const fig = page.locator(`figure.section-figure[data-section-figure="${TITLE}"]`);
  for (let i = 0; i < 30 && !(await fig.count()); i++) {
    const next = page.getByRole("button", { name: /^Sonraki|Devam/ }).first();
    if (!(await next.count())) break;
    await next.click();
  }
  await fig.scrollIntoViewIfNeeded();
  return fig;
}

test("reform grid: clicking an event label or its button opens a detail card, fits 320 px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  const fig = await openFigure(page);
  await expect(fig.locator(".sf-pick")).toHaveCount(14);
  await expect(fig.locator(".sf-range output")).toHaveText("1933");
  await fig.locator("svg text.sf-pickable", { hasText: "Tevhid-i Tedrisat" }).click();
  const card = fig.locator(".sf-pick-card");
  await expect(card).toContainText("3 Mart 1924");
  await expect(card).toContainText("Öğretim birliği");
  await expect(fig.getByRole("button", { name: "1924 · Tevhid-i Tedrisat" })).toHaveAttribute("aria-pressed", "true");
  await fig.getByRole("button", { name: "1934 · Kadın: milletvekili" }).focus();
  await page.keyboard.press("Enter");
  await expect(card).toContainText("5 Aralık 1934");
  await expect(card).toContainText("2025 AYT Sosyal Bilimler-2");
  await fig.getByRole("button", { name: "1934 · Kadın: milletvekili" }).click();
  await expect(card).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  const axe = await new AxeBuilder({ page }).include(`figure[data-section-figure="${TITLE}"]`).analyze();
  expect(axe.violations).toEqual([]);
});
