import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Tarih derinleştirmesi (0.232): klasik çağda Osmanlı toplum düzeni,
 * değişen dünya dengeleri, değişim çağında Avrupa ve Osmanlı, devrimler
 * çağında devlet ve toplum, uluslararası ilişkilerde denge stratejisi.
 * Kabul edilmiş rehberler değişmez; tablo bölümü, iki özgün çözümlü örnek
 * ve bölüm çizimi görüntüleme katmanında eklenir. Bütün yıllar tek tarih
 * sabitinden gelir ve her biri ilgili dersin kendi metninde geçer; tarihi
 * verilmeyen gelişmeye yıl eklenmez, yalnız dersin verdiği önce–sonra
 * bilgisiyle sıralanır. Sınıflamalar (aday kurum, toprak yönü, meclis
 * durumu, destek/karşı rolü) veri satırlarından kuralla çıkar. Paragraflar,
 * tablo hücreleri, çizim okumaları ve Kopya Kâğıdı özetleri aynı verilerden
 * yazılır; metindeki genel yargıları modül yüklenirken korumalar denetler.
 * Siyasi yorum ve kişiler hakkında değerlendirme yoktur.
 */

const guard = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depth232: veri bu yargıyı artık desteklemiyor: ${claim}`);
};
const list = (xs: readonly (string | number)[]) => xs.join(", ");
const and = (xs: readonly string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} ve ${xs[xs.length - 1]}`);
const lowerFirst = (s: string) => s.charAt(0).toLocaleLowerCase("tr-TR") + s.slice(1);

/* ======================================================================
 * Tek tarih sabiti
 * ==================================================================== */

/**
 * Bu turda kullanılan bütün yıllar (MS). Her yıl, yanındaki dersin metninde
 * geçer: degisen-dunya-dengeleri-osmanli (1606 Zitvatorok … 1774 Küçük
 * Kaynarca), degisim-caginda-avrupa-osmanli (1695 malikâne, 1718 Pasarofça
 * sonrası, 1727 matbaa, 1730 Patrona Halil), devrimler-caginda-devlet-toplum
 * (1807 … 1909), denge-stratejisi (1774 … 1882). klasik-cag-osmanli-toplum-
 * duzeni hiç yıl vermez; o bölümde yıl kullanılmaz.
 */
export const HISTORY_DATES232 = {
  // değişen dünya dengeleri
  zitvatorok: 1606,
  kasriSirin: 1639,
  karlofca: 1699,
  istanbul1700: 1700,
  prut: 1711,
  pasarofca: 1718,
  belgrad: 1739,
  kucukKaynarca: 1774,
  // değişim çağında Avrupa ve Osmanlı
  malikane: 1695,
  laleStart: 1718,
  matbaa: 1727,
  laleEnd: 1730,
  // devrimler çağında devlet ve toplum
  kabakci: 1807,
  senedIttifak: 1808,
  yeniceriKaldirildi: 1826,
  tanzimat: 1839,
  islahat: 1856,
  kanunEsasi: 1876,
  meclisTatil: 1878,
  mesrutiyet2: 1908,
  degisiklik1909: 1909,
  // denge stratejisi
  kirimBagimsiz: 1774,
  kirimIlhak: 1783,
  yas: 1792,
  misirIsgal: 1798,
  sirpIsyan: 1804,
  bukres: 1812,
  navarin: 1827,
  edirne: 1829,
  hunkarIskelesi: 1833,
  sinop: 1853,
  kirimSavasiGiris: 1854,
  paris: 1856,
  berlin: 1878,
  tunus: 1881,
  misirIngiliz: 1882,
} as const;
export type DateKey232 = keyof typeof HISTORY_DATES232;
const D = HISTORY_DATES232;

/* =================================================================
 * 1 · Klasik çağda toplum düzeni: kurum haritası (yıl yok)
 * ================================================================= */

export type Concept232 = "Mirî arazi" | "Çift-hane" | "Tımar" | "Lonca" | "Narh" | "Vakıf" | "Vakfiye" | "İstimâlet";
export type Field232 = "Toprak hukuku" | "Taşra üretimi" | "Taşra geliri ve hizmet" | "Şehir meslek düzeni" | "Şehir piyasası" | "Sürekli hizmet" | "Fethedilen yerler";
export interface Institution232 {
  name: Concept232;
  mechanism: string;
  actors: string;
  field: Field232;
  /** Dersin bu kavramla karıştırılmamasını istediği kavram. */
  distinct: string;
  /** Ayrı tutulacak kavram tabloda bir satırsa onun adı. */
  distinctIn: Concept232 | null;
}
export const institutions232: readonly Institution232[] = [
  { name: "Mirî arazi", mechanism: "Çıplak mülkiyet devlette; belirli şartlarla üreticiye kullanım hakkı", actors: "Devlet (mülkiyet), köylü (kullanım)", field: "Toprak hukuku", distinct: "Mülk arazi (özel mülkiyet)", distinctIn: null },
  { name: "Çift-hane", mechanism: "Aile emeği, bir çift öküz ve işlenen arazi bir üretim ve vergilendirme birimi", actors: "Köylü hanesi; tahrir kayıtları izler", field: "Taşra üretimi", distinct: "Tımar", distinctIn: "Tımar" },
  { name: "Tımar", mechanism: "Belirli vergi gelirleri hizmet ve asker yetiştirme karşılığında sipahiye", actors: "Sipahi (gelir ve hizmet)", field: "Taşra geliri ve hizmet", distinct: "Mirî arazi (sipahinin geliri mülkiyet değildir)", distinctIn: "Mirî arazi" },
  { name: "Lonca", mechanism: "Aynı meslek kolundaki esnafın örgütü: hammadde, üretim miktarı, ürün standardı, meslek eğitimi", actors: "Çırak, kalfa, usta; kethüda, yiğitbaşı", field: "Şehir meslek düzeni", distinct: "Vakıf (yardımlaşma ortak olabilir)", distinctIn: "Vakıf" },
  { name: "Narh", mechanism: "Belirli mal veya hizmet için fiyatın ya da fiyat sınırının denetlenmesi", actors: "Lonca ve kamu otoritesi (iaşecilik)", field: "Şehir piyasası", distinct: "Lonca (narh loncanın tamamı değildir)", distinctIn: "Lonca" },
  { name: "Vakıf", mechanism: "Mal veya gelirin hayır ve kamu yararı hizmetinin sürekliliğine tahsisi", actors: "Vakfeden (kurucu), mütevelli (yönetici)", field: "Sürekli hizmet", distinct: "Vakfiye (belge)", distinctIn: "Vakfiye" },
  { name: "Vakfiye", mechanism: "Vakfın amacını, malını, işleyiş şartlarını ve yönetimini belirleyen belge", actors: "Şartları yazılı belge", field: "Sürekli hizmet", distinct: "Vakıf (kurum)", distinctIn: "Vakıf" },
  { name: "İstimâlet", mechanism: "Yeni yönetimle halk arasında güven ve bağlılık oluşturma siyaseti", actors: "Yeni yönetim ve fethedilen yerin halkı", field: "Fethedilen yerler", distinct: "Zorla aynı dine geçirme", distinctIn: null },
];
const inst = (n: Concept232) => institutions232.find((i) => i.name === n)!;

/** Kayıttaki ipucundan aday kavramlara: dersin kendi tanımlarındaki anahtar sözler. */
export const CLUES232: Record<string, readonly Concept232[]> = {
  "çıplak mülkiyet": ["Mirî arazi"],
  "kullanım hakkı": ["Mirî arazi"],
  "çift öküz": ["Çift-hane"],
  "aile emeği": ["Çift-hane"],
  "vergi geliri": ["Tımar"],
  "asker yetiştirme": ["Tımar"],
  çırak: ["Lonca"],
  "ürün standardı": ["Lonca", "Narh"],
  "fiyat sınırı": ["Narh"],
  yardım: ["Lonca", "Vakıf"],
  tahsis: ["Vakıf"],
  "şartları yazan belge": ["Vakfiye"],
  "güven ve bağlılık": ["İstimâlet"],
};
export type Clue232 = keyof typeof CLUES232;
/** Verilen her ipucu aday listesini daraltır; verilmeyen ipucu eleme yapmaz. */
export const conceptCandidates232 = (clues: readonly string[]) =>
  institutions232.filter((i) => clues.every((c) => (CLUES232[c] ?? []).includes(i.name))).map((i) => i.name);

const instTable = {
  layout: "table" as const,
  headers: ["Kavram", "Ana mekanizma", "Aktör veya araç", "Alan", "Ayrı tutulacak kavram"],
  rows: institutions232.map((i) => [i.name, i.mechanism, i.actors, i.field, i.distinct]),
};
const ambiguousClues = Object.entries(CLUES232).filter(([, c]) => c.length > 1).map(([k]) => k);
const linkedPairs = institutions232.filter((i) => i.distinctIn !== null);

guard(institutions232.every((i) => Object.values(CLUES232).some((cs) => cs.includes(i.name))), "her kavramın en az bir ipucu vardır");
guard(Object.values(CLUES232).every((cs) => cs.every((c) => institutions232.some((i) => i.name === c))), "her ipucu tablodaki bir kavrama gider");
guard(ambiguousClues.includes("yardım") && CLUES232["yardım"].length === 2, "yardım ipucu tek başına lonca ile vakfı ayırmaz");
guard(conceptCandidates232(["yardım", "ürün standardı"]).join() === "Lonca", "yardım ve ürün standardı birlikte loncayı seçer");
guard(inst("Çift-hane").distinctIn === "Tımar" && inst("Çift-hane").field !== inst("Tımar").field, "çift-hane ile tımar ilişkili ama ayrı mekanizmalardır");
guard(inst("Vakıf").distinctIn === "Vakfiye" && inst("Vakfiye").distinctIn === "Vakıf" && inst("Vakıf").field === inst("Vakfiye").field, "vakıf ile vakfiye aynı alanda, kurum ile belge olarak ayrıdır");
guard(institutions232.every((i) => i.distinctIn !== i.name), "hiçbir kavram kendisiyle karıştırılmaz");
guard(["Çift-hane", "Tımar"].every((n) => inst(n as Concept232).field.startsWith("Taşra")) && ["Lonca", "Narh"].every((n) => inst(n as Concept232).field.startsWith("Şehir"))
  && inst("Vakıf").field === "Sürekli hizmet" && inst("Vakfiye").field === "Sürekli hizmet" && inst("İstimâlet").field === "Fethedilen yerler", "paragraftaki taşra, şehir, sürekli hizmet ve fetih gruplaması alan sütunuyla aynıdır");

export const institutionSection232: GuideSection = {
  title: "Kurum haritası: mekanizma, aktör ve karıştırılan kavram",
  paragraphs: [
    `Tablodaki ${institutions232.length} kavramın her biri ayrı bir mekanizmayla tanınır. Taşrada ${lowerFirst(inst("Çift-hane").name)} üretim birimini, tımar hizmete bağlı vergi gelirini, mirî arazi ise mülkiyet ile kullanımın ayrılmasını anlatır. Şehirde lonca meslek düzenini, narh fiyat denetimini; vakıf ve vakfiye sürekli hizmet finansmanını anlatır. İstimâlet fethedilen yerlerde güven ve bağlılık siyasetidir.`,
    `Bir kaydı kavrama bağlamak için içindeki ipuçlarını tek tek uygula; her ipucu aday listesini daraltır. Bazı ipuçları iki kavrama birden uyar: ${list(ambiguousClues.map((c) => `“${c}” → ${and([...CLUES232[c]])}`))}. Yalnız “yardım” sözü loncayı vakıftan ayırmaz; buna ürün standardı veya çırak gibi bir meslek ipucu eklenince tek aday kalır.`,
    `Son sütun dersin özellikle ayrı tutulmasını istediği kavramı verir. Tablodaki ${linkedPairs.length} satırda bu kavram yine tabloda yer alır: ${list(linkedPairs.map((i) => `${i.name} – ${i.distinctIn}`))}. İlişkili iki kavram birbirinin tanımı değildir. Ders bu kavramlara yıl vermez; tablo da bir kronoloji değil, mekanizma haritasıdır.`,
  ],
  table: instTable,
};
guard(!/\b1[0-9]{3}\b/.test(JSON.stringify(institutionSection232)), "toplum düzeni bölümünde ders yıl vermediği için yıl kullanılmaz");

/* Örnek 1: üç kayıt, aday listeleri */
export const conceptRecords232 = [
  { id: "A", text: "Aile emeği ve bir çift öküzle işlenen arazi bir üretim ve vergi birimi sayılıyor.", clues: ["aile emeği", "çift öküz"] },
  { id: "B", text: "Hasta bir üyeye yardım ediliyor.", clues: ["yardım"] },
  { id: "C", text: "Hasta üyeye yardım eden örgüt, üyelerinin ürün standardını da denetliyor.", clues: ["yardım", "ürün standardı"] },
] as const;
export const conceptRecordAnswers232 = conceptRecords232.map((r) => ({ ...r, candidates: conceptCandidates232(r.clues) }));
const [cA, cB, cC] = conceptRecordAnswers232;
guard(cA.candidates.length === 1 && cB.candidates.length === 2 && cC.candidates.length === 1, "A ve C tek adaya iner, B iki aday bırakır");

/* Örnek 2: köyden şehre altı cümle, karıştırılan çiftler */
export const storySentences232 = [
  { text: "Köyde bir hane, bir çift öküz ve kendi emeğiyle tarlayı işliyor.", clue: "çift öküz" },
  { text: "Bu köyün belirli vergi geliri, atlı asker yetiştiren sipahiye bırakılmış.", clue: "vergi geliri" },
  { text: "Tarlanın çıplak mülkiyeti devlette.", clue: "çıplak mülkiyet" },
  { text: "Şehirde ayakkabıcıların örgütü çıraklarını kalfalığa hazırlıyor.", clue: "çırak" },
  { text: "Kamu otoritesi ekmek için fiyat sınırı koyuyor.", clue: "fiyat sınırı" },
  { text: "Bir dükkânın kirası sürekli olarak çeşme onarımına tahsis edilmiş.", clue: "tahsis" },
] as const;
export const storyConcepts232 = storySentences232.map((s) => {
  const c = conceptCandidates232([s.clue]);
  guard(c.length === 1, `öykü cümlesi tek kavrama gitmeli (${s.clue})`);
  return c[0];
});
export const storyPairs232 = institutions232.filter((i) => storyConcepts232.includes(i.name) && i.distinctIn !== null && storyConcepts232.includes(i.distinctIn));
export const storyMissing232 = institutions232.filter((i) => storyConcepts232.includes(i.name) && !storyPairs232.includes(i));
guard(new Set(storyConcepts232).size === storySentences232.length, "öyküdeki altı cümle altı farklı kavrama gider");

export const institutionExamples232: WorkedExample[] = [
  {
    title: "Üç kayıt, üç aday listesi",
    prompt: `Tablodaki ${institutions232.length} kavram aday listesidir. İpucu sözlüğü: ${Object.entries(CLUES232).map(([k, c]) => `“${k}” → ${c.join(" / ")}`).join("; ")}. Üç kurmaca kayıt veriliyor: ${conceptRecords232.map((r) => `${r.id}) ${r.text}`).join(" ")} Her kayıt hangi kavram veya kavramlarla uyumludur? Kayıtta geçmeyen ipucu eleme için kullanılmaz.`,
    strategy: "Kayıttaki her ipucunun aday kümesini yaz; kayıt, bütün kümelerin ortak elemanlarıyla uyumludur.",
    steps: [
      { label: "A kaydı", expression: `${cA.clues.map((c) => `${c} → ${CLUES232[c].join(", ")}`).join("; ")} ⇒ ${cA.candidates.join(", ")}`, explanation: "İki ipucu da aynı kavramı gösterir: üretim ve vergilendirme birimi." },
      { label: "B kaydı", expression: `yardım → ${cB.candidates.join(", ")}`, explanation: "Lonca sandığı da vakıf da yardım edebilir; tek ipucu iki adayı açık bırakır." },
      { label: "C kaydı", expression: `{${CLUES232["yardım"].join(", ")}} ∩ {${CLUES232["ürün standardı"].join(", ")}} = {${cC.candidates.join(", ")}}`, explanation: "İki belirsiz ipucunun ortak elemanı tektir." },
    ],
    answer: `A: ${cA.candidates.join(", ")}. B: kesin seçilemez; ${cB.candidates.length} aday kalır (${and(cB.candidates)}). C: ${cC.candidates.join(", ")}.`,
    check: `C kaydında her ipucunun iki adayı vardır, fakat ortak aday yalnız ${cC.candidates[0]}. B’de ikinci bir ipucu olmadığı için seçim yapılmaz.`,
    pitfall: "Yardım sözünü görünce hemen vakıf demek. Lonca sandıkları da üyelerine yardım eder; kurumu yardım değil, mekanizma ayırır.",
  },
  {
    title: "Köyden şehre altı cümle, ayrı tutulacak çiftler",
    prompt: `Altı cümle veriliyor: ${storySentences232.map((s, i) => `(${i + 1}) ${s.text}`).join(" ")} Her cümle tablodaki hangi kavramı anlatır? Tablonun “Ayrı tutulacak kavram” sütununa göre bu öyküde iki ucu da bulunan kaç çift vardır?`,
    strategy: "Önce her cümlenin ayırt edici ipucunu bul ve kavrama çevir. Sonra her kavramın ayrı tutulacak kavramı öyküde geçiyor mu, tek tek denetle.",
    steps: [
      { label: "Cümle → kavram", expression: storySentences232.map((s, i) => `(${i + 1}) ${s.clue} → ${storyConcepts232[i]}`).join("; "), explanation: "Her cümlede tek kavrama giden bir ipucu vardır." },
      { label: "Çiftleri tara", expression: storyPairs232.map((i) => `${i.name} – ${i.distinctIn}`).join("; "), explanation: "Bu çiftlerin iki ucu da öyküde geçer." },
      { label: "Dışarıda kalanlar", expression: storyMissing232.map((i) => `${i.name} – ${i.distinct}`).join("; "), explanation: "Bu satırların ayrı tutulacak kavramı öyküde yoktur." },
    ],
    answer: `${storyConcepts232.map((c, i) => `(${i + 1}) ${c}`).join(", ")}. Öyküde ${storyPairs232.length} çift vardır: ${list(storyPairs232.map((i) => `${i.name} – ${i.distinctIn}`))}.`,
    check: `Öyküdeki ${storyConcepts232.length} kavramdan ${storyPairs232.length} tanesinin eşi öyküde, ${storyMissing232.length} tanesinin eşi öykü dışında: ${storyPairs232.length} + ${storyMissing232.length} = ${storyConcepts232.length}.`,
    pitfall: "Aynı tarlada geçen çift-hane, tımar ve mirî araziyi tek kavram saymak. Biri üretim birimi, biri hizmete bağlı gelir, biri mülkiyet statüsüdür.",
  },
];

export const institutionSupplement232 = {
  title: institutionSection232.title,
  figureTitle: institutionSection232.title,
  paragraphs: institutionSection232.paragraphs,
  summary: `${institutions232.map((i) => `${i.name}: ${lowerFirst(i.mechanism.split(";")[0].split(":")[0])}`).join(". ")}. Belirsiz ipuçları: ${list(ambiguousClues)}. Ayrı tut: ${list(linkedPairs.map((i) => `${i.name} – ${i.distinctIn}`))}.`,
  appendSection: true as const,
  table: instTable,
  examples: institutionExamples232,
};

/* =================================================================
 * 2 · Değişen dünya dengeleri: antlaşma × taraf × madde × toprak yönü
 * ================================================================= */

export type ClauseKind232 = "toprak" | "statü" | "mali" | "sınır" | "ticaret" | "askerî";
export type Party232 = "Habsburg / Avusturya" | "Safevi" | "Lehistan" | "Venedik" | "Rusya";
export const PARTIES232: readonly Party232[] = ["Habsburg / Avusturya", "Safevi", "Lehistan", "Venedik", "Rusya"];
export interface Clause232 { kind: ClauseKind232; text: string; /** Toprak maddelerinde Osmanlı açısından yön. */ dir?: 1 | -1 }
export interface Treaty232 { key: DateKey232; name: string; parties: readonly Party232[]; clauses: readonly Clause232[] }
const treaties232Raw: readonly Treaty232[] = [
  { key: "karlofca", name: "Karlofça", parties: ["Habsburg / Avusturya", "Lehistan", "Venedik"], clauses: [{ kind: "toprak", dir: -1, text: "Büyük toprak kayıpları" }] },
  { key: "zitvatorok", name: "Zitvatorok", parties: ["Habsburg / Avusturya"], clauses: [{ kind: "statü", text: "Habsburg hükümdarı protokolde padişaha denk" }, { kind: "mali", text: "yıllık ödeme düzeni değişti" }] },
  { key: "prut", name: "Prut", parties: ["Rusya"], clauses: [{ kind: "toprak", dir: 1, text: "Azak geri alındı" }] },
  { key: "kucukKaynarca", name: "Küçük Kaynarca", parties: ["Rusya"], clauses: [{ kind: "statü", text: "Kırım’a siyasi bağımsızlık" }, { kind: "ticaret", text: "Rusya’ya ticari haklar" }] },
  { key: "kasriSirin", name: "Kasr-ı Şirin", parties: ["Safevi"], clauses: [{ kind: "sınır", text: "Doğu sınırının ana çerçevesi" }] },
  { key: "pasarofca", name: "Pasarofça", parties: ["Venedik", "Habsburg / Avusturya"], clauses: [{ kind: "toprak", dir: 1, text: "Mora Osmanlı’da kaldı" }, { kind: "toprak", dir: -1, text: "Avusturya karşısında kayıplar" }] },
  { key: "istanbul1700", name: "İstanbul", parties: ["Rusya"], clauses: [{ kind: "toprak", dir: -1, text: "Azak Rusya’ya bırakıldı" }] },
  { key: "belgrad", name: "Belgrad", parties: ["Habsburg / Avusturya", "Rusya"], clauses: [{ kind: "toprak", dir: 1, text: "Belgrad geri alındı" }, { kind: "askerî", text: "Rusya’nın Karadeniz’deki askerî imkânları sınırlandı" }] },
];
/** Satırlar yalnız tarih sabitinden sıralanır. */
export const treaties232 = [...treaties232Raw].sort((a, b) => D[a.key] - D[b.key]);
export type Direction232 = "Kazanım" | "Kayıp" | "Farklı yönlü" | "Derste toprak maddesi yok";
/** Toprak yönü yalnız toprak maddelerinin işaretlerinden çıkar. */
export const directionOf232 = (t: Treaty232): Direction232 => {
  const dirs = t.clauses.filter((c) => c.kind === "toprak").map((c) => c.dir);
  guard(dirs.every((d) => d === 1 || d === -1), `${t.name}: her toprak maddesinin yönü verilmeli`);
  if (dirs.length === 0) return "Derste toprak maddesi yok";
  if (dirs.every((d) => d === 1)) return "Kazanım";
  if (dirs.every((d) => d === -1)) return "Kayıp";
  return "Farklı yönlü";
};
export const kindsOf232 = (t: Treaty232) => [...new Set(t.clauses.map((c) => c.kind))];
const partyText = (t: Treaty232) => and([...t.parties]);
const clauseText = (t: Treaty232) => t.clauses.map((c) => c.text).join("; ");
const treatyTable = {
  layout: "table" as const,
  headers: ["Yıl", "Antlaşma", "Karşı taraf", "Ayırt edici madde (ders)", "Osmanlı için toprak yönü"],
  rows: treaties232.map((t) => [String(D[t.key]), t.name, partyText(t), clauseText(t), directionOf232(t)]),
};
const tr = (k: DateKey232) => treaties232.find((t) => t.key === k)!;
const byDir = (d: Direction232) => treaties232.filter((t) => directionOf232(t) === d);
const withRussia = treaties232.filter((t) => t.parties.includes("Rusya"));

guard(treaties232.every((t, i) => i === 0 || D[treaties232[i - 1].key] < D[t.key]), "tablo satırları tarih sırasındadır ve aynı yıla düşen iki satır yoktur");
guard(byDir("Kazanım").length > 0 && byDir("Kayıp").length > 0, "dönem tek yönlü değildir: tabloda hem kazanım hem kayıp vardır");
guard(byDir("Farklı yönlü").map((t) => t.key).join() === "pasarofca", "aynı antlaşmada farklı yönlü sonuç tabloda yalnız Pasarofça’dadır");
guard(directionOf232(tr("zitvatorok")) === "Derste toprak maddesi yok" && kindsOf232(tr("zitvatorok")).includes("statü"), "Zitvatorok’un ayırt edici değişimi statüdür, toprak değildir");
guard(!tr("karlofca").parties.includes("Rusya") && tr("istanbul1700").parties.join() === "Rusya", "Rusya Karlofça’nın değil, 1700 İstanbul’un tarafıdır");
guard(D.prut - D.istanbul1700 === 11 && directionOf232(tr("istanbul1700")) === "Kayıp" && directionOf232(tr("prut")) === "Kazanım", "Azak 1700’de bırakıldı, 1711’de geri alındı");
guard(kindsOf232(tr("kucukKaynarca")).includes("statü") && directionOf232(tr("kucukKaynarca")) === "Derste toprak maddesi yok", "1774 Kırım maddesi bir statü maddesidir, ilhak değildir");

export const treatySection232: GuideSection = {
  title: "Antlaşma tablosu: taraf, madde ve toprak yönü",
  paragraphs: [
    `Tablonun ${treaties232.length} satırı yalnız yıllara göre dizilir: ${D[treaties232[0].key]} ${treaties232[0].name} ile ${D[treaties232[treaties232.length - 1].key]} ${treaties232[treaties232.length - 1].name} arası. Son sütun yalnız toprak maddelerinden kurallı olarak çıkar: bütün toprak maddeleri Osmanlı lehineyse kazanım, aleyhineyse kayıp, ikisi birlikteyse farklı yönlü. Toprak maddesi yoksa yön uydurulmaz.`,
    `Sayım: ${byDir("Kayıp").length} kayıp (${list(byDir("Kayıp").map((t) => t.name))}), ${byDir("Kazanım").length} kazanım (${list(byDir("Kazanım").map((t) => t.name))}), ${byDir("Farklı yönlü").length} farklı yönlü (${list(byDir("Farklı yönlü").map((t) => t.name))}) ve ${byDir("Derste toprak maddesi yok").length} toprak maddesi verilmeyen antlaşma (${list(byDir("Derste toprak maddesi yok").map((t) => t.name))}). Bu dağılım dönemin tek yönlü bir kayıp listesi olmadığını gösterir. Zitvatorok’ta statü, Kasr-ı Şirin’de sınır, Küçük Kaynarca’da statü ve ticaret maddesi öne çıkar.`,
    `Karşı taraf sütunu savaş katılımını değil antlaşmanın tarafını gösterir. Rusya tablodaki ${withRussia.length} antlaşmanın tarafıdır (${list(withRussia.map((t) => `${t.name} ${D[t.key]}`))}); Karlofça bunların arasında yoktur. Azak ${D.istanbul1700} İstanbul’da Rusya’ya bırakıldı, ${D.prut - D.istanbul1700} yıl sonra ${D.prut} Prut’ta geri alındı. Tek cephedeki bu kazanım, Karlofça’da kaybedilen yerlerin geri alındığı anlamına gelmez.`,
  ],
  table: treatyTable,
};

/* Örnek 1: karışık beş kart, Rusya’nın taraf olduğu antlaşmalar ve Azak aralığı */
export const treatyCardKeys232: readonly DateKey232[] = ["prut", "karlofca", "belgrad", "istanbul1700", "pasarofca"];
export const treatyCards232 = treatyCardKeys232.map((k) => tr(k));
export const treatyCardsSorted232 = [...treatyCards232].sort((a, b) => D[a.key] - D[b.key]);
export const treatyCardsRussia232 = treatyCardsSorted232.filter((t) => t.parties.includes("Rusya"));
export const azakGap232 = D.prut - D.istanbul1700;
guard(treatyCardsRussia232.map((t) => t.key).join() === "istanbul1700,prut,belgrad", "kartlarda Rusya’nın taraf olduğu antlaşmalar İstanbul, Prut ve Belgrad’dır");

/* Örnek 2: toprak yönünü yalnız maddelerden say */
export const directionCount232 = (["Kazanım", "Kayıp", "Farklı yönlü", "Derste toprak maddesi yok"] as const).map((d) => ({ d, n: byDir(d).length }));
export const directionQuiz232: readonly DateKey232[] = ["pasarofca", "zitvatorok", "belgrad", "karlofca"];
guard(directionCount232.reduce((s, c) => s + c.n, 0) === treaties232.length, "yön sayıları toplamı satır sayısına eşittir");

export const treatyExamples232: WorkedExample[] = [
  {
    title: "Beş antlaşma kartı: sıra, taraf ve Azak aralığı",
    prompt: `Kartlar karışık verilmiştir: ${treatyCards232.map((t) => `${t.name} (${D[t.key]}; taraf: ${partyText(t)}; madde: ${clauseText(t)})`).join(" · ")}. Kartları eskiden yeniye sırala. Rusya hangi kartların doğrudan tarafıdır? Azak’ın Rusya’ya bırakılmasından geri alınmasına kaç yıl geçmiştir?`,
    strategy: "Önce yalnız yıllarla sırala. Sonra her kartın taraf satırında Rusya’yı ara; savaşta yer almayı antlaşmanın tarafı olmakla karıştırma. Azak’ın geçtiği iki kartın yıllarını çıkar.",
    steps: [
      { label: "Sırala", expression: treatyCardsSorted232.map((t) => D[t.key]).join(" → "), explanation: treatyCardsSorted232.map((t) => t.name).join(" → ") + "." },
      { label: "Rusya’nın tarafı olduğu kartlar", expression: treatyCardsRussia232.map((t) => `${t.name} ${D[t.key]}`).join(", "), explanation: `${tr("karlofca").name} kartının tarafları ${partyText(tr("karlofca"))}; Rusya’yla ayrı barış ${D.istanbul1700} İstanbul’dur.` },
      { label: "Azak aralığı", expression: `${D.prut} − ${D.istanbul1700} = ${azakGap232}`, explanation: `${D.istanbul1700}: ${clauseText(tr("istanbul1700"))}. ${D.prut}: ${clauseText(tr("prut"))}.` },
    ],
    answer: `${treatyCardsSorted232.map((t) => `${t.name} (${D[t.key]})`).join(" → ")}. Rusya ${and(treatyCardsRussia232.map((t) => t.name))} antlaşmalarının tarafıdır. Azak ${azakGap232} yıl sonra geri alınmıştır.`,
    check: `Rusya kartları ${treatyCardsRussia232.length} tane; öteki ${treatyCards232.length - treatyCardsRussia232.length} kartın taraf satırında Rusya geçmez. ${D.istanbul1700} + ${azakGap232} = ${D.prut}.`,
    pitfall: "Kutsal İttifak savaşlarında yer aldığı için Rusya’yı Karlofça’nın imzacısı saymak.",
  },
  {
    title: "Toprak yönünü maddelerden kur ve say",
    prompt: `Dört antlaşmanın maddeleri veriliyor: ${directionQuiz232.map((k) => `${tr(k).name}: ${clauseText(tr(k))}`).join(" · ")}. Kural: bütün toprak maddeleri Osmanlı lehineyse kazanım, aleyhineyse kayıp, ikisi birlikteyse farklı yönlü; toprak maddesi yoksa yön verilmez. Her antlaşmanın toprak yönü nedir? Aynı kuralı tablodaki ${treaties232.length} antlaşmaya uygulayınca kaç kayıp çıkar?`,
    strategy: "Önce her maddenin türünü bul: toprak, statü, mali, sınır, ticaret veya askerî. Yalnız toprak maddelerinin yönünü say.",
    steps: [
      ...directionQuiz232.map((k) => ({ label: tr(k).name, expression: `${kindsOf232(tr(k)).join(" + ")} → ${directionOf232(tr(k))}`, explanation: tr(k).clauses.map((c) => `${c.text}: ${c.kind}${c.dir ? (c.dir === 1 ? ", lehine" : ", aleyhine") : ""}`).join("; ") + "." })),
      { label: "Tabloyu say", expression: directionCount232.map((c) => `${lowerFirst(c.d)} ${c.n}`).join(", "), explanation: `Toplam ${directionCount232.reduce((s, c) => s + c.n, 0)} antlaşma.` },
    ],
    answer: `${directionQuiz232.map((k) => `${tr(k).name}: ${lowerFirst(directionOf232(tr(k)))}`).join("; ")}. Tabloda ${byDir("Kayıp").length} kayıp vardır (${and(byDir("Kayıp").map((t) => t.name))}).`,
    check: `Kazanım ${byDir("Kazanım").length}, kayıp ${byDir("Kayıp").length}: tablo yalnız kayıplardan oluşmaz. Zitvatorok’un statü maddesi toprak yönü üretmez.`,
    pitfall: "Bir antlaşmayı adından tek bir zafer veya yenilgi etiketiyle ezberlemek; Pasarofça’da iki tarafla iki farklı yönlü sonuç vardır.",
  },
];

export const treatySupplement232 = {
  title: treatySection232.title,
  figureTitle: treatySection232.title,
  paragraphs: treatySection232.paragraphs,
  summary: `${treaties232.map((t) => `${D[t.key]} ${t.name} (${partyText(t)}): ${lowerFirst(directionOf232(t))}`).join(" · ")}. Azak: ${D.istanbul1700} bırakıldı, ${D.prut} geri alındı. Rusya Karlofça’nın tarafı değildir.`,
  appendSection: true as const,
  table: treatyTable,
  examples: treatyExamples232,
};

/* =================================================================
 * 3 · Değişim çağında Avrupa ve Osmanlı: kanıt ve bağlantı
 * ================================================================= */

export type Change232 = "Rönesans" | "Reform" | "Bilim Devrimi" | "Aydınlanma" | "Merkantilizm" | "Fiyat Devrimi" | "Askerî dönüşüm";
export interface Development232 {
  name: Change232;
  field: string;
  evidence: string;
  examples: string;
  /** Dersin Osmanlı tarafında kurduğu bağlantı; kurmuyorsa null. */
  link: { short: string; text: string } | null;
}
export const NO_LINK232 = "Bu derste doğrudan Osmanlı bağlantısı kurulmaz";
export const developments232: readonly Development232[] = [
  { name: "Rönesans", field: "Sanat ve düşünce", evidence: "İtalya, Antik Yunan ve Roma mirası, hümanizm", examples: "Resim, heykel, mimari, edebiyat; koruyuculuk", link: null },
  { name: "Reform", field: "Din ve kilise", evidence: "Kilise uygulamalarına itiraz, mezhep ayrılığı", examples: "Martin Luther, endüljans tartışması, matbaa", link: { short: "Etki türünü ayır", text: "Doğrudan mezhep değişimi ile diplomatik ve düşünsel etkiler ayrı değerlendirilir" } },
  { name: "Bilim Devrimi", field: "Doğa bilimi", evidence: "Gözlem, matematik, deney, eleştirel sınama", examples: "Copernicus, Kepler, Galileo, Newton", link: null },
  { name: "Aydınlanma", field: "Toplum, hukuk, siyaset düşüncesi", evidence: "Akıl ve eleştirinin topluma taşınması", examples: "Locke, Montesquieu, Rousseau", link: null },
  { name: "Merkantilizm", field: "Devlet ve ekonomi", evidence: "Değerli maden birikimi, ihracatı teşvik, ithalatı sınırlama", examples: "Korumacılık; sürekli ordu ve donanma masrafı", link: null },
  { name: "Fiyat Devrimi", field: "Para ve fiyatlar", evidence: "Amerika’dan gelen gümüş, XVI. yüzyılda fiyat artışı", examples: "Para dolaşımı; tağşiş; nominal maaş", link: { short: "Para ve fiyatlar", text: "Osmanlı para ve ticaret sistemi etkilendi; nominal maaş sabitken alım gücü düştü" } },
  { name: "Askerî dönüşüm", field: "Ordu ve maliye", evidence: "Ateşli silah, sürekli eğitimli piyade, uzun seferler", examples: "Yeniçeri, sekban, sarıca, levent", link: { short: "Nakit asker, yeni vergi", text: `Yeniçeri sayısı artırıldı; nakit için iltizam, ${D.malikane}’ten malikâne, daha sık avarız` } },
];
const dev = (n: Change232) => developments232.find((d) => d.name === n)!;
export const linkText232 = (d: Development232) => d.link?.text ?? NO_LINK232;

/** Kanıt ipucundan aday gelişmelere: dersin kendi tanım sözleri. */
export const DEV_CLUES232: Record<string, readonly Change232[]> = {
  İtalya: ["Rönesans"],
  hümanizm: ["Rönesans"],
  endüljans: ["Reform"],
  mezhep: ["Reform"],
  deney: ["Bilim Devrimi"],
  Galileo: ["Bilim Devrimi"],
  akıl: ["Bilim Devrimi", "Aydınlanma"],
  "yetkilerin sınırlandırılması": ["Aydınlanma"],
  "değerli maden": ["Merkantilizm", "Fiyat Devrimi"],
  "fiyat artışı": ["Fiyat Devrimi"],
  "ateşli silah": ["Askerî dönüşüm"],
};
export const devCandidates232 = (clues: readonly string[]) =>
  developments232.filter((d) => clues.every((c) => (DEV_CLUES232[c] ?? []).includes(d.name))).map((d) => d.name);

const devTable = {
  layout: "table" as const,
  headers: ["Değişim", "Alan", "Ayırt edici kanıt", "Adı geçen kişi veya araç", "Osmanlı tarafında dersin bağlantısı"],
  rows: developments232.map((d) => [d.name, d.field, d.evidence, d.examples, linkText232(d)]),
};
const linked = developments232.filter((d) => d.link !== null);
const unlinked = developments232.filter((d) => d.link === null);
export const laleYears232 = D.laleEnd - D.laleStart;

guard(developments232.every((d) => Object.values(DEV_CLUES232).some((cs) => cs.includes(d.name))), "her gelişmenin en az bir kanıt ipucu vardır");
guard(DEV_CLUES232["akıl"].length === 2 && devCandidates232(["akıl", "yetkilerin sınırlandırılması"]).join() === "Aydınlanma", "akıl tek başına Bilim Devrimi ile Aydınlanmayı ayırmaz");
guard(devCandidates232(["değerli maden", "fiyat artışı"]).join() === "Fiyat Devrimi", "değerli maden ve fiyat artışı birlikte Fiyat Devrimi’ni seçer");
guard(linked.length > 0 && unlinked.length > 0 && linked.length + unlinked.length === developments232.length, "her satırın Osmanlı bağlantısı ya dersten gelir ya boş bırakılır");
guard(dev("Rönesans").field !== dev("Reform").field, "Rönesans ile Reform farklı alanlardır");
guard(D.laleStart === D.pasarofca && D.laleStart < D.matbaa && D.matbaa < D.laleEnd && D.malikane < D.laleStart, "1695 malikâne Lâle Devri’nden önce, 1727 matbaa Lâle Devri içindedir");

export const developmentSection232: GuideSection = {
  title: "Değişimin kanıtı ve Osmanlı tarafındaki bağlantı",
  paragraphs: [
    `Tablodaki ${developments232.length} değişim aynı çağdadır ama her biri kendi kanıtıyla tanınır: ${developments232.map((d) => `${d.name} → ${lowerFirst(d.field)}`).join("; ")}. Bir metinde İtalya ve hümanizm varsa Rönesans, endüljans ve mezhep ayrılığı varsa Reform düşünülür. “Akıl” sözü tek başına Bilim Devrimi ile Aydınlanmayı ayırmaz; yetkilerin sınırlandırılması gibi siyasal bir ipucu eklenince Aydınlanma kalır.`,
    `Son sütun yalnız dersin kurduğu bağlantıyı yazar. ${linked.length} satırda bağlantı vardır: ${list(linked.map((d) => `${d.name} (${lowerFirst(d.link!.short)})`))}. ${unlinked.length} satırda (${list(unlinked.map((d) => d.name))}) bu ders doğrudan bir Osmanlı sonucu vermez; boş hücre uydurma bir etkiyle doldurulmaz. Aynı dönemde yaşanmak aynı nedenin sonucu olmak değildir.`,
    `Osmanlı’nın Avrupa’yı tanıma girişimleri ayrıca tarihlenir: ${D.laleStart} Pasarofça sonrasından ${D.laleEnd} Patrona Halil İsyanı’na uzanan Lâle Devri ${laleYears232} yıldır. Yirmisekiz Çelebi Mehmet’in Paris elçiliği bu döneme, İbrahim Müteferrika ve Said Efendi’nin matbaası ${D.matbaa} yılına aittir. Malikâne uygulaması ise ${D.laleStart - D.malikane} yıl önce, ${D.malikane}’te başlar.`,
  ],
  table: devTable,
};

/* Örnek 1: üç metin, aday gelişmeler */
export const devRecords232 = [
  { id: "A", text: "Akıl ve eleştiriyi siyasete taşıyan bir düşünür, yetkilerin sınırlandırılmasını savunuyor.", clues: ["akıl", "yetkilerin sınırlandırılması"] },
  { id: "B", text: "Bir metin yalnız aklın öne çıktığını söylüyor.", clues: ["akıl"] },
  { id: "C", text: "Değerli maden akışının arttığı bir yüzyılda fiyat artışı görülüyor.", clues: ["değerli maden", "fiyat artışı"] },
] as const;
export const devRecordAnswers232 = devRecords232.map((r) => ({ ...r, candidates: devCandidates232(r.clues) }));
const [dA, dB, dC] = devRecordAnswers232;
guard(dA.candidates.length === 1 && dB.candidates.length === 2 && dC.candidates.length === 1, "A ve C tek adaya iner, B açık kalır");

/* Örnek 2: dört tarihli kart ve bir tarihsiz kart */
export const laleCards232 = [
  { label: "Malikâne uygulamasının başlaması", key: "malikane" as DateKey232 },
  { label: "Patrona Halil İsyanı", key: "laleEnd" as DateKey232 },
  { label: "İbrahim Müteferrika ve Said Efendi’nin matbaası", key: "matbaa" as DateKey232 },
  { label: "Pasarofça sonrası, Lâle Devri’nin başı", key: "laleStart" as DateKey232 },
] as const;
export const laleSorted232 = [...laleCards232].sort((a, b) => D[a.key] - D[b.key]);
export const laleInside232 = laleSorted232.filter((c) => D[c.key] > D.laleStart && D[c.key] < D.laleEnd);
export const matbaaOffset232 = D.matbaa - D.laleStart;
/** Tarihi verilmeyen kart: ders yalnız “daha sonraki” der; yıl eklenmez. */
export const NURUOSMANIYE232 = "Nuruosmaniye yapısı";
guard(laleInside232.length === 1 && laleInside232[0].key === "matbaa", "kartlardan yalnız matbaa Lâle Devri’nin içine düşer");

export const developmentExamples232: WorkedExample[] = [
  {
    title: "Üç metin, kanıttan değişime",
    prompt: `İpucu sözlüğü: ${Object.entries(DEV_CLUES232).map(([k, c]) => `“${k}” → ${c.join(" / ")}`).join("; ")}. Üç kurmaca metin veriliyor: ${devRecords232.map((r) => `${r.id}) ${r.text}`).join(" ")} Her metin tablodaki hangi değişim veya değişimlerle uyumludur? Metinde geçmeyen ipucu eleme için kullanılmaz.`,
    strategy: "Her ipucunun aday kümesini yaz ve kümeleri kesiştir. Tek bir ortak söz, iki hareketi aynı yapmaz.",
    steps: [
      { label: "A metni", expression: `{${DEV_CLUES232["akıl"].join(", ")}} ∩ {${DEV_CLUES232["yetkilerin sınırlandırılması"].join(", ")}} = {${dA.candidates.join(", ")}}`, explanation: "Yetkilerin sınırlandırılması tartışması akıl ve eleştirinin siyasete taşınmasıdır." },
      { label: "B metni", expression: `akıl → ${dB.candidates.join(", ")}`, explanation: "Akıl hem bilimsel yöntemde hem Aydınlanma düşüncesinde geçer; seçim yapılamaz." },
      { label: "C metni", expression: `{${DEV_CLUES232["değerli maden"].join(", ")}} ∩ {${DEV_CLUES232["fiyat artışı"].join(", ")}} = {${dC.candidates.join(", ")}}`, explanation: `Bu satırın Osmanlı bağlantısı — ${linkText232(dev("Fiyat Devrimi"))}.` },
    ],
    answer: `A: ${dA.candidates.join(", ")}. B: kesin seçilemez; ${dB.candidates.length} aday kalır (${and(dB.candidates)}). C: ${dC.candidates.join(", ")}.`,
    check: `A ve C birer adaya iner. B’de tek ipucu ${dB.candidates.length} satıra uyar; ikinci bir kanıt gerekir.`,
    pitfall: "Akıl sözcüğünü görünce her metni Aydınlanma saymak; bilimsel yöntem de akıl ve deneyi birlikte kullanır.",
  },
  {
    title: "Lâle Devri kartlarını sırala, tarihsiz kartı yerleştir",
    prompt: `Dört tarihli kart veriliyor: ${laleCards232.map((c) => `${c.label} (${D[c.key]})`).join("; ")}. Bir kart tarihsizdir: “${NURUOSMANIYE232}”. Ders bu yapı için yalnız Lâle Devri’yle ilişkilendirilen sanat etkisinden “daha sonraki” olduğunu söyler. Kartları eskiden yeniye sırala. Lâle Devri kaç yıl sürer, matbaa bu dönemin başlangıcından kaç yıl sonradır? Tarihsiz kart nereye konur?`,
    strategy: "Tarihli kartları yıllarla sırala. Tarihsiz karta yıl uydurma; yalnız dersin verdiği önce–sonra bilgisini kullan.",
    steps: [
      { label: "Sırala", expression: laleSorted232.map((c) => D[c.key]).join(" → "), explanation: laleSorted232.map((c) => c.label).join(" → ") + "." },
      { label: "Süreler", expression: `${D.laleEnd} − ${D.laleStart} = ${laleYears232}; ${D.matbaa} − ${D.laleStart} = ${matbaaOffset232}`, explanation: "Lâle Devri Pasarofça sonrasından Patrona Halil İsyanı’na uzanır." },
      { label: "Tarihsiz kart", expression: `${NURUOSMANIYE232}: ${D.laleEnd} sonrasında, yıl yazılmadan`, explanation: "Ders yapıyı Lâle Devri’nin dışına, sonrasına koyar; kesin yılı bu derste verilmez." },
    ],
    answer: `${laleSorted232.map((c) => `${c.label} (${D[c.key]})`).join(" → ")} → ${NURUOSMANIYE232} (yılsız, ${D.laleEnd} sonrası). Lâle Devri ${laleYears232} yıl; matbaa başlangıçtan ${matbaaOffset232} yıl sonradır.`,
    check: `Lâle Devri’nin içine düşen tek kart matbaadır (${D.laleStart} < ${D.matbaa} < ${D.laleEnd}). Malikâne ${D.laleStart - D.malikane} yıl öncedir.`,
    pitfall: `Lâle Devri’yle ilişkilendirilen bir sanat etkisini görünce Nuruosmaniye’yi ${D.laleStart}–${D.laleEnd} arasına taşımak.`,
  },
];

export const developmentSupplement232 = {
  title: developmentSection232.title,
  figureTitle: developmentSection232.title,
  paragraphs: developmentSection232.paragraphs,
  summary: `${developments232.map((d) => `${d.name}: ${d.evidence}`).join(" · ")}. Osmanlı bağlantısı: ${list(linked.map((d) => `${d.name} → ${lowerFirst(d.link!.short)}`))}; öteki satırlarda bağlantı uydurma. Lâle Devri ${D.laleStart}–${D.laleEnd}, matbaa ${D.matbaa}, malikâne ${D.malikane}.`,
  appendSection: true as const,
  table: devTable,
  examples: developmentExamples232,
};

/* =================================================================
 * 4 · Devrimler çağında devlet ve toplum: tür, alan, meclis durumu
 * ================================================================= */

export type DocKind232 = "Siyasal uzlaşma belgesi" | "Askerî düzenleme" | "Ferman" | "Anayasa" | "Meclisin tatili" | "Anayasal yönetimin yeniden açılışı" | "Anayasa değişikliği";
export type Area232 = "İdari-siyasal" | "Askerî" | "Hukuki" | "Temsil";
export interface Reform232 { key: DateKey232; name: string; kind: DocKind232; area: Area232; content: string; short: string }
export const reforms232: readonly Reform232[] = [
  { key: "senedIttifak", name: "Sened-i İttifak", short: "Sened-i İttifak", kind: "Siyasal uzlaşma belgesi", area: "İdari-siyasal", content: "Merkez ile bazı ayanlar arasında uzlaşma; Alemdar Mustafa Paşa öncülüğünde" },
  { key: "yeniceriKaldirildi", name: "Yeniçeri Ocağı’nın kaldırılması", short: "Yeniçeri kaldırıldı", kind: "Askerî düzenleme", area: "Askerî", content: "Asakir-i Mansure-i Muhammediye kuruldu" },
  { key: "tanzimat", name: "Tanzimat Fermanı", short: "Tanzimat", kind: "Ferman", area: "Hukuki", content: "Can, mal ve namus güvenliği; düzenli vergi ve askerlik; kanuna bağlılık" },
  { key: "islahat", name: "Islahat Fermanı", short: "Islahat", kind: "Ferman", area: "Hukuki", content: "Kırım Savaşı ve Paris görüşmeleri ortamında gayrimüslimlere eşitlik güvenceleri" },
  { key: "kanunEsasi", name: "Kanun-ı Esasi", short: "Kanun-ı Esasi", kind: "Anayasa", area: "Hukuki", content: "İlk Osmanlı anayasası; Meclis-i Umumî: atanan Ayan, seçilen Mebusan" },
  { key: "meclisTatil", name: "Meclisin süresiz tatili", short: "Süresiz tatil", kind: "Meclisin tatili", area: "Temsil", content: "Anayasal yönetim kesintiye uğradı" },
  { key: "mesrutiyet2", name: "II. Meşrutiyet", short: "II. Meşrutiyet", kind: "Anayasal yönetimin yeniden açılışı", area: "Temsil", content: "Anayasal yönetim ve meclis yeniden işler hâle geldi" },
  { key: "degisiklik1909", name: "Anayasa değişiklikleri", short: "Değişiklikler", kind: "Anayasa değişikliği", area: "Hukuki", content: "Padişahın yetkileri daraldı; meclis–hükûmet ilişkisi değişti" },
];
export type Assembly232 = "Henüz meclis yok" | "Meclis-i Umumî var" | "Meclis tatilde" | "Meclis yeniden işler";
/** Meclis durumunu değiştiren olaylar: dersin verdiği üç yıl. */
export const ASSEMBLY_EVENTS232: readonly { key: DateKey232; state: Assembly232 }[] = [
  { key: "kanunEsasi", state: "Meclis-i Umumî var" },
  { key: "meclisTatil", state: "Meclis tatilde" },
  { key: "mesrutiyet2", state: "Meclis yeniden işler" },
];
/** Verilen yıldaki meclis durumu: o yıla kadar gerçekleşen son meclis olayı. */
export const assemblyAt232 = (year: number): Assembly232 => {
  const past = ASSEMBLY_EVENTS232.filter((e) => D[e.key] <= year);
  return past.length ? past[past.length - 1].state : "Henüz meclis yok";
};
const reformTable = {
  layout: "table" as const,
  headers: ["Yıl", "Düzenleme veya olay", "Tür", "Alan", "O yıl meclis durumu"],
  rows: reforms232.map((r) => [String(D[r.key]), r.name, r.kind, r.area, assemblyAt232(D[r.key])]),
};
const rf = (k: DateKey232) => reforms232.find((r) => r.key === k)!;
const noAssembly = reforms232.filter((r) => assemblyAt232(D[r.key]) === "Henüz meclis yok");
export const recessYears232 = D.mesrutiyet2 - D.meclisTatil;
export const firstAssemblyYears232 = D.meclisTatil - D.kanunEsasi;
export const nizamGap232 = D.yeniceriKaldirildi - D.kabakci;

guard(reforms232.every((r, i) => i === 0 || D[reforms232[i - 1].key] < D[r.key]), "tablo satırları tarih sırasındadır");
guard(reforms232.filter((r) => r.kind === "Anayasa").map((r) => r.key).join() === "kanunEsasi", "tabloda anayasa türündeki tek belge 1876 Kanun-ı Esasi’dir");
guard(rf("senedIttifak").kind !== "Anayasa" && rf("tanzimat").kind === "Ferman" && rf("islahat").kind === "Ferman", "Sened-i İttifak ve fermanlar anayasa değildir");
guard(noAssembly.map((r) => r.key).join() === "senedIttifak,yeniceriKaldirildi,tanzimat,islahat", "1876’dan önceki dört satırda meclis yoktur");
guard(recessYears232 === 30 && firstAssemblyYears232 === 2, "meclis 1878’den 1908’e kadar tatildedir");
guard(nizamGap232 === 19, "Nizam-ı Cedit’i kesintiye uğratan 1807’den Yeniçeri Ocağı’nın kaldırılmasına 19 yıl geçer");
guard(new Set(reforms232.map((r) => r.area)).size === 4, "tablo dört alanı da kapsar");

export const reformSection232: GuideSection = {
  title: `${D.senedIttifak}–${D.degisiklik1909} düzenlemeleri: tür, alan ve meclis durumu`,
  paragraphs: [
    `Tablonun ${reforms232.length} satırı ${D[reforms232[0].key]} ile ${D[reforms232[reforms232.length - 1].key]} arasındadır. “Tür” sütunu belgenin hukuki niteliğini ayırır: ${rf("senedIttifak").name} ${lowerFirst(rf("senedIttifak").kind)}, ${rf("tanzimat").name} ve ${rf("islahat").name} fermandır; anayasa türündeki tek belge ${D.kanunEsasi} ${rf("kanunEsasi").name}’dir. Yetkiyi tartışan her belge anayasa değildir.`,
    `Son sütun kurallı olarak hesaplanır: bir yılın meclis durumu, o yıla kadar gerçekleşen son meclis olayıdır. Olaylar şunlardır: ${ASSEMBLY_EVENTS232.map((e) => `${D[e.key]}: ${e.state}`).join("; ")}. Böylece ${list(noAssembly.map((r) => D[r.key]))} satırlarında henüz meclis yoktur; ${D.meclisTatil}–${D.mesrutiyet2} arasında meclis ${recessYears232} yıl tatildedir.`,
    `Alan sütunu reformun neyi değiştirdiğini gösterir. ${D.kabakci} Kabakçı Mustafa İsyanı Nizam-ı Cedit’i kesintiye uğrattı; Yeniçeri Ocağı ${nizamGap232} yıl sonra, ${D.yeniceriKaldirildi}’da kaldırıldı. Bu, zorunlu askerliğin herkese aynı anda uygulandığı anlamına gelmez. Hukuki güvence (${D.tanzimat}), eşitlik güvencesi (${D.islahat}) ve temsil kurumu (${D.kanunEsasi}) ayrı eksenlerdir; birinin varlığı ötekini kanıtlamaz.`,
  ],
  table: reformTable,
};

/* Örnek 1: dört yılda meclis durumu ve kesintiler */
export const assemblyQuiz232: readonly DateKey232[] = ["tanzimat", "islahat", "kanunEsasi", "degisiklik1909"];
export const assemblyQuizAnswers232 = assemblyQuiz232.map((k) => ({ key: k, year: D[k], state: assemblyAt232(D[k]) }));
guard(assemblyQuizAnswers232.filter((a) => a.state === "Henüz meclis yok").length === 2, "sorulan dört yıldan ikisinde meclis yoktur");

/* Örnek 2: belge ipuçları */
export const DOC_CLUES232: Record<string, readonly DateKey232[]> = {
  ayan: ["senedIttifak", "kanunEsasi"],
  "padişahça atanan üyeler": ["kanunEsasi"],
  ferman: ["tanzimat", "islahat"],
  "Paris görüşmeleri": ["islahat"],
  "can, mal ve namus güvenliği": ["tanzimat"],
  "merkez ile uzlaşma": ["senedIttifak"],
};
export const docCandidates232 = (clues: readonly string[]) =>
  reforms232.filter((r) => clues.every((c) => (DOC_CLUES232[c] ?? []).includes(r.key)));
export const docRecords232 = [
  { id: "A", text: "Belgede “ayan” sözü geçiyor.", clues: ["ayan"] },
  { id: "B", text: "Belgede ayan, padişahça atanan üyelerden oluşan bir meclistir.", clues: ["ayan", "padişahça atanan üyeler"] },
  { id: "C", text: "Belgede ayan, merkez ile uzlaşan taşra güç odaklarıdır.", clues: ["ayan", "merkez ile uzlaşma"] },
  { id: "D", text: "Bir ferman Paris görüşmeleri ortamında ilan ediliyor.", clues: ["ferman", "Paris görüşmeleri"] },
] as const;
export const docRecordAnswers232 = docRecords232.map((r) => ({ ...r, candidates: docCandidates232(r.clues) }));
const [rA, rB, rC, rD] = docRecordAnswers232;
guard(rA.candidates.length === 2 && [rB, rC, rD].every((r) => r.candidates.length === 1) && rB.candidates[0] !== rC.candidates[0], "ayan sözü iki belgeye uyar; ikinci ipucu ayırır");

export const reformExamples232: WorkedExample[] = [
  {
    title: "O yıl meclis var mıydı? Dört yıl, iki kesinti",
    prompt: `Meclis olayları: ${ASSEMBLY_EVENTS232.map((e) => `${D[e.key]}: ${e.state}`).join("; ")}. Kural: bir yılın meclis durumu o yıla kadar gerçekleşen son meclis olayıdır; hiç olay yoksa meclis yoktur. ${assemblyQuiz232.map((k) => `${D[k]} ${rf(k).name}`).join(", ")} yıllarında meclis durumu nedir? Meclis kaç yıl tatilde kalmıştır? ${D.kabakci} Kabakçı Mustafa İsyanı’ndan Yeniçeri Ocağı’nın kaldırılmasına (${D.yeniceriKaldirildi}) kaç yıl geçmiştir?`,
    strategy: "Her yıl için yalnız o yıla kadar gerçekleşen meclis olaylarına bak ve sonuncusunu oku. Süreleri yıl farkıyla bul.",
    steps: [
      ...assemblyQuizAnswers232.map((a) => ({ label: String(a.year), expression: `${rf(a.key).name} → ${a.state}`, explanation: ASSEMBLY_EVENTS232.filter((e) => D[e.key] <= a.year).length ? `Son olay: ${ASSEMBLY_EVENTS232.filter((e) => D[e.key] <= a.year).map((e) => D[e.key]).pop()}.` : `${D.kanunEsasi} öncesidir; meclis olayı yoktur.` })),
      { label: "Süreler", expression: `${D.mesrutiyet2} − ${D.meclisTatil} = ${recessYears232}; ${D.yeniceriKaldirildi} − ${D.kabakci} = ${nizamGap232}`, explanation: "Biri temsil kurumunun, öteki ordu reformunun kesintisidir." },
    ],
    answer: `${assemblyQuizAnswers232.map((a) => `${a.year}: ${a.state}`).join("; ")}. Meclis ${recessYears232} yıl tatilde kaldı; Kabakçı’dan ${D.yeniceriKaldirildi}’ya ${nizamGap232} yıl geçti.`,
    check: `${D.tanzimat} ve ${D.islahat} fermanları meclis kurmaz; ilk meclis ${D.kanunEsasi}’dadır ve ${firstAssemblyYears232} yıl sonra tatil edilir.`,
    pitfall: "Tanzimat veya Islahat Fermanı’nın bir meclis açtığını sanmak; hak güvencesi temsil kurumu değildir.",
  },
  {
    title: "Aynı söz, iki belge: “ayan” ipucunu ayır",
    prompt: `İpuçları: ${Object.entries(DOC_CLUES232).map(([k, ks]) => `“${k}” → ${ks.map((x) => rf(x).name).join(" / ")}`).join("; ")}. Dört kurmaca kayıt: ${docRecords232.map((r) => `${r.id}) ${r.text}`).join(" ")} Her kayıt hangi belge veya belgelerle uyumludur?`,
    strategy: "Her ipucunun aday kümesini yaz ve kesiştir. Aynı sözcüğün iki farklı kurumu adlandırabildiğini unutma.",
    steps: [
      { label: "A", expression: `ayan → ${rA.candidates.map((r) => r.name).join(", ")}`, explanation: `${D.senedIttifak}’de ayan taşradaki güç odaklarıdır; ${D.kanunEsasi}’da Ayan, Meclis-i Umumî’nin atanan kanadıdır.` },
      { label: "B ve C", expression: `B → ${rB.candidates[0].name}; C → ${rC.candidates[0].name}`, explanation: "İkinci ipucu ayan sözünün hangi anlamda kullanıldığını belirler." },
      { label: "D", expression: `{${DOC_CLUES232["ferman"].map((k) => rf(k).name).join(", ")}} ∩ {${DOC_CLUES232["Paris görüşmeleri"].map((k) => rf(k).name).join(", ")}} = {${rD.candidates[0].name}}`, explanation: `${rD.candidates[0].name} ${D[rD.candidates[0].key]} yılındadır.` },
    ],
    answer: `A: kesin seçilemez; ${and(rA.candidates.map((r) => r.name))}. B: ${rB.candidates[0].name} (${D[rB.candidates[0].key]}). C: ${rC.candidates[0].name} (${D[rC.candidates[0].key]}). D: ${rD.candidates[0].name} (${D[rD.candidates[0].key]}).`,
    check: `B ve C aynı sözcükle başlar ama farklı yıllara gider: ${D[rB.candidates[0].key]} ve ${D[rC.candidates[0].key]}. Tablodaki türleri de farklıdır: ${lowerFirst(rB.candidates[0].kind)}, ${lowerFirst(rC.candidates[0].kind)}.`,
    pitfall: "Sened-i İttifak’taki ayanlarla Kanun-ı Esasi’deki Ayan meclisini aynı kurum saymak.",
  },
];

export const reformSupplement232 = {
  title: reformSection232.title,
  figureTitle: reformSection232.title,
  paragraphs: reformSection232.paragraphs,
  summary: `${reforms232.map((r) => `${D[r.key]} ${r.short} (${lowerFirst(r.kind)})`).join(" · ")}. Tek anayasa ${D.kanunEsasi}; meclis ${D.kanunEsasi}–${D.meclisTatil}, tatil ${D.meclisTatil}–${D.mesrutiyet2} (${recessYears232} yıl). “Ayan” ${D.senedIttifak}’de taşra güç odağı, ${D.kanunEsasi}’da atanan meclis.`,
  appendSection: true as const,
  table: reformTable,
  examples: reformExamples232,
};

/* =================================================================
 * 5 · Denge stratejisi: tehdit, destek ve bedel
 * ================================================================= */

export type Actor232 = "Fransa" | "İngiltere" | "Rusya" | "Mısır (Mehmet Ali Paşa)" | "Almanya";
export const ACTORS232: readonly Actor232[] = ["Fransa", "İngiltere", "Rusya", "Mısır (Mehmet Ali Paşa)", "Almanya"];
export interface Balance232 {
  key: DateKey232;
  threat: string;
  support: string;
  doc: string;
  cost: string;
  /** Satırda Osmanlı’ya karşı konumda olan ve destek veren aktörler (ders metninden). */
  against: readonly Actor232[];
  with: readonly Actor232[];
}
export const balance232: readonly Balance232[] = [
  { key: "misirIsgal", threat: "Fransa: Mısır’ın işgali", support: "İngiltere ve Rusya", doc: "Derste belge adı verilmez", cost: "İş birliği kararların müttefike devri değildir", against: ["Fransa"], with: ["İngiltere", "Rusya"] },
  { key: "navarin", threat: "Navarin: İngiliz, Fransız, Rus donanmaları", support: "Mısır kuvvetleri (Mehmet Ali Paşa)", doc: `${D.edirne} Edirne`, cost: "Mora yardımı sonrası valilik talepleri", against: ["İngiltere", "Fransa", "Rusya"], with: ["Mısır (Mehmet Ali Paşa)"] },
  { key: "hunkarIskelesi", threat: "Mehmet Ali Paşa: İbrahim Paşa’nın ilerlemesi", support: "Rusya", doc: "Hünkâr İskelesi", cost: "Gizli hüküm: Boğazlar Rusya’nın rakibi savaş gemilerine kapalı", against: ["Mısır (Mehmet Ali Paşa)"], with: ["Rusya"] },
  { key: "kirimSavasiGiris", threat: `Rusya: himaye talepleri, ${D.sinop} Sinop`, support: "İngiltere ve Fransa (Sardinya da katıldı)", doc: `${D.paris} Paris`, cost: `${D.kirimSavasiGiris}’te dış borçlanma başladı`, against: ["Rusya"], with: ["İngiltere", "Fransa"] },
  { key: "berlin", threat: "Rusya: Ayastefanos’la artan nüfuz", support: "İngiltere ve öteki büyük güçler", doc: "Berlin", cost: "Kıbrıs’ın yönetimi İngiltere’ye bırakıldı", against: ["Rusya"], with: ["İngiltere"] },
  { key: "misirIngiliz", threat: `İngiltere: Mısır’ın işgali (${D.tunus}’de Fransa Tunus’ta)`, support: "Almanya ile yeni yakınlaşma alanı", doc: "Derste belge adı verilmez", cost: "Eski destekçiler farklı çıkar izledi", against: ["İngiltere", "Fransa"], with: ["Almanya"] },
];
export type Role232 = "destek" | "karşı";
export const roleOf232 = (row: Balance232, a: Actor232): Role232 | null => (row.with.includes(a) ? "destek" : row.against.includes(a) ? "karşı" : null);
export const rolesOf232 = (a: Actor232) => balance232.flatMap((row) => { const r = roleOf232(row, a); return r ? [{ year: D[row.key], role: r }] : []; });
export const roleChanges232 = (a: Actor232) => rolesOf232(a).reduce((n, r, i, all) => (i > 0 && all[i - 1].role !== r.role ? n + 1 : n), 0);
const balanceTable = {
  layout: "table" as const,
  headers: ["Yıl", "Yakın tehdit veya kayıp", "Destek veya yakınlaşma", "Belge", "Bedel veya sınır"],
  rows: balance232.map((b) => [String(D[b.key]), b.threat, b.support, b.doc, b.cost]),
};
const yearsAs = (a: Actor232, role: Role232) => rolesOf232(a).filter((r) => r.role === role).map((r) => r.year);

guard(balance232.every((b, i) => i === 0 || D[balance232[i - 1].key] < D[b.key]), "tablo satırları tarih sırasındadır");
guard(balance232.every((b) => b.with.every((a) => !b.against.includes(a))), "bir aktör aynı satırda hem destek hem karşı değildir");
guard(yearsAs("Fransa", "karşı").includes(D.misirIsgal) && yearsAs("Fransa", "destek").includes(D.kirimSavasiGiris), "Fransa 1798’de karşı, 1850’lerde destek konumundadır");
guard(yearsAs("Rusya", "destek").includes(D.hunkarIskelesi) && yearsAs("Rusya", "karşı").includes(D.kirimSavasiGiris), "Rusya 1833’te destek, 1853–1854’te karşı konumundadır");
guard(yearsAs("Mısır (Mehmet Ali Paşa)", "destek")[0] < yearsAs("Mısır (Mehmet Ali Paşa)", "karşı")[0], "Mehmet Ali Paşa önce destek, sonra tehdit olur");
guard(["Fransa", "İngiltere", "Rusya"].every((a) => new Set(rolesOf232(a as Actor232).map((r) => r.role)).size === 2), "üç büyük gücün her biri tabloda iki rolde de görülür");
guard(balance232.every((b) => b.cost.length > 0), "her satırda bedel veya sınır yazılıdır");

export const balanceSection232: GuideSection = {
  title: "Tehdit, destek ve bedel: denge tablosu",
  paragraphs: [
    `Tablo dersin üç sorusunu her satıra uygular: yakın tehdit kimden geliyor, destek kimden aranıyor, bu destek hangi bedeli veya sınırı getiriyor? ${balance232.length} satır ${D[balance232[0].key]} ile ${D[balance232[balance232.length - 1].key]} arasındadır. Belge adı derste verilmeyen satırlara belge eklenmez.`,
    `Aynı devlet farklı yıllarda farklı rol üstlenir. Rusya ${list(yearsAs("Rusya", "destek"))} satırlarında destek, ${list(yearsAs("Rusya", "karşı"))} satırlarında karşı konumdadır. Fransa ${list(yearsAs("Fransa", "karşı"))} satırlarında karşı, ${list(yearsAs("Fransa", "destek"))} satırında destek konumundadır. Mehmet Ali Paşa ${list(yearsAs("Mısır (Mehmet Ali Paşa)", "destek"))} satırında destek verir, ${list(yearsAs("Mısır (Mehmet Ali Paşa)", "karşı"))} satırında İstanbul’u tehdit eder. Devlet adı tek başına dost veya düşman etiketi değildir.`,
    `Son sütun desteğin bedelsiz olmadığını gösterir: ${D.kirimSavasiGiris}’te dış borçlanma başladı, ${D.berlin}’de Kıbrıs’ın yönetimi İngiltere’ye bırakıldı. ${D.hunkarIskelesi} gizli hükmü Boğazları Rusya’nın rakibi savaş gemilerine kapatmakla ilgilidir; Rus savaş gemilerine her koşulda sınırsız geçiş anlamına gelmez. ${D.paris} Paris’teki ortak garanti, Osmanlı’nın büyük güçlerle eşit kapasite kazandığını göstermez.`,
  ],
  table: balanceTable,
};

/* Örnek 1: rol değişimlerini say */
export const roleActors232: readonly Actor232[] = ["Rusya", "İngiltere", "Fransa", "Mısır (Mehmet Ali Paşa)"];
export const roleSummary232 = roleActors232.map((a) => ({ actor: a, roles: rolesOf232(a), changes: roleChanges232(a) }));
const maxChanges = Math.max(...roleSummary232.map((r) => r.changes));
export const mostChanging232 = roleSummary232.filter((r) => r.changes === maxChanges).map((r) => r.actor);
guard(roleSummary232.every((r) => r.changes >= 1), "dört aktörün her biri en az bir kez rol değiştirir");

/* Örnek 2: statü basamakları */
export interface Stage232 { series: "Sırp" | "Kırım"; key: DateKey232; label: string }
export const stages232: readonly Stage232[] = [
  { series: "Kırım", key: "yas", label: "Yaş: ilhakın tanınması" },
  { series: "Sırp", key: "edirne", label: "Edirne: özerklik" },
  { series: "Sırp", key: "sirpIsyan", label: "İsyan" },
  { series: "Kırım", key: "kirimBagimsiz", label: "Küçük Kaynarca: siyasi bağımsızlık" },
  { series: "Sırp", key: "berlin", label: "Berlin: bağımsızlık" },
  { series: "Kırım", key: "kirimIlhak", label: "Rusya’nın ilhakı" },
  { series: "Sırp", key: "bukres", label: "Bükreş: ayrıcalıklar" },
];
export const seriesOf232 = (s: Stage232["series"]) => stages232.filter((x) => x.series === s).sort((a, b) => D[a.key] - D[b.key]);
export const seriesGaps232 = (s: Stage232["series"]) => seriesOf232(s).slice(1).map((x, i) => ({ from: seriesOf232(s)[i], to: x, gap: D[x.key] - D[seriesOf232(s)[i].key] }));
const sirp = seriesOf232("Sırp"), kirim = seriesOf232("Kırım");
const sirpGaps = seriesGaps232("Sırp"), kirimGaps = seriesGaps232("Kırım");
const allGaps = [...sirpGaps, ...kirimGaps];
export const longestStageGap232 = allGaps.reduce((a, b) => (b.gap > a.gap ? b : a));
guard(allGaps.filter((g) => g.gap === longestStageGap232.gap).length === 1, "en uzun basamak arası tektir");
guard(kirimGaps.every((g) => g.gap === kirimGaps[0].gap), "Kırım basamakları eşit aralıklıdır");

export const balanceExamples232: WorkedExample[] = [
  {
    title: "Dört aktör, kaç rol değişimi?",
    prompt: `Tablodan rol bilgisi: ${roleSummary232.map((r) => `${r.actor}: ${r.roles.map((x) => `${x.year} ${x.role}`).join(", ")}`).join("; ")}. Her aktör için kronolojik sırada rolün kaç kez değiştiğini say. En çok rol değiştiren aktör hangisidir? Bu sonuç “bir devlet ya hep dost ya hep düşmandır” yargısıyla uyumlu mu?`,
    strategy: "Her aktörün rollerini yıl sırasıyla yaz; ardışık iki yıl arasında rol farklıysa bir değişim say.",
    steps: [
      ...roleSummary232.map((r) => ({ label: r.actor, expression: r.roles.map((x) => x.role).join(" → "), explanation: `${r.changes} değişim.` })),
      { label: "Karşılaştır", expression: `en çok: ${mostChanging232.join(", ")} (${maxChanges})`, explanation: "Her aktör en az bir kez rol değiştirir." },
    ],
    answer: `${roleSummary232.map((r) => `${r.actor} ${r.changes}`).join(", ")}. En çok değişen: ${and(mostChanging232)} (${maxChanges}’er kez). Yargı tabloyla uyumlu değildir; destek ve karşı rolü değişen tehdide göre yer değiştirir.`,
    check: `Değişim sayısı rol sayısından bir eksiği aşamaz: ${roleSummary232.map((r) => `${r.actor} ${r.changes} ≤ ${r.roles.length - 1}`).join("; ")}.`,
    pitfall: "Devlet adlarını değişmez dost-düşman kartları gibi ezberlemek; tabloda her satırın kendi yakın tehdidi vardır.",
  },
  {
    title: "İki statü dizisi: Sırp ve Kırım basamakları",
    prompt: `Kartlar karışık verilmiştir: ${stages232.map((s) => `${s.series} – ${s.label} (${D[s.key]})`).join("; ")}. Kartları iki diziye ayırıp her diziyi eskiden yeniye sırala. Ardışık basamaklar arasındaki süreleri bul. En uzun ara hangi iki basamak arasındadır?`,
    strategy: "Önce diziyi, sonra yılı kullan. Ayrıcalık, özerklik, bağımsızlık ve ilhak ayrı hukuki statülerdir; aynı yıla sıkıştırılmaz.",
    steps: [
      { label: "Sırp dizisi", expression: sirp.map((s) => D[s.key]).join(" → "), explanation: sirp.map((s) => s.label).join(" → ") + "." },
      { label: "Kırım dizisi", expression: kirim.map((s) => D[s.key]).join(" → "), explanation: kirim.map((s) => s.label).join(" → ") + "." },
      { label: "Süreler", expression: allGaps.map((g) => `${D[g.to.key]} − ${D[g.from.key]} = ${g.gap}`).join("; "), explanation: "Her fark bir önceki basamaktan geçen yıldır." },
      { label: "En uzun ara", expression: `${longestStageGap232.gap} yıl`, explanation: `${longestStageGap232.from.series}: ${longestStageGap232.from.label} → ${longestStageGap232.to.label}.` },
    ],
    answer: `Sırp: ${sirp.map((s) => `${s.label} (${D[s.key]})`).join(" → ")}. Kırım: ${kirim.map((s) => `${s.label} (${D[s.key]})`).join(" → ")}. En uzun ara ${longestStageGap232.gap} yıl, ${longestStageGap232.from.series} dizisinde: ${longestStageGap232.from.label} → ${longestStageGap232.to.label}.`,
    check: `Sırp farkları toplamı ${sirpGaps.map((g) => g.gap).join(" + ")} = ${sirpGaps.reduce((s, g) => s + g.gap, 0)} = ${D[sirp[sirp.length - 1].key]} − ${D[sirp[0].key]}. Kırım farkları ${kirimGaps.map((g) => g.gap).join(" ve ")} yıl.`,
    pitfall: "1774 siyasi bağımsızlığı ile 1783 ilhakını veya 1829 özerkliği ile 1878 bağımsızlığını aynı aşama saymak.",
  },
];

export const balanceSupplement232 = {
  title: balanceSection232.title,
  figureTitle: balanceSection232.title,
  paragraphs: balanceSection232.paragraphs,
  summary: `${balance232.map((b) => `${D[b.key]}: tehdit ${b.against.join("/")} → destek ${b.with.join("/")}`).join(" · ")}. Bedel: ${D.kirimSavasiGiris} dış borç, ${D.berlin} Kıbrıs yönetimi. Sırp ${sirp.map((s) => D[s.key]).join("→")}; Kırım ${kirim.map((s) => D[s.key]).join("→")}.`,
  appendSection: true as const,
  table: balanceTable,
  examples: balanceExamples232,
};

/* ---------- Dışa aktarım ---------- */

export const depth232Supplements = {
  "klasik-cag-osmanli-toplum-duzeni": [institutionSupplement232],
  "degisen-dunya-dengeleri-osmanli": [treatySupplement232],
  "degisim-caginda-avrupa-osmanli": [developmentSupplement232],
  "devrimler-caginda-devlet-toplum": [reformSupplement232],
  "denge-stratejisi": [balanceSupplement232],
};
