import { setThemePreference } from "./helpers/theme";
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test.use({ hasTouch: true, locale: "tr-TR" });
async function nav(page: Page, name: string) {
  await expect(page.locator(".sidebar")).toBeAttached();
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function rational(page: Page) {
  await nav(page, "Konu Anlatımı");
  await page.getByRole("button", { name: /Matematik.*31/ }).click();
  await page.getByRole("button", { name: /Rasyonel sayılar.*45/ }).click();
  await expect(
    page.getByRole("heading", { name: "Rasyonel sayılar", exact: true }),
  ).toBeVisible();
}
test("YKS-016 full-width theory and separate ready cheatsheets retain notes offline without learning credit", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await rational(page);
  await expect(
    page.locator(".topic-cheatsheet,.cheatsheet-toggle"),
  ).toHaveCount(0);
  await nav(page, "Kopya Kağıtları");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill("Rasyonel Sayılar");
  await page
    .locator(".cheatsheet-topic")
    .filter({ has: page.getByText("Rasyonel Sayılar", { exact: true }) })
    .click();
  const sheet = page.getByRole("region", {
    name: "Rasyonel Sayılar kopya kağıdı",
    exact: true,
  });
  await expect(sheet).toContainText(/payda/i);
  await sheet
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("Kağıt notum kaybolmasın.");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await context.setOffline(true);
  await page.reload();
  await nav(page, "Kopya Kağıtları");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill("Rasyonel Sayılar");
  await page
    .locator(".cheatsheet-topic")
    .filter({ has: page.getByText("Rasyonel Sayılar", { exact: true }) })
    .click();
  await expect(
    sheet.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("Kağıt notum kaybolmasın.");
  await expect(page.locator('input[accept*="pdf"]')).toHaveCount(0);
  await nav(page, "Bugün");
  await expect(
    page.getByRole("region", { name: "Konu planı", exact: true }),
  ).toContainText("0/500");
  await expect(page.locator(".stat-number").first()).toHaveText("0");
});
test("YKS-016 guides explain steps and keep topic/question cards padded; completed practice offers verified OSYM references without material imports", async ({
  page,
}) => {
  await page.goto("/");
  await rational(page);
  const example = page.locator(".worked-example").filter({
    has: page.locator("summary", { hasText: "Negatiflerin arasındaki sayı" }),
  });
  await example.locator("summary").click();
  await example
    .getByRole("button", { name: "İlk adımı göster", exact: true })
    .click();
  await expect(example.locator(".worked-steps li")).toHaveCount(1);
  await example
    .getByRole("button", { name: "Sonraki adım", exact: true })
    .click();
  await example
    .getByRole("button", { name: "Sonraki adım", exact: true })
    .click();
  await expect(example.locator(".worked-conclusion")).toContainText("−19/30");
  await example
    .getByRole("button", { name: "Baştan izle", exact: true })
    .click();
  await expect(example.locator(".worked-steps li")).toHaveCount(0);
  await nav(page, "Bugün");
  await page
    .getByRole("region", { name: "Soru planı", exact: true })
    .getByRole("button", { name: /Kimyanın sembolik dili/ })
    .click();
  const panel = await page.locator(".topic-study").boundingBox();
  const heading = await page.locator(".topic-study > h2").boundingBox();
  expect(heading!.x - panel!.x).toBeGreaterThanOrEqual(18);
  expect(heading!.y - panel!.y).toBeGreaterThanOrEqual(18);
  const row = page.locator(".topic-study .ready-topic").first();
  const bounds = await row.boundingBox();
  expect(
    panel!.x + panel!.width - bounds!.x - bounds!.width,
  ).toBeGreaterThanOrEqual(18);
  await row.click();
  for (const [i, answer] of [0, 2, 1, 0, 1].entries()) {
    await page.locator(".answer").nth(answer).click();
    await page
      .getByRole("button", { name: "Cevabı kontrol et", exact: true })
      .click();
    await page
      .getByRole("button", {
        name: i === 4 ? "Çalışmayı kaydet" : "Sonraki soru",
        exact: true,
      })
      .click();
  }
  await expect(page.locator(".result-stats")).toContainText("5/5");
  const archive = page.getByRole("region", {
    name: "Bu konunun geçmiş ÖSYM soruları",
    exact: true,
  });
  await expect(archive).toContainText("2021 TYT · Fen Bilimleri · Soru 8");
  await archive.locator(".past-exam-reference summary").click();
  await expect(
    archive.getByRole("link", {
      name: "Resmî kaynak kaydı (internet)",
      exact: true,
    }),
  ).toHaveAttribute("href", /tyt_yks_2021\.pdf#page=40$/);
  await expect(archive.locator('input[type="file"]')).toHaveCount(0);
  await expect(archive.getByRole("button", { name: /PDF.*ekle/ })).toHaveCount(
    0,
  );
  await expect(archive).toContainText("Resmî cevap: A");
  const teaching = archive.locator(".exam-teaching-case").first();
  await expect(teaching.locator(".example-prompt")).not.toBeEmpty();
  await teaching
    .getByRole("button", { name: "Çözümü adım adım aç", exact: true })
    .click();
  await expect(teaching.locator("ol li")).toHaveCount(1);
  await archive.getByLabel("Sınav", { exact: true }).selectOption("ALES");
  await expect(archive).toContainText(
    "Bu seçim için sınav bağlantıları hazırlanıyor",
  );
  await expect(page.locator(".result-stats")).toContainText("5/5");
});
test("YKS-016 native sheets and long explanations reflow at 320px, 200% UI and 150% text with touch, offline and no serious accessibility defects", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await nav(page, "Ayarlar");
  await setThemePreference(page, "light");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.getByRole("switch", { name: /Aion animasyonu/ }).uncheck();
  await page.setViewportSize({ width: 320, height: 844 });
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await rational(page);
  await expect(
    page.locator(".topic-cheatsheet,.cheatsheet-toggle"),
  ).toHaveCount(0);
  const example = page.locator(".worked-example").first();
  await example.locator("summary").tap();
  await example
    .getByRole("button", { name: "Çözümün tamamını göster", exact: true })
    .click();
  await expect(example.locator(".worked-conclusion")).toContainText("1/4");
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(321);
  await nav(page, "Kopya Kağıtları");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill("Rasyonel Sayılar");
  await page
    .locator(".cheatsheet-topic")
    .filter({ has: page.getByText("Rasyonel Sayılar", { exact: true }) })
    .tap();
  await expect(page.locator(".cheat-reader")).toContainText(/payda/i);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(321);
  const scan = await new AxeBuilder({ page }).include("main").analyze();
  expect(
    scan.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
});

test("guided study advances meaningful sections, keeps its place and notes offline, and never awards completion for paging", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await rational(page);
  const sections = page.locator(".guide-section");
  const fullCount = await sections.count();
  expect(fullCount).toBeGreaterThanOrEqual(6);
  const firstTitle = await sections.first().locator(":scope > h2").innerText();
  await page
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("Konu notum adımlarla korunmalı.");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page
    .getByRole("button", { name: "Adım adım çalış", exact: true })
    .click();
  await expect(sections).toHaveCount(1);
  await expect(sections.locator(":scope > h2")).toHaveText(firstTitle);
  await page
    .getByRole("button", { name: "Sonraki bölüm", exact: true })
    .click();
  await expect(sections.locator(":scope > h2")).not.toHaveText(firstTitle);
  await expect(sections.locator(":scope > h2")).toBeFocused();
  await expect(page.locator(".visual-lab")).toHaveCount(1);
  await page.getByRole("slider", { name: /^Payda:/ }).fill("3");
  await expect(page.locator(".area-result")).toContainText("1/3 ≈ 0,333");
  await page
    .getByRole("button", { name: "Sonraki bölüm", exact: true })
    .click();
  const savedTitle = await sections.locator(":scope > h2").innerText();
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await context.setOffline(true);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Adım adım çalış", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(sections).toHaveCount(1);
  await expect(sections.locator(":scope > h2")).toHaveText(savedTitle);
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("Konu notum adımlarla korunmalı.");
  await page.getByRole("button", { name: "Önceki bölüm", exact: true }).click();
  await expect(page.locator(".area-result")).toContainText("1/3 ≈ 0,333");
  await page.getByRole("button", { name: "Tüm anlatım", exact: true }).click();
  await expect(sections).toHaveCount(fullCount);
  await nav(page, "Bugün");
  await expect(page.locator(".stat-number").first()).toHaveText("0");
  await expect(
    page.getByRole("region", { name: "Konu planı", exact: true }),
  ).toContainText("0/500");
});
