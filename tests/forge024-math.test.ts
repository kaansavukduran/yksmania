import { createHash } from "node:crypto";
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
  derivativeRules024,
  rationalPower024,
  tangentGeometry024,
  forge024MathGuides,
  forge024MathGuideExtensions,
  forge024MathLessons,
  forge024MathTopics,
  type Quad024,
  type Cubic024,
  type Rule024,
} from "../src/learning/forge024Math";
import { aytLessons } from "../src/learning/aytLessons";
import { derivativeDepthGuide } from "../src/learning/guides/derivativeDepth";
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
import Forge024MathLab from "../src/learning/Forge024MathLab";
const plain = (s: string) => s.replace(/\s/g, "");
const stable = (x: unknown): unknown =>
  Array.isArray(x)
    ? x.map(stable)
    : x && typeof x === "object"
      ? Object.fromEntries(
          Object.entries(x)
            .sort(([a], [b]) => a.localeCompare(b, "en"))
            .map(([k, v]) => [k, stable(v)]),
        )
      : x;
const hash = (x: unknown) =>
  createHash("sha256")
    .update(JSON.stringify(stable(x)))
    .digest("hex");
// Independent coefficient algebra: arrays below are ascending powers, unlike model input.
const multiply = (a: number[], b: number[]) => {
  const c = Array(a.length + b.length - 1).fill(0);
  a.forEach((v, i) => b.forEach((w, j) => (c[i + j] += v * w)));
  return c;
};
const add = (a: number[], b: number[], sign = 1) =>
  Array.from(
    { length: Math.max(a.length, b.length) },
    (_, i) => (a[i] ?? 0) + sign * (b[i] ?? 0),
  );
const evaluate = (a: number[], x: number) =>
  a.reduce((v, c, i) => v + c * x ** i, 0);
const differentiate = (a: number[]) => a.slice(1).map((n, i) => n * (i + 1));
const expectedRules = [
  "14",
  "19/16",
  "0",
  "(3,∞)",
  "13",
  "−7/4",
  "21",
  "−4",
  "13/2",
  "8",
  "Tanımsızdır; f(3) tanımlı değildir.",
  "1",
  "2",
  "−6",
  "0",
  "Bütün gerçek x’te 0’dır.",
  "Yoktur; F′’nin sol eğimi −2, sağ eğimi +2’dir.",
  "14",
];
const expectedGeometry = [
  "y=x−1",
  "y=x/3",
  "2",
  "−2",
  "Evet; fark x³, 0’ın iki yanında işaret değiştirir.",
  "−3 ve 3",
  "y=6x−9",
  "y=−x/2−1/16",
  "π/2<θ<π",
  "x=2",
  "0,061",
  "7/4",
  "1",
  "y=x−1/4",
];

describe("AYT matematik 024: kurallar ve geometrik ekin koşulları", () => {
  it("18 ve 14 sorunun bağımsız çözülen cevaplarını şık sırasından ayrı sabitler", () => {
    for (const [i, lesson] of forge024MathLessons.entries()) {
      expect(
        lesson.questions.map((q) => plain(q.options[q.answer].tr)),
      ).toEqual((i === 0 ? expectedRules : expectedGeometry).map(plain));
      const positions = lesson.questions.map((q) => q.answer),
        counts = [0, 1, 2, 3, 4].map(
          (p) => positions.filter((v) => v === p).length,
        );
      expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1);
      for (let period = 1; period < Math.min(10, positions.length); period++)
        expect(positions.every((v, j) => v === positions[j % period])).toBe(
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
        expect(g.optionReasons.every((r) => r.length >= 28)).toBe(true);
        expect(q.prompt.tr).not.toMatch(
          /önceki soru|yukarıdaki tablo|keşifte seçtiğin/iu,
        );
      }
    }
  });
  it("eski rehber ve beş sorulu dersin tam donmuş JSON’unu değiştirmez", () => {
    // Digests were captured from the clean private baseline before authoring 024.
    expect(hash(derivativeDepthGuide)).toBe(
      "be9078762ecc571c98c8e6698986b5ed9907c7bd9adb53d9367ed092db562c99",
    );
    expect(hash(aytLessons.find((l) => l.id === "turev-teget"))).toBe(
      "487ea93ab18a14d34f2f9529298f1cdca097fa41fcd79553ee295761e91a4a77",
    );
    expect(forge024MathGuideExtensions[0].id).toBe("turev-teget");
    expect(forge024MathGuideExtensions[0]).not.toHaveProperty("minutes");
    expect(forge024MathGuideExtensions[0]).not.toHaveProperty("objectives");
    expect(forge024MathLessons.map((l) => l.id)).not.toContain("turev-teget");
    expect(forge024MathLessons[1].tags).toContain("soru-seti");
  });
  it("yeni anlatım ile ek bölümlerin öğretim ve örnek kapsamını ayırır", () => {
    expect(forge024MathTopics).toEqual({
      "ayt-turev-alma-kurallari": "detail-475",
      "turev-teget-ileri": "detail-476",
    });
    expect(forge024MathGuides).toHaveLength(1);
    expect(forge024MathGuides[0].sections).toHaveLength(18);
    expect(forge024MathGuides[0].examples).toHaveLength(10);
    expect(forge024MathGuideExtensions[0].sections).toHaveLength(8);
    expect(forge024MathGuideExtensions[0].examples).toHaveLength(4);
    const guides = [forge024MathGuides[0], forge024MathGuideExtensions[0]],
      prompts = forge024MathLessons.flatMap((l) =>
        l.questions.map((q) => plain(q.prompt.tr)),
      );
    for (const g of guides)
      for (const e of g.examples) {
        expect(e.steps.length).toBeGreaterThanOrEqual(3);
        expect(prompts).not.toContain(plain(e.prompt));
      }
    const sections = guides.flatMap((g) => g.sections);
    expect(new Set(sections.map((s) => s.title)).size).toBe(26);
    expect(
      sections.every(
        (s) => s.paragraphs.length >= 2 && s.paragraphs.join(" ").length > 330,
      ),
    ).toBe(true);
  });
  it("toplam, fark, çarpım ve bileşkeyi bağımsız polinom katsayı hesabıyla karşılaştırır", () => {
    const polys: Quad024[] = [
      [0, 0, 0],
      [0, 2, -1],
      [1, 0, 1],
      [-2, 3, 2],
      [3, -1, -2],
    ];
    for (const u of polys)
      for (const v of polys)
        for (const x of [-3, -1, -0.25, 0, 0.5, 2, 3])
          for (const op of [
            "sum",
            "difference",
            "product",
            "composition",
          ] as const) {
            const p = [...u].reverse(),
              q = [...v].reverse();
            const expr =
              op === "sum"
                ? add(p, q)
                : op === "difference"
                  ? add(p, q, -1)
                  : op === "product"
                    ? multiply(p, q)
                    : add(
                        add(
                          q.map((n) => p[1] * n),
                          multiply(q, q).map((n) => p[2] * n),
                        ),
                        [p[0]],
                      );
            const m = derivativeRules024(u, v, x, op);
            expect(m.defined).toBe(true);
            expect(m.value).toBeCloseTo(evaluate(expr, x), 10);
            expect(m.derivative).toBeCloseTo(
              evaluate(differentiate(expr), x),
              10,
            );
          }
  });
  it("bölümde ters pay sırasını ve sadeleşen paydayı korur", () => {
    for (const x of [-3, -2, -0.5, 0, 0.5, 1, 2, 3]) {
      const m = derivativeRules024([0, 2, 1], [0, 1, -3], x, "quotient");
      if (x === 3) {
        expect(m.defined).toBe(false);
        expect(m.value).toBeNull();
        expect(m.derivative).toBeNull();
      } else {
        expect(m.value).toBeCloseTo(2 + 7 / (x - 3), 12);
        expect(m.derivative).toBeCloseTo(-7 / (x - 3) ** 2, 12);
      }
    }
    const hole = derivativeRules024([1, 0, -1], [0, 1, -1], 1, "quotient");
    expect(hole.defined).toBe(false);
    expect(
      derivativeRules024([1, 0, -1], [0, 1, -1], 2, "quotient").derivative,
    ).toBe(1);
    const chain = derivativeRules024([1, -1, 0], [0, 3, 1], 1, "composition");
    expect(chain.outer?.derivative).toBe(7);
    expect(chain.contributions).toEqual([7, 3]);
    expect(chain.derivative).toBe(21);
  });
  it("rasyonel üs kesrini sadeleştirir; negatif gerçek girdinin işaretini doğru kullanır", () => {
    expect(rationalPower024(-2, 2, 2)).toMatchObject({
      p: 1,
      q: 1,
      value: -2,
      derivative: 1,
      kind: "ic-noktada-turev",
    });
    expect(rationalPower024(-8, 1, 3).value).toBeCloseTo(-2, 12);
    expect(rationalPower024(-8, 1, 3).derivative).toBeCloseTo(1 / 12, 12);
    expect(rationalPower024(-8, 2, 3).value).toBeCloseTo(4, 12);
    expect(rationalPower024(-8, 2, 3).derivative).toBeCloseTo(-1 / 3, 12);
    expect(rationalPower024(-8, -2, 3).value).toBeCloseTo(1 / 4, 12);
    expect(rationalPower024(-8, -2, 3).derivative).toBeCloseTo(1 / 48, 12);
    expect(rationalPower024(4, -1, 2).derivative).toBeCloseTo(-1 / 16, 12);
  });
  it("tanımsız, sınır, iç noktada sonlu türevsiz ve türevli sıfırları ayırır", () => {
    expect(rationalPower024(-1, 1, 2).kind).toBe("gercel-tanim-yok");
    expect(rationalPower024(0, -2, 3).kind).toBe("gercel-tanim-yok");
    expect(rationalPower024(0, 3, 2)).toMatchObject({
      value: 0,
      derivative: null,
      kind: "sinir-noktasi",
    });
    expect(rationalPower024(0, 1, 3).kind).toBe("sonlu-turev-yok");
    expect(rationalPower024(0, 2, 3).kind).toBe("sonlu-turev-yok");
    expect(rationalPower024(0, 4, 3)).toMatchObject({
      value: 0,
      derivative: 0,
      kind: "ic-noktada-turev",
    });
    expect(rationalPower024(0, 2, 2).derivative).toBe(1);
    for (let p = -8; p <= 8; p++)
      if (p)
        for (let q = 1; q <= 5; q++)
          for (const x of [-2, -1, -0.25, 0.25, 1, 2]) {
            const m = rationalPower024(x, p, q);
            if (m.kind !== "ic-noktada-turev") continue;
            expect(m.value! ** m.q).toBeCloseTo(x ** m.p, 8);
            expect(m.derivative! * x).toBeCloseTo(m.exponent * m.value!, 10);
          }
  });
  it("kübik kiriş ve doğrusal tahmin hatasını açılım dışında hesaplanan değerlerle doğrular", () => {
    const coeffs: Cubic024[] = [
      [1, 0, 0, 0],
      [1, 0, -2, 1],
      [-2, 1, 3, -1],
      [0, 2, -1, 3],
      [0, 0, 2, -1],
      [0, 0, 0, 3],
    ];
    for (const c of coeffs)
      for (const at of [-2, -0.5, 0, 0.5, 2])
        for (const h of [-1, -0.5, -0.1, 0.01, 0.5, 1]) {
          const p = [...c].reverse(),
            m = tangentGeometry024(c, at, h),
            f = evaluate(p, at),
            next = evaluate(p, at + h),
            slope = evaluate(differentiate(p), at);
          expect(m.point.y).toBeCloseTo(f, 11);
          expect(m.slope).toBeCloseTo(slope, 11);
          expect(m.secantSlope).toBeCloseTo((next - f) / h, 9);
          expect(m.error).toBeCloseTo(next - f - slope * h, 10);
          expect(m.predicted).toBeCloseTo(f + slope * h, 11);
          expect(m.slope * at + m.intercept).toBeCloseTo(f, 11);
          expect(
            m.tangentUnit.x * m.normalUnit.x + m.tangentUnit.y * m.normalUnit.y,
          ).toBeCloseTo(0, 14);
          expect(Math.hypot(m.tangentUnit.x, m.tangentUnit.y)).toBeCloseTo(
            1,
            14,
          );
          if (m.normal.kind === "dusey") expect(m.slope).toBe(0);
          else {
            expect(m.normal.slope * m.slope).toBeCloseTo(-1, 14);
            expect(m.normal.slope * at + m.normal.intercept).toBeCloseTo(f, 11);
          }
          if (m.otherIntersection) {
            const other = m.otherIntersection;
            expect(evaluate(p, other.x)).toBeCloseTo(
              m.slope * other.x + m.intercept,
              9,
            );
            expect(other.x).not.toBe(at);
          }
        }
  });
  it("yatay normalin düşeyliğini, üçüncü derece kesmeyi ve çakışan doğruyu ayırır", () => {
    expect(tangentGeometry024([0, 1, -4, 7], 2, 0.1).normal).toEqual({
      kind: "dusey",
      x: 2,
      slope: null,
      intercept: null,
    });
    expect(tangentGeometry024([1, 0, 1, 0], 0, 0.1)).toMatchObject({
      slope: 1,
      contact: "ucuncu-derece-temas",
      otherIntersection: null,
    });
    expect(tangentGeometry024([1, -1, 0, 0], 1 / 3, 0.1)).toMatchObject({
      contact: "ucuncu-derece-temas",
      otherIntersection: null,
    });
    expect(tangentGeometry024([1, 0, 0, 0], 1, 0.5).otherIntersection).toEqual({
      x: -2,
      y: -8,
    });
    expect(tangentGeometry024([0, 0, 2, 3], 1, 0.5)).toMatchObject({
      error: 0,
      secantSlope: 2,
      contact: "dogru-cakisik",
    });
    expect(tangentGeometry024([0, -1, 0, 0], 1, 0.1).angleRad).toBeCloseTo(
      Math.PI - Math.atan(2),
      14,
    );
    const small = tangentGeometry024([1, 0, 0, 0], 2, 1e-12);
    expect(small.error).toBeGreaterThan(0);
    expect(small.error).toBeCloseTo(6e-24, 30);
  });
  it("bozuk girişleri ve kapsam dışını sessizce geçerli model yapmaz", () => {
    for (const invalid of [NaN, Infinity, -Infinity, 11])
      expect(() =>
        derivativeRules024([1, 0, 0], [0, 1, 0], invalid, "sum"),
      ).toThrow(RangeError);
    expect(() =>
      derivativeRules024([1, 0, 0], [0, 1, 0], 0, "invalid" as Rule024),
    ).toThrow("MATH024_RULE");
    expect(() =>
      derivativeRules024([1, 0] as unknown as Quad024, [0, 1, 0], 0, "sum"),
    ).toThrow("MATH024_COEFFICIENTS");
    for (const [p, q] of [
      [0, 1],
      [9, 1],
      [1, 0],
      [1, 6],
      [1.5, 3],
      [1, 1.2],
    ])
      expect(() => rationalPower024(1, p, q)).toThrow("MATH024_POWER_SCOPE");
    expect(() => tangentGeometry024([1, 0, 0, 0], 0, 0)).toThrow(
      "MATH024_SECANT_STEP",
    );
    expect(() =>
      tangentGeometry024([1, 0, 0] as unknown as Cubic024, 0, 1),
    ).toThrow("MATH024_CUBIC");
    expect(() => tangentGeometry024([NaN, 0, 0, 0], 0, 1)).toThrow(RangeError);
    expect(() => tangentGeometry024([1, 0, 0, 0], 6, 1)).toThrow(RangeError);
  });
  it("kontrollü SSR’de tanım hatası, geri yüklenmiş bozuk seçim ve yanlış başarı durumunu görünür tutar", () => {
    const html = (lessonId: string, s: typeof mock.saved) => {
      mock.saved = s;
      return renderToStaticMarkup(createElement(Forge024MathLab, { lessonId }));
    };
    let rendered = html("ayt-turev-alma-kurallari", {
      operation: "quotient",
      va: 0,
      vb: 1,
      vc: -1,
      x: 1,
    });
    expect(rendered).toContain("Payda v(x)=0");
    expect(rendered).toContain('data-rule-flow="quotient"');
    rendered = html("ayt-turev-alma-kurallari", {
      mode: "power",
      power: "1/2",
      px: 0,
    });
    expect(rendered).toContain("Tanım kümesinin sınırı");
    expect(rendered).not.toContain('data-power-point="false"');
    rendered = html("turev-teget", { ca: 0, cb: 1, cc: 0, at: 0 });
    expect(rendered).toContain("Normal: x=0");
    expect(rendered).toContain("data-tangent-graph");
    rendered = html("ayt-turev-alma-kurallari", {
      operation: "bad",
      power: "bad",
      x: NaN,
      reason: "   ",
      guess: "positive",
      checked: true,
    });
    expect(rendered).not.toContain('role="status"');
    expect(rendered).not.toMatch(/NaN|Infinity/);
    rendered = html("ayt-turev-alma-kurallari", {
      reason: "İki katkı toplamı pozitif.",
      guess: "negative",
      checked: true,
    });
    expect(rendered).toContain("yeniden karşılaştır");
    rendered = html("ayt-turev-alma-kurallari", {
      reason: "İki katkı toplamı pozitif.",
      guess: "positive",
      checked: true,
    });
    expect(rendered).toContain("Tahminin bu koşullarla uyumlu.");
    expect(html("unknown", {})).toBe("");
    mock.saved = {};
  });
  it("kontrollü 112 SSR durumunda tüm sonuçları HTML olarak ve sonlu SVG koordinatlarıyla üretir", () => {
    let count = 0;
    for (const operation of [
      "sum",
      "difference",
      "product",
      "quotient",
      "composition",
    ])
      for (const x of [-3, -1, 0, 2])
        for (const mode of ["rules", "power"]) {
          mock.saved = {
            operation,
            x,
            px: x === -3 ? -2 : x,
            mode,
            power: "2/3",
          };
          const html = renderToStaticMarkup(
            createElement(Forge024MathLab, {
              lessonId: "ayt-turev-alma-kurallari",
            }),
          );
          expect(html).toContain(
            '<div class="math024-result" data-model-result',
          );
          expect(html).not.toMatch(/NaN|Infinity|>undefined</);
          count++;
        }
    for (const ca of [-2, 0, 1])
      for (const cb of [-1, 0])
        for (const at of [-2, 0, 1, 2])
          for (const stepIndex of [0, 3, 7]) {
            mock.saved = { ca, cb, at, stepIndex };
            const html = renderToStaticMarkup(
              createElement(Forge024MathLab, { lessonId: "turev-teget" }),
            );
            expect(html).toContain('data-unit-scale="48"');
            expect(html).not.toMatch(/NaN|Infinity|>undefined</);
            count++;
          }
    expect(count).toBe(112);
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
        "ayt-turev-alma-kurallari",
        {},
        "positive",
        ["mode", "operation", "ua", "ub", "uc", "va", "vb", "vc", "x"],
        "px",
      ],
      [
        "ayt-turev-alma-kurallari",
        { mode: "power" },
        "ic-noktada-turev",
        ["power", "px"],
        "ua",
      ],
      [
        "turev-teget",
        {},
        "negative",
        ["ca", "cb", "cc", "cd", "at", "stepIndex"],
        "mode",
      ],
      [
        "turev-teget-ileri",
        {},
        "negative",
        ["ca", "cb", "cc", "cd", "at", "stepIndex"],
        "operation",
      ],
    ];
    for (const [lessonId, seed, guess, fields, irrelevant] of cases) {
      const render = () =>
        renderToStaticMarkup(createElement(Forge024MathLab, { lessonId }));
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
        const before = nodes(Forge024MathLab({ lessonId })),
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
        const after = nodes(Forge024MathLab({ lessonId })).find(
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
      [
        "ayt-turev-alma-kurallari",
        { operation: "constructor", guess: "positive" },
      ],
      ["ayt-turev-alma-kurallari", { ua: 99, guess: "positive" }],
      [
        "ayt-turev-alma-kurallari",
        { mode: "power", power: "bad", guess: "ic-noktada-turev" },
      ],
      ["turev-teget", { stepIndex: 99, guess: "negative" }],
    ] as [string, typeof mock.saved][]) {
      mock.saved = { ...seed, reason: "x", checked: true };
      expect(
        renderToStaticMarkup(createElement(Forge024MathLab, { lessonId })),
      ).not.toContain('role="status"');
    }
    mock.saved = {};
  });
});
