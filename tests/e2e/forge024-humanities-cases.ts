import { expect } from "@playwright/test";
import { forge024Case } from "./forge024-case-helper";
import { forge024HumanitiesLessons as lessons } from "../../src/learning/forge024Humanities";
export const humanities024Cases = [
  forge024Case(
    lessons,
    "dunya-ve-ahiret",
    "forge024-humanities:dunya-ve-ahiret",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Sorulan boyut", exact: true })
        .selectOption("1");
      await l
        .getByRole("checkbox", {
          name: "Ek ayrıntı metne eklendi",
          exact: true,
        })
        .check();
      await l
        .getByRole("textbox", { name: "Gerekçen", exact: true })
        .fill(
          "Toplanma fiili aynı kaldı; ek cümlede yerin mahşer adı açıkça verildi.",
        );
      await l
        .getByRole("button", { name: "Gerekçemle karşılaştır", exact: true })
        .click();
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Mahşer adı açık",
      );
      await expect(
        l.getByRole("checkbox", {
          name: "Ek ayrıntı metne eklendi",
          exact: true,
        }),
      ).toBeChecked();
    },
  ),
  forge024Case(
    lessons,
    "yahudilik-ve-hristiyanlik",
    "forge024-humanities:yahudilik-ve-hristiyanlik",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Kavram kartı", exact: true })
        .selectOption("12");
      await l
        .getByRole("combobox", { name: "Gelenek çerçevesi", exact: true })
        .selectOption("1");
      await l
        .getByRole("combobox", { name: "Kavram türü", exact: true })
        .selectOption("2");
      await l
        .getByRole("textbox", { name: "Gerekçen", exact: true })
        .fill(
          "Evharistiya Hristiyanlıkla ilişkili; fakat kutsal zaman değil ekmek-şarap ayinidir.",
        );
      await l
        .getByRole("button", { name: "Gerekçemle karşılaştır", exact: true })
        .click();
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Kavram türü uyuşmuyor",
      );
      await expect(l.locator("[data-model-result]")).toContainText("Ritüel");
    },
  ),
  forge024Case(
    lessons,
    "islam-ve-bilim",
    "forge024-humanities:islam-ve-bilim",
    async (_p, l) => {
      await l
        .getByRole("checkbox", {
          name: "Cetvel düzeltmesi söyleniyor",
          exact: true,
        })
        .check();
      await l
        .getByRole("checkbox", { name: "Yeni gözlem kaydı var", exact: true })
        .uncheck();
      await l
        .getByRole("combobox", {
          name: "Gök gözlemi için kurum adayı",
          exact: true,
        })
        .selectOption("1");
      await l
        .getByRole("textbox", { name: "Gerekçen", exact: true })
        .fill(
          "Düzeltme söyleniyor; yeni ölçüm verisi yok. Şifahane hasta bakımı odağındadır.",
        );
      await l
        .getByRole("button", { name: "Gerekçemle karşılaştır", exact: true })
        .click();
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "yeni gözlem kanıtı eksik",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "hasta bakımı",
      );
    },
  ),
  forge024Case(
    lessons,
    "anadoluda-islam",
    "forge024-humanities:anadoluda-islam",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Temel şahsiyet kartı", exact: true })
        .selectOption("5");
      await l
        .getByRole("combobox", { name: "İncelenen ilişki", exact: true })
        .selectOption("1");
      await l
        .getByRole("combobox", { name: "Kurmaca ek kayıt", exact: true })
        .selectOption("0");
      await l
        .getByRole("textbox", { name: "Gerekçen", exact: true })
        .fill(
          "Yesevî’nin mirasının anlatılması onun yeni şehirde yaşadığına ilişkin belge değildir.",
        );
      await l
        .getByRole("button", { name: "Gerekçemle karşılaştır", exact: true })
        .click();
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Yaşam yeri kanıtı yok",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "tek başına",
      );
    },
  ),
];
