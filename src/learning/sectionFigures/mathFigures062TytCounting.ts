import { separatedPermutations032 } from "../separatedPermutationsSource032Model";
import { waypointPaths033 } from "../waypointPathsSource033Model";
import { circle, poly, pt, seg, txt, v, vec, type El, type FigureDef, type Tone } from "./figureKit";
import { cell, choose, fact, frac, pad, rect, sup, table, tn } from "./mathFigures062TytKit";

/*
 * TYT Matematik (Forge062) · Aurelia sayma ve olasılık dersleri:
 * permütasyon, tekrarlı permütasyon, kombinasyon, binom açılımı, olasılık.
 * Yuva şeritleri, konum seçimi, etiket silme, boşluk yöntemi, tümleyen,
 * durum sütunları, seçim ağacı, Pascal üçgeni, üs tablosu, zar ızgarası,
 * Venn bölgeleri ve olasılık ağacı. Sayılar bölümdeki örneklerden aynı
 * kurallarla hesaplanır; laboratuvarlardaki oturma, kafes yolu, nokta seçimi
 * ve koşullu zar görünümleri burada tekrarlanmaz.
 */

/* ---------- ortak: yatay seçim ağacı ---------- */

/**
 * İkili seçim ağacı: kökten sağa doğru `depth` kademe. Her dal dirsekli
 * çizilir; dal etiketi yatay parçanın üstünde durur, çizgiyle çakışmaz.
 */
function tree(depth: number, label: (path: string, c: 0 | 1) => string, leaf: (path: string) => { s: string; tone: Tone }, branchTone: (path: string, c: 0 | 1) => Tone = () => "muted"): El[] {
  const L = 2.3;
  const dy = 0.75;
  const els: El[] = [];
  const n = 2 ** depth;
  const yOf = (path: string) => {
    const lvl = path.length;
    const span = 2 ** (depth - lvl);
    const idx = path === "" ? 0 : parseInt(path, 2);
    return -((idx * span + (span - 1) / 2) * dy);
  };
  const walk = (path: string) => {
    const x = path.length * L;
    const y = yOf(path);
    if (path.length === depth) {
      const f = leaf(path);
      els.push(txt(v(x + 0.15, y), f.s, "e", { tone: f.tone, small: true, bold: f.tone !== "muted" }));
      return;
    }
    for (const c of [0, 1] as const) {
      const child = path + c;
      const yc = yOf(child);
      const tone = branchTone(path, c);
      els.push(seg(v(x, y), v(x + 0.25, y), { tone, thin: true }), seg(v(x + 0.25, y), v(x + 0.25, yc), { tone, thin: true }), seg(v(x + 0.25, yc), v(x + L, yc), { tone, thin: tone === "muted" }));
      els.push(txt(v(x + 0.25 + (L - 0.25) / 2, yc + 0.06), label(path, c), "n", { tone: tone === "muted" ? "ink" : tone, small: true }));
      walk(child);
    }
  };
  walk("");
  els.push(pt(v(0, yOf("")), undefined, "n", "ink"));
  els.push(...pad(-0.3, 0.7, depth * L + 2.6, -(n - 1) * dy - 0.4));
  return els;
}

/* ===================== Permütasyon ===================== */

const slots: FigureDef = {
  caption:
    "Yuva şeridi: 7 farklı kişiden r tanesi sıraya konur. İlk yuvada 7, ikincide 6 seçenek vardır; her dolan yuva bir seçeneği eksiltir, son yuvada 7 − r + 1 kalır. Çarpım P(7, r) = 7!/(7 − r)!’dir. r = 0’da boş liste tek sonuçtur.",
  alt: "Yan yana r yuva; her yuvanın içinde o yuvadaki seçenek sayısı, aralarında çarpım işaretleri.",
  param: { label: "r", min: 0, max: 7, step: 1, init: 3 },
  draw: (r) => {
    const els: El[] = [];
    const w = 1.0;
    const g = 0.35;
    for (let i = 0; i < r; i++) {
      els.push(...cell(i * (w + g), 0, w, 0.9, String(7 - i), i === r - 1 ? "warn" : "a"));
      els.push(txt(v(i * (w + g) + w / 2, -0.12), `${i + 1}. yuva`, "s", { tone: "muted", small: true, soft: true }));
      if (i < r - 1) els.push(txt(v(i * (w + g) + w + g / 2, 0.45), "·", "c", { tone: "ink", bold: true }));
    }
    if (r === 0) els.push(txt(v(3, 0.45), "boş liste: 1 sonuç", "c", { tone: "muted", small: true }));
    els.push(...pad(-0.3, 1.2, 7 * (w + g), -0.8));
    const prod = Array.from({ length: r }, (_, i) => 7 - i);
    const val = prod.reduce((s, x) => s * x, 1);
    return { els, readout: [r ? `P(7, ${r}) = ${prod.join(" · ")} = ${tn(val)}.` : "P(7, 0) = 1.", `7!/(7 − ${r})! = ${tn(fact(7))}/${tn(fact(7 - r))} = ${tn(val)}.`] };
  },
};

const DIGIT_CASES: { name: string; slots: [string, string][]; count: number }[] = [
  { name: "son rakam 0", slots: [["yüzler", "1, 2, 3"], ["onlar", "kalan 2"], ["birler", "0"]], count: 6 },
  { name: "son rakam 2", slots: [["yüzler", "1 veya 3"], ["onlar", "kalan 2"], ["birler", "2"]], count: 4 },
];
const digitSlots: FigureDef = {
  caption:
    "0, 1, 2, 3 ile rakamları farklı üç basamaklı çift sayı. Son rakam iki koşulu birden taşır, bu yüzden önce o ayrılır: son 0 iken yüzler üç, onlar iki seçenek (6); son 2 iken yüzler 0 olamaz, yalnız 1 veya 3 (4). Ayrık durumların sayıları eşit değildir; toplanır: 6 + 4 = 10.",
  alt: "Her durum için üç yuvalı satır: yuvanın adı, izinli rakamlar ve seçenek sayısı; satır sonunda durumun sonucu.",
  steps: ["son 0", "son 2", "iki durumu topla"],
  draw: (_, step) => {
    const els: El[] = [];
    const rows = step === 2 ? [0, 1] : [step];
    rows.forEach((ci, r) => {
      const c = DIGIT_CASES[ci];
      const y = -r * 2.6;
      const counts = ci === 0 ? [3, 2, 1] : [2, 2, 1];
      c.slots.forEach(([name, allowed], i) => {
        els.push(...cell(i * 2.7, y, 2.5, 0.8, String(counts[i]), i === 2 ? "warn" : "a"));
        els.push(txt(v(i * 2.7 + 1.25, y + 0.9), name, "n", { tone: "muted", small: true }));
        els.push(txt(v(i * 2.7 + 1.25, y - 0.1), allowed, "s", { tone: "ink", small: true }));
      });
      els.push(txt(v(8.2, y + 0.4), `= ${c.count}`, "e", { tone: "ink", bold: true }));
    });
    els.push(...pad(-0.3, 1.6, 9.8, -3.5));
    const lines = [
      ["Son 0: 3 · 2 · 1 = 6.", "0 sonda olduğu için yüzlerde yasak sorun çıkarmaz."],
      ["Son 2: 2 · 2 · 1 = 4.", "Yüzler 0 olamaz ve 2 kullanıldı: yalnız 1 veya 3."],
      ["Ayrık durumlar: 6 + 4 = 10.", "Tek bir 3 · 2 · 2 çarpımı iki durumu yanlış sayar."],
    ];
    return { els, readout: lines[step] };
  },
};

const ADJ_STEPS = ["A ve B bitişik", "Komşu olmayanlar", "A, B’nin önünde"];
const adjacent: FigureDef = {
  caption:
    "Altı farklı kişi. Bitişiklik için A ile B tek blok sayılır: blok ve dört kişi 5! sırada, blok içi AB ya da BA, toplam 2 · 5! = 240. Komşu olmayanlar 6! − 240 = 480’dir. “A, B’nin önünde” koşulunda aralarına başkası girebilir; her sıra A ile B yer değiştirince bir eşe bağlanır ve tam biri koşulu sağlar: 6!/2 = 360.",
  alt: "Kişi hücrelerinden oluşan satırlar: bitişik blok çerçeveli; tümleyen şeridi; yer değiştiren iki sıra alt alta.",
  steps: ADJ_STEPS,
  draw: (_, step) => {
    const els: El[] = [];
    const w = 0.85;
    if (step === 0) {
      const row = ["AB", "C", "D", "E", "F"];
      row.forEach((s, i) => els.push(...cell(i === 0 ? 0 : 1.7 + (i - 1) * (w + 0.3), 0, i === 0 ? 1.4 : w, 0.8, s, i === 0 ? "warn" : "a", { fill: i === 0 })));
      els.push(txt(v(0.7, 0.95), "blok: AB ya da BA", "n", { tone: "warn", small: true }));
      els.push(...pad(-0.3, 1.8, 7.4, -0.4));
      return { els, readout: ["5 nesne: 5! = 120; blok içi 2 sıra.", "Bitişik: 2 · 120 = 240."] };
    }
    if (step === 1) {
      const k = 7.2 / 720;
      els.push(rect(0, 0, 240 * k, 0.8, "warn"), rect(240 * k, 0, 480 * k, 0.8, "a"));
      els.push(txt(v(120 * k, 0.4), "240", "c", { tone: "ink", bold: true }), txt(v(480 * k, 0.4), "480", "c", { tone: "ink", bold: true }));
      els.push(txt(v(120 * k, 0.95), "bitişik", "n", { tone: "warn", small: true }), txt(v(480 * k, 0.95), "komşu değil", "n", { tone: "a", small: true }));
      els.push(...pad(-0.3, 1.8, 7.4, -0.4));
      return { els, readout: ["Bütün sıralar 6! = 720.", "Komşu olmayan: 720 − 240 = 480."] };
    }
    const r1 = ["C", "A", "D", "B", "E", "F"];
    const r2 = ["C", "B", "D", "A", "E", "F"];
    [r1, r2].forEach((row, j) =>
      row.forEach((s, i) => els.push(...cell(i * (w + 0.3), -j * 1.3, w, 0.8, s, s === "A" || s === "B" ? (j ? "muted" : "warn") : "a", { fill: s === "A" || s === "B" ? j === 0 : true }))),
    );
    els.push(txt(v(6 * (w + 0.3) + 0.1, 0.4), "A önde", "e", { tone: "warn", small: true, bold: true }), txt(v(6 * (w + 0.3) + 0.1, -0.9), "B önde", "e", { tone: "muted", small: true }));
    els.push(...pad(-0.3, 1.2, 9.0, -1.0));
    return { els, readout: ["Her sıra, A ile B’yi değiştiren eşiyle çift oluşturur.", "Tam yarısında A önde: 720/2 = 360."] };
  },
};

const separateSpecialPeople: FigureDef = {
  caption: "Dört sıradan kişi iki uç dahil beş boşluk bırakır. Önce üç boşluk seç, sonra farklı üç kişiyi bu yerlere sırala.",
  alt: "Dört sıradan kişinin çevresindeki beş boşluk soldan sağa numaralı. İkinci çizimde A, B ve C birinci, üçüncü ve beşinci boşlukları doldurur.",
  steps: ["Beş boşluğu bul", "A, B ve C’yi yerleştir"],
  draw: (_, step) => {
    const counts = separatedPermutations032(7, 3, "row");
    const example = ["A", "", "B", "", "C"];
    const els: El[] = [];
    for (let i = 0; i < counts.gaps; i++) {
      const x = i * 2.2;
      const person = step === 1 ? example[i] : "";
      els.push(...cell(x, 0, 0.95, 0.82, person || "?", person ? "a" : "muted", { fill: person !== "" }));
      els.push(txt(v(x + 0.475, -0.18), String(i + 1), "s", { tone: "ink", small: true }));
      if (i < counts.ordinary) {
        els.push(...cell(x + 1.1, 0, 0.95, 0.82, `K${i + 1}`, "c"));
      }
    }
    els.push(...pad(-0.15, 1.18, 10, -0.82));
    return { els, readout: [
      `${counts.ordinary} sıradan kişi ${counts.gaps} boşluk bırakır. Üçünü seçmenin C(5, 3) = ${counts.allocations} yolu var.`,
      step === 0 ? "Ortadaki aralıkları ve iki ucu ayrı ayrı say."
        : `Seçili 1, 3, 5 boşluklarına A, B, C için ${counts.specialOrders} sıra. Sıradan kişilerin ${counts.ordinaryOrders} sırasıyla toplam ${tn(counts.separated)} düzen.`,
    ] };
  },
};

const TRIPLES: number[][] = [];
for (let a = 0; a < 6; a++) for (let b = a + 1; b < 6; b++) for (let c = b + 1; c < 6; c++) TRIPLES.push([a, b, c]);
const positions: FigureDef = {
  caption:
    "Birbirine karışabilen gruplar: altı görevde K, L, M bu sırada; R ve S, T’den önce. Önce K, L, M’nin kullanacağı üç konum seçilir (C(6, 3) = 20); sıraları koşulla belirlidir. Kalan üç konumun sonuncusuna T gider, önceki ikisine R ve S iki biçimde girer: 20 · 2 = 40. Sürgü 20 konum üçlüsünü tek tek gösterir.",
  alt: "Altı numaralı konum hücresi iki satırda: seçilen üç konumda sırayla K, L, M; kalan konumlarda R, S, T ve S, R, T.",
  param: { label: "konum üçlüsü", min: 1, max: 20, step: 1, init: 4 },
  draw: (i) => {
    const tri = TRIPLES[i - 1];
    const rest = [0, 1, 2, 3, 4, 5].filter((p) => !tri.includes(p));
    const els: El[] = [];
    const w = 1.0;
    for (const [j, fill] of [[0, ["R", "S", "T"]], [1, ["S", "R", "T"]]] as [number, string[]][]) {
      const row: string[] = Array(6).fill("");
      tri.forEach((p, q) => (row[p] = "KLM"[q]));
      rest.forEach((p, q) => (row[p] = fill[q]));
      row.forEach((s, p) => els.push(...cell(p * (w + 0.15), -j * 1.25, w, 0.85, s, "KLM".includes(s) ? "a" : s === "T" ? "warn" : "c")));
    }
    for (let p = 0; p < 6; p++) els.push(txt(v(p * (w + 0.15) + w / 2, 0.95), `${p + 1}.`, "n", { tone: "muted", small: true }));
    els.push(...pad(-0.3, 1.6, 6 * (w + 0.15), -1.6));
    return {
      els,
      readout: [`K, L, M konumları ${tri.map((p) => p + 1).join(", ")}; T son boş konum ${rest[2] + 1}.`, `${i}. üçlü / C(6, 3) = ${choose(6, 3)}; her üçlüde 2 tamamlanış: toplam ${choose(6, 3) * 2}.`],
    };
  },
};

/* ===================== Tekrarlı permütasyon ===================== */

const LABEL_ROWS: [string[], string][] = [
  [["A₁", "A₂", "B"], "AAB"],
  [["A₂", "A₁", "B"], "AAB"],
  [["A₁", "B", "A₂"], "ABA"],
  [["A₂", "B", "A₁"], "ABA"],
  [["B", "A₁", "A₂"], "BAA"],
  [["B", "A₂", "A₁"], "BAA"],
];
const eraseLabels: FigureDef = {
  caption:
    "Etiket silme: A₁, A₂, B kartlarının 3! = 6 etiketli sırası soldadır. Küçük etiketler silinince her iki satır aynı görünüşe düşer: AAB, ABA, BAA. Her görünüş tam 2! kez sayılmıştır; görünüş sayısı 6/2 = 3. Genel olarak n!/(a! b! c!).",
  alt: "Solda altı satır etiketli kart dizisi, ikişer ikişer sağdaki tek bir etiketsiz diziye oklarla bağlı.",
  draw: () => {
    const els: El[] = [];
    const w = 0.8;
    LABEL_ROWS.forEach(([cards], r) => {
      const y = -r * 0.95 - Math.floor(r / 2) * 0.3;
      cards.forEach((s, i) => els.push(...cell(i * (w + 0.1), y, w, 0.75, s, s === "B" ? "c" : "a")));
      if (r % 2 === 0) {
        const mid = y - 0.1;
        const x0 = 3 * (w + 0.1) + 0.15;
        els.push(vec(v(x0, y + 0.375), v(4.3, mid + 0.12), { tone: "muted", thin: true }));
        els.push(vec(v(x0, y - 0.575), v(4.3, mid - 0.12), { tone: "muted", thin: true }));
        LABEL_ROWS[r][1].split("").forEach((s, i) => els.push(...cell(4.5 + i * (w + 0.1), mid - 0.375, w, 0.75, s, s === "B" ? "c" : "a", { fill: false })));
      }
    });
    els.push(...pad(-0.3, 1.0, 7.4, -6.3));
    return { els, readout: ["6 etiketli sıra → 3 görünüş: her görünüş 2! = 2 kez.", "3!/2! = 3."] };
  },
};

const FIX_STEPS = ["C başta sabit", "İlk üçte tam iki A", "BB tek blok"];
const fixedPlaces: FigureDef = {
  caption:
    "Sabit yer ve konum grupları. A, A, A, B, B, C’de C başa sabitlenince kalan beş yerde üç A ve iki B kalır: 5!/(3! 2!) = 10. A, A, A, B, B, B’de ilk üç konumda tam iki A varsa iki grup ayrı sayılır: 3 · 3 = 9. A, A, B, B, C, C’de BB tek blok olunca beş nesne kalır: 5!/(2! 2!) = 30.",
  alt: "Konum hücreleri satırı: sabit kart, konum grupları ya da blok çerçeveyle işaretli; altında kalan tür adetleri.",
  steps: FIX_STEPS,
  draw: (_, step) => {
    const els: El[] = [];
    const w = 0.9;
    const g = 0.15;
    const rows: { s: string; tone: Tone; fill: boolean }[][] = [
      [{ s: "C", tone: "warn", fill: true }, ...Array(5).fill({ s: "?", tone: "muted", fill: false })],
      [{ s: "A", tone: "a", fill: true }, { s: "A", tone: "a", fill: true }, { s: "B", tone: "c", fill: true }, { s: "A", tone: "a", fill: false }, { s: "B", tone: "c", fill: false }, { s: "B", tone: "c", fill: false }],
      [{ s: "BB", tone: "warn", fill: true }, { s: "A", tone: "a", fill: false }, { s: "A", tone: "a", fill: false }, { s: "C", tone: "c", fill: false }, { s: "C", tone: "c", fill: false }],
    ];
    let x = 0;
    rows[step].forEach((c, i) => {
      const ww = c.s === "BB" ? 1.5 : w;
      els.push(...cell(x, 0, ww, 0.8, c.s, c.tone, { fill: c.fill }));
      if (step === 1 && i === 2) x += 0.4;
      x += ww + g;
    });
    if (step === 1) {
      els.push(seg(v(0, 1.0), v(3 * (w + g) - g, 1.0), { tone: "a", thin: true }), txt(v(1.4, 1.1), "2 A + 1 B: 3 yol", "n", { tone: "a", small: true }));
      els.push(seg(v(3 * (w + g) + 0.4, 1.0), v(6 * (w + g) + 0.4 - g, 1.0), { tone: "c", thin: true }), txt(v(3 * (w + g) + 0.4 + 1.4, 1.1), "1 A + 2 B: 3 yol", "n", { tone: "c", small: true }));
    }
    const notes = ["kalan 5 yer: 3 A, 2 B", "bir örnek: AAB | ABB", "5 nesne: BB, A, A, C, C"];
    els.push(txt(v(0, -0.2), notes[step], "se", { tone: "muted", small: true }));
    els.push(...pad(-0.3, 1.8, 6.8, -1.0));
    const lines = [
      ["5!/(3! 2!) = 10.", "C hem sabit yerde hem formülde sayılmaz."],
      ["İlk grup 3, ikinci grup 3 biçim: 3 · 3 = 9.", "Konum grupları bağımsız seçilir."],
      ["5!/(2! 2!) = 30.", "Özdeş B’lerin blok içi yer değiştirmesi yeni dizi yaratmaz."],
    ];
    return { els, readout: lines[step] };
  },
};

const PAIRS5: [number, number][] = [];
for (let a = 0; a < 5; a++) for (let b = a + 1; b < 5; b++) PAIRS5.push([a, b]);
const gaps: FigureDef = {
  caption:
    "Boşluk yöntemi: A, A, B, B, C, C’de A’lar yan yana gelmesin. Önce B, B, C, C dizilir (4!/(2! 2!) = 6 sıra); her sırada beş boşluk vardır. İki özdeş A iki farklı boşluğa C(5, 2) = 10 biçimde gider; iç sıra oluşmaz. Toplam 6 · 10 = 60; tümleyenle 90 − 30 = 60.",
  alt: "B, B, C, C kartları ve aralarındaki beş boşluk işareti; seçilen iki boşlukta A kartları.",
  param: { label: "boşluk çifti", min: 1, max: 10, step: 1, init: 1 },
  draw: (i) => {
    const [g1, g2] = PAIRS5[i - 1];
    const base = ["B", "B", "C", "C"];
    const els: El[] = [];
    let x = 0;
    for (let gIdx = 0; gIdx <= 4; gIdx++) {
      const used = gIdx === g1 || gIdx === g2;
      if (used) {
        els.push(...cell(x, 0, 0.8, 0.8, "A", "warn"));
        els.push(txt(v(x + 0.4, -0.12), `${gIdx + 1}`, "s", { tone: "warn", small: true }));
        x += 0.95;
      } else {
        els.push(seg(v(x + 0.12, 0), v(x + 0.12, 0.8), { tone: "muted", dash: true, thin: true }));
        els.push(txt(v(x + 0.12, -0.12), `${gIdx + 1}`, "s", { tone: "muted", small: true }));
        x += 0.35;
      }
      if (gIdx < 4) {
        els.push(...cell(x, 0, 0.8, 0.8, base[gIdx], "c", { fill: false }));
        x += 0.95;
      }
    }
    els.push(...pad(-0.3, 1.2, 7.6, -0.8));
    return { els, readout: [`Boşluklar ${g1 + 1} ve ${g2 + 1}: ${i}. seçim / C(5, 2) = 10.`, "6 · 10 = 60; tümleyen: 6!/(2!2!2!) − 5!/(2!2!) = 90 − 30 = 60."] };
  },
};

const ZERO_STEPS = ["Bütün diziler", "Başı 0 olanlar", "Beş basamaklı sayılar"];
const leadingZero: FigureDef = {
  caption:
    "0, 0, 2, 2, 3 rakamlarının bütün dizileri 5!/(2! 2!) = 30’dur. Başa bir 0 sabitlenince kalan 0, 2, 2, 3 için 4!/2! = 12 dizi sayı olamaz. Sayı olanlar 30 − 12 = 18’dir. İki sıfır özdeş olduğundan “hangi sıfır başta” diye 2 ile çarpılmaz. Şerit ölçeklidir.",
  alt: "30 birimlik şerit: başı 0 olan 12 birimlik parça ve sayı olan 18 birimlik parça; altta başı 0 olan örnek dizi.",
  steps: ZERO_STEPS,
  draw: (_, step) => {
    const k = 0.27;
    const els: El[] = [];
    if (step === 0) els.push(rect(0, 0, 30 * k, 0.8, "a"), txt(v(15 * k, 0.4), "30", "c", { tone: "ink", bold: true }));
    else {
      els.push(rect(0, 0, 12 * k, 0.8, "warn", step === 1), rect(12 * k, 0, 18 * k, 0.8, "a", step === 2));
      els.push(txt(v(6 * k, 0.4), "12", "c", { tone: "ink", bold: true }), txt(v(21 * k, 0.4), "18", "c", { tone: "ink", bold: true }));
      els.push(txt(v(6 * k, 0.95), "baş 0", "n", { tone: "warn", small: true }), txt(v(21 * k, 0.95), "sayı", "n", { tone: "a", small: true }));
    }
    const ex = step === 2 ? ["2", "0", "3", "0", "2"] : ["0", "2", "3", "0", "2"];
    ex.forEach((s, i) => els.push(...cell(i * 0.85, -1.4, 0.75, 0.75, s, i === 0 ? (step === 2 ? "a" : "warn") : "muted", { fill: i === 0 })));
    els.push(txt(v(5 * 0.85 + 0.1, -1.02), step === 2 ? "örnek sayı" : "örnek dizi", "e", { tone: "muted", small: true }));
    els.push(...pad(-0.3, 1.6, 30 * k + 0.3, -1.8));
    const lines = [
      ["Tekrarlı dizi: 5!/(2! 2!) = 30.", "Bu sayımda başta 0 olanlar da var."],
      ["Baş 0 sabit: kalan 0, 2, 2, 3 için 4!/2! = 12.", "Bu diziler beş basamaklı sayı değildir."],
      ["30 − 12 = 18 beş basamaklı sayı.", "Kodda baştaki 0’a izin varsa 30 kalır."],
    ];
    return { els, readout: lines[step] };
  },
};

const waypointRoute: FigureDef = {
  caption: "Örnek yol P’den önce ve sonra iki parçaya ayrılır. Her ilk yol her son yolla birleştirilir. P’ye uğramayanlar bütün yollardan geçenler çıkarılarak bulunur.",
  alt: "Yatay sağ adım ve düşey yukarı adım eksenleri. Başlangıç 0, 0. P 2, 1. Hedef 4, 3. İlk görünüm P’den geçen, ikinci görünüm P’ye uğramayan bir yol çizer.",
  steps: ["P’den geçen yol", "P’ye uğramayan yol"],
  draw: (_, step) => {
    const target = { x: 4, y: 3 };
    const stop = { x: 2, y: 1 };
    const model = waypointPaths033(target, stop);
    const remaining = choose(target.x + target.y - stop.x - stop.y, target.y - stop.y);
    const route = model.sampleRoute(step === 0 ? "via" : "avoiding") ?? [];
    const els: El[] = [];
    for (let x = 0; x <= target.x; x++) {
      els.push(seg(v(x, 0), v(x, target.y), { tone: "muted", thin: true }));
      els.push(txt(v(x, -0.14), String(x), "s", { tone: "ink", small: true, soft: true }));
    }
    for (let y = 0; y <= target.y; y++) {
      els.push(seg(v(0, y), v(target.x, y), { tone: "muted", thin: true }));
      els.push(txt(v(-0.14, y), String(y), "w", { tone: "ink", small: true, soft: true }));
    }
    els.push(txt(v(2, -0.62), "Sağ adım", "s", { tone: "ink", small: true }));
    els.push(txt(v(0, 3.35), "Yukarı adım", "n", { tone: "ink", small: true }));
    route.slice(1).forEach((end, index) => {
      const start = route[index];
      const afterStop = step === 0 && start.x + start.y >= stop.x + stop.y;
      els.push(seg(v(start.x, start.y), v(end.x, end.y), { tone: afterStop ? "c" : "a", dash: afterStop, bold: true }));
    });
    els.push(pt(v(stop.x, stop.y), "P", "nw", "warn", true), pt(v(target.x, target.y), "Hedef", "ne", "ink"));
    els.push(...pad(-0.65, 3.9, 4.65, -0.95));
    return { els, readout: step === 0
      ? [`P’ye kadar ${model.waypoint.total} yol. P’den hedefe ${remaining} yol. P’den geçen ${model.target.via} tam yol.`,
        "Düz çizgi P’ye kadar olan örnek parçayı, kesikli çizgi P’den sonraki parçayı gösterir."]
      : [`Bütün ${model.target.total} yoldan ${model.target.via} geçen yol çıkar. P’ye uğramayan ${model.target.avoiding} yol kalır.`,
        "Çizilen örnek yol, P işaretine basmadan hedefe ulaşır."] };
  },
};

/* ===================== Kombinasyon ===================== */

const LETTERS = "ABCDEFGHI".split("");
const complement: FigureDef = {
  caption:
    "Dokuz adaydan r kişilik grup kurmak, dışarıda kalacak 9 − r kişiyi seçmekle birebir eşleşir: C(9, r) = C(9, 9 − r). r = 0’da tek boş grup, r = 9’da herkesin olduğu tek grup vardır. Sürgüyle grubun içini ve dışını birlikte izle.",
  alt: "Dokuz kişi hücresi; ilk r tanesi grup çerçevesinin içinde, kalanlar dışarıda çerçeveyle ayrılmış.",
  param: { label: "r", min: 0, max: 9, step: 1, init: 7 },
  draw: (r) => {
    const els: El[] = [];
    const w = 0.75;
    const g = 0.12;
    LETTERS.forEach((s, i) => {
      const x = i * (w + g) + (i >= r ? 0.5 : 0);
      els.push(...cell(x, 0, w, 0.75, s, i < r ? "a" : "c", { fill: i < r }));
    });
    if (r > 0) els.push(rect(-0.1, -0.1, r * (w + g) - g + 0.2, 0.95, "a", false), txt(v((r * (w + g)) / 2, 1.0), `grupta ${r}`, "n", { tone: "a", small: true, bold: true }));
    if (r < 9) {
      const x0 = r * (w + g) + 0.5;
      els.push(txt(v(x0 + ((9 - r) * (w + g)) / 2, -0.25), `dışarıda ${9 - r}`, "s", { tone: "c", small: true, bold: true }));
    }
    els.push(...pad(-0.4, 1.6, 9 * (w + g) + 0.7, -1.0));
    return { els, readout: [`C(9, ${r}) = C(9, ${9 - r}) = ${choose(9, r)}.`, "Bu çizim bir örnek grup gösterir; sayım bütün seçimlerdir."] };
  },
};

const forced: FigureDef = {
  caption:
    "Zorunlu kişi sabitlenir, yasak kişi listeden çıkarılır: dokuz adaydan dört kişi, A zorunlu, B yasak ise kalan yedi kişiden üç seçim, C(7, 3) = 35. “A ve B birlikte olmasın” başka bir koşuldur: sekiz kişiden üçlü grupların hepsinden (56) ikisinin birden bulunduğu C(6, 1) = 6 grup çıkarılır.",
  alt: "Kişi hücreleri: zorunlu kişi grup kutusunda, yasak kişi kesik çerçeveyle dışarıda, kalan aday havuzu ayrı.",
  steps: ["A zorunlu, B yasak", "A ve B birlikte olmasın"],
  draw: (_, step) => {
    const els: El[] = [];
    const w = 0.75;
    if (step === 0) {
      els.push(...cell(0, 0, w, 0.75, "A", "warn"), txt(v(w / 2, 0.9), "grupta", "n", { tone: "warn", small: true }));
      els.push(...cell(1.3, 0, w, 0.75, "B", "muted", { fill: false }), txt(v(1.3 + w / 2, 0.9), "yasak", "n", { tone: "muted", small: true }));
      LETTERS.slice(2).forEach((s, i) => els.push(...cell(2.8 + i * (w + 0.1), 0, w, 0.75, s, "c", { fill: false })));
      els.push(txt(v(2.8 + (7 * (w + 0.1)) / 2, 0.9), "havuz: 7 kişiden 3", "n", { tone: "c", small: true }));
    } else {
      els.push(...cell(0, 0, w, 0.75, "A", "warn"), ...cell(w + 0.1, 0, w, 0.75, "B", "warn"));
      els.push(rect(-0.1, -0.1, 2 * w + 0.3, 0.95, "warn", false), txt(v(w + 0.05, 0.95), "ikisi birlikte", "n", { tone: "warn", small: true }));
      LETTERS.slice(2, 8).forEach((s, i) => els.push(...cell(2.8 + i * (w + 0.1), 0, w, 0.75, s, "c", { fill: false })));
      els.push(txt(v(2.8 + (6 * (w + 0.1)) / 2, 0.95), "üçüncü üye: 6 seçenek", "n", { tone: "c", small: true }));
    }
    els.push(...pad(-0.3, 1.7, 9.0, -0.5));
    return { els, readout: step === 0 ? ["A bir yeri doldurur, B aday değildir: C(7, 3) = 35.", "Zorunlu üyeyi kalan adaylar içinde yeniden sayma."] : ["Bütün üçlüler C(8, 3) = 56; A ve B birlikte: C(6, 1) = 6.", "56 − 6 = 50; A ya da B tek başına olabilir."] };
  },
};

const CASE_STEPS = ["tam iki fen", "en az iki fen", "en çok iki fen"];
const cases: FigureDef = {
  caption:
    "Dört fen ve beş sanat adayından üç kişi. Her sütun fen sayısına göre ayrık bir durumdur: C(4, k) · C(5, 3 − k). Bir grup aynı anda iki duruma giremez, bu yüzden istenen durumların sayıları toplanır. Bütün sütunların toplamı C(9, 3) = 84’tür. Sütunlar ölçeklidir.",
  alt: "Fen sayısı 0, 1, 2, 3 için dört sütun; yükseklik grup sayısı; seçilen durumların sütunları dolu.",
  steps: CASE_STEPS,
  draw: (_, step) => {
    const vals = [0, 1, 2, 3].map((k) => choose(4, k) * choose(5, 3 - k));
    const pick = [[2], [2, 3], [0, 1, 2]][step];
    const els: El[] = [seg(v(-0.3, 0), v(4 * 1.8, 0), { tone: "ink", thin: true })];
    const h = 0.085;
    vals.forEach((val, k) => {
      const on = pick.includes(k);
      els.push(rect(k * 1.8 + 0.3, 0, 1.2, val * h, on ? "a" : "muted", on));
      els.push(txt(v(k * 1.8 + 0.9, val * h + 0.1), `${choose(4, k)} · ${choose(5, 3 - k)} = ${val}`, "n", { tone: on ? "ink" : "muted", small: true }));
      els.push(txt(v(k * 1.8 + 0.9, -0.15), `${k} fen`, "s", { tone: "muted", small: true }));
    });
    els.push(...pad(-0.3, 40 * h + 0.8, 4 * 1.8, -0.8));
    const sum = pick.reduce((s, k) => s + vals[k], 0);
    return { els, readout: [`${pick.map((k) => vals[k]).join(" + ")} = ${sum}.`, "Ayrık durumlar toplanır; hepsi birlikte 84."] };
  },
};

const CARDS = ["T₁", "T₂", "Y₁", "Y₂", "Y₃"];
const PAIRS: [number, number][] = [];
for (let a = 0; a < 5; a++) for (let b = a + 1; b < 5; b++) PAIRS.push([a, b]);
const atLeast: FigureDef = {
  caption:
    "İki T (turuncu) ve üç Y (yeşil) farklı karttan iki kart: bütün ikililer C(5, 2) = 10. Hiç T içermeyenler yalnız Y’lerden seçilir: C(3, 2) = 3. En az bir T: 10 − 3 = 7. Denetim: tam bir T 2 · 3 = 6, iki T 1; 6 + 1 = 7.",
  alt: "On kart ikilisi iki satırda; ikililer T içerip içermemesine göre dolu ya da boş çerçeveyle ayrılmış.",
  steps: ["bütün ikililer", "hiç T yok", "en az bir T"],
  draw: (_, step) => {
    const els: El[] = [];
    const w = 0.72;
    PAIRS.forEach(([a, b], i) => {
      const x = (i % 5) * 2.0;
      const y = -Math.floor(i / 5) * 1.2;
      const hasT = a < 2;
      const on = step === 0 || (step === 1 ? !hasT : hasT);
      els.push(...cell(x, y, w, 0.75, CARDS[a], a < 2 ? "warn" : "c", { fill: on }), ...cell(x + w + 0.06, y, w, 0.75, CARDS[b], b < 2 ? "warn" : "c", { fill: on }));
    });
    els.push(...pad(-0.3, 1.0, 5 * 2.0, -1.6));
    const lines = [
      ["C(5, 2) = 10 ikili.", "Seçim sırası sonucu değiştirmez."],
      ["Yalnız Y’lerden: C(3, 2) = 3.", "Tümleyen: hiç T yok."],
      ["En az bir T: 10 − 3 = 7.", "Denetim: 2 · 3 + 1 = 7."],
    ];
    return { els, readout: lines[step] };
  },
};

const linesAndTriangles: FigureDef = {
  caption: "En az üç doğrusal nokta varsa üçgen ile doğru sayımı farklı değişir. A, B, C, D aynı doğru üzerinde. Diğer hiçbir üçlü doğrusal değil.",
  alt: "A, B, C ve D yatay aynı doğru boyunca. E, F, G, H farklı yüksekliklerde. İlk çizimde A, B, E üçgeni görünür. İkinci çizimde A, B, C ve D’nin ortak doğrusu vurgulanır.",
  steps: ["Üçgenleri say", "Farklı doğruları say"],
  draw: (_, step) => {
    const points = [v(0, 0), v(1, 0), v(3, 0), v(5, 0), v(0.7, 1.4), v(2.2, 3.1), v(4.6, 2.3), v(6.4, 4.7)];
    const els: El[] = [
      vec(v(-0.45, -0.45), v(6.8, -0.45), { tone: "muted", thin: true }),
      vec(v(-0.45, -0.45), v(-0.45, 5.05), { tone: "muted", thin: true }),
      txt(v(3.25, -0.85), "Yatay koordinat (birim)", "s", { tone: "ink", small: true }),
      txt(v(-0.43, 5.1), "Düşey koordinat (birim)", "n", { tone: "ink", small: true }),
      seg(v(-0.14, 0), v(6.15, 0), { tone: step === 0 ? "muted" : "a", bold: step === 1 }),
    ];
    for (const tick of [0, 2, 4, 6]) els.push(txt(v(tick, -0.45), String(tick), "s", { tone: "ink", small: true }));
    for (const tick of [0, 1, 2, 3, 4, 5]) els.push(txt(v(-0.49, tick), String(tick), "w", { tone: "ink", small: true }));
    if (step === 0) els.push(poly([points[0], points[1], points[4]], { tone: "a", fill: "a" }));
    points.forEach((point, i) => els.push(pt(point, "ABCDEFGH"[i], "ne", i < 4 ? "ink" : "c")));
    els.push(...pad(-1.1, 5.9, 7.2, -1.35));
    return { els, readout: step === 0
      ? [`${choose(8, 3)} üçlüden ${choose(4, 3)} doğrusal üçlü çıkar. ${choose(8, 3) - choose(4, 3)} üçgen kalır.`, "A, B, E alan kaplar. A, B, C aynı doğru üzerinde kalır."]
      : [`${choose(8, 2)} nokta çifti. Ortak doğruyu veren ${choose(4, 2)} çiftin yerine bir doğru yaz. ${choose(8, 2) - choose(4, 2) + 1} farklı doğru.`] };
  },
};

/* ===================== Binom açılımı ===================== */

const binomTree: FigureDef = {
  caption:
    "(a + b)³ üç çarpandır; her çarpandan a ya da b seçilir. Ağacın sekiz yaprağı sekiz seçim dizisidir. Seçilen b sayısı r olan yapraklar aynı terimi verir ve C(3, r) tanedir: 1, 3, 3, 1. Böylece a³ + 3a²b + 3ab² + b³.",
  alt: "Soldan sağa üç kademeli ikili ağaç; dallarda a ya da b; yapraklarda seçim dizisi; seçilen r değerine uyan yapraklar vurgulu.",
  steps: [0, 1, 2, 3].map((r) => `r = ${r} tane b`),
  draw: (_, step) => {
    const bs = (p: string) => p.split("").filter((c) => c === "1").length;
    const els = tree(3, (_, c) => (c ? "b" : "a"), (p) => ({ s: p.replace(/0/g, "a").replace(/1/g, "b"), tone: bs(p) === step ? "warn" : "muted" }), (p, c) => (bs(p + c) <= step && 3 - (p.length + 1) >= step - bs(p + c) ? "a" : "muted"));
    const term = [`a³`, `3a²b`, `3ab²`, `b³`][step];
    return { els, readout: [`r = ${step}: C(3, ${step}) = ${choose(3, step)} yaprak → ${term}.`, "Genel terim C(n, r) · aⁿ⁻ʳ · bʳ."] };
  },
};

const pascal: FigureDef = {
  caption:
    "Pascal üçgeni: her satırın uçları 1, içteki sayı üstteki iki komşunun toplamıdır: C(n, r) = C(n − 1, r − 1) + C(n − 1, r). Son satırın orta sayısı ve onu oluşturan iki üst komşu işaretlidir. Satır toplamı (1 + 1)ⁿ = 2ⁿ’dir.",
  alt: "0’dan n’ye satırlar halinde üçgen sayı dizisi; son satırın bir sayısı ve üst satırdaki iki komşusu vurgulu.",
  param: { label: "n", min: 2, max: 7, step: 1, init: 7 },
  draw: (n) => {
    const els: El[] = [];
    const w = 0.95;
    const h = 0.8;
    const r = Math.max(1, Math.floor(n / 2) - (n % 2 ? 0 : 1));
    for (let i = 0; i <= n; i++)
      for (let j = 0; j <= i; j++) {
        const x = (j - i / 2) * w;
        const hot = (i === n && j === r) || (i === n - 1 && (j === r - 1 || j === r));
        els.push(...cell(x - w / 2 + 0.04, -i * h, w - 0.08, h - 0.08, String(choose(i, j)), i === n && j === r ? "warn" : hot ? "a" : "muted", { fill: hot }));
      }
    els.push(...pad(-(n / 2) * w - 0.6, h + 0.2, (n / 2) * w + 0.6, -n * h - 0.3));
    return {
      els,
      readout: [`C(${n}, ${r}) = C(${n - 1}, ${r - 1}) + C(${n - 1}, ${r}) = ${choose(n - 1, r - 1)} + ${choose(n - 1, r)} = ${choose(n, r)}.`, `${n}. satırın toplamı 2${sup(n)} = ${2 ** n}.`],
    };
  },
};

const EXP_STEPS: [string, number][] = [["sabit terim (x⁰)", 0], ["x¹", 1], ["x⁶", 6]];
const exponentTable: FigureDef = {
  caption:
    "(x² + 2/x)⁶ genel teriminin tablosu (x ≠ 0). r tane 2/x seçilirse x’in üssü 2(6 − r) − r = 12 − 3r, katsayı C(6, r) · 2ʳ olur. İstenen üs bir satıra denk gelmiyorsa, yani r tam sayı çıkmıyorsa öyle bir terim yoktur. Terim sıra numarası r + 1’dir.",
  alt: "Yedi satırlı tablo: r, x’in üssü 12 − 3r ve katsayı; istenen üsse uyan satır vurgulu.",
  steps: EXP_STEPS.map(([s]) => s),
  draw: (_, step) => {
    const target = EXP_STEPS[step][1];
    const rows: { s: string; tone?: Tone }[][] = [[{ s: "r" }, { s: "üs 12 − 3r" }, { s: "katsayı C(6, r) · 2ʳ" }]];
    for (let r = 0; r <= 6; r++) {
      const hit = 12 - 3 * r === target;
      rows.push([{ s: String(r), tone: hit ? "warn" : undefined }, { s: String(12 - 3 * r).replace("-", "−"), tone: hit ? "warn" : undefined }, { s: `${choose(6, r)} · ${2 ** r} = ${choose(6, r) * 2 ** r}`, tone: hit ? "warn" : undefined }]);
    }
    const els = [...table(0, 0, [1.0, 2.4, 4.4], 0.72, rows, "b"), ...pad(-0.2, 0.2, 8.0, -8 * 0.72 - 0.2)];
    const r = (12 - target) / 3;
    return {
      els,
      readout: Number.isInteger(r) ? [`12 − 3r = ${target} ⇒ r = ${r}: katsayı C(6, ${r}) · 2${sup(r)} = ${choose(6, r) * 2 ** r}.`, `Bu ${r + 1}. terimdir.`] : [`12 − 3r = ${target} ⇒ r = ${frac(12 - target, 3)} tam sayı değil.`, "Açılımda x¹ terimi yoktur."],
    };
  },
};

const COEF = [5, 4, 3, 2, 1, 0].map((d) => ({ d, c: choose(5, 5 - d) * 2 ** d * (-1) ** (5 - d) }));
const paritySums: FigureDef = {
  caption:
    "(2x − 1)⁵ açılımının katsayıları dereceye göre: 32, −80, 80, −40, 10, −1. Çift dereceliler (Ç) ve tek dereceliler (T) iki ayrı biçimde gösterilir. P(1) = Ç + T = 1, P(−1) = Ç − T = −243; buradan Ç = −121, T = 122. Katsayı toplamı negatif olabilir. Sütunlar ölçeklidir.",
  alt: "Derece 5’ten 0’a altı sütun; pozitif katsayılar yukarı, negatifler aşağı; çift dereceler dolu, tek dereceler boş çerçeve.",
  steps: ["çift dereceler", "tek dereceler"],
  draw: (_, step) => {
    const k = 0.028;
    const w = 1.3;
    const els: El[] = [seg(v(-0.3, 0), v(6 * w, 0), { tone: "ink", thin: true })];
    COEF.forEach(({ d, c }, i) => {
      const even = d % 2 === 0;
      const on = step === 0 ? even : !even;
      const x = i * w + 0.25;
      els.push(rect(x, Math.min(0, c * k), w - 0.5, Math.max(0.05, Math.abs(c) * k), even ? "a" : "c", even));
      els.push(txt(v(x + (w - 0.5) / 2, c >= 0 ? c * k + 0.1 : c * k - 0.1), String(c).replace("-", "−"), c >= 0 ? "n" : "s", { tone: on ? "warn" : "muted", small: true, bold: on }));
      els.push(txt(v(x + (w - 0.5) / 2, c >= 0 ? -0.12 : 0.12), `x${sup(d)}`, c >= 0 ? "s" : "n", { tone: "muted", small: true }));
    });
    els.push(...pad(-0.4, 80 * k + 0.7, 6 * w, -80 * k - 0.7));
    const E = COEF.filter(({ d }) => d % 2 === 0).reduce((s, x) => s + x.c, 0);
    const O = COEF.filter(({ d }) => d % 2 === 1).reduce((s, x) => s + x.c, 0);
    return {
      els,
      legend: [
        { code: "Ç", label: "çift derece: dolu sütun", tone: "a" },
        { code: "T", label: "tek derece: boş çerçeve", tone: "c" },
      ],
      readout: step === 0 ? [`Ç = ${COEF.filter(({ d }) => d % 2 === 0).map((x) => String(x.c).replace("-", "−")).join(" + ").replace(/\+ −/g, "− ")} = ${String(E).replace("-", "−")}.`, "Ç = [P(1) + P(−1)]/2 = (1 − 243)/2 = −121."] : [`T = ${COEF.filter(({ d }) => d % 2 === 1).map((x) => x.c).join(" + ")} = ${O}.`, "T = [P(1) − P(−1)]/2 = (1 + 243)/2 = 122."],
    };
  },
};

/* ===================== Olasılık ===================== */

const diceGrid: FigureDef = {
  caption:
    "İki bağımsız adil zarın 36 sıralı sonucu eş olasılıklıdır; hücrelerde iki zarın toplamı yazar. Toplamlar eş olasılıklı değildir: toplam 2 tek bir çiftle, toplam 7 altı çiftle oluşur. Sürgüyle seçilen toplamın hücreleri dolu gösterilir.",
  alt: "6 × 6 ızgara: satırlar birinci zar, sütunlar ikinci zar; her hücrede toplam; seçilen toplamı veren hücreler dolu.",
  param: { label: "toplam", min: 2, max: 12, step: 1, init: 7 },
  draw: (s) => {
    const w = 0.72;
    const els: El[] = [];
    let cnt = 0;
    for (let i = 1; i <= 6; i++) {
      els.push(...cell(i * w, 0, w, w, String(i), "b"), ...cell(0, -i * w, w, w, String(i), "b"));
      for (let j = 1; j <= 6; j++) {
        const hit = i + j === s;
        if (hit) cnt++;
        els.push(...cell(j * w, -i * w, w, w, String(i + j), hit ? "warn" : "muted", { fill: hit, small: true }));
      }
    }
    els.push(...cell(0, 0, w, w, "+", "muted"));
    els.push(...pad(-0.3, w + 0.3, 7 * w + 0.3, -6 * w - 0.3));
    return { els, readout: [`Toplam ${s}: ${cnt} hücre, olasılık ${cnt}/36 = ${frac(cnt, 36)}.`, "Örnek uzay 36 sıralı çifttir; 11 toplam değeri eş şanslı değildir."] };
  },
};

const conditionalDice: FigureDef = {
  caption: "Toplamın alt sınırı verilince yalnız koşulu sağlayan hücreler paydaya girer. Birinci zarın 6 olduğu hücreler bu alanın içinde yeniden seçilir.",
  alt: "Satırlarda birinci zarın, sütunlarda ikinci zarın değerleri. Her hücrede toplam. Koşula uygun hücreler dolu; birinci zarı 6 olan uygun hücrelerin yanında nokta var.",
  param: { label: "Toplamın alt sınırı", min: 2, max: 12, step: 1, init: 9 },
  draw: (threshold) => {
    const w = 0.75;
    const els: El[] = [
      txt(v(4 * w, 1.02), "İkinci zar", "n", { tone: "ink", small: true }),
      txt(v(-0.08, -2.55), "İlk zar", "w", { tone: "ink", small: true }),
    ];
    let admissible = 0;
    let firstSix = 0;
    for (let first = 1; first <= 6; first++) {
      els.push(...cell(first * w, 0, w, w, String(first), "b"), ...cell(0, -first * w, w, w, String(first), "b"));
      for (let second = 1; second <= 6; second++) {
        const sum = first + second;
        const allowed = sum >= threshold;
        const event = allowed && first === 6;
        admissible += Number(allowed);
        firstSix += Number(event);
        els.push(...cell(second * w, -first * w, w, w, `${sum}${event ? "·" : ""}`, event ? "warn" : allowed ? "a" : "muted", { fill: allowed }));
      }
    }
    els.push(...pad(-1.22, 1.75, 5.6, -5.0));
    return { els, readout: [
      `Toplam en az ${threshold}. Koşullu uzayda ${admissible} çift, ilk zarı 6 olan ${firstSix} çift var.`,
      `Koşullu olasılık ${firstSix}/${admissible} = ${frac(firstSix, admissible)}. Birlikte gerçekleşme olasılığı ${firstSix}/36.`,
      "Hücredeki nokta ilk zarı 6 olan uygun bir çifti işaretler.",
    ] };
  },
};

const coinTree: FigureDef = {
  caption:
    "Üç bağımsız adil para atışının ağacı: 8 eş olasılıklı yaprak (Y yazı, T tura). Hiç yazı gelmemesi tek yaprak, TTT: (1/2)³ = 1/8. “En az bir yazı” bunun tümleyenidir: 1 − 1/8 = 7/8. Tümleyen kuralı, ağacı tek tek saymadan aynı sonucu verir.",
  alt: "Soldan sağa üç kademeli ikili ağaç; dallarda Y ya da T; sekiz yaprakta üç harfli sonuçlar; seçilen olayın yaprakları vurgulu.",
  steps: ["hiç yazı", "en az bir yazı"],
  draw: (_, step) => {
    const hasY = (p: string) => p.includes("0");
    const els = tree(3, (_, c) => (c ? "T" : "Y"), (p) => ({ s: p.replace(/0/g, "Y").replace(/1/g, "T"), tone: (step === 0 ? !hasY(p) : hasY(p)) ? "warn" : "muted" }));
    return { els, readout: step === 0 ? ["Hiç yazı: yalnız TTT, 1/8.", "Bağımsızlık bilinmiyorsa 1/2 · 1/2 · 1/2 yazılamaz."] : ["En az bir yazı: 7 yaprak, 7/8 = 1 − 1/8.", "Tümleyen: P(Aᶜ) = 1 − P(A)."] };
  },
};

const venn: FigureDef = {
  caption:
    "Adil zarda A = {2, 4, 6} çift sayı, B = {5, 6} 4’ten büyük. Ortak sonuç 6 birleşimde bir kez sayılır: P(A ∪ B) = (3 + 2 − 1)/6 = 2/3. Kesişim yalnız 6’dır: 1/6. 1 ve 3 iki olayın da dışındadır. Şema ölçekli değildir.",
  alt: "Dikdörtgen örnek uzay içinde kesişen iki daire: A’nın yalnız bölgesinde 2 ve 4, ortak bölgede 6, B’nin yalnız bölgesinde 5, dışarıda 1 ve 3.",
  steps: ["A ∪ B", "A ∩ B"],
  draw: (_, step) => {
    const els: El[] = [rect(-3.4, -2.2, 7.4, 4.4, "muted", false)];
    els.push(circle(v(-0.8, 0), 1.6, { tone: "a", fill: step === 0 ? "a" : undefined }), circle(v(1.2, 0), 1.6, { tone: "c", fill: step === 0 ? "c" : undefined }));
    if (step === 1) els.push(circle(v(0.2, 0), 0.5, { tone: "warn", fill: "warn" }));
    els.push(txt(v(-1.8, 0.5), "2", "c", { tone: "ink", bold: true }), txt(v(-1.8, -0.5), "4", "c", { tone: "ink", bold: true }), txt(v(0.2, 0), "6", "c", { tone: "ink", bold: true }), txt(v(2.2, 0), "5", "c", { tone: "ink", bold: true }));
    els.push(txt(v(-2.9, 1.7), "1", "c", { tone: "muted", bold: true }), txt(v(3.5, -1.7), "3", "c", { tone: "muted", bold: true }));
    els.push(txt(v(-0.8, 1.75), "A", "n", { tone: "a", bold: true }), txt(v(1.2, 1.75), "B", "n", { tone: "c", bold: true }));
    return { els, readout: step === 0 ? ["A ∪ B = {2, 4, 5, 6}: 4/6 = 2/3.", "3/6 + 2/6 − 1/6: ortak 6 bir kez."] : ["A ∩ B = {6}: 1/6.", "Ayrık olaylarda kesişim boş, olasılıklar doğrudan toplanır."] };
  },
};

const BAG: { name: string; second: [number, number] }[] = [
  { name: "geri koymadan", second: [2, 4] },
  { name: "geri koyarak", second: [3, 5] },
];
const bagTree: FigureDef = {
  caption:
    "Torbada 3 K ve 2 M top (K kırmızı, M mavi); her çekimde kalan toplar eş şanslı. Önce K, sonra K olasılığı P(K) · P(K | K)’dır. Geri koymadan ikinci çekimde 4 top kalır: 3/5 · 2/4 = 3/10. Geri koyunca torba eskiye döner: 3/5 · 3/5 = 9/25.",
  alt: "İki kademeli olasılık ağacı; dallarda K ya da M ve olasılıklar; KK yolu vurgulu, yapraklarda ortak olasılıklar.",
  steps: BAG.map((b) => b.name),
  draw: (_, step) => {
    const [kk, tot] = BAG[step].second;
    const p1 = (c: 0 | 1) => (c ? [2, 5] : [3, 5]);
    const p2 = (first: string, c: 0 | 1): [number, number] => {
      if (step === 1) return c ? [2, 5] : [3, 5];
      const k = first === "0" ? 2 : 3;
      return c ? [4 - k, 4] : [k, 4];
    };
    const prob = (path: string): [number, number] => {
      const a = p1(path[0] === "1" ? 1 : 0);
      const b = p2(path[0], path[1] === "1" ? 1 : 0);
      return [a[0] * b[0], a[1] * b[1]];
    };
    const els = tree(
      2,
      (p, c) => {
        const [n, d] = p === "" ? p1(c) : p2(p, c);
        return `${c ? "M" : "K"} ${n}/${d}`;
      },
      (p) => {
        const [n, d] = prob(p);
        return { s: `${p.replace(/0/g, "K").replace(/1/g, "M")}: ${frac(n, d)}`, tone: p === "00" ? "warn" : "muted" };
      },
      (p, c) => ((p + c).split("").every((x) => x === "0") ? "warn" : "muted"),
    );
    return { els, readout: [`P(KK) = 3/5 · ${kk}/${tot} = ${frac(3 * kk, 5 * tot)}.`, step === 0 ? "İkinci çekim birinciye bağlıdır: payda 4." : "Geri koyma koşulları eskiye döndürür: bağımsız çekimler."] };
  },
};

export const mathFigures062TytCounting: Record<string, Record<string, FigureDef>> = {
  "tyt-mat-permutasyon-kaynak-032": {
    "Her dolan yuva bir seçeneği eksiltir": slots,
    "Sabit, gerekli ve yasak öğeler açık bir yuva hesabı ister": digitSlots,
    "Komşu olanları birlikte say, sadece önce gelenleri eşleştir": adjacent,
    "Birbirine karışabilen gruplara önce yer ayır": positions,
    "Birbirinden ayrı kişilere ayrı boşluklar ver": separateSpecialPeople,
  },
  "tyt-mat-tekrarli-permutasyon-kaynak-033": {
    "Etiketleri silince aynı kalan dizileri bir say": eraseLabels,
    "Sabit yeri çıkar, kalan tür adetlerini güncelle": fixedPlaces,
    "Özdeş kartlar ayrı boşluklara giderken iç sıra oluşmaz": gaps,
    "Sayıda ilk sıfır yasak, kodda koşulu açık oku": leadingZero,
    "Zorunlu durakta yolu böl, kaçınanı tümleyenden bul": waypointRoute,
  },
  "tyt-mat-kombinasyon-kaynak-034": {
    "Boş seçim ve dışarıda kalanlar": complement,
    "Zorunlu kişiyi sabitle, yasak kişiyi listeden çıkar": forced,
    "Tam ve en az koşullarıyla ayrık durumlar kur": cases,
    "En az bir için hiç olmayanı çıkar": atLeast,
    "Bir üçlü alanla, bir doğru bütün noktalarıyla belirlenir": linesAndTriangles,
  },
  "tyt-mat-binom-kaynak-035": {
    "Çarpılan her parantezden tek seçim yap": binomTree,
    "Pascal satırını üstteki iki komşudan kur": pascal,
    "Hedef üssü bir denklemle bul": exponentTable,
    "Toplam, sabit terim ve tek-çift toplamlarını ayır": paritySums,
  },
  "tyt-mat-olasilik-kaynak-036": {
    "Örnek uzay hangi sonuçların sayıldığını belirler": diceGrid,
    "En az biri ve tam biri ayır": coinTree,
    "Ortak sonuçları birleşimde bir kez say": venn,
    "Yeni bilgi geldiğinde paydayı değiştir": conditionalDice,
    "Geri koyma ve bağımsızlık ayrı koşullardır": bagTree,
  },
};
