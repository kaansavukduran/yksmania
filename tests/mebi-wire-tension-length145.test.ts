import { expect, test } from "vitest";
import { wireAt, wireDiameter, wireLengthM, wireTensionN } from "../src/learning/mebiWirePitch";

test("frequency uses the square root of tension and the inverse of length", () => {
  const diameter = wireDiameter.min;
  const before = wireAt(diameter);
  const doubleTension = wireAt(diameter, 2 * wireTensionN);
  const fourTension = wireAt(diameter, 4 * wireTensionN);
  const halfLength = wireAt(diameter, wireTensionN, wireLengthM / 2);
  expect(doubleTension.frequencyHz / before.frequencyHz).toBeCloseTo(Math.sqrt(2), 10);
  expect(fourTension.frequencyHz / before.frequencyHz).toBeCloseTo(2, 10);
  expect(halfLength.frequencyHz / before.frequencyHz).toBeCloseTo(2, 10);
  for (const other of [doubleTension, fourTension, halfLength]) {
    expect(other.linearDensityKgM).toBe(before.linearDensityKgM);
    expect(other.diameterMm).toBe(diameter);
  }
});
