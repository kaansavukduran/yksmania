import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * AYT Matematik (3): antiderivative families and the initial condition, area
 * between two curves with a moving strip, left/middle/right Riemann sums,
 * tangents from an outside point, and linear approximation. Curves are sampled
 * from their formulas; readouts are computed from the same functions.
 */

const fmt = (x: number, d = 3) => x.toLocaleString("tr-TR", { maximumFractionDigits: d });
function axes(x0: number, x1: number, y0: number, y1: number, tx: number[] = [], ty: number[] = []): El[] {
  const els: El[] = [vec(v(x0, 0), v(x1, 0), { tone: "ink" }), vec(v(0, y0), v(0, y1), { tone: "ink" }), txt(v(x1 + 0.05, 0), "x", "e", { tone: "ink", small: true }), txt(v(0, y1 + 0.05), "y", "n", { tone: "ink", small: true })];
  for (const t of tx) els.push(seg(v(t, -0.07), v(t, 0.07), { tone: "ink" }), txt(v(t, -0.17), fmt(t), "s", { tone: "ink", small: true }));
  for (const t of ty) els.push(seg(v(-0.07, t), v(0.07, t), { tone: "ink" }), txt(v(-0.14, t), fmt(t), "w", { tone: "ink", small: true }));
  return els;
}
const curve = (f: (x: number) => number, a: number, b: number, n = 120): V[] => Array.from({ length: n + 1 }, (_, i) => v(a + ((b - a) * i) / n, f(a + ((b - a) * i) / n)));
const plot = (f: (x: number) => number, a: number, b: number, tone: Tone = "b", bold = true): El => poly(curve(f, a, b), { tone, open: true, bold, thin: !bold, smooth: true });

/* ---------- Belirsiz integral: aile ---------- */
const family: FigureDef = {
  caption:
    "Sürgüyle C'yi değiştir. ∫ 2x dx = x² + C: türevi 2x olan bir eğri değil, birbirinin dikey ötelemesi olan bir ailedir. Aynı x'te bütün eğrilerin eğimi aynıdır (x = 1'de hepsinin teğeti paralel). F(1) = 3 başlangıç koşulu aileden tek eğriyi seçer: C = 2.",
  alt: "Beş soluk parabol y = x² + C ve sürgüyle seçilen kalın parabol; x = 1'de her parabol üzerinde kısa paralel teğet parçaları; (1, 3) noktası işaretli.",
  param: { label: "C", min: -2, max: 3, step: 0.5, init: 0 },
  draw: (C) => {
    const els: El[] = [...axes(-2.4, 2.6, -2.4, 6.4, [-1, 1, 2], [2, 4, 6])];
    for (const c of [-2, -1, 0, 1, 2, 3]) {
      if (Math.abs(c - C) < 1e-9) continue;
      els.push(plot((x) => x * x + c, -2.0, 2.0, "muted", false));
      els.push(seg(v(0.6, 1 + c - 0.8), v(1.4, 1 + c + 0.8), { tone: "muted", thin: true }));
    }
    els.push(plot((x) => x * x + C, -2.0, 2.0, C === 2 ? "c" : "b"), seg(v(0.6, 1 + C - 0.8), v(1.4, 1 + C + 0.8), { tone: "warn", bold: true }));
    els.push(ball(v(1, 3), 0.1, "c"), txt(v(1.15, 3), "F(1) = 3", "e", { tone: "c", small: true, bold: true }));
    els.push(txt(v(-2.8, 6.8), " ", "c"), txt(v(3.2, -2.7), " ", "c"));
    return {
      els,
      readout: [
        `F(x) = x² ${C >= 0 ? "+" : "−"} ${fmt(Math.abs(C), 1)} · F′(x) = 2x (C türevde kaybolur) · x = 1'de eğim 2`,
        C === 2 ? "F(1) = 1 + 2 = 3: başlangıç koşulunu sağlayan eğri bu." : `F(1) = ${fmt(1 + C, 1)} ≠ 3. Koşul: 1 + C = 3 → C = 2.`,
      ],
    };
  },
};

/* ---------- İki eğri arasındaki alan ---------- */
const between: FigureDef = {
  caption:
    "Sürgüyle dikey şeridi kaydır. y = x ile y = x² arasındaki bölgede her şeridin yüksekliği üst − alt = x − x²'dir. Eğriler x = 0 ve x = 1'de kesişir: alan ∫₀¹ (x − x²) dx = 1/2 − 1/3 = 1/6.",
  alt: "y = x doğrusu ve y = x² parabolü, aralarında 0 ile 1 arası taralı bölge; sürgüyle hareket eden ince dikey şerit ve yüksekliğini gösteren çizgi.",
  param: { label: "Şeridin x'i", min: 0.05, max: 0.95, step: 0.05, init: 0.5 },
  draw: (x) => {
    const K = 3.2;
    const sc = (p: V): V => v(p[0] * K, p[1] * K);
    const els: El[] = [vec(v(-0.2, 0), v(4, 0), { tone: "ink" }), vec(v(0, -0.2), v(0, 4), { tone: "ink" })];
    const top = curve((t) => t, 0, 1).map(sc);
    const bot = curve((t) => t * t, 0, 1).map(sc).reverse();
    els.push(poly([...top, ...bot], { tone: "c", fill: "c", thin: true }));
    els.push(poly(curve((t) => t, 0, 1.2).map(sc), { tone: "b", open: true, bold: true }), poly(curve((t) => t * t, 0, 1.15).map(sc), { tone: "warn", open: true, bold: true, smooth: true }));
    const w = 0.04;
    els.push(poly([sc(v(x - w, x * x)), sc(v(x + w, x * x)), sc(v(x + w, x)), sc(v(x - w, x))], { tone: "ink", fill: "ink" }));
    els.push(txt(sc(v(1.1, 1.17)), "y = x", "e", { tone: "b", small: true, bold: true }), txt(sc(v(1.1, 1.0)), "y = x²", "e", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(K, -0.15), "1", "s", { tone: "ink", small: true }), txt(v(-0.6, 4.4), " ", "c"), txt(v(5.4, -0.5), " ", "c"));
    return {
      els,
      readout: [`x = ${fmt(x, 2)}: şerit yüksekliği = ${fmt(x, 2)} − ${fmt(x * x, 4)} = ${fmt(x - x * x, 4)}`, "Alan = ∫₀¹ (üst − alt) dx = 1/6 ≈ 0,1667. Sınırlar eğrilerin kesişiminden gelir: x = x² → x = 0, 1."],
    };
  },
};

/* ---------- Sol, orta, sağ ---------- */
const f2 = (x: number) => 0.5 * x * x;
const lmr: FigureDef = {
  caption:
    "İleri ile aynı dört şeritte yüksekliği soldan, ortadan ve sağdan seç. f(x) = x²/2 artan olduğu için sol toplam alttan, sağ toplam üstten yaklaşır; orta nokta gerçek değere (∫₀² x²/2 dx = 4/3) en yakın olandır.",
  alt: "y = x²/2 eğrisi ve [0, 2] aralığında dört dikdörtgen; adımlara göre dikdörtgen yükseklikleri şeridin sol ucundan, ortasından ya da sağ ucundan alınıyor.",
  steps: ["Sol uç", "Orta nokta", "Sağ uç"],
  draw: (_v, step) => {
    const K = 1.6;
    const els: El[] = [vec(v(-0.2, 0), v(2.3 * K, 0), { tone: "ink" }), vec(v(0, -0.2), v(0, 2.3 * K), { tone: "ink" })];
    const n = 4;
    const w = 2 / n;
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const x0 = i * w;
      const xs = x0 + [0, 0.5, 1][step] * w;
      const h = f2(xs);
      sum += h * w;
      els.push(poly([v(x0 * K, 0), v((x0 + w) * K, 0), v((x0 + w) * K, h * K), v(x0 * K, h * K)], { tone: ["b", "c", "warn"][step] as Tone, fill: ["b", "c", "warn"][step] as Tone, thin: true }));
      els.push(ball(v(xs * K, h * K), 0.07, "ink"));
    }
    els.push(poly(curve(f2, 0, 2.15).map((p) => v(p[0] * K, p[1] * K)), { tone: "ink", open: true, bold: true, smooth: true }));
    for (const t of [1, 2]) els.push(txt(v(t * K, -0.15), String(t), "s", { tone: "ink", small: true }));
    els.push(txt(v(-0.5, 4), " ", "c"), txt(v(4.4, -0.5), " ", "c"));
    const names = ["sol uç", "orta nokta", "sağ uç"];
    return {
      els,
      readout: [`${names[step]} toplamı = ${fmt(sum, 4)} · gerçek değer 4/3 ≈ 1,3333`, step === 0 ? "Artan fonksiyonda sol uç toplamı alt toplamdır (eksik tahmin)." : step === 2 ? "Artan fonksiyonda sağ uç toplamı üst toplamdır (fazla tahmin)." : "Orta nokta, bu eğride hatayı en çok küçülten seçimdir."],
    };
  },
};

/* ---------- Dış noktadan teğet ---------- */
const outside: FigureDef = {
  caption:
    "İleri ile (0, −1) noktasından y = x² parabolüne teğet çiz. Değme noktası (a, a²) bilinmiyor: teğet y − a² = 2a(x − a) bu noktadan geçmeli → −1 − a² = −2a² → a² = 1 → a = ±1. İki teğet: y = 2x − 1 ve y = −2x − 1.",
  alt: "Parabol y = x², eğrinin altındaki (0, −1) noktası; buradan çıkan ve parabole (1, 1) ile (−1, 1) noktalarında değen iki teğet doğru.",
  steps: ["Nokta eğri üzerinde değil", "Bilinmeyen değme noktası", "İki teğet"],
  draw: (_v, step) => {
    const els: El[] = [...axes(-2.4, 2.6, -1.8, 4.4, [-1, 1, 2], [1, 2, 3, 4])];
    els.push(plot((x) => x * x, -2.0, 2.0));
    els.push(ball(v(0, -1), 0.1, "warn"), txt(v(0.15, -1.1), "(0, −1)", "e", { tone: "warn", small: true, bold: true }));
    if (step === 1) {
      const a = 1.4;
      els.push(ball(v(a, a * a), 0.09, "c"), txt(v(a + 0.12, a * a), "(a, a²)?", "e", { tone: "c", small: true, bold: true }), seg(v(a - 1.5, a * a - 2 * a * 1.5), v(a + 0.6, a * a + 2 * a * 0.6), { tone: "c", dash: true, thin: true }));
    }
    if (step === 2) {
      for (const s of [1, -1]) {
        els.push(seg(v(-s * 0.4, -1 - 0.8), v(s * 2.2, -1 + s * 2 * s * 2.2), { tone: "c", bold: true }), ball(v(s, 1), 0.1, "c"));
      }
      els.push(txt(v(1.15, 0.9), "y = 2x − 1", "e", { tone: "c", small: true, bold: true }), txt(v(-1.15, 0.9), "y = −2x − 1", "w", { tone: "c", small: true, bold: true }));
    }
    els.push(txt(v(-2.8, 4.8), " ", "c"), txt(v(3.2, -2.1), " ", "c"));
    const rows: [string, string][] = [
      ["(0, −1) eğrinin üzerinde değil: 0² ≠ −1. Teğetin eğimi bu noktada hesaplanamaz.", "Eğri dışındaki noktadan teğet sorularında önce değme noktasını bilinmeyen yap."],
      ["Değme noktası (a, a²), eğim f′(a) = 2a: teğet y = 2a(x − a) + a².", "Bu doğru (0, −1)'den geçmeli: −1 = −2a² + a²."],
      ["a² = 1 → a = 1 ya da −1: iki teğet y = 2x − 1 ve y = −2x − 1.", "Kontrol: x = 1'de 2·1 − 1 = 1 = 1² ✓; teğet eğriyi başka yerde kesebilir, bu ayrı bir sorudur."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- Doğrusal yaklaşım ---------- */
const linear: FigureDef = {
  caption:
    "Sürgüyle x'i 4'ten uzaklaştır. √x eğrisinin x = 4'teki teğeti L(x) = 2 + (x − 4)/4'tür. Yakında teğet eğriye çok yakındır (√4,4 ≈ L(4,4) = 2,1); uzaklaştıkça hata büyür. Teğet, yerel doğrusal tahmindir.",
  alt: "y = √x eğrisi ve x = 4'teki teğet doğrusu; sürgüyle seçilen x'te eğri ve teğet üzerindeki iki nokta ve aralarındaki dikey fark.",
  param: { label: "x", min: 0.5, max: 9, step: 0.1, init: 4.4 },
  draw: (x) => {
    const sx = 0.55;
    const sy = 1.2;
    const P = (a: number, b: number): V => v(a * sx, b * sy);
    const els: El[] = [vec(v(-0.2, 0), v(9.8 * sx, 0), { tone: "ink" }), vec(v(0, -0.2), v(0, 3.8 * sy), { tone: "ink" })];
    els.push(poly(curve(Math.sqrt, 0, 9.5).map((p) => P(p[0], p[1])), { tone: "b", open: true, bold: true, smooth: true }));
    const Lf = (t: number) => 2 + (t - 4) / 4;
    els.push(seg(P(0, Lf(0)), P(9.5, Lf(9.5)), { tone: "c", dash: true }));
    els.push(ball(P(4, 2), 0.09, "ink"), txt(v(4 * sx, 2 * sy - 0.25), "(4, 2)", "s", { tone: "ink", small: true }));
    els.push(ball(P(x, Math.sqrt(x)), 0.09, "b"), ball(P(x, Lf(x)), 0.09, "c"), seg(P(x, Math.sqrt(x)), P(x, Lf(x)), { tone: "warn", bold: true }));
    for (const t of [1, 4, 9]) els.push(txt(v(t * sx, -0.15), String(t), "s", { tone: "ink", small: true }));
    els.push(txt(v(-0.4, 4.9), " ", "c"), txt(v(6, -0.5), " ", "c"));
    return {
      els,
      readout: [`x = ${fmt(x, 1)}: √x = ${fmt(Math.sqrt(x), 4)}, L(x) = ${fmt(Lf(x), 4)}, hata = ${fmt(Lf(x) - Math.sqrt(x), 4)}`, "f(a + h) ≈ f(a) + f′(a)·h; burada f′(4) = 1/(2√4) = 1/4. Teğet her zaman eğrinin üstünde kalıyor: √x içbükey."],
    };
  },
};

export const mathFiguresAyt3: Record<string, Record<string, FigureDef>> = {
  "ayt-belirsiz-integral": { "Tek bir eğri yerine bir aile bulunur": family },
  "ayt-alan-riemann": {
    "İki eğri arasında yükseklik farkı kullan": between,
    "Sol, sağ ve orta örnek farklı seçimlerdir": lmr,
  },
  "turev-teget": {
    "Eğrinin dışındaki noktadan teğet çiz": outside,
    "Yerel doğrusal tahmin ile kesin değeri karşılaştır": linear,
  },
};
