import { ang, circle, poly, pt, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { box, curve, nf, pad } from "./physicsFigures058Kit";

/*
 * AYT Matematik (Forge060) · Trigonometri, ikinci dereceden denklemler,
 * karmaşık sayılar ve eşitsizlikler. Grafikler rehber bölümlerindeki
 * örneklerden çizilir (2sin(3x − π) + 1, A = 30°, a = 5, b = 8, x² + 6x + 2,
 * √(x + 4) = x − 2, (1 + 2i)(3 − i), x² + 2x + 5, (x + 2)(x − 3) …); koordinat
 * ve işaret aynı fonksiyondan hesaplanır.
 */

const R = (d: number) => (d * Math.PI) / 180;

/** Koordinat ekseni: ölçek k, pencere [x0, x1] × [y0, y1]. */
function grid(k: number, x0: number, x1: number, y0: number, y1: number, xl = "x", yl = "y"): El[] {
  return [
    vec(v(x0 * k, 0), v(x1 * k, 0), { tone: "ink", thin: true }),
    vec(v(0, y0 * k), v(0, y1 * k), { tone: "ink", thin: true }),
    txt(v(x1 * k, 0), xl, "se", { tone: "ink", small: true }),
    txt(v(0, y1 * k), yl, "n", { tone: "ink", small: true }),
  ];
}

/** f grafiğini pencereye kırparak parçalar halinde çizer. */
function plot(f: (x: number) => number, x0: number, x1: number, k: number, ylo: number, yhi: number, tone: Tone, opts: { dash?: boolean; bold?: boolean; ky?: number } = {}): El[] {
  const ky = opts.ky ?? k;
  const out: El[] = [];
  let cur: V[] = [];
  const n = 160;
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n, y = f(x);
    if (Number.isFinite(y) && y >= ylo && y <= yhi) cur.push(v(x * k, y * ky));
    else {
      if (cur.length > 1) out.push(poly(cur, { open: true, tone, dash: opts.dash, bold: opts.bold ?? true }));
      cur = [];
    }
  }
  if (cur.length > 1) out.push(poly(cur, { open: true, tone, dash: opts.dash, bold: opts.bold ?? true }));
  return out;
}

/** İşaret satırı: y yüksekliğinde sayı doğrusu, kritik noktalar ve aralık işaretleri. */
function signRow(y: number, k: number, x0: number, x1: number, crit: { x: number; label: string; open?: boolean }[], signs: string[], fill?: [number, number][]): El[] {
  const els: El[] = [seg(v(x0 * k, y), v(x1 * k, y), { tone: "muted" })];
  if (fill) for (const [a, b] of fill) els.push(seg(v(Math.max(a, x0) * k, y), v(Math.min(b, x1) * k, y), { tone: "a", bold: true }));
  const xs = [x0, ...crit.map((c) => c.x), x1];
  signs.forEach((s, i) => els.push(txt(v(((xs[i] + xs[i + 1]) / 2) * k, y + 0.12), s, "n", { tone: s === "+" ? "a" : "warn", bold: true })));
  for (const c of crit) els.push(pt(v(c.x * k, y), c.label, "s", "ink", c.open));
  return els;
}

/* ===================== Trigonometri ===================== */

const unitCircle: FigureDef = {
  caption:
    "Birim çember x² + y² = 1. Açıyı değiştir: P = (cosθ, sinθ); yatay izdüşüm kosinüs, düşey izdüşüm sinüstür. Bölge işaretleri P’nin x ve y koordinatlarından okunur; cos²θ + sin²θ = 1 her açıda sağlanır.",
  alt: "Merkezi orijinde birim çember; pozitif x ekseninden θ açılı ışın, çember üzerindeki P noktası, P’den eksenlere inen kesikli izdüşümler ve iki eksen üzerindeki kosinüs ve sinüs parçaları.",
  param: { label: "θ", min: 0, max: 360, step: 15, init: 150, unit: "°", plain: true },
  draw: (th) => {
    const snap = (x: number) => (Math.abs(x) < 1e-9 ? 0 : x), k = 2.4, c = snap(Math.cos(R(th))), s = snap(Math.sin(R(th))), P = v(c * k, s * k);
    const els: El[] = [...grid(1, -3.5, 3.5, -3.0, 3.0), circle(v(0, 0), k, { tone: "muted" })];
    els.push(seg(v(0, 0), P, { tone: "ink" }), seg(P, v(P[0], 0), { tone: "muted", dash: true, thin: true }), seg(P, v(0, P[1]), { tone: "muted", dash: true, thin: true }));
    if (Math.abs(c) > 0.01) els.push(seg(v(0, 0), v(P[0], 0), { tone: "b", bold: true }), txt(v(P[0] / 2, s >= 0 ? -0.12 : 0.12), "cosθ", s >= 0 ? "s" : "n", { tone: "b", small: true, bold: true }));
    if (Math.abs(s) > 0.01) els.push(seg(v(0, 0), v(0, P[1]), { tone: "a", bold: true }), txt(v(c >= 0 ? -0.12 : 0.12, P[1] / 2), "sinθ", c >= 0 ? "w" : "e", { tone: "a", small: true, bold: true }));
    if (th > 0 && th < 360) els.push(ang(v(0, 0), v(1, 0), P, undefined, { tone: "muted", r: 22, reflex: th > 180 }));
    els.push(pt(P, `P(${nf(c, 2)}; ${nf(s, 2)})`, th % 180 === 0 ? (c > 0 ? "nw" : "ne") : s >= 0 ? (c >= 0 ? "ne" : "nw") : c >= 0 ? "se" : "sw", "ink"));
    els.push(...pad(-3.8, 3.3, 3.8, -3.3));
    const q = th % 90 === 0 ? "eksen üzerinde" : `${Math.floor(th / 90) + 1}. bölge`;
    return { els, readout: [`θ = ${th}° (${q}): cosθ = ${nf(c, 3)}, sinθ = ${nf(s, 3)}.`, `cos²θ + sin²θ = ${nf(c * c, 3)} + ${nf(s * s, 3)} = 1.`] };
  },
};

const WAVE_STEPS = ["sin x", "2 sin x", "2 sin 3x", "2 sin(3x − π)", "2 sin(3x − π) + 1"];
const waveParams: FigureDef = {
  caption:
    "y = 2sin(3x − π) + 1 adım adım (x radyan, [0; 2π]). Genlik |A| = 2, periyot 2π/3, faz kayması sağa π/3 (−c/b), orta çizgi y = 1 (kesikli). Önceki adım soluk kesikli çizilir. Görüntü kümesi [d − |A|; d + |A|] = [−1; 3].",
  alt: "Yatay eksende 0’dan 2π’ye x, düşey eksende y; her adımda dönüşen sinüs eğrisi, bir önceki eğri soluk kesikli ve orta çizgi kesikli yatay doğru.",
  steps: WAVE_STEPS,
  draw: (_, step) => {
    const fs = [(x: number) => Math.sin(x), (x: number) => 2 * Math.sin(x), (x: number) => 2 * Math.sin(3 * x), (x: number) => 2 * Math.sin(3 * x - Math.PI), (x: number) => 2 * Math.sin(3 * x - Math.PI) + 1];
    const kx = 1.15, ky = 0.8, X = (x: number) => x * kx, Y = (y: number) => y * ky;
    const els: El[] = [vec(v(0, 0), v(X(2 * Math.PI) + 0.4, 0), { tone: "ink", thin: true }), vec(v(0, Y(-2.6)), v(0, Y(3.6)), { tone: "ink", thin: true })];
    if (step > 0) els.push(poly(curve(fs[step - 1], 0, 2 * Math.PI, 160, X, Y), { open: true, tone: "muted", dash: true, thin: true }));
    els.push(poly(curve(fs[step], 0, 2 * Math.PI, 160, X, Y), { open: true, tone: "a", bold: true }));
    if (step === 4) els.push(seg(v(0, Y(1)), v(X(2 * Math.PI), Y(1)), { tone: "b", dash: true, thin: true }), txt(v(X(2 * Math.PI) + 0.1, Y(1)), "y = 1", "e", { tone: "b", small: true }));
    for (const [x, s] of [[Math.PI / 3, "π/3"], [Math.PI, "π"], [2 * Math.PI, "2π"]] as const) els.push(seg(v(X(x), -0.07), v(X(x), 0.07), { tone: "muted", thin: true }), txt(v(X(x), -0.12), s, "s", { tone: "muted", small: true, soft: true }));
    for (const y of [-2, 2, 3]) els.push(seg(v(-0.07, Y(y)), v(0.07, Y(y)), { tone: "muted", thin: true }), txt(v(-0.12, Y(y)), String(y).replace("-", "−"), "w", { tone: "muted", small: true, soft: true }));
    els.push(txt(v(X(2 * Math.PI) + 0.45, 0), "x", "e", { tone: "ink", small: true }));
    els.push(...pad(-0.8, Y(3.6) + 0.3, X(2 * Math.PI) + 1.6, Y(-2.6) - 0.4));
    const lines = [
      ["Temel eğri: genlik 1, periyot 2π.", "Görüntü [−1; 1]."],
      ["A = 2: düşey germe, genlik 2.", "Periyot değişmez: 2π."],
      ["b = 3: yatay sıkıştırma, periyot 2π/3.", "Bir turda 3 tam dalga."],
      ["3x − π = 3(x − π/3): sağa π/3 kayma.", "c = −π’nin işareti tek başına yön değildir; −c/b = π/3."],
      ["d = 1: orta çizgi y = 1.", "Görüntü [1 − 2; 1 + 2] = [−1; 3]."],
    ];
    return { els, readout: lines[step] };
  },
};

const tanBranches: FigureDef = {
  caption:
    "y = tan x, x derece; kesikli dikey doğrular x = ±90° kutuplarıdır. Açıyı değiştir: her (−90° + k·180°; 90° + k·180°) aralığında tanjant artar; kutbun iki yanı tek çizgiyle birleştirilmez ve kutupta değer yerine tanımsız yazılır. Grafik |y| ≤ 4 penceresinde kırpıldı.",
  alt: "Üç ayrı artan tanjant dalı; aralarında kesikli dikey asimptotlar; seçili açıda dal üzerindeki nokta.",
  param: { label: "x", min: -180, max: 180, step: 15, init: 60, unit: "°", plain: true },
  draw: (xd) => {
    const kx = 1 / 40, ky = 0.55;
    const els: El[] = [vec(v(-180 * kx - 0.3, 0), v(180 * kx + 0.4, 0), { tone: "ink", thin: true }), vec(v(0, -4 * ky - 0.2), v(0, 4 * ky + 0.3), { tone: "ink", thin: true })];
    for (const [a, b] of [[-180, -90], [-90, 90], [90, 180]]) {
      const ps: V[] = [];
      for (let i = 0; i <= 80; i++) {
        const x = a + ((b - a) * i) / 80, y = Math.tan(R(x));
        if (Math.abs(y) <= 4) ps.push(v(x * kx, y * ky));
      }
      els.push(poly(ps, { open: true, tone: "a", bold: true }));
    }
    for (const p of [-90, 90]) els.push(seg(v(p * kx, -4 * ky), v(p * kx, 4 * ky), { tone: "warn", dash: true, thin: true }), txt(v(p * kx, -4 * ky - 0.1), `${p}°`.replace("-", "−"), "s", { tone: "warn", small: true }));
    for (const x of [-180, 180]) els.push(txt(v(x * kx, -0.12), `${x}°`.replace("-", "−"), "s", { tone: "muted", small: true, soft: true }));
    const pole = Math.abs(Math.abs(xd) - 90) < 1e-9;
    const y = Math.tan(R(xd));
    if (!pole && Math.abs(y) <= 4) els.push(pt(v(xd * kx, y * ky), nf(y, 3), xd >= 0 ? "e" : "w", "a"));
    els.push(...pad(-5.0, 4 * ky + 0.6, 5.2, -4 * ky - 0.7));
    return { els, readout: [pole ? `x = ${xd}°: tan x tanımsız (cos x = 0).` : `tan ${xd}° = ${nf(y, 3)}.`, "Periyot 180°: tan(x + 180°) = tan x."] };
  },
};

const ambiguous: FigureDef = {
  caption:
    "A = 30° (dar), komşu kenar b = AC = 8, karşı kenar a = BC değişiyor. Yükseklik h = b·sinA = 4. a’yı değiştir: a < 4 üçgen yok; a = 4 tek dik üçgen; 4 < a < 8 iki üçgen (C merkezli a yarıçaplı çember tabanı iki noktada keser); a ≥ 8 tek üçgen. a = 5’te sinB = 4/5: B ≈ 53,13° veya 126,87°.",
  alt: "A köşesinden yatay taban ışını ve 30 derece açıyla C köşesine giden 8 birimlik kenar; C’den tabana inen kesikli yükseklik; C merkezli çember yayı ve tabanla kesişim noktaları B₁, B₂.",
  param: { label: "a = BC", min: 3, max: 9, step: 0.5, init: 5 },
  draw: (a) => {
    const k = 0.55, A = v(0, 0), C = v(8 * Math.cos(R(30)) * k, 8 * Math.sin(R(30)) * k), h = 4;
    const els: El[] = [seg(v(-1.2, 0), v(9.0, 0), { tone: "muted", thin: true }), seg(A, C, { tone: "ink", bold: true }), seg(C, v(C[0], 0), { tone: "muted", dash: true, thin: true })];
    els.push(txt(v(C[0] + 0.1, C[1] / 2), "h = 4", "e", { tone: "muted", small: true }));
    let arc: V[] = [];
    const flush = () => {
      if (arc.length > 1) els.push(poly(arc, { open: true, tone: "b", dash: true, thin: true }));
      arc = [];
    };
    for (let i = 0; i <= 90; i++) {
      const t = -180 + i * 2, q = v(C[0] + a * k * Math.cos(R(t)), C[1] + a * k * Math.sin(R(t)));
      if (q[1] >= -0.5 && q[1] <= C[1] - 0.6 && q[0] >= -1.2) arc.push(q);
      else flush();
    }
    flush();
    const Bs: number[] = [];
    if (a >= h - 1e-9) {
      const d = Math.sqrt(Math.max(0, a * a - h * h));
      for (const x of [8 * Math.cos(R(30)) - d, 8 * Math.cos(R(30)) + d]) if (x > 1e-6 && !Bs.some((b) => Math.abs(b - x) < 1e-6)) Bs.push(x);
    }
    Bs.forEach((x, i) => {
      const B = v(x * k, 0);
      els.push(seg(C, B, { tone: i === 0 ? "a" : "c", bold: true }), seg(A, B, { tone: i === 0 ? "a" : "c", thin: true }), pt(B, Bs.length > 1 ? `B${i === 0 ? "₁" : "₂"}` : "B", "s", i === 0 ? "a" : "c"));
    });
    els.push(pt(A, "A", "sw"), pt(C, "C", "n"), ang(A, v(1, 0), C, "30°", { tone: "muted", r: 30 }));
    els.push(txt(v(C[0] / 2 - 0.1, C[1] / 2 + 0.1), "b = 8", "nw", { tone: "ink", small: true }));
    els.push(...pad(-1.4, C[1] + 0.9, 9.0, -0.9));
    const sinB = (8 * 0.5) / a;
    const count = Bs.length;
    const lines = count === 0 ? [`a = ${nf(a, 1)} < h = 4: çember tabana ulaşmaz, üçgen yok.`] : sinB <= 1 ? [`sinB = 8·sin30°/${nf(a, 1)} = ${nf(sinB, 3)} ⇒ B = ${nf((Math.asin(Math.min(1, sinB)) * 180) / Math.PI, 2)}°${count > 1 ? ` veya ${nf(180 - (Math.asin(sinB) * 180) / Math.PI, 2)}°` : ""}.`] : [];
    return { els, readout: [...lines, `Üçgen sayısı: ${count}.`] };
  },
};

const basicEq: FigureDef = {
  caption:
    "sin x = a denkleminin bir turdaki ([0; 2π)) kökleri: y = sin x ile y = a doğrusunun kesişimleri. a’yı değiştir: |a| ≤ 1 iken θ ve π − θ; a = ±1’de iki aile aynı kökü verir (bir kez yazılır); |a| > 1 iken gerçek çözüm yok. Bütün R’de x = θ + 2kπ veya x = π − θ + 2kπ.",
  alt: "Yatay eksende 0’dan 2π’ye x; sinüs eğrisi ve seçili a yüksekliğinde yatay kesikli doğru; kesişim noktaları işaretli.",
  param: { label: "a", min: -1.2, max: 1.2, step: 0.1, init: 0.5 },
  draw: (a) => {
    const kx = 1.15, ky = 1.6, X = (x: number) => x * kx, Y = (y: number) => y * ky, T = 2 * Math.PI;
    const els: El[] = [vec(v(0, 0), v(X(T) + 0.4, 0), { tone: "ink", thin: true }), vec(v(0, Y(-1.35)), v(0, Y(1.45)), { tone: "ink", thin: true })];
    els.push(poly(curve(Math.sin, 0, T, 120, X, Y), { open: true, tone: "a", bold: true }));
    els.push(seg(v(0, Y(a)), v(X(T), Y(a)), { tone: "b", dash: true }), txt(v(X(T) + 0.1, Y(a)), `y = ${nf(a, 1)}`, "e", { tone: "b", small: true }));
    for (const [x, s] of [[Math.PI, "π"], [T, "2π"]] as const) els.push(seg(v(X(x), -0.07), v(X(x), 0.07), { tone: "muted", thin: true }), txt(v(X(x), -0.12), s, "s", { tone: "muted", small: true, soft: true }));
    const roots: number[] = [];
    if (Math.abs(a) <= 1 + 1e-9) {
      const th = Math.asin(Math.max(-1, Math.min(1, a)));
      for (const r of [th, Math.PI - th]) {
        const x = ((r % T) + T) % T;
        if (!roots.some((q) => Math.abs(q - x) < 1e-6)) roots.push(x);
      }
    }
    roots.sort((p, q) => p - q).forEach((x) => els.push(pt(v(X(x), Y(a)), `${nf((x * 180) / Math.PI, 1)}°`, a >= 0 ? "n" : "s", "warn")));
    els.push(...pad(-0.6, Y(1.45) + 0.4, X(T) + 1.8, Y(-1.35) - 0.4));
    return { els, readout: [roots.length ? `Kökler: ${roots.map((x) => `${nf((x * 180) / Math.PI, 2)}°`).join(" ve ")} (bir turda ${roots.length}).` : `|a| = ${nf(Math.abs(a), 1)} > 1: gerçek kök yok.`, "Yarı açık [0; 2π) aralığında 2π alınmaz."] };
  },
};

/* ===================== İkinci dereceden denklemler ===================== */

const completeSquare: FigureDef = {
  caption:
    "x² + 6x + 2 = 0 için alan modeli (x > 0 gibi çizildi; cebir her x için geçerli, ölçekli değil). 6x iki 3x şeridine bölünür; köşedeki eksik 3×3 = 9 eklenince kare (x + 3)² olur: x² + 6x = (x + 3)² − 9. Böylece (x + 3)² = 7, x = −3 ± √7.",
  alt: "x kenarlı kare; sağında ve üstünde 3 genişlikte iki dikdörtgen şerit; son adımda sağ üst köşede eksik 3’e 3’lük kare tamamlanmış.",
  steps: ["x² + 6x", "6x’i iki 3x şeridine böl", "Eksik 9’u ekle"],
  draw: (_, step) => {
    const X = 2.6, T = 1.3;
    const els: El[] = [box(0, 0, X, X, "a"), txt(v(X / 2, X / 2), "x²", "c", { tone: "ink", bold: true })];
    if (step === 0) els.push(box(X, 0, X + 2 * T, X, "b"), txt(v(X + T, X / 2), "6x", "c", { tone: "ink", bold: true }));
    else {
      els.push(box(X, 0, X + T, X, "b"), box(0, X, X, X + T, "b"), txt(v(X + T / 2, X / 2), "3x", "c", { tone: "ink", bold: true }), txt(v(X / 2, X + T / 2), "3x", "c", { tone: "ink", bold: true }));
      els.push(box(X, X, X + T, X + T, "warn", step === 2), txt(v(X + T / 2, X + T / 2), step === 2 ? "9" : "?", "c", { tone: "ink", bold: true }));
    }
    els.push(txt(v(X / 2, -0.15), "x", "s", { tone: "muted", small: true }), txt(v(-0.15, X / 2), "x", "w", { tone: "muted", small: true }));
    els.push(txt(v(step === 0 ? X + T : X + T / 2, -0.15), step === 0 ? "6" : "3", "s", { tone: "muted", small: true }));
    if (step > 0) els.push(txt(v(-0.15, X + T / 2), "3", "w", { tone: "muted", small: true }));
    els.push(...pad(-0.8, X + T + 0.4, X + 2 * T + 0.4, -0.7));
    const lines = [
      ["x² + 6x: bir kare ve 6 genişlikte bir şerit.", "Henüz tam kare değil."],
      ["6x = 3x + 3x: şeritler iki kenara yerleşir.", "Köşede 3×3’lük boşluk kalır."],
      ["x² + 6x + 9 = (x + 3)² ⇒ x² + 6x = (x + 3)² − 9.", "x² + 6x + 2 = 0 ⇒ (x + 3)² = 7 ⇒ x = −3 ± √7."],
    ];
    return { els, readout: lines[step] };
  },
};

const discriminant: FigureDef = {
  caption:
    "y = x² − 2x + c ailesi (a = 1, b = −2). c’yi değiştir: Δ = b² − 4ac = 4 − 4c. Δ > 0 iki farklı gerçek kök (iki kesişim), Δ = 0 tek değer (teğet, iki katlı kök), Δ < 0 gerçek kök yok. c = 5’te Δ = −16: S = 2, P = 5 pozitif olsa da gerçek kök yoktur.",
  alt: "Koordinat düzleminde yukarı açılan parabol; seçili c’ye göre x eksenini iki noktada kesen, teğet olan ya da eksenin üstünde kalan konum; kökler işaretli.",
  param: { label: "c", min: -3, max: 5, step: 0.5, init: -3 },
  draw: (c) => {
    const k = 0.75, ky = 0.36, D = 4 - 4 * c;
    const els: El[] = [vec(v(-2.6 * k, 0), v(4.8 * k, 0), { tone: "ink", thin: true }), vec(v(0, -4.5 * ky), v(0, 9.4 * ky), { tone: "ink", thin: true }), txt(v(4.8 * k, 0), "x", "se", { tone: "ink", small: true }), txt(v(0, 9.4 * ky), "y", "n", { tone: "ink", small: true })];
    els.push(...plot((x) => x * x - 2 * x + c, -2.4, 4.4, k, -4.4, 9.2, "a", { ky }));
    if (D > 1e-9) for (const r of [1 - Math.sqrt(D) / 2, 1 + Math.sqrt(D) / 2]) els.push(pt(v(r * k, 0), nf(r, 2), "s", "warn"));
    else if (Math.abs(D) < 1e-9) els.push(pt(v(k, 0), "1 (çift)", "s", "warn"));
    els.push(seg(v(-0.07, 4 * ky), v(0.07, 4 * ky), { tone: "muted", thin: true }), txt(v(-0.1, 4 * ky), "4", "w", { tone: "muted", small: true, soft: true }));
    els.push(...pad(-2.6 * k - 0.4, 9.6 * ky, 4.8 * k + 0.6, -4.6 * ky));
    return { els, readout: [`Δ = 4 − 4·${nf(c, 1)} = ${nf(D, 1)}: ${D > 1e-9 ? `iki gerçek kök 1 ± ${nf(Math.sqrt(D) / 2, 3)}` : Math.abs(D) < 1e-9 ? "tek değer x = 1, küme {1}" : "gerçek kök yok"}.`, `Tepe (1; ${nf(c - 1, 1)}): ${c - 1 < 0 ? "eksenin altında" : c - 1 === 0 ? "eksen üzerinde" : "eksenin üstünde"}.`] };
  },
};

const SIGN_CASES = [
  { f: (x: number) => x * x - x - 6, name: "x² − x − 6", S: 1, P: -6, roots: [-2, 3], note: "P < 0: zıt işaretli kökler (−2 ve 3)." },
  { f: (x: number) => x * x - 5 * x + 6, name: "x² − 5x + 6", S: 5, P: 6, roots: [2, 3], note: "P > 0, S > 0, Δ > 0: iki pozitif kök (2 ve 3)." },
  { f: (x: number) => x * x + 5 * x + 6, name: "x² + 5x + 6", S: -5, P: 6, roots: [-3, -2], note: "P > 0, S < 0, Δ > 0: iki negatif kök (−3 ve −2)." },
  { f: (x: number) => x * x - 2 * x + 5, name: "x² − 2x + 5", S: 2, P: 5, roots: [] as number[], note: "S, P pozitif ama Δ = −16 < 0: pozitif gerçek kök yok." },
];
const rootSigns: FigureDef = {
  caption:
    "Kökler toplamı S = −b/a, çarpımı P = c/a. Adımları dolaş: P < 0 kökler zıt işaretli; P > 0 ve S > 0 ikisi pozitif; P > 0 ve S < 0 ikisi negatif. Aynı işaret şartına Δ ≥ 0 eklenmelidir: son adımda S ve P pozitif ama parabol ekseni kesmez.",
  alt: "Koordinat düzleminde her adımda farklı bir yukarı açılan parabol ve x eksenini kestiği kök noktaları; son adımda parabol eksenin tamamen üstünde.",
  steps: SIGN_CASES.map((c) => c.name),
  draw: (_, step) => {
    const cs = SIGN_CASES[step], k = 0.6, ky = 0.2;
    const els: El[] = [vec(v(-5 * k, 0), v(5 * k, 0), { tone: "ink", thin: true }), vec(v(0, -7 * ky), v(0, 15 * ky), { tone: "ink", thin: true }), txt(v(5 * k, 0), "x", "se", { tone: "ink", small: true }), txt(v(0, 15 * ky), "y", "n", { tone: "ink", small: true })];
    els.push(...plot(cs.f, -4.8, 4.8, k, -6.9, 14.8, "a", { ky }));
    for (const r of cs.roots) els.push(pt(v(r * k, 0), String(r).replace("-", "−"), "s", "warn"));
    els.push(txt(v(-4.6 * k, 14 * ky), `S = ${String(cs.S).replace("-", "−")}, P = ${cs.P.toString().replace("-", "−")}`, "e", { tone: "b", small: true, bold: true }));
    els.push(...pad(-5.2 * k, 15.6 * ky, 5.4 * k, -7.2 * ky));
    return { els, readout: [cs.note, `Δ = ${cs.S ** 2 - 4 * cs.P} (a = 1 için S² − 4P).`.replace("-", "−")] };
  },
};

const sqrtEq: FigureDef = {
  caption:
    "√(x + 4) = x − 2. Kare alınca x + 4 = (x − 2)² ⇒ x(x − 5) = 0: adaylar 0 ve 5. Grafikte y = √(x + 4) (dolu) ile y = x − 2 yalnız x = 5’te kesişir. x = 0 adayı kare almanın eklediği y = −√(x + 4) dalından (kesikli) gelir: sağ taraf −2 negatif, ilk denklemi sağlamaz. Koşul x ≥ 2.",
  alt: "Koordinat düzleminde yukarı kıvrılan karekök eğrisi, onun x eksenine göre kesikli yansıması ve eğik doğru; doğru üst eğriyi x = 5’te, kesikli eğriyi x = 0’da kesiyor.",
  draw: () => {
    const k = 0.55;
    const els: El[] = [...grid(k, -4.6, 7.4, -4, 4.6)];
    els.push(...plot((x) => Math.sqrt(x + 4), -4, 7, k, -5, 5, "a"), ...plot((x) => -Math.sqrt(x + 4), -4, 7, k, -5, 5, "muted", { dash: true, bold: false }));
    els.push(...plot((x) => x - 2, -1.8, 6.6, k, -4, 4.6, "b"));
    els.push(pt(v(5 * k, 3 * k), "x = 5 (kök)", "nw", "a"), pt(v(0, -2 * k), "x = 0 (yabancı)", "se", "warn", true));
    els.push(txt(v(7 * k + 0.1, Math.sqrt(11) * k), "√(x + 4)", "e", { tone: "a", small: true }), txt(v(6.6 * k + 0.1, 4.6 * k), "x − 2", "e", { tone: "b", small: true }));
    els.push(...pad(-4.8 * k, 5.2 * k, 9.6 * k, -4.4 * k));
    return { els, readout: ["x = 5: √9 = 3 = 5 − 2, sağlar.", "x = 0: √4 = 2 ama 0 − 2 = −2; sağ taraf negatif, yabancı kök."] };
  },
};

/* ===================== Karmaşık sayılar ===================== */

const POW = [
  { z: v(1, 0), s: "1" },
  { z: v(0, 1), s: "i" },
  { z: v(-1, 0), s: "−1" },
  { z: v(0, -1), s: "−i" },
];
const iPowers: FigureDef = {
  caption:
    "iⁿ karmaşık düzlemde dört konum arasında döner: i⁰ = 1, i¹ = i, i² = −1, i³ = −i, i⁴ = 1. Üssü değiştir: n’nin 4’e bölümünden kalan (0, 1, 2, 3) konumu seçer; negatif üslerde de aynı periyot: i⁻¹ = −i, i⁻⁷ = i. Her i çarpımı 90° saat yönünün tersine dönmedir.",
  alt: "Birim çember üzerinde 1, i, −1 ve −i noktaları; orijinden seçili üsse karşılık gelen noktaya ok.",
  param: { label: "n", min: -8, max: 12, step: 1, init: 6, plain: true },
  draw: (n) => {
    const k = 2.2, r = ((n % 4) + 4) % 4;
    const els: El[] = [...grid(1, -3, 3, -2.9, 2.9, "Re", "Im"), circle(v(0, 0), k, { tone: "muted", dash: true, thin: true })];
    POW.forEach((p, i) => els.push(pt(v(p.z[0] * k, p.z[1] * k), p.s, i === 0 ? "ne" : i === 1 ? "ne" : i === 2 ? "nw" : "se", i === r ? "a" : "muted", i !== r)));
    els.push(vec(v(0, 0), v(POW[r].z[0] * k, POW[r].z[1] * k), { tone: "a", bold: true }));
    els.push(...pad(-3.2, 3.2, 3.2, -3.2));
    const q = Math.floor(n / 4);
    const neg = (x: number) => String(x).replace("-", "−");
    return { els, readout: [`n = ${neg(n)} = 4·(${neg(q)}) + ${r} ⇒ iⁿ = ${POW[r].s}.`, "Kalan her zaman 0, 1, 2 veya 3 alınır; her i çarpımı 90° dönmedir."] };
  },
};

const addSub: FigureDef = {
  caption:
    "z = 2 − 3i ve w = −1 + 4i konum vektörleri (gerçek ve sanal eksen aynı ölçekte). Toplam bileşen bileşen: (2 − 1) + (−3 + 4)i = 1 + i, uç uca ekleme. Fark z − w = z + (−w): ikinci sayının iki bileşeninin de işareti değişir, 3 − 7i.",
  alt: "Karmaşık düzlemde z ve w okları; birinci adımda w’nin z’nin ucuna taşınmış kopyası ve toplam oku; ikinci adımda −w oku, onun z’nin ucuna eklenmesi ve fark oku.",
  steps: ["Toplam z + w", "Fark z − w"],
  draw: (_, step) => {
    const k = 0.42, P = (x: number, y: number) => v(x * k, y * k);
    const z = P(2, -3), w = P(-1, 4);
    const els: El[] = [...grid(k, -3, 6, -8.6, 5.4, "Re", "Im")];
    els.push(vec(v(0, 0), z, { tone: "b", bold: true }), txt(v(z[0] + 0.1, z[1]), "z = 2 − 3i", "e", { tone: "b", small: true, bold: true }));
    els.push(vec(v(0, 0), w, { tone: "c", bold: true }), txt(v(w[0] - 0.1, w[1]), "w = −1 + 4i", "w", { tone: "c", small: true, bold: true }));
    if (step === 0) {
      const s = P(1, 1);
      els.push(vec(z, s, { tone: "c", dash: true }), vec(v(0, 0), s, { tone: "a", bold: true }), txt(v(s[0] + 0.1, s[1] + 0.05), "1 + i", "ne", { tone: "a", small: true, bold: true }));
    } else {
      const mw = P(1, -4), d = P(3, -7);
      els.push(vec(v(0, 0), mw, { tone: "warn", dash: true }), txt(v(mw[0] + 0.1, mw[1]), "−w", "e", { tone: "warn", small: true }));
      els.push(vec(z, d, { tone: "warn", dash: true }), vec(v(0, 0), d, { tone: "a", bold: true }), txt(v(d[0] + 0.1, d[1]), "3 − 7i", "e", { tone: "a", small: true, bold: true }));
    }
    els.push(...pad(-3.4 * k - 1.2, 5.6 * k, 6.4 * k + 1.0, -8.8 * k));
    return { els, readout: step === 0 ? ["(2 − 3i) + (−1 + 4i) = (2 − 1) + (−3 + 4)i = 1 + i.", "Uç uca ekleme ve bileşen toplamı aynı ucu verir."] : ["(2 − 3i) − (−1 + 4i) = 2 + 1 + (−3 − 4)i = 3 − 7i.", "Yalnız gerçek kısma eksi dağıtmak yanlıştır."] };
  },
};

const multiply: FigureDef = {
  caption:
    "Çarpma düzlemde uzunluk ve yönü birlikte değiştirir. i ile çarpma (a; b) → (−b; a), yani 90° saat yönünün tersine dönmedir: i(1 + 2i) = −2 + i. (1 + 2i)(3 − i) = 3 − i + 6i − 2i² = 5 + 5i; i²’den gelen +2 gerçek kısma eklenir. Modüller çarpılır: √5·√10 = √50.",
  alt: "Karmaşık düzlemde 1 + 2i oku; ikinci adımda 90 derece dönmüş −2 + i oku ve aradaki dik açı; üçüncü adımda 3 − i oku ve çarpım 5 + 5i oku.",
  steps: ["z = 1 + 2i", "i·z = −2 + i", "(1 + 2i)(3 − i)"],
  draw: (_, step) => {
    const k = 0.48, P = (x: number, y: number) => v(x * k, y * k);
    const z = P(1, 2);
    const els: El[] = [...grid(k, -3, 6.2, -2, 6.2, "Re", "Im")];
    els.push(vec(v(0, 0), z, { tone: "b", bold: true }), txt(v(z[0] + 0.1, z[1]), "1 + 2i", "e", { tone: "b", small: true, bold: true }));
    if (step === 1) {
      const iz = P(-2, 1);
      els.push(vec(v(0, 0), iz, { tone: "a", bold: true }), txt(v(iz[0] - 0.1, iz[1] + 0.05), "−2 + i", "nw", { tone: "a", small: true, bold: true }), ang(v(0, 0), z, iz, "90°", { tone: "muted", r: 24 }));
    }
    if (step === 2) {
      const w = P(3, -1), p = P(5, 5);
      els.push(vec(v(0, 0), w, { tone: "c", bold: true }), txt(v(w[0] + 0.1, w[1]), "3 − i", "e", { tone: "c", small: true, bold: true }));
      els.push(vec(v(0, 0), p, { tone: "a", bold: true }), txt(v(p[0] + 0.1, p[1]), "5 + 5i", "e", { tone: "a", small: true, bold: true }));
    }
    els.push(...pad(-3.2 * k - 0.6, 6.4 * k, 6.4 * k + 1.4, -2.2 * k));
    const lines = [
      ["|z| = √(1² + 2²) = √5.", "Konum (1; 2)."],
      ["i(1 + 2i) = i + 2i² = −2 + i.", "(a; b) → (−b; a): 90° dönme, uzunluk aynı."],
      ["(1 + 2i)(3 − i) = (3 + 2) + (−1 + 6)i = 5 + 5i.", "|5 + 5i| = √50 = √5·√10."],
    ];
    return { els, readout: lines[step] };
  },
};

const modulus: FigureDef = {
  caption:
    "|z| = √(a² + b²) orijine uzaklıktır: |3 − 4i| = 5. |z − w| iki noktanın uzaklığıdır: 1 + i ile 4 + 5i arası √(3² + 4²) = 5. Eşlenik z̄ = a − bi gerçek eksene göre yansımadır; uzunluğu korur, |z̄| = |z|.",
  alt: "Karmaşık düzlemde üç adım: orijinden 3 − 4i noktasına 5 birimlik uzaklık; 1 + i ile 4 + 5i arasındaki dik üçgen ve uzaklık; z ile eşleniğinin gerçek eksene göre simetrik noktaları.",
  steps: ["|3 − 4i|", "|z − w|", "Eşlenik"],
  draw: (_, step) => {
    const k = 0.5, P = (x: number, y: number) => v(x * k, y * k);
    const els: El[] = [...grid(k, -1.5, 6, -5, 6, "Re", "Im")];
    if (step === 0) {
      const z = P(3, -4);
      els.push(seg(v(0, 0), z, { tone: "a", bold: true }), seg(z, P(3, 0), { tone: "muted", dash: true, thin: true }), pt(z, "3 − 4i", "e", "a"), txt(v(z[0] / 2 - 0.1, z[1] / 2), "5", "sw", { tone: "a", bold: true }));
    } else if (step === 1) {
      const z = P(1, 1), w = P(4, 5);
      els.push(seg(z, w, { tone: "a", bold: true }), seg(z, P(4, 1), { tone: "muted", dash: true, thin: true }), seg(P(4, 1), w, { tone: "muted", dash: true, thin: true }));
      els.push(pt(z, "1 + i", "w", "b"), pt(w, "4 + 5i", "ne", "b"), txt(v(P(3.4, 1)[0], P(3.4, 1)[1] - 0.1), "3", "s", { tone: "muted", small: true }), txt(v(P(4, 3)[0] + 0.1, P(4, 3)[1]), "4", "e", { tone: "muted", small: true }), txt(v(P(2.5, 3)[0] - 0.1, P(2.5, 3)[1] + 0.1), "5", "nw", { tone: "a", bold: true }));
    } else {
      const z = P(3, 4), zb = P(3, -4);
      els.push(seg(z, zb, { tone: "muted", dash: true, thin: true }), seg(v(0, 0), z, { tone: "b" }), seg(v(0, 0), zb, { tone: "c" }), pt(z, "z = 3 + 4i", "e", "b"), pt(zb, "z̄ = 3 − 4i", "e", "c"));
    }
    els.push(...pad(-1.8 * k, 6.2 * k, 6.4 * k + 1.8, -5.2 * k));
    const lines = [
      ["|3 − 4i| = √(9 + 16) = 5.", "Modül negatif olmaz; yalnız z = 0 için 0."],
      ["|(4 + 5i) − (1 + i)| = |3 + 4i| = 5.", "Genelde |z + w| ≠ |z| + |w|."],
      ["z = 3 + 4i, z̄ = 3 − 4i: Re korunur, Im işaret değiştirir.", "|z̄| = |z| = 5; z = z̄ ancak z gerçekse."],
    ];
    return { els, readout: lines[step] };
  },
};

const complexRoots: FigureDef = {
  caption:
    "x² + 2x + 5 = 0: Δ = 4 − 20 = −16 < 0. Solda gerçek grafik eksenin üstünde kalır (tepe (−1; 4)), gerçek kök yok. Sağda karmaşık düzlemde kökler −1 ± 2i: eşlenik çift, gerçek eksene göre simetrik. Toplam −2, çarpım (−1)² + 2² = 5: Vieta hâlâ çalışır.",
  alt: "Solda x–y düzleminde x eksenine değmeyen yukarı açılan parabol; sağda ayrı karmaşık düzlemde gerçek eksene göre simetrik iki kök noktası.",
  draw: () => {
    const k = 0.42, ox = 5.0;
    const els: El[] = [...grid(k, -4.4, 2.6, -1, 9.4)];
    els.push(...plot((x) => x * x + 2 * x + 5, -4, 2, k, -1, 9.2, "a"), pt(v(-k, 4 * k), "(−1; 4)", "s", "a"));
    const Q = (x: number, y: number) => v(ox + x * 0.75, 2.0 + y * 0.75);
    els.push(vec(Q(-2.6, 0), Q(1.6, 0), { tone: "ink", thin: true }), vec(Q(0, -2.8), Q(0, 2.8), { tone: "ink", thin: true }), txt(Q(1.6, 0), "Re", "se", { tone: "ink", small: true }), txt(Q(0, 2.8), "Im", "n", { tone: "ink", small: true }));
    els.push(seg(Q(-1, 2), Q(-1, -2), { tone: "muted", dash: true, thin: true }), pt(Q(-1, 2), "−1 + 2i", "w", "warn"), pt(Q(-1, -2), "−1 − 2i", "w", "warn"));
    els.push(...pad(-4.6 * k - 0.4, 9.6 * k, ox + 1.6, -0.6));
    return { els, readout: ["x = (−2 ± √−16)/2 = −1 ± 2i.", "Gerçek grafik gerçek x’i, kök kümesi seçilen sayı kümesini anlatır."] };
  },
};

/* ===================== Eşitsizlikler ===================== */

const criticalPoints: FigureDef = {
  caption:
    "(x + 2)(x − 3) için kritik noktalar −2 ve 3; sayı doğrusunu üç aralığa böler, her aralıkta işaret sabittir. En sağda baş katsayı + ⇒ +; tek katlı köklerde işaret döner: +, −, +. Grafik aynı fonksiyondur; kök noktaları ayrıca kontrol edilir (orada değer 0).",
  alt: "Üstte x eksenini −2 ve 3’te kesen yukarı açılan parabol; altında aynı kritik noktaları taşıyan işaret satırı ve aralıklardaki artı, eksi, artı işaretleri.",
  draw: () => {
    const k = 0.6, f = (x: number) => (x + 2) * (x - 3), S = 0.3;
    const els: El[] = [vec(v(-4.5 * k, 0), v(5.5 * k, 0), { tone: "ink", thin: true }), txt(v(5.5 * k, 0), "x", "se", { tone: "ink", small: true })];
    els.push(poly(curve(f, -3.6, 4.6, 80, (x) => x * k, (y) => y * S * k), { open: true, tone: "a", bold: true }));
    els.push(...signRow(-2.6, k, -4.5, 5.5, [{ x: -2, label: "−2" }, { x: 3, label: "3" }], ["+", "−", "+"]));
    els.push(...pad(-4.7 * k, 3.9, 5.8 * k, -3.4));
    return { els, readout: ["(x + 2)(x − 3) > 0 ⇔ x < −2 veya x > 3; < 0 ⇔ −2 < x < 3.", "≥ veya ≤ istenirse −2 ve 3 de alınır (değer 0)."] };
  },
};

const evenOdd: FigureDef = {
  caption:
    "(x − 1)²(x + 2): −2 tek katlı (işaret döner), 1 çift katlı (işaret korunur, grafik eksene değip geri döner). En sağda +, 1’i geçince yine +, −2’yi geçince −. Sıkı eşitsizlikte (> 0) 1 alınmaz; ≥ 0’da alınır.",
  alt: "Üstte x eksenini −2’de kesip 1’de eksene teğet olan kübik eğri; altında işaret satırı: −2’nin solunda eksi, sağında ve 1’in sağında artı.",
  draw: () => {
    const k = 0.75, f = (x: number) => (x - 1) ** 2 * (x + 2), S = 0.28;
    const els: El[] = [vec(v(-3.6 * k, 0), v(3.4 * k, 0), { tone: "ink", thin: true }), txt(v(3.4 * k, 0), "x", "se", { tone: "ink", small: true })];
    els.push(...plot((x) => f(x) * S, -2.7, 2.4, k, -2.6 / k, 3.2 / k, "a"));
    els.push(...signRow(-2.8, k, -3.6, 3.4, [{ x: -2, label: "−2 (tek)" }, { x: 1, label: "1 (çift)" }], ["−", "+", "+"]));
    els.push(...pad(-3.8 * k, 3.4, 3.7 * k + 0.6, -3.6));
    return { els, readout: ["(x − 1)²(x + 2) > 0 ⇔ x > −2 ve x ≠ 1.", "≥ 0 ⇔ x ≥ −2 (1 dahil, değer 0)."] };
  },
};

const DELTA_CASES = [
  { f: (x: number) => x * x - x - 6, name: "x² − x − 6 (Δ > 0)", crit: [{ x: -2, label: "−2" }, { x: 3, label: "3" }], signs: ["+", "−", "+"], note: "Δ = 25 > 0: kökler arasında a’nın tersi (−), dışında a’nın işareti (+)." },
  { f: (x: number) => (x - 1) ** 2, name: "(x − 1)² (Δ = 0)", crit: [{ x: 1, label: "1" }], signs: ["+", "+"], note: "Δ = 0: 1 dışında a’nın işareti (+), 1’de değer 0." },
  { f: (x: number) => x * x + 1, name: "x² + 1 (Δ < 0)", crit: [], signs: ["+"], note: "Δ < 0: gerçek sıfır yok; her gerçek x’te +." },
  { f: (x: number) => -x * x - 1, name: "−x² − 1 (Δ < 0)", crit: [], signs: ["−"], note: "Δ < 0, a < 0: her gerçek x’te −." },
];
const threeDelta: FigureDef = {
  caption:
    "İkinci derece ifadede işaret, a’nın işareti ve Δ ile belirlenir. Adımları dolaş: Δ > 0 iki kök (aralarında a’nın tersi), Δ = 0 tek dokunma noktası, Δ < 0 hiç gerçek sıfır yok (her yerde a’nın işareti). Tek bir x denemesi Δ bilgisi olmadan bütün gerçekleri kanıtlamaz.",
  alt: "Her adımda bir parabol ve altında işaret satırı: iki kökte kesen, eksene teğet olan, eksenin tamamen üstünde ve tamamen altında kalan dört durum.",
  steps: DELTA_CASES.map((c) => c.name),
  draw: (_, step) => {
    const cs = DELTA_CASES[step], k = 0.6, S = 0.3;
    const els: El[] = [vec(v(-4.5 * k, 0), v(5.5 * k, 0), { tone: "ink", thin: true }), txt(v(5.5 * k, 0), "x", "se", { tone: "ink", small: true })];
    els.push(...plot((x) => cs.f(x) * S, -3.6, 4.6, k, -2.3 / k, 3.2 / k, "a"));
    els.push(...signRow(-3.0, k, -4.5, 5.5, cs.crit, cs.signs));
    els.push(...pad(-4.7 * k, 3.4, 5.8 * k, -3.8));
    return { els, readout: [cs.note] };
  },
};

const intersection: FigureDef = {
  caption:
    "Sistem: x² − x − 6 ≤ 0 ve x − 1 > 0. Her koşulu ayrı çöz: [−2; 3] ve (1; ∞). Ortak çözüm ikisinin de doğru olduğu yer: (1; 3]. 1 ilk koşulu sağlasa da ikinciyi sağlamaz (açık nokta); 3 ikisini de sağlar (dolu nokta). Birleşim almak sistem çözümü değildir.",
  alt: "Alt alta üç sayı doğrusu: birincide −2 ile 3 arası dolu uçlu kalın aralık, ikincide 1’den sağa açık uçlu kalın ışın, üçüncüde 1 açık ve 3 dolu uçlu ortak aralık.",
  draw: () => {
    const k = 0.7, x0 = -3.5, x1 = 5.5;
    const els: El[] = [];
    const row = (y: number, name: string, a: number, b: number, openA: boolean, openB: boolean | null, tone: Tone) => {
      els.push(seg(v(x0 * k, y), v(x1 * k, y), { tone: "muted" }), seg(v(a * k, y), v((b === Infinity ? x1 : b) * k, y), { tone, bold: true }));
      els.push(pt(v(a * k, y), String(a).replace("-", "−"), "s", tone, openA));
      if (openB !== null) els.push(pt(v(b * k, y), String(b), "s", tone, openB));
      else els.push(vec(v((x1 - 0.6) * k, y), v(x1 * k, y), { tone, bold: true }));
      els.push(txt(v(x0 * k - 0.15, y), name, "w", { tone: "ink", small: true }));
    };
    row(2.4, "x² − x − 6 ≤ 0", -2, 3, false, false, "b");
    row(1.2, "x − 1 > 0", 1, Infinity, true, null, "c");
    row(0, "ortak", 1, 3, true, false, "a");
    els.push(...pad(x0 * k - 3.6, 2.9, x1 * k + 0.4, -0.7));
    return { els, readout: ["[−2; 3] ∩ (1; ∞) = (1; 3].", "Son satıra yalnız iki koşulun birlikte doğru olduğu aralık taşınır."] };
  },
};

const absDistance: FigureDef = {
  caption:
    "|x + 1| ≤ d, x ile −1 arasındaki uzaklığın en çok d olması demektir: −1 − d ≤ x ≤ −1 + d. d’yi değiştir: aralık −1 merkezli ve 2d genişliktedir. Rehberdeki örnek d = 3: −4 ≤ x ≤ 2. d = 0’da yalnız x = −1.",
  alt: "Sayı doğrusu üzerinde −1 merkez noktası, iki yana d uzunlukta oklar ve iki dolu uç noktası arasında kalın çözüm aralığı.",
  param: { label: "d", min: 0, max: 4, step: 0.5, init: 3 },
  draw: (d) => {
    const k = 0.62, x0 = -6, x1 = 4, c = -1;
    const els: El[] = [seg(v(x0 * k, 0), v(x1 * k, 0), { tone: "muted" })];
    if (d > 0) els.push(seg(v((c - d) * k, 0), v((c + d) * k, 0), { tone: "a", bold: true }), vec(v(c * k, 0.45), v((c + d) * k, 0.45), { tone: "b", thin: true }), vec(v(c * k, 0.45), v((c - d) * k, 0.45), { tone: "b", thin: true }), txt(v((c + d / 2) * k, 0.55), `d = ${nf(d, 1)}`, "n", { tone: "b", small: true }));
    els.push(pt(v(c * k, 0), "−1", "s", "ink", true));
    if (d > 0) els.push(pt(v((c - d) * k, 0), nf(c - d, 1).replace("-", "−"), "s", "a"), pt(v((c + d) * k, 0), nf(c + d, 1).replace("-", "−"), "s", "a"));
    for (const x of [-6, 4]) els.push(txt(v(x * k, 0.12), String(x).replace("-", "−"), "n", { tone: "muted", small: true, soft: true }));
    els.push(...pad(x0 * k - 0.3, 1.3, x1 * k + 0.3, -0.9));
    return { els, readout: [d > 0 ? `|x + 1| ≤ ${nf(d, 1)} ⇔ ${nf(c - d, 1)} ≤ x ≤ ${nf(c + d, 1)}.` : "|x + 1| ≤ 0 ⇔ x = −1.", `|x + 1| ≥ ${nf(d, 1)} ise dış bölge: x ≤ ${nf(c - d, 1)} veya x ≥ ${nf(c + d, 1)}.`] };
  },
};

export const mathFigures060: Record<string, Record<string, FigureDef>> = {
  "ayt-trigonometri": {
    "Birim çember koordinatları sinüs ve kosinüstür": unitCircle,
    "Dalga grafiğinde dört parametreyi ayır": waveParams,
    "Tanjant grafiği kutupta birleşmez": tanBranches,
    "İki kenar ve karşı açı her zaman tek üçgen vermez": ambiguous,
    "Temel denklemlerde bütün tur ailelerini yaz": basicEq,
  },
  "ayt-ikinci-dereceden-denklemler": {
    "Tam kareye tamamlama neden çalışır": completeSquare,
    "Diskriminant kök sayısını belirler": discriminant,
    "Köklerin işaretini katsayılardan oku": rootSigns,
    "Karekök içeren denklemde adayları geri denetle": sqrtEq,
  },
  "ayt-karmasik-sayilar": {
    "i kuvvetleri dört adımda döner": iPowers,
    "Toplama ve çıkarma bileşen bileşendir": addSub,
    "Çarpımda i² terimini hemen düzenle": multiply,
    "Modül düzlemde uzaklıktır": modulus,
    "Δ negatifse karmaşık iki kökü kur": complexRoots,
  },
  "ayt-esitsizlikler": {
    "Kritik noktaları küçükten büyüğe yerleştir": criticalPoints,
    "Tek ve çift katlı kök davranışları farklıdır": evenOdd,
    "İkinci derece ifadenin üç Δ durumunu bağla": threeDelta,
    "Kesişimde bütün eşitsizlikler birlikte doğrudur": intersection,
    "Mutlak değeri uzaklık olarak çöz": absDistance,
  },
};
