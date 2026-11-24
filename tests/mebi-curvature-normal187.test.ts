import { describe, expect, test } from "vitest";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import {
  concaveNormalExample, concaveNormalTitle, concaveRayAt, concaveReturnTitle, curvatureFocusTitle,
} from "../src/learning/mebiConcaveRay";
import { concaveRayFigures } from "../src/learning/sectionFigures/mebiConcaveRayFigures";

const dot = (a: readonly number[], b: readonly number[]) => a[0] * b[0] + a[1] * b[1];

describe("physical page 181 focal length and local normal", () => {
  test.each([-45, -20, 0, 20, 45])("the reflected ray stays on the other side of the local normal at %s°", (angle) => {
    for (const r of [2.4, 3.6, 4.8, 6]) {
      const ray = concaveRayAt(r, 0.8, angle);
      expect(Math.hypot(ray.hit[0] - ray.center[0], ray.hit[1])).toBeCloseTo(r, 10);
      expect(dot(ray.inwardNormal, ray.reflected)).toBeCloseTo(Math.cos(angle * Math.PI / 180), 10);
      expect(dot(ray.inwardNormal, ray.reflected)).toBeCloseTo(dot(ray.inwardNormal, ray.fromHitTowardSource), 10);
      const tangent = [ray.inwardNormal[1], -ray.inwardNormal[0]];
      expect(dot(ray.fromHitTowardSource, tangent)).toBeCloseTo(-dot(ray.reflected, tangent), 10);
      expect(ray.reflected[0]).toBeLessThan(0);
      expect(ray.focus).toBe(-r / 2);
    }
  });

  test("the two focal intervals share the measured radius in either surface", () => {
    for (const [step, side] of [[0, -1], [1, 1]]) {
      const frame = concaveRayFigures[curvatureFocusTitle].draw(6, step);
      const coordinates = new Map(frame.els.flatMap((e) => e.k === "pt" && e.label ? [[e.label, e.p[0]] as const] : []));
      expect(coordinates.get("T")).toBe(0);
      expect(coordinates.get("F")).toBe(3 * side);
      expect(coordinates.get("M")).toBe(6 * side);
      expect(frame.els.filter((e) => e.k === "dim")).toHaveLength(2);
    }
  });

  test("each Kopya Kağıdı solution step resolves to its own figure", () => {
    const sheet = studyCheatSheet("detail-134");
    expect(sheet?.examples.find(({ title }) => title === concaveNormalExample.title)?.stepFigures)
      .toEqual([concaveNormalTitle, concaveReturnTitle]);
  });
});
