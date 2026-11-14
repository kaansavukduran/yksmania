import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul", hasTouch: true });
const passage =
  "Bir kitabı bitirmek, onu anlamakla aynı şey değildir. Okur bazen bir sayfada durup kendi sorularını kurduğunda metinle daha güçlü bir ilişki kurar. Okumanın değeri, yalnız çevrilen sayfalarda değil, kurulan düşüncelerde de aranmalıdır.";
async function nav(page: Page, name: string) {
  await expect(page.locator(".sidebar")).toBeAttached();
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function paragraph(page: Page) {
  await nav(page, "Sorular");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  await page.getByRole("button", { name: /Türkçe.*22 konu/ }).click();
  await page
    .getByRole("button", { name: /Paragrafta ana düşünce.*5 özgün soru/ })
    .click();
  await expect(
    page.getByRole("heading", {
      name: "Metnin ana düşüncesi nedir?",
      exact: true,
    }),
  ).toBeVisible();
}
const textRegion = (page: Page) =>
  page.getByRole("region", { name: "Sorunun metni", exact: true });
test("YKS-015 all five paragraph questions carry their complete text when entered directly from Questions", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await paragraph(page);
  for (const [index, answer] of [0, 2, 0, 1, 0].entries()) {
    await expect(textRegion(page)).toHaveText(passage);
    const text = await textRegion(page).boundingBox(),
      question = await page.locator(".question-panel h2").boundingBox();
    expect(text!.y + text!.height).toBeLessThanOrEqual(question!.y);
    if (index === 0) {
      await page.getByRole("button", { name: "İpucu al", exact: true }).click();
      await expect(page.locator(".hint-box")).toContainText(
        "Metnin son cümlesi",
      );
      await page
        .getByRole("textbox", { name: "Notun", exact: true })
        .fill("Metin ve not birlikte korunmalı.");
    }
    await page.locator(".answer").nth(answer).click();
    await page
      .getByRole("button", { name: "Cevabı kontrol et", exact: true })
      .click();
    await expect(page.locator(".question-panel .feedback")).toContainText(
      "Doğru",
    );
    await expect(page.locator(".save-status")).toContainText(
      "Bu cihazda kaydedildi",
    );
    await page.reload();
    await expect(textRegion(page)).toHaveText(passage);
    await expect(
      page.getByRole("textbox", { name: "Notun", exact: true }),
    ).toHaveValue("Metin ve not birlikte korunmalı.");
    await page
      .getByRole("button", {
        name: index === 4 ? "Çalışmayı kaydet" : "Sonraki soru",
        exact: true,
      })
      .click();
  }
  await expect(page.locator(".result-stats")).toContainText("5/5");
  await page.reload();
  await expect(page.locator(".result-stats")).toContainText("5/5");
  await nav(page, "Sorular");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  await page.getByRole("button", { name: /Matematik.*31 konu/ }).click();
  await page
    .getByRole("button", { name: /Rasyonel sayılar.*5 özgün soru/ })
    .click();
  await expect(page.locator(".question-panel h2")).toHaveText(
    "Hangisi daha büyüktür?",
  );
  await expect(textRegion(page)).toHaveCount(0);
});
test("YKS-015 full passage wraps at 320px with large type, survives wrong answer and rotation, and keeps notes below", async ({
  page,
  context,
}) => {
  await page.setViewportSize({ width: 320, height: 900 });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Bugün", exact: true }),
  ).toBeVisible();
  await nav(page, "Ayarlar");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.getByLabel("Tema", { exact: true }).selectOption("light");
  await paragraph(page);
  await expect(textRegion(page)).toHaveText(passage);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
  const hasOwnScroll = await textRegion(page).evaluate(
    (el) =>
      el.scrollHeight > el.clientHeight + 1 ||
      el.scrollWidth > el.clientWidth + 1,
  );
  expect(hasOwnScroll).toBe(false);
  const panel = await page.locator(".question-panel").boundingBox(),
    note = await page.locator(".practice-note").boundingBox();
  expect(note!.y).toBeGreaterThanOrEqual(panel!.y + panel!.height);
  await page.locator(".answer").nth(1).tap();
  await page
    .getByRole("button", { name: "Cevabı kontrol et", exact: true })
    .tap();
  await expect(page.locator(".feedback.repair")).toBeVisible();
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator(".feedback.repair")).toBeVisible();
  await expect(textRegion(page)).toHaveText(passage);
  await page.setViewportSize({ width: 900, height: 320 });
  await page.setViewportSize({ width: 320, height: 900 });
  const result = await new AxeBuilder({ page })
    .include(".main-content")
    .analyze();
  expect(
    result.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact!),
    ),
  ).toEqual([]);
  await page.getByRole("button", { name: "Sonraki soru", exact: true }).tap();
  await expect(page.locator(".question-panel h2")).toHaveText(
    "Hangi sonuç metinden çıkarılamaz?",
  );
  await expect(textRegion(page)).toHaveText(passage);
});
