import { centrosome, membrane, nucleus, spindle } from "./biologyFiguresMitosis";
import { circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";

/*
 * Meiosis in the same visual language as the mitosis figures: 2n = 4, the long
 * pair in yellow (from mother) / red (from father), the short pair in blue /
 * green. A chromatid is drawn as coloured segments so crossing over shows as an
 * exchanged tip. One crossing over on the long pair, none on the short pair, and
 * one metaphase I orientation are drawn; other outcomes are equally possible.
 * Schematic, not to scale.
 */

type Part = [Tone, number, number]; // tone, from, to (0 = top, 1 = bottom)
const full = (t: Tone): Part[] => [[t, 0, 1]];
const tip = (top: Tone, bottom: Tone, at = 0.68): Part[] => [
  [top, 0, at],
  [bottom, at, 1],
];

/** One chromatid as vertical coloured segments, centred at x, spanning y0 (top) to y1. */
function chromatid(x: number, y0: number, y1: number, parts: Part[], w = 0.15): El[] {
  const r = w / 2;
  const els: El[] = [];
  const arc = (cy: number, from: number, to: number): V[] => {
    const ps: V[] = [];
    for (let i = 0; i <= 6; i++) {
      const t = from + ((to - from) * i) / 6;
      ps.push(v(x + Math.cos(t) * r, cy + Math.sin(t) * r));
    }
    return ps;
  };
  for (const [t, f0, f1] of parts) {
    const ya = y0 - (y0 - y1) * f0;
    const yb = y0 - (y0 - y1) * f1;
    // Round caps only at the chromatid's own ends; inner joins stay flush.
    const top = f0 === 0 ? arc(ya, Math.PI, 0) : [v(x - r, ya), v(x + r, ya)];
    const bottom = f1 === 1 ? arc(yb, 0, -Math.PI) : [v(x + r, yb), v(x - r, yb)];
    els.push(poly([...top, ...bottom], { tone: t, fill: t, thin: true }));
    // Strong core line in the chromatid's own colour.
    els.push(seg(v(x, ya), v(x, yb), { tone: t, bold: true }));
  }
  return els;
}

/** Replicated chromosome (two sisters) centred at c, height h. */
function repl(c: V, h: number, left: Part[], right: Part[], gap = 0.1, w = 0.15): El[] {
  const y0 = c[1] + h / 2;
  const y1 = c[1] - h / 2;
  return [...chromatid(c[0] - gap, y0, y1, left, w), ...chromatid(c[0] + gap, y0, y1, right, w), circle(v(c[0], c[1]), 0.07, { tone: "ink", fill: "ink" })];
}
/** Single-chromatid chromosome. */
const one = (c: V, h: number, parts: Part[], w = 0.15): El[] => [...chromatid(c[0], c[1] + h / 2, c[1] - h / 2, parts, w), circle(c, 0.06, { tone: "ink", fill: "ink" })];

// Chromatids after one crossing over on the long pair (inner, non-sister chromatids swap tips).
const A_M1 = full("a");
const A_M2 = tip("a", "warn");
const A_P1 = tip("warn", "a");
const A_P2 = full("warn");
const B_M = full("b");
const B_P = full("c");
const LONG = 1.0;
const SHORT = 0.6;

/* ---------- 1. Tetrat ve parça değişimi (yakın plan) ---------- */
const tetrad: FigureDef = {
  caption:
    "İleri ile yakından izle: eşlenmiş homologlar yan yana gelir (sinapsis) ve dört kromatitli tetrat oluşur. Kardeş olmayan iki iç kromatit çaprazlaşır (kiyazma) ve uç parçalarını değiştirir (krossing over). Ayrıldıklarında dört kromatitten ikisi yeni birleşimlidir.",
  alt: "Sarı anneden ve kırmızı babadan gelen iki uzun kromozom; her biri sentromerle birleşik iki kardeş kromatit. Yan yana gelip dörtlü yapı oluşturuyor; iç iki kromatit alt uçta çaprazlaşıp renk değiştiriyor; sonunda iki kromatit iki renkli.",
  steps: ["Eşlenmiş homologlar", "Sinapsis: tetrat", "Kiyazma", "Krossing over", "Ayrılınca: 4 farklı kromatit"],
  draw: (_v, step) => {
    const H = 3;
    const els: El[] = [];
    const gapX = step === 0 ? 1.3 : step === 4 ? 1.0 : 0.36;
    const mx = -gapX;
    const px = gapX;
    const ms: [Part[], Part[]] = step >= 3 ? [A_M1, A_M2] : [full("a"), full("a")];
    const ps: [Part[], Part[]] = step >= 3 ? [A_P1, A_P2] : [full("warn"), full("warn")];
    els.push(...repl(v(mx, 0), H, ms[0], ms[1], 0.14, 0.24), ...repl(v(px, 0), H, ps[0], ps[1], 0.14, 0.24));
    const yCross = H / 2 - H * 0.68;
    if (step === 2) {
      // Inner chromatids touch and cross at the chiasma.
      els.push(seg(v(mx + 0.14, yCross - 0.25), v(px - 0.14, yCross + 0.25), { tone: "warn", bold: true }), seg(v(mx + 0.14, yCross + 0.25), v(px - 0.14, yCross - 0.25), { tone: "a", bold: true }));
      els.push(circle(v(0, yCross), 0.55, { tone: "ink", dash: true, thin: true }), txt(v(0.65, yCross - 0.35), "kiyazma", "e", { tone: "ink", small: true, bold: true }));
    }
    if (step === 1 || step === 2 || step === 3) {
      els.push(poly([v(-0.75, H / 2 + 0.25), v(0.75, H / 2 + 0.25)], { tone: "muted", open: true, thin: true }), txt(v(0, H / 2 + 0.35), "tetrat: 2 kromozom, 4 kromatit", "n", { tone: "muted", small: true }));
    }
    if (step === 3) els.push(vec(v(1.15, yCross), v(0.55, yCross), { tone: "ink", thin: true }), txt(v(1.2, yCross), "uçlar yer değiştirdi", "e", { tone: "ink", small: true }));
    els.push(txt(v(mx - 0.4, H / 2 - 0.3), "anneden", "w", { tone: "a", small: true, bold: true }), txt(v(px + 0.4, H / 2 - 0.3), "babadan", "e", { tone: "warn", small: true, bold: true }));
    if (step === 4) {
      const names = ["ata tipi", "yeni birleşim", "yeni birleşim", "ata tipi"];
      [mx - 0.14, mx + 0.14, px - 0.14, px + 0.14].forEach((x, i) => els.push(txt(v(x, -H / 2 - 0.2 - (i % 2) * 0.45), names[i], "s", { tone: i === 1 || i === 2 ? "c" : "muted", small: true })));
    }
    els.push(txt(v(-3.4, 2.4), " ", "c"), txt(v(3.4, -2.6), " ", "c"));
    const notes = [
      ["S evresinden sonra her homolog iki kardeş kromatitlidir. Sarı anneden, kırmızı babadan gelen homologdur.", "Kardeşler aynı (mutasyon yok), homologlar aynı genleri taşır ama alelleri farklı olabilir."],
      ["Profaz I'de homologlar boylu boyunca eşleşir (sinapsis). Oluşan yapı tetrattır: 2 kromozom, 4 kromatit, 4 DNA molekülü.", "Tetrat sayısı homolog çift sayısıdır: 2n = 4 hücrede 2 tetrat; tetrat sayısı = n."],
      ["Kardeş olmayan iki kromatitin çaprazlaştığı noktaya kiyazma denir.", "Kardeş kromatitler arasında parça değişimi yeni birleşim üretmez, çünkü dizileri aynıdır."],
      ["Krossing over: kardeş olmayan kromatitler karşılıklı parça değiştirir. Gen sayısı değişmez, alel birleşimi değişir.", "Mitozda tetrat ve krossing over görülmez."],
      ["Dört kromatitten ikisi ata tipi, ikisi yeni birleşimlidir. Mayoz II'de kardeşler ayrılınca bu dört kromatit dört ayrı hücreye gider.", "Krossing over olmadığında da çeşitlilik oluşur: homologların metafaz I'deki rastgele dizilişi."],
    ][step];
    return { els, readout: notes };
  },
};

/* ---------- 2. Mayoz aşama aşama: 2n = 4 → 4 gamet ---------- */
type MStage = { name: string; draw: () => El[]; counts: string; note: string };
const C0 = v(0, 0);
const L = v(-2.5, 0);
const R = v(2.5, 0);

// Metaphase I orientation drawn: long-maternal with short-paternal on the left.
function metaI(): El[] {
  const els: El[] = [membrane(C0, 3.4, 2.4), seg(v(0, -2.1), v(0, 2.1), { tone: "muted", dash: true, thin: true })];
  const pl = v(-3, 0);
  const pr = v(3, 0);
  const lA = v(-0.32, 0.85);
  const rA = v(0.32, 0.85);
  const lB = v(-0.32, -0.85);
  const rB = v(0.32, -0.85);
  els.push(...spindle(pl, [lA, lB]), ...spindle(pr, [rA, rB]), ...centrosome(pl), ...centrosome(pr));
  els.push(...repl(lA, LONG * 1.2, A_M1, A_M2), ...repl(rA, LONG * 1.2, A_P1, A_P2), ...repl(lB, SHORT * 1.2, B_P, B_P), ...repl(rB, SHORT * 1.2, B_M, B_M));
  return els;
}

const mstages: MStage[] = [
  {
    name: "Profaz I",
    draw: () => [
      membrane(C0, 3.3, 2.4),
      ...nucleus(C0, 1.6, true),
      ...repl(v(-0.55, 0.45), LONG * 1.2, A_M1, A_M2),
      ...repl(v(-0.05, 0.45), LONG * 1.2, A_P1, A_P2),
      ...repl(v(0.55, -0.55), SHORT * 1.2, B_M, B_M),
      ...repl(v(1.0, -0.55), SHORT * 1.2, B_P, B_P),
      ...centrosome(v(-2.4, 0.5)),
      ...centrosome(v(2.4, -0.5)),
    ],
    counts: "Bütün hücre: 4 kromozom · 8 kromatit · 2 tetrat · 4C",
    note: "Homologlar eşleşip tetrat oluşturur; uzun çiftte krossing over çizildi (uç renkleri değişti). Kısa çiftte bu örnekte parça değişimi yok.",
  },
  {
    name: "Metafaz I",
    draw: metaI,
    counts: "Bütün hücre: 4 kromozom · 8 kromatit · 4C",
    note: "Homolog çiftler ekvatorun iki yanına karşılıklı dizilir (mitozdaki tek sıra dizilişten farklı). Hangi homoloğun hangi kutba baktığı her çift için bağımsızdır.",
  },
  {
    name: "Anafaz I",
    draw: () => {
      const els: El[] = [membrane(C0, 3.6, 2.2)];
      const pl = v(-3.1, 0);
      const pr = v(3.1, 0);
      const ends: V[] = [v(-1.7, 0.7), v(-1.7, -0.7), v(1.7, 0.7), v(1.7, -0.7)];
      els.push(...spindle(pl, ends.slice(0, 2)), ...spindle(pr, ends.slice(2)), ...centrosome(pl), ...centrosome(pr));
      els.push(...repl(ends[0], LONG * 1.2, A_M1, A_M2), ...repl(ends[1], SHORT * 1.2, B_P, B_P), ...repl(ends[2], LONG * 1.2, A_P1, A_P2), ...repl(ends[3], SHORT * 1.2, B_M, B_M));
      els.push(vec(v(-0.4, -1.85), v(-1.4, -1.85), { tone: "warn" }), vec(v(0.4, -1.85), v(1.4, -1.85), { tone: "warn" }));
      return els;
    },
    counts: "Bütün hücre: 4 kromozom · 8 kromatit · 4C · her kutupta 2 kromozom (n)",
    note: "Homologlar ayrılır, kardeşler sentromerde birlikte kalır. Kromozom sayısı anlık artmaz (mitoz anafazından farkı). Her kutba her çiftten bir homolog gider.",
  },
  {
    name: "Telofaz I ve sitokinez I",
    draw: () => [
      membrane(L, 2.0, 1.8, 0, 1),
      membrane(R, 2.0, 1.8, 0, 2),
      ...nucleus(L, 1.25),
      ...nucleus(R, 1.25),
      ...repl(v(L[0] - 0.35, 0.15), LONG, A_M1, A_M2),
      ...repl(v(L[0] + 0.4, -0.1), SHORT, B_P, B_P),
      ...repl(v(R[0] - 0.35, 0.15), LONG, A_P1, A_P2),
      ...repl(v(R[0] + 0.4, -0.1), SHORT, B_M, B_M),
    ],
    counts: "Her hücre: 2 kromozom (n) · 4 kromatit · 2C",
    note: "İki hücre haploittir ama kromozomları hâlâ iki kromatitli. Mayoz II'ye geçerken DNA eşlenmesi (S evresi) olmaz.",
  },
  {
    name: "Metafaz II",
    draw: () => {
      const els: El[] = [];
      for (const [c, chs] of [
        [L, [[A_M1, A_M2, LONG], [B_P, B_P, SHORT]]],
        [R, [[A_P1, A_P2, LONG], [B_M, B_M, SHORT]]],
      ] as [V, [Part[], Part[], number][]][]) {
        const pl = v(c[0] - 1.55, 0);
        const pr = v(c[0] + 1.55, 0);
        const ys = [0.6, -0.7];
        els.push(membrane(c, 2.0, 1.8, 0, c[0]), seg(v(c[0], -1.5), v(c[0], 1.5), { tone: "muted", dash: true, thin: true }));
        els.push(...spindle(pl, ys.map((y) => v(c[0], y))), ...spindle(pr, ys.map((y) => v(c[0], y))), ...centrosome(pl), ...centrosome(pr));
        chs.forEach(([l, r, h], i) => els.push(...repl(v(c[0], ys[i]), h * 1.1, l, r)));
      }
      return els;
    },
    counts: "Her hücre: 2 kromozom · 4 kromatit · 2C",
    note: "Kromozomlar her hücrenin ortasında tek sıra dizilir (mitoz metafazına benzer). Krossing over geçirmiş kardeşler artık birbirinden farklıdır.",
  },
  {
    name: "Anafaz II",
    draw: () => {
      const els: El[] = [];
      for (const [c, chs] of [
        [L, [[A_M1, A_M2, LONG], [B_P, B_P, SHORT]]],
        [R, [[A_P1, A_P2, LONG], [B_M, B_M, SHORT]]],
      ] as [V, [Part[], Part[], number][]][]) {
        const pl = v(c[0] - 1.6, 0);
        const pr = v(c[0] + 1.6, 0);
        const ys = [0.6, -0.7];
        els.push(membrane(c, 2.1, 1.7, 0, c[0]));
        els.push(...spindle(pl, ys.map((y) => v(c[0] - 0.8, y))), ...spindle(pr, ys.map((y) => v(c[0] + 0.8, y))), ...centrosome(pl), ...centrosome(pr));
        chs.forEach(([l, r, h], i) => els.push(...one(v(c[0] - 0.8, ys[i]), h * 1.1, l), ...one(v(c[0] + 0.8, ys[i]), h * 1.1, r)));
      }
      return els;
    },
    counts: "Her hücre: 4 kromozom (anlık) · 0 kromatit çifti · 2C · her kutupta 2 kromozom",
    note: "Kardeş kromatitler ayrılır; her biri artık kromozomdur. Hücre başına kromozom sayısı anlık iki katına çıkar ama DNA artmaz.",
  },
  {
    name: "4 gamet (n)",
    draw: () => {
      const cells: [number, Part[], Part[]][] = [
        [-3.3, A_M1, B_P],
        [-1.1, A_M2, B_P],
        [1.1, A_P1, B_M],
        [3.3, A_P2, B_M],
      ];
      const els: El[] = [];
      cells.forEach(([x, a, b], i) => {
        els.push(membrane(v(x, 0), 0.92, 1.05, 0, i + 0.5), circle(v(x, 0), 0.7, { tone: "b", thin: true }));
        els.push(...one(v(x - 0.2, 0.05), LONG * 0.9, a), ...one(v(x + 0.25, -0.1), SHORT * 0.9, b));
        els.push(txt(v(x, -1.3), `${i + 1}. hücre`, "s", { tone: "muted", small: true }));
      });
      return els;
    },
    counts: "Her hücre: 2 kromozom (n) · 1C · 4 hücre birbirinden farklı",
    note: "Sonuçta n kromozomlu dört hücre oluşur; kromozom sayıları aynı, kalıtsal içerikleri farklıdır (krossing over + bağımsız dizilim). Sitoplazma ve organel miktarları farklı olabilir.",
  },
];

const meiosisStages: FigureDef = {
  caption:
    "İleri ile 2n = 4 bir hayvan hücresinin mayozunu izle: Mayoz I'de homologlar, Mayoz II'de kardeş kromatitler ayrılır. Kromatitlerdeki iki renkli uçlar krossing over'ın izidir; dört hücrenin renk birleşimleri farklıdır.",
  alt: "Profaz I'de tetratlar, metafaz I'de ekvatorun iki yanına dizilmiş homolog çiftler, anafaz I'de kutuplara giden iki kromatitli kromozomlar, iki haploit hücre, iki hücrede metafaz II ve anafaz II, sonunda her biri iki tek kromatitli kromozom taşıyan dört küçük hücre.",
  steps: mstages.map((s) => s.name),
  draw: (_v, step) => {
    const s = mstages[step];
    const els = s.draw();
    els.push(txt(v(-4.6, 2.6), " ", "c"), txt(v(4.6, -2.6), " ", "c"));
    return {
      els,
      legend: [
        { code: "", label: "uzun kromozom, anneden", tone: "a" },
        { code: "", label: "uzun kromozom, babadan", tone: "warn" },
        { code: "", label: "kısa kromozom, anneden", tone: "b" },
        { code: "", label: "kısa kromozom, babadan", tone: "c" },
      ],
      readout: [`${s.name} · ${s.counts}`, s.note],
    };
  },
};

/* ---------- 3. Bağımsız dizilim: 2ⁿ ---------- */
const assortment: FigureDef = {
  caption:
    "İleri ile metafaz I'deki iki olası dizilişi karşılaştır. Her çiftin yönü diğerinden bağımsız olduğu için n = 2'de 2² = 4 farklı gamet bileşimi çıkar (krossing over hiç olmasa bile).",
  alt: "Ekvator çizgisinin iki yanında iki homolog çift. Birinci dizilişte sol tarafta iki anne kökenli kromozom, ikincide sol tarafta bir anne bir baba kökenli kromozom. Altta oluşan gamet bileşimleri küçük renkli çubuklarla.",
  steps: ["1. diziliş", "2. diziliş", "Hepsi: 2ⁿ"],
  draw: (_v, step) => {
    const els: El[] = [];
    const gamete = (c: V, a: Tone, b: Tone, on = true): El[] => [
      circle(c, 0.55, { tone: on ? "ink" : "muted", thin: true, dash: !on }),
      ...one(v(c[0] - 0.15, c[1] + 0.03), LONG * 0.65, full(a), 0.12),
      ...one(v(c[0] + 0.18, c[1] - 0.05), SHORT * 0.65, full(b), 0.12),
    ];
    if (step < 2) {
      const swap = step === 1;
      els.push(seg(v(0, -1.6), v(0, 1.6), { tone: "muted", dash: true, thin: true }));
      els.push(...repl(v(-0.35, 0.75), LONG * 1.1, full("a"), full("a")), ...repl(v(0.35, 0.75), LONG * 1.1, full("warn"), full("warn")));
      els.push(...repl(v(-0.35, -0.75), SHORT * 1.1, full(swap ? "c" : "b"), full(swap ? "c" : "b")), ...repl(v(0.35, -0.75), SHORT * 1.1, full(swap ? "b" : "c"), full(swap ? "b" : "c")));
      els.push(txt(v(-1.6, 1.85), "sol kutba", "c", { tone: "muted", small: true }), txt(v(1.6, 1.85), "sağ kutba", "c", { tone: "muted", small: true }));
      els.push(vec(v(-0.8, 0), v(-1.6, 0), { tone: "muted", thin: true }), vec(v(0.8, 0), v(1.6, 0), { tone: "muted", thin: true }));
      els.push(...gamete(v(-2.6, 0), "a", swap ? "c" : "b"), ...gamete(v(2.6, 0), "warn", swap ? "b" : "c"));
      els.push(txt(v(-3.6, 2.3), " ", "c"), txt(v(3.6, -2), " ", "c"));
      return {
        els,
        readout: [
          swap ? "2. diziliş: anne uzun + baba kısa | baba uzun + anne kısa" : "1. diziliş: anne uzun + anne kısa | baba uzun + baba kısa",
          "Bir hücre mayozda bu dizilişlerden yalnız birini yapar; başka bir hücre ötekini yapabilir.",
        ],
      };
    }
    const combos: [Tone, Tone][] = [
      ["a", "b"],
      ["warn", "c"],
      ["a", "c"],
      ["warn", "b"],
    ];
    combos.forEach(([a, b], i) => els.push(...gamete(v(-2.7 + i * 1.8, 0), a, b)));
    els.push(txt(v(0, -1.0), "2 çift → 2² = 4 bileşim", "s", { tone: "ink", small: true, bold: true }), txt(v(-3.6, 1.2), " ", "c"), txt(v(3.6, -1.8), " ", "c"));
    return {
      els,
      readout: ["n homolog çift → 2ⁿ farklı bileşim (krossing over yokken). İnsanda n = 23: 2²³ = 8.388.608.", "Tek bir hücrenin mayozu 4 hücre verir; 2ⁿ, türün olası bileşim sayısıdır. İkisini karıştırma."],
    };
  },
};

/* ---------- 4. Mayozda DNA ve kromozom sayısı ---------- */
const graph: FigureDef = {
  caption:
    "Sürgüyü sürükle: üstte hücre başına DNA (4C → 2C → 1C), altta hücre başına kromozom sayısı (2n → n, anafaz II'de anlık 2n). İki grafik aynı anda kırılmaz; hangi olayın hangisini değiştirdiğini oku.",
  alt: "Üstte basamaklı DNA grafiği: G₁'de 2C, S'de 4C'ye yükselir, Mayoz I sonunda 2C'ye, Mayoz II sonunda 1C'ye iner. Altta kromozom grafiği: 2n'den Mayoz I sonunda n'ye iner, anafaz II'de kısa süre 2n'ye çıkıp yeniden n olur. Dikey imleç seçilen anı gösterir.",
  param: { label: "Zaman", min: 0, max: 12, step: 0.1, init: 1 },
  draw: (t) => {
    const dna = (x: number) => (x < 2 ? 2 : x < 4 ? 2 + (x - 2) : x < 7 ? 4 : x < 10 ? 2 : 1);
    const chr = (x: number) => (x < 7 ? 2 : x >= 8.5 && x < 10 ? 2 : 1);
    const D = (c: number) => 2.5 + c * 0.55;
    const K = (n: number) => n * 0.7;
    const els: El[] = [
      vec(v(0, 2.5), v(12.4, 2.5), { tone: "ink" }),
      vec(v(0, 2.5), v(0, D(4.8)), { tone: "ink" }),
      vec(v(0, 0), v(12.4, 0), { tone: "ink" }),
      vec(v(0, 0), v(0, K(2.6)), { tone: "ink" }),
      poly([v(0, D(2)), v(2, D(2)), v(4, D(4)), v(7, D(4)), v(7, D(2)), v(10, D(2)), v(10, D(1)), v(12, D(1))], { tone: "a", open: true, bold: true }),
      poly([v(0, K(2)), v(7, K(2)), v(7, K(1)), v(8.5, K(1)), v(8.5, K(2)), v(10, K(2)), v(10, K(1)), v(12, K(1))], { tone: "b", open: true, bold: true }),
    ];
    for (const c of [1, 2, 4]) els.push(txt(v(-0.15, D(c)), `${c}C`, "w", { tone: "a", small: true }));
    for (const [n, s] of [
      [1, "n"],
      [2, "2n"],
    ] as [number, string][])
      els.push(txt(v(-0.15, K(n)), s, "w", { tone: "b", small: true }));
    const marks: [number, number, string][] = [
      [0, 2, "G₁"],
      [2, 4, "S"],
      [4, 7, "G₂ + Mayoz I"],
      [7, 10, "Mayoz II"],
      [10, 12, "gamet"],
    ];
    for (const [a, b, n] of marks) els.push(seg(v(a, -0.08), v(a, 0.08), { tone: "muted" }), txt(v((a + b) / 2, -0.25), n, "s", { tone: "muted", small: true }));
    els.push(seg(v(t, 0), v(t, D(4.5)), { tone: "warn", dash: true }), circle(v(t, D(dna(t))), 0.11, { tone: "warn", fill: "warn" }), circle(v(t, K(chr(t))), 0.11, { tone: "warn", fill: "warn" }));
    els.push(txt(v(0.2, D(4.9)), "hücre başına DNA", "e", { tone: "a", small: true }), txt(v(0.2, K(2.75)), "hücre başına kromozom", "e", { tone: "b", small: true }));
    const phase = marks.find(([a, b]) => t >= a && (t < b || b === 12))?.[2] ?? "G₁";
    const c = dna(t);
    const event =
      t >= 8.5 && t < 10
        ? "Anafaz II: kardeşler ayrıldı, kromozom sayısı anlık 2n; DNA değişmedi."
        : t >= 7 && t < 8.5
          ? "Mayoz I bitti: homologlar ayrıldı → DNA ve kromozom birlikte yarılandı."
          : t >= 10
            ? "Mayoz II bitti: DNA yeniden yarılandı, kromozom n kaldı."
            : t >= 2 && t < 4
              ? "S: DNA artıyor, kromozom sayısı aynı."
              : "Kromozom sayısı ile DNA miktarını ayrı oku.";
    return { els, readout: [`${phase}: ${c.toLocaleString("tr-TR", { maximumFractionDigits: 1 })}C · ${chr(t) === 2 ? "2n" : "n"} kromozom`, event] };
  },
};

export const biologyFiguresMeiosis: Record<string, Record<string, FigureDef>> = {
  mayoz: {
    "Profaz I: sinapsis, tetrat ve parça değişimi": tetrad,
    "Anafaz I: homolog gider, kardeş kalır": meiosisStages,
    "Metafaz I: çiftlerin yönelimi bağımsızdır": assortment,
    "Mitozla karşılaştır, grafiği olayla eşleştir": graph,
  },
};
