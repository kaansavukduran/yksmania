import { describe, expect, it } from "vitest";
import {
  centroid018,
  distance018,
  endpoint018,
  forge018MathGuides,
  forge018MathLessons,
  forge018MathTopics,
  midpoint018,
  plane018,
  ratioCheck018,
  reflect018,
  region018,
  section018,
  translate018,
  type Point018,
} from "../src/learning/forge018Math";
const p = (x: number, y: number): Point018 => ({ x, y });
function closePoint(actual: Point018 | null, expected: Point018) {
  expect(actual).not.toBeNull();
  expect(actual!.x).toBeCloseTo(expected.x, 10);
  expect(actual!.y).toBeCloseTo(expected.y, 10);
}
describe("Noktanın analitiği: geometric conditions and independent checks", () => {
  it("keeps axes out of the four open regions and treats signed zero as origin", () => {
    expect(
      [p(2, 3), p(-2, 3), p(-2, -3), p(2, -3), p(4, 0), p(0, -4), p(-0, 0)].map(
        region018,
      ),
    ).toEqual(["I", "II", "III", "IV", "x", "y", "O"]);
  });
  it("uses both coordinate differences and separates the axis path from Euclidean distance", () => {
    expect(distance018(p(-3, 4), p(5, -2))).toMatchObject({
      dx: 8,
      dy: -6,
      distance: 10,
      axisPath: 14,
      aToXAxis: 4,
      aToYAxis: 3,
      equalAxisPath: false,
    });
    expect(distance018(p(5, -2), p(-3, 4)).distance).toBe(10);
    expect(distance018(p(-2, 3), p(-2, -4))).toMatchObject({
      distance: 7,
      axisPath: 7,
      equalAxisPath: true,
    });
    expect(distance018(p(2, 2), p(2, 2))).toMatchObject({
      same: true,
      distance: 0,
    });
  });
  it("preserves a midpoint and reverses an endpoint without assuming a positive coordinate", () => {
    expect(midpoint018(p(-4, 5), p(8, -7))).toEqual(p(2, -1));
    expect(endpoint018(p(-4, 5), p(2, -1))).toEqual(p(8, -7));
    expect(midpoint018(p(3, -2), p(3, -2))).toEqual(p(3, -2));
    expect(midpoint018(p(1e308, 1e308), p(1e308, 1e308))).toEqual(
      p(1e308, 1e308),
    );
    expect(endpoint018(p(1e308, 1e308), p(1e308, 1e308))).toEqual(
      p(1e308, 1e308),
    );
  });
  it("distinguishes six reflections and returns to the original point after two identical reflections", () => {
    const a = p(3, -2),
      s = p(-1, 4);
    const expected = {
      x: p(3, 2),
      y: p(-3, -2),
      origin: p(-3, 2),
      diagonal: p(-2, 3),
      anti: p(2, -3),
      center: p(-5, 10),
    };
    for (const kind of [
      "x",
      "y",
      "origin",
      "diagonal",
      "anti",
      "center",
    ] as const) {
      expect(reflect018(a, kind, s)).toEqual(expected[kind]);
      expect(reflect018(reflect018(a, kind, s), kind, s)).toEqual(a);
    }
    expect(reflect018(p(4, 0), "x")).toEqual(p(4, 0));
    expect(reflect018(p(3, -3), "anti")).toEqual(p(3, -3));
    expect(midpoint018(a, reflect018(a, "center", s))).toEqual(s);
  });
  it("constructs internal ratios including vertical and horizontal segments without dividing by a coordinate difference", () => {
    closePoint(section018(p(-4, 2), p(8, -4), 1, 2, false).point, p(0, 0));
    closePoint(section018(p(2, -3), p(2, 6), 1, 2, false).point, p(2, 0));
    closePoint(section018(p(-4, 2), p(8, 2), 1, 2, false).point, p(0, 2));
    for (let m = 1; m <= 6; m++)
      for (let n = 1; n <= 6; n++) {
        const a = p(-3, 4),
          b = p(5, -2),
          result = section018(a, b, m, n, false);
        expect(result.position).toBe("inside");
        const ratio = ratioCheck018(a, b, result.point!);
        expect(ratio.collinear).toBe(true);
        expect(ratio.ratio).toBeCloseTo(m / n, 10);
      }
  });
  it("places external points on the correct side and rejects 1:1 instead of inventing an origin", () => {
    closePoint(section018(p(1, -1), p(5, 3), 3, 1, true).point, p(7, 5));
    expect(section018(p(1, -1), p(5, 3), 3, 1, true).position).toBe("beyond-b");
    closePoint(section018(p(0, 0), p(6, 0), 1, 2, true).point, p(-6, 0));
    expect(section018(p(0, 0), p(6, 0), 1, 2, true).position).toBe("before-a");
    expect(section018(p(-2, 0), p(2, 0), 3, 3, true)).toMatchObject({
      point: null,
      position: "none",
      ratioDefined: false,
    });
    for (let m = 1; m <= 6; m++)
      for (let n = 1; n <= 6; n++)
        if (m !== n) {
          const a = p(-3, 4),
            b = p(5, -2),
            result = section018(a, b, m, n, true),
            ratio = ratioCheck018(a, b, result.point!);
          expect(ratio.collinear).toBe(true);
          expect(ratio.ratio).toBeCloseTo(m / n, 9);
          expect(result.parameter! < 0 || result.parameter! > 1).toBe(true);
        }
  });
  it("distinguishes a collapsed weighted coordinate from the undefined 0/0 distance ratio", () => {
    expect(section018(p(2, -1), p(2, -1), 2, 3, false)).toMatchObject({
      point: p(2, -1),
      position: "collapsed",
      ratioDefined: false,
    });
    expect(section018(p(2, -1), p(2, -1), 1, 1, true)).toMatchObject({
      point: null,
      position: "collapsed",
      ratioDefined: false,
    });
    expect(ratioCheck018(p(2, -1), p(2, -1), p(4, 2)).ratio).toBe(1);
    expect(ratioCheck018(p(2, -1), p(2, -1), p(2, -1)).ratio).toBeNull();
  });
  it("does not mistake a ratio-only off-line point, even far away, for a section point", () => {
    const check = ratioCheck018(p(0, 0), p(6, 0), p(8, 4));
    expect(check.ratio).toBeCloseTo(2);
    expect(check.collinear).toBe(false);
    expect(ratioCheck018(p(0, 0), p(1, 0), p(1e20, 1e20)).collinear).toBe(
      false,
    );
  });
  it("checks centroid, opposite midpoint, 2:1 median and zero-area cases independently", () => {
    const a = p(-4, 1),
      b = p(5, 4),
      c = p(2, -5),
      result = centroid018(a, b, c);
    closePoint(result.centroid, p(1, 0));
    expect(result.oppositeA).toEqual(p(3.5, -0.5));
    expect(result).toMatchObject({ triangle: true, area: 36 });
    expect(
      distance018(a, result.centroid).distance /
        distance018(result.centroid, result.oppositeA).distance,
    ).toBeCloseTo(2);
    expect(centroid018(p(-2, 0), p(1, 0), p(4, 0))).toMatchObject({
      triangle: false,
      area: 0,
      centroid: p(1, 0),
    });
    expect(centroid018(p(1, 1), p(1, 1), p(1, 1))).toMatchObject({
      triangle: false,
      centroid: p(1, 1),
    });
  });
  it("keeps an exactly cancelling centroid on its axis for every vertex order", () => {
    const points = [p(-4, 1), p(5, 4), p(2, -5)];
    for (const [i, j, k] of [
      [0, 1, 2],
      [0, 2, 1],
      [1, 0, 2],
      [1, 2, 0],
      [2, 0, 1],
      [2, 1, 0],
    ]) {
      const center = centroid018(points[i], points[j], points[k]).centroid;
      expect(center).toEqual(p(1, 0));
      expect(region018(center)).toBe("x");
    }
  });
  it("does not turn a genuinely tiny centroid into an axis point", () => {
    for (const y of [Number.MIN_VALUE, -Number.MIN_VALUE, 1e-300, -1e-300]) {
      const center = centroid018(p(1, y), p(1, y), p(1, y)).centroid;
      expect(center).toEqual(p(1, y));
      expect(region018(center)).toBe(y > 0 ? "I" : "IV");
    }
  });
  it("retains a tiny nonzero residual after cancellation of large coordinates", () => {
    const values = [1e150, 3e-300, -1e150];
    for (const [i, j, k] of [
      [0, 1, 2],
      [0, 2, 1],
      [1, 0, 2],
      [1, 2, 0],
      [2, 0, 1],
      [2, 1, 0],
    ]) {
      const center = centroid018(
        p(values[i], 0),
        p(values[j], 0),
        p(values[k], 0),
      ).centroid;
      expect(center.x).toBe(1e-300);
      expect(center.y).toBe(0);
      expect(region018(center)).toBe("x");
    }
  });
  it("keeps a representable large centroid finite even when the coordinate sum overflows", () => {
    for (const sign of [-1, 1]) {
      const max = sign * Number.MAX_VALUE;
      expect(centroid018(p(max, 0), p(max, 0), p(max, 0)).centroid).toEqual(
        p(max, 0),
      );
      const half = max / 2;
      const center = centroid018(p(max, 0), p(half, 0), p(half, 0)).centroid;
      expect(Number.isFinite(center.x)).toBe(true);
      expect(center.x / max).toBeCloseTo(2 / 3, 15);
      expect(center.y).toBe(0);
    }
  });
  it("preserves distances and section points under the same translation of both endpoints", () => {
    const a = p(-3, 4),
      b = p(5, -2),
      av = translate018(a, -2, 3),
      bv = translate018(b, -2, 3);
    expect(av).toEqual(p(-5, 7));
    expect(distance018(av, bv).distance).toBe(distance018(a, b).distance);
    closePoint(
      section018(av, bv, 2, 3, false).point,
      translate018(section018(a, b, 2, 3, false).point!, -2, 3),
    );
  });
  it("fits all points with equal physical coordinate scales and finite tick bounds", () => {
    const points = [
        p(-6, 6),
        p(6, -6),
        section018(p(-6, 6), p(6, -6), 6, 5, true).point!,
      ],
      scale = plane018(points);
    expect(scale.limit).toBe(68);
    expect(scale.x(1) - scale.x(0)).toBeCloseTo(scale.y(0) - scale.y(1));
    expect(scale.x(-scale.limit)).toBe(100);
    expect(scale.x(scale.limit)).toBe(620);
    expect(scale.y(scale.limit)).toBe(60);
    expect(scale.y(-scale.limit)).toBe(580);
    expect(
      points.every(
        (q) =>
          scale.x(q.x) >= 100 &&
          scale.x(q.x) <= 620 &&
          scale.y(q.y) >= 60 &&
          scale.y(q.y) <= 580,
      ),
    ).toBe(true);
    expect(
      scale.ticks.every(
        (v) => Number.isFinite(v) && Math.abs(v) <= scale.limit,
      ),
    ).toBe(true);
  });
  it("preserves a representable positive scale even when twice the extent would overflow", () => {
    expect(plane018([p(1e308, 0)]).pixelsPerUnit).toBeGreaterThan(0);
    expect(plane018([p(1e308, 0)]).pixelsPerUnit).toBe(2.6e-306);
  });
  it("rejects nonfinite values, invalid ratios and overflow instead of emitting NaN SVG geometry", () => {
    expect(() => distance018(p(NaN, 0), p(0, 0))).toThrow(RangeError);
    expect(() => distance018(p(-1e308, 0), p(1e308, 0))).toThrow(RangeError);
    expect(() => endpoint018(p(-1e308, 0), p(1e308, 0))).toThrow(RangeError);
    expect(() => section018(p(0, 0), p(1, 1), 0, 1, false)).toThrow(RangeError);
    expect(() => section018(p(0, 0), p(1, 1), 1, Infinity, true)).toThrow(
      RangeError,
    );
    expect(() => translate018(p(1, 1), NaN, 0)).toThrow(RangeError);
    expect(() => reflect018(p(1, 1), "unknown" as never)).toThrow(RangeError);
    expect(() => centroid018(p(0, 0), p(1e308, 0), p(0, 1e308))).toThrow(
      RangeError,
    );
  });
  it("provides a complete standalone unit with six worked paths and ten unique five-choice original questions", () => {
    const lesson = forge018MathLessons[0],
      guide = forge018MathGuides[0];
    expect(forge018MathTopics[lesson.id]).toBe("detail-138");
    expect(lesson.subjectId).toBe("tyt-geometri");
    expect(guide.sections.length).toBeGreaterThanOrEqual(14);
    expect(
      guide.sections.every(
        (s) =>
          s.paragraphs.length >= 2 &&
          s.paragraphs.every((text) => text.length > 150),
      ),
    ).toBe(true);
    expect(guide.examples).toHaveLength(6);
    expect(
      guide.examples.every(
        (e) => e.steps.length === 3 && e.check && e.pitfall && e.strategy,
      ),
    ).toBe(true);
    expect(guide.recall).toHaveLength(6);
    expect(lesson.questions).toHaveLength(10);
    const answers = [
      "1<k<4",
      "10",
      "{−5, 5}",
      "(−2; 7)",
      "(8; −7)",
      "(2; 2)",
      "(6; 4)",
      "Böyle bir sonlu P yoktur.",
      "(1; 1)",
      "Q, A ve B doğrusal değildir; uzunluk oranı tek başına bölme noktası koşulu değildir.",
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
