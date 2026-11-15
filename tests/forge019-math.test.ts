import { describe, expect, it } from "vitest";
import {
  axes019,
  clip019,
  forge019MathGuides,
  forge019MathLessons,
  forge019MathTopics,
  line019,
  pair019,
  plane019,
  pointSlope019,
  project019,
  through019,
  type Coeff019,
  type Point019,
} from "../src/learning/forge019Math";
const p = (x: number, y: number): Point019 => ({ x, y });
const l = (a: number, b: number, c: number): Coeff019 => ({ a, b, c });
function closePoint(actual: Point019 | null, expected: Point019) {
  expect(actual).not.toBeNull();
  expect(actual!.x).toBeCloseTo(expected.x, 10);
  expect(actual!.y).toBeCloseTo(expected.y, 10);
}
function residual(line: Coeff019, point: Point019) {
  return line.a * point.x + line.b * point.y + line.c;
}
describe("Doğrunun analitiği: conditions and independently computed geometry", () => {
  it("separates the plane and empty solution set from a line", () => {
    expect(line019(l(0, 0, 0))).toMatchObject({
      kind: "plane",
      normal: null,
      slope: null,
    });
    expect(line019(l(0, 0, 2))).toMatchObject({
      kind: "empty",
      normal: null,
      xIntercept: null,
    });
    expect(pair019(l(0, 0, 0), l(1, 0, -2))).toMatchObject({
      kind: "invalid",
      point: null,
      distance: null,
    });
    expect(project019(l(0, 0, 1), p(2, 3))).toMatchObject({
      kind: "empty",
      foot: null,
      distance: null,
    });
  });
  it("derives minus a over b and preserves the vertical and horizontal branches", () => {
    expect(line019(l(2, 3, -5)).slope).toBeCloseTo(-2 / 3);
    expect(line019(l(0, 2, -6))).toMatchObject({
      kind: "line",
      slope: 0,
      angle: 0,
      yIntercept: p(0, 3),
    });
    expect(line019(l(3, 0, -6))).toMatchObject({
      kind: "line",
      slope: null,
      angle: 90,
      xIntercept: p(2, 0),
      yIntercept: null,
    });
    expect(line019(l(1, 1, 0)).angle).toBeCloseTo(135);
    expect(line019(l(1, -1, 0)).angle).toBeCloseTo(45);
  });
  it("requires two different points without inventing an origin or a zero slope", () => {
    expect(through019(p(2, -1), p(2, -1))).toBeNull();
    expect(through019(p(2, -1), p(2, 5))).toBeTruthy();
  });
  it("constructs a line through each endpoint and supports a separate vertical selection", () => {
    const a = p(-2, 3),
      b = p(4, -1),
      out = through019(a, b)!;
    expect(out).toEqual(l(4, 6, -10));
    expect(residual(out, a)).toBe(0);
    expect(residual(out, b)).toBe(0);
    expect(line019(out).slope).toBeCloseTo(-2 / 3);
    expect(line019(through019(p(2, -1), p(2, 5))!).slope).toBeNull();
    expect(line019(through019(p(-2, 3), p(4, 3))!).slope).toBe(0);
    expect(pointSlope019(p(1, 2), 1.5)).toEqual(l(1.5, -1, 0.5));
    expect(pointSlope019(p(1, 2), null)).toEqual(l(1, 0, -1));
  });
  it("finds the unique intersection, including horizontal versus vertical perpendiculars", () => {
    const d = l(1, 1, -4),
      e = l(1, -1, -2),
      pair = pair019(d, e);
    expect(pair).toMatchObject({
      kind: "intersect",
      point: p(3, 1),
      perpendicular: true,
      determinant: -2,
    });
    expect(residual(d, pair.point!)).toBe(0);
    expect(residual(e, pair.point!)).toBe(0);
    expect(pair019(l(1, 0, -2), l(0, 1, -3))).toMatchObject({
      kind: "intersect",
      point: p(2, 3),
      perpendicular: true,
    });
    expect(pair019(l(1, 1, -2), l(1, 2, -4)).perpendicular).toBe(false);
  });
  it("distinguishes coincident and distinct parallel lines without ratios with a zero denominator", () => {
    expect(pair019(l(1, 2, -3), l(-2, -4, 6))).toMatchObject({
      kind: "same",
      point: null,
      distance: 0,
    });
    expect(pair019(l(2, 4, -6), l(1, 2, -5))).toMatchObject({
      kind: "parallel",
      point: null,
    });
    expect(pair019(l(1, 0, -2), l(2, 0, -8))).toMatchObject({
      kind: "parallel",
      distance: 2,
      point: null,
    });
    expect(pair019(l(0, 1, 2), l(0, -3, -6))).toMatchObject({
      kind: "same",
      point: null,
    });
    expect(pair019(l(3, 4, -5), l(-6, -8, 30)).distance).toBeCloseTo(2);
  });
  it("uses the normal projection, not the vertical coordinate, as the shortest distance", () => {
    const d = l(3, 4, -5),
      P = p(3, 4),
      result = project019(d, P);
    closePoint(result.foot, p(0.6, 0.8));
    expect(result.distance).toBeCloseTo(4);
    expect(result.signed).toBeCloseTo(4);
    expect(residual(d, result.foot!)).toBeCloseTo(0);
    const tangent = p(4, -3);
    expect(
      (P.x - result.foot!.x) * tangent.x + (P.y - result.foot!.y) * tangent.y,
    ).toBeCloseTo(0);
    const reverse = project019(l(-6, -8, 10), P);
    closePoint(reverse.foot, result.foot!);
    expect(reverse.signed).toBeCloseTo(-4);
    expect(reverse.distance).toBeCloseTo(result.distance!);
    expect(project019(d, p(-1, 2))).toMatchObject({
      signed: 0,
      distance: 0,
      foot: p(-1, 2),
    });
  });
  it("keeps the foot on the line for an integer grid of points and coefficient signs", () => {
    for (const d of [l(3, 4, -5), l(-2, 1, 3), l(1, 0, -2), l(0, -2, -6)])
      for (let x = -4; x <= 4; x += 2)
        for (let y = -4; y <= 4; y += 2) {
          const result = project019(d, p(x, y));
          expect(residual(d, result.foot!)).toBeCloseTo(0, 10);
          expect(
            Math.hypot(x - result.foot!.x, y - result.foot!.y),
          ).toBeCloseTo(result.distance!, 10);
        }
  });
  it("normalizes opposite coefficient directions before measuring parallel distance", () => {
    const d = l(3, 4, -5),
      e = l(-6, -8, 30),
      K = project019(d, p(0, 0)).foot!,
      H = project019(e, K).foot!;
    closePoint(K, p(0.6, 0.8));
    closePoint(H, p(1.8, 2.4));
    expect(Math.hypot(H.x - K.x, H.y - K.y)).toBeCloseTo(2);
    expect(pair019(d, e).distance).toBeCloseTo(2);
    expect(pair019(d, l(1, -1, 0)).distance).toBe(0);
  });
  it("requires two distinct nonzero intercepts for a positive axes triangle", () => {
    expect(axes019(l(2, 3, -18))).toMatchObject({
      kind: "triangle",
      area: 27,
      x: p(9, 0),
      y: p(0, 6),
    });
    expect(axes019(l(-2, 3, -18)).area).toBe(27);
    expect(axes019(l(2, 3, 0))).toMatchObject({
      kind: "degenerate",
      area: 0,
      x: p(0, 0),
      y: p(0, 0),
    });
    expect(axes019(l(1, 0, -2))).toMatchObject({
      kind: "unbounded",
      area: null,
      x: p(2, 0),
      y: null,
    });
    expect(axes019(l(0, 0, 0))).toMatchObject({ kind: "invalid", area: null });
  });
  it("clips the real infinite line to the square instead of clamping arbitrary endpoints", () => {
    for (const d of [
      l(3, 4, -5),
      l(1, 0, -2),
      l(0, 1, 3),
      l(1, -1, 0),
      l(1, 1, -12),
    ]) {
      const points = clip019(d, 6);
      expect(points.length).toBeLessThanOrEqual(2);
      for (const point of points) {
        expect(residual(d, point)).toBeCloseTo(0);
        expect(
          Math.abs(point.x) <= 6 + 1e-8 && Math.abs(point.y) <= 6 + 1e-8,
        ).toBe(true);
        expect(
          Math.min(
            Math.abs(Math.abs(point.x) - 6),
            Math.abs(Math.abs(point.y) - 6),
          ),
        ).toBeLessThan(1e-8);
      }
    }
    expect(clip019(l(1, 0, -20), 6)).toEqual([]);
    expect(clip019(l(1, 1, -12), 6)).toHaveLength(1);
    expect(clip019(l(0, 0, 0), 6)).toEqual([]);
    expect(clip019(l(1, 1, 0), 1e-12)).toHaveLength(2);
  });
  it("uses equal coordinate scales and a representable positive large-extent scale", () => {
    const scale = plane019([p(9, 0), p(0, 6)]);
    expect(scale.limit).toBe(11);
    expect(scale.x(1) - scale.x(0)).toBeCloseTo(scale.y(0) - scale.y(1));
    expect(scale.x(-scale.limit)).toBe(100);
    expect(scale.x(scale.limit)).toBe(620);
    expect(scale.y(scale.limit)).toBe(60);
    expect(scale.y(-scale.limit)).toBe(580);
    expect(plane019([p(1e308, 0)]).pixelsPerUnit).toBe(2.6e-306);
    expect(
      scale.ticks.every(
        (v) => Number.isFinite(v) && Math.abs(v) <= scale.limit,
      ),
    ).toBe(true);
  });
  it("rejects nonfinite or unrepresentable derived geometry rather than emitting fake results", () => {
    expect(() => line019(l(NaN, 1, 0))).toThrow(RangeError);
    expect(() => line019(l(1e-320, 1, 1))).toThrow(RangeError);
    expect(() => through019(p(-1e308, 0), p(1e308, 1))).toThrow(RangeError);
    expect(() => through019(p(1e-200, 0), p(0, 1e-200))).toThrow(RangeError);
    expect(() => pointSlope019(p(0, 0), Infinity)).toThrow(RangeError);
    expect(() => pointSlope019(p(1e-200, 0), 1e-200)).toThrow(RangeError);
    expect(() => pair019(l(1e-200, 0, -1e-200), l(1e-200, 0, -2e-200))).toThrow(
      RangeError,
    );
    expect(() => project019(l(1e-200, 0, 0), p(1e-200, 0))).toThrow(RangeError);
    expect(() => pair019(l(1e-200, 0, 0), l(0, 1e-200, 0))).toThrow(RangeError);
    expect(() => pair019(l(1e200, 1, 0), l(1, 1e200, 0))).toThrow(RangeError);
    expect(() => project019(l(1, 1, 0), p(Infinity, 0))).toThrow(RangeError);
    expect(() => clip019(l(1, 1, 0), 0)).toThrow(RangeError);
    expect(() => plane019([p(0, NaN)])).toThrow(RangeError);
  });
  it("provides a complete standalone AYT unit with original self-contained questions", () => {
    const guide = forge019MathGuides[0],
      lesson = forge019MathLessons[0];
    expect(lesson.id).toBe("dogrunun-analitigi");
    expect(lesson.subjectId).toBe("ayt-geometri");
    expect(forge019MathTopics[lesson.id]).toBe("detail-404");
    expect(guide.sections).toHaveLength(20);
    expect(
      guide.sections.every(
        (s) =>
          s.paragraphs.length === 2 &&
          s.paragraphs.every((v) => v.length > 150),
      ),
    ).toBe(true);
    expect(guide.examples).toHaveLength(8);
    expect(
      guide.examples.every(
        (e) => e.steps.length === 3 && e.check && e.pitfall && e.strategy,
      ),
    ).toBe(true);
    expect(guide.recall).toHaveLength(8);
    expect(lesson.questions).toHaveLength(10);
    const answers = [
      "−1/2",
      "2x−y−7=0",
      "b≠0 ise eğim −a/b; a≠0 ve b=0 ise doğru dikeydir.",
      "x=3",
      "Farklı ve paraleldir.",
      "(1; 2)",
      "y=3",
      "2",
      "2",
      "12",
    ];
    lesson.questions.forEach((q, i) => {
      expect(q.options).toHaveLength(5);
      expect(new Set(q.options.map((o) => o.tr)).size).toBe(5);
      expect(q.options[q.answer].tr).toBe(answers[i]);
      expect(q.hint.tr.length).toBeGreaterThan(20);
      expect(q.explanation.tr.length).toBeGreaterThan(90);
    });
  });
});
