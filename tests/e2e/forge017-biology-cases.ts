import { expect, type Locator } from "@playwright/test";
import { forge017Case, setRange } from "./forge017-case-helper";
import { forge017BiologyLessons } from "../../src/learning/forge017Biology";
async function predict(lab: Locator, value: string) {
  await lab.getByLabel("Sonuç tahminin", { exact: true }).selectOption(value);
  await lab
    .getByLabel("Gerekçen", { exact: true })
    .fill("Verilen koşulu ve ayrı deneyi birbirine karıştırmadan izliyorum.");
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .click();
  await expect(lab.locator(".bio017-feedback")).toContainText(
    "Seçimin bu modeldeki kanıtla uyumlu.",
  );
}
const family = (
  id: string,
  interact: Parameters<typeof forge017Case>[3],
  assertOutcome: Parameters<typeof forge017Case>[4],
) =>
  forge017Case(
    forge017BiologyLessons,
    id,
    "forge017-bio-" + id,
    interact,
    assertOutcome,
  );
export const biology017Cases = [
  family(
    "kas-doku",
    async (_page, lab) => {
      await setRange(lab, "Sarkomer boyu; µm", 2.2);
      await lab
        .getByLabel("İzlenen adım", { exact: true })
        .selectOption("pump");
      await lab.getByLabel("Yeni serbest ATP var", { exact: true }).uncheck();
      await predict(lab, "blocked");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]").first()).toContainText(
        "A 1,6 µm; I toplamı 0,6 µm; H 0,2 µm",
      );
      await expect(lab.locator("[data-model-result]").nth(1)).toContainText(
        "verilen basamak engelli",
      );
      expect(
        Number(await lab.locator('[data-band="H"]').getAttribute("data-value")),
      ).toBeCloseTo(0.2);
      await expect(lab.locator('[data-muscle-step="pump"]')).toHaveAttribute(
        "data-step-enabled",
        "false",
      );
      await expect(lab.locator('[data-flow="calcium-step"]')).toHaveAttribute(
        "data-active",
        "false",
      );
      await expect(
        lab.locator('[data-flow="calcium-step"]>path'),
      ).toHaveAttribute("d", "M90,183L90,97");
    },
  ),
  family(
    "sindirim-agiz-yutak-yemek-borusu",
    async (_page, lab) => {
      await lab.getByLabel("Yutma evresi", { exact: true }).selectOption("2");
      await lab.getByLabel("Yutakta koruma sağlam", { exact: true }).uncheck();
      await expect(lab.locator("[data-model-result]").first()).toContainText(
        "başarılı özofagus geçişi gösterilmez",
      );
      await expect(lab.locator("[data-larynx-gate]")).toHaveAttribute(
        "data-airway-open",
        "true",
      );
      await lab.getByLabel("Yutakta koruma sağlam", { exact: true }).check();
      await lab.getByLabel("Yutma evresi", { exact: true }).selectOption("3");
      await setRange(lab, "Verilen dalga hızı; cm/s", 4);
      await setRange(lab, "Taşıma süresi; s", 4);
      await predict(lab, "moving");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]").first()).toContainText(
        "Konum 16 cm. Henüz mideye ulaşmadı.",
      );
      await expect(lab.locator("[data-bolus]")).toHaveAttribute(
        "data-position",
        "16",
      );
      await expect(lab.locator("[data-bolus]")).toHaveAttribute("cy", "375");
      await expect(lab.locator("[data-lower-gate]")).toHaveAttribute(
        "data-open",
        "false",
      );
      await expect(lab.locator("svg").first()).toContainText("Yemek");
    },
  ),
  family(
    "sindirim-mide",
    async (_page, lab) => {
      await lab
        .getByLabel("Düzenleyici yol", { exact: true })
        .selectOption("duodenum");
      await lab
        .getByLabel("Uygun asidik örnek seçili", { exact: true })
        .uncheck();
      await setRange(lab, "Zincirdeki aminoasit sayısı", 14);
      await setRange(lab, "Ayrıca verilen bağ kesimi sayısı", 3);
      await predict(lab, "noActivation");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]").first()).toContainText(
        "Bağırsaktan geri denetim; öncül aktivasyonu gösterilmez",
      );
      await expect(lab.locator("[data-chain-result]")).toHaveText(
        "14 birim; 3 kesim → 4 parça, 10 bağ",
      );
      await expect(
        lab.locator('[data-flow="pepsin-activation"]'),
      ).toHaveAttribute("data-active", "false");
      await expect(
        lab.locator('[data-flow="duodenal-feedback"]'),
      ).toHaveAttribute("data-active", "true");
      await expect(lab.locator("[data-aminoacid]")).toHaveCount(14);
      await expect(
        lab.locator('[data-peptide-bond][data-cut="true"]'),
      ).toHaveCount(3);
      await expect(
        lab.locator('[data-peptide-bond][data-cut="false"]'),
      ).toHaveCount(10);
    },
  ),
];
