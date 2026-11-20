import { poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Koligatif özellikler ve ayırma. Seyreltik ideal model, uçucu
 * olmayan çözünen, tam ayrışma (NaCl → 2, CaCl₂ → 3 tanecik). TYT çekirdeği
 * nitel karşılaştırmadır; q = i × n ÷ m(su, kg) yalnız sıralama içindir.
 * ÖSYM bağları: 2025 TYT Fen 13 (resmî cevap B), 2017 YGS Fen 25 (resmî cevap B);
 * çözümler özgündür. Sayısal örnekler özgündür.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });
const f = (x: number, d = 1) => x.toFixed(d).replace(".", ",");

// 1 · Tanecik derişimi: çözücü miktarını sabitle.
const SOLS = [
  { k: "A", text: "200 g su · 0,10 mol NaCl", i: 2, n: 0.1, m: 0.2 },
  { k: "B", text: "100 g su · 0,15 mol glikoz", i: 1, n: 0.15, m: 0.1 },
  { k: "C", text: "200 g su · 0,10 mol CaCl₂", i: 3, n: 0.1, m: 0.2 },
];
const qOf = (s: (typeof SOLS)[number]) => (s.i * s.n) / s.m;
const particles: FigureDef = {
  caption:
    "Üç çözelti, farklı su kütleleri. Bir çözeltiye tıkla: etkin tanecik (i × n) önce bulunur, sonra aynı çözücü miktarına oranlanır (q = i × n ÷ kg su). Çubuk q’dur: q büyüdükçe donma sıcaklığı düşer, kaynama sıcaklığı yükselir, buhar basıncı azalır. NaCl iki iyon verse de A, B’den küçük etki yapar.",
  alt: "Üç yatay çubuk: A 1,0, B 1,5, C 1,5 mol tanecik/kg su.",
  picks: SOLS.map((s) => ({
    label: s.k,
    title: `${s.k}: q = ${f(qOf(s))} mol tanecik/kg`,
    detail: [`${s.i} × ${f(s.n, 2)} mol = ${f(s.i * s.n, 2)} mol tanecik; ÷ ${f(s.m, 3)} kg su = ${f(qOf(s))}.`, "Donma sıcaklığı A > B = C; kaynama A < B = C; buhar basıncı A > B = C."],
  })),
  draw: (_v, _s, pick = -1) => {
    const k = 3, els: El[] = [];
    SOLS.forEach((s, i) => {
      const y = -i * 1.2, sel = pick === i, q = qOf(s);
      els.push(txt(v(-0.2, y), s.k, "w", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }), rect(0, q * k, y - 0.25, y + 0.25, sel ? "a" : "b"), txt(v(q * k + 0.15, y), f(q), "e", { small: true, bold: true }));
      els.push(txt(v(0, y + 0.48), s.text, "e", { small: true, tone: "muted" }));
    });
    els.push(seg(v(0, -2.8), v(4.8, -2.8), { thin: true, tone: "muted" }), txt(v(4.8, -3.1), "q (mol tanecik/kg su)", "e", { small: true, tone: "muted" }));
    els.push(txt(v(-0.8, 1.0), " ", "c"), txt(v(7.8, -3.4), " ", "c"));
    const s = pick >= 0 ? SOLS[pick] : null;
    return { els, readout: [s ? `${s.k}: ${s.i} × ${f(s.n, 2)} ÷ ${f(s.m, 3)} = ${f(qOf(s))} mol/kg.` : "Bir çözeltiye tıkla.", "Önce tanecik sayısı, sonra çözücü miktarı: ikisi de gerekir."] };
  },
};

// 2 · 2025 TYT Fen 13.
const STATEMENTS = [
  { label: "I", title: "I: K’ye su eklenirse donma sıcaklığı düşer → yanlış", detail: ["Su eklemek tanecik derişimini azaltır; donma sıcaklığı 0 °C’ye doğru yükselir."] },
  { label: "II", title: "II: L’de etkin tanecik derişimi daha büyük → doğru", detail: ["L’deki düşüş (3,72 °C) K’dekinden (1,86 °C) büyük; aynı çözücüde daha çok etkin tanecik."] },
  { label: "III", title: "III: L’ye aynı çözünen eklenirse donma sıcaklığı yükselir → yanlış", detail: ["Tamamı çözünürse derişim artar, donma sıcaklığı daha da düşer."] },
];
const fen13: FigureDef = {
  caption:
    "2025 TYT Fen 13 (resmî kitapçık, cevap B): saf su 0 °C, K çözeltisi −1,86 °C, L çözeltisi −3,72 °C’de donmaya başlıyor. Bir öncüle tıkla: ok, işlemin donma noktasını hangi yöne götürdüğünü gösterir. Yalnız II doğru. Düşüşün iki kat olması, farklı maddelerin gramlarının iki kat olduğunu tek başına göstermez.",
  alt: "Düşey sıcaklık ekseninde 0, −1,86 ve −3,72 °C işaretleri; seçilen öncül için yön oku.",
  picks: STATEMENTS,
  draw: (_v, _s, pick = -1) => {
    const sy = 0.9, els: El[] = [vec(v(0, -4.2 * sy), v(0, 0.6 * sy), { thin: true }), txt(v(0.1, 0.8 * sy), "°C", "e", { small: true, tone: "muted" })];
    const marks: [number, string, Tone][] = [[0, "saf su 0", "ink"], [-1.86, "K −1,86", "b"], [-3.72, "L −3,72", "c"]];
    marks.forEach(([t, l, tone]) => els.push(seg(v(-0.15, t * sy), v(0.15, t * sy), { tone }), txt(v(0.3, t * sy), l, "e", { small: true, bold: true, tone })));
    if (pick === 0) els.push(vec(v(2.6, -1.86 * sy), v(2.6, -0.6 * sy), { tone: "a", bold: true }), txt(v(2.8, -1.2 * sy), "su ekle: yükselir", "e", { small: true, tone: "a" }));
    if (pick === 1) els.push(seg(v(2.6, 0), v(2.6, -1.86 * sy), { tone: "b", bold: true }), seg(v(3.2, 0), v(3.2, -3.72 * sy), { tone: "c", bold: true }), txt(v(3.4, -2.6 * sy), "L’de düşüş büyük", "e", { small: true, tone: "a" }));
    if (pick === 2) els.push(vec(v(2.6, -3.72 * sy), v(2.6, -4.1 * sy), { tone: "a", bold: true }), txt(v(2.8, -3.9 * sy), "çözünen ekle: düşer", "e", { small: true, tone: "a" }));
    STATEMENTS.forEach((s, i) => els.push(txt(v(-1.6, -0.6 - i * 0.7), s.label, "w", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-2.2, 1.0), " ", "c"), txt(v(6.2, -4.2), " ", "c"));
    return { els, readout: [pick >= 0 ? STATEMENTS[pick].title + "." : "Bir öncüle tıkla.", "Sonuç: yalnız II (B)."] };
  },
};

// 3 · Ayırma yöntemi: fark → yöntem.
const METHODS = [
  { mix: "Kum + su", short: "Tane boyutu", diff: "Tane boyutu (ayrı katı faz)", way: "Süzme", note: "Çözünmüş Na⁺/Cl⁻ sıradan süzgeçte tutulmaz." },
  { mix: "Yağ + su", short: "Karışmama", diff: "Karışmayan iki sıvı, yoğunluk", way: "Ayırma hunisi", note: "Yoğun olan alt katman önce alınır." },
  { mix: "Etanol + su", short: "Uçuculuk", diff: "Uçuculuk (kaynama farkı)", way: "Ayrımsal damıtma", note: "2017 YGS Fen 25 (B): ayrımsal damıtmanın dayanağı uçuculuk; her bileşimi %100 saflaştırmaz." },
  { mix: "Tuzlu su", short: "Uçuculuk", diff: "Su uçucu, tuz değil (ikisi de toplanacak)", way: "Basit damıtma", note: "Yalnız tuz istenirse buharlaştırma yeter; su da isteniyorsa buhar yoğunlaştırılıp toplanır." },
  { mix: "Demir + kum", short: "Manyetiklik", diff: "Manyetik tepki", way: "Mıknatısla ayırma", note: "Her metal mıknatısa aynı biçimde çekilmez." },
];
const methods: FigureDef = {
  caption:
    "Ayırma hedefini önce seç, sonra bileşenler arasındaki gözlenebilir farkı adlandır. Bir karışıma tıkla: soldan sağa karışım → ayırt edici fark → yöntem okunur. Aynı “sıvı + sıvı” görünüşü, karışıp karışmamaya göre farklı yöntem ister.",
  alt: "Üç sütunlu akış: karışım, ayırt edici fark ve yöntem; seçilen satır vurgulu.",
  picks: METHODS.map((m) => ({ label: m.mix, title: `${m.mix} → ${m.way}`, detail: [`Fark: ${m.diff}.`, m.note] })),
  draw: (_v, _s, pick = -1) => {
    const M = METHODS[pick >= 0 ? pick : 2];
    const els: El[] = [
      rect(-0.1, 2.3, -0.4, 0.4, "b"), txt(v(1.1, 0), M.mix, "c", { small: true, bold: true }),
      vec(v(2.4, 0), v(3.0, 0), { tone: "muted" }),
      rect(3.1, 6.3, -0.4, 0.4, "warn", false), txt(v(4.7, 0), M.short, "c", { small: true }),
      vec(v(6.4, 0), v(7.0, 0), { tone: "muted" }),
      rect(7.1, 10.3, -0.4, 0.4, "a"), txt(v(8.7, 0), M.way, "c", { small: true, bold: true }),
    ];
    METHODS.forEach((m, i) => els.push(txt(v((i % 2) * 5.2, -1.0 - Math.floor(i / 2) * 0.6), m.mix, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.4, 0.8), " ", "c"), txt(v(10.6, -2.4), " ", "c"));
    return { els, readout: [`${M.mix}: ${M.diff} → ${M.way}.`, M.note] };
  },
};

// 4 · Dört bileşenli ayırma yolu.
const STAGES = [
  { title: "Başlangıç", step: "40 g demir + 20 g kum + 10 g tuz (çözünmüş) + 100 g su", out: [] as string[] },
  { title: "1 · Mıknatıs", step: "Demir mıknatısa çekilir: 40 g ayrıldı.", out: ["Demir 40 g"] },
  { title: "2 · Süzme", step: "Kum süzgeçte kalır; tuz çözeltide geçer.", out: ["Demir 40 g", "Kum 20 g"] },
  { title: "3 · Basit damıtma", step: "Su buharlaşıp yoğunlaştırılarak toplanır; tuz kapta kalır.", out: ["Demir 40 g", "Kum 20 g", "Su 100 g"] },
];
const fourWay: FigureDef = {
  caption:
    "Dört bileşeni izleyen ayırma yolu (özgün, kayıpsız model): 40 g demir, 20 g kum, 10 g çözünmüş tuz, 100 g su. Aşamayı ilerlet: her adımın kullandığı fark ve ayrılan bileşen kutuya düşer. Son envanter 40 + 20 + 10 + 100 = 170 g; kütle korunur.",
  alt: "Solda kalan karışım kutusu, sağda ayrılan bileşen kutuları; aşama ilerledikçe kutular dolar.",
  param: { label: "Aşama", min: 0, max: 3, step: 1, init: 0, unit: "" },
  draw: (s) => {
    const st = STAGES[Math.round(s)];
    const left = ["Demir 40 g", "Kum 20 g", "Tuz 10 g", "Su 100 g"].filter((x) => !st.out.includes(x));
    const els: El[] = [rect(0, 2.6, -1.9, 0.5, "b", false), txt(v(1.3, 0.75), "Kapta kalan", "c", { small: true, bold: true })];
    left.forEach((l, i) => els.push(txt(v(1.3, 0.1 - i * 0.5), l, "c", { small: true })));
    els.push(vec(v(2.8, -0.7), v(3.6, -0.7), { tone: "a", bold: true }));
    els.push(rect(3.8, 6.6, -1.9, 0.5, "a", false), txt(v(5.2, 0.75), "Ayrılan", "c", { small: true, bold: true, tone: "a" }));
    st.out.forEach((l, i) => els.push(txt(v(5.2, 0.1 - i * 0.5), l, "c", { small: true, bold: true, tone: "a" })));
    els.push(txt(v(3.3, -2.4), st.title, "c", { small: true, bold: true }));
    els.push(txt(v(-0.4, 1.2), " ", "c"), txt(v(7.0, -2.7), " ", "c"));
    return { els, readout: [st.step, Math.round(s) === 3 ? "Envanter: 40 + 20 + 10 + 100 = 170 g." : "Sıra önemli: tuzu önce buharlaştırırsan kum ve demirle yeniden karışır."] };
  },
};

// 5 · Kristallendirme.
const crystal: FigureDef = {
  caption:
    "X’in çözünürlüğü 80 °C’de 60, 20 °C’de 20 g/100 g su (özgün veri). 150 g suyla 80 °C’de doymuş çözelti 90 g X taşır. Son sıcaklığı kaydır: çözünmüş kalabilen X = S × 150 ÷ 100, fazlası kristal olur. Ara sıcaklıklar doğrusal varsayımdır; uç noktalar verilidir. 20 °C’de 60 g kristal; toplam 240 g korunur.",
  alt: "Yatay eksende sıcaklık 20–80 °C, düşey eksende 150 g sudaki X kütlesi; çözünürlük doğrusu ve 90 g çizgisi arasındaki kristal aralığı.",
  param: { label: "Son sıcaklık", min: 20, max: 80, step: 10, init: 20, unit: " °C" },
  draw: (T) => {
    const S = 20 + ((T - 20) * 40) / 60, dis = (S * 150) / 100, cr = 90 - dis;
    const sx = 0.09, sy = 0.04, X = (t: number) => (t - 20) * sx;
    const els: El[] = [vec(v(0, 0), v(6, 0), { thin: true }), vec(v(0, 0), v(0, 100 * sy), { thin: true }), txt(v(6, -0.35), "°C", "c", { small: true }), txt(v(0.15, 100 * sy), "g X (150 g su)", "e", { small: true })];
    [20, 50, 80].forEach((t) => els.push(txt(v(X(t), -0.35), String(t), "c", { small: true, tone: "muted" })));
    [30, 90].forEach((g) => els.push(txt(v(-0.15, g * sy), String(g), "w", { small: true, tone: "muted" })));
    els.push(seg(v(X(20), 30 * sy), v(X(80), 90 * sy), { tone: "b", bold: true }), seg(v(0, 90 * sy), v(X(80), 90 * sy), { dash: true, thin: true, tone: "warn" }));
    if (cr > 0) els.push(seg(v(X(T), dis * sy), v(X(T), 90 * sy), { tone: "a", bold: true }), txt(v(2.7, 0.5), `kristal ${f(cr, 0)} g`, "c", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-1.0, 4.4), " ", "c"), txt(v(7.2, -0.6), " ", "c"));
    return { els, readout: [`${T} °C: S = ${f(S, 1)} g/100 g → çözünmüş ${f(dis, 0)} g, kristal ${f(cr, 0)} g.`, `Sıvı ${f(150 + dis, 0)} g + kristal ${f(cr, 0)} g = 240 g. Soğukta çözünürlük artsaydı kristal oluşmazdı.`] };
  },
};

export const chemistryFiguresColligative: Record<string, Record<string, FigureDef>> = {
  "koligatif-ayirma": {
    "Karşılaştırma koşullarını sabitle": particles,
    "Donma alçalması ve verilen model": fen13,
    "Ayırma hedefini önce seç": methods,
    "Dört bileşeni izleyen ayırma yolu": fourWay,
    "Çözünürlükten yararlan": crystal,
  },
};
