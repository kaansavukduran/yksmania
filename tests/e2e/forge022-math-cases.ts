import { expect } from "@playwright/test";
import { forge022Case, setRange } from "./forge022-case-helper";
import { forge022MathLessons } from "../../src/learning/forge022Math";
export const math022Cases = [
  forge022Case(
    forge022MathLessons,
    "ayt-ikinci-dereceden-denklemler",
    "forge022-math:ayt-ikinci-dereceden-denklemler",
    async (_page, lab) => {
      await lab.getByRole("button", { name: "Özdeşlik", exact: true }).click();
      await expect(lab.locator("[data-model-result]")).toContainText(
        "0=0 bütün gerçek x",
      );
      await setRange(lab, "c katsayısı", 2);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Sıfır olmayan sabit",
      );
      await setRange(lab, "b katsayısı", 2);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "tek doğrusal kök -1",
      );
      await setRange(lab, "a katsayısı", 1);
      await setRange(lab, "b katsayısı", 0);
      await setRange(lab, "c katsayısı", -4);
      await lab.getByLabel("Sonuç tahminin", { exact: true }).selectOption("2");
      await lab
        .getByRole("textbox", { name: "Kısa gerekçen", exact: true })
        .fill("x²=4 için iki ayrı gerçek kök var: -2 ve 2.");
      await lab
        .getByRole("button", { name: "Tahmini dene", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Gerçek kökler: -2; 2.",
      );
      await expect(lab.locator(".m022-feedback")).toContainText(
        "Tahminin bu veriyle uyumlu.",
      );
      await expect(lab.locator('[data-m022-point="root"]')).toHaveCount(2);
      const xs = await lab
        .locator('[data-m022-point="root"]')
        .evaluateAll((els) => els.map((e) => Number(e.getAttribute("cx"))));
      expect(xs[0]).toBeCloseTo(300 - 220 / 3, 7);
      expect(xs[1]).toBeCloseTo(300 + 220 / 3, 7);
    },
  ),
  forge022Case(
    forge022MathLessons,
    "ayt-karmasik-sayilar",
    "forge022-math:ayt-karmasik-sayilar",
    async (_page, lab) => {
      await lab
        .getByLabel("İşlem türü", { exact: true })
        .selectOption("divide");
      await setRange(lab, "w gerçek kısmı", 0);
      await setRange(lab, "w sanal kısmı", 0);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Sıfıra bölme",
      );
      await expect(
        lab.locator('[data-m022-point="complex-result"]'),
      ).toHaveCount(0);
      await setRange(lab, "z gerçek kısmı", 3);
      await setRange(lab, "z sanal kısmı", 2);
      await setRange(lab, "w gerçek kısmı", 1);
      await setRange(lab, "w sanal kısmı", -2);
      await lab
        .getByLabel("Sonuç tahminin", { exact: true })
        .selectOption("both");
      await lab
        .getByRole("textbox", { name: "Kısa gerekçen", exact: true })
        .fill("Eşlenikle çarpınca pay -1+8i ve payda 5 oluyor.");
      await lab
        .getByRole("button", { name: "Tahmini dene", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Sonuç -0,2 + 1,6i",
      );
      await expect(lab.locator(".m022-feedback")).toContainText(
        "Tahminin bu veriyle uyumlu.",
      );
      const p = lab.locator('[data-m022-point="complex-result"]');
      await expect(p).toHaveCount(1);
      expect(Number(await p.getAttribute("cx"))).toBeCloseTo(289, 7);
      expect(Number(await p.getAttribute("cy"))).toBeCloseTo(212, 7);
    },
  ),
  forge022Case(
    forge022MathLessons,
    "ayt-esitsizlikler",
    "forge022-math:ayt-esitsizlikler",
    async (_page, lab) => {
      await lab
        .getByLabel("Model türü", { exact: true })
        .selectOption("quotient");
      await setRange(lab, "Birinci kök", -1);
      await setRange(lab, "İkinci kök", 2);
      await setRange(lab, "Payda kökü", 2);
      await lab
        .getByLabel("İstenen işaret", { exact: true })
        .selectOption("ge");
      await lab.getByLabel("İlk kök çift katlı", { exact: true }).uncheck();
      await lab.getByLabel("Baş katsayı negatif", { exact: true }).uncheck();
      await lab
        .getByLabel("Sonuç tahminin", { exact: true })
        .selectOption("hole");
      await lab
        .getByRole("textbox", { name: "Kısa gerekçen", exact: true })
        .fill("Sadeleşen x-2 çarpanı, ilk ifadenin x=2 deliğini kapatmaz.");
      await lab
        .getByRole("button", { name: "Tahmini dene", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Çözüm kümesi: [-1; 2) ∪ (2; ∞).",
      );
      await expect(lab.locator("[data-solution-region]")).toHaveCount(2);
      const hole = lab.locator('[data-sign-point][data-denominator="true"]');
      await expect(hole).toHaveAttribute("data-included", "false");
      await expect(hole).toHaveAttribute("cx", "364");
      await expect(lab.locator(".m022-feedback")).toContainText(
        "Tahminin bu veriyle uyumlu.",
      );
    },
  ),
  forge022Case(
    forge022MathLessons,
    "ayt-parabol",
    "forge022-math:ayt-parabol",
    async (_page, lab) => {
      await lab
        .getByRole("button", { name: "Teğet doğru", exact: true })
        .click();
      await expect(lab.locator('[data-m022-point="intersection"]')).toHaveCount(
        1,
      );
      await lab.getByRole("button", { name: "Dış doğru", exact: true }).click();
      await lab.getByLabel("Sonuç tahminin", { exact: true }).selectOption("0");
      await lab
        .getByRole("textbox", { name: "Kısa gerekçen", exact: true })
        .fill("Ortak denklem x²-2x+3; delta -8 ve kesişim yok.");
      await lab
        .getByRole("button", { name: "Tahmini dene", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "en kısa uzaklık: 0,8944",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "P=(1; 1)",
      );
      await expect(lab.locator('[data-m022-point="intersection"]')).toHaveCount(
        0,
      );
      await expect(
        lab.locator('[data-m022-point="line-foot"]'),
      ).toHaveAttribute("cx", "349.5");
      await expect(lab.locator("[data-shortest-segment]")).toHaveAttribute(
        "d",
        "M327.5 272.5L349.5 283.5",
      );
      await expect(lab.locator(".m022-feedback")).toContainText(
        "Tahminin bu veriyle uyumlu.",
      );
    },
  ),
  forge022Case(
    forge022MathLessons,
    "ayt-trigonometri",
    "forge022-math:ayt-trigonometri",
    async (_page, lab) => {
      await lab
        .getByLabel("Keşif türü", { exact: true })
        .selectOption("triangle");
      await setRange(lab, "b kenarı", 3);
      await setRange(lab, "c kenarı", 5);
      await setRange(lab, "Aradaki A (derece)", 60);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "a=4,3589",
      );
      await expect(lab.locator("[data-triangle]")).toHaveCount(1);
      await lab.getByLabel("Keşif türü", { exact: true }).selectOption("wave");
      await lab
        .getByLabel("Fonksiyon türü", { exact: true })
        .selectOption("tan");
      await setRange(lab, "Açı (derece)", 90);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "payda 0; değer yok",
      );
      await setRange(lab, "İç çarpan b", 0);
      await setRange(lab, "Faz (derece)", 45);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "sabit durumda",
      );
      await lab.getByLabel("Keşif türü", { exact: true }).selectOption("roots");
      await lab
        .getByLabel("Fonksiyon türü", { exact: true })
        .selectOption("sin");
      await setRange(lab, "Hedef değer", 1);
      await lab.getByLabel("Sonuç tahminin", { exact: true }).selectOption("1");
      await lab
        .getByRole("textbox", { name: "Kısa gerekçen", exact: true })
        .fill("Sinüs 1 değerini bu tam turda yalnız 90 derecede alır.");
      await lab
        .getByRole("button", { name: "Tahmini dene", exact: true })
        .click();
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "1 kök: 90",
      );
      await expect(lab.locator('[data-m022-point="trig-root"]')).toHaveCount(1);
      await expect(lab.locator("[data-root-ray]")).toHaveCount(1);
      const p = lab.locator('[data-m022-point="trig-root"]');
      expect(Number(await p.getAttribute("cx"))).toBe(300);
      expect(Number(await p.getAttribute("cy"))).toBeCloseTo(
        300 - 220 / 1.5,
        7,
      );
      await expect(lab.locator(".m022-feedback")).toContainText(
        "Tahminin bu veriyle uyumlu.",
      );
    },
  ),
].map((lesson) => ({
  ...lesson,
  questionCount: forge022MathLessons.find((value) => value.id === lesson.id)!
    .questions.length,
}));
