import { poly, pt, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { cell, interval, nf, numberLine, pad, rect, sup, token, zs } from "./mathFigures060TytKit";

/*
 * TYT Matematik (Forge060) · temel kavramlar, tek–çift ve işaret, asal
 * sayılar, faktöriyel, sayı basamakları, bölme ve bölünebilme. Her figürün
 * sayıları ilgili rehber bölümündeki örnekten gelir (47 = 10·4 + 7,
 * (3x − 6)/(x − 2), 72 = 2³·3², 12! ve 25!, 6206, 38 = 7·5 + 3, −22 = 5·(−5) + 3 …);
 * gösterilen her sonuç sürgü ya da adımdan aynı hesapla üretilir.
 */

/* ===================== Temel kavramlar ===================== */

const placeValue: FigureDef = {
  caption:
    "İki basamaklı ab sayısı 10a + b demektir. Sürgüyle sayıyı değiştir: her onluk çubuk 10 birim, her küçük kare 1 birimdir. 47’de 4’ün sayı değeri 4, basamak değeri 40’tır; a·b çarpımı ise başka bir sayıdır.",
  alt: "Solda a tane uzun onluk çubuk, sağda b tane küçük birlik kare; altlarında onluk ve birlik katkıları yazılı.",
  param: { label: "ab", min: 10, max: 99, step: 1, init: 47 },
  draw: (n) => {
    const a = Math.floor(n / 10), b = n % 10, u = 0.42;
    const els: El[] = [];
    for (let i = 0; i < a; i++) {
      els.push(rect(i * 0.62, 0, u, 10 * u, "a"));
      for (let j = 1; j < 10; j++) els.push(seg(v(i * 0.62, j * u), v(i * 0.62 + u, j * u), { tone: "a", thin: true }));
    }
    const x0 = 6.2;
    for (let j = 0; j < b; j++) els.push(rect(x0 + (j % 3) * 0.55, Math.floor(j / 3) * 0.55, u, u, "c"));
    els.push(txt(v(2.6, -0.3), `${a} onluk = ${a * 10}`, "s", { tone: "a", bold: true }));
    els.push(txt(v(x0 + 0.75, -0.3), `${b} birlik`, "s", { tone: "c", bold: true }));
    els.push(...pad(-0.4, 10 * u + 0.4, 9.2, -1.3));
    return { els, readout: [`${n} = 10·${a} + ${b} = ${a * 10} + ${b}.`, `a·b = ${a}·${b} = ${a * b}: rakamların çarpımı sayının kendisi değildir.`] };
  },
};

const SET_STEPS = ["√36", "12/4", "0,2727…", "√3", "√(−4)"];
const numberSets: FigureDef = {
  caption:
    "ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ içerme şeması (kutu büyüklüğü eleman sayısını göstermez, ölçekli değil). Adım adım her ifadenin önce değerini hesapla, sonra en dar kümesine koy; o kümeyi içeren bütün kümeler de doğrudur. √(−4) gerçek sayı değildir, ℝ’nin dışında kalır.",
  alt: "İç içe dört dikdörtgen: en dışta ℝ, içinde ℚ, onun içinde ℤ, en içte ℕ. Seçilen ifade değeriyle birlikte uygun kutuya yerleştirilir.",
  steps: SET_STEPS,
  draw: (_, step) => {
    const boxes: [string, number, number, number, number, Tone][] = [
      ["ℝ", 0, 0, 12, 7.6, "muted"],
      ["ℚ", 0.5, 0.5, 8.5, 6.0, "b"],
      ["ℤ", 1.0, 1.0, 5.6, 4.4, "c"],
      ["ℕ", 1.5, 1.5, 3.0, 2.8, "a"],
    ];
    const els: El[] = [];
    for (const [s, x, y, w, h, tone] of boxes) els.push(rect(x, y, w, h, tone, false), txt(v(x + 0.15, y + h - 0.12), s, "se", { tone, bold: true }));
    const place: [number, number, string, string][] = [
      [3.0, 2.9, "√36 = 6", "ℕ, ℤ, ℚ ve ℝ: dört kümenin de elemanı."],
      [3.0, 2.9, "12/4 = 3", "Önce böl: 3 doğal sayıdır; ℕ, ℤ, ℚ, ℝ."],
      [7.8, 3.6, "27/99", "0,2727… devirli: 27/99 = 3/11, yani ℚ ve ℝ; tam sayı değil."],
      [10.5, 3.6, "√3", "√3 devirsiz, sonsuz ondalık: yalnız ℝ (irrasyonel)."],
      [13.6, 3.6, "√(−4)", "Gerçek sayılarda tanımsız: hiçbir kutuya girmez."],
    ];
    const [x, y, s, line] = place[step];
    els.push(pt(v(x, y), s, "s", step === 4 ? "warn" : "ink"));
    els.push(...pad(-0.3, 7.9, 15.0, -0.4));
    return { els, readout: [line, "En dar kümeyi bilmek, onu içeren kümeleri dışlamaz."] };
  },
};

const compareOnNumberLine: FigureDef = {
  caption: "A, −3’te sabit. B’yi hareket ettirerek sayıların soldan sağa sırasını ve sıfıra uzaklıklarını karşılaştır.",
  alt: "Sayı doğrusunda A, −3’te sabit. B seçilen sayıda gösteriliyor. İki nokta örtüşürse A = B olarak yazılıyor.",
  param: { label: "B’nin değeri", min: -6, max: 6, step: 1, init: 2 },
  draw: (b) => {
    const a = -3;
    const relation = a < b ? "<" : a > b ? ">" : "=";
    const els = numberLine(-6, 6, 1, 0, [-6, -4, -2, 0, 2, 4, 6]);
    if (a === b) {
      els.push(pt(v(a, 0), "A = B", "n", "a"));
    } else {
      els.push(pt(v(a, 0), "A", "n", "a"), pt(v(b, 0), "B", "n", "c"));
    }
    els.push(...pad(-6.8, 0.9, 6.9, -0.6));
    return {
      els,
      readout: [
        `Sayı sırası: ${zs(a)} ${relation} ${zs(b)}.`,
        `Sıfıra uzaklık: A için ${Math.abs(a)}, B için ${Math.abs(b)} birim.`,
      ],
    };
  },
};

const integerBounds: FigureDef = {
  caption: "−4≤x<2 aralığında sol uç dahil, sağ uç hariç. Çizgi aralıktaki gerçek sayıları, üst noktalar uygun tam sayıları gösterir.",
  alt: "−4’te dolu ve 2’de boş uçlu aralık. −4, −3, −2, −1, 0 ve 1’in üzerinde birer tam sayı işareti var.",
  draw: () => {
    const lower = -4;
    const upper = 2;
    const integers = Array.from({ length: upper - lower }, (_, offset) => lower + offset);
    return {
      els: [
        ...numberLine(-5, 3, 1, 0, [-5, ...integers, upper, 3]),
        ...interval(lower, upper, 1, 0, "a", false, true),
        ...integers.map((n) => pt(v(n, 0.45), undefined, "n", "c")),
        ...pad(-5.6, 0.9, 3.7, -0.6),
      ],
      readout: [`${integers.map(zs).join(", ")} → ${integers.length} tam sayı.`],
    };
  },
};

const ORDER_STEPS = ["24 ÷ 4 × 3", "−5² ile (−5)²", "√(x²), x = −8"];
const orderOps: FigureDef = {
  caption:
    "İşlem önceliği adım şeridi. Aynı öncelikte soldan sağa gidilir: 24 ÷ 4 × 3 = 18; çarpmayı öne almak başka bir ifade (2) hesaplar. Üs yalnız hemen önündeki tabana uygulanır: −5² = −25, (−5)² = 25. Karekök negatif çıkmaz: √(x²) = |x|.",
  alt: "Kutulardan oluşan iki satır; her satırda bir sonraki ara sonuca giden oklar. Üst satır doğru yol, alt satır kıyaslanan farklı ifade.",
  steps: ORDER_STEPS,
  draw: (_, step) => {
    const rows: [string, Tone][][] = [
      [["24 ÷ 4 × 3", "a"], ["6 × 3", "a"], ["18", "a"]],
      [["24 ÷ (4 × 3)", "warn"], ["24 ÷ 12", "warn"], ["2", "warn"]],
    ];
    const rows1: [string, Tone][][] = [
      [["−5²", "a"], ["−(5·5)", "a"], ["−25", "a"]],
      [["(−5)²", "c"], ["(−5)·(−5)", "c"], ["25", "c"]],
    ];
    const rows2: [string, Tone][][] = [
      [["√((−8)²)", "a"], ["√64", "a"], ["8", "a"]],
      [["|−8|", "c"], ["8", "c"]],
    ];
    const use = [rows, rows1, rows2][step];
    const els: El[] = [];
    const w = [3.4, 3.0, 1.6], gap = 0.9;
    use.forEach((row, r) => {
      let x = 0;
      const y = 2.2 - r * 2.2;
      row.forEach(([s, tone], i) => {
        const ww = row.length === 2 && i === 1 ? 1.6 : w[i];
        els.push(...cell(x, y, ww, 1.1, s, tone, { small: false }));
        if (i < row.length - 1) els.push(vec(v(x + ww + 0.1, y + 0.55), v(x + ww + gap - 0.1, y + 0.55), { tone: "muted" }));
        x += ww + gap;
      });
    });
    els.push(...pad(-0.3, 3.7, 10.2, -0.4));
    const lines = [
      ["Soldan sağa: 24 ÷ 4 = 6, sonra 6 × 3 = 18.", "Alt satır başka bir ifade: 24 ÷ 12 = 2."],
      ["−5²’de üs yalnız 5’e uygulanır: −25.", "(−5)²’de taban −5’tir: 25."],
      ["x = −8 için √(x²) = √64 = 8; sonuç −8 değil.", "Genel olarak √(x²) = |x|."],
    ];
    return { els, readout: lines[step] };
  },
};

const domainHole: FigureDef = {
  caption:
    "f(x) = (3x − 6)/(x − 2) grafiği. İzinli her x’te pay 3(x − 2) olduğundan değer 3’tür, fakat x = 2’de payda 0 olur: grafik y = 3 doğrusudur ve (2; 3) noktası boştur. Sürgüyle x’i değiştir; x = 2’de sonuç 0/0, tanımsız.",
  alt: "Koordinat düzleminde y = 3 yüksekliğinde yatay doğru; x = 2’de içi boş daire; seçilen x’teki nokta işaretli.",
  param: { label: "x", min: -2, max: 6, step: 0.5, init: 4 },
  draw: (x) => {
    const k = 1;
    const els: El[] = [vec(v(-2.6, 0), v(6.8, 0), { tone: "ink", thin: true }), vec(v(0, -0.6), v(0, 4.4), { tone: "ink", thin: true }), txt(v(6.8, 0), "x", "se", { tone: "ink", small: true }), txt(v(0, 4.4), "y", "n", { tone: "ink", small: true })];
    for (const t of [-2, 2, 4, 6]) els.push(seg(v(t * k, -0.08), v(t * k, 0.08), { tone: "muted", thin: true }), txt(v(t * k, -0.16), zs(t), "s", { tone: "muted", small: true, soft: true }));
    els.push(seg(v(0, 3), v(1.88, 3), { tone: "a", bold: true }), seg(v(2.12, 3), v(6.4, 3), { tone: "a", bold: true }), seg(v(-2.4, 3), v(0, 3), { tone: "a", bold: true }));
    els.push(pt(v(2, 3), "(2; 3) yok", "n", "warn", true), seg(v(2, 0), v(2, 2.8), { tone: "warn", dash: true, thin: true }));
    if (x !== 2) els.push(pt(v(x, 3), undefined, "n", "c"), seg(v(x, 0), v(x, 3), { tone: "c", dash: true, thin: true }));
    els.push(txt(v(-0.12, 3), "3", "sw", { tone: "muted", small: true, soft: true }));
    els.push(...pad(-2.8, 4.8, 7.2, -0.9));
    const num = 3 * x - 6, den = x - 2;
    return {
      els,
      readout: x === 2 ? ["x = 2: pay 0, payda 0 ⇒ 0/0 tanımsız.", "Sadeleştirme x ≠ 2 koşulunu silmez."] : [`x = ${nf(x, 1)}: (${nf(num, 1)})/(${nf(den, 1)}) = 3.`, "Tanım kümesi: x ≠ 2."],
    };
  },
};

/* ===================== Tek–çift ve işaret ===================== */

const parityLine: FigureDef = {
  caption:
    "Tam sayılarda tek–çift ile işaret iki ayrı sorudur. −8 ile 8 arasındaki tam sayılarda kare işaret çift, daire işaret tek sayıdır. 0 = 2·0 çifttir ama ne pozitif ne negatiftir; 6 ile −6 aynı pariteye sahiptir. 1/2 pozitiftir, tek ya da çift değildir.",
  alt: "−8’den 8’e sayı doğrusu; çift sayılarda kare, tek sayılarda daire işaretleri; 0’ın üstünde çift notu, 1/2’nin yerinde ayrı bir işaret.",
  draw: () => {
    const k = 0.6, els: El[] = [...numberLine(-8, 8, k, 0, [-8, -6, -4, -2, 0, 2, 4, 6, 8])];
    for (let n = -8; n <= 8; n++) {
      if (n % 2 === 0) els.push(rect(n * k - 0.12, 0.3, 0.24, 0.24, n === 0 ? "warn" : "a"));
      else els.push(pt(v(n * k, 0.42), undefined, "n", "c", true));
    }
    els.push(txt(v(-6 * k, 1.0), "negatif", "n", { tone: "muted", small: true }), txt(v(6 * k, 1.0), "pozitif", "n", { tone: "muted", small: true }));
    els.push(txt(v(0, 1.0), "0: çift, işaretsiz", "n", { tone: "warn", small: true, bold: true }));
    els.push(pt(v(0.5 * k, -0.9), "1/2: tek de çift de değil", "e", "b"));
    els.push(...pad(-5.3, 2.0, 5.4, -1.5));
    return { els, readout: ["Kare: çift (2k), daire: tek (2k + 1). −7 = 2·(−4) + 1 tektir.", "İşaret değiştirmek pariteyi değiştirmez: 6 ve −6 çifttir."] };
  },
};

const PAIR_STEPS = ["tek + tek: 3 + 5", "tek + çift: 3 + 4", "tek × tek: 3 × 5", "tek × çift: 3 × 4"];
const pairing: FigureDef = {
  caption:
    "İkişer eşleştirme modeli. Çift miktar ikişerli dizilince açıkta birim kalmaz, tek miktar bir birim bırakır. İki tek miktarın açıktaki birimleri yeni bir çift oluşturur: tek + tek çifttir. Çarpımda en az bir çift çarpan varsa sonuç çifttir; tek × tek tektir.",
  alt: "Noktalar ikişerli sütunlar halinde dizilmiş; eşi olmayan nokta vurgulu. Toplama adımlarında iki grup yan yana, çarpma adımlarında satır satır dizilmiş dikdörtgen nokta ızgarası.",
  steps: PAIR_STEPS,
  draw: (_, step) => {
    const els: El[] = [];
    const dots = (n: number, x0: number, tone: Tone) => {
      for (let i = 0; i < n; i++) els.push(token(x0 + Math.floor(i / 2) * 0.7, i % 2 === 0 ? 0.7 : 0, 0.48, i === n - 1 && n % 2 === 1 ? "warn" : tone));
    };
    let total = 0;
    if (step <= 1) {
      const [m, n] = step === 0 ? [3, 5] : [3, 4];
      total = m + n;
      dots(m, 0, "a");
      dots(n, 2.1, "c");
      els.push(txt(v(0.35, -0.5), String(m), "s", { tone: "a", bold: true }), txt(v(2.1 + 0.35 * (Math.ceil(n / 2) - 1), -0.5), String(n), "s", { tone: "c", bold: true }));
      els.push(txt(v(4.6, 0.35), `= ${total}`, "e", { tone: "ink", bold: true }));
    } else {
      const [m, n] = step === 2 ? [3, 5] : [3, 4];
      total = m * n;
      for (let r = 0; r < m; r++) for (let c = 0; c < n; c++) els.push(token(c * 0.7, 1.4 - r * 0.7, 0.48, "b"));
      els.push(txt(v(-0.5, 0.7), `${m} satır`, "w", { tone: "muted", small: true }), txt(v(((n - 1) * 0.7) / 2, -0.6), `${n} sütun`, "s", { tone: "muted", small: true }));
      els.push(txt(v(n * 0.7 + 0.2, 0.7), `= ${total}`, "e", { tone: "ink", bold: true }));
    }
    els.push(...pad(-2.2, 2.0, 6.6, -1.1));
    const even = total % 2 === 0;
    const lines = [
      ["3 ve 5’in açıktaki birer birimi eşleşir: 8 çift.", "(2a + 1) + (2b + 1) = 2(a + b + 1)."],
      ["Yalnız 3’ün birimi açıkta kalır: 7 tek.", "Toplam tekse biri tek, biri çifttir; hangisi olduğu söylenemez."],
      ["Her satır tek, satır sayısı tek: 15 tek.", "(2a + 1)(2b + 1) = 2(2ab + a + b) + 1."],
      ["4’lük satırlar ikişer eşleşir: 12 çift.", "Bir çift çarpan yeter; tersine çarpım çiftse hepsi çift olmaz."],
    ];
    return { els, readout: [...lines[step], even ? "Sonuç: çift." : "Sonuç: tek."] };
  },
};

const FACTORS = [3, -5, 4, -1, 0];
const signProduct: FigureDef = {
  caption:
    "Çarpımın işareti ve paritesi adım adım: 3, −5, 4, −1 ve son olarak 0 çarpan olarak eklenir. Sıfır yoksa negatif çarpan sayısı tekken sonuç negatif, çiftken pozitiftir; bir çift çarpan (4) gelince sonuç çift olur. 0 gelince çarpım 0’dır: işaretsiz ve çift.",
  alt: "Yan yana çarpan kutuları; negatif çarpanlar ayrı renkte; her adımda ara çarpım, negatif sayacı ve tek–çift bilgisi.",
  steps: FACTORS.map((_, i) => `${i + 1} çarpan`),
  draw: (_, step) => {
    const els: El[] = [];
    let prod = 1, neg = 0;
    FACTORS.forEach((f, i) => {
      const on = i <= step;
      if (on) {
        prod *= f;
        if (f < 0) neg++;
      }
      els.push(...cell(i * 1.9, 0, 1.4, 1.1, zs(f), on ? (f < 0 ? "warn" : f === 0 ? "b" : "a") : "muted", { small: false, fill: on }));
      if (i < FACTORS.length - 1) els.push(txt(v(i * 1.9 + 1.65, 0.55), "×", "c", { tone: "muted" }));
    });
    els.push(txt(v(4.4, -0.5), `çarpım = ${zs(prod)}`, "s", { tone: "ink", bold: true }));
    els.push(...pad(-0.3, 1.5, 9.2, -1.4));
    const sign = prod === 0 ? "sıfır (işaretsiz)" : prod > 0 ? "pozitif" : "negatif";
    return { els, readout: [`Negatif çarpan sayısı ${neg}; işaret: ${sign}.`, `Parite: ${prod % 2 === 0 ? "çift" : "tek"}${prod === 0 ? ": 0 da çifttir." : "."}`] };
  },
};

const powerSign: FigureDef = {
  caption:
    "(−2)ⁿ ile −2ⁿ karşılaştırması (sütun boyları ölçeklidir). Sürgüyle n’yi değiştir: parantezli tabanda çift üs pozitif, tek üs negatif sonuç verir; −2ⁿ’de eksi üssün dışında olduğu için sonuç hep negatiftir. n = 0’da (−2)⁰ = 1 tektir: sıfırıncı üs pariteyi korumaz.",
  alt: "Yatay sıfır çizgisi; solda (−2)ⁿ sütunu yukarı ya da aşağı, sağda −2ⁿ sütunu her zaman aşağı; üstlerinde değerler.",
  param: { label: "n", min: 0, max: 5, step: 1, init: 4 },
  draw: (n) => {
    const a = (-2) ** n, b = -(2 ** n), k = 0.11;
    const els: El[] = [seg(v(-0.6, 0), v(6.6, 0), { tone: "ink" })];
    els.push(rect(0.6, Math.min(0, a * k), 1.6, Math.abs(a * k), a > 0 ? "a" : "warn"), txt(v(1.4, a * k), zs(a), a >= 0 ? "n" : "s", { tone: "ink", bold: true }));
    els.push(rect(3.8, b * k, 1.6, Math.abs(b * k), "warn"), txt(v(4.6, b * k), zs(b), "s", { tone: "ink", bold: true }));
    els.push(txt(v(1.4, a >= 0 ? -0.3 : 0.3), `(−2)${sup(n)}`, a >= 0 ? "s" : "n", { tone: "muted", small: true }));
    els.push(txt(v(4.6, 0.3), `−2${sup(n)}`, "n", { tone: "muted", small: true }));
    els.push(...pad(-0.8, 4.4, 7.0, -4.4));
    return { els, readout: [`(−2)${sup(n)} = ${zs(a)}: ${n % 2 === 0 ? "çift üs, pozitif" : "tek üs, taban işareti korunur"}; ${a % 2 === 0 ? "çift" : "tek"}.`, `−2${sup(n)} = −(2${sup(n)}) = ${zs(b)}.`] };
  },
};

/* ===================== Asal sayılar ===================== */

const PRIMES = [2, 3, 5, 7, 11];
const sqrtTest: FigureDef = {
  caption:
    "Asallık denemesi: yalnız p² ≤ n olan asallar denenir; eşitlik dahildir. Sürgüyle n’yi değiştir. Her asal için p² çubuğu n çizgisiyle karşılaştırılır; çizginin altında kalanlar denenir. Bir bölen bileşikliği kanıtlar; gerekli adayların hiçbiri bölmezse n asaldır (97 için 2, 3, 5, 7 yeter, 11² = 121 > 97).",
  alt: "Beş sütun: 2, 3, 5, 7 ve 11’in kareleri; yatay kesikli n çizgisi; denenen asallar renkli, böleni bulunan sütun ayrıca vurgulu.",
  param: { label: "n", min: 2, max: 125, step: 1, init: 97 },
  draw: (n) => {
    const k = 0.032, els: El[] = [seg(v(-0.4, 0), v(9.4, 0), { tone: "ink" })];
    let divisor = 0;
    PRIMES.forEach((p, i) => {
      const need = p * p <= n, divides = need && n % p === 0 && n !== p;
      if (divides && !divisor) divisor = p;
      const x = i * 1.9;
      els.push(rect(x, 0, 1.2, p * p * k, divides ? "warn" : need ? "a" : "muted", need));
      els.push(txt(v(x + 0.6, 0), String(p), "s", { tone: "ink", bold: true }), txt(v(x + 0.6, p * p * k), `${p * p}`, "n", { tone: "muted", small: true }));
    });
    els.push(seg(v(-0.4, n * k), v(9.4, n * k), { tone: "c", dash: true }), txt(v(9.4, n * k), `n = ${n}`, "e", { tone: "c", small: true, bold: true }));
    els.push(...pad(-0.6, 4.6, 11.8, -0.8));
    const tried = PRIMES.filter((p) => p * p <= n);
    const verdict = n < 2 ? "" : divisor ? `${n} = ${divisor} × ${n / divisor}: bileşik.` : tried.length ? `Denenen ${tried.join(", ")}; hiçbiri bölmüyor: ${n} asal.` : `Denenecek asal yok (2² > ${n}): ${n} asal.`;
    return { els, readout: [`p² ≤ ${n} olan asallar: ${tried.length ? tried.join(", ") : "yok"}.`, verdict] };
  },
};

const TREE_STEPS = ["72 = 8 × 9", "Bileşikleri aç", "Asal çarpım"];
const factorTree: FigureDef = {
  caption:
    "72’nin asal çarpan ağacı. 8 ve 9 asal değildir, açılmaya devam edilir: 72 = 2³ × 3². Üç ayrı sayaç: farklı asal bölen sayısı 2 (2 ve 3), tekrarlı asal çarpan sayısı 3 + 2 = 5, pozitif bölen sayısı (3 + 1)(2 + 1) = 12.",
  alt: "Kökte 72; altında 8 ve 9; 8’in altında 2 ve 4, 4’ün altında 2 ve 2; 9’un altında 3 ve 3. Asal yapraklar daire içinde vurgulu.",
  steps: TREE_STEPS,
  draw: (_, step) => {
    const els: El[] = [];
    const node = (x: number, y: number, s: string, prime: boolean) => els.push(...cell(x - 0.45, y - 0.35, 0.9, 0.7, s, prime ? "a" : "muted", { fill: prime, small: false }));
    const edge = (x0: number, y0: number, x1: number, y1: number) => els.push(seg(v(x0, y0 - 0.35), v(x1, y1 + 0.35), { tone: "muted", thin: true }));
    node(4, 4, "72", false);
    edge(4, 4, 2, 2.6), edge(4, 4, 6, 2.6);
    node(2, 2.6, "8", false), node(6, 2.6, "9", false);
    if (step >= 1) {
      edge(2, 2.6, 1, 1.2), edge(2, 2.6, 3, 1.2), edge(6, 2.6, 5.2, 1.2), edge(6, 2.6, 6.8, 1.2);
      node(1, 1.2, "2", true), node(3, 1.2, "4", false), node(5.2, 1.2, "3", true), node(6.8, 1.2, "3", true);
      edge(3, 1.2, 2.3, -0.2), edge(3, 1.2, 3.7, -0.2);
      node(2.3, -0.2, "2", true), node(3.7, -0.2, "2", true);
    }
    if (step >= 2) els.push(txt(v(8.0, 1.2), "2³ × 3²", "e", { tone: "a", bold: true }));
    els.push(...pad(0.2, 4.7, 10.6, -0.9));
    const lines = [
      ["72 = 8 × 9; 8 ve 9 asal değil.", "(1 + 1)(1 + 1) burada bölen sayısı vermez."],
      ["8 = 2 × 4 = 2 × 2 × 2, 9 = 3 × 3.", "Yapraklar asal olunca dur."],
      ["72 = 2³ × 3²: farklı asal 2, tekrarlı asal çarpan 5.", "Pozitif bölen sayısı (3 + 1)(2 + 1) = 12."],
    ];
    return { els, readout: lines[step] };
  },
};

const COPRIME_STEPS = ["8 ve 15", "5 ve 10"];
const coprime: FigureDef = {
  caption:
    "Asal çarpan Venn şeması. 8 = 2³ ve 15 = 3 × 5 bileşik oldukları halde ortak asal çarpanları yoktur: kesişim boş, EBOB 1, aralarında asal. 5 ve 10’da 5 ortak çarpandır: EBOB 5, aralarında asal değil.",
  alt: "İki kesişen daire; her sayının asal çarpanları kendi dairesinde, ortak asal çarpanlar kesişimde.",
  steps: COPRIME_STEPS,
  draw: (_, step) => {
    const els: El[] = [];
    const circleAt = (cx: number, tone: Tone) => {
      const ps = Array.from({ length: 60 }, (_, i) => v(cx + 2.0 * Math.cos((i / 60) * 2 * Math.PI), 1.6 * Math.sin((i / 60) * 2 * Math.PI)));
      els.push(poly(ps, { tone }));
    };
    circleAt(0, "a");
    circleAt(2.6, "c");
    const [A, B, left, both, right] = step === 0 ? ["8", "15", ["2", "2", "2"], [] as string[], ["3", "5"]] : ["5", "10", [] as string[], ["5"], ["2"]];
    els.push(txt(v(-1.2, 1.9), A, "n", { tone: "a", bold: true }), txt(v(3.8, 1.9), B, "n", { tone: "c", bold: true }));
    left.forEach((s, i) => els.push(txt(v(-1.1, 0.7 - i * 0.7), s, "c", { tone: "ink", bold: true })));
    right.forEach((s, i) => els.push(txt(v(3.7, 0.4 - i * 0.8), s, "c", { tone: "ink", bold: true })));
    if (both.length) both.forEach((s) => els.push(txt(v(1.3, 0), s, "c", { tone: "warn", bold: true })));
    else els.push(txt(v(1.3, 0), "boş", "c", { tone: "muted", small: true }));
    els.push(...pad(-2.4, 2.7, 5.0, -1.9));
    return { els, readout: step === 0 ? ["Ortak asal çarpan yok: EBOB(8, 15) = 1, aralarında asal.", "İkisi de bileşik; ‘ikisi de asal’ ayrı bir ifadedir."] : ["Ortak çarpan 5: EBOB(5, 10) = 5.", "Aralarında asal değiller."] };
  },
};

const isPrime = (n: number) => {
  if (n < 2) return false;
  for (let p = 2; p * p <= n; p++) if (n % p === 0) return false;
  return true;
};
const primeSum: FigureDef = {
  caption:
    "Toplamı s olan iki asal: her p ≤ s/2 asalı için s − p’nin asal olup olmadığı sınanır. Sürgüyle s’yi değiştir. s tekse asallardan biri çift olmalıdır ve tek çift asal 2’dir: 19 = 2 + 17. s çiftse 2 zorunlu değildir: 12 = 5 + 7.",
  alt: "Satır satır p ve s − p kutuları; ikisi de asal olan satırlar vurgulu, diğerleri soluk.",
  param: { label: "s", min: 5, max: 30, step: 1, init: 19 },
  draw: (s) => {
    const els: El[] = [];
    const ps = [2, 3, 5, 7, 11, 13].filter((p) => p <= s / 2);
    const hits: string[] = [];
    ps.forEach((p, i) => {
      const q = s - p, ok = isPrime(q), y = 3.0 - i * 0.75;
      if (ok) hits.push(`${p} + ${q}`);
      els.push(...cell(0, y, 1.2, 0.6, String(p), ok ? "a" : "muted", { fill: ok }), txt(v(1.5, y + 0.3), "+", "c", { tone: "muted" }));
      els.push(...cell(1.8, y, 1.2, 0.6, String(q), ok ? "a" : "muted", { fill: ok }));
      els.push(txt(v(3.3, y + 0.3), ok ? "ikisi de asal" : `${q} asal değil`, "e", { tone: ok ? "a" : "muted", small: true }));
    });
    els.push(...pad(-0.3, 3.9, 8.0, -1.0));
    return { els, readout: [`s = ${s}: ${hits.length ? hits.join(", ") : "iki asalın toplamı olarak yazılamıyor"}.`, s % 2 ? "Tek toplamda bir asal 2 olmak zorunda." : "Çift toplamda 2 zorunlu değil; farklılık koşulu varsa eşit asalları dışla."] };
  },
};

/* ===================== Faktöriyel ===================== */

const arrangements: FigureDef = {
  caption:
    "Farklı nesneleri sıraya koyarken ilk yer için n, ikinci için n − 1, … son yer için 1 seçenek kalır: n! düzen. Sürgüyle nesne sayısını değiştir. n = 4 kitapta 4 × 3 × 2 × 1 = 24 sıra; boş sıranın da tek düzeni vardır (0! = 1).",
  alt: "Yan yana sıra kutuları; her kutunun içinde o yer için kalan seçenek sayısı ve aralarında çarpı işaretleri.",
  param: { label: "n", min: 0, max: 6, step: 1, init: 4 },
  draw: (n) => {
    const els: El[] = [];
    let f = 1;
    for (let i = 0; i < n; i++) {
      f *= n - i;
      els.push(...cell(i * 1.75, 0, 1.1, 1.1, String(n - i), "a", { small: false }), txt(v(i * 1.75 + 0.55, -0.2), `${i + 1}. yer`, "s", { tone: "muted", small: true, soft: true }));
      if (i < n - 1) els.push(txt(v(i * 1.75 + 1.425, 0.55), "×", "c", { tone: "muted" }));
    }
    if (n === 0) els.push(txt(v(2, 0.55), "boş sıra: 1 düzen", "c", { tone: "muted", bold: true }));
    els.push(...pad(-0.3, 1.5, 10.2, -1.0));
    return { els, readout: [`${n}! = ${n ? Array.from({ length: n }, (_, i) => n - i).join(" × ") : "1 (boş çarpım)"}${n > 1 ? ` = ${f}` : ""}.`, "Nesneler farklı, hepsi kullanılıyor ve ek kısıt yoksa geçerlidir."] };
  },
};

const CANCEL_STEPS = ["8! ve 5!", "Ortak 5!’i sadeleştir"];
const cancel: FigureDef = {
  caption:
    "8!/5! hesaplanırken iki faktöriyel büyük sayıya çevrilmez. 8! = 8 × 7 × 6 × 5! yazılınca ortak 5! sadeleşir: 8!/5! = 8 × 7 × 6 = 336.",
  alt: "Üst satırda 8’den 1’e çarpanlar, alt satırda 5’ten 1’e çarpanlar; ikinci adımda ortak 5, 4, 3, 2, 1 kutuları üstü çizili soluk.",
  steps: CANCEL_STEPS,
  draw: (_, step) => {
    const els: El[] = [];
    for (let i = 0; i < 8; i++) {
      const n = 8 - i, common = n <= 5;
      els.push(...cell(i * 1.05, 1.4, 0.85, 0.85, String(n), common && step ? "muted" : "a", { fill: !(common && step), small: false }));
      if (common && step) els.push(seg(v(i * 1.05, 1.4), v(i * 1.05 + 0.85, 2.25), { tone: "warn", thin: true }));
    }
    for (let i = 3; i < 8; i++) {
      els.push(...cell(i * 1.05, 0, 0.85, 0.85, String(8 - i), step ? "muted" : "c", { fill: !step, small: false }));
      if (step) els.push(seg(v(i * 1.05, 0), v(i * 1.05 + 0.85, 0.85), { tone: "warn", thin: true }));
    }
    els.push(seg(v(-0.1, 1.12), v(8.4, 1.12), { tone: "ink" }));
    els.push(txt(v(-0.3, 1.82), "8!", "w", { tone: "ink", bold: true }), txt(v(2.9, 0.42), "5!", "w", { tone: "ink", bold: true }));
    els.push(...pad(-1.5, 2.6, 8.7, -0.5));
    return { els, readout: step ? ["8!/5! = 8 × 7 × 6 = 336.", "n ≥ m için n!/m!, m + 1’den n’ye kadarki çarpımdır."] : ["8! = 40320, 5! = 120: büyük sayılara gerek yok.", "8! = 8 × 7 × 6 × 5!."] };
  },
};

const LEG_STEPS = ["12!’de 3 sayacı", "12!’de 2 sayacı"];
const legendre: FigureDef = {
  caption:
    "12! içinde bir asalın kopya sayısı: p’nin her katı bir kopya, p²’nin her katı bir ek kopya verir. 3 için ⌊12/3⌋ + ⌊12/9⌋ = 4 + 1 = 5 (9 iki adet 3 taşır). 2 için 6 + 3 + 1 = 10. Her noktalı satır bir bölme terimidir.",
  alt: "1’den 12’ye sayı kutuları; seçili asalın katlarının üstünde kaç kopya taşıdığını gösteren nokta sütunları.",
  steps: LEG_STEPS,
  draw: (_, step) => {
    const p = step === 0 ? 3 : 2, els: El[] = [];
    let total = 0;
    for (let n = 1; n <= 12; n++) {
      let c = 0, m = n;
      while (m % p === 0) {
        c++;
        m /= p;
      }
      total += c;
      const x = (n - 1) * 0.8;
      els.push(...cell(x, 0, 0.66, 0.66, String(n), c ? "a" : "muted", { fill: c > 0 }));
      for (let j = 0; j < c; j++) els.push(token(x + 0.33, 1.0 + j * 0.42, 0.3, j === 0 ? "a" : j === 1 ? "c" : "warn"));
    }
    els.push(...pad(-0.3, 3.0, 9.6, -0.4));
    const terms = p === 3 ? "⌊12/3⌋ + ⌊12/9⌋ = 4 + 1" : "⌊12/2⌋ + ⌊12/4⌋ + ⌊12/8⌋ = 6 + 3 + 1";
    return { els, readout: [`${terms} = ${total}.`, "Bölümün tam kısmı 0 olunca dur; formülde p asal olmalı."] };
  },
};

const trailingZeros: FigureDef = {
  caption:
    "n! sonundaki sıfırlar 10 = 2 × 5 çiftlerinden gelir; 2’ler 5’lerden az olmadığı için 5 kopyaları sayılır: ⌊n/5⌋ + ⌊n/25⌋. Sürgüyle n’yi değiştir. 25! için 5 + 1 = 6 sıfır: 25 iki adet 5 taşır.",
  alt: "5’in katları sırayla kutularda; her kutunun üstünde taşıdığı 5 kopyası kadar nokta; toplam sıfır sayısı yazılı.",
  param: { label: "n", min: 5, max: 30, step: 1, init: 25 },
  draw: (n) => {
    const els: El[] = [];
    let total = 0;
    for (let m = 5, i = 0; m <= 30; m += 5, i++) {
      const on = m <= n;
      const c = m % 25 === 0 ? 2 : 1;
      if (on) total += c;
      const x = i * 1.4;
      els.push(...cell(x, 0, 1.0, 0.8, String(m), on ? "a" : "muted", { fill: on, small: false }));
      if (on) for (let j = 0; j < c; j++) els.push(token(x + 0.5, 1.15 + j * 0.45, 0.32, j ? "warn" : "a"));
    }
    els.push(...pad(-0.3, 2.4, 8.4, -0.4));
    return { els, readout: [`⌊${n}/5⌋ + ⌊${n}/25⌋ = ${Math.floor(n / 5)} + ${Math.floor(n / 25)} = ${total} sondaki sıfır.`, "Bu kestirme yalnız n! içindir; bölüm ve toplamda çarpanları yeniden eşleştir."] };
  },
};

/* ===================== Sayı basamakları ===================== */

const weights6206: FigureDef = {
  caption:
    "6206’nın basamak tablosu: sağdan sola ağırlıklar 1, 10, 100, 1000. Her rakamın katkısı rakam × ağırlıktır: 6206 = 6000 + 200 + 0 + 6. Sıfırın katkısı 0’dır ama onlar konumunu korur. Rakam toplamı 14, yazılan rakam 4, farklı rakam 3.",
  alt: "Dört sütunlu tablo: üst satırda ağırlıklar 1000, 100, 10, 1; ortada rakamlar 6, 2, 0, 6; altta katkılar 6000, 200, 0, 6.",
  draw: () => {
    const digits = [6, 2, 0, 6], wts = [1000, 100, 10, 1], els: El[] = [];
    const w = 1.8, h = 0.85;
    digits.forEach((d, i) => {
      const x = 2.4 + i * w;
      els.push(...cell(x, 2 * h, w, h, String(wts[i]), "muted"));
      els.push(...cell(x, h, w, h, String(d), i === 0 || i === 3 ? "a" : "c", { small: false }));
      els.push(...cell(x, 0, w, h, String(d * wts[i]), "muted", { fill: false }));
    });
    els.push(txt(v(2.2, 2.5 * h), "ağırlık", "w", { tone: "muted", small: true }), txt(v(2.2, 1.5 * h), "rakam", "w", { tone: "muted", small: true }), txt(v(2.2, 0.5 * h), "katkı", "w", { tone: "muted", small: true }));
    els.push(...pad(-0.2, 3 * h + 0.3, 9.8, -0.3));
    return { els, readout: ["6206 = 6·1000 + 2·100 + 0·10 + 6·1.", "Soldaki 6 altı bin, sağdaki 6 altı birlik verir."] };
  },
};

const appendDigit: FigureDef = {
  caption:
    "N = 6206’nın sağına ya da soluna d rakamı yazmak. Sağa yazınca eski her rakam bir konum sola kayar: 10N + d. Dört basamaklı N’nin soluna yazınca d·10⁴ + N olur. Sürgüyle d’yi değiştir; d = 0 sola yazıldığında değer değişmez.",
  alt: "Üstte 6206 rakam kutuları; altında iki satır: sağa eklenen d ile beş basamaklı sayı ve sola eklenen d ile beş basamaklı yazım; yeni rakam vurgulu.",
  param: { label: "d", min: 0, max: 9, step: 1, init: 3 },
  draw: (d) => {
    const N = [6, 2, 0, 6], els: El[] = [];
    const row = (y: number, ds: (number | string)[], hi: number, label: string) => {
      ds.forEach((s, i) => els.push(...cell(2.6 + i * 0.95, y, 0.8, 0.8, String(s), i === hi ? "warn" : "muted", { fill: i === hi, small: false })));
      els.push(txt(v(2.4, y + 0.4), label, "w", { tone: "muted", small: true }));
    };
    row(2.4, N, -1, "N");
    row(1.2, [...N, d], 4, "sağa");
    row(0, [d, ...N], 0, "sola");
    const right = 10 * 6206 + d, left = d * 10000 + 6206;
    els.push(txt(v(7.6, 1.6), `= ${right}`, "e", { tone: "ink", small: true, bold: true }), txt(v(7.6, 0.4), `= ${left}`, "e", { tone: "ink", small: true, bold: true }));
    els.push(...pad(0.3, 3.5, 10.8, -0.3));
    return { els, readout: [`Sağa: 10·6206 + ${d} = ${right}.`, `Sola: ${d}·10⁴ + 6206 = ${left}${d === 0 ? " (öndeki 0 değeri değiştirmez)" : ""}.`] };
  },
};

const digitCount: FigureDef = {
  caption:
    "1’den b’ye kadar ardışık numaraları yazmak için kaç rakam gerekir? Aralığı basamak sınırlarında böl: 1–9 birer, 10–99 ikişer, 100–999 üçer rakam. Sürgüyle b’yi değiştir; her blokta adet × basamak sayısı alınır. Uçlar dahil adet b − a + 1’dir.",
  alt: "Üç yatay blok şeridi: 1–9, 10–99, 100–999; her şeritte kullanılan kısım dolu, altında adet ve rakam sayısı.",
  param: { label: "b", min: 1, max: 300, step: 1, init: 120 },
  draw: (b) => {
    const blocks: [number, number, number, Tone][] = [[1, 9, 1, "a"], [10, 99, 2, "c"], [100, 999, 3, "b"]];
    const els: El[] = [];
    let total = 0;
    const parts: string[] = [];
    blocks.forEach(([lo, hi, dgt, tone], i) => {
      const y = 2.4 - i * 1.2, used = Math.max(0, Math.min(b, hi) - lo + 1), frac = used / (hi - lo + 1);
      els.push(rect(2.6, y, 6, 0.6, tone, false));
      if (used) els.push(rect(2.6, y, 6 * frac, 0.6, tone));
      els.push(txt(v(2.4, y + 0.3), `${lo}–${hi}`, "w", { tone, small: true, bold: true }));
      if (used) {
        total += used * dgt;
        parts.push(`${used}·${dgt}`);
      }
      els.push(txt(v(8.8, y + 0.3), used ? `${used} × ${dgt}` : "0", "e", { tone: "ink", small: true }));
    });
    els.push(...pad(0.1, 3.4, 11.2, -0.3));
    return { els, readout: [`1–${b}: ${b} numara.`, `Rakam: ${parts.join(" + ")} = ${total}.`] };
  },
};

const digitRange: FigureDef = {
  caption:
    "k basamaklı pozitif sayılar 10ᵏ⁻¹ ile 10ᵏ − 1 arasındadır ve 9·10ᵏ⁻¹ tanedir. Sürgüyle k’yi değiştir. 10ᵏ, k + 1 basamaklı ilk sayıdır; sınırları eşitlikle yazmak en küçük ve en büyük adayı doğru blokta tutar (şerit ölçekli değil).",
  alt: "Yatay şerit; sol uçta k basamaklı ilk sayı, sağ uçta son sayı; şeridin hemen sağında bir sonraki bloğun ilk sayısı ayrı renkte.",
  param: { label: "k", min: 1, max: 5, step: 1, init: 5 },
  draw: (k) => {
    const lo = 10 ** (k - 1), hi = 10 ** k - 1, els: El[] = [];
    els.push(rect(0, 0, 7, 0.8, "a"), rect(7.5, 0, 1.6, 0.8, "muted", false));
    els.push(txt(v(0, -0.2), String(lo), "s", { tone: "ink", bold: true }), txt(v(7, -0.2), String(hi), "s", { tone: "ink", bold: true }), txt(v(8.3, 1.0), String(10 ** k), "n", { tone: "muted", small: true }));
    els.push(txt(v(3.5, 0.4), `${k} basamaklı`, "c", { tone: "ink", small: true, bold: true }));
    els.push(...pad(-1.2, 1.8, 9.6, -1.0));
    return { els, readout: [`${lo} ≤ N ≤ ${hi}.`, `Adet: 9·10${sup(k - 1)} = ${(9 * lo).toLocaleString("tr-TR")}.`] };
  },
};

/* ===================== Bölme ve bölünebilme ===================== */

const groups7: FigureDef = {
  caption:
    "Bölme A = 7q + r ve 0 ≤ r < 7 koşullarının birlikte sağlanmasıdır. Sürgüyle A’yı değiştir: nesneler 7’li gruplara ayrılır, grup sayısı bölüm, artanlar kalandır. 38 = 7·5 + 3; 38 = 7·4 + 10 doğru bir eşitliktir ama 10 içinde bir tam 7’lik grup daha vardır.",
  alt: "Satırlar halinde 7’li nokta grupları ve son satırda 7’den az kalan noktalar farklı renkte.",
  param: { label: "A", min: 0, max: 45, step: 1, init: 38 },
  draw: (A) => {
    const q = Math.floor(A / 7), r = A % 7, els: El[] = [];
    for (let i = 0; i < A; i++) {
      const g = Math.floor(i / 7), j = i % 7;
      els.push(token(j * 0.55, 3.3 - g * 0.55, 0.36, g < q ? "a" : "warn"));
    }
    for (let g = 0; g < q; g++) els.push(txt(v(4.0, 3.3 - g * 0.55), `${g + 1}. grup`, "e", { tone: "muted", small: true, soft: true }));
    els.push(...pad(-0.4, 3.7, 6.6, -0.2));
    return { els, readout: [`${A} = 7·${q} + ${r}, 0 ≤ ${r} < 7.`, r === 0 ? "Kalan 0: tam bölünür." : `Bölüm ${q}, kalan ${r}.`] };
  },
};

const negRemainder: FigureDef = {
  caption:
    "Negatif bölünende kalan negatif olmaz: bölüm A/b’nin aşağı yuvarlanmışıdır. −22/5 = −4,4 ⇒ q = −5, r = −22 − 5·(−5) = 3. Sayı doğrusunda −22 iki komşu kat −25 ile −20 arasındadır; kalan soldaki kattan uzaklıktır. Sıfıra doğru kesmek q = −4, r = −2 verir ve bu aralığa uymaz.",
  alt: "−26’dan −18’e sayı doğrusu; 5’in katları −25 ve −20 işaretli; −22 noktası; −25’ten −22’ye 3 birimlik vurgulu aralık.",
  draw: () => {
    const k = 1, els: El[] = [...numberLine(-26, -18, k, 0, [-25, -20])];
    els.push(seg(v(-25, 0), v(-22, 0), { tone: "a", bold: true }), txt(v(-23.5, 0.3), "r = 3", "n", { tone: "a", bold: true }));
    els.push(pt(v(-25, 0), undefined, "n", "c"), pt(v(-20, 0), undefined, "n", "c"), pt(v(-22, 0), "−22", "n", "warn"));
    els.push(seg(v(-22, -0.9), v(-20, -0.9), { tone: "muted", dash: true }), txt(v(-21, -1.1), "−2 (uymaz)", "s", { tone: "muted", small: true }));
    els.push(...pad(-26.6, 1.3, -17.4, -1.8));
    return { els, readout: ["−22 = 5·(−5) + 3, 0 ≤ 3 < 5.", "Program % işleci −2 döndürebilir: ((−22 % 5) + 5) % 5 = 3."] };
  },
};

const elevenTest: FigureDef = {
  caption:
    "11 için işaretli ağırlık tablosu, örnek 9051. Sağdan ağırlıklar +1, −1, +1, −1: d − c + b − a = 1 − 5 + 0 − 9 = −13. −13 = 11·(−2) + 9 olduğundan kalan 9’dur; doğrudan bölme 9051 = 11·822 + 9 aynı sonucu verir.",
  alt: "Dört sütun: rakamlar 9, 0, 5, 1; altlarında ağırlıklar −1, +1, −1, +1 ve katkılar −9, 0, −5, 1.",
  draw: () => {
    const digits = [9, 0, 5, 1], w = [-1, 1, -1, 1], els: El[] = [];
    digits.forEach((d, i) => {
      const x = 2.2 + i * 1.6;
      els.push(...cell(x, 1.8, 1.4, 0.8, String(d), "muted", { small: false }));
      els.push(...cell(x, 0.9, 1.4, 0.8, w[i] > 0 ? "+1" : "−1", w[i] > 0 ? "a" : "warn"));
      els.push(...cell(x, 0, 1.4, 0.8, zs(d * w[i]), "muted", { fill: false }));
    });
    els.push(txt(v(2.0, 2.2), "rakam", "w", { tone: "muted", small: true }), txt(v(2.0, 1.3), "ağırlık", "w", { tone: "muted", small: true }), txt(v(2.0, 0.4), "katkı", "w", { tone: "muted", small: true }));
    els.push(...pad(-0.4, 2.9, 9.0, -0.3));
    return { els, readout: ["Toplam: −9 + 0 − 5 + 1 = −13.", "−13 = 11·(−2) + 9 ⇒ 9051’in 11’e bölümünden kalan 9."] };
  },
};

const modTable: FigureDef = {
  caption:
    "3x’in 9’a bölümünden kalan 3 koşulu için x’in 0–8 adaylarını sına. 3 ile 9 aralarında asal olmadığından iki tarafı 3’e bölmek x ≡ 1 verir ve çözüm kaybettirir: x = 1, 4, 7 koşulu sağlar.",
  alt: "İki satırlı tablo: üstte x = 0’dan 8’e, altta 3x’in 9’a bölümünden kalan; kalanı 3 olan sütunlar vurgulu.",
  draw: () => {
    const els: El[] = [];
    for (let x = 0; x <= 8; x++) {
      const r = (3 * x) % 9, hit = r === 3;
      els.push(...cell(1.6 + x * 0.9, 0.9, 0.8, 0.8, String(x), hit ? "a" : "muted", { fill: hit }));
      els.push(...cell(1.6 + x * 0.9, 0, 0.8, 0.8, String(r), hit ? "a" : "muted", { fill: hit }));
    }
    els.push(txt(v(1.4, 1.3), "x", "w", { tone: "muted", small: true }), txt(v(1.4, 0.4), "kalan", "w", { tone: "muted", small: true }));
    els.push(...pad(-0.3, 2.0, 9.9, -0.3));
    return { els, readout: ["Kalanı 3 olanlar: x = 1, 4, 7.", "3’e bölüp x ≡ 1 (mod 9) yazmak 4 ve 7’yi kaybettirir."] };
  },
};

export const mathFigures060TytNumbers: Record<string, Record<string, FigureDef>> = {
  "temel-kavramlar": {
    "Rakam yazım aracıdır, sayı bir değerdir": placeValue,
    "Sayı kümelerinde önce değeri hesapla": numberSets,
    "Sayı doğrusunda sırayı ve uzaklığı ayır": compareOnNumberLine,
    "Açık ve kapalı sınırdan tam sayıları bul": integerBounds,
    "İşlem önceliği ve eksi işaretinin kapsamı": orderOps,
    "Tanım koşulunu sadeleştirerek silemezsin": domainHole,
  },
  "tek-cift-isaret": {
    "İki bağımsız soru: işaret ve tek–çift": parityLine,
    "Toplam ve farkın kuralını ikili gruplardan çıkar": pairing,
    "Çarpımda bir çift yeter; işarette sıfır önce gelir": signProduct,
    "Üslerde koşulu ve tabanı koru": powerSign,
  },
  "asal-sayilar": {
    "Bölen denemesi neden karekökte biter?": sqrtTest,
    "Asal çarpan ağacı ve üç farklı sayaç": factorTree,
    "Aralarında asal olmak, ikisinin de asal olması değildir": coprime,
    "Asal toplamlarında 2’yi ayrı düşün": primeSum,
  },
  faktoriyel: {
    "Azalan seçimler neden n! verir?": arrangements,
    "Büyük sayıları hesaplamadan ortak çarpımı sadeleştir": cancel,
    "Bir asalın kaç kopyası var?": legendre,
    "Sondaki sıfırların kaynağı 2×5 çiftleridir": trailingZeros,
  },
  "sayi-basamaklari": {
    "Rakam yer değiştirirse değer de değişebilir": weights6206,
    "Sola eklemek ve sağa eklemek farklıdır": appendDigit,
    "Numara sayısı ile yazılan rakam sayısı": digitCount,
    "Basamak aralığı ve 10’un kuvvetleri": digitRange,
  },
  "bolme-bolunebilme": {
    "Eşitlik tek başına bölme işlemi değildir": groups7,
    "Negatif sayıda kalan ve program işareti": negRemainder,
    "11 için işaretli ağırlık tablosu": elevenTest,
    "Kalan eşitliğini ne zaman bölebilirsin?": modTable,
  },
};
