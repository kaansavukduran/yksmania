import { expect, type Locator } from "@playwright/test";
import { forge018Case, setRange } from "./forge018-case-helper";
import { forge018ChemistryLessons } from "../../src/learning/forge018Chemistry";
async function compare(lab: Locator, answer: string, reason: string) {
  await lab.getByRole("button", { name: answer, exact: true }).click();
  await lab
    .getByLabel("Gerekçen (en çok 120 karakter)", { exact: true })
    .fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .click();
  await expect(lab.locator('.c018-feedback[role="status"]')).toContainText(
    "Seçimin modelle uyumlu.",
  );
}
const key = (id: string) => `forge018:chemistry:${id}`;
export const chemistry018Cases = [
  forge018Case(
    forge018ChemistryLessons,
    "ayt-kinetik-yogunluk",
    key("ayt-kinetik-yogunluk"),
    async (_, lab) => {
      await setRange(lab, "T (K)", 600);
      await setRange(lab, "Mol kütlesi (g/mol)", 8);
      await compare(
        lab,
        "Referansa göre hızlı",
        "M 8, referans 32; aynı T’de v_rms iki kat. Yoğunluk 8/49,2.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "1.367,7 m/s",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "0,163 g/L",
      );
      expect(
        Number(await lab.locator("[data-rms]").getAttribute("data-rms")),
      ).toBeCloseTo(1367.717076006584, 8);
      expect(
        Number(
          await lab.locator("[data-density]").getAttribute("data-density"),
        ),
      ).toBeCloseTo(0.16260162601626016, 12);
    },
  ),
  forge018Case(
    forge018ChemistryLessons,
    "ayt-kismi-basinci-suustu",
    key("ayt-kismi-basinci-suustu"),
    async (_, lab) => {
      await setRange(lab, "Gaz hacmi (L)", 1);
      await compare(
        lab,
        "Sıvı da kalır",
        "Kuru basınç 2,46 atm, su 0,035 atm; toplam 2,495 atm. Su stoku yeterli.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "2,495 atm",
      );
      await expect(lab.locator("[data-water-regime]")).toHaveAttribute(
        "data-water-regime",
        "liquid",
      );
      expect(
        Number(
          await lab
            .locator('[data-pressure="X"]')
            .getAttribute("data-pressure-value"),
        ),
      ).toBeCloseTo(2.46, 12);
      expect(
        Number(
          await lab
            .locator('[data-pressure="Su"]')
            .getAttribute("data-pressure-value"),
        ),
      ).toBe(0.035);
      expect(
        Number(
          await lab
            .locator('[data-pressure="Toplam"]')
            .getAttribute("data-pressure-value"),
        ),
      ).toBeCloseTo(2.495, 12);
      expect(
        Number(
          await lab
            .locator("[data-water-liquid]")
            .getAttribute("data-water-liquid"),
        ),
      ).toBeGreaterThan(0);
    },
  ),
  forge018Case(
    forge018ChemistryLessons,
    "ayt-gercek-gaz-faz",
    key("ayt-gercek-gaz-faz"),
    async (_, lab) => {
      await lab.getByRole("button", { name: "Faz yolu", exact: true }).click();
      await lab
        .getByRole("button", { name: "40 °C, 80 atm", exact: true })
        .click();
      await compare(
        lab,
        "Kritiküstü akışkan",
        "T 31,2 °C üstünde ve P 73 atm üstünde; iki koşul birlikte sağlanıyor.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Kritiküstü akışkan",
      );
      await expect(lab.locator("[data-phase]")).toHaveAttribute(
        "data-phase",
        "Kritiküstü akışkan",
      );
      expect(
        Number(
          await lab
            .locator("[data-phase-temperature]")
            .getAttribute("data-phase-temperature"),
        ),
      ).toBe(40);
      expect(
        Number(
          await lab
            .locator("[data-phase-pressure]")
            .getAttribute("data-phase-pressure"),
        ),
      ).toBe(80);
    },
  ),
  forge018Case(
    forge018ChemistryLessons,
    "ayt-cozucu-cozunen",
    key("ayt-cozucu-cozunen"),
    async (_, lab) => {
      await lab.getByRole("button", { name: "Cl⁻", exact: true }).click();
      await setRange(lab, "Su ayırma (kJ/mol)", 20);
      await setRange(lab, "Katı ayırma (kJ/mol)", 30);
      await setRange(lab, "Yeni bağlar (kJ/mol)", -40);
      await compare(
        lab,
        "Endotermik",
        "20 + 30 − 40 = 10 kJ/mol; son enerji daha yüksek. Anyona H ucu bakar.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "10 kJ/mol",
      );
      await expect(lab.locator("[data-ion-facing]")).toContainText("Hδ⁺");
      expect(
        Number(
          await lab
            .locator('[data-energy-stage="3"]')
            .getAttribute("data-energy-value"),
        ),
      ).toBe(10);
      await expect(lab.locator('[data-water-facing="Hδ⁺"]')).toHaveCount(4);
      expect(
        Number(await lab.locator(".c018-oxygen").first().getAttribute("cx")),
      ).toBe(245);
      expect(
        Number(await lab.locator(".c018-hydrogen").first().getAttribute("cx")),
      ).toBe(220);
    },
    'svg[data-diagram="energy"]',
  ),
  forge018Case(
    forge018ChemistryLessons,
    "ayt-molarite",
    key("ayt-molarite"),
    async (_, lab) => {
      await setRange(lab, "Son hacim (mL)", 500);
      await compare(
        lab,
        "Stoktan daha seyreltik",
        "0,4 × 0,250 = 0,10 mol; 0,500 L’ye bölünce 0,20 M.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "0,2 mol/L",
      );
      await expect(lab.locator("[data-model-result]")).toContainText("0,1 mol");
      expect(
        Number(
          await lab
            .locator("[data-final-molarity]")
            .getAttribute("data-final-molarity"),
        ),
      ).toBeCloseTo(0.2, 12);
      expect(
        Number(
          await lab
            .locator("[data-final-volume]")
            .getAttribute("data-final-volume"),
        ),
      ).toBe(500);
      expect(
        Number(await lab.locator("[data-final-volume]").getAttribute("height")),
      ).toBe(120);
    },
  ),
  forge018Case(
    forge018ChemistryLessons,
    "ayt-iyon-derisimi",
    key("ayt-iyon-derisimi"),
    async (_, lab) => {
      await setRange(lab, "CaCl₂ (mol/L)", 0.1);
      await setRange(lab, "NaCl (mol/L)", 0.2);
      await setRange(lab, "NaCl (mL)", 300);
      await compare(
        lab,
        "Cl⁻, Na⁺ değerinden büyük",
        "Ca 0,04 M, Na 0,12 M; klorür 2 × 0,04 + 0,12 = 0,20 M.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Ca²⁺: 0,04 M",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Na⁺: 0,12 M",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Cl⁻: 0,2 M",
      );
      expect(
        Number(
          await lab
            .locator('[data-ion="calcium"]')
            .getAttribute("data-ion-value"),
        ),
      ).toBeCloseTo(0.04, 12);
      expect(
        Number(
          await lab.locator('[data-ion="chloride"]').getAttribute("width"),
        ),
      ).toBeCloseTo(48, 12);
      expect(
        Number(
          await lab
            .locator("[data-charge-positive]")
            .getAttribute("data-charge-positive"),
        ),
      ).toBeCloseTo(0.2, 12);
      expect(
        Number(
          await lab
            .locator("[data-charge-negative]")
            .getAttribute("data-charge-negative"),
        ),
      ).toBeCloseTo(0.2, 12);
    },
  ),
];
