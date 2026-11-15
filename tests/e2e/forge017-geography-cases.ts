import { expect, type Locator, type Page } from "@playwright/test";
import { forge017GeographyLessons as lessons } from "../../src/learning/forge017Geography";
import { forge017Case, setRange } from "./forge017-case-helper";
const cases = [
  forge017Case(
    lessons,
    "turkiye-sulari",
    "forge017-geo-turkiye-sulari",
    async (_page, lab) => {
      await lab
        .getByLabel("Havza örneği", { exact: true })
        .selectOption("coruh");
      await lab.getByLabel("Temsilî depolama", { exact: true }).check();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Açık havza",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Karadeniz",
      );
      await expect(
        lab.getByText(/en büyük ile en küçük farkı 0 birim/),
      ).toBeVisible();
    },
  ),
  forge017Case(
    lessons,
    "dunya-topraklari",
    "forge017-geo-dunya-topraklari",
    async (_page, lab) => {
      await lab.getByLabel("İncelenen kat", { exact: true }).selectOption("E");
      await lab.getByLabel("Yeni tortu örneği", { exact: true }).check();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Kat verilmedi",
      );
      await expect(
        lab.getByLabel("Yeni tortu örneği", { exact: true }),
      ).toBeChecked();
    },
  ),
  forge017Case(
    lessons,
    "turkiye-topraklari",
    "forge017-geo-turkiye-topraklari",
    async (_page, lab) => {
      await lab
        .getByLabel("Arazi konumu", { exact: true })
        .selectOption("alluvium");
      await lab.getByLabel("Tuz riski var", { exact: true }).check();
      await lab.getByLabel("Drenaj uygun", { exact: true }).uncheck();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText("Alüvyal");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Tuz ve su sorunu",
      );
    },
  ),
  forge017Case(
    lessons,
    "dunya-bitkileri",
    "forge017-geo-dunya-bitkileri",
    async (_page, lab) => {
      await lab
        .getByLabel("Bitki topluluğu", { exact: true })
        .selectOption("tundra");
      await lab.getByLabel("Yaz kurak dizi", { exact: true }).check();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText("Tundra");
      await expect(
        lab.getByText(/Toplam 600 mm; en az yağışlı ay 20 mm/),
      ).toBeVisible();
    },
  ),
  forge017Case(
    lessons,
    "turkiye-bitkileri",
    "forge017-geo-turkiye-bitkileri",
    async (_page, lab) => {
      const input = lab.getByRole("spinbutton", {
        name: "Yükselti (m), sayıyla",
        exact: true,
      });
      await input.focus();
      await input.press("ControlOrMeta+A");
      await input.press("Backspace");
      await input.pressSequentially("1800");
      await expect(input).toHaveValue("1800");
      await input.press("Enter");
      await lab.getByLabel("Örtü kaybı örneği", { exact: true }).check();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText("1.800 m");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Örtü kaybı",
      );
      await expect(
        lab.getByRole("slider", { name: "Yükselti (m)", exact: true }),
      ).toHaveValue("1800");
    },
  ),
  forge017Case(
    lessons,
    "dunya-yerlesmeleri",
    "forge017-geo-dunya-yerlesmeleri",
    async (_page, lab) => {
      await lab
        .getByLabel("Yerleşme dokusu", { exact: true })
        .selectOption("line");
      await setRange(lab, "Kullanım ayı", 6);
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Çizgisel doku",
      );
      await expect(lab.locator("[data-model-result]")).toContainText("6 ay");
    },
  ),
  forge017Case(
    lessons,
    "turkiye-yerlesmeleri",
    "forge017-geo-turkiye-yerlesmeleri",
    async (_page, lab) => {
      await lab
        .getByLabel("Şehir örneği", { exact: true })
        .selectOption("antalya");
      await lab.getByLabel("Ayrı yayla örneği", { exact: true }).check();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText("Antalya");
      await expect(lab.locator("[data-model-result]")).toContainText("Turizm");
      await expect(
        lab.getByText(/Mayıs, haziran, temmuz, ağustos, eylül: beş ay/),
      ).toBeVisible();
    },
  ),
  forge017Case(
    lessons,
    "nufus-onemi-ozellikleri",
    "forge017-geo-nufus-onemi-ozellikleri",
    async (_page, lab) => {
      await lab
        .getByLabel("Yaş profili", { exact: true })
        .selectOption("young");
      await setRange(lab, "Toplam kişi", 200000);
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "200.000 kişi",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Genç %35",
      );
      await expect(lab.getByText("70.000 kişi", { exact: true })).toBeVisible();
    },
  ),
];

const predicted: Record<string, readonly [string, string]> = {
  "turkiye-sulari": [
    "open",
    "Çoruh son alıcı olarak Karadeniz’e ulaşır. Ülke sınırı ayrı bir bilgidir.",
  ],
  "dunya-topraklari": [
    "no",
    "Yeni tortu örneğinin kat listesinde E verilmedi. Bu sonsuza dek yokluk demek değildir.",
  ],
  "turkiye-topraklari": [
    "more",
    "Tuz ve drenaj riskleri ayrı; ürün verimi için ek veri gerekir.",
  ],
  "dunya-bitkileri": [
    "more",
    "Yıllık toplam aynı olsa da aylık su ve sıcaklık koşulları ayrı gerekir.",
  ],
  "turkiye-bitkileri": [
    "context",
    "Yükselti tek etken değildir; deniz, bakı ve nem de bitki sınırına katılır.",
  ],
  "dunya-yerlesmeleri": [
    "same",
    "Aynı sekiz evin yeri değişti; kişi sayısı verilmedi.",
  ],
  "turkiye-yerlesmeleri": [
    "many",
    "Şehirde üç işlev birlikte var; ayrı yaylanın takvimi kent mesleği değildir.",
  ],
  "nufus-onemi-ozellikleri": [
    "age",
    "15–64 yaş aralığı gerçek istihdam değildir; ek iş gücü verisi gerekir.",
  ],
};
export const geography017Cases = cases.map((unit) => ({
  ...unit,
  interact: async (page: Page, lab: Locator) => {
    await unit.interact(page, lab);
    const [answer, reason] = predicted[unit.id];
    await lab
      .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
      .selectOption(answer);
    await lab
      .getByRole("textbox", { name: "Gerekçen", exact: true })
      .fill(reason.padEnd(120, "."));
    await lab
      .getByRole("button", { name: "Tahmini dene", exact: true })
      .click();
    await expect(lab.locator("[data-prediction-feedback]")).toContainText(
      "Seçimin kanıtla uyumlu.",
    );
  },
  assertOutcome: async (page: Page, lab: Locator) => {
    await unit.assertOutcome(page, lab);
    await expect(lab.locator("[data-prediction-feedback]")).toContainText(
      "Seçimin kanıtla uyumlu.",
    );
    await expect(
      lab.getByRole("textbox", { name: "Gerekçen", exact: true }),
    ).toHaveValue(predicted[unit.id][1].padEnd(120, "."));
  },
}));
