import { expect, test, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import type { AppState } from "../../src/domain/model";
import { typeset } from "../../src/domain/typeset";
import { openGuidePage } from "./helpers/guidePages";
import { registerOfflineBootDiagnostics } from "./helpers/offlineBootDiagnostics";
import { svgLayoutAudit } from "./helpers/svgAudit";
import { setThemePreference } from "./helpers/theme";

registerOfflineBootDiagnostics();
test.use({ locale: "tr-TR", timezoneId: "Europe/Istanbul", hasTouch: true });

const lessonId = "bilimsel-gosterim-katsayi";
const topicName = "Bilimsel Gösterim ve Katsayı";
const diagramTitle = "Birbirini izleyen büyütmeleri çarp";
const answers = [
  "7,2×10⁻⁵", "4,8×10⁷", "−1×10⁴", "2,4×10³", "3,9×10⁵",
  "4×10⁴", "a>b", "3,2×10³", "a<b", "0,00000064",
  "3,2×10⁸", "B < A < C", "1×10¹⁰ bayt", "568 m", "0,48 mm",
  "4×10⁴ = 0,4×10⁵ yaz. Sonuçlar 2,4×10⁵ ve 3,7×10⁵.", "1×10⁻⁴ m",
];

async function navigate(page: Page, name: string) {
  const toggle = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await toggle.isVisible()) await toggle.click();
  await page.locator(".sidebar").getByRole("button", { name, exact: true }).click();
}

async function openGuide(page: Page) {
  await navigate(page, "Konu Anlatımı");
  await page.getByRole("button", { name: "TYT", exact: true }).click();
  await page.getByRole("textbox", { name: "Ders veya konu ara", exact: true }).fill(topicName);
  await page.locator(".ready-topic").filter({ hasText: /Bilimsel gösterim ve katsayı/i }).click();
  await expect(page.getByRole("navigation", { name: "Anlatım içeriği", exact: true })).toBeVisible();
}

async function offlineReady(page: Page) {
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller) {
      await new Promise<void>((resolve) => {
        navigator.serviceWorker.addEventListener("controllerchange", () => resolve(), { once: true });
      });
    }
  });
}

async function stored(page: Page) {
  return page.evaluate(() => new Promise<AppState>((resolve, reject) => {
    const open = indexedDB.open("yksmania");
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const db = open.result;
      const read = db.transaction("state").objectStore("state").get("current");
      read.onerror = () => { db.close(); reject(read.error); };
      read.onsuccess = () => { db.close(); resolve(read.result); };
    };
  }));
}

test("the two-stage figure and the separate summary work on a narrow offline screen without learning credit", async ({ page, context }) => {
  test.setTimeout(100_000);
  await page.goto("/");
  await navigate(page, "Ayarlar");
  await setThemePreference(page, "light");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await offlineReady(page);
  await context.setOffline(true);
  const before = await stored(page);
  await openGuide(page);
  await openGuidePage(page, diagramTitle);
  const diagram = page.locator(`figure[data-section-figure="${diagramTitle}"]`);
  await expect(diagram).toContainText("0,4 mm");
  const factor = diagram.getByRole("slider", { name: /İkinci büyütme/ });
  await factor.focus();
  await factor.press("End");
  await expect(diagram).toContainText("5 × 40 = 200 kat");
  await expect(diagram.locator("svg text").filter({ hasText: "0,64 mm" })).toBeVisible();
  const audit = await page.evaluate(svgLayoutAudit, { figuresOnly: true, explore: true });
  expect(audit.issues).toEqual([]);
  expect((await new AxeBuilder({ page }).include("figure.section-figure").analyze()).violations).toEqual([]);

  await navigate(page, "Kopya Kağıtları");
  await page.getByRole("textbox", { name: "Ders veya konu ara", exact: true }).fill(topicName);
  await page.getByRole("button", { name: topicName, exact: true }).click();
  const reader = page.locator(".cheat-reader");
  const methods = reader.getByRole("group", { name: "Bir çözüm yolunu seçmeden önce koşulunu ara karşılaştırması" });
  await expect(methods.getByText("Geçerli yol", { exact: true })).toHaveCount(6);
  const note = reader.getByRole("textbox", { name: "Notun", exact: true });
  await note.fill("İkinci büyütme ilk görüntüye uygulanır.");
  await expect(page.locator(".save-status")).toContainText("Bu cihazda kaydedildi");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  await page.reload();
  await expect(note).toHaveValue("İkinci büyütme ilk görüntüye uygulanır.");
  const after = await stored(page);
  expect(after.sessions).toEqual(before.sessions);
  expect(after.reviews).toEqual(before.reviews);
  expect(after.topicProgress).toEqual(before.topicProgress);
  expect(after.unlocked).toEqual(before.unlocked);
});

test("saved practice includes all seven new cards and reveals the verified 2021 source without extra credit", async ({ page, context }) => {
  test.setTimeout(120_000);
  await page.goto("/");
  await offlineReady(page);
  await context.setOffline(true);
  await openGuide(page);
  await page.getByRole("button", { name: "Sorulara geç", exact: true }).click();
  for (const [index, answer] of answers.entries()) {
    if (index === 10) {
      await expect(page.locator(".question-prompt")).toContainText("6,4");
      await page.locator(".help-next").click();
      await expect.poll(async () => (await stored(page)).draft?.helpLevel).toBe(1);
      await page.reload();
      await expect.poll(async () => (await stored(page)).draft?.responses.length).toBe(index);
    }
    await page.locator(".answer").filter({
      has: page.getByText(typeset(answer), { exact: true }),
    }).click();
    await page.getByRole("button", { name: "Cevabı kontrol et", exact: true }).click();
    await expect(page.locator(".feedback.correct")).toBeVisible();
    await page.getByRole("button", {
      name: index === answers.length - 1 ? "Çalışmayı kaydet" : "Sonraki soru",
      exact: true,
    }).click();
  }
  await expect(page.locator(".result-stats > div strong")).toHaveText(["17/17", "16/17", "1"]);
  const result = await stored(page);
  const session = result.sessions.at(-1)!;
  expect(session.lessonId).toBe(lessonId);
  expect(session.responses.map(({ questionId }) => questionId)).toEqual([
    ...Array.from({ length: 10 }, (_, i) => `${lessonId}-093-${i + 1}`),
    ...["bolum", "sirala", "sinir", "birim", "iki-carpan", "onarim", "alt-sinir"].map((key) => `${lessonId}-014-${key}`),
  ]);
  expect(session.responses.filter(({ assisted }) => assisted).map(({ questionId }) => questionId)).toEqual([`${lessonId}-014-bolum`]);
  const source = page.locator(".past-exam-reference").filter({ hasText: "2021 TYT · Temel Matematik · Soru 3" });
  await source.getByRole("button", { name: "Çözümü adım adım aç", exact: true }).click();
  for (let i = 0; i < 2; i++) {
    await source.getByRole("button", { name: "Sonraki çözüm adımı", exact: true }).click();
  }
  await expect(source.locator(".worked-conclusion")).toContainText("0,48 mm");
  await source.locator("summary").click();
  await expect(source).toContainText("Resmî cevap: D");
  await expect(source.getByRole("link", { name: /Resmî kaynak kaydı/ })).toHaveAttribute("href", /tyt_yks_2021\.pdf#page=26$/);
  expect((await stored(page)).sessions).toEqual(result.sessions);
});
