import { expect, test } from "vitest";
import { wireAt, wireDiameter, wireLengthM, wireTensionN } from "../src/learning/mebiWirePitch";

test("at the same length, tension and material, doubling diameter multiplies linear density by four and halves frequency", () => {
  const k = wireAt(wireDiameter.min);
  const l = wireAt(wireDiameter.initial);
  expect(wireLengthM).toBe(0.75);
  expect(wireTensionN).toBe(20);
  expect(l.linearDensityKgM / k.linearDensityKgM).toBeCloseTo(4, 12);
  expect(l.frequencyHz / k.frequencyHz).toBeCloseTo(0.5, 12);
  expect(wireAt(wireDiameter.max).frequencyHz / k.frequencyHz).toBeCloseTo(1 / 3, 12);
});
