import { expect } from "@playwright/test";
import { forge024Case, setRange } from "./forge024-case-helper";
import { forge024BiologyALessons } from "../../src/learning/forge024BiologyA";
const reasonLabel = "Gerekçen (en çok 120 karakter)";
export const biologyA024Cases = [
  forge024Case(
    forge024BiologyALessons,
    "ayt-govde-yapisi",
    "forge024:biology-a:ayt-govde-yapisi",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Tipik gövde düzeni", exact: true })
        .selectOption("dicot");
      await lab
        .getByRole("combobox", { name: "Kesitte vurgulanan doku", exact: true })
        .selectOption("cambium");
      await setRange(lab, "Verilen büyüme mevsimi", 4);
      await setRange(lab, "Sürgünde seçili düğüm", 3);
      await lab
        .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
        .selectOption("secondary");
      await lab
        .getByRole("textbox", { name: reasonLabel, exact: true })
        .fill(
          "Verilen dikot modelinde kambiyum içe ksilem ekler; dört mevsim dört halkadır.",
        );
      await lab
        .getByRole("button", { name: "Kanıtı karşılaştır", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-ring-count",
        "4",
      );
      await expect(lab.locator("[data-growth-ring]")).toHaveCount(4);
      await expect(lab.locator("[data-stem-tissue]")).toHaveAttribute(
        "data-stem-tissue",
        "cambium",
      );
      await expect(lab.locator('[data-shoot-node="3"]')).toHaveAttribute(
        "data-selected",
        "true",
      );
      await expect(lab.locator(".bio024a-feedback")).toContainText(
        "Tahminin sonuçla uyumlu.",
      );
    },
    "[data-live-model]",
  ),
  forge024Case(
    forge024BiologyALessons,
    "ayt-yaprak-yapisi",
    "forge024:biology-a:ayt-yaprak-yapisi",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İzlenen madde", exact: true })
        .selectOption("water");
      await lab
        .getByRole("checkbox", {
          name: "Gösterilen stoma yolu açık",
          exact: true,
        })
        .uncheck();
      await setRange(lab, "Yolun adımı", 4);
      await lab
        .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
        .selectOption("blocked");
      await lab
        .getByRole("textbox", { name: reasonLabel, exact: true })
        .fill(
          "Buhar hava boşluğuna ulaşır; gösterilen stoma kapalıysa dışarı yolu engellidir.",
        );
      await lab
        .getByRole("button", { name: "Kanıtı karşılaştır", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-leaf-blocked",
        "true",
      );
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-leaf-phase",
        "vapor",
      );
      await expect(lab.locator("[data-leaf-reached]")).toHaveAttribute(
        "data-leaf-reached",
        "2",
      );
      await expect(
        lab.locator("[data-leaf-link][data-active=true]"),
      ).toHaveCount(2);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Kütikula yoluyla",
      );
      await expect(lab.locator(".bio024a-feedback")).toContainText(
        "Tahminin sonuçla uyumlu.",
      );
    },
    "[data-live-model]",
  ),
  forge024Case(
    forge024BiologyALessons,
    "bitki-madde-tasinmasi",
    "forge024:biology-a:bitki-madde-tasinmasi",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Seçili taşıma dokusu", exact: true })
        .selectOption("phloem");
      await setRange(lab, "A basıncı", 7);
      await setRange(lab, "B basıncı", 13);
      await setRange(lab, "Model iletkenliği", 4);
      await setRange(lab, "Kaynak–havuz sürecinin adımı", 3);
      await lab
        .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
        .selectOption("B-to-A");
      await lab
        .getByRole("textbox", { name: reasonLabel, exact: true })
        .fill(
          "A eksi B basıncı −0,6; dörtle çarpınca Q −2,4 ve yön B’den A’ya.",
        );
      await lab
        .getByRole("button", { name: "Kanıtı karşılaştır", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-flow",
        "-2.4",
      );
      await expect(lab.locator("[data-flow-direction]")).toHaveAttribute(
        "data-flow-direction",
        "B-to-A",
      );
      await expect(lab.locator("[data-model-result]")).toContainText("B→A");
      await expect(lab.locator(".bio024a-feedback")).toContainText(
        "Tahminin sonuçla uyumlu.",
      );
    },
    "[data-live-model]",
  ),
  forge024Case(
    forge024BiologyALessons,
    "stoma-nodul-mikoriza",
    "forge024:biology-a:stoma-nodul-mikoriza",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Stoma sinyali", exact: true })
        .selectOption("ABA");
      await setRange(lab, "Bekçi hücresi yanıt adımı", 4);
      await lab
        .getByRole("combobox", { name: "Kök ortaklığı", exact: true })
        .selectOption("fungus");
      await lab
        .getByRole("combobox", {
          name: "Ortaklıkta izlenen madde",
          exact: true,
        })
        .selectOption("phosphate");
      await setRange(lab, "Alışveriş yolunun adımı", 3);
      await lab
        .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
        .selectOption("yes");
      await lab
        .getByRole("textbox", { name: reasonLabel, exact: true })
        .fill(
          "Mantar hiflerinin toprak fosfatını kök arayüzünden bitkiye taşıması temsil edilir.",
        );
      await lab
        .getByRole("button", { name: "Kanıtı karşılaştır", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-guard-stage]")).toHaveAttribute(
        "data-guard-stage",
        "0",
      );
      await expect(lab.locator("[data-guard-ion]")).toHaveAttribute(
        "data-guard-ion",
        "out",
      );
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-exchange-represented",
        "true",
      );
      await expect(lab.locator("[data-exchange-node]")).toHaveCount(4);
      await expect(lab.locator("[data-exchange-node=plant]")).toHaveAttribute(
        "data-exchange-reached",
        "true",
      );
      await expect(lab.locator(".bio024a-feedback")).toContainText(
        "Tahminin sonuçla uyumlu.",
      );
    },
    "[data-live-model]",
  ),
];
