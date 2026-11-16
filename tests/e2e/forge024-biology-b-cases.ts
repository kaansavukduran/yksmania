import { expect } from "@playwright/test";
import { forge024Case, setRange } from "./forge024-case-helper";
import { forge024BiologyBLessons } from "../../src/learning/forge024BiologyB";
const reason = "Gerekçen (en çok 120 karakter)";
export const biologyB024Cases = [
  forge024Case(
    forge024BiologyBLessons,
    "bitki-hormonlari",
    "forge024:biology-b:bitki-hormonlari",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Oksin uygulanan doku", exact: true })
        .selectOption("root");
      await setRange(lab, "Oksin doz basamağı", 4);
      await setRange(lab, "Kültürde oksin birimi", 2);
      await setRange(lab, "Kültürde sitokinin birimi", 7);
      await lab
        .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
        .selectOption("inhibition");
      await lab
        .getByRole("textbox", { name: reason, exact: true })
        .fill(
          "Kökün D4 ölçümü −45; bu sıfır büyüme değil kendi kontrolünün altında uzama.",
        );
      await lab
        .getByRole("button", { name: "Kanıtı karşılaştır", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-auxin-value",
        "-45",
      );
      await expect(lab.locator("[data-culture-outcome]")).toHaveAttribute(
        "data-culture-outcome",
        "shoot",
      );
      await expect(lab.locator("[data-culture-shoot]")).toHaveCount(1);
      await expect(lab.locator(".bio024b-feedback")).toContainText(
        "Tahminin sonuçla uyumlu.",
      );
    },
    "[data-live-model]",
  ),
  forge024Case(
    forge024BiologyBLessons,
    "bitkilerde-hareket",
    "forge024:biology-b:bitkilerde-hareket",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Işığın geldiği yön", exact: true })
        .selectOption("dark");
      await lab
        .getByRole("combobox", { name: "Koleoptil uygulaması", exact: true })
        .selectOption("agarLeft");
      await setRange(lab, "Büyüme yanıtı adımı", 4);
      await lab
        .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
        .selectOption("right");
      await lab
        .getByRole("textbox", { name: reason, exact: true })
        .fill(
          "Soldaki oksinli agar sol kenarı fazla uzatır; dış yay sol, tepe kısa sağ tarafa döner.",
        );
      await lab
        .getByRole("button", { name: "Kanıtı karşılaştır", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-bend",
        "right",
      );
      await expect(lab.locator("[data-coleoptile-left]")).toHaveAttribute(
        "data-coleoptile-left",
        "8",
      );
      await expect(lab.locator("[data-coleoptile-right]")).toHaveAttribute(
        "data-coleoptile-right",
        "4",
      );
      await expect(lab.locator(".bio024b-feedback")).toContainText(
        "Tahminin sonuçla uyumlu.",
      );
    },
    "[data-live-model]",
  ),
  forge024Case(
    forge024BiologyBLessons,
    "bitki-fotoperiyodizm",
    "forge024:biology-b:bitki-fotoperiyodizm",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "Fotoperiyot örneği", exact: true })
        .selectOption("short");
      await setRange(lab, "Gündüz süresi (saat)", 8);
      await setRange(lab, "Kritik gece (saat)", 10);
      await lab
        .getByRole("combobox", {
          name: "Gece ortası ışık uygulaması",
          exact: true,
        })
        .selectOption("R");
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-photo-induced",
        "false",
      );
      await lab
        .getByRole("combobox", {
          name: "Gece ortası ışık uygulaması",
          exact: true,
        })
        .selectOption("R-FR");
      await lab
        .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
        .selectOption("yes");
      await lab
        .getByRole("textbox", { name: reason, exact: true })
        .fill(
          "Son uzak kırmızı kesintiyi geri alır; etkin16 saat gece kritik10 saatten uzun.",
        );
      await lab
        .getByRole("button", { name: "Kanıtı karşılaştır", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-photo-induced",
        "true",
      );
      await expect(lab.locator("[data-longest-dark]")).toHaveAttribute(
        "data-longest-dark",
        "16",
      );
      await expect(lab.locator("[data-night-interrupted]")).toHaveAttribute(
        "data-night-interrupted",
        "false",
      );
      await expect(lab.locator(".bio024b-feedback")).toContainText(
        "Tahminin sonuçla uyumlu.",
      );
    },
    "[data-live-model]",
  ),
  forge024Case(
    forge024BiologyBLessons,
    "cicek-yapisi-ureme",
    "forge024:biology-b:cicek-yapisi-ureme",
    async (_page, lab) => {
      await lab
        .getByRole("checkbox", { name: "Taç yaprak takımı var", exact: true })
        .uncheck();
      await lab
        .getByRole("combobox", {
          name: "Üreme hücresi gelişim yolu",
          exact: true,
        })
        .selectOption("female");
      await setRange(lab, "Gelişim basamağı", 6);
      await lab
        .getByRole("combobox", {
          name: "Ana hücrede 2n kromozom sayısı",
          exact: true,
        })
        .selectOption("24");
      await lab
        .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
        .selectOption("incomplete");
      await lab
        .getByRole("textbox", { name: reason, exact: true })
        .fill(
          "Taç takımı yoksa eksik; erkek ve dişi birlikte olduğu için iki eşeylilik ayrı korunur.",
        );
      await lab
        .getByRole("button", { name: "Kanıtı karşılaştır", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-flower-complete",
        "false",
      );
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-flower-sex",
        "bisexual",
      );
      await expect(lab.locator('[data-flower-part="petal"]')).toHaveCount(0);
      await expect(lab.locator("[data-repro-cells]")).toHaveAttribute(
        "data-repro-cells",
        "7",
      );
      await expect(lab.locator("[data-repro-nuclei]")).toHaveAttribute(
        "data-repro-nuclei",
        "8",
      );
      await expect(lab.locator("[data-repro-cell]")).toHaveCount(7);
      await expect(lab.locator("[data-repro-result]")).toContainText(
        "12 kromozom",
      );
      await expect(lab.locator(".bio024b-feedback")).toContainText(
        "Tahminin sonuçla uyumlu.",
      );
    },
    "[data-live-model]",
  ),
  forge024Case(
    forge024BiologyBLessons,
    "bitki-tozlasma",
    "forge024:biology-b:bitki-tozlasma",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", {
          name: "Polenin gittiği kaynak–hedef ilişkisi",
          exact: true,
        })
        .selectOption("samePlant");
      await lab
        .getByRole("checkbox", { name: "Genetik uyum uygun", exact: true })
        .uncheck();
      await setRange(lab, "Polen yolunun adımı", 3);
      await lab
        .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
        .selectOption("arrived");
      await lab
        .getByRole("textbox", { name: reason, exact: true })
        .fill(
          "Polen aynı bireyin ikinci çiçeğine ulaşır; uyum kapalıysa fiziksel varış silinmez ama tüp başlamaz.",
        );
      await lab
        .getByRole("button", { name: "Kanıtı karşılaştır", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-pollen-category",
        "same-plant-self",
      );
      await expect(lab.locator("[data-model-result]")).toHaveAttribute(
        "data-pollen-state",
        "arrived",
      );
      await expect(lab.locator("[data-pollen-arrived]")).toHaveAttribute(
        "data-pollen-arrived",
        "true",
      );
      await expect(lab.locator("[data-pollen-tube]")).toHaveAttribute(
        "data-pollen-tube",
        "false",
      );
      await expect(lab.locator(".bio024b-feedback")).toContainText(
        "Tahminin sonuçla uyumlu.",
      );
    },
    "[data-live-model]",
  ),
];
