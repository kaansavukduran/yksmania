import { expect, type Locator } from "@playwright/test";
import { forge023Case, setRange } from "./forge023-case-helper";
import { forge023MathLessons } from "../../src/learning/forge023Math";
async function predict(lab: Locator, guess: string, reason: string) {
  await lab
    .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
    .selectOption(guess);
  await lab
    .getByRole("textbox", { name: "Modelden gerekçen", exact: true })
    .fill(reason);
  await lab.getByRole("button", { name: "Kanıtı gör", exact: true }).click();
  await expect(lab.locator(".math023-feedback")).toContainText(
    "Tahminin bu koşullarla uyumlu.",
  );
}
const lesson = (
  id: string,
  act: Parameters<typeof forge023Case>[3],
  assertion: Parameters<typeof forge023Case>[4],
) =>
  forge023Case(forge023MathLessons, id, `forge023-math:${id}`, act, assertion);
export const math023Cases = [
  lesson(
    "ayt-toplam-fark-yarim-aci",
    async (_page, lab) => {
      await setRange(lab, "A açısı", 30);
      await setRange(lab, "B açısı", 60);
      await predict(
        lab,
        "positive",
        "30°+60°=90°; sinüs 1, kosinüs 0. Yarım açı 45° ve iki oranı da pozitif.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-angle-result]")).toHaveText("90°");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Sinüs: 1.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Tanjant: Tanımsız",
      );
      expect(
        Number(
          await lab.locator("[data-final-angle-point]").getAttribute("cy"),
        ),
      ).toBeCloseTo(68, 10);
    },
  ),
  lesson(
    "ayt-trigonometrik-denklemler",
    async (_page, lab) => {
      await setRange(lab, "Hedef C", 0);
      await setRange(lab, "Frekans k", 2);
      await lab
        .getByRole("checkbox", { name: "360° ucunu dahil et", exact: true })
        .check();
      await predict(
        lab,
        "many",
        "Sin2x sıfırları 0°,90°,180°,270°,360°; sağ uç kapalı olduğu için beş farklı kök.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-wave-result]")).toContainText(
        "5 farklı kök: 0°; 90°; 180°; 270°; 360°.",
      );
      await expect(lab.locator("[data-wave-root]")).toHaveCount(5);
      expect(
        Number(await lab.locator('[data-wave-root="360"]').getAttribute("cx")),
      ).toBeCloseTo(328, 10);
    },
  ),
  lesson(
    "ayt-logaritma",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Taban", exact: true })
        .selectOption("0.5");
      await setRange(lab, "Seçili x", 4);
      await predict(
        lab,
        "defined",
        "İç 4 pozitiftir. (1/2)^−2=4 olduğundan logaritma −2; ters hesap yeniden 4 verir.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-log-result]")).toContainText("f(4)≈-2");
      await expect(lab.locator("[data-log-result]")).toContainText("≈4.");
      expect(
        Number(await lab.locator("[data-log-point]").getAttribute("cy")),
      ).toBeCloseTo(312 - (5 / 14) * 264, 10);
    },
  ),
  lesson(
    "ayt-diziler",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Kural", exact: true })
        .selectOption("geometric");
      await setRange(lab, "Ortak çarpan", 2);
      await setRange(lab, "Terim sayısı", 4);
      await predict(
        lab,
        "up",
        "2,4,8,16 gösterilen dört terimdir; her biri öncekinden büyük. Toplam 30, son terim 16.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-sequence-result]")).toContainText(
        "4. terim: 16. İlk 4 terim toplamı: 30.",
      );
      await expect(lab.locator("[data-sequence-point]")).toHaveCount(4);
      await expect(lab.locator('[data-sequence-point="4"]')).toHaveAttribute(
        "data-value",
        "16",
      );
    },
  ),
  lesson(
    "ayt-limit-sureklilik",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Model", exact: true })
        .selectOption("hole");
      await setRange(lab, "Hedef a", 2);
      await setRange(lab, "Nokta değeri", 1);
      await setRange(lab, "Yaklaşım adımı", 3);
      await predict(
        lab,
        "limit",
        "Çevrede x+2 iki yandan 4’e yaklaşır; f(2)=1 farklıdır. Limit var, noktada sürekli değil.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-limit-result]")).toHaveText(
        "Ortak limit 4. Noktada sürekli değil.",
      );
      expect(
        Number(await lab.locator('[data-limit-value="1"]').getAttribute("cy")),
      ).toBeCloseTo(312 - (8 / 14) * 264, 10);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "(1,999; 3,999)",
      );
    },
  ),
];
