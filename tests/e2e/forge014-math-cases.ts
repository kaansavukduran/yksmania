import { expect, type Locator } from "@playwright/test";
import { forge014MathLessons } from "../../src/learning/forge014Math";
import { forge014Case, setRange } from "./forge014-case-helper";
async function predict(lab: Locator, guess: string, reason: string) {
  await lab
    .getByRole("combobox", { name: "Sonuç tahminin", exact: true })
    .selectOption(guess);
  await lab
    .getByRole("textbox", { name: "Modelden gerekçen", exact: true })
    .fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi karşılaştır", exact: true })
    .tap();
}
const ready = async (l: Locator) =>
  expect(l.locator(".f014m-feedback")).toContainText(
    "Tahminin bu koşullarla uyumlu.",
  );
export const math014Cases = [
  forge014Case(
    forge014MathLessons,
    "grafik-problemleri",
    "forge014-math-graphs",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Grafik türü", exact: true })
        .selectOption("pie");
      await setRange(l, "A kişi sayısı", 40);
      await predict(
        l,
        "less",
        "Son kulüp 50/120 paydadır; yarımdan azdır. Merkez açısı 150 derecedir.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Toplam: 120 kişi",
      );
      await expect(l.locator("[data-model-result]")).toContainText("açı 150°");
      await expect(l.locator("[data-chart-sector]")).toHaveCount(3);
      await expect(l.locator('[data-chart-sector="2"]')).toHaveAttribute(
        "d",
        /^M300 155 L245/,
      );
      await ready(l);
    },
  ),
  forge014Case(
    forge014MathLessons,
    "kumeler",
    "forge014-math-sets",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "Küme işlemi", exact: true })
        .selectOption("intersection");
      await l
        .getByRole("combobox", { name: "Düzenlenecek eleman", exact: true })
        .selectOption("5");
      await l
        .getByRole("checkbox", {
          name: "Seçili eleman A kümesinde",
          exact: true,
        })
        .check();
      await predict(
        l,
        "part",
        "5’i A’ya da ekleyince 3,4,5 ortak olur. Üç elemanlı kesişim sekiz elemanlı evrenin öz alt kümesidir.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText("{3, 4, 5}");
      await expect(l.locator("[data-model-result]")).toContainText(
        "Seçilen eleman sayısı: 3",
      );
      await expect(
        l.locator('[data-set-element][data-selected="true"]'),
      ).toHaveCount(3);
      await expect(l.locator('[data-set-element="5"]')).toHaveAttribute(
        "data-selected",
        "true",
      );
      const separated = await l
        .locator("[data-set-element] circle")
        .evaluateAll((nodes) => {
          const circles = nodes.map((node) => {
            const r = node.getBoundingClientRect();
            return {
              x: r.x + r.width / 2,
              y: r.y + r.height / 2,
              r: r.width / 2,
            };
          });
          return circles.every((a, i) =>
            circles
              .slice(i + 1)
              .every(
                (b) => Math.hypot(a.x - b.x, a.y - b.y) >= a.r + b.r - 0.1,
              ),
          );
        });
      expect(
        separated,
        "Venn element markers must remain individually readable",
      ).toBe(true);
      await ready(l);
    },
  ),
  forge014Case(
    forge014MathLessons,
    "kartezyen-carpim",
    "forge014-math-product",
    async (_p, l) => {
      await setRange(l, "A eleman sayısı", 0);
      await expect(l.locator("[data-model-result]")).toContainText(
        "İki sıradaki ürün de ∅’dir.",
      );
      await expect(l.locator("[data-cartesian-point]")).toHaveCount(0);
      await setRange(l, "A eleman sayısı", 3);
      await setRange(l, "B eleman sayısı", 4);
      await l
        .getByRole("checkbox", {
          name: "Kaynakların sırasını değiştir: B×A",
          exact: true,
        })
        .check();
      await l.getByRole("button", { name: "(6, 3)", exact: true }).tap();
      await predict(
        l,
        "different",
        "İlk kaynak B’nin dört, ikinci kaynak A’nın üç elemanı var; 12 çift oluşur ve iki kaynak farklıdır.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "B×A: 12 sıralı ikili",
      );
      await expect(l.locator("[data-cartesian-point]")).toHaveCount(12);
      await expect(l.locator('[data-cartesian-point="6,3"]')).toHaveAttribute(
        "cx",
        "490",
      );
      await expect(l.locator('[data-cartesian-point="6,3"]')).toHaveAttribute(
        "cy",
        "180",
      );
      await expect(l.locator("[data-cartesian-selected]")).toHaveAttribute(
        "cx",
        "490",
      );
      await expect(l.locator("[data-product-chosen]")).toContainText("(6, 3)");
      await ready(l);
    },
  ),
  forge014Case(
    forge014MathLessons,
    "mantik-onerme",
    "forge014-math-logic",
    async (_p, l) => {
      await l
        .getByRole("combobox", { name: "İncelenen yapı", exact: true })
        .selectOption("quantifier");
      await l
        .getByRole("button", { name: "0’ı kanıt olarak seç", exact: true })
        .tap();
      await predict(
        l,
        "false",
        "0 alanın elemanıdır ve 0²=0 olduğundan x²>0 yanlış olur. Tek karşı örnek her yargısını çürütür.",
      );
    },
    async (_p, l) => {
      await expect(l.locator("[data-model-result]")).toContainText(
        "Yanlış (0)",
      );
      await expect(l.locator("[data-model-result]")).toContainText(
        "koşulu sağlamayanlar {0}",
      );
      await expect(l.locator('[data-logic-counterexample="0"]')).toContainText(
        "geçerli bir karşı örnek",
      );
      await expect(l.locator("[data-logic-element]")).toHaveCount(3);
      await expect(
        l.locator('[data-logic-element][data-predicate-value="false"]'),
      ).toHaveCount(1);
      await expect(l.locator('[data-logic-evidence="0"]')).toHaveCount(1);
      await ready(l);
    },
  ),
];
