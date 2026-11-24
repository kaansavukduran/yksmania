import { describe, expect, test } from "vitest";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { convexSpecialExample, convexSpecialRayAt, convexSpecialSteps } from "../src/learning/mebiConvexSpecialRays";

const dot = (a: readonly number[], b: readonly number[]) => a[0] * b[0] + a[1] * b[1];

describe("source page 183 four paths for a convex mirror", () => {
  test.each([0.4, 0.8, 1.2, 1.6])("preserves the convex-mirror relationships at height %s", (height) => {
    const parallel = convexSpecialRayAt(0, height);
    const towardFocus = convexSpecialRayAt(1, height);
    const towardCenter = convexSpecialRayAt(2, height);
    const tilted = convexSpecialRayAt(3, height);
    expect(parallel.distance).toBeLessThan(0);
    expect(parallel.guide).toEqual(parallel.crossing);
    expect(parallel.crossing?.[0]).toBeGreaterThan(0);
    expect(towardFocus.guide).toEqual(parallel.crossing);
    expect(towardFocus.reflected[0]).toBeCloseTo(-1, 10);
    expect(towardFocus.reflected[1]).toBeCloseTo(0, 10);
    expect(towardFocus.crossing).toBeNull();
    expect(towardCenter.guide).toEqual(towardCenter.center);
    expect(towardCenter.reflected[0]).toBeCloseTo(-towardCenter.incoming[0], 10);
    expect(towardCenter.reflected[1]).toBeCloseTo(-towardCenter.incoming[1], 10);
    expect(dot(tilted.reflected, tilted.normal)).toBeCloseTo(Math.sqrt(3) / 2, 10);
    expect(dot(tilted.incoming, tilted.normal)).toBeCloseTo(-dot(tilted.reflected, tilted.normal), 10);
    for (const ray of [parallel, towardFocus, towardCenter, tilted]) {
      expect(ray.source[0]).toBeLessThan(ray.hit[0]);
      expect(ray.reflected[0]).toBeLessThan(0);
    }
  });

  test("the study sheet gives an independent drawing for each source role", () => {
    const example = studyCheatSheet("detail-134")?.examples.find(({ title }) => title === convexSpecialExample.title);
    expect(example?.stepFigures).toEqual([...convexSpecialSteps]);
  });
});
