import { expect, test } from "vitest";
import { pulseInterfaceAt, pulseInterfaceJoinM, pulseInterfaceTable } from "../src/learning/mebiPulseInterface";

test.each([
  { boundary: "heavy", incidentSpeed: 2, transmittedSpeed: 1, reflectedHeight: -0.5, transmittedHeight: 1, reflectedWidth: 2.4, transmittedWidth: 1.2 },
  { boundary: "light", incidentSpeed: 1, transmittedSpeed: 2, reflectedHeight: 0.5, transmittedHeight: 2, reflectedWidth: 1.2, transmittedWidth: 2.4 },
] as const)("the $boundary join preserves boundary displacement and matches the separated measurements", (example) => {
  for (let tick = -16; tick <= 16; tick++) {
    const state = pulseInterfaceAt(tick / 8, example.boundary);
    expect(state.left(pulseInterfaceJoinM)).toBeCloseTo(state.right(pulseInterfaceJoinM), 12);
    expect(state.reflectedEnergy + state.transmittedEnergy).toBeCloseTo(1, 12);
  }
  const initial = pulseInterfaceAt(-2, example.boundary);
  const after = pulseInterfaceAt(2, example.boundary);
  expect(initial.left(initial.incomingCenterM)).toBe(1.5);
  expect(after.speed1).toBe(example.incidentSpeed);
  expect(after.speed2).toBe(example.transmittedSpeed);
  expect(after.leftWidthM).toBe(example.reflectedWidth);
  expect(after.rightWidthM).toBe(example.transmittedWidth);
  expect(after.left(after.reflectedCenterM)).toBeCloseTo(example.reflectedHeight, 12);
  expect(after.right(after.transmittedCenterM)).toBeCloseTo(example.transmittedHeight, 12);
  expect(after.reflectedCenterM).toBeLessThan(pulseInterfaceJoinM);
  expect(after.transmittedCenterM).toBeGreaterThan(pulseInterfaceJoinM);
});

test("the student table gives the independent source ordering in each direction", () => {
  expect(pulseInterfaceTable.rows).toEqual([
    ["İnce → kalın", "Çukur", "2 m/s", "1 m/s", "2,4 m", "1,2 m"],
    ["Kalın → ince", "Tepe", "1 m/s", "2 m/s", "1,2 m", "2,4 m"],
  ]);
});
