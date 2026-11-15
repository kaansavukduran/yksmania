import { expect, type Locator } from "@playwright/test";
import { forge017Case, setRange } from "./forge017-case-helper";
import { forge017ChemistryALessons } from "../../src/learning/forge017ChemistryA";

async function compare(lab: Locator, prediction: string, reason: string) {
  await lab.getByRole("button", { name: prediction, exact: true }).click();
  await lab
    .getByLabel("Gerekçen (en çok 120 karakter)", { exact: true })
    .fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .click();
  await expect(lab.locator('.a017-feedback[role="status"]')).toContainText(
    "Seçimin modelle uyumlu.",
  );
}
const key = (id: string) => `forge017:chemistry-a:${id}`;
export const chemistryA017Cases = [
  forge017Case(
    forge017ChemistryALessons,
    "asit-baz-metaller",
    key("asit-baz-metaller"),
    async (_, l) => {
      await l
        .getByRole("button", { name: "Cu ve derişik HNO₃", exact: true })
        .click();
      await setRange(l, "İlk metal (mol)", 0.3);
      await setRange(l, "İlk asit veya baz (mol)", 0.8);
      await compare(
        l,
        "NO₂",
        "Asit 0,8/4 ile 0,2 mol Cu tüketir; iki katı NO₂ verir.",
      );
    },
    async (_, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "NO₂: 0,4 mol",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "Artan Cu: 0,1 mol",
      );
      expect(
        Number(await l.locator("[data-gas-mol]").getAttribute("data-gas-mol")),
      ).toBeCloseTo(0.4, 10);
      expect(
        Number(
          await l.locator("[data-metal-left]").getAttribute("data-metal-left"),
        ),
      ).toBeCloseTo(0.1, 10);
    },
  ),
  forge017Case(
    forge017ChemistryALessons,
    "hayatimizda-asit-baz",
    key("hayatimizda-asit-baz"),
    async (_, l) => {
      await setRange(l, "Asit bütçesi (mol H⁺)", 0.4);
      await compare(
        l,
        "Asit kalır",
        "0,1 mol karbonat 0,2 mol H⁺ tüketir; 0,2 mol H⁺ artar.",
      );
    },
    async (_, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "CO₂: 0,1 mol",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "Artan H⁺: 0,2 mol",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "Çözünen katı: 10 g",
      );
      expect(
        Number(
          await l
            .locator("[data-carbon-dioxide]")
            .getAttribute("data-carbon-dioxide"),
        ),
      ).toBeCloseTo(0.1, 10);
      expect(
        Number(
          await l.locator("[data-stone-left]").getAttribute("data-stone-left"),
        ),
      ).toBe(0);
    },
  ),
  forge017Case(
    forge017ChemistryALessons,
    "sabun-deterjan-temizlik",
    key("sabun-deterjan-temizlik"),
    async (_, l) => {
      await setRange(l, "İlk Ca²⁺ (mmol)", 8);
      await l.getByRole("button", { name: "Durulama", exact: true }).click();
      await compare(
        l,
        "Ca²⁺",
        "10 mmol sabun 5 mmol Ca²⁺ bağlar; 3 mmol Ca²⁺ kalır.",
      );
    },
    async (_, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Çökelek: 5 mmol",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "Serbest sabun: 0 mmol",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "Artan Ca²⁺: 3 mmol",
      );
      expect(
        Number(
          await l
            .locator("[data-soap-precipitate]")
            .getAttribute("data-soap-precipitate"),
        ),
      ).toBe(5);
      await expect(l.locator("[data-soap-head]")).toHaveCount(0);
    },
  ),
  forge017Case(
    forge017ChemistryALessons,
    "polimer-kozmetik-ilac",
    key("polimer-kozmetik-ilac"),
    async (_, l) => {
      await l.getByRole("button", { name: "PVC", exact: true }).click();
      await setRange(l, "Tekrar sayısı", 4);
      await compare(
        l,
        "C, H ve Cl",
        "C₂H₃Cl tekrarı dört kat; C8, H12 ve Cl4.",
      );
    },
    async (_, l) => {
      await expect(l.locator("[data-model-result]")).toContainText("250 u");
      await expect(l.locator("[data-atom-totals]")).toContainText(
        "C: 8 · H: 12 · Cl: 4",
      );
      await expect(l.locator("[data-repeat-index]")).toHaveCount(4);
      await expect(
        l.locator("svg text").filter({ hasText: "–CH₂–CHCl–" }),
      ).toHaveCount(4);
    },
  ),
  forge017Case(
    forge017ChemistryALessons,
    "polimer-gida-ilac-yag",
    key("polimer-gida-ilac-yag"),
    async (_, l) => {
      await setRange(l, "Porsiyon (g ürün)", 50);
      await compare(
        l,
        "Doymuş yağ daha az",
        "100 gramın yarısı; toplam yağ 10 g, bunun 4 gramı doymuş.",
      );
    },
    async (_, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "toplam yağ: 10 g",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "doymuş kısmı 4 g",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "Protein: 2,5 g",
      );
      expect(
        Number(
          await l.locator('[data-food="fat"]').getAttribute("data-food-value"),
        ),
      ).toBe(10);
      expect(
        Number(await l.locator('[data-food="fat"]').getAttribute("width")),
      ).toBeCloseTo(88, 10);
      expect(
        Number(
          await l
            .locator('[data-food="saturated"]')
            .getAttribute("data-food-value"),
        ),
      ).toBe(4);
    },
  ),
];
