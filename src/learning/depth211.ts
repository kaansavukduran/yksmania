import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Biyoloji derinleştirmesi (0.211.0): canlıların sınıflandırılması,
 * bakteri ve arke, Protista, mantarlar, bitkiler. Kabul edilmiş rehberler
 * değişmez; her derse görüntüleme katmanında bir karşılaştırma tablosu,
 * iki özgün çözümlü örnek ve bir bölüm çizimi eklenir. Paragraflardaki
 * adlar, tablo hücreleri, çizim etiketleri ve Kopya Kâğıdı özetleri aynı
 * dışa aktarılmış satırlardan üretilir. Genel cümlelerin dayandığı koşullar
 * modül yüklenirken denetlenir; veri bu cümleleri desteklemezse hata atılır.
 * Satırlar okul karşılaştırmasıdır; her grubun bütün istisnalarını göstermez.
 */

const ensure = (ok: boolean, message: string) => {
  if (!ok) throw new Error(`depth211: ${message}`);
};
const listTr = (items: readonly string[]) =>
  items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} ve ${items[items.length - 1]}`;
const lowerFirst = (s: string) => s.charAt(0).toLocaleLowerCase("tr-TR") + s.slice(1);
const upperFirst = (s: string) => s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1);

/* ---------- Canlıların sınıflandırılması: üst âlem ve âlem matrisi ---------- */

export type Domain211 = "Bacteria" | "Archaea" | "Eukarya";
export type CellType211 = "prokaryot" | "ökaryot";
export type WallKey211 = "peptidoglikan" | "peptidoglikansız" | "değişken" | "kitin" | "selüloz" | "yok";
export interface KingdomRow211 {
  group: string;
  domain: Domain211;
  cell: CellType211;
  body: string;
  wallKey: WallKey211;
  wall: string;
  /** Grupta ototrof üye bulunur mu (okul karşılaştırması). */
  autotrophs: boolean;
  nutrition: string;
  example: string;
}
export const kingdomRows211: readonly KingdomRow211[] = [
  { group: "Bakteriler", domain: "Bacteria", cell: "prokaryot", body: "tek hücreli", wallKey: "peptidoglikan", wall: "çoğunda peptidoglikanlı", autotrophs: true, nutrition: "ototrof veya heterotrof", example: "laktik asit bakterisi" },
  { group: "Arkeler", domain: "Archaea", cell: "prokaryot", body: "tek hücreli", wallKey: "peptidoglikansız", wall: "peptidoglikan içermez", autotrophs: true, nutrition: "ototrof veya heterotrof", example: "metanojen arke" },
  { group: "Protista", domain: "Eukarya", cell: "ökaryot", body: "çoğu tek hücreli", wallKey: "değişken", wall: "bazılarında var", autotrophs: true, nutrition: "ototrof, heterotrof veya ikisi", example: "amip, öglena" },
  { group: "Mantarlar", domain: "Eukarya", cell: "ökaryot", body: "tek veya çok hücreli", wallKey: "kitin", wall: "kitinli", autotrophs: false, nutrition: "emilimle heterotrof", example: "maya, küf" },
  { group: "Bitkiler", domain: "Eukarya", cell: "ökaryot", body: "çok hücreli", wallKey: "selüloz", wall: "selülozlu", autotrophs: true, nutrition: "çoğu fotosentezle ototrof", example: "kara yosunu, elma" },
  { group: "Hayvanlar", domain: "Eukarya", cell: "ökaryot", body: "çok hücreli", wallKey: "yok", wall: "yok", autotrophs: false, nutrition: "heterotrof", example: "aslan" },
];
export const kingdomColumns211 = ["Grup (üst âlem)", "Hücre düzeni", "Hücre duvarı", "Beslenme", "Örnek"] as const;
export const kingdomCellText211 = ({ cell, body }: KingdomRow211) => `${cell}, ${body}`;
/** Verilen özelliklerle uyumlu satırlar (eksik özellik süzmez). */
export const matchKingdoms211 = (q: { cell?: CellType211; wallKey?: WallKey211; autotrophs?: boolean }) =>
  kingdomRows211.filter((row) =>
    (q.cell === undefined || row.cell === q.cell)
    && (q.wallKey === undefined || row.wallKey === q.wallKey)
    && (q.autotrophs === undefined || row.autotrophs === q.autotrophs));

const kRow = (group: string) => kingdomRows211.find((row) => row.group === group)!;
const [bacteriaK, archaeaK, protistaK, fungiK, plantK, animalK] = ["Bakteriler", "Arkeler", "Protista", "Mantarlar", "Bitkiler", "Hayvanlar"].map(kRow);
const prokaryoteGroups = kingdomRows211.filter(({ cell }) => cell === "prokaryot");
const eukaryoteGroups = kingdomRows211.filter(({ cell }) => cell === "ökaryot");
const heterotrophOnly = kingdomRows211.filter(({ autotrophs }) => !autotrophs);
const withAutotrophs = kingdomRows211.filter(({ autotrophs }) => autotrophs);
const domains211 = [...new Set(kingdomRows211.map(({ domain }) => domain))];
export const unknownKingdom211 = { cell: "ökaryot", wallKey: "kitin", autotrophs: false } as const;
const unknownAfterCell = matchKingdoms211({ cell: unknownKingdom211.cell });
const unknownAfterWall = matchKingdoms211({ cell: unknownKingdom211.cell, wallKey: unknownKingdom211.wallKey });
const unknownFinal = matchKingdoms211(unknownKingdom211);

ensure(domains211.length === 3, "üç üst âlem bekleniyor");
ensure(kingdomRows211.length === 6, "başlık altı grup söyler");
ensure(prokaryoteGroups.every(({ domain }) => domain !== "Eukarya") && eukaryoteGroups.every(({ domain }) => domain === "Eukarya"), "prokaryot grup Eukarya dışında, ökaryot grup Eukarya içinde olmalı");
ensure(prokaryoteGroups.length === 2 && prokaryoteGroups[0].domain !== prokaryoteGroups[1].domain, "iki prokaryot grup ayrı üst âlemlerde olmalı");
ensure(prokaryoteGroups[0].wallKey !== prokaryoteGroups[1].wallKey, "iki prokaryot grup duvar sütununda ayrılmalı");
ensure(new Set(kingdomRows211.map(({ cell, wallKey, autotrophs }) => `${cell}|${wallKey}|${autotrophs}`)).size === kingdomRows211.length, "üç sütun birlikte her grubu ayırmalı");
ensure(withAutotrophs.length > 1 && heterotrophOnly.length > 1, "beslenme sütunu tek başına grup seçtirmemeli");
ensure(unknownAfterCell.length > 1 && unknownAfterWall.length === 1 && unknownFinal.length === 1 && unknownFinal[0] === fungiK, "bilinmeyen örnek tek grupta kalmalı");

const kingdomTable = {
  layout: "table" as const,
  headers: [...kingdomColumns211],
  rows: kingdomRows211.map((row) => [`${row.group} (${row.domain})`, kingdomCellText211(row), row.wall, row.nutrition, row.example]),
};

export const kingdomSection211: GuideSection = {
  title: "Üst âlemden âleme: altı grubu aynı sütunlarla oku",
  paragraphs: [
    `Tablo okul sınıflamasındaki ${kingdomRows211.length} grubu aynı ${kingdomColumns211.length - 1} sütunla karşılaştırır. Üst âlem sütunu ${domains211.length} değer alır: ${listTr(domains211)}. ${listTr(eukaryoteGroups.map(({ group }) => group))} Eukarya üst âleminin içindeki âlemlerdir. ${bacteriaK.group} ${bacteriaK.domain}, ${archaeaK.group} de ${archaeaK.domain} üst âlemini tek satırda temsil eder. Prokaryot hücrede DNA zarla çevrili bir çekirdekte değildir; ökaryot hücrede zarlı çekirdek vardır. Ototrof canlı organik besinini inorganik maddelerden üretir, heterotrof hazır organik madde kullanır.`,
    `Hücre düzeni sütunu grupları iki kümeye ayırır. Prokaryot olanlar ${listTr(prokaryoteGroups.map(({ group }) => group))}, ökaryot olanlar ${listTr(eukaryoteGroups.map(({ group }) => group))}. İki prokaryot grup aynı hücre tipini paylaşır ama duvar sütununda ayrılır: ${bacteriaK.group.toLocaleLowerCase("tr-TR")} için “${bacteriaK.wall}”, ${archaeaK.group.toLocaleLowerCase("tr-TR")} için “${archaeaK.wall}”. Duvar ökaryotlarda da ayırıcıdır. ${fungiK.group} satırında duvar ${fungiK.wall}, ${plantK.group.toLocaleLowerCase("tr-TR")} satırında ${plantK.wall}, ${animalK.group.toLocaleLowerCase("tr-TR")} satırında ${animalK.wall}. ${protistaK.group} satırında “${protistaK.wall}” yazar; bu çeşitlilik grubun tek şablon olmadığını gösterir.`,
    `Yalnız heterotrof olan âlemler ${listTr(heterotrophOnly.map(({ group }) => group))}. Ototrof üyesi bulunan gruplar ${listTr(withAutotrophs.map(({ group }) => group))}. Bu yüzden “ototrof” bilgisi tek başına ${withAutotrophs.length} grubu aday bırakır. Bir bilinmeyeni sınıflarken sütunları birleştir; her yeni sütun aday listesini daraltır. Matris okul karşılaştırmasıdır. Duvarsız bakteriler veya konaktan beslenen tam parazit bitkiler gibi istisnaları silmez; soru hangi canlıyı tanımlıyorsa o verilerle karar ver.`,
  ],
  table: kingdomTable,
};

/** Hiyerarşik basamaklar; ders “familya” terimini kullanır. */
export const ranks211 = ["Âlem", "Şube", "Sınıf", "Takım", "Familya", "Cins", "Tür"] as const;
export interface Taxon211 { name: string; taxa: readonly string[] }
export const taxa211: readonly Taxon211[] = [
  { name: "aslan", taxa: ["Animalia", "Chordata", "Mammalia", "Carnivora", "Felidae", "Panthera", "Panthera leo"] },
  { name: "kaplan", taxa: ["Animalia", "Chordata", "Mammalia", "Carnivora", "Felidae", "Panthera", "Panthera tigris"] },
  { name: "ev kedisi", taxa: ["Animalia", "Chordata", "Mammalia", "Carnivora", "Felidae", "Felis", "Felis catus"] },
  { name: "kurt", taxa: ["Animalia", "Chordata", "Mammalia", "Carnivora", "Canidae", "Canis", "Canis lupus"] },
];
/** İki canlının ortak olduğu en dar basamağın sırası (−1: hiç). */
export const sharedDepth211 = (a: Taxon211, b: Taxon211) => {
  let depth = -1;
  for (let i = 0; i < ranks211.length && a.taxa[i] === b.taxa[i]; i++) depth = i;
  return depth;
};
const taxon = (name: string) => taxa211.find((t) => t.name === name)!;
const [lion, tiger, cat, wolf] = ["aslan", "kaplan", "ev kedisi", "kurt"].map(taxon);
const lionRelatives = [tiger, cat, wolf].map((t) => ({ t, depth: sharedDepth211(lion, t) })).sort((x, y) => y.depth - x.depth);
const closest = lionRelatives[0];
ensure(lionRelatives[0].depth > lionRelatives[1].depth, "aslana tek bir en yakın canlı olmalı");
ensure(taxa211.every(({ taxa }) => taxa.length === ranks211.length), "her canlı her basamakta adlandırılmalı");
ensure(taxa211.every(({ taxa }) => taxa[6].startsWith(`${taxa[5]} `)), "ikili adın ilk sözcüğü cins olmalı");
export const rankStatements211 = [
  { text: `Kaplan ile ev kedisi aynı cinstedir.`, a: tiger, b: cat, rank: 5 },
  { text: `Ev kedisi ile kurt aynı sınıftadır.`, a: cat, b: wolf, rank: 2 },
  { text: `Aslan ile kurt aynı familyadadır.`, a: lion, b: wolf, rank: 4 },
].map((s) => ({ ...s, holds: sharedDepth211(s.a, s.b) >= s.rank }));
const roman = ["I", "II", "III"];
const trueStatements = rankStatements211.flatMap(({ holds }, i) => (holds ? [roman[i]] : []));
ensure(trueStatements.length === 1, "tek bir kesin doğru öncül bekleniyor");
const taxonLine = ({ name, taxa }: Taxon211) => `${upperFirst(name)} (${taxa[6]}): ${taxa[3]} takımı, ${taxa[4]} familyası, ${taxa[5]} cinsi`;

export const kingdomExamples211: WorkedExample[] = [
  {
    title: "Bilinmeyen ökaryotu sütun sütun süz",
    prompt: "Bir canlıdan alınan hücrelerde zarla çevrili çekirdek görülüyor. Hücre duvarında kitin saptanıyor. Hücrelerde kloroplast yok; canlı, çevresine salgıladığı enzimlerle parçaladığı besini emerek alıyor. Bu bölümdeki matrise göre canlı hangi âleme yerleştirilir?",
    strategy: "Matrisin sütunlarını soldan sağa tek tek uygula. Her sütundan sonra hangi satırların aday kaldığını yaz.",
    steps: [
      { label: "Hücre düzeni", expression: `ökaryot → ${listTr(unknownAfterCell.map(({ group }) => group))}`, explanation: `Zarlı çekirdek prokaryot iki grubu eler. ${unknownAfterCell.length} ökaryot grup aday kalır.` },
      { label: "Hücre duvarı", expression: `kitinli → ${unknownAfterWall.map(({ group }) => group).join("")}`, explanation: `Duvar sütununda “${fungiK.wall}” yazan tek satır ${fungiK.group} satırıdır. ${plantK.group} ${plantK.wall}, ${animalK.group.toLocaleLowerCase("tr-TR")} için duvar ${animalK.wall}.` },
      { label: "Beslenme denetimi", expression: `${fungiK.nutrition} = verilen beslenme`, explanation: "Kloroplast olmaması ve dışarıda parçalanan besinin emilmesi, kalan satırın beslenme sütunuyla çelişmez." },
    ],
    answer: `${unknownFinal[0].group} âlemi.`,
    check: `Ters yönden dene: ${plantK.group} satırı ${plantK.wall} duvar ve fotosentez ister; iki bilgi de verilerle çelişir. ${animalK.group} satırında duvar ${animalK.wall}.`,
    pitfall: "Hareketsiz ve duvarlı olduğu için canlıyı bitki saymak. Duvarın bileşimine ve beslenme biçimine birlikte bak.",
  },
  {
    title: "Ortak basamaktan en yakın akrabayı bul",
    prompt: `Dört memeli için basamaklar şöyledir. ${taxa211.map(taxonLine).join(". ")}. Dördü de ${lion.taxa[2]} sınıfındadır. Aslanla en dar basamağı paylaşan canlı hangisidir? Şu öncüllerden hangileri kesinlikle doğrudur? ${rankStatements211.map(({ text }, i) => `${roman[i]}. ${text}`).join(" ")}`,
    strategy: "Her çift için türden yukarı doğru çık. İki canlının adları ilk kez aynı olduğu basamak, paylaştıkları en dar basamaktır. Bir basamak ortaksa onun üstündeki bütün basamaklar da ortaktır.",
    steps: [
      { label: "Aslanla çiftler", expression: lionRelatives.map(({ t, depth }) => `${t.name}: ${ranks211[depth].toLocaleLowerCase("tr-TR")}`).join(", "), explanation: `Kaplanla cins (${lion.taxa[5]}), ev kedisiyle familya (${lion.taxa[4]}), kurtla takım (${lion.taxa[3]}) ortaktır.` },
      { label: "En yakın", expression: `${closest.t.name} (${ranks211[closest.depth].toLocaleLowerCase("tr-TR")})`, explanation: "Aynı cinsteki iki tür, bu cinsin bağlı olduğu bütün üst basamakları da paylaşır." },
      { label: "Öncül I ve III", expression: `${tiger.taxa[5]} ≠ ${cat.taxa[5]}, ${lion.taxa[4]} ≠ ${wolf.taxa[4]}`, explanation: "Cins adları ve familya adları farklıdır; iki öncül de yanlıştır." },
      { label: "Öncül II", expression: `${cat.taxa[3]} = ${wolf.taxa[3]} ⇒ ${cat.taxa[2]} = ${wolf.taxa[2]}`, explanation: "Aynı takımdaki canlılar o takımı kapsayan sınıfı da paylaşır." },
    ],
    answer: `En yakın: ${closest.t.name}. Kesin doğru: yalnız ${trueStatements.join("")}.`,
    check: `Ters çıkarım yapma: ev kedisi ile aslan aynı familyadadır ama bu aynı cinsi zorunlu kılmaz (${cat.taxa[5]} ≠ ${lion.taxa[5]}).`,
    pitfall: "Tür adının ikinci sözcüğüne ya da benzer görünüşe bakarak akrabalık kurmak. Önce ilk sözcüğü (cinsi), sonra üst basamakları karşılaştır.",
  },
];

export const kingdomSupplement211 = {
  title: kingdomSection211.title,
  figureTitle: kingdomSection211.title,
  paragraphs: kingdomSection211.paragraphs,
  summary: `Üç üst âlem: ${listTr(domains211)}. Prokaryot: ${listTr(prokaryoteGroups.map(({ group }) => group))}; duvar ${bacteriaK.wall} / ${archaeaK.wall}. Ökaryot âlemler: ${listTr(eukaryoteGroups.map(({ group }) => group))}. Duvar: ${fungiK.group.toLocaleLowerCase("tr-TR")} ${fungiK.wall}, ${plantK.group.toLocaleLowerCase("tr-TR")} ${plantK.wall}, ${animalK.group.toLocaleLowerCase("tr-TR")} ${animalK.wall}. Yalnız heterotrof: ${listTr(heterotrophOnly.map(({ group }) => group))}.`,
  appendSection: true as const,
  table: kingdomTable,
  examples: kingdomExamples211,
};

/* ---------- Bakteri ve arke: aynı satırda iki sütun ---------- */

export type Verdict211 = "Ortak" | "Ayırır" | "Tek başına yetmez" | "Destekler" | "Ayırmaz";
export interface ProkaryoteRow211 { feature: string; bacteria: string; archaea: string; verdict: Verdict211 }
export const prokaryoteRows211: readonly ProkaryoteRow211[] = [
  { feature: "Hücre tipi", bacteria: "prokaryot", archaea: "prokaryot", verdict: "Ortak" },
  { feature: "Zarla çevrili çekirdek", bacteria: "yok", archaea: "yok", verdict: "Ortak" },
  { feature: "Zar lipidi", bacteria: "ester bağlı yağ asitleri", archaea: "eter bağlı izopren zincirleri", verdict: "Ayırır" },
  { feature: "Duvarda peptidoglikan", bacteria: "çoğunda var", archaea: "yok", verdict: "Tek başına yetmez" },
  { feature: "Ribozomal RNA", bacteria: "bakteri tipi dizi", archaea: "arke tipi dizi", verdict: "Ayırır" },
  { feature: "Histon proteinleri", bacteria: "tipik olarak yok", archaea: "birçoğunda var", verdict: "Destekler" },
  { feature: "Yaşam ortamı", bacteria: "ılımlı ve aşırı ortamlar", archaea: "ılımlı ve aşırı ortamlar", verdict: "Ayırmaz" },
  { feature: "Çoğalma", bacteria: "ikiye bölünme", archaea: "ikiye bölünme", verdict: "Ortak" },
];
export const prokaryoteColumns211 = ["Özellik", "Bakteriler", "Arkeler", "Ayırt etme gücü"] as const;
const pRow = (feature: string) => prokaryoteRows211.find((row) => row.feature === feature)!;
const sameRows = prokaryoteRows211.filter(({ verdict }) => verdict === "Ortak" || verdict === "Ayırmaz");
const decisiveRows = prokaryoteRows211.filter(({ verdict }) => verdict === "Ayırır");
const [lipidP, wallP, histoneP, habitatP, cellP] = ["Zar lipidi", "Duvarda peptidoglikan", "Histon proteinleri", "Yaşam ortamı", "Hücre tipi"].map(pRow);
ensure(sameRows.every(({ bacteria, archaea }) => bacteria === archaea), "ortak satırlarda iki değer aynı olmalı");
ensure(prokaryoteRows211.filter((row) => !sameRows.includes(row)).every(({ bacteria, archaea }) => bacteria !== archaea), "ayırıcı satırlarda iki değer farklı olmalı");
ensure(decisiveRows.length >= 2, "en az iki moleküler ayırıcı satır bekleniyor");
ensure(wallP.archaea === "yok" && wallP.bacteria.startsWith("çoğunda"), "peptidoglikan satırı istisnayı taşımalı");

/** Verilen satır değerlerine göre uyumlu gruplar: ayırıcı satırlar karar verir. */
export const classifyProkaryote211 = (observed: Readonly<Record<string, string>>) => {
  const fits = (side: "bacteria" | "archaea") =>
    Object.entries(observed).every(([feature, value]) => pRow(feature)[side] === value || (pRow(feature).verdict === "Tek başına yetmez" && value === "yok"));
  return (["bacteria", "archaea"] as const).filter(fits);
};
export const unknownProkaryote211 = { "Zarla çevrili çekirdek": "yok", "Zar lipidi": lipidP.archaea, "Duvarda peptidoglikan": "yok", "Yaşam ortamı": habitatP.archaea } as const;
const unknownProkaryoteSides = classifyProkaryote211(unknownProkaryote211);
ensure(unknownProkaryoteSides.length === 1 && unknownProkaryoteSides[0] === "archaea", "bilinmeyen prokaryot arke olmalı");
ensure(classifyProkaryote211({ "Duvarda peptidoglikan": "yok" }).length === 2, "peptidoglikan yokluğu tek başına grup seçtirmemeli");

const prokaryoteTable = {
  layout: "table" as const,
  headers: [...prokaryoteColumns211],
  rows: prokaryoteRows211.map(({ feature, bacteria, archaea, verdict }) => [feature, bacteria, archaea, verdict]),
};

export const prokaryoteSection211: GuideSection = {
  title: "Bakteri ve arkeyi aynı satırlarda karşılaştır",
  paragraphs: [
    `Tablonun her satırı tek bir özelliği iki grupta yan yana yazar. Son sütun o satırın iki grubu ayırıp ayırmadığını söyler. ${upperFirst(listTr(sameRows.filter(({ verdict }) => verdict === "Ortak").map(({ feature }) => lowerFirst(feature))))} satırlarında iki değer aynıdır. Bu satırlar bir canlının prokaryot olduğunu gösterir ama hangi üst âlemde olduğunu seçtirmez.`,
    `Ayırıcı satırlar moleküler kanıttır: ${listTr(decisiveRows.map(({ feature }) => lowerFirst(feature)))}. Bakteri zarında ${lipidP.bacteria}, arke zarında ${lipidP.archaea} bulunur. Peptidoglikan satırında bakteriler için “${wallP.bacteria}”, arkeler için “${wallP.archaea}” yazar. Duvarsız bakteriler de olduğu için peptidoglikan yokluğu tek başına arke demek değildir. Histon satırı (${histoneP.bacteria} / ${histoneP.archaea}) kararı destekler ama tek ölçüt yapılmaz.`,
    `Yaşam ortamı satırında iki değer aynıdır: ${habitatP.bacteria}. Sıcak kaynakta yaşayan bakteriler, ılımlı denizde ve toprakta yaşayan arkeler vardır. Bu yüzden “sıcak sudan alındı” bilgisi arke kanıtı değildir. Bir bilinmeyeni yerleştirirken önce ortak satırları kenara koy, sonra ayırıcı satırların hangi sütunla eşleştiğine bak.`,
  ],
  table: prokaryoteTable,
};

export const prokaryoteExamples211: WorkedExample[] = [
  {
    title: "Ilımlı gölden gelen prokaryotu yerleştir",
    prompt: `Y adlı tek hücreli canlıda zarla çevrili çekirdek yok. Zar lipitlerinde ${lipidP.archaea} saptanıyor. Hücre duvarında peptidoglikan bulunmuyor. Örnek sıcak bir kaynaktan değil, ılımlı bir gölün çamurundan alınmış. Bu bölümdeki tabloya göre Y hangi gruba yerleştirilir? Yaşam ortamı bilgisi kararı değiştirir mi?`,
    strategy: "Verileri tablonun satırlarına yerleştir. Ortak satırlar adayları daraltmaz; karar ayırıcı satırdan gelir.",
    steps: [
      { label: "Ortak satır", expression: `çekirdek: ${pRow("Zarla çevrili çekirdek").bacteria} = ${pRow("Zarla çevrili çekirdek").archaea}`, explanation: "Çekirdeksizlik iki grupta da vardır. Y prokaryottur, grup henüz seçilmez." },
      { label: "Ayırıcı satır", expression: `zar lipidi: ${lipidP.archaea} → Arkeler`, explanation: `Bakteri sütununda ${lipidP.bacteria} yazar. Gözlem yalnız arke sütunuyla eşleşir.` },
      { label: "Uyum denetimi", expression: `peptidoglikan: ${wallP.archaea}`, explanation: "Peptidoglikan yokluğu arke sütunuyla uyumludur. Tek başına karar verdirmezdi, ama ayırıcı satırla çelişmiyor." },
      { label: "Yaşam ortamı", expression: `${habitatP.bacteria} = ${habitatP.archaea}`, explanation: "İki sütunda aynı değer var. Ilımlı göl bilgisi kararı değiştirmez." },
    ],
    answer: "Y arkedir (Archaea). Yaşam ortamı kararı değiştirmez.",
    check: "Zar lipidini bakteri sütunundaki değerle değiştir: ester bağlı yağ asitleri olsaydı aynı göl ve aynı çekirdeksizlikle Y bakteri sütununa geçerdi.",
    pitfall: "Arkeyi yalnız aşırı ortam canlısı sanıp ılımlı gölden gelen örneği bakteri saymak. Ortam satırı iki grupta da aynıdır.",
  },
  {
    title: "Peptidoglikansız bakteri için kesin olanı seç",
    prompt: "Z adlı canlının ribozomal RNA dizisi bakteri tipiyle eşleşiyor. Hücresinde peptidoglikanlı duvar saptanmıyor. Hangileri kesinlikle doğrudur? I. Z prokaryottur. II. Z’nin zar lipitleri eter bağlı izopren zincirleridir. III. Peptidoglikan yokluğu Z’yi arke yapar.",
    strategy: "Önce ayırıcı satırla grubu kur, sonra her öncülü o grubun sütunundaki değerle karşılaştır.",
    steps: [
      { label: "Grup", expression: "ribozomal RNA: bakteri tipi dizi → Bakteriler", explanation: "Ribozomal RNA ayırıcı satırdır. Z bakteri sütununa yerleşir." },
      { label: "Öncül I", expression: `hücre tipi: ${cellP.bacteria}`, explanation: "Bakteri sütununda hücre tipi prokaryottur. Öncül doğrudur." },
      { label: "Öncül II", expression: `zar lipidi: ${lipidP.bacteria}`, explanation: "Eter bağlı izopren zincirleri arke sütunundadır. Öncül yanlıştır." },
      { label: "Öncül III", expression: `peptidoglikan: ${wallP.verdict.toLocaleLowerCase("tr-TR")}`, explanation: "Bakteri sütunu “çoğunda var” der; duvarsız bakteriler bu istisnadır. Öncül yanlıştır." },
    ],
    answer: "Yalnız I.",
    check: "Z’yi arke saysaydık ribozomal RNA satırı çelişirdi. Ayırıcı satırla çelişen sonuç kabul edilmez.",
    pitfall: "“Peptidoglikan yok, öyleyse arke” kısa yolunu kullanmak. Bu satırın ayırt etme gücü tek başına yetmez.",
  },
];

export const prokaryoteSupplement211 = {
  title: prokaryoteSection211.title,
  figureTitle: prokaryoteSection211.title,
  paragraphs: prokaryoteSection211.paragraphs,
  summary: `Ortak: ${listTr(sameRows.filter(({ verdict }) => verdict === "Ortak").map(({ feature }) => lowerFirst(feature)))}. Ayırır: ${listTr(decisiveRows.map(({ feature }) => lowerFirst(feature)))}. Zar: bakteri ${lipidP.bacteria}, arke ${lipidP.archaea}. Peptidoglikan: ${wallP.bacteria} / ${wallP.archaea}, tek başına yetmez. Yaşam ortamı ayırmaz.`,
  appendSection: true as const,
  table: prokaryoteTable,
  examples: prokaryoteExamples211,
};

/* ---------- Protista: hareket yapısı ve beslenme ---------- */

export type Movement211 = "yalancı ayak" | "sil" | "kamçı" | "yok";
export interface ProtistRow211 {
  name: string;
  movementKind: Movement211;
  movement: string;
  nutrition: string;
  photosynthesis: boolean;
  parasite: boolean;
  special: string;
  cell: CellType211;
}
export const protistRows211: readonly ProtistRow211[] = [
  { name: "Amip", movementKind: "yalancı ayak", movement: "yalancı ayak", nutrition: "heterotrof, fagositoz", photosynthesis: false, parasite: false, special: "besin kofulu", cell: "ökaryot" },
  { name: "Paramesyum", movementKind: "sil", movement: "sil", nutrition: "heterotrof, besin kofulu", photosynthesis: false, parasite: false, special: "büyük ve küçük çekirdek", cell: "ökaryot" },
  { name: "Öglena", movementKind: "kamçı", movement: "kamçı", nutrition: "ışıkta fotosentez, karanlıkta hazır besin", photosynthesis: true, parasite: false, special: "kloroplast", cell: "ökaryot" },
  { name: "Plasmodium", movementKind: "yok", movement: "çoğu evrede organel yok", nutrition: "parazit heterotrof", photosynthesis: false, parasite: true, special: "konak ve taşıyıcılı döngü", cell: "ökaryot" },
  { name: "Cıvık mantar", movementKind: "yalancı ayak", movement: "amipsi evrede yalancı ayak", nutrition: "heterotrof, fagositoz", photosynthesis: false, parasite: false, special: "evreye göre değişen yapı", cell: "ökaryot" },
];
export const protistColumns211 = ["Örnek", "Hareket yapısı", "Beslenme", "Dikkat çeken yapı"] as const;
/** Tabloda ayrı sütun olmayan ortak özellik; çizimin son adımı bunu gösterir. */
export const protistCellColumn211 = "Hücre tipi";
export const protistFilters211 = [
  { label: "Yalancı ayak", test: (row: ProtistRow211) => row.movementKind === "yalancı ayak" },
  { label: "Fotosentez", test: (row: ProtistRow211) => row.photosynthesis },
  { label: "Parazit", test: (row: ProtistRow211) => row.parasite },
  { label: "Ökaryot hücre", test: (row: ProtistRow211) => row.cell === "ökaryot" },
] as const;
export const protistMatches211 = (index: number) => protistRows211.filter(protistFilters211[index].test);
const prRow = (name: string) => protistRows211.find((row) => row.name === name)!;
const [amoeba, paramecium, euglena, plasmodium, slime] = ["Amip", "Paramesyum", "Öglena", "Plasmodium", "Cıvık mantar"].map(prRow);
const movementKinds = [...new Set(protistRows211.map(({ movementKind }) => movementKind))];
const pseudopodRows = protistMatches211(0);
const photoRows = protistMatches211(1);
ensure(protistRows211.length === 5, "örnek başlığı beş protist söyler");
ensure(protistRows211.every(({ cell }) => cell === "ökaryot"), "her protist örneği ökaryot olmalı");
ensure(movementKinds.length === 4 && movementKinds.includes("yok"), "dört farklı hareket durumu bekleniyor");
ensure(photoRows.length === 1 && photoRows[0] === euglena, "tabloda tek fotosentetik örnek öglena olmalı");
ensure(pseudopodRows.length === 2 && pseudopodRows.includes(amoeba) && pseudopodRows.includes(slime), "yalancı ayak iki satırda olmalı");
ensure(protistMatches211(2).length === 1 && protistMatches211(2)[0] === plasmodium, "tek parazit örnek Plasmodium olmalı");
ensure(protistMatches211(3).length === protistRows211.length, "ökaryot süzgeci bütün satırları tutmalı");
export const protistStatements211 = [
  { text: "Hepsi ökaryottur.", holds: protistRows211.every(({ cell }) => cell === "ökaryot") },
  { text: "Hepsinde hareket organeli vardır.", holds: protistRows211.every(({ movementKind }) => movementKind !== "yok") },
  { text: "Hiçbiri fotosentez yapmaz.", holds: protistRows211.every(({ photosynthesis }) => !photosynthesis) },
];
const protistTrue = protistStatements211.flatMap(({ holds }, i) => (holds ? [roman[i]] : []));
ensure(protistTrue.length === 1 && protistTrue[0] === "I", "yalnız ökaryot öncülü doğru olmalı");

const protistTable = {
  layout: "table" as const,
  headers: [...protistColumns211],
  rows: protistRows211.map(({ name, movement, nutrition, special }) => [name, movement, nutrition, special]),
};

export const protistSection211: GuideSection = {
  title: "Protist örneklerini hareket ve beslenmeyle eşle",
  paragraphs: [
    `Tabloda ${protistRows211.length} protist örneği aynı sütunlarla yazıldı: ${listTr(protistRows211.map(({ name }) => name))}. Ortak olan tek özellik ${protistCellColumn211.toLocaleLowerCase("tr-TR")}dir; hepsi ökaryottur. Hareket yapısı sütunu ${movementKinds.length} farklı durum gösterir: ${movementKinds.filter((k) => k !== "yok").join(", ")} ve hareket organeli olmayan evreler. Sil hücre yüzeyindeki çok sayıda kısa uzantıdır, kamçı daha uzun ve az sayıdadır. Yalancı ayak kalıcı bir organel değil, sitoplazmanın geçici uzantısıdır.`,
    `Yalancı ayak ${listTr(pseudopodRows.map(({ name }) => name.toLocaleLowerCase("tr-TR")))} satırlarında görülür. ${slime.name} için bu yapı “${slime.movement}” diye yazıldı; yapı yaşam döngüsünün evresine göre değişir. Fotosentez yapan tek örnek ${euglena.name.toLocaleLowerCase("tr-TR")}dır: ${euglena.special} taşır, beslenme sütununda “${euglena.nutrition}” yazar. Parazit olan tek örnek ${plasmodium.name}’dur; satırında “${plasmodium.special}” yazar.`,
    `Satırlar “hepsinde” ve “bazısında” sorularını ayırmayı öğretir. Hücre tipi bütün satırlarda aynıdır. Hareket organeli ${plasmodium.name} satırında “${plasmodium.movement}” olduğundan herkes için ortak değildir. Fotosentez yalnız bir satırda vardır, yani “hiçbiri fotosentez yapmaz” da yanlıştır. Bir bilinmeyen için önce hareket yapısına, sonra beslenmeye bak. Aynı yapıyı taşıyan iki satır kalırsa ek veri iste.`,
  ],
  table: protistTable,
};

export const protistExamples211: WorkedExample[] = [
  {
    title: "Yalancı ayaklı bilinmeyen iki aday bırakır",
    prompt: `L adlı ökaryot hücre, sitoplazmasından geçici uzantılar çıkararak yer değiştiriyor ve büyük parçacıkları bu uzantılarla sararak hücre içine alıyor. Kloroplast görülmüyor. Bu bölümdeki tabloya göre L hangi örneklerle uyumludur? Kesin seçim için hangi ek bilgi gerekir?`,
    strategy: "Önce hareket yapısı sütununu, sonra beslenme sütununu uygula. Her adımda kalan satırları say.",
    steps: [
      { label: "Hareket yapısı", expression: `yalancı ayak → ${listTr(pseudopodRows.map(({ name }) => name))}`, explanation: "Geçici sitoplazma uzantısı yalancı ayaktır. Sil, kamçı ve hareket organeli olmayan satırlar elenir." },
      { label: "Beslenme", expression: `${amoeba.nutrition} = ${slime.nutrition}`, explanation: "Parçacığı zarla sarıp içeri almak fagositozdur. İki satırın beslenme sütunu aynı olduğu için ikisi de kalır." },
      { label: "Ek veri", expression: `${slime.special}`, explanation: "Cıvık mantar yaşam döngüsünde farklı evreler gösterir. L’nin bütün yaşam döngüsü izlenirse karar verilebilir." },
    ],
    answer: `${listTr(pseudopodRows.map(({ name }) => name))}. Kesin seçim için yaşam döngüsünün evreleri gerekir.`,
    check: `Kloroplast yokluğu ${euglena.name.toLocaleLowerCase("tr-TR")} satırını zaten elemişti. Kalan iki satırın ortak sütunları adayları ayırmaz.`,
    pitfall: "İlk eşleşen satırı cevap sanmak. Aynı yapıyı taşıyan başka satır kaldıysa tek bir ad uydurma, ek veri iste.",
  },
  {
    title: "Beş protist için kesin ortak olanı seç",
    prompt: `${listTr(protistRows211.map(({ name }) => name))} bu bölümdeki tabloyla karşılaştırılıyor. Hangileri kesinlikle doğrudur? ${protistStatements211.map(({ text }, i) => `${roman[i]}. ${text}`).join(" ")}`,
    strategy: "“Hepsi” ve “hiçbiri” öncüllerini çürütmek için tek bir karşı örnek yeter. Her öncül için tabloda karşı örnek ara.",
    steps: [
      { label: "Öncül I", expression: `${protistRows211.length} satırda ökaryot`, explanation: "Hepsi zarla çevrili çekirdek taşır. Karşı örnek yok, öncül doğru." },
      { label: "Öncül II", expression: `${plasmodium.name}: ${plasmodium.movement}`, explanation: "Hareket organeli olmayan evreler gösteren bir satır vardır. Öncül yanlış." },
      { label: "Öncül III", expression: `${euglena.name}: ${euglena.special}`, explanation: "Öglena ışıkta fotosentez yapar. “Hiçbiri” öncülü yanlış." },
    ],
    answer: `Yalnız ${protistTrue.join("")}.`,
    check: "Her yanlış öncül için karşı örneğin satırını gösterebiliyorsun: II için Plasmodium, III için öglena.",
    pitfall: "Çoğunluğa bakıp genelleme yapmak. Satırların çoğunda fotosentez olmaması “hiçbiri” demek değildir.",
  },
];

export const protistSupplement211 = {
  title: protistSection211.title,
  figureTitle: protistSection211.title,
  paragraphs: protistSection211.paragraphs,
  summary: `Hepsi ökaryot. Hareket: ${protistRows211.map(({ name, movement }) => `${name} ${movement}`).join(", ")}. Fotosentez yalnız ${euglena.name.toLocaleLowerCase("tr-TR")}; parazit yalnız ${plasmodium.name}. ${paramecium.name}: ${paramecium.special}.`,
  appendSection: true as const,
  table: protistTable,
  examples: protistExamples211,
};

/* ---------- Mantarlar: hif, üreme ve rol ---------- */

export interface FungusRow211 {
  name: string;
  body: "tek hücreli" | "çok hücreli";
  mycelium: boolean;
  hypha: string;
  reproduction: string;
  role: string;
  wall: string;
  nutrition: string;
}
export const fungusRows211: readonly FungusRow211[] = [
  { name: "Maya", body: "tek hücreli", mycelium: false, hypha: "tipik hif ağı yok", reproduction: "tomurcuklanma", role: "ekmek hamurunda CO₂ (fermantasyon)", wall: "kitin", nutrition: "emilimle heterotrof" },
  { name: "Ekmek küfü", body: "çok hücreli", mycelium: true, hypha: "dallanan hiflerden miselyum", reproduction: "spor", role: "ölü organik maddeyi ayrıştırır, gıdayı bozar", wall: "kitin", nutrition: "emilimle heterotrof" },
  { name: "Kültür mantarı", body: "çok hücreli", mycelium: true, hypha: "toprakta miselyum, üstte şapka", reproduction: "şapkada spor", role: "ölü organik maddeyi ayrıştırır, besin olur", wall: "kitin", nutrition: "emilimle heterotrof" },
  { name: "Mikoriza mantarı", body: "çok hücreli", mycelium: true, hypha: "kök çevresinde geniş hif ağı", reproduction: "spor", role: "bitkiye su ve mineral, kendine organik karbon", wall: "kitin", nutrition: "emilimle heterotrof" },
];
export const fungusColumns211 = ["Örnek", "Hücre düzeni", "Hif ve miselyum", "Üreme", "Rol"] as const;
const fRow = (name: string) => fungusRows211.find((row) => row.name === name)!;
const [yeast, mould, mushroom, mycorrhiza] = ["Maya", "Ekmek küfü", "Kültür mantarı", "Mikoriza mantarı"].map(fRow);
const commonWall = [...new Set(fungusRows211.map(({ wall }) => wall))];
const commonNutrition = [...new Set(fungusRows211.map(({ nutrition }) => nutrition))];
const myceliumRows = fungusRows211.filter(({ mycelium }) => mycelium);
const sporeRows = fungusRows211.filter(({ reproduction }) => reproduction.includes("spor"));
ensure(fungusRows211.length === 4, "örnek başlığı dört mantar söyler");
ensure(commonWall.length === 1 && commonNutrition.length === 1, "duvar ve beslenme dört satırda ortak olmalı");
ensure(fungusRows211.filter(({ body }) => body === "tek hücreli").length === 1 && !yeast.mycelium, "tek hücreli örnek maya, miselyumsuz olmalı");
ensure(myceliumRows.every(({ body }) => body === "çok hücreli"), "miselyumlu satırlar çok hücreli olmalı");
/** Verilen gözlemlerle uyumlu mantar satırları. */
export const matchFungi211 = (q: { body?: FungusRow211["body"]; reproduction?: string }) =>
  fungusRows211.filter((row) => (q.body === undefined || row.body === q.body) && (q.reproduction === undefined || row.reproduction.includes(q.reproduction)));
const yeastMatch = matchFungi211({ body: "tek hücreli", reproduction: "tomurcuk" });
ensure(yeastMatch.length === 1 && yeastMatch[0] === yeast, "tomurcuklanan tek hücreli örnek maya olmalı");
export const fungusStatements211 = [
  { text: `Hepsinin hücre duvarında ${commonWall[0]} bulunur.`, holds: commonWall.length === 1 },
  { text: "Hepsi miselyum oluşturur.", holds: fungusRows211.every(({ mycelium }) => mycelium) },
  { text: "Hepsi besinini emilimle alan heterotroftur.", holds: commonNutrition.length === 1 && commonNutrition[0] === "emilimle heterotrof" },
];
const fungusTrue = fungusStatements211.flatMap(({ holds }, i) => (holds ? [roman[i]] : []));
ensure(fungusTrue.join() === "I,III", "I ve III doğru, II yanlış olmalı");

const fungusTable = {
  layout: "table" as const,
  headers: [...fungusColumns211],
  rows: fungusRows211.map(({ name, body, hypha, reproduction, role }) => [name, body, hypha, reproduction, role]),
};

export const fungusSection211: GuideSection = {
  title: "Maya, küf, şapkalı ve mikoriza mantarını karşılaştır",
  paragraphs: [
    `Tablodaki ${fungusRows211.length} örneğin hepsi ökaryottur. Hepsinin hücre duvarında ${commonWall[0]} vardır ve hepsi ${commonNutrition[0]}tur: besini dışarıda enzimle parçalar, küçük ürünleri emer. Bu iki ortak özellik tabloda ayrı sütun olarak yazılmadı, çünkü satırları ayırmaz. Satırları hücre düzeni, hif, üreme ve rol sütunları ayırır.`,
    `Hif ipliksi mantar yapısıdır; dallanan hiflerin kurduğu ağa miselyum denir. ${upperFirst(listTr(myceliumRows.map(({ name }) => name.toLocaleLowerCase("tr-TR"))))} miselyum kurar. ${yeast.name} ${yeast.body}dir, satırında “${yeast.hypha}” yazar ve ${yeast.reproduction} ile çoğalır. ${mushroom.name} satırında görünen şapka üreme gövdesidir; miselyum toprağın içindedir. Spor ${listTr(sporeRows.map(({ name }) => name.toLocaleLowerCase("tr-TR")))} satırlarında üreme birimidir. Spor tohum değildir, embriyo taşımaz.`,
    `Rol sütunu aynı âlemde farklı etkileşimleri gösterir. ${mould.name} ve ${mushroom.name.toLocaleLowerCase("tr-TR")} ölü organik maddeyi ayrıştırır. ${mycorrhiza.name} canlı bir bitkiyle ilişki kurar: ${mycorrhiza.role}. ${yeast.name} satırındaki rol: ${yeast.role}. Bir mantarın rolünü âlem adından değil, hangi kaynağı nasıl kullandığından çıkar.`,
  ],
  table: fungusTable,
};

export const fungusExamples211: WorkedExample[] = [
  {
    title: "Tomurcuklanan tek hücreliyi yerleştir",
    prompt: "Şekerli bir çözeltide çoğalan M canlısının hücreleri çekirdekli ve duvarlarında kitin var. Kloroplast yok. Mikroskopta tek tek duran yuvarlak hücreler ve bazılarının yanında küçük çıkıntılar görülüyor; hif ağı görülmüyor. Kaptan CO₂ çıkıyor. Bu bölümdeki tabloya göre M hangi örnekle uyumludur? M neden Bitkiler âlemine konmaz?",
    strategy: "Ortak sütunlarla âlemi, ayırıcı sütunlarla örneği seç. Hücre düzeni ve üreme biçimi satırları ayırır.",
    steps: [
      { label: "Âlem", expression: `${commonWall[0]} + kloroplast yok → mantar`, explanation: "Kitinli duvar ve kloroplastsız heterotrof beslenme tablonun bütün satırlarında ortaktır. Bitki duvarı selülozludur." },
      { label: "Hücre düzeni", expression: `tek hücreli → ${matchFungi211({ body: "tek hücreli" }).map(({ name }) => name).join("")}`, explanation: "Hif ağı görülmeyen tek hücreler yalnız bir satırla eşleşir." },
      { label: "Üreme", expression: `küçük çıkıntı = ${yeast.reproduction}`, explanation: "Hücrenin yanında büyüyen çıkıntı tomurcuktur. Maya satırının üreme sütunuyla uyumludur." },
      { label: "CO₂", expression: yeast.role, explanation: "Şekerden CO₂ çıkması mayanın fermantasyonuyla uyumludur; tek başına mantar kanıtı sayılmaz." },
    ],
    answer: `${yeastMatch[0].name}. Duvar kitinlidir ve kloroplast yoktur; bitki hücresi selülozlu duvar ve fotosentez gösterirdi.`,
    check: "Diğer üç satır çok hücrelidir ve miselyum kurar; tek hücreli, hifsiz gözlemle çelişirler.",
    pitfall: "Fermantasyon ya da CO₂ çıkışını tek başına maya kanıtı saymak. Bakteriler de fermantasyon yapabilir; karar hücre ve üreme sütunlarıyla verilir.",
  },
  {
    title: "Dört mantar için kesin olanı seç",
    prompt: `${listTr(fungusRows211.map(({ name }) => name))} bu bölümdeki tabloyla karşılaştırılıyor. Hangileri kesinlikle doğrudur? ${fungusStatements211.map(({ text }, i) => `${roman[i]}. ${text}`).join(" ")}`,
    strategy: "Her öncül için dört satırın tamamına bak. Tek bir karşı örnek “hepsi” öncülünü çürütür.",
    steps: [
      { label: "Öncül I", expression: `${fungusRows211.length} satırda duvar: ${commonWall[0]}`, explanation: "Bütün örneklerin hücre duvarında kitin vardır. Öncül doğru." },
      { label: "Öncül II", expression: `${yeast.name}: ${yeast.hypha}`, explanation: "Maya tek hücrelidir ve tipik hif ağı kurmaz. Öncül yanlış." },
      { label: "Öncül III", expression: `${fungusRows211.length} satırda: ${commonNutrition[0]}`, explanation: "Hiçbiri kloroplastla fotosentez yapmaz; hepsi dışarıda parçalanan besini emer. Öncül doğru." },
    ],
    answer: `${fungusTrue.join(" ve ")}.`,
    check: "Mikoriza mantarı bitkiden organik karbon alır; bu da emilimle heterotrof beslenmedir, öncül III bozulmaz.",
    pitfall: "Şapkalı mantar ve küf örneklerine bakıp her mantarın miselyum kurduğunu sanmak. Maya bu genellemenin karşı örneğidir.",
  },
];

export const fungusSupplement211 = {
  title: fungusSection211.title,
  figureTitle: fungusSection211.title,
  paragraphs: fungusSection211.paragraphs,
  summary: `Dördünde ortak: duvarda ${commonWall[0]}, ${commonNutrition[0]}. ${yeast.name} ${yeast.body}, ${yeast.reproduction}; miselyum: ${listTr(myceliumRows.map(({ name }) => name.toLocaleLowerCase("tr-TR")))}. Şapka üreme gövdesidir. ${mycorrhiza.name}: ${mycorrhiza.role}.`,
  appendSection: true as const,
  table: fungusTable,
  examples: fungusExamples211,
};

/* ---------- Bitkiler: damar, tohum ve meyve anahtarı ---------- */

export interface PlantRow211 {
  group: string;
  example: string;
  vascular: boolean;
  organs: boolean;
  seed: boolean;
  fruit: boolean;
  organsText: string;
  seedText: string;
}
export const plantRows211: readonly PlantRow211[] = [
  { group: "Damarsız tohumsuz", example: "Kara yosunu", vascular: false, organs: false, seed: false, fruit: false, organsText: "yok, rizoid var", seedText: "yok, sporla yayılır" },
  { group: "Damarlı tohumsuz", example: "Eğrelti", vascular: true, organs: true, seed: false, fruit: false, organsText: "var", seedText: "yok, sporla yayılır" },
  { group: "Açık tohumlu", example: "Çam", vascular: true, organs: true, seed: true, fruit: false, organsText: "var", seedText: "var, kozalakta açıkta" },
  { group: "Kapalı tohumlu", example: "Elma", vascular: true, organs: true, seed: true, fruit: true, organsText: "var", seedText: "var, meyve içinde" },
];
export const plantColumns211 = ["Grup (örnek)", "İletim dokusu", "Gerçek kök, gövde, yaprak", "Tohum", "Meyve"] as const;
export type PlantKey211 = "vascular" | "organs" | "seed" | "fruit";
export const plantKeys211: readonly { key: PlantKey211; header: string; question: string }[] = [
  { key: "vascular", header: plantColumns211[1], question: `${plantColumns211[1]} var mı?` },
  { key: "organs", header: plantColumns211[2], question: `${plantColumns211[2]} var mı?` },
  { key: "seed", header: plantColumns211[3], question: `${plantColumns211[3]} var mı?` },
  { key: "fruit", header: plantColumns211[4], question: `${plantColumns211[4]} var mı?` },
];
const yesNo = (b: boolean) => (b ? "var" : "yok");
const separates = (keys: readonly PlantKey211[]) =>
  new Set(plantRows211.map((row) => keys.map((k) => row[k]).join("|"))).size === plantRows211.length;
/** Dört grubu ayıran en küçük sütun kümeleri (kaba kuvvetle). */
export const minimalPlantKeys211 = () => {
  const all = plantKeys211.map(({ key }) => key);
  const subsets: PlantKey211[][] = [];
  for (let mask = 1; mask < 1 << all.length; mask++) subsets.push(all.filter((_, i) => mask & (1 << i)));
  const working = subsets.filter(separates);
  const best = Math.min(...working.map((s) => s.length));
  return working.filter((s) => s.length === best);
};
const minimalKeys = minimalPlantKeys211();
const keyOrder = minimalKeys.find((s) => s.join() === "vascular,seed,fruit")!;
/** Anahtar adımları: her soruda “hayır” cevabıyla tek grup ayrılır. */
export const plantKeySteps211 = keyOrder.map((key, i) => {
  const before = plantRows211.filter((row) => keyOrder.slice(0, i).every((k) => row[k]));
  const no = before.filter((row) => !row[key]);
  const yes = before.filter((row) => row[key]);
  return { key, question: plantKeys211.find((k) => k.key === key)!.question, no, yes };
});
const pRowP = (example: string) => plantRows211.find((row) => row.example === example)!;
const [moss, fern, pine, apple] = ["Kara yosunu", "Eğrelti", "Çam", "Elma"].map(pRowP);
ensure(plantRows211.length === 4, "başlık ve örnekler dört grup söyler");
ensure(plantRows211.every((row) => row.vascular === row.organs), "gerçek organ sütunu iletim dokusu sütunuyla aynı bilgiyi taşımalı");
ensure(plantRows211.every((row) => (!row.seed || row.vascular) && (!row.fruit || row.seed)), "tohum damarı, meyve tohumu gerektirmeli");
ensure(plantRows211.some((row) => row.vascular && !row.seed), "damarlı tohumsuz örnek bulunmalı (damar varsa tohum vardır geçersiz)");
ensure(minimalKeys.every((s) => s.length === 3 && s.includes("seed") && s.includes("fruit")) && minimalKeys.length === 2 && !!keyOrder, "en az üç sütun gerekmeli, ikisi tohum ve meyve");
ensure(plantKeySteps211.every(({ no }) => no.length === 1) && plantKeySteps211.at(-1)!.yes.length === 1, "her soru tek grup ayırmalı");
const seedRows = plantRows211.filter(({ seed }) => seed);
export const plantStatements211 = [
  { text: "Q’da iletim dokusu vardır.", holds: seedRows.every(({ vascular }) => vascular) },
  { text: "Q meyve oluşturur.", holds: seedRows.every(({ fruit }) => fruit) },
  { text: "Q’nun gerçek kökü vardır.", holds: seedRows.every(({ organs }) => organs) },
];
const plantTrue = plantStatements211.flatMap(({ holds }, i) => (holds ? [roman[i]] : []));
ensure(plantTrue.join() === "I,III", "tohumlu satırlar için I ve III doğru olmalı");

const plantTable = {
  layout: "table" as const,
  headers: [...plantColumns211],
  rows: plantRows211.map((row) => [`${row.group} (${row.example.toLocaleLowerCase("tr-TR")})`, yesNo(row.vascular), row.organsText, row.seedText, yesNo(row.fruit)]),
};
const pairNames = (keys: readonly PlantKey211[]) => keys.map((k) => plantKeys211.find((x) => x.key === k)!.header.toLocaleLowerCase("tr-TR"));

export const plantSection211: GuideSection = {
  title: "Damar, tohum ve meyveyle dört grubu ayır",
  paragraphs: [
    `Tabloda ${plantRows211.length} öğretici grup aynı ${plantKeys211.length} sütunla yazıldı: ${listTr(plantRows211.map(({ group, example }) => `${group.toLocaleLowerCase("tr-TR")} (${example.toLocaleLowerCase("tr-TR")})`))}. İletim dokusu su, mineral ve organik maddeyi organlar arasında taşır. ${moss.example} damarsızdır; tutunmayı rizoidler sağlar, gerçek kökü yoktur. Diğer üç grupta iletim dokusu ve gerçek kök, gövde, yaprak birlikte bulunur; bu yüzden iki sütun aynı bilgiyi verir.`,
    `Tohum sütunu damarlıları ikiye böler. ${fern.example} damarlıdır ama tohum oluşturmaz, ${moss.example.toLocaleLowerCase("tr-TR")} gibi sporla çoğalır. Bu satır “damar varsa tohum vardır” kısa yolunun karşı örneğidir. ${pine.example} ve ${apple.example.toLocaleLowerCase("tr-TR")} tohumludur. Tohumun yeri ikisini ayırır: ${pine.example.toLocaleLowerCase("tr-TR")} için “${pine.seedText}”, ${apple.example.toLocaleLowerCase("tr-TR")} için “${apple.seedText}”. Meyve yalnız kapalı tohumlu satırında vardır; çiçeğin yumurtalığından gelişir.`,
    `Dört grubu ayırmak için en az ${minimalKeys[0].length} sütun gerekir. İşe yarayan ${minimalKeys.length} küme vardır ve ikisi de ${listTr(pairNames(["seed", "fruit"]))} sütunlarını içerir. Üçüncü sütun iletim dokusu ya da onunla aynı bilgiyi veren gerçek organ sütunudur. Hangi iki sütunu seçersen seç, en az iki grup aynı satırda kalır. Anahtarı şu sırayla kur: ${plantKeySteps211.map(({ question, no }) => `${question} Hayırsa ${no[0].example.toLocaleLowerCase("tr-TR")}.`).join(" ")} Evetse ${plantKeySteps211.at(-1)!.yes[0].example.toLocaleLowerCase("tr-TR")}.`,
  ],
  table: plantTable,
};

export const plantExamples211: WorkedExample[] = [
  {
    title: "Dört grubu ayırmak için kaç soru gerekir?",
    prompt: `Bir öğrenci bilinmeyen bir bitkinin ${listTr(plantRows211.map(({ group }) => group.toLocaleLowerCase("tr-TR")))} gruplarından hangisinde olduğunu bulmak istiyor. Her soru tablonun bir sütununa “var mı?” diye soruluyor: ${listTr(plantKeys211.map(({ header }) => `“${header}”`))}. Grubu her durumda kesin belirlemek için en az kaç sütun sorulmalıdır?`,
    strategy: "Önce aynı bilgiyi veren sütunları birleştir, sonra iki sütunun bütün çiftlerini dene. Her çift için dört grubun cevap dizilerini yaz; iki grup aynı diziyi veriyorsa o çift yetmez.",
    steps: [
      { label: "Aynı sütunlar", expression: "iletim dokusu = gerçek kök, gövde, yaprak", explanation: "Her satırda iki sütunun cevabı aynıdır. İkisini birlikte sormak yeni bilgi vermez." },
      { label: "İletim + tohum", expression: `${pine.example} (var, var) = ${apple.example} (var, var)`, explanation: "Açık ve kapalı tohumlu ayrılmaz." },
      { label: "İletim + meyve", expression: `${fern.example} (var, yok) = ${pine.example} (var, yok)`, explanation: "Eğrelti ve çam ayrılmaz." },
      { label: "Tohum + meyve", expression: `${moss.example} (yok, yok) = ${fern.example} (yok, yok)`, explanation: "Damarsız ve damarlı tohumsuz ayrılmaz." },
      { label: "Üç sütun", expression: "iletim → tohum → meyve", explanation: "Her soruda “hayır” cevabı tek grubu ayırır; son sorudaki “evet” kapalı tohumluyu verir." },
    ],
    answer: `En az ${minimalKeys[0].length} sütun: iletim dokusu (ya da gerçek kök), tohum ve meyve.`,
    check: `Dört grubun üç sütunlu cevap dizileri farklıdır: ${plantRows211.map((row) => `(${keyOrder.map((k) => yesNo(row[k])).join(", ")})`).join(", ")}.`,
    pitfall: "Gerçek kök sütununu iletim dokusundan ayrı bir bilgi saymak. Bu dört grupta iki sütun aynı cevabı verir.",
  },
  {
    title: "Tohumlu bir bitki için kesin olanı seç",
    prompt: `Q bitkisinin tohum oluşturduğu biliniyor; bu bölümdeki dört gruptan biridir. Hangileri kesinlikle doğrudur? ${plantStatements211.map(({ text }, i) => `${roman[i]}. ${text}`).join(" ")}`,
    strategy: "Tohum sütununda “var” yazan satırları aday olarak al. Bir öncül bütün adaylarda sağlanıyorsa kesindir.",
    steps: [
      { label: "Adaylar", expression: `tohum var → ${listTr(seedRows.map(({ example }) => example))}`, explanation: "Tohumsuz iki grup elenir." },
      { label: "Öncül I", expression: `iletim dokusu: ${seedRows.map(({ vascular }) => yesNo(vascular)).join(", ")}`, explanation: "İki adayda da iletim dokusu vardır. Öncül doğru." },
      { label: "Öncül II", expression: `meyve: ${seedRows.map(({ fruit }) => yesNo(fruit)).join(", ")}`, explanation: "Çam tohumludur ama meyve oluşturmaz. Öncül kesin değil." },
      { label: "Öncül III", expression: `gerçek kök: ${seedRows.map(({ organsText }) => organsText).join(", ")}`, explanation: "İki adayda da gerçek kök vardır. Öncül doğru." },
    ],
    answer: `${plantTrue.join(" ve ")}.`,
    check: "Q çam olsaydı öncül II bozulurdu; elma olsaydı üç öncül de sağlanırdı. Kesin olan, iki adayda da sağlanandır.",
    pitfall: "“Tohumlu” sözcüğünü “meyveli” sanmak. Açık tohumlularda tohum vardır, meyve yoktur.",
  },
];

export const plantSupplement211 = {
  title: plantSection211.title,
  figureTitle: plantSection211.title,
  paragraphs: plantSection211.paragraphs,
  summary: `${plantKeySteps211.map(({ question, no }) => `${question} Hayır → ${no[0].example.toLocaleLowerCase("tr-TR")}.`).join(" ")} Evet → ${apple.example.toLocaleLowerCase("tr-TR")}. Damar var, tohum yok: ${fern.example.toLocaleLowerCase("tr-TR")}. Tohum var, meyve yok: ${pine.example.toLocaleLowerCase("tr-TR")}. En az ${minimalKeys[0].length} sütun gerekir.`,
  appendSection: true as const,
  table: plantTable,
  examples: plantExamples211,
};

export const depth211Supplements = {
  "canlilarin-siniflandirilmasi": [kingdomSupplement211],
  "bakteri-ve-arke": [prokaryoteSupplement211],
  protista: [protistSupplement211],
  mantarlar: [fungusSupplement211],
  bitkiler: [plantSupplement211],
};
