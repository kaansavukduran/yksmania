import type { GuideSection, WorkedExample } from "./guides/types";

/*
 * TYT Türkçe derinleştirmesi (0.226): ek fiil, fiilimsiler, cümlenin ögeleri,
 * cümle türleri, deyimler ve atasözleri. Kabul edilmiş rehber içeriği
 * değişmez; tablo bölümü, iki özgün çözümlü örnek ve bölüm çizimi
 * görüntüleme katmanında eklenir. Ek biçimleri ünlü ve ünsüz uyumu
 * kurallarıyla kodda üretilir; fiilimsi türü dersin ek listesinden, öge adı
 * durum eki ve anlam etiketinden, cümle türü ögelerin sırasından ve yüklemin
 * çözümlemesinden hesaplanır. Terimler derslerin izlediği MEBİ/OGM okul
 * konvansiyonudur. Örnek cümleler YKSMania için özgün yazılmıştır; deyim ve
 * atasözleri yalnız yerleşik kalıplar ve standart anlamlarıyla kullanılır.
 * Genel yargıları modül yüklenirken korumalar denetler.
 */

const guard = (ok: boolean, message: string) => {
  if (!ok) throw new Error(`depth226: ${message}`);
};
const q = (s: string) => `“${s}”`;
const cap = (s: string) => s[0].toLocaleUpperCase("tr-TR") + s.slice(1);
const list = (xs: readonly string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} ve ${xs.at(-1)}`);

/* ======================================================================
 * Ses kuralları: ünlü uyumu, kaynaştırma, benzeşme, yumuşama
 * ==================================================================== */

export const VOWELS226 = "aıoueiöü";
const BACK = "aıou";
const ROUND = "ouöü";
/** Sert (tonsuz) ünsüzler: f, s, t, k, ç, ş, h, p. */
export const HARD226 = "fstkçşhp";
const isV = (c: string | undefined) => c !== undefined && VOWELS226.includes(c);
export const lastVowel226 = (s: string) => {
  const v = [...s].reverse().find((c) => isV(c));
  guard(v !== undefined, `${s} bir ünlü taşımalı`);
  return v!;
};
const syllables = (s: string) => [...s].filter((c) => isV(c)).length;
/** İki biçimli ünlü (a/e): son ünlü kalınsa a, inceyse e. */
export const twoWay226 = (s: string) => (BACK.includes(lastVowel226(s)) ? "a" : "e");
/** Dört biçimli ünlü (ı/i/u/ü): kalın-ince ve düz-yuvarlak uyumu. */
export const fourWay226 = (s: string) => {
  const v = lastVowel226(s);
  return BACK.includes(v) ? (ROUND.includes(v) ? "u" : "ı") : ROUND.includes(v) ? "ü" : "i";
};
export const endsHard226 = (s: string) => HARD226.includes(s.at(-1)!);

export type Rule226 = "uyum" | "kaynaştırma" | "benzeşme" | "yumuşama";
export interface Realized226 {
  /** Taban (yumuşamışsa ğ ile). */
  stem: string;
  /** Kaynaştırma ünsüzü (y) veya boş. */
  buffer: string;
  /** Ekin yüzey biçimi. */
  suffix: string;
  word: string;
  /** Bu sözcükte gerçekten işleyen kurallar. */
  rules: readonly Rule226[];
}

/**
 * Ek kalıbını tabana uygular. Kalıpta "(y)" kaynaştırma, "D" d/t, "A" a/e,
 * "I" ı/i/u/ü demektir; geri kalan harfler olduğu gibi yazılır. `skip`
 * verilen kuralları bilerek uygulamaz (öğrenci hatalarını yeniden üretmek
 * için): uyum atlanırsa A → e, I → i yazılır.
 */
export function realize226(base: string, template: string, skip: readonly Rule226[] = []): Realized226 {
  const rules = new Set<Rule226>();
  let suffix = "";
  let buffer = "";
  let i = 0;
  if (template.startsWith("(y)")) {
    i = 3;
    if (isV(base.at(-1))) {
      if (!skip.includes("kaynaştırma")) buffer = "y";
      rules.add("kaynaştırma");
    }
  }
  for (; i < template.length; i++) {
    const c = template[i];
    const before = base + buffer + suffix;
    if (c === "D") {
      const hard = endsHard226(before);
      if (hard) rules.add("benzeşme");
      suffix += hard && !skip.includes("benzeşme") ? "t" : "d";
    } else if (c === "A") {
      rules.add("uyum");
      suffix += skip.includes("uyum") ? "e" : twoWay226(before);
    } else if (c === "I") {
      rules.add("uyum");
      suffix += skip.includes("uyum") ? "i" : fourWay226(before);
    } else suffix += c;
  }
  let stem = base;
  // Ünsüz yumuşaması: çok heceli, ünlü + k ile biten taban ünlüyle başlayan ek önünde.
  if (buffer === "" && isV(suffix[0]) && base.endsWith("k") && isV(base.at(-2)) && syllables(base) > 1) {
    rules.add("yumuşama");
    if (!skip.includes("yumuşama")) stem = `${base.slice(0, -1)}ğ`;
  }
  // Uyum kuralı yalnız gerçekten değişken ünlü varsa işler; skip edilen kurallar "işleyen" sayılmaya devam eder.
  return { stem, buffer, suffix, word: stem + buffer + suffix, rules: [...rules] };
}
const seg = (r: Realized226) => [r.stem, r.buffer, r.suffix].filter(Boolean).join("-");

/* ======================================================================
 * 1. Ek fiil: sekiz taban, beş biçim
 * ==================================================================== */

export const ekFiilForms226 = [
  { key: "genis", name: "geniş zaman (o)", template: "DIr", label: "-dır" },
  { key: "ben", name: "geniş zaman (ben)", template: "(y)Im", label: "-(y)ım" },
  { key: "hikaye", name: "geçmiş (idi)", template: "(y)DI", label: "-(y)dı" },
  { key: "rivayet", name: "rivayet (imiş)", template: "(y)mIş", label: "-(y)mış" },
  { key: "sart", name: "şart (ise)", template: "(y)sA", label: "-(y)sa" },
] as const;
/** Ad soylu tabanlar: dört ünlü sınıfı, ünlüyle / yumuşak ünsüzle / sert ünsüzle biten. */
export const ekFiilBases226 = ["hasta", "öğrenci", "uykulu", "üzgün", "sessiz", "boş", "dürüst", "sıcak"] as const;
export interface EkFiilRow226 { base: string; vowel: string; ending: "ünlü" | "yumuşak ünsüz" | "sert ünsüz"; forms: readonly Realized226[] }
export const ekFiilRows226: readonly EkFiilRow226[] = ekFiilBases226.map((base) => ({
  base,
  vowel: lastVowel226(base),
  ending: isV(base.at(-1)) ? "ünlü" : endsHard226(base) ? "sert ünsüz" : "yumuşak ünsüz",
  forms: ekFiilForms226.map((f) => realize226(base, f.template)),
}));
const formOf = (row: EkFiilRow226, key: (typeof ekFiilForms226)[number]["key"]) => row.forms[ekFiilForms226.findIndex((f) => f.key === key)];
const rowOf = (base: string) => ekFiilRows226.find((r) => r.base === base)!;
const vowelEnd = ekFiilRows226.filter((r) => r.ending === "ünlü");
const hardEnd = ekFiilRows226.filter((r) => r.ending === "sert ünsüz");
const softened = ekFiilRows226.filter((r) => r.forms.some((f) => f.rules.includes("yumuşama")));
const fourSet = [...new Set(ekFiilRows226.map((r) => formOf(r, "hikaye").suffix.at(-1)!))];
const twoSet = [...new Set(ekFiilRows226.map((r) => formOf(r, "sart").suffix.at(-1)!))];
{
  guard(new Set(ekFiilRows226.map((r) => fourWay226(r.base))).size === 4, "dört ünlü sınıfı da tabloda bulunmalı");
  guard(fourSet.length === 4 && twoSet.length === 2, "-dı dört, -sa iki biçimli görünmeli");
  for (const r of ekFiilRows226) {
    for (const key of ["genis", "hikaye", "rivayet"] as const) {
      const f = formOf(r, key);
      guard([...f.suffix].filter((c) => isV(c)).every((c) => c === fourWay226(r.base)), `${f.word} dört biçimli uyuma uymalı`);
    }
    guard(formOf(r, "sart").suffix.at(-1) === twoWay226(r.base), `${r.base} şartı iki biçimli uyuma uymalı`);
    // Kaynaştırma: (y) kalıplı ekler ünlüyle biten tabanda y alır; -dır hiçbir zaman almaz.
    for (const key of ["ben", "hikaye", "rivayet", "sart"] as const) guard((formOf(r, key).buffer === "y") === (r.ending === "ünlü"), `${r.base} için y yalnız ünlüden sonra`);
    guard(formOf(r, "genis").buffer === "", "-dır kaynaştırma almaz");
    // Benzeşme: yalnız d ile başlayan ekler (-dır, -dı) sert ünsüzden sonra t olur; m ve s değişmez.
    for (const key of ["genis", "hikaye"] as const) guard(formOf(r, key).suffix.startsWith(r.ending === "sert ünsüz" ? "t" : "d"), `${r.base} için d/t`);
    guard(formOf(r, "rivayet").suffix.startsWith("m") && formOf(r, "sart").suffix.startsWith("s"), "m ve s benzeşmeye girmez");
    // Yumuşama yalnız ünlüyle başlayan -ım önünde; ünsüzle başlayan eklerde taban korunur.
    for (const f of r.forms) guard(f.rules.includes("yumuşama") === (f === formOf(r, "ben") && r.base === "sıcak"), `${f.word} yumuşama yalnız sıcak + ım`);
  }
  guard(vowelEnd.length >= 2 && hardEnd.length >= 2 && softened.length === 1, "ünlü, sert ünsüz ve yumuşama satırları bulunmalı");
}
const endingCell = (r: EkFiilRow226) => `${r.base} (son ünlü ${r.vowel}; ${r.ending === "ünlü" ? "ünlüyle biter" : `${r.ending} ${r.base.at(-1)}`})`;
/** Uyumdan başka bir kural işlediyse çözümleme de gösterilir. */
const formCell = (f: Realized226) => (f.rules.some((r) => r !== "uyum") ? `${f.word} (${seg(f)})` : f.word);
const ekFiilTable = {
  layout: "table" as const,
  headers: ["Taban", "Geniş zaman: o / ben", "Geçmiş (idi)", "Rivayet (imiş)", "Şart (ise)"],
  rows: ekFiilRows226.map((r) => [
    endingCell(r),
    `${formOf(r, "genis").word} / ${formCell(formOf(r, "ben"))}`,
    formCell(formOf(r, "hikaye")),
    formCell(formOf(r, "rivayet")),
    formCell(formOf(r, "sart")),
  ]),
};
const w = (base: string, key: (typeof ekFiilForms226)[number]["key"]) => formOf(rowOf(base), key).word;
export const ekFiilSection226: GuideSection = {
  title: "Sekiz tabanda ek fiilin biçimleri ve ses kuralları",
  paragraphs: [
    `Tablodaki ${ekFiilRows226.length} taban ad soyludur ve aynı biçimler üçüncü tekil kişiyle, geniş zamanda ayrıca birinci tekille kuruldu. -dır, -dı ve -mış ekinin ünlüsü dört biçimlidir (${fourSet.join(", ")}): tabanın son ünlüsü kalın düzse ı, ince düzse i, kalın yuvarlaksa u, ince yuvarlaksa ü gelir. Şart ekinin ünlüsü iki biçimlidir (${twoSet.join(", ")}): kalın ünlüden sonra a, ince ünlüden sonra e.`,
    `Ünlüyle biten ${list(vowelEnd.map((r) => r.base))} tabanlarında idi, imiş ve ise sözcüklerinin i’si düşer; iki ünlünün arasına y kaynaştırma ünsüzü girer: ${list(vowelEnd.map((r) => w(r.base, "hikaye")))}. Geniş zamandaki -dır ünsüzle başladığı için y almaz (${w("hasta", "genis")}). Birinci tekildeki -ım ünlüyle başlar; ünlüyle biten tabanda o da y ile bağlanır (${w("hasta", "ben")}).`,
    `Sert ünsüzle (f, s, t, k, ç, ş, h, p) biten ${list(hardEnd.map((r) => r.base))} tabanlarında -dır ve -dı ekinin d’si t olur: ${list(hardEnd.map((r) => w(r.base, "hikaye")))}. Bu benzeşme yalnız d ile başlayan eklerde görülür; -mış ve -sa ekinin m ve s’si değişmez (${w("dürüst", "rivayet")}, ${w("dürüst", "sart")}). Çok heceli ${softened[0].base} sözcüğünün sonundaki k, ünlüyle başlayan -ım önünde ğ olur (${w("sıcak", "ben")}); ünsüzle başlayan eklerin önünde k kalır (${w("sıcak", "hikaye")}). Bu, ses bilgisindeki ünsüz yumuşamasıdır ve ek fiilin görevini değiştirmez.`,
  ],
  table: ekFiilTable,
  figureTitle: "Sekiz tabanda ek fiilin biçimleri ve ses kuralları",
};

// Örnek 1: boşluk doldurma.
export const ekFiilFill226 = [
  { base: "ıslak", key: "hikaye" as const, template: "(y)DI" },
  { base: "çamurlu", key: "rivayet" as const, template: "(y)mIş" },
].map((x) => ({ ...x, r: realize226(x.base, x.template) }));
const [islak, camurlu] = ekFiilFill226;
// Örnek 2: öğrencinin unuttuğu kurallar, aynı kurallar atlanarak yeniden üretilir.
export const ekFiilErrors226 = [
  { base: "genç", plus: "idi", template: "(y)DI", wrong: "gençdi", skipped: ["benzeşme"] as Rule226[] },
  { base: "meraklı", plus: "ise", template: "(y)sA", wrong: "meraklısa", skipped: ["kaynaştırma"] as Rule226[] },
  { base: "küçük", plus: "-ım (ben)", template: "(y)Im", wrong: "küçükim", skipped: ["yumuşama", "uyum"] as Rule226[] },
].map((x) => ({ ...x, right: realize226(x.base, x.template), rebuilt: realize226(x.base, x.template, x.skipped).word }));
for (const e of ekFiilErrors226) {
  guard(e.rebuilt === e.wrong, `${e.wrong} atlanan kurallarla yeniden üretilmeli`);
  guard(e.right.word !== e.wrong && e.skipped.every((s) => e.right.rules.includes(s)), `${e.base} için atlanan kurallar gerçekten işlemeli`);
}
const ruleName: Record<Rule226, string> = { uyum: "ünlü uyumu", kaynaştırma: "y kaynaştırması", benzeşme: "ünsüz benzeşmesi (d → t)", yumuşama: "ünsüz yumuşaması (k → ğ)" };
export const ekFiilExamples226: WorkedExample[] = [
  {
    title: "Boşluğu ek fiille doldur, ses kurallarını göster",
    prompt: `${q(`Sabah yollar ___ (${islak.base} + idi). Gece yağmur yağdığını sonradan öğrendim: bütün bahçe ___ (${camurlu.base} + imiş).`)} Boşlukları ek fiille tek sözcük olarak yaz ve her sözcükte işleyen ses kurallarını göster.`,
    strategy: "Önce tabanın son ünlüsünü ve son sesini bul; sonra i’nin düşmesini, kaynaştırmayı, d/t seçimini ve ünlü uyumunu sırayla uygula.",
    steps: [
      { label: islak.base, expression: `${islak.base} + idi → ${seg(islak.r)}`, explanation: `Son ünlü ${lastVowel226(islak.base)}, ekin ünlüsü ${islak.r.suffix.at(-1)}. Son ses k serttir; d, t olur. Ek ünsüzle başladığı için k yumuşamaz.` },
      { label: camurlu.base, expression: `${camurlu.base} + imiş → ${seg(camurlu.r)}`, explanation: `Taban ünlüyle biter; i düşer ve y kaynaştırma ünsüzü girer. Son ünlü ${lastVowel226(camurlu.base)} kalın yuvarlak, ekin ünlüsü ${camurlu.r.suffix[1]}.` },
      { label: "Bağlam", explanation: "İlk cümle konuşanın gördüğü geçmiş durumu, ikinci cümle sonradan öğrenilen durumu bildirir; biçim adları geçmiş (idi) ve rivayettir (imiş)." },
    ],
    answer: `${islak.r.word}; ${camurlu.r.word}.`,
    check: `${islak.r.word} için ${islak.r.rules.map((r) => ruleName[r]).join(" ve ")}; ${camurlu.r.word} için ${camurlu.r.rules.map((r) => ruleName[r]).join(" ve ")} işledi.`,
    pitfall: `${realize226(islak.base, "(y)DI", ["benzeşme"]).word} veya ${realize226(camurlu.base, "(y)mIş", ["kaynaştırma"]).word} yazmak; ya da ünsüzle başlayan ek önünde de k’yi ğ yapmak.`,
  },
  {
    title: "Yanlış yazılmış ek fiil biçimlerini kuralla düzelt",
    prompt: `Bir öğrenci ${list(ekFiilErrors226.map((e) => `${e.base} + ${e.plus} için ${q(e.wrong)}`))} yazdı. Her yanlışın hangi ses kuralını atladığını bul ve doğru biçimi yaz.`,
    strategy: "Ekin ilk sesine ve tabanın son sesine bak: ünsüzle başlayan ek sert ünsüzden sonra benzeşir, ünlüyle başlayan ek ünlüden sonra y alır, ünlüyle başlayan ek k ile biten çok heceli tabanı yumuşatır; ekin ünlüsü uyuma uyar.",
    steps: ekFiilErrors226.map((e) => ({
      label: e.wrong,
      expression: `${e.wrong} → ${e.right.word}`,
      explanation: `Atlanan: ${e.skipped.map((s) => ruleName[s]).join(" ve ")}. Doğru çözümleme ${seg(e.right)}.`,
    })),
    answer: list(ekFiilErrors226.map((e) => e.right.word)) + ".",
    check: "Atlanan kurallar yeniden atlandığında öğrencinin yazdığı biçimin aynısı çıkar; kurallar uygulanınca doğru biçim çıkar.",
    pitfall: "Yalnız bir kuralı düzeltip aynı sözcükteki ikinci hatayı (küçükim içinde hem yumuşama hem uyum) gözden kaçırmak.",
  },
];

export const ekFiilSupplement226 = {
  title: ekFiilSection226.title,
  figureTitle: ekFiilSection226.title,
  paragraphs: ekFiilSection226.paragraphs,
  summary: `-dır, -dı, -mış dört biçimli (${fourSet.join(", ")}), -sa iki biçimli (${twoSet.join(", ")}). Ünlüyle biten tabanda i düşer, y girer (${w("hasta", "hikaye")}, ${w("hasta", "sart")}); -dır y almaz. Sert ünsüzden sonra -dır/-dı t ile başlar (${w("dürüst", "hikaye")}, ${w("boş", "genis")}). Ünlüyle başlayan -ım çok heceli k’yi ğ yapar (${w("sıcak", "ben")}).`,
  appendSection: true as const,
  table: ekFiilTable,
  examples: ekFiilExamples226,
};

/* ======================================================================
 * 2. Fiilimsiler: ek listesinden tür
 * ==================================================================== */

export type FiilimsiType226 = "isim-fiil" | "sıfat-fiil" | "zarf-fiil";
/** Dersin ek listeleri (kalıp → dersteki gösterim). -ken ve -casına çekimli tabana geldiği için bu kök sınayıcısına alınmadı. */
export const fiilimsiSuffixes226: Readonly<Record<FiilimsiType226, readonly { template: string; label: string }[]>> = {
  "isim-fiil": [
    { template: "mA", label: "-ma/-me" },
    { template: "mAk", label: "-mak/-mek" },
    { template: "(y)Iş", label: "-ış/-iş/-uş/-üş" },
  ],
  "sıfat-fiil": [
    { template: "(y)An", label: "-an/-en" },
    { template: "(y)AsI", label: "-ası/-esi" },
    { template: "mAz", label: "-maz/-mez" },
    { template: "Ar", label: "-ar/-er" },
    { template: "DIk", label: "-dık/-dik/-duk/-dük" },
    { template: "(y)AcAk", label: "-acak/-ecek" },
    { template: "mIş", label: "-mış/-miş/-muş/-müş" },
  ],
  "zarf-fiil": [
    { template: "(y)Ip", label: "-ıp/-ip/-up/-üp" },
    { template: "(y)ArAk", label: "-arak/-erek" },
    { template: "(y)IncA", label: "-ınca/-ince" },
    { template: "mAdAn", label: "-madan/-meden" },
    { template: "mAksIzIn", label: "-maksızın/-meksizin" },
    { template: "DIkçA", label: "-dıkça/-dikçe" },
    { template: "(y)AlI", label: "-alı/-eli" },
    { template: "(y)AsIyA", label: "-asıya/-esiye" },
  ],
};
export interface FiilimsiTag226 {
  word: string;
  stem: string;
  type: FiilimsiType226;
  template: string;
  label: string;
  buffer: string;
  /** Ekin sözcükteki yüzeyi (yumuşamışsa ğ ile). */
  surface: string;
  /** Ekten sonra kalan isim çekim ekleri. */
  rest: string;
  softened: boolean;
}
/** Kökten sonraki parçanın başını ek listesindeki en uzun eşleşmeyle etiketler. */
export function tagFiilimsi226(word: string, stem: string): FiilimsiTag226 {
  guard(word.startsWith(stem), `${word}, ${stem} ile başlamalı`);
  const tail = word.slice(stem.length);
  const hits: FiilimsiTag226[] = [];
  for (const [type, xs] of Object.entries(fiilimsiSuffixes226) as [FiilimsiType226, (typeof fiilimsiSuffixes226)["isim-fiil"]][]) {
    for (const { template, label } of xs) {
      const r = realize226(stem, template);
      const plain = r.buffer + r.suffix;
      const variants = [{ s: plain, soft: false }];
      if (plain.endsWith("k")) variants.push({ s: `${plain.slice(0, -1)}ğ`, soft: true });
      for (const { s, soft } of variants) {
        if (!tail.startsWith(s)) continue;
        const rest = tail.slice(s.length);
        // Yumuşamış biçim yalnız ünlü önünde, yumuşamamış k ünlü önünde değil.
        if (plain.endsWith("k") && soft !== isV(rest[0])) continue;
        hits.push({ word, stem, type, template, label, buffer: r.buffer, surface: s.slice(r.buffer.length), rest, softened: soft });
      }
    }
  }
  guard(hits.length > 0, `${word} için ek bulunmalı`);
  const best = Math.max(...hits.map((h) => h.buffer.length + h.surface.length));
  const top = hits.filter((h) => h.buffer.length + h.surface.length === best);
  guard(top.length === 1, `${word} için tek en uzun ek olmalı`);
  return top[0];
}
const morphText = (t: FiilimsiTag226) => [t.stem, t.buffer, t.surface, t.rest].filter(Boolean).join("-").toLocaleLowerCase("tr-TR");
const low = (s: string) => s.toLocaleLowerCase("tr-TR");

export interface FiilimsiRow226 { sentence: string; word: string; stem: string; bound: string; role: string; tag: FiilimsiTag226 }
const tokens = (s: string) => s.replace(/[.,!?;…“”]/g, "").split(" ").filter(Boolean);
export const fiilimsiRows226: readonly FiilimsiRow226[] = [
  { sentence: "Erken kalkmak bana iyi geliyor.", word: "kalkmak", stem: "kalk", bound: "geliyor", role: "yüklemin öznesi" },
  { sentence: "Arkadaşımın bize öyle bakışı herkesi şaşırttı.", word: "bakışı", stem: "bak", bound: "şaşırttı", role: "özne öbeğinin çekirdeği" },
  { sentence: "Masaya bırakılan notu okudun mu?", word: "bırakılan", stem: "bırakıl", bound: "notu", role: "adı niteler" },
  { sentence: "Okunacak kitapları rafın en üstüne dizdik.", word: "Okunacak", stem: "Okun", bound: "kitapları", role: "adı niteler" },
  { sentence: "Dün izlediğimiz belgesel çok uzundu.", word: "izlediğimiz", stem: "izle", bound: "belgesel", role: "adı niteler" },
  { sentence: "Merdivenleri koşarak çıktı.", word: "koşarak", stem: "koş", bound: "çıktı", role: "nasıl sorusuna cevap" },
  { sentence: "Yağmur dinince yola çıktık.", word: "dinince", stem: "din", bound: "çıktık", role: "ne zaman sorusuna cevap" },
  { sentence: "Arkasına bakmadan uzaklaştı.", word: "bakmadan", stem: "bak", bound: "uzaklaştı", role: "nasıl sorusuna cevap" },
].map((r) => ({ ...r, tag: tagFiilimsi226(r.word, r.stem) }));
const byType = (type: FiilimsiType226) => fiilimsiRows226.filter((r) => r.tag.type === type);
const withRest = fiilimsiRows226.filter((r) => r.tag.rest !== "");
const softRows = fiilimsiRows226.filter((r) => r.tag.softened);
const gövdeRows = fiilimsiRows226.filter((r) => r.stem.length > 0 && ["bırakıl", "Okun"].includes(r.stem));
{
  for (const type of ["isim-fiil", "sıfat-fiil", "zarf-fiil"] as const) guard(byType(type).length >= 2, `${type} en az iki satırda`);
  for (const r of fiilimsiRows226) {
    const toks = tokens(r.sentence);
    const i = toks.indexOf(r.word);
    guard(i >= 0, `${r.word} cümlede geçmeli`);
    // Sıfat-fiil nitelediği adın hemen önündedir; zarf-fiil yükleme bağlanır; isim-fiil yüklem değildir.
    if (r.tag.type === "sıfat-fiil") guard(toks[i + 1] === r.bound, `${r.word} ardındaki adı nitelemeli`);
    else guard(toks.at(-1) === r.bound && i < toks.length - 1, `${r.word} yükleme bağlanmalı`);
  }
  guard(softRows.length === 1 && softRows[0].tag.rest !== "" && isV(softRows[0].tag.rest[0]), "yumuşama ünlüyle başlayan ek önünde");
  guard(gövdeRows.length === 2, "iki satır çatı ekli gövdeden kurulmalı");
}
const fiilimsiTable = {
  layout: "table" as const,
  headers: ["Cümle", "Kök + ek + kalan", "Ek ve listesi", "Bağlandığı söz"],
  rows: fiilimsiRows226.map((r) => [
    r.sentence,
    morphText(r.tag),
    `${r.tag.label}: ${r.tag.type}`,
    `${r.bound} (${r.role})`,
  ]),
};
const typeLists = (["isim-fiil", "sıfat-fiil", "zarf-fiil"] as const).map((t) => `${t} ${fiilimsiSuffixes226[t].map((x) => x.label).join(", ")}`);
export const fiilimsiSection226: GuideSection = {
  title: "Eki listeden bul, görevi cümlede kanıtla",
  paragraphs: [
    `Tablodaki her fiilimsi önce fiil kökü veya gövdesine ayrıldı; kalan parçanın başı dersin ek listeleriyle karşılaştırıldı ve en uzun eşleşen ek seçildi. Listeler: ${typeLists.join("; ")}. Eşleşen ekin listesi türü verdi: ${(["isim-fiil", "sıfat-fiil", "zarf-fiil"] as const).map((t) => `${byType(t).length} ${t}`).join(", ")}.`,
    `Ekten sonra kalan parça isim çekim ekidir: ${list(withRest.map((r) => `${r.word} içinde -${r.tag.rest}`))}. -dık ve -acak ünlüyle başlayan bir ekten önce k yerine ğ ile görünür: ${morphText(softRows[0].tag)}. Ek yalın köke de (${list(fiilimsiRows226.filter((r) => !gövdeRows.includes(r)).slice(0, 2).map((r) => `${r.stem}-`))}) çatı ekli gövdeye de (${list(gövdeRows.map((r) => `${r.stem.toLocaleLowerCase("tr-TR")}-`))}) gelir; gövdedeki edilgenlik eki türü değiştirmez.`,
    `Tür ekten okunur, görev cümlede kanıtlanır. Sıfat-fiil nitelediği adın hemen önündedir (${list(byType("sıfat-fiil").map((r) => `${low(r.word)} ${r.bound}`))}); zarf-fiil temel eyleme bağlanır (${list(byType("zarf-fiil").map((r) => `${r.word} → ${r.bound}`))}); isim-fiil ad gibi öge olur (${list(byType("isim-fiil").map((r) => r.word))}: özne öbeği). Aynı ek başka bir cümlede çekimli yüklem de olabilir; listedeki eşleşme yalnız adaydır, bağlamla birlikte karar verilir.`,
  ],
  table: fiilimsiTable,
  figureTitle: "Eki listeden bul, görevi cümlede kanıtla",
};

// Örnek 1: tek cümlede üç fiilimsi.
export const fiilimsiTriple226 = {
  sentence: "Okulda öğrendiğimiz şarkıyı söyleyerek eve yürümek hoşumuza gitti.",
  items: [
    { word: "öğrendiğimiz", stem: "öğren", bound: "şarkıyı", why: "şarkıyı adını niteler" },
    { word: "söyleyerek", stem: "söyle", bound: "yürümek", why: "yürüme eyleminin nasıl yapıldığını gösterir" },
    { word: "yürümek", stem: "yürü", bound: "gitti", why: "eve yürümek öbeği hoşumuza gitti yükleminin öznesidir" },
  ].map((x) => ({ ...x, tag: tagFiilimsi226(x.word, x.stem) })),
};
{
  const toks = tokens(fiilimsiTriple226.sentence);
  for (const it of fiilimsiTriple226.items) guard(toks.includes(it.word), `${it.word} cümlede geçmeli`);
  guard(new Set(fiilimsiTriple226.items.map((x) => x.tag.type)).size === 3, "üç fiilimsi üç ayrı türde olmalı");
  const sf = fiilimsiTriple226.items.find((x) => x.tag.type === "sıfat-fiil")!;
  guard(toks[toks.indexOf(sf.word) + 1] === sf.bound, "sıfat-fiil ardındaki adı nitelemeli");
}
// Örnek 2: -maz üç bağlamda. Liste adayı aynı, bağlam kararı farklı.
export type MazContext226 = "zarf-fiil ikilisi" | "çekimli fiil" | "sıfat-fiil";
export function mazContext226(sentence: string, word: string, stem: string): { kind: MazContext226; bound: string } {
  const toks = tokens(sentence);
  const i = toks.indexOf(word);
  guard(i >= 0 && tagFiilimsi226(word, stem).template === "mAz", `${word} -maz taşımalı`);
  if (i > 0 && toks[i - 1] === realize226(stem, "Ar").word) return { kind: "zarf-fiil ikilisi", bound: toks.at(-1)! };
  if (i === toks.length - 1) return { kind: "çekimli fiil", bound: word };
  return { kind: "sıfat-fiil", bound: toks.slice(i + 1).find((t) => t !== "bir")! };
}
export const mazRows226 = [
  { sentence: "Sesi duyar duymaz pencereye koştu.", word: "duymaz", stem: "duy" },
  { sentence: "Bu koşucu kolay kolay yorulmaz.", word: "yorulmaz", stem: "yorul" },
  { sentence: "Yorulmaz bir koşucu yarışı önde bitirdi.", word: "Yorulmaz", stem: "Yorul" },
].map((r) => ({ ...r, ctx: mazContext226(r.sentence, r.word, r.stem) }));
guard(new Set(mazRows226.map((r) => r.ctx.kind)).size === 3, "-maz üç bağlamda üç ayrı karar vermeli");
const mazName: Record<MazContext226, string> = { "zarf-fiil ikilisi": "-ar…-maz zarf-fiil ikilisi", "çekimli fiil": "çekimli fiil (geniş zamanın olumsuzu), yüklem", "sıfat-fiil": "sıfat-fiil" };
export const fiilimsiExamples226: WorkedExample[] = [
  {
    title: "Tek cümlede üç fiilimsi, üç tür",
    prompt: `${q(fiilimsiTriple226.sentence)} cümlesindeki fiilimsileri bul; her birinin kökünü, ekini, türünü ve bağlandığı sözü yaz.`,
    strategy: "Çekimli yüklemi (gitti) ayır; kalan fiil tabanlı sözcüklerde kökten sonraki eki listeyle eşle, sonra bağlandığı sözü cümlede göster.",
    steps: fiilimsiTriple226.items.map((x) => ({
      label: x.word,
      expression: `${morphText(x.tag)}: ${x.tag.label}`,
      explanation: `${cap(x.tag.type)}; ${x.why}.`,
    })),
    answer: list(fiilimsiTriple226.items.map((x) => `${x.word} ${x.tag.type}`)) + ".",
    check: `Yüklem gitti çekimli fiildir; üç fiilimsinin hiçbiri kip ve kişiyle bağımsız yargı kurmaz. ${cap(fiilimsiTriple226.items[0].word)} içindeki ğ, -dik ekinin ünlüyle başlayan -imiz önündeki yumuşamasıdır.`,
    pitfall: "Söyleyerek ile yürümek arasındaki bağı kaçırıp söyleyerek sözcüğünü gitti yüklemine bağlamak ya da öğrendiğimiz sözcüğündeki -imiz’i kişi eki sanıp çekimli fiil demek.",
  },
  {
    title: "Aynı -maz, üç ayrı karar",
    prompt: `${mazRows226.map((r, i) => `(${i + 1}) ${q(r.sentence)}`).join(" ")} Üç cümledeki -maz’lı sözcüğün (${list(mazRows226.map((r) => low(r.word)))}) görevini belirle.`,
    strategy: "Üç sözcükte de ek listesi -maz/-mez sıfat-fiil adayını verir. Kararı bağlam verir: önünde aynı kökün -ar biçimi var mı, sözcük cümlenin yüklemi mi, ardından nitelediği bir ad geliyor mu?",
    steps: mazRows226.map((r, i) => ({
      label: `(${i + 1}) ${low(r.word)}`,
      expression: `${morphText(tagFiilimsi226(r.word, r.stem))} → ${mazName[r.ctx.kind]}`,
      explanation: r.ctx.kind === "zarf-fiil ikilisi" ? `Önünde ${realize226(r.stem, "Ar").word} var; ikili, ${r.ctx.bound} eylemine ne zaman sorusuyla bağlanır.` : r.ctx.kind === "çekimli fiil" ? "Sözcük cümlenin sonundaki yüklemdir; kip ve kişiyle yargı kurar, fiilimsi değildir." : `Ardından gelen ${r.ctx.bound} adını niteler.`,
    })),
    answer: mazRows226.map((r, i) => `(${i + 1}) ${low(r.word)}: ${mazName[r.ctx.kind]}`).join("; ") + ".",
    check: "Üç cümlede ek aynı yazıldı; değişen, sözcüğün cümledeki yeri ve bağlandığı sözdür.",
    pitfall: "-maz gördüğün her yerde sıfat-fiil demek; yüklemdeki geniş zaman olumsuzunu veya -ar…-maz ikilisini ayırmamak.",
  },
];

export const fiilimsiSupplement226 = {
  title: fiilimsiSection226.title,
  figureTitle: fiilimsiSection226.title,
  paragraphs: fiilimsiSection226.paragraphs,
  summary: `Kökü ayır, kalan parçanın başını ek listesiyle eşle: ${typeLists.join("; ")}. Ekten sonrası çekim ekidir (${morphText(softRows[0].tag)}). Sıfat-fiil adın önünde, zarf-fiil yükleme bağlı, isim-fiil ad gibi öge. Listedeki eşleşme adaydır; bağlam çekimli fiili ayırır.`,
  appendSection: true as const,
  table: fiilimsiTable,
  examples: fiilimsiExamples226,
};

/* ======================================================================
 * 3. Cümlenin ögeleri: durum eki + anlam → öge ve soru
 * ==================================================================== */

export type Case226 = "yalın" | "belirtme" | "yönelme" | "bulunma" | "ayrılma" | "vasıta";
export type Sem226 = "yapan" | "etkilenen" | "yer" | "zaman" | "neden" | "araç";
export type Role226 = "yüklem" | "özne" | "belirtili nesne" | "belirtisiz nesne" | "yer tamlayıcısı" | "zarf tümleci";
const CASE_ENDINGS: Readonly<Record<Exclude<Case226, "yalın">, readonly string[]>> = {
  belirtme: ["ı", "i", "u", "ü", "yı", "yi", "yu", "yü", "nı", "ni", "nu", "nü"],
  yönelme: ["a", "e", "ya", "ye", "na", "ne"],
  bulunma: ["da", "de", "ta", "te", "nda", "nde"],
  ayrılma: ["dan", "den", "tan", "ten", "ndan", "nden"],
  vasıta: ["la", "le", "yla", "yle"],
};
/** Öbeğin son ekinden durum: "-dan" → ayrılma; ek yoksa yalın. */
export const caseOf226 = (ek: string): Case226 => {
  if (ek === "") return "yalın";
  const e = ek.replace(/^-/, "");
  const hit = (Object.entries(CASE_ENDINGS) as [Case226, readonly string[]][]).find(([, xs]) => xs.includes(e));
  guard(hit !== undefined, `${ek} bilinen bir durum eki olmalı`);
  return hit![0];
};
export interface Obek226 { t: string; ek?: string; sem?: Sem226; animate?: boolean; pred?: true }
export interface OgeRow226 { sentence: string; parts: readonly Obek226[]; hidden?: string; predBase?: string }
export function roleOf226(o: Obek226): Role226 {
  if (o.pred) return "yüklem";
  const c = caseOf226(o.ek ?? "");
  guard(o.t.endsWith((o.ek ?? "").replace(/^-/, "")), `${o.t} öbeği ${o.ek} ile bitmeli`);
  switch (o.sem) {
    case "yapan":
      guard(c === "yalın", `${o.t}: özne yalın olmalı`);
      return "özne";
    case "etkilenen":
      guard(c === "belirtme" || c === "yalın", `${o.t}: nesne yalın ya da belirtme durumunda`);
      return c === "belirtme" ? "belirtili nesne" : "belirtisiz nesne";
    case "yer":
      guard(c === "yönelme" || c === "bulunma" || c === "ayrılma", `${o.t}: yer tamlayıcısı -e/-de/-den almalı`);
      return "yer tamlayıcısı";
    default:
      return "zarf tümleci";
  }
}
const WH: Record<Exclude<Case226, "yalın" | "belirtme" | "vasıta">, [string, string]> = { yönelme: ["nereye", "kime"], bulunma: ["nerede", "kimde"], ayrılma: ["nereden", "kimden"] };
const ZT_Q: Record<"zaman" | "neden" | "araç", string> = { zaman: "ne zaman", neden: "niçin", araç: "neyle" };
/** Öbeği bulduran soru; yüklem isim ise "… olan ne?" kalıbı kullanılır. */
export function questionOf226(o: Obek226, row: OgeRow226): string {
  const role = roleOf226(o);
  const pred = row.parts.find((p) => p.pred)!.t;
  const tail = row.predBase ?? pred;
  switch (role) {
    case "yüklem":
      return "yargıyı taşır";
    case "özne":
      return row.predBase ? `${cap(row.predBase)} olan ne?` : `${o.animate ? "Kim" : "Ne"} ${pred}?`;
    case "belirtili nesne":
      return `${o.animate ? "Kimi" : "Neyi"} ${pred}?`;
    case "belirtisiz nesne":
      return `Ne ${pred}?`;
    case "yer tamlayıcısı":
      return `${cap(WH[caseOf226(o.ek ?? "") as keyof typeof WH][o.animate ? 1 : 0])} ${pred}?`;
    default:
      return `${cap(ZT_Q[o.sem as keyof typeof ZT_Q])} ${tail}?`;
  }
}
const P = (t: string, sem?: Sem226, ek = "", animate = false): Obek226 => ({ t, ek, sem, animate });
const Y = (t: string): Obek226 => ({ t, pred: true });
export const ogeRows226: readonly OgeRow226[] = [
  { sentence: "Bahçıvan sabah çiçekleri suladı.", parts: [P("Bahçıvan", "yapan", "", true), P("sabah", "zaman"), P("çiçekleri", "etkilenen", "-i"), Y("suladı")] },
  { sentence: "Annem pazardan taze sebze aldı.", parts: [P("Annem", "yapan", "", true), P("pazardan", "yer", "-dan"), P("taze sebze", "etkilenen"), Y("aldı")] },
  { sentence: "Kargocu paketi komşumuza bıraktı.", parts: [P("Kargocu", "yapan", "", true), P("paketi", "etkilenen", "-i"), P("komşumuza", "yer", "-a", true), Y("bıraktı")] },
  { sentence: "Öğrenciler sevinçten havaya zıpladı.", parts: [P("Öğrenciler", "yapan", "", true), P("sevinçten", "neden", "-ten"), P("havaya", "yer", "-ya"), Y("zıpladı")] },
  { sentence: "Dün kütüphanede uzun bir mektup yazdım.", parts: [P("Dün", "zaman"), P("kütüphanede", "yer", "-de"), P("uzun bir mektup", "etkilenen"), Y("yazdım")], hidden: "ben" },
  { sentence: "Kardeşimin odası her zaman tertemizdir.", parts: [P("Kardeşimin odası", "yapan"), P("her zaman", "zaman"), Y("tertemizdir")], predBase: "tertemiz" },
  { sentence: "Dedem bahçe kapısını çekiçle onardı.", parts: [P("Dedem", "yapan", "", true), P("bahçe kapısını", "etkilenen", "-nı"), P("çekiçle", "araç", "-le"), Y("onardı")] },
];
export const ogeRoles226 = (r: OgeRow226) => r.parts.map(roleOf226);
const partOf = (t: string) => ogeRows226.flatMap((r) => r.parts.map((p) => ({ p, r }))).find(({ p }) => p.t === t)!;
{
  for (const r of ogeRows226) {
    guard(r.parts.map((p) => p.t).join(" ") + "." === r.sentence, `${r.sentence} öbeklere eksiksiz ayrılmalı`);
    guard(r.parts.filter((p) => p.pred).length === 1 && r.parts.at(-1)!.pred === true, "tek yüklem ve kurallı sıra");
    guard(ogeRoles226(r).filter((x) => x === "özne").length === (r.hidden ? 0 : 1), "açık özne ya da gizli özne");
    if (r.hidden) guard(r.parts.at(-1)!.t.endsWith("m"), "gizli ben öznesi yüklemdeki -m ile gösterilir");
  }
  // Her -e/-de/-den ekli öbek yer tamlayıcısı değildir: neden bildiren -ten zarf tümlecidir.
  const ablZt = ogeRows226.flatMap((r) => r.parts).filter((p) => caseOf226(p.ek ?? "") === "ayrılma" && roleOf226(p) === "zarf tümleci");
  const ablYt = ogeRows226.flatMap((r) => r.parts).filter((p) => caseOf226(p.ek ?? "") === "ayrılma" && roleOf226(p) === "yer tamlayıcısı");
  guard(ablZt.length >= 1 && ablYt.length >= 1, "ayrılma ekli hem zarf tümleci hem yer tamlayıcısı bulunmalı");
  const roles = new Set(ogeRows226.flatMap(ogeRoles226));
  guard(roles.size === 6, "altı öge adı da tabloda geçmeli");
}
const visibleCount = (r: OgeRow226) => r.parts.length;
const ogeTable = {
  layout: "table" as const,
  headers: ["Cümle", "Ögeler sırasıyla", "Bulduran sorular", "Görünür öge"],
  rows: ogeRows226.map((r) => [
    r.sentence,
    r.parts.map((p) => `${p.t}: ${roleOf226(p)}`).join(" · "),
    r.parts.filter((p) => !p.pred).map((p) => questionOf226(p, r)).join(" · ") + (r.hidden ? ` · gizli özne: ${r.hidden} (yüklemdeki -m)` : ""),
    `${visibleCount(r)}${r.hidden ? ` (gizli ${r.hidden} sayılmaz)` : ""}`,
  ]),
};
const sev = partOf("sevinçten");
const hav = partOf("havaya");
const pazar = partOf("pazardan");
const sebze = partOf("taze sebze");
const cicek = partOf("çiçekleri");
const komsu = partOf("komşumuza");
const cekic = partOf("çekiçle");
const hiddenRow = ogeRows226.find((r) => r.hidden)!;
const nounRow = ogeRows226.find((r) => r.predBase)!;
export const ogeSection226: GuideSection = {
  title: "Yedi cümlede öge adını ek ve soru birlikte verir",
  paragraphs: [
    "Her cümlede önce yüklem bulundu, sonra her öbek yükleme bir soruyla bağlandı. Soru, öbeğin durum ekinden ve anlamından birlikte çıkar: yalın ve işi yapan öbek özne (kim, ne), belirtme ekli etkilenen öbek belirtili nesne (kimi, neyi), yalın etkilenen öbek belirtisiz nesne (ne), yer veya kişi bildiren -e/-de/-den ekli öbek yer tamlayıcısı (nereye, nerede, nereden, kime), zaman, neden ya da araç bildiren öbek zarf tümlecidir (ne zaman, niçin, neyle).",
    `${q(sev.r.sentence)} cümlesinde ${sev.p.t} ayrılma eki taşısa da ${q(questionOf226(sev.p, sev.r))} sorusuna cevap verir; ${roleOf226(sev.p)}dir. Aynı cümlede ${hav.p.t}, ${q(questionOf226(hav.p, hav.r))} sorusuyla ${roleOf226(hav.p)}dır. ${cap(pazar.p.t)} ise ayrılma ekiyle bir yer bildirir: ${q(questionOf226(pazar.p, pazar.r))} Aynı ek, anlam değişince başka bir öge kurar.`,
    `${cap(sebze.p.t)} yalın olduğu için ${q(questionOf226(sebze.p, sebze.r))} sorusuyla ${roleOf226(sebze.p)}, ${cicek.p.t} belirtme ekiyle ${q(questionOf226(cicek.p, cicek.r))} sorusuyla ${roleOf226(cicek.p)}dir. ${cap(komsu.p.t)} bir kişiyi gösterdiği için ${q(questionOf226(komsu.p, komsu.r))} sorusunu karşılar. ${cap(cekic.p.t)} araç bildirir ve bu uygulamanın MEBİ öge konvansiyonunda ${roleOf226(cekic.p)}dir.`,
    `Gizli özne görünür öge sayısına katılmaz: ${q(hiddenRow.sentence)} cümlesinde ${hiddenRow.parts.at(-1)!.t} yüklemindeki -m ${hiddenRow.hidden} öznesini gösterir; görünür öge sayısı: ${visibleCount(hiddenRow)}. ${q(nounRow.sentence)} bir isim cümlesidir; özne ${q(questionOf226(nounRow.parts[0], nounRow))} sorusuyla bulunur.`,
  ],
  table: ogeTable,
  figureTitle: "Yedi cümlede öge adını ek ve soru birlikte verir",
};

export const ogeExampleRows226: readonly OgeRow226[] = [
  {
    sentence: "Öğretmen sınav sonuçlarını dün akşam öğrencilere e-postayla gönderdi.",
    parts: [P("Öğretmen", "yapan", "", true), P("sınav sonuçlarını", "etkilenen", "-nı"), P("dün akşam", "zaman"), P("öğrencilere", "yer", "-e", true), P("e-postayla", "araç", "-yla"), Y("gönderdi")],
  },
  {
    sentence: "Selin heyecandan sahneden erken indi.",
    parts: [P("Selin", "yapan", "", true), P("heyecandan", "neden", "-dan"), P("sahneden", "yer", "-den"), P("erken", "zaman"), Y("indi")],
  },
];
const [mail, stage] = ogeExampleRows226;
for (const r of ogeExampleRows226) guard(r.parts.map((p) => p.t).join(" ") + "." === r.sentence, `${r.sentence} öbeklere ayrılmalı`);
const ogeSteps = (r: OgeRow226) => r.parts.filter((p) => !p.pred).map((p) => ({
  label: p.t,
  expression: questionOf226(p, r),
  explanation: `${cap(roleOf226(p))}${p.ek ? ` (${caseOf226(p.ek)} eki ${p.ek})` : " (yalın)"}.`,
}));
const ablPair = stage.parts.filter((p) => caseOf226(p.ek ?? "") === "ayrılma");
guard(ablPair.length === 2 && new Set(ablPair.map(roleOf226)).size === 2, "iki ayrılma ekli öbek iki ayrı öge olmalı");
export const ogeExamples226: WorkedExample[] = [
  {
    title: "Altı öbekli cümleyi sorularla ayır",
    prompt: `${q(mail.sentence)} cümlesini ögelerine ayır ve her ögeyi bulduran soruyu yaz.`,
    strategy: "Yüklemi (gönderdi) merkez al. Önce özneyi, sonra nesneyi, en son diğer tamlayıcıları yüklemle soru kurarak bul; tamlamaları bölme.",
    steps: [{ label: "Yüklem", expression: mail.parts.at(-1)!.t, explanation: "Çekimli fiil, yargıyı taşır." }, ...ogeSteps(mail)],
    answer: mail.parts.map((p) => `${p.t} (${roleOf226(p)})`).join(" / ") + ".",
    check: `Görünür öge sayısı ${visibleCount(mail)}; ${mail.parts[1].t} ve ${mail.parts[2].t} birer öbek olarak bölünmeden kaldı.`,
    pitfall: "Öğrencilere sözcüğünü -e eki yüzünden nereye sorusuyla zorlamak; kişi bildirdiği için kime sorusu sorulur. E-postayla araç bildirdiği için yer tamlayıcısı değildir.",
  },
  {
    title: "İki -den, iki ayrı öge",
    prompt: `${q(stage.sentence)} cümlesindeki ${list(ablPair.map((p) => p.t))} öbeklerinin görevini ayır; cümlenin bütün ögelerini yaz.`,
    strategy: "Ek aynı olsa da yükleme sorulan soru farklıdır: yer mi soruluyor, neden mi?",
    steps: ogeSteps(stage),
    answer: stage.parts.map((p) => `${p.t} (${roleOf226(p)})`).join(" / ") + ".",
    check: `${cap(ablPair[0].t)} için ${q(questionOf226(ablPair[0], stage))}, ${ablPair[1].t} için ${q(questionOf226(ablPair[1], stage))} sorusu anlamlıdır; yer değiştirince sorular uymaz.`,
    pitfall: "-den ekli her öbeği yer tamlayıcısı saymak.",
  },
];

export const ogeSupplement226 = {
  title: ogeSection226.title,
  figureTitle: ogeSection226.title,
  paragraphs: ogeSection226.paragraphs,
  summary: "Yüklemi bul, sonra ek ve anlamla soru kur: yalın yapan özne (kim/ne), belirtme ekli etkilenen belirtili nesne (neyi), yalın etkilenen belirtisiz nesne (ne), yer/kişi bildiren -e/-de/-den yer tamlayıcısı (nereye, kime), zaman/neden/araç zarf tümleci. Sevinçten niçin sorusuyla zarf tümleci; gizli özne sayılmaz.",
  appendSection: true as const,
  table: ogeTable,
  examples: ogeExamples226,
};

/* ======================================================================
 * 4. Cümle türleri: dört ölçüt, sırayla ve çözümlemeyle
 * ==================================================================== */

export interface Clause226 {
  obek: readonly string[];
  /** Yüklemin öbek sırası; −1 yüklem söylenmemiş. */
  y: number;
  kind?: "fiil" | "isim";
  /** Yüklemin parçaları: kök, olumsuzluk, kip, ek fiil, kişi… */
  morphs?: readonly string[];
  /** Açık özne var mı? */
  subject?: boolean;
}
export interface Yan226 { kind: "fiilimsi" | "şart"; word: string; stem?: string; morphs?: readonly string[] }
export interface TurRow226 { sentence: string; clauses: readonly Clause226[]; joiners?: readonly string[]; yan?: Yan226 }
const QUESTION_WORDS = new Set(["kim", "ne", "nerede", "nereye", "nereden", "nasıl", "niçin", "kaç", "kaçta", "hangi"]);
const QUESTION_PARTICLES = new Set(["mı", "mi", "mu", "mü"]);
const CONJ = new Set(["ve", "ama", "fakat", "çünkü"]);

export interface TurResult226 {
  tur: string; turWhy: string;
  yer: string; yerWhy: string;
  anlam: string; anlamWhy: string;
  yapi: string; yapiWhy: string;
  perClause: readonly ("kurallı" | "devrik" | "eksiltili")[];
}
export const placeOf226 = (c: Clause226) => (c.y < 0 ? "eksiltili" : c.y === c.obek.length - 1 ? "kurallı" : "devrik");
const polarity = (c: Clause226, words: readonly string[]) => {
  const m = c.morphs ?? [];
  const qw = words.find((x) => QUESTION_WORDS.has(x));
  if (m.some((x) => QUESTION_PARTICLES.has(x))) return { v: "soru", why: `soru eki ${m.find((x) => QUESTION_PARTICLES.has(x))}` };
  if (qw) return { v: "soru", why: `soru sözcüğü ${qw}` };
  if (m[1] === "ma" || m[1] === "me") return { v: "olumsuz", why: `olumsuzluk eki -${m[1]}` };
  if (m.includes("değil") || m.includes("yok")) return { v: "olumsuz", why: m.includes("değil") ? "değil" : "yok" };
  return { v: "olumlu", why: "olumsuzluk ve soru biçimi yok" };
};
export function classifyCumle226(r: TurRow226): TurResult226 {
  const perClause = r.clauses.map(placeOf226);
  const words = tokens(r.sentence).map((x) => x.toLocaleLowerCase("tr-TR"));
  if (perClause.includes("eksiltili")) {
    const none = "yüklem yok";
    return { tur: "belirlenmez", turWhy: none, yer: "eksiltili", yerWhy: "yüklem söylenmemiş", anlam: "belirlenmez", anlamWhy: none, yapi: "belirlenmez", yapiWhy: none, perClause };
  }
  const main = r.clauses.at(-1)!;
  const predWord = (c: Clause226) => c.obek[c.y].split(" ").at(-1)!;
  const tur = main.kind!;
  guard(r.clauses.every((c) => c.kind === tur), "yargıların yüklem türü aynı olmalı");
  const turWhy = `${predWord(main)}: ${(main.morphs ?? []).join("-")}${tur === "isim" ? ", ad soylu taban + ek fiil" : ", çekimli fiil"}`;
  const yer = perClause.every((p) => p === "kurallı") ? "kurallı" : "devrik";
  const yerWhy = r.clauses.length > 1
    ? r.clauses.map((c, i) => `${i + 1}. yargı ${perClause[i]}`).join(", ")
    : `yüklem ${main.obek.length} öbekten ${main.y + 1}. sırada${yer === "kurallı" ? ", sonda" : ""}`;
  const pols = r.clauses.map((c) => polarity(c, words));
  guard(new Set(pols.map((p) => p.v)).size === 1, "yargıların anlamı aynı olmalı");
  let yapi: string;
  let yapiWhy: string;
  if (r.clauses.length > 1) {
    const j = r.joiners ?? [];
    guard(j.length === r.clauses.length - 1, "her iki yargı arasında bir bağlayıcı olmalı");
    if (j.some((x) => CONJ.has(x))) {
      yapi = "bağlı";
      yapiWhy = `iki temel yargı ${j.find((x) => CONJ.has(x))} bağlacıyla bağlanmış`;
    } else {
      const shared = r.clauses.slice(1).some((c) => c.subject === false);
      yapi = `sıralı (${shared ? "bağımlı" : "bağımsız"})`;
      yapiWhy = `iki temel yargı virgülle sıralanmış${shared ? "; ikinci yargının öznesi ortak" : ""}`;
    }
  } else if (r.yan?.kind === "fiilimsi") {
    const tag = tagFiilimsi226(r.yan.word, r.yan.stem!);
    yapi = "birleşik (girişik)";
    yapiWhy = `${r.yan.word}: ${tag.label} ${tag.type}, yan yapı kurar`;
  } else if (r.yan?.kind === "şart") {
    const m = r.yan.morphs!;
    guard(m.length >= 3 && ["sa", "se"].includes(m.at(-1)!), "şart yan yargısı kipten sonra -sa/-se almalı");
    yapi = "birleşik (şartlı)";
    yapiWhy = `${r.yan.word}: ${m.join("-")}, koşul yargısı`;
  } else {
    yapi = "basit";
    yapiWhy = "tek yargı, yan yapı yok";
  }
  return { tur: `${tur} cümlesi`, turWhy, yer, yerWhy, anlam: pols[0].v, anlamWhy: pols[0].why, yapi, yapiWhy, perClause };
}
export const turRows226: readonly TurRow226[] = [
  { sentence: "Çok sessizdi bu sabah kütüphanenin bahçesi.", clauses: [{ obek: ["Çok sessizdi", "bu sabah", "kütüphanenin bahçesi"], y: 0, kind: "isim", morphs: ["sessiz", "di"], subject: true }] },
  { sentence: "Çantasını otobüste unutmadı Selin.", clauses: [{ obek: ["Çantasını", "otobüste", "unutmadı", "Selin"], y: 2, kind: "fiil", morphs: ["unut", "ma", "dı"], subject: true }] },
  { sentence: "Toplantı yarın saat kaçta başlayacak?", clauses: [{ obek: ["Toplantı", "yarın", "saat kaçta", "başlayacak"], y: 3, kind: "fiil", morphs: ["başla", "yacak"], subject: true }] },
  { sentence: "Zil çalınca öğrenciler bahçeye koştu.", clauses: [{ obek: ["Zil çalınca", "öğrenciler", "bahçeye", "koştu"], y: 3, kind: "fiil", morphs: ["koş", "tu"], subject: true }], yan: { kind: "fiilimsi", word: "çalınca", stem: "çal" } },
  { sentence: "Sınav erken biterse kütüphaneye uğrarız.", clauses: [{ obek: ["Sınav erken biterse", "kütüphaneye", "uğrarız"], y: 2, kind: "fiil", morphs: ["uğra", "r", "ız"], subject: false }], yan: { kind: "şart", word: "biterse", morphs: ["bit", "er", "se"] } },
  { sentence: "Kardeşim kapıyı açtı, içeri baktı.", clauses: [{ obek: ["Kardeşim", "kapıyı", "açtı"], y: 2, kind: "fiil", morphs: ["aç", "tı"], subject: true }, { obek: ["içeri", "baktı"], y: 1, kind: "fiil", morphs: ["bak", "tı"], subject: false }], joiners: [","] },
  { sentence: "Otobüs durağa yaklaştı ve yolcular hazırlandı.", clauses: [{ obek: ["Otobüs", "durağa", "yaklaştı"], y: 2, kind: "fiil", morphs: ["yaklaş", "tı"], subject: true }, { obek: ["yolcular", "hazırlandı"], y: 1, kind: "fiil", morphs: ["hazırlan", "dı"], subject: true }], joiners: ["ve"] },
  { sentence: "Masada açık bir defter, defterin yanında iki kurşun kalem…", clauses: [{ obek: ["Masada", "açık bir defter", "defterin yanında", "iki kurşun kalem"], y: -1 }] },
];
export const turResults226 = turRows226.map(classifyCumle226);
const turOf = (i: number) => turResults226[i];
{
  for (const r of turRows226) {
    const flat = r.clauses.flatMap((c, i) => [...(i > 0 ? [r.joiners![i - 1]] : []), ...c.obek]).join(" ");
    guard(tokens(r.sentence).join(" ") === tokens(flat).join(" "), `${r.sentence} öbeklere eksiksiz ayrılmalı`);
    for (const c of r.clauses) if (c.y >= 0) guard(c.obek[c.y].endsWith((c.morphs ?? []).join("")), `${c.obek[c.y]} çözümlemesi yüklemle aynı yazılmalı`);
  }
  const all = (k: keyof TurResult226) => new Set(turResults226.map((x) => String(x[k]).split(" ")[0]));
  guard(["isim", "fiil"].every((x) => all("tur").has(x)), "isim ve fiil cümlesi bulunmalı");
  guard(["kurallı", "devrik", "eksiltili"].every((x) => all("yer").has(x)), "kurallı, devrik, eksiltili bulunmalı");
  guard(["olumlu", "olumsuz", "soru"].every((x) => all("anlam").has(x)), "olumlu, olumsuz, soru bulunmalı");
  guard(["basit", "birleşik", "sıralı", "bağlı"].every((x) => all("yapi").has(x)), "dört yapı türü bulunmalı");
  // Tek ölçüt diğerini belirlemez: devrik bir isim cümlesi ve devrik bir olumsuz cümle var.
  guard(turResults226.some((x) => x.yer === "devrik" && x.tur.startsWith("isim")) && turResults226.some((x) => x.yer === "devrik" && x.anlam === "olumsuz"), "devriklik türü ve anlamı belirlemez");
}
const turTable = {
  layout: "table" as const,
  headers: ["Cümle", "Yüklemin türü", "Yerine göre", "Anlamına göre", "Yapısına göre"],
  rows: turRows226.map((r, i) => {
    const x = turOf(i);
    return [r.sentence, `${x.tur}: ${x.turWhy}`, `${x.yer}: ${x.yerWhy}`, `${x.anlam}: ${x.anlamWhy}`, `${x.yapi}: ${x.yapiWhy}`];
  }),
};
const idxWhere = (f: (x: TurResult226) => boolean) => turResults226.findIndex(f);
const iDevIsim = idxWhere((x) => x.yer === "devrik" && x.tur.startsWith("isim"));
const iGirisik = idxWhere((x) => x.yapi.includes("girişik"));
const iSart = idxWhere((x) => x.yapi.includes("şartlı"));
const iSirali = idxWhere((x) => x.yapi.startsWith("sıralı"));
const iBagli = idxWhere((x) => x.yapi === "bağlı");
const iEks = idxWhere((x) => x.yer === "eksiltili");
const devIsimClause = turRows226[iDevIsim].clauses[0];
const devIsimPred = devIsimClause.obek[devIsimClause.y].split(" ").at(-1)!;
const girisikTag = tagFiilimsi226(turRows226[iGirisik].yan!.word, turRows226[iGirisik].yan!.stem!);
guard(devIsimClause.y < devIsimClause.obek.length - 1, "devrik isim cümlesinde yüklem sonda olmamalı");
const count = (k: keyof TurResult226, v: string) => turResults226.filter((x) => String(x[k]).startsWith(v)).length;
export const turSection226: GuideSection = {
  title: "Sekiz cümlede dört ölçüt: tür, yer, anlam, yapı",
  paragraphs: [
    `Tablodaki her cümle dört ölçüte ayrı ayrı yerleştirildi. Yüklemin türü yüklemin çözümlemesinden okunur: ${count("tur", "fiil")} fiil, ${count("tur", "isim")} isim cümlesi var. ${q(turRows226[iDevIsim].sentence)} cümlesinin yüklemi ${devIsimPred} (${devIsimClause.morphs!.join("-")}) ad soylu taban ve ek fiilden oluşur; yüklem ${devIsimClause.y + 1}. sırada olduğu için cümle aynı zamanda devriktir. Bir ölçütteki karar ötekinin yerine geçmez.`,
    `Yerine göre karar ögelerin sırasından hesaplandı: yüklem son öbekse kurallı, değilse devrik; yüklem söylenmemişse eksiltili. ${q(turRows226[iEks].sentence)} eksiltilidir; yüklem olmadığı için bu tabloda tür, anlam ve yapı belirlenmedi. Anlam sütununda olumsuzluk eki ya da değil/yok olumsuzu, soru eki ya da soru sözcüğü soruyu gösterir.`,
    `Yapıda tek yargılı cümle basittir; yan yapı varsa birleşiktir: ${girisikTag.word} (${girisikTag.label}) bir ${girisikTag.type} olduğu için girişik, ${turRows226[iSart].yan!.word} (${turRows226[iSart].yan!.morphs!.join("-")}) koşul yargısı kurduğu için şartlı birleşik. İki temel yargı virgülle sıralanırsa sıralı (${q(turRows226[iSirali].sentence)}: ikinci yargının öznesi ortak, bağımlı sıralı), bağlaçla bağlanırsa bağlıdır (${q(turRows226[iBagli].sentence)}).`,
  ],
  table: turTable,
  figureTitle: "Sekiz cümlede dört ölçüt: tür, yer, anlam, yapı",
};

export const turExampleRows226: readonly TurRow226[] = [
  { sentence: "Kapıyı çalan komşumuzu tanımadı Ayşe.", clauses: [{ obek: ["Kapıyı çalan komşumuzu", "tanımadı", "Ayşe"], y: 1, kind: "fiil", morphs: ["tanı", "ma", "dı"], subject: true }], yan: { kind: "fiilimsi", word: "çalan", stem: "çal" } },
  { sentence: "Kitabı bitirdi Arda, kütüphaneye geri götürdü.", clauses: [{ obek: ["Kitabı", "bitirdi", "Arda"], y: 1, kind: "fiil", morphs: ["bitir", "di"], subject: true }, { obek: ["kütüphaneye", "geri", "götürdü"], y: 2, kind: "fiil", morphs: ["götür", "dü"], subject: false }], joiners: [","] },
];
export const turExampleResults226 = turExampleRows226.map(classifyCumle226);
const [knock, book] = turExampleRows226;
const [knockR, bookR] = turExampleResults226;
guard(bookR.perClause.join() === "devrik,kurallı", "ikinci örnekte yargılar farklı yerleşimde olmalı");
export const turExamples226: WorkedExample[] = [
  {
    title: "Fiilimsili devrik cümleyi dört ölçüte yerleştir",
    prompt: `${q(knock.sentence)} cümlesini yüklemin türü, yeri, anlamı ve yapısı bakımından sınıflandır.`,
    strategy: "Önce tam yüklemi bul ve çözümle; sonra yüklemin sırasını, olumsuzluk ve soru biçimini, yüklem dışındaki yan yapıyı ayrı ayrı denetle.",
    steps: [
      { label: "Tür", expression: knockR.turWhy, explanation: `${cap(knockR.tur)}.` },
      { label: "Yer", expression: knockR.yerWhy, explanation: `${cap(knockR.yer)}: Ayşe yüklemden sonra gelir ama yine öznedir.` },
      { label: "Anlam", expression: knockR.anlamWhy, explanation: `${cap(knockR.anlam)}.` },
      { label: "Yapı", expression: knockR.yapiWhy, explanation: `${cap(knockR.yapi)}: çalan, komşumuzu adını niteleyen yan yapıdır.` },
    ],
    answer: `${cap(knockR.tur)}; ${knockR.yer}; ${knockR.anlam}; ${knockR.yapi}.`,
    check: "Dört karar dört ayrı kanıta dayandı; devrik olması olumsuzluk ve yapı kararını değiştirmedi.",
    pitfall: "Kapıyı çalan komşumuzu öbeğini bölüp çalan sözcüğünü ikinci yüklem saymak ve cümleye sıralı demek.",
  },
  {
    title: "Sıralı cümlede her yargının yerini ayrı bul",
    prompt: `${q(book.sentence)} cümlesindeki iki yargının yüklem yerini ayrı ayrı belirle ve cümlenin yapısını açıkla.`,
    strategy: "Virgülün iki yanındaki yargıları kendi yüklemleriyle ayır; her birinde yüklem son öbek mi diye bak; ikinci yargıda eksik ögeyi birinci yargıdan tamamla.",
    steps: [
      { label: "1. yargı", expression: book.clauses[0].obek.join(" / "), explanation: `${cap(placeOf226(book.clauses[0]))}: yüklem ${book.clauses[0].obek[book.clauses[0].y]}, ardından özne Arda gelir.` },
      { label: "2. yargı", expression: book.clauses[1].obek.join(" / "), explanation: `${cap(placeOf226(book.clauses[1]))}: yüklem ${book.clauses[1].obek[book.clauses[1].y]} sondadır.` },
      { label: "Yapı", expression: bookR.yapiWhy, explanation: `${cap(bookR.yapi)}: götüren de Arda’dır; özne ortaktır.` },
    ],
    answer: `Birinci yargı ${bookR.perClause[0]}, ikinci yargı ${bookR.perClause[1]}; cümle ${bookR.yapi.replace("sıralı (bağımlı)", "bağımlı sıralı")}dır.`,
    check: "Bütün dizinin son sözcüğü yüklem diye birinci yargıyı da kurallı saymadık.",
    pitfall: "Yalnız cümlenin son sözcüğüne bakıp bütün yargılar hakkında kurallı kararı vermek.",
  },
];

export const turSupplement226 = {
  title: turSection226.title,
  figureTitle: turSection226.title,
  paragraphs: turSection226.paragraphs,
  summary: "Dört ölçüt ayrıdır. Tür: yüklem çekimli fiilse fiil, ad soylu + ek fiilse isim. Yer: yüklem sondaysa kurallı, değilse devrik, yoksa eksiltili. Anlam: -ma/değil olumsuz, soru eki veya soru sözcüğü soru. Yapı: tek yargı basit; fiilimsi ya da şartlı yan yapı birleşik; virgülle sıralı, bağlaçla bağlı.",
  appendSection: true as const,
  table: turTable,
  examples: turExamples226,
};

/* ======================================================================
 * 5. Deyimler ve atasözleri: yargı ölçütü
 * ==================================================================== */

export interface Kalip226 {
  kalip: string;
  /** Yerleşik anlam (standart sözlük anlamıyla). */
  meaning: string;
  /** Farklı olaylara uygulanabilen genel yargı ya da öğüt taşıyor mu? */
  general: boolean;
  /** Atasözü emir kipiyle mi kurulmuş (öğüt biçimi)? */
  imperative?: boolean;
  /** Kalıp sözcükleri (fiil kökü tireli). */
  fixed: readonly string[];
  usage: string;
  /** Kullanımdaki çekimli biçim. */
  used: string;
}
export const kalipRows226: readonly Kalip226[] = [
  { kalip: "kulak asmamak", meaning: "söyleneni önemsememek, dinlememek", general: false, fixed: ["kulak", "as-"], usage: "Kardeşim ıslak zemin uyarısına kulak asmadı ve kaydı.", used: "kulak asmadı" },
  { kalip: "etekleri zil çalmak", meaning: "çok sevinmek", general: false, fixed: ["etekleri", "zil", "çal-"], usage: "Burs sonucunu görünce Elif’in etekleri zil çaldı.", used: "etekleri zil çaldı" },
  { kalip: "pireyi deve yapmak", meaning: "küçük bir sorunu olduğundan çok büyük göstermek, abartmak", general: false, fixed: ["pireyi", "deve", "yap-"], usage: "Defterine düşen küçük bir mürekkep lekesi için pireyi deve yaptı.", used: "pireyi deve yaptı" },
  { kalip: "dört gözle beklemek", meaning: "büyük bir istek ve özlemle beklemek", general: false, fixed: ["dört", "gözle", "bekle-"], usage: "Köydeki dedesini görmek için bayramı dört gözle bekledi.", used: "dört gözle bekledi" },
  { kalip: "Ağaç yaşken eğilir.", meaning: "İnsan küçük yaşta daha kolay eğitilir; alışkanlıklar erken kazanılır.", general: true, fixed: ["Ağaç", "yaşken", "eğilir"], usage: "Dedem torunlarına okuma alışkanlığını erken kazandırdı; “Ağaç yaşken eğilir.” derdi.", used: "Ağaç yaşken eğilir." },
  { kalip: "Bin işit, bir söyle.", meaning: "Çok dinleyip az konuşmak gerekir.", general: true, imperative: true, fixed: ["Bin", "işit", "bir", "söyle"], usage: "Yeni ekibe katılan Mert ilk toplantılarda çok dinleyip az konuştu; ustası ona “Bin işit, bir söyle.” demişti.", used: "Bin işit, bir söyle." },
  { kalip: "Sakla samanı, gelir zamanı.", meaning: "Değersiz görünen bir şey bir gün işe yarayabilir; elindekini hemen atma.", general: true, imperative: true, fixed: ["Sakla", "samanı", "gelir", "zamanı"], usage: "Annem eski düğmeleri atmadı; kopan bir düğmenin yerine onlardan birini dikince “Sakla samanı, gelir zamanı.” dedi.", used: "Sakla samanı, gelir zamanı." },
  { kalip: "İşleyen demir ışıldar.", meaning: "Çalışan kişi gelişir, yeteneği körelmez.", general: true, fixed: ["İşleyen", "demir", "ışıldar"], usage: "Her gün piyano çalışan Deniz’in parmakları çevikleşti; öğretmeni “İşleyen demir ışıldar.” dedi.", used: "İşleyen demir ışıldar." },
];
export type KalipType226 = "deyim" | "atasözü";
/** Dersin ölçütü: genel yargı ya da öğüt bildiren yerleşik söz atasözü; belirli durumu adlandıran kalıp deyim. */
export const kalipType226 = (k: Kalip226): KalipType226 => (k.general ? "atasözü" : "deyim");
const stemOf = (f: string) => f.replace(/-$/, "");
/** Kalıp sözcüklerinin her biri kullanım cümlesinde bir sözcüğün başı olarak geçer mi? */
export const fixedWordsKept226 = (k: Kalip226) => {
  const ws = tokens(k.used);
  return k.fixed.every((f) => ws.some((x) => x.startsWith(stemOf(f)))) && k.usage.includes(k.used);
};
const deyims = kalipRows226.filter((k) => kalipType226(k) === "deyim");
const atas = kalipRows226.filter((k) => kalipType226(k) === "atasözü");
{
  guard(deyims.length === 4 && atas.length === 4, "dört deyim, dört atasözü");
  for (const k of kalipRows226) guard(fixedWordsKept226(k), `${k.kalip} kalıp sözcükleri kullanımda korunmalı`);
  // Deyimler cümlede çekimlenir (mastar biçimi kullanımda yok); atasözleri olduğu gibi aktarılır.
  for (const k of deyims) {
    guard(k.kalip.endsWith("mak") || k.kalip.endsWith("mek"), `${k.kalip} sözlükte mastarla verilir`);
    guard(!k.usage.includes(k.kalip), `${k.kalip} kullanımda çekimlenmeli`);
  }
  for (const k of atas) guard(k.used === k.kalip && k.usage.includes(`“${k.kalip}”`), `${k.kalip} olduğu gibi aktarılmalı`);
  guard(atas.some((k) => k.imperative) && atas.some((k) => !k.imperative), "öğüt biçimli ve gözlem biçimli atasözü bulunmalı");
}
const kalipTable = {
  layout: "table" as const,
  headers: ["Kalıp", "Tür", "Yerleşik anlam", "Ölçüt", "Özgün kullanım"],
  rows: kalipRows226.map((k) => [
    k.kalip,
    kalipType226(k),
    k.meaning,
    k.general
      ? `genel yargı${k.imperative ? ", emirle öğüt" : ", gözlem"}; kalıp aynen aktarılır`
      : `belirli durumu adlandırır; çekimlenir: ${k.used}`,
    k.usage,
  ]),
};
export const kalipSection226: GuideSection = {
  title: "Sekiz kalıpta deyim ile atasözünü yargıyla ayır",
  paragraphs: [
    `Tablodaki ${deyims.length} deyim belirli bir durumu ya da duyguyu adlandırır; ${atas.length} atasözü ise farklı olaylara uygulanabilen genel bir yargı taşır. Tür kararı bu ölçüte bağlandı: kalıp genel yargı ya da öğüt bildiriyorsa atasözü, belirli bir durumu anlatıyorsa deyimdir. Sözün tam cümle olması tek başına karar verdirmez.`,
    `Deyimler sözlükte mastarla verilir, cümlede çekimlenir: ${list(deyims.map((k) => `${k.kalip} → ${k.used}`))}. Çekim değişse de kalıp sözcükleri yerinde kalır. Tablodaki atasözleri kullanım cümlesine tırnak içinde, sözcüğü sözcüğüne aktarıldı.`,
    `${list(atas.filter((k) => k.imperative).map((k) => q(k.kalip)))} emir kipiyle doğrudan öğüt verir; ${list(atas.filter((k) => !k.imperative).map((k) => q(k.kalip)))} emir kurmadan bir gözlemi genel yargı olarak bildirir. İkisi de atasözüdür; öğüt biçimi tür ölçütü değildir. Kullanım cümleleri, her kalıbın anlamını açık bir olayla göstermek için YKSMania tarafından yazılmıştır.`,
  ],
  table: kalipTable,
  figureTitle: "Sekiz kalıpta deyim ile atasözünü yargıyla ayır",
};

// Örnek 1: olaya uyan atasözü, ilişki etiketinden seçilir.
export const proverbRelations226: Readonly<Record<string, string>> = {
  "Sakla samanı, gelir zamanı.": "saklanan, değersiz görünen şey sonra işe yarar",
  "İşleyen demir ışıldar.": "düzenli çalışma yeteneği canlı tutar",
  "Ağaç yaşken eğilir.": "alışkanlık küçük yaşta kolay kazanılır",
  "Bin işit, bir söyle.": "çok dinleyip az konuşmak gerekir",
};
guard(Object.keys(proverbRelations226).every((k) => atas.some((a) => a.kalip === k)), "ilişkiler tablodaki atasözlerine ait olmalı");
export const proverbEvent226 = {
  text: "Selin eski defterlerinin boş sayfalarını atmayıp bir kutuda topladı. Aylar sonra müsvedde kâğıdı bitince o sayfaları kullandı.",
  relation: "saklanan, değersiz görünen şey sonra işe yarar",
  candidates: ["İşleyen demir ışıldar.", "Sakla samanı, gelir zamanı."],
};
export const proverbChoice226 = proverbEvent226.candidates.filter((c) => proverbRelations226[c] === proverbEvent226.relation);
guard(proverbChoice226.length === 1, "olaya tek atasözü uymalı");
const chosen = atas.find((k) => k.kalip === proverbChoice226[0])!;
const other = atas.find((k) => k.kalip !== chosen.kalip && proverbEvent226.candidates.includes(k.kalip))!;
// Örnek 2: emirle söylenen deyim.
const pire = deyims.find((k) => k.kalip === "pireyi deve yapmak")!;
export const pireImperative226 = "Küçük bir çizik için bütün akşam söylenen kardeşine ablası “Pireyi deve yapma!” dedi.";
guard(pireImperative226.includes("yapma!") && pire.fixed.every((f) => tokens(pireImperative226).some((x) => x.toLocaleLowerCase("tr-TR").startsWith(stemOf(f).toLocaleLowerCase("tr-TR")))), "emirli kullanım kalıp sözcüklerini korumalı");
export const kalipExamples226: WorkedExample[] = [
  {
    title: "Olayın ilişkisini atasözüyle eşle",
    prompt: `${q(proverbEvent226.text)} Bu olaya ${list(proverbEvent226.candidates.map(q))} atasözlerinden hangisi uyar? Gerekçesini olayın ilişkisiyle açıkla.`,
    strategy: "Olayı bir cümlelik ilişkiye indir; sonra her atasözünün genel yargısını aynı biçimde yaz ve iki ilişkiyi karşılaştır.",
    steps: [
      { label: "Olay", expression: proverbEvent226.relation, explanation: "Boş sayfalar o an gereksiz görünüyordu; saklandı ve sonra işe yaradı." },
      { label: "Aday 1", expression: `${other.kalip} → ${proverbRelations226[other.kalip]}`, explanation: "Olayda yetenek ya da düzenli çalışma anlatılmıyor; ilişki uymaz." },
      { label: "Aday 2", expression: `${chosen.kalip} → ${proverbRelations226[chosen.kalip]}`, explanation: "Saklama ve sonradan işe yarama olayda açıkça var." },
    ],
    answer: `${q(chosen.kalip)}; anlamı: ${chosen.meaning}`,
    check: "Olaya bilgi eklemedik; seçim yalnız verilen saklama ve sonra kullanma ilişkisine dayandı.",
    pitfall: "Olayda emek var diye çalışmayı öven atasözünü seçmek; ayırt edici ilişki saklananın sonra işe yaramasıdır.",
  },
  {
    title: "Emirle söylenen deyim atasözü olmaz",
    prompt: `${pireImperative226} Abla öğüt veriyor ve söz emir kipinde. Bu kalıp atasözü müdür? Anlamını da yaz.`,
    strategy: "Biçimi (emir), kalıbın sözlük biçimini ve taşıdığı işlevi ayrı değerlendir: genel bir yargı mı bildiriyor, belirli bir davranışı mı adlandırıyor?",
    steps: [
      { label: "Kalıp", expression: `${pire.kalip}: ${pire.fixed.join(" + ")}`, explanation: "Sözlükte mastarla verilen yerleşik kalıp; kalıp sözcükleri cümlede korunmuş." },
      { label: "Çekim", expression: "yap-ma (olumsuz emir)", explanation: "Emir ve olumsuzluk çekimdir; kalıbın türünü değiştirmez." },
      { label: "İşlev", explanation: `Belirli bir davranışı adlandırıyor (${pire.meaning}); farklı olaylar için genel bir yargı kurmuyor.` },
    ],
    answer: `Hayır; ${kalipType226(pire)}dir. Anlamı: ${pire.meaning}.`,
    check: "Emir ve öğüt tonu çekimden gelir. Tablodaki öğüt biçimli atasözleri ise kalıbın kendisiyle, farklı olaylara uygulanan genel bir yargı kurar.",
    pitfall: "Öğüt tonunda söylenen her kalıbı atasözü saymak; tür ölçütü biçim değil, genel yargıdır.",
  },
];

export const kalipSupplement226 = {
  title: kalipSection226.title,
  figureTitle: kalipSection226.title,
  paragraphs: kalipSection226.paragraphs,
  summary: `Genel yargı ya da öğüt bildiren yerleşik söz atasözü, belirli durumu adlandıran kalıp deyim. Deyim çekimlenir (${deyims[0].kalip} → ${deyims[0].used}), kalıp sözcükleri korunur; atasözü aynen aktarılır. Emir biçimi ölçüt değildir: ${q(atas.find((k) => k.imperative)!.kalip)} atasözü, “Pireyi deve yapma!” deyimdir.`,
  appendSection: true as const,
  table: kalipTable,
  examples: kalipExamples226,
};

export const depth226Supplements = {
  "ek-fiil": [ekFiilSupplement226],
  fiilimsiler: [fiilimsiSupplement226],
  "cumlenin-ogeleri": [ogeSupplement226],
  "cumle-turleri": [turSupplement226],
  "deyimler-ve-atasozleri": [kalipSupplement226],
};
