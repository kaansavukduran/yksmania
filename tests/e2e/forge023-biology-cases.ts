import { expect } from "@playwright/test";
import { forge023Case, setRange } from "./forge023-case-helper";
import { forge023BiologyLessons } from "../../src/learning/forge023Biology";

export const biology023Cases = [
  forge023Case(
    forge023BiologyLessons,
    "bitki-ortu-doku",
    "forge023:biology:bitki-ortu-doku",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Yüzey yapısı", exact: true })
        .selectOption("hydathode");
      await setRange(lab, "Turgor basıncı", 9);
      await setRange(lab, "Dış su potansiyeli", -15);
      await lab
        .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
        .selectOption("out");
      await lab
        .getByRole("textbox", {
          name: "Gerekçen (en çok 120 karakter)",
          exact: true,
        })
        .fill("Hücre −0,3, dış −1,5 MPa; su yüksek iç değerden dışa geçer.");
      await lab
        .getByRole("button", { name: "Kanıtı karşılaştır", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-water-cell",
        "-0.3",
      );
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-water-difference",
        "-1.2",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Net su: dışarı",
      );
      await expect(lab.locator("[data-water-direction]")).toHaveAttribute(
        "data-water-direction",
        "out",
      );
      await expect(
        lab.getByRole("combobox", { name: "Yüzey yapısı", exact: true }),
      ).toHaveValue("hydathode");
      await expect(lab.locator(".bio023-feedback[role=status]")).toContainText(
        "Tahminin sonuçla uyumlu.",
      );
    },
    "[data-live-model]",
  ),
  forge023Case(
    forge023BiologyLessons,
    "bitki-kok-anatomisi",
    "forge023:biology:bitki-kok-anatomisi",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Kesit yönü", exact: true })
        .selectOption("cross");
      await lab
        .getByRole("combobox", { name: "Tipik kök düzeni", exact: true })
        .selectOption("monocot");
      await lab
        .getByRole("checkbox", { name: "Kaspari bandı sağlam", exact: true })
        .uncheck();
      await setRange(lab, "Başlangıç birimi", 18);
      await setRange(lab, "Yolu izleme adımı", 3);
      await lab
        .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
        .selectOption("passes");
      await lab
        .getByRole("textbox", {
          name: "Gerekçen (en çok 120 karakter)",
          exact: true,
        })
        .fill(
          "Boya zarı geçmez; deneysel band kaçağı duvar yolunu merkeze açık bırakır.",
        );
      await lab
        .getByRole("button", { name: "Kanıtı karşılaştır", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-root-arrived",
        "18",
      );
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-root-can-pass",
        "true",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Ksileme ulaşan: 18/18 birim",
      );
      await expect(lab.locator("[data-root-route]")).toHaveAttribute(
        "data-root-route",
        "apoplast",
      );
      await expect(lab.locator("[data-root-route]")).toHaveAttribute(
        "data-root-reached",
        "3",
      );
      await expect(lab.locator("[data-live-model] .bio023-tracer")).toHaveCount(
        18,
      );
      await expect(
        lab.getByRole("combobox", { name: "Tipik kök düzeni", exact: true }),
      ).toHaveValue("monocot");
      await expect(lab.locator(".bio023-feedback[role=status]")).toContainText(
        "Tahminin sonuçla uyumlu.",
      );
    },
    "[data-live-model]",
  ),
];
