import {
  power039Format,
  power039Fraction,
  power039RationalPower,
  power039Scalar,
} from "./powersSource039Model";

export const root015Bounds = { degree: [2, 5], radicand: [-64, 64] } as const;
const degrees = ["²", "³", "⁴", "⁵"] as const;
const radicalSigns = ["√", "∛", "∜", "⁵√"] as const;
const signed = (value: number) => String(value).replace("-", "−");

export type Root015Point = {
  label: string;
  coordinate: number;
  // Strict integer bounds identify an irrational value without rounding it.
  bracket: readonly [number, number] | null;
};

export function nthRoot015(degree: number, radicand: number) {
  const [degreeMin, degreeMax] = root015Bounds.degree;
  const [valueMin, valueMax] = root015Bounds.radicand;
  if (
    !Number.isInteger(degree) ||
    degree < degreeMin ||
    degree > degreeMax ||
    !Number.isInteger(radicand) ||
    radicand < valueMin ||
    radicand > valueMax
  ) {
    throw new RangeError(
      "Bu etkinlikte derece 2–5, kök içi −64 ile 64 arasında tam sayı olmalı.",
    );
  }

  const radical =
    radicalSigns[degree - degreeMin] +
    (radicand < 0 ? `(${signed(radicand)})` : signed(radicand));
  const equation = `x${degrees[degree - degreeMin]} = ${signed(radicand)}`;
  const result = power039RationalPower(power039Fraction(radicand), 1, degree);
  if (result.kind === "not-real") {
    return {
      kind: "not-real" as const,
      radical,
      equation,
      principal: null,
      solutions: [],
    };
  }

  let principal: Root015Point;
  if (result.kind === "exact") {
    principal = {
      label: power039Format(result.value).replace("-", "−"),
      coordinate: power039Scalar(result.value),
      bracket: null,
    };
  } else if (result.kind === "irrational") {
    const magnitude = Math.abs(radicand);
    let upper = 1;
    while (BigInt(upper) ** BigInt(degree) < BigInt(magnitude)) upper++;
    principal = {
      label: radical,
      coordinate: Math.sign(radicand) * magnitude ** (1 / degree),
      bracket: radicand < 0 ? [-upper, 1 - upper] : [upper - 1, upper],
    };
  } else {
    throw new Error(result.reason);
  }

  const solutions = [principal];
  if (degree % 2 === 0 && radicand > 0) {
    const { bracket } = principal;
    solutions.unshift({
      label: `−${principal.label}`,
      coordinate: -principal.coordinate,
      bracket: bracket && [-bracket[1], -bracket[0]],
    });
  }
  return { kind: result.kind, radical, equation, principal, solutions };
}
