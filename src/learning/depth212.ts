import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Biyoloji derinleştirmesi (0.212). Kabul edilmiş rehber metinleri
 * değişmez; tablo bölümü, iki özgün çözümlü örnek ve bölüm çizimi görüntüleme
 * katmanında eklenir. Paragraflardaki adlar ve sayılar, tablo satırları,
 * çizim okumaları ve Kopya Kâğıdı özetleri aşağıdaki verilerden ve evre
 * modelinden üretilir. Genel iddialar modül yüklenirken denetlenir: veri
 * iddiayı desteklemezse modül hata verir.
 */

const guard = (ok: boolean, message: string) => {
  if (!ok) throw new Error(`depth212: ${message}`);
};
const joinTr = (items: readonly string[]) =>
  items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} ve ${items.at(-1)}`;
const lower = (s: string) => s.charAt(0).toLocaleLowerCase("tr-TR") + s.slice(1);
const SUP: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
const sup = (n: number) => [...String(n)].map((c) => SUP[c]).join("");
/** Düzyazıda ad: ilk harf küçük; kısaltma (ER) ve özel ad (Golgi) olduğu gibi. */
const properNames = new Set(["Golgi"]);
const prose = (s: string) => (/^[A-ZÇĞİÖŞÜ]{2}/.test(s) || properNames.has(s) ? s : lower(s));
/** Ad listesi; first: "upper" cümle başında, "lower" cümle içinde. */
const list = (items: readonly { name: string }[], first: "upper" | "lower" = "lower") =>
  joinTr(items.map(({ name }, i) => (i === 0 && first === "upper" ? name : prose(name))));
const upper = (s: string) => s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1);

/* ---------- Hücre organelleri: zar, DNA ve hücre tipi ---------- */

export type CellKind212 = "bitki" | "hayvan" | "bakteri";
export const cellKinds212: readonly CellKind212[] = ["bitki", "hayvan", "bakteri"];
export interface Organelle212 {
  name: string;
  /** Yapıyı çevreleyen ayrı biyolojik zar sayısı. */
  membranes: 0 | 1 | 2;
  /** Yapının kendi DNA’sı. */
  dna: boolean;
  /** Yapının kendi ribozomları (ribozomun kendisi için false). */
  ownRibosomes: boolean;
  cells: Record<CellKind212, boolean>;
  cellNote?: string;
  role: string;
}

export const organelles212: readonly Organelle212[] = [
  { name: "Ribozom", membranes: 0, dna: false, ownRibosomes: false, cells: { bitki: true, hayvan: true, bakteri: true }, role: "Protein sentezi" },
  { name: "Sentrozom", membranes: 0, dna: false, ownRibosomes: false, cells: { bitki: false, hayvan: true, bakteri: false }, cellNote: "gelişmiş bitkide yok", role: "Mikrotübül düzenleme, iğ" },
  { name: "ER", membranes: 1, dna: false, ownRibosomes: false, cells: { bitki: true, hayvan: true, bakteri: false }, role: "Madde taşıma, lipit sentezi" },
  { name: "Golgi", membranes: 1, dna: false, ownRibosomes: false, cells: { bitki: true, hayvan: true, bakteri: false }, role: "Değiştirme, paketleme" },
  { name: "Lizozom", membranes: 1, dna: false, ownRibosomes: false, cells: { bitki: false, hayvan: true, bakteri: false }, cellNote: "bitkide bu işi çoğunlukla koful yapar", role: "Hücre içi sindirim" },
  { name: "Çekirdek", membranes: 2, dna: true, ownRibosomes: false, cells: { bitki: true, hayvan: true, bakteri: false }, role: "Kalıtsal bilgiyi taşır" },
  { name: "Mitokondri", membranes: 2, dna: true, ownRibosomes: true, cells: { bitki: true, hayvan: true, bakteri: false }, role: "Oksijenli solunum, ATP" },
  { name: "Kloroplast", membranes: 2, dna: true, ownRibosomes: true, cells: { bitki: true, hayvan: false, bakteri: false }, cellNote: "fotosentez yapan hücrede", role: "Fotosentez" },
];

export const membraneText212 = (m: 0 | 1 | 2) => ["Zarsız", "Tek zarlı", "Çift zarlı"][m];
export const dnaText212 = ({ dna, ownRibosomes }: Organelle212) => (dna ? (ownRibosomes ? "Var; kendi ribozomu da var" : "Var") : "Yok");
export const cellText212 = ({ cells, cellNote }: Organelle212) => {
  const list = cellKinds212.filter((kind) => cells[kind]);
  return `${upper(list.join(", "))}${cellNote ? ` (${cellNote})` : ""}`;
};
const byMembrane = (m: 0 | 1 | 2) => organelles212.filter(({ membranes }) => membranes === m);
const withDna = organelles212.filter(({ dna }) => dna);
const withRibosomes = organelles212.filter(({ ownRibosomes }) => ownRibosomes);
const inBacteria = organelles212.filter(({ cells }) => cells.bakteri);
const ribosome212 = organelles212[0];

guard(withDna.every(({ membranes }) => membranes === 2) && byMembrane(2).every(({ dna }) => dna), "DNA taşıyanlar tam olarak çift zarlılar olmalı");
guard(withRibosomes.every(({ dna }) => dna), "kendi ribozomu olan yapı kendi DNA’sını da taşımalı");
guard(inBacteria.length === 1 && inBacteria[0] === ribosome212 && ribosome212.membranes === 0, "bakteride tablodan yalnız zarsız ribozom bulunmalı");
guard(organelles212.every(({ cells }) => cells.bitki || cells.hayvan), "her yapı ökaryot hücrelerden birinde bulunmalı");

/** İpuçlarına uyan yapılar: zar sayısı, DNA, ribozom ve hücre tipleri. */
export const matchOrganelles212 = (clue: { membranes?: 0 | 1 | 2; dna?: boolean; ownRibosomes?: boolean; cells?: CellKind212[] }) =>
  organelles212.filter((o) =>
    (clue.membranes === undefined || o.membranes === clue.membranes) &&
    (clue.dna === undefined || o.dna === clue.dna) &&
    (clue.ownRibosomes === undefined || o.ownRibosomes === clue.ownRibosomes) &&
    (clue.cells ?? []).every((kind) => o.cells[kind]));

const organelleTable = {
  layout: "table" as const,
  headers: ["Yapı", "Zar", "Kendi DNA’sı", "Bulunduğu hücre", "Temel görev"],
  rows: organelles212.map((o) => [o.name, membraneText212(o.membranes), dnaText212(o), cellText212(o), o.role]),
};
const animalOnlyMembraneless = organelles212.filter(({ membranes, cells }) => membranes === 0 && cells.hayvan && !cells.bitki);
guard(animalOnlyMembraneless.length === 1, "hayvana özgü tek zarsız yapı olmalı");
const sentrozom = animalOnlyMembraneless[0];
const chloroplast = organelles212.find(({ cells }) => cells.bitki && !cells.hayvan)!;
guard(organelles212.filter(({ cells }) => cells.bitki && !cells.hayvan).length === 1, "yalnız bitkide bulunan tek yapı olmalı");

export const organelleSection212: GuideSection = {
  title: "Organeli zar sayısı, DNA ve hücre tipiyle tanı",
  paragraphs: [
    `Tabloda ${organelles212.length} yapı var. Zarsız olanlar ${list(byMembrane(0))}; tek zarlı olanlar ${list(byMembrane(1))}; çift zarlı olanlar ${list(byMembrane(2))}. Zar sayısı, yapının kaç ayrı biyolojik zarla çevrili olduğudur. Her zar kendi fosfolipit çift tabakasını taşır; çift tabaka tek zar sayılır.`,
    `Kendi DNA’sını taşıyan ${withDna.length} yapının hepsi çift zarlıdır: ${list(withDna)}. Bunlardan ${list(withRibosomes)} kendi ribozomlarını da taşır ve bazı proteinlerini kendileri üretir; yine de bütün proteinlerini bağımsız üretemez. ${ribosome212.name} DNA taşımaz; rRNA ve proteinden oluşur.`,
    `Bakteri sütununda yalnız ${lower(ribosome212.name)} bulunur. Bakteride zarla çevrili çekirdek ve zarlı organel yoktur, ama ribozomla protein sentezi yapılır. ${sentrozom.name} hayvan hücresinde bulunur, gelişmiş bitki hücresinde bulunmaz. ${chloroplast.name} yalnız bitki sütununda işaretlidir ve orada da ${chloroplast.cellNote} bulunur; kök hücresinde yoktur.`,
  ],
  table: organelleTable,
};

const clue1 = { membranes: 2 as const };
const clue2 = { ...clue1, dna: true, ownRibosomes: true };
const clue3 = { ...clue2, cells: ["bitki", "hayvan"] as CellKind212[] };
const step1 = matchOrganelles212(clue1);
const step2 = matchOrganelles212(clue2);
const step3 = matchOrganelles212(clue3);
const animalOnly = organelles212.filter(({ cells }) => cells.hayvan && !cells.bakteri);
const inAnimal = organelles212.filter(({ cells }) => cells.hayvan);
guard(step3.length === 1, "üç ipucu tek yapıya inmeli");

export const organelleExamples212: WorkedExample[] = [
  {
    title: "Üç ipucuyla organeli bul",
    prompt: `Bir hücre yapısı için üç bilgi veriliyor: (1) Çift zarlıdır. (2) Kendi DNA’sını ve kendi ribozomlarını taşır. (3) Hem bitki hem hayvan hücresinde bulunur. Tablodaki ${organelles212.length} yapıdan hangisidir?`,
    strategy: "İpuçlarını sırayla süzgeç gibi kullan. Her ipucundan sonra kalan yapıları yaz; tek yapı kalınca dur.",
    steps: [
      { label: "Çift zar", expression: list(step1, "upper"), explanation: "Tabloda çift zarlı yapılar bunlardır." },
      { label: "DNA ve ribozom", expression: list(step2, "upper"), explanation: "Çekirdek DNA taşır ama kendi ribozomu yoktur; ribozom alt birimleri orada yalnız hazırlanır." },
      { label: "İki hücre tipi", expression: list(step3, "upper"), explanation: `${chloroplast.name} hayvan hücresinde bulunmadığı için elenir.` },
    ],
    answer: `${step3[0].name}.`,
    check: `Görev sütunu: ${lower(step3[0].role)}. Kök hücresinde ${lower(chloroplast.name)} yokken ${lower(step3[0].name)} bulunur; bu da üçüncü ipucuyla uyumludur.`,
    pitfall: `Yalnız “çift zar ve DNA” ile karar vermek. Bu iki ipucu ${list(matchOrganelles212({ membranes: 2, dna: true }))} yapılarının hepsine uyar.`,
  },
  {
    title: "Hayvan hücresini bakteriyle karşılaştır",
    prompt: "Tablodaki yapılardan kaç tanesi hayvan hücresinde bulunur ama bakteride bulunmaz? Bakteri bu yapılar olmadan protein sentezleyebilir mi?",
    strategy: "Önce hayvan sütununda işaretli yapıları, sonra bunlardan bakteride de bulunanı yaz. Farkı say.",
    steps: [
      { label: "Hayvan hücresi", expression: `${inAnimal.length} yapı`, explanation: `${list(inAnimal, "upper")}.` },
      { label: "Bakteride de olan", expression: `${inAnimal.length - animalOnly.length} yapı`, explanation: `Yalnız ${lower(ribosome212.name)}; zarsızdır.` },
      { label: "Fark", expression: `${inAnimal.length} − ${inAnimal.length - animalOnly.length} = ${animalOnly.length}`, explanation: `${list(animalOnly, "upper")}.` },
      { label: "Protein", explanation: `Protein sentezini ${lower(ribosome212.name)} yapar; bakteride de bulunduğu için protein sentezi sürer.` },
    ],
    answer: `${animalOnly.length} yapı. Bakteri ${lower(ribosome212.name)} sayesinde protein sentezler.`,
    check: `${chloroplast.name} hayvan hücresinde olmadığı için sayılmaz. Toplam ${organelles212.length} yapıdan hayvanda ${inAnimal.length} yapı bulunur.`,
    pitfall: "Zarlı organeli olmayan bakterinin protein sentezleyemediğini sanmak. Ribozom zarsızdır ve bakteride de bulunur.",
  },
];

export const organelleSupplement212 = {
  title: organelleSection212.title,
  figureTitle: organelleSection212.title,
  paragraphs: organelleSection212.paragraphs,
  summary: `Zarsız: ${list(byMembrane(0))}. Tek zarlı: ${list(byMembrane(1))}. Çift zarlı ve DNA’lı: ${list(byMembrane(2))}. Bakteride tablodan yalnız ${lower(ribosome212.name)} bulunur.`,
  appendSection: true as const,
  table: organelleTable,
  examples: organelleExamples212,
};

/* ---------- Hücre zarında madde alışverişi ---------- */

export type Helper212 = "yok" | "su-kanalı" | "taşıyıcı" | "pompa" | "vezikül";
export type Direction212 = "çoktan-aza" | "su" | "farka-karşı" | "içeri" | "dışarı";
export interface Transport212 {
  name: string;
  atp: boolean;
  helper: Helper212;
  direction: Direction212;
  example: string;
  /** Çizimdeki taneciklerin sayısı ve hareket yönü. */
  demo: { substance: string; outside: number; inside: number; to: "içeri" | "dışarı" };
}
export const transports212: readonly Transport212[] = [
  { name: "Basit difüzyon", atp: false, helper: "yok", direction: "çoktan-aza", example: "O₂ ve CO₂ alışverişi", demo: { substance: "O₂", outside: 6, inside: 2, to: "içeri" } },
  { name: "Kolaylaştırılmış difüzyon", atp: false, helper: "taşıyıcı", direction: "çoktan-aza", example: "Glikozun taşıyıcıyla girişi", demo: { substance: "glikoz", outside: 6, inside: 2, to: "içeri" } },
  { name: "Ozmoz", atp: false, helper: "su-kanalı", direction: "su", example: "Hipotonik ortamda alyuvara su girişi", demo: { substance: "geçemeyen çözünen", outside: 1, inside: 4, to: "içeri" } },
  { name: "Aktif taşıma", atp: true, helper: "pompa", direction: "farka-karşı", example: "Na⁺/K⁺ pompası", demo: { substance: "Na⁺", outside: 6, inside: 2, to: "dışarı" } },
  { name: "Endositoz", atp: true, helper: "vezikül", direction: "içeri", example: "Akyuvarın bakteri yutması", demo: { substance: "bakteri", outside: 1, inside: 0, to: "içeri" } },
  { name: "Ekzositoz", atp: true, helper: "vezikül", direction: "dışarı", example: "Salgı proteininin verilmesi", demo: { substance: "salgı", outside: 0, inside: 1, to: "dışarı" } },
];
export const helperText212: Record<Helper212, string> = {
  yok: "Gerekmez",
  "su-kanalı": "Gerekmez; su kanalı hızlandırabilir",
  taşıyıcı: "Kanal veya taşıyıcı",
  pompa: "Pompa proteini",
  vezikül: "Zar vezikülü",
};
export const directionText212: Record<Direction212, string> = {
  "çoktan-aza": "Derişimi çok olan taraftan az olan tarafa",
  su: "Su, çözünen derişimi az olan taraftan çok olan tarafa",
  "farka-karşı": "Derişim farkına karşı olabilir",
  içeri: "Dıştan içe, vezikülle",
  dışarı: "İçten dışa, vezikülle",
};
/** Ozmoz modeli (rehberdeki gibi normalize): içe sürücü etki = iç − dış − iç basınç farkı. */
export const waterDrive212 = (inside: number, outside: number, pressure = 0) => inside - outside - pressure;
export const waterVerdict212 = (drive: number) => (drive > 0 ? "su içeri girer" : drive < 0 ? "su dışarı çıkar" : "net su geçişi olmaz");

const passive = transports212.filter(({ atp }) => !atp);
const energetic = transports212.filter(({ atp }) => atp);
const withProtein = transports212.filter(({ helper }) => helper === "taşıyıcı" || helper === "pompa");
const [simpleDiff, facilitated, osmosis, active] = transports212;
for (const t of transports212) {
  const { outside, inside, to } = t.demo;
  const [from, target] = to === "içeri" ? [outside, inside] : [inside, outside];
  if (t.direction === "çoktan-aza") guard(!t.atp && from > target, `${t.name} pasif ve derişim farkı yönünde olmalı`);
  if (t.direction === "farka-karşı") guard(t.atp && from < target, `${t.name} ATP ile farka karşı taşımalı`);
  if (t.direction === "su") guard(!t.atp && target > from, "ozmozda su çözüneni çok olan tarafa gitmeli");
  if (t.helper === "vezikül") guard(t.atp && t.direction === to, `${t.name} enerjili ve yönü vezikülle belli olmalı`);
}
guard(passive.every(({ direction }) => direction === "çoktan-aza" || direction === "su"), "pasif yollar derişim farkı yönünde olmalı");
guard(withProtein.length === 2 && withProtein.includes(facilitated) && withProtein.includes(active) && facilitated.atp !== active.atp, "protein kullanan iki yol ATP ile ayrılmalı");
guard(simpleDiff.helper === "yok" && osmosis.direction === "su", "tablo sırası beklenen yolları taşımalı");

const transportTable = {
  layout: "table" as const,
  headers: ["Yol", "ATP", "Protein / yapı", "Net yön", "Örnek"],
  rows: transports212.map((t) => [t.name, t.atp ? "Gerekir" : "Gerekmez", helperText212[t.helper], directionText212[t.direction], t.example]),
};
const osmosisDrive = waterDrive212(osmosis.demo.inside, osmosis.demo.outside);
guard(osmosisDrive > 0 && osmosis.demo.to === "içeri", "ozmoz çizimi su girişini göstermeli");

export const transportSection212: GuideSection = {
  title: "Taşıma yolunu ATP, protein ve yönle seç",
  paragraphs: [
    `Tablodaki ${transports212.length} yoldan ${passive.length} tanesi pasiftir: ${list(passive)}. Bu yollarda ATP harcanmaz ve net hareket derişim farkının kendiliğinden yönündedir. ${list(energetic, "upper")} enerji ister. Önce neyin taşındığını yaz: su, küçük madde ya da büyük parçacık.`,
    `Protein sütunu tek başına karar verdirmez: ${lower(facilitated.name)} ve ${lower(active.name)} ikisi de zar proteini kullanır. Fark ATP sütunundadır. ${facilitated.name} ATP harcamadan derişim farkı yönünde taşır; pompa ATP harcayarak farka karşı da taşıyabilir. ${active.example} Na⁺’u dışarı, K⁺’u içeri taşır.`,
    `${osmosis.name} sırasında izlenen madde sudur. Hücre içinde zarı geçemeyen çözünen ${osmosis.demo.inside}, dışta ${osmosis.demo.outside} birimse içe sürücü etki ${osmosis.demo.inside} − ${osmosis.demo.outside} − 0 = ${osmosisDrive} olur: ${waterVerdict212(osmosisDrive)}. Büyük yük ise vezikülle taşınır: ${lower(transports212[4].name)} dıştan içe, ${lower(transports212[5].name)} içten dışa çalışır ve enerji gerektirir.`,
  ],
  table: transportTable,
};

const hyper = { inside: 2, outside: 5 };
const hyperDrive = waterDrive212(hyper.inside, hyper.outside);
const reversedDrive = waterDrive212(hyper.outside, hyper.inside);
const noAtp = transports212.filter(({ atp }) => !atp);
const noAtpSolute = noAtp.filter(({ direction }) => direction !== "su");
const noAtpProtein = noAtpSolute.filter(({ helper }) => helper === "taşıyıcı");
guard(hyperDrive < 0 && reversedDrive === -hyperDrive && noAtpProtein.length === 1, "taşıma örnekleri veriyle tutarlı olmalı");

export const transportExamples212: WorkedExample[] = [
  {
    title: "Hipertonik ortamda suyun yönü",
    prompt: `Bir hayvan hücresi ile sağlam çeperli bir bitki hücresinin içinde zarı geçemeyen çözünen derişimi ${hyper.inside} birimdir. İki hücre, aynı çözünenden ${hyper.outside} birim içeren bir çözeltiye konuyor. Başlangıçta basınç farkı yoktur, sıcaklık sabittir ve iki zar da suyu geçirir. Su hangi yönde net geçer? İki hücrede ne gözlenir?`,
    strategy: "Ozmozda suyu izle. Çözünen derişimlerini karşılaştır ve içe sürücü etkiyi iç − dış − basınç ile hesapla.",
    steps: [
      { label: "Karşılaştır", expression: `dış ${hyper.outside} > iç ${hyper.inside}`, explanation: "Dış ortam hücreye göre hipertoniktir." },
      { label: "Sürücü etki", expression: `${hyper.inside} − ${hyper.outside} − 0 = ${String(hyperDrive).replace("-", "−")}`, explanation: `Negatif sonuç: ${waterVerdict212(hyperDrive)}.` },
      { label: "Hayvan hücresi", explanation: "Su kaybederek büzülür." },
      { label: "Bitki hücresi", explanation: "Protoplast çeperden uzaklaşır: plazmoliz. Çeperin kendisi büzülmez." },
    ],
    answer: "Su iki hücreden de dışarı çıkar. Hayvan hücresi büzülür, bitki hücresinde plazmoliz görülür.",
    check: `Derişimler yer değiştirseydi (iç ${hyper.outside}, dış ${hyper.inside}) sürücü etki +${reversedDrive} olurdu ve su içeri girerdi. İşaret değişince yön değişir.`,
    pitfall: "Suyun çözüneni çok olan taraftan kaçtığını sanmak. Su, çözünen derişimi yüksek olan tarafa, burada dış ortama geçer.",
  },
  {
    title: "İki deneyle taşıma yolunu ayır",
    prompt: "Glikoz bir hücreye, dışarıdaki derişimi içeridekinden yüksekken giriyor. Hücrenin ATP üretimi durdurulduğunda giriş sürüyor. Zardaki taşıyıcı proteinler bloke edildiğinde giriş duruyor. Tablodaki yollardan hangisidir?",
    strategy: "Her deney bir sütunu yanıtlar. ATP deneyi ATP sütununu, protein deneyi protein sütununu süzer. Taşınan maddenin su olup olmadığına da bak.",
    steps: [
      { label: "ATP gerekmez", expression: list(noAtp, "upper"), explanation: "ATP durunca giriş sürdüğü için ATP isteyen yollar elenir." },
      { label: "Madde su değil", expression: list(noAtpSolute, "upper"), explanation: `Taşınan glikoz olduğundan ${lower(osmosis.name)} elenir.` },
      { label: "Taşıyıcı gerekir", expression: list(noAtpProtein, "upper"), explanation: `Taşıyıcı bloke edilince giriş durduğu için ${lower(simpleDiff.name)} elenir.` },
    ],
    answer: `${noAtpProtein[0].name}.`,
    check: `Yön de uyar: glikoz çok derişik dış ortamdan az derişik hücre içine geçiyor. ${active.name} ATP durunca dururdu.`,
    pitfall: "Protein kullanıldığını görünce aktif taşıma demek. Kolaylaştırılmış difüzyon da protein kullanır ama ATP harcamaz.",
  },
];

export const transportSupplement212 = {
  title: transportSection212.title,
  figureTitle: transportSection212.title,
  paragraphs: transportSection212.paragraphs,
  summary: `Pasif (ATP yok): ${list(passive)}. Enerjili: ${list(energetic)}. Protein kullanan ${lower(facilitated.name)} ile ${lower(active.name)} ATP ile ayrılır. Su çözüneni çok olan tarafa geçer.`,
  appendSection: true as const,
  table: transportTable,
  examples: transportExamples212,
};

/* ---------- Mitoz ve mayoz: evre modeli ---------- */

export interface Chromosome212 { pair: number; origin: 0 | 1; chromatids: 1 | 2 }
export interface PhaseRow212 {
  phase: string;
  /** Bir grup tek hücre ya da kutup; iki grup aynı sitoplazmadaki iki kutup. */
  groups: Chromosome212[][];
  scope: "hücre" | "kutup";
  tetrads: boolean;
  interphase: boolean;
  chromosomes: number;
  /** Çift kromatitli kromozomlarda kromatit sayısı; tek kromatitlide null. */
  chromatids: number | null;
  dnaMolecules: number;
  /** C birimiyle DNA miktarı (C: eşlenmemiş bir haploit takım). */
  dnaC: number;
  homolog: string;
}

const diploid = (n: number): Chromosome212[] =>
  Array.from({ length: n }, (_, pair) => [0, 1].map((origin) => ({ pair, origin: origin as 0 | 1, chromatids: 1 as const }))).flat();
const replicate = (cs: Chromosome212[]) => cs.map((c) => ({ ...c, chromatids: 2 as const }));
const single = (cs: Chromosome212[]) => cs.map((c) => ({ ...c, chromatids: 1 as const }));
/** Kardeş kromatitlerin ayrılması: her kutba her kromozomun bir kardeşi. */
const sisterSplit = (cs: Chromosome212[]): [Chromosome212[], Chromosome212[]] => {
  guard(cs.every(({ chromatids }) => chromatids === 2), "kardeş ayrılması için kromozomlar eşlenmiş olmalı");
  return [single(cs), single(cs)];
};
/** Homologların ayrılması: her çiftten biri bir kutba; yönelim çiftten çifte değişir. */
const homologSplit = (cs: Chromosome212[]): [Chromosome212[], Chromosome212[]] => [
  cs.filter(({ pair, origin }) => origin === pair % 2),
  cs.filter(({ pair, origin }) => origin !== pair % 2),
];
const pairsIn = (cs: Chromosome212[]) =>
  new Set(cs.filter(({ origin }) => origin === 0).map(({ pair }) => pair).filter((pair) => cs.some((c) => c.pair === pair && c.origin === 1))).size;
export const dnaCText212 = (c: number) => (c === 1 ? "C" : `${c}C`);
export const chromatidText212 = (row: PhaseRow212) => `${row.chromatids ?? "—"} / ${row.dnaMolecules}`;

const homologText = (groups: Chromosome212[][], tetrads: boolean) => {
  if (groups.length === 2) {
    const p = pairsIn(groups[0]);
    if (p > 0) return `Her kutupta ${p} homolog çift`;
    return groups[0][0].chromatids === 2 ? "Her kutba her çiftten biri" : "Homolog yok, her kutupta n";
  }
  const p = pairsIn(groups[0]);
  if (p === 0) return "Homolog yok (n)";
  return tetrads ? `${p} tetrat (homologlar eşleşik)` : `${p} homolog çift`;
};

const phaseRow = (n: number, phase: string, groups: Chromosome212[][], o: { scope?: "hücre" | "kutup"; tetrads?: boolean; interphase?: boolean } = {}): PhaseRow212 => {
  const all = groups.flat();
  const doubled = all.every(({ chromatids }) => chromatids === 2);
  guard(doubled || all.every(({ chromatids }) => chromatids === 1), "bir evrede kromozomların kromatit durumu aynı olmalı");
  const dnaMolecules = all.reduce((s, { chromatids }) => s + chromatids, 0);
  return {
    phase,
    groups,
    scope: o.scope ?? "hücre",
    tetrads: o.tetrads ?? false,
    interphase: o.interphase ?? false,
    chromosomes: all.length,
    chromatids: doubled ? dnaMolecules : null,
    dnaMolecules,
    dnaC: dnaMolecules / n,
    homolog: homologText(groups, o.tetrads ?? false),
  };
};

/** 2n = 2·n hücrede mitoz evreleri (n: homolog çift sayısı). */
export const mitosisRows212 = (n = 2): PhaseRow212[] => {
  const g1 = diploid(n);
  const g2 = replicate(g1);
  const [p0, p1] = sisterSplit(g2);
  return [
    phaseRow(n, "G₁", [g1], { interphase: true }),
    phaseRow(n, "G₂ (S sonrası)", [g2], { interphase: true }),
    phaseRow(n, "Profaz", [g2]),
    phaseRow(n, "Metafaz", [g2]),
    phaseRow(n, "Anafaz (bütün hücre)", [p0, p1]),
    phaseRow(n, "Anafaz (bir kutup)", [p0], { scope: "kutup" }),
    phaseRow(n, "Yavru hücre (her biri)", [p0], { interphase: true }),
  ];
};
/** 2n = 2·n hücrede mayoz evreleri. */
export const meiosisRows212 = (n = 4): PhaseRow212[] => {
  const g1 = diploid(n);
  const g2 = replicate(g1);
  const [h0, h1] = homologSplit(g2);
  const [s0, s1] = sisterSplit(h0);
  return [
    phaseRow(n, "G₁", [g1], { interphase: true }),
    phaseRow(n, "Profaz I", [g2], { tetrads: true }),
    phaseRow(n, "Metafaz I", [g2], { tetrads: true }),
    phaseRow(n, "Anafaz I (bütün hücre)", [h0, h1]),
    phaseRow(n, "Mayoz I sonu (her hücre)", [h0]),
    phaseRow(n, "Metafaz II (her hücre)", [h0]),
    phaseRow(n, "Anafaz II (bölünmemiş hücre)", [s0, s1]),
    phaseRow(n, "Mayoz II sonu (her hücre)", [s0], { interphase: true }),
  ];
};
/** Normal dengeli bölünmede bir hücreden çıkan ürün sayısı. */
export const products212 = { mitoz: 2 ** 1, mayoz: 2 ** 2 } as const;

const phaseTable = (rows: PhaseRow212[]) => ({
  layout: "table" as const,
  headers: ["Evre", "Kromozom", "Kromatit / DNA molekülü", "DNA miktarı", "Homolog durumu"],
  rows: rows.map((row) => [row.phase, String(row.chromosomes), chromatidText212(row), dnaCText212(row.dnaC), row.homolog]),
});

export const mitosisN212 = 2;
const mit = mitosisRows212(mitosisN212);
const [mG1, mG2, mPro, mMeta, mAna, mPole, mChild] = mit;
const same = (a: PhaseRow212, b: PhaseRow212) => a.chromosomes === b.chromosomes && a.dnaMolecules === b.dnaMolecules && a.dnaC === b.dnaC;
guard(same(mG2, mPro) && same(mPro, mMeta), "profaz ve metafaz S sonrası sayıları korumalı");
guard(same(mChild, mG1) && same(mPole, mG1), "mitoz yavrusu G₁ değerlerini almalı");
guard(mAna.dnaC === mMeta.dnaC && mAna.chromosomes === 2 * mMeta.chromosomes && mAna.chromosomes === 2 * mPole.chromosomes, "anafaz sayımı metafazla tutarlı olmalı");
guard(mit.every((row) => row.homolog.includes(`${mitosisN212} homolog çift`)), "mitozda homolog çiftler korunmalı");
guard(products212.mitoz * mChild.dnaC === mG2.dnaC, "iki yavrunun DNA toplamı S sonrasına eşit olmalı");

const mitosisTable = phaseTable(mit);
export const mitosisSection212: GuideSection = {
  title: `2n = ${2 * mitosisN212} hücrede mitozu evre evre say`,
  paragraphs: [
    `Model hücre 2n = ${2 * mitosisN212}: ${mitosisN212} homolog çift. G₁’de ${mG1.chromosomes} tek kromatitli kromozom, ${mG1.dnaMolecules} DNA molekülü ve ${dnaCText212(mG1.dnaC)} DNA vardır. S evresinde kromozom sayısı ${mG2.chromosomes} olarak kalır; her kromozom iki kardeş kromatitli olur. Kromatit sayısı ${mG2.chromatids}, DNA miktarı ${dnaCText212(mG1.dnaC)} → ${dnaCText212(mG2.dnaC)} olur. Tabloda tek kromatitli kromozomlar için kromatit yerine — yazılır.`,
    `Profaz ve metafazda sayılar değişmez: ${mMeta.chromosomes} kromozom, ${mMeta.chromatids} kromatit, ${dnaCText212(mMeta.dnaC)}. Anafazda kardeş kromatitler ayrılır ve her biri bağımsız kromozom sayılır. Bütün hücrede ${mAna.chromosomes} kromozom ve ${mAna.dnaMolecules} DNA molekülü vardır; DNA miktarı yine ${dnaCText212(mAna.dnaC)}. Bir kutupta ${mPole.chromosomes} kromozom ve ${dnaCText212(mPole.dnaC)} DNA bulunur.`,
    `Sitokinez sonunda ${products212.mitoz} yavru hücrenin her biri ${mChild.chromosomes} kromozom ve ${dnaCText212(mChild.dnaC)} DNA alır; bunlar G₁ değerleridir. Homolog sütunu baştan sona ${mitosisN212} çifti gösterir: mitozda homologlar eşleşmez, tetrat oluşmaz. Anafazdaki ${mAna.chromosomes} sayısı yeni takım oluştuğu anlamına gelmez; aynı takımın iki kopyası henüz tek sitoplazmadadır.`,
  ],
  table: mitosisTable,
};

const metaChromatids = 24;
const exN = Array.from({ length: 30 }, (_, i) => i + 1).find((n) => mitosisRows212(n)[3].chromatids === metaChromatids)!;
const ex = mitosisRows212(exN);
const rounds = 3;
const cells = 2 ** rounds;
guard(ex[3].chromatids === metaChromatids && ex[3].chromosomes === 2 * exN, "metafaz kromatitinden 2n bulunmalı");

export const mitosisExamples212: WorkedExample[] = [
  {
    title: "Metafaz kromatitinden yavru hücreye",
    prompt: `Mitoz geçiren bir hücrenin metafazında ${metaChromatids} kromatit sayılıyor. Bölünme normal ve dengeli. Hücrenin 2n sayısı, anafazdaki bütün hücrenin kromozom sayısı ve bir yavru hücrenin kromozom sayısı kaçtır?`,
    strategy: "Metafazda her kromozom iki kardeş kromatitlidir. Kromatitten kromozoma geç, sonra evre modelini ileri yürüt.",
    steps: [
      { label: "Metafaz", expression: `${metaChromatids} / 2 = ${ex[3].chromosomes}`, explanation: "Her kromozom iki kromatit taşır." },
      { label: "Takım", expression: `2n = ${ex[3].chromosomes}`, explanation: "Mitozda metafaz kromozom sayısı hücrenin 2n sayısıdır." },
      { label: "Anafaz", expression: `${ex[4].chromosomes} kromozom`, explanation: "Kardeşler ayrılınca her biri kromozom sayılır; bütün hücrede sayı iki katına çıkar." },
      { label: "Yavru", expression: `${ex[6].chromosomes} kromozom, ${dnaCText212(ex[6].dnaC)}`, explanation: "Her kutup bir yavru hücreye geçer." },
    ],
    answer: `2n = ${ex[3].chromosomes}. Anafazda bütün hücrede ${ex[4].chromosomes} kromozom, her yavru hücrede ${ex[6].chromosomes} kromozom vardır.`,
    check: `Anafazdaki ${ex[4].chromosomes} kromozomun DNA molekülü sayısı metafazdaki ${metaChromatids} kromatitle aynıdır; ayrılma yeni DNA üretmez.`,
    pitfall: `Metafazdaki ${metaChromatids} kromatiti kromozom sayısı sanmak. X biçimli bir yapı iki kromatitli tek kromozomdur.`,
  },
  {
    title: "Üç tur mitozda hücre ve DNA",
    prompt: `2n = ${2 * mitosisN212} olan tek bir hücre art arda ${rounds} kez mitozla bölünüyor. Her turda bütün hücreler bölünüyor ve hücre kaybı yok. Son durumda kaç hücre vardır? Toplam kromozom sayısı ve her hücrenin DNA miktarı nedir?`,
    strategy: "Hücre sayısını N₀ × 2ᵏ ile, hücre başına sayıları evre modelinin yavru satırıyla bul. Toplamı en son çarp.",
    steps: [
      { label: "Hücre sayısı", expression: `1 × 2${sup(rounds)} = ${cells}`, explanation: "Her tur bütün hücreler ikiye bölünüyor." },
      { label: "Hücre başına", expression: `${mChild.chromosomes} kromozom, ${dnaCText212(mChild.dnaC)}`, explanation: "Mitoz takımı korur; her yavru G₁ değerlerini alır." },
      { label: "Toplam kromozom", expression: `${cells} × ${mChild.chromosomes} = ${cells * mChild.chromosomes}`, explanation: "Artan, hücre sayısıdır." },
    ],
    answer: `${cells} hücre, toplam ${cells * mChild.chromosomes} kromozom. Her hücre ${mChild.chromosomes} kromozom ve ${dnaCText212(mChild.dnaC)} DNA taşır.`,
    check: `Her turda DNA önce eşlenir (${dnaCText212(mG1.dnaC)} → ${dnaCText212(mG2.dnaC)}), sonra iki yavruya paylaşılır. Hücre başına değer her tur sonunda ${dnaCText212(mChild.dnaC)} olur; toplam ${cells * mChild.dnaC}C.`,
    pitfall: "Hücre başına kromozom sayısını da her turda ikiye katlamak. Mitoz takımı korur; artan yalnız hücre sayısıdır.",
  },
];

export const mitosisSupplement212 = {
  title: mitosisSection212.title,
  figureTitle: mitosisSection212.title,
  paragraphs: mitosisSection212.paragraphs,
  summary: `2n = ${2 * mitosisN212}: G₁ ${mG1.chromosomes} kromozom, ${dnaCText212(mG1.dnaC)}. S sonrası ${mG2.chromatids} kromatit, ${dnaCText212(mG2.dnaC)}. Anafazda bütün hücre ${mAna.chromosomes} kromozom, bir kutup ${mPole.chromosomes}. Yavru ${mChild.chromosomes} kromozom, ${dnaCText212(mChild.dnaC)}; homologlar eşleşmez.`,
  appendSection: true as const,
  table: mitosisTable,
  examples: mitosisExamples212,
};

export const meiosisN212 = 4;
const mei = meiosisRows212(meiosisN212);
const [eG1, eP1, eM1, eA1, eEnd1, eM2, eA2, eEnd2] = mei;
guard(same(eP1, eM1) && same(eA1, eM1) && eP1.dnaC === 2 * eG1.dnaC, "mayoz I öncesi tek eşlenme olmalı");
guard(same(eEnd1, eM2) && eEnd1.chromosomes === meiosisN212 && eEnd1.chromatids === 2 * meiosisN212, "mayoz I sonu n ve çift kromatitli olmalı");
guard(eA2.chromosomes === 2 * eM2.chromosomes && eA2.dnaC === eM2.dnaC, "anafaz II yeni DNA üretmemeli");
guard(eEnd2.chromosomes === meiosisN212 && eEnd2.chromatids === null && products212.mayoz * eEnd2.dnaC === eP1.dnaC, "dört n ürünün DNA toplamı S sonrasına eşit olmalı");
guard(eP1.homolog.startsWith(`${meiosisN212} tetrat`) && [eEnd1, eM2, eEnd2].every(({ homolog }) => homolog.startsWith("Homolog yok")), "homolog durumu tetrattan n’ye inmeli");

const meiosisTable = phaseTable(mei);
export const meiosisSection212: GuideSection = {
  title: `2n = ${2 * meiosisN212} hücrede mayozu evre evre say`,
  paragraphs: [
    `Model hücre 2n = ${2 * meiosisN212}: ${meiosisN212} homolog çift. G₁’de ${eG1.chromosomes} kromozom, ${eG1.dnaMolecules} DNA molekülü ve ${dnaCText212(eG1.dnaC)} DNA vardır. Tek S evresinden sonra profaz I’de homologlar eşleşir: ${meiosisN212} tetrat, ${eP1.chromatids} kromatit, ${dnaCText212(eP1.dnaC)}. Tetrat sayısı homolog çift sayısına eşittir.`,
    `Anafaz I’de homologlar ayrılır, kardeşler birlikte kalır. Bütün hücrede hâlâ ${eA1.chromosomes} kromozom ve ${eA1.chromatids} kromatit vardır; her kutba her çiftten bir çift kromatitli kromozom gider. Mayoz I sonunda her hücre ${eEnd1.chromosomes} kromozom, ${eEnd1.chromatids} kromatit ve ${dnaCText212(eEnd1.dnaC)} DNA taşır: haploittir ama kromozomları hâlâ eşlenmiştir.`,
    `Mayoz I ile mayoz II arasında DNA eşlenmez: metafaz II de ${eM2.chromosomes} kromozom, ${eM2.chromatids} kromatit ve ${dnaCText212(eM2.dnaC)} gösterir. Anafaz II’de kardeşler ayrılır; bölünmemiş hücrede ${eA2.chromosomes} kromozom vardır, DNA yine ${dnaCText212(eA2.dnaC)}. Mayoz II sonunda ${products212.mayoz} hücrenin her biri ${eEnd2.chromosomes} kromozom ve ${dnaCText212(eEnd2.dnaC)} DNA alır. Dört ürünün toplamı ${products212.mayoz * eEnd2.dnaC}C, S sonrasıyla aynıdır.`,
  ],
  table: meiosisTable,
};

const exM = meiosisRows212(3);
const tetrads = 5;
const g1pg = 6;
const pgPerC = g1pg / meiosisRows212(tetrads)[0].dnaC;
const exT = meiosisRows212(tetrads);
const pg = (row: PhaseRow212) => row.dnaC * pgPerC;
guard(exM[5].chromatids === 6 && pg(exT[7]) * products212.mayoz === pg(exT[2]), "mayoz örnekleri modelle tutarlı olmalı");

export const meiosisExamples212: WorkedExample[] = [
  {
    title: "Metafaz II’de kromatit say",
    prompt: `2n = ${2 * 3} olan bir hücre normal mayoz geçiriyor. Metafaz II’deki bir hücrede kaç kromozom ve kaç kromatit vardır? DNA miktarı kaç C’dir?`,
    strategy: "Mayoz I homologları ayırır, kardeşleri ayırmaz. Mayoz II öncesinde DNA eşlenmez.",
    steps: [
      { label: "Mayoz I sonu", expression: `${2 * 3} / 2 = ${exM[4].chromosomes} kromozom`, explanation: "Her çiftten bir homolog bir hücreye geçer: hücre haploittir." },
      { label: "Kromatit", expression: `${exM[5].chromosomes} × 2 = ${exM[5].chromatids}`, explanation: "Kromozomlar hâlâ iki kardeş kromatitlidir." },
      { label: "DNA", expression: `${dnaCText212(exM[0].dnaC)} → ${dnaCText212(exM[1].dnaC)} → ${dnaCText212(exM[5].dnaC)}`, explanation: "S evresi DNA’yı iki katına çıkarır, mayoz I yarıya paylaştırır." },
    ],
    answer: `${exM[5].chromosomes} kromozom, ${exM[5].chromatids} kromatit, ${dnaCText212(exM[5].dnaC)} DNA.`,
    check: `Anafaz II’de kardeşler ayrılınca o hücrede ${exM[6].chromosomes} tek kromatitli kromozom görülür, DNA yine ${dnaCText212(exM[6].dnaC)} kalır.`,
    pitfall: `Metafaz II’yi mitoz metafazı gibi ${2 * 3} kromozomla saymak. Mayoz I homologları zaten ayırmıştır.`,
  },
  {
    title: "Tetrat sayısından pikograma",
    prompt: `Profaz I’de ${tetrads} tetrat sayılan bir hücrenin G₁ evresindeki çekirdek DNA’sı ${g1pg} pg’dir. Hücrenin 2n sayısı kaçtır? Metafaz I’de, mayoz I sonundaki her hücrede ve mayoz II sonundaki her hücrede çekirdek DNA’sı kaç pg’dir?`,
    strategy: "Tetrat sayısı homolog çift sayısıdır. G₁ değeri 2C olduğundan C’nin kaç pg olduğunu bul, sonra evre modelinin C değerleriyle çarp.",
    steps: [
      { label: "Takım", expression: `2n = 2 × ${tetrads} = ${2 * tetrads}`, explanation: "Her tetrat bir homolog çifttir." },
      { label: "C değeri", expression: `${dnaCText212(exT[0].dnaC)} = ${g1pg} pg ⇒ C = ${pgPerC} pg`, explanation: "G₁ diploit hücre 2C taşır." },
      { label: "Metafaz I", expression: `${dnaCText212(exT[2].dnaC)} = ${pg(exT[2])} pg`, explanation: "S evresinden sonra DNA iki katıdır." },
      { label: "Mayoz I sonu", expression: `${dnaCText212(exT[4].dnaC)} = ${pg(exT[4])} pg`, explanation: "Homologlar iki hücreye paylaşıldı." },
      { label: "Mayoz II sonu", expression: `${dnaCText212(exT[7].dnaC)} = ${pg(exT[7])} pg`, explanation: "Kardeşler ayrıldı; arada yeni eşlenme olmadı." },
    ],
    answer: `2n = ${2 * tetrads}. Metafaz I ${pg(exT[2])} pg, mayoz I sonu ${pg(exT[4])} pg, mayoz II sonu ${pg(exT[7])} pg.`,
    check: `${products212.mayoz} son hücrenin toplamı ${products212.mayoz} × ${pg(exT[7])} = ${products212.mayoz * pg(exT[7])} pg, S sonrasındaki ${pg(exT[2])} pg ile aynıdır.`,
    pitfall: `Mayoz II öncesinde DNA’nın yeniden eşlendiğini varsayıp mayoz I sonundaki hücreyi ${pg(exT[2])} pg almak. İki bölünme arasında S evresi yoktur.`,
  },
];

export const meiosisSupplement212 = {
  title: meiosisSection212.title,
  figureTitle: meiosisSection212.title,
  paragraphs: meiosisSection212.paragraphs,
  summary: `2n = ${2 * meiosisN212}: profaz I ${meiosisN212} tetrat, ${dnaCText212(eP1.dnaC)}. Mayoz I sonu ${eEnd1.chromosomes} kromozom, ${eEnd1.chromatids} kromatit, ${dnaCText212(eEnd1.dnaC)}. Arada S yok. Mayoz II sonu ${products212.mayoz} hücre, her biri ${eEnd2.chromosomes} kromozom ve ${dnaCText212(eEnd2.dnaC)}.`,
  appendSection: true as const,
  table: meiosisTable,
  examples: meiosisExamples212,
};

/* ---------- Eşeysiz üreme yolları ---------- */

export interface Asexual212 {
  name: string;
  mechanism: string;
  example: string;
  /** Yavruyu oluşturan hücre olayı. */
  division: string;
  /** "copy": mitoz ya da mitozsuz bölünme; "meiosis": yumurta mayozla oluşur. */
  mode: "copy" | "meiosis";
  spore?: true;
  fertilization: false;
  /** Çizimdeki ata genotipi ve yavru sayısı. */
  parent: string;
  offspringCount: number;
}
export const asexual212: readonly Asexual212[] = [
  { name: "İkiye bölünme", mechanism: "Hücre ikiye ayrılır", example: "Bakteri (mitozsuz); amip, öglena, paramesyum", division: "ikiye bölünme", mode: "copy", fertilization: false, parent: "A", offspringCount: 2 },
  { name: "Tomurcuklanma", mechanism: "Ata üzerindeki çıkıntı bireye gelişir", example: "Hidra, bira mayası", division: "mitoz", mode: "copy", fertilization: false, parent: "Aa", offspringCount: 1 },
  { name: "Rejenerasyonla üreme", mechanism: "Uygun parça bütün bireye gelişir", example: "Planarya, bazı denizyıldızları", division: "mitoz", mode: "copy", fertilization: false, parent: "Aa", offspringCount: 2 },
  { name: "Sporla üreme", mechanism: "Spor, gametle birleşmeden birey başlatır", example: "Mantar, bazı algler", division: "mitoz", mode: "copy", spore: true, fertilization: false, parent: "A", offspringCount: 3 },
  { name: "Vejetatif üreme", mechanism: "Kök, gövde ya da yaprak parçası bitkiye gelişir", example: "Çilek, patates, soğan", division: "mitoz", mode: "copy", fertilization: false, parent: "Aa", offspringCount: 1 },
  { name: "Doku kültürü", mechanism: "Steril ortamda hücrelerden kallus, sonra bitki", example: "Zor çoğalan bitkiler", division: "mitoz", mode: "copy", fertilization: false, parent: "Aa", offspringCount: 3 },
  { name: "Partenogenez", mechanism: "Döllenmemiş yumurta bireye gelişir", example: "Bal arısında erkek (n)", division: "mayoz, sonra gelişme", mode: "meiosis", fertilization: false, parent: "Aa", offspringCount: 2 },
];
/** Mitoz kopyalar; mayoz her yumurtaya ata alellerinden birini verir. */
export const offspring212 = ({ mode, parent, offspringCount }: Asexual212) =>
  Array.from({ length: offspringCount }, (_, i) => (mode === "copy" ? parent : parent[i % parent.length]));
export const heredityText212 = (row: Asexual212) =>
  row.mode === "meiosis" ? "Aynı olmayabilir: yumurta mayozla oluşur" : row.spore ? "Mitotik sporda ataya aynı" : "Ataya aynı (mutasyon yoksa)";
/** Bütün hücreler k tur bölünür, sonra yalnız `extra` tanesi bir kez daha bölünür. */
export const population212 = (start: number, rounds: number, extra = 0) => start * 2 ** rounds + extra;

const copyRows = asexual212.filter(({ mode }) => mode === "copy");
const meioticRows = asexual212.filter(({ mode }) => mode === "meiosis");
guard(asexual212.every(({ fertilization }) => fertilization === false), "eşeysiz yolların hiçbirinde döllenme olmamalı");
guard(copyRows.every((row) => offspring212(row).every((g) => g === row.parent)), "kopya yollarda yavru ataya aynı olmalı");
guard(meioticRows.length === 1 && offspring212(meioticRows[0]).every((g) => g !== meioticRows[0].parent), "partenogenez yavrusu ata genotipinden farklı olmalı");
guard(population212(3, 2, 5) === 17, "rehberdeki sayım örneğiyle tutarlı olmalı");

const asexualTable = {
  layout: "table" as const,
  headers: ["Yol", "Ne olur?", "Örnek", "Yavrunun kalıtsal yapısı"],
  rows: asexual212.map((row) => [row.name, row.mechanism, row.example, heredityText212(row)]),
};
const [fission, budding, regeneration, sporeRow] = asexual212;
const parth = meioticRows[0];

export const asexualSection212: GuideSection = {
  title: "Eşeysiz üreme yollarını mekanizma ve örnekle ayır",
  paragraphs: [
    `Tablodaki ${asexual212.length} yolun hiçbirinde döllenme yoktur: yeni birey tek atadan gelişir. ${copyRows.length} yolda yavru, ata hücrelerinin mitozla ya da bakteride mitozsuz bölünmeyle çoğalmasından oluşur. Yeni mutasyon yoksa bu yavruların kalıtsal yapısı ataya aynıdır; fenotipleri çevreye göre yine farklı olabilir.`,
    `Mekanizma sütununu oku. ${fission.name} yolunda tek hücre ikiye ayrılır; bakteride mitoz evreleri yoktur. ${budding.name} yolunda ata üzerinde çıkıntı büyür. ${regeneration.name} yolunda uygun parça bütün bireye gelişir; yeni birey oluşturmayan onarım üreme sayılmaz. ${sporeRow.name} yolunda kalıtsal aynılık sporun mitozla oluştuğu durum içindir.`,
    `${parth.name} farklıdır: yumurta mayozla oluşur. ${parth.parent} genotipli bir kraliçenin döllenmemiş yumurtalarından ${joinTr(offspring212(parth))} genotipli erkekler gelişebilir. Bu yüzden “eşeysiz üreme her zaman ataya aynı yavru verir” genellemesi bu yolda geçerli değildir. Mutasyon da eşeysiz bir popülasyonda çeşitlilik oluşturabilir.`,
  ],
  table: asexualTable,
};

const bact = { start: 4, rounds: 3, extra: 6 };
const afterRounds = population212(bact.start, bact.rounds);
const finalCount = population212(bact.start, bact.rounds, bact.extra);
const queen2n = 32;
const males = [...new Set(offspring212(parth))];
guard(finalCount === afterRounds - bact.extra + 2 * bact.extra && males.length === 2, "eşeysiz örnekler modelle tutarlı olmalı");

export const asexualExamples212: WorkedExample[] = [
  {
    title: "Bölünen ve bölünmeyen bakterileri say",
    prompt: `${bact.start} bakteri ${bact.rounds} tam tur boyunca bölünüyor; her turda bütün bakteriler bir kez ikiye bölünüyor ve kayıp yok. Sonra yalnız ${bact.extra} bakteri bir kez daha bölünüyor. Son bakteri sayısı kaçtır? Mutasyon yoksa yavrular ataya göre kalıtsal olarak nasıldır?`,
    strategy: "Bütün hücrelerin bölündüğü turlarda N₀ × 2ᵏ kullan. Yalnız bazı hücreler bölünüyorsa her bölünen hücre sayıyı bir artırır.",
    steps: [
      { label: "Tam turlar", expression: `${bact.start} × 2${sup(bact.rounds)} = ${afterRounds}`, explanation: "Her tur bütün bakteriler ikiye bölünüyor." },
      { label: "Seçili bölünme", expression: `${afterRounds} + ${bact.extra} = ${finalCount}`, explanation: `Bölünen ${bact.extra} bakteri ${2 * bact.extra} yavru verir; her biri sayıyı bir artırır.` },
      { label: "Kalıtsal yapı", explanation: `${fission.name}: ${lower(heredityText212(fission))}.` },
    ],
    answer: `${finalCount} bakteri. Mutasyon yoksa hepsi ataya kalıtsal olarak aynıdır.`,
    check: `${afterRounds} − ${bact.extra} + ${2 * bact.extra} = ${finalCount}: bölünen ${bact.extra} bakteri yerini ${2 * bact.extra} yavruya bırakır.`,
    pitfall: `İkinci aşamada bütün sayıyı ikiye katlayıp ${2 * afterRounds} bulmak. Yalnız bölünen bakteriler sayıyı artırır.`,
  },
  {
    title: "Kraliçenin yumurtalarından erkek arı",
    prompt: `Standart bal arısı modelinde kraliçe 2n = ${queen2n} ve bir gen bakımından ${parth.parent} genotiplidir. Döllenmemiş yumurtalarından gelişen erkek arılarda kromozom sayısı ve olası genotipler nedir? Erkekler kraliçenin kalıtsal kopyası mıdır?`,
    strategy: "Önce yumurtanın nasıl oluştuğunu yaz. Mayoz takımı yarıya indirir ve her yumurtaya her çiftten bir alel verir.",
    steps: [
      { label: "Yumurta", expression: `${queen2n} / 2 = ${queen2n / 2}`, explanation: "Yumurta mayozla oluşur: n." },
      { label: "Aleller", expression: joinTr(males), explanation: `${parth.parent} genotipinden her yumurtaya iki alelden biri geçer.` },
      { label: "Gelişme", explanation: "Döllenme olmadan gelişen yumurta n kalır: erkek arı." },
    ],
    answer: `Erkekler ${queen2n / 2} kromozomlu (n); genotipleri ${males.join(" ya da ")}. Kraliçenin kopyası değildirler.`,
    check: `Erkeklerin hiçbiri ${parth.parent} değildir: tek takım taşıdıkları için her genden bir alel bulunur.`,
    pitfall: "Partenogenezi mitoza dayalı kopya üretimi sanmak. Yumurta mayozla oluşur; erkekler kraliçenin farklı mayoz ürünlerinden gelişebilir.",
  },
];

export const asexualSupplement212 = {
  title: asexualSection212.title,
  figureTitle: asexualSection212.title,
  paragraphs: asexualSection212.paragraphs,
  summary: `${asexual212.length} yolun hiçbirinde döllenme yok. ${copyRows.length} yolda yavru ataya aynı (mutasyon yoksa). ${parth.name}: yumurta mayozla oluşur; ${parth.parent} kraliçeden ${joinTr(males)} erkekler.`,
  appendSection: true as const,
  table: asexualTable,
  examples: asexualExamples212,
};

export const depth212Supplements = {
  "hucre-organelleri": [organelleSupplement212],
  "hucre-zarinda-madde-alisverisleri": [transportSupplement212],
  mitoz: [mitosisSupplement212],
  mayoz: [meiosisSupplement212],
  "eseysiz-ureme": [asexualSupplement212],
};
