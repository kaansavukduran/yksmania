import { expect, type Locator } from "@playwright/test";
import { forge024Case, setRange } from "./forge024-case-helper";
import { forge024MathLessons } from "../../src/learning/forge024Math";
import { aytLessons } from "../../src/learning/aytLessons";
async function predict(lab: Locator, guess: string, reason: string) {
  await lab
    .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
    .selectOption(guess);
  await lab
    .getByRole("textbox", { name: "Modelden gerekçen", exact: true })
    .fill(reason);
  await lab.getByRole("button", { name: "Kanıtı gör", exact: true }).click();
  await expect(lab.locator(".math024-feedback")).toContainText(
    "Tahminin bu koşullarla uyumlu.",
  );
}
export const math024Cases = [
  forge024Case(
    forge024MathLessons,
    "ayt-turev-alma-kurallari",
    "forge024-math:ayt-turev-alma-kurallari",
    async (_page, lab) => {
      await lab
        .getByRole("combobox", { name: "İşlem", exact: true })
        .selectOption("composition");
      await setRange(lab, "u: x katsayısı", -1);
      await setRange(lab, "u: sabit", 0);
      await setRange(lab, "v: x katsayısı", 3);
      await setRange(lab, "v: sabit", 1);
      await predict(
        lab,
        "positive",
        "İç çıktı 4, dış türev 7; iç türev 3 ile çarpınca 21 olur.",
      );
      await expect(lab.locator("[data-rule-result]")).toHaveText(
        "İşlem değeri: 12. Türev: 21.",
      );
      await expect(lab.locator("[data-rule-flow]")).toHaveAttribute(
        "data-rule-flow",
        "composition",
      );
      await lab
        .getByRole("combobox", { name: "İnceleme", exact: true })
        .selectOption("power");
      await lab
        .getByRole("combobox", { name: "Rasyonel üs", exact: true })
        .selectOption("1/2");
      await setRange(lab, "Kuvvetin girdisi", 0);
      await expect(lab.locator("[data-power-result]")).toContainText(
        "Tanım kümesinin sınırı",
      );
      await expect(lab.locator(".math024-feedback")).toHaveCount(0);
      await predict(
        lab,
        "sinir-noktasi",
        "Sıfır karekök alanının sınırıdır; solda gerçek girdiler bulunmaz.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-power-result]")).toContainText(
        "Tanım kümesinin sınırı",
      );
      await expect(lab.locator(".math024-feedback")).toContainText(
        "Tahminin bu koşullarla uyumlu.",
      );
    },
  ),
  forge024Case(
    aytLessons,
    "turev-teget",
    "forge024-math:turev-teget",
    async (_page, lab) => {
      await setRange(lab, "C: x katsayısı", 0);
      await setRange(lab, "Temas apsisi a", 1);
      await lab
        .getByRole("combobox", { name: "Kiriş adımı h", exact: true })
        .selectOption("6");
      await predict(
        lab,
        "negative",
        "Temas eğimi 3 olduğundan normal eğimi −1/3; ikisi aynı noktadan geçer.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-contact-result]")).toHaveText(
        "Temas T=(1; 1), teğet eğimi 3.",
      );
      await expect(lab.locator("[data-linear-result]")).toHaveText(
        "Doğrusal tahmin 2,5; gerçek değer 3,375; gerçek − tahmin 0,875.",
      );
      await expect(lab.locator("[data-extra-intersection]")).toHaveText(
        "Diğer kesişim: (-2; -8).",
      );
      await expect(lab.locator("[data-tangent-graph]")).toHaveAttribute(
        "data-unit-scale",
        "48",
      );
      const normal = lab.locator(".math024-normal"),
        tangent = lab.locator(".math024-tangent-line");
      const vector = async (el: Locator) =>
        el.getAttribute("d").then((d) => {
          const n = d!.match(/-?\d+(?:\.\d+)?(?:e[+-]?\d+)?/g)!.map(Number);
          return [n[2] - n[0], n[3] - n[1]];
        });
      const n = await vector(normal),
        t = await vector(tangent);
      expect(n[0] * t[0] + n[1] * t[1]).toBeCloseTo(0, 8);
    },
  ),
];
