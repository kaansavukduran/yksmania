import { expect, type Locator } from "@playwright/test";
import { forge014ChemistryLessons } from "../../src/learning/forge014Chemistry";
import { forge014Case, setRange } from "./forge014-case-helper";
async function compare(lab: Locator, expected: string, reason: string) {
  await lab
    .getByLabel("Sonuç tahminin", { exact: true })
    .selectOption({ label: expected });
  await lab
    .getByLabel("Modelden gerekçen (en fazla 120 karakter)", { exact: true })
    .fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .click();
  await expect(lab.getByRole("status")).toContainText(
    "Sonuç seçimin modelle uyumlu.",
  );
}
const make = (
  id: string,
  interact: Parameters<typeof forge014Case>[3],
  assert: Parameters<typeof forge014Case>[4],
) =>
  forge014Case(
    forge014ChemistryLessons,
    id,
    `forge014:chemistry:${id}`,
    interact,
    assert,
  );
export const chemistry014Cases = [
  make(
    "su-hayat-cevre",
    async (_page, lab) => {
      await setRange(lab, "Yeni debi (L/dk)", 8);
      await setRange(lab, "Yeni kullanım süresi (dk)", 4);
      await setRange(lab, "Değişmeyen günlük kaçak (L)", 10);
      await compare(
        lab,
        "Toplam tüketim azalır; kalite için ek veri gerekir.",
        "70 L yerine 42 L; aynı kaçakla fark 28 L, kalite analiz edilmedi.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "70 L/gün",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "42 L/gün",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "28 L/gün",
      );
      await expect(lab.locator("[data-model-result]")).toContainText("%40");
      await expect(lab.locator('svg [data-water="new"]')).toHaveAttribute(
        "height",
        "96",
      );
    },
  ),
  make(
    "kutle-korunumu-sabit-oran",
    async (_page, lab) => {
      await setRange(lab, "Ayrışma ilerlemesi (%)", 50);
      await lab
        .getByLabel("Tartım sınırı", { exact: true })
        .selectOption("open");
      await compare(
        lab,
        "Kapta tartılan azalır; kap ve çıkan gaz toplamı 100 g kalır.",
        "50 g giren, 28 g katı ve 22 g dışarı çıkan gaz toplam 100 g eder.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("50 g");
      await expect(r).toContainText("28 g");
      await expect(r).toContainText("22 g");
      await expect(r).toContainText("78 g");
      await expect(lab.locator('svg [data-mass="carbonate"]')).toHaveAttribute(
        "width",
        "150",
      );
      await expect(lab.locator("svg")).toContainText("CO₂ dışarıda");
      const separated = await lab.locator("svg").evaluate((svg) => {
        const upper = (
          svg.querySelector('[data-mass="carbonate"]') as SVGGraphicsElement
        ).getBBox();
        const label = (
          svg.querySelector('[data-mass-label="oxide"]') as SVGGraphicsElement
        ).getBBox();
        const lower = (
          svg.querySelector('[data-mass="oxide"]') as SVGGraphicsElement
        ).getBBox();
        return {
          gapAbove: label.y - (upper.y + upper.height),
          gapBelow: lower.y - (label.y + label.height),
        };
      });
      expect(separated.gapAbove).toBeGreaterThan(0);
      expect(separated.gapBelow).toBeGreaterThan(0);
    },
  ),
  make(
    "sinirlayici-artan-madde",
    async (_page, lab) => {
      await setRange(lab, "Başlangıç Fe (g)", 17.5);
      await setRange(lab, "Başlangıç S (g)", 8);
      await compare(
        lab,
        "S sınırlayıcıdır.",
        "S iki tarif verir; 14 g Fe ve 8 g S tüketilir, 3,5 g Fe artar.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("S sınırlayıcıdır.");
      await expect(r).toContainText("22 g");
      await expect(r).toContainText("3,5 g");
      await expect(lab.locator('svg [data-reagent="S"]')).toHaveAttribute(
        "width",
        "0",
      );
      await expect(lab.locator('svg [data-reagent="Fe"]')).toHaveAttribute(
        "width",
        "24.5",
      );
    },
  ),
  make(
    "katli-oranlar",
    async (_page, lab) => {
      await lab
        .getByLabel("Eşitlenen element", { exact: true })
        .selectOption("y");
      await setRange(lab, "Referans element kütlesi (g)", 32);
      await compare(
        lab,
        "Eşit O için C(I)/C(II) = 2.",
        "32 g O için CO 24 g C, CO₂ 12 g C içerir; oran 2.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("32 g O");
      await expect(r).toContainText("24 g");
      await expect(r).toContainText("12 g");
      await expect(r).toContainText("I/II oranı: 2");
      await expect(
        lab.locator('svg [data-comparison="first"]'),
      ).toHaveAttribute("width", "350");
      await expect(
        lab.locator('svg [data-comparison="second"]'),
      ).toHaveAttribute("width", "175");
    },
  ),
  make(
    "mol-tanecik-iliskisi",
    async (_page, lab) => {
      await setRange(lab, "Örnek miktarı (mol)", 0.5);
      await lab.getByLabel("Sayım türü", { exact: true }).selectOption("ions");
      await compare(
        lab,
        "Tam ayrışma varsayımıyla toplam 1,5 mol iyon.",
        "0,5 mol Ca²⁺ ve 1 mol OH⁻ toplam 1,5 mol iyondur; OH⁻ tek iyondur.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("Toplam: 1,5 mol iyon");
      await expect(r).toContainText("Yük bilançosu: 0");
      await expect(lab.locator('svg [data-entity="Ca²⁺"]')).toHaveText(
        "Ca²⁺ × 1",
      );
      await expect(lab.locator('svg [data-entity="OH⁻"]')).toHaveText(
        "OH⁻ × 2",
      );
      await expect(lab.locator("svg")).toContainText("1 mol");
    },
  ),
  make(
    "mol-kutle-iliskisi",
    async (_page, lab) => {
      await lab.getByLabel("Saf madde", { exact: true }).selectOption("carbon");
      await setRange(lab, "Örnek kütlesi (g)", 11);
      await compare(
        lab,
        "n = 0,25 mol; toplam atom 0,75 mol.",
        "11/44 = 0,25 mol CO₂; üç atomla 0,75 mol toplam atom.",
      );
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("44 g/mol");
      await expect(r).toContainText("0,25 mol");
      await expect(r).toContainText("0,75 mol");
      await expect(r).toContainText("O atomu: 2 × 0,25 = 0,5 mol");
      await expect(lab.locator("svg [data-moles]")).toHaveText("0,25 mol");
    },
  ),
];
