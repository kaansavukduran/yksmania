import { expect, type Locator } from "@playwright/test";
import { forge015Case, setRange } from "./forge015-case-helper";
import { forge015ChemistryLessons } from "../../src/learning/forge015Chemistry";
async function compare(lab: Locator, reason: string) {
  await lab.getByLabel("Sonuç tahminin", { exact: true }).selectOption("0");
  await lab
    .getByLabel("Gerekçen (en çok 120 karakter)", { exact: true })
    .fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .click();
  await expect(lab.getByRole("status")).toContainText(
    "Seçimin modelle uyumlu.",
  );
}
const key = (id: string) => `forge015:chemistry:${id}`;
export const chemistry015Cases = [
  forge015Case(
    forge015ChemistryLessons,
    "gercek-kutle-akb-nk",
    key("gercek-kutle-akb-nk"),
    async (_, l) => {
      await setRange(l, "Basınç (atm)", 2);
      await compare(
        l,
        "Aynı n ve T için basınç iki kat; hacim yarı, kütle aynı.",
      );
    },
    async (_, l) => {
      await expect(l.locator("[data-model-result]")).toContainText("11,2 L");
      await expect(l.locator("[data-model-result]")).toContainText("32 g");
      expect(
        Number(
          await l
            .locator("[data-current-volume]")
            .getAttribute("data-current-volume"),
        ),
      ).toBeCloseTo(11.2, 8);
    },
  ),
  forge015Case(
    forge015ChemistryLessons,
    "tepkimeler-denklemler",
    key("tepkimeler-denklemler"),
    async (_, l) => {
      await setRange(l, "C₂H₆ katsayısı", 2);
      await setRange(l, "O₂ katsayısı", 7);
      await setRange(l, "CO₂ katsayısı", 4);
      await setRange(l, "H₂O katsayısı", 6);
      await compare(l, "C4, H12 ve O14 iki tarafta eşit; ortak bölen1.");
    },
    async (_, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "En küçük tam sayılarla denk.",
      );
      await expect(l.locator('[data-left="H"]')).toHaveText("12");
      await expect(l.locator('[data-right="O"]')).toHaveText("14");
    },
  ),
  forge015Case(
    forge015ChemistryLessons,
    "tepkime-turleri",
    key("tepkime-turleri"),
    async (_, l) => {
      await l
        .getByLabel("Tepkime örneği", { exact: true })
        .selectOption("agcl");
      await setRange(l, "Temsili ilerleme (mol)", 2);
      await compare(
        l,
        "Ag ve Cl yük basamakları aynı; çözeltiden yeni katı oluşur.",
      );
    },
    async (_, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Çökelme; bu net denklemde redoks yok.",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "AgCl: başlangıç 0 mol; son 2 mol.",
      );
      expect(
        Number(await l.locator('[data-bar="species-2"]').getAttribute("width")),
      ).toBeCloseTo(54.666666667, 6);
    },
  ),
  forge015Case(
    forge015ChemistryLessons,
    "denklemli-miktar-gecisi",
    key("denklemli-miktar-gecisi"),
    async (_, l) => {
      await setRange(l, "Tüketilen H₂ miktarı", 6);
      await compare(l, "6/2=3 mol H₂; 2/3 ile2 mol NH₃, 34 gram.");
    },
    async (_, l) => {
      await expect(l.locator("[data-model-result]")).toContainText("34 g");
      await expect(l.locator("[data-model-result]")).toContainText("28 g");
      expect(
        Number(await l.locator('[data-bar="ammonia"]').getAttribute("width")),
      ).toBeCloseTo(54.666666667, 6);
    },
  ),
  forge015Case(
    forge015ChemistryLessons,
    "sinirlayici-bilesen",
    key("sinirlayici-bilesen"),
    async (_, l) => {
      await setRange(l, "İlk H₂ kütlesi (g)", 12);
      await setRange(l, "İlk NH₃ kütlesi (g)", 17);
      await compare(l, "N₂1 mol sınırlar; yeni34 g ile ilk17 g toplam51 g.");
    },
    async (_, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "son NH₃ 51 g",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "H₂ 3 mol = 6 g",
      );
      expect(
        Number(
          await l.locator('[data-bar="final-product"]').getAttribute("width"),
        ),
      ).toBeCloseTo(123, 8);
    },
  ),
  forge015Case(
    forge015ChemistryLessons,
    "kati-kutlesi-degisimi",
    key("kati-kutlesi-degisimi"),
    async (_, l) => {
      await l
        .getByLabel("Katı dönüşümü", { exact: true })
        .selectOption("reduction");
      await setRange(l, "Numune kütlesi (g)", 80);
      await setRange(l, "Saf kısmın dönüşümü (%)", 50);
      await compare(l, "40 g CuO kalır,32 g Cu oluşur;72 g katı ve9 g su.");
    },
    async (_, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Son katı 72 g",
      );
      await expect(l.locator("[data-model-result]")).toContainText("su 9 g");
      expect(
        Number(
          await l.locator('[data-bar="solid-product"]').getAttribute("width"),
        ),
      ).toBeCloseTo(61.74117647, 6);
    },
  ),
  forge015Case(
    forge015ChemistryLessons,
    "yuzde-verim",
    key("yuzde-verim"),
    async (_, l) => {
      await setRange(l, "Ölçülen NH₃ (g)", 51);
      await compare(
        l,
        "Teori34 g,ölçülen51 g; %150 model üst sınırını aşıyor.",
      );
    },
    async (_, l) => {
      await expect(l.locator("[data-model-result]")).toContainText("%150");
      await expect(l.locator("[data-model-result]")).toContainText(
        "veri ve varsayımlar tutarsız",
      );
      expect(
        Number(await l.locator('[data-bar="actual"]').getAttribute("width")),
      ).toBeCloseTo(164, 8);
    },
  ),
  forge015Case(
    forge015ChemistryLessons,
    "safsizlik-problemleri",
    key("safsizlik-problemleri"),
    async (_, l) => {
      await setRange(l, "Numune kütlesi (g)", 50);
      await setRange(l, "CO₂ eldesi verimi (%)", 80);
      await compare(l, "8,8/0,8=11 g teori;25 g CaCO₃,50 g numunede%50.");
    },
    async (_, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "saflığı %50",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "CaCO₃ 25 g",
      );
      expect(
        Number(await l.locator('[data-bar="pure"]').getAttribute("width")),
      ).toBeCloseTo(82, 8);
    },
  ),
  forge015Case(
    forge015ChemistryLessons,
    "atom-kutlesi-hesaplari",
    key("atom-kutlesi-hesaplari"),
    async (_, l) => {
      await setRange(l, "Ağır izotop payı (%)", 75);
      await compare(l, "35×0,25+37×0,75=36,5 u; ağır atom daha bol.");
    },
    async (_, l) => {
      await expect(l.locator("[data-model-result]")).toContainText("36,5 u");
      await expect(l.locator("[data-model-result]")).toContainText(
        "Z = 17 sabit",
      );
      expect(
        Number(await l.locator('[data-bar="heavy"]').getAttribute("width")),
      ).toBeCloseTo(246, 8);
    },
  ),
  forge015Case(
    forge015ChemistryLessons,
    "tepkimeli-karisim",
    key("tepkimeli-karisim"),
    async (_, l) => {
      await setRange(l, "Ölçülen CO₂ (mol)", 0.8);
      await compare(l, "x+y0,5 ve x+2y0,8; y0,3, x0,2 mol.");
    },
    async (_, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "CH₄ 0,2 mol; C₂H₆ 0,3 mol",
      );
      await expect(l.locator("[data-model-result]")).toContainText("12,2 g");
      expect(
        Number(await l.locator('[data-bar="ethane"]').getAttribute("width")),
      ).toBeCloseTo(49.2, 8);
    },
  ),
  forge015Case(
    forge015ChemistryLessons,
    "karisim-sinif-cozunme",
    key("karisim-sinif-cozunme"),
    async (_, l) => {
      await setRange(l, "Eklenen bileşen (g)", 50);
      await setRange(l, "Çözünme gösterim adımı", 4);
      await l
        .getByLabel("Uygulanan işlem", { exact: true })
        .selectOption("filter");
      await compare(
        l,
        "36 g iyonik çözünmüş,14 g ayrı katı; iyonlar sıvıyla geçer.",
      );
    },
    async (_, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Çözünmüş 36 g; ayrı katı 14 g",
      );
      await expect(l.locator("[data-model-result]")).toContainText("136 g");
      await expect(l.locator("[data-dissolved]")).toHaveAttribute(
        "data-dissolved",
        "36",
      );
      await expect(l.locator("[data-undissolved]")).toHaveAttribute(
        "data-undissolved",
        "14",
      );
      await expect(l.locator("[data-filter]")).toHaveAttribute(
        "d",
        "M25 165H335",
      );
      expect(
        await l
          .locator("[data-filter]")
          .evaluate((el) => getComputedStyle(el).stroke),
      ).not.toBe("none");
      expect(
        Number.parseFloat(
          await l
            .locator("[data-filter]")
            .evaluate((el) => getComputedStyle(el).strokeWidth),
        ),
      ).toBeGreaterThan(0);
    },
  ),
  forge015Case(
    forge015ChemistryLessons,
    "cozelti-derisimi",
    key("cozelti-derisimi"),
    async (_, l) => {
      await setRange(l, "Eklenen su (g)", 200);
      await compare(l, "X0,5 mol ve20 g sabit; toplam400 g,%5 ve1,5 mol/L.");
    },
    async (_, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Kütlece %5",
      );
      await expect(l.locator("[data-model-result]")).toContainText("1,5 mol/L");
      await expect(l.locator("[data-model-result]")).toContainText(
        "çözelti 400 g",
      );
      expect(
        Number(await l.locator('[data-bar="water"]').getAttribute("width")),
      ).toBeCloseTo(178.057142857, 6);
    },
  ),
];
