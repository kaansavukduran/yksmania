import { setThemePreference } from "./helpers/theme";
import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { expectGuideSections, guideSectionCount } from "./helpers/guidePages";
const ids = [
  "elementlerin-siniflandirilmasi",
  "atom-capi-karsilastirma",
  "iyonlasma-enerjisi",
  "elektron-ilgisi-elektronegatiflik",
];
test("four new lessons expose explanations, actual changing models and saved offline exploration", async ({
  page,
  context,
}) => {
  await page.goto("/");
  for (const id of ids) {
    await page.goto("/#/lesson?id=" + id);
    await expectGuideSections(page, 6);
    const lab = page.locator(".periodic-comparison");
    await expect(lab).toBeVisible();
    const first = await lab.getByLabel("İncelenecek durum").inputValue();
    await lab.getByLabel("İncelenecek durum").selectOption("1");
    expect(first).not.toBe("1");
    await lab
      .getByRole("button", { name: "Gerekçeyi göster", exact: true })
      .click();
    await expect(lab.getByRole("status")).toBeVisible();
    await expect(page.locator(".save-status")).toContainText(
      "Bu cihazda kaydedildi",
    );
  }
  await page.evaluate(async () => {
    await navigator.serviceWorker.ready;
    if (!navigator.serviceWorker.controller)
      await new Promise<void>((resolve) =>
        navigator.serviceWorker.addEventListener(
          "controllerchange",
          () => resolve(),
          { once: true },
        ),
      );
  });
  await expect
    .poll(() => page.evaluate(() => navigator.serviceWorker.controller?.state))
    .toBe("activated");
  await context.setOffline(true);
  await page.reload();
  const lab = page.locator(".periodic-comparison");
  await expect(lab.getByLabel("İncelenecek durum")).toHaveValue("1");
  await expect(lab.getByRole("status")).toContainText(
    "Gaz atomu elektron alır",
  );
  await page.goto("/#/lesson?id=atom-capi-karsilastirma");
  await expect(page.locator(".periodic-comparison circle")).toHaveCount(3);
  await page.locator(".periodic-comparison select").selectOption("2");
  await page
    .locator(".periodic-comparison")
    .getByRole("button", { name: "Gerekçeyi göster", exact: true })
    .click();
  await expect(
    page.locator(".periodic-comparison").getByRole("status"),
  ).toContainText("F⁻ > Na⁺ > Mg²⁺");
});
test("new comparison stays accessible with large text on a touch phone", async ({
  page,
}) => {
  await page.goto("/#/settings");
  await setThemePreference(page, "light");
  await page.getByLabel("Arayüz ölçeği %", { exact: true }).fill("200");
  await page.getByLabel("Yalnızca yazı boyutu %", { exact: true }).fill("150");
  await page.setViewportSize({ width: 320, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/lesson?id=iyonlasma-enerjisi");
  const lab = page.locator(".periodic-comparison");
  await lab.getByLabel("İncelenecek durum").selectOption("2");
  await expect(lab).toContainText("14850 kJ/mol");
  await lab
    .getByRole("button", { name: "Gerekçeyi göster", exact: true })
    .click();
  await expect(lab.getByRole("status")).toContainText(
    "değerlik elektron sayısı 2",
  );
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(321);
  const axe = await new AxeBuilder({ page }).analyze();
  expect(
    axe.violations.filter(
      (v) => v.impact === "serious" || v.impact === "critical",
    ),
  ).toEqual([]);
});
