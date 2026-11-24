import { expect, test } from "vitest";
import { pulseDampingAt, pulseDampingSection } from "../src/learning/mebiPulseDamping";

test.each([
  { time: 0, left: 2, right: 5, height: 4 },
  { time: 0.5, left: 3, right: 6, height: Math.sqrt(12) },
  { time: 1, left: 4, right: 7, height: 3 },
  { time: 2, left: 6, right: 9, height: 2.25 },
])("both pulses share a width at $time seconds while their peaks differ", ({ time, left, right, height }) => {
  const state = pulseDampingAt(time);
  const peak = (left + right) / 2;
  expect([state.leftM, state.rightM, state.widthM]).toEqual([left, right, 3]);
  expect(state.idealHeightCm(peak)).toBeCloseTo(4, 12);
  expect(state.dampedHeightCm(peak)).toBeCloseTo(height, 12);
  for (const x of [left - 1, left, right, right + 1]) {
    expect([state.idealHeightCm(x), state.dampedHeightCm(x)]).toEqual([0, 0]);
  }
});

test("the learner table uses centimetres for amplitude and metres for width", () => {
  expect(pulseDampingSection.table?.rows).toEqual([
    ["0 s", "3 m", "4 cm", "4 cm"],
    ["1 s", "3 m", "4 cm", "3 cm"],
    ["2 s", "3 m", "4 cm", "2,25 cm"],
  ]);
});
