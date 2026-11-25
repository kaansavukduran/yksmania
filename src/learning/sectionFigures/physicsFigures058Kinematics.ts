import { ang, ball, poly, pt, seg, txt, v, vec, type El, type FigureDef, type V } from "./figureKit";
import { axes, beside, box, curve, nf, pad, xtick, ytick } from "./physicsFigures058Kit";

/*
 * AYT Fizik (Forge058) · Vektörler, bağıl hareket, nehir problemleri, düşey
 * atış. Bütün oklar bileşenlerinden çizilir; etiketlerdeki sayılar çizimdeki
 * aynı hesaptan gelir. Sayısal değerler rehber bölümlerindeki öğretim
 * örnekleridir; g = 10 m/s², hava direnci yok.
 */

const G = 10;
const deg = (a: number) => (a * 180) / Math.PI;
const quadrant = (x: number, y: number) =>
  x > 0 && y > 0 ? "I. bölge" : x < 0 && y > 0 ? "II. bölge" : x < 0 && y < 0 ? "III. bölge" : x > 0 && y < 0 ? "IV. bölge" : "eksen üzerinde";

/** Hafif koordinat eksenleri (birim ızgarası olmadan). */
function plane(x0: number, x1: number, y0: number, y1: number): El[] {
  return [
    vec(v(x0, 0), v(x1, 0), { tone: "muted", thin: true }),
    vec(v(0, y0), v(0, y1), { tone: "muted", thin: true }),
    txt(v(x1, 0), "+x", "se", { tone: "muted", small: true }),
    txt(v(0, y1), "+y", "ne", { tone: "muted", small: true }),
  ];
}

/* ===================== Vektörler ===================== */

const COMP: [number, number][] = [
  [-3, 4],
  [3, 4],
  [-3, -4],
  [4, -3],
];
const components: FigureDef = {
  caption:
    "Bir vektör seç: yatay ve düşey kesikli oklar işaretli bileşenlerdir. (−3, 4) batıya 3, kuzeye 4 birim içerir; büyüklüğü √(3² + 4²) = 5 birimdir, bileşenlerin mutlak toplamı olan 7 değil. Aynı Ay/Ax oranını veren iki vektör farklı bölgelerde olabilir; yönü iki işaret birlikte belirler.",
  alt: "Koordinat düzleminde başlangıcı orijinde olan A vektörü; ucundan eksenlere inen yatay ve düşey bileşen okları ve bileşen değerleri.",
  steps: COMP.map(([x, y]) => `A = (${nf(x)}, ${nf(y)})`),
  draw: (_v, step) => {
    const [ax, ay] = COMP[step];
    const O = v(0, 0), X = v(ax, 0), A = v(ax, ay);
    const els: El[] = [...plane(-5.2, 5.2, -5.2, 5.2)];
    els.push(vec(O, X, { tone: "b", dash: true }), vec(X, A, { tone: "c", dash: true }), vec(O, A, { tone: "a", bold: true }));
    els.push(txt(v(ax / 2, ay > 0 ? -0.35 : 0.35), `Ax = ${nf(ax)}`, ay > 0 ? "s" : "n", { tone: "b", small: true, bold: true }));
    els.push(txt(v(ax + (ax > 0 ? 0.25 : -0.25), ay / 2), `Ay = ${nf(ay)}`, ax > 0 ? "e" : "w", { tone: "c", small: true, bold: true }));
    els.push(txt(beside(O, A, ax * ay > 0 ? 0.45 : -0.45), "|A| = 5", "c", { tone: "a", small: true, bold: true }));
    let th = deg(Math.atan2(ay, ax));
    if (th < 0) th += 360;
    if (th < 180) els.push(ang(O, v(1, 0), A, undefined, { tone: "muted", r: 22 }));
    els.push(...pad(-6, 5.8, 6, -5.8));
    return {
      els,
      readout: [
        `A = (${nf(ax)}, ${nf(ay)}): |A| = √(${ax * ax} + ${ay * ay}) = 5 birim; +x ekseninden saat yönünün tersine θ = ${nf(th, 1)}°, ${quadrant(ax, ay)}.`,
        `Ay/Ax = ${nf(ay / ax)}; (${nf(-ax)}, ${nf(-ay)}) vektörü de aynı oranı verir ama ${quadrant(-ax, -ay)} içindedir. |Ax| + |Ay| = 7, norm değildir.`,
      ],
    };
  },
};

const SA: V = v(4, 1), SB: V = v(-1, 3);
const addition: FigureDef = {
  caption:
    "A = (4, 1) ve B = (−1, 3). Uç uca eklemede ikinci okun başlangıcı yönü korunarak ilkinin ucuna taşınır; ilk başlangıçtan son uca çizilen ok bileşkedir. Sıra değişince ara çizim değişir ama son uç aynı kalır; ortak başlangıçlı paralelkenarın köşegeni de aynı R = (3, 4) okudur.",
  alt: "Koordinat düzleminde A ve B okları; seçilen adıma göre uç uca dizilmiş ya da ortak başlangıçlı paralelkenar; orijinden son uca bileşke R oku.",
  steps: ["A sonra B", "B sonra A", "Paralelkenar"],
  draw: (_v, step) => {
    const O = v(0, 0), R = v(SA[0] + SB[0], SA[1] + SB[1]);
    const els: El[] = [...plane(-2, 5.4, -0.8, 5.2)];
    if (step === 0) {
      els.push(vec(O, SA, { tone: "b", bold: true }), vec(SA, R, { tone: "c", bold: true }));
      els.push(txt(beside(O, SA, -0.35), "A", "c", { tone: "b", bold: true }), txt(beside(SA, R, -0.35), "B", "c", { tone: "c", bold: true }));
    } else if (step === 1) {
      els.push(vec(O, SB, { tone: "c", bold: true }), vec(SB, R, { tone: "b", bold: true }));
      els.push(txt(beside(O, SB, 0.35), "B", "c", { tone: "c", bold: true }), txt(beside(SB, R, 0.35), "A", "c", { tone: "b", bold: true }));
    } else {
      els.push(vec(O, SA, { tone: "b", bold: true }), vec(O, SB, { tone: "c", bold: true }));
      els.push(seg(SA, R, { tone: "c", dash: true, thin: true }), seg(SB, R, { tone: "b", dash: true, thin: true }));
      els.push(txt(beside(O, SA, -0.35), "A", "c", { tone: "b", bold: true }), txt(beside(O, SB, 0.35), "B", "c", { tone: "c", bold: true }));
    }
    els.push(vec(O, R, { tone: "a", bold: true }), pt(R, "R = (3, 4)", "ne", "a"));
    els.push(...pad(-2.6, 5.9, 6, -1.2));
    return {
      els,
      readout: [
        "R = (4 + (−1), 1 + 3) = (3, 4); |R| = √(9 + 16) = 5 birim. A + B = B + A: son uç değişmez.",
        `|A| + |B| = √17 + √10 = ${nf(Math.hypot(4, 1) + Math.hypot(1, 3))} birim; skaler toplam bileşkenin normu değildir.`,
      ],
    };
  },
};

const threeVectorBalance: FigureDef = {
  caption: "Üç kuvveti uç uca ekle. Yatay ve düşey bileşenleri ayrı topla. Dengeleyici, bileşke ile aynı büyüklükte ve ters yönde olur.",
  alt: "A pozitif x boyunca 6 N. B sola ve yukarı, C aşağı yönlü. İlk adım üç oku uç uca gösterir. İkinci adım bileşkeyi ve zıt yönlü dengeleyiciyi ortak başlangıçtan çizer.",
  steps: ["Uç uca ekle", "Dengeleyiciyi göster"],
  param: { label: "C’nin düşey bileşeni (√3 N)", min: -3, max: 0, step: 1, init: -2 },
  draw: (c, step) => {
    const root = Math.sqrt(3);
    const origin = v(0, 0), a = v(6, 0), b = v(-2, 2 * root);
    const afterB = v(a[0] + b[0], b[1]);
    const vertical = 2 + c;
    const result = v(afterB[0], vertical * root);
    const balance = v(-result[0], -result[1]);
    const yTerm = (coefficient: number) => coefficient === 0 ? "0" : `${nf(coefficient)}√3`;
    const els: El[] = [
      ...plane(-4.9, 7.0, -4.25, 4.45),
      ...pad(-5.3, 4.85, 7.5, -4.62),
    ];
    if (step === 0) {
      els.push(vec(origin, a, { tone: "a", bold: true }), txt(v(3, -0.23), "A", "s", { small: true, bold: true }));
      els.push(vec(a, afterB, { tone: "b", bold: true }), txt(v(5.35, 2), "B", "e", { small: true, bold: true }));
      if (c !== 0) {
        els.push(vec(afterB, result, { tone: "c", bold: true }));
        els.push(txt(v(3.8, (afterB[1] + result[1]) / 2), "C", "w", { small: true, bold: true }));
      }
      els.push(pt(result, undefined, "n", "warn"));
    } else {
      els.push(vec(origin, result, { tone: "a", bold: true }), vec(origin, balance, { tone: "warn", dash: true, bold: true }));
      els.push(txt(v(result[0] * 0.72, result[1] * 0.72), "R", "s", { small: true, bold: true }));
      els.push(txt(v(balance[0] * 0.72, balance[1] * 0.72), "D", "n", { small: true, bold: true }));
    }
    return { els, readout: [
      `Yatay toplam 6 − 2 = 4 N. Düşey toplam ${yTerm(vertical)} N. R = (4; ${yTerm(vertical)}) N.`,
      ...(step === 1 ? [`D = (−4; ${yTerm(-vertical)}) N. R + D = (0; 0) N.`] : []),
    ] };
  },
};

const DA: V = v(2, -3), DB: V = v(-1, 4);
const subtraction: FigureDef = {
  caption:
    "A = (2, −3), B = (−1, 4). −B, B ile eşit uzunlukta ve zıt yönlüdür; A − B = A + (−B) = (3, −7). Ortak başlangıçlı çizimde B’nin ucundan A’nın ucuna giden ok aynı farktır. Fark vektörünün büyüklüğü |A| − |B| değildir.",
  alt: "Koordinat düzleminde A ve B okları; adımlara göre A’nın ucuna eklenen −B oku ve orijinden sonuca giden A − B oku, ya da B’nin ucundan A’nın ucuna çizilen fark oku.",
  steps: ["A ve B", "A + (−B)", "B’nin ucundan A’nın ucuna"],
  draw: (_v, step) => {
    const O = v(0, 0), D = v(DA[0] - DB[0], DA[1] - DB[1]);
    const els: El[] = [...plane(-2.2, 4.4, -7.6, 4.8)];
    els.push(vec(O, DA, { tone: "b", bold: true }), txt(beside(O, DA, 0.4), "A", "c", { tone: "b", bold: true }));
    if (step !== 1) els.push(vec(O, DB, { tone: "c", bold: true }), txt(beside(O, DB, 0.4), "B", "c", { tone: "c", bold: true }));
    if (step === 1) {
      els.push(vec(DA, D, { tone: "c", bold: true, dash: true }), txt(beside(DA, D, 0.45), "−B", "c", { tone: "c", bold: true }));
      els.push(vec(O, D, { tone: "a", bold: true }), pt(D, "A − B = (3, −7)", "e", "a"));
    }
    if (step === 2) els.push(vec(DB, DA, { tone: "a", bold: true }), txt(beside(DB, DA, 0.5), "A − B", "c", { tone: "a", bold: true }));
    els.push(...pad(-3, 5.4, 7.2, -8));
    return {
      els,
      readout: [
        "A − B = (2 − (−1), −3 − 4) = (3, −7): B’nin her iki bileşeninin işareti değişir.",
        `|A − B| = √58 = ${nf(Math.sqrt(58))}; |A| − |B| = ${nf(Math.hypot(2, 3))} − ${nf(Math.hypot(1, 4))} = ${nf(Math.hypot(2, 3) - Math.hypot(1, 4))}. Kısa yol yalnız aynı doğrultuda geçerlidir.`,
      ],
    };
  },
};

const angleRange: FigureDef = {
  caption:
    "Eşit büyüklükte iki kuvvet (F = 10 N); aradaki açıyı değiştir. R² = F² + F² + 2F²cosα. 0°’de 20 N, 60°’de F√3, 90°’de F√2, 120°’de F, 180°’de 0. Alttaki şerit |a − b| ≤ R ≤ a + b aralığını gösterir; bileşke eş büyüklüklerin açıortayındadır.",
  alt: "Ortak başlangıçlı iki eşit kuvvet oku ve aralarındaki açı; paralelkenarın köşegeni olarak bileşke ok; altta 0 ile 20 N arasında bileşke büyüklüğünü işaretleyen şerit.",
  param: { label: "Açı α", min: 0, max: 180, step: 15, init: 60, unit: "°", plain: true },
  draw: (a) => {
    const F = 10, K = 0.22, r = (a * Math.PI) / 180;
    const O = v(0, 0), P = v(F * K, 0), Q = v(F * K * Math.cos(r), F * K * Math.sin(r));
    const R = Math.sqrt(2 * F * F * (1 + Math.cos(r)));
    const T = v(P[0] + Q[0], P[1] + Q[1]);
    const els: El[] = [vec(O, P, { tone: "b", bold: true }), vec(O, Q, { tone: "c", bold: true })];
    els.push(txt(v(P[0] + 0.15, P[1] - 0.05), "F₁ = 10 N", "se", { tone: "b", small: true }));
    els.push(txt(v(Q[0] * 1.08, Q[1] * 1.08 + 0.1), "F₂ = 10 N", a > 120 ? "nw" : "n", { tone: "c", small: true }));
    if (a > 0 && a < 180) els.push(ang(O, P, Q, `${a}°`, { tone: "muted", r: 26 }));
    if (R > 0.05) {
      els.push(seg(P, T, { tone: "muted", dash: true, thin: true }), seg(Q, T, { tone: "muted", dash: true, thin: true }));
      els.push(vec(O, T, { tone: "a", bold: true }));
      if (a <= 150) els.push(txt(v(T[0] + 0.15, T[1] + 0.1), `R = ${nf(R)} N`, "ne", { tone: "a", small: true, bold: true }));
    }
    const by = -1.0, bx = (x: number) => -2.2 + x * 0.22;
    els.push(seg(v(bx(0), by), v(bx(20), by), { tone: "muted" }));
    for (const x of [0, 10, 20]) els.push(...xtick(bx(x), by, `${x} N`));
    els.push(ball(v(bx(R), by), 0.1, "a"));
    els.push(...pad(-2.8, 4.8, 4.8, -1.7));
    const special = a === 60 ? " = F√3" : a === 90 ? " = F√2" : a === 120 ? " = F" : "";
    return {
      els,
      readout: [`α = ${a}°: R = √(100 + 100 + 200·cos${a}°) = ${nf(R)} N${special}.`, "Aralık 0 ≤ R ≤ 20 N; bu dışında bir değer açı ya da işlem hatasıdır."],
    };
  },
};

const equilibrant: FigureDef = {
  caption:
    "Noktasal cisme (6, 0) N ve (0, 8) N kuvvetleri etki ediyor. Bileşke R = (6, 8) N, büyüklüğü 10 N. Dengeleyici −R = (−6, −8) N: büyüklüğü eşit, yönü zıt. Net kuvvetin sıfır olması ivmenin sıfır olduğunu söyler; cismin durduğunu söylemez.",
  alt: "Orijinden sağa 6 N ve yukarı 8 N kuvvet okları, kesikli bileşke oku ve ters yönde dengeleyici ok.",
  draw: () => {
    const K = 0.3, O = v(0, 0);
    const F1 = v(6 * K, 0), F2 = v(0, 8 * K), R = v(6 * K, 8 * K), E = v(-6 * K, -8 * K);
    const els: El[] = [vec(O, F1, { tone: "b", bold: true }), vec(O, F2, { tone: "c", bold: true }), seg(F1, R, { tone: "muted", dash: true, thin: true }), seg(F2, R, { tone: "muted", dash: true, thin: true })];
    els.push(vec(O, R, { tone: "a", dash: true }), vec(O, E, { tone: "warn", bold: true }));
    els.push(txt(v(F1[0] + 0.15, 0), "F₁ = 6 N", "e", { tone: "b", small: true }), txt(v(-0.15, F2[1]), "F₂ = 8 N", "w", { tone: "c", small: true }));
    els.push(txt(v(R[0] + 0.1, R[1] + 0.1), "R = 10 N", "ne", { tone: "a", small: true, bold: true }), txt(v(E[0] - 0.1, E[1]), "−R = (−6, −8) N", "w", { tone: "warn", small: true, bold: true }));
    els.push(...pad(-4.6, 3, 4, -2.8));
    return { els, readout: ["R = (6 + 0, 0 + 8) = (6, 8) N; |R| = √(36 + 64) = 10 N.", "Dengeleyici −R = (−6, −8) N; üç kuvvetin toplamı (0, 0)."] };
  },
};

/* ===================== Bağıl hareket ===================== */

const minusObserver: FigureDef = {
  caption:
    "Doğu pozitif. A yere göre doğuya 20 m/s gidiyor; B’nin yer hızını değiştir. vA/B = vA − vB. Aynı yönde hızlar çıkarılır (20 − 12 = 8), zıt yönde süratler toplanmış olur (20 − (−5) = 25). Ters sıra vB/A = −vA/B verir.",
  alt: "Üç yatay şerit: A’nın ve B’nin yere göre hız okları, en altta A’nın B’ye göre hız oku; okların uzunlukları hızlarla orantılı.",
  param: { label: "B’nin yer hızı", min: -20, max: 20, step: 1, init: 12, unit: " m/s", plain: true },
  draw: (vb) => {
    const K = 0.11, va = 20, rel = va - vb;
    const rows: [string, number, "b" | "c" | "a", number][] = [
      ["A/yer", va, "b", 1.6],
      ["B/yer", vb, "c", 0.8],
      ["A/B", rel, "a", -0.4],
    ];
    const els: El[] = [seg(v(0, -0.9), v(0, 2.0), { tone: "muted", thin: true, dash: true })];
    for (const [name, s, tone, y] of rows) {
      els.push(txt(v(-0.3, y), name, "w", { tone, small: true, bold: true }));
      if (Math.abs(s) > 0.01) els.push(vec(v(0, y), v(s * K, y), { tone, bold: true }));
      els.push(txt(v(s >= 0 ? s * K + 0.15 : 0.15, y), `${nf(s)} m/s`, "e", { tone, small: true }));
    }
    els.push(...pad(-1.6, 2.3, 5, -1.2));
    return {
      els,
      readout: [
        `vA/B = 20 − (${nf(vb)}) = ${nf(rel)} m/s${rel === 0 ? ": birbirlerine göre durgun" : rel > 0 ? " (doğuya)" : " (batıya)"}; vB/A = ${nf(-rel)} m/s.`,
        vb < 0 ? "Zıt yönlü hareket: bağıl sürat iki süratin toplamıdır." : "Aynı yönlü hareket: bağıl sürat süratlerin farkıdır.",
      ],
    };
  },
};

const chain: FigureDef = {
  caption:
    "Otobüs yere göre doğuya 12 m/s gidiyor; yolcunun otobüse göre hızını değiştir. vYolcu/yer = vYolcu/otobüs + vOtobüs/yer. Batıya 2 m/s yürüyen yolcu yere göre doğuya 10 m/s gider: otobüs katkısı yürüyüşü silmez, onunla toplanır.",
  alt: "Üstte otobüs ve içinde yolcu; altta uç uca eklenmiş otobüs hızı ve yolcunun otobüse göre hızı, başlangıçtan son uca yolcunun yere göre hız oku.",
  param: { label: "Yolcu/otobüs", min: -6, max: 6, step: 1, init: -2, unit: " m/s", plain: true },
  draw: (vp) => {
    const K = 0.25, vb = 12, tot = vb + vp;
    const els: El[] = [box(0, 1.6, 4.4, 2.7, "muted"), ball(v(2.6, 2.05), 0.18, "c"), txt(v(0.2, 2.9), "otobüs", "e", { tone: "muted", small: true })];
    if (vp !== 0) els.push(vec(v(2.6, 2.35), v(2.6 + vp * 0.12, 2.35), { tone: "c" }));
    els.push(seg(v(0, 1.4), v(0, -1.6), { tone: "muted", thin: true, dash: true }));
    els.push(vec(v(0, 0.8), v(vb * K, 0.8), { tone: "b", bold: true }), txt(v(vb * K / 2, 1.05), "otobüs/yer 12", "n", { tone: "b", small: true }));
    if (vp !== 0) els.push(vec(v(vb * K, 0.8), v(tot * K, 0.8), { tone: "c", bold: true }), txt(v(((vb + tot) / 2) * K, 0.55), `${nf(vp)}`, "s", { tone: "c", small: true, bold: true }));
    els.push(vec(v(0, -0.6), v(tot * K, -0.6), { tone: "a", bold: true }), txt(v(tot * K / 2, -0.85), `yolcu/yer = ${nf(tot)} m/s`, "s", { tone: "a", small: true, bold: true }));
    els.push(...pad(-0.6, 3.2, 5.2, -1.8));
    return { els, readout: [`vYolcu/yer = ${nf(vp)} + 12 = ${nf(tot)} m/s (doğuya).`, "Üçüncü bir gözlemci için önce yolcunun yer hızını bul, sonra gözlemcinin yer hızını çıkar."] };
  },
};

const relative2d: FigureDef = {
  caption:
    "A doğuya (8, 0) m/s, B kuzeye (0, 6) m/s gidiyor. B’nin A’ya göre hızı vB − vA = (−8, 6) m/s: kuzeybatı. Bağıl sürat √(8² + 6²) = 10 m/s; 8 − 6 ya da 8 + 6 değildir.",
  alt: "Ortak başlangıçlı vA ve vB okları; adıma göre vB’nin ucuna eklenen −vA oku ve sonuç vB/A oku.",
  steps: ["Yere göre hızlar", "vB + (−vA)", "vB/A = (−8, 6)"],
  draw: (_v, step) => {
    const K = 0.32, O = v(0, 0), A = v(8 * K, 0), B = v(0, 6 * K), R = v(-8 * K, 6 * K);
    const els: El[] = [vec(O, A, { tone: "b", bold: true }), vec(O, B, { tone: "c", bold: true })];
    els.push(txt(v(A[0] + 0.15, 0), "vA = 8", "e", { tone: "b", small: true }), txt(v(0.15, B[1] + 0.05), "vB = 6", "ne", { tone: "c", small: true }));
    if (step >= 1) els.push(vec(B, R, { tone: "b", dash: true }), txt(v(-4 * K, 6 * K + 0.3), "−vA", "n", { tone: "b", small: true, bold: true }));
    if (step >= 1) els.push(vec(O, R, { tone: "a", bold: true }), txt(beside(O, R, 0.4), step === 2 ? "|vB/A| = 10" : "vB/A", "c", { tone: "a", small: true, bold: true }));
    els.push(...pad(-3.6, 2.8, 4.2, -0.6));
    return { els, readout: ["vB/A = (0 − 8, 6 − 0) = (−8, 6) m/s; büyüklük √(64 + 36) = 10 m/s.", "Her iki yer hızına aynı c eklenirse fark değişmez: (vB + c) − (vA + c) = vB − vA."] };
  },
};

const RELV: [number, number][] = [
  [-3, -4],
  [-3, 0],
];
const meeting: FigureDef = {
  caption:
    "B gözlemcisi orijinde; A’nın B’ye göre başlangıç konumu (30, 40) m. Zamanı ilerlet: bağıl konum r = r₀ + v·t. Bağıl hız (−3, −4) m/s ise iki bileşen 10 s’de birlikte sıfırlanır: karşılaşma. (−3, 0) ise x sıfırlansa da 40 m y farkı kalır.",
  alt: "B’ye göre koordinat düzlemi; A’nın başlangıç konumundan çıkan kesikli bağıl yol, seçili andaki A konumu ve A ile B arasındaki uzaklık çizgisi.",
  steps: RELV.map(([x, y]) => `v_bağıl = (${nf(x)}, ${nf(y)})`),
  param: { label: "Zaman t", min: 0, max: 14, step: 1, init: 4, unit: " s", plain: true },
  draw: (t, step) => {
    const K = 0.07, [vx, vy] = RELV[step];
    const P = (s: number): V => v((30 + vx * s) * K, (40 + vy * s) * K);
    const els: El[] = [...plane(-1.2, 3.2, -0.6, 3.4)];
    els.push(seg(P(0), P(14), { tone: "c", dash: true, thin: true }), ball(v(0, 0), 0.12, "b"), txt(v(0.2, -0.2), "B", "se", { tone: "b", bold: true }));
    const now = P(t), dist = Math.hypot(30 + vx * t, 40 + vy * t);
    if (dist > 0.5) els.push(seg(v(0, 0), now, { tone: "warn", thin: true }));
    els.push(ball(now, 0.12, "a"), t <= 10 ? txt(v(now[0] + 0.2, now[1] + 0.1), "A", "ne", { tone: "a", bold: true }) : txt(v(now[0] - 0.2, now[1] - 0.1), "A", "sw", { tone: "a", bold: true }));
    els.push(pt(P(0), undefined, "ne", "muted", true));
    els.push(...pad(-1.8, 3.8, 3.8, -1.2));
    return {
      els,
      readout: [
        `t = ${t} s: r = (${nf(30 + vx * t)}, ${nf(40 + vy * t)}) m, uzaklık ${nf(dist)} m.`,
        step === 0 ? "x = 30 − 3t ve y = 40 − 4t ikisi de t = 10 s’de sıfır: aynı anda aynı yer, karşılaşma." : "x = 30 − 3t, 10 s’de sıfır; y = 40 m sabit. Tek ekseni denetlemek yetmez: karşılaşma yok.",
      ],
    };
  },
};

const sameTimeMeeting: FigureDef = {
  caption: "Zamanı değiştir. A düz, B kesikli yolu izler. Yollar eksenlerde kesişiyor. B başlangıçta bir metre yukarıdayken aynı andaki konumları karşılaştır.",
  alt: "Yere göre iki konum. A, (0; 0) noktasından sağa ve yukarı hareket eder. B, x = 12 metresinde aşağı iner. Bir sürgü her iki cismin aynı andaki konumunu gösterir.",
  steps: ["B 8 metreden başlıyor", "B 9 metreden başlıyor"],
  param: { label: "İki cisim için ortak zaman", min: 0, max: 6, step: 0.5, init: 4, unit: " s", plain: true },
  draw: (time, step) => {
    const startB = step === 0 ? 8 : 9;
    const aAt = (t: number): V => v(3 * t, t);
    const bAt = (t: number): V => v(12, startB - t);
    const point = ([x, y]: V): V => v(x * 0.32, y * 0.32);
    const a = aAt(time);
    const b = bAt(time);
    const together = a[0] === b[0] && a[1] === b[1];
    const coordinates = ([x, y]: V) => `(${nf(x)}; ${nf(y)})`;
    const els: El[] = [
      ...plane(-0.45, 6.18, -0.35, 3.16),
      seg(point(aAt(0)), point(aAt(6)), { tone: "b", bold: true }),
      seg(point(bAt(0)), point(bAt(6)), { tone: "a", bold: true, dash: true }),
      ...pad(-0.8, 3.72, 6.8, -0.95),
    ];
    for (const x of [6, 12, 18]) els.push(txt(point(v(x, 0)), String(x), "s", { small: true }));
    for (const y of [4, 8]) els.push(txt(point(v(0, y)), String(y), "w", { small: true }));
    if (together) {
      els.push(pt(point(a), "A ve B", "ne", "c"));
    } else {
      els.push(
        pt(point(a), "A", "nw", "b"),
        pt(point(b), "B", "se", "a"),
      );
    }
    return {
      els,
      readout: [
        `t = ${nf(time)} s: A${coordinates(a)} m, B${coordinates(b)} m.`,
        together ? "Aynı anda aynı konumdalar." : "Bu anda konumları farklı.",
        step === 0
          ? "x ve y eşitliği 4 s ister. İkisi (12; 4) m noktasında buluşur."
          : "x eşitliği 4 s, y eşitliği 4,5 s ister. Bu yüzden buluşmazlar.",
      ],
    };
  },
};

/* ===================== Nehir problemleri ===================== */

const RIVER = { d: 120, s: 5, a: 3 };
function riverEls(K: number, x0: number, x1: number): El[] {
  const H = RIVER.d * K;
  const els: El[] = [seg(v(x0 * K, 0), v(x1 * K, 0), { tone: "muted", bold: true }), seg(v(x0 * K, H), v(x1 * K, H), { tone: "muted", bold: true })];
  els.push(vec(v((x1 - 70) * K, H * 0.5), v((x1 - 25) * K, H * 0.5), { tone: "c", thin: true }), txt(v((x1 - 47) * K, H * 0.5 + 0.12), "akıntı 3 m/s", "n", { tone: "c", small: true }));
  return els;
}
const drift: FigureDef = {
  caption:
    "Genişlik 120 m, motorun suya göre sürati 5 m/s, akıntı 3 m/s. Burun açısını kıyıya dik yönden ölçüp değiştir: karşıya bileşen vy = 5cosθ süreyi, kıyı boyunca vx = 3 + 5sinθ sürüklenmeyi belirler. θ = 0’da t = 24 s, sürüklenme 72 m.",
  alt: "İki paralel kıyı arasında motorun başlangıç noktası, tam karşı nokta, kıyıya göre düz yol ve varış noktası; başlangıçta motorun suya göre hızı, akıntı ve bileşke hız okları.",
  param: { label: "Burun açısı θ (dikten)", min: -45, max: 45, step: 5, init: 0, unit: "°", plain: true },
  draw: (th) => {
    const K = 0.022, { d, s, a } = RIVER, r = (th * Math.PI) / 180;
    const vx = a + s * Math.sin(r), vy = s * Math.cos(r), t = d / vy, x = vx * t;
    const els: El[] = riverEls(K, -40, 240);
    const O = v(0, 0), End = v(x * K, d * K);
    els.push(pt(v(0, d * K), undefined, "n", "muted", true), seg(O, v(0, d * K), { tone: "muted", thin: true, dash: true }));
    els.push(seg(O, End, { tone: "a", bold: true }), ball(End, 0.08, "a"), txt(v(End[0], End[1] + 0.12), `x = ${nf(x, 1)} m`, "n", { tone: "a", small: true, bold: true }));
    const S = 0.14, M = v(s * Math.sin(r) * S, s * Math.cos(r) * S), T = v(M[0] + a * S, M[1]);
    els.push(vec(O, M, { tone: "b", bold: true }), vec(M, T, { tone: "c" }), txt(v(M[0] - 0.12, M[1]), "5 m/s", "w", { tone: "b", small: true }));
    els.push(txt(v(-0.15, d * K * 0.72), "d = 120 m", "w", { tone: "muted", small: true }));
    els.push(...pad(-1.6, d * K + 0.6, 240 * K + 0.3, -0.3));
    return {
      els,
      readout: [
        `vy = 5cos${th}° = ${nf(vy)} m/s ⇒ t = 120/${nf(vy)} = ${nf(t, 1)} s; vx = 3 + 5sin${th}° = ${nf(vx)} m/s ⇒ x = ${nf(x, 1)} m.`,
        `Kıyıya göre yol √(120² + x²) = ${nf(Math.hypot(d, x), 1)} m; suya göre yol 5·t = ${nf(s * t, 1)} m.`,
      ],
    };
  },
};

const shortest: FigureDef = {
  caption:
    "Aynı nehir (120 m, 5 m/s, 3 m/s). En kısa süre için burun kıyıya dik: t = 120/5 = 24 s, ama 72 m aşağıya varılır. Tam karşıya çıkmak için 5sinθ = −3: karşıya bileşen √(25 − 9) = 4 m/s, süre 30 s. Kısa yol daha uzun sürer.",
  alt: "İki kıyı arasında iki yol: kıyıya dik yönelmede eğik yol ve aşağı akışta varış; akıntıya karşı yönelmede tam karşıya düz yol. Her yolun başında hız üçgeni.",
  steps: ["En kısa süre", "Tam karşıya varış"],
  draw: (_v, step) => {
    const K = 0.022, { d, s, a } = RIVER;
    const els: El[] = riverEls(K, -40, 140);
    const O = v(0, 0), S = 0.14;
    const paths = [
      { end: v(72 * K, d * K), M: v(0, s * S), label: "t = 24 s, x = 72 m" },
      { end: v(0, d * K), M: v(-a * S, 4 * S), label: "t = 30 s, x = 0" },
    ];
    paths.forEach((p, i) => {
      const on = i === step;
      els.push(seg(O, p.end, on ? { tone: "a", bold: true } : { tone: "muted", dash: true, thin: true }));
      if (on) {
        els.push(ball(p.end, 0.08, "a"), txt(v(p.end[0] + 0.1, p.end[1] + 0.12), p.label, "n", { tone: "a", small: true, bold: true }));
        els.push(vec(O, p.M, { tone: "b", bold: true }), vec(p.M, v(p.M[0] + a * S, p.M[1]), { tone: "c" }));
      }
    });
    els.push(...pad(-1.6, d * K + 0.6, 140 * K + 0.3, -0.3));
    return {
      els,
      readout:
        step === 0
          ? ["θ = 0: vy = 5 m/s, t = 24 s; vx = 3 m/s, sürüklenme 72 m.", "Karşıya bileşen en fazla s olabilir; bu yüzden süre en kısa budur."]
          : ["5sinθ = −3 ⇒ sinθ = −0,6; vy = 5·0,8 = 4 m/s, t = 120/4 = 30 s; x = 0.", "|a| < s olduğu için bu yön seçilebilir; |a| ≥ s olsaydı tam karşıya sonlu sürede varılamazdı."],
    };
  },
};

const downUp: FigureDef = {
  caption:
    "Kıyı boyunca 60 m aşağı, sonra 60 m yukarı; motorun suya göre sürati 5 m/s. Akıntıyı değiştir: aşağı hız 5 + a, yukarı hız 5 − a. Yukarı bacak her zaman daha uzun sürer; ortalama sürat toplam yol / toplam süredir, iki süratin düz ortalaması değildir.",
  alt: "İki yatay çubuk: üstte aşağı akış bacağının süresi, altta yukarı akış bacağının süresi; çubuk boyları saniye ile orantılı, altta zaman ekseni.",
  param: { label: "Akıntı a", min: 0, max: 4, step: 0.5, init: 3, unit: " m/s" },
  draw: (a) => {
    const s = 5, L = 60, K = 0.08;
    const t1 = L / (s + a), t2 = L / (s - a), avg = (2 * L) / (t1 + t2);
    const els: El[] = [box(0, 1.0, t1 * K, 1.5, "b"), box(0, 0.1, t2 * K, 0.6, "warn")];
    els.push(txt(v(-0.15, 1.25), `aşağı ${nf(s + a, 1)} m/s`, "w", { tone: "b", small: true }), txt(v(-0.15, 0.35), `yukarı ${nf(s - a, 1)} m/s`, "w", { tone: "warn", small: true }));
    els.push(txt(v(t1 * K + 0.12, 1.25), `${nf(t1, 1)} s`, "e", { tone: "b", small: true, bold: true }), txt(v(t2 * K + 0.12, 0.35), `${nf(t2, 1)} s`, "e", { tone: "warn", small: true, bold: true }));
    els.push(seg(v(0, -0.15), v(60 * K, -0.15), { tone: "muted", thin: true }));
    for (const x of [0, 20, 40, 60]) els.push(...xtick(x * K, -0.15, `${x} s`));
    els.push(...pad(-3.2, 1.9, 60 * K + 1.2, -0.7));
    return { els, readout: [`t = 60/${nf(s + a, 1)} + 60/${nf(s - a, 1)} = ${nf(t1 + t2, 2)} s; ortalama sürat 120/${nf(t1 + t2, 2)} = ${nf(avg, 2)} m/s.`, `Düz ortalama (${nf(s + a, 1)} + ${nf(s - a, 1)})/2 = 5 m/s olurdu; akıntı arttıkça gerçek ortalama düşer.`] };
  },
};

const swimmers: FigureDef = {
  caption:
    "Aynı düzgün akıntı (2, 0) m/s. K/su = (0, 4), L/su = (−3, 4). Kıyı hızları (2, 4) ve (−1, 4) olur. K/L farkı (3, 0) m/s: ortak akıntı farkta sadeleşir, ama kıyıdaki varış noktalarını yine değiştirir.",
  alt: "Ortak başlangıçlı K ve L hız okları; adıma göre her okun ucuna eklenen akıntı oku ve kıyı hızları; son adımda L’nin kıyı hızının ucundan K’nınkine giden fark oku.",
  steps: ["Suya göre", "Akıntıyı ekle", "K/L farkı"],
  draw: (_v, step) => {
    const S = 0.55, O = v(0, 0);
    const K0 = v(0, 4 * S), L0 = v(-3 * S, 4 * S), K1 = v(2 * S, 4 * S), L1 = v(-1 * S, 4 * S);
    const els: El[] = [];
    if (step === 0) {
      els.push(vec(O, K0, { tone: "b", bold: true }), vec(O, L0, { tone: "c", bold: true }));
      els.push(txt(v(K0[0] + 0.15, K0[1]), "K/su (0, 4)", "e", { tone: "b", small: true }), txt(v(L0[0] - 0.15, L0[1]), "L/su (−3, 4)", "w", { tone: "c", small: true }));
    } else {
      els.push(vec(O, K0, { tone: "b", thin: true, dash: true }), vec(O, L0, { tone: "c", thin: true, dash: true }));
      els.push(vec(K0, K1, { tone: "muted" }), vec(L0, L1, { tone: "muted" }));
      els.push(vec(O, K1, { tone: "b", bold: true }), vec(O, L1, { tone: "c", bold: true }));
      els.push(txt(v(K1[0] + 0.15, K1[1]), "K (2, 4)", "e", { tone: "b", small: true, bold: true }), txt(v(L0[0] - 0.15, L0[1]), "L (−1, 4)", "w", { tone: "c", small: true, bold: true }));
      if (step === 2) els.push(vec(L1, K1, { tone: "a", bold: true }), txt(v(0.5 * S, 4 * S + 0.3), "K/L = (3, 0)", "n", { tone: "a", small: true, bold: true }));
      else els.push(txt(v(0, 4 * S + 0.3), "akıntı (2, 0)", "n", { tone: "muted", small: true }));
    }
    els.push(...pad(-3.6, 3, 3.6, -0.4));
    return { els, readout: ["Kıyı hızları: K = (0 + 2, 4) = (2, 4), L = (−3 + 2, 4) = (−1, 4) m/s.", "K/L = (2 − (−1), 4 − 4) = (3, 0) m/s = K/su − L/su; akıntılar farklı olsaydı fark kalırdı."] };
  },
};

/* ===================== Düşey atış ===================== */

const yAt = (y0: number, v0: number, t: number) => y0 + v0 * t - (G * t * t) / 2;

const apex: FigureDef = {
  caption:
    "Yerden yukarı 30 m/s atılan top (yukarı +). Zamanı kaydır: soldaki sütunda topun yüksekliği ve hız oku, sağda y–t eğrisi. Tepede (t = 3 s, 45 m) yalnız hız sıfırdır; ivme oku uçuş boyunca −10 m/s² olarak aynı kalır.",
  alt: "Solda düşey sütunda top, yukarı ya da aşağı hız oku ve sabit aşağı ivme oku; sağda y–t parabolü, seçili andaki nokta ve tepe noktasına inen kesikli çizgiler.",
  param: { label: "Zaman t", min: 0, max: 6, step: 0.25, init: 1, unit: " s" },
  draw: (t) => {
    const v0 = 30, KY = 0.065, KT = 0.75, gx = 1.2;
    const y = yAt(0, v0, t), vv = v0 - G * t;
    const els: El[] = [seg(v(-1.4, 0), v(-0.4, 0), { tone: "muted", bold: true })];
    const bp = v(-0.9, y * KY);
    els.push(ball(bp, 0.13, "a"));
    if (Math.abs(vv) > 0.01) els.push(vec(v(bp[0] - 0.25, bp[1]), v(bp[0] - 0.25, bp[1] + vv * 0.035), { tone: "b", bold: true }));
    els.push(vec(v(bp[0] + 0.25, bp[1]), v(bp[0] + 0.25, bp[1] - 0.5), { tone: "warn" }));
    els.push(txt(v(bp[0] - 0.4, bp[1] + 0.05), `v = ${nf(vv)}`, "w", { tone: "b", small: true, bold: true }), txt(v(bp[0] + 0.4, bp[1] - 0.3), "a = −10", "e", { tone: "warn", small: true }));
    const X = (s: number) => gx + s * KT, Y = (h: number) => h * KY;
    els.push(...axes(v(gx, 0), 6 * KT + 0.4, 50 * KY, "t (s)", "y (m)"));
    els.push(poly(curve((s) => yAt(0, v0, s), 0, 6, 48, X, Y), { open: true, tone: "a", smooth: true }));
    els.push(seg(v(X(3), 0), v(X(3), Y(45)), { tone: "muted", dash: true, thin: true }), seg(v(gx, Y(45)), v(X(3), Y(45)), { tone: "muted", dash: true, thin: true }));
    for (const s of [3, 6]) els.push(...xtick(X(s), 0, String(s)));
    els.push(...ytick(gx, Y(45), "45"));
    els.push(ball(v(X(t), Y(y)), 0.09, "a"));
    els.push(...pad(-3.2, 50 * KY + 0.5, X(6) + 1.0, -0.5));
    return {
      els,
      readout: [
        `t = ${nf(t)} s: v = 30 − 10t = ${nf(vv)} m/s, y = 30t − 5t² = ${nf(y)} m${t === 3 ? " (tepe: v = 0, a = −10 m/s²)" : ""}.`,
        "ttepe = v₀/g = 3 s; yükselme v₀²/(2g) = 45 m. Tepede ağırlık ve ivme sürer; tek anlık duruş denge değildir.",
      ],
    };
  },
};

const balcony: FigureDef = {
  caption:
    "Örnek: 25 m yüksek balkondan yukarı 20 m/s. Tepe 2 s’de 45 m. Balkon seviyesine dönüş 4 s’de ve −20 m/s ile olur: aynı seviyede simetri. Zemine varış ise ayrı bir olaydır: 5 s’de, −30 m/s ile. İniş çıkıştan uzun sürer.",
  alt: "y–t grafiğinde 25 m’den başlayan parabol, kesikli balkon seviyesi çizgisi, tepe noktası; seçilen adıma göre balkon seviyesine dönüş ya da zemine varış noktası işaretli.",
  steps: ["Balkon seviyesine dönüş", "Zemine varış"],
  draw: (_v, step) => {
    const y0 = 25, v0 = 20, KT = 0.85, KY = 0.065;
    const X = (s: number) => s * KT, Y = (h: number) => h * KY;
    const els: El[] = [...axes(v(0, 0), 5 * KT + 0.5, 50 * KY, "t (s)", "y (m)")];
    els.push(poly(curve((s) => yAt(y0, v0, s), 0, 5, 40, X, Y), { open: true, tone: "a", smooth: true }));
    els.push(seg(v(0, Y(25)), v(X(5) + 0.2, Y(25)), { tone: "c", dash: true, thin: true }), txt(v(X(5) + 0.25, Y(25)), "balkon", "e", { tone: "c", small: true }));
    els.push(ball(v(X(2), Y(45)), 0.08, "muted"), txt(v(X(2), Y(45) + 0.12), "tepe 45 m", "n", { tone: "muted", small: true }));
    for (const s of [2, 4, 5]) els.push(...xtick(X(s), 0, String(s)));
    els.push(...ytick(0, Y(25), "25"));
    const tE = step === 0 ? 4 : 5, vE = v0 - G * tE;
    els.push(ball(v(X(tE), Y(yAt(y0, v0, tE))), 0.1, step === 0 ? "c" : "warn"));
    els.push(txt(v(X(tE) - 0.15, Y(yAt(y0, v0, tE)) + 0.15), `v = ${nf(vE)} m/s`, "nw", { tone: step === 0 ? "c" : "warn", small: true, bold: true }));
    els.push(...pad(-0.8, 50 * KY + 0.5, X(5) + 1.6, -0.5));
    return {
      els,
      readout:
        step === 0
          ? ["25 + 20t − 5t² = 25 ⇒ t = 4 s; v = 20 − 40 = −20 m/s: aynı sürat, zıt yön.", "Simetri yalnız aynı seviyeye dönüş için geçerlidir."]
          : ["25 + 20T − 5T² = 0 ⇒ T² − 4T − 5 = 0 ⇒ T = 5 s (−1 s geçmiş uzantı); v = 20 − 50 = −30 m/s.", "Yere çarpma sürati ilk süratten büyüktür; toplam süre 2v₀/g = 4 s değildir."],
    };
  },
};

const twoRoots: FigureDef = {
  caption:
    "Yerden yukarı 30 m/s atılan top. Bir yükseklik seç: 30t − 5t² = h denkleminin iki kökü aynı seviyenin çıkış ve iniş ziyaretleridir. 25 m için 1 s ve 5 s, hızlar +20 ve −20 m/s. 45 m’de tek kök (tepe); 45 m’nin üstünde gerçek kök yoktur: erişilemez.",
  alt: "y–t parabolü ve seçilen yükseklikte yatay kesikli çizgi; çizginin parabolü kestiği noktalar ve zaman değerleri.",
  param: { label: "Yükseklik h", min: 0, max: 50, step: 5, init: 25, unit: " m", plain: true },
  draw: (h) => {
    const v0 = 30, KT = 0.75, KY = 0.065;
    const X = (s: number) => s * KT, Y = (y: number) => y * KY;
    const els: El[] = [...axes(v(0, 0), 6 * KT + 0.4, 52 * KY, "t (s)", "y (m)")];
    els.push(poly(curve((s) => yAt(0, v0, s), 0, 6, 48, X, Y), { open: true, tone: "a", smooth: true }));
    els.push(seg(v(0, Y(h)), v(X(6), Y(h)), { tone: h > 45 ? "warn" : "c", dash: true, thin: true }), ...ytick(0, Y(h), String(h)));
    const disc = v0 * v0 - 2 * G * h;
    const roots: number[] = disc < 0 ? [] : disc === 0 ? [v0 / G] : [(v0 - Math.sqrt(disc)) / G, (v0 + Math.sqrt(disc)) / G];
    roots.forEach((r, i) => {
      els.push(ball(v(X(r), Y(h)), 0.09, "c"), seg(v(X(r), 0), v(X(r), Y(h)), { tone: "muted", thin: true, dash: true }));
      els.push(txt(v(X(r), -0.12), nf(r), "s", { tone: "c", small: true, bold: true }));
      if (roots.length === 2) els.push(txt(v(X(r) + (i === 0 ? -0.15 : 0.15), Y(h) + 0.15), `${nf(v0 - G * r)} m/s`, i === 0 ? "nw" : "ne", { tone: "c", small: true }));
    });
    els.push(...pad(-0.9, 52 * KY + 0.5, X(6) + 0.9, -0.6));
    return {
      els,
      readout: [
        roots.length === 0 ? `h = ${h} m: 900 − 20h < 0, gerçek kök yok; top bu seviyeye erişemez (tepe 45 m).` : roots.length === 1 ? "h = 45 m: tek kök t = 3 s (tepe), v = 0." : `h = ${h} m: t = (30 ∓ √${disc})/10 = ${nf(roots[0])} s ve ${nf(roots[1])} s; hızlar ${nf(v0 - G * roots[0])} ve ${nf(v0 - G * roots[1])} m/s.`,
        "Kökün tepeden (3 s) önce ya da sonra oluşu hızın işaretini verir.",
      ],
    };
  },
};

const vtArea: FigureDef = {
  caption:
    "Aynı atışın v–t doğrusu: v = 30 − 10t, eğimi −g. Zamanı kaydır: eksen üstündeki alan yükselme (pozitif), eksen altındaki alan iniş (negatif). Yer değiştirme işaretli alanların toplamı, alınan yol büyüklüklerin toplamıdır.",
  alt: "v–t grafiğinde 30 m/s’den başlayıp 6 s’de −30 m/s’ye inen doğru; seçili zamana kadar eksen üstü alan bir renkte, eksen altı alan başka renkte taralı.",
  param: { label: "Zaman t", min: 0, max: 6, step: 0.5, init: 4, unit: " s" },
  draw: (t) => {
    const KT = 0.75, KV = 0.06;
    const X = (s: number) => s * KT, Y = (u: number) => u * KV, vel = (s: number) => 30 - G * s;
    const els: El[] = [...axes(v(0, 0), 6 * KT + 0.4, 34 * KV, "t (s)", "v (m/s)", 34 * KV)];
    const t1 = Math.min(t, 3);
    if (t1 > 0) els.push(poly([v(0, 0), v(0, Y(30)), v(X(t1), Y(vel(t1))), v(X(t1), 0)], { fill: "a", tone: "a", thin: true }));
    if (t > 3) els.push(poly([v(X(3), 0), v(X(t), Y(vel(t))), v(X(t), 0)], { fill: "warn", tone: "warn", thin: true }));
    els.push(seg(v(0, Y(30)), v(X(6), Y(-30)), { tone: "ink", bold: true }));
    for (const s of [3, 6]) els.push(...xtick(X(s), 0, String(s)));
    els.push(...ytick(0, Y(30), "30"), ...ytick(0, Y(-30), "−30"));
    const up = 30 * t1 - 5 * t1 * t1, down = t > 3 ? 5 * (t - 3) * (t - 3) : 0;
    if (t1 > 0) els.push(txt(v(X(t1 / 2), Y(8)), `+${nf(up)} m`, "c", { tone: "a", small: true, bold: true }));
    if (down > 0) els.push(txt(v(X((3 + 2 * t) / 3), Y(vel(t)) * 0.35), `−${nf(down)} m`, "c", { tone: "warn", small: true, bold: true }));
    els.push(...pad(-1.0, 34 * KV + 0.5, X(6) + 0.9, -34 * KV - 0.3));
    return { els, readout: [`0–${nf(t)} s: Δy = ${nf(up)} − ${nf(down)} = ${nf(up - down)} m; alınan yol ${nf(up + down)} m.`, "a–t çizgisi uçuş boyunca −10 m/s²’de kalır; tepede sıfıra zıplamaz."] };
  },
};

export const physicsFigures058Kinematics: Record<string, Record<string, FigureDef>> = {
  vektorler: {
    "Bileşen işaretini bölgeden bul": components,
    "Üç kuvveti ekle ve dengeleyiciyi çiz": threeVectorBalance,
    "Toplamı uçlarla ve sayılarla kur": addition,
    "Çıkarma, ters vektörü eklemektir": subtraction,
    "Açı, bileşkenin mümkün aralığını belirler": angleRange,
    "Dengeleyici ve üçüncü eksen": equilibrant,
  },
  "bagil-hareket": {
    "Gözlenen eksi gözlemci": minusObserver,
    "Taşıt içindeki hareketi zincirle": chain,
    "İki boyutta çıkarma, sürat çıkarma değildir": relative2d,
    "Karşılaşma için iki koordinat uyuşmalı": meeting,
    "Yollar kesişse de zamanı karşılaştır": sameTimeMeeting,
  },
  "nehir-problemleri": {
    "Sürüklenme ve alınan yollar": drift,
    "En kısa süre, en kısa yol değildir": shortest,
    "Akıntı boyunca gidiş ve dönüş": downUp,
    "İki yüzücüde ortak akış": swimmers,
  },
  "dusey-atis": {
    "Yukarı atışın tepesinde ne sıfır?": apex,
    "Aynı seviyedeki simetri koşulludur": balcony,
    "İki kök ve erişilebilir yükseklik": twoRoots,
    "Grafiklerde aynı olayı üç kez doğrula": vtArea,
  },
};
