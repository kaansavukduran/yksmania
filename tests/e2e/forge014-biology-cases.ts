import { expect, type Locator } from "@playwright/test";
import { forge014Case, setRange } from "./forge014-case-helper";
import { forge014BiologyLessons } from "../../src/learning/forge014Biology";

async function predict(lab: Locator, value: string) {
  const combo = lab.getByRole("combobox", {
    name: "Sonuç tahminin",
    exact: true,
  });
  await combo.selectOption(value);
  const label = await combo.locator("option:checked").textContent();
  await expect(lab.locator("[data-selected-prediction]")).toHaveText(
    `Seçili tahmin: ${label}`,
  );
  await lab
    .getByRole("textbox", { name: "Gerekçen", exact: true })
    .fill(
      "Modelin birimini, başlangıç koşullarını ve değişen bağlantıyı ayrı değerlendiriyorum.",
    );
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .tap();
  await expect(lab.locator(".bio014-feedback")).toContainText(
    "Seçimin bu modeldeki kanıtla uyumlu.",
  );
}
export const biology014Cases = [
  forge014Case(
    forge014BiologyLessons,
    "ekoloji-giris",
    "forge014-bio-ekoloji-giris",
    async (_p, lab) => {
      await setRange(lab, "Aynı türden kurbağa sayısı", 20);
      await lab
        .getByRole("checkbox", {
          name: "Alg ve bakteri popülasyonlarını ekle",
          exact: true,
        })
        .check();
      await lab
        .getByRole("checkbox", {
          name: "Su, ışık ve pH etkileşimlerini ekle",
          exact: true,
        })
        .check();
      await predict(lab, "ecosystem");
    },
    async (_p, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "İncelenen kapsam: Ekosistem kesiti",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Seçilen aynı tür bireyleri: 20",
      );
      await expect(lab.locator("[data-pond-frog]")).toHaveCount(20);
      await expect(lab.locator("[data-abiotic-layer]")).toHaveCount(1);
    },
  ),
  forge014Case(
    forge014BiologyLessons,
    "besin-piramidi",
    "forge014-bio-besin-piramidi",
    async (_p, lab) => {
      await setRange(lab, "Her aktarımda verim yüzdesi", 20);
      await predict(lab, "upright");
    },
    async (_p, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "İkincil tüketici: 400 J/m²/yıl",
      );
      await expect(lab.locator('[data-pyramid-level="3"]')).toHaveAttribute(
        "data-value",
        "400",
      );
      await expect(lab.locator('[data-pyramid-level="3"]')).toHaveAttribute(
        "width",
        "12",
      );
    },
  ),
  forge014Case(
    forge014BiologyLessons,
    "besin-zinciri-agi",
    "forge014-bio-besin-zinciri-agi",
    async (_p, lab) => {
      await lab
        .getByRole("checkbox", {
          name: "Kurbağayı bu ağdan kaldır",
          exact: true,
        })
        .check();
      await predict(lab, "one");
    },
    async (_p, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Şahin: 3. trofik düzey",
      );
      await expect(lab.locator('[data-food-node="frog"]')).toHaveCount(0);
      await expect(lab.locator("[data-food-edge]")).toHaveCount(3);
      await expect(lab.locator('[data-food-edge="mouse-hawk"]')).toHaveCount(1);
    },
  ),
  forge014Case(
    forge014BiologyLessons,
    "madde-donguleri",
    "forge014-bio-madde-donguleri",
    async (_p, lab) => {
      await lab
        .getByRole("combobox", { name: "İzlenen dönüşüm", exact: true })
        .selectOption("fixNitrogen");
      await predict(lab, "conserved");
    },
    async (_p, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Atmosfer N₂: 50 → 40 birim",
      );
      await expect(lab.locator('[data-reservoir="n2"]')).toHaveAttribute(
        "data-amount",
        "40",
      );
      await expect(lab.locator('[data-reservoir="nh4"]')).toHaveAttribute(
        "data-amount",
        "30",
      );
      for (const [key, label] of [
        ["n2", "N₂"],
        ["nh4", "NH₄⁺"],
        ["no2", "NO₂⁻"],
        ["no3", "NO₃⁻"],
        ["organic", "Org. N"],
      ]) {
        await expect(
          lab.locator(`svg [data-reservoir-label="${key}"]`),
        ).toHaveText(label);
        await expect(
          lab.locator(`[data-reservoir-legend="${key}"]`),
        ).toContainText(label);
      }
    },
  ),
  forge014Case(
    forge014BiologyLessons,
    "guncel-cevre-sorunlari",
    "forge014-bio-guncel-cevre-sorunlari",
    async (_p, lab) => {
      await lab
        .getByRole("combobox", { name: "İzlenen süreç basamağı", exact: true })
        .selectOption("3");
      await lab
        .getByRole("combobox", { name: "Müdahale", exact: true })
        .selectOption("nutrient");
      await predict(lab, "targeted");
    },
    async (_p, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Mevcut organik yükün etkisi hemen bitmez",
      );
      await expect(lab.locator("[data-nutrient-inflow]")).toHaveAttribute(
        "data-nutrient-inflow",
        "reduced",
      );
      await expect(lab.locator("[data-lake-respiration]")).toHaveCount(1);
      await expect(lab.locator("[data-oxygen-indicator]")).toHaveAttribute(
        "data-oxygen-indicator",
        "2",
      );
    },
  ),
  forge014Case(
    forge014BiologyLessons,
    "dogal-kaynaklar-surdurulebilirlik",
    "forge014-bio-dogal-kaynaklar-surdurulebilirlik",
    async (_p, lab) => {
      await setRange(lab, "Yıllık kullanım birimi", 20);
      await predict(lab, "same");
    },
    async (_p, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "5. yıl sonu stok: 100 temsili birim",
      );
      await expect(lab.locator('[data-stock-year="5"]')).toHaveAttribute(
        "data-stock",
        "100",
      );
      expect(
        Number(
          await lab.locator('[data-stock-year="5"]').getAttribute("height"),
        ),
      ).toBeCloseTo(220);
    },
  ),
];
