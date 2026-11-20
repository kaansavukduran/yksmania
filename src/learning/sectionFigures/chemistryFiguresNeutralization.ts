import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Asit–baz tepkimeleri. Kuvvetli asit ve baz, tam tepkime, hacimler
 * toplanabilir. TYT çekirdeği mol–katsayı ilişkisidir; pH hesabı yapılmaz.
 * ÖSYM bağı: 2017 YGS Fen 23 (yapılmış sınav, resmî cevap C); çözüm özgündür.
 * Sayısal örnekler özgündür.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });
const f = (x: number, d = 3) => x.toFixed(d).replace(".", ",");

// 1 · Seyirci iyonlar.
const LEVELS = [
  { label: "Moleküler", title: "Moleküler: HCl + NaOH → NaCl + H₂O", detail: ["Bileşikler formülleriyle yazılır; iyonlar görünmez."] },
  { label: "Tam iyon", title: "Tam iyon: H⁺ + Cl⁻ + Na⁺ + OH⁻ → Na⁺ + Cl⁻ + H₂O", detail: ["Kuvvetli sulu elektrolitler iyonlarıyla yazılır; su sıvı molekül olarak kalır."] },
  { label: "Net iyon", title: "Net iyon: H⁺ + OH⁻ → H₂O", detail: ["İki tarafta değişmeyen Na⁺ ve Cl⁻ seyircidir; çıkarılır ama yok olmaz.", "H⁺, suda H₃O⁺ için kısa gösterimdir: H₃O⁺ + OH⁻ → 2H₂O."] },
];
const spectators: FigureDef = {
  caption:
    "Aynı tepkimeyi üç düzeyde yaz. Bir düzeye tıkla: soldaki ve sağdaki tanecikler çizilir. Na⁺ ve Cl⁻ iki tarafta değişmeden kalır (seyirci, gri); değişen yalnız H⁺ + OH⁻ → H₂O’dur. Zayıf asit (CH₃COOH), katı ya da gaz serbest iyonlara parçalanarak yazılmaz.",
  alt: "Sol tarafta H⁺, Cl⁻, Na⁺, OH⁻ topları; okun sağında Na⁺, Cl⁻ ve su molekülü; seçili düzeye göre seyirciler soluk.",
  picks: LEVELS,
  draw: (_v, _s, pick = -1) => {
    const lv = pick >= 0 ? pick : 2, dim = (sp: boolean): Tone => (lv === 2 && sp ? "muted" : sp ? "c" : "b");
    const L: [string, boolean][] = [["H⁺", false], ["Cl⁻", true], ["Na⁺", true], ["OH⁻", false]];
    const els: El[] = [];
    if (lv === 0) {
      els.push(txt(v(1.3, 0), "HCl + NaOH", "c", { bold: true }), vec(v(3.0, 0), v(4.0, 0), { tone: "a", bold: true }), txt(v(5.8, 0), "NaCl + H₂O", "c", { bold: true }));
    } else {
      L.forEach(([s, sp], i) => els.push(ball(v(i * 0.85, 0), 0.34, dim(sp)), txt(v(i * 0.85, 0), s, "c", { small: true, bold: true })));
      els.push(vec(v(3.1, 0), v(3.9, 0), { tone: "a", bold: true }));
      els.push(ball(v(4.4, 0), 0.34, dim(true)), txt(v(4.4, 0), "Na⁺", "c", { small: true, bold: true }), ball(v(5.25, 0), 0.34, dim(true)), txt(v(5.25, 0), "Cl⁻", "c", { small: true, bold: true }));
      els.push(ball(v(6.2, 0), 0.4, "a"), txt(v(6.2, 0), "H₂O", "c", { small: true, bold: true }));
      if (lv === 2) els.push(txt(v(3.1, -0.75), "gri: seyirci (iki tarafta aynı)", "c", { small: true, tone: "muted" }));
    }
    LEVELS.forEach((l, i) => els.push(txt(v(i * 2.4, -1.4), l.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.6, 0.7), " ", "c"), txt(v(7.0, -1.7), " ", "c"));
    return { els, readout: [LEVELS[lv].title + ".", "Denetim: her elementin atom sayısı ve toplam yük iki tarafta aynı mı?"] };
  },
};

// 2 · Eşdeğer: asit başına OH⁻.
const ACIDS = [
  { label: "HCl", a: 1, eq: "HCl + NaOH → NaCl + H₂O", note: "1 : 1." },
  { label: "H₂SO₄", a: 2, eq: "H₂SO₄ + 2KOH → K₂SO₄ + 2H₂O", note: "2017 YGS Fen 23 (C): nötralleşme ve tuz (I, III) doğru; yükseltgenme basamakları (K +1, S +6, O −2, H +1) değişmez, redoks yok (II yanlış)." },
  { label: "H₃PO₄", a: 3, eq: "H₃PO₄ + 3NaOH → Na₃PO₄ + 3H₂O", note: "Tam nötrleme koşulu üç eşdeğerin tükenmesidir; oluşan tuz çözeltisi için otomatik pH 7 yazılmaz." },
];
const equivalents: FigureDef = {
  caption:
    "Katsayılar eşdeğer ihtiyacını verir: 0,10 mol asidi tam nötrlemek için kaç mol OH⁻ gerekir? Bir asite tıkla: çubuk gereken bazdır (asit molü × verebileceği H⁺ sayısı). Eşit mol her zaman nötr karışım demek değildir.",
  alt: "Üç yatay çubuk: HCl 0,10, H₂SO₄ 0,20, H₃PO₄ 0,30 mol OH⁻.",
  picks: ACIDS.map((A) => ({ label: A.label, title: `${A.label}: ${f(0.1 * A.a, 2)} mol OH⁻`, detail: [A.eq, A.note] })),
  draw: (_v, _s, pick = -1) => {
    const k = 12, els: El[] = [];
    ACIDS.forEach((A, i) => {
      const y = -i * 0.9, need = 0.1 * A.a, sel = pick === i;
      els.push(txt(v(-0.2, y), A.label, "w", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }), rect(0, need * k, y - 0.25, y + 0.25, sel ? "a" : "b"), txt(v(need * k + 0.15, y), `0,10 × ${A.a} = ${f(need, 2)} mol OH⁻`, "e", { small: true }));
    });
    els.push(txt(v(-1.4, 0.6), " ", "c"), txt(v(8.6, -2.2), " ", "c"));
    return { els, readout: [pick >= 0 ? ACIDS[pick].eq : "Bir asite tıkla.", "0,10 mol H₂SO₄ + 0,10 mol KOH: 0,10 mol KOH yetmez, 0,05 mol H₂SO₄ artar."] };
  },
};

// 3 · Başlangıç, değişim, son.
const bcs: FigureDef = {
  caption:
    "0,020 mol HCl üzerine NaOH ekleniyor (1 : 1). Eklenen bazı kaydır: önce artan H⁺ azalır (kırmızı), 0,020 molde ikisi de sıfırdır (eşdeğerlik), sonra artan OH⁻ büyür (mavi). Her noktada başlangıç − tepkimeye giren = son. Eşdeğerlik noktası her tuzda pH 7 demek değildir.",
  alt: "Yatay eksende eklenen NaOH molü, düşey eksende artan tür molü; inen kırmızı ve çıkan mavi doğrular ve seçili nokta.",
  param: { label: "Eklenen NaOH", min: 0, max: 0.03, step: 0.0025, init: 0.005, unit: " mol" },
  draw: (b) => {
    const sx = 180, sy = 120, a = 0.02, react = Math.min(a, b), H = a - react, OH = b - react;
    const els: El[] = [vec(v(0, 0), v(0.032 * sx, 0), { thin: true }), vec(v(0, 0), v(0, 0.024 * sy), { thin: true }), txt(v(0.032 * sx, -0.75), "NaOH (mol)", "c", { small: true }), txt(v(0.15, 0.025 * sy), "artan (mol)", "e", { small: true })];
    [0, 0.01, 0.02, 0.03].forEach((t) => els.push(txt(v(t * sx, -0.35), f(t, 2), "c", { small: true, tone: "muted" })));
    els.push(seg(v(0, a * sy), v(a * sx, 0), { tone: "warn", bold: true }), seg(v(a * sx, 0), v(0.03 * sx, 0.01 * sy), { tone: "b", bold: true }));
    els.push(ball(v(b * sx, (H || OH) * sy), 0.1, "a"));
    els.push(txt(v(0.3, 0.5), "H⁺ artar", "e", { small: true, tone: "warn" }), txt(v(4.3, 0.01 * sy), "OH⁻ artar", "e", { small: true, tone: "b" }));
    els.push(txt(v(-0.6, 3.2), " ", "c"), txt(v(6.6, -1.0), " ", "c"));
    const res = H > 1e-9 ? `${f(H)} mol H⁺ artar (asidik)` : OH > 1e-9 ? `${f(OH)} mol OH⁻ artar (bazik)` : "Artan yok: eşdeğerlik";
    return { els, readout: [`Başlangıç 0,020 HCl, ${f(b)} NaOH · değişim −${f(react)} · son: ${res}.`, "Kontrol: 0,020 = tepkimeye giren + artan asit."] };
  },
};

// 4 · Artanı son hacme böl (E5 → E6).
const STEPS = [
  { title: "1 · Mol bul", text: "HCl 0,100 L × 0,20 = 0,020 mol; NaOH 0,050 L × 0,10 = 0,005 mol.", h: 0.02, oh: 0.005, V: 0.15, res: "" },
  { title: "2 · Tepkime ve artan", text: "1 : 1 → 0,005 mol tükenir; 0,015 mol H⁺ artar. Son hacim 0,150 L: 0,015 ÷ 0,150 = 0,10 mol/L.", h: 0.015, oh: 0, V: 0.15, res: "[H⁺] = 0,10 mol/L" },
  { title: "3 · İkinci ekleme", text: "50 mL 0,40 mol/L NaOH = 0,020 mol; 0,015 mol asidi tüketir, 0,005 mol OH⁻ artar. 0,200 L: [OH⁻] = 0,025 mol/L.", h: 0, oh: 0.005, V: 0.2, res: "[OH⁻] = 0,025 mol/L" },
];
const finalVolume: FigureDef = {
  caption:
    "100 mL 0,20 mol/L HCl + 50 mL 0,10 mol/L NaOH, sonra 50 mL 0,40 mol/L NaOH. Adımı ilerlet: önce mol, sonra tepkime ve artan, en sonda artanı toplam hacme böl. İkinci eklemede ilk turda tükenmiş HCl yeniden sayılmaz; stok güncellenir.",
  alt: "Kap kesiti: içindeki hacim çizgisi ve artan H⁺ ya da OH⁻ çubuğu; adım başlığı ve derişim.",
  param: { label: "Adım", min: 0, max: 2, step: 1, init: 1, unit: "" },
  draw: (s) => {
    const st = STEPS[Math.round(s)], hk = 10;
    const els: El[] = [poly([v(0, 3), v(0, 0), v(2.4, 0), v(2.4, 3)], { open: true, tone: "muted", bold: true })];
    els.push(rect(0.05, 2.35, 0, st.V * hk, "b", true), txt(v(1.2, (st.V * hk) / 2), `${f(st.V * 1000, 0)} mL`, "c", { small: true, bold: true }));
    els.push(rect(4.6, 4.6 + st.h * 120, 1.9, 2.3, "warn"), txt(v(4.5, 2.1), "H⁺", "w", { small: true, bold: true }), txt(v(4.75 + st.h * 120, 2.1), f(st.h), "e", { small: true }));
    els.push(rect(4.6, 4.6 + st.oh * 120, 1.1, 1.5, "c"), txt(v(4.5, 1.3), "OH⁻", "w", { small: true, bold: true }), txt(v(4.75 + st.oh * 120, 1.3), f(st.oh), "e", { small: true }));
    els.push(txt(v(1.2, -0.45), st.title, "c", { small: true, bold: true }));
    if (st.res) els.push(txt(v(4.0, 0.4), st.res, "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.4, 3.3), " ", "c"), txt(v(8.4, -0.8), " ", "c"));
    return { els, readout: [st.text, "Başlangıç hacmine (0,100 L) bölmek karışımın derişimini vermez."] };
  },
};

// 5 · Gaz kimliği ve asit tüketimi.
const GASES = [
  { label: "CaCO₃", eq: "CaCO₃ + 2HCl → CaCl₂ + CO₂ + H₂O", gas: "CO₂", per: 2, n: 0.02 },
  { label: "NaHCO₃", eq: "NaHCO₃ + HCl → NaCl + CO₂ + H₂O", gas: "CO₂", per: 1, n: 0.03 },
  { label: "Mg", eq: "Mg + 2HCl → MgCl₂ + H₂", gas: "H₂", per: 2, n: 0.02 },
];
const gases: FigureDef = {
  caption:
    "Karbonatta çıkan gaz CO₂, aktif metalde H₂’dir. Bir maddeye tıkla: denklem, çıkan gaz ve tüketilen HCl çizilir. Aynı CO₂ için CaCO₃ iki, NaHCO₃ bir mol HCl tüketir. 0,020 mol CaCO₃ + 0,030 mol NaHCO₃ birlikte: 0,050 mol CO₂ ve 2 × 0,020 + 0,030 = 0,070 mol HCl.",
  alt: "Seçili madde için iki çubuk: oluşan gaz molü ve tüketilen HCl molü.",
  picks: GASES.map((g) => ({ label: g.label, title: `${g.label}: ${g.gas}`, detail: [g.eq, `${f(g.n)} mol ${g.label} → ${f(g.n)} mol ${g.gas}, ${f(g.n * g.per)} mol HCl.`] })),
  draw: (_v, _s, pick = -1) => {
    const g = GASES[pick >= 0 ? pick : 0], k = 80;
    const els: El[] = [
      txt(v(-0.2, 0.5), g.gas, "w", { small: true, bold: true }), rect(0, g.n * k, 0.25, 0.75, g.gas === "H₂" ? "c" : "b"), txt(v(g.n * k + 0.15, 0.5), `${f(g.n)} mol gaz`, "e", { small: true }),
      txt(v(-0.2, -0.4), "HCl", "w", { small: true, bold: true }), rect(0, g.n * g.per * k, -0.65, -0.15, "warn"), txt(v(g.n * g.per * k + 0.15, -0.4), `${f(g.n * g.per)} mol tüketildi`, "e", { small: true }),
      txt(v(0, 1.2), g.eq, "e", { small: true, bold: true }),
    ];
    GASES.forEach((gg, i) => els.push(txt(v(i * 2.0, -1.3), gg.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-1.0, 1.6), " ", "c"), txt(v(6.6, -1.6), " ", "c"));
    return { els, readout: [g.eq, "Gazı denklemdeki türden seç: karbonattan H₂, metalden CO₂ beklenmez."] };
  },
};

export const chemistryFiguresNeutralization: Record<string, Record<string, FigureDef>> = {
  "asit-baz-tepkimeleri": {
    "Seyirci iyon yok olmaz": spectators,
    "Katsayılar eşdeğer ihtiyacını verir": equivalents,
    "Başlangıç, değişim, son": bcs,
    "Artanı son hacme böl": finalVolume,
    "Karbonatta çıkan gaz CO₂": gases,
  },
};
