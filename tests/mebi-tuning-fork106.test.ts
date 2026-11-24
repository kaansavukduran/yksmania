import { expect, test } from "vitest";
import { soundMarkerSpacing, tuningForkSnapshot } from "../src/learning/mebiTuningFork";

test.each([0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1])("air markers keep their order and oscillate about fixed points at %s T", (time) => {
  const { resting, moving, compressed, rarefied } = tuningForkSnapshot(time);
  expect(resting).toEqual(tuningForkSnapshot(0).resting);
  expect(Math.max(...moving.map((x, index) => Math.abs(x - resting[index])))).toBeLessThanOrEqual(0.09500001);
  expect(moving.slice(1).every((x, index) => x > moving[index])).toBe(true);
  expect(compressed.size).toBeLessThan(soundMarkerSpacing);
  expect(rarefied.size).toBeGreaterThan(soundMarkerSpacing);
});

test("one period restores the marker positions, and a quarter period moves a point with the fork", () => {
  const initial = tuningForkSnapshot(0);
  const nextPeriod = tuningForkSnapshot(1);
  const outward = tuningForkSnapshot(0.25);
  const inward = tuningForkSnapshot(0.75);
  nextPeriod.moving.forEach((x, index) => expect(x).toBeCloseTo(initial.moving[index], 10));
  expect(outward.tineOffset).toBeCloseTo(0.13, 10);
  expect(outward.moving[0]).toBeGreaterThan(outward.resting[0]);
  expect(inward.tineOffset).toBeCloseTo(-0.13, 10);
  expect(inward.moving[0]).toBeLessThan(inward.resting[0]);
});
