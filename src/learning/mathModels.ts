export const clampInt = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, Math.round(Number.isFinite(n) ? n : min)));
export const numberExamples = [
  { label: "−4", value: "−4", sets: ["Z", "Q", "R"] },
  { label: "0", value: "0", sets: ["N", "Z", "Q", "R"] },
  { label: "7/2", value: "3,5", sets: ["Q", "R"] },
  { label: "√9", value: "3", sets: ["N", "Z", "Q", "R"] },
  { label: "√5", value: "√5", sets: ["R"] },
  { label: "0,25", value: "1/4", sets: ["Q", "R"] },
];
export const numberSets = [
  { id: "N", symbol: "ℕ", name: "Doğal", description: "0, 1, 2, 3, …" },
  { id: "Z", symbol: "ℤ", name: "Tam", description: "…, −2, −1, 0, 1, 2, …" },
  {
    id: "Q",
    symbol: "ℚ",
    name: "Rasyonel",
    description: "a/b; a, b tam sayı, b ≠ 0",
  },
  {
    id: "R",
    symbol: "ℝ",
    name: "Gerçek",
    description: "Rasyonel ve irrasyonel sayılar",
  },
];
export type Arithmetic = "sum" | "product" | "division";
export function arithmeticResult(a: number, b: number, operation: Arithmetic) {
  if (operation === "division" && b === 0) return null;
  return operation === "sum" ? a + b : operation === "product" ? a * b : a / b;
}
export function numberKind(n: number | null) {
  if (n === null)
    return { sign: "Tanımsız", parity: "Tek/çift sınıflaması yapılamaz" };
  return {
    sign: n > 0 ? "Pozitif" : n < 0 ? "Negatif" : "Ne pozitif ne negatif",
    parity: Number.isInteger(n)
      ? n % 2 === 0
        ? "Çift"
        : "Tek"
      : "Tam sayı değil; tek/çift değil",
  };
}
export function sequence(start: number, count: number, step: number) {
  const terms = Array.from({ length: count }, (_, i) => start + i * step);
  const last = terms.at(-1)!;
  return {
    terms,
    last,
    sum: (count * (start + last)) / 2,
    mean: (start + last) / 2,
  };
}
export function primeCandidates(n: number) {
  const list: number[] = [];
  for (let p = 2; p * p <= n; p++)
    if (!list.some((v) => p % v === 0)) list.push(p);
  return list;
}
export function primeEvidence(n: number, tested: number[]) {
  if (!Number.isInteger(n) || n < 2) return "ne-asal-ne-bilesik";
  const required = primeCandidates(n);
  if (required.some((p) => tested.includes(p) && n % p === 0)) return "bilesik";
  return required.every((p) => tested.includes(p)) ? "asal" : "bekliyor";
}
export function primeFactors(n: number) {
  const result: number[] = [];
  for (let p = 2; p * p <= n; p++)
    while (n % p === 0) {
      result.push(p);
      n /= p;
    }
  if (n > 1) result.push(n);
  return result;
}
export function factorial(n: number) {
  if (!Number.isInteger(n) || n < 0 || n > 18)
    throw new Error("FACTORIAL_DOMAIN");
  let total = 1;
  for (let i = 2; i <= n; i++) total *= i;
  return total;
}
