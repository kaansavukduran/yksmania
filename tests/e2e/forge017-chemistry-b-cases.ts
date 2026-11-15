import { expect, type Locator } from "@playwright/test";
import { forge017Case, setRange } from "./forge017-case-helper";
import { forge017ChemistryBLessons } from "../../src/learning/forge017ChemistryB";
const select = (lab: Locator, name: string, value: string) =>
  lab.getByRole("combobox", { name, exact: true }).selectOption(value);
async function predict(lab: Locator, value: string, reason: string) {
  await select(lab, "Sonuç tahminin", value);
  await lab
    .getByRole("textbox", { name: "Modelden gerekçen", exact: true })
    .fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .click();
}
async function feedback(lab: Locator) {
  await expect(lab.locator(".cb017-feedback")).toContainText(
    "Tahminin bu koşullarla uyumlu.",
  );
}
const key = (id: string) => "forge017-chem-b:" + id;
export const chemistryB017Cases = [
  forge017Case(
    forge017ChemistryBLessons,
    "ayt-modern-atom-elektron-dizilimi",
    key("ayt-modern-atom-elektron-dizilimi"),
    async (_page, lab) => {
      await select(lab, "Element ve atom numarası", "28");
      await select(lab, "Pozitif iyon yükü", "1");
      await expect(lab.locator('[data-subshell="3d"]')).toHaveAttribute(
        "data-count",
        "9",
      );
      await expect(lab.locator('[data-subshell="4s"]')).toHaveAttribute(
        "data-count",
        "0",
      );
      await select(lab, "Element ve atom numarası", "29");
      await select(lab, "Pozitif iyon yükü", "2");
      await predict(
        lab,
        "one",
        "Cu temel hâlinden önce 4s, sonra bir 3d elektronu çıkar; 3d⁹ içinde bir tek elektron kalır.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator('[data-subshell="3d"]')).toHaveAttribute(
        "data-count",
        "9",
      );
      await expect(lab.locator('[data-subshell="4s"]')).toHaveAttribute(
        "data-count",
        "0",
      );
      await expect(
        lab.locator('[data-orbital-box="3d"][data-occupancy="2"]'),
      ).toHaveCount(4);
      await expect(
        lab.locator('[data-orbital-box="3d"][data-occupancy="1"]'),
      ).toHaveCount(1);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Elektron sayısı: 27",
      );
      await expect(lab.locator("[data-unpaired]")).toContainText(
        "Eşleşmemiş elektron: 1",
      );
      await feedback(lab);
    },
  ),
  forge017Case(
    forge017ChemistryBLessons,
    "ayt-kuantum-sayilari",
    key("ayt-kuantum-sayilari"),
    async (_page, lab) => {
      await select(lab, "Baş kuantum sayısı n", "2");
      await select(lab, "Yan kuantum sayısı l", "2");
      await expect(lab.locator("[data-angular-profile]")).toHaveCount(0);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "l, 0 ile n−1 arasında",
      );
      await select(lab, "Baş kuantum sayısı n", "3");
      await select(lab, "Manyetik sayı m_l", "0");
      await select(lab, "Spin m_s", "-0.5");
      await predict(
        lab,
        "valid",
        "n=3 için l=2 izinli; |m_l|=0≤2 ve spin −1/2. d alt kabuğunda 5 orbital bulunur.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-angular-profile]")).toHaveAttribute(
        "data-l",
        "2",
      );
      await expect(lab.locator("[data-angular-profile]")).toHaveAttribute(
        "data-ml",
        "0",
      );
      const b = await lab.locator("[data-angular-profile]").evaluate((e) => {
        const r = (e as SVGGraphicsElement).getBBox();
        return { w: r.width, h: r.height };
      });
      expect(b.w).toBeCloseTo(145, 1);
      expect(b.h).toBeCloseTo(290, 1);
      await expect(lab.locator("[data-quantum-capacity]")).toContainText(
        "3d: 5 orbital; en fazla 10 elektron.",
      );
      await expect(lab.locator("[data-quantum-nodes]")).toContainText(
        "Radyal düğüm: 0; açısal düğüm: 2.",
      );
      await feedback(lab);
    },
  ),
  forge017Case(
    forge017ChemistryBLessons,
    "ayt-periyodik-sistem-atom-capi",
    key("ayt-periyodik-sistem-atom-capi"),
    async (_page, lab) => {
      await select(lab, "Örnek türü", "iso");
      await select(lab, "İlk tanecik", "4");
      await select(lab, "Son tanecik", "0");
      await predict(
        lab,
        "<",
        "Al³⁺ ve O²⁻ onar elektronlu. 13 protonlu Al³⁺ aynı elektron düzenini daha güçlü tutar.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator('[data-radius-cloud="first"]')).toHaveAttribute(
        "r",
        "41",
      );
      await expect(lab.locator('[data-radius-cloud="second"]')).toHaveAttribute(
        "r",
        "85",
      );
      await expect(lab.locator("[data-radius-order]")).toContainText(
        "Al³⁺ < O²⁻",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Elektron sayıları: ilk 10, son 10.",
      );
      await feedback(lab);
    },
  ),
  forge017Case(
    forge017ChemistryBLessons,
    "ayt-iyonlasma-elektron-ilgisi-en",
    key("ayt-iyonlasma-elektron-ilgisi-en"),
    async (_page, lab) => {
      await select(lab, "İncelenen süreç", "affinity");
      await select(lab, "Elektron alan atom", "cl");
      await select(lab, "Raporlanan enerji", "enthalpy");
      await expect(lab.locator("[data-affinity-result]")).toContainText(
        "ΔH = -349 kJ/mol",
      );
      await select(lab, "İncelenen süreç", "bond");
      await select(lab, "İncelenen bağ", "hf");
      await expect(lab.locator("[data-bond-direction]")).toContainText(
        "Hδ⁺ → Fδ⁻",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "fark 1,78",
      );
      await select(lab, "İncelenen süreç", "ion");
      await select(lab, "İyonlaşma tablosu", "al");
      await select(lab, "Koparma basamağı", "4");
      await predict(
        lab,
        "core",
        "Al’ın üç değerlik elektronu çıktıktan sonra dördüncü elektron iç düzenden koparılır; 3 kat eşiği yetmez.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-ion-step]")).toContainText(
        "4. iyonlaşma = 11.577 kJ/mol",
      );
      await expect(lab.locator("[data-ion-total]")).toContainText(
        "16.717 kJ/mol",
      );
      const h = Number(
        await lab.locator('[data-energy-bar="4"]').getAttribute("height"),
      );
      expect(h).toBeCloseTo(289.425, 6);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "İç düzenin elektronuna geçildi.",
      );
      await feedback(lab);
    },
  ),
  forge017Case(
    forge017ChemistryBLessons,
    "ayt-elementler-yukseltgenme",
    key("ayt-elementler-yukseltgenme"),
    async (_page, lab) => {
      await select(lab, "Kimyasal tür", "peroxide");
      await select(lab, "Hesabın adımı", "2");
      await expect(lab.locator("[data-oxidation-value]")).toContainText(
        "O için x = -1",
      );
      await select(lab, "Kimyasal tür", "o2f2");
      await select(lab, "Hesabın adımı", "2");
      await expect(lab.locator("[data-oxidation-value]")).toContainText(
        "O için x = +1",
      );
      await select(lab, "Kimyasal tür", "of2");
      await select(lab, "Hesabın adımı", "2");
      await predict(
        lab,
        "positive",
        "OF₂ nötr, iki F toplam −2; tek O toplamı sıfıra tamamlayıp +2 olur. Bu serbest O²⁺ kanıtı değil.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-oxidation-value]")).toContainText(
        "O için x = +2",
      );
      await expect(lab.locator("[data-oxidation-equation]")).toContainText(
        "1x + (-2) = 0",
      );
      await expect(lab.locator('[data-counted-atom="F"]')).toHaveCount(2);
      await expect(lab.locator('[data-counted-atom="O"]')).toHaveCount(1);
      await expect(
        lab.locator('[data-counted-atom="O"] text').last(),
      ).toHaveText("+2");
      await feedback(lab);
    },
  ),
  forge017Case(
    forge017ChemistryBLessons,
    "ayt-gaz-ozellikleri",
    key("ayt-gaz-ozellikleri"),
    async (_page, lab) => {
      await setRange(lab, "Madde miktarı (mol)", 0);
      await expect(lab.locator("[data-gas-particle]")).toHaveCount(0);
      await expect(lab.locator("[data-rms]")).toHaveAttribute(
        "data-rms",
        "empty",
      );
      await setRange(lab, "Madde miktarı (mol)", 1);
      await setRange(lab, "Sıcaklık (K)", 600);
      await setRange(lab, "Hacim (L)", 12);
      await setRange(lab, "Mol kütlesi (g/mol)", 16);
      await setRange(lab, "Duvar alanı (cm²)", 3);
      await predict(
        lab,
        "more",
        "T iki kat, n ve V aynı: P iki kat. M dört kat olduğundan yeni v_rms, referansın 1/√2 katıdır.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-gas-particle]")).toHaveCount(12);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "P = 4,103 atm",
      );
      await expect(lab.locator("[data-rms]")).toHaveText("v_rms = 967,149 m/s");
      expect(
        Number(
          await lab
            .locator("[data-pressure-atm]")
            .getAttribute("data-pressure-atm"),
        ),
      ).toBeCloseTo(4.102868304047984, 8);
      const d = await lab
        .locator("[data-gas-particle] path")
        .first()
        .getAttribute("d");
      const a = d!.match(/-?\d*\.?\d+(?:e[+-]?\d+)?/g)!.map(Number);
      expect(Math.hypot(a[2], a[3])).toBeCloseTo(967.1489257307994 / 70, 6);
      await feedback(lab);
    },
  ),
  forge017Case(
    forge017ChemistryBLessons,
    "ayt-gaz-yasalari",
    key("ayt-gaz-yasalari"),
    async (_page, lab) => {
      await select(lab, "Gaz deneyi", "charles");
      await setRange(lab, "Son sıcaklık (K)", 600);
      await expect(lab.locator("[data-law-state]")).toContainText("V₂=49,2 L");
      await select(lab, "Gaz deneyi", "gay");
      await expect(lab.locator("[data-law-state]")).toContainText("P₂=2 atm");
      await select(lab, "Gaz deneyi", "avogadro");
      await setRange(lab, "Son miktar (mol)", 2);
      await expect(lab.locator("[data-law-state]")).toContainText("V₂=49,2 L");
      await select(lab, "Gaz deneyi", "combined");
      await setRange(lab, "Son sıcaklık (K)", 450);
      await setRange(lab, "Son hacim (L)", 16.4);
      await expect(lab.locator("[data-law-state]")).toContainText("P₂=4,5 atm");
      await select(lab, "Gaz deneyi", "boyle");
      await setRange(lab, "Son hacim (L)", 12.3);
      await predict(
        lab,
        "more",
        "Boyle koşulunda n ve T sabit. 24,6 L’den 12,3 L’ye yarı hacim, 1 atm’den 2 atm’ye iki kat basınç verir.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-law-state]")).toContainText(
        "P₂=2 atm; V₂=12,3 L; T₂=300 K; n₂=1 mol.",
      );
      await expect(lab.locator("[data-law-coordinate]")).toContainText(
        "(12,3; 2)",
      );
      const point = lab.locator("[data-law-point]");
      expect(Number(await point.getAttribute("cx"))).toBeCloseTo(165, 6);
      expect(Number(await point.getAttribute("cy"))).toBeCloseTo(
        204.24242424242425,
        6,
      );
      await feedback(lab);
    },
  ),
];
