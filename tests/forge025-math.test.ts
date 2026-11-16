import {
  Children,
  createElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import {
  primitiveFamily025,
  definiteIntegral025,
  riemannArea025,
  forge025MathGuides,
  forge025MathLessons,
  forge025MathTopics,
  type Polynomial025,
  type Quadratic025,
  type RiemannMethod025,
} from "../src/learning/forge025Math";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
const mock = vi.hoisted(() => ({
  saved: {} as Record<string, string | number | boolean>,
}));
vi.mock("../src/learning/useExploration", () => ({
  useExploration: (_id: string, defaults: object) => [
    Object.fromEntries(
      Object.entries(defaults).map(([key, value]) => [
        key,
        typeof mock.saved[key] === typeof value ? mock.saved[key] : value,
      ]),
    ),
    (patch: typeof mock.saved) => {
      mock.saved = { ...defaults, ...mock.saved, ...patch };
    },
  ],
}));
vi.mock("../src/store", () => ({
  useApp: () => ({
    state: { explorations: new Proxy({}, { get: () => mock.saved }) },
  }),
}));
import Forge025MathLab from "../src/learning/Forge025MathLab";
const plain = (s: string) => s.replace(/\s/g, "");
const value = (c: readonly number[], x: number) =>
  c.reduce((sum, n, i) => sum + n * x ** (c.length - 1 - i), 0);
const integral = (c: readonly number[], a: number, b: number) =>
  c.reduce((sum, n, i) => {
    const p = c.length - i;
    return sum + (n * (b ** p - a ** p)) / p;
  }, 0);
const expected = [
  [
    "2x³−2x²+3x+C",
    "2x^(3/2)+2/x²+C",
    "15",
    "(5x−2)³/15+C",
    "(x³+4)³/3+C",
    "(x²+2x+5)³/6+C",
    "(x−3)⁴",
    "Bütün sabit fonksiyonlar: C",
    "Bu formül uygulanamaz; payda 0 olur.",
    "9",
    "x+4/x+C",
    "2",
    "92",
    "(6x²−5)dx",
    "(2/3)x^(3/2)+2√x+C",
    "2t+C",
  ],
  [
    "10",
    "−3",
    "10",
    "14",
    "9/2",
    "5",
    "32/3",
    "13/3",
    "7/2",
    "f(3)",
    "4f(4)",
    "−3",
    "0",
    "[4,10]",
    "∫₀³f=∫₀³g",
    "5",
  ],
  [
    "5/8",
    "6",
    "Sol toplam 5, gerçek integral 4; sol toplam daha büyük.",
    "Alt 0, üst 2.",
    "18",
    "4",
    "6",
    "4/3",
    "46/3",
    "4≤I≤7 ve |S−I|≤3.",
    "Örnek noktaları kendi aralıklarında kaldıkça toplamlar belirli integrale yaklaşır.",
    "0",
    "L azalamaz, U artamaz.",
    "Sol uç 2, alt toplam 0.",
    "−1 ve 2",
    "1/2 ve 13",
  ],
];
describe("AYT matematik 025: ters türev, birikim ve alan", () => {
  it("48 bağımsız anlamsal anahtarı, periyotsuz dengeli konumları ve gerekçe bağlarını korur", () => {
    forge025MathLessons.forEach((lesson, index) => {
      expect(
        lesson.questions.map((q) => plain(q.options[q.answer].tr)),
      ).toEqual(expected[index].map(plain));
      const positions = lesson.questions.map((q) => q.answer),
        counts = [0, 1, 2, 3, 4].map(
          (p) => positions.filter((v) => v === p).length,
        );
      expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
      for (let period = 1; period < 10; period++)
        expect(positions.every((v, i) => v === positions[i % period])).toBe(
          false,
        );
      for (const q of lesson.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => plain(o.tr))).size).toBe(5);
        const g = questionGuidanceSchema.parse(q.guidance);
        expect(g.steps.length).toBeGreaterThanOrEqual(2);
        expect(g.steps.length).toBeLessThanOrEqual(4);
        expect(new Set(g.steps).size).toBe(g.steps.length);
        expect(g.steps).not.toContain(g.strategy);
        expect(g.steps).not.toContain(g.knowledge[0]);
        expect(g.optionReasons).toHaveLength(5);
        expect(new Set(g.optionReasons).size).toBe(5);
        expect(
          g.optionReasons.filter((r) => r.startsWith("Doğru:")),
        ).toHaveLength(1);
        expect(g.optionReasons[q.answer]).toBe("Doğru: " + g.check);
        expect(g.optionReasons.every((r) => r.length >= 32)).toBe(true);
        expect(q.prompt.tr).not.toMatch(
          /önceki soru|yukarıdaki grafik|seçtiğin model/iu,
        );
      }
    });
  });
  it("43 olumlu bölüm,18 bankadan farklı örnek ve12 hatırlamayla üç başlığı kaplar", () => {
    expect(forge025MathTopics).toEqual({
      "ayt-belirsiz-integral": "detail-477",
      "ayt-belirli-integral": "detail-478",
      "ayt-alan-riemann": "detail-479",
    });
    expect(forge025MathGuides.map((g) => g.sections.length)).toEqual([
      14, 14, 15,
    ]);
    expect(forge025MathGuides.map((g) => g.examples.length)).toEqual([6, 6, 6]);
    const questionPrompts = forge025MathLessons.flatMap((l) =>
        l.questions.map((q) => plain(q.prompt.tr)),
      ),
      allSteps = forge025MathLessons.flatMap((l) =>
        l.questions.flatMap((q) => q.guidance!.steps),
      );
    expect(new Set(allSteps).size).toBe(allSteps.length);
    const sections = forge025MathGuides.flatMap((g) => g.sections);
    expect(new Set(sections.map((s) => s.title)).size).toBe(43);
    for (const g of forge025MathGuides) {
      expect(g.recall).toHaveLength(4);
      for (const s of g.sections) {
        expect(s.paragraphs).toHaveLength(2);
        expect(s.paragraphs.join(" ").length).toBeGreaterThan(400);
      }
      for (const e of g.examples) {
        expect(e.steps.length).toBeGreaterThanOrEqual(3);
        expect(questionPrompts).not.toContain(plain(e.prompt));
      }
    }
  });
  it("polinom ters türevini bağımsız katsayı türevi ve başlangıç koşuluyla doğrular", () => {
    for (const a of [-2, 0, 1])
      for (const b of [-3, 0, 2])
        for (const c of [-1, 0, 3])
          for (const d of [-2, 1])
            for (const x of [-2, -0.5, 0, 1.5, 2]) {
              const coeff: Polynomial025 = [a, b, c, d],
                m = primitiveFamily025(coeff, x, 4, -1, 3);
              expect(m.value).toBeCloseTo(integral(coeff, 0, x) + 4, 12);
              expect(m.derivative).toBeCloseTo(value(coeff, x), 12);
              const derivative = m.primitive
                .slice(0, -1)
                .map((n, i) => n * (4 - i));
              expect(derivative).toEqual([...coeff]);
              expect(integral(coeff, 0, -1) + m.conditionConstant).toBeCloseTo(
                3,
                12,
              );
              expect(m.conditionValue).toBeCloseTo(
                integral(coeff, 0, x) + m.conditionConstant,
                12,
              );
              expect(
                primitiveFamily025(coeff, x, -2).value - m.value,
              ).toBeCloseTo(-6, 12);
              expect(primitiveFamily025(coeff, x, -2).derivative).toBe(
                m.derivative,
              );
            }
  });
  it("yönlü integralde ters sınır, eşit sınır ve ara birikim toplamını korur", () => {
    const cs: Polynomial025[] = [
      [0, 0, 0, 2],
      [0, 1, 0, -1],
      [1, -2, 3, -1],
      [-2, 1, -3, 2],
    ];
    for (const c of cs)
      for (const a of [-3, -1, 0, 2])
        for (const b of [-2, 0, 1, 3])
          for (const probe of [-5, 0, 5]) {
            const m = definiteIntegral025(c, a, b, probe);
            expect(m.signed).toBeCloseTo(integral(c, a, b), 11);
            expect(m.signed).toBeCloseTo(
              -definiteIntegral025(c, b, a, probe).signed,
              11,
            );
            expect(m.accumulation + m.remaining).toBeCloseTo(m.signed, 11);
            expect(m.point).toBeGreaterThanOrEqual(Math.min(a, b));
            expect(m.point).toBeLessThanOrEqual(Math.max(a, b));
            if (a === b) {
              expect(m.mean).toBeNull();
              expect(m.signed).toBe(0);
            } else expect(m.mean).toBeCloseTo(m.signed / (b - a), 12);
          }
    expect(definiteIntegral025([0, 1, 0, -1], -2, 1, 0).signed).toBe(0);
  });
  it("yakın büyük uçlarda iki ters türev sayısını çıkararak küçük integrali kaybetmez", () => {
    const c: Polynomial025 = [1, 2, 3, 4],
      a = 5,
      b = 5 + 1e-12,
      m = definiteIntegral025(c, a, b, a),
      width = b - a;
    expect(m.signed).toBeGreaterThan(0);
    expect(m.signed / width).toBeCloseTo(value(c, 5), 9);
    expect(definiteIntegral025(c, b, a, a).signed).toBe(-m.signed);
  });
  it("Riemann seçimlerinde örnek ve katkı geometrisini bağımsız hesapla sınar", () => {
    const f: Quadratic025 = [1, 0, 0],
      g: Quadratic025 = [0, 0, 0];
    expect(riemannArea025(f, g, 0, 1, 2, "right").estimate).toBe(5 / 8);
    expect(riemannArea025(f, g, 0, 1, 2, "left").estimate).toBe(1 / 8);
    expect(riemannArea025(f, g, 0, 1, 2, "midpoint").estimate).toBe(5 / 16);
    for (const method of [
      "left",
      "right",
      "midpoint",
      "lower",
      "upper",
    ] as const) {
      const m = riemannArea025([1, -2, 0], g, -2, 3, 7, method);
      expect(m.rectangles).toHaveLength(7);
      expect(m.rectangles.reduce((s, r) => s + r.to - r.from, 0)).toBeCloseTo(
        5,
        13,
      );
      for (const r of m.rectangles) {
        expect(r.sample).toBeGreaterThanOrEqual(r.from);
        expect(r.sample).toBeLessThanOrEqual(r.to);
        expect(r.height).toBeCloseTo(r.sample ** 2 - 2 * r.sample, 12);
        expect(r.contribution).toBeCloseTo((r.to - r.from) * r.height, 12);
      }
      expect(m.lowerSum).toBeLessThanOrEqual(m.signed + 1e-12);
      expect(m.upperSum).toBeGreaterThanOrEqual(m.signed - 1e-12);
    }
  });
  it("iç tepeyi alt veya üst toplamda uçlardan bağımsız bulur", () => {
    const m = riemannArea025([1, 0, 0], [0, 0, 0], -1, 1, 2, "lower");
    expect(m.estimate).toBe(0);
    expect(m.upperSum).toBe(2);
    const peak = riemannArea025([-1, 0, 1], [0, 0, 0], -1, 1, 3, "upper");
    const middle = peak.rectangles[1];
    expect(middle.sample).toBe(0);
    expect(middle.maximum).toBe(1);
    const negative = riemannArea025([0, 0, -2], [0, 0, 0], 1, 4, 4, "lower");
    expect(negative.signed).toBe(-6);
    expect(negative.geometricArea).toBe(6);
    expect(negative.lowerSum).toBe(-6);
    expect(negative.upperSum).toBe(-6);
  });
  it("bütün köklerde parçalayıp net integral ile geometrik alanı ayırır", () => {
    const x = riemannArea025([0, 1, -1], [0, 0, 0], -1, 3, 4, "midpoint");
    expect(x.roots).toEqual([1]);
    expect(x.signed).toBe(0);
    expect(x.geometricArea).toBe(4);
    const q = riemannArea025([1, 0, 0], [0, 0, 4], -3, 3, 8, "midpoint");
    expect(q.roots).toEqual([-2, 2]);
    expect(q.pieces).toHaveLength(3);
    expect(q.signed).toBe(-6);
    expect(q.geometricArea).toBeCloseTo(46 / 3, 12);
    const touch = riemannArea025([1, -2, 1], [0, 0, 0], 0, 2, 4, "midpoint");
    expect(touch.roots).toEqual([1]);
    expect(touch.pieces.every((p) => p.sign >= 0)).toBe(true);
    expect(touch.geometricArea).toBeCloseTo(touch.signed, 12);
    const same = riemannArea025([1, 2, 3], [1, 2, 3], -2, 2, 4, "lower");
    expect(same.coincident).toBe(true);
    expect(same.roots).toEqual([]);
    expect(same.geometricArea).toBe(0);
  });
  it("kapalı sınır köklerini, iki yakın kökü ve doğrusal dejenerasyonu korur", () => {
    expect(
      riemannArea025([1, -1, 0], [0, 0, 0], 0, 1, 4, "midpoint").roots,
    ).toEqual([0, 1]);
    expect(
      riemannArea025([0, 2, -1], [0, 0, 0], 0, 1, 2, "left").roots,
    ).toEqual([0.5]);
    const near = riemannArea025([1, -1e-6, 0], [0, 0, 0], 0, 1, 4, "midpoint");
    expect(near.roots).toEqual([0, 1e-6]);
    expect(near.pieces).toHaveLength(2);
    expect(near.pieces[0].area).toBeGreaterThan(0);
    const noRoots = riemannArea025([1, 0, 1], [0, 0, 0], -2, 2, 4, "midpoint");
    expect(noRoots.roots).toEqual([]);
    expect(noRoots.geometricArea).toBe(noRoots.signed);
  });
  it("küçük polinom alanlarını model köklerinden bağımsız sayısal integral ile karşılaştırır", () => {
    for (const a of [-2, -1, 0, 1, 2])
      for (const b of [-2, 0, 2])
        for (const c of [-2, 0, 2]) {
          const f: Quadratic025 = [a, b, c],
            m = riemannArea025(f, [0, 0, 0], -2, 2, 8, "midpoint");
          let numeric = 0;
          const n = 4000,
            h = 4 / n;
          for (let i = 0; i < n; i++) {
            const x = -2 + (i + 0.5) * h;
            numeric += Math.abs(a * x * x + b * x + c) * h;
          }
          expect(m.signed).toBeCloseTo(integral(f, -2, 2), 11);
          expect(Math.abs(m.geometricArea - numeric)).toBeLessThan(0.00001);
          expect(m.geometricArea + 1e-11).toBeGreaterThanOrEqual(
            Math.abs(m.signed),
          );
          for (const root of m.roots) expect(value(f, root)).toBeCloseTo(0, 10);
        }
  });
  it("gerçek inceltmede alt-üst sınırların yönünü korur; sonlu yaklaşımı kesinlik saymaz", () => {
    for (const f of [
      [1, -2, 0],
      [-1, 1, 2],
      [0, 2, -1],
    ] as Quadratic025[])
      for (const n of [2, 4, 8, 16]) {
        const a = riemannArea025(f, [0, 0, 0], -2, 2, n, "midpoint"),
          b = riemannArea025(f, [0, 0, 0], -2, 2, n * 2, "midpoint");
        expect(b.lowerSum + 1e-12).toBeGreaterThanOrEqual(a.lowerSum);
        expect(b.upperSum - 1e-12).toBeLessThanOrEqual(a.upperSum);
      }
    expect(
      riemannArea025([1, 0, 0], [0, 0, 0], 0, 1, 2, "midpoint").error,
    ).not.toBe(0);
  });
  it("bozuk ve kapsam dışı girdileri geçerli sonuç gibi üretmez", () => {
    for (const x of [NaN, Infinity, -Infinity, 7])
      expect(() => primitiveFamily025([0, 1, 0, 0], x, 0)).toThrow(RangeError);
    expect(() =>
      primitiveFamily025([1, 2, 3] as unknown as Polynomial025, 0, 0),
    ).toThrow("MATH025_COEFFICIENTS");
    expect(() => primitiveFamily025([0, 0, 0, 0], 0, 21)).toThrow(RangeError);
    expect(() => definiteIntegral025([0, 0, 0, 0], -7, 1, 0)).toThrow(
      RangeError,
    );
    for (const n of [0, 1, 2.5, 65, NaN])
      expect(() =>
        riemannArea025([1, 0, 0], [0, 0, 0], 0, 1, n, "left"),
      ).toThrow("MATH025_PARTITION");
    expect(() => riemannArea025([1, 0, 0], [0, 0, 0], 1, 1, 4, "left")).toThrow(
      "MATH025_PARTITION",
    );
    expect(() =>
      riemannArea025([1, 0, 0], [0, 0, 0], 0, 1, 4, "bad" as RiemannMethod025),
    ).toThrow("MATH025_METHOD");
    expect(() =>
      riemannArea025([NaN, 0, 0], [0, 0, 0], 0, 1, 4, "left"),
    ).toThrow(RangeError);
    expect(() =>
      riemannArea025([1, 0, 0], [0, 0, 0], 1, 1 + Number.EPSILON, 64, "left"),
    ).toThrow("MATH025_PARTITION_PRECISION");
  });
  it("kontrollü SSR’de eşit sınır, ters yön ve geçersiz geri yüklemede yanlış başarı üretmez", () => {
    const render = (id: string, s: typeof mock.saved) => {
      mock.saved = s;
      return renderToStaticMarkup(
        createElement(Forge025MathLab, { lessonId: id }),
      );
    };
    let h = render("ayt-belirli-integral", { lower: 1, upper: 1 });
    expect(h).toContain("Sıfır genişlikte tanımlanmaz");
    expect(h).toContain("sıfır genişlik");
    h = render("ayt-belirli-integral", {
      a: 0,
      b: 0,
      c: 0,
      d: 2,
      lower: 2,
      upper: 0,
    });
    expect(h).toContain("üst 0: -4");
    h = render("ayt-alan-riemann", {
      areaLower: 2,
      areaUpper: -2,
      method: "bad",
      count: NaN,
    });
    expect(h).toContain("Kullanılan sınırlar: 2 ile 2,5");
    expect(h).not.toMatch(/NaN|Infinity|>undefined</);
    h = render("ayt-belirsiz-integral", {
      guess: "matches",
      reason: " ",
      checked: true,
    });
    expect(h).not.toContain('role="status"');
    h = render("ayt-belirsiz-integral", {
      guess: "different",
      reason: "Koşul K=3 seçer, serbest K=1 farklıdır.",
      checked: true,
    });
    expect(h).toContain("Tahminin bu koşullarla uyumlu.");
    expect(render("unknown", {})).toBe("");
    mock.saved = {};
  });
  it("kontrollü 162 SSR durumunda HTML karşılığı ve sonlu SVG yolları üretir", () => {
    let count = 0;
    for (const id of [
      "ayt-belirsiz-integral",
      "ayt-belirli-integral",
      "ayt-alan-riemann",
    ])
      for (const a of [-2, 0, 2])
        for (const b of [-2, 0, 2])
          for (const lower of [-2, 2])
            for (const method of ["left", "upper", "midpoint"]) {
              mock.saved = { a, b, lower, upper: -lower, fa: a, fb: b, method };
              const h = renderToStaticMarkup(
                createElement(Forge025MathLab, { lessonId: id }),
              );
              expect(h).toContain(
                '<div class="math025-result" data-model-result',
              );
              expect(h).toContain('role="img"');
              expect(h).not.toMatch(/NaN|Infinity|>undefined</);
              count++;
            }
    expect(count).toBe(162);
    mock.saved = {};
  });
});

describe("ham tür ve ilk yeni kullanıcı eylemi regresyonu", () => {
  type Props = {
    children?: ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    onChange?: (event: { currentTarget: { value: string } }) => void;
    "aria-label"?: string;
  };
  const nodes = (tree: ReactNode): ReactElement<Props>[] => {
    const result: ReactElement<Props>[] = [];
    Children.forEach(tree, (child) => {
      if (isValidElement<Props>(child)) {
        result.push(child, ...nodes(child.props.children));
      }
    });
    return result;
  };
  it("gerçek hook tür filtresinden sonra bozuk aktif ham alanı gizler ve gerekçe callbackiyle kanonik kaydı kurtarır", () => {
    const cases: [string, typeof mock.saved, string, string[], string][] = [
      [
        "ayt-belirsiz-integral",
        {},
        "different",
        ["a", "b", "c", "d", "x", "constant", "initialX", "initialY"],
        "fa",
      ],
      [
        "ayt-belirli-integral",
        {},
        "positive",
        ["a", "b", "c", "d", "lower", "upper", "probe"],
        "fa",
      ],
      [
        "ayt-alan-riemann",
        {},
        "greater",
        [
          "fa",
          "fb",
          "fc",
          "ga",
          "gb",
          "gc",
          "areaLower",
          "areaUpper",
          "count",
          "method",
        ],
        "a",
      ],
    ];
    for (const [lessonId, seed, guess, fields, irrelevant] of cases) {
      const render = () =>
        renderToStaticMarkup(createElement(Forge025MathLab, { lessonId }));
      for (const field of fields) {
        const bad = ["mode", "operation", "power", "method"].includes(field)
          ? 1
          : "1";
        mock.saved = {
          ...seed,
          [field]: bad,
          guess,
          reason: "Eski gerekçe",
          checked: true,
        };
        expect(render(), lessonId + "/" + field).not.toContain('role="status"');
        const before = nodes(Forge025MathLab({ lessonId })),
          button = before.find(
            (n) => n.type === "button" && n.props.children === "Kanıtı gör",
          )!;
        expect(button.props.disabled).toBe(true);
        const reason = before.find(
          (n) =>
            n.type === "textarea" &&
            n.props["aria-label"] === "Modelden gerekçen",
        )!;
        reason.props.onChange!({ currentTarget: { value: "x" } });
        expect(typeof mock.saved[field]).toBe(
          typeof bad === "string" ? "number" : "string",
        );
        expect(mock.saved.checked).toBe(false);
        expect(render()).not.toContain('role="status"');
        const after = nodes(Forge025MathLab({ lessonId })).find(
          (n) => n.type === "button" && n.props.children === "Kanıtı gör",
        )!;
        expect(after.props.disabled).toBe(false);
        after.props.onClick!();
        expect(render()).toContain("Tahminin bu koşullarla uyumlu.");
      }
      mock.saved = {
        ...seed,
        [irrelevant]: true,
        guess,
        reason: "x",
        checked: true,
      };
      expect(render(), "inactive/" + irrelevant).toContain(
        "Tahminin bu koşullarla uyumlu.",
      );
    }
    mock.saved = {};
  });
  it("aktif aralık/adım veya menü normalleşmesi eski kıyası açmaz", () => {
    for (const [lessonId, seed] of [
      ["ayt-belirsiz-integral", { constant: 99, guess: "different" }],
      [
        "ayt-belirli-integral",
        { lower: 1, upper: 2, probe: 0, guess: "positive" },
      ],
      ["ayt-alan-riemann", { areaLower: 2, areaUpper: -2, guess: "greater" }],
      ["ayt-alan-riemann", { method: "constructor", guess: "greater" }],
    ] as [string, typeof mock.saved][]) {
      mock.saved = { ...seed, reason: "x", checked: true };
      expect(
        renderToStaticMarkup(createElement(Forge025MathLab, { lessonId })),
      ).not.toContain('role="status"');
    }
    mock.saved = {};
  });
});
