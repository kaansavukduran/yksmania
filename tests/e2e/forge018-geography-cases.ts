import { expect, type Page, type Locator } from "@playwright/test";
import { forge018GeographyLessons as lessons } from "../../src/learning/forge018Geography";
import { forge018Case, setRange } from "./forge018-case-helper";
const cases = [
  forge018Case(
    lessons,
    "dunya-nufus-dagilisi",
    "forge018-geo-dunya-nufus-dagilisi",
    async (_page, lab) => {
      await lab
        .getByLabel("Dünya örneği", { exact: true })
        .selectOption("sahara");
      await lab.getByLabel("Bir hücrede küme", { exact: true }).check();
      const input = lab.getByRole("spinbutton", {
        name: "Toplam kişi, sayıyla",
        exact: true,
      });
      await input.focus();
      await input.press("ControlOrMeta+A");
      await input.press("Backspace");
      await input.pressSequentially("1800");
      await expect(input).toHaveValue("1800");
      await input.press("Enter");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText("Sahra");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "1.800 kişi",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "18 kişi/km²",
      );
      await expect(
        lab.getByRole("slider", { name: "Toplam kişi", exact: true }),
      ).toHaveValue("1800");
    },
  ),
  forge018Case(
    lessons,
    "nufus-piramitleri",
    "forge018-geo-nufus-piramitleri",
    async (_page, lab) => {
      await lab
        .getByLabel("Piramit tipi", { exact: true })
        .selectOption("hive");
      await lab.getByLabel("20–24 erkek çıkışı", { exact: true }).check();
      await lab.getByLabel("Eksende kişi sayısı", { exact: true }).check();
      await lab.getByLabel("Yaş grubu", { exact: true }).selectOption("4");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Arı kovanı",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "99.000 kişi",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "20–24 yaş",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "1.000 kişi",
      );
    },
  ),
  forge018Case(
    lessons,
    "turkiye-nufusu",
    "forge018-geo-turkiye-nufusu",
    async (_page, lab) => {
      await lab
        .getByLabel("Türkiye örneği", { exact: true })
        .selectOption("interior");
      await lab.getByLabel("B ve C kent sayılsın", { exact: true }).check();
      await setRange(lab, "Geçici ziyaretçi", 200000);
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Yerleşik 1.000.000 kişi",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "idari kent %90",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "1.200.000 kişi",
      );
    },
  ),
  forge018Case(
    lessons,
    "dunya-turkiye-gocler",
    "forge018-geo-dunya-turkiye-gocler",
    async (_page, lab) => {
      await lab.getByLabel("Göç olayı", { exact: true }).selectOption("flood");
      await setRange(lab, "Dışarıdan gelen", 500);
      await setRange(lab, "Dışarıya giden", 1500);
      await lab.getByLabel("İç yön Y’den X’e", { exact: true }).check();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "49.300 kişi",
      );
      await expect(lab.locator("[data-model-result]")).toContainText("-700");
      await expect(lab.getByText("Verilmedi", { exact: true })).toBeVisible();
      await expect(lab.locator("[data-model-result]")).toContainText(
        "100.300 kişi",
      );
    },
  ),
  forge018Case(
    lessons,
    "ekonomik-faaliyetler",
    "forge018-geo-ekonomik-faaliyetler",
    async (_page, lab) => {
      await lab
        .getByLabel("Üretim zinciri", { exact: true })
        .selectOption("copper");
      await lab.getByLabel("İncelenen iş", { exact: true }).selectOption("3");
      await lab.getByLabel("Beşli ders ayrımı", { exact: true }).uncheck();
      await lab.getByLabel("İlk aşamada makine", { exact: true }).check();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Cevherden tele",
      );
      await expect(lab.locator("[data-model-result]")).toContainText("Üçüncül");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "650 çalışan",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Yeni alaşım araştırması",
      );
    },
  ),
];
const predictions: Record<string, readonly [string, string]> = {
  "dunya-nufus-dagilisi": [
    "same",
    "Küme yerel dağılımı değiştirir; aynı toplam kişi ve alan aynı ortalamayı verir.",
  ],
  "nufus-piramitleri": [
    "need",
    "Gerçek tek çentik için göç, doğum ve ölüm kayıtları ayrı gerekir.",
  ],
  "turkiye-nufusu": [
    "same",
    "İdari etiket değişti; bir milyon yerleşik kişi yerinde kaldı.",
  ],
  "dunya-turkiye-gocler": [
    "inside",
    "İç ok X ve Y arasında kalır; ülke toplamında bu akış dengelenir.",
  ],
  "ekonomik-faaliyetler": [
    "different",
    "Çalışan kişi ile değer katkısı ayrı birimdir; paydaları farklıdır.",
  ],
};
export const geography018Cases = cases.map((unit) => ({
  ...unit,
  interact: async (page: Page, lab: Locator) => {
    await unit.interact(page, lab);
    const [answer, reason] = predictions[unit.id];
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
    await expect(
      lab.getByRole("textbox", { name: "Gerekçen", exact: true }),
    ).toHaveValue(predictions[unit.id][1].padEnd(120, "."));
    await expect(lab.locator("[data-prediction-feedback]")).toContainText(
      "Seçimin kanıtla uyumlu.",
    );
  },
}));
