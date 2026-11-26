import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Türkçe paragraf derinleştirmesi (0.229.0): sıralama, cümle ekleme,
 * boşluk doldurma ve anlatım biçimleri. Kabul edilmiş rehberler değişmez;
 * tablo bölümü, iki özgün çözümlü örnek ve bölüm çizimi görüntüleme
 * katmanında eklenir. Bütün parçalar bu modül için yazılmış özgün
 * metinlerdir. Her cümle veri olarak tutulur: tanıttığı bilgiler (intro) ve
 * bağlandığı bilgiler (needs). “Bu depo”, “Ancak”, “Çünkü”, “Bu yüzden” gibi
 * bağlayan sözler birer ihtiyaçtır; ihtiyaç ya önceki cümlelerden birinde
 * (sonra) ya da tam önceki cümlede (hemen sonra) karşılanmalıdır. Doğru sıra,
 * ekleme yeri ve boşluk seçeneği bu bağlar kodda denetlenerek bulunur; tablo,
 * özet, örnek ve çizim okumaları aynı verilerden yazılır. Bu bir öğretim
 * modelidir: hazırlanmış parçaları inceler, her Türkçe paragrafı kendiliğinden
 * çözen genel bir dil çözümleyicisi değildir.
 */

const guard = (ok: boolean, claim: string) => {
  if (!ok) throw new Error(`depth229: veri bu yargıyı artık desteklemiyor: ${claim}`);
};
const q = (s: string) => `“${s}”`;
const cap = (s: string) => s.charAt(0).toLocaleUpperCase("tr-TR") + s.slice(1);
export const ROMAN229 = ["I", "II", "III", "IV", "V", "VI"] as const;

/* ---------- Ortak bağ modeli ---------- */

export interface Need229 {
  /** Cümlede bağı kuran söz. */
  clue: string;
  /** Gereken bilgi: önceki bir cümlenin intro listesinde bulunmalı. */
  tag: string;
  /** true: bilgi tam önceki cümlede verilmiş olmalı (bağlaç, “bunun üzerine”). */
  adjacent?: true;
  /** Bağ kopunca okura söylenen kısa gerekçe (yoksa öncülsüz kalır denir). */
  why?: string;
}
export interface Sent229 {
  id: string;
  text: string;
  /** Cümlenin parçadaki görevi (kısa not). */
  role: string;
  intro: readonly string[];
  needs: readonly Need229[];
}

export const needMet229 = (seq: readonly Sent229[], i: number, need: Need229) =>
  need.adjacent ? i > 0 && seq[i - 1].intro.includes(need.tag) : seq.slice(0, i).some((s) => s.intro.includes(need.tag));
export const brokenNeeds229 = (seq: readonly Sent229[], i: number) => seq[i].needs.filter((n) => !needMet229(seq, i, n));
/** Soldan sağa okurken ilk kopan bağ; hepsi karşılanıyorsa null. */
export const firstBreak229 = (seq: readonly Sent229[]) => {
  for (let i = 0; i < seq.length; i++) {
    const broken = brokenNeeds229(seq, i);
    if (broken.length) return { index: i, sentence: seq[i], need: broken[0] };
  }
  return null;
};
export const coherent229 = (seq: readonly Sent229[]) => firstBreak229(seq) === null;

export function permutations229<T>(xs: readonly T[]): T[][] {
  if (xs.length <= 1) return [xs.slice()];
  return xs.flatMap((x, i) => permutations229([...xs.slice(0, i), ...xs.slice(i + 1)]).map((rest) => [x, ...rest]));
}
const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));

/** Yalnız `active` cümlelerin bağları sayılırsa kaç diziliş kalır? */
export const ordersWith229 = (sents: readonly Sent229[], active: ReadonlySet<string>) =>
  permutations229(sents).filter((seq) => seq.every((s, i) => !active.has(s.id) || brokenNeeds229(seq, i).length === 0));
export const validOrders229 = (sents: readonly Sent229[]) => permutations229(sents).filter(coherent229);

/** Bir bilgiyi tanıtan tek cümle (yoksa ya da birden çoksa hata). */
const providerOf = (sents: readonly Sent229[], tag: string) => {
  const found = sents.filter((s) => s.intro.includes(tag));
  guard(found.length === 1, `“${tag}” bilgisini tek bir cümle tanıtır`);
  return found[0];
};
const byId = (sents: readonly Sent229[], id: string) => {
  const s = sents.find((x) => x.id === id);
  if (!s) throw new Error(`depth229: ${id} yok`);
  return s;
};
const orderText = (seq: readonly Sent229[], sep = " → ") => seq.map(({ id }) => id).join(sep);

/* =================================================================
 * 1 · Paragrafta sıralama: bağ kısıtlarıyla dizilişleri ele
 * ================================================================= */

/** Bölüm parçası: cümleler karışık harflerle verilir. */
export const tankSents229: readonly Sent229[] = [
  { id: "A", text: "Ancak yaz ortasında yağış kesilince depo boşaldı ve sulama durdu.", role: "beklentiyi kırar", intro: ["boşalma"], needs: [{ clue: "Ancak … sulama durdu", tag: "sulama", adjacent: true }] },
  { id: "B", text: "Bu depo, ilk yağışlı haftada yarısına kadar doldu.", role: "depoyu işletir", intro: ["biriken su"], needs: [{ clue: "Bu depo", tag: "depo" }] },
  { id: "C", text: "Bu yüzden okul, suyu idareli kullanan damla sulama hortumlarına geçti.", role: "sonucu verir", intro: [], needs: [{ clue: "Bu yüzden", tag: "boşalma", adjacent: true }] },
  { id: "D", text: "Bir okul, çatıdan akan yağmur suyunu toplamak için bahçeye büyük bir depo yerleştirdi.", role: "konuyu açar", intro: ["depo"], needs: [] },
  { id: "E", text: "Öğrenciler biriken suyu bahar boyunca fidanları sulamada kullandı.", role: "suyun kullanımını anlatır", intro: ["sulama"], needs: [{ clue: "biriken suyu", tag: "biriken su" }] },
];
export const tankTotal229 = factorial(tankSents229.length);
export const tankOrders229 = validOrders229(tankSents229);
guard(tankOrders229.length === 1, "bölüm parçasında bütün bağları karşılayan tek sıra vardır");
export const tankOrder229 = tankOrders229[0];
export const tankOpeners229 = tankSents229.filter((s) => s.needs.length === 0);
guard(tankOpeners229.length === 1 && tankOpeners229[0] === tankOrder229[0], "öncül istemeyen tek cümle girişe gelir");

/** Çözüm sırasıyla kısıtlar eklenir; her adımda kalan diziliş sayısı kaba kuvvetle sayılır. */
export const tankSteps229 = tankOrder229.map((s, k) => {
  const active = new Set(tankOrder229.slice(0, k + 1).map(({ id }) => id));
  const remaining = ordersWith229(tankSents229, active);
  return { sentence: s, remaining, count: remaining.length };
});
guard(tankSteps229[0].count === tankTotal229, "giriş cümlesinin bağı yoktur, diziliş sayısı değişmez");
guard(tankSteps229.every((st, k) => k === 0 || st.count < tankSteps229[k - 1].count), "sonraki her cümlenin bağı diziliş sayısını küçültür");
guard(tankSteps229.at(-1)!.count === 1, "bütün bağlar birlikte tek sıra bırakır");

export const constraintText229 = (sents: readonly Sent229[], need: Need229) =>
  `${providerOf(sents, need.tag).id} cümlesinden ${need.adjacent ? "hemen sonra" : "sonra"}`;
const adjacentPairs = tankSents229.filter((s) => s.needs.some((n) => n.adjacent));
guard(adjacentPairs.length === 2, "parçada iki “hemen sonra” bağı vardır");
const blockStart = providerOf(tankSents229, adjacentPairs.find((s) => s.id === "A")!.needs[0].tag);
const block = [blockStart, ...tankOrder229.slice(tankOrder229.indexOf(blockStart) + 1)];
guard(block.map(({ id }) => id).join("") === "EAC" && block.slice(1).every((s) => s.needs.some((n) => n.adjacent)), "E, A ve C hemen sonra bağlarıyla bir blok olur");

const counts = tankSteps229.map(({ count }) => count);
const tankTable = {
  layout: "table" as const,
  headers: ["Cümle", "Bağlayan söz", "Kısıt", "Kalan sıra"],
  rows: tankSteps229.map(({ sentence: s, count }) => [
    `${s.id}: ${s.text}`,
    s.needs.length ? s.needs.map((n) => q(n.clue)).join(", ") : "yok",
    s.needs.length ? s.needs.map((n) => constraintText229(tankSents229, n)).join("; ") : "giriş adayı: öncül istemez",
    String(count),
  ]),
};

const needOf = (s: Sent229) => s.needs[0];
const [t0, t1, t2, t3, t4] = tankOrder229;
guard(needOf(t3).clue.startsWith("Ancak") && needOf(t3).adjacent === true && needOf(t4).adjacent === true && !needOf(t1).adjacent && !needOf(t2).adjacent,
  "gönderme cümleleri “sonra”, bağlaç cümleleri “hemen sonra” kısıtı taşır");
export const tankSection229: GuideSection = {
  title: "Bağ kısıtlarıyla olası sıraları tek sıraya indir",
  paragraphs: [
    `Karışık verilen beş cümle: ${tankSents229.map((s) => `${s.id}) ${s.text}`).join(" ")}`,
    `Her cümlenin bağlayan sözünü bir kısıta çevir. Gönderme (${q(needOf(t1).clue)}, ${q(needOf(t2).clue)}) öncülün daha önce bir yerde verilmesini ister: “sonra”. Cümle başındaki bağlaç (${q(needOf(t3).clue.split(" ")[0])}, ${q(needOf(t4).clue)}) bağlandığı cümleyi tam önünde ister: “hemen sonra”. Öncül istemeyen tek cümle ${t0.id}’dir; giriş adayı odur.`,
    `Beş cümle kısıtsız ${tankTotal229} biçimde dizilir. Kısıtları çözüm sırasıyla ekleyince kalan sıra sayısı ${counts.join(" → ")} olur. ${block.map(({ id }) => id).join(", ")} cümleleri “hemen sonra” bağlarıyla bir blok kurar. Bütün dizilişler tek tek denenince yalnız ${orderText(tankOrder229)} bütün bağları karşılar.`,
  ],
  table: tankTable,
};

/* Örnek 1: sesli kitap odası; üçüncü cümle sorulur. */
export const roomSents229: readonly Sent229[] = [
  { id: "I", text: "Çünkü odanın penceresi işlek bir caddeye bakıyordu.", role: "nedeni verir", intro: ["pencere"], needs: [{ clue: "Çünkü", tag: "dış ses", adjacent: true }] },
  { id: "II", text: "Bir halk kütüphanesi, gönüllülerin okuduğu sesli kitaplar için küçük bir kayıt odası açtı.", role: "konuyu açar", intro: ["oda"], needs: [] },
  { id: "III", text: "Kütüphane bu sorunu gidermek için pencereye kalın bir perde taktı.", role: "çözümü anlatır", intro: [], needs: [{ clue: "bu sorunu", tag: "dış ses" }, { clue: "pencereye", tag: "pencere" }] },
  { id: "IV", text: "Kayıtlar dinlenince bazı bölümlerde sokaktan gelen seslerin duyulduğu fark edildi.", role: "sorunu ortaya koyar", intro: ["dış ses"], needs: [{ clue: "Kayıtlar", tag: "kayıt" }] },
  { id: "V", text: "Bu odada ilk ay birkaç kitap kaydedildi.", role: "odayı işletir", intro: ["kayıt"], needs: [{ clue: "Bu odada", tag: "oda" }] },
];
export const roomOrders229 = validOrders229(roomSents229);
guard(roomOrders229.length === 1, "sesli kitap parçasında tek sıra vardır");
export const roomOrder229 = roomOrders229[0];
export const roomAsked229 = 3;
export const roomAnswer229 = roomOrder229[roomAsked229 - 1];
guard(roomSents229.filter((s) => s.needs.length === 0).length === 1, "sesli kitap parçasında öncülsüz tek cümle vardır");
const rOf = (id: string) => byId(roomSents229, id);
const roomList = roomSents229.map((s) => `${s.id}. ${s.text}`).join(" ");

/* Örnek 2: takas günü; iki aday sıra karşılaştırılır. */
export const swapSents229: readonly Sent229[] = [
  { id: "I", text: "Bu kitapların bir kısmı yırtık ya da eksik sayfalıydı.", role: "sorunu ortaya koyar", intro: ["hasar"], needs: [{ clue: "Bu kitapların", tag: "kitaplar" }] },
  { id: "II", text: "Masada gönüllüler, yırtık sayfaları yapıştırıp kapakları sağlamlaştırdı.", role: "çözümün işleyişi", intro: [], needs: [{ clue: "Masada", tag: "masa" }] },
  { id: "III", text: "Bir apartmanın sakinleri, kullanmadıkları eşyaları değiş tokuş etmek için ayda bir takas günü düzenledi.", role: "konuyu açar", intro: ["takas günü"], needs: [] },
  { id: "IV", text: "Bu yüzden ikinci takas gününden önce bir onarım masası kuruldu.", role: "sonucu verir", intro: ["masa"], needs: [{ clue: "Bu yüzden", tag: "hasar", adjacent: true }] },
  { id: "V", text: "İlk takas gününde en çok çocuk kitapları el değiştirdi.", role: "ilk gözlem", intro: ["kitaplar"], needs: [{ clue: "İlk takas gününde", tag: "takas günü" }] },
];
const sOf = (id: string) => byId(swapSents229, id);
export const swapCandidates229 = [["III", "V", "IV", "I", "II"], ["III", "V", "I", "IV", "II"]].map((ids) => ids.map(sOf));
export const swapChecks229 = swapCandidates229.map((seq) => ({ seq, br: firstBreak229(seq) }));
export const swapValid229 = swapChecks229.findIndex(({ br }) => br === null);
const swapBad = swapChecks229.find(({ br }) => br !== null)!;
guard(swapChecks229.filter(({ br }) => br === null).length === 1, "iki aday sıradan yalnız biri bütün bağları karşılar");
guard(validOrders229(swapSents229).length === 1 && orderText(validOrders229(swapSents229)[0]) === orderText(swapCandidates229[swapValid229]), "geçerli aday, bütün dizilişler içindeki tek sıradır");
const swapList = swapSents229.map((s) => `${s.id}. ${s.text}`).join(" ");
const candText = (k: number) => `Sıra ${k + 1}: ${orderText(swapCandidates229[k], "–")}`;
const badBreak = swapBad.br!;
const badBefore = swapBad.seq[badBreak.index - 1];

export const orderExamples229: WorkedExample[] = [
  {
    title: "Kısıtları yaz, istenen sıradaki cümleyi oku",
    prompt: `${roomList} Bu cümlelerle anlamlı bir paragraf oluşturulursa baştan ${roomAsked229}. cümle hangisi olur?`,
    strategy: "Her bağlayan sözü “sonra” ya da “hemen sonra” kısıtına çevir. Öncül istemeyen cümleyle başla, zinciri kur, sonra soru kökünün istediği sırayı oku.",
    steps: [
      { label: "Giriş adayı", expression: `${roomOrder229[0].id}: öncül istemez`, explanation: `Öbür dört cümle ${roomSents229.filter((s) => s.needs.length).map((s) => q(s.needs[0].clue)).join(", ")} sözleriyle önceki bir bilgiye dayanır.` },
      { label: "Gönderme zinciri", expression: `${rOf("V").id} (${q(rOf("V").needs[0].clue)}) ${rOf("II").id}’den sonra; ${rOf("IV").id} (${q(rOf("IV").needs[0].clue)}) ${rOf("V").id}’ten sonra`, explanation: "Oda önce açılır, odada kayıt yapılır, kayıtlar dinlenince sorun görülür." },
      { label: "Bağlaç kısıtı", expression: `${rOf("I").id} (${q(rOf("I").needs[0].clue)}) ${rOf("IV").id}’ten hemen sonra`, explanation: "Çünkü, duyulan dış sesin nedenini verir; sonucu söyleyen cümlenin tam arkasına gelir." },
      { label: "Kalan cümle", expression: `${rOf("III").id}: ${q(rOf("III").needs[0].clue)} ve ${q(rOf("III").needs[1].clue)}`, explanation: "Sorun ve pencere tanıtılmadan perde çözümü anlatılamaz; bu cümle sona kalır." },
      { label: "Sıra", expression: orderText(roomOrder229), explanation: `Bütün ${factorial(roomSents229.length)} diziliş denenince bağları karşılayan tek sıra budur.` },
    ],
    answer: `Baştan ${roomAsked229}. cümle ${roomAnswer229.id} olur. Sıra ${orderText(roomOrder229)}.`,
    check: `${roomAnswer229.id}, önündeki ${roomOrder229[roomAsked229 - 2].id} cümlesinin kaydını kullanır ve ardındaki ${roomOrder229[roomAsked229].id} cümlesine (${q(roomOrder229[roomAsked229].needs[0].clue)}) gereken sonucu verir.`,
    pitfall: "Doğru sırayı kurup soru kökündeki “üçüncü cümle” yerine ilk ya da son cümleyi işaretlemek.",
  },
  {
    title: "İki aday sıradan doğrusunu ilk kopan bağla ayır",
    prompt: `${swapList} Bu cümlelerle paragraf kurulurken iki sıra öneriliyor. ${candText(0)}. ${candText(1)}. Hangi sıra doğrudur; öbüründe ilk kopan bağ nedir?`,
    strategy: "İki sırayı soldan sağa birlikte oku. Her cümlede bağlayan sözün öncülünü ara; ilk kopan bağ iki adayı ayırır.",
    steps: [
      { label: "Ortak başlangıç", expression: `${swapCandidates229[0].slice(0, 2).map(({ id }) => id).join("–")}`, explanation: `İki sıra da konuyu açan ${sOf("III").id} ile başlar; ${sOf("V").id}, ${q(sOf("V").needs[0].clue)} ile ona bağlanır.` },
      { label: "Ayrıldıkları yer", expression: `${badBreak.index + 1}. sıra: ${badBreak.sentence.id} (${q(badBreak.need.clue)})`, explanation: `${q(badBreak.need.clue)} önündeki cümlenin sonucunu ister; ${badBefore.id} yalnız el değiştiren kitaplardan söz eder, onarımı gerektiren bir sorun söylemez.` },
      { label: "Doğru aday", expression: candText(swapValid229), explanation: `${sOf("I").id} hasarı tanıtır, ${sOf("IV").id} hemen arkasından sonucu verir, ${sOf("II").id} kurulan masayı kullanır.` },
      { label: "Kaba kuvvet denetimi", expression: `${factorial(swapSents229.length)} dizilişte tek sıra: ${orderText(validOrders229(swapSents229)[0], "–")}`, explanation: "Bütün dizilişler denendiğinde de yalnız bu aday kalır." },
    ],
    answer: `Sıra ${swapValid229 + 1} doğrudur. Öbür sırada ${badBreak.index + 1}. cümle ${badBreak.sentence.id}’ün ${q(badBreak.need.clue)} bağı kopar.`,
    check: `Doğru sırada ${q(sOf("IV").needs[0].clue)}, hasarı söyleyen ${sOf("I").id} cümlesinin hemen ardındadır; ${q(sOf("II").needs[0].clue)} da masayı kuran ${sOf("IV").id}’ten sonra gelir.`,
    pitfall: "Aynı konudaki iki cümleyi yan yana diye bağlı saymak. “Bu yüzden” bir önceki cümlenin nedenine dayanmalıdır.",
  },
];
guard(roomAnswer229.id === "IV" && swapValid229 === 1 && badBreak.sentence.id === "IV", "örnek cevapları adımlardaki adlarla uyuşur");

export const orderSupplement229 = {
  title: tankSection229.title,
  figureTitle: tankSection229.title,
  paragraphs: tankSection229.paragraphs,
  summary: `Bağlayan sözü kısıta çevir: gönderme → öncülden sonra; cümle başı bağlaç (Ancak, Bu yüzden, Çünkü) → bağlandığı cümleden hemen sonra. Öncülsüz cümle giriş adayıdır. Depo parçasında kalan sıra ${counts.join(" → ")}; tek sıra ${orderText(tankOrder229)}.`,
  appendSection: true as const,
  table: tankTable,
  examples: orderExamples229,
};

/* =================================================================
 * 2 · Cümle ekleme: beş konumu sol ve sağ bağla sına
 * ================================================================= */

export interface Insertion229 { base: readonly Sent229[]; x: Sent229 }
export const insertAt229 = ({ base, x }: Insertion229, k: number) => [...base.slice(0, k), x, ...base.slice(k)];
export const insertionChecks229 = (ins: Insertion229) =>
  Array.from({ length: ins.base.length + 1 }, (_, k) => {
    const seq = insertAt229(ins, k);
    const left = brokenNeeds229(seq, k);
    const rest = seq.flatMap((s, i) => (i === k ? [] : brokenNeeds229(seq, i).map((need) => ({ sentence: s, need }))));
    return { k, seq, left, rest, fits: left.length === 0 && rest.length === 0 };
  });
export const fittingPoints229 = (ins: Insertion229) => insertionChecks229(ins).filter(({ fits }) => fits).map(({ k }) => k);
export const pointName229 = (base: readonly Sent229[], k: number) =>
  k === 0 ? `${base[0].id}. cümleden önce (başa)` : `${base[k - 1].id}. cümleden sonra${k === base.length ? " (sona)" : ""}`;

export const bikeIns229: Insertion229 = {
  base: [
    { id: "I", text: "Bir ilçe belediyesi, öğrencilerin okula bisikletle gelebilmesi için ödünç bisiklet noktaları kurdu.", role: "konuyu açar", intro: ["bisiklet"], needs: [] },
    { id: "II", text: "İlk dönemde noktalardaki bisikletlerin çoğu her sabah kullanıldı.", role: "yoğun kullanım", intro: ["yoğun kullanım"], needs: [{ clue: "noktalardaki bisikletlerin", tag: "bisiklet" }] },
    { id: "III", text: "Bu sorunu çözmek için okul önlerine ek park yerleri yapıldı.", role: "çözüm", intro: ["park yeri"], needs: [{ clue: "Bu sorunu", tag: "park sorunu" }] },
    { id: "IV", text: "Park yerleri açılınca bisikletler düzenli biçimde bırakılmaya başlandı.", role: "sonuç", intro: [], needs: [{ clue: "Park yerleri", tag: "park yeri" }] },
  ],
  x: { id: "X", text: "Ancak okul önlerinde bisikletleri bırakacak yer yetmedi.", role: "sorunu tanıtır", intro: ["park sorunu"], needs: [{ clue: "Ancak", tag: "yoğun kullanım", adjacent: true }, { clue: "bisikletleri", tag: "bisiklet" }] },
};
export const bikeChecks229 = insertionChecks229(bikeIns229);
export const bikePoints229 = fittingPoints229(bikeIns229);
guard(bikePoints229.length === 1, "bisiklet parçasında eklenecek cümleye uyan tek konum vardır");
export const bikePoint229 = bikePoints229[0];
const bikeGap = bikeIns229.base.flatMap((s, i) => brokenNeeds229(bikeIns229.base, i).map((need) => ({ s, need })));
guard(bikeGap.length === 1 && bikeIns229.x.intro.includes(bikeGap[0].need.tag), "eklemeden önce metinde tek kopukluk vardır ve onu yalnız yeni cümle kapatır");
guard(bikeChecks229.filter(({ left }) => left.length === 0).length === 1, "sol bağı karşılayan tek konum vardır");
guard(bikeChecks229.some(({ left, rest }) => left.length > 0 && rest.length === 0) && bikeChecks229.some(({ left, rest }) => left.length > 0 && rest.length > 0),
  "yanlış konumların bir kısmında yalnız sol bağ, bir kısmında iki bağ birden kopar");

const leftText = (ins: Insertion229, c: (typeof bikeChecks229)[number]) =>
  ins.x.needs.map((n) => `${q(n.clue)} ${c.left.includes(n) ? "kopar" : "karşılanır"}`).join("; ");
const restText = (c: (typeof bikeChecks229)[number], gapNeed: Need229) =>
  c.rest.length ? c.rest.map(({ sentence, need }) => `${sentence.id}: ${q(need.clue)} öncülsüz`).join("; ") : `${q(gapNeed.clue)} karşılanır`;
const bikeTable = {
  layout: "table" as const,
  headers: ["Konum", "Sol bağ: yeni cümlenin ihtiyacı", "Sağ bağ: sonraki cümlelerin ihtiyacı", "Sonuç"],
  rows: bikeChecks229.map((c) => [cap(pointName229(bikeIns229.base, c.k)), leftText(bikeIns229, c), restText(c, bikeGap[0].need), c.fits ? "uyar" : "uymaz"]),
};
const bx = bikeIns229.x;
const bikeLeftOnly = bikeChecks229.filter(({ left, rest }) => left.length > 0 && rest.length === 0).map(({ k }) => cap(pointName229(bikeIns229.base, k)));
const bikeBoth = bikeChecks229.filter(({ left, rest }) => left.length > 0 && rest.length > 0).map(({ k }) => cap(pointName229(bikeIns229.base, k)));
const [bxAncak, bxBike] = bx.needs;
export const bikeSection229: GuideSection = {
  title: "Beş olası konumu iki bağla tek tek sına",
  paragraphs: [
    `Parça: ${bikeIns229.base.map((s) => `${s.id}. ${s.text}`).join(" ")} Eklenecek cümle: ${q(bx.text)}`,
    `Eklemeden önce metindeki kopukluğu bul: ${bikeGap[0].s.id}. cümledeki ${q(bikeGap[0].need.clue)} hiçbir öncüle dönmüyor. Yeni cümle bu sorunu tanıtır; demek ki ${bikeGap[0].s.id}’ten önce gelmelidir. Kendi ihtiyacı da iki tanedir: ${q(bxAncak.clue)} yoğun kullanımı söyleyen cümleyi tam önünde ister, ${q(bxBike.clue)} bisikletlerin tanıtılmış olmasını ister.`,
    `${bikeIns229.base.length} cümleli parçada ${bikeChecks229.length} konum vardır. Tablo her konumda iki bağı ayrı sınar. Yalnız ${pointName229(bikeIns229.base, bikePoint229)} iki bağ da karşılanır. ${bikeLeftOnly.join(" ve ")} yalnız sol bağ kopar. ${bikeBoth.join(" ve ")} iki bağ birden kopar.`,
  ],
  table: bikeTable,
};

/* Örnek 1: kompost kasası; numaralı konumlardan biri sorulur. */
export const compostIns229: Insertion229 = {
  base: [
    { id: "1", text: "Okulun bahçe kulübü, yemekhaneden çıkan sebze kabuklarını toplamaya başladı.", role: "konuyu açar", intro: ["kabuk"], needs: [] },
    { id: "2", text: "Kabuklar, bahçenin köşesindeki tahta bir kasada kuru yapraklarla karıştırıldı.", role: "karışımı kurar", intro: ["kasa", "karışım"], needs: [{ clue: "Kabuklar", tag: "kabuk" }] },
    { id: "3", text: "Bu termometre, kasanın ortasının birkaç gün içinde ısındığını gösterdi.", role: "ölçümü verir", intro: ["ısınma"], needs: [{ clue: "Bu termometre", tag: "termometre" }] },
    { id: "4", text: "Isınan karışım birkaç ay sonra koyu renkli, toprak kokulu bir gübreye dönüştü.", role: "sonuç", intro: [], needs: [{ clue: "Isınan karışım", tag: "ısınma" }] },
  ],
  x: { id: "X", text: "Üyeler, karışımın sıcaklığını izlemek için kasaya uzun uçlu bir termometre yerleştirdi.", role: "aracı tanıtır", intro: ["termometre"], needs: [{ clue: "karışımın", tag: "karışım" }, { clue: "kasaya", tag: "kasa" }] },
};
export const compostChecks229 = insertionChecks229(compostIns229);
export const compostPoints229 = fittingPoints229(compostIns229);
guard(compostPoints229.length === 1, "kompost parçasında tek uygun konum vardır");
export const compostLabel229 = ROMAN229[compostPoints229[0]];
const compostText = compostIns229.base.map((s, i) => `(${ROMAN229[i]}) ${s.text}`).join(" ") + ` (${ROMAN229[compostIns229.base.length]})`;
const cOf = (id: string) => byId(compostIns229.base, id);

/* Örnek 2: tarama cihazı; iki aday aynı adı taşır, bağlaç ayırır. */
export const scanIns229: Insertion229 = {
  base: [
    { id: "I", text: "Bir müze, eski fotoğrafları korumak için yeni bir tarama cihazı aldı.", role: "konuyu açar", intro: ["cihaz"], needs: [] },
    { id: "II", text: "Cihaz ilk hafta yalnız siyah beyaz fotoğrafları taradı.", role: "ilk kullanım", intro: ["siyah beyaz"], needs: [{ clue: "Cihaz", tag: "cihaz" }] },
    { id: "III", text: "Renkli fotoğraflara geçilince cihaz bazı tonları soluk gösterdi.", role: "sorun", intro: ["soluk ton"], needs: [{ clue: "geçilince", tag: "siyah beyaz" }, { clue: "cihaz", tag: "cihaz" }] },
    { id: "IV", text: "Bu ayardan sonra renkler asıllarına yakın çıktı.", role: "sonuç", intro: [], needs: [{ clue: "Bu ayardan", tag: "ayar" }] },
  ],
  x: { id: "X", text: "Bunun üzerine teknisyen, cihazın renk ayarını yeniden yaptı.", role: "çözüm", intro: ["ayar"], needs: [{ clue: "Bunun üzerine", tag: "soluk ton", adjacent: true }, { clue: "cihazın", tag: "cihaz" }] },
};
export const scanChecks229 = insertionChecks229(scanIns229);
export const scanPoints229 = fittingPoints229(scanIns229);
guard(scanPoints229.length === 1, "tarama parçasında tek uygun konum vardır");
export const scanPoint229 = scanPoints229[0];
const scanX = scanIns229.x;
/** “cihazın” bağını karşılayan, yani ilk bakışta aday görünen konumlar. */
export const scanNameFits229 = scanChecks229.filter((c) => !c.left.includes(scanX.needs[1]) && c.rest.length === 0).map(({ k }) => k);
guard(scanNameFits229.length >= 2 && scanNameFits229.includes(scanPoint229), "ad bağı birden çok konumda karşılanır; ayıran bağlaçtır");
const scanDecoy = scanNameFits229.filter((k) => k !== scanPoint229);

export const insertExamples229: WorkedExample[] = [
  {
    title: "Numaralı yerlerden aracı tanıtan konumu seç",
    prompt: `Parçada (I)–(V) yerleri cümlelerin önünü ve sonunu gösterir. ${compostText} Bu parçaya ${q(compostIns229.x.text)} cümlesi numaralanmış yerlerden hangisine getirilmelidir?`,
    strategy: "Önce metindeki öncülsüz göndermeyi bul. Sonra yeni cümlenin kendi ihtiyaçlarını yaz ve iki bağı birlikte karşılayan tek yeri ara. Cevabı soru kökünün istediği numara biçimiyle ver.",
    steps: [
      { label: "Kopukluk", expression: `${q(cOf("3").needs[0].clue)} öncülsüz`, explanation: "Parçada hiçbir cümle termometreden söz etmiyor; yeni cümle onu tanıtır. Yeni cümle bu cümleden önce gelmelidir." },
      { label: "Sol ihtiyaç", expression: `${compostIns229.x.needs.map((n) => q(n.clue)).join(" ve ")} → kasa ve karışım tanıtılmış olmalı`, explanation: `İkisini de “Kabuklar, … bir kasada … karıştırıldı.” cümlesi verir; yeni cümle onun ardından gelir.` },
      { label: "Konumları sına", expression: compostChecks229.map((c) => `${ROMAN229[c.k]} ${c.fits ? "uyar" : "uymaz"}`).join(", "), explanation: "Öndeki yerlerde kasa yok; arkadaki yerlerde “Bu termometre” öncülsüz kalır." },
      { label: "Cevap biçimi", expression: `(${compostLabel229}) yeri`, explanation: "Soru konumu doğrudan soruyor; cümle numarası değil, yerin numarası işaretlenir." },
    ],
    answer: `${compostLabel229} numaralı yere getirilmelidir.`,
    check: `Üçlü okuma: karıştırma cümlesi → termometreyi yerleştirme → ${q(cOf("3").needs[0].clue)}. ${cOf("4").id}. sıradaki ${q(cOf("4").needs[0].clue)} da ısınmayı gösteren cümlenin arkasında kalır.`,
    pitfall: "Yeni cümlede karışım geçtiği için onu son cümlenin yanına koymak. Bu yerde “Bu termometre” öncülsüz kalır.",
  },
  {
    title: "Aynı ad iki yerde uyunca bağlaçla karar ver",
    prompt: `${scanIns229.base.map((s) => `${s.id}. ${s.text}`).join(" ")} Bu parçaya ${q(scanX.text)} cümlesi hangi cümleden sonra eklenmelidir?`,
    strategy: "Ad tekrarı birden çok yerde uyabilir. Her aday için önceki ve sonraki bağı ayrı oku; adaylar ayrıldığı bağla elenir.",
    steps: [
      { label: "Sağ bağ", expression: `${q(byId(scanIns229.base, "IV").needs[0].clue)} → ayar önce yapılmış olmalı`, explanation: "Yeni cümle IV’ten önce gelmeli; sonda ayar öncülsüz kalır." },
      { label: "Ad bağı", expression: `${q(scanX.needs[1].clue)}: ${scanNameFits229.map((k) => pointName229(scanIns229.base, k)).join(", ")} uyar`, explanation: "Cihaz ilk cümlede tanıtıldığı için bu bağ adayları tek başına ayırmaz." },
      { label: "Ayıran bağ", expression: `${q(scanX.needs[0].clue)} → tam önde soluk ton sorunu`, explanation: `Bunun üzerine, hemen önceki cümlenin ortaya koyduğu duruma yanıt verir. Sorun yalnız III. cümlede söylenir.` },
      { label: "Elenen aday", expression: scanDecoy.map((k) => pointName229(scanIns229.base, k)).join(", "), explanation: "Bu yerlerde önceki cümle bir sorun söylemez; teknisyenin neye yanıt verdiği belirsiz kalır." },
    ],
    answer: `${pointName229(scanIns229.base, scanPoint229)} eklenmelidir.`,
    check: `Okuma: III (soluk tonlar) → ${q(scanX.needs[0].clue)} ayar → ${q(byId(scanIns229.base, "IV").needs[0].clue)}. ${scanChecks229.length} konumdan yalnız bu konumda iki bağ da karşılanır.`,
    pitfall: "“Cihaz” sözcüğü geçtiği için ilk uygun görünen yere eklemek. Bağlaç, hangi cümleye yanıt verildiğini belirler.",
  },
];
guard(compostLabel229 === "III" && scanPoint229 === 3, "ekleme örneklerinin cevapları adımlardaki konumlarla uyuşur");

export const insertSupplement229 = {
  title: bikeSection229.title,
  figureTitle: bikeSection229.title,
  paragraphs: bikeSection229.paragraphs,
  summary: `Önce metindeki öncülsüz göndermeyi bul (${q(bikeGap[0].need.clue)}). Sonra her konumda sol bağı (yeni cümlenin ihtiyacı) ve sağ bağı (sonrakilerin ihtiyacı) ayrı sına. ${bikeChecks229.length} konumdan yalnız ${pointName229(bikeIns229.base, bikePoint229)} ikisi birden karşılanır.`,
  appendSection: true as const,
  table: bikeTable,
  examples: insertExamples229,
};

/* =================================================================
 * 3 · Boşluk doldurma: seçenekleri sol ve sağ bağla ele
 * ================================================================= */

export interface Option229 extends Sent229 {
  /** Seçeneğin işlevi (örnek, karşıtlık, yargı …). */
  fn: string;
  /** İşlevin bağlandığı bilgi: örneklenen yargı, kırılan beklenti. */
  of?: string;
}
export interface Blank229 {
  before: readonly Sent229[];
  after: readonly Sent229[];
  /** Boşluğu açan söz ve beklediği işlev. */
  frame?: { word: string; fn: string; of: string; why: string };
  options: readonly Option229[];
}
export const blankChecks229 = (b: Blank229) =>
  b.options.map((o) => {
    const seq: Sent229[] = [...b.before, o, ...b.after];
    const k = b.before.length;
    const left = brokenNeeds229(seq, k);
    const frameOk = !b.frame || (o.fn === b.frame.fn && o.of === b.frame.of);
    const right = b.after.flatMap((s, j) => brokenNeeds229(seq, k + 1 + j).map((need) => ({ sentence: s, need })));
    return { option: o, left, frameOk, right, fits: left.length === 0 && frameOk && right.length === 0 };
  });
export const blankAnswers229 = (b: Blank229) => blankChecks229(b).filter(({ fits }) => fits).map(({ option }) => option);

export const lampBlank229: Blank229 = {
  before: [
    { id: "1", text: "Bir köy okulunun öğrencileri, okul yolundaki sokak lambalarını bir hafta boyunca her akşam tek tek kontrol etti.", role: "konuyu açar", intro: ["kontrol"], needs: [] },
    { id: "2", text: "Kontrolün sonunda yolun köye yakın giriş bölümündeki lambaların her akşam yandığı görüldü.", role: "ilk bulgu", intro: ["giriş bölümü"], needs: [{ clue: "Kontrolün sonunda", tag: "kontrol" }] },
  ],
  after: [
    { id: "4", text: "Öğrenciler bu karanlık bölümün fotoğraflarını, tuttukları kontrol çizelgesiyle birlikte muhtarlığa gönderdi.", role: "sonuç", intro: [], needs: [{ clue: "bu karanlık bölümün", tag: "karanlık bölüm" }] },
  ],
  options: [
    { id: "A", fn: "ikinci bulgu", text: "Okula yakın son bölümdeki lambalar ise hafta boyunca hiç yanmadı; o bölüm her akşam karanlık kaldı.", role: "karşıt bulgu", intro: ["karanlık bölüm"], needs: [{ clue: "… ise", tag: "giriş bölümü", adjacent: true }] },
    { id: "B", fn: "genel yargı", text: "Ülkedeki bütün köy yollarının aydınlatması yetersizdir.", role: "kapsamı genişletir", intro: [], needs: [{ clue: "bütün köy yollarının", tag: "ülke geneli veri", why: "kapsamı aşar: yalnız bir yol kontrol edildi" }] },
    { id: "C", fn: "sonuç", text: "Bu yüzden yoldaki bütün lambaların ampulleri değiştirildi.", role: "sonuç", intro: [], needs: [{ clue: "Bu yüzden", tag: "arıza", adjacent: true, why: "önceki cümle bir arıza söylemez" }] },
    { id: "D", fn: "ayrıntı", text: "Giriş bölümündeki lambalar birbirine çok yakın dikilmişti.", role: "ayrıntı", intro: [], needs: [{ clue: "Giriş bölümündeki", tag: "giriş bölümü" }] },
    { id: "E", fn: "sonuç", text: "Muhtarlık bu karanlık bölüme hemen yeni bir direk dikti.", role: "sonuç", intro: [], needs: [{ clue: "bu karanlık bölüme", tag: "karanlık bölüm" }] },
  ],
};
export const lampChecks229 = blankChecks229(lampBlank229);
export const lampAnswers229 = blankAnswers229(lampBlank229);
guard(lampAnswers229.length === 1, "lamba parçasında boşluğa tek seçenek uyar");
export const lampAnswer229 = lampAnswers229[0];
guard(lampChecks229.filter(({ left }) => left.length === 0).length >= 2, "sol bağı birden çok seçenek karşılar; sağ bağ ayırır");
guard(lampChecks229.filter(({ right }) => right.length === 0).length === 1, "sağ bağı yalnız doğru seçenek karşılar");
const lampRightNeed = lampBlank229.after[0].needs[0];
const brokenText = (need: Need229) => `${q(need.clue)} ${need.why ? `→ ${need.why}` : "öncülsüz"}`;
const lampLeftOk = lampChecks229.filter(({ left }) => left.length === 0).map(({ option }) => option.id);
const lampTable = {
  layout: "table" as const,
  headers: ["Seçenek", "Sol bağ: önceki cümleler", "Sağ bağ: sonraki cümle", "Karar"],
  rows: lampChecks229.map((c) => [
    `${c.option.id}) ${c.option.text}`,
    c.left.length ? c.left.map(brokenText).join("; ") : c.option.needs.map((n) => `${q(n.clue)} karşılanır`).join("; "),
    c.right.length ? c.right.map(({ need }) => brokenText(need)).join("; ") : `${q(lampRightNeed.clue)} karşılanır`,
    c.fits ? "uyar" : "uymaz",
  ]),
};
const lampText = `${lampBlank229.before.map((s) => s.text).join(" ")} ( … ) ${lampBlank229.after.map((s) => s.text).join(" ")}`;
export const lampSection229: GuideSection = {
  title: "Seçenekleri sol ve sağ bağla tabloda ele",
  paragraphs: [
    `Parça: ${lampText}`,
    `Ortadaki boşluk iki yana bağlanır. Sol bağ, seçeneğin dayandığı bilginin önceki cümlelerde verilip verilmediğidir. Sağ bağ, sonraki cümledeki ${q(lampRightNeed.clue)} göndermesinin boşlukta karşılanıp karşılanmadığıdır. Kapsamı aşan yargı da bir sol bağ kopukluğudur: dayandığı veri parçada yoktur.`,
    `Tabloda ${lampChecks229.length} seçenek iki bağla ayrı sınanır. Sol bağı ${lampLeftOk.join(" ve ")} karşılar. Sağ bağı ise yalnız ${lampAnswer229.id} karşılar, çünkü karanlık bölümü yalnız o tanıtır. Boşluğa ${lampAnswer229.id} gelir.`,
  ],
  table: lampTable,
};

/* Örnek 1: “Örneğin” sonrası; seçenek genel yargıyı somutlaştırmalı. */
export const rampBlank229: Blank229 = {
  before: [{ id: "1", text: "Küçük düzenlemeler, bir binayı herkes için daha kolay kullanılır hâle getirebilir.", role: "genel yargı", intro: ["kolay kullanım"], needs: [] }],
  frame: { word: "Örneğin", fn: "örnek", of: "kolay kullanım", why: "genel yargıyı tek bir somut düzenlemeyle göstermeli" },
  after: [{ id: "3", text: "Bu rampa sayesinde tekerlekli sandalye kullananlar da bebek arabasıyla gelenler de kapıya kolayca ulaşıyor.", role: "örneğin açılımı", intro: [], needs: [{ clue: "Bu rampa", tag: "rampa" }] }],
  options: [
    { id: "A", fn: "örnek", of: "kolay kullanım", text: "kütüphanenin girişindeki merdivenin yanına alçak eğimli bir rampa yapıldı.", role: "somut düzenleme", intro: ["rampa"], needs: [] },
    { id: "B", fn: "yargı", of: "kolay kullanım", text: "binaların kolay kullanılması herkes için önemlidir.", role: "yargıyı yineler", intro: [], needs: [] },
    { id: "C", fn: "örnek", of: "görünüm", text: "kütüphanenin dış cephesi açık renge boyandı.", role: "başka özellik", intro: [], needs: [] },
    { id: "D", fn: "yargı", of: "kolay kullanım", text: "bütün binaların girişleri artık sorunsuz kullanılıyor.", role: "kapsamı genişletir", intro: [], needs: [{ clue: "bütün binaların", tag: "bütün binalara ait veri", why: "kapsamı aşar" }] },
    { id: "E", fn: "örnek", of: "kolay kullanım", text: "rampanın eğimi sonradan biraz daha azaltıldı.", role: "sonraki ayrıntı", intro: [], needs: [{ clue: "rampanın", tag: "rampa" }] },
  ],
};
export const rampChecks229 = blankChecks229(rampBlank229);
export const rampAnswers229 = blankAnswers229(rampBlank229);
guard(rampAnswers229.length === 1, "rampa parçasında tek seçenek uyar");
const rampFrameOk = rampChecks229.filter(({ frameOk }) => frameOk).map(({ option }) => option.id);

/* Örnek 2: “Oysa” sonrası; seçenek kurulan beklentiyi kırmalı. */
export const humidBlank229: Blank229 = {
  before: [
    { id: "1", text: "Ekip, sergi salonundaki nemi düşürmek için yeni bir cihaz çalıştırdı.", role: "konuyu açar", intro: ["cihaz"], needs: [] },
    { id: "2", text: "Cihazın ekranı, ilk gün nemin hedef değere indiğini gösterdi.", role: "beklenti kurar", intro: ["hedefe inildi"], needs: [{ clue: "Cihazın", tag: "cihaz" }] },
  ],
  frame: { word: "Oysa", fn: "karşıtlık", of: "hedefe inildi", why: "ekranın düşündürdüğü “nem düştü” beklentisini kırmalı" },
  after: [{ id: "4", text: "Bu farkı gören ekip, ölçümü salonun öbür köşesinde ikinci bir nem ölçerle yineledi.", role: "sonuç", intro: [], needs: [{ clue: "Bu farkı", tag: "fark" }] }],
  options: [
    { id: "A", fn: "karşıtlık", of: "hedefe inildi", text: "salonun duvarındaki ayrı nem ölçer, nemin hâlâ yüksek olduğunu gösteriyordu.", role: "beklentiyi kırar", intro: ["fark"], needs: [] },
    { id: "B", fn: "aynı yönde bilgi", of: "hedefe inildi", text: "cihazın ekranı ertesi gün de aynı değeri gösterdi.", role: "beklentiyi pekiştirir", intro: [], needs: [] },
    { id: "C", fn: "ilgisiz bilgi", of: "çerçeve", text: "sergideki tabloların çerçeveleri yeni boyanmıştı.", role: "konu dışı", intro: [], needs: [] },
    { id: "D", fn: "sonuç", of: "fark", text: "bu fark yüzünden cihaz hemen kapatıldı.", role: "erken sonuç", intro: [], needs: [{ clue: "bu fark", tag: "fark" }] },
    { id: "E", fn: "karşıtlık", of: "hedefe inildi", text: "hiçbir nem cihazı doğru ölçüm yapmaz.", role: "kapsamı genişletir", intro: [], needs: [{ clue: "hiçbir nem cihazı", tag: "bütün cihazlara ait veri", why: "kapsamı aşar" }] },
  ],
};
export const humidChecks229 = blankChecks229(humidBlank229);
export const humidAnswers229 = blankAnswers229(humidBlank229);
guard(humidAnswers229.length === 1, "nem parçasında tek seçenek uyar");
const humidFrameOk = humidChecks229.filter(({ frameOk }) => frameOk).map(({ option }) => option.id);
guard(rampFrameOk.length >= 2 && humidFrameOk.length >= 2, "çerçeve sözcüğü tek başına seçeneği bulmaz; sol ve sağ bağ da gerekir");

const blankPrompt = (b: Blank229) =>
  `${b.before.map((s) => s.text).join(" ")} ${b.frame ? `${b.frame.word} ( … )` : "( … )"} ${b.after.map((s) => s.text).join(" ")}`;
const optionList = (b: Blank229) => b.options.map((o) => `${o.id}) ${o.text}`).join(" ");
const failNote = (c: ReturnType<typeof blankChecks229>[number], b: Blank229) => {
  const notes: string[] = [];
  if (!c.frameOk && b.frame) notes.push(`${b.frame.word} işlevi yok (${c.option.fn})`);
  notes.push(...c.left.map(brokenText));
  if (c.right.length) notes.push(...c.right.map(({ need }) => brokenText(need)));
  return `${c.option.id}: ${notes.join("; ")}`;
};

export const blankExamples229: WorkedExample[] = [
  {
    title: "Örneğin sonrasına genel yargıyı somutlaştıran seçeneği koy",
    prompt: `${blankPrompt(rampBlank229)} Bu parçada boş bırakılan yere aşağıdakilerden hangisi getirilmelidir? ${optionList(rampBlank229)}`,
    strategy: "Boşluğu açan sözün beklediği işlevi yaz, sonra sağdaki göndermenin neyi istediğini bul. İkisini birlikte karşılayan tek seçenek kalır.",
    steps: [
      { label: "Çerçeve", expression: `${rampBlank229.frame!.word} → ${rampBlank229.frame!.fn}`, explanation: `Seçenek ${rampBlank229.frame!.why}. Bu işlevi ${rampFrameOk.join(" ve ")} taşır.` },
      { label: "Sağ bağ", expression: `${q(rampBlank229.after[0].needs[0].clue)} → rampa boşlukta tanıtılmalı`, explanation: "Sonraki cümle rampayı bilinen bir şey gibi anar." },
      { label: "Ele", expression: rampChecks229.filter(({ fits }) => !fits).map((c) => failNote(c, rampBlank229)).join(" · "), explanation: "B yargıyı yineler, C başka bir özelliği örnekler, D kapsamı genişletir, E rampayı tanıtmadan anar." },
      { label: "Kalan", expression: `${rampAnswers229[0].id}) ${rampAnswers229[0].text}`, explanation: "Hem örnek işlevi taşır hem de rampayı tanıtır." },
    ],
    answer: `${rampAnswers229[0].id} seçeneği getirilmelidir.`,
    check: `Parça: Küçük düzenlemeler … Örneğin ${rampAnswers229[0].text} ${rampBlank229.after[0].text} Gönderme ve örnek bağı ikisi de karşılanır.`,
    pitfall: "Genel yargıyı başka sözlerle yineleyen B’yi seçmek. Örneğin’den sonra yargının kendisi değil, onu gösteren somut durum gelir.",
  },
  {
    title: "Oysa sonrasına kurulan beklentiyi kıran bulguyu koy",
    prompt: `${blankPrompt(humidBlank229)} Bu parçada boş bırakılan yere aşağıdakilerden hangisi getirilmelidir? ${optionList(humidBlank229)}`,
    strategy: "Önce Oysa’dan önce hangi beklentinin kurulduğunu bul. Sonra o beklentiyi aynı salon ve aynı ölçüm çerçevesinde kıran, sağdaki “Bu farkı”yı da karşılayan seçeneği ara.",
    steps: [
      { label: "Beklenti", expression: `${humidBlank229.before[1].text}`, explanation: "Ekran, nemin düştüğünü düşündürür." },
      { label: "Çerçeve", expression: `${humidBlank229.frame!.word} → ${humidBlank229.frame!.fn}`, explanation: `Seçenek ${humidBlank229.frame!.why}. Bu işlevi ${humidFrameOk.join(" ve ")} taşır.` },
      { label: "Sağ bağ", expression: `${q(humidBlank229.after[0].needs[0].clue)} → iki ölçüm arasındaki fark boşlukta tanıtılmalı`, explanation: "Ekip bu fark yüzünden ölçümü yineler." },
      { label: "Ele", expression: humidChecks229.filter(({ fits }) => !fits).map((c) => failNote(c, humidBlank229)).join(" · "), explanation: "E de karşıtlık kurar; ama tek salondaki bir ölçümden bütün cihazlar hakkında yargıya geçer ve farkı tanıtmaz." },
    ],
    answer: `${humidAnswers229[0].id} seçeneği getirilmelidir.`,
    check: `Ekran “hedefe indi” der, duvardaki ölçer “hâlâ yüksek” der; bu fark, sonraki cümledeki ${q(humidBlank229.after[0].needs[0].clue)} ile karşılanır.`,
    pitfall: "Karşıtlık kurduğu için kapsamı aşan E’yi seçmek. Oysa bağı doğru kurulsa da dayanaksız genelleme sol bağı koparır.",
  },
];
guard(lampAnswer229.id === "A" && rampAnswers229[0].id === "A" && humidAnswers229[0].id === "A", "boşluk örneklerinin cevapları adımlardaki seçeneklerle uyuşur");

export const blankSupplement229 = {
  title: lampSection229.title,
  figureTitle: lampSection229.title,
  paragraphs: lampSection229.paragraphs,
  summary: `Her seçeneği iki bağla sına: sol bağ (dayandığı bilgi önceki cümlelerde var mı, kapsamı aşıyor mu) ve sağ bağ (sonraki göndermeyi karşılıyor mu). Lamba parçasında sol bağı ${lampLeftOk.join(" ve ")} karşılar, sağ bağı yalnız ${lampAnswer229.id}. Örneğin ve Oysa işlev ister, cevabı tek başına vermez.`,
  appendSection: true as const,
  table: lampTable,
  examples: blankExamples229,
};

/* =================================================================
 * 4 · Anlatım biçimleri: aynı konu, dört biçim, iki kanıt
 * ================================================================= */

export type Fn229 = "olay" | "nitelik" | "bilgi" | "sav" | "gerekçe" | "karşı görüş";
export type Mode229 = "öyküleyici anlatım" | "betimleyici anlatım" | "açıklayıcı anlatım" | "tartışmacı anlatım";
/** Dersteki düşünceyi geliştirme yolları listesi. */
export const WAYS229 = ["tanım", "örnek", "karşılaştırma", "tanık sözü", "sayısal veri", "benzetme"] as const;
export type Way229 = (typeof WAYS229)[number];
export interface Unit229 { text: string; fn: Fn229; way?: Way229 }

export const MODE_OF_FN229: Record<Fn229, Mode229> = {
  olay: "öyküleyici anlatım",
  nitelik: "betimleyici anlatım",
  bilgi: "açıklayıcı anlatım",
  sav: "tartışmacı anlatım",
  gerekçe: "tartışmacı anlatım",
  "karşı görüş": "tartışmacı anlatım",
};
const countFn = (units: readonly Unit229[], fn: Fn229) => units.filter((u) => u.fn === fn).length;
/**
 * Baskın biçim kuralı (hazırlanmış parçalar için): sav dayanağıyla birlikteyse
 * öbür birimler onu taşır → tartışmacı. Sav yoksa en az iki bağlı olay örgüyü
 * kurar → öyküleyici; betimleme sahneyi hazırlar. Olay zinciri de yoksa
 * nitelik ve bilgi birimlerinden çok olan belirler; eşitlik modelde hatadır.
 */
export function dominant229(units: readonly Unit229[]): Mode229 {
  if (countFn(units, "sav") > 0 && countFn(units, "gerekçe") > 0) return "tartışmacı anlatım";
  if (countFn(units, "olay") >= 2) return "öyküleyici anlatım";
  const [n, b] = [countFn(units, "nitelik"), countFn(units, "bilgi")];
  if (n === b) throw new Error("depth229: baskın biçim bu modelde belirsiz");
  return n > b ? "betimleyici anlatım" : "açıklayıcı anlatım";
}
export const usedModes229 = (units: readonly Unit229[]) => [...new Set(units.map((u) => MODE_OF_FN229[u.fn]))];
export const usedWays229 = (units: readonly Unit229[]) => WAYS229.filter((w) => units.some((u) => u.way === w));

export interface ModeRow229 { mode: Mode229; key: readonly [string, string]; first: string; second: string; weak: string; units: readonly Unit229[] }
const joinUnits = (units: readonly Unit229[]) => units.map((u) => u.text).join(" ");
/** Aynı konu (mahalle fırını), dört biçim; her örnek birimlere ayrılmış tek kısa parça. */
export const bakeryRows229: readonly ModeRow229[] = [
  {
    mode: "öyküleyici anlatım",
    key: ["olay bağı", "değişim"],
    first: "olay bağı: kişi, zaman ve mekânda birbirini ilerleten eylemler",
    second: "başlangıçtan yeni duruma değişim",
    weak: "önce, sonra gibi zaman sözleri; genel süreç anlatımında da bulunur",
    units: [
      { text: "Deniz sabah erkenden fırına gitti,", fn: "olay" },
      { text: "son kalan ekmeği aldı", fn: "olay" },
      { text: "ve eve dönünce kahvaltıyı hazırladı.", fn: "olay" },
    ],
  },
  {
    mode: "betimleyici anlatım",
    key: ["aynı an nitelikleri", "duyu ayrıntısı"],
    first: "aynı anda görülen nitelikler; olay ilerlemez",
    second: "duyu ayrıntısıyla canlandırma",
    weak: "eylem gibi görünen fiil: “vitrin caddeye bakıyordu” bir durum bildirir",
    units: [
      { text: "Fırının vitrini buğuluydu;", fn: "nitelik" },
      { text: "raflarda kızarmış ekmekler diziliydi", fn: "nitelik" },
      { text: "ve içeriyi sıcak bir anason kokusu sarmıştı.", fn: "nitelik" },
    ],
  },
  {
    mode: "açıklayıcı anlatım",
    key: ["öğrenilen kavram", "genel işleyiş"],
    first: "okurun öğrendiği kavram ya da işleyiş",
    second: "genel ilişki: belirli bir kişinin başından geçmez",
    weak: "açıkladı fiili; bir açıklamanın yapıldığını bildirmek öğretmek değildir",
    units: [
      { text: "Hamur mayalanırken maya, hamurdaki şekeri parçalayıp gaz çıkarır;", fn: "bilgi" },
      { text: "hamurda tutulan bu gaz hamuru kabartır.", fn: "bilgi" },
    ],
  },
  {
    mode: "tartışmacı anlatım",
    key: ["sav", "gerekçe"],
    first: "benimsetilmek istenen sav",
    second: "savı taşıyan gerekçe ya da karşılanan itiraz",
    weak: "öznel beğeni ya da soru cümlesi; tek başına sav kurmaz",
    units: [
      { text: "Mahalle fırınları korunmalıdır;", fn: "sav" },
      { text: "çünkü taze ekmeği yürüme uzaklığında almak, uzaktaki marketlere gidişi azaltır.", fn: "gerekçe" },
    ],
  },
];
for (const row of bakeryRows229) guard(dominant229(row.units) === row.mode && usedModes229(row.units).length === 1, `${row.mode} örneği kuralla kendi biçimini verir`);
guard(new Set(bakeryRows229.map(({ mode }) => mode)).size === 4, "dört satır dört ayrı biçimdir");
const bakeryTable = {
  layout: "table" as const,
  headers: ["Anlatım biçimi", "Birinci kanıt", "İkinci kanıt", "Tek başına yetmeyen ipucu", "Özgün örnek (fırın)"],
  rows: bakeryRows229.map((r) => [cap(r.mode), r.first, r.second, r.weak, joinUnits(r.units)]),
};
const fnSummary = (units: readonly Unit229[]) => {
  const fns = [...new Set(units.map((u) => u.fn))];
  return fns.map((f) => `${countFn(units, f)} ${f}`).join(" + ");
};
export const bakerySection229: GuideSection = {
  title: "Aynı konuda dört biçim: iki kanıtla ayırt et",
  paragraphs: [
    `Tablodaki dört kısa parçanın konusu aynıdır: mahalle fırını. Biçimi konu değil, birimlerin işlevi belirler. Her parçayı işlev birimlerine ayır: olay, nitelik, bilgi, sav ve gerekçe. Birimler: ${bakeryRows229.map((r) => `${r.mode.split(" ")[0]} örnekte ${fnSummary(r.units)}`).join(", ")}.`,
    "Baskın biçim için bu modelin kuralı şöyledir. Sav, gerekçesiyle birlikteyse öbür cümleler onu taşır ve biçim tartışmacıdır. Sav yoksa en az iki bağlı olay örgüyü kurar ve biçim öyküleyicidir; betimleme bu durumda sahneyi hazırlar. Olay zinciri de yoksa nitelik ile bilgiden hangisi ağır basıyorsa o belirler. Kural sözcük saymaz; birimin parçadaki görevine bakar.",
    `Her satırda iki kanıtı birlikte ara; tek ipucu yanıltabilir. Son sütundaki tuzak sözcükler başka biçimlerde de geçer. Düşünceyi geliştirme yolları (${WAYS229.join(", ")}) ayrı bir sınıflamadır: bunlar amaca hizmet eden araçlardır, biçimin kendisi değildir.`,
  ],
  table: bakeryTable,
};

/* Örnek 1: betimlemeyle açılan, olay zinciriyle ilerleyen parça. */
export const harborUnits229: readonly Unit229[] = [
  { text: "Sabahın ilk ışığında iskele ıslaktı.", fn: "nitelik" },
  { text: "Kayıkların boyaları solmuştu, halatlar yosun kokuyordu.", fn: "nitelik" },
  { text: "Mert ağları kayığa yükledi.", fn: "olay" },
  { text: "Motoru çalıştırıp koydan çıktı.", fn: "olay" },
  { text: "Öğlene doğru balıkla dolu kasalarla kıyıya döndü.", fn: "olay" },
];
export const harborUsed229 = usedModes229(harborUnits229);
export const harborDominant229 = dominant229(harborUnits229);
guard(harborUsed229.length === 2 && harborDominant229 === "öyküleyici anlatım", "iskele parçasında iki biçim kullanılır, öyküleyici baskındır");
const harborFirstEvent = harborUnits229.findIndex((u) => u.fn === "olay");
guard(harborUnits229.slice(0, harborFirstEvent).every((u) => u.fn === "nitelik") && harborUnits229.slice(harborFirstEvent).every((u) => u.fn === "olay"), "iskele parçasında betimleme önce gelir, olaylar onu izler");

/* Örnek 2: tartışmacı parça ve düşünceyi geliştirme yolları. */
/** Parçadaki kurmaca sayı (özgün metnin parçası, ölçülmüş veri değildir). */
export const EVENING_VISITORS229 = 35;
export const libraryUnits229: readonly Unit229[] = [
  { text: "Kimi yöneticiler, mahalle kütüphanesini akşamları açık tutmanın gereksiz bir masraf olduğunu düşünüyor.", fn: "karşı görüş" },
  { text: "Bence kütüphane akşamları da açık kalmalıdır.", fn: "sav" },
  { text: `Geçen ay deneme olarak akşam da açılan salona her akşam ortalama ${EVENING_VISITORS229} kişi geldi.`, fn: "gerekçe", way: "sayısal veri" },
  { text: "Kütüphanecilik alanında çalışan bir araştırmacı da “Akşam saatleri, gündüz işte ya da okulda olan okurlar için kütüphaneye ulaşmanın çoğu zaman tek yoludur.” diyor.", fn: "gerekçe", way: "tanık sözü" },
  { text: "Örneğin vardiyalı çalışan bir anne, çocuğuyla ancak akşam yedide gelebiliyor.", fn: "gerekçe", way: "örnek" },
];
export const libraryChoices229: readonly Way229[] = ["sayısal veri", "tanık sözü", "örnek", "benzetme"];
export const libraryUsedWays229 = usedWays229(libraryUnits229);
export const libraryMissing229 = libraryChoices229.filter((w) => !libraryUsedWays229.includes(w));
export const libraryDominant229 = dominant229(libraryUnits229);
guard(libraryMissing229.length === 1 && libraryDominant229 === "tartışmacı anlatım", "kütüphane parçası tartışmacıdır ve seçeneklerden yalnız biri kullanılmamıştır");
guard(libraryUnits229.filter((u) => u.way).every((u) => u.fn === "gerekçe"), "kütüphane parçasında her düşünceyi geliştirme yolu savın gerekçesidir");

const numbered = (units: readonly Unit229[]) => units.map((u, i) => `(${i + 1}) ${u.text}`).join(" ");
export const modeExamples229: WorkedExample[] = [
  {
    title: "Kullanılan biçimlerle ağır basanı ayır",
    prompt: `${harborUnits229.map((u) => u.text).join(" ")} Bu parçada hangi anlatım biçimleri kullanılmıştır ve hangisi ağır basmaktadır?`,
    strategy: "Her cümleye bir işlev yaz: olay, nitelik, bilgi, sav. Kullanılanları listele; baskın biçim için parçanın hangi işle ilerlediğine bak.",
    steps: [
      { label: "Birimler", expression: harborUnits229.map((u, i) => `(${i + 1}) ${u.fn}`).join(", "), explanation: "İlk iki cümle aynı anın niteliklerini verir; sonraki cümlelerde Mert’in eylemleri birbirini izler." },
      { label: "Kullanılanlar", expression: harborUsed229.join(" ve "), explanation: "Nitelik birimleri betimleme, olay birimleri öyküleme kurar." },
      { label: "Değişim", expression: "ağlar yüklenir → koydan çıkılır → kasalar balıkla dolar", explanation: "Başlangıçtaki boş iskele sahnesi, dönüşte yeni bir duruma varır." },
      { label: "Baskın", expression: harborDominant229, explanation: "Sav yok, olay zinciri var: betimleme sahneyi hazırlar, örgüyü olaylar kurar." },
    ],
    answer: `Kullanılan: ${harborUsed229.join(" ve ")}. Ağır basan: ${harborDominant229}.`,
    check: `Betimleme birimleri (${countFn(harborUnits229, "nitelik")}) parçanın başında kalır; parça olayla sona erer.`,
    pitfall: "Kullanılan biçimlerle ağır basan biçimi karıştırmak. İlk cümleler betimleme diye bütün parçayı betimleyici saymak.",
  },
  {
    title: "Tartışmacı parçada kullanılmayan yolu bul",
    prompt: `${numbered(libraryUnits229)} Bu parçanın ağır basan anlatım biçimi nedir? Parçada şu düşünceyi geliştirme yollarından hangisine başvurulmamıştır: ${libraryChoices229.join(", ")}?`,
    strategy: "Önce sav ve gerekçeyi bul; biçimi o belirler. Sonra her gerekçe cümlesinin hangi aracı kullandığını işaretle ve seçeneklerden kullanılmayanı ele.",
    steps: [
      { label: "Sav ve karşı görüş", expression: `(1) ${libraryUnits229[0].fn}, (2) ${libraryUnits229[1].fn}`, explanation: "Yazar bir görüşü aktarıp karşısına kendi savını koyar. Birinci kişi anlatım öyküleme demek değildir." },
      { label: "Gerekçeler", expression: libraryUnits229.map((u, i) => (u.way ? `(${i + 1}) ${u.way}` : "")).filter(Boolean).join(", "), explanation: `Ortalama ${EVENING_VISITORS229} kişi, araştırmacının sözü ve vardiyalı anne savı destekler.` },
      { label: "Ağır basan", expression: libraryDominant229, explanation: "Sayı, alıntı ve örnek, savı benimsetmek için verilmiştir." },
      { label: "Seçenekleri ele", expression: libraryChoices229.map((w) => `${w}: ${libraryUsedWays229.includes(w) ? "var" : "yok"}`).join(", "), explanation: "Parçada hiçbir şey bir başka şeye benzetilmez." },
    ],
    answer: `Ağır basan ${libraryDominant229}. Başvurulmayan yol: ${libraryMissing229[0]}.`,
    check: `Kullanılan yollar: ${libraryUsedWays229.join(", ")}. Hepsi gerekçe birimidir; parçanın amacı savı benimsetmektir.`,
    pitfall: "Sayısal veri görünce parçayı açıklayıcı saymak. Sayı burada bir savın dayanağıdır.",
  },
];

export const modeSupplement229 = {
  title: bakerySection229.title,
  figureTitle: bakerySection229.title,
  paragraphs: bakerySection229.paragraphs,
  summary: `Biçimi işlev belirler; iki kanıt ara: ${bakeryRows229.map((r) => `${r.mode.split(" ")[0]} → ${r.key.join(" + ")}`).join("; ")}. Sav ve gerekçe varsa tartışmacı, yoksa olay zinciri öyküleyici ağır basar. Düşünceyi geliştirme yolları biçim değil araçtır.`,
  appendSection: true as const,
  table: bakeryTable,
  examples: modeExamples229,
};

export const depth229Lessons = {
  "paragrafta-siralama": orderSupplement229,
  "paragrafta-cumle-ekleme": insertSupplement229,
  "paragrafta-bosluk-doldurma": blankSupplement229,
  "paragrafta-anlatim-bicimleri": modeSupplement229,
} as const;

export const depth229Supplements = {
  "paragrafta-siralama": [orderSupplement229],
  "paragrafta-cumle-ekleme": [insertSupplement229],
  "paragrafta-bosluk-doldurma": [blankSupplement229],
  "paragrafta-anlatim-bicimleri": [modeSupplement229],
};
