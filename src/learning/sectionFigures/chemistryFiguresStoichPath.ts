import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Denklemli miktar geçişi. Merkez mol: verilen → mol → katsayı
 * oranı → aranan mol → hedef birim. NK: 0 °C, 1 atm, ideal gaz 22,4 L/mol;
 * Nₐ ≈ 6,02 × 10²³ mol⁻¹. ÖSYM bağı: 2025 TYT Fen 12 (yapılmış sınav, resmî
 * cevap A); çözüm özgündür. Diğer sayısal örnekler özgündür.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });
const f = (x: number, d = 2) => x.toFixed(d).replace(".", ",");

/** Dikey kutu zinciri: her kutu iki satır; oklar arasında işlem. */
function chain(boxes: [string, string][], ops: string[], hi = -1, w = 2.6, step = 1.6): El[] {
  const els: El[] = [];
  boxes.forEach(([top, bottom], i) => {
    const y = -i * step, sel = i === hi;
    els.push(rect(0, w, y - 0.55, y + 0.55, sel ? "a" : "b", sel), txt(v(w / 2, y + 0.22), top, "c", { small: true, bold: true }), txt(v(w / 2, y - 0.3), bottom, "c", { small: true }));
    if (i < ops.length) els.push(vec(v(w / 2, y - 0.6), v(w / 2, y - step + 0.6), { tone: "warn" }), txt(v(w / 2 + 0.2, y - step / 2), ops[i], "e", { small: true, tone: "muted" }));
  });
  return els;
}

// 1 · Geçişin merkezi moldür.
const ROUTES = [
  { label: "Kütle", eq: "2H₂ + O₂ → 2H₂O", boxes: [["4 g H₂", "verilen"], ["2 mol H₂", "mol"], ["2 mol H₂O", "aranan mol"], ["36 g H₂O", "hedef"]] as [string, string][], ops: ["÷ 2 g/mol", "× 2/2", "× 18 g/mol"], note: "4 ÷ 2 = 2 mol H₂ → 2 mol H₂O → 36 g; O₂ 1 mol = 32 g (4 + 32 = 36)." },
  { label: "Hacim", eq: "CH₄ + 2O₂ → CO₂ + 2H₂O", boxes: [["11,2 L CH₄", "NK"], ["0,5 mol CH₄", "mol"], ["0,5 mol CO₂", "aranan mol"], ["11,2 L CO₂", "NK"]] as [string, string][], ops: ["÷ 22,4", "× 1/1", "× 22,4"], note: "Aynı koşuldaki gazlarda hacim oranı = mol oranı; sıvı su bu yolla litreye çevrilmez." },
  { label: "Adet", eq: "N₂ + 3H₂ → 2NH₃", boxes: [["0,9 mol H₂", "harcanan"], ["0,9 mol H₂", "mol"], ["0,6 mol NH₃", "aranan mol"], ["3,61 × 10²³", "molekül"]] as [string, string][], ops: ["—", "× 2/3", "× Nₐ"], note: "0,9 × 2/3 = 0,6 mol; 0,6 × 6,02 × 10²³ ≈ 3,61 × 10²³ molekül." },
];
const hub: FigureDef = {
  caption:
    "Geçişin merkezi moldür: verileni mole çevir, katsayı oranıyla aranan türün molüne geç, sonra hedef birime dön. Bir veri türüne tıkla: dört kutulu yol ve her oktaki işlem açılır. Katsayı oranı gram oranı değildir; yalnız mol basamağında kullanılır.",
  alt: "Yukarıdan aşağı dört kutulu zincir: verilen, mol, aranan mol, hedef birim; oklar yanında bölme ve çarpma işlemleri.",
  picks: ROUTES.map((r) => ({ label: r.label, title: `${r.label}: ${r.eq}`, detail: [r.note] })),
  draw: (_v, _s, pick = -1) => {
    const r = ROUTES[pick >= 0 ? pick : 0];
    const els: El[] = [txt(v(4.2, 0.2), r.eq, "e", { small: true, bold: true, tone: "a" }), ...chain(r.boxes, r.ops)];
    ROUTES.forEach((rr, i) => els.push(txt(v(4.2, -0.8 - i * 0.6), rr.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.3, 0.7), " ", "c"), txt(v(8.4, -5.4), " ", "c"));
    return { els, readout: [r.note, "Kütle → m/M, NK gaz hacmi → V/22,4, adet → N/Nₐ; dönüşte tersini uygula."] };
  },
};

// 2 · Katsayı oranı tüketilen miktar içindir.
const ratio: FigureDef = {
  caption:
    "N₂ + 3H₂ → 2NH₃. Harcanan H₂ molünü kaydır: harcanan N₂ = H₂ × 1/3, oluşan NH₃ = H₂ × 2/3. Oran, başlangıç miktarına değil harcanan miktara uygulanır; tepkime tamamlanmıyorsa başlangıcın tamamını harcanan sayma.",
  alt: "Üç yatay çubuk: harcanan N₂, harcanan H₂ ve oluşan NH₃ mol miktarları 1 : 3 : 2 oranında.",
  param: { label: "Harcanan H₂", min: 0, max: 1.2, step: 0.15, init: 0.9, unit: " mol" },
  draw: (h) => {
    const k = 4, rows: [string, number, Tone][] = [["N₂ (harcanan)", h / 3, "c"], ["H₂ (harcanan)", h, "b"], ["NH₃ (oluşan)", (2 * h) / 3, "a"]];
    const els: El[] = [];
    rows.forEach(([l, n, tone], i) => {
      const y = -i * 0.8;
      els.push(txt(v(-0.2, y), l, "w", { small: true, bold: true }), rect(0, Math.max(n * k, 0.001), y - 0.22, y + 0.22, tone), txt(v(n * k + 0.15, y), `${f(n)} mol`, "e", { small: true }));
    });
    els.push(txt(v(-2.6, 0.6), " ", "c"), txt(v(6.4, -2.0), " ", "c"));
    return { els, readout: [`N₂ ${f(h / 3)} : H₂ ${f(h)} : NH₃ ${f((2 * h) / 3)} = 1 : 3 : 2.`, `NH₃ kütlesi ${f(((2 * h) / 3) * 17, 1)} g (17 g/mol); 6 g H₂ = 3 mol → 2 mol NH₃ = 34 g.`] };
  },
};

// 3 · 2025 TYT Fen 12: toplam ürün gazı.
const fen12: FigureDef = {
  caption:
    "2025 TYT Fen 12 (resmî kitapçık, cevap A): 72 g su (4 mol) 2H₂O → 2H₂ + O₂ ile kısmen ayrışıyor; NK’de toplam 67,2 L (3 mol) gaz ölçülüyor. Ayrışan suyu kaydır: toplam gaz = ayrışan × 3/2 (2 H₂ + 1 O₂). 2 mol ayrışınca 3 mol gaz: tam dönüşümün 6 molüne göre %50. 67,2 L’nin tamamı H₂ değildir.",
  alt: "Yığılmış çubuk: H₂ ve O₂ molleri; yanında kalan su; kesikli 3 mol hedef çizgisi.",
  param: { label: "Ayrışan H₂O", min: 0, max: 4, step: 0.5, init: 2, unit: " mol" },
  draw: (x) => {
    const k = 1.2, h2 = x, o2 = x / 2, gas = h2 + o2;
    const els: El[] = [
      txt(v(-0.2, 0.5), "gaz", "w", { small: true, bold: true }), rect(0, h2 * k, 0.3, 0.7, "b"), rect(h2 * k, gas * k, 0.3, 0.7, "c"),
      txt(v(gas * k + 0.15, 0.5), `H₂ ${f(h2, 1)} + O₂ ${f(o2, 1)} = ${f(gas, 1)} mol`, "e", { small: true }),
      txt(v(-0.2, -0.3), "kalan su", "w", { small: true, bold: true }), rect(0, Math.max((4 - x) * k, 0.001), -0.5, -0.1, "muted"), txt(v((4 - x) * k + 0.15, -0.3), `${f(4 - x, 1)} mol = ${f((4 - x) * 18, 0)} g`, "e", { small: true }),
      seg(v(3 * k, 0.9), v(3 * k, 0.1), { dash: true, thin: true, tone: "warn" }), txt(v(3 * k, 1.1), "ölçülen 3 mol", "c", { small: true, tone: "warn" }),
    ];
    els.push(txt(v(-2.0, 1.4), " ", "c"), txt(v(10.0, -0.8), " ", "c"));
    return { els, readout: [`Toplam gaz = ${f(x, 1)} × 3/2 = ${f(gas, 1)} mol (${f(gas * 22.4, 1)} L NK).`, Math.abs(gas - 3) < 1e-9 ? "Ölçülenle eşleşti: 2 mol su ayrıştı, verim 3/6 = %50 (A)." : "Ölçülen 3 mol için ayrışan su 3 × 2/3 = 2 mol."] };
  },
};

// 4 · Gaz hacminde iki ayrı kısa yol.
const STATES = [
  { label: "Su buharı", rows: [["O₂ (gereken)", 8], ["CO₂", 4], ["H₂O(g)", 8]] as [string, number][], total: 12, note: "Su gaz kalırsa ürün gazı 4 + 8 = 12 L (aynı T, P)." },
  { label: "Su yoğuşmuş", rows: [["O₂ (gereken)", 8], ["CO₂", 4], ["H₂O(s)", 0]] as [string, number][], total: 4, note: "Su yoğuşursa yalnız kuru CO₂: 4 L. Sıvı suyun hacmi 8 L değildir; kütle ve yoğunlukla bulunur." },
];
const gasVolume: FigureDef = {
  caption:
    "4 L CH₄ yeterli O₂ ile yanıyor: CH₄ + 2O₂ → CO₂ + 2H₂O; tüm gazlar aynı sıcaklık ve basınçta ölçülüyor. Suyun hâline tıkla: katsayı oranı yalnız gaz türlerinin hacmine uygulanır. Farklı T ve P’de ölçülen gazlarda bu kısayol kullanılmaz.",
  alt: "Üç çubuk: gereken O₂ 8 L, CO₂ 4 L, su buharı 8 L ya da sıvı su için çubuk yok.",
  picks: STATES.map((s) => ({ label: s.label, title: `${s.label}: ürün gazı ${s.total} L`, detail: [s.note] })),
  draw: (_v, _s, pick = -1) => {
    const st = STATES[pick >= 0 ? pick : 0], k = 0.55, els: El[] = [];
    st.rows.forEach(([l, n], i) => {
      const y = -i * 0.8;
      els.push(txt(v(-0.2, y), l, "w", { small: true, bold: true }), rect(0, Math.max(n * k, 0.001), y - 0.22, y + 0.22, n ? "b" : "muted"), txt(v(n * k + 0.15, y), n ? `${n} L` : "sıvı: gaz hacmine girmez", "e", { small: true }));
    });
    STATES.forEach((s, i) => els.push(txt(v(i * 2.8, -2.4), s.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-2.6, 0.6), " ", "c"), txt(v(7.4, -2.7), " ", "c"));
    return { els, readout: [st.note, "NK’de hacimden mole: V ÷ 22,4; aynı T, P’de doğrudan hacim oranı."] };
  },
};

// 5 · Üründen girene geriye yürü.
const BACK = [
  { title: "1 · Üründen mole", text: "6,72 L H₂ ÷ 22,4 = 0,30 mol H₂ (NK).", hi: 0 },
  { title: "2 · Katsayı oranı", text: "Al : H₂ = 2 : 3 → 0,30 × 2/3 = 0,20 mol Al; HCl : H₂ = 6 : 3 → 0,60 mol HCl.", hi: 1 },
  { title: "3 · Hedef birim", text: "0,20 mol × 27 g/mol = 5,4 g Al.", hi: 2 },
];
const backward: FigureDef = {
  caption:
    "2Al + 6HCl → 2AlCl₃ + 3H₂; NK’de 6,72 L H₂ elde ediliyor (yeterli HCl, tam tepkime). Adımı ilerlet: ölçülen üründen mole, katsayı oranıyla girenin molüne, oradan kütleye geriye yürünür. Kontrol: 2 Al 6e⁻ verir, 3 H₂ oluşumu 6 H⁺ tüketir.",
  alt: "Yukarıdan aşağı zincir: 6,72 L H₂, 0,30 mol H₂, 0,20 mol Al, 5,4 g Al; seçili adım vurgulu.",
  param: { label: "Adım", min: 0, max: 2, step: 1, init: 2, unit: "" },
  draw: (s) => {
    const st = BACK[Math.round(s)];
    const boxes: [string, string][] = [["6,72 L H₂", "ölçülen"], ["0,30 mol H₂", "mol"], ["0,20 mol Al", "giren mol"], ["5,4 g Al", "hedef"]];
    const els: El[] = [txt(v(4.2, 0.2), "2Al + 6HCl → 2AlCl₃ + 3H₂", "e", { small: true, bold: true, tone: "a" }), ...chain(boxes, ["÷ 22,4", "× 2/3", "× 27"], st.hi + 1)];
    els.push(ball(v(4.2, -0.8), 0.08, "a"), txt(v(4.4, -0.8), st.title, "e", { small: true, bold: true }));
    els.push(txt(v(-0.3, 0.7), " ", "c"), txt(v(8.6, -5.4), " ", "c"));
    return { els, readout: [st.text, "Hatalı kısayol: 6,72 L’yi doğrudan 27 ile çarpmak; önce mole dön."] };
  },
};

export const chemistryFiguresStoichPath: Record<string, Record<string, FigureDef>> = {
  "denklemli-miktar-gecisi": {
    "Geçişin merkezi moldür": hub,
    "Katsayı oranı tüketilen miktar içindir": ratio,
    "Toplam ürün ve ardışık tepkimeler": fen12,
    "Gaz hacminde iki ayrı kısa yol": gasVolume,
    "Üründen girene geriye yürü": backward,
  },
};
