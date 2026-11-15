import { expect, type Locator } from "@playwright/test";
import { forge019Case, setRange } from "./forge019-case-helper";
import { forge019BiologyLessons } from "../../src/learning/forge019Biology";
async function predict(lab: Locator, value: string) {
  await lab.getByLabel("Sonuç tahminin", { exact: true }).selectOption(value);
  await lab
    .getByLabel("Gerekçen", { exact: true })
    .fill("Değişen koşulu, yönü ve korunmuş toplamı kanıtta izliyorum.");
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .click();
  await expect(lab.locator(".bio019-feedback")).toContainText(
    "Seçimin bu modeldeki kanıtla uyumlu.",
  );
}
const family = (
  id: string,
  act: Parameters<typeof forge019Case>[3],
  check: Parameters<typeof forge019Case>[4],
) => forge019Case(forge019BiologyLessons, id, "forge019-bio-" + id, act, check);
export const biology019Cases = [
  family(
    "solunum-organlar",
    async (_page, lab) => {
      await setRange(lab, "Fark: alveol eksi kan", -3);
      await setRange(lab, "Bariyer kalınlığı T", 2);
      await predict(lab, "out");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Net akış: -3 model birimi; kandan alveole.",
      );
      await expect(lab.locator('[data-flow="gas"]>path')).toHaveAttribute(
        "d",
        "M280,180L144,180",
      );
      await expect(lab.locator("[data-barrier-thickness]")).toHaveAttribute(
        "width",
        "16",
      );
      await expect(lab.locator("[data-flux-label]")).toContainText("-3");
    },
  ),
  family(
    "soluk-alisverisi",
    async (_page, lab) => {
      for (const phase of ["inhale", "exhale", "endOut"]) {
        await lab
          .getByLabel("Soluk evresi", { exact: true })
          .selectOption(phase);
        const high = phase !== "inhale";
        await expect(
          lab.locator('[data-breath-shape="lungs"]'),
        ).toHaveAttribute(
          "d",
          high
            ? "M170 60H190V110Q245 75 282 145Q300 160 205 155L180 135L155 155Q60 160 78 145Q115 75 170 110Z"
            : "M170 60H190V110Q245 75 282 145Q300 255 205 250L180 135L155 250Q60 255 78 145Q115 75 170 110Z",
        );
        const clearance = await lab.locator("svg").evaluate((svg) => {
          const lung = (
            svg.querySelector('[data-breath-shape="lungs"]') as SVGPathElement
          ).getBBox();
          const diaphragm = (
            svg.querySelector(
              '[data-breath-shape="diaphragm"]',
            ) as SVGPathElement
          ).getBBox();
          return diaphragm.y - (lung.y + lung.height);
        });
        expect(clearance).toBeGreaterThanOrEqual(8);
      }
      await lab
        .getByLabel("Soluk evresi", { exact: true })
        .selectOption("endIn");
      await setRange(lab, "Tidal hacim (mL)", 250);
      await setRange(lab, "Dakikada soluk", 24);
      await predict(lab, "zero");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Net akış: 0; alveoler yeni hava: 2,4 L/dakika.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Toplam: 6 L/dakika",
      );
      await expect(lab.locator("[data-diaphragm-y]")).toHaveAttribute(
        "data-diaphragm-y",
        "260",
      );
      await expect(lab.locator('[data-flow="air"]')).toHaveCount(0);
      await expect(lab.locator("svg")).toContainText("Palv: 0 cmH₂O");
      await expect(lab.locator('[data-breath-shape="chest"]')).toHaveAttribute(
        "d",
        "M30 88Q180 35 330 88L330 275Q180 315 30 275Z",
      );
      await expect(lab.locator('[data-breath-shape="lungs"]')).toHaveAttribute(
        "d",
        "M170 60H190V110Q245 75 282 145Q300 255 205 250L180 135L155 250Q60 255 78 145Q115 75 170 110Z",
      );
      await expect(
        lab.locator('[data-breath-shape="diaphragm"]'),
      ).toHaveAttribute("d", "M35 260Q180 288 325 260");
      const shapes = await lab
        .locator("[data-breath-shape]")
        .evaluateAll((elements) =>
          elements.map((element) => {
            const path = element as SVGPathElement,
              box = path.getBBox(),
              view = path.ownerSVGElement!.viewBox.baseVal;
            return {
              x: box.x,
              y: box.y,
              right: box.x + box.width,
              bottom: box.y + box.height,
              width: view.width,
              height: view.height,
              length: path.getTotalLength(),
            };
          }),
        );
      expect(shapes).toHaveLength(3);
      for (const shape of shapes) {
        expect(shape.x).toBeGreaterThanOrEqual(0);
        expect(shape.y).toBeGreaterThanOrEqual(0);
        expect(shape.right).toBeLessThanOrEqual(shape.width);
        expect(shape.bottom).toBeLessThanOrEqual(shape.height);
        expect(shape.length).toBeGreaterThan(0);
      }
    },
  ),
  family(
    "solunum-gaz-tasinmasi",
    async (_page, lab) => {
      await lab
        .getByLabel("Kılcal bölgesi", { exact: true })
        .selectOption("lung");
      await setRange(lab, "Ortalama doluluk (%)", 50);
      await lab
        .getByLabel("Aynı basınçta pH örneği", { exact: true })
        .selectOption("low");
      await setRange(lab, "Eğride O₂ basıncı P", 34);
      await predict(lab, "in");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Bağlı O₂: 20; kapasite: 40 model birimi.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "bikarbonat 140",
      );
      await expect(
        lab.locator('[data-flow="bicarbonate"]>path'),
      ).toHaveAttribute("d", "M237,324L120,324");
      await expect(lab.locator("[data-curve-saturation]")).toHaveAttribute(
        "data-curve-saturation",
        "50",
      );
      await expect(lab.locator("[data-oxygen-curve]")).toHaveAttribute(
        "data-oxygen-curve",
        "low",
      );
    },
  ),
  family(
    "uriner-organlar",
    async (_page, lab) => {
      await lab
        .getByLabel("Seçici engel", { exact: true })
        .selectOption("left");
      await predict(lab, "up");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Son mesane: 60 mL; gerçek çıkış: 0 mL.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Engel üstünde kalan: 10 mL",
      );
      await expect(lab.locator('[data-flow="left-ureter"]')).toHaveAttribute(
        "data-active",
        "false",
      );
      await expect(lab.locator('[data-flow="right-ureter"]')).toHaveAttribute(
        "data-active",
        "true",
      );
      await expect(lab.locator("[data-ureter-stop]")).toHaveAttribute(
        "d",
        "M250 208h38",
      );
      const sideGaps = await lab.locator("svg").first().evaluate((svg) => {
        const right = svg.querySelector<SVGGraphicsElement>('[data-urinary-side="right"]')!.getBBox();
        const left = svg.querySelector<SVGGraphicsElement>('[data-urinary-side="left"]')!.getBBox();
        return { right: 91 - 2.5 - (right.x + right.width), left: left.x - (269 + 2.5) };
      });
      expect(sideGaps.right).toBeGreaterThanOrEqual(8);
      expect(sideGaps.left).toBeGreaterThanOrEqual(8);
    },
  ),
  family(
    "nefron-isleyisi",
    async (_page, lab) => {
      await setRange(lab, "Glikoz (mg/mL)", 4);
      await lab.getByLabel("ADH etkisi var", { exact: true }).check();
      await predict(lab, "excess");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Glikoz: 400 süzülen; 300 geri alınan; 100 atılan mg / dakika.",
      );
      expect(
        Number(
          await lab.locator('[data-glucose-load="F"]').getAttribute("width"),
        ),
      ).toBeCloseTo((400 * 200) / 750);
      expect(
        Number(
          await lab.locator('[data-glucose-load="E"]').getAttribute("width"),
        ),
      ).toBeCloseTo((100 * 200) / 750);
      await expect(lab.locator("[data-water-permeable]")).toHaveAttribute(
        "data-water-permeable",
        "true",
      );
      await expect(lab.locator('[data-flow="water"]')).toHaveAttribute(
        "data-active",
        "true",
      );
      await expect(
        lab.locator('[data-nephron-region="collecting"]'),
      ).toHaveAttribute("data-selected", "true");
    },
  ),
  family(
    "erkek-ureme-organlari",
    async (_page, lab) => {
      await lab
        .getByLabel("Gelişim evresi", { exact: true })
        .selectOption("sperm");
      await lab.getByLabel("Vas deferens yolu açık", { exact: true }).uncheck();
      await lab
        .getByLabel("İzlenen hormon kolu", { exact: true })
        .selectOption("inhibin");
      await predict(lab, "same");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "12 hücre; hücre başına 23 kromozom ve 1C DNA.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Toplam DNA: 12C",
      );
      await expect(lab.locator('[data-sperm-cell="sperm"]')).toHaveCount(12);
      await expect(lab.locator("[data-flagellum]")).toHaveCount(12);
      await expect(lab.locator("[data-vas-open]")).toHaveAttribute(
        "data-vas-open",
        "false",
      );
      await expect(lab.locator('[data-flow="vas"]')).toHaveAttribute(
        "data-active",
        "false",
      );
      await expect(lab.locator('[data-hormone-cell="sertoli"]')).toHaveText(
        "Sertoli",
      );
      await expect(lab.locator("[data-hormone-route]")).toHaveAttribute(
        "data-hormone-route",
        "inhibin",
      );
    },
  ),
];
