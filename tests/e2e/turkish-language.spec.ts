import { setThemePreference } from "./helpers/theme";
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test.use({ hasTouch: true, locale: "tr-TR" });
async function nav(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function open(page: Page, title: string) {
  await nav(page, "Konu Anlatımı");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill(title);
  await page.locator(".ready-topic").filter({ hasText: title }).click();
  await expect(page.locator(".study-title h1")).toContainText(title);
}
test("Turkish sound changes and morphemes use real selected examples and retain the learning steps offline without false credit", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await open(page, "Ses bilgisi:");
  const sound = page.locator(".sound-lab");
  await sound
    .getByRole("combobox", { name: "Ses örneği", exact: true })
    .selectOption("1");
  await sound
    .getByRole("combobox", { name: "Beklediğin ses olayı", exact: true })
    .selectOption("Benzeşme");
  await sound
    .getByRole("button", { name: "Kanıtla karşılaştır", exact: true })
    .click();
  await expect(sound.locator(".language-feedback")).toContainText("örtüşüyor");
  await expect(sound.locator(".language-result")).toContainText("kitapta");
  await sound
    .getByRole("combobox", { name: "Ses örneği", exact: true })
    .selectOption("3");
  await sound
    .getByRole("combobox", { name: "Beklediğin ses olayı", exact: true })
    .selectOption("Ünlü daralması");
  await sound
    .getByRole("button", { name: "Kanıtla karşılaştır", exact: true })
    .click();
  await expect(sound.locator(".language-feedback")).toContainText(
    "Ünlü düşmesi",
  );
  await open(page, "Sözcükte yapı:");
  const morphology = page.locator(".structure-lab");
  await expect(morphology.locator(".language-result")).toContainText(
    "0 yapım · 3 çekim · Basit",
  );
  await morphology
    .getByRole("button", { name: "Bir yapım eki ekle: -siz", exact: true })
    .click();
  await expect(morphology.locator(".language-result")).toContainText(
    "1 yapım · 3 çekim · Türemiş",
  );
  await morphology
    .getByRole("combobox", { name: "Yapı örneği", exact: true })
    .selectOption("5");
  await morphology.locator("button.morph-piece").nth(3).click();
  await expect(morphology.locator(".language-result")).toContainText(
    "belirtme hâli",
  );
  await morphology
    .getByRole("button", { name: "Sözcüğü birleştir", exact: true })
    .click();
  await expect(morphology.locator(".language-word")).toHaveText("kitabını");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(morphology.locator(".language-word")).toHaveText("kitabını");
  await expect(morphology.locator(".language-result")).toContainText(
    "belirtme hâli",
  );
  await nav(page, "Bugün");
  await expect(page.locator(".stat-number").first()).toHaveText("0");
});
test("Turkish word pieces remain readable with large text, keyboard and touch", async ({
  page,
}) => {
  await page.goto("/");
  await nav(page, "Ayarlar");
  await setThemePreference(page, "light");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.setViewportSize({ width: 320, height: 844 });
  await open(page, "Sözcükte yapı:");
  const lab = page.locator(".structure-lab");
  await lab
    .getByRole("combobox", { name: "Yapı örneği", exact: true })
    .selectOption("2");
  await lab.getByRole("button", { name: "Sonraki parça", exact: true }).tap();
  await expect(lab.locator(".language-result")).toContainText("ilk gövde");
  await lab
    .getByRole("button", { name: "Sözcüğü birleştir", exact: true })
    .tap();
  await expect(lab.locator(".language-word")).toHaveText("gözlükçülerimizden");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
  expect(
    (
      await new AxeBuilder({ page }).include("main").analyze()
    ).violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
});

test("the complete ten-item sound set saves an actual ten-of-ten result through Questions", async ({
  page,
}) => {
  await page.goto("/");
  await nav(page, "Sorular");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill("Ses bilgisi:");
  await page
    .locator(".ready-topic")
    .filter({ hasText: "Ses bilgisi:" })
    .click();
  await expect(page.locator(".question-panel")).toBeVisible();
  const answers = [1, 3, 0, 4, 2, 3, 0, 2, 4, 1];
  for (const [i, answer] of answers.entries()) {
    await expect(page.locator(".question-panel")).toContainText(
      `Soru ${i + 1} / 10`,
    );
    await page.locator(".answer").nth(answer).click();
    await page
      .getByRole("button", { name: "Cevabı kontrol et", exact: true })
      .click();
    await page
      .getByRole("button", {
        name: i === 9 ? "Çalışmayı kaydet" : "Sonraki soru",
        exact: true,
      })
      .click();
  }
  await expect(page.locator(".result-stats")).toContainText("10/10");
  await page.reload();
  await expect(page.locator(".result-stats")).toContainText("10/10");
  await nav(page, "Bugün");
  await expect(page.locator(".stat-number").first()).toHaveText("1");
});
