import { expect, type Locator } from "@playwright/test";
import { forge020Case, setRange } from "./forge020-case-helper";
import { forge020ChemistryLessons } from "../../src/learning/forge020Chemistry";
const key = (id: string) => `forge020:chemistry:${id}`;
async function compare(lab: Locator, answer: string, reason: string) {
  await lab.getByRole("button", { name: answer, exact: true }).click();
  await lab
    .getByLabel("Gerekçen (en çok 120 karakter)", { exact: true })
    .fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .click();
  await expect(lab.locator('.c020-feedback[role="status"]')).toContainText(
    "Seçimin modelle uyumlu.",
  );
}
export const chemistry020Cases = [
  forge020Case(
    forge020ChemistryLessons,
    "ayt-denge-basinc-hacim",
    key("ayt-denge-basinc-hacim"),
    async (_, lab) => {
      await lab
        .getByRole("button", { name: "İnert, P sabit", exact: true })
        .click();
      await setRange(lab, "İnert gaz (mol)", 2);
      await compare(
        lab,
        "Ürünlere",
        "Sabit toplam P ile inert eklenince kap genişler; Qp 0,6 atm olur ve ürünler artar.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "42,526 L",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "1,186141 mol",
      );
      expect(
        Number(
          await lab
            .locator('[data-pressure-kind="AB"][data-stage="2"]')
            .getAttribute("data-pressure"),
        ),
      ).toBeCloseTo(0.4707890075482393, 10);
      expect(
        Number(
          await lab
            .locator('[data-pressure-kind="A"][data-stage="2"]')
            .getAttribute("data-pressure"),
        ),
      ).toBeCloseTo(0.6861406616345072, 10);
    },
  ),
  forge020Case(
    forge020ChemistryLessons,
    "ayt-sulu-asit-baz-denge",
    key("ayt-sulu-asit-baz-denge"),
    async (_, lab) => {
      await lab.getByRole("button", { name: "HCl", exact: true }).click();
      await setRange(lab, "c = 10⁻ˣ M; x", 8);
      await compare(
        lab,
        "Asidik",
        "10⁻⁸ M HCl için su katkısı atılamaz; H₃O⁺, OH⁻ değerinden biraz büyüktür.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "pH = 6,978294",
      );
      expect(
        Number(
          await lab
            .locator("[data-solution-ph]")
            .getAttribute("data-solution-ph"),
        ),
      ).toBeCloseTo(6.978294313542888, 10);
      expect(
        Number(
          await lab
            .locator("[data-neutral-ph]")
            .getAttribute("data-neutral-ph"),
        ),
      ).toBe(7);
    },
  ),
  forge020Case(
    forge020ChemistryLessons,
    "ayt-zayif-asit-baz-tampon",
    key("ayt-zayif-asit-baz-tampon"),
    async (_, lab) => {
      await setRange(lab, "Doz (mol)", -0.02);
      await compare(
        lab,
        "İki bileşen kalır",
        "0,020 mol HCl, A⁻ tüketir. Ara HA 0,120; A⁻ 0,080 mol. Aile toplamı korunur.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "pH = 4,824044",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "4,823909",
      );
      expect(
        Number(
          await lab.locator("[data-buffer-ha]").getAttribute("data-buffer-ha"),
        ),
      ).toBeCloseTo(0.11998500535182435, 10);
      expect(
        Number(
          await lab.locator("[data-buffer-a]").getAttribute("data-buffer-a"),
        ),
      ).toBeCloseTo(0.08001499464817564, 10);
    },
  ),
  forge020Case(
    forge020ChemistryLessons,
    "ayt-hidroliz",
    key("ayt-hidroliz"),
    async (_, lab) => {
      await lab.getByRole("button", { name: "NH₄Cl", exact: true }).click();
      await compare(
        lab,
        "Asidik",
        "NH₄⁺ suya proton verir; Cl⁻ seyirci kalır. H₃O⁺ derişimi OH⁻ değerinden büyüktür.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "pH = 5,127613",
      );
      expect(
        Number(
          await lab
            .locator('[data-hydro-family="N"]')
            .getAttribute("data-neutral-species"),
        ),
      ).toBeCloseTo(0.000007452611422560997, 14);
      expect(
        Number(
          await lab
            .locator('[data-hydro-family="Ac"]')
            .getAttribute("data-neutral-species"),
        ),
      ).toBe(0);
    },
  ),
  forge020Case(
    forge020ChemistryLessons,
    "ayt-notrallesme",
    key("ayt-notrallesme"),
    async (_, lab) => {
      await setRange(lab, "Ba(OH)₂ (mL)", 60);
      await compare(
        lab,
        "Baz artar",
        "0,010 mol H⁺ ile 0,012 mol OH⁻ var. 0,002 mol OH⁻ 0,160 L son hacimde artar.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "pH = 12,09691",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "-0,573 kJ",
      );
      expect(
        Number(
          await lab.locator("[data-water-mol]").getAttribute("data-water-mol"),
        ),
      ).toBeCloseTo(0.01, 13);
    },
  ),
  forge020Case(
    forge020ChemistryLessons,
    "ayt-titrasyon",
    key("ayt-titrasyon"),
    async (_, lab) => {
      await lab
        .getByRole("button", { name: "Eşdeğerlik", exact: true })
        .click();
      await compare(
        lab,
        "Tam eşdeğer",
        "100 mL baz 0,0100 mol sağlar. HA tam karşılanır; A⁻ hidrolizi pH değerini bazik yapar.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "pH = 8,849498",
      );
      await expect(lab.locator("[data-titration-curve]")).toHaveAttribute(
        "data-titration-curve",
        "weak",
      );
      expect(
        Number(
          await lab
            .locator("[data-titration-ph]")
            .getAttribute("data-titration-ph"),
        ),
      ).toBeCloseTo(8.849497727227824, 10);
      await expect(lab.locator("[data-titration-volume]")).toHaveAttribute(
        "data-titration-volume",
        "100",
      );
    },
  ),
  forge020Case(
    forge020ChemistryLessons,
    "ayt-cozunurluk-dengesi",
    key("ayt-cozunurluk-dengesi"),
    async (_, lab) => {
      await lab.getByRole("button", { name: "CaF₂", exact: true }).click();
      await setRange(lab, "Katı stoku (µmol)", 500);
      await setRange(lab, "Ortak iyon (mM)", 1);
      await compare(
        lab,
        "Katı kalır",
        "Ortak F⁻ doygun kökü s(c+2s)²=Kç yapar; 500 µmol stok kapasitenin üstündedir.",
      );
    },
    async (_, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Çözünen 34,944764 µmol",
      );
      expect(
        Number(
          await lab
            .locator("[data-dissolved-mol]")
            .getAttribute("data-dissolved-mol"),
        ),
      ).toBeCloseTo(0.00003494476443608381, 14);
      expect(
        Number(
          await lab.locator("[data-solid-mol]").getAttribute("data-solid-mol"),
        ),
      ).toBeCloseTo(0.0004650552355639162, 14);
    },
  ),
];
