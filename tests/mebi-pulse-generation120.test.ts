import { expect, test } from "vitest";
import { generatingPulseAt } from "../src/learning/mebiPulseGeneration";

test.each([[0, 0, 0], [0.75, 0, 1.5], [1.5, 0, 3], [2, 1, 4]])("source pulse at %s seconds reaches the two expected limits", (time, rear, front) => {
  const crest = generatingPulseAt(time, 1);
  const trough = generatingPulseAt(time, -1);
  expect([crest.rear, crest.front, crest.width]).toEqual([rear, front, front - rear]);
  expect(crest.height(front + 0.01)).toBe(0);
  expect(crest.height(rear - 0.01)).toBe(0);
  if (time > 0) expect(trough.height((rear + front) / 2)).toBeCloseTo(-crest.height((rear + front) / 2), 12);
});

test("a point at 1 m follows the source half a second later", () => {
  const early = generatingPulseAt(0.75, -1);
  const late = generatingPulseAt(1.25, -1);
  expect(early.sourceHeight).toBeCloseTo(-1.25, 10);
  expect(late.height(1)).toBeCloseTo(early.sourceHeight, 10);
  expect(generatingPulseAt(2, -1).sourceHeight).toBeCloseTo(0, 10);
});
