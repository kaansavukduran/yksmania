import { expect, type Locator } from "@playwright/test";
import { forge019Case, setRange } from "./forge019-case-helper";
import { forge019MathLessons } from "../../src/learning/forge019Math";
const select = (lab: Locator, name: string, value: string) =>
  lab.getByRole("combobox", { name, exact: true }).selectOption(value);
async function predict(lab: Locator, value: string, reason: string) {
  await select(lab, "Sonuç tahminin", value);
  await lab
    .getByRole("textbox", { name: "Modelden gerekçen", exact: true })
    .fill(reason);
  await lab.getByRole("button", { name: "Kanıtı gör", exact: true }).click();
  await expect(lab.locator(".m019-feedback")).toContainText(
    "Tahminin bu koşullarla uyumlu.",
  );
}
async function coeff(
  lab: Locator,
  name: "d" | "e",
  a: number,
  b: number,
  c: number,
) {
  for (const [key, value] of [
    ["a", a],
    ["b", b],
    ["c", c],
  ] as const)
    await setRange(lab, `${name} için ${key}`, value);
}
async function point(lab: Locator, name: string, x: number, y: number) {
  const dot = lab.locator(`[data-names~="${name}"]`);
  await expect(dot).toHaveCount(1);
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
async function realLine(
  lab: Locator,
  name: string,
  a: number,
  b: number,
  c: number,
) {
  const line = lab.locator(`[data-math-line="${name}"]`);
  await expect(line).toHaveCount(1);
  const limit = Number(
    await lab.locator("svg").getAttribute("data-axis-limit"),
  );
  for (const suffix of ["1", "2"]) {
    const x =
      ((Number(await line.getAttribute(`x${suffix}`)) - 360) * limit) / 260;
    const y =
      ((320 - Number(await line.getAttribute(`y${suffix}`))) * limit) / 260;
    expect(a * x + b * y + c).toBeCloseTo(0, 8);
    expect(
      Math.min(Math.abs(Math.abs(x) - limit), Math.abs(Math.abs(y) - limit)),
    ).toBeLessThan(1e-7);
  }
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
      after: [
        ...svg.querySelectorAll(
          "[data-geometry-line], [data-math-line], [data-axis-triangle]",
        ),
      ].every((e) =>
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
  await expect
    .poll(() =>
      lab.locator("svg text").evaluateAll((texts) =>
        Math.min(
          ...texts.map((node) => {
            const svg = node as SVGGraphicsElement,
              m = svg.getScreenCTM();
            return (
              Number.parseFloat(getComputedStyle(node).fontSize) *
              Math.hypot(m?.a ?? 0, m?.b ?? 0)
            );
          }),
        ),
      ),
    )
    .toBeGreaterThanOrEqual(16.9);
}
export const math019Cases = [
  forge019Case(
    forge019MathLessons,
    "dogrunun-analitigi",
    "forge019-math:dogrunun-analitigi",
    async (_page, lab) => {
      await setRange(lab, "B apsisi x", -2);
      await setRange(lab, "B ordinatı y", 3);
      await expect(lab.locator("[data-math-line]")).toHaveCount(0);
      await expect(lab.locator("[data-build-detail]")).toContainText(
        "Yetersiz veri",
      );
      await predict(
        lab,
        "insufficient",
        "A ve B aynı noktada; tek nokta bütün doğrulardan birini seçmez.",
      );
      await select(lab, "Veri biçimi", "general");
      await coeff(lab, "d", 0, 0, 0);
      await predict(
        lab,
        "plane",
        "0=0 her noktada sağlanır; çözüm kümesi tüm düzlemdir.",
      );
      await coeff(lab, "d", 0, 0, 1);
      await predict(lab, "empty", "0x+0y+1=0 hiçbir noktada sağlanmaz.");
      await select(lab, "Veri biçimi", "point");
      await select(lab, "Yön türü", "vertical");
      await expect(lab.locator("[data-build-detail]")).toContainText(
        "eğim tanımsız",
      );
      await realLine(lab, "d", 1, 0, 2);
      await predict(
        lab,
        "unique",
        "Apsisi −2 olan bütün noktalar düşey x=−2 doğrusunu verir.",
      );
      await select(lab, "Yön türü", "finite");
      await setRange(lab, "A apsisi x", 1);
      await setRange(lab, "A ordinatı y", 2);
      await setRange(lab, "Eğim m", 1.5);
      await realLine(lab, "d", 1.5, -1, 0.5);
      await predict(
        lab,
        "unique",
        "y−2=1,5(x−1) bir nokta ve sonlu eğimle tek doğru verir.",
      );
      await select(lab, "İncelenen ilişki", "pair");
      await lab.getByRole("button", { name: "Tek nokta", exact: true }).click();
      await point(lab, "S", 3, 1);
      await expect(lab.locator("[data-right-angle]")).toHaveCount(1);
      await predict(
        lab,
        "intersect",
        "S=(3; 1) iki denklemi de sağlar; normal vektörlerin iç çarpımı sıfırdır.",
      );
      await lab.getByRole("button", { name: "Paralel", exact: true }).click();
      await expect(lab.locator('[data-names~="S"]')).toHaveCount(0);
      await expect(lab.locator("[data-pair-detail]")).toContainText(
        "uzaklık 2 birim",
      );
      await predict(
        lab,
        "parallel",
        "İkinci denklemi −2'ye bölünce normal aynı, sabit farklı olur.",
      );
      await lab.getByRole("button", { name: "Çakışık", exact: true }).click();
      await predict(
        lab,
        "same",
        "İkinci denklemin bütün katsayıları birincinin −2 katıdır.",
      );
      await lab.getByRole("button", { name: "Yatay-dik", exact: true }).click();
      await point(lab, "S", 2, 3);
      await expect(lab.locator("[data-pair-detail]")).toContainText(
        "Doğrular diktir",
      );
      await readableLabels(lab);
      await select(lab, "İncelenen ilişki", "area");
      await coeff(lab, "d", 2, 3, -18);
      await point(lab, "U", 9, 0);
      await point(lab, "V", 0, 6);
      await expect(lab.locator("[data-axis-triangle]")).toHaveCount(1);
      await expect(lab.locator("[data-area-detail]")).toContainText(
        "=27 birim kare",
      );
      await predict(
        lab,
        "triangle",
        "Kesişimler U=(9; 0), V=(0; 6); dik üçgenin alanı 9×6/2=27.",
      );
      await coeff(lab, "d", 2, 3, 0);
      await expect(lab.locator("[data-axis-triangle]")).toHaveCount(0);
      await predict(
        lab,
        "degenerate",
        "Doğru orijinden geçtiğinde iki eksen kesişimi de O olur.",
      );
      await coeff(lab, "d", 1, 0, -2);
      await predict(
        lab,
        "unbounded",
        "x=2 düşeyi y eksenine paraleldir; üç sınır kapalı üçgen oluşturmaz.",
      );
      await select(lab, "Alan veya uzaklık", "parallel");
      await lab.getByRole("button", { name: "Paralel", exact: true }).click();
      await point(lab, "K", 0.6, 0.8);
      await point(lab, "H", 1.8, 2.4);
      await expect(lab.locator("[data-parallel-detail]")).toContainText(
        "2 birim",
      );
      await predict(
        lab,
        "parallel",
        "Normal katsayılar aynı ölçeğe gelince sabit farkı 10; normalin normu 5'tir.",
      );
      await select(lab, "İncelenen ilişki", "distance");
      await setRange(lab, "P apsisi x", -1);
      await setRange(lab, "P ordinatı y", 2);
      await point(lab, "P", -1, 2);
      await point(lab, "H", -1, 2);
      await expect(lab.locator("[data-right-angle]")).toHaveCount(0);
      await predict(
        lab,
        "on",
        "3×(−1)+4×2−5=0; P doğru üzerindedir, H=P olur.",
      );
      await setRange(lab, "P apsisi x", 3);
      await setRange(lab, "P ordinatı y", 4);
      await predict(
        lab,
        "off",
        "Pay 20, normalin normu 5; dik uzaklık 4 ve ayak H=(0,6; 0,8).",
      );
    },
    async (_page, lab) => {
      await expect(lab).toHaveAttribute("data-family", "distance");
      await expect(lab.locator("[data-projection-detail]")).toContainText(
        "H(0,6; 0,8); |PH|=4 birim",
      );
      await expect(lab.locator("[data-main-outcome]")).toContainText("δ=4");
      await point(lab, "P", 3, 4);
      await point(lab, "H", 0.6, 0.8);
      await realLine(lab, "d", 3, 4, -5);
      const helper = lab.locator('[data-geometry-line="perpendicular"]');
      await expect(helper).toHaveCount(1);
      const dx =
        Number(await helper.getAttribute("x2")) -
        Number(await helper.getAttribute("x1"));
      const dy =
        Number(await helper.getAttribute("y2")) -
        Number(await helper.getAttribute("y1"));
      expect(dx / dy).toBeCloseTo(-3 / 4, 8);
      await expect(lab.locator("[data-right-angle]")).toHaveCount(1);
      await expect(lab.locator(".m019-feedback")).toContainText(
        "Tahminin bu koşullarla uyumlu.",
      );
      await expect(
        lab.getByRole("textbox", { name: "Modelden gerekçen", exact: true }),
      ).toHaveAttribute("maxlength", "120");
      await readableLabels(lab);
    },
  ),
];
