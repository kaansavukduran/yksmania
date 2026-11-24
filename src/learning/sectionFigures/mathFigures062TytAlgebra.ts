import { pt, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { cell, numberLine, pad, rect, table, tn, zs } from "./mathFigures062TytKit";

/*
 * TYT Matematik (Forge062) · Aurelia kaynak dersleri: birinci dereceden
 * denklemler ve basit eşitsizlikler. İki tarafın grafiği, kişi–tutar
 * şeridi, sabit artış adımları, iki noktadan doğru, sistem türleri, sayı
 * doğrusunda yansıma, üç taraflı dönüşüm şeridi, ve/veya bölgeleri, bütçe
 * sütunları ve aralık köşeleri. Bütün değerler bölümdeki örneklerden
 * (5x = 20, 80x + 50(12 − x) = 780, 1 + 3(n − 1), x + y = 5 …) hesaplanır.
 */

/* ---------- ortak: koordinat düzlemi ---------- */

function axes(x0: number, x1: number, y0: number, y1: number, k: number, xs: number[], ys: number[]): El[] {
  const els: El[] = [vec(v(x0 * k, 0), v(x1 * k + 0.3, 0), { tone: "ink", thin: true }), vec(v(0, y0 * k), v(0, y1 * k + 0.3), { tone: "ink", thin: true })];
  els.push(txt(v(x1 * k + 0.3, 0), "x", "se", { tone: "ink", small: true }), txt(v(0, y1 * k + 0.3), "y", "ne", { tone: "ink", small: true }));
  for (const t of xs) els.push(seg(v(t * k, -0.07), v(t * k, 0.07), { tone: "muted", thin: true }), txt(v(t * k, -0.12), zs(t), "s", { tone: "muted", small: true, soft: true }));
  for (const t of ys) els.push(seg(v(-0.07, t * k), v(0.07, t * k), { tone: "muted", thin: true }), txt(v(-0.12, t * k), zs(t), "w", { tone: "muted", small: true, soft: true }));
  return els;
}

/** ax + by = c doğrusunun [x0, x1] × [y0, y1] kutusu içindeki parçası. */
function clip(a: number, b: number, c: number, x0: number, x1: number, y0: number, y1: number): [V, V] {
  const ps: V[] = [];
  const add = (x: number, y: number) => {
    if (x >= x0 - 1e-9 && x <= x1 + 1e-9 && y >= y0 - 1e-9 && y <= y1 + 1e-9 && !ps.some((p) => Math.abs(p[0] - x) + Math.abs(p[1] - y) < 1e-9)) ps.push(v(x, y));
  };
  if (b !== 0) {
    add(x0, (c - a * x0) / b);
    add(x1, (c - a * x1) / b);
  }
  if (a !== 0) {
    add((c - b * y0) / a, y0);
    add((c - b * y1) / a, y1);
  }
  return [ps[0], ps[1]];
}
const sc = (p: V, k: number): V => v(p[0] * k, p[1] * k);

/* ===================== Birinci dereceden denklemler ===================== */

const TYPES: [number, number, string][] = [[5, 20, "5x = 20"], [0, 0, "0x = 0"], [0, 7, "0x = 7"]];
const typeGraph: FigureDef = {
  caption:
    "Ax = B denkleminin iki tarafı ayrı grafikler olarak çizilir: sol taraf y = Ax, sağ taraf y = B. Kesişim noktalarının x değerleri çözüm kümesidir. A ≠ 0 ise doğrular bir noktada kesişir (tek kök); A = 0 ve B = 0 ise çakışır (ℝ); A = 0 ve B ≠ 0 ise paraleldir (∅). Düşey ölçek sıkıştırılmıştır.",
  alt: "Koordinat düzleminde sol tarafın doğrusu ve sağ tarafın yatay doğrusu; kesişim varsa nokta, çakışma varsa tek kalın doğru.",
  steps: TYPES.map(([, , s]) => s),
  draw: (_, step) => {
    const [A, B] = TYPES[step];
    const kx = 1.1;
    const ky = 0.16;
    const els: El[] = [vec(v(-1 * kx, 0), v(6 * kx + 0.3, 0), { tone: "ink", thin: true }), vec(v(0, -6 * ky), v(0, 31 * ky), { tone: "ink", thin: true })];
    for (const t of [2, 4, 6]) els.push(seg(v(t * kx, -0.07), v(t * kx, 0.07), { tone: "muted", thin: true }), txt(v(t * kx, -0.12), String(t), "s", { tone: "muted", small: true, soft: true }));
    for (const t of [10, 20, 30]) els.push(seg(v(-0.07, t * ky), v(0.07, t * ky), { tone: "muted", thin: true }), txt(v(-0.12, t * ky), String(t), "w", { tone: "muted", small: true, soft: true }));
    els.push(txt(v(6 * kx + 0.3, 0), "x", "se", { tone: "ink", small: true }));
    const left: [V, V] = A ? [v(-1 * kx, -A * ky), v(6 * kx, 6 * A * ky)] : [v(0.12, 0), v(6 * kx, 0)];
    els.push(seg(left[0], left[1], { tone: "a", bold: true }), seg(v(0.12, B * ky), v(6 * kx, B * ky), { tone: "c", dash: A === 0 && B === 0 }));
    if (A) els.push(txt(v(6 * kx + 0.15, left[1][1]), `sol: ${A}x`, "e", { tone: "a", small: true, bold: true }));
    else els.push(txt(v(3 * kx, 0.15), B ? "sol: 0x" : "sol ve sağ: 0", "n", { tone: "a", small: true, bold: true }));
    if (B) els.push(txt(v(6 * kx + 0.15, B * ky), `sağ: ${B}`, "e", { tone: "c", small: true, bold: true }));
    if (A) els.push(seg(v((B / A) * kx, 0), v((B / A) * kx, B * ky), { tone: "warn", dash: true, thin: true }), pt(v((B / A) * kx, B * ky), `x = ${B / A}`, "nw", "warn"));
    els.push(...pad(-1.6, 31 * ky + 0.3, 6 * kx + 2.2, -6 * ky - 0.4));
    const lines = [
      ["Doğrular tek noktada kesişir: x = 20/5 = 4, ÇK = {4}.", "A = 5 ≠ 0 olduğu için 5’e bölmek geçerlidir."],
      ["0x = 0: iki taraf her x için 0, doğrular çakışır.", "ÇK = ℝ; yalnız x = 0 değil, bütün x’ler."],
      ["0x = 7: sol taraf hep 0, sağ taraf hep 7; ortak nokta yok.", "ÇK = ∅."],
    ];
    return { els, readout: lines[step] };
  },
};

const tickets: FigureDef = {
  caption:
    "Bilet modeli: 12 kişinin x’i yetişkin (80 TL), 12 − x’i öğrenci (50 TL). Üst şerit kişileri, alt şerit tutarı gösterir; ölçekli. Toplam 80x + 50(12 − x) = 30x + 600’dür ve yalnız x = 6’da 780 TL çizgisine ulaşır. 80x + 50x yazmak iki gruba aynı adedi verir ve 12 kişi koşulunu kaybettirir.",
  alt: "Üstte 12 hücreli kişi şeridi: yetişkin ve öğrenci hücreleri iki farklı biçimde. Altta iki parçalı tutar şeridi ve 780 TL hedef çizgisi.",
  param: { label: "x (yetişkin sayısı)", min: 0, max: 12, step: 1, init: 6 },
  draw: (x) => {
    const els: El[] = [];
    const w = 0.75;
    for (let i = 0; i < 12; i++) els.push(...cell(i * w, 1.3, w - 0.06, 0.7, i < x ? "Y" : "Ö", i < x ? "a" : "c", { fill: i < x }));
    const k = 0.0095;
    const A = 80 * x;
    const S = 50 * (12 - x);
    els.push(rect(0, 0, A * k, 0.7, "a"), rect(A * k, 0, S * k, 0.7, "c", false));
    els.push(seg(v(780 * k, -0.25), v(780 * k, 2.2), { tone: "warn", dash: true, thin: true }), txt(v(780 * k, 2.3), "780 TL", "n", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(-0.25, 1.65), "kişi", "w", { tone: "muted", small: true }), txt(v(-0.25, 0.35), "TL", "w", { tone: "muted", small: true }));
    els.push(...pad(-1.2, 2.9, 960 * k + 0.4, -0.6));
    const total = A + S;
    return {
      els,
      legend: [
        { code: "Y", label: "yetişkin, 80 TL", tone: "a" },
        { code: "Ö", label: "öğrenci, 50 TL", tone: "c" },
      ],
      readout: [`80 · ${x} + 50 · ${12 - x} = ${tn(A)} + ${tn(S)} = ${tn(total)} TL.`, total === 780 ? "Hedefe eşit: 6 yetişkin, 6 öğrenci; iki koşul da sağlanır." : total < 780 ? `${780 - total} TL eksik: daha fazla yetişkin gerekir.` : `${total - 780} TL fazla: daha az yetişkin gerekir.`],
    };
  },
};

const arith: FigureDef = {
  caption:
    "Sabit artış adımları: ilk adım 1, her geçişte +3 (özgün öğretim modeli). n adımda n − 1 geçiş vardır; bu yüzden aₙ = 1 + 3(n − 1). n = 1’de sonuç ilk terim olmalıdır. Hedef 241 için 3(n − 1) = 240 ve n = 81 bulunur; ilk terim 2 olsaydı n tam sayı çıkmazdı.",
  alt: "Yan yana terim hücreleri, aralarında +3 yazılı oklar; geçiş okları sayılır.",
  param: { label: "n", min: 1, max: 9, step: 1, init: 4 },
  draw: (n) => {
    const w = 1.0;
    const g = 0.65;
    const els: El[] = [];
    for (let i = 0; i < n; i++) {
      const x = i * (w + g);
      els.push(...cell(x, 0, w, 0.8, String(1 + 3 * i), i === n - 1 ? "warn" : "a", { fill: i === 0 || i === n - 1 }));
      els.push(txt(v(x + w / 2, -0.12), `${i + 1}.`, "s", { tone: "muted", small: true, soft: true }));
      if (i < n - 1) {
        els.push(vec(v(x + w + 0.04, 0.4), v(x + w + g - 0.04, 0.4), { tone: "c" }));
        els.push(txt(v(x + w + g / 2, 0.95), "+3", "n", { tone: "c", small: true, bold: true }));
      }
    }
    els.push(...pad(-0.2, 1.9, 9 * (w + g), -0.8));
    return {
      els,
      readout: [`a${n === 1 ? "₁" : "ₙ"} = 1 + 3 · (${n} − 1) = ${1 + 3 * (n - 1)}: ${n - 1} geçiş.`, "241 = 1 + 3(n − 1) ⇒ n − 1 = 80 ⇒ n = 81."],
    };
  },
};

const LINE_STEPS = ["x + y = 5", "x − y = 1", "Kesişim (3, 2)", "x = 2 ve y = 3"];
const twoPoints: FigureDef = {
  caption:
    "Bir doğruyu iki noktadan çizmek. x + y = 5 için eksen kesişimleri (0, 5) ve (5, 0); x − y = 1 için (0, −1) ve (1, 0). İki doğrunun ortak noktası (3, 2) iki denklemi de sağlar. x = 2 düşey, y = 3 yatay doğrudur; yalnız bir değişken içerse de bir doğru belirtir.",
  alt: "Koordinat düzleminde düz ve kesik çizgili iki doğru, eksen kesişim noktaları ve ortak nokta; son adımda düşey ve yatay doğrular.",
  steps: LINE_STEPS,
  draw: (_, step) => {
    const k = 0.72;
    const B: [number, number, number, number] = [-1.5, 6, -2, 6];
    const els: El[] = [...axes(B[0], B[1], B[2], B[3], k, [1, 3, 5], [-1, 2, 4])];
    if (step <= 2) {
      const [p, q] = clip(1, 1, 5, ...B);
      els.push(seg(sc(p, k), sc(q, k), { tone: "a", bold: true }), pt(v(0, 5 * k), "(0, 5)", "e", "a"), pt(v(5 * k, 0), "(5, 0)", "n", "a"));
    }
    if (step >= 1 && step <= 2) {
      const [p, q] = clip(1, -1, 1, ...B);
      els.push(seg(sc(p, k), sc(q, k), { tone: "c", dash: true }), pt(v(0, -1 * k), "(0, −1)", "w", "c"), pt(v(1 * k, 0), "(1, 0)", "se", "c"));
    }
    if (step === 2) els.push(pt(v(3 * k, 2 * k), "(3, 2)", "e", "warn"));
    if (step === 3) {
      els.push(seg(v(2 * k, B[2] * k), v(2 * k, B[3] * k), { tone: "a", bold: true }), seg(v(B[0] * k, 3 * k), v(B[1] * k, 3 * k), { tone: "c", dash: true }));
      els.push(pt(v(2 * k, 0), "(2, 0)", "se", "a"), pt(v(2 * k, 3 * k), "(2, 3)", "ne", "warn"), pt(v(0, 3 * k), "(0, 3)", "nw", "c"));
    }
    els.push(...pad(B[0] * k - 0.3, B[3] * k + 0.5, B[1] * k + 0.6, B[2] * k - 0.3));
    const lines = [
      ["x = 0 ⇒ y = 5; y = 0 ⇒ x = 5.", "İki nokta bir doğruyu belirler."],
      ["x − y = 1: x = 0 ⇒ y = −1; y = 0 ⇒ x = 1.", "Kesik çizgi ikinci denklemdir."],
      ["(3, 2): 3 + 2 = 5 ve 3 − 2 = 1.", "Ortak nokta iki koşulu birden sağlar."],
      ["x = 2: bütün noktalarda x = 2 (düşey). y = 3: yatay.", "Kesişim (2, 3)."],
    ];
    return { els, readout: lines[step] };
  },
};

const SYS: { name: string; l1: [number, number, number]; l2: [number, number, number]; lines: string[] }[] = [
  { name: "Tek nokta", l1: [1, 2, 8], l2: [1, -1, 2], lines: ["x + 2y = 8 ve x − y = 2 tek noktada kesişir: (4, 2).", "Çıkarınca 3y = 6, y = 2; sonra x = 4."] },
  { name: "Paralel", l1: [1, 1, 4], l2: [2, 2, 9], lines: ["x + y = 4 ve 2x + 2y = 9: ilkini 2 ile çarpınca 8 = 9 kalır.", "Paralel ve farklı doğrular: ÇK = ∅."] },
  { name: "Çakışan", l1: [1, 1, 4], l2: [2, 2, 8], lines: ["2x + 2y = 8, x + y = 4’ün 2 katıdır: aynı doğru.", "(0, 4) ve (3, 1) çözüm; (0, 0) çözüm değil."] },
];
const systems: FigureDef = {
  caption:
    "İki doğrusal denklemin üç çözüm türü düzlemde: bir noktada kesişen doğrular tek sıralı ikili, paralel ve farklı doğrular boş küme, çakışan doğrular o doğru üzerindeki sonsuz çift verir. Çakışmada düzlemin her noktası değil, yalnız doğru üzerindekiler çözümdür.",
  alt: "Koordinat düzleminde düz ve kesik çizgili iki doğru; kesişim, paralellik ya da çakışma durumu ve ilgili noktalar.",
  steps: SYS.map((s) => s.name),
  draw: (_, step) => {
    const k = 0.72;
    const B: [number, number, number, number] = [-1, 6, -1, 5.5];
    const s = SYS[step];
    const els: El[] = [...axes(B[0], B[1], B[2], B[3], k, [2, 4], [1, 3])];
    const [p1, q1] = clip(...s.l1, ...B);
    const [p2, q2] = clip(...s.l2, ...B);
    els.push(seg(sc(p1, k), sc(q1, k), { tone: "a", bold: true }), seg(sc(p2, k), sc(q2, k), { tone: "c", dash: true }));
    if (step === 0) els.push(pt(v(4 * k, 2 * k), "(4, 2)", "ne", "warn"));
    if (step === 2) els.push(pt(v(0, 4 * k), "(0, 4)", "e", "warn"), pt(v(3 * k, 1 * k), "(3, 1)", "ne", "warn"), pt(v(0, 0), "(0, 0) değil", "ne", "muted", true));
    els.push(...pad(B[0] * k - 0.3, B[3] * k + 0.5, B[1] * k + 0.6, B[2] * k - 0.3));
    return { els, readout: s.lines };
  },
};

/* ===================== Basit eşitsizlikler ===================== */

const reflect: FigureDef = {
  caption:
    "Negatif çarpan sayı doğrusunda 0’a göre yansıtır. −3 < 2 iken −1 ile çarpınca 3 ve −2 olur; sıra 3 > −2’ye döner. −3x > 12’de iki tarafı −3’e bölmek yönü çevirir: x < −4. Tablo üç denemeyi gösterir: içeride bir değer, açık sınır ve dışarıda bir değer.",
  alt: "Birinci adımda üst doğruda −3 ve 2, alt doğruda yansımaları 3 ve −2, aralarında 0’dan geçen kesik bağlar. İkinci adımda −4’te boş uçlu, sola giden çözüm ışını ve deneme tablosu.",
  steps: ["−3 < 2 ⇒ 3 > −2", "−3x > 12 ⇒ x < −4"],
  draw: (_, step) => {
    const k = 0.8;
    const els: El[] = [];
    if (step === 0) {
      els.push(...numberLine(-5, 5, k, 1.6, [-3, 2]), ...numberLine(-5, 5, k, 0, [-2, 0, 3]));
      els.push(pt(v(-3 * k, 1.6), undefined, "n", "a"), pt(v(2 * k, 1.6), undefined, "n", "c"), pt(v(3 * k, 0), undefined, "n", "a"), pt(v(-2 * k, 0), undefined, "n", "c"));
      els.push(seg(v(-3 * k, 1.5), v(3 * k, 0.1), { tone: "a", dash: true, thin: true }), seg(v(2 * k, 1.5), v(-2 * k, 0.1), { tone: "c", dash: true, thin: true }));
      els.push(txt(v(5.6 * k, 1.6), "önce", "e", { tone: "muted", small: true }), txt(v(5.6 * k, 0), "× (−1)", "e", { tone: "muted", small: true }));
      els.push(...pad(-5.5 * k, 2.3, 5.6 * k + 2.0, -0.6));
      return { els, readout: ["−3 < 2 doğru; −1 ile çarpınca 3 > −2: yön değişti.", "< ile >, ≤ ile ≥ yer değiştirir; eşitlik kabulü kaybolmaz."] };
    }
    els.push(...numberLine(-7, 2, k, 2.6, [-7, -5, -4, 0]));
    els.push(seg(v(-7 * k, 2.6), v(-4 * k, 2.6), { tone: "warn", bold: true }), vec(v(-6.5 * k, 2.6), v(-7.3 * k, 2.6), { tone: "warn", bold: true }));
    els.push(pt(v(-4 * k, 2.6), undefined, "n", "warn", true), pt(v(-5 * k, 2.6), undefined, "n", "a"), pt(v(0, 2.6), undefined, "n", "muted", true));
    els.push(
      ...table(-6.5, 1.8, [1.6, 1.9, 2.6], 0.75, [
        [{ s: "x" }, { s: "−3x" }, { s: "−3x > 12?" }],
        [{ s: "−5", tone: "a" }, { s: "15" }, { s: "evet" }],
        [{ s: "−4" }, { s: "12" }, { s: "hayır, eşit" }],
        [{ s: "0" }, { s: "0" }, { s: "hayır" }],
      ], "b"),
    );
    els.push(...pad(-7.5 * k, 3.2, 2.4 * k, -1.4));
    return { els, readout: ["−3x > 12 ⇒ x < −4: −3’e bölmek yönü çevirir.", "Çözüm (−∞, −4): −4 sınırdır ama dahil değildir."] };
  },
};

const THREE = [
  { label: "(x − 1)/3", a: 2, b: 5, op: "" },
  { label: "x − 1", a: 6, b: 15, op: "üç tarafı 3 ile çarp" },
  { label: "x", a: 7, b: 16, op: "üç tarafa 1 ekle" },
];
const threeSides: FigureDef = {
  caption:
    "Üç taraflı eşitsizliğin dönüşüm şeridi: 2 ≤ (x − 1)/3 < 5. Payda 3 pozitif olduğundan üç taraf 3 ile çarpılır ve yön korunur: 6 ≤ x − 1 < 15. Sonra üç tarafa 1 eklenir: 7 ≤ x < 16. Her satırda dolu uç dahil, boş uç hariç; ölçekli sayı doğruları.",
  alt: "Üst üste üç sayı doğrusu: her birinde o adımdaki ifadenin aralığı, solda dolu uç, sağda boş uç; satır başında ifade.",
  steps: ["2 ≤ (x − 1)/3 < 5", "6 ≤ x − 1 < 15", "7 ≤ x < 16"],
  draw: (_, step) => {
    const k = 0.55;
    const els: El[] = [];
    THREE.slice(0, step + 1).forEach((r, i) => {
      const y = -i * 1.3;
      els.push(...numberLine(0, 17, k, y, []));
      els.push(seg(v(r.a * k, y), v(r.b * k, y), { tone: i === step ? "warn" : "a", bold: true }), pt(v(r.a * k, y), undefined, "n", "a"), pt(v(r.b * k, y), undefined, "n", "a", true));
      els.push(txt(v(r.a * k, y - 0.15), String(r.a), "s", { tone: "ink", small: true }), txt(v(r.b * k, y - 0.15), String(r.b), "s", { tone: "ink", small: true }));
      els.push(txt(v(-0.3, y), r.label, "w", { tone: "ink", small: true, bold: true }));
    });
    els.push(...pad(-3.0, 0.6, 17.5 * k, -2 * 1.3 - 0.7));
    const r = THREE[step];
    return {
      els,
      readout: [step === 0 ? "Başlangıç: (x − 1)/3 ifadesi [2, 5) aralığında." : `${r.op[0].toUpperCase()}${r.op.slice(1)}: ${r.a} ≤ ${r.label} < ${r.b}.`, step === 2 ? "Çözüm [7, 16): 7 alınır, 16 alınmaz." : "Pozitif çarpan ve ekleme yönü korur."],
    };
  },
};

type Ray = { at: number; dir: -1 | 1; closed: boolean; label: string };
function rays(conds: [Ray, Ray], result: [number, number, boolean, boolean][], resLabel: string): El[] {
  const k = 0.62;
  const L = -7;
  const R = 8;
  const els: El[] = [];
  const tones: Tone[] = ["a", "c"];
  conds.forEach((c, i) => {
    const y = 2.6 - i * 1.3;
    els.push(...numberLine(L, R, k, y, [c.at]));
    const end = c.dir < 0 ? L + 0.3 : R - 0.3;
    els.push(seg(v(c.at * k, y), v(end * k, y), { tone: tones[i], bold: true }), pt(v(c.at * k, y), undefined, "n", tones[i], !c.closed));
    els.push(txt(v((L - 0.6) * k, y), c.label, "w", { tone: tones[i], small: true, bold: true }));
  });
  els.push(...numberLine(L, R, k, 0, [0]));
  for (const [a, b, ca, cb] of result) {
    els.push(seg(v(Math.max(a, L + 0.3) * k, 0), v(Math.min(b, R - 0.3) * k, 0), { tone: "warn", bold: true }));
    if (a > L) els.push(pt(v(a * k, 0), undefined, "n", "warn", !ca));
    if (b < R) els.push(pt(v(b * k, 0), undefined, "n", "warn", !cb));
  }
  els.push(txt(v((L - 0.6) * k, 0), resLabel, "w", { tone: "warn", small: true, bold: true }));
  els.push(...pad((L - 6) * k, 3.2, (R + 0.6) * k, -0.7));
  return els;
}
const AND: { conds: [Ray, Ray]; res: [number, number, boolean, boolean][]; lines: string[] }[] = [
  { conds: [{ at: 1, dir: 1, closed: false, label: "x > 1" }, { at: 4, dir: -1, closed: true, label: "x ≤ 4" }], res: [[1, 4, false, true]], lines: ["Ortak bölge (1, 4]: x = 2 ikisini de sağlar.", "x = 0 yalnız üst sınırı, x = 5 yalnız alt sınırı sağlar."] },
  { conds: [{ at: -2, dir: -1, closed: true, label: "x ≤ −2" }, { at: 3, dir: 1, closed: false, label: "x > 3" }], res: [], lines: ["İki bölge üst üste gelmez: ÇK = ∅.", "Ekranda iki boyalı bölge olması ortak çözüm demek değildir."] },
];
const andFig: FigureDef = {
  caption:
    "“Ve” bağlacında iki koşulun ışınları ayrı satırlarda çizilir; çözüm satırına yalnız ikisinin üst üste geldiği kısım geçer (kesişim, ∩). Dolu uç dahil, boş uç hariçtir. Bölgeler hiç örtüşmüyorsa sonuç boş kümedir.",
  alt: "Üç sayı doğrusu: ilk iki satırda koşulların ışınları, üçüncü satırda ortak bölge ya da boş satır.",
  steps: ["x > 1 ve x ≤ 4", "x ≤ −2 ve x > 3"],
  draw: (_, step) => ({ els: rays(AND[step].conds, AND[step].res, "ve"), readout: AND[step].lines }),
};
const OR: typeof AND = [
  { conds: [{ at: -2, dir: -1, closed: true, label: "x ≤ −2" }, { at: 3, dir: 1, closed: false, label: "x > 3" }], res: [[-99, -2, false, true], [3, 99, false, false]], lines: ["Birleşim (−∞, −2] ∪ (3, ∞): −2 içeride, 3 dışarıda.", "0 iki koşulu da sağlamaz; ışınların arasındaki boşlukta kalır."] },
  { conds: [{ at: 3, dir: -1, closed: true, label: "x ≤ 3" }, { at: 1, dir: 1, closed: false, label: "x > 1" }], res: [[-99, 99, false, false]], lines: ["Işınlar örtüşür ve bütün doğruyu kaplar: ÇK = ℝ.", "Örtüşen değerler birleşimde bir kez sayılır."] },
];
const orFig: FigureDef = {
  caption:
    "“Veya” bağlacında bir değerin koşullardan en az birini sağlaması yeter; çözüm satırı iki ışının birleşimidir (∪). Birleşim iki ayrı parça bırakabilir ya da ışınlar örtüşüyorsa bütün sayı doğrusunu kaplayabilir. Dolu uç dahil, boş uç hariçtir.",
  alt: "Üç sayı doğrusu: ilk iki satırda koşulların ışınları, üçüncü satırda birleşim.",
  steps: ["x ≤ −2 veya x > 3", "x ≤ 3 veya x > 1"],
  draw: (_, step) => ({ els: rays(OR[step].conds, OR[step].res, "veya"), readout: OR[step].lines }),
};

const BUDGET_STEPS = ["en çok 880 TL (≤)", "880 TL’den az (<)"];
const budget: FigureDef = {
  caption:
    "Kurs gideri 240 + 80n TL (sabit ücret n = 0’da da ödenir). Sütunlar n = 0’dan 10’a gideri gösterir; kesik çizgi 880 TL bütçedir (ölçekli). “En çok 880” (≤) n ≤ 8 verir; “880’den az” (<) denince tam 880 TL tutan 8. ders dışarıda kalır ve en fazla 7 ders olur.",
  alt: "On bir sütun: ders sayısına göre toplam gider; bütçe çizgisi; bütçeye uyan sütunlar dolu, uymayanlar boş çerçeve.",
  steps: BUDGET_STEPS,
  draw: (_, step) => {
    const k = 0.0042;
    const w = 0.85;
    const els: El[] = [seg(v(-0.2, 0), v(11 * w, 0), { tone: "ink", thin: true })];
    let best = 0;
    for (let n = 0; n <= 10; n++) {
      const c = 240 + 80 * n;
      const ok = step === 0 ? c <= 880 : c < 880;
      if (ok) best = n;
      els.push(rect(n * w + 0.12, 0, w - 0.24, c * k, ok ? "a" : "muted", ok));
      els.push(txt(v(n * w + w / 2, -0.12), String(n), "s", { tone: "muted", small: true, soft: true }));
    }
    els.push(seg(v(-0.2, 880 * k), v(11 * w, 880 * k), { tone: "warn", dash: true, thin: true }), txt(v(11 * w + 0.1, 880 * k), "880 TL", "e", { tone: "warn", small: true, bold: true }));
    els.push(txt(v(11 * w + 0.1, 0), "n", "e", { tone: "muted", small: true }));
    els.push(...pad(-0.4, 1040 * k + 0.4, 11 * w + 2.2, -0.7));
    return {
      els,
      readout: [`240 + 80n ${step === 0 ? "≤" : "<"} 880 ⇒ 80n ${step === 0 ? "≤" : "<"} 640 ⇒ n ${step === 0 ? "≤" : "<"} 8.`, `En fazla ${best} ders: ${best} ders ${240 + 80 * best} TL, ${best + 1} ders ${240 + 80 * (best + 1)} TL.`],
    };
  },
};

const sumDiff: FigureDef = {
  caption:
    "Bağımsız aralıklarda toplam ve fark: 1 < a < 3, 2 ≤ b ≤ 4. Toplamın alt sınırı iki küçük uçtan, üst sınırı iki büyük uçtan gelir; a’nın uçları alınamadığı için sonuç açık aralıktır: 3 < a + b < 7. Farkta b yerine −b aralığı [−4, −2] kullanılır: −3 < a − b < 1. Ölçekli sayı doğruları.",
  alt: "Üst üste sayı doğruları: a’nın açık aralığı, b’nin ya da −b’nin kapalı aralığı ve sonuç aralığı.",
  steps: ["a + b", "a − b"],
  draw: (_, step) => {
    const k = 0.62;
    const rows: [string, number, number, boolean, boolean, Tone][] =
      step === 0
        ? [["a", 1, 3, false, false, "a"], ["b", 2, 4, true, true, "c"], ["a + b", 3, 7, false, false, "warn"]]
        : [["a", 1, 3, false, false, "a"], ["−b", -4, -2, true, true, "c"], ["a − b", -3, 1, false, false, "warn"]];
    const els: El[] = [];
    rows.forEach(([lab, a, b, ca, cb, tone], i) => {
      const y = 2.6 - i * 1.3;
      els.push(...numberLine(-5, 8, k, y, []));
      els.push(seg(v(a * k, y), v(b * k, y), { tone, bold: true }), pt(v(a * k, y), undefined, "n", tone, !ca), pt(v(b * k, y), undefined, "n", tone, !cb));
      els.push(txt(v(a * k, y - 0.15), zs(a), "s", { tone: "ink", small: true }), txt(v(b * k, y - 0.15), zs(b), "s", { tone: "ink", small: true }));
      els.push(txt(v(-5.6 * k, y), lab, "w", { tone, small: true, bold: true }));
    });
    els.push(...pad(-8 * k, 3.2, 8.6 * k, -0.6));
    return {
      els,
      readout: step === 0 ? ["Alt: 1 + 2 = 3, üst: 3 + 4 = 7; a’nın uçları alınmaz.", "3 < a + b < 7."] : ["Alt: 1 − 4 = −3 (a küçük, b büyük), üst: 3 − 2 = 1.", "−3 < a − b < 1."],
    };
  },
};

const CORNERS: { a: [number, number, boolean]; b: [number, number, boolean]; lines: string[] }[] = [
  { a: [1, 3, false], b: [2, 4, true], lines: ["Köşe çarpımları 2, 6, 4, 12: sınırlar 2 ve 12.", "a’nın uçları alınamaz; 2 < ab < 12."] },
  { a: [-2, 3, true], b: [1, 4, true], lines: ["Köşe çarpımları −2, 3, −8, 12: ab ∈ [−8, 12].", "Uçlar b = 4 ile a = −2 ve a = 3 seçilerek alınır."] },
];
const corners: FigureDef = {
  caption:
    "Çarpımın sınırları izinli (a, b) dikdörtgeninin köşelerinden gelir: bir çarpan sabitken çarpım ötekinin doğrusal ifadesidir. İşaret değişebiliyorsa dört köşenin hepsi hesaplanır. Kesik kenar o ucun alınmadığını gösterir; uç dahil mi diye o sonucu veren izinli bir çift aranır.",
  alt: "a–b düzleminde izinli bölge dikdörtgeni; dört köşesinde a·b çarpımı yazılı; dahil olmayan kenarlar kesik çizgi.",
  steps: ["1 < a < 3, 2 ≤ b ≤ 4", "−2 ≤ a ≤ 3, 1 ≤ b ≤ 4"],
  draw: (_, step) => {
    const k = 0.95;
    const c = CORNERS[step];
    const [a0, a1, ca] = c.a;
    const [b0, b1] = c.b;
    const els: El[] = [vec(v(-3 * k, 0), v(4.3 * k, 0), { tone: "ink", thin: true }), vec(v(0, -0.3), v(0, 5.0 * k), { tone: "ink", thin: true })];
    els.push(txt(v(4.3 * k, 0), "a", "se", { tone: "ink", small: true }), txt(v(0, 5 * k), "b", "ne", { tone: "ink", small: true }));
    els.push(rect(a0 * k, b0 * k, (a1 - a0) * k, (b1 - b0) * k, "a"));
    els.push(seg(v(a0 * k, b0 * k), v(a0 * k, b1 * k), { tone: "a", dash: !ca }), seg(v(a1 * k, b0 * k), v(a1 * k, b1 * k), { tone: "a", dash: !ca }));
    for (const [x, y, at] of [[a0, b0, "sw"], [a1, b0, "se"], [a0, b1, "nw"], [a1, b1, "ne"]] as [number, number, "sw" | "se" | "nw" | "ne"][])
      els.push(pt(v(x * k, y * k), `${zs(x)} · ${y} = ${zs(x * y)}`, at, "warn", !ca));
    els.push(...pad(-3.6 * k, 5.4 * k, 4.6 * k, -0.6));
    return { els, readout: c.lines };
  },
};

export const mathFigures062TytAlgebra: Record<string, Record<string, FigureDef>> = {
  "tyt-mat-dogrusal-denklemler-kaynak-036": {
    "Katsayı sıfır olduğunda tür değişir": typeGraph,
    "İki grubun toplamını tek bilinmeyenle koru": tickets,
    "Sabit artışta geçiş sayısı n−1": arith,
    "Bir doğruyu iki noktadan çiz": twoPoints,
    "Denklem sistemi hangi çözüm türünü veriyor?": systems,
  },
  "tyt-mat-basit-esitsizlikler-kaynak-037": {
    "Negatif çarpan sayı doğrusunda yansıtır": reflect,
    "Sabit pozitif paydada üç taraf birlikte değişir": threeSides,
    "Ve: ortak bölgeyi al": andFig,
    "Veya: en az bir koşul yeter": orFig,
    "Sabit ücret ve ders başı ücret": budget,
    "Bağımsız aralıklarda toplam ve fark": sumDiff,
    "Çarpımda işaret ve uç kabulü": corners,
  },
};
