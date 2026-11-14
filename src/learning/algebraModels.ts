export type Relation = "<" | "≤" | ">" | "≥";
export function compare(a: number, relation: Relation, b: number) {
  return relation === "<"
    ? a < b
    : relation === "≤"
      ? a <= b
      : relation === ">"
        ? a > b
        : a >= b;
}
export function fractionLabel(numerator: number, denominator: number) {
  if (
    !Number.isSafeInteger(numerator) ||
    !Number.isSafeInteger(denominator) ||
    !denominator
  )
    throw Error("INVALID_FRACTION");
  const sign = denominator < 0 ? -1 : 1;
  let a = Math.abs(numerator),
    b = Math.abs(denominator);
  while (b) [a, b] = [b, a % b];
  const n = (numerator * sign) / a;
  const d = Math.abs(denominator) / a;
  return (d === 1 ? String(n) : `${n}/${d}`).replace("-", "−");
}
export function solveEquation(a: number, b: number, c: number) {
  if (a === 0) return { kind: b === c ? "all" : "none" } as const;
  return {
    kind: "single",
    value: (c - b) / a,
    label: fractionLabel(c - b, a),
  } as const;
}
export function solveInequality(
  a: number,
  b: number,
  c: number,
  relation: Relation,
) {
  if (a === 0)
    return { kind: compare(b, relation, c) ? "all" : "none" } as const;
  const reverse: Record<Relation, Relation> = {
    "<": ">",
    "≤": "≥",
    ">": "<",
    "≥": "≤",
  };
  const result = a < 0 ? reverse[relation] : relation;
  const boundary = (c - b) / a;
  const label = fractionLabel(c - b, a);
  const closed = result === "≤" || result === "≥";
  const left = result === "<" || result === "≤";
  return {
    kind: "interval",
    boundary,
    label,
    relation: result,
    closed,
    left,
    interval: left
      ? `(−∞, ${label}${closed ? "]" : ")"}`
      : `${closed ? "[" : "("}${label}, ∞)`,
  } as const;
}
