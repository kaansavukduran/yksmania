/** Exact arithmetic for the private Rational009 teaching proposal. No learning writes. */
export type R035 = { n: bigint; d: bigint };
export type R035Base = "remaining" | "initial";

function integer(value: bigint | number): bigint {
  if (typeof value === "bigint") return value;
  if (typeof value === "number" && Number.isSafeInteger(value))
    return BigInt(value);
  throw new TypeError("Pay ve payda güvenli tam sayı veya bigint olmalıdır.");
}
const absolute = (n: bigint) => (n < 0n ? -n : n);
function gcd(a: bigint, b: bigint): bigint {
  a = absolute(a);
  b = absolute(b);
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
}
export function r035(n: bigint | number, d: bigint | number = 1n): R035 {
  let a = integer(n), b = integer(d);
  if (b === 0n) throw new RangeError("Payda sıfır olamaz; 0/0 da tanımlı değildir.");
  if (b < 0n) { a = -a; b = -b; }
  if (a === 0n) return { n: 0n, d: 1n };
  const common = gcd(a, b);
  return { n: a / common, d: b / common };
}
function valid(value: R035): R035 {
  if (!value || typeof value !== "object" || typeof value.n !== "bigint" || typeof value.d !== "bigint")
    throw new TypeError("Rasyonel değer bigint pay ve payda taşımalıdır.");
  return r035(value.n, value.d);
}
export function r035Text(value: R035): string {
  const a = valid(value);
  return a.d === 1n ? String(a.n) : `${a.n}/${a.d}`;
}
export function r035Add(left: R035, right: R035): R035 {
  const a = valid(left), b = valid(right);
  return r035(a.n * b.d + b.n * a.d, a.d * b.d);
}
export function r035Sub(left: R035, right: R035): R035 {
  const a = valid(left), b = valid(right);
  return r035(a.n * b.d - b.n * a.d, a.d * b.d);
}
export function r035Mul(left: R035, right: R035): R035 {
  const a = valid(left), b = valid(right);
  return r035(a.n * b.n, a.d * b.d);
}
export function r035Div(left: R035, right: R035): R035 {
  const a = valid(left), b = valid(right);
  if (b.n === 0n) throw new RangeError("Bölen kesir sıfır olamaz.");
  return r035(a.n * b.d, a.d * b.n);
}
export function r035Compare(left: R035, right: R035): -1 | 0 | 1 {
  const a = valid(left), b = valid(right);
  const difference = a.n * b.d - b.n * a.d;
  return difference < 0n ? -1 : difference > 0n ? 1 : 0;
}
export function r035Neg(value: R035): R035 {
  const a = valid(value);
  return r035(-a.n, a.d);
}
export function r035Abs(value: R035): R035 {
  const a = valid(value);
  return r035(absolute(a.n), a.d);
}
export function r035Midpoint(left: R035, right: R035): R035 {
  return r035Div(r035Add(left, right), r035(2));
}
export function r035CommonDenominator(left: R035, right: R035): {
  denominator: bigint; leftNumerator: bigint; rightNumerator: bigint;
} {
  const a = valid(left), b = valid(right);
  const denominator = (a.d / gcd(a.d, b.d)) * b.d;
  return { denominator, leftNumerator: a.n * (denominator / a.d),
    rightNumerator: b.n * (denominator / b.d) };
}

/** Digits are separate: 1,2(3) has whole=1, nonRepeat=2, repeat=3. */
export function r035Decimal(integerPart: string, nonRepeat: string, repeat: string,
  negative = false): R035 {
  if (typeof integerPart !== "string" || !/^\d{1,12}$/.test(integerPart) ||
      typeof nonRepeat !== "string" || !/^\d{0,12}$/.test(nonRepeat) ||
      typeof repeat !== "string" || !/^\d{0,12}$/.test(repeat) ||
      typeof negative !== "boolean")
    throw new TypeError("Tam kısım 1–12, ondalık bloklar 0–12 basamak olmalıdır; işaret ayrı seçilir.");
  const whole = BigInt(integerPart), prefix = BigInt(nonRepeat || "0");
  const scale = 10n ** BigInt(nonRepeat.length);
  const period = repeat ? 10n ** BigInt(repeat.length) - 1n : 1n;
  const numerator = repeat
    ? whole * scale * period + prefix * period + BigInt(repeat)
    : whole * scale + prefix;
  return r035(negative ? -numerator : numerator, scale * period);
}

export interface R035DecimalInfo {
  sign: "" | "-";
  whole: string;
  nonRepeating: string;
  repeat: string;
  /** Mathematical finite classification, even if display was truncated. */
  terminated: boolean;
  /** A display limit, never an assertion that the true expansion ended. */
  truncated: boolean;
  display: string;
}
export function r035DecimalInfo(value: R035, limit = 32): R035DecimalInfo {
  const a = valid(value);
  if (!Number.isInteger(limit) || limit < 1 || limit > 200)
    throw new RangeError("Gösterim sınırı 1–200 tam basamak olmalıdır.");
  const sign = a.n < 0n ? "-" : "";
  const magnitude = absolute(a.n), whole = String(magnitude / a.d);
  let finiteDenominator = a.d;
  for (const prime of [2n, 5n])
    while (finiteDenominator % prime === 0n) finiteDenominator /= prime;
  const terminated = finiteDenominator === 1n;
  let remainder = magnitude % a.d, repeatStart = -1, truncated = false;
  const digits: string[] = [], seen = new Map<bigint, number>();
  while (remainder !== 0n) {
    const prior = seen.get(remainder);
    if (prior !== undefined) { repeatStart = prior; break; }
    if (digits.length >= limit) { truncated = true; break; }
    seen.set(remainder, digits.length);
    remainder *= 10n;
    digits.push(String(remainder / a.d));
    remainder %= a.d;
  }
  const nonRepeating = digits.slice(0, repeatStart < 0 ? digits.length : repeatStart).join("");
  const repeat = repeatStart < 0 ? "" : digits.slice(repeatStart).join("");
  const suffix = repeat ? `${nonRepeating}(${repeat})` : nonRepeating + (truncated ? "…" : "");
  return { sign, whole, nonRepeating, repeat, terminated, truncated,
    display: sign + whole + (suffix ? "," + suffix : "") };
}

function fraction(value: R035): R035 {
  const a = valid(value);
  if (r035Compare(a, r035(0)) < 0 || r035Compare(a, r035(1)) > 0)
    throw new RangeError("Kullanılan pay, 0 ile 1 arasında olmalıdır.");
  return a;
}
function nonnegative(value: R035): R035 {
  const a = valid(value);
  if (a.n < 0n) throw new RangeError("Miktar negatif olamaz.");
  return a;
}
function remainingFactor(first: R035, second: R035, base: R035Base): R035 {
  const a = fraction(first), b = fraction(second), after = r035Sub(r035(1), a);
  if (base !== "remaining" && base !== "initial")
    throw new TypeError("İkinci kullanımın bütünü kalan veya başlangıç olmalıdır.");
  const result = base === "remaining" ? r035Mul(after, r035Sub(r035(1), b)) : r035Sub(after, b);
  if (result.n < 0n) throw new RangeError("Kullanılan miktarlar başlangıcı aşamaz.");
  return result;
}
export function r035Sequential(total: R035, first: R035, second: R035,
  base: R035Base = "remaining"): {
    firstUsed: R035; afterFirst: R035; secondUsed: R035;
    remaining: R035; fractionRemaining: R035;
  } {
  const start = nonnegative(total), a = fraction(first), b = fraction(second);
  const factor = remainingFactor(a, b, base);
  const firstUsed = r035Mul(start, a), afterFirst = r035Sub(start, firstUsed);
  const secondUsed = r035Mul(base === "remaining" ? afterFirst : start, b);
  return { firstUsed, afterFirst, secondUsed, remaining: r035Sub(afterFirst, secondUsed),
    fractionRemaining: factor };
}
export function r035InitialFromRemaining(remaining: R035, first: R035, second: R035,
  base: R035Base = "remaining"): R035 {
  const end = nonnegative(remaining), factor = remainingFactor(first, second, base);
  if (factor.n === 0n)
    throw new RangeError("Kalan çarpanı sıfırken başlangıç tek olarak bulunamaz.");
  return r035Div(end, factor);
}
