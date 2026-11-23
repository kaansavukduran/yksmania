import {
  r035,
  r035Add,
  r035Compare,
  r035Mul,
  r035Sequential,
  r035Sub,
  type R035,
} from "./rationalSource035Model";

export type WeightedUse017Input = {
  total: number;
  firstDenominator: number;
  secondDenominator: number;
  distinct: number;
  reportedUses: number;
};

export const weightedUse017Example: WeightedUse017Input = {
  total: 48,
  firstDenominator: 4,
  secondDenominator: 3,
  distinct: 29,
  reportedUses: 51,
};

export const weightedUse017Contradiction: WeightedUse017Input = {
  total: 50,
  firstDenominator: 5,
  secondDenominator: 2,
  distinct: 32,
  reportedUses: 55,
};

export function weightedTotals017(
  groups: readonly { items: R035; weight: number }[],
) {
  const rows = groups.map(({ items, weight }) => ({
    items,
    weight,
    contribution: r035Mul(items, r035(weight)),
  }));
  const totalItems = rows.reduce(
    (sum, row) => r035Add(sum, row.items),
    r035(0),
  );
  const weightedTotal = rows.reduce(
    (sum, row) => r035Add(sum, row.contribution),
    r035(0),
  );
  return { rows, totalItems, weightedTotal };
}

export function weightedUse017(input: WeightedUse017Input) {
  const { total, firstDenominator, secondDenominator, distinct, reportedUses } =
    input;
  if (
    !Object.values(input).every(
      (value) => Number.isSafeInteger(value) && value > 0,
    ) ||
    firstDenominator < 2 ||
    secondDenominator < 2
  ) {
    throw new RangeError(
      "Adetler pozitif tam sayı, kesirlerin paydaları en az 2 olmalı.",
    );
  }

  const { firstUsed, afterFirst, secondUsed, remaining } = r035Sequential(
    r035(total),
    r035(1, firstDenominator),
    r035(1, secondDenominator),
  );
  const thirdUsed = r035Sub(r035Sub(r035(distinct), firstUsed), secondUsed);
  const stages = { firstUsed, afterFirst, secondUsed, remaining, thirdUsed };
  if (firstUsed.d !== 1n || secondUsed.d !== 1n) {
    return {
      ...stages,
      kind: "noninteger" as const,
      fractionStage:
        firstUsed.d !== 1n ? ("first" as const) : ("second" as const),
      counts: null,
      unused: null,
    };
  }
  if (thirdUsed.n <= 0n || r035Compare(thirdUsed, remaining) > 0) {
    return {
      ...stages,
      kind: "infeasible" as const,
      counts: null,
      unused: null,
    };
  }

  const counts = weightedTotals017([
    { items: firstUsed, weight: 1 },
    { items: secondUsed, weight: 2 },
    { items: thirdUsed, weight: 3 },
  ]);

  if (r035Compare(counts.weightedTotal, r035(reportedUses)) !== 0) {
    return { ...stages, kind: "mismatch" as const, counts, unused: null };
  }
  return {
    ...stages,
    kind: "valid" as const,
    counts,
    unused: total - distinct,
  };
}
