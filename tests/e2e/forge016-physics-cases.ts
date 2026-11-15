import { expect, type Locator } from "@playwright/test";
import { forge016PhysicsLessons } from "../../src/learning/forge016Physics";
import { forge016Case, setRange } from "./forge016-case-helper";
async function predict(lab: Locator, answer: string, reason: string) {
  await lab.getByRole("radio", { name: answer, exact: true }).check();
  const text = lab.getByRole("textbox", {
    name: "Modelden gerekçen",
    exact: true,
  });
  await expect(text).toHaveAttribute("maxlength", "120");
  await text.fill(reason);
  await lab
    .getByRole("button", { name: "Tahminimi kanıtla karşılaştır", exact: true })
    .tap();
}
async function measuredLabels(lab: Locator) {
  await expect(lab.locator(".physics016-feedback")).toContainText(
    "Tahminin verilen koşullarla uyumlu.",
  );
  const labels = await lab
    .locator("svg[data-physics016-plot] text")
    .evaluateAll((nodes) =>
      nodes.map((node) => {
        const t = node as SVGTextElement,
          ctm = t.getScreenCTM(),
          b = t.getBBox(),
          v = t.ownerSVGElement!.viewBox.baseVal;
        return {
          text: t.textContent,
          font: ctm
            ? parseFloat(getComputedStyle(t).fontSize) *
              Math.hypot(ctm.a, ctm.b)
            : 0,
          inside:
            b.x >= v.x - 0.01 &&
            b.y >= v.y - 0.01 &&
            b.x + b.width <= v.x + v.width + 0.01 &&
            b.y + b.height <= v.y + v.height + 0.01,
        };
      }),
    );
  expect(labels.length).toBeGreaterThan(0);
  for (const label of labels) {
    expect(label.font, label.text ?? "").toBeGreaterThanOrEqual(16);
    expect(label.inside, label.text ?? "").toBe(true);
  }
}
export const physics016Cases = [
  forge016Case(
    forge016PhysicsLessons,
    "ayt-newton-hareket-yasalari",
    "forge016-physics-ayt-newton-hareket-yasalari",
    async (_page, lab) => {
      await lab
        .getByRole("button", { name: "Durgun dengeyi kur", exact: true })
        .tap();
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Statik denge",
      );
      await expect(lab.locator('[data-force="friction"]')).toHaveAttribute(
        "data-x",
        "-12",
      );
      await lab
        .getByRole("combobox", { name: "Anlık kayma durumu", exact: true })
        .selectOption("up");
      await predict(
        lab,
        "Pozitif ivme",
        "Yatayda N = 40 N; yukarı kaymada f = −10 N, Fnet = 12 − 10 = 2 N; a = 0,5 m/s².",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-model-result]")).toContainText(
        "İvme: 0,5 m/s²",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Kinetik sürtünme",
      );
      await expect(lab.locator('[data-force="friction"]')).toHaveAttribute(
        "data-x",
        "-10",
      );
      await expect(lab.locator('[data-force="weight"]')).toHaveAttribute(
        "data-y",
        "-40",
      );
      await expect(lab.locator('[data-force="normal"]')).toHaveAttribute(
        "data-y",
        "40",
      );
      const geometry = await lab
        .locator('[data-force="friction"]')
        .evaluate((node) => {
          const p = node as SVGPathElement,
            a = p.getPointAtLength(0),
            b = p.getPointAtLength(p.getTotalLength());
          return {
            a: { x: a.x, y: a.y },
            b: { x: b.x, y: b.y },
            scale: Number(p.getAttribute("data-scale")),
          };
        });
      expect(geometry.b.x - geometry.a.x).toBeCloseTo(-10 * geometry.scale);
      expect(geometry.b.y).toBeCloseTo(geometry.a.y);
      const external = await lab
        .locator('[data-force="external"]')
        .evaluate((node) => {
          const p = node as SVGPathElement;
          return (
            p.getPointAtLength(p.getTotalLength()).x - p.getPointAtLength(0).x
          );
        });
      expect(external / (geometry.b.x - geometry.a.x)).toBeCloseTo(-1.2);
      await measuredLabels(lab);
    },
  ),
  forge016Case(
    forge016PhysicsLessons,
    "bir-boyutta-sabit-ivmeli-hareket",
    "forge016-physics-bir-boyutta-sabit-ivmeli-hareket",
    async (_page, lab) => {
      await setRange(lab, "Seçili zaman (s)", 4);
      await expect(lab.locator('[data-force-zero="velocity"]')).toHaveCount(1);
      await expect(lab.locator("[data-position-point]")).toHaveAttribute(
        "data-world-x",
        "34",
      );
      await lab
        .getByRole("button", { name: "Dönüşten sonrasını gör", exact: true })
        .tap();
      await predict(
        lab,
        "Yol daha büyük",
        "4 s’de dönüş; ileri 24 m ve geri 6 m: yol 30 m, yer değiştirme 18 m; son hız −6 m/s.",
      );
    },
    async (_page, lab) => {
      await expect(lab.locator("[data-position-point]")).toHaveAttribute(
        "data-world-x",
        "28",
      );
      await expect(lab.locator("[data-position-point]")).toHaveAttribute(
        "data-time",
        "6",
      );
      await expect(lab.locator('[data-force="velocity"]')).toHaveAttribute(
        "data-x",
        "-6",
      );
      await expect(lab.locator("[data-motion-path]")).toHaveAttribute(
        "data-distance",
        "30",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Yer değiştirme: 18 m",
      );
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Alınan yol: 30 m",
      );
      const arrow = await lab
        .locator('[data-force="velocity"]')
        .evaluate((e) => {
          const p = e as SVGPathElement;
          return {
            start: p.getPointAtLength(0).x,
            end: p.getPointAtLength(p.getTotalLength()).x,
          };
        });
      expect(arrow.end).toBeLessThan(arrow.start);
      const position = await lab
        .locator('[data-physics016-plot="motion-position"]')
        .evaluate((node) => {
          const svg = node as SVGSVGElement;
          const tick = (text: string) =>
            Number(
              [...svg.querySelectorAll("text")]
                .find((t) => t.textContent === text)!
                .getAttribute("x"),
            );
          return {
            at22: tick("22"),
            at34: tick("34"),
            actual: Number(
              svg.querySelector("[data-position-point]")!.getAttribute("cx"),
            ),
          };
        });
      expect(position.actual).toBeCloseTo((position.at22 + position.at34) / 2);
      await measuredLabels(lab);
    },
  ),
  forge016Case(
    forge016PhysicsLessons,
    "sabit-ivmeli-hareket-grafikleri",
    "forge016-physics-sabit-ivmeli-hareket-grafikleri",
    async (_page, lab) => {
      await lab
        .getByRole("button", { name: "İki evre örneğini kur", exact: true })
        .tap();
      await lab
        .getByRole("button", { name: "İlk konumu +10 m kaydır", exact: true })
        .tap();
      await predict(
        lab,
        "Yol daha büyük",
        "x0 ötelenince v ve a değişmez. Alanlar +6,75 ve −0,25 m: yer değiştirme 6,5 m, yol 7 m.",
      );
    },
    async (_page, lab) => {
      await expect(
        lab.locator('[data-graph-point="position"]'),
      ).toHaveAttribute("data-value", "26.5");
      await expect(
        lab.locator('[data-graph-point="velocity"]'),
      ).toHaveAttribute("data-value", "0");
      await expect(
        lab.locator('[data-graph-point="acceleration"]'),
      ).toHaveAttribute("data-value", "-1");
      await expect(lab.locator("[data-model-result]")).toContainText(
        "Yer değiştirme: 6,5 m; yol: 7 m; hız değişimi: 1 m/s",
      );
      const areas = await lab
        .locator("[data-velocity-area]")
        .evaluateAll((nodes) =>
          nodes.map((n) => Number(n.getAttribute("data-area"))),
        );
      expect(areas).toEqual([-0.25, 2.25, 4.5]);
      const path = lab.locator(
        '[data-physics016-plot="graph-position"] [data-graph-segment="0"]',
      );
      await expect(path).toHaveAttribute("d", /Q/);
      const curve = await lab
        .locator('[data-physics016-plot="graph-position"]')
        .evaluate((node) => {
          const svg = node as SVGSVGElement,
            ticks = [
              ...svg.querySelectorAll('text[dominant-baseline="middle"]'),
            ];
          const first = ticks[0],
            last = ticks.at(-1)!,
            parse = (t: Element) => Number(t.textContent!.replace(",", "."));
          const yScale =
            (Number(last.getAttribute("y")) - Number(first.getAttribute("y"))) /
            (parse(last) - parse(first));
          const timeTicks = [
            ...svg.querySelectorAll("text:not([dominant-baseline])"),
          ].filter((t) => /^\d+(,\d+)?$/.test(t.textContent!));
          return {
            yZero: Number(first.getAttribute("y")) - parse(first) * yScale,
            yScale,
            timeZero: Number(timeTicks[0].getAttribute("x")),
            timeFive: Number(timeTicks.at(-1)!.getAttribute("x")),
            values: svg
              .querySelector('[data-graph-segment="0"]')!
              .getAttribute("d")!
              .match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/g)!
              .map(Number),
            selectedY: Number(
              svg
                .querySelector('[data-graph-point="position"]')!
                .getAttribute("cy"),
            ),
          };
        });
      expect(curve.values).toHaveLength(6);
      const tx = (t: number) =>
          curve.timeZero + (t / 5) * (curve.timeFive - curve.timeZero),
        py = (x: number) => curve.yZero + x * curve.yScale;
      // Exact quadratic control: x(0)=20, initial slope=-1, a=2; control at t=1 is19, endpoint x(2)=22.
      for (const [index, expected] of [
        tx(0),
        py(20),
        tx(1),
        py(19),
        tx(2),
        py(22),
      ].entries())
        expect(curve.values[index]).toBeCloseTo(expected, 6);
      expect(curve.selectedY).toBeCloseTo(py(26.5), 6);
      const negativeArea = await lab
        .locator('[data-physics016-plot="graph-velocity"]')
        .evaluate((node) => {
          const svg = node as SVGSVGElement,
            ticks = [
              ...svg.querySelectorAll('text[dominant-baseline="middle"]'),
            ],
            first = ticks[0],
            last = ticks.at(-1)!;
          const number = (t: Element) =>
              Number(t.textContent!.replace(",", ".")),
            ys =
              (Number(last.getAttribute("y")) -
                Number(first.getAttribute("y"))) /
              (number(last) - number(first));
          return {
            zero: Number(first.getAttribute("y")) - number(first) * ys,
            ys,
            points: svg
              .querySelector("[data-velocity-area]")!
              .getAttribute("d")!
              .match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/g)!
              .map(Number),
          };
        });
      const expectedPolygon = [
        tx(0),
        negativeArea.zero,
        tx(0),
        negativeArea.zero - negativeArea.ys,
        tx(0.5),
        negativeArea.zero,
        tx(0.5),
        negativeArea.zero,
      ];
      expect(negativeArea.points).toHaveLength(8);
      for (const [index, expected] of expectedPolygon.entries())
        expect(negativeArea.points[index]).toBeCloseTo(expected, 6);
      await expect(
        lab.locator(
          '[data-physics016-plot="graph-acceleration"] [data-graph-segment="0"]',
        ),
      ).toHaveAttribute("d", /H/);
      await measuredLabels(lab);
    },
  ),
];
