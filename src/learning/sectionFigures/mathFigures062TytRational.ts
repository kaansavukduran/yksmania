import { power039Fraction, power039Scalar, power039ScientificInput } from "../powersSource039Model";
import { pt, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { cell, frac, nf, pad, rect, sup, tn } from "./mathFigures062TytKit";

/*
 * TYT Matematik (Forge062) · Aurelia kaynak dersleri: rasyonel sayılar ve
 * üslü sayılar. Kesir şeritleri, ölçme modeli, devirli kuyruk hizalaması,
 * kuvvet merdiveni, çarpan sayımı, doğrusal ve logaritmik ölçek ile üstel
 * adım sütunları; her değer bölümdeki örnekten (3/4, 1/2 + 1/3, (2/3)/(4/5),
 * 7/8 ile 11/12, 0,1(6), (4³ · 8²)/2⁵, 200 · 2ᵗ …) kesin hesapla üretilir.
 */

/* ===================== Rasyonel sayılar ===================== */

/** Uzunluğu L olan şerit: n eş parça, ilk m tanesi dolu. */
function bar(x: number, y: number, L: number, n: number, m: number, tone: Tone, h = 0.7): El[] {
  const els: El[] = [];
  const w = L / n;
  for (let i = 0; i < n; i++) els.push(rect(x + i * w, y, w, h, i < m ? tone : "muted", i < m));
  return els;
}

const equivalent: FigureDef = {
  caption:
    "Denk kesir şeritleri (ölçekli): iki şerit aynı bütünü gösterir. 3/4’ün payı ve paydası aynı k ile çarpılınca parçalar k kat küçülür, parça sayısı k kat artar; boyalı uzunluk ve sayı doğrusundaki nokta değişmez. Yalnız payı değiştirmek (6/8 → 3/8) sayıyı yarıya indirir.",
  alt: "Üstte dört parçalı, üçü boyalı şerit; altta 4k parçalı, 3k parçası boyalı şerit; en altta iki boyalı ucun aynı noktaya düştüğü sayı doğrusu.",
  param: { label: "k", min: 1, max: 4, step: 1, init: 2 },
  draw: (k) => {
    const L = 9;
    const els: El[] = [...bar(0, 1.6, L, 4, 3, "a"), ...bar(0, 0.5, L, 4 * k, 3 * k, "c")];
    els.push(txt(v(-0.25, 1.95), "3/4", "w", { tone: "a", bold: true }), txt(v(-0.25, 0.85), `${3 * k}/${4 * k}`, "w", { tone: "c", bold: true }));
    els.push(vec(v(0, -0.3), v(L + 0.5, -0.3), { tone: "ink", thin: true }));
    for (const [t, s] of [[0, "0"], [1, "1"]] as [number, string][]) els.push(seg(v(t * L, -0.4), v(t * L, -0.2), { tone: "muted", thin: true }), txt(v(t * L, -0.5), s, "s", { tone: "muted", small: true }));
    els.push(seg(v(0.75 * L, -0.3), v(0.75 * L, 0.45), { tone: "warn", dash: true, thin: true }), pt(v(0.75 * L, -0.3), "0,75", "s", "warn"));
    els.push(...pad(-1.8, 2.6, L + 0.6, -1.2));
    return {
      els,
      readout: [`3/4 = (3 · ${k})/(4 · ${k}) = ${3 * k}/${4 * k} = 0,75.`, k === 1 ? "k = 1: kesir aynen kalır; k = 0 seçilemez, payda 0 olur." : `Her parça 1/${4 * k}; ${3 * k} parça yine aynı uzunluk.`],
    };
  },
};

const signedOrder: FigureDef = {
  caption: "Sayı doğrusu çeyrek birimlere ayrılmıştır. İşaretleri değiştirince iki nokta sıfıra göre yansır. Sıfıra uzaklıklar aynı kalır, sayıların sırası değişir.",
  alt: "Sıfırın iki yanında çeyrek birim işaretleri bulunan yatay eksende yarım ve üç çeyrek noktaları. İki noktanın sıfıra uzaklığı ayrı çizgilerle gösterilir.",
  steps: ["Negatif kesirler", "Pozitif karşıtları"],
  draw: (_, step) => {
    const sign = step === 0 ? -1 : 1;
    const threeQuarters = 3 * sign;
    const half = 2 * sign;
    const a = frac(threeQuarters, 4);
    const b = frac(half, 4);
    const els: El[] = [
      vec(v(-4.4, 0), v(4.5, 0), {tone: "ink", thin: true}),
      ...Array.from({length: 9}, (_, i) => i - 4).map((x) =>
        seg(v(x, -0.12), v(x, 0.12), {tone: "muted", thin: true})
      ),
      txt(v(-4, -0.22), "−1", "s"), txt(v(0, -0.22), "0", "s"), txt(v(4, -0.22), "1", "s"),
      pt(v(threeQuarters, 0), a, "n", "a"),
      pt(v(half, 0), b, "s", "c"),
      seg(v(threeQuarters, -1.1), v(0, -1.1), {tone: "a"}),
      seg(v(half, -1.8), v(0, -1.8), {tone: "c"}),
      txt(v(threeQuarters / 2, -1.1), "3/4", "s", {tone: "a"}),
      txt(v(half / 2, -1.8), "1/2", "s", {tone: "c"}),
      ...pad(-4.7, 1.05, 4.7, -2.4),
    ];
    return {
      els,
      readout: [
        `${a} ${threeQuarters < half ? "<" : ">"} ${b}.`,
        "Sıfıra uzaklıklar 3/4 ve 1/2 birimdir. Sayının büyüklüğünü eksende sağda kalan nokta belirler.",
      ],
    };
  },
};

const SUM_STEPS = ["1/2 ve 1/3", "Altılık parçalara çevir", "Parçaları say: 5/6", "2/5 neden olamaz?"];
const commonParts: FigureDef = {
  caption:
    "Ortak parça şeritleri (ölçekli, aynı bütün). Yarım ile üçte bir farklı boyda parçalardır; ikisi de altılık parçalarla yazılınca 3/6 + 2/6 = 5/6 olur: payda parça boyu olarak aynı kalır, adetler toplanır. 2/5 sonucu, 1/2’den bile küçük olduğu için iki pozitif sayının toplamı olamaz.",
  alt: "Üst üste aynı uzunlukta şeritler: yarım, üçte bir, altılıklara bölünmüş hâlleri ve toplam; son adımda beş parçalı, ikisi boyalı karşılaştırma şeridi.",
  steps: SUM_STEPS,
  draw: (_, step) => {
    const L = 9;
    const els: El[] = [];
    const nA = step === 0 ? 2 : 6;
    const nB = step === 0 ? 3 : 6;
    els.push(...bar(0, 2.0, L, nA, nA / 2, "a"), ...bar(0, 1.0, L, nB, nB / 3, "c"));
    els.push(txt(v(-0.25, 2.35), step === 0 ? "1/2" : "3/6", "w", { tone: "a", bold: true }), txt(v(-0.25, 1.35), step === 0 ? "1/3" : "2/6", "w", { tone: "c", bold: true }));
    if (step >= 2) {
      const w = L / 6;
      for (let i = 0; i < 6; i++) els.push(rect(i * w, -0.2, w, 0.7, i < 3 ? "a" : i < 5 ? "c" : "muted", i < 5));
      els.push(txt(v(-0.25, 0.15), "5/6", "w", { tone: "ink", bold: true }));
    }
    if (step === 3) {
      els.push(...bar(0, -1.2, L, 5, 2, "warn"));
      els.push(txt(v(-0.25, -0.85), "2/5", "w", { tone: "warn", bold: true }));
      els.push(seg(v(L / 2, -1.35), v(L / 2, 2.85), { tone: "muted", dash: true, thin: true }), txt(v(L / 2, 2.95), "1/2", "n", { tone: "muted", small: true }));
    }
    els.push(...pad(-1.6, 3.4, L + 0.3, -1.5));
    const lines = [
      ["Yarım ve üçte bir farklı parça boylarını sayar.", "Doğrudan toplanacak ortak birim yok."],
      ["1/2 = 3/6 ve 1/3 = 2/6: aynı bütün, eş boyda parçalar.", "Payda parça boyudur, değişmez."],
      ["3/6 + 2/6 = 5/6.", "Paydaları toplamak parça boyunu değiştirir."],
      ["2/5 < 1/2: toplam, toplananların her birinden büyük olmalıydı.", "Tahmin denetimi hatayı yakalar; kesin hesabın yerine geçmez."],
    ];
    return { els, readout: lines[step] };
  },
};

const DIV: [number, number, number, number][] = [[2, 3, 4, 5], [3, 5, 9, 10]];
const measure: FigureDef = {
  caption:
    "Bölmenin ölçme modeli (ölçekli). (a/b)/(c/d), a/b miktarında c/d biriminden kaç tane bulunduğunu sorar. Miktar şeridi birim şeridinin üstüne konur: birim tam sığmıyorsa sonuç 1’den küçük bir kesirdir. Sonuç bölenle çarpılınca bölünen geri gelmelidir.",
  alt: "Ortak 0–1 sayı doğrusu üzerinde üstte miktar şeridi, altta birim şeridi; birim şeridinin miktara kadar olan kısmı ayrı boyalı.",
  steps: DIV.map(([a, b, c, d]) => `(${a}/${b}) ÷ (${c}/${d})`),
  draw: (_, step) => {
    const [a, b, c, d] = DIV[step];
    const L = 10;
    const A = (a / b) * L;
    const U = (c / d) * L;
    const els: El[] = [];
    els.push(rect(0, 1.3, A, 0.6, "a"), txt(v(-0.25, 1.6), `${a}/${b}`, "w", { tone: "a", bold: true }));
    els.push(rect(0, 0.4, U, 0.6, "c", false), rect(0, 0.4, Math.min(A, U), 0.6, "c"), txt(v(-0.25, 0.7), `${c}/${d}`, "w", { tone: "c", bold: true }));
    els.push(seg(v(A, 0.3), v(A, 2.0), { tone: "warn", dash: true, thin: true }));
    els.push(vec(v(0, -0.2), v(L + 0.5, -0.2), { tone: "ink", thin: true }));
    for (let i = 0; i <= 10; i++) els.push(seg(v(i, -0.28), v(i, -0.12), { tone: "muted", thin: true }));
    els.push(txt(v(0, -0.35), "0", "s", { tone: "muted", small: true }), txt(v(L, -0.35), "1", "s", { tone: "muted", small: true }));
    els.push(...pad(-1.5, 2.4, L + 0.6, -1.0));
    const q = frac(a * d, b * c);
    return {
      els,
      readout: [`(${a}/${b}) · (${d}/${c}) = ${q}: miktar, birimin ${q} katı.`, `Denetim: ${q} · ${c}/${d} = ${frac(a, b)}.${(a * d) / (b * c) > a / b ? ` 1’den küçük sayıya bölmek büyüttü: ${q} > ${a}/${b}.` : ""}`],
    };
  },
};

const MISS: [number, number, number, number][] = [[7, 8, 11, 12], [19, 20, 23, 24]];
const missing: FigureDef = {
  caption:
    "Eksik parça karşılaştırması (ölçekli, aynı bütün). 1’e çok yakın iki kesirde bütünden eksik kalan parçaya bakılır: daha az eksik olan daha büyüktür. Aynı sonuç ortak paydayla ve çapraz çarpımla da kurulur; üç yol aynı yönü vermelidir.",
  alt: "Aynı uzunlukta iki şerit; her birinin sonunda eksik kalan tek parça çerçeveyle ayrılmış ve kesir olarak yazılmış.",
  steps: MISS.map(([a, b, c, d]) => `${a}/${b} ile ${c}/${d}`),
  draw: (_, step) => {
    const [a, b, c, d] = MISS[step];
    const L = 9;
    const els: El[] = [];
    const row = (p: number, q: number, y: number, tone: Tone) => {
      els.push(rect(0, y, (p / q) * L, 0.7, tone), rect((p / q) * L, y, L / q, 0.7, "warn", false));
      for (let i = 1; i < q; i++) els.push(seg(v((i / q) * L, y), v((i / q) * L, y + 0.7), { tone: "ink", thin: true }));
      els.push(txt(v(-0.25, y + 0.35), `${p}/${q}`, "w", { tone, bold: true }), txt(v(L + 0.25, y + 0.35), `eksik 1/${q}`, "e", { tone: "warn", small: true }));
    };
    row(a, b, 1.1, "a");
    row(c, d, 0, "c");
    els.push(...pad(-1.6, 2.2, L + 2.8, -0.3));
    const x1 = a * d;
    const x2 = c * b;
    const l = (b * d) / gcd2(b, d);
    return {
      els,
      readout: [
        `Eksikler 1/${b} > 1/${d}: ${c}/${d} daha büyük.`,
        `Ortak payda ${l}: ${(a * l) / b}/${l} < ${(c * l) / d}/${l}. Çapraz: ${a} · ${d} = ${x1} < ${x2} = ${c} · ${b}.`,
      ],
    };
  },
};
function gcd2(a: number, b: number): number {
  return b ? gcd2(b, a % b) : a;
}

const REP: { name: string; x: string; ten: [string, string]; hundred: [string, string]; diff: [number, number] }[] = [
  { name: "x = 0,1(6)", x: "0,1666…", ten: ["1", "6"], hundred: ["16", "6"], diff: [15, 90] },
  { name: "x = 1,2(3)", x: "1,2333…", ten: ["12", "3"], hundred: ["123", "3"], diff: [111, 90] },
];
const repeating: FigureDef = {
  caption:
    "Devirli kuyruk hizalaması. Yalnız yinelenen blok sonsuza gider; sabit ön ek devretmez. 10x ve 100x virgülden sonra aynı kuyruğu taşıyacak biçimde seçilir; alt alta çıkarınca kuyruklar birbirini götürür ve tam sayı farkı kalır: 90x = 15.",
  alt: "Virgülleri hizalanmış iki satır rakam hücresi: üstte 100x, altta 10x; virgülden sonraki aynı yinelenen rakamlar ayrı biçimde; altta fark satırı.",
  steps: REP.map((r) => r.name),
  draw: (_, step) => {
    const r = REP[step];
    const w = 0.62;
    const comma = 4;
    const els: El[] = [];
    const row = (label: string, [ip, tail]: [string, string], y: number) => {
      ip.split("").reverse().forEach((ch, i) => els.push(...cell(comma - (i + 1) * w, y, w, 0.75, ch, "a")));
      els.push(txt(v(comma + 0.22, y + 0.08), ",", "c", { tone: "ink", bold: true }));
      for (let i = 0; i < 4; i++) els.push(...cell(comma + 0.44 + i * w, y, w, 0.75, tail, "c"));
      els.push(txt(v(comma + 0.54 + 4 * w, y + 0.37), "…", "e", { tone: "c", bold: true }));
      els.push(txt(v(comma - 2.6, y + 0.37), label, "w", { tone: "ink", bold: true }));
    };
    row("100x", r.hundred, 1.2, );
    row("10x", r.ten, 0.2);
    els.push(seg(v(comma - 3.6, 0.0), v(comma + 0.4 + 5 * w, 0.0), { tone: "ink", thin: true }));
    const [num, den] = r.diff;
    els.push(txt(v(comma - 3.4, -0.45), `90x = ${num}`, "e", { tone: "warn", bold: true }));
    els.push(...pad(comma - 4.4, 2.3, comma + 1.4 + 5 * w, -1.0));
    return {
      els,
      readout: [
        `x = ${r.x}: 100x − 10x = ${r.hundred[0]} − ${r.ten[0]} = ${num}, yani 90x = ${num}.`,
        `x = ${num}/${den} = ${frac(num, den)}.${step === 0 ? " 0,1667 yuvarlanmış farklı bir sayıdır." : " 1,(23) = 122/99 ise başka bir sayıdır."}`,
      ],
    };
  },
};

/* ===================== Üslü sayılar ===================== */

const EXPS = [2, 1, 0, -1, -2];
const ladderPow: FigureDef = {
  caption:
    "Kuvvet merdiveni: üs bir azalırken değer tabana bölünür. a² → a¹ → a⁰ = 1 → a⁻¹ = 1/a: sıfırıncı kuvvet 1, negatif üs karşılıktır, eksi sonuç değildir. Negatif tabanda karşılık alınırken işaret korunur; bölme a ≠ 0 gerektirdiği için 0⁰ bu gerekçeyle tanımlanmaz.",
  alt: "Yan yana beş hücre: üstte a²’den a⁻²’ye kuvvetler, altta değerleri; hücreler arasında tabana bölme okları.",
  param: { label: "a", min: 2, max: 5, step: 1, init: 2 },
  steps: ["pozitif taban", "negatif taban"],
  draw: (a0, step) => {
    const a = step === 1 ? -a0 : a0;
    const w = 1.9;
    const gap = 0.4;
    const els: El[] = [];
    const base = a < 0 ? `(${String(a).replace("-", "−")})` : String(a);
    EXPS.forEach((e, i) => {
      const x = i * (w + gap);
      const val = e >= 0 ? frac(a ** e, 1) : frac(1, a ** -e);
      els.push(...cell(x, 0.9, w, 0.8, `${base}${sup(e)}`, e === 0 ? "warn" : e > 0 ? "a" : "c"));
      els.push(...cell(x, 0, w, 0.8, val, "muted", { fill: false }));
      if (i < EXPS.length - 1) els.push(vec(v(x + w + 0.05, 0.4), v(x + w + gap - 0.05, 0.4), { tone: "muted", thin: true }));
    });
    els.push(txt(v((EXPS.length * (w + gap) - gap) / 2, -0.35), `her ok: ${base}’ye böl`, "s", { tone: "muted", small: true }));
    els.push(...pad(-0.2, 2.0, EXPS.length * (w + gap), -1.0));
    return {
      els,
      readout: [`${base}⁰ = 1 ve ${base}⁻² = 1/${base}² = ${frac(1, a * a)}: sonuç pozitif.`, a < 0 ? `${base}⁻³ = 1/${base}³ = ${frac(1, a ** 3)}: tek üste negatif tabanın işareti kalır.` : `Üsteki eksi tabanın başına eksi koymaz: ${a}⁻¹ = 1/${a}.`],
    };
  },
};

const NEST = ["(a²)³", "a² · a³", "(2³)⁻²"];
const nested: FigureDef = {
  caption:
    "Çarpan sayımı. (a²)³ içinde üç tane a² grubu, toplam 2 · 3 = 6 çarpan vardır; a² · a³ ise iki grubun yan yana gelmesidir, 2 + 3 = 5 çarpan. Parantez ve dış üs kuralı seçer. Negatif dış üs önce karşılığa götürür: (2³)⁻² = 1/(2³)² = 2⁻⁶.",
  alt: "Çerçevelerle gruplanmış harf hücreleri: her çerçeve bir parantez grubu; negatif üs adımında gruplar kesir çizgisinin altında.",
  steps: NEST,
  draw: (_, step) => {
    const els: El[] = [];
    const w = 0.62;
    const groups = step === 0 ? [2, 2, 2] : step === 1 ? [2, 3] : [3, 3];
    const letter = step === 2 ? "2" : "a";
    const y = step === 2 ? -0.6 : 0;
    let x = 0;
    groups.forEach((g, gi) => {
      els.push(rect(x - 0.1, y - 0.1, g * w + 0.2, 0.9, gi % 2 ? "c" : "a", false));
      for (let i = 0; i < g; i++) els.push(...cell(x + i * w, y, w - 0.06, 0.7, letter, gi % 2 ? "c" : "a"));
      x += g * w + 0.5;
      if (step === 1 && gi === 0) {
        els.push(txt(v(x - 0.25, y + 0.35), "·", "c", { tone: "ink", bold: true }));
      }
    });
    if (step === 2) {
      els.push(seg(v(-0.3, 0.55), v(x - 0.2, 0.55), { tone: "ink", thin: true }), txt(v((x - 0.5) / 2, 0.75), "1", "n", { tone: "ink", bold: true }));
    }
    els.push(...pad(-0.5, 1.8, 6.2, -1.0));
    const lines = [
      ["(a²)³ = a² · a² · a²: 6 çarpan, a⁶.", "Üsler çarpılır: 2 · 3 = 6."],
      ["a² · a³: 2 + 3 = 5 çarpan, a⁵.", "Aynı tabanda çarpımda üsler toplanır."],
      ["(2³)⁻² = 1/(2³)²: paydada 6 tane 2.", `2⁻⁶ = 1/${2 ** 6}.`],
    ];
    return { els, readout: lines[step] };
  },
};

const PB_STEPS = ["4³ = 2⁶", "8² = 2⁶", "2⁵’e böl", "2⁷ = 128"];
const primeBase: FigureDef = {
  caption:
    "Asal tabana geçiş: (4³ · 8²)/2⁵. 4 = 2² olduğundan 4³ üç tane 2² grubu, yani altı 2’dir; 8² iki tane 2³ grubu, yine altı 2’dir. Paydadaki beş 2 paydaki beş 2’yi götürür; geriye 6 + 6 − 5 = 7 tane 2 kalır.",
  alt: "Üst satırda gruplanmış 2 hücreleri: önce 4³’ün, sonra 8²’nin grupları; alt satırda paydadaki beş 2; sadeleşen hücreler boş çerçeve.",
  steps: PB_STEPS,
  draw: (_, step) => {
    const els: El[] = [];
    const w = 0.6;
    const top: [number, Tone][] = [];
    for (let g = 0; g < 3; g++) for (let i = 0; i < 2; i++) top.push([g, "a"]);
    if (step >= 1) for (let g = 0; g < 2; g++) for (let i = 0; i < 3; i++) top.push([3 + g, "c"]);
    let x = 0;
    let lastG = -1;
    const xs: number[] = [];
    top.forEach(([g, tone], i) => {
      if (g !== lastG && i) x += 0.25;
      lastG = g;
      const gone = step >= 2 && i < 5;
      els.push(...cell(x, 0.9, w - 0.06, 0.7, "2", gone ? "warn" : tone, { fill: !gone }));
      xs.push(x);
      x += w;
    });
    if (step >= 2) {
      els.push(seg(v(-0.2, 0.6), v(x, 0.6), { tone: "ink", thin: true }));
      for (let i = 0; i < 5; i++) {
        els.push(...cell(xs[i], -0.4, w - 0.06, 0.7, "2", "warn", { fill: step === 2 }));
        els.push(seg(v(xs[i] + (w - 0.06) / 2, 0.32), v(xs[i] + (w - 0.06) / 2, 0.86), { tone: "warn", thin: true }));
      }
    }
    els.push(...pad(-0.3, 2.0, 8.4, -0.8));
    const kept = top.length - (step >= 2 ? 5 : 0);
    const lines = [
      ["4³ = (2²)³ = 2⁶: üç grup, ikişer tane 2.", "Dış üs grubu çoğaltır: 2 · 3 = 6."],
      ["8² = (2³)² = 2⁶: iki grup, üçer tane 2.", "Pay: 2⁶ · 2⁶ = 2¹²."],
      ["Payda 2⁵: beş 2 sadeleşir.", `Kalan: 12 − 5 = ${kept}.`],
      [`2⁶⁺⁶⁻⁵ = 2⁷ = ${2 ** 7}.`, "Büyük çarpımlar hiç açılmadı."],
    ];
    return { els, readout: lines[step] };
  },
};

const logScale: FigureDef = {
  caption:
    "Aynı değer iki ölçekte. Doğrusal doğruda eşit aralıklar eşit farktır; logaritmik doğruda 1, 10, 100, 1000 eşit uzaklıktadır ve her adım 10 kattır. 100 ile 1000’in logaritmik ortası 10²·⁵ ≈ 316,23’tür, 550 değildir. Sürgü 10’un üssünü değiştirir; nokta iki doğruda da aynı sayıyı gösterir.",
  alt: "Üstte 0’dan 1000’e doğrusal sayı doğrusu, altta 1’den 1000’e logaritmik doğru; seçilen değer iki doğruda da işaretli.",
  param: { label: "üs t (X = 10ᵗ)", min: 0, max: 3, step: 0.25, init: 2.5 },
  draw: (t) => {
    const L = 10;
    const X = 10 ** t;
    const els: El[] = [];
    els.push(vec(v(0, 1.6), v(L + 0.4, 1.6), { tone: "a", thin: true }), vec(v(0, 0), v(L + 0.4, 0), { tone: "c", thin: true }));
    for (const n of [0, 250, 500, 750, 1000]) els.push(seg(v((n / 1000) * L, 1.5), v((n / 1000) * L, 1.7), { tone: "muted", thin: true }), txt(v((n / 1000) * L, 1.82), tn(n), "n", { tone: "a", small: true, soft: true }));
    for (let e = 0; e <= 3; e++) els.push(seg(v((e / 3) * L, -0.1), v((e / 3) * L, 0.1), { tone: "muted", thin: true }), txt(v((e / 3) * L, -0.22), tn(10 ** e), "s", { tone: "c", small: true, soft: true }));
    els.push(txt(v(-0.3, 1.6), "doğrusal", "w", { tone: "a", small: true, bold: true }), txt(v(-0.3, 0), "logaritmik", "w", { tone: "c", small: true, bold: true }));
    const xl = (X / 1000) * L;
    const xg = (t / 3) * L;
    els.push(pt(v(xl, 1.6), undefined, "n", "warn"), pt(v(xg, 0), undefined, "n", "warn"));
    els.push(seg(v(xl, 1.5), v(xg, 0.1), { tone: "warn", dash: true, thin: true }));
    els.push(...pad(-2.8, 2.6, L + 0.6, -0.9));
    return {
      els,
      readout: [`log₁₀ X = ${nf(t, 2)} ⇒ X ≈ ${nf(X, 2)}: doğrusal konum %${nf((X / 1000) * 100, 1)}, logaritmik konum %${nf((t / 3) * 100, 1)}.`, "8,1 × 10⁸ için log₁₀ konumu 8 + log₁₀ 8,1 ≈ " + nf(8 + Math.log10(8.1), 4) + "; 10⁹’un üstünde değil."],
    };
  },
};

const Q: [number, string][] = [[2, "q = 2"], [0.5, "q = 1/2"], [1, "q = 1"]];
const growth: FigureDef = {
  caption:
    "Üstel süreçte başlangıç 0. adımdır: miktar N · qᵗ, N = 200. Sütunlar t = 0’dan 6’ya her tamamlanan adımdan sonraki miktardır. q = 2’de her sütun bir öncekinin iki katı (200 · 2⁶ = 12.800), q = 1/2’de yarısıdır, q = 1’de değişmez. Sabit sayı eklemek doğrusal modeldir, üstel değildir.",
  alt: "Yedi sütun: 0’dan 6’ya adımlar; sütun yükseklikleri miktarla orantılı, üstlerinde değerleri yazılı.",
  steps: Q.map(([, s]) => s),
  draw: (_, step) => {
    const q = Q[step][0];
    const vals = Array.from({ length: 7 }, (_, t) => 200 * q ** t);
    const max = Math.max(...vals);
    const H = 4.6;
    const w = 1.6;
    const els: El[] = [seg(v(-0.3, 0), v(7 * w, 0), { tone: "ink", thin: true })];
    vals.forEach((val, t) => {
      const h = Math.max(0.04, (val / max) * H);
      els.push(rect(t * w + 0.25, 0, w - 0.5, h, t === 0 ? "warn" : "a"));
      els.push(txt(v(t * w + w / 2, h + 0.12), nf(val, 3), "n", { tone: "ink", small: true }));
      els.push(txt(v(t * w + w / 2, -0.15), `t = ${t}`, "s", { tone: "muted", small: true, soft: true }));
    });
    els.push(...pad(-0.4, H + 1.0, 7 * w + 0.2, -0.9));
    return {
      els,
      readout: [`N · q⁶ = 200 · ${q === 0.5 ? "(1/2)" : q}⁶ = ${nf(vals[6], 3)}.`, q > 1 ? "q > 1 büyüme: ilk değer bir katlama değildir." : q < 1 ? "0 < q < 1 azalma: her adım bir öncekinin yarısı." : "q = 1: bütün adımlarda aynı değer."],
    };
  },
};

const scientificNormalization: FigureDef = {
  caption: "Katsayı 1 ile 10 arasına geldiğinde 10’un üssü ters yönde değişir. Üst ve alt satırın aynı sonucu vermesi, virgülü kaydırırken değerin korunduğunu gösterir.",
  alt: "Üstte başlangıç katsayısı ve 10’un üssü, altta normalleştirilmiş eşdeğer yazım. İki ok katsayı ve üssün değişimini ayrı ayrı gösterir.",
  steps: ["24 × 10⁴", "0,36 × 10⁸"],
  draw: (_, step) => {
    const coefficient = step === 0 ? power039Fraction(24) : power039Fraction(36, 100);
    const exponent = step === 0 ? 4 : 8;
    const result = power039ScientificInput(coefficient, exponent);
    if (!result.ok || result.normalized.kind !== "normalized") throw new Error("SCIENTIFIC_CASE");
    const normalized = result.normalized;
    const change = normalized.exponent - exponent;
    const start = nf(power039Scalar(coefficient));
    const end = nf(power039Scalar(normalized.coefficient));
    return {
      els: [
        txt(v(0, 2), start, "c", {tone: "a", bold: true}),
        txt(v(4, 2), `10${sup(exponent)}`, "c", {tone: "c", bold: true}),
        txt(v(2, 2), "×", "c"),
        vec(v(0, 1.7), v(0, 0.3), {tone: "a", thin: true}),
        vec(v(4, 1.7), v(4, 0.3), {tone: "c", thin: true}),
        txt(v(0, 0), end, "c", {tone: "a", bold: true}),
        txt(v(4, 0), `10${sup(normalized.exponent)}`, "c", {tone: "c", bold: true}),
        txt(v(2, 0), "×", "c"),
        txt(v(-0.3, 1), change > 0 ? "÷ 10" : "× 10", "w", {tone: "a"}),
        txt(v(4.3, 1), change > 0 ? "üs +1" : "üs −1", "e", {tone: "c"}),
        ...pad(-2, 2.7, 6, -0.8),
      ],
      readout: [
        `${start} × 10${sup(exponent)} = ${end} × 10${sup(normalized.exponent)} = ${tn(power039Scalar(result.value))}`,
        "İki satır aynı sayıyı gösterir. Son katsayının mutlak değeri 1’e eşit veya büyük, 10’dan küçüktür.",
      ],
    };
  },
};

export const mathFigures062TytRational: Record<string, Record<string, FigureDef>> = {
  "tyt-mat-rasyonel-kaynak-035": {
    "Denk kesirler aynı noktaya ulaşır": equivalent,
    "Negatif noktaları uzaklıklarıyla karıştırma": signedOrder,
    "Toplamak için aynı büyüklükte parça üret": commonParts,
    "Bölme kaç tane birim sığdığını sorar": measure,
    "Aynı karşılaştırmayı üç ayrı kanıtla kur": missing,
    "Önce tekrarlayan kuyrukları hizala": repeating,
  },
  "tyt-mat-uslu-sayilar-kaynak-039": {
    "Normalleştirirken miktarı korumak": scientificNormalization,
    "Negatif üs: karşılık, eksi sonuç değil": ladderPow,
    "İç içe kuvvet: çarpım nerede ortaya çıkar?": nested,
    "Asal tabana geçmek neden işe yarar?": primeBase,
    "Çizginin ölçeğini oku: doğrusal ve logaritmik": logScale,
    "Üstel süreçte başlangıç 0. adımdır": growth,
  },
};
