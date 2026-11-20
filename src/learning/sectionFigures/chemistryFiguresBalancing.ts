import { ball, poly, txt, v, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Kimyasal tepkimeler ve denkleştirme. Atom envanteri: her element
 * için sol ve sağ toplam (katsayı × alt indis). ÖSYM bağı: 2017 LYS2 Kimya 5
 * (yapılmış sınav, resmî cevap E); çözüm özgündür. Diğer örnekler özgündür.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });

/** İki sütunlu atom envanteri; eşit satırlar ✓, eşit olmayanlar ≠. */
function inventory(rows: [string, number, number][], x0: number, y0: number, focus = ""): El[] {
  const els: El[] = [txt(v(x0 + 1.2, y0), "sol", "c", { small: true, tone: "muted" }), txt(v(x0 + 2.4, y0), "sağ", "c", { small: true, tone: "muted" })];
  rows.forEach(([el, l, r], i) => {
    const y = y0 - 0.5 - i * 0.45, ok = l === r, hi = el === focus;
    els.push(txt(v(x0, y), el, "c", { small: true, bold: true, tone: hi ? "a" : "ink" }), txt(v(x0 + 1.2, y), String(l), "c", { small: true }), txt(v(x0 + 2.4, y), String(r), "c", { small: true }));
    els.push(txt(v(x0 + 3.2, y), ok ? "✓" : "≠", "c", { small: true, bold: true, tone: ok ? "b" : "warn" }));
  });
  return els;
}

// 1 · 2017 LYS2 Kimya 5: eksik ürünü atom sayarak bul.
const LYS = [
  { eq: "?HNO₃ + Na₂CO₃ → H₂O + X + ?NaNO₃", rows: [["Na", 2, 1], ["N", 1, 1], ["H", 1, 2], ["C", 1, 0], ["O", 6, 4]] as [string, number, number][], note: "Başlangıç: katsayısız yazım; X bilinmiyor.", focus: "" },
  { eq: "?HNO₃ + Na₂CO₃ → H₂O + X + 2NaNO₃", rows: [["Na", 2, 2], ["N", 1, 2], ["H", 1, 2], ["C", 1, 0], ["O", 6, 7]] as [string, number, number][], note: "Na: soldaki 2 Na için sağa 2NaNO₃.", focus: "Na" },
  { eq: "2HNO₃ + Na₂CO₃ → H₂O + X + 2NaNO₃", rows: [["Na", 2, 2], ["N", 2, 2], ["H", 2, 2], ["C", 1, 0], ["O", 9, 7]] as [string, number, number][], note: "N: iki nitrat için 2HNO₃; H 2 = bir H₂O.", focus: "N" },
  { eq: "2HNO₃ + Na₂CO₃ → H₂O + CO₂ + 2NaNO₃", rows: [["Na", 2, 2], ["N", 2, 2], ["H", 2, 2], ["C", 1, 1], ["O", 9, 9]] as [string, number, number][], note: "Kalan C 1 ve O 9 − 1 − 6 = 2 → X = CO₂ (E).", focus: "C" },
];
const missing: FigureDef = {
  caption:
    "2017 LYS2 Kimya 5 (resmî kitapçık, cevap E): karbonat + asit tepkimesinde eksik ürün X atom sayımıyla bulunur. Adımı ilerlet: önce Na, sonra N ve H dengelenir; geriye kalan C ve O envanteri X’i verir. Bilinen maddelerin formülleri (alt indisleri) değiştirilmez.",
  alt: "Üstte adım adım değişen denklem, altta Na, N, H, C, O için sol–sağ atom tablosu ve eşitlik işaretleri.",
  param: { label: "Adım", min: 0, max: 3, step: 1, init: 3, unit: "" },
  draw: (s) => {
    const st = LYS[Math.round(s)];
    const els: El[] = [txt(v(0, 0.9), st.eq, "e", { small: true, bold: true }), ...inventory(st.rows, 0.6, 0.3, st.focus)];
    els.push(txt(v(-0.3, 1.3), " ", "c"), txt(v(7.2, -2.3), " ", "c"));
    return { els, readout: [st.note, "Kontrol: Na 2, N 2, H 2, C 1, O 9 iki yanda da aynı."] };
  },
};

// 2 · Etanın yanmasını sırayla kur.
const ETHANE = [
  { eq: "C₂H₆ + O₂ → CO₂ + H₂O", rows: [["C", 2, 1], ["H", 6, 2], ["O", 2, 3]] as [string, number, number][], note: "Başlangıç: hiçbir satır eşit değil.", focus: "" },
  { eq: "C₂H₆ + O₂ → 2CO₂ + H₂O", rows: [["C", 2, 2], ["H", 6, 2], ["O", 2, 5]] as [string, number, number][], note: "Önce tek bileşikte geçen C: 2CO₂.", focus: "C" },
  { eq: "C₂H₆ + O₂ → 2CO₂ + 3H₂O", rows: [["C", 2, 2], ["H", 6, 6], ["O", 2, 7]] as [string, number, number][], note: "Sonra H: 6 H için 3H₂O.", focus: "H" },
  { eq: "C₂H₆ + 7/2 O₂ → 2CO₂ + 3H₂O", rows: [["C", 2, 2], ["H", 6, 6], ["O", 7, 7]] as [string, number, number][], note: "En son O: sağda 7 O → 7/2 O₂ (kesir geçici olarak kabul).", focus: "O" },
  { eq: "2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O", rows: [["C", 4, 4], ["H", 12, 12], ["O", 14, 14]] as [string, number, number][], note: "Hepsini 2 ile çarp: en küçük tam sayılar 2, 7, 4, 6.", focus: "" },
];
const ethane: FigureDef = {
  caption:
    "Etanın yanmasını sırayla kur: tek bileşikte geçen C ve H önce, iki yerde geçen O en son. Adımı ilerlet: her adımda yalnız bir katsayı değişir ve envanterdeki ilgili satır ✓ olur. Kesirli katsayı ara adımdır; sonunda tüm katsayılar ortak katla çarpılır.",
  alt: "Adım adım değişen etan yanma denklemi ve C, H, O için sol–sağ atom tablosu.",
  param: { label: "Adım", min: 0, max: 4, step: 1, init: 4, unit: "" },
  draw: (s) => {
    const st = ETHANE[Math.round(s)];
    const els: El[] = [txt(v(0, 0.9), st.eq, "e", { small: true, bold: true }), ...inventory(st.rows, 0.6, 0.3, st.focus)];
    els.push(txt(v(-0.3, 1.3), " ", "c"), txt(v(6.0, -1.5), " ", "c"));
    return { els, readout: [st.note, "C₂H₅OH yanmasında moleküldeki O’yu da say: C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O."] };
  },
};

// 3 · Katsayı değişir, kimlik değişmez.
const IDS = [
  { label: "2H₂O", title: "2H₂O: iki su molekülü", detail: ["Katsayı tüm formülü çarpar: 4 H, 2 O.", "Madde yine sudur."] },
  { label: "H₂O₂", title: "H₂O₂: hidrojen peroksit (başka madde)", detail: ["Alt indisi değiştirmek yeni bir madde yazmaktır.", "2 H, 2 O; özellikleri sudan farklıdır."] },
  { label: "3Ca(OH)₂", title: "3Ca(OH)₂: 3 Ca, 6 O, 6 H", detail: ["Katsayı 3 × parantez dışı 2: O = 3 × 2 = 6, H = 6."] },
];
const identity: FigureDef = {
  caption:
    "Katsayı değişir, kimlik değişmez. Bir yazıma tıkla: tanecikler çizilir. 2H₂O iki ayrı su molekülüdür; H₂O₂ ise O’ları birbirine bağlı tek bir başka moleküldür. Denkleştirirken yalnız katsayılar değişir, doğru formülün alt indisi değişmez.",
  alt: "Seçili yazımın molekül çizimi: iki su molekülü ya da tek hidrojen peroksit molekülü ya da üç Ca(OH)₂ birimi.",
  picks: IDS,
  draw: (_v, _s, pick = -1) => {
    const p = pick >= 0 ? pick : 0, els: El[] = [];
    const water = (x: number) => { els.push(ball(v(x, 0), 0.3, "warn"), ball(v(x - 0.38, -0.3), 0.17, "b"), ball(v(x + 0.38, -0.3), 0.17, "b")); };
    if (p === 0) { water(0.8); water(2.6); }
    else if (p === 1) els.push(ball(v(1.3, 0), 0.3, "warn"), ball(v(2.0, 0), 0.3, "warn"), ball(v(0.8, -0.35), 0.17, "b"), ball(v(2.5, 0.35), 0.17, "b"));
    else for (let k = 0; k < 3; k++) { const x = k * 1.5; els.push(ball(v(x, 0), 0.28, "c"), ball(v(x - 0.45, 0.4), 0.2, "warn"), ball(v(x + 0.45, 0.4), 0.2, "warn"), ball(v(x - 0.7, 0.65), 0.12, "b"), ball(v(x + 0.7, 0.65), 0.12, "b")); }
    els.push(txt(v(1.7, -0.95), IDS[p].title, "c", { small: true, bold: true, tone: "a" }));
    els.push(ball(v(4.6, 0.6), 0.12, "warn"), txt(v(4.8, 0.6), "O", "e", { small: true }), ball(v(4.6, 0.2), 0.12, "b"), txt(v(4.8, 0.2), "H", "e", { small: true }), ball(v(4.6, -0.2), 0.12, "c"), txt(v(4.8, -0.2), "Ca", "e", { small: true }));
    IDS.forEach((d, i) => els.push(txt(v(i * 1.9, -1.6), d.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-1.0, 1.1), " ", "c"), txt(v(5.6, -1.9), " ", "c"));
    return { els, readout: [IDS[p].detail[0], "Fe₂O₃ yerine FeO₂ yazmak denkleştirme değil, ürünü değiştirmektir."] };
  },
};

// 4 · Yükü ayrıca koru.
const IONIC = [
  { label: "Ag⁺ + Cl⁻", eq: "Ag⁺ + Cl⁻ → AgCl(k)", l: "+1 − 1 = 0", r: "0", ok: true, note: "AgNO₃ + NaCl: Na⁺ ve NO₃⁻ seyirci; katı AgCl iyonlara ayrılmaz." },
  { label: "Ba²⁺ + SO₄²⁻", eq: "Ba²⁺ + SO₄²⁻ → BaSO₄(k)", l: "+2 − 2 = 0", r: "0", ok: true, note: "Atomlar Ba 1, S 1, O 4; yük 0 = 0." },
  { label: "Pb²⁺ + 2I⁻", eq: "Pb²⁺ + 2I⁻ → PbI₂(k)", l: "+2 − 2 = 0", r: "0", ok: true, note: "1 : 2 oranı yükle de denetlenir." },
  { label: "Ag⁺ + 2Cl⁻ (hatalı)", eq: "Ag⁺ + 2Cl⁻ → AgCl", l: "+1 − 2 = −1", r: "0", ok: false, note: "Hem Cl sayısı hem yük bozuk: solda −1, sağda 0." },
];
const charge: FigureDef = {
  caption:
    "Yükü ayrıca koru: iyonlu denklemde atomlar gibi toplam elektrik yükü de iki tarafta eşit olmalı. Bir net iyon denklemine tıkla: sol ve sağ yük toplamı yazılır; hatalı denklemde yük terazisi bozulur.",
  alt: "Seçili net iyon denklemi ve altında sol/sağ yük toplamları; eşitse ✓, değilse ≠.",
  picks: IONIC.map((d) => ({ label: d.label, title: `${d.eq} (yük ${d.ok ? "korunur" : "bozuk"})`, detail: [d.note] })),
  draw: (_v, _s, pick = -1) => {
    const d = IONIC[pick >= 0 ? pick : 0];
    const els: El[] = [txt(v(0, 0.9), d.eq, "e", { bold: true })];
    els.push(rect(0, 2.4, -0.1, 0.4, d.ok ? "b" : "warn", false), txt(v(1.2, 0.15), `sol: ${d.l}`, "c", { small: true }), rect(3.0, 4.6, -0.1, 0.4, d.ok ? "b" : "warn", false), txt(v(3.8, 0.15), `sağ: ${d.r}`, "c", { small: true }));
    els.push(txt(v(5.0, 0.15), d.ok ? "✓" : "≠", "c", { bold: true, tone: d.ok ? "b" : "warn" }));
    IONIC.forEach((dd, i) => els.push(txt(v((i % 2) * 3.0, -0.6 - Math.floor(i / 2) * 0.55), dd.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.3, 1.3), " ", "c"), txt(v(6.0, -1.9), " ", "c"));
    return { els, readout: [d.note, "Onarım örneği: Al³⁺ + 3OH⁻ → Al(OH)₃(k); +3 − 3 = 0."] };
  },
};

// 5 · Hangi nicelik değişebilir?
const QTY = [
  { label: "Atom", l: 6, r: 6, unit: "atom", note: "4 H + 2 O = 6 = 6: atom türü ve sayısı korunur." },
  { label: "Kütle", l: 36, r: 36, unit: "g", note: "2 × 2 + 32 = 36 g = 2 × 18 g: kapalı sistemde kütle korunur." },
  { label: "Molekül", l: 3, r: 2, unit: "mol", note: "2 + 1 = 3 mol → 2 mol: molekül (mol) sayısı değişebilir." },
];
const conserved: FigureDef = {
  caption:
    "2H₂ + O₂ → 2H₂O (2 mol H₂ + 1 mol O₂). Bir niceliğe tıkla: giren ve ürün çubukları karşılaştırılır. Atom sayısı ve kütle korunur; molekül sayısı (dolayısıyla gaz hacmi) değişebilir. Denkleşmiş katsayılar mol oranını verir.",
  alt: "Seçili nicelik için iki çubuk: girenler ve ürünler.",
  picks: QTY.map((q) => ({ label: q.label, title: `${q.label}: ${q.l} → ${q.r} ${q.unit}`, detail: [q.note] })),
  draw: (_v, _s, pick = -1) => {
    const q = QTY[pick >= 0 ? pick : 2], k = 4.5 / Math.max(q.l, q.r);
    const els: El[] = [
      txt(v(-0.2, 0.5), "girenler", "w", { small: true, bold: true }), rect(0, q.l * k, 0.3, 0.7, "b"), txt(v(q.l * k + 0.15, 0.5), `${q.l} ${q.unit}`, "e", { small: true }),
      txt(v(-0.2, -0.3), "ürünler", "w", { small: true, bold: true }), rect(0, q.r * k, -0.5, -0.1, q.l === q.r ? "b" : "warn"), txt(v(q.r * k + 0.15, -0.3), `${q.r} ${q.unit}`, "e", { small: true }),
    ];
    QTY.forEach((qq, i) => els.push(txt(v(i * 1.8, -1.1), qq.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-1.6, 1.0), " ", "c"), txt(v(6.0, -1.4), " ", "c"));
    return { els, readout: [q.note, "4H₂ + 2O₂ → 4H₂O denktir ama en küçük değildir: hepsi 2’ye bölünür."] };
  },
};

export const chemistryFiguresBalancing: Record<string, Record<string, FigureDef>> = {
  "tepkimeler-denklemler": {
    "Atom envanterini iki sütuna ayır": missing,
    "Etanın yanmasını sırayla kur": ethane,
    "Katsayı değişir, kimlik değişmez": identity,
    "Yükü ayrıca koru": charge,
    "Hangi nicelik değişebilir": conserved,
  },
};
