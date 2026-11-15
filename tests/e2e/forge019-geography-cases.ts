import { expect } from "@playwright/test";
import { forge019GeographyLessons as lessons } from "../../src/learning/forge019Geography";
import { forge019Case, setRange } from "./forge019-case-helper";
export const geography019Cases = [
  forge019Case(
    lessons,
    "bolge-turleri",
    "forge019-geo-region",
    async (_page, lab) => {
      await lab
        .getByLabel("Şekilsel ölçüt", { exact: true })
        .selectOption("wheat");
      await lab.getByLabel("Hizmet merkezi", { exact: true }).selectOption("B");
      await lab
        .getByLabel("3. hücrenin hizmetini B’ye al", { exact: true })
        .check();
      await lab
        .getByLabel("İncelenen hücre", { exact: true })
        .selectOption("2");
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("Beşerî şekilsel");
      await expect(r).toContainText("3. hücre; 500 mm; merkez B");
      await expect(r).toContainText("3, 4, 7, 8, 11");
      await expect(r).toContainText("Var / Var");
    },
  ),
  forge019Case(
    lessons,
    "ulasim-aglari",
    "forge019-geo-transport",
    async (_page, lab) => {
      await lab.getByLabel("Su yolu", { exact: true }).selectOption("panama");
      await setRange(lab, "Ortak hız (km/saat)", 20);
      await setRange(lab, "Kanal beklemesi (saat)", 18);
    },
    async (_page, lab) => {
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("Dolaşma rotası");
      await expect(r).toContainText("50 saat");
      await expect(r).toContainText("53 saat");
      await expect(lab).toContainText("Karayip Denizi");
    },
  ),
  forge019Case(
    lessons,
    "cevre-toplum",
    "forge019-geo-environment",
    async (_page, lab) => {
      const input = lab.getByRole("spinbutton", {
        name: "Başlangıç yükü (mg/gün), sayıyla",
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
      await expect(
        lab.getByRole("slider", {
          name: "Başlangıç yükü (mg/gün)",
          exact: true,
        }),
      ).toHaveValue("1800");
      const r = lab.locator("[data-model-result]");
      await expect(r).toContainText("0,864 mg/L");
      await expect(r).toContainText("864 mg/gün");
      await expect(r).toContainText("1.800 mg/gün");
    },
  ),
  forge019Case(
    lessons,
    "afetler-risk",
    "forge019-geo-disaster",
    async (_page, lab) => {
      await lab
        .getByLabel("İlk üç evi 12–14 m yerlere taşı", { exact: true })
        .check();
      await lab
        .getByLabel("Yapıları uzman denetimi ile iyileştir", { exact: true })
        .check();
      await lab
        .getByLabel("Afet döngüsü işi", { exact: true })
        .selectOption("rebuild");
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "3 / 10 ev maruz",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Daha düşük örnek kırılganlık",
      );
      await expect(
        lab.getByRole("heading", { name: "İyileştirme", exact: true }),
      ).toBeVisible();
      await expect(lab.locator('[data-home="1"]')).toHaveAttribute(
        "data-site",
        "11",
      );
    },
  ),
];
