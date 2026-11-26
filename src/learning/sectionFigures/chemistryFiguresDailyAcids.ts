import { poly, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Hayatımızdaki asit ve bazlar. Kireç döngüsü:
 * CaCO₃ → CaO + CO₂ (ısıl ayrışma), CaO + H₂O → Ca(OH)₂ (söndürme),
 * Ca(OH)₂ + CO₂ → CaCO₃ + H₂O (karbonatlaşma). M: CaCO₃ 100, CaO 56,
 * CO₂ 44 g/mol. ÖSYM bağı: 2023 TYT Fen 8 (yapılmış sınav, resmî cevap E);
 * çözüm özgündür. Sayısal örnekler özgündür. Tat ya da koku tanıma testi değildir.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });
const f = (x: number, d = 1) => x.toFixed(d).replace(".", ",");

// 1 · Kirecin üç ayrı adı.
const LIME = [
  { label: "Kireç taşı", formula: "CaCO₃", els: ["Ca", "C", "O"] },
  { label: "Sönmemiş kireç", formula: "CaO", els: ["Ca", "O"] },
  { label: "Sönmüş kireç", formula: "Ca(OH)₂", els: ["Ca", "O", "H"] },
];
const limeCycle: FigureDef = {
  caption:
    "Kirecin üç ayrı adı, üç ayrı formül. Bir bileşiğe tıkla: içerdiği elementler açılır. Oklar döngüyü gösterir: kireç taşı ısıtılınca CO₂ kaybeder, sönmemiş kireç suyla söner, sönmüş kireç havadaki CO₂ ile yeniden karbonata döner. 2023 TYT Fen 8 (resmî kitapçık, cevap E): üçünde ortak elementler Ca ve O’dur; C yalnız karbonatta, H yalnız hidroksitte.",
  alt: "Yatay döngü: CaCO₃ → CaO → Ca(OH)₂ ve alttan CaCO₃’e dönüş oku; okların üstünde işlem.",
  picks: LIME.map((l) => ({ label: l.label, title: `${l.label}: ${l.formula}`, detail: [`Elementler: ${l.els.join(", ")}.`, "Ortak elementler (üçü): Ca ve O. Atom sayıları aynı olmak zorunda değildir."] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [], X = [0, 3.6, 7.2];
    LIME.forEach((l, i) => {
      const x = X[i], sel = pick === i;
      els.push(rect(x - 1.0, x + 1.0, -0.35, 0.35, sel ? "a" : "b", sel), txt(v(x, 0), l.formula, "c", { small: true, bold: true }), txt(v(x, -0.65), l.label, "c", { small: true, bold: sel, tone: sel ? "a" : "ink", pick: i }));
      if (sel) els.push(txt(v(x, 0.92), l.els.join(" · "), "c", { small: true, tone: "a" }));
    });
    els.push(vec(v(1.1, 0), v(2.5, 0), { tone: "warn" }), txt(v(1.8, 0.35), "ısı: −CO₂", "c", { small: true, tone: "muted" }));
    els.push(vec(v(4.7, 0), v(6.1, 0), { tone: "warn" }), txt(v(5.4, 0.3), "+H₂O", "c", { small: true, tone: "muted" }));
    els.push(poly([v(7.2, -0.95), v(7.2, -1.3), v(0, -1.3)], { open: true, tone: "warn", thin: true }), vec(v(0, -1.3), v(0, -0.95), { tone: "warn", thin: true }), txt(v(3.6, -1.6), "+ CO₂ (havadan), − H₂O", "c", { small: true, tone: "muted" }));
    els.push(txt(v(-1.3, 1.25), " ", "c"), txt(v(8.5, -1.9), " ", "c"));
    return { els, readout: [pick >= 0 ? `${LIME[pick].label} = ${LIME[pick].formula}: ${LIME[pick].els.join(", ")}.` : "Bir bileşiğe tıkla.", "Söndürme CaO + H₂O’dur; CaCO₃’e su eklemek kireç söndürmek değildir."] };
  },
};

// 2 · Kireç asitte neden köpürür?
const purity: FigureDef = {
  caption:
    "Kireç çözünürken CO₂ çıkar: CaCO₃ + 2HCl → CaCl₂ + CO₂ + H₂O. 50 g kireç taşı örneği yeterli HCl ile; CaCO₃ dışındaki kısım tepkime vermez (özgün model). Saflığı kaydır: yalnız saf kısım mole çevrilir (%80 → 40 g = 0,40 mol), o kadar CO₂ çıkar ve iki katı HCl harcanır. Kabarcık H₂ değil CO₂’dir.",
  alt: "Üstte örnek çubuğu (CaCO₃ ve inert), altta çıkan CO₂ ve harcanan HCl çubukları.",
  param: { label: "CaCO₃ saflığı", min: 0, max: 100, step: 5, init: 80, unit: " %" },
  draw: (p) => {
    const ca = (50 * p) / 100, n = ca / 100, k = 0.12, mk = 10;
    const els: El[] = [
      txt(v(-0.2, 0.9), "örnek", "w", { small: true, bold: true }), rect(0, ca * k, 0.7, 1.1, "b"), rect(ca * k, 50 * k, 0.7, 1.1, "muted"),
      txt(v(0, 1.4), `CaCO₃ ${f(ca)} g · inert ${f(50 - ca)} g`, "e", { small: true }),
      txt(v(-0.2, 0), "CO₂", "w", { small: true, bold: true }), rect(0, Math.max(n * mk, 0.001), -0.2, 0.2, "c"), txt(v(n * mk + 0.15, 0), `${f(n, 2)} mol = ${f(n * 44)} g`, "e", { small: true }),
      txt(v(-0.2, -0.7), "HCl", "w", { small: true, bold: true }), rect(0, Math.max(2 * n * mk, 0.001), -0.9, -0.5, "warn"), txt(v(2 * n * mk + 0.15, -0.7), `${f(2 * n, 2)} mol harcanır`, "e", { small: true }),
    ];
    els.push(txt(v(-1.2, 1.7), " ", "c"), txt(v(8.4, -1.2), " ", "c"));
    return { els, readout: [`Saf CaCO₃ = 50 × ${p} ÷ 100 = ${f(ca)} g = ${f(n, 2)} mol → ${f(n, 2)} mol CO₂, ${f(2 * n, 2)} mol HCl.`, "İnert kısmı katsayıyla ürüne çevirme; karbonatlı mermer asit yağmurunda aynı yolla aşınır."] };
  },
};

// 3 · İki soda, iki farklı tuz.
const SODAS = [
  { label: "NaHCO₃", name: "yemek sodası", cls: "tuz (hidrojen karbonat)", atoms: [1, 0, 1, 1, 3] },
  { label: "Na₂CO₃", name: "çamaşır sodası", cls: "tuz (karbonat)", atoms: [2, 0, 0, 1, 3] },
  { label: "CaCO₃", name: "kireç taşı", cls: "tuz (karbonat), suda az çözünür", atoms: [0, 1, 0, 1, 3] },
  { label: "NaOH", name: "sud kostik (kostik soda)", cls: "baz (hidroksit)", atoms: [1, 0, 1, 0, 1] },
];
const ELS = ["Na", "Ca", "H", "C", "O"];
const sodas: FigureDef = {
  caption:
    "İki soda, iki farklı tuz. Bir maddeye tıkla: formül birimindeki atom sayıları satırda işaretlenir. Ortak “soda” ya da “karbonat” sözcüğü aynı formülü göstermez: yemek sodası NaHCO₃, çamaşır sodası Na₂CO₃’tür; kostik soda NaOH ise bazdır.",
  alt: "Satırlarda dört madde, sütunlarda Na, Ca, H, C, O atom sayıları; seçili satır vurgulu.",
  picks: SODAS.map((s) => ({ label: s.label, title: `${s.label}: ${s.name}`, detail: [`Sınıf: ${s.cls}.`, `Na : Ca : H : C : O = ${s.atoms.join(" : ")}.`] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    ELS.forEach((e, j) => els.push(txt(v(2.0 + j * 0.8, 0.6), e, "c", { small: true, bold: true })));
    SODAS.forEach((s, i) => {
      const y = -i * 0.55, sel = pick === i;
      if (sel) els.push(rect(-0.2, 5.6, y - 0.24, y + 0.24, "a", false));
      els.push(txt(v(0, y), s.label, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }));
      s.atoms.forEach((n, j) => els.push(txt(v(2.0 + j * 0.8, y), n ? String(n) : "–", "c", { small: true, tone: n ? "ink" : "muted" })));
    });
    els.push(txt(v(-0.4, 1.0), " ", "c"), txt(v(6.0, -2.0), " ", "c"));
    return { els, readout: [pick >= 0 ? `${SODAS[pick].label} (${SODAS[pick].name}): ${SODAS[pick].cls}.` : "Bir maddeye tıkla.", "Na₂CO₃ ve NaHCO₃ çözeltileri bazik olabilir; katı yine tuzdur."] };
  },
};

// 4 · Ürün adı bir formül değildir.
const NAMES = [
  { label: "Tuz ruhu", formula: "HCl (sulu)", cls: "asit", note: "Hidroklorik asit çözeltisi; derişim etikette." },
  { label: "Kezzap", formula: "HNO₃", cls: "asit", note: "Nitrik asit; yükseltgen asit örneği." },
  { label: "Zaç yağı", formula: "H₂SO₄", cls: "asit", note: "Sülfürik asit; derişik hâli nem çeker, suyla karışırken ısı açığa çıkar." },
  { label: "Sirke", formula: "CH₃COOH içerir", cls: "asit", note: "Seyreltik karışım; saf asetik asit değildir." },
  { label: "Limon", formula: "C₆H₈O₇ içerir", cls: "asit", note: "Sitrik asit; ürün başka bileşenler de taşır." },
  { label: "Potas kostik", formula: "KOH", cls: "baz", note: "Sud kostik NaOH’tan farklı metal: K." },
  { label: "Amonyak", formula: "NH₃", cls: "baz", note: "Formülde OH yok; suyla OH⁻ oluşturur." },
];
const names: FigureDef = {
  caption:
    "Ürün adı bir formül değildir; derişim ya da pH da vermez. Bir günlük ada tıkla: kimyasal tür, sınıf ve sınırı açılır. Tat ya da koku tanıma yöntemi değildir; bilinmeyen kimyasala dokunulmaz.",
  alt: "Yedi günlük ad düğmesi; seçili adın formülü ve asit/baz etiketi.",
  picks: NAMES.map((n) => ({ label: n.label, title: `${n.label}: ${n.formula}`, detail: [n.note] })),
  draw: (_v, _s, pick = -1) => {
    const n = NAMES[pick >= 0 ? pick : 2];
    const els: El[] = [txt(v(0, 0.9), n.label, "e", { bold: true }), vec(v(2.6, 0.9), v(3.3, 0.9), { tone: "muted" }), txt(v(3.5, 0.9), n.formula, "e", { bold: true, tone: "a" })];
    els.push(rect(0, 1.6, 0.1, 0.5, n.cls === "asit" ? "warn" : "b"), txt(v(0.8, 0.3), n.cls, "c", { small: true, bold: true }));
    NAMES.forEach((nn, i) => els.push(txt(v((i % 3) * 2.4, -0.4 - Math.floor(i / 3) * 0.55), nn.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.3, 1.3), " ", "c"), txt(v(7.0, -1.8), " ", "c"));
    return { els, readout: [`${n.label} → ${n.formula} (${n.cls}). ${n.note}`, "Adı formüle çevir; derişim için etiket ya da ölçüm gerekir."] };
  },
};

export const chemistryFiguresDailyAcids: Record<string, Record<string, FigureDef>> = {
  "hayatimizda-asit-baz": {
    "Kirecin üç ayrı adı": limeCycle,
    "Kireç çözünürken neden CO₂ çıkar?": purity,
    "İki soda, iki farklı tuz": sodas,
    "Ürün adı bir formül değildir": names,
  },
};
