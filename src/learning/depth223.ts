import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Kimya maddenin hâlleri derinleştirmesi (0.223.0). Kabul edilmiş
 * rehberler değişmez; her derse görüntüleme katmanında bir tablo bölümü, iki
 * özgün çözümlü örnek ve bir bölüm çizimi eklenir.
 *
 * - Gaz tablosu TYT orantılarıyla (PV, V/T, P/T, V/n, P/n sabit) kodda
 *   hesaplanır; Kelvin dönüşümü dersin izin verdiği 273 yaklaşımıyla yapılır.
 * - Buhar basıncı ve kaynama tablolarında suyun doygunluk basınçları dersin
 *   kendi MEBİ tablo değerleridir (25 °C 23,8; 50 °C 92,5; 70 °C 233,7;
 *   100 °C 760 mmHg). Sıvı kalır mı hesabı dersin atölye modelidir:
 *   P = nRT/V, R = 0,082057 L·atm/(mol·K), M(H₂O) = 18 g/mol,
 *   T(K) = t(°C) + 273,15, 760 mmHg = 1 atm.
 * - Katı türleri hareketli yük taşıyıcısıyla; fiziksel/kimyasal ayrım tür
 *   kimliği listesiyle sınıflandırılır; denklemlerde atom ve yük sayımı
 *   formülden ayrıştırılarak yapılır.
 * Ölçülmüş yeni sabit eklenmez. Paragraflar, tablolar, çizim okumaları ve
 * Kopya Kâğıdı özetleri aynı verilerden yazılır; metindeki genel yargılar
 * modül yüklenirken denetlenir.
 */

const guard = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depth223: veri bu yargıyı artık desteklemiyor: ${claim}`);
};
/** Türkçe sayı, gruplama yok: 24000 → "24000", 0.05 → "0,05", −3 → "−3". */
export const num223 = (x: number, digits = 3) => {
  const r = Number(x.toFixed(digits));
  return (Object.is(r, -0) ? 0 : r).toLocaleString("tr-TR", { maximumFractionDigits: digits, useGrouping: false }).replace("-", "−");
};
/** Sabit basamaklı yazım: 0.02304 → "0,0230". */
export const fix223 = (x: number, digits: number) => x.toFixed(digits).replace(".", ",");
const and = (xs: readonly string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} ve ${xs[xs.length - 1]}`);
/** Yalnız ilk sözcük tümüyle küçük harfle sürüyorsa küçültür: NaCl, CO₂ gibi formüller korunur. */
const lower = (s: string) => (/^[A-ZÇĞİIÖŞÜ][a-zçğıiöşü]+(?=[\s,.;:]|$)/.test(s) ? s.charAt(0).toLocaleLowerCase("tr-TR") + s.slice(1) : s);

/* =================================================================
 * 1 · gazlar-hal-degisim-plazma: sabit tutulanı seç, oranı hesapla
 * ================================================================= */

export type GasVar223 = "P" | "V" | "T" | "n";
export const GAS_VARS223: readonly GasVar223[] = ["P", "V", "T", "n"];
export const GAS_UNIT223: Record<GasVar223, string> = { P: "atm", V: "L", T: "K", n: "mol" };
/** Dersin 273 yaklaşımı: T(K) = t(°C) + 273. */
export const KELVIN_APPROX223 = 273;
export const kelvin223 = (celsius: number) => celsius + KELVIN_APPROX223;
/**
 * PV = nRT orantısından üs: bilinmeyen = önceki × (yeni/eski)^üs. P ve V
 * n·T ile doğru, birbiriyle ters orantılıdır.
 */
export const GAS_EXP223: Record<"P" | "V", Partial<Record<GasVar223, 1 | -1>>> = {
  P: { n: 1, T: 1, V: -1 },
  V: { n: 1, T: 1, P: -1 },
};
export interface GasCase223 {
  name: string;
  container: string;
  unknown: "P" | "V";
  start: number;
  changed: GasVar223;
  from: number;
  to: number;
  /** Sıcaklık değişiyorsa °C değerleri; tablo ve çizim Kelvin’e çevirir. */
  celsius?: readonly [number, number];
}
export const fixedOf223 = (c: Pick<GasCase223, "unknown" | "changed">) => GAS_VARS223.filter((x) => x !== c.unknown && x !== c.changed);
export const gasResult223 = (c: Pick<GasCase223, "unknown" | "changed" | "start" | "from" | "to">) => {
  const e = GAS_EXP223[c.unknown][c.changed];
  if (!e) throw new Error("depth223: bilinmeyen ile değişen aynı nicelik olamaz");
  return e === 1 ? (c.start * c.to) / c.from : (c.start * c.from) / c.to;
};
const near = (a: number, b: number) => Math.abs(a - b) < 1e-9;
const gc = (name: string, container: string, unknown: "P" | "V", start: number, changed: GasVar223, from: number, to: number, celsius?: readonly [number, number]): GasCase223 => ({
  name, container, unknown, start, changed, from: celsius ? kelvin223(celsius[0]) : from, to: celsius ? kelvin223(celsius[1]) : to, celsius,
});
export const GAS_CASES223: GasCase223[] = [
  gc("Rijit kap ısıtılır", "rijit", "P", 2, "T", 0, 0, [27, 177]),
  gc("Pistonlu kap ısıtılır", "piston", "V", 2, "T", 0, 0, [27, 327]),
  gc("Celsius tuzağı", "piston", "V", 2, "T", 0, 0, [27, 54]),
  gc("Sabit sıcaklıkta sıkıştırma", "piston", "P", 1, "V", 6, 2),
  gc("Rijit kaba gaz eklenir", "rijit", "P", 1.5, "n", 0.2, 0.3),
  gc("Pistonlu kaba gaz eklenir", "piston", "V", 10, "n", 0.5, 0.75),
];
const gasVal = (x: GasVar223, value: number) => `${x} = ${num223(value)} ${GAS_UNIT223[x]}`;
export const gasChangeText223 = (c: GasCase223) =>
  c.celsius
    ? `t: ${num223(c.celsius[0])} → ${num223(c.celsius[1])} °C (T: ${num223(c.from)} → ${num223(c.to)} K)`
    : `${c.changed}: ${num223(c.from)} → ${num223(c.to)} ${GAS_UNIT223[c.changed]}`;
export const gasLawText223 = (c: GasCase223) => {
  const e = GAS_EXP223[c.unknown][c.changed]!;
  return e === 1 ? `${c.unknown}/${c.changed} sabit` : `${c.unknown}·${c.changed} sabit`;
};
const gasTable = {
  layout: "table" as const,
  headers: ["Durum", "Sabit", "Önce", "Değişen", "Sonuç"],
  rows: GAS_CASES223.map((c) => [
    c.name,
    fixedOf223(c).join(", "),
    gasVal(c.unknown, c.start),
    gasChangeText223(c),
    `${gasVal(c.unknown, gasResult223(c))} (${gasLawText223(c)})`,
  ]),
};
const [rigidHeat, pistonHeat, celsiusTrap, boyle, rigidAdd, pistonAdd] = GAS_CASES223;
const ratio = (c: GasCase223) => gasResult223(c) / c.start;

guard(GAS_CASES223.every((c) => fixedOf223(c).length === 2), "her satırda iki nicelik sabit tutulur");
guard(GAS_CASES223.filter((c) => c.container === "rijit").every((c) => c.unknown === "P" && fixedOf223(c).includes("V")), "rijit kapta hacim sabittir, basınç değişir");
guard(GAS_CASES223.filter((c) => c.container === "piston" && c.changed !== "V").every((c) => c.unknown === "V" && fixedOf223(c).includes("P")), "serbest pistonlu kapta basınç sabit, hacim değişir");
guard(near(ratio(boyle), boyle.from / boyle.to) && ratio(boyle) > 1, "sabit n ve T’de hacim azalınca basınç aynı oranda artar");
guard(near(ratio(pistonHeat), pistonHeat.to / pistonHeat.from) && near(ratio(pistonHeat), 2), "Kelvin iki katına çıkınca hacim iki katına çıkar");
guard(celsiusTrap.celsius![1] === 2 * celsiusTrap.celsius![0] && ratio(celsiusTrap) < 1.1, "Celsius iki katı hacmi iki kat yapmaz");
guard(near(ratio(rigidAdd), rigidAdd.to / rigidAdd.from) && near(ratio(pistonAdd), pistonAdd.to / pistonAdd.from), "gaz eklemek n’yi değiştirir; P ya da V n ile doğru orantılıdır");
guard(near(ratio(rigidHeat), rigidHeat.to / rigidHeat.from), "rijit kapta P/T sabittir");

export const gasSection223: GuideSection = {
  title: "Sabit tutulanı seç, oranı hesapla: altı kap durumu",
  paragraphs: [
    `Her satırda dört nicelikten (${GAS_VARS223.join(", ")}) ikisi sabit, biri değişen, biri bilinmeyendir. Rijit kapta V sabittir; ısıtma ya da gaz ekleme basıncı değiştirir. Serbest pistonlu, dış basıncı sabit kapta P sabittir; aynı işlemler hacmi değiştirir. Önce kabı oku, sonra sabitleri yaz, en son orantıyı seç.`,
    `P ile V, n·T ile doğru orantılıdır; P ile V birbirine ters orantılıdır (n ve T sabitken PV sabit). Sıkıştırmada V ${num223(boyle.from)} L’den ${num223(boyle.to)} L’ye inince P ${num223(ratio(boyle))} katına çıkar. Rijit kaba gaz eklenip n ${num223(rigidAdd.from)} mol’den ${num223(rigidAdd.to)} mol’e çıkınca P de ${num223(ratio(rigidAdd))} katına çıkar.`,
    `Sıcaklık oranı Kelvin ile kurulur; burada dersin ${KELVIN_APPROX223} yaklaşımı kullanılır: T = t + ${KELVIN_APPROX223}. ${num223(celsiusTrap.celsius![0])} °C’den ${num223(celsiusTrap.celsius![1])} °C’ye Celsius değeri iki katına çıkar ama T yalnız ${num223(celsiusTrap.from)} K’den ${num223(celsiusTrap.to)} K’ye çıkar; hacim ${num223(celsiusTrap.start)} L’den ${num223(gasResult223(celsiusTrap))} L’ye büyür, iki katına değil. Hacmi iki katına çıkarmak için T’nin ${num223(pistonHeat.from)} K’den ${num223(pistonHeat.to)} K’ye (${num223(pistonHeat.celsius![1])} °C) çıkması gerekir. Bu hesaplar ideal gaz modeline dayanır; kaçak ya da tepkime varsa n sabit kalmaz.`,
  ],
  table: gasTable,
};

/** Örnek 1: önce piston serbest (P sabit) ısıtma, sonra piston kilitli (V sabit) ısıtma. */
export const twoStepHeat223 = {
  V1: 4, P1: 1, celsius: [27, 177, 402] as const,
};
const th = twoStepHeat223;
const thT = th.celsius.map(kelvin223);
export const twoStepV223 = gasResult223({ unknown: "V", changed: "T", start: th.V1, from: thT[0], to: thT[1] });
export const twoStepP223 = gasResult223({ unknown: "P", changed: "T", start: th.P1, from: thT[1], to: thT[2] });
guard(near(twoStepV223, 6) && near(twoStepP223, 1.5), "iki adımlı ısıtma tam değerler verir");

/** Örnek 2: piston serbestken gaz eklenir (P, T sabit), sonra sabit T’de sıkıştırılır. */
export const addCompress223 = { n1: 0.5, n2: 0.75, V1: 10, P: 1, V3: 5 };
const ac = addCompress223;
export const addCompressV223 = gasResult223({ unknown: "V", changed: "n", start: ac.V1, from: ac.n1, to: ac.n2 });
export const addCompressP223 = gasResult223({ unknown: "P", changed: "V", start: ac.P, from: addCompressV223, to: ac.V3 });
guard(near(addCompressV223, 15) && near(addCompressP223, 3), "ekleme ve sıkıştırma tam değerler verir");

export const gasExamples223: WorkedExample[] = [
  {
    title: "Önce piston serbest, sonra kilitli: iki adımlı ısıtma",
    prompt: `Serbest hareketli pistonlu bir silindirde ideal gaz ${num223(th.V1)} L hacim ve ${num223(th.P1)} atm basınçta, ${num223(th.celsius[0])} °C’dedir; dış basınç sabittir, gaz kaçmaz. Gaz ${num223(th.celsius[1])} °C’ye ısıtılıyor. Sonra piston bu konumda kilitleniyor ve gaz ${num223(th.celsius[2])} °C’ye ısıtılıyor. Birinci adım sonunda hacim, ikinci adım sonunda basınç nedir? T = t + ${KELVIN_APPROX223} al.`,
    strategy: "Her adımda kabın durumuna göre sabitleri yaz: serbest piston P’yi, kilitli piston V’yi sabit tutar. Sıcaklıkları önce Kelvin’e çevir.",
    steps: [
      { label: "Kelvin", expression: th.celsius.map((t, i) => `${num223(t)} + ${KELVIN_APPROX223} = ${num223(thT[i])} K`).join(" · "), explanation: "Oranlar mutlak sıcaklıkla kurulur." },
      { label: "1. adım: n, P sabit", expression: `V₂ = ${num223(th.V1)} · ${num223(thT[1])}/${num223(thT[0])} = ${num223(twoStepV223)} L`, explanation: `V/T sabittir; Kelvin sıcaklığı ${num223(thT[1] / thT[0])} katına çıktığı için hacim de ${num223(twoStepV223 / th.V1)} katına çıkar.` },
      { label: "2. adım: n, V sabit", expression: `P₃ = ${num223(th.P1)} · ${num223(thT[2])}/${num223(thT[1])} = ${num223(twoStepP223)} atm`, explanation: "Piston kilitlenince hacim değişemez; P/T sabittir." },
    ],
    answer: `Birinci adımdan sonra V = ${num223(twoStepV223)} L; ikinci adımdan sonra P = ${num223(twoStepP223)} atm.`,
    check: `Birleşik denetim: P·V/T önce ${num223(th.P1)}·${num223(th.V1)}/${num223(thT[0])}, sonda ${num223(twoStepP223)}·${num223(twoStepV223)}/${num223(thT[2])}; ikisi de ${num223((th.P1 * th.V1) / thT[0], 4)} atm·L/K.`,
    pitfall: `İkinci adımda da hacmin arttığını sanmak ya da Celsius sayılarını (${num223(th.celsius[1])} ve ${num223(th.celsius[2])}) doğrudan oranlamak.`,
  },
  {
    title: "Gaz ekle, sonra sıkıştır: n ve V sırayla değişir",
    prompt: `Serbest pistonlu bir kapta ${num223(ac.n1)} mol ideal gaz ${num223(ac.P)} atm sabit dış basınç altında ${num223(ac.V1)} L hacim kaplıyor. Sıcaklık sabitken kaba ${num223(ac.n2 - ac.n1)} mol daha aynı gaz ekleniyor. Sonra piston itilerek gaz aynı sıcaklıkta ${num223(ac.V3)} L’ye sıkıştırılıyor. Eklemeden sonraki hacim ve sıkıştırmadan sonraki basınç nedir?`,
    strategy: "Eklemede P ve T sabittir: V/n sabit. Sıkıştırmada n ve T sabittir: PV sabit. Her adımı kendi sabitleriyle ayrı çöz.",
    steps: [
      { label: "Yeni mol", expression: `n = ${num223(ac.n1)} + ${num223(ac.n2 - ac.n1)} = ${num223(ac.n2)} mol`, explanation: "Gaz eklemek n’yi değiştirir." },
      { label: "Ekleme: P, T sabit", expression: `V₂ = ${num223(ac.V1)} · ${num223(ac.n2)}/${num223(ac.n1)} = ${num223(addCompressV223)} L`, explanation: "Aynı basınç ve sıcaklıkta hacim mol sayısıyla doğru orantılıdır." },
      { label: "Sıkıştırma: n, T sabit", expression: `P₃ = ${num223(ac.P)} · ${num223(addCompressV223)}/${num223(ac.V3)} = ${num223(addCompressP223)} atm`, explanation: `PV sabittir; hacim ${num223(addCompressV223 / ac.V3)} kat küçülünce basınç ${num223(addCompressP223 / ac.P)} katına çıkar.` },
    ],
    answer: `Eklemeden sonra V = ${num223(addCompressV223)} L; sıkıştırmadan sonra P = ${num223(addCompressP223)} atm.`,
    check: `PV denetimi: ${num223(ac.P)} · ${num223(addCompressV223)} = ${num223(addCompressP223)} · ${num223(ac.V3)} = ${num223(ac.P * addCompressV223)} atm·L.`,
    pitfall: `Sıkıştırmayı ilk hacimle (${num223(ac.V1)} L) kurmak. Ekleme hacmi değiştirdiği için PV çarpımı ${num223(addCompressV223)} L ile kurulur.`,
  },
];

export const gasSupplement223 = {
  title: gasSection223.title,
  figureTitle: gasSection223.title,
  paragraphs: gasSection223.paragraphs,
  summary: `Önce kap: rijit → V sabit, serbest piston → P sabit. Sonra iki sabit, bir değişen, bir bilinmeyen. P ve V, n·T ile doğru; P·V sabit (n, T sabit). Oranlar Kelvin’le: ${num223(celsiusTrap.celsius![0])} → ${num223(celsiusTrap.celsius![1])} °C’de hacim ${num223(celsiusTrap.start)} → ${num223(gasResult223(celsiusTrap))} L olur, iki katına çıkmaz.`,
  appendSection: true as const,
  table: gasTable,
  examples: gasExamples223,
};

/* =================================================================
 * 2 · buharlasma-buhar-basinci: kapalı kapta sıvı kalır mı?
 * ================================================================= */

/** Suyun doygunluk buhar basınçları (mmHg), dersin MEBİ tablo değerleri. */
export const WATER_VP223: readonly (readonly [number, number])[] = [[25, 23.8], [50, 92.5], [70, 233.7], [100, 760]];
export const vp223 = (celsius: number) => {
  const row = WATER_VP223.find(([t]) => t === celsius);
  if (!row) throw new Error(`depth223: ${celsius} °C için tablo değeri yok`);
  return row[1];
};
/** Dersin atölye modeli: R = 0,082057 L·atm/(mol·K), M(H₂O) = 18 g/mol, T = t + 273,15, 1 atm = 760 mmHg. */
export const VAPOUR_MODEL223 = { R: 0.082057, M: 18, offset: 273.15, mmHgPerAtm: 760 } as const;
const VM = VAPOUR_MODEL223;
/** Doygunluğa yeten en büyük buhar kütlesi (g): m = P*·V·M/(R·T). */
export const saturatingMass223 = (celsius: number, litres: number) => ((vp223(celsius) / VM.mmHgPerAtm) * litres * VM.M) / (VM.R * (celsius + VM.offset));
/** Bütün su buharlaşırsa oluşacak basınç (mmHg): P = (m/M)·R·T/V. */
export const allVapourPressure223 = (celsius: number, litres: number, grams: number) => ((grams / VM.M) * VM.R * (celsius + VM.offset) / litres) * VM.mmHgPerAtm;
export interface VapourCase223 { label: string; celsius: number; litres: number; grams: number }
export interface VapourOutcome223 { mMax: number; liquidLeft: boolean; pressure: number; vapourGrams: number; liquidGrams: number }
export const vapourOutcome223 = (c: Pick<VapourCase223, "celsius" | "litres" | "grams">): VapourOutcome223 => {
  const mMax = saturatingMass223(c.celsius, c.litres);
  const liquidLeft = c.grams > mMax;
  return {
    mMax,
    liquidLeft,
    pressure: liquidLeft ? vp223(c.celsius) : allVapourPressure223(c.celsius, c.litres, c.grams),
    vapourGrams: liquidLeft ? mMax : c.grams,
    liquidGrams: liquidLeft ? c.grams - mMax : 0,
  };
};
export const VAPOUR_CASES223: VapourCase223[] = [
  { label: "A", celsius: 25, litres: 1, grams: 0.01 },
  { label: "B", celsius: 25, litres: 1, grams: 0.05 },
  { label: "C", celsius: 25, litres: 3, grams: 0.05 },
  { label: "D", celsius: 50, litres: 1, grams: 0.05 },
  { label: "E", celsius: 70, litres: 1, grams: 0.25 },
  { label: "F", celsius: 100, litres: 1, grams: 0.25 },
];
export const gram223 = (g: number) => `${fix223(g, 4)} g`;
export const mmHg223 = (p: number) => `${num223(p, 1)} mmHg`;
/** Hesaplanan basınç: tek ondalık sabit (55,98 → "56,0 mmHg"). */
export const calcMmHg223 = (p: number) => `${fix223(p, 1)} mmHg`;
const vapourTable = {
  layout: "table" as const,
  headers: ["Kap", "Sıcaklık · P*", "Doyurmaya yeten buhar", "Sonuç", "Son basınç"],
  rows: VAPOUR_CASES223.map((c) => {
    const o = vapourOutcome223(c);
    return [
      `${c.label}: ${num223(c.litres)} L, ${num223(c.grams)} g su`,
      `${num223(c.celsius)} °C · ${mmHg223(vp223(c.celsius))}`,
      `≈ ${gram223(o.mMax)}`,
      o.liquidLeft ? `Sıvı kalır (≈ ${gram223(o.liquidGrams)})` : "Bütün su buharlaşır",
      o.liquidLeft ? `${mmHg223(o.pressure)} = P*` : `≈ ${calcMmHg223(o.pressure)} < P*`,
    ];
  }),
};
const vc = (label: string) => VAPOUR_CASES223.find((c) => c.label === label)!;
const vo = (label: string) => vapourOutcome223(vc(label));
const remains = VAPOUR_CASES223.filter((c) => vapourOutcome223(c).liquidLeft);
const allGone = VAPOUR_CASES223.filter((c) => !vapourOutcome223(c).liquidLeft);

guard(remains.every((c) => vapourOutcome223(c).pressure === vp223(c.celsius)), "sıvı kalan her kapta son basınç P*’dır");
guard(allGone.every((c) => vapourOutcome223(c).pressure < vp223(c.celsius)), "bütün su buharlaşırsa basınç P*’ın altında kalır");
guard(Math.abs(vo("C").mMax / vo("B").mMax - vc("C").litres / vc("B").litres) < 1e-12, "aynı sıcaklıkta doyurmaya yeten buhar gaz boşluğuyla orantılıdır");
guard(vo("B").liquidLeft && !vo("C").liquidLeft && vc("B").grams === vc("C").grams, "aynı su büyük kapta tükenebilir");
guard(vo("B").liquidLeft && !vo("D").liquidLeft && vc("B").grams === vc("D").grams && vc("B").litres === vc("D").litres, "aynı su aynı kapta daha sıcakta tükenebilir");
guard(vo("A").mMax === vo("B").mMax && vo("A").pressure < vo("B").pressure, "az su doygunluğa yetmez");
guard(WATER_VP223.every(([t], i) => i === 0 || (vp223(t) > WATER_VP223[i - 1][1] && saturatingMass223(t, 1) > saturatingMass223(WATER_VP223[i - 1][0], 1))), "sıcaklık arttıkça P* ve doyurmaya yeten buhar artar");

export const vapourSection223: GuideSection = {
  title: "Kapalı kapta sıvı kalır mı? Doyurmaya yeten buharı hesapla",
  paragraphs: [
    `Havası alınmış kapalı bir kapta su buharlaşırken buhar basıncı P*’a ulaşana kadar yükselir. P*’a ulaşmak için gaz boşluğunda belirli bir buhar kütlesi gerekir: m = P*·V·M ÷ (R·T). Burada dersin atölye modeli kullanılır: R = ${num223(VM.R, 6)} L·atm/(mol·K), M = ${VM.M} g/mol, T = t + ${num223(VM.offset, 2)}, ${VM.mmHgPerAtm} mmHg = 1 atm; P* değerleri dersin MEBİ tablosundandır. Konulan su bu kütleden fazlaysa fazlası sıvı kalır ve basınç P* olur; azsa bütün su buharlaşır ve basınç P = nRT/V ile P*’ın altında kalır.`,
    `${vc("B").label} ile ${vc("A").label} aynı kap ve sıcaklıktadır; doyurmaya yeten buhar ikisinde de ≈ ${gram223(vo("A").mMax)}’dır. ${num223(vc("B").grams)} g suyun bir kısmı sıvı kalır, basınç ${mmHg223(vp223(vc("B").celsius))} olur; ${num223(vc("A").grams)} g suyun tamamı buharlaşır ve basınç ≈ ${calcMmHg223(vo("A").pressure)}’da kalır. Aynı ${num223(vc("B").grams)} g su ${num223(vc("C").litres)} L’lik kapta (${vc("C").label}) ya da ${num223(vc("D").celsius)} °C’de (${vc("D").label}) tükenir: doyurmaya yeten buhar gaz boşluğuyla orantılı büyür, sıcaklık arttıkça da artar.`,
    `P* yazmadan önce sorulacak soru budur: sonda sıvı ile buhar birlikte mi? Sıvı kalıyorsa basınç sıvının miktarına bağlı değildir. Tablo dersin varsayımlarına dayanır: kapta hava yok, sıvının hacmi gaz boşluğunun yanında ihmal edilir, buhar ideal gaz gibi davranır, sıcaklık sabittir ve denge kurulmuştur. Sonuçlar bu yüzden yaklaşıktır.`,
  ],
  table: vapourTable,
};

/** Örnek 1: 25 °C’de 0,050 g su için sıvının kaldığı en büyük gaz boşluğu. */
export const maxVolumeCase223 = { celsius: 25, grams: 0.05 };
export const maxVolume223 = (maxVolumeCase223.grams / VM.M) * VM.R * (maxVolumeCase223.celsius + VM.offset) / (vp223(maxVolumeCase223.celsius) / VM.mmHgPerAtm);
guard(saturatingMass223(maxVolumeCase223.celsius, maxVolume223) - maxVolumeCase223.grams < 1e-12 && maxVolume223 > vc("B").litres && maxVolume223 < vc("C").litres, "sınır hacim B ile C arasındadır");
/** Örnek 2: 1 L kapta 0,100 g su üç sıcaklıkta. */
export const heatedFlask223 = { litres: 1, grams: 0.1, temps: [25, 50, 70] as const };
export const heatedOutcomes223 = heatedFlask223.temps.map((t) => ({ celsius: t, ...vapourOutcome223({ celsius: t, litres: heatedFlask223.litres, grams: heatedFlask223.grams }) }));
guard(heatedOutcomes223.map((o) => o.liquidLeft).join() === "true,true,false", "0,100 g su 25 ve 50 °C’de kalır, 70 °C’de tükenir");

export const vapourExamples223: WorkedExample[] = [
  {
    title: "Sıvının kalması için gaz boşluğu en çok kaç litre?",
    prompt: `Havası alınmış, sıcaklığı ${num223(maxVolumeCase223.celsius)} °C’de sabit tutulan kapalı bir kaba ${num223(maxVolumeCase223.grams)} g saf su konuyor. Suyun bu sıcaklıktaki doygunluk basıncı P* = ${mmHg223(vp223(maxVolumeCase223.celsius))}. R = ${num223(VM.R, 6)} L·atm/(mol·K), M = ${VM.M} g/mol, T = t + ${num223(VM.offset, 2)}, ${VM.mmHgPerAtm} mmHg = 1 atm al; sıvının hacmini ihmal et, buharı ideal gaz say. Dengede sıvı suyun kalması için gaz boşluğunun hacmi en çok kaç litre olabilir?`,
    strategy: "Sınırda bütün su buharlaşmış ve basınç tam P*’a ulaşmıştır. P*·V = n·R·T eşitliğini V için çöz.",
    steps: [
      { label: "Mol", expression: `n = ${num223(maxVolumeCase223.grams)}/${VM.M} ≈ ${fix223(maxVolumeCase223.grams / VM.M, 6)} mol`, explanation: "Bütün suyun buhar olarak mol sayısı." },
      { label: "P* atm cinsinden", expression: `${num223(vp223(maxVolumeCase223.celsius))}/${VM.mmHgPerAtm} ≈ ${fix223(vp223(maxVolumeCase223.celsius) / VM.mmHgPerAtm, 5)} atm`, explanation: "R atm ile verildiği için basınç atm’ye çevrilir." },
      { label: "Sınır hacim", expression: `V = nRT/P* ≈ ${num223(maxVolume223, 2)} L`, explanation: `T = ${num223(maxVolumeCase223.celsius + VM.offset, 2)} K. Bu hacimde bütün su tam doygunluğa yeter.` },
      { label: "Yön", expression: `V < ${num223(maxVolume223, 2)} L ⇒ sıvı kalır`, explanation: "Daha küçük boşluk daha az buharla doyar; fazla su sıvı kalır." },
    ],
    answer: `Yaklaşık ${num223(maxVolume223, 2)} L. Daha küçük bir gaz boşluğunda sıvı kalır ve basınç ${mmHg223(vp223(maxVolumeCase223.celsius))} olur; daha büyüğünde bütün su buharlaşır.`,
    check: `${num223(maxVolume223, 2)} L için doyurmaya yeten buhar ≈ ${gram223(saturatingMass223(maxVolumeCase223.celsius, maxVolume223))}, yani konulan su kadardır. Tablodaki ${num223(vc("B").litres)} L (sıvı kalır) ve ${num223(vc("C").litres)} L (tükenir) satırları da bu sınırın iki yanındadır.`,
    pitfall: "Yönü ters kurmak: büyük kap daha çok buhar ister; sıvının kalması için kap küçük olmalıdır.",
  },
  {
    title: "Isıtılan kapalı kapta sıvı hangi sıcaklıkta tükenir?",
    prompt: `Havası alınmış ${num223(heatedFlask223.litres)} L’lik kapalı bir kapta ${num223(heatedFlask223.grams)} g saf su var. Kap sırayla ${and(heatedFlask223.temps.map((t) => `${num223(t)} °C`))}’de sabit tutulup her birinde dengeye getiriliyor. Doygunluk basınçları: ${heatedFlask223.temps.map((t) => `${num223(t)} °C’de ${mmHg223(vp223(t))}`).join(", ")}. R = ${num223(VM.R, 6)} L·atm/(mol·K), M = ${VM.M} g/mol, T = t + ${num223(VM.offset, 2)} al; sıvı hacmini ihmal et. Her sıcaklıkta sıvı kalır mı ve basınç nedir?`,
    strategy: "Her sıcaklıkta doyurmaya yeten buharı hesapla ve konulan suyla karşılaştır. Sıvı kalıyorsa basınç P*; kalmıyorsa P = nRT/V.",
    steps: heatedOutcomes223.map((o) => ({
      label: `${num223(o.celsius)} °C`,
      expression: `m(doygun) ≈ ${gram223(o.mMax)} ${o.liquidLeft ? "<" : ">"} ${num223(heatedFlask223.grams)} g`,
      explanation: o.liquidLeft ? `Sıvı kalır; P = P* = ${mmHg223(o.pressure)}.` : `Bütün su buharlaşır; P = nRT/V ≈ ${calcMmHg223(o.pressure)}, P*’ın (${mmHg223(vp223(o.celsius))}) altında.`,
    })),
    answer: `${and(heatedOutcomes223.filter((o) => o.liquidLeft).map((o) => `${num223(o.celsius)} °C`))}’de sıvı kalır, basınç P* olur (${heatedOutcomes223.filter((o) => o.liquidLeft).map((o) => mmHg223(o.pressure)).join(" ve ")}). ${heatedOutcomes223.filter((o) => !o.liquidLeft).map((o) => `${num223(o.celsius)} °C’de su tükenir, basınç ≈ ${calcMmHg223(o.pressure)}`).join("")}.`,
    check: `Son durumda basınç ${mmHg223(vp223(70))} olsaydı gazda ≈ ${gram223(saturatingMass223(70, heatedFlask223.litres))} buhar gerekirdi; kapta yalnız ${num223(heatedFlask223.grams)} g su var.`,
    pitfall: "Sıcaklık arttı diye basıncı her zaman tablodan okumak. Tablo değeri yalnız sıvı ile buhar birlikteyken geçerlidir.",
  },
];

export const vapourSupplement223 = {
  title: vapourSection223.title,
  figureTitle: vapourSection223.title,
  paragraphs: vapourSection223.paragraphs,
  summary: `Doyurmaya yeten buhar m = P*·V·M ÷ (R·T). Su bundan fazlaysa sıvı kalır, basınç P*; azsa hepsi buharlaşır, basınç P*’ın altında. 25 °C, 1 L: ≈ ${gram223(vo("B").mMax)}. Büyük kap ya da yüksek sıcaklık daha çok buhar ister. Sıvı yoksa P* yazma.`,
  appendSection: true as const,
  table: vapourTable,
  examples: vapourExamples223,
};

/* =================================================================
 * 3 · kaynama-bagil-nem: kaynama sıcaklığını ne değiştirir?
 * ================================================================= */

export type Shift223 = -1 | 0 | 1;
/** Kaynama koşulu P*(Tk) = Pdış: eğri yükselirse eşiğe daha düşük sıcaklıkta, eşik yükselirse daha yüksek sıcaklıkta varılır. */
export const boilShift223 = (curve: Shift223, threshold: Shift223): Shift223 => {
  if (curve !== 0 && threshold !== 0) throw new Error("depth223: bir satırda tek etken değişir");
  return (threshold - curve) as Shift223;
};
/** Dersin tablosundan: saf su Pdış = P* olan sıcaklıkta kaynar. */
export const boilingTemp223 = (pressure: number) => {
  const row = WATER_VP223.find(([, p]) => p === pressure);
  if (!row) throw new Error(`depth223: ${pressure} mmHg tablo noktası değil`);
  return row[0];
};
/** Dersin kayıpsız modeli: buharlaşma enerjisi 24000 J, süre t = Q/P. */
export const BOIL_ENERGY223 = 24000;
export interface BoilFactor223 {
  short: string;
  curve: Shift223;
  threshold: Shift223;
  pressures?: readonly [number, number];
  power?: readonly [number, number];
  massFactor?: number;
}
export const BOIL_FACTORS223: BoilFactor223[] = [
  { short: "Dış basınç düşer", curve: 0, threshold: -1, pressures: [760, 233.7] },
  { short: "Dış basınç artar", curve: 0, threshold: 1, pressures: [92.5, 233.7] },
  { short: "Isıtıcı gücü artar", curve: 0, threshold: 0, power: [200, 300] },
  { short: "Su kütlesi artar", curve: 0, threshold: 0, power: [200, 200], massFactor: 2 },
  { short: "Uçucu olmayan çözünen eklenir", curve: -1, threshold: 0 },
  { short: "Aynı Pdış’ta daha uçucu saf sıvı", curve: 1, threshold: 0 },
];
/** Satır adı veriden: basınç ve güç değerleri yazılır. */
export const boilChangeText223 = (f: BoilFactor223) => {
  if (f.pressures) return `${f.short} (saf su): ${num223(f.pressures[0])} → ${num223(f.pressures[1])} mmHg`;
  if (f.massFactor) return `${f.short}: ${num223(f.massFactor)} katı (güç ${num223(f.power![0])} W)`;
  if (f.power) return `${f.short}: ${num223(f.power[0])} → ${num223(f.power[1])} W`;
  return f.short;
};
const shiftWord = (s: Shift223, up: string, down: string) => (s > 0 ? up : s < 0 ? down : "Değişmez");
export const boilTimes223 = (f: BoilFactor223) => {
  if (!f.power) return null;
  const q0 = BOIL_ENERGY223;
  const q1 = BOIL_ENERGY223 * (f.massFactor ?? 1);
  return { q0, q1, t0: q0 / f.power[0], t1: q1 / f.power[1] };
};
export const boilNote223 = (f: BoilFactor223) => {
  if (f.pressures) return `Tk: ${num223(boilingTemp223(f.pressures[0]))} → ${num223(boilingTemp223(f.pressures[1]))} °C (MEBİ noktaları)`;
  const t = boilTimes223(f);
  if (t) return `Q = ${num223(t.q0)}${t.q1 !== t.q0 ? ` → ${num223(t.q1)}` : ""} J; süre ${num223(t.t0)} → ${num223(t.t1)} s`;
  return "Yön; nicel değer verilmedi";
};
const boilTable = {
  layout: "table" as const,
  headers: ["Değişiklik", "P*(T) eğrisi", "Erişilecek Pdış", "Kaynama sıcaklığı", "Veri"],
  rows: BOIL_FACTORS223.map((f) => [
    boilChangeText223(f),
    shiftWord(f.curve, "Yükselir", "Düşer"),
    shiftWord(f.threshold, "Yükselir", "Düşer"),
    shiftWord(boilShift223(f.curve, f.threshold), "Yükselir", "Düşer"),
    boilNote223(f),
  ]),
};
const [lowP, highP, powerUp, massUp, solute, volatile] = BOIL_FACTORS223;
const sameTk = BOIL_FACTORS223.filter((f) => boilShift223(f.curve, f.threshold) === 0);

guard(BOIL_FACTORS223.every((f) => !f.pressures || Math.sign(boilingTemp223(f.pressures[1]) - boilingTemp223(f.pressures[0])) === boilShift223(f.curve, f.threshold)), "tablo noktaları kural yönüyle uyumludur");
guard(sameTk.length === 2 && sameTk.every((f) => f.power), "güç ve kütle kaynama sıcaklığını değiştirmez, süreyi değiştirir");
guard(boilTimes223(powerUp)!.t1 < boilTimes223(powerUp)!.t0 && boilTimes223(massUp)!.t1 === 2 * boilTimes223(massUp)!.t0, "güç artınca süre kısalır, kütle iki kat olunca süre iki kat olur");
guard(boilShift223(solute.curve, solute.threshold) === 1 && boilShift223(volatile.curve, volatile.threshold) === -1, "çözünen kaynamayı yükseltir, daha uçucu sıvı düşürür");
guard(boilingTemp223(lowP.pressures![0]) === 100 && lowP.pressures![0] === 760, "suyun normal kaynama sıcaklığı 760 mmHg’ye aittir");

export const boilSection223: GuideSection = {
  title: "Kaynama sıcaklığını ne değiştirir? Eğri, eşik ve süre",
  paragraphs: [
    `Kaynama koşulu P*(Tk) = Pdış’tır. Bir değişiklik ya P*(T) eğrisini kaydırır ya da erişilmesi gereken Pdış eşiğini değiştirir. Eşik yükselirse daha yüksek sıcaklıkta, eğri yükselirse daha düşük sıcaklıkta eşiğe varılır. Tabloda her satırda yalnız bir etken değişir.`,
    `Dersin MEBİ noktalarıyla: saf su ${num223(lowP.pressures![0])} mmHg’de ${num223(boilingTemp223(lowP.pressures![0]))} °C’de, ${num223(lowP.pressures![1])} mmHg’de ${num223(boilingTemp223(lowP.pressures![1]))} °C’de, ${num223(highP.pressures![0])} mmHg’de ${num223(boilingTemp223(highP.pressures![0]))} °C’de kaynar. Uçucu olmayan çözünen (ideal seyreltik) aynı sıcaklıktaki P*’ı düşürür, kaynamaya başlama sıcaklığı yükselir. Aynı Pdış’ta daha uçucu bir sıvı eşiğe daha düşük sıcaklıkta varır.`,
    `Isıtıcı gücü ve sıvı kütlesi ne eğriyi ne eşiği değiştirir; kaynama sıcaklığı aynı kalır, süre değişir. Kayıpsız modelde t = Q/P: ${num223(BOIL_ENERGY223)} J ${num223(powerUp.power![0])} W ile ${num223(boilTimes223(powerUp)!.t0)} s, ${num223(powerUp.power![1])} W ile ${num223(boilTimes223(powerUp)!.t1)} s sürer. Kütle iki katına çıkınca Q = mL de iki katına çıkar ve aynı güçte süre ${num223(boilTimes223(massUp)!.t1)} s olur. Çözünen ve uçuculuk satırlarında yalnız yön verilir; nicel değer üretilmez.`,
  ],
  table: boilTable,
};

/** Örnek 1: Pdış = 233,7 mmHg’de 50 °C’deki su; sonra basınç 92,5 mmHg. */
export const boilCheck223 = { pressure: 233.7, lowered: 92.5, waterAt: 50 };
const bc = boilCheck223;
export const boilsAt223 = (celsius: number, pressure: number) => vp223(celsius) >= pressure;
guard(!boilsAt223(bc.waterAt, bc.pressure) && boilsAt223(bc.waterAt, bc.lowered) && boilingTemp223(bc.pressure) === 70, "50 °C’deki su 233,7 mmHg’de kaynamaz, 92,5 mmHg’de kaynar");

export interface BoilClaim223 { label: string; text: string; factor: BoilFactor223 }
export const BOIL_CLAIMS223: BoilClaim223[] = [
  { label: "I", text: "Saf suya uçucu olmayan şeker eklenir (ideal seyreltik çözelti).", factor: solute },
  { label: "II", text: "Isıtıcının gücü artırılır.", factor: powerUp },
  { label: "III", text: "Kapalı düzenekte suyun üzerindeki dış basınç artırılır.", factor: highP },
  { label: "IV", text: "Aynı dış basınçta sudan daha uçucu bir saf sıvıya geçilir.", factor: volatile },
  { label: "V", text: "Kaptaki su kütlesi artırılır.", factor: massUp },
];
const claimShift = (c: BoilClaim223) => boilShift223(c.factor.curve, c.factor.threshold);
export const raising223 = BOIL_CLAIMS223.filter((c) => claimShift(c) === 1).map((c) => c.label);
export const lowering223 = BOIL_CLAIMS223.filter((c) => claimShift(c) === -1).map((c) => c.label);
export const unchanged223 = BOIL_CLAIMS223.filter((c) => claimShift(c) === 0).map((c) => c.label);
guard(raising223.join() === "I,III" && lowering223.join() === "IV", "yalnız I ve III kaynama sıcaklığını yükseltir");

export const boilExamples223: WorkedExample[] = [
  {
    title: "Bu basınçta 50 °C’deki su kaynar mı?",
    prompt: `Saf su için doygunluk basınçları: ${WATER_VP223.map(([t, p]) => `${num223(t)} °C’de ${mmHg223(p)}`).join(", ")}. Kapalı bir düzenekte suyun üzerindeki dış basınç ${mmHg223(bc.pressure)} tutuluyor. Sıcaklığı ${num223(bc.waterAt)} °C olan su kaynar mı? Bu basınçta su kaç °C’de kaynar? Dış basınç ${mmHg223(bc.lowered)}’ye indirilirse ${num223(bc.waterAt)} °C’deki su için ne değişir?`,
    strategy: "Kaynama koşulu P*(T) = Pdış. Önce suyun o sıcaklıktaki P* değerini tablodan oku, sonra dış basınçla karşılaştır.",
    steps: [
      { label: `${num223(bc.waterAt)} °C’de P*`, expression: `${mmHg223(vp223(bc.waterAt))} < ${mmHg223(bc.pressure)}`, explanation: "Buhar basıncı eşiğe ulaşmamıştır; içten kabarcık büyümez." },
      { label: "Kaynama sıcaklığı", expression: `P*(Tk) = ${mmHg223(bc.pressure)} ⇒ Tk = ${num223(boilingTemp223(bc.pressure))} °C`, explanation: "Tablo noktası doğrudan eşleşir." },
      { label: "Basınç düşünce", expression: `P*(${num223(bc.waterAt)} °C) = ${mmHg223(vp223(bc.waterAt))} = Pdış`, explanation: `Yeni eşikte ${num223(bc.waterAt)} °C’deki su kaynar.` },
    ],
    answer: `${mmHg223(bc.pressure)}’de ${num223(bc.waterAt)} °C’deki su kaynamaz; bu basınçta ${num223(boilingTemp223(bc.pressure))} °C’de kaynar. Basınç ${mmHg223(bc.lowered)}’ye inince ${num223(bc.waterAt)} °C’de kaynar.`,
    check: "Dış basınç düşünce kaynama sıcaklığı da düşmüştür; bu, tablodaki “dış basınç düşer” satırının yönüdür.",
    pitfall: `Kaynama sıcaklığını her basınçta 100 °C saymak. 100 °C yalnız ${mmHg223(760)} (1 atm) dış basınca aittir.`,
  },
  {
    title: "Hangi değişiklikler kaynama sıcaklığını yükseltir?",
    prompt: `Başlangıçta saf su belirli bir dış basınç altında ısıtılıyor. Her değişiklik tek başına yapılıyor: ${BOIL_CLAIMS223.map((c) => `${c.label}) ${c.text}`).join(" ")} Hangileri kaynama sıcaklığını yükseltir, hangisi düşürür, hangileri değiştirmez?`,
    strategy: "Her değişiklik için iki soru sor: P*(T) eğrisi kayıyor mu, Pdış eşiği değişiyor mu? Eşik yükselirse ya da eğri düşerse kaynama sıcaklığı yükselir.",
    steps: BOIL_CLAIMS223.map((c) => ({
      label: c.label,
      expression: `eğri ${lower(shiftWord(c.factor.curve, "yükselir", "düşer"))}, eşik ${lower(shiftWord(c.factor.threshold, "yükselir", "düşer"))} ⇒ Tk ${lower(shiftWord(claimShift(c), "yükselir", "düşer"))}`,
      explanation: c.factor.power ? "Yalnız kaynamaya ulaşma ve dönüşüm süresi değişir." : c.factor.curve !== 0 ? "Aynı sıcaklıktaki buhar basıncı değişir." : "Erişilmesi gereken basınç değişir.",
    })),
    answer: `Yükseltenler: ${and(raising223)}. Düşüren: ${and(lowering223)}. Değiştirmeyenler: ${and(unchanged223)}.`,
    check: `${and(unchanged223)}’de eğri de eşik de aynıdır; tablodaki süreler (${num223(boilTimes223(powerUp)!.t0)} → ${num223(boilTimes223(powerUp)!.t1)} s ve ${num223(boilTimes223(massUp)!.t0)} → ${num223(boilTimes223(massUp)!.t1)} s) değişir, sıcaklık değişmez.`,
    pitfall: "Daha güçlü ısıtıcının ya da daha çok suyun kaynama sıcaklığını değiştirdiğini sanmak. Bunlar süreyi değiştirir.",
  },
];

export const boilSupplement223 = {
  title: boilSection223.title,
  figureTitle: boilSection223.title,
  paragraphs: boilSection223.paragraphs,
  summary: `P*(Tk) = Pdış. Eşik yükselirse Tk yükselir; eğri yükselirse (daha uçucu sıvı) Tk düşer; uçucu olmayan çözünen eğriyi düşürür, Tk yükselir. Su: ${WATER_VP223.slice().reverse().slice(0, 3).map(([t, p]) => `${num223(p)} mmHg → ${num223(t)} °C`).join(", ")}. Güç ve kütle Tk’yi değil, süreyi değiştirir (t = Q/P).`,
  appendSection: true as const,
  table: boilTable,
  examples: boilExamples223,
};

/* =================================================================
 * 4 · katilar-viskozite: katı türü, yapıtaşı ve yük taşıyıcısı
 * ================================================================= */

export type SolidKind223 = "iyonik" | "moleküler" | "kovalent ağ" | "kovalent ağ (tabakalı)" | "metalik";
export interface SolidRow223 {
  kind: SolidKind223;
  name: string;
  unit: string;
  holding: string;
  /** Katıda hareketli yük taşıyıcıları; boşsa yok. */
  solidCarriers: string[];
  /** Eriyikte hareketli yük taşıyıcıları; null: bu derste ele alınmadı. */
  meltCarriers: string[] | null;
  example: string;
  /** Molekül içinde kovalent bağ var mı? */
  covalentInside: boolean;
  metal: boolean;
}
export const SOLIDS223: SolidRow223[] = [
  { kind: "iyonik", name: "İyonik", unit: "Zıt yüklü iyonlar", holding: "İyonlar arası elektrostatik çekim (örgü)", solidCarriers: [], meltCarriers: ["iyonlar"], example: "NaCl", covalentInside: false, metal: false },
  { kind: "moleküler", name: "Moleküler", unit: "Ayrı moleküller", holding: "Moleküller arası etkileşim; molekül içinde kovalent bağ", solidCarriers: [], meltCarriers: [], example: "Buz, kuru buz, iyot", covalentInside: true, metal: false },
  { kind: "kovalent ağ", name: "Kovalent ağ", unit: "Atomlar", holding: "Üç boyutlu kovalent bağ ağı", solidCarriers: [], meltCarriers: null, example: "Elmas, kuartz", covalentInside: true, metal: false },
  { kind: "kovalent ağ (tabakalı)", name: "Tabakalı kovalent ağ", unit: "C atomları, tabakalar", holding: "Tabaka içinde kovalent bağ; tabakalar kayabilir", solidCarriers: ["tabaka boyunca hareketli elektronlar"], meltCarriers: null, example: "Grafit", covalentInside: true, metal: false },
  { kind: "metalik", name: "Metalik", unit: "Metal merkezleri ve yayılmış değerlik elektronları", holding: "Metalik bağlanma", solidCarriers: ["yayılmış elektronlar"], meltCarriers: ["yayılmış elektronlar"], example: "Bakır, demir, gümüş", covalentInside: false, metal: true },
];
export const carrierText223 = (cs: string[] | null) => (cs === null ? "bu derste ele alınmadı" : cs.length ? cs.join(", ") : "yok (iletim çok düşük)");
const solidTable = {
  layout: "table" as const,
  headers: ["Katı türü", "Yapıtaşı", "Bir arada tutan", "Hareketli yük taşıyıcı (katı / eriyik)", "Örnek"],
  rows: SOLIDS223.map((s) => [s.name, s.unit, s.holding, `Katı: ${carrierText223(s.solidCarriers)} / Eriyik: ${carrierText223(s.meltCarriers)}`, s.example]),
};
export const solidOf223 = (kind: SolidKind223) => SOLIDS223.find((s) => s.kind === kind)!;
const ionic = solidOf223("iyonik");
const molecular = solidOf223("moleküler");
const graphite = solidOf223("kovalent ağ (tabakalı)");
const metallic = solidOf223("metalik");
const solidConductors = SOLIDS223.filter((s) => s.solidCarriers.length > 0);

guard(solidConductors.some((s) => !s.metal), "katıda iletmek tek başına metal kanıtı değildir");
guard(ionic.solidCarriers.length === 0 && (ionic.meltCarriers?.length ?? 0) > 0, "iyonik katı katıyken iletmez, eriyikte iyonlarla iletir");
guard(molecular.covalentInside && molecular.kind !== "kovalent ağ", "molekül içinde kovalent bağ olması katıyı kovalent ağ yapmaz");
guard(metallic.solidCarriers.length > 0 && metallic.metal, "metalde yük taşıyan yayılmış elektronlardır");
guard(graphite.solidCarriers.length > 0 && graphite.kind.startsWith("kovalent ağ"), "grafit iletken bir kovalent ağdır");

export const solidSection223: GuideSection = {
  title: "Katı türünü yapıtaşı ve yük taşıyıcısıyla tablola",
  paragraphs: [
    `Katı türü dış görünüşten değil, yapıtaşından ve onları bir arada tutan etkileşimden belirlenir. Tabloda ${SOLIDS223.length} satır var: ${and(SOLIDS223.map((s) => lower(s.name)))}. Her satırda önce yapıtaşı, sonra baskın tutunma, en son hareketli yük taşıyıcısı yazılır.`,
    `Elektrik iletimi hareketli yük taşıyıcısı ister. ${ionic.name} katıda iyonlar yerlerine bağlı olduğundan iletim çok düşüktür; eriyikte ${ionic.meltCarriers!.join(", ")} yük taşır. Metalde ${metallic.solidCarriers.join(", ")} katıda da eriyikte de hareketlidir. ${graphite.example} metal değildir ama ${graphite.solidCarriers.join(", ")} sayesinde katıyken iletir: katıda iletim tek başına metal kanıtı değildir.`,
    `${molecular.example} kristallerinde molekül içinde kovalent bağ vardır; kristali bir arada tutan ise moleküller arası etkileşimdir. Bu yüzden moleküler katı, kovalent ağ sınıfına girmez. Kovalent ağ satırlarında eriyik iletimi bu derste ele alınmadığı için tabloda tahmin yazılmaz.`,
  ],
  table: solidTable,
};

export interface UnknownSolid223 { label: string; description: string; kind: SolidKind223 }
export const UNKNOWN_SOLIDS223: UnknownSolid223[] = [
  { label: "W", description: "zıt yüklü iyonlar üç boyutlu bir örgüde düzenli dizilmiştir", kind: "iyonik" },
  { label: "X", description: "metal merkezleri arasında değerlik elektronları yayılmıştır", kind: "metalik" },
  { label: "Y", description: "ayrı moleküller vardır; her molekülde atomlar kovalent bağlıdır, moleküller birbirine zayıf etkileşimle tutunur", kind: "moleküler" },
  { label: "Z", description: "her atom komşularına kovalent bağla bağlıdır, ayrı molekül yoktur ve ağ üç boyutta sürer", kind: "kovalent ağ" },
];
export const solidConductors223 = UNKNOWN_SOLIDS223.filter((u) => solidOf223(u.kind).solidCarriers.length > 0).map((u) => u.label);
export const meltIonConductors223 = UNKNOWN_SOLIDS223.filter((u) => solidOf223(u.kind).meltCarriers?.includes("iyonlar")).map((u) => u.label);
guard(solidConductors223.join() === "X" && meltIonConductors223.join() === "W", "katıda yalnız X, eriyikte iyonla yalnız W iletir");

export interface SolidClaim223 { label: string; text: string; holds: boolean; counter?: SolidRow223 }
const solidClaim = (label: string, text: string, ok: (s: SolidRow223) => boolean, scope: (s: SolidRow223) => boolean): SolidClaim223 => {
  const counter = SOLIDS223.filter(scope).find((s) => !ok(s));
  return { label, text, holds: !counter, counter };
};
export const SOLID_CLAIMS223: SolidClaim223[] = [
  solidClaim("I", "Katı hâlde elektrik ileten her madde metaldir.", (s) => s.metal, (s) => s.solidCarriers.length > 0),
  solidClaim("II", "İçinde kovalent bağ bulunan her katı kovalent ağ katısıdır.", (s) => s.kind.startsWith("kovalent ağ"), (s) => s.covalentInside),
  solidClaim("III", "Katı hâlde iletmeyen her madde erimiş hâlde de iletmez.", (s) => s.meltCarriers === null || s.meltCarriers.length === 0, (s) => s.solidCarriers.length === 0),
  solidClaim("IV", "Metalik katıda yükü yayılmış elektronlar taşır.", (s) => s.solidCarriers.includes("yayılmış elektronlar"), (s) => s.metal),
];
const trueSolidClaims = SOLID_CLAIMS223.filter((c) => c.holds);
guard(trueSolidClaims.length === 1 && trueSolidClaims[0].label === "IV", "dört önermeden yalnız IV doğrudur");

export const solidExamples223: WorkedExample[] = [
  {
    title: "Yapı tarifinden katı türünü ve iletimini çıkar",
    prompt: `Dört katının yalnız yapı bilgisi veriliyor. ${UNKNOWN_SOLIDS223.map((u) => `${u.label}: ${u.description}.`).join(" ")} Her birinin katı türü nedir? Hangileri katı hâlde elektrik iletir? Hangisi erimiş hâlde iyonlarla iletir?`,
    strategy: "Önce yapıtaşını adlandır (iyon, metal merkezi ve elektron, molekül, atom ağı). Sonra o fazda hareket edebilen yüklü tanecik var mı diye sor.",
    steps: UNKNOWN_SOLIDS223.map((u) => {
      const s = solidOf223(u.kind);
      return { label: u.label, expression: `${lower(s.unit)} ⇒ ${lower(s.name)}`, explanation: `Katıda taşıyıcı: ${carrierText223(s.solidCarriers)}. Eriyikte: ${carrierText223(s.meltCarriers)}.` };
    }),
    answer: `${UNKNOWN_SOLIDS223.map((u) => `${u.label} ${lower(solidOf223(u.kind).name)}`).join(", ")}. Katı hâlde yalnız ${and(solidConductors223)} iletir; erimiş hâlde iyonlarla iletim ${and(meltIonConductors223)}’de başlar.`,
    check: "Y’de molekül içi kovalent bağ vardır ama kristal ayrı moleküllerden oluşur; Z ile aynı sınıfa konmaz.",
    pitfall: "W’nin katıyken de iletken olduğunu sanmak. İyonlar vardır ama örgüde yerlerine bağlıdır; hareketli değildir.",
  },
  {
    title: "Genellemeleri tablodaki karşı örnekle sına",
    prompt: `Katı türleri tablosuna göre şu önermeleri değerlendir. ${SOLID_CLAIMS223.map((c) => `${c.label}. ${c.text}`).join(" ")} Hangileri doğrudur? Yanlış olanlar için tablodan bir karşı örnek ver.`,
    strategy: "Önermenin kapsadığı satırları seç. Önermeye uymayan tek bir satır, önermeyi çürütmeye yeter.",
    steps: SOLID_CLAIMS223.map((c) => ({
      label: c.label,
      expression: c.holds ? "Uymayan satır yok ⇒ doğru" : `Karşı örnek: ${c.counter!.example} (${lower(c.counter!.name)}) ⇒ yanlış`,
      explanation: c.holds ? `${metallic.name} satırında katıda taşıyıcı: ${metallic.solidCarriers.join(", ")}.` : `${c.counter!.name} satırı: ${lower(c.counter!.holding)}; katı / eriyik taşıyıcı: ${carrierText223(c.counter!.solidCarriers)} / ${carrierText223(c.counter!.meltCarriers)}.`,
    })),
    answer: `Yalnız ${trueSolidClaims.map((c) => c.label).join(", ")} doğrudur. Karşı örnekler: ${SOLID_CLAIMS223.filter((c) => !c.holds).map((c) => `${c.label} için ${lower(c.counter!.example)}`).join(", ")}.`,
    check: `Doğru önerme IV, I’in tersi değildir: her metal iletir, ama her iletken metal değildir (${lower(graphite.example)}).`,
    pitfall: "Katı NaCl’nin iletmediğini görüp eriyiğinin de iletmeyeceğini söylemek. Erimiş hâlde iyonlar hareketlidir.",
  },
];

export const solidSupplement223 = {
  title: solidSection223.title,
  figureTitle: solidSection223.title,
  paragraphs: solidSection223.paragraphs,
  summary: `Önce yapıtaşı, sonra tutunma, sonra taşıyıcı. İyonik: katıda iletmez, eriyikte iyonlarla iletir. Moleküler: molekül içinde kovalent bağ var ama ağ değil. Metal: yayılmış elektronlar. Grafit metal değil ama katıda iletir; iletmek metal kanıtı değildir.`,
  appendSection: true as const,
  table: solidTable,
  examples: solidExamples223,
};

/* =================================================================
 * 5 · fiziksel-kimyasal-degisimler: tür listesi ve atom/yük sayımı
 * ================================================================= */

const SUB: Record<string, string> = { "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4", "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9" };
const SUPD: Record<string, string> = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9" };
/** Parantezsiz formül: elementler (Unicode alt simge) ve sondaki yük (²⁺, ⁻). */
export const parseFormula223 = (formula: string) => {
  const atoms: Record<string, number> = {};
  let i = 0;
  let charge = 0;
  while (i < formula.length) {
    const m = /^[A-Z][a-z]?/.exec(formula.slice(i));
    if (m) {
      i += m[0].length;
      let digits = "";
      while (i < formula.length && SUB[formula[i]]) digits += SUB[formula[i++]];
      atoms[m[0]] = (atoms[m[0]] ?? 0) + (digits ? Number(digits) : 1);
      continue;
    }
    let mag = "";
    while (i < formula.length && SUPD[formula[i]]) mag += SUPD[formula[i++]];
    const sign = formula[i];
    if (sign !== "⁺" && sign !== "⁻") throw new Error(`depth223: çözülemeyen formül ${formula}`);
    i += 1;
    guard(i === formula.length, `${formula}: yük formülün sonunda yazılır`);
    charge = (sign === "⁺" ? 1 : -1) * (mag ? Number(mag) : 1);
  }
  return { atoms, charge };
};
export interface Species223 { coef: number; formula: string; phase: string; /** Tür kimliği; iyonik katı için örgüdeki iyonlar. */ ids?: string[] }
export interface Change223 { name: string; left: Species223[]; right: Species223[] }
const sp = (coef: number, formula: string, phase: string, ids?: string[]): Species223 => ({ coef, formula, phase, ids });
export const idsOf223 = (s: Species223) => s.ids ?? [s.formula];
export const sideTally223 = (side: readonly Species223[]) => {
  const atoms: Record<string, number> = {};
  let charge = 0;
  for (const s of side) {
    const p = parseFormula223(s.formula);
    for (const [el, k] of Object.entries(p.atoms)) atoms[el] = (atoms[el] ?? 0) + k * s.coef;
    charge += p.charge * s.coef;
  }
  return { atoms, charge, particles: side.reduce((t, s) => t + s.coef, 0) };
};
/** Hill sırası: C, H, sonra alfabetik; iki yan aynı sırayla yazılır. */
const hill = (a: string, b: string) => { const r = (x: string) => (x === "C" ? 0 : x === "H" ? 1 : 2); return r(a) - r(b) || a.localeCompare(b); };
export const tallyText223 = (t: ReturnType<typeof sideTally223>) =>
  `${Object.entries(t.atoms).sort(([a], [b]) => hill(a, b)).map(([el, k]) => `${k} ${el}`).join(", ")} · yük ${t.charge > 0 ? `+${t.charge}` : t.charge < 0 ? `−${-t.charge}` : "0"}`;
export const balanced223 = (c: Change223) => {
  const l = sideTally223(c.left);
  const r = sideTally223(c.right);
  const els = new Set([...Object.keys(l.atoms), ...Object.keys(r.atoms)]);
  return l.charge === r.charge && [...els].every((e) => l.atoms[e] === r.atoms[e]);
};
/** Ölçüt: sağdaki tür kimliklerinden biri solda yoksa (ya da soldaki bir tür kaybolursa) yeni tür oluşmuştur. */
export const newSpecies223 = (c: Change223) => {
  const before = new Set(c.left.flatMap(idsOf223));
  return c.right.filter((s) => idsOf223(s).some((id) => !before.has(id))).map((s) => s.formula);
};
export const isChemical223 = (c: Change223) => {
  const before = new Set(c.left.flatMap(idsOf223));
  const after = new Set(c.right.flatMap(idsOf223));
  return [...after].some((x) => !before.has(x)) || [...before].some((x) => !after.has(x));
};
const spText = (s: Species223) => `${s.coef > 1 ? s.coef : ""}${s.formula}(${s.phase})`;
export const equationText223 = (c: Change223) => `${c.left.map(spText).join(" + ")} → ${c.right.map(spText).join(" + ")}`;
export const CHANGES223: Change223[] = [
  { name: "Buzun erimesi", left: [sp(1, "H₂O", "k")], right: [sp(1, "H₂O", "s")] },
  { name: "Kuru buzun süblimleşmesi", left: [sp(1, "CO₂", "k")], right: [sp(1, "CO₂", "g")] },
  { name: "Şekerin suda çözünmesi", left: [sp(1, "C₁₂H₂₂O₁₁", "k")], right: [sp(1, "C₁₂H₂₂O₁₁", "suda")] },
  { name: "Tuzun suda çözünmesi", left: [sp(1, "NaCl", "k", ["Na⁺", "Cl⁻"])], right: [sp(1, "Na⁺", "suda"), sp(1, "Cl⁻", "suda")] },
  { name: "Magnezyumun yanması", left: [sp(2, "Mg", "k"), sp(1, "O₂", "g")], right: [sp(2, "MgO", "k", ["Mg²⁺", "O²⁻"])] },
  { name: "Kireç taşının ısıtılması", left: [sp(1, "CaCO₃", "k", ["Ca²⁺", "CO₃²⁻"])], right: [sp(1, "CaO", "k", ["Ca²⁺", "O²⁻"]), sp(1, "CO₂", "g")] },
  { name: "Çinkonun asitte çözünmesi", left: [sp(1, "Zn", "k"), sp(2, "H⁺", "suda")], right: [sp(1, "Zn²⁺", "suda"), sp(1, "H₂", "g")] },
];
export const classText223 = (c: Change223) => (isChemical223(c) ? "Kimyasal" : "Fiziksel");
const changeTable = {
  layout: "table" as const,
  headers: ["Olay", "Denklem", "Her iki yanda atom · yük", "Yeni tür", "Sınıf"],
  rows: CHANGES223.map((c) => [c.name, equationText223(c), tallyText223(sideTally223(c.left)), newSpecies223(c).length ? newSpecies223(c).join(", ") : "Yok", classText223(c)]),
};
const physical = CHANGES223.filter((c) => !isChemical223(c));
const chemical = CHANGES223.filter(isChemical223);
const hasGasRight = (c: Change223) => c.right.some((s) => s.phase === "g");
const saltRow = CHANGES223[3];
const limestone = CHANGES223[5];
const dryIce = CHANGES223[1];
const zincRow = CHANGES223[6];
const signedQ = (q: number) => (q > 0 ? `+${q}` : q < 0 ? `−${-q}` : "0");

guard(CHANGES223.every(balanced223), "her denklemde atom ve yük korunur");
guard(physical.some(hasGasRight) && chemical.some(hasGasRight), "gaz oluşumu tek başına sınıfı belirlemez");
guard(!isChemical223(saltRow) && saltRow.right.every((s) => s.phase === "suda"), "olağan tuz çözünmesi önceden var olan iyonlarla fiziksel sınıflanır");
guard(chemical.every((c) => newSpecies223(c).length > 0) && physical.every((c) => newSpecies223(c).length === 0), "sınıf yeni tür ölçütünden çıkar");
guard(isChemical223(limestone) && !isChemical223(dryIce) && newSpecies223(limestone).includes("CO₂"), "iki satırda CO₂ gazı çıkar; biri kimyasal biri fiziksel");
guard(chemical.some((c) => sideTally223(c.left).particles !== sideTally223(c.right).particles), "tanecik sayısı her tepkimede korunmaz");
guard(sideTally223(saltRow.left).particles !== sideTally223(saltRow.right).particles && !isChemical223(saltRow) && isChemical223(CHANGES223[4]), "tanecik sayısı fiziksel olayda da değişebilir");

export const changeSection223: GuideSection = {
  title: "Tür listesiyle sınıflandır: yedi olayın atom ve yük sayımı",
  paragraphs: [
    `Ölçüt tektir: olaydan sonra solda bulunmayan bir tür oluşuyor mu? Hâl etiketi (k, s, g, suda) türün kimliğini değiştirmez. ${saltRow.left[0].formula}(k) örgüsünde ${and(idsOf223(saltRow.left[0]))} iyonları zaten vardır; çözünmede bu iyonlar suyla çevrelenir, yeni tür oluşmaz. Tabloda ${physical.length} olay fiziksel, ${chemical.length} olay kimyasaldır.`,
    `Atom ve yük her satırda iki yanda eşittir; korunum fiziksel ile kimyasalı ayırmaz. ${dryIce.name} ile ${lower(limestone.name)} sağ tarafta CO₂ gazı verir: birincisinde ${dryIce.left[0].formula} zaten vardı, ikincisinde ${limestone.left[0].formula} yerine ${and(newSpecies223(limestone))} oluşur. Gaz çıkışı tek başına karar verdirmez.`,
    `Tanecik sayısı da ölçüt değildir: ${lower(saltRow.name)} ${sideTally223(saltRow.left).particles} formül biriminden ${sideTally223(saltRow.right).particles} iyon verir ama olay fizikseldir; ${lower(CHANGES223[4].name)} ${sideTally223(CHANGES223[4].left).particles} birimden ${sideTally223(CHANGES223[4].right).particles} birim verir ve kimyasaldır. Çinkoda yük ${signedQ(sideTally223(zincRow.left).charge)} = ${signedQ(sideTally223(zincRow.right).charge)} korunurken Zn atomu Zn²⁺ iyonuna dönüşür. Her olay için önce tür listesini yaz, sonra atom ve yükü say.`,
  ],
  table: changeTable,
};

/** Örnek 1: iki gaz çıkışı. */
export const gasPair223: Change223[] = [
  { name: "Suyun kaynaması", left: [sp(1, "H₂O", "s")], right: [sp(1, "H₂O", "g")] },
  { name: "Kabartma tozunun ısıtılması", left: [sp(2, "NaHCO₃", "k", ["Na⁺", "HCO₃⁻"])], right: [sp(1, "Na₂CO₃", "k", ["Na⁺", "CO₃²⁻"]), sp(1, "H₂O", "g"), sp(1, "CO₂", "g")] },
];
guard(gasPair223.every(balanced223) && !isChemical223(gasPair223[0]) && isChemical223(gasPair223[1]), "iki gaz çıkışından biri fiziksel biri kimyasal");
/** Örnek 2: tanecik sayısı korunan ve korunmayan iki tepkime. */
export const particlePair223: Change223[] = [
  { name: "Bakırın gümüş iyonlarıyla tepkimesi", left: [sp(1, "Cu", "k"), sp(2, "Ag⁺", "suda")], right: [sp(1, "Cu²⁺", "suda"), sp(2, "Ag", "k")] },
  { name: "Suyun elektrolizi", left: [sp(2, "H₂O", "s")], right: [sp(2, "H₂", "g"), sp(1, "O₂", "g")] },
];
guard(particlePair223.every(balanced223) && particlePair223.every(isChemical223), "iki tepkime de denkli ve kimyasal");
guard(sideTally223(particlePair223[0].left).particles === sideTally223(particlePair223[0].right).particles && sideTally223(particlePair223[1].left).particles !== sideTally223(particlePair223[1].right).particles, "tanecik sayısı birinde korunur, öbüründe korunmaz");

const tallyStep = (c: Change223, label: string) => ({
  label,
  expression: `Sol: ${tallyText223(sideTally223(c.left))} · Sağ: ${tallyText223(sideTally223(c.right))}`,
  explanation: balanced223(c) ? "Atom ve yük iki yanda eşittir." : "Denklem denk değildir.",
});
export const changeExamples223: WorkedExample[] = [
  {
    title: "İki kapta gaz çıkıyor: hangisi kimyasal?",
    prompt: `Birinci kapta saf su kaynıyor: ${equationText223(gasPair223[0])}. İkinci kapta kabartma tozu (sodyum hidrojen karbonat) ısıtılıyor: ${equationText223(gasPair223[1])}. NaHCO₃ örgüsünde Na⁺ ve HCO₃⁻, Na₂CO₃ örgüsünde Na⁺ ve CO₃²⁻ iyonları bulunur. Her iki denklemde atomları ve yükü say; olayları sınıflandır.`,
    strategy: "Önce atom ve yükü say (denklem doğru mu?). Sonra sağdaki tür kimliklerini soldakilerle karşılaştır; hâl etiketini ve gaz çıkışını ölçüt sayma.",
    steps: [
      tallyStep(gasPair223[0], "1. kap sayım"),
      { label: "1. kap türler", expression: `Yeni tür: ${newSpecies223(gasPair223[0]).join(", ") || "yok"}`, explanation: "Sol ve sağda yalnız H₂O vardır; değişen hâldir." },
      tallyStep(gasPair223[1], "2. kap sayım"),
      { label: "2. kap türler", expression: `Yeni tür: ${newSpecies223(gasPair223[1]).join(", ")}`, explanation: "HCO₃⁻ kaybolur; CO₃²⁻, H₂O ve CO₂ oluşur." },
    ],
    answer: `Birinci kap ${lower(classText223(gasPair223[0]))}, ikinci kap ${lower(classText223(gasPair223[1]))} değişimdir. İki denklemde de atom ve yük korunur (2. kapta her iki yanda ${tallyText223(sideTally223(gasPair223[1].left))}).`,
    check: "Gaz çıkışı iki kapta da var; ayrımı yapan yalnız tür listesidir.",
    pitfall: "Kabarcık gördüğün her olayı kimyasal saymak. Kaynayan suyun buharı yine H₂O’dur.",
  },
  {
    title: "Tanecik sayısı korunuyor: yine de tepkime mi?",
    prompt: `İki denklem veriliyor. A: ${equationText223(particlePair223[0])}. B: ${equationText223(particlePair223[1])}. Her birinde atomları, toplam yükü ve formül birimi (tanecik) sayısını iki yanda say. Hangileri kimyasal değişimdir?`,
    strategy: "Üç sayım yap: atom, yük, tanecik. Sonra tür listesini karşılaştır. Korunum denklemin doğruluğunu, tür listesi sınıfı belirler.",
    steps: [
      tallyStep(particlePair223[0], "A sayım"),
      { label: "A tanecik", expression: `${sideTally223(particlePair223[0].left).particles} → ${sideTally223(particlePair223[0].right).particles}`, explanation: `Tanecik sayısı korunur; yeni tür: ${newSpecies223(particlePair223[0]).join(", ")}.` },
      tallyStep(particlePair223[1], "B sayım"),
      { label: "B tanecik", expression: `${sideTally223(particlePair223[1].left).particles} → ${sideTally223(particlePair223[1].right).particles}`, explanation: `Tanecik sayısı değişir; yeni tür: ${newSpecies223(particlePair223[1]).join(", ")}.` },
    ],
    answer: `İkisi de kimyasaldır. A’da tanecik sayısı ${sideTally223(particlePair223[0].left).particles} = ${sideTally223(particlePair223[0].right).particles} korunur ama ${and(newSpecies223(particlePair223[0]))} oluşur; B’de ${sideTally223(particlePair223[1].left).particles} → ${sideTally223(particlePair223[1].right).particles} olur.`,
    check: `A’da toplam yük iki yanda ${signedQ(sideTally223(particlePair223[0].left).charge)}; Cu atomu ${parseFormula223("Cu²⁺").charge} elektron verir, ${particlePair223[0].left[1].coef} Ag⁺ iyonu birer elektron alır.`,
    pitfall: "Tanecik sayısı ya da atom sayısı korunuyor diye değişimi fiziksel saymak. Korunum her denklemde vardır.",
  },
];

export const changeSupplement223 = {
  title: changeSection223.title,
  figureTitle: changeSection223.title,
  paragraphs: changeSection223.paragraphs,
  summary: `Ölçüt: solda olmayan bir tür oluşuyor mu? Hâl etiketi, gaz çıkışı, tanecik sayısı karar vermez. Kuru buz CO₂ verir: fiziksel; kireç taşı CaO ve CO₂ verir: kimyasal. NaCl çözünmesinde iyonlar zaten vardı: fiziksel. Atom ve yük her denklemde korunur.`,
  appendSection: true as const,
  table: changeTable,
  examples: changeExamples223,
};

/* ---------- Dışa aktarım ---------- */

export const depth223Lessons = {
  "gazlar-hal-degisim-plazma": gasSupplement223,
  "buharlasma-buhar-basinci": vapourSupplement223,
  "kaynama-bagil-nem": boilSupplement223,
  "katilar-viskozite": solidSupplement223,
  "fiziksel-kimyasal-degisimler": changeSupplement223,
} as const;

export const depth223Supplements = {
  "gazlar-hal-degisim-plazma": [gasSupplement223],
  "buharlasma-buhar-basinci": [vapourSupplement223],
  "kaynama-bagil-nem": [boilSupplement223],
  "katilar-viskozite": [solidSupplement223],
  "fiziksel-kimyasal-degisimler": [changeSupplement223],
};
