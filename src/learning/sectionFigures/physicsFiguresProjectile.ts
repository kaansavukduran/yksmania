import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type V } from "./figureKit";

/*
 * AYT Fizik · Yatay atış. Hava direnci yok, g = 10 m/s². Koordinatlar metre;
 * şemalar ölçekli çizilir (1 m = K birim). 2025 AYT Fen 1 verileri resmî
 * kitapçıktan özetlenmiştir; çözüm özgündür.
 */

const G = 10;
const f1 = (x: number) => String(Math.round(x * 100) / 100).replace(".", ",").replace("-", "−");

function ground(K: number, xmax: number, h: number): El[] {
  return [
    seg(v(-0.3, 0), v(xmax * K + 0.3, 0), { thin: true }),
    poly([v(-0.6, 0), v(0, 0), v(0, h * K), v(-0.6, h * K)], { fill: "muted", tone: "muted", thin: true }),
    txt(v(-0.7, h * K), `${h} m`, "w", { small: true, tone: "muted" }),
  ];
}
const path = (K: number, h: number, u: number, tEnd: number): V[] => {
  const pts: V[] = [];
  for (let t = 0; t <= tEnd + 1e-9; t += tEnd / 30) pts.push(v(u * t * K, (h - (G * t * t) / 2) * K));
  return pts;
};

// 1 · Bırakılan ve atılan: aynı düşey hareket.
const sameTime: FigureDef = {
  caption:
    "Aynı 20 m yükseklikten A bırakılıyor, B 6 m/s yatay hızla atılıyor. Zamanı kaydır: iki top her an aynı yüksekliktedir, çünkü düşey ilk hızları da ivmeleri de aynıdır. B’nin hız oku iki bileşenden oluşur: sabit vₓ ve büyüyen |vᵧ| = gt.",
  alt: "Kulenin kenarından A dik aşağı, B parabol çizerek düşüyor. Seçilen anda iki top aynı yükseklikte; B’de yatay ve düşey hız okları.",
  param: { label: "Zaman t", min: 0, max: 2, step: 0.25, init: 1, unit: " s" },
  draw: (t) => {
    const h = 20, u = 6, K = 0.16;
    const y = h - (G * t * t) / 2;
    const els: El[] = [...ground(K, 13, h), poly(path(K, h, u, 2), { open: true, dash: true, thin: true, tone: "b" })];
    els.push(seg(v(0, h * K), v(0, 0), { dash: true, thin: true, tone: "c" }));
    els.push(ball(v(0, y * K), 0.16, "c"), ball(v(u * t * K, y * K), 0.16, "b"));
    els.push(seg(v(-0.2, y * K), v(u * t * K + 0.6, y * K), { thin: true, dash: true, tone: "muted" }));
    els.push(txt(v(-0.15, y * K + 0.35), "A", "w", { small: true, bold: true, tone: "c" }), txt(v(u * t * K + 0.35, y * K + 0.35), "B", "c", { small: true, bold: true, tone: "b" }));
    const bx = u * t * K, by = y * K, S = 0.07;
    if (t > 0) {
      els.push(vec(v(bx, by), v(bx + u * S, by), { tone: "a" }), vec(v(bx, by), v(bx, by - G * t * S), { tone: "warn" }), vec(v(bx, by), v(bx + u * S, by - G * t * S), { tone: "ink", thin: true }));
      els.push(txt(v(bx + u * S + 0.15, by), `vₓ = ${u}`, "e", { small: true, tone: "a" }), txt(v(bx + 0.15, by - G * t * S - 0.2), `vᵧ = −${f1(G * t)}`, "e", { small: true, tone: "warn" }));
    }
    els.push(txt(v(-2.0, h * K + 0.5), " ", "c"), txt(v(14 * K + 1.6, -0.5), " ", "c"));
    return {
      els,
      readout: [
        `t = ${f1(t)} s: ikisi de y = 20 − 5t² = ${f1(y)} m. B’nin x’i = 6·t = ${f1(u * t)} m; sürati √(6² + ${f1(G * t)}²) = ${f1(Math.hypot(u, G * t))} m/s.`,
        "Uçuş süresi düşeyden: 20 = 5t² ⇒ t = 2 s, yatay hızdan bağımsız. Dik bileşenler büyüklük olarak toplanmaz: √(vₓ² + vᵧ²).",
      ],
    };
  },
};

// 2 · Eşit zaman izleri.
const traces: FigureDef = {
  caption:
    "20 m’den yatay atış; noktalar 0,5 s arayla konumdur. Yatay hızı değiştir: yatay aralıklar eşit (u · 0,5), düşey düşüşler giderek büyür (1,25 m, 3,75 m, 6,25 m, 8,75 m). Uçuş süresi her durumda 2 s.",
  alt: "Parabol üzerinde eşit zaman aralıklı beş nokta; yatay aralıklar eşit, düşey aralıklar artıyor.",
  param: { label: "Yatay hız u", min: 2, max: 12, step: 1, init: 6, unit: " m/s", plain: true },
  draw: (u) => {
    const h = 20, K = 0.16;
    const els: El[] = [...ground(K, 25, h), poly(path(K, h, u, 2), { open: true, thin: true, tone: "b" })];
    for (let i = 0; i <= 4; i++) {
      const t = i * 0.5, x = u * t, y = h - (G * t * t) / 2;
      els.push(ball(v(x * K, y * K), 0.11, "b"));
      els.push(seg(v(x * K, 0), v(x * K, 0.12), { thin: true, tone: "muted" }));
      if (i > 0) els.push(txt(v(x * K, -0.35), f1(x), "c", { small: true, soft: true, tone: "muted" }));
    }
    els.push(txt(v(2 * u * K, 0.45), `menzil ${2 * u} m`, "c", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-2.0, h * K + 0.4), " ", "c"), txt(v(25 * K + 0.8, -0.7), " ", "c"));
    return { els, readout: [`u = ${u} m/s: her 0,5 s’de yatayda ${f1(u / 2)} m; 2 s’de menzil u·t = ${2 * u} m.`, "x–t doğrusal, y–t parabolik: yörünge parabol olsa da yatay hız sabit kalır."] };
  },
};

// 3 · Duvar: aynı anda x ve y.
const wall: FigureDef = {
  caption:
    "45 m’den yatay atış; 30 m ileride 30 m yüksek duvar. Yatay hızı değiştir: duvara varış zamanı t = 30/u, o anki yükseklik y = 45 − 5t². Menzilin 30 m’den büyük olması duvarı aştığını tek başına göstermez.",
  alt: "Yüksek bir platformdan parabol yörünge; 30 m ilerde 30 m yüksek duvar. Yörüngenin duvar düzlemindeki yüksekliği işaretli.",
  param: { label: "Yatay hız u", min: 10, max: 30, step: 1, init: 15, unit: " m/s", plain: true },
  draw: (u) => {
    const h = 45, K = 0.09, xw = 30, hw = 30;
    const tw = xw / u, yw = h - (G * tw * tw) / 2, tg = 3;
    const hits = yw < hw;
    const tEnd = hits ? tw : tg;
    const els: El[] = [...ground(K, 95, h), poly([v(xw * K, 0), v(xw * K + 0.2, 0), v(xw * K + 0.2, hw * K), v(xw * K, hw * K)], { fill: "warn", tone: "warn" })];
    els.push(txt(v(xw * K + 0.35, hw * K), "30 m", "e", { small: true, tone: "warn" }));
    els.push(poly(path(K, h, u, tEnd), { open: true, tone: hits ? "warn" : "b", bold: true }));
    els.push(ball(v(xw * K, yw * K), 0.12, hits ? "warn" : "a"), txt(v(xw * K - 0.2, yw * K + 0.35), `y = ${f1(yw)} m`, "w", { small: true, bold: true, tone: hits ? "warn" : "a" }));
    els.push(txt(v(-2.0, h * K + 0.4), " ", "c"), txt(v(95 * K + 0.6, -0.5), " ", "c"));
    return {
      els,
      readout: [
        `t = 30/${u} = ${f1(tw)} s; y = 45 − 5·${f1(tw)}² = ${f1(yw)} m ${hits ? "< 30 m: duvara çarpar" : "≥ 30 m: duvarı aşar"}.${hits ? "" : ` Menzil ${f1(u * tg)} m.`}`,
        "Yöntem: önce x’ten zamanı bul, aynı zamanı y’ye koy; x ve y aynı ana ait olmalı. u = 15 için y = 25 m: çarpar (yerde 3 s’de inerdi).",
      ],
    };
  },
};

// 4 · 2025 AYT Fen 1: hareketli hedef.
const target: FigureDef = {
  caption:
    "2025 AYT Fen 1 (resmî kitapçıktan özet): 20 m yükseklikte batıya 1 m/s giden taşıyıcıdan nesne bırakılıyor; nesne bu yatay hızı korur. Yerde doğuya 20 m/s giden otomobil nesneyle aynı anda aynı noktaya varıyor. Zamanı kaydır: yatay aralık saniyede 21 m kapanır.",
  alt: "Üstte batıya hareket eden taşıyıcı ve düşen nesne, yerde doğuya giden otomobil. Seçilen anda yatay konumlar ve aradaki uzaklık.",
  param: { label: "Zaman t", min: 0, max: 2, step: 0.25, init: 0, unit: " s" },
  draw: (t) => {
    const K = 0.15, x0 = 42;
    const xo = x0 - 1 * t, yo = 20 - (G * t * t) / 2, xc = 20 * t;
    const els: El[] = [seg(v(-0.3, 0), v(46 * K, 0), { thin: true })];
    const track: V[] = [];
    for (let s2 = 0; s2 <= 2.0001; s2 += 0.1) track.push(v((x0 - s2) * K, (20 - (G * s2 * s2) / 2) * K));
    els.push(poly(track, { open: true, dash: true, thin: true, tone: "b" }));
    els.push(ball(v(xo * K, yo * K), 0.14, "b"), txt(v(xo * K + 0.3, yo * K + 1.45), "nesne ← 1 m/s", "e", { small: true, tone: "b" }));
    els.push(poly([v(xc * K - 0.5, 0.05), v(xc * K + 0.5, 0.05), v(xc * K + 0.5, 0.35), v(xc * K - 0.5, 0.35)], { fill: "c", tone: "c" }), txt(v(xc * K, 0.65), "otomobil → 20 m/s", "c", { small: true, tone: "c" }));
    const gap = Math.max(xo - xc, 0);
    els.push(seg(v(xc * K, -0.35), v(xo * K, -0.35), { tone: "a", bold: true }), txt(v(((xc + xo) / 2) * K, -0.7), `aralık ${f1(gap)} m`, "c", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.6, 20 * K + 0.6), " ", "c"), txt(v(46 * K + 0.6, -1.0), " ", "c"));
    return {
      els,
      readout: [
        `t = ${f1(t)} s: nesne y = ${f1(yo)} m; yatay aralık 42 − 21·t = ${f1(gap)} m.`,
        "Düşey: 20 = 5t² ⇒ t = 2 s. Karşı yönlerde kapanma hızı 1 + 20 = 21 m/s ⇒ başlangıç aralığı 21 · 2 = 42 m (E). Taşıyıcının hızını silmek 40 m verirdi.",
      ],
    };
  },
};

export const physicsFiguresProjectile: Record<string, Record<string, FigureDef>> = {
  "yatay-atis": {
    "Yatay hız düşey süreyi değiştirmez mi?": sameTime,
    "Eşit zamanların konum izleri": traces,
    "Hedefi zamanla kontrol et": wall,
    "İlk yer olayı ve menzil": target,
  },
};
