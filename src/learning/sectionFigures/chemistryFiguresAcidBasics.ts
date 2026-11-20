import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Asit, baz ve tuzlar: genel özellikler. Sıcaklık 25 °C (nötr pH 7).
 * İndikatör geçiş aralıkları yaklaşık değerlerdir (OpenStax Chemistry 2e 14.7):
 * metil oranj 3,1–4,4; turnusol 4,5–8,3; fenolftalein 8,3–10,0. Renkler yazıyla
 * verilir; çubuk tonları rengin kendisi değildir. Tanecik çizimleri şematiktir.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });
const f = (x: number, d = 1) => x.toFixed(d).replace(".", ",");

// 1 · İndikatör bir aralık okur.
const IND = [
  { name: "Metil oranj", lo: 3.1, hi: 4.4, acid: "kırmızı", base: "sarı" },
  { name: "Turnusol", lo: 4.5, hi: 8.3, acid: "kırmızı", base: "mavi" },
  { name: "Fenolftalein", lo: 8.3, hi: 10.0, acid: "renksiz", base: "pembe" },
];
const indicators: FigureDef = {
  caption:
    "İndikatör bir aralık okur, tek bir pH değil. pH’ı kaydır: her göstergenin geçiş aralığı gri bantla, o pH’taki rengi yazıyla gösterilir (aralıklar yaklaşık, 25 °C). Fenolftaleinin renksiz kalması asit kanıtı değildir: pH 7 ve pH 8 de renksizdir. Metil oranjın sarısı tek başına baz kanıtı değildir.",
  alt: "0–14 pH ekseni üzerinde üç gösterge satırı: geçiş bantları ve seçilen pH’ta okunan renk adları.",
  param: { label: "pH", min: 0, max: 14, step: 0.5, init: 8, unit: "" },
  draw: (pH) => {
    const k = 0.5, els: El[] = [seg(v(0, -2.3), v(14 * k, -2.3), { thin: true, tone: "muted" })];
    [0, 7, 14].forEach((t) => els.push(txt(v(t * k, -2.6), String(t), "c", { small: true, tone: "muted" })));
    els.push(txt(v(3.5 * k, -2.95), "asidik", "c", { small: true, tone: "warn" }), txt(v(10.5 * k, -2.95), "bazik", "c", { small: true, tone: "b" }));
    IND.forEach((d, i) => {
      const y = -i * 0.75, col = pH < d.lo ? d.acid : pH > d.hi ? d.base : "geçiş";
      els.push(txt(v(-0.2, y), d.name, "w", { small: true, bold: true }), seg(v(0, y), v(14 * k, y), { thin: true, tone: "muted" }), rect(d.lo * k, d.hi * k, y - 0.15, y + 0.15, "muted"));
      els.push(txt(v(14 * k + 0.2, y), col, "e", { small: true, bold: true, tone: col === "geçiş" ? "muted" : "a" }));
    });
    els.push(seg(v(pH * k, 0.4), v(pH * k, -2.3), { tone: "a", dash: true }), txt(v(pH * k, 0.6), `pH ${f(pH)}`, "c", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-2.2, 0.9), " ", "c"), txt(v(8.6, -3.2), " ", "c"));
    const cls = pH < 7 ? "asidik" : pH > 7 ? "bazik" : "nötr";
    return { els, readout: [`pH ${f(pH)}: ${cls} (25 °C). Sınıf pH’tan, renk göstergenin aralığından okunur.`, "Kesin pH için göstergenin renk ölçeği ya da pH metre gerekir."] };
  },
};

// 2 · Formüldeki harf tek başına yetmez.
const OX = [
  { label: "N₂O₅", eq: "N₂O₅ + H₂O → 2HNO₃", cls: "asidik", why: "Formülde H yok; suyla nitrik asit oluşur." },
  { label: "CO₂", eq: "CO₂ + H₂O ⇌ (H₃O⁺ artar)", cls: "asidik", why: "Dengeler H₃O⁺ oluşumunu artırır; tüm CO₂ iyonlaşmaz." },
  { label: "NH₃", eq: "NH₃ + H₂O ⇌ NH₄⁺ + OH⁻", cls: "bazik", why: "Formülde OH yok; OH⁻ suyla oluşur." },
  { label: "CaO", eq: "CaO + H₂O → Ca(OH)₂", cls: "bazik", why: "Hidroksit oluşur; çözünen kısmı OH⁻ verir." },
  { label: "CH₃OH", eq: "Belirgin OH⁻ vermez", cls: "nötr", why: "Formüldeki OH onu NaOH gibi baz yapmaz." },
  { label: "CO", eq: "Suyla asit oluşturmaz (okul modeli)", cls: "nötr", why: "Nötr oksit: “her ametal oksidi asidiktir” genellemesinin karşı örneği." },
];
const formulas: FigureDef = {
  caption:
    "Formüldeki H ya da OH harfi tek başına yetmez; maddenin suyla ne yaptığına bak. Bir maddeye tıkla: suyla etkileşim denklemi ve oluşan ortam açılır. N₂O₅ ve CaO’da H yoktur ama biri asidik, diğeri bazik ortam oluşturur; CH₃OH’taki OH baz yapmaz.",
  alt: "Altı madde düğmesi; seçili madde için denklem ve asidik/bazik/nötr etiketi.",
  picks: OX.map((o) => ({ label: o.label, title: `${o.label}: ${o.cls}`, detail: [o.eq, o.why] })),
  draw: (_v, _s, pick = -1) => {
    const o = OX[pick >= 0 ? pick : 0], tone: Tone = o.cls === "asidik" ? "warn" : o.cls === "bazik" ? "b" : "muted";
    const els: El[] = [txt(v(0, 0.9), o.label, "e", { bold: true }), vec(v(1.6, 0.9), v(2.4, 0.9), { tone: "muted" }), txt(v(2.6, 0.9), "+ su", "e", { small: true })];
    els.push(txt(v(0, 0.2), o.eq, "e", { small: true }), rect(0, 2.2, -0.65, -0.15, tone), txt(v(1.1, -0.4), o.cls, "c", { small: true, bold: true }));
    OX.forEach((oo, i) => els.push(txt(v((i % 3) * 2.2, -1.2 - Math.floor(i / 3) * 0.55), oo.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.3, 1.3), " ", "c"), txt(v(7.0, -2.0), " ", "c"));
    return { els, readout: [`${o.label}: ${o.eq} → ${o.cls}.`, o.why] };
  },
};

// 3 · Kuvvet ile derişim.
const SAMPLES = [
  { label: "Derişik HCl", strong: true, n: 8, title: "Kuvvetli + derişik" },
  { label: "Seyreltik HCl", strong: true, n: 3, title: "Kuvvetli + seyreltik" },
  { label: "Derişik CH₃COOH", strong: false, n: 8, title: "Zayıf + derişik" },
  { label: "Seyreltik CH₃COOH", strong: false, n: 3, title: "Zayıf + seyreltik" },
];
const strength: FigureDef = {
  caption:
    "Kuvvet ile derişimi ayır. Bir çözeltiye tıkla: aynı hacimde çözünen tanecikler şematik çizilir. Kuvvet, taneciklerin ne kadarının iyonlaştığıdır (HCl’de hepsi H⁺ + Cl⁻); derişim, hacim başına ne kadar çözünen olduğudur. Su eklemek HCl’yi zayıf asit yapmaz, yalnız seyreltir.",
  alt: "Kare kap içinde tanecikler: kuvvetli asitte ayrı iyon çiftleri, zayıf asitte çoğu bütün molekül.",
  picks: SAMPLES.map((s) => ({ label: s.label, title: s.title, detail: [s.strong ? "HCl suda büyük ölçüde iyonlaşır: her tanecik H⁺ ve Cl⁻." : "CH₃COOH suda az iyonlaşır: çoğu molekül olarak kalır.", s.n > 5 ? "Derişik: hacim başına çok çözünen." : "Seyreltik: hacim başına az çözünen."] })),
  draw: (_v, _s, pick = -1) => {
    const s = SAMPLES[pick >= 0 ? pick : 1];
    const els: El[] = [rect(0, 3.6, 0, 3.0, "muted", false)];
    for (let i = 0; i < s.n; i++) {
      const x = 0.5 + (i % 4) * 0.85, y = 2.5 - Math.floor(i / 4) * 0.9;
      const ionized = s.strong || i === 0;
      if (ionized) els.push(ball(v(x - 0.15, y), 0.12, "warn"), ball(v(x + 0.18, y - 0.15), 0.16, "c"));
      else els.push(ball(v(x, y), 0.2, "muted"));
    }
    els.push(ball(v(4.2, 2.5), 0.12, "warn"), txt(v(4.4, 2.5), "H⁺", "e", { small: true }), ball(v(4.2, 2.0), 0.16, "c"), txt(v(4.4, 2.0), "anyon", "e", { small: true }), ball(v(4.2, 1.5), 0.2, "muted"), txt(v(4.4, 1.5), "molekül", "e", { small: true }));
    els.push(txt(v(1.8, -0.4), s.title, "c", { small: true, bold: true }));
    SAMPLES.forEach((ss, i) => els.push(txt(v((i % 2) * 3.2, -1.0 - Math.floor(i / 2) * 0.55), ss.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.3, 3.3), " ", "c"), txt(v(6.6, -2.0), " ", "c"));
    return { els, readout: [`${s.title}: ${s.strong ? "tamamı iyon" : "çoğu molekül"}, ${s.n > 5 ? "çok" : "az"} çözünen.`, "Aynı pH, aynı kuvvet demek değildir; derişim de sonucu etkiler."] };
  },
};

// 4 · Her tuz çözeltisi nötr değildir.
const SALTS = [
  { label: "NaCl", name: "sodyum klorür (yemek tuzu)", pH: 7, why: "Na⁺ ve Cl⁻ okul modelinde suyun dengesini belirgin değiştirmez: yaklaşık nötr." },
  { label: "Na₂CO₃", name: "sodyum karbonat (soda)", pH: 11, why: "CO₃²⁻ suyla OH⁻ oluşumuna katkı verir: bazik." },
  { label: "NaHCO₃", name: "sodyum hidrojen karbonat (yemek sodası)", pH: 8.5, why: "Suda hafif bazik; formüldeki H onu asit yapmaz." },
  { label: "NH₄Cl", name: "amonyum klorür (salamonyak)", pH: 5, why: "NH₄⁺ H₃O⁺ oluşumuna katkı verir: asidik." },
];
const salts: FigureDef = {
  caption:
    "Her tuz çözeltisi nötr değildir. Bir tuza tıkla: pH ekseninde yaklaşık bölgesi işaretlenir (değerler şematik, derişime bağlıdır; burada yalnız sınıf okunur). Dördü de iyonik ve sulu çözeltileri iletkendir: iletkenlik asitlik ya da bazlık kanıtı değildir.",
  alt: "0–14 pH ekseni; seçili tuzun konumu ve asidik/nötr/bazik etiketi; altta tuz düğmeleri.",
  picks: SALTS.map((s) => ({ label: s.label, title: `${s.label}: ${s.name}`, detail: [s.why, "Çözelti iletkendir (hareketli iyonlar)."] })),
  draw: (_v, _s, pick = -1) => {
    const s = SALTS[pick >= 0 ? pick : 1], k = 0.5;
    const els: El[] = [rect(0, 7 * k, -0.15, 0.15, "warn"), rect(7 * k, 14 * k, -0.15, 0.15, "b")];
    [0, 7, 14].forEach((t) => els.push(txt(v(t * k, -0.5), String(t), "c", { small: true, tone: "muted" })));
    const cls = s.pH < 6.5 ? "asidik" : s.pH > 7.5 ? "bazik" : "yaklaşık nötr";
    els.push(vec(v(s.pH * k, 1.0), v(s.pH * k, 0.25), { tone: "a", bold: true }), txt(v(s.pH * k, 1.25), `${s.label}: ${cls}`, "c", { small: true, bold: true, tone: "a" }));
    SALTS.forEach((ss, i) => els.push(txt(v(i * 1.8, -1.2), ss.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.5, 1.6), " ", "c"), txt(v(7.6, -1.5), " ", "c"));
    return { els, readout: [s.why, "CaCO₃ suda az çözünür: çözünürlük ile çözeltinin pH’ı ayrı sorulardır."] };
  },
};

export const chemistryFiguresAcidBasics: Record<string, Record<string, FigureDef>> = {
  "asit-baz-tuz-ozellikleri": {
    "İndikatör bir aralık okur": indicators,
    "Formüldeki harf tek başına yetmez": formulas,
    "Kuvvet ile derişimi ayır": strength,
    "Her tuz çözeltisi nötr değildir": salts,
  },
};
