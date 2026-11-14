import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { samplePdf } from "./helpers/pdf";
test.use({ hasTouch: true, locale: "tr-TR" });
async function nav(page: Page, name: string) {
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
test("YKS-016 topic header opens the full local cheatsheet inline, keeps notes/page offline and leaves study progress untouched", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await rational(page);
  await expect(
    page
      .locator(".sidebar nav")
      .getByRole("button", { name: "Kopya Kağıtları", exact: true }),
  ).toHaveCount(0);
  const title = await page.locator(".study-title").boundingBox();
  const toggle = page.getByRole("button", {
    name: "Kopya Kağıdını Görüntüle",
    exact: true,
  });
  const button = await toggle.boundingBox();
  expect(button!.x).toBeGreaterThanOrEqual(title!.x + title!.width);
  await toggle.click();
  const sheet = page.getByRole("region", {
    name: "Rasyonel Sayılar kopya kağıdı",
    exact: true,
  });
  await sheet.getByLabel("Bu konunun kopya kağıdı PDF’si").setInputFiles({
    name: "private-notes.pdf",
    mimeType: "application/pdf",
    buffer: samplePdf(true),
  });
  await expect(sheet.locator("canvas")).toBeVisible();
  await sheet
    .getByRole("button", { name: "Sonraki sayfa", exact: true })
    .click();
  await expect(
    sheet.getByRole("spinbutton", { name: "PDF sayfası", exact: true }),
  ).toHaveValue("2");
  await sheet
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("Kağıt notum kaybolmasın.");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await context.setOffline(true);
  await page.reload();
  await page
    .getByRole("button", { name: "Kopya Kağıdını Görüntüle", exact: true })
    .click();
  await expect(sheet.locator("canvas")).toBeVisible();
  await expect(
    sheet.getByRole("spinbutton", { name: "PDF sayfası", exact: true }),
  ).toHaveValue("2");
  await expect(
    sheet.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("Kağıt notum kaybolmasın.");
  await sheet.getByLabel("Bu konunun kopya kağıdı PDF’si").setInputFiles({
    name: "invalid.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("not a pdf"),
  });
  await expect(sheet.getByRole("alert")).toContainText("PDF eklenemedi");
  await expect(sheet.locator("canvas")).toBeVisible();
  await nav(page, "Bugün");
  await expect(
    page.getByRole("region", { name: "Konu planı", exact: true }),
  ).toContainText("0/479");
  await expect(page.locator(".stat-number").first()).toHaveText("0");
});
test("YKS-016 guides explain steps and keep topic/question cards padded; completed practice offers actual OSYM references and rejects a wrong booklet", async ({
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
  await expect(
    archive.getByRole("link", {
      name: "ÖSYM’de soruyu aç (internet)",
      exact: true,
    }),
  ).toHaveAttribute("href", /tyt_yks_2021\.pdf#page=40$/);
  await archive
    .getByRole("button", {
      name: "Çevrimdışı kullanım için PDF’yi ekle",
      exact: true,
    })
    .click({ noWaitAfter: true });
  await archive.getByLabel("Doğrulanmış ÖSYM kitapçığı").setInputFiles({
    name: "wrong.pdf",
    mimeType: "application/pdf",
    buffer: samplePdf(),
  });
  await expect(archive.getByRole("alert")).toContainText("eşleşmiyor");
  await expect(
    archive.getByRole("button", { name: /Soruyu görüntüle/ }),
  ).toHaveCount(0);
  await archive.locator(".past-exam-reference summary").click();
  await expect(archive).toContainText("Doğrulanan cevap: A");
  await archive.getByLabel("Sınav", { exact: true }).selectOption("ALES");
  await expect(archive).toContainText("henüz doğrulanmış kayıt yok");
  await expect(page.locator(".result-stats")).toContainText("5/5");
});
test("YKS-016 inline sources and long explanations reflow at 320px, 200% UI and 150% text with touch, offline and no serious accessibility defects", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await nav(page, "Ayarlar");
  await page.getByLabel("Tema", { exact: true }).selectOption("light");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.getByRole("switch", { name: /Aion animasyonu/ }).uncheck();
  await page.setViewportSize({ width: 320, height: 844 });
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await rational(page);
  const toggle = page.getByRole("button", {
    name: "Kopya Kağıdını Görüntüle",
    exact: true,
  });
  const title = await page.locator(".study-title").boundingBox(),
    button = await toggle.boundingBox();
  expect(button!.y).toBeGreaterThanOrEqual(title!.y + title!.height);
  await toggle.tap();
  await expect(page.locator(".topic-cheatsheet")).toContainText(
    "henüz bu cihazda yok",
  );
  await toggle.tap();
  const example = page.locator(".worked-example").first();
  await example.locator("summary").tap();
  await example
    .getByRole("button", { name: "Çözümün tamamını göster", exact: true })
    .click();
  await expect(example.locator(".worked-conclusion")).toContainText("1/4");
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
