import { describe, expect, test } from "vitest";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import {
  sphericalConcaveTitle, sphericalConvexTitle, sphericalMirrorAt, sphericalMirrorExample, sphericalMirrorRadius,
} from "../src/learning/mebiSphericalMirror";

describe("physical page 180 spherical mirror model", () => {
  test.each([0.4, 0.8, 1.2, 1.8])("measures real and virtual intersections for parallel rays at %s", (height) => {
    const concave = sphericalMirrorAt("concave", height);
    const convex = sphericalMirrorAt("convex", height);
    const radius = sphericalMirrorRadius;
    const angle = Math.asin(height / radius);
    const expected = radius - radius / (2 * Math.cos(angle));
    expect(concave.crossing?.[0]).toBeCloseTo(-expected, 10);
    expect(convex.crossing?.[0]).toBeCloseTo(expected, 10);
    expect(concave.distanceToAxis).toBeGreaterThan(0);
    expect(convex.distanceToAxis).toBeLessThan(0);
    for (const ray of [concave, convex]) {
      expect(Math.hypot(ray.hit[0] - ray.center[0], ray.hit[1])).toBeCloseTo(radius, 10);
      expect(Math.hypot(...ray.reflected)).toBeCloseTo(1, 10);
      const cosine = ray.reflected[0] * ray.normal[0] + ray.reflected[1] * ray.normal[1];
      expect(cosine).toBeCloseTo(-ray.normal[0], 10);
      expect(ray.focus[0]).toBe(ray.center[0] / 2);
    }
  });

  test("a ray along the axis returns along the axis", () => {
    const ray = sphericalMirrorAt("concave", 0);
    expect(ray.hit).toEqual([0, 0]);
    expect(ray.reflected[0]).toBeCloseTo(-1, 10);
    expect(ray.reflected[1]).toBeCloseTo(0, 10);
    expect(ray.crossing).toBeNull();
  });

  test("the Kopya Kağıdı exposes the distinct reflected and virtual drawings", () => {
    const sheet = studyCheatSheet("detail-134");
    expect(sheet?.examples.find(({ title }) => title === sphericalMirrorExample.title)?.stepFigures)
      .toEqual([sphericalConcaveTitle, sphericalConvexTitle]);
  });
});
