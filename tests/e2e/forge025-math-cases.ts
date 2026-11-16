import { expect, type Locator } from "@playwright/test";
import { forge025Case, setRange } from "./forge025-case-helper";
import { forge025MathLessons } from "../../src/learning/forge025Math";
async function predict(lab: Locator, guess: string, reason: string) {
  await lab
    .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
    .selectOption(guess);
  await lab
    .getByRole("textbox", { name: "Modelden gerekçen", exact: true })
    .fill(reason);
  await lab.getByRole("button", { name: "Kanıtı gör", exact: true }).click();
  await expect(lab.locator(".math025-feedback")).toContainText(
    "Tahminin bu koşullarla uyumlu.",
  );
}
const lesson = (
  id: string,
  act: Parameters<typeof forge025Case>[3],
  assert: Parameters<typeof forge025Case>[4],
) => forge025Case(forge025MathLessons, id, `forge025-math:${id}`, act, assert);
export const math025Cases = [
  lesson(
    "ayt-belirsiz-integral",
    async (_page, lab) => {
      await setRange(lab, "Serbest sabit K", 3);
      await setRange(lab, "Seçili x", 2);
      await predict(
        lab,
        "matches",
        "Başlangıç apsisi 0’da polinom kısmı 0; F(0)=3 koşulu K=3 seçer. Türev yine x²−1.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-family-result]")).toHaveText(
        "x=2, K=3 için F(x)=3,666667; F′(x)=f(x)=3.",
      );
      await expect(lab.locator("[data-constant-result]")).toContainText(
        "koşulunu sağlayan K=3",
      );
      await expect(lab.locator("[data-family-point]")).toHaveCount(1);
    },
  ),
  lesson(
    "ayt-belirli-integral",
    async (_page, lab) => {
      await setRange(lab, "Üst sınır", 1);
      await predict(
        lab,
        "zero",
        "x²−1’in −2’den 1’e pozitif ve negatif katkıları eşit; net integral 0 olsa da alan var.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-definite-result]")).toHaveText(
        "∫ alt -2, üst 1: 0. Yön: artan sınırlar.",
      );
      await expect(lab.locator("[data-accumulation-result]")).toHaveText(
        "Ara x=0: ilk birikim 0,666667, kalan -0,666667; toplam 0.",
      );
    },
  ),
  lesson(
    "ayt-alan-riemann",
    async (_page, lab) => {
      await setRange(lab, "Dikdörtgen sayısı", 8);
      await predict(
        lab,
        "greater",
        "Fark x²−1, −1 ve 1’de işaret değiştirir; alan parçaları toplanırken net integralde iptal var.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-area-result]")).toHaveText(
        "Net integral 1,333333; geometrik alan 4.",
      );
      await expect(lab.locator("[data-riemann-result]")).toHaveText(
        "8 dikdörtgen, genişlik 0,5. Seçili toplam 1,25; toplam − gerçek integral -0,083333.",
      );
      await expect(lab.locator("[data-riemann-rectangle]")).toHaveCount(8);
      await expect(lab.locator("[data-area-root]")).toHaveCount(2);
      await lab.getByText("Dikdörtgen verilerini aç", { exact: true }).click();
      await expect(lab.locator(".math025-details li")).toHaveCount(8);
    },
  ),
];
