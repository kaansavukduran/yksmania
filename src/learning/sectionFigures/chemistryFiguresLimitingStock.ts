import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Sınırlayıcı bileşen: ξ = en küçük (n ÷ katsayı), ideal tam
 * ilerleme. ÖSYM bağı: 2017 LYS2 Kimya 6 (yapılmış sınav, resmî cevap A);
 * çözüm özgündür. Diğer sayısal örnekler özgündür. Gaz hacimleri aynı
 * sıcaklık ve basınçtadır.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });
const f = (x: number, d = 2) => x.toFixed(d).replace(".", ",");

// 1 · Küçük mol tek başına sınırlayıcı değildir.
const CASES = [
  { label: "N₂ + 3H₂", eq: "N₂ + 3H₂ → 2NH₃", r: [["N₂", 1, 1], ["H₂", 2, 3]] as [string, number, number][], note: "N₂ daha az mol ama 1/1 = 1 > 2/3: H₂ sınırlayıcı; NH₃ = 2 × 2/3 = 4/3 mol, N₂ artığı 1/3 mol." },
  { label: "8 g H₂ + 16 g O₂", eq: "2H₂ + O₂ → 2H₂O", r: [["H₂", 4, 2], ["O₂", 0.5, 1]] as [string, number, number][], note: "Gramı mole çevir: H₂ 4, O₂ 0,5 mol; 4/2 = 2 > 0,5/1: O₂ sınırlayıcı; su 1 mol = 18 g, H₂ artığı 6 g." },
  { label: "12 g Mg + 8 g O₂", eq: "2Mg + O₂ → 2MgO", r: [["Mg", 0.5, 2], ["O₂", 0.25, 1]] as [string, number, number][], note: "0,5/2 = 0,25 = 0,25/1: ikisi birlikte tükenir; 0,5 mol MgO = 20 g." },
  { label: "2017 LYS2 Kimya 6", eq: "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O", r: [["C₃H₈", 0.05, 1], ["O₂", 0.7, 5]] as [string, number, number][], note: "2,2 g propan = 0,05 mol; 22,4 g O₂ = 0,70 mol (22,4 burada gram!). 0,05 < 0,14: propan biter; O₂ artığı 0,45 mol = 14,4 g (A)." },
];
const ratioBars: FigureDef = {
  caption:
    "Küçük mol tek başına sınırlayıcı değildir: her girenin molünü katsayısına böl (n ÷ katsayı), en küçük oran tükenir. Bir örneğe tıkla: çubuklar n ÷ katsayı oranlarını gösterir; turuncu çubuk sınırlayıcıdır. 2017 LYS2 Kimya 6 (resmî kitapçık, cevap A): 22,4 değeri gramdır, NK hacmi sanmak birim hatasıdır.",
  alt: "İki yatay çubuk: girenlerin n ÷ katsayı oranları; en kısa olan vurgulu.",
  picks: CASES.map((c) => ({ label: c.label, title: `${c.label}: ${c.eq}`, detail: [c.note] })),
  draw: (_v, _s, pick = -1) => {
    const c = CASES[pick >= 0 ? pick : 0], ratios = c.r.map(([, n, nu]) => n / nu), mn = Math.min(...ratios), mx = Math.max(...ratios), k = 4 / mx;
    const els: El[] = [txt(v(0, 1.3), c.eq, "e", { small: true, bold: true, tone: "a" })];
    c.r.forEach(([s, n, nu], i) => {
      const y = 0.5 - i * 0.8, q = n / nu, lim = Math.abs(q - mn) < 1e-9;
      els.push(txt(v(-0.2, y), s, "w", { small: true, bold: true }), rect(0, q * k, y - 0.22, y + 0.22, lim ? "warn" : "b"), txt(v(q * k + 0.15, y), `${f(n)} ÷ ${nu} = ${f(q, 3)}${lim ? " (biter)" : ""}`, "e", { small: true }));
    });
    CASES.forEach((cc, i) => els.push(txt(v((i % 2) * 3.4, -1.3 - Math.floor(i / 2) * 0.5), cc.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-1.4, 1.7), " ", "c"), txt(v(7.2, -2.0), " ", "c"));
    return { els, readout: [c.note, "ξ = en küçük oran; ürün = ürün katsayısı × ξ."] };
  },
};

// 2 · Başlangıç, değişim, son: iki tur.
const ROUNDS = [
  { title: "1 · Başlangıç", h: 3, o: 2, w: 0, note: "3 mol H₂, 2 mol O₂ (2H₂ + O₂ → 2H₂O)." },
  { title: "2 · Birinci tur sonu", h: 0, o: 0.5, w: 3, note: "ξ = en küçük(3/2, 2/1) = 1,5: H₂ biter, O₂ 1,5 harcanır, 0,5 kalır; 3 mol su." },
  { title: "3 · +2 mol H₂ eklendi", h: 2, o: 0.5, w: 3, note: "Yeni stok: H₂ 2, O₂ 0,5. İlk turun 2 mol O₂’si yeniden sayılmaz." },
  { title: "4 · İkinci tur sonu", h: 1, o: 0, w: 4, note: "ξ₂ = en küçük(2/2, 0,5/1) = 0,5: 1 mol H₂ harcanır, 1 mol su daha; son: H₂ 1, O₂ 0, su 4 mol." },
];
const stock: FigureDef = {
  caption:
    "Başlangıç, değişim ve son satırı: ikinci eklemede önceki turun artanları yeni stoktur. Adımı ilerlet: H₂, O₂ ve su stok çubukları güncellenir. Kütle korunur: 6 g H₂ + 64 g O₂ + 4 g ek H₂ = 74 g = 72 g su + 2 g H₂.",
  alt: "Üç yatay stok çubuğu: H₂, O₂ ve su; adım başlığı.",
  param: { label: "Adım", min: 0, max: 3, step: 1, init: 3, unit: "" },
  draw: (s) => {
    const st = ROUNDS[Math.round(s)], k = 1.0, rows: [string, number, Tone][] = [["H₂", st.h, "b"], ["O₂", st.o, "c"], ["H₂O", st.w, "a"]];
    const els: El[] = [txt(v(0, 0.9), st.title, "e", { small: true, bold: true })];
    rows.forEach(([l, n, tone], i) => {
      const y = 0.2 - i * 0.7;
      els.push(txt(v(-0.2, y), l, "w", { small: true, bold: true }), rect(0, Math.max(n * k, 0.001), y - 0.2, y + 0.2, tone), txt(v(n * k + 0.15, y), `${f(n, 1)} mol`, "e", { small: true }));
    });
    els.push(txt(v(-1.0, 1.3), " ", "c"), txt(v(5.6, -1.6), " ", "c"));
    return { els, readout: [st.note, "Tam tepkimede girenlerden en az biri sıfırdır; hiçbiri eksi olamaz."] };
  },
};

// 3 · Artan gazın son hacme katkısı.
const gasLeft: FigureDef = {
  caption:
    "2CO + O₂ → 2CO₂; 8 L CO sabit, aynı sıcaklık ve basınçta O₂ hacmini kaydır. O₂ 4 L’ye kadar sınırlayıcıdır (CO artar); 4 L’de tam oran; sonra CO biter ve O₂ artar. Son gaz = oluşan CO₂ + artan gaz. 6 L O₂ ile: 8 L CO₂ + 2 L O₂ = 10 L.",
  alt: "Yığılmış çubuk: oluşan CO₂, artan CO ve artan O₂ hacimleri.",
  param: { label: "O₂", min: 0, max: 8, step: 1, init: 6, unit: " L" },
  draw: (o) => {
    const xi = Math.min(8 / 2, o), co2 = 2 * xi, coL = 8 - 2 * xi, oL = o - xi, k = 0.45;
    const els: El[] = [rect(0, Math.max(co2 * k, 0.001), -0.25, 0.25, "a"), rect(co2 * k, (co2 + coL) * k, -0.25, 0.25, "b"), rect((co2 + coL) * k, (co2 + coL + oL) * k, -0.25, 0.25, "c")];
    els.push(txt(v(0, 0.6), `CO₂ ${f(co2, 0)} L · CO artan ${f(coL, 0)} L · O₂ artan ${f(oL, 0)} L`, "e", { small: true }));
    els.push(ball(v(0.1, -0.7), 0.08, "a"), txt(v(0.3, -0.7), "CO₂", "e", { small: true }), ball(v(1.5, -0.7), 0.08, "b"), txt(v(1.7, -0.7), "artan CO", "e", { small: true }), ball(v(3.5, -0.7), 0.08, "c"), txt(v(3.7, -0.7), "artan O₂", "e", { small: true }));
    els.push(txt(v(-0.3, 1.0), " ", "c"), txt(v(6.6, -1.0), " ", "c"));
    return { els, readout: [`Son gaz = ${f(co2 + coL + oL, 0)} L (${o < 4 ? "O₂ sınırlayıcı" : o > 4 ? "CO sınırlayıcı" : "tam oran"}).`, "Artan gaz son hacme katılır ama oluşan ürün değildir."] };
  },
};

// 4 · Başlangıç ürünü oluşan ürün değildir.
const STARTS = [
  { label: "Başta su yok", w0: 0 },
  { label: "Başta 1 mol su", w0: 1 },
];
const plateau: FigureDef = {
  caption:
    "2 mol O₂ sabit, H₂ miktarı x mol değişiyor; tam tepkimede yeni oluşan su = en küçük(x, 4). Bir başlangıç durumuna tıkla: başta 1 mol su varsa toplam su grafiği 1 birim yukarı kayar, yeni oluşan su değişmez. 4 mol platosu O₂ stokunu (2 mol) tersine verir.",
  alt: "Yatay eksende H₂ (mol), düşey eksende su (mol): 4’e kadar yükselen sonra yatay kalan çizgi; seçime göre 1 birim yukarı kaymış toplam çizgisi.",
  picks: STARTS.map((s) => ({ label: s.label, title: s.label, detail: [s.w0 ? "Toplam su = 1 + en küçük(x, 4); yeni oluşan su = en küçük(x, 4)." : "Toplam su = yeni oluşan su = en küçük(x, 4)."] })),
  draw: (_v, _s, pick = -1) => {
    const w0 = STARTS[pick >= 0 ? pick : 1].w0, sx = 0.75, sy = 0.6;
    const els: El[] = [vec(v(0, 0), v(6.4 * sx, 0), { thin: true }), vec(v(0, 0), v(0, 5.8 * sy), { thin: true }), txt(v(6.4 * sx, -0.75), "H₂ (mol)", "c", { small: true }), txt(v(0.15, 5.8 * sy), "su (mol)", "e", { small: true })];
    [0, 2, 4, 6].forEach((t) => els.push(txt(v(t * sx, -0.35), String(t), "c", { small: true, tone: "muted" })));
    els.push(seg(v(0, 0), v(4 * sx, 4 * sy), { tone: "muted", dash: true }), seg(v(4 * sx, 4 * sy), v(6 * sx, 4 * sy), { tone: "muted", dash: true }));
    els.push(seg(v(0, w0 * sy), v(4 * sx, (4 + w0) * sy), { tone: "b", bold: true }), seg(v(4 * sx, (4 + w0) * sy), v(6 * sx, (4 + w0) * sy), { tone: "b", bold: true }));
    els.push(txt(v(6 * sx + 0.1, (4 + w0) * sy), w0 ? "toplam" : "toplam = yeni", "e", { small: true, tone: "b" }));
    if (w0) els.push(txt(v(6 * sx + 0.1, 4 * sy - 0.1), "yeni", "e", { small: true, tone: "muted" }));
    STARTS.forEach((s, i) => els.push(txt(v(i * 2.6, -1.3), s.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.5, 3.8), " ", "c"), txt(v(6.6, -1.6), " ", "c"));
    return { els, readout: [w0 ? "Başlangıç suyu son miktara eklenir: 1 + 4 = 5 mol (x ≥ 4)." : "x ≥ 4’te O₂ biter; H₂ artığı x − 4.", "Verim verildiğinde kalan reaktif ancak “yan tepkime ve toplama kaybı yok” koşuluyla hesaplanır."] };
  },
};

export const chemistryFiguresLimitingStock: Record<string, Record<string, FigureDef>> = {
  "sinirlayici-bilesen": {
    "Küçük mol tek başına sınırlayıcı değildir": ratioBars,
    "Başlangıç, değişim ve son satırı": stock,
    "Artan gazın son hacme katkısı": gasLeft,
    "Başlangıç ürünü oluşan ürün değildir": plateau,
  },
};
