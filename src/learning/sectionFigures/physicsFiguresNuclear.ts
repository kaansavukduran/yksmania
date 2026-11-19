import { ball, fmt, poly, seg, txt, v, vec, type El, type FigureDef } from "./figureKit";

/*
 * Radioactivity. Half-life: N = N₀(1/2)^(t/T) for a large ensemble; at each
 * half-life the CURRENT amount halves (160 → 80 → 40), so decay is not linear.
 * Decay chain on the A–Z plane: α moves (A−4, Z−2), β⁻ (A, Z+1), β⁺ (A, Z−1),
 * γ does not move the point. Numbers follow the MEB/MEBİ worked example
 * (238, 92) with two α and three β⁻ → (230, 91).
 */

const N0 = 160;
const halfLife: FigureDef = {
  caption:
    "Sürgüyle geçen süreyi yarı ömür cinsinden seç (k = t/T). Her yarı ömürde o anda kalanın yarısı bozunur: 160 → 80 → 40 → 20. Eğri büyük topluluğun beklentisidir; tek bir çekirdeğin tam ne zaman bozunacağını söylemez.",
  alt: "Yatay eksende t/T (0–5), düşey eksende bozunmamış çekirdek sayısı N (0–160); üstel azalan eğri, tam yarı ömür noktaları ve seçilen anda kalan ile bozunan çubukları.",
  param: { label: "k = t/T", min: 0, max: 5, step: 0.5, init: 2, unit: "" },
  draw: (k) => {
    const X = (t: number) => t * 1.6;
    const Y = (n: number) => n / 40;
    const els: El[] = [];
    els.push(seg(v(0, 0), v(X(5) + 0.3, 0), { tone: "muted" }), seg(v(0, 0), v(0, Y(170)), { tone: "muted" }));
    for (let t = 0; t <= 5; t++) els.push(txt(v(X(t), 0), String(t), "s", { small: true, tone: "muted" }));
    for (const n of [40, 80, 160]) els.push(txt(v(-0.15, Y(n)), String(n), "w", { small: true, tone: "muted" }));
    els.push(txt(v(X(5) + 0.4, 0), "t/T", "e", { small: true, tone: "muted" }), txt(v(0, Y(170)), "N", "n", { small: true, tone: "muted" }));
    const pts = Array.from({ length: 51 }, (_, i) => v(X(i / 10), Y(N0 * 0.5 ** (i / 10))));
    els.push(poly(pts, { tone: "c", open: true, smooth: true, bold: true }));
    for (let t = 1; t <= 4; t++) els.push(ball(v(X(t), Y(N0 / 2 ** t)), 0.07, "c"));
    const n = N0 * 0.5 ** k;
    const x = X(k);
    els.push(seg(v(x, 0), v(x, Y(n)), { tone: "a", bold: true }), seg(v(x, Y(n)), v(x, Y(N0)), { tone: "warn", dash: true }));
    els.push(ball(v(x, Y(n)), 0.1, "a"));
    // Bars on the right: kalan vs bozunan.
    const bx = X(5) + 1.6;
    els.push(poly([v(bx, 0), v(bx + 0.6, 0), v(bx + 0.6, Y(n)), v(bx, Y(n))], { tone: "a", fill: "a", thin: true }));
    els.push(poly([v(bx, Y(n)), v(bx + 0.6, Y(n)), v(bx + 0.6, Y(N0)), v(bx, Y(N0))], { tone: "warn", thin: true }));
    els.push(txt(v(bx + 0.75, Y(n) / 2), "kalan", "e", { small: true, tone: "a" }), txt(v(bx + 0.75, (Y(n) + Y(N0)) / 2), "bozunan", "e", { small: true, tone: "warn" }));
    els.push(txt(v(-1.2, Y(185)), " ", "c"), txt(v(bx + 2.6, -0.8), " ", "c"));
    return {
      els,
      readout: [`N = 160 · (1/2)^${fmt(k, 1)} = ${fmt(n, 1)} · bozunan = ${fmt(N0 - n, 1)}`, "Aynı izotopta etkinlik (Bq) de N ile aynı oranda azalır; sayımda önce arka planı çıkar."],
    };
  },
};

type St = { A: number; Z: number; via: string };
const CHAIN: St[] = [
  { A: 238, Z: 92, via: "başlangıç" },
  { A: 234, Z: 90, via: "α: A − 4, Z − 2" },
  { A: 230, Z: 88, via: "α: A − 4, Z − 2" },
  { A: 230, Z: 89, via: "β⁻: A aynı, Z + 1" },
  { A: 230, Z: 90, via: "β⁻: A aynı, Z + 1" },
  { A: 230, Z: 91, via: "β⁻: A aynı, Z + 1" },
];
const chain: FigureDef = {
  caption:
    "A–Z düzleminde zincir: α noktayı 4 aşağı, 2 sola (A − 4, Z − 2), β⁻ 1 sağa (Z + 1) taşır; β⁺ ve elektron yakalama 1 sola, γ hiç taşımaz. (238, 92) iki α ve üç β⁻ sonrası (230, 91), nötron sayısı 230 − 91 = 139. Ters çözümde önce A farkından α sayısını, sonra Z farkından β sayısını bul.",
  alt: "Yatay eksen Z (87–93), düşey eksen A (228–239); (238, 92)'den başlayıp iki aşağı-sol α oku ve üç sağa β⁻ okuyla (230, 91)'e giden yol.",
  steps: CHAIN.map((_, i) => (i === 0 ? "Başlangıç" : `${i}. adım`)),
  draw: (_, step) => {
    const X = (z: number) => (z - 87) * 1.2;
    const Y = (a: number) => (a - 228) * 0.36;
    const els: El[] = [];
    els.push(seg(v(0, 0), v(X(93), 0), { tone: "muted" }), seg(v(0, 0), v(0, Y(239.5)), { tone: "muted" }));
    for (let z = 88; z <= 92; z++) els.push(txt(v(X(z), 0), String(z), "s", { small: true, tone: "muted" }));
    for (const a of [230, 234, 238]) els.push(txt(v(-0.15, Y(a)), String(a), "w", { small: true, tone: "muted" }));
    els.push(txt(v(X(93), 0), "Z", "e", { small: true, tone: "muted" }), txt(v(0, Y(239.5)), "A", "n", { small: true, tone: "muted" }));
    for (let i = 1; i <= step; i++) {
      const p = CHAIN[i - 1];
      const q = CHAIN[i];
      els.push(vec(v(X(p.Z), Y(p.A)), v(X(q.Z), Y(q.A)), { tone: q.A !== p.A ? "a" : "b", bold: i === step }));
    }
    CHAIN.slice(0, step + 1).forEach((s, i) => els.push(ball(v(X(s.Z), Y(s.A)), 0.1, i === step ? "warn" : "muted")));
    const cur = CHAIN[step];
    els.push(txt(v(X(cur.Z) + 0.2, Y(cur.A) + 0.15), `(${cur.A}, ${cur.Z})`, "ne", { small: true, bold: true, tone: "warn" }));
    els.push(txt(v(-1.2, Y(241)), " ", "c"), txt(v(X(93) + 1.6, -0.8), " ", "c"));
    return {
      els,
      readout: [`${cur.via} → (${cur.A}, ${cur.Z}), n = ${cur.A - cur.Z}`, "Denetim: 92 = 91 + 2·2 + 3·(−1). A ile Z'yi iki ayrı satırda dengele."],
    };
  },
};

export const physicsFiguresNuclear: Record<string, Record<string, FigureDef>> = {
  radyoaktivite: {
    "Yarı ömür topluluk davranışıdır": halfLife,
    "Bileşik bozunma zincirini ters çöz": chain,
  },
};
