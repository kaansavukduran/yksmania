import { expect, test } from "vitest";
import {
  periodicSpringAt,
  periodicSpringWavelengthM,
} from "../src/learning/mebiPeriodicSpring";

test("adjacent crests travel right by the same distance and keep their spacing", () => {
  const first = periodicSpringAt(3);
  const next = periodicSpringAt(3.25);
  expect(first.leadingDistanceM).toBe(6);
  expect(first.crestDistancesM).toEqual([5.25, 2.25]);
  expect(next.crestDistancesM).toEqual([5.75, 2.75]);
  expect(periodicSpringAt(3.375).crestDistancesM).toEqual([6, 3, 0]);
  expect(first.crestDistancesM[0] - first.crestDistancesM[1]).toBe(periodicSpringWavelengthM);
  expect(first.transverseHeightM(2.25)).toBeCloseTo(0.25, 12);
  expect(first.transverseHeightM(7)).toBe(0);
});

test("the same resting ring moves horizontally and nearby gaps show compression and rarefaction", () => {
  const state = periodicSpringAt(3);
  const gap = (start: number) =>
    state.longitudinalPositionM(start + 0.1) - state.longitudinalPositionM(start);
  expect(gap(4.1)).toBeGreaterThan(0);
  expect(gap(4.1)).toBeLessThan(0.1);
  expect(gap(5.5)).toBeGreaterThan(0.1);
  expect(state.longitudinalPositionM(3)).toBe(3);
  expect(state.longitudinalPositionM(4.25)).toBeCloseTo(4.17, 12);
  expect(periodicSpringAt(3.75).longitudinalPositionM(4.25)).toBeCloseTo(4.33, 12);
});

test("before a source moves, both springs remain in equilibrium", () => {
  const state = periodicSpringAt(0);
  expect(state.leadingDistanceM).toBe(0);
  expect(state.crestDistancesM).toEqual([]);
  expect(state.transverseHeightM(1)).toBe(0);
  expect(state.longitudinalPositionM(9.5)).toBe(9.5);
});
