import { expect, type Locator } from "@playwright/test";
import { forge019Case, setRange } from "./forge019-case-helper";
import { forge019ChemistryLessons } from "../../src/learning/forge019Chemistry";

async function compare(lab: Locator, choice: string, reason: string) {
  await lab.getByRole("button", { name: choice, exact: true }).click();
  await lab.getByLabel("Gerekçen (120 karakter)", { exact: true }).fill(reason);
  await lab.getByRole("button", { name: "Kıyasla", exact: true }).click();
  await expect(lab.locator('.c019-feedback[role="status"]')).toContainText(
    "Seçimin modelle uyumlu.",
  );
}
const key = (id: string) => "forge019:chemistry:" + id;
export const chemistry019Cases = [
  forge019Case(
    forge019ChemistryLessons,
    "ayt-molalite-koligatif",
    key("ayt-molalite-koligatif"),
    async (_, lab) => {
      await setRange(lab, "Çözünen (mol)", 0.1);
      await setRange(lab, "Tanecik çarpanı i", 2);
      await setRange(lab, "Son hacim (L)", 0.5);
      await compare(
        lab,
        "Daha düşük",
        "i·m = 0,2; 1,86 ile çarpınca donma 0,372 °C düşer.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Donma düşüşü: 0,372 °C",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Ozmotik basınç: 9,8472 atm",
      );
      expect(
        Number(
          await lab
            .locator("[data-freezing-drop]")
            .getAttribute("data-freezing-drop"),
        ),
      ).toBeCloseTo(0.372, 10);
      expect(
        Number(
          await lab
            .locator("[data-boiling-rise]")
            .getAttribute("data-boiling-rise"),
        ),
      ).toBeCloseTo(0.104, 10);
    },
  ),
  forge019Case(
    forge019ChemistryLessons,
    "ayt-cozunurluk",
    key("ayt-cozunurluk"),
    async (_, lab) => {
      await setRange(lab, "Sıcaklık (°C)", 20);
      await compare(
        lab,
        "Katı kalır",
        "150 g su 30 g X çözer; eklenen 60 g X’in 30 g kadarı katı kalır.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Çözünen: 30 g. Ayrı katı: 30 g",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Çözelti kütlesi: 180 g. Tüm sistem: 210 g",
      );
      await expect(lab.locator("[data-solid-g]")).toHaveAttribute(
        "data-solid-g",
        "30",
      );
      await expect(lab.locator("[data-dissolved-g]")).toHaveAttribute(
        "data-dissolved-g",
        "30",
      );
    },
  ),
  forge019Case(
    forge019ChemistryLessons,
    "ayt-tepkimelerde-enerji",
    key("ayt-tepkimelerde-enerji"),
    async (_, lab) => {
      await setRange(lab, "ΔT (°C)", 5);
      await compare(
        lab,
        "Isı verir",
        "Çözelti 2090 J ve kap 100 J alır; tepkime toplam 2190 J verir.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Mol başına ΔH: -43,8 kJ/mol",
      );
      await expect(lab.locator('[data-heat="reaction"]')).toHaveAttribute(
        "data-heat-j",
        "-2190",
      );
      await expect(lab.locator('[data-heat="surroundings"]')).toHaveAttribute(
        "data-heat-j",
        "2190",
      );
    },
  ),
  forge019Case(
    forge019ChemistryLessons,
    "ayt-entalpi-bag-hess",
    key("ayt-entalpi-bag-hess"),
    async (_, lab) => {
      await setRange(lab, "Katsayı 2", 1);
      await compare(
        lab,
        "Tam hedef",
        "İki denklem birer kez alınır; CO silinir ve ΔH −393,5 kJ olur.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "ΔH toplamı: -393,5 kJ",
      );
      await expect(lab.locator('[data-net-species="CO"]')).toHaveAttribute(
        "data-net-mol",
        "0",
      );
      await expect(lab.locator('[data-net-species="CO₂"]')).toHaveAttribute(
        "data-net-mol",
        "1",
      );
      await expect(lab.locator('[data-net-species="O₂"]')).toHaveAttribute(
        "data-net-mol",
        "-1",
      );
    },
  ),
  forge019Case(
    forge019ChemistryLessons,
    "ayt-tepkime-hizi",
    key("ayt-tepkime-hizi"),
    async (_, lab) => {
      await setRange(lab, "A (mol/L)", 0.2);
      await setRange(lab, "B (mol/L)", 0.2);
      await compare(
        lab,
        "Daha çok",
        "A iki kat olunca dört, B iki kat olunca iki; toplam hız sekiz kat olur.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "İlk hız: 0,016 mol/(L·s). Referansa oran: 8 kat",
      );
      expect(
        Number(await lab.locator("[data-rate]").getAttribute("data-rate")),
      ).toBeCloseTo(0.016, 10);
    },
  ),
  forge019Case(
    forge019ChemistryLessons,
    "ayt-denge-hesaplari",
    key("ayt-denge-hesaplari"),
    async (_, lab) => {
      await setRange(lab, "Hacim (L)", 2);
      await compare(
        lab,
        "İleri",
        "İlk X yok; denge 0,5 mol X₂ ve 1 mol X ile Kc = 1 sağlar.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Son X₂: 0,5 mol. Son X: 1 mol",
      );
      expect(
        Number(
          await lab
            .locator('[data-equilibrium-bar="2"]')
            .getAttribute("data-amount-mol"),
        ),
      ).toBeCloseTo(0.5, 10);
      expect(
        Number(
          await lab
            .locator('[data-equilibrium-bar="3"]')
            .getAttribute("data-amount-mol"),
        ),
      ).toBeCloseTo(1, 10);
    },
  ),
  forge019Case(
    forge019ChemistryLessons,
    "ayt-denge-derisim",
    key("ayt-denge-derisim"),
    async (_, lab) => {
      await setRange(lab, "Ek X (mol)", 1);
      await compare(
        lab,
        "Ürünlere",
        "Anlık derişimler 2, 1, 1 M; Qc = 0,5 ve Kc = 1. Net ileri yön olur.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Son X: 1,7321 M; Y: 0,7321 M; XY: 1,2679 M",
      );
      await expect(lab.locator('[data-series="X"]')).toHaveAttribute(
        "data-instant",
        "2",
      );
      expect(
        Number(
          await lab.locator('[data-series="XY"]').getAttribute("data-final"),
        ),
      ).toBeCloseTo(1.2679491924311228, 10);
    },
  ),
  forge019Case(
    forge019ChemistryLessons,
    "ayt-denge-sicaklik-kesir",
    key("ayt-denge-sicaklik-kesir"),
    async (_, lab) => {
      await lab.getByRole("button", { name: "350 K", exact: true }).click();
      await compare(
        lab,
        "Ürünlere",
        "Isı alan yön için yeni Kc 4, anlık Qc 2; üç molün 2,4 molü Y olur.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Yeni denge X: 0,6 mol; Y: 2,4 mol",
      );
      await expect(lab.locator("[data-equilibrium-k]")).toHaveAttribute(
        "data-equilibrium-k",
        "4",
      );
      await expect(lab.locator("[data-x-mol]")).toHaveAttribute(
        "data-x-mol",
        "0.6",
      );
      await expect(lab.locator("[data-y-mol]")).toHaveAttribute(
        "data-y-mol",
        "2.4",
      );
    },
  ),
];
