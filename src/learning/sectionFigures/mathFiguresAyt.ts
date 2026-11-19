import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * AYT Matematik: limit, türev, belirli integral, logaritma. Every curve is
 * sampled from its formula; sliders move the actual x, h or n so the numbers in
 * the readout are the values of the drawn function. Axes use unit scale S.
 */

const fmt = (x: number, d = 3) => x.toLocaleString("tr-TR", { maximumFractionDigits: d });
const S = 1;
function axes(x0: number, x1: number, y0: number, y1: number, ticksX: number[] = [], ticksY: number[] = [], lx = "x", ly = "y"): El[] {
  const els: El[] = [vec(v(x0, 0), v(x1, 0), { tone: "ink" }), vec(v(0, y0), v(0, y1), { tone: "ink" })];
  for (const t of ticksX) els.push(seg(v(t, -0.08), v(t, 0.08), { tone: "ink" }), txt(v(t, -0.18), fmt(t), "s", { tone: "ink", small: true }));
  for (const t of ticksY) els.push(seg(v(-0.08, t), v(0.08, t), { tone: "ink" }), txt(v(-0.15, t), fmt(t), "w", { tone: "ink", small: true }));
  els.push(txt(v(x1 + 0.05, 0), lx, "e", { tone: "ink", small: true }), txt(v(0, y1 + 0.05), ly, "n", { tone: "ink", small: true }));
  return els;
}
function curve(f: (x: number) => number, a: number, b: number, n = 120): V[] {
  const ps: V[] = [];
  for (let i = 0; i <= n; i++) {
    const x = a + ((b - a) * i) / n;
    ps.push(v(x * S, f(x) * S));
  }
  return ps;
}
const plot = (f: (x: number) => number, a: number, b: number, tone: Tone = "b", bold = true): El => poly(curve(f, a, b), { tone, open: true, bold, thin: !bold, smooth: true });
const dot = (p: V, tone: Tone, hollow = false): El => (hollow ? circle(p, 0.1, { tone, bold: true }) : ball(p, 0.12, tone));

/* ---------- Limit 1: soldan ve sağdan ---------- */
// f(x) = x − 1 for x < 2, x + 1 for x ≥ 2 (jump at 2).
const left = (x: number) => x - 1;
const right = (x: number) => x + 1;
const sides: FigureDef = {
  caption:
    "Sürgüyle x'i 2'ye yaklaştır: negatif değerler soldan (x < 2), pozitif değerler sağdan (x > 2) yaklaşmadır. Sol dalda f(x) 1'e, sağ dalda 3'e yaklaşır. İki yan limit farklı olduğundan x = 2'de limit yoktur; f(2) = 3 dolu noktadan okunur.",
  alt: "İki doğru parçası: x < 2 için y = x − 1 ve 2'de içi boş nokta (2, 1); x ≥ 2 için y = x + 1 ve 2'de dolu nokta (2, 3). Sürgüyle hareket eden bir nokta ve x eksenine inen kesik çizgi.",
  param: { label: "x − 2 farkı", min: -1, max: 1, step: 0.05, init: -0.5 },
  draw: (d) => {
    const x = 2 + d;
    const els: El[] = [...axes(-0.3, 4.4, -0.4, 5, [1, 2, 3, 4], [1, 2, 3, 4])];
    els.push(plot(left, 0, 2), plot(right, 2, 4));
    els.push(dot(v(2, 1), "b", true), dot(v(2, 3), "b"));
    if (Math.abs(d) > 1e-9) {
      const y = d < 0 ? left(x) : right(x);
      els.push(seg(v(x, 0), v(x, y), { tone: "warn", dash: true, thin: true }), seg(v(0, y), v(x, y), { tone: "warn", dash: true, thin: true }), dot(v(x, y), "warn"));
    }
    els.push(seg(v(2, 0), v(2, 4.8), { tone: "muted", dash: true, thin: true }));
    els.push(txt(v(-0.8, 5.4), " ", "c"), txt(v(4.8, -0.7), " ", "c"));
    const y = d < 0 ? left(x) : d > 0 ? right(x) : 3;
    return {
      els,
      readout: [
        d === 0 ? "x = 2: f(2) = 3 (dolu nokta). Limit sorusu bu değere bakmaz." : `x = ${fmt(x, 2)} (${d < 0 ? "soldan" : "sağdan"}): f(x) = ${fmt(y, 2)}`,
        "lim (x→2⁻) f(x) = 1 · lim (x→2⁺) f(x) = 3 · yan limitler farklı → x = 2'de limit yok.",
      ],
    };
  },
};

/* ---------- Limit 2: delik ---------- */
const hole: FigureDef = {
  caption:
    "Sürgüyle x'i 2'ye yaklaştır. f(x) = (x² − 4)/(x − 2) ifadesi x ≠ 2 için x + 2'ye sadeleşir; grafik y = x + 2 doğrusudur ama x = 2'de tanımsızdır (delik). Limit 4'tür, f(2) yoktur: sadeleştirirken x ≠ 2 koşulunu sakla.",
  alt: "y = x + 2 doğrusu, (2, 4) noktasında içi boş bir delik; sürgüyle doğru üzerinde hareket eden nokta ve değer tablosu.",
  param: { label: "x", min: 1, max: 3, step: 0.05, init: 1.5 },
  draw: (x) => {
    const els: El[] = [...axes(-0.3, 4.4, -0.4, 6.2, [1, 2, 3, 4], [2, 4, 6])];
    els.push(plot((t) => t + 2, 0, 4), dot(v(2, 4), "b", true));
    const isHole = Math.abs(x - 2) < 1e-9;
    if (!isHole) els.push(seg(v(x, 0), v(x, x + 2), { tone: "warn", dash: true, thin: true }), dot(v(x, x + 2), "warn"));
    els.push(txt(v(2.15, 3.85), "delik (2, 4)", "e", { tone: "b", small: true, bold: true }));
    els.push(txt(v(-0.8, 6.6), " ", "c"), txt(v(4.8, -0.7), " ", "c"));
    return {
      els,
      readout: [
        isHole ? "x = 2: payda 0, ifade 0/0 biçiminde tanımsız. Ama lim (x→2) f(x) = 2 + 2 = 4." : `x = ${fmt(x, 2)}: f(x) = (${fmt(x * x, 3)} − 4)/(${fmt(x - 2, 2)}) = ${fmt(x + 2, 2)}`,
        "Çarpanlara ayır: (x − 2)(x + 2)/(x − 2) = x + 2, yalnız x ≠ 2 için. Limit değeri ile fonksiyon değeri ayrı sorulardır.",
      ],
    };
  },
};

/* ---------- Türev: kesenden teğete ---------- */
const fx = (x: number) => 0.5 * x * x;
const secant: FigureDef = {
  caption:
    "Sürgüyle h'yi küçült. f(x) = x²/2 eğrisinde x = 1 ile 1 + h arasındaki kesenin eğimi (ortalama değişim) h → 0 iken teğetin eğimine, f′(1) = 1'e yaklaşır. Türev, çok küçük aralıktaki değişim hızıdır.",
  alt: "Parabol y = x²/2, üzerinde A(1, 1/2) ve B(1 + h, f(1 + h)) noktaları; ikisinden geçen kesen doğrusu; h küçüldükçe kesen kesik çizgili teğete yaklaşıyor.",
  param: { label: "h", min: 0.05, max: 2, step: 0.05, init: 1.5 },
  draw: (h) => {
    const els: El[] = [...axes(-0.6, 3.6, -0.4, 4.4, [1, 2, 3], [1, 2, 3, 4])];
    els.push(plot(fx, -0.5, 2.9));
    const A = v(1, fx(1));
    const B = v(1 + h, fx(1 + h));
    const m = (B[1] - A[1]) / h;
    const line = (slope: number, tone: Tone, dash: boolean) => seg(v(-0.4, A[1] + slope * (-0.4 - 1)), v(3.4, A[1] + slope * (3.4 - 1)), { tone, dash, thin: dash, bold: !dash });
    els.push(line(1, "c", true), line(m, "warn", false));
    els.push(seg(A, v(B[0], A[1]), { tone: "muted", thin: true }), seg(v(B[0], A[1]), B, { tone: "muted", thin: true }));
    els.push(txt(v((A[0] + B[0]) / 2, A[1] - 0.15), "h", "s", { tone: "muted", small: true }), txt(v(B[0] + 0.1, (A[1] + B[1]) / 2), "Δy", "e", { tone: "muted", small: true }));
    els.push(dot(A, "ink"), dot(B, "warn"), txt(v(A[0] - 0.1, A[1] + 0.15), "A", "nw", { tone: "ink", small: true, bold: true }), txt(v(B[0] - 0.1, B[1] + 0.1), "B", "nw", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(-1, 4.8), " ", "c"), txt(v(4, -0.7), " ", "c"));
    return {
      els,
      readout: [`h = ${fmt(h, 2)}: kesen eğimi = [f(1 + h) − f(1)] / h = ${fmt(m, 3)} = 1 + h/2`, "h → 0 iken kesen eğimi 1'e yaklaşır: f′(1) = 1 (kesik çizgi teğet). f′(x) = x, türev de bir fonksiyondur."],
    };
  },
};

/* ---------- Belirli integral: Riemann ---------- */
const g = (x: number) => x * x - 1;
const riemann: FigureDef = {
  caption:
    "Sürgüyle dikdörtgen sayısını artır. f(x) = x² − 1 için [0, 2] aralığında eksenin üstündeki alan (+, yeşil) ve altındaki alan (−, kırmızı) toplanır: net birikim ∫₀² (x² − 1) dx = 8/3 − 2 = 2/3. Dikdörtgen sayısı arttıkça toplam bu değere yaklaşır.",
  alt: "Parabol y = x² − 1, [0, 1] arasında eksenin altında, [1, 2] arasında üstünde. Orta noktalı dikdörtgenler; eksenin altındakiler kırmızı, üstündekiler yeşil.",
  param: { label: "Dikdörtgen sayısı n", min: 2, max: 40, step: 2, init: 4 },
  draw: (n) => {
    const els: El[] = [...axes(-0.3, 2.6, -1.3, 3.4, [1, 2], [-1, 1, 2, 3])];
    const w = 2 / n;
    let sum = 0;
    for (let i = 0; i < n; i++) {
      const x0 = i * w;
      const xm = x0 + w / 2;
      const y = g(xm);
      sum += y * w;
      const tone: Tone = y >= 0 ? "c" : "warn";
      els.push(poly([v(x0, 0), v(x0 + w, 0), v(x0 + w, y), v(x0, y)], { tone, fill: tone, thin: true }));
    }
    els.push(plot(g, -0.1, 2.15));
    els.push(txt(v(-0.7, 3.8), " ", "c"), txt(v(3, -1.6), " ", "c"));
    return {
      els,
      readout: [`n = ${n}: orta nokta toplamı ≈ ${fmt(sum, 4)} · gerçek değer 2/3 ≈ 0,6667`, "Eksenin altındaki parça integrale negatif katkı verir. “Alan” sorulursa |f| alınır: 2/3 + 2·(2/3) = 2."],
    };
  },
};

/* ---------- Hız: yer değiştirme ve yol ---------- */
const vt = (t: number) => 3 - t;
const motion: FigureDef = {
  caption:
    "Sürgüyle süreyi uzat. v(t) = 3 − t hızıyla hareket: t = 3'e kadar hız pozitif (ileri), sonra negatif (geri). Yer değiştirme = ∫ v dt (işaretli alan), alınan yol = ∫ |v| dt (iki alanın büyüklükleri toplamı). 5 saniyede yer değiştirme 2,5, yol 6,5 birimdir.",
  alt: "Hız–zaman grafiği: 3'ten başlayıp t = 3'te sıfırı kesen ve 5'te −2'ye inen doğru; eksen üstündeki üçgen yeşil, altındaki üçgen kırmızı; sürgüyle sağ sınır kayıyor.",
  param: { label: "Süre T", min: 0.5, max: 5, step: 0.5, init: 5, unit: "s" },
  draw: (T) => {
    const els: El[] = [...axes(-0.3, 5.6, -2.6, 3.6, [1, 2, 3, 4, 5], [-2, -1, 1, 2, 3], "t (s)", "v")];
    const up = Math.min(T, 3);
    els.push(poly([v(0, 0), v(0, 3), v(up, vt(up)), v(up, 0)], { tone: "c", fill: "c", thin: true }));
    if (T > 3) els.push(poly([v(3, 0), v(T, vt(T)), v(T, 0)], { tone: "warn", fill: "warn", thin: true }));
    els.push(plot(vt, 0, 5.2), seg(v(T, -2.4), v(T, 3.2), { tone: "ink", dash: true, thin: true }));
    els.push(txt(v(-0.7, 4), " ", "c"), txt(v(6.3, -2.9), " ", "c"));
    const pos = 3 * up - (up * up) / 2;
    const neg = T > 3 ? ((T - 3) * (T - 3)) / 2 : 0;
    return {
      els,
      readout: [
        `0–${fmt(T, 1)} s: yer değiştirme = ${fmt(pos - neg, 2)} · alınan yol = ${fmt(pos + neg, 2)}`,
        T > 3 ? "Hız işaret değiştirdi: yol için t = 3'te böl ve iki parçanın büyüklüklerini topla." : "Hız hep pozitif: yer değiştirme ile yol eşit.",
      ],
    };
  },
};

/* ---------- Logaritma: y = x aynası ---------- */
const mirror: FigureDef = {
  caption:
    "Sürgüyle üstel eğri üzerindeki noktayı kaydır. y = 2ˣ ile y = log₂x birbirinin tersidir: (a, 2ᵃ) noktasının aynası (2ᵃ, a)'dır; iki grafik y = x doğrusuna göre simetriktir. log₂x yalnız x > 0'da tanımlı, (1, 0)'dan geçer.",
  alt: "Kesik y = x doğrusu, mavi y = 2ˣ ve yeşil y = log₂x eğrileri; sürgüye göre üstel eğri üzerinde bir nokta ve onun y = x'e göre yansıması, aralarında y = x'e dik kesik bir doğru.",
  param: { label: "a", min: -2, max: 2, step: 0.25, init: 1 },
  draw: (a) => {
    const els: El[] = [...axes(-2.4, 4.6, -2.4, 4.6, [1, 2, 4], [1, 2, 4])];
    els.push(seg(v(-2.2, -2.2), v(4.4, 4.4), { tone: "muted", dash: true, thin: true }), txt(v(4.4, 4.5), "y = x", "n", { tone: "muted", small: true }));
    els.push(plot((x) => Math.pow(2, x), -2.3, 2.15, "b"), plot((x) => Math.log2(x), 0.2, 4.4, "c"));
    const P = v(a, Math.pow(2, a));
    const Q = v(Math.pow(2, a), a);
    els.push(seg(P, Q, { tone: "warn", dash: true, thin: true }), dot(P, "b"), dot(Q, "c"));
    els.push(txt(v(-1.4, 1.7), "y = 2ˣ", "c", { tone: "b", small: true, bold: true }), txt(v(3.0, 1.3), "y = log₂x", "e", { tone: "c", small: true, bold: true }));
    els.push(txt(v(-2.8, 5), " ", "c"), txt(v(5.2, -2.8), " ", "c"));
    return {
      els,
      readout: [`(${fmt(a, 2)}, ${fmt(Math.pow(2, a), 3)}) ↔ (${fmt(Math.pow(2, a), 3)}, ${fmt(a, 2)}): log₂(${fmt(Math.pow(2, a), 3)}) = ${fmt(a, 2)}`, "Tersini almak x ile y'yi yer değiştirmektir. 2ˣ her zaman pozitif olduğu için log₂x'in tanım kümesi x > 0'dır."],
    };
  },
};

export const mathFiguresAyt: Record<string, Record<string, FigureDef>> = {
  "ayt-limit-sureklilik": {
    "Soldan ve sağdan yaklaşımı sırala": sides,
    "Ortak çarpanı silerken deliği koru": hole,
  },
  "ayt-turev-alma-kurallari": {
    "Türev küçük aralıktaki değişimi ölçer": secant,
  },
  "ayt-belirli-integral": {
    "Belirli integral bir aralıktaki net birikimdir": riemann,
    "Hızdan yer değiştirme ile yolu ayır": motion,
  },
  "ayt-logaritma": {
    "Grafik tersliğin koordinat değişimidir": mirror,
  },
};
