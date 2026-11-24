import { dim, poly, pt, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { cell, factor, fact, gcd, isPrime, lcm, numberLine, pad, rect, sup, table, tn, token, vp } from "./mathFigures062TytKit";

/*
 * TYT Matematik (Forge062) · Aurelia kaynak dersleri: asal sayılar,
 * faktöriyel, EBOB-EKOK. Figürler laboratuvarı tekrarlamaz; bölümdeki çözüm
 * yolunu (deneme tablosu, bölme merdiveni, bölen ızgarası, alan modeli,
 * kopya bütçesi, Öklid kareleri, zaman çizelgesi) gösterir. Her sayı rehber
 * bölümündeki örnekten (97, 60, 12, n² − 9, 10!, 252 ve 198, 36 × 24 …) aynı
 * hesapla üretilir.
 */

const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37];

/* ===================== Asal sayılar ===================== */

const TRIAL_N = [97, 91, 49, 121];
const trialTable: FigureDef = {
  caption:
    "Asallık deneme tablosu. Yalnız p² ≤ n olan asallar denenir; ilk p² > n satırında durulur. 97’de 2, 3, 5 ve 7 kalan bırakır ve 11² = 121 > 97 olduğundan 97 asaldır. 91 = 7 · 13’te 7 kalansız böler. 49 ve 121’de eşitlik nedeniyle 7 ve 11 de denenir.",
  alt: "Dört sütunlu tablo: aday asal p, karesi p², p² ≤ n karşılaştırması ve n’nin p’ye bölümünden kalan. Kalansız bölen satırı ve durma satırı ayrı biçimde işaretli.",
  steps: TRIAL_N.map((n) => `n = ${n}`),
  draw: (_, step) => {
    const n = TRIAL_N[step];
    const rows: { s: string; tone?: Tone; ink?: Tone }[][] = [[{ s: "p" }, { s: "p²" }, { s: "p² ≤ n?" }, { s: "kalan" }]];
    let divisor = 0;
    let stop = 0;
    for (const p of PRIMES) {
      if (p * p > n) {
        stop = p;
        rows.push([{ s: String(p), tone: "muted" }, { s: String(p * p), tone: "muted" }, { s: `hayır, ${p * p} > ${n}`, tone: "muted" }, { s: "dur" }]);
        break;
      }
      const r = n % p;
      if (r === 0 && !divisor) divisor = p;
      const hit = r === 0;
      rows.push([
        { s: String(p), tone: hit ? "warn" : undefined },
        { s: String(p * p) },
        { s: `evet, ${p * p} ≤ ${n}` },
        { s: hit ? "0, böler" : String(r), tone: hit ? "warn" : undefined },
      ]);
    }
    const els: El[] = [...table(0, 0, [1.3, 1.5, 4.2, 2.2], 0.9, rows, "b")];
    els.push(txt(v(4.6, 0.45), `n = ${n}`, "c", { tone: "ink", bold: true }));
    els.push(...pad(-0.2, 1.0, 9.4, -rows.length * 0.9 - 0.2));
    const tried = PRIMES.filter((p) => p < stop).join(", ");
    return {
      els,
      readout: divisor
        ? [`${n} = ${divisor} · ${n / divisor}: bir kalansız bölen bileşikliği kanıtlar.`, `Denenen adaylar ${tried}; ${stop}² = ${stop * stop} > ${n} olduğu için ${stop} denenmez.`]
        : [`${tried} hiçbiri bölmez ve ${stop}² = ${stop * stop} > ${n}: ${n} asaldır.`, "Asal demek için gerekli bütün adaylar elenmelidir."],
    };
  },
};

const LADDER_N = [60, 72, 84];
const ladder: FigureDef = {
  caption:
    "Bölme merdiveni: sayı en küçük asal bölenine bölünerek 1’e indirilir. Soldaki sütun asal çarpanların tekrarlı listesidir. Sağdaki tablo dört ayrı sayacı ayırır: farklı asal türü, türlerin toplamı, tekrarlı çarpan adedi (üslerin toplamı) ve bütün pozitif bölenlerin sayısı.",
  alt: "Solda iki sütunlu merdiven: bölen asal ve kalan bölüm, en altta 1. Sağda dört sayacın değerlerini gösteren iki sütunlu tablo.",
  steps: LADDER_N.map((n) => String(n)),
  draw: (_, step) => {
    const n = LADDER_N[step];
    const fs = factor(n);
    const els: El[] = [];
    let m = n;
    let r = 0;
    const h = 0.82;
    for (const [p, e] of fs)
      for (let i = 0; i < e; i++) {
        els.push(...cell(0, -r * h, 1.1, h, String(m), "muted", { fill: false }));
        els.push(...cell(-1.1, -r * h, 1.1, h, String(p), "a"));
        m /= p;
        r++;
      }
    els.push(...cell(0, -r * h, 1.1, h, "1", "muted", { fill: false }));
    const types = fs.length;
    const sumTypes = fs.reduce((s, [p]) => s + p, 0);
    const copies = fs.reduce((s, [, e]) => s + e, 0);
    const divisors = fs.reduce((s, [, e]) => s * (e + 1), 1);
    const rows: { s: string; tone?: Tone }[][] = [
      [{ s: "sayaç" }, { s: "değer" }],
      [{ s: "farklı asal türü" }, { s: String(types) }],
      [{ s: "türlerin toplamı" }, { s: String(sumTypes) }],
      [{ s: "tekrarlı çarpan adedi" }, { s: String(copies) }],
      [{ s: "pozitif bölen sayısı" }, { s: String(divisors) }],
    ];
    els.push(...table(2.2, h, [4.4, 1.5], 0.86, rows, "b"));
    els.push(...pad(-1.4, 1.1, 8.4, -r * h - 0.3));
    const form = fs.map(([p, e]) => (e > 1 ? `${p}${sup(e)}` : String(p))).join(" · ");
    return {
      els,
      readout: [
        `${n} = ${form}.`,
        `Tür ${types} (${fs.map(([p]) => p).join(" + ")} = ${sumTypes}), tekrar ${copies}, bölen ${fs.map(([, e]) => e + 1).join(" · ")} = ${divisors}.`,
      ],
    };
  },
};

const GRID_N: [number, number][] = [[2, 1], [2, 2], [3, 2]];
const divisorGrid: FigureDef = {
  caption:
    "Bölen ızgarası. 2ᵃ · 3ᵇ sayısının her pozitif böleni 2’nin bir kuvveti (sütun) ile 3’ün bir kuvvetini (satır) bağımsız seçer; hücre sayısı (a + 1)(b + 1) olur. 36 = 2² · 3² için ızgara 3 × 3 = 9 hücredir: 36 = 4 · 9 diye 4 bölen saymak bileşik tabanı yanlış kullanır.",
  alt: "Üst satırda 2’nin kuvvetleri, sol sütunda 3’ün kuvvetleri; kesişim hücrelerinde çarpımlar yani bütün pozitif bölenler.",
  steps: GRID_N.map(([a, b]) => `${2 ** a * 3 ** b} = 2${sup(a)} · 3${sup(b)}`),
  draw: (_, step) => {
    const [a, b] = GRID_N[step];
    const w = 1.5;
    const h = 0.9;
    const els: El[] = [...cell(0, 0, w, h, "×", "muted")];
    const list: number[] = [];
    for (let i = 0; i <= a; i++) els.push(...cell((i + 1) * w, 0, w, h, `2${sup(i)} = ${2 ** i}`, "a"));
    for (let j = 0; j <= b; j++) {
      els.push(...cell(0, -(j + 1) * h, w, h, `3${sup(j)} = ${3 ** j}`, "c"));
      for (let i = 0; i <= a; i++) {
        const d = 2 ** i * 3 ** j;
        list.push(d);
        els.push(...cell((i + 1) * w, -(j + 1) * h, w, h, String(d), "muted", { fill: false }));
      }
    }
    els.push(...pad(-0.2, 1.1, (a + 2) * w + 0.2, -(b + 1) * h - 0.2));
    const n = 2 ** a * 3 ** b;
    return {
      els,
      readout: [
        `(${a} + 1)(${b} + 1) = ${(a + 1) * (b + 1)} bölen: ${list.sort((x, y) => x - y).join(", ")}.`,
        step === 1 ? "36 = 4 · 9 bileşik tabanlarla yazılmıştır; formül yalnız asal tabanlarda uygulanır." : `${n} sayısının bütün bölenleri ızgaradadır; başka bölen yoktur.`,
      ],
    };
  },
};

const SQ_K = [3, 4, 5];
const squareDiff: FigureDef = {
  caption:
    "Kare farkının alan modeli (ölçekli). n × n kareden k × k köşe kesilir; kalan L parçası (n − k) × (n + k) dikdörtgenine yeniden dizilir. n² − k² asal olacaksa küçük çarpan n − k = 1 olmalıdır; bu yalnız aday üretir, sonra öteki çarpanın asal olduğu ayrıca denetlenir.",
  alt: "Solda köşesinden küçük kare kesilmiş büyük kare, sağda aynı alanı taşıyan dikdörtgen; kenar uzunlukları yazılı.",
  param: { label: "n", min: 1, max: 10, step: 1, init: 4 },
  steps: SQ_K.map((k) => `n² − ${k * k}`),
  draw: (n, step) => {
    const k = SQ_K[step];
    const u = 0.42;
    const els: El[] = [];
    const N = n * u;
    const K = k * u;
    if (n <= k) {
      els.push(rect(0, 0, N, N, "a"), rect(N + 1, 0, K, K, "warn", false));
      els.push(dim(v(0, N), v(N, N), String(n), 1), dim(v(N + 1, K), v(N + 1 + K, K), String(k), 1));
      els.push(...pad(-0.3, Math.max(N, K) + 0.9, N + K + 1.4, -0.4));
      return { els, readout: [`n = ${n} ≤ ${k}: n² − ${k * k} = ${n * n - k * k} ≤ 0.`, "Asal sayı 1’den büyük olduğundan pozitif n için n > k gerekir."] };
    }
    els.push(poly([v(0, 0), v(N, 0), v(N, N - K), v(N - K, N - K), v(N - K, N), v(0, N)], { tone: "a", fill: "a", thin: true }));
    els.push(rect(N - K, N - K, K, K, "warn", false));
    els.push(dim(v(0, N), v(N - K, N), String(n - k), 1), dim(v(N - K, N), v(N, N), String(k), 1), dim(v(0, 0), v(0, N), String(n), 1));
    const x0 = N + 1.2;
    const A = (n - k) * u;
    const B = (n + k) * u;
    els.push(rect(x0, 0, B, A, "c"));
    els.push(dim(v(x0, A), v(x0 + B, A), String(n + k), 1), dim(v(x0 + B, 0), v(x0 + B, A), String(n - k), -1));
    els.push(vec(v(N + 0.2, N / 2), v(x0 - 0.2, N / 2), { tone: "muted", thin: true }));
    els.push(...pad(-0.9, N + 0.9, x0 + B + 0.9, -0.4));
    const val = n * n - k * k;
    const prime = isPrime(val);
    return {
      els,
      readout: [
        `${n}² − ${k}² = (${n} − ${k})(${n} + ${k}) = ${n - k} · ${n + k} = ${val}.`,
        n - k > 1
          ? `Küçük çarpan ${n - k} > 1: sonuç bileşiktir.`
          : prime
            ? `n − ${k} = 1 ve ${val} asal: n = ${n} çözümdür.`
            : `n − ${k} = 1 adayı ${val} verir ama ${val} asal değil: çözüm yok.`,
      ],
    };
  },
};

const primePairs: FigureDef = {
  caption:
    "Toplamı s olan asal çiftleri sayı doğrusunda kemerle birleştirilir. s tekse çiftlerden biri tek çift asal olan 2’dir; öteki s − 2 asal değilse çözüm yoktur. s çiftse 2 zorunlu değildir ve birden çok çift olabilir. s = 4 için 2 + 2 tek çifttir; “birbirinden farklı” denirse kalkar.",
  alt: "0’dan s’ye kadar sayı doğrusu; asal sayılar nokta, toplamı s olan her asal çift bir kemerle birleştirilmiş.",
  param: { label: "s", min: 4, max: 30, step: 1, init: 25 },
  draw: (s) => {
    const k = 0.4;
    const primes = PRIMES.filter((p) => p <= s);
    const els: El[] = [...numberLine(0, s, k, 0, [0])];
    if (!isPrime(s)) els.push(txt(v(s * k, -0.2), String(s), "s", { tone: "muted", small: true, soft: true }));
    for (const p of primes) els.push(pt(v(p * k, 0), undefined, "n", "a"), txt(v(p * k, -0.2), String(p), "s", { tone: "a", small: true, soft: true }));
    const pairs: [number, number][] = [];
    for (const p of primes) if (p <= s - p && isPrime(s - p)) pairs.push([p, s - p]);
    pairs.forEach(([p, q], i) => {
      const hgt = 0.5 + i * 0.35;
      if (p === q) {
        els.push(poly([v(p * k - 0.18, 0.1), v(p * k - 0.18, hgt), v(p * k + 0.18, hgt), v(p * k + 0.18, 0.1)], { tone: "c", open: true, bare: true }));
        return;
      }
      const ps = Array.from({ length: 17 }, (_, j) => {
        const t = j / 16;
        return v((p + (q - p) * t) * k, 0.1 + (hgt - 0.1) * Math.sin(Math.PI * t));
      });
      els.push(poly(ps, { tone: i % 2 ? "b" : "c", open: true, bare: true }));
    });
    els.push(...pad(-0.4, 2.4, 30 * k + 0.4, -0.8));
    const list = pairs.map(([p, q]) => `${p} + ${q}`).join(", ");
    const odd = s % 2 === 1;
    return {
      els,
      readout: odd
        ? [pairs.length ? `s = ${s} tek: ${list}; çarpım ${pairs[0][0] * pairs[0][1]}.` : `s = ${s} tek: 2 + ${s - 2} gerekir, ${s - 2} asal değil; çift yok.`, "İki tek sayının toplamı çifttir; tek toplamda 2 zorunludur."]
        : [`s = ${s} çift: ${list}.`, pairs.some(([p, q]) => p === q) ? "Eşit asallı çift, “farklı” koşuluyla kalkar." : "Çift toplamda 2 zorunlu değildir."],
    };
  },
};

/* ===================== Faktöriyel ===================== */

const RATIO: [number, number, string][] = [
  [7, 5, "7!/5!"],
  [3, 5, "3!/5!"],
  [6, 8, "6!/8!"],
  [6, 2, "3 · 4 · 5 · 6"],
];
const ratioStrip: FigureDef = {
  caption:
    "Faktöriyel oranının çarpan şeridi. Pay ve paydanın ortak başlangıç çarpanları (1’den küçük faktöriyele kadar) içi boş kutudur ve sadeleşir; yalnız dolu kutular kalır. Büyük faktöriyeller hiç hesaplanmaz. Ardışık bir çarpımı geri yazarken alt sınırın bir eksiği paydaya gelir: 3 · 4 · 5 · 6 = 6!/2!.",
  alt: "Üst satırda payın 1’den başlayan çarpan kutuları, alt satırda paydanınkiler; ortak kutular boş çerçeve, kalanlar dolu.",
  steps: RATIO.map(([, , s]) => s),
  draw: (_, step) => {
    const [n, m] = RATIO[step];
    const w = 0.85;
    const els: El[] = [];
    const row = (len: number, other: number, y: number, tone: Tone) => {
      for (let i = 1; i <= len; i++) els.push(...cell((i - 1) * w, y, w - 0.08, 0.8, String(i), i <= other ? "muted" : tone, { fill: i > other }));
    };
    row(n, m, 0.3, "a");
    row(m, n, -1.1, "c");
    els.push(txt(v(-0.25, 0.7), `${n}!`, "w", { tone: "a", bold: true }), txt(v(-0.25, -0.7), `${m}!`, "w", { tone: "c", bold: true }));
    els.push(seg(v(-0.1, -0.15), v(Math.max(n, m) * w, -0.15), { tone: "ink", thin: true }));
    els.push(...pad(-1.6, 1.5, 8 * w + 0.2, -1.5));
    const keep = (a: number, b: number) => Array.from({ length: a - b }, (_, i) => a - i);
    const num = n >= m ? keep(n, m) : [];
    const den = m > n ? keep(m, n) : [];
    const val = n >= m ? `${num.join(" · ")} = ${tn(num.reduce((s, x) => s * x, 1))}` : `1/(${den.join(" · ")}) = 1/${den.reduce((s, x) => s * x, 1)}`;
    return {
      els,
      readout: [
        step === 3 ? `3 · 4 · 5 · 6 = 6!/2!: payda alt sınır 3’ün bir eksiği olan 2!’dir; 6!/3! yazarsan 3 çarpanı kaybolur.` : `${n}!/${m}! = ${val}.`,
        `Ünlem içlerini çıkarmak başka bir sayıdır: (${Math.max(n, m)} − ${Math.min(n, m)})! = ${fact(Math.abs(n - m))}.`,
      ],
    };
  },
};

const distribute: FigureDef = {
  caption:
    "Dağıtma kuralının blok modeli. (n + 1)!, n! bloğundan n + 1 tane demektir. Toplamda bir n! bloğu daha gelir: (n + 1)! + n! = (n + 2) · n!. Farkta bir blok çıkar: (n + 1)! − n! = n · n!. Terimi çizip atmak çarpan sadeleştirmek değildir; n! + m! de (n + m)! olmaz.",
  alt: "Yan yana eş n! blokları; ilk n + 1 blok (n + 1)!’i oluşturur, sonda eklenen ya da çıkarılan bir blok ayrı işaretli.",
  param: { label: "n", min: 2, max: 6, step: 1, init: 4 },
  steps: ["(n + 1)! + n!", "(n + 1)! − n!"],
  draw: (n, step) => {
    const w = 0.95;
    const els: El[] = [];
    for (let i = 0; i <= n; i++) {
      const removed = step === 1 && i === n;
      els.push(...cell(i * (w + 0.12), 0, w, 0.9, `${n}!`, removed ? "warn" : "a", { fill: !removed }));
    }
    if (step === 0) els.push(...cell((n + 1) * (w + 0.12) + 0.3, 0, w, 0.9, `${n}!`, "c"));
    const total = (n + 1) * (w + 0.12) - 0.12;
    els.push(seg(v(0, 1.15), v(total, 1.15), { tone: "a", thin: true }), txt(v(total / 2, 1.3), `(${n} + 1)! = ${n + 1} · ${n}!`, "n", { tone: "a", small: true, bold: true }));
    els.push(...pad(-0.3, 2.1, 8 * (w + 0.12) + 0.5, -0.5));
    const f = fact(n);
    return {
      els,
      readout:
        step === 0
          ? [`${n + 1}! + ${n}! = ${n}! · (${n + 1} + 1) = ${tn(f)} · ${n + 2} = ${tn(f * (n + 2))}.`, `(${n + 1}! + ${n}!)/${n}! = ${n + 2}. Çizip atmak yok: 4! + 3! = 30 iken 7! = 5.040.`]
          : [`${n + 1}! − ${n}! = ${n}! · (${n + 1} − 1) = ${n} · ${tn(f)} = ${tn(n * f)}.`, "Çıkan blok, parantezde 1 çıkarmak demektir."],
    };
  },
};

const LEG_P = [2, 3, 5];
const LEVEL_TONES: Tone[] = ["a", "c", "b", "warn"];
const legendre: FigureDef = {
  caption:
    "Kopya sayacının basamakları. 1’den n’ye her sayının üstüne, içindeki p kopyası kadar kare konur. Birinci kat p’nin katlarını (⌊n/p⌋), ikinci kat p²’nin katlarını (⌊n/p²⌋) sayar; ek satırdaki kare yeni sayı değil, aynı sayının ek kopyasıdır. Kat boşaldığında durulur.",
  alt: "Yatayda 1’den n’ye sütunlar; her sütunda o sayının p kopyası kadar üst üste kare. Sağda her katın kare sayısı taban fonksiyonuyla yazılı.",
  param: { label: "n", min: 2, max: 26, step: 1, init: 10 },
  steps: LEG_P.map((p) => `p = ${p}`),
  draw: (n, step) => {
    const p = LEG_P[step];
    const w = 0.42;
    const els: El[] = [...numberLine(0.5, 26.5, w, 0, [])];
    let levels = 0;
    for (let i = 1; i <= n; i++) {
      const e = vp(i, p);
      levels = Math.max(levels, e);
      for (let j = 0; j < e; j++) els.push(token(i * w, 0.3 + j * 0.95, 0.34, LEVEL_TONES[j]));
      if (e) els.push(txt(v(i * w, -0.18), String(i), "s", { tone: "muted", small: true, soft: true }));
    }
    const terms: number[] = [];
    for (let q = p; Math.floor(n / q) > 0; q *= p) terms.push(Math.floor(n / q));
    terms.forEach((t, j) => els.push(txt(v(27 * w, 0.3 + j * 0.95), `⌊${n}/${p}${j ? sup(j + 1) : ""}⌋ = ${t}`, "e", { tone: LEVEL_TONES[j], small: true, bold: true })));
    els.push(...pad(-0.2, 0.3 + 3 * 0.95 + 0.3, 27 * w + 3.4, -0.7));
    const sum = terms.reduce((s, x) => s + x, 0);
    return {
      els,
      readout: [
        terms.length ? `v${p === 2 ? "₂" : p === 3 ? "₃" : "₅"}(${n}!) = ${terms.join(" + ")} = ${sum}.` : `${n} < ${p}: ${n}! içinde ${p} yok, sayaç 0.`,
        `${levels > 1 ? `${p ** 2}’nin katları ikinci kare taşır.` : "Her kare bir asal kopyasıdır."}`,
      ],
    };
  },
};

const BUDGET: [number, string][] = [[12, "12 = 2² · 3"], [18, "18 = 2 · 3²"], [20, "20 = 2² · 5"]];
const budgets: FigureDef = {
  caption:
    "10! içindeki asal kopya bütçeleri: sekiz 2, dört 3, iki 5. Bileşik bölen kendi asal gereksinimleriyle gruplar halinde ayrılır; her satırdaki grup sayısı ⌊bütçe/ihtiyaç⌋’tır. Önce tükenen bütçe (darboğaz) kaç tam bölen kurulabileceğini sınırlar: min.",
  alt: "Gerekli her asal için bir satır kare; kareler bölenin ihtiyacı kadar gruplanmış, gruba girmeyen artık kareler soluk. Satır sonunda grup sayısı.",
  steps: BUDGET.map(([, s]) => s),
  draw: (_, step) => {
    const [d] = BUDGET[step];
    const need = factor(d);
    const els: El[] = [];
    const counts: number[] = [];
    need.forEach(([p, e], r) => {
      const have = vp(fact(10), p);
      const groups = Math.floor(have / e);
      counts.push(groups);
      const y = -r * 1.1;
      els.push(txt(v(-0.3, y), `${p}: ${have} kopya`, "w", { tone: "ink", small: true, bold: true }));
      for (let i = 0; i < have; i++) {
        const g = Math.floor(i / e);
        const inGroup = g < groups;
        els.push(token(i * 0.5 + g * 0.18, y, 0.36, inGroup ? (g % 2 ? "c" : "a") : "muted"));
      }
      els.push(txt(v(8 * 0.5 + 4 * 0.18 + 0.4, y), `${have}/${e} → ${groups}`, "e", { tone: "ink", small: true }));
    });
    els.push(...pad(-3.4, 0.6, 7.2, -need.length * 1.1 + 0.4));
    const min = Math.min(...counts);
    return {
      els,
      readout: [`Bir ${d} için ${need.map(([p, e]) => `${e} tane ${p}`).join(" ve ")} gerekir.`, `En çok min(${counts.join(", ")}) = ${min} tane ${d} ayrılır; ${d}${sup(min + 1)} 10!’i bölmez.`],
    };
  },
};

const zerosAfter: FigureDef = {
  caption:
    "10!/2ᵏ bölümünde son sıfırlar. 10! içinde sekiz 2 ve iki 5 vardır; bölme k tane 2’yi götürür. Her son sıfır bir 2 ile bir 5’in eşleşmesidir; kalan eşleşme sayısı min(8 − k, 2)’dir. k = 8 olunca 5’ler kalsa da hiç son sıfır yoktur.",
  alt: "Üst satırda sekiz 2 karesi, bölmeyle gidenler boş çerçeve; alt satırda iki 5 karesi; eşleşen 2 ve 5 kareleri dikey çizgiyle bağlı.",
  param: { label: "k", min: 0, max: 8, step: 1, init: 7 },
  draw: (k) => {
    const els: El[] = [];
    const two = 8 - k;
    for (let i = 0; i < 8; i++) els.push(...cell(i * 0.8, 0.8, 0.62, 0.62, "2", i < two ? "a" : "warn", { fill: i < two }));
    for (let i = 0; i < 2; i++) els.push(...cell(i * 0.8, -0.8, 0.62, 0.62, "5", "c"));
    const pairs = Math.min(two, 2);
    for (let i = 0; i < pairs; i++) els.push(seg(v(i * 0.8 + 0.31, 0.78), v(i * 0.8 + 0.31, -0.16), { tone: "ink" }));
    els.push(txt(v(6.8, 1.11), "2 kopyası", "e", { tone: "a", small: true }), txt(v(6.8, -0.49), "5 kopyası", "e", { tone: "c", small: true }));
    els.push(...pad(-0.3, 1.8, 9.4, -1.1));
    const q = 3628800 / 2 ** k;
    return { els, readout: [`10!/2${sup(k)} = ${tn(q)}: kalan 2 sayısı ${two}, 5 sayısı 2.`, `Son sıfır sayısı min(${two}, 2) = ${pairs}.`] };
  },
};

/* ===================== EBOB-EKOK ===================== */

const EXP_P = [2, 3, 5];
const exponentBars: FigureDef = {
  caption:
    "72 = 2³ · 3² ve 120 = 2³ · 3 · 5 için her asalın kopyaları tabloda yan yana. EBOB her asalda iki sayının da taşıdığı kopyaları, yani küçük üssü alır; EKOK iki sayının bütün gereksinimini karşılamak için büyük üssü alır. 72’de 5 yoktur: üssü 0’dır ve EBOB’a girmez.",
  alt: "Satırları 72, 120 ve sonuç olan, sütunları 2, 3 ve 5 asalları olan tablo; her hücrede üs kadar kare ve üs sayısı.",
  steps: ["EBOB: küçük üs", "EKOK: büyük üs"],
  draw: (_, step) => {
    const els: El[] = [];
    const res = EXP_P.map((p) => (step === 0 ? Math.min(vp(72, p), vp(120, p)) : Math.max(vp(72, p), vp(120, p))));
    const name = step === 0 ? "EBOB" : "EKOK";
    const rows: [string, number[], Tone][] = [
      ["72", EXP_P.map((p) => vp(72, p)), "a"],
      ["120", EXP_P.map((p) => vp(120, p)), "c"],
      [name, res, "warn"],
    ];
    const W0 = 1.7;
    const CW = 2.5;
    const H = 0.9;
    els.push(...cell(0, 0, W0, H, "üs", "muted"));
    EXP_P.forEach((p, i) => els.push(...cell(W0 + i * CW, 0, CW, H, `asal ${p}`, "b")));
    rows.forEach(([label, es, tone], r) => {
      const y = -(r + 1) * H;
      els.push(...cell(0, y, W0, H, label, tone));
      es.forEach((e, i) => {
        const x = W0 + i * CW;
        els.push(rect(x, y, CW, H, "muted", false));
        for (let j = 0; j < e; j++) els.push(token(x + 0.35 + j * 0.5, y + H / 2, 0.36, tone));
        els.push(txt(v(x + CW - 0.3, y + H / 2), String(e), "c", { tone: "ink", bold: true }));
      });
    });
    els.push(...pad(-0.2, 1.1, W0 + 3 * CW + 0.2, -4 * H - 0.2));
    const val = EXP_P.reduce((s, p, i) => s * p ** res[i], 1);
    return {
      els,
      readout: [
        `${name} = 2${sup(res[0])} · 3${sup(res[1])} · 5${sup(res[2])} = ${val}.`,
        step === 0 ? "“Küçük sayının bütün çarpanları” değil, her asalın küçük üssü." : `Denetim: 24 · 360 = ${tn(24 * 360)} = 72 · 120.`,
      ],
    };
  },
};

const EU: [number, number, number, number][] = [];
{
  let a = 252;
  let b = 198;
  while (b) {
    const q = Math.floor(a / b);
    EU.push([a, b, q, a % b]);
    [a, b] = [b, a % b];
  }
}
const euclid: FigureDef = {
  caption:
    "Öklid algoritmasının kare kesme modeli (ölçekli). 252 × 198 dikdörtgenden kısa kenarlı kareler kesilir; kalan dikdörtgenin kenarları bir sonraki bölmenin bölen ve kalanıdır: a = bq + r ise EBOB(a, b) = EBOB(b, r). Kalan 0 olunca son kare kenarı 18 EBOB’dur.",
  alt: "Büyük dikdörtgen içinde adım adım kesilen kareler: önce 198’lik bir kare, sonra üç 54’lük, bir 36’lık ve iki 18’lik kare; her kare kenar uzunluğuyla yazılı.",
  steps: EU.map(([a, b, q, r]) => `${a} = ${b} · ${q} + ${r}`),
  draw: (_, step) => {
    const k = 0.04;
    const els: El[] = [rect(0, 0, 252 * k, 198 * k, "muted", false)];
    // Dikdörtgen kalan bölgesi: (x, y, w, h); kareler uzun kenar boyunca dizilir.
    let x = 0;
    let y = 0;
    let w = 252;
    let h = 198;
    const tones: Tone[] = ["a", "c", "b", "warn"];
    for (let s = 0; s <= step; s++) {
      const side = Math.min(w, h);
      const q = Math.floor(Math.max(w, h) / side);
      for (let i = 0; i < q; i++) {
        const sx = w >= h ? x + i * side : x;
        const sy = w >= h ? y : y + h - (i + 1) * side;
        els.push(...cell(sx * k, sy * k, side * k, side * k, String(side), tones[s], { fill: s === step, small: true }));
      }
      if (w >= h) {
        x += q * side;
        w -= q * side;
      } else {
        h -= q * side;
      }
    }
    els.push(dim(v(0, 198 * k), v(252 * k, 198 * k), "252", 1), dim(v(0, 0), v(0, 198 * k), "198", 1));
    els.push(...pad(-1.0, 198 * k + 0.9, 252 * k + 0.3, -0.3));
    const [a, b, q, r] = EU[step];
    return {
      els,
      readout: [
        `${a} = ${b} · ${q} + ${r}: EBOB(${a}, ${b}) = EBOB(${b}, ${r}).`,
        r === 0 ? `Kalan 0: EBOB = ${b}. EKOK = (252/18) · 198 = ${tn(lcm(252, 198))}.` : `Kalan dikdörtgen ${b} × ${r}; aynı kesmeyi sürdür.`,
      ],
    };
  },
};

const tiling: FigureDef = {
  caption:
    "36 cm × 24 cm dikdörtgeni s cm kenarlı eş karelerle döşeme (ölçekli). Kare kenarı iki kenarı da tam bölmelidir; yalnız alanların bölünmesi yetmez. Kalan şerit varsa döşeme olmaz. En az kare için s en büyük ortak bölen 12 olur: 3 sütun × 2 satır = 6 kare.",
  alt: "Dikdörtgen içinde s kenarlı kare ızgarası; sığmayan kenar şeritleri ayrı biçimde gösterilir.",
  param: { label: "s", min: 2, max: 18, step: 1, init: 12, unit: "cm" },
  draw: (s) => {
    const k = 0.25;
    const cols = Math.floor(36 / s);
    const rows = Math.floor(24 / s);
    const els: El[] = [rect(0, 0, 36 * k, 24 * k, "muted", false)];
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) els.push(rect(i * s * k, (24 - (j + 1) * s) * k, s * k, s * k, (i + j) % 2 ? "a" : "c"));
    const rx = 36 % s;
    const ry = 24 % s;
    if (rx) els.push(rect(cols * s * k, 0, rx * k, 24 * k, "warn", false));
    if (ry) els.push(rect(0, 0, cols * s * k, ry * k, "warn", false));
    els.push(dim(v(0, 24 * k), v(36 * k, 24 * k), "36 cm", 1), dim(v(0, 0), v(0, 24 * k), "24 cm", 1));
    els.push(...pad(-1.4, 24 * k + 0.9, 36 * k + 0.3, -0.3));
    const ok = !rx && !ry;
    return {
      els,
      readout: ok
        ? [`s = ${s}: 36/${s} = ${cols}, 24/${s} = ${rows}; ${cols} × ${rows} = ${cols * rows} kare.`, s === gcd(36, 24) ? "En büyük ortak bölen: en az kare." : `Geçerli; s = 12 daha az kare verir (${cols * rows} > 6).`]
        : [`s = ${s}: ${rx ? `36/${s} tam değil` : `36/${s} = ${cols}`}, ${ry ? `24/${s} tam değil` : `24/${s} = ${rows}`}.`, "Kenar şeridi kalır: s iki kenarın da ortak böleni olmalı."],
    };
  },
};

const ENDS: [string, boolean, boolean][] = [["[0, 72]", true, true], ["[0, 72)", true, false], ["(0, 72]", false, true]];
const moments: FigureDef = {
  caption:
    "Ortak başlangıçlı iki döngünün zaman çizelgesi (ölçekli). A her 12, B her 18 dakikada çalışır; ortak anlar EKOK(12, 18) = 36’nın katlarıdır: 0, 36, 72. Köşeli parantez ucu dahil eder, yuvarlak parantez dışarıda bırakır; dolu nokta sayılan, boş nokta sayılmayan uçtur.",
  alt: "Üst satırda 12 dakikalık, alt satırda 18 dakikalık işaretler; ortak anlarda iki satırı kesen dikey kesik çizgiler ve uç durumuna göre dolu ya da boş noktalar.",
  steps: ENDS.map(([s]) => s),
  draw: (_, step) => {
    const k = 0.15;
    const [, l, r] = ENDS[step];
    const els: El[] = [];
    els.push(seg(v(0, 1.4), v(72 * k, 1.4), { tone: "a", thin: true }), seg(v(0, 0), v(72 * k, 0), { tone: "c", thin: true }));
    for (let t = 0; t <= 72; t += 12) els.push(seg(v(t * k, 1.28), v(t * k, 1.52), { tone: "a" }), txt(v(t * k, 1.62), String(t), "n", { tone: "a", small: true, soft: true }));
    for (let t = 0; t <= 72; t += 18) els.push(seg(v(t * k, -0.12), v(t * k, 0.12), { tone: "c" }), txt(v(t * k, -0.22), String(t), "s", { tone: "c", small: true, soft: true }));
    els.push(txt(v(-0.3, 1.4), "A", "w", { tone: "a", bold: true }), txt(v(-0.3, 0), "B", "w", { tone: "c", bold: true }));
    const counted: number[] = [];
    for (const t of [0, 36, 72]) {
      const inc = t === 0 ? l : t === 72 ? r : true;
      if (inc) counted.push(t);
      els.push(seg(v(t * k, 0.2), v(t * k, 1.2), { tone: "warn", dash: true, thin: true }));
      els.push(pt(v(t * k, 0.7), undefined, "n", "warn", !inc));
    }
    els.push(...pad(-1.0, 2.4, 72 * k + 0.4, -1.0));
    return {
      els,
      readout: [`${ENDS[step][0]} aralığında ortak anlar: ${counted.join(", ")}; ${counted.length} olay.`, "72/36 = 2 aralık; 09.50’de başlarsa ilk ortak an 10.26."],
    };
  },
};

const strips: FigureDef = {
  caption:
    "Kalan şeritleri (ölçekli). 85 ve 133 birimlik şeritler d uzunluğunda parçalara kesilir; sondaki kısa parça kalandır. İki kalan da 1 ise d hem 84’ü hem 132’yi böler ve d > 1 olmalıdır. Bu koşulu sağlayan en büyük d, EBOB(84, 132) = 12’dir.",
  alt: "İki yatay şerit, d aralıklı kesim çizgileri; her şeridin sonundaki kalan parçası ayrı biçimde ve uzunluğuyla gösterilir.",
  param: { label: "d", min: 2, max: 14, step: 1, init: 12 },
  draw: (d) => {
    const k = 0.08;
    const els: El[] = [];
    const strip = (n: number, y: number, tone: Tone) => {
      const q = Math.floor(n / d);
      const r = n % d;
      els.push(rect(0, y, q * d * k, 0.6, tone));
      for (let i = 1; i < q; i++) els.push(seg(v(i * d * k, y), v(i * d * k, y + 0.6), { tone: "ink", thin: true }));
      if (r) els.push(rect(q * d * k, y, r * k, 0.6, "warn", false));
      els.push(txt(v(-0.25, y + 0.3), String(n), "w", { tone, bold: true }));
      els.push(txt(v(n * k + 0.25, y + 0.3), `kalan ${r}`, "e", { tone: r === 1 ? "ink" : "warn", small: true }));
      return [q, r];
    };
    const [q1, r1] = strip(85, 1.2, "a");
    const [q2, r2] = strip(133, 0, "c");
    els.push(...pad(-1.2, 2.2, 133 * k + 2.4, -0.4));
    const g = gcd(84, 132);
    return {
      els,
      readout: [
        `85 = ${d} · ${q1} + ${r1}, 133 = ${d} · ${q2} + ${r2}.`,
        r1 === 1 && r2 === 1 ? `İki kalan 1: ${d}, 84 ve 132’nin ortak bölenidir${d === g ? "; en büyüğü 12." : "; en büyüğü 12 değil."}` : "Kalanlar 1 değil: bu d koşulu sağlamaz.",
      ],
    };
  },
};

export const mathFigures062TytNumbers: Record<string, Record<string, FigureDef>> = {
  "tyt-mat-asal-kaynak-032": {
    "Asallık denemesini neden karekökte bitirirsin?": trialTable,
    "Asal çarpımda üç farklı şeyi sayarsın": ladder,
    "Bütün pozitif bölenleri bağımsız seçimle say": divisorGrid,
    "Kare farkından aday bul, sonra gerçekten asal mı bak": squareDiff,
    "Toplam tekse 2’yi ayır; farklılığı kendin ekleme": primePairs,
  },
  "tyt-mat-faktoriyel-kaynak-033": {
    "Büyük sayıya değil ortak çarpana kadar aç": ratioStrip,
    "Toplamda çizgi değil dağıtma kuralı kullan": distribute,
    "Asal çarpan sayacı bir kopya sayımıdır": legendre,
    "Bileşik böleni iki bütçeyle kur": budgets,
    "Bölme 2’leri tüketirse 5 saymak yetmez": zerosAfter,
  },
  "tyt-mat-ebob-ekok-kaynak-034": {
    "Asal kopyaları üslerle say": exponentBars,
    "Öklid: büyük sayıyı aynı ortak bölenlerle küçült": euclid,
    "Kareyle kaplama: kenarın bölen olması gerekir": tiling,
    "Uçları ve saati doğru say": moments,
    "Bilinmeyen bölen: her sayıdan kendi kalanını çıkar": strips,
  },
};
