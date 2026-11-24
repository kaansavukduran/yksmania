import { expect, test } from "vitest";
import { pulseDirectionAt, pulseDirectionSection, verticalDirection } from "../src/learning/mebiPulseDirection";
import { pulseSpeedMps } from "../src/learning/mebiSpringPulse";

test.each([0, 1, 2, 3])("movement arrows follow a translating pulse in selection %s", (index) => {
  const { direction, label, height, front, rear } = pulseDirectionAt(index);
  const timeStep = 1e-5;
  for (const point of [front, rear]) {
    const travel = direction * pulseSpeedMps * timeStep;
    const numeric = (height(point.x - travel) - height(point.x + travel)) / (2 * timeStep);
    expect(point.verticalVelocity).toBeCloseTo(numeric, 7);
  }
  expect(direction * (front.x - rear.x)).toBeGreaterThan(0);
  expect(front.y * front.verticalVelocity).toBeGreaterThan(0);
  expect(rear.y * rear.verticalVelocity).toBeLessThan(0);
  expect(pulseDirectionSection.table?.rows).toContainEqual([label, verticalDirection(front.verticalVelocity), verticalDirection(rear.verticalVelocity)]);
});
