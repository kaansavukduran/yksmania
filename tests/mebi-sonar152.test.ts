import { expect, test } from "vitest";
import { sonarDistanceM, sonarSpeedMS, sonarTitle } from "../src/learning/mebiSonar";
import { sonarFigures } from "../src/learning/sectionFigures/mebiSonarFigures";

test("round-trip time and drawing depth use one proportional scale", () => {
  const delays = [40, 80, 120, 160];
  const distances = delays.map(delay => sonarSpeedMS * (delay / 1000) / 2);
  expect(delays.map(sonarDistanceM)).toEqual(distances);
  expect(distances).toEqual([30, 60, 90, 120]);
  const draw = (delay: number) => sonarFigures[sonarTitle].draw(delay, 1, -1);
  const legs = (delay: number) => draw(delay).els.filter(el => el.k === "vec").map(({ a, b }) => b[1] - a[1]);
  expect(legs(120)).toHaveLength(2);
  expect(legs(120)[0]).toBeLessThan(0);
  expect(legs(120)[0]).toBeCloseTo(-legs(120)[1], 12);
  expect(legs(160)[0] - legs(120)[0]).toBeCloseTo(legs(120)[0] - legs(80)[0], 12);
  expect(draw(120).readout).toContain("Sonar başlığından sürüye düşey uzaklık 90 m.");
});
