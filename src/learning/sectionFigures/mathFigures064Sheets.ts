import { fmt, poly, pt, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";

/*
 * Forge064: four TYT Matematik cheat sheets (ardışık sayılar, asal sayılar,
 * yaş problemleri, kâr–zarar problemleri) taught as original interactive
 * figures. Each figure sits on a section of the lesson that had no drawing
 * yet and teaches an idea the existing labs do not draw. Every number shown
 * is computed in draw() from the slider, step or pick; the sheets' wording and
 * worked examples are not reused.
 */

const rect = (x: number, y: number, w: number, h: number, tone: Tone, fill = true, bold = false): El =>
  poly([v(x, y), v(x + w, y), v(x + w, y + h), v(x, y + h)], { tone, fill: fill ? tone : undefined, bold });
/** Invisible anchor that widens the drawing's frame. */
const frame = (x: number, y: number): El => txt(v(x, y), " ", "c");
const signed = (n: number) => (n > 0 ? `+${n}` : n < 0 ? `−${-n}` : "0");
const num = (n: number, d = 2) => (n < 0 ? `−${fmt(-n, d)}` : fmt(n, d));
const isPrime = (n: number) => {
  if (n < 2) return false;
  for (let p = 2; p * p <= n; p++) if (n % p === 0) return false;
  return true;
};
const divisors = (n: number) => Array.from({ length: n }, (_, i) => i + 1).filter((d) => n % d === 0);

/* ───────────── 003 Ardışık sayılar ───────────── */

const listKinds: { label: string; title: string; terms: number[]; detail: string[] }[] = [
  {
    label: "Tam",
    title: "Ardışık tam sayılar: adım 1",
    terms: [-1, 0, 1, 2],
    detail: ["−1, 0, 1, 2: her komşu arasında +1 var.", "Negatif ve sıfır da ardışık listeye girer; ardışıklık pozitiflik söylemez."],
  },
  {
    label: "Çift",
    title: "Ardışık çiftler: adım 2, başlangıç çift",
    terms: [0, 2, 4, 6],
    detail: ["0, 2, 4, 6: adım 2 ve ilk terim 2k biçiminde.", "a, a + 2, a + 4 yazmak yetmez; a'nın çift olduğunu ayrıca koru."],
  },
  {
    label: "Tek",
    title: "Ardışık tekler: adım 2, başlangıç tek",
    terms: [-1, 1, 3, 5],
    detail: ["−1, 1, 3, 5: adım yine 2, ama ilk terim 2k + 1.", "Üç ardışık tek için x, x + 1, x + 2 yazılırsa ortadaki çift olur."],
  },
  {
    label: "Adım 3",
    title: "Sabit adımlı liste: ardışık tam değil",
    terms: [0, 3, 6, 9],
    detail: ["0, 3, 6, 9: her aralık 3, eşit aralıklı bir liste.", "k. terim 0 + (k − 1) · 3 = 3k − 3; ama ardışık tam sayı listesi değildir."],
  },
  {
    label: "Eşitsiz",
    title: "Farklı sayılar, eşit aralık yok",
    terms: [1, 4, 8, 9],
    detail: ["1, 4, 8, 9: aralıklar 3, 4, 1; sabit adım yok.", "Uç ortalaması (1 + 9)/2 = 5 ile toplam 4 · 5 = 20 bulunmaz; gerçek toplam 22."],
  },
];

const ardisikTur: FigureDef = {
  caption:
    "Bir satır seç. Her satırda dört sayı aynı doğruya yerleşir ve komşu aralıklar yazılır. Ardışık tam, çift ve tekte aralık sabit, başlangıcın türü de doğru olmalı. Adım 3'lü liste eşit aralıklıdır ama ardışık tam değildir; son satırda sayılar farklı olduğu hâlde aralıklar eşit değildir.",
  alt: "Beş yatay sayı doğrusu satırı: tam, çift, tek, adım 3 ve eşitsiz aralıklı liste. Seçilen satırda noktaların değerleri ve aralarındaki farklar yazılı.",
  picks: listKinds.map(({ label, title, detail }) => ({ label, title, detail })),
  maxHeight: 560,
  draw: (_v, _s, pick = -1) => {
    const X = (n: number) => n * 0.7;
    const els: El[] = [];
    listKinds.forEach((kind, row) => {
      const y = (listKinds.length - 1 - row) * 1.5;
      const on = row === pick;
      els.push(seg(v(X(-1.6), y), v(X(9.6), y), { tone: on ? "ink" : "muted", thin: !on }));
      els.push(txt(v(X(-2.1), y), kind.label, "w", { tone: on ? "a" : "ink", small: true, bold: on, pick: row }));
      kind.terms.forEach((t, i) => {
        els.push(pt(v(X(t), y), undefined, "ne", on ? "a" : "muted", !on));
        if (on) {
          els.push(txt(v(X(t), y - 0.2), t < 0 ? `−${-t}` : String(t), "s", { tone: "ink", small: true }));
          if (i > 0) {
            const prev = kind.terms[i - 1];
            els.push(txt(v(X((prev + t) / 2), y + 0.25), `+${t - prev}`, "n", { tone: "c", small: true, bold: true }));
          }
        }
      });
    });
    els.push(frame(X(-1.6), 6.9), frame(X(9.8), -0.9));
    if (pick < 0)
      return { els, readout: ["Bir satır seç: aralıklar ve başlangıç türü birlikte görünür.", "Ardışık demek, farklı olmak değil, sabit adımla sıralanmaktır."] };
    const k = listKinds[pick];
    const gaps = k.terms.slice(1).map((t, i) => t - k.terms[i]);
    const equal = gaps.every((g) => g === gaps[0]);
    return {
      els,
      readout: [
        `Aralıklar: ${gaps.map((g) => `+${g}`).join(", ")} · ${equal ? `sabit adım ${gaps[0]}` : "sabit adım yok"}`,
        equal
          ? `Toplam = 4 · (${num(k.terms[0], 0)} + ${k.terms[3]})/2 = ${k.terms.reduce((a, b) => a + b, 0)}`
          : `Uç ortalaması kuralı çalışmaz: 4 · 5 = 20, gerçek toplam ${k.terms.reduce((a, b) => a + b, 0)}`,
      ],
    };
  },
};

const tekKare: FigureDef = {
  caption:
    "Sürgüyle n'yi değiştir. Her yeni tek sayı, karenin iki kenarına eklenen bir köşe şerididir: 1, 3, 5, … tane kare. n şerit birlikte n · n karelik bir kare yapar; bu yüzden ilk n pozitif tekin toplamı n²'dir. Liste 1 ile başlamıyorsa eksik iç kareyi çıkar.",
  alt: "Birim karelerden oluşan büyük kare; her köşe şeridi ayrı tonda ve köşesinde içerdiği kare sayısı yazılı. Sürgü şerit sayısını 1'den 7'ye değiştirir.",
  param: { label: "Tek sayı adedi n", min: 1, max: 7, step: 1, init: 4 },
  draw: (n) => {
    const s = 0.8;
    const els: El[] = [];
    const tones: Tone[] = ["a", "c", "b"];
    for (let i = 0; i < n; i++)
      for (let j = 0; j < n; j++) {
        const layer = Math.max(i, j);
        els.push(rect(i * s, j * s, s, s, tones[layer % 3], true));
      }
    for (let k = 0; k < n; k++) els.push(txt(v(k * s + s / 2, k * s + s / 2), String(2 * k + 1), "c", { tone: "ink", small: true, bold: true }));
    els.push(txt(v((n * s) / 2, n * s + 0.1), `${n} kare`, "n", { tone: "ink", small: true }), txt(v(n * s + 0.1, (n * s) / 2), `${n} kare`, "e", { tone: "ink", small: true }));
    els.push(frame(-0.4, 7 * s + 0.9), frame(7 * s + 2.2, -0.4));
    const last = 2 * n - 1;
    const sum = n <= 4 ? Array.from({ length: n }, (_, k) => 2 * k + 1).join(" + ") : `1 + 3 + 5 + … + ${last}`;
    return {
      els,
      readout: [
        `${sum} = ${n}² = ${n * n} · genel formülle ${n} · (1 + ${last})/2 = ${n * n}`,
        n > 1
          ? `1 eksikse: 3 + … + ${last} = ${n}² − 1² = ${n * n - 1}; son terim ${last}, terim sayısı ${n - 1}`
          : "Tek şerit: yalnız 1. Son terim 2n − 1, terim sayısı n; ikisini karıştırma.",
      ],
    };
  },
};

const dortArdisik: FigureDef = {
  caption:
    "Sürgüyle dört ardışık tam sayının toplamını seç. a + (a + 1) + (a + 2) + (a + 3) = 4a + 6 olduğundan a = (S − 6)/4 tam sayı olmalı. Ortalama S/4 iki orta terimin tam ortasıdır, hiçbir zaman listedeki bir terim değildir. Uygun olmayan toplamda noktalar içi boş kalır.",
  alt: "−5'ten 11'e sayı doğrusu; seçilen toplama karşılık gelen dört nokta ve ortalama işareti. Toplam uygun değilse noktalar içi boş çizilir.",
  param: { label: "Toplam S", min: -10, max: 34, step: 1, init: 22 },
  draw: (S) => {
    const X = (n: number) => n * 0.55;
    const a = (S - 6) / 4;
    const ok = Number.isInteger(a);
    const els: El[] = [seg(v(X(-5.5), 0), v(X(11.5), 0), { tone: "ink" })];
    for (let t = -5; t <= 11; t++) {
      els.push(seg(v(X(t), -0.08), v(X(t), 0.08), { tone: "muted", thin: true }));
      if (t % 5 === 0) els.push(txt(v(X(t), -0.1), t < 0 ? `−${-t}` : String(t), "s", { tone: "muted", small: true, soft: true }));
    }
    for (let i = 0; i < 4; i++) els.push(pt(v(X(a + i), 0), undefined, "ne", ok ? "a" : "warn", !ok));
    const m = S / 4;
    els.push(vec(v(X(m), 1.1), v(X(m), 0.2), { tone: "c" }), txt(v(X(m), 1.1), `ortalama ${num(m)}`, "n", { tone: "c", small: true, bold: true }));
    els.push(frame(X(-6.2), 1.9), frame(X(12.2), -0.9));
    const terms = [0, 1, 2, 3].map((i) => num(a + i)).join(", ");
    return {
      els,
      readout: [
        `4a + 6 = ${num(S, 0)} ⇒ a = ${num(a)} · ${ok ? `sayılar ${terms}` : "a tam sayı değil, böyle dört ardışık tam sayı yok"}`,
        ok
          ? `Ortalama ${num(m)} = (${num(a + 1, 0)} + ${num(a + 2, 0)})/2: iki terimin ortası, terim değil`
          : `Uygun toplamlar 4'e bölününce 2 kalanını verir; ${num(S, 0)} bu koşulu sağlamıyor`,
      ],
    };
  },
};

const uyelik: FigureDef = {
  caption:
    "Sürgüyle bir koltuk numarası seç. Numaralar 6'dan başlayıp beşer artıyor. k = (x − 6)/5 + 1 tam sayıysa x listenin k. terimidir ve ilk terimden k − 1 adım uzaktadır. Kesirli k yuvarlanmaz: o numara listede yoktur, iki komşu terimin arasında kalır.",
  alt: "6, 11, 16, …, 61 terimlerinin işaretli olduğu yatay doğru; seçilen x değeri ayrı işaretle gösteriliyor ve ilk terimden en yakın alt terime uzanan kalın parça adım sayısıyla etiketli.",
  param: { label: "Numara x", min: 6, max: 60, step: 1, init: 36 },
  draw: (x) => {
    const X = (n: number) => (n - 6) * 0.17;
    const terms = Array.from({ length: 12 }, (_, i) => 6 + 5 * i);
    const k = (x - 6) / 5 + 1;
    const ok = Number.isInteger(k);
    const lowK = Math.floor(k);
    const low = 6 + 5 * (lowK - 1);
    const els: El[] = [seg(v(X(4), 0), v(X(63), 0), { tone: "muted", thin: true })];
    terms.forEach((t, i) => {
      els.push(pt(v(X(t), 0), undefined, "ne", "b"));
      if (i % 2 === 0 || i === terms.length - 1) els.push(txt(v(X(t), -0.15), String(t), "s", { tone: "muted", small: true, soft: true }));
    });
    if (lowK > 1) els.push(seg(v(X(6), 0.02), v(X(low), 0.02), { tone: "a", bold: true }), txt(v((X(6) + X(low)) / 2, 0.75), `${lowK - 1} adım`, "n", { tone: "a", small: true, bold: true }));
    els.push(vec(v(X(x), -1.35), v(X(x), -0.35), { tone: ok ? "c" : "warn" }), txt(v(X(x), -1.35), `x = ${x}`, "s", { tone: ok ? "c" : "warn", small: true, bold: true }));
    els.push(frame(X(1), 1.6), frame(X(66), -2.3));
    return {
      els,
      readout: ok
        ? [`k = (${x} − 6)/5 + 1 = ${k}: ${x}, listenin ${k}. terimi`, `İlk terimden ${k - 1} adım; aralık sayısı ile terim sayısı arasında 1 fark var`]
        : [`k = (${x} − 6)/5 + 1 = ${fmt(k, 2)}: tam sayı değil, ${x} listede yok`, `Komşu terimler ${low} (${lowK}. terim) ve ${low + 5} (${lowK + 1}. terim)`],
    };
  },
};

/* ───────────── 004 Asal sayılar ───────────── */

const dikdortgen: FigureDef = {
  caption:
    "Sürgüyle n'yi seç. n birim kare, satırları eşit olan bütün dikdörtgenlere dizilir; her dizilim bir bölen çiftidir. Asal sayıda yalnız tek satır (1 × n) mümkündür; bileşikte en az bir başka dizilim vardır. 1'in tek böleni olduğundan ne asal ne bileşiktir.",
  alt: "n birim karenin bütün dikdörtgen dizilimleri alt alta; her dizilimin solunda satır × sütun yazılı. Asal n için yalnız tek satırlık dizilim çizilir.",
  param: { label: "Sayı n", min: 1, max: 30, step: 1, init: 12 },
  draw: (n) => {
    const ds = divisors(n);
    const rows = ds.filter((d) => d * d <= n);
    const s = 0.34;
    const prime = isPrime(n);
    const tone: Tone = prime ? "a" : n === 1 ? "muted" : "c";
    const els: El[] = [];
    let top = 0;
    for (const r of rows) {
      const c = n / r;
      for (let i = 0; i < c; i++) for (let j = 0; j < r; j++) els.push(rect(i * s, top - (j + 1) * s, s, s, tone, true));
      els.push(txt(v(-0.2, top - (r * s) / 2), `${r} × ${c}`, "w", { tone: "ink", small: true, bold: true }));
      top -= r * s + 0.45;
    }
    els.push(frame(-1.9, 0.3), frame(30 * s + 0.3, -6.2));
    const kind = n === 1 ? "ne asal ne bileşik" : prime ? "asal" : "bileşik";
    const shapes = rows.map((d) => `${d} × ${n / d}`).join(", ");
    return {
      els,
      readout: [`${n} için pozitif bölenler: ${ds.join(", ")} (${ds.length} tane) · ${kind}`, `Dikdörtgen dizilimleri: ${shapes}${prime ? "; yalnız tek satır" : ""}`],
    };
  },
};

const ELEK_STEPS = ["1'i dışla", "2'nin katları", "3'ün katları", "5'in katları", "7'nin katları", "Kalanlar asal"];
const SIEVE_PRIMES = [2, 3, 5, 7];
const elek: FigureDef = {
  caption:
    "İleri ile 1–50 eleğini adım adım kur. 1 çıkar; sonra 2, 3, 5 ve 7 kendileri kalarak katları elenir. 7² = 49 ≤ 50 ve 11² = 121 > 50 olduğundan 7'den sonra eleme gerekmez. Elenen kutunun köşesi kesik, asal kutunun çerçevesi kalındır; yalnız ton farkına bakmak gerekmez.",
  alt: "1'den 50'ye on sütun beş satırlık sayı tablosu. Elenen sayıların kutu köşesinde üçgen işaret var; asal kalan sayılar kalın çerçeveli.",
  steps: ELEK_STEPS,
  maxHeight: 520,
  draw: (_v, step) => {
    const out = new Map<number, number>();
    out.set(1, 0);
    SIEVE_PRIMES.slice(0, step).forEach((p, i) => {
      for (let m = 2 * p; m <= 50; m += p) if (!out.has(m)) out.set(m, i + 1);
    });
    const cell = 1;
    const els: El[] = [];
    for (let n = 1; n <= 50; n++) {
      const col = (n - 1) % 10;
      const row = Math.floor((n - 1) / 10);
      const x = col * cell;
      const y = (4 - row) * cell;
      const when = out.get(n);
      const gone = when !== undefined;
      const fresh = gone && when === step;
      const primeShown = !gone && (SIEVE_PRIMES.slice(0, step).includes(n) || step === 5);
      els.push(rect(x + 0.04, y + 0.04, cell - 0.08, cell - 0.08, gone ? (fresh ? "warn" : "muted") : primeShown ? "c" : "b", gone || primeShown, primeShown));
      if (gone) els.push(poly([v(x + 0.04, y + cell - 0.04), v(x + 0.3, y + cell - 0.04), v(x + 0.04, y + cell - 0.3)], { tone: fresh ? "warn" : "muted", fill: fresh ? "warn" : "muted" }));
      els.push(txt(v(x + 0.55, y + 0.45), String(n), "c", { tone: gone ? "muted" : "ink", small: true, bold: primeShown }));
    }
    els.push(frame(-0.3, 5.3), frame(10.3, -0.3));
    const fresh = [...out].filter(([, w]) => w === step).map(([n]) => n);
    const left = 50 - out.size;
    const rows: string[][] = [
      ["1'in yalnız bir pozitif böleni var: asal değil, elenir.", "49 sayı kaldı; henüz hiçbir asalın katı silinmedi."],
      [`2 kalır; 4, 6, …, 50 elenir (${fresh.length} sayı).`, `Kalan ${left} sayıda 9, 25, 49 gibi tek bileşikler hâlâ var.`],
      [`3 kalır; yeni elenen ${fresh.length} sayı: ${fresh.join(", ")}.`, "6 ve 12 gibi sayılar 2 adımında zaten gitmişti; ikinci kez sayılmaz."],
      [`5 kalır; yeni elenen: ${fresh.join(", ")}.`, `Kalan ${left} sayı; 49 hâlâ duruyor.`],
      [`7 kalır; yeni elenen: ${fresh.join(", ")}.`, "Sonraki aday 11, ama 11² = 121 > 50: eleme bitti."],
      [`Kalan ${left} sayının hepsi asal: ${Array.from({ length: 50 }, (_, i) => i + 1).filter((n) => !out.has(n)).join(", ")}.`, "Yalnız çiftleri silmek 9, 15, 21, 25, 27, 33, 35, 39, 45, 49'u yanlışlıkla bırakırdı."],
    ];
    return { els, readout: rows[step] };
  },
};

const ucluKalan: FigureDef = {
  caption:
    "Sürgüyle tek q seç; p = 2 iken p + q = q + 2 ve q − p = q − 2 olur. Ardışık üç tek sayı q − 2, q, q + 2'nin 3'e göre kalanları 0, 1, 2'nin bir sıralamasıdır; biri mutlaka 3'e bölünür. Üçü birden asal kalacaksa 3'e bölünen sayı 3'ün kendisi olmalıdır: tek çözüm q = 5.",
  alt: "Yan yana üç kutu: q − 2, q ve q + 2; içlerinde değerler, altlarında 3'e göre kalan ve asal ya da bileşik bilgisi. 3'e bölünen kutu kalın çerçeveli.",
  param: { label: "Tek sayı q", min: 5, max: 41, step: 2, init: 11 },
  draw: (q) => {
    const vals = [q - 2, q, q + 2];
    const names = ["q − 2", "q", "q + 2"];
    const els: El[] = [];
    vals.forEach((val, i) => {
      const x = i * 3;
      const by3 = val % 3 === 0;
      const prime = isPrime(val);
      els.push(rect(x, 0, 2.2, 1.6, by3 ? "warn" : prime ? "c" : "muted", true, by3));
      els.push(txt(v(x + 1.1, 1.6), names[i], "n", { tone: "ink", small: true, bold: true }));
      els.push(txt(v(x + 1.1, 0.8), String(val), "c", { tone: "ink", bold: true }));
      els.push(txt(v(x + 1.1, -0.1), `kalan ${val % 3}`, "s", { tone: "ink", small: true }));
      els.push(txt(v(x + 1.1, -0.8), prime ? "asal" : "bileşik", "s", { tone: prime ? "c" : "warn", small: true, bold: true }));
    });
    els.push(frame(-0.6, 2.7), frame(8.8, -1.8));
    const qPrime = isPrime(q);
    const all = vals.every(isPrime);
    return {
      els,
      readout: [
        `${vals.join(", ")}: 3'e bölünen ${vals.find((x) => x % 3 === 0)}${qPrime ? "" : ` · q = ${q} asal değil`}`,
        all
          ? `q = ${q}: 2 + ${q} = ${q + 2} ve ${q} − 2 = ${q - 2}, üçü de asal; 3'e bölünen sayı 3'ün kendisi`
          : `p = 2, q = ${q} çalışmaz: ${vals.filter((x) => !isPrime(x)).join(" ve ")} asal değil`,
      ],
    };
  },
};

const BASAMAK_STEPS = ["81 basamak çifti", "5 çarpanı", "2 çarpanı", "3 çarpanı"];
const basamakKeep = (A: number, B: number, step: number) => {
  if (step >= 1 && A !== 5 && B !== 5) return false;
  if (step >= 2 && (A * B) % 2 !== 0) return false;
  if (step >= 3 && (A + B) % 3 !== 0) return false;
  return true;
};
const basamak: FigureDef = {
  caption:
    "İleri ile AB ve BA iki basamaklı sayılarının çarpımı 30'a bölünsün koşulunu asal çarpanlarına ayırıp uygula. 5: son basamaklardan biri 5 olmalı. 2: öteki basamak çift olmalı, ikisi de 5 olamaz. 3: iki sayının rakam toplamı aynı A + B'dir, 3'ün katı olmalı. 81 çiftten 2 aday kalır.",
  alt: "Dokuza dokuz kutu ızgarası: sütunlar A, satırlar B rakamı. Her adımda koşulu sağlamayan kutular boşalır; son adımda yalnız 45 ve 54 kutuları dolu kalır.",
  steps: BASAMAK_STEPS,
  maxHeight: 560,
  draw: (_v, step) => {
    const s = 0.7;
    const els: El[] = [];
    let count = 0;
    for (let A = 1; A <= 9; A++)
      for (let B = 1; B <= 9; B++) {
        const keep = basamakKeep(A, B, step);
        if (keep) count++;
        const x = (A - 1) * s;
        const y = (9 - B) * s;
        els.push(rect(x + 0.04, y + 0.04, s - 0.08, s - 0.08, keep ? "a" : "muted", keep, keep && step === 3));
        if (keep && step === 3) els.push(txt(v(x + s / 2, y + s / 2), `${A}${B}`, "c", { tone: "ink", small: true, bold: true }));
      }
    for (let d = 1; d <= 9; d++) {
      els.push(txt(v((d - 1) * s + s / 2, 9 * s + 0.05), String(d), "n", { tone: "muted", small: true, soft: true }));
      els.push(txt(v(-0.1, (9 - d) * s + s / 2), String(d), "w", { tone: "muted", small: true, soft: true }));
    }
    els.push(txt(v(4.5 * s, 9 * s + 0.75), "A", "n", { tone: "ink", small: true, bold: true }), txt(v(-0.85, 4.5 * s), "B", "w", { tone: "ink", small: true, bold: true }));
    els.push(frame(-1.8, 9 * s + 1.6), frame(9 * s + 0.3, -0.3));
    const rows: string[][] = [
      ["A ve B 1–9 arası: 81 çift. Sıfır olamaz, çünkü iki sayı da iki basamaklı.", "30 = 2 · 3 · 5: üç asalın koşulu ayrı ayrı uygulanacak."],
      [`5 çarpanı: AB ya da BA 5 ile bitmeli, yani A = 5 veya B = 5. Kalan ${count} çift.`, "Tek bir koşula bakıp durmak, öteki çarpanları kaçırır."],
      [`2 çarpanı: 5'in yanındaki basamak çift. Kalan ${count} çift.`, "55 elenir: 55 · 55 tek sayıdır."],
      [`3 çarpanı: A + B ∈ {7, 9, 11, 13} içinden yalnız 9. Kalan ${count} çift: 45 ve 54.`, "Denetim: 45 · 54 = 2430 = 30 · 81 · basamak toplamı 9."],
    ];
    return { els, readout: rows[step] };
  },
};

/* ───────────── 019 Yaş problemleri ───────────── */

const grupToplam: FigureDef = {
  caption:
    "Sürgüyle zamanı ileri ya da geri al. Üç kişinin bugünkü yaşları 8, 12 ve 31; toplam 51, ortalama 17. t yılda her çubuk t uzar: toplam 3t, ortalama yalnız t değişir. Kesik çizgi ortalamadır ve çubuklarla birlikte kayar.",
  alt: "Üç dikey yaş çubuğu A, B, C ve ortalamayı gösteren kesik yatay çizgi. Sürgü zamanı −4'ten 8'e değiştirir; her çubuk ve ortalama çizgisi aynı miktarda yükselir.",
  param: { label: "Zaman t (yıl, bugün 0)", min: -4, max: 8, step: 1, init: 0 },
  draw: (t) => {
    const k = 0.13;
    const ages = [8, 12, 31].map((a) => a + t);
    const els: El[] = [seg(v(-0.4, 0), v(6.4, 0), { tone: "ink" })];
    ages.forEach((age, i) => {
      const x = i * 2;
      els.push(rect(x, 0, 1.2, age * k, (["a", "b", "c"] as Tone[])[i]));
      els.push(txt(v(x + 0.6, age * k), String(age), "n", { tone: "ink", small: true, bold: true }));
      els.push(txt(v(x + 0.6, 0), "ABC"[i], "s", { tone: "ink", small: true, bold: true }));
    });
    const mean = 17 + t;
    els.push(seg(v(-0.4, mean * k), v(6.4, mean * k), { tone: "warn", dash: true }), txt(v(6.5, mean * k), `ortalama ${mean}`, "e", { tone: "warn", small: true, bold: true }));
    els.push(frame(-0.8, 40 * k), frame(9.4, -0.8));
    return {
      els,
      readout: [
        `Toplam 51 + 3 · (${signed(t)}) = ${51 + 3 * t} · ortalama 17 + (${signed(t)}) = ${mean}`,
        "Toplama yalnız t eklemek grupta tek kişi varmış gibi sayar; kişi sayısı çarpandır.",
      ],
    };
  },
};

const ORAN_STEPS = ["Bugün 3k ve 7k", "4 yıl sonra", "Küçüğün iki katı", "k = 4"];
const oranBlok: FigureDef = {
  caption:
    "İleri ile oran modelini kur. Bugünkü yaşlar 3 : 7 ise 3k ve 7k blokları yazılır. 4 yıl sonra iki yaşa da 4 eklenir (blok sayısına değil). O gün küçük, büyüğün yarısıysa küçüğün iki katı büyüğe eşittir: 6k + 8 = 7k + 4, fark bir blok, k = 4.",
  alt: "Blok modeli: üst satırda küçük kişinin k blokları, alt satırda büyük kişinin k blokları; ekleme adımında her satırın sonuna 4 yıllık kısa şerit eklenir, karşılaştırma adımında küçük satır iki kez yazılır.",
  steps: ORAN_STEPS,
  draw: (_v, step) => {
    const solved = step === 3;
    const b = solved ? 0.62 : 0.8;
    const st = solved ? 0.62 : 0.5;
    const els: El[] = [];
    /** Draws a row from a pattern: "k" is one k block, "4" one 4-year strip. */
    const row = (y: number, pattern: string, tone: Tone, name: string) => {
      let x = 0;
      for (const c of pattern) {
        const w = c === "k" ? b : st;
        els.push(rect(x, y, w - 0.05, 0.7, c === "k" ? tone : "warn"));
        els.push(txt(v(x + (w - 0.05) / 2, y + 0.35), c === "k" && !solved ? "k" : "4", "c", { tone: "ink", small: true, bold: true }));
        x += w;
      }
      els.push(txt(v(-0.2, y + 0.35), name, "w", { tone: "ink", small: true, bold: true }));
    };
    if (step >= 2) {
      row(1.1, "kkkkkk44", "a", "2 · küçük");
      row(0, "kkkkkk4k", "b", "büyük");
      if (!solved) els.push(seg(v(6 * b + st, -0.3), v(6 * b + st, 2.1), { tone: "ink", dash: true, thin: true }));
    } else {
      row(1.1, step === 1 ? "kkk4" : "kkk", "a", "küçük");
      row(0, step === 1 ? "kkkkkkk4" : "kkkkkkk", "b", "büyük");
    }
    els.push(frame(-2.4, 2.6), frame(7 * 0.8 + 2 * 0.5 + 0.4, -0.6));
    const rows: string[][] = [
      ["Bugün: küçük 3k, büyük 7k. k ortak çarpan, henüz sayı değil.", "Oran yalnız bu sütun için geçerli; başka tarihte yeniden kurulur."],
      ["4 yıl sonra: 3k + 4 ve 7k + 4. Şerit her yaşa bir kez eklenir.", "Tuzak: 3(k + 4) yazmak her bloğa ayrı süre eklemek olur."],
      ["Küçük, büyüğün yarısı: 2(3k + 4) = 7k + 4 ⇒ 6k + 8 = 7k + 4.", "Kesik çizgiye kadar iki satır aynı: 6k + 4. Geriye üstte bir 4, altta bir k kalır; k = 4."],
      ["k = 4: her blok 4 yıl; 2 · 16 = 32 ve iki satır eşit uzunlukta. Bugün 12 ve 28; 4 yıl sonra 16 ve 32.", "Denetim: 16 · 2 = 32 ve 12 : 28 = 3 : 7; yaş farkı her zaman 16."],
    ];
    return { els, readout: rows[step] };
  },
};

const CAPRAZ_STEPS = ["Bugün", "A, B'nin bugünkü yaşındayken", "B, A'nın bugünkü yaşına geldiğinde"];
const capraz: FigureDef = {
  caption:
    "İleri ile iki çapraz zaman cümlesini zaman çizgisine yerleştir. A bugün 31, B 19; fark 12. B'nin bugünkü yaşı 19 sabit hedeftir: A oraya 12 yıl önce ulaştı, o tarihte B 7 yaşındaydı. Ters cümlede B, 31'e 12 yıl sonra ulaşır ve A 43 olur.",
  alt: "İki yatay zaman çizgisi: üstte A, altta B. Bugün dikey çizgisi ortada; seçilen adımda 12 yıl önceye ya da 12 yıl sonraya dikey kesik çizgi ve o tarihteki iki yaş işaretleniyor.",
  steps: CAPRAZ_STEPS,
  draw: (_v, step) => {
    const X = (t: number) => t * 0.3;
    const yA = 1.8;
    const yB = 0;
    const els: El[] = [
      seg(v(X(-14), yA), v(X(14), yA), { tone: "muted" }),
      seg(v(X(-14), yB), v(X(14), yB), { tone: "muted" }),
      txt(v(X(-14.6), yA), "A", "w", { tone: "a", small: true, bold: true }),
      txt(v(X(-14.6), yB), "B", "w", { tone: "b", small: true, bold: true }),
      seg(v(X(0), -0.5), v(X(0), 2.4), { tone: "ink", thin: true }),
      txt(v(X(0), 2.45), "bugün", "n", { tone: "ink", small: true }),
    ];
    for (const t of [-12, 0, 12]) els.push(txt(v(X(t), -0.75), signed(t), "s", { tone: "muted", small: true, soft: true }));
    const shift = step === 1 ? -12 : step === 2 ? 12 : 0;
    els.push(pt(v(X(0), yA), "31", "nw", "a"), pt(v(X(0), yB), "19", "sw", "b"));
    if (shift !== 0) {
      els.push(seg(v(X(shift), -0.5), v(X(shift), 2.4), { tone: "warn", dash: true }));
      els.push(txt(v(X(shift), 2.45), shift < 0 ? "12 yıl önce" : "12 yıl sonra", "n", { tone: "warn", small: true, bold: true }));
      els.push(pt(v(X(shift), yA), String(31 + shift), shift < 0 ? "nw" : "ne", "a"), pt(v(X(shift), yB), String(19 + shift), shift < 0 ? "sw" : "se", "b"));
      els.push(vec(v(X(0), 0.9), v(X(shift), 0.9), { tone: "warn", thin: true }));
    }
    els.push(frame(X(-17.5), 3.2), frame(X(15.5), -1.5));
    const rows: string[][] = [
      ["Bugün A 31, B 19: üç ayrı yaş hücresi açılacak, fark hep 12.", "“Bugünkü” sözcüğü sabit bir yaş seçer; hedef kaymaz."],
      ["A'nın 19 olduğu tarih: 31 − 19 = 12 yıl önce. O sütunda B = 19 − 12 = 7.", "Denetim: 7 ≥ 0, B o tarihte doğmuştu; fark 19 − 7 = 12."],
      ["B'nin 31 olduğu tarih: 12 yıl sonra. O sütunda A = 31 + 12 = 43.", "Yön oku: geçmişte −12, gelecekte +12; işaretleri karıştırma."],
    ];
    return { els, readout: rows[step] };
  },
};

const enAz: FigureDef = {
  caption:
    "Sürgüyle yıl seç. Üç kişinin bugünkü yaş toplamı 31; t yıl sonra ortalama (31 + 3t)/3. Kesik çizgi 15 sınırıdır. 31 + 3t ≥ 45 için t ≥ 14/3 ≈ 4,67; ilk tam yıl 5. Sınırı geçen çubuklar kalın çerçeveli; seçili yıl alttaki okla işaretli.",
  alt: "0'dan 8'e her yıl için ortalama yaşı gösteren dokuz dikey çubuk ve 15 düzeyinde kesik çizgi. Seçilen yılın altında ok var; 5 ve sonrası kalın çerçeveli.",
  param: { label: "Yıl t", min: 0, max: 8, step: 1, init: 4 },
  draw: (t) => {
    const k = 0.2;
    const w = 0.6;
    const gap = 0.9;
    const els: El[] = [seg(v(-0.3, 0), v(8 * gap + w + 0.3, 0), { tone: "ink" })];
    for (let i = 0; i <= 8; i++) {
      const avg = (31 + 3 * i) / 3;
      const pass = avg >= 15;
      els.push(rect(i * gap, 0, w, avg * k, i === t ? "a" : pass ? "c" : "muted", true, pass));
      els.push(txt(v(i * gap + w / 2, 0), String(i), "s", { tone: "muted", small: true, soft: true }));
    }
    els.push(vec(v(t * gap + w / 2, -1.25), v(t * gap + w / 2, -0.6), { tone: "a" }));
    els.push(seg(v(-0.3, 15 * k), v(8 * gap + w + 0.3, 15 * k), { tone: "warn", dash: true }), txt(v(8 * gap + w + 0.4, 15 * k), "sınır 15", "e", { tone: "warn", small: true, bold: true }));
    els.push(frame(-0.6, 19 * k + 0.5), frame(8 * gap + w + 2.6, -1.4));
    const avg = (31 + 3 * t) / 3;
    return {
      els,
      readout: [
        `t = ${t}: toplam ${31 + 3 * t}, ortalama ${fmt(avg, 2)} · ${avg >= 15 ? "sınır sağlanıyor" : "15'in altında"}`,
        "(31 + 3t)/3 ≥ 15 ⇒ t ≥ 14/3 ≈ 4,67; tam yıl isteniyorsa ilk aday 5, 4 yetmez",
      ],
    };
  },
};

/* ───────────── 021 Kâr–zarar problemleri ───────────── */

const kirTaban: FigureDef = {
  caption:
    "Sürgüyle satış fiyatını değiştir; maliyet 160 TL sabit. Kâr ya da zarar aynı TL farkıdır, ama yüzde tabanı maliyettir. Aynı farkı satışa bölmek satış marjını verir: S = 200 iken kâr %25, marj %20. Satış maliyetin altına inerse fark zarar olur.",
  alt: "İki yatay çubuk: üstte 160 TL maliyet, altta sürgüyle değişen satış. Satış çubuğunun maliyeti aşan kısmı kâr, maliyetten eksik kalan kısım zarar olarak işaretli.",
  param: { label: "Satış S", min: 120, max: 240, step: 8, init: 200, unit: " TL" },
  draw: (S) => {
    const M = 160;
    const k = 0.03;
    const K = S - M;
    const els: El[] = [rect(0, 1.3, M * k, 0.6, "b"), rect(0, 0, S * k, 0.6, "a")];
    els.push(txt(v(M * k + 0.15, 1.6), "maliyet 160", "e", { tone: "ink", small: true, bold: true }), txt(v(Math.max(S, M) * k + 0.15, 0.3), `satış ${S}`, "e", { tone: "ink", small: true, bold: true }));
    if (K > 0) els.push(rect(M * k, 0, K * k, 0.6, "c", true, true), txt(v(((M + S) / 2) * k, -0.05), `kâr ${K}`, "s", { tone: "c", small: true, bold: true }));
    if (K < 0) els.push(rect(S * k, 0, -K * k, 0.6, "warn", false, true), txt(v(((M + S) / 2) * k, -0.05), `zarar ${-K}`, "s", { tone: "warn", small: true, bold: true }));
    els.push(frame(-0.3, 2.3), frame(240 * k + 3, -1));
    return {
      els,
      readout:
        K === 0
          ? ["S = M: başabaş, kâr ve zarar 0.", "“Zarar yok” S ≥ M; “kâr var” S > M ister."]
          : [
              `${K > 0 ? "Kâr" : "Zarar"} ${Math.abs(K)} TL · maliyete göre %${fmt((Math.abs(K) / M) * 100, 2)}`,
              `Aynı farkın satışa oranı %${fmt((Math.abs(K) / S) * 100, 2)}: satış marjı, kâr yüzdesi değil`,
            ],
    };
  },
};

const esitSatis: FigureDef = {
  caption:
    "Sürgüyle oranı değiştir. Üstteki iki çubuk eşit satış durumudur: iki ürün 300'er TL, biri %r kâr biri %r zararla satılır; maliyetler 300/(1 + r) ve 300/(1 − r) olur, toplam maliyet satıştan büyük kalır. Alttaki iki çubukta maliyetler eşittir ve sonuç başabaştır.",
  alt: "İki grup yatay çubuk. Üst grupta eşit satışlı iki ürünün toplam maliyeti ve toplam satışı; alt grupta eşit maliyetli iki ürünün toplam maliyeti ve toplam satışı. Uzunluklar TL ile orantılı.",
  param: { label: "Oran r", min: 5, max: 50, step: 5, init: 20, unit: "%" },
  draw: (rp) => {
    const r = rp / 100;
    const k = 0.0075;
    const m1 = 300 / (1 + r);
    const m2 = 300 / (1 - r);
    const costSale = m1 + m2;
    const els: El[] = [];
    const bar = (y: number, val: number, tone: Tone, label: string) => {
      els.push(rect(0, y, val * k, 0.45, tone));
      els.push(txt(v(val * k + 0.15, y + 0.22), `${label} ${fmt(val, 2)}`, "e", { tone: "ink", small: true, bold: true }));
    };
    els.push(txt(v(0, 4.15), "eşit satış", "e", { tone: "ink", small: true, bold: true }));
    bar(3.2, costSale, "warn", "maliyet");
    bar(2.6, 600, "a", "satış");
    els.push(txt(v(0, 1.55), "eşit maliyet", "e", { tone: "ink", small: true, bold: true }));
    bar(0.6, 600, "warn", "maliyet");
    bar(0, 600, "a", "satış");
    els.push(frame(-0.3, 4.7), frame(800 * k + 3.4, -0.4));
    return {
      els,
      readout: [
        `Eşit satış: ${fmt(m1, 2)} + ${fmt(m2, 2)} = ${fmt(costSale, 2)} TL maliyet, 600 TL satış · zarar %${fmt(((costSale - 600) / costSale) * 100, 2)} = r²`,
        `Eşit maliyet: 300 · ${fmt(1 + r, 2)} + 300 · ${fmt(1 - r, 2)} = 600 TL · başabaş`,
      ],
    };
  },
};

const fire: FigureDef = {
  caption:
    "Sürgüyle fire oranını değiştir. 60 kg mal kilosu 25 TL'den alınır, 300 TL nakliye ödenir: maliyet 1800 TL ve fireyle değişmez. Gelir yalnız kalan kilogramdan gelir (45 TL/kg). Fire %33,3'ü aşınca gelir maliyetin altına iner.",
  alt: "Solda 60 kilogramı gösteren on ikiye beş kutu ızgarası; fire olan kutular boş ve köşeleri işaretli. Sağda iki dikey çubuk: sabit maliyet ve fireyle azalan gelir.",
  param: { label: "Fire", min: 0, max: 50, step: 5, init: 20, unit: "%" },
  draw: (f) => {
    const lost = (60 * f) / 100;
    const sold = 60 - lost;
    const cost = 60 * 25 + 300;
    const income = sold * 45;
    const s = 0.42;
    const els: El[] = [];
    for (let i = 0; i < 60; i++) {
      const col = i % 12;
      const row = Math.floor(i / 12);
      const x = col * s;
      const y = (4 - row) * s + 0.6;
      const isLost = i >= sold;
      els.push(rect(x + 0.03, y + 0.03, s - 0.06, s - 0.06, isLost ? "warn" : "b", !isLost));
      if (isLost) els.push(poly([v(x + 0.03, y + s - 0.03), v(x + 0.2, y + s - 0.03), v(x + 0.03, y + s - 0.2)], { tone: "warn", fill: "warn" }));
    }
    els.push(txt(v(6 * s, 0.5), `${sold} kg satılır · ${lost} kg fire`, "s", { tone: "ink", small: true, bold: true }));
    const k = 0.0011;
    const x0 = 12 * s + 1.2;
    els.push(seg(v(x0 - 0.3, 0.6), v(x0 + 3.5, 0.6), { tone: "ink" }));
    els.push(rect(x0, 0.6, 1, cost * k, "warn"), txt(v(x0 + 0.5, 0.6 + cost * k), String(cost), "n", { tone: "ink", small: true, bold: true }), txt(v(x0 + 0.5, 0.55), "maliyet", "s", { tone: "ink", small: true }));
    els.push(rect(x0 + 2, 0.6, 1, income * k, "a"), txt(v(x0 + 2.5, 0.6 + income * k), String(income), "n", { tone: "ink", small: true, bold: true }), txt(v(x0 + 2.5, 0.55), "gelir", "s", { tone: "ink", small: true }));
    els.push(frame(-0.3, 0.6 + 2700 * k + 0.8), frame(x0 + 4.2, -0.6));
    const diff = income - cost;
    return {
      els,
      readout: [
        `Maliyet 60 · 25 + 300 = ${cost} TL · gelir ${sold} · 45 = ${income} TL`,
        diff === 0
          ? "Başabaş."
          : `${diff > 0 ? "Kâr" : "Zarar"} ${Math.abs(diff)} TL, maliyete göre %${fmt((Math.abs(diff) / cost) * 100, 2)} · başabaş fire 1800 = 2700(1 − f) ⇒ f = 1/3`,
      ],
    };
  },
};

const satilmayan: FigureDef = {
  caption:
    "Sürgüyle satılan adedi değiştir. Sabit gider 400 TL, her ürünün üretimi 10 TL, satış 30 TL. Üst çubukta 50 ürün üretilmiştir ve gider 900 TL'de sabit kalır; başabaş 30 adette. Alt çubukta yalnız satılan kadar üretilir; başabaş 20 adette. Üretilen ve satılan adedi karıştırma.",
  alt: "Sıfır çizgisinin iki yanına uzanan iki yatay kâr çubuğu: üstte 50 üretim varken, altta üretim satış kadarken. Sürgü satılan adedi 0'dan 50'ye değiştirir; çubuk sıfırın solundaysa zarar, sağındaysa kâr.",
  param: { label: "Satılan adet s", min: 0, max: 50, step: 2, init: 26 },
  draw: (sCount) => {
    const k = 0.006;
    const p1 = 30 * sCount - (400 + 10 * 50);
    const p2 = 20 * sCount - 400;
    const els: El[] = [seg(v(0, -0.4), v(0, 2.5), { tone: "ink" })];
    const bar = (y: number, p: number, name: string) => {
      if (p !== 0) els.push(rect(Math.min(0, p * k), y, Math.abs(p) * k, 0.6, p > 0 ? "c" : "warn", true, p > 0));
      els.push(txt(v(p >= 0 ? p * k + 0.15 : 0.15, y + 0.3), `${p > 0 ? "kâr" : p < 0 ? "zarar" : "başabaş"} ${Math.abs(p)}`, "e", { tone: "ink", small: true, bold: true }));
      els.push(txt(v(-900 * k - 0.2, y + 0.3), name, "w", { tone: "ink", small: true, bold: true }));
    };
    bar(1.4, p1, "50 üretim");
    bar(0.2, p2, "s üretim");
    els.push(txt(v(0, -0.45), "0", "s", { tone: "muted", small: true, soft: true }));
    els.push(frame(-900 * k - 2.6, 2.8), frame(600 * k + 2.2, -1));
    return {
      els,
      readout: [
        `50 üretim: 30 · ${sCount} − (400 + 10 · 50) = ${signed(p1)} TL · başabaş 30 · s = 900 ⇒ s = 30`,
        `s üretim: (30 − 10) · ${sCount} − 400 = ${signed(p2)} TL · başabaş s = 20`,
      ],
    };
  },
};

export const mathFigures064Sheets: Record<string, Record<string, FigureDef>> = {
  "ardisik-sayilar": {
    "Ardışıklık yalnız farklı olmak değildir": ardisikTur,
    "Toplam formülü neden çalışır?": tekKare,
    "Ortalama her zaman bir terim olmak zorunda değildir": dortArdisik,
    "Sorudaki sırayı ve terim numarasını açık tut": uyelik,
  },
  "asal-sayilar": {
    "Asal olmak iki farklı pozitif bölen demektir": dikdortgen,
  },
  "tyt-mat-asal-kaynak-032": {
    "Birden çok sayıyı birlikte ele: 1–50 eleği": elek,
    "Toplam ve fark birlikte asalsa neden yalnız 2 ile 5?": ucluKalan,
    "Birleşik basamak probleminde aday listesini küçült": basamak,
  },
  "yas-problemleri": {
    "Toplam n kez, ortalama bir kez değişir": grupToplam,
    "Oranı verildiği zamandaki yaşlarla kur": oranBlok,
    "Birinin bugünü, ötekinin geçmişi olabilir": capraz,
    "En az koşulu ve tam yıl seçimi": enAz,
  },
  "kar-zarar-problemleri": {
    "Standart kâr yüzdesinin tabanı maliyettir": kirTaban,
    "Eşit satış ile eşit maliyet farklı toplamlar verir": esitSatis,
    "Fire satılabilir miktarı azaltır, ödenmiş maliyeti silmez": fire,
    "Üretilen ve satılan adetleri ayır": satilmayan,
  },
};
