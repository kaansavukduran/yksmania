import { ball, circle, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "../sectionFigures/figureKit";
import type { FoundationLesson } from "./types";

/*
 * TYT Matematik · Temel İnşa ön dersleri. Hiç ön bilgi varsaymaz; her terim
 * ilk geçtiği yerde tanımlanır. Bütün örnek ve sorular özgündür.
 */

const f = (x: number, d = 2) => {
  const r = Math.round(x * 10 ** d) / 10 ** d;
  return (r < 0 ? "−" : "") + String(Math.abs(r)).replace(".", ",");
};
const sgn = (x: number) => (x < 0 ? `−${-x}` : String(x));
const par = (x: number) => (x < 0 ? `(−${-x})` : String(x));
const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });

/** Tam sayı doğrusu: −lim..lim, her birimde çentik ve etiket. */
function numberLine(lim: number, y = 0, k = 0.5, labelEvery = 1): El[] {
  const els: El[] = [vec(v(-lim * k - 0.3, y), v(lim * k + 0.4, y), { thin: true })];
  for (let n = -lim; n <= lim; n++) {
    els.push(seg(v(n * k, y - 0.1), v(n * k, y + 0.1), { thin: true }));
    if (n % labelEvery === 0) els.push(txt(v(n * k, y - 0.4), sgn(n), "c", { small: true, tone: n === 0 ? "ink" : "muted" }));
  }
  return els;
}

// ─── 1 · Dört işlem ve işlem önceliği ────────────────────────────────────────
const groups: FigureDef = {
  caption:
    "Çarpma eşit grupların hızlı toplamıdır. Grup sayısını değiştir: her grupta 4 nokta var. 3 grup × 4 = 4 + 4 + 4 = 12. Bölme bunun tersidir: 12 noktayı 4’erli gruplara ayırınca 3 grup çıkar.",
  alt: "Satırlar hâlinde dizilmiş noktalar; her satır 4 nokta. Satır sayısı kaydırıcıyla değişir.",
  param: { label: "Grup sayısı", min: 1, max: 6, step: 1, init: 3, unit: "", plain: true },
  draw: (g) => {
    const els: El[] = [];
    for (let r = 0; r < g; r++) {
      for (let c = 0; c < 4; c++) els.push(ball(v(c * 0.6, -r * 0.6), 0.16, "b"));
      els.push(txt(v(2.6, -r * 0.6), `${r + 1}. grup: 4`, "e", { small: true, tone: "muted" }));
    }
    els.push(txt(v(-0.4, 0.8), `${g} × 4 = ${g * 4}`, "e", { bold: true, tone: "a" }));
    els.push(txt(v(-0.5, 1.3), " ", "c"), txt(v(5.4, -3.4), " ", "c"));
    return { els, readout: [`${g} × 4 = ${Array(g).fill(4).join(" + ")} = ${g * 4}.`, `Ters yön: ${g * 4} ÷ 4 = ${g} (kaç grup oldu?).`] };
  },
};

const ORDER = ["2 + 3 × (8 − 4) ÷ 2", "2 + 3 × 4 ÷ 2", "2 + 12 ÷ 2", "2 + 6", "8"];
const ORDER_WHY = ["Önce parantez: 8 − 4 = 4.", "Çarpma ve bölme soldan sağa: önce 3 × 4 = 12.", "Sonra 12 ÷ 2 = 6.", "En son toplama: 2 + 6 = 8.", "Sonuç 8."];
const orderFig: FigureDef = {
  caption:
    "Uzun bir işlemde sıra: parantez → üs → çarpma ve bölme (soldan sağa) → toplama ve çıkarma (soldan sağa). Adımları ilerlet: her satırda yalnızca bir işlem yapılır ve sonucu yerine yazılır.",
  alt: "Alt alta yazılmış işlem satırları; her adımda bir işlem daha sadeleşiyor.",
  steps: ["Parantez", "Çarpma", "Bölme", "Toplama", "Sonuç"],
  draw: (_v, step) => {
    const els: El[] = [];
    for (let i = 0; i <= step; i++) {
      els.push(txt(v(0, -i * 0.75), ORDER[i], "e", { bold: i === step, tone: i === step ? "a" : "muted" }));
    }
    els.push(txt(v(-0.3, 0.5), " ", "c"), txt(v(5.6, -3.4), " ", "c"));
    return { els, readout: [ORDER_WHY[step], "Toplama soldaysa bile çarpmadan önce yapılmaz: 2 + 3 × 4 = 14, 20 değil."] };
  },
};

const LTR = [
  { label: "Soldan sağa: (12 ÷ 3) × 2", detail: ["12 ÷ 3 = 4, sonra 4 × 2 = 8.", "Çarpma ve bölme aynı önceliktedir; hangisi soldaysa önce o yapılır."] },
  { label: "Yanlış: 12 ÷ (3 × 2)", detail: ["Bu okuma 12 ÷ 6 = 2 verir.", "Parantez yoksa çarpmayı öne almak işlemi değiştirir."] },
];
const ltrFig: FigureDef = {
  caption:
    "12 ÷ 3 × 2 kaçtır? Çarpma bölmeden “daha önemli” değildir; ikisi aynı basamaktadır ve soldan sağa yapılır. İki okumaya tıkla ve sonuçları karşılaştır.",
  alt: "İki satır: soldan sağa okuma 8 sonucunu, yanlış okuma 2 sonucunu veriyor.",
  picks: LTR.map((p) => ({ label: p.label, title: p.label, detail: p.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [txt(v(0, 1.0), "12 ÷ 3 × 2 = ?", "e", { bold: true })];
    LTR.forEach((p, i) => {
      const y = -i * 1.0, sel = pick === i;
      els.push(rect(-0.32, -0.16, y - 0.3, y + 0.3, i === 0 ? "b" : "warn"));
      els.push(txt(v(0, y), p.label, "e", { small: true, bold: sel, tone: sel ? "a" : "ink", pick: i }));
      els.push(txt(v(4.6, y), i === 0 ? "= 8 ✓" : "= 2 ✗", "e", { small: true, bold: true, tone: i === 0 ? "b" : "warn" }));
    });
    els.push(txt(v(-0.6, 1.5), " ", "c"), txt(v(6.2, -1.5), " ", "c"));
    return { els, readout: [pick >= 0 ? LTR[pick].detail[0] : "Bir okumaya tıkla.", "Aynı basamaktaki işlemler: soldan sağa."] };
  },
};

// ─── 2 · Negatif sayılar ve işaret kuralları ─────────────────────────────────
const walk: FigureDef = {
  caption:
    "Sayı doğrusunda sağ büyük, sol küçüktür. −2’den başla ve eklenen sayıyı değiştir: pozitif sayı eklemek sağa, negatif sayı eklemek sola yürümektir. Ok nereye düşerse sonuç odur.",
  alt: "−8’den 8’e sayı doğrusu; −2 noktasından eklenen sayı kadar sağa ya da sola giden ok.",
  param: { label: "Eklenen sayı", min: -6, max: 6, step: 1, init: 5, unit: "", plain: true },
  draw: (b) => {
    const a = -2, k = 0.5, r = a + b;
    const els: El[] = [...numberLine(8, 0, k, 2)];
    els.push(ball(v(a * k, 0), 0.12, "ink"), txt(v(a * k, 0.45), "başla: −2", "c", { small: true }));
    if (b !== 0) els.push(vec(v(a * k, 0.9), v(r * k, 0.9), { tone: b > 0 ? "b" : "warn", bold: true }), txt(v(((a + r) / 2) * k, 1.3), b > 0 ? `${b} sağa` : `${-b} sola`, "c", { small: true, tone: b > 0 ? "b" : "warn" }));
    els.push(ball(v(r * k, 0), 0.14, "a"));
    els.push(txt(v(-4.6, 1.8), " ", "c"), txt(v(4.8, -0.8), " ", "c"));
    return { els, readout: [`−2 + ${par(b)} = ${sgn(r)}.`, "Mutlak değer = sıfıra uzaklık: |−5| = 5, |5| = 5."] };
  },
};

const SUBS = [
  { label: "3 − 4", detail: ["3 − 4 = 3 + (−4) = −1.", "Çıkarma, çıkarılan sayının zıttını eklemektir."] },
  { label: "3 − (−4)", detail: ["3 − (−4) = 3 + 4 = 7.", "Negatifi çıkarmak, pozitifi eklemekle aynıdır: borcun silinmesi gibi."] },
  { label: "−3 − 4", detail: ["−3 − 4 = −3 + (−4) = −7.", "İkisi de sola: daha da küçülür."] },
  { label: "−3 − (−4)", detail: ["−3 − (−4) = −3 + 4 = 1.", "Sıfırı geçip pozitife çıkar."] },
];
const subFig: FigureDef = {
  caption:
    "Çıkarma = zıttını ekleme. Bir işleme tıkla: çıkarma, eklemeye çevrilir ve sonuç sayı doğrusunda işaretlenir.",
  alt: "Sayı doğrusu ve altında dört çıkarma işlemi; seçilen işlemin sonucu doğruda işaretli.",
  picks: SUBS.map((s) => ({ label: s.label, title: s.detail[0], detail: s.detail })),
  draw: (_v, _s, pick = -1) => {
    const k = 0.5, res = [-1, 7, -7, 1][pick >= 0 ? pick : 0];
    const els: El[] = [...numberLine(8, 0, k, 2), ball(v(res * k, 0), 0.14, "a"), txt(v(res * k, 0.45), sgn(res), "c", { small: true, bold: true, tone: "a" })];
    SUBS.forEach((s, i) => els.push(txt(v(-4.2 + i * 2.3, -1.2), s.label, "e", { small: true, bold: pick === i, tone: pick === i ? "a" : "ink", pick: i })));
    els.push(txt(v(-4.6, 1.0), " ", "c"), txt(v(5.0, -1.5), " ", "c"));
    return { els, readout: [pick >= 0 ? SUBS[pick].detail[0] : "Bir işleme tıkla (varsayılan 3 − 4).", "Önce “− (−” görürsen “+” yap."] };
  },
};

const SIGNS = [
  { label: "(+) × (+)", r: "+", ex: "3 × 2 = 6" },
  { label: "(+) × (−)", r: "−", ex: "3 × (−2) = −6" },
  { label: "(−) × (+)", r: "−", ex: "(−3) × 2 = −6" },
  { label: "(−) × (−)", r: "+", ex: "(−3) × (−2) = 6" },
];
const signFig: FigureDef = {
  caption:
    "Çarpma ve bölmede işaret kuralı: aynı işaretler + verir, farklı işaretler − verir. Bir hücreye tıkla: örnek açılır. Çok çarpan varken negatifleri say: çift sayıda negatif +, tek sayıda negatif − verir.",
  alt: "İki satır iki sütunlu işaret tablosu: (+)(+) = +, (+)(−) = −, (−)(+) = −, (−)(−) = +.",
  picks: SIGNS.map((s) => ({ label: s.label, title: `${s.label} = ${s.r}`, detail: [s.ex, s.r === "+" ? "İşaretler aynı → sonuç pozitif." : "İşaretler farklı → sonuç negatif.", "Bölme için de aynı kural: (−6) ÷ (−2) = 3."] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    SIGNS.forEach((s, i) => {
      const x = (i % 2) * 3.2, y = -Math.floor(i / 2) * 1.4, sel = pick === i;
      els.push(rect(x, x + 2.9, y - 0.55, y + 0.55, s.r === "+" ? "b" : "warn"));
      els.push(txt(v(x + 0.2, y + 0.2), s.label, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }));
      els.push(txt(v(x + 0.2, y - 0.25), `sonuç ${s.r}`, "e", { small: true, tone: "muted" }));
    });
    els.push(txt(v(-0.3, 0.9), " ", "c"), txt(v(6.4, -2.2), " ", "c"));
    return { els, readout: [pick >= 0 ? SIGNS[pick].ex : "Bir hücreye tıkla.", "(−1)·(−1)·(−1) = −1: üç negatif, tek sayı."] };
  },
};

// ─── 3 · Kesirler ────────────────────────────────────────────────────────────
const strip = (x0: number, y: number, w: number, n: number, k: number, tone: Tone, h = 0.5): El[] => {
  const els: El[] = [];
  for (let i = 0; i < n; i++) els.push(rect(x0 + (i * w) / n, x0 + ((i + 1) * w) / n, y - h / 2, y + h / 2, i < k ? tone : "muted", i < k));
  return els;
};
const equiv: FigureDef = {
  caption:
    "Kesir, bir bütünün eşit parçalarından kaç tanesini aldığımızı söyler: pay (üstteki sayı) alınan parça, payda (alttaki sayı) bütünün kaç eşit parçaya bölündüğü. Genişletme katsayısını değiştir: 2/3’ün pay ve paydası aynı sayıyla çarpılır, boyalı uzunluk değişmez.",
  alt: "Üstte 3 parçaya bölünmüş, 2 parçası boyalı şerit; altında aynı uzunlukta, daha çok parçaya bölünmüş ve aynı uzunluğu boyalı ikinci şerit.",
  param: { label: "Genişletme katsayısı", min: 1, max: 5, step: 1, init: 2, unit: "", plain: true },
  draw: (k) => {
    const W = 6;
    const els: El[] = [...strip(0, 0, W, 3, 2, "b"), ...strip(0, -1.1, W, 3 * k, 2 * k, "a")];
    els.push(txt(v(W + 0.3, 0), "2/3", "e", { bold: true, tone: "b" }), txt(v(W + 0.3, -1.1), `${2 * k}/${3 * k}`, "e", { bold: true, tone: "a" }));
    els.push(seg(v((2 / 3) * W, 0.45), v((2 / 3) * W, -1.55), { dash: true, thin: true, tone: "muted" }));
    els.push(txt(v(-0.3, 0.8), " ", "c"), txt(v(7.6, -1.8), " ", "c"));
    return { els, readout: [`2/3 = (2·${k})/(3·${k}) = ${2 * k}/${3 * k}: aynı uzunluk.`, `Sadeleştirme tersidir: ${2 * k}/${3 * k} → pay ve paydayı ${k}’ye böl → 2/3.`] };
  },
};

const ADD = ["İki kesir", "Ortak payda: 6", "Topla"];
const addFig: FigureDef = {
  caption:
    "1/2 + 1/3: parçalar farklı büyüklükte olduğu için doğrudan toplanamaz. Adımları ilerlet: iki şerit de 6 eşit parçaya bölünür (6, 2 ve 3’ün ortak katı); sonra aynı büyüklükteki parçalar sayılır.",
  alt: "İki şerit: biri yarım, biri üçte bir boyalı; sonra ikisi de altıda birlere bölünüyor ve toplam 5/6 gösteriliyor.",
  steps: ADD,
  draw: (_v, step) => {
    const W = 6;
    const els: El[] = [];
    if (step === 0) els.push(...strip(0, 0, W, 2, 1, "b"), ...strip(0, -0.9, W, 3, 1, "c"), txt(v(W + 0.3, 0), "1/2", "e", { bold: true }), txt(v(W + 0.3, -0.9), "1/3", "e", { bold: true }));
    else if (step === 1) els.push(...strip(0, 0, W, 6, 3, "b"), ...strip(0, -0.9, W, 6, 2, "c"), txt(v(W + 0.3, 0), "3/6", "e", { bold: true }), txt(v(W + 0.3, -0.9), "2/6", "e", { bold: true }));
    else {
      for (let i = 0; i < 6; i++) els.push(rect((i * W) / 6, ((i + 1) * W) / 6, -0.25, 0.25, i < 3 ? "b" : i < 5 ? "c" : "muted", i < 5));
      els.push(txt(v(W + 0.3, 0), "5/6", "e", { bold: true, tone: "a" }));
    }
    els.push(txt(v(-0.3, 0.7), " ", "c"), txt(v(7.4, -1.5), " ", "c"));
    return { els, readout: [step === 0 ? "Farklı büyüklükte parçalar." : step === 1 ? "1/2 = 3/6, 1/3 = 2/6: artık parçalar eşit." : "3/6 + 2/6 = 5/6. Paydalar toplanmaz: 1/2 + 1/3 ≠ 2/5.", "Ortak payda, iki paydanın da tam bölündüğü bir sayıdır."] };
  },
};

const mulFig: FigureDef = {
  caption:
    "2/3 × 3/4 “3/4’ün 2/3’ü” demektir. Kare bir bütünü dikeyde 4, yatayda 3 eşit parçaya böl: 3/4’ü bir yönde, 2/3’ü öbür yönde boya. Çakışan bölge sonucu verir: 12 parçadan 6’sı.",
  alt: "4 sütun 3 satırlık ızgara; 3 sütun bir renkte, 2 satır başka renkte; çakışan 6 hücre koyu.",
  draw: () => {
    const c = 0.9, els: El[] = [];
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 3; j++) {
        const inA = i < 3, inB = j < 2;
        els.push(rect(i * c, (i + 1) * c, -(j + 1) * c, -j * c, inA && inB ? "a" : inA ? "b" : inB ? "c" : "muted", inA || inB));
      }
    els.push(txt(v(1.5 * c, 0.35), "3/4 (sütun)", "c", { small: true, tone: "b" }), txt(v(4 * c + 0.2, -c), "2/3", "e", { small: true, tone: "c" }), txt(v(4 * c + 0.2, -1.5 * c), "(satır)", "e", { small: true, tone: "c" }));
    els.push(txt(v(-0.3, 0.8), " ", "c"), txt(v(5.6, -3.0), " ", "c"));
    return { els, readout: ["2/3 × 3/4 = (2·3)/(3·4) = 6/12 = 1/2.", "Kesirlerde çarpma: pay × pay, payda × payda. Ortak payda gerekmez."] };
  },
};

const divFig: FigureDef = {
  caption:
    "3 ÷ 1/4 “3 bütünün içine 1/4’lük kaç parça sığar?” demektir. Her bütün 4 çeyreğe bölünür: 3 × 4 = 12 parça. Bu yüzden kesre bölmek, kesrin ters çevrilmiş hâliyle çarpmaktır: 3 × 4/1 = 12.",
  alt: "Üç şerit yan yana, her biri dört eşit parçaya bölünmüş; parçalar 1’den 12’ye numaralı.",
  draw: () => {
    const els: El[] = [];
    for (let b = 0; b < 3; b++)
      for (let i = 0; i < 4; i++) {
        const x = b * 2.3 + i * 0.5;
        els.push(rect(x, x + 0.5, -0.3, 0.3, "b"), txt(v(x + 0.25, -0.6), String(b * 4 + i + 1), "c", { small: true, tone: "muted" }));
      }
    els.push(txt(v(-0.3, 0.7), " ", "c"), txt(v(7.0, -1.0), " ", "c"));
    return { els, readout: ["3 ÷ 1/4 = 3 × 4 = 12.", "Kural: a/b ÷ c/d = a/b × d/c (ikinci kesri ters çevir, çarp)."] };
  },
};

// ─── 4 · Ondalık sayılar ─────────────────────────────────────────────────────
const hundred: FigureDef = {
  caption:
    "Ondalık sayı, kesrin 10, 100, 1000 paydalı yazılışıdır. 100 kareli bir bütünde boyalı kare sayısını değiştir: 37 kare = 37/100 = 0,37 = %37. Virgülden sonraki ilk basamak onda birler, ikinci basamak yüzde birlerdir.",
  alt: "10’a 10 kareli ızgara; seçilen sayıda kare satır satır boyalı.",
  param: { label: "Boyalı kare", min: 0, max: 100, step: 1, init: 37, unit: "", plain: true },
  draw: (n) => {
    const c = 0.3, els: El[] = [];
    for (let i = 0; i < 100; i++) {
      const col = i % 10, row = Math.floor(i / 10);
      els.push(rect(col * c, (col + 1) * c, -(row + 1) * c, -row * c, i < n ? "b" : "muted", i < n));
    }
    els.push(txt(v(3.4, -0.6), `${n}/100`, "e", { bold: true, tone: "a" }), txt(v(3.4, -1.2), `= ${f(n / 100)}`, "e", { bold: true }), txt(v(3.4, -1.8), `= %${n}`, "e", { small: true, tone: "muted" }));
    els.push(txt(v(-0.3, 0.4), " ", "c"), txt(v(5.6, -3.2), " ", "c"));
    return { els, readout: [`${n} yüzde bir = ${Math.floor(n / 10)} onda bir + ${n % 10} yüzde bir = ${f(n / 100)}.`, "0,5 ile 0,45: 0,50 > 0,45. Basamak sayısı büyüklük değildir."] };
  },
};

const shift: FigureDef = {
  caption:
    "10 ile çarpmak her basamağı bir sola kaydırır, yani virgül bir sağa geçer; 10’a bölmek tersidir. Kuvveti değiştir: 3,47 sayısı 10, 100 ile çarpılıyor ya da bölünüyor.",
  alt: "3,47 sayısının seçilen 10 kuvvetiyle çarpılmış hâli ve virgülün yer değiştirmesi.",
  param: { label: "10’un kuvveti", min: -2, max: 2, step: 1, init: 1, unit: "", plain: true },
  draw: (p) => {
    const val = 3.47 * 10 ** p;
    const op = p > 0 ? `× ${10 ** p}` : p < 0 ? `÷ ${10 ** -p}` : "× 1";
    const els: El[] = [txt(v(0, 0.6), "3,47", "e", { bold: true }), txt(v(1.6, 0.6), op, "e", { tone: "muted" }), txt(v(0, -0.4), `= ${f(val, 4)}`, "e", { bold: true, tone: "a" })];
    els.push(txt(v(0, -1.2), p > 0 ? `virgül ${p} basamak sağa` : p < 0 ? `virgül ${-p} basamak sola` : "değişmez", "e", { small: true, tone: "muted" }));
    els.push(txt(v(-0.3, 1.1), " ", "c"), txt(v(4.6, -1.6), " ", "c"));
    return { els, readout: [`3,47 ${op} = ${f(val, 4)}.`, "Ondalık bölmede bu kaydırmayı iki sayıya birden uygula: 1,2 ÷ 0,04 = 120 ÷ 4 = 30."] };
  },
};

// ─── 5 · Üslü ve köklü sayılara giriş ────────────────────────────────────────
const powers: FigureDef = {
  caption:
    "Üs, bir sayının kendisiyle kaç kez çarpıldığını söyler: 2⁴ = 2·2·2·2 = 16 (2 taban, 4 üs). Üssü değiştir: üs bir artınca değer 2 katına çıkar, bir azalınca yarıya iner. Bu desen 2⁰ = 1 ve 2⁻¹ = 1/2 sonucunu açıklar.",
  alt: "Seçilen üs için 2’nin kuvveti; sağda değeri ve yarıya inme / iki katına çıkma oku.",
  param: { label: "Üs n", min: -3, max: 5, step: 1, init: 3, unit: "", plain: true },
  draw: (n) => {
    const val = 2 ** n;
    const frac = n < 0 ? `1/${2 ** -n}` : String(val);
    const els: El[] = [];
    for (let m = -3; m <= 5; m++) {
      const x = (m + 3) * 0.75, h = Math.min(2 ** m, 32) * 0.08 + 0.05, on = m === n;
      els.push(rect(x, x + 0.5, 0, h, on ? "a" : "b", true), txt(v(x + 0.25, -0.3), `2${["⁻³", "⁻²", "⁻¹", "⁰", "¹", "²", "³", "⁴", "⁵"][m + 3]}`, "c", { small: true, bold: on, tone: on ? "a" : "ink" }));
    }
    els.push(txt(v(0, 3.4), `2${["⁻³", "⁻²", "⁻¹", "⁰", "¹", "²", "³", "⁴", "⁵"][n + 3]} = ${frac}`, "e", { bold: true, tone: "a" }));
    els.push(txt(v(-0.3, 3.9), " ", "c"), txt(v(7.0, -0.7), " ", "c"));
    return { els, readout: [n > 0 ? `2^${n} = ${Array(n).fill(2).join("·")} = ${val}.` : n === 0 ? "2⁰ = 1: 2¹ = 2’yi 2’ye bölünce 1 kalır." : `2^${n} = 1/2^${-n} = ${frac}: negatif üs ters çevirir, negatif sayı yapmaz.`, "Aynı tabanda çarpma: 2³·2² = 2·2·2·2·2 = 2⁵ (üsler toplanır)."] };
  },
};

const roots: FigureDef = {
  caption:
    "Karekök, “karesi bu sayı olan pozitif sayı nedir?” sorusudur. Bir karenin kenarını değiştir: alan kenar × kenar = kenar²; alanın karekökü kenarı geri verir. √49 = 7, çünkü 7² = 49.",
  alt: "Kenarı seçilen uzunlukta birim karelere bölünmüş kare; kenarda uzunluk, ortada alan yazıyor.",
  param: { label: "Kenar", min: 1, max: 9, step: 1, init: 7, unit: "", plain: true },
  draw: (s) => {
    const c = 3.2 / 9, els: El[] = [];
    for (let i = 0; i < s; i++) for (let j = 0; j < s; j++) els.push(rect(i * c, (i + 1) * c, -(j + 1) * c, -j * c, "b"));
    els.push(txt(v((s * c) / 2, 0.3), `kenar ${s}`, "c", { small: true, bold: true }), txt(v(s * c + 0.3, -(s * c) / 2), `alan ${s * s}`, "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.3, 0.7), " ", "c"), txt(v(5.4, -3.4), " ", "c"));
    return { els, readout: [`${s}² = ${s * s} ⇔ √${s * s} = ${s}.`, "√ işareti yalnız pozitif kökü verir: √9 = 3 (−3 değil)."] };
  },
};

// ─── 6 · Harfli ifade ve terazi ──────────────────────────────────────────────
const TERMS = [
  { label: "2x + 3x", r: "5x", detail: ["Aynı harf, aynı kuvvet: benzer terimler.", "2 tane x + 3 tane x = 5 tane x."] },
  { label: "2x + 3", r: "toplanmaz", detail: ["x bilinmeyen sayı, 3 sabit sayı: türleri farklı.", "2x + 3 ≠ 5x. x = 1 için 2x + 3 = 5 ama 5x = 5 tesadüfen eşit; x = 2 için 7 ≠ 10."] },
  { label: "x · x", r: "x²", detail: ["Aynı sayıyı kendisiyle çarpmak: x².", "x + x = 2x ile karıştırma."] },
  { label: "3(x + 2)", r: "3x + 6", detail: ["Parantezin önündeki çarpan içerideki her terime dağıtılır.", "3x + 2 yazmak 2’yi unutmaktır."] },
];
const termFig: FigureDef = {
  caption:
    "Harf (x), değerini henüz bilmediğimiz bir sayıdır; 3x, “3 tane x” yani 3 × x demektir. Bir ifadeye tıkla: hangi terimlerin birleşebildiği ve en sık hata açılır.",
  alt: "Dört satır: 2x + 3x, 2x + 3, x · x ve 3(x + 2); sağlarında sadeleşmiş hâl.",
  picks: TERMS.map((t) => ({ label: t.label, title: `${t.label} → ${t.r}`, detail: t.detail })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    TERMS.forEach((t, i) => {
      const y = -i * 0.9, sel = pick === i;
      els.push(rect(-0.32, -0.16, y - 0.3, y + 0.3, t.r === "toplanmaz" ? "warn" : "b"));
      els.push(txt(v(0, y), t.label, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }), txt(v(2.6, y), `→ ${t.r}`, "e", { small: true, tone: sel ? "a" : "c" }));
    });
    els.push(txt(v(-0.6, 0.6), " ", "c"), txt(v(5.6, -3.2), " ", "c"));
    return { els, readout: [pick >= 0 ? TERMS[pick].detail[0] : "Bir ifadeye tıkla.", "Bir sadeleştirmeyi denetlemek için x yerine bir sayı yaz ve iki tarafı karşılaştır."] };
  },
};

const BAL = ["2x + 3 = 11", "İki taraftan 3 çıkar", "İki tarafı 2’ye böl", "Kontrol"];
const balance: FigureDef = {
  caption:
    "Denklem bir terazidir: eşittir işaretinin iki yanı dengededir. Adımları ilerlet: her adımda iki tarafa aynı işlemi uygula, böylece denge bozulmaz; sonunda x yalnız kalır. En sonda bulduğun sayıyı ilk denkleme yerleştirip kontrol et.",
  alt: "Kefeli terazi: solda x kutuları ve birlik ağırlıklar, sağda birlik ağırlıklar; adımlarla her iki kefeden aynı ağırlık kalkıyor.",
  steps: BAL,
  draw: (_v, step) => {
    const els: El[] = [seg(v(-3, 0), v(3, 0), { bold: true }), poly([v(-0.3, -1.2), v(0.3, -1.2), v(0, 0)], { fill: "muted", tone: "muted" })];
    const L = step === 0 ? { x: 2, u: 3 } : step === 1 ? { x: 2, u: 0 } : { x: 1, u: 0 };
    const R = step === 0 ? 11 : step === 1 ? 8 : 4;
    for (let i = 0; i < L.x; i++) els.push(rect(-2.8 + i * 0.75, -2.15 + i * 0.75, 0.05, 0.7, "a"), txt(v(-2.475 + i * 0.75, 0.375), "x", "c", { small: true, bold: true }));
    for (let i = 0; i < L.u; i++) els.push(ball(v(-1.2 + i * 0.35, 0.22), 0.14, "c"));
    for (let i = 0; i < R; i++) els.push(ball(v(0.5 + (i % 6) * 0.38, 0.22 + Math.floor(i / 6) * 0.36), 0.14, "c"));
    els.push(txt(v(0, -1.7), step === 3 ? "2·4 + 3 = 11 ✓" : [BAL[0], "2x = 8", "x = 4"][step], "c", { bold: true, tone: "a" }));
    els.push(txt(v(-3.3, 1.5), " ", "c"), txt(v(3.3, -2.1), " ", "c"));
    return { els, readout: [step === 0 ? "Solda 2 kutu + 3 birim, sağda 11 birim." : step === 1 ? "11 − 3 = 8: iki kefeden 3 birim kalktı." : step === 2 ? "8 ÷ 2 = 4: bir kutu 4 birim." : "x = 4 yerine konunca 11 = 11.", "Bir tarafa yaptığını öbür tarafa da yap."] };
  },
};

// ─── 7 · Çarpanlara ayırma: alan modeli ──────────────────────────────────────
const areaFig: FigureDef = {
  caption:
    "(x + a)(x + 3) çarpımını bir dikdörtgenin alanı gibi düşün: kenarlar x + a ve x + 3. Dört parça çıkar: x², ax, 3x ve 3a. a’yı değiştir: toplam x² + (a + 3)x + 3a olur. Çarpanlara ayırma bu parçalardan kenarları geri bulmaktır.",
  alt: "Dört parçalı dikdörtgen: büyük kare x², iki şerit ax ve 3x, küçük dikdörtgen 3a; kenarlarda x, a, x, 3 yazıyor.",
  param: { label: "a", min: 1, max: 4, step: 1, init: 2, unit: "", plain: true },
  draw: (a) => {
    const X = 2.4, u = 0.42, A = a * u, B = 3 * u;
    const els: El[] = [
      rect(0, X, -X, 0, "b"), rect(X, X + B, -X, 0, "c"), rect(0, X, -X - A, -X, "c"), rect(X, X + B, -X - A, -X, "a"),
      txt(v(X / 2, -X / 2), "x²", "c", { bold: true }), txt(v(X + B / 2, -X / 2), "3x", "c", { small: true, bold: true }), txt(v(X / 2, -X - A / 2), `${a}x`, "c", { small: true, bold: true }), txt(v(X + B / 2, -X - A / 2), String(3 * a), "c", { small: true, bold: true }),
      txt(v(X / 2, 0.3), "x", "c", { small: true }), txt(v(X + B / 2, 0.3), "3", "c", { small: true }), txt(v(-0.3, -X / 2), "x", "w", { small: true }), txt(v(-0.3, -X - A / 2), String(a), "w", { small: true }),
    ];
    els.push(txt(v(X + B + 0.5, -1.0), `x² + ${a + 3}x + ${3 * a}`, "e", { bold: true, tone: "a" }));
    els.push(txt(v(-0.8, 0.7), " ", "c"), txt(v(X + B + 3.8, -X - 2.0), " ", "c"));
    return { els, readout: [`(x + ${a})(x + 3) = x² + ${a}x + 3x + ${3 * a} = x² + ${a + 3}x + ${3 * a}.`, `Ters yön: çarpımı ${3 * a}, toplamı ${a + 3} olan iki sayı ${a} ve 3.`] };
  },
};

const PAIRS = [
  { label: "1 · 12", s: 13 }, { label: "2 · 6", s: 8 }, { label: "3 · 4", s: 7 }, { label: "(−3)·(−4)", s: -7 },
];
const pairFig: FigureDef = {
  caption:
    "x² + 7x + 12’yi ayırmak için çarpımı 12, toplamı 7 olan iki sayı aranır. Bir çifte tıkla: çarpımı 12 olan çiftlerden yalnız 3 ve 4’ün toplamı 7’dir, yani x² + 7x + 12 = (x + 3)(x + 4).",
  alt: "Dört çarpan çifti satırı ve her birinin toplamı; toplamı 7 olan satır işaretli.",
  picks: PAIRS.map((p) => ({ label: p.label, title: `${p.label}: toplam ${sgn(p.s)}`, detail: [p.s === 7 ? "Çarpım 12, toplam 7: aranan çift." : `Çarpım 12 ama toplam ${sgn(p.s)} ≠ 7.`, "Kontrol: (x + 3)(x + 4) = x² + 4x + 3x + 12 = x² + 7x + 12."] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [txt(v(0, 0.9), "çarpım 12 · toplam 7?", "e", { small: true, bold: true })];
    PAIRS.forEach((p, i) => {
      const y = -i * 0.75, ok = p.s === 7, sel = pick === i;
      els.push(txt(v(0, y), p.label, "e", { small: true, bold: sel, tone: sel ? "a" : "ink", pick: i }), txt(v(2.4, y), `toplam ${sgn(p.s)}`, "e", { small: true, tone: ok ? "b" : "muted", bold: ok }));
      if (ok) els.push(circle(v(4.6, y), 0.16, { tone: "b", bold: true }));
    });
    els.push(txt(v(-0.4, 1.4), " ", "c"), txt(v(5.2, -2.7), " ", "c"));
    return { els, readout: [pick >= 0 ? (PAIRS[pick].s === 7 ? "3 ve 4: aranan çift." : "Bu çiftin toplamı 7 değil.") : "Bir çifte tıkla.", "Önce çarpımı tutan çiftleri yaz, sonra toplamı kontrol et."] };
  },
};

export const mathFoundations: FoundationLesson[] = [
  {
    id: "temel-mat-islem-onceligi",
    subjectId: "tyt-matematik",
    title: "Dört işlem ve işlem önceliği",
    minutes: 20,
    prepares: ["temel-kavramlar", "sayi-problemleri"],
    goal: "Dört işlemin ne anlama geldiğini ve uzun bir işlemde hangi sırayla ilerleneceğini kavramak.",
    pages: [
      {
        title: "Dört işlem ne yapar?",
        paragraphs: [
          "Toplama bir araya koymaktır (5 + 3: beşe üç ekle). Çıkarma farkı ya da geri almayı anlatır (8 − 3: sekizden üç çıkar).",
          "Çarpma eşit grupların hızlı toplamıdır: 3 × 4, “4’lük 3 grup” yani 4 + 4 + 4 demektir. Bölme eşit paylaştırmadır: 12 ÷ 4, “12’yi 4’erli gruplara ayırınca kaç grup çıkar?” sorusudur.",
        ],
        terms: [["Çarpan", "Çarpılan sayılardan her biri (3 × 4’te 3 ve 4)."], ["Bölüm", "Bölmenin sonucu (12 ÷ 4 = 3’te 3)."]],
        figure: groups,
        predict: { question: "5 × 0 kaçtır? Önce tahmin et.", answer: "0: hiç nokta olmayan 5 grup yine hiç nokta demektir." },
      },
      {
        title: "Uzun işlemde sıra",
        paragraphs: [
          "Birden çok işlem yan yana gelince herkesin aynı sonucu bulması için ortak bir sıra vardır: önce parantez içi, sonra üslü ifadeler, sonra çarpma ve bölme, en son toplama ve çıkarma.",
          "Her satırda yalnız bir işlem yap ve sonucunu yerine yaz. Böylece hangi adımda hata yaptığını sonradan görebilirsin.",
        ],
        terms: [["Parantez", "( ) işaretleri: içindeki işlem önce yapılır."]],
        figure: orderFig,
        predict: { question: "2 + 3 × 4 kaçtır: 20 mi, 14 mü?", answer: "14: çarpma toplamadan önce yapılır (3 × 4 = 12, sonra 2 + 12)." },
      },
      {
        title: "Aynı basamakta soldan sağa",
        paragraphs: [
          "Çarpma ile bölme aynı basamaktadır; toplama ile çıkarma da öyle. Aynı basamaktaki işlemler soldan sağa yapılır.",
          "“Çarpma bölmeden önce gelir” diye bir kural yoktur. 12 ÷ 3 × 2 işleminde önce 12 ÷ 3 = 4, sonra 4 × 2 = 8 bulunur.",
        ],
        figure: ltrFig,
      },
    ],
    examples: [
      { title: "Karışık işlem", given: "20 − 4 × 3 + 6 ÷ 2", steps: ["Çarpma ve bölme önce: 4 × 3 = 12 ve 6 ÷ 2 = 3.", "İfade 20 − 12 + 3 olur.", "Soldan sağa: 20 − 12 = 8, sonra 8 + 3 = 11."], answer: "11", check: "Toplamayı önce yapsaydın 20 − 12 + 3’ü 20 − 15 = 5 bulurdun: soldan sağa kuralı bunu önler." },
      { title: "Parantez ve üs", given: "(5 + 3)² ÷ 4 − 1", steps: ["Parantez: 5 + 3 = 8.", "Üs: 8² = 8 × 8 = 64.", "Bölme: 64 ÷ 4 = 16.", "Çıkarma: 16 − 1 = 15."], answer: "15", check: "Üssü parantezden önce alsaydın 5 + 9 = 14 bulurdun; parantez önce gelir." },
    ],
    checks: [
      { prompt: "18 − 6 ÷ 3 × 2 işleminin sonucu kaçtır?", options: ["8", "14", "17", "4", "12"], answer: 1, explain: "6 ÷ 3 = 2, 2 × 2 = 4, 18 − 4 = 14.", reasons: ["Önce çıkarma yapılmış: (18 − 6) ÷ 3 × 2.", "Doğru sıra: bölme, çarpma (soldan sağa), sonra çıkarma.", "Çarpma bölmeden önce yapılmış: 6 ÷ 6 = 1.", "Yalnız 6 ÷ 3 × 2 hesaplanmış; 18 unutulmuş.", "Yalnız 18 − 6 yapılmış."] },
      { prompt: "3 + 2 × (7 − 3)² işleminin sonucu kaçtır?", options: ["80", "67", "35", "11", "19"], answer: 2, explain: "Parantez 4, üs 16, çarpma 32, toplama 3 + 32 = 35.", reasons: ["Toplama önce yapılmış: 5 × 16.", "Üs çarpımın tamamına uygulanmış: (2 × 4)².", "Doğru.", "Üs unutulmuş: 3 + 2 × 4.", "×2 unutulmuş: 3 + 16."] },
      { prompt: "48 ÷ 4 ÷ 2 işleminin sonucu kaçtır?", options: ["24", "96", "6", "12", "8"], answer: 2, explain: "Soldan sağa: 48 ÷ 4 = 12, 12 ÷ 2 = 6.", reasons: ["Sağdaki bölme önce yapılmış: 48 ÷ 2.", "Bölme çarpma sanılmış.", "Doğru.", "Yalnız ilk bölme yapılmış.", "Bölenler toplanmış: 48 ÷ (4 + 2)."] },
    ],
  },
  {
    id: "temel-mat-negatif-sayilar",
    subjectId: "tyt-matematik",
    title: "Negatif sayılar ve işaret kuralları",
    minutes: 25,
    prepares: ["temel-kavramlar", "tek-cift-isaret", "mutlak-deger"],
    goal: "Negatif sayıları sayı doğrusunda yerleştirmek, toplama–çıkarmayı yürüyüş olarak, çarpma–bölmeyi işaret kuralıyla yapmak.",
    pages: [
      {
        title: "Sayı doğrusu ve yön",
        paragraphs: [
          "Sıfırın solundaki sayılar negatiftir (−1, −2, …): sıfırdan küçüktür. Sayı doğrusunda sağdaki sayı her zaman büyüktür; bu yüzden −1 > −5’tir.",
          "Pozitif sayı eklemek sağa, negatif sayı eklemek sola yürümektir. Sıfıra uzaklığa mutlak değer denir: |−5| = 5.",
        ],
        terms: [["Negatif sayı", "Sıfırdan küçük sayı; başında − işareti vardır."], ["Mutlak değer", "Bir sayının sıfıra uzaklığı; hiçbir zaman negatif değildir."]],
        figure: walk,
        predict: { question: "−8 mi büyüktür, −3 mü?", answer: "−3: sayı doğrusunda daha sağdadır." },
      },
      {
        title: "Çıkarma = zıttını ekleme",
        paragraphs: [
          "Her sayının bir zıttı vardır: 4’ün zıttı −4, −4’ün zıttı 4. Çıkarma işlemi, çıkarılan sayının zıttını eklemektir: 3 − 4 = 3 + (−4).",
          "Bu yüzden “eksi eksi artı yapar”: 3 − (−4) = 3 + 4 = 7.",
        ],
        figure: subFig,
      },
      {
        title: "Çarpma ve bölmede işaret",
        paragraphs: [
          "Aynı işaretli iki sayının çarpımı ve bölümü pozitif, farklı işaretlilerinki negatiftir.",
          "Dikkat: −3² ile (−3)² farklıdır. −3², “3²’nin negatifi” yani −9’dur; (−3)² = (−3)·(−3) = 9’dur. Üs yalnız hemen solundaki sayıya ya da paranteze uygulanır.",
        ],
        figure: signFig,
        predict: { question: "(−2)·(−2)·(−2) pozitif mi negatif mi?", answer: "Negatif: üç negatif çarpan (tek sayı), sonuç −8." },
      },
    ],
    examples: [
      { title: "Toplama yürüyüşü", given: "−7 + 3", steps: ["−7’de dur.", "3 eklemek: 3 birim sağa.", "−7 → −6 → −5 → −4."], answer: "−4", check: "Sonuç −7’den büyük olmalı (sağa gittik): −4 > −7 ✓." },
      { title: "Üç çarpan", given: "(−2) · (−3) · (−1)", steps: ["Negatif sayısı 3 (tek): sonuç negatif.", "Mutlak değerleri çarp: 2 · 3 · 1 = 6.", "İşareti ekle: −6."], answer: "−6", check: "İkişer ikişer: (−2)(−3) = 6, 6 · (−1) = −6 ✓." },
      { title: "Üs tuzağı", given: "−2² + (−2)²", steps: ["−2² = −(2·2) = −4.", "(−2)² = (−2)·(−2) = 4.", "−4 + 4 = 0."], answer: "0", check: "İki terimi ayrı ayrı yazınca tuzak görünür." },
    ],
    checks: [
      { prompt: "−5 − (−8) işleminin sonucu kaçtır?", options: ["−13", "3", "13", "−3", "40"], answer: 1, explain: "−5 − (−8) = −5 + 8 = 3.", reasons: ["İkinci eksi işaretinin anlamı atlanmış.", "Doğru: negatifi çıkarmak pozitifi eklemektir.", "−5 pozitif sanılmış.", "Sonucun işareti ters alınmış.", "Çıkarma çarpma sanılmış."] },
      { prompt: "(−3) · 4 · (−2) çarpımı kaçtır?", options: ["−24", "24", "−1", "1", "14"], answer: 1, explain: "İki negatif (çift): pozitif; 3 · 4 · 2 = 24.", reasons: ["Negatif sayısı yanlış sayılmış.", "Doğru.", "Çarpma toplama sanılmış: −3 + 4 − 2.", "Çarpma toplama sanılmış ve işaret karışmış.", "Sayılar rastgele birleştirilmiş."] },
      { prompt: "−3² + (−2)² işleminin sonucu kaçtır?", options: ["13", "5", "−5", "−13", "1"], answer: 2, explain: "−3² = −9, (−2)² = 4; −9 + 4 = −5.", reasons: ["−3², (−3)² = 9 sanılmış.", "İki terimin işareti ters alınmış.", "Doğru.", "(−2)², −4 sanılmış.", "Üsler unutulmuş: −3 + 4."] },
      { prompt: "−7, −2, 0, 3 ve −10 sayılarından en küçüğü hangisidir?", options: ["−7", "−2", "0", "3", "−10"], answer: 4, explain: "Sayı doğrusunda en solda −10 vardır.", reasons: ["−10, −7’nin solundadır.", "−2 sıfıra yakın, büyüktür.", "0 negatiflerin hepsinden büyüktür.", "3 en büyüktür.", "Doğru: en solda."] },
    ],
  },
  {
    id: "temel-mat-kesirler",
    subjectId: "tyt-matematik",
    title: "Kesirlerle dört işlem ve sadeleştirme",
    minutes: 30,
    prepares: ["rasyonel-sayilar", "kesir-problemleri", "tyt-mat-rasyonel-kaynak-035"],
    goal: "Kesrin bir bütünün eşit parçası olduğunu görmek; genişletme, sadeleştirme ve dört işlemi şeritle açıklamak.",
    pages: [
      {
        title: "Kesir ne anlatır?",
        paragraphs: [
          "Bir pizzayı 3 eşit dilime bölüp 2 dilimini alırsan bütünün 2/3’ünü almış olursun. Alttaki sayı (payda) bütünün kaç eşit parçaya bölündüğünü, üstteki sayı (pay) kaç parçayı aldığını söyler.",
          "Pay ve paydayı aynı sayıyla çarpmak (genişletme) ya da bölmek (sadeleştirme) kesrin değerini değiştirmez; yalnız parçalar incelir ya da kalınlaşır.",
        ],
        terms: [["Pay", "Kesir çizgisinin üstündeki sayı: alınan parça sayısı."], ["Payda", "Kesir çizgisinin altındaki sayı: bütünün eşit parça sayısı."]],
        figure: equiv,
        predict: { question: "18/24 sadeleşince ne olur?", answer: "3/4: pay ve paydayı 6’ya böl." },
      },
      {
        title: "Toplama ve çıkarma: ortak payda",
        paragraphs: [
          "Parçalar aynı büyüklükte değilse sayılamaz. Önce iki kesri de aynı paydaya genişlet (ortak payda), sonra payları topla ya da çıkar; payda aynı kalır.",
          "En sık hata payları ve paydaları ayrı ayrı toplamaktır: 1/2 + 1/3 = 2/5 yanlıştır, çünkü 2/5 yarımdan bile küçüktür.",
        ],
        figure: addFig,
      },
      {
        title: "Çarpma: “nin” işlemi",
        paragraphs: ["Bir kesirle çarpmak, “onun şu kadarı” demektir: 2/3 × 3/4, 3/4’ün 2/3’üdür. Pay payla, payda paydayla çarpılır; ortak payda gerekmez. Çarpmadan önce çapraz sadeleştirme hesabı küçültür."],
        figure: mulFig,
      },
      {
        title: "Bölme: kaç tane sığar?",
        paragraphs: ["Bölme “içine kaç tane sığar?” sorusudur. 3 ÷ 1/4: 3 bütüne kaç çeyrek sığar? Her bütüne 4, toplam 12. Bu yüzden bir kesre bölmek, o kesrin ters çevrilmiş hâliyle çarpmaktır."],
        figure: divFig,
        predict: { question: "1’i 1/2’ye bölersen sonuç 1’den büyük mü küçük mü?", answer: "Büyük: 1’e iki yarım sığar, sonuç 2." },
      },
    ],
    examples: [
      { title: "Farklı paydalı toplama", given: "2/5 + 1/4", steps: ["Ortak payda: 5 ve 4’ün ikisine de bölünen 20.", "2/5 = 8/20 (pay ve payda × 4); 1/4 = 5/20 (× 5).", "8/20 + 5/20 = 13/20."], answer: "13/20", check: "13/20 = 0,65; 2/5 + 1/4 = 0,4 + 0,25 = 0,65 ✓." },
      { title: "Kesre bölme", given: "3/4 ÷ 3/8", steps: ["İkinci kesri ters çevir: 8/3.", "3/4 × 8/3 = 24/12.", "Sadeleştir: 2."], answer: "2", check: "3/8’in 2 katı 6/8 = 3/4 ✓." },
    ],
    checks: [
      { prompt: "1/2 + 1/3 toplamı kaçtır?", options: ["2/5", "5/6", "1/6", "2/6", "3/5"], answer: 1, explain: "3/6 + 2/6 = 5/6.", reasons: ["Paylar ve paydalar ayrı toplanmış.", "Doğru.", "Paydalar çarpılmış, paylar çarpılmış: 1/6.", "Paylar toplanmış, payda 6 alınmış ama genişletme yapılmamış.", "Sayılar karışmış."] },
      { prompt: "18/24 kesrinin en sade hâli hangisidir?", options: ["9/12", "6/8", "3/4", "2/3", "4/3"], answer: 2, explain: "18 ve 24’ün ortak böleni 6: 3/4.", reasons: ["Daha da sadeleşir (3’e bölünebilir).", "Daha da sadeleşir (2’ye bölünebilir).", "Doğru: ortak bölen kalmadı.", "Pay ve payda farklı sayılara bölünmüş.", "Kesir ters çevrilmiş."] },
      { prompt: "2/3 × 9/10 çarpımı kaçtır?", options: ["3/5", "11/13", "18/13", "20/27", "27/20"], answer: 0, explain: "18/30 = 3/5.", reasons: ["Doğru.", "Paylar ve paydalar toplanmış.", "Pay çarpılmış, paydalar toplanmış.", "İkinci kesir ters çevrilip çarpılmış (bölme yapılmış).", "Birinci kesir ters çevrilmiş."] },
      { prompt: "2 ÷ 1/3 işleminin sonucu kaçtır?", options: ["2/3", "6", "1/6", "3/2", "5"], answer: 1, explain: "2 × 3 = 6: iki bütüne altı tane üçte bir sığar.", reasons: ["Bölme çarpma sanılmış.", "Doğru.", "Ters çevirme iki kez yapılmış.", "Sayılar yer değiştirmiş.", "Toplama yapılmış."] },
    ],
  },
  {
    id: "temel-mat-ondalik",
    subjectId: "tyt-matematik",
    title: "Ondalık sayılar",
    minutes: 20,
    prepares: ["rasyonel-sayilar", "yuzde-problemleri", "bilimsel-gosterim-katsayi"],
    goal: "Ondalık sayıyı basamak değeriyle okumak; karşılaştırmak ve dört işlemi virgülü doğru yere koyarak yapmak.",
    pages: [
      {
        title: "Virgülden sonra ne var?",
        paragraphs: [
          "Ondalık sayı 10, 100, 1000 paydalı bir kesrin kısa yazılışıdır: 0,37 = 37/100. Virgülden sonraki ilk basamak onda birler, ikinci basamak yüzde birler basamağıdır.",
          "Karşılaştırırken basamak sayısını eşitle: 0,5 = 0,50 olduğu için 0,5 > 0,45. Daha uzun yazılan sayı daha büyük değildir.",
        ],
        terms: [["Onda bir", "Bir bütünün 10 eşit parçasından biri: 0,1."], ["Yüzde bir", "Bir bütünün 100 eşit parçasından biri: 0,01."]],
        figure: hundred,
      },
      {
        title: "10 ile çarpma ve bölme",
        paragraphs: [
          "10 ile çarpmak virgülü bir basamak sağa, 10’a bölmek bir basamak sola kaydırır; 100 için iki basamak. Toplama ve çıkarmada virgüller alt alta yazılır.",
          "Ondalık çarpmada önce virgülsüz çarp, sonra iki sayıdaki virgülden sonraki basamak sayılarını topla: 0,3 × 0,2 → 3 × 2 = 6, toplam 2 basamak → 0,06. Bölmede iki sayıyı da aynı 10’un kuvvetiyle çarpıp virgülden kurtul.",
        ],
        figure: shift,
        predict: { question: "0,3 × 0,2 = 0,6 mı?", answer: "Hayır, 0,06: iki sayıda toplam iki ondalık basamak var." },
      },
    ],
    examples: [
      { title: "Alt alta toplama", given: "3,5 + 0,25", steps: ["Basamakları eşitle: 3,50 + 0,25.", "Virgüller alt alta: 3,50 + 0,25 = 3,75."], answer: "3,75", check: "3½ + ¼ = 3¾ = 3,75 ✓." },
      { title: "Ondalıkla bölme", given: "1,2 ÷ 0,04", steps: ["İkisini de 100 ile çarp: 120 ÷ 4.", "120 ÷ 4 = 30."], answer: "30", check: "0,04 × 30 = 1,2 ✓." },
    ],
    checks: [
      { prompt: "0,3 × 0,2 çarpımı kaçtır?", options: ["0,6", "0,06", "6", "0,5", "0,006"], answer: 1, explain: "3 × 2 = 6; toplam 2 ondalık basamak: 0,06.", reasons: ["Ondalık basamaklar toplanmamış.", "Doğru.", "Virgüller tamamen unutulmuş.", "Toplama yapılmış.", "Bir basamak fazla kaydırılmış."] },
      { prompt: "1,2 ÷ 0,04 işleminin sonucu kaçtır?", options: ["0,3", "3", "30", "300", "0,03"], answer: 2, explain: "120 ÷ 4 = 30.", reasons: ["Yalnız 1,2 ÷ 4 yapılmış.", "Bir sayı 10, öbürü 100 ile çarpılmış.", "Doğru.", "Bir taraf fazla genişletilmiş.", "Virgül yanlış yöne kaydırılmış."] },
      { prompt: "Hangisi en büyüktür?", options: ["0,45", "0,405", "0,5", "0,099", "0,49"], answer: 2, explain: "Basamakları eşitle: 0,500 en büyük.", reasons: ["0,450 < 0,500.", "0,405 < 0,500.", "Doğru.", "0,099 onda bir bile değil.", "0,490 < 0,500."] },
      { prompt: "2,5 + 0,75 toplamı kaçtır?", options: ["3,25", "2,80", "0,325", "3,5", "10"], answer: 0, explain: "2,50 + 0,75 = 3,25.", reasons: ["Doğru.", "Virgüller alt alta yazılmamış (5 + 75 karışmış).", "Virgül yanlış yere konmuş.", "0,75, 1 gibi yuvarlanmış.", "0,75, 7,5 diye okunmuş."] },
    ],
  },
  {
    id: "temel-mat-uslu-koklu-giris",
    subjectId: "tyt-matematik",
    title: "Üslü ve köklü sayılara giriş",
    minutes: 25,
    prepares: ["uslu-sayilar", "koklu-sayilar", "tyt-mat-uslu-sayilar-kaynak-039"],
    goal: "Üssün tekrarlı çarpma olduğunu, sıfır ve negatif üssün desenden geldiğini, karekökün kareyi geri aldığını görmek.",
    pages: [
      {
        title: "Üs: kaç kez çarpıldı?",
        paragraphs: [
          "2⁴ ifadesinde 2 taban, 4 üstür: 2’yi 4 kez kendisiyle çarp (2·2·2·2 = 16). Üs toplama değildir: 2⁴ ≠ 2·4.",
          "Üs bir azalınca değer tabana bölünür. Bu desen devam edince 2⁰ = 1 ve 2⁻¹ = 1/2 çıkar: negatif üs sayıyı negatif yapmaz, ters çevirir.",
        ],
        terms: [["Taban", "Tekrar tekrar çarpılan sayı."], ["Üs", "Tabanın kaç kez çarpıldığını gösteren küçük sayı."]],
        figure: powers,
        predict: { question: "3⁰ kaçtır?", answer: "1: 3¹ = 3’ü 3’e bölünce 1 kalır." },
      },
      {
        title: "Karekök: kareyi geri al",
        paragraphs: [
          "Bir sayının karesi kendisiyle çarpımıdır: 7² = 49. Karekök bunun tersidir: √49, karesi 49 olan pozitif sayıdır, yani 7.",
          "Karenin alanı kenar²; alanın karekökü kenardır. √ işareti tek başına pozitif kökü gösterir.",
        ],
        figure: roots,
      },
    ],
    examples: [
      { title: "Aynı tabanda çarpma", given: "2³ · 2²", steps: ["2³ = 2·2·2, 2² = 2·2.", "Toplam 5 tane 2 çarpılıyor: 2⁵.", "2⁵ = 32."], answer: "32", check: "8 · 4 = 32 ✓." },
      { title: "Negatif üs", given: "3⁻²", steps: ["Negatif üs ters çevirir: 3⁻² = 1/3².", "3² = 9."], answer: "1/9", check: "3⁻² · 3² = 3⁰ = 1 ve 1/9 · 9 = 1 ✓." },
    ],
    checks: [
      { prompt: "2³ · 2² çarpımı hangisine eşittir?", options: ["2⁶", "4⁵", "2⁵", "4⁶", "2¹"], answer: 2, explain: "Aynı tabanda üsler toplanır: 2⁵ = 32.", reasons: ["Üsler çarpılmış.", "Tabanlar çarpılmış, üsler toplanmış.", "Doğru.", "Hem tabanlar hem üsler çarpılmış.", "Üsler çıkarılmış."] },
      { prompt: "5⁰ kaçtır?", options: ["0", "5", "1", "−5", "1/5"], answer: 2, explain: "Sıfırdan farklı her sayının sıfırıncı kuvveti 1’dir.", reasons: ["Üs sıfır, sonucu sıfır yapmaz.", "Üs 1 sanılmış.", "Doğru.", "Negatif üs gibi düşünülüp işaret değiştirilmiş.", "5⁻¹ ile karıştırılmış."] },
      { prompt: "√81 kaçtır?", options: ["40,5", "9", "−9", "8", "27"], answer: 1, explain: "9² = 81 ve √ pozitif kökü verir.", reasons: ["İkiye bölünmüş.", "Doğru.", "√ işareti yalnız pozitif kökü gösterir.", "8² = 64.", "81 ÷ 3 yapılmış; kök bölme değildir."] },
      { prompt: "(−2)³ kaçtır?", options: ["−6", "8", "−8", "6", "−1/8"], answer: 2, explain: "(−2)(−2)(−2): üç negatif, sonuç −8.", reasons: ["Üs çarpma sanılmış.", "İşaret unutulmuş.", "Doğru.", "Üs çarpma sanılmış ve işaret kaybolmuş.", "Negatif üs ile karıştırılmış."] },
    ],
  },
  {
    id: "temel-mat-harfli-ifade-terazi",
    subjectId: "tyt-matematik",
    title: "Harfli ifade ve bir bilinmeyenli denklem",
    minutes: 25,
    prepares: ["birinci-dereceden-denklemler", "sayi-problemleri", "tyt-mat-dogrusal-denklemler-kaynak-036"],
    goal: "Harfin bilinmeyen bir sayı olduğunu, benzer terimlerin birleştiğini ve denklemin terazi gibi dengede tutularak çözüldüğünü kavramak.",
    pages: [
      {
        title: "Harf neden kullanılır?",
        paragraphs: [
          "Değerini henüz bilmediğimiz sayıya bir harf veririz, çoğunlukla x. 3x, “3 tane x” yani 3 × x demektir; çarpma işareti genellikle yazılmaz.",
          "Yalnız aynı harfi aynı kuvvette taşıyan terimler toplanır (benzer terim): 2x + 3x = 5x, ama 2x + 3 olduğu gibi kalır.",
        ],
        terms: [["Terim", "Toplama ya da çıkarmayla ayrılan her parça (2x + 3’te 2x ve 3)."], ["Katsayı", "Harfin önündeki sayı (5x’te 5)."]],
        figure: termFig,
      },
      {
        title: "Denklem: terazi dengesi",
        paragraphs: [
          "Denklem, eşittir işaretinin iki yanının eşit olduğunu söyleyen cümledir. Amaç x’i yalnız bırakmaktır.",
          "Kural: bir tarafa ne yaparsan öbür tarafa da aynısını yap. Önce sabit sayıları, sonra katsayıyı kaldır; en sonda bulduğun sayıyı denklemde yerine koyup kontrol et.",
        ],
        figure: balance,
        predict: { question: "x + 5 = 12 ise x kaçtır?", answer: "7: iki taraftan 5 çıkar." },
      },
    ],
    examples: [
      { title: "İki adımlı denklem", given: "3x − 5 = 16", steps: ["İki tarafa 5 ekle: 3x = 21.", "İki tarafı 3’e böl: x = 7."], answer: "x = 7", check: "3·7 − 5 = 21 − 5 = 16 ✓." },
      { title: "Parantezli denklem", given: "2(x + 3) = 14", steps: ["Dağıt: 2x + 6 = 14.", "İki taraftan 6 çıkar: 2x = 8.", "2’ye böl: x = 4."], answer: "x = 4", check: "2(4 + 3) = 2·7 = 14 ✓. Kısa yol: iki tarafı önce 2’ye böl: x + 3 = 7." },
    ],
    checks: [
      { prompt: "3x − 5 = 16 denkleminde x kaçtır?", options: ["11/3", "7", "21", "3", "−7"], answer: 1, explain: "3x = 21, x = 7.", reasons: ["5 çıkarılmış (eklenmesi gerekirdi).", "Doğru.", "3’e bölme unutulmuş.", "Yalnız katsayı alınmış.", "İşaret ters alınmış."] },
      { prompt: "2(x + 3) = 14 denkleminde x kaçtır?", options: ["5,5", "4", "8", "7", "11"], answer: 1, explain: "2x + 6 = 14, 2x = 8, x = 4.", reasons: ["Dağıtırken 3 ile 2 çarpılmamış: 2x + 3 = 14.", "Doğru.", "2’ye bölme unutulmuş.", "Yalnız 14 ÷ 2 yapılmış.", "Yalnız 3 çıkarılmış: 14 − 3."] },
      { prompt: "5x + 2x − x ifadesinin sade hâli hangisidir?", options: ["6x", "7x", "8x", "6", "7x²"], answer: 0, explain: "5 + 2 − 1 = 6: 6x.", reasons: ["Doğru.", "−x unutulmuş.", "−x eklenmiş sanılmış.", "x harfi düşürülmüş.", "Terimler çarpılmış gibi kuvvet artırılmış."] },
      { prompt: "x = 3 için 2x² + 1 ifadesinin değeri kaçtır?", options: ["13", "37", "19", "7", "10"], answer: 2, explain: "x² = 9, 2·9 = 18, 18 + 1 = 19.", reasons: ["Üs çarpma sanılmış: 2·(3·2) + 1.", "Önce 2x = 6, sonra karesi alınmış.", "Doğru.", "Üs unutulmuş.", "x² = 9’a yalnız 1 eklenmiş."] },
    ],
  },
  {
    id: "temel-mat-carpanlara-ayirma-alan",
    subjectId: "tyt-matematik",
    title: "Temel çarpanlara ayırma: alan modeli",
    minutes: 25,
    prepares: ["carpanlara-ayirma", "carpanlara-ayirma-ileri"],
    goal: "Dağılma özelliğini dikdörtgen alanıyla görmek; ortak çarpan parantezi ve x² + bx + c ayırmasını çarpım–toplam aramasıyla yapmak.",
    pages: [
      {
        title: "Çarpım bir dikdörtgendir",
        paragraphs: [
          "Kenarları a ve b + c olan bir dikdörtgenin alanı a(b + c)’dir; aynı dikdörtgen iki parçaya bölünürse alan ab + ac olur. Bu eşitliğe dağılma denir.",
          "(x + a)(x + 3) de bir dikdörtgendir: dört parça (x², ax, 3x, 3a) toplanır. Çarpanlara ayırma bu işin tersidir: toplamdan kenarları bulmak.",
        ],
        terms: [["Çarpan", "Çarpılınca ifadeyi veren parçalardan her biri."], ["Ortak çarpan", "Her terimde bulunan sayı ya da harf."]],
        figure: areaFig,
        predict: { question: "6x + 9 ifadesinde her iki terime de bölünen sayı hangisi?", answer: "3: 6x + 9 = 3(2x + 3)." },
      },
      {
        title: "Çarpımı ve toplamı tutan çift",
        paragraphs: [
          "x² + bx + c ifadesini (x + m)(x + n) diye yazmak için m·n = c ve m + n = b olan iki sayı aranır.",
          "Önce çarpımı c olan çiftleri yaz, sonra toplamı b olanı seç; işaretleri de kontrol et. Sonucu geri çarparak doğrula.",
        ],
        figure: pairFig,
      },
    ],
    examples: [
      { title: "Ortak çarpan", given: "4x + 8", steps: ["Her iki terim de 4’e bölünür.", "4x = 4·x, 8 = 4·2.", "4(x + 2)."], answer: "4(x + 2)", check: "4(x + 2) = 4x + 8 ✓." },
      { title: "Üç terimli", given: "x² + 5x + 6", steps: ["Çarpımı 6 olan çiftler: 1·6, 2·3.", "Toplamı 5 olan: 2 ve 3.", "(x + 2)(x + 3)."], answer: "(x + 2)(x + 3)", check: "x² + 3x + 2x + 6 = x² + 5x + 6 ✓." },
    ],
    checks: [
      { prompt: "4x + 8 ifadesinin çarpanlarına ayrılmış hâli hangisidir?", options: ["4(x + 8)", "4(x + 2)", "2(x + 4)", "4x(1 + 2)", "8(x + 1)"], answer: 1, explain: "4 ortak çarpan: 4(x + 2).", reasons: ["8, 4’e bölünmemiş.", "Doğru.", "2 ortak ama 2(x + 4) = 2x + 8 ≠ 4x + 8.", "x her terimde yok.", "4x, 8’e bölünmez."] },
      { prompt: "(x + 1)(x + 4) çarpımı hangisidir?", options: ["x² + 4", "x² + 5x + 4", "x² + 4x + 1", "2x + 5", "x² + 5x + 5"], answer: 1, explain: "x² + 4x + x + 4 = x² + 5x + 4.", reasons: ["Orta terimler unutulmuş.", "Doğru.", "Yalnız bir orta terim alınmış ve sabit yanlış.", "Çarpma toplama sanılmış.", "Sabit terim toplanmış (1 + 4)."] },
      { prompt: "x² + 7x + 12 ifadesinin çarpanlarına ayrılmış hâli hangisidir?", options: ["(x + 2)(x + 6)", "(x + 1)(x + 12)", "(x + 3)(x + 4)", "(x + 7)(x + 12)", "(x − 3)(x − 4)"], answer: 2, explain: "3·4 = 12 ve 3 + 4 = 7.", reasons: ["Çarpım 12 ama toplam 8.", "Çarpım 12 ama toplam 13.", "Doğru.", "Katsayılar doğrudan yazılmış.", "Toplam −7 olur."] },
    ],
  },
];
