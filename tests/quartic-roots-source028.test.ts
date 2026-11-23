import assert from "node:assert/strict";
import { test } from "vitest";
import {
  quarticRoots028,
  quarticInputRange,
} from "../src/learning/quarticRootsSource028Model";

test("matches an independent expanded polynomial and root multiplicities", () => {
  const { min, max } = quarticInputRange;
  let inputs = 0;
  for (let first: number = min; first <= max; first += 1) {
    for (let second: number = min; second <= max; second += 1) {
      inputs += 1;
      const model = quarticRoots028(first, second);
      const distinct = new Set([first, second]);
      const rootCount = [...distinct].reduce(
        (n, value) => n + (value < 0 ? 0 : value === 0 ? 1 : 2),
        0,
      );
      assert.equal(model.roots.length, rootCount);
      assert.deepEqual(
        model.cancelled,
        [...distinct].filter((value) => value < 0),
      );
      for (const { x, radicand, multiplicity } of model.roots) {
        assert.ok(
          Math.abs(x ** 4 - (first + second) * x ** 2 + first * second) < 1e-10,
        );
        const expected =
          (Number(first === radicand) + Number(second === radicand)) *
          (x === 0 ? 2 : 1);
        assert.equal(multiplicity, expected);
        const around = model.valueAt(x - 0.01) * model.valueAt(x + 0.01);
        assert.equal(Math.sign(around), multiplicity % 2 ? -1 : 1);
        assert.ok(Math.abs(x) < model.range.width);
      }
      for (let index = -20; index <= 20; index += 1) {
        const x = (model.range.width * index) / 20;
        const value = model.valueAt(x);
        assert.ok(
          Math.abs(
            value - (x ** 4 - (first + second) * x ** 2 + first * second),
          ) < 1e-9,
        );
        assert.ok(value > model.range.bottom && value < model.range.top);
      }
    }
  }
  assert.equal(inputs, 225);
});

test("distinguishes four roots, no real roots, and fourth multiplicity at zero", () => {
  assert.deepEqual(
    quarticRoots028(1, 4).roots.map(({ x }) => x),
    [-2, -1, 1, 2],
  );
  assert.deepEqual(quarticRoots028(-2, -3).roots, []);
  assert.deepEqual(quarticRoots028(0, 0).roots, [
    { x: 0, sign: 0, radicand: 0, multiplicity: 4 },
  ]);
  assert.throws(() => quarticRoots028(2.5, 4), RangeError);
});

test("keeps the thin negative valley visible in the closest positive-root pairs", () => {
  for (let lower = 1; lower < 9; lower += 1) {
    const model = quarticRoots028(lower, lower + 1);
    const nearAxisHeight = model.valueAt(model.criticalPositions[2]);
    assert.ok(Math.abs(nearAxisHeight + 0.25) < 1e-12);
    assert.equal(model.axisZoom, 1);
    const positive = model.roots.filter(({ sign }) => sign === 1);
    const separation =
      (positive[1].x - positive[0].x) * (448 / (2 * model.range.width));
    const radius = Math.min(6, separation / 2 - 1.75);
    assert.ok(radius > 0);
    assert.ok(2 * (radius + 1) < separation);
    assert.ok((Math.abs(nearAxisHeight) * 190) / (2 * model.axisZoom) > 20);
  }
});
