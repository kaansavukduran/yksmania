import { ball, poly, seg, txt, v, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Katı kütlesi değişimi. M: CaCO₃ 100, CaO 56, CO₂ 44, Mg 24,
 * MgO 40, Ca 40, O₂ 32 g/mol. İnert: verilen koşulda tepkime vermeyen ve
 * uçmayan dolgu. ÖSYM bağı: 2015 LYS2 Kimya 2 (yapılmış sınav, resmî cevap C);
 * çözüm özgündür. Diğer sayısal örnekler özgündür.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });
const f = (x: number, d = 1) => x.toFixed(d).replace(".", ",");

/** Yığılmış çubuk: [etiket, değer, ton] parçaları. */
function stack(y: number, parts: [string, number, Tone][], k: number): El[] {
  const els: El[] = [];
  let x = 0;
  for (const [, val, tone] of parts) {
    if (val > 1e-9) els.push(rect(x, x + val * k, y - 0.22, y + 0.22, tone));
    x += val * k;
  }
  return els;
}

// 1 · Terazinin kapsamı.
const SCOPES = [
  { label: "Açık kap: yalnız katı", before: [["CaCO₃", 25, "b"]] as [string, number, Tone][], after: [["CaO", 14, "c"]] as [string, number, Tone][], note: "CO₂ (11 g) teraziden ayrılır: tartılan katı 25 → 14 g." },
  { label: "Kapalı kap: tüm sistem", before: [["CaCO₃", 25, "b"]] as [string, number, Tone][], after: [["CaO", 14, "c"], ["CO₂", 11, "warn"]] as [string, number, Tone][], note: "Gaz sistemin içinde: 14 + 11 = 25 g; toplam kütle değişmez." },
];
const scope: FigureDef = {
  caption:
    "25 g saf CaCO₃ tamamen ayrışıyor: CaCO₃ → CaO + CO₂. Terazinin kapsamına tıkla: açık kapta yalnız katı tartılır ve gaz çıkışı kütleyi azaltır; kapalı kapta gaz da sistemdedir ve toplam korunur. “Toplam kütle 14 g oldu” demek terazinin kapsamını karıştırmaktır.",
  alt: "İki satır: önce ve sonra; seçilen kapsama göre CaO ve CO₂ parçaları.",
  picks: SCOPES.map((s) => ({ label: s.label, title: s.label, detail: [s.note] })),
  draw: (_v, _s, pick = -1) => {
    const s = SCOPES[pick >= 0 ? pick : 0], k = 0.2;
    const sum = (p: [string, number, Tone][]) => p.reduce((a, [, x]) => a + x, 0);
    const els: El[] = [
      txt(v(-0.2, 0.5), "önce", "w", { small: true, bold: true }), ...stack(0.5, s.before, k), txt(v(sum(s.before) * k + 0.15, 0.5), `${f(sum(s.before), 0)} g`, "e", { small: true }),
      txt(v(-0.2, -0.3), "sonra", "w", { small: true, bold: true }), ...stack(-0.3, s.after, k), txt(v(Math.max(sum(s.after), 1) * k + 0.15, -0.3), s.after.map(([l, x]) => `${l} ${f(x, 0)}`).join(" + ") + " g", "e", { small: true }),
    ];
    SCOPES.forEach((ss, i) => els.push(txt(v(i * 3.4, -1.1), ss.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-1.2, 1.0), " ", "c"), txt(v(8.0, -1.4), " ", "c"));
    return { els, readout: [s.note, "Katı değişimi ile sistem toplamını iki ayrı sonuç olarak yaz."] };
  },
};

// 2 · Oksijen alma: katı ağırlaşır.
const OXI = [
  { label: "Mg örneği", before: [["Mg", 12, "c"], ["O₂", 8, "warn"]] as [string, number, Tone][], after: [["MgO", 20, "b"]] as [string, number, Tone][], note: "12 g Mg = 0,5 mol → 0,5 mol O atomu = 8 g alınır; katı 12 → 20 g." },
  { label: "2015 LYS2 Kimya 2", before: [["Ca", 1.6, "c"], ["O₂", 1.0, "warn"]] as [string, number, Tone][], after: [["CaO", 2.24, "b"], ["O₂ artan", 0.36, "warn"]] as [string, number, Tone][], note: "2Ca + O₂ → 2CaO: Ca 0,04 mol, O₂ 0,03125 mol; gerekli O₂ 0,02 mol = 0,64 g. CaO 2,24 g, artan O₂ 0,36 g; Ca kalmaz (C)." },
];
const oxygen: FigureDef = {
  caption:
    "Metal oksitlenince katı, çevredeki gazdan oksijen alarak ağırlaşır; bu toplam kütle korunumu ile çelişmez. Bir örneğe tıkla: önce ve sonra yığılmış çubuklar çizilir. 2015 LYS2 Kimya 2 (resmî kitapçık, cevap C): tüketilen oksijen katıya, artan oksijen gaz hanesine yazılır; 2,24 + 0,36 = 2,60 g.",
  alt: "İki yığılmış çubuk: önce metal ve oksijen, sonra metal oksit ve varsa artan oksijen.",
  picks: OXI.map((o) => ({ label: o.label, title: o.label, detail: [o.note] })),
  draw: (_v, _s, pick = -1) => {
    const o = OXI[pick >= 0 ? pick : 1], tot = o.before.reduce((a, [, x]) => a + x, 0), k = 5 / tot;
    const els: El[] = [
      txt(v(-0.2, 0.5), "önce", "w", { small: true, bold: true }), ...stack(0.5, o.before, k), txt(v(5.15, 0.5), o.before.map(([l, x]) => `${l} ${f(x, 2)}`).join(" + ") + " g", "e", { small: true }),
      txt(v(-0.2, -0.3), "sonra", "w", { small: true, bold: true }), ...stack(-0.3, o.after, k), txt(v(5.15, -0.3), o.after.map(([l, x]) => `${l} ${f(x, 2)}`).join(" + ") + " g", "e", { small: true }),
    ];
    OXI.forEach((oo, i) => els.push(txt(v(i * 3.0, -1.1), oo.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-1.2, 1.0), " ", "c"), txt(v(10.0, -1.4), " ", "c"));
    return { els, readout: [o.note, "Gaz içeri girdiği için katı artar; içeri giren gazın tamamı harcanmış olmayabilir."] };
  },
};

// 3 · Kısmi dönüşüm ve inert dolgu.
const partial: FigureDef = {
  caption:
    "80 g örnek: 60 g CaCO₃ + 20 g tepkimesiz, uçmayan dolgu. Dönüşüm yüzdesini kaydır: dönüşen CaCO₃’ün 44/100’ü CO₂ olarak uçar, 56/100’ü CaO kalır. Son katı = CaO + dönüşmeyen CaCO₃ + inert. %75’te 25,2 + 15 + 20 = 60,2 g = 80 − 19,8. Son katının hepsi CaO değildir.",
  alt: "Yığılmış çubuk: CaO, dönüşmeyen CaCO₃, inert ve kesikli kutuda uçan CO₂.",
  param: { label: "Dönüşüm", min: 0, max: 100, step: 5, init: 75, unit: " %" },
  draw: (p) => {
    const conv = (60 * p) / 100, cao = conv * 0.56, co2 = conv * 0.44, left = 60 - conv, k = 0.08;
    const els: El[] = [
      ...stack(0, [["CaO", cao, "c"], ["CaCO₃", left, "b"], ["inert", 20, "muted"]], k),
      rect((cao + left + 20) * k, 80 * k, -0.22, 0.22, "warn", false),
      seg(v(80 * k, -0.4), v(80 * k, 0.4), { dash: true, thin: true, tone: "muted" }),
      txt(v(0, 0.55), `CaO ${f(cao)} · CaCO₃ ${f(left)} · inert 20 g`, "e", { small: true }),
      txt(v(80 * k, -0.55), `CO₂ ${f(co2)} g uçar`, "w", { small: true, tone: "warn" }),
    ];
    els.push(ball(v(0.1, -1.0), 0.08, "c"), txt(v(0.3, -1.0), "CaO", "e", { small: true }), ball(v(1.4, -1.0), 0.08, "b"), txt(v(1.6, -1.0), "CaCO₃", "e", { small: true }), ball(v(2.9, -1.0), 0.08, "muted"), txt(v(3.1, -1.0), "inert", "e", { small: true }));
    els.push(txt(v(-0.3, 0.9), " ", "c"), txt(v(6.8, -1.3), " ", "c"));
    return { els, readout: [`Son katı = ${f(cao)} + ${f(left)} + 20 = ${f(cao + left + 20)} g; kontrol 80 − ${f(co2)} = ${f(80 - co2)} g.`, "Dönüşüm yüzdesi başlangıç reaktifinin payıdır, kalıntıdaki ürün payı değildir."] };
  },
};

// 4 · Farktan geriye bileşim: tek ölçüm neyi belirler?
const BACK = [
  { label: "Tam ayrışma", conv: 1, note: "Dönüşen 20 g = saf içeriğin tamamı → saflık %20." },
  { label: "%50 dönüşüm", conv: 0.5, note: "Dönüşen 20 g, saf içeriğin yarısı → saf 40 g, saflık %40." },
  { label: "Bilgi yok", conv: 0, note: "8,8 g CO₂ yalnız dönüşen 20 g’ı verir; saflık tek değer değildir." },
];
const back: FigureDef = {
  caption:
    "100 g safsız CaCO₃ ısıtılınca 8,8 g CO₂ çıkıyor: dönüşen CaCO₃ = 8,8 × 100/44 = 20 g. Bir ek bilgiye tıkla: saflık ancak dönüşüm oranı da bilinirse bulunur. Bilinmeyen sayısından az bağımsız ölçüm varsa tek cevap uydurma.",
  alt: "100 g örnek çubuğu: dönüşen 20 g, varsa dönüşmeyen saf kısım ve kalan safsızlık.",
  picks: BACK.map((b) => ({ label: b.label, title: b.label, detail: [b.note] })),
  draw: (_v, _s, pick = -1) => {
    const b = BACK[pick >= 0 ? pick : 1], k = 0.045, pure = b.conv ? 20 / b.conv : 20;
    const parts: [string, number, Tone][] = b.conv ? [["dönüşen", 20, "warn"], ["dönüşmeyen saf", pure - 20, "b"], ["safsızlık", 100 - pure, "muted"]] : [["dönüşen", 20, "warn"], ["bilinmiyor", 80, "muted"]];
    const els: El[] = [...stack(0, parts, k), txt(v(0, 0.55), b.conv ? `saflık %${f(pure, 0)}` : "saflık: tek değer yok", "e", { small: true, bold: true, tone: "a" })];
    BACK.forEach((bb, i) => els.push(txt(v(0, -0.65 - i * 0.5), bb.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.3, 0.9), " ", "c"), txt(v(4.8, -1.9), " ", "c"));
    return { els, readout: [b.note + " Parçalar: " + parts.filter(([, x]) => x > 0).map(([l, x]) => `${l} ${f(x, 0)} g`).join(" · ") + ".", "NaHCO₃ ayrışmasında kayıp CO₂ + H₂O toplamıdır (168 g’dan 62 g); kaybın hepsini CO₂ sayma."] };
  },
};

export const chemistryFiguresSolidMass: Record<string, Record<string, FigureDef>> = {
  "kati-kutlesi-degisimi": {
    "Terazinin kapsamı ilk denklemindir": scope,
    "Magnezyumun oksijen alması": oxygen,
    "Kısmi dönüşümde iki katıyı topla": partial,
    "Farktan geriye bileşim bul": back,
  },
};
