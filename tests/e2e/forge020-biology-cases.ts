import { expect, type Locator } from "@playwright/test";
import { forge020Case, setRange } from "./forge020-case-helper";
import { forge020BiologyLessons } from "../../src/learning/forge020Biology";
async function predict(lab: Locator, value: string) {
  await lab.getByLabel("Tahminin", { exact: true }).selectOption(value);
  await lab
    .getByLabel("Gerekçen", { exact: true })
    .fill("Verilen koşulu ve değişen sayıyı kanıtla birlikte izliyorum.");
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .click();
  await expect(lab.locator('.bio020-feedback[role="status"]')).toContainText(
    "Seçimin bu kanıtla uyumlu.",
  );
}
const family = (
  id: string,
  exploration: string,
  interact: Parameters<typeof forge020Case>[3],
  outcome: Parameters<typeof forge020Case>[4],
) => forge020Case(forge020BiologyLessons, id, exploration, interact, outcome);
export const biology020Cases = [
  family(
    "ureme-kadin-organlar",
    "forge020-bio-female",
    async (_page, lab) => {
      await setRange(lab, "Yol adımı", 4);
      await lab
        .getByLabel("Şemanın solundaki tüp açık", { exact: true })
        .uncheck();
      await lab.getByLabel("Yapı", { exact: true }).selectOption("uterus");
      await predict(lab, "blocked");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Hücre: Kanal girişi.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Seçili yapı: Rahim.",
      );
      await expect(lab.locator("[data-route-step]")).toHaveAttribute(
        "data-route-step",
        "1",
      );
      await expect(lab.locator("[data-tube-stop]")).toHaveAttribute(
        "d",
        "M116 58l18 22",
      );
      await expect(lab.locator('[data-female-organ="uterus"]')).toHaveClass(
        /bio020-selected/,
      );
    },
  ),
  family(
    "ureme-gametogenez",
    "forge020-bio-gametes",
    async (_page, lab) => {
      await lab.getByLabel("Evre", { exact: true }).selectOption("products");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "İşlevsel son gamet: 0",
      );
      await lab.getByLabel("Döllenme sinyali var", { exact: true }).check();
      await expect(lab.locator("[data-polar-cell]")).toHaveCount(2);
      await lab.getByLabel("Gamet yolu", { exact: true }).selectOption("sperm");
      await predict(lab, "ready");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "İşlevsel son gamet: 4",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "23 kromozom; 23 kromatit; 1C DNA",
      );
      await expect(lab.locator("[data-main-cell]")).toHaveCount(4);
      await expect(lab.locator("[data-polar-cell]")).toHaveCount(0);
    },
  ),
  family(
    "ureme-menstrual-dongu",
    "forge020-bio-cycle",
    async (_page, lab) => {
      await setRange(lab, "Döngü günü", 28);
      await expect(lab.locator('[data-hormone="P"]')).toHaveAttribute(
        "height",
        "9",
      );
      await lab
        .getByLabel("Erken hCG desteği modeli açık", { exact: true })
        .check();
      await predict(lab, "luteal");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Gün 28: Luteal evre; rahim: Salgı.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText("P 80");
      await expect(lab.locator('[data-hormone="P"]')).toHaveAttribute(
        "height",
        "144",
      );
      const titleGap = await lab
        .locator("svg")
        .first()
        .evaluate((svg) => {
          const labels = [...svg.querySelectorAll("text")];
          const tick = labels.find(
            (text) => text.textContent?.trim() === "100",
          );
          const title = labels.find(
            (text) => text.textContent?.trim() === "Ayrı göreli ölçekler",
          );
          if (!tick || !title)
            throw new Error("Menstrual axis tick or title missing");
          return (
            title.getBoundingClientRect().left -
            tick.getBoundingClientRect().right
          );
        });
      expect(
        titleGap,
        "Axis value and chart title have a visible physical gap",
      ).toBeGreaterThanOrEqual(8);
      await expect(lab.locator('[data-hormone="P"]')).toHaveAttribute(
        "y",
        "106",
      );
    },
  ),
  family(
    "ureme-embriyonik-gelisim",
    "forge020-bio-embryo",
    async (_page, lab) => {
      await setRange(lab, "Bölünme turu", 4);
      await expect(lab.locator("[data-blastomere]")).toHaveCount(16);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "ortalama 8 birim / hücre",
      );
      await lab
        .getByLabel("Gelişim evresi", { exact: true })
        .selectOption("layers");
      await lab
        .getByLabel("Embriyonik tabaka", { exact: true })
        .selectOption("meso");
      await predict(lab, "meso");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Mezoderm: Kas, kemik, dolaşım ve böbrek dokuları.",
      );
      await expect(
        lab.locator('[data-embryonic-layer="meso"]'),
      ).toHaveAttribute("data-selected", "true");
      await expect(
        lab.locator('[data-embryonic-layer="ecto"]'),
      ).toHaveAttribute("data-selected", "false");
      await expect(lab.locator("[data-blastomere]")).toHaveCount(0);
    },
  ),
  family(
    "ekoloji-komunite",
    "forge020-bio-community",
    async (_page, lab) => {
      await setRange(lab, "A bir arada", 10);
      await setRange(lab, "B bir arada", 12);
      await predict(lab, "−0");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "A: -10; B: 0 birey.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Bir zarar; ötekinde net fark yok",
      );
      await expect(lab.locator('[data-community-bar="1"]')).toHaveAttribute(
        "height",
        "60",
      );
      await expect(lab.locator('[data-community-bar="3"]')).toHaveAttribute(
        "height",
        "72",
      );
    },
  ),
  family(
    "ekoloji-populasyon",
    "forge020-bio-population",
    async (_page, lab) => {
      await setRange(lab, "Doğum", 0);
      await setRange(lab, "Ölüm", 30);
      await setRange(lab, "K: kapasite", 50);
      await predict(lab, "down");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Son sayı: 68; fark: -32 birey.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Ayrı lojistik anlık hız: -20 birey/yıl.",
      );
      const height = Number(
        await lab.locator('[data-population-bar="Son"]').getAttribute("height"),
      );
      expect(height).toBeCloseTo(115.6);
      await expect(lab.locator("[data-logistic-point]")).toHaveAttribute(
        "cx",
        "303",
      );
      await expect(lab.locator("[data-logistic-point]")).toHaveAttribute(
        "cy",
        "215",
      );
    },
  ),
  family(
    "nukleik-asitler-yapi",
    "forge020-bio-nucleic",
    async (_page, lab) => {
      await lab.getByLabel("Dizi (5′ → 3′)", { exact: true }).fill("AX");
      await lab
        .getByRole("button", { name: "Diziyi uygula", exact: true })
        .click();
      await expect(lab.getByRole("alert")).toContainText(
        "Son geçerli sonuç korunur",
      );
      await expect(lab.locator("[data-base-top]")).toHaveCount(4);
      await lab.getByLabel("Dizi (5′ → 3′)", { exact: true }).fill("AGT");
      await lab
        .getByRole("button", { name: "Diziyi uygula", exact: true })
        .click();
      await lab
        .getByLabel("Omurga halkasal ve kesintisiz", { exact: true })
        .check();
      await predict(lab, "ring");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "6 nükleotit; omurgada 6 bağ.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Hidrojen bağı: 7",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "5′ — A C T — 3′",
      );
      await expect(lab.locator("[data-base-top]")).toHaveText(["A", "G", "T"]);
      await expect(lab.locator("[data-base-bottom]")).toHaveText([
        "T",
        "C",
        "A",
      ]);
      await expect(lab.locator("[data-circular-backbone]")).toHaveCount(2);
    },
  ),
  family(
    "kalitim-molekulu-kesfi",
    "forge020-bio-discovery",
    async (_page, lab) => {
      await lab.getByLabel("Deney", { exact: true }).selectOption("avery");
      await lab
        .getByLabel("Deney grubu", { exact: true })
        .selectOption("dnase");
      await expect(lab.locator("[data-dna-intact]")).toHaveAttribute(
        "data-dna-intact",
        "false",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "R → S dönüşümü yok",
      );
      await lab.getByLabel("Deney", { exact: true }).selectOption("phage");
      await lab.getByLabel("Deney grubu", { exact: true }).selectOption("S35");
      await predict(lab, "top");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Çoğu işaret üst sıvıda",
      );
      await expect(lab.locator("[data-isotope-compartment]")).toHaveAttribute(
        "data-isotope-compartment",
        "top",
      );
      await expect(lab.locator("[data-isotope-compartment]")).toHaveAttribute(
        "y",
        "108",
      );
    },
  ),
];
