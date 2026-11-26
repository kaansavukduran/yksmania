import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Türkçe cümlede anlam ve paragraf yapısı derinleştirmesi (0.227).
 * Kabul edilmiş rehberler değişmez; tablo bölümü, iki özgün çözümlü örnek ve
 * bölüm çizimi görüntüleme katmanında eklenir. Bütün cümleler ve paragraflar
 * bu tur için özgün yazılmıştır (yayımlanmış metin ya da sınav parçası
 * değildir). Cümle rolleri veri olarak tutulur; giriş, sonuç, ana düşünce,
 * bölme sınırı ve akışı bozan cümle bu verilerden kuralla üretilir ve metin
 * içindeki her genel yargı modül yüklenirken denetlenir.
 */

const guard = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depth227: veri bu yargıyı artık desteklemiyor: ${claim}`);
};
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];
/** Cümle numarası (0 tabanlı sıra → Roma rakamı). */
export const roman227 = (i: number) => {
  const r = ROMAN[i];
  if (!r) throw new Error(`depth227: ${i} için Roma rakamı tanımlı değil`);
  return r;
};
const joinTr = (xs: readonly string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} ve ${xs.at(-1)}`);
const upperFirst = (s: string) => s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1);
const q = (s: string) => `“${s}”`;
const numbered = (texts: readonly string[]) => texts.map((t, i) => `(${roman227(i)}) ${t}`).join(" ");

/* =================================================================
 * Ortak paragraf modeli: cümle, gönderme bağı ve çıkarma denemesi
 * ================================================================= */

/** Gönderme bağı: cümledeki `phrase`, `to` numaralı cümledeki `key` bilgisine döner. */
export interface Dep227 {
  phrase: string;
  to: number;
  key: string;
}
export interface PSent227 {
  text: string;
  deps: Dep227[];
}
const depText = (d: Dep227) => `${q(d.phrase)} → ${roman227(d.to)} (${q(d.key)})`;
/** Her bağın sözü kendi cümlesinde, öncül bilgisi hedef cümlede geçmeli ve hedef daha önce gelmelidir. */
export const depsHold227 = (sents: readonly PSent227[]) =>
  sents.every((s, i) => s.deps.every((d) => s.text.includes(d.phrase) && d.to < i && sents[d.to].text.includes(d.key)));
/** `k` numaralı cümle çıkarılınca öncülsüz kalan bağlar. */
export const orphans227 = (sents: readonly PSent227[], k: number) =>
  sents.flatMap((s, i) => (i === k ? [] : s.deps.filter((d) => d.to === k).map((d) => ({ i, phrase: d.phrase }))));
const orphanText = (os: { i: number; phrase: string }[]) => joinTr(os.map(({ i, phrase }) => `${roman227(i)}. cümledeki ${q(phrase)}`));

/* =================================================================
 * 1 · Cümlede anlam: ilişki türü, işaret ve sınama sorusu
 * ================================================================= */

export type Relation227 = "neden-sonuç" | "amaç" | "koşul" | "karşıtlık" | "çıkarım" | "karşılaştırma" | "öznel yargı" | "nesnel yargı";
/** İki yargı arasındaki bağ ekseni (dersin sırasıyla). */
export const LINK227 = ["neden-sonuç", "amaç", "koşul", "karşıtlık", "çıkarım"] as const satisfies readonly Relation227[];
/** Tek yargının türü ekseni. */
export const KIND227 = ["öznel yargı", "nesnel yargı"] as const satisfies readonly Relation227[];
/** Dersin bölümlerindeki ayrımlardan türetilmiş sınama soruları. */
export const TESTS227: Record<Relation227, string> = {
  "neden-sonuç": "İlk yargı gerçekleşmiş bir etken olarak ikincisinin meydana gelişini açıklıyor mu?",
  amaç: "İlk yargı, ikinci yargıdaki eylemle ulaşılmak istenen hedef mi?",
  koşul: "İkinci yargının gerçekleşmesi, gerçekleştiği bildirilmeyen ilk duruma mı bağlanıyor?",
  karşıtlık: "İkinci yargı, ilkinin doğurduğu beklentiyi bozuyor mu?",
  çıkarım: "İlk yargı görülen bir işaret, ikincisi bu işaretten varılan sonuç mu?",
  karşılaştırma: "İki varlık aynı ölçüt üzerinden ilişkilendiriliyor mu?",
  "öznel yargı": "Yargı kişisel beğeni, duygu ya da değerlendirme mi taşıyor?",
  "nesnel yargı": "Yargı kişisel beğeniye dayanmadan sayım ya da ölçümle denetlenebilir mi?",
};

export interface MeaningRow227 {
  relation: Relation227;
  /** Bu ilişkide görülebilen işaretler (tek başına kanıt değildir). */
  signals: string[];
  /** Örnekte geçen işaret: `signal` listede, `text` cümlede bulunur. */
  cue: { signal: string; text: string };
  sentence: string;
  /** Yargılar, cümledeki sırayla. */
  clauses: string[];
  /** Hangi yargının gerçekleştiği bildiriliyor (clauses ile aynı sırada). */
  realized: boolean[];
  /** Sınama sorularından “evet” alanlar. */
  yes: Relation227[];
}
export const meaningRows227: MeaningRow227[] = [
  {
    relation: "neden-sonuç", signals: ["için", "-dığı için", "çünkü", "bu yüzden"], cue: { signal: "-dığı için", text: "olduğu için" },
    sentence: "Gece don olduğu için fidanların yaprakları karardı.", clauses: ["gece don oldu", "fidanların yaprakları karardı"], realized: [true, true], yes: ["neden-sonuç"],
  },
  {
    relation: "amaç", signals: ["için", "diye", "-mek amacıyla"], cue: { signal: "için", text: "korumak için" },
    sentence: "Fidanları dondan korumak için üstlerini örtüyle kapattık.", clauses: ["fidanları dondan korumak", "üstlerini örtüyle kapattık"], realized: [false, true], yes: ["amaç"],
  },
  {
    relation: "koşul", signals: ["-sa / -se", "-dığı takdirde", "yeter ki"], cue: { signal: "-sa / -se", text: "kurursa" },
    sentence: "Toprak kurursa damla sulama düzeneği kendiliğinden çalışır.", clauses: ["toprak kurur", "düzenek kendiliğinden çalışır"], realized: [false, false], yes: ["koşul"],
  },
  {
    relation: "karşıtlık", signals: ["ama", "fakat", "oysa", "ne var ki"], cue: { signal: "ama", text: "ama" },
    sentence: "Bulutlar kapkara görünüyordu ama tek damla yağmur düşmedi.", clauses: ["bulutlar kapkara görünüyordu", "tek damla yağmur düşmedi"], realized: [true, true], yes: ["karşıtlık"],
  },
  {
    relation: "çıkarım", signals: ["demek ki", "öyleyse", "anlaşılan"], cue: { signal: "demek ki", text: "demek ki" },
    sentence: "Yerdeki taşlar ıslak; demek ki gece yağmur yağmış.", clauses: ["yerdeki taşlar ıslak", "gece yağmur yağmış"], realized: [true, true], yes: ["çıkarım"],
  },
  {
    relation: "karşılaştırma", signals: ["daha", "-dan / -den", "kadar", "en"], cue: { signal: "daha", text: "daha hızlı" },
    sentence: "Kumlu toprak, killi topraktan daha hızlı su geçirir.", clauses: ["kumlu toprak killi topraktan daha hızlı su geçirir"], realized: [true], yes: ["karşılaştırma", "nesnel yargı"],
  },
  {
    relation: "öznel yargı", signals: ["güzel", "keyifli", "etkileyici", "sıkıcı"], cue: { signal: "keyifli", text: "keyifli" },
    sentence: "Sabah yürüyüşü, günün en keyifli saatidir.", clauses: ["sabah yürüyüşü günün en keyifli saatidir"], realized: [true], yes: ["öznel yargı"],
  },
  {
    relation: "nesnel yargı", signals: ["sayı ya da ölçü bilgisi", "oluşur", "bulunur"], cue: { signal: "oluşur", text: "oluşur" },
    sentence: "Bu atlas otuz iki haritadan oluşur.", clauses: ["bu atlas otuz iki haritadan oluşur"], realized: [true], yes: ["nesnel yargı"],
  },
];

/** Kural: iki yargılı cümlede bağ ekseninde tek “evet”; tek yargıda önce karşılaştırma, yoksa tür ekseni. */
export const classify227 = (yes: readonly Relation227[], clauses: number): Relation227 => {
  const pick = (axis: readonly Relation227[]) => {
    const hits = axis.filter((r) => yes.includes(r));
    if (hits.length !== 1) throw new Error(`depth227: ${axis.join("/")} ekseninde tek “evet” yok: ${yes.join(", ")}`);
    return hits[0];
  };
  if (clauses === 2) return pick(LINK227);
  if (yes.includes("karşılaştırma")) return "karşılaştırma";
  return pick(KIND227);
};
const kindOf = (yes: readonly Relation227[]) => KIND227.find((k) => yes.includes(k));
const rowOf = (r: Relation227) => meaningRows227.find(({ relation }) => relation === r)!;
const twoRows = meaningRows227.filter(({ clauses }) => clauses.length === 2);
const oneRows = meaningRows227.filter(({ clauses }) => clauses.length === 1);
/** Aynı işaretin listede geçtiği ilişkiler. */
export const relationsWithSignal227 = (signal: string) => meaningRows227.filter(({ signals }) => signals.includes(signal)).map(({ relation }) => relation);
const sharedFor = relationsWithSignal227("için");
const [cause, goal, cond, comparison, subjective] = (["neden-sonuç", "amaç", "koşul", "karşılaştırma", "öznel yargı"] as const).map(rowOf);

guard(meaningRows227.every((r) => classify227(r.yes, r.clauses.length) === r.relation), "her satırın ilişkisi sınama sorusu kuralıyla aynı çıkar");
guard(meaningRows227.every(({ cue, signals, sentence }) => signals.includes(cue.signal) && sentence.includes(cue.text)), "her örnekteki işaret listede ve cümlede geçer");
guard(meaningRows227.every(({ clauses, realized }) => clauses.length === realized.length), "her yargının gerçekleşme bilgisi var");
guard(twoRows.length === LINK227.length && twoRows.every((r) => LINK227.filter((l) => r.yes.includes(l)).length === 1), "iki yargılı satırların her birinde bağ ekseninde yalnız bir “evet” var");
guard(oneRows.every(({ yes }) => KIND227.filter((k) => yes.includes(k)).length === 1), "tek yargılı her satır öznel ya da nesneldir, ikisi birden değil");
guard(sharedFor.length === 2 && sharedFor.includes("neden-sonuç") && sharedFor.includes("amaç"), "“için” işareti neden-sonuç ve amaç satırlarında birlikte geçer");
guard(goal.realized[0] === false && goal.realized[1] === true, "amaç satırında eylem gerçekleşmiş, hedefe ulaşıldığı bildirilmemiştir");
guard(cause.realized.every(Boolean), "neden-sonuç satırında iki yargı da gerçekleşmiştir");
guard(cond.realized.every((x) => !x), "koşul satırında iki yargının da gerçekleştiği bildirilmez");
guard(kindOf(comparison.yes) === "nesnel yargı" && kindOf(subjective.yes) === "öznel yargı", "karşılaştırma satırı nesnel, öznel satır kişisel değerlendirmedir");

const meaningTable = {
  layout: "table" as const,
  headers: ["İlişki", "Olası işaret", "Özgün örnek", "Yargılar", "Sınama sorusu"],
  rows: meaningRows227.map((r) => [
    upperFirst(r.relation),
    r.signals.join(", "),
    r.sentence,
    r.clauses.length === 2 ? `1: ${r.clauses[0]} · 2: ${r.clauses[1]}` : `tek yargı: ${r.clauses[0]}`,
    TESTS227[r.relation],
  ]),
};

export const meaningSection227: GuideSection = {
  title: "İlişkiyi işaretle değil sınama sorusuyla adlandır",
  paragraphs: [
    `Tablodaki ${meaningRows227.length} örnek cümlenin ${twoRows.length} tanesi iki yargıdan, ${oneRows.length} tanesi tek yargıdan kurulur. İki yargılı cümlede önce yargıları ayrı yaz, sonra ${joinTr(LINK227.map((r) => r))} için verilen ${LINK227.length} sınama sorusunu sırayla sor. Tablodaki her iki yargılı örnekte bu sorulardan yalnız biri “evet” alır; ilişki adı o sorudan gelir. “Olası işaret” sütunu yalnız ipucudur.`,
    `“İçin” işareti ${joinTr(sharedFor)} satırlarının ikisinde de görülür. ${q(cause.sentence)} cümlesinde ${q(cause.clauses[0])} gerçekleşmiş etkendir. ${q(goal.sentence)} cümlesinde ise ${q(goal.clauses[0])} ulaşılmak istenen hedeftir ve fidanların korunup korunmadığı söylenmez. ${q(cond.sentence)} cümlesi de ne toprağın kuruduğunu ne düzeneğin çalıştığını bildirir; yalnız bir şart kurar.`,
    `Tek yargılı satırlarda bağ yerine yargının kendisi sınanır. Kişisel beğeni taşıyan yargı öznel, sayım ya da ölçümle denetlenebilen yargı nesnel türdedir. ${q(comparison.sentence)} hem karşılaştırma hem nesnel yargıdır: karşılaştırma, ölçütün ne olduğunu; nesnellik, o ölçütün denetlenip denetlenemeyeceğini söyler. İki eksen birbirini dışlamaz. Nesnel türde olmak da yargının doğrulandığı anlamına gelmez.`,
  ],
  table: meaningTable,
};

/* Örnek 1: aynı olay üç ilişkide; gerçekleşme bilgisi. */
export interface SailSent227 {
  label: string;
  sentence: string;
  clauses: [string, string];
  realized: [boolean, boolean];
  yes: Relation227[];
}
export const sailSents227: SailSent227[] = [
  { label: "a", sentence: "Rüzgâr sertleştiği için yelkenli limana döndü.", clauses: ["rüzgâr sertleşti", "yelkenli limana döndü"], realized: [true, true], yes: ["neden-sonuç"] },
  { label: "b", sentence: "Limana erken dönmek için yelkenli rotasını kısalttı.", clauses: ["limana erken dönmek", "yelkenli rotasını kısalttı"], realized: [false, true], yes: ["amaç"] },
  { label: "c", sentence: "Rüzgâr sertleşirse yelkenli limana döner.", clauses: ["rüzgâr sertleşir", "yelkenli limana döner"], realized: [false, false], yes: ["koşul"] },
];
/** Limana dönüşün gerçekleştiğini bildiren cümleler: “limana” geçen yargı gerçekleşmiş olmalı. */
export const returnReported227 = sailSents227.filter(({ clauses, realized }) => clauses.some((c, i) => c.includes("limana") && realized[i]));
const sailRel = sailSents227.map(({ yes }) => classify227(yes, 2));

guard(returnReported227.length === 1 && returnReported227[0].label === "a", "limana dönüş yalnız (a) cümlesinde gerçekleşmiş olarak bildirilir");
guard(sailSents227.every(({ clauses }) => clauses.some((c) => c.includes("limana"))), "üç cümlede de limana dönüş söz konusudur");

/* Örnek 2: karşılaştırma ve öznellik iki ayrı eksen. */
export interface PathSent227 {
  label: string;
  sentence: string;
  /** Karşılaştırma ölçütü (yoksa null) ve ölçülebilir olup olmadığı. */
  criterion: string | null;
  measurable: boolean;
}
export const pathSents227: PathSent227[] = [
  { label: "I", sentence: "Kuzey patikası güney patikasından iki kilometre daha kısadır.", criterion: "uzunluk", measurable: true },
  { label: "II", sentence: "Kuzey patikası güney patikasından daha keyiflidir.", criterion: "keyif", measurable: false },
  { label: "III", sentence: "Kuzey patikası çok güzeldir.", criterion: "güzellik", measurable: false },
];
/** Karşılaştırma: iki patika aynı cümlede aynı ölçüte bağlanır (“-dan … daha”). */
export const isComparison227 = (s: PathSent227) => s.sentence.includes("patikasından") && s.sentence.includes("daha");
export const pathYes227 = (s: PathSent227): Relation227[] => [...(isComparison227(s) ? (["karşılaştırma"] as const) : []), s.measurable ? "nesnel yargı" : "öznel yargı"];
const comparisons = pathSents227.filter(isComparison227);
const subjectivePaths = pathSents227.filter((s) => kindOf(pathYes227(s)) === "öznel yargı");
const labels = (xs: readonly { label: string }[]) => joinTr(xs.map(({ label }) => label));

guard(comparisons.length === 2 && subjectivePaths.length === 2 && comparisons.filter((s) => subjectivePaths.includes(s)).length === 1, "iki karşılaştırmadan biri öznel; öznel iki yargıdan biri karşılaştırma değildir");

export const meaningExamples227: WorkedExample[] = [
  {
    title: "Aynı dönüş üç ilişkide: hangisi gerçekleşmiş?",
    prompt: `Üç cümle veriliyor: ${sailSents227.map(({ label, sentence }) => `(${label}) ${q(sentence)}`).join(" ")} Her cümlede iki yargı arasındaki ilişkiyi sınama sorusuyla adlandır. Hangi cümlede yelkenlinin limana döndüğü kesin olarak bildirilir?`,
    strategy: "Her cümleyi iki yargıya ayır. Sınama sorusunu sor, sonra limana dönüşü anlatan yargının gerçekleşmiş olarak bildirilip bildirilmediğine bak.",
    steps: [
      ...sailSents227.map((s, i) => ({
        label: `(${s.label})`,
        expression: `1: ${s.clauses[0]} · 2: ${s.clauses[1]} ⇒ ${sailRel[i]}`,
        explanation: `${TESTS227[sailRel[i]]} Evet. Gerçekleşen yargı: ${s.realized.some(Boolean) ? s.clauses.filter((_, k) => s.realized[k]).map(q).join(", ") : "yok"}.`,
      })),
      { label: "Karar", explanation: `Limana dönüş yalnız (${returnReported227.map(({ label }) => label).join(", ")}) cümlesinde olmuş bir olaydır. (b) dönüşü ulaşılmak istenen hedef olarak sunar, (c) dönüşü gerçekleşmemiş bir şarta bağlar.` },
    ],
    answer: `(a) ${sailRel[0]}, (b) ${sailRel[1]}, (c) ${sailRel[2]}. Limana döndüğü kesin olarak yalnız (${returnReported227[0].label}) cümlesinde bildirilir.`,
    check: "(b) cümlesinde gerçekleşen yalnız rotanın kısaltılmasıdır; (c) cümlesinde hiçbir yargı gerçekleşmiş olarak verilmez.",
    pitfall: "“İçin” ya da “limana döner” sözünü görüp olayın gerçekleştiğine karar vermek. Amaç hedefi, koşul şartı bildirir; gerçekleşmeyi ayrıca ara.",
  },
  {
    title: "Karşılaştırma öznel de nesnel de olabilir",
    prompt: `${pathSents227.map(({ label, sentence }) => `${label}. ${q(sentence)}`).join(" ")} Bu yargılardan hangileri karşılaştırma bildirir? Hangileri öznel, hangileri nesneldir?`,
    strategy: "İki ayrı soru sor: iki varlık aynı ölçütle ilişkilendiriliyor mu; ölçüt kişisel beğeni mi, ölçülebilir bir nicelik mi?",
    steps: [
      ...pathSents227.map((s) => ({
        label: s.label,
        expression: `${isComparison227(s) ? `karşılaştırma (ölçüt: ${s.criterion})` : "karşılaştırma yok"} · ${kindOf(pathYes227(s))}`,
        explanation: s.measurable ? `${upperFirst(s.criterion!)} ölçülerek denetlenebilir; kişisel beğeniye dayanmaz.` : `${upperFirst(s.criterion!)} kişiden kişiye değişen bir değerlendirmedir.`,
      })),
      { label: "Eksenleri ayır", explanation: "Karşılaştırma bir anlatım ilişkisidir; öznel ya da nesnel olmak yargının denetlenebilirliğidir. Bir yargı ikisini birlikte taşıyabilir." },
    ],
    answer: `Karşılaştırma: ${labels(comparisons)}. Öznel: ${labels(subjectivePaths)}. Nesnel: ${labels(pathSents227.filter((s) => !subjectivePaths.includes(s)))}.`,
    check: `${comparisons.filter((s) => subjectivePaths.includes(s)).map(({ label }) => label).join("")} hem karşılaştırma hem öznel yargıdır; bu yüzden etiketler aynı kutuda yarışmaz.`,
    pitfall: "Karşılaştırma bildiren her cümleyi nesnel saymak ya da öznel bir cümlenin karşılaştırma olamayacağını düşünmek.",
  },
];

export const meaningSupplement227 = {
  title: meaningSection227.title,
  figureTitle: meaningSection227.title,
  paragraphs: meaningSection227.paragraphs,
  summary: `Önce yargıları ayır, sonra sına: gerçekleşmiş etken → neden-sonuç; istenen hedef → amaç; gerçekleşmemiş şart → koşul; bozulan beklenti → karşıtlık; işaretten sonuç → çıkarım. “İçin” iki ilişkide de geçer. Karşılaştırma ile öznel/nesnel ayrı eksendir.`,
  appendSection: true as const,
  table: meaningTable,
  examples: meaningExamples227,
};

/* =================================================================
 * 2 · Paragrafa giriş: giriş, gelişme, sonuç
 * ================================================================= */

export type Structure227 = "giriş" | "gelişme" | "sonuç";
export interface StructSent227 extends PSent227 {
  func: string;
  /** Kapanış bağlayıcısı (varsa cümlenin başında). */
  closer?: string;
}
export const CLOSERS227 = ["Böylece", "Bu sayede", "Sonuç olarak"] as const;
export const structSents227: StructSent227[] = [
  { text: "Okulumuzun bahçesine geçen ay küçük bir kompost kutusu kuruldu.", deps: [], func: "konuyu açan olay" },
  { text: "Bu kutuyla kantindeki meyve kabuklarını çöpe göndermeden değerlendirmek amaçlanıyor.", deps: [{ phrase: "Bu kutuyla", to: 0, key: "kompost kutusu" }], func: "amacı açıklama" },
  { text: "Kabuklar her akşam kutuya atılıyor.", deps: [{ phrase: "Kabuklar", to: 1, key: "meyve kabuklarını" }], func: "uygulama adımı" },
  { text: "Kokmamaları için üstlerine kuru yaprak serpiliyor.", deps: [{ phrase: "üstlerine", to: 2, key: "Kabuklar" }], func: "uygulamanın ayrıntısı" },
  { text: "Örneğin dün toplanan bir sepet yaprak, kutudaki kabukların tamamını örttü.", deps: [{ phrase: "Örneğin", to: 3, key: "kuru yaprak" }], func: "örnek" },
  { text: "Böylece birkaç ay içinde çiçek tarhları için gübre elde edilecek.", deps: [{ phrase: "Böylece", to: 2, key: "kutuya atılıyor" }], func: "uygulamanın sonucunu bağlama", closer: "Böylece" },
];
/** Kural: öncül gerektirmeyen cümle giriş adayıdır; kapanış bağlayıcısıyla başlayan son cümle sonuçtur; kalanlar gelişmedir. */
export const structureRole227 = (s: StructSent227, i: number, n: number): Structure227 =>
  s.deps.length === 0 ? "giriş" : s.closer && s.text.startsWith(s.closer) && i === n - 1 ? "sonuç" : "gelişme";
export const structRoles227 = structSents227.map((s, i) => structureRole227(s, i, structSents227.length));
const introIdx = structRoles227.flatMap((r, i) => (r === "giriş" ? [i] : []));
const closeIdx = structRoles227.flatMap((r, i) => (r === "sonuç" ? [i] : []));
const devIdx = structRoles227.flatMap((r, i) => (r === "gelişme" ? [i] : []));
export const introOrphans227 = orphans227(structSents227, 0);

guard(depsHold227(structSents227), "kompost paragrafındaki her gönderme sözü önceki bir cümlede öncülünü bulur");
guard(introIdx.length === 1 && introIdx[0] === 0, "öncül gerektirmeyen tek cümle I. cümledir");
guard(closeIdx.length === 1 && closeIdx[0] === structSents227.length - 1, "sonuç son cümledir ve kapanış bağlayıcısıyla başlar");
guard(CLOSERS227.some((c) => c === structSents227[closeIdx[0]].closer), "sonuç cümlesinin bağlayıcısı kapanış listesindedir");
guard(introOrphans227.length >= 1, "I. cümle çıkarılınca en az bir gönderme öncülsüz kalır");
guard(structSents227.some((s) => s.func === "örnek" && s.text.startsWith("Örneğin")), "gelişmede “Örneğin” ile başlayan bir örnek cümlesi vardır");

const structTable = {
  layout: "table" as const,
  headers: ["Cümle", "Metin", "Yapıdaki yeri", "İşlevi", "Bağ kanıtı"],
  rows: structSents227.map((s, i) => [roman227(i), s.text, upperFirst(structRoles227[i]), s.func, s.deps.length ? s.deps.map(depText).join("; ") : "bağımsız: öncül gerektirmez"]),
};

export const structureSection227: GuideSection = {
  title: "Giriş, gelişme ve sonucu bağ kanıtıyla ayır",
  paragraphs: [
    `Tablodaki özgün paragraf ${structSents227.length} cümledir: ${numbered(structSents227.map(({ text }) => text))} Her cümlenin yanına yapıdaki yeri, işlevi ve bağ kanıtı yazılmıştır. Bağ kanıtı, cümlenin gönderme sözünün hangi önceki cümlede öncülünü bulduğunu gösterir.`,
    `Giriş adayı kendi başına anlaşılan cümledir: bu paragrafta öncül gerektirmeyen tek cümle ${roman227(introIdx[0])}. cümledir. ${devIdx.map((i) => roman227(i)).join(", ")} numaralı cümlelerin her biri önceki bir bilgiye döner; bu yüzden gelişme bölümünde yer alır. I. cümle çıkarılırsa ${orphanText(introOrphans227)} öncülsüz kalır. Bağımsız olmak giriş için gereklidir ama tek başına yetmez; devamın da o cümleye bağlanması gerekir.`,
    `${roman227(closeIdx[0])}. cümle ${q(structSents227[closeIdx[0]].closer!)} ile önceki uygulamanın sonucunu bağlar. Gelişmedeki ${q("Örneğin")} cümlesi yeni bir konu açmaz; kuru yaprak serpme işlemini somutlaştırır. Yapıdaki yeri sıra numarası değil, cümlenin bütüne katkısı ve bağı belirler.`,
  ],
  table: structTable,
};

/* Örnek 1: karışık sırada verilen cümlelerden giriş. */
export const shuffle227: readonly number[] = [3, 5, 0, 4, 1, 2];
const LETTERS = ["A", "B", "C", "D", "E", "F"];
const letterOf = (orig: number) => LETTERS[shuffle227.indexOf(orig)];
const shuffledText = shuffle227.map((orig, k) => `${LETTERS[k]}) ${q(structSents227[orig].text)}`).join(" ");
const introLetters = shuffle227.flatMap((orig, k) => (structSents227[orig].deps.length === 0 ? [LETTERS[k]] : []));

guard([...shuffle227].sort().join() === structSents227.map((_, i) => i).join(), "karışık sıra her cümleyi bir kez içerir");
guard(introLetters.length === 1 && shuffle227[0] !== 0, "karışık sırada tek giriş adayı vardır ve ilk harf o değildir");

/* Örnek 2: bağımsız iki aday; devam hangisine bağlanıyor? */
export interface Opener227 {
  label: string;
  text: string;
}
export const openers227: Opener227[] = [
  { label: "X", text: "Kuşlar kışın yiyecek bulmakta zorlanır." },
  { label: "Y", text: "Kuşların bir bölümü sonbaharda binlerce kilometre göç eder." },
];
/** Devam: ilk cümlenin “Bu yüzden” sözü girişte bir gerekçe (yiyecek sıkıntısı) ister. */
export const birdTail227: PSent227[] = [
  { text: "Bu yüzden balkonumuza küçük bir yemlik astık.", deps: [] },
  { text: "Yemliğe her sabah buğday ve ayçekirdeği koyuyoruz.", deps: [{ phrase: "Yemliğe", to: 0, key: "yemlik" }] },
  { text: "Birkaç gün içinde serçeler düzenli gelmeye başladı.", deps: [] },
];
export const birdNeed227 = { phrase: "Bu yüzden", key: "yiyecek" } as const;
export const birdFits227 = openers227.filter(({ text }) => text.includes(birdNeed227.key));

guard(birdTail227[0].text.startsWith(birdNeed227.phrase), "devamın ilk cümlesi “Bu yüzden” ile başlar");
guard(depsHold227(birdTail227), "devamdaki gönderme bağları kendi içinde tutarlıdır");
guard(birdFits227.length === 1 && birdFits227[0].label === "X", "devamın istediği gerekçeyi yalnız X verir");

export const structureExamples227: WorkedExample[] = [
  {
    title: "Karışık cümlelerden girişi bul",
    prompt: `Aşağıdaki altı cümle bir paragrafın cümleleridir ama karışık sırada verilmiştir: ${shuffledText} Bu cümlelerden hangisi paragrafın giriş cümlesi olabilir? Diğerleri neden olamaz?`,
    strategy: "Her cümlede gönderme sözünü (bu, örneğin, böylece, zamir eki) ara. Öncülü başka bir cümlede bulunan cümle ilk sıraya konamaz.",
    steps: [
      ...shuffle227.filter((orig) => structSents227[orig].deps.length).map((orig) => ({
        label: letterOf(orig),
        expression: structSents227[orig].deps.map((d) => `${q(d.phrase)} → ${letterOf(d.to)} (${q(d.key)})`).join("; "),
        explanation: "Öncülü başka bir cümlede; ilk sırada okura açıklanmamış bilgi sunar.",
      })),
      { label: introLetters[0], explanation: "Gönderme sözü yok; bahçe, kompost kutusu ve zaman ilk kez tanıtılır. Diğer cümlelerin bağ zinciri bu cümlede başlar." },
    ],
    answer: `${introLetters[0]} cümlesi: ${q(structSents227[introIdx[0]].text)}`,
    check: `${introLetters[0]} ilk sıraya konunca ${letterOf(1)} cümlesindeki ${q(structSents227[1].deps[0].phrase)} öncülünü hemen bulur.`,
    pitfall: "En kısa ya da en genel görünen cümleyi giriş saymak. Önce her cümlenin gönderme sözünün öncülünü ara.",
  },
  {
    title: "İki bağımsız aday: devam hangisini istiyor?",
    prompt: `Bir paragrafın devamı şöyledir: ${q(birdTail227.map(({ text }) => text).join(" "))} Başına hangisi getirilmelidir? ${openers227.map(({ label, text }) => `${label}) ${q(text)}`).join(" ")}`,
    strategy: "İki adayın da kendi başına anlaşılır olduğunu gör. Sonra devamın ilk cümlesindeki bağlayıcının girişten ne istediğini belirle.",
    steps: [
      { label: "Adaylar", explanation: `${joinTr(openers227.map(({ label }) => label))} gönderme sözü taşımaz; ikisi de bağımsızdır, bu yüzden karar devamdan çıkar.` },
      { label: q(birdNeed227.phrase), expression: `${q(birdTail227[0].text)}`, explanation: "Bu yüzden, yemlik asmanın gerekçesini girişte arar." },
      ...openers227.map((o) => ({
        label: o.label,
        explanation: birdFits227.includes(o) ? "Kuşların kışın yiyecek bulmakta zorlanması, yemlik asmanın gerekçesidir." : "Göç bilgisi doğru olabilir ama yemlik asmanın gerekçesi değildir; devamın odağına bağlanmaz.",
      })),
    ],
    answer: `${birdFits227[0].label}) ${q(birdFits227[0].text)}`,
    check: `${birdFits227[0].label} ile okununca gerekçe → yemlik → yem → serçelerin gelmesi zinciri kesintisiz sürer.`,
    pitfall: "Bağımsız ve doğru bilgi veren her cümleyi uygun giriş saymak. Girişi, devamın bağlayıcısı ve odağıyla birlikte sına.",
  },
];

export const structureSupplement227 = {
  title: structureSection227.title,
  figureTitle: structureSection227.title,
  paragraphs: structureSection227.paragraphs,
  summary: `Giriş: öncül gerektirmeyen ve devamın bağlandığı cümle (kompost paragrafında ${roman227(introIdx[0])}). Gelişme: önceki bilgiye dönen açıklama, uygulama, örnek. Sonuç: “Böylece” gibi bağlayıcıyla öncekileri bağlayan cümle (${roman227(closeIdx[0])}). Bağımsızlık gerekli ama yetmez; devamla sına.`,
  appendSection: true as const,
  table: structTable,
  examples: structureExamples227,
};

/* =================================================================
 * 3 · Yardımcı düşünce: ana düşünceye destek ağı
 * ================================================================= */

export interface IdeaSent227 extends PSent227 {
  /** Desteklediği cümle (ana düşünce için null). */
  supports: number | null;
  func: string;
}
export const ideaSents227: IdeaSent227[] = [
  { text: "Sebze yetiştirmek için geniş bir bahçe şart değildir.", deps: [], supports: null, func: "ana yargı" },
  { text: "Domates ve biber gibi sebzeler derin saksılarda da gelişebilir.", deps: [], supports: 0, func: "örnek" },
  { text: "Güneş alan bir balkon bu saksılara yeterli ışığı sağlar.", deps: [{ phrase: "bu saksılara", to: 1, key: "saksılarda" }], supports: 0, func: "gerekçe" },
  { text: "Ancak saksıdaki toprak çabuk kuruduğu için sulama daha sık yapılmalıdır.", deps: [], supports: 0, func: "sınırlama" },
  { text: "Bazı aileler bu yolla yaz boyunca salatalıklarını kendi balkonlarından topluyor.", deps: [{ phrase: "bu yolla", to: 1, key: "saksılarda" }], supports: 0, func: "örnek" },
];
/** Kural: hiçbir cümleyi desteklemeyen ve diğerlerinin desteğinin vardığı cümle ana düşüncedir. */
export const mainIdea227 = (sents: readonly IdeaSent227[]) => {
  const roots = sents.flatMap((s, i) => (s.supports === null ? [i] : []));
  if (roots.length !== 1) throw new Error("depth227: ana düşünce tek değil");
  const reach = (i: number, seen = new Set<number>()): boolean => {
    if (i === roots[0]) return true;
    if (seen.has(i)) return false;
    seen.add(i);
    const t = sents[i].supports;
    return t !== null && reach(t, seen);
  };
  if (!sents.every((_, i) => reach(i))) throw new Error("depth227: her yardımcı düşünce ana düşünceye varmıyor");
  return roots[0];
};
const ideaMain = mainIdea227(ideaSents227);
export const ideaRole227 = (i: number) => (i === ideaMain ? "ana düşünce" : "yardımcı düşünce");
const helpers = ideaSents227.flatMap((_, i) => (i === ideaMain ? [] : [i]));
const funcsOf = (f: string) => ideaSents227.flatMap((s, i) => (s.func === f ? [roman227(i)] : []));

guard(depsHold227(ideaSents227), "balkon paragrafındaki gönderme sözleri öncüllerini bulur");
guard(ideaMain === 0 && helpers.length === ideaSents227.length - 1, "ana düşünce I. cümlededir; kalan cümlelerin hepsi yardımcı düşüncedir");
guard(new Set(helpers.map((i) => ideaSents227[i].func)).size === 3, "yardımcı düşünceler üç ayrı biçimde (örnek, gerekçe, sınırlama) destekler");
guard(ideaSents227.find((s) => s.func === "sınırlama")!.text.startsWith("Ancak"), "sınırlama cümlesi “Ancak” ile başlar ve ana düşünceyi destekler");

/** Seçenek değerlendirme: destekli (kanıt cümlesi), çelişir (kanıt cümlesi) ya da belirlenemez (kanıt yok). */
export type Verdict227 = "destekli" | "çelişir" | "belirlenemez";
export interface Claim227 {
  label: string;
  claim: string;
  verdict: Verdict227;
  /** Kanıt cümlesi ve o cümlede geçen kanıt sözü; belirlenemezde null ve söz metinde hiç geçmez. */
  evidence: number | null;
  key: string;
}
export const ideaClaims227: Claim227[] = [
  { label: "A", claim: "Saksıda yetişen sebzelere daha sık su verilmelidir.", verdict: "destekli", evidence: 3, key: "sulama daha sık" },
  { label: "B", claim: "Domates derin bir saksıda gelişebilir.", verdict: "destekli", evidence: 1, key: "derin saksılarda" },
  { label: "C", claim: "Balkonda yetişen sebzeler bahçedekilerden daha lezzetlidir.", verdict: "belirlenemez", evidence: null, key: "lezzet" },
  { label: "D", claim: "Güneş alan balkon saksılar için yeterli ışık sağlar.", verdict: "destekli", evidence: 2, key: "yeterli ışığı" },
  { label: "E", claim: "Bazı aileler salatalıklarını kendi balkonlarından topluyor.", verdict: "destekli", evidence: 4, key: "kendi balkonlarından" },
];
const whole = (sents: readonly PSent227[]) => sents.map(({ text }) => text).join(" ").toLocaleLowerCase("tr-TR");
/** Kural: kanıt sözü kanıt cümlesinde geçmeli; belirlenemezde söz paragrafın hiçbir yerinde geçmemeli. */
export const claimHolds227 = (c: Claim227, sents: readonly PSent227[]) =>
  c.evidence === null ? c.verdict === "belirlenemez" && !whole(sents).includes(c.key.toLocaleLowerCase("tr-TR")) : c.verdict !== "belirlenemez" && sents[c.evidence].text.includes(c.key);
export const unreachable227 = ideaClaims227.filter(({ verdict }) => verdict !== "destekli");

guard(ideaClaims227.every((c) => claimHolds227(c, ideaSents227)), "her seçeneğin kararı kanıt sözüyle ya da sözün yokluğuyla doğrulanır");
guard(unreachable227.length === 1 && unreachable227[0].verdict === "belirlenemez", "ulaşılamayan tek seçenek metinle çelişmez, belirlenemez");

/* Örnek 2: ana düşüncesi sonda olan paragraf. */
export const walkSents227: IdeaSent227[] = [
  { text: "Sabah okula yürüyerek giden öğrenciler mahallelerini daha yakından tanır.", deps: [], supports: 3, func: "gerekçe" },
  { text: "Hangi fırının erken açıldığını, hangi sokağın ağaçlıklı olduğunu fark ederler.", deps: [{ phrase: "fark ederler", to: 0, key: "öğrenciler" }], supports: 0, func: "örnek" },
  { text: "Yürüyüş ayrıca güne hareketle başlamalarını sağlar.", deps: [], supports: 3, func: "gerekçe" },
  { text: "Kısa mesafelerde yürümek, çocuklar için hem çevreyi tanıma hem de hareket fırsatıdır.", deps: [], supports: null, func: "ana yargı" },
];
export type OptionKind227 = "ana düşünce" | "yardımcı düşünce" | "değinilmemiş";
export interface IdeaOption227 {
  label: string;
  text: string;
  evidence: number | null;
  key: string;
}
export const walkOptions227: IdeaOption227[] = [
  { label: "A", text: "Kısa mesafelerde yürümek çocuklara hem çevreyi tanıma hem de hareket fırsatı verir.", evidence: 3, key: "hem çevreyi tanıma hem de hareket" },
  { label: "B", text: "Yürüyen öğrenciler mahallelerindeki küçük ayrıntıları fark eder.", evidence: 1, key: "fark ederler" },
  { label: "C", text: "Okul servisleri sabah trafiğini artırır.", evidence: null, key: "servis" },
];
const walkMain = mainIdea227(walkSents227);
export const optionKind227 = (o: IdeaOption227): OptionKind227 => (o.evidence === null ? "değinilmemiş" : o.evidence === walkMain ? "ana düşünce" : "yardımcı düşünce");
export const walkHelpers227 = walkOptions227.filter((o) => optionKind227(o) === "yardımcı düşünce");

guard(walkMain === walkSents227.length - 1, "yürüyüş paragrafında ana düşünce son cümlededir");
guard(walkOptions227.every((o) => (o.evidence === null ? !whole(walkSents227).includes(o.key) : walkSents227[o.evidence].text.includes(o.key))), "yürüyüş seçeneklerinin kanıt sözleri doğrulanır");
guard(walkHelpers227.length === 1 && walkHelpers227[0].label === "B", "yardımcı düşünce olan tek seçenek B’dir");
guard(depsHold227(walkSents227), "yürüyüş paragrafındaki gönderme bağı öncülünü bulur");

const ideaTable = {
  layout: "table" as const,
  headers: ["Cümle", "Metin", "Ana / yardımcı", "Destek biçimi", "Desteklediği"],
  rows: ideaSents227.map((s, i) => [roman227(i), s.text, upperFirst(ideaRole227(i)), s.func, s.supports === null ? "diğer cümleler bunu destekler" : `${roman227(s.supports)}. cümle`]),
};

export const ideaSection227: GuideSection = {
  title: "Destek ağını kur, seçeneği kanıt cümlesine bağla",
  paragraphs: [
    `Tablodaki özgün paragraf ${ideaSents227.length} cümledir: ${numbered(ideaSents227.map(({ text }) => text))} Ana düşünce ${roman227(ideaMain)}. cümledir: başka hiçbir cümleyi desteklemez, diğer ${helpers.length} cümlenin desteği ona varır. Kalan cümleler yardımcı düşüncedir.`,
    `Yardımcı düşünceler aynı biçimde desteklemez: ${funcsOf("örnek").join(" ve ")} örnek, ${funcsOf("gerekçe").join("")} gerekçe, ${funcsOf("sınırlama").join("")} sınırlama verir. ${q("Ancak")} ile başlayan sınırlama ana düşünceye karşı çıkmaz; saksıda yetiştirmenin hangi koşulla yürüdüğünü söyler. Yardımcı olmak önemsiz olmak demek değildir.`,
    `Bir seçeneği değerlendirirken kanıt cümlesini yanına koy. Kanıt sözü bir cümlede geçiyorsa yargı desteklidir. Metne aykırı bilgi varsa yargı çelişir. Gereken bilgi metnin hiçbir yerinde yoksa yargı belirlenemez. Belirlenemez yargı gerçek dünyada yanlış olmak zorunda değildir.`,
  ],
  table: ideaTable,
};

export const ideaExamples227: WorkedExample[] = [
  {
    title: "Beş seçenekte kanıt haritası",
    prompt: `Paragraf: ${q(ideaSents227.map(({ text }) => text).join(" "))} Bu paragraftan aşağıdakilerden hangisine ulaşılamaz? ${ideaClaims227.map(({ label, claim }) => `${label}) ${claim}`).join(" ")} Ulaşılamayan yargı metinle çelişiyor mu, yoksa belirlenemez mi?`,
    strategy: "Her seçenek için kanıt cümlesini ve o cümlede geçen kanıt sözünü bul. Kanıt yoksa metinde aykırı bir bilgi olup olmadığına bak.",
    steps: ideaClaims227.map((c) => ({
      label: c.label,
      expression: c.evidence === null ? `kanıt cümlesi yok (${q(c.key)} geçmiyor)` : `${roman227(c.evidence)}. cümle: ${q(c.key)}`,
      explanation: c.verdict === "destekli" ? "Destekli; yardımcı düşüncelerden birini yeniden söyler." : "Paragraf balkon ile bahçeyi lezzet bakımından karşılaştırmaz; aykırı bilgi de yoktur.",
    })),
    answer: `${unreachable227[0].label}) ${unreachable227[0].claim} Bu yargı metinle çelişmez; ${unreachable227[0].verdict}.`,
    check: `Diğer ${ideaClaims227.length - unreachable227.length} seçeneğin her biri ayrı bir cümleyle desteklenir; ulaşılamayan tek seçenek kalır.`,
    pitfall: "Ulaşılamayan yargıyı metne aykırı sanmak. Kanıtı olmayan yargı belirlenemez; çelişki için metinde karşıt bir bilgi gerekir.",
  },
  {
    title: "Ana düşünce sonda: yardımcı olanı seç",
    prompt: `Paragraf: ${q(walkSents227.map(({ text }) => text).join(" "))} Bu paragrafta aşağıdakilerden hangisi yardımcı düşünce olarak yer alır? ${walkOptions227.map(({ label, text }) => `${label}) ${text}`).join(" ")}`,
    strategy: "Önce ana düşünceyi bul: diğer cümlelerin desteğinin vardığı cümle. Sonra her seçeneği ana düşünce, yardımcı düşünce ya da değinilmemiş diye ayır.",
    steps: [
      { label: "Ana düşünce", expression: `${roman227(walkMain)}. cümle`, explanation: `${joinTr(walkSents227.flatMap((s, i) => (s.supports === walkMain ? [roman227(i)] : [])))} ona doğrudan destek verir; ${joinTr(walkSents227.flatMap((s, i) => (s.supports !== null && s.supports !== walkMain ? [`${roman227(i)} ise ${roman227(s.supports)}. cümleyi`] : [])))} destekler. Son cümle bunları birleştiren yargıdır.` },
      ...walkOptions227.map((o) => ({
        label: o.label,
        expression: o.evidence === null ? "kanıt cümlesi yok" : `${roman227(o.evidence)}. cümle`,
        explanation: `${upperFirst(optionKind227(o))}.`,
      })),
    ],
    answer: `${walkHelpers227[0].label}) ${walkHelpers227[0].text}`,
    check: `${walkOptions227.filter((o) => !walkHelpers227.includes(o)).map((o) => `${o.label}: ${optionKind227(o)}`).join("; ")}. Soru yardımcı düşünceyi istediği için yalnız ${walkHelpers227[0].label} uygundur.`,
    pitfall: "Metinde geçen her yargıyı yardımcı düşünce saymak ya da ana düşüncenin hep ilk cümlede olduğunu varsaymak.",
  },
];

export const ideaSupplement227 = {
  title: ideaSection227.title,
  figureTitle: ideaSection227.title,
  paragraphs: ideaSection227.paragraphs,
  summary: "Ana düşünce: diğer cümlelerin desteğinin vardığı, kendisi başka cümleyi desteklemeyen yargı. Yardımcı düşünce örnek, gerekçe ya da sınırlama verir. Seçenekte kanıt cümlesini bul: varsa destekli, aykırıysa çelişir, hiç yoksa belirlenemez.",
  appendSection: true as const,
  table: ideaTable,
  examples: ideaExamples227,
};

/* =================================================================
 * 4 · İkiye bölme: odak blokları ve kesişmeyen bağlar
 * ================================================================= */

export interface FocusSent227 extends PSent227 {
  focus: string;
  /** Zaman işareti (varsa). */
  time?: string;
}
/** `k` sınırı (ikinci paragraf k. sıradaki cümleyle başlar) için denetim. */
export const splitReport227 = (sents: readonly FocusSent227[], k: number) => {
  const left = new Set(sents.slice(0, k).map(({ focus }) => focus));
  const right = new Set(sents.slice(k).map(({ focus }) => focus));
  const crossing = sents.flatMap((s, i) => (i >= k ? s.deps.filter((d) => d.to < k).map((d) => ({ i, phrase: d.phrase })) : []));
  return { k, mixedLeft: left.size > 1, mixedRight: right.size > 1, sameFocus: left.size === 1 && right.size === 1 && [...left][0] === [...right][0], crossing, ok: left.size === 1 && right.size === 1 && [...left][0] !== [...right][0] && crossing.length === 0 };
};
export const validSplits227 = (sents: readonly FocusSent227[]) => sents.map((_, k) => k).filter((k) => k > 0 && splitReport227(sents, k).ok);
export const splitReportText227 = (sents: readonly FocusSent227[], k: number) => {
  const r = splitReport227(sents, k);
  const parts: string[] = [];
  if (r.mixedLeft) parts.push("ilk blokta iki odak karışır");
  if (r.mixedRight) parts.push("ikinci blokta iki odak karışır");
  if (r.crossing.length) parts.push(`${orphanText(r.crossing)} öncülünden ayrılır`);
  return parts.length ? parts.join("; ") : "iki blok da tek odakta kalır, bağ kesilmez";
};

export const cactusSents227: FocusSent227[] = [
  { text: "Kaktüsler kurak bölgelerde yaşamaya uyum sağlamış bitkilerdir.", deps: [], focus: "kuraklığa uyum" },
  { text: "Kalın gövdeleri yağmurdan sonra suyu depolar.", deps: [{ phrase: "gövdeleri", to: 0, key: "Kaktüsler" }], focus: "kuraklığa uyum" },
  { text: "Yaprakları dikene dönüştüğü için terlemeyle daha az su kaybederler.", deps: [{ phrase: "Yaprakları", to: 0, key: "Kaktüsler" }], focus: "kuraklığa uyum" },
  { text: "Evde kaktüs yetiştirenler en çok sulamada hata yapar.", deps: [], focus: "evde sulama" },
  { text: "Bu bitkiler toprakları kurumadan yeniden sulanırsa kökleri çürüyebilir.", deps: [{ phrase: "Bu bitkiler", to: 3, key: "kaktüs" }], focus: "evde sulama" },
  { text: "Bu yüzden kışın sulama aralığı uzatılır.", deps: [{ phrase: "Bu yüzden", to: 4, key: "çürüyebilir" }], focus: "evde sulama" },
];
export const cactusSplit227 = validSplits227(cactusSents227);
const cutAt = cactusSplit227[0];

guard(depsHold227(cactusSents227), "kaktüs paragrafındaki gönderme sözleri öncüllerini bulur");
guard(cactusSplit227.length === 1 && cutAt === 3, "kaktüs paragrafında geçerli tek sınır IV. cümleden öncedir");
guard(cactusSents227.slice(0, cutAt).some(({ text }) => /kaktüs/i.test(text)) && cactusSents227.slice(cutAt).some(({ text }) => /kaktüs/i.test(text)), "iki blokta da kaktüs adı geçer");
guard(!splitReport227(cactusSents227, cutAt - 1).ok && !splitReport227(cactusSents227, cutAt + 1).ok, "sınırı bir cümle öne ya da geriye almak denetimi bozar");

const cactusTable = {
  layout: "table" as const,
  headers: ["Cümle", "Metin", "Odak", "Bağ kanıtı", "Blok"],
  rows: cactusSents227.map((s, i) => [roman227(i), s.text, s.focus, s.deps.length ? s.deps.map(depText).join("; ") : "öncül gerektirmez", i < cutAt ? "1. paragraf" : i === cutAt ? "2. paragraf başlar" : "2. paragraf"]),
};
const focusA = cactusSents227[0].focus;
const focusB = cactusSents227[cutAt].focus;

export const splitSection227: GuideSection = {
  title: "Odak etiketleriyle tek geçerli sınırı bul",
  paragraphs: [
    `Tablodaki özgün paragraf ${cactusSents227.length} cümledir: ${numbered(cactusSents227.map(({ text }) => text))} Her cümleye bir odak etiketi verilir: ${q(focusA)} ya da ${q(focusB)}. İki blokta da kaktüs adı geçer ve konu kaktüstür; değişen, cümlelerin hangi soruya cevap verdiğidir.`,
    `Bir sınır iki koşulla geçerlidir: sınırın iki yanında da tek bir odak kalmalı ve hiçbir gönderme sözü sınırın öbür yanındaki öncülünden kopmamalıdır. Bu paragrafta iki koşulu birlikte sağlayan tek sınır ${roman227(cutAt)}. cümleden öncedir; ikinci paragraf ${roman227(cutAt)}. cümleyle başlar.`,
    `Komşu sınırları dene. Sınır ${roman227(cutAt - 1)}. cümleden önce konursa ${splitReportText227(cactusSents227, cutAt - 1)}. Sınır ${roman227(cutAt + 1)}. cümleden önce konursa ${splitReportText227(cactusSents227, cutAt + 1)}. Doğru sınırda ${splitReportText227(cactusSents227, cutAt)}.`,
  ],
  table: cactusTable,
};

/* Örnek 1: zaman işaretleri sınır değildir. */
export const seedSents227: FocusSent227[] = [
  { text: "Domates tohumunu ektiğimiz ilk hafta saksıda bir şey görünmedi.", deps: [], focus: "fidenin gelişim günlüğü", time: "ilk hafta" },
  { text: "İkinci hafta toprağın üstünde iki küçük yaprak belirdi.", deps: [], focus: "fidenin gelişim günlüğü", time: "İkinci hafta" },
  { text: "Üçüncü hafta yaprak sayısı dörde çıktı.", deps: [], focus: "fidenin gelişim günlüğü", time: "Üçüncü hafta" },
  { text: "Fidenin sağlıklı büyümesi için saksının bol güneş alan bir yere konması gerekir.", deps: [], focus: "bakım koşulları" },
  { text: "Saksının toprağı da nemli tutulmalı ama su içinde bırakılmamalıdır.", deps: [{ phrase: "Saksının toprağı da", to: 3, key: "saksının" }], focus: "bakım koşulları" },
];
export const seedSplit227 = validSplits227(seedSents227);
const timeIdx = seedSents227.flatMap((s, i) => (s.time && s.text.includes(s.time) ? [i] : []));

guard(depsHold227(seedSents227), "domates paragrafının gönderme bağı öncülünü bulur");
guard(timeIdx.length === 3 && timeIdx.every((i) => i < seedSplit227[0]), "üç zaman işareti de ilk blokta kalır");
guard(seedSplit227.length === 1 && seedSplit227[0] === 3, "domates paragrafında tek geçerli sınır IV. cümleden öncedir");
guard(timeIdx.slice(1).every((k) => splitReport227(seedSents227, k).mixedRight), "zaman işaretinden bölmek ikinci blokta iki odağı karıştırır");

/* Örnek 2: gönderme bağı sınırı belirler. */
export const breadSents227: FocusSent227[] = [
  { text: "Ekmek hamuru mayalanırken içindeki maya gaz üretir.", deps: [], focus: "hamurun kabarması" },
  { text: "Bu gaz hamurun içinde küçük boşluklar oluşturur.", deps: [{ phrase: "Bu gaz", to: 0, key: "gaz" }], focus: "hamurun kabarması" },
  { text: "Hamur bu yüzden kabarır.", deps: [{ phrase: "bu yüzden", to: 1, key: "boşluklar" }], focus: "hamurun kabarması" },
  { text: "Hamurun kabarması pişen ekmeğin içinin yumuşak olmasını sağlar.", deps: [{ phrase: "Hamurun kabarması", to: 2, key: "kabarır" }], focus: "hamurun kabarması" },
  { text: "Ekmeğin kabuğu ise fırının sıcağında kızarır.", deps: [], focus: "kabuğun kızarması" },
  { text: "Bu renk değişimi ekmeğe kendine özgü kokusunu da verir.", deps: [{ phrase: "Bu renk değişimi", to: 4, key: "kızarır" }], focus: "kabuğun kızarması" },
];
export const breadSplit227 = validSplits227(breadSents227);
const breadCut = breadSplit227[0];

guard(depsHold227(breadSents227), "ekmek paragrafındaki gönderme sözleri öncüllerini bulur");
guard(breadSplit227.length === 1 && breadCut === 4, "ekmek paragrafında tek geçerli sınır V. cümleden öncedir");
guard(splitReport227(breadSents227, breadCut - 1).crossing.length === 1 && splitReport227(breadSents227, breadCut + 1).crossing.length === 1, "komşu iki sınırın her biri bir gönderme bağını keser");

export const splitExamples227: WorkedExample[] = [
  {
    title: "Zaman işareti değişince paragraf bölünür mü?",
    prompt: `${numbered(seedSents227.map(({ text }) => text))} Bu parça iki paragrafa ayrılmak istenirse ikinci paragraf hangi cümleyle başlar?`,
    strategy: "Zaman işaretlerini gör ama sınırı onlara göre koyma. Her cümlenin hangi soruya cevap verdiğini yaz; iki yanında tek odak kalan sınırı ara.",
    steps: [
      { label: "Zaman çizgisi", expression: timeIdx.map((i) => `${roman227(i)}: ${seedSents227[i].time}`).join(" · "), explanation: `Üç cümle aynı ${q(seedSents227[0].focus)} çizgisinde ilerler; hafta değişimi bu çizginin doğal adımıdır.` },
      { label: "Yeni odak", expression: `${roman227(seedSplit227[0])}: ${seedSents227[seedSplit227[0]].focus}`, explanation: "Fidenin ne olduğu anlatılmaz; büyümesi için ne gerektiği anlatılır." },
      ...timeIdx.slice(1).map((k) => ({ label: `Sınır ${roman227(k)}. cümleden önce`, explanation: `${upperFirst(splitReportText227(seedSents227, k))}.` })),
      { label: "Bağ", expression: depText(seedSents227[4].deps[0]), explanation: "Bakım bloğunun iki cümlesi birbirine bağlıdır; sınır bu bağı kesmez." },
    ],
    answer: `${roman227(seedSplit227[0])}. cümle: ${q(seedSents227[seedSplit227[0]].text)}`,
    check: `I–${roman227(seedSplit227[0] - 1)} ${q(seedSents227[0].focus)}, ${roman227(seedSplit227[0])}–${roman227(seedSents227.length - 1)} ${q(seedSents227[seedSplit227[0]].focus)} odağındadır.`,
    pitfall: "Her yeni zaman ifadesinde paragrafı bölmek. Zaman sırası bir çizginin adımı olabilir; sınırı odak değişimi belirler.",
  },
  {
    title: "Gönderme bağını kesmeyen sınır",
    prompt: `${numbered(breadSents227.map(({ text }) => text))} Bu parça iki paragrafa ayrılırsa ikinci paragraf hangi cümleyle başlar? Sınırı bir cümle önce ya da sonra koymanın sakıncası nedir?`,
    strategy: "Önce gönderme sözlerinin öncüllerini işaretle. Sonra aday sınırları dene: sınır hem odakları ayırmalı hem de hiçbir gönderme sözünü öncülünden koparmamalıdır.",
    steps: [
      { label: "Bağlar", expression: breadSents227.flatMap((s, i) => s.deps.map((d) => `${roman227(i)} ${depText(d)}`)).join("; "), explanation: "Her ok bir cümlenin önceki bir cümleye muhtaç olduğunu gösterir." },
      ...[breadCut - 1, breadCut, breadCut + 1].map((k) => ({
        label: `Sınır ${roman227(k)}. cümleden önce`,
        explanation: `${upperFirst(splitReportText227(breadSents227, k))}.`,
      })),
    ],
    answer: `${roman227(breadCut)}. cümle. Sınır ${roman227(breadCut - 1)}. cümleden önce konursa ${splitReportText227(breadSents227, breadCut - 1)}. Sınır ${roman227(breadCut + 1)}. cümleden önce konursa ${splitReportText227(breadSents227, breadCut + 1)}.`,
    check: `I–${roman227(breadCut - 1)} ${q(breadSents227[0].focus)}, ${roman227(breadCut)}–${roman227(breadSents227.length - 1)} ${q(breadSents227[breadCut].focus)} odağındadır; iki blok arasında ok yoktur.`,
    pitfall: "Hamur ve ekmek sözcükleri her cümlede geçtiği için bölünemez demek ya da “ise” bağlacını görüp sınırı ezberle koymak. Bağları ve odağı birlikte denetle.",
  },
];

export const splitSupplement227 = {
  title: splitSection227.title,
  figureTitle: splitSection227.title,
  paragraphs: splitSection227.paragraphs,
  summary: `Her cümleye odak etiketi ver. Geçerli sınır: iki yanında tek odak kalır ve hiçbir gönderme sözü öncülünden kopmaz. Kaktüs paragrafında ikinci paragraf ${roman227(cutAt)}. cümleyle başlar. Zaman işareti ya da ortak konu sözcüğü tek başına sınır değildir.`,
  appendSection: true as const,
  table: cactusTable,
  examples: splitExamples227,
};

/* =================================================================
 * 5 · Akışı bozan cümle: odak dışı tek cümle ve çıkarma denemesi
 * ================================================================= */

export interface FlowSent227 extends FocusSent227 {
  func: string;
}
export const chainSents227: FlowSent227[] = [
  { text: "Bisiklet zinciri düzenli temizlenmezse çabuk aşınır.", deps: [], focus: "zincir bakımı", func: "konuyu açan sav" },
  { text: "Zincire yapışan toz ve kum, dişlilerin arasında zımpara gibi çalışır.", deps: [], focus: "zincir bakımı", func: "aşınmanın gerekçesi" },
  { text: "Bu yüzden zincir birkaç haftada bir kuru bir bezle silinir.", deps: [{ phrase: "Bu yüzden", to: 1, key: "zımpara" }], focus: "zincir bakımı", func: "ilk bakım adımı" },
  { text: "Şehrimizde her yıl bir bisiklet festivali düzenleniyor.", deps: [], focus: "festival", func: "festival haberi" },
  { text: "Silinen zincire ardından ince bir kat yağ sürülür.", deps: [{ phrase: "Silinen zincire", to: 2, key: "silinir" }], focus: "zincir bakımı", func: "ikinci bakım adımı" },
  { text: "Ancak fazla yağ yeniden toz tutacağı için artığı bezle alınır.", deps: [{ phrase: "fazla yağ", to: 4, key: "yağ" }], focus: "zincir bakımı", func: "gerekli sınırlama" },
];
/** Ana çizgi: en çok cümlenin paylaştığı odak. */
export const mainFocus227 = (sents: readonly FocusSent227[]) => {
  const counts = new Map<string, number>();
  for (const { focus } of sents) counts.set(focus, (counts.get(focus) ?? 0) + 1);
  return [...counts].sort((a, b) => b[1] - a[1])[0][0];
};
/** Kural: ana çizginin dışındaki ve çıkarılınca hiçbir bağı öncülsüz bırakmayan cümle akışı bozar. */
export const flowBreakers227 = (sents: readonly FocusSent227[]) => {
  const main = mainFocus227(sents);
  return sents.flatMap((s, i) => (s.focus !== main && orphans227(sents, i).length === 0 ? [i] : []));
};
const chainMain = mainFocus227(chainSents227);
export const chainBreak227 = flowBreakers227(chainSents227);
const off = chainBreak227[0];
export const removalTrial227 = (sents: readonly FlowSent227[], i: number) => {
  const os = orphans227(sents, i);
  if (i === flowBreakers227(sents)[0]) return `çıkarılınca ${roman227(i - 1)} ile ${roman227(i + 1)} komşu olur; öncülsüz söz kalmaz`;
  return os.length ? `çıkarılınca ${orphanText(os)} öncülsüz kalır` : `çıkarılınca ${sents[i].func} kaybolur`;
};
const limitIdx = chainSents227.findIndex(({ text }) => text.startsWith("Ancak"));

guard(depsHold227(chainSents227), "zincir paragrafındaki gönderme sözleri öncüllerini bulur");
guard(chainBreak227.length === 1 && off === 3, "akışı bozan tek cümle IV. cümledir");
guard(chainSents227.filter(({ focus }) => focus !== chainMain).length === 1, "ana çizginin dışında yalnız bir cümle vardır");
guard(chainSents227[off].text.toLocaleLowerCase("tr-TR").includes("bisiklet") && chainSents227[0].text.toLocaleLowerCase("tr-TR").includes("bisiklet"), "akışı bozan cümle ilk cümleyle aynı “bisiklet” sözcüğünü taşır");
guard(chainSents227[off + 1].deps.some((d) => d.to === off - 1), "IV çıkarılınca V. cümlenin gönderme sözü hemen önündeki III. cümleye bağlanır");
guard(limitIdx > 0 && chainSents227[limitIdx].focus === chainMain && orphans227(chainSents227, limitIdx).length === 0, "“Ancak” ile başlayan cümle ana çizgidedir; çıkarılınca bağ değil sınırlama kaybolur");
guard(orphans227(chainSents227, off - 1).length === 1, "III çıkarılınca bir gönderme öncülsüz kalır");

const chainTable = {
  layout: "table" as const,
  headers: ["Cümle", "Metin", "Ana çizgiye katkısı", "Bağ kanıtı", "Çıkarma denemesi"],
  rows: chainSents227.map((s, i) => [roman227(i), s.text, s.focus === chainMain ? s.func : `yok: ${s.func}`, s.deps.length ? s.deps.map(depText).join("; ") : "öncül gerektirmez", removalTrial227(chainSents227, i)]),
};

export const flowSection227: GuideSection = {
  title: "Her cümleyi çıkarıp kalan zinciri yeniden oku",
  paragraphs: [
    `Tablodaki özgün paragraf ${chainSents227.length} cümledir: ${numbered(chainSents227.map(({ text }) => text))} Ana çizgi ${q(chainMain)} odağıdır; ${chainSents227.length - 1} cümle bu odağa katkı verir. Çıkarma denemesi sütunu, cümle geçici olarak dışarı alınınca neyin değiştiğini gösterir.`,
    `${roman227(off)}. cümle ${q("bisiklet")} sözcüğünü I. cümleyle paylaşır ama bakım zincirine katkı vermez. Çıkarılınca ${roman227(off - 1)} ile ${roman227(off + 1)} komşu olur ve ${q(chainSents227[off + 1].deps[0].phrase)} sözü hemen önündeki öncülünü bulur. Aynı sözcük aynı işlev demek değildir.`,
    `Karşı deneme olarak ${roman227(off - 1)}. cümleyi çıkar: ${removalTrial227(chainSents227, off - 1)}. ${roman227(limitIdx)}. cümle ${q("Ancak")} ile başlar; çıkarılınca hiçbir bağ kopmaz ama ${chainSents227[limitIdx].func} kaybolur. Karşıtlık sözü akışı bozmaz; kararı odak ve çıkarma denemesi birlikte verir.`,
  ],
  table: chainTable,
};

/* Örnek 1: örnek cümlesi gerekli, aynı tema ilgisiz. */
export const beeSents227: FlowSent227[] = [
  { text: "Arılar çiçekten çiçeğe uçarken polen taşır.", deps: [], focus: "tozlaşma", func: "konuyu açan bilgi" },
  { text: "Bu taşıma birçok meyve ağacının tozlaşmasını sağlar.", deps: [{ phrase: "Bu taşıma", to: 0, key: "taşır" }], focus: "tozlaşma", func: "sonucu açıklama" },
  { text: "Örneğin bazı elma üreticileri çiçeklenme döneminde bahçelerine kovan yerleştirir.", deps: [{ phrase: "Örneğin", to: 1, key: "meyve ağacının" }], focus: "tozlaşma", func: "örnek" },
  { text: "Bal, kapağı sıkı kapatılmış kavanozda uzun süre bozulmadan kalabilir.", deps: [], focus: "balın saklanması", func: "saklama bilgisi" },
  { text: "Bu nedenle arıların azaldığı bölgelerde meyve verimi düşebilir.", deps: [{ phrase: "Bu nedenle", to: 1, key: "tozlaşmasını sağlar" }], focus: "tozlaşma", func: "sonuç" },
];
export const beeBreak227 = flowBreakers227(beeSents227);
const beeExampleIdx = beeSents227.findIndex(({ text }) => text.startsWith("Örneğin"));

guard(depsHold227(beeSents227), "arı paragrafındaki gönderme sözleri öncüllerini bulur");
guard(beeBreak227.length === 1 && beeBreak227[0] === 3, "arı paragrafında akışı bozan tek cümle IV. cümledir");
guard(beeSents227[beeExampleIdx].focus === mainFocus227(beeSents227), "“Örneğin” cümlesi ana çizgidedir");

/* Örnek 2: yabancı görünen gerekli cümle ile ortak sözcüklü sapma. */
export const glassSents227: FlowSent227[] = [
  { text: "Kışın evdeki ısının bir bölümü pencerelerden dışarı kaçar.", deps: [], focus: "ısı yalıtımı", func: "sorunu açma" },
  { text: "Çift camlı pencerelerde iki cam arasında ince bir hava tabakası bulunur.", deps: [], focus: "ısı yalıtımı", func: "çözümün yapısı" },
  { text: "Bu tabaka, ısının camdan cama geçişini yavaşlatır.", deps: [{ phrase: "Bu tabaka", to: 1, key: "hava tabakası" }], focus: "ısı yalıtımı", func: "çözümün işleyişi" },
  { text: "Camın ana hammaddesi kumdur.", deps: [], focus: "camın üretimi", func: "hammadde bilgisi" },
  { text: "Böylece aynı odayı ısıtmak için daha az yakıt harcanır.", deps: [{ phrase: "Böylece", to: 2, key: "yavaşlatır" }], focus: "ısı yalıtımı", func: "sonuç" },
];
export const glassCandidates227 = [1, 3] as const;
export const glassBreak227 = flowBreakers227(glassSents227);

guard(depsHold227(glassSents227), "pencere paragrafındaki gönderme sözleri öncüllerini bulur");
guard(glassBreak227.length === 1 && glassBreak227[0] === glassCandidates227[1], "iki adaydan akışı bozan IV. cümledir");
guard(orphans227(glassSents227, glassCandidates227[0]).length === 1, "II çıkarılınca III. cümlenin gönderme sözü öncülsüz kalır");
guard(glassSents227.every(({ text }) => /cam|pencere|ısı/i.test(text)), "pencere paragrafındaki her cümle cam, pencere ya da ısı sözcüğü taşır");

export const flowExamples227: WorkedExample[] = [
  {
    title: "Örnek kalır, aynı temadaki sapma çıkar",
    prompt: `${numbered(beeSents227.map(({ text }) => text))} Bu parçada düşüncenin akışını bozan cümle hangisidir?`,
    strategy: "Ana çizgiyi tek ifadeyle söyle. Sonra her cümleye bu çizgideki işlevini yaz; işlevi olmayan cümleyi çıkarıp kalan bağları oku.",
    steps: [
      { label: "Ana çizgi", expression: mainFocus227(beeSents227), explanation: `${joinTr(beeSents227.flatMap((s, i) => (s.focus === mainFocus227(beeSents227) ? [roman227(i)] : [])))} arıların polen taşımasıyla meyve verimi arasındaki ilişkiyi işler.` },
      { label: `${roman227(beeExampleIdx)}`, expression: depText(beeSents227[beeExampleIdx].deps[0]), explanation: "Yeni bir özne (elma üreticileri) getirir ama tozlaşmanın meyve ağaçları için önemini somutlaştırır; örnek işlevi vardır." },
      { label: `${roman227(beeBreak227[0])}`, expression: beeSents227[beeBreak227[0]].focus, explanation: "Arı konusuna yakın görünür ama balın saklanmasını anlatır; tozlaşma çizgisine katkı vermez." },
      { label: "Çıkarma denemesi", expression: depText(beeSents227[4].deps[0]), explanation: `${roman227(beeBreak227[0])}. cümle çıkarılınca ${q(beeSents227[4].deps[0].phrase)} sözü tozlaşma bilgisine doğrudan bağlanır.` },
    ],
    answer: `${roman227(beeBreak227[0])}. cümle: ${q(beeSents227[beeBreak227[0]].text)}`,
    check: `${roman227(beeExampleIdx)}. cümle çıkarılsa parça kısalır ama örnek kaybolur; ${roman227(beeBreak227[0])} çıkarılınca hiçbir bağ kopmaz.`,
    pitfall: "Yeni bir kişi ya da “Örneğin” içeren cümleyi akışı bozan saymak, arı sözcüğünü taşıyan her cümleyi ana çizgide sanmak.",
  },
  {
    title: "İki aday: gönderme bağı karar verir",
    prompt: `${numbered(glassSents227.map(({ text }) => text))} Bir öğrenci akışı bozan cümlenin ${roman227(glassCandidates227[0])} ya da ${roman227(glassCandidates227[1])} olduğunu düşünüyor. Hangisi akışı bozar? Çıkarma denemesiyle göster.`,
    strategy: "İki adayı ayrı ayrı çıkar. Her denemede öncülsüz kalan bir gönderme sözü olup olmadığına ve ana çizginin sürüp sürmediğine bak.",
    steps: [
      ...glassCandidates227.map((k) => ({
        label: `${roman227(k)}. cümleyi çıkar`,
        expression: orphans227(glassSents227, k).length ? `öncülsüz: ${orphanText(orphans227(glassSents227, k))}` : "öncülsüz söz yok",
        explanation: glassBreak227.includes(k)
          ? `Odak ${q(glassSents227[k].focus)}; ${roman227(k - 1)} ile ${roman227(k + 1)} komşu olunca ${q(glassSents227[k + 1].deps[0].phrase)} öncülünü bulur.`
          : `Hava tabakası tanıtılmadan ${q("Bu tabaka")} denir; cümle yalıtım çizgisinin gerekli parçasıdır.`,
      })),
      { label: "Ortak sözcük", explanation: "Beş cümlenin hepsi cam, pencere ya da ısı sözcüğü taşır; karar sözcük benzerliğinden değil işlevden çıkar." },
    ],
    answer: `${roman227(glassBreak227[0])}. cümle: ${q(glassSents227[glassBreak227[0]].text)}`,
    check: `${roman227(glassCandidates227[0])}. cümle teknik ve farklı görünse de çıkarılınca ${orphanText(orphans227(glassSents227, glassCandidates227[0]))} öncülsüz kalır.`,
    pitfall: "Yabancı görünen ya da teknik ayrıntı veren cümleyi hemen çıkarmak. Önce o cümleye dönen bir gönderme sözü olup olmadığını ara.",
  },
];

export const flowSupplement227 = {
  title: flowSection227.title,
  figureTitle: flowSection227.title,
  paragraphs: flowSection227.paragraphs,
  summary: `Ana çizgiyi tek ifadeyle söyle, her cümleyi geçici olarak çıkar. Akışı bozan cümle odak dışıdır ve çıkarılınca hiçbir gönderme öncülsüz kalmaz (zincir paragrafında ${roman227(off)}). Öncülü taşıyan cümle kalır; “Ancak” sınırlaması da gerekli olabilir.`,
  appendSection: true as const,
  table: chainTable,
  examples: flowExamples227,
};

/** Her ders için ek; theorySupplements bunları kendi dizilerine ekler. */
export const depth227Supplements = {
  "cumlede-anlam": [meaningSupplement227],
  "paragrafa-giris": [structureSupplement227],
  "yardimci-dusunce": [ideaSupplement227],
  "ikiye-bolme": [splitSupplement227],
  "akisi-bozan-cumle": [flowSupplement227],
};
