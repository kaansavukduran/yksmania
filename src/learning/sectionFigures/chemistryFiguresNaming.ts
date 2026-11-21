import { ball, poly, seg, txt, v, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · İyonik bileşiklerin sistematik adlandırılması. Yük çubukları
 * şematiktir: bir birim uzunluk bir birim yük. ÖSYM bağı: 2013 YGS Fen 15
 * (yapılmış sınav, resmî cevap D); çözüm özgündür.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });

// 1 · En küçük nötr oran: yük çubukları.
const PAIRS = [
  { cat: "Mg²⁺", cq: 2, an: "O²⁻", aq: 2, nc: 1, na: 1, f: "MgO", name: "magnezyum oksit" },
  { cat: "Ca²⁺", cq: 2, an: "NO₃⁻", aq: 1, nc: 1, na: 2, f: "Ca(NO₃)₂", name: "kalsiyum nitrat" },
  { cat: "Al³⁺", cq: 3, an: "SO₄²⁻", aq: 2, nc: 2, na: 3, f: "Al₂(SO₄)₃", name: "alüminyum sülfat" },
  { cat: "NH₄⁺", cq: 1, an: "PO₄³⁻", aq: 3, nc: 3, na: 1, f: "(NH₄)₃PO₄", name: "amonyum fosfat" },
];
const balance: FigureDef = {
  caption:
    "Nötr formülde katyonların toplam + yükü anyonların toplam − yüküne eşittir. Bir iyon çiftine tıkla: her blok bir iyon, uzunluğu yükü kadar. İki sıra aynı uzunluğa gelene kadar en az sayıda blok konur; blok sayıları formülün alt indisleridir.",
  alt: "Üstte pozitif iyon blokları, altta negatif iyon blokları; iki sıra eşit uzunlukta; yanında formül ve ad.",
  picks: PAIRS.map((p) => ({ label: `${p.cat} + ${p.an}`, title: `${p.f}: ${p.name}`, detail: [`${p.nc} × (+${p.cq}) + ${p.na} × (−${p.aq}) = 0.`, `Formül ${p.f}; ad: ${p.name}.`, p.na > 1 && p.an.length > 3 ? "Çok atomlu iyon birden fazla ise grup paranteze alınır." : "Ad sırası: katyon + anyon."] })),
  draw: (_v, _s, pick = -1) => {
    const p = PAIRS[pick >= 0 ? pick : 2], u = 1.3;
    const els: El[] = [];
    for (let i = 0; i < p.nc; i++) els.push(rect(i * p.cq * u, (i + 1) * p.cq * u - 0.04, 0.3, 0.9, "b"), txt(v((i + 0.5) * p.cq * u, 0.6), p.cat, "c", { small: true, bold: true }));
    for (let i = 0; i < p.na; i++) els.push(rect(i * p.aq * u, (i + 1) * p.aq * u - 0.04, -0.9, -0.3, "warn"), txt(v((i + 0.5) * p.aq * u, -0.6), p.an, "c", { small: true, bold: true }));
    const W = p.nc * p.cq * u;
    els.push(seg(v(W + 0.05, 1.0), v(W + 0.05, -1.0), { dash: true, thin: true, tone: "a" }), txt(v(W + 0.25, 0.6), `+${p.nc * p.cq}`, "e", { small: true, tone: "b" }), txt(v(W + 0.25, -0.6), `−${p.na * p.aq}`, "e", { small: true, tone: "warn" }));
    // Formula and name under the bars keep the blocks wide enough for
    // their ion symbols on a phone.
    els.push(txt(v(0, -1.45), p.f, "e", { bold: true, tone: "a" }), txt(v(2.6, -1.45), p.name, "e", { small: true }));
    PAIRS.forEach((pp, i) => els.push(txt(v(-0.2 + i * 2.3, -2.4), `${pp.cat} + ${pp.an}`, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.4, 1.3), " ", "c"), txt(v(9.0, -2.7), " ", "c"));
    return { els, readout: [`${p.nc} × (+${p.cq}) = ${p.nc * p.cq}; ${p.na} × (−${p.aq}) = −${p.na * p.aq}; toplam 0 → ${p.f}.`, "İyonun içindeki sayılar (NO₃’teki 3) değişmez; yalnız iyon adetleri ayarlanır."] };
  },
};

// 2 · Parantez grubu çoğaltır.
const PAREN = ["Al₂(SO₄)₃", "Al₂: 2 alüminyum", "(SO₄)₃: 3 sülfat grubu", "Her grupta 1 S, 4 O", "Toplam ve yük"];
const paren: FigureDef = {
  caption:
    "Formülün sağ altındaki sayı yalnız hemen önündeki atoma, parantezin dışındaki sayı ise grubun tamamına uygulanır. Adımları ilerlet: Al₂(SO₄)₃ formül biriminde Al, S ve O sayılarını ve toplam yükü say.",
  alt: "Al₂(SO₄)₃ formülü; adımlarla iki Al iyonu ve üç sülfat grubu kutuları, her grupta S ve dört O.",
  steps: PAREN,
  draw: (_v, step) => {
    const els: El[] = [txt(v(0, 2.0), "Al₂(SO₄)₃", "e", { bold: true, tone: "a" })];
    if (step >= 1) for (let i = 0; i < 2; i++) els.push(ball(v(0.4 + i * 0.8, 0.3), 0.3, "b", "Al"));
    if (step >= 2)
      for (let g = 0; g < 3; g++) {
        const x = 2.4 + g * 1.7;
        els.push(rect(x - 0.6, x + 0.6, -0.4, 1.0, "warn", false), txt(v(x, 1.25), "SO₄²⁻", "c", { small: true }));
        if (step >= 3) {
          els.push(ball(v(x, 0.3), 0.2, "c", "S"));
          [[-0.35, 0.65], [0.35, 0.65], [-0.35, -0.05], [0.35, -0.05]].forEach(([dx, dy]) => els.push(ball(v(x + dx, dy), 0.1, "warn")));
        }
      }
    if (step >= 4) els.push(txt(v(0, -1.0), "Al = 2 · S = 3 · O = 3 × 4 = 12", "e", { small: true, bold: true, tone: "b" }), txt(v(0, -1.55), "yük: 2(+3) + 3(−2) = 0", "e", { small: true, tone: "b" }));
    els.push(txt(v(-0.4, 2.4), " ", "c"), txt(v(7.4, -1.9), " ", "c"));
    return { els, readout: [step < 4 ? `${PAREN[step]}.` : "Al 2, S 3, O 12; formül birimi nötr.", "(NH₄)₂CO₃’te dıştaki 2 bütün NH₄ grubunu çoğaltır: 2 N, 8 H."] };
  },
};

// 3 · Değişken metalin yükü.
const VAR = [
  { f: "FeCl₂", calc: "2 × (−1) = −2 → Fe +2", name: "demir(II) klorür", warn: false },
  { f: "FeCl₃", calc: "3 × (−1) = −3 → Fe +3", name: "demir(III) klorür", warn: false },
  { f: "Cu₂O", calc: "−2 ÷ 2 Cu → her Cu +1", name: "bakır(I) oksit", warn: false },
  { f: "CuO", calc: "−2 → Cu +2", name: "bakır(II) oksit", warn: false },
  { f: "Fe₂(SO₄)₃", calc: "3 × (−2) = −6; +6 ÷ 2 → Fe +3", name: "demir(III) sülfat", warn: false },
  { f: "Fe₃O₄", calc: "−8 ÷ 3 = +8/3 tek iyon yükü değil", name: "1 Fe²⁺ + 2 Fe³⁺ (karma)", warn: true },
];
const variable: FigureDef = {
  caption:
    "Fe, Cu, Sn, Pb gibi birden çok yük alabilen metalde Roma rakamı metal iyonu başına yükü verir; anyonların toplam yükünden bulunur, indisten kopyalanmaz. Bir formüle tıkla: hesap ve ad açılır. Fe₃O₄ tek tür iyon varsayımının çalışmadığı sınır örneğidir.",
  alt: "Altı satır: FeCl₂, FeCl₃, Cu₂O, CuO, Fe₂(SO₄)₃, Fe₃O₄; her birinin yük hesabı ve adı.",
  picks: VAR.map((r) => ({ label: r.f, title: `${r.f}: ${r.name}`, detail: [r.calc + ".", r.warn ? "Üç Fe’den biri +2, ikisi +3: 2 + 2 × 3 = 8. Ortalamayı Roma rakamı diye yazma." : "Ad sırası: metal adı + (Roma rakamı) + anyon adı."] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    VAR.forEach((r, i) => {
      const y = -i * 1.5, sel = pick === i;
      els.push(rect(-0.32, -0.16, y - 1.05, y + 0.25, r.warn ? "warn" : "b"));
      els.push(txt(v(0, y), r.f, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }), txt(v(2.7, y), `→ ${r.name}`, "e", { small: true, tone: sel ? "a" : "c" }), txt(v(0.3, y - 0.78), r.calc, "e", { small: true, tone: "muted" }));
    });
    els.push(txt(v(-0.6, 0.6), " ", "c"), txt(v(6.6, -8.5), " ", "c"));
    return { els, readout: [pick >= 0 ? VAR[pick].calc : "Bir formüle tıkla.", "Fe₂O₃’te (III) O’nun yanındaki 3’ten değil, 3 × (−2) = −6’nın iki Fe’ye bölünmesinden gelir."] };
  },
};

// 4 · Sülfür, sülfit, sülfat ve 2013 YGS Fen 15.
const SULF = [
  { a: "S²⁻ sülfür · MgS", b: "tek atomlu anyon", tone: "c" as Tone, detail: ["Oksijen yok: -ür eki (sülfür, klorür, oksit).", "MgS: magnezyum sülfür."] },
  { a: "SO₃²⁻ sülfit · MgSO₃", b: "3 oksijen, yük −2", tone: "b" as Tone, detail: ["Sülfit: SO₃²⁻.", "Yükü sülfatla aynı; nötrlük hesabı ikisini ayıramaz."] },
  { a: "SO₄²⁻ sülfat · MgSO₄", b: "4 oksijen, yük −2", tone: "b" as Tone, detail: ["Sülfat: SO₄²⁻.", "Adı belirleyen oksijen sayısıdır."] },
  { a: "H₂SO₄ → sülfürik asit", b: "2013 YGS Fen 15: “hidrojen sülfit” yanlış (D)", tone: "warn" as Tone, detail: ["SO₄²⁻ ile iki H⁺: H₂SO₄, sülfat kökü; adı sülfürik asit.", "Seçenekte buna “hidrojen sülfit” denmiş: kök SO₃ değil. Resmî cevap D."] },
];
const sulfur: FigureDef = {
  caption:
    "Yükleri aynı olan iyonları yük hesabı ayırmaz; kökü (oksijen sayısını) okumak gerekir. Bir satıra tıkla: sülfür, sülfit ve sülfat ile 2013 YGS Fen 15’teki hatalı etiket açılır.",
  alt: "Dört satır: S²⁻ sülfür, SO₃²⁻ sülfit, SO₄²⁻ sülfat ve H₂SO₄ sülfürik asit; son satır ÖSYM sorusu.",
  picks: SULF.map((r) => ({ label: r.a.split(" · ")[0].split(" → ")[0], title: r.a, detail: r.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    SULF.forEach((r, i) => {
      const y = -i * 1.3, sel = pick === i;
      els.push(rect(-0.32, -0.16, y - 0.85, y + 0.25, r.tone));
      els.push(txt(v(0, y), r.a, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }), txt(v(0.3, y - 0.58), r.b, "e", { small: true, tone: sel ? "a" : "c" }));
    });
    els.push(txt(v(-0.6, 0.6), " ", "c"), txt(v(6.6, -4.9), " ", "c"));
    return { els, readout: [pick >= 0 ? SULF[pick].detail[0] : "Bir satıra tıkla.", "Son kontrol: formüldeki oksijen sayısı adla uyuşuyor mu?"] };
  },
};

// 5 · Hg₂²⁺: Roma rakamı ile grup yükü.
const hg: FigureDef = {
  caption:
    "Cıva(I) katyonu iki Hg atomundan oluşan Hg₂²⁺ grubudur: (I) her Hg’nin +1 basamağını, 2+ bütün grubun yükünü anlatır. Bir Hg₂²⁺ grubunu iki Cl⁻ dengeler: Hg₂Cl₂. HgCl’ye sadeleştirmek grubu bölüp kimyasal türü değiştirir.",
  alt: "Bağlı iki Hg atomu, her birinin üstünde +1, grubun çevresinde köşeli çizgi ve 2+; yanında iki Cl⁻.",
  draw: () => {
    const els: El[] = [ball(v(0, 0), 0.34, "b"), ball(v(1.0, 0), 0.34, "b"), seg(v(0.34, 0), v(0.66, 0), { bold: true }), txt(v(0, 0), "Hg", "c", { small: true, bold: true }), txt(v(1.0, 0), "Hg", "c", { small: true, bold: true })];
    els.push(txt(v(0, 0.6), "+1", "c", { small: true, tone: "a" }), txt(v(1.0, 0.6), "+1", "c", { small: true, tone: "a" }));
    els.push(rect(-0.55, 1.55, -0.55, 0.95, "b", false), txt(v(1.8, 0.95), "2+", "c", { small: true, bold: true }));
    els.push(ball(v(3.0, 0.45), 0.3, "warn"), txt(v(3.0, 0.45), "Cl⁻", "c", { small: true, bold: true }), ball(v(3.0, -0.45), 0.3, "warn"), txt(v(3.0, -0.45), "Cl⁻", "c", { small: true, bold: true }));
    els.push(txt(v(4.0, 0.2), "Hg₂Cl₂", "e", { bold: true, tone: "a" }), txt(v(4.0, -0.4), "(+2) + 2(−1) = 0", "e", { small: true }));
    els.push(txt(v(-0.9, 1.4), " ", "c"), txt(v(6.6, -1.0), " ", "c"));
    return { els, readout: ["Hg₂²⁺ + 2 Cl⁻ → Hg₂Cl₂: cıva(I) klorür.", "En küçük oran, tanımlı iyon grupları arasında kurulur: 1 Hg₂²⁺ : 2 Cl⁻."] };
  },
};

export const chemistryFiguresNaming: Record<string, Record<string, FigureDef>> = {
  "iyonik-bilesik-adlandirma": {
    "Formülü en küçük nötr oranla kur": balance,
    "Parantez iyon grubunu çoğaltır": paren,
    "Değişken metalin yükünü nötrlükten bul": variable,
    "Çok atomlu iyonu bütün olarak koru": sulfur,
    "Roma rakamını doğru yerden oku": hg,
  },
};
