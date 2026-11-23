import { expect, it } from "vitest";
import { parabolaOffsets, sourceParabola, translatedSourceParabola } from "../src/learning/parabolaTranslation075";

it("matches the vertex and marked point in the source graph", () => {
  const image = translatedSourceParabola(3, -1);
  expect(image.oldVertex).toEqual([-1, 2]);
  expect(image.oldMarked).toEqual([0, 3]);
  expect(image.vertex).toEqual([2, 1]);
  expect(image.marked).toEqual([3, 2]);
  expect(image.value(0)).toBe(5);
});

it("moves both marked points with one vector throughout the controls' domain", () => {
  for (let horizontal = -3; horizontal <= 4; horizontal++) {
    for (const vertical of parabolaOffsets) {
      const image = translatedSourceParabola(horizontal, vertical);
      for (const point of [image.vertex, image.marked]) {
        expect(image.value(point[0])).toBe(point[1]);
        expect(sourceParabola(point[0] - horizontal)).toBe(point[1] - vertical);
      }
      expect(image.value(image.vertex[0] - 2) - image.vertex[1]).toBe(4);
      expect(image.value(image.vertex[0] + 2) - image.vertex[1]).toBe(4);
    }
  }
});
