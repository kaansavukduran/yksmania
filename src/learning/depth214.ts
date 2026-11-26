import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Fizik optik, manyetizma ve genleşme derinleştirmesi (0.214.0). Kabul
 * edilmiş rehber içeriği değişmez; her derse görüntüleme katmanında bir tablo
 * bölümü, iki özgün çözümlü örnek ve bir bölüm çizimi eklenir. Paragraflardaki,
 * tablo satırlarındaki, çizim etiketlerindeki ve Kopya Kâğıdı özetlerindeki
 * sayılar aynı formül fonksiyonlarından üretilir. Paragraftaki genel yargılar
 * modül yüklenirken veriyle sınanır; veri yargıyı desteklemezse modül hata verir.
 */

const guard = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depth214: ${claim}`);
};
const close = (x: number, y: number, eps = 1e-9) => Math.abs(x - y) <= eps * Math.max(1, Math.abs(x), Math.abs(y));

/** Türkçe ondalık virgüllü, gerçek eksi işaretli sayı (en çok `digits` basamak). */
export const num214 = (x: number, digits = 2) => {
  const r = Number(x.toFixed(digits));
  const s = String(Object.is(r, -0) ? 0 : r).replace(".", ",");
  return s.startsWith("-") ? `−${s.slice(1)}` : s;
};
/** İşaretli yazım: +10, −10. */
export const signedNum214 = (x: number, digits = 2) => (x > 0 ? `+${num214(x, digits)}` : num214(x, digits));

/* ========== Mercekler: ince mercek bağıntısıyla tam tablo ========== */

/*
 * Rehberin işaret kuralı: gerçek cisim u > 0, yakınsak f > 0, ıraksak f < 0;
 * gerçek görüntü çıkış tarafında v > 0, sanal görüntü cismin tarafında v < 0.
 * 1/f = 1/u + 1/v, m = −v/u.
 */
export interface LensImage214 {
  f: number;
  u: number;
  /** undefined: u = f, çıkan ışınlar paraleldir, sonlu görüntü yoktur. */
  v?: number;
  m?: number;
}
export const lensImage214 = (f: number, u: number): LensImage214 => {
  guard(f !== 0 && u > 0, "ince mercek için f ≠ 0 ve gerçek cisim u > 0 olmalı");
  if (close(u, f)) return { f, u };
  const v = (f * u) / (u - f);
  return { f, u, v, m: -v / u };
};
/** Görüntünün tarafı ve türü, yönü ve boyu (bağıntının işaretinden). */
export const lensNature214 = ({ v, m }: LensImage214) => {
  if (v === undefined || m === undefined) return { side: "Sonlu görüntü yok", look: "Çıkan ışınlar paralel" };
  const side = v > 0 ? "Çıkış tarafı, gerçek" : "Giriş tarafı, sanal";
  const size = close(Math.abs(m), 1) ? "eş boy" : Math.abs(m) > 1 ? "büyük" : "küçük";
  return { side, look: `${m < 0 ? "Ters" : "Düz"}, ${size}` };
};

/** Tablonun odak uzaklığı ve cisim uzaklıkları (cm). */
export const lensFocus214 = 10;
export const lensCases214: readonly { f: number; u: number }[] = [
  { f: lensFocus214, u: 30 },
  { f: lensFocus214, u: 20 },
  { f: lensFocus214, u: 15 },
  { f: lensFocus214, u: 10 },
  { f: lensFocus214, u: 5 },
  { f: -lensFocus214, u: 30 },
  { f: -lensFocus214, u: 15 },
  { f: -lensFocus214, u: 10 },
];
export const lensRows214 = (cases = lensCases214) => cases.map(({ f, u }) => ({ ...lensImage214(f, u), ...lensNature214(lensImage214(f, u)) }));
const lensRows = lensRows214();
const lensKind = (f: number) => (f > 0 ? "Yakınsak" : "Iraksak");
export const lensTable214 = {
  layout: "table" as const,
  headers: ["Mercek ve cisim", "v (cm)", "m", "Taraf ve tür", "Yön ve boy"],
  rows: lensRows.map(({ f, u, v, m, side, look }) => [
    `${lensKind(f)} f = ${signedNum214(f)} cm, u = ${num214(u)} cm`,
    v === undefined ? "Yok" : num214(v),
    m === undefined ? "Yok" : num214(m),
    side,
    look,
  ]),
};
const conv = lensRows.filter(({ f }) => f > 0);
const div = lensRows.filter(({ f }) => f < 0);
const F = lensFocus214;
// Paragraf 1: u > 2f ⇒ f < v < 2f gerçek ters küçük; u = 2f ⇒ v = 2f, m = −1; f < u < 2f ⇒ v > 2f ters büyük; u < f ⇒ v < 0, m > 1.
for (const r of conv) {
  if (r.u > 2 * F) guard(r.v! > F && r.v! < 2 * F && r.m! < 0 && r.m! > -1, "u > 2f satırı f ile 2f arasında küçük ters görüntü vermeli");
  else if (close(r.u, 2 * F)) guard(close(r.v!, 2 * F) && close(r.m!, -1), "u = 2f satırı v = 2f ve m = −1 vermeli");
  else if (r.u > F) guard(r.v! > 2 * F && r.m! < -1, "f < u < 2f satırı 2f dışında büyük ters görüntü vermeli");
  else if (close(r.u, F)) guard(r.v === undefined, "u = f satırında sonlu görüntü olmamalı");
  else guard(r.v! < 0 && r.m! > 1, "u < f satırı sanal düz büyük görüntü vermeli");
}
guard(new Set(conv.map(({ u }) => (u > 2 * F ? "a" : close(u, 2 * F) ? "b" : u > F ? "c" : close(u, F) ? "d" : "e"))).size === 5, "yakınsak satırlar beş bölgenin her birinden bir cisim içermeli");
// Paragraf 2: ıraksakta her gerçek cisim için v < 0, 0 < m < 1, görüntü mercek ile F arasında; cisim yaklaşınca m büyür.
for (const r of div) guard(r.v! < 0 && r.m! > 0 && r.m! < 1 && Math.abs(r.v!) < F, "ıraksak satırlar mercek ile F arasında sanal düz küçük görüntü vermeli");
for (let i = 1; i < div.length; i += 1) guard(div[i].u < div[i - 1].u && div[i].m! > div[i - 1].m!, "ıraksakta cisim yaklaşınca büyütme artmalı");
// Her satır bağıntıyı sağlar.
for (const r of lensRows) if (r.v !== undefined) guard(close(1 / r.u + 1 / r.v, 1 / r.f), "her satır 1/f = 1/u + 1/v bağıntısını sağlamalı");
const [c30, c20, c15, c10, c5] = conv;
const [d30, , d10] = div;

export const lensSection214: GuideSection = {
  title: "Aynı odakta cismi kaydır: görüntü tablosunu bağıntıyla doldur",
  paragraphs: [
    `Tablodaki her satır rehberin işaret kuralıyla hesaplanır: gerçek cisim u > 0, yakınsakta f > 0, ıraksakta f < 0 alınır; 1/f = 1/u + 1/v bağıntısından v = f·u/(u − f), büyütme m = −v/u bulunur. Yakınsak f = ${signedNum214(F)} cm mercekte u = ${num214(c30.u)} cm iken v = ${num214(c30.v!)} cm ve m = ${num214(c30.m!)} çıkar: görüntü çıkışta F ile 2F arasında, gerçek, ters ve küçüktür. u = ${num214(c20.u)} cm = 2f iken v = ${num214(c20.v!)} cm, m = ${num214(c20.m!)} olur. u = ${num214(c15.u)} cm iken görüntü 2F dışına, v = ${num214(c15.v!)} cm’ye gider ve m = ${num214(c15.m!)} ile iki kat büyür.`,
    `u = ${num214(c10.u)} cm = f satırında 1/v = 0 olur; çıkan ışınlar paraleldir ve sonlu görüntü yoktur. u = ${num214(c5.u)} cm için v = ${num214(c5.v!)} cm negatif çıkar: görüntü cismin tarafında, sanal, düz ve m = ${num214(c5.m!)} ile büyüktür. Iraksak f = ${signedNum214(-F)} cm mercekte ise üç satırın hepsinde v negatif ve 0 < m < 1’dir: u = ${num214(d30.u)} cm iken v = ${num214(d30.v!)} cm, m = ${num214(d30.m!)}; cisim u = ${num214(d10.u)} cm’ye yaklaşınca v = ${num214(d10.v!)} cm, m = ${num214(d10.m!)} olur. Görüntü her zaman mercek ile giriş tarafındaki odak arasında kalır; büyütme artar ama 1’e ulaşmaz.`,
  ],
  table: lensTable214,
};

/** Perdede istenen büyütmeden cisim uzaklığı: m = −v/u ve 1/f = 1/u + 1/v ⇒ u = f(1 − 1/m). */
export const lensFromMagnification214 = (f: number, m: number) => {
  const u = f * (1 - 1 / m);
  const v = -m * u;
  return { f, m, u, v };
};
export const screenCase214 = lensFromMagnification214(12, -3);
export const divergingCase214 = lensFromMagnification214(-20, 1 / 4);
guard(screenCase214.u > 0 && screenCase214.v > 0 && close(1 / screenCase214.u + 1 / screenCase214.v, 1 / screenCase214.f), "perde örneği gerçek cisim ve gerçek görüntü vermeli");
guard(divergingCase214.u > 0 && divergingCase214.v < 0 && close(1 / divergingCase214.u + 1 / divergingCase214.v, 1 / divergingCase214.f), "ıraksak örnek gerçek cisim ve sanal görüntü vermeli");
const sc = screenCase214;
const dc = divergingCase214;
/** |m| tam sayı (perde) ve 1/m tam sayı (ıraksak) seçildi; adımlar bu tam sayılarla yazılır. */
const scK = -sc.m;
const dcQ = 1 / dc.m;
guard(Number.isInteger(scK) && Number.isInteger(dcQ) && close(sc.u, (sc.f * (scK + 1)) / scK) && close(dc.u, dc.f * (1 - dcQ)), "örnek büyütmeleri tam sayı adımlarla çözülmeli");

export const lensExamples214: WorkedExample[] = [
  {
    title: "Perdedeki büyütmeden cismin yerini bul",
    prompt: `Odak uzaklığı f = ${signedNum214(sc.f)} cm olan ince yakınsak mercek havadadır. Mercekten uygun uzaklığa konan bir perdede, gerçek cismin ${scK} kat büyük ve ters görüntüsü net olarak oluşuyor. İşaret kuralı: gerçek cisim u > 0, gerçek görüntü çıkış tarafında v > 0, büyütme m = −v/u. Cisim mercekten kaç cm uzaktadır ve cisim ile perde arası kaç cm’dir?`,
    strategy: "Perdede görüntü oluştuğu için görüntü gerçektir ve m negatiftir. m’den v’yi u cinsinden yaz, sonra ince mercek bağıntısına koy.",
    steps: [
      { label: "Büyütmeyi işaretle", expression: `m = ${num214(sc.m)} ⇒ v = ${scK}u`, explanation: `Ters görüntü m < 0 demektir; m = −v/u olduğundan v pozitif ve u’nun ${scK} katıdır.` },
      { label: "Bağıntıya koy", expression: `1/${num214(sc.f)} = 1/u + 1/(${scK}u) = ${scK + 1}/(${scK}u)`, explanation: "Paydaları eşitleyince tek bilinmeyen u kalır." },
      { label: "u ve v", expression: `u = ${num214(sc.f)} · ${scK + 1}/${scK} = ${num214(sc.u)} cm, v = ${scK} · ${num214(sc.u)} = ${num214(sc.v)} cm`, explanation: "v pozitif çıktığı için görüntü gerçekten çıkış tarafındadır; perde oraya konur." },
      { label: "Cisim–perde arası", expression: `u + v = ${num214(sc.u)} + ${num214(sc.v)} = ${num214(sc.u + sc.v)} cm`, explanation: "Cisim girişte, perde çıkışta olduğundan iki uzaklık toplanır." },
    ],
    answer: `Cisim mercekten ${num214(sc.u)} cm uzaktadır; cisim ile perde arası ${num214(sc.u + sc.v)} cm’dir.`,
    check: `1/${num214(sc.u)} + 1/${num214(sc.v)} = 1/${num214(sc.f)} sağlanır. u = ${num214(sc.u)} cm, f ile 2f (${num214(sc.f)} ile ${num214(2 * sc.f)} cm) arasındadır; bu bölgede görüntünün ters ve büyük olması tabloyla uyumludur.`,
    pitfall: "Büyütmeyi işaretsiz 3 alıp v = −3u yazmak. Bu, sanal görüntü demektir ve perdede oluşamaz; çözüm de negatif u verir.",
  },
  {
    title: "Iraksak mercekte küçültmeden uzaklığa",
    prompt: `Odak uzaklığı f = ${signedNum214(dc.f)} cm olan ince ıraksak mercek havadadır. Gerçek bir cisim merceğin önüne konunca cismin tarafında, düz ve boyu cismin 1/${dcQ}’ü olan bir görüntü gözleniyor. İşaret kuralı: gerçek cisim u > 0, sanal görüntü v < 0, m = −v/u. Cisim ve görüntü mercekten kaç cm uzaktadır? Cisim ile görüntü arası kaç cm’dir?`,
    strategy: "Düz görüntü m > 0, sanal görüntü v < 0 demektir. v = −m·u yazıp 1/f = 1/u + 1/v bağıntısında tek bilinmeyene indir.",
    steps: [
      { label: "Büyütme", expression: `m = +1/${dcQ} ⇒ v = −u/${dcQ}`, explanation: "Düz ve küçük görüntüde 0 < m < 1’dir; v negatif çıkar." },
      { label: "Bağıntı", expression: `1/(${num214(dc.f)}) = 1/u − ${dcQ}/u = −${dcQ - 1}/u`, explanation: `1/v = −${dcQ}/u olduğundan iki terim aynı paydada birleşir.` },
      { label: "Uzaklıklar", expression: `u = ${dcQ - 1} · ${num214(-dc.f)} = ${num214(dc.u)} cm, v = −${num214(dc.u)}/${dcQ} = ${num214(dc.v)} cm`, explanation: `Negatif v, görüntünün mercekten ${num214(-dc.v)} cm uzakta ve cismin tarafında olduğunu gösterir.` },
      { label: "Cisim–görüntü arası", expression: `${num214(dc.u)} − ${num214(-dc.v)} = ${num214(dc.u + dc.v)} cm`, explanation: "İkisi de giriş tarafında olduğundan uzaklıklar çıkarılır." },
    ],
    answer: `Cisim ${num214(dc.u)} cm, görüntü ${num214(-dc.v)} cm uzaktadır (v = ${num214(dc.v)} cm); aralarında ${num214(dc.u + dc.v)} cm vardır.`,
    check: `1/${num214(dc.u)} + 1/(${num214(dc.v)}) = ${num214(1 / dc.u + 1 / dc.v, 4)} = 1/(${num214(dc.f)}). Görüntü mercek ile F (${num214(-dc.f)} cm) arasındadır; ıraksak satırların genel sonucuyla uyumludur.`,
    pitfall: "Görüntü ile cisim aynı taraftayken uzaklıkları toplamak. Sanal görüntü mercekle cisim arasında kaldığından aradaki uzaklık farktır.",
  },
];

export const lensSupplement214 = {
  title: lensSection214.title,
  figureTitle: lensSection214.title,
  paragraphs: lensSection214.paragraphs,
  summary: `v = f·u/(u − f), m = −v/u. f = ${signedNum214(F)} cm: u = ${conv.map(({ u, v }) => `${num214(u)} → ${v === undefined ? "görüntü yok" : `v = ${num214(v)}`}`).join("; ")}. f = ${signedNum214(-F)} cm: her gerçek cisimde v < 0, 0 < m < 1; u = ${num214(d30.u)} → m = ${num214(d30.m!)}, u = ${num214(d10.u)} → m = ${num214(d10.m!)}.`,
  appendSection: true as const,
  table: lensTable214,
  examples: lensExamples214,
};

/* ========== Prizmalar ve renkler: filtre × ışık ortak kanal tablosu ========== */

/** İdeal üç kanallı RGB modeli: [kırmızı, yeşil, mavi], her kanal 0 veya 1. */
export type Rgb214 = readonly [0 | 1, 0 | 1, 0 | 1];
export const colours214 = {
  kırmızı: [1, 0, 0],
  yeşil: [0, 1, 0],
  mavi: [0, 0, 1],
  sarı: [1, 1, 0],
  camgöbeği: [0, 1, 1],
  macenta: [1, 0, 1],
  beyaz: [1, 1, 1],
} as const satisfies Record<string, Rgb214>;
export type ColourName214 = keyof typeof colours214;
export const channelNames214 = ["kırmızı", "yeşil", "mavi"] as const;
export const colourName214 = (c: Rgb214): ColourName214 | undefined =>
  (Object.keys(colours214) as ColourName214[]).find((k) => colours214[k].every((x, i) => x === c[i]));
/** Seri işlem (filtre veya opak yüzey): yalnız ortak kanallar kalır. */
export const commonChannels214 = (a: Rgb214, b: Rgb214): Rgb214 => [(a[0] & b[0]) as 0 | 1, (a[1] & b[1]) as 0 | 1, (a[2] & b[2]) as 0 | 1];
/** Bağımsız ışıkların üst üste düşmesi: kanallar birleşir. */
export const addLights214 = (a: Rgb214, b: Rgb214): Rgb214 => [(a[0] | b[0]) as 0 | 1, (a[1] | b[1]) as 0 | 1, (a[2] | b[2]) as 0 | 1];
export const lightText214 = (c: Rgb214) => colourName214(c) ?? "ışık yok";
const cap = (s: string) => s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1);
const count = (c: Rgb214) => c[0] + c[1] + c[2];

export const filterNames214 = ["kırmızı", "yeşil", "mavi", "sarı", "camgöbeği", "macenta"] as const satisfies readonly ColourName214[];
export const lightNames214 = ["beyaz", "sarı", "camgöbeği", "macenta"] as const satisfies readonly ColourName214[];
export const filterRows214 = (filters = filterNames214, lights = lightNames214) => filters.map((filter) => ({
  filter,
  outputs: lights.map((light) => ({ light, out: commonChannels214(colours214[filter], colours214[light]) })),
}));
const filterRows = filterRows214();
export const filterTable214 = {
  layout: "table" as const,
  headers: ["Filtre", ...lightNames214.map((l) => `${cap(l)} ışık`)],
  rows: filterRows.map(({ filter, outputs }) => [`${cap(filter)} filtre`, ...outputs.map(({ out }) => cap(lightText214(out)))]),
};
const primaries = filterNames214.slice(0, 3);
const secondaries = filterNames214.slice(3);
for (const { filter, outputs } of filterRows) {
  const fc = colours214[filter];
  for (const { light, out } of outputs) {
    const lc = colours214[light];
    // Paragraf: filtre gelen ışıkta olmayan kanalı üretemez, kendi geçirmediği kanalı bırakmaz.
    guard(out.every((x, i) => x <= fc[i] && x <= lc[i]), `${filter} filtre × ${light} ışık yeni kanal üretmemeli`);
    // Paragraf: her sonuç tablodaki adlardan biri ya da ışık yok olmalı.
    guard(count(out) === 0 || colourName214(out) !== undefined, "her çıkış adlandırılmış bir renk olmalı");
  }
  // Paragraf: beyaz sütunu filtrenin kendi rengini verir.
  guard(colourName214(outputs[0].out) === filter, "beyaz ışık filtreden filtrenin rengiyle çıkmalı");
  // Paragraf: temel renkli filtre, o kanalı içermeyen tek ikincil ışığı tamamen durdurur.
  if ((primaries as readonly string[]).includes(filter)) guard(outputs.filter(({ out }) => count(out) === 0).length === 1, `${filter} filtre tam bir ikincil ışığı durdurmalı`);
  // Paragraf: ikincil filtre farklı ikincil ışıktan tek ortak temel kanal bırakır, aynı renkteki ışığı değiştirmeden geçirir.
  if ((secondaries as readonly string[]).includes(filter))
    for (const { light, out } of outputs.slice(1)) guard(light === filter ? colourName214(out) === filter : count(out) === 1, `${filter} filtre × ${light} ışık kuralı`);
}
// Paragraf: ikincil renk, içermediği temel renkle toplanınca beyaz verir (tamamlayıcı çiftler).
export const complements214 = secondaries.map((s) => {
  const p = primaries.find((q) => count(commonChannels214(colours214[s], colours214[q])) === 0)!;
  return { secondary: s, primary: p, sum: colourName214(addLights214(colours214[s], colours214[p])) };
});
for (const c of complements214) guard(c.sum === "beyaz", `${c.secondary} + ${c.primary} beyaz vermeli`);
guard(new Set(complements214.map(({ primary }) => primary)).size === 3, "her temel rengin tek tamamlayıcı ikincil rengi olmalı");

/*
 * Dispersiyon sıralaması rehberin kendi öğretim modelinden hesaplanır:
 * tepe açısı 40°, hava indisi 1, birinci yüzeyde geliş 30°, kırmızı n = 1,5,
 * mor n = 1,6 (rehberde açıkça verilen değerler; ölçülmüş cam tayfı değildir).
 */
export const prismModel214 = { apex: 40, incidence: 30, nRed: 1.5, nViolet: 1.6 };
const rad = (d: number) => (d * Math.PI) / 180;
const degOf = (r: number) => (r * 180) / Math.PI;
export const prismDeviation214 = (n: number, { apex, incidence } = prismModel214) => {
  const r1 = degOf(Math.asin(Math.sin(rad(incidence)) / n));
  const r2 = apex - r1;
  const s = n * Math.sin(rad(r2));
  guard(s < 1, "model ikinci yüzeyde tam iç yansıma vermemeli");
  const e = degOf(Math.asin(s));
  return incidence + e - apex;
};
export const redDeviation214 = prismDeviation214(prismModel214.nRed);
export const violetDeviation214 = prismDeviation214(prismModel214.nViolet);
guard(violetDeviation214 > redDeviation214, "normal dispersiyon modelinde mor kırmızıdan çok sapmalı");

const rowOf = (f: ColourName214) => filterRows.find(({ filter }) => filter === f)!;
const outOf = (f: ColourName214, l: ColourName214) => lightText214(rowOf(f).outputs.find(({ light }) => light === l)!.out);

guard(outOf("mavi", "sarı") === "ışık yok" && outOf("yeşil", "macenta") === "ışık yok", "mavi × sarı ve yeşil × macenta hücreleri ışık yok olmalı");

export const filterSection214: GuideSection = {
  title: "Renkli ışığı renkli filtreden geçir: ortak kanal tablosu",
  paragraphs: [
    `Prizma beyaz ışıktaki bileşenleri yönlerine göre ayırır; rehberin öğretim modelinde (tepe açısı ${prismModel214.apex}°, geliş ${prismModel214.incidence}°) kırmızı n = ${num214(prismModel214.nRed)} ile yaklaşık ${num214(redDeviation214, 1)}°, mor n = ${num214(prismModel214.nViolet)} ile yaklaşık ${num214(violetDeviation214, 1)}° sapar: kırmızı en az, mor en çok sapar. Ayrılan ya da renkli bir ışık sonra ideal bir filtreye girerse filtre yalnız hem gelen ışıkta hem kendi geçirdiği kanallarda bulunan bileşenleri bırakır. Tablo bu ortak kanal kuralıyla ideal RGB modelinde hesaplanmıştır: beyaz sütunu filtrenin kendi rengini verir, filtre gelen ışıkta olmayan bir kanalı hiçbir zaman üretmez.`,
    `Temel renkli bir filtre, kendi kanalını içermeyen ikincil ışığı tamamen durdurur: mavi filtre sarı ışığı, yeşil filtre macenta ışığı geçirmez; tabloda bu hücreler “${cap(outOf("mavi", "sarı"))}” yazar. İkincil renkli filtre aynı renkteki ışığı değiştirmeden geçirir, farklı bir ikincil ışıktan ise tek ortak temel kanalı bırakır: sarı filtre camgöbeği ışıktan ${outOf("sarı", "camgöbeği")}, macenta filtre sarı ışıktan ${outOf("macenta", "sarı")} geçirir. Toplamsal karışımda ise kanallar birleşir: ${complements214.map(({ secondary, primary }) => `${secondary} + ${primary}`).join(", ")} çiftlerinin her biri beyaz görünüm verir; bunlar tamamlayıcı renklerdir. Filtrede kanal seçilir, spotların üst üste düşmesinde kanal eklenir; iki işlemi karıştırma.`,
  ],
  table: filterTable214,
};

/** Örnek 1: macenta ışığı beyaza tamamlayan spot, sonra sarı filtre. */
export const complementCase214 = (() => {
  const base = colours214.macenta;
  const added = primaries.find((p) => colourName214(addLights214(base, colours214[p])) === "beyaz")!;
  return { added, mixed: colourName214(addLights214(base, colours214[added]))!, filtered: lightText214(commonChannels214(base, colours214.sarı)) };
})();
/** Örnek 2: camgöbeği ışıkla aydınlatılan ideal opak afiş. */
export const posterLight214: ColourName214 = "camgöbeği";
export const posterSurfaces214 = ["kırmızı", "sarı", "mavi", "beyaz"] as const satisfies readonly ColourName214[];
export const posterSeen214 = posterSurfaces214.map((s) => {
  const out = commonChannels214(colours214[s], colours214[posterLight214]);
  return { surface: s, out, seen: count(out) === 0 ? "siyah (karanlık)" : colourName214(out)! };
});
const seenOf = (s: string) => posterSeen214.find(({ surface }) => surface === s)!.seen;

export const filterExamples214: WorkedExample[] = [
  {
    title: "Tamamlayıcı spotu seç, sonra filtreden geçir",
    prompt: "İdeal RGB modelinde beyaz bir perdeye macenta (kırmızı + mavi kanalları) ışık düşüyor. (a) Perdenin aynı bölgesinin beyaz görünmesi için hangi tek temel renkli spot eklenmelidir? (b) Ek spot kapatılıp macenta ışığın önüne ideal sarı filtre (kırmızı ve yeşili geçirir) konursa perdede hangi renk görülür?",
    strategy: "(a)’da spotlar üst üste düştüğü için kanallar birleşir: eksik kanalı bul. (b)’de filtre seri bir işlemdir: ortak kanalı bul.",
    steps: [
      { label: "Eksik kanal", expression: `macenta = [${colours214.macenta.join(", ")}] ⇒ eksik kanal ${complementCase214.added}`, explanation: "Beyaz için üç kanalın hepsi gerekir; macentada yalnız yeşil yoktur." },
      { label: "Toplamsal karışım", expression: `[${colours214.macenta.join(", ")}] + [${colours214[complementCase214.added].join(", ")}] = [${colours214[complementCase214.mixed].join(", ")}] → ${complementCase214.mixed}`, explanation: "İki bağımsız ışık kaynağı kanalları birleştirir." },
      { label: "Seri filtre", expression: `[${colours214.macenta.join(", ")}] ∩ [${colours214.sarı.join(", ")}] = [${commonChannels214(colours214.macenta, colours214.sarı).join(", ")}] → ${complementCase214.filtered}`, explanation: "Sarı filtre maviyi durdurur; macentada yeşil olmadığı için yalnız kırmızı kalır." },
    ],
    answer: `(a) ${cap(complementCase214.added)} spot; perde ${complementCase214.mixed} görünür. (b) Perdede ${complementCase214.filtered} görülür.`,
    check: "Tablonun macenta ışık sütununda sarı filtre satırı da kırmızıdır. Yeşil, macentanın tamamlayıcısı olduğundan yeşil filtre aynı ışığı tamamen durdurur.",
    pitfall: "Filtreyi de toplama gibi düşünüp macenta + sarı = beyaz ya da sarı gibi sonuç yazmak. Filtre kanal eklemez, yalnız ortak kanalı bırakır.",
  },
  {
    title: "Camgöbeği ışıkta afişin renkleri",
    prompt: `Beyaz zemin üzerinde kırmızı, sarı ve mavi şeritleri olan bir afiş karanlık bir odada yalnız ${posterLight214} (yeşil + mavi kanalları) ışıkla aydınlatılıyor. Yüzeyleri ideal opak kabul et: kırmızı yüzey yalnız kırmızıyı, sarı yüzey kırmızı ve yeşili, mavi yüzey yalnız maviyi, beyaz yüzey üç kanalı da yansıtır. Her şerit ve zemin hangi renkte görünür?`,
    strategy: "Opak yüzey de seri bir seçicidir: gelen ışıkla yüzeyin yansıttığı kanalların ortağı göze ulaşır. Her yüzey için ortak kanalı ayrı bul.",
    steps: posterSeen214.map(({ surface, out, seen }) => ({
      label: `${cap(surface)} yüzey`,
      expression: `[${colours214[surface].join(", ")}] ∩ [${colours214[posterLight214].join(", ")}] = [${out.join(", ")}] → ${seen}`,
      explanation: count(out) === 0 ? "Gelen ışıkta bu yüzeyin yansıtabileceği kanal yoktur." : "Ortak kanallar yansır ve göze ulaşır.",
    })),
    answer: `Kırmızı şerit ${seenOf("kırmızı")}, sarı şerit ${seenOf("sarı")}, mavi şerit ${seenOf("mavi")} görünür; zemin ${seenOf("beyaz")} görünür.`,
    check: "Beyaz zemin her zaman gelen ışığın rengini alır; zeminin camgöbeği görünmesi aydınlatmanın gerçekten camgöbeği olduğunu doğrular. Tablodaki camgöbeği ışık sütunu da aynı ortak kanalları verir.",
    pitfall: "Yüzeyin beyaz ışıktaki adını korumak ya da kırmızı şeridin soluk kırmızı görüneceğini sanmak. Gelen ışıkta kırmızı kanal yoksa kırmızı yüzey yansıtacak ışık bulamaz.",
  },
];

export const filterSupplement214 = {
  title: filterSection214.title,
  figureTitle: filterSection214.title,
  paragraphs: filterSection214.paragraphs,
  summary: `Prizmada kırmızı en az, mor en çok sapar. Filtre ve opak yüzey: ortak kanal kalır (beyaz ışıkta filtrenin kendi rengi). Temel filtre tamamlayıcı ikincil ışığı durdurur; ikincil filtre başka ikincil ışıktan tek temel kanal bırakır. Spotlar toplanır: ${complements214.map(({ secondary, primary }) => `${secondary} + ${primary}`).join(", ")} = beyaz.`,
  appendSection: true as const,
  table: filterTable214,
  examples: filterExamples214,
};

/* ========== Mıknatıslar: pusulanın N ucu nereyi gösterir? ========== */

/*
 * İki kutuplu (nokta kutup) model: her N kutbu +1, her S kutbu −1 şiddetinde,
 * alanı 1/r² ile azalan nokta kaynak sayılır. Rehberin atölyesi de aynı modeli
 * kullanır. Tablodaki noktalar eksen ve orta dik üzerindedir; bu noktalarda
 * yön, simetri nedeniyle modelin ayrıntısından bağımsızdır. Mıknatısın içindeki
 * bölge bu modelle hesaplanmaz.
 */
export type Pole214 = { x: number; y: number; s: 1 | -1 };
export type Vec214 = readonly [number, number];
export const barPoles214 = (left: "N" | "S", x0: number, x1: number): Pole214[] => [
  { x: x0, y: 0, s: left === "N" ? 1 : -1 },
  { x: x1, y: 0, s: left === "N" ? -1 : 1 },
];
export const fieldAt214 = (poles: readonly Pole214[], p: Vec214): Vec214 => poles.reduce<Vec214>((acc, q) => {
  const dx = p[0] - q.x;
  const dy = p[1] - q.y;
  const r3 = Math.pow(dx * dx + dy * dy, 1.5);
  return [acc[0] + (q.s * dx) / r3, acc[1] + (q.s * dy) / r3];
}, [0, 0]);
export type Heading214 = "sağa" | "sola" | "yukarı" | "aşağı" | "yön yok";
export const heading214 = (b: Vec214): Heading214 => {
  const m = Math.hypot(b[0], b[1]);
  if (m < 1e-9) return "yön yok";
  const [x, y] = [b[0] / m, b[1] / m];
  guard(Math.abs(x) > 1 - 1e-9 || Math.abs(y) > 1 - 1e-9, "tablo noktalarında alan eksenlerden birine paralel olmalı");
  return Math.abs(x) > Math.abs(y) ? (x > 0 ? "sağa" : "sola") : y > 0 ? "yukarı" : "aşağı";
};

/** Çubuk boyu 4 birim (kutuplar x = ±2), karşılıklı çubuklar arası boşluk 2 birim. */
export const magnetCases214 = [
  { key: "axisN", setup: "Tek çubuk: N solda, S sağda", place: "N ucunun solunda, eksen üzerinde", poles: barPoles214("N", -2, 2), p: [-4, 0], why: "Dışarıda çizgiler N’den çıkar" },
  { key: "axisS", setup: "Tek çubuk: N solda, S sağda", place: "S ucunun sağında, eksen üzerinde", poles: barPoles214("N", -2, 2), p: [4, 0], why: "Dışarıda çizgiler S’ye girer" },
  { key: "above", setup: "Tek çubuk: N solda, S sağda", place: "Orta noktanın üstünde", poles: barPoles214("N", -2, 2), p: [0, 2], why: "Çizgi N’den S’ye mıknatısa paralel geçer" },
  { key: "below", setup: "Tek çubuk: N solda, S sağda", place: "Orta noktanın altında", poles: barPoles214("N", -2, 2), p: [0, -2], why: "Alt taraf üst tarafın aynasıdır" },
  { key: "reversed", setup: "Aynı çubuk ters: S solda, N sağda", place: "Sol ucun solunda, eksen üzerinde", poles: barPoles214("S", -2, 2), p: [-4, 0], why: "Kutuplar dönünce aynı noktada yön döner" },
  { key: "facingNS", setup: "İki çubuk: N ucu S ucuna bakıyor", place: "Karşılıklı uçların ortası", poles: [...barPoles214("S", -5, -1), ...barPoles214("S", 1, 5)], p: [0, 0], why: "Zıt kutuplar arasında çizgi N’den S’ye gider" },
  { key: "facingNN", setup: "İki özdeş çubuk: N ucu N ucuna bakıyor", place: "Karşılıklı uçların ortası", poles: [...barPoles214("S", -5, -1), ...barPoles214("N", 1, 5)], p: [0, 0], why: "Eş kutupların etkileri simetriyle sıfırlanır" },
] as const satisfies readonly { key: string; setup: string; place: string; poles: readonly Pole214[]; p: Vec214; why: string }[];
export const magnetRows214 = () => magnetCases214.map((c) => {
  const b = fieldAt214(c.poles, c.p);
  return { ...c, b, heading: heading214(b) };
});
const magRows = magnetRows214();
const headingText = (h: Heading214) => (h === "yön yok" ? "Belirli yön yok (B = 0)" : cap(h));
export const magnetTable214 = {
  layout: "table" as const,
  headers: ["Düzen", "Pusulanın yeri", "Pusula N ucu", "Neden"],
  rows: magRows.map(({ setup, place, heading, why }) => [setup, place, headingText(heading), why]),
};
const mrow = (k: (typeof magnetCases214)[number]["key"]) => magRows.find(({ key }) => key === k)!;
const nPole = (poles: readonly Pole214[]) => poles.find(({ s }) => s === 1)!;
const sPole = (poles: readonly Pole214[]) => poles.find(({ s }) => s === -1)!;
{
  // Paragraf: eksen üzerinde N’nin dışındaki pusula N’den uzağı, S’nin dışındaki S’ye doğru gösterir.
  const a = mrow("axisN");
  guard(Math.sign(a.b[0]) === Math.sign(a.p[0] - nPole(a.poles).x), "N ucunun dışındaki pusula N’den uzağı göstermeli");
  const s = mrow("axisS");
  guard(Math.sign(s.b[0]) === Math.sign(sPole(s.poles).x - s.p[0]), "S ucunun dışındaki pusula S’ye doğru göstermeli");
  // Paragraf: eksen üzerindeki iki dış noktada yön aynı; orta dikte ters ve mıknatısa paralel (N’den S’ye).
  guard(a.heading === s.heading, "eksenin iki dış noktasında yön aynı olmalı");
  const up = mrow("above");
  const down = mrow("below");
  guard(up.heading === down.heading && Math.sign(up.b[0]) === Math.sign(sPole(up.poles).x - nPole(up.poles).x), "orta dikte yön N’den S’ye olmalı");
  guard(up.heading !== a.heading, "orta dikteki yön eksendekinin tersi olmalı");
  // Paragraf: kutuplar ters çevrilince aynı noktada yön ters döner.
  const r = mrow("reversed");
  guard(close(r.b[0], -a.b[0]) && close(r.b[1], -a.b[1]), "ters çubukta aynı noktadaki alan tam ters olmalı");
  // Paragraf: N–S karşılıklıda orta nokta N’den S’ye; N–N karşılıklıda B = 0.
  const ns = mrow("facingNS");
  const nearN = ns.poles.filter(({ s: k }) => k === 1).reduce((b, q) => (Math.abs(q.x) < Math.abs(b.x) ? q : b));
  guard(Math.sign(ns.b[0]) === Math.sign(ns.p[0] - nearN.x), "karşılıklı N–S arasında alan N’den S’ye gitmeli");
  guard(mrow("facingNN").heading === "yön yok", "karşılıklı eş N uçlarının ortasında alan sıfır olmalı");
}
const axisN = mrow("axisN");
const above = mrow("above");
const facingNS = mrow("facingNS");

export const magnetSection214: GuideSection = {
  title: "Pusulanın N ucunu noktadaki alan yönünden oku",
  paragraphs: [
    `Pusula iğnesinin N ucu bulunduğu noktadaki toplam B yönünü gösterir. Tablo rehberin atölyesindeki iki kutuplu modelle hesaplanmıştır: her kutup nokta kaynak gibi alınır, N kutbunun alanı dışa, S kutbununki içe yönelir ve uzaklığın karesiyle azalır. Noktalar mıknatıs ekseni ve orta dik üzerinde seçildiği için yön simetriden de okunur. N solda iken N ucunun dışındaki pusula ${axisN.heading}, yani N’den uzağa döner; S ucunun dışındaki pusula da S’ye doğru, aynı yöne bakar. Orta noktanın üstünde ve altında ise pusula ${above.heading}, N’den S’ye doğru ve mıknatısa paralel durur: eksendeki yönün tersidir. Dünya alanı ve pusulanın kendi alanı ihmal edilir; mıknatısın içindeki S’den N’ye kapanan kısım bu tabloya girmez.`,
    `Çubuk ters çevrilince aynı noktadaki alan tam tersine döner. İki çubukta karşılıklı uçlar zıt kutupsa aradaki orta noktada alan N ucundan S ucuna (${facingNS.heading}) yönelir. Karşılıklı uçlar eş kutupsa ve çubuklar özdeşse iki etki orta noktada birbirini sıfırlar: manyetik alanın belirlediği tek bir yön yoktur, pusula gerçekte Dünya alanı gibi kalan etkiye uyar. Pusulanın gösterdiği yön çekme ve itme ilişkisiyle de uyumludur: pusula iğnesi de küçük bir mıknatıstır; N ucu yakındaki S kutbuna çekilir, N kutbundan itilir.`,
  ],
  table: magnetTable214,
};

/** Örnek 1: doğu–batı çubuk, doğu ucunun ötesindeki pusula batıyı gösteriyor (sol = batı, sağ = doğu). */
export const unknownBarCase214 = (() => {
  const options = (["N", "S"] as const).map((left) => {
    const poles = barPoles214(left, -2, 2);
    return { west: left, east: left === "N" ? "S" : "N", axis: heading214(fieldAt214(poles, [4, 0])), above: heading214(fieldAt214(poles, [0, 2])) };
  });
  const chosen = options.filter(({ axis }) => axis === "sola");
  guard(chosen.length === 1, "doğu ucunun ötesinde batıyı gösteren tek düzen olmalı");
  return chosen[0];
})();
const compassDir = (h: Heading214) => ({ sağa: "doğu", sola: "batı", yukarı: "kuzey", aşağı: "güney", "yön yok": "belirli yön yok" })[h];
/** Örnek 2: özdeş iki çubuk, karşılıklı N–N; sonra sağdaki ters çevriliyor. */
export const flipCase214 = (() => {
  const before = mrow("facingNN");
  const flipped = [...barPoles214("S", -5, -1), ...barPoles214("S", 1, 5)];
  const after = fieldAt214(flipped, [0, 0]);
  return { before: before.heading, after: heading214(after), facing: flipped.filter(({ x }) => Math.abs(x) === 1).map(({ x, s }) => ({ x, pole: s === 1 ? "N" : "S" })) };
})();
guard(flipCase214.before === "yön yok" && flipCase214.after === "sağa", "N–N düzeni sıfır, ters çevrilmiş düzen sağa alan vermeli");

export const magnetExamples214: WorkedExample[] = [
  {
    title: "Pusuladan kutup adını çıkar",
    prompt: "Kutup adları silinmiş bir çubuk mıknatıs yatay masada doğu–batı doğrultusunda duruyor. Mıknatısın doğu ucunun biraz ötesinde, mıknatıs ekseni üzerindeki küçük pusulanın N ucu batıyı (mıknatısa doğru) gösteriyor. Dünya alanı ve pusulanın mıknatısa etkisi ihmal ediliyor. (a) Doğu ucu hangi kutuptur? (b) Pusula mıknatısın orta noktasının tam kuzeyine taşınırsa N ucu hangi yönü gösterir?",
    strategy: "Pusulanın N ucu B yönünü gösterir. Dış bölgede B, N’den çıkıp S’ye girer; orta dikte ise mıknatısa paralel ve N’den S’ye doğrudur.",
    steps: [
      { label: "B yönü", expression: "Doğu ucunun ötesinde B batıya, mıknatısa doğru", explanation: "Pusulanın N ucu bu noktadaki alanın yönündedir." },
      { label: "Kutup", expression: `Alan uca giriyor ⇒ doğu ucu ${unknownBarCase214.east}, batı ucu ${unknownBarCase214.west}`, explanation: "Dış bölgede alan çizgileri S kutbuna girer; N kutbundan uzaklaşırdı." },
      { label: "Orta dik", expression: `Kuzeydeki noktada B: ${unknownBarCase214.west} → ${unknownBarCase214.east}, yani ${compassDir(unknownBarCase214.above)}`, explanation: "Orta noktanın yanında çizgi mıknatısa paralel geçer ve N’den S’ye yönelir." },
    ],
    answer: `(a) Doğu ucu ${unknownBarCase214.east} kutbudur. (b) Pusulanın N ucu ${compassDir(unknownBarCase214.above)} yönünü gösterir.`,
    check: "Pusulanın N ucu kendisi de bir N kutbudur ve doğu ucuna çekilmektedir; zıt kutuplar çektiği için doğu ucunun S olması aynı sonucu verir.",
    pitfall: "Pusulanın N ucunun gösterdiği uca N demek. N ucu mıknatısın S kutbuna yönelir; gösterilen uç S’dir.",
  },
  {
    title: "Karşılıklı eş kutuplar ve bir çubuğu ters çevirmek",
    prompt: "Özdeş iki çubuk mıknatıs aynı doğru üzerinde, aralarında boşluk bırakılarak yerleştirilmiştir; karşılıklı uçların ikisi de N kutbudur. Boşluğun tam orta noktasına küçük bir pusula konuyor. Dünya alanı ihmal ediliyor. (a) Orta noktadaki manyetik alan ve pusulanın durumu nedir? (b) Sağdaki çubuk 180° döndürülüp aynı yere konursa pusulanın N ucu hangi yönü gösterir?",
    strategy: "Orta noktada iki çubuğun alanlarını ayrı ayrı yönlendir. Simetrik eş kutuplarda büyüklükler eşit, yönler zıt olur; bir çubuk dönünce karşılıklı uçlar zıt kutup olur.",
    steps: [
      { label: "Soldaki N’nin etkisi", expression: "Orta noktada B sağa (N’den uzağa)", explanation: "Dış bölgede alan N kutbundan dışa yönelir." },
      { label: "Sağdaki N’nin etkisi", expression: "Orta noktada B sola, eşit büyüklükte", explanation: "Özdeş çubuk ve eşit uzaklık; uzak S uçlarının katkıları da simetrik olarak birbirini götürür." },
      { label: "Toplam", expression: "B = 0", explanation: "Manyetik alan pusulaya belirli bir yön göstermez." },
      { label: "Ters çevrilince", expression: `Karşılıklı uçlar: solda N, sağda ${flipCase214.facing.find(({ x }) => x > 0)!.pole} ⇒ B ${flipCase214.after}`, explanation: "Alan soldaki N’den sağdaki S’ye gider; iki katkı artık aynı yöndedir." },
    ],
    answer: `(a) Orta noktada B = 0; mıknatısların belirlediği bir yön yoktur. (b) Pusulanın N ucu ${flipCase214.after}, sağdaki çubuğa (S ucuna) doğru gösterir.`,
    check: "Tablodaki karşılıklı N–S satırı da orta noktada N ucundan S ucuna yönelen alan verir. Pusulanın N ucu S’ye çekilip N’den itildiği için aynı yön çıkar.",
    pitfall: "İki mıknatıs var diye orta noktada alanın iki kat güçlü olacağını düşünmek. Eş kutuplarda katkılar zıt yönlüdür ve simetride birbirini sıfırlar.",
  },
];

export const magnetSupplement214 = {
  title: magnetSection214.title,
  figureTitle: magnetSection214.title,
  paragraphs: magnetSection214.paragraphs,
  summary: "Pusula N ucu = noktadaki B yönü. Eksende uçların dışında: N’den uzağa, S’ye doğru (iki uçta aynı yön). Orta dikte: mıknatısa paralel, N’den S’ye. Çubuk dönerse yön döner. Karşılıklı N–S arası: N’den S’ye; özdeş N–N ortası: B = 0.",
  appendSection: true as const,
  table: magnetTable214,
  examples: magnetExamples214,
};

/* ========== Genleşme: 1 m çubuğun 100 °C’deki uzaması ========== */

/*
 * Boyca uzama katsayıları α (°C⁻¹), oda sıcaklığı civarı, yuvarlatılmış:
 * CRC Handbook of Chemistry and Physics, "Thermal Expansion of Solids"
 * (alüminyum 23,1; bakır 16,5; demir 11,8 ×10⁻⁶ K⁻¹; sıradan soda-kireç
 * camı ≈ 9 ×10⁻⁶ K⁻¹). Değerler yaklaşıktır; alaşım ve sıcaklıkla değişir.
 */
export const expansionCoefficients214 = [
  { material: "Alüminyum", alphaE6: 23 },
  { material: "Bakır", alphaE6: 17 },
  { material: "Demir (çelik)", alphaE6: 12 },
  { material: "Sıradan cam", alphaE6: 9 },
] as const;
export const expansionSource214 = "CRC Handbook of Chemistry and Physics";
/** ΔL = α · L0 · ΔT (metre). */
export const linearExpansion214 = (alpha: number, L0: number, dT: number) => alpha * L0 * dT;
export const rodLength214 = 1;
export const rodDeltaT214 = 100;
export const expansionRows214 = (coeffs = expansionCoefficients214, L0 = rodLength214, dT = rodDeltaT214) => coeffs.map(({ material, alphaE6 }) => {
  const alpha = alphaE6 * 1e-6;
  const dL = linearExpansion214(alpha, L0, dT);
  return { material, alphaE6, alpha, dL, L: L0 + dL, dLcool: linearExpansion214(alpha, L0, -dT), relative: dL / L0 };
});
const expRows = expansionRows214();
const mm = (m: number, d = 2) => num214(m * 1000, d);
export const expansionTable214 = {
  layout: "table" as const,
  headers: ["Malzeme", "α (×10⁻⁶ °C⁻¹, yaklaşık)", `ΔL, ΔT = +${rodDeltaT214} °C (mm)`, "Son boy L (m)", `ΔL, ΔT = −${rodDeltaT214} °C (mm)`],
  rows: expRows.map(({ material, alphaE6, dL, L, dLcool }) => [material, String(alphaE6), mm(dL), num214(L, 4), mm(dLcool)]),
};
// Paragraf: ΔL α ile doğru orantılı; sıralama alüminyum > bakır > demir > cam.
for (let i = 1; i < expRows.length; i += 1) guard(expRows[i].dL < expRows[i - 1].dL && expRows[i].alpha < expRows[i - 1].alpha, "satırlar büyükten küçüğe α ve ΔL sırasında olmalı");
for (const r of expRows) {
  guard(close(r.dL / r.alpha, expRows[0].dL / expRows[0].alpha), "ΔL/α her satırda L0·ΔT olmalı");
  // Paragraf: soğutmada uzama aynı büyüklükte kısalmaya döner.
  guard(close(r.dLcool, -r.dL), "soğutmadaki ΔL ısıtmadakinin tersi olmalı");
  // Paragraf: 1 m ve 100 °C için milimetre cinsinden ΔL, α’nın 10⁻⁶ çarpanının onda biridir.
  guard(close(r.dL * 1000, r.alphaE6 / 10), "1 m ve 100 °C için ΔL (mm) = α(×10⁻⁶)/10 olmalı");
  // Paragraf: bağıl değişim binde birkaç; boy neredeyse aynı kalır.
  guard(r.relative > 0 && r.relative < 0.005, "bağıl değişim binde beşten küçük olmalı");
}
const [al, cu, fe, glass] = expRows;
/** Bimetal: büyük α’lı metal ısıtmada dış (uzun) yayda kalır; şerit küçük α’lı tarafa eğilir. */
export const bimetal214 = (a: { material: string; alpha: number }, b: { material: string; alpha: number }, dT: number) => {
  guard(a.alpha !== b.alpha, "bimetalde katsayılar farklı olmalı");
  guard(dT !== 0, "bimetalde sıcaklık değişmeli");
  const bigger = a.alpha > b.alpha ? a : b;
  const smaller = bigger === a ? b : a;
  // Isıtmada daha çok uzayan (büyük α) dışta; soğutmada daha çok kısalan (yine büyük α) içte kalır.
  const outer = dT > 0 ? bigger : smaller;
  const inner = outer === a ? b : a;
  return { outer: outer.material, inner: inner.material, bendsToward: inner.material };
};
export const bimetalHeat214 = bimetal214(al, fe, rodDeltaT214);
export const bimetalCool214 = bimetal214(al, fe, -rodDeltaT214);
guard(bimetalHeat214.outer === al.material && bimetalCool214.outer === fe.material, "Al–demir şerit ısınınca Al, soğuyunca demir dışta kalmalı");

export const expansionSection214: GuideSection = {
  title: "Aynı çubuk, farklı malzeme: 100 °C’de kaç milimetre uzar?",
  paragraphs: [
    `Boyca uzama ΔL = α·L0·ΔT ile hesaplanır. Tablodaki α değerleri ${expansionSource214} tablosundan yuvarlatılmış, oda sıcaklığı civarı yaklaşık değerlerdir ve birimleri °C⁻¹’dir; alaşım, cam türü ve sıcaklık aralığı değişince bir miktar farklı olabilirler. Her satırda L0 = ${rodLength214} m ve ΔT = +${rodDeltaT214} °C alınmıştır. Alüminyum için ΔL = ${al.alphaE6}×10⁻⁶ · ${rodLength214} · ${rodDeltaT214} = ${num214(al.dL, 4)} m = ${mm(al.dL)} mm, son boy ${num214(al.L, 4)} m olur. ΔL, α ile doğru orantılı olduğundan sıralama alüminyum > bakır > demir > cam biçimindedir: aynı koşulda demir ${mm(fe.dL)} mm, sıradan cam ${mm(glass.dL)} mm uzar.`,
    `Bu koşulda milimetre cinsinden ΔL, α’nın 10⁻⁶ çarpanının onda biridir; bağıl değişim binde birkaçtır, yani çubuk gözle fark edilmeyecek kadar uzar. Aynı çubuk ${rodDeltaT214} °C soğutulursa ΔT negatif olur ve ΔL aynı büyüklükte kısalmaya döner. Alüminyum ve demir bir bimetal şeritte birleştirilirse ısıtmada ${bimetalHeat214.outer.toLocaleLowerCase("tr-TR")} dış yayda kalır ve şerit ${bimetalHeat214.bendsToward.toLocaleLowerCase("tr-TR")} tarafına eğilir; soğutmada ${bimetalCool214.outer.toLocaleLowerCase("tr-TR")} dışta kalır ve yön tersine döner. Bakır–demir (${cu.alphaE6} ile ${fe.alphaE6}) çiftinde fark daha küçük olduğundan aynı sıcaklık değişiminde bükülme daha azdır. Tablo 0–4 °C aralığındaki suya uygulanmaz; suyun bu aralıktaki özel davranışı ayrı bölümde anlatılır.`,
  ],
  table: expansionTable214,
};

/** Örnek 1: eşit uzama için uzunluk oranı. */
export const equalExpansionCase214 = (() => {
  const LFe = 2.3;
  const dT = 50;
  const LAl = (LFe * fe.alpha) / al.alpha;
  return { LFe, dT, LAl, dL: linearExpansion214(fe.alpha, LFe, dT) };
})();
guard(close(linearExpansion214(al.alpha, equalExpansionCase214.LAl, equalExpansionCase214.dT), equalExpansionCase214.dL), "eşit uzama örneği iki çubukta aynı ΔL vermeli");
/** Örnek 2: bakır–demir şerit soğutuluyor. */
export const stripCase214 = (() => {
  const L0 = 0.1;
  const dT = -50;
  const bend = bimetal214(cu, fe, dT);
  const dCu = linearExpansion214(cu.alpha, L0, dT);
  const dFe = linearExpansion214(fe.alpha, L0, dT);
  return { L0, dT, bend, dCu, dFe, gap: Math.abs(dCu - dFe) };
})();
guard(stripCase214.bend.inner === cu.material && stripCase214.dCu < stripCase214.dFe, "soğuyan bakır–demir şeritte bakır daha çok kısalıp içte kalmalı");
const eq = equalExpansionCase214;
const st = stripCase214;

export const expansionExamples214: WorkedExample[] = [
  {
    title: "Eşit uzama için uzunlukları ters orantıla",
    prompt: `Demir bir çubuğun ilk boyu ${num214(eq.LFe)} m’dir. Alüminyum bir çubuk aynı sıcaklık artışında demirle tam aynı miktarda uzayacak biçimde kesilecektir. α_demir ≈ ${fe.alphaE6}×10⁻⁶ °C⁻¹, α_alüminyum ≈ ${al.alphaE6}×10⁻⁶ °C⁻¹ (yaklaşık değerler) ve katsayılar sabit kabul ediliyor. Alüminyum çubuğun ilk boyu kaç m olmalıdır? Sıcaklık ${eq.dT} °C artarsa her çubuk kaç mm uzar?`,
    strategy: "ΔL = α·L0·ΔT iki çubukta eşitlenir; ΔT ortak olduğu için sadeleşir ve α·L0 çarpımı eşit kalır.",
    steps: [
      { label: "Eşitle", expression: "α_demir · L_demir · ΔT = α_alüminyum · L_alüminyum · ΔT", explanation: "Aynı ΔT iki tarafta da vardır ve sadeleşir." },
      { label: "Uzunluk", expression: `L_alüminyum = ${num214(eq.LFe)} · ${fe.alphaE6}/${al.alphaE6} = ${num214(eq.LAl)} m`, explanation: "Katsayısı büyük olan malzemeden daha kısa çubuk aynı uzamayı verir." },
      { label: "Uzama", expression: `ΔL = ${fe.alphaE6}×10⁻⁶ · ${num214(eq.LFe)} · ${eq.dT} = ${num214(eq.dL, 6)} m = ${mm(eq.dL)} mm`, explanation: "Metre ile çalışıp sonucu sonda milimetreye çevir." },
    ],
    answer: `Alüminyum çubuk ${num214(eq.LAl)} m olmalıdır; ${eq.dT} °C artışta ikisi de ${mm(eq.dL)} mm uzar.`,
    check: `${al.alphaE6}×10⁻⁶ · ${num214(eq.LAl)} · ${eq.dT} = ${num214(linearExpansion214(al.alpha, eq.LAl, eq.dT), 6)} m; demirdeki uzamayla aynıdır.`,
    pitfall: "Daha çok genleşen malzemeden daha uzun çubuk gerektiğini sanmak. Eşit ΔL için α·L0 sabit kalır; α büyürse L0 küçülür.",
  },
  {
    title: "Soğuyan bimetal şerit hangi yana eğilir?",
    prompt: `Bakır ve demir şeritler oda sıcaklığında düz ve eşit boyda (${num214(st.L0 * 100)} cm) olacak biçimde boydan boya perçinlenmiştir. Şerit ${num214(-st.dT)} °C soğutuluyor. α_bakır ≈ ${cu.alphaE6}×10⁻⁶ °C⁻¹, α_demir ≈ ${fe.alphaE6}×10⁻⁶ °C⁻¹ (yaklaşık değerler). (a) Şerit hangi metalin tarafına eğilir? (b) İki şerit ayrı ve serbest olsaydı boyları arasında kaç mm fark oluşurdu?`,
    strategy: "Soğutmada ΔT negatiftir; büyük α’lı metal daha çok kısalmak ister ve yayın iç (kısa) tarafına geçer. Serbest boy farkı iki ΔL’nin farkıdır.",
    steps: [
      { label: "Kısalmalar", expression: `ΔL_bakır = ${cu.alphaE6}×10⁻⁶ · ${num214(st.L0)} · (${num214(st.dT)}) = ${num214(st.dCu, 7)} m = ${mm(st.dCu, 4)} mm; ΔL_demir = ${num214(st.dFe, 7)} m = ${mm(st.dFe, 4)} mm`, explanation: "İkisi de negatiftir; bakırın kısalması daha büyüktür." },
      { label: "Eğilme yönü", expression: `İç yayda ${st.bend.inner.toLocaleLowerCase("tr-TR")}, dış yayda ${st.bend.outer.toLocaleLowerCase("tr-TR")}`, explanation: "Daha çok kısalan metal kısa olan iç yaya yerleşir; şerit onun tarafına kıvrılır." },
      { label: "Serbest fark", expression: `|${mm(st.dCu, 4)} − (${mm(st.dFe, 4)})| = ${mm(st.gap, 4)} mm`, explanation: "Perçinli şeritte bu küçük uyuşmazlık düz kalmayı engeller ve bükülmeye dönüşür." },
    ],
    answer: `(a) Şerit ${st.bend.bendsToward.toLocaleLowerCase("tr-TR")} tarafına eğilir. (b) Serbest boylar arasında ${mm(st.gap, 4)} mm fark oluşurdu.`,
    check: `Isıtmada yön tersine döner: bakır dışta kalır, şerit demire doğru eğilir. Fark ${num214(st.L0)} · ${cu.alphaE6 - fe.alphaE6}×10⁻⁶ · ${num214(-st.dT)} = ${num214(st.gap, 7)} m olarak da tek adımda bulunur.`,
    pitfall: "Isıtmadaki kuralı (büyük α dışta) soğutmaya aynen taşımak. Soğutmada büyük α’lı metal daha çok kısalır ve içte kalır.",
  },
];

export const expansionSupplement214 = {
  title: expansionSection214.title,
  figureTitle: expansionSection214.title,
  paragraphs: expansionSection214.paragraphs,
  summary: `ΔL = α·L0·ΔT. L0 = ${rodLength214} m, ΔT = ${rodDeltaT214} °C: ${expRows.map(({ material, dL }) => `${material.toLocaleLowerCase("tr-TR")} ${mm(dL)} mm`).join(", ")} (α yaklaşık, ${expansionSource214}). Soğutmada aynı büyüklükte kısalma. Bimetal ısınınca büyük α dışta, soğuyunca içte.`,
  appendSection: true as const,
  table: expansionTable214,
  examples: expansionExamples214,
};

export const depth214Supplements = {
  mercekler: [lensSupplement214],
  "prizmalar-renkler": [filterSupplement214],
  "miknatislar-ve-manyetik-alan": [magnetSupplement214],
  genlesme: [expansionSupplement214],
};
