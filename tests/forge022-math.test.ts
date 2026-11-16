import { describe, it, expect } from "vitest";
import { questionGuidanceSchema } from "../src/domain/questionHelpModel";
import {
  quadratic022,
  complex022,
  signChart022,
  parabola022,
  trig022,
  wave022,
  triangle022,
  trigRoots022,
  forge022MathLessons,
  forge022MathGuides,
} from "../src/learning/forge022Math";
describe("AYT matematik 022 modelleri", () => {
  it("80 sorunun açıklamalı yardımını seçenek sırasıyla ve gerçek çözüm adımlarıyla taşır", () => {
    const questions = forge022MathLessons.flatMap((lesson) => lesson.questions);
    expect(questions).toHaveLength(80);
    for (const q of questions) {
      const g = questionGuidanceSchema.parse(q.guidance);
      expect(g.steps.length).toBeGreaterThanOrEqual(2);
      expect(g.steps.length).toBeLessThanOrEqual(4);
      expect(g.optionReasons).toHaveLength(q.options.length);
      expect(g.optionReasons.map((r, i) => r.startsWith("Doğru:") ? i : -1).filter((i) => i >= 0)).toEqual([q.answer]);
      expect(new Set(g.optionReasons).size).toBe(5);
      for (const step of g.steps) {
        expect([...g.knowledge, g.strategy]).not.toContain(step);
      }
    }
  });
  it("ikinci derece, doğrusal, özdeşlik ve çelişkiyi ayrı tutar", () => {
    expect(quadratic022(0, 4, -8).roots).toEqual([2]);
    expect(quadratic022(0, 0, 0).kind).toBe("all");
    expect(quadratic022(0, 0, 2).kind).toBe("none");
    expect(quadratic022(2, -5, -3).roots).toEqual([-0.5, 3]);
    expect(quadratic022(3, -12, 12).roots).toEqual([2]);
    expect(quadratic022(1, 4, 13).complex).toEqual([
      { x: -2, y: 3 },
      { x: -2, y: -3 },
    ]);
  });
  it("çok farklı kökleri kararlı hesaplar ve fiziksel olmayan girdiyi reddeder", () => {
    const q = quadratic022(1, 1e6, 1e-8);
    expect(q.roots[0] * q.roots[1]).toBeCloseTo(1e-8, 15);
    expect(q.roots[1]).not.toBe(0);
    expect(() => quadratic022(NaN, 1, 2)).toThrow(RangeError);
    expect(() => quadratic022(1e-20, 1, 2)).toThrow(RangeError);
  });
  it("karmaşık bölme/çarpma ile sıfır yasağını birlikte gösterir", () => {
    expect(
      complex022({ x: 2, y: 1 }, { x: 1, y: -1 }, "divide").result,
    ).toEqual({ x: 0.5, y: 1.5 });
    expect(
      complex022({ x: 1, y: 2 }, { x: 3, y: -1 }, "multiply").result,
    ).toEqual({ x: 5, y: 5 });
    expect(
      complex022({ x: 1, y: 2 }, { x: 0, y: 0 }, "divide").result,
    ).toBeNull();
    expect(
      complex022({ x: 0, y: 0 }, { x: 0, y: 0 }, "power", 0).result,
    ).toBeNull();
    expect(
      complex022({ x: 0, y: 1 }, { x: 0, y: 0 }, "power", -7).result,
    ).toEqual({ x: 0, y: 1 });
  });
  it("sadeleşen payda deliğini ve çift kökü korur", () => {
    const s = signChart022(
      [
        { root: 2, multiplicity: 1 },
        { root: -1, multiplicity: 1 },
        { root: 2, multiplicity: 1, denominator: true },
      ],
      1,
      "ge",
    );
    expect(s.solution).toEqual([
      { lo: -1, hi: 2, leftClosed: true, rightClosed: false },
      { lo: 2, hi: Infinity, leftClosed: false, rightClosed: false },
    ]);
    expect(s.points.find((p) => p.x === 2)?.sign).toBeNull();
    const t = signChart022(
      [
        { root: 1, multiplicity: 2 },
        { root: -2, multiplicity: 1 },
      ],
      1,
      "gt",
    );
    expect(t.solution.map((x) => [x.lo, x.hi])).toEqual([
      [-2, 1],
      [1, Infinity],
    ]);
  });
  it("kesişim, izole nokta ve çok yakın kök aralığını kaybetmez", () => {
    expect(
      signChart022([{ root: 2, multiplicity: 2 }], 1, "le").solution,
    ).toEqual([{ lo: 2, hi: 2, leftClosed: true, rightClosed: true }]);
    expect(
      signChart022(
        [
          { root: -2, multiplicity: 1 },
          { root: 3, multiplicity: 1 },
        ],
        1,
        "le",
        1,
        2,
      ).solution,
    ).toEqual([{ lo: 1, hi: 2, leftClosed: true, rightClosed: true }]);
    const r = 1 + Number.EPSILON,
      near = signChart022(
        [
          { root: 1, multiplicity: 1 },
          { root: r, multiplicity: 1 },
        ],
        1,
        "lt",
      );
    expect(near.solution).toEqual([
      { lo: 1, hi: r, leftClosed: false, rightClosed: false },
    ]);
  });
  it("parabolde sınırlı ekstremum, kiriş ve dış doğru uzaklığını hesaplar", () => {
    const p = parabola022(1, -4, 1, 1, 2, -1, 4);
    expect(p.minimum).toEqual({ x: 2, y: -3 });
    expect(p.maximum).toEqual({ x: -1, y: 6 });
    const d = parabola022(1, 0, 0, 2, -3, -4, 4);
    expect(d.intersections).toEqual([]);
    expect(d.distance).toBeCloseTo(2 / Math.sqrt(5));
    expect(d.tangent).toEqual({ x: 1, y: 1, intercept: -1 });
    expect(parabola022(1, 1, 0, 1 + 1e-10, 0, -1, 1).intersections.length).toBe(
      2,
    );
    expect(() => parabola022(0, 1, 2, 1, 0, -1, 1)).toThrow(RangeError);
  });
  it("çeyrek turdaki sıfırı ve kutbu tam ayırır", () => {
    expect(trig022(90)).toMatchObject({ x: 0, y: 1, tan: null, cot: 0 });
    expect(trig022(720).degrees).toBe(0);
    expect(trig022(-870).degrees).toBe(210);
    const p = trig022(150);
    expect(p.x * p.x + p.y * p.y).toBeCloseTo(1);
    expect(p.tan).toBeLessThan(0);
  });
  it("küçük negatif açı ve 180 dereceye yakın üçgende hassasiyeti korur", () => {
    const tiny = 1e-8;
    expect(trig022(-tiny).cot).toBe(-trig022(tiny).cot!);
    expect(trig022(-tiny).y).toBe(-trig022(tiny).y);
    const angle = 179.99999999, side = 1e-8;
    const referenceRadius = side / (2 * Math.sin((180 - angle) * Math.PI / 360));
    expect(Math.abs(triangle022(side, side, angle).circumradius / referenceRadius - 1)).toBeLessThan(2e-15);
  });
  it("dalga birimini, negatif frekansı, sabit özel durumu ve kutbu ayırır", () => {
    expect(wave022("sin", -3, 2, -90, 4, 0)).toMatchObject({
      value: 7,
      period: 180,
      range: [1, 7],
    });
    expect(wave022("cos", 2, -3, 0, 1, 0).period).toBe(120);
    expect(wave022("sin", 2, 0, 90, 1, 0)).toMatchObject({
      value: 3,
      period: null,
      range: [3, 3],
    });
    expect(wave022("tan", 1, 1, 0, 0, 90).value).toBeNull();
  });
  it("üçgen SAS geometrisini ve bütün tam tur köklerini korur", () => {
    const t = triangle022(3, 5, 60);
    expect(t.a * t.a).toBeCloseTo(19);
    expect(t.A + t.B + t.C).toBeCloseTo(Math.PI);
    expect(t.area).toBeCloseTo((15 * Math.sqrt(3)) / 4);
    expect(trigRoots022("sin", 0.5)).toEqual(
      expect.arrayContaining([expect.closeTo(30), expect.closeTo(150)]),
    );
    expect(trigRoots022("cos", -1)).toEqual([180]);
    expect(trigRoots022("sin", 2)).toEqual([]);
    expect(trigRoots022("cot", 0)).toEqual([90, 270]);
  });
  it("geniş kaynak kapsamının kartları kendi bağlamında cevaplanır", () => {
    expect(forge022MathLessons).toHaveLength(5);
    expect(
      forge022MathLessons.reduce((n, l) => n + l.questions.length, 0),
    ).toBe(80);
    expect(forge022MathGuides.reduce((n, g) => n + g.sections.length, 0)).toBe(
      105,
    );
    expect(forge022MathGuides.reduce((n, g) => n + g.examples.length, 0)).toBe(
      43,
    );
    for (const lesson of forge022MathLessons)
      for (const q of lesson.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
        expect(q.hint.tr.length).toBeGreaterThan(10);
        expect(q.explanation.tr.length).toBeGreaterThan(45);
      }
  });
});
