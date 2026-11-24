import { expect, it } from "vitest";
import { resolveGuideStep } from "../src/learning/guides/position";

it("keeps legacy worked-example and recall activities after new teaching is appended", () => {
  for (const [id, oldCount, count] of [
    ["turev-teget", 11, 19],
    ["paragraf", 7, 17],
    ["elektrik-alan", 8, 16],
    ["kimyasal-denge", 11, 20],
    ["dna-eslenmesi", 7, 17],
    ["temel-kavramlar", 7, 8],
  ] as const) {
    expect(resolveGuideStep(id, oldCount, 0, count), id).toBe(count);
    expect(resolveGuideStep(id, oldCount + 1, 0, count), id).toBe(count + 1);
    for (let i = 0; i < oldCount; i++)
      expect(resolveGuideStep(id, i, 0, count), id).toBe(i);
  }
});
it("keeps new-section positions and supports future extensions from a recorded section count", () => {
  expect(resolveGuideStep("paragraf", 8, 17, 17)).toBe(8);
  expect(resolveGuideStep("paragraf", 17, 17, 19)).toBe(19);
  expect(resolveGuideStep("paragraf", 18, 17, 19)).toBe(20);
  expect(resolveGuideStep("new-guide", 8, 0, 14)).toBe(8);
});
it("normalizes damaged positions without changing the number of actual guide activities", () => {
  expect(resolveGuideStep("new-guide", NaN, 0, 14)).toBe(0);
  expect(resolveGuideStep("new-guide", -4, 0, 14)).toBe(0);
  expect(resolveGuideStep("paragraf", 100, 0, 17)).toBe(18);
  expect(() => resolveGuideStep("new-guide", 0, 0, 0)).toThrow(RangeError);
});
