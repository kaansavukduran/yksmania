import assert from "node:assert/strict";
import { test } from "vitest";
import {
  threeSetCount029,
  threeSetCount029Example,
} from "../src/learning/threeSetCountSource029Model";

test("reconstructs the eight independent regions with both pair conventions", () => {
  for (let input = 0; input < 3 ** 8; input += 1) {
    const [onlyA, onlyB, onlyC, onlyAB, onlyAC, onlyBC, abc, outside] =
      Array.from(
        { length: 8 },
        (_, place) => Math.floor(input / 3 ** place) % 3,
      );
    const a = onlyA + onlyAB + onlyAC + abc;
    const b = onlyB + onlyAB + onlyBC + abc;
    const c = onlyC + onlyAC + onlyBC + abc;
    const union = onlyA + onlyB + onlyC + onlyAB + onlyAC + onlyBC + abc;
    for (const inclusivePairs of [false, true]) {
      const shared = inclusivePairs ? abc : 0;
      const model = threeSetCount029({
        universe: union + outside,
        a,
        b,
        c,
        abc,
        inclusivePairs,
        ab: onlyAB + shared,
        ac: onlyAC + shared,
        bc: onlyBC + shared,
      });
      assert.deepEqual(model.invalid, []);
      assert.deepEqual(model.regions, {
        onlyA,
        onlyB,
        onlyC,
        onlyAB,
        onlyAC,
        onlyBC,
        abc,
        outside,
      });
      assert.equal(model.union, union);
      assert.equal(model.exactlyOne, onlyA + onlyB + onlyC);
      assert.equal(model.exactlyTwo, onlyAB + onlyAC + onlyBC);
    }
  }
});

test("resolves the source diagram and identifies impossible region counts", () => {
  const example = threeSetCount029(threeSetCount029Example);
  assert.deepEqual(example.regions, {
    onlyA: 10,
    onlyB: 6,
    onlyC: 6,
    onlyAB: 7,
    onlyAC: 5,
    onlyBC: 4,
    abc: 3,
    outside: 9,
  });
  assert.equal(example.union, 41);
  assert.equal(example.exactlyTwo, 16);
  assert.ok(
    threeSetCount029({ ...threeSetCount029Example, ab: 2 }).invalid.includes(
      "onlyAB",
    ),
  );
  assert.ok(
    threeSetCount029({
      ...threeSetCount029Example,
      universe: 40,
    }).invalid.includes("outside"),
  );
  assert.ok(
    threeSetCount029({ ...threeSetCount029Example, a: 9 }).invalid.includes(
      "onlyA",
    ),
  );
  assert.throws(
    () => threeSetCount029({ ...threeSetCount029Example, a: 2.5 }),
    RangeError,
  );
});
