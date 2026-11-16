import { describe, expect, it } from "vitest";
import {
  translate021,
  rotate021,
  transform021,
  reflectLine021,
  reflectCenter021,
  mirrorFromPair021,
  circleGeneral021,
  circleLine021,
  circlePair021,
  finiteMap021,
  rational021,
  compose021,
  polynomial021,
  dividePolynomial021,
  plane021,
  forge021GeometryLessons,
  forge021GeometryGuides,
} from "../src/learning/forge021Geometry";
const point = (p: { x: number; y: number }, x: number, y: number) => {
  expect(p.x).toBeCloseTo(x, 10);
  expect(p.y).toBeCloseTo(y, 10);
};
const evalAt = (a: number[], x: number) =>
  a.reduce((s, v, i) => s + v * x ** i, 0);
describe("Kaynaklı021 geometri ve matematik modelleri", () => {
  it("merkezli dönme ile sırayı ayırır, tam turda özdeşliği korur", () => {
    point(translate021({ x: -2, y: 3 }, { x: 5, y: -4 }), 3, -1);
    point(rotate021({ x: 4, y: 3 }, { x: 1, y: -1 }, 90), -3, 2);
    const a = transform021(
      { x: 1, y: 2 },
      { x: 3, y: -1 },
      { x: 0, y: 0 },
      90,
      "translate-rotate",
    );
    point(a.result, -1, 4);
    point(a.other, 1, 0);
    expect(a.sameOrderResult).toBe(false);
    point(rotate021({ x: -2, y: 7 }, { x: 3, y: -5 }, -720), -2, 7);
    expect(
      transform021(
        { x: 1, y: 2 },
        { x: 3, y: 1 },
        { x: 0, y: 0 },
        360,
        "rotate-translate",
      ).sameOrderResult,
    ).toBe(true);
  });
  it("genel açıda uzaklığı korur ve yasal küçük ara değerleri dış girdi sanmaz", () => {
    for (const deg of [-135, -30, 37, 225]) {
      const p = rotate021({ x: 4, y: 3 }, { x: 1, y: -1 }, deg);
      expect(Math.hypot(p.x - 1, p.y + 1)).toBeCloseTo(5, 11);
    }
    for (const order of ["rotate-translate", "translate-rotate"] as const) {
      const p = transform021(
        { x: 1e-6, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        45,
        order,
      ).result;
      expect(p.x / 1e-6).toBeCloseTo(Math.SQRT1_2, 12);
      expect(p.y / 1e-6).toBeCloseTo(Math.SQRT1_2, 12);
    }
    const smallOrder = transform021(
      { x: 0, y: 0 },
      { x: 1e-6, y: 0 },
      { x: 0, y: 0 },
      1e-6,
      "translate-rotate",
    );
    expect(smallOrder.sameOrderResult).toBe(false);
    expect(smallOrder.result.y).not.toBe(smallOrder.other.y);
    expect(() => translate021({ x: 1e-7, y: 0 }, { x: 0, y: 0 })).toThrow(
      RangeError,
    );
    expect(() => rotate021({ x: Infinity, y: 0 }, { x: 0, y: 0 }, 90)).toThrow(
      RangeError,
    );
  });
  it("gerçek dik ayak, eş yarım parça ve merkez simetrisi üretir", () => {
    const m = reflectLine021({ x: 3, y: 4 }, { a: 3, b: 4, c: -5 });
    point(m.foot!, 0.6, 0.8);
    point(m.image!, -1.8, -2.4);
    expect(m.distance).toBe(4);
    expect(3 * m.foot!.x + 4 * m.foot!.y - 5).toBeCloseTo(0, 11);
    point(reflectLine021(m.image!, { a: 3, b: 4, c: -5 }).image!, 3, 4);
    point(reflectCenter021({ x: 4, y: 3 }, { x: 1, y: -2 }), -2, -7);
    point(reflectLine021({ x: 2, y: -1 }, { a: 1, b: 0, c: -2 }).image!, 2, -1);
  });
  it("ayna verisi yokken nokta uydurmaz, farklı görüntüden orta dikme bulur", () => {
    expect(reflectLine021({ x: 1, y: 2 }, { a: 0, b: 0, c: 0 }).kind).toBe(
      "plane",
    );
    expect(
      reflectLine021({ x: 1, y: 2 }, { a: 0, b: 0, c: 1 }).image,
    ).toBeNull();
    expect(mirrorFromPair021({ x: 2, y: 1 }, { x: 2, y: 1 })).toBeNull();
    const m = mirrorFromPair021({ x: -2, y: 1 }, { x: 4, y: -3 })!;
    point(m.foot, 1, -1);
    point(reflectLine021({ x: -2, y: 1 }, m.line).image!, 4, -3);
  });
  it("gerçek çember, tek nokta, boş küme ve doğru kesişimini ayırır", () => {
    const c = circleGeneral021(-6, 4, -12);
    point(c.center, 3, -2);
    expect(c.radius).toBe(5);
    expect(circleGeneral021(-4, 6, 13).kind).toBe("point");
    expect(circleGeneral021(-4, 6, 14).radius).toBeNull();
    const m = circleLine021({ x: 2, y: 1 }, 5, { a: 1, b: 0, c: -5 });
    expect(m.kind).toBe("secant");
    point(m.foot!, 5, 1);
    expect(m.chord).toBe(8);
    expect(m.points.map((p) => p.y).sort((a, b) => a - b)).toEqual([-3, 5]);
    const t = circleLine021({ x: 0, y: 0 }, 5, { a: 3, b: 4, c: -25 });
    expect(t.kind).toBe("tangent");
    point(t.points[0], 3, 4);
    expect(circleLine021({ x: 0, y: 0 }, 5, { a: 0, b: 0, c: 1 }).kind).toBe(
      "invalid-line",
    );
    expect(circleLine021({ x: 0, y: 0 }, 0, { a: 1, b: 0, c: 0 }).kind).toBe(
      "point-on-line",
    );
  });
  it("iki çemberde ortak merkeze bölmez ve her kesimi iki denklemde doğrular", () => {
    expect(circlePair021({ x: 0, y: 0 }, 5, { x: 0, y: 0 }, 5).kind).toBe(
      "coincident",
    );
    expect(circlePair021({ x: 0, y: 0 }, 0, { x: 0, y: 0 }, 0).kind).toBe(
      "same-point",
    );
    expect(circlePair021({ x: 0, y: 0 }, 5, { x: 0, y: 0 }, 2).kind).toBe(
      "inside",
    );
    expect(circlePair021({ x: 5, y: 0 }, 0, { x: 0, y: 0 }, 5).kind).toBe(
      "point-on",
    );
    expect(circlePair021({ x: 0, y: 0 }, 5, { x: 10, y: 0 }, 5).kind).toBe(
      "tangent",
    );
    const m = circlePair021({ x: 0, y: 0 }, 5, { x: 6, y: 0 }, 5);
    expect(m.kind).toBe("intersect");
    expect(m.points.map((p) => p.y).sort((a, b) => a - b)).toEqual([-4, 4]);
    for (const p of m.points) {
      expect(p.x * p.x + p.y * p.y).toBeCloseTo(25, 11);
      expect((p.x - 6) ** 2 + p.y * p.y).toBeCloseTo(25, 11);
    }
  });
  it("sonlu eşlemede eksik/çoklu çıktı ile örten/bire biri ayrı kurar", () => {
    const a = finiteMap021([-1, 0, 1], [0, 1], [[1], [0], [1]]);
    expect(a.isFunction).toBe(true);
    expect(a.injective).toBe(false);
    expect(a.surjective).toBe(true);
    expect(a.inverse).toBeNull();
    const b = finiteMap021([-1, 0, 1], [0, 1, 2], [[0], [1], [2]]);
    expect(b.inverse).toEqual([
      { input: 0, output: -1 },
      { input: 1, output: 0 },
      { input: 2, output: 1 },
    ]);
    const c = finiteMap021([-1, 0, 1], [0, 1], [[0, 1], [], [1]]);
    expect(c.isFunction).toBe(false);
    expect(c.missing).toEqual([0]);
    expect(c.multiple).toEqual([-1]);
    expect(() => finiteMap021([0, 0], [0], [[0], [0]])).toThrow(RangeError);
  });
  it("bileşke sırasında iç ve dış tanım deliğini ayırır", () => {
    const f = { a: 2, b: 1, c: 0, d: 1 },
      g = { kind: "reciprocal" as const, m: 1, n: 3 };
    expect(compose021(f, g, 2, "gf").result).toBe(0.5);
    expect(compose021(f, g, 2, "fg").result).toBe(-1);
    expect(compose021(f, g, 1, "gf").excludedAt).toBe("outer");
    expect(compose021(f, g, 3, "fg").excludedAt).toBe("inner");
    expect(compose021({ a: 1, b: 2, c: 0, d: 0 }, g, 2, "gf").first).toBeNull();
  });
  it("rasyonel tersin gerçek girdi/görüntü dışlamasını ve sabit kuralı ayırır", () => {
    const f = { a: 2, b: 1, c: 1, d: -3 },
      m = rational021(f, 5);
    expect(m.excludedInput).toBe(3);
    expect(m.excludedOutput).toBe(2);
    expect(m.value).toBe(5.5);
    expect(rational021(m.inverse!, 5).value).toBeCloseTo(16 / 3, 12);
    for (const x of [-4, -1, 0, 1, 2, 4, 5]) {
      const y = rational021(f, x).value!;
      expect(rational021(m.inverse!, y).value).toBeCloseTo(x, 11);
    }
    expect(rational021({ a: 0, b: 3, c: 0, d: 1 }, 2).inverse).toBeNull();
    expect(rational021({ a: 1, b: 3, c: 0, d: 0 }, 2).emptyDomain).toBe(true);
  });
  it("polinom derecesinde iptal, sabit ve sıfırı doğru ayırır", () => {
    expect(polynomial021([0, 0, 0, 0], 2).degree).toBeNull();
    expect(polynomial021([3, 0, 0], 2).degree).toBe(0);
    const p = polynomial021([3, 1, -1, 1], -1);
    expect(p.value).toBe(0);
    expect(p.sum).toBe(4);
    expect(p.evenSum).toBe(2);
    expect(p.oddSum).toBe(2);
    expect(() => polynomial021([], 1)).toThrow(RangeError);
  });
  it("doğrusal ve kareli bölenlerde gerçek bölüm/kalan ve geri kurulum sağlar", () => {
    const a = dividePolynomial021([7, -5, -3, 2], [-2, 1]);
    expect(a.kind).toBe("division");
    if (a.kind !== "division") return;
    expect(a.quotient).toEqual([-3, 1, 2]);
    expect(a.remainder).toEqual([1]);
    expect(a.reconstructed).toEqual([7, -5, -3, 2]);
    expect(a.steps).toHaveLength(3);
    const b = dividePolynomial021([4, 3, 2, 1], [-1, 0, 1]);
    expect(b.quotient).toEqual([2, 1]);
    expect(b.remainder).toEqual([6, 4]);
    const low = dividePolynomial021([2, 3], [1, 0, 1]);
    expect(low.quotient).toEqual([0]);
    expect(low.remainder).toEqual([2, 3]);
    expect(dividePolynomial021([0], [0]).kind).toBe("zero-divisor");
    expect(dividePolynomial021([2, 4, 6], [2]).remainder).toEqual([0]);
  });
  it("sonlu ama katsayı kaybeden bölmeyi yanlış kimlik diye sunmaz", () => {
    const P = [1, 0, 0, 0, 0, 0, 0, 0, 1];
    expect(() => dividePolynomial021(P, [1e6, 1])).toThrow(
      "GEOMETRY021_PRECISION",
    );
    expect(() => dividePolynomial021(P, [1e6, 0.001])).toThrow(
      "GEOMETRY021_PRECISION",
    );
  });
  it("çeşitli katsayılarda kalan şartını bağımsız noktalardan sınar", () => {
    for (let n = 0; n < 60; n++) {
      const P = [(n % 7) - 3, (n % 5) - 2, (n % 3) - 1, 1],
        D = n % 2 ? [(n % 3) - 1, 1] : [-1, 0, 1],
        r = dividePolynomial021(P, D);
      if (r.kind !== "division") throw Error("unexpected");
      expect(
        r.remainderDegree === null || r.remainderDegree < r.divisorDegree,
      ).toBe(true);
      for (const x of [-3, -1, 0, 2, 4])
        expect(evalAt(P, x)).toBeCloseTo(
          evalAt(D, x) * evalAt(r.quotient, x) + evalAt(r.remainder, x),
          10,
        );
    }
  });
  it("ortak düzlem ölçeği ve tam özgün kart kapsamını korur", () => {
    const p = plane021([{ x: 5, y: -7 }]);
    expect(p.x(1) - p.x(0)).toBeCloseTo(p.y(0) - p.y(1), 12);
    expect(p.pixelsPerUnit).toBeGreaterThan(0);
    expect(forge021GeometryLessons).toHaveLength(5);
    for (const l of forge021GeometryLessons) {
      expect(l.questions).toHaveLength(10);
      for (const q of l.questions) {
        expect(q.options).toHaveLength(5);
        expect(new Set(q.options.map((x) => x.tr)).size).toBe(5);
        expect(q.prompt.tr.length).toBeGreaterThan(35);
        expect(q.explanation.tr.length).toBeGreaterThan(60);
      }
    }
    for (const g of forge021GeometryGuides) {
      expect(g.sections.length).toBeGreaterThanOrEqual(10);
      expect(g.sections.every((s) => s.paragraphs.length === 2)).toBe(true);
      expect(g.examples.length).toBeGreaterThanOrEqual(4);
      expect(g.examples.every((x) => x.steps.length === 3)).toBe(true);
    }
  });
});
