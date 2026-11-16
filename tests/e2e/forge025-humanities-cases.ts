import { expect } from "@playwright/test";
import { forge025Case } from "./forge025-case-helper";
import { forge025HumanitiesLessons as lessons } from "../../src/learning/forge025Humanities";
export const humanities025Cases = [
  forge025Case(
    lessons,
    "islam-dusuncesinde-tasavvufi-yorumlar",
    "forge025-humanities:islam-dusuncesinde-tasavvufi-yorumlar",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Aranan bilgi türü", exact: true })
        .selectOption("1");
      await l
        .getByRole("checkbox", {
          name: "Aynı olaya ait ek kayıt var",
          exact: true,
        })
        .check();
      await l
        .getByRole("textbox", { name: "Gerekçen", exact: true })
        .fill(
          "İlk not yer söylemiyor; aynı olayın ek kaydı dergâhı açıkça belirtiyor.",
        );
      await l
        .getByRole("button", { name: "Gerekçemle karşılaştır", exact: true })
        .click();
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Bilgi açık: Dergâh",
      );
      await expect(
        l.getByRole("checkbox", {
          name: "Aynı olaya ait ek kayıt var",
          exact: true,
        }),
      ).toBeChecked();
    },
  ),
  forge025Case(
    lessons,
    "guncel-dini-meseleler",
    "forge025-humanities:guncel-dini-meseleler",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Koşul dosyası", exact: true })
        .selectOption("4");
      await l
        .getByRole("combobox", {
          name: "Birinci koşul: Alıcı rızası",
          exact: true,
        })
        .selectOption("1");
      await l
        .getByRole("combobox", {
          name: "İkinci koşul: Verici izni",
          exact: true,
        })
        .selectOption("0");
      await l
        .getByRole("combobox", {
          name: "Üçüncü koşul: Uzman uygunluğu",
          exact: true,
        })
        .selectOption("1");
      await l
        .getByRole("textbox", { name: "Gerekçen", exact: true })
        .fill(
          "Alıcının rızası vericinin iznini kanıtlamaz; ikinci koşulun kaydı eksik.",
        );
      await l
        .getByRole("button", { name: "Gerekçemle karşılaştır", exact: true })
        .click();
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "İddia için bilgi eksik",
      );
      await expect(
        l.getByRole("combobox", {
          name: "İkinci koşul: Verici izni",
          exact: true,
        }),
      ).toHaveValue("0");
    },
  ),
  forge025Case(
    lessons,
    "hint-ve-cin-dinleri",
    "forge025-humanities:hint-ve-cin-dinleri",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "A ipucu", exact: true })
        .selectOption("1");
      await l
        .getByRole("combobox", { name: "B ipucu", exact: true })
        .selectOption("7");
      await l
        .getByRole("checkbox", {
          name: "İpuçları aynı dosyaya ait",
          exact: true,
        })
        .uncheck();
      await l
        .getByRole("textbox", { name: "Gerekçen", exact: true })
        .fill(
          "Vedalar ve Tao Te Ching farklı dosyalarda; tek dosyanın ortak adayı diye birleştirmem.",
        );
      await l
        .getByRole("button", { name: "Gerekçemle karşılaştır", exact: true })
        .click();
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "İki kayıt ayrı ele alınmalı",
      );
      await expect(l.locator("[data-model-result]")).toContainText("Hinduizm");
      await expect(l.locator("[data-model-result]")).toContainText("Taoizm");
    },
  ),
];
