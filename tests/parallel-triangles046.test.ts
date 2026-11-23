import { describe, expect, it } from "vitest";
import { parallelTriangles046 } from "../src/learning/parallelTriangles046";
import { triangleAnglesReference042, triangleAnglesTeachingCase042 } from "../src/learning/geometryConditions042Official";

type Point = readonly [number, number];
const length = ([x, y]: Point, [otherX, otherY]: Point) => Math.hypot(otherX - x, otherY - y);
const direction = ([x, y]: Point, [otherX, otherY]: Point) =>
  Math.atan2(y - otherY, otherX - x) * 180 / Math.PI;
const angle = (first: Point, vertex: Point, second: Point) =>
  Math.abs((direction(vertex, first) - direction(vertex, second) + 540) % 360 - 180);

describe("özgün paralel üçgen çizimi", () => {
  it("eş kenarlar, paralellik ve çizilen kesişim açıları aynı veriden gelir", () => {
    const [ab, bc, ca, ed, df, fe] = parallelTriangles046.figure.segments!;
    const a = ab.from, b = ab.to, c = bc.to;
    const e = ed.from, d = ed.to, f = df.to;
    const g = parallelTriangles046.figure.arcs![1].center;
    expect(length(a, b)).toBeCloseTo(length(a, c));
    expect(length(d, e)).toBeCloseTo(length(d, f));
    expect(length(a, b)).toBeCloseTo(length(d, e));
    expect(length(b, c)).toBeCloseTo(length(f, e));
    expect(direction(a, c)).toBeCloseTo(direction(e, d));
    expect(direction(f, a)).toBeCloseTo(direction(f, e));
    expect(f[1]).toBeCloseTo(b[1]);
    expect(f[0]).toBeGreaterThan(b[0]);
    expect(f[0]).toBeLessThan(c[0]);
    expect(direction(a, g)).toBeCloseTo(direction(a, c));
    expect(direction(f, g)).toBeCloseTo(direction(f, d));
    expect(angle(a, g, d)).toBeCloseTo(86);
    expect(angle(f, a, g)).toBeCloseTo(43);
    expect(angle(a, f, g)).toBeCloseTo(43);
    expect(angle(b, a, c)).toBeCloseTo(94);
    expect(angle(b, a, f)).toBeCloseTo(51);
  });

  it("soruda yalnızca verilen açı var ve çözüm sonucu açılana kadar çizimde bulunmuyor", () => {
    expect(parallelTriangles046.figure.labels?.map((label) => label.text)).toEqual(["A", "B", "C", "F", "E", "D", "x", "86°"]);
    expect(parallelTriangles046.figure.alt).not.toMatch(/43|51|94/);
    expect(triangleAnglesTeachingCase042.answer).toBe("51°.");
    expect(triangleAnglesTeachingCase042.illustrations?.steps).toHaveLength(3);
    expect(triangleAnglesReference042).toMatchObject({ answer: "E", page: 34, answerPage: 43 });
  });
});
