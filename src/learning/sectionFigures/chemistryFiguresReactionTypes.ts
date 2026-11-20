import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Tepkime türleri. TYT çekirdeği (2026 TTKB 10.1.3.1): yanma,
 * sentez, analiz, asit-baz, çözünme-çökelme. Redoks sütunu ve yükseltgenme
 * basamakları isteğe bağlı AYT bağlantısıdır. ÖSYM bağı: 2017 YGS Fen 23
 * (resmî cevap C); çözüm özgündür. Sayısal örnekler özgündür; PbI₂ denklemi
 * yorumdur, deney önerisi değildir.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });
const f = (x: number, d = 3) => x.toFixed(d).replace(".", ",");

// 1 · Sınıflandırmadan önce ölçütü seç.
const CRIT = ["yanma", "sentez", "analiz", "asit-baz", "çökelme", "redoks*"];
const RX = [
  { label: "2Mg + O₂ → 2MgO", m: [1, 1, 0, 0, 0, 1], why: "O₂ girer (yanma), tek bileşik oluşur (sentez), Mg 0 → +2 (redoks)." },
  { label: "CH₄ + 2O₂ → CO₂ + 2H₂O", m: [1, 0, 0, 0, 0, 1], why: "O₂ girer, iki ürün türü: yanma; sentez değil." },
  { label: "2KClO₃ → 2KCl + 3O₂", m: [0, 0, 1, 0, 0, 1], why: "Tek bileşik iki türe ayrılır; O₂ ürün olduğu için yanma değil." },
  { label: "CaO + CO₂ → CaCO₃", m: [0, 1, 0, 0, 0, 0], why: "O₂ olmadan sentez; basamak değişmez." },
  { label: "HCl + NaOH → NaCl + H₂O", m: [0, 0, 0, 1, 0, 0], why: "Proton aktarımı, su oluşur; tuz oluşumu redoks kanıtı değildir." },
  { label: "HCl + NH₃ → NH₄Cl", m: [0, 1, 0, 1, 0, 0], why: "Su oluşmadan asit-baz: NH₃ proton alır." },
  { label: "Ag⁺ + Cl⁻ → AgCl(k)", m: [0, 0, 0, 0, 1, 0], why: "Çözünmüş iyonlardan yeni katı; Ag +1, Cl −1 kalır." },
];
const criteria: FigureDef = {
  caption:
    "Sınıflandırmadan önce ölçütü seç: bir tepkime birden çok sınıfa uyabilir. Bir denkleme tıkla: altı ölçüt çipinde ✓ ya da – okunur ve gerekçe açılır. Yanma için O₂ giren olmalı; sentez/analiz tür sayısını izler; çökelme yeni katı ister. *Redoks AYT bağlantısıdır.",
  alt: "Seçili denklem için altı ölçüt çipi (✓ uyar, – uymaz) ve altta yedi denklem düğmesi.",
  picks: RX.map((r) => ({ label: r.label.split(" →")[0], title: r.label, detail: [r.why] })),
  draw: (_v, _s, pick = -1) => {
    // Mobile-friendly: the selected reaction’s six criteria as two rows of
    // chips; the reactions themselves are the pick list below.
    const r = RX[pick >= 0 ? pick : 0], els: El[] = [txt(v(0, 1.25), r.label, "e", { small: true, bold: true, tone: "a" })];
    CRIT.forEach((c, j) => {
      const x = (j % 3) * 2.3, y = 0.45 - Math.floor(j / 3) * 0.75, ok = !!r.m[j];
      els.push(rect(x, x + 2.1, y - 0.28, y + 0.28, ok ? (j === 5 ? "muted" : "b") : "muted", ok));
      els.push(txt(v(x + 1.05, y), `${c} ${ok ? "✓" : "–"}`, "c", { small: true, bold: ok, tone: ok ? "ink" : "muted" }));
    });
    RX.forEach((rr, i) => els.push(txt(v((i % 2) * 3.5, -1.0 - Math.floor(i / 2) * 0.5), rr.label.split(" →")[0], "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.2, 1.6), " ", "c"), txt(v(6.9, -2.8), " ", "c"));
    return { els, readout: [pick >= 0 ? RX[pick].why : "Bir denkleme tıkla.", "CaCO₃ ısıtılınca CO₂ çıkması yanma değil, analizdir: O₂ girmez."] };
  },
};

// 2 · Çökelmede miktar: PbI₂.
const pbi2: FigureDef = {
  caption:
    "Pb²⁺ + 2I⁻ → PbI₂(k) (tam çökelme okul modeli). 0,010 mol Pb²⁺ üzerine eklenen I⁻ miktarını kaydır: 0,020 mole kadar iyodür sınırlayıcıdır (PbI₂ = I⁻ ÷ 2), sonra Pb²⁺ tükenir ve I⁻ artar. 0,030 mol I⁻’de 0,010 mol PbI₂ ve 0,010 mol artan I⁻. Seyirci K⁺ ve NO₃⁻ çözeltide kalır.",
  alt: "Yatay eksende eklenen I⁻ molü, düşey eksende PbI₂ molü: yükselen sonra yatay kalan çizgi; artan iyon etiketi.",
  param: { label: "Eklenen I⁻", min: 0, max: 0.04, step: 0.0025, init: 0.03, unit: " mol" },
  draw: (i) => {
    const sx = 140, sy = 300, pb = 0.01, p = Math.min(pb, i / 2), leftPb = pb - p, leftI = i - 2 * p;
    const els: El[] = [vec(v(0, 0), v(0.043 * sx, 0), { thin: true }), vec(v(0, 0), v(0, 0.013 * sy), { thin: true }), txt(v(0.043 * sx, -0.75), "I⁻ (mol)", "c", { small: true }), txt(v(0.15, 0.013 * sy), "PbI₂ (mol)", "e", { small: true })];
    [0, 0.02, 0.04].forEach((t) => els.push(txt(v(t * sx, -0.35), f(t, 2), "c", { small: true, tone: "muted" })));
    els.push(txt(v(-0.15, 0.01 * sy), "0,010", "w", { small: true, tone: "muted" }));
    els.push(seg(v(0, 0), v(0.02 * sx, 0.01 * sy), { tone: "b", bold: true }), seg(v(0.02 * sx, 0.01 * sy), v(0.04 * sx, 0.01 * sy), { tone: "b", bold: true }));
    els.push(ball(v(i * sx, p * sy), 0.1, "a"));
    els.push(txt(v(0.3, 3.4), `PbI₂ ${f(p)} · artan ${leftI > 1e-9 ? `I⁻ ${f(leftI)}` : leftPb > 1e-9 ? `Pb²⁺ ${f(leftPb)}` : "yok"}`, "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.9, 3.8), " ", "c"), txt(v(6.6, -1.0), " ", "c"));
    return { els, readout: [`Gerekli I⁻ = 2 × 0,010 = 0,020 mol; eklenen ${f(i)} → ${i < 0.02 ? "I⁻ sınırlayıcı" : i > 0.02 ? "Pb²⁺ sınırlayıcı" : "tam oran"}.`, "Yük: +2 + 2(−1) = 0. PbI yazmak madde kimliğini değiştirir."] };
  },
};

// 3 · Tam iyon ve net iyon.
const BEAKERS = [
  { label: "A: NaCl + KNO₃", ions: [["Na⁺", "b"], ["Cl⁻", "c"], ["K⁺", "b"], ["NO₃⁻", "c"]] as [string, Tone][], solid: "", note: "Bütün tuzlar çözünür kalır: net iyon tepkimesi yazılmaz. İyon eşlerini kâğıtta değiştirmek yeni olay değildir." },
  { label: "B: AgNO₃ + NaCl", ions: [["Na⁺", "muted"], ["NO₃⁻", "muted"]] as [string, Tone][], solid: "AgCl(k)", note: "Ag⁺ + Cl⁻ → AgCl(k); Na⁺ ve NO₃⁻ seyirci (gri). Gözlem yeni katının oluşmasıdır." },
  { label: "C: BaCl₂ + Na₂SO₄", ions: [["Na⁺", "muted"], ["Cl⁻", "muted"]] as [string, Tone][], solid: "BaSO₄(k)", note: "Ba²⁺ + SO₄²⁻ → BaSO₄(k); Na⁺ ve Cl⁻ seyirci. Yük +2 − 2 = 0." },
];
const netIonic: FigureDef = {
  caption:
    "İki çözeltiyi karıştırmak her zaman tepkime değildir. Bir kaba tıkla: karışımdan sonra çözeltide kalan iyonlar ve dipte yeni katı çizilir. Net iyon denklemi yalnız katıya geçen iyonları içerir; seyirciler sadeleşir ama çözeltide kalır.",
  alt: "Kap kesiti: çözeltide iyon topları, dipte varsa çökelti katmanı.",
  picks: BEAKERS.map((b) => ({ label: b.label.split(":")[0], title: b.label, detail: [b.note] })),
  draw: (_v, _s, pick = -1) => {
    const b = BEAKERS[pick >= 0 ? pick : 1];
    const els: El[] = [poly([v(0, 2.6), v(0, 0), v(3.2, 0), v(3.2, 2.6)], { open: true, tone: "muted", bold: true })];
    b.ions.forEach(([s, tone], i) => els.push(ball(v(0.6 + (i % 2) * 1.8, 1.9 - Math.floor(i / 2) * 0.8), 0.3, tone), txt(v(0.6 + (i % 2) * 1.8, 1.9 - Math.floor(i / 2) * 0.8), s, "c", { small: true, bold: true })));
    if (b.solid) els.push(rect(0.1, 3.1, 0.05, 0.45, "warn"), txt(v(1.6, 0.25), b.solid, "c", { small: true, bold: true }));
    else els.push(txt(v(1.6, 0.3), "katı yok", "c", { small: true, tone: "muted" }));
    els.push(txt(v(1.6, -0.4), b.label, "c", { small: true, bold: true }));
    BEAKERS.forEach((bb, i) => els.push(txt(v(4.0, 2.2 - i * 0.6), bb.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.3, 2.9), " ", "c"), txt(v(8.4, -0.7), " ", "c"));
    return { els, readout: [b.note, "Katı, sıvı su ve gaz iyonlarına ayrılarak yazılmaz."] };
  },
};

// 4 · Elektron aktarımı ayrı bir eksendir.
const OX = [
  { label: "2Mg + O₂ → 2MgO", rows: [["Mg", "0", "+2"], ["O", "0", "−2"]] as [string, string, string][], redox: true, note: "İki Mg 4e⁻ verir, O₂’nin iki O’su 4e⁻ alır: redoks (ve yanma, sentez)." },
  { label: "2KOH + H₂SO₄", rows: [["K", "+1", "+1"], ["S", "+6", "+6"], ["O", "−2", "−2"], ["H", "+1", "+1"]] as [string, string, string][], redox: false, note: "2017 YGS Fen 23 (C): nötralleşme ve tuz (I, III) doğru; basamak değişmez, elektron alışverişi yok (II yanlış)." },
  { label: "Ag⁺ + Cl⁻ → AgCl", rows: [["Ag", "+1", "+1"], ["Cl", "−1", "−1"]] as [string, string, string][], redox: false, note: "Çökelme var, basamak değişimi yok: redoks değil." },
  { label: "Zn + Cu²⁺ → Zn²⁺ + Cu", rows: [["Zn", "0", "+2"], ["Cu", "+2", "0"]] as [string, string, string][], redox: true, note: "Zn 2e⁻ verir (yükseltgenir), Cu²⁺ 2e⁻ alır (indirgenir)." },
];
const electron: FigureDef = {
  caption:
    "Elektron aktarımı ayrı bir eksendir (AYT bağlantısı). Bir tepkimeye tıkla: her elementin yükseltgenme basamağı önce ve sonra yazılır. Değişen basamak varsa redoks; tuz ya da katı oluşması tek başına redoks kanıtı değildir.",
  alt: "Seçili tepkime için element satırları: önceki ve sonraki basamak, değişenler vurgulu.",
  picks: OX.map((o) => ({ label: o.label.split(" →")[0], title: `${o.label}: ${o.redox ? "redoks" : "redoks değil"}`, detail: [o.note] })),
  draw: (_v, _s, pick = -1) => {
    const o = OX[pick >= 0 ? pick : 1];
    const els: El[] = [txt(v(0, 1.0), o.label, "e", { small: true, bold: true }), txt(v(1.6, 0.5), "önce", "c", { small: true, tone: "muted" }), txt(v(3.0, 0.5), "sonra", "c", { small: true, tone: "muted" })];
    o.rows.forEach(([el, a, b], i) => {
      const y = 0.05 - i * 0.45, ch = a !== b;
      els.push(txt(v(0.5, y), el, "c", { small: true, bold: true }), txt(v(1.6, y), a, "c", { small: true }), vec(v(2.05, y), v(2.55, y), { thin: true, tone: ch ? "a" : "muted" }), txt(v(3.0, y), b, "c", { small: true, bold: ch, tone: ch ? "a" : "ink" }));
    });
    els.push(rect(4.0, 6.0, -0.2, 0.3, o.redox ? "a" : "muted", false), txt(v(5.0, 0.05), o.redox ? "redoks" : "redoks değil", "c", { small: true, bold: true, tone: o.redox ? "a" : "muted" }));
    OX.forEach((oo, i) => els.push(txt(v((i % 2) * 3.4, -1.9 - Math.floor(i / 2) * 0.5), oo.label.split(" →")[0], "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.3, 1.4), " ", "c"), txt(v(6.6, -2.7), " ", "c"));
    return { els, readout: [o.note, "Elementel türün basamağı 0’dır; basamak biçimsel bir sayıdır, gerçek yük değildir."] };
  },
};

export const chemistryFiguresReactionTypes: Record<string, Record<string, FigureDef>> = {
  "tepkime-turleri": {
    "Sınıflandırmadan önce ölçütü seç": criteria,
    "Çökelmede yeni katıyı ayırt et": pbi2,
    "Tam iyon ve net iyon denklemi": netIonic,
    "Elektron aktarımı ayrı bir eksendir": electron,
  },
};
