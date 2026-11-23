import {
  r035,
  r035Add,
  r035Compare,
  r035Div,
  r035Mul,
  r035Sub,
} from "./rationalSource035Model";

export type SplitInterest022Input = {
  principal: number;
  interest: number;
  rateA: number;
  monthsA: number;
  rateB: number;
  monthsB: number;
};

export const splitInterest022Example: SplitInterest022Input = {
  principal: 7200,
  interest: 600,
  rateA: 12,
  monthsA: 6,
  rateB: 10,
  monthsB: 12,
};

export const splitInterest022EqualExample: SplitInterest022Input = {
  ...splitInterest022Example,
  interest: 432,
  rateB: 6,
};

export function splitInterest022(input: SplitInterest022Input) {
  const { principal, interest, rateA, monthsA, rateB, monthsB } = input;
  if (
    !Object.values(input).every(
      (value) => Number.isSafeInteger(value) && value >= 0,
    ) ||
    principal === 0
  ) {
    throw new RangeError(
      "Anapara pozitif, faiz, oran ve süre negatif olmayan tam sayı olmalı.",
    );
  }
  const total = r035(principal);
  const given = r035(interest);
  const coefA = r035(BigInt(rateA) * BigInt(monthsA), 1200n);
  const coefB = r035(BigInt(rateB) * BigInt(monthsB), 1200n);
  const allA = r035Mul(total, coefA);
  const allB = r035Mul(total, coefB);
  const ordered = r035Compare(coefA, coefB);
  const state = {
    total,
    given,
    coefA,
    coefB,
    allA,
    allB,
    minInterest: ordered < 0 ? allA : allB,
    maxInterest: ordered < 0 ? allB : allA,
  };

  if (ordered === 0) {
    return r035Compare(allA, given) === 0
      ? { ...state, kind: "underdetermined" as const }
      : { ...state, kind: "inconsistent" as const };
  }

  const shareA = r035Div(r035Sub(given, allB), r035Sub(coefA, coefB));
  const shareB = r035Sub(total, shareA);
  if (shareA.n < 0n || shareB.n < 0n) {
    return {
      ...state,
      kind:
        shareA.n < 0n ? ("negative-a" as const) : ("outside-total" as const),
      shareA,
      shareB,
    };
  }
  const interestA = r035Mul(shareA, coefA);
  const interestB = r035Mul(shareB, coefB);
  return {
    ...state,
    kind: "unique" as const,
    shareA,
    shareB,
    interestA,
    interestB,
    check: r035Add(interestA, interestB),
  };
}
