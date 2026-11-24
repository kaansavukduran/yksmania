import { expect, test } from "vitest";
import { pulleyTensionAt, pulleyTensionSection } from "../src/learning/mebiPulleyTension";

test("water increases the stationary load and the wave speed by the square-root ratio", () => {
  const empty = pulleyTensionAt(0);
  const full = pulleyTensionAt(300);
  expect([empty.totalMassKg, empty.tensionN, empty.speedMps, empty.travelledM, empty.waterFraction]).toEqual([0.1, 1, 10, 1.5, 0]);
  expect([full.totalMassKg, full.tensionN, full.speedMps, full.travelledM, full.waterFraction]).toEqual([0.4, 4, 20, 3, 1]);
  expect(full.timeS).toBe(empty.timeS);
  expect(full.widthM / empty.widthM).toBe(2);
  expect(pulleyTensionAt(150).speedMps).toBeCloseTo(Math.sqrt(250), 12);
});

test("the two published table rows retain mass, tension and speed units", () => {
  expect(pulleyTensionSection.table?.rows).toEqual([
    ["0 g", "0,1 kg", "1 N", "10 m/s"],
    ["300 g", "0,4 kg", "4 N", "20 m/s"],
  ]);
});
