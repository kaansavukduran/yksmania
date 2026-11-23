import { expect, it } from "vitest";
import { boxMass, pathDistance, pullingForce, workPowerOver } from "../src/learning/averageWorkPower";

it("keeps signed work and energy fixed while the same trajectory takes a different time", () => {
  expect(workPowerOver(1)).toEqual({
    pullWork: 72, frictionWork: -24, netWork: 48, pullPower: 72, netPower: 48,
    initialSpeed: 5, finalSpeed: 7, averageVelocity: 6,
  });
  expect(workPowerOver(2)).toEqual({
    pullWork: 72, frictionWork: -24, netWork: 48, pullPower: 36, netPower: 24,
    initialSpeed: 1, finalSpeed: 5, averageVelocity: 3,
  });
  for (const seconds of [1, 1.25, 1.5, 1.75, 2]) {
    const result = workPowerOver(seconds);
    expect(result.initialSpeed).toBeGreaterThan(0);
    expect((result.initialSpeed + result.finalSpeed) * seconds / 2).toBeCloseTo(pathDistance);
    expect(boxMass * (result.finalSpeed ** 2 - result.initialSpeed ** 2) / 2).toBeCloseTo(48);
    expect(pullingForce * result.averageVelocity).toBeCloseTo(result.pullPower);
  }
});
