import { expect, type Locator } from "@playwright/test";
import { forge023Case } from "./forge023-case-helper";
import { forge023PhysicsLessons } from "../../src/learning/forge023Physics";
async function number(lab: Locator, label: string, value: string) {
  await lab
    .getByRole("spinbutton", { name: label + ", sayıyla", exact: true })
    .fill(value);
}
async function compare(lab: Locator, choice: string, reason: string) {
  await lab.getByRole("radio", { name: choice, exact: true }).check();
  await lab
    .getByRole("textbox", { name: "Modelden gerekçen", exact: true })
    .fill(reason);
  await lab
    .getByRole("button", { name: "Kanıtla kıyasla", exact: true })
    .click();
  await expect(lab.locator(".physics023-feedback[role=status]")).toContainText(
    "Tahminin koşullarla uyumlu.",
  );
}
export const physics023Cases = [
  forge023Case(
    forge023PhysicsLessons,
    "isik-teorileri",
    "forge023-physics-isik-teorileri",
    async (_page, lab) => {
      await number(lab, "Açıklık (μm)", "400");
      await number(lab, "Ortam indisi ×100", "150");
      await number(lab, "Üst kol ek yolu (nm)", "600");
      await number(lab, "Seçili y ×10 (mm)", "20");
      await compare(
        lab,
        "Artar",
        "λ₀, n ve açıklık aynı. Merkez eni L ile artar; L iki kat ise en de iki kat olur.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toHaveAttribute("data-spacing-mm", "2");
      await expect(result).toHaveAttribute("data-center-mm", "2");
      await expect(result).toHaveAttribute("data-intensity", "1");
      await expect(result).toContainText("Merkez genişliği: 2 mm");
      await expect(result).toContainText("Ortam dalga boyu: 400 nm");
    },
  ),
  forge023Case(
    forge023PhysicsLessons,
    "doppler-etkisi",
    "forge023-physics-doppler-etkisi",
    async (_page, lab) => {
      await number(lab, "Kaynak frekansı (Hz)", "450");
      await number(lab, "Kaynak hızı (m/s)", "34");
      await number(lab, "Alıcı hızı (m/s)", "-34");
      await compare(
        lab,
        "Artar",
        "K sağa giderken ön dalga boyu azalır. Duran G aynı sürede daha çok tepe alır.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toHaveAttribute("data-frequency-hz", "550");
      await expect(result).toContainText("Alınan frekans: 550 Hz");
      await expect(result).toContainText("Alıcının tepe alma hızı: 374 m/s");
      await expect(lab.locator("[data-front-cycle]")).toHaveCount(7);
    },
  ),
  forge023Case(
    forge023PhysicsLessons,
    "elektromanyetik-dalgalar",
    "forge023-physics-elektromanyetik-dalgalar",
    async (_page, lab) => {
      await number(lab, "Seçili faz (°)", "180");
      await number(lab, "E açısı (°)", "90");
      await lab
        .getByRole("combobox", { name: "İlerleme yönü", exact: true })
        .selectOption("-1");
      await compare(
        lab,
        "Azalır",
        "P=N·hf sabit. f iki kat ise tek foton enerjisi iki kat; N yarıya iner.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toHaveAttribute("data-flow-x", "-1");
      await expect(result).toContainText("İlerleme: −x");
      await expect(lab.locator('[data-em-vector="E"]')).toHaveAttribute(
        "data-y",
        "0",
      );
      await expect(lab.locator('[data-em-vector="E"]')).toHaveAttribute(
        "data-z",
        "-120",
      );
      await expect(lab.locator('[data-em-vector="B"]')).toHaveAttribute(
        "data-z",
        "0",
      );
    },
  ),
  forge023Case(
    forge023PhysicsLessons,
    "atom-modelleri-fizik",
    "forge023-physics-atom-modelleri-fizik",
    async (_page, lab) => {
      await number(lab, "İlk düzey n", "4");
      await number(lab, "Son düzey n", "2");
      await compare(
        lab,
        "Azalır",
        "Eşik 13,6 Z²/n². Aynı Z için n artınca eşik azalır; E sıfıra daha yakın olur.",
      );
    },
    async (_page, lab) => {
      const result = lab.locator("[data-model-result]");
      await expect(result).toContainText("Foton yayımı");
      await expect(result).toHaveAttribute("data-initial-ev", "-0.85");
      await expect(result).toHaveAttribute("data-final-ev", "-3.4");
      await expect(result).toContainText("Foton enerjisi: 2,55 eV");
      await expect(lab.locator('[data-bohr-level="1"]')).toHaveAttribute(
        "data-energy-ev",
        "-13.6",
      );
      const plot = lab.locator('[data-physics023-plot="atom-levels"]');
      await expect(plot.locator("[data-bohr-level]")).toHaveCount(6);
    },
  ),
];
