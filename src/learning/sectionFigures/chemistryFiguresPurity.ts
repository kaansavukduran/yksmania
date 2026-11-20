import { poly, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Safsızlık problemleri. Saflık p = m(saf) ÷ m(örnek); safsızlık
 * verilen koşulda tepkimeye girmez. M: CaCO₃ 100, CO₂ 44, CaO 56, Al 27,
 * Al₂O₃ 102 g/mol. ÖSYM bağı: 2011 LYS2 Kimya 4 (yapılmış sınav, resmî cevap C;
 * soruda örnek saftır, %90 aktarımı özgündür). Diğer sayısal örnekler özgündür.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });
const f = (x: number, d = 1) => x.toFixed(d).replace(".", ",");

// 1 · Numune bütün, saf kısım paydır.
const share: FigureDef = {
  caption:
    "80 g kireç taşı örneği yeterli asitle tam tepkimeye giriyor; safsızlık tepkime vermez. Saflığı kaydır: denkleme yalnız saf CaCO₃ girer (m × p/100), CO₂ = saf × 44/100. %75’te 60 g saf → 26,4 g CO₂. Kaba kütleyi (80 g) denkleme vermek safsızlığı ürüne çevirmektir.",
  alt: "Üstte örnek çubuğu (saf ve safsızlık), altta oluşan CO₂ çubuğu.",
  param: { label: "Saflık", min: 0, max: 100, step: 5, init: 75, unit: " %" },
  draw: (p) => {
    const pure = (80 * p) / 100, co2 = pure * 0.44, k = 0.07;
    const els: El[] = [
      txt(v(-0.2, 0.5), "örnek", "w", { small: true, bold: true }), rect(0, Math.max(pure * k, 0.001), 0.3, 0.7, "b"), rect(pure * k, 80 * k, 0.3, 0.7, "warn"),
      txt(v(80 * k + 0.15, 0.5), `saf ${f(pure)} · safsızlık ${f(80 - pure)} g`, "e", { small: true }),
      txt(v(-0.2, -0.3), "CO₂", "w", { small: true, bold: true }), rect(0, Math.max(co2 * k, 0.001), -0.5, -0.1, "c"), txt(v(co2 * k + 0.15, -0.3), `${f(co2)} g`, "e", { small: true, bold: true, tone: "a" }),
    ];
    els.push(txt(v(-1.2, 1.0), " ", "c"), txt(v(10.2, -0.8), " ", "c"));
    return { els, readout: [`Saf CaCO₃ = 80 × ${p}/100 = ${f(pure)} g = ${f(pure / 100, 2)} mol → CO₂ ${f(co2)} g.`, "Yüzdeyi 100’e böl: %80’in çarpanı 0,80’dir."] };
  },
};

// 2 · Saflık ve verim iki ayrı çarpan.
const yieldFix: FigureDef = {
  caption:
    "60 g örnek, %75 saf CaCO₃; tam ayrışmada oluşan CO₂’nin yalnız bir kısmı toplanabiliyor. Toplama verimini kaydır: örnek → saf (×0,75) → teorik CO₂ (×44/100) → toplanan (×verim). %80’de 45 g → 19,8 g → 15,84 g. Verim katı hesabına uygulanmaz; toplanamayan gaz yok olmaz.",
  alt: "Dört kademeli çubuk: örnek, saf CaCO₃, teorik CO₂ ve toplanan CO₂.",
  param: { label: "Toplama verimi", min: 0, max: 100, step: 5, init: 80, unit: " %" },
  draw: (y) => {
    const pure = 45, th = pure * 0.44, got = (th * y) / 100, k = 0.08;
    const rows: [string, number, Tone][] = [["örnek", 60, "muted"], ["saf CaCO₃", pure, "b"], ["teorik CO₂", th, "c"], ["toplanan", got, "a"]];
    const els: El[] = [];
    rows.forEach(([l, val, tone], i) => {
      const yy = 0.6 - i * 0.6;
      els.push(txt(v(-0.2, yy), l, "w", { small: true, bold: true }), rect(0, Math.max(val * k, 0.001), yy - 0.2, yy + 0.2, tone), txt(v(val * k + 0.15, yy), `${f(val, 2)} g`, "e", { small: true }));
    });
    els.push(txt(v(-2.4, 1.0), " ", "c"), txt(v(6.4, -1.6), " ", "c"));
    return { els, readout: [`Toplanan = 60 × 0,75 × 0,44 × ${f(y / 100, 2)} = ${f(got, 2)} g.`, "Tersine: toplanan 9 g, verim 0,75 → oluşan 9 ÷ 0,75 = 12 g (çarpmak değil bölmek)."] };
  },
};

// 3 · Üründen numuneye geri dön: 2011 LYS2 Kimya 4.
const BACK = [
  ["0,51 g Al₂O₃", "ölçülen ürün"],
  ["0,005 mol Al₂O₃", "÷ 102 g/mol"],
  ["0,010 mol Al", "× 4/2"],
  ["0,270 g Al", "× 27 g/mol"],
  ["0,300 g örnek", "÷ 0,90 (özgün aktarım)"],
] as [string, string][];
const backward: FigureDef = {
  caption:
    "2011 LYS2 Kimya 4 (resmî kitapçık, cevap C): 4Al + 3O₂ → 2Al₂O₃; 0,51 g oksitten başlangıç Al kütlesi bulunur. Adımı ilerlet: ürün → mol → katsayı oranı → saf Al kütlesi. Soruda örnek saftır (0,270 g); son adım özgün aktarımdır: aynı Al %90 saf örnekten gelseydi örnek 0,270 ÷ 0,90 = 0,300 g olurdu.",
  alt: "Yukarıdan aşağı beş kutulu zincir: 0,51 g Al₂O₃, 0,005 mol, 0,010 mol Al, 0,270 g Al, 0,300 g örnek.",
  param: { label: "Adım", min: 0, max: 4, step: 1, init: 4, unit: "" },
  draw: (s) => {
    const n = Math.round(s), w = 2.8, step = 1.1, els: El[] = [];
    BACK.forEach(([top, op], i) => {
      const y = -i * step, on = i <= n, sel = i === n;
      els.push(rect(0, w, y - 0.36, y + 0.36, sel ? "a" : on ? "b" : "muted", sel), txt(v(w / 2, y), on ? top : "?", "c", { small: true, bold: true, tone: on ? "ink" : "muted" }));
      if (i > 0) els.push(vec(v(w / 2, y + step - 0.4), v(w / 2, y + 0.4), { tone: on ? "warn" : "muted" }), txt(v(w / 2 + 0.2, y + step / 2), op, "e", { small: true, tone: "muted" }));
    });
    els.push(txt(v(-0.3, 0.6), " ", "c"), txt(v(6.8, -4.8), " ", "c"));
    return { els, readout: [n < 4 ? `${BACK[n][0]} (${BACK[n][1]}).` : "Saf miktar örneğin bir payıdır: örnek = saf ÷ saflık.", "Kontrol: okside katılan O = 0,51 − 0,270 = 0,240 g; Al : O = 54 : 48 ile tutarlı."] };
  },
};

// 4 · Yüzde sınırlarını veri denetimi yap.
const CHECKS = [
  { label: "Çarp (doğru)", val: 56, note: "Saflık %70 ve toplama verimi %80 farklı basamaklardır: etkin çarpan 0,70 × 0,80 = 0,56. 100 g → 70 g saf → 30,8 g teorik → 24,64 g toplanan." },
  { label: "Topla (yanlış)", val: 150, note: "%70 + %80 = %150 anlamsızdır: pay 100’ü aşamaz. Yüzdeler toplanmaz, ardışık basamaklarda çarpılır." },
  { label: "Ortalama (yanlış)", val: 75, note: "(%70 + %80)/2 = %75 de yanlıştır; iki ayrı süzgeç ardışık uygulanır." },
];
const checks: FigureDef = {
  caption:
    "Yüzde sınırlarını veri denetimi yap: bir pay 0 ile %100 arasında kalmalı. Bir birleştirme yoluna tıkla: saflık %70 ve toplama verimi %80 için etkin oran çizilir; kesikli çizgi %100 sınırıdır. Doğru yol çarpmaktır.",
  alt: "Tek yatay çubuk: seçilen yolla bulunan etkin oran; %100 sınırı kesikli.",
  picks: CHECKS.map((c) => ({ label: c.label, title: `${c.label}: %${c.val}`, detail: [c.note] })),
  draw: (_v, _s, pick = -1) => {
    const c = CHECKS[pick >= 0 ? pick : 0], k = 0.035, bad = c.val > 100 || pick > 0;
    const els: El[] = [rect(0, c.val * k, -0.25, 0.25, bad ? "warn" : "b"), txt(v(c.val * k + 0.15, 0), `%${c.val}`, "e", { small: true, bold: true, tone: bad ? "warn" : "a" })];
    els.push(poly([v(100 * k, -0.5), v(100 * k, 0.5)], { open: true, dash: true, thin: true, tone: "muted" }), txt(v(100 * k, 0.75), "%100 sınırı", "c", { small: true, tone: "muted" }));
    CHECKS.forEach((cc, i) => els.push(txt(v(i * 2.2, -1.0), cc.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.3, 1.0), " ", "c"), txt(v(6.8, -1.3), " ", "c"));
    return { els, readout: [c.note, "Saf kütle + safsızlık = örnek kütlesi; saflık saf ÷ örnekle bulunur (18 ÷ 20 = %90)."] };
  },
};

export const chemistryFiguresPurity: Record<string, Record<string, FigureDef>> = {
  "safsizlik-problemleri": {
    "Numune bütün, saf kısım paydır": share,
    "Bilinen ürün verimini düzelt": yieldFix,
    "Üründen numuneye geri dön": backward,
    "Yüzde sınırlarını veri denetimi yap": checks,
  },
};
