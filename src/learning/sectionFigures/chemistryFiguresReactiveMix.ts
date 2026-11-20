import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Tepkimeli karışımlar. M: Mg 24, Zn 65, Al 27 g/mol; NK 22,4 L/mol.
 * Mg ve Zn yeterli HCl ile 1 : 1 H₂, Al 1 : 1,5 H₂ verir. ÖSYM bağı: 2025 TYT
 * Fen 14 (yapılmış sınav, resmî cevap C: Cu–Sn); çözüm özgündür. Diğer
 * karışım örnekleri özgündür, sınavın seçenek listesi değildir.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });
const f = (x: number, d = 2) => x.toFixed(d).replace(".", ",");

// 1 · Seçici tepkimeyi verilen koşul belirler.
const PAIRS = [
  { label: "Cu–Sn", hcl: [false, true], naoh: [false, true], note: "2025 TYT Fen 14 (resmî cevap C): Sn amfoter, HCl ve derişik NaOH ile H₂ verir; Cu bu koşullarda vermez. İki deneydeki gaz Sn’den gelir." },
  { label: "Mg–Cu", hcl: [true, false], naoh: [false, false], note: "Özgün örnek: yalnız Mg HCl ile H₂ verir; NaOH ile gaz yok. 10 g karışım, 0,25 mol H₂ → Mg 6 g, Cu 4 g." },
  { label: "Ag–Hg", hcl: [false, false], naoh: [false, false], note: "Bu okul modelinde ikisi de HCl ya da NaOH ile H₂ vermez; aranan amfoter davranış yok." },
];
const selective: FigureDef = {
  caption:
    "Seçici tepkimeyi verilen koşul belirler: karışımda gazı hangi bileşenin verdiğini her metal ve her ortam için ayrı oku. Bir alaşıma tıkla: HCl ve NaOH sütunlarında her metalin H₂ verip vermediği işaretlenir. Her iki metalin de gaz vermesi gerekmez; bir etkin bileşen iki deneyi açıklayabilir.",
  alt: "Tablo: seçili alaşımın iki metali satırlarda, HCl ve NaOH sütunlarında H₂ var/yok işaretleri.",
  picks: PAIRS.map((p) => ({ label: p.label, title: p.label, detail: [p.note] })),
  draw: (_v, _s, pick = -1) => {
    const p = PAIRS[pick >= 0 ? pick : 0], metals = p.label.split("–");
    const els: El[] = [txt(v(2.2, 0.8), "HCl", "c", { small: true, bold: true }), txt(v(3.8, 0.8), "NaOH", "c", { small: true, bold: true })];
    metals.forEach((m, i) => {
      const y = 0.2 - i * 0.6;
      els.push(txt(v(0.6, y), m, "c", { small: true, bold: true }));
      [p.hcl[i], p.naoh[i]].forEach((ok, j) => els.push(txt(v(2.2 + j * 1.6, y), ok ? "H₂ ✓" : "–", "c", { small: true, bold: ok, tone: ok ? "b" : "muted" })));
    });
    PAIRS.forEach((pp, i) => els.push(txt(v(i * 1.8, -1.4), pp.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.3, 1.2), " ", "c"), txt(v(5.4, -1.7), " ", "c"));
    return { els, readout: [p.note, "Aktiflik koşulunu her aside genelleme; reaktif değişince seçicilik yeniden belirlenir."] };
  },
};

// 2 · İki bilinmeyene iki bağımsız bilgi.
const SYS = [
  { label: "Mg–Zn", gas: [1, 1], gasT: 0.2, mass: [24, 65], massT: 8.9, sol: [0.1, 0.1], ylab: "Zn (mol)", note: "x + y = 0,2 (gaz) ve 24x + 65y = 8,9 (kütle) → x = y = 0,1: Mg 2,4 g, Zn 6,5 g." },
  { label: "Mg–Al", gas: [1, 1.5], gasT: 0.25, mass: [24, 27], massT: 5.1, sol: [0.1, 0.1], ylab: "Al (mol)", note: "Al 1,5 mol H₂ verir: x + 1,5y = 0,25 ve 24x + 27y = 5,1 → x = y = 0,1: Mg 2,4 g, Al 2,7 g." },
];
const twoLines: FigureDef = {
  caption:
    "Ortak ürün katkıların toplamıdır; iki bilinmeyen için iki bağımsız bilgi gerekir. Bir karışıma tıkla: x (Mg molü) – y düzleminde gaz doğrusu ve kütle doğrusu çizilir; kesişim tek bileşimi verir. Yalnız “0,2 mol karışım 0,2 mol H₂ verdi” bilgisi (Mg–Zn) iki kez aynı doğrudur, bileşim bulunmaz.",
  alt: "Koordinat düzleminde iki doğru: gaz koşulu ve kütle koşulu; kesişim noktası işaretli.",
  picks: SYS.map((s) => ({ label: s.label, title: s.label, detail: [s.note] })),
  draw: (_v, _s, pick = -1) => {
    const s = SYS[pick >= 0 ? pick : 0], sc = 18;
    const line = (a: number, b: number, c: number): [number, number, number, number] => [0, c / b, c / a, 0];
    const g = line(s.gas[0], s.gas[1], s.gasT), m = line(s.mass[0], s.mass[1], s.massT);
    const els: El[] = [vec(v(0, 0), v(0.4 * sc, 0), { thin: true }), vec(v(0, 0), v(0, 0.3 * sc), { thin: true }), txt(v(0.4 * sc, -0.35), "Mg (mol)", "c", { small: true }), txt(v(0.15, 0.3 * sc), s.ylab, "e", { small: true })];
    els.push(seg(v(g[0] * sc, g[1] * sc), v(g[2] * sc, g[3] * sc), { tone: "b", bold: true }), seg(v(m[0] * sc, m[1] * sc), v(m[2] * sc, m[3] * sc), { tone: "warn", bold: true }));
    els.push(ball(v(s.sol[0] * sc, s.sol[1] * sc), 0.1, "a"), txt(v(s.sol[0] * sc + 0.2, s.sol[1] * sc + 0.25), "(0,1 ; 0,1)", "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(g[2] * sc, -0.35), "gaz", "c", { small: true, tone: "b" }), txt(v(0.15, m[1] * sc + 0.25), "kütle", "e", { small: true, tone: "warn" }));
    SYS.forEach((ss, i) => els.push(txt(v(i * 2.4, -1.1), ss.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.6, 5.8), " ", "c"), txt(v(8.0, -1.4), " ", "c"));
    return { els, readout: [s.note, "Çözümü iki eşitliğe geri koy; negatif miktar fiziksel karışım olamaz."] };
  },
};

// 3 · Olabilirlik aralığını önce bul.
const range: FigureDef = {
  caption:
    "8,9 g Mg–Zn karışımı, yeterli HCl. Zn kütlesini kaydır: H₂ = Zn/65 + Mg/24. Tamamı Zn ise ≈ 0,137 mol, tamamı Mg ise ≈ 0,371 mol; ölçülen her değer bu aralıkta olmalı. Ölçülen 0,20 mol (kesikli) 6,5 g Zn’de sağlanır. 0,5 mol verisi bu modelle uyumsuz olurdu.",
  alt: "Yatay eksende Zn kütlesi 0–8,9 g, düşey eksende H₂ molü: azalan doğru, kesikli 0,20 çizgisi ve seçili nokta.",
  param: { label: "Zn kütlesi", min: 0, max: 8.9, step: 0.5, init: 6.5, unit: " g" },
  draw: (z) => {
    const H = (zz: number) => zz / 65 + (8.9 - zz) / 24, sx = 0.6, sy = 12;
    const els: El[] = [vec(v(0, 0), v(9.6 * sx, 0), { thin: true }), vec(v(0, 0), v(0, 0.42 * sy), { thin: true }), txt(v(9.6 * sx, -0.75), "Zn (g)", "c", { small: true }), txt(v(0.15, 0.42 * sy), "H₂ (mol)", "e", { small: true })];
    [0, 4, 8.9].forEach((t) => els.push(txt(v(t * sx, -0.35), f(t, 1), "c", { small: true, tone: "muted" })));
    [0.137, 0.2, 0.371].forEach((t) => els.push(txt(v(-0.15, t * sy), f(t, 3), "w", { small: true, tone: "muted" })));
    els.push(seg(v(0, H(0) * sy), v(8.9 * sx, H(8.9) * sy), { tone: "b", bold: true }), seg(v(0, 0.2 * sy), v(8.9 * sx, 0.2 * sy), { dash: true, thin: true, tone: "warn" }));
    els.push(ball(v(z * sx, H(z) * sy), 0.1, "a"));
    els.push(txt(v(-1.3, 5.3), " ", "c"), txt(v(6.6, -1.0), " ", "c"));
    return { els, readout: [`Zn ${f(z, 1)} g + Mg ${f(8.9 - z, 1)} g → H₂ ${f(H(z), 3)} mol.`, Math.abs(H(z) - 0.2) < 0.002 ? "Ölçülen 0,20 mol ile eşleşti: Zn 6,5 g, Mg 2,4 g." : "Ölçülen 0,20 mol için Zn = 6,5 g."] };
  },
};

// 4 · Mol yüzdesi kütle yüzdesi değildir.
const PCTS = [
  { label: "Mol yüzdesi", a: 50, b: 50, note: "0,1 mol Mg + 0,1 mol Zn: molce %50 – %50." },
  { label: "Kütle yüzdesi", a: (2.4 / 8.9) * 100, b: (6.5 / 8.9) * 100, note: "2,4 g Mg + 6,5 g Zn: kütlece ≈ %27 – %73. Eşit mol, eşit kütle değildir." },
];
const pct: FigureDef = {
  caption:
    "Mol yüzdesi kütle yüzdesi değildir. Bir yüzde türüne tıkla: aynı 0,1 mol Mg + 0,1 mol Zn karışımı molce yarı yarıya, kütlece Zn ağırlıklı görünür (mol kütleleri 24 ve 65). Soru hangi payı istiyorsa o paydayı kullan.",
  alt: "Yüzde 100’lük yığılmış çubuk: Mg ve Zn payları; seçime göre mol ya da kütle.",
  picks: PCTS.map((p) => ({ label: p.label, title: p.label, detail: [p.note] })),
  draw: (_v, _s, pick = -1) => {
    const p = PCTS[pick >= 0 ? pick : 1], k = 0.06;
    const els: El[] = [rect(0, p.a * k, -0.25, 0.25, "c"), rect(p.a * k, 100 * k, -0.25, 0.25, "b")];
    els.push(txt(v((p.a * k) / 2, 0.5), `Mg %${f(p.a, 0)}`, "c", { small: true, bold: true }), txt(v(p.a * k + ((100 - p.a) * k) / 2, 0.5), `Zn %${f(p.b, 0)}`, "c", { small: true, bold: true }));
    PCTS.forEach((pp, i) => els.push(txt(v(i * 2.8, -0.9), pp.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.3, 0.9), " ", "c"), txt(v(6.3, -1.2), " ", "c"));
    return { els, readout: [p.note, "İkinci ürünle doğrula: bulunan bileşim başka bir ölçümü (ör. tuz kütlesi) de vermeli."] };
  },
};

export const chemistryFiguresReactiveMix: Record<string, Record<string, FigureDef>> = {
  "tepkimeli-karisim": {
    "Seçici tepkimeyi verilen koşul belirler": selective,
    "İki bilinmeyene iki bağımsız bilgi": twoLines,
    "Olabilirlik aralığını önce bul": range,
    "Mol yüzdesi kütle yüzdesi değildir": pct,
  },
};
