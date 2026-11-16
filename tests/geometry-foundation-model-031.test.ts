import { describe, expect, it } from "vitest";
import {
  geometry031Angles,
  geometry031Bounds,
  geometry031Centers,
  geometry031Distance,
  geometry031FromSides,
  geometry031Right,
  geometry031Similarity,
  geometry031Triangle,
} from "../src/learning/geometryFoundation031Model";

describe("031 geometri: şekille aynı koordinatlardan gelen matematik", () => {
  it("dar, dik ve geniş üçgenlerin açıları 180° eder; şekil dışına taşan tepeyi de kapsar", () => {
    for (const x of [-2, 0, 3.5, 5, 10, 12])
      for (const y of [2, 6, 9]) {
        const m = geometry031Triangle(
          { x: 0, y: 0 },
          { x: 10, y: 0 },
          { x, y },
        );
        expect(m.valid).toBe(true);
        expect(m.angles!.A + m.angles!.B + m.angles!.C).toBeCloseTo(180, 10);
        expect(m.area).toBe(5 * y);
        expect(m.a).toBeCloseTo(Math.hypot(10 - x, y), 12);
      }
    const obtuse = geometry031Triangle(
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: -2, y: 2 },
    );
    expect(obtuse.angles!.A).toBe(135);
    expect(
      geometry031Triangle({ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 })
        .angles,
    ).toBeNull();
    expect(() =>
      geometry031Triangle({ x: NaN, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 1 }),
    ).toThrow(RangeError);
  });
  it("üçgen eşitsizliğini tüm sürgü uzayında ayırır, geçersiz şekle C veya alan uydurmaz", () => {
    for (let a = 1; a <= 12; a++)
      for (let b = 1; b <= 12; b++)
        for (let c = 1; c <= 20; c++) {
          const m = geometry031FromSides(a, b, c);
          const expected = Math.abs(a - b) < c && c < a + b;
          expect(m.kind === "valid").toBe(expected);
          if (m.kind === "valid") {
            expect(m.triangle.a).toBeCloseTo(a, 10);
            expect(m.triangle.b).toBeCloseTo(b, 10);
            expect(m.triangle.c).toBe(c);
            expect(m.triangle.area).toBeGreaterThan(0);
          } else expect(m.triangle).toBeNull();
        }
    expect(geometry031FromSides(3, 4, 7).kind).toBe("degenerate");
    expect(geometry031FromSides(7, 3, 4).kind).toBe("degenerate");
    expect(geometry031FromSides(3, 4, 8).kind).toBe("impossible");
    for (const value of [NaN, Infinity, -1, 0])
      expect(geometry031FromSides(value, 4, 5).kind).toBe("invalid");
  });
  it("Pisagor ve Öklid'de p'nin AB'ye ait izdüşüm olduğunu değişen dik kenarlarda korur", () => {
    for (let ab = 2; ab <= 12; ab++)
      for (let ac = 2; ac <= 12; ac++) {
        const m = geometry031Right(ab, ac);
        expect(m.angles!.A).toBe(90);
        expect(m.hypotenuse ** 2).toBeCloseTo(ab ** 2 + ac ** 2, 10);
        expect(m.p + m.q).toBeCloseTo(m.hypotenuse, 11);
        expect(geometry031Distance(m.B, m.H)).toBeCloseTo(m.p, 11);
        expect(geometry031Distance(m.H, m.C)).toBeCloseTo(m.q, 11);
        expect(m.p * m.hypotenuse).toBeCloseTo(ab ** 2, 10);
        expect(m.q * m.hypotenuse).toBeCloseTo(ac ** 2, 10);
        expect(m.height ** 2).toBeCloseTo(m.p * m.q, 10);
        expect(
          (m.H.x - m.A.x) * (m.C.x - m.B.x) + (m.H.y - m.A.y) * (m.C.y - m.B.y),
        ).toBeCloseTo(0, 10);
      }
    for (const invalid of [0, -2, NaN, Infinity])
      expect(() => geometry031Right(invalid, 3)).toThrow(RangeError);
  });
  it("açıortay ve kenarortayı eşitlemez, iç çemberin üç kenara gerçek teğetliğini doğrular", () => {
    const lineDistance = (
      p: { x: number; y: number },
      a: { x: number; y: number },
      b: { x: number; y: number },
    ) =>
      Math.abs((b.x - a.x) * (p.y - a.y) - (b.y - a.y) * (p.x - a.x)) /
      geometry031Distance(a, b);
    for (const x of [-1, 0, 3, 5, 10, 11])
      for (const y of [3, 7, 9]) {
        const m = geometry031Centers(
          { x, y },
          { x: 0, y: 0 },
          { x: 10, y: 0 },
        )!;
        expect(m.midpoint).toEqual({ x: 5, y: 0 });
        expect(m.medianAG / m.medianGM).toBeCloseTo(2, 10);
        expect(m.bd / m.dc).toBeCloseTo(m.c / m.b, 10);
        expect(lineDistance(m.incenter, m.A, m.B)).toBeCloseTo(m.inradius, 10);
        expect(lineDistance(m.incenter, m.B, m.C)).toBeCloseTo(m.inradius, 10);
        expect(lineDistance(m.incenter, m.C, m.A)).toBeCloseTo(m.inradius, 10);
      }
    const asym = geometry031Centers(
      { x: 3, y: 7 },
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    )!;
    expect(asym.bd).not.toBeCloseTo(5, 3);
    expect(asym.centroid).not.toEqual(asym.incenter);
    expect(
      geometry031Centers({ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }),
    ).toBeNull();
  });
  it("küçük/büyük karşılıklılığını, paralelliği ve k² alan oranını korur", () => {
    for (const t of [0.2, 0.35, 0.6, 0.8, 1]) {
      const m = geometry031Similarity(t);
      expect(m.D.y).toBe(m.E.y);
      expect(m.small.a / m.big.a).toBeCloseTo(t, 10);
      expect(m.small.b / m.big.b).toBeCloseTo(t, 10);
      expect(m.small.c / m.big.c).toBeCloseTo(t, 10);
      expect(m.small.area / m.big.area).toBeCloseTo(t * t, 10);
      expect(m.small.angles!.A).toBeCloseTo(m.big.angles!.A, 10);
      expect(m.small.angles!.B).toBeCloseTo(m.big.angles!.B, 10);
      expect(m.small.angles!.C).toBeCloseTo(m.big.angles!.C, 10);
    }
    expect(geometry031Similarity(1).small.area).toBe(40);
    for (const invalid of [0, -1, 1.01, NaN])
      expect(() => geometry031Similarity(invalid)).toThrow(RangeError);
  });
  it("H ve O'yu geniş üçgende dışarıda tutar; yükseklikler dik ve çevrel yarıçaplar eşittir", () => {
    const dot = (u: { x: number; y: number }, v: { x: number; y: number }) =>
      u.x * v.x + u.y * v.y;
    const minus = (
      u: { x: number; y: number },
      v: { x: number; y: number },
    ) => ({ x: u.x - v.x, y: u.y - v.y });
    for (const x of [-1, 0, 3, 5, 10, 11])
      for (const y of [3, 6, 9]) {
        const m = geometry031Centers(
          { x, y },
          { x: 0, y: 0 },
          { x: 10, y: 0 },
        )!;
        expect(geometry031Distance(m.circumcenter, m.A)).toBeCloseTo(
          m.circumradius,
          10,
        );
        expect(geometry031Distance(m.circumcenter, m.B)).toBeCloseTo(
          m.circumradius,
          10,
        );
        expect(geometry031Distance(m.circumcenter, m.C)).toBeCloseTo(
          m.circumradius,
          10,
        );
        expect(dot(minus(m.orthocenter, m.A), minus(m.C, m.B))).toBeCloseTo(
          0,
          10,
        );
        expect(dot(minus(m.orthocenter, m.B), minus(m.C, m.A))).toBeCloseTo(
          0,
          10,
        );
        expect(dot(minus(m.orthocenter, m.C), minus(m.B, m.A))).toBeCloseTo(
          0,
          10,
        );
        expect(dot(minus(m.A, m.altitudeFootA), minus(m.C, m.B))).toBeCloseTo(
          0,
          10,
        );
        expect(dot(minus(m.B, m.altitudeFootB), minus(m.C, m.A))).toBeCloseTo(
          0,
          10,
        );
      }
    const obtuse = geometry031Centers(
      { x: 5, y: 3 },
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    )!;
    expect(obtuse.circumcenter.y).toBeLessThan(0);
    expect(obtuse.orthocenter.y).toBeGreaterThan(3);
    const right = geometry031Centers(
      { x: 0, y: 6 },
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    )!;
    expect(right.orthocenter).toEqual({ x: 0, y: 0 });
    expect(right.circumcenter).toEqual({ x: 5, y: 3 });
    const moved = geometry031Centers(
      { x: 1205, y: -497 },
      { x: 1200, y: -500 },
      { x: 1210, y: -500 },
    )!;
    expect(moved.circumcenter.x).toBeCloseTo(obtuse.circumcenter.x + 1200, 10);
    expect(moved.circumcenter.y).toBeCloseTo(obtuse.circumcenter.y - 500, 10);
    expect(moved.orthocenter.x).toBeCloseTo(obtuse.orthocenter.x + 1200, 10);
    expect(moved.orthocenter.y).toBeCloseTo(obtuse.orthocenter.y - 500, 10);
  });
  it("ters/yöndeş açı eşitliğiyle bütünler toplamını birbirinden ayırır", () => {
    for (const theta of [20, 55, 90, 120, 160]) {
      const m = geometry031Angles(theta);
      expect(m.theta).toBe(m.vertical);
      expect(m.theta).toBe(m.corresponding);
      expect(m.theta + m.adjacent).toBe(180);
    }
    expect(geometry031Bounds(NaN, 2, 9)).toBe(2);
    expect(geometry031Angles(Infinity).theta).toBe(20);
  });
});
