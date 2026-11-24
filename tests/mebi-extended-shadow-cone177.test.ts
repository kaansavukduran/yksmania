import { expect, test } from "vitest";
import { studyCheatSheet } from "../src/learning/cheatsheetContent";
import { observerDisks, positions, shadowApexCm } from "../src/learning/mebiExtendedSourceObservers";
import { afterApexTitle, apexScreenTitle, beforeApexTitle, extendedConeExample, extendedShadowConeAt } from "../src/learning/mebiExtendedShadowCone";

test("the cone reaches one apex and beyond it the near-axis part sees an outer ring", () => {
  expect(shadowApexCm).toBe(12);
  const near = extendedShadowConeAt(10);
  const apex = extendedShadowConeAt(12);
  const far = extendedShadowConeAt(14);
  expect(near.umbraRadiusCm).toBeCloseTo(2 / Math.sqrt(15), 12);
  expect(near.annularRegionRadiusCm).toBe(0);
  expect(apex.umbraRadiusCm).toBe(0);
  expect(apex.annularRegionRadiusCm).toBe(0);
  expect(far.annularRegionRadiusCm).toBeCloseTo(near.umbraRadiusCm, 12);
  expect(far.umbraRadiusCm).toBe(0);
  for (const state of [near, apex, far]) {
    const y = state.penumbraLimitCm;
    expect(observerDisks(state.screenCm, y - 1e-4).appearance).toBe("partial");
    expect(observerDisks(state.screenCm, y + 1e-4).appearance).toBe("clear");
  }
  expect(positions.map(({ axialCm, lateralCm }) => observerDisks(axialCm, lateralCm).appearance)).toEqual(["full", "partial", "ring"]);
});

test("the separate Kopya Kağıdı keeps all three worked diagrams", () => {
  expect(studyCheatSheet("detail-132")?.examples.find(example => example.title === extendedConeExample.title)?.stepFigures)
    .toEqual([beforeApexTitle, apexScreenTitle, afterApexTitle]);
});
