import {
  r035,
  r035Compare,
  r035Div,
  r035Mul,
  r035Sub,
} from "./rationalSource035Model";

export type EqualRemainders020Input = {
  capacityA: number;
  capacityB: number;
  fillA: number;
  useA: number;
  useB: number;
};

export const equalRemainders020Example: EqualRemainders020Input = {
  capacityA: 80,
  capacityB: 80,
  fillA: 75,
  useA: 40,
  useB: 20,
};

export function equalRemainders020(input: EqualRemainders020Input) {
  const { capacityA, capacityB, fillA, useA, useB } = input;
  if (
    ![capacityA, capacityB].every((n) => Number.isSafeInteger(n) && n > 0) ||
    ![fillA, useA, useB].every((n) => Number.isInteger(n) && n >= 0 && n <= 100)
  ) {
    throw new RangeError(
      "Kapasiteler pozitif tam sayı, yüzdeler 0 ile 100 arasında tam sayı olmalı.",
    );
  }
  const initialA = r035Mul(r035(capacityA), r035(fillA, 100));
  const consumedA = r035Mul(initialA, r035(useA, 100));
  const remainingA = r035Sub(initialA, consumedA);
  const keptB = r035(100 - useB, 100);
  const state = {
    capacityA: r035(capacityA),
    capacityB: r035(capacityB),
    equalCapacity: capacityA === capacityB,
    initialA,
    consumedA,
    remainingA,
    keptB,
  };

  if (keptB.n === 0n) {
    return {
      ...state,
      kind:
        remainingA.n === 0n
          ? ("underdetermined" as const)
          : ("inconsistent" as const),
      requiredB: null,
      fillB: null,
      consumedB: null,
      remainingB: null,
    };
  }

  const requiredB = r035Div(remainingA, keptB);
  const fillB = r035Div(requiredB, state.capacityB);
  const consumedB = r035Mul(requiredB, r035(useB, 100));
  const remainingB = r035Sub(requiredB, consumedB);
  return {
    ...state,
    kind:
      r035Compare(fillB, r035(1)) > 0
        ? ("over-capacity" as const)
        : ("unique" as const),
    requiredB,
    fillB,
    consumedB,
    remainingB,
  };
}
