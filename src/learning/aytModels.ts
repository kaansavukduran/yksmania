export type Curve = "square" | "absolute";
export const curveValue = (curve: Curve, x: number) =>
  curve === "square" ? x * x : Math.abs(x);
export function slopeSample(curve: Curve, a: number, h: number) {
  if (!Number.isFinite(a) || !Number.isFinite(h) || h === 0)
    throw new RangeError("Geçerli bir nokta ve sıfırdan farklı h gerekir.");
  const fa = curveValue(curve, a),
    fb = curveValue(curve, a + h);
  return {
    fa,
    fb,
    secant: (fb - fa) / h,
    tangent: curve === "square" ? 2 * a : a === 0 ? null : Math.sign(a),
  };
}
// Signed field on the positive x axis, SI output; the source remains fixed.
export function pointField(
  sourceMicroC: number,
  distanceM: number,
  testMicroC: number,
) {
  if (
    ![sourceMicroC, distanceM, testMicroC].every(Number.isFinite) ||
    distanceM <= 0
  )
    throw new RangeError("Uzaklık pozitif ve bütün değerler sonlu olmalıdır.");
  const field = (9e9 * sourceMicroC * 1e-6) / (distanceM * distanceM);
  return { field, force: testMicroC * 1e-6 * field };
}
// Closed, constant-volume elementary A ⇌ B model; k_i=.6, k_g=.3 s^-1.
export function equilibriumAt(
  time: number,
  initialB: number,
  catalyst = false,
) {
  if (
    !Number.isFinite(time) ||
    time < 0 ||
    !Number.isFinite(initialB) ||
    initialB < 0 ||
    initialB > 3
  )
    throw new RangeError(
      "Zaman ve başlangıç derişimi model sınırlarında olmalıdır.",
    );
  const factor = catalyst ? 3 : 1;
  const b = 2 + (initialB - 2) * Math.exp(-0.9 * factor * time);
  const a = 3 - b;
  return {
    a,
    b,
    forward: 0.6 * factor * a,
    reverse: 0.3 * factor * b,
    equilibriumA: 1,
    equilibriumB: 2,
    equilibriumRate: 0.6 * factor,
    kc: 2,
  };
}
export type Base = "A" | "T" | "G" | "C";
const pairs: Record<Base, Base> = { A: "T", T: "A", G: "C", C: "G" };
export function complement(sequence: string): Base[] {
  return [...sequence].map((b) => {
    if (!(b in pairs))
      throw new RangeError("DNA dizisi A, T, G ve C içermelidir.");
    return pairs[b as Base];
  });
}
export const numberTR = (n: number, digits = 3) =>
  new Intl.NumberFormat("tr-TR", { maximumFractionDigits: digits }).format(
    Math.abs(n) < 1e-12 ? 0 : n,
  );
