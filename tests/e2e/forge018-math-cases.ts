import { expect, type Locator } from "@playwright/test";
import { forge018Case, setRange } from "./forge018-case-helper";
import { forge018MathLessons } from "../../src/learning/forge018Math";
const select = (lab: Locator, name: string, value: string) =>
  lab.getByRole("combobox", { name, exact: true }).selectOption(value);
async function predict(lab: Locator, value: string, reason: string) {
  await select(lab, "Sonuç tahminin", value);
  await lab
    .getByRole("textbox", { name: "Modelden gerekçen", exact: true })
    .fill(reason);
  await lab.getByRole("button", { name: "Kanıtı gör", exact: true }).click();
  await expect(lab.locator(".m018-feedback")).toContainText(
    "Tahminin bu koşullarla uyumlu.",
  );
}
async function point(lab: Locator, name: string, x: number, y: number) {
  const dot = lab.locator(`[data-geometry-point="${name}"]`);
  expect(Number(await dot.getAttribute("data-x"))).toBeCloseTo(x, 8);
  expect(Number(await dot.getAttribute("data-y"))).toBeCloseTo(y, 8);
  const limit = Number(
    await lab.locator("svg").getAttribute("data-axis-limit"),
  );
  expect(Number(await dot.getAttribute("cx"))).toBeCloseTo(
    360 + (x / limit) * 260,
    8,
  );
  expect(Number(await dot.getAttribute("cy"))).toBeCloseTo(
    320 - (y / limit) * 260,
    8,
  );
}
async function readableLabels(lab: Locator) {
  const labels = await lab.locator("svg").evaluate((svg) => {
    const nodes = [...svg.querySelectorAll("text")];
    const collisions: string[][] = [];
    for (let i = 0; i < nodes.length; i++)
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i].getBoundingClientRect(),
          b = nodes[j].getBoundingClientRect();
        if (
          a.left < b.right &&
          a.right > b.left &&
          a.top < b.bottom &&
          a.bottom > b.top
        )
          collisions.push([
            nodes[i].textContent ?? "",
            nodes[j].textContent ?? "",
          ]);
      }
    const text = (
      svg.querySelector('[data-axis-label="origin"]') as SVGGraphicsElement
    ).getBBox();
    const plateNode = svg.querySelector(
      "[data-origin-label-bg]",
    ) as SVGGraphicsElement;
    const plate = plateNode.getBBox();
    return {
      collisions,
      contains:
        text.x >= plate.x - 0.5 &&
        text.y >= plate.y - 0.5 &&
        text.x + text.width <= plate.x + plate.width + 0.5 &&
        text.y + text.height <= plate.y + plate.height + 0.5,
      after: [...svg.querySelectorAll("[data-geometry-line]")].every((e) =>
        Boolean(
          e.compareDocumentPosition(plateNode) &
          Node.DOCUMENT_POSITION_FOLLOWING,
        ),
      ),
    };
  });
  expect(labels.collisions).toEqual([]);
  expect(labels.contains).toBe(true);
  expect(labels.after).toBe(true);
}
export const math018Cases = [
  forge018Case(
    forge018MathLessons,
    "noktanin-analitigi",
    "forge018-math:noktanin-analitigi",
    async (_page, lab) => {
      await setRange(lab, "A apsisi x", -3);
      await setRange(lab, "A ordinatı y", 4);
      await setRange(lab, "B apsisi x", 5);
      await setRange(lab, "B ordinatı y", -2);
      await expect(lab.locator("[data-distance-result]")).toContainText(
        "|AB|=10 birim; köşeli yol=14 birim",
      );
      await point(lab, "A", -3, 4);
      await point(lab, "B", 5, -2);
      const line = lab.locator('[data-geometry-line="distance"]');
      expect(
        Number(await line.getAttribute("x2")) -
          Number(await line.getAttribute("x1")),
      ).toBeCloseTo((8 * 260) / 7, 8);
      await predict(
        lab,
        "shorter",
        "Yatay fark 8, düşey fark −6; Pisagor ile 10, köşeli yol 14 birimdir.",
      );
      await select(lab, "İncelenen ilişki", "reflection");
      await select(lab, "Ayna veya merkez", "center");
      await setRange(lab, "S apsisi x", 1);
      await setRange(lab, "S ordinatı y", 2);
      await point(lab, "A′", 5, 0);
      await expect(lab.locator("[data-reflection-result]")).toContainText(
        "A′(5; 0) x ekseninde",
      );
      await predict(
        lab,
        "x",
        "Görüntü 2S−A=(5; 0); S iki ucun orta noktasıdır.",
      );
      await select(lab, "İncelenen ilişki", "section");
      await setRange(lab, "A apsisi x", -4);
      await setRange(lab, "A ordinatı y", 2);
      await setRange(lab, "B apsisi x", 2);
      await setRange(lab, "B ordinatı y", -4);
      await select(lab, "Bölme türü", "internal");
      await setRange(lab, "AP oranı m", 1);
      await setRange(lab, "PB oranı n", 2);
      await point(lab, "P", -2, 0);
      await predict(
        lab,
        "inside",
        "A’dan B’ye üçte bir ilerleyince P=(−2; 0) parça içinde kalır.",
      );
      await select(lab, "Bölme türü", "external");
      await setRange(lab, "AP oranı m", 2);
      await expect(lab.locator('[data-geometry-point="P"]')).toHaveCount(0);
      await expect(lab.locator("[data-section-result]")).toContainText(
        "sonlu dış bölme noktası yoktur",
      );
      await predict(
        lab,
        "none",
        "Uçlar farklıyken dışarıdaki 1:1 oranı sonlu bir nokta vermez.",
      );
      await setRange(lab, "AP oranı m", 3);
      await setRange(lab, "PB oranı n", 1);
      await point(lab, "P", 5, -7);
      await predict(
        lab,
        "outside",
        "Dış bölmede 3B−A ikiye bölünür; P, B’nin ötesindedir.",
      );
      await setRange(lab, "B apsisi x", -4);
      await setRange(lab, "B ordinatı y", 2);
      await expect(lab.locator("[data-section-result]")).toContainText(
        "0/0 uzaklık oranı tanımsız",
      );
      await predict(
        lab,
        "collapsed",
        "A=B; bu tek konum tanımlı bir 3:1 uzaklık oranı değildir.",
      );
      await select(lab, "İncelenen ilişki", "midpoint");
      await setRange(lab, "M apsisi x", 2);
      await setRange(lab, "M ordinatı y", -1);
      await point(lab, "B", 8, -4);
      await readableLabels(lab);
      await predict(lab, "IV", "B=2M−A=(8; −4) olduğundan IV. bölgededir.");
      await select(lab, "İncelenen ilişki", "translation");
      await setRange(lab, "Yatay öteleme h", 4);
      await setRange(lab, "Düşey öteleme k", -2);
      await expect(lab.locator('[data-geometry-point="A′"]')).toHaveAttribute(
        "data-x",
        "0",
      );
      await predict(
        lab,
        "O",
        "A=(−4; 2) noktasına (4; −2) eklenince orijine ulaşılır.",
      );
      await select(lab, "İncelenen ilişki", "centroid");
      await setRange(lab, "A apsisi x", -3);
      await setRange(lab, "A ordinatı y", 0);
      await setRange(lab, "B apsisi x", 0);
      await setRange(lab, "B ordinatı y", 0);
      await setRange(lab, "C apsisi x", 3);
      await setRange(lab, "C ordinatı y", 0);
      await expect(lab.locator('[data-real-triangle="false"]')).toHaveCount(1);
      await expect(lab.locator("[data-centroid-result]")).toContainText(
        "yalnız koordinat ortalaması",
      );
      await predict(
        lab,
        "no",
        "Üç ordinat sıfır; noktalar doğrusal ve üçgen alanı sıfırdır.",
      );
      await setRange(lab, "A apsisi x", -4);
      await setRange(lab, "A ordinatı y", 1);
      await setRange(lab, "B apsisi x", 5);
      await setRange(lab, "B ordinatı y", 4);
      await setRange(lab, "C apsisi x", 2);
      await setRange(lab, "C ordinatı y", -5);
      await predict(
        lab,
        "yes",
        "Köşeler doğrusal değil; alan 36 birim kare ve G koordinat ortalaması (1; 0).",
      );
    },
    async (_page, lab) => {
      await expect(lab).toHaveAttribute("data-current-mode", "centroid");
      await point(lab, "G", 1, 0);
      await expect(lab.locator('[data-geometry-point="G"]')).toHaveAttribute(
        "data-y",
        "0",
      );
      await expect(lab.locator(".m018-point-list")).toContainText(
        "G (1; 0) — x ekseninde",
      );
      await point(lab, "M", 3.5, -0.5);
      await expect(lab.locator('[data-real-triangle="true"]')).toHaveCount(1);
      await expect(lab.locator('[data-geometry-line^="median-"]')).toHaveCount(
        3,
      );
      await expect(lab.locator("[data-centroid-result]")).toContainText(
        "Alan 36 birim kare",
      );
      await expect(lab.locator("[data-centroid-result]")).toContainText(
        "AG:GM=2:1",
      );
      await expect(lab.locator(".m018-feedback")).toContainText(
        "Tahminin bu koşullarla uyumlu.",
      );
      const scale = Number(
        await lab.locator("svg").getAttribute("data-equal-axis-scale"),
      );
      expect(scale).toBeCloseTo(260 / 7, 8);
      await expect(
        lab.getByRole("textbox", { name: "Modelden gerekçen", exact: true }),
      ).toHaveAttribute("maxlength", "120");
      await readableLabels(lab);
      await expect
        .poll(() =>
          lab.locator("svg text").evaluateAll((texts) =>
            Math.min(
              ...texts.map((text) => {
                const matrix = (text as SVGGraphicsElement).getScreenCTM()!;
                return (
                  parseFloat(getComputedStyle(text).fontSize) *
                  Math.hypot(matrix.a, matrix.b)
                );
              }),
            ),
          ),
        )
        .toBeGreaterThanOrEqual(16.9);
    },
  ),
];
