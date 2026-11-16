import { expect } from "@playwright/test";
import { forge020GeographyLessons as lessons } from "../../src/learning/forge020Geography";
import { forge020Case, setRange } from "./forge020-case-helper";
export const geography020Cases = [
  forge020Case(
    lessons,
    "dunya-sekli-hareket",
    "forge020-geo-earth",
    async (_page, lab) => {
      await lab
        .getByLabel("Yılın dönemi", { exact: true })
        .selectOption("december");
      const n = lab.getByRole("spinbutton", {
        name: "Enlem (°), sayıyla",
        exact: true,
      });
      await n.fill("66.5");
      await n.press("Enter");
      await expect(lab.locator("[data-model-result]")).toContainText("Gündüz 0 saat");
      await lab.getByLabel("Sonuç tahminin", { exact: true }).selectOption("night");
      await lab.getByLabel("Gerekçen", { exact: true }).fill("Kutup dairesinde aralık gece sınırı verilmiştir.");
      await lab.getByRole("button", { name: "Tahmini dene", exact: true }).click();
      await expect(lab.locator("[data-prediction-feedback]")).toContainText("Seçimin kanıtla uyumlu.");
      await n.fill("70");
      await n.press("Enter");
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("Gündüz 0 saat");
      await expect(r).toContainText("24 saat");
      await expect(r).toContainText("-3,5°");
      await expect(r).toContainText("Ufuk üstü Güneş yok");
    },
  ),
  forge020Case(
    lessons,
    "cografi-konum",
    "forge020-geo-position",
    async (_page, lab) => {
      const n = lab.getByRole("spinbutton", {
        name: "Enlem (°), sayıyla",
        exact: true,
      });
      await n.fill("60");
      await n.press("Enter");
      await setRange(lab, "Boylam (°)", -70);
      await lab
        .getByLabel("Çevre sahnesi", { exact: true })
        .selectOption("barrier");
      await lab.getByLabel("Karşı meridyeni göster", { exact: true }).check();
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("Orta kuşak");
      await expect(r).toContainText("55,5 km");
      await expect(r).toContainText("110°");
      await expect(r).toContainText("835 km/saat");
      await expect(lab).toContainText("Denize yakın, dağ ardı");
    },
  ),
  forge020Case(
    lessons,
    "harita-bilgisi",
    "forge020-geo-map",
    async (_page, lab) => {
      await lab
        .getByLabel("Başlangıç ölçeği", { exact: true })
        .selectOption("250000");
      await lab
        .getByLabel("Boyut çarpanı", { exact: true })
        .selectOption("0.5");
      const n = lab.getByRole("spinbutton", {
        name: "İlk kâğıt kenarı (cm), sayıyla",
        exact: true,
      });
      await n.focus();
      await n.press("ControlOrMeta+A");
      await n.press("Backspace");
      await n.pressSequentially("2.4");
      await expect(n).toHaveValue("2.4");
      await n.press("Enter");
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("1 : 500.000");
      await expect(r).toContainText("6 km");
      await expect(r).toContainText("1,2 cm");
      await expect(r).toContainText("36 km²");
      await expect(r).toContainText("%2");
      await expect(
        lab.getByRole("spinbutton", {
          name: "İlk kâğıt kenarı (cm), sayıyla",
          exact: true,
        }),
      ).toHaveValue("2.4");
    },
  ),
];
