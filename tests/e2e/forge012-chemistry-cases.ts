import { expect, type Locator } from "@playwright/test";
import { forge012Case, setRange } from "./forge012-case-helper";
import { forge012ChemistryLessons } from "../../src/learning/forge012Chemistry";
async function predict(lab: Locator, expected: string) {
  await lab
    .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
    .selectOption({ label: expected });
  await lab
    .getByRole("textbox", { name: "Modelden gerekçen", exact: true })
    .fill(
      "Değişen koşulu ve korunan miktarı modelin sayısal sonucuyla karşılaştırdım.",
    );
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .tap();
}
export const chemistry012Cases = [
  forge012Case(
    forge012ChemistryLessons,
    "katilar-viskozite",
    "forge012:chemistry:katilar-viskozite",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Katı örneği", exact: true })
        .selectOption("graphite");
      await l
        .getByRole("combobox", { name: "Deney sıcaklığı", exact: true })
        .selectOption("40");
      await setRange(l, "Geçen süre (s)", 45);
      await predict(l, "Kovalent ağ; 20 mL aktı");
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Grafit · Kovalent ağ",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "20 mL aktı",
      );
      await expect(l.locator("[data-flow-volume]")).toHaveAttribute(
        "height",
        "85",
      );
      await expect(l.locator("[data-carbon-atom]")).toHaveCount(12);
      expect(await l.locator("[data-carbon-atom]").allTextContents()).toEqual(
        Array(12).fill("C"),
      );
      expect(
        await l
          .locator("[data-solid-particle]")
          .evaluateAll(
            (atoms) =>
              new Set(atoms.map((atom) => getComputedStyle(atom).fill)).size,
          ),
      ).toBe(1);
      await expect(l.locator(".c012-feedback")).toContainText(
        "Sonuç seçimin modelle uyumlu.",
      );
    },
  ),
  forge012Case(
    forge012ChemistryLessons,
    "buharlasma-buhar-basinci",
    "forge012:chemistry:buharlasma-buhar-basinci",
    async (_p, l) => {
      await l
        .getByRole("spinbutton", { name: "Toplam su (g)", exact: true })
        .fill("0.01");
      await setRange(l, "Yüzey modeli", 3);
      await predict(l, "Sıvı bitti; basınç doygunluğun altında");
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText("5,16 mmHg");
      await expect(l.locator("[data-liquid]")).toHaveCount(0);
      await expect(l.locator("[data-two-way-flow]")).toHaveCount(0);
      await expect(l.locator(".c012-feedback")).toContainText(
        "Sonuç seçimin modelle uyumlu.",
      );
    },
  ),
  forge012Case(
    forge012ChemistryLessons,
    "kaynama-bagil-nem",
    "forge012:chemistry:kaynama-bagil-nem",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Dış basınç", exact: true })
        .selectOption("3");
      await l
        .getByRole("spinbutton", {
          name: "Başlangıç su buharı basıncı (mmHg)",
          exact: true,
        })
        .fill("5.95");
      await predict(l, "Doygunluk altı; bağıl nem %25");
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Kaynama eşiği: 50 °C",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "bağıl nem %25",
      );
      await expect(l.locator("[data-humidity-fill]")).toHaveAttribute(
        "height",
        "47.75",
      );
      await expect(l.locator(".c012-feedback")).toContainText(
        "Sonuç seçimin modelle uyumlu.",
      );
    },
  ),
  forge012Case(
    forge012ChemistryLessons,
    "gazlar-hal-degisim-plazma",
    "forge012:chemistry:gazlar-hal-degisim-plazma",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "İncelenen model", exact: true })
        .selectOption("plasma");
      await setRange(l, "İyonlaşan atom sayısı", 6);
      await predict(l, "Net yük sıfır; elektron ve iyon sayıları eşit");
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Net yük: 0e",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "6 pozitif iyon; 6 serbest elektron; 6 nötr atom",
      );
      await expect(l.locator("[data-free-electron]")).toHaveCount(6);
      await expect(l.locator("[data-ionised=true]")).toHaveCount(6);
      await expect(l.locator(".c012-feedback")).toContainText(
        "Sonuç seçimin modelle uyumlu.",
      );
    },
  ),
  forge012Case(
    forge012ChemistryLessons,
    "doga-ve-kimya",
    "forge012:chemistry:doga-ve-kimya",
    async (_p, l) => {
      await l
        .getByRole("checkbox", {
          name: "Filtre: askıda katıyı %90 azalt",
          exact: true,
        })
        .check();
      await predict(
        l,
        "Askıda katı azalır; tüm bileşenler otomatik sıfır olmaz",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Askıda katı: başlangıç 100 mg; kalan 10 mg",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "kalan 2.000 mg CaCO₃",
      );
      await expect(
        l.locator('[data-treatment-bar="suspended"]'),
      ).toHaveAttribute("width", "50");
      await expect(
        l.locator('[data-treatment-bar="hardness"]'),
      ).toHaveAttribute("width", "500");
      await expect(l.locator(".c012-feedback")).toContainText(
        "Sonuç seçimin modelle uyumlu.",
      );
    },
  ),
];

export async function solidSymbolContrast(lab: Locator) {
  return lab
    .locator("[data-carbon-atom],[data-solid-charge]")
    .evaluateAll((symbols) => {
      const luminance = (color: string) => {
        const channels = color
          .match(/[\d.]+/g)!
          .slice(0, 3)
          .map(Number)
          .map((value) => {
            const n = value / 255;
            return n <= 0.04045 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4;
          });
        return (
          channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
        );
      };
      return symbols.map((symbol) => {
        const atom = symbol.parentElement!.querySelector("circle")!;
        const a = luminance(getComputedStyle(symbol).fill),
          b = luminance(getComputedStyle(atom).fill);
        return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
      });
    });
}
