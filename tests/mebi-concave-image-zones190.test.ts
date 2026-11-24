import { expect, test } from "vitest";
import { concaveImageZonesSteps, concaveImageZonesTitle } from "../src/learning/mebiConcaveImageZones";
import { physicsFiguresOptics } from "../src/learning/sectionFigures/physicsFiguresOptics";

const figures = physicsFiguresOptics["kuresel-aynalar"];

test("on-axis rays from infinity meet at the source diagram focus", () => {
  const { els } = figures[concaveImageZonesTitle].draw(0, 0);
  const segments = els.filter((el) => el.k === "seg");
  const incoming = segments.filter((el) => el.tone === "a");
  const reflected = segments.filter((el) => el.tone === "b");
  expect(incoming).toHaveLength(4);
  expect(reflected).toHaveLength(4);
  for (const [index, ray] of incoming.entries()) {
    expect(ray.a[1]).toBe(ray.b[1]);
    expect(reflected[index].a).toEqual(ray.b);
    expect(reflected[index].b).toEqual([-2, 0]);
  }
});

test.each([[1, 6, 3, -0.5], [2, 4, 4, -1]])(
  "finite concave scene %i keeps the two source ray roles",
  (step, object, image, height) => {
    const frame = figures[concaveImageZonesTitle].draw(0, step);
    const { els } = frame;
    const rays = els.filter((el) => el.k === "seg").filter((el) => el.tone === "c");
    const incoming = rays.filter((el) => el.b[0] === 0);
    const outgoing = rays.filter((el) => el.a[0] === 0);
    const imageArrows = els.filter((el) => el.k === "vec").filter((el) => el.tone === "b" && el.bold);
    expect(incoming).toHaveLength(1);
    expect(outgoing).toHaveLength(1);
    expect(incoming[0].a).toEqual([-object, 1]);
    expect(1 + (object - 2) / object * (incoming[0].b[1] - 1)).toBeCloseTo(0, 12);
    expect(outgoing[0].a).toEqual([0, height]);
    expect(outgoing[0].b[1]).toBe(height);
    expect(outgoing[0].b[0]).toBeLessThan(-image);
    expect(imageArrows.map((el) => el.b)).toEqual([[-image, height]]);
    expect(figures[concaveImageZonesSteps[step]].draw(0, 0)).toEqual(frame);
  },
);
