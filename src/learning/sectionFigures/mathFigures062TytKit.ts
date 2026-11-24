/*
 * Forge062 TYT Matematik yardımcıları: tam sayı, kesir ve sayma hesapları.
 * Figürlerdeki her sayı bu fonksiyonlardan, rehber bölümündeki verilerle
 * hesaplanır; çizim yardımcıları Forge060 kitinden gelir.
 */
export { cell, interval, nf, numberLine, pad, rect, sup, table, token, zs } from "./mathFigures060TytKit";

export const isPrime = (n: number) => {
  if (n < 2 || !Number.isInteger(n)) return false;
  for (let p = 2; p * p <= n; p++) if (n % p === 0) return false;
  return true;
};

/** Asal çarpanlar: [asal, üs] çiftleri, küçükten büyüğe. */
export function factor(n: number): [number, number][] {
  const out: [number, number][] = [];
  let m = n;
  for (let p = 2; p * p <= m; p++) {
    let e = 0;
    while (m % p === 0) {
      m /= p;
      e++;
    }
    if (e) out.push([p, e]);
  }
  if (m > 1) out.push([m, 1]);
  return out;
}

export const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1));
export const choose = (n: number, r: number) => (r < 0 || r > n ? 0 : Math.round(fact(n) / (fact(r) * fact(n - r))));
export const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
export const lcm = (a: number, b: number) => Math.abs(a * b) / gcd(a, b);
/** p’nin n içindeki kopya sayısı. */
export const vp = (n: number, p: number) => {
  let e = 0;
  let m = n;
  while (m > 0 && m % p === 0) {
    m /= p;
    e++;
  }
  return e;
};

/** Türkçe binlik ayırıcıyla tam sayı: 5.040; eksi işareti gerçek eksi. */
export const tn = (n: number) => n.toLocaleString("tr-TR").replace("-", "−");

/** Sadeleştirilmiş kesir yazımı: frac(6, 8) = "3/4", frac(4, 2) = "2". */
export function frac(p: number, q: number) {
  if (q < 0) {
    p = -p;
    q = -q;
  }
  const g = gcd(p, q) || 1;
  const a = p / g;
  const b = q / g;
  const s = b === 1 ? String(a) : `${Math.abs(a)}/${b}`;
  return (a < 0 && b !== 1 ? "−" + s : s).replace("-", "−");
}

const SUB: Record<string, string> = { "0": "₀", "1": "₁", "2": "₂", "3": "₃", "4": "₄", "5": "₅", "6": "₆", "7": "₇", "8": "₈", "9": "₉" };
/** Alt simge yazımı: subs(2) = "₂". */
export const subs = (n: number) => String(n).split("").map((c) => SUB[c] ?? c).join("");
