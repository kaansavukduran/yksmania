import { ball, poly, seg, txt, v, vec, type El, type FigureDef, type Tone } from "../sectionFigures/figureKit";
import type { FoundationLesson } from "./types";

/*
 * TYT Fizik · Temel İnşa ön dersleri. Birim etiketleri her adımda yazılır;
 * sadeleşen birimler açıkça gösterilir. Bütün örnek ve sorular özgündür.
 */

const f = (x: number, d = 3) => {
  const r = Math.round(x * 10 ** d) / 10 ** d;
  return (r < 0 ? "−" : "") + String(Math.abs(r)).replace(".", ",");
};
const rect = (x0: number, x1: number, y0: number, y1: number, tone: Tone, fill = true): El =>
  poly([v(x0, y1), v(x1, y1), v(x1, y0), v(x0, y0)], { fill: fill ? tone : undefined, tone, thin: true });
const SUP = (n: number) => String(n).replace("-", "⁻").replace(/\d/g, (d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[+d]);

/** Eksenler: x ve y yönünde ok, etiketler. */
function axes(w: number, h: number, xl: string, yl: string): El[] {
  return [vec(v(0, 0), v(w, 0), { thin: true }), vec(v(0, 0), v(0, h), { thin: true }), txt(v(w, -0.35), xl, "c", { small: true }), txt(v(-0.2, h), yl, "w", { small: true })];
}

// ─── 1 · SI birimleri ve dönüşümler ──────────────────────────────────────────
const speed: FigureDef = {
  caption:
    "km/sa’ten m/s’ye geçerken birimleri kesir gibi yaz ve sadeleştir: 1 km = 1000 m, 1 sa = 3600 s. 1000/3600 = 1/3,6 olduğundan km/sa değeri 3,6’ya bölünür. Hızı değiştir ve sadeleşen birimleri izle.",
  alt: "Kesir zinciri: hız km/sa, çarpı 1000 m bölü 1 km, çarpı 1 sa bölü 3600 s; km ve sa üstü çizili; sonuç m/s.",
  param: { label: "Hız", min: 18, max: 144, step: 18, init: 72, unit: " km/sa" },
  draw: (k) => {
    const els: El[] = [
      txt(v(0, 0.4), `${k} km`, "c", { bold: true }), seg(v(-0.8, 0), v(0.8, 0), { thin: true }), txt(v(0, -0.4), "1 sa", "c", { bold: true }),
      txt(v(1.2, 0), "×", "c"),
      txt(v(2.4, 0.4), "1000 m", "c", { bold: true, tone: "b" }), seg(v(1.6, 0), v(3.2, 0), { thin: true }), txt(v(2.4, -0.4), "1 km", "c", { bold: true, tone: "b" }),
      txt(v(3.6, 0), "×", "c"),
      txt(v(4.8, 0.4), "1 sa", "c", { bold: true, tone: "c" }), seg(v(4.0, 0), v(5.6, 0), { thin: true }), txt(v(4.8, -0.4), "3600 s", "c", { bold: true, tone: "c" }),
      seg(v(0.15, 0.25), v(0.65, 0.55), { tone: "warn" }), seg(v(2.55, -0.55), v(3.05, -0.25), { tone: "warn" }),
      seg(v(-0.25, -0.55), v(0.25, -0.25), { tone: "warn" }), seg(v(4.6, 0.25), v(5.0, 0.55), { tone: "warn" }),
      txt(v(0, -1.4), `= ${k} × 1000 / 3600 m/s = ${f(k / 3.6)} m/s`, "e", { bold: true, tone: "a" }),
      txt(v(0, -2.0), "km ve sa sadeleşti (kırmızı çizgiler)", "e", { small: true, tone: "muted" }),
    ];
    els.push(txt(v(-1.1, 1.0), " ", "c"), txt(v(6.4, -2.4), " ", "c"));
    return { els, readout: [`${k} km/sa = ${k} ÷ 3,6 = ${f(k / 3.6)} m/s.`, "Ters yön: m/s × 3,6 = km/sa (10 m/s = 36 km/sa)."] };
  },
};

const PREF = [
  { label: "k (kilo) = 10³", ex: "3 km = 3000 m", detail: ["kilo bin demektir: 1 kg = 1000 g.", "Büyük birimden küçüğe: çarp."] },
  { label: "c (santi) = 10⁻²", ex: "250 cm = 2,5 m", detail: ["santi yüzde bir: 1 cm = 0,01 m.", "Küçük birimden büyüğe: böl."] },
  { label: "m (mili) = 10⁻³", ex: "450 mL = 0,45 L", detail: ["mili binde bir: 1 mm = 0,001 m.", "m harfi tek başına metre, önek olarak mili anlamına gelir."] },
  { label: "µ (mikro) = 10⁻⁶", ex: "5 µm = 0,000005 m", detail: ["mikro milyonda bir.", "Hücre boyları µm ile verilir."] },
];
const prefixes: FigureDef = {
  caption:
    "SI önekleri birimin önüne gelen 10’un kuvvetleridir. Bir öneke tıkla: kaç kat olduğu ve bir dönüşüm örneği açılır. Büyük birimden küçüğe geçerken çarp, küçükten büyüğe geçerken böl.",
  alt: "Dört satır: kilo, santi, mili, mikro önekleri, 10’un kuvvetleri ve birer dönüşüm örneği.",
  picks: PREF.map((p) => ({ label: p.label, title: p.label, detail: [p.ex, ...p.detail] })),
  draw: (_v, _s, pick = -1) => {
    const els: El[] = [];
    PREF.forEach((p, i) => {
      const y = -i * 1.3, sel = pick === i;
      els.push(rect(-0.32, -0.16, y - 0.85, y + 0.25, i === 0 ? "b" : "c"));
      els.push(txt(v(0, y), p.label, "e", { small: true, bold: true, tone: sel ? "a" : "ink", pick: i }));
      els.push(txt(v(0.3, y - 0.58), p.ex, "e", { small: true, tone: sel ? "a" : "c" }));
    });
    els.push(txt(v(-0.6, 0.6), " ", "c"), txt(v(4.8, -4.8), " ", "c"));
    return { els, readout: [pick >= 0 ? PREF[pick].ex : "Bir öneke tıkla.", "Alan ve hacimde önek çarpanının karesi ve küpü alınır: 1 m² = 10⁴ cm²."] };
  },
};

// ─── 2 · Bilimsel gösterim ───────────────────────────────────────────────────
const sci: FigureDef = {
  caption:
    "Bilimsel gösterim çok büyük ve çok küçük sayıları a × 10ⁿ biçiminde yazar; 1 ≤ a < 10. Üssü değiştir: 3,2 × 10ⁿ sayısının uzun yazılışında virgül n basamak sağa (n pozitifse) ya da sola (n negatifse) kayar.",
  alt: "3,2 çarpı 10 üzeri n ve aynı sayının uzun yazılışı; virgülün kaydığı basamak sayısı.",
  param: { label: "Üs n", min: -4, max: 6, step: 1, init: 3, unit: "", plain: true },
  draw: (n) => {
    const val = 3.2 * 10 ** n;
    const long = n >= 0 ? Math.round(val).toLocaleString("tr-TR") : f(val, 6);
    const els: El[] = [txt(v(0, 0.6), `3,2 × 10${SUP(n)}`, "e", { bold: true, tone: "a" }), txt(v(0, -0.2), `= ${long}`, "e", { bold: true })];
    els.push(txt(v(0, -0.9), n > 0 ? `virgül ${n} basamak sağa` : n < 0 ? `virgül ${-n} basamak sola` : "virgül yerinde", "e", { small: true, tone: "muted" }));
    els.push(txt(v(-0.3, 1.1), " ", "c"), txt(v(5.6, -1.3), " ", "c"));
    return { els, readout: [`3,2 × 10${SUP(n)} = ${long}.`, "Katsayı 1 ile 10 arasında olmalı: 32 × 10³ yerine 3,2 × 10⁴ yazılır."] };
  },
};

const SCI = ["(2 × 10³) · (4 × 10⁵)", "Katsayılar: 2 · 4 = 8", "Kuvvetler: 10³ · 10⁵ = 10⁸", "Sonuç: 8 × 10⁸"];
const sciMul: FigureDef = {
  caption:
    "Bilimsel gösterimde çarparken katsayılar kendi arasında çarpılır, 10’un kuvvetlerinin üsleri toplanır. Adımları ilerlet. Katsayı 10’u geçerse bir basamak kaydırılıp üs bir artırılır.",
  alt: "Alt alta işlem satırları: katsayıların çarpımı, üslerin toplamı, sonuç.",
  steps: SCI,
  draw: (_v, step) => {
    const els: El[] = [];
    for (let i = 0; i <= step; i++) els.push(txt(v(0, -i * 0.7), SCI[i], "e", { bold: i === step, tone: i === step ? "a" : "muted" }));
    els.push(txt(v(-0.3, 0.5), " ", "c"), txt(v(6.0, -2.5), " ", "c"));
    return { els, readout: [SCI[step] + ".", "Örnek: (5 × 10²)(6 × 10³) = 30 × 10⁵ = 3 × 10⁶."] };
  },
};

// ─── 3 · Doğru ve ters orantı ────────────────────────────────────────────────
const direct: FigureDef = {
  caption:
    "Doğru orantıda bir nicelik kaç katına çıkarsa öbürü de o kadar katına çıkar; oran sabittir (y/x = k). Kilosu 15 TL olan elmada miktarı değiştir: grafik başlangıç noktasından geçen düz bir doğrudur.",
  alt: "Yatay eksende kilogram, düşey eksende fiyat; başlangıçtan geçen doğru ve seçilen noktada fiyat.",
  param: { label: "Miktar", min: 0, max: 6, step: 1, init: 3, unit: " kg" },
  draw: (x) => {
    const K = 15, sx = 0.9, sy = 0.035;
    const els: El[] = [...axes(6.4 * sx, 100 * sy, "kg", "TL"), seg(v(0, 0), v(6 * sx, 6 * K * sy), { tone: "b", bold: true })];
    els.push(seg(v(x * sx, 0), v(x * sx, x * K * sy), { dash: true, thin: true, tone: "muted" }), seg(v(0, x * K * sy), v(x * sx, x * K * sy), { dash: true, thin: true, tone: "muted" }));
    els.push(ball(v(x * sx, x * K * sy), 0.11, "a"), txt(v(x * sx + 0.2, x * K * sy + 0.25), `${x} kg → ${x * K} TL`, "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.9, 3.9), " ", "c"), txt(v(8.4, -0.6), " ", "c"));
    return { els, readout: [`${x} kg × 15 TL/kg = ${x * K} TL.`, "Oran sabit: fiyat / miktar = 15 TL/kg. Miktar 2 katına çıkınca fiyat da 2 katına çıkar."] };
  },
};

const inverse: FigureDef = {
  caption:
    "Ters orantıda biri kaç katına çıkarsa öbürü o kadar kata bölünür; çarpım sabittir (x · y = k). Bir işi 4 işçi 6 günde bitiriyorsa toplam iş 24 işçi·gündür. İşçi sayısını değiştir: eğri eksenlere yaklaşır ama onlara değmez.",
  alt: "Yatay eksende işçi sayısı, düşey eksende gün; aşağı doğru kıvrılan eğri ve seçilen noktadaki dikdörtgen.",
  param: { label: "İşçi sayısı", min: 1, max: 8, step: 1, init: 4, unit: "" },
  draw: (x) => {
    const K = 24, sx = 0.7, sy = 0.14;
    const pts = Array.from({ length: 29 }, (_, i) => 1 + i * 0.25).map((w) => v(w * sx, (K / w) * sy));
    const y = K / x;
    const els: El[] = [...axes(8.6 * sx, 25 * sy, "işçi", "gün"), poly(pts, { open: true, smooth: true, tone: "b", bold: true })];
    els.push(rect(0, x * sx, 0, y * sy, "c"), ball(v(x * sx, y * sy), 0.11, "a"), txt(v(x * sx + 0.2, y * sy + 0.25), `${x} işçi → ${f(y, 2)} gün`, "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.9, 3.9), " ", "c"), txt(v(8.4, -0.6), " ", "c"));
    return { els, readout: [`${x} · ${f(y, 2)} = 24 işçi·gün (dikdörtgenin alanı hep aynı).`, "İşçi sayısı 2 katına çıkınca süre yarıya iner."] };
  },
};

// ─── 4 · Grafik okuma: eğim ve alan ──────────────────────────────────────────
const slope: FigureDef = {
  caption:
    "Konum–zaman grafiğinde eğim hızı verir: eğim = düşey değişim ÷ yatay değişim = Δx ÷ Δt. Zamanı değiştir: araç ilk 4 s’de 20 m gidiyor (eğim 5 m/s), sonra 2 s duruyor (yatay çizgi, eğim 0).",
  alt: "Konum–zaman grafiği: 0–4 s arası yükselen doğru, 4–6 s arası yatay doğru; seçilen anda eğim üçgeni.",
  param: { label: "Zaman", min: 1, max: 6, step: 1, init: 2, unit: " s" },
  draw: (t) => {
    const sx = 0.9, sy = 0.13;
    const x = (s: number) => (s <= 4 ? 5 * s : 20);
    const els: El[] = [...axes(6.6 * sx, 24 * sy, "t (s)", "x (m)"), poly([v(0, 0), v(4 * sx, 20 * sy), v(6 * sx, 20 * sy)], { open: true, tone: "b", bold: true })];
    const t0 = t - 1;
    els.push(seg(v(t0 * sx, x(t0) * sy), v(t * sx, x(t0) * sy), { tone: "warn" }), seg(v(t * sx, x(t0) * sy), v(t * sx, x(t) * sy), { tone: "warn" }));
    els.push(ball(v(t * sx, x(t) * sy), 0.1, "a"));
    const v1 = x(t) - x(t0);
    els.push(txt(v(0.3, 3.6), `Δx / Δt = ${v1} m / 1 s = ${v1} m/s`, "e", { small: true, bold: true, tone: "a" }));
    els.push(txt(v(-0.9, 4.0), " ", "c"), txt(v(7.0, -0.6), " ", "c"));
    return { els, readout: [`${t0}–${t} s arasında hız ${v1} m/s${v1 === 0 ? " (duruyor)" : ""}.`, "Yatay çizgi = konum değişmiyor = hız 0. Eğim büyüdükçe hız büyür."] };
  },
};

const area: FigureDef = {
  caption:
    "Hız–zaman grafiğinde çizginin altında kalan alan yer değiştirmeyi verir: sabit hızda alan = hız × süre, yani bir dikdörtgen. Zamanı değiştir: 10 m/s hızla giden aracın taradığı alan büyür.",
  alt: "Hız–zaman grafiği: 10 m/s’de yatay çizgi; seçilen zamana kadar altındaki dikdörtgen boyalı.",
  param: { label: "Süre", min: 1, max: 6, step: 1, init: 3, unit: " s" },
  draw: (t) => {
    const sx = 0.9, sy = 0.25;
    const els: El[] = [...axes(6.6 * sx, 13 * sy, "t (s)", "v (m/s)"), rect(0, t * sx, 0, 10 * sy, "c"), seg(v(0, 10 * sy), v(6 * sx, 10 * sy), { tone: "b", bold: true })];
    els.push(txt(v((t * sx) / 2, 5 * sy), `${10 * t} m`, "c", { small: true, bold: true }), txt(v(6 * sx + 0.2, 10 * sy), "10 m/s", "e", { small: true, tone: "b" }));
    els.push(txt(v(-0.9, 3.9), " ", "c"), txt(v(7.4, -0.6), " ", "c"));
    return { els, readout: [`Alan = 10 m/s × ${t} s = ${10 * t} m (s birimleri sadeleşir).`, "Hız–zaman grafiğinde eğim ise ivmeyi verir; burada eğim 0, ivme 0."] };
  },
};

export const physicsFoundations: FoundationLesson[] = [
  {
    id: "temel-fiz-si-donusum",
    subjectId: "tyt-fizik",
    title: "SI birimleri ve birim dönüşümleri",
    minutes: 20,
    prepares: ["fizik-bilimine-giris", "dogrusal-hareket"],
    goal: "Birimleri kesir gibi çarpıp sadeleştirerek km/sa ↔ m/s, cm² ↔ m² ve önekli birim dönüşümlerini yapmak.",
    pages: [
      {
        title: "Birimler de sadeleşir",
        paragraphs: [
          "Her ölçüm bir sayı ve bir birimden oluşur: 20 m/s. Birimi değiştirmek için değeri 1’e eşit kesirlerle çarparız: 1000 m / 1 km = 1.",
          "Kesirlerde olduğu gibi aynı birim payda ve paydada varsa sadeleşir. Sonuçta yalnız istenen birim kalmalıdır.",
        ],
        terms: [["SI", "Uluslararası birim sistemi: uzunluk m, kütle kg, zaman s."]],
        figure: speed,
        predict: { question: "36 km/sa kaç m/s’dir?", answer: "10 m/s: 36 ÷ 3,6." },
      },
      {
        title: "Önekler: 10’un kuvvetleri",
        paragraphs: ["kilo, santi, mili, mikro gibi önekler birimi 10’un bir kuvvetiyle büyütür ya da küçültür. Büyük birimden küçük birime geçerken sayı büyür, küçükten büyüğe geçerken küçülür."],
        figure: prefixes,
      },
    ],
    examples: [
      { title: "Hız dönüşümü", given: "90 km/sa kaç m/s?", steps: ["90 × 1000 m = 90 000 m.", "1 sa = 3600 s.", "90 000 ÷ 3600 = 25."], answer: "25 m/s", check: "Kısa yol: 90 ÷ 3,6 = 25 ✓." },
      { title: "Alan dönüşümü", given: "250 cm² kaç m²?", steps: ["1 m² = 100 cm × 100 cm = 10 000 cm².", "250 ÷ 10 000 = 0,025."], answer: "0,025 m²", check: "Büyük birime geçince sayı küçüldü ✓." },
    ],
    checks: [
      { prompt: "72 km/sa kaç m/s’dir?", options: ["259,2", "20", "7,2", "200", "2"], answer: 1, explain: "72 ÷ 3,6 = 20.", reasons: ["3,6 ile çarpılmış (ters yön).", "Doğru.", "10’a bölünmüş.", "3,6 yerine 0,36’ya bölünmüş.", "36’ya bölünmüş."] },
      { prompt: "5 m/s kaç km/sa’tir?", options: ["18", "1,39", "50", "0,5", "180"], answer: 0, explain: "5 × 3,6 = 18.", reasons: ["Doğru.", "3,6’ya bölünmüş (ters yön).", "10 ile çarpılmış.", "10’a bölünmüş.", "36 ile çarpılmış."] },
      { prompt: "250 cm² kaç m²’dir?", options: ["2,5", "0,25", "0,025", "25 000", "0,0025"], answer: 2, explain: "250 ÷ 10 000 = 0,025.", reasons: ["100’e bölünmüş (uzunluk çarpanı).", "1000’e bölünmüş.", "Doğru.", "Çarpılmış.", "Bir basamak fazla bölünmüş."] },
      { prompt: "3 g kaç kg’dır?", options: ["3000", "0,3", "0,03", "0,003", "300"], answer: 3, explain: "1 kg = 1000 g: 3 ÷ 1000.", reasons: ["Çarpılmış.", "10’a bölünmüş.", "100’e bölünmüş.", "Doğru.", "100 ile çarpılmış."] },
    ],
  },
  {
    id: "temel-fiz-bilimsel-gosterim",
    subjectId: "tyt-fizik",
    title: "Bilimsel gösterim (a × 10ⁿ)",
    minutes: 15,
    prepares: ["fizik-bilimine-giris", "madde-ozkutle"],
    goal: "Çok büyük ve çok küçük sayıları a × 10ⁿ biçiminde okumak, yazmak, çarpmak ve bölmek.",
    pages: [
      {
        title: "Katsayı ve üs",
        paragraphs: [
          "Işığın hızı yaklaşık 300 000 000 m/s’dir; bunu 3 × 10⁸ m/s diye yazmak hem kısa hem güvenlidir. Katsayı (a) 1 ile 10 arasındadır, üs (n) virgülün kaç basamak kaydığını söyler.",
          "Negatif üs küçük sayılar içindir: 2 × 10⁻³ = 0,002.",
        ],
        figure: sci,
      },
      {
        title: "Çarpma ve bölme",
        paragraphs: ["Çarparken katsayılar çarpılır, üsler toplanır; bölerken katsayılar bölünür, üsler çıkarılır. Sonuçta katsayıyı yeniden 1–10 arasına getir."],
        figure: sciMul,
        predict: { question: "(6 × 10⁸) ÷ (2 × 10³) nedir?", answer: "3 × 10⁵: 6 ÷ 2 = 3, 8 − 3 = 5." },
      },
    ],
    examples: [
      { title: "Normalleştirme", given: "45 000 sayısını bilimsel gösterimle yaz.", steps: ["Virgülü 4 ile 5 arasına koy: 4,5.", "Virgül 4 basamak sola kaydı: × 10⁴."], answer: "4,5 × 10⁴", check: "4,5 × 10 000 = 45 000 ✓." },
      { title: "Çarpım", given: "(5 × 10²) · (6 × 10³)", steps: ["Katsayılar: 5 · 6 = 30.", "Üsler: 2 + 3 = 5 → 30 × 10⁵.", "30 = 3 × 10 olduğundan 3 × 10⁶."], answer: "3 × 10⁶", check: "500 · 6000 = 3 000 000 ✓." },
    ],
    checks: [
      { prompt: "0,00042 sayısının bilimsel gösterimi hangisidir?", options: ["4,2 × 10⁴", "4,2 × 10⁻⁴", "42 × 10⁻⁵", "0,42 × 10⁻³", "4,2 × 10⁻³"], answer: 1, explain: "Virgül 4 basamak sağa kaydı: 4,2 × 10⁻⁴.", reasons: ["Üssün işareti ters.", "Doğru.", "Değer doğru ama katsayı 10’dan büyük.", "Değer doğru ama katsayı 1’den küçük.", "Bir basamak eksik kaydırılmış."] },
      { prompt: "(2 × 10³) · (4 × 10⁵) çarpımı kaçtır?", options: ["8 × 10¹⁵", "6 × 10⁸", "8 × 10⁸", "8 × 10²", "0,5 × 10⁸"], answer: 2, explain: "2 · 4 = 8, 3 + 5 = 8.", reasons: ["Üsler çarpılmış.", "Katsayılar toplanmış.", "Doğru.", "Üsler çıkarılmış.", "Katsayılar bölünmüş."] },
      { prompt: "(6 × 10⁸) ÷ (2 × 10³) işleminin sonucu kaçtır?", options: ["3 × 10¹¹", "3 × 10⁵", "12 × 10⁵", "4 × 10⁵", "3 × 10⁻⁵"], answer: 1, explain: "6 ÷ 2 = 3, 8 − 3 = 5.", reasons: ["Üsler toplanmış.", "Doğru.", "Katsayılar çarpılmış.", "Katsayılar çıkarılmış.", "Üsler ters çıkarılmış."] },
    ],
  },
  {
    id: "temel-fiz-oranti",
    subjectId: "tyt-fizik",
    title: "Doğru ve ters orantı",
    minutes: 20,
    prepares: ["madde-ozkutle", "basinc"],
    goal: "Bir niceliğin artınca öbürünü nasıl değiştirdiğini oran ya da çarpım sabitiyle göstermek ve grafikte tanımak.",
    pages: [
      {
        title: "Doğru orantı: oran sabit",
        paragraphs: [
          "İki nicelikten biri 2, 3, 4 katına çıktığında öbürü de aynı katlara çıkıyorsa doğru orantılıdır. Bölümleri sabittir: y / x = k. Grafiği başlangıç noktasından geçen düz doğrudur.",
        ],
        terms: [["Orantı sabiti (k)", "Doğru orantıda y/x, ters orantıda x·y değeri."]],
        figure: direct,
      },
      {
        title: "Ters orantı: çarpım sabit",
        paragraphs: ["Biri 2 katına çıkınca öbürü yarıya iniyorsa ters orantılıdır. Çarpımları sabittir: x · y = k. Örneğin işçi sayısı ile işin bitme süresi (aynı hızda çalışan işçiler için)."],
        figure: inverse,
        predict: { question: "4 işçi 6 günde bitiriyorsa 8 işçi kaç günde bitirir?", answer: "3 gün: işçi 2 katı, süre yarısı (8 · 3 = 24)." },
      },
    ],
    examples: [
      { title: "Doğru orantı", given: "3 kg elma 45 TL ise 5 kg elma kaç TL?", steps: ["1 kg’ın fiyatı: 45 ÷ 3 = 15 TL.", "5 kg: 5 × 15 = 75 TL."], answer: "75 TL", check: "Oran: 45/3 = 75/5 = 15 ✓." },
      { title: "Ters orantı", given: "6 musluk bir havuzu 10 saatte dolduruyor. 4 musluk kaç saatte doldurur?", steps: ["Toplam iş: 6 · 10 = 60 musluk·saat.", "4 musluk: 60 ÷ 4 = 15 saat."], answer: "15 saat", check: "Musluk azalınca süre arttı ✓." },
    ],
    checks: [
      { prompt: "3 kg peynir 450 TL ise 5 kg peynir kaç TL’dir?", options: ["270", "750", "1 350", "900", "600"], answer: 1, explain: "450 ÷ 3 = 150 TL/kg; 5 × 150 = 750.", reasons: ["Ters orantı kurulmuş.", "Doğru.", "3 ile çarpılmış.", "2 katı sanılmış.", "Fark (2 kg) yanlış eklenmiş."] },
      { prompt: "Aynı hızda çalışan 4 işçi bir işi 6 günde bitiriyor. 8 işçi aynı işi kaç günde bitirir?", options: ["12", "3", "2", "6", "48"], answer: 1, explain: "4 · 6 = 24 işçi·gün; 24 ÷ 8 = 3.", reasons: ["Doğru orantı kurulmuş.", "Doğru.", "24 ÷ 12 hesaplanmış.", "İşçi sayısının etkisi unutulmuş.", "Çarpım sonuç sanılmış."] },
      { prompt: "x ile y ters orantılı. x 3 katına çıkarsa y için ne söylenir?", options: ["3 katına çıkar", "Değişmez", "3’e bölünür", "3 azalır", "9 katına çıkar"], answer: 2, explain: "x · y sabit: x 3 katı → y 1/3’ü.", reasons: ["Doğru orantı ile karıştırılmış.", "Sabit olan çarpımdır, y değil.", "Doğru.", "Kat ile fark karıştırılmış.", "Kare ilişkisi sanılmış."] },
    ],
  },
  {
    id: "temel-fiz-grafik-okuma",
    subjectId: "tyt-fizik",
    title: "Basit grafik okuma: eğim ve alan",
    minutes: 20,
    prepares: ["dogrusal-hareket", "enerji-ve-hareket"],
    goal: "Bir grafikte eksenleri ve birimleri okumak; konum–zaman grafiğinde eğimin hızı, hız–zaman grafiğinde alanın yer değiştirmeyi verdiğini görmek.",
    pages: [
      {
        title: "Eğim: ne kadar hızlı değişiyor?",
        paragraphs: [
          "Önce eksenleri ve birimlerini oku. Eğim, düşey eksendeki değişimin yatay eksendeki değişime oranıdır. Konum–zaman grafiğinde bu oran m / s birimindedir, yani hızdır.",
          "Yatay çizgi değişim olmadığını gösterir: konum sabit, araç duruyor.",
        ],
        terms: [["Δ (delta)", "Değişim: son değer − ilk değer."]],
        figure: slope,
        predict: { question: "Konum–zaman grafiğinde daha dik çizgi ne anlatır?", answer: "Daha büyük hız: aynı sürede daha çok yol." },
      },
      {
        title: "Alan: ne kadar birikti?",
        paragraphs: ["Hız–zaman grafiğinde çizginin altındaki alanın birimi (m/s) × s = m olur: yer değiştirme. Sabit hızda alan bir dikdörtgendir: hız × süre."],
        figure: area,
      },
    ],
    examples: [
      { title: "Eğimden hız", given: "Konum 2 s’de 4 m’den 6 s’de 24 m’ye çıkıyor (düz çizgi).", steps: ["Δx = 24 − 4 = 20 m.", "Δt = 6 − 2 = 4 s.", "Eğim = 20 ÷ 4 = 5 m/s."], answer: "5 m/s", check: "Birim m/s: hız birimi ✓." },
      { title: "Alandan yol", given: "Hız 0–5 s arasında 8 m/s sabit.", steps: ["Dikdörtgen alanı: 8 m/s × 5 s.", "= 40 m."], answer: "40 m", check: "s birimleri sadeleşti, m kaldı ✓." },
    ],
    checks: [
      { prompt: "Konum–zaman grafiğinde bir araç 4 s’de 0 m’den 20 m’ye düzgün çizgiyle çıkıyor. Hızı kaçtır?", options: ["80 m/s", "5 m/s", "20 m/s", "4 m/s", "0,2 m/s"], answer: 1, explain: "20 m ÷ 4 s = 5 m/s.", reasons: ["Çarpılmış.", "Doğru.", "Yalnız konum okunmuş.", "Yalnız süre okunmuş.", "Bölme ters yapılmış."] },
      { prompt: "Hız–zaman grafiğinde hız 6 s boyunca 10 m/s sabit. Yer değiştirme kaç metredir?", options: ["16", "60", "0,6", "10", "6"], answer: 1, explain: "Alan = 10 × 6 = 60 m.", reasons: ["Toplanmış.", "Doğru.", "Bölünmüş.", "Yalnız hız okunmuş.", "Yalnız süre okunmuş."] },
      { prompt: "Konum–zaman grafiğinde yatay bir çizgi ne anlatır?", options: ["Hız artıyor", "Araç sabit hızla gidiyor", "Araç duruyor", "Araç geri dönüyor", "İvme sabit ve pozitif"], answer: 2, explain: "Konum değişmiyor: hız 0.", reasons: ["Hız artışı eğimin artmasıyla görülür.", "Sabit hız eğik düz çizgidir.", "Doğru.", "Geri dönüş azalan konumdur.", "İvme eğimin değişimiyle ilgilidir."] },
    ],
  },
];
