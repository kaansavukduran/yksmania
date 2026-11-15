import { expect, type Locator } from "@playwright/test";
import { forge012Case, setRange } from "./forge012-case-helper";
import { forge012BiologyLessons } from "../../src/learning/forge012Biology";
async function predict(lab: Locator, value: string) {
  await lab
    .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
    .selectOption(value);
  const label = await lab
    .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
    .locator("option:checked")
    .textContent();
  await expect(lab.locator("[data-selected-prediction]")).toHaveText(
    `Seçili tahmin: ${label}`,
  );
  await lab
    .getByRole("textbox", { name: "Gerekçen", exact: true })
    .fill(
      "Hücre veya alel sayısını seçili modelin açık koşullarıyla karşılaştırıyorum.",
    );
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .tap();
  await expect(lab.locator(".bio012-feedback")).toContainText(
    "Seçimin bu modeldeki kanıtla uyumlu.",
  );
}
export const biology012Cases = [
  forge012Case(
    forge012BiologyLessons,
    "eseyli-ureme",
    "forge012-bio-eseyli-ureme",
    async (_p, l) => {
      await setRange(l, "Başlangıç kromozom sayısı (2n)", 12);
      await l
        .getByRole("combobox", { name: "İzlenen olay", exact: true })
        .selectOption("2");
      await predict(l, "2n");
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "1 hücre; her hücrede 12 kromozom",
      );
      await expect(l.locator("[data-sexual-cell]")).toHaveCount(1);
      await expect(l.locator("[data-sexual-cell]")).toHaveAttribute(
        "transform",
        "translate(320 140)",
      );
      await expect(l.locator("[data-chromosome]")).toHaveCount(12);
    },
  ),
  forge012Case(
    forge012BiologyLessons,
    "kalitima-giris",
    "forge012-bio-kalitima-giris",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Diploit genotip", exact: true })
        .selectOption("AABbCc");
      await l
        .getByRole("combobox", { name: "İzlenen gamet", exact: true })
        .selectOption("3");
      await predict(l, "4");
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "4 gamet çeşidi",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "Seçili tek gamet: Abc",
      );
      expect(await l.locator("[data-gamete-allele]").allTextContents()).toEqual(
        ["A", "b", "c"],
      );
      await expect(l.locator("[data-selected-gamete]")).toHaveCount(1);
      await expect(l.locator("[data-selected-gamete]")).toHaveAttribute(
        "width",
        "430",
      );
    },
  ),
  forge012Case(
    forge012BiologyLessons,
    "mendel-genetigi",
    "forge012-bio-mendel-genetigi",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "2. ebeveyn genotipi", exact: true })
        .selectOption("aa");
      await predict(l, "2");
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText("aa: 50%");
      await expect(l.locator('[data-punnett-genotype="aa"]')).toHaveCount(2);
    },
  ),
  forge012Case(
    forge012BiologyLessons,
    "mendelden-sapmalar",
    "forge012-bio-mendelden-sapmalar",
    async (_p, l) => {
      await l
        .getByRole("combobox", {
          name: "İncelenen kalıtım ilişkisi",
          exact: true,
        })
        .selectOption("linkage");
      await setRange(l, "Rekombinasyon yüzdesi", 20);
      await predict(l, "unequal");
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText("AB: 40%");
      await expect(l.locator("[data-model-result]")).toContainText("Ab: 10%");
      await expect(l.locator('[data-gamete="AB"]')).toHaveAttribute(
        "width",
        "340",
      );
      await expect(l.locator('[data-gamete="Ab"]')).toHaveAttribute(
        "width",
        "85",
      );
    },
  ),
  forge012Case(
    forge012BiologyLessons,
    "kan-gruplari",
    "forge012-bio-kan-gruplari",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "1. AB0 genotipi", exact: true })
        .selectOption("AB");
      await l
        .getByRole("combobox", { name: "2. AB0 genotipi", exact: true })
        .selectOption("OO");
      await predict(l, "no");
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "A: 50%; B: 50%; AB: 0%; O: 0%",
      );
      await expect(l.locator('[data-punnett-genotype="AO"]')).toHaveCount(2);
      await expect(l.locator('[data-punnett-genotype="BO"]')).toHaveCount(2);
    },
  ),
  forge012Case(
    forge012BiologyLessons,
    "eseyin-belirlenmesi",
    "forge012-bio-eseyin-belirlenmesi",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "XX ebeveynin alelleri", exact: true })
        .selectOption("aa");
      await l
        .getByRole("combobox", { name: "XY ebeveynin alelleri", exact: true })
        .selectOption("aY");
      await predict(l, "1");
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Özelliği gösteren tüm çocuklar: 100%",
      );
      await expect(
        l.locator('[data-x-genotype][data-affected="true"]'),
      ).toHaveCount(4);
    },
  ),
  forge012Case(
    forge012BiologyLessons,
    "soy-agaclari",
    "forge012-bio-soy-agaclari",
    async (_p, l) => {
      await l
        .getByRole("checkbox", {
          name: "Çocuk özelliği gösteriyor",
          exact: true,
        })
        .check();
      await predict(l, "yes");
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "1 uyumlu temel model",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "Otozomal çekinik",
      );
      await expect(l.locator('[data-person="child"]')).toHaveClass(
        "bio012-affected",
      );
    },
  ),
];
