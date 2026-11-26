import type { GuideSection, WorkedExample } from "./guides/types";
import { disciplinesGuide } from "./guides/chemistry";

/*
 * TYT Kimya derinleştirmesi (0.210.0): kimya disiplinleri, kimyada güvenlik,
 * atom modelleri ve periyodik sistem. Kabul edilmiş rehber içeriği değişmez;
 * tablo bölümü, ek çözümlü örnekler ve bölüm çizimi görüntüleme katmanında
 * eklenir. Paragraflardaki sayılar ve adlar, tablo satırları, çizim
 * okumaları ve Kopya Kâğıdı özetleri aynı dışa aktarılmış verilerden gelir.
 * Genel yargılar için modül yüklenirken veriyi denetleyen korumalar vardır.
 */

const guard = (ok: boolean, message: string) => {
  if (!ok) throw new Error(`depth210: ${message}`);
};
/** Türkçe ondalık virgül, gerçek eksi işareti. */
export const num210 = (x: number, digits = 2) => {
  const r = Number(x.toFixed(digits));
  return (Object.is(r, -0) ? 0 : r).toLocaleString("tr-TR", { maximumFractionDigits: digits, useGrouping: false }).replace("-", "−");
};
const SUP: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
export const sup210 = (n: number) => [...String(n)].map((c) => SUP[c]).join("");
const lower = (s: string) => s.charAt(0).toLocaleLowerCase("tr-TR") + s.slice(1);
const upper = (s: string) => s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1);
const bare = (s: string) => s.replace(/\.$/, "");

/* ======================================================================
 * Kimya disiplinleri: disiplin ↔ ne inceler ↔ örnek ↔ ilgili meslek
 * ==================================================================== */

export interface DisciplineRow210 {
  name: string;
  /** Çizim kutusundaki kısa görev fiili. */
  verb: string;
  studies: string;
  example: string;
  professions: readonly string[];
}
export const disciplineRows210: readonly DisciplineRow210[] = [
  {
    name: "Analitik kimya",
    verb: "bileşen ve miktar",
    studies: "Bir örnekteki bileşenleri belirler (nitel) ve miktarlarını ölçer (nicel).",
    example: "İçme suyunda kalsiyum bulunduğunu göstermek ve derişimini mg/L olarak ölçmek.",
    professions: ["Kimyager"],
  },
  {
    name: "Organik kimya",
    verb: "karbon bileşikleri",
    studies: "Karbon bileşiklerinin yapısını, özelliklerini ve tepkimelerini inceler.",
    example: "Bir ilaç etken maddesini veya bir boya molekülünü sentezlemek.",
    professions: ["Kimyager", "Eczacı"],
  },
  {
    name: "Anorganik kimya",
    verb: "metal, mineral, tuz",
    studies: "Metalleri, mineralleri ve birçok asit, baz ve tuz gibi organik olmayan türleri inceler.",
    example: "Bir metal cevherinin bileşimini ve ondan metal elde etme tepkimelerini incelemek.",
    professions: ["Metalurji ve malzeme mühendisi", "Kimyager"],
  },
  {
    name: "Fizikokimya",
    verb: "enerji, sıcaklık, hız",
    studies: "Enerji, sıcaklık, basınç, derişim ve tepkime hızı arasındaki ilişkileri inceler.",
    example: "Buzdolabında besinlerin daha geç bozulmasını sıcaklık ile tepkime hızı ilişkisiyle açıklamak.",
    professions: ["Kimyager"],
  },
  {
    name: "Biyokimya",
    verb: "canlıdaki tepkimeler",
    studies: "Canlıların kimyasal yapılarını ve kimyasal süreçlerini inceler.",
    example: "Bir enzimin etkinliğini veya bir ilacın vücutta hangi ürünlere dönüştüğünü araştırmak.",
    professions: ["Eczacı", "Kimyager"],
  },
  {
    name: "Polimer kimyası",
    verb: "monomerden zincir",
    studies: "Monomerlerin birleşmesiyle oluşan büyük moleküllerin yapısını, oluşumunu ve özelliklerini inceler.",
    example: "Naylon lifin veya plastik ambalajın zincir yapısını tasarlamak.",
    professions: ["Kimya mühendisi", "Kimyager"],
  },
  {
    name: "Endüstriyel kimya",
    verb: "büyük ölçekte üretim",
    studies: "Bir üretim sürecinin verimini, kalitesini, maliyetini, enerji gereksinimini ve çevresel etkisini birlikte değerlendirir.",
    example: "Bir gübre fabrikasında üretimi daha az enerjiyle ve sürekli sürdürmek.",
    professions: ["Kimya mühendisi"],
  },
];
/** Rehberin meslek paragrafında geçen meslekler. */
export const guideProfessions210 = ["Kimyager", "Kimya mühendisi", "Metalurji ve malzeme mühendisi", "Eczacı", "Kimya öğretmeni"] as const;

{
  const guideText = disciplinesGuide.sections.flatMap(({ paragraphs }) => paragraphs).join(" ").toLocaleLowerCase("tr-TR");
  const objective = disciplinesGuide.objectives[0];
  guard(objective.includes(`${["", "bir", "iki", "üç", "dört", "beş", "altı", "yedi"][disciplineRows210.length]} kimya disiplinini`), "rehber hedefindeki disiplin sayısı tablo satırlarıyla aynı olmalı");
  guard(new Set(disciplineRows210.map(({ name }) => name)).size === disciplineRows210.length, "disiplin adları tekrarlanmamalı");
  for (const { name, professions } of disciplineRows210) {
    guard(guideText.includes(name.toLocaleLowerCase("tr-TR")), `${name} rehber metninde geçmeli`);
    for (const p of professions) guard((guideProfessions210 as readonly string[]).includes(p), `${p} rehberdeki meslek listesinde olmalı`);
  }
  for (const p of guideProfessions210) guard(guideText.includes(p.toLocaleLowerCase("tr-TR")), `${p} rehber metninde geçmeli`);
  // Öğretmen bütün alanları öğretir; tabloda tek alana bağlanmaz.
  guard(disciplineRows210.every(({ professions }) => !professions.includes("Kimya öğretmeni")), "kimya öğretmeni tek alana bağlanmamalı");
}

const disciplineTable = {
  layout: "table" as const,
  headers: ["Disiplin", "Ne inceler?", "Günlük hayat veya endüstri örneği", "İlgili meslek"],
  rows: disciplineRows210.map(({ name, studies, example, professions }) => [name, studies, example, professions.join(", ")]),
};
const discipline = (name: string) => disciplineRows210.find((row) => row.name === name)!;
const [analytic, organic, , physChem, bio, polymer, industrial] = disciplineRows210;
const professionCount = (p: string) => disciplineRows210.filter(({ professions }) => professions.includes(p)).length;
const chemist = guideProfessions210[0];
const engineer = guideProfessions210[1];
const teacher = guideProfessions210[4];

export const disciplineSection210: GuideSection = {
  title: "Disiplin, incelediği iş, örnek ve meslek tek tabloda",
  paragraphs: [
    `Tablo ${disciplineRows210.length} kimya disiplinini aynı dört soruyla karşılaştırır: Ne inceler? Günlük hayatta veya endüstride nerede görülür? Hangi meslek bu işi sık yapar? Bir satırı okurken önce ikinci sütundaki fiile bak. ${analytic.name} bileşeni belirler ve miktarını ölçer. ${physChem.name} ise sıcaklık veya derişim ile hız arasındaki ilişkiyi araştırır.`,
    `Örnek sütunundaki işler tek bir sektöre ait değildir. ${organic.name} satırında bir ilaç molekülünün sentezi, ${bio.name} satırında aynı ilacın vücuttaki dönüşümü yer alır. Madde aynı, soru farklıdır. ${polymer.name} ile ${lower(industrial.name)} da aynı fabrikada çalışabilir: biri zincir yapısını tasarlar, diğeri üretimin verimini ve enerjisini iyileştirir.`,
    `Meslek sütunu “yalnız bu meslek” demek değildir. ${chemist} ${professionCount(chemist)} satırda, ${lower(engineer)} ${professionCount(engineer)} satırda geçer. ${teacher} hiçbir satıra bağlanmadı, çünkü bütün alanları öğretir. Soruda meslek değil disiplin isteniyorsa yine yapılan işe göre karar ver.`,
  ],
  table: disciplineTable,
};

export interface DisciplineTask210 { task: string; discipline: string; kind?: "nitel" | "nicel" }
export const disciplineExampleTasks210: readonly (readonly DisciplineTask210[])[] = [
  [
    { task: "tarla toprağındaki nitrat miktarını ölçmek", discipline: "Analitik kimya", kind: "nicel" },
    { task: "amonyak üretim tepkimesinde sıcaklığın hıza etkisini incelemek", discipline: "Fizikokimya" },
    { task: "fabrikada günlük üretimi daha az enerjiyle sürdürmek", discipline: "Endüstriyel kimya" },
  ],
  [
    { task: "meyve suyunda C vitamini bulunup bulunmadığını belirlemek", discipline: "Analitik kimya", kind: "nitel" },
    { task: "bir bardaktaki C vitamini miktarını ölçmek", discipline: "Analitik kimya", kind: "nicel" },
    { task: "C vitamininin vücuttaki tepkimelerde nasıl görev aldığını araştırmak", discipline: "Biyokimya" },
  ],
];
for (const tasks of disciplineExampleTasks210)
  for (const { discipline: d } of tasks) guard(disciplineRows210.some(({ name }) => name === d), `${d} tabloda olmalı`);
const [fertilizer, juice] = disciplineExampleTasks210;
const taskName = ({ discipline: d, kind }: DisciplineTask210) => (kind ? `${d} (${kind})` : d);

export const disciplineExamples210: WorkedExample[] = [
  {
    title: "Gübre projesinde üç iş, üç disiplin",
    prompt: `Bir gübre projesinde üç ekip çalışıyor. 1. ekip: ${fertilizer[0].task}. 2. ekip: ${fertilizer[1].task}. 3. ekip: ${fertilizer[2].task}. Her ekibin işi hangi kimya disiplinine girer? 3. ekipte en sık hangi meslek çalışır?`,
    strategy: "Her işin fiilini işaretle: ölçmek, incelemek, sürdürmek. Sonra fiili tablodaki “Ne inceler?” sütunuyla eşleştir.",
    steps: fertilizer.map((task, i) => ({
      label: `${i + 1}. ekip`,
      expression: `${upper(task.task)} → ${taskName(task)}`,
      explanation: discipline(task.discipline).studies,
    })),
    answer: `1. ekip ${lower(taskName(fertilizer[0]))}, 2. ekip ${lower(fertilizer[1].discipline)}, 3. ekip ${lower(fertilizer[2].discipline)}. 3. ekipte en sık ${lower(discipline(fertilizer[2].discipline).professions[0])} çalışır.`,
    check: "Üç ekip aynı sektörde (gübre) çalışıyor ama üç farklı soruya cevap arıyor. Sektörün adı tek bir disiplin vermez.",
    pitfall: "“Gübre fabrikası” sözcüğünü görüp üç işin hepsini endüstriyel kimya saymak. Miktar ölçmek analitik, sıcaklık–hız ilişkisi fizikokimya sorusudur.",
  },
  {
    title: "Meyve suyunda nitel, nicel ve canlıdaki rol",
    prompt: `Bir meyve suyu üzerinde üç çalışma yapılıyor. K: ${juice[0].task}. L: ${juice[1].task}. M: ${juice[2].task}. Hangileri aynı disipline girer ve aralarındaki fark nedir?`,
    strategy: "Önce “hangi madde var?” ve “ne kadar var?” sorularını ayır. Sonra canlıdaki süreci soran çalışmayı ayrı düşün.",
    steps: juice.map((task, i) => ({
      label: ["K", "L", "M"][i],
      expression: `${upper(task.task)} → ${taskName(task)}`,
      explanation: task.kind === "nitel" ? "“Hangi madde var?” sorusu niteldir." : task.kind === "nicel" ? "“Ne kadar var?” sorusu niceldir." : discipline(task.discipline).studies,
    })),
    answer: `K ve L ${lower(juice[0].discipline)}: K ${juice[0].kind}, L ${juice[1].kind} analizdir. M ${lower(juice[2].discipline)} çalışmasıdır.`,
    check: "K’nın cevabı “var” ya da “yok”, L’nin cevabı bir sayı ve birimdir. M’nin cevabı bir tepkime veya görevdir.",
    pitfall: "Örnek yiyecekten geldiği için hepsini biyokimya saymak. Biyokimya canlıdaki süreci sorar; maddenin varlığı ve miktarı analitik kimyanın sorusudur.",
  },
];

export const disciplineSupplement210 = {
  title: disciplineSection210.title,
  figureTitle: disciplineSection210.title,
  paragraphs: disciplineSection210.paragraphs,
  summary: `${disciplineRows210.map(({ name, verb }) => `${name}: ${verb}`).join("; ")}. ${chemist} ${professionCount(chemist)} alanda, ${lower(engineer)} ${professionCount(engineer)} alanda çalışır. Disiplini meslekten değil işten seç.`,
  appendSection: true as const,
  table: disciplineTable,
  examples: disciplineExamples210,
};

/* ======================================================================
 * Kimyada güvenlik: GHS/CLP tehlike piktogramları (öğretim özeti)
 * ==================================================================== */

export type SignalWord210 = "Tehlike" | "Dikkat";
export interface PictogramRow210 {
  code: string;
  /** Türkçe güvenlik bilgi formlarında kullanılan sembol adı. */
  name: string;
  /** Rehberin önceki bölümünde kullanılan kısa ad. */
  short: string;
  families: readonly ("fiziksel" | "sağlık" | "çevre")[];
  classes: string;
  signals: readonly SignalWord210[];
  /** Bazı sınıflarda (ör. sucul kronik kategori 2) sinyal sözcüğü yoktur. */
  noSignalPossible?: true;
  h: { code: string; meaning: string };
}
export const pictogramRows210: readonly PictogramRow210[] = [
  { code: "GHS01", name: "Patlayan bomba", short: "bomba", families: ["fiziksel"], classes: "Patlayıcılar; bazı kendiliğinden tepkimeye giren maddeler ve organik peroksitler", signals: ["Tehlike", "Dikkat"], h: { code: "H201", meaning: "Patlayıcı; kütle hâlinde patlama tehlikesi." } },
  { code: "GHS02", name: "Alev", short: "alev", families: ["fiziksel"], classes: "Alevlenir gaz, aerosol, sıvı ve katılar; havada kendiliğinden tutuşanlar; suyla temasında alevlenir gaz çıkaranlar", signals: ["Tehlike", "Dikkat"], h: { code: "H225", meaning: "Kolay alevlenir sıvı ve buhar." } },
  { code: "GHS03", name: "Çember üzerinde alev", short: "çember üzerinde alev", families: ["fiziksel"], classes: "Oksitleyici gaz, sıvı ve katılar", signals: ["Tehlike", "Dikkat"], h: { code: "H272", meaning: "Yangını şiddetlendirebilir; oksitleyici." } },
  { code: "GHS04", name: "Gaz tüpü", short: "gaz tüpü", families: ["fiziksel"], classes: "Basınç altındaki gazlar", signals: ["Dikkat"], h: { code: "H280", meaning: "Basınçlı gaz içerir; ısıtılırsa patlayabilir." } },
  { code: "GHS05", name: "Aşındırıcı", short: "aşındırıcı", families: ["fiziksel", "sağlık"], classes: "Cilt aşınması, ciddi göz hasarı; metaller için aşındırıcılık", signals: ["Tehlike", "Dikkat"], h: { code: "H314", meaning: "Ciddi cilt yanıklarına ve göz hasarına yol açar." } },
  { code: "GHS06", name: "Kuru kafa ve çapraz kemikler", short: "kafatası", families: ["sağlık"], classes: "Akut toksisite, kategori 1–3", signals: ["Tehlike"], h: { code: "H301", meaning: "Yutulması hâlinde toksiktir." } },
  { code: "GHS07", name: "Ünlem işareti", short: "ünlem", families: ["sağlık", "çevre"], classes: "Akut toksisite kategori 4; cilt ve göz tahrişi; cilt hassaslaşması; solunum yolu tahrişi; ozon tabakasına zarar", signals: ["Dikkat"], h: { code: "H319", meaning: "Ciddi göz tahrişine yol açar." } },
  { code: "GHS08", name: "Sağlık tehlikesi", short: "göğsünde yıldız bulunan silüet", families: ["sağlık"], classes: "Kanserojenlik, mutajenlik, üreme toksisitesi, solunum yolu hassaslaşması, hedef organ toksisitesi, aspirasyon", signals: ["Tehlike", "Dikkat"], h: { code: "H350", meaning: "Kansere yol açabilir." } },
  { code: "GHS09", name: "Çevre", short: "ölü balık–ağaç", families: ["çevre"], classes: "Sucul ortam için tehlikeli", signals: ["Dikkat"], noSignalPossible: true, h: { code: "H400", meaning: "Sucul ortamda çok toksiktir." } },
];
export const signalText210 = ({ signals, noSignalPossible }: PictogramRow210) =>
  [signals.join(" veya "), noSignalPossible ? "sinyal sözcüğü olmayabilir" : ""].filter(Boolean).join("; ");
const pictogram = (code: string) => pictogramRows210.find((row) => row.code === code)!;

{
  pictogramRows210.forEach(({ code }, i) => guard(code === `GHS0${i + 1}`, "piktogram kodları GHS01–GHS09 sırasında olmalı"));
  // H2xx fiziksel, H3xx sağlık, H4xx çevre tehlikesidir.
  const digit = { fiziksel: "2", sağlık: "3", çevre: "4" } as const;
  for (const row of pictogramRows210) {
    guard(/^H[234]\d\d$/.test(row.h.code) && row.families.some((f) => digit[f] === row.h.code[1]), `${row.code} H ifadesi ailesiyle uyumlu olmalı`);
    guard(row.signals.length > 0, `${row.code} için sinyal sözcüğü`);
  }
  guard(pictogram("GHS06").signals.join() === "Tehlike", "kafatası yalnız Tehlike ile kullanılır");
  guard(pictogram("GHS07").signals.join() === "Dikkat", "ünlem yalnız Dikkat ile kullanılır");
}

/** Bir sınıflandırma satırı: tehlike sınıfı ve kategorisi, piktogramı, sinyal sözcüğü, H ifadesi. */
export interface HazardClass210 { label: string; pictogram: string; signal: SignalWord210; h: string; meaning: string; irritation?: true }
export const exampleHazards210 = {
  flammableLiquid2: { label: "Alevlenir sıvı, kategori 2", pictogram: "GHS02", signal: "Tehlike", h: "H225", meaning: "Kolay alevlenir sıvı ve buhar." },
  eyeIrritation2: { label: "Göz tahrişi, kategori 2", pictogram: "GHS07", signal: "Dikkat", h: "H319", meaning: "Ciddi göz tahrişine yol açar.", irritation: true },
  acuteOral3: { label: "Akut toksisite (ağızdan), kategori 3", pictogram: "GHS06", signal: "Tehlike", h: "H301", meaning: "Yutulması hâlinde toksiktir." },
  skinIrritation2: { label: "Cilt tahrişi, kategori 2", pictogram: "GHS07", signal: "Dikkat", h: "H315", meaning: "Cilt tahrişine yol açar.", irritation: true },
} as const satisfies Record<string, HazardClass210>;
for (const c of Object.values(exampleHazards210)) {
  const row = pictogram(c.pictogram);
  guard((row.signals as readonly string[]).includes(c.signal), `${c.label} sinyal sözcüğü ${row.code} satırıyla uyumlu olmalı`);
}

/**
 * Etiket kararı (öğretim modeli, CLP Madde 20 ve 26’dan seçilmiş iki kural):
 * en az bir sınıf “Tehlike” istiyorsa etikette yalnız “Tehlike” yazılır;
 * GHS06 varsa GHS07 gösterilmez; GHS05 varsa GHS07 cilt ve göz tahrişi için
 * gösterilmez. H ifadelerinin hepsi yazılır.
 */
export const labelFor210 = (classes: readonly HazardClass210[]) => {
  const codes = new Set(classes.map(({ pictogram: p }) => p));
  const dropped: string[] = [];
  if (codes.has("GHS07")) {
    const only = classes.filter(({ pictogram: p }) => p === "GHS07");
    if (codes.has("GHS06") || (codes.has("GHS05") && only.every(({ irritation }) => irritation))) {
      codes.delete("GHS07");
      dropped.push("GHS07");
    }
  }
  return {
    pictograms: [...codes].sort(),
    dropped,
    signal: classes.some(({ signal }) => signal === "Tehlike") ? ("Tehlike" as const) : classes.length ? ("Dikkat" as const) : undefined,
    h: classes.map(({ h }) => h),
  };
};

const pictogramTable = {
  layout: "table" as const,
  headers: ["Kod", "Sembolün adı", "Tehlike sınıfı örnekleri", "Sinyal sözcüğü", "Örnek H ifadesi ve anlamı"],
  rows: pictogramRows210.map((row) => [row.code, row.name, row.classes, signalText210(row), `${row.h.code}: ${row.h.meaning}`]),
};
const single = (f: string) => pictogramRows210.filter(({ families }) => families.length === 1 && families[0] === f);
const physical = single("fiziksel");
const health = single("sağlık");
const env = single("çevre");
const mixed = pictogramRows210.filter(({ families }) => families.length > 1);
const onlyDanger = pictogramRows210.filter(({ signals }) => signals.join() === "Tehlike");
const onlyWarning = pictogramRows210.filter(({ signals, noSignalPossible }) => signals.join() === "Dikkat" && !noSignalPossible);
const noSignal = pictogramRows210.filter(({ noSignalPossible }) => noSignalPossible);
const codes = (rows: readonly PictogramRow210[]) => {
  const n = rows.map(({ code }) => Number(code.slice(3)));
  const run = n.every((x, i) => i === 0 || x === n[i - 1] + 1);
  return run && rows.length > 2 ? `${rows[0].code}–${rows.at(-1)!.code}` : rows.map(({ code }) => code).join(" ve ");
};
const mixedText = mixed.map(({ code, families }) => `${code} ${families.join(" ve ")}`).join(", ");
const [g02, g03, g06, g07, g08, g09] = ["GHS02", "GHS03", "GHS06", "GHS07", "GHS08", "GHS09"].map(pictogram);

export const pictogramSection210: GuideSection = {
  title: "GHS tehlike piktogramları: kod, ad, sinyal sözcüğü",
  paragraphs: [
    `Etiketlerdeki tehlike işaretleri Küresel Uyumlaştırılmış Sistem’den (GHS) gelir. Türkiye’de SEA Yönetmeliği, Avrupa Birliği’ndeki CLP Tüzüğü ile uyumludur. Her piktogram, köşesi üstte duran kırmızı çerçeveli beyaz bir kare içinde siyah bir semboldür. ${pictogramRows210.length} piktogram vardır. ${codes(physical)} fiziksel, ${codes(health)} sağlık, ${codes(env)} çevre tehlikesi içindir. İki aileye hizmet edenler: ${mixedText} (ozon tabakasına zarar). Bu tablo bir öğretim özetidir; bir maddenin gerçek sınıflandırması güvenlik bilgi formunun 2. bölümünde yazar.`,
    `Önceki bölümdeki adlar bu kodlarla eşleşir: ${g02.short} ${g02.code}, ${g03.short} ${g03.code}, ${g06.short} ${g06.code}, ${g08.short} ${g08.code}, ${g09.short} ${g09.code}. Etikette piktogramın yanında bir sinyal sözcüğü bulunur. “Tehlike” daha ağır kategorileri, “Dikkat” daha hafif kategorileri gösterir. ${codes(onlyDanger)} yalnız “Tehlike” ile, ${codes(onlyWarning)} yalnız “Dikkat” ile kullanılır. ${codes(noSignal)} “Dikkat” ile ya da sinyal sözcüğü olmadan görülür. Diğerlerinde sözcüğü kategori belirler.`,
    `H ifadesi tehlikeyi cümleyle anlatır. Kodun ilk rakamı aileyi söyler: H2 fiziksel, H3 sağlık, H4 çevre. Örneğin ${g02.h.code} “${lower(bare(g02.h.meaning))}”, ${g07.h.code} “${lower(bare(g07.h.meaning))}” demektir. Bir ürün birden çok sınıfa girerse etikette birden çok piktogram ve H ifadesi bulunur, ama tek bir sinyal sözcüğü yazılır. Sinyal sözcüğü ile piktogram tek başına çalışma koşulunu vermez; risk yine miktar, temas yolu ve önlemle değerlendirilir.`,
  ],
  table: pictogramTable,
};

const { flammableLiquid2, eyeIrritation2, acuteOral3, skinIrritation2 } = exampleHazards210;
export const labelExampleA210 = labelFor210([flammableLiquid2, eyeIrritation2]);
export const labelExampleB210 = labelFor210([acuteOral3, skinIrritation2]);
const hazardLine = (c: HazardClass210) => `${c.label} (${c.h}, “${c.signal}”)`;

export const pictogramExamples210: WorkedExample[] = [
  {
    title: "İki sınıf, iki piktogram, tek sinyal sözcüğü",
    prompt: `Bir temizlik ürününün güvenlik bilgi formunda iki sınıflandırma yazıyor: ${hazardLine(flammableLiquid2)} ve ${hazardLine(eyeIrritation2)}. Etikette hangi piktogramlar, hangi sinyal sözcüğü ve hangi H ifadeleri bulunur?`,
    strategy: "Her sınıfın piktogramını tablodan bul. Sinyal sözcüğünde en ağır olan seçilir. H ifadelerinin hepsi yazılır.",
    steps: [
      { label: "Piktogramlar", expression: `${flammableLiquid2.pictogram} + ${eyeIrritation2.pictogram}`, explanation: `${flammableLiquid2.pictogram} (${lower(pictogram(flammableLiquid2.pictogram).name)}) alevlenir sıvı, ${eyeIrritation2.pictogram} (${lower(pictogram(eyeIrritation2.pictogram).name)}) göz tahrişi içindir.` },
      { label: "Sinyal sözcüğü", expression: `“${flammableLiquid2.signal}” ve “${eyeIrritation2.signal}” → “${labelExampleA210.signal}”`, explanation: "Sınıflardan biri “Tehlike” istiyorsa etikete yalnız “Tehlike” yazılır; “Dikkat” ayrıca eklenmez." },
      { label: "H ifadeleri", expression: labelExampleA210.h.join(" + "), explanation: `${flammableLiquid2.meaning} ${eyeIrritation2.meaning}` },
    ],
    answer: `Piktogramlar ${labelExampleA210.pictograms.join(" ve ")}; sinyal sözcüğü “${labelExampleA210.signal}”; H ifadeleri ${labelExampleA210.h.join(" ve ")}.`,
    check: `İki tehlike de etikette görünür: ${labelExampleA210.pictograms.length} piktogram ve ${labelExampleA210.h.length} H ifadesi. Yalnız sinyal sözcüğü bire iner.`,
    pitfall: "Etikete hem “Tehlike” hem “Dikkat” yazmak ya da daha hafif sınıfın piktogramını atlamak. Tek kalan sinyal sözcüğüdür; piktogramlar ve H ifadeleri kalır.",
  },
  {
    title: "Kafatası varsa ünlem işareti eklenmez",
    prompt: `Bir maddenin sınıflandırması: ${hazardLine(acuteOral3)} ve ${hazardLine(skinIrritation2)}. CLP’nin öncelik kuralına göre etikette hangi piktogram ve sinyal sözcüğü bulunur? Cilt tahrişi bilgisi etiketten kaybolur mu?`,
    strategy: "Önce her sınıfın piktogramını yaz. Sonra öncelik kuralını uygula: GHS06 varsa GHS07 gösterilmez. Son olarak H ifadelerini ayrı düşün.",
    steps: [
      { label: "Ham liste", expression: `${acuteOral3.pictogram} + ${skinIrritation2.pictogram}`, explanation: `${acuteOral3.pictogram} (${lower(pictogram(acuteOral3.pictogram).name)}) akut toksisite, ${skinIrritation2.pictogram} (${lower(pictogram(skinIrritation2.pictogram).name)}) cilt tahrişi içindir.` },
      { label: "Öncelik", expression: `${acuteOral3.pictogram} varsa ${labelExampleB210.dropped.join(", ")} çıkar`, explanation: "Daha ağır sağlık tehlikesi işareti etiketteyken ünlem işareti tekrar eklenmez." },
      { label: "Sinyal sözcüğü", expression: `“${labelExampleB210.signal}”`, explanation: `${acuteOral3.label} “${acuteOral3.signal}” ister.` },
      { label: "H ifadeleri", expression: labelExampleB210.h.join(" + "), explanation: `${acuteOral3.meaning} ${skinIrritation2.meaning} Piktogram düşse de H ifadesi kalır.` },
    ],
    answer: `Yalnız ${labelExampleB210.pictograms.join(", ")} ve “${labelExampleB210.signal}”. Cilt tahrişi kaybolmaz: ${skinIrritation2.h} ifadesi etikette yazılır.`,
    check: `Etikette ${labelExampleB210.pictograms.length} piktogram ve ${labelExampleB210.h.length} H ifadesi var. Ünlem yoksa “tahriş yok” anlamı çıkmaz; tahriş H ifadesiyle bildirilir.`,
    pitfall: "Ünlem işareti görünmediği için maddenin cildi tahriş etmediğini sanmak. Önce H ifadelerini oku.",
  },
];

export const pictogramSupplement210 = {
  title: pictogramSection210.title,
  figureTitle: pictogramSection210.title,
  paragraphs: pictogramSection210.paragraphs,
  summary: `${pictogramRows210.length} piktogram: ${pictogramRows210.map(({ code, name }) => `${code} ${lower(name)}`).join(", ")}. H2 fiziksel, H3 sağlık, H4 çevre. ${codes(onlyDanger)} yalnız “Tehlike”, ${codes(onlyWarning)} yalnız “Dikkat”. Etikette tek sinyal sözcüğü; GHS06 varsa GHS07 eklenmez. Öğretim özetidir; gerçek sınıf güvenlik bilgi formundadır.`,
  appendSection: true as const,
  table: pictogramTable,
  examples: pictogramExamples210,
};

/* ======================================================================
 * Atom modelleri: Dalton, Thomson, Rutherford, Bohr + hidrojen düzeyleri
 * ==================================================================== */

/*
 * Sabitler: h = 6,62607015×10⁻³⁴ J·s, c = 299 792 458 m/s ve
 * e = 1,602176634×10⁻¹⁹ C, 2019 SI tanımındaki kesin değerlerdir (BIPM).
 * Rydberg enerjisi hcR∞ = 13,605693122994 eV (CODATA 2018). Lise
 * kitaplarındaki 13,6 eV bunun yuvarlanmışıdır; çekirdek hareketi ve
 * ince yapı ihmal edilir.
 */
export const bohrConstants210 = {
  h: 6.62607015e-34,
  c: 299792458,
  e: 1.602176634e-19,
  rydbergEv: 13.605693122994,
  teachingEv: 13.6,
} as const;
guard(Math.abs(bohrConstants210.teachingEv - bohrConstants210.rydbergEv) < 0.01, "13,6 eV Rydberg enerjisinin yuvarlanmışı olmalı");
/** hc / e, eV·nm cinsinden (≈ 1240). */
export const hcEvNm210 = (bohrConstants210.h * bohrConstants210.c) / bohrConstants210.e * 1e9;
/** Bohr modelinde hidrojenin n. düzey enerjisi (eV), En = −13,6/n². */
export const bohrEnergyEv210 = (n: number) => -bohrConstants210.teachingEv / n ** 2;
export const bohrEnergyJ210 = (n: number) => bohrEnergyEv210(n) * bohrConstants210.e;
/** İki düzey arası foton enerjisi (eV, pozitif) ve dalga boyu (nm). */
export const bohrTransition210 = (from: number, to: number) => {
  const deltaEv = Math.abs(bohrEnergyEv210(from) - bohrEnergyEv210(to));
  return { from, to, emitted: from > to, deltaEv, nm: hcEvNm210 / deltaEv };
};
export const bohrLevels210 = [1, 2, 3, 4].map((n) => ({ n, ev: bohrEnergyEv210(n) }));
export const balmer32_210 = bohrTransition210(3, 2);
export const balmer42_210 = bohrTransition210(4, 2);
{
  guard(bohrLevels210.every(({ ev }, i, all) => ev < 0 && (i === 0 || ev > all[i - 1].ev)), "Bohr düzeyleri negatif ve yukarı doğru artan olmalı");
  // Görünür bölge yaklaşık 380–750 nm; iki Balmer çizgisi bu aralıkta.
  for (const t of [balmer32_210, balmer42_210]) guard(t.nm > 380 && t.nm < 750, "Balmer çizgisi görünür bölgede olmalı");
  guard(balmer42_210.nm < balmer32_210.nm, "büyük enerji farkı kısa dalga boyu vermeli");
}
/** 2,18×10⁻¹⁸ biçimi. */
export const sci210 = (x: number, digits = 2) => {
  const exp = Math.floor(Math.log10(Math.abs(x)));
  return `${num210(x / 10 ** exp, digits)}×10${sup210(exp)}`;
};
const e1J = bohrEnergyJ210(1);

export interface AtomModelRow210 {
  name: string;
  year: number;
  evidence: string;
  idea: string;
  explains: string;
  fails: string;
}
export const atomModelRows210: readonly AtomModelRow210[] = [
  {
    name: "Dalton",
    year: 1803,
    evidence: "Kimyasal birleşmelerde kütlenin korunumu ve sabit oranlar",
    idea: "Atom içi dolu, bölünemez küredir. Aynı elementin atomları özdeştir.",
    explains: "Kütlenin korunumu, sabit ve katlı oranlar",
    fails: "Elektron gibi atom altı tanecikler, iyonlar ve izotoplar",
  },
  {
    name: "Thomson",
    year: 1904,
    evidence: "Katot ışınlarının negatif yüklü taneciklerden (elektron) oluşması",
    idea: "Pozitif yük atomun bütün hacmine yayılmıştır; elektronlar onun içine gömülüdür.",
    explains: "Atomun elektron içermesi, nötr atomda yük dengesi",
    fails: "Alfa taneciklerinin az bir kısmının büyük açıyla sapması",
  },
  {
    name: "Rutherford",
    year: 1911,
    evidence: "İnce altın levhada alfa taneciklerinin saçılması",
    idea: "Pozitif yük ve kütlenin çoğu küçük, yoğun çekirdektedir. Atomun büyük kısmı boşluktur.",
    explains: "Alfa taneciklerinin çoğunun geçmesi, azının büyük açıyla sapması",
    fails: "Elektronun çekirdeğe düşmemesi ve çizgi spektrumu",
  },
  {
    name: "Bohr",
    year: 1913,
    evidence: "Hidrojenin çizgi spektrumu",
    idea: "Elektron yalnız belirli enerji düzeylerinde bulunur; düzey değiştirirken düzey farkı kadar enerji soğurur veya yayar.",
    explains: "Hidrojen ve tek elektronlu iyonların çizgi spektrumu",
    fails: "Çok elektronlu atomların spektrumu; elektronun kesin yörünge fikri",
  },
];
{
  guard(atomModelRows210.every(({ year }, i, all) => i === 0 || year > all[i - 1].year), "modeller kronolojik sırada olmalı");
  // Her model, bir öncekinin açıklayamadığı kanıta dayanır.
  const keys = ["elektron", "sapma", "spektrum"];
  atomModelRows210.slice(1).forEach((row, i) => {
    const prev = atomModelRows210[i];
    const key = keys[i];
    guard(prev.fails.toLocaleLowerCase("tr-TR").includes(key) && `${row.evidence} ${row.explains}`.toLocaleLowerCase("tr-TR").includes(key), `${row.name} ${prev.name}’ın sınırını açıklamalı`);
  });
}

const atomTable = {
  layout: "table" as const,
  headers: ["Model", "Model yılı", "Dayandığı kanıt", "Temel varsayım", "Açıkladığı", "Açıklayamadığı"],
  rows: atomModelRows210.map(({ name, year, evidence, idea, explains, fails }) => [name, String(year), evidence, idea, explains, fails]),
};
const [dalton, thomson, rutherford, bohr] = atomModelRows210;
const [L1, L2, L3, L4] = bohrLevels210;
const ev = (x: number) => `${num210(x)} eV`;

export const atomModelSection210: GuideSection = {
  title: "Dört model tek tabloda: kanıt, varsayım, açıklanan ve açıklanamayan",
  paragraphs: [
    `Tabloyu soldan sağa oku: her modelin dayandığı kanıt, bu kanıttan çıkan varsayım, açıkladığı ve açıklayamadığı. Bir satırın son sütunu bir sonraki modelin başlangıç noktasıdır. ${dalton.name} modelinin (${dalton.year}) açıklayamadıkları: ${lower(dalton.fails)}. ${thomson.name} (${thomson.year}) elektronu modele katar; açıklayamadığı: ${lower(thomson.fails)}. ${rutherford.name} (${rutherford.year}) bu sapmayı çekirdekle açıklar; açık kalan: ${lower(rutherford.fails)}. ${bohr.name} (${bohr.year}) spektrumu belirli enerji düzeyleriyle açıklar.`,
    `Bohr modelinde hidrojenin düzey enerjileri Eₙ = −${num210(bohrConstants210.teachingEv, 1)}/n² eV bağıntısıyla bulunur. n düzey numarasıdır (1, 2, 3, …). Eksi işareti elektronun çekirdeğe bağlı olduğunu gösterir; atomdan kopan elektronun enerjisi sıfır alınır. n = ${L1.n} için ${ev(L1.ev)}, n = ${L2.n} için ${ev(L2.ev)}, n = ${L3.n} için ${ev(L3.ev)}, n = ${L4.n} için ${ev(L4.ev)} çıkar. Joule ile yazınca E₁ ≈ ${sci210(e1J)} J olur.`,
    `Elektron ${balmer32_210.from}. düzeyden ${balmer32_210.to}. düzeye inerken iki düzeyin farkı kadar, ${ev(balmer32_210.deltaEv)} enerjili foton yayılır. Fotonun dalga boyu λ = hc/ΔE ile yaklaşık ${num210(balmer32_210.nm, 0)} nm bulunur; bu, hidrojen spektrumundaki kırmızı çizgidir. ${balmer42_210.from} → ${balmer42_210.to} geçişinde fark ${ev(balmer42_210.deltaEv)} ve λ ≈ ${num210(balmer42_210.nm, 0)} nm olur. Fark büyüdükçe dalga boyu kısalır. Bu hesap yalnız tek elektronlu türler için geçerlidir; çok elektronlu atomlarda Bohr modeli yetmez.`,
  ],
  table: atomTable,
};

export interface AtomObservation210 { text: string; model: string }
export const atomObservations210: readonly AtomObservation210[] = [
  { text: "Bir bileşikte elementlerin kütle oranı hep aynıdır.", model: "Dalton" },
  { text: "Katot ışınları elektrik alanında pozitif levhaya doğru sapar.", model: "Thomson" },
  { text: "Altın levhaya gönderilen alfa taneciklerinin çok azı geri döner.", model: "Rutherford" },
  { text: "Hidrojen yalnız belirli dalga boylarında ışık yayar.", model: "Bohr" },
];
for (const { model } of atomObservations210) guard(atomModelRows210.some(({ name }) => name === model), `${model} tabloda olmalı`);
const obsLetters = ["I", "II", "III", "IV"];
const t42 = balmer42_210;

export const atomModelExamples210: WorkedExample[] = [
  {
    title: "Hidrojende 4 → 2 geçişinin enerjisi ve dalga boyu",
    prompt: `Bohr modelinde hidrojen atomunun düzey enerjileri Eₙ = −${num210(bohrConstants210.teachingEv, 1)}/n² eV’tur (n = 1, 2, 3, …). Elektron n = ${t42.from} düzeyinden n = ${t42.to} düzeyine geçiyor. Bu geçişte enerji soğurulur mu, yayılır mı? Fotonun enerjisi kaç eV ve dalga boyu yaklaşık kaç nm’dir? hc ≈ ${num210(hcEvNm210, 0)} eV·nm alın.`,
    strategy: "İki düzeyin enerjisini ayrı hesapla. Üst düzeyden alta inişte fark kadar enerji yayılır. Dalga boyu λ = hc/ΔE ile bulunur.",
    steps: [
      { label: `E${t42.from}`, expression: `−${num210(bohrConstants210.teachingEv, 1)}/${t42.from ** 2} = ${ev(bohrEnergyEv210(t42.from))}`, explanation: "n² paydaya yazılır." },
      { label: `E${t42.to}`, expression: `−${num210(bohrConstants210.teachingEv, 1)}/${t42.to ** 2} = ${ev(bohrEnergyEv210(t42.to))}`, explanation: "Alt düzey daha negatiftir, yani daha düşük enerjilidir." },
      { label: "Enerji farkı", expression: `ΔE = ${num210(bohrEnergyEv210(t42.from))} − (${num210(bohrEnergyEv210(t42.to))}) = ${ev(t42.deltaEv)}`, explanation: "Elektron alt düzeye indiği için bu enerji foton olarak yayılır." },
      { label: "Dalga boyu", expression: `λ = ${num210(hcEvNm210, 0)} / ${num210(t42.deltaEv)} ≈ ${num210(t42.nm, 0)} nm`, explanation: "380–750 nm aralığı görünür ışıktır; bu çizgi mavi-yeşil renktedir." },
    ],
    answer: `Enerji yayılır; ΔE = ${ev(t42.deltaEv)}, λ ≈ ${num210(t42.nm, 0)} nm.`,
    check: `Kısa yoldan: ΔE = ${num210(bohrConstants210.teachingEv, 1)} · (1/${t42.to ** 2} − 1/${t42.from ** 2}) = ${num210(bohrConstants210.teachingEv, 1)} · 3/16 = ${ev(t42.deltaEv)}. Değer 3 → 2 geçişinin ${ev(balmer32_210.deltaEv)} değerinden büyük olduğu için dalga boyu ${num210(balmer32_210.nm, 0)} nm’den kısadır.`,
    pitfall: `Eksi işaretleri unutup ${ev(bohrEnergyEv210(t42.from))} ile ${ev(bohrEnergyEv210(t42.to))} değerlerini toplamak. Enerji farkı üst düzeyden alt düzey çıkarılarak bulunur ve foton enerjisi pozitiftir.`,
  },
  {
    title: "Dört gözlemi onu ilk açıklayan modelle eşleştir",
    prompt: `${atomObservations210.map(({ text }, i) => `${obsLetters[i]}. ${text}`).join(" ")} Her gözlemi, tablodaki modellerden onu açıklayan ilk modelle eşleştir. Bohr modeli hangi gözlemde helyum atomu için yetersiz kalır?`,
    strategy: "Her gözlemin anahtar kavramını bul: kütle oranı, negatif tanecik, büyük sapma, belirli dalga boyu. Sonra tablonun “Açıkladığı” sütununda bu kavramın ilk geçtiği satırı seç.",
    steps: atomObservations210.map(({ model }, i) => ({
      label: obsLetters[i],
      expression: `${obsLetters[i]} → ${model}`,
      explanation: `${atomModelRows210.find(({ name }) => name === model)!.explains}.`,
    })),
    answer: `${atomObservations210.map(({ model }, i) => `${obsLetters[i]}–${model}`).join(", ")}. Bohr modeli ${obsLetters[3]}. gözlemi hidrojende açıklar, iki elektronlu helyum atomunda açıklayamaz.`,
    check: "Sıra yıllarla da uyumludur: her model bir öncekinin açıklayamadığı gözlemi açıklar.",
    pitfall: `${obsLetters[2]}. gözlemi Thomson’a bağlamak. Thomson modelinde pozitif yük yayılmıştır; geri dönen alfa taneciği küçük ve yoğun bir çekirdek gerektirir.`,
  },
];

export const atomModelSupplement210 = {
  title: atomModelSection210.title,
  figureTitle: atomModelSection210.title,
  paragraphs: atomModelSection210.paragraphs,
  summary: `${atomModelRows210.map(({ name, year, explains }) => `${name} ${year}: ${lower(explains)}`).join(". ")}. Bohr: Eₙ = −${num210(bohrConstants210.teachingEv, 1)}/n² eV; E₁ = ${ev(L1.ev)}, E₂ = ${ev(L2.ev)}, E₃ = ${ev(L3.ev)}. 3→2: ${ev(balmer32_210.deltaEv)}, ≈${num210(balmer32_210.nm, 0)} nm; 4→2: ${ev(balmer42_210.deltaEv)}, ≈${num210(balmer42_210.nm, 0)} nm.`,
  appendSection: true as const,
  table: atomTable,
  examples: atomModelExamples210,
};

/* ======================================================================
 * Periyodik sistem: Z = 1–20 için dizilimden periyot, grup ve blok
 * ==================================================================== */

export const elements210 = [
  ["H", "Hidrojen"], ["He", "Helyum"], ["Li", "Lityum"], ["Be", "Berilyum"], ["B", "Bor"],
  ["C", "Karbon"], ["N", "Azot"], ["O", "Oksijen"], ["F", "Flor"], ["Ne", "Neon"],
  ["Na", "Sodyum"], ["Mg", "Magnezyum"], ["Al", "Alüminyum"], ["Si", "Silisyum"], ["P", "Fosfor"],
  ["S", "Kükürt"], ["Cl", "Klor"], ["Ar", "Argon"], ["K", "Potasyum"], ["Ca", "Kalsiyum"],
] as const;
/** İlk 20 element için doldurma sırası (Aufbau): 3d, 4s’den sonra gelir. */
export const fillOrder210 = [
  { n: 1, l: "s", cap: 2 }, { n: 2, l: "s", cap: 2 }, { n: 2, l: "p", cap: 6 },
  { n: 3, l: "s", cap: 2 }, { n: 3, l: "p", cap: 6 }, { n: 4, l: "s", cap: 2 },
] as const;

export const configuration210 = (z: number) => {
  const filled: { n: number; l: "s" | "p"; e: number }[] = [];
  let left = z;
  for (const { n, l, cap } of fillOrder210) {
    if (left <= 0) break;
    const e = Math.min(cap, left);
    filled.push({ n, l, e });
    left -= e;
  }
  if (left > 0) throw new Error(`depth210: Z = ${z} bu doldurma sırasının dışında`);
  return filled;
};
export const periodicRow210 = (z: number) => {
  const [symbol, name] = elements210[z - 1];
  const subs = configuration210(z);
  const period = Math.max(...subs.map(({ n }) => n));
  const shells = Array.from({ length: period }, (_, i) => subs.filter(({ n }) => n === i + 1).reduce((s, { e }) => s + e, 0));
  const last = subs.at(-1)!;
  const block = last.l;
  const outer = subs.filter(({ n }) => n === period);
  const sOuter = outer.find(({ l }) => l === "s")?.e ?? 0;
  const pOuter = outer.find(({ l }) => l === "p")?.e ?? 0;
  const helium = z === 2;
  const group = helium ? 18 : block === "s" ? sOuter : 12 + pOuter;
  const oldGroup = helium ? "8A" : `${sOuter + pOuter}A`;
  const rule = helium
    ? "1s dolu, soy gaz: 18. grup"
    : block === "s"
      ? `${period}s${sup210(sOuter)} → ${group}. grup`
      : `${period}s${sup210(sOuter)} ${period}p${sup210(pOuter)} → 12 + ${pOuter} = ${group}. grup`;
  return {
    z, symbol, name, subs, period, shells, block, group, oldGroup, rule,
    orbital: subs.map(({ n, l, e }) => `${n}${l}${sup210(e)}`).join(" "),
    shellText: shells.join(","),
    valence: shells.at(-1)!,
  };
};
export const periodicRows210 = Array.from({ length: elements210.length }, (_, i) => periodicRow210(i + 1));
{
  for (const row of periodicRows210) {
    // Katman kuralı (rehber): elektron içeren katman sayısı periyodu verir.
    guard(row.period === row.shells.length && row.shells.every((e) => e > 0), `${row.symbol}: periyot katman sayısıyla aynı olmalı`);
    row.shells.forEach((e, i) => guard(e <= 2 * (i + 1) ** 2, `${row.symbol}: katman kapasitesi 2n²`));
    guard(row.shells.reduce((a, b) => a + b, 0) === row.z, `${row.symbol}: elektron sayısı Z olmalı`);
    // Son katmandaki elektron: 1, 2 → 1., 2. grup; 3…8 → 13…18. grup (He hariç).
    if (row.z !== 2) guard(row.group === (row.valence <= 2 ? row.valence : row.valence + 10), `${row.symbol}: katman ve orbital kuralı aynı grubu vermeli`);
    guard((row.group <= 2) === (row.block === "s") || row.z === 2, `${row.symbol}: 1–2. grup s, 13–18. grup p bloku`);
  }
  for (const a of periodicRows210) for (const b of periodicRows210)
    if (a.group === b.group && a.z !== 2 && b.z !== 2) guard(a.valence === b.valence, "He dışında aynı grupta son katman elektronu aynı olmalı");
  const he = periodicRows210[1];
  guard(he.block === "s" && he.group === 18, "He s blokunda olup 18. grupta gösterilir");
  guard(periodicRows210.filter(({ block, group }) => block === "s" && group === 18).length === 1, "tek istisna He olmalı");
}

const periodicTable = {
  layout: "table" as const,
  headers: ["Z · Element", "Katman dizilimi", "Orbital dizilimi", "Periyot · Grup", "Blok"],
  rows: periodicRows210.map(({ z, symbol, name, shellText, orbital, period, group, oldGroup, block }) =>
    [`${z} · ${symbol} · ${name}`, shellText, orbital, `${period}. periyot · ${group}. grup (${oldGroup})`, block]),
};
const prow = (symbol: string) => periodicRows210.find((row) => row.symbol === symbol)!;
const [pAl, pHe, pK, pCa, pAr, pNa] = ["Al", "He", "K", "Ca", "Ar", "Na"].map(prow);
const sBlock = periodicRows210.filter(({ block }) => block === "s").length;
const pBlock = periodicRows210.filter(({ block }) => block === "p").length;

export const periodicSection210: GuideSection = {
  title: "Z = 1–20 için dizilimden periyot, grup ve blok",
  paragraphs: [
    `Katmanlar alt katmanlardan oluşur: 1. katmanda 1s, 2. katmanda 2s ve 2p, 3. katmanda 3s ve 3p vardır. Bir s alt katmanı en çok 2, bir p alt katmanı en çok 6 elektron alır. İlk ${periodicRows210.length} elementte elektronlar ${fillOrder210.map(({ n, l }) => `${n}${l}`).join(" → ")} sırasıyla yerleşir. 3d alt katmanı 4s’den sonra dolmaya başlar, bu yüzden ${pK.symbol} ve ${pCa.symbol} atomlarında son elektron 4s’dedir.`,
    `Tablodaki her satır üç kuralla okunur. Periyot, dizilimdeki en büyük katman numarasıdır: ${pAl.symbol} için ${pAl.orbital}, en büyük n = ${pAl.period}, yani ${pAl.period}. periyot. Blok, son elektronun girdiği alt katmandır: ${pAl.symbol} ${pAl.block} blokundadır. Grup s blokunda son katmandaki s elektron sayısı, p blokunda 12 + p elektron sayısıdır: ${pAl.symbol} için ${pAl.rule}. Eski adlandırmada son katmandaki elektron sayısı A grubunu verir (He hariç): ${pAl.oldGroup}.`,
    `${periodicRows210.length} elementin ${sBlock} tanesi s, ${pBlock} tanesi p blokundadır. Tek istisna ${lower(pHe.name)}dur (${pHe.symbol}): dizilimi ${pHe.orbital} olduğu için s blokundadır, ama dolu katmanı ve soy gaz davranışı nedeniyle ${pHe.group}. grupta gösterilir. ${pAr.symbol} (Z = ${pAr.z}) ${pAr.period}. periyodu kapatır; bir sonraki ${pK.symbol} yeni bir katmana başlar ve ${pK.period}. periyot ${pK.group}. gruptadır. He dışında aynı gruptaki elementlerin son katman elektron sayısı aynıdır: ${pNa.symbol} ${pNa.shellText}, ${pK.symbol} ${pK.shellText}.`,
  ],
  table: periodicTable,
};

const ending = (n: number, l: "s" | "p", e: number) => periodicRows210.find(({ subs }) => {
  const last = subs.at(-1)!;
  return last.n === n && last.l === l && last.e === e;
})!;
export const periodicExampleA210 = ending(3, "p", 4);
const exA = periodicExampleA210;
export const periodicExampleB210 = [pAr, prow(elements210[pAr.z][0]), prow(elements210[pAr.z + 1][0])] as const;
const [exB0, exB1, exB2] = periodicExampleB210;
const zSum = (row: ReturnType<typeof periodicRow210>) => row.subs.map(({ e }) => e).join(" + ");

export const periodicExamples210: WorkedExample[] = [
  {
    title: "3p⁴ ile biten dizilimden adres",
    prompt: "Nötr bir X atomunun temel hâldeki orbital dizilimi 3p⁴ ile bitiyor. X’in atom numarası, katman dizilimi, periyodu, grubu ve bloku nedir?",
    strategy: "Dizilimi baştan 3p⁴’e kadar yaz ve elektronları topla. Sonra en büyük n periyodu, son alt katman bloku, son katmandaki s ve p elektronları grubu verir.",
    steps: [
      { label: "Dizilim", expression: exA.orbital, explanation: "3p’ye gelmeden önceki alt katmanlar tam doludur." },
      { label: "Atom numarası", expression: `Z = ${zSum(exA)} = ${exA.z}`, explanation: `Nötr atomda elektron sayısı proton sayısına eşittir: ${exA.symbol} (${lower(exA.name)}).` },
      { label: "Katman", expression: exA.shellText, explanation: `En büyük katman numarası ${exA.period}, bu yüzden ${exA.period}. periyot.` },
      { label: "Grup ve blok", expression: exA.rule, explanation: `Son elektron p alt katmanında: ${exA.block} bloku. Eski adla ${exA.oldGroup}.` },
    ],
    answer: `Z = ${exA.z} (${exA.symbol}); ${exA.shellText}; ${exA.period}. periyot, ${exA.group}. grup (${exA.oldGroup}), ${exA.block} bloku.`,
    check: `Katman kuralıyla: son katmanda ${exA.valence} elektron → ${exA.valence} + 10 = ${exA.group}. grup. İki yol aynı sonucu verir.`,
    pitfall: `3p⁴’teki 4’ü grup numarası sanmak. p blokunda s elektronları da sayılır: ${exA.valence - exA.subs.at(-1)!.e} + ${exA.subs.at(-1)!.e} = ${exA.valence} değerlik elektronu, grup ${exA.group}.`,
  },
  {
    title: "Ardışık üç atomda yeni periyoda geçiş",
    prompt: `X, Y ve T, atom numaraları ardışık olan üç elementtir (X < Y < T). X, ${exB0.period}. periyot ${exB0.group}. grupta bulunan elementtir. Y ve T’nin periyot, grup ve bloku nedir?`,
    strategy: "Önce X’i bul, sonra atom numarasını birer artır. Yeni elektronun hangi alt katmana girdiğine bak.",
    steps: [
      { label: "X", expression: `${exB0.symbol}, Z = ${exB0.z}: ${exB0.orbital}`, explanation: `${exB0.period}. periyodun son elementi; 3p dolu.` },
      { label: "Y", expression: `Z = ${exB1.z}: … ${exB1.subs.at(-1)!.n}${exB1.block}${sup210(exB1.subs.at(-1)!.e)}`, explanation: `Elektron 3d’ye değil 4s’ye girer. En büyük n = ${exB1.period}: ${exB1.symbol}, ${exB1.period}. periyot, ${exB1.rule}.` },
      { label: "T", expression: `Z = ${exB2.z}: … ${exB2.subs.at(-1)!.n}${exB2.block}${sup210(exB2.subs.at(-1)!.e)}`, explanation: `4s dolar: ${exB2.symbol}, ${exB2.period}. periyot, ${exB2.rule}.` },
    ],
    answer: `Y: ${exB1.symbol}, ${exB1.period}. periyot ${exB1.group}. grup ${exB1.block} bloku. T: ${exB2.symbol}, ${exB2.period}. periyot ${exB2.group}. grup ${exB2.block} bloku.`,
    check: `Katman dizilimleri ${exB1.shellText} ve ${exB2.shellText}: dört katman ve son katmanda ${exB1.valence} ile ${exB2.valence} elektron.`,
    pitfall: `Y’yi ${exB0.period}. periyoda koymak ya da ${exB0.group + 1}. grup aramak. 18. gruptan sonra yeni periyot başlar ve sayım 1. gruptan devam eder.`,
  },
];

export const periodicSupplement210 = {
  title: periodicSection210.title,
  figureTitle: periodicSection210.title,
  paragraphs: periodicSection210.paragraphs,
  summary: `Sıra ${fillOrder210.map(({ n, l }) => `${n}${l}`).join(" → ")}. Periyot = en büyük n; blok = son alt katman; grup: s blokunda s elektron sayısı, p blokunda 12 + p. ${pAl.symbol}: ${pAl.orbital} → ${pAl.period}. periyot, ${pAl.group}. grup, ${pAl.block}. ${pHe.symbol} s blokunda ama ${pHe.group}. grupta. ${pK.symbol}: ${pK.orbital} → ${pK.period}. periyot, ${pK.group}. grup.`,
  appendSection: true as const,
  table: periodicTable,
  examples: periodicExamples210,
};

export const depth210Supplements = {
  "periyodik-sistem": [periodicSupplement210],
};
