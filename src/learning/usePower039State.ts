import { useExploration } from "./useExploration";

type Choice039 = string | number | boolean;
type Widen039<T> = T extends number ? number : T extends boolean ? boolean : string;
const numberLimits039: Record<string, readonly [number, number]> = {
  "Anatomy.base": [
    -5,
    5
  ],
  "Anatomy.exponent": [
    -6,
    8
  ],
  "Laws.base": [
    -3,
    3
  ],
  "Laws.m": [
    -4,
    5
  ],
  "Laws.n": [
    -4,
    5
  ],
  "Same.a": [
    -5,
    5
  ],
  "Same.b": [
    -5,
    5
  ],
  "Same.n": [
    -4,
    5
  ],
  "Factor.base": [
    1,
    5
  ],
  "Factor.n": [
    -2,
    4
  ],
  "Factor.gap": [
    0,
    3
  ],
  "Factor.c": [
    -4,
    5
  ],
  "Factor.d": [
    -4,
    5
  ],
  "Prime.k": [
    -3,
    4
  ],
  "Prime.p": [
    -3,
    3
  ],
  "Prime.q": [
    -3,
    3
  ],
  "Prime.r": [
    -3,
    3
  ],
  "Equation.a": [
    -3,
    3
  ],
  "Equation.b": [
    -4,
    4
  ],
  "Equation.c": [
    -3,
    3
  ],
  "Equation.d": [
    -4,
    4
  ],
  "Compare.m": [
    -4,
    8
  ],
  "Compare.n": [
    -4,
    8
  ],
  "Scientific.coefficient": [
    -99,
    99
  ],
  "Scientific.exponent": [
    -6,
    9
  ],
  "Scientific.second": [
    -99,
    99
  ],
  "Scientific.otherExponent": [
    -6,
    9
  ],
  "Rational.base": [
    -16,
    16
  ],
  "Rational.m": [
    -4,
    4
  ],
  "Rational.n": [
    1,
    6
  ],
  "Rational.inner": [
    -3,
    3
  ],
  "Growth.initial": [
    0,
    200
  ],
  "Growth.steps": [
    0,
    12
  ]
};
const choices039: Record<string, readonly string[]> = {
  "Equation.base": [
    "half",
    "1",
    "2",
    "3"
  ],
  "Compare.kind": [
    "half",
    "1",
    "2",
    "-2"
  ],
  "Scientific.operation": [
    "single",
    "add",
    "multiply"
  ],
  "Growth.q": [
    "0",
    "half",
    "1",
    "2",
    "3"
  ],
  "PowersSource039Lab.mode": [
    "anatomy",
    "laws",
    "same",
    "factor",
    "prime",
    "equation",
    "compare",
    "scientific",
    "rational",
    "growth"
  ]
};

// Invalid restored controls fall back locally; opening a model never writes state.
export function restoredPower039Value<T extends Choice039>(
  key: string, value: unknown, initial: T,
): Widen039<T> {
  if (typeof initial === "number") {
    const limits = numberLimits039[key];
    return (typeof value === "number" && Number.isSafeInteger(value) && limits &&
      value >= limits[0] && value <= limits[1] ? value : initial) as Widen039<T>;
  }
  if (typeof initial === "boolean")
    return (typeof value === "boolean" ? value : initial) as Widen039<T>;
  return (typeof value === "string" && choices039[key]?.includes(value)
    ? value : initial) as Widen039<T>;
}

// Existing exploration storage is deliberately separate from scored learning.
export function usePower039State<T extends Choice039>(key: string, initial: T) {
  const [saved, set] = useExploration("powers-source-039", { [key]: initial });
  const value = restoredPower039Value(key, saved[key], initial);
  const change = (next: Widen039<T>) => set({ [key]: next } as Partial<typeof saved>);
  return [value, change] as const;
}
