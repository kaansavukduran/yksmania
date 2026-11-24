import { ang, ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type V } from "./figureKit";
import { lightModelsFigures } from "./mebiLightModelsFigures";
import { photometryUnitsFigures } from "./mebiPhotometryUnitsFigures";
import { parallelFluxFigures } from "./mebiParallelFluxFigures";

/*
 * Işık bilgisi: I (cd), Φ (lm), E (lx). The inverse-square figure shows the
 * same cone of light covering 1, 4 and 9 equal tiles at distances 1, 2, 3, so
 * the drop of E is seen as the same light spread over more area. Angles are
 * measured from the surface normal. Numbers follow the guide's examples.
 */

const fmt = (x: number, d = 2) => x.toLocaleString("tr-TR", { maximumFractionDigits: d });

/* ---------- 1. Ters kare ---------- */
const inverse: FigureDef = {
  caption:
    "Sürgüyle ekranı kaynaktan uzaklaştır (yandan görünüş). Aynı ışık konisinin ekranda kapladığı karenin kenarı uzaklıkla orantılı büyür: 1 m'de 1, 2 m'de 2 × 2 = 4, 3 m'de 3 × 3 = 9 kare: aynı akı daha geniş alana yayıldığı için E = I/d² azalır. Kaynağın I değeri (100 cd) hiç değişmez.",
  alt: "Solda parlayan noktasal kaynak; sağa açılan ışık konisi. Seçilen uzaklıkta ekranda kareli bir yüzey; uzaklık arttıkça koni içindeki kare sayısı 1, 4, 9 diye artıyor. Altta E–d eğrisi ve üzerinde seçilen nokta.",
  param: { label: "Uzaklık d", min: 1, max: 3, step: 1, init: 1, unit: "m" },
  draw: (d) => {
    const S = v(0, 0);
    const els: El[] = [];
    const k = 1.15; // half-width of the cone per metre (drawing units)
    const X = (m: number) => m * 2.2;
    els.push(poly([S, v(X(3.2), k * 3.2), v(X(3.2), -k * 3.2)], { tone: "a", fill: "a", bare: true }));
    for (const m of [1, 2, 3]) {
      const on = m === d;
      const x = X(m);
      els.push(seg(v(x, -k * m), v(x, k * m), { tone: on ? "warn" : "muted", bold: on, thin: !on, dash: !on }));
      if (on) for (let i = 1; i < m; i++) els.push(seg(v(x - 0.12, -k * m + (2 * k * i)), v(x + 0.12, -k * m + 2 * k * i), { tone: "warn", thin: true }));
      els.push(txt(v(x, -k * m - 0.25), `${m} m`, "s", { tone: on ? "warn" : "muted", small: true, bold: on }));
    }
    els.push(ball(S, 0.35, "a"), txt(v(0, 0.55), "I = 100 cd", "n", { tone: "a", small: true, bold: true }));
    // E–d graph below.
    const G0 = v(0.5, -7.8);
    const gx = (m: number) => G0[0] + (m - 0.8) * 2.4;
    const gy = (e: number) => G0[1] + e * 0.026;
    els.push(vec(v(G0[0], G0[1]), v(gx(3.5), G0[1]), { tone: "ink" }), vec(v(G0[0], G0[1]), v(G0[0], gy(118)), { tone: "ink" }));
    const curve: V[] = [];
    for (let i = 0; i <= 40; i++) {
      const m = 0.9 + (i / 40) * 2.4;
      curve.push(v(gx(m), gy(100 / (m * m))));
    }
    els.push(poly(curve, { tone: "c", open: true, bold: true, smooth: true }));
    for (const m of [1, 2, 3]) els.push(seg(v(gx(m), G0[1] - 0.08), v(gx(m), G0[1] + 0.08), { tone: "ink" }), txt(v(gx(m), G0[1] - 0.2), `${m}`, "s", { tone: "ink", small: true }));
    els.push(txt(v(gx(3.5) + 0.1, G0[1]), "d (m)", "e", { tone: "ink", small: true }), txt(v(G0[0], gy(122)), "E (lx)", "n", { tone: "ink", small: true }));
    els.push(circle(v(gx(d), gy(100 / (d * d))), 0.12, { tone: "warn", fill: "warn" }));
    els.push(txt(v(-1, 4.2), " ", "c"), txt(v(9.2, -8.8), " ", "c"));
    const tiles = d * d;
    return {
      els,
      readout: [
        `d = ${d} m: ışık ${tiles} kareye yayıldı → E = 100 / ${d}² = ${fmt(100 / (d * d))} lx`,
        "Uzaklık 2 kat → E 1/4; 3 kat → E 1/9. I kaynağa aittir, uzaklıkla değişmez; değişen yüzeydeki E'dir.",
      ],
    };
  },
};

/* ---------- 2. Açı normalle ölçülür ---------- */
const tilt: FigureDef = {
  caption:
    "Sürgüyle yüzeyi eğ. Açı θ, ışın ile yüzeyin normali (kesik dik çizgi) arasındadır. E = (I/r²)·cos θ: I = 80 cd, r = 2 m için dik gelişte 20 lx, θ = 60°'de 10 lx. Soru yüzeyle yapılan açıyı veriyorsa önce 90°'den çıkar.",
  alt: "Üstten aşağı inen paralel ışık demeti ve eğilebilen bir yüzey; yüzeye dik kesik normal çizgisi ve normal ile ışın arasında θ yayı; yüzey eğildikçe aynı demet daha uzun bir şeride yayılıyor.",
  param: { label: "Normal ile açı θ", min: 0, max: 80, step: 5, init: 60, unit: "°" },
  draw: (deg) => {
    const t = (deg * Math.PI) / 180;
    const els: El[] = [];
    const half = 1.1; // half-width of the beam
    const L = half / Math.max(Math.cos(t), 0.17); // half-length of lit strip
    const u = v(Math.cos(t), Math.sin(t)); // along surface
    const n = v(-Math.sin(t), Math.cos(t)); // surface normal (upwards)
    const surf = (s: number): V => v(u[0] * s, u[1] * s);
    els.push(seg(surf(-3.6), surf(3.6), { tone: "ink", bold: true }));
    els.push(poly([surf(-L), surf(L), v(surf(L)[0], 4), v(surf(-L)[0], 4)], { tone: "a", fill: "a", bare: true }));
    for (const x of [-half, -half / 2, 0, half / 2, half]) {
      const s = x / Math.max(Math.cos(t), 1e-3);
      const at = surf(Math.abs(s) > 3.6 ? Math.sign(s) * 3.6 : s);
      els.push(vec(v(at[0], 4), at, { tone: "a", thin: x !== 0, bold: x === 0 }));
    }
    els.push(seg(v(0, 0), v(n[0] * 2.6, n[1] * 2.6), { tone: "muted", dash: true }), txt(v(n[0] * 2.6, n[1] * 2.6), "normal", n[0] < -0.3 ? "w" : "n", { tone: "muted", small: true }));
    if (deg > 0) els.push(ang(v(0, 0), v(n[0], n[1]), v(0, 1), `θ = ${deg}°`, { tone: "warn", r: 48 }));
    els.push(txt(v(-4.2, 4.6), " ", "c"), txt(v(4.2, -3.6), " ", "c"));
    const E = 20 * Math.cos(t);
    return {
      els,
      readout: [
        `θ = ${deg}° (yüzeyle ${90 - deg}°): E = (80 / 2²) × cos ${deg}° = 20 × ${fmt(Math.cos(t), 3)} = ${fmt(E)} lx`,
        deg === 0 ? "Dik geliş: cos 0° = 1, aydınlanma en büyük." : "Aynı demet daha geniş şeride yayılır: birim alana düşen ışık azalır. θ = 90°'de (yüzeyi yalayan ışın) E = 0.",
      ],
    };
  },
};

/* ---------- 3. Küre: toplam akı sabit ---------- */
const sphere: FigureDef = {
  caption:
    "Sürgüyle kaynağı saran kürenin yarıçapını büyüt. Her yöne eşit yayan noktasal kaynakta kürenin topladığı toplam akı Φ = 4πI hep aynıdır (I = 15 cd → 60π lm ≈ 188,5 lm); aynı akı daha büyük alana yayıldığından yüzeydeki E düşer.",
  alt: "Merkezde kaynak ve her yöne çıkan on altı ışın; çevresinde yarıçapı değişen kesik bir küre kesiti ve üzerinde birim alanı temsil eden küçük bir yay parçası.",
  param: { label: "Küre yarıçapı r", min: 1, max: 3, step: 1, init: 1, unit: "m" },
  draw: (r) => {
    const els: El[] = [];
    const R = r * 1.2;
    for (let i = 0; i < 16; i++) {
      const a = (i * Math.PI) / 8;
      els.push(vec(v(Math.cos(a) * 0.45, Math.sin(a) * 0.45), v(Math.cos(a) * 3.9, Math.sin(a) * 3.9), { tone: "a", thin: true }));
    }
    els.push(circle(v(0, 0), R, { tone: "c", bold: true, dash: true }));
    // A fixed-size patch on the sphere: fewer rays cross it as r grows.
    const half = 0.5 / R;
    const arc: V[] = [];
    for (let i = 0; i <= 10; i++) {
      const a = Math.PI / 4 - half + (i / 10) * 2 * half;
      arc.push(v(Math.cos(a) * R, Math.sin(a) * R));
    }
    els.push(poly(arc, { tone: "warn", open: true, bold: true }), txt(v(Math.cos(Math.PI / 4) * (R + 0.35), Math.sin(Math.PI / 4) * (R + 0.35)), "1 m² parça", "ne", { tone: "warn", small: true, bold: true }));
    els.push(ball(v(0, 0), 0.32, "a"));
    els.push(txt(v(-4.3, 4.3), " ", "c"), txt(v(5.6, -4.3), " ", "c"));
    return {
      els,
      readout: [
        `r = ${r} m: Φ (bütün küre) = 4π × 15 = 60π ≈ 188,5 lm · E = 15 / ${r}² ≈ ${fmt(15 / (r * r))} lx`,
        "2018 TYT Fen 6 mantığı: uzaklıkla I ve tam küreye düşen toplam Φ değişmez, yüzeydeki E değişir. Küçük bir ekrana düşen kısmi akı ise sabit olmak zorunda değildir.",
      ],
    };
  },
};

/* ---------- 4. Kaynak ve görünen cisim ---------- */
const seen: FigureDef = {
  caption:
    "İleri ile lambayı yak. Kitap ışık üretmez; lambadan gelen ışığın bir kısmı kitaptan yansıyıp göze ulaşınca kitap görülür. Göz ışık göndermez, ışık alır.",
  alt: "Solda tavandan sarkan lamba, ortada masa üstünde kitap, sağda göz. Lamba yanınca lambadan kitaba, kitaptan göze giden oklu ışınlar.",
  steps: ["Karanlık oda", "Lamba yanar", "Göze ulaşan ışık"],
  draw: (_v, step) => {
    const els: El[] = [];
    const lamp = v(-3, 3);
    const book = v(0, 0.3);
    const eye = v(3.4, 1.4);
    els.push(seg(v(-3, 4.2), lamp, { tone: "muted", thin: true }), ball(lamp, 0.4, step >= 1 ? "a" : "muted"));
    els.push(seg(v(-1.6, 0), v(1.6, 0), { tone: "ink", bold: true }), poly([v(-0.7, 0), v(0.7, 0), v(0.7, 0.45), v(-0.7, 0.45)], { tone: step >= 1 ? "c" : "muted", fill: step >= 1 ? "c" : "muted" }));
    els.push(txt(v(0, -0.25), "kitap (kaynak değil)", "s", { tone: "muted", small: true }));
    // Eye: almond outline with iris.
    els.push(poly([v(eye[0] - 0.55, eye[1]), v(eye[0], eye[1] + 0.32), v(eye[0] + 0.55, eye[1]), v(eye[0], eye[1] - 0.32)], { tone: "ink", smooth: true }), circle(eye, 0.17, { tone: "b", fill: "b" }));
    els.push(txt(v(eye[0], eye[1] - 0.5), "göz", "s", { tone: "ink", small: true }), txt(v(lamp[0] - 0.5, lamp[1]), "lamba (kaynak)", "w", { tone: step >= 1 ? "a" : "muted", small: true, bold: step >= 1 }));
    if (step >= 1) for (const dx of [-0.5, 0, 0.5]) els.push(vec(v(lamp[0] + 0.3, lamp[1] - 0.3), v(book[0] + dx, book[1] + 0.15), { tone: "a", thin: true }));
    if (step >= 2) els.push(vec(v(book[0] + 0.3, book[1] + 0.25), v(eye[0] - 0.6, eye[1] - 0.05), { tone: "c", bold: true }), txt(v(1.7, 1.3), "yansıyan ışık", "n", { tone: "c", small: true, bold: true }));
    els.push(txt(v(-5.6, 4.5), " ", "c"), txt(v(4.4, -0.8), " ", "c"));
    const rows: [string, string][] = [
      ["Lamba sönük: kitaba ışık gelmez, göze de yansıyan ışık ulaşmaz. Kitabın “beyaz” olduğunu bilmek onu görünür yapmaz.", "Işık kaynağı kendi ışığını üretir; kitap, masa, Ay gibi cisimler gelen ışığı yansıtarak görünür."],
      ["Lamba kaynaktır: ışığı her yöne yayar, bir kısmı kitaba ulaşır.", "Işın çizimi ışığın gittiği yönü gösteren bir modeldir, gerçek bir çizgi değildir."],
      ["Kitaptan yansıyan ışık göze ulaşınca kitap görülür.", "Saydam cam ışığı geçirir, buzlu cam saçarak geçirir, opak cisim geçirmez."],
    ];
    return { els, readout: rows[step] };
  },
};

export const physicsFiguresLight: Record<string, Record<string, FigureDef>> = {
  "isik-bilgisi": {
    "Kaynak olanla görüneni ayır": seen,
    "Candela, lümen ve lüksü yerlerine koy": sphere,
    "Ters kareyi geometriden türet": inverse,
    "Açıyı yüzeyle değil normalle ölç": tilt,
    ...lightModelsFigures,
    ...photometryUnitsFigures,
    ...parallelFluxFigures,
  },
};
