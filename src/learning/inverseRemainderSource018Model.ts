import {
  r035,
  r035Compare,
  r035Div,
  r035Mul,
  type R035,
} from "./rationalSource035Model";

export function inverseRemainder018(
  observed: R035,
  kept: R035,
  countOnly: boolean,
) {
  const remaining = r035(observed.n, observed.d);
  const fraction = r035(kept.n, kept.d);
  if (
    remaining.n < 0n ||
    fraction.n < 0n ||
    r035Compare(fraction, r035(1)) > 0
  ) {
    throw new RangeError(
      "Son kalan negatif olamaz. Kalan payı 0 ile 1 arasında olmalı.",
    );
  }

  if (fraction.n === 0n) {
    return {
      kind:
        remaining.n === 0n
          ? ("underdetermined" as const)
          : ("inconsistent" as const),
      remaining,
      fraction,
      candidate: null,
      initial: null,
      check: null,
    };
  }

  const candidate = r035Div(remaining, fraction);
  const check = r035Mul(candidate, fraction);
  if (countOnly && (candidate.d !== 1n || remaining.d !== 1n)) {
    return {
      kind: "noninteger" as const,
      remaining,
      fraction,
      candidate,
      initial: null,
      check,
    };
  }
  return {
    kind: "unique" as const,
    remaining,
    fraction,
    candidate,
    initial: candidate,
    check,
  };
}
