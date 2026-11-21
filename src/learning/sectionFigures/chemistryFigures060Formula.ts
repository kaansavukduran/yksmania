import { ball, circle, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { axes, box, nf, pad, xtick, ytick } from "./physicsFigures058Kit";
import { hbars, sb, vstack } from "./chemistryFigures060Kit";

/*
 * Forge060 Kimya: formül ve mol hesapları. Basit / molekül formülü (C 3,6 g,
 * H 0,6 g, O 4,8 g → CH₂O; 1,5 : 4 : 1 → C₃H₈O₂; %40 C, %6,67 H, %53,33 O;
 * C₂H₃O ve 86 g/mol; CO₂'de 12/44, H₂O'da 2/18), TYT mol (H₂O 18, CO₂ 44,
 * Ca(OH)₂ 74 g/mol; 36 g su; 22,4 ve 24,5 L/mol) ve kütlenin korunumu
 * (14 g Fe + 12 g S → 22 g FeS + 4 g S; CO₂ atom ve kütle oranı; su ve CO₂
 * element kütlesi grafiği). Bütün sayılar bölüm metnindeki örneklerdir.
 */

const EL: { s: string; tone: Tone }[] = [
  { s: "C", tone: "a" },
  { s: "H", tone: "b" },
  { s: "O", tone: "c" },
];

/** Üç elementin değerleri için düşey çubuk grubu; çubuk boyu değer / max. */
function trio(vals: number[], max: number, fmt: (x: number) => string, hgt = 3): El[] {
  const els: El[] = [];
  vals.forEach((val, i) => {
    const x = i * 1.6;
    const h = (hgt * val) / max;
    els.push(box(x - 0.45, 0, x + 0.45, h, EL[i].tone));
    els.push(txt(v(x, h), fmt(val), "n", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(x, 0), EL[i].s, "s", { tone: "ink", small: true, bold: true }));
  });
  els.push(seg(v(-0.8, 0), v(4.0, 0), { tone: "ink", thin: true }));
  return els;
}

/* ---------- basit-ve-molekul-formul ---------- */

const TABLE = { m: [3.6, 0.6, 4.8], M: [12, 1, 16] };
const columns: FigureDef = {
  caption:
    "İleri ile üç sütunlu tabloyu kur: kütle → mol (n = m ÷ M_atom) → en küçük mole bölünmüş oran. C 3,6 g, H 0,6 g, O 4,8 g örneğinde kütle çubukları atom sayısını göstermez; mol çubukları gösterir. Oran 1 : 2 : 1, basit formül CH₂O. (C 12, H 1, O 16 g/mol.)",
  alt: "C, H, O için üç düşey çubuk; adıma göre kütle (g), mol ya da oran. Kütlede O en uzun, molde H en uzun.",
  steps: ["Kütle (g)", "Mol", "Oran"],
  draw: (_v, step) => {
    const mol = TABLE.m.map((m, i) => m / TABLE.M[i]);
    const ratio = mol.map((n) => n / Math.min(...mol));
    const vals = step === 0 ? TABLE.m : step === 1 ? mol : ratio;
    const unit = ["g", "mol", ""][step];
    const els = trio(vals, Math.max(...vals), (x) => `${nf(x, 2)}${unit ? " " + unit : ""}`);
    els.push(...pad(-1.3, 4.0, 4.6, -0.8));
    const rows: [string, string][] = [
      ["Kütle: C 3,6 g · H 0,6 g · O 4,8 g.", "Kütle oranı atom oranı değildir: C, H'den 12 kat ağırdır."],
      ["Mol: 3,6 ÷ 12 = 0,3 · 0,6 ÷ 1 = 0,6 · 4,8 ÷ 16 = 0,3.", "Avogadro sayısı bütün sütunlarda ortak çarpandır."],
      ["En küçük mole (0,3) böl: 1 : 2 : 1 → CH₂O.", "Mol oranı = atom adetleri oranı."],
    ];
    return { els, readout: rows[step] };
  },
};

const fraction: FigureDef = {
  caption:
    "Sürgüyle ortak çarpanı seç. En küçük mole bölünmüş oran 1,5 : 4 : 1 ise yalnız 1,5'i 2'ye yuvarlamak oranı bozar; bütün terimler aynı katla çarpılır. Çarpan 2'de üç terim de tam sayı olur: C₃H₈O₂.",
  alt: "C, H, O için üç düşey çubuk; çarpanla birlikte büyür. Tam sayı olmayan terimin üstünde kesirli değer yazar.",
  param: { label: "Ortak çarpan", min: 1, max: 4, step: 1, init: 1, unit: "" },
  draw: (k) => {
    const vals = [1.5 * k, 4 * k, 1 * k];
    const els = trio(vals, 16, (x) => nf(x, 2), 3.6);
    els.push(...pad(-1.3, 4.5, 4.6, -0.8));
    const ok = vals.every((x) => Number.isInteger(x));
    const f = `C${sb(vals[0])}H${sb(vals[1])}O${sb(vals[2])}`;
    return { els, readout: [`× ${k}: ${nf(vals[0], 1)} : ${vals[1]} : ${vals[2]}`, ok ? `Hepsi tam sayı → ${k === 2 ? "en küçük tam oran: " : ""}${f}` : "1,5 · k tam sayı değil: çarpan yetmiyor."] };
  },
};

const percent: FigureDef = {
  caption:
    "İleri ile yüzde bileşimden formüle geç. 100 g örnek seçmek yalnız bir hesap ölçeğidir: %40 C, %6,67 H, %53,33 O doğrudan 40 g, 6,67 g, 53,33 g olur. Atom mol kütlelerine bölünce 3,33 : 6,67 : 3,33 = 1 : 2 : 1 → CH₂O.",
  alt: "Birinci adımda 100 g'lık tek yatay çubuk C, H, O paylarına bölünmüş. İkinci adımda üç düşey mol çubuğu.",
  steps: ["100 g örnek", "Mol oranı"],
  draw: (_v, step) => {
    const g = [40, 6.67, 53.33];
    const els: El[] = [];
    if (step === 0) {
      let x = 0;
      const k = 0.06;
      g.forEach((m, i) => {
        els.push(box(x, 0, x + m * k, 0.7, EL[i].tone));
        els.push(txt(v(x + (m * k) / 2, i === 1 ? 0.7 : 0), `${EL[i].s} ${nf(m, 2)} g`, i === 1 ? "n" : "s", { tone: "ink", small: true, bold: true }));
        x += m * k;
      });
      els.push(txt(v(100 * k, 0.35), "100 g", "e", { tone: "muted", small: true }));
      els.push(...pad(-0.4, 2.0, 7.6, -1.0));
    } else {
      const mol = g.map((m, i) => m / TABLE.M[i]);
      els.push(...trio(mol, Math.max(...mol), (x) => `${nf(x, 2)} mol`));
      els.push(...pad(-1.3, 4.0, 4.6, -0.8));
    }
    const rows: [string, string][] = [
      ["100 g seçildi: C 40 g, H 6,67 g, O 53,33 g.", "Seçim oranları değiştirmez; gerçek örnek kütlesi değildir."],
      ["40 ÷ 12 = 3,33 · 6,67 ÷ 1 = 6,67 · 53,33 ÷ 16 = 3,33 → 1 : 2 : 1 → CH₂O.", "Başka element varsa kalan kütleyi otomatik O sayma."],
    ];
    return { els, readout: rows[step] };
  },
};

const multiple: FigureDef = {
  caption:
    "Sürgüyle n katsayısını değiştir. Basit formül C₂H₃O'nun kütlesi 2 · 12 + 3 · 1 + 16 = 43 g/mol'dür. Molekül formülü n · (basit formül), kütlesi n · 43'tür; verilen 86 g/mol'e (kesikli çizgi) yalnız n = 2 uyar ve bütün alt indisler 2 ile çarpılır: C₄H₆O₂.",
  alt: "Düşey çubuk n · 43 g/mol; 86 g/mol düzeyinde yatay kesikli çizgi. Çubuğun yanında formül.",
  param: { label: "n", min: 1, max: 3, step: 1, init: 1, unit: "" },
  draw: (n) => {
    const k = 0.028;
    const els: El[] = [...vstack(Array.from({ length: n }, (_, i) => ({ value: 43, tone: (i % 2 ? "b" : "a") as Tone, label: "43" })), 0, 0, k, 1.0)];
    els.push(seg(v(-1.0, 86 * k), v(3.6, 86 * k), { tone: "warn", dash: true }), txt(v(3.6, 86 * k), "86 g/mol", "e", { tone: "warn", small: true, bold: true }));
    els.push(seg(v(-1.0, 0), v(3.6, 0), { tone: "ink", thin: true }));
    els.push(txt(v(1.0, 43 * n * k * 0.5 + 0.1), `C${sb(2 * n)}H${sb(3 * n)}O${sb(n)}`, "e", { tone: "ink", bold: true }));
    els.push(...pad(-1.2, 129 * k + 0.4, 6.0, -0.4));
    return { els, readout: [`n = ${n}: ${n} · 43 = ${43 * n} g/mol ${43 * n === 86 ? "= 86 → uyar" : "≠ 86"}`, "n = M_molekül ÷ M_basit = 86 ÷ 43 = 2; n her elemente uygulanır."] };
  },
};

/** Bir ürün molekülünün kütlesini izlenen atom ile kalan arasında bölen yatay çubuk. */
function split(total: number, part: number, pLabel: string, rLabel: string, tone: Tone): El[] {
  const k = 6 / total;
  const els: El[] = [box(0, 0, part * k, 0.7, tone), box(part * k, 0, total * k, 0.7, "muted")];
  els.push(txt(v((part * k) / 2, 0), pLabel, "s", { tone: "ink", small: true, bold: true }), txt(v(part * k + ((total - part) * k) / 2, 0.35), rLabel, "c", { tone: "ink", small: true, bold: true }));
  els.push(txt(v(3, 0.7), `${total} g`, "n", { tone: "muted", small: true }));
  els.push(...pad(-0.5, 1.8, 6.5, -1.0));
  return els;
}

const carbon: FigureDef = {
  caption:
    "Tam yanmada örnekteki bütün karbon CO₂'ye geçer: 44 g CO₂'nin 12 g'ı karbondur, m_C = m_CO₂ · 12 ÷ 44. Kalan 32 g oksijenin bir bölümü yakma sırasında kullanılan O₂'den gelir; o yüzden CO₂ kütlesinin tamamını örneğe yazamazsın.",
  alt: "44 g'lık yatay çubuk: 12 g karbon payı renkli, 32 g oksijen payı gri.",
  draw: () => ({ els: split(44, 12, "C 12 g", "O 32 g", "a"), readout: ["n_C = n_CO₂; m_C = m_CO₂ · 12 ÷ 44.", "Ürünlerdeki O'yu doğrudan örneğin O'su sayma."] }),
};

const hydrogen: FigureDef = {
  caption:
    "Suyun bir molekülünde iki H vardır: 18 g H₂O, 2 g H atomu içerir; m_H = m_H₂O · 2 ÷ 18 ve n_H = 2 · n_H₂O. Sorulan H atomu miktarıdır, H₂ gazı değil: 0,40 mol H₂O → 0,80 mol H atomu.",
  alt: "18 g'lık yatay çubuk: 2 g hidrojen payı renkli, 16 g oksijen payı gri.",
  draw: () => ({ els: split(18, 2, "H 2 g", "O 16 g", "b"), readout: ["m_H = m_H₂O · 2 ÷ 18; n_H = 2 · n_H₂O.", "0,40 mol H₂O → 0,80 mol H atomu (H₂ molü değil)."] }),
};

/* ---------- mol (TYT) ---------- */

const MM: { f: string; parts: { s: string; n: number; m: number; tone: Tone }[] }[] = [
  { f: "H₂O", parts: [{ s: "H", n: 2, m: 1, tone: "b" }, { s: "O", n: 1, m: 16, tone: "c" }] },
  { f: "CO₂", parts: [{ s: "C", n: 1, m: 12, tone: "a" }, { s: "O", n: 2, m: 16, tone: "c" }] },
  { f: "Ca(OH)₂", parts: [{ s: "Ca", n: 1, m: 40, tone: "warn" }, { s: "O", n: 2, m: 16, tone: "c" }, { s: "H", n: 2, m: 1, tone: "b" }] },
];
const molar: FigureDef = {
  caption:
    "İleri ile üç formülün molar kütlesini kur. Alt indis o atomun sayısını çarpar; parantezin dışındaki indis içindeki bütün atomlara uygulanır. Çubuk parçaları her elementin katkısıdır (H 1, C 12, O 16, Ca 40 g/mol). Dış katsayı (2CO₂) molar kütleyi değiştirmez.",
  alt: "Yatay yığılmış çubuk: seçili formülde her elementin kütle katkısı ayrı renkte; sonda toplam g/mol.",
  steps: ["H₂O", "CO₂", "Ca(OH)₂"],
  draw: (_v, step) => {
    const f = MM[step];
    const k = 0.085;
    const els: El[] = [];
    let x = 0;
    for (const p of f.parts) {
      const w = p.n * p.m * k;
      els.push(box(x, 0, x + w, 0.7, p.tone));
      els.push(txt(v(x + w / 2, 0), `${p.n > 1 ? p.n + "·" : ""}${p.m}`, "s", { tone: "ink", small: true, bold: true }));
      els.push(txt(v(x + w / 2, 0.7), p.s, "n", { tone: "ink", small: true, bold: true }));
      x += w;
    }
    const tot = f.parts.reduce((s, p) => s + p.n * p.m, 0);
    els.push(txt(v(x + 0.15, 0.35), `${tot} g/mol`, "e", { tone: "ink", bold: true }));
    els.push(...pad(-0.4, 1.6, 8.4, -1.0));
    const sum = f.parts.map((p) => (p.n > 1 ? `${p.n} × ${p.m}` : String(p.m))).join(" + ");
    return { els, readout: [`M(${f.f}) = ${sum} = ${tot} g/mol`, step === 2 ? "Parantez: 2 × (16 + 1) = 34; Ca 40 ile 74." : "M bir molün kütlesidir; örneğin kütlesi m ile karışmaz."] };
  },
};

const bridge: FigureDef = {
  caption:
    "Sürgüyle su kütlesini değiştir. Köprü: n = m ÷ M (M = 18 g/mol), N = n · Nₐ. Soru H atomu istiyorsa bir adım daha var: her molekülde 2 H. 36 g su → 2 mol → 2Nₐ molekül → 4 mol H atomu. Ters yönde 2 mol · 18 = 36 g kontrolü.",
  alt: "Soldan sağa dört kutu: kütle, mol, molekül sayısı, H atomu molü; aralarında ÷ 18, × Nₐ, × 2 oklu adımlar.",
  param: { label: "Su kütlesi m (g)", min: 9, max: 72, step: 9, init: 36, unit: "g" },
  draw: (m) => {
    const n = m / 18;
    const boxes = [`${m} g`, `${nf(n, 2)} mol`, `${nf(n, 2)} Nₐ`, `${nf(2 * n, 2)} mol H`];
    const ops = ["÷ 18", "× Nₐ", "× 2"];
    const tones: Tone[] = ["muted", "a", "b", "c"];
    const els: El[] = [];
    const W = 2.3;
    const G = 1.1;
    boxes.forEach((b, i) => {
      const x = i * (W + G);
      els.push(box(x, 0, x + W, 1.0, tones[i]), txt(v(x + W / 2, 0.5), b, "c", { tone: "ink", small: true, bold: true }));
      if (i < 3) {
        els.push(vec(v(x + W + 0.08, 0.5), v(x + W + G - 0.08, 0.5), { tone: "ink" }));
        els.push(txt(v(x + W + G / 2, 0.75), ops[i], "n", { tone: "warn", small: true, bold: true }));
      }
    });
    ["kütle", "mol", "molekül", "H atomu"].forEach((s, i) => els.push(txt(v(i * (W + G) + W / 2, 0), s, "s", { tone: "muted", small: true })));
    els.push(...pad(-0.3, 1.8, 4 * W + 3 * G + 0.3, -0.9));
    return { els, readout: [`n = ${m} ÷ 18 = ${nf(n, 2)} mol; molekül = ${nf(n, 2)}Nₐ; H atomu = ${nf(2 * n, 2)} mol.`, `Kontrol: ${nf(n, 2)} mol · 18 g/mol = ${m} g.`] };
  },
};

const gasVol: FigureDef = {
  caption:
    "Sürgüyle gaz molünü değiştir. Molar hacim sıcaklık ve basınca bağlıdır: ideal gaz yaklaşımıyla 0 °C ve 1 atm'de ≈ 22,4 L/mol, 25 °C ve 1 atm'de ≈ 24,5 L/mol. Aynı mol iki koşulda farklı hacim kaplar; bu yaklaşım yalnız gaz hâli içindir.",
  alt: "İki yatay çubuk: 0 °C ve 25 °C'de (1 atm) aynı mol gazın hacmi; 25 °C çubuğu biraz daha uzun.",
  param: { label: "Gaz miktarı n (mol)", min: 0.5, max: 3, step: 0.5, init: 1, unit: "mol" },
  draw: (n) => {
    const els = hbars(
      [
        { label: "0 °C, 1 atm", value: 22.4 * n, tone: "b", text: `${nf(22.4 * n, 2)} L` },
        { label: "25 °C, 1 atm", value: 24.5 * n, tone: "warn", text: `${nf(24.5 * n, 2)} L` },
      ],
      { w: 6, max: 73.5, gap: 1.0, h: 0.55 },
    );
    els.push(...pad(-3.6, 0.8, 8.4, -1.6));
    return { els, readout: [`V = n · V_m: ${nf(n, 1)} · 22,4 = ${nf(22.4 * n, 2)} L · ${nf(n, 1)} · 24,5 = ${nf(24.5 * n, 2)} L`, "Koşul verilmeden her gaza 22,4 L/mol uygulanmaz; katı ve sıvıya hiç uygulanmaz."] };
  },
};

/* ---------- kutle-korunumu-sabit-oran (TYT) ---------- */

const leftover: FigureDef = {
  caption:
    "14 g demir ile 12 g kükürtten 22 g FeS oluşursa 4 g kükürt artar. Başlangıç 26 g, son karışım 22 + 4 = 26 g: kütle korunur. Ürünün 22 g olması kütle kaybı değildir; artan madde son karışımda kalır.",
  alt: "İki düşey yığılmış çubuk: başlangıç (Fe 14 g + S 12 g) ve son (FeS 22 g + artan S 4 g); ikisinin boyu da 26 g.",
  draw: () => {
    const k = 0.13;
    const els: El[] = [
      ...vstack([{ value: 14, tone: "warn", label: "Fe 14 g" }, { value: 12, tone: "a", label: "S 12 g" }], 0, 0, k, 1.8),
      ...vstack([{ value: 22, tone: "c", label: "FeS 22 g" }, { value: 4, tone: "a", label: "S 4" }], 3.4, 0, k, 1.8),
    ];
    els.push(seg(v(-1.3, 26 * k), v(4.7, 26 * k), { tone: "muted", dash: true, thin: true }), txt(v(4.7, 26 * k), "26 g", "e", { tone: "ink", small: true, bold: true }));
    els.push(seg(v(-1.3, 0), v(4.7, 0), { tone: "ink", thin: true }));
    els.push(txt(v(0, 0), "başlangıç", "s", { tone: "ink", small: true, bold: true }), txt(v(3.4, 0), "son karışım", "s", { tone: "ink", small: true, bold: true }));
    els.push(...pad(-1.5, 26 * k + 0.5, 6.0, -0.9));
    return { els, readout: ["Başlangıç: 14 + 12 = 26 g · Son: 22 g FeS + 4 g S = 26 g.", "Tepkimeye giren kütle: 14 g Fe + 8 g S = 22 g FeS."] };
  },
};

const progressGraph: FigureDef = {
  caption:
    "Sürgüyle tepkime ilerlemesini değiştir (aynı Fe + S örneği). Girenlerin çizgileri tüketilen miktarla azalır, ürün çizgisi artar. Fe sıfıra inerken S 4 g'da kalır: S artmıştır. Her noktada kalan girenler + ürün = 26 g (kesikli). İlerleme ekseni gerçek zaman değildir.",
  alt: "Yatay eksen ilerleme (yüzde), dikey eksen kütle (g). Fe 14'ten 0'a, S 12'den 4'e iner, FeS 0'dan 22'ye çıkar; 26 g'da yatay kesikli toplam çizgisi; sürgüyle kayan düşey çizgi.",
  param: { label: "İlerleme (%)", min: 0, max: 100, step: 10, init: 50, unit: "%" },
  draw: (p) => {
    const X = (q: number) => q * 0.06;
    const Y = (m: number) => m * 0.15;
    const els: El[] = [...axes(v(0, 0), X(112), Y(30), "ilerleme", "kütle (g)")];
    const lines: [number, number, Tone, string][] = [
      [14, 0, "b", "Fe"],
      [12, 4, "a", "S"],
      [0, 22, "c", "FeS"],
    ];
    for (const [a, b, tone, name] of lines) {
      els.push(seg(v(0, Y(a)), v(X(100), Y(b)), { tone, bold: true }));
      els.push(txt(v(X(100), Y(b)), name, "e", { tone, small: true, bold: true }));
    }
    els.push(seg(v(0, Y(26)), v(X(100), Y(26)), { tone: "muted", dash: true }), txt(v(X(100), Y(26)), "toplam 26", "e", { tone: "muted", small: true }));
    els.push(seg(v(X(p), 0), v(X(p), Y(27)), { tone: "muted", thin: true }));
    for (const [a, b, tone] of lines) els.push(ball(v(X(p), Y(a + ((b - a) * p) / 100)), 0.09, tone));
    for (const q of [0, 50, 100]) els.push(...xtick(X(q), 0, `%${q}`));
    for (const m of [0, 10, 20]) els.push(...ytick(0, Y(m), String(m)));
    els.push(...pad(-0.9, Y(31), X(100) + 2.6, -0.7));
    const f = p / 100;
    const fe = 14 * (1 - f);
    const s = 12 - 8 * f;
    const fes = 22 * f;
    return { els, readout: [`Fe ${nf(fe, 1)} g + S ${nf(s, 1)} g + FeS ${nf(fes, 1)} g = ${nf(fe + s + fes, 1)} g`, p === 100 ? "Fe bitti, 4 g S arttı; ürün çizgisi 26'ya ulaşmaz." : "Kapalı sistemde toplam her noktada 26 g."] };
  },
};

const atomVsMass: FigureDef = {
  caption:
    "CO₂'de bir C atomuna iki O atomu düşer: atom oranı C/O = 1/2. Aynı formülün kütle oranı her atom sayısı kendi kütlesiyle çarpılınca C/O = 12/32 = 3/8 olur. İki oran farklı nicelikleri ölçer; kütle oranını alt indis diye yazma.",
  alt: "Solda bir C ve iki O topu (atom sayısı). Sağda iki yatay çubuk: C 12 g ve O 32 g.",
  draw: () => {
    const els: El[] = [];
    els.push(ball(v(0, 1.0), 0.32, "a"), txt(v(0, 1.0), "C", "c", { tone: "ink", small: true, bold: true }));
    for (const x of [-0.9, 0.9]) els.push(ball(v(x, 1.0), 0.36, "c"), txt(v(x, 1.0), "O", "c", { tone: "ink", small: true, bold: true }));
    els.push(txt(v(0, 0.3), "atom: 1 : 2", "s", { tone: "ink", small: true, bold: true }));
    els.push(...hbars([{ label: "C", value: 12, tone: "a", text: "12" }, { label: "O", value: 32, tone: "c", text: "32" }], { x0: 3.0, y0: 1.4, w: 4, max: 32, gap: 0.9 }));
    els.push(txt(v(4.6, 0.3), "kütle: 12 : 32 = 3 : 8", "s", { tone: "ink", small: true, bold: true }));
    els.push(...pad(-1.6, 2.2, 8.4, -0.6));
    return { els, readout: ["Atom oranı C/O = 1/2.", "Kütle oranı C/O = (1 · 12)/(2 · 16) = 12/32 = 3/8."] };
  },
};

const elemGraph: FigureDef = {
  caption:
    "İleri ile eksenleri değiştir. Saf suda 1 g H'ye 8 g O düşer: O dikey, H yatayken doğru orijinden geçer ve eğim 8'dir. Eksenler değişince eğim 1/8 olur; çelişki değildir. CO₂ için O dikey, C yatayken eğim 32/12 = 8/3; atom oranı 2 eğim değildir. Noktalar bölüm tablosundan.",
  alt: "Orijinden geçen doğru ve üzerinde dört veri noktası; adıma göre eksen adları ve eğim değişir.",
  steps: ["Su: O / H", "Su: H / O", "CO₂: O / C"],
  draw: (_v, step) => {
    const data: { xs: number[]; ys: number[]; xl: string; yl: string; xmax: number; ymax: number; slope: string }[] = [
      { xs: [1, 2, 3, 4], ys: [8, 16, 24, 32], xl: "H (g)", yl: "O (g)", xmax: 4, ymax: 32, slope: "8" },
      { xs: [8, 16, 24, 32], ys: [1, 2, 3, 4], xl: "O (g)", yl: "H (g)", xmax: 32, ymax: 4, slope: "1/8" },
      { xs: [3, 6, 9, 12], ys: [8, 16, 24, 32], xl: "C (g)", yl: "O (g)", xmax: 12, ymax: 32, slope: "8/3" },
    ];
    const d = data[step];
    const X = (x: number) => (x / d.xmax) * 5;
    const Y = (y: number) => (y / d.ymax) * 3.2;
    const els: El[] = [...axes(v(0, 0), 6.0, 3.8, d.xl, d.yl)];
    els.push(seg(v(0, 0), v(X(d.xmax * 1.05), Y(d.ymax * 1.05)), { tone: "c", bold: true }));
    d.xs.forEach((x, i) => els.push(circle(v(X(x), Y(d.ys[i])), 0.08, { tone: "warn", fill: "warn" })));
    for (const x of d.xs) els.push(...xtick(X(x), 0, String(x)));
    for (const y of d.ys) els.push(...ytick(0, Y(y), String(y)));
    els.push(txt(v(X(d.xmax * 0.5), Y(d.ymax * 0.5)), `eğim ${d.slope}`, "se", { tone: "c", small: true, bold: true }));
    els.push(...pad(-1.0, 4.4, 7.0, -0.8));
    const rows: [string, string][] = [
      ["Eğim = Δm(O)/Δm(H) = 8/1 = 8 (9 g suda 1 g H, 8 g O).", "Her nokta saf bileşiğin içindeki element kütleleridir."],
      ["Eksenler yer değiştirdi: eğim = 1/8. Oran yönü değişti, veri aynı.", "Artan hidrojen bu doğruya konmaz."],
      ["CO₂: eğim = 32/12 = 8/3 (atom oranı 2 değil).", "Orijinden geçme: sıfır örnekte sıfır element kütlesi."],
    ];
    return { els, readout: rows[step] };
  },
};

export const chemistryFigures060Formula: Record<string, Record<string, FigureDef>> = {
  "basit-ve-molekul-formul": {
    "Üç sütunlu çözüm tablosu kur": columns,
    "Kesirli oranı tüm sütunlarda aynı katla gider": fraction,
    "Yüzde bileşimde 100 gram seçmek bir kolaylıktır": percent,
    "Molekül formülüne geçişin ortak katı": multiple,
    "Yanma analizi önce karbonu izler": carbon,
    "Suda iki hidrojen var": hydrogen,
  },
  mol: {
    "Molar kütleyi formülden oluştur": molar,
    "Kütle, mol ve tanecik arasında birim köprüsü kur": bridge,
    "Gaz hacminde önce sıcaklık ve basıncı oku": gasVol,
  },
  "kutle-korunumu-sabit-oran": {
    "Ürün toplamı ile son karışım farklıdır": leftover,
    "Grafikte korunumu takip et": progressGraph,
    "Atom oranı, kütle oranı değildir": atomVsMass,
    "Element kütlesi grafiğinde eksenleri oku": elemGraph,
  },
};
