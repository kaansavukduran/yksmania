import { expect, it } from "vitest";
import { r035, r035Sequential } from "../src/learning/rationalSource035Model";
import { inverseRemainder018 } from "../src/learning/inverseRemainderSource018Model";

it("reconstructs source pages 3 and 10 from an exact composed fraction", () => {
  const composition = r035Sequential(r035(1), r035(2, 7), r035(1, 5));
  expect(composition.afterFirst).toEqual(r035(5, 7));
  expect(composition.fractionRemaining).toEqual(r035(4, 7));
  const restored = inverseRemainder018(
    r035(400),
    composition.fractionRemaining,
    false,
  );
  expect(restored).toMatchObject({
    kind: "unique",
    initial: r035(700),
    check: r035(400),
  });
  expect(
    r035Sequential(restored.initial!, r035(2, 7), r035(1, 5)),
  ).toMatchObject({ afterFirst: r035(500), remaining: r035(400) });
});

it("distinguishes the two zero-fraction cases from a uniquely zero initial amount", () => {
  for (const countOnly of [false, true]) {
    expect(inverseRemainder018(r035(0), r035(0), countOnly)).toMatchObject({
      kind: "underdetermined",
      initial: null,
      candidate: null,
      check: null,
    });
    expect(inverseRemainder018(r035(1), r035(0), countOnly)).toMatchObject({
      kind: "inconsistent",
      initial: null,
      candidate: null,
      check: null,
    });
    expect(inverseRemainder018(r035(0), r035(1, 7), countOnly)).toMatchObject({
      kind: "unique",
      initial: r035(0),
      check: r035(0),
    });
  }
});

it("keeps exact rational results for continuous units and rejects them for counts", () => {
  expect(inverseRemainder018(r035(2), r035(3, 4), false)).toMatchObject({
    kind: "unique",
    initial: r035(8, 3),
    check: r035(2),
  });
  expect(inverseRemainder018(r035(2), r035(3, 4), true)).toMatchObject({
    kind: "noninteger",
    initial: null,
    candidate: r035(8, 3),
    check: r035(2),
  });
  expect(inverseRemainder018(r035(200), r035(17, 40), false)).toMatchObject({
    kind: "unique",
    initial: r035(8000, 17),
    check: r035(200),
  });
});

it("tests integer consistency for both the observed and reconstructed counts", () => {
  expect(inverseRemainder018(r035(24), r035(3, 8), true)).toMatchObject({
    kind: "unique",
    initial: r035(64),
    check: r035(24),
  });
  expect(inverseRemainder018(r035(1, 2), r035(1, 2), true)).toMatchObject({
    kind: "noninteger",
    initial: null,
    candidate: r035(1),
    check: r035(1, 2),
  });
  expect(inverseRemainder018(r035(2), r035(1), true)).toMatchObject({
    kind: "unique",
    initial: r035(2),
    check: r035(2),
  });
});

it("rejects negative amounts and fractions outside the whole", () => {
  expect(() => inverseRemainder018(r035(-1), r035(1, 2), false)).toThrow(
    RangeError,
  );
  expect(() => inverseRemainder018(r035(1), r035(-1, 2), false)).toThrow(
    RangeError,
  );
  expect(() => inverseRemainder018(r035(1), r035(11, 10), false)).toThrow(
    RangeError,
  );
});
