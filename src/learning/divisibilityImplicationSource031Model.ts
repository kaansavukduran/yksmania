export type ConditionalForm031 = "original" | "converse" | "inverse" | "contrapositive";

function divisibility(divisor: number, value: number) {
  return value % divisor === 0;
}

export function divisibilityImplication031(
  hypothesisDivisor: number,
  conclusionDivisor: number,
  form: ConditionalForm031,
) {
  if (
    ![hypothesisDivisor, conclusionDivisor].every(
      (divisor) => Number.isInteger(divisor) && divisor >= 2 && divisor <= 8,
    )
  ) {
    throw new RangeError("Bölenler 2 ile 8 arasında olmalı.");
  }
  const reverse = form === "converse" || form === "inverse";
  const proofDivisor = reverse ? conclusionDivisor : hypothesisDivisor;
  const requiredDivisor = reverse ? hypothesisDivisor : conclusionDivisor;
  const validForIntegers = divisibility(requiredDivisor, proofDivisor);
  const truthAt = (value: number) => {
    const p = divisibility(hypothesisDivisor, value);
    const q = divisibility(conclusionDivisor, value);
    const [left, right] =
      form === "converse" ? [q, p]
      : form === "inverse" ? [!p, !q]
      : form === "contrapositive" ? [!q, !p]
      : [p, q];
    return { p, q, left, right, valid: !left || right };
  };
  return {
    proofDivisor,
    requiredDivisor,
    validForIntegers,
    reverse,
    negate: form === "inverse" || form === "contrapositive",
    witness: validForIntegers ? null : proofDivisor,
    factor: validForIntegers ? proofDivisor / requiredDivisor : null,
    truthAt,
  };
}
