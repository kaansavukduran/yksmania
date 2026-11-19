import { ang, ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Prizmalar ve renkler. Rays are traced with Snell's law at each face (normals
 * drawn), so deviations, total internal reflection and exits are computed, not
 * sketched. Dispersion uses red n = 1,50 and violet n = 1,56 for a 60° prism:
 * the real difference in glass is smaller; the spread is widened to be seen and
 * the caption says so. Colour mixing uses the ideal red–green–blue model.
 */

type Ray = { p: V; d: V };
const norm = (a: V): V => {
  const l = Math.hypot(a[0], a[1]) || 1;
  return v(a[0] / l, a[1] / l);
};
const dot = (a: V, b: V) => a[0] * b[0] + a[1] * b[1];
/** Intersection of ray with segment ab (t > eps), or null. */
function hit(r: Ray, a: V, b: V): { t: number; q: V } | null {
  const ex = b[0] - a[0];
  const ey = b[1] - a[1];
  const den = r.d[0] * ey - r.d[1] * ex;
  if (Math.abs(den) < 1e-9) return null;
  const t = ((a[0] - r.p[0]) * ey - (a[1] - r.p[1]) * ex) / den;
  const s = ((a[0] - r.p[0]) * r.d[1] - (a[1] - r.p[1]) * r.d[0]) / den;
  if (t < 1e-6 || s < 0 || s > 1) return null;
  return { t, q: v(r.p[0] + r.d[0] * t, r.p[1] + r.d[1] * t) };
}
/** Refract d at a surface with unit normal nrm (any side) from n1 to n2; null on total reflection. */
function refract(d: V, nrm: V, n1: number, n2: number): V | null {
  let n = nrm;
  let cos = -dot(n, d);
  if (cos < 0) {
    n = v(-n[0], -n[1]);
    cos = -cos;
  }
  const eta = n1 / n2;
  const k = 1 - eta * eta * (1 - cos * cos);
  if (k < 0) return null;
  return norm(v(eta * d[0] + (eta * cos - Math.sqrt(k)) * n[0], eta * d[1] + (eta * cos - Math.sqrt(k)) * n[1]));
}
const reflect = (d: V, n: V): V => {
  const k = 2 * dot(d, n);
  return v(d[0] - k * n[0], d[1] - k * n[1]);
};
const faceNormal = (a: V, b: V): V => norm(v(-(b[1] - a[1]), b[0] - a[0]));
const degOf = (c: number) => (Math.acos(Math.max(-1, Math.min(1, c))) * 180) / Math.PI;

/** Trace a ray through a closed glass polygon; returns path points and events. */
function traceGlass(start: Ray, poly0: V[], n: number, outLen = 4) {
  const pts: V[] = [start.p];
  let r = start;
  let inside = false;
  const events: { at: V; normal: V; kind: "giriş" | "çıkış" | "tam yansıma"; angle: number }[] = [];
  for (let step = 0; step < 6; step++) {
    let best: { t: number; q: V; i: number } | null = null;
    for (let i = 0; i < poly0.length; i++) {
      const h = hit(r, poly0[i], poly0[(i + 1) % poly0.length]);
      if (h && (!best || h.t < best.t)) best = { ...h, i };
    }
    if (!best) break;
    pts.push(best.q);
    const a = poly0[best.i];
    const b = poly0[(best.i + 1) % poly0.length];
    const nrm = faceNormal(a, b);
    const inc = degOf(Math.abs(dot(nrm, r.d)));
    if (!inside) {
      const d2 = refract(r.d, nrm, 1, n);
      if (!d2) break;
      events.push({ at: best.q, normal: nrm, kind: "giriş", angle: inc });
      r = { p: best.q, d: d2 };
      inside = true;
    } else {
      const d2 = refract(r.d, nrm, n, 1);
      if (!d2) {
        events.push({ at: best.q, normal: nrm, kind: "tam yansıma", angle: inc });
        r = { p: best.q, d: norm(reflect(r.d, nrm)) };
      } else {
        events.push({ at: best.q, normal: nrm, kind: "çıkış", angle: inc });
        r = { p: best.q, d: d2 };
        inside = false;
        pts.push(v(best.q[0] + d2[0] * outLen, best.q[1] + d2[1] * outLen));
        return { pts, events, out: d2 };
      }
    }
  }
  return { pts, events, out: r.d };
}

const normalLine = (at: V, n: V, len = 0.9): El => seg(v(at[0] - n[0] * len, at[1] - n[1] * len), v(at[0] + n[0] * len, at[1] + n[1] * len), { tone: "muted", dash: true, thin: true });

/* ---------- 1. Prizma: iki yüz, iki normal; renk ayrışması ---------- */
const H = 3 * Math.sqrt(3);
const TRI: V[] = [v(-3, 0), v(3, 0), v(0, H)];
const BAND: { name: string; n: number; tone: Tone }[] = [
  { name: "kırmızı", n: 1.5, tone: "warn" },
  { name: "yeşil", n: 1.53, tone: "c" },
  { name: "mor", n: 1.56, tone: "b" },
];
const prismFig: FigureDef = {
  caption:
    "İleri ile önce tek kırmızı ışını, sonra beyaz ışığı izle. Her yüzde ayrı normal (kesik) çizilir: girişte ışın normale yaklaşır, çıkışta uzaklaşır; iki kırılma da tabana doğru saptırır. Beyazda mor daha çok, kırmızı daha az sapar. Renk farkı görünsün diye abartıldı (camda gerçek fark daha küçüktür).",
  alt: "Eşkenar üçgen cam prizma. Soldan gelen ışın sol yüzde normale yaklaşarak kırılıyor, sağ yüzde normalden uzaklaşarak çıkıyor. Beyaz ışık adımında çıkışta kırmızı, yeşil ve mor ışınlar yelpaze gibi ayrılıyor; mor tabana daha yakın.",
  steps: ["Tek renk: kırmızı", "Beyaz ışık", "Sapma açısı"],
  draw: (_v, step) => {
    const els: El[] = [poly(TRI, { tone: "b", fill: "b" })];
    const start: Ray = { p: v(-6.2, 1.2), d: norm(v(1, 0.32)) };
    const bands = step === 0 ? [BAND[0]] : BAND;
    let first: ReturnType<typeof traceGlass> | null = null;
    bands.forEach((b, i) => {
      const tr = traceGlass(start, TRI, b.n, 4.2);
      if (!first) first = tr;
      els.push(poly(tr.pts.slice(1), { tone: b.tone, open: true, bold: true }));
      // Labels fanned out so they never overlap at the ends of close rays.
      const end = tr.pts[tr.pts.length - 1];
      const dy = bands.length > 1 ? (1 - i) * 0.55 : 0;
      els.push(txt(v(end[0] + 0.15, end[1] + dy), b.name, "e", { tone: b.tone, small: true, bold: true }));
    });
    els.push(vec(start.p, first!.pts[1], { tone: step === 0 ? "warn" : "ink", bold: true }), txt(v(start.p[0], start.p[1] + 0.25), step === 0 ? "kırmızı ışık" : "beyaz ışık", "n", { tone: step === 0 ? "warn" : "ink", small: true }));
    for (const e of first!.events) els.push(normalLine(e.at, e.normal));
    if (step === 2) {
      const ext = v(start.p[0] + start.d[0] * 13, start.p[1] + start.d[1] * 13);
      els.push(seg(first!.pts[1], ext, { tone: "muted", dash: true, thin: true }), txt(ext, "ilk doğrultu", "e", { tone: "muted", small: true }));
    }
    els.push(txt(v(-6.6, 5.8), " ", "c"), txt(v(8.4, -3.4), " ", "c"));
    const dev = (n: number) => {
      const tr = traceGlass(start, TRI, n);
      return (Math.acos(dot(start.d, tr.out)) * 180) / Math.PI;
    };
    const [inA, outA] = first!.events.map((e) => Math.round(e.angle));
    const rows: [string, string][] = [
      [`Giriş yüzünde geliş ${inA}°: havadan cama, normale yaklaşır. Çıkış yüzünde camdan havaya ${outA}° ile gelir: normalden uzaklaşır.`, "Paralel levhadaki “çıkan ışın girene paraleldir” kuralı prizmada geçmez: iki yüz birbirine eğiktir."],
      ["Beyaz ışık bileşenlerine ayrılır: mor en çok, kırmızı en az kırılır (normal dağılımlı camda n_mor > n_kırmızı).", "Yalnız kırmızı gönderilseydi tek bir sapmış kırmızı demet çıkardı; yeni renk oluşmaz."],
      [`Toplam sapma ilk doğrultuya göre ölçülür: kırmızı ≈ ${Math.round(dev(1.5))}°, mor ≈ ${Math.round(dev(1.56))}° (bu çizimin abartılı indisleriyle).`, "Sapma her iki yüzde aynı yöne (tabana doğru) birikir."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 2. Dik ikizkenar prizmada tam yansıma ---------- */
const RT: V[] = [v(0, 0), v(4, 0), v(0, 4)];
const tirFig: FigureDef = {
  caption:
    "Sürgüyle camın sınır açısını değiştir. Işın kısa yüze dik girer (kırılmaz) ve hipotenüse 45° ile ulaşır. Sınır açısı 45°'den küçükse tam yansıma olur ve ışın 90° dönüp öbür kısa yüzden çıkar; büyükse ışın hipotenüsten dışarı kırılır.",
  alt: "Dik ikizkenar cam prizma; soldan yatay gelen ışın dik kenara dik giriyor, hipotenüse çarpıyor. Sınır açısına göre ya aşağı yansıyıp alt yüzden çıkıyor ya da hipotenüsten dışarı kırılıyor.",
  param: { label: "Sınır açısı", min: 38, max: 50, step: 1, init: 42, unit: "°" },
  draw: (crit) => {
    const n = 1 / Math.sin((crit * Math.PI) / 180);
    const els: El[] = [poly(RT, { tone: "b", fill: "b" })];
    const start: Ray = { p: v(-3, 2.6), d: v(1, 0) };
    const tr = traceGlass(start, RT, n, 3.2);
    els.push(poly(tr.pts, { tone: "warn", open: true, bold: true }));
    const hyp = tr.events.find((e) => e.kind !== "giriş");
    if (hyp) {
      els.push(normalLine(hyp.at, hyp.normal, 1.2));
      const back = v(hyp.at[0] - 1, hyp.at[1]);
      const nIn = v(hyp.at[0] - hyp.normal[0], hyp.at[1] - hyp.normal[1]);
      els.push(ang(hyp.at, back, nIn, "45°", { tone: "warn", r: 30 }));
    }
    const tir = tr.events.some((e) => e.kind === "tam yansıma");
    els.push(txt(v(-3.4, 5.4), " ", "c"), txt(v(6.6, -3.4), " ", "c"));
    return {
      els,
      readout: [
        `Sınır açısı ${crit}° (n ≈ ${n.toLocaleString("tr-TR", { maximumFractionDigits: 2 })}): hipotenüste geliş 45° ${tir ? ">" : crit === 45 ? "=" : "<"} ${crit}° → ${tir ? "tam yansıma; ışın aşağı döner, alt yüze dik çarpıp yön değiştirmeden çıkar" : crit === 45 ? "sınır durumu: kırılan ışın yüzeyi yalayarak gider" : "ışın hipotenüsten havaya kırılarak çıkar"}.`,
        "Tam yansıma için iki koşul: ışık yoğundan az yoğuna (camdan havaya) gidiyor ve geliş açısı sınır açısından büyük.",
      ],
    };
  },
};

/* ---------- 3. Işık ekleme ---------- */
const additive: FigureDef = {
  caption:
    "İleri ile kırmızı, yeşil ve mavi ışık lekelerini üst üste düşür. Işıklar toplanır: kırmızı + yeşil = sarı, yeşil + mavi = camgöbeği, kırmızı + mavi = macenta, üçü uygun dengede beyaz.",
  alt: "Karanlık zeminde üst üste binen üç renkli ışık dairesi: kırmızı, yeşil ve mavi; ikili kesişimlerde sarı, camgöbeği, macenta, ortada beyaz yazıyor.",
  steps: ["Kırmızı + yeşil", "+ mavi", "Adlar"],
  draw: (_v, step) => {
    const R = 1.7;
    const cR = v(-0.9, 0.55);
    const cG = v(0.9, 0.55);
    const cB = v(0, -1.0);
    const els: El[] = [circle(cR, R, { tone: "warn", fill: "warn" }), circle(cG, R, { tone: "c", fill: "c" })];
    if (step >= 1) els.push(circle(cB, R, { tone: "b", fill: "b" }));
    els.push(txt(v(-2, 1.4), "kırmızı", "c", { tone: "warn", small: true, bold: true }), txt(v(2, 1.4), "yeşil", "c", { tone: "c", small: true, bold: true }));
    if (step >= 1) els.push(txt(v(0, -2.2), "mavi", "c", { tone: "b", small: true, bold: true }));
    els.push(txt(v(0, 1.25), "sarı", "c", { tone: "ink", small: true, bold: true }));
    if (step >= 2) {
      els.push(txt(v(1.1, -0.5), "camgöbeği", "c", { tone: "ink", small: true, bold: true }), txt(v(-1.1, -0.5), "macenta", "c", { tone: "ink", small: true, bold: true }), txt(v(0, 0.1), "beyaz", "c", { tone: "ink", small: true, bold: true }));
    }
    els.push(txt(v(-3.2, 2.6), " ", "c"), txt(v(3.2, -3.1), " ", "c"));
    const rows: [string, string][] = [
      ["Kırmızı + yeşil ışık → sarı algısı.", "Işıklarda bileşenler birleşir (toplama). Boyada aynı adlar başka sonuç verir."],
      ["Üç bileşen uygun dengede üst üste düşünce beyaz görünür.", "Yeşil + mavi = camgöbeği; kırmızı + mavi = macenta."],
      ["Sarı = K + Y · Camgöbeği = Y + M · Macenta = K + M · Beyaz = K + Y + M.", "Bu ideal üç bileşen modelidir; gerçek kaynakların tayfı daha geniştir."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- 4. Filtre ve yüzey: ortak bileşen ---------- */
type Set3 = [boolean, boolean, boolean];
const TONES: Tone[] = ["warn", "c", "b"];
const NAMES = ["K", "Y", "M"];
const chainFig: FigureDef = {
  caption:
    "İleri ile her aşamada kalan ışık bileşenlerini izle (K kırmızı, Y yeşil, M mavi). Filtre yalnız geçirir, yüzey yalnız yansıtır: ikisi de olmayan bir bileşeni üretemez. Sonuç her zaman gelen ile izin verilenin ortak kısmıdır.",
  alt: "Soldan sağa üç kutu: gelen ışık, filtre veya yüzeyin izin verdikleri ve göze ulaşan; her kutuda kırmızı, yeşil, mavi top yerleri, var olanlar renkli, olmayanlar boş halka.",
  steps: ["Beyaz → camgöbeği filtre → sarı kart", "Sarı ışık → beyaz kart", "Sarı ışık → camgöbeği kart", "Sarı ışık → mavi kart (2019 TYT Fen 7)"],
  draw: (_v, step) => {
    const cases: { a: Set3; b: Set3; c?: Set3; la: string; lb: string; lc?: string }[] = [
      { a: [true, true, true], b: [false, true, true], c: [true, true, false], la: "beyaz ışık", lb: "camgöbeği filtre", lc: "sarı kart" },
      { a: [true, true, false], b: [true, true, true], la: "sarı ışık", lb: "beyaz kart" },
      { a: [true, true, false], b: [false, true, true], la: "sarı ışık", lb: "camgöbeği kart" },
      { a: [true, true, false], b: [false, false, true], la: "sarı ışık", lb: "mavi kart" },
    ];
    const cs = cases[step];
    const stages: [Set3, string][] = [
      [cs.a, cs.la],
      [cs.b, cs.lb],
    ];
    if (cs.c) stages.push([cs.c, cs.lc!]);
    let cur: Set3 = cs.a;
    const outs: Set3[] = [cs.a];
    for (const [s] of stages.slice(1)) {
      cur = [cur[0] && s[0], cur[1] && s[1], cur[2] && s[2]];
      outs.push(cur);
    }
    const els: El[] = [];
    const col = (x: number, s: Set3, label: string, isResult = false) => {
      s.forEach((on, i) => {
        const p = v(x, 1 - i * 0.8);
        els.push(on ? ball(p, 0.3, TONES[i], NAMES[i]) : circle(p, 0.3, { tone: "muted", dash: true, thin: true }));
      });
      els.push(txt(v(x, -1.0), label, "s", { tone: isResult ? "ink" : "muted", small: true, bold: isResult }));
    };
    const xs = stages.length === 3 ? [0, 3.6, 7.2, 10.8] : [0, 3.6, 7.2];
    stages.forEach(([s, label], i) => col(xs[i], s, label));
    const final = outs[outs.length - 1];
    col(xs[xs.length - 1], final, "göze ulaşan", true);
    for (let i = 0; i < xs.length - 1; i++) els.push(vec(v(xs[i] + 0.55, 0.2), v(xs[i + 1] - 0.55, 0.2), { tone: "muted", thin: true }));
    els.push(txt(v(-1.4, 1.8), " ", "c"), txt(v(xs[xs.length - 1] + 1.6, -1.8), " ", "c"));
    const name = (s: Set3) => (s[0] && s[1] && s[2] ? "beyaz" : s[0] && s[1] ? "sarı" : s[1] && s[2] ? "camgöbeği" : s[0] && s[2] ? "macenta" : s[0] ? "kırmızı" : s[1] ? "yeşil" : s[2] ? "mavi" : "koyu (siyah)");
    const notes = [
      "Camgöbeği filtre Y + M geçirir; sarı kart K + Y yansıtır. Ortak bileşen yalnız yeşil.",
      "Beyaz kart gelen her bileşeni geri verir: sarı ışık altında sarı görünür, “beyaz” değil.",
      "Camgöbeği kart Y + M yansıtabilir; gelen K + Y'den yalnız Y kalır.",
      "Mavi kart yalnız M yansıtır, sarı ışıkta M yok: tabela koyu fon üstünde en zor seçilir (resmî cevap: mavi).",
    ];
    return { els, readout: [`Göze ulaşan: ${name(final)}.`, notes[step]] };
  },
};

export const physicsFiguresPrism: Record<string, Record<string, FigureDef>> = {
  "prizmalar-renkler": {
    "Prizma iki arayüzdür": prismFig,
    "Dik prizmada yansımayı açı belirler": tirFig,
    "Işık birleştirmesi toplamsaldır": additive,
    "Filtre bir bileşen yokken onu üretemez": chainFig,
  },
};
