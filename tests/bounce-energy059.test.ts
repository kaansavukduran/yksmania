import { expect, it } from "vitest";
import { bouncePeaks } from "../src/learning/bounceEnergy059";

it("keeps flight time and mechanical energy on a single consistent bounce model", () => {
  const [first, second, third] = bouncePeaks(0.5);
  expect([first.height, second.height, third.height]).toEqual(
    [1, 0.25, 0.0625].map((value) => expect.closeTo(value, 6)),
  );
  expect(second.mechanical).toBeCloseTo(2.5);
  expect(second.otherEnergy).toBeCloseTo(37.5);
  expect(second.startsAt).toBeCloseTo(first.startsAt + 2 * first.halfTime);
  expect(third.peakAt).toBeGreaterThan(second.peakAt);
  for (const ratio of [0.5, 0.6, 0.7, 0.85]) {
    for (const peak of bouncePeaks(ratio)) {
      expect(peak.height).toBeCloseTo(4 * ratio ** (2 * peak.rebound));
      expect(peak.mechanical + peak.otherEnergy).toBeCloseTo(40);
    }
  }
});
