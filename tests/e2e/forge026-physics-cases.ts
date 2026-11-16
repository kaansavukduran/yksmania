import { expect, type Locator } from "@playwright/test";
import { sourceNarratives } from "../../src/learning/narratives";
import { forge026Case } from "./forge026-case-helper";
async function number(lab: Locator, label: string, value: number) {
  await lab
    .getByRole("spinbutton", { name: label + ", sayıyla", exact: true })
    .fill(String(value));
}
async function select(lab: Locator, label: string, value: string) {
  await lab
    .getByRole("combobox", { name: label, exact: true })
    .selectOption(value);
}
async function compare(lab: Locator, guess: string, reason: string) {
  await select(lab, "Tahminin", guess);
  await lab
    .getByRole("textbox", { name: "Gerekçen", exact: true })
    .fill(reason);
  await lab
    .getByRole("button", { name: "Kanıtla kıyasla", exact: true })
    .click();
  await expect(lab.locator('.p026-feedback[role="status"]')).toContainText(
    "Tahminin bu koşulla uyumlu.",
  );
}
// Original course metadata intentionally remains the source of titles and the
// legacy five-card flow. Separate *-ileri banks are tested on Questions by root.
export const physics026Cases = [
  forge026Case(
    sourceNarratives,
    "fizik-bilimine-giris",
    "forge026-physics-fizik-bilimine-giris",
    async (_page, lab) => {
      await select(lab, "İnceleme", "measure");
      for (const [label, value] of [
        ["1. okuma ×10 (cm)", 110],
        ["2. okuma ×10 (cm)", 112],
        ["3. okuma ×10 (cm)", 111],
        ["Sıfır sapması ×10 (cm)", 5],
        ["Gösterge adımı ×10 (cm)", 1],
      ] as const)
        await number(lab, label, value);
      await compare(
        lab,
        "Azalır",
        "Aynı okumadan daha büyük ek sapma çıkarılır; ortalama azalır, aralık aynı kalır.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      expect(Number(await result.getAttribute("data-mean"))).toBeCloseTo(
        10.6,
        12,
      );
      expect(Number(await result.getAttribute("data-spread"))).toBeCloseTo(
        0.2,
        12,
      );
      await expect(result).toContainText("Sapma sonrası ortalama: 10,6 cm");
      await expect(
        lab.locator('svg[data-p026-plot="measurement"] [data-reading-cm]'),
      ).toHaveCount(3);
      expect(
        Number(
          await lab
            .locator("[data-corrected-mean]")
            .getAttribute("data-corrected-mean"),
        ),
      ).toBeCloseTo(10.6, 12);
    },
  ),
  forge026Case(
    sourceNarratives,
    "madde-ozkutle",
    "forge026-physics-madde-ozkutle",
    async (_page, lab) => {
      await select(lab, "İnceleme", "capillary");
      for (const [label, value] of [
        ["Tüp yarıçapı ×10 (mm)", 10],
        ["Yüzey gerilimi ×1000 (N/m)", 50],
        ["Temas açısı θ (°)", 120],
        ["Sıvı özkütlesi (kg/m³)", 1000],
      ] as const)
        await number(lab, label, value);
      await compare(
        lab,
        "Altta",
        "cos120° = −0,5; diğer çarpanlar pozitif olduğu için h negatif, haznenin altında.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      expect(
        Number(await result.getAttribute("data-capillary-height-mm")),
      ).toBeCloseTo(-5, 12);
      expect(
        Number(await result.getAttribute("data-contact-cosine")),
      ).toBeCloseTo(-0.5, 12);
      const meniscus = lab.locator("[data-capillary-mm]"),
        d = (await meniscus.getAttribute("d"))!
          .match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/g)!
          .map(Number);
      expect((d[1] + 2 * d[3] + d[5]) / 4).toBeCloseTo(170, 10);
      await expect(result).toContainText("İşaretli h = -5 mm");
    },
  ),
  forge026Case(
    sourceNarratives,
    "dogrusal-hareket",
    "forge026-physics-dogrusal-hareket",
    async (_page, lab) => {
      for (const [label, value] of [
        ["İlk dünya hızı (m/s)", 6],
        ["Gözlemci hızı u (m/s)", 0],
        ["İlk dünya konumu (m)", 1],
        ["1. evre süresi (s)", 4],
        ["1. evre ivmesi (m/s²)", -2],
        ["2. evre süresi (s)", 2],
        ["2. evre ivmesi (m/s²)", 0],
        ["3. evre süresi (s)", 0],
        ["3. evre ivmesi (m/s²)", 0],
        ["Toplam sürede seçili pay (%)", 50],
      ] as const)
        await number(lab, label, value);
      await compare(
        lab,
        "Yol daha büyük",
        "İlk evrede 3 s’de yön değişir; pozitif ve negatif hız alanları yolda eklenir.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toHaveAttribute("data-displacement", "4");
      await expect(result).toHaveAttribute("data-total-distance", "14");
      await expect(result).toHaveAttribute("data-current-x", "10");
      await expect(result).toHaveAttribute("data-current-v", "0");
      expect(
        Number(await result.getAttribute("data-average-speed")),
      ).toBeCloseTo(7 / 3, 12);
      await expect(
        lab.locator('[data-motion-point="position"]'),
      ).toHaveAttribute("data-value", "10");
      await expect(
        lab.locator('[data-motion-point="position"]'),
      ).toHaveAttribute("data-time", "3");
      await expect(
        lab.locator('[data-motion-point="acceleration"]'),
      ).toHaveAttribute("data-value", "-2");
    },
  ),
  forge026Case(
    sourceNarratives,
    "enerji-ve-hareket",
    "forge026-physics-enerji-ve-hareket",
    async (_page, lab) => {
      await select(lab, "İnceleme", "ramp");
      for (const [label, value] of [
        ["Kütle ×10 (kg)", 20],
        ["İlk sürat ×10 (m/s)", 30],
        ["İtiş ×10 (N)", 50],
        ["Kayma direnci ×10 (N)", 70],
        ["Eğim sinθ ×100", 0],
        ["Hedef yol ×10 (m)", 40],
      ] as const)
        await number(lab, label, value);
      await compare(
        lab,
        "Erişir",
        "İlk 9 J’ye itiş 20 J ekler; direnç 28 J alır, hedefte 1 J kinetik kalır.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toHaveAttribute("data-reached", "true");
      await expect(result).toHaveAttribute("data-completed-distance", "4");
      await expect(result).toHaveAttribute("data-final-kinetic", "1");
      await expect(result).toHaveAttribute("data-thermal", "28");
      expect(
        Number(await result.getAttribute("data-energy-balance-error")),
      ).toBeCloseTo(0, 12);
      const point = lab.locator("[data-reached-distance]");
      expect(Number(await point.getAttribute("cy"))).toBeCloseTo(
        214.44444444444446,
        10,
      );
      await expect(lab.locator("[data-energy-part]")).toHaveCount(6);
    },
  ),
];
