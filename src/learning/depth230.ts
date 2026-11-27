import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Felsefe derinleştirmesi (0.230): felsefeyi tanıma, felsefe ile
 * düşünme, varlık felsefesi, bilgi felsefesi ve bilim felsefesi. Kabul
 * edilmiş rehber içeriği değişmez; tablo bölümü, iki özgün çözümlü örnek ve
 * bölüm çizimi görüntüleme katmanında eklenir. Terimler, görüş adları ve
 * düşünür eşleştirmeleri yalnız ilgili dersin kendi anlatımından alınır;
 * ders bir görüşe ad vermiyorsa tabloda da ad verilmez. Sınıflamalar ve
 * geçerlilik kararları kodda kuralla üretilir; paragraflar, tablo hücreleri,
 * çizim okumaları ve Kopya Kâğıdı özetleri aynı dışa aktarılmış verilerden
 * gelir. Genel yargıları modül yüklenirken korumalar denetler.
 */

const guard = (ok: boolean, message: string) => {
  if (!ok) throw new Error(`depth230: ${message}`);
};
const yesNo = (b: boolean) => (b ? "Evet" : "Hayır");
const joinTr = (xs: readonly string[]) => (xs.length <= 1 ? xs.join("") : `${xs.slice(0, -1).join(", ")} ve ${xs.at(-1)}`);
const COUNT_WORDS = ["sıfır", "bir", "iki", "üç", "dört", "beş", "altı", "yedi", "sekiz"] as const;
const word = (n: number) => COUNT_WORDS[n];

/* ======================================================================
 * 1. Felsefeyi tanıma: düşüncenin özellikleri ve ölçütleri
 * ==================================================================== */

/** Bir ifadede gözlenebilen işaretler; her biri dersin bir ölçütüne karşılık gelir. */
export const marks230 = {
  dayanakSorusu: "kabulün dayanağını yeniden soruyor",
  kisiyeYonelik: "görüşü değil kişiyi hedef alıyor",
  onculeItiraz: "belirli bir öncülün sonucu destekleyip desteklemediğini inceliyor",
  gerekceSonuc: "sonucu açık ve tartışılabilir bir gerekçeye bağlıyor",
  yalnizBegeni: "yalnız çok kişinin beğenisine dayanıyor",
  ayniKosulKarsit: "aynı özne ve koşulda karşıt yargı taşıyor",
  kavramBagli: "kavramdan sonuca bağlı adımlar kuruyor",
  kendiOlcutu: "kendi ölçütüne veya varsayımına geri dönüyor",
  baskalarinaAcik: "başkalarının da tartışabileceği kavram ve gerekçeye açılıyor",
  eskiyeYeniYanit: "önceki bir görüşe yeni yanıt veya yeni koşul ekliyor",
} as const;
export type Mark230 = keyof typeof marks230;

/** Tutarlılık denetimi için yargı: kimlere, hangi koşulda, hangi değer. */
export interface Judgment230 {
  members: readonly string[];
  condition: string;
  value: string;
}
/** Aynı koşulda ortak üyesi olan ve farklı değer veren iki yargı çelişir. */
export const conflicts230 = (a: Judgment230, b: Judgment230) =>
  a.condition === b.condition && a.value !== b.value && a.members.some((m) => b.members.includes(m));
/** Bir yargı listesinde çelişen ilk çift (yoksa null). */
export const firstConflict230 = (js: readonly Judgment230[]): readonly [number, number] | null => {
  for (let i = 0; i < js.length; i++) for (let j = i + 1; j < js.length; j++) if (conflicts230(js[i], js[j])) return [i, j];
  return null;
};

export interface Trait230 {
  trait: string;
  short: string;
  criterion: string;
  need: readonly Mark230[];
  bad: readonly Mark230[];
  statement: string;
  /** İfadede açıkça görülen işaretler (tutarlılık işareti yargılardan hesaplanır). */
  marks: readonly Mark230[];
  judgments?: readonly Judgment230[];
}

/** Özellik adları ve ölçütler dersin ilgili bölümlerindeki anlatımla; ifadeler özgündür. */
export const traitRows230: readonly Trait230[] = [
  {
    trait: "Kuşku ve sorgulama", short: "Kuşku", criterion: "Doğru kabul edilen yargının yeterli dayanağı yeniden sorulur.",
    need: ["dayanakSorusu"], bad: [],
    statement: "Hep böyle yapıldığı için bu kuralı doğru saymıştım; şimdi dayanağının yeterli olup olmadığını soruyorum.",
    marks: ["dayanakSorusu"],
  },
  {
    trait: "Eleştiri", short: "Eleştiri", criterion: "Kişi değil, dayanağın sonucu gerçekten destekleyip desteklemediği incelenir.",
    need: ["onculeItiraz"], bad: ["kisiyeYonelik"],
    statement: "Bu öneriyi yazan kişi deneyimsiz; o hâlde öneri yanlıştır.",
    marks: ["kisiyeYonelik"],
  },
  {
    trait: "Rasyonellik", short: "Rasyonellik", criterion: "Sonuç açık ve tartışılabilir dayanaklarla savunulur.",
    need: ["gerekceSonuc"], bad: ["yalnizBegeni"],
    statement: "Bu kuralı herkes çok sevdi; demek ki adil bir kuraldır.",
    marks: ["yalnizBegeni"],
  },
  {
    trait: "Tutarlılık", short: "Tutarlılık", criterion: "Aynı özne, anlam ve koşulda birbirine karşıt yargı bulunmaz.",
    need: [], bad: ["ayniKosulKarsit"],
    statement: "Felsefe ödevi bütün öğrenciler için cuma teslim edilir; aynı ödevi Ali gerekçesiz olarak pazartesi teslim edebilir.",
    marks: [],
    judgments: [
      { members: ["Ali", "Ece", "Can"], condition: "Felsefe ödevinin teslimi", value: "cuma" },
      { members: ["Ali"], condition: "Felsefe ödevinin teslimi", value: "pazartesi" },
    ],
  },
  {
    trait: "Sistemlilik", short: "Sistemlilik", criterion: "Kavramlar ve yargılar birbirine bağlı biçimde kurulur.",
    need: ["kavramBagli"], bad: [],
    statement: "Önce dostluğu karşılık beklemeden iyilik istemek diye tanımlıyorum; ardından yalnız çıkar için sürdürülen bir ilişkinin bu tanıma göre neden dostluk sayılmadığını gösteriyorum.",
    marks: ["kavramBagli", "gerekceSonuc"],
  },
  {
    trait: "Refleksiyon", short: "Refleksiyon", criterion: "Düşünce kendi ölçütüne, yöntemine veya varsayımına geri döner.",
    need: ["kendiOlcutu"], bad: [],
    statement: "Bu kararı değerlendirirken neden yalnız hıza önem verdiğimi kendime soruyorum.",
    marks: ["kendiOlcutu"],
  },
  {
    trait: "Evrensellik", short: "Evrensellik", criterion: "Soru başkalarının da tartışabileceği kavram ve gerekçelere açılır.",
    need: ["baskalarinaAcik"], bad: [],
    statement: "Bu soru benim yaşadığım bir olaydan doğdu; ama “Verilen söz neden bağlayıcıdır?” sorusunu başka toplumlardaki insanlar da gerekçeleriyle tartışabilir.",
    marks: ["baskalarinaAcik"],
  },
  {
    trait: "Yığılımlı gelişme", short: "Yığılım", criterion: "Eski bir soruya yeni yanıt verilir veya yeni bir soru eklenir.",
    need: ["eskiyeYeniYanit"], bad: [],
    statement: "Eski bir düşünürün mutluluk tanımını alıp bir karşı örnekle ona yeni bir koşul ekliyorum.",
    marks: ["eskiyeYeniYanit"],
  },
];

/** İfadenin bütün işaretleri: yazılı işaretler + yargılardan hesaplanan çelişki. */
export const marksOf230 = (r: { marks: readonly Mark230[]; judgments?: readonly Judgment230[] }): Mark230[] => [
  ...r.marks,
  ...(r.judgments && firstConflict230(r.judgments) ? (["ayniKosulKarsit"] as const) : []),
];
/** Ölçüt karşılanır: gereken işaretlerin hepsi var, engelleyen işaret yok. */
export const fits230 = (t: Pick<Trait230, "need" | "bad">, ms: readonly Mark230[]) =>
  t.need.every((m) => ms.includes(m)) && !t.bad.some((m) => ms.includes(m));
export const traitVerdict230 = (t: Trait230) => {
  const ms = marksOf230(t);
  const fit = fits230(t, ms);
  const missing = t.need.filter((m) => !ms.includes(m));
  const blocking = t.bad.filter((m) => ms.includes(m));
  const reason = fit
    ? `İfade ${t.need.length ? t.need.map((m) => marks230[m]).join(" ve ") : "aynı koşulda karşıt yargı taşımıyor"}.`
    : `İfade ${blocking.map((m) => marks230[m]).join(" ve ")}${missing.length ? "; ölçütün istediği işlem yapılmıyor" : ""}.`;
  return { fit, reason, marks: ms };
};
export const traitVerdicts230 = traitRows230.map((t) => ({ ...t, ...traitVerdict230(t) }));
const fittingTraits = traitVerdicts230.filter((t) => t.fit);
const failingTraits = traitVerdicts230.filter((t) => !t.fit);
{
  guard(traitRows230.length <= 8, "tablo en çok sekiz satır olmalı");
  guard(new Set(traitRows230.map((t) => t.short)).size === traitRows230.length, "kısa adlar benzersiz olmalı");
  guard(fittingTraits.length >= 3 && failingTraits.length >= 2, "uyan ve uymayan ifadeler birlikte bulunmalı");
  // Uymayan her ifadede engelleyen bir işaret vardır: sorun yalnız eksiklik değil, yanlış bir işlemdir.
  guard(failingTraits.every((t) => t.bad.some((m) => t.marks.includes(m))), "uymayan ifadede engelleyen işaret görünmeli");
  // Tutarlılık satırındaki çelişki yazılmış değil, yargılardan hesaplanmıştır.
  const tut = traitRows230.find((t) => t.trait === "Tutarlılık")!;
  guard(!tut.marks.includes("ayniKosulKarsit") && firstConflict230(tut.judgments!) !== null, "tutarlılık çelişkisi yargılardan çıkmalı");
}
const tutRow = traitVerdicts230.find((t) => t.trait === "Tutarlılık")!;
const [tutA, tutB] = firstConflict230(tutRow.judgments!)!.map((i) => tutRow.judgments![i]);
const shared = tutA.members.filter((m) => tutB.members.includes(m));

const traitTable = {
  layout: "table" as const,
  headers: ["Özellik", "Dersteki ölçüt", "Özgün ifade", "Ölçüte uyar mı?", "Gerekçe"],
  rows: traitVerdicts230.map((t) => [t.trait, t.criterion, t.statement, yesNo(t.fit), t.reason]),
};

export const traitSection230: GuideSection = {
  title: "Sekiz özellik, sekiz ifade: ölçütü cümlede ara",
  paragraphs: [
    `Tablo dersteki ${traitRows230.length} düşünme özelliğini birer ölçüt cümlesine çevirir: ${joinTr(traitRows230.map((t) => t.trait.toLocaleLowerCase("tr-TR")))}. Her satıra özgün bir ifade yazıldı. Bir ifade, ölçütün istediği işlem cümlede gerçekten yapılıyorsa ve ölçütü bozan bir işlem bulunmuyorsa uyar sayılır. Konu adı ya da “düşünüyorum” sözcüğü tek başına kanıt değildir.`,
    `${fittingTraits.length} ifade ölçütüne uyar, ${failingTraits.length} ifade uymaz: ${joinTr(failingTraits.map((t) => t.trait))}. Uymayan her ifadede ölçütü bozan bir işlem yapılır: ${failingTraits.map((t) => `${t.trait} satırındaki ifade ${t.bad.filter((m) => t.marks.includes(m)).map((m) => marks230[m]).join(" ve ")}`).join("; ")}.`,
    `Tutarlılık satırında çelişki yargılar eşlenerek bulunur. İki yargının koşulu aynıdır (${tutA.condition.toLocaleLowerCase("tr-TR")}). ${joinTr(shared)} iki yargının da kapsamındadır, fakat değerler farklıdır: ${tutA.value} ve ${tutB.value}. Koşul farklı olsaydı, örneğin biri hafta içi biri hafta sonu için söyleseydi, çelişki çıkmazdı.`,
  ],
  table: traitTable,
  figureTitle: "Sekiz özellik, sekiz ifade: ölçütü cümlede ara",
};

/** Örnek 1: tabloda olmayan üç yeni ifade; hangi özelliğin ölçütüne uydukları kuralla bulunur. */
export const traitProbe230 = [
  { key: "A", text: "Yazara yönelttiğim itirazın hangi varsayımıma dayandığını şimdi kendime soruyorum.", marks: ["kendiOlcutu"] as const },
  { key: "B", text: "Yazarın kanıtı yalnız iki okuldan geliyor; bu öncül, bütün okullar hakkındaki sonucu desteklemeye yetmiyor.", marks: ["onculeItiraz"] as const },
  { key: "C", text: "Yüzyıllardır sorulan “İyi yaşam nedir?” sorusuna dijital çağda ortaya çıkan yeni bir koşulla yanıt arıyorum.", marks: ["eskiyeYeniYanit"] as const },
].map((p) => ({ ...p, traits: traitRows230.filter((t) => t.need.length > 0 && fits230(t, p.marks)).map((t) => t.trait) }));
{
  for (const p of traitProbe230) guard(p.traits.length >= 1, `${p.key} en az bir özelliğe uymalı`);
  guard(traitProbe230[0].traits.length === 1 && traitProbe230[0].traits[0] === "Refleksiyon", "A yalnız refleksiyona uymalı");
}

/** Örnek 2: iki yargı çifti; çelişki aynı kuralla aranır. */
export const consistencyPairs230 = [
  {
    key: "1. çift",
    texts: ["Spor salonu öğrencilere hafta içi açıktır.", "Spor salonu öğrencilere pazar günü kapalıdır."],
    judgments: [
      { members: ["öğrenciler"], condition: "hafta içi", value: "açık" },
      { members: ["öğrenciler"], condition: "pazar", value: "kapalı" },
    ],
  },
  {
    key: "2. çift",
    texts: ["Bu sınavda bütün sorular eşit puanlıdır.", "Bu sınavda 5. soru öteki sorulardan daha çok puan getirir."],
    judgments: [
      { members: ["1. soru", "2. soru", "3. soru", "4. soru", "5. soru"], condition: "bu sınavın puanlaması", value: "eşit puan" },
      { members: ["5. soru"], condition: "bu sınavın puanlaması", value: "daha çok puan" },
    ],
  },
].map((p) => ({ ...p, conflict: firstConflict230(p.judgments) !== null }));
const conflicting = consistencyPairs230.filter((p) => p.conflict);
guard(conflicting.length === 1, "örnekte tek çelişen çift olmalı");

export const traitExamples230: WorkedExample[] = [
  {
    title: "Yeni üç ifadede ölçütü bul",
    prompt: `Aşağıdaki ifadelerin her biri hangi düşünme özelliğinin ölçütünü karşılar? Ölçütler: ${traitRows230.filter((t) => t.need.length).map((t) => `${t.trait}: ${t.criterion}`).join(" ")} ${traitProbe230.map((p) => `${p.key}) ${p.text}`).join(" ")}`,
    strategy: "Konu adına değil, cümlede yapılan işleme bak. İşlemi ölçüt cümlesiyle karşılaştır; ölçütü bozan bir işlem var mı, onu da denetle.",
    steps: traitProbe230.map((p) => ({
      label: p.key,
      expression: `${p.traits.join(", ")}`,
      explanation: `İfade ${p.marks.map((m) => marks230[m]).join(" ve ")}.`,
    })),
    answer: traitProbe230.map((p) => `${p.key}: ${p.traits.join(" ve ")}`).join("; ") + ".",
    check: `A, başkasının görüşünü değil kendi varsayımını inceler. B, yazarın kişiliğine değil öncülün yeterliliğine itiraz eder. C, eski bir soruya yeni bir koşul ekler.`,
    pitfall: "Bir ifadede “ben” veya “kendime” sözcüğü geçtiği için onu refleksiyon saymak; kendi ölçütüne dönüş yoksa refleksiyon yoktur.",
  },
  {
    title: "İki yargı çiftinde çelişkiyi koşulla ara",
    prompt: `Hangi yargı çifti tutarsızdır? ${consistencyPairs230.map((p) => `${p.key}: “${p.texts[0]}” ve “${p.texts[1]}”`).join(" ")}`,
    strategy: "Her yargı için kimleri kapsadığını, hangi koşulda söylendiğini ve neyi bildirdiğini ayrı satıra yaz. Çelişki için aynı koşul, ortak kapsam ve farklı değer gerekir.",
    steps: consistencyPairs230.map((p) => ({
      label: p.key,
      expression: `koşul: ${p.judgments[0].condition} / ${p.judgments[1].condition}`,
      explanation: p.conflict
        ? `Koşul aynı, ${p.judgments[1].members.join(", ")} iki yargının da kapsamında; değerler farklı (${p.judgments[0].value}, ${p.judgments[1].value}). Çelişki var.`
        : `Koşullar farklı (${p.judgments[0].condition}, ${p.judgments[1].condition}). Farklı günler için farklı söz otomatik çelişki değildir.`,
    })).concat([{ label: "Sonuç", expression: `${conflicting[0].key} tutarsız`, explanation: "Yalnız bir çiftte üç koşul birlikte sağlanır." }]),
    answer: `${conflicting[0].key} tutarsızdır. ${consistencyPairs230.filter((p) => !p.conflict).map((p) => p.key).join(", ")} tutarlıdır, çünkü yargıların koşulları farklıdır.`,
    check: `${conflicting[0].key} için “5. soru” hem “bütün sorular” kapsamındadır hem de ayrı bir değer alır; aynı sınav, aynı puanlama koşuludur.`,
    pitfall: "Farklı koşullara ait iki sözü, yalnız biri “açık” öteki “kapalı” dediği için çelişki saymak.",
  },
];

export const traitSupplement230 = {
  title: traitSection230.title,
  figureTitle: traitSection230.title,
  paragraphs: traitSection230.paragraphs,
  summary: `${traitRows230.map((t) => t.trait).join(", ")}: her özellik bir işlemdir. İfade, ölçütün istediği işlemi yapıyor ve ölçütü bozan işlem içermiyorsa uyar. Kişiyi hedef almak eleştiri, yalnız beğeniye dayanmak rasyonellik değildir. Aynı koşulda ortak kapsama karşıt değer verilirse tutarlılık bozulur.`,
  appendSection: true as const,
  table: traitTable,
  examples: traitExamples230,
};

/* ======================================================================
 * 2. Felsefe ile düşünme: çıkarım biçimleri ve karşı model
 * ==================================================================== */

/**
 * Küçük bir mantık dili. Önermeler (P, Q) sıfır yerli yüklem olarak, tekil
 * adlar (X, Y) evrenin bir öğesine bağlanır. `all(A, B)`: her öğe A ise B’dir.
 */
export type Formula230 =
  | { k: "atom"; p: string }
  | { k: "not"; f: Formula230 }
  | { k: "if"; a: Formula230; b: Formula230 }
  | { k: "all"; a: string; b: string }
  | { k: "has"; c: string; p: string };
const atom = (p: string): Formula230 => ({ k: "atom", p });
const not = (f: Formula230): Formula230 => ({ k: "not", f });
const ifThen = (a: Formula230, b: Formula230): Formula230 => ({ k: "if", a, b });
const all = (a: string, b: string): Formula230 => ({ k: "all", a, b });
const has = (c: string, p: string): Formula230 => ({ k: "has", c, p });

export interface Model230 {
  atoms: Readonly<Record<string, boolean>>;
  /** Her öğenin taşıdığı yüklemler. */
  items: readonly (readonly string[])[];
  /** Ad → öğe sırası. */
  names: Readonly<Record<string, number>>;
}
export const evalFormula230 = (f: Formula230, m: Model230): boolean => {
  switch (f.k) {
    case "atom": return m.atoms[f.p];
    case "not": return !evalFormula230(f.f, m);
    case "if": return !evalFormula230(f.a, m) || evalFormula230(f.b, m);
    case "all": return m.items.every((it) => !it.includes(f.a) || it.includes(f.b));
    case "has": return m.items[m.names[f.c]].includes(f.p);
  }
};
const collect = (fs: readonly Formula230[]) => {
  const atoms = new Set<string>();
  const preds = new Set<string>();
  const names = new Set<string>();
  const walk = (f: Formula230) => {
    if (f.k === "atom") atoms.add(f.p);
    else if (f.k === "not") walk(f.f);
    else if (f.k === "if") { walk(f.a); walk(f.b); }
    else if (f.k === "all") { preds.add(f.a); preds.add(f.b); }
    else { names.add(f.c); preds.add(f.p); }
  };
  fs.forEach(walk);
  return { atoms: [...atoms], preds: [...preds], names: [...names] };
};
/** Bütün küçük modelleri (en çok üç öğe) tarar; öncüller doğru, sonuç yanlış olan ilk modeli döndürür. */
export const countermodel230 = (premises: readonly Formula230[], conclusion: Formula230): Model230 | null => {
  const { atoms, preds, names } = collect([...premises, conclusion]);
  const subsets = (xs: string[]) => Array.from({ length: 1 << xs.length }, (_, mask) => xs.filter((_, i) => mask & (1 << i)));
  const predSets = subsets(preds);
  const sizes = preds.length ? [1, 2, 3] : [0];
  for (let am = 0; am < 1 << atoms.length; am++) {
    const av = Object.fromEntries(atoms.map((a, i) => [a, Boolean(am & (1 << i))]));
    for (const n of sizes) {
      if (n === 0 && names.length) continue;
      const total = predSets.length ** n;
      for (let code = 0; code < total; code++) {
        const items: string[][] = [];
        let c = code;
        for (let i = 0; i < n; i++) { items.push(predSets[c % predSets.length]); c = Math.floor(c / predSets.length); }
        const nameTotal = n ** names.length;
        for (let nc = 0; nc < Math.max(1, nameTotal); nc++) {
          const nm: Record<string, number> = {};
          let r = nc;
          for (const name of names) { nm[name] = r % n; r = Math.floor(r / n); }
          const m: Model230 = { atoms: av, items, names: nm };
          if (premises.every((p) => evalFormula230(p, m)) && !evalFormula230(conclusion, m)) return m;
        }
      }
    }
  }
  return null;
};

export type InferenceKind230 = "Tümdengelim" | "Tümevarım" | "Analoji";
export interface Inference230 {
  form: string;
  kind: InferenceKind230;
  premises: readonly Formula230[];
  conclusion: Formula230;
  /** Karşı modeldeki öğelere verilecek adlar (ad bağlı değilse). */
  itemLabel?: string;
}
/** Biçimler dersin tümdengelim, karşı model, tümevarım ve analoji bölümlerindeki şemalarla; harfler yer tutucudur. */
export const inferenceRows230: readonly Inference230[] = [
  { form: "Bütün A’lar B’dir. X bir A’dır. O hâlde X bir B’dir.", kind: "Tümdengelim", premises: [all("A", "B"), has("X", "A")], conclusion: has("X", "B") },
  { form: "Bütün A’lar B’dir. X bir B’dir. O hâlde X bir A’dır.", kind: "Tümdengelim", premises: [all("A", "B"), has("X", "B")], conclusion: has("X", "A") },
  { form: "P ise Q. P. O hâlde Q.", kind: "Tümdengelim", premises: [ifThen(atom("P"), atom("Q")), atom("P")], conclusion: atom("Q") },
  { form: "P ise Q. Q. O hâlde P.", kind: "Tümdengelim", premises: [ifThen(atom("P"), atom("Q")), atom("Q")], conclusion: atom("P") },
  { form: "P ise Q. Q değil. O hâlde P değil.", kind: "Tümdengelim", premises: [ifThen(atom("P"), atom("Q")), not(atom("Q"))], conclusion: not(atom("P")) },
  { form: "P ise Q. P değil. O hâlde Q değil.", kind: "Tümdengelim", premises: [ifThen(atom("P"), atom("Q")), not(atom("P"))], conclusion: not(atom("Q")) },
  { form: "Gözlenen her örnek A’dır ve B’dir; X gözlenmiştir. O hâlde bütün A’lar B’dir.", kind: "Tümevarım", premises: [all("O", "A"), all("O", "B"), has("X", "O")], conclusion: all("A", "B") },
  { form: "X ve Y F özelliğinde ortaktır. X, G’dir. O hâlde Y de G’dir.", kind: "Analoji", premises: [has("X", "F"), has("Y", "F"), has("X", "G")], conclusion: has("Y", "G") },
];
const predName: Record<string, string> = { A: "A", B: "B", O: "gözlenmiş", F: "F", G: "G" };
/** Karşı modeli okunur cümleye çevirir. */
export const describeModel230 = (m: Model230, row: Inference230): string => {
  const { atoms, preds, names } = collect([...row.premises, row.conclusion]);
  if (!preds.length) return atoms.map((a) => `${a} ${m.atoms[a] ? "doğru" : "yanlış"}`).join(", ");
  const label = (i: number) => {
    const ns = names.filter((n) => m.names[n] === i);
    return ns.length ? ns.join(" = ") : `başka bir öğe`;
  };
  return m.items.map((it, i) => {
    return `${label(i)}: ${preds.map((p) => `${predName[p]} ${it.includes(p) ? "evet" : "hayır"}`).join(", ")}`;
  }).join("; ");
};
export const inferenceChecked230 = inferenceRows230.map((r) => {
  const cm = countermodel230(r.premises, r.conclusion);
  return { ...r, countermodel: cm, valid: cm === null, model: cm ? describeModel230(cm, r) : "" };
});
const deductive = inferenceChecked230.filter((r) => r.kind === "Tümdengelim");
const validRows = deductive.filter((r) => r.valid);
const invalidDeductive = deductive.filter((r) => !r.valid);
const nonDeductive = inferenceChecked230.filter((r) => r.kind !== "Tümdengelim");
{
  guard(inferenceRows230.length <= 8, "tablo en çok sekiz satır olmalı");
  guard(validRows.length >= 2 && invalidDeductive.length >= 2, "geçerli ve geçersiz tümdengelim biçimleri birlikte olmalı");
  // Tümevarım ve analojide sonuç öncüllerden zorunlu çıkmaz: ikisinin de karşı modeli bulunur.
  guard(nonDeductive.length === 2 && nonDeductive.every((r) => !r.valid), "tümevarım ve analoji zorunlu sonuç vermemeli");
  // Geçersiz her biçim için bulunan model öncülleri gerçekten korur, sonucu bozar.
  for (const r of inferenceChecked230.filter((x) => !x.valid))
    guard(r.premises.every((p) => evalFormula230(p, r.countermodel!)) && !evalFormula230(r.conclusion, r.countermodel!), `${r.form} karşı modeli öncülleri korumalı`);
}
const verdict = (r: (typeof inferenceChecked230)[number]) =>
  r.kind === "Tümdengelim"
    ? (r.valid ? "Geçerli: sonuç öncüllerden zorunlu çıkar." : "Geçersiz: öncüller sonucu zorunlu kılmaz.")
    : r.kind === "Tümevarım"
      ? "Zorunlu değil: olasılıklı destek; örneklemin sayısı ve çeşitliliği tartılır."
      : "Zorunlu değil: destek, ortak özelliğin yeni özellikle ilgisine bağlıdır.";

const inferenceTable = {
  layout: "table" as const,
  headers: ["Biçim", "Çıkarım türü", "Karşı model var mı?", "Bulunan karşı model", "Değerlendirme"],
  rows: inferenceChecked230.map((r) => [r.form, r.kind, yesNo(!r.valid), r.valid ? "Yok: öncüller doğruyken sonuç hep doğru" : r.model, verdict(r)]),
};

export const inferenceSection230: GuideSection = {
  title: "Sekiz biçim: öncülleri koruyan karşı modeli ara",
  paragraphs: [
    `Tablodaki ${inferenceRows230.length} biçimin harfleri yer tutucudur: A, B, F ve G birer özellik, X ve Y birer ad, P ve Q birer önermedir. Her satır için en çok üç öğeli bütün küçük durumlar taranır ve öncüllerin hepsi doğruyken sonucun yanlış olduğu bir durum aranır. Böyle bir durum karşı modeldir. ${deductive.length} tümdengelim biçiminin ${validRows.length} tanesinde karşı model yoktur, ${invalidDeductive.length} tanesinde vardır.`,
    `Geçerli biçimler: ${validRows.map((r) => `“${r.form}”`).join(" ")} Geçersiz biçimlerin her birinde bulunan durum öncülleri bozmaz. Örneğin “P ise Q. Q. O hâlde P.” için ${inferenceChecked230[3].model} durumu yeterlidir; yağmursuz bir günde fıskiyenin zemini ıslatması bu biçimin gündelik bir örneğidir.`,
    `Tümevarım ve analoji satırlarında da karşı model bulunur; bu onların değersiz olduğunu göstermez. Bu çıkarımlarda sonuç öncüllerin ötesine geçer ve destek olasılıklıdır. Tümevarımda gözlenmemiş bir A’nın B olmaması, analojide Y’nin G olmaması öncüllerle bağdaşır. Bu yüzden tümevarımda örneklemin çeşitliliği, analojide ortak özelliğin yeni özellikle ilgisi ayrıca tartılır.`,
  ],
  table: inferenceTable,
  figureTitle: "Sekiz biçim: öncülleri koruyan karşı modeli ara",
};

/** Örnek 1: üyelik kartı, ikinci satırın biçimi. */
export const cardArgument230 = (() => {
  const premises = [all("üye", "kart"), has("Deniz", "kart")];
  const conclusion = has("Deniz", "üye");
  const cm = countermodel230(premises, conclusion);
  return { premises, conclusion, countermodel: cm, valid: cm === null };
})();
guard(!cardArgument230.valid && cardArgument230.countermodel!.items[cardArgument230.countermodel!.names.Deniz].includes("kart"), "kart örneğinde Deniz kartlı ama üye değil olmalı");

/** Örnek 2: ışık ve kapı, beşinci satırın biçimi; doğruluk çizelgesi. */
export const lightDoor230 = (() => {
  const premises = [ifThen(atom("P"), atom("Q")), not(atom("Q"))];
  const conclusion = not(atom("P"));
  const rows = [true, false].flatMap((p) => [true, false].map((q) => {
    const m: Model230 = { atoms: { P: p, Q: q }, items: [], names: {} };
    return { p, q, premisesTrue: premises.every((f) => evalFormula230(f, m)), conclusion: evalFormula230(conclusion, m) };
  }));
  return { rows, valid: countermodel230(premises, conclusion) === null };
})();
{
  const live = lightDoor230.rows.filter((r) => r.premisesTrue);
  guard(lightDoor230.valid && live.length === 1 && !live[0].p && !live[0].q && live[0].conclusion, "ışık–kapı örneği tek satırda geçerli olmalı");
}
const dy = (b: boolean) => (b ? "D" : "Y");

export const inferenceExamples230: WorkedExample[] = [
  {
    title: "Kart sahibinin üye olduğu zorunlu mu?",
    prompt: "Bir kulüpte şu yargılar doğru kabul ediliyor: “Kayıtlı her üye kulüp kartı alır.” ve “Deniz kulüp kartı almıştır.” Buradan “Deniz kayıtlı üyedir.” sonucu zorunlu olarak çıkar mı? Kartın yalnız üyelere verildiği söylenmemiştir.",
    strategy: "Cümleleri “Bütün A’lar B’dir. X bir B’dir. O hâlde X bir A’dır.” biçimine çevir. Öncülleri bozmadan sonucu yanlış yapan bir durum ara.",
    steps: [
      { label: "Biçim", expression: "A = kayıtlı üye, B = kart sahibi, X = Deniz", explanation: "Bu, tablonun ikinci satırındaki biçimdir." },
      { label: "Karşı model", expression: `Deniz: kart evet, üye hayır`, explanation: "Deniz karta başka bir yoldan, örneğin misafir olarak sahip olabilir. Bu durumda iki öncül de doğru kalır." },
      { label: "Karar", expression: `karşı model ${cardArgument230.valid ? "yok" : "var"}`, explanation: "Sonuç yanlışken öncüller doğru olabildiği için çıkarım geçersizdir." },
    ],
    answer: "Hayır. Çıkarım geçersizdir: Deniz’in kart sahibi olup üye olmadığı durum iki öncülü de korur.",
    check: "Birinci öncül yalnız “üye → kart” yönünü söyler; “kart → üye” yönü verilmemiştir. Karşı modelde üye olan herkes yine kartlıdır.",
    pitfall: "Koşulun yönünü ters çevirmek: “Her üye kart alır.” cümlesini “Her kart sahibi üyedir.” diye okumak.",
  },
  {
    title: "Işık yanmıyorsa ne söyleyebiliriz?",
    prompt: "“Kütüphanede ışık yanıyorsa kapı açıktır.” ve “Kapı açık değildir.” öncülleri doğru kabul ediliyor. “Kütüphanede ışık yanmıyor.” sonucu zorunlu mudur? P: ışık yanıyor, Q: kapı açık olsun.",
    strategy: "P ve Q için dört doğruluk durumunu yaz. Öncüllerin ikisinin de doğru olduğu satırlarda sonucun değerine bak.",
    steps: lightDoor230.rows.map((r) => ({
      label: `P ${dy(r.p)}, Q ${dy(r.q)}`,
      expression: `öncüller ${r.premisesTrue ? "D" : "Y"}, sonuç ${dy(r.conclusion)}`,
      explanation: r.premisesTrue ? "Öncüllerin ikisi de doğru; sonuç da doğru." : "En az bir öncül yanlış; bu satır sınamaya girmez.",
    })),
    answer: `Evet, sonuç zorunludur. Öncüllerin birlikte doğru olduğu tek satır P ${dy(false)}, Q ${dy(false)} satırıdır ve orada “ışık yanmıyor” doğrudur.`,
    check: `Karşı model aranınca bulunmaz: ${lightDoor230.rows.filter((r) => r.premisesTrue && !r.conclusion).length} satırda öncüller doğru, sonuç yanlış.`,
    pitfall: "Bu biçimi tablonun son tümdengelim satırıyla karıştırmak: “P değil, o hâlde Q değil” geçersizdir; burada ise Q’nun değillenmesinden P’nin değillenmesine geçilir.",
  },
];

export const inferenceSupplement230 = {
  title: inferenceSection230.title,
  figureTitle: inferenceSection230.title,
  paragraphs: inferenceSection230.paragraphs,
  summary: `Geçerlilik = öncüller doğruyken sonucun yanlış olduğu durum (karşı model) yok. Geçerli: ${validRows.map((r) => r.form.replace(/ O hâlde /, " ⇒ ")).join(" · ")} Geçersiz: Q’dan P’ye, P değil’den Q değil’e ve “X bir B’dir”den “X bir A’dır”a geçiş. Tümevarım ve analoji olasılıklı destek verir.`,
  appendSection: true as const,
  table: inferenceTable,
  examples: inferenceExamples230,
};

/* ======================================================================
 * 3. Varlık felsefesi: soru, yaklaşım, düşünür
 * ==================================================================== */

export type BeingQuestion230 = "Var mı?" | "Kaç temel?" | "Temel ne?";
export interface BeingRow230 {
  question: BeingQuestion230;
  approach: string;
  names: readonly string[];
  /** Nicelik satırlarında açıklamadaki indirgenemez temeller. */
  bases?: readonly string[];
  claim: string;
  caution: string;
}
/** Nicelik adı temel sayısından kuralla çıkar (dersin “Nicelik sorusu” bölümü). */
export const quantityName230 = (n: number) => (n === 1 ? "Monizm" : n === 2 ? "Düalizm" : n > 2 ? "Plüralizm" : "");

/** Yaklaşımlar ve düşünürler dersin ilgili bölümlerindeki eşleştirmelerle. */
export const beingRows230: readonly BeingRow230[] = [
  { question: "Var mı?", approach: "Gorgias’a atfedilen üç sav", names: ["Gorgias"], claim: "Hiçbir şey yoktur; olsa da bilinemez; bilinse de aktarılamaz.", caution: "Üç sav varlık, bilgi ve aktarım aşamalarıdır; tek soruya indirgenmez." },
  { question: "Kaç temel?", approach: "Monizm", names: ["Thales"], bases: ["su"], claim: "Çeşitli varlıkların temeli suyla açıklanır.", caution: "Tek temel, dünyada tek nesne var demek değildir." },
  { question: "Kaç temel?", approach: "Düalizm", names: ["Descartes"], bases: ["madde", "zihin"], claim: "Madde yer kaplar, zihin düşünür; birbirine indirgenemez.", caution: "Beden zihni etkiler demek, iki töz iddiası değildir." },
  { question: "Kaç temel?", approach: "Plüralizm", names: ["Empedokles"], bases: ["su", "toprak", "hava", "ateş"], claim: "Su, toprak, hava ve ateş birlikte temel alınır.", caution: "Örnek sayısı değil, indirgenemez temel sayısı sayılır." },
  { question: "Temel ne?", approach: "Materyalizm", names: ["Demokritos", "Hobbes", "Marx"], claim: "Atomlar ve hareketleri; cisim ve hareket; değişim ve karşıtlık içindeki madde.", caution: "Bütün materyalistler maddeyi durağan veya mekanik saymaz." },
  { question: "Temel ne?", approach: "İdealar", names: ["Platon"], claim: "Değişmez ve akılla kavranan idealar asıl gerçekliktir; duyulur nesneler değişir.", caution: "İdea, insanın aklına gelen geçici bir fikir değildir." },
  { question: "Temel ne?", approach: "Düşünsel temel", names: ["Fârâbî", "Hegel"], claim: "Zorunlu varlık ve ona dayanan mümkün varlıklar; mutlak akıl veya tinin gelişmesi.", caution: "Ortak düşünsel temel vurgusu iki sistemin ayrıntılarını silmez." },
  { question: "Temel ne?", approach: "Oluş ve süreç", names: ["Herakleitos", "Whitehead"], claim: "Sürekli değişim ve onun düzeni (logos); süreç, yenilenme ve yaratıcılık.", caution: "Ateş ve logos günümüz fiziğinin formülleri gibi okunmaz." },
];
export const beingQuestions230: readonly BeingQuestion230[] = ["Var mı?", "Kaç temel?", "Temel ne?"];
const quantityRows = beingRows230.filter((r) => r.question === "Kaç temel?");
const qualityRows = beingRows230.filter((r) => r.question === "Temel ne?");
const materialRow = beingRows230.find((r) => r.approach === "Materyalizm")!;
const mentalRow = beingRows230.find((r) => r.approach === "Düşünsel temel")!;
{
  guard(beingRows230.length <= 8, "tablo en çok sekiz satır olmalı");
  // Nicelik adı yazılmış değil, temel sayısından çıkar.
  guard(quantityRows.length === 3 && quantityRows.every((r) => r.bases && quantityName230(r.bases.length) === r.approach), "nicelik adı temel sayısına uymalı");
  guard(beingRows230.filter((r) => r.bases).every((r) => r.question === "Kaç temel?"), "temel sayısı yalnız nicelik satırlarında yazılmalı");
  // Satırlar soru sırasıyla dizilir.
  const qi = beingRows230.map((r) => beingQuestions230.indexOf(r.question));
  guard(qi.every((q, i) => q >= 0 && (i === 0 || q >= qi[i - 1])), "satırlar soru sırasıyla dizilmeli");
  guard(new Set(beingRows230.flatMap((r) => r.names)).size === beingRows230.flatMap((r) => r.names).length, "bir düşünür tek satırda anılmalı");
}
const basesText = (r: BeingRow230) => (r.bases ? `${r.bases.join(", ")} (${r.bases.length})` : "—");

const beingTable = {
  layout: "table" as const,
  headers: ["Soru", "Yaklaşım", "Derste anılan", "Temel kabul", "Okurken dikkat"],
  rows: beingRows230.map((r) => [r.question, r.approach, r.names.join(", "), r.bases ? `${r.claim} Temeller: ${basesText(r)}.` : r.claim, r.caution]),
};

export const beingSection230: GuideSection = {
  title: "Üç varlık sorusu, sekiz yanıt: düşünürü sorusuyla eşleştir",
  paragraphs: [
    `Tablo dersteki varlık tartışmasını ${beingQuestions230.length} soruda toplar: ${beingQuestions230.map((q) => `“${q}”`).join(", ")}. Her satır, dersin bir düşünürü hangi soruya hangi yanıtla bağladığını gösterir. Bir pasajı sınıflandırmadan önce onun hangi soruya yanıt verdiğini bul. Örneğin Gorgias’ın ilk savı varlığın imkânına, Thales’in su açıklaması temellerin sayısına, Platon’un idealar görüşü temelin ne olduğuna yanıt verir.`,
    `Nicelik satırlarında yaklaşımın adı, indirgenemez temellerin sayısından çıkar: ${quantityRows.map((r) => `${r.names[0]} ${r.bases!.length} temel → ${r.approach}`).join(", ")}. Sayılan şey örnek nesneler değil, açıklamanın sonunda bağımsız kalan temellerdir. Taş, ağaç ve beden aynı maddeye bağlanıyorsa üç örnek vardır, fakat temel birdir.`,
    `Nitelik satırları temelin ne tür olduğunu sorar. ${qualityRows.length} satırda ${joinTr(qualityRows.map((r) => `“${r.approach}”`))} yer alır. ${joinTr(materialRow.names)} aynı materyalizm satırındadır, fakat maddeyi farklı biçimde ele alır. ${joinTr(mentalRow.names)} düşünsel temelde buluşur; ayrıntıları yine de farklıdır. Nicelik ve nitelik iki ayrı eksendir: tek temel kabul eden bir görüş maddi de olabilir, düşünsel de olabilir.`,
  ],
  table: beingTable,
  figureTitle: "Üç varlık sorusu, sekiz yanıt: düşünürü sorusuyla eşleştir",
};

/** Örnek 1: üç özgün ifade; temeller ve türleri verilir, iki eksen kuralla bulunur. */
export type BaseKind230 = "maddi" | "düşünsel";
export const beingProbe230 = [
  { key: "A", text: "Var olan her şey tek bir maddi yapının farklı düzenlenişidir; düşünceler de bu yapının hareketleridir.", bases: [{ name: "madde", kind: "maddi" }] },
  { key: "B", text: "Yer kaplayan cisimler ile düşünen zihin birbirine indirgenemeyen iki ayrı türdür.", bases: [{ name: "cisim", kind: "maddi" }, { name: "zihin", kind: "düşünsel" }] },
  { key: "C", text: "Her şeyin dayanağı tek bir mutlak akıldır; doğa ve tarih onun gelişmesidir.", bases: [{ name: "mutlak akıl", kind: "düşünsel" }] },
].map((p) => {
  const kinds = [...new Set(p.bases.map((b) => b.kind as BaseKind230))];
  const quality = kinds.length === 1 ? (kinds[0] === "maddi" ? materialRow.approach : mentalRow.approach) : "";
  return { ...p, quantity: quantityName230(p.bases.length), quality };
});
{
  for (const p of beingProbe230) guard(quantityRows.some((r) => r.approach === p.quantity), `${p.key} nicelik adı tabloda olmalı`);
  guard(beingProbe230.filter((p) => p.quantity === "Monizm").length === 2 && new Set(beingProbe230.filter((p) => p.quantity === "Monizm").map((p) => p.quality)).size === 2, "iki monist ifade farklı nitelikte olmalı");
}
const probeAnswer = (p: (typeof beingProbe230)[number]) => (p.quality ? `${p.quantity} ve ${p.quality.toLocaleLowerCase("tr-TR")}` : `${p.quantity} (temeller ${p.bases.map((b) => b.kind).join(" ve ")} türden)`);

/** Örnek 2: Gorgias’a atfedilen üç sav, ayrı aşamalar. */
export const gorgiasStages230 = ["varlığın imkânı", "bilginin imkânı", "aktarım"] as const;
const gorgiasRow = beingRows230[0];
export const gorgiasClaims230 = gorgiasRow.claim.replace(/\.$/, "").split("; ");
guard(gorgiasClaims230.length === gorgiasStages230.length, "Gorgias satırında üç sav olmalı");
export const gorgiasProbe230 = [
  { key: "K1", text: "Bu yazıyı okuyan biri, yazarın bildiğini tam olarak öğrenemez; sözcükler bilgiyi olduğu gibi taşıyamaz.", stage: 2, deniesBeing: false },
  { key: "K2", text: "Duyduğumuz sesin ardında gerçek bir nesne olsa bile onu bilmemiz mümkün değildir.", stage: 1, deniesBeing: false },
  { key: "K3", text: "Ses de nesne de yoktur; var gibi görünen hiçbir şey gerçekten yoktur.", stage: 0, deniesBeing: true },
] as const;
{
  // Yalnız ilk aşamadaki ifade varlığı reddeder.
  guard(gorgiasProbe230.every((p) => p.deniesBeing === (p.stage === 0)), "yalnız varlık aşaması varlığı reddetmeli");
  guard(new Set(gorgiasProbe230.map((p) => p.stage)).size === gorgiasStages230.length, "üç aşama da sorulmalı");
}

export const beingExamples230: WorkedExample[] = [
  {
    title: "Tek temel her zaman madde mi?",
    prompt: `Her ifadeyi iki eksende sınıflandır: kaç temel kabul ediyor, temel ne tür? ${beingProbe230.map((p) => `${p.key}) ${p.text}`).join(" ")}`,
    strategy: "Önce açıklamanın sonunda indirgenemez kalan temelleri listele ve say. Sonra bu temellerin maddi mi düşünsel mi olduğuna bak.",
    steps: beingProbe230.map((p) => ({
      label: p.key,
      expression: `${p.bases.map((b) => `${b.name} (${b.kind})`).join(" + ")} → ${p.bases.length} temel`,
      explanation: p.quality
        ? `${word(p.bases.length)[0].toLocaleUpperCase("tr-TR")}${word(p.bases.length).slice(1)} temel: ${p.quantity}. Temel ${p.bases[0].kind} olduğu için ${p.quality.toLocaleLowerCase("tr-TR")} satırıyla eşleşir.`
        : `İki indirgenemez tür: ${p.quantity}. Temeller farklı türden olduğu için tek bir nitelik satırına girmez.`,
    })),
    answer: beingProbe230.map((p) => `${p.key}: ${probeAnswer(p)}`).join("; ") + ".",
    check: `A ve C ikisi de monizmdir, fakat temelleri farklı türdendir. Monizm sözcüğü tek başına materyalizm demek değildir.`,
    pitfall: "Tek temel kabul eden her görüşü materyalist saymak ya da iki örnek nesne geçen her metni düalist saymak.",
  },
  {
    title: "Hangi ifade varlığı reddediyor?",
    prompt: `Gorgias’a atfedilen savlar “${gorgiasClaims230.join("”, “")}” biçimindedir. Aşağıdaki ifadeler bu savlardan hangisine benzer ve hangisi varlığı reddeder? ${gorgiasProbe230.map((p) => `${p.key}) ${p.text}`).join(" ")}`,
    strategy: "Her ifadenin neyi reddettiğine bak: varlığı mı, var olanın bilinmesini mi, bilinenin aktarılmasını mı? “Olsa bile” gibi sözler varlığı tartışmaya açık bırakır.",
    steps: gorgiasProbe230.map((p) => ({
      label: p.key,
      expression: `${gorgiasStages230[p.stage]} → “${gorgiasClaims230[p.stage]}”`,
      explanation: p.deniesBeing ? "Varlığın kendisini reddeder." : "Varlığı reddetmez; sonraki bir aşamayı tartışır.",
    })),
    answer: `${gorgiasProbe230.map((p) => `${p.key}: ${gorgiasStages230[p.stage]}`).join("; ")}. Yalnız ${gorgiasProbe230.filter((p) => p.deniesBeing).map((p) => p.key).join(", ")} varlığı reddeder.`,
    check: "K2 “olsa bile” der: nesnenin varlığını kabul etmeden de reddetmeden de bilmeyi tartışır. K1 bilginin varlığını kabul eder, aktarımını reddeder.",
    pitfall: "Bilginin veya aktarımın imkânsızlığını söyleyen her ifadeyi “hiçbir şey yoktur” savıyla aynı saymak.",
  },
];

export const beingSupplement230 = {
  title: beingSection230.title,
  figureTitle: beingSection230.title,
  paragraphs: beingSection230.paragraphs,
  summary: `Var mı? Gorgias’ın üç savı. Kaç temel? ${quantityRows.map((r) => `${r.approach} ${r.bases!.length} (${r.names[0]})`).join(", ")}. Temel ne? ${qualityRows.map((r) => `${r.approach} (${r.names.join(", ")})`).join(", ")}. Nicelik ile nitelik ayrı eksendir.`,
  appendSection: true as const,
  table: beingTable,
  examples: beingExamples230,
};

/* ======================================================================
 * 4. Bilgi felsefesi: imkân, kaynak, düşünür
 * ==================================================================== */

export const sources230 = ["akıl", "deneyim", "sezgi", "olgu", "görünüş", "sonuç"] as const;
export type Source230 = (typeof sources230)[number];
export const sourceLabel230: Record<Source230, string> = {
  akıl: "akıl", deneyim: "deneyim", sezgi: "sezgi", olgu: "gözlenen olgu", görünüş: "bilince görünüş", sonuç: "deneyimdeki sonuç",
};
export interface KnowRow230 {
  approach: string;
  possible: boolean;
  sources: readonly Source230[];
  names: readonly string[];
  claim: string;
}
/** Yaklaşım ve düşünürler dersin bölümleriyle; ders ad vermeyince ad yazılmaz. */
export const knowRows230: readonly KnowRow230[] = [
  { approach: "Kuşkucu yaklaşımlar", possible: false, sources: [], names: [], claim: "Duyuların yanılması ve değişen görünümler üzerinden kesin bilgi iddialarını sorgular." },
  { approach: "Akılcılık (rasyonalizm)", possible: true, sources: ["akıl"], names: ["Sokrates", "Platon", "Descartes", "Hegel"], claim: "En azından bazı bilgiler deneyden bağımsız (a priori) bilinebilir." },
  { approach: "Deneyimcilik (empirizm)", possible: true, sources: ["deneyim"], names: ["Locke", "Hume"], claim: "İçerik deneyimden gelir; zihin boş levhaya benzetilir (a posteriori)." },
  { approach: "Eleştirel yaklaşım", possible: true, sources: ["deneyim", "akıl"], names: ["Kant"], claim: "Deneyim malzeme sağlar, zihnin formları onu düzenler; ikisi de tek başına yetmez." },
  { approach: "Sezgicilik", possible: true, sources: ["sezgi"], names: ["Bergson", "Gazâlî"], claim: "Bazı bilgiler aracısız bir kavrayışla edinilir." },
  { approach: "Pozitivizm", possible: true, sources: ["olgu"], names: ["Comte"], claim: "Doğaüstü nedenler ve soyut özler yerine olgular arasındaki ilişkiler araştırılır." },
  { approach: "Fenomenoloji", possible: true, sources: ["görünüş"], names: ["Husserl"], claim: "Ön yargılar paranteze alınır, şeylerin bilince nasıl göründüğü betimlenir." },
  { approach: "Pragmatizm", possible: true, sources: ["sonuç"], names: ["William James", "John Dewey"], claim: "Düşüncenin deneyimde işe yaraması ve sorun çözmesi önem taşır." },
];
const doubters = knowRows230.filter((r) => !r.possible);
const possibleRows = knowRows230.filter((r) => r.possible);
const kantRow = knowRows230.find((r) => r.names.includes("Kant"))!;
{
  guard(knowRows230.length <= 8, "tablo en çok sekiz satır olmalı");
  guard(doubters.length === 1 && doubters[0].names.length === 0 && doubters[0].sources.length === 0, "kuşkucu satırında ad ve kaynak bulunmamalı");
  // Bilgiyi mümkün sayan her yaklaşım en az bir kaynak gösterir; kaynak kümeleri birbirinden farklıdır.
  guard(possibleRows.every((r) => r.sources.length >= 1), "mümkün sayan her satırın kaynağı olmalı");
  const keys = possibleRows.map((r) => [...r.sources].sort().join("+"));
  guard(new Set(keys).size === keys.length, "kaynak kümeleri ayırt edici olmalı");
  guard(possibleRows.filter((r) => r.sources.length > 1).length === 1 && kantRow.sources.length === 2, "iki kaynağı birlikte isteyen yalnız eleştirel yaklaşım olmalı");
  guard(new Set(knowRows230.flatMap((r) => r.names)).size === knowRows230.flatMap((r) => r.names).length, "bir düşünür tek satırda anılmalı");
}
const sourceText = (r: KnowRow230) => (r.sources.length ? r.sources.map((s) => sourceLabel230[s]).join(" + ") : "Dayanakların yeterliliğini sorgular");
/** Kaynak kümesinden yaklaşımı kuralla bulur (küme eşitliği). */
export const approachForSources230 = (ss: readonly Source230[]) =>
  possibleRows.find((r) => r.sources.length === ss.length && r.sources.every((s) => ss.includes(s)));

const knowTable = {
  layout: "table" as const,
  headers: ["Yaklaşım", "Bilgi mümkün mü?", "Bilginin dayanağı", "Derste anılan", "Temel sav"],
  rows: knowRows230.map((r) => [r.approach, r.possible ? "Evet" : "Kesinlik sorgulanır", sourceText(r), r.names.length ? r.names.join(", ") : "Derste ad verilmez", r.claim]),
};

export const knowSection230: GuideSection = {
  title: "İmkân ve dayanak: sekiz yaklaşımı iki soruyla ayır",
  paragraphs: [
    `Tablo dersteki ${knowRows230.length} yaklaşımı iki soruyla okur: Doğru bilgi mümkün mü? Mümkünse neye dayanır? Kuşkucu yaklaşımlar kesin bilgi iddiasını sorgular. Ders bu satır için bir düşünür adı vermediği için tabloda da ad yoktur. Kalan ${possibleRows.length} yaklaşım bilgiyi mümkün sayar. Bu ortak yanıt dogmatizm terimiyle anılır; terim burada gündelik dildeki inatçılık anlamında kullanılmaz.`,
    `Aynı imkân yanıtını veren yaklaşımlar dayanakta ayrılır. ${possibleRows.filter((r) => r.sources.length === 1).map((r) => `${r.approach.replace(/ \(.*\)/, "")} ${sourceLabel230[r.sources[0]]}`).join(", ")} dayanağını öne çıkarır. ${kantRow.names[0]}’ın eleştirel yaklaşımı tek dayanakla yetinmez: deneyim malzeme verir, akıl ve zihnin formları bu malzemeyi düzenler. Tabloda iki dayanağı birlikte isteyen tek satır budur.`,
    `Kuşkuyu kullanmak her zaman kuşkucu olmak değildir. Descartes kuşkuyu bir yöntem olarak kullanır ve düşünme etkinliğinin kesinliğine ulaşır; bu yüzden akılcılık satırındadır. Bir pasajı sınıflandırırken önce imkân yanıtını, sonra bilginin neye dayandırıldığını bul.`,
  ],
  table: knowTable,
  figureTitle: "İmkân ve dayanak: sekiz yaklaşımı iki soruyla ayır",
};

/** Örnek 1: dört özgün ifade; vurguladıkları kaynak kümesinden yaklaşım bulunur. */
export const knowProbe230 = ([
  { key: "a", text: "Bir üçgenin iç açıları hakkındaki genel bir ilişkiyi, tek tek üçgen ölçmeden akıl yürüterek zorunlu olarak bilebiliriz.", sources: ["akıl"] },
  { key: "b", text: "Limonun ekşi olduğunu ancak tadına bakınca öğreniriz; zihinde doğuştan hazır bir içerik yoktur.", sources: ["deneyim"] },
  { key: "c", text: "Gördüklerimiz bilgiye malzeme verir; ama bu malzemeyi anlamlı bir bütüne zihnin kendi formları dönüştürür.", sources: ["deneyim", "akıl"] },
  { key: "d", text: "Yaşadığımız süreyi adım adım akıl yürüterek değil, onu yaşarken aracısız kavrarız.", sources: ["sezgi"] },
] as const).map((p) => ({ ...p, row: approachForSources230(p.sources)! }));
{
  for (const p of knowProbe230) guard(p.row !== undefined, `${p.key} bir satırla eşleşmeli`);
  guard(new Set(knowProbe230.map((p) => p.row.approach)).size === knowProbe230.length, "dört ifade dört farklı yaklaşıma gitmeli");
}

/** Örnek 2: aynı gözlemden iki farklı sonuç. */
export const mirageDebate230 = [
  { key: "Birinci kişi", text: "Uzaktaki asfalt ıslak görünür, yaklaşınca kuru çıkar. O hâlde duyulara dayanan hiçbir yargı kesin değildir ve kesin bilgiye ulaşılamaz.", possible: false, sources: [] as Source230[] },
  { key: "İkinci kişi", text: "Duyular yanılabilir; ama aklın ilkelerine dayanan bazı bilgileri kesin olarak biliriz.", possible: true, sources: ["akıl"] as Source230[] },
].map((p) => ({ ...p, row: p.possible ? approachForSources230(p.sources)! : doubters[0] }));
guard(mirageDebate230[0].row === doubters[0] && mirageDebate230[1].row.sources[0] === "akıl", "serap örneği kuşkucu ve akılcı satırlara gitmeli");

export const knowExamples230: WorkedExample[] = [
  {
    title: "Dört ifadeyi kaynağıyla eşleştir",
    prompt: `Aşağıdaki ifadelerin her biri bilgiyi mümkün sayar. Her birinin bilgi kaynağını ve bu kaynağı öne çıkaran yaklaşımı bul. ${knowProbe230.map((p) => `${p.key}) ${p.text}`).join(" ")}`,
    strategy: "İfadenin hangi kaynağa güvendiğini ve hangisini yetersiz bulduğunu ayrı yaz. Kaynak kümesi tek mi, iki kaynak birlikte mi isteniyor?",
    steps: knowProbe230.map((p) => ({
      label: p.key,
      expression: `${p.sources.map((s) => sourceLabel230[s]).join(" + ")} → ${p.row.approach}`,
      explanation: `Derste bu yaklaşımla anılanlar: ${p.row.names.join(", ")}.`,
    })),
    answer: knowProbe230.map((p) => `${p.key}: ${p.row.approach}`).join("; ") + ".",
    check: `c ifadesi deneyimin rolünü reddetmez, ona zihnin katkısını ekler. Bu yüzden deneyimcilik satırına değil, iki kaynaklı ${kantRow.approach.toLocaleLowerCase("tr-TR")} satırına gider.`,
    pitfall: "Deneyimden söz eden her ifadeyi deneyimcilik saymak; deneyim ile zihnin formları birlikte isteniyorsa eleştirel yaklaşımdır.",
  },
  {
    title: "Duyunun yanılması iki ayrı sonuca götürebilir",
    prompt: `İki kişi aynı gözlemden yola çıkıyor. ${mirageDebate230.map((p) => `${p.key}: “${p.text}”`).join(" ")} Her birinin bilginin imkânı sorusuna yanıtını ve tablodaki yaklaşımını belirle.`,
    strategy: "Önce imkân sorusunun yanıtını bul: kesin bilgi mümkün mü? Mümkünse kaynağı sor.",
    steps: [
      ...mirageDebate230.map((p) => ({
        label: p.key,
        expression: `${p.possible ? "bilgi mümkün" : "kesinlik sorgulanır"} → ${p.row.approach}`,
        explanation: p.possible ? `Duyuların yanılmasını kabul eder ama kesin bilgiyi ${sourceLabel230[p.sources[0]]} kaynağına bağlar.` : "Duyunun bir kez yanılmasından bütün kesin bilginin imkânsızlığına geçer.",
      })),
      { label: "Ortak nokta", expression: "duyular yanılabilir", explanation: "İki kişi aynı gözlemi kabul eder; ayrıldıkları yer, bu gözlemden çıkardıkları sonuçtur." },
    ],
    answer: `${mirageDebate230.map((p) => `${p.key}: ${p.row.approach.toLocaleLowerCase("tr-TR")}`).join("; ")}.`,
    check: "İkinci kişi de duyuların yanıldığını söyler, ama kuşkucu değildir; çünkü bilgiyi mümkün sayar ve kaynağını gösterir.",
    pitfall: "Duyuların yanılabildiğini söyleyen her düşünürü kuşkucu saymak.",
  },
];

export const knowSupplement230 = {
  title: knowSection230.title,
  figureTitle: knowSection230.title,
  paragraphs: knowSection230.paragraphs,
  summary: `Önce imkân, sonra dayanak. Kuşkucu yaklaşımlar kesinliği sorgular. Bilgiyi mümkün sayanlar: ${possibleRows.map((r) => `${r.approach.replace(/ \(.*\)/, "")} → ${r.sources.map((s) => sourceLabel230[s]).join(" + ")} (${r.names.join(", ")})`).join("; ")}.`,
  appendSection: true as const,
  table: knowTable,
  examples: knowExamples230,
};

/* ======================================================================
 * 5. Bilim felsefesi: yaklaşımlar ve sınama asimetrisi
 * ==================================================================== */

export type ScienceAsk230 = "gözlem-birikimi" | "doğrulama-koşulu" | "çürüten-bulgu" | "topluluk-çerçevesi" | "mantıksal-yapı" | "tarihsel-pratik";
export interface ScienceRow230 {
  approach: string;
  names: readonly string[];
  ask: ScienceAsk230;
  question: string;
  focus: "Sınama ölçütü" | "Bilimsel pratiğin tarihi" | "Ürün olarak bilim" | "Etkinlik olarak bilim";
  caution: string;
}
/** Yaklaşımlar ve ad bağlantıları dersin bilim felsefesi bölümleriyle; ad vermeyen bölümde ad yazılmaz. */
export const scienceRows230: readonly ScienceRow230[] = [
  { approach: "Tümevarımla genelleme", names: [], ask: "gözlem-birikimi", question: "Çok sayıda gözlem daha geniş bir örüntüyü destekliyor mu?", focus: "Sınama ölçütü", caution: "Sonlu gözlem evrensel savı mantıksal kesinliğe dönüştürmez." },
  { approach: "Doğrulanabilirlik (mantıkçı pozitivizm)", names: [], ask: "doğrulama-koşulu", question: "Olgusal önerme hangi gözlem koşulunda doğrulanabilir?", focus: "Sınama ölçütü", caution: "Felsefenin tek geçerli yöntemi diye sunulmaz." },
  { approach: "Yanlışlanabilirlik", names: ["Popper"], ask: "çürüten-bulgu", question: "Sav hangi olası bulguyla uyuşmaz?", focus: "Sınama ölçütü", caution: "Yanlışlanabilir olmak, savın yanlış olduğu demek değildir." },
  { approach: "Paradigma", names: ["Kuhn"], ask: "topluluk-çerçevesi", question: "Bilim topluluğu hangi problem çözme çerçevesini paylaşıyor?", focus: "Bilimsel pratiğin tarihi", caution: "Her araştırmacının istediği sonuca inanabileceği anlamına gelmez." },
  { approach: "Ürün olarak bilim", names: ["Reichenbach", "Carnap", "Hempel"], ask: "mantıksal-yapı", question: "Önerme ve kuramlar arasındaki mantıksal ilişki nedir?", focus: "Ürün olarak bilim", caution: "Düşünürlerin her konuda aynı görüşte olduğu anlamına gelmez." },
  { approach: "Etkinlik olarak bilim", names: ["Kuhn", "Toulmin"], ask: "tarihsel-pratik", question: "Topluluklar ve tarihsel ortam bilimsel pratiği nasıl biçimlendirir?", focus: "Etkinlik olarak bilim", caution: "Ürün ile etkinlik günlük araştırmada bütünüyle ayrı işler değildir." },
];
const testingRows = scienceRows230.filter((r) => r.focus === "Sınama ölçütü");
const unnamed = scienceRows230.filter((r) => r.names.length === 0);
const kuhnRows = scienceRows230.filter((r) => r.names.includes("Kuhn"));
{
  guard(scienceRows230.length <= 8, "tablo en çok sekiz satır olmalı");
  guard(new Set(scienceRows230.map((r) => r.ask)).size === scienceRows230.length, "her satır ayrı bir soru sormalı");
  guard(testingRows.length === 3 && unnamed.every((r) => r.focus === "Sınama ölçütü"), "adsız satırlar sınama ölçütü satırı olmalı");
  // Kuhn ders metninde hem paradigma hem etkinlik başlığında anılır.
  guard(kuhnRows.map((r) => r.approach).join("|") === "Paradigma|Etkinlik olarak bilim", "Kuhn iki satırda anılmalı");
  guard(scienceRows230.filter((r) => r.names.includes("Popper")).length === 1, "Popper yalnız yanlışlanabilirlik satırında olmalı");
}

/**
 * Sınama asimetrisi: “Bu gölün bütün kuğuları beyazdır.” savı ve sırayla
 * yapılan altı gözlem. Uyan gözlem desteği artırır, kesinlik vermez; tek
 * uyuşmaz gözlem evrensel savla bağdaşmaz.
 */
export const swanObservations230 = ["beyaz", "beyaz", "beyaz", "beyaz", "beyaz", "siyah"] as const;
export type SwanStatus230 = "gözlem yok" | "uyumlu, kesin değil" | "bağdaşmaz";
export const swanStatus230 = (obs: readonly string[]): SwanStatus230 =>
  obs.length === 0 ? "gözlem yok" : obs.some((o) => o !== "beyaz") ? "bağdaşmaz" : "uyumlu, kesin değil";
export const swanSteps230 = swanObservations230.map((_, i) => {
  const seen = swanObservations230.slice(0, i + 1);
  return { n: seen.length, white: seen.filter((o) => o === "beyaz").length, status: swanStatus230(seen) };
});
const firstClash = swanSteps230.findIndex((s) => s.status === "bağdaşmaz");
{
  // Kaç beyaz kuğu gözlenirse gözlensin durum “kesin” olmaz.
  for (let n = 1; n <= 1000; n *= 10) guard(swanStatus230(Array(n).fill("beyaz")) === "uyumlu, kesin değil", "beyaz gözlemler kesinlik vermemeli");
  guard(firstClash === swanObservations230.length - 1 && swanSteps230.slice(firstClash).every((s) => s.status === "bağdaşmaz"), "tek siyah kuğu savla bağdaşmamalı");
}
const clash = swanSteps230[firstClash];

const scienceTable = {
  layout: "table" as const,
  headers: ["Yaklaşım", "Derste anılan", "Sorduğu soru", "Odak", "Okurken dikkat"],
  rows: scienceRows230.map((r) => [r.approach, r.names.length ? r.names.join(", ") : "Bölümde ad verilmez", r.question, r.focus, r.caution]),
};

export const scienceSection230: GuideSection = {
  title: "Altı yaklaşım ve bir kuğu dizisi: sınama ile pratiği ayır",
  paragraphs: [
    `Tablo dersteki ${scienceRows230.length} bilim yaklaşımını sordukları soruyla eşleştirir. ${testingRows.length} satır sınama ölçütüne odaklanır: ${joinTr(testingRows.map((r) => r.approach.replace(/ \(.*\)/, "").toLocaleLowerCase("tr-TR")))}. Dersin tümevarım ve doğrulanabilirlik bölümleri bir düşünür adı vermez; tabloda da ad yazılmaz. Yanlışlanabilirlik Popper ile, paradigma Kuhn ile ilişkilendirilir.`,
    `Kuhn tabloda ${kuhnRows.length} satırda geçer: ${kuhnRows.map((r) => r.approach.toLocaleLowerCase("tr-TR")).join(" ve ")}. Bu bir çelişki değildir. Ders onu hem paradigma kavramıyla hem de etkinlik olarak bilim başlığında anar. Ürün olarak bilimde ${joinTr(scienceRows230.find((r) => r.focus === "Ürün olarak bilim")!.names)} önermelerin mantıksal yapısını inceler. Etkinlik olarak bilimde ise toplulukların problem çözme pratiği öne çıkar.`,
    `Çizimdeki savı düşün: “Bu gölün bütün kuğuları beyazdır.” Gözlemler sırayla geliyor. İlk ${clash.n - 1} gözlemde ${clash.white} beyaz kuğu görülüyor; sav her adımda uyumlu kalıyor, fakat kesinleşmiyor. ${clash.n}. gözlemde siyah bir kuğu görülüyor ve evrensel sav bu bulguyla bağdaşmıyor. Bu asimetri tümevarımın sınırını ve yanlışlanabilirliğin neden çürüten bulguyu sorduğunu gösterir.`,
  ],
  table: scienceTable,
  figureTitle: "Altı yaklaşım ve bir kuğu dizisi: sınama ile pratiği ayır",
};

/** Örnek 1: dört özgün ifade; sordukları soru türünden satır bulunur. */
export const scienceProbe230 = ([
  { key: "a", text: "Bir sav, hangi gözlemin onunla uyuşmayacağını söyleyemiyorsa deneysel olarak sınanamaz.", ask: "çürüten-bulgu" },
  { key: "b", text: "Bir bilim topluluğu ortak örnek problemler ve yöntemlerle çalışır; çözülemeyen önemli aykırılıklar krize yol açabilir.", ask: "topluluk-çerçevesi" },
  { key: "c", text: "Bir araştırma raporunda kanıt cümlelerinin sonucu mantıksal olarak nasıl desteklediğini çözümlemeliyiz.", ask: "mantıksal-yapı" },
  { key: "d", text: "Olgusal bir önermenin anlamlı olması, hangi gözlem koşulunda doğrulanacağını gösterebilmemize bağlıdır.", ask: "doğrulama-koşulu" },
] as const).map((p) => ({ ...p, row: scienceRows230.find((r) => r.ask === p.ask)! }));
guard(scienceProbe230.every((p) => p.row !== undefined), "dört ifade de bir satırla eşleşmeli");

/** Örnek 2: üç sav, olası sonuçların hangilerini dışarıda bıraktığına göre karşılaştırılır. */
export const leafOutcomes230 = ["yeşil", "sarı", "kahverengi"] as const;
export type Leaf230 = (typeof leafOutcomes230)[number];
export const leafClaims230 = ([
  { key: "S1", text: "Bu ışık koşulunda bütün yapraklar yeşil kalır.", allows: ["yeşil"] },
  { key: "S2", text: "Bu ışık koşulunda hiçbir yaprak kahverengiye dönmez.", allows: ["yeşil", "sarı"] },
  { key: "S3", text: "Yaprak hangi renge dönerse dönsün, bu görünmez bir etkinin istediği renktir.", allows: ["yeşil", "sarı", "kahverengi"] },
] as const).map((c) => {
  const forbids = leafOutcomes230.filter((o) => !(c.allows as readonly Leaf230[]).includes(o));
  return { ...c, forbids, falsifiable: forbids.length > 0 };
});
export const leafObserved230: Leaf230 = "sarı";
const clashes = (c: (typeof leafClaims230)[number], o: Leaf230) => c.forbids.includes(o);
const riskiest = leafClaims230.reduce((m, c) => (c.forbids.length > m.forbids.length ? c : m));
{
  guard(leafClaims230.filter((c) => c.falsifiable).length === 2 && !leafClaims230[2].falsifiable, "iki sav yanlışlanabilir, biri değil olmalı");
  guard(riskiest.key === "S1", "en çok sonucu dışlayan S1 olmalı");
  guard(leafClaims230.filter((c) => clashes(c, leafObserved230)).map((c) => c.key).join() === "S1", "sarı gözlem yalnız S1 ile uyuşmamalı");
}

export const scienceExamples230: WorkedExample[] = [
  {
    title: "Dört ifade, dört soru türü",
    prompt: `Her ifadenin hangi bilim yaklaşımının sorusunu taşıdığını belirle. ${scienceProbe230.map((p) => `${p.key}) ${p.text}`).join(" ")}`,
    strategy: "Düşünür adını tahmin etmeye çalışma. Önce ifadenin ne sorduğunu bul: çürüten bulgu mu, doğrulama koşulu mu, topluluğun çerçevesi mi, raporun mantıksal yapısı mı?",
    steps: scienceProbe230.map((p) => ({
      label: p.key,
      expression: `${p.row.approach}${p.row.names.length ? ` (${p.row.names.join(", ")})` : ""}`,
      explanation: `Sorduğu soru: ${p.row.question}`,
    })),
    answer: scienceProbe230.map((p) => `${p.key}: ${p.row.approach}`).join("; ") + ".",
    check: "a ile d ikisi de gözlemden söz eder. a, savla uyuşmayacak gözlemi sorar; d ise önermeyi doğrulayacak gözlem koşulunu sorar.",
    pitfall: "Gözlem sözcüğü geçen her ifadeyi aynı yaklaşıma koymak; ifadenin gözlemle hangi ilişkiyi kurduğunu ayırmamak.",
  },
  {
    title: "Hangi sav daha çok risk alıyor?",
    prompt: `Bir bitki türü dört hafta aynı ışık koşulunda tutuluyor. Yaprak rengi için olası sonuçlar ${leafOutcomes230.join(", ")} kabul ediliyor. ${leafClaims230.map((c) => `${c.key}: “${c.text}”`).join(" ")} Hangi savlar yanlışlanabilir? Hangisi en çok sonucu dışarıda bırakır? Bir yaprak ${leafObserved230} çıkarsa hangi savla uyuşmaz?`,
    strategy: "Her sav için izin verdiği sonuçları ve dışarıda bıraktığı sonuçları ayrı yaz. Hiçbir sonucu dışarıda bırakmayan sav deneysel olarak sınanamaz.",
    steps: [
      ...leafClaims230.map((c) => ({
        label: c.key,
        expression: `izin: ${c.allows.join(", ")} · dışarıda: ${c.forbids.length ? c.forbids.join(", ") : "yok"}`,
        explanation: c.falsifiable ? `${word(c.forbids.length)[0].toLocaleUpperCase("tr-TR")}${word(c.forbids.length).slice(1)} olası sonuçla uyuşmaz; yanlışlanabilir.` : "Her sonucu kendisiyle uyumlu sayar; yanlışlanamaz.",
      })),
      { label: `Gözlem: ${leafObserved230}`, expression: `uyuşmayan: ${leafClaims230.filter((c) => clashes(c, leafObserved230)).map((c) => c.key).join(", ")}`, explanation: "Uyuşmazlık görülünce ölçüm ve koşulların sağlanıp sağlanmadığı da incelenir." },
    ],
    answer: `${leafClaims230.filter((c) => c.falsifiable).map((c) => c.key).join(" ve ")} yanlışlanabilir; ${riskiest.key} ${riskiest.forbids.length} sonucu dışarıda bıraktığı için en çok risk alır. ${leafObserved230[0].toLocaleUpperCase("tr-TR")}${leafObserved230.slice(1)} yaprak yalnız ${leafClaims230.filter((c) => clashes(c, leafObserved230)).map((c) => c.key).join(", ")} ile uyuşmaz.`,
    check: `${leafClaims230[2].key} hiçbir olası sonucu dışlamaz; bu onu doğru yapmaz, deneysel olarak sınanamaz yapar. ${leafClaims230[1].key} sarı yaprakla uyumludur, fakat kahverengi bir yaprakla uyuşmaz.`,
    pitfall: "Yanlışlanabilir savı yanlış sav sanmak ya da her sonuca uyan savı en güçlü sav saymak.",
  },
];

export const scienceSupplement230 = {
  title: scienceSection230.title,
  figureTitle: scienceSection230.title,
  paragraphs: scienceSection230.paragraphs,
  summary: `${scienceRows230.map((r) => `${r.approach.replace(/ \(.*\)/, "")}${r.names.length ? ` (${r.names.join(", ")})` : ""}`).join(", ")}. Sınama ölçütü ile bilimsel pratiğin tarihini ayır. ${clash.white} beyaz kuğu savı kesinleştirmez; tek siyah kuğu evrensel savla bağdaşmaz.`,
  appendSection: true as const,
  table: scienceTable,
  examples: scienceExamples230,
};

/** felsefeyi-tanima’nın daha önce eki vardır; o ders için ek mevcut diziye eklenir (theorySupplements). */
export const depth230Supplements = {
  "felsefe-ile-dusunme": [inferenceSupplement230],
  "varlik-felsefesi": [beingSupplement230],
  "bilgi-felsefesi": [knowSupplement230],
  "bilim-felsefesi": [scienceSupplement230],
};
