/** Algebra helpers use integer model inputs; identities themselves hold over the reals. */
export const factorCoefficients = (p: number, q: number) => ({
  b: p + q,
  c: p * q,
});
export function polynomialText(b: number, c: number) {
  const term = (n: number, variable = "") =>
    n === 0
      ? ""
      : `${n > 0 ? "+" : "−"}${Math.abs(n) === 1 && variable ? "" : Math.abs(n)}${variable}`;
  return `x²${term(b, "x")}${term(c)}`;
}
export const linearFactor = (p: number) =>
  p === 0 ? "x" : `(x${p > 0 ? "+" : "−"}${Math.abs(p)})`;
export function factorValues(x: number, p: number, q: number) {
  const { b, c } = factorCoefficients(p, q);
  return { expanded: x * x + b * x + c, product: (x + p) * (x + q) };
}
