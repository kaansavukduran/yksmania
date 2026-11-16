import { expect, type Locator } from "@playwright/test";
import { forge021GeometryLessons } from "../../src/learning/forge021Geometry";
import { forge021Case, setRange } from "./forge021-case-helper";
const choose = (lab: Locator, label: string, value: string) =>
  lab.getByRole("combobox", { name: label, exact: true }).selectOption(value);
async function predict(lab: Locator, value: string, reason: string) {
  await choose(lab, "Tahminin", value);
  await lab
    .getByRole("textbox", { name: "Gerekçen", exact: true })
    .fill(reason);
  await lab.getByRole("button", { name: "Kanıtla dene", exact: true }).click();
  await expect(lab.locator(".g021-feedback")).toContainText(
    "Tahminin model kanıtıyla uyumlu.",
  );
}
export const geometry021Cases = [
  forge021Case(
    forge021GeometryLessons,
    "donusum-oteleme-donme",
    "forge021-geometry:donusum-oteleme-donme",
    async (_page, lab) => {
      await setRange(lab, "Dönme açısı", 360);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "tam turdur",
      );
      await setRange(lab, "A yatay", 4);
      await setRange(lab, "A düşey", 3);
      await setRange(lab, "Öteleme x", 0);
      await setRange(lab, "Öteleme y", 0);
      await setRange(lab, "Merkez x", 1);
      await setRange(lab, "Merkez y", -1);
      await setRange(lab, "Dönme açısı", 90);
      await choose(lab, "Şekil", "triangle");
      await expect(lab.locator("[data-transformed-triangle]")).toHaveCount(1);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "alanlar 2 ve 2",
      );
      await choose(lab, "Şekil", "point");
      await predict(
        lab,
        "same",
        "Öteleme sıfır; merkezden (3;4) vektörü 90 dereceyle (-4;3) olur.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-transform-result]")).toHaveText(
        "(-3; 2)",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "İki sıra bu verilerde aynı",
      );
      await expect(lab.locator('[data-named-point="A′/J"] circle')).toHaveCount(
        1,
      );
      await expect(lab.locator("[data-axis-end=x]")).toHaveText("x");
    },
  ),
  forge021Case(
    forge021GeometryLessons,
    "donusum-yansima-simetri",
    "forge021-geometry:donusum-yansima-simetri",
    async (_page, lab) => {
      await setRange(lab, "a katsayısı", 0);
      await setRange(lab, "b katsayısı", 0);
      await setRange(lab, "c katsayısı", 1);
      await expect(lab.locator("[data-model-result]")).toContainText(
        "ayna doğrusu değildir",
      );
      await expect(lab.locator("[data-mirror-foot]")).toHaveCount(0);
      await choose(lab, "Yöntem", "twice");
      await expect(lab.locator("[data-model-result]")).toContainText("(4; 0)");
      await choose(lab, "Yöntem", "line");
      await setRange(lab, "P yatay", -2);
      await setRange(lab, "P düşey", 1);
      await setRange(lab, "a katsayısı", 3);
      await setRange(lab, "b katsayısı", -2);
      await setRange(lab, "c katsayısı", -5);
      await predict(
        lab,
        "changed",
        "Orta H=(1;-1) aynada, PP′ normale paralel; görüntü (4;-3).",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-reflected-point]")).toHaveText("(4; -3)");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "H = (1; -1)",
      );
      await expect(lab.locator("[data-mirror-foot]")).toHaveCount(1);
      await expect(
        lab.locator('[data-geometry-segment="PP-prime"]'),
      ).toHaveCount(1);
    },
  ),
  forge021Case(
    forge021GeometryLessons,
    "cemberin-analitigi",
    "forge021-geometry:cemberin-analitigi",
    async (_page, lab) => {
      await choose(lab, "İnceleme", "general");
      await setRange(lab, "D katsayısı", -4);
      await setRange(lab, "E katsayısı", 6);
      await setRange(lab, "F katsayısı", 14);
      await expect(lab.locator("[data-circle-kind]")).toHaveText(
        "Çözüm kümesi boş.",
      );
      await expect(lab.locator("[data-primary-circle]")).toHaveCount(0);
      await setRange(lab, "F katsayısı", 13);
      await expect(lab.locator("[data-circle-kind]")).toContainText(
        "Yalnız M (2; -3)",
      );
      await choose(lab, "İnceleme", "pair");
      await setRange(lab, "Merkez x", 0);
      await setRange(lab, "Merkez y", 0);
      await setRange(lab, "N yatay", 6);
      await setRange(lab, "N düşey", 0);
      await expect(lab.locator("[data-model-result]")).toContainText("(3; 4)");
      await expect(lab.locator("[data-model-result]")).toContainText("(3; -4)");
      await choose(lab, "İnceleme", "line");
      await setRange(lab, "a katsayısı", 3);
      await setRange(lab, "b katsayısı", 4);
      await setRange(lab, "c katsayısı", -12);
      await setRange(lab, "Yarıçap", 5);
      await setRange(lab, "a katsayısı", 1);
      await setRange(lab, "b katsayısı", 0);
      await setRange(lab, "c katsayısı", -5);
      await predict(
        lab,
        "one",
        "Merkez orijinde ve r=5; x=5 doğrusu merkeze 5 birim uzakta, tek nokta (5;0).",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-circle-kind]")).toContainText(
        "tek ortak nokta",
      );
      await expect(lab.locator("[data-model-result]")).toContainText("(5; 0)");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "kiriş 0 birim",
      );
      await expect(lab.locator("[data-primary-circle]")).toHaveCount(1);
      await expect(lab.locator('[data-named-point="H/A"] circle')).toHaveCount(
        1,
      );
    },
  ),
  forge021Case(
    forge021GeometryLessons,
    "ayt-fonksiyonlar",
    "forge021-math:ayt-fonksiyonlar",
    async (_page, lab) => {
      await choose(lab, "B kümesi", "3");
      await choose(lab, "-1 girdisi", "0");
      await choose(lab, "0 girdisi", "1");
      await choose(lab, "1 girdisi", "2");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Bire bir: evet; örten: evet",
      );
      await choose(lab, "-1 girdisi", "both");
      await expect(lab.locator("[data-function-status]")).toContainText(
        "fonksiyon değildir",
      );
      await choose(lab, "İnceleme", "inverse");
      await setRange(lab, "f payda x", 1);
      await setRange(lab, "f payda sabit", -3);
      await setRange(lab, "Seçili x", 5);
      await expect(lab.locator("[data-model-result]")).toContainText("5,333");
      await choose(lab, "İnceleme", "compose");
      await setRange(lab, "f payda x", 0);
      await setRange(lab, "f payda sabit", 1);
      await choose(lab, "g kuralı", "reciprocal");
      await setRange(lab, "g sabit n", 3);
      await choose(lab, "İşlem sırası", "gf");
      await setRange(lab, "Seçili x", 1);
      await expect(lab.locator("[data-compose-result]")).toHaveText(
        "Sonuç tanımsız.",
      );
      await setRange(lab, "Seçili x", 2);
      await predict(
        lab,
        "valid",
        "Önce f(2)=5, sonra g(5)=1/(5-3)=0,5; iki payda da sıfır değil.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-compose-result]")).toHaveText(
        "Sonuç 0,5.",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Ara değer 5",
      );
      await expect(lab.locator("[data-function-curve]")).toHaveAttribute(
        "d",
        /M/,
      );
      await expect(lab.locator("[data-map-arrow]")).toHaveCount(0);
    },
  ),
  forge021Case(
    forge021GeometryLessons,
    "ayt-polinomlar",
    "forge021-math:ayt-polinomlar",
    async (_page, lab) => {
      await lab
        .getByRole("button", { name: "Sıfır polinomu", exact: true })
        .click();
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Derece tanımsız",
      );
      await choose(lab, "Bölen D", "zero");
      await expect(lab.locator("[data-division-result]")).toContainText(
        "bölme tanımsız",
      );
      await lab
        .getByRole("button", { name: "Kareli bölen", exact: true })
        .click();
      await predict(
        lab,
        "nonzero",
        "(x²-1)(x+2)+(4x+6) açılınca ilk polinom geri gelir; kalanın derecesi daha küçük.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-polynomial-value]")).toHaveText("10");
      await expect(lab.locator("[data-division-result]")).toContainText(
        "Q(x) = x + 2; R(x) = 4x + 6",
      );
      await expect(lab.locator("[data-reconstructed]")).toContainText(
        "x^3 + 2x^2 + 3x + 4",
      );
      await expect(lab.locator("[data-polynomial-curve]")).toHaveAttribute(
        "d",
        /M/,
      );
      await expect(lab.locator(".g021-steps li")).toHaveCount(2);
    },
  ),
];
