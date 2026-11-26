import {
  combinationRows200,
  combinationSection200,
  diceSumRows200,
  factorial,
  multisetCases200,
  multisetCount200,
  pascalRows200,
  permutationRows200,
  permutationSection200,
  binomialSection200,
  probabilitySection200,
  repeatedSection200,
} from "../countingDepth200";
import {
  factorialSection202,
  factorialZeroRows202,
  paritySection202,
  parityRows202,
  primeDecades202,
  primeSection202,
  primesUpTo202,
} from "../numberDepth202";
import {
  parallelAlpha203,
  parallelAngleRows203,
  parallelSection203,
  piText203,
  radicalText203,
  radicalValue203,
  sectorRadius203,
  sectorRows203,
  sectorSection203,
  specialAngleRows203,
  specialAngleSection203,
} from "../geometryDepth203";
import { add, ang, circle, dim, mul, pol, poly, pt, right, seg, sub, ticks, txt, v, type El, type FigureDef, type Tone, type V } from "./figureKit";
import { cell, pad, rect, sector, sup, token, zs } from "./mathFigures060TytKit";
import { tn } from "./mathFigures062TytKit";
import { binomialId, combinationId } from "../../data/supplementalCountingTopics034035";
import { permutationId, repeatedPermutationId } from "../../data/supplementalPermutationTopics032033";
import { probabilityId } from "../../data/supplementalProbabilityTopic036";

/*
 * Derinleştirme tablolarının (0.200–0.203) bölüm figürleri. Her sayı, etiket
 * ve konum bölüm tablosunu üreten aynı dışa aktarılmış fonksiyonlardan
 * gelir; figür yalnız görüntüdür, adım değiştirmek öğrenme kaydı üretmez.
 */

const vp = (k: number, p: number) => {
  let count = 0;
  for (let q = k; q % p === 0 && q > 0; q /= p) count += 1;
  return count;
};

/* ---------- 032 · Permütasyon: sıralı ve sırasız ---------- */

const permutationRows = permutationRows200();
const permutationN = permutationRows.length - 1;
const permutationMaxChosen = Math.max(...permutationRows.map(({ chosen }) => chosen));

export const permutationDepthFigure: FigureDef = {
  caption: `${permutationN} farklı kişiden r tanesi sıraya konur. Üst şeritteki dolu yuvalar sıralı sayıyı, alttaki sütunlar aynı r için sırasız C(${permutationN},r) değerini gösterir. r’yi değiştir: sıralı sayı her yuvayla çarpılarak büyür, sırasız sütunlar ortadan iki yana simetriktir.`,
  alt: `Üstte ${permutationN} yuvalık şerit, ilk r yuvada kalan seçenek sayıları yazılı. Altta r = 0’dan ${permutationN}’ya kadar C(${permutationN},r) sütunları, seçili r sütunu vurgulu.`,
  param: { label: "r", min: 0, max: permutationN, step: 1, init: 3 },
  draw: (r) => {
    const row = permutationRows[r];
    const els: El[] = [];
    const w = 0.9;
    const g = 0.3;
    for (let i = 0; i < permutationN; i++) {
      const x = i * (w + g);
      if (i < r) els.push(...cell(x, 2.4, w, 0.8, String(permutationN - i), "a"));
      else els.push(rect(x, 2.4, w, 0.8, "muted", false));
      if (i < r - 1) els.push(txt(v(x + w + g / 2, 2.8), "·", "c", { bold: true }));
    }
    const bw = 0.62;
    const step = ((permutationN - 1) * (w + g) + w - bw) / permutationN;
    for (const item of permutationRows) {
      const x = item.r * step;
      const h = (1.5 * item.chosen) / permutationMaxChosen;
      const on = item.r === r;
      els.push(rect(x, 0, bw, h, on ? "a" : "muted", on));
      els.push(txt(v(x + bw / 2, h + 0.05), String(item.chosen), "n", { small: true, tone: on ? "a" : "muted", bold: on }));
      els.push(txt(v(x + bw / 2, -0.08), String(item.r), "s", { small: true, tone: "muted", soft: true }));
    }
    els.push(...pad(-0.2, 3.5, permutationN * (w + g), -0.55));
    const factors = Array.from({ length: r }, (_, i) => permutationN - i);
    return {
      els,
      readout: [
        `P(${permutationN},${r}) = ${factors.length ? factors.join("·") : "1"} = ${tn(row.ordered)} sıralı liste.`,
        `${r}! = ${row.inner} iç sıra, C(${permutationN},${r}) = ${tn(row.ordered)}/${row.inner} = ${row.chosen} ekip.`,
      ],
    };
  },
};

/* ---------- 033 · Tekrarlı permütasyon ---------- */

const TYPE_TONES: Tone[] = ["a", "b", "c", "warn"];
export const multisetLetters = (label: string) => (label.includes(",") ? label.split(", ") : [...label]);
export const multisetTypes = (label: string) => {
  const letters = multisetLetters(label);
  const types = [...new Set(letters)];
  return types.map((letter) => ({ letter, count: letters.filter((x) => x === letter).length }));
};

export const repeatedDepthFigure: FigureDef = {
  caption: "Kartlara önce geçici etiket verilir ve n! dizi sayılır. Aynı harfin etiketleri silinince her görünür dizi, tekrar adetlerinin faktöriyelleri çarpımı kadar kez sayılmış olur. Alttaki iki şerit etiketli ve görünür dizi sayılarını aynı ölçekte karşılaştırır.",
  alt: "Üstte kart dizisi, aynı harfler aynı tonda. Ortada her harfin adedi ve faktöriyeli. Altta n! uzunluğunda tam şerit ve görünür dizi sayısı oranında kısa şerit.",
  steps: multisetCases200.map(({ label }) => label),
  draw: (_, step) => {
    const { label, counts } = multisetCases200[step];
    const letters = multisetLetters(label);
    const types = multisetTypes(label);
    const toneOf = (letter: string) => TYPE_TONES[types.findIndex((t) => t.letter === letter)];
    const n = counts.reduce((sum, count) => sum + count, 0);
    const all = factorial(n);
    const visible = multisetCount200(counts);
    const divisor = all / visible;
    const els: El[] = [];
    letters.forEach((letter, i) => els.push(...cell(i * 1.0, 2.6, 0.8, 0.8, letter, toneOf(letter))));
    types.forEach(({ letter }, i) => {
      const count = counts[i];
      els.push(...cell(i * 1.5, 1.4, 1.3, 0.7, `${letter}: ${count}!`, toneOf(letter), { fill: count > 1 }));
    });
    const W = 6;
    els.push(rect(0, 0.3, W, 0.35, "muted"));
    els.push(txt(v(0, 0.7), `${n}! = ${tn(all)} etiketli dizi`, "ne", { small: true }));
    els.push(rect(0, -0.65, (W * visible) / all, 0.35, "a"));
    els.push(txt(v(0, -0.25), `${tn(visible)} görünür dizi`, "ne", { small: true, tone: "a", bold: true }));
    els.push(...pad(-0.2, 3.6, W + 0.2, -0.8));
    const repeated = counts.filter((count) => count > 1).map((count) => `${count}!`);
    return {
      els,
      readout: [
        `${n}!/${repeated.length > 1 ? `(${repeated.join("·")})` : repeated[0]} = ${tn(all)}/${divisor} = ${tn(visible)}.`,
        `Her görünür dizi ${divisor} etiketli dizinin ortak görünüşüdür.`,
      ],
    };
  },
};

/* ---------- 034 · Kombinasyon ---------- */

const combinationRows = combinationRows200();
const combinationN = combinationRows.length - 1;
const combinationMax = Math.max(...combinationRows.map(({ chosen }) => chosen));

export const combinationDepthFigure: FigureDef = {
  caption: `${combinationN} kişiden r kişilik grup seçmek, ${combinationN} − r kişiyi dışarıda bırakmakla aynı karardır. Sütunlar C(${combinationN},r) değerleridir; seçili r ve sağındaki sütunların toplamı en az r üyeli grupların sayısını verir.`,
  alt: `Üstte ${combinationN} kişi; ilk r kişi seçilen, kalanlar dışarıda. Altta r = 0’dan ${combinationN}’ye kadar C(${combinationN},r) sütunları; seçili r ve sağındakiler dolu.`,
  param: { label: "r", min: 0, max: combinationN, step: 1, init: 3 },
  draw: (r) => {
    const row = combinationRows[r];
    const els: El[] = [];
    const gap = 0.85;
    for (let i = 0; i < combinationN; i++) els.push(circle(v(i * gap + 0.3, 3.0), 0.26, i < r ? { tone: "a", fill: "a" } : { tone: "muted" }));
    if (r > 0) els.push(txt(v(((r - 1) * gap) / 2 + 0.3, 2.62), `seçilen ${r}`, "s", { small: true, tone: "a", bold: true }));
    if (r < combinationN) els.push(txt(v(((r + combinationN - 1) * gap) / 2 + 0.3, 2.62), `dışarıda ${combinationN - r}`, "s", { small: true, tone: "muted" }));
    const bw = 0.6;
    for (const item of combinationRows) {
      const x = item.r * gap;
      const h = (1.4 * item.chosen) / combinationMax;
      const tone: Tone = item.r === r ? "a" : item.r > r ? "b" : "muted";
      els.push(rect(x, 0, bw, h, tone, item.r >= r));
      els.push(txt(v(x + bw / 2, h + 0.05), String(item.chosen), "n", { small: true, tone, bold: item.r === r }));
      els.push(txt(v(x + bw / 2, -0.08), String(item.r), "s", { small: true, tone: "muted", soft: true }));
    }
    els.push(...pad(-0.2, 3.45, combinationN * gap, -0.55));
    const terms = combinationRows.slice(r).map(({ chosen }) => chosen);
    return {
      els,
      readout: [
        `C(${combinationN},${r}) = ${row.chosen} = C(${combinationN},${combinationN - r}) = ${row.outside}.`,
        `En az ${r} üyeli grup: ${terms.join(" + ")} = ${row.atLeast}.`,
      ],
    };
  },
};

/* ---------- 035 · Binom: Pascal satırı ve toplamlar ---------- */

const pascalRows = pascalRows200();
const pascalLast = pascalRows.length - 1;

export const binomialDepthFigure: FigureDef = {
  caption: `Pascal üçgeninin 0’dan ${pascalLast}’ya kadar satırları. Seçili satırın katsayıları (a+b)ⁿ açılımının katsayılarıdır. a = b = 1 bütün katsayıları toplar; alt şeritte b = −1 yazınca tek sıradaki katsayılar eksi işaret alır.`,
  alt: "Ortalanmış hücrelerle Pascal üçgeni, seçili satır vurgulu ve sağında toplamı. Üçgenin altında aynı satırın artı ve eksi işaretli katsayıları.",
  param: { label: "n", min: 0, max: pascalLast, step: 1, init: 5 },
  draw: (n) => {
    const els: El[] = [];
    const w = 0.84;
    const h = 0.6;
    const dy = 0.72;
    const cx = (pascalLast * w) / 2;
    for (const { n: k, row } of pascalRows) {
      const on = k === n;
      row.forEach((c, j) => els.push(...cell(cx + (j - k / 2) * w - w / 2 + 0.02, -k * dy, w - 0.04, h, String(c), on ? "a" : "muted", { fill: on })));
    }
    const current = pascalRows[n];
    els.push(txt(v(cx + ((n + 1) / 2) * w + 0.15, -n * dy + h / 2), `toplam ${current.sum}`, "e", { small: true, tone: "a", bold: true }));
    const y = -(pascalLast + 1) * dy - 0.25;
    current.row.forEach((c, j) => {
      const minus = j % 2 === 1;
      els.push(...cell(cx + (j - n / 2) * w - w / 2 + 0.02, y, w - 0.04, h, `${minus ? "−" : "+"}${c}`, minus ? "b" : "c", { fill: true }));
    });
    els.push(txt(v(cx + ((n + 1) / 2) * w + 0.15, y + h / 2), `= ${zs(current.alternating)}`, "e", { small: true, tone: "b", bold: true }));
    els.push(txt(v(cx - ((pascalLast + 1) / 2) * w - 0.1, y + h / 2), "b = −1", "w", { small: true, tone: "muted" }));
    els.push(...pad(-0.6, h + 0.2, pascalLast * w + 2.4, y - 0.2));
    const signed = current.row.map((c, j) => (j === 0 ? String(c) : `${j % 2 ? "−" : "+"} ${c}`)).join(" ");
    return {
      els,
      readout: [
        `(a+b)${sup(n)}: ${current.row.join(" + ")} = ${current.sum} = 2${sup(n)}.`,
        `a = 1, b = −1: ${signed} = ${zs(current.alternating)}.`,
      ],
    };
  },
};

/* ---------- 036 · Olasılık: iki zar ---------- */

const diceRows = diceSumRows200();

export const probabilityDepthFigure: FigureDef = {
  caption: "İki ayırt edilebilir zarın 36 sıralı sonucu eş olasıdır. Toplamı seç: vurgulu hücreler o toplamı veren sıralı çiftlerdir, açık tondaki hücreler daha küçük toplamlardır. Birikimli olasılık iki grubun birlikte sayılmasıdır.",
  alt: "6’ya 6 ızgara; sütunlar birinci zar, satırlar ikinci zar, her hücrede iki zarın toplamı. Seçilen toplamın hücreleri ve daha küçük toplamlar ayrı tonlarda.",
  param: { label: "toplam", min: diceRows[0].sum, max: diceRows[diceRows.length - 1].sum, step: 1, init: 7 },
  draw: (s) => {
    const row = diceRows.find(({ sum }) => sum === s) ?? diceRows[0];
    const els: El[] = [];
    const c = 0.62;
    for (let i = 1; i <= 6; i++) {
      els.push(txt(v((i - 0.5) * c, 0.1), String(i), "n", { small: true, tone: "muted" }));
      els.push(txt(v(-0.1, -(i - 0.5) * c), String(i), "w", { small: true, tone: "muted" }));
      for (let j = 1; j <= 6; j++) {
        const sum = i + j;
        const tone: Tone = sum === s ? "a" : sum < s ? "b" : "muted";
        els.push(...cell((i - 1) * c, -j * c, c, c, String(sum), tone, { fill: sum <= s, bold: sum === s }));
      }
    }
    els.push(txt(v(3 * c, 0.55), "1. zar", "n", { small: true }));
    els.push(txt(v(-0.55, -3 * c), "2. zar", "w", { small: true }));
    els.push(...pad(-1.6, 1.0, 6 * c + 0.2, -6 * c - 0.2));
    return {
      els,
      readout: [
        `Toplam ${row.sum}: ${row.ways} sıralı çift, P = ${row.ways}/36 = ${row.probability}.`,
        `Toplam ≤ ${row.sum}: P = ${row.atMost}.`,
      ],
    };
  },
};

/* ---------- Tek, çift, işaret ---------- */

const parityRows = parityRows202();
const parityTone = (k: number): Tone => (Math.abs(k) % 2 === 0 ? "a" : "b");
const PARITY_STEPS = ["Parite", "(−1)ⁿ", "n²", "n(n+1)"];

export const parityDepthFigure: FigureDef = {
  caption: `Sayı doğrusunda ${zs(parityRows[0].n)}’ten ${parityRows[parityRows.length - 1].n}’e kadar tam sayılar; çift ve tek sayılar iki ayrı tonda. Adımlarda tablonun sütunları sırayla sayıların üstüne yazılır ve her değer kendi paritesinin tonunu alır.`,
  alt: "Yatay sayı doğrusu üzerinde sekiz tam sayı noktası. Seçilen sütuna göre noktaların üstünde parite sözcüğü, artı veya eksi bir çubuğu, kare ya da ardışık çarpım değeri.",
  steps: PARITY_STEPS,
  draw: (_, step) => {
    const gap = 0.9;
    const els: El[] = [seg(v(-0.5, 0), v((parityRows.length - 1) * gap + 0.5, 0), { tone: "ink", thin: true })];
    parityRows.forEach(({ n, parity, unitPower, square, consecutive }, i) => {
      const x = i * gap;
      els.push(pt(v(x, 0), undefined, "n", parityTone(n)));
      els.push(txt(v(x, -0.15), zs(n), "s", { small: true, tone: parityTone(n), bold: true }));
      if (step === 0) els.push(txt(v(x, 0.25), parity, "n", { small: true, tone: parityTone(n) }));
      if (step === 1) {
        els.push(seg(v(x, 1.3), v(x, 1.3 + 0.5 * unitPower), { tone: parityTone(n), bold: true }));
        els.push(txt(v(x, 1.3 + 0.55 * unitPower), zs(unitPower), unitPower > 0 ? "n" : "s", { small: true, tone: parityTone(n) }));
      }
      if (step === 2) els.push(txt(v(x, 0.25), String(square), "n", { small: true, tone: parityTone(square), bold: true }));
      if (step === 3) els.push(txt(v(x, 0.25), zs(consecutive), "n", { small: true, tone: parityTone(consecutive), bold: true }));
    });
    if (step === 1) els.push(seg(v(-0.5, 1.3), v((parityRows.length - 1) * gap + 0.5, 1.3), { tone: "muted", thin: true, dash: true }));
    els.push(...pad(-0.6, 2.2, (parityRows.length - 1) * gap + 0.6, -0.7));
    const list = (f: (r: (typeof parityRows)[number]) => number) => parityRows.map((r) => zs(f(r))).join(", ");
    const odd = parityRows.filter(({ parity }) => parity === "tek").map(({ n }) => zs(n));
    const even = parityRows.filter(({ parity }) => parity === "çift").map(({ n }) => zs(n));
    const readout = [
      [`Tek: ${odd.join(", ")}.`, `Çift: ${even.join(", ")}. Parite işarete bağlı değildir.`],
      [`(−1)ⁿ: ${list((r) => r.unitPower)}.`, "Çift n için 1, tek n için −1."],
      [`n²: ${list((r) => r.square)}.`, "Hiçbiri negatif değil ve her biri n ile aynı paritede."],
      [`n(n+1): ${list((r) => r.consecutive)}.`, "Hepsi çift: ardışık iki tam sayıdan biri çifttir."],
    ][step];
    return { els, readout };
  },
};

/* ---------- Asal sayılar: elek ---------- */

const decades = primeDecades202();
const sieveLimit = decades[decades.length - 1].to;
const sievePrimes = primesUpTo202(decades[decades.length - 1].trialLimit);
const allPrimes = new Set(primesUpTo202(sieveLimit));
const GENITIVE: Record<string, string> = { "0": "ın", "1": "in", "2": "nin", "3": "ün", "4": "ün", "5": "in", "6": "nın", "7": "nin", "8": "in", "9": "un" };
const genitive = (p: number) => `${p}’${GENITIVE[String(p).slice(-1)]}`;
const smallestFactor = (k: number) => sievePrimes.find((p) => k % p === 0 && k !== p);

export const primeDepthFigure: FigureDef = {
  caption: `1’den ${sieveLimit}’ye sayılar onluk satırlarda. Adım adım ⌊√${sieveLimit}⌋ = ${decades[decades.length - 1].trialLimit} sınırına kadar her asalın katları elenir; son adımda kalan sayılar asaldır ve sağ sütun her onluktaki asal adedini verir.`,
  alt: `On sütunlu ve ${decades.length} satırlı sayı ızgarası. Elenen sayılar sönük, o adımda elenenler vurgulu, asallar ayrı tonda; sağda her satırın asal adedi.`,
  steps: [...sievePrimes.map((p) => `${genitive(p)} katları`), "Kalanlar asal"],
  draw: (_, step) => {
    const final = step >= sievePrimes.length;
    const current = final ? Infinity : sievePrimes[step];
    const w = 0.62;
    const h = 0.52;
    const els: El[] = [];
    decades.forEach(({ from, to, primes }, row) => {
      const y = -row * h;
      for (let k = from; k <= to; k++) {
        const x = (k - from) * w;
        const f = smallestFactor(k);
        let tone: Tone = "muted";
        let fill = false;
        if (allPrimes.has(k) && (final || k <= current)) { tone = "a"; fill = true; }
        else if (f !== undefined && f === current) { tone = "warn"; fill = true; }
        else if (f !== undefined && f < current) { tone = "muted"; fill = true; }
        els.push(...cell(x, y, w, h, String(k), tone, { fill, bold: tone === "a", ink: tone === "muted" && fill ? "muted" : "ink" }));
      }
      if (final) els.push(txt(v(10 * w + 0.25, y + h / 2), String(primes.length), "e", { small: true, tone: "a", bold: true }));
    });
    els.push(txt(v(10 * w + 0.25, h + 0.05), "adet", "ne", { small: true, tone: "muted" }));
    els.push(...pad(-0.1, h + 0.45, 10 * w + 0.9, -(decades.length - 1) * h - 0.1));
    if (final) {
      return {
        els,
        readout: [
          `1–${sieveLimit}: ${allPrimes.size} asal. Onluklarda ${decades.map(({ primes }) => primes.length).join(", ")}.`,
          `${sievePrimes.join(", ")} ile bölünmeyen her sayı asaldır.`,
        ],
      };
    }
    const struck = Array.from({ length: sieveLimit }, (_, i) => i + 1).filter((k) => smallestFactor(k) === current);
    return {
      els,
      readout: [
        `${genitive(current)} katlarından daha önce elenmemiş ${struck.length} sayı elenir.`,
        `İlk yeni elenen ${struck[0]} = ${current}·${struck[0] / current}.`,
      ],
    };
  },
};

/* ---------- Faktöriyel: sondaki sıfırlar ---------- */

const zeroRows = factorialZeroRows202();
const zeroMax = zeroRows[zeroRows.length - 1].n;

export const factorialDepthFigure: FigureDef = {
  caption: "n!’in çarpanları 1’den n’ye sayılardır. 5’in katları vurgulu ve altlarındaki her kare bir 5 çarpanıdır; 25 iki kare taşır. Sondaki sıfır sayısı karelerin toplamıdır, çünkü 2 çarpanı her satırda 5’ten fazladır.",
  alt: `1’den ${zeroMax}’a sayılar onluk satırlarda; n’den büyük sayılar sönük. 5’in katı olan hücrelerin altında 5 çarpanı kadar küçük kare.`,
  steps: zeroRows.map(({ n }) => `${n}!`),
  draw: (_, step) => {
    const row = zeroRows[step];
    const w = 0.62;
    const h = 0.5;
    const dy = 0.82;
    const els: El[] = [];
    for (let k = 1; k <= zeroMax; k++) {
      const x = ((k - 1) % 10) * w;
      const y = -Math.floor((k - 1) / 10) * dy;
      const active = k <= row.n;
      const fives = vp(k, 5);
      const tone: Tone = active && fives ? "a" : "muted";
      els.push(...cell(x, y, w, h, String(k), tone, { fill: active && fives > 0, ink: active ? "ink" : "muted", bold: active && fives > 0 }));
      if (active) for (let f = 0; f < fives; f++) els.push(token(x + w / 2 + (f - (fives - 1) / 2) * 0.2, y - 0.15, 0.13, "a"));
    }
    els.push(...pad(-0.1, h + 0.15, 10 * w + 0.1, -Math.ceil(zeroMax / 10 - 1) * dy - 0.3));
    return {
      els,
      readout: [
        `${row.n}!: ⌊${row.n}/5⌋ + ⌊${row.n}/25⌋ = ${row.fives} + ${row.twentyFives} = ${row.zeros} sondaki sıfır.`,
        `${row.n}! içinde ${row.twos} tane 2 var; her 5 bir 2 ile eşleşir.`,
      ],
    };
  },
};

/* ---------- Paralel iki doğru ve kesen ---------- */

const parallelRows = parallelAngleRows203();
const parallelLines = [...new Set(parallelRows.map(({ line }) => line))];
/** Kesenin yukarı yönü: 1. açı (sol ışın ile yukarı kesen arası) α olacak biçimde. */
export const parallelTransversal203 = (): V => pol(1, 180 - parallelAlpha203);
const levelY = 1.5;
export const parallelVertex203 = (line: string): V => {
  const u = parallelTransversal203();
  const y = line === parallelLines[0] ? levelY : -levelY;
  return mul(u, y / u[1]);
};
/** Bir açının köşesi ve iki kolu, tablodaki konum sözcüklerinden. */
export const parallelArms203 = (row: (typeof parallelRows)[number]): [V, V, V] => {
  const o = parallelVertex203(row.line);
  const u = parallelTransversal203();
  const horizontal = add(o, v(row.place.startsWith("sol") ? -1 : 1, 0));
  const vertical = row.place.includes("üst") ? add(o, u) : sub(o, u);
  return [o, horizontal, vertical];
};
const PARALLEL_STEPS = [
  `1. açı verilir: α = ${parallelRows[0].measure}°`,
  `Üst kesişim: 1–4`,
  `Paralellikle alt kesişim: 5–8`,
];

export const parallelDepthFigure: FigureDef = {
  caption: `${parallelLines.join(" ∥ ")} ve bir kesen. 1. açı α = ${parallelAlpha203}° verilir. Doğrusal çift ve ters açı üst kesişimdeki dört açıyı, paralellik alt kesişimdeki dört açıyı verir. α’ya eşit açılar bir tonda, 180° − α’ya eşit açılar diğer tonda çizilir.`,
  alt: "İki yatay paralel doğru ve onları eğik kesen bir doğru. Her kesişimde dört açı numaralı; eşit açılar aynı tonda.",
  steps: PARALLEL_STEPS,
  draw: (_, step) => {
    const u = parallelTransversal203();
    const top = parallelVertex203(parallelLines[0]);
    const bottom = parallelVertex203(parallelLines[1]);
    const els: El[] = [];
    for (const line of parallelLines) {
      const y = parallelVertex203(line)[1];
      els.push(seg(v(-2.7, y), v(2.7, y), { tone: "ink" }), { k: "par", a: v(1.6, y), b: v(2.3, y), n: 1, tone: "muted" });
      els.push(txt(v(2.7, y), line, "e", { small: true, bold: true }));
    }
    els.push(seg(sub(bottom, mul(u, 1.2)), add(top, mul(u, 1.2)), { tone: "ink" }));
    const shown = parallelRows.filter(({ label, line }) => (step === 0 ? label === 1 : step === 1 ? line === parallelLines[0] : true));
    for (const row of shown) {
      const [o, p, q] = parallelArms203(row);
      els.push(ang(o, p, q, String(row.label), { tone: row.equal ? "a" : "b", r: row.equal ? 30 : 22, fill: row.equal }));
    }
    els.push(pt(top, undefined, "n"), pt(bottom, undefined, "n"));
    els.push(...pad(-2.9, levelY + 1.2, 3.3, -levelY - 1.2));
    const equal = shown.filter(({ equal }) => equal);
    const other = shown.filter(({ equal }) => !equal);
    const readout = [`α = ${parallelRows[0].measure}°: ${equal.map(({ label }) => label).join(", ")}.`];
    if (other.length) readout.push(`180° − α = ${other[0].measure}°: ${other.map(({ label }) => label).join(", ")}.`);
    readout.push(step === 2 ? `5–8, d₁ ∥ d₂ olduğu için 1–4’ün yöndeşidir.` : step === 1 ? "2 ve 3, 1 ile doğrusal çift; 4, 1’in ters açısı." : "Diğer yedi açı yalnız bu ölçüden üretilir.");
    return { els, readout };
  },
};

/* ---------- Özel açılar: iki üçgen ---------- */

const specialRows = specialAngleRows203();
const byAngle = (a: number) => {
  const row = specialRows.find(({ angle }) => angle === a);
  if (!row) throw new Error(`özel açı yok: ${a}`);
  return row;
};
const row30 = byAngle(30);
const row45 = byAngle(45);
const row60 = byAngle(60);
/** 30°–60°–90°: H dik köşe, R 30°, Q 60°; P eşkenar üçgenin öteki köşesi. 45°: A dik köşe. */
export const specialTriangles203 = () => {
  const H = v(0, 0);
  const Q = v(radicalValue203(row30.opposite), 0);
  const R = v(0, radicalValue203(row30.adjacent));
  const P = v(-Q[0], 0);
  const A = v(Q[0] + 1.3, 0);
  const B = add(A, v(radicalValue203(row45.adjacent), 0));
  const C = add(A, v(0, radicalValue203(row45.opposite)));
  return { H, Q, R, P, A, B, C };
};

const ratio = (top: string, bottom: string, value: Parameters<typeof radicalText203>[0]) => {
  const raw = `${top}/${bottom}`;
  const simple = radicalText203(value);
  return raw === simple ? raw : `${raw} = ${simple}`;
};

export const specialAngleDepthFigure: FigureDef = {
  caption: `Kenarı ${radicalText203(row30.hypotenuse)} olan eşkenar üçgen yükseklikle ikiye bölünür ve ${[row30.opposite, row30.adjacent, row30.hypotenuse].map(radicalText203).join(" : ")} kenarlı 30°–60°–90° üçgeni çıkar. Sağdaki ikizkenar dik üçgenin kenarları ${[row45.opposite, row45.adjacent, row45.hypotenuse].map(radicalText203).join(" : ")}. Açıyı seç: karşı, komşu ve hipotenüs ayrı tonlarda işaretlenir.`,
  alt: "Solda kesikli çizilmiş eşkenar üçgenin yüksekliğiyle oluşan dik üçgen, sağda dik kenarları eşit ikizkenar dik üçgen; kenar uzunlukları ve açılar yazılı.",
  steps: specialRows.map(({ angle }) => `${angle}°`),
  draw: (_, step) => {
    const { H, Q, R, P, A, B, C } = specialTriangles203();
    const row = specialRows[step];
    const els: El[] = [];
    els.push(poly([P, H, R], { tone: "muted", dash: true, thin: true }));
    els.push(ticks(P, R, 1, "muted"), ticks(Q, R, 1, "muted"));
    const roles = (opp: [V, V], adj: [V, V], hyp: [V, V], active: boolean): El[] => [
      seg(opp[0], opp[1], { tone: active ? "a" : "ink", bold: active }),
      seg(adj[0], adj[1], { tone: active ? "b" : "ink", bold: active }),
      seg(hyp[0], hyp[1], { tone: active ? "c" : "ink", bold: active }),
    ];
    if (row.angle === 30) els.push(...roles([H, Q], [H, R], [Q, R], true));
    else if (row.angle === 60) els.push(...roles([H, R], [H, Q], [Q, R], true));
    else els.push(...roles([H, Q], [H, R], [Q, R], false));
    els.push(...roles([A, C], [A, B], [B, C], row.angle === 45));
    els.push(right(H, Q, R, "muted"), right(A, B, C, "muted"));
    els.push(ang(R, H, Q, `${row30.angle}°`, { tone: row.angle === 30 ? "warn" : "muted", r: 30 }));
    els.push(ang(Q, R, H, `${row60.angle}°`, { tone: row.angle === 60 ? "warn" : "muted", r: 24 }));
    els.push(ang(B, C, A, `${row45.angle}°`, { tone: row.angle === 45 ? "warn" : "muted", r: 24 }));
    const side = (a: V, b: V, value: Parameters<typeof radicalText203>[0], away: V, tone: Tone) => dim(a, b, radicalText203(value), away, tone);
    const t30 = (role: "opp" | "adj" | "hyp"): Tone => (row.angle === 45 ? "muted" : role === "hyp" ? "c" : (role === "opp") === (row.angle === 30) ? "a" : "b");
    els.push(side(H, Q, row30.opposite, R, t30("opp")));
    els.push(side(H, R, row30.adjacent, Q, t30("adj")));
    els.push(side(Q, R, row30.hypotenuse, H, "c"));
    const t45 = (tone: Tone): Tone => (row.angle === 45 ? tone : "muted");
    els.push(side(A, B, row45.adjacent, C, t45("b")), side(A, C, row45.opposite, B, t45("a")), side(B, C, row45.hypotenuse, A, t45("c")));
    els.push(pt(P, "P", "s"), pt(H, "H", "s"), pt(Q, "Q", "s"), pt(R, "R", "n"));
    els.push(pt(A, "A", "s"), pt(B, "B", "s"), pt(C, "C", "n"));
    els.push(...pad(P[0] - 0.3, R[1] + 0.3, B[0] + 0.5, -0.45));
    const [opp, adj, hyp] = [row.opposite, row.adjacent, row.hypotenuse].map(radicalText203);
    return {
      els,
      readout: [
        `sin ${row.angle}° = karşı/hipotenüs = ${ratio(opp, hyp, row.sin)}.`,
        `cos ${row.angle}° = komşu/hipotenüs = ${ratio(adj, hyp, row.cos)}.`,
        `tan ${row.angle}° = karşı/komşu = ${ratio(opp, adj, row.tan)}.`,
      ],
    };
  },
};

/* ---------- Daire dilimi: r = 6 ---------- */

const sectorRows = sectorRows203();
const SECTOR_R = 2.6;
/** Dilim yukarı yöne simetrik açılır: kollar 90° ± α/2 doğrultusunda. */
export const sectorArms203 = (angle: number): [V, V] => [pol(SECTOR_R, 90 - angle / 2), pol(SECTOR_R, 90 + angle / 2)];

export const sectorDepthFigure: FigureDef = {
  caption: `Yarıçap ${sectorRadius203} cm sabit, merkez açı değişir. Açıyı seç: dilim, dairenin açı/360 kesridir. Yay ve dilim alanı bu kesirle büyür; dilim çevresine her açıda aynı iki yarıçap (${2 * sectorRadius203} cm) eklenir.`,
  alt: "Kesikli bir çember içinde yukarı doğru açılan boyalı daire dilimi; kalın yay, iki yarıçap, merkez açı ve yarıçap uzunluğu yazılı.",
  steps: sectorRows.map(({ angle }) => `${angle}°`),
  draw: (_, step) => {
    const row = sectorRows[step];
    const O = v(0, 0);
    const [A, B] = sectorArms203(row.angle);
    const thin = row.angle < 60;
    const alphaSpot = thin ? pol(SECTOR_R + 0.1, 90) : pol(SECTOR_R * (row.angle < 90 ? 0.62 : 0.5), 90);
    const arc = Array.from({ length: 49 }, (_, i) => pol(SECTOR_R, 90 - row.angle / 2 + (row.angle * i) / 48));
    const els: El[] = [
      circle(O, SECTOR_R, { tone: "muted", dash: true, thin: true }),
      sector(O, SECTOR_R, 90 - row.angle / 2, 90 + row.angle / 2, "a"),
      { k: "poly", ps: arc, open: true, tone: "b", bold: true },
      seg(O, A, { tone: "ink" }),
      seg(O, B, { tone: "ink" }),
      ang(O, A, B, undefined, { tone: "ink", reflex: row.angle > 180, r: 22 }),
      // α etiketi dilimin açıortayında (her adımda yukarı): geniş dilimde içeride, ince dilimde yayın hemen dışında.
      txt(alphaSpot, `α = ${row.angle}°`, thin ? "n" : "c", { small: true, bold: true }),
      dim(O, A, `r = ${sectorRadius203}`, B, "muted"),
      txt(pol(SECTOR_R + (thin ? 0.62 : 0.1), 90), `yay ${piText203(row.arcPi)}`, "n", { small: true, tone: "b", bold: true }),
      pt(O, "O", "s"),
      ...pad(-SECTOR_R - 0.4, SECTOR_R + 0.6, SECTOR_R + 0.4, -SECTOR_R - 0.3),
    ];
    return {
      els,
      readout: [
        `Kesir ${row.angle}/360 = ${row.fraction}. Yay = ${piText203(2 * sectorRadius203)}·${row.fraction} = ${piText203(row.arcPi)} cm.`,
        `Alan = ${piText203(sectorRadius203 ** 2)}·${row.fraction} = ${piText203(row.areaPi)} cm². Çevre = ${row.straight} + ${piText203(row.arcPi)} cm.`,
      ],
    };
  },
};

export const depthFigures200: Record<string, Record<string, FigureDef>> = {
  [permutationId]: { [permutationSection200.title]: permutationDepthFigure },
  [repeatedPermutationId]: { [repeatedSection200.title]: repeatedDepthFigure },
  [combinationId]: { [combinationSection200.title]: combinationDepthFigure },
  [binomialId]: { [binomialSection200.title]: binomialDepthFigure },
  [probabilityId]: { [probabilitySection200.title]: probabilityDepthFigure },
  "tek-cift-isaret": { [paritySection202.title]: parityDepthFigure },
  "asal-sayilar": { [primeSection202.title]: primeDepthFigure },
  faktoriyel: { [factorialSection202.title]: factorialDepthFigure },
  "tyt-geo-temel-acilar-031": { [parallelSection203.title]: parallelDepthFigure },
  "tyt-geo-trigonometrik-oranlar-040": { [specialAngleSection203.title]: specialAngleDepthFigure },
  "tyt-geo-daire-040": { [sectorSection203.title]: sectorDepthFigure },
};
