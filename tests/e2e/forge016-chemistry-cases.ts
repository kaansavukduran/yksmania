import { expect, type Locator } from "@playwright/test";
import { forge016Case, setRange } from "./forge016-case-helper";
import { forge016ChemistryLessons } from "../../src/learning/forge016Chemistry";
async function compare(lab: Locator, reason: string) {
  await lab.getByLabel("Sonuç tahminin", { exact: true }).selectOption("0");
  await lab
    .getByLabel("Gerekçen (en çok 120 karakter)", { exact: true })
    .fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .click();
  await expect(lab.locator(".c016-feedback[role='status']")).toContainText(
    "Seçimin modelle uyumlu.",
  );
}
const key = (id: string) => `forge016:chemistry:${id}`;
export const chemistry016Cases = [
  forge016Case(
    forge016ChemistryLessons,
    "koligatif-ayirma",
    key("koligatif-ayirma"),
    async (_, l) => {
      await setRange(l, "Çözünen miktarı (mol)", 0.1);
      await l
        .getByLabel("Çözünme varsayımı", { exact: true })
        .selectOption("2");
      await compare(
        l,
        "0,10 mol NaCl, tam ayrışma ile 0,20 mol iyon; 1 kg suda alçalma 0,372 °C.",
      );
    },
    async (_, l) => {
      await expect(l.locator("[data-model-result]")).toContainText("0,372 °C");
      await expect(l.locator("[data-model-result]")).toContainText(
        "100,104 °C",
      );
      expect(
        Number(
          await l
            .locator("[data-freezing-drop]")
            .getAttribute("data-freezing-drop"),
        ),
      ).toBeCloseTo(0.372, 12);
      expect(
        Number(await l.locator("[data-current-solute]").getAttribute("cx")),
      ).toBeCloseTo(450, 8);
    },
  ),
  forge016Case(
    forge016ChemistryLessons,
    "asit-baz-tuz-ozellikleri",
    key("asit-baz-tuz-ozellikleri"),
    async (_, l) => {
      await l.getByLabel("Numune", { exact: true }).selectOption("base");
      await setRange(l, "Derişim üssü", -3);
      await compare(
        l,
        "Güçlü NaOH için OH⁻ yaklaşık 10⁻³ mol/L; pOH 3 ve pH 11, gösterge pembe.",
      );
    },
    async (_, l) => {
      await expect(l.locator("[data-model-result]")).toContainText("Bazik");
      await expect(l.locator("[data-model-result]")).toContainText("pH 11");
      await expect(l.locator("[data-indicator-color]")).toHaveText("Pembe");
      expect(
        Number(
          await l.locator("[data-ph-marker]").getAttribute("data-ph-marker"),
        ),
      ).toBeCloseTo(11, 8);
    },
  ),
  forge016Case(
    forge016ChemistryLessons,
    "asit-baz-tepkimeleri",
    key("asit-baz-tepkimeleri"),
    async (_, l) => {
      await setRange(l, "NaOH hacmi (mL)", 50);
      await compare(
        l,
        "Asit ve baz 0,0050 mol; güçlü çift ve 25 °C modelinde eşdeğerlik pH 7.",
      );
    },
    async (_, l) => {
      await expect(l.locator("[data-model-result]")).toContainText("Nötr");
      await expect(l.locator("[data-model-result]")).toContainText("pH 7");
      await expect(l.locator("[data-model-result]")).toContainText("75 mL");
      expect(
        Number(
          await l.locator("[data-neutral-ph]").getAttribute("data-neutral-ph"),
        ),
      ).toBe(7);
      expect(
        Number(await l.locator("[data-base-ml]").getAttribute("data-base-ml")),
      ).toBe(50);
    },
  ),
];
