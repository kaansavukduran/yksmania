import { expect, test } from "vitest";
import { boundaryWavelength, ultravioletBoundarySection, visibleBoundaryNm, wavelengthRegion } from "../src/learning/mebiUltravioletBoundary";

test.each([[350, "Morötesi"], [380, "Yaklaşık sınır"], [440, "Görünür bölge"]])("classifies %s nm on the same scale as the reference table", (nm, region) => {
  expect(wavelengthRegion(nm)).toBe(region);
  expect(ultravioletBoundarySection.table?.rows).toContainEqual([`${nm} nm`, region]);
});

test("the keyboard range can reach the approximate transition", () => {
  const { min, max, step } = boundaryWavelength;
  expect(min).toBeLessThan(visibleBoundaryNm);
  expect(max).toBeGreaterThan(visibleBoundaryNm);
  expect((visibleBoundaryNm - min) % step).toBe(0);
});
