import { describe, expect, it } from "vitest";
import { r035, r035Text } from "../src/learning/rationalSource035Model";
import {
  independentIntervals011,
  interval011,
  intervalText011,
  planeIntegerPairs011,
  PLANE_INTEGER_011,
  PLANE_TRIANGLE_011,
  reciprocalInterval011,
  sameVariableIntervals011,
  solvePlane011,
  testPlanePoint011,
  type IntervalOperation011,
} from "../src/learning/basicInequalitiesSource011Model";

const point = (x: number, y: number) => ({ x: r035(x), y: r035(y) });
const bounds = (a: number, b: number, aClosed = true, bClosed = true) =>
  interval011(r035(a), r035(b), aClosed, bClosed);
const independentText = (
  op: IntervalOperation011,
  a: ReturnType<typeof bounds>,
  b: ReturnType<typeof bounds>,
) => intervalText011(independentIntervals011(op, a, b).intervals);

describe("011 v1.1 düzlem", () => {
  it("uses the exact three page 7 intersections and chooses the common side by substitution", () => {
    const triangle = solvePlane011(PLANE_TRIANGLE_011);
    expect(triangle.shape).toBe("triangle");
    expect(triangle.vertices).toEqual(
      [point(1, 0), point(4, 0), point(1, 3)].map((p) => ({
        ...p,
        included: true,
      })),
    );
    expect(
      triangle.edges.map(({ boundary, included }) => [boundary, included]),
    ).toEqual([
      ["y", true],
      ["cap", true],
      ["x", true],
    ]);
    expect(testPlanePoint011(PLANE_TRIANGLE_011, point(2, 1)).accepted).toBe(
      true,
    );
    expect(
      testPlanePoint011(PLANE_TRIANGLE_011, point(0, 2)).checks.map(
        (check) => check.satisfies,
      ),
    ).toEqual([false, true, true]);
    expect(
      testPlanePoint011(PLANE_TRIANGLE_011, point(0, 0)).checks[1],
    ).toMatchObject({
      comparison: 0,
      onBoundary: true,
      satisfies: true,
    });
  });

  it("keeps the exact hull and excludes the strict edge and both endpoints", () => {
    const strict = { ...PLANE_TRIANGLE_011, capClosed: false };
    const triangle = solvePlane011(strict);
    expect(triangle.vertices.map(({ included }) => included)).toEqual([
      true,
      false,
      false,
    ]);
    expect(triangle.edges.map(({ included }) => included)).toEqual([
      true,
      false,
      true,
    ]);
    expect(testPlanePoint011(strict, point(4, 0)).checks[2]).toMatchObject({
      comparison: 0,
      onBoundary: true,
      satisfies: false,
    });
    expect(testPlanePoint011(strict, point(2, 1)).accepted).toBe(true);
    expect(planeIntegerPairs011(strict).count).toBe(6n);
  });

  it("reproduces the near and far transfer checks on page 12", () => {
    const input = { ...PLANE_TRIANGLE_011, xMin: r035(0), cap: r035(3) };
    expect(testPlanePoint011(input, point(1, 1)).accepted).toBe(true);
    expect(testPlanePoint011(input, point(2, 2)).accepted).toBe(false);
    expect(testPlanePoint011(input, point(1, 2)).accepted).toBe(true);
    expect(testPlanePoint011(input, point(3, 0)).checks[2]).toMatchObject({
      onBoundary: true,
      satisfies: true,
    });
    expect(
      testPlanePoint011({ ...input, capClosed: false }, point(3, 0)).accepted,
    ).toBe(false);
  });

  it("counts all 16 p13 ordered pairs by column, with 7, 5, 3 and 1 on p14", () => {
    const result = planeIntegerPairs011(PLANE_INTEGER_011);
    expect(result.count).toBe(16n);
    expect(
      result.rows.map(({ x, fromY, toY, count }) => [x, fromY, toY, count]),
    ).toEqual([
      [0n, 0n, 6n, 7n],
      [1n, 0n, 4n, 5n],
      [2n, 0n, 2n, 3n],
      [3n, 0n, 0n, 1n],
    ]);
    expect(
      result.pairs.every(
        (pair) => testPlanePoint011(PLANE_INTEGER_011, pair).accepted,
      ),
    ).toBe(true);
    expect(
      planeIntegerPairs011({ ...PLANE_INTEGER_011, capClosed: false }).count,
    ).toBe(12n);
  });

  it("respects the fixed lower boundaries and can find no lattice pairs in a real triangle", () => {
    const strict = {
      ...PLANE_TRIANGLE_011,
      xClosed: false,
      yClosed: false,
      cap: r035(2),
    };
    expect(solvePlane011(strict).shape).toBe("triangle");
    expect(
      testPlanePoint011(strict, { x: r035(5, 4), y: r035(1, 4) }).accepted,
    ).toBe(true);
    expect(testPlanePoint011(strict, point(1, 0)).checks.slice(0, 2)).toEqual([
      expect.objectContaining({ onBoundary: true, satisfies: false }),
      expect.objectContaining({ onBoundary: true, satisfies: false }),
    ]);
    expect(planeIntegerPairs011(strict)).toEqual({
      rows: [],
      pairs: [],
      count: 0n,
    });
    expect(
      planeIntegerPairs011({ ...strict, xClosed: true, yClosed: true }).pairs,
    ).toEqual([point(1, 0), point(1, 1), point(2, 0)]);
  });

  it("keeps rational vertices exact and handles no solution or a closed singleton", () => {
    const tilted = {
      ...PLANE_TRIANGLE_011,
      xCoefficient: r035(3),
      yCoefficient: r035(2),
    };
    expect(
      solvePlane011(tilted).vertices.map(({ x, y }) => [
        r035Text(x),
        r035Text(y),
      ]),
    ).toEqual([
      ["1", "0"],
      ["4/3", "0"],
      ["1", "1/2"],
    ]);
    const singleton = { ...tilted, cap: r035(3) };
    expect(solvePlane011(singleton).shape).toBe("point");
    expect(planeIntegerPairs011(singleton).pairs).toEqual([point(1, 0)]);
    expect(solvePlane011({ ...singleton, xClosed: false }).shape).toBe("empty");
    expect(solvePlane011({ ...singleton, cap: r035(2) }).shape).toBe("empty");
  });

  it("matches direct substitution for negative and fractional boundaries across strictness", () => {
    for (const xClosed of [true, false])
      for (const yClosed of [true, false])
        for (const capClosed of [true, false]) {
          const input = {
            xMin: r035(-5, 2),
            yMin: r035(-1),
            xCoefficient: r035(3, 2),
            yCoefficient: r035(2),
            cap: r035(7, 2),
            xClosed,
            yClosed,
            capClosed,
          };
          const expected = [];
          for (let x = -5; x <= 5; x++)
            for (let y = -5; y <= 5; y++) {
              const p = point(x, y);
              if (testPlanePoint011(input, p).accepted) expected.push(p);
            }
          expect(planeIntegerPairs011(input).pairs).toEqual(expected);
        }
  });
});

describe("011 v1.1 aralık işlemleri", () => {
  it("reproduces the four page 3 independent intervals", () => {
    const a = bounds(1, 3, false, false),
      b = bounds(2, 4);
    expect(independentText("add", a, b)).toBe("(3, 7)");
    expect(independentText("subtract", a, b)).toBe("(-3, 1)");
    expect(independentText("multiply", a, b)).toBe("(2, 12)");
    expect(independentText("divide", a, b)).toBe("(1/4, 3/2)");
  });

  it("independently tracks membership of both endpoints in the p13–14 transfer", () => {
    const a = bounds(3, 5, false, true),
      b = bounds(1, 2, true, false);
    expect(independentText("subtract", a, b)).toBe("(1, 4]");
    expect(independentText("divide", a, b)).toBe("(3/2, 5]");
  });

  it("tracks the open ends of page 12 difference, product and rectangle area", () => {
    const a = bounds(2, 4, false, false),
      b = bounds(1, 3);
    expect(independentText("subtract", a, b)).toBe("(-1, 3)");
    expect(independentText("multiply", a, b)).toBe("(2, 12)");
  });

  it("uses every mixed-sign corner and the closed zero factor, including ties", () => {
    expect(independentText("multiply", bounds(-2, 3), bounds(1, 4))).toBe(
      "[-8, 12]",
    );
    expect(
      independentText("multiply", bounds(-2, 3), bounds(1, 4, true, false)),
    ).toBe("(-8, 12)");
    expect(
      independentText("multiply", bounds(-2, 3, true, false), bounds(1, 4)),
    ).toBe("[-8, 12)");
    expect(
      independentText(
        "multiply",
        bounds(-1, 1, false, true),
        bounds(-1, 1, false, true),
      ),
    ).toBe("(-1, 1]");
    expect(
      independentText("multiply", bounds(0, 0), bounds(1, 4, false, false)),
    ).toBe("{0}");
    expect(
      independentText(
        "multiply",
        bounds(0, 2, false, true),
        bounds(0, 1, true, false),
      ),
    ).toBe("[0, 2)");
  });

  it("treats equal intervals independently unless the operands are the same variable", () => {
    const a = bounds(-2, 3, false, false);
    expect(independentText("subtract", a, a)).toBe("(-5, 5)");
    expect(
      intervalText011(sameVariableIntervals011("subtract", a).intervals),
    ).toBe("{0}");
    expect(independentText("multiply", a, a)).toBe("(-6, 9)");
    expect(
      intervalText011(sameVariableIntervals011("multiply", a).intervals),
    ).toBe("[0, 9)");
    expect(
      intervalText011(
        sameVariableIntervals011("multiply", bounds(-2, 0, false, false))
          .intervals,
      ),
    ).toBe("(0, 4)");
    expect(sameVariableIntervals011("divide", a)).toMatchObject({
      approachesZero: true,
      excludedZero: true,
    });
    expect(
      intervalText011(sameVariableIntervals011("divide", a).intervals),
    ).toBe("{1}");
    expect(
      intervalText011(
        sameVariableIntervals011("divide", bounds(0, 0)).intervals,
      ),
    ).toBe("∅");
  });

  it("distinguishes approaching zero, excluding zero, sign branches, and an empty domain", () => {
    expect(
      intervalText011(
        reciprocalInterval011(bounds(-2, -1, true, false)).intervals,
      ),
    ).toBe("(-1, -1/2]");
    expect(reciprocalInterval011(bounds(0, 2, false, true))).toMatchObject({
      approachesZero: true,
      excludedZero: false,
    });
    expect(
      intervalText011(
        reciprocalInterval011(bounds(0, 2, false, true)).intervals,
      ),
    ).toBe("[1/2, ∞)");
    expect(reciprocalInterval011(bounds(-2, 3))).toMatchObject({
      approachesZero: true,
      excludedZero: true,
    });
    expect(
      intervalText011(reciprocalInterval011(bounds(-2, 3)).intervals),
    ).toBe("(−∞, -1/2] ∪ [1/3, ∞)");
    expect(independentText("divide", bounds(1, 2), bounds(-2, 3))).toBe(
      "(−∞, -1/2] ∪ [1/3, ∞)",
    );
    expect(
      independentText("divide", bounds(0, 2, false, true), bounds(-2, 3)),
    ).toBe("(−∞, 0) ∪ (0, ∞)");
    expect(independentText("divide", bounds(0, 2), bounds(-2, 3))).toBe("ℝ");
    expect(independentText("divide", bounds(0, 0), bounds(-2, 3))).toBe("{0}");
    expect(independentText("divide", bounds(1, 2), bounds(0, 0))).toBe("∅");
  });

  it("rejects reversed intervals and unattainable singletons", () => {
    expect(() => bounds(2, 1)).toThrow(RangeError);
    expect(() => bounds(2, 2, false, true)).toThrow(RangeError);
  });
});
