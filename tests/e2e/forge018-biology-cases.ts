import { expect, type Locator } from "@playwright/test";
import { forge018Case, setRange } from "./forge018-case-helper";
import { forge018BiologyLessons } from "../../src/learning/forge018Biology";
async function predict(lab: Locator, value: string) {
  await lab.getByLabel("Sonuç tahminin", { exact: true }).selectOption(value);
  await lab
    .getByLabel("Gerekçen", { exact: true })
    .fill("Değişen özel koşulu ve ayrı sağlam yolu kanıtta izliyorum.");
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .click();
  await expect(lab.locator(".bio018-feedback")).toContainText(
    "Seçimin bu modeldeki kanıtla uyumlu.",
  );
}
const family = (
  id: string,
  interact: Parameters<typeof forge018Case>[3],
  assertOutcome: Parameters<typeof forge018Case>[4],
) =>
  forge018Case(
    forge018BiologyLessons,
    id,
    "forge018-bio-" + id,
    interact,
    assertOutcome,
  );
export const biology018Cases = [
  family(
    "sindirim-bagirsaklar",
    async (_page, lab) => {
      await lab.getByLabel("Na gradyanı var", { exact: true }).uncheck();
      await predict(lab, "blocked");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "İlk çıkış: Bu yol engelli",
      );
      await expect(lab.locator('[data-flow="apical"]')).toHaveAttribute(
        "data-active",
        "false",
      );
      await expect(lab.locator('[data-flow="apical"]>path')).toHaveAttribute(
        "d",
        "M95,48L95,143",
      );
      await expect(
        lab.locator('[data-intestinal-exit="blood"]'),
      ).toHaveAttribute("data-active", "false");
      await expect(lab.locator("svg")).toContainText("Lümen");
    },
  ),
  family(
    "sindirim-enzimler-hormonlar",
    async (_page, lab) => {
      await lab
        .getByLabel("Bağırsak girdisi", { exact: true })
        .selectOption("nutrient");
      await lab.getByLabel("Başlatıcı enzim var", { exact: true }).uncheck();
      await setRange(lab, "Verilen kesim", 5);
      await predict(lab, "blocked");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "CCK: Enzim ve safra yanıtı",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "6 parça; 5 kalan bağ; 5 su",
      );
      await expect(lab.locator("[data-protease-active]")).toHaveAttribute(
        "data-protease-active",
        "false",
      );
      await expect(lab.locator('[data-flow="trypsin"]')).toHaveAttribute(
        "data-active",
        "false",
      );
      await expect(lab.locator("svg")).toContainText(
        "Amilaz yolu ayrı ve sağlam",
      );
    },
  ),
  family(
    "sindirim-karaciger-safra",
    async (_page, lab) => {
      await lab
        .getByLabel("Safra yolu", { exact: true })
        .selectOption("common");
      await setRange(lab, "Damlacık bölünme katsayısı", 3);
      await setRange(lab, "Geri dönen birim", 70);
      await predict(lab, "blocked");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Üretim sürer. Bağırsağa doğrudan yol: Engelli",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "27 eş damlacığın toplam yüzeyi 3 kattır",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "70 geri dönüş, 30 kayıp",
      );
      await expect(lab.locator('[data-bile-path="common"]')).toHaveAttribute(
        "data-active",
        "false",
      );
      await expect(lab.locator('[data-flow="common"]>path')).toHaveAttribute(
        "d",
        "M180,246L180,315",
      );
      await expect(lab.locator("svg")).toContainText("Koledok");
    },
  ),
  family(
    "sindirim-pankreas",
    async (_page, lab) => {
      await lab.getByLabel("Ekzokrin kanal açık", { exact: true }).uncheck();
      await predict(lab, "acid");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Asit kaldı: 8 eşdeğer. Baz kaldı: 0 eşdeğer",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Teslim edilen baz 0",
      );
      await expect(lab.locator("[data-pancreas-duct]")).toHaveAttribute(
        "data-pancreas-duct",
        "false",
      );
      await expect(
        lab.locator('[data-flow="pancreatic-duct"]'),
      ).toHaveAttribute("data-active", "false");
      await expect(lab.locator('[data-flow="endocrine"]')).toHaveAttribute(
        "data-active",
        "true",
      );
    },
  ),
  family(
    "dolasim-kalp",
    async (_page, lab) => {
      await lab
        .getByLabel("Çevrim evresi", { exact: true })
        .selectOption("isoContract");
      await setRange(lab, "Dakikadaki atım", 100);
      await predict(lab, "closed");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "AV kapaklar: Kapalı. Yarımay kapaklar: Kapalı",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "debi 7 L/dakika; çevrim 0,6 saniye",
      );
      for (const name of ["tricuspid", "mitral", "pulmonary", "aortic"])
        await expect(lab.locator(`[data-valve="${name}"]`)).toHaveAttribute(
          "data-open",
          "false",
        );
      await expect(lab.locator("svg")).toContainText(
        "Ventrikül".toLocaleLowerCase("tr-TR"),
      );
    },
  ),
  family(
    "dolasim-damarlar-starling",
    async (_page, lab) => {
      await setRange(lab, "Toplam alan (cm²)", 200);
      await setRange(lab, "Hidrostatik Pc (mmHg)", 15);
      await setRange(lab, "Lenf kapasitesi", 2);
      await predict(lab, "in");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Hız: 0,5 cm/s. Net fark: -10 mmHg (İçe)",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "birikim 1 hacim birimidir",
      );
      await expect(lab.locator("[data-starling-direction]")).toHaveAttribute(
        "data-starling-direction",
        "İçe",
      );
      await expect(lab.locator('[data-flow="starling"]>path')).toHaveAttribute(
        "d",
        "M100,246L100,140",
      );
      expect(
        Number(await lab.locator("[data-total-area]").getAttribute("width")),
      ).toBe(200);
      expect(
        Number(await lab.locator("[data-velocity]").getAttribute("width")),
      ).toBe(5);
    },
  ),
  family(
    "dolasim-kan-doku",
    async (_page, lab) => {
      await setRange(lab, "Eritrosit tabakası (mL)", 3);
      await lab.getByLabel("Trombosit yolu sağlam", { exact: true }).uncheck();
      await predict(lab, "fibrin");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Hct: %30",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Trombosit tıkacı yok, fibrin yolu sağlam",
      );
      await expect(lab.locator("[data-platelet-plug]")).toHaveAttribute(
        "data-platelet-plug",
        "false",
      );
      await expect(lab.locator("[data-fibrin-net]")).toHaveAttribute(
        "data-fibrin-net",
        "true",
      );
      expect(
        Number(await lab.locator("[data-packed-cells]").getAttribute("height")),
      ).toBeCloseTo(48);
    },
  ),
  family(
    "lenf-sistemi",
    async (_page, lab) => {
      await lab
        .getByLabel("Başlangıç bölgesi", { exact: true })
        .selectOption("legs");
      await lab.getByLabel("Seçili lenf yolu kapalı", { exact: true }).check();
      await predict(lab, "thoracic");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Bacaklar → Göğüs kanalı → Sol venöz köşe",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Gerçek çıkış 0 mL; son doku sıvısı 15 mL",
      );
      await expect(
        lab.locator('[data-lymph-route="thoracic"]'),
      ).toHaveAttribute("data-open", "false");
      await expect(lab.locator("[data-lymph-origin]")).toHaveAttribute(
        "cy",
        "320",
      );
      expect(
        await lab.locator("svg").evaluate((svg) => {
          const body =
            svg.querySelector<SVGGeometryElement>("[data-lymph-body]")!;
          const origin = svg.querySelector<SVGCircleElement>(
            "[data-lymph-origin]",
          )!;
          return body.isPointInFill(
            new DOMPoint(origin.cx.baseVal.value, origin.cy.baseVal.value),
          );
        }),
      ).toBe(true);
      await expect(lab.locator("svg")).toContainText("Alt bölgeler → sol köşe");
    },
  ),
  family(
    "bagisiklik-sistemi",
    async (_page, lab) => {
      await lab
        .getByLabel("Karşılaşılan antijen", { exact: true })
        .selectOption("b");
      await lab.getByLabel("Hazır A antikoru var", { exact: true }).check();
      await lab.getByLabel("T için uygun sunum var", { exact: true }).uncheck();
      await setRange(lab, "Geçen gün", 8);
      await predict(lab, "primary");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Bu antijen için birincil yanıt",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Hazır anti-A miktarı 8 birim. Seçili hedefe eşleşme: Yok",
      );
      await expect(
        lab.locator('[data-antigen-shape="b"] rect'),
      ).toHaveAttribute("width", "40");
      await expect(lab.locator("[data-memory-match]")).toHaveAttribute(
        "data-memory-match",
        "false",
      );
      await expect(lab.locator("[data-memory-match]")).toHaveAttribute(
        "data-passive-match",
        "false",
      );
      await expect(lab.locator('[data-flow="presentation"]')).toHaveAttribute(
        "data-active",
        "false",
      );
    },
  ),
];
