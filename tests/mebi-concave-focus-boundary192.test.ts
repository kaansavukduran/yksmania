import { expect, test } from "vitest";
import { concaveBoundarySteps, concaveBoundaryTitle } from "../src/learning/mebiConcaveFocusBoundary";
import { physicsFiguresOptics } from "../src/learning/sectionFigures/physicsFiguresOptics";

const figures = physicsFiguresOptics["kuresel-aynalar"];

test("real crossing, parallel boundary and virtual crossing keep their mathematical distinctions", () => {
  const frames = concaveBoundarySteps.map((title, step) => {
    const frame = figures[title].draw(0, 0);
    expect(figures[concaveBoundaryTitle].draw(0, step)).toEqual(frame);
    return frame.els;
  });
  const realImage = frames[0].filter((el) => el.k === "vec").find((el) => el.tone === "b" && el.bold);
  expect(realImage?.b).toEqual([-6, -2]);
  expect(frames[0].filter((el) => el.k === "seg").some((el) => el.dash)).toBe(false);

  const boundary = frames[1].filter((el) => el.k === "seg").filter((el) => el.a[0] === 0 && (el.tone === "a" || el.tone === "c"));
  expect(boundary).toHaveLength(2);
  for (const { a, b } of boundary) expect((b[1] - a[1]) / (b[0] - a[0])).toBeCloseTo(0.5, 12);
  expect(frames[1].filter((el) => el.k === "vec").some((el) => el.tone === "b")).toBe(false);

  const virtualRays = frames[2].filter((el) => el.k === "seg").filter((el) => el.dash);
  expect(virtualRays.map(({ b }) => b)).toEqual([[2, 2], [2, 2]]);
  const virtualImage = frames[2].filter((el) => el.k === "vec").find((el) => el.tone === "b" && el.dash);
  expect(virtualImage?.b).toEqual([2, 2]);
});
