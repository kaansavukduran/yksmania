import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Tarih derinleştirmesi (0.228): tarih ve zaman, Osmanlı kuruluş
 * siyaseti, askerî teşkilat, medeniyet ve merkez teşkilatı. Kabul edilmiş
 * rehberler değişmez; tablo bölümü, iki özgün çözümlü örnek ve bölüm çizimi
 * görüntüleme katmanında eklenir. Yüzyıl, yarı, çeyrek ve MÖ–MS aralıkları
 * kodda kuralla hesaplanır. Olay sırası yalnız aşağıdaki tek tarih
 * sabitinden üretilir; tarihi verilmeyen gelişmeler hükümdar ve dönem
 * sırasıyla dizilir. Sınıflamalar (kapıkulu/taşra, askerî/reaya,
 * seyfiye/kalemiye/ilmiye) veri satırlarındaki özelliklerden kuralla çıkar.
 * Paragraflar, tablo hücreleri, çizim okumaları ve Kopya Kâğıdı özetleri
 * aynı verilerden yazılır; metindeki genel yargıları modül yüklenirken
 * korumalar denetler. Siyasi yorum ve kişiler hakkında değerlendirme yoktur.
 */

const guard = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depth228: veri bu yargıyı artık desteklemiyor: ${claim}`);
};
const list = (xs: readonly (string | number)[]) => xs.join(", ");
const lowerFirst = (s: string) => s.charAt(0).toLocaleLowerCase("tr-TR") + s.slice(1);
const lcList = (xs: readonly string[]) => xs.map((x) => x.toLocaleLowerCase("tr-TR")).join(", ");

/* ======================================================================
 * Tek tarih sabiti
 * ==================================================================== */

/**
 * Bu turda kullanılan bütün olay yılları (MS). Hepsi ilgili dersin kendi
 * metninde geçer (osmanli-kurulus-siyaseti: 1302 Koyunhisar, 1326 Bursa,
 * 1345 Karesi, 1353 Çimpe, 1389 I. Kosova, 1396 Niğbolu, 1402 Ankara,
 * 1402–1413 Fetret, 1444 Varna, 1448 II. Kosova, 1453 İstanbul; tarih-zaman:
 * 1 Ocak 1926 miladi takvim). Kronolojik sıra yalnız bu sabitten üretilir.
 */
export const HISTORY_DATES228 = {
  koyunhisar: 1302,
  bursa: 1326,
  karesi: 1345,
  cimpe: 1353,
  kosova1: 1389,
  nigbolu: 1396,
  ankara: 1402,
  fetretStart: 1402,
  fetretEnd: 1413,
  varna: 1444,
  kosova2: 1448,
  istanbul: 1453,
  miladiTurkiye: 1926,
} as const;
export type DateKey228 = keyof typeof HISTORY_DATES228;
const D = HISTORY_DATES228;

/**
 * Tarihi verilmeyen gelişmeler için dönem sırası: yerleşik Osmanlı hükümdar
 * sırası (Osman Bey → Orhan Bey → I. Murad → Yıldırım Bayezid → I. Mehmet →
 * II. Murad → II. Mehmet) ve ardından dersin andığı XVII. yüzyıl.
 */
export const PERIODS228 = ["osman", "orhan", "murad1", "bayezid1", "mehmed1", "murad2", "mehmed2", "y17"] as const;
export type Period228 = (typeof PERIODS228)[number];
export const periodRank228 = (p: Period228) => PERIODS228.indexOf(p);

/* =================================================================
 * 1 · Tarih ve zaman: yüzyıl, yarı ve çeyrek kuralla
 * ================================================================= */

export type Era228 = "MÖ" | "MS";
export interface Year228 { era: Era228; n: number }
export const yearText228 = ({ era, n }: Year228) => `${era} ${n}`;
/** Zaman çizgisindeki sıra numarası: MS n → n, MÖ n → 1 − n (yıl 0 yok). */
export const ordinal228 = ({ era, n }: Year228) => {
  guard(Number.isInteger(n) && n >= 1, `yıl numarası 1 veya daha büyük tam sayı olmalı (${n})`);
  return era === "MS" ? n : 1 - n;
};
/** a’dan b’ye geçen yıllık aralık sayısı (aynı ay ve gün için). */
export const intervalYears228 = (a: Year228, b: Year228) => ordinal228(b) - ordinal228(a);

export interface CenturyPlace228 {
  year: Year228;
  century: number;
  /** Yüzyılın kronolojik ilk ve son yılı (MÖ’de ilk yıl büyük sayıdır). */
  first: number;
  last: number;
  /** Yüzyıl içindeki kronolojik sıra, 1–100. */
  position: number;
  half: 1 | 2;
  quarter: 1 | 2 | 3 | 4;
  quarterFirst: number;
  quarterLast: number;
}
export const centuryPlace228 = (year: Year228): CenturyPlace228 => {
  ordinal228(year);
  const { era, n } = year;
  const century = Math.ceil(n / 100);
  const position = era === "MS" ? n - 100 * (century - 1) : 100 * century - n + 1;
  const half = position <= 50 ? 1 : 2;
  const quarter = Math.ceil(position / 25) as 1 | 2 | 3 | 4;
  const first = era === "MS" ? 100 * (century - 1) + 1 : 100 * century;
  const last = era === "MS" ? 100 * century : 100 * (century - 1) + 1;
  const step = era === "MS" ? 1 : -1;
  const quarterFirst = first + step * 25 * (quarter - 1);
  const quarterLast = quarterFirst + step * 24;
  return { year, century, first, last, position, half, quarter, quarterFirst, quarterLast };
};
export const centuryText228 = (c: CenturyPlace228) => `${c.year.era} ${c.century}. yüzyıl`;
export const rangeText228 = (a: number, b: number) => `${a}–${b}`;
export const halfText228 = (h: 1 | 2) => (h === 1 ? "ilk yarı" : "ikinci yarı");
export const quarterText228 = (c: CenturyPlace228) => `${c.quarter}. çeyrek: ${rangeText228(c.quarterFirst, c.quarterLast)}`;

const ms = (n: number): Year228 => ({ era: "MS", n });
const mo = (n: number): Year228 => ({ era: "MÖ", n });
/** Tablo yılları: dersin andığı sınır yılları ve 1926 (miladi takvimin Türkiye’de kabulü). */
export const centuryYears228: readonly Year228[] = [ms(100), ms(101), ms(1901), ms(D.miladiTurkiye), ms(600), mo(600), mo(220), mo(376)];
export const centuryRows228 = centuryYears228.map(centuryPlace228);

const centuryTable = {
  layout: "table" as const,
  headers: ["Yıl", "Yüzyıl · kronolojik aralık", "Yüzyıl içindeki sıra", "Yarı", "Çeyrek · aralık"],
  rows: centuryRows228.map((c) => [
    yearText228(c.year),
    `${c.century}. yüzyıl · ${c.year.era} ${rangeText228(c.first, c.last)}`,
    `${c.position}. yıl`,
    halfText228(c.half),
    quarterText228(c),
  ]),
};

const [r100, r101, r1901, r1926, rMs600, rMo600, rMo220, rMo376] = centuryRows228;
/** Aynı numaralı MÖ ve MS yılının yüzyıl içindeki sıraları toplamı. */
export const MIRROR_SUM228 = 101;

// Genel yargılar: dersin verdiği bütün sınır örnekleri ve geniş tarama.
guard(centuryPlace228(ms(1900)).century === 19 && centuryPlace228(ms(1901)).century === 20, "1900 on dokuzuncu, 1901 yirminci yüzyıldadır");
guard(r100.century !== r101.century && r100.position === 100 && r101.position === 1, "100 bir yüzyılın son, 101 sonrakinin ilk yılıdır");
guard(rMs600.position === 100 && rMo600.position === 1, "MS 600 yüzyılın son, MÖ 600 kronolojik ilk yılıdır");
guard(rMo220.half === 2 && rMo220.quarter === 4 && rMo220.century === 3, "MÖ 220 üçüncü yüzyılın ikinci yarısının son çeyreğidir");
guard(centuryPlace228(ms(1923)).quarter === 1 && centuryPlace228(ms(1923)).century === 20, "MS 1923 20. yüzyılın ilk çeyreğidir");
guard(r1926.quarter === 2 && r1926.quarterFirst === D.miladiTurkiye, "1926 yirminci yüzyılın ikinci çeyreğinin ilk yılıdır");
guard(rMo376.quarter === 1 && rMo376.quarterLast === 376 && rMo376.quarterFirst === 400, "MÖ 400–301 için ilk çeyrek 400–376’dır");
guard(centuryPlace228(ms(1576)).quarter === 4 && centuryPlace228(ms(1525)).quarter === 1, "MS 1501–1600 için ilk çeyrek 1501–1525, son çeyrek 1576–1600’dür");
guard(intervalYears228(mo(2), ms(3)) === 4, "MÖ 2’den MS 3’e 4 yıllık aralık vardır");
guard(Array.from({ length: 3000 }, (_, i) => i + 1).every((n) => centuryPlace228(ms(n)).position + centuryPlace228(mo(n)).position === MIRROR_SUM228
  && centuryPlace228(ms(n)).century === centuryPlace228(mo(n)).century), "aynı numaralı MÖ ve MS yılı aynı numaralı yüzyıldadır ve sıraları toplamı 101’dir");
guard(Array.from({ length: 300 }, (_, i) => i + 1).every((a) => [1, 50, 299].every((b) => intervalYears228(mo(a), ms(b)) === a + b - 1)), "MÖ a ile MS b arasında a + b − 1 aralık vardır");

export const centurySection228: GuideSection = {
  title: "Bir yılın yüzyılını, yarısını ve çeyreğini kuralla bul",
  paragraphs: [
    `Yüzyıl numarası, yıl numarasının 100’e bölümünün yukarı yuvarlanmasıdır: ${r100.year.n} için ${r100.century}, ${r101.year.n} için ${r101.century}, ${r1901.year.n} için ${r1901.century}. Sonra yılın yüzyıl içindeki kronolojik sırası bulunur. MS’de sıra = yıl − 100 × (yüzyıl − 1), MÖ’de sıra = 100 × yüzyıl − yıl + 1 olur; çünkü MÖ’de zaman büyük sayıdan küçüğe akar. Sıra 1–50 ise ilk yarı, 51–100 ise ikinci yarıdır. Çeyrek, sıranın 25’e bölümünün yukarı yuvarlanmasıdır.`,
    `Tablodaki sınır yıllarını karşılaştır. ${yearText228(r100.year)}, ${r100.century}. yüzyılın ${r100.position}. yılıdır; ${yearText228(r101.year)} ise ${r101.century}. yüzyılın ${r101.position}. yılı. ${yearText228(rMs600.year)}, kendi yüzyılının ${rMs600.position}. yılı iken ${yearText228(rMo600.year)}, aynı numaralı yüzyılın ${rMo600.position}. yılıdır. Türkiye’de miladi takvimin kullanılmaya başlandığı ${r1926.year.n} yılı ${r1926.century}. yüzyılın ${r1926.quarter}. çeyreğinin ilk yılıdır (${rangeText228(r1926.quarterFirst, r1926.quarterLast)}).`,
    `Aynı numaralı MÖ ve MS yılı aynı numaralı yüzyıldadır, fakat sıraları ayna gibidir: ikisinin toplamı her zaman ${MIRROR_SUM228} olur. Örneğin ${yearText228(rMo220.year)}, ${rMo220.century}. yüzyılın ${rMo220.position}. yılıdır, yani ${halfText228(rMo220.half)} ve ${rMo220.quarter}. çeyrek. MS ${rMo220.year.n} ise ${centuryPlace228(ms(rMo220.year.n)).position}. yıldır. Bu kural yalnız MÖ 1’den sonra MS 1’in geldiği, 0 yılı olmayan tarihsel dizi içindir.`,
  ],
  table: centuryTable,
};

/* Örnek 1: aynı numaralı MÖ ve MS yılı */
export const mirrorYear228 = 449;
export const mirrorPair228 = { ms: centuryPlace228(ms(mirrorYear228)), mo: centuryPlace228(mo(mirrorYear228)) };
/* Örnek 2: karışık etiketleri sırala, aralık ve yüzyıl say */
export const mixedYears228: readonly Year228[] = [ms(101), mo(2), mo(300), ms(3), mo(220)];
export const mixedSorted228 = [...mixedYears228].sort((a, b) => ordinal228(a) - ordinal228(b));
export const mixedSpan228 = (() => {
  const first = mixedSorted228[0], last = mixedSorted228[mixedSorted228.length - 1];
  const intervals = intervalYears228(first, last);
  const cFirst = centuryPlace228(first), cLast = centuryPlace228(last);
  // Yıl 0 olmadığından MÖ yüzyılları ile MS yüzyılları doğrudan art arda gelir.
  const centuries: string[] = [];
  if (first.era === "MÖ") for (let c = cFirst.century; c >= 1; c--) centuries.push(`MÖ ${c}.`);
  const startMs = first.era === "MS" ? cFirst.century : 1;
  if (last.era === "MS") for (let c = startMs; c <= cLast.century; c++) centuries.push(`MS ${c}.`);
  return { first, last, intervals, labels: intervals + 1, centuries };
})();
const { ms: m449, mo: b449 } = mirrorPair228;
guard(m449.century === b449.century && m449.quarter !== b449.quarter && m449.half !== b449.half, "aynı numaralı MÖ ve MS 449 aynı yüzyılda ama farklı yarı ve çeyrektedir");
guard(mixedSpan228.intervals === mixedSpan228.first.n + mixedSpan228.last.n - 1, "örnek aralığı a + b − 1 kuralıyla aynıdır");

export const centuryExamples228: WorkedExample[] = [
  {
    title: `Aynı numara, farklı çeyrek: MS ${mirrorYear228} ve MÖ ${mirrorYear228}`,
    prompt: `Geleneksel tarihsel dizide (MÖ 1’den sonra MS 1 gelir, 0 yılı yoktur) MS ${mirrorYear228} ve MÖ ${mirrorYear228} yıllarının her biri hangi yüzyılın hangi yarısının hangi çeyreğindedir? Çeyrekler yüzyılın kronolojik sırasına göre 25’er yıldır.`,
    strategy: "Önce yüzyılı yukarı yuvarlayarak bul. Sonra yılın o yüzyıldaki kronolojik sırasını hesapla; yarı ve çeyrek bu sıradan okunur.",
    steps: [
      { label: "Yüzyıl", expression: `${mirrorYear228} / 100 → ${m449.century}. yüzyıl`, explanation: `İki yıl da ${m449.century}. yüzyıldadır. MS’de aralık ${rangeText228(m449.first, m449.last)}, MÖ’de ${rangeText228(b449.first, b449.last)} yönünde akar.` },
      { label: "MS sırası", expression: `${mirrorYear228} − ${100 * (m449.century - 1)} = ${m449.position}`, explanation: `${m449.position}. yıl: ${halfText228(m449.half)}, ${quarterText228(m449)}.` },
      { label: "MÖ sırası", expression: `${100 * b449.century} − ${mirrorYear228} + 1 = ${b449.position}`, explanation: `${b449.position}. yıl: ${halfText228(b449.half)}, ${quarterText228(b449)}.` },
      { label: "Ayna denetimi", expression: `${m449.position} + ${b449.position} = ${m449.position + b449.position}`, explanation: `Aynı numaralı MÖ ve MS yılının sıraları toplamı her zaman ${MIRROR_SUM228} olmalıdır.` },
    ],
    answer: `MS ${mirrorYear228}: ${m449.century}. yüzyılın ${halfText228(m449.half)}sı, ${m449.quarter}. çeyrek (${rangeText228(m449.quarterFirst, m449.quarterLast)}). MÖ ${mirrorYear228}: ${b449.century}. yüzyılın ${halfText228(b449.half)}sı, ${b449.quarter}. çeyrek (${rangeText228(b449.quarterFirst, b449.quarterLast)}).`,
    check: `Sıralar ${m449.position} ve ${b449.position}; toplam ${m449.position + b449.position}. MÖ ${mirrorYear228} için çeyrek aralığı ${rangeText228(b449.quarterFirst, b449.quarterLast)} biçiminde büyükten küçüğe akar.`,
    pitfall: "MÖ yılını MS gibi küçükten büyüğe sayıp aynı çeyreğe koymak. MÖ’de büyük numaralı yıl yüzyılın başındadır.",
  },
  {
    title: "Karışık MÖ–MS etiketlerini sırala, aralığı ve yüzyılları say",
    prompt: `Beş yıl etiketi karışık verilmiştir: ${list(mixedYears228.map(yearText228))}. Geleneksel dizide 0 yılı yoktur. Etiketleri eskiden yeniye sırala. En eski ile en yeni yılın aynı ay ve günü arasında kaç yıllık aralık vardır? Bu aralık kaç ayrı yüzyıla dokunur?`,
    strategy: "MÖ’de büyük numara daha eskidir; MS’de küçük numara daha eskidir. Miladı aşan aralık a + b − 1 kuralıyla bulunur.",
    steps: [
      { label: "Sırala", expression: mixedSorted228.map(yearText228).join(" → "), explanation: "Önce MÖ yılları büyükten küçüğe, sonra MS yılları küçükten büyüğe yazılır." },
      { label: "Aralık", expression: `${mixedSpan228.first.n} + ${mixedSpan228.last.n} − 1 = ${mixedSpan228.intervals}`, explanation: "Miladın iki tarafında 0 yılı bulunmadığı için bir çıkarılır." },
      { label: "Etiket sayısı", expression: `${mixedSpan228.intervals} + 1 = ${mixedSpan228.labels}`, explanation: "İki uç dahil yazılan yıl adlarının sayısı aralık sayısından bir fazladır." },
      { label: "Yüzyıllar", expression: mixedSpan228.centuries.join(", "), explanation: `${yearText228(mixedSpan228.first)}, MÖ ${centuryPlace228(mixedSpan228.first).century}. yüzyıldadır; ${yearText228(mixedSpan228.last)}, MS ${centuryPlace228(mixedSpan228.last).century}. yüzyılda. Arada MÖ 1. yüzyıldan MS 1. yüzyıla doğrudan geçilir.` },
    ],
    answer: `${mixedSorted228.map(yearText228).join(" → ")}; ${mixedSpan228.intervals} yıllık aralık (${mixedSpan228.labels} yıl etiketi) ve ${mixedSpan228.centuries.length} yüzyıl.`,
    check: `${yearText228(mixedSpan228.first)} → MÖ 1 arası ${mixedSpan228.first.n - 1}, MÖ 1 → MS 1 arası 1, MS 1 → ${yearText228(mixedSpan228.last)} arası ${mixedSpan228.last.n - 1} aralık: toplam ${mixedSpan228.first.n - 1 + 1 + mixedSpan228.last.n - 1}.`,
    pitfall: `Sayıları etiketsiz sıralamak (2, 3, 101, 220, 300) veya ${mixedSpan228.first.n} + ${mixedSpan228.last.n} = ${mixedSpan228.first.n + mixedSpan228.last.n} yazıp 0 yılı varmış gibi saymak.`,
  },
];

export const centurySupplement228 = {
  title: centurySection228.title,
  figureTitle: centurySection228.title,
  paragraphs: centurySection228.paragraphs,
  summary: `Yüzyıl = yıl/100 yukarı yuvarla. Sıra: MS’de yıl − 100(yüzyıl − 1), MÖ’de 100·yüzyıl − yıl + 1. Sıra 1–50 ilk yarı; çeyrek = sıra/25 yukarı. ${yearText228(r100.year)} son yıl, ${yearText228(r101.year)} ilk yıl; ${yearText228(rMo600.year)} ilk, ${yearText228(rMs600.year)} son yıl. Aynı numaralı MÖ ve MS sıraları toplamı ${MIRROR_SUM228}.`,
  appendSection: true as const,
  table: centuryTable,
  examples: centuryExamples228,
};

/* =================================================================
 * 2 · Kuruluş siyaseti: kronoloji, hükümdar ve siyaset hattı
 * ================================================================= */

export type Line228 = "Bizans ve uç" | "Anadolu beylikleri" | "Rumeli" | "Hanedan içi";
export const LINES228: readonly Line228[] = ["Bizans ve uç", "Anadolu beylikleri", "Rumeli", "Hanedan içi"];
export interface Event228 {
  key: DateKey228;
  event: string;
  ruler: string;
  period: Period228;
  line: Line228;
  /** Dersin bu gelişmeye bağladığı sonuç. */
  result: string;
}
const events228Raw: readonly Event228[] = [
  { key: "karesi", event: "Karesi Beyliği’nin katılması", ruler: "Orhan Bey", period: "orhan", line: "Anadolu beylikleri", result: "Toprak, denizcilik birikimi ve tecrübeli komutanlar" },
  { key: "koyunhisar", event: "Koyunhisar", ruler: "Osman Bey", period: "osman", line: "Bizans ve uç", result: "Osman Bey’in siyasi ağırlığı arttı" },
  { key: "ankara", event: "Ankara Savaşı", ruler: "Yıldırım Bayezid", period: "bayezid1", line: "Anadolu beylikleri", result: "Osmanlı yenilgisi; bazı beylikler yeniden ortaya çıktı" },
  { key: "bursa", event: "Bursa’nın alınması", ruler: "Orhan Bey", period: "orhan", line: "Bizans ve uç", result: "Şehir, pazar ve yönetim imkânları" },
  { key: "kosova1", event: "I. Kosova", ruler: "I. Murad", period: "murad1", line: "Rumeli", result: "Haçlı ittifakına karşı başarı; I. Murad hayatını kaybetti" },
  { key: "fetretEnd", event: "Fetret’in sonu, toparlanma", ruler: "I. Mehmet", period: "mehmed1", line: "Hanedan içi", result: "Hanedan içi iktidar tek merkezde toplandı" },
  { key: "cimpe", event: "Çimpe’nin elde edilmesi", ruler: "Orhan Bey", period: "orhan", line: "Rumeli", result: "Boğazın batısında hareket üssü" },
  { key: "nigbolu", event: "Niğbolu", ruler: "Yıldırım Bayezid", period: "bayezid1", line: "Rumeli", result: "Haçlı kuvvetleri yenildi; Balkanlardaki güç arttı" },
];
/** Satırlar yalnız tarih sabitinden sıralanır. */
export const events228 = [...events228Raw].sort((a, b) => D[a.key] - D[b.key]);
export const eventGaps228 = events228.map((e, i) => (i === 0 ? null : D[e.key] - D[events228[i - 1].key]));
const ev = (k: DateKey228) => events228.find((e) => e.key === k)!;

const chronologyTable = {
  layout: "table" as const,
  headers: ["Yıl", "Gelişme", "Dönem", "Siyaset hattı", "Öncekinden sonra"],
  rows: events228.map((e, i) => [String(D[e.key]), e.event, e.ruler, e.line, eventGaps228[i] === null ? "İlk satır" : `${eventGaps228[i]} yıl`]),
};
const firstOn = (line: Line228) => events228.find((e) => e.line === line)!;
const orhanEvents = events228.filter((e) => e.period === "orhan");
const longestGapIndex = eventGaps228.reduce<number>((best, g, i) => (g !== null && g > (eventGaps228[best] ?? -1) ? i : best), 1);
export const fetretYears228 = D.fetretEnd - D.fetretStart;

guard(events228.every((e, i) => i === 0 || D[events228[i - 1].key] < D[e.key]), "tablo satırları tarih sırasındadır ve aynı yıla düşen iki satır yoktur");
guard(events228.every((e, i) => i === 0 || periodRank228(events228[i - 1].period) <= periodRank228(e.period)), "tarih sırası hükümdar sırasıyla çelişmez");
guard(firstOn("Rumeli").key === "cimpe", "tablodaki ilk Rumeli gelişmesi Çimpe’dir");
guard(D.karesi < D.cimpe, "Karesi’nin katılması Çimpe’den öncedir");
guard(orhanEvents.map((e) => e.key).join() === "bursa,karesi,cimpe", "Orhan Bey dönemine tablodaki üç gelişme düşer: Bursa, Karesi, Çimpe");
guard(D.fetretStart === D.ankara && fetretYears228 === 11, "Fetret Ankara yılında başlar ve 11 yıl sürer");
guard(D.varna < D.kosova2 && D.kosova2 < D.istanbul && D.fetretEnd < D.varna, "Varna ve II. Kosova 1413’ten sonra, 1453’ten öncedir");

export const chronologySection228: GuideSection = {
  title: "Kuruluş dönemi kronolojisi: yıl, hükümdar ve siyaset hattı",
  paragraphs: [
    `Tablonun satırları yalnız yıllara göre dizilmiştir; son sütun bir önceki satırdan geçen yıldır. ${events228.length} gelişme ${D[events228[0].key]} ile ${D[events228[events228.length - 1].key]} arasındadır. Her satıra hükümdarı ve dersin üç sorusundan hangisine ait olduğunu da yaz: Bizans ve uç çevresi, Anadolu beylikleri, Rumeli. ${D.fetretEnd} toparlanması hanedan içi iktidarla ilgili olduğundan ayrı bir hatta gösterilir.`,
    `Orhan Bey dönemine tablodaki ${orhanEvents.length} gelişme düşer: ${list(orhanEvents.map((e) => `${e.event} (${D[e.key]})`))}. Karesi’nin katılması (${D.karesi}) toprak yanında denizcilik birikimi ve komutanlar sağladı; ${D.cimpe - D.karesi} yıl sonra, ${D.cimpe} yılında Çimpe Rumeli’de ilk kalıcı üs oldu. Bu sıra, Rumeli’ye geçişin yalnız Karesi’den kaynaklandığını kanıtlamaz; Bizans iç mücadelelerindeki ilişkiler de rol oynadı.`,
    `${D.ankara} Ankara yenilgisinden sonra Bayezid’in oğulları arasındaki mücadele ${D.fetretStart}–${D.fetretEnd} Fetret Devri’dir, yani ${fetretYears228} yıl. Taht mücadelesi Ankara’dan sonra geldiği için savaşın nedeni olarak geriye taşınamaz. Tablonun dışında kalan ${D.varna} Varna ve ${D.kosova2} II. Kosova II. Murad, ${D.istanbul} İstanbul’un fethi II. Mehmet dönemindedir.`,
  ],
  table: chronologyTable,
};

/* Örnek 1: karışık kartları sırala */
export const cardKeys228: readonly DateKey228[] = ["nigbolu", "bursa", "kosova2", "koyunhisar", "cimpe"];
const cardInfo: Record<string, { event: string; ruler: string; period: Period228 }> = {
  kosova2: { event: "II. Kosova", ruler: "II. Murad", period: "murad2" },
};
export const cards228 = cardKeys228.map((k) => ({ key: k, ...(cardInfo[k] ?? ev(k)), year: D[k] }));
export const cardsSorted228 = [...cards228].sort((a, b) => a.year - b.year);
export const cardGaps228 = cardsSorted228.slice(1).map((c, i) => ({ from: cardsSorted228[i], to: c, gap: c.year - cardsSorted228[i].year }));
export const cardLongest228 = cardGaps228.reduce((a, b) => (b.gap > a.gap ? b : a));
export const cardSameRuler228 = cardsSorted228.filter((c, _, all) => all.filter((x) => x.ruler === c.ruler).length > 1);
guard(cardSameRuler228.length === 2 && cardSameRuler228.every((c) => c.ruler === "Orhan Bey"), "kartlarda yalnız iki kart aynı hükümdara (Orhan Bey) düşer");
guard(cardGaps228.filter((g) => g.gap === cardLongest228.gap).length === 1, "en uzun ara tektir");

/* Örnek 2: neden–sonuç yönünü tarihle denetle */
export const fetretChain228 = [
  { label: "Ankara Savaşı", year: D.ankara },
  { label: "Fetret Devri başlar (taht mücadelesi)", year: D.fetretStart },
  { label: "I. Mehmet’in üstünlüğü, Fetret’in sonu", year: D.fetretEnd },
] as const;
guard(fetretChain228.every((s, i) => i === 0 || fetretChain228[i - 1].year <= s.year), "Ankara → Fetret → toparlanma zinciri tarih sırasındadır");

export const chronologyExamples228: WorkedExample[] = [
  {
    title: "Beş kartı sırala, en uzun arayı ve ortak hükümdarı bul",
    prompt: `Kartlar karışık verilmiştir: ${list(cards228.map((c) => `${c.event} (${c.year})`))}. Kartları eskiden yeniye sırala. Ardışık iki kart arasındaki en uzun süre hangi kartlar arasındadır? Hangi kartlar aynı hükümdarın dönemine düşer? Hükümdarlar: ${list(cards228.map((c) => `${c.event} – ${c.ruler}`))}.`,
    strategy: "Yalnız yıllarla sırala, ardışık farkları tek tek hesapla, sonra hükümdar sütununda tekrar eden adı ara.",
    steps: [
      { label: "Sırala", expression: cardsSorted228.map((c) => c.year).join(" → "), explanation: cardsSorted228.map((c) => c.event).join(" → ") + "." },
      { label: "Ardışık farklar", expression: cardGaps228.map((g) => `${g.to.year} − ${g.from.year} = ${g.gap}`).join("; "), explanation: "Her fark bir önceki karttan geçen yıldır." },
      { label: "En uzun ara", expression: `${cardLongest228.gap} yıl`, explanation: `${cardLongest228.from.event} (${cardLongest228.from.year}) ile ${cardLongest228.to.event} (${cardLongest228.to.year}) arasındadır.` },
      { label: "Ortak hükümdar", expression: cardSameRuler228.map((c) => c.event).join(" ve "), explanation: `İkisi de ${cardSameRuler228[0].ruler} dönemindedir; öteki üç kartın hükümdarları farklıdır.` },
    ],
    answer: `${cardsSorted228.map((c) => `${c.event} (${c.year})`).join(" → ")}. En uzun ara ${cardLongest228.gap} yıl: ${cardLongest228.from.event} – ${cardLongest228.to.event}. Aynı hükümdar: ${cardSameRuler228.map((c) => c.event).join(" ve ")} (${cardSameRuler228[0].ruler}).`,
    check: `Farkların toplamı ${cardGaps228.map((g) => g.gap).join(" + ")} = ${cardGaps228.reduce((s, g) => s + g.gap, 0)}; bu, ${cardsSorted228[cardsSorted228.length - 1].year} − ${cardsSorted228[0].year} farkına eşittir.`,
    pitfall: "I. Kosova ile II. Kosova’yı ad benzerliğinden aynı dönem sanmak. II. Kosova II. Murad, I. Kosova I. Murad dönemindedir.",
  },
  {
    title: "Neden sonuçtan sonra gelemez: Ankara ve Fetret",
    prompt: `Bir öğrenci şu zinciri yazıyor: “Bayezid’in oğulları arasındaki taht mücadelesi → neden oldu → Ankara Savaşı.” Ders bilgisi: Ankara Savaşı ${D.ankara} yılındadır; Bayezid’in oğulları arasındaki mücadele ${D.fetretStart}–${D.fetretEnd} Fetret Devri’dir ve I. Mehmet’in ${D.fetretEnd} yılında üstünlük kurmasıyla biter. Zinciri tarihlerle denetle, doğru yönü yaz ve Fetret’in kaç yıl sürdüğünü bul.`,
    strategy: "Neden ile sonucu ayırmanın ilk denetimi zaman sırasıdır: bir neden, sonucundan sonra başlayamaz.",
    steps: [
      { label: "Tarihleri yaz", expression: fetretChain228.map((s) => `${s.label}: ${s.year}`).join("; "), explanation: "Taht mücadelesi Ankara yenilgisiyle aynı yıl, savaştan sonra başlar." },
      { label: "Yönü düzelt", expression: fetretChain228.map((s) => s.label).join(" → "), explanation: "Taht mücadelesi Ankara Savaşı’nın sonucudur; nedeni olarak geriye taşınamaz." },
      { label: "Süre", expression: `${D.fetretEnd} − ${D.fetretStart} = ${fetretYears228}`, explanation: "Fetret Devri bu kadar yıl sürer." },
      { label: "Sınırı koru", explanation: "Sıranın doğru olması nedenselliği tek başına ispatlamaz. Ankara’nın öncesi için ders Timur ile Bayezid’in üstünlük iddialarını, sığınan hükümdar ve beylerin durumunu ve Anadolu’daki güç dengesini verir." },
    ],
    answer: `Zincir ters kurulmuştur. Doğrusu: Ankara Savaşı (${D.ankara}) → Fetret Devri (${D.fetretStart}–${D.fetretEnd}) → I. Mehmet’in toparlaması (${D.fetretEnd}). Fetret ${fetretYears228} yıl sürer.`,
    check: `Her halkanın yılı bir öncekinden küçük değil: ${fetretChain228.map((s) => s.year).join(" ≤ ")}.`,
    pitfall: "Sonraki taht mücadelesini savaşın nedeni saymak ya da yalnız art arda gelmeyi nedensellik kanıtı sanmak.",
  },
];

export const chronologySupplement228 = {
  title: chronologySection228.title,
  figureTitle: chronologySection228.title,
  paragraphs: chronologySection228.paragraphs,
  summary: `${events228.map((e) => `${D[e.key]} ${e.event}`).join(" · ")}. Orhan Bey: ${list(orhanEvents.map((e) => D[e.key]))}. Fetret ${D.fetretStart}–${D.fetretEnd} (${fetretYears228} yıl). En uzun ara: ${events228[longestGapIndex - 1].event} → ${events228[longestGapIndex].event}, ${eventGaps228[longestGapIndex]} yıl.`,
  appendSection: true as const,
  table: chronologyTable,
  examples: chronologyExamples228,
};

/* =================================================================
 * 3 · Askerî teşkilat: kuvvet profilleri ve aday listesi
 * ================================================================= */

export type Org228 = "İlk düzenli birlik" | "Kapıkulu" | "Taşra (tımar)" | "Uç ve yardımcı";
export const ORGS228: readonly Org228[] = ["İlk düzenli birlik", "Kapıkulu", "Taşra (tımar)", "Uç ve yardımcı"];
export type Arm228 = "piyade" | "atlı";
export type Pay228 = "ulufe" | "dirlik" | "sefer ücreti" | null;
export interface Force228 {
  name: string;
  short: string;
  org: Org228;
  arm: Arm228;
  pay: Pay228;
  support: string;
  duty: string;
}
export const forces228: readonly Force228[] = [
  { name: "Yaya", short: "Yaya", org: "İlk düzenli birlik", arm: "piyade", pay: "sefer ücreti", support: "Seferde ücret; barışta üretim ve muafiyet", duty: "Orhan Bey döneminin düzenli piyadesi" },
  { name: "Müsellem", short: "Müsellem", org: "İlk düzenli birlik", arm: "atlı", pay: "sefer ücreti", support: "Seferde ücret; barışta üretim ve muafiyet", duty: "Orhan Bey döneminin düzenli atlısı" },
  { name: "Yeniçeri", short: "Yeniçeri", org: "Kapıkulu", arm: "piyade", pay: "ulufe", support: "Merkez hazinesinden ulufe", duty: "Sürekli merkez piyadesi" },
  { name: "Kapıkulu süvarileri (sipah, silahtar, ulufeciler, garipler)", short: "Kapıkulu süvarisi", org: "Kapıkulu", arm: "atlı", pay: "ulufe", support: "Merkez hazinesinden ulufe", duty: "Merkeze bağlı atlı kuvvet" },
  { name: "Tımarlı sipahi", short: "Tımarlı sipahi", org: "Taşra (tımar)", arm: "atlı", pay: "dirlik", support: "Dirlik (vergi) geliri", duty: "Cebelü yetiştirir, seferde onlarla katılır" },
  { name: "Akıncı", short: "Akıncı", org: "Uç ve yardımcı", arm: "atlı", pay: null, support: "Bu derste verilmez", duty: "Sınırda keşif, akın ve öncülük" },
  { name: "Azeb", short: "Azeb", org: "Uç ve yardımcı", arm: "piyade", pay: null, support: "Gönüllü Türk gençlerinden seçilebilir", duty: "Sefer, öncü veya kale hizmetinde hafif piyade" },
];
export interface Profile228 { arm?: Arm228; pay?: Exclude<Pay228, null>; org?: Org228 }
/** Kayıtta verilen özelliklerle uyumlu bütün kuvvetler; verilmeyen özellik eleme yapmaz. */
export const candidates228 = (p: Profile228) =>
  forces228.filter((f) => (p.arm === undefined || f.arm === p.arm) && (p.pay === undefined || f.pay === p.pay) && (p.org === undefined || f.org === p.org));
const forceTable = {
  layout: "table" as const,
  headers: ["Kuvvet", "Teşkilat", "Piyade / atlı", "Gelir veya kaynak", "Ayırıcı görev"],
  rows: forces228.map((f) => [f.name, f.org, f.arm === "atlı" ? "Atlı" : "Piyade", f.support, f.duty]),
};
const names = (fs: readonly Force228[]) => fs.map((f) => f.short);
const mountedAll = candidates228({ arm: "atlı" });
const ulufeAll = candidates228({ pay: "ulufe" });
const ulufeMounted = candidates228({ arm: "atlı", pay: "ulufe" });
const kapikulu = candidates228({ org: "Kapıkulu" });

guard(mountedAll.length > 1 && mountedAll.some((f) => f.org === "Kapıkulu"), "atlı olmak tek başına tımarlı sipahiyi kanıtlamaz; kapıkulu süvarileri de atlıdır");
guard(ulufeMounted.length === 1 && ulufeMounted[0].org === "Kapıkulu", "ulufe alan atlı kuvvet kapıkulu süvarileridir");
guard(ulufeAll.length > 1, "ulufe bilgisi tek başına tek birlik seçtirmez");
guard(kapikulu.some((f) => f.arm === "piyade") && kapikulu.some((f) => f.arm === "atlı"), "kapıkulunun tamamı piyade değildir");
guard(forces228.every((f) => (f.pay === "ulufe") === (f.org === "Kapıkulu")), "tabloda ulufe yalnız kapıkulu satırlarında görülür");
guard(candidates228({ pay: "dirlik" }).map((f) => f.short).join() === "Tımarlı sipahi", "dirlik geliri tımarlı sipahiyi ayırır");

export const forceSection228: GuideSection = {
  title: "Kuvvet profili: teşkilat, piyade-atlı ve gelir birlikte",
  paragraphs: [
    `Tablodaki ${forces228.length} kuvvet dört teşkilat başlığına ayrılır. ${ORGS228.map((o) => `${o}: ${names(candidates228({ org: o })).join(", ")}`).join(". ")}. Kapıkulu başlığında hem piyade (${names(kapikulu.filter((f) => f.arm === "piyade")).join(", ")}) hem atlı (${names(kapikulu.filter((f) => f.arm === "atlı")).join(", ")}) vardır; kapıkulu yeniçeriyle eş anlamlı değildir.`,
    `Bir kaydı sınıflamak için verilen her özellik aday listesini daraltır. Yalnız “atlı” bilgisi ${mountedAll.length} adayı açık bırakır: ${list(names(mountedAll))}. Yalnız “ulufe” bilgisi ${ulufeAll.length} aday bırakır: ${list(names(ulufeAll))}. İkisi birlikte verilince tek aday kalır: ${names(ulufeMounted).join(", ")}. Dirlik geliri ise tablodaki adaylardan yalnız tımarlı sipahiye uyar.`,
    "Akıncı ve azeb satırlarında ders ödeme bilgisi vermez; bu boşluk uydurma bir gelirle doldurulmaz. Kalede veya sınırda bulunmak gibi tek bir konum bilgisi de bir birliğin bütün teşkilat kimliğini kesinleştirmez. Tablo görevleri öğretir; her kuvvetin bütün yüzyıllarda değişmeden kaldığını söylemez.",
  ],
  table: forceTable,
};

export const forceRecords228 = [
  { id: "A", text: "Merkez hazinesinden ulufe alan atlı kuvvet", profile: { arm: "atlı", pay: "ulufe" } as Profile228 },
  { id: "B", text: "Dirlik geliri karşılığında cebelüyle sefere katılan atlı", profile: { arm: "atlı", pay: "dirlik" } as Profile228 },
  { id: "C", text: "Yalnız “atlı birlik” yazan kayıt", profile: { arm: "atlı" } as Profile228 },
] as const;
export const forceRecordAnswers228 = forceRecords228.map((r) => ({ ...r, candidates: candidates228(r.profile) }));
const [recA, recB, recC] = forceRecordAnswers228;
guard(recA.candidates.length === 1 && recB.candidates.length === 1 && recC.candidates.length > 1, "A ve B tek adaya iner, C açık kalır");

/** Kurumlaşma aşamaları: dersin verdiği dönem bilgisi (tarih verilmez, hükümdar sırası kullanılır). */
export const stages228 = [
  { label: "Yeniçeri ve kapıkulu kurumlaşmasının belirginleşmesi", ruler: "I. Murad", period: "murad1" as Period228 },
  { label: "Alpler, gaziler ve Türkmen savaşçılarıyla ilk fetihler", ruler: "Osman Bey", period: "osman" as Period228 },
  { label: "İlk düzenli birlikler: yaya ve müsellem", ruler: "Orhan Bey", period: "orhan" as Period228 },
] as const;
export const stagesSorted228 = [...stages228].sort((a, b) => periodRank228(a.period) - periodRank228(b.period));
guard(stagesSorted228[1].ruler === "Orhan Bey" && stagesSorted228[2].ruler === "I. Murad", "ilk düzenli birlikler yeniçeriden önceki dönemdedir");

export const forceExamples228: WorkedExample[] = [
  {
    title: "Üç kayıt, üç aday listesi",
    prompt: `Tablodaki ${forces228.length} kuvvet aday listesidir. Üç kurmaca kayıt veriliyor: ${forceRecords228.map((r) => `${r.id}) ${lowerFirst(r.text)}`).join("; ")}. Her kayıt hangi kuvvet veya kuvvetlerle uyumludur? Kayıtta yazmayan özellik eleme için kullanılmaz.`,
    strategy: "Her kayıtta verilen özellikleri tek tek uygula; her biri aday listesini daraltır. Verilmeyen özelliği uydurma.",
    steps: [
      { label: "A kaydı", expression: `atlı → ${names(mountedAll).length} aday; + ulufe → ${names(recA.candidates).join(", ")}`, explanation: "Tabloda ulufe alan atlı kuvvet yalnız kapıkulu süvarileridir." },
      { label: "B kaydı", expression: `dirlik geliri → ${names(recB.candidates).join(", ")}`, explanation: "Dirlik geliri ve cebelü yükümlülüğü taşra atlısını gösterir." },
      { label: "C kaydı", expression: `atlı → ${list(names(recC.candidates))}`, explanation: "Gelir veya teşkilat bilgisi olmadığı için adaylar açık kalır." },
    ],
    answer: `A: ${names(recA.candidates).join(", ")}. B: ${names(recB.candidates).join(", ")}. C: kesin seçilemez; ${recC.candidates.length} aday kalır (${list(names(recC.candidates))}).`,
    check: `A ve B birer adaya iner; C’de atlı satır sayısı ${recC.candidates.length}. Her adayın tablo satırında “Atlı” yazar.`,
    pitfall: "Atlı gördüğü her kaydı tımarlı sipahi saymak. Kapıkulu süvarileri de atlıdır ve merkezden ulufe alır.",
  },
  {
    title: "İlk düzenli ordu sorusunda dönem sırası",
    prompt: `Bir öğrenci “Osmanlı’nın ilk düzenli birliği Yeniçeri Ocağı’dır” diyor. Ders şu dönem bilgilerini veriyor: ${stages228.map((s) => `${lowerFirst(s.label)} – ${s.ruler}`).join("; ")}. Hükümdar sırası Osman Bey → Orhan Bey → I. Murad’dır. Aşamaları sırala ve iddiayı denetle.`,
    strategy: "Tarih verilmediğinde dönemleri hükümdar sırasıyla diz; sonra “ilk düzenli” niteliğini taşıyan aşamayı bul.",
    steps: [
      { label: "Sırala", expression: stagesSorted228.map((s) => s.ruler).join(" → "), explanation: stagesSorted228.map((s) => s.label).join(" → ") + "." },
      { label: "İlk düzenli birlik", expression: `${stagesSorted228[1].ruler}: yaya ve müsellem`, explanation: "Uç savaşçıları sefer zamanında toplanıyordu; ücretli, düzenli birlikler yaya ve müsellemdir." },
      { label: "İddiayı denetle", expression: `${stagesSorted228[1].ruler} önce, ${stagesSorted228[2].ruler} sonra`, explanation: "Yeniçeri kurumlaşması daha sonraki dönemde belirginleşir." },
    ],
    answer: `İddia yanlıştır. Sıra: ${stagesSorted228.map((s) => s.ruler).join(" → ")}. İlk düzenli birlikler ${stagesSorted228[1].ruler} döneminin yaya ve müsellemleridir; yeniçeri ${stagesSorted228[2].ruler} döneminde belirginleşir.`,
    check: "Sıralamada her aşamanın hükümdarı bir öncekinden sonra geliyor mu? Yaya piyade, müsellem atlıdır.",
    pitfall: "İlk düzenli ordu sorusunda en tanınmış ocak olan Yeniçeri Ocağı’nı seçmek.",
  },
];

export const forceSupplement228 = {
  title: forceSection228.title,
  figureTitle: forceSection228.title,
  paragraphs: forceSection228.paragraphs,
  summary: `Kapıkulu: ${names(kapikulu).join(", ")} (ulufe). Taşra: tımarlı sipahi (dirlik, cebelü). İlk düzenli: yaya ve müsellem. Uç ve yardımcı: akıncı, azeb. Atlı → ${mountedAll.length} aday; atlı + ulufe → ${names(ulufeMounted).join(", ")}.`,
  appendSection: true as const,
  table: forceTable,
  examples: forceExamples228,
};

/* =================================================================
 * 4 · Medeniyet: askerî sınıf ve reaya, üç kol
 * ================================================================= */

export type Branch228 = "seyfiye" | "kalemiye" | "ilmiye";
export const BRANCHES228: readonly Branch228[] = ["seyfiye", "kalemiye", "ilmiye"];
export type Act228 = "yönetim" | "mali kayıt" | "yargı" | "fetva" | "öğretim" | "üretim";
/** Ayırıcı işten kola: dersin anlattığı iş bölümü. Üretim ve vergi yönetilenlerin (reaya) işidir. */
export const BRANCH_OF_ACT228: Record<Act228, Branch228 | null> = {
  yönetim: "seyfiye", "mali kayıt": "kalemiye", yargı: "ilmiye", fetva: "ilmiye", öğretim: "ilmiye", üretim: null,
};
export interface Person228 { name: string; act: Act228; work: string; place: string }
export const people228: readonly Person228[] = [
  { name: "Vezir", act: "yönetim", work: "Merkezî siyasi-askerî yönetim", place: "Merkez yönetimi" },
  { name: "Beylerbeyi", act: "yönetim", work: "Eyalet yönetimi ve güvenlik", place: "Eyalet" },
  { name: "Defterdar", act: "mali kayıt", work: "Mali hesaplar", place: "Maliye" },
  { name: "Kadı", act: "yargı", work: "Yargılama, mahkeme kaydı, beledî işler", place: "Mahkeme" },
  { name: "Müftü", act: "fetva", work: "Fetva: dinî-hukuki görüş", place: "Fetva" },
  { name: "Müderris", act: "öğretim", work: "Medresede ders", place: "Medrese" },
  { name: "Şehirli zanaatkâr", act: "üretim", work: "Üretim ve vergi; esnaf dayanışması", place: "Çarşı" },
  { name: "Köylü üretici", act: "üretim", work: "Toprağı işler, vergi verir", place: "Köy" },
];
export const statusOf228 = (p: Person228) => (BRANCH_OF_ACT228[p.act] ? "Askerî sınıf" : "Reaya");
export const branchOf228 = (p: Person228) => BRANCH_OF_ACT228[p.act];
const statusTable = {
  layout: "table" as const,
  headers: ["Kişi veya görev", "Ayırıcı iş", "Kurum veya alan", "Statü", "Kol"],
  rows: people228.map((p) => [p.name, p.work, p.place, statusOf228(p), branchOf228(p) ?? "Kol yok (yönetilen)"]),
};
const askeri = people228.filter((p) => statusOf228(p) === "Askerî sınıf");
const reaya = people228.filter((p) => statusOf228(p) === "Reaya");
const byBranch = (b: Branch228) => people228.filter((p) => branchOf228(p) === b).map((p) => p.name);
const nonSword = askeri.filter((p) => branchOf228(p) !== "seyfiye");

guard(BRANCHES228.every((b) => byBranch(b).length > 0), "üç kolun her biri tabloda temsil edilir");
guard(askeri.every((p) => branchOf228(p) !== null) && reaya.every((p) => branchOf228(p) === null), "askerî sınıfın her üyesi bir kola girer; reayanın kolu yoktur");
guard(nonSword.length > 0 && nonSword.some((p) => p.name === "Kadı") && nonSword.some((p) => p.name === "Müderris"), "askerî sınıf yalnız savaşçı değildir: kadı ve müderris de içindedir");
guard(reaya.some((p) => p.place !== "Köy"), "reaya yalnız köylü değildir");

export const statusSection228: GuideSection = {
  title: "Askerî sınıf ve reaya: işten kola, koldan statüye",
  paragraphs: [
    `Tablo bir görevin statüsünü ayırıcı işinden kurar. Yönetim, komuta ve güvenlik seyfiye (${lcList(byBranch("seyfiye"))}); mali kayıt kalemiye (${lcList(byBranch("kalemiye"))}); yargı, fetva ve öğretim ilmiye (${lcList(byBranch("ilmiye"))}) koludur. Bu üç koldan birine giren herkes askerî sınıftadır: tabloda ${askeri.length} satır.`,
    `Askerî sınıf yönetenler statüsüdür; yalnız savaşçıyı anlatmaz. Tablodaki askerî sınıf üyelerinden ${nonSword.length} tanesi seyfiye dışındadır: ${lcList(nonSword.map((p) => p.name))}. Kadının veya müderrisin kılıçla savaşmaması onu askerî sınıfın dışına çıkarmaz.`,
    `Üretim ve vergiyle düzenin sürmesine katkı sağlayan yönetilenler reayadır: ${lcList(reaya.map((p) => p.name))}. Reaya yalnız köylüyle sınırlanmaz; çarşıdaki şehirli zanaatkâr da bu başlıktadır. Bu ayrım geçmiş toplumun hukuki ve idari sınıflamasıdır; bugünün meslek düzeniyle birebir aynı değildir.`,
  ],
  table: statusTable,
};

const personBy = (n: string) => people228.find((p) => p.name === n)!;
export const fiveNames228 = ["Kadı", "Müderris", "Beylerbeyi", "Şehirli zanaatkâr", "Defterdar"] as const;
export const five228 = fiveNames228.map(personBy);
export const fiveAskeri228 = five228.filter((p) => statusOf228(p) === "Askerî sınıf");
export const fiveNonSword228 = fiveAskeri228.filter((p) => branchOf228(p) !== "seyfiye");
guard(fiveAskeri228.length === 4 && fiveNonSword228.length === 3, "beş kişiden dördü askerî, bunların üçü seyfiye dışıdır");
export const counterReaya228 = reaya.filter((p) => p.place !== "Köy");
export const counterAskeri228 = askeri.filter((p) => branchOf228(p) === "ilmiye");
guard(counterReaya228.length === 1 && counterReaya228[0].place === "Çarşı", "köy dışındaki tek reaya satırı çarşıdaki zanaatkârdır");

export const statusExamples228: WorkedExample[] = [
  {
    title: "Beş kişiden kaçı askerî sınıfta, kaçı seyfiye dışında?",
    prompt: `Beş kişi veriliyor: ${list(five228.map((p) => `${p.name.toLocaleLowerCase("tr-TR")} (${lowerFirst(p.work)})`))}. Her biri ayırıcı işiyle tanımlanmıştır. Kaçı askerî sınıftadır? Askerî sınıftakilerden kaçı seyfiye dışındadır?`,
    strategy: "Önce her kişinin ayırıcı işini kola çevir. Bir kola giren askerî sınıftadır; üretim ve vergi işi reayayı gösterir.",
    steps: [
      ...five228.map((p) => ({ label: p.name, expression: `${p.act} → ${branchOf228(p) ?? "kol yok"}`, explanation: `${statusOf228(p)}.` })),
      { label: "Say", expression: `askerî ${fiveAskeri228.length}; seyfiye dışı ${fiveNonSword228.length}`, explanation: `Seyfiye dışındakiler: ${list(fiveNonSword228.map((p) => p.name))}.` },
    ],
    answer: `${fiveAskeri228.length} kişi askerî sınıftadır (${list(fiveAskeri228.map((p) => p.name))}); bunlardan ${fiveNonSword228.length} tanesi seyfiye dışındadır (${list(fiveNonSword228.map((p) => p.name))}). Şehirli zanaatkâr reayadır.`,
    check: `${fiveAskeri228.length} + ${five228.length - fiveAskeri228.length} = ${five228.length}. Seyfiyede yalnız beylerbeyi kalır.`,
    pitfall: "Askerî sözcüğünü bugünkü “asker” anlamıyla okuyup kadıyı, müderrisi veya defterdarı askerî sınıfın dışında saymak.",
  },
  {
    title: "İki aşırı genellemeye tablodan karşı örnek",
    prompt: "Bir öğrenci iki yargı yazıyor: (1) “Reaya yalnız köylülerdir.” (2) “Askerî sınıf yalnız savaşan kişilerdir.” Tablodaki satırları kullanarak her yargıya en az bir karşı örnek bul ve neden karşı örnek olduğunu göster.",
    strategy: "Bir genellemeyi çürütmek için tek uygun satır yeter. Statü ve kol sütunlarını yerle ve işle birlikte oku.",
    steps: [
      { label: "Birinci yargı", expression: `Reaya ve köy dışı: ${list(counterReaya228.map((p) => p.name))}`, explanation: `${counterReaya228[0].name} ${counterReaya228[0].place.toLocaleLowerCase("tr-TR")}da üretir ve vergi verir; statüsü reayadır.` },
      { label: "İkinci yargı", expression: `Askerî ve ilmiye: ${list(counterAskeri228.map((p) => p.name))}`, explanation: "Bu görevlilerin ayırıcı işi yargı, fetva veya öğretimdir; savaş komutası değildir." },
      { label: "Sınırı koru", explanation: "Karşı örnek yargıyı çürütür; ama köylünün reaya, beylerbeyinin askerî sınıf olduğu bilgisini değiştirmez." },
    ],
    answer: `(1) ${counterReaya228[0].name} reayadır ama köylü değildir. (2) ${list(counterAskeri228.map((p) => p.name))} askerî sınıftadır ama ayırıcı işleri savaş değildir.`,
    check: `Karşı örnek satırlarında statü sütunu sırasıyla “${statusOf228(counterReaya228[0])}” ve “${statusOf228(counterAskeri228[0])}”, kol sütunu “${statusTable.rows[people228.indexOf(counterReaya228[0])][4]}” ve “${branchOf228(counterAskeri228[0])}” yazıyor.`,
    pitfall: "Bir karşı örneği bütün sınıflamayı geçersiz kılan kanıt saymak ya da tek bir doğru örnekle genellemeyi kanıtlanmış sanmak.",
  },
];

export const statusSupplement228 = {
  title: statusSection228.title,
  figureTitle: statusSection228.title,
  paragraphs: statusSection228.paragraphs,
  summary: `Seyfiye: ${list(byBranch("seyfiye"))}. Kalemiye: ${list(byBranch("kalemiye"))}. İlmiye: ${list(byBranch("ilmiye"))}. Üç kol = askerî sınıf (yönetenler). Reaya: ${list(reaya.map((p) => p.name))}. Askerî ≠ savaşçı; reaya ≠ yalnız köylü.`,
  appendSection: true as const,
  table: statusTable,
  examples: statusExamples228,
};

/* =================================================================
 * 5 · Merkez teşkilatı: Divan çevresindeki görevliler
 * ================================================================= */

export interface Official228 { name: string; branch: Branch228; duty: string; clue: string }
export const officials228: readonly Official228[] = [
  { name: "Sadrazam", branch: "seyfiye", duty: "Padişahın vekili; Fatih’ten itibaren Divana başkanlık", clue: "Mühr-i hümayun, seferde en üst komuta" },
  { name: "Kubbealtı vezirleri", branch: "seyfiye", duty: "Yönetimde yardımcı", clue: "Yardımcı vezir" },
  { name: "Kaptan-ı derya", branch: "seyfiye", duty: "Donanmanın komutanı", clue: "Donanma" },
  { name: "Kazasker", branch: "ilmiye", duty: "Kadı ve müderris atamaları, adli işler", clue: "Kadı/müderris ataması" },
  { name: "Şeyhülislam", branch: "ilmiye", duty: "Dinî-hukuki konuda fetva", clue: "Fetva" },
  { name: "Defterdar", branch: "kalemiye", duty: "Gelir, gider ve hazine", clue: "Hazine geliri/gideri" },
  { name: "Nişancı", branch: "kalemiye", duty: "Padişahın tuğrasını çeker; tahrir ve arazi kayıtları", clue: "Tuğra, tahrir" },
  { name: "Reisülküttap", branch: "kalemiye", duty: "Divan kâtiplerinin başı; zamanla dış yazışma", clue: "Kâtipler, dış yazışma" },
];
/** Fiil ipucundan görevliye: dersin son kontrol eşleşmeleri ve seyfiye ipuçları. */
export const CLUE_TO_OFFICIAL228: Record<string, string> = {
  "mühr-i hümayun": "Sadrazam", donanma: "Kaptan-ı derya", "kadı ve müderris ataması": "Kazasker", fetva: "Şeyhülislam",
  "hazine gelir ve gideri": "Defterdar", tuğra: "Nişancı", "arazi tahriri": "Nişancı", "Divan kâtipleri": "Reisülküttap",
};
const officialBy = (n: string) => officials228.find((o) => o.name === n)!;
const officialTable = {
  layout: "table" as const,
  headers: ["Görevli", "Kol", "Ayırıcı görev", "Anahtar ipucu"],
  rows: officials228.map((o) => [o.name, o.branch, o.duty, o.clue]),
};
const offBranch = (b: Branch228) => officials228.filter((o) => o.branch === b).map((o) => o.name);
const branchOrder = officials228.map((o) => BRANCHES228.indexOf(o.branch));

guard(Object.values(CLUE_TO_OFFICIAL228).every((n) => officials228.some((o) => o.name === n)), "her ipucu tablodaki bir görevliye gider");
guard(new Set(Object.values(CLUE_TO_OFFICIAL228)).size === officials228.length - 1, "kubbealtı vezirleri dışındaki her görevlinin ayırıcı bir ipucu vardır");
guard(CLUE_TO_OFFICIAL228["tuğra"] === "Nişancı" && CLUE_TO_OFFICIAL228["hazine gelir ve gideri"] === "Defterdar" && officialBy("Nişancı").branch === officialBy("Defterdar").branch,
  "tuğra nişancıya, hazine defterdara gider; ikisi de kalemiyededir");
guard(officialBy("Kazasker").branch === "ilmiye" && officialBy("Şeyhülislam").branch === "ilmiye", "kazasker ve şeyhülislam aynı kolda, farklı görevdedir");
guard(BRANCHES228.every((b) => offBranch(b).length >= 2), "her kolda en az iki görevli vardır");
guard(BRANCHES228.every((b) => { const ix = branchOrder.flatMap((x, i) => (x === BRANCHES228.indexOf(b) ? [i] : [])); return ix[ix.length - 1] - ix[0] === ix.length - 1; }), "tablo satırları kola göre bloklar hâlindedir");

export const officialSection228: GuideSection = {
  title: "Divan çevresindeki görevliler: kol, görev ve anahtar ipucu",
  paragraphs: [
    `Divan-ı Hümayun siyasi, idari, askerî, mali ve önemli adli meselelerin görüşüldüğü kuruldur; bu yüzden üyeleri farklı kollardan gelir. Tabloda seyfiye ${offBranch("seyfiye").length} (${list(offBranch("seyfiye"))}), ilmiye ${offBranch("ilmiye").length} (${list(offBranch("ilmiye"))}), kalemiye ${offBranch("kalemiye").length} (${list(offBranch("kalemiye"))}) görevliyle temsil edilir. Üyelik ve katılım zamanla değişmiştir; tablo her toplantının değişmez üye listesi değildir.`,
    `Son sütundaki ipucu bir fiil veya nesnedir ve görevliyi yapılan işten seçer: tuğra → ${CLUE_TO_OFFICIAL228["tuğra"]}, hazine geliri ve gideri → ${CLUE_TO_OFFICIAL228["hazine gelir ve gideri"]}, kadı ve müderris ataması → ${CLUE_TO_OFFICIAL228["kadı ve müderris ataması"]}, fetva → ${CLUE_TO_OFFICIAL228["fetva"]}, mühr-i hümayun → ${CLUE_TO_OFFICIAL228["mühr-i hümayun"]}. Aynı koldaki iki görevli aynı işi yapmaz: ${officialBy("Kazasker").name} atama yürütür, ${officialBy("Şeyhülislam").name} fetva verir.`,
    `Belgeye tuğra çekmek nişancının işidir; sadrazamı ayırt eden ise mühr-i hümayun, padişah vekilliği ve seferde en üst komutanlıktır. Aynı padişahla ilişkili iki sembol iki farklı görevliyi gösterir. Divanın temelleri Orhan Bey dönemine götürülür; Fatih döneminde başkanlık sadrazama geçti.`,
  ],
  table: officialTable,
};

export const clueRecords228 = ["mühr-i hümayun", "donanma", "Divan kâtipleri", "tuğra"] as const;
export const clueAnswers228 = clueRecords228.map((c) => officialBy(CLUE_TO_OFFICIAL228[c]));
export const clueBranchCounts228 = BRANCHES228.map((b) => ({ branch: b, n: clueAnswers228.filter((o) => o.branch === b).length }));
const clueText: Record<(typeof clueRecords228)[number], string> = {
  "mühr-i hümayun": "mühr-i hümayunu taşıyan ve seferde en üst komutan olan",
  donanma: "donanmanın komutanı olan",
  "Divan kâtipleri": "Divan kâtiplerinin başı olan",
  tuğra: "belgeye padişah tuğrasını çeken",
};

/** Merkez teşkilatındaki değişimler: dersin verdiği dönemler, hükümdar sırasıyla. */
export const changes228 = [
  { label: "Başkanlığın sadrazama geçmesi", period: "mehmed2" as Period228, when: "Fatih dönemi" },
  { label: "Ekber ve erşed anlayışının güçlenmesi", period: "y17" as Period228, when: "XVII. yüzyıl" },
  { label: "Divanın temelleri", period: "orhan" as Period228, when: "Orhan Bey dönemi" },
  { label: "Padişah ve oğulları vurgusu", period: "murad1" as Period228, when: "I. Murat dönemi" },
] as const;
export const changesSorted228 = [...changes228].sort((a, b) => periodRank228(a.period) - periodRank228(b.period));
guard(changesSorted228.map((c) => c.period).join() === "orhan,murad1,mehmed2,y17", "değişimler Orhan Bey → I. Murat → Fatih → XVII. yüzyıl sırasındadır");

export const officialExamples228: WorkedExample[] = [
  {
    title: "Dört ipucu, dört görevli, iki kol",
    prompt: `Dört kayıt veriliyor: ${clueRecords228.map((c, i) => `(${i + 1}) ${clueText[c]} görevli`).join("; ")}. Her kayıt hangi görevliyi gösterir? Görevliler hangi kollara dağılır?`,
    strategy: "Görevlinin adını değil kayıttaki fiili veya nesneyi ipucu olarak kullan; sonra kolu tablodan oku.",
    steps: [
      ...clueRecords228.map((c, i) => ({ label: `Kayıt ${i + 1}`, expression: `${c} → ${clueAnswers228[i].name}`, explanation: `${clueAnswers228[i].name} — ${clueAnswers228[i].duty} (${clueAnswers228[i].branch}).` })),
      { label: "Kolları say", expression: clueBranchCounts228.map((c) => `${c.branch} ${c.n}`).join(", "), explanation: "Tuğra padişahla ilgili bir işarettir ama onu belgeye çekmek kalemiye işidir." },
    ],
    answer: `${clueAnswers228.map((o, i) => `(${i + 1}) ${o.name}`).join(", ")}. Kol dağılımı: ${clueBranchCounts228.filter((c) => c.n > 0).map((c) => `${c.branch} ${c.n}`).join(", ")}; bu kayıtlarda ilmiye görevlisi yoktur.`,
    check: `Kol sayılarının toplamı ${clueBranchCounts228.reduce((s, c) => s + c.n, 0)}; kayıt sayısı ${clueRecords228.length}.`,
    pitfall: "Padişahla ilgili her sembolü sadrazama vermek; tuğrayı belgeye çeken nişancıdır.",
  },
  {
    title: "Merkez teşkilatındaki dört değişimi dönem sırasına koy",
    prompt: `Tarih verilmeden dört kart veriliyor: ${changes228.map((c) => `“${c.label}” (${c.when})`).join("; ")}. Hükümdar sırası Orhan Bey → I. Murat → … → Fatih’tir ve XVII. yüzyıl hepsinden sonradır. Kartları eskiden yeniye sırala.`,
    strategy: "Yıl yoksa dönem adını hükümdar sırasına çevir; yüzyıl adı verilen kartı en sona koy.",
    steps: [
      { label: "Dönemleri sırala", expression: changesSorted228.map((c) => c.when).join(" → "), explanation: "Hükümdar sırası ve yüzyıl bilgisi kullanılır." },
      { label: "Kartları diz", expression: changesSorted228.map((c) => c.label).join(" → "), explanation: "Her kart kendi dönemiyle eşleşir." },
      { label: "Anakronizmi denetle", explanation: "Bu uygulamalar farklı dönemlere aittir; hepsini kuruluştan beri aynı biçimde işleyen tek kural gibi görmek anakronizmdir." },
    ],
    answer: changesSorted228.map((c) => `${c.label} (${c.when})`).join(" → ") + ".",
    check: `İlk kart ${changesSorted228[0].when}, son kart ${changesSorted228[changesSorted228.length - 1].when}; arada iki kart hükümdar sırasına uyuyor.`,
    pitfall: "Ekber ve erşed anlayışını kuruluştan beri süren kural sanmak ya da başkanlık değişimini Divanın kuruluşuyla aynı döneme koymak.",
  },
];

export const officialSupplement228 = {
  title: officialSection228.title,
  figureTitle: officialSection228.title,
  paragraphs: officialSection228.paragraphs,
  summary: `Seyfiye: ${list(offBranch("seyfiye"))}. İlmiye: ${list(offBranch("ilmiye"))}. Kalemiye: ${list(offBranch("kalemiye"))}. İpucu: tuğra → nişancı; hazine → defterdar; kadı/müderris ataması → kazasker; fetva → şeyhülislam; mühr-i hümayun → sadrazam.`,
  appendSection: true as const,
  table: officialTable,
  examples: officialExamples228,
};

/* ---------- Dışa aktarım ---------- */

export const depth228Supplements = {
  "osmanli-kurulus-siyaseti": [chronologySupplement228],
  "osmanli-askeri-teskilat": [forceSupplement228],
  "osmanli-medeniyeti": [statusSupplement228],
  "sultan-osmanli-merkez-teskilati": [officialSupplement228],
};
/** tarih-zaman zaten bir ek bölüm taşıdığı için o diziye sonradan eklenir. */
export const timeSupplement228 = centurySupplement228;
