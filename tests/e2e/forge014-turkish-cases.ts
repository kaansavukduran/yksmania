import { expect } from "@playwright/test";
import { forge014TurkishLessons } from "../../src/learning/forge014Turkish";
import { forge014Case } from "./forge014-case-helper";

export const turkish014Cases = [
  forge014Case(
    forge014TurkishLessons,
    "ek-fiil",
    "forge014-turkish:ek-fiil",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Hedef sözün tabanı", exact: true })
        .selectOption("verbal");
      await lab
        .getByRole("combobox", { name: "Kişi", exact: true })
        .selectOption("ben");
      await lab
        .getByRole("checkbox", { name: "Olumsuz yargı kur", exact: true })
        .check();
      await lab
        .getByRole("combobox", { name: "Yapı tahminin", exact: true })
        .selectOption("Birleşik çekimli fiil");
      const reason = lab.getByRole("textbox", {
        name: "Cümleden gerekçen",
        exact: true,
      });
      await expect(reason).toHaveAttribute("maxlength", "120");
      await reason.fill(
        "Gel- fiil kökü; -yor ilk kip, -du idi ek fiili, -m ben kişisi. -mi olumsuzluğu kuruyor.",
      );
      await lab
        .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
        .tap();
    },
    async (_page, lab) => {
      await expect(lab.locator(".grammar014-sentence")).toContainText(
        "Dün bu saatte ben gelmiyordum.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Şimdiki zamanın hikâyesi",
      );
      await expect(lab.locator("[data-model-part='negative']")).toContainText(
        "-mi-",
      );
      await expect(lab.locator("[data-model-part='copula']")).toContainText(
        "Ek fiil: idi",
      );
      await expect(lab.locator("[data-copula-layer='copula']")).toHaveAttribute(
        "data-form",
        "-du",
      );
      await expect(lab.locator("[data-copula-layer='first']")).toHaveAttribute(
        "data-form",
        "-yor",
      );
      await expect(lab.getByRole("status")).toContainText(
        "Seçimin bu cümleyle uyumlu.",
      );
      await expect(lab.locator("[data-selected-prediction]")).toHaveText(
        "Seçili tahmin: Birleşik çekimli fiil",
      );
    },
  ),
];
