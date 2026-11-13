import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
async function open(page: Page) {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Bugün", exact: true }),
  ).toBeVisible();
}
async function start(page: Page) {
  await page
    .getByRole("button", { name: "Çalışmaya başla", exact: true })
    .click();
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
}
async function answer(page: Page, index: number, last = false) {
  await page.locator(".answer").nth(index).click();
  await page
    .getByRole("button", { name: "Cevabı kontrol et", exact: true })
    .click();
  await page
    .getByRole("button", {
      name: last ? "Çalışmayı kaydet" : "Sonraki soru",
      exact: true,
    })
    .click();
}
test.use({ locale: "tr-TR" });
test("turning off gamification hides world rewards and keeps learning usable", async ({
  page,
}) => {
  await open(page);
  await page.getByRole("button", { name: "Ayarlar", exact: true }).click();
  await page
    .getByRole("switch", { name: "Oyunlaştırma", exact: true })
    .uncheck();
  await page.getByRole("button", { name: "Dünyam", exact: true }).click();
  await expect(page.locator(".main-content")).toContainText(
    "Oyunlaştırma kapalı",
  );
  await expect(page.locator(".world-scene")).toHaveCount(0);
  await page.getByRole("button", { name: "Bugün", exact: true }).click();
  await start(page);
  await expect(page.locator(".answer")).toHaveCount(3);
});
function samplePdf() {
  const parts = ["%PDF-1.4\n"];
  const offsets = [0];
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 200] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  ];
  const stream = "BT /F1 16 Tf 20 100 Td (Local learning material) Tj ET";
  objects.push(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
  objects.forEach((object, i) => {
    offsets.push(Buffer.byteLength(parts.join("")));
    parts.push(`${i + 1} 0 obj\n${object}\nendobj\n`);
  });
  const xref = Buffer.byteLength(parts.join(""));
  parts.push(
    `xref\n0 6\n0000000000 65535 f \n${offsets
      .slice(1)
      .map((n) => String(n).padStart(10, "0") + " 00000 n \n")
      .join("")}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`,
  );
  return Buffer.from(parts.join(""));
}
test("local PDF opens for the first time offline and retains notes without learning credit", async ({
  page,
  context,
}) => {
  await open(page);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.getByRole("button", { name: "Kütüphane", exact: true }).click();
  await page.locator("input[type=file]").setInputFiles({
    name: "local-test.pdf",
    mimeType: "application/pdf",
    buffer: samplePdf(),
  });
  await expect(
    page.getByRole("button", { name: /local-test.pdf/ }).first(),
  ).toBeVisible();
  await context.setOffline(true);
  await page
    .getByRole("button", { name: /local-test.pdf/ })
    .first()
    .click();
  await expect(page.locator("canvas")).toBeVisible();
  await page.getByText("Sayfanın metni", { exact: true }).click();
  await expect(page.locator(".pdf-text")).toContainText(
    "Local learning material",
  );
  await page
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("PDF notum.");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.reload();
  await page
    .getByRole("button", { name: /local-test.pdf/ })
    .first()
    .click();
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("PDF notum.");
});
test("a failed terminal save retains the answer draft and never celebrates false success", async ({
  page,
}) => {
  await open(page);
  await start(page);
  for (const i of [1, 2, 0, 1]) await answer(page, i);
  await page.locator(".answer").nth(1).click();
  await page
    .getByRole("button", { name: "Cevabı kontrol et", exact: true })
    .click();
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.evaluate(() => {
    const store = IDBObjectStore.prototype;
    const original = store.put;
    store.put = function (...args: Parameters<IDBObjectStore["put"]>) {
      if ((window as any).__failSave && this.name === "state")
        throw new DOMException("Synthetic disk full", "QuotaExceededError");
      return original.apply(this, args);
    };
    (window as any).__failSave = true;
  });
  await page
    .getByRole("button", { name: "Çalışmayı kaydet", exact: true })
    .click();
  await expect(page.locator(".error-banner")).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Çalışmayı kaydet", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Bir adım daha ilerledin." }),
  ).toHaveCount(0);
  await page.evaluate(() => {
    (window as any).__failSave = false;
  });
  await page
    .getByRole("button", { name: "Çalışmayı kaydet", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Bir adım daha ilerledin." }),
  ).toBeVisible();
  await expect(page.locator(".result-stats")).toContainText("5/5");
});
test("real lesson → assisted error → saved history → calendar → undo", async ({
  page,
}) => {
  await open(page);
  await start(page);
  await page.getByRole("button", { name: "İpucu al", exact: true }).click();
  await answer(page, 0);
  await answer(page, 2);
  await answer(page, 0);
  await answer(page, 1);
  await answer(page, 1, true);
  await expect(
    page.getByRole("heading", { name: "Bir adım daha ilerledin." }),
  ).toBeVisible();
  await expect(page.locator(".result-stats")).toContainText("4/5");
  await expect(page.locator(".result-reviews>div")).toHaveCount(3);
  await page.reload();
  await expect(page.locator(".result-stats")).toContainText("4/5");
  await page.getByRole("button", { name: "Yanlışlarım", exact: true }).click();
  await expect(page.locator(".mistake-card")).toHaveCount(1);
  await page
    .getByRole("button", { name: "Çalışma geçmişi", exact: true })
    .click();
  page.once("dialog", (d) => d.accept());
  await page
    .getByRole("button", { name: "Bu oturumu geri al", exact: true })
    .click();
  await expect(page.locator(".history-row")).toHaveCount(0);
  await page.getByRole("button", { name: "Takvim", exact: true }).click();
  await expect(page.locator(".upcoming-panel")).toContainText(
    "Henüz çalışma kaydı yok",
  );
});
test("offline reload preserves a draft and supports completing it", async ({
  page,
  context,
}) => {
  await open(page);
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await page.reload();
  await start(page);
  await page
    .getByRole("textbox", { name: "Notun", exact: true })
    .fill("Çığ ve öğrenme: taslağım korunuyor.");
  await page.locator(".answer").nth(1).click();
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator(".answer.chosen")).toContainText("1/6");
  await expect(
    page.getByRole("textbox", { name: "Notun", exact: true }),
  ).toHaveValue("Çığ ve öğrenme: taslağım korunuyor.");
  await page
    .getByRole("button", { name: "Cevabı kontrol et", exact: true })
    .click();
  await page.getByRole("button", { name: "Sonraki soru", exact: true }).click();
  await answer(page, 2);
  await answer(page, 0);
  await answer(page, 1);
  await answer(page, 1, true);
  await expect(
    page.getByRole("heading", { name: "Bir adım daha ilerledin." }),
  ).toBeVisible();
});
test("settings stay independent at 200% scale, large text and English on a narrow screen", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await open(page);
  await page.getByRole("button", { name: "Menüyü aç", exact: true }).click();
  await page.getByRole("button", { name: "Ayarlar", exact: true }).click();
  await page.getByLabel("Yazı tipi", { exact: true }).selectOption("lexend");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("135");
  await expect(page.getByLabel("Arayüz ölçeği %", { exact: true })).toHaveValue(
    "135",
  );
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Dil", { exact: true }).selectOption("en");
  await expect(
    page.getByRole("heading", { name: "Settings", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByLabel("Text size only %", { exact: true }),
  ).toHaveValue("150");
  await expect(page.getByLabel("Font", { exact: true })).toHaveValue("lexend");
  await page.reload();
  await expect(
    page.getByLabel("Interface scale %", { exact: true }),
  ).toHaveValue("200");
  await expect(
    page.getByLabel("Text size only %", { exact: true }),
  ).toHaveValue("150");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "Open menu", exact: true }).click();
  await page.getByRole("button", { name: "Subjects", exact: true }).click();
  await page
    .getByRole("button", {
      name: "Start learning: Rational numbers",
      exact: true,
    })
    .click();
  await page
    .getByRole("button", { name: "Start questions", exact: true })
    .click();
  await expect(page.locator(".answer").first()).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Check answer", exact: true }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
});
test("blocked day is respected and settings survive reloading", async ({
  page,
}) => {
  await open(page);
  await page.getByRole("button", { name: "Takvim", exact: true }).click();
  await page
    .getByRole("button", {
      name: "Bu günün müsaitliğini değiştir",
      exact: true,
    })
    .click();
  await expect(page.locator(".calendar-day.selected")).toHaveClass(/closed/);
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.reload();
  await expect(page.locator(".calendar-day.selected")).toHaveClass(/closed/);
  await page.getByRole("button", { name: "Bugün", exact: true }).click();
  await expect(page.locator(".hero h2")).toHaveText(
    "Bugün kapalı günün. Dinlenme planın korunuyor.",
  );
  await expect(
    page.getByRole("button", { name: "Serbest çalışma seç", exact: true }),
  ).toBeVisible();
});
test("invalid backup preserves data and normal keyboard controls are reachable", async ({
  page,
}) => {
  await open(page);
  await page.getByRole("button", { name: "Ayarlar", exact: true }).click();
  await page.getByLabel("Yazı tipi", { exact: true }).selectOption("lexend");
  await page.locator("input[type=file]").setInputFiles({
    name: "bad.json",
    mimeType: "application/json",
    buffer: Buffer.from("{broken"),
  });
  await expect(
    page.getByRole("status").filter({ hasText: "Yedek doğrulanamadı" }),
  ).toBeVisible();
  await expect(page.getByLabel("Yazı tipi", { exact: true })).toHaveValue(
    "lexend",
  );
  await page.getByLabel("Arayüz ölçeği", { exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByLabel("Arayüz ölçeği %", { exact: true })).toHaveValue(
    "105",
  );
});
test("homepage and question flow have no serious accessibility violations", async ({
  page,
}) => {
  await open(page);
  const home = await new AxeBuilder({ page }).analyze();
  expect(
    home.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
  await start(page);
  const study = await new AxeBuilder({ page }).analyze();
  expect(
    study.violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
});
