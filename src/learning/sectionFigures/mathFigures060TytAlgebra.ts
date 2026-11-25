import { poly, pt, seg, txt, v, vec, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { cell, nf, numberLine, pad, rect, zs } from "./mathFigures060TytKit";

/*
 * TYT Matematik (Forge060) · çarpanlara ayırma, bilimsel gösterim, kartezyen
 * çarpım ve mantık. Örnekler rehber bölümlerinden: x² + 6x + 9, a² − b²,
 * x² − x − 12, 6x² + x − 2, 720000 ve 0,000072, 3,2·10⁵ + 7·10⁴,
 * (6·10⁻³)(4·10⁵), A = {1, 2} × B = {3, 4, 5}, doğruluk tabloları.
 */

/* ===================== Çarpanlara ayırma ===================== */

const perfectSquare: FigureDef = {
  caption:
    "(x + 3)² alan modeli (x > 0 için; ölçek sürgüye göre yeniden ayarlanır). Kenarı x + 3 olan kare dört parçaya ayrılır: x², iki tane 3x ve 9. Orta terim iki ayrı dikdörtgenden geldiği için 2·x·3 = 6x’tir: x² + 6x + 9 = (x + 3)². x² + 9 tek başına tam kare değildir; 6x eksiktir.",
  alt: "Büyük kare; sol altta x kenarlı kare, sağında ve üstünde 3 genişlikte iki dikdörtgen, sağ üst köşede 3’e 3’lük küçük kare. Kenarlarda x ve 3 uzunlukları.",
  param: { label: "x", min: 1, max: 6, step: 1, init: 4 },
  draw: (x) => {
    const u = 5.4 / (x + 3), X = x * u, T = 3 * u;
    const els: El[] = [rect(0, 0, X, X, "a"), rect(X, 0, T, X, "c"), rect(0, X, X, T, "c"), rect(X, X, T, T, "b")];
    els.push(txt(v(X / 2, X / 2), "x²", "c", { tone: "ink", bold: true }), txt(v(X + T / 2, X / 2), "3x", "c", { tone: "ink", bold: true }), txt(v(X / 2, X + T / 2), "3x", "c", { tone: "ink", bold: true }), txt(v(X + T / 2, X + T / 2), "9", "c", { tone: "ink", bold: true }));
    els.push(txt(v(X / 2, -0.2), "x", "s", { tone: "muted", small: true }), txt(v(X + T / 2, -0.2), "3", "s", { tone: "muted", small: true }), txt(v(-0.2, X / 2), "x", "w", { tone: "muted", small: true }), txt(v(-0.2, X + T / 2), "3", "w", { tone: "muted", small: true }));
    els.push(...pad(-1.0, 5.8, 6.2, -1.0));
    const s = (x + 3) ** 2;
    return { els, readout: [`x = ${x}: (${x} + 3)² = ${s}.`, `x² + 6x + 9 = ${x * x} + ${6 * x} + 9 = ${s}.`] };
  },
};

const DIFF_STEPS = ["a² − b²", "Şeridi kes ve taşı", "(a − b)(a + b)"];
const diffSquares: FigureDef = {
  caption:
    "a² − b² geometri modeli (a = 5, a > b > 0; sürgü b’yi değiştirir). a kenarlı kareden b kenarlı köşe çıkarılır; kalan L biçimindeki alan iki şeride ayrılıp yan yana konunca kenarları a − b ve a + b olan dikdörtgen olur. Cebirsel özdeşlik bütün gerçek a, b için geçerlidir; model yalnız a > b > 0 içindir.",
  alt: "Solda köşesinden küçük kare çıkarılmış büyük kare; sonraki adımlarda üst şerit kesilip sağ yana taşınıyor ve uzun dikdörtgen oluşuyor.",
  param: { label: "b", min: 1, max: 4, step: 1, init: 2 },
  steps: DIFF_STEPS,
  draw: (b, step) => {
    const a = 5, u = 0.75, A = a * u, B = b * u, D = (a - b) * u;
    const els: El[] = [];
    if (step === 0) {
      els.push(rect(0, 0, A, A, "a"), rect(D, D, B, B, "muted", false), txt(v(D + B / 2, D + B / 2), "b²", "c", { tone: "muted", bold: true }));
      els.push(txt(v(D / 2, D / 2), "a² − b²", "c", { tone: "ink", bold: true, small: true }));
      els.push(txt(v(A / 2, -0.2), "a = 5", "s", { tone: "muted", small: true }));
    } else {
      // Alt şerit: a × (a − b); üst sol şerit: (a − b) × b, taşınınca sağa yatar.
      els.push(rect(0, 0, A, D, "a"), txt(v(A / 2, D / 2), "a(a − b)", "c", { tone: "ink", bold: true, small: true }));
      if (step === 1) els.push(rect(0, D, D, B, "c"), txt(v(D / 2, D + B / 2), "b(a − b)", "c", { tone: "ink", bold: true, small: true }), vec(v(D + 0.2, D + B / 2), v(A + 0.8, D / 2 + 0.3), { tone: "muted", dash: true }));
      else els.push(rect(A, 0, B, D, "c"), txt(v(A + B / 2, D / 2), "b", "c", { tone: "ink", bold: true, small: true }));
      if (step === 2) els.push(txt(v((A + B) / 2, -0.2), "a + b", "s", { tone: "muted", small: true }), txt(v(-0.2, D / 2), "a − b", "w", { tone: "muted", small: true }));
    }
    els.push(...pad(-1.6, a * u + 0.4, (a + 4) * u + 0.4, -0.9));
    return { els, readout: [`a² − b² = 25 − ${b * b} = ${25 - b * b}.`, `(a − b)(a + b) = ${a - b}·${a + b} = ${(a - b) * (a + b)}.`] };
  },
};

const PAIRS: [number, number][] = [[1, -12], [-1, 12], [2, -6], [-2, 6], [3, -4], [-3, 4]];
const sumProduct: FigureDef = {
  caption:
    "Çarpımı −12 olan tam sayı çarpan çiftleri sırasız olarak birer kez gösterilir. Çarpım negatif olduğu için işaretler zıttır. Toplamın −1 olması, mutlak değeri büyük olan çarpanın negatif olduğunu gösterir. Toplamı −1 olan çarpanlar 3 ve −4’tür. Kontrol için (x − 4)(x + 3) çarpımını aç.",
  alt: "p, q ve p + q sütunları. Altı satırda çarpımı −12 olan sırasız çarpan çiftleri var. Toplamı −1 olan satır vurgulu.",
  draw: () => {
    const els: El[] = [];
    const w = 1.6, h = 0.62;
    [["p", 0], ["q", 1], ["p + q", 2]].forEach(([s, i]) => els.push(...cell(Number(i) * w, PAIRS.length * h, w, h, String(s), "muted")));
    PAIRS.forEach(([p, q], r) => {
      const hit = p + q === -1, y = (PAIRS.length - 1 - r) * h, tone: Tone = hit ? "a" : "muted";
      [zs(p), zs(q), zs(p + q)].forEach((s, i) => els.push(...cell(i * w, y, w, h, s, tone, { fill: hit })));
    });
    els.push(txt(v(3 * w + 0.3, (PAIRS.length - 5 + 0.5) * h), "toplam −1", "e", { tone: "a", small: true, bold: true }));
    els.push(...pad(-0.3, (PAIRS.length + 1) * h + 0.3, 7.4, -0.3));
    return { els, readout: ["pq = −12 ve p + q = −1 koşullarını 3 ve −4 sağlar.", "x² − x − 12 = (x − 4)(x + 3). Açılımla denetle."] };
  },
};

const CROSS_STEPS = ["(3x − 2)(2x + 1)", "(3x + 2)(2x − 1)"];
const crossTerms: FigureDef = {
  caption:
    "6x² + x − 2 için çapraz denetim. Uç çarpımlar (3x·2x = 6x², sabitlerin çarpımı −2) iki adayda da doğrudur; karar orta terimde verilir. (3x − 2)(2x + 1) çapraz toplamı 3x − 4x = −x verir, yanlış. (3x + 2)(2x − 1): −3x + 4x = x, doğru.",
  alt: "Sol sütunda 3x ve 2x, sağ sütunda iki sabit; çaprazlama çizgileri ve sağda çapraz çarpımlar ile toplamları.",
  steps: CROSS_STEPS,
  draw: (_, step) => {
    const [m, n] = step === 0 ? [-2, 1] : [2, -1];
    const els: El[] = [];
    els.push(...cell(0, 1.6, 1.4, 0.8, "3x", "a", { small: false }), ...cell(0, 0, 1.4, 0.8, "2x", "a", { small: false }));
    els.push(...cell(3.2, 1.6, 1.4, 0.8, zs(m), "c", { small: false }), ...cell(3.2, 0, 1.4, 0.8, zs(n), "c", { small: false }));
    els.push(seg(v(1.5, 1.9), v(3.1, 0.5), { tone: "muted" }), seg(v(1.5, 0.5), v(3.1, 1.9), { tone: "muted" }));
    const t1 = 3 * n, t2 = 2 * m, sum = t1 + t2;
    els.push(txt(v(5.0, 2.0), `3x·(${zs(n)}) = ${zs(t1)}x`, "e", { tone: "ink", small: true }), txt(v(5.0, 1.2), `2x·(${zs(m)}) = ${zs(t2)}x`, "e", { tone: "ink", small: true }));
    els.push(txt(v(5.0, 0.4), `toplam: ${sum === 1 ? "x" : sum === -1 ? "−x" : `${zs(sum)}x`}`, "e", { tone: sum === 1 ? "a" : "warn", small: true, bold: true }));
    els.push(...pad(-0.3, 2.8, 10.4, -0.3));
    return { els, readout: [`Uçlar: 6x² ve (${zs(m)})(${zs(n)}) = −2.`, sum === 1 ? "Orta terim x: 6x² + x − 2 = (3x + 2)(2x − 1)." : "Orta terim −x: bu aday 6x² − x − 2’yi verir, yanlış."] };
  },
};

/* ===================== Bilimsel gösterim ===================== */

const SCI_STEPS = ["720000", "0,000072"];
const commaHops: FigureDef = {
  caption:
    "Virgülün yeri ile üs birlikte hareket eder. 720000’de virgül son sıfırın sağından başlar ve 7 ile 2 arasına beş basamak sola gider: 7,2·10⁵. 0,000072’de virgül 7 ile 2 arasına beş basamak sağa gider: 7,2·10⁻⁵. Her yay bir basamak hareketidir.",
  alt: "Rakam kutuları; kutuların arasındaki boşluklardan başlayan beş yay virgülün yeni yerine iner; başlangıç ve bitiş konumları işaretli.",
  steps: SCI_STEPS,
  draw: (_, step) => {
    const digits = step === 0 ? ["7", "2", "0", "0", "0", "0"] : ["0", "0", "0", "0", "0", "7", "2"];
    const w = 1.0, els: El[] = [];
    digits.forEach((d, i) => els.push(...cell(i * w, 0, 0.8, 0.8, d, d === "0" ? "muted" : "a", { fill: d !== "0", small: false })));
    const gap = (i: number) => i * w - 0.1; // i. kutunun solundaki boşluk
    const from = step === 0 ? digits.length : 1, to = step === 0 ? 1 : 6;
    const dir = Math.sign(to - from);
    for (let g = from; g !== to; g += dir) {
      const x0 = gap(g), x1 = gap(g + dir), ps: V[] = [];
      for (let t = 0; t <= 8; t++) ps.push(v(x0 + ((x1 - x0) * t) / 8, 0.95 + 0.45 * Math.sin((Math.PI * t) / 8)));
      els.push(poly(ps, { open: true, tone: "c", thin: true }));
    }
    els.push(pt(v(gap(from), 0.9), "başlangıç", "n", "muted"), pt(v(gap(to), -0.1), "yeni virgül", "s", "warn"));
    els.push(...pad(-1.0, 2.2, digits.length * w + 0.4, -1.0));
    return { els, readout: step === 0 ? ["Sola 5 basamak: 720000 = 7,2·10⁵.", "Ters yönde 10⁵ virgülü 5 basamak sağa taşır."] : ["Sağa 5 basamak: 0,000072 = 7,2·10⁻⁵.", "10⁻⁵ = 0,00001; 7,2 katı 0,000072."] };
  },
};

const ADD_STEPS = ["3,2·10⁵ ve 7·10⁴", "7·10⁴ = 0,7·10⁵", "Toplam 3,9·10⁵"];
const commonScale: FigureDef = {
  caption:
    "Toplamada ortak ölçek: çubuklar aynı birimle (1 birim = 10⁵) ölçeklidir. 3,2·10⁵ ile 7·10⁴’ün katsayıları doğrudan toplanmaz; 7·10⁴ = 0,7·10⁵ yazılınca uzunluklar uç uca eklenir: 3,9·10⁵. Küçük üssü ortak almak da aynı sonucu verir: (32 + 7)·10⁴ = 39·10⁴.",
  alt: "10⁵ birimli ölçek çizgisi; 3,2 birimlik ve 0,7 birimlik iki çubuk; son adımda uç uca eklenmiş 3,9 birimlik çubuk.",
  steps: ADD_STEPS,
  draw: (_, step) => {
    const k = 2.2, els: El[] = [];
    els.push(...numberLine(0, 4, k, 0, [0, 1, 2, 3, 4]));
    els.push(txt(v(4 * k + 0.5, 0), "×10⁵", "e", { tone: "muted", small: true }));
    if (step < 2) {
      els.push(rect(0, 0.9, 3.2 * k, 0.6, "a"), txt(v(3.2 * k + 0.15, 1.2), "3,2·10⁵", "e", { tone: "a", small: true, bold: true }));
      els.push(rect(0, 0.3, 0.7 * k, 0.4, "c"), txt(v(0.7 * k + 0.15, 0.5), step === 0 ? "7·10⁴" : "0,7·10⁵", "e", { tone: "c", small: true, bold: true }));
    } else {
      els.push(rect(0, 0.6, 3.2 * k, 0.6, "a"), rect(3.2 * k, 0.6, 0.7 * k, 0.6, "c"), txt(v(3.9 * k, 1.4), "3,9·10⁵", "n", { tone: "ink", small: true, bold: true }));
    }
    els.push(...pad(-0.5, 2.1, 4 * k + 1.8, -0.8));
    const lines = [
      ["Üsler farklı: 3,2 + 7 toplanamaz.", "Ölçekler birimler gibi eşit olmalı."],
      ["7·10⁴ = 0,7·10⁵: aynı uzunluk, yeni birim.", "Değer korunur: 70000."],
      ["3,2·10⁵ + 0,7·10⁵ = 3,9·10⁵ = 390000.", "Toplamada üsler toplanmaz."],
    ];
    return { els, readout: lines[step] };
  },
};

const MUL_STEPS = ["Çarpanlar", "Katsayı × katsayı, üs + üs", "Normalleştir"];
const sciMultiply: FigureDef = {
  caption:
    "(6·10⁻³)(4·10⁵) çarpımında katsayı ile ölçek ayrı sütunlarda izlenir: katsayılar çarpılır (6·4 = 24), üsler toplanır (−3 + 5 = 2). Ara sonuç 24·10² geçerlidir ama standart değildir; 24 = 2,4·10 yazılınca 2,4·10³.",
  alt: "İki sütunlu şerit: katsayı ve 10’un üssü; satırlar çarpanlar, ara sonuç ve normalleştirilmiş sonuç.",
  steps: MUL_STEPS,
  draw: (_, step) => {
    const rows: [string, string, Tone][] = [["6", "−3", "muted"], ["4", "5", "muted"], ["24", "2", "c"], ["2,4", "3", "a"]];
    const show = step === 0 ? 2 : step === 1 ? 3 : 4;
    const els: El[] = [...cell(1.8, 4 * 0.8, 1.8, 0.8, "katsayı", "muted"), ...cell(3.6, 4 * 0.8, 1.8, 0.8, "10’un üssü", "muted")];
    rows.slice(0, show).forEach(([c, e, tone], i) => {
      const y = (3 - i) * 0.8;
      els.push(...cell(1.8, y, 1.8, 0.8, c, tone, { fill: tone !== "muted", small: false }), ...cell(3.6, y, 1.8, 0.8, e, tone, { fill: tone !== "muted", small: false }));
    });
    if (show >= 3) els.push(txt(v(1.6, 1.0), "çarp | topla", "w", { tone: "c", small: true }));
    if (show >= 4) els.push(txt(v(1.6, 0.4), "standart", "w", { tone: "a", small: true }));
    els.push(...pad(-1.4, 4.2, 6.0, -0.3));
    const lines = [
      ["6·10⁻³ ve 4·10⁵.", "Katsayı ve üs ayrı izlenir."],
      ["6·4 = 24; −3 + 5 = 2 ⇒ 24·10².", "24 bir hata değil, henüz standart değil."],
      ["24·10² = 2,4·10¹·10² = 2,4·10³.", "Sonuç 2400."],
    ];
    return { els, readout: lines[step] };
  },
};

const UNIT_STEPS = ["Uzunluk", "Alan", "Hacim"];
const unitPowers: FigureDef = {
  caption:
    "Birim değişimi 10’un kuvvetidir: 1 m = 10³ mm. Alan iki uzunluk çarpımı olduğundan 1 m² = (10³)² = 10⁶ mm², hacim üç uzunluk çarpımı olduğundan 1 m³ = 10⁹ mm³ (çizim ölçekli değil). 3,2·10⁶ mm = 3,2·10³ m: sayı değişti, uzunluk aynı kaldı.",
  alt: "Adım adım bir doğru parçası, bir kare ve eğik izdüşümle çizilmiş bir küp; her kenarda 10³ mm etiketi ve yanında dönüşüm çarpanı.",
  steps: UNIT_STEPS,
  draw: (_, step) => {
    const s = 3, els: El[] = [];
    if (step === 0) els.push(seg(v(0, 0), v(s, 0), { tone: "a", bold: true }), seg(v(0, -0.12), v(0, 0.12), { tone: "a" }), seg(v(s, -0.12), v(s, 0.12), { tone: "a" }));
    else els.push(rect(0, 0, s, s, step === 1 ? "a" : "muted", step === 1));
    if (step === 2) {
      const d = v(1.1, 0.8);
      els.push(poly([v(0, s), v(d[0], s + d[1]), v(s + d[0], s + d[1]), v(s, s)], { tone: "a", fill: "a", thin: true }), poly([v(s, 0), v(s + d[0], d[1]), v(s + d[0], s + d[1]), v(s, s)], { tone: "a", fill: "a", thin: true }), rect(0, 0, s, s, "a"));
    }
    els.push(txt(v(s / 2, -0.25), "10³ mm", "s", { tone: "ink", small: true, bold: true }));
    const label = ["1 m = 10³ mm", "1 m² = 10⁶ mm²", "1 m³ = 10⁹ mm³"][step];
    els.push(txt(v(s + 1.6, 1.4), label, "e", { tone: "a", bold: true }));
    els.push(...pad(-0.4, 4.2, 10.0, -1.0));
    const lines = [
      ["mm → m: 10³’e böl. 3,2·10⁶ mm = 3,2·10³ m.", "Birim büyüdü, uzunluk değişmedi."],
      ["Alan: uzunluk çarpanının karesi, 10⁶.", "Hızda pay ve payda ayrı dönüştürülür."],
      ["Hacim: uzunluk çarpanının küpü, 10⁹.", "Dönüşümden önce iki sayıyı oranlama."],
    ];
    return { els, readout: lines[step] };
  },
};

/* ===================== Kartezyen çarpım ===================== */

const MATCH_STEPS = ["1 ile eşleşenler", "2 ile eşleşenler"];
const matching: FigureDef = {
  caption:
    "A = {1, 2}, B = {3, 4, 5} için A × B: her ilk seçim her ikinci seçimle eşleşir. 1 için üç, 2 için üç çift vardır; s(A × B) = 2·3 = 6. Her A elemanını yalnız bir B elemanıyla eşlemek çarpımın tamamını oluşturmaz.",
  alt: "Solda A’nın elemanları 1 ve 2, sağda B’nin elemanları 3, 4, 5; adım adım her A elemanından bütün B elemanlarına çizgiler.",
  steps: MATCH_STEPS,
  draw: (_, step) => {
    const els: El[] = [];
    const A = [1, 2], B = [3, 4, 5];
    const ya = (i: number) => 2.4 - i * 1.6, yb = (j: number) => 3.2 - j * 1.6;
    A.forEach((a, i) => {
      if (i <= step) B.forEach((_, j) => els.push(seg(v(0.5, ya(i)), v(4.5, yb(j)), { tone: i === 0 ? "a" : "c" })));
    });
    A.forEach((a, i) => els.push(...cell(-0.5, ya(i) - 0.4, 1.0, 0.8, String(a), i === 0 ? "a" : "c", { small: false })));
    B.forEach((b, j) => els.push(...cell(4.5, yb(j) - 0.4, 1.0, 0.8, String(b), "muted", { small: false })));
    els.push(txt(v(0, 3.4), "A", "n", { tone: "ink", bold: true }), txt(v(5, 4.0), "B", "n", { tone: "ink", bold: true }));
    els.push(...pad(-0.8, 4.7, 6.0, -0.8));
    const pairs = A.slice(0, step + 1).flatMap((a) => B.map((b) => `(${a}, ${b})`));
    return { els, readout: [pairs.join(", ") + ".", `${pairs.length} çift; s(A × B) = 2·3 = 6.`] };
  },
};

const GRID_STEPS = ["A × B", "B × A"];
const coordPoints: FigureDef = {
  caption:
    "A = {1, 2}, B = {3, 5} için A × B grafiği dört ayrık noktadır; dikdörtgenin içi boyanmaz. (1, 4) arada görünse bile 4 ∉ B olduğundan elemanı değildir (boş daire). B × A’ya geçince noktalar y = x doğrusuna göre yer değiştirir.",
  alt: "Koordinat düzleminde dört dolu nokta; (1, 4) konumunda boş daire; ikinci adımda noktaların y = x kesikli doğrusuna göre yansımaları.",
  steps: GRID_STEPS,
  draw: (_, step) => {
    const k = 0.8, els: El[] = [vec(v(0, 0), v(6.3 * k, 0), { tone: "ink", thin: true }), vec(v(0, 0), v(0, 6.3 * k), { tone: "ink", thin: true })];
    for (let i = 1; i <= 5; i++) els.push(seg(v(i * k, -0.07), v(i * k, 0.07), { tone: "muted", thin: true }), txt(v(i * k, -0.12), String(i), "s", { tone: "muted", small: true, soft: true }), seg(v(-0.07, i * k), v(0.07, i * k), { tone: "muted", thin: true }), txt(v(-0.12, i * k), String(i), "w", { tone: "muted", small: true, soft: true }));
    const pts: [number, number][] = [[1, 3], [1, 5], [2, 3], [2, 5]];
    if (step === 1) els.push(seg(v(0, 0), v(5.8 * k, 5.8 * k), { tone: "muted", dash: true, thin: true }), txt(v(5.8 * k, 5.8 * k), "y = x", "ne", { tone: "muted", small: true }));
    for (const [a, b] of pts) {
      const [x, y] = step === 0 ? [a, b] : [b, a];
      els.push(pt(v(x * k, y * k), undefined, "n", step === 0 ? "a" : "c"));
    }
    if (step === 0) els.push(pt(v(1 * k, 4 * k), "(1, 4) yok", "e", "warn", true));
    els.push(txt(v(6.3 * k, 0), step === 0 ? "A" : "B", "se", { tone: "ink", small: true }), txt(v(0, 6.3 * k), step === 0 ? "B" : "A", "n", { tone: "ink", small: true }));
    els.push(...pad(-0.9, 6.3 * k + 0.6, 7.2, -0.9));
    return { els, readout: step === 0 ? ["A × B = {(1, 3), (1, 5), (2, 3), (2, 5)}.", "(1, 4): 4 ∉ B, eleman değil."] : ["B × A = {(3, 1), (5, 1), (3, 2), (5, 2)}.", "A ≠ B olduğu için A × B ≠ B × A."] };
  },
};

const DIST_STEPS = ["A × B", "A × C", "A × (B ∪ C)"];
const distribute: FigureDef = {
  caption:
    "A = {1, 2}, B = {3, 4}, C = {4, 5} için A × (B ∪ C) = (A × B) ∪ (A × C). Sütunlar ikinci bileşenler, satırlar ilk bileşenlerdir. 4 sütunu hem B’de hem C’de olduğundan birleşimde bir kez sayılır: 4 + 4 − 2 = 6 çift, B ∪ C’nin 3 elemanı × 2.",
  alt: "İki satır (1 ve 2) ve üç sütundan (3, 4, 5) oluşan ızgara; B’nin sütunları bir renkte, C’nin sütunları başka renkte; 4 sütunu iki renkle çerçeveli.",
  steps: DIST_STEPS,
  draw: (_, step) => {
    const els: El[] = [], w = 1.6, h = 1.0;
    const inB = (c: number) => c === 3 || c === 4, inC = (c: number) => c === 4 || c === 5;
    [3, 4, 5].forEach((c, j) => {
      els.push(txt(v(1.4 + j * w + w / 2, 2 * h + 0.25), String(c), "n", { tone: "ink", bold: true }));
      [1, 2].forEach((a, i) => {
        const on = step === 0 ? inB(c) : step === 1 ? inC(c) : inB(c) || inC(c);
        const tone: Tone = !on ? "muted" : step === 2 && inB(c) && inC(c) ? "b" : step === 0 || (step === 2 && inB(c)) ? "a" : "c";
        els.push(...cell(1.4 + j * w, (1 - i) * h, w, h, `(${a}, ${c})`, tone, { fill: on }));
      });
    });
    [1, 2].forEach((a, i) => els.push(txt(v(1.2, (1 - i) * h + h / 2), String(a), "w", { tone: "ink", bold: true })));
    els.push(...pad(0.2, 2 * h + 0.9, 6.8, -0.3));
    const lines = [
      ["A × B: 2·2 = 4 çift.", "İlk bileşen A’dan, ikinci B’den."],
      ["A × C: 2·2 = 4 çift.", "(1, 4) ve (2, 4) ikisinde de var."],
      ["Birleşim: 4 + 4 − 2 = 6 = 2·3.", "4 + 4 = 8 ortak çiftleri iki kez sayar."],
    ];
    return { els, readout: lines[step] };
  },
};

const allowed: FigureDef = {
  caption:
    "A = {0, 1}, B = {1, 2} için A × B’nin dört çifti vardır. Birinci bileşeni ikinciden küçük olma koşulu her çifte tek tek uygulanır: (0, 1), (0, 2), (1, 2) izinli, (1, 1) değil. Cevap 3’tür; ürün sayısı 4’ü cevap yapmak koşulu unutmaktır.",
  alt: "İki satır (0 ve 1) ve iki sütundan (1 ve 2) oluşan ızgara; a < b koşulunu sağlayan üç hücre vurgulu, (1, 1) soluk ve ‘koşul yok’ notlu.",
  draw: () => {
    const els: El[] = [], w = 2.4, h = 1.1;
    [1, 2].forEach((b, j) => {
      els.push(txt(v(1.6 + j * w + w / 2, 2 * h + 0.25), String(b), "n", { tone: "ink", bold: true }));
      [0, 1].forEach((a, i) => {
        const ok = a < b;
        els.push(...cell(1.6 + j * w, (1 - i) * h, w, h, ok ? `(${a}, ${b})` : `(${a}, ${b}) yok`, ok ? "a" : "muted", { fill: ok, ink: ok ? "ink" : "muted" }));
      });
    });
    [0, 1].forEach((a, i) => els.push(txt(v(1.4, (1 - i) * h + h / 2), String(a), "w", { tone: "ink", bold: true })));
    els.push(txt(v(1.6 + 2 * w + 0.3, h), "a < b", "e", { tone: "a", bold: true }));
    els.push(...pad(0.4, 2 * h + 0.9, 8.6, -0.3));
    return { els, readout: ["Ürün: 2·2 = 4 çift; a < b olan 3 çift.", "Koşul bütün çiftlere ayrı ayrı uygulanır."] };
  },
};

/* ===================== Mantık ===================== */

const ROWS: [number, number][] = [[1, 1], [1, 0], [0, 1], [0, 0]];
function truthTable(heads: string[], cols: ((p: number, q: number) => number)[], tones: (r: number, c: number, val: number) => Tone | undefined, w = 1.5): El[] {
  const els: El[] = [], h = 0.72;
  heads.forEach((s, i) => els.push(...cell(i * w, 4 * h, w, h, s, "muted")));
  ROWS.forEach(([p, q], r) => {
    const vals = [p, q, ...cols.map((f) => f(p, q))];
    vals.forEach((val, c) => {
      const tone = c < 2 ? undefined : tones(r, c, val);
      els.push(...cell(c * w, (3 - r) * h, w, h, String(val), tone ?? "muted", { fill: tone !== undefined, small: false }));
    });
  });
  return els;
}

const connectives: FigureDef = {
  caption:
    "Ve (∧), veya (∨) ve ya da (⊻) için doğruluk tablosu; 1 doğru, 0 yanlış. p ∧ q yalnız ikisi doğruyken 1; p ∨ q en az biri doğruyken 1 (ikisi birlikte de dahil); p ⊻ q yalnız biri doğruyken 1. İki doğru verildiğinde veya 1, ya da 0 üretir.",
  alt: "Beş sütunlu tablo: p, q, p ∧ q, p ∨ q, p ⊻ q; dört satır; değeri 1 olan sonuç hücreleri renkli.",
  draw: () => {
    const els = truthTable(["p", "q", "p ∧ q", "p ∨ q", "p ⊻ q"], [(p, q) => p & q, (p, q) => p | q, (p, q) => p ^ q], (_r, c, val) => (val ? (["a", "c", "b"] as Tone[])[c - 2] : undefined));
    els.push(...pad(-0.3, 3.9, 7.8, -0.3));
    return { els, readout: ["İlk satır (1, 1): ∧ = 1, ∨ = 1, ⊻ = 0.", "p ∧ p′ daima 0, p ∨ p′ daima 1."] };
  },
};

const DM_STEPS = ["(p ∧ q)′ = p′ ∨ q′", "(p ∨ q)′ = p′ ∧ q′"];
const deMorgan: FigureDef = {
  caption:
    "De Morgan, Venn biçiminde: boyalı kareler ifadenin doğru olduğu durumlardır. İkisinin birlikte doğru olmaması, en az birinin yanlış olmasıdır: (p ∧ q)′ = p′ ∨ q′. En az birinin doğru olmaması, ikisinin de yanlış olmasıdır: (p ∨ q)′ = p′ ∧ q′.",
  alt: "Dikdörtgen içinde kesişen iki daire, p ve q; dikdörtgen küçük karelerle dolu, ifadenin doğru olduğu bölgedeki kareler renkli.",
  steps: DM_STEPS,
  draw: (_, step) => {
    const els: El[] = [], s = 0.36, cp = v(2.6, 2.0), cq = v(4.4, 2.0), r = 1.55;
    for (let i = 0; i < 20; i++)
      for (let j = 0; j < 11; j++) {
        const c = v(0.2 + i * s + s / 2, 0.1 + j * s + s / 2);
        const inP = Math.hypot(c[0] - cp[0], c[1] - cp[1]) < r, inQ = Math.hypot(c[0] - cq[0], c[1] - cq[1]) < r;
        const on = step === 0 ? !(inP && inQ) : !(inP || inQ);
        if (on) els.push(rect(c[0] - s * 0.38, c[1] - s * 0.38, s * 0.76, s * 0.76, step === 0 ? "a" : "c"));
      }
    for (const c of [cp, cq]) els.push(poly(Array.from({ length: 64 }, (_, i) => v(c[0] + r * Math.cos((i / 64) * 2 * Math.PI), c[1] + r * Math.sin((i / 64) * 2 * Math.PI))), { tone: "ink" }));
    els.push(rect(0.2, 0.1, 20 * s, 11 * s, "ink", false));
    els.push(txt(v(1.2, 4.3), "p", "n", { tone: "ink", bold: true }), txt(v(5.8, 4.3), "q", "n", { tone: "ink", bold: true }));
    els.push(...pad(-0.2, 5.0, 7.8, -0.3));
    return { els, readout: step === 0 ? ["Boyalı: p ile q’nun birlikte doğru olmadığı her yer.", "= p′ ∨ q′ (en az biri yanlış)."] : ["Boyalı: iki dairenin de dışı.", "= p′ ∧ q′ (ikisi de yanlış)."] };
  },
};

const implication: FigureDef = {
  caption:
    "p ⇒ q doğruluk tablosu: yalnız p = 1 ve q = 0 satırında 0 (vurgulu satır); diğer üç durumda 1. Son sütun p′ ∨ q her satırda aynı değeri verir: p ⇒ q ≡ p′ ∨ q. Öncül yanlışken koşul biçimsel olarak doğrudur; bu bir nedensellik iddiası değildir.",
  alt: "Dört sütunlu tablo: p, q, p ⇒ q, p′ ∨ q; ikinci satırda (1, 0) iki sonuç sütununda da 0 ve uyarı rengiyle vurgulu.",
  draw: () => {
    const els = truthTable(["p", "q", "p ⇒ q", "p′ ∨ q"], [(p, q) => (p && !q ? 0 : 1), (p, q) => (!p || q ? 1 : 0)], (_r, _c, val) => (val ? "a" : "warn"), 1.7);
    els.push(txt(v(4 * 1.7 + 0.3, 2 * 0.72 + 0.36), "kural bozulur", "e", { tone: "warn", small: true, bold: true }));
    els.push(...pad(-0.3, 3.9, 10.6, -0.3));
    return { els, readout: ["Tek yanlış satır: doğru öncül, yanlış sonuç.", "p, q için yeterli; q, p için gereklidir."] };
  },
};

const contrapositive: FigureDef = {
  caption:
    "p ⇒ q ile karşıtı (q ⇒ p), tersi (p′ ⇒ q′) ve karşıt tersi (q′ ⇒ p′). p ⇒ q sütunundan farklı çıkan hücreler uyarı rengindedir: karşıt ters her satırda aynıdır (denk); karşıt ile ters (1, 0) ve (0, 1) satırlarında farklıdır.",
  alt: "Altı sütunlu tablo: p, q ve dört koşul sütunu; p ⇒ q ile aynı olan hücreler bir renkte, farklı olanlar uyarı renginde.",
  draw: () => {
    const imp = (a: number, b: number) => (a && !b ? 0 : 1);
    const cols = [(p: number, q: number) => imp(p, q), (p: number, q: number) => imp(q, p), (p: number, q: number) => imp(1 - p, 1 - q), (p: number, q: number) => imp(1 - q, 1 - p)];
    const els = truthTable(["p", "q", "p ⇒ q", "q ⇒ p", "p′ ⇒ q′", "q′ ⇒ p′"], cols, (r, c, val) => {
      const [p, q] = ROWS[r];
      return val === imp(p, q) ? (c === 2 ? "muted" : "a") : "warn";
    }, 1.65);
    els.push(...pad(-0.3, 3.9, 10.2, -0.3));
    return { els, readout: ["q′ ⇒ p′ bütün satırlarda p ⇒ q ile aynı: denk.", "Değil ile ters farklıdır: (p ⇒ q)′ = p ∧ q′."] };
  },
};

const successiveMagnification: FigureDef = {
  caption: "İkinci büyütmeyi değiştir. Kutular işlem sırasını, içlerindeki sayılar her aşamanın uzunluğunu gösterir.",
  alt: "Başlangıç uzunluğundan ilk ve ikinci büyütmeye giden üç kutu. Okların yanındaki çarpanlar her aşamadaki büyütme oranıdır.",
  steps: ["0,0032 mm ve ilk büyütme 5 kat", "0,0125 mm ve ilk büyütme 4 kat"],
  param: { label: "İkinci büyütme", min: 1, max: 40, step: 1, init: 25, unit: " kat" },
  draw: (secondFactor, step) => {
    const firstFactor = step === 0 ? 5 : 4;
    // Integer counts of 0.0001 mm retain the same values across labels and results.
    const initial = step === 0 ? 32 : 125;
    const first = initial * firstFactor;
    const totalFactor = firstFactor * secondFactor;
    const last = initial * totalFactor;
    const inMillimetres = (value: number) =>
      `${(value / 10000).toLocaleString("tr-TR", { maximumFractionDigits: 4 })} mm`;
    const els: El[] = [
      ...cell(0, 4.6, 4.4, 0.9, inMillimetres(initial), "a"),
      ...cell(0, 2.3, 4.4, 0.9, inMillimetres(first), "b"),
      ...cell(0, 0, 4.4, 0.9, inMillimetres(last), "c"),
      vec(v(2.2, 4.45), v(2.2, 3.35), { tone: "ink" }),
      vec(v(2.2, 2.15), v(2.2, 1.05), { tone: "ink" }),
      txt(v(3, 3.9), `×${firstFactor}`, "e", { tone: "ink", small: true }),
      txt(v(3, 1.6), `×${secondFactor}`, "e", { tone: "ink", small: true }),
      ...pad(-0.5, 5.95, 4.9, -0.4),
    ];
    return {
      els,
      readout: [
        `Toplam büyütme ${firstFactor} × ${secondFactor} = ${totalFactor} kat.`,
        `${inMillimetres(initial)} → ${inMillimetres(first)} → ${inMillimetres(last)}`,
      ],
    };
  },
};

const fourthDegreeRoots: FigureDef = {
  caption: "x’i sürgüyle değiştir. Grafiğin yatay ekseni kestiği noktada en az bir çarpan sıfır olur.",
  alt: "Grafik y eksenine göre simetrik. Yatay ekseni eksi iki, eksi bir, bir ve iki noktalarında keser. Sürgü seçilen x için eğrideki noktayı gösterir.",
  param: { label: "x", min: -2.25, max: 2.25, step: 0.25, init: 1 },
  draw: (x) => {
    const f = (t: number) => (t ** 2 - 1) * (t ** 2 - 4);
    const px = (t: number) => 1.58 * t;
    const py = (y: number) => 0.61 * y;
    const point = (t: number, y: number) => v(px(t), py(y));
    const roots = [-2, -1, 1, 2];
    const curve = Array.from({ length: 91 }, (_, index) => {
      const t = -2.25 + index * 0.05;
      return point(t, f(t));
    });
    const els: El[] = [
      vec(point(-2.48, 0), point(2.48, 0), { tone: "ink" }),
      vec(point(0, -2.65), point(0, 5.1), { tone: "ink" }),
      txt(point(2.48, 0), "x", "se", { small: true }),
      txt(point(0, 5.1), "f(x)", "n", { small: true }),
      poly(curve, { tone: "a", bold: true, open: true }),
      ...roots.map((r) => pt(point(r, 0), String(r).replace("-", "−"), "s", "b")),
      seg(point(x, 0), point(x, f(x)), { tone: "muted", dash: true }),
      pt(point(x, f(x)), undefined, "n", "warn"),
    ];
    return {
      els,
      readout: [
        `x = ${nf(x, 2)} için f(x) = ${nf(f(x), 2)}.`,
        "u=x². u²−5u+4=(u−1)(u−4). x²=1 veya x²=4.",
        "Kökler −2, −1, 1, 2. Grafikte dört noktada f(x)=0.",
      ],
    };
  },
};

export const mathFigures060TytAlgebra: Record<string, Record<string, FigureDef>> = {
  "carpanlara-ayirma": {
    "Tam karede uçlar kadar orta terim de önemlidir": perfectSquare,
    "İki kare farkı: toplam ile farkın çarpımı": diffSquares,
    "x²+bx+c için toplam ve çarpımı birlikte ara": sumProduct,
    "Baş katsayı 1 değilse çapraz terimlerin toplamını denetle": crossTerms,
    "x² yerine u yazarak dört kökü bul": fourthDegreeRoots,
  },
  "bilimsel-gosterim-katsayi": {
    "Virgülün yeri ile üs birlikte hareket eder": commaHops,
    "Toplama ve çıkarmada ortak ölçek kur": commonScale,
    "Çarpma ve bölmede katsayı ile ölçeği ayır": sciMultiply,
    "Birim değişimi de 10'un kuvvetidir": unitPowers,
    "Birbirini izleyen büyütmeleri çarp": successiveMagnification,
  },
  "kartezyen-carpim": {
    "Her ilk seçimi her ikinci seçimle eşleştir": matching,
    "Koordinat gösterimi ayrık noktaların kümesidir": coordPoints,
    "Dağılma tanımdaki “ve/veya”dan türetilir": distribute,
    "Bağlamda bütün olasılıklar ile izinli seçimleri ayır": allowed,
  },
  "mantik-onerme": {
    "Ve, veya, ya da üç ayrı seçme kuralıdır": connectives,
    "De Morgan bütün yapının değilini değiştirir": deMorgan,
    "İse yalnız doğru öncül ve yanlış sonuçta yanlıştır": implication,
    "Karşıt ters ilk koşula, karşıt ve ters birbirine denktir": contrapositive,
  },
};
