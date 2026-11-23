import { expect, it } from "vitest";
import { r035 } from "../src/learning/rationalSource035Model";
import {
  targetMixture023,
  targetMixture023Example,
} from "../src/learning/targetMixtureSource023Model";

const example = targetMixture023Example;

it("solves the original example by conserving total mass and dissolved matter", () => {
  expect(targetMixture023(example)).toMatchObject({
    kind: "unique",
    initialSolute: r035(54),
    candidate: r035(50),
    addedSolute: r035(6),
    finalMass: r035(200),
    finalSolute: r035(60),
    check: r035(3, 10),
  });
});

it("reproduces both target concentrations on source 023 v1.2 page 7", () => {
  const source = { initialMass: 120, initialPercent: 40, addedPercent: 10 };
  expect(targetMixture023({ ...source, targetPercent: 25 })).toMatchObject({
    kind: "unique",
    candidate: r035(120),
    check: r035(1, 4),
  });
  expect(targetMixture023({ ...source, targetPercent: 30 })).toMatchObject({
    kind: "unique",
    candidate: r035(60),
    check: r035(3, 10),
  });
});

it("distinguishes the unreachable added concentration from every addition being valid", () => {
  expect(targetMixture023({ ...example, targetPercent: 12 }).kind).toBe(
    "limit",
  );
  expect(
    targetMixture023({ ...example, initialPercent: 12, targetPercent: 12 })
      .kind,
  ).toBe("all");
  expect(
    targetMixture023({ ...example, addedPercent: 36, targetPercent: 30 }),
  ).toMatchObject({ kind: "outside", candidate: r035(-150) });
});

it("accepts a unique zero addition with a different added concentration", () => {
  expect(targetMixture023({ ...example, targetPercent: 36 })).toMatchObject({
    kind: "zero",
    candidate: r035(0),
    addedSolute: r035(0),
    finalMass: r035(150),
    finalSolute: r035(54),
    check: r035(9, 25),
  });
});

it("rejects both outer directions and keeps positive fractional mass exact", () => {
  expect(targetMixture023({ ...example, targetPercent: 42 })).toMatchObject({
    kind: "outside",
    candidate: r035(-30),
  });
  expect(targetMixture023({ ...example, targetPercent: 6 })).toMatchObject({
    kind: "outside",
    candidate: r035(-750),
  });
  expect(
    targetMixture023({
      initialMass: 100,
      initialPercent: 10,
      addedPercent: 35,
      targetPercent: 20,
    }),
  ).toMatchObject({
    kind: "unique",
    candidate: r035(200, 3),
    finalMass: r035(500, 3),
    finalSolute: r035(100, 3),
    check: r035(1, 5),
  });
});

it("covers inclusive starting endpoint, open added endpoint, and strict interior concentrations", () => {
  for (const initialPercent of [0, 12, 36, 100])
    for (const addedPercent of [0, 12, 36, 100])
      for (const targetPercent of [0, 6, 12, 30, 36, 42, 100]) {
        const result = targetMixture023({
          ...example,
          initialPercent,
          addedPercent,
          targetPercent,
        });
        if (
          initialPercent === addedPercent &&
          targetPercent === initialPercent
        ) {
          expect(result.kind).toBe("all");
        } else if (targetPercent === initialPercent) {
          expect(result.kind).toBe("zero");
        } else if (targetPercent === addedPercent) {
          expect(result.kind).toBe("limit");
        } else if (
          targetPercent < Math.min(initialPercent, addedPercent) ||
          targetPercent > Math.max(initialPercent, addedPercent)
        ) {
          expect(result.kind).toBe("outside");
        } else {
          expect(result).toMatchObject({
            kind: "unique",
            check: r035(targetPercent, 100),
          });
        }
      }
  expect(() => targetMixture023({ ...example, initialMass: 0 })).toThrow(
    RangeError,
  );
  expect(() => targetMixture023({ ...example, initialPercent: -1 })).toThrow(
    RangeError,
  );
  expect(() => targetMixture023({ ...example, addedPercent: 101 })).toThrow(
    RangeError,
  );
});
