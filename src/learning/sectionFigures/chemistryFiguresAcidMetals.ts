import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * TYT Kimya · Asit ve bazların metallerle tepkimeleri. Ders modeli sınıfları:
 * aktif (Mg, Ca), yarı soy (Cu), soy (Au), amfoter (Al, Zn). Yükseltgen asit
 * denklemleri sınıflandırma içindir, deney reçetesi değildir. Kaynak modelleri:
 * Cu + 4HNO₃(derişik) → Cu(NO₃)₂ + 2NO₂ + 2H₂O; 3Cu + 8HNO₃(seyreltik) →
 * 3Cu(NO₃)₂ + 2NO + 4H₂O; Cu + 2H₂SO₄(derişik, sıcak) → CuSO₄ + SO₂ + 2H₂O;
 * 2Al + 2NaOH + 6H₂O → 2Na[Al(OH)₄] + 3H₂. ÖSYM bağı: 2026 TYT Fen 14
 * (resmî cevap D); çözüm özgündür. Sayısal örnekler özgündür.
 */

const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });
const f = (x: number, d = 2) => x.toFixed(d).replace(".", ",");

// 1 · Amfoterliği iki gözlemle ayır.
const METALS = [
  { label: "Ca", cls: "aktif", hcl: true, naoh: false, hno3: true, note: "HCl ile H₂ verir: aktif metal (2026 TYT Fen 14)." },
  { label: "Cu", cls: "yarı soy", hcl: false, naoh: false, hno3: true, note: "HCl’den H₂ çıkarmaz; yükseltgen HNO₃ ile başka gazla tepkime verir." },
  { label: "Au", cls: "soy", hcl: false, naoh: false, hno3: false, note: "Verilen HNO₃ koşulunda tepkime yok: soy metal (2026 TYT Fen 14)." },
  { label: "Al", cls: "amfoter", hcl: true, naoh: true, hno3: true, note: "Hem HCl hem NaOH ile tepkime: amfoter (2026 TYT Fen 14). Yalnız asitle gaz çıkması yetmez." },
];
const COLS = ["HCl", "NaOH", "HNO₃"] as const;
const amphoteric: FigureDef = {
  caption:
    "Amfoterliği iki gözlemle ayır. Bir metale tıkla: üç ortamdaki ders modeli davranışı (✓ tepkime, ✗ yok) ve sınıfı açılır. 2026 TYT Fen 14 (resmî kitapçık, cevap D): Ca aktif, Au soy, Al amfoter. HNO₃ sütunu H₂ demek değildir; yükseltgen asitte gaz farklıdır. Pasif yüzey de gaz çıkışını durdurabilir.",
  alt: "Dört satırlık tablo: Ca, Cu, Au, Al; sütunlar HCl, NaOH, HNO₃; hücrelerde tepkime işareti ve sağda sınıf.",
  picks: METALS.map((m) => ({ label: m.label, title: `${m.label}: ${m.cls}`, detail: [m.note] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    COLS.forEach((c, j) => els.push(txt(v(1.4 + j * 1.3, 0.6), c, "c", { small: true, bold: true })));
    els.push(txt(v(5.3, 0.6), "sınıf", "c", { small: true, bold: true, tone: "muted" }));
    METALS.forEach((m, i) => {
      const y = -i * 0.6, sel = pick === i;
      if (sel) els.push(rect(-0.5, 6.2, y - 0.26, y + 0.26, "a", false));
      els.push(txt(v(0, y), m.label, "c", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }));
      [m.hcl, m.naoh, m.hno3].forEach((ok, j) => els.push(txt(v(1.4 + j * 1.3, y), ok ? "✓" : "✗", "c", { small: true, bold: true, tone: ok ? "b" : "muted" })));
      els.push(txt(v(5.3, y), m.cls, "c", { small: true, tone: sel ? "a" : "ink" }));
    });
    els.push(txt(v(-0.8, 1.0), " ", "c"), txt(v(6.6, -2.2), " ", "c"));
    return { els, readout: [pick >= 0 ? METALS[pick].note : "Bir metale tıkla.", "Sınıf tek gözlemden değil, asit türü ve koşulla birlikte okunur."] };
  },
};

// 2 · Elektronu metal verir.
const HALVES = [
  { label: "Yükseltgenme", title: "Mg → Mg²⁺ + 2e⁻", detail: ["Metal elektron verir (yükseltgenir)."] },
  { label: "İndirgenme", title: "2H⁺ + 2e⁻ → H₂", detail: ["Asidin H⁺ iyonu elektron alır (indirgenir)."] },
  { label: "Toplam", title: "Mg + 2H⁺ → Mg²⁺ + H₂", detail: ["Elektronlar sadeleşir: 1 Mg ↔ 2 H⁺ ↔ 1 H₂.", "Al için 2 Al ↔ 3 H₂: metal başına gaz aynı değildir."] },
];
const electrons: FigureDef = {
  caption:
    "Elektronu metal verir. Bir adıma tıkla: Mg atomu iki elektron bırakıp Mg²⁺ olur, iki H⁺ bu elektronları alıp H₂ molekülü olur. Toplamda elektronlar sadeleşir ve katsayı ilişkisi çıkar: 1 mol Mg → 1 mol H₂, 2 mol H⁺ harcanır.",
  alt: "Solda Mg, okla Mg²⁺ ve iki elektron; elektronlar iki H⁺’ya gider; sağda H₂.",
  picks: HALVES,
  draw: (_v, _s, pick = -1) => {
    const p = pick >= 0 ? pick : 2, hiL = p !== 1, hiR = p !== 0;
    const els: El[] = [
      ball(v(0, 0), 0.4, hiL ? "c" : "muted"), txt(v(0, 0), "Mg", "c", { small: true, bold: true }),
      vec(v(0.55, 0), v(1.3, 0), { tone: hiL ? "a" : "muted" }),
      ball(v(1.8, 0), 0.36, hiL ? "c" : "muted"), txt(v(1.8, 0), "Mg²⁺", "c", { small: true, bold: true }),
    ];
    [0.35, -0.35].forEach((dy) => els.push(ball(v(2.7, dy), 0.1, "a"), txt(v(2.85, dy), "e⁻", "e", { small: true })));
    els.push(vec(v(3.3, 0), v(4.1, 0), { tone: "a", dash: true }));
    [0.4, -0.4].forEach((dy) => els.push(ball(v(4.6, dy), 0.18, hiR ? "warn" : "muted"), txt(v(4.6, dy), "H⁺", "c", { small: true })));
    els.push(vec(v(5.0, 0), v(5.7, 0), { tone: hiR ? "a" : "muted" }), ball(v(6.05, 0.12), 0.2, hiR ? "b" : "muted"), ball(v(6.35, -0.12), 0.2, hiR ? "b" : "muted"), txt(v(6.2, -0.6), "H₂", "c", { small: true, bold: true }));
    els.push(txt(v(3.1, 1.0), HALVES[p].title, "c", { small: true, bold: true, tone: "a" }));
    HALVES.forEach((h, i) => els.push(txt(v(i * 2.4, -1.4), h.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.6, 1.3), " ", "c"), txt(v(7.4, -1.7), " ", "c"));
    return { els, readout: [HALVES[p].title + ": " + HALVES[p].detail[0], "2,7 g Al = 0,10 mol → 0,10 × 3/2 = 0,15 mol H₂ (yeterli asitte)."] };
  },
};

// 3 · Mol ekseni mi gram ekseni mi?
const AXES = [
  { label: "Mol ekseni", title: "Aynı metal molü: Al doğrusu daha dik", detail: ["H₂ = 1 × n(Mg), H₂ = 1,5 × n(Al).", "0,20 mol Mg → 0,20; 0,20 mol Al → 0,30 mol H₂."] },
  { label: "Gram ekseni", title: "Aynı kütle: önce mole çevir", detail: ["5,4 g Al = 0,20 mol → 0,30 mol H₂; 5,4 g Mg = 0,225 mol → 0,225 mol H₂.", "Gramı katsayıyla doğrudan çarpma."] },
];
const gasLines: FigureDef = {
  caption:
    "Gaz ile metal miktarı arasındaki doğrular. Eksene tıkla: mol ekseninde Al doğrusu 1,5 eğimle Mg’den diktir; gram ekseninde eğimler 1,5/27 ve 1/24 olur. Eksenin mol mü gram mı olduğunu ilk adımda belirle.",
  alt: "İki doğru: Mg ve Al için oluşan H₂ molü; seçili eksene göre ölçek.",
  picks: AXES,
  draw: (_v, _s, pick = -1) => {
    const gram = pick === 1, xmax = gram ? 6 : 0.24, sx = 5 / xmax, sy = 12;
    const mg = (x: number) => (gram ? x / 24 : x), al = (x: number) => (gram ? (1.5 * x) / 27 : 1.5 * x);
    const els: El[] = [vec(v(0, 0), v(5.4, 0), { thin: true }), vec(v(0, 0), v(0, 0.4 * sy), { thin: true }), txt(v(5.4, -0.35), gram ? "metal (g)" : "metal (mol)", "e", { small: true }), txt(v(0.15, 0.4 * sy), "H₂ (mol)", "e", { small: true })];
    els.push(seg(v(0, 0), v(xmax * sx, al(xmax) * sy), { tone: "b", bold: true }), seg(v(0, 0), v(xmax * sx, mg(xmax) * sy), { tone: "c", bold: true }));
    els.push(txt(v(xmax * sx + 0.1, al(xmax) * sy), "Al", "e", { small: true, bold: true, tone: "b" }), txt(v(xmax * sx + 0.1, mg(xmax) * sy), "Mg", "e", { small: true, bold: true, tone: "c" }));
    const x0 = gram ? 5.4 : 0.2;
    els.push(seg(v(x0 * sx, 0), v(x0 * sx, al(x0) * sy), { dash: true, thin: true, tone: "muted" }), ball(v(x0 * sx, al(x0) * sy), 0.09, "a"), ball(v(x0 * sx, mg(x0) * sy), 0.09, "a"));
    els.push(txt(v(x0 * sx, -0.35), gram ? "5,4 g" : "0,20 mol", "c", { small: true, tone: "a" }));
    AXES.forEach((a, i) => els.push(txt(v(i * 2.6, -1.1), a.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-0.6, 5.2), " ", "c"), txt(v(6.6, -1.4), " ", "c"));
    return { els, readout: [gram ? `5,4 g: Al ${f(al(5.4), 3)}, Mg ${f(mg(5.4), 3)} mol H₂.` : `0,20 mol: Al ${f(al(0.2))}, Mg ${f(mg(0.2))} mol H₂.`, AXES[gram ? 1 : 0].detail[1]] };
  },
};

// 4 · Alaşımı gazdan geriye çöz.
const alloy: FigureDef = {
  caption:
    "10,0 g Cu–Zn örneği yeterli HCl ile; modelde yalnız Zn tepkime verir (Zn : H₂ = 1 : 1, M(Zn) = 65 g/mol). Zn kütlesini kaydır: oluşan H₂ = Zn ÷ 65. Ölçülen 0,10 mol H₂ (kesikli) 6,5 g Zn verir; Cu = 3,5 g, %65 Zn. Mg–Al gibi iki aktif metalde iki denklem gerekir.",
  alt: "Yatay eksende Zn kütlesi 0–10 g, düşey eksende H₂ molü; doğru, kesikli 0,10 mol çizgisi ve seçili nokta.",
  param: { label: "Zn kütlesi", min: 0, max: 10, step: 0.5, init: 6.5, unit: " g" },
  draw: (z) => {
    const sx = 0.5, sy = 25, h = z / 65;
    const els: El[] = [vec(v(0, 0), v(5.4, 0), { thin: true }), vec(v(0, 0), v(0, 0.17 * sy), { thin: true }), txt(v(5.4, -0.35), "Zn (g)", "e", { small: true }), txt(v(0.15, 0.17 * sy), "H₂ (mol)", "e", { small: true })];
    [0, 5, 10].forEach((t) => els.push(txt(v(t * sx, -0.35), String(t), "c", { small: true, tone: "muted" })));
    els.push(txt(v(-0.15, 0.1 * sy), "0,10", "w", { small: true, tone: "muted" }));
    els.push(seg(v(0, 0), v(10 * sx, (10 / 65) * sy), { tone: "b", bold: true }), seg(v(0, 0.1 * sy), v(10 * sx, 0.1 * sy), { dash: true, thin: true, tone: "warn" }));
    els.push(ball(v(z * sx, h * sy), 0.1, "a"));
    els.push(rect(6.0, 6.0 + z * 0.25, 2.6, 3.0, "b"), rect(6.0 + z * 0.25, 8.5, 2.6, 3.0, "warn"), txt(v(7.25, 3.3), `Zn ${f(z, 1)} g · Cu ${f(10 - z, 1)} g`, "c", { small: true }));
    els.push(txt(v(-0.8, 4.6), " ", "c"), txt(v(8.8, -0.6), " ", "c"));
    return { els, readout: [`H₂ = ${f(z, 1)} ÷ 65 = ${f(h, 3)} mol; HCl = ${f(2 * h, 3)} mol.`, Math.abs(z - 6.5) < 1e-9 ? "Ölçülen 0,10 mol ile eşleşti: %65 Zn, 3,5 g Cu." : "0,10 mol H₂ için Zn = 0,10 × 65 = 6,5 g."] };
  },
};

// 5 · Asidin adı önemlidir.
const ACIDS = [
  { label: "Cu + HCl", gas: "—", ratio: 0, eq: "Tepkime yok (ders modeli)", note: "Cu, HCl’deki H⁺’yı indirgeyemez: H₂ çıkmaz." },
  { label: "Cu + derişik HNO₃", gas: "NO₂", ratio: 2, eq: "Cu + 4HNO₃ → Cu(NO₃)₂ + 2NO₂ + 2H₂O", note: "Yükseltgen asit: gaz NO₂ (azot dioksit)." },
  { label: "Cu + seyreltik HNO₃", gas: "NO", ratio: 2 / 3, eq: "3Cu + 8HNO₃ → 3Cu(NO₃)₂ + 2NO + 4H₂O", note: "Aynı asit, farklı derişim: gaz NO (azot monoksit)." },
  { label: "Cu + derişik H₂SO₄", gas: "SO₂", ratio: 1, eq: "Cu + 2H₂SO₄ → CuSO₄ + SO₂ + 2H₂O", note: "Derişik, sıcak: gaz SO₂ (kükürt dioksit)." },
  { label: "Mg + HCl", gas: "H₂", ratio: 1, eq: "Mg + 2HCl → MgCl₂ + H₂", note: "Aktif metal + yükseltgen olmayan asit: H₂." },
];
const acidName: FigureDef = {
  caption:
    "Asidin adı önemlidir: aynı Cu, asit ve koşula göre farklı gaz verir ya da hiç vermez. Bir eşleşmeye tıkla: verilen denklem, gaz ve 0,15 mol metal için gaz molü açılır. Mg/HCl’deki H₂ kuralı yükseltgen asitlere taşınmaz.",
  alt: "Beş eşleşme düğmesi; seçili eşleşmenin denklemi ve gaz molü çubuğu.",
  picks: ACIDS.map((a) => ({ label: a.label, title: `${a.label}: ${a.gas === "—" ? "gaz yok" : a.gas}`, detail: [a.eq, a.note] })),
  draw: (_v, _s, pick = -1) => {
    const a = ACIDS[pick >= 0 ? pick : 1], n = 0.15 * a.ratio, k = 16;
    const els: El[] = [txt(v(0, 0.9), a.eq, "e", { small: true, bold: true })];
    els.push(txt(v(-0.2, 0.2), a.gas === "—" ? "gaz" : a.gas, "w", { small: true, bold: true }), rect(0, Math.max(n * k, 0.001), 0, 0.4, "b"), txt(v(n * k + 0.15, 0.2), a.gas === "—" ? "0 (tepkime yok)" : `${f(n, 2)} mol (0,15 mol metal)`, "e", { small: true }));
    ACIDS.forEach((aa, i) => els.push(txt(v((i % 2) * 3.6, -0.6 - Math.floor(i / 2) * 0.55), aa.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-1.0, 1.3), " ", "c"), txt(v(7.4, -2.0), " ", "c"));
    return { els, readout: [a.note, "Gazın formülü asit, metal ve koşula bağlıdır; verilen denklemin katsayısını kullan."] };
  },
};

// 6 · Sulu bazda su da denklemdedir.
const ATOMS: [string, number, number][] = [["Al", 2, 2], ["Na", 2, 2], ["O", 8, 8], ["H", 14, 14]];
const baseWater: FigureDef = {
  caption:
    "Sulu bazda su da denklemdedir: 2Al + 2NaOH + 6H₂O → 2Na[Al(OH)₄] + 3H₂. Bir elemente tıkla: iki taraftaki atom sayısı ve kaynağı açılır. H₂’deki hidrojenin çoğu sudan gelir; H’yi yalnız NaOH’tan saymak denklemi kurmaz. [Al(OH)₄]⁻ alüminata bağlı hidroksit gruplu kompleks iyondur.",
  alt: "Dört satırlık atom sayımı: Al 2 = 2, Na 2 = 2, O 8 = 8, H 14 = 14.",
  picks: ATOMS.map(([el, l, r]) => ({
    label: el,
    title: `${el}: sol ${l} = sağ ${r}`,
    detail: [
      el === "H" ? "Sol: 2 (NaOH) + 12 (6 H₂O) = 14; sağ: 8 (2 [Al(OH)₄]⁻) + 6 (3 H₂) = 14." : el === "O" ? "Sol: 2 (NaOH) + 6 (H₂O) = 8; sağ: 2 × 4 = 8." : `${el}: iki tarafta ${l}.`,
      "0,20 mol Al → 0,30 mol H₂ ve 0,20 mol NaOH.",
    ],
  })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [txt(v(0, 0.8), "2Al + 2NaOH + 6H₂O → 2Na[Al(OH)₄] + 3H₂", "e", { small: true, bold: true })];
    els.push(txt(v(1.6, 0.25), "sol", "c", { small: true, tone: "muted" }), txt(v(3.0, 0.25), "sağ", "c", { small: true, tone: "muted" }));
    ATOMS.forEach(([el, l, r], i) => {
      const y = -0.25 - i * 0.5, sel = pick === i;
      els.push(txt(v(0.4, y), el, "c", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }), txt(v(1.6, y), String(l), "c", { small: true, bold: sel }), txt(v(2.3, y), "=", "c", { small: true, tone: "muted" }), txt(v(3.0, y), String(r), "c", { small: true, bold: sel }));
    });
    els.push(txt(v(-0.4, 1.2), " ", "c"), txt(v(7.4, -2.2), " ", "c"));
    return { els, readout: [pick >= 0 ? `${ATOMS[pick][0]}: ${ATOMS[pick][1]} = ${ATOMS[pick][2]}.` : "Bir elemente tıkla.", "Soruda farklı bir alüminat gösterimi verilirse o dengeli denklemi kullan."] };
  },
};

export const chemistryFiguresAcidMetals: Record<string, Record<string, FigureDef>> = {
  "asit-baz-metaller": {
    "Amfoterliği iki gözlemle ayır": amphoteric,
    "Elektronu metal verir": electrons,
    "Gaz ile artan maddeyi birlikte hesapla": gasLines,
    "Alaşımı gazdan geriye doğru çöz": alloy,
    "Asidin adı önemlidir": acidName,
    "Sulu bazda su da denklemdedir": baseWater,
  },
};
