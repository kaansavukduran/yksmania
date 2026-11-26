import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Biyoloji canlılar dünyası ve eşeyli üreme derinleştirmesi (0.218.0).
 * Kabul edilmiş rehberler değişmez; tablo bölümleri, özgün çözümlü örnekler
 * ve bölüm çizimleri görüntüleme katmanında eklenir. Tablolar okul
 * karşılaştırmasıdır: her satır dersin kendi örneklerini ve terimlerini
 * kullanır, istisnaları hücrede açıkça yazar ve bütün türler için evrensel
 * kural iddia etmez. Paragraflar, tablolar, çizim okumaları ve Kopya Kâğıdı
 * özetleri aynı verilerden yazılır; metindeki genel yargılar modül
 * yüklenirken denetlenir.
 */

const guard = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depth218: veri bu yargıyı artık desteklemiyor: ${claim}`);
};
const list = (xs: readonly (string | number)[]) => xs.join(", ");
const lower = (s: string) => s.toLocaleLowerCase("tr-TR");
const cap = (s: string) => s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1);
/** “a, b ve c” */
const and = (xs: readonly string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} ve ${xs[xs.length - 1]}`);

/* =================================================================
 * 1 · Omurgalılar: beş okul grubu tek tabloda
 * ================================================================= */

export type Thermo218 = "ektoterm" | "endoterm";
export type Place218 = "iç" | "dış";
export interface VertebrateClass218 {
  name: string;
  examples: readonly string[];
  /** Ergin bireyde gaz alışverişi yapan yapı (okul örneği). */
  respiration: string;
  /** Dolaşım şemasında kalpten çıkan kanın gaz alışverişi yaptığı yer. */
  gasStop: string;
  atria: number;
  ventricles: number;
  /** Karıncıkta tam olmayan (kısmi) bölme. */
  partialSeptum: boolean;
  heartException?: { example: string; atria: number; ventricles: number };
  circulation: "tek" | "çift";
  thermo: Thermo218;
  fertilisation: Place218;
  fertNote?: string;
  larvaGills?: boolean;
}

/** Dersteki örnekler ve sayılar: sazan 2, kurbağa 3, çoğu sürüngen 3, timsah 4, kuş ve memeli 4 odacık. */
export const VERTEBRATES218: readonly VertebrateClass218[] = [
  { name: "Balıklar", examples: ["sazan", "hamsi"], respiration: "Solungaç", gasStop: "Solungaç", atria: 1, ventricles: 1, partialSeptum: false, circulation: "tek", thermo: "ektoterm", fertilisation: "dış", fertNote: "köpek balığında iç" },
  { name: "İki yaşamlılar", examples: ["kurbağa", "semender"], respiration: "Akciğer ve nemli deri (larva solungaçla)", gasStop: "Akciğer, deri", atria: 2, ventricles: 1, partialSeptum: false, circulation: "çift", thermo: "ektoterm", fertilisation: "dış", fertNote: "kurbağa örneği; bütün türlerde aynı değil", larvaGills: true },
  { name: "Sürüngenler", examples: ["kertenkele", "yılan", "timsah"], respiration: "Akciğer", gasStop: "Akciğer", atria: 2, ventricles: 1, partialSeptum: true, heartException: { example: "timsah", atria: 2, ventricles: 2 }, circulation: "çift", thermo: "ektoterm", fertilisation: "iç" },
  { name: "Kuşlar", examples: ["güvercin", "penguen"], respiration: "Akciğer (hava keseleri havalandırmaya yardım eder)", gasStop: "Akciğer", atria: 2, ventricles: 2, partialSeptum: false, circulation: "çift", thermo: "endoterm", fertilisation: "iç" },
  { name: "Memeliler", examples: ["yunus", "yarasa"], respiration: "Alveollü akciğer, kaslı diyafram", gasStop: "Akciğer", atria: 2, ventricles: 2, partialSeptum: false, circulation: "çift", thermo: "endoterm", fertilisation: "iç" },
];
export const chambers218 = (c: { atria: number; ventricles: number }) => c.atria + c.ventricles;
/** Kan, vücuttan çıkıp yeniden vücuda dönene kadar kalpten kaç kez geçer? Tek dolaşımda 1, çift dolaşımda 2. */
export const heartPasses218 = (c: VertebrateClass218) => (c.circulation === "tek" ? 1 : 2);
export const vertebrate218 = (name: string) => VERTEBRATES218.find((c) => c.name === name)!;

export const heartCell218 = (c: VertebrateClass218) =>
  `${chambers218(c)} odacık (${c.atria} kulakçık + ${c.ventricles} karıncık${c.partialSeptum ? ", karıncıkta kısmi bölme" : ""})${c.heartException ? `; ${c.heartException.example} ${chambers218(c.heartException)}` : ""} · ${c.circulation} dolaşım`;
const vertebrateTable = {
  layout: "table" as const,
  headers: ["Grup · örnek", "Solunum (ergin)", "Kalp · dolaşım", "Isı düzenleme", "Döllenme"],
  rows: VERTEBRATES218.map((c) => [
    `${c.name} · ${list(c.examples)}`,
    c.respiration,
    heartCell218(c),
    cap(c.thermo),
    `${cap(c.fertilisation)}${c.fertNote ? ` (${c.fertNote})` : ""}`,
  ]),
};
const fourChamber = VERTEBRATES218.filter((c) => chambers218(c) === 4 || (c.heartException && chambers218(c.heartException) === 4));
const endotherms = VERTEBRATES218.filter((c) => c.thermo === "endoterm");
const singleLoop = VERTEBRATES218.filter((c) => c.circulation === "tek");
const internalFert = VERTEBRATES218.filter((c) => c.fertilisation === "iç");
const crocodile = VERTEBRATES218.find((c) => c.heartException)!;

guard(singleLoop.length === 1 && singleLoop[0].name === "Balıklar", "tablodaki gruplardan yalnız balıklarda tek dolaşım vardır");
guard(endotherms.map(({ name }) => name).join() === "Kuşlar,Memeliler", "tablodaki endotermler kuşlar ve memelilerdir");
guard(fourChamber.length === 3 && crocodile.thermo === "ektoterm", "dört odacık kuş, memeli ve ektoterm timsahta görülür");
guard(VERTEBRATES218.filter((c) => c.thermo === "endoterm").every((c) => chambers218(c) === 4), "endotermlerin hepsi dört odacıklıdır");
guard(VERTEBRATES218.every((c) => (c.atria === 1) === (c.circulation === "tek")), "tek kulakçık tek dolaşımla birlikte görülür");
guard(VERTEBRATES218.filter((c) => c.fertilisation === "dış").every((c) => c.fertNote), "dış döllenme satırlarının hepsinde karşı örnek ya da sınır notu vardır");
guard(crocodile.name === "Sürüngenler", "kalp istisnası (timsah) sürüngenler satırındadır");
guard(VERTEBRATES218.filter((c) => c.fertilisation === "dış").length === 2, "dış döllenme yazan iki satır vardır");
guard(VERTEBRATES218.filter((c) => c.larvaGills).length === 1, "larvası solungaçla ergini akciğerle solunan yalnız iki yaşamlılardır");

export const vertebrateSection218: GuideSection = {
  title: "Beş omurgalı grubu: solunum, kalp, ısı ve döllenme tek tabloda",
  paragraphs: [
    `Tablo okul karşılaştırmasıdır: her satırda o grubun tipik ergin örneği vardır ve istisna, hücrenin içinde yazılıdır. Kalp sütunundaki odacık sayısı kulakçık ve karıncık sayılarının toplamıdır. Tipik örneklerde ${list(VERTEBRATES218.map((c) => `${lower(c.name)} ${chambers218(c)}`))} odacık taşır. ${cap(crocodile.heartException!.example)} ise ${chambers218(crocodile.heartException!)} odacıklı bir sürüngendir.`,
    `Dolaşım sütunu kanın bir tam turda kalpten kaç kez geçtiğini söyler. Tek dolaşımda kan kalpten ${lower(singleLoop[0].gasStop)}lara, oradan vücuda gider ve kalbe ${heartPasses218(singleLoop[0])} kez uğrar. Çift dolaşımda akciğer turu ile vücut turu ayrıdır; kan kalpten ${heartPasses218(VERTEBRATES218[1])} kez geçer. Tablodaki gruplardan yalnız ${lower(singleLoop[0].name)} tek dolaşımlıdır.`,
    `Isı sütununda yalnız ${and(endotherms.map((c) => lower(c.name)))} endotermdir. Döllenme sütununda ${and(internalFert.map((c) => lower(c.name)))} iç döllenmelidir. Dış döllenme yazan iki satırın ikisinde de not vardır: köpek balığı iç döllenir, iki yaşamlıların bütün türleri aynı yolu kullanmaz. Bir hayvanı tek sütundan tanıma; en az iki sütunu birlikte kullan.`,
  ],
  table: vertebrateTable,
};

/* Örnek 1: üç koşullu süzgeç. */
export const vertebrateFilter218 = { atria: 2, thermo: "ektoterm" as Thermo218, fertilisation: "iç" as Place218 };
const vf = vertebrateFilter218;
const afterAtria = VERTEBRATES218.filter((c) => c.atria === vf.atria);
const afterThermo = afterAtria.filter((c) => c.thermo === vf.thermo);
export const vertebrateFilterResult218 = afterThermo.filter((c) => c.fertilisation === vf.fertilisation);
const vfr = vertebrateFilterResult218;
guard(vfr.length === 1 && vfr[0].heartException !== undefined, "üç koşul tek grup bırakır ve o grupta kalp istisnası vardır");

/* Örnek 2: kalpten geçiş sayısı. */
export const passNames218 = ["Balıklar", "İki yaşamlılar", "Kuşlar"] as const;
const passRows = passNames218.map(vertebrate218);
guard(chambers218(passRows[1]) !== chambers218(passRows[2]) && heartPasses218(passRows[1]) === heartPasses218(passRows[2]), "odacık sayısı farklı iki grupta geçiş sayısı aynı olabilir");

const names = (xs: readonly VertebrateClass218[]) => and(xs.map(({ name }) => lower(name)));
export const vertebrateExamples218: WorkedExample[] = [
  {
    title: "Üç sütunlu süzgeçle grubu bul, sonra kalbe bak",
    prompt: `Beş omurgalı grubunun tablosu kullanılıyor. Aranan grubun tipik örneğinde kalpte ${vf.atria} kulakçık var, canlı ${vf.thermo} ve döllenme ${vf.fertilisation} döllenmedir. Hangi grup kalır? Bu grubun kalbi kaç odacıklıdır ve hangi üyesi karşı örnektir?`,
    strategy: "Koşulları tek tek uygula ve her adımda kalan satırları yaz. Sonra kalan satırın kalp hücresini istisnasıyla birlikte oku.",
    steps: [
      { label: `${vf.atria} kulakçık`, expression: `${names(afterAtria)}`, explanation: `${cap(names(VERTEBRATES218.filter((c) => c.atria !== vf.atria)))} elenir: ${VERTEBRATES218.find((c) => c.atria !== vf.atria)!.atria} kulakçık.` },
      { label: cap(vf.thermo), expression: names(afterThermo), explanation: `${cap(names(afterAtria.filter((c) => c.thermo !== vf.thermo)))} endoterm olduğu için elenir.` },
      { label: `${cap(vf.fertilisation)} döllenme`, expression: names(vfr), explanation: `${cap(names(afterThermo.filter((c) => c.fertilisation !== vf.fertilisation)))} tabloda dış döllenmeli yazılıdır.` },
      { label: "Kalp hücresi", expression: heartCell218(vfr[0]), explanation: "İstisna aynı hücrede yazılıdır; tipik değerle birlikte oku." },
    ],
    answer: `${vfr[0].name}. Tipik örnekte ${chambers218(vfr[0])} odacık (${vfr[0].atria} kulakçık + ${vfr[0].ventricles} karıncık, karıncıkta kısmi bölme); karşı örnek ${vfr[0].heartException!.example}, ${chambers218(vfr[0].heartException!)} odacık.`,
    check: `Koşullardan biri kaldırılsa aday artar: ektoterm koşulu olmadan ${names(afterAtria.filter((c) => c.fertilisation === vf.fertilisation))} kalır.`,
    pitfall: `${cap(vfr[0].heartException!.example)}ın ${chambers218(vfr[0].heartException!)} odacığını görüp grubu kuş ya da memeli saymak. ${cap(vfr[0].heartException!.example)} ektotermdir ve ${lower(vfr[0].name)} içindedir.`,
  },
  {
    title: "Kan bir turda kalpten kaç kez geçer?",
    prompt: `Kan vücuttaki dokulardan çıkıp yeniden aynı dokulara dönene kadar kalpten kaç kez geçer? ${cap(and(passRows.map((c) => c.examples[0])))} için tablodaki dolaşım tipini kullan. Odacık sayısı bu sayıyı belirler mi?`,
    strategy: "Tek dolaşımda gaz alışverişi yüzeyi ile vücut aynı turdadır; çift dolaşımda iki ayrı tur vardır ve kan her turun başında kalpten geçer.",
    steps: passRows.map((c) => ({
      label: cap(c.examples[0]),
      expression: `${c.circulation} dolaşım ⇒ ${heartPasses218(c)} geçiş; kalp ${chambers218(c)} odacık`,
      explanation: c.circulation === "tek" ? `Kalp → ${lower(c.gasStop)} → vücut → kalp.` : `Kalp → ${lower(c.gasStop)} → kalp → vücut → kalp.`,
    })),
    answer: `${cap(list(passRows.map((c) => `${c.examples[0]} ${heartPasses218(c)}`)))} kez. Odacık sayısı belirlemez: ${passRows[1].examples[0]} ${chambers218(passRows[1])}, ${passRows[2].examples[0]} ${chambers218(passRows[2])} odacıklıdır ama ikisinde de kan ${heartPasses218(passRows[1])} kez geçer.`,
    check: `Tabloda tek dolaşımlı yalnız ${lower(singleLoop[0].name)} vardır; ${singleLoop[0].atria} kulakçıklı tek grup da odur.`,
    pitfall: "Odacık sayısını geçiş sayısıyla eşlemek. Geçiş sayısını dolaşım tipi, kanın kalp içinde ne kadar ayrıldığını karıncık düzeni söyler.",
  },
];

export const vertebrateSupplement218 = {
  title: vertebrateSection218.title,
  figureTitle: vertebrateSection218.title,
  paragraphs: vertebrateSection218.paragraphs,
  summary: `Odacık: ${list(VERTEBRATES218.map((c) => `${lower(c.name)} ${chambers218(c)}`))}; ${crocodile.heartException!.example} ${chambers218(crocodile.heartException!)}. Tek dolaşım yalnız ${lower(singleLoop[0].name)}. Endoterm: ${names(endotherms)}. İç döllenme: ${names(internalFert)}; köpek balığı da iç. Tek sütunla tanı koyma.`,
  appendSection: true as const,
  table: vertebrateTable,
  examples: vertebrateExamples218,
};

/* =================================================================
 * 2 · Omurgasızlar: sekiz okul grubu
 * ================================================================= */

export type Symmetry218 = "asimetrik" | "ışınsal" | "iki yanlı";
export type Circulation218 = "yok" | "açık" | "kapalı" | "indirgenmiş";
export interface InvertebrateGroup218 {
  name: string;
  short: string;
  examples: readonly string[];
  symmetry: Symmetry218;
  symmetryNote?: string;
  feature: string;
  respiration: string;
  /** Solunum ayrı bir organla değil vücut yüzeyiyle yapılır. */
  surfaceBreathing: boolean;
  circulation: Circulation218;
  circulationNote?: string;
}
export const INVERTEBRATES218: readonly InvertebrateGroup218[] = [
  { name: "Süngerler", short: "Sünger", examples: ["deniz süngeri"], symmetry: "asimetrik", symmetryNote: "çoğu", feature: "Porlar; gerçek doku yok", respiration: "Özel organ yok; hücreler sudan alır", surfaceBreathing: true, circulation: "yok" },
  { name: "Sölenterler", short: "Sölenter", examples: ["hidra", "denizanası", "mercan"], symmetry: "ışınsal", feature: "Yakıcı hücre; tek açıklıklı boşluk", respiration: "Özel organ yok; vücut yüzeyi", surfaceBreathing: true, circulation: "yok" },
  { name: "Yassı solucanlar", short: "Yassı s.", examples: ["planarya", "tenya"], symmetry: "iki yanlı", feature: "Planaryada tek açıklık, tenyada sindirim sistemi yok", respiration: "Vücut yüzeyi", surfaceBreathing: true, circulation: "yok" },
  { name: "Yuvarlak solucanlar", short: "Yuvarlak s.", examples: ["bağırsak solucanı"], symmetry: "iki yanlı", feature: "Ağız ve anüs ayrı sindirim kanalı", respiration: "Vücut yüzeyi", surfaceBreathing: true, circulation: "yok" },
  { name: "Halkalı solucanlar", short: "Halkalı s.", examples: ["toprak solucanı", "sülük"], symmetry: "iki yanlı", feature: "Segmentli gövde", respiration: "Nemli vücut yüzeyi", surfaceBreathing: true, circulation: "kapalı" },
  { name: "Yumuşakçalar", short: "Yumuşakça", examples: ["midye", "salyangoz", "ahtapot"], symmetry: "iki yanlı", symmetryNote: "temel plan", feature: "Manto, kaslı ayak", respiration: "Solungaç; karasal salyangozda manto boşluğu", surfaceBreathing: false, circulation: "açık", circulationNote: "ahtapot ve kalamarda kapalı" },
  { name: "Eklembacaklılar", short: "Eklembacaklı", examples: ["çekirge", "örümcek", "yengeç"], symmetry: "iki yanlı", feature: "Kitinli dış iskelet, eklemli üyeler", respiration: "Trake (böcek), kitapsı akciğer (örümceğimsi), solungaç (kabuklu)", surfaceBreathing: false, circulation: "açık" },
  { name: "Derisidikenliler", short: "Derisidikenli", examples: ["denizyıldızı", "denizkestanesi"], symmetry: "ışınsal", symmetryNote: "ergin beşli; larva iki yanlı", feature: "Su damar sistemi, tüp ayak, kireçli iç iskelet", respiration: "Tüp ayaklar ve deri solungaçları", surfaceBreathing: false, circulation: "indirgenmiş", circulationNote: "su damar sistemi taşımaya katılır" },
];
export const invertebrate218 = (name: string) => INVERTEBRATES218.find((g) => g.name === name)!;
const circulationText: Record<Circulation218, string> = { yok: "Özel sistem yok", açık: "Açık", kapalı: "Kapalı", indirgenmiş: "İndirgenmiş" };
export const circulationCell218 = (g: InvertebrateGroup218) => `${circulationText[g.circulation]}${g.circulationNote ? ` (${g.circulationNote})` : ""}`;
export const symmetryCell218 = (g: InvertebrateGroup218) => `${cap(g.symmetry)}${g.symmetryNote ? ` (${g.symmetryNote})` : ""}`;
const invertebrateTable = {
  layout: "table" as const,
  headers: ["Grup · örnek", "Simetri (ergin)", "Ayırt edici yapı", "Solunum", "Dolaşım"],
  rows: INVERTEBRATES218.map((g) => [`${g.name} · ${list(g.examples)}`, symmetryCell218(g), g.feature, g.respiration, circulationCell218(g)]),
};
const invBy = (pred: (g: InvertebrateGroup218) => boolean) => INVERTEBRATES218.filter(pred);
const invNames = (xs: readonly InvertebrateGroup218[]) => and(xs.map(({ name }) => lower(name)));
const radial = invBy((g) => g.symmetry === "ışınsal");
const noCirculation = invBy((g) => g.circulation === "yok");
const closedCirc = invBy((g) => g.circulation === "kapalı" || /kapalı/.test(g.circulationNote ?? ""));
const openCirc = invBy((g) => g.circulation === "açık");
const noCircSymmetries = [...new Set(noCirculation.map(({ symmetry }) => symmetry))];

guard(radial.map(({ name }) => name).join() === "Sölenterler,Derisidikenliler", "ergin ışınsal simetri sölenter ve derisidikenlide görülür");
guard(invertebrate218("Derisidikenliler").symmetryNote!.includes("larva iki yanlı"), "derisidikenli larvası iki yanlıdır");
guard(noCirculation.length === 4 && noCircSymmetries.length === 3, "özel dolaşımı olmayan dört grup üç farklı simetri tipine dağılır");
guard(closedCirc.map(({ name }) => name).join() === "Halkalı solucanlar,Yumuşakçalar", "kapalı dolaşım halkalı solucanda ve kafadanbacaklı yumuşakçada görülür");
guard(openCirc.map(({ name }) => name).join() === "Yumuşakçalar,Eklembacaklılar", "açık dolaşım çoğu yumuşakçada ve eklembacaklıda görülür");
guard(INVERTEBRATES218.filter((g) => g.circulation === "yok").every((g) => g.surfaceBreathing), "dolaşımı olmayan grupların hepsi vücut yüzeyiyle solur");

export const invertebrateSection218: GuideSection = {
  title: "Sekiz omurgasız grubu: simetri, ayırt edici yapı, solunum ve dolaşım",
  paragraphs: [
    `Tablo okul düzeyinde karşılaştırılan ${INVERTEBRATES218.length} grubu satır satır verir; solucanlar yassı, yuvarlak ve halkalı diye üç satıra ayrıldı. Simetri sütunu ergin bireyi anlatır. Ergin dönemde ışınsal simetri yalnız ${invNames(radial)} satırlarında vardır. Derisidikenli larvası ise iki yanlıdır: aynı canlıda evreye göre simetri değişebilir.`,
    `Dolaşım sütununda dört değer var. Özel dolaşım sistemi olmayan ${noCirculation.length} grup (${invNames(noCirculation)}) ${noCircSymmetries.length} farklı simetri tipine dağılır; dolaşımsızlık tek bir simetriye bağlı değildir. Kapalı dolaşım ${invNames(closedCirc.slice(0, 1))} ile ahtapot ve kalamarda görülür. Açık dolaşım ${invNames(openCirc.slice(1))} ve çoğu yumuşakçada vardır.`,
    `Solunum sütununda dolaşımı olmayan grupların hepsi özel organ yerine vücut yüzeyini kullanır. Bunun tersi doğru değildir: ${lower(closedCirc[0].name)} da nemli vücut yüzeyiyle solur ama kapalı dolaşım taşır. Bir hayvanı tanırken önce ayırt edici yapı sütununa, sonra en az bir sistem sütununa bak.`,
  ],
  table: invertebrateTable,
};

/* Örnek 1: iki yanlı + vücut yüzeyi, sonra kapalı dolaşım. */
const bilateralSurface = invBy((g) => g.symmetry === "iki yanlı" && g.surfaceBreathing);
export const bilateralSurfaceClosed218 = bilateralSurface.filter((g) => g.circulation === "kapalı");
guard(bilateralSurface.length === 3 && bilateralSurfaceClosed218.length === 1, "iki yanlı ve yüzeyle solunan üç gruptan yalnız biri kapalı dolaşımlıdır");
const bsc = bilateralSurfaceClosed218[0];

export const invertebrateExamples218: WorkedExample[] = [
  {
    title: "Simetri, solunum ve dolaşımla solucanı ayır",
    prompt: "Sekiz omurgasız grubunun tablosu kullanılıyor. Ergini iki yanlı simetrili, ayrı bir solunum organı olmadan vücut yüzeyiyle solunan ve kapalı dolaşımlı bir hayvan gözleniyor. Önce ilk iki koşulu, sonra üçüncüyü uygula. Hangi grup ve hangi örnekler kalır?",
    strategy: "Koşulları sırayla uygula; her adımda kalan satırları yaz. Son adayın ayırt edici yapısını da oku.",
    steps: [
      { label: "İki yanlı simetri", expression: invNames(invBy((g) => g.symmetry === "iki yanlı")), explanation: `${cap(invNames(invBy((g) => g.symmetry !== "iki yanlı")))} elenir.` },
      { label: "Vücut yüzeyiyle solunum", expression: invNames(bilateralSurface), explanation: "Solungaç, trake veya kitapsı akciğer kullanan satırlar elenir." },
      { label: "Kapalı dolaşım", expression: invNames(bilateralSurfaceClosed218), explanation: `${cap(invNames(bilateralSurface.filter((g) => g.circulation !== "kapalı")))} satırlarında özel dolaşım sistemi yoktur.` },
      { label: "Ayırt edici yapı", expression: bsc.feature, explanation: "Segmentli gövde ikinci bağımsız kanıttır." },
    ],
    answer: `${bsc.name}: ${list(bsc.examples)}.`,
    check: `Yalnız kapalı dolaşım koşulu uygulansaydı ${lower(closedCirc[0].name)} ile ahtapot ve kalamar (${lower(closedCirc[1].name)}) kalırdı; yüzeyle solunum koşulu yumuşakçaları eler.`,
    pitfall: "Vücut yüzeyiyle solunan her hayvanda dolaşım sistemi olmadığını sanmak. Halkalı solucan yüzeyle solur ama kapalı dolaşım taşır.",
  },
  {
    title: "Dolaşımı olmayanlar tek simetride toplanır mı?",
    prompt: "Tablodaki gruplardan özel dolaşım sistemi bulunmayanları seç. Bu grupların ergin simetrilerini yaz. ‘Dolaşım sistemi yoksa hayvan ışınsal simetrilidir’ yargısı bu tabloya göre doğru mu?",
    strategy: "Önce dolaşım sütununda ‘özel sistem yok’ yazan satırları seç, sonra simetri sütununu oku ve farklı değerleri say.",
    steps: [
      { label: "Dolaşım yok", expression: invNames(noCirculation), explanation: `${noCirculation.length} grup.` },
      ...noCirculation.map((g) => ({ label: g.name, expression: symmetryCell218(g), explanation: g.feature })),
      { label: "Farklı simetriler", expression: `${noCircSymmetries.length} tip: ${list(noCircSymmetries)}`, explanation: "Yargıyı çürütmek için tek karşı örnek yeter." },
    ],
    answer: `Doğru değil. Dolaşımı olmayan ${noCirculation.length} grup ${noCircSymmetries.length} simetri tipine dağılır: ${list(noCirculation.map((g) => `${lower(g.name)} ${g.symmetry}`))}.`,
    check: `Ters yön de tutmaz: ışınsal ergin gruplardan ${lower(radial.find((g) => g.circulation !== "yok")!.name)} satırında dolaşım ‘yok’ değil, indirgenmiştir.`,
    pitfall: "İki özelliği bir kez birlikte gördüğün için her grupta birlikte sanmak. Yassı ve yuvarlak solucanlar dolaşımsızdır ama iki yanlıdır.",
  },
];
guard(noCirculation.some((g) => g.symmetry === "iki yanlı") && radial.some((g) => g.circulation !== "yok"), "dolaşımsız iki yanlı grup ve dolaşımı ‘yok’ olmayan ışınsal grup vardır");

export const invertebrateSupplement218 = {
  title: invertebrateSection218.title,
  figureTitle: invertebrateSection218.title,
  paragraphs: invertebrateSection218.paragraphs,
  summary: `Ergin ışınsal: ${invNames(radial)} (larva iki yanlı). Özel dolaşım yok: ${invNames(noCirculation)}; hepsi yüzeyle solur. Kapalı: halkalı solucan, ahtapot, kalamar. Açık: eklembacaklı, çoğu yumuşakça. Yüzeyle solunum dolaşım yokluğu demek değildir.`,
  appendSection: true as const,
  table: invertebrateTable,
  examples: invertebrateExamples218,
};

/* =================================================================
 * 3 · Virüsler: sekiz örnek ve litik–lizogenik basamaklar
 * ================================================================= */

export type Genome218 = "DNA" | "RNA";
export interface Virus218 {
  name: string;
  short: string;
  genome: Genome218;
  envelope: boolean;
  host: "bakteri" | "bitki" | "insan";
  target: string;
  disease: string;
  /** Baş, kuyruk ve tutunma lifli bakteriyofaj biçimi. */
  phageShape?: boolean;
}
/** Okul örnekleri; genom türü ve zarf, standart mikrobiyoloji ders kitaplarındaki sınıflandırmadır. */
export const VIRUSES218: readonly Virus218[] = [
  { name: "T4 bakteriyofajı", short: "T4 fajı", genome: "DNA", envelope: false, host: "bakteri", target: "E. coli bakterisi", disease: "Bakteride litik enfeksiyon (insan hastalığı değil)", phageShape: true },
  { name: "Tütün mozaik virüsü", short: "TMV", genome: "RNA", envelope: false, host: "bitki", target: "Tütün yaprağı hücreleri", disease: "Tütün mozaik hastalığı" },
  { name: "İnfluenza virüsü", short: "İnfluenza", genome: "RNA", envelope: true, host: "insan", target: "Solunum yolu epitel hücreleri", disease: "Grip" },
  { name: "Kuduz virüsü", short: "Kuduz", genome: "RNA", envelope: true, host: "insan", target: "Sinir sistemi", disease: "Kuduz" },
  { name: "Herpes simpleks virüsü", short: "Herpes", genome: "DNA", envelope: true, host: "insan", target: "Deri-mukoza epitel ve sinir hücreleri", disease: "Uçuk" },
  { name: "HIV", short: "HIV", genome: "RNA", envelope: true, host: "insan", target: "Bağışıklık hücreleri (yardımcı T hücreleri)", disease: "AIDS (ileri bağışıklık yetmezliği evresi)" },
  { name: "Hepatit A virüsü", short: "Hepatit A", genome: "RNA", envelope: false, host: "insan", target: "Karaciğer hücreleri", disease: "Hepatit A" },
  { name: "Hepatit B virüsü", short: "Hepatit B", genome: "DNA", envelope: true, host: "insan", target: "Karaciğer hücreleri", disease: "Hepatit B" },
];
export const virus218 = (name: string) => VIRUSES218.find((x) => x.name === name)!;
const virusTable = {
  layout: "table" as const,
  headers: ["Virüs", "Genom", "Zarf", "Konak · hedef hücre", "Örnek hastalık / sonuç"],
  rows: VIRUSES218.map((x) => [x.name, x.genome, x.envelope ? "Var (lipit zarf)" : "Yok", `${cap(x.host)} · ${x.target}`, x.disease]),
};
const byGenome = (g: Genome218) => VIRUSES218.filter((x) => x.genome === g);
const naked = VIRUSES218.filter((x) => !x.envelope);
const hepatitis = VIRUSES218.filter((x) => x.name.startsWith("Hepatit"));
const vNames = (xs: readonly Virus218[]) => and(xs.map(({ name }) => name));

guard(byGenome("DNA").length + byGenome("RNA").length === VIRUSES218.length && byGenome("DNA").length > 0 && byGenome("RNA").length > 0, "her örneğin genomu ya DNA ya RNA’dır ve iki tür de görülür");
guard(naked.length > 0 && naked.length < VIRUSES218.length, "zarflı ve zarfsız örnekler birlikte vardır");
guard(hepatitis.length === 2 && hepatitis[0].genome !== hepatitis[1].genome && hepatitis[0].target === hepatitis[1].target, "aynı organı hedefleyen iki hepatit virüsünün genomu farklıdır");
guard(VIRUSES218.filter((x) => x.phageShape).every((x) => x.host === "bakteri" && !x.envelope), "baş-kuyruk biçimli faj bakteride çoğalır ve zarfsızdır");
guard(new Set(VIRUSES218.map(({ host }) => host)).size === 3, "örneklerin konakları bakteri, bitki ve insandır");

export const virusSection218: GuideSection = {
  title: "Sekiz virüs örneği: genom, zarf, konak ve hastalık",
  paragraphs: [
    `Virüs bir hücre değildir: sitoplazması, ribozomu ve bağımsız metabolizması yoktur. Bu yüzden hiçbir virüs konak hücre dışında çoğalamaz; tablodaki her satırın ‘konak’ hücresi, o virüsün yeni parçacıklarını üreten hücredir. Konaklar üç türlüdür: bakteri, bitki ve insan. Bir satırdaki konak, virüsün başka canlılarda hiç bulunmadığı anlamına gelmez; okul örneğinin hedefidir.`,
    `Genom sütununda her örnekte yalnız bir nükleik asit türü yazar: ${byGenome("DNA").length} örnek DNA, ${byGenome("RNA").length} örnek RNA taşır. Zarf sütunu kapsidin dışındaki lipit zarfı gösterir; ${vNames(naked)} zarfsızdır, diğerleri zarflıdır. Kapsid hepsinde vardır, zarf yalnız bazılarında.`,
    `Hastalık adı genomu söylemez. ${hepatitis[0].name} ile ${hepatitis[1].name} aynı hedefte (${lower(hepatitis[0].target)}) çoğalır, ama biri ${hepatitis[0].genome}, öteki ${hepatitis[1].genome} taşır. Benzer biçimde baş, kuyruk ve tutunma lifleri yalnız ${VIRUSES218.find((x) => x.phageShape)!.name} gibi fajlara özgü bir biçimdir; bütün virüslerin anatomisi değildir.`,
  ],
  table: virusTable,
};

/* Örnek: RNA + zarfsız, sonra insan konak. */
const rnaNaked = VIRUSES218.filter((x) => x.genome === "RNA" && !x.envelope);
export const rnaNakedHuman218 = rnaNaked.filter((x) => x.host === "insan");
guard(hepatitis.filter((x) => x !== rnaNakedHuman218[0]).every((x) => x.envelope), "öteki hepatit virüsü zarflıdır");
guard(rnaNaked.length === 2 && rnaNakedHuman218.length === 1, "RNA’lı zarfsız iki örnekten yalnız biri insanda çoğalır");

export const virusExample218: WorkedExample = {
  title: "Genom ve zarf bilgisiyle tablodaki örneği bul",
  prompt: "Sekiz virüs örneğinin tablosu kullanılıyor. Bir virionun genomunun RNA olduğu ve kapsidinin dışında lipit zarf bulunmadığı belirleniyor. Hangi örnekler bu iki bilgiyle uyumludur? Virüsün yeni parçacıklarını insan karaciğer hücrelerinde ürettiği de bilinirse hangisi kalır?",
  strategy: "Genom ve zarf sütunlarıyla adayları süz; sonra konak sütununu kullan. Hastalık adından genom çıkarma.",
  steps: [
    { label: "Genom RNA", expression: vNames(byGenome("RNA")), explanation: `${byGenome("RNA").length} aday.` },
    { label: "Zarf yok", expression: vNames(rnaNaked), explanation: "Zarflı RNA virüsleri elenir." },
    { label: "Konak insan karaciğeri", expression: vNames(rnaNakedHuman218), explanation: `${vNames(rnaNaked.filter((x) => x.host !== "insan"))} bitki hücresinde çoğalır.` },
  ],
  answer: `İki bilgiyle ${vNames(rnaNaked)} uyumludur. Konak bilgisiyle ${rnaNakedHuman218[0].name} kalır.`,
  check: `${hepatitis.find((x) => x !== rnaNakedHuman218[0])!.name} de karaciğeri hedefler ama ${hepatitis.find((x) => x !== rnaNakedHuman218[0])!.genome} taşır ve zarflıdır; ilk adımda elenir.`,
  pitfall: "‘Hepatit’ adını tek virüs sanıp genomu hastalık adından tahmin etmek. Aynı organı hedefleyen iki hepatit virüsünün genomu farklıdır.",
};

export const virusSupplement218 = {
  title: virusSection218.title,
  figureTitle: virusSection218.title,
  paragraphs: virusSection218.paragraphs,
  summary: `Virüs hücre değildir, konak hücre dışında çoğalamaz. Genom ya DNA ya RNA: ${byGenome("DNA").length} DNA, ${byGenome("RNA").length} RNA örneği. Kapsid hepsinde, lipit zarf yalnız bazılarında; zarfsız: ${vNames(naked)}. İki hepatit virüsü aynı organı hedefler, genomları farklıdır.`,
  appendSection: true as const,
  table: virusTable,
  examples: [virusExample218],
};

/* ---------- Litik ve lizogenik döngü ---------- */

export interface CycleStep218 {
  name: string;
  lytic: string;
  lysogenic: string;
  /** Bu basamağın sonunda ortama yeni virion çıkmış mı? */
  newVirions: { lytic: boolean; lysogenic: boolean };
  /** Bu basamağın sonunda konak bakteri yaşıyor mu? */
  hostAlive: { lytic: boolean; lysogenic: boolean };
}
export const CYCLE_STEPS218: readonly CycleStep218[] = [
  { name: "1 · Tutunma", lytic: "Faj, tutunma lifleriyle bakteri yüzeyindeki uygun reseptöre bağlanır.", lysogenic: "Faj, tutunma lifleriyle bakteri yüzeyindeki uygun reseptöre bağlanır.", newVirions: { lytic: false, lysogenic: false }, hostAlive: { lytic: true, lysogenic: true } },
  { name: "2 · Genomun girişi", lytic: "Faj DNA’sı bakteriye girer; kapsid dışarıda kalır.", lysogenic: "Faj DNA’sı bakteriye girer; kapsid dışarıda kalır.", newVirions: { lytic: false, lysogenic: false }, hostAlive: { lytic: true, lysogenic: true } },
  { name: "3 · Genomun yolu", lytic: "Faj DNA’sı kopyalanır; konağın ribozomlarında faj proteinleri sentezlenir.", lysogenic: "Faj DNA’sı bakteri DNA’sına katılır ve profaj adını alır; yeni faj parçacığı kurulmaz.", newVirions: { lytic: false, lysogenic: false }, hostAlive: { lytic: true, lysogenic: true } },
  { name: "4 · Birleşme ya da aktarım", lytic: "Genom ve kapsid proteinleri birleşir, yeni fajlar bakteri içinde kurulur.", lysogenic: "Bakteri bölündükçe profaj bakteri DNA’sıyla birlikte kopyalanıp yavru hücrelere aktarılır.", newVirions: { lytic: false, lysogenic: false }, hostAlive: { lytic: true, lysogenic: true } },
  { name: "5 · Çıkış ya da geçiş", lytic: "Bakteri parçalanır; yeni fajlar ortama çıkar, konak ölür.", lysogenic: "Uygun koşulda profaj ayrılır ve litik döngüye geçilir; o zamana kadar konak yaşar, virion çıkmaz.", newVirions: { lytic: true, lysogenic: false }, hostAlive: { lytic: false, lysogenic: true } },
];
export const LYTIC_PHAGE218 = "T4 fajı";
export const TEMPERATE_PHAGE218 = "λ (lambda) fajı";
const cycleTable = {
  layout: "table" as const,
  headers: ["Basamak", `Litik döngü (ör. ${LYTIC_PHAGE218})`, `Lizogenik döngü (ör. ${TEMPERATE_PHAGE218})`],
  rows: CYCLE_STEPS218.map((s) => [s.name, s.lytic, s.lysogenic]),
};
const sharedSteps = CYCLE_STEPS218.filter((s) => s.lytic === s.lysogenic);
const firstSplit = CYCLE_STEPS218.findIndex((s) => s.lytic !== s.lysogenic);
const lyticRelease = CYCLE_STEPS218.findIndex((s) => s.newVirions.lytic);

guard(sharedSteps.length === 2 && firstSplit === 2, "iki döngünün ilk iki basamağı aynıdır, üçüncüde ayrılır");
guard(CYCLE_STEPS218.every((s) => !s.newVirions.lysogenic && s.hostAlive.lysogenic), "lizogenik basamaklarda virion çıkmaz ve konak yaşar");
guard(lyticRelease === CYCLE_STEPS218.length - 1 && CYCLE_STEPS218.filter((s) => !s.hostAlive.lytic).length === 1, "litik döngüde virion yalnız son basamakta çıkar ve konak o basamakta ölür");
guard(CYCLE_STEPS218[firstSplit].lysogenic.includes("profaj"), "ayrılma basamağında lizogenik yol profaj oluşturur");

export const cycleSection218: GuideSection = {
  title: "Litik ve lizogenik döngü basamak basamak",
  paragraphs: [
    `Tablo bir bakteriyofajın bakteri içindeki iki yolunu karşılaştırır. Faj bakteri dışında çoğalamaz; her basamak konak bakterinin içinde ya da yüzeyinde geçer. İlk ${sharedSteps.length} basamak (${list(sharedSteps.map((s) => lower(s.name.split(" · ")[1])))}) iki döngüde aynıdır. Yollar ${firstSplit + 1}. basamakta ayrılır.`,
    `Litik döngüde yeni fajlar yalnız ${lyticRelease + 1}. basamakta ortama çıkar ve konak bakteri o anda parçalanır. Daha önceki basamaklarda içerideki viral genom ve protein sayısı artsa da ortamdaki virion sayısı değişmez. ${LYTIC_PHAGE218} yalnız litik döngü izleyen bir faj örneğidir.`,
    `Lizogenik döngüde faj DNA’sı bakteri DNA’sına katılır; bu hâline profaj denir. Bakteri yaşar ve bölünür; her bölünmede profaj da kopyalanıp yavru hücrelere geçer. Bu sürede ortama hiç virion çıkmaz. Uygun koşulda profaj ayrılırsa litik döngü başlar. İki yolu da izleyebilen ılıman faja örnek ${TEMPERATE_PHAGE218}dır.`,
  ],
  table: cycleTable,
};

/* Örnek: profajlı bakteri k kez bölünür. */
export const lysogenDivisions218 = 3;
export const lysogenCells218 = 2 ** lysogenDivisions218;
/** Lizogenik basamakların hiçbirinde virion çıkmaz: virion çıkaran basamak sayısı 0 ise çıkan faj da 0’dır. */
export const lysogenReleased218 = CYCLE_STEPS218.filter((s) => s.newVirions.lysogenic).length;
export const lysogenAfterInduction218 = lysogenCells218 - 1;
guard(lysogenReleased218 === 0, "lizogenik basamaklarda ortama virion çıkmaz");

export const cycleExample218: WorkedExample = {
  title: "Profaj taşıyan bakteriler çoğalınca virion sayısı",
  prompt: `Profaj taşıyan tek bir bakteri, profaj ayrılmadan ${lysogenDivisions218} kez art arda bölünüyor. Her bölünmede bütün hücreler bölünüyor, hücre kaybı olmuyor ve profaj her yavru hücreye geçiyor. Kaç bakteri profaj taşır? Bu sürede ortama kaç yeni faj çıkar? Ardından bu bakterilerden yalnız birinde profaj ayrılıp litik döngü tamamlanırsa profaj taşıyan kaç bakteri kalır?`,
  strategy: "Lizogenik döngüde profaj bakteri DNA’sıyla birlikte kopyalanır; hücre sayısını bölünmeyle say. Virion çıkışını tablonun virion sütununa göre değerlendir.",
  steps: [
    { label: "Hücre sayısı", expression: `2^${lysogenDivisions218} = ${lysogenCells218}`, explanation: "Her bölünme hücre sayısını iki katına çıkarır." },
    { label: "Profaj taşıyan", expression: `${lysogenCells218} bakteri`, explanation: "Profaj her yavru hücreye aktarılır." },
    { label: "Ortamdaki yeni faj", expression: `${lysogenReleased218}`, explanation: "Lizogenik basamakların hiçbirinde virion çıkmaz; konak yaşar." },
    { label: "Bir hücre litik yola geçer", expression: `${lysogenCells218} − 1 = ${lysogenAfterInduction218}`, explanation: "Litik döngünün son basamağında o bakteri parçalanır." },
  ],
  answer: `${lysogenCells218} bakteri profaj taşır, ortama ${lysogenReleased218} yeni faj çıkar. Bir hücre litik döngüyü tamamlayınca profaj taşıyan ${lysogenAfterInduction218} bakteri kalır ve ortama o hücreden çıkan yeni fajlar eklenir.`,
  check: "Viral genom kopyası ile ortamdaki virion farklı niceliklerdir: profaj kopyası hücre sayısıyla arttı, virion sayısı litik geçişe kadar değişmedi.",
  pitfall: "Profaj kopyası arttı diye ortamda yeni faj oluştuğunu sanmak. Yeni virion için genomun kapsid proteinleriyle birleşip hücreden çıkması gerekir.",
};

export const cycleSupplement218 = {
  title: cycleSection218.title,
  figureTitle: cycleSection218.title,
  paragraphs: cycleSection218.paragraphs,
  summary: `İlk ${sharedSteps.length} basamak ortak: tutunma, genomun girişi. Litik: kopyalama, sentez, birleşme; virion yalnız ${lyticRelease + 1}. basamakta çıkar, bakteri parçalanır. Lizogenik: faj DNA’sı bakteri DNA’sına katılır (profaj), bölünmelerle aktarılır; virion çıkmaz, konak yaşar.`,
  appendSection: true as const,
  table: cycleTable,
  examples: [cycleExample218],
};

/* =================================================================
 * 4 · Eşeyli üreme: kromozom sayısından gamet ve zigot
 * ================================================================= */

/**
 * Vücut hücresindeki diploit kromozom sayıları (2n).
 * Kaynak: standart karyotip kayıtları (NCBI Genome; genetik ders kitapları):
 * insan 46 (Tjio ve Levan 1956), köpek (Canis familiaris) 78,
 * tavuk (Gallus gallus) 78, sirke sineği (Drosophila melanogaster) 8,
 * zebra balığı (Danio rerio) 50, Afrika pençeli kurbağası (Xenopus laevis) 36.
 */
export const DIPLOID218 = { İnsan: 46, Köpek: 78, Tavuk: 78, "Sirke sineği": 8, "Zebra balığı": 50, "Afrika pençeli kurbağası": 36 } as const;
export const DIPLOID_SOURCE218 = "standart karyotip kayıtları (NCBI Genome, genetik ders kitapları)";
export type Species218 = keyof typeof DIPLOID218;
export interface Breeder218 {
  species: Species218;
  /** Cümle içindeki yazılış. */
  phrase: string;
  group: string;
  fertilisation: Place218;
  development: string;
  medium?: "su";
}
export const BREEDERS218: readonly Breeder218[] = [
  { species: "İnsan", phrase: "insan", group: "memeli", fertilisation: "iç", development: "iç gelişme (rahimde)" },
  { species: "Köpek", phrase: "köpek", group: "memeli", fertilisation: "iç", development: "iç gelişme (rahimde)" },
  { species: "Tavuk", phrase: "tavuk", group: "kuş", fertilisation: "iç", development: "dış gelişme (kabuklu yumurta)" },
  { species: "Sirke sineği", phrase: "sirke sineği", group: "böcek", fertilisation: "iç", development: "dış gelişme (yumurta)" },
  { species: "Zebra balığı", phrase: "zebra balığı", group: "balık", fertilisation: "dış", development: "dış gelişme (suda)", medium: "su" },
  { species: "Afrika pençeli kurbağası", phrase: "Afrika pençeli kurbağası", group: "iki yaşamlı", fertilisation: "dış", development: "dış gelişme (suda, larva evresi)", medium: "su" },
];
/** Olağan diploit hayvan modelinde mayozla oluşan gamet n = 2n / 2. */
export const gameteN218 = (diploid: number) => {
  if (!Number.isInteger(diploid) || diploid <= 0 || diploid % 2 !== 0) throw new Error(`depth218: 2n = ${diploid} bu modelin dışında`);
  return diploid / 2;
};
/** Döllenmede iki olağan gametin takımları birleşir: n + n. */
export const zygote218 = (diploid: number) => gameteN218(diploid) + gameteN218(diploid);
export const breeder218 = (s: Species218) => BREEDERS218.find((b) => b.species === s)!;
const reproTable = {
  layout: "table" as const,
  headers: ["Tür (grup)", "Vücut hücresi 2n", "Gamet n", "Zigot n + n", "Döllenme · gelişme"],
  rows: BREEDERS218.map((b) => {
    const d = DIPLOID218[b.species];
    const n = gameteN218(d);
    return [`${b.species} (${b.group})`, String(d), String(n), `${n} + ${n} = ${zygote218(d)}`, `${cap(b.fertilisation)} döllenme${b.medium ? ` (${b.medium}da)` : ""} · ${b.development}`];
  }),
};
const external = BREEDERS218.filter((b) => b.fertilisation === "dış");
const internal = BREEDERS218.filter((b) => b.fertilisation === "iç");
const sameCount = BREEDERS218.filter((b) => BREEDERS218.some((o) => o !== b && DIPLOID218[o.species] === DIPLOID218[b.species]));
const internalExternalDev = internal.filter((b) => b.development.startsWith("dış"));
const diploids = BREEDERS218.map((b) => DIPLOID218[b.species]);

guard(BREEDERS218.every((b) => zygote218(DIPLOID218[b.species]) === DIPLOID218[b.species]), "her satırda zigot vücut hücresinin 2n sayısını geri kurar");
guard(external.length > 0 && external.every((b) => b.medium === "su"), "tablodaki dış döllenmelerin hepsi suda olur");
guard(sameCount.length === 2 && sameCount[0].group !== sameCount[1].group, "aynı 2n sayısını taşıyan iki tür farklı gruplardadır");
guard(internalExternalDev.length >= 1 && internalExternalDev.some((b) => b.group === "kuş"), "iç döllenme dış gelişmeyle birlikte olabilir (kuş)");
guard(Math.max(...diploids) > 2 * Math.min(...diploids), "2n türden türe çok değişir");

export const reproSection218: GuideSection = {
  title: "Kromozom sayısından gamet ve zigot: iç ve dış döllenme örnekleri",
  paragraphs: [
    `Tablodaki 2n değerleri vücut hücresindeki kromozom sayısıdır; kaynak: ${DIPLOID_SOURCE218}. Gamet ve zigot sütunları bu tek sayıdan hesaplanır. Olağan diploit hayvan modelinde mayoz gamette n = 2n ÷ 2 verir; döllenmede iki gametin takımı birleşir ve zigot n + n = 2n olur. Her satırda zigot, vücut hücresinin sayısını geri kurar. Sayılar kromozom/hücre birimindedir; gamet adedi değildir.`,
    `Son sütun iki ayrı soruyu yanıtlar: gametler nerede birleşir, embriyo nerede gelişir? ${cap(list(internal.map((b) => b.phrase)))} iç döllenmelidir; ${list(external.map((b) => b.phrase))} gametlerini suya bırakır ve dış döllenir. Dış döllenmede gametler suda buluşur; tablodaki dış döllenmelerin hepsi suda olur. ${cap(internalExternalDev.map((b) => b.phrase).join(" ve "))} iç döllenir ama embriyo dişinin dışında, yumurtada gelişir.`,
    `2n türden türe değişir: tabloda ${Math.min(...diploids)} ile ${Math.max(...diploids)} arasındadır. Aynı sayı akrabalık kanıtı değildir: ${sameCount.map((b) => `${b.phrase} (${b.group})`).join(" ve ")} ikisi de 2n = ${DIPLOID218[sameCount[0].species]} taşır.`,
  ],
  table: reproTable,
};

const dog = breeder218("Köpek");
const hen = breeder218("Tavuk");
const zebra = breeder218("Zebra balığı");
export const zebraEggs218 = 5;
export const zebraFertilised218 = 3;
const zd = DIPLOID218[zebra.species];
const zn = gameteN218(zd);
export const zebraTotal218 = zebraFertilised218 * zygote218(zd) + (zebraEggs218 - zebraFertilised218) * zn;
guard(zebraFertilised218 < zebraEggs218, "bazı yumurtalar döllenmeden kalır");

export const reproExamples218: WorkedExample[] = [
  {
    title: "Aynı kromozom sayısı, farklı üreme yolu",
    prompt: `Köpekte ve tavukta vücut hücresi 2n = ${DIPLOID218.Köpek} kromozom taşır. Olağan mayoz ve döllenme varsay. Her iki türün gametinde kaç kromozom vardır? Döllenme ve gelişme nerede olur? Aynı 2n sayısı bu iki canlının aynı omurgalı grubunda olduğunu gösterir mi?`,
    strategy: "Önce n = 2n ÷ 2 ile gameti, n + n ile zigotu hesapla. Sonra döllenme yerini ve gelişme yerini ayrı sütunlar olarak oku.",
    steps: [
      { label: "Gamet", expression: `${DIPLOID218.Köpek} ÷ 2 = ${gameteN218(DIPLOID218.Köpek)}`, explanation: "Mayoz takım sayısını yarıya indirir." },
      { label: "Zigot", expression: `${gameteN218(DIPLOID218.Köpek)} + ${gameteN218(DIPLOID218.Tavuk)} = ${zygote218(DIPLOID218.Köpek)}`, explanation: "Döllenme iki takımı birleştirir." },
      { label: "Köpek", expression: `${dog.fertilisation} döllenme · ${dog.development}`, explanation: `${cap(dog.group)}.` },
      { label: "Tavuk", expression: `${hen.fertilisation} döllenme · ${hen.development}`, explanation: `${cap(hen.group)}: gametler içeride birleşir, embriyo dışarı bırakılan yumurtada gelişir.` },
    ],
    answer: `İkisinde de gamet ${gameteN218(DIPLOID218.Köpek)}, zigot ${zygote218(DIPLOID218.Köpek)} kromozomludur. İkisi de iç döllenir; köpekte ${dog.development}, tavukta ${hen.development} vardır. Aynı 2n grup kanıtı değildir: köpek bir ${dog.group}, tavuk bir ${hen.group}.`,
    check: `Zigot ${zygote218(DIPLOID218.Köpek)} = 2n; mayoz ve döllenme birlikte sayıyı korur.`,
    pitfall: "İç döllenme gördüğün için iç gelişme de yazmak. Tavukta gametler içeride birleşir ama embriyo kabuklu yumurtada, dışarıda gelişir.",
  },
  {
    title: "Dış döllenmede hücre başına ve toplam kromozom",
    prompt: `Bir zebra balığı (2n = ${zd}) dişisi suya ${zebraEggs218} olgun yumurta bırakıyor; erkek aynı suya sperm bırakıyor. Yumurtalardan ${zebraFertilised218} tanesi her biri tek bir spermle olağan biçimde dölleniyor, diğerleri döllenmiyor. Başka hücre ve bölünme yok. Döllenme nerede olmuştur? Her zigotta ve her döllenmemiş yumurtada kaç kromozom vardır? Bu ${zebraEggs218} hücredeki toplam kromozom sayısı nedir?`,
    strategy: "Hücre türünü önce etiketle: döllenmiş yumurta zigot (n + n), döllenmemiş yumurta gamet (n). Sonra hücre sayısıyla çarp ve topla.",
    steps: [
      { label: "Döllenme yeri", expression: `${zebra.fertilisation} döllenme (${zebra.medium}da)`, explanation: "Gametler dişinin vücudu dışında, suda buluşur." },
      { label: "Hücre başına", expression: `zigot ${zn} + ${zn} = ${zygote218(zd)}; yumurta ${zn}`, explanation: "Döllenmemiş yumurta haploit gamet olarak kalır." },
      { label: "Zigotlar", expression: `${zebraFertilised218} × ${zygote218(zd)} = ${zebraFertilised218 * zygote218(zd)}`, explanation: "Her zigot ayrı hücredir." },
      { label: "Döllenmemişler", expression: `${zebraEggs218 - zebraFertilised218} × ${zn} = ${(zebraEggs218 - zebraFertilised218) * zn}`, explanation: `${zebraEggs218} − ${zebraFertilised218} yumurta.` },
      { label: "Toplam", expression: `${zebraFertilised218 * zygote218(zd)} + ${(zebraEggs218 - zebraFertilised218) * zn} = ${zebraTotal218}`, explanation: "Toplam, hücre başına sayıdan farklı bir niceliktir." },
    ],
    answer: `Döllenme dışarıda, suda olmuştur. Her zigotta ${zygote218(zd)}, her döllenmemiş yumurtada ${zn} kromozom vardır; ${zebraEggs218} hücrede toplam ${zebraTotal218} kromozom.`,
    check: `${zebraEggs218} hücrenin hepsi döllenseydi toplam ${zebraEggs218} × ${zygote218(zd)} = ${zebraEggs218 * zygote218(zd)} olurdu; ${zebraEggs218 - zebraFertilised218} yumurta döllenmediği için ${(zebraEggs218 - zebraFertilised218) * zn} eksik.`,
    pitfall: "Toplam kromozom sayısını hücre başına sayı gibi yazmak ya da döllenmemiş yumurtaya 2n vermek.",
  },
];

export const reproSupplement218 = {
  title: reproSection218.title,
  figureTitle: reproSection218.title,
  paragraphs: reproSection218.paragraphs,
  summary: `Gamet n = 2n ÷ 2, zigot n + n = 2n (kromozom/hücre). İnsan ${DIPLOID218.İnsan} → ${gameteN218(DIPLOID218.İnsan)}, sirke sineği ${DIPLOID218["Sirke sineği"]} → ${gameteN218(DIPLOID218["Sirke sineği"])}. Dış döllenme suda: ${list(external.map((b) => b.phrase))}. Tavuk iç döllenir, dışta gelişir. Aynı 2n (köpek, tavuk ${DIPLOID218.Köpek}) akrabalık kanıtı değildir.`,
  appendSection: true as const,
  table: reproTable,
  examples: reproExamples218,
};

export const depth218Supplements = {
  omurgalilar: [vertebrateSupplement218],
  omurgasizlar: [invertebrateSupplement218],
  virusler: [virusSupplement218, cycleSupplement218],
  "eseyli-ureme": [reproSupplement218],
};

// Paragraf ve örneklerde kullanılan iç değerler test için dışa açılır.
export const depth218Internals = { afterAtria, afterThermo, bilateralSurface, noCirculation, noCircSymmetries, radial, closedCirc, rnaNaked, hepatitis, sharedSteps, firstSplit, lyticRelease, external, internal, sameCount };
