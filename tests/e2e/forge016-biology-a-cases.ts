import { expect, type Locator } from "@playwright/test";
import { forge016Case, setRange } from "./forge016-case-helper";
import { forge016BiologyALessons } from "../../src/learning/forge016BiologyA";
async function predict(lab: Locator, value: string) {
  await lab.getByLabel("Sonuç tahminin", { exact: true }).selectOption(value);
  await lab
    .getByLabel("Gerekçen", { exact: true })
    .fill("Kaynak, hedef ve seçili deney koşulunu ayrı izliyorum.");
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .click();
  await expect(lab.locator(".bio016a-feedback")).toContainText(
    "Seçimin bu modeldeki kanıtla uyumlu.",
  );
}
const family = (
  id: string,
  interact: Parameters<typeof forge016Case>[3],
  assertOutcome: Parameters<typeof forge016Case>[4],
) =>
  forge016Case(
    forge016BiologyALessons,
    id,
    "forge016-bioa-" + id,
    interact,
    assertOutcome,
  );
export const biologyA016Cases = [
  family(
    "endokrin-hipotalamus",
    async (_page, lab) => {
      await lab
        .getByLabel("İzlenen haber", { exact: true })
        .selectOption("trh");
      await lab
        .getByLabel("Seçici kesinti", { exact: true })
        .selectOption("portal");
      await predict(lab, "blockedArrival");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "TRH: Portal kan → Ön hipofiz",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Yeni haberin ulaşması: engelli",
      );
      await expect(lab.locator("[data-route-label]")).toHaveText("Portal kan");
      await expect(lab.locator('[data-flow="arrival"]')).toHaveAttribute(
        "data-active",
        "false",
      );
      await expect(lab.locator("[data-destination]")).toHaveAttribute(
        "data-destination",
        "anterior",
      );
    },
  ),
  family(
    "endokrin-hipofiz",
    async (_page, lab) => {
      await lab
        .getByLabel("Hipofiz bağlantılı hormon", { exact: true })
        .selectOption("oxy");
      await lab
        .getByLabel("Verilen hedef kartı", { exact: true })
        .selectOption("ejection");
      await predict(lab, "yes");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Oksitosin → Meme miyoepitelyal hücresi",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Mevcut sütün",
      );
      await expect(lab.locator('[data-lobe="posterior"]')).toHaveClass(
        /bio016a-selected/,
      );
      await expect(lab.locator("[data-target-match]")).toHaveAttribute(
        "data-target-match",
        "true",
      );
      await expect(lab.locator("svg")).toContainText("Süt atımı");
    },
  ),
  family(
    "endokrin-tiroit",
    async (_page, lab) => {
      await lab
        .getByLabel("Eksen koşulu", { exact: true })
        .selectOption("iodineLow");
      await setRange(lab, "Verilen T4 molekülü sayısı", 3);
      await setRange(lab, "Verilen T3 molekülü sayısı", 4);
      await predict(lab, "up");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "T3/T4: Azalma yönü. TSH: Artma yönü",
      );
      await expect(lab.locator("[data-iodine-result]")).toContainText(
        "3×4 + 4×3 = 24",
      );
      await expect(lab.locator("[data-tsh-direction]")).toHaveText("TSH ↑");
      await expect(lab.locator("[data-product-direction]")).toHaveText(
        "T3/T4 ↓",
      );
      await expect(lab.locator("[data-feedback]")).toHaveCount(2);
    },
  ),
  family(
    "endokrin-paratiroit",
    async (_page, lab) => {
      await lab
        .getByLabel("Böbrekte aktif D oluşum basamağı sağlam", { exact: true })
        .uncheck();
      await setRange(lab, "Verilen kemik girişi; kalsiyum birimi", 4);
      await setRange(lab, "Verilen bağırsak girişi; kalsiyum birimi", 3);
      await setRange(lab, "Verilen çıkış; kalsiyum birimi", 2);
      await predict(lab, "incomplete");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Kalsiyum havuzu: 15 miktar birimi",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "aktif D oluşum basamağı engelli",
      );
      await expect(lab.locator('[data-flow="renal-activeD"]')).toHaveAttribute(
        "data-active",
        "false",
      );
      await expect(lab.locator('[data-flow="bone-calcium"]')).toHaveAttribute(
        "data-active",
        "true",
      );
      await expect(lab.locator("[data-mineral-directions]")).toHaveText(
        "Ca↑ P atımı↑",
      );
    },
  ),
  family(
    "endokrin-bobrek-ustu",
    async (_page, lab) => {
      await lab
        .getByLabel("İzlenen adrenal ürün", { exact: true })
        .selectOption("catecholamine");
      await lab
        .getByLabel("Verilen temel kontrol girişi", { exact: true })
        .selectOption("sympathetic");
      await predict(lab, "matched");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Adrenalin / noradrenalin: Medulla",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Sempatik sinirsel giriş",
      );
      await expect(lab.locator('[data-region="medulla"]')).toHaveClass(
        /bio016a-selected/,
      );
      await expect(
        lab.locator('[data-flow="adrenal-control"]'),
      ).toHaveAttribute("data-active", "true");
    },
  ),
  family(
    "endokrin-pankreas",
    async (_page, lab) => {
      await setRange(lab, "Başlangıç karaciğer deposu; glikoz eşdeğeri", 3);
      await setRange(lab, "İstenen aktarım; glikoz eşdeğeri", 5);
      await lab
        .getByLabel("Ayrı karşılaştırma: glikoz giriş dokusu", { exact: true })
        .selectOption("rbc");
      await predict(lab, "release");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Kan 23; depo 0; toplam 23",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "gerçekleşen 3 birim",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Eritrosit",
      );
      await expect(lab.locator('[data-pool="blood"]')).toHaveAttribute(
        "data-value",
        "23",
      );
      await expect(lab.locator('[data-pool="liver"]')).toHaveAttribute(
        "height",
        "0",
      );
      await expect(
        lab.locator('[data-flow="glucose-transfer"] path').last(),
      ).toHaveAttribute("d", "M270,328L96,328");
    },
  ),
  family(
    "endokrin-epifiz",
    async (_page, lab) => {
      await setRange(lab, "İki ucu birlikte kaydır; saat", 3);
      await setRange(lab, "İncelenen an; saat", 2);
      await predict(lab, "dark");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Karanlık 01.00–09.00; 8 saat",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "İncelenen saat 2.00: pencere içinde",
      );
      await expect(lab.locator("[data-dark-arc]")).toHaveAttribute(
        "data-duration",
        "8",
      );
      await expect(
        lab.locator('[data-flow="hour-hand"] path').last(),
      ).toHaveAttribute("d", /M180,168L218\.5,101\./);
    },
  ),
];
