import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * TYT Matematik: absolute value as distance on the number line, a two-set
 * Venn diagram filled region by region from a word problem, direct vs inverse
 * proportion graphs (constant quotient vs constant product as rectangle area),
 * and exponential growth/decay by base. Values are computed, not sketched.
 */

const fmt = (x: number, d = 3) => x.toLocaleString("tr-TR", { maximumFractionDigits: d });

function numberLine(a: number, b: number, y = 0, step = 1): El[] {
  const els: El[] = [vec(v(a - 0.4, y), v(b + 0.4, y), { tone: "ink" }), vec(v(b + 0.4, y), v(a - 0.4, y), { tone: "ink" })];
  for (let t = a; t <= b + 1e-9; t += step) els.push(seg(v(t, y - 0.1), v(t, y + 0.1), { tone: "ink" }), txt(v(t, y - 0.2), fmt(t), "s", { tone: "ink", small: true }));
  return els;
}

/* ---------- Mutlak değer: eşitlik ---------- */
const absEq: FigureDef = {
  caption:
    "İleri ile |x − 2| = 3'ü uzaklık olarak çöz: “x'in 2'ye uzaklığı 3”. Sayı doğrusunda 2'den 3 birim sağa ve sola git: x = 5 ve x = −1. İşareti silmek yerine merkezi ve uzaklığı oku.",
  alt: "−3'ten 7'ye sayı doğrusu; 2 merkezi işaretli, iki yana 3 birimlik oklar ve −1 ile 5'te iki çözüm noktası.",
  steps: ["Merkez ve uzaklık", "Sağa 3", "Sola 3", "Çözüm kümesi"],
  draw: (_v, step) => {
    const els: El[] = [...numberLine(-3, 7)];
    els.push(ball(v(2, 0), 0.12, "b"), txt(v(2, 0.35), "merkez 2", "n", { tone: "b", small: true, bold: true }));
    if (step >= 1) els.push(vec(v(2, 1.2), v(5, 1.2), { tone: "c", bold: true }), txt(v(3.5, 1.35), "3", "n", { tone: "c", small: true, bold: true }), ball(v(5, 0), 0.12, "c"));
    if (step >= 2) els.push(vec(v(2, 1.2), v(-1, 1.2), { tone: "c", bold: true }), txt(v(0.5, 1.35), "3", "n", { tone: "c", small: true, bold: true }), ball(v(-1, 0), 0.12, "c"));
    if (step === 3) els.push(txt(v(2, -0.85), "Ç = {−1, 5}", "s", { tone: "c", bold: true }));
    els.push(txt(v(-3.8, 2), " ", "c"), txt(v(7.8, -1.3), " ", "c"));
    const rows: [string, string][] = [
      ["|x − 2|: x ile 2 arasındaki uzaklık. |x + 2| ise x ile −2 arasındaki uzaklıktır.", "Uzaklık negatif olamaz: |…| = −1 gibi bir eşitliğin çözümü yoktur."],
      ["Sağa: x − 2 = 3 → x = 5.", "İç ifade pozitif dal."],
      ["Sola: x − 2 = −3 → x = −1.", "İç ifade negatif dal."],
      ["İki simetrik nokta: 2 ± 3. Kontrol: |5 − 2| = 3, |−1 − 2| = 3.", "|ax − b| = c (c > 0) her zaman iki çözüm verir; c = 0 ise tek çözüm."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- Mutlak değer: eşitsizlik ---------- */
const absIneq: FigureDef = {
  caption:
    "İleri ile |x − 2| < 3 ve |x − 2| > 3'ü karşılaştır. “Küçük” uzaklık merkezin çevresindeki içeriyi (−1 < x < 5), “büyük” uzaklık iki dış bölgeyi (x < −1 veya x > 5) seçer. Sınır noktaları kesin eşitsizlikte dahil değildir (boş daire).",
  alt: "İki sayı doğrusu: üsttekinde −1 ile 5 arası kalın renkli; alttakinde −1'in solu ve 5'in sağı kalın renkli; uçlarda boş daireler.",
  steps: ["|x − 2| < 3: içerisi", "|x − 2| > 3: dışarısı", "≤ ve ≥"],
  draw: (_v, step) => {
    const els: El[] = [];
    const closed = step === 2;
    const ends = (y: number, tone: Tone) => [-1, 5].map((x) => (closed ? ball(v(x, y), 0.12, tone) : circle(v(x, y), 0.12, { tone, bold: true })));
    els.push(...numberLine(-3, 7, 1.2));
    els.push(seg(v(-1, 1.2), v(5, 1.2), { tone: "c", bold: true }), ...ends(1.2, "c"), txt(v(-3.6, 1.2), closed ? "≤ 3" : "< 3", "w", { tone: "c", small: true, bold: true }));
    els.push(...numberLine(-3, 7, -0.6));
    els.push(seg(v(-3.4, -0.6), v(-1, -0.6), { tone: "warn", bold: true }), seg(v(5, -0.6), v(7.4, -0.6), { tone: "warn", bold: true }), ...ends(-0.6, "warn"), txt(v(-3.6, -0.6), closed ? "≥ 3" : "> 3", "w", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(-4.6, 2), " ", "c"), txt(v(7.8, -1.2), " ", "c"));
    const rows: [string, string][] = [
      ["|x − 2| < 3 → −3 < x − 2 < 3 → −1 < x < 5 (tek aralık, “ve”).", "Merkez 2'ye 3'ten yakın sayılar."],
      ["|x − 2| > 3 → x − 2 < −3 veya x − 2 > 3 → x < −1 veya x > 5 (iki parça, “veya”).", "Merkeze 3'ten uzak sayılar."],
      ["≤ ya da ≥ olursa uç noktalar dahil (dolu daire): [−1, 5] ve (−∞, −1] ∪ [5, ∞).", "Tamsayı çözüm sayısı sorulursa uçların dahil olup olmadığı sonucu değiştirir."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- Kümeler: Venn dört bölge ---------- */
function lens(cA: V, cB: V, r: number): V[] {
  const d = Math.hypot(cB[0] - cA[0], cB[1] - cA[1]);
  const a = Math.acos(d / (2 * r));
  const base = Math.atan2(cB[1] - cA[1], cB[0] - cA[0]);
  const ps: V[] = [];
  for (let i = 0; i <= 20; i++) {
    const t = base - a + (2 * a * i) / 20;
    ps.push(v(cA[0] + r * Math.cos(t), cA[1] + r * Math.sin(t)));
  }
  const back = base + Math.PI;
  for (let i = 0; i <= 20; i++) {
    const t = back - a + (2 * a * i) / 20;
    ps.push(v(cB[0] + r * Math.cos(t), cB[1] + r * Math.sin(t)));
  }
  return ps;
}
const venn: FigureDef = {
  caption:
    "İleri ile sözel problemi dört ayrık bölgeye dök: 40 öğrencinin 25'i İngilizce, 18'i Almanca, 7'si ikisini birden biliyor. Önce kesişimi (7) yaz, sonra “yalnız” bölgeleri (25 − 7 = 18, 18 − 7 = 11), en son dışarıyı (40 − 18 − 7 − 11 = 4).",
  alt: "Dikdörtgen evren içinde kesişen iki daire: İngilizce ve Almanca. Adım adım kesişime 7, yalnız İngilizceye 18, yalnız Almancaya 11, dışarıya 4 yazılıyor.",
  steps: ["Kesişim", "Yalnız İngilizce", "Yalnız Almanca", "Hiçbiri"],
  draw: (_v, step) => {
    const A = v(-1.1, 0);
    const B = v(1.1, 0);
    const r = 1.9;
    const els: El[] = [poly([v(-4, -2.5), v(4, -2.5), v(4, 2.5), v(-4, 2.5)], { tone: "muted", thin: true }), txt(v(-3.8, -2.3), "E (40)", "ne", { tone: "muted", small: true, bold: true })];
    els.push(circle(A, r, { tone: "b", fill: step === 1 ? "b" : undefined, bold: true }), circle(B, r, { tone: "c", fill: step === 2 ? "c" : undefined, bold: true }));
    els.push(poly(lens(A, B, r), { tone: "warn", fill: step === 0 ? "warn" : undefined, thin: true }));
    els.push(txt(v(-2.2, 2.05), "İngilizce (25)", "c", { tone: "b", small: true, bold: true }), txt(v(2.2, 2.05), "Almanca (18)", "c", { tone: "c", small: true, bold: true }));
    els.push(txt(v(0, 0), "7", "c", { tone: "warn", bold: true }));
    if (step >= 1) els.push(txt(v(-1.9, 0), "18", "c", { tone: "b", bold: true }));
    if (step >= 2) els.push(txt(v(1.9, 0), "11", "c", { tone: "c", bold: true }));
    if (step >= 3) els.push(txt(v(3.4, -2.1), "4", "c", { tone: "ink", bold: true }));
    els.push(txt(v(-4.3, 2.8), " ", "c"), txt(v(4.3, -2.8), " ", "c"));
    const rows: [string, string][] = [
      ["İkisini birden bilen 7: kesişim, her iki daireye de aittir.", "Önce en içteki bölgeyi yaz; diğerlerini ondan çıkararak bul."],
      ["Yalnız İngilizce = 25 − 7 = 18.", "“İngilizce bilen” 25'in içinde kesişim de var; “yalnız” onu dışlar."],
      ["Yalnız Almanca = 18 − 7 = 11. Birleşim = 18 + 7 + 11 = 36 = 25 + 18 − 7.", "s(A ∪ B) = s(A) + s(B) − s(A ∩ B): ortak eleman bir kez sayılır."],
      ["Hiçbirini bilmeyen = 40 − 36 = 4 (tümleyen, evrene göre).", "Kontrol: 18 + 7 + 11 + 4 = 40."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ---------- Oran: doğru ve ters orantı ---------- */
const proportion: FigureDef = {
  caption:
    "Sürgüyle x'i değiştir. Doğru orantıda y/x sabittir (y = 2x, orijinden geçen doğru). Ters orantıda x·y sabittir (x·y = 12, hiperbol): turuncu dikdörtgenin alanı her noktada 12'dir. “Biri artınca öbürü azalır” tek başına ters orantı demek değildir.",
  alt: "Solda orijinden geçen y = 2x doğrusu ve üzerinde nokta; sağda x·y = 12 hiperbolü, noktanın eksenlerle yaptığı turuncu dikdörtgen.",
  param: { label: "x", min: 1, max: 6, step: 0.5, init: 2 },
  draw: (x) => {
    const els: El[] = [];
    const L = v(-7, -0.5);
    const S1 = 0.55;
    els.push(vec(L, v(L[0] + 4, L[1]), { tone: "ink" }), vec(L, v(L[0], L[1] + 7), { tone: "ink" }));
    els.push(seg(L, v(L[0] + 6.2 * S1, L[1] + 12.4 * S1), { tone: "b", bold: true }), ball(v(L[0] + x * S1, L[1] + 2 * x * S1), 0.1, "b"));
    els.push(txt(v(L[0] + 2, L[1] + 7.2), "doğru: y = 2x", "n", { tone: "b", small: true, bold: true }));
    const Rg = v(0, -0.5);
    els.push(vec(Rg, v(Rg[0] + 4, Rg[1]), { tone: "ink" }), vec(Rg, v(Rg[0], Rg[1] + 7), { tone: "ink" }));
    const hyp: V[] = [];
    for (let i = 0; i <= 80; i++) {
      const t = 1 + (i / 80) * 6;
      hyp.push(v(Rg[0] + t * S1, Rg[1] + (12 / t) * S1));
    }
    els.push(poly(hyp, { tone: "c", open: true, bold: true, smooth: true }));
    const yx = 12 / x;
    els.push(poly([Rg, v(Rg[0] + x * S1, Rg[1]), v(Rg[0] + x * S1, Rg[1] + yx * S1), v(Rg[0], Rg[1] + yx * S1)], { tone: "warn", fill: "warn", thin: true }), ball(v(Rg[0] + x * S1, Rg[1] + yx * S1), 0.1, "c"));
    els.push(txt(v(Rg[0] + 2, Rg[1] + 7.2), "ters: x·y = 12", "n", { tone: "c", small: true, bold: true }));
    els.push(txt(v(-7.4, 7.6), " ", "c"), txt(v(4.4, -1), " ", "c"));
    return {
      els,
      readout: [`x = ${fmt(x, 1)}: doğru orantıda y = ${fmt(2 * x, 1)} (y/x = 2) · ters orantıda y = ${fmt(yx, 2)} (x·y = 12)`, "Doğru orantı: x iki katına çıkarsa y de iki katına. Ters orantı: x iki katına çıkarsa y yarıya (ör. işçi sayısı ↔ gün)."],
    };
  },
};

const pumpHours: FigureDef = {
  caption: "Pompa sayısı genişliği, çalışma süresi yüksekliği belirler. Aynı iş miktarında pompalar artınca dikdörtgenin alanı sabit kalır.",
  alt: "Dikdörtgenin her sütunu aynı debide bir pompayı gösterir. Yatay eksen pompa sayısı, düşey eksen çalışma süresi. Sürgü genişliği, iş miktarı adımı alanı değiştirir.",
  steps: ["Aynı iş", "İki kat iş"],
  param: { label: "Pompa sayısı", min: 4, max: 16, step: 1, init: 8 },
  draw: (pumps, step) => {
    const work = step === 0 ? 120 : 240;
    const hours = work / pumps;
    const height = hours / 4;
    const origin = v(0, 0);
    return {
      els: [
        vec(origin, v(17, 0), { tone: "ink" }),
        vec(origin, v(0, 16), { tone: "ink" }),
        poly([origin, v(pumps, 0), v(pumps, height), v(0, height)], { fill: "b" }),
        ...Array.from({ length: pumps - 1 }, (_, index) =>
          seg(v(index + 1, 0), v(index + 1, height), { tone: "b", thin: true })
        ),
        txt(v(16, -0.5), "Pompa sayısı", "s", { small: true }),
        txt(v(0, 16), "Saat", "n", { small: true }),
      ],
      readout: [
        `${pumps} pompa. ${work} pompa-saat iş.`,
        `Süre = ${work} ÷ ${pumps} ${Math.abs(hours * 100 - Math.round(hours * 100)) < 1e-9 ? "=" : "≈"} ${fmt(hours, 2)} saat.`,
      ],
    };
  },
};

/* ---------- Üslü: taban 1'in hangi yanında ---------- */
const bases: FigureDef = {
  caption:
    "Sürgüyle üssü değiştir. Taban 1'den büyükse (2ⁿ) üs arttıkça değer büyür; taban 0 ile 1 arasındaysa ((1/2)ⁿ) üs arttıkça değer küçülür. Sıralama sorusunda önce tabanın 1'in hangi yanında olduğuna bak.",
  alt: "Aynı eksende y = 2ˣ (artan) ve y = (1/2)ˣ (azalan) eğrileri; ikisi de (0, 1)'den geçiyor; sürgüyle seçilen üste iki noktanın değerleri.",
  param: { label: "Üs n", min: -3, max: 3, step: 0.5, init: 2 },
  draw: (n) => {
    const els: El[] = [vec(v(-3.4, 0), v(3.6, 0), { tone: "ink" }), vec(v(0, -0.3), v(0, 8.6), { tone: "ink" }), txt(v(3.65, 0), "n", "e", { tone: "ink", small: true })];
    const c = (f: (t: number) => number) => {
      const ps: V[] = [];
      for (let i = 0; i <= 100; i++) {
        const t = -3 + (i / 100) * 6;
        const y = f(t);
        if (y <= 8.4) ps.push(v(t, y));
      }
      return ps;
    };
    els.push(poly(c((t) => Math.pow(2, t)), { tone: "b", open: true, bold: true, smooth: true }), poly(c((t) => Math.pow(0.5, t)), { tone: "warn", open: true, bold: true, smooth: true }));
    els.push(seg(v(n, 0), v(n, 8.4), { tone: "muted", dash: true, thin: true }));
    const y1 = Math.pow(2, n);
    const y2 = Math.pow(0.5, n);
    if (y1 <= 8.4) els.push(ball(v(n, y1), 0.1, "b"));
    if (y2 <= 8.4) els.push(ball(v(n, y2), 0.1, "warn"));
    els.push(txt(v(2.2, 7.6), "2ⁿ", "e", { tone: "b", bold: true }), txt(v(-2.9, 7.6), "(1/2)ⁿ", "w", { tone: "warn", bold: true }), txt(v(0.1, 1.15), "1", "e", { tone: "ink", small: true }));
    for (const t of [-2, -1, 1, 2]) els.push(seg(v(t, -0.08), v(t, 0.08), { tone: "ink" }), txt(v(t, -0.18), String(t), "s", { tone: "ink", small: true }));
    els.push(txt(v(-3.8, 9), " ", "c"), txt(v(4.2, -0.6), " ", "c"));
    return {
      els,
      readout: [`n = ${fmt(n, 1)}: 2ⁿ = ${fmt(y1, 4)} · (1/2)ⁿ = ${fmt(y2, 4)}`, "a > 1: üs büyüdükçe artar. 0 < a < 1: azalır. a⁰ = 1 (a ≠ 0); a⁻ⁿ = 1/aⁿ. Negatif tabanda çift ve tek üs işareti değiştirir."],
    };
  },
};

export const mathFiguresTyt: Record<string, Record<string, FigureDef>> = {
  "mutlak-deger": {
    "Eşitlik iki simetrik uzaklık noktası verir": absEq,
    "Küçüklük içeriyi, büyüklük dışarıyı seçer": absIneq,
  },
  kumeler: { "Sözel problemde önce dört ayrık bölgeyi doldur": venn },
  "oran-oranti": {
    "Ters orantı: sabit işte çarpım": proportion,
    "Pompa sayısını değiştir, sabit işi koru": pumpHours,
  },
  "uslu-sayilar": { "Sıralamada taban 1'in hangi yanında?": bases },
};
