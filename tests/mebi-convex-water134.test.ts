import { expect, test } from "vitest";
import { convexFocusCm, convexWater } from "../src/learning/mebiConvexWater";

test("convex reflection diverges in water while the ray extensions meet near the virtual focus", () => {
  const { rays, crests } = convexWater();
  expect(rays).toHaveLength(11);
  for (const { hit: [x, y], normal, reflected: [dx, dy], virtualAxisIntercept } of rays) {
    expect(dx).toBeLessThan(0);
    expect(Math.hypot(dx, dy)).toBeCloseTo(1, 12);
    expect(dx * normal[0] + dy * normal[1]).toBeCloseTo(-normal[0], 12);
    if (y === 0) expect([x, dx, Math.abs(dy)]).toEqual([0, -1, 0]);
    else {
      expect(Math.sign(dy)).toBe(Math.sign(y));
      expect(virtualAxisIntercept!).toBeGreaterThan(convexFocusCm - 0.2);
      expect(virtualAxisIntercept!).toBeLessThan(convexFocusCm);
    }
  }
  expect(crests.flat().every(([x]) => x < 0)).toBe(true);
});
