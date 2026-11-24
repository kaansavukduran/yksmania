import { expect, test } from "vitest";
import { focusDepthKm, seismicArrival } from "../src/learning/mebiSeismicFocus";

test.each([[0, 6], [8, 10], [12, Math.sqrt(180)]])("uses the full source-to-station path at %s surface kilometers", (station, path) => {
  const arrival = seismicArrival(station);
  expect(arrival.pathKm).toBeCloseTo(path, 10);
  expect(arrival.pathKm).toBeGreaterThanOrEqual(focusDepthKm);
  expect(arrival.pSeconds).toBeCloseTo(path / 6, 10);
  expect(arrival.sSeconds).toBeCloseTo(path / 3, 10);
  expect(arrival.differenceSeconds).toBeCloseTo(path / 6, 10);
});
