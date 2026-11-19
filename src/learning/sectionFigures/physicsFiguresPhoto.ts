import { ball, fmt, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * Photoelectric current–voltage. The horizontal position of the cut-off reads
 * Kmax (eVs = Kmax), the plateau height reads how many electrons are collected.
 * A, B: same metal and frequency, B twice the photon flux → same cut-off −1 V,
 * plateau 2 vs 4 μA. C: same flux, higher frequency → cut-off −2 V. Curves are
 * schematic between cut-off and plateau. The second figure follows the fastest
 * electron's energy from cathode to anode: K_anot = Kmax + eV (2026 AYT Fen 13:
 * electrons leave the metal but a retarding voltage can stop the current).
 */

type Curve = { name: string; cut: number; sat: number; tone: Tone; what: string };
const CURVES: Curve[] = [
  { name: "A", cut: -1, sat: 2, tone: "c", what: "Kesme −1 V → Kmax = 1 eV; plato 2 μA." },
  { name: "B", cut: -1, sat: 4, tone: "b", what: "A ile aynı kesme: aynı frekans, aynı Kmax. Plato iki kat: iki kat foton akısı (η sabit, tam toplama)." },
  { name: "C", cut: -2, sat: 2, tone: "warn", what: "Kesme daha solda (−2 V) → Kmax = 2 eV: daha yüksek frekans. Plato A ile aynı: η eşitse aynı foton akısı." },
];
const iv: FigureDef = {
  caption:
    "Kesmenin YATAY yeri Kmax'ı (eVs = Kmax), platonun YÜKSEKLİĞİ toplanan elektron sayısını gösterir. φ = 2 eV metalde A ve C'nin foton enerjileri 3 ve 4 eV. Bir eğrinin harfine tıkla. Daha yüksek plato, tek başına daha enerjili foton demek değildir.",
  alt: "Yatay eksen anot-katot gerilimi −3 V ile +2 V, düşey eksen akım μA; üç eğri: A ve B −1 V'ta kesilir, platoları 2 ve 4 μA; C −2 V'ta kesilir, platosu 2 μA.",
  picks: CURVES.map((c) => ({ label: `Eğri ${c.name}`, title: `Eğri ${c.name}`, detail: [c.what, `Vs = ${-c.cut} V, Kmax = ${-c.cut} eV; foton enerjisi = Kmax + φ = ${-c.cut + 2} eV (φ = 2 eV).`] })),
  draw: (_v, _s, pick = -1) => {
    const X = (V: number) => (V + 3) * 1.4;
    const Y = (I: number) => I * 0.8;
    const els: El[] = [];
    els.push(seg(v(X(-3), 0), v(X(2.2), 0), { tone: "muted" }), seg(v(X(0), 0), v(X(0), Y(4.6)), { tone: "muted" }));
    for (const V of [-3, -2, -1, 1, 2]) els.push(txt(v(X(V), 0), String(V).replace("-", "−"), "s", { small: true, tone: "muted" }));
    els.push(txt(v(X(2.2), 0), "V (V)", "e", { small: true, tone: "muted" }), txt(v(X(0), Y(4.6)), "I (μA)", "n", { small: true, tone: "muted" }));
    for (const I of [2, 4]) els.push(seg(v(X(-3), Y(I)), v(X(2), Y(I)), { tone: "muted", thin: true, dash: true }), txt(v(X(-3) - 0.12, Y(I)), `${I} μA`, "w", { small: true, tone: "muted" }));
    CURVES.forEach((c, i) => {
      const on = pick === i;
      const pts = Array.from({ length: 41 }, (_, k) => {
        const V = c.cut + (k / 40) * (2 - c.cut);
        const t = Math.min(1, (V - c.cut) / 1.6);
        return v(X(V), Y(c.sat * (1 - (1 - t) ** 2)));
      });
      els.push(poly([v(X(-3), 0), v(X(c.cut), 0), ...pts], { tone: on ? "a" : c.tone, open: true, bold: on || pick < 0 }));
      els.push(txt(v(X(2) + 0.15, Y(c.sat) + (c.name === "C" ? -0.35 : 0.1)), c.name, "e", { bold: true, tone: on ? "a" : c.tone, pick: i }));
    });
    els.push(txt(v(-1.6, Y(5)), " ", "c"), txt(v(X(2.2) + 1.6, -0.9), " ", "c"));
    const sel = pick >= 0 ? CURVES[pick] : undefined;
    return { els, readout: [sel ? `${sel.name}: ${sel.what}` : "Bir eğrinin harfine tıkla ya da aşağıdan seç.", "Doyum: I = e·η·Ṅ (foton akısı × verim). Kesme: Vs = Kmax/e."] };
  },
};

const KMAX = 1;
const retard: FigureDef = {
  caption:
    "Katotta en hızlı elektronun kinetik enerjisi Kmax = 1 eV. V = V(anot) − V(katot). Anotta K = Kmax + eV. Pozitif V hızlandırır; V = −1 V'ta en hızlı elektron da anoda ulaşamaz ve akım kesilir. Yine de ışık katottan elektron koparmaya devam eder (2026 AYT Fen 13 mantığı).",
  alt: "Solda katot, sağda anot; aralarında elektronun enerji çubuğu: katotta 1 eV, anotta 1 + V eV; gerilim sürgüsüyle anottaki çubuk uzar, kısalır ya da kesme durumunda kırmızı uyarıya döner.",
  param: { label: "V (anot − katot)", min: -1.6, max: 1, step: 0.2, init: -0.6, unit: " V" },
  draw: (V) => {
    const els: El[] = [];
    const ka = KMAX + V;
    els.push(poly([v(0, -0.2), v(0.3, -0.2), v(0.3, 3.2), v(0, 3.2)], { tone: "c", fill: "c", thin: true }), txt(v(0.15, 3.2), "katot", "n", { small: true, tone: "c" }));
    els.push(poly([v(6, -0.2), v(6.3, -0.2), v(6.3, 3.2), v(6, 3.2)], { tone: "b", fill: "b", thin: true }), txt(v(6.15, 3.2), "anot", "n", { small: true, tone: "b" }));
    const S = 1.6;
    els.push(poly([v(0.8, 0), v(1.6, 0), v(1.6, KMAX * S), v(0.8, KMAX * S)], { tone: "a", fill: "a", thin: true }), txt(v(1.2, KMAX * S), `${fmt(KMAX, 1)} eV`, "n", { small: true, tone: "a" }));
    if (ka >= 0) {
      els.push(poly([v(4.7, 0), v(5.5, 0), v(5.5, ka * S), v(4.7, ka * S)], { tone: "c", fill: "c", thin: true }), txt(v(5.1, ka * S), `${fmt(ka, 1)} eV`, "n", { small: true, tone: "c" }));
      els.push(vec(v(1.8, 0.4), v(4.5, 0.4), { tone: V >= 0 ? "c" : "warn" }));
    } else {
      els.push(vec(v(1.8, 0.4), v(3.3, 0.4), { tone: "warn" }), vec(v(3.3, 0.7), v(1.8, 0.7), { tone: "warn" }));
      els.push(txt(v(4.9, 0.5), "ulaşamaz", "c", { small: true, bold: true, tone: "warn" }));
    }
    els.push(ball(v(1.9, 0.4), 0.08, "b"));
    els.push(txt(v(-0.6, 4.0), " ", "c"), txt(v(6.9, -0.6), " ", "c"));
    return {
      els,
      readout: [ka >= 0 ? `Anotta K = 1 + (${fmt(V, 1)}) = ${fmt(ka, 1)} eV → akım var` : `1 + (${fmt(V, 1)}) < 0 → en hızlı elektron da geri döner, akım yok`, "Durdurma gerilimi büyüklüğü Vs = Kmax/e = 1 V; işaretli kesme noktası V = −1 V."],
    };
  },
};

export const physicsFiguresPhoto: Record<string, Record<string, FigureDef>> = {
  "fotoelektrik-olay": {
    "Akım-gerilim verisini yorumla": iv,
    "Yavaşlatma ve kesme": retard,
  },
};
