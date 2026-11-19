import { setThemePreference } from "./helpers/theme";
import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { expectGuideSections, guideSectionCount } from "./helpers/guidePages";
test.use({ locale: "tr-TR", hasTouch: true });
const title = "Çarpanlara ayırma";
async function nav(page: Page, name: string) {
  const menu = page.getByRole("button", { name: "Menüyü aç", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page
    .locator(".sidebar")
    .getByRole("button", { name, exact: true })
    .click();
}
async function open(page: Page) {
  await nav(page, "Konu Anlatımı");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill("Çarpanlara ayırma");
  await page.locator(".ready-topic").filter({ hasText: title }).first().click();
  await expect(page.locator(".study-title h1")).toContainText(title);
  await expect(page.locator(".factorization-lab")).toBeVisible();
}
test("factorization pieces preserve area, signed factors preserve coefficients and offline exploration has no completion credit", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await open(page);
  expect(await guideSectionCount(page)).toBeGreaterThanOrEqual(
    12,
  );
  const lab = page.locator(".factorization-lab");
  await lab
    .getByRole("button", { name: "İki parantezin çarpımı", exact: true })
    .tap();
  await lab
    .getByRole("slider", { name: "İlk parantezin sabiti p", exact: true })
    .fill("-4");
  await lab
    .getByRole("slider", { name: "İkinci parantezin sabiti q", exact: true })
    .fill("3");
  await expect(lab.locator(".math-expression")).toHaveText(
    "x²−x−12=(x−4)·(x+3)",
  );
  await expect(
    lab.getByLabel("İşaretli cebir tablosu", { exact: true }),
  ).toContainText("Negatif sayılar uzunluk olarak çizilmiyor");
  await expect(lab.getByRole("status")).toContainText(
    "açılmış biçim -6, çarpım biçimi -6",
  );
  await lab.getByRole("button", { name: "İki kare farkı", exact: true }).tap();
  const piece = lab.locator(".geometry-piece");
  const areaBefore = await piece.locator("rect").evaluate((r) => {
    const box = (r as SVGGraphicsElement).getBBox();
    return box.width * box.height;
  });
  await lab
    .getByRole("button", { name: "Parçaları birleştir", exact: true })
    .tap();
  await expect
    .poll(() => piece.evaluate((e) => getComputedStyle(e).transform))
    .toContain("matrix(0, -1, 1, 0");
  const areaAfter = await piece.locator("rect").evaluate((r) => {
    const box = (r as SVGGraphicsElement).getBBox();
    return box.width * box.height;
  });
  expect(areaAfter).toBeCloseTo(areaBefore, 8);
  await expect(lab.getByRole("status")).toContainText("36−4=32");
  await expect(page.locator(".save-status")).toContainText(
    "Bu cihazda kaydedildi",
  );
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
  });
  await context.setOffline(true);
  await page.reload();
  await expect(
    lab.getByRole("button", { name: "İki kare farkı", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await expect(lab.getByRole("status")).toContainText("2. adım");
  await nav(page, "Ayarlar");
  await setThemePreference(page, "light");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.getByRole("switch", { name: /Aion animasyonu/ }).uncheck();
  await page.setViewportSize({ width: 320, height: 844 });
  await open(page);
  await lab.getByRole("button", { name: "Baştan incele", exact: true }).tap();
  await lab
    .getByRole("button", { name: "Parçaları birleştir", exact: true })
    .tap();
  expect(
    await piece.evaluate((e) => getComputedStyle(e).transitionDuration),
  ).toBe("0s");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth + 1,
    ),
  ).toBe(true);
  expect(
    (
      await new AxeBuilder({ page }).include(".factorization-lab").analyze()
    ).violations.filter((v) =>
      ["serious", "critical"].includes(v.impact ?? ""),
    ),
  ).toEqual([]);
  await nav(page, "Bugün");
  await expect(page.locator(".stat-number").first()).toHaveText("0");
});
test("factorization presents full independent question prompts, shows explanatory feedback and saves an actual ten-question result", async ({
  page,
}) => {
  await page.goto("/");
  await nav(page, "Sorular");
  await page
    .getByRole("textbox", { name: "Ders veya konu ara", exact: true })
    .fill("Çarpanlara ayırma: ileri alıştırmalar");
  await page
    .getByRole("button", { name: /Çarpanlara ayırma: ileri alıştırmalar/ })
    .click();
  await expect(page.locator(".question-panel")).toBeVisible();
  for (const [i, index] of [0, 2, 3, 1, 4, 2, 0, 3, 0, 1].entries()) {
    await expect(page.locator(".question-panel h2")).not.toHaveText("");
    await expect(page.locator(".answer")).toHaveCount(5);
    await page.locator(".answer").nth(index).tap();
    await page
      .getByRole("button", { name: "Cevabı kontrol et", exact: true })
      .tap();
    await expect(page.locator(".feedback p")).not.toHaveText("");
    if (i === 6) await expect(page.locator(".feedback")).toContainText("x≠5");
    if (i === 8) await expect(page.locator(".feedback")).toContainText("53");
    await page
      .getByRole("button", {
        name: i === 9 ? "Çalışmayı kaydet" : "Sonraki soru",
        exact: true,
      })
      .tap();
  }
  await expect(page.locator(".result-stats")).toContainText("10/10");
  await page.reload();
  await expect(page.locator(".result-stats")).toContainText("10/10");
});
