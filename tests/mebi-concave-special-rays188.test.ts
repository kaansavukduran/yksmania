import { describe, expect, test } from "vitest";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { concaveSpecialExample, concaveSpecialRayAt, concaveSpecialSteps } from "../src/learning/mebiConcaveSpecialRays";
import { sphericalMirrorRadius } from "../src/learning/mebiSphericalMirror";

describe("source page 182 six paths for a concave mirror", () => {
  test("the nearly focal and parallel pair exactly reverse the same physical ray", () => {
    const parallel = concaveSpecialRayAt(0), reverse = concaveSpecialRayAt(1);
    expect(parallel.crossing?.[0]).toBeCloseTo(-1.7887849382, 8);
    expect(reverse.source).toEqual(parallel.crossing);
    expect(reverse.reflected[0]).toBeCloseTo(-1, 10);
    expect(reverse.reflected[1]).toBeCloseTo(0, 10);
    expect(reverse.crossing).toBeNull();
  });

  test("the centre ray retraces itself and the vertex keeps the normal component rule", () => {
    const center = concaveSpecialRayAt(2), vertex = concaveSpecialRayAt(3);
    expect(center.crossing?.[0]).toBeCloseTo(-sphericalMirrorRadius, 10);
    expect(center.reflected[0]).toBeCloseTo(-center.incoming[0], 10);
    expect(center.reflected[1]).toBeCloseTo(-center.incoming[1], 10);
    expect(vertex.hit).toEqual([0, 0]);
    expect(vertex.reflected[0]).toBeCloseTo(-Math.sqrt(3) / 2, 10);
    expect(vertex.reflected[1]).toBeCloseTo(-0.5, 10);
  });

  test("the last two paths give real outward and virtual behind-mirror crossings", () => {
    const middle = concaveSpecialRayAt(4), inside = concaveSpecialRayAt(5);
    expect(middle.distance).toBeGreaterThan(0);
    expect(middle.crossing?.[0]).toBeCloseTo(-5.35609078, 7);
    expect(inside.distance).toBeLessThan(0);
    expect(inside.crossing?.[0]).toBeCloseTo(1.8194194, 7);
  });

  test("the study sheet preserves all six drawings in source order", () => {
    const example = studyCheatSheet("detail-134")?.examples.find(({ title }) => title === concaveSpecialExample.title);
    expect(example?.stepFigures).toEqual([...concaveSpecialSteps]);
  });
});
