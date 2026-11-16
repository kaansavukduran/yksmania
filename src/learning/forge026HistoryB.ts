import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";

export const historyBIds026 = [
  "ortacag-dunya",
  "ilk-turk-dunyasi",
  "islam-medeniyetinin-dogusu",
  "turklerin-islamiyeti-kabulu",
  "selcuklu-yerlesme-devletlesme",
] as const;
export type HistoryBId026 = (typeof historyBIds026)[number];
const integerB026 = (v: unknown, lo: number, hi: number) => {
  if (typeof v !== "number" || !Number.isSafeInteger(v) || v < lo || v > hi)
    throw new RangeError("HISTORY_B026_INTEGER_SCOPE");
  return v;
};
const booleanB026 = (v: unknown) => {
  if (typeof v !== "boolean")
    throw new RangeError("HISTORY_B026_BOOLEAN_SCOPE");
  return v;
};
const choiceB026 = <T extends string>(v: unknown, choices: readonly T[]): T => {
  if (typeof v !== "string" || !choices.includes(v as T))
    throw new RangeError("HISTORY_B026_CHOICE_SCOPE");
  return v as T;
};
export type AuthorityOwner026B = "central" | "local";
export function authorityNetwork026B(
  tax: AuthorityOwner026B,
  revocable: boolean,
  command: AuthorityOwner026B,
) {
  choiceB026(tax, ["central", "local"]);
  booleanB026(revocable);
  choiceB026(command, ["central", "local"]);
  const localPresent = tax === "local" || command === "local";
  const code =
    tax !== command
      ? "karma"
      : tax === "central"
        ? "dogrudan"
        : revocable
          ? "yetki-devri"
          : "yerel";
  const labels = {
    dogrudan: "İki yetki doğrudan merkezde",
    "yetki-devri": "Yerel uygulama, merkezî görev denetimi",
    yerel: "İki alanda yerel yetki",
    karma: "Yetkiler farklı ellerde",
  };
  const observations = [
    tax === "central"
      ? "Vergiyi merkez kendi adına topluyor."
      : "Vergiyi yerel görevli topluyor.",
    command === "central"
      ? "Sefer emrini merkez veriyor."
      : "Sefer emrini yerel güç veriyor.",
    !localPresent
      ? "Bu iki yetkide yerel uygulayıcı seçilmedi."
      : revocable
        ? "Merkez yerel görevliyi görevden alabiliyor."
        : "Bu öğretim koşulunda merkez yerel görevliyi görevden alamıyor.",
  ];
  const edges: { from: string; to: string; kind: string; label: string }[] = [
    {
      from: "toplum",
      to: tax === "central" ? "merkez" : "yerel",
      kind: "vergi",
      label: "Vergi",
    },
    {
      from: command === "central" ? "merkez" : "yerel",
      to: "toplum",
      kind: "emir",
      label: "Sefer emri",
    },
  ];
  if (localPresent)
    edges.push({
      from: "merkez",
      to: "yerel",
      kind: revocable ? "denetim" : "sinir",
      label: revocable ? "Görevden alma" : "Görevden alma yetkisi yok",
    });
  return {
    tax,
    revocable,
    command,
    localPresent,
    code,
    label: labels[code],
    observations,
    edges,
    scope:
      "Kurmaca üç aktörlü yetki modeli. Vergi, sefer emri ve görevden alma ayrı ölçütlerdir; tarihsel güç yüzdesi, modern demokrasi veya bütün Orta Çağ için tek düzen hesaplanmaz.",
  };
}

export type SteppeBundle026B = "yonetim" | "uretim" | "inanc";
type SourceRow026B = { title: string; text: string; voice: string };
type ClaimRow026B = {
  text: string;
  requires: number[];
  minimum?: number;
  never?: boolean;
};
export const steppeCases026B: Record<
  SteppeBundle026B,
  { title: string; records: SourceRow026B[]; claims: ClaimRow026B[] }
> = {
  yonetim: {
    title: "Yönetim sözü ve yerel işlem",
    records: [
      {
        title: "Yönetici anlatısı",
        text: "Kağan, halkın geçimini korumayı kendi görevi olarak sunuyor.",
        voice:
          "Yönetimin kendini anlatan sesi; sonuçların tam nüfus ölçümü değil.",
      },
      {
        title: "Sulama sözleşmesi",
        text: "Adı belirtilen iki kişi bir kanalın kullanım hakkını düzenliyor.",
        voice: "Belirli yerel işlem; bütün ülkenin tek geçim biçimi değil.",
      },
      {
        title: "Uyuşmazlık kaydı",
        text: "Bir görevli, seçilmiş iki uyuşmazlıkta töreye başvurulduğunu yazıyor.",
        voice:
          "Belirli uygulamaların kaydı; bütün davaların eksiksiz listesi değil.",
      },
    ],
    claims: [
      {
        text: "Yönetim söylemiyle belirtilen kural uygulaması birlikte karşılaştırılabilir.",
        requires: [0, 2],
      },
      {
        text: "Bu yerel işlemde su kullanımının düzenlendiği kaydedilmiştir.",
        requires: [1],
      },
      {
        text: "Yönetici geçimi koruma görevini anlatısında öne çıkarıyor.",
        requires: [0],
      },
      {
        text: "Bütün hanelerin refahı kesinlikle eşittir.",
        requires: [],
        never: true,
      },
    ],
  },
  uretim: {
    title: "Birden fazla üretim izi",
    records: [
      {
        title: "Tarım işlemi",
        text: "Bir yerel kayıt sulanan bir tarlanın kullanımını düzenliyor.",
        voice: "Belirli tarım işlemi.",
      },
      {
        title: "Atölye kaydı",
        text: "Aynı yerleşimde bir zanaat atölyesinin kullanım kaydı var.",
        voice: "Belirli zanaat faaliyeti.",
      },
      {
        title: "Sürü satışı",
        text: "Bir sürü için alıcı, satıcı ve ödeme koşulları kaydediliyor.",
        voice: "Hayvancılık ile alışveriş ilişkisi.",
      },
    ],
    claims: [
      {
        text: "Belirtilen yerleşimde tarım ve zanaat kayıtları birlikte vardır.",
        requires: [0, 1],
      },
      {
        text: "Sürü satışına ilişkin ekonomik işlem kaydı vardır.",
        requires: [2],
      },
      {
        text: "Seçili paket en az iki farklı faaliyet türü gösterir.",
        requires: [0, 1, 2],
        minimum: 2,
      },
      {
        text: "Bütün Türk toplulukları aynı anda tek yaşam biçimine geçmiştir.",
        requires: [],
        never: true,
      },
    ],
  },
  inanc: {
    title: "Yönetici çevresi ve şehir",
    records: [
      {
        title: "Yönetici simgesi",
        text: "Yönetici çevresine ait bir nesnede belirli dinî simge kullanılıyor.",
        voice: "Yönetici grubunun temsili; bütün halkın inancı değil.",
      },
      {
        title: "İbadet yerleri",
        text: "Bir şehir betimlemesi birden fazla inancın ibadet yerini anıyor.",
        voice: "Belirtilen şehirde çeşitlilik; her hak alanının ölçümü değil.",
      },
      {
        title: "Tüccar kaydı",
        text: "Başka bir inanca mensup tüccarın yerel alışverişi kaydediliyor.",
        voice: "Belirli kişinin ticari ilişkisi.",
      },
    ],
    claims: [
      {
        text: "Yönetici temsiliyle şehirdeki inanç çeşitliliği farklı kapsamlarla birlikte incelenebilir.",
        requires: [0, 1],
      },
      {
        text: "Belirtilen şehirde farklı ibadet yerleri anlatılmıştır.",
        requires: [1],
      },
      {
        text: "Farklı inançtan belirli bir tüccarın ekonomik ilişkisi kayıtlıdır.",
        requires: [2],
      },
      {
        text: "Bütün siyasi ve hukuki haklar modern anlamda eksiksiz eşittir.",
        requires: [],
        never: true,
      },
    ],
  },
};
export function steppeSource026B(
  bundle: SteppeBundle026B,
  mask: number,
  claim: number,
) {
  choiceB026(bundle, ["yonetim", "uretim", "inanc"]);
  integerB026(mask, 0, 7);
  integerB026(claim, 0, 3);
  const pack = steppeCases026B[bundle],
    rule = pack.claims[claim];
  const selected = pack.records.map((r, i) => ({
    ...r,
    index: i,
    selected: !!(mask & (1 << i)),
  }));
  const found = rule.requires.filter((i) => !!(mask & (1 << i))).length;
  const supported =
    !rule.never && found >= (rule.minimum ?? rule.requires.length);
  const missing = rule.requires.filter((i) => !(mask & (1 << i)));
  return {
    bundle,
    mask,
    claim,
    title: pack.title,
    records: selected,
    claimText: rule.text,
    selectedCount: selected.filter((r) => r.selected).length,
    supportingCount: found,
    supported,
    missing,
    expected: supported ? "destek" : "yetersiz",
    explanation: rule.never
      ? "Bu üç yerel kayıt seçilse de iddianın bütün topluluklar veya bütün haklar kapsamı gösterilmez."
      : supported
        ? "İddianın gerektirdiği kayıt türleri seçili pakette bulunuyor; sonuç yalnız belirtilen kapsamda geçerli."
        : "İddianın gerektirdiği kayıt türlerinin tamamı ya da gereken en az sayı seçili değil; eksik kanıt olayın kesin yokluğu değildir.",
    scope:
      "Kayıtlar özgün ve kurmaca öğretim özetleridir; gerçek yazıtlardan veya arşiv belgelerinden alıntı değildir. Kayıt sayısı tarihsel nüfus, güven yüzdesi veya bütün toplulukların davranışı değildir.",
  };
}

export const islamEvents026B = [
  { year: 610, label: "İlk vahiy ve tebliğ", iberia: false },
  { year: 622, label: "Medine hicreti", iberia: false },
  { year: 624, label: "Bedir", iberia: false },
  { year: 625, label: "Uhud", iberia: false },
  { year: 627, label: "Hendek", iberia: false },
  { year: 628, label: "Hudeybiye", iberia: false },
  { year: 630, label: "Mekke’nin alınması", iberia: false },
  { year: 632, label: "Dört Halife döneminin başlangıcı", iberia: false },
  { year: 634, label: "Hz. Ömer döneminin başlangıcı", iberia: false },
  { year: 644, label: "Hz. Osman döneminin başlangıcı", iberia: false },
  { year: 656, label: "Hz. Ali döneminin başlangıcı", iberia: false },
  { year: 661, label: "Şam Emevi yönetiminin başlangıcı", iberia: false },
  { year: 680, label: "Kerbela", iberia: false },
  { year: 711, label: "İber yarımadasına geçiş", iberia: true },
  { year: 750, label: "Abbasi iktidarının başlangıcı", iberia: false },
  { year: 756, label: "Endülüs Emevi emirliği", iberia: true },
  { year: 929, label: "Endülüs’te halifelik ilanı", iberia: true },
  { year: 1031, label: "Endülüs Emevi halifeliğinin sonu", iberia: true },
  { year: 1258, label: "Bağdat’ın Moğollarca alınması", iberia: false },
] as const;
export const islamPeriods026B = [
  {
    id: "dort-halife",
    label: "Dört Halife",
    from: 632,
    to: 661,
    iberia: false,
  },
  {
    id: "sam-emevi",
    label: "Şam Emevileri",
    from: 661,
    to: 750,
    iberia: false,
  },
  {
    id: "abbasi",
    label: "Abbasi ana siyasi dönemi",
    from: 750,
    to: 1258,
    iberia: false,
  },
  {
    id: "endulus",
    label: "Endülüs Emevi siyasi dönemi",
    from: 756,
    to: 1031,
    iberia: true,
  },
] as const;
export function islamTimeline026B(
  from: number,
  to: number,
  showIberia: boolean,
) {
  integerB026(from, 600, 1300);
  integerB026(to, from, 1300);
  booleanB026(showIberia);
  const events = islamEvents026B
    .filter((e) => e.year >= from && e.year <= to && (showIberia || !e.iberia))
    .map((e) => ({ ...e }));
  const periods = islamPeriods026B
    .filter((p) => p.to >= from && p.from <= to && (showIberia || !p.iberia))
    .map((p) => ({
      ...p,
      clippedFrom: Math.max(from, p.from),
      clippedTo: Math.min(to, p.to),
    }));
  return {
    from,
    to,
    showIberia,
    events,
    periods,
    eventCount: events.length,
    yearDifference: to - from,
    scope:
      "MS yıllarını kullanan seçili olaylar ve siyasi dönemler. Sınır yılları dahil; aynı yıl farklı siyasi geçişler bulunabilir. Yıl farkı gün-ay kesinliği değildir. Paralel satırlar eşzamanlılığı gösterir; sıra tek kesin neden veya siyasi birlik değildir. Bağdat’ın kuruluş tarihi, Abbasi iktidarının başlangıcıyla eşitlenmez.",
  };
}

export type ConversionClaim026B = "yonetici" | "kurum" | "yerel" | "herkes";
export function conversionEvidence026B(
  royal: boolean,
  official: boolean,
  community: boolean,
  query: ConversionClaim026B,
) {
  booleanB026(royal);
  booleanB026(official);
  booleanB026(community);
  choiceB026(query, ["yonetici", "kurum", "yerel", "herkes"]);
  const records = [
    {
      id: "yonetici",
      title: "Hükümdar kaydı",
      text: "Kurmaca hükümdar yeni inancı benimsediğini açıklıyor.",
      selected: royal,
    },
    {
      id: "kurum",
      title: "Resmî karar",
      text: "Kurmaca idari metin resmî bir karar bildiriyor; nüfus sayımı içermiyor.",
      selected: official,
    },
    {
      id: "yerel",
      title: "Yerel uygulama",
      text: "Kurmaca kayıt, adı belirtilen iki köyün bazı hanelerinde uygulamaları anlatıyor.",
      selected: community,
    },
  ];
  const claims = {
    yonetici: "Belirtilen hükümdarın tercihi kayıtlıdır.",
    kurum: "Resmî karar bulunduğu kayıtlıdır.",
    yerel: "Belirtilen köylerin kayıtlı hanelerinde yerel uygulama anlatılır.",
    herkes: "Bütün nüfus aynı gün aynı inancı benimsemiştir.",
  };
  const supported =
    query === "yonetici"
      ? royal
      : query === "kurum"
        ? official
        : query === "yerel"
          ? community
          : false;
  return {
    royal,
    official,
    community,
    query,
    records,
    claimText: claims[query],
    supported,
    selectedCount: records.filter((r) => r.selected).length,
    expected: supported ? "destek" : "yetersiz",
    explanation: supported
      ? "Seçilen iddia kendi kişi, karar veya belirtilen yerel kapsamıyla destekleniyor; sonuç bütün nüfusa genişletilmez."
      : "Seçilen iddia için uygun kapsamda kayıt yok. Üç kayıt da seçilse bütün nüfusun aynı günkü tercihi kanıtlanmış olmaz.",
    scope:
      "Kurmaca kayıt kapsamı modeli. Kişi, resmî karar ve yerel uygulama ayrı ölçütlerdir; zorunlu tarihsel basamaklar veya kabul yüzdesi değildir. Seçilmeyen kayıt, olayın hiç yaşanmadığının kanıtı sayılmaz.",
  };
}

export type SeljukClaim026B = "ticaret" | "egitim" | "saglik" | "tum-nufus";
export function seljukServices026B(
  mask: number,
  claim: SeljukClaim026B,
  funded: boolean,
) {
  integerB026(mask, 0, 7);
  choiceB026(claim, ["ticaret", "egitim", "saglik", "tum-nufus"]);
  booleanB026(funded);
  const services = [
    {
      id: "ticaret",
      title: "Kervansaray",
      text: "Öğretim kaydı yolculara konaklama ve güvenlik hizmeti verildiğini belirtiyor.",
    },
    {
      id: "egitim",
      title: "Medrese",
      text: "Öğretim kaydı belirli öğretim giderlerini listeliyor.",
    },
    {
      id: "saglik",
      title: "Darüşşifa",
      text: "Öğretim kaydı hastalara bakım ve tedavi giderlerini listeliyor.",
    },
  ].map((s, i) => ({
    ...s,
    index: i,
    selected: !!(mask & (1 << i)),
    incomeLinked: funded && !!(mask & (1 << i)),
  }));
  const target = services.find((s) => s.id === claim),
    supported = !!target?.selected && funded;
  const claimText =
    claim === "tum-nufus"
      ? "Bütün nüfus aynı meslek ve yaşam biçimine geçmiştir."
      : claim === "ticaret"
        ? "Ticaret-yol hizmeti için gelir bağı da gösterilmiştir."
        : claim === "egitim"
          ? "Öğretim hizmeti için gelir bağı da gösterilmiştir."
          : "Sağlık hizmeti için gelir bağı da gösterilmiştir.";
  return {
    mask,
    claim,
    funded,
    services,
    claimText,
    supported,
    expected: supported ? "destek" : "yetersiz",
    selectedCount: services.filter((s) => s.selected).length,
    incomeLinkCount: services.filter((s) => s.incomeLinked).length,
    explanation:
      claim === "tum-nufus"
        ? "Seçilen kurum kayıtları bütün nüfusun mesleği veya yaşam biçimi değildir."
        : !target?.selected
          ? "İddianın ilgili kurum kaydı seçili pakette yok."
          : funded
            ? "İlgili hizmet kaydı ve ona gelir tahsis edildiğini belirten öğretim koşulu birlikte seçili."
            : "Hizmet kaydı var; gelir bağına ilişkin koşul seçili değil. Bu, hizmetin hiç gerçekleşmediği demek değildir.",
    scope:
      "Kurum ve finansman bağlantısı için kurmaca öğretim modeli; gerçek bir vakfiyenin alıntısı değildir. Hizmetin varlığı, gelir bağlantısı ve bütün nüfusun durumu farklı iddialardır; otomatik kalıcılık garantisi hesaplanmaz.",
  };
}

export const historyBDefaults026 = {
  tax: "local" as AuthorityOwner026B,
  revocable: false,
  command: "local" as AuthorityOwner026B,
  bundle: "yonetim" as SteppeBundle026B,
  mask: 5,
  claim: 0,
  from: 750,
  to: 800,
  showIberia: true,
  royal: true,
  official: false,
  community: false,
  scopeClaim: "yonetici" as ConversionClaim026B,
  serviceMask: 3,
  serviceClaim: "egitim" as SeljukClaim026B,
  funded: true,
  guess: "",
  reason: "",
  checked: false,
};
export type HistoryBState026 = typeof historyBDefaults026;
export function normalizeHistoryB026(value: unknown): HistoryBState026 {
  const s =
    value && typeof value === "object" && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  const d = historyBDefaults026;
  const num = (key: keyof HistoryBState026, lo: number, hi: number) => {
    const candidate =
      typeof s[key] === "number" && Number.isFinite(s[key])
        ? Math.round(s[key] as number)
        : (d[key] as number);
    return Math.max(lo, Math.min(hi, candidate));
  };
  const en = <T extends string>(
    key: keyof HistoryBState026,
    values: readonly T[],
    fallback: T,
  ): T =>
    typeof s[key] === "string" && values.includes(s[key] as T)
      ? (s[key] as T)
      : fallback;
  const bool = (key: keyof HistoryBState026, fallback: boolean) =>
    typeof s[key] === "boolean" ? (s[key] as boolean) : fallback;
  const from = num("from", 600, 1300);
  return {
    tax: en("tax", ["central", "local"], d.tax),
    command: en("command", ["central", "local"], d.command),
    revocable: bool("revocable", d.revocable),
    bundle: en("bundle", ["yonetim", "uretim", "inanc"], d.bundle),
    mask: num("mask", 0, 7),
    claim: num("claim", 0, 3),
    from,
    to: num("to", from, 1300),
    showIberia: bool("showIberia", d.showIberia),
    royal: bool("royal", d.royal),
    official: bool("official", d.official),
    community: bool("community", d.community),
    scopeClaim: en(
      "scopeClaim",
      ["yonetici", "kurum", "yerel", "herkes"],
      d.scopeClaim,
    ),
    serviceMask: num("serviceMask", 0, 7),
    serviceClaim: en(
      "serviceClaim",
      ["ticaret", "egitim", "saglik", "tum-nufus"],
      d.serviceClaim,
    ),
    funded: bool("funded", d.funded),
    guess: typeof s.guess === "string" ? s.guess.slice(0, 80) : "",
    reason: typeof s.reason === "string" ? s.reason.slice(0, 120) : "",
    checked: bool("checked", false),
  };
}
export function historyBActive026(
  lessonId: string,
  s: HistoryBState026,
): (keyof HistoryBState026)[] {
  const id = lessonId.endsWith("-ileri") ? lessonId.slice(0, -6) : lessonId;
  if (id === "ortacag-dunya")
    return [
      "tax",
      "command",
      ...(s.tax === "local" || s.command === "local"
        ? ["revocable" as const]
        : []),
    ];
  if (id === "ilk-turk-dunyasi") return ["bundle", "mask", "claim"];
  if (id === "islam-medeniyetinin-dogusu") return ["from", "to", "showIberia"];
  if (id === "turklerin-islamiyeti-kabulu")
    return [
      "scopeClaim",
      ...(s.scopeClaim === "yonetici"
        ? ["royal" as const]
        : s.scopeClaim === "kurum"
          ? ["official" as const]
          : s.scopeClaim === "yerel"
            ? ["community" as const]
            : ["royal" as const, "official" as const, "community" as const]),
    ];
  if (id === "selcuklu-yerlesme-devletlesme")
    return [
      "serviceMask",
      "serviceClaim",
      ...(s.serviceClaim !== "tum-nufus" ? ["funded" as const] : []),
    ];
  return [];
}

// AUTHORED_CONTENT_HISTORY_B026

export const forge026HistoryBGuides: LessonGuide[] = [
  {
    id: "ortacag-dunya",
    minutes: 110,
    objectives: [
      "Orta Çağ toplumlarını yetki, üretim, askerî hizmet ve hukuk ilişkileriyle karşılaştırmak.",
      "Ticaret ağlarını ve toplumsal dönüşümü birden fazla mekanizma ve kanıt üzerinden açıklamak.",
      "Kaynakta verilen olgu, sınırlı çıkarım ve ek kanıt gerektiren iddiayı ayırmak.",
    ],
    sections: [
      {
        title: "Bir çağ, birçok siyasi yapı",
        paragraphs: [
          "Orta Çağ, geçmişin uzun zamanını incelemeyi kolaylaştıran bir dönem adıdır. Avrupa merkezli okul tarihlemesinde Batı Roma’nın 476’da sona ermesi başlangıç işaretlerinden biridir; İstanbul’un 1453’te alınması da yaygın bitiş işaretidir. Bu işaretler her coğrafyanın aynı kurumları aynı gün benimsediğini anlatmaz. Bir devleti incelerken yönetim merkezi, gelir kaynağı, askerî örgüt ve hukuk düzeni için ayrı sorular sorulur.",
          "Monarşi, başında hükümdar bulunan yönetimdir. Otokrasi, karar yetkisinin dar bir merkezde veya hükümdarda yoğunlaşmasını vurgular; belirli bir veraset yönteminin zorunlu adı değildir. Bizans’ın imparatorluk kurumları, İran merkezli Sasanilerin şehinşahlığı ve Avrupa’nın yerel bağlılıkları aynı yüzyıllarda farklı bileşimler gösterebilir. Karşılaştırmayı ortak bir ölçütle yapmak, yalnız devlet adlarını sıralamaktan daha açıklayıcıdır.",
        ],
      },
      {
        title: "Feodaliteyi bir yükümlülük ağı olarak gör",
        paragraphs: [
          "Feodal ilişkiler özellikle Orta Çağ Batı Avrupa’sının belirli bölgelerinde, toprak geliri, koruma ve hizmet bağlarının yerel güçlerle örüldüğü bir düzeni anlamaya yarar. Senyör veya lord üst konumdaki yerel efendiyi, vassal ona bağlılık ve hizmet yükümlülüğü taşıyan kişiyi belirtir. Bir soylu kendi üstüne karşı vassal, altındaki başka bir kişiye karşı senyör olabilir; konumu ilişki içinde belirlenir.",
          "Bir fief veya gelir hakkının verilmesiyle hizmet beklenmesi, modern eşit yurttaşlık ya da yalnızca ücret sözleşmesiyle aynı değildir. Bağın süresi, mirasla geçişi ve hizmetin kapsamı bölgeye göre değişebilir. Feodaliteyi incelerken kimin koruduğu, kimin gelir aldığı, kimin sefere katıldığı ve kimin yargıladığı açıkça yazılır. Böylece kral unvanının bulunmasıyla ülkenin her işinin doğrudan merkezden yönetilmesi birbirinden ayrılır.",
        ],
      },
      {
        title: "Toprak yalnız yiyecek değil, gelir ve asker demektir",
        paragraphs: [
          "Toprak, tarımsal ürünün yanında vergi, kira ve hizmet gelirlerinin de kaynağıdır. Köylünün üretimi kendi geçimini, yöneticinin gelirini ve savaşçının donanımını farklı paylarla destekleyebilir. Artı ürün, üreticinin temel ihtiyaçlarını aşan üründür; depolama, alışveriş ve tarım dışında uzmanlaşma için imkân sağlar. Fazlanın varlığı ile fazlanın kim tarafından denetlendiği iki ayrı bilgidir.",
          "Toplumsal tabakalaşma, hakların, statünün ve kaynaklara erişimin farklı gruplar arasında eşit dağılmamasını anlatır. Soylu, din adamı, köylü ve şehirli tüccarın konumları aynı değildir. Aynı toplumda ayni, nakdî ve emekle yerine getirilen yükümlülükler birlikte bulunabilir. Bir kayıt tahıl satıldığını söylüyorsa verginin de tahılla ödendiği henüz bilinmez; ödeme sırasında verilen aracı ayrıca bulmak gerekir.",
        ],
      },
      {
        title: "Yollar birer kültür ağıdır",
        paragraphs: [
          "Ticaret yolu, tek bir devletin kesintisiz yönettiği sabit bir çizgiden çok, pazarları ve aktarma merkezlerini bağlayan güzergâhlar ağıdır. İpek Yolu Çin ve Orta Asya üzerinden batı merkezlerine uzanan kara bağlantılarıyla; Baharat Yolu Hint Okyanusu, Güney Asya ve Akdeniz arasındaki deniz ve kara aşamalarıyla düşünülür. Kürk Yolu kuzey Avrasya’nın orman ve bozkır kuşaklarındaki deri-post ticaretini hatırlatır.",
          "Malın üretildiği yer, taşındığı yol ve tüketildiği pazar farklı siyasi merkezlerin elinde bulunabilir. Geçiş vergileri gelir, yol güvenliği ise süreklilik sağlar. İnsanların karşılaşmasıyla inanç, teknik, bilgi ve hastalıklar da taşınabilir. Bu etkileşim yerel uyarlamalar doğurabilir; bütün kültürlerin aynılaşması için yeterli kanıt değildir. Ağdaki bir kolun kapanması da başka bir kol açık kaldığında bütün bağlantının mutlaka kesildiğini göstermez.",
        ],
      },
      {
        title: "Orduyu geçim ve yönetimden ayırma",
        paragraphs: [
          "Bir orduyu karşılaştırmak için savaşçının geçimini, komuta bağını, eğitimini, silahını ve görev yaptığı araziyi birlikte incelemek gerekir. Toprak gelirine bağlı hizmet, para karşılığında askerlik ve merkezce sürekli tutulan birlik farklı düzenlerdir. Bizans ordusunda dönemlere göre merkez ve eyalet kuvvetleri, yardımcı birlikler ve ücretli askerler bulunmuştur; bütün tarihi yalnız tek asker türüne indirgenemez.",
          "Bozkır çevrelerinde atlı hareket ve okçuluk, açık arazide manevra olanaklarını artırabilir. Ağır teçhizat, sur, kuşatma aracı ve ikmal başka ihtiyaçlara cevap verir. Bir aracın faydası amaçla ilişkilidir: hızlı ilerleyiş, uzun kuşatmanın yiyecek sorununu tek başına çözmez. Orduya ayrılan gelirle savaşın sonucu da farklı değişkenlerdir; kaynak yeterliliği askerî kapasiteyi etkiler, kesin zafer hesabı oluşturmaz.",
        ],
      },
      {
        title: "Hukukta devamlılık ve yeni düzenleme",
        paragraphs: [
          "Hukuk, toplumsal ilişkileri ve ihlallere verilecek karşılıkları düzenleyen kurallar bütünüdür. Gelenekler, yönetici kararları ve yazılı metinler aynı hukuk düzeninde birlikte yer alabilir. VI. yüzyılda Justinianus döneminde Roma hukukunun derlenmesi, önceki birikimin yeni ihtiyaçlarla düzenlenmesine örnektir. Derleme, bütün kuralların ilk kez o tarihte doğması ya da geçmişin tümden silinmesi demek değildir.",
          "Cengiz Han Yasası, yönetim ve askerlik kurallarıyla geleneklerin düzenlenmesi bağlamında ele alınır; elimizde her ayrıntısı değişmeden korunmuş tek bir özgün kanun kitabı varmış gibi alıntı üretilmez. Bir hukuk kaydını incelerken kişi, fiil, hak ve yaptırım ayrı tutulur. Yazılılık, kuralların kaydedildiğini gösterir; herkesin aynı hakka sahip olduğunu ancak metnin içeriği ve uygulama kanıtı gösterebilir.",
        ],
      },
      {
        title: "Roma’nın bölünmesi ile siyasi sonu ayır",
        paragraphs: [
          "395’te Roma İmparatorluğu’nun doğu ve batı yönetimleri biçiminde ayrılmasıyla 476’da Batı Roma imparatorluk otoritesinin sona ermesi farklı gelişmelerdir. Doğu Roma, yani Bizans, sonraki yüzyıllarda varlığını sürdürmüştür. Aynı Roma geçmişini paylaşmak, iki yapının bütün kurumlarının ve siyasi ömrünün aynı olması anlamına gelmez. Tarih, yer ve olay türünü birlikte yazmak benzer adlardan kaynaklanan karışıklığı önler.",
          "Bir sıralama, olayların önce ve sonra olduğunu gösterebilir. Roma’daki dönüşümün açıklanması ise askerî baskılar, mali kaynaklar, siyasi mücadeleler ve yerel ilişkiler gibi ek etkenler gerektirir. 476’yı tek başına bütün Avrupa’daki her değişimin yeterli nedeni saymak bu ilişkileri eksiltir. Dönem sınırı bir inceleme aracıdır; toplumlar arasında aynı anda işleyen zorunlu bir evre yasası değildir.",
        ],
      },
      {
        title: "Merkezî denetimi üç yetki üzerinden araştır",
        paragraphs: [
          "Vergi toplama, asker görevlendirme ve yargılama, siyasi gücün izlenebileceği üç ayrı alandır. Bunlar doğrudan hükümdarın memurlarınca yürütülebilir veya yerel bir görevliye bırakılabilir. Yerelde bir görevli bulunması tek başına merkezin güçsüzlüğünü göstermez. Görevlinin merkezce atanması, denetlenmesi ve görevden alınabilmesi de araştırılır.",
          "Buna karşılık bir yerel bey gelirleri kendi adına topluyor, askerî katkısını pazarlıkla belirliyor ve yargı yetkisini kalıtsal bir hak olarak kullanıyorsa yerel hareket alanının genişliğine ilişkin çoklu kanıt vardır. Aynı ülkede üç yetki aynı elde bulunmayabilir. Etkinlikte gelir, görevden alma ve askerî emir alanlarını değiştirerek bu karma durumları gör; çizilen bağlar verilen öğretim modelinin yetki ilişkileridir.",
        ],
      },
      {
        title: "Meşruiyet ile yetkiyi kullanma biçimi",
        paragraphs: [
          "Meşruiyet, yönetimin neden haklı ve kabul edilir sayıldığına ilişkin dayanakları anlatır. Hanedan soyu, kutsal bir görev, gelenek veya askerî başarı bu söylemlerde kullanılabilir. Şehinşah unvanı kralların kralını, imparator ise başka bir siyasi geleneği ifade eder. Unvan, yöneticinin bütün kararlarını hangi kurumlarla uyguladığını tek başına açıklamaz.",
          "Dinî bir dayanağın ileri sürülmesi hükümdarın doğrudan tanrı sayılmasıyla aynı değildir. Aynı biçimde danışma kurulunun varlığı, yönetimde tüm halkın eşit oy kullandığını göstermez. Meşruiyet cümlesini yetki dağılımı cümlesinden ayır: ilki yönetme hakkının gerekçesini, ikincisi karar ve uygulama araçlarını anlatır. Bir yönetim her iki boyutta da birden fazla unsur taşıyabilir.",
        ],
      },
      {
        title: "Serf, köle ve soylu vassalın farklı konumları",
        paragraphs: [
          "Serf, belirli toprak ve kişisel yükümlülüklere bağlı köylü için kullanılan tarihsel bir statüdür. Kölelik ise başka mülkiyet ve kişi statüsü ilişkileri içerir; iki kavram her yerde eş anlamlı değildir. Köylünün toprağı terk edebilmesi, evlilik ve miras hakları, üründen verdiği pay ve çalışma günleri somut kayıtlardan incelenir. Bütün köylüler de aynı hukuki konumda olmayabilir.",
          "Soylu vassalın askerî hizmetiyle serfin üretim ve emek yükümlülüğünü aynı iş saymak tabakalaşmayı görünmez kılar. Ortak bir bağımlılık özelliği bulunabilir; fakat bağlı olunan kişi, sağlanan hak ve yerine getirilen hizmet farklıdır. Bir toplumsal karşılaştırma bu benzerliği söyledikten sonra farkları da gösterir. Tarihsel bir terimi bugünkü çalışan, vatandaş veya meslek adıyla bütünüyle eşitlemek yerine kendi bağlamında tanımla.",
        ],
      },
      {
        title: "Ödeme aracı ile yükümlülüğün kaynağı",
        paragraphs: [
          "Ayni ödeme, mal veya ürünle; nakdî ödeme parayla yapılır. Emek yükümlülüğünde ise belirli bir işin yerine getirilmesi beklenir. Bir köylü aynı yıl tahılla kira, parayla pazar vergisi ve yol yapımında çalışma yükümlülüğü taşıyabilir. Bir toplumda para bulunması bütün ödemelerin nakdî olduğu anlamına gelmez.",
          "Ödeme türü belirlenirken başlangıçta hangi ürünün yetiştirildiğine değil, yükümlülük yerine getirilirken ne verildiğine bakılır. Ürününü satıp gümüşle ödeme yapan kişinin ödemesi nakdîdir. Farklı türleri tek toplamda karşılaştırmak istenirse dönüşüm kuralı ayrıca verilmelidir. Öğretim örneklerindeki eşdeğer hesaplar bu yüzden açık bir kurmaca fiyat kullanır; bunlar gerçek bir Orta Çağ fiyat serisi değildir.",
        ],
      },
      {
        title: "Kast ve feodaliteyi ortak bir sözcükle eritme",
        paragraphs: [
          "Kast, özellikle Hindistan bağlamında doğumla ilişkili statü ve toplumsal sınırları açıklayan bir kavramdır. Ders şemalarında brahman, kşatriya, vaisya ve sudra gibi gruplar anılır. Bu çerçeve, bütün Hindistan’ın her çağdaki yerel ilişkilerini tek tabloyla eksiksiz açıklamaz. İncelenen bölge, dönem ve kayıt mutlaka belirtilir.",
          "Feodalite ise toprak, bağlılık, koruma ve hizmet ilişkileri üzerinden ele alınır. İki düzende eşitsizlik bulunması karşılaştırma için ortak bir ölçüt sağlar; bütün kurumların aynı olduğu sonucunu vermez. Bir araştırmada karşılaştırılacak alanı seç: statünün kazanılması mı, meslek ve evlilik sınırı mı, askerî hizmet mi? Böylece “eşitsizlik var” ifadesi açıklamanın başlangıcı olur, bütün ayrıntıların yerine geçmez.",
        ],
      },
      {
        title: "Han, kervansaray ve ribatta işlevi izle",
        paragraphs: [
          "Hanlar konaklama, depolama, atölye ve ticaret işlevleri taşıyabilir. Kervansaray özellikle ana yollar üzerinde kervanların konaklaması ve güvenliğiyle ilişkilidir. Ribat başlangıçta sınır savunması ve askerî yerleşim bağlamında kullanılabilir; bazı yapılarda zamanla başka işlevler gelişmiştir. Yapı adının yanında dönem ve kullanım bilgisi okunur.",
          "Bir binanın yol kenarında olması tek başına bütün işlevini belirlemez. İçeride kimlerin kaldığı, hangi hizmetlerin verildiği ve giderlerin nasıl karşılandığı daha güçlü kanıttır. Aynı bina farklı yüzyıllarda savunma ve konaklama amacıyla kullanılabilir. Bu durumda işlev değişimini göstermek gerekir; yapının ilk ve son kullanımını tek tarihsel fotoğraf gibi birleştirmek doğru olmaz.",
        ],
      },
      {
        title: "Arasta, bedesten, kapan ve panayır",
        paragraphs: [
          "Arasta, benzer esnaf dükkânlarının bir sokakta veya düzenli bir bölümde toplanmasıyla; bedesten değerli malların korunaklı ticaretiyle ilişkilidir. Kapan, belirli malların toptan tartımı ve dağıtımını anlatan ticari mekân bağlamıdır. Panayır belirli zamanlarda daha geniş çevrelerden katılım sağlayan buluşma, liman ise deniz taşımacılığındaki aktarma ve denetim noktasıdır.",
          "Bu adların hepsi ticaretle ilgili olsa da aynı ihtiyacı karşılamaz. Değerli malın korunması, toptan ölçüm, düzenli esnaf yerleşimi ve dönemsel buluşma ayrı işlevlerdir. Bir kaynakta işlev açık verildiğinde adı bu işleve göre belirle. Yapının bulunması, ticaretin miktarı, bütün halkın mesleği veya siyasi haklar hakkında tek başına bir oran ya da kesin hüküm vermez.",
        ],
      },
      {
        title: "İpek, Baharat, Kürk ve Kral Yolu",
        paragraphs: [
          "İpek Yolu çok sayıda kolu ve aracıyı içeren bir Asya-batı bağlantıları ağıdır. Baharat Yolu Güney Asya ve Hint Okyanusu ürünlerini Basra, Kızıldeniz ve Akdeniz bağlantılarıyla düşünmeyi gerektirir. Kürk Yolu kuzeydeki orman ve bozkır ürünleriyle ayrılır. Kral Yolu’nun Sardes–Sus bağlantısı ise İlk Çağ kökenlidir; yol adının bu ünitede geçmesi onun ilk kez Orta Çağ’da açıldığı anlamına gelmez.",
          "Bir güzergâhta yalnız adı geçen ürün taşınmaz. Vergi, güvenlik, ikmal ve siyasi sınırların değişmesi malların başka kollara yönelmesine yol açabilir. Haritadaki çizgi, gerçek güzergâhın her noktasında tek bir yol veya kesintisiz tek egemenlik değildir. Mesafe hesabı ancak güvenilir ölçek ve ölçü verildiğinde yapılır; kavramsal ağ çiziminde düğümler arasındaki uzaklık tarihsel kilometreyi temsil etmez.",
        ],
      },
      {
        title: "Ticaret, diplomasi ve kültürel aktarım",
        paragraphs: [
          "Karşılıklı ihtiyaç, hayvansal ürünler ile tahıl ve zanaat ürünlerinin değişimini destekleyebilir. Güvenli geçiş sağlamak için görüşmeler yapılması, ticaretle diplomasinin birlikte işleyebileceğini gösterir. Aynı taraflar başka bir konuda rekabet de edebilir. Tarihsel ilişkileri sürekli savaş veya kesintisiz dostluk ikiliğine indirgemek bu eşzamanlı boyutları kaçırır.",
          "Bir tekniğin başka bir bölgede kullanılması, yerel dile uyarlanması ve yeni ihtiyaçlara cevap vermesi kültürel aktarımın farklı aşamalarıdır. Aktarım yönünü göstermek için zaman, bağlantı ve kullanım kanıtı aranır. Aynı nesnenin iki yerde bulunması tek başına ilk üreticiyi kesinleştirmez. Ticari karşılaşma aktarım için bir kanal sunar; her mal alışverişi bütün inanç ve kurumların değiştiğini göstermez.",
        ],
      },
      {
        title: "Bizans, Sasani ve Moğol örneklerini karşılaştır",
        paragraphs: [
          "Bizans’ın imparatorluk geleneği, eyalet ve merkez kurumlarıyla ticari bağlantıları birlikte düşünülür. Sasaniler İran ve Mezopotamya çevresinde toprak gelirleri, ticaret ve şehinşahlık düzeniyle incelenir. Moğol siyasi birliğinin Cengiz Han’ın kağan ilan edildiği 1206 bağlamında güçlenmesi ise farklı bir tarihsel süreçtir. Bunlar aynı yönetimin üç adı değildir.",
          "Her örnekte aynı ölçütü kullan: gelir nasıl toplanıyor, asker kime bağlı, meşruiyet nasıl açıklanıyor? Ekonomide bir faaliyetin öne çıkması başka faaliyetlerin hiç bulunmadığını göstermez. Coğrafi genişlik de her yerin aynı yoğunlukta yönetildiğinin kanıtı değildir. Karşılaştırma belirli dönemlerle sınırlandığında değişim görülebilir; yüzyıllar süren bir devleti tek bir kurum görüntüsüne sabitlemekten kaçınılır.",
        ],
      },
      {
        title: "Salgın, nüfus ve emek ilişkisini kur",
        paragraphs: [
          "XIV. yüzyılda Avrupa’yı ağır biçimde etkileyen veba salgını, nüfus değişiminin üretim, emek, vergi ve alışveriş üzerinde etkili olabileceğini gösterir. Çalışabilecek kişi sayısı azaldığında aynı üretim düzenini sürdürmek güçleşebilir; yerel ücret ve hizmet ilişkileri de değişebilir. Etkinin yönü ve büyüklüğü bölgenin koşullarıyla birlikte araştırılır.",
          "Bir kayıtta nüfusun azalmasıyla ücretin yükselmesi birlikte görülüyorsa aralarındaki mekanizma tartışılabilir. Savaş, göç, ürün kıtlığı veya kayıt kapsamının değişmesi gibi başka açıklamalar da denetlenir. Tek bir kasabanın verisi bütün Avrupa için kesin ölüm oranı vermez. Öğretim örneğindeki sayılar yalnız verilen iki örnek kaydın karşılaştırılmasını sağlar; tarihsel salgının gerçek nüfus sayımı yerine geçmez.",
        ],
      },
      {
        title: "Yazılı hukukta biçim, içerik ve uygulama",
        paragraphs: [
          "Bir kanunun yazıya geçirilmesi kuralları kaydetmeyi ve başvuru yapmayı kolaylaştırabilir. Kuralın konusu borç, mülkiyet, aile, miras veya kamu düzeni olabilir. Tazminat zararın karşılanması, ceza ise ihlale verilen yaptırım bağlamındadır; bir metinde ikisi birlikte bulunabilir. Sadece ödeme kelimesi görülerek işlemin niteliği belirlenmez.",
          "Aynı fiile farklı statüler için farklı sonuç bağlanmışsa statüye göre ayrım bulunduğuna dair içerik kanıtı vardır. Herkese aynı yazılı hükmün verilmesi ise uygulamanın her yerde eşit olduğunu kendiliğinden kanıtlamaz. Kural metniyle mahkeme kaydı farklı sorulara cevap verir. İlki neyin öngörüldüğünü, ikincisi belirli olayda ne yapıldığını gösterebilir; ikisi birlikte daha sağlam değerlendirme sağlar.",
        ],
      },
      {
        title: "Bir açıklamayı birden fazla kanıtla sına",
        paragraphs: [
          "İyi bir tarihsel açıklama önce neyi açıkladığını belirler, sonra olguları bir mekanizma içinde ilişkilendirir. Örneğin yerel güçlenme için vergi, askerî bağlılık ve yargı kayıtları birlikte kullanılabilir. Üç kaydın aynı kaynaktan kopyalanmış olmasıyla birbirinden bağımsız üç tanıklık olması aynı şey değildir. Kaynakların kim tarafından, ne zaman ve hangi amaçla üretildiğini araştır.",
          "Bir iddiayı destekleyen bulgu kadar onu sınırlayan bulgu da değerlendirilir. “Kral vardır” gözlemi hem güçlü hem sınırlı merkezli yapılarda görülebilir; bu yüzden ayırt edici kanıt yetkinin kullanımıdır. Yeni bir kayıt eski yorumu değiştirebilir. Sonuçta doğrudan veri, gerekçeli ama sınırlı çıkarım ve henüz veri bulunmayan iddia ayrı yazılır; tarih sırası tek başına kesin nedensellik yerine kullanılmaz.",
        ],
      },
      {
        title: "Dinî kurumlar ve 1054 ayrılığı",
        paragraphs: [
          "Dinî kurumlar Orta Çağ toplumlarında inanç, öğretim, toplumsal dayanışma ve siyasi meşruiyet gibi farklı alanlarla ilişkili olabilir. Bu işlevler bölge ve döneme göre araştırılır. Din adamlarının veya kurumların toprak ve gelir bağlantıları bulunması, ekonomik ve dinî hayatın aynı çevrede birlikte işleyebileceğini gösterir.",
          "1054, Katolik ve Ortodoks kiliseleri arasındaki ayrılıkta geleneksel bir dönüm noktası olarak öğrenilir. Bu tarih bütün farklılaşmanın tek gün içinde tamamlandığı veya bütün siyasi devletlerin aynı anda yıkıldığı anlamına gelmez. Dinî kurum, siyasi otorite ve topluluğun günlük inancı farklı katmanlardır; birindeki değişim diğerlerinin bütün ayrıntılarını tek başına belirlemez.",
        ],
      },
      {
        title: "1215 Magna Carta ve yetki sınırları",
        paragraphs: [
          "Magna Carta 1215 İngiltere bağlamında kralın bazı yetkilerinin sınırlandırılması ve belirli toplumsal grupların talepleriyle ilişkilidir. Belge siyasi gücün kurallarla ilişkisini incelemek için önemlidir. Bir hükümdarın yetkisinin tartışılabilmesi ile bütün halkın yönetime aynı hakla katılması iki ayrı ölçüttür.",
          "Bu gelişmeyi modern genel ve eşit oy hakkının bir anda bütün nüfusa verildiği biçiminde okumak doğru olmaz. Bir hak düzenlemesinin hangi grupları, hangi konuyu ve hangi uygulamayı kapsadığı araştırılır. Zaman içinde değişen belge ve kurumlar karşılaştırılabilir; tek bir tarihe bütün sonraki siyasi hakların tamamı yüklenmez.",
        ],
      },
    ],
    examples: [
      {
        title: "Sergi başlığındaki kapsamı düzelt",
        prompt:
          "Özgün öğretim modeli: Bir serginin başlığı “476’da dünyanın her yerinde feodal düzen başladı”dır. Yanındaki kartlar yalnız Batı Roma’daki otorite kaybını, Doğu Roma’nın sürmesini ve başka bölgelerde farklı yönetimler bulunmasını anlatıyor. Başlığı bu üç kartın ortak sınırını koruyarak yeniden yaz.",
        strategy:
          "Her kartın coğrafi kapsamını ayır; dönem sınırı ile bütün toplumlar hakkında hükmü karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İlk kart Batı Roma’daki siyasi sonla ilgilidir; dünyanın bütün bölgelerini anlatmaz.",
          },
          {
            label: "2. adım",
            explanation:
              "İkinci ve üçüncü kart eşzamanlı farklı siyasi yapıların sürdüğünü gösterir; tek tip dünya düzeni iddiasına karşı kanıttır.",
          },
          {
            label: "3. adım",
            explanation:
              "Başlığı “476, Avrupa merkezli dönemlemede bir sınırdır; farklı bölgelerde farklı yönetimler sürmüştür” biçiminde daralt.",
          },
        ],
        answer: "Başlık coğrafi ve kurumsal çeşitliliği korumalıdır.",
        check:
          "Yeni cümle üç kartla da bağdaşır; Batı Roma’daki değişimi silmez ve bütün dünyaya yaymaz.",
        pitfall:
          "Bir dönemin başlangıç işaretini her toplum için aynı gün gerçekleşen olay sayma.",
      },
      {
        title: "Kapalı kolda alternatif bağlantı",
        prompt:
          "Kurmaca ticaret ağı A–B–D ve A–C–D bağlantılarından oluşuyor; her bağlantı iki yönlüdür. B–D kapandığında A ile D arasındaki bağın tamamen kesilip kesilmediğini belirle. Çizgiler kilometre veya ticaret hacmi göstermiyor.",
        strategy: "A’dan D’ye açık kalan tam bir düğüm dizisi ara.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Başlangıçta B ve C üzerinden iki ayrı yol vardır. B–D kapanınca yalnız B üzerinden tamamlanan yol bozulur.",
          },
          {
            label: "2. adım",
            explanation:
              "A–C ve C–D açık olduğundan A–C–D dizisi bağlantıyı sürdürür.",
          },
          {
            label: "3. adım",
            explanation:
              "Ağın bağlı kalması, aynı maliyet veya aynı miktarda mal taşındığını göstermez; bu nicelikler verilmemiştir.",
          },
        ],
        answer: "Bağlantı sürer; açık yol A–C–D’dir.",
        check:
          "Yolun her kenarı açık listede vardır. Sonuç yalnız ulaşılabilirlik hakkındadır.",
        pitfall:
          "Bir kolun kapanmasını bütün ağın kapanmasıyla veya hiç ekonomik etki doğmamasıyla eşitleme.",
      },
      {
        title: "Farklı yükümlülükleri açık kuralla karşılaştır",
        prompt:
          "Tamamı kurmaca bir hesapta 1 çuval tahıl=3 hesap birimidir. Hane A, 6 çuval; hane B, ürününü sattıktan sonra 21 hesap birimi; hane C ise 4 günlük yol işi veriyor. A ve B ödemesini aynı hesap biriminde karşılaştır, C’yi neden bu toplamda sayamayacağını açıkla.",
        strategy:
          "Ödeme anındaki aracı belirle; yalnız verilmiş dönüşüm kuralını kullan.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "A mal verdiği için ayni, B para verdiği için nakdî ödeme yapar. A’nın eşdeğeri 6×3=18 hesap birimidir.",
          },
          {
            label: "2. adım",
            explanation:
              "B’nin ödemesi 21 birimdir; verilen kurala göre B, A’dan 21−18=3 birim fazla öder.",
          },
          {
            label: "3. adım",
            explanation:
              "C’nin 4 günlük emeği için günlük parasal karşılık verilmediğinden onu 4 para birimi gibi toplamak mümkün değildir.",
          },
        ],
        answer:
          "A: 18, B: 21; fark 3 hesap birimi. C için parasal eşdeğer belirlenemez.",
        check:
          "6 çuvalın yeniden karşılığı 18’dir. Sonuç kurmaca fiyat şartına bağlıdır.",
        pitfall:
          "Gün, çuval ve parayı dönüşüm kuralı olmadan aynı birim gibi toplama.",
      },
      {
        title: "İki kasabadan bütün kıtaya geçme",
        prompt:
          "Özgün karşılaştırma verisi: Aynı yıllar arasında kasaba K’de çalışan sayısı 80’den 60’a, günlük ücret 4’ten 5’e; kasaba L’de çalışan sayısı 80’den 60’a, ücret 4’ten 4’e gidiyor. L’ye ayrıca yeni bir işçi grubu geliyor. Bu tablo “çalışan azalınca her yerde ücret zorunlu yükselir” iddiasını destekliyor mu?",
        strategy:
          "Her kasabanın iki değişkenini ayrı karşılaştır, ardından evrensel iddiayı sına.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Her iki ilk kayıtta çalışan sayısındaki fark 20’dir. K’de ücret artarken L’de aynı kalmıştır.",
          },
          {
            label: "2. adım",
            explanation:
              "K, emek arzı ile ücret ilişkisini tartışmak için örnek olabilir; L aynı değişimden zorunlu ve tek sonuç çıkmadığını gösterir.",
          },
          {
            label: "3. adım",
            explanation:
              "Yeni işçi grubunun kapsamı ve zamanını araştırmak alternatif açıklamayı sınamaya yardım eder; iki kasaba bütün Avrupa’nın gerçek istatistiği değildir.",
          },
        ],
        answer:
          "Evrensel zorunluluk desteklenmez; yerel ek koşullar araştırılmalıdır.",
        check:
          "İddianın “her yerde” kısmını L kaydı tek başına sınırlar. K’deki artış da yok sayılmaz.",
        pitfall:
          "İki değişkeni birlikte görmekten tek ve değişmez bir tarih yasası çıkarma.",
      },
      {
        title: "Kural metniyle uygulama kaydını birlikte oku",
        prompt:
          "Kurmaca bir derlemede borç için yeni süre 30 gün olarak yazılmıştır. Aynı bölgenin bir dava kaydı borcun 20. gününde tahsil edildiğini, başka bir kayıt ise 45. günde hâlâ beklediğini bildiriyor. Derleme ile uygulama hakkında hangi iki farklı soruyu sormalısın?",
        strategy: "Öngörülen kuralı somut olayın zamanından ayır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Derleme 30 günlük genel bir süre öngörür; 20 ve 45 ise iki olayın kayıtlı zamanlarıdır.",
          },
          {
            label: "2. adım",
            explanation:
              "Bu kayıtlar kuralın her olayda aynı biçimde uygulandığını doğrudan göstermez. Erken ödeme, erteleme veya başka şartlar bulunabilir.",
          },
          {
            label: "3. adım",
            explanation:
              "Sözleşme koşulu, mahkeme kararı ve kayıt tarihleri ek kanıt olarak aranır; hemen bütün hukukun işlemediği sonucu verilmez.",
          },
        ],
        answer:
          "“Hangi kural öngörülmüş?” ve “Bu olaylarda hangi şartlarla ne uygulanmış?” soruları ayrılmalıdır.",
        check:
          "Üç sayı aynı tür olayı ölçmez: biri normdaki süre, ikisi ayrı uygulama kaydıdır.",
        pitfall: "Metindeki kuralı bütün olayların otomatik fotoğrafı sayma.",
      },
      {
        title: "Askerî gider hesabının sınırı",
        prompt:
          "Tamamı kurmaca bir hazırlıkta kasada 240 hesap birimi vardır. Sefer için 12 savaşçının her birine 10 birim donanım ve 8 gün boyunca günlük 1 birim erzak ayrılacaktır. Kaynak bu iki gideri karşılar mı; bu sonuç zaferi kanıtlar mı?",
        strategy:
          "Savaşçı başına sabit giderle süreye bağlı gideri ayrı hesapla.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Donanım gideri 12×10=120 birimdir. Erzak gideri 12×8×1=96 birimdir.",
          },
          {
            label: "2. adım",
            explanation:
              "Toplam 216 birim, eldeki 240 birimden küçüktür; bu kalemlerden sonra 24 birim kalır.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu iki kalemin karşılanması, rakip, arazi, sağlık ve komuta hakkında bilgi vermez; savaş sonucu hesaplanmış olmaz.",
          },
        ],
        answer:
          "Verilen iki gider karşılanır; 24 birim kalır. Zafer sonucu çıkarılamaz.",
        check:
          "120+96+24=240 toplamı bütçeyi korur; listelenmemiş giderlere pay varsayılmaz.",
        pitfall:
          "Mali yeterlilikle bütün askerî koşulları aynı değişken sayma.",
      },
    ],
    recall: [
      {
        prompt:
          "Bir yerel görevlinin bulunması merkezî zayıflığı tek başına gösterir mi?",
        answer:
          "Hayır. Atanma, denetim, görevden alınma ve yetkilerin kimin adına kullanıldığı araştırılır.",
      },
      {
        prompt:
          "Ürün satıldıktan sonra vergi parayla ödenmişse ödeme hangi türdedir?",
        answer: "Nakdîdir; belirleyici ödeme anında verilen araçtır.",
      },
      {
        prompt: "Bir vassal başka bir ilişkide senyör olabilir mi?",
        answer:
          "Evet. Üstüne karşı bağlılık taşıyan kişi altındaki başka bir kişiye gelir ve koruma sağlayabilir; ilişki ayrı incelenir.",
      },
      {
        prompt: "Bir yol çiziminde alternatif kol neyi değiştirebilir?",
        answer:
          "Bir kol kapansa da ulaşılabilirliği sürdürebilir. Maliyet, süre ve ticaret miktarı için ayrıca veri gerekir.",
      },
      {
        prompt: "Yazılı kural ile dava kaydı hangi farklı soruları karşılar?",
        answer:
          "Kural neyin öngörüldüğünü, dava kaydı belirli olayda ne yapıldığını gösterebilir; uygulama koşulları karşılaştırılır.",
      },
      {
        prompt:
          "Aynı tarihte iki kurumun bulunması aralarında tek kesin neden kurar mı?",
        answer:
          "Hayır. Zaman uyumunun yanında mekanizma, başka etkenler ve karşı kanıtlar değerlendirilir.",
      },
    ],
    source:
      "MEB Tarih 9 ve 10 ders kitaplarının ilgili üniteleri, OGM Dersler Cepte ve kaynakları karşılaştırılan Aurelia konu kâğıtları temelinde hazırlanmış özgün anlatım. Etkinliklerdeki kurmaca kayıtlar öğretim içindir; gerçek belge alıntısı veya resmî sınav sorusu değildir.",
  },
  {
    id: "ilk-turk-dunyasi",
    minutes: 120,
    objectives: [
      "Bozkır çevresi, üretim biçimleri, boy birlikleri ve yönetim kurumları arasındaki ilişkileri açıklamak.",
      "Hun, Kök Türk ve Uygur gelişmelerini kişi, dönem ve kaynak türüyle birlikte ayırmak.",
      "Göç, ittifak ve kültürel değişimi çoklu etkenlerle yorumlayıp kanıtın kapsamını korumak.",
    ],
    sections: [
      {
        title: "Bozkır tek bir geçim biçimine indirgenemez",
        paragraphs: [
          "Bozkır, otların baskın olduğu açık bir çevredir; bütün Orta Asya’nın aynı iklimde, susuz bir çöl olduğu anlamına gelmez. Otlak, su, mevsim ve sürülerin ihtiyacı farklı yerlerde farklı yaşam düzenleri oluşturur. Konargöçerlikte belirli yaylak ve kışlaklar arasında düzenli hareket bulunabilir. Yer ve zaman seçimi, üretim ve toplumsal örgütlenme gerektirir.",
          "Hayvancılık öne çıkarken tarım, maden işçiliği, zanaat ve ticaret de bulunabilir. Bir topluluğun tahıl satın alması, kendi çevresinde hiç tarım yapılmadığını tek başına göstermez. Ekonomik faaliyetleri birbirini dışlayan etiketler yerine birlikte çalışan parçalar olarak incele. Coğrafya bazı imkân ve sınırlamalar sunar; bütün insanların kültürünü ve davranışını kaçınılmaz biçimde belirleyen tek neden değildir.",
        ],
      },
      {
        title: "Kut yetki verir; töre sorumluluk getirir",
        paragraphs: [
          "Kut, kağanın yönetme hakkını ilahî bir kaynağa bağlayan meşruiyet anlayışıdır. Bu düşünce kağanın kendisinin Tanrı olduğu veya her kurala aykırı davranabileceği anlamına gelmez. Töre, toplumsal ve siyasi düzeni kuran bağlayıcı kurallar bütünüdür. Kaynaklarda kağanın halkı koruma, düzeni sürdürme ve töreye uyma görevleri birlikte anlatılır.",
          "Kurultay veya toy, siyasi ve askerî konuların görüşüldüğü bir kurumdur; katılımı ve işleyişi dönemine göre incelenir. Hatunun temsil ve diplomasi görevleri bulunabilir. Bu örnekler yönetimin yalnız tek kişiden oluşmadığını gösterir; modern genel oy ve bütün hak alanlarında tam eşitlik için ayrı kanıt gerekir. Meşruiyet, danışma, uygulama ve yönetici sorumluluğu aynı sorunun farklı boyutlarıdır.",
        ],
      },
      {
        title: "İkili idare ve askeri örgütlenme",
        paragraphs: [
          "İkili teşkilat, geniş sahada yönetimin doğu ve batı kesimleri arasında paylaşılmasıyla ilişkilidir. Doğuda kağan, batıda çoğu örnekte kağana bağlı bir hanedan üyesi görev yapar. Yabgu, şad ve tigin gibi unvanların görev ve bağlamı farklıdır. Yerel hareket alanı bulunmasıyla tamamen bağımsız bir devletin varlığı birbirinden ayrılmalıdır.",
          "Onlu askerî düzen, birliklerin on, yüz, bin ve on bin gibi kademelerle örgütlenmesidir. Mete Han bu düzenin ders anlatımındaki önemli adıdır. Komuta, eğitim ve eşgüdüm, atlı hareket ve okçuluk becerileriyle birlikte düşünülür. Bir teşkilatın bulunması bütün askerlerin aynı silahı taşıdığını veya her savaşın kesin kazanıldığını göstermez; arazi, ikmal ve rakibin davranışı da önemlidir.",
        ],
      },
      {
        title: "Devletleri tarih ve belgeyle ayır",
        paragraphs: [
          "Hun, Kök Türk ve Uygur adları aynı kesintisiz devletin farklı isimleri değildir. Asya Hun bağlamında Mete Han’ın MÖ 209’da yönetimi alması; I. Kök Türk için 552 ve Bumin; II. Kök Türk için 682 ve Kutluk/İlteriş; Uygur Kağanlığı için 744 ayırt edici eşleştirmelerdir. Tarihle birlikte kişi ve olay türünü yazmak, benzer unvanları karıştırmayı azaltır.",
          "Orhun yazıtları II. Kök Türk döneminin VIII. yüzyıl siyasi dünyası için önemli kaynaklardır. Bilge Kağan, Kül Tigin ve Tonyukuk çevresindeki metinler yönetim, halk ve devlet sorumluluğunu anlatır. Bir yazıt döneme ait doğrudan kanıt taşıyabilir; onu yazdıranların kendilerini nasıl sunduğu da incelenir. Devletin siyasi sonu ile topluluğun, dilin ve kültürel üretimin sonu aynı tarih olmak zorunda değildir.",
        ],
      },
      {
        title: "Uygurlarda değişimi tek nedene bağlama",
        paragraphs: [
          "Uygur çevrelerinde şehir, sulama, tarım, ticaret, yazı ve sanat faaliyetleri belirginleşmiştir. Bögü Kağan dönemindeki Maniheizm politikası bu değişimlerin dinî boyutuyla ilişkilidir. Şehirleşmeyi yalnız tek bir din kararından türetmek yerine üretim, güzergâhlar, komşular ve yerel kurumlarla birlikte incelemek daha açıklayıcıdır.",
          "Uygurlardan önce de Türk topluluklarında tarım ve yerleşme izleri bulunabilir. 840’ta Kırgız müdahalesiyle bozkır merkezli kağanlığın gücünü kaybetmesi, bütün Uygur topluluklarının ortadan kalkması değildir. Turfan ve Kansu gibi çevrelerde kültürel ve ekonomik hayat sürmüştür. Değişimin hızını değerlendirirken bir hükümdarın tercihini, bir şehirdeki uygulamayı ve bütün toplulukları aynı kapsamda kullanma.",
        ],
      },
      {
        title: "Göç ve komşuluk ağları",
        paragraphs: [
          "Göç, nüfusun yer değiştirmesidir; mevsimlik otlak hareketiyle yeni bir bölgeye uzun süreli yerleşme aynı tür göç değildir. Geçim baskısı, iklim olayları, boy mücadeleleri, dış baskılar ve yeni yurt arayışı birlikte etkili olabilir. At ve taşınabilir barınaklar hareketi kolaylaştıran araçlardır; her hareketin tek nedeni değildir.",
          "Kavimler Göçü için 375 okul kronolojisinde bir dönüm noktasıdır; uzun sürece yayılan çoklu hareketleri tek güne indirgemez. Avrupa Hunları Roma ile savaşın yanında antlaşma ve ticaret ilişkileri de kurmuştur. Çin, Sasani, Bizans ve Soğd çevreleriyle ilişkilerde siyasi amaç ve ekonomik ihtiyaç birlikte görülür. Aynı taraflar bir dönemde iş birliği, başka bir konuda rekabet içinde olabilir.",
        ],
      },
      {
        title: "Ad, coğrafya ve maddi kültür ayrı kanıt ister",
        paragraphs: [
          "Türk adı farklı dönemlerin kaynaklarında farklı açıklamalarla ele alınmıştır. Dil, kültür, siyasi birlik ve coğrafi ad aynı değişken değildir. Türkiye adının tarihsel bir metinde kullanılması da doğrudan bugünkü ülke sınırlarını anlatmaz. Adlandırmanın kim tarafından, hangi yüzyılda ve hangi alan için yapıldığı araştırılır.",
          "Anav, Aşkabat çevresindeki tarım ve yerleşme buluntularıyla; Afanesyevo, Altay–Sayan çevresinin erken bozkır buluntularıyla öğrenilir. Andronova, Güney Sibirya ve çevresinde geniş bir maddi kültür alanını; Karasuk, Güney Sibirya’da demir kullanımına ilişkin buluntuları; Tagar, Yenisey çevresindeki maden işçiliği ve hayvan üslubu örneklerini karşılaştırmaya yardım eder. Hayvan üslubu, hayvan tasvirleriyle bezeme anlayışıdır. Bu coğrafya–buluntu bağları ilk icat veya kesin etnik kimlik hükmü değildir. Yaklaşık tarihler örtüşebilir ve yeni buluntularla değişebilir; ortak bir alet veya bezeme bütün halkın dilini ya da tek siyasi devletin varlığını tek başına belirlemez.",
        ],
      },
      {
        title: "Oguş, urug, boy, budun ve il",
        paragraphs: [
          "Ders şemasında oguş aileyi, urug aileler birliğini, boy siyasi-toplumsal birliği, budun daha geniş boylar topluluğunu ve il devleti anlatır. Bu terimler farklı örgütlenme düzeylerini ayırt etmeye yardım eder. Şema, bütün toplulukların aynı tarihte kesintisiz aynı basamaklardan geçmesini gerektiren bir gelişme yasası değildir.",
          "Boyların kendi beyleri, askerî kaynakları ve yerel ilişkileri bulunabilir. Birlik kurmaları ortak savunma ve daha geniş siyasi hareket alanı sağlar. Güçlü boyların ayrılması da merkezî düzeni zorlayabilir. Bu yüzden devletin güçlenmesi yalnız hükümdarın kişisel özellikleriyle açıklanmaz; boylarla kurulan ilişki, gelir ve yönetim düzeni birlikte değerlendirilir.",
        ],
      },
      {
        title: "Kut ile ülüşü işlevlerinden ayır",
        paragraphs: [
          "Kut yönetme yetkisinin meşruiyet kaynağını, ülüş ise paylaştırma ve kaynak paylaşımını anlatan bir kavramdır. İkisi aynı toplumda birlikte bulunabilir; aynı kavram değillerdir. Bir metin hükümdarın neden yönetmeye hak sahibi sayıldığını anlatıyorsa kut, gelir ve ürünün nasıl bölüşüldüğünü anlatıyorsa ülüş boyutu araştırılır.",
          "Hanedan üyelerinin yönetimde hak iddia etmesi veraset mücadelelerine zemin oluşturabilir. Buradan her devlette kesin bir ilk oğul kuralı veya aynı anda bütün hanedan üyelerinin eşit fiilî gücü bulunduğu çıkarılmaz. İnanç olarak kabul edilen yönetme hakkıyla onu kullanabilecek askerî ve siyasi destek farklıdır. Hak iddiası, destek ve fiilî yönetim ayrı kanıtlarla gösterilir.",
        ],
      },
      {
        title: "Görüşme, karar ve uygulama kurumları",
        paragraphs: [
          "Kurultayda görüşülen siyasi kararın uygulanması için görevliler ve kaynak gerekir. Ayukı yönetim veya hükümet, buyruk görevliler, aygucı baş görevli bağlamında kullanılır. Terimleri yalnız bugünkü kurum adlarına çevirip bütün çağdaş yetkileri geçmişe taşımak yerine hangi işi yaptıklarını araştır.",
          "Hatunun elçilik kabulü veya temsil görevinde bulunması, belirli bir siyasi rolü gösterir. Unvan, görev ve kişi aynı şey değildir; bir kişi birden fazla görev de üstlenebilir. Bir kaynak yalnız bir toplantıdan söz ediyorsa bundan her halk kesiminin katılım oranı hesaplanamaz. Etkinlikte farklı kaynakları birlikte seçmek, görüşme ile uygulamanın kanıtlarını ayrı görmeyi sağlar.",
        ],
      },
      {
        title: "Törede süreklilik ve yenilenme",
        paragraphs: [
          "Töre gelenek, toplumsal değerler ve yönetim kararlarıyla gelişen bir düzendir. Yazılı bir kanun kitabının bulunmaması toplumda hukuk olmadığını göstermez. Kuralların halkla birlikte kağana da uygulanmasının beklenmesi, yönetici sorumluluğunun önemli bir göstergesidir. Bu bağlayıcılık kendi tarihsel kurumları içinde incelenir.",
          "Bir düzenin eskiye dayanması, içeriğinin hiç yenilenemeyeceği anlamına gelmez. Kağan ve kurultay kararları yeni şartlara cevap verebilir. İnanç ve ritüelde de kavramların işlevi ayrılır: kam dinî-ritüel uzmanı, yuğ cenaze törenini, kurgan mezar yapısını, balbal ise anma ve mezar çevresi taşlarını anlatır. Bunlar aynı nesne veya görevin dört adı değildir. Mezar eşyası ölüm sonrası tasavvura ilişkin yorum sağlayabilir; tek buluntu bütün halkın tek ve değişmez inancını kanıtlamaz. Töreye bağlılık da modern anayasal düzenin bütün kurumlarının varlığını kendiliğinden göstermez.",
        ],
      },
      {
        title: "Yazıtı tarihsel ses olarak oku",
        paragraphs: [
          "Orhun yazıtları siyasi olaylar, halka öğütler ve yönetim sorumluluğu hakkında bilgi sunar. Bunlar belirli yöneticilerin kendilerini ve geçmişi nasıl anlattığını da gösterir. Yenisey yazıtları da kişi, boy ve halk adlarıyla anlatılan işlere ilişkin kaynaklar sunar; bütün yazıtları tek bir hükümdar metni sayma. Bir başarı ifadesi hem anlatılan olaya hem de yönetimin öne çıkarmak istediği ideale ilişkin kaynak olabilir.",
          "Doğrudan dönem kaynağı, eleştiriden bağımsız kaynak demek değildir. Yazdıran, amaç, hitap edilen topluluk ve başka belgelerle uyum araştırılır. Bir hükümdarın halkı refaha kavuşturduğunu söylemesiyle bütün hanelerin gelirinin ölçülmüş olması farklı iddialardır. Sözleşme, başka tanıklık ve maddi buluntu gibi kaynaklar aynı soruya farklı açılardan katkı sağlayabilir.",
        ],
      },
      {
        title: "Asya Hunları ve Mete bağlamı",
        paragraphs: [
          "Asya Hunları, bozkırdaki boy birliklerini ve komşularla ilişkileri anlamada önemli bir örnektir. Mete Han’ın MÖ 209’da yönetimi alması, onlu teşkilat ve geniş siyasi birlik kurma bağlamıyla birlikte öğrenilir. MÖ tarihler sıralanırken sayı büyüdükçe daha eski tarihe gidildiği unutulmamalıdır.",
          "Askerî örgütlenme, boy desteği ve Çin’le kurulan ticari-siyasi ilişkiler birbirinden ayrılmaz. Komşu ürünlerine erişim, sınır pazarı ve diplomatik düzenlemeler savaşın yanında incelenir. Bir hükümdarın güçlü olması devletin sonraki bütün dönemlerinin aynı koşullarda geçtiğini göstermez. Hanedan içi mücadeleler ve dış baskılar ayrı dönemlerde farklı sonuçlar doğurabilir.",
        ],
      },
      {
        title: "I. Kök Türk: kuruluş ile dış siyaseti bağla",
        paragraphs: [
          "552’de Bumin Kağan’la ilişkilendirilen I. Kök Türk Devleti, Türk adının devlet adı olarak kullanılmasıyla ayırt edilir. Batı siyasetinde İstemi’nin rolü, yönetim paylaşımının dış ilişkilerdeki önemini gösterir. Aynı devletin farklı bölgeleri farklı komşularla doğrudan ilişki kurabilir.",
          "Kök Türklerin Sasanilerle Ak Hunlara karşı iş birliği yapması ve daha sonra Bizans’a yönelen diplomasi, ittifakın belirli amaçlara bağlı olduğunu gösterir. Ticaret engelleri ve İpek Yolu denetimi bu ilişkilerin ekonomik boyutudur. Ortak bir rakibe karşı birleşmek, tarafların bütün çıkarlarının ve inançlarının aynı olması veya ittifakın sonsuza kadar sürmesi demek değildir.",
        ],
      },
      {
        title: "II. Kök Türk: yeniden örgütlenme ve kaynaklar",
        paragraphs: [
          "682’de Kutluk/İlteriş Kağan’la yeniden bağımsız siyasi örgütlenme kurulması, I. Kök Türk kuruluşundan ayrı bir gelişmedir. Tonyukuk, Kapgan, Bilge Kağan ve Kül Tigin bu dönemin farklı görev ve kişileri olarak öğrenilir. Aynı unvanı veya bir adın benzer parçasını görmek kişilerin aynı olduğunu kanıtlamaz.",
          "VIII. yüzyıldaki yazıtlar bu dönemin siyasi düzeni için önemli bir pencere açar. Yazıtın dikildiği tarih, sonraki bir kopyasının üretildiği tarih ve modern araştırmada okunduğu tarih ayrı aşamalardır. Belgenin bugün bir kitapta bulunması, onun anlattığı olayın da kitabın basıldığı döneme ait olduğu anlamına gelmez. Kaynağın üretim ve aktarım zinciri açıkça kurulmalıdır.",
        ],
      },
      {
        title: "Uygur şehirleri, üretim ve yazı",
        paragraphs: [
          "Uygur çevrelerinde sulama, tarım, konut, ticaret ve yazılı işlemler şehirli hayatın farklı boyutlarını gösterir. Bir borç veya satış belgesi ekonomik ilişkiyi, bir sanat eseri üretim ve inanç dünyasını, bir kanal ise su yönetimi ve tarımı incelemeye yardım edebilir. Her kaynak aynı soruya aynı güçte cevap vermez.",
          "Bögü Kağan’ın Maniheizm politikasıyla kültürel değişimler arasında ilişki kurulabilir; fakat bütün halkın aynı anda aynı uygulamaya geçtiği varsayılmaz. Yerleşik hayat savaşın, hayvancılığın veya hareketliliğin bütünüyle bittiği anlamına da gelmez. 840 sonrasındaki yeni merkezlerde süren faaliyetler, siyasi kopuşla kültürel devamın birlikte bulunabileceğini gösterir.",
        ],
      },
      {
        title: "Göçün itici etkeni ile aracı",
        paragraphs: [
          "Otlak azalması, kuraklık, ağır kış, siyasi çatışma ve dış baskı bir topluluğun yer değiştirmesinde itici etken olabilir. Yeni yurt ve ticaret alanı arayışı çekici etkenler arasındadır. At, araba ve taşınabilir çadır ise hareketin nasıl mümkün olduğunu açıklayan araçlardır. Neden ile araç aynı sorunun cevabı değildir.",
          "Mevsimlik dönüşün sürdüğü bir yaylak-kışlak düzeniyle ana yurttan kalıcı ayrılmayı ayırmak için süre, amaç ve geri dönüş bilgisi kullanılır. Bir bölgede gözlenen hareket bütün Türk topluluklarının aynı anda göç ettiğini göstermez. Aynı göçte de her ailenin aynı nedenle hareket etmiş olması gerekmez; tarihsel açıklama ortak koşulları ve yerel farklılıkları birlikte taşıyabilir.",
        ],
      },
      {
        title: "Kavimler Göçü ve Avrupa Hunları",
        paragraphs: [
          "IV. yüzyılın büyük nüfus hareketlerinde Hunların batıya yönelmesi, Karadeniz kuzeyindeki topluluklar ve Roma sınırları birlikte düşünülür. 375 geleneksel dönüm noktasıdır; 395 Roma’nın ayrılması ve 476 Batı Roma’nın siyasi sonuyla aynı olay değildir. Göç baskısı bu dönüşümlerle ilişkilidir, fakat tek ve yeterli açıklama olarak kullanılmaz.",
          "Avrupa Hunlarında Uldız ve Attila’nın dönemleri farklı siyasi koşullar taşır. Antlaşmaların vergi, sınır ticareti ve güvenlik hükümleri, ilişkilerin yalnız askerî çatışmadan oluşmadığını gösterir. Bir hükümdarın belirli bir dönemde izlediği siyaseti bütün Hun tarihine değişmeden yayma. Devletin dağılması da onun kültürel ve siyasi etkilerinin aynı anda yok olması anlamına gelmez.",
        ],
      },
      {
        title: "Diğer toplulukları ayırt edici bağlamla öğren",
        paragraphs: [
          "Hazarlar İdil ve Kuzey Kafkasya ticaret çevreleriyle; Karluklar Talas’taki destekleriyle; Türgişler Maveraünnehir’de Emevi ilerleyişine karşı mücadeleleriyle düşünülür. Avarlar Orta Avrupa, Kıpçaklar Karadeniz kuzeyi, Oğuzlar Seyhun ve sonraki farklı siyasi oluşumlarla ilişkilendirilir. Bunlar tek bir devletin aynı tarihteki bütün illeri değildir.",
          "Yönetici çevrenin diniyle bütün nüfusun dini ayrı kanıt ister. Hazar sahasında farklı inanç topluluklarının bulunması veya İdil ve Tuna Bulgarlarının farklı tarihsel yolları bu ayrımı gösterir. Bir topluluğun başka bir toplulukla temas etmesi, dillerinin veya siyasi kimliklerinin aynı olmasını gerektirmez. Coğrafya, dönem, dil, din ve siyasi yapı için bilgileri ayrı sütunlarda tutmak karışıklığı azaltır.",
        ],
      },
      {
        title: "Çoklu kaynakla alternatif açıklamayı karşılaştır",
        paragraphs: [
          "Bir yazıt, sözleşme ve maddi buluntu birlikte kullanıldığında yönetimin söylemiyle yerel uygulamalar karşılaştırılabilir. Her belgeyi kendi sorusuna bağla: yönetici hangi görevi öne çıkarıyor, işlem hangi üretim veya alışverişi gösteriyor, buluntu hangi yerde hangi döneme ait? Üç kaydın aynı şeyi söylemesi kadar farklı ayrıntılar vermesi de tarihsel açıklama için değerlidir.",
          "Etkinlikte seçilen kanıtların değişmesi bazı çıkarımları güçlendirebilir, bazılarını ise henüz açık bırakır. Bir yerel tarım kaydından bütün halkın yerleşik olduğu; bir dinî simgeden bütün topluluğun aynı inancı benimsediği sonucu çıkarılmaz. Alternatif yorumu sınamak için hangi yeni belge gerektiğini söyle. Kanıt yokluğunu olayın kesinlikle yaşanmadığıyla, yönetici iddiasını da gerçekleşmiş sonucun ölçümüyle eşitleme.",
        ],
      },
    ],
    examples: [
      {
        title: "Nesnenin tarihi ile yayının tarihi",
        prompt:
          "Özgün katalog çalışması: Bir Orhun yazıtı VIII. yüzyıla ait tarihsel nesne olarak tanıtılıyor. Katalogdaki fotoğraf 2014’te çekilmiş, metin aktarımı 2021’de basılmış. Araştırmacı, fotoğraftan hareketle anlatılan yönetimin 2021’de yaşadığını söylüyor. Tarih katmanlarını ayırarak bu cümleyi düzelt.",
        strategy: "Nesne, fotoğraf ve yayın için ayrı zaman alanı aç.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "VIII. yüzyıl tarihsel yazıtın dönemidir. 2014 fotoğrafın üretildiği, 2021 ise modern aktarımın basıldığı tarihtir.",
          },
          {
            label: "2. adım",
            explanation:
              "Görüntü ve yayın daha eski bir kaynağı bugüne aktarır; olayın dönemini değiştirmez.",
          },
          {
            label: "3. adım",
            explanation:
              "Düzeltilmiş ifade, modern yayının VIII. yüzyıla ait siyasi anlatıyı aktardığını söyler; metnin yazdıranlarının amacı ayrıca incelenir.",
          },
        ],
        answer: "Tarihsel nesne ve modern aktarım üç farklı zamana aittir.",
        check:
          "Düzeltilen yorum katalogdaki hiçbir tarihi silmez; her birine doğru işlevi verir.",
        pitfall:
          "Kaynağı okuduğun veya fotoğrafladığın tarihi kaynakta anlatılan olayın tarihi sayma.",
      },
      {
        title: "Yaklaşık kültür aralıklarını yorumla",
        prompt:
          "Bir öğretim tablosu Afanesyevo için yaklaşık MÖ 2500–1700, Andronova için yaklaşık MÖ 1700–1200 aralığını veriyor. Öğrenci “MÖ 1700’de bir halk tamamen yok olup başka halk aynı gün geldi” diyor. Tablo bunu kanıtlar mı?",
        strategy:
          "Yaklaşık dönemleme ile insanların kesin hareket tarihini ayır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Tablodaki ortak sınır MÖ 1700’dür; MÖ 2500 daha eski, MÖ 1200 daha yeni tarihtir.",
          },
          {
            label: "2. adım",
            explanation:
              "Bunlar maddi kültür çevreleri için yaklaşık aralıklardır; belirli bir gün ve bütün nüfusun değişimi verilmemiştir.",
          },
          {
            label: "3. adım",
            explanation:
              "Yeni tarihleme, yerleşim sürekliliği ve buluntu dağılımı gibi ek veriler gerekir; yalnız sınır sayısından etnik değişim sonucu kurulamaz.",
          },
        ],
        answer:
          "Hayır; tablo yaklaşık kültür dönemlemesi sağlar, tek günlü nüfus değişimi kanıtı değildir.",
        check:
          "İddiadaki “tamamen” ve “aynı gün” bilgilerinin hiçbirinin tabloda bulunmadığını denetle.",
        pitfall:
          "Kültür adını doğrudan tek ve değişmez etnik nüfusla eşitleme.",
      },
      {
        title: "Ayrı askerî gruplarda sayımı koru",
        prompt:
          "Tamamı kurmaca bir talim listesinde birbirinden ayrı 2 tümen, 4 binlik, 3 yüzlük ve 6 onluk grup vardır. Tümen 10.000 kişidir; diğer adlar sırasıyla 1000,100 ve 10 kişilik gruptur. Listelenen toplamı bul ve bu sayının bütün devlet nüfusunu verip vermediğini açıkla.",
        strategy:
          "Grupların birbirinden ayrı olduğu koşulunu kullan; aynı kişiyi iki kademede sayma.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İki tümen 20.000, dört binlik 4.000, üç yüzlük 300 ve altı onluk 60 kişidir.",
          },
          {
            label: "2. adım",
            explanation:
              "Ayrı gruplar olduğu için 20.000+4.000+300+60=24.360 kişi bulunur.",
          },
          {
            label: "3. adım",
            explanation:
              "Liste yalnız bu talime ayrılan grupları kapsar; devletin bütün askerlerini veya nüfusunu verdiği söylenmemiştir.",
          },
        ],
        answer: "Listede 24.360 kişi vardır; bütün nüfus belirlenemez.",
        check:
          "Alt gruplar tümenlerin içindeki kişiler olsaydı yeniden toplamak çift sayım olurdu; soru bunları ayrı gruplar diye tanımlamıştır.",
        pitfall:
          "Teşkilat kademesiyle sayım kapsamını veya toplam halkı aynı şey sayma.",
      },
      {
        title: "İttifak açıklamasına yeni kanıt seç",
        prompt:
          "Özgün kaynak karşılaştırması: Bir kısa anlatı iki gücün ortak rakibe karşı birleştiğini, bir ticaret notu daha sonra ortaklardan birinin geçişi kısıtladığını bildiriyor. Araştırmacı yeni diplomatik arayışın ticaret engeliyle ilişkisini sınamak istiyor. Hangi tür ek kayıt en doğrudan yardım eder?",
        strategy: "Sınanacak açıklamanın ara mekanizmasını açıkça yaz.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İlk anlatı başlangıçtaki ortak rakibi, ikinci not ise sonraki ticari sorunu gösterir. Bunlar aynı aşama değildir.",
          },
          {
            label: "2. adım",
            explanation:
              "Ticaret engeliyle yeni arayış arasındaki bağı güçlendirmek için elçinin görevi, tüccar talebi veya geçiş engelinden söz eden tarihli bir yazışma aranabilir.",
          },
          {
            label: "3. adım",
            explanation:
              "Yalnız iki hükümdarın benzer kıyafetini gösteren resim bu belirli mekanizmayı aynı doğrudanlıkta sınamaz.",
          },
        ],
        answer:
          "Görev ve zaman bilgisiyle ticari engeli ilişkilendiren diplomatik veya tüccar kaydı daha doğrudan kanıttır.",
        check:
          "Seçilen ek kaynak açıklamadaki “engel→yeni ilişki arayışı” bağını gerçekten karşılamalıdır.",
        pitfall:
          "Sadece olayların art arda gelmesini amaç ve mekanizma kanıtı sayma.",
      },
      {
        title: "Benzer nesneden aktarım yönüne",
        prompt:
          "Kurmaca iki kazı kaydında X alanındaki at donanımı yaklaşık VIII. yüzyıla, Y alanındaki benzer donanım yaklaşık VIII–IX. yüzyıllara tarihleniyor. X’ten Y’ye kesin aktarım olduğunu söylemek için bu iki benzerlik yeterli mi?",
        strategy: "Benzerlik, zaman aralığı ve temas kanıtını ayrı sına.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Buluntuların benzerliği teknik karşılaştırma sağlar. Tarih aralıkları ise VIII. yüzyılda örtüşebilir.",
          },
          {
            label: "2. adım",
            explanation:
              "Kesin aktarım yönü için daha ayrıntılı tarihleme, üretim izi, malzeme kaynağı veya bağlantıyı gösteren ek bulgu gerekir.",
          },
          {
            label: "3. adım",
            explanation:
              "İki alanın aynı siyasi devlet veya aynı dili konuşan topluluk olduğu da yalnız donanımdan belirlenemez.",
          },
        ],
        answer:
          "Kesin yön belirlenemez; benzerlik ve olası eşzamanlılık, tek yönlü aktarımın tamamı değildir.",
        check:
          "Sonuç benzerliği reddetmez; yalnız aktarım yönünü kanıtlanandan ileri götürmez.",
        pitfall:
          "Benzer alet görür görmez ilk üreticiyi, dili ve siyasi birliği aynı anda kesinleştirme.",
      },
      {
        title: "Söylem ile yerel uygulamanın farklı soruları",
        prompt:
          "Özgün öğretim modelinde bir yönetici anlatısı “halkın geçimini koruma görevini” öne çıkarıyor. Aynı dönemin iki yerel işlem kaydı bir sulama hakkının paylaşımını ve bir sürü satışını düzenliyor. Bu belgeler, yöneticinin görevi ile ekonomideki faaliyetler hakkında birlikte ne söyler?",
        strategy: "Her belgenin doğrudan söylediğini farklı satıra yaz.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Yönetici anlatısı iktidarın hangi sorumluluğu vurguladığını gösterir; herkesin refahına ilişkin tam bir ölçüm değildir.",
          },
          {
            label: "2. adım",
            explanation:
              "Sulama işlemi yerel su ve üretim düzenine, sürü satışı hayvancılıkla alışverişe kanıt sunar.",
          },
          {
            label: "3. adım",
            explanation:
              "Üç kayıt bir arada yönetim söylemiyle farklı ekonomik işlemleri karşılaştırmaya yarar; bütün halkın tek geçim biçimi olduğu sonucunu vermez.",
          },
        ],
        answer:
          "Yönetim sorumluluğu söylemi ile yerel tarım/hayvancılık işlemleri birlikte incelenebilir.",
        check:
          "Her sonuç için onu destekleyen ayrı kayıt gösterilir; hiçbir kayıt bütün nüfus hakkında ölçülmemiş oran üretmez.",
        pitfall:
          "Bir hükümdarın göreve ilişkin ifadesini her hanede gerçekleşmiş sonuçla eşitleme.",
      },
    ],
    recall: [
      {
        prompt: "Konargöçerlik ile kalıcı göçü hangi iki veriden ayırırsın?",
        answer:
          "Mevsimlik geri dönüş ve otlak düzeni ile başka yurtta uzun süre kalma bilgisi ayırt edicidir; amaç ve süre de incelenir.",
      },
      {
        prompt: "Kut ve ülüş aynı soruya mı cevap verir?",
        answer:
          "Hayır. Kut yönetme hakkının meşruiyetini, ülüş kaynak ve pay dağıtımını anlatır.",
      },
      {
        prompt: "Ayukı ile kurultayı ayırırken hangi fiillere bakarsın?",
        answer:
          "Görüşme ve karar ile uygulama ve yürütme fiillerine; bugünkü kurumların bütün yetkileri otomatik aktarılmaz.",
      },
      {
        prompt: "Bir kültür çevresindeki buluntu tek başına neyi belirlemez?",
        answer:
          "Bütün halkın dilini, kesin etnik kimliğini ve siyasi birliğini; bunlar ayrı kanıt ister.",
      },
      {
        prompt:
          "Bir siyasi merkez yıkıldığında kültürün durumu nasıl araştırılır?",
        answer:
          "Başka bölgelerdeki yerleşim, belge, üretim ve sanat faaliyetlerine bakılarak siyasi son ile kültürel devam ayrı incelenir.",
      },
      {
        prompt: "Yazıt ve yerel işlem kaydı aynı soruyu mu cevaplar?",
        answer:
          "Her zaman değil. Yazıt yönetimin sesini ve sorumluluk iddiasını, yerel kayıt belirli bir işlemin koşullarını gösterebilir.",
      },
    ],
    source:
      "MEB Tarih 9 ve 10 ders kitaplarının ilgili üniteleri, OGM Dersler Cepte ve kaynakları karşılaştırılan Aurelia konu kâğıtları temelinde hazırlanmış özgün anlatım. Etkinliklerdeki kurmaca kayıtlar öğretim içindir; gerçek belge alıntısı veya resmî sınav sorusu değildir.",
  },
  {
    id: "islam-medeniyetinin-dogusu",
    minutes: 125,
    objectives: [
      "İslamiyet’in doğduğu çevreyi, Medine’de örgütlenmeyi ve siyasi dönemleri temel kavramlarla açıklamak.",
      "Fetih, idari kurum, hanedan değişimi ve bilimsel-kültürel üretimi ayrı kanıtlarla ilişkilendirmek.",
      "Eşzamanlı siyasi merkezler ve farklı topluluklar hakkında kapsamı sınırlı tarihsel çıkarımlar kurmak.",
    ],
    sections: [
      {
        title: "VII. yüzyılın zeminini kur",
        paragraphs: [
          "VII. yüzyıl Arabistan’ı farklı kabileler, geçim biçimleri ve inanç toplulukları içeriyordu. Hicaz bölgesindeki Mekke ve Yesrib, yani Medine, bu ünitede önemli merkezlerdir. Mekke’nin Kâbe çevresindeki dinî önemi ticaret ve panayırlarla birlikte düşünülür. Kabile dayanışması, bütün yarımadayı yöneten tek merkezî devletin varlığıyla aynı şey değildir.",
          "Bedevi göçebe, hadari yerleşik yaşam bağlamında kullanılan terimlerdir. Cahiliye ise İslamî tarih anlatımında İslamiyet öncesi döneme ilişkin bir adlandırmadır; insanların hiç bilgi, şiir veya ticaret üretmediğini söylemez. Yakın çevredeki Bizans ve Sasani güçleri siyasi zemini etkiler. Bir dinin doğuşu ve yayılmasını yalnız bu devletlerin durumuna veya yalnız bir ekonomik etkene bağlamak yerine çoklu koşulları birlikte incele.",
        ],
      },
      {
        title: "Hicretin öncesi ve sonrası",
        paragraphs: [
          "610, ilk vahiy ve tebliğin başlangıcıyla; 622, Mekke’den Medine’ye hicretle ilişkilendirilir. Mekke’deki baskılar güvenlik ve inanç sorunlarını içerirken mevcut toplumsal ve ekonomik düzenin değişmesi kaygısı da önemlidir. Akabe görüşmeleri Medine’yle ilişkileri güçlendirmiştir. 615’teki Habeşistan göçü, hedef yeri ve bağlamı farklı olan ayrı bir gelişmedir.",
          "Hicret sonrasında muhacir-ensar dayanışması, ortak savunma ve farklı grupların ilişkilerini düzenleyen girişimler görülür. Muhacir Mekke’den gelen Müslümanları, ensar onlara yardım eden Medineli Müslümanları anlatır. Medine Sözleşmesi ortak düzen kurma bağlamındadır; bütün tarafların aynı inanca geçtiğini göstermez. Hicretin takvime başlangıç olayı olmasıyla takvimin Hz. Ömer döneminde idari olarak düzenlenmesi ayrı aşamalardır.",
        ],
      },
      {
        title: "Savaş kadar diplomasiye de bak",
        paragraphs: [
          "624 Bedir, 625 Uhud ve 627 Hendek askerî koşulları farklı gelişmelerdir. 628 Hudeybiye ise antlaşma ve siyasi muhataplık bakımından değerlendirilir. 630’da Mekke’nin alınması ayrı bir olaydır. Olayın tarihini, taraflarını, türünü ve sonucunu dört ayrı alan olarak yazmak antlaşmayı fetihle, savunmayı başka seferlerle karıştırmayı azaltır.",
          "Diplomatik bir düzenleme bazı hükümleriyle bir tarafı sınırlarken iletişim ve barış ortamı bakımından yeni imkânlar doğurabilir. Kısa vadeli hükümle sonraki etki aynı ölçüt değildir. Hayber ve Mute gibi başka gelişmeler de kendi yer ve rakipleriyle incelenir. Seferlerin ders terminolojisinde Hz. Muhammed’in katılımına göre gazve ve seriyye diye ayrılması, her seferin aynı sonuçla bittiği anlamına gelmez.",
        ],
      },
      {
        title: "Dört Halife: kişiyi kurumla eşleştir",
        paragraphs: [
          "632’de Hz. Muhammed’in vefatından sonra Dört Halife dönemi başlar. Hz. Ebu Bekir döneminde birliğin korunması ve Kur’an’ın derlenmesi; Hz. Ömer döneminde genişleyen sahaların yönetimi ve idari düzen; Hz. Osman döneminde donanma ile nüshaların çoğaltılması; Hz. Ali döneminde iç mücadeleler öne çıkan bağlantılardır. Aynı konu içinde benzer adlar geçmesi bütün işlemleri tek kişiye ait kılmaz.",
          "Beytülmal kamu hazinesi, kadı yargı görevlisi, divan ise bağlama göre kayıt ve yönetim düzenidir. Genişleyen coğrafyada vergi, asker ve uyuşmazlık işlerinin artması bu kurumların önemini açıklar. Dört halifenin yönetime geliş ayrıntıları aynı değildir; modern bütün yurttaşların eşit oyuyla genel seçim düşüncesi döneme doğrudan taşınmaz. Kişiyle birlikte işlevi öğrenmek tarih ezberini kurumsal anlamla bağlar.",
        ],
      },
      {
        title: "Hanedan, merkez ve toplumu ayrı izle",
        paragraphs: [
          "661–750 Şam Emevileriyle, 750 sonrasındaki Abbasi iktidarı farklı dönemlerdir. Emevi hanedanlaşması veliahtlıkla, Abbasiler ise Bağdat’ın zamanla yönetim ve kültür merkezi olmasıyla ayırt edilir. Bir siyasi iktidarın başladığı tarih ile daha sonra kurduğu veya merkez yaptığı şehrin tarihi ayrı olaydır. Halifenin adı, yönetim merkezi ve devletin bütün sınırı da aynı bilgi değildir.",
          "Mevali, bu konu bağlamında Arap olmayan Müslümanlar için kullanılır; her birinin hukuken köle olduğu veya gayrimüslim bulunduğu anlamına gelmez. Ayrımcı uygulamalar ile bunlara karşı tepkiler incelenirken yönetici, bölge ve zaman farklılıkları korunur. Abbasilerde İranlı ve Türk unsurların etkinliği artabilir; buradan resmî dilin otomatik değiştiği veya modern tam eşitliğin bütünüyle kurulduğu sonucu çıkarılmaz.",
        ],
      },
      {
        title: "Yayılma ile kültürel üretim farklı ölçeklerdir",
        paragraphs: [
          "Siyasi fetih, bir bölgenin yönetim denetiminin değişmesiyle ilgilidir. İnancın yayılması, insanların tercihleri ve toplumsal ilişkilerle farklı zamanlarda ilerler. Medeniyet ise kurum, bilgi, sanat ve günlük hayat birikimidir; tek bir hanedanın siyasi ömründen daha geniştir. Bu üç ölçeği birlikte incelemek, bir savaş tarihini bütün kültürel dönüşümün tek günü saymayı önler.",
          "Bağdat, Endülüs ve doğu merkezlerindeki çeviri, inceleme ve yeni eser üretimi bilgi ağlarının çok merkezli olduğunu gösterir. Tefsir, hadis, fıkıh ve kelamla matematik, tıp, astronomi ve felsefe farklı çalışma alanlarıdır. Bir bilgin birden fazla alanda çalışabilir. Ortak bir medeniyet çevresine katılmak, bütün şehirlerin aynı siyasi otoriteye veya bütün üreticilerin tek kökene sahip olmasını gerektirmez.",
        ],
      },
      {
        title: "Mekke’de dinî merkez ve ekonomik ilişkiler",
        paragraphs: [
          "Mekke’de dinî ziyaretler, kabileler arası ilişkiler ve ticaret bir arada bulunuyordu. Kâbe’nin önemiyle panayır ve mal dolaşımını birlikte düşünmek, dinî ve ekonomik alanların aynı çevrede etkileşebileceğini gösterir. Bununla birlikte bir kurumun farklı işlevler taşıması bütün toplumsal ilişkilerin yalnız ekonomik çıkarla açıklanacağı anlamına gelmez.",
          "İslamiyet’in ilk tebliğine yönelik tepkiler değerlendirilirken inanç, statü, kabile dayanışması ve mevcut düzenin değişmesi gibi boyutlar ayrılır. Bütün kişilerin aynı nedenle aynı tavrı aldığı varsayılmaz. Bir kaynağın belirli bir grubun davranışını anlatmasıyla bütün yarımada hakkında hüküm vermesi farklı kapsamlar taşır. Tarihsel aktörlerin gerekçesi, anlatan kaynağın konumu ve gözlenen uygulama birlikte incelenir.",
        ],
      },
      {
        title: "Göç, dayanışma ve ortak düzen",
        paragraphs: [
          "Muhacir ve ensar terimleri bu ünitedeki belirli grupları tanımlar. Kardeşlik ve yardımlaşma düzenlemeleri yeni gelenlerin barınma, geçim ve toplumsal ilişkilere katılma ihtiyaçlarıyla düşünülebilir. Hicret böylece yalnız kilometre cinsinden bir yer değişimi olarak kalmaz; yeni bir siyasi-toplumsal örgütlenmenin zeminidir.",
          "Medine’de farklı grupların ortak savunma ve birlikte yaşama yükümlülükleri, taraflar arasında bir düzen kurma girişimini gösterir. Ortak sözleşme her inanç ve kökenin aynılaşması değildir. Mescid-i Nebevi de ibadet yanında eğitim ve toplumsal ilişkilerin yürütülmesiyle incelenir. Bir kurumun birden fazla işlevi olması, bunların bugünkü tüm kurumlarla aynı örgütlenme içinde bulunduğu anlamına gelmez.",
        ],
      },
      {
        title: "Takvimin başlangıç olayı ve idari düzenlenmesi",
        paragraphs: [
          "Takvim, olayları ortak bir zaman sistemi içinde kaydetmeye yardım eder. Hicri takvimde hicret başlangıç kabul edilir; sistemin devlet işlerinde düzenli kullanımı Hz. Ömer dönemiyle ilişkilendirilir. Başlangıç seçilen olayın yılıyla bu seçimi kurumsallaştıran yönetimin dönemi birbirinden ayrılır.",
          "Farklı takvimlerdeki sayıların doğrudan karşılaştırılması doğru süre hesabı vermez. Bu rehberin zaman etkinliği açıkça MS yıllarını kullanır. Aynı yıl içinde birden fazla gelişme veya siyasi geçiş bulunabilir; yıl bilgisi gün ve ay ayrıntısının yerini tutmaz. Öğretim şeridinde yatay mesafe yıl farkına göre çizilir, siyasi dönemlerin farklı satırlarda bulunması ise eşzamanlılığı gösterir.",
        ],
      },
      {
        title: "Savaşın türü, amacı ve sonucu",
        paragraphs: [
          "Gazve ve seriyye, ders terminolojisinde Hz. Muhammed’in sefere katılımıyla ilgili bir ayrımdır. Seferin galibiyetle sonuçlanması, ticari etkisi veya katılanların kökeni bu adlandırmanın temel ölçütü değildir. Askerî bir gelişmede amaç, savunma aracı, komuta ve ortaya çıkan durum ayrı sorularla incelenir.",
          "Bir savaşın önemini söylemek bütün sonraki gelişmeleri yalnız o savaşla açıklamak değildir. Savunmanın başarısı başka bir şehrin aynı gün alındığını göstermez. Diplomatik antlaşma da savaş yapılmadan siyasi muhataplık ve iletişim ortamını etkileyebilir. Olay türleri ayrıldığında farklı araçların siyasi örgütlenmeye nasıl katkıda bulunduğu daha açık görülür.",
        ],
      },
      {
        title: "Halifelik ve hanedanlaşmanın farklı bağlamları",
        paragraphs: [
          "Halife, peygamber sonrası Müslüman topluluğun siyasi yönetim liderliği bağlamında kullanılan makamdır; yeni peygamber değildir. Yönetici belirleme usulleri ve siyasi güç dengeleri dönemler arasında değişir. Dört Halife döneminden Emevi hanedanlaşmasına geçiş, yönetimin aile içi aktarımı bakımından incelenebilir.",
          "Bir hükümdarın veliaht belirlemesi hangi aileden kimin hak iddia ettiğini anlamaya yardım eder. Bu veri tek başına bütün halkın katılım oranını veya yargı düzenini açıklamaz. Benzer biçimde yönetimde farklı kökenlerden görevliler bulunması da halifenin bütün siyasi yetkisinin bittiğini göstermez. Yetkinin kaynağı, paylaşılması ve devri ayrı kanıtlar gerektirir.",
        ],
      },
      {
        title: "Hazine, kayıt, yargı ve ordugâh",
        paragraphs: [
          "Beytülmal kamu gelir ve giderlerinin hazinesiyle; divan kayıt ve idari düzenlemeyle; kadılık yargı işleriyle ilişkilendirilir. Ordugâh şehir ise askerî birliklerin konaklama ve örgütlenme merkezi olarak düşünülür. Aynı büyüyen devlet bu ihtiyaçların hepsini birlikte taşıyabilir; kurumlar birbiriyle bağlantılı ama farklı işlevlidir.",
          "Bir gelir kaydı maliye, bir uyuşmazlık kararı yargı, bir asker listesi kayıt ve askerî örgütlenme hakkında bilgi sunabilir. Belgenin konusu kurumu bulmada yardımcıdır; ancak tek belgede birden fazla işlev de bulunabilir. Terimi cümlede yaptığı işle eşleştir. Devletin topraklarının büyümesiyle yönetim ihtiyacının artması arasında mekanizma kurulabilir; bütün kurumların tam bir fetih gününde kurulduğu varsayılmaz.",
        ],
      },
      {
        title: "Emevilerde idare, dil ve para düzenlemeleri",
        paragraphs: [
          "Emevi döneminde Şam merkezli yönetim ve hanedan aktarımı yanında idari düzenlemeler de önemlidir. Abdülmelik dönemindeki Arapçanın resmî idarede kullanımı ve para düzenlemeleri, merkezî kayıt ve temsil araçlarıyla ilişkilidir. Bir para üzerindeki yazı, yönetimin kendisini nasıl sunduğuna ilişkin kanıt olabilir.",
          "Uygulama farkını somut kişilerle de izle: MEB’in aktardığı örnekte Haccac, Müslüman olan mevaliden cizye almaya devam ederken Ömer bin Abdülaziz döneminde bu uygulama değiştirilir. Aynı hanedan başlığı bütün yöneticilerin her yerde değişmez tek uygulamasının kanıtı değildir. Bir paranın Arapça yazı taşıması, onu kullanan her kişinin ana dilinin aynı olduğunu kanıtlamaz. İdari dil, halkın konuştuğu diller ve bir eserin dili farklı ölçütlerdir. Bir göreve Arap olmayan kişinin atanması da dil kararı değildir. Düzenleme, uygulama ve toplumsal kullanım ayrı kaynaklarla araştırıldığında köken, din, dil ve yetki birbirine karıştırılmaz.",
        ],
      },
      {
        title: "Kerbela ve uzun süreli siyasi-dinî ayrışma",
        paragraphs: [
          "680 Kerbela, Hz. Hüseyin ve yanındakilerin öldürülmesiyle siyasi-dinî hafızada önemli bir dönüm noktasıdır. Öncesindeki Hz. Ali dönemi mücadeleleri ve sonraki yüzyıllardaki gelişmeler farklı aşamalardır. Bir olayın güçlü etkisi olması bütün mezhep ve kurumların tek gün içinde tamamlanmış biçimde ortaya çıktığını göstermez.",
          "Tarihsel inanç ve mezhep adları döneme ve kaynağın kullanımına göre incelenir. Aynı ad sonraki bir yüzyılda farklı örgütlenme ve yorum ayrıntıları taşıyabilir. Kaynakta kişiler arasındaki siyasi anlaşmazlık anlatılıyorsa bütün dinî öğretilerin tam içeriği oradan çıkarılamaz. Siyasi taraf, inanç yorumu ve kurumsallaşma için her seferinde hangi kanıtın verildiği gösterilmelidir.",
        ],
      },
      {
        title: "Endülüs’te siyasi süreklilik ve yeni yapılar",
        paragraphs: [
          "711’de Tarık bin Ziyad’ın İber yarımadasına geçişi, Şam Emevi dönemi genişlemesiyle ilişkilidir. Şam’daki yönetimin 750’de sona ermesi, Endülüs’teki bütün Müslüman siyasi varlığın da o tarihte bittiği anlamına gelmez. 756’da başlayan Endülüs Emevi emirliği, 929’da halifelik ilanı ve 1031’de halifeliğin sona ermesi farklı gelişmelerdir.",
          "732 Puvatya, İslam ordusunun Frank kuvvetleriyle karşılaştığı Avrupa sahasındaki askerî gelişmedir; 711’de İberya’ya geçişle aynı olay değildir. Kurtuba ve sonraki Gırnata çevreleri ortak kültürel ağlara katılırken farklı siyasi tarihler taşır. Beni Ahmer veya Nasriler Gırnata’yla, 1492 ise bu siyasi yapının sonuyla ilişkilidir. Ortak hanedan adı, şehirlerin aynı tarihte aynı olayları yaşadığını göstermez. Zaman etkinliğinde ayrı satırlar bu eşzamanlı veya ardışık siyasi merkezleri karşılaştırmak için kullanılır; bunlar harita sınırı değildir.",
        ],
      },
      {
        title: "Abbasilerde merkez, taşra ve askerî görevler",
        paragraphs: [
          "Abbasi iktidarı 750’de başlar; Bağdat sonraki dönemde önemli yönetim ve kültür merkezi olur. Türk ve İranlı unsurların askerî-idari görevlerde etkinleşmesi, toplum ve yönetimin çok aktörlü yapısını anlamaya yardım eder. Samarra askerî-idari yerleşim, avasım ise Bizans sınırındaki savunma bölgeleriyle ilişkilendirilir.",
          "Merkezî otoritenin zayıfladığı dönemlerde yerel hanedanlar güçlenebilir. Mısır’daki Tolunoğulları ve İhşidiler bunun farklı siyasi örnekleridir; yöneticinin Türk kökenli olması halkın tamamının Türk olduğu anlamına gelmez. 1258’de Bağdat’ın Moğollarca alınması siyasi merkez için bir kırılmadır. Bilgi, eser ve toplulukların farklı merkezlerde sürmesi ise ayrıca izlenir.",
        ],
      },
      {
        title: "Tercüme, inceleme ve özgün katkı",
        paragraphs: [
          "Çeviri, bir dildeki bilginin başka bir dilde erişilebilir olmasını sağlar. Beytülhikme çevresinde farklı bilgi havzalarından eserlerin aktarılması, çevirmenler ve bilginler arasında ilişki kurulması bakımından önemlidir. Yunanca, Süryanice, Farsça ve Hint bilgi gelenekleriyle temaslar çok yönlü bir üretim zemini oluşturmuştur.",
          "Aktarım yalnız aynı cümleyi tekrarlamak değildir; karşılaştırma, açıklama, düzeltme ve yeni çalışma da yapılabilir. Bir eserin çevrildiği dil yazarının kökenini veya bütün kullanıcıların dinini tek başına göstermez. Eser, nüsha ve çeviri farklı nesnelerdir. Bir metnin birden fazla nüshası bulunması bağımsız olarak aynı sayıda yeni buluş üretildiği anlamına da gelmez.",
        ],
      },
      {
        title: "İlimleri konuları ve yöntemleriyle ayır",
        paragraphs: [
          "Tefsir Kur’an yorumuyla, hadis rivayetlerle, fıkıh hukukla, kelam inanç meselelerinin açıklanmasıyla ilişkilidir. Matematik, tıp, astronomi ve felsefe başka soru ve yöntemler taşır. Ders kaynaklarında naklî ve aklî ilimler sınıflaması bu alanları düzenlemek için kullanılır; bilginlerin yalnız tek alanda çalıştığı veya alanların hiç etkileşmediği anlamına gelmez.",
          "Hârizmî’nin cebir ve hesap çalışmaları, İbn Sina’nın tıp birikimi, Farabi ve İbn Rüşd’ün felsefe çalışmaları ayırt edici örneklerdir. Bir alana önemli katkı yapmak, bütün bilgi tarihinin tek kişiyle başladığı iddiasından farklıdır. Rasathane gözlemle, bimaristan veya darüşşifa tedavi ve tıp eğitimiyle, medrese öğretimle düşünülür. Kurum ile alimi eşleştirirken somut işlevi kullan.",
        ],
      },
      {
        title: "Sanatı eser, işlev ve bağlamla incele",
        paragraphs: [
          "Hat yazının estetik düzenlenmesi, tezhip bezeme, minyatür ise özellikle yazma eserlerin resimli anlatımı bağlamında öğrenilir. Mimari yapılar ibadet, öğretim, sağlık veya yönetim gibi farklı işlevler taşıyabilir. Bir sanat biçiminin gelişmesinde patronaj, malzeme, kullanım amacı ve inanç anlayışları birlikte etkili olur.",
          "Bütün dönemlerde ve bütün bölgelerde aynı sanat uygulamasının bulunduğu varsayılmaz. Bir yapıda veya eserde insan ve hayvan tasviri görülmesiyle bütün İslam dünyasının tek bir resim anlayışına sahip olması farklı iddialardır. Eserin yaptıranı, üretildiği yer ve tarih, sonraki kullanım ve onarım ayrı incelenir. Bir onarım yazıtı binanın ilk yapım tarihini otomatik olarak vermez.",
        ],
      },
      {
        title: "Medeniyet haritasıyla devlet haritası",
        paragraphs: [
          "Bir harita siyasi sınırı, ticaret güzergâhını veya kültürel etkileşim merkezlerini gösterebilir. Önce başlık, lejant ve tarih okunur. Aynı kültür ağına bağlı iki şehrin ayrı siyasi otoriteler altında bulunması mümkündür. Tersine tek devlet sınırı içinde birden fazla dil ve inanç topluluğu bulunabilir.",
          "Kaynakların anlattığı ölçeği koruyarak ortak kültürel üretimi açıklamak, siyasi farklılıkları silmez. Bir hanedan değişimiyle eserlerin tamamının yok olduğu ya da aynı eserin her yerde aynı biçimde kullanıldığı varsayılmaz. Alternatif yorumu sınamak için yönetim kararı, yazışma, eser tarihi veya yerel kullanım kaydı gibi uygun yeni kanıt seçilir. Zaman sırası ve harita yakınlığı tek başına tek nedenin kanıtı değildir.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı yılda ayrı siyasi merkezler",
        prompt:
          "Bir öğretim çizelgesinde Abbasi iktidarı 750–1258, Endülüs Emevi siyasi dönemi 756–1031 olarak verilmiştir. 900 yılı bu iki aralıkta da bulunuyor. Bir öğrenci iki aralığın örtüşmesini “tek devletin iki başkenti” diye yorumluyor. Çizelge bu yorumu zorunlu kılar mı?",
        strategy: "Zaman ortaklığını siyasi egemenlik iddiasından ayır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "750≤900≤1258 ve 756≤900≤1031 olduğu için 900 iki dönemin de içindedir.",
          },
          {
            label: "2. adım",
            explanation:
              "Bu ortaklık iki siyasi yapının aynı zamanda var olabildiğini gösterir; tek otoriteye bağlı olduklarını belirtmez.",
          },
          {
            label: "3. adım",
            explanation:
              "Tek devlet iddiası için yönetime bağlılık veya idari birlik kanıtı gerekir. Çizelge yalnız dönemleri tanımlar.",
          },
        ],
        answer:
          "Hayır. Eşzamanlılık, siyasi birliğin tek başına kanıtı değildir.",
        check:
          "900’ü her aralığa geri koy; daha sonra “kime bağlı?” sorusunun çizelgede cevaplanmadığını denetle.",
        pitfall:
          "Aynı tarihte bulunmayı veya ortak hanedan kökenini tek devlet olmakla eşitleme.",
      },
      {
        title: "Eser aktarımında nüsha sayısını say",
        prompt:
          "Kurmaca bir katalogda aynı astronomi eserinin iki Arapça nüshası, bu nüshalardan birine dayanan bir Latince çevirisi ve çeviriyi açıklayan yeni bir yorum metni vardır. Dört katalog nesnesi mutlaka dört bağımsız ilk buluş mudur?",
        strategy: "Fiziksel nesne, metin ve yeni katkı türünü ayrı listele.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İki nüsha aynı eserin iki fiziksel kopyası olabilir. Çeviri bu eseri başka dile aktarır.",
          },
          {
            label: "2. adım",
            explanation:
              "Yorum metni yeni açıklamalar içerebilir; hangi bölümün özgün katkı olduğu içerik karşılaştırmasıyla belirlenir.",
          },
          {
            label: "3. adım",
            explanation:
              "Toplam dört katalog nesnesi sayılır; dört bağımsız ilk buluş sonucu bu sayımdan çıkmaz.",
          },
        ],
        answer:
          "Dört nesne vardır; bağımsız buluş sayısı yalnız katalog adedinden belirlenemez.",
        check:
          "Nesne sayımıyla içerik ve üretim ilişkisini farklı sütunlarda tutmak sonucu korur.",
        pitfall:
          "Her nüshayı yeni bir eser, her yeni eseri de otomatik ilk buluş sayma.",
      },
      {
        title: "Kayıtların ortak toplamı",
        prompt:
          "Tamamı kurmaca bir kamu hesabında girişler 120 ve 80 birim; ordu ödemesi 90, yargı gideri 30 ve eğitim gideri 40 birimdir. Hesap sonunda kalan 40 birim yazıyor. Bu toplam tutarlı mı ve tek başına bütün halka eşit hizmet verildiğini gösterir mi?",
        strategy:
          "Gelir-gider denkliğini kontrol et, ardından mali sayıyla toplumsal kapsamı ayır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Toplam gelir 120+80=200, listelenen gider 90+30+40=160 birimdir.",
          },
          {
            label: "2. adım",
            explanation:
              "200−160=40 kaldığı için kayıt kendi sayılarıyla tutarlıdır.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu toplam kime ne kadar hizmet ulaştığını veya hakların nasıl dağıldığını belirtmez; yararlanıcı ve uygulama bilgisi ayrıca gerekir.",
          },
        ],
        answer:
          "Hesap tutarlıdır; eşit hizmet dağılımı bu toplamdan belirlenemez.",
        check:
          "90+30+40+40=200 kontrolü sağlanır. Sonuç yalnız verilmiş hesap kalemleriyle sınırlıdır.",
        pitfall:
          "Düzenli mali kayıtla modern tam eşitlik veya hizmetin tüm nüfusa erişimini aynı şey sayma.",
      },
      {
        title: "Takvimin dayandığı olay ile düzenlendiği dönem",
        prompt:
          "Bir öğretim çizelgesi hicreti 622’ye, hicri takvimin idari düzenlenmesini Hz. Ömer’in 634–644 dönemine yerleştiriyor. Öğrenci “takvim 622’yi başlangıç aldığına göre 622’de düzenlenmiştir; iki bilgi çelişiyor” diyor. Bu çıkarımdaki eksik ayrımı göster.",
        strategy:
          "Başlangıç noktası seçilen geçmiş olayı, ortak kayıt sistemini düzenleyen karardan ayır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "622 hicretin tarihidir; çizelgede takvimin geriye dönük dayanağı olan olay olarak verilir.",
          },
          {
            label: "2. adım",
            explanation:
              "634–644 Hz. Ömer’in yönetim dönemidir; idari düzenleme bu sonraki bağlamla eşleştirilir.",
          },
          {
            label: "3. adım",
            explanation:
              "Bir sistem daha önceki olayı başlangıç seçebilir. Bu yüzden olay tarihiyle sistemi düzenleme dönemi farklı diye çelişki doğmaz.",
          },
        ],
        answer:
          "Çizelgedeki iki bilgi farklı işlemleri anlatır; başlangıç olayı ile idari düzenleme ayrılır.",
        check:
          "Her tarihi kendi fiiline geri bağla: hicret gerçekleşti; takvim düzenlendi. Metnin söylemediği kesin düzenleme gününü ekleme.",
        pitfall:
          "Bir takvimin dayandığı olayı, takvim sisteminin aynı anda kararlaştırılmasıyla eşitleme.",
      },
      {
        title: "Bir problem iki bilgi alanını kullanabilir",
        prompt:
          "Kurmaca bir ders notu miras paylarını düzenleyen bir hükmü tartışıyor; aynı notta verilen payları ortak paydaya getiren bir hesap yapılıyor. Yalnız bu iki işlemden hareketle notun hem hukuk hem matematikle ilişkisi kurulabilir mi?",
        strategy: "İçerik konusuyla kullanılan hesabı ayrı tanımla.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Mirasın kimlere hangi kuralla dağıtıldığı hukuk konusudur; bu bağlam fıkıhla ilişkilendirilebilir.",
          },
          {
            label: "2. adım",
            explanation:
              "Payları ortak paydaya getirip hesaplamak matematiksel bir işlemdir.",
          },
          {
            label: "3. adım",
            explanation:
              "İki alan aynı metinde birlikte kullanılabilir; bu bilgi alanların özdeş olduğu veya yazarın bütün bilimlerde uzman olduğu sonucu vermez.",
          },
        ],
        answer:
          "Evet, iki ayrı dayanakla hukuk ve matematik ilişkisi kurulabilir.",
        check:
          "Her alan için farklı cümle gösterilebildiğini denetle; tek terimden bütün uzmanlık alanları çıkarılmaz.",
        pitfall:
          "Bilgi sınıflamasını alanların hiç ilişki kurmadığı kapalı kutular gibi düşünme.",
      },
      {
        title: "İki harita farklı sorulara cevap verir",
        prompt:
          "Özgün öğretim modelinde A haritası aynı dönemdeki iki ayrı hanedanın sınırlarını, B haritası ise iki bölge arasında dolaşan eserlerin bağlantılarını gösteriyor. Araştırmacı B’de bağlantı gördüğü için A’daki siyasi ayrımın yanlış olduğunu ileri sürüyor. Bu değerlendirmeyi düzelt.",
        strategy: "Haritaların başlık ve lejantındaki ölçütü karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "A siyasi denetim katmanını, B bilgi ve eser aktarımı katmanını gösterir.",
          },
          {
            label: "2. adım",
            explanation:
              "Ayrı siyasi yapılar arasında bilgi alışverişi bulunabilir; iki harita bu durumda çelişmek zorunda değildir.",
          },
          {
            label: "3. adım",
            explanation:
              "Siyasi birlik iddiası sınanacaksa aktarım çizgisinden farklı olarak bağlılık ve yönetim kanıtı gerekir.",
          },
        ],
        answer:
          "Siyasi ayrılık ile kültürel bağlantı birlikte bulunabilir; haritaların gösterdiği katmanlar farklıdır.",
        check:
          "Her iki haritanın da aynı dönem için hazırlanması kontrol edilir; farklı dönemlerse ayrıca zaman denetimi gerekir.",
        pitfall:
          "Kültür bağlantısını harita üzerinde siyasi sınırın silinmesi sayma.",
      },
    ],
    recall: [
      {
        prompt:
          "Cahiliye terimi bütün bilgi ve ticaretin bulunmadığı anlamına gelir mi?",
        answer:
          "Hayır. İslamî tarih anlatımındaki dönem adıdır; dönemin şiir, ticaret ve toplumsal ilişkileri ayrıca incelenir.",
      },
      {
        prompt:
          "Hicret ile hicri takvimin idari düzenlenmesi neden ayrı tutulur?",
        answer:
          "622 başlangıç kabul edilen olaydır; takvimin idari düzenlenmesi sonraki Hz. Ömer dönemine aittir.",
      },
      {
        prompt: "Bir para üzerindeki dil bütün halkın ana dilini gösterir mi?",
        answer:
          "Hayır. İdari temsil veya para yazısı ile halkın konuştuğu diller farklı kanıtlar gerektirir.",
      },
      {
        prompt: "Endülüs’te 756 ve 929 aynı olayı mı anlatır?",
        answer:
          "Hayır. 756 emirliğin başlangıcı, 929 halifelik ilanıdır; siyasi yapıdaki ayrı aşamalardır.",
      },
      {
        prompt: "Çeviri, nüsha ve özgün katkı nasıl ayrılır?",
        answer:
          "Nüsha metnin fiziksel kopyasıdır; çeviri başka dile aktarır; özgün katkı içerik ve yöntem karşılaştırmasıyla gösterilir.",
      },
      {
        prompt:
          "İki şehirde ortak kültürel üretim olması tek devleti kanıtlar mı?",
        answer:
          "Hayır. Kültürel ilişki ve siyasi egemenlik ayrı katmanlardır; yönetim birliği için ayrıca kanıt gerekir.",
      },
    ],
    source:
      "MEB Tarih 9 ve 10 ders kitaplarının ilgili üniteleri, OGM Dersler Cepte ve kaynakları karşılaştırılan Aurelia konu kâğıtları temelinde hazırlanmış özgün anlatım. Etkinliklerdeki kurmaca kayıtlar öğretim içindir; gerçek belge alıntısı veya resmî sınav sorusu değildir.",
  },
  {
    id: "turklerin-islamiyeti-kabulu",
    minutes: 115,
    objectives: [
      "İlk temas, ittifak, bireysel tercih, hükümdar kararı ve toplumsal yayılmayı birbirinden ayırmak.",
      "İslamlaşmayı siyasi, ekonomik, dinî ve sosyal mekanizmaların birlikte işleyişiyle açıklamak.",
      "İlk, herkes ve aynı gün iddialarını bölge, olay türü ve kaynak kapsamıyla denetlemek.",
    ],
    sections: [
      {
        title: "Bir tarih değil, uzun bir süreç",
        paragraphs: [
          "İslamlaşma, insanların ve toplulukların zaman içinde İslam inancını benimsemesini ve bunun kültürel-kurumsal etkilerini anlatır. Türk toplulukları geniş bir coğrafyada, farklı siyasi ve toplumsal çevrelerde yaşamıştır. Bu nedenle kabul tek bir kişinin kararı, tek bir savaş veya bütün topluluklar için aynı gün olarak açıklanamaz.",
          "Temas etmek, bir orduda görev almak, askerî ittifak kurmak, bireyin din değiştirmesi ve devletin resmî kararı farklı kanıt düzeyleridir. Her biri sürecin bir parçasına ışık tutar. Bir hükümdarın tercihini öğrenmek için bir belge, yerel toplulukların yaygın uygulamasını anlamak için başka tür kayıtlar gerekir. Süreci parçalara ayırmak ilişkileri koparmak değil, hangi verinin hangi sonucu taşıdığını açıklaştırmaktır.",
        ],
      },
      {
        title: "Talas’ın önceki ve sonraki halkaları",
        paragraphs: [
          "VII. yüzyılda Sasani hâkimiyetinin çözülmesi ve Maveraünnehir çevresindeki mücadeleler Türklerle Müslümanlar arasındaki temasların zeminindedir. Emeviler dönemindeki çatışmalar ve dışlayıcı uygulamalar bu ilişkilerin bazı yönlerini zorlaştırmıştır. 750’de Abbasi yönetiminin başlaması, 751 Talas Savaşı’nın hangi siyasi dönemde olduğunu ayırmaya yardım eder.",
          "Talas’ta Abbasi ordusu ile Çin’in Tang kuvvetleri karşılaşmış, Karluklar Abbasi tarafını desteklemiştir. Bu gelişme Orta Asya’daki güç ilişkileri ve Türk-Müslüman yakınlaşması bakımından önemlidir. Bir ittifakın sonucu bütün boyların aynı anda din değiştirmesi değildir. Öncesindeki temaslar ve sonraki yüzyıllardaki yerel kabul yolları ayrıca incelendiğinde savaşın önemi doğru kapsamda korunur.",
        ],
      },
      {
        title: "Etkeni söylemek yetmez, nasıl etkilediğini açıkla",
        paragraphs: [
          "Bir etkeni açıklamak için hangi ilişkiyi nasıl değiştirdiğini söylemek gerekir. Ticaret düzenli karşılaşmalar, ortak iş ve güven ilişkileri kurabilir; öğreticiler yeni inancın tanınmasına yardım edebilir; daha kapsayıcı siyasi yaklaşım görev ve katılım engellerini azaltabilir. Bu mekanizmalar aynı bölgede birlikte işleyebilir.",
          "Ders kaynaklarında Gök Tanrı inancı ile İslam arasında bazı yaratıcı ve ahlak anlayışı benzerlikleri de kolaylaştırıcı etken olarak ele alınır. Benzerlik bütün öğreti, ibadet ve hukuk esaslarının aynı olduğu anlamına gelmez. İnsanların kararları yalnız tek bir ekonomik çıkar veya değişmez topluluk karakteriyle açıklanmaz. Din değişiminin yönü ve yaygınlığı için zaman, yer ve uygulama kanıtı aranır.",
        ],
      },
      {
        title: "İlk sözcüğünün ölçütünü yaz",
        paragraphs: [
          "İlk sorusunda hangi olayın ve hangi coğrafyanın karşılaştırıldığı belirlenir. Karahanlılar Orta Asya’daki ilk Müslüman Türk devleti ders çerçevesiyle; Satuk Buğra Han ise İslamiyet’i benimseyen Karahanlı hükümdarı bağlamıyla ilişkilendirilir. 840 kuruluş tarihiyle hükümdarın sonraki tercihi aynı olay değildir.",
          "İdil veya Volga Bulgarlarında 922, Almış ve Abbasi heyetinin gelişiyle kurumsal dinî ilişki bağlamında ele alınır. Bu kayıt ilk Müslüman bireyin kesin tarihi değildir. İdil Bulgarlarıyla Tuna Bulgarları farklı coğrafi-siyasi yapılardır. Kaynaklarda ilk sırası farklı ölçütlerle kurulabileceği için kişi, devlet, resmî karar ve bölge nitelemeleri sorunun yanıtında korunmalıdır.",
        ],
      },
      {
        title: "Eski öge ile yeni çerçeveyi yan yana koy",
        paragraphs: [
          "Türk-İslam kültürü önceki birikimle yeni dinî çerçevenin etkileşmesiyle açıklanır. İlahî meşruiyet düşüncesi, unvanlar, dil veya bazı yönetim uygulamaları devam ederken yeni kurum ve yorumlar eklenebilir. Süreklilik ve değişim birbirini dışlamayan iki boyuttur; her biri ayrı kanıtla gösterilir.",
          "Töre ve örfi uygulamalarla İslam hukukunun etkileri, alp geleneğinin gazilik çerçevesinde yeniden yorumlanması ve yeni öğretim kurumları bu karşılaştırmaya örnek olabilir. Din değişimi bütün dili, sanatı ve günlük hayatı aynı anda aynılaştırmaz. Türkçenin sürmesi önceki her kurumun aynen kaldığını; yeni medrese bulunması da önceki bütün birikimin silindiğini göstermez.",
        ],
      },
      {
        title: "Devlet örneklerinde yönetici ile halkı ayır",
        paragraphs: [
          "Karahanlılar, Gazneliler ve Selçuklu oluşumları aynı devletin yalnız üç adı değildir. Gazneli Mahmut’un Hindistan yönündeki seferleri veya 1040 Dandanakan’da Gaznelilerle Selçukluların mücadelesi kendi kişi ve dönemleriyle öğrenilir. Bir devletin zayıflamasıyla son bulması da ayrı gelişmeler olabilir.",
          "Tolunoğulları ve İhşidiler gibi Mısır örneklerinde yönetici kökeni, bütün halkın kökeni ve resmî dil ayrı değişkenlerdir. Abbasilerde Türklerin askerî-idari görevleri, Samarra ve avasım gibi düzenlemeler de ilişki ağlarını gösterir. Bir atama, unvan veya orduda hizmet tek başına bağımsız bir devlet kurulduğunun kanıtı değildir. Kişi, kurum ve halkı aynı kapsamda kullanmamak karşılaştırmayı güçlendirir.",
        ],
      },
      {
        title: "Önceki inançları ve topluluk çeşitliliğini tanı",
        paragraphs: [
          "Erken ve Orta Çağ Türk toplulukları tek bir coğrafyada tek değişmez inanç çevresi oluşturmaz. Gök Tengri merkezli anlayışlarla Budizm, Maniheizm, Musevilik ve Hristiyanlık gibi farklı geleneklerle ilişkiler dönemlere göre incelenir. Bir hükümdarın ilgisi, bir yönetici grubunun tercihi ve bütün halkın uygulaması aynı bilgi değildir.",
          "Bir dini benimsemek insanların değeri, zekâsı veya değişmez karakteri için bir sıralama ölçütü değildir. Tarihsel kimlik dil, kurum, siyasi aidiyet ve günlük ilişkilerle birlikte araştırılır. Başka bir inanca geçildiğinde bütün önceki özelliklerin zorunlu olarak kaybolduğunu söylemek bu çoklu yapıyı eksiltir. Kaynakta hangi grubun ne yaptığı açıkça gösterildiğinde kültürel çeşitlilik ve değişim daha doğru anlaşılır.",
        ],
      },
      {
        title: "Maveraünnehir, Horasan ve İdil aynı yer değildir",
        paragraphs: [
          "Maveraünnehir genel olarak Ceyhun/Amuderya ile Seyhun/Siriderya arasındaki tarihsel bölgedir. Horasan İran’ın doğusu ve çevresindeki geniş tarihsel alanlarla ilişkilidir. İdil veya Volga ise daha kuzeybatıdaki başka bir nehir ve bağlantılar sahasıdır. Bu adlar günümüz siyasi sınırlarıyla her dönemde birebir örtüşmez.",
          "Yayılmayı bir haritada izlerken yalnız okların yönünü değil, hangi tarihte hangi topluluğun hangi ilişkisinin gösterildiğini oku. Bir bölgedeki tüccar teması başka bölgenin resmî kabul tarihi değildir. Aynı ad taşıyan toplulukların farklı kolları da farklı coğrafyalarda farklı siyasi ve dinî yollar izleyebilir. Bölge nitelemesi tarihsel bir ilk sorusunda bu yüzden belirleyici olabilir.",
        ],
      },
      {
        title: "Hizmet, ittifak ve inanç farklı ilişkiler",
        paragraphs: [
          "Bir komutanın Abbasi ordusunda görev yapması, onun askerî-idari ilişkiye katıldığını gösterir. Bir boyun savaşta destek vermesi de belirli karşılaşmadaki ittifakını anlatır. Bunlardan bütün mensupların aynı inanca sahip olduğu otomatik olarak çıkarılamaz. İlişkinin türü önce verilen eylemden belirlenir.",
          "Kişinin dini ayrıca açıkça belirtilmişse bu bilgi o kişiye aittir; verinin kapsamı yine bütün nüfusa taşınmaz. Aynı kişi hem askerî görev hem dinî tercih bakımından incelenebilir. Etkinlikte hükümdar, resmî karar ve yerel topluluk kayıtlarının ayrı seçilebilmesi bu bağımsız boyutları görünür kılar. Bir alanın boş kalması, diğer alanın kanıtını geçersiz kılmaz; yalnız eksik bilgiye işaret eder.",
        ],
      },
      {
        title: "Siyasi yaklaşımın kabulü kolaylaştırması",
        paragraphs: [
          "Arap olmayan Müslümanlara bazı görev ve ilişkilerde engel konulması toplumsal katılımı zorlaştırabilir. Bu dışlayıcılığın azalması ise yakınlaşma için imkân yaratabilir. Emevi-Abbasi karşılaştırması bu mekanizmayı düşünmeye yardım eder; bütün yöneticilerin her yerde aynı uygulamayı izlediği anlamına gelmez.",
          "Mevali bu ders bağlamında Arap olmayan Müslümanları anlatır. Ayrımcı vergi veya görev uygulamasıyla herkesin hukuken köle statüsünde bulunması aynı iddia değildir. Ayrıca bir yönetimin daha kapsayıcı olması, modern vatandaşlıkta bütün hakların eksiksiz eşitlendiğini tek başına göstermez. Politikanın konusu, uygulandığı grup ve değişimin kapsamı ayrı yazılmalıdır.",
        ],
      },
      {
        title: "Ticaret ve şehir ağlarında tekrarlanan temas",
        paragraphs: [
          "Tüccarlar malların yanında haber, dil ve inanç bilgisi de taşıyabilir. Şehir, pazar ve kervan bağlantıları düzenli karşılaşmalara zemin sunar. Ticaretin kolaylaştırıcı rolü, insanların birbirini tanıması ve yeni bilgilerle karşılaşması gibi bir mekanizma üzerinden açıklanır.",
          "Alışverişin varlığı her tüccarın veya her müşterinin din değiştirdiğini göstermez. Aynı pazarda farklı inançlardan kişiler bulunabilir. Bir ticaret kaydı ekonomik ilişkiyi doğrudan, dinî yayılmayı ise ancak ek bilgi varsa destekler. Yeni inancın tanınmasıyla benimsenmesi de aynı aşama değildir; kaynak bu ayrımı vermiyorsa sonuç sınırlı tutulur.",
        ],
      },
      {
        title: "Öğreticiler, sufiler ve yerel ilişkiler",
        paragraphs: [
          "Âlimler ve dinî öğreticiler yeni inancın kavramlarını açıklayabilir; sufiler tasavvuf çevrelerindeki dinî-sosyal ilişkilerle etkili olabilir. Bu kişilerin faaliyetleri tek bir büyük merkezden bütün yerlere aynı hızla yayılan zorunlu bir süreç değildir. Yol, dil, himaye ve yerel ihtiyaçlar iletişim biçimini etkiler.",
          "Bir öğreticinin çağrılması, bir heyetin gelmesi veya bir kurumun kurulması farklı ilişki kanıtlarıdır. Öğretim talebi hükümdarın ya da belirli grubun ilgisini gösterebilir; herkesin aynı tarihte aynı uygulamayı benimsediğini göstermez. Etkiyi araştırmak için sonraki yerel kayıtlar, kurumun kullanım biçimi ve farklı toplulukların tepkileri incelenir.",
        ],
      },
      {
        title: "Satuk Buğra Han ve Karahanlı ölçütü",
        paragraphs: [
          "Satuk Buğra Han, İslamiyet’i benimseyen Karahanlı hükümdarı olarak öğrenilir; Müslüman adı Abdülkerim’dir. Bu bilgi “bütün Türkler arasında ilk Müslüman birey” iddiasıyla aynı değildir. Karahanlı siyasi yapısının kuruluşuyla hükümdarın dinî tercihi ve daha geniş çevrelerde yayılma farklı zamanlarda ele alınmalıdır.",
          "Karahanlılarda Türkçe kullanımı ve önceki yönetim geleneklerinin bazı unsurları sürerken yeni dinî içerik ve kurumlar görülür. Bunun birlikte incelenmesi kültürel etkileşimin somut zeminidir. Devlet adı veya hükümdarın bir unvanı, halkın her kesiminin dili ve inancı hakkında tek başına eksiksiz bilgi vermez. Kullanılan kaydın kişi, saray, şehir veya bütün ülke düzeyinde olup olmadığı belirlenir.",
        ],
      },
      {
        title: "922 kaydı bir heyet ve kurumsal ilişkiyi anlatır",
        paragraphs: [
          "İdil Bulgarları bağlamında Almış’ın dinî öğretim ve destek talebiyle Abbasi heyetinin 922’de gelişi anılır. İbn Fadlan’ın heyet içinde bulunması bu sürece ilişkin önemli bir tanıklık bağlamıdır. Heyetin gelişi, hükümdar ve merkezle kurulan ilişki hakkında bilgi sunar; bölgedeki ilk bireysel kabulün mutlaka o gün gerçekleştiğini söylemez.",
          "Bir tarihsel metinde resmî kabul, hükümdarın tercihi veya öğretici heyet gibi farklı eylemler öne çıkabilir. Her birinin ölçütü yanıt cümlesinde korunur. İdil/Volga sahasıyla Orta Asya’yı veya Tuna Bulgarlarını aynılaştırmak hem coğrafya hem olay hatasına yol açar. Bir kaynakta ilk sözcüğü varsa önce hangi tür ilk ve hangi bölge için söylendiği sorulur.",
        ],
      },
      {
        title: "Kitlesel yayılma kaydında birim ve belirsizlik",
        paragraphs: [
          "Ders kaynaklarında 960’ta büyük bir çadır topluluğunun kabulünden söz eden bir kayıt bulunur. Buradaki çadır birimi doğrudan aynı sayıda kişi demek değildir. Bir tarihsel anlatının verdiği topluluk sayısı da modern ve eksiksiz nüfus sayımı kesinliğinde kabul edilmez.",
          "Kişi sayısı hesaplamak istense çadır başına kişi, kaydın kapsamı ve kullanılan sayım yöntemi gibi ek bilgiler gerekir. Sabit bir aile büyüklüğünü kendiliğinden eklemek verilmeyen varsayım üretir. Böyle bir kayıt yayılmanın toplumsal ölçekte anlatıldığını gösterebilir; bütün toplulukların aynı gün karar verdiğini, kabul hızını veya tek nedeni tek başına belirlemez.",
        ],
      },
      {
        title: "Oğuzlarda kabul ile siyasi oluşumlar",
        paragraphs: [
          "Oğuzlar arasında İslamiyet’in yayılması X. yüzyılın ikinci yarısında belirginleşen, sonraki dönemde genişleyen bir süreç olarak ele alınır. Bütün boyların tek yerde aynı tarihte aynı kararı verdiği düşünülmez. Oğuz kökenli Selçuklu ve sonraki siyasi oluşumlar farklı devlet ve dönemlerdir.",
          "Ortak bir boy bağı veya din, tek bir kesintisiz devletin varlığı için yeterli değildir. Selçuk Bey’in aile ve topluluk çevresiyle 1040’taki Büyük Selçuklu devletleşmesi ayrı düzeylerde incelenir. 1077 Türkiye Selçuklu kuruluşu da başka bir siyasi coğrafyanın gelişmesidir. Aynı soy veya ortak inanç bağı bulunabilir; siyasi kurum, merkez ve kuruluş eylemi ayrıca belirtilir.",
        ],
      },
      {
        title: "Hukuk ve meşruiyette birlikte işleyen unsurlar",
        paragraphs: [
          "İlahî meşruiyet vurgusu yeni dinî çerçevede yeniden yorumlanabilir. Halifeyle ilişkiler ve hutbe bu bağlamda incelenir. Hükümdarlık temsilinde tıraz, hükümdarın ad ve lakaplarını taşıyan süslü giysi; nevbet, tören ve belirli zamanlarda çalınan müzik; çetr, hükümdarın üstünde tutulan örtü veya şemsiye bağlamındadır. Bunlar hükümdarlık simgeleridir, üç ayrı yönetim kurumu değildir. Vezirlik için Karahanlılarda yuğruş, Gaznelilerde hâce unvanı kullanılır. Unvanı ilgili devlet ve görevle eşleştirmek, yalnız benzer seslerden hareket etmekten daha güvenilirdir.",
          "Örfi düzenlemeler yönetim ve gelenekle, şeri hukuk İslamî hukuki esaslarla ilişkilidir. Uygulamada bunların ilişkisi dönem ve kuruma göre araştırılır; iki basit ve hiç temas etmeyen kutu gibi düşünülmez. Bir belgede hangi davaya kimin baktığı veya hangi gelir düzenlemesinin hangi makamdan çıktığı açıkça verilmişse yorum o işlevle sınırlandırılır.",
        ],
      },
      {
        title: "Dil, sanat ve kurumlarda iki ayrı kanıt",
        paragraphs: [
          "Dinî içeriklerin yeni eserlerde işlenmesi, medrese ve tekke gibi kurumların yayılması değişimin göstergesi olabilir. Önceki dilin veya belirli bir sanat tekniğinin sürmesi ise devamlılığa kanıt sunabilir. İki özellik aynı şehirde ve aynı dönemde birlikte bulunabilir.",
          "Türklerin İslamiyet’ten önce hiç yazı veya şehre sahip olmadığı sonucu bu değişimden çıkarılmaz; Orhun yazıtları ve Uygur şehir faaliyetleri önceki birikimin örnekleridir. Aynı şekilde bir dilin sürmesi yeni dinî çerçevenin hiç etkisi olmadığı anlamına gelmez. Etkileşim yorumu en az iki farklı dayanakla kurulduğunda tek yönlü bir anlatı olmaktan çıkar.",
        ],
      },
      {
        title: "Devletin adıyla halkın tamamını aynılaştırma",
        paragraphs: [
          "Gaznelilerde yönetici çevre, ordu ve yönetilen topluluklar aynı köken ve dilden oluşmak zorunda değildir. Mısır’daki Türk yönetici kökenli hanedanlar da benzer bir kapsam ayrımı gerektirir. Bir kişinin kökeni, makamı, dini ve kullandığı dil ayrı alanlara yazılır.",
          "Aynı dinî çevreye katılan iki devletin siyasi sınırları ve çıkarları farklı olabilir. Ortak inanç bütün savaşların bittiğini veya tek yönetim kurulduğunu göstermez. Kurumlar arasında etkileşim ve görevlilerin dolaşımı da mümkündür; bu dolaşım bütün halkın aynı kimliğe geçmesi demek değildir. Her iddia için ona uygun kapsamda belge aranır.",
        ],
      },
      {
        title: "Yeni kanıt yorumun hangi parçasını değiştirir?",
        paragraphs: [
          "Önce iddiayı açık bir cümleye çevir: hükümdarın tercihi mi, resmî karar mı, belirli bir yerel grubun uygulaması mı soruluyor? Ardından hangi kaydın bunu doğrudan söylediğini işaretle. Bir belgede yalnız temas anlatılıyorsa onu toplu kabul belgesi gibi kullanma.",
          "Etkinlikte yeni bir hükümdar kaydı eklemek yöneticiyle ilgili çıkarımı, yerel topluluk kaydı eklemek ise yalnız belirtilen yerel kapsamı değiştirir. Üç tür kayıt bir arada bulunsa da bütün nüfusun aynı gün aynı inanca geçtiği kendiliğinden kanıtlanmaz. Alternatif açıklama, kaydın sınırlı alanı veya bilinmeyen süreler açık tutulur; tarih sırası tek başına tek neden yerine konmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Hane, kişi ve kayıt kapsamı",
        prompt:
          "Tamamı kurmaca bir arşiv çalışmasında A kaydı 120 hane, B kaydı 300 kişi sayıyor. İki kaydın aynı yer ve aynı kapsamı tarayıp taramadığı belirtilmemiştir. Araştırmacı bunları toplayıp “420 kişi yeni dini kabul etti” diyor. Bu hesapta hangi iki sorun vardır?",
        strategy:
          "Önce birimi, sonra kapsanan kişilerin olası ortaklığını kontrol et.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "A haneyi, B kişiyi sayar; 120 hane doğrudan 120 kişi değildir. Hane başına kişi sayısı verilmemiştir.",
          },
          {
            label: "2. adım",
            explanation:
              "İki kaydın aynı kişileri kısmen kapsayıp kapsamadığı bilinmiyor; birim dönüşse bile doğrudan toplamak çift sayım yaratabilir.",
          },
          {
            label: "3. adım",
            explanation:
              "Güvenilir kişi toplamı için birim dönüşümü ve kayıtların kapsam ilişkisi gerekir. Bu veriler olmadan 420 kişi sonucu kurulamaz.",
          },
        ],
        answer: "Birim dönüşümü eksik ve olası çift sayım denetlenmemiştir.",
        check:
          "Düzeltme sayıların kendisini reddetmez; her sayıyı ait olduğu kayıt birimi ve kapsamda tutar.",
        pitfall:
          "Tarihsel bir topluluk kaydını aynı sayıda kişiye çevirip kapsamı belirsiz başka kayıtla toplama.",
      },
      {
        title: "Hükümdar adı ile toplum dili",
        prompt:
          "Özgün öğretim modelinde aynı hükümdarın iki sikkesinde eski unvanı ile yeni dinî adı birlikte görülüyor. Bir yerel satış kaydı ise önceki dilde yazılmış. Bu üç bulgu, hükümdarlık temsili ve toplum dili hakkında nasıl kullanılabilir?",
        strategy:
          "Sikke üzerindeki temsil ile yerel yazı dilinin kapsamını ayır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Sikkeler hükümdarın eski unvan ve yeni dinî adı birlikte kullandığına kanıttır; temsilde devamlılık ve yeni çerçeve yan yana bulunabilir.",
          },
          {
            label: "2. adım",
            explanation:
              "Satış kaydı önceki dilin en azından bu işlemde kullanıldığını gösterir.",
          },
          {
            label: "3. adım",
            explanation:
              "Bunlardan bütün nüfusun aynı dili konuştuğu veya herkesin aynı tarihte din değiştirdiği sonucu çıkarılmaz.",
          },
        ],
        answer:
          "Hükümdarlık temsilinde birlikte kullanım, yerel işlemde dilin sürmesi gösterilebilir.",
        check:
          "Her sonuç ilgili nesneye bağlanır; devletin her belgesi veya bütün halk adına ölçülmemiş genelleme yapılmaz.",
        pitfall:
          "Hükümdarın dinî adını bütün toplumun dil ve inanç dağılımının sayımı sayma.",
      },
      {
        title: "Dört özelliği tek değişkene indirme",
        prompt:
          "Kurmaca bir kişi tablosunda görevli P Türk kökenli, Müslüman ve yazışmalarında Arapça kullanıyor; görevli Q İran kökenli, Müslüman ve yazışmalarında yine Arapça kullanıyor. Bu tablo hangi alanda doğrudan çeşitlilik gösterir, hangi alanlarda göstermez?",
        strategy:
          "Köken, din, yazışma dili ve görevi ayrı sütunlarda karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "P ve Q’nun kökeni farklıdır; bu iki kişi bakımından köken çeşitliliği açıkça verilmiştir.",
          },
          {
            label: "2. adım",
            explanation:
              "İkisi de Müslüman ve verilen yazışma dili aynı olduğundan bu iki sütunda farklılık gösterilmemiştir.",
          },
          {
            label: "3. adım",
            explanation:
              "Tablo bütün devlet görevlilerini kapsamadığından devletin tamamı veya nüfus için oran hesaplanamaz.",
          },
        ],
        answer:
          "İki kişi arasında köken çeşitliliği vardır; bu kayıt din veya yazışma dili çeşitliliği göstermez.",
        check:
          "Aynı kalan iki sütunu değişikmiş gibi okumadığını ve iki kişiyi bütün nüfusa taşımadığını denetle.",
        pitfall: "Köken farklılığını otomatik din veya dil farklılığı sayma.",
      },
      {
        title: "İlk kayıt ile ilk gerçekleşme",
        prompt:
          "Tamamı kurmaca iki bölge dosyasında Kuzey’de 920 tarihli bir hükümdar kabul kaydı, Güney’de 910 tarihli bir resmî karar kaydı var. Dosyalar daha önceki bütün kişisel kabulleri taramıyor. Bu verilerle “dünyadaki ilk bireysel kabul 910’da oldu” denebilir mi?",
        strategy:
          "Karşılaştırılan olay türlerini ve arşivin tarama kapsamını belirle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Kuzey kaydı hükümdarın tercihini, Güney kaydı resmî kararı anlatır; aynı olay türü değildir.",
          },
          {
            label: "2. adım",
            explanation:
              "910’un 920’den önce olması yalnız bu kayıtların zaman sırasını verir.",
          },
          {
            label: "3. adım",
            explanation:
              "Dosyalar daha önceki bireyleri kapsamadığından dünyadaki ilk bireysel kabul tarihi bu verilerle belirlenemez.",
          },
        ],
        answer:
          "Hayır. Elde bulunan kayıtların önceliği, bütün dünyadaki ilk bireysel olayın tarihi değildir.",
        check:
          "Sonucun olay türü ve coğrafi kapsamı iki kayıttan daha geniş olduğuna dikkat et.",
        pitfall:
          "En eski bulunan belgeyi, taranmamış bütün geçmişin kesin ilk olayıyla eşitleme.",
      },
      {
        title: "Temas gruplarında ortak kişileri ayır",
        prompt:
          "Özgün ve bütünüyle kurmaca bir öğretim çalışmasında 6 kişi pazar toplantısına, 5 kişi öğretim toplantısına katılmıştır; bunların 2’si iki toplantıda da vardır. Farklı katılımcı sayısını bul. Bu sayı din değiştirenlerin sayısı mıdır?",
        strategy: "Ortak kişileri iki kez saymamak için kesişimi çıkar.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İki liste ayrı ayrı toplandığında 6+5=11 kayıt elde edilir; iki kişi her iki listede yer almıştır.",
          },
          {
            label: "2. adım",
            explanation: "Farklı katılımcı sayısı 11−2=9’dur.",
          },
          {
            label: "3. adım",
            explanation:
              "Toplantıya katılma temas ve öğrenme imkânı verir; kişilerin inanç tercihi ayrıca belirtilmediği için 9 din değiştiren kişi sonucu kurulamaz.",
          },
        ],
        answer:
          "9 farklı katılımcı vardır; din değiştiren kişi sayısı verilmemiştir.",
        check:
          "Yalnız pazar 4, yalnız öğretim 3 ve iki toplantı 2 kişi; 4+3+2=9.",
        pitfall:
          "Temasın niceliğini bireysel inanç değişimiyle aynı ölçüm sayma.",
      },
      {
        title: "Bir tereke kaydında hesap ve bilinmeyen pay",
        prompt:
          "Kurmaca bir kadı kaydı, ölen kişiden kalan terekeyi 72 hesap birimi, belgelenmiş borcu 18 ve kayda geçmiş gideri 6 birim olarak veriyor. Yalnız bu kayıt koşulunda önce borç ve gider düşülecek; mirasçıların kimliği ve payları verilmemiştir. Paylaşım için kalan tutarı bul. Bundan her mirasçının alacağı hesaplanabilir mi?",
        strategy:
          "Tereke toplamından kayıtlı kesintileri çıkar; kalan tutarla kişisel miras payını ayrı bilgi olarak tut.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Kaydın başlangıç tutarı 72, düşülmesi istenen iki kesinti 18 ve 6 birimdir; kesintilerin toplamı 24 olur.",
          },
          {
            label: "2. adım",
            explanation:
              "Paylaşıma kalan tutar 72−24=48 hesap birimidir. Kontrol: 18+6+48=72, başlangıç kaydı kapanır.",
          },
          {
            label: "3. adım",
            explanation:
              "Mirasçı sayısı, yakınlıkları ve pay kuralları verilmediğinden 48’i eşit bölmek veya belirli kişilere pay yazmak için yeterli veri yoktur.",
          },
        ],
        answer:
          "Kayıt koşulunda 48 hesap birimi kalır; her mirasçının payı bu veriden belirlenmez.",
        check:
          "18+6+48=72 eşitliği yalnız verilen hesap işlemini doğrular; bu kurmaca kayıt bütün miras hukukunun genel kuralı değildir.",
        pitfall:
          "Paylaşıma kalan toplamı, adı ve hakkı bilinmeyen tek bir kişinin miras payı sayma.",
      },
    ],
    recall: [
      {
        prompt: "Bir savaş ittifakı neyi doğrudan gösterir?",
        answer:
          "Belirli karşılaşmada taraflar arasındaki desteği; bütün halkın aynı gün din değiştirdiğini değil.",
      },
      {
        prompt: "İlk sorusunda hangi üç ölçüt mutlaka korunur?",
        answer:
          "Kişi veya siyasi yapı, olayın türü ve coğrafi kapsam; resmî karar ile bireysel kabul aynı ölçüt değildir.",
      },
      {
        prompt: "Çadır kaydından kişi sayısı için hangi bilgiler gerekir?",
        answer:
          "Birim dönüşümü, hane başına kişi ve kaydın kapsamı; bunlar verilmedikçe kesin kişi sayısı üretilmez.",
      },
      {
        prompt: "Bir hükümdar kaydıyla yerel topluluk kaydı nasıl ayrılır?",
        answer:
          "İlki belirli yöneticinin tercihini, ikincisi açıkça belirtilen yerdeki grubun uygulamasını gösterebilir.",
      },
      {
        prompt: "Ticaretin kabulü kolaylaştırması nasıl bir mekanizmadır?",
        answer:
          "Düzenli karşılaşma, güven ve bilgi aktarımı sağlar; her alışverişi zorunlu din değişimine dönüştürmez.",
      },
      {
        prompt: "Kültürel etkileşimi iki kanıtla nasıl kurarsın?",
        answer:
          "Önceki bir unsurun sürdüğünü ve yeni bir içerik, yorum veya kurumun eklendiğini ayrı dayanaklarla gösterirsin.",
      },
    ],
    source:
      "MEB Tarih 9 ve 10 ders kitaplarının ilgili üniteleri, OGM Dersler Cepte ve kaynakları karşılaştırılan Aurelia konu kâğıtları temelinde hazırlanmış özgün anlatım. Etkinliklerdeki kurmaca kayıtlar öğretim içindir; gerçek belge alıntısı veya resmî sınav sorusu değildir.",
  },
  {
    id: "selcuklu-yerlesme-devletlesme",
    minutes: 130,
    objectives: [
      "Anadolu’da yerleşme ve devletleşmeyi askerî, toplumsal, ekonomik ve kurumsal ilişkilerle açıklamak.",
      "Büyük Selçuklu, Türkiye Selçuklu ve ilk beyliklerin kişi, coğrafya ve eser bağlarını ayırmak.",
      "Dönüm noktası, bağlılık, merkezî güç ve siyasi sonu ayrı kanıtlarla yorumlamak.",
    ],
    sections: [
      {
        title: "Anadolu tek olayla ve bir günde dönüşmedi",
        paragraphs: [
          "Anadolu’da Türk yerleşimi XI. yüzyılda tek bir savaş gününde tamamlanmış değildir. Daha önceki Bizans-Sasani ve Bizans-Müslüman mücadeleleri, nüfus hareketleri, yerel ilişkiler ve siyasi istikrarsızlık farklı bölgelerde farklı koşullar oluşturmuştur. Oğuz/Türkmen göçlerinde geçim, yeni yurt arayışı, siyasi baskılar ve askerî imkânlar birlikte düşünülür.",
          "Keşif ve akınlarla kalıcı yerleşme aynı aşama değildir. Yerleşmenin sürmesi üretim, köy ve şehir, yol güvenliği ve yönetim ağlarıyla ilişkilidir. Anadolu’da yaşayan Rum, Ermeni, Süryani ve başka topluluklarla karşılaşmalar da bu tarihin parçasıdır. Bütün yerel halkın aynı tepkiyi verdiğini varsaymak yerine bölge, zaman ve somut ilişki kanıtı araştırılır.",
        ],
      },
      {
        title: "Malazgirt ile kuruluş tarihini ayır",
        paragraphs: [
          "1071 Malazgirt, Büyük Selçuklu Sultanı Alp Arslan ile Bizans İmparatoru Romen Diyojen’in karşılaşmasıdır. Zafer, Anadolu’da Türk göçleri ve yerleşimin hızlanması bakımından bir dönüm noktasıdır. Türkiye Selçuklu Devleti’nin kuruluşu ise 1077 ve Kutalmışoğlu Süleyman Şah ile ilişkilendirilir. Bir savaşla ayrı devletin kuruluşu aynı olay değildir.",
          "İznik ilk merkez olarak, daha sonra Konya merkezli dönem ise değişen siyasi-askerî koşullarla öğrenilir. I. Haçlı Seferi sürecindeki İznik kaybı bu değişimde önemlidir. Büyük Selçuklu ve Türkiye Selçuklu devletleri arasında tarihsel bağ bulunur; ortak ad, iki siyasi yapının bütün kişi, merkez ve olaylarının aynı olduğu anlamına gelmez.",
        ],
      },
      {
        title: "İlk beylikleri kendi merkezleriyle tanı",
        paragraphs: [
          "İlk Anadolu beylikleri farklı bölgelerde siyasi ve kültürel faaliyet yürütmüştür. Saltuklular Erzurum; Danişmentliler Sivas, Tokat ve Niksar; Mengücekliler Erzincan ve Divriği; Artuklular Mardin, Hasankeyf ve Harput çevreleriyle düşünülür. Çaka Beyliği İzmir ve denizcilik faaliyetleriyle ayırt edilir.",
          "Yağıbasan Medresesi Danişmentliler, Divriği Ulu Camii ve Darüşşifası Mengücekliler, Malabadi Köprüsü Artuklular bağlamında öğrenilir. Aynı coğrafi dönüşüme katkı vermeleri tek hanedan veya tek devlet oldukları anlamına gelmez. Farklı kolların siyasi ömürleri de tek bir son tarihe indirgenmez. Bir eserin yeri, yaptıranı ve tarihini birlikte kullanmak onu otomatik Türkiye Selçuklularına atfetmeyi önler.",
        ],
      },
      {
        title: "Üç baskı hattını karıştırma",
        paragraphs: [
          "Bizans, Haçlı kuvvetleri ve Moğollar farklı siyasi aktörlerdir. 1176 Miryokefalon, II. Kılıç Arslan’ın Bizans’a karşı başarısıyla; 1230 Yassıçemen Harzemşahlarla; 1243 Kösedağ Moğollarla mücadele bağlamında öğrenilir. Ortak savaş sözcüğü bu üç gelişmeyi aynı rakip ve aynı sonuç hâline getirmez.",
          "Miryokefalon, Anadolu’daki Türk kalıcılığını güçlendiren bir dönüm noktası olarak değerlendirilir. Bu, bütün Bizans ilişkilerinin veya bütün yerel çatışmaların o tarihte sona ermesi değildir. Haçlı baskısı ile Moğol üstünlüğünün oluşması da farklı dönem ve mekanizmalar taşır. Tarih, karşı güç ve etkiyi aynı satırda yazmak yalnız olay adını hatırlamaktan daha güvenli bir ayrım sağlar.",
        ],
      },
      {
        title: "Devletleşmenin görünür araçları",
        paragraphs: [
          "Sultan ve Divân-ı Saltanat merkezî karar ve yönetim süreçleriyle; vezir bu düzenin yürütülmesiyle ilişkilidir. Atabey, meliklerin eğitim ve yönetim deneyiminde görev alır. Unvanın varlığı hangi yetkilerin hangi kişi tarafından kullanıldığını araştırmaya başlangıç sağlar; devletin her dönemde aynı merkezî güçte olduğunu tek başına göstermez.",
          "İkta belirli kamu gelirlerinin hizmet karşılığında tahsisi bağlamındadır. Modern özel toprak mülkiyetinin bütünüyle aynısı değildir; gelirden yararlanma, hizmet ve denetim ilişkileri birlikte incelenir. Göçmenlerin yerleşmesi de yalnız askerî emirle açıklanmaz. Geçim, su, üretim, yerel toplum ve yönetim kurumları kalıcılığın farklı koşullarıdır.",
        ],
      },
      {
        title: "Kervansaraydan ticaret ve şehir ağına",
        paragraphs: [
          "Kervansaraylar yol üzerindeki konaklama ve güvenlik ihtiyaçlarını karşılayarak ticaretin sürekliliğine katkı yapabilir. Köprü, pazar, liman ve yol bağlantıları bu ağın başka parçalarıdır. Bir yapıyı yalnız taş ve plan olarak değil, onu kullanan insanlarla ve sağlanan hizmetle birlikte düşün.",
          "Vakıf, belirli gelirlerin dinî ve sosyal hizmetlerin sürdürülmesine ayrılmasıyla ilişkilidir. Medrese öğretim, darüşşifa sağlık hizmetiyle ayırt edilir. Yapının ilk kurulmasıyla giderlerinin yıllar boyunca karşılanması farklı ihtiyaçlardır. Etkinlikte kurum kaydı ve finansman bağını ayrı seçerek bu ilişkiyi incele; bir bina bütün nüfusun aynı meslek, dil veya yaşam biçimine geçtiğini göstermez.",
        ],
      },
      {
        title: "Zayıflama, bağlılık ve sona erme ayrı tarihlerdir",
        paragraphs: [
          "1240 Babaîler Ayaklanması sosyal-ekonomik gerilimler, dinî-sosyal ilişkiler ve merkezî otorite sorunlarıyla birlikte incelenir. 1243 Kösedağ yenilgisi ise Moğol üstünlüğü ve Türkiye Selçuklu merkezî gücünün sarsılması bakımından önemli bir kırılmadır. Aynı dönemdeki iç gerilim ve dış baskı farklı ama ilişkili etkenlerdir.",
          "Devletin zayıflaması, bağlılığın artması ve siyasi varlığının sona ermesi aynı gün olmak zorunda değildir. Ders kronolojisinde Türkiye Selçuklu döneminin sonu 1308 ile verilir; bunu tek bir güne ait resmî fesih belgesi varmış gibi anlatmak gerekmez. Merkez zayıflarken beyliklerin hareket alanı artabilir. İlk beylikler ile ikinci dönem beyliklerini aynı kuruluş bağlamına yerleştirme.",
        ],
      },
      {
        title: "Kanıtı hem zamana hem coğrafyaya bağla",
        paragraphs: [
          "Bir kaynak tarihsel olarak doğru bir olay anlatırken sorunun verdiği dönem veya bölgeye uymayabilir. Önce aralığın başlangıç ve bitişini, ardından olayın yılını ve yerini yaz. 1277’de Konya ve Türkçe kararı bağlamındaki gelişme, 1243’ten sonradır; bu ayrım olayın öneminden bağımsızdır.",
          "Yerleşmenin kalıcılığı sorulduğunda yalnız savaş listesi yerine üretim, göç, güvenlik, kurum ve yerel etkileşimden gerekçeler kurulur. Bir tarihin önce gelmesi, sonraki gelişmenin tek ve yeterli nedenini göstermez. Kanıtın açık söylediğiyle olası yorumu ayır; “ilk, tek, tamamı” gibi geniş iddialar için aynı genişlikte veri gerekir.",
        ],
      },
      {
        title: "Keşif, akın, göç ve yerleşme",
        paragraphs: [
          "Keşif çevrenin imkân ve koşullarını tanımayı, akın belirli bir askerî hareketi, göç nüfusun yer değiştirmesini, yerleşme ise yeni yerde yaşam ve üretimin sürmesini anlatır. Aynı süreçte ilişki kurabilirler; biri görüldüğünde diğerlerinin tamamı otomatik gerçekleşmiş sayılmaz.",
          "Bir topluluğun belirli bir bölgeye tekrar gelmesiyle burada kalıcı köy kurması farklı kanıt gerektirir. Konut, üretim, mezar, su kullanımı ve düzenli işlemler yerleşmeyi farklı yönlerden gösterebilir. Yeni bir yerleşim mevcut bütün halkın kaybolduğunu kanıtlamaz. Birlikte yaşam, yerel iş birliği, çatışma ve kültürel alışveriş bölgeden bölgeye farklı biçimler alabilir.",
        ],
      },
      {
        title: "İlk beyliklerde çok merkezli siyasi hayat",
        paragraphs: [
          "Anadolu’daki ilk beylikler kendi merkezleri ve hanedanlarıyla incelenir. Bir beylik farklı kollara ayrılabilir; bir merkezdeki siyasi değişim bütün kolların aynı anda sona erdiği anlamına gelmez. Saltuklu, Danişmentli, Mengücekli ve Artuklu faaliyetleri bu çok merkezli yapının farklı yönlerini gösterir.",
          "Beylikler arasında rekabet bulunduğu gibi ortak tehditlere karşı dayanışma da görülebilir. İlişkinin bir dönemde iş birliği olması bütün zamanlar için değişmez ittifak demek değildir. Bir mimari eserin başka bir devlet döneminde onarılması da ilk yaptıranı değiştirmez. Siyasi, kültürel ve mimari süreklilikler aynı zaman çizgisinde farklı aşamalar taşıyabilir.",
        ],
      },
      {
        title: "Haçlı seferlerinin çoklu nedenleri",
        paragraphs: [
          "Haçlı seferlerine katılımda dinî hedefler, siyasi güç arayışları, Bizans’ın yardım talepleri ve ekonomik beklentiler birlikte incelenir. Bütün katılımcıların tek bir aynı amaç taşıdığı varsayılmaz. Kilise, soylu, tüccar ve farklı hükümdarlar aynı harekette farklı önceliklerle bulunabilir.",
          "Anadolu güzergâhındaki askerî hareketler güvenliği, üretimi ve nüfus hareketlerini etkileyebilir. Bizans’ın amacıyla bir Haçlı grubunun kararı da her aşamada aynı olmak zorunda değildir. 1204’te İstanbul’un Haçlılarca alınması, bütün aktörlerin sürekli ortak çıkarla hareket ettiği basit şemayı sınırlar. Seferler farklı dönemler ve farklı ittifaklarla ele alınır; tek bir savaş gibi okunmaz.",
        ],
      },
      {
        title: "İznik’ten Konya’ya değişen merkez",
        paragraphs: [
          "I. Haçlı Seferi sırasında İznik’in kaybedilmesi ve Konya’nın merkez olarak öne çıkması, askerî baskıyla yönetim coğrafyası arasındaki ilişkiyi gösterir. Bir merkez değişikliği yalnız bina taşımak değildir; savunma, ulaşım, görevli ve kaynak bağlantıları da yeniden düzenlenir.",
          "Aynı devletin farklı merkezlerde yönetilmesi onun her kurumunun o gün sıfırdan kurulduğu veya bütün siyasi varlığının sona erdiği anlamına gelmez. Merkezin adı bir gelişmeyi tarihlendirmeye yardımcı olabilir; fakat bir şehir farklı dönemlerde farklı siyasi aktörlerle ilişkili olabilir. Konya adını gördüğünde tarih ve yönetici bilgisini de denetle.",
        ],
      },
      {
        title: "Miryokefalon’da hangi sonuç güçlendi?",
        paragraphs: [
          "1176 Miryokefalon’da Türkiye Selçuklu Sultanı II. Kılıç Arslan ile Bizans kuvvetleri karşılaşmıştır. Zafer, Bizans’ın Anadolu üzerindeki hedefleri ve Türk yerleşiminin kalıcılığı bakımından önemli bir dönüm noktasıdır. Malazgirt’in 1071 tarihiyle aynı savaş değildir; arada farklı siyasi gelişmeler vardır.",
          "Ders kaynaklarının “Anadolu’nun Türk yurdu olduğunun kesinleşmesi” ifadesi, tarihsel önemi özetleyen bir çerçevedir. Bütün bölgelerin aynı yönetim altına girmesi, bütün nüfusun aynı dili konuşması veya bütün mücadelelerin sona ermesi biçiminde genişletilmez. Bir siyasi başarının etkisi, hangi aktörün hangi hedefinin değiştiği gösterilerek daha açıklayıcı biçimde anlatılır.",
        ],
      },
      {
        title: "Melik, atabey ve merkezî karar",
        paragraphs: [
          "Melik, hanedan mensubunun yönetim deneyimi ve bölgesel görevleri bağlamında; atabey ise bu eğitime eşlik eden deneyimli görevli olarak düşünülür. Eğitim ve görev paylaşımı geniş bir alanın yönetilmesine katkı verebilir. Aynı düzen zamanla yerel güçlerin hareket alanını da etkileyebilir.",
          "Divân-ı Saltanat veya Divân-ı Âlâ devlet işlerinin görüşülüp düzenlendiği merkezî kurumla ilişkilidir. Vezir ve başka görevliler farklı işlevler üstlenir. Pervane, arazi işlerini ve bu işlere ilişkin menşur ve beratların hazırlanmasını düzenleyen görevliyle ilişkilidir; atabeyin meliklere eşlik eden eğitim göreviyle aynı iş değildir. Bir unvanın metinde bulunması bütün siyasi yetkinin o görevliye geçtiğini göstermez. Atama, görevden alma, gelir ve emir ilişkileri birlikte incelenerek merkezle yerel yapı arasındaki bağ araştırılır.",
        ],
      },
      {
        title: "İkta gelir, hizmet ve denetim ilişkisidir",
        paragraphs: [
          "İkta düzeninde belirli bir gelirin tahsis edilmesiyle hizmet arasında ilişki kurulur. Gelirin toplandığı toprağın bütün mülkiyet haklarının modern anlamda kişiye satıldığı sonucu çıkarılmaz. Kaynak neyin tahsis edildiğini, hangi hizmetin beklendiğini ve hangi denetimin bulunduğunu açıklıyorsa yorum bu verilerle yapılır.",
          "Askerî ve idari ihtiyaçların karşılanması gelir düzenine bağlı olabilir. Bununla birlikte tahsis tutarı tek başına görevlinin fiilen kaç asker çıkardığını veya bütün bölgenin refahını göstermez. Hizmet kaydı ve uygulama verisi ayrıca gerekir. İkta ile vakıf ikisi de gelirle ilgili olsa da hizmet ve amaç ilişkileri farklıdır; kurumları yalnız ortak toprak sözcüğüne göre eşitleme.",
        ],
      },
      {
        title: "Şehir, pazar ve ticaretin bağlantıları",
        paragraphs: [
          "Şehirlerde üretim, alışveriş, yönetim ve öğretim birbirini destekleyen faaliyetlerdir. Yol güvenliği ve konaklama, pazarın başka merkezlerle bağını güçlendirebilir. Köprü bir geçiş engelini azaltırken liman kara ve deniz taşımacılığı arasında bağlantı sağlar. Bu işlevler tek bir yapının adıyla değil ağ içindeki yeriyle anlaşılır.",
          "Bir ticaret yolundaki kurumun etkisini araştırmak için kullanım, gider, tüccar ve pazar kayıtları birlikte değerlendirilebilir. Yol açılınca bütün nüfusun tüccar olması gerekmez; tarım ve zanaat sürer. Ağın gelişmesi kültürel karşılaşmaya da ortam sağlayabilir. Ancak bağlantı çizgisi her iki merkezin aynı siyasi yönetimde bulunduğunu veya aynı kültüre dönüştüğünü tek başına göstermez.",
        ],
      },
      {
        title: "Vakıf gelirinden kalıcı hizmete",
        paragraphs: [
          "Vakıf belirli gelirleri bir hizmetin sürdürülmesine bağlayabilir. Bir medresenin öğretim gideri, bir darüşşifanın bakım ve tedavi gideri, bir yol yapısının konaklama ihtiyacı farklı kalemlerdir. Binanın inşasıyla bu hizmetlerin her yıl sürmesi iki ayrı kurumsal sorundur.",
          "Bir vakfiye öngörülen gelir ve görevleri, bir hesap kaydı belirli dönemdeki kullanımını gösterebilir. Yazılı düzenleme hizmetin her yerde ve her yılda eksiksiz uygulandığını tek başına kanıtlamaz. İki kayıt birlikte daha sağlam inceleme sağlar. Etkinlikte finansman bağı açıkken hangi hizmetin desteklendiğini, bağ kaldırıldığında ise hangi sonucun artık doğrudan gösterilmediğini karşılaştır.",
        ],
      },
      {
        title: "Eser, yaptıran ve sonraki kullanım",
        paragraphs: [
          "Medrese öğretim, darüşşifa sağlık, köprü ulaşım, cami ibadet ve sosyal ilişki bağlamında incelenebilir. Aynı mimari bütün birden fazla işlevi bir arada taşıyabilir. Bir eserin yeri, kitabesi, yaptıranı ve kullanılma biçimi, siyasi ve kültürel tarih hakkında birbirini tamamlayan kanıtlardır.",
          "Kültürel üretimi yalnız bina adlarıyla sınırlama: Artuklu çevresindeki Cezerî, su ve mekanik parçalarla çalışan düzenekleriyle teknik tasarım bağlamında incelenir. Bu örnek bütün modern makinelerin aynı biçimde o dönemde yapıldığı veya tek kişi tarafından icat edildiği iddiası değildir. İlk yapı tarihiyle onarım, ek bina veya yeniden kullanım tarihi ayrılır. Bir eserin daha sonra başka bir siyasi yapı tarafından onarılması ilk yaptıranı değiştirmez. Eserin bugün ayakta bulunması da hangi yüzyıllarda nasıl kullanıldığını tek başına açıklamaz. Malzeme, yazı, plan ve belge karşılaştırmalarıyla her iddia kendi zamanına ve işlevine bağlanır.",
        ],
      },
      {
        title: "Moğol üstünlüğü ve farklı düzeylerde bağlılık",
        paragraphs: [
          "1230 Yassıçemen Harzemşahlarla mücadele, 1240 Babaîler Ayaklanması iç gerilim, 1243 Kösedağ ise Moğollar karşısındaki yenilgi bağlamındadır. Bu gelişmeler birbiriyle ilişkili koşullar oluşturabilir; tek bir olayın bütün sonraki sonucu tek başına açıklaması gerekmez. Merkezî gücün değişimi askerî, mali ve siyasi kanıtlarla araştırılır.",
          "1243 sonrasında Moğol üstünlüğü ve daha sonraki İlhanlı idaresi ayrı tarihsel aşamalardır; İlhanlı adını o siyasi yapının oluşmasından önceki bütün olaylara taşımamak gerekir. Hükümdar unvanının sürmesiyle karar bağımsızlığı aynı değişken değildir. Vergi, atama ve dış emir ilişkilerindeki değişim, siyasi varlık sürerken yetkinin sınırlandığını gösterebilir.",
        ],
      },
      {
        title: "Beylikler ve kültürel devamlılık",
        paragraphs: [
          "Merkezî otoritenin zayıfladığı alanlarda bölgesel beylerin hareket alanı artabilir. Kösedağ sonrasında güçlenen ikinci dönem beylikleri, Malazgirt sonrasındaki ilk beyliklerle aynı kuruluş ortamına ait değildir. Siyasi parçalanma, önceki bütün şehir, zanaat ve kültür ağlarının aynı gün ortadan kalkması demek de değildir.",
          "XIII. yüzyıl Anadolu’sunda Mevlânâ, Yunus Emre ve Hacı Bektaş-ı Veli gibi isimler tasavvuf ve dinî-sosyal öğretim çevreleriyle ilişkilendirilir. Her birinin kendi yaşamı ve çevresi vardır; etkilerini yalnız tek bir savaşın zorunlu sonucu veya bütün halkın aynı uygulaması sayma. Bir siyasi son tarihi, kurum ve toplulukların başka yapılarda devamını araştırmanın başlangıcı olabilir. 1308 bu ünitenin ders kronolojisinde Türkiye Selçuklu siyasi döneminin son işaretidir. Sonraki yapıların her birinin ayrı tarihi bulunur. Yeni bir belge önceki yorumu değiştirdiğinde, tarih sırasını zorunlu tek neden olarak korumak yerine açıklamayı yeni kanıtın kapsamıyla yeniden kur.",
        ],
      },
    ],
    examples: [
      {
        title: "İlk yaptıran ile onaranı ayır",
        prompt:
          "Kurmaca iki kitabe kaydında aynı eğitim yapısının 1180’de Beylik A tarafından yaptırıldığı, 1225’te Yönetim B tarafından onarıldığı yazıyor. Bugün yalnız 1225 tarihli yazı daha görünür durumda. Bir katalog yapının ilk yaptıranını B diye verirse nasıl düzeltilir?",
        strategy: "İki kayıtta geçen eylem ve tarihi ayrı karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "1180 kaydının eylemi ilk yaptırma, 1225 kaydının eylemi onarımdır.",
          },
          {
            label: "2. adım",
            explanation:
              "Daha görünür veya daha yeni tarihli yazı, önceki yapım kaydını kendiliğinden geçersiz kılmaz.",
          },
          {
            label: "3. adım",
            explanation:
              "Katalog A’yı ilk yaptıran, B’yi belirtilen onarımın yürütücüsü olarak ayrı alanlarda göstermelidir.",
          },
        ],
        answer: "İlk yapı A/1180; sonraki onarım B/1225 olarak ayrılmalıdır.",
        check: "Düzeltme her iki belgeyi de kendi eylem ve zamanıyla korur.",
        pitfall:
          "Bugünkü görünürlüğü veya son onarım tarihini ilk sahiplik ve yapımın yerine geçirme.",
      },
      {
        title: "Kesin yıl yerine tarih aralığı verilirse",
        prompt:
          "Özgün öğretim envanterinde bir yerel işlem yalnız 1236–1247 aralığına tarihlenebiliyor. Araştırmanın hedef aralığı 1071–1243’tür. İşlemin hedef aralığın kesin içinde, kesin dışında veya kısmen olası olduğunu belirle.",
        strategy: "İki aralığın kesişimini ve taşan kısmını ayrı bul.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "1236–1243 kısmı iki aralığın ortak bölümüdür. 1244–1247 kısmı ise hedef aralığın dışındadır.",
          },
          {
            label: "2. adım",
            explanation:
              "İşlemin kesin yılı bilinmediği için ortak bölüme de dışarıdaki bölüme de ait olabilir.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu yüzden kesin içeride veya kesin dışarıda yerine kısmen olası olarak sınıflanır; daha dar tarihleme gerekir.",
          },
        ],
        answer: "Hedef aralıkta olması mümkündür ama kesin değildir.",
        check:
          "Hem 1240 içeride örneğini hem 1246 dışarıda örneğini aynı verilen tarih aralığından seçebilirsin.",
        pitfall: "Yaklaşık aralığı kendiliğinden tek bir kesin yıla indirgeme.",
      },
      {
        title: "Gelir tahsisi ile kalan hesap",
        prompt:
          "Tamamı kurmaca bir ikta hizmet kaydı 90 hesap birimi gelir tahsis ediyor. Belgede bunun 54 birimi askerî hizmete, 24 birimi idari göreve ayrılmış. Başka gider verilmemiştir. Kalanı bul ve bu hesapla toprağın kişisel mülkiyete geçtiğinin kanıtlanıp kanıtlanmadığını açıkla.",
        strategy:
          "Önce gelir hesabını, sonra hukuki hakkın niteliğini değerlendir.",
        steps: [
          {
            label: "1. adım",
            explanation: "Listelenen hizmet giderleri 54+24=78 birimdir.",
          },
          {
            label: "2. adım",
            explanation:
              "Gelirin 90−78=12 birimi bu iki kalemden sonra kalır; yeni bir gider kendiliğinden eklenmez.",
          },
          {
            label: "3. adım",
            explanation:
              "Metin gelir tahsisini anlatır. Toprağın bütün mülkiyet haklarının kişiye devredildiğini gösteren ayrı bir hüküm yoktur.",
          },
        ],
        answer:
          "12 hesap birimi kalır; tam kişisel toprak mülkiyeti bu hesaptan çıkmaz.",
        check:
          "54+24+12=90 denkliği sağlanır. Mali kalanla hukuki hak farklı sorulardır.",
        pitfall:
          "Bir gelirden yararlanmayı bütün mülkiyet yetkilerinin devri sayma.",
      },
      {
        title: "Ticaret açıklamasında eksik mekanizma",
        prompt:
          "Özgün karşılaştırmada bir yol üstünde yeni konaklama yapısı bulunduğu, aynı dönemde yakındaki pazarda işlem kaydı arttığı görülüyor. Araştırmacı artışın yalnız bu yapıdan kaynaklandığını söylüyor. Bu açıklamayı sınamak için hangi ek kanıtlar yardımcı olur?",
        strategy:
          "Bağlantıyı mümkün kılan mekanizmayla alternatif etkenleri birlikte belirle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Konaklama ve güvenli geçiş, tüccarların yolu kullanmasını kolaylaştırabilecek bir mekanizmadır.",
          },
          {
            label: "2. adım",
            explanation:
              "Kullanıcı kayıtları, giderler ve güzergâh tercihleri yapının fiilî işlevini sınamaya yardım eder.",
          },
          {
            label: "3. adım",
            explanation:
              "Başka yolun kapanması, vergi değişikliği veya ürün arzı gibi etkenler de incelenir; aynı tarihte görülme tek nedeni kanıtlamaz.",
          },
        ],
        answer:
          "Kullanım ve yol tercihleriyle alternatif ekonomik-siyasi koşullar birlikte araştırılmalıdır.",
        check:
          "Ek belge gerçekten “yapı→yolun kullanımı→pazar işlemi” bağındaki bir aşamayı veya başka açıklamayı sınamalıdır.",
        pitfall: "Eşzamanlı iki bulguyu tek ve yeterli nedenin tamamı sayma.",
      },
      {
        title: "Unvan sürerken yetki değişebilir",
        prompt:
          "Kurmaca bir siyasi dosyada ilk kayıtta hükümdarın görevliyi kendi kararıyla atadığı, ikinci kayıtta aynı unvanı kullandığı hâlde atama için dış otoritenin onayının gerektiği yazıyor. “Unvan aynıysa siyasi bağımsızlık da aynıdır” iddiasını denetle.",
        strategy: "Temsil adını fiilî karar koşulundan ayır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Unvan iki kayıtta da sürer; bu bir temsil devamlılığıdır.",
          },
          {
            label: "2. adım",
            explanation:
              "Atamanın dış onaya bağlanması karar yetkisinin koşulunda değişim olduğunu gösterir.",
          },
          {
            label: "3. adım",
            explanation:
              "İki kayıt birlikte, siyasi varlık ve unvan sürerken belirli bir yetkinin sınırlanabildiğini destekler; diğer bütün yetkilerin durumu ayrıca araştırılır.",
          },
        ],
        answer: "Aynı unvan tek başına aynı bağımsızlık düzeyini göstermez.",
        check:
          "İddiayı sınayan doğrudan fark atama koşuludur; unvanın devamı yok sayılmamıştır.",
        pitfall:
          "Devlet adının veya unvanın sürmesini bütün yetkilerin aynı kaldığıyla eşitleme.",
      },
      {
        title: "Hizmet ağıyla nüfus iddiasını ayır",
        prompt:
          "Tamamı kurmaca bir yerleşim dosyasında bir medrese için 12 öğrenciye ödeme, bir sağlık yapısı için 18 hastaya yardım ve bir yol yapısı için konaklama gideri kaydı vardır. Bu dosyadan yerleşimdeki herkesin öğrenci, hasta veya tüccar olduğu sonucu çıkar mı?",
        strategy:
          "Her kaydın yararlanıcı grubuyla bütün yerleşim nüfusunu ayrı tut.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İki sayı yalnız belirtilen hizmetlerin kayıtlı yararlanıcılarını anlatır; bütün yerleşimin nüfusu verilmemiştir.",
          },
          {
            label: "2. adım",
            explanation:
              "Bir kişi birden fazla hizmetten yararlanmış olabilir; 12 ve 18 otomatik ayrı kişiler veya tüm nüfus olarak toplanmaz.",
          },
          {
            label: "3. adım",
            explanation:
              "Kayıtlar eğitim, sağlık ve yol hizmetlerinin varlığına kanıt sağlar; herkesin mesleği veya dili için ek nüfus ve kullanım verisi gerekir.",
          },
        ],
        answer:
          "Hayır. Hizmetlerin varlığı gösterilir; bütün nüfusun niteliği ve sayısı belirlenmez.",
        check:
          "İddiadaki “herkes” için gereken toplam nüfus ve kapsam bilgisi dosyada yoktur.",
        pitfall:
          "Kurumun işlevini bütün yerleşimdeki insanların tek ortak özelliği sayma.",
      },
    ],
    recall: [
      {
        prompt: "1071 ve 1077 hangi farklı eylemleri anlatır?",
        answer:
          "1071 Büyük Selçuklu-Bizans askerî dönüm noktası; 1077 Türkiye Selçuklu kuruluşudur.",
      },
      {
        prompt: "Bir eserin sonraki onarımı ilk yaptıranı değiştirir mi?",
        answer:
          "Hayır. Yapım, onarım ve yeniden kullanım ayrı eylem ve tarihlerle kaydedilir.",
      },
      {
        prompt:
          "İlk beylikler ile ikinci dönem beyliklerinin kuruluş bağlamı aynı mı?",
        answer:
          "Hayır. İlki Malazgirt sonrası, ikincisi Kösedağ sonrası merkezî gücün değişmesiyle ilişkilidir.",
      },
      {
        prompt: "İkta gelir tahsisi hangi iddiayla otomatik eşit değildir?",
        answer:
          "Toprağın bütün modern kişisel mülkiyet haklarının tahsis sahibine devredilmesiyle.",
      },
      {
        prompt: "Kösedağ sonrasında unvanın sürmesi neyi tek başına göstermez?",
        answer:
          "Atama, vergi veya dış ilişkilerdeki bütün karar yetkisinin eskisiyle aynı olduğunu.",
      },
      {
        prompt: "Bir tarih aralığı hedef aralığa kısmen taşıyorsa ne gerekir?",
        answer:
          "Kesin içeride veya dışarıda demeden önce daha dar tarihleme; kesişim yalnız olasılığı gösterir.",
      },
    ],
    source:
      "MEB Tarih 9 ve 10 ders kitaplarının ilgili üniteleri, OGM Dersler Cepte ve kaynakları karşılaştırılan Aurelia konu kâğıtları temelinde hazırlanmış özgün anlatım. Etkinliklerdeki kurmaca kayıtlar öğretim içindir; gerçek belge alıntısı veya resmî sınav sorusu değildir.",
  },
];
type HistoryBItem026 = {
  prompt: string;
  options: string[];
  answer: number;
  hint: string;
  explanation: string;
  guidance: NonNullable<Question["guidance"]>;
};
const historyBSets026: {
  id: string;
  base: string;
  title: string;
  questions: HistoryBItem026[];
}[] = [
  {
    id: "ortacag-dunya-ileri",
    base: "ortacag-dunya",
    title: "Orta Çağ dünyası: ileri kurum ve kanıt soruları",
    questions: [
      {
        prompt:
          "Kurmaca bir Avrupa bağlılık şemasında soylu B, A’dan gelir hakkı alıp ona askerî hizmet veriyor; B ayrıca C’ye gelir hakkı verip ondan hizmet alıyor. B’nin iki ilişkideki konumu sırasıyla nedir?",
        options: [
          "A’ya göre ücretli asker, C’ye göre kadı.",
          "A’ya göre vassal, C’ye göre senyör.",
          "A’ya göre senyör, C’ye göre vassal.",
          "İki ilişkide de bağımsız kral.",
          "İki ilişkide de yalnız serf.",
        ],
        answer: 1,
        hint: "Her ilişkide gelir hakkını verenle hizmeti sunanı ayrı yaz.",
        explanation:
          "B ilk ilişkide hizmet veren bağlı kişi, ikincide ise gelir hakkı sağlayan üst kişidir.",
        guidance: {
          knowledge: ["Senyör ve vassal ilişkiye göre belirlenen konumlardır."],
          strategy:
            "B’yi iki ayrı ikili ilişkinin içine yerleştir; her bağlantıda gelirin ve askerî hizmetin akış yönünü işaretleyerek konum adlarını denetle.",
          steps: [
            "Her ilişkide gelir hakkını verenle hizmeti sunanı ayrı yaz.",
            "A–B ilişkisinde B hizmet sunar; B–C ilişkisinde B hak sağlar.",
            "Aynı kişi iki farklı ilişkide farklı konumda olabilir; tek bir etiketi her bağlantıya yayma.",
          ],
          optionReasons: [
            "Para maaşı ve yargı görevi verilmemiştir; gelir hakkı ve bağlılık ilişkisi anlatılır.",
            "Doğru. B ilk ilişkide hizmet veren bağlı kişi, ikincide ise gelir hakkı sağlayan üst kişidir.",
            "Üst-alt yönünü ters çevirir; gelir hakkını ilkinde A, ikincide B sağlar.",
            "İlk ilişkide A’ya açıkça hizmet yükümlülüğü vardır; kral olduğu da söylenmez.",
            "Serf toprağa bağlı köylü statüsüdür; soruda B’nin soylular arası gelir ve askerî hizmet ilişkileri verilmiştir.",
          ],
          commonError:
            "Bir kişinin ağ içindeki bütün bağlarda aynı statüde olacağını varsayma.",
          check: "B, A’ya hizmet verir; C’den hizmet alır.",
        },
      },
      {
        prompt:
          "Bir öğretim metninde yerel vergi görevlisini kral atıyor, hesabını merkez denetliyor ve kral görevden alabiliyor. Yalnız görevlinin taşrada çalışmasına bakıp “merkezî otorite kesin yoktur” denmesi neden sorunludur?",
        options: [
          "Merkezin atama ve denetim yetkileri göz ardı edilmiştir.",
          "Kralın bulunması her durumda tam merkezîleşmeyi kanıtlar.",
          "Taşrada vergi toplanması tarihsel olarak imkânsızdır.",
          "Vergi memuru varsa bütün halk genel oy kullanır.",
          "Görevden alınabilen kişi mutlaka toprağın sahibidir.",
        ],
        answer: 0,
        hint: "Yalnız görev yerini değil yetkinin kaynağını bul.",
        explanation:
          "Yerelde görev yapılmasıyla bağımsız yerel iktidar aynı değildir; verilen atama, hesap ve görevden alma bağları merkezî denetime kanıttır.",
        guidance: {
          knowledge: ["Yerel uygulayıcı ile bağımsız yerel güç ayrılır."],
          strategy:
            "Atama, hesap sorma ve görevden alma için ayrı yetki sütunları aç; görevlinin bulunduğu yerin bu yetkiler hakkında tek başına ne söylediğini sınayarak seçenekleri ele.",
          steps: [
            "Yalnız görev yerini değil yetkinin kaynağını bul.",
            "Atama, hesap denetimi ve görevden alma kralda olduğu için görevli bağımsız bey gibi tanımlanmamıştır.",
            "Bu kanıt merkezî denetime ilişkindir; bütün yönetim alanlarının eksiksiz merkezîleştiği eklenmez.",
          ],
          optionReasons: [
            "Doğru. Yerelde görev yapılmasıyla bağımsız yerel iktidar aynı değildir; verilen atama, hesap ve görevden alma bağları merkezî denetime kanıttır.",
            "Unvan tek başına yeterli değildir; bu örnekte özel yetki bağları verilmiştir.",
            "Sorunda toplamanın yeri değil, kimin adına ve hangi denetimle yapıldığı önemlidir.",
            "Mali görev ve denetim bilgileri seçme hakkını açıklamaz.",
            "Görevden alma idari bir yetkidir; kişisel toprak mülkiyeti verilmez.",
          ],
          commonError:
            "Taşra sözcüğünü tek başına merkezî zayıflık ölçütü sayma.",
          check: "Üç denetim bağı da metinde açıkça merkezle ilişkilidir.",
        },
      },
      {
        prompt:
          "Bir tarım toplumunda geçim için ayrılan ürünün üzerindeki bölüm depolanıyor ve bununla sürekli tarla dışında çalışan zanaatkârların beslenmesi destekleniyor. Bu bağlantının doğrudan açıkladığı süreç hangisidir?",
        options: [
          "Artı ürünün iş bölümünü desteklemesi.",
          "Tarımsal üretimin tamamen bitmesi.",
          "Bütün üreticilerin eşit gelir elde etmesi.",
          "Bütün hukuki statülerin kaldırılması.",
          "Yalnız deniz ticaretinin başlaması.",
        ],
        answer: 0,
        hint: "Geçim payını aşan bölümü artı ürün olarak adlandır.",
        explanation:
          "Geçim ihtiyacını aşan ürün, herkesin sürekli tarımda çalışması gerekmeden başka işlerde uzmanlaşmaya kaynak sağlayabilir.",
        guidance: {
          knowledge: [
            "Artı ürün uzmanlaşmanın maddi koşullarına katkı sağlayabilir.",
          ],
          strategy:
            "Üretimden geçime ve depoya ayrılan payları bir kaynak akışıyla göster; tarla dışında çalışan kişilerin bu akıştan nasıl beslendiğine odaklan.",
          steps: [
            "Geçim payını aşan bölümü artı ürün olarak adlandır.",
            "Bu ürünün tarım dışında çalışanları desteklediğini izle.",
            "Sonuç uzmanlaşma ve iş bölümüyle ilgilidir; gelir eşitliği veya tarımın sonu eklenmez.",
          ],
          optionReasons: [
            "Doğru. Geçim ihtiyacını aşan ürün, herkesin sürekli tarımda çalışması gerekmeden başka işlerde uzmanlaşmaya kaynak sağlayabilir.",
            "Depolanan fazlanın kaynağı tarımdır; zanaatın gelişmesi tarımın yok olması değildir.",
            "Ürünün kimlere hangi miktarda dağıtıldığı belirtilmez.",
            "Beslenme kaynağı ile hukuki statünün eşitlenmesi farklı konulardır.",
            "Deniz, liman veya taşımacılık türüne ilişkin veri yoktur.",
          ],
          commonError:
            "Uzmanlaşmadan bütün toplum için eşitlik sonucu çıkarma.",
          check:
            "Metindeki kaynak ve desteklenen faaliyet aynı gerekçe içinde bağlanmıştır.",
        },
      },
      {
        prompt:
          "Bir kurmaca kayıt, toprağa bağlı bir köylünün ürün ve çalışma yükümlülüklerini ayrıntılı veriyor; evlenme, miras ve ayrılma haklarını vermiyor. Bu kayıttan hangi yaklaşım uygundur?",
        options: [
          "Haklar yazılmadığı için hiç yükümlülük yoktur demek.",
          "Bağımlılık ilişkisini saptayıp verilmeyen diğer hakları ayrıca araştırmak.",
          "Köylüyü askerî hizmet veren soylu vassal saymak.",
          "Köylünün işvereniyle her an serbestçe sözleşme değiştirdiğini varsaymak.",
          "Köylünün bütün haklarının hiçbir yerde bulunmadığını söylemek.",
        ],
        answer: 1,
        hint: "Açıkça verilen üretim ve çalışma bağını ayır.",
        explanation:
          "Kayıt belirli yükümlülükleri gösterir; serfliği her yerde kölelikle veya modern ücretli çalışmayla bütünüyle eşitlemeye yetmez.",
        guidance: {
          knowledge: [
            "Bir statünün hakları somut dönem ve kayıttan araştırılır.",
          ],
          strategy:
            "Kaydın bildirdiği yükümlülükleri ve bilgi vermediği hakları iki sütuna ayır; her seçeneğin bu sütunlardan hangisine ek varsayım yaptığını denetle.",
          steps: [
            "Açıkça verilen üretim ve çalışma bağını ayır.",
            "Verilmeyen evlilik, miras ve ayrılma hakları hakkında kapsamı genişletme.",
            "Bağımlılık saptanabilir; ayrıntılı statü için yeni hukuk ve uygulama kaydı gerekir.",
          ],
          optionReasons: [
            "Ürün ve çalışma yükümlülükleri açıkça verilmiştir.",
            "Doğru. Kayıt belirli yükümlülükleri gösterir; serfliği her yerde kölelikle veya modern ücretli çalışmayla bütünüyle eşitlemeye yetmez.",
            "Verilen işler üretim ve emektir; soylu askerî bağlılık statüsü belirtilmez.",
            "Toprağa bağlılık verilmiştir; modern serbest iş sözleşmesi koşulları yoktur.",
            "Kayıt yalnız bazı yükümlülükleri verir; tüm bölgelerde bütün hakları kapsamaz.",
          ],
          commonError:
            "Eksik hak bilgisini bütün hakların yokluğu ya da tam serbestlik sayma.",
          check:
            "Seçilen yaklaşım hem açık yükümlülükleri hem eksik alanları korur.",
        },
      },
      {
        prompt:
          "Bir öğretim haritası Hindistan ve Hint Okyanusu’ndan Basra ve Kızıldeniz aktarmalarıyla Akdeniz’e ulaşan ürün bağlantılarını gösteriyor. Bu ağ için en uygun açıklama hangisidir?",
        options: [
          "Sadece Sardes–Sus arasında tek kara çizgisi.",
          "Üzerinde hiçbir kültürel temasın mümkün olmadığı hat.",
          "Yalnız kuzey orman kuşağındaki kürk taşımacılığı.",
          "Her aşaması aynı devletçe yönetilen zorunlu tek güzergâh.",
          "Baharat Yolu bağlamında deniz ve kara aşamaları bulunan bağlantılar.",
        ],
        answer: 4,
        hint: "Ürün adından önce coğrafi başlangıç ve aktarma sahalarını bul.",
        explanation:
          "Güney Asya ve Hint Okyanusu ile Akdeniz aktarmaları Baharat Yolu’nun çok aşamalı ağını düşündürür.",
        guidance: {
          knowledge: ["Yol adı coğrafya ve bağlantı işleviyle eşleştirilir."],
          strategy:
            "Güzergâhı başlangıç, aktarma ve varış sahalarıyla yeniden kur; seçenekleri bu coğrafi zincire uymaları ve genelleme kapsamları bakımından karşılaştır.",
          steps: [
            "Ürün adından önce coğrafi başlangıç ve aktarma sahalarını bul.",
            "Hint Okyanusu, Basra/Kızıldeniz ve Akdeniz birlikte Baharat Yolu bağlamına uyar.",
            "Ağ kara-deniz geçişlerini içerir; tek çizgi ve tek egemenlik iddiaları eklenmez.",
          ],
          optionReasons: [
            "Bu Kral Yolu bağlamıdır; verilen Hint Okyanusu bağlantılarını açıklamaz.",
            "İnsanların ve malların karşılaşması böyle bir imkânsızlığı göstermez.",
            "Kürk Yolu’nun ayırıcı kuzey coğrafyası verilmemiştir.",
            "Harita bağlantıları gösterir; değişmez tek egemenlik bilgisi yoktur.",
            "Doğru. Güney Asya ve Hint Okyanusu ile Akdeniz aktarmaları Baharat Yolu’nun çok aşamalı ağını düşündürür.",
          ],
          commonError: "Bütün ticaret yollarını yalnız tek kara çizgisi sanma.",
          check:
            "Yanıttaki iki taşıma aşaması haritanın aktarma bilgisini korur.",
        },
      },
      {
        prompt:
          "Bir kart Sardes–Sus bağlantısını Kral Yolu diye adlandırıyor ve kökenini İlk Çağ’a yerleştiriyor. Kartın Orta Çağ ticareti dersinde kullanılması hangi sonucu gerektirmez?",
        options: [
          "Bağlantının Anadolu ile İran sahasını ilişkilendirdiğini.",
          "Yolun ilk kez Orta Çağ’da açıldığını.",
          "Konu yeriyle ortaya çıkış tarihinin ayrılması gerektiğini.",
          "İlk Çağ kökeninin kartta açıkça verildiğini.",
          "Yolun tarihinin dönemler arasında izlenebileceğini.",
        ],
        answer: 1,
        hint: "Karttaki köken tarihini dersin başlığından ayrı oku.",
        explanation:
          "Bir konunun bu ünitede ele alınması o kurumun veya yolun ilk kez o dönemde ortaya çıktığı anlamına gelmez.",
        guidance: {
          knowledge: ["Dersin kapsamı ile tarihsel ilk ortaya çıkış ayrılır."],
          strategy:
            "Yolun köken dönemiyle onun daha sonraki bir derste örnek gösterilmesini iki farklı tarih bilgisi olarak kodla; seçeneklerde bu iki zamanı karıştıran ifadeyi ara.",
          steps: [
            "Karttaki köken tarihini dersin başlığından ayrı oku.",
            "İlk Çağ kökeni açık olduğundan “ilk kez Orta Çağ’da” sonucu verilene uymaz.",
            "Olumsuz kökte yeni bir ilk tarih ekleyen seçeneği seç; coğrafi ilişkiyi reddetme.",
          ],
          optionReasons: [
            "Sardes ve Sus bağlantısı bu coğrafi ilişkiyi destekler.",
            "Doğru. Bir konunun bu ünitede ele alınması o kurumun veya yolun ilk kez o dönemde ortaya çıktığı anlamına gelmez.",
            "Bu ayrım kartın yanlış dönemlendirilmesini önler.",
            "Bu bilgi kartın doğrudan ifadesidir.",
            "Eski bir bağlantı sonraki dönemler içinde de incelenebilir.",
          ],
          commonError: "Ünite başlığını her kavramın icat tarihi sanma.",
          check:
            "Seçilen çıkarım kartın açık köken bilgisiyle karşılaştırılmıştır.",
        },
      },
      {
        prompt:
          "Bir ticari mekânda aynı esnaf grubunun dükkânları bir sokak boyunca sıralanıyor. Bu düzenin ders terminolojisindeki adı hangisidir?",
        options: ["Ordugâh.", "Ribat.", "Kapan.", "Arasta.", "Kurultay."],
        answer: 3,
        hint: "Mekânın yaptığı işi “benzer esnafı aynı sokakta toplama” diye tanımla.",
        explanation:
          "Benzer esnaf dükkânlarının sıralandığı ticari sokak düzeni arasta bağlamındadır.",
        guidance: {
          knowledge: ["Ticari mekânlar öncelikli işlevleriyle ayırt edilir."],
          strategy:
            "Mekânı bina adından önce düzenleniş biçimiyle betimle; aynı sokakta kümelenme özelliğini benzer ticari yapıların işlevleriyle karşılaştır.",
          steps: [
            "Mekânın yaptığı işi “benzer esnafı aynı sokakta toplama” diye tanımla.",
            "Bu ayırıcı işlev arastadır.",
            "Toptan tartım, sınır savunması ve askerî konaklama gibi başka işlevleri verilenle karıştırma.",
          ],
          optionReasons: [
            "Ordugâh askerî birliklerin yerleşim ve örgütlenme merkezidir.",
            "Ribatın ayırıcı başlangıç işlevi sınır savunmasıdır; esnaf sokak düzenini karşılamaz.",
            "Kapan belirli malların toptan tartım ve dağıtımıyla ilişkilidir; bu işlev verilmez.",
            "Doğru. Benzer esnaf dükkânlarının sıralandığı ticari sokak düzeni arasta bağlamındadır.",
            "Kurultay siyasi görüşme kurumudur; dükkân düzeni değildir.",
          ],
          commonError: "Her ticari yapıyı aynı ad altında toplama.",
          check:
            "Arasta tanımı metindeki sokak ve esnaf koşullarını birlikte karşılar.",
        },
      },
      {
        prompt:
          "Bir şehirde A yapısında değerli mallar korunaklı biçimde satılıyor; B’de belirli tarım ürünleri toptan tartılıp dağıtılıyor. A ve B sırasıyla hangi işlevlerle eşleşir?",
        options: [
          "Bedesten ve kapan.",
          "Medrese ve darüşşifa.",
          "Ribat ve kervansaray.",
          "Kapan ve bedesten.",
          "Arasta ve kurultay.",
        ],
        answer: 0,
        hint: "İki yapıdaki belirleyici fiilleri ayrı yaz: korunaklı satma, toptan tartıp dağıtma.",
        explanation:
          "Korunaklı değerli mal ticareti bedesten, belirli malların toptan tartım ve dağıtımı kapan bağlamındadır.",
        guidance: {
          knowledge: ["Benzer ticaret mekânlarının ayırıcı işlevleri korunur."],
          strategy:
            "A ve B için mal türü, satış ölçeği ve koruma işlevini sütunlaştır; terimleri iki satırın ayırıcı özelliklerine göre aynı sırada eşleştir.",
          steps: [
            "İki yapıdaki belirleyici fiilleri ayrı yaz: korunaklı satma, toptan tartıp dağıtma.",
            "İlkini bedesten, ikincisini kapanla eşleştir.",
            "Ortak ticaret özelliği, farklı işlevlerin yerini değiştirmeye gerekçe olmaz.",
          ],
          optionReasons: [
            "Doğru. Korunaklı değerli mal ticareti bedesten, belirli malların toptan tartım ve dağıtımı kapan bağlamındadır.",
            "Bunlar öğretim ve sağlık kurumlarıdır; iki ticaret işlemini karşılamaz.",
            "Sınır savunması veya kervanın yol konaklaması anlatılmıyor.",
            "Değerli mal ile toptan tartım işlevlerinin yerini değiştirir.",
            "Aynı esnafın sokak düzeni ve siyasi toplantı işlevleri verilmemiştir.",
          ],
          commonError:
            "İki ticari yapının adını yalnız ortak alışveriş kelimesinden seçme.",
          check:
            "Her terim yalnız kendisine ait işleve geri konduğunda sıra korunur.",
        },
      },
      {
        prompt:
          "Kurmaca bir yapı kaydı önce sınırda askerî savunmayı, sonraki bir kayıt ise aynı yapıda yolcuların konaklamasını anlatıyor. Bu iki kayıt birlikte nasıl kullanılmalıdır?",
        options: [
          "Aynı yapının farklı zamanlardaki işlevleri ayrılarak.",
          "İlk kaydın kesin uydurma olduğu söylenerek.",
          "İki işlevin her tarihte aynı anda bulunduğu varsayılarak.",
          "Konaklama görüldüğü için hiç savunma işlevi olmamıştır denerek.",
          "Yapı bulunduğu için bütün yolcuların aynı dinde olduğu söylenerek.",
        ],
        answer: 0,
        hint: "Her işlevi ait olduğu kaydın zamanına bağla.",
        explanation:
          "Ribat gibi bir yapının savunma ve daha sonraki konaklama işlevleri farklı zaman katmanları olarak incelenebilir.",
        guidance: {
          knowledge: ["Yapının işlevi zaman içinde değişebilir."],
          strategy:
            "İki kayıt için zaman ve işlev çiftleri oluştur; aynı yapının sonraki kullanımını önceki kaydın dönemine taşıyan yorumları denetle.",
          steps: [
            "Her işlevi ait olduğu kaydın zamanına bağla.",
            "Savunmadan konaklamaya işlev değişimi mümkündür.",
            "Hem ilk hem sonraki kaydı koruyan yorum zaman ayrımıdır; kayıtların birini gereksizce yok sayma.",
          ],
          optionReasons: [
            "Doğru. Ribat gibi bir yapının savunma ve daha sonraki konaklama işlevleri farklı zaman katmanları olarak incelenebilir.",
            "Farklı işlevler zaman içinde birlikte mümkün olabilir; çelişki zorunlu değildir.",
            "Kayıtlar farklı zamanları anlatır; eşzamanlılık verilmez.",
            "Sonraki işlev önceki kaydı kendiliğinden silmez.",
            "İşlev bilgisi kullanıcıların tüm inançlarını belirlemez.",
          ],
          commonError:
            "Bugünkü veya sonraki işlevi yapının bütün geçmişine yayma.",
          check:
            "Yanıt hiçbir kaydın söylemediği eşzamanlılığı veya kullanıcı kimliğini eklemez.",
        },
      },
      {
        prompt:
          "Bir Bizans ordusu betimlemesinde merkez kuvvetleri, eyalet askerleri, yardımcı birlikler ve ücretli askerler birlikte sayılıyor. Buna göre hangi ifade metinle uyumludur?",
        options: [
          "Birliklerin tümü yalnız denizde savaşır.",
          "Her eyalet baştan tamamen bağımsız bir devlettir.",
          "Askerî yapı birden fazla örgütlenme unsurunu içerir.",
          "Ordudaki herkes yalnız ücretli yabancı askerdir.",
          "Ordu bütün çağlarda aynı bileşimle kalmıştır.",
        ],
        answer: 2,
        hint: "Listelenen birlik türlerini tek tek koru.",
        explanation:
          "Birliklerin birlikte sayılması ordunun yalnız tek bir unsurdan oluşmadığını doğrudan gösterir.",
        guidance: {
          knowledge: ["Ordu bileşimi dönem ve kaynakla sınırlandırılır."],
          strategy:
            "Ordu bileşimini bir küme listesi olarak ele al; seçeneklerin sayılan unsurlardan herhangi birini yok sayıp saymadığını veya tümüne tek özellik yükleyip yüklemediğini kontrol et.",
          steps: [
            "Listelenen birlik türlerini tek tek koru.",
            "Merkez, eyalet, yardımcı ve ücretli unsurlar çok bileşenli yapıyı gösterir.",
            "Bu mevcut bileşimi bütün çağlara veya bütün savaş alanlarına değiştirmeden yayma.",
          ],
          optionReasons: [
            "Metin savaş alanı veya yalnız donanma şartı vermez.",
            "Eyalet kuvvetinin varlığı tek başına siyasi bağımsızlık değildir.",
            "Doğru. Birliklerin birlikte sayılması ordunun yalnız tek bir unsurdan oluşmadığını doğrudan gösterir.",
            "Merkez ve eyalet kuvvetlerini listeden çıkarır.",
            "Betimleme belirli bir durumu verir; bütün yüzyılların değişmezliği yoktur.",
          ],
          commonError:
            "Bir önemli asker türünü bütün ordunun tek unsuru sayma.",
          check:
            "Doğru seçenek listedeki hiçbir birlik türünü dışarıda bırakmaz.",
        },
      },
      {
        prompt:
          "Bir hükümdar bütün önemli kararları dar bir merkezde topluyor; tahta miras yoluyla geldiği de biliniyor. “Mirasla geldiğine göre otokratik yetki yoğunlaşması olamaz” yorumu neden geçersizdir?",
        options: [
          "Her otokrasi mutlaka bir şehir devletidir.",
          "Monarşi ile hanedan arasında hiçbir ilişki kurulamaz.",
          "Otokrasi bütün halkın genel oy kullanmasının adıdır.",
          "Yetki yoğunlaşmasıyla iktidarın devralınma yöntemi farklı ölçütlerdir.",
          "Mirasla gelen hükümdar hiçbir karar veremez.",
        ],
        answer: 3,
        hint: "İlk verinin karar yetkisi, ikincinin tahta geçiş yöntemi olduğunu ayır.",
        explanation:
          "Otokrasi gücün yoğunlaşmasını anlatır; mirasla tahta çıkmak bu yetki kullanımını kendi başına dışlamaz.",
        guidance: {
          knowledge: [
            "Meşruiyet, veraset ve yetki kullanımı aynı değişken değildir.",
          ],
          strategy:
            "Kararların nerede toplandığı ile hükümdarın göreve nasıl geldiği için iki bağımsız ölçüt kullan; bir ölçütten diğerini zorunlu çıkaran ifadeyi sına.",
          steps: [
            "İlk verinin karar yetkisi, ikincinin tahta geçiş yöntemi olduğunu ayır.",
            "Bu iki ölçüt aynı değildir; miras yoluyla aktarım yetki yoğunlaşmasıyla birlikte bulunabilir.",
            "Otokrasi için zorunlu mirassızlık koşulu ekleyen yorumu reddet.",
          ],
          optionReasons: [
            "Kavram belirli bir coğrafi büyüklük veya şehirle sınırlı değildir.",
            "Hanedan aktarımı monarşilerde görülebilir; sorun iki ölçütün aynılaştırılmasıdır.",
            "Genel oy, yetkinin tek merkezde yoğunlaşmasının tanımı değildir.",
            "Doğru. Otokrasi gücün yoğunlaşmasını anlatır; mirasla tahta çıkmak bu yetki kullanımını kendi başına dışlamaz.",
            "Verilen metin kararların dar merkezde toplandığını açıkça söyler.",
          ],
          commonError:
            "Otokrasiye kaynağın gerektirmediği tek bir veraset usulü yükleme.",
          check:
            "Metindeki iki olgu birbiriyle mantıken çelişmek zorunda değildir.",
        },
      },
      {
        prompt:
          "Sasani bağlamındaki bir sikke betimlemesinde hükümdar tasviriyle kutsal ateş simgesi birlikte bulunuyor. Bu veri için en dar uygun yorum hangisidir?",
        options: [
          "Sikkenin kullanıldığı her yerde aynı ana dil konuşulmuştur.",
          "Hükümdarlık temsilinde dinî bir simge de kullanılmıştır.",
          "Dinî simge ancak modern bir seçimde kullanılabilir.",
          "Sasanilerde hiçbir siyasi otorite yoktur.",
          "Bütün halk hükümdarı doğrudan tanrı saymıştır.",
        ],
        answer: 1,
        hint: "Gözlenen iki öğeyi siyasal tasvir ve dinî simge olarak ayır.",
        explanation:
          "İki tasvirin birlikte yer alması siyasi temsil ile dinî simge arasındaki bağı gösterir; hükümdarın doğrudan tanrı olduğu sonucunu zorunlu kılmaz.",
        guidance: {
          knowledge: ["Dinî meşruiyet simgesi ile tanrı-kral iddiası ayrılır."],
          strategy:
            "Sikkenin üstündeki gözlenebilir öğeleri önce yorumsuz kaydet; seçeneklerin bu nesneden bütün nüfusa veya bütün kurumlara uzanan ek iddialar taşıyıp taşımadığına bak.",
          steps: [
            "Gözlenen iki öğeyi siyasal tasvir ve dinî simge olarak ayır.",
            "Birlikte kullanım temsil bağını destekler.",
            "Bu sonuçla bütün halkın ayrıntılı inancı veya tanrı-kral anlayışı arasındaki kapsam farkını koru.",
          ],
          optionReasons: [
            "Tasvirden nüfusun dil dağılımı belirlenemez.",
            "Doğru. İki tasvirin birlikte yer alması siyasi temsil ile dinî simge arasındaki bağı gösterir; hükümdarın doğrudan tanrı olduğu sonucunu zorunlu kılmaz.",
            "Sikkenin tarihsel bağlamıyla ilgisiz, metinde bulunmayan koşul ekler.",
            "Hükümdar tasviri bu yokluk sonucunu desteklemez.",
            "Sikke bu geniş inanç dağılımını veya tanrı-kral iddiasını vermez.",
          ],
          commonError:
            "Bir simgeden bütün toplum için aynı inanç ve kimlik sonucu çıkarma.",
          check:
            "Yanıtta yalnız betimlemede bulunan iki unsur ilişkilendirilmiştir.",
        },
      },
      {
        prompt:
          "Bir öğretim kartı 1206’yı Cengiz Han’ın kağan ilanı ve Moğol siyasi birliğinin güçlenmesiyle ilişkilendiriyor. Kartta kurultay da anılıyor. Bu iki bilgi hangi sonucu tek başına vermez?",
        options: [
          "Kağan unvanının metinde bulunduğunu.",
          "Olayın siyasi örgütlenmeyle ilgili olduğunu.",
          "Danışma veya siyasi görüşme kurumunun anıldığını.",
          "Kartın belirli bir tarih işareti kullandığını.",
          "Bütün halkın eşit oy kullandığı modern seçim sistemi bulunduğunu.",
        ],
        answer: 4,
        hint: "Kurultayın anılmasını katılımın kapsamından ayrı tut.",
        explanation:
          "Kurultay ve kağan ilanı siyasi örgütlenme bağlamıdır; genel ve eşit oy koşulları verilmemiştir.",
        guidance: {
          knowledge: [
            "Tarihsel meclisin varlığı modern katılım ölçütlerinin tamamı değildir.",
          ],
          strategy:
            "Olay, tarih ve toplantı kurumunu ayrı bilgi alanları olarak tut; katılımın kimleri kapsadığı belirtilmeden kurulabilecek hükmün sınırını seçeneklerde araştır.",
          steps: [
            "Kurultayın anılmasını katılımın kapsamından ayrı tut.",
            "Kart siyasi örgütlenmeyi ve 1206 tarihini verir.",
            "Genel-eşit oy için ayrıca veri gerektiğinden olumsuz kökte modern seçim iddiası seçilir.",
          ],
          optionReasons: [
            "Bu bilgi kartın doğrudan ifadesidir.",
            "Kağan ilanı ve birlik bu alanı doğrudan gösterir.",
            "Kurultayın anılması bu sınırlı sonucu destekler.",
            "1206 kartta açıkça verilmiştir.",
            "Doğru. Kurultay ve kağan ilanı siyasi örgütlenme bağlamıdır; genel ve eşit oy koşulları verilmemiştir.",
          ],
          commonError:
            "Bir kurum adını bütün bugünkü yetki ve haklarla özdeşleştirme.",
          check: "Desteklenmeyen seçenek metne yeni katılım koşulları ekler.",
        },
      },
      {
        prompt:
          "Justinianus dönemindeki hukuk çalışması, önceki Roma kurallarının derlenip düzenlenmesi olarak anlatılıyor. Bu tanıma uygun olan ifade hangisidir?",
        options: [
          "Çalışma yalnız asker sayısını artırmıştır.",
          "İnsanlığın ilk yazılı kuralı o gün ortaya çıkmıştır.",
          "Bütün kişilere bugünkü hakların tamamı verilmiştir.",
          "Önceki birikim yeni ihtiyaçlar içinde düzenlenmiştir.",
          "Önceki bütün kurallar hiçbir iz bırakmadan silinmiştir.",
        ],
        answer: 3,
        hint: "Çalışmanın fiilini “derlemek ve düzenlemek” olarak belirle.",
        explanation:
          "Derleme ve düzenleme, önceki kuralların varlığını koruyan bir işlem türüdür; bütün hukukun ilk kez o anda doğduğunu söylemez.",
        guidance: {
          knowledge: ["Hukukta derleme önceki birikimle ilişkilidir."],
          strategy:
            "Hukuk çalışmasında kaynak alınan kurallarla yapılan işlemi bir önce–sonra şemasına yerleştir; seçeneklerdeki yenilik iddiasını bu işlemle karşılaştır.",
          steps: [
            "Çalışmanın fiilini “derlemek ve düzenlemek” olarak belirle.",
            "Bu fiil daha önce bir hukuk birikimi bulunduğunu içerir.",
            "Tarihsel önemini korurken ilk kez bütün hukuk veya modern hakların tamamı gibi yeni iddialar ekleme.",
          ],
          optionReasons: [
            "Anlatılan işlem hukuk kurallarının düzenlenmesidir; asker sayısı verilmez.",
            "Önceki Roma kurallarının bulunması zaten bu ilk-yokluk iddiasına uymaz.",
            "Derleme işlemi hak içeriğinin tamamını ve modern eşitliği kanıtlamaz.",
            "Doğru. Derleme ve düzenleme, önceki kuralların varlığını koruyan bir işlem türüdür; bütün hukukun ilk kez o anda doğduğunu söylemez.",
            "Derleme önceki birikimi kullanır; tümden yok etme diye tanımlanmamıştır.",
          ],
          commonError: "Yeni düzenlemeyi bütün geçmişin yokluğu sayma.",
          check: "Doğru seçenek çalışmanın iki açık fiilini de korur.",
        },
      },
      {
        prompt:
          "Bir ders açıklaması Cengiz Han Yasası’nı Türk-Moğol gelenekleriyle yönetim ve askerlik kurallarının düzenlenmesi bağlamında ele alıyor. Bu bilgiyi kullanırken hangi yöntem uygundur?",
        options: [
          "Bütün kuralların tek kişi tarafından hiçbir geçmiş olmadan icat edildiğini söylemek.",
          "Kural anıldığı için herkese aynı yaptırım uygulandığını kesinleştirmek.",
          "Yazılı özgün nüsha gösterilmediği için hiçbir kuralın bulunmadığını söylemek.",
          "Yasa askerlikle ilişkilidir diye hukuk konusu değildir demek.",
          "Önceki geleneklerle ilişkiyi koruyup elimizde eksiksiz özgün metin varmış gibi alıntı üretmemek.",
        ],
        answer: 4,
        hint: "Açıklamada önceki geleneklerle düzenleme arasındaki bağı bul.",
        explanation:
          "Konu bir düzenleme geleneğini anlatır; bütün ayrıntıları doğrudan korunmuş tek bir özgün kitap varsayımı bu bilgiden çıkmaz.",
        guidance: {
          knowledge: [
            "Bir düzen hakkında bilgi ile korunmuş özgün metin ayrılır.",
          ],
          strategy:
            "Geleneğin kaynak olarak kullanılmasını, kuralların düzenlenme işlemini ve uygulama alanlarını ayrı işaretle; kaydın kapsamını büyüten seçeneklere ek kanıt iste.",
          steps: [
            "Metnin önceki gelenekler ve düzenleme arasındaki bağını bul.",
            "Düzenin varlığıyla özgün metnin bugüne eksiksiz gelmesi farklı iddialardır.",
            "Kaynağın vermediği doğrudan alıntı veya evrensel yaptırım ayrıntısı ekleme.",
          ],
          optionReasons: [
            "Metin önceki geleneklerle açık ilişki kurar.",
            "Kişi ve yaptırım içeriği verilmemiştir.",
            "Metin kuralların varlığını anlatır; korunmuş nüsha ile tarihsel düzen aynı soru değildir.",
            "Yönetim ve askerlik kuralları hukuki düzenlemenin konusu olabilir.",
            "Doğru. Konu bir düzenleme geleneğini anlatır; bütün ayrıntıları doğrudan korunmuş tek bir özgün kitap varsayımı bu bilgiden çıkmaz.",
          ],
          commonError:
            "Nüsha durumunu bütün hukuk düzeninin varlığıyla eşitleme.",
          check:
            "Yanıt hem tarihsel düzeni kabul eder hem kaynağın sınırını korur.",
        },
      },
      {
        prompt:
          "Bir bilgi kartı 1054’ü Katolik ve Ortodoks kiliseleri arasındaki ayrılıkla ilişkilendiriyor. Bu kartın dinî kurumlara ilişkin yönü hangi ifadeyle doğru karşılanır?",
        options: [
          "Bütün Hristiyanların tek mezhepte birleşmesidir.",
          "Cengiz Han’ın 1206 kağan ilanıdır.",
          "İngiltere’de kralın yetkilerinin sınırlandırılmasıdır.",
          "Batı Roma’nın 476’daki siyasi sonunun başka takvimde yazımıdır.",
          "Aynı din içindeki kurumsal ve yorum ayrılığına ilişkin bir dönüm noktasıdır.",
        ],
        answer: 4,
        hint: "Kartın konusunu dinî kurumlar olarak belirle.",
        explanation:
          "Kart kiliseler arasındaki ayrılığı tanımlar; bütün Hristiyanların aynı kurumda birleştiğini veya bütün siyasi devletlerin yıkıldığını söylemez.",
        guidance: {
          knowledge: ["Dinî kurum değişimiyle siyasi olaylar aynılaştırılmaz."],
          strategy:
            "Bilgi kartının anlattığı kurumsal ayrılığı belirle; tarih ve kurum bilgisinden bireylerin tüm tercihleri hakkında sonuç üreten seçenekleri ayrıca denetle.",
          steps: [
            "Kartın konusunu dinî kurumlar olarak belirle.",
            "Ayrılık fiili birleşmenin tersidir; siyasi sonla da aynı tür olay değildir.",
            "Tarih ve alanı birlikte koruyan seçeneği seç.",
          ],
          optionReasons: [
            "Kartın açık ayrılık ifadesinin tersidir.",
            "Aktör, coğrafya ve tarih bütünüyle farklıdır.",
            "Bu 1215 Magna Carta bağlamıdır; kilise ayrılığı değildir.",
            "İki olay farklı tarih ve alana aittir.",
            "Doğru. Kart kiliseler arasındaki ayrılığı tanımlar; bütün Hristiyanların aynı kurumda birleştiğini veya bütün siyasi devletlerin yıkıldığını söylemez.",
          ],
          commonError:
            "Yalnız tarihin eski olmasından bütün olayları aynı dönüşüm sayma.",
          check:
            "Yanıt kartın 1054 ve kilise ayrılığı bilgisini birlikte karşılar.",
        },
      },
      {
        prompt:
          "1215 Magna Carta hakkında verilen öğretim notu, İngiltere’de kralın bazı yetkilerinin sınırlandırılması ve belirli grupların talepleri bağlamını vurguluyor. Bundan hangisi doğrudan çıkarılmaz?",
        options: [
          "Belgenin siyasi yetki ilişkileriyle ilgili olduğu.",
          "Gelişmenin İngiltere bağlamında ele alındığı.",
          "Bir anda herkese eşit ve genel oy hakkı verildiği.",
          "Belirli toplumsal grupların taleplerinin rol oynadığı.",
          "Kral yetkilerinin tartışma konusu olabildiği.",
        ],
        answer: 2,
        hint: "Belgenin hangi yetkiyi ve hangi grupları anlattığını koru.",
        explanation:
          "Belirli yetkilerin sınırlandırılması, bütün nüfusun modern genel oyla yönetime katıldığını gösteren veri değildir.",
        guidance: {
          knowledge: ["Yetki sınırı ile modern genel oy farklı ölçütlerdir."],
          strategy:
            "Kralın yetkisi ve talepleri belirtilen gruplar için kapsam sınırı çiz; seçeneklerdeki herkes, bütün ve modern haklar türü genişletmeleri bu sınırla karşılaştır.",
          steps: [
            "Belgenin hangi yetkiyi ve hangi grupları anlattığını koru.",
            "Bazı yetkilerin sınırlanmasıyla herkesin eşit katılımı aynı kapsam değildir.",
            "Olumsuz kökte metne genel oy koşulu ekleyen iddiayı seç.",
          ],
          optionReasons: [
            "Kral yetkisi ve talepler bu sınırlı yorumu destekler.",
            "Coğrafya doğrudan verilmiştir.",
            "Doğru. Belirli yetkilerin sınırlandırılması, bütün nüfusun modern genel oyla yönetime katıldığını gösteren veri değildir.",
            "Bu grup kapsamı metinde belirtilmiştir.",
            "Metin yetki sınırlandırılmasını açıkça verir.",
          ],
          commonError:
            "Bir hak düzenlemesini bütün bugünkü siyasi hakların bir anda verilmesi sayma.",
          check:
            "Desteklenmeyen seçenek metnin sınırlı grup kapsamını bütün nüfusa genişletir.",
        },
      },
      {
        prompt:
          "Bir araştırmacı aynı olay için üç metin buluyor; ikinci ve üçüncü nüshanın ilkinden kopyalandığı da açıkça biliniyor. Bu durumda ne söylenebilir?",
        options: [
          "Aynı ifadelerin kesin doğruluk oranını üçe katladığı.",
          "Olayın kesinlikle hiç yaşanmadığı.",
          "Üç metin bulunması üç bağımsız tanıklık bulunduğu anlamına gelmez.",
          "Üç metnin mutlaka farklı olay anlattığı.",
          "Kopyalanmış metinlerin hiçbir tarihsel değeri olamayacağı.",
        ],
        answer: 2,
        hint: "Metin sayısıyla bağımsız gözlem sayısını ayır.",
        explanation:
          "Kopya ilişkisi kaynakların bağımsızlığını sınırlar; aynı aktarımın üç kez yazılması üç ayrı gözlem değildir.",
        guidance: {
          knowledge: ["Kaynak sayısı ve bağımsızlığı ayrı değerlendirilir."],
          strategy:
            "Metinlerin aktarım soy ağacını kur; bağımsız tanıklık sayısıyla eldeki nüsha sayısını iki farklı sayaçta izleyerek seçenekleri denetle.",
          steps: [
            "Metin sayısıyla bağımsız gözlem sayısını ayır.",
            "İkinci ve üçüncü ilkine dayandığı için ortak bir aktarım zinciri vardır.",
            "Olayı değerlendirmek için bağımsız ek kanıt aranır; kopya olması olayın yokluğu ilan edilmez.",
          ],
          optionReasons: [
            "Metin sayısından böyle sayısal güven oranı üretilmez.",
            "Kopya ilişkisi olayın yokluğunu tek başına kanıtlamaz.",
            "Doğru. Kopya ilişkisi kaynakların bağımsızlığını sınırlar; aynı aktarımın üç kez yazılması üç ayrı gözlem değildir.",
            "Soru aynı olayın aktarıldığını belirtir.",
            "Aktarım ve alımlanma tarihi için değer taşıyabilir; bağımsız tanıklık sorusu ayrıdır.",
          ],
          commonError: "Aynı anlatının tekrarını ayrı ayrı doğrulama sayma.",
          check:
            "Yanıt kopya zincirinin verdiğinden daha fazla kesinlik üretmez.",
        },
      },
      {
        prompt:
          "Kurmaca bir kalede bulunan sikke topluluğu için iki açıklama öneriliyor: tüccarların geçici deposu veya askerlere ödeme hazırlığı. Hangi ek bulgu ikinci açıklamayı daha doğrudan sınar?",
        options: [
          "Sikkelerin bulunduğu odanın bugün boyanmış olması.",
          "Kalenin yüksek bir yerde bulunması.",
          "Başka yüzyıla ait şiirdeki kale adı.",
          "Aynı tarih ve yerdeki birlikler için hazırlanmış ödeme listesi.",
          "Başka bir kıtada aynı metalin bulunması.",
        ],
        answer: 3,
        hint: "İkinci açıklamanın sınanacak bağını “sikke–birlik–ödeme” olarak yaz.",
        explanation:
          "Asker ve ödeme ilişkisini açıkça kuran tarihli bir liste, askerî ödeme açıklamasının mekanizmasına doğrudan katkı sağlar.",
        guidance: {
          knowledge: [
            "Alternatif açıklamalar ayırt edici yeni kanıtla sınanır.",
          ],
          strategy:
            "İki rakip açıklamanın doğru olması halinde bekleyeceğin ek izleri ayrı listele; bulgunun özellikle ikinci açıklamayı diğerinden ayırma gücünü karşılaştır.",
          steps: [
            "İkinci açıklamanın sınanacak bağını “sikke–birlik–ödeme” olarak yaz.",
            "Aynı tarih ve yerdeki ödeme listesi bu üç alanı birlikte karşılayabilir.",
            "Yer adı, metal veya mimari görünüş tek başına aynı özel amacı göstermez.",
          ],
          optionReasons: [
            "Modern boya askerî ödeme amacını açıklamaz.",
            "Yükseklik savunmayı düşündürebilir; sikke topluluğunun asker maaşı olduğunu doğrudan göstermez.",
            "Aynı yer adı zaman ve ödeme ilişkisini tek başına kurmaz.",
            "Doğru. Asker ve ödeme ilişkisini açıkça kuran tarihli bir liste, askerî ödeme açıklamasının mekanizmasına doğrudan katkı sağlar.",
            "Malzemenin uzak varlığı bu kalenin ödeme işlemini belirlemez.",
          ],
          commonError:
            "Her yeni bulgunun her açıklamayı aynı doğrudanlıkta desteklediğini varsayma.",
          check:
            "Seçilen kayıt doğrudan ikinci açıklamadaki ödeme eylemini araştırır.",
        },
      },
      {
        prompt:
          "Bir kurmaca krallıkta hükümdara doğrudan bağlı ve düzenli gelirle beslenen birlikler artarken yerel soyluların sefer desteğine ihtiyaç azalıyor. Bu değişim hangi ilişkiyi daha doğrudan etkiler?",
        options: [
          "Bütün yargı kayıtlarının yok olmasını.",
          "Ticaretin bütün bölgelerde tamamen bitmesini.",
          "Merkezin yerel askerî katkıya bağımlılığını.",
          "Her köylünün otomatik soylu olmasını.",
          "Bütün insanların aynı inanca geçmesini.",
        ],
        answer: 2,
        hint: "Yeni birliklerin kime doğrudan bağlı olduğunu belirle.",
        explanation:
          "Doğrudan bağlı birliklerin artması, kralın yerel soylularla asker toplama pazarlığına duyduğu ihtiyacı azaltabilir.",
        guidance: {
          knowledge: [
            "Askerin finansmanı ve bağlılığı merkez-yerel ilişkisini etkileyebilir.",
          ],
          strategy:
            "Birliklerin gelir ve komuta bağlantılarını önceki ve sonraki durumda yan yana çiz; değişen bağımlılık ilişkisini ararken doğrudan verilmeyen sonuçları ele.",
          steps: [
            "Yeni birliklerin kime doğrudan bağlı olduğunu belirle.",
            "Yerel desteğe ihtiyacın azalması askerî bağımlılık bağını değiştirir.",
            "Bu sınırlı siyasi-askerî etkiyi din, bütün statüler veya tüm ticarete yayma.",
          ],
          optionReasons: [
            "Yargı belgelerinin durumu hakkında veri yoktur.",
            "Birliklerin bağlılık biçimi bu evrensel ekonomik sonucu vermez.",
            "Doğru. Doğrudan bağlı birliklerin artması, kralın yerel soylularla asker toplama pazarlığına duyduğu ihtiyacı azaltabilir.",
            "Toplumsal statülerin böyle değiştiği belirtilmez.",
            "Askerî kaynak değişimi bütün nüfusun dinini belirlemez.",
          ],
          commonError:
            "Bir alandaki yetki değişiminden toplumun bütün alanları için kesin sonuç çıkarma.",
          check:
            "Doğru seçenek metindeki iki askerî veriyi aynı ilişkide birleştirir.",
        },
      },
    ],
  },
  {
    id: "ilk-turk-dunyasi-ileri",
    base: "ilk-turk-dunyasi",
    title: "Türk dünyası: ileri kaynak ve kurum soruları",
    questions: [
      {
        prompt:
          "Kök Türk Devleti’nin Türk adını devlet adı olarak kullanmasıyla ilgili bir nottan hareketle hangi ayrım korunmalıdır?",
        options: [
          "Devlet adı, aynı adı taşıyan bütün toplulukların tek devlet içinde bulunması değildir.",
          "Devlet adının mutlaka modern ülke sınırını gösterdiği.",
          "Bütün komşuların aynı dili konuştuğu.",
          "Adı kullanan devletin bütün çağlarda kesintisiz sürdüğü.",
          "Devletin başında hiçbir yönetici bulunmadığı.",
        ],
        answer: 0,
        hint: "Notun doğrudan verdiği alanı devlet adı olarak belirle.",
        explanation:
          "Bir siyasi yapının adı, o adla ilişkilendirilen bütün toplulukların aynı yönetimde olduğunu tek başına göstermez.",
        guidance: {
          knowledge: ["Ad, topluluk ve devlet aynı değişken değildir."],
          strategy:
            "Devlet adının kullanımı için verilen kanıtı tarihsel varlık, dil ve etnik köken iddialarından ayır; her seçeneğin hangi alana geçtiğini izleyerek kapsamını denetle.",
          steps: [
            "Notun doğrudan verdiği alanı devlet adı olarak belirle.",
            "Adlandırmayı bütün toplulukların siyasi bağlılığından ayır.",
            "Aynı ad, aynı sınır ve kesintisiz tek devlet iddiaları ayrı kanıt ister.",
          ],
          optionReasons: [
            "Doğru. Bir siyasi yapının adı, o adla ilişkilendirilen bütün toplulukların aynı yönetimde olduğunu tek başına göstermez.",
            "Tarihsel siyasi alan modern sınırla aynı kabul edilemez.",
            "Bir devlet adından komşuların dili belirlenemez.",
            "Devlet adı siyasi ömrün bütün çağlarda kesintisiz olduğunu göstermez.",
            "Adlandırma yönetici yokluğunun kanıtı değildir.",
          ],
          commonError:
            "Tarihsel adı bütün çağların tek siyasi haritasına yayma.",
          check: "Doğru seçenek ad bilgisini korur, kapsamını büyütmez.",
        },
      },
      {
        prompt:
          "Ders şemasında oguş aile, urug aileler birliği, boy siyasi-toplumsal birlik, budun boylar topluluğu ve il devlet olarak tanımlanıyor. Bu şema için hangi yorum uygundur?",
        options: [
          "Farklı örgütlenme düzeylerini ayırır; her grubun zorunlu aynı evreleri izlediğini kanıtlamaz.",
          "İl yalnız bir çadırın adı olarak verilmiştir.",
          "Her boyun mutlaka farklı bir dil konuştuğu kesindir.",
          "Urug yalnız ücretli ordudur.",
          "Oguş bütün devletin tek diğer adıdır.",
        ],
        answer: 0,
        hint: "Tanımları küçükten geniş örgütlenmeye doğru ayır.",
        explanation:
          "Terimler örgütlenme düzeylerini tanımlar; şema evrensel ve kaçınılmaz bir tarih yasası değildir.",
        guidance: {
          knowledge: [
            "Örgütlenme şeması tarihsel çeşitliliği ortadan kaldırmaz.",
          ],
          strategy:
            "Örgütlenme terimlerini kapsadıkları topluluk ölçeğine göre yerleştir; tanım şemasını zorunlu tarih sırasına dönüştüren seçenekleri ayrıca sına.",
          steps: [
            "Tanımları küçükten geniş örgütlenmeye doğru ayır.",
            "Bu sıralama kavramları düzenler, herkesin aynı tarihi yaşadığını söylemez.",
            "Yanlış seçeneklerin aile ve devlet düzeylerini ters kullanıp kullanmadığını denetle.",
          ],
          optionReasons: [
            "Doğru. Terimler örgütlenme düzeylerini tanımlar; şema evrensel ve kaçınılmaz bir tarih yasası değildir.",
            "Şemada il devlet düzeyidir.",
            "Örgütlenme düzeyi dil farklılığını tek başına belirlemez.",
            "Urug aileler birliğidir; askerî ücret koşulu verilmez.",
            "Şema oguşu aile düzeyinde tanımlar.",
          ],
          commonError:
            "Kavram sırasını bütün toplulukların zorunlu evrimi sayma.",
          check: "Doğru yanıt hem tanımları hem şemanın sınırını korur.",
        },
      },
      {
        prompt:
          "Kurmaca bir anlatının ilk cümlesi kağanın yönetme hakkını kutsal iradeye bağlıyor; ikincisi ortak kaynakların topluluk içinde paylaştırılmasını anlatıyor. Bu iki işlev sırasıyla hangileriyle ilişkilidir?",
        options: [
          "Kut ve ülüş.",
          "Yaylak ve kışlak.",
          "Seriyye ve gazve.",
          "Yuğ ve kurgan.",
          "Ülüş ve kut.",
        ],
        answer: 0,
        hint: "İlk cümlede neden yönetmeye hak sahibi sayıldığına bak.",
        explanation:
          "İlk cümle meşruiyet, ikinci cümle paylaştırma işlevi taşır; bunlar kut ve ülüş ayrımıdır.",
        guidance: {
          knowledge: ["Kut meşruiyet, ülüş paylaşım bağlamındadır."],
          strategy:
            "İki cümleyi yönetme hakkının dayanağı ve kaynakların dağıtımı olarak işlev etiketleriyle çözümle; kavram adlarını bu işlevlerle aynı sırada eşleştir.",
          steps: [
            "İlk cümlede neden yönetmeye hak sahibi sayıldığına bak.",
            "İkinci cümlede ürün veya kaynak payının dağıtılmasını bul.",
            "İşlev sırası meşruiyet→paylaşım olduğundan kut→ülüş seçilir.",
          ],
          optionReasons: [
            "Doğru. İlk cümle meşruiyet, ikinci cümle paylaştırma işlevi taşır; bunlar kut ve ülüş ayrımıdır.",
            "Bunlar mevsimlik yaşam alanlarıdır; meşruiyet ve paylaşım değildir.",
            "Bunlar başka tarihsel bağlamdaki sefer terimleridir.",
            "Yuğ cenaze töreni, kurgan mezar bağlamındadır; verilen iki işlev değildir.",
            "Paylaşım ile yönetme hakkının kaynağını ters çevirir.",
          ],
          commonError:
            "Aynı yönetim çevresindeki bütün terimleri eş anlamlı sayma.",
          check:
            "İki terim kendi tanımına geri konduğunda iki cümle de açıklanır.",
        },
      },
      {
        prompt:
          "Bir öğretim notunda ayukı yönetim/hükümet, aygucı baş görevli, buyruk görevliler olarak tanımlanıyor. Alınan kararın görevlilerce uygulanması öncelikle hangi alanı gösterir?",
        options: [
          "Bütün halkın eşit oyla seçimi.",
          "Yalnız cenaze töreni.",
          "Her görevlinin bağımsız devlet kurması.",
          "Her kararın mutlaka asker sayımı olması.",
          "Yürütme ve uygulama.",
        ],
        answer: 4,
        hint: "Metindeki belirleyici eylemi uygulamak olarak bul.",
        explanation:
          "Tanımlanan görevlilerin kararı hayata geçirmesi uygulama işlevine ilişkindir; genel oy veya bütün hukuk yetkisi verilmez.",
        guidance: {
          knowledge: ["Kurumun işlevi yapılan eylemden belirlenir."],
          strategy:
            "Kararı alan organı, görevliyi ve yürütülen işi ayrı kutulara yaz; seçeneklerin bu somut uygulama ilişkisinden hangi alana geçtiğini kontrol et.",
          steps: [
            "Metindeki belirleyici eylemi uygulamak olarak bul.",
            "Ayukı ve görevlileri verilen tanımla yürütme alanına bağla.",
            "Bu görevden genel oy veya bağımsız devlet koşulu çıkarma.",
          ],
          optionReasons: [
            "Görevin uygulanması seçmenin kapsamını anlatmaz.",
            "Görev ve kararın yürütülmesi yuğ töreni değildir.",
            "İdari görev siyasi bağımsızlıkla aynı değildir.",
            "Not kararın konusunu tek bir sayım işine sınırlamaz.",
            "Doğru. Tanımlanan görevlilerin kararı hayata geçirmesi uygulama işlevine ilişkindir; genel oy veya bütün hukuk yetkisi verilmez.",
          ],
          commonError:
            "Görevli adını bugünkü bütün kurumsal yetkilerin karşılığı sayma.",
          check: "Yanıt yalnız verilen uygulama işlevini kullanır.",
        },
      },
      {
        prompt:
          "Bir kaynakta hatunun elçi kabul ettiği belirtiliyor. Yalnız bu bilgi hangi sonucu doğrudan destekler?",
        options: [
          "Her elçinin kağanın aile üyesi olduğunu.",
          "Toplumdaki bütün hakların bugünkü anlamda eşit olduğunu.",
          "Hatunun hiçbir yönetim işine katılmadığını.",
          "Belirtilen kadının siyasi-diplomatik temsil rolü bulunduğunu.",
          "Kurultayın tamamen ortadan kalktığını.",
        ],
        answer: 3,
        hint: "Elçi kabulünün temsil ve diplomasiyle ilişkisini kur.",
        explanation:
          "Elçi kabulü belirli bir temsil görevine kanıttır; bütün kadın ve erkeklerin her alandaki hakları hakkında tam bir tablo değildir.",
        guidance: {
          knowledge: ["Belirli siyasi rol ile bütün hak dağılımı ayrılır."],
          strategy:
            "Elçi kabulü eylemiyle doğrudan belgelenen rolü, diğer hak ve katılım iddialarından ayır; en az ek varsayım gerektiren yorumu seçmek için eylem–işlev bağı kur.",
          steps: [
            "Elçi kabulünün temsil ve diplomasiyle ilişkisini kur.",
            "Kaynağın belirli kişi ve görev hakkında konuştuğunu koru.",
            "Bu veriyi bütün toplumsal hakların eksiksiz ölçümüne dönüştürme.",
          ],
          optionReasons: [
            "Elçilerin kökeni veya aile bağı verilmez.",
            "Tek görev örneği tüm hak alanları ve bütün nüfusu kapsamaz.",
            "Elçi kabulü verilen siyasi-diplomatik iştir.",
            "Doğru. Elçi kabulü belirli bir temsil görevine kanıttır; bütün kadın ve erkeklerin her alandaki hakları hakkında tam bir tablo değildir.",
            "Hatunun görevi kurultayın durumunu belirlemez.",
          ],
          commonError:
            "Bir kadın yöneticinin görevinden bütün toplum için sınırsız sonuç çıkarma.",
          check: "Doğru seçenek doğrudan anlatılan eylemle sınırlıdır.",
        },
      },
      {
        prompt:
          "Bir hanedanın birden fazla üyesi yönetme hakkı iddia ediyor; her biri farklı boylardan destek arıyor. Bu veri hangi ilişkiyi açıklamaya daha uygundur?",
        options: [
          "Aynı hanedanın bütün üyelerinin fiilen aynı gücü taşıdığını.",
          "Veraset iddiasıyla siyasi desteğin birlikte mücadeleye dönüşebilmesini.",
          "Kağanlık hakkının herkese genel oyla dağıtıldığını.",
          "Her yerde kesin ilk oğul kuralı bulunduğunu.",
          "Boyların siyasi ilişkilerde hiçbir rolü olmadığını.",
        ],
        answer: 1,
        hint: "İki ayrı veriyi işaretle: hanedan hakkı iddiası ve boy desteği.",
        explanation:
          "Hak iddiası ve boy desteği birlikte ele alındığında hanedan içi rekabetin siyasi zemini görülebilir.",
        guidance: {
          knowledge: [
            "Meşruiyet iddiası ve fiilî siyasi kaynak ayrı incelenir.",
          ],
          strategy:
            "Hanedan üyelerinin iddialarıyla aradıkları boy desteğini bir ilişki ağına koy; meşruiyet iddiası ve fiilî destek arasındaki bağı açıklayan seçenekleri karşılaştır.",
          steps: [
            "İki ayrı veriyi işaretle: hanedan hakkı iddiası ve boy desteği.",
            "Bu veriler siyasi rekabetin farklı dayanaklarını birlikte açıklar.",
            "İddia sahibi olmakla aynı fiilî güce sahip olmayı eşitleme.",
          ],
          optionReasons: [
            "Hak iddiası fiilî kaynak ve desteğin eşitliğini göstermez.",
            "Doğru. Hak iddiası ve boy desteği birlikte ele alındığında hanedan içi rekabetin siyasi zemini görülebilir.",
            "Hanedan iddiası ve boy desteği genel oy değildir.",
            "Birden çok üyenin iddiası böyle tek ve kesin usulü vermez.",
            "Destek arayışı boyların rolünü açıkça gösterir.",
          ],
          commonError:
            "Birden çok hak iddiasını düzenli ve tartışmasız tek veraset kuralı sayma.",
          check: "Yanıt iki veriyi de açıklamada kullanır.",
        },
      },
      {
        prompt:
          "Mete Han’ın MÖ 209’da yönetimi almasıyla onlu askerî teşkilatın ders anlatımında ilişkilendirilmesi hangi yöntemle öğrenilmelidir?",
        options: [
          "Kişi, olay ve tarih ayrı alanlarda eşleştirilerek.",
          "MÖ sayısı büyüdükçe daima daha yeniye gidildiğini düşünerek.",
          "MÖ 209’u I. Kök Türklerin 552 kuruluşuyla aynı tarih sayarak.",
          "Mete’yi Uygur Bögü Kağan’ın diğer adı sayarak.",
          "Onlu teşkilatı bütün halkın eşit oy sistemi diye okuyarak.",
        ],
        answer: 0,
        hint: "Kişi, eylem ve zaman alanlarını ayrı yaz.",
        explanation:
          "Mete kişi, yönetimi alma olay, MÖ 209 tarih bilgisidir; teşkilat bağlantısı bunların yerine geçirilmez.",
        guidance: {
          knowledge: [
            "Tarihsel eşleştirmede kişi, olay ve takvim birlikte denetlenir.",
          ],
          strategy:
            "Bilgiyi kişi–göreve geliş–askerî düzen başlıklarıyla bir kartta düzenle; yılın neye ait olduğunu koruyarak seçeneklerin tarih ve rol karışıklıklarını sınayarak ilerle.",
          steps: [
            "Kişi, eylem ve zaman alanlarını ayrı yaz.",
            "Mete–yönetimi alma–MÖ 209 bağını, askerî teşkilat konusuyla ilişkilendir.",
            "MS 552 veya Uygur döneminin kişi adını bu eşleştirmenin yerine koyma.",
          ],
          optionReasons: [
            "Doğru. Mete kişi, yönetimi alma olay, MÖ 209 tarih bilgisidir; teşkilat bağlantısı bunların yerine geçirilmez.",
            "MÖ sıralamasında büyük sayı daha eski tarihe işaret eder.",
            "Takvim ve olaylar farklıdır; 552 MS bağlamıdır.",
            "Farklı kişi ve siyasi dönemlerdir.",
            "Onlu teşkilat askerî kademelendirmedir.",
          ],
          commonError:
            "Ortak devlet veya kağan sözcüğünden farklı dönemleri tek kişi sayma.",
          check: "Doğru yöntem üç temel alanın hiçbirini silmez.",
        },
      },
      {
        prompt:
          "Bir tabloda I. Kök Türk hükümdarı Taspar/Tapo’nun Budizme ilgisi, Uygur Bögü Kağan’ın Maniheizm politikası ayrı satırlardadır. Hangi ifade tabloya uygundur?",
        options: [
          "Her iki durumda bütün halk aynı gün aynı kararı vermiştir.",
          "Taspar ve Bögü aynı kişinin iki adıdır.",
          "İki ayrı kişi, devlet bağlamı ve dinî ilişki söz konusudur.",
          "Budizm ve Maniheizm aynı dinin zorunlu iki adıdır.",
          "I. Kök Türk ile Uygur aynı kesintisiz hanedandır.",
        ],
        answer: 2,
        hint: "Her satırda kişi, siyasi yapı ve dini ayrı eşleştir.",
        explanation:
          "Benzer dinî ilgi alanı iki hükümdarı veya iki dini aynı yapmaz; dönem ve siyasi yapı farklıdır.",
        guidance: {
          knowledge: ["Benzer olay türü farklı kişi ve dini özdeşleştirmez."],
          strategy:
            "Her hükümdar için devlet, kişi ve din politikası hücrelerini ayrı doldur; bir satırdaki tercihin diğer satıra ya da bütün halka aktarılıp aktarılmadığını denetle.",
          steps: [
            "Her satırda kişi, siyasi yapı ve dini ayrı eşleştir.",
            "Taspar/Tapo–I. Kök Türk–Budizm; Bögü–Uygur–Maniheizm ayrımını koru.",
            "Hükümdar düzeyindeki veriyi halkın tamamının eşzamanlı kararı yapma.",
          ],
          optionReasons: [
            "Hükümdarın ilgisi veya politikası bütün nüfusu aynı kapsamda göstermez.",
            "Tablo kişileri ayrı devlet bağlamında verir.",
            "Doğru. Benzer dinî ilgi alanı iki hükümdarı veya iki dini aynı yapmaz; dönem ve siyasi yapı farklıdır.",
            "Farklı öğreti ve geleneklerdir.",
            "Ortak coğrafya iki farklı siyasi yapıyı tek hanedan yapmaz.",
          ],
          commonError: "Dinî ilgi görünce bütün hükümdar adlarını tekleştirme.",
          check: "Yanıt tablonun iki satırını ayrı tutar.",
        },
      },
      {
        prompt:
          "Bir araştırma notu Yenisey yazıtlarında kişi, boy ve halk adlarının; Orhun yazıtlarında yönetim ve halka hitapların incelendiğini söylüyor. Bu karşılaştırmanın uygun sonucu hangisidir?",
        options: [
          "Bütün yazıtlar aynı kişi tarafından aynı gün yazılmıştır.",
          "Yönetim anlatısı bulunduğunda başka kaynak gereksizdir.",
          "Taşa yazılmış metinler yalnız modern dönemi anlatabilir.",
          "Yazıtlar farklı sorular için birbirini tamamlayan bilgiler sunabilir.",
          "Yazıtta ad geçmesi o kişinin bütün hayatını eksiksiz açıklar.",
        ],
        answer: 3,
        hint: "İki kaynak grubunun doğrudan verdiği bilgileri ayır.",
        explanation:
          "Kaynakların içerikleri aynı olmak zorunda değildir; ad bilgisiyle yönetim anlatısı farklı araştırma alanlarını destekler.",
        guidance: {
          knowledge: [
            "Kaynaklar aynı soruya aynı tür bilgi vermek zorunda değildir.",
          ],
          strategy:
            "İki yazıt grubunun sağlayabildiği bilgi türlerini karşılaştırma çizelgesine geçir; bir grubu diğerinin aynısı sayan veya kanıtı bütün topluma genişleten yorumları sına.",
          steps: [
            "İki kaynak grubunun doğrudan verdiği bilgileri ayır.",
            "Kişi ve boy adlarıyla yönetim anlatısı farklı soruları destekleyebilir.",
            "Tamamlayıcılık, bütün içeriklerin veya yazarların aynı olması değildir.",
          ],
          optionReasons: [
            "İçerik karşılaştırması ortak yazar ve gün vermez.",
            "Kaynakların amacı ve başka kanıtlarla uyumu yine incelenir.",
            "Kaynağın malzemesi anlattığı dönemi modernleştirmez.",
            "Doğru. Kaynakların içerikleri aynı olmak zorunda değildir; ad bilgisiyle yönetim anlatısı farklı araştırma alanlarını destekler.",
            "Ad bilgisi bütün biyografi değildir.",
          ],
          commonError: "Malzeme ortaklığını içerik ve yazar özdeşliği sayma.",
          check: "Doğru seçenek her iki bilgi türüne de yer verir.",
        },
      },
      {
        prompt:
          "Kurmaca bir Uygur işlem belgesi bir borcun miktarı ve vadesini kaydediyor. Yalnız bu belgeden hangi çıkarım uygun olur?",
        options: [
          "Vade yazıldığı için hiçbir ticaret yapılmamıştır.",
          "Belirli bir ekonomik işlemin yazılı koşullarla düzenlendiği.",
          "Toplumda hiçbir ekonomik işlem yapılamaz.",
          "Bütün halk aynı borç miktarını ödemiştir.",
          "Modern merkez bankası ve bütün banka türleri vardır.",
        ],
        answer: 1,
        hint: "Belgenin konusu olan miktar ve ödeme zamanını belirle.",
        explanation:
          "Miktar ve vade kaydı o borç ilişkisinin düzenini gösterir; bugünkü bankacılığın bütün kurumlarının varlığını kanıtlamaz.",
        guidance: {
          knowledge: ["Ekonomik belge kendi işlem kapsamıyla kullanılır."],
          strategy:
            "Borcun tutarı ve vadesi gibi belgede doğrudan kaydedilen alanları çıkar; ülke ekonomisi veya bütün nüfus hakkındaki seçeneklere ulaşmak için eksik kalan verileri belirle.",
          steps: [
            "Belgenin konusu olan miktar ve ödeme zamanını belirle.",
            "Bu iki koşul belirli borç ilişkisinin yazılı düzenlendiğini gösterir.",
            "Tek işlemden bütün modern mali kurumları veya bütün nüfusu çıkarma.",
          ],
          optionReasons: [
            "Vade ticaret yokluğu anlamına gelmez.",
            "Doğru. Miktar ve vade kaydı o borç ilişkisinin düzenini gösterir; bugünkü bankacılığın bütün kurumlarının varlığını kanıtlamaz.",
            "Borç işlemi bizzat ekonomik ilişki kanıtıdır.",
            "Belge belirli işlemle sınırlıdır.",
            "Tek borç kaydı bu geniş kurumsal yapıyı vermez.",
          ],
          commonError: "Eski borç kaydını bugünkü bankanın bütün örgütü sayma.",
          check: "Yanıt yalnız kayıtlı miktar ve vadeye dayanır.",
        },
      },
      {
        prompt:
          "Bir öğretim betimlemesinde birlikler düzenlerini bozmadan geri çekiliyor; karşı tarafı belirli alana çekip kanatlardan kuşatıyor. Bu betimlemede belirleyici taktik koşul hangisidir?",
        options: [
          "Komutanlar arası iletişimin gereksiz olmasıdır.",
          "Her düzensiz kaçışın aynı taktik sayılmasıdır.",
          "Bütün askerlerin yalnız denizci olmasıdır.",
          "Planlı yanıltma ve eşgüdümlü çevirmedir.",
          "Surlu her kentin araçsız kesin alınmasıdır.",
        ],
        answer: 3,
        hint: "Çekilişin kontrollü olduğuna ve sonraki manevraya bak.",
        explanation:
          "Sahte ricatın ayırıcı yönü kontrollü çekilişin sonraki manevrayla birlikte planlanmasıdır.",
        guidance: {
          knowledge: [
            "Taktik görünüşten çok plan ve eşgüdüm koşullarıyla tanınır.",
          ],
          strategy:
            "Betimlenen hareketleri zaman sırasıyla küçük bir manevra şemasına çiz; her aşamanın düzen ve sonraki hareketle bağını koruyarak taktik yorumlarını karşılaştır.",
          steps: [
            "Çekilişin kontrollü olduğuna ve sonraki manevraya bak.",
            "Karşı tarafın alana çekilip kanatlardan sarılması planlı yanıltmayı gösterir.",
            "Bu koşulları her geri çekilme veya her arazi için otomatik kabul etme.",
          ],
          optionReasons: [
            "Eşgüdümlü çekiliş ve çevirme tersine koordinasyon gerektirir.",
            "Düzen ve sonraki kuşatma koşulları düzensiz kaçıştan ayrılır.",
            "Deniz harekâtı anlatılmıyor.",
            "Doğru. Sahte ricatın ayırıcı yönü kontrollü çekilişin sonraki manevrayla birlikte planlanmasıdır.",
            "Betimleme açık alandaki çekiliş ve çevirmedir; kuşatma aracı verilmez.",
          ],
          commonError: "Her geri hareketi sahte ricat sayma.",
          check: "Doğru seçenek betimlemedeki iki aşamayı birlikte içerir.",
        },
      },
      {
        prompt:
          "Bir tabloda Türgişler Emevi ilerleyişine karşı Maveraünnehir mücadelesiyle, Karluklar 751 Talas’ta Abbasi tarafına destekle ilişkilendiriliyor. Hangi yöntem uygundur?",
        options: [
          "Her iki satırı Emevilerin Çin’e karşı ittifakı saymak.",
          "Türgiş ile Karluk adını tek hükümdarın adı saymak.",
          "Her askerî ilişkinin bütün halkın aynı dinini gösterdiğini varsaymak.",
          "Tarih verildiği için coğrafyayı gereksiz saymak.",
          "Aktör, dönem ve ilişki yönünü ayrı tutmak.",
        ],
        answer: 4,
        hint: "Her satıra topluluk, dönem ve rol yaz.",
        explanation:
          "İki topluluk farklı dönemde ve farklı siyasi bağlamda farklı rollerle verilmiştir; ikisi tek savaşın aynı tarafı diye birleştirilemez.",
        guidance: {
          knowledge: ["Toplulukların farklı tarihsel rolleri korunur."],
          strategy:
            "Topluluk adlarını yer, zaman ve karşılaşmadaki rol ile eşleştiren üç sütun kullan; ortak coğrafyadan aynı eylem veya aynı siyasi yapı sonucu çıkaran seçenekleri ele.",
          steps: [
            "Her satıra topluluk, dönem ve rol yaz.",
            "Direniş ile destek farklı ilişki yönleridir.",
            "Abbasi ve Emevi bağlamlarını aynı olayda birleştirmeden karşılaştır.",
          ],
          optionReasons: [
            "Karluk satırı Abbasi–Tang ve 751 bağlamındadır.",
            "Tabloda topluluklar anlatılmaktadır.",
            "Siyasi-askerî rol tek başına bütün nüfusun inancını belirlemez.",
            "Maveraünnehir ve Talas bağlamları eşleştirmede önemlidir.",
            "Doğru. İki topluluk farklı dönemde ve farklı siyasi bağlamda farklı rollerle verilmiştir; ikisi tek savaşın aynı tarafı diye birleştirilemez.",
          ],
          commonError:
            "Benzer coğrafyadaki bütün mücadeleleri aynı olay sayma.",
          check: "Yanıt tablonun iki ayrı bağlamını da korur.",
        },
      },
      {
        prompt:
          "Hazar yönetici çevresinde Musevilik, bir şehir kaydında ise farklı dinlerin ibadet yerleri birlikte anılıyor. Bu iki veri nasıl okunmalıdır?",
        options: [
          "Bütün halkın yalnız aynı dine bağlı olduğu kesinleşir.",
          "Yönetici grubun tercihiyle şehirdeki inanç çeşitliliği ayrı kapsamlarla birlikte değerlendirilebilir.",
          "Her ibadet yeri mutlaka ayrı bağımsız devlet demektir.",
          "Bütün hak alanlarında modern eşitlik mutlaka kurulmuştur.",
          "Yönetici tercihi kaydı kesinlikle yok sayılmalıdır.",
        ],
        answer: 1,
        hint: "Yönetici çevre ile şehirdeki toplulukları ayrı gruplar olarak belirle.",
        explanation:
          "İki veri çelişmek zorunda değildir; yönetici çevre bütün nüfusla aynı kapsam değildir.",
        guidance: {
          knowledge: ["Yönetici ve halk aynı kapsam değildir."],
          strategy:
            "Yönetici çevreye ait veriyle şehirdeki gruplara ait veriyi ayrı örneklem satırlarına yerleştir; kapsamlar arasındaki geçişin hangi ek kanıtı gerektirdiğini düşün.",
          steps: [
            "Yönetici çevre ile şehirdeki toplulukları ayrı gruplar olarak belirle.",
            "Farklı ibadet yerleri çeşitliliğe, yönetici kaydı belirli grubun tercihine aittir.",
            "İki veri birlikte okunabilir; tek din veya tam hak eşitliği eklenmez.",
          ],
          optionReasons: [
            "Farklı ibadet yerleri bu tek tipliliği desteklemez.",
            "Doğru. İki veri çelişmek zorunda değildir; yönetici çevre bütün nüfusla aynı kapsam değildir.",
            "Dinî yapı siyasi egemenlik sınırı değildir.",
            "Bir arada bulunma tüm siyasi ve hukuki hakları vermez.",
            "Farklı şehir toplulukları yönetici kaydını kendiliğinden geçersiz yapmaz.",
          ],
          commonError: "Yönetici dinini bütün nüfusa otomatik yayma.",
          check: "Doğru seçenek her iki kaydı da kendi grubuyla korur.",
        },
      },
      {
        prompt:
          "Bir dil notu Macarcanın Fin-Ugor dil grubu bağlamında incelendiğini, Macarların bozkır topluluklarıyla tarihsel temasları da bulunduğunu belirtiyor. Bu iki bilgi için uygun yorum hangisidir?",
        options: [
          "Temas varsa bütün diller mutlaka Türkçe olmuştur.",
          "Dil grubu her bireyin dinini kesin belirler.",
          "Dil grupları farklıysa hiçbir tarihsel temas olamaz.",
          "Bütün topluluklar aynı siyasi devlet içinde yaşamıştır.",
          "Tarihsel temas ile dil grubunun aynı olması farklı iddialardır.",
        ],
        answer: 4,
        hint: "Dil sınıflamasıyla tarihsel temas bilgisini ayır.",
        explanation:
          "Topluluklar temas kurup kültürel etkileşebilir; bu, dillerinin aynı grupta olduğunu tek başına göstermez.",
        guidance: {
          knowledge: [
            "Dil, temas ve siyasi kimlik ayrı kanıtlarla araştırılır.",
          ],
          strategy:
            "Dil ailesi sınıflamasını temas tarihinden bağımsız bir inceleme ekseni olarak çiz; seçeneklerin bu iki ekseni hangi gerekçeyle birleştirdiğini denetle.",
          steps: [
            "Dil sınıflamasıyla tarihsel temas bilgisini ayır.",
            "Farklı diller arasında da etkileşim bulunabilir.",
            "Temastan dil, din ve devlet özdeşliğine atlama.",
          ],
          optionReasons: [
            "Temas bilgisi dil sınıflamasını kendiliğinden değiştirmez.",
            "Dil sınıflaması bireysel dinin ölçüsü değildir.",
            "Not temasın bulunduğunu açıkça belirtir.",
            "Dil ve temas verileri böyle bir siyasi birlik vermez.",
            "Doğru. Topluluklar temas kurup kültürel etkileşebilir; bu, dillerinin aynı grupta olduğunu tek başına göstermez.",
          ],
          commonError: "Komşuluk veya etkileşimi dil özdeşliği sayma.",
          check: "Yanıt nottaki iki bilgiyi çelişki üretmeden korur.",
        },
      },
      {
        prompt:
          "840’ta Uygur Kağanlığı’nın bozkır merkezli gücünü kaybetmesinde Kırgız müdahalesi belirtiliyor. Bu anlatının siyasi aktörü hangisidir?",
        options: [
          "Şam Emevileri.",
          "Batı Roma.",
          "Kırgızlar.",
          "I. Kök Türk kurucusu Bumin.",
          "Türkiye Selçukluları.",
        ],
        answer: 2,
        hint: "Kökteki siyasi kırılmanın yılını ve adlandırılmış müdahaleyi bul.",
        explanation:
          "Verilen müdahale Kırgızlarla ilişkilendirilmiştir; olay bir siyasi hâkimiyet değişimi bağlamındadır.",
        guidance: {
          knowledge: ["Olayın aktörü tarih ve coğrafyayla eşleştirilir."],
          strategy:
            "Kronoloji kaydındaki özne, müdahale ve etkilenen siyasi yapı alanlarını çıkar; benzer dönemlerde geçen adları bu üçlüye uyumları bakımından karşılaştır.",
          steps: [
            "Kökteki siyasi kırılmanın yılını ve adlandırılmış müdahaleyi bul.",
            "840 için verilen aktör Kırgızlardır.",
            "Bu eşleştirme Uygur toplumunun veya kültürünün tümüyle bittiği iddiasını içermez.",
          ],
          optionReasons: [
            "Farklı coğrafya ve siyasi dönemin yapısıdır; verilen müdahale bu adla tanımlanmaz.",
            "Batı Roma’nın siyasi sonu 476’dır; 840 Orta Asya bağlamını karşılamaz.",
            "Doğru. Verilen müdahale Kırgızlarla ilişkilendirilmiştir; olay bir siyasi hâkimiyet değişimi bağlamındadır.",
            "Bumin 552 kuruluş bağlamındadır; 840 müdahalesinin aktörü değildir.",
            "1077 kuruluşuyla ilişkili sonraki Anadolu devletidir.",
          ],
          commonError:
            "Bir siyasi sonu başka coğrafyadaki eski devletin olayıyla karıştırma.",
          check: "Doğru aktör kökte açıkça verilen müdahaleyi karşılar.",
        },
      },
      {
        prompt:
          "Bir araştırma Oğuz Yabgu çevresini Seyhun sahasında, daha sonraki Oğuz kökenli siyasi oluşumları farklı coğrafyalarda inceliyor. Ortak Oğuz bağlantısı hangi sonucu tek başına vermez?",
        options: [
          "Dönem bilgisinin önemli olduğunu.",
          "Topluluk bağlarının siyasi tarihte araştırılabileceğini.",
          "Farklı siyasi coğrafyaların karşılaştırılabileceğini.",
          "Devlet ve topluluk kavramlarının ayrılması gerektiğini.",
          "Bütün oluşumların aynı merkezden yönetilen kesintisiz tek devlet olduğunu.",
        ],
        answer: 4,
        hint: "Ortak bağın topluluk düzeyinde olduğunu belirle.",
        explanation:
          "Ortak topluluk bağı, farklı dönem ve coğrafyalardaki devletleri tek siyasi yapı yapmaz.",
        guidance: {
          knowledge: ["Topluluk bağı ile devlet birliği farklı ölçütlerdir."],
          strategy:
            "Oğuz bağlantısını topluluk, dönem ve siyasi örgütlenme düzeylerinde ayrı satırlara yaz; ortak adın tek başına karşılamadığı koşulları seçeneklerde ara.",
          steps: [
            "Ortak bağın topluluk düzeyinde olduğunu belirle.",
            "Farklı merkez ve dönemleri siyasi yapı düzeyinde ayrı tut.",
            "Olumsuz kökte ortak kökenden kesintisiz tek devlet çıkaran iddiayı seç.",
          ],
          optionReasons: [
            "Daha sonraki oluşumlar ifadesi zamanı ayırmayı gerektirir.",
            "Oğuz bağlantısı bu araştırma konusu için kullanılabilir.",
            "Araştırmanın açık düzeni budur.",
            "Soru bu ayrımı gerektirir; desteklenen sınırlı yöntemdir.",
            "Doğru. Ortak topluluk bağı, farklı dönem ve coğrafyalardaki devletleri tek siyasi yapı yapmaz.",
          ],
          commonError:
            "Ortak boy bağlantısını tek hanedan ve tek devlet tarihi sayma.",
          check:
            "Desteklenmeyen seçenek merkez ve dönem farklılıklarını siler.",
        },
      },
      {
        prompt:
          "Bir kaynak Peçeneklerin Bizans’la bazı dönemlerde savaştığını, başka kayıtlarda Bizans hizmetinde askerlik yaptığını bildiriyor. En uygun yöntem hangisidir?",
        options: [
          "Bütün Peçeneklerin aynı anda Bizans hükümdarı olduğunu söylemek.",
          "İki kayıt sayesinde bütün kişilerin aynı inancı taşıdığını hesaplamak.",
          "Her ilişkiyi kendi dönem, amaç ve aktörleriyle incelemek.",
          "Hizmet varsa hiçbir savaş yaşanmadığını söylemek.",
          "Savaş varsa hizmet kaydının mutlaka sahte olduğunu söylemek.",
        ],
        answer: 2,
        hint: "Kayıtların aynı anı değil farklı dönemleri anlatabileceğini kontrol et.",
        explanation:
          "Farklı zamanlarda savaş ve hizmet ilişkileri bulunabilir; bir topluluğa bütün çağlar için tek ilişki etiketi verilmez.",
        guidance: {
          knowledge: ["Dış ilişkiler zaman ve amaçla değişebilir."],
          strategy:
            "Her Bizans ilişkisini ait olduğu zaman ve hizmet türüyle kaydet; iki kaydın birlikte bulunmasına izin veren yorumla onları zorla aynı ana taşıyan yorumu karşılaştır.",
          steps: [
            "Kayıtların aynı anı değil farklı dönemleri anlatabileceğini kontrol et.",
            "Savaş ve hizmet farklı amaçlara bağlı ilişkilerdir.",
            "Tek ve değişmez dostluk/düşmanlık etiketi yerine dönemsel karşılaştırma kur.",
          ],
          optionReasons: [
            "Askerî hizmet hükümdarlık görevi değildir.",
            "Siyasi-askerî ilişki bütün bireylerin dinini vermez.",
            "Doğru. Farklı zamanlarda savaş ve hizmet ilişkileri bulunabilir; bir topluluğa bütün çağlar için tek ilişki etiketi verilmez.",
            "Sonraki veya başka bağlamdaki hizmet önceki savaşı silmez.",
            "İki ilişki farklı zamanlarda birlikte mümkün olabilir.",
          ],
          commonError:
            "Bir dönemdeki ilişkiyi bütün topluluk tarihine değişmeden yayma.",
          check:
            "Doğru yöntem iki kaydı gereksizce birbirini dışlayan veri saymaz.",
        },
      },
      {
        prompt:
          "İpek Yolu bağlantılarında Soğdlu tüccarların aracı rolü belirtiliyor. Bu rol hangi sınırlı sonucu destekler?",
        options: [
          "Yolun yalnız ipek taşıdığı kesinleştiğini.",
          "Farklı merkezler arasındaki mal ve bilgi aktarımında aracılık bulunabildiğini.",
          "Bütün güzergâhın sürekli tek devlet elinde olduğunu.",
          "Türk topluluklarının hiçbir tüccarı bulunmadığını.",
          "Ticaret yapanların mutlaka aynı dine geçtiğini.",
        ],
        answer: 1,
        hint: "Verilen işi aracılık ve bağlantı kurma olarak tanımla.",
        explanation:
          "Tüccar aracılığı bağlantılar ve aktarımla ilişkilidir; bütün ticaretin tek gruba ait olduğu anlamına gelmez.",
        guidance: {
          knowledge: ["Ticari aracılık başka aktörleri ve işlevleri dışlamaz."],
          strategy:
            "Tüccarın bağlantı kurduğu tarafları bir ağla göster; aracılık eyleminin doğrudan kanıtladığı rolle ona eklenen siyasi ve toplumsal sonuçları ayır.",
          steps: [
            "Verilen işi aracılık ve bağlantı kurma olarak tanımla.",
            "Bu iş mal ve bilgi dolaşımını destekleyebilir.",
            "Aracılıktan tek ticaret grubu, tek ürün veya tek egemenlik sonucu üretme.",
          ],
          optionReasons: [
            "Aracı rolü taşınan bütün ürünlerin listesini vermez.",
            "Doğru. Tüccar aracılığı bağlantılar ve aktarımla ilişkilidir; bütün ticaretin tek gruba ait olduğu anlamına gelmez.",
            "Aracılık egemenlik haritasının tamamı değildir.",
            "Bir grubun aracılığı başka grupların ticaretini dışlamaz.",
            "Ticari görev inanç tercihini zorunlu belirlemez.",
          ],
          commonError: "Önemli bir aktörü bütün ağın tek sahibi sayma.",
          check: "Doğru seçenek açık rolün kapsamını aşmaz.",
        },
      },
      {
        prompt:
          "Bir tarihsel metin Türkiye adını Orta Asya için, başka döneme ait metin ise Anadolu için kullanıyor. Bu iki kullanımı değerlendirirken ilk yapılması gereken nedir?",
        options: [
          "İki bölgede yaşayan herkesin aynı hükümdara bağlı olduğunu söylemek.",
          "Ad aynı olduğu için tarihleri incelememek.",
          "İki metnin mutlaka aynı modern sınırı gösterdiğini varsaymak.",
          "Her metnin tarihini ve adlandırdığı coğrafyayı ayrı belirlemek.",
          "Metinlerden birini yalnız farklı yer söylediği için yok saymak.",
        ],
        answer: 3,
        hint: "Aynı adın iki metindeki yer karşılığını bul.",
        explanation:
          "Aynı coğrafi ad farklı zamanlarda farklı alanları gösterebilir; modern ülke sınırı iki metne doğrudan aktarılmaz.",
        guidance: {
          knowledge: ["Tarihsel coğrafi adın anlamı dönemle belirlenir."],
          strategy:
            "Adın kullanıldığı her belgeye tarih ve coğrafi karşılık etiketi ekle; aynı sözcüğü bugünkü sınırlarla otomatik eşitleyen okumaları bu iki etiketle denetle.",
          steps: [
            "Aynı adın iki metindeki yer karşılığını bul.",
            "Metinlerin zamanını ekleyerek kullanım değişimini değerlendir.",
            "Bugünkü sınır ve tek devlet varsayımını kaynakların yerine koyma.",
          ],
          optionReasons: [
            "Ortak ad tek siyasi egemenlik kanıtı değildir.",
            "Zaman farkı kullanımın anlamında belirleyici olabilir.",
            "Tarihsel kullanımın coğrafyası ayrıca belirlenmelidir.",
            "Doğru. Aynı coğrafi ad farklı zamanlarda farklı alanları gösterebilir; modern ülke sınırı iki metne doğrudan aktarılmaz.",
            "Değişen kullanım mümkün olduğundan çelişki kendiliğinden kurulamaz.",
          ],
          commonError: "Aynı sözcüğü bütün çağlarda tek değişmez sınır sayma.",
          check: "Yöntem ad, yer ve zamanı birlikte korur.",
        },
      },
      {
        prompt:
          "Bir göç açıklamasında otlak daralması ve dış baskı nedenler; at ve taşınabilir çadır hareketi kolaylaştıran araçlar olarak veriliyor. Bu ayrımın doğru kullanımı hangisidir?",
        options: [
          "Çadır bulunduğu için bütün toplulukların sürekli aynı yere gittiğini söylemek.",
          "Otlak daralmasının bütün dil ve dinlerin aynılaşmasını zorunlu kıldığını söylemek.",
          "Nedenlerle hareketin nasıl mümkün olduğunu açıklayan araçları ayrı tutmak.",
          "Dış baskının siyasi etken olmadığını söylemek.",
          "Bütün göçlerin tek nedeninin at bulunması olduğunu söylemek.",
        ],
        answer: 2,
        hint: "Önce neden diye verilen iki koşulu işaretle.",
        explanation:
          "Otlak ve baskı hareketi iten koşullardır; at ve çadır ise hareket kapasitesini etkileyen araçlardır.",
        guidance: {
          knowledge: [
            "İtici koşul ile hareket aracı farklı soruları yanıtlar.",
          ],
          strategy:
            "Göç açıklamasını iten koşullar, hedefler ve hareketi mümkün kılan donanım olarak sınıflandır; seçeneklerde bir araçla nedenin yer değiştirilip değiştirilmediğini kontrol et.",
          steps: [
            "Önce neden diye verilen iki koşulu işaretle.",
            "Sonra araçların hareketi kolaylaştırma işlevini ayır.",
            "Açıklamayı tek araç veya bütün topluluklar için zorunlu kültürel sonuç yapma.",
          ],
          optionReasons: [
            "Araç güzergâh ve bütün toplulukların davranışını belirlemez.",
            "Geçim baskısından böyle kapsamlı kültürel sonuç çıkmaz.",
            "Doğru. Otlak ve baskı hareketi iten koşullardır; at ve çadır ise hareket kapasitesini etkileyen araçlardır.",
            "Verilen baskı göçü etkileyen siyasi koşul olarak kullanılabilir.",
            "Araç, her göçün tek nedeni değildir.",
          ],
          commonError: "Bir teknolojik imkânı bütün göçlerin tek nedeni sayma.",
          check: "Yanıt metindeki neden/araç ayrımını değiştirmeden kullanır.",
        },
      },
    ],
  },
  {
    id: "islam-medeniyetinin-dogusu-ileri",
    base: "islam-medeniyetinin-dogusu",
    title: "İslam medeniyeti: ileri dönem ve kurum soruları",
    questions: [
      {
        prompt:
          "Bir karşılaştırma 615 Habeşistan göçünü güvenlik arayışıyla, 622 Medine hicretini ise yeni toplumsal-siyasi örgütlenmeyle birlikte ele alıyor. Hangi sonuç bu ayrımı korur?",
        options: [
          "Her iki göçün hedefi yalnız Şam’dır.",
          "615 ile 622 aynı takvim yılının iki yazımıdır.",
          "Ortak göç adı, hedef yer ve sonuçların aynı olduğu anlamına gelmez.",
          "Her göç aynı siyasi sonucu zorunlu doğurur.",
          "Habeşistan göçü Medine’deki bütün kurumları aynı anda kurmuştur.",
        ],
        answer: 2,
        hint: "Her tarih için hedef yeri ayrı belirle.",
        explanation:
          "İki gelişme göç olmakla birlikte farklı tarihlere, hedef yerlere ve örgütlenme bağlamlarına aittir.",
        guidance: {
          knowledge: [
            "Aynı olay türünün farklı örnekleri aynı sonuç değildir.",
          ],
          strategy:
            "İki göçün yılını, hedef yerini ve verilen örgütlenme bilgisini ayrı satırlarda tut; benzer hareket adından aynı siyasi sonuca geçmeyen seçeneği araştır.",
          steps: [
            "Her tarih için hedef yeri ayrı belirle.",
            "615 güvenlik göçüyle, 622 Medine’de örgütlenmeyle ilişkilendirilmiştir.",
            "Ortak adın altında farklı yer ve işlevleri koruyan seçeneği seç.",
          ],
          optionReasons: [
            "Verilen hedefler Habeşistan ve Medine’dir.",
            "Aynı MS takvimindeki iki farklı yıldır.",
            "Doğru. İki gelişme göç olmakla birlikte farklı tarihlere, hedef yerlere ve örgütlenme bağlamlarına aittir.",
            "Karşılaştırma sonuçların farklı bağlamlarda ele alınmasını gerektirir.",
            "Farklı yer ve aşamalar gerekçesiz birleştirilir.",
          ],
          commonError: "Göç sözcüğünü yer ve tarih bilgisinin yerine kullanma.",
          check: "Yanıt iki hedef yer ve iki bağlamı birleştirmeden korur.",
        },
      },
      {
        prompt:
          "Bir ders açıklaması Mescid-i Nebevi’de ibadet yanında öğretim ve toplumsal görüşmelerden de söz ediyor. Bu bilgi hangi yorumu destekler?",
        options: [
          "Bir kurum birden fazla işlev taşıyabilir.",
          "Öğretim varsa ibadet hiç yapılamaz.",
          "Şehirdeki herkes aynı görevi yapmıştır.",
          "Bütün kurumlar yalnız askerî kışladır.",
          "Bütün çağdaş bakanlıklar aynı biçimde kurulmuştur.",
        ],
        answer: 0,
        hint: "Metindeki üç eylemi ayrı yaz.",
        explanation:
          "İbadet, öğretim ve toplumsal görüşme aynı kurum çevresinde birlikte anılmıştır; bunları birbirini dışlayan işler saymak gerekmez.",
        guidance: {
          knowledge: ["Kurumlar tarihsel bağlamda çok işlevli olabilir."],
          strategy:
            "Kurumda anlatılan faaliyetleri işlev başlıkları altında topla; seçeneklerin bu listedeki bir işi dışlayıp dışlamadığını veya kurumun bütün çağdaş karşılıklarını varsayıp varsaymadığını denetle.",
          steps: [
            "Metindeki üç eylemi ayrı yaz.",
            "Aynı kurum çevresinde verilmeleri çok işlevliliğe kanıttır.",
            "Buradan herkesin görevi veya bugünkü kurumların tamamı hakkında sonuç çıkarma.",
          ],
          optionReasons: [
            "Doğru. İbadet, öğretim ve toplumsal görüşme aynı kurum çevresinde birlikte anılmıştır; bunları birbirini dışlayan işler saymak gerekmez.",
            "İki işlev metinde birlikte verilmiştir.",
            "Kurum işlevleri bütün kişilerin görev dağılımı değildir.",
            "Metin askerî kışla değil üç farklı işlev anlatır.",
            "Tarihsel işlevler bugünkü tüm kurumsal örgüyü kanıtlamaz.",
          ],
          commonError:
            "Tek bir baskın işleve bakıp diğer açık işlevleri yok sayma.",
          check: "Doğru seçenek metindeki üç işlevi de kabul eder.",
        },
      },
      {
        prompt:
          "Bedir sonrasına ilişkin ders anlatımında bazı esirlerin okuma-yazma öğretmeleri karşılığında serbest bırakılması örnekleniyor. Bu örneğin doğrudan gösterdiği ilişki hangisidir?",
        options: [
          "Savaşların bütün sonuçlarının yalnız eğitim olduğu.",
          "Askerî gelişme sonrasında öğretimin bir uygulamayla ilişkilendirilmesi.",
          "Bütün esirlerin aynı işlemi yaptığı.",
          "Toplumdaki herkesin zaten okuryazar olduğu.",
          "Okuma-yazmanın yalnız bu olayda ilk kez doğduğu.",
        ],
        answer: 1,
        hint: "Koşul olarak verilen okuma-yazma öğretimini bul.",
        explanation:
          "Serbest bırakma koşulu olarak okuma-yazma öğretiminin anılması askerî olayla eğitim uygulaması arasındaki bağı gösterir.",
        guidance: {
          knowledge: ["Somut uygulama iki alan arasındaki bağı gösterebilir."],
          strategy:
            "Serbest bırakılma ile öğretim koşulu arasındaki bağı küçük bir koşul şemasıyla göster; bu bağın doğrudan değindiği alanı diğer toplumsal iddialardan ayır.",
          steps: [
            "Koşul olarak verilen okuma-yazma öğretimini bul.",
            "Bu koşulu serbest bırakma uygulamasıyla ilişkilendir.",
            "Örneğin kapsamını bütün esirlere veya bütün nüfusa yayma.",
          ],
          optionReasons: [
            "Tek uygulamadan bütün askerî sonuçlar belirlenemez.",
            "Doğru. Serbest bırakma koşulu olarak okuma-yazma öğretiminin anılması askerî olayla eğitim uygulaması arasındaki bağı gösterir.",
            "Örnek bazı kişilere ilişkindir; herkes kapsamı verilmez.",
            "Öğretim koşulu bütün toplumun mevcut okuryazarlık oranını vermez.",
            "Bir öğretim uygulaması yazının ilk icadı değildir.",
          ],
          commonError:
            "Bir eğitim örneğini bütün toplumun tam okuryazarlığı sayma.",
          check: "Yanıt yalnız verilen öğretim koşulunu kullanır.",
        },
      },
      {
        prompt:
          "Bir tabloda 625 Uhud için askerî disiplin ve savaşın gidişi, 627 Hendek için Medine’nin savunulması vurgulanıyor. Tablo nasıl okunmalıdır?",
        options: [
          "Disiplin bütün savaşların tek yeterli nedenidir.",
          "Uhud ile Hendek aynı günün iki takvimdeki adıdır.",
          "Tabloda askerî konu bulunmamaktadır.",
          "Farklı olayların farklı askerî koşulları ayrı incelenmelidir.",
          "Her iki olay da yalnız Endülüs’te geçmiştir.",
        ],
        answer: 3,
        hint: "Tarih ve olay adlarını ayrı eşleştir.",
        explanation:
          "Aynı dönemdeki savaşlar farklı savunma ve komuta koşullarıyla açıklanabilir; tek olayın iki adı değildir.",
        guidance: {
          knowledge: ["Askerî olayların koşulları ayrı karşılaştırılır."],
          strategy:
            "Her savaş için yıl, olay ve vurgulanan koşulu aynı satırda birleştir; iki satırın yerlerini değiştiren veya özelliklerini bütün savaşlara yayan yorumları sına.",
          steps: [
            "Tarih ve olay adlarını ayrı eşleştir.",
            "Her satırın askerî vurgusunu kendi bağlamında tut.",
            "Ortak savaş sözcüğünden tek olay veya tek neden sonucu çıkarma.",
          ],
          optionReasons: [
            "Bir olayın belirli vurgusu bütün savaşlar için tek neden olmaz.",
            "Tablo farklı MS yılları ve olaylar verir.",
            "Disiplin, savaşın gidişi ve savunma askerî bağlamdır.",
            "Doğru. Aynı dönemdeki savaşlar farklı savunma ve komuta koşullarıyla açıklanabilir; tek olayın iki adı değildir.",
            "Hendek açıkça Medine savunmasıyla ilişkilendirilmiştir.",
          ],
          commonError:
            "Benzer konu alanındaki farklı savaşları aynı gelişme sayma.",
          check: "Doğru yanıt tablonun iki satırını da korur.",
        },
      },
      {
        prompt:
          "Dört Halife dönemi için 632 ve 661 sınır yılları veriliyor. Yalnız bu iki MS yıl sayısının farkı kaçtır; bu fark tam gün ve ay bilgisini de verir mi?",
        options: [
          "29 takvim yılı farkı; gün ve ay ayrıntısı vermez.",
          "0 yıl; iki sınır aynı olaydır.",
          "30 yıl; bütün aylar kesin bilinmektedir.",
          "29 yıl; bütün günler de kesin belirlenmiştir.",
          "61 yıl; başlangıç yılı önemsizdir.",
        ],
        answer: 0,
        hint: "İstenen işlemin yıl sayıları arasındaki fark olduğunu belirle.",
        explanation:
          "661−632=29’dur. Yıl sayıları arasındaki fark, olayların gün ve ayını kendiliğinden belirtmez.",
        guidance: {
          knowledge: ["Yıl farkı ile kesin tarih aralığı ayrılır."],
          strategy:
            "Yıl sayılarının farkını bir sayı doğrusu üzerinde hesaplamayı seç; hesaplanan büyüklüğün birimiyle gün ve ay kesinliği iddiasını ayrıca denetle.",
          steps: [
            "İstenen işlemin yıl sayıları arasındaki fark olduğunu belirle.",
            "661’den 632’yi çıkar: 29.",
            "Bu sayıyı verilmemiş ay ve gün ayrıntısıyla genişletme.",
          ],
          optionReasons: [
            "Doğru. 661−632=29’dur. Yıl sayıları arasındaki fark, olayların gün ve ayını kendiliğinden belirtmez.",
            "632 ve 661 farklı yıl sayılarıdır.",
            "Çıkarma 29 verir; uç yılları adet olarak saymak başka işlemdir.",
            "Yıl farkı doğru olsa da gün ve ay bilgisi verilmemiştir.",
            "661’in son iki hanesini almak yıl farkı hesabı değildir.",
          ],
          commonError:
            "Sınır yıllarını dahil saymayla çıkarma işlemini karıştırma.",
          check: "632+29=661 kontrolü sağlanır.",
        },
      },
      {
        prompt:
          "Bir öğretim notu Hz. Osman dönemini donanma faaliyetleri ve Kur’an nüshalarının merkezlere gönderilmesiyle birlikte ilişkilendiriyor. Bu iki bilgi hangi yaklaşımla öğrenilmelidir?",
        options: [
          "Donanma sözcüğünü yazı kopyalama tekniği sayarak.",
          "İki faaliyeti yalnız Hz. Ali’nin Cemel olayı diye adlandırarak.",
          "Nüsha dağıtımını her durumda deniz savaşı sayarak.",
          "Aynı dönemin askerî ve metin aktarımıyla ilgili farklı işlevleri olarak.",
          "Askerî faaliyet varsa metinle ilgili hiçbir iş olamaz diyerek.",
        ],
        answer: 3,
        hint: "İki faaliyetin nesnesini ayır: deniz gücü ve metin nüshaları.",
        explanation:
          "Donanma ile nüsha çoğaltıp dağıtma farklı faaliyetlerdir; aynı dönemde bulunmaları onları aynı işlem yapmaz.",
        guidance: {
          knowledge: [
            "Bir dönemde farklı kurum ve faaliyetler birlikte gelişebilir.",
          ],
          strategy:
            "Faaliyetleri aynı hükümdar dönemine bağlarken her birinin nesnesini ve işlevini koru; ortak dönemi aynı işlem veya aynı kurum adı sayan seçenekleri karşılaştır.",
          steps: [
            "İki faaliyetin nesnesini ayır: deniz gücü ve metin nüshaları.",
            "İkisini Hz. Osman dönemiyle eşleştirirken farklı işlevlerini koru.",
            "Birinin adını diğerinin işlemi yerine koyma.",
          ],
          optionReasons: [
            "Donanma deniz gücüyle ilişkilidir.",
            "Dönem ve olay eşleştirmesi değiştirilmiş olur.",
            "Bir metnin dağıtımı savaşın kendisi değildir.",
            "Doğru. Donanma ile nüsha çoğaltıp dağıtma farklı faaliyetlerdir; aynı dönemde bulunmaları onları aynı işlem yapmaz.",
            "Not iki faaliyeti aynı dönemde açıkça birlikte verir.",
          ],
          commonError: "Ortak dönem bilgisini eylemlerin özdeşliği sayma.",
          check: "Yanıt dönemi ve iki ayrı işi birlikte korur.",
        },
      },
      {
        prompt:
          "Bir divan kaydında askerlerin ve ödemelerinin listelendiği belirtiliyor. Divan teriminin bu bağlamdaki işlevi hangisidir?",
        options: [
          "Yalnız hastaların ameliyatı.",
          "Bütün sözleşmelerin yok edilmesi.",
          "Sadece kervan konaklaması.",
          "Her durumda halkın genel oy toplantısı.",
          "Kayıt ve idari düzenleme.",
        ],
        answer: 4,
        hint: "Belirleyici işi liste tutma olarak tanımla.",
        explanation:
          "Asker ve ödeme listesi idari kayıt işlevini gösterir; divanın her çağda yalnız aynı tür meclis olduğunu kanıtlamaz.",
        guidance: {
          knowledge: ["Terimin anlamı kullanıldığı işlevle belirlenir."],
          strategy:
            "Divan sözcüğünün bütün kullanımlarını ezberden taşımak yerine bu örnekte kayıt altına alınan özneleri ve tutarları izle; işlev seçeneklerini bu işlemle sınırla.",
          steps: [
            "Belirleyici işi liste tutma olarak tanımla.",
            "Asker ve ödeme kayıtlarını idari düzenleme alanına bağla.",
            "Terimi farklı bağlamlardaki bütün kurumlarla aynılaştırma.",
          ],
          optionReasons: [
            "Tedavi veya tıp işlemi verilmemiştir.",
            "Kaydın tutulması belgelerin yokluğu anlamına gelmez.",
            "Yol ve konaklama değil asker listesi anlatılır.",
            "Liste kaydı genel oy katılımını vermez.",
            "Doğru. Asker ve ödeme listesi idari kayıt işlevini gösterir; divanın her çağda yalnız aynı tür meclis olduğunu kanıtlamaz.",
          ],
          commonError: "Divanı her yerde ve her çağda tek tür toplantı sayma.",
          check: "Doğru işlev belgede yapılan listeleme işlemine dayanır.",
        },
      },
      {
        prompt:
          "Bir kronoloji kartında Hz. Ali dönemi Cemel, Sıffin ve Hakem Olayı gibi iç mücadelelerle ilişkilendiriliyor. Bu kart öncelikle hangi alanı açıklamaya yarar?",
        options: [
          "711’de İber yarımadasına geçişi.",
          "Modern bütün seçmenlerin katılım oranını.",
          "Bütün fetihlerin her yerde aynı anda başladığını.",
          "Endülüs’te 929 halifelik ilanını.",
          "Topluluk içindeki siyasi ayrışma ve otorite sorunlarını.",
        ],
        answer: 4,
        hint: "Kartta ortak konunun iç mücadele olduğunu bul.",
        explanation:
          "Verilen gelişmeler dönemin iç siyasi mücadelelerini inceleme bağlamıdır; bütün mezheplerin tüm ayrıntıları bu karttan belirlenmez.",
        guidance: {
          knowledge: [
            "Siyasi ayrışma ile sonraki tüm kurumsallaşma aynı ölçekte değildir.",
          ],
          strategy:
            "Kronoloji kartındaki olayları çatışmanın tarafları ve niteliği açısından gruplandır; seçeneklerin karttaki ortak sorundan başka bir alana kayıp kaymadığını denetle.",
          steps: [
            "Kartta ortak konunun iç mücadele olduğunu bul.",
            "Bu gelişmeleri siyasi birlik ve otoriteyle ilişkilendir.",
            "Sonraki bütün dinî kurumların tam içeriğini veya başka dönemlerin olaylarını karta ekleme.",
          ],
          optionReasons: [
            "Tarih ve coğrafya başka döneme aittir.",
            "Kart genel oy veya sayısal katılım vermez.",
            "İç mücadele listesi bu evrensel askerî sonucu göstermez.",
            "Bu sonraki ve farklı siyasi bağlamdır.",
            "Doğru. Verilen gelişmeler dönemin iç siyasi mücadelelerini inceleme bağlamıdır; bütün mezheplerin tüm ayrıntıları bu karttan belirlenmez.",
          ],
          commonError:
            "Bir mücadele listesini bütün sonraki tarihsel açıklamanın tamamı sayma.",
          check: "Yanıt kartın verdiği iç siyasi alanı karşılar.",
        },
      },
      {
        prompt:
          "Bir bilgi notu 661’de Muaviye ile Emevi hanedanının yönetimini, oğul Yezid’in veliaht gösterilmesini de iktidarın aile içinde aktarımıyla ilişkilendiriyor. Notun doğrudan anlattığı değişim hangisidir?",
        options: [
          "Beytülhikme’de eser çevirisi.",
          "Öğretim kurumlarının bütün mali giderlerinin kaldırılması.",
          "Bütün devletlerin aynı hanedanda birleşmesi.",
          "Yönetimin hanedan içinde devam ettirilmesi.",
          "Bütün halkın aynı anda hükümdar olması.",
        ],
        answer: 3,
        hint: "Notun anlattığı eylemi veliaht belirleme olarak ayır.",
        explanation:
          "Veliahtlıkla aile içi aktarım hedefi hanedanlaşmayı gösterir; genel oy veya bilim kurumu anlamına gelmez.",
        guidance: {
          knowledge: ["Veliahtlık aile içi iktidar aktarımıyla ilişkilidir."],
          strategy:
            "İktidarın kime ve hangi ilişki üzerinden aktarılmasının planlandığını bir aktarım şemasıyla çözümle; seçeneklerdeki değişim adlarını bu ölçütle sınayarak ilerle.",
          steps: [
            "Metnin eylemini veliaht belirleme olarak ayır.",
            "Yönetimin aynı ailede sürdürülmesi hanedan aktarımıdır.",
            "Bu siyasi işlemi bilim, genel oy veya bütün devletlerin birliğiyle karıştırma.",
          ],
          optionReasons: [
            "Veliaht belirleme bir tercüme faaliyeti değildir.",
            "Not eğitim giderleri hakkında bilgi vermez.",
            "Belirli yönetimdeki aktarım dünya çapında siyasi birlik değildir.",
            "Doğru. Veliahtlıkla aile içi aktarım hedefi hanedanlaşmayı gösterir; genel oy veya bilim kurumu anlamına gelmez.",
            "Aile içi aktarım böyle genel bir yetki dağılımı değildir.",
          ],
          commonError:
            "Hanedan düzenini toplumsal katılımın bütünüyle aynı sayma.",
          check: "Doğru seçenek aile içi devam hedefini karşılar.",
        },
      },
      {
        prompt:
          "Abdülmelik dönemine ait öğretim notunda idari dil düzenlemesiyle para düzenlemesi birlikte veriliyor. Bu iki işlemin ortak incelenebileceği alan hangisidir?",
        options: [
          "Toprak sınırlarının değişmez tek çizgi olması.",
          "İdari bütünlük ve siyasi temsil araçları.",
          "Yalnız tıp eğitiminin değişmesi.",
          "Bütün deniz seferlerinin aynı gün bitmesi.",
          "Herkesin evinde aynı dili konuştuğunun kesin sayımı.",
        ],
        answer: 1,
        hint: "İki veriyi idari dil ve para düzeni diye ayır.",
        explanation:
          "Kayıt dili ve para düzeni merkezî yönetim ve temsil araçları olarak birlikte incelenebilir; bütün halkın ana dili buradan bulunmaz.",
        guidance: {
          knowledge: ["İdari araçlar ile halkın bütün özellikleri ayrılır."],
          strategy:
            "İki düzenlemenin muhataplarını ve yönetimde neyi standartlaştırdığını karşılaştır; ortak alanı ararken konuyla ilgisiz kültür ve nüfus genellemelerini ayır.",
          steps: [
            "İki veriyi idari dil ve para düzeni diye ayır.",
            "Her ikisinin yönetimin ortak araçlarıyla ilişkisini kur.",
            "Bu ortaklığı nüfusun tüm dili veya bütün siyasi sınırlara genelleme.",
          ],
          optionReasons: [
            "İdari araçlar bütün sınır tarihini belirlemez.",
            "Doğru. Kayıt dili ve para düzeni merkezî yönetim ve temsil araçları olarak birlikte incelenebilir; bütün halkın ana dili buradan bulunmaz.",
            "Dil ve para düzeni tıp işleviyle sınırlı değildir.",
            "Not sefer tarihi veya bütün deniz kuvvetleri hakkında veri vermez.",
            "İdari karar ve para yazısı evlerdeki dil dağılımı değildir.",
          ],
          commonError: "Devletin yazı dilini herkesin ana dili sayma.",
          check:
            "Yanıt iki düzenlemeyi aynı idari alanda birlikte değerlendirir.",
        },
      },
      {
        prompt:
          "Bir tarihsel kaynak karşılaştırmasında Emevi görevlisi Haccac’ın bazı mevalilerden vergi toplamayı sürdürdüğü, Ömer bin Abdülaziz döneminde bu uygulamanın değiştiği belirtiliyor. Bu örnek hangi yorumu destekler?",
        options: [
          "Vergi kaydı modern genel oy sistemidir.",
          "Aynı hanedan içinde uygulamalar zaman ve yöneticiye göre farklılaşabilir.",
          "Vergi değişince bütün kültür tamamen silinmiştir.",
          "Mevali sözcüğü yalnız bütün gayrimüslimlerin adıdır.",
          "Her Emevi yöneticisi her yerde mutlaka aynı işlemi yapmıştır.",
        ],
        answer: 1,
        hint: "İlk ve sonraki uygulamayı ayrı dönemlere yerleştir.",
        explanation:
          "Karşılaştırma bir uygulamanın değişmesini gösterir; bütün halifeler için değişmez tek politika varsayımı doğru değildir.",
        guidance: {
          knowledge: ["Hanedan adı bütün uygulamaları değişmez yapmaz."],
          strategy:
            "İki yönetici dönemindeki uygulamaları aynı ölçütle yan yana koy; dönem farkını açıklayan seçeneklerle bütün zamanları tek politika sayanları karşılaştır.",
          steps: [
            "İlk ve sonraki uygulamayı ayrı dönemlere yerleştir.",
            "Aynı hanedanda vergi uygulamasının değiştiğini gör.",
            "Bu örneği bütün yönetici ve bölgeler için değişmez politika iddiasını sınamakta kullan.",
          ],
          optionReasons: [
            "Mali uygulama siyasi oy hakkıyla aynı işlem değildir.",
            "Doğru. Karşılaştırma bir uygulamanın değişmesini gösterir; bütün halifeler için değişmez tek politika varsayımı doğru değildir.",
            "Belirli vergi uygulaması kültürün tümünü belirlemez.",
            "Bu konuda Arap olmayan Müslümanlar bağlamıdır.",
            "Örnek açıkça uygulama değişikliği verir.",
          ],
          commonError:
            "Genel dönem karşılaştırmasını her yöneticinin aynı davranışı sayma.",
          check: "Doğru seçenek metindeki uygulama farkını korur.",
        },
      },
      {
        prompt:
          "Bir kart 711’de Tarık bin Ziyad’ın İber yarımadasına geçişini ve Vizigotlarla mücadeleyi anlatıyor. Kart hangi siyasi-coğrafi gelişmeyle ilişkilidir?",
        options: [
          "622’de Medine hicretiyle.",
          "1258’de Bağdat’ın Moğollarca alınmasıyla.",
          "1071’de Büyük Selçukluların Bizans’la Malazgirt karşılaşmasıyla.",
          "751’de Abbasi–Tang Talas Savaşı’yla.",
          "Emevi döneminde Avrupa sahasındaki genişlemeyle.",
        ],
        answer: 4,
        hint: "Yıl, komutan ve hedef yarımadayı birlikte belirle.",
        explanation:
          "İber yarımadasına geçiş 711 Emevi dönemi bağlamıdır; bu, fethedilen bütün halkın anlık din değişimi değildir.",
        guidance: {
          knowledge: ["Tarih ve coğrafya olayın siyasi bağlamını belirler."],
          strategy:
            "Kronoloji bilgisini komutan, karşılaşılan güç ve hedef coğrafya bileşenlerine ayır; gelişmenin yönünü koruyan siyasi-coğrafi tanımı seçeneklerde ara.",
          steps: [
            "Yıl, komutan ve hedef yarımadayı birlikte belirle.",
            "711’i Emevi dönemine ve İber sahasına bağla.",
            "Başka tarihlerdeki Anadolu, Orta Asya ve Medine gelişmelerini ayır.",
          ],
          optionReasons: [
            "Hedef yer ve olay türü farklıdır.",
            "Farklı yüzyıl ve merkezdir.",
            "Tarih, taraf ve coğrafya farklıdır.",
            "Talas Orta Asya bağlamıdır; 711 İber geçişi değildir.",
            "Doğru. İber yarımadasına geçiş 711 Emevi dönemi bağlamıdır; bu, fethedilen bütün halkın anlık din değişimi değildir.",
          ],
          commonError:
            "Benzer yayılma kelimesinden bütün seferleri aynı olay sayma.",
          check: "Doğru seçenek kartın üç açık eşleştirmesini korur.",
        },
      },
      {
        prompt:
          "Bir öğretim kartı 732 Puvatya’yı Frank kuvvetleriyle karşılaşma olarak tanımlıyor. Bu kartta kontrol edilmesi gereken doğru eşleştirme hangisidir?",
        options: [
          "Avrupa sahası ve Franklarla mücadele.",
          "Çin Tang kuvvetleri ve 751 Talas.",
          "Moğollar ve 1243 Kösedağ.",
          "Bizans ve 1176 Miryokefalon.",
          "Kırgızlar ve 840 Uygur siyasi kırılması.",
        ],
        answer: 0,
        hint: "Kartın karşı güç ve yıl bilgisini bul.",
        explanation:
          "Verilen karşı güç Franklardır; Puvatya bu Avrupa bağlamıyla ele alınır.",
        guidance: {
          knowledge: ["Savaş eşleştirmesinde karşı güç ve coğrafya korunur."],
          strategy:
            "Yıl ve karşı kuvvet için iki kontrol hücresi oluştur; her seçeneğin bu hücrelerle eşleşmesini denetlerken benzer sefer adlarını araya karıştırma.",
          steps: [
            "Kartın karşı güç ve yıl bilgisini bul.",
            "Franklarla mücadele Avrupa sahasına yerleşir.",
            "Benzer savaş adlarını tarih ve aktörleriyle ayır.",
          ],
          optionReasons: [
            "Doğru. Verilen karşı güç Franklardır; Puvatya bu Avrupa bağlamıyla ele alınır.",
            "Karşı güç ve tarih başka olayın eşleştirmesidir.",
            "Türkiye Selçuklu döneminin farklı gelişmesidir.",
            "Anadolu’daki farklı bir savaşın eşleştirmesidir.",
            "Aktör, coğrafya ve dönem ayrıdır.",
          ],
          commonError: "Bütün dış kuvvetleri tek aktör sayma.",
          check: "Doğru seçenekteki iki unsur kartla uyumludur.",
        },
      },
      {
        prompt:
          "Endülüs için 756 emirliğin başlangıcı, 929 halifelik ilanı olarak veriliyor. İki tarihin aynı adla birlikte bulunması nasıl yorumlanmalıdır?",
        options: [
          "756’da bütün siyasi tarih sona ermiştir.",
          "İki tarih mutlaka aynı olayın yazım hatasıdır.",
          "Emirlik ve halifelik her bağlamda aynı unvandır.",
          "Aynı siyasi çevrede farklı kurumsal aşamalar olabilir.",
          "929’da Şam Emevileri ilk kez kurulmuştur.",
        ],
        answer: 3,
        hint: "Her yılın yanındaki fiili ayır: başlama ve ilan.",
        explanation:
          "Emirliğin başlamasıyla halifelik ilanı aynı eylem değildir; tarihler bu iki aşamayı ayırır.",
        guidance: {
          knowledge: ["Siyasi yapıda farklı aşamalar ayrı tarihler taşır."],
          strategy:
            "Endülüs satırlarını yalnız tarihleriyle değil her tarihte bildirilen siyasi işlemle etiketle; iki işlemi özdeşleştiren veya aynı adlı bütün dönemleri birleştiren yorumu sına.",
          steps: [
            "Her yılın yanındaki fiili ayır: başlama ve ilan.",
            "756 ve 929 farklı kurumsal aşamalara aittir.",
            "Ortak bölge ve hanedan adını aynı olay olmakla eşitleme.",
          ],
          optionReasons: [
            "Sonraki halifelik ilanı bu sona-erme iddiasına uymaz.",
            "Farklı eylemler açıkça tanımlanmıştır.",
            "Kart bu kurumlaşma aşamalarını ayrı adlandırmaktadır.",
            "Doğru. Emirliğin başlamasıyla halifelik ilanı aynı eylem değildir; tarihler bu iki aşamayı ayırır.",
            "Şam ve Endülüs farklı merkez ve dönemlerdir.",
          ],
          commonError: "Aynı adın geçtiği bütün tarihleri tek olaya indirgeme.",
          check: "Doğru yanıt iki fiili ve iki tarihi korur.",
        },
      },
      {
        prompt:
          "Bir tablo Ebu’l-Abbas’ı Abbasi iktidarının başlangıcıyla, Mansur’u Bağdat’ın kurulmasıyla ilişkilendiriyor. Tablo hangi ayrımı korumaktadır?",
        options: [
          "Bütün Abbasi faaliyetlerinin yalnız savaş olduğunu.",
          "Bir şehir kurulunca bütün halkın dili değişir demeyi.",
          "Hanedan iktidarının başlaması ile yeni yönetim merkezinin kurulmasını.",
          "Her iki adı Hz. Osman’ın aynı diğer adı saymayı.",
          "Bağdat’ı bütün çağlarda tek İslam şehri saymayı.",
        ],
        answer: 2,
        hint: "Kişi ve eylemi iki ayrı satırda eşleştir.",
        explanation:
          "Farklı kişilere bağlanan iki işlem aynı olay değildir; şehir kuruluşu devletin başlangıç tarihinin yerine otomatik geçmez.",
        guidance: {
          knowledge: ["Kişi, kurum ve kuruluş eylemi ayrı eşleştirilir."],
          strategy:
            "Kişi, iktidar değişimi ve şehir kuruluşunu üç ayrı bilgi alanına böl; seçeneklerde bir olayın tarih veya öznesinin diğerine taşınıp taşınmadığını denetle.",
          steps: [
            "Kişi ve eylemi iki ayrı satırda eşleştir.",
            "İktidarın başlamasıyla şehir kuruluşu farklı aşamalardır.",
            "Birinin tarihini veya kurucusunu diğerinin yerine geçirme.",
          ],
          optionReasons: [
            "Şehir kurulması farklı bir siyasi-idari faaliyettir.",
            "Şehir kuruluşu dil dağılımını vermez.",
            "Doğru. Farklı kişilere bağlanan iki işlem aynı olay değildir; şehir kuruluşu devletin başlangıç tarihinin yerine otomatik geçmez.",
            "Tablo farklı kişileri farklı işlerle eşleştirir.",
            "Bir merkez kuruluşu bütün başka şehirlerin yokluğu değildir.",
          ],
          commonError:
            "Devlet başlangıcını her merkez şehrin kuruluşuyla aynı sayma.",
          check: "Doğru seçenek tabloda tanımlanan iki işi ayırır.",
        },
      },
      {
        prompt:
          "Bir kart Samarra’yı askerî-idari yerleşim, avasımı Bizans sınırındaki savunma bölgeleri olarak tanımlıyor. Bu iki kavram nasıl kullanılmalıdır?",
        options: [
          "Avasımı yalnız bir tıp kitabı olarak okuyarak.",
          "Yerleşim ve sınır savunma düzeni farklı işlevlerle eşleştirilerek.",
          "İkisi bulunduğu için bütün nüfusun asker olduğunu söyleyerek.",
          "İkisini tek kişinin iki unvanı sayarak.",
          "Samarra’yı İber yarımadasının tek adı sayarak.",
        ],
        answer: 1,
        hint: "İlk kavramın yerleşim, ikincinin savunma kuşağı olduğunu belirle.",
        explanation:
          "Samarra belirli yerleşim, avasım ise sınır kuşağı bağlamındadır; ikisi aynı şehir adı değildir.",
        guidance: {
          knowledge: ["Mekân türleri ve işlevleri ayrı tutulur."],
          strategy:
            "Her kavram için ölçek ve işlev kartı hazırla; belirli bir yerleşimle sınır boyunca uzanan düzenin seçeneklerde birbirinin yerine kullanılıp kullanılmadığını kontrol et.",
          steps: [
            "İlk kavramın yerleşim, ikincinin savunma kuşağı olduğunu belirle.",
            "İki mekânsal işlevi ayrı eşleştir.",
            "Aynı devlet çevresinde bulunmaları tek şehir veya bütün nüfusun aynı işi olması değildir.",
          ],
          optionReasons: [
            "Sınır savunmasıyla eser türü karıştırılır.",
            "Doğru. Samarra belirli yerleşim, avasım ise sınır kuşağı bağlamındadır; ikisi aynı şehir adı değildir.",
            "Askerî mekânlar bütün halkın mesleğini vermez.",
            "Kart kişi değil mekân ve savunma düzeni verir.",
            "Verilen askerî-idari yerleşim bağlamı farklıdır.",
          ],
          commonError:
            "Askerî kavramların hepsini tek bina veya tek şehir sayma.",
          check: "Doğru yorum iki tanımı da yerine koyar.",
        },
      },
      {
        prompt:
          "Tolunoğlu Ahmed dönemiyle ilişkilendirilen bir öğretim notunda su kanalları ve ekilebilir alanların geliştirilmesi anlatılıyor. Bu uygulamaların doğrudan ilgili olduğu alan hangisidir?",
        options: [
          "Tarımsal üretim altyapısı.",
          "Bütün topraklarda genel oy hakkı.",
          "Kur’an nüshalarının ilk derlenmesi.",
          "Bütün çeviri eserlerinin yakılması.",
          "Yalnız okyanus donanması.",
        ],
        answer: 0,
        hint: "Uygulamanın nesnesini su ve ekilebilir alan olarak belirle.",
        explanation:
          "Su kanalları ve ekilebilir alan üretimin maddi koşullarıyla ilişkilidir; yalnız bu veriler bütün siyasi hakları göstermez.",
        guidance: {
          knowledge: ["Altyapı yaptığı işe göre sınıflanır."],
          strategy:
            "Kanal ve ekilebilir alan arasındaki maddi ilişkiyi kur; kaydın gösterdiği uygulamadan uzak bir siyasi veya kültürel sonuca geçen seçenekleri ayır.",
          steps: [
            "Uygulamanın nesnesini su ve ekilebilir alan olarak belirle.",
            "Bu araçların üretimi destekleme işlevini kur.",
            "Tarım verisini ilgisiz metin, oy veya donanma konularına dönüştürme.",
          ],
          optionReasons: [
            "Doğru. Su kanalları ve ekilebilir alan üretimin maddi koşullarıyla ilişkilidir; yalnız bu veriler bütün siyasi hakları göstermez.",
            "Üretim altyapısı oy düzenlemesi değildir.",
            "Su ve tarım işi metin derlemesiyle aynı değildir.",
            "Not eserler veya yok etme işlemi hakkında veri vermez.",
            "Su kanalı tarımsal bağlamda verilmiştir; açık deniz kuvveti anlatılmaz.",
          ],
          commonError:
            "Bir devletin bütün faaliyetlerini tek askerî başlıkta toplama.",
          check: "Doğru alan iki uygulamayı birlikte açıklar.",
        },
      },
      {
        prompt:
          "Bir sınıflamada tefsir Kur’an yorumu, hadis rivayet incelemesi, fıkıh hukuk ve astronomi gök gözlemleriyle ilişkilendiriliyor. Yargı ve hukuk hükümlerini inceleyen bir çalışma bu sınıflamada hangisine daha doğrudan girer?",
        options: ["Astronomi.", "Kervansaray.", "Hadis.", "Tefsir.", "Fıkıh."],
        answer: 4,
        hint: "Kökteki belirleyici işi hukuk hükümleri olarak bul.",
        explanation:
          "Verilen sınıflamada hukuk işlevi fıkha aittir; diğer alanlar başka soru ve yöntemlerle tanımlanmıştır.",
        guidance: {
          knowledge: ["Bilgi alanı somut konusu ve işleviyle eşleştirilir."],
          strategy:
            "Çalışmanın sorduğu konuyu önce kendi sözcüklerinle tanımla; sonra verilen bilim dallarının inceleme nesneleriyle karşılaştırarak en doğrudan eşleşmeyi ara.",
          steps: [
            "Kökteki belirleyici işi hukuk hükümleri olarak bul.",
            "Verilen sınıflamada bu işlev fıkıhla eşleşir.",
            "Diğer alanların kendi tanımlarını kullanarak yalnız kelime çağrışımını ele.",
          ],
          optionReasons: [
            "Astronomi gök gözlemleriyle tanımlanmıştır.",
            "Kervansaray bir yol hizmeti yapısıdır; bilgi alanı değildir.",
            "Hadis rivayet incelemesiyle tanımlanmıştır; kökteki açık işlev hukuk hükümleridir.",
            "Tefsirin verilen ayırıcı alanı Kur’an yorumudur; kökte hukuk işlevi öne çıkar.",
            "Doğru. Verilen sınıflamada hukuk işlevi fıkha aittir; diğer alanlar başka soru ve yöntemlerle tanımlanmıştır.",
          ],
          commonError:
            "Aynı medeniyet çevresindeki bütün bilgi alanlarını aynı disiplin sayma.",
          check: "Fıkıh tanımı doğrudan hukuk işlevini karşılar.",
        },
      },
      {
        prompt:
          "Bir başvuru tablosu Hârizmî’yi cebir ve hesapla, İbn Sina’yı tıp birikimiyle, Farabi’yi felsefeyle ilişkilendiriyor. Tablo nasıl kullanılmalıdır?",
        options: [
          "Her tıp eserini Hârizmî’ye atfederek.",
          "Felsefe varsa matematik veya tıp hiç bulunamaz diyerek.",
          "Ayırt edici katkıları öğrenip kişileri yalnız tek alanla sınırlamadan.",
          "Her biri kendi alanındaki bütün bilgiyi tek başına icat etti diyerek.",
          "Üç kişinin aynı insanın farklı adı olduğunu kabul ederek.",
        ],
        answer: 2,
        hint: "Üç kişiyle ayırt edici alanı ayrı eşleştir.",
        explanation:
          "Tablo belirgin katkıları gösterir; bir bilginin başka alanlarda çalışmadığını veya bütün bilginin tek kişiyle başladığını söylemez.",
        guidance: {
          knowledge: [
            "Bilginin katkısı ile bütün bilgi tarihinin kökeni farklıdır.",
          ],
          strategy:
            "Bilgin adlarını alan ve katkı türüyle eşleştiren bir başvuru çizelgesi kullan; seçeneklerdeki katkı iddialarını tarihsel kapsamı aşma ve kişi karıştırma açısından denetle.",
          steps: [
            "Üç kişiyle ayırt edici alanı ayrı eşleştir.",
            "Bu başvuru ilişkisini başka katkıların yokluğu diye okumama koşulunu koru.",
            "Katkı ile tek başına bütün alanın icadını ayır.",
          ],
          optionReasons: [
            "Cebir ve hesap bağlantısı bütün tıp eserlerinin yazarlığı değildir.",
            "Farklı alanlar aynı kültür çevresinde birlikte var olabilir.",
            "Doğru. Tablo belirgin katkıları gösterir; bir bilginin başka alanlarda çalışmadığını veya bütün bilginin tek kişiyle başladığını söylemez.",
            "Önemli katkı, bütün bilgi tarihinin tek kişilik başlangıcı değildir.",
            "Tablo farklı bilginleri ayırır.",
          ],
          commonError:
            "Bir alan eşleştirmesini bilginin yalnız o alanda çalıştığı sayma.",
          check: "Doğru yöntem tablodaki ilişkiyi genişletmeden kullanır.",
        },
      },
      {
        prompt:
          "Bir ders açıklaması Abbasi merkezî otoritesinin zayıfladığı dönemlerde taşrada yerel hanedanların güçlenmesini tevaif-i müluk kavramıyla ilişkilendiriyor. Kavram bu bağlamda hangi alanı karşılar?",
        options: [
          "Yalnız astronomi aletlerinin sınıflanması.",
          "Bütün bölgelerin eşit oyla tek meclise katılması.",
          "Siyasi parçalanma ve bölgesel hanedanlaşma.",
          "Kur’an nüshalarının çoğaltılma tekniği.",
          "Bütün halkın tek mezhepte birleşmesi.",
        ],
        answer: 2,
        hint: "Verilen değişimi merkezî otorite ile taşra gücü arasında tanımla.",
        explanation:
          "Verilen işlev merkez-taşra güç ilişkisi ve yerel siyasi oluşumlardır; din değiştirme veya bilim sınıflaması değildir.",
        guidance: {
          knowledge: ["Terim verildiği siyasi işlevle kullanılır."],
          strategy:
            "Merkez ve taşra arasındaki yetki dağılımını iki farklı durumda çiz; terimin burada anlattığı değişim düzeyini dil, din veya tek şehir iddialarıyla karıştırmadan belirle.",
          steps: [
            "Verilen değişimi merkezî otorite ile taşra gücü arasında tanımla.",
            "Yerel hanedanların güçlenmesi siyasi parçalanma alanıdır.",
            "Kavramı dinî birlik, metin üretimi veya modern oy sistemiyle karıştırma.",
          ],
          optionReasons: [
            "Yerel hanedan ile gözlem aleti farklı konulardır.",
            "Yerel hanedan güçlenmesi modern genel oy düzeni değildir.",
            "Doğru. Verilen işlev merkez-taşra güç ilişkisi ve yerel siyasi oluşumlardır; din değiştirme veya bilim sınıflaması değildir.",
            "Metin aktarımı değil siyasi güç dağılımı anlatılır.",
            "Metin siyasi oluşumları anlatır; dinî birleşme vermez.",
          ],
          commonError:
            "Bir medeniyet terimini bağlamından koparıp başka kuruma eşitleme.",
          check: "Yanıt metnin merkez-taşra ilişkisini doğrudan karşılar.",
        },
      },
    ],
  },
  {
    id: "turklerin-islamiyeti-kabulu-ileri",
    base: "turklerin-islamiyeti-kabulu",
    title: "İslamlaşma: ileri süreç ve kanıt soruları",
    questions: [
      {
        prompt:
          "Bir not Sasani siyasi sonunu 651 ile ilişkilendiriyor; aynı not bunu Hz. Ömer’in 634–644 döneminde olmuş gibi gösteriyor. Verilen tarihlerle hangi denetim yapılmalıdır?",
        options: [
          "651’in 644’ten önce olduğu kabul edilmelidir.",
          "İki tarih aynı olayı anlattığı için bütün yıllar silinmelidir.",
          "Tarihler farklıysa Sasani Devleti hiç olmamıştır denmelidir.",
          "Hz. Ömer dönemi verilene rağmen bütün yüzyılı kapsar denmelidir.",
          "651’in 634–644 aralığı dışında olduğu saptanıp dönem atfı yeniden araştırılmalıdır.",
        ],
        answer: 4,
        hint: "Hz. Ömer dönemi için verilen aralığı açıkça yaz.",
        explanation:
          "651,644’ten sonradır. Sasani gücünün çözülme süreciyle son tarih aynı hükümdar dönemine kontrolsüzce yüklenmemelidir.",
        guidance: {
          knowledge: ["Dönem atfı tarih aralığıyla kontrol edilir."],
          strategy:
            "Olay yılını yönetici dönemini gösteren kapalı aralığa yerleştir; çelişkiyi kontrol ederken olayın doğruluğu ile verilen dönem atfını ayrı hükümler olarak tut.",
          steps: [
            "Hz. Ömer dönemi için verilen aralığı açıkça yaz.",
            "651>644 olduğundan son tarih bu aralığa girmez.",
            "Süreçteki mücadelelerle sonraki siyasi sonu ayırarak kaynak atfını yeniden denetle.",
          ],
          optionReasons: [
            "MS sayılarında 651 daha sonraki yıldır.",
            "Yıl uyuşmazlığı olay türü ve dönem atfını incelemeyi gerektirir.",
            "Dönem atfı sorunu devletin yokluğu değildir.",
            "Belirtilen 634–644 sınırları böyle genişletilemez.",
            "Doğru. 651,644’ten sonradır. Sasani gücünün çözülme süreciyle son tarih aynı hükümdar dönemine kontrolsüzce yüklenmemelidir.",
          ],
          commonError:
            "Bir sürecin bütün aşamalarını aynı yönetici dönemine yükleme.",
          check: "651’i 634≤yıl≤644 koşuluna geri koyduğunda koşul sağlanmaz.",
        },
      },
      {
        prompt:
          "Bir öğretim karşılaştırmasında Arap olmayan Müslümanların bazı görevlere erişimi önce sınırlı, sonra daha açık gösteriliyor. Kabulü kolaylaştırabilecek mekanizma hangi ifadeyle daha doğru açıklanır?",
        options: [
          "Dışlayıcı engellerin kesinlikle arttığının gösterilmesi.",
          "Siyasi ve toplumsal katılım önündeki bazı engellerin azalması.",
          "Ticaret ve öğretimin tamamen ortadan kalkması.",
          "Bütün kişilerin zorunlu aynı dili konuşması.",
          "Her bireyin bütün haklarda modern tam eşitliğe ulaşması.",
        ],
        answer: 1,
        hint: "Değişen koşulun göreve erişim olduğunu belirle.",
        explanation:
          "Göreve erişimin kolaylaşması dışlanmanın belirli alanlarını azaltabilir; bu, bütün halkın aynı gün din değiştirmesi değildir.",
        guidance: {
          knowledge: ["Etken hangi engeli nasıl değiştirdiğiyle açıklanır."],
          strategy:
            "Önceki ve sonraki göreve erişim koşullarını karşılaştır; katılım imkânının insanlarla kurumlar arasındaki ilişkiyi nasıl etkileyebileceğine dair ara mekanizmayı araştır.",
          steps: [
            "Değişen koşulun göreve erişim olduğunu belirle.",
            "Erişimin açılması belirli katılım engellerini azaltabilir.",
            "Kolaylaştırıcı mekanizmayı anlık toplu kabul veya bütün hakların eşitliği yapma.",
          ],
          optionReasons: [
            "Karşılaştırma görev erişiminin açıldığını söyler; yön ters çevrilmiştir.",
            "Doğru. Göreve erişimin kolaylaşması dışlanmanın belirli alanlarını azaltabilir; bu, bütün halkın aynı gün din değiştirmesi değildir.",
            "Daha açık katılım diğer temas kanallarının yokluğu değildir.",
            "Görev erişimi dil hakkında böyle bir zorunluluk vermez.",
            "Belirli görev alanı bütün hakları ve bütün nüfusu kapsamaz.",
          ],
          commonError:
            "Kolaylaştırıcı koşulla sonucun bütün kişiler için kesinliğini eşitleme.",
          check: "Yanıt göreve erişimdeki değişimi doğru yönde kullanır.",
        },
      },
      {
        prompt:
          "Kurmaca bir yerel kayıtta tüccarlar mal değiştirirken başka bir gruptaki öğreticiler yeni inancın kavramlarını açıklıyor. Bu iki faaliyet için hangi yorum daha uygundur?",
        options: [
          "Mal satan herkesin otomatik öğretici olduğu.",
          "İki kanalın aynı siyasi devleti kurduğu.",
          "Öğretim varsa ticaretin bulunamayacağı.",
          "Ekonomik temas ve dinî öğretim farklı ama birlikte işleyebilen kanallardır.",
          "Her temasın bütün halk için kesin kabul anlamına geldiği.",
        ],
        answer: 3,
        hint: "İki gruptaki işleri ayrı tanımla: mal değişimi ve kavram öğretimi.",
        explanation:
          "Ticari karşılaşma ile öğretim aynı faaliyet değildir; iletişim ve tanıma sürecine farklı katkılar sunabilir.",
        guidance: {
          knowledge: ["Bir süreçte farklı mekanizmalar birlikte bulunabilir."],
          strategy:
            "İki grubun eylemlerini ayrı faaliyet kutularında göster; bu faaliyetlerin birlikte bulunmasıyla her bireyin tercihinin bilinmesi arasındaki kanıt farkını seçeneklerde sına.",
          steps: [
            "İki gruptaki işleri ayrı tanımla: mal değişimi ve kavram öğretimi.",
            "Bunları farklı temas kanalları olarak ilişkilendir.",
            "Ortak iletişim işlevini bütün kişilerin aynı tercihi yapmasıyla eşitleme.",
          ],
          optionReasons: [
            "İki faaliyetin grupları ve işleri ayrı verilmiştir.",
            "Faaliyetlerden tek devlet kuruluşu çıkmaz.",
            "Kayıt ikisini aynı çevrede birlikte verir.",
            "Doğru. Ticari karşılaşma ile öğretim aynı faaliyet değildir; iletişim ve tanıma sürecine farklı katkılar sunabilir.",
            "Faaliyetler inancı tanımaya ortam sağlar; bütün nüfusun tercihi belirtilmez.",
          ],
          commonError: "Bütün temas biçimlerini tek aynı eylem sayma.",
          check:
            "Doğru yanıt iki faaliyetin farkını ve birlikte bulunmasını korur.",
        },
      },
      {
        prompt:
          "Bir ders açıklaması iki inanç anlayışında tek yüce yaratıcı vurgusunu benzerlik olarak ele alıyor. Bu benzerlikten hangi sonuç tek başına çıkarılamaz?",
        options: [
          "İki anlayışın bütün ibadet ve hukuk esaslarının özdeş olduğu.",
          "İnanç benzerliğinin kabulü kolaylaştıran etkenler arasında incelenebileceği.",
          "Benzerlik ile özdeşliğin ayrılması gerektiği.",
          "Açıklamanın belirli bir ortak yönü karşılaştırdığı.",
          "Başka özellikler için ayrıca karşılaştırma gerektiği.",
        ],
        answer: 0,
        hint: "Ortak verilen özelliği sınırlandır.",
        explanation:
          "Belirli bir ortak özellik, bütün öğretilerin aynı olduğu anlamına gelmez.",
        guidance: {
          knowledge: ["Benzerlik bütünsel özdeşlik değildir."],
          strategy:
            "Ortak özelliği tek bir karşılaştırma ölçütü olarak sınırla; seçeneklerde bir benzerlikten bütün inanç içeriğine veya davranışlara sıçrama yapılıp yapılmadığını denetle.",
          steps: [
            "Ortak verilen özelliği sınırlandır.",
            "Bütün ibadet ve hukuk ilkeleri bu tek özellikten belirlenmez.",
            "Olumsuz kökte benzerliği tam özdeşliğe genişleten seçeneği seç.",
          ],
          optionReasons: [
            "Doğru. Belirli bir ortak özellik, bütün öğretilerin aynı olduğu anlamına gelmez.",
            "Bu sınırlı mekanizma benzerliğin ders içindeki işlevidir.",
            "Sorunun gerektirdiği yöntem bu ayrımdır.",
            "Tek yüce yaratıcı vurgusu açık ortak yöndür.",
            "Tek ortak özellik bütün alanları kapsamaz.",
          ],
          commonError: "Bir ortak özelliği iki inancın bütün esaslarına yayma.",
          check: "Desteklenmeyen seçenek metnin kapsamını büyütür.",
        },
      },
      {
        prompt:
          "Bir başvuru kartında İslamiyet’i benimseyen Karahanlı hükümdarı Satuk Buğra Han’ın Müslüman adı soruluyor. Doğru eşleştirme hangisidir?",
        options: ["Mete.", "Bumin.", "Abdülkerim.", "Romen Diyojen.", "Almış."],
        answer: 2,
        hint: "Kartın devlet değil belirli hükümdarın adını istediğini belirle.",
        explanation:
          "Satuk Buğra Han’ın Müslüman adı Abdülkerim olarak verilir; bu kişi bütün Türkler arasındaki ilk birey diye genellenmez.",
        guidance: {
          knowledge: ["Kişi ve ad eşleştirmesinin kapsamı korunur."],
          strategy:
            "Ad eşleştirmesini kişi, hanedan ve benimsenen ad için üç hücreli bir başvuru kartıyla kontrol et; başka hükümdar veya devlet adını kişisel ad yerine koyan şıkları ele.",
          steps: [
            "Kartın devlet değil belirli hükümdarın adını istediğini belirle.",
            "Satuk Buğra Han–Abdülkerim eşleştirmesini kullan.",
            "Başka devletlerin yöneticilerini veya tüm Türkler için ilk birey iddiasını ekleme.",
          ],
          optionReasons: [
            "Mete Asya Hun döneminin hükümdarıdır.",
            "Bumin I. Kök Türk kuruluşuyla ilişkilidir.",
            "Doğru. Satuk Buğra Han’ın Müslüman adı Abdülkerim olarak verilir; bu kişi bütün Türkler arasındaki ilk birey diye genellenmez.",
            "Romen Diyojen Malazgirt’teki Bizans imparatorudur.",
            "Almış İdil Bulgarları ve 922 heyeti bağlamındaki yöneticidir.",
          ],
          commonError:
            "Bir hükümdarın adını başka bölgenin yöneticisiyle karıştırma.",
          check: "Doğru yanıt sorulan kişiye aittir.",
        },
      },
      {
        prompt:
          "Bir öğretim notu 922’de İdil Bulgar ülkesine gelen Abbasi heyetinde İbn Fadlan’ın bulunduğunu belirtiyor. İbn Fadlan adı bu bağlamda hangi tür bilgiyle ilişkilidir?",
        options: [
          "I. Kök Türklerin 552 kuruculuğuyla.",
          "Heyet ve yolculuğa bağlı tarihsel tanıklıkla.",
          "Bütün İdil halkının tek tek sayıldığı modern nüfus belgesiyle.",
          "Türkiye Selçuklu Devleti’nin 1077 kuruluşuyla.",
          "751’de Tang imparatorluğu kuruculuğuyla.",
        ],
        answer: 1,
        hint: "Yıl, hedef bölge ve heyet bağını birlikte bul.",
        explanation:
          "İbn Fadlan heyet içindeki gözlem ve anlatı bağlamıyla kullanılır; adı ilk Karahanlı hükümdarının yerine geçmez.",
        guidance: {
          knowledge: ["Kaynağın üretildiği görev ve bağlam önemlidir."],
          strategy:
            "Heyetin zamanı, hedefi ve kişinin heyetteki konumunu birlikte izle; kaynağın türünü belirlerken şahsa verilmemiş bir hükümdarlık veya kuruluş rolü ekleyen seçenekleri ayır.",
          steps: [
            "Yıl, hedef bölge ve heyet bağını birlikte bul.",
            "İbn Fadlan bu yolculukta tanıklık kaynağı bağlamındadır.",
            "Kaynağın türünü modern eksiksiz nüfus sayımı veya başka devlet kuruluşu yapma.",
          ],
          optionReasons: [
            "Bu Bumin bağlamıdır; 922 heyeti değildir.",
            "Doğru. İbn Fadlan heyet içindeki gözlem ve anlatı bağlamıyla kullanılır; adı ilk Karahanlı hükümdarının yerine geçmez.",
            "Heyet tanıklığı modern tam nüfus sayımı diye tanımlanmamıştır.",
            "Farklı coğrafya ve siyasi dönemdir.",
            "Kişi ve devlet bağlamı verilen heyetle uyuşmaz.",
          ],
          commonError:
            "Seyyah tanıklığını bütün nüfusun eksiksiz ölçümü sayma.",
          check: "Yanıt doğrudan heyet ve gözlem bağını karşılar.",
        },
      },
      {
        prompt:
          "Bir tabloda İdil/Volga Bulgarları için İslamlaşma, Tuna Bulgarları için Hristiyanlaşma bağlamları veriliyor. İki satırın aynı Bulgar adını taşıması nasıl kullanılmalıdır?",
        options: [
          "İki satırın aynı yerde aynı olay olduğunu kabul ederek.",
          "İdil bilgisini bütün Tuna tarihi için değişmeden kullanarak.",
          "Din farklıysa aynı adın kullanılmasının kesin yazım hatası olduğunu söyleyerek.",
          "İki topluluğun hiçbir tarihsel ilişkisinin olamayacağını söyleyerek.",
          "Coğrafi kolları ayırıp dinî ve siyasi süreçleri ayrı karşılaştırarak.",
        ],
        answer: 4,
        hint: "İki satırdaki nehir ve bölge bilgisini ayrı tut.",
        explanation:
          "Aynı topluluk adı, iki farklı kolun aynı tarih ve tercihi yaşadığı anlamına gelmez.",
        guidance: {
          knowledge: ["Topluluk kolları farklı tarihsel süreçler taşıyabilir."],
          strategy:
            "Bulgar adını her satırdaki nehir sahası, dönem ve dinî bağlamla birlikte oku; ortak adın farklı tarihsel yolları silip silmediğini seçeneklerde kontrol et.",
          steps: [
            "İki satırdaki nehir ve bölge bilgisini ayrı tut.",
            "Ortak adı tek olay ve tek tercih diye okumadan karşılaştır.",
            "Farklılık tarihsel bağları bütünüyle yok saymayı da gerektirmez.",
          ],
          optionReasons: [
            "İdil/Volga ve Tuna farklı coğrafi bağlamlardır.",
            "Bir kolun süreci diğerinin yerine geçirilemez.",
            "Toplulukların farklı kolları farklı dinî yollar izleyebilir.",
            "Farklı süreçler her türlü tarihsel ilişkiyi imkânsız yapmaz.",
            "Doğru. Aynı topluluk adı, iki farklı kolun aynı tarih ve tercihi yaşadığı anlamına gelmez.",
          ],
          commonError:
            "Ortak addan aynı coğrafya ve aynı din sonucunu zorunlu çıkarma.",
          check: "Doğru yöntem iki bölgenin nitelemesini korur.",
        },
      },
      {
        prompt:
          "Bir öğretim çalışması 751 Talas ile 960 tarihli kitlesel kabul kaydı arasındaki yıl farkını soruyor. Bu iki MS yılından elde edilen doğru sonuç hangisidir?",
        options: [
          "209 yıl; her topluluk tam aynı süreyi yaşamıştır.",
          "0 yıl; savaş ile kitlesel kayıt aynı olaydır.",
          "211 yıl; iki yıla ayrıca birer kez eklenmelidir.",
          "171 yıl; bu bütün nüfusun kesin kabul süresidir.",
          "209 yıl fark vardır; bu sayı tek başına bütün İslamlaşmanın süresi değildir.",
        ],
        answer: 4,
        hint: "İstenen iki sayıyı 751 ve 960 olarak belirle.",
        explanation:
          "960−751=209’dur. İki işaret tarihinin farkı, sürecin bütün bireyler için başlangıç ve bitiş ölçümü sayılmaz.",
        guidance: {
          knowledge: [
            "Tarih farkı ile bütün toplumsal sürecin süresi farklıdır.",
          ],
          strategy:
            "İki MS yılı için çıkarma işlemi kur; bulduğun sayının yalnız hangi aralığı ölçtüğünü belirleyerek süreyi kabul oranı veya tek günlük değişim gibi sunan şıkları denetle.",
          steps: [
            "İstenen iki sayıyı 751 ve 960 olarak belirle.",
            "960’tan 751’i çıkar: 209.",
            "Bu sonucu tarih farkı diye adlandır; bütün sürecin ölçülmüş süresi diye genişletme.",
          ],
          optionReasons: [
            "Yıl farkı doğru, bütün topluluklar için süre genellemesi desteksizdir.",
            "Farklı tarihler ve olay türleri açıkça verilmiştir.",
            "İstenen yıl farkı çıkarma işlemidir; uçları iki kez sayma gerekmez.",
            "171,922−751 farkıdır; 960 için değildir. Ayrıca kesin süreç ölçümü verilmez.",
            "Doğru. 960−751=209’dur. İki işaret tarihinin farkı, sürecin bütün bireyler için başlangıç ve bitiş ölçümü sayılmaz.",
          ],
          commonError:
            "İki işaret tarihini herkesin ortak başlangıç ve bitişi sayma.",
          check: "751+209=960 kontrolü sağlanır.",
        },
      },
      {
        prompt:
          "Bir not Oğuzlar arasında kabulün X. yüzyılın ikinci yarısında yayıldığını, Büyük Selçuklu devletleşmesini 1040 ile ilişkilendiriyor. Hangi yorum uygundur?",
        options: [
          "Kabul yalnız devletin kuruluş gününde başlayabilir.",
          "Oğuzlar ortak adı bütün sonraki devletleri tek devlet yapar.",
          "1040 X. yüzyılın içindedir.",
          "Topluluktaki yayılma ile devletleşme farklı zaman ve eylemlerle incelenebilir.",
          "Topluluk ve devlet kavramları her durumda aynı şeydir.",
        ],
        answer: 3,
        hint: "X. yüzyıl yayılmasıyla 1040 tarihini ayrı zamanlara koy.",
        explanation:
          "X. yüzyıldaki yayılmayla XI. yüzyıldaki 1040 devletleşmesi aynı olay değildir.",
        guidance: {
          knowledge: [
            "Toplumsal yayılma devlet kuruluşuyla aynı olay değildir.",
          ],
          strategy:
            "Kabulün yayılmasıyla devletleşmenin tarihlerini ayrı olay türleri olarak sıralamayı seç; zaman uyumunu zorunlu tek sebep yapan seçeneklere ek kanıt iste.",
          steps: [
            "X. yüzyıl yayılmasıyla 1040 tarihini ayrı zamanlara koy.",
            "1040 XI. yüzyıldadır; yayılma ve devletleşme eylemleri de farklıdır.",
            "Ortak topluluk bağını tek kuruluş gününe indirgeme.",
          ],
          optionReasons: [
            "Not daha önceki yayılma sürecini açıkça verir.",
            "Farklı kuruluş ve coğrafyalar tek siyasi yapı sayılmaz.",
            "1040,1001–1100 aralığındaki XI. yüzyıldadır.",
            "Doğru. X. yüzyıldaki yayılmayla XI. yüzyıldaki 1040 devletleşmesi aynı olay değildir.",
            "Topluluk içi yayılma siyasi kuruluşla özdeş değildir.",
          ],
          commonError:
            "Dinî sürecin başlangıcını devletin kuruluş gününe zorunlu bağlama.",
          check: "Yanıt iki eylemi ve iki dönem bilgisini korur.",
        },
      },
      {
        prompt:
          "Bir karşılaştırma, önceki alp savaşçı geleneğinin yeni dinî çerçevede gazilik anlayışıyla yeniden yorumlanmasını anlatıyor. Bu ilişkide ne vurgulanmaktadır?",
        options: [
          "Önceden hiçbir askerî gelenek bulunmadığı.",
          "Yeni dinî anlamın hiçbir etkisi olmadığı.",
          "Önceki bir unsurun yeni anlam çerçevesiyle etkileşimi.",
          "Bütün savaşların her dönemde aynı amaçla yapıldığı.",
          "Alp ile gazinin her bağlamda bütün ayrıntıları aynı olduğu.",
        ],
        answer: 2,
        hint: "Önceki unsurla yeni yorum çerçevesini ayrı belirle.",
        explanation:
          "Önceki savaşçı unsur ile yeni dinî yorum birlikte verildiği için ilişki yeniden anlamlandırma olarak okunur.",
        guidance: {
          knowledge: ["Kültürel unsur yeni bağlamda yeniden yorumlanabilir."],
          strategy:
            "Önceki gelenek, yeni yorum ve bunların ilişkisinin nasıl kurulduğu için üç sütun kullan; ne tam silinme ne de hiçbir değişim sonucunu peşinen varsaymadan seçenekleri sına.",
          steps: [
            "Önceki unsurla yeni yorum çerçevesini ayrı belirle.",
            "İlişki eski unsurun yeni anlamla ele alınmasıdır.",
            "Tam yokluk ve hiç değişmeme seçeneklerinin hangi veriyi dışladığını denetle.",
          ],
          optionReasons: [
            "Metin önceki alp geleneğini açıkça verir.",
            "Yeniden yorum ifadesi yeni çerçevenin katkısını gösterir.",
            "Doğru. Önceki savaşçı unsur ile yeni dinî yorum birlikte verildiği için ilişki yeniden anlamlandırma olarak okunur.",
            "Bir kavramsal ilişki bütün savaş amaçlarını aynı yapmaz.",
            "Etkileşim tam özdeşlik veya bütün bağlamların aynı olması değildir.",
          ],
          commonError:
            "Etkileşimi önceki her şeyin yokluğu veya tam özdeşlik sayma.",
          check: "Doğru seçenek iki unsuru birlikte korur.",
        },
      },
      {
        prompt:
          "Bir ders açıklaması tekkeyi tasavvuf çevresindeki dinî-sosyal faaliyetlerle, medreseyi öğretimle ilişkilendiriyor. İki kurum için uygun açıklama hangisidir?",
        options: [
          "Medrese varsa bütün ticaret mutlaka biter.",
          "İşlevleri ayrı tanımlanır; aynı kültürel çevrede birlikte bulunabilirler.",
          "Tekke yalnız askerî sayım bürosudur.",
          "İki kurumun varlığı herkesin aynı meslekte olduğunu gösterir.",
          "İkisi her dönemde tek ve aynı bina türüdür.",
        ],
        answer: 1,
        hint: "İki tanımda yapılan işleri ayrı bul.",
        explanation:
          "Dinî-sosyal ilişkiyle düzenli öğretim farklı işlevlerdir; aynı toplumda birbirini zorunlu dışlamaz.",
        guidance: {
          knowledge: [
            "Kurumların işlev farklılığı birlikte bulunmalarını dışlamaz.",
          ],
          strategy:
            "İki kurum için faaliyet, toplumsal çevre ve öğretim bağını karşılaştır; ortak dinî bağlamdan özdeş kurum veya bütün nüfus sonucu üreten yorumları denetle.",
          steps: [
            "İki tanımda yapılan işleri ayrı bul.",
            "İşlev farkını koruyarak aynı kültür çevresinde birlikte düşünülebileceklerini gör.",
            "Ortak dinî çevreyi aynı bina veya bütün nüfusun tek mesleği yapma.",
          ],
          optionReasons: [
            "Öğretimden ticaretin yokluğu çıkmaz.",
            "Doğru. Dinî-sosyal ilişkiyle düzenli öğretim farklı işlevlerdir; aynı toplumda birbirini zorunlu dışlamaz.",
            "Metindeki işlev tasavvuf çevresindeki dinî-sosyal faaliyettir.",
            "Kurumlar bütün nüfusun mesleğini belirlemez.",
            "Farklı işlevler ve kurum adları verilmiştir.",
          ],
          commonError:
            "Aynı çevredeki farklı kurumları tek eş anlamlı terim sayma.",
          check: "Yanıt iki tanımı da kendi işleviyle kullanır.",
        },
      },
      {
        prompt:
          "Bir öğretim notu hükümdarın halifeyle ilişkisinde onay, hutbe ve para üzerindeki adlandırmayı anıyor. Bu unsurlar hangi alanda birlikte incelenebilir?",
        options: [
          "Hükümdarlığın tanınması ve meşruiyet temsili.",
          "Her bireyin günlük konuşma dilinin kesin sayımında.",
          "Yalnız her binanın taşının ölçülmesinde.",
          "İlk kez yazının icat edildiği tarihin bulunmasında.",
          "Bütün üreticilerin aynı ürünü yetiştirdiğinin kanıtında.",
        ],
        answer: 0,
        hint: "Üç unsurun ortak öznesinin hükümdarlığın tanınması olduğunu bul.",
        explanation:
          "Onay, hutbe ve para üzerindeki adlandırma yönetimin tanınması ve temsil araçlarıyla ilişkilidir; bütün nüfusun ana dilini ölçmez.",
        guidance: {
          knowledge: ["Siyasi-dinî temsil ile nüfus özellikleri ayrılır."],
          strategy:
            "Onay, hutbe ve para üzerindeki adlandırmanın kimin kamusal tanınmasına ilişkin olduğunu araştır; üç işaretin ortak işlevini diğer kurum görevlerinden ayır.",
          steps: [
            "Üç unsurun ortak öznesinin hükümdarlığın tanınması olduğunu bul.",
            "Onay ve temsil araçlarını meşruiyet ilişkisiyle bağla.",
            "Bu verileri nüfus, tarım veya bütün yazı tarihinin ölçümüne dönüştürme.",
          ],
          optionReasons: [
            "Doğru. Onay, hutbe ve para üzerindeki adlandırma yönetimin tanınması ve temsil araçlarıyla ilişkilidir; bütün nüfusun ana dilini ölçmez.",
            "Temsil araçları halkın dil dağılımını vermez.",
            "Hükümdarlık onayı mimari taş ölçüsü değildir.",
            "Adlandırmanın yazılması yazının ilk icadı değildir.",
            "Siyasi-dinî temsil tarımsal ürün dağılımını belirlemez.",
          ],
          commonError:
            "Hükümdarlık simgesinden bütün halkın bütün özelliklerini çıkarma.",
          check: "Doğru alan üç unsuru da aynı anlam çerçevesinde karşılar.",
        },
      },
      {
        prompt:
          "Bir sözlükte çetr hükümdarın üstünde tutulan örtü/şemsiye, nevbet törensel müzik, tıraz hükümdarın ad ve lakaplarını taşıyan giysi olarak açıklanıyor. Bunlar öncelikle hangi işlevle ilişkilidir?",
        options: [
          "Aynı üç vergi türüyle.",
          "Hükümdarlığın görünür ve törensel simgeleriyle.",
          "Yalnız tıp kitaplarıyla.",
          "Üç farklı göç yoluyla.",
          "Aile, boy ve devlet sırasıyla.",
        ],
        answer: 1,
        hint: "Nesne ve eylemlerin hükümdarla bağını belirle.",
        explanation:
          "Üç tanım hükümdarlık temsilinin farklı araçlarıdır; mali kurum veya toplumsal örgütlenme kademesi değildir.",
        guidance: {
          knowledge: ["Hükümdarlık alametleri temsil işlevi taşır."],
          strategy:
            "Sözlükteki nesne ve eylemleri kullanım amacıyla eşleştir; ortak özneyi koruyarak bunların görevli unvanı, kurum veya temsil aracı olarak sunulduğu seçenekleri sınayarak ilerle.",
          steps: [
            "Nesne ve eylemlerin hükümdarla bağını belirle.",
            "Örtü, tören müziği ve özel giysi temsil araçlarıdır.",
            "Bu simgeleri gelir, topluluk düzeyi veya göç yolu kavramlarıyla karıştırma.",
          ],
          optionReasons: [
            "Örtü, müzik ve giysi ödeme aracı diye tanımlanmaz.",
            "Doğru. Üç tanım hükümdarlık temsilinin farklı araçlarıdır; mali kurum veya toplumsal örgütlenme kademesi değildir.",
            "Hükümdarlık simgeleri tedavi eseri değildir.",
            "Güzergâh veya nüfus hareketi verilmemiştir.",
            "Tanımlar toplumsal örgütlenme düzeyleri değildir.",
          ],
          commonError:
            "Terimleri ses benzerliğinden başka kurumlarla eşleştirme.",
          check: "Doğru seçenek üç sözlük tanımının ortak işlevini karşılar.",
        },
      },
      {
        prompt:
          "Bir not Karahanlı vezirleri için yuğruş, Gazneli vezirler için hâce unvanını veriyor. Bu iki terim arasındaki ilişki nasıl öğrenilmelidir?",
        options: [
          "Aynı hükümdarın zorunlu iki kişisel adı olarak.",
          "Karahanlı ile Gaznelinin tek devlet olduğunu kanıtlayarak.",
          "Farklı siyasi yapılarda benzer üst idari görevle ilişkilendirilen unvanlar olarak.",
          "Her unvanı yalnız askerî birlik sayısı sanarak.",
          "Yazım farkı bulunduğu için hiçbir ortak işlev yok diyerek.",
        ],
        answer: 2,
        hint: "Notun kişi değil görev unvanı verdiğini belirle.",
        explanation:
          "Not iki devlette vezirlik bağlamındaki farklı adlandırmayı verir; tek kişinin iki adı veya iki göç türü değildir.",
        guidance: {
          knowledge: ["Unvanın biçimi ile görevin işlevi birlikte incelenir."],
          strategy:
            "Unvanları devlet ve görev sütunlarına yerleştir; benzer işi farklı adlarla anma ile iki devletin bütün kurumlarını özdeş sayma arasındaki kapsam farkını kontrol et.",
          steps: [
            "Notun kişi değil görev unvanı verdiğini belirle.",
            "Yuğruş ve hâceyi kendi siyasi yapısı içinde vezirlikle ilişkilendir.",
            "Ortak işlevi korurken iki devleti ve unvanı aynılaştırma.",
          ],
          optionReasons: [
            "Metin kişi adı değil görev unvanı verir.",
            "Benzer görev iki siyasi yapıyı özdeş yapmaz.",
            "Doğru. Not iki devlette vezirlik bağlamındaki farklı adlandırmayı verir; tek kişinin iki adı veya iki göç türü değildir.",
            "Not bunları vezirlik bağlamında tanımlar.",
            "İki terim aynı üst görev bağlamıyla verilmiştir.",
          ],
          commonError:
            "Benzer görev adından siyasi yapıların aynı olduğu sonucu çıkarma.",
          check:
            "Doğru seçenek hem işlev ortaklığını hem bağlam farkını korur.",
        },
      },
      {
        prompt:
          "Bir tablo 1040 Dandanakan’da Sultan Mesut dönemindeki Gaznelilerin Selçuklular karşısında yenildiğini, Gazneli siyasi varlığının daha sonra da sürdüğünü veriyor. Hangi yorum tabloya uygundur?",
        options: [
          "Gazneliler 1040’ta Selçukluları yenmiştir.",
          "Bütün devletler her savaşta aynı gün ortadan kalkar.",
          "Sonraki varlık varsa yenilginin hiçbir etkisi olamaz.",
          "Askerî yenilgiyle siyasi son farklı aşamalar olabilir.",
          "Gazneli Mahmut 1040 yenilgisinin hükümdarı diye verilmiştir.",
        ],
        answer: 3,
        hint: "Hükümdar, savaş ve sonucu ayrı eşleştir.",
        explanation:
          "1040 yenilgisi devleti zayıflatabilir; sonraki siyasi varlık aynı gün kesin son iddiasını dışlar.",
        guidance: {
          knowledge: ["Askerî sonuç ile siyasi ömür farklı ölçekte incelenir."],
          strategy:
            "Savaş sonucu, hükümdar dönemi ve siyasi varlığın devamını ayrı kronoloji satırlarında tut; yenilgiyi devletin aynı günkü sonuyla eşitleyen yorumu bu kayıtlarla denetle.",
          steps: [
            "Hükümdar, savaş ve sonucu ayrı eşleştir.",
            "Sonraki varlık bilgisini 1040 tarihiyle birlikte oku.",
            "Yenilgi, zayıflama ve siyasi sonu tek aynı aşama sayma.",
          ],
          optionReasons: [
            "Tablodaki sonuç tersine çevrilmiştir.",
            "Tablonun verdiği sonraki varlık bu genel iddiaya uymaz.",
            "Sürme, zayıflama etkisini kendiliğinden yok etmez.",
            "Doğru. 1040 yenilgisi devleti zayıflatabilir; sonraki siyasi varlık aynı gün kesin son iddiasını dışlar.",
            "Tablo Sultan Mesut dönemini açıkça belirtir.",
          ],
          commonError: "Yenilgiyi otomatik aynı gün son sayma.",
          check: "Doğru seçenek tablodaki her iki zaman bilgisini korur.",
        },
      },
      {
        prompt:
          "Bir kaynakta Mısır’a idari görevle gönderilen bir yöneticinin daha sonra merkezle çatışıp bağımsız bir hanedan düzeni kurduğu anlatılıyor. Bu süreç için hangi ayrım gereklidir?",
        options: [
          "Merkezle çatışma varsa hiçbir idari ilişki kurulmamıştır.",
          "Her atama aynı gün yeni devlet kurar.",
          "Bağımsızlık anıldığı için önceki görev hiç olmamıştır.",
          "Görevlendirme ile sonraki siyasi bağımsızlık ayrı aşamalardır.",
          "Yöneticinin kökeni bütün halkın kökenini kesin belirler.",
        ],
        answer: 3,
        hint: "İlk eylemi merkez adına görevlendirme olarak belirle.",
        explanation:
          "Bir yere vali veya görevli olarak gönderilmek baştan bağımsız devlet kurmak değildir; sonraki süreç ayrıca verilmiştir.",
        guidance: {
          knowledge: [
            "Görev ilişkisi ve bağımsız siyaset ayrı kanıtlarla tarihlenir.",
          ],
          strategy:
            "Yöneticinin önce hangi makam adına hareket ettiğini, sonra yetki ilişkisinin nasıl değiştiğini gösteren iki aşamalı şema kur; kuruluşu ilk görevlendirmeyle karıştırma.",
          steps: [
            "İlk eylemi merkez adına görevlendirme olarak belirle.",
            "Bağımsızlık daha sonra gerçekleşen ayrı siyasi aşamadır.",
            "Sonraki sonucu ilk görevin tanımına geriye dönük yerleştirme.",
          ],
          optionReasons: [
            "Kaynak başlangıçta idari ilişkiyi açıkça verir.",
            "Atama ve daha sonraki bağımsızlık ayrı eylemler olarak tanımlanır.",
            "Sonraki aşama önceki kaydı silmez.",
            "Doğru. Bir yere vali veya görevli olarak gönderilmek baştan bağımsız devlet kurmak değildir; sonraki süreç ayrıca verilmiştir.",
            "Görev ve bağımsızlık süreci nüfusun tamamını vermez.",
          ],
          commonError:
            "Bir idari görevi otomatik bağımsız devlet kuruluşu sayma.",
          check: "Yanıt süreçteki önce ve sonra aşamalarını korur.",
        },
      },
      {
        prompt:
          "Bir karşılaştırmada Karahanlı merkezi Balasagun, Gazneli merkezi Gazne ve İdil Bulgar sahası Volga bağlantılarıyla veriliyor. Bu bilgiler nasıl kullanılmalıdır?",
        options: [
          "Farklı coğrafya varsa hiçbir kültürel ilişki olamaz diyerek.",
          "Üç devletin tek aynı hükümdarca kurulduğunu söyleyerek.",
          "Aynı geniş dinî çevredeki farklı siyasi coğrafyaları ayırmak için.",
          "Üç merkez de aynı Mısır şehridir diyerek.",
          "Bütün halkların ana dillerinin aynı olduğunu hesaplayarak.",
        ],
        answer: 2,
        hint: "Yer ve siyasi yapı eşleştirmelerini ayrı tut.",
        explanation:
          "Merkez ve bölge bilgileri farklı siyasi alanları ayırt eder; ortak din bütününü tek merkez yapmaz.",
        guidance: {
          knowledge: ["Dinî çevre ile siyasi coğrafya farklı katmanlardır."],
          strategy:
            "Siyasi yapı ve merkez için eşleştirme kartları hazırla; ortak din veya benzer ad üzerinden coğrafi yerleri birbirinin yerine kullanan seçenekleri ayır.",
          steps: [
            "Yer ve siyasi yapı eşleştirmelerini ayrı tut.",
            "Farklı coğrafyalar ortak dinî çevrede birlikte bulunabilir.",
            "Bu coğrafi farktan ne tam özdeşlik ne ilişki imkânsızlığı çıkar.",
          ],
          optionReasons: [
            "Ayrı siyasi alanlar arasında kültürel ilişki bulunabilir.",
            "Coğrafi eşleştirme ortak kurucu vermez.",
            "Doğru. Merkez ve bölge bilgileri farklı siyasi alanları ayırt eder; ortak din bütününü tek merkez yapmaz.",
            "Balasagun, Gazne ve Volga sahası aynı şehir değildir.",
            "Merkez bilgisi dil sayımı değildir.",
          ],
          commonError: "Ortak inancı tek şehir ve tek hükümdar sayma.",
          check: "Doğru yöntem üç yer eşleştirmesini korur.",
        },
      },
      {
        prompt:
          "İslamlaşma için iki açıklama öneriliyor: A) Ticaret, öğretim ve siyasi katılım koşulları incelenmelidir. B) Bütün insanlar her yerde değişmez tek bir topluluk karakteri nedeniyle aynı kararı verir. Hangisi tarihsel araştırmaya daha uygundur?",
        options: [
          "B bütün alternatifleri tek tek sınamış olur.",
          "B; yer ve tarih araştırmak gereksizdir.",
          "A yalnız tek savaş nedenini kabul eder.",
          "İkisi de kişilerin kararları hakkında tam nüfus sayımı verir.",
          "A; dönem ve yerel mekanizmalar araştırılabilir.",
        ],
        answer: 4,
        hint: "Açıklamaların hangi kanıt ve mekanizmayı önerdiğini karşılaştır.",
        explanation:
          "A somut ilişkiler ve değişen koşullar önerir. B bütün birey ve yerleri değişmez tek açıklamaya indirger.",
        guidance: {
          knowledge: [
            "Tarihsel açıklama somut dönem ve mekanizmalarla sınanır.",
          ],
          strategy:
            "İki açıklamaya aynı araştırma ölçütünü uygula: somut koşul ve sınanabilir mekanizma önerip önermediklerini denetle; değişmez topluluk niteliği iddiasını ayrıca sınamaya aç.",
          steps: [
            "Açıklamaların hangi kanıt ve mekanizmayı önerdiğini karşılaştır.",
            "A değişen ekonomik, öğretimsel ve siyasi koşulları araştırmaya açar.",
            "B’nin bütün kişi ve çağları tek değişmez özellik altında topladığını gör.",
          ],
          optionReasons: [
            "Tek değişmez karakter iddiası alternatifleri sınamak değildir.",
            "Değişmez bütünlük iddiası tarihsel çeşitliliği araştırmadan siler.",
            "A açıkça üç farklı ilişki alanını önerir.",
            "Hiçbiri ölçülmüş tam nüfus tablosu değildir.",
            "Doğru. A somut ilişkiler ve değişen koşullar önerir. B bütün birey ve yerleri değişmez tek açıklamaya indirger.",
          ],
          commonError: "Bütün topluluğu tek değişmez davranışla açıklama.",
          check:
            "Araştırılabilir açıklama açık kanıt ve alternatiflere yer bırakır.",
        },
      },
      {
        prompt:
          "Kurmaca bir seyyah yalnız bir pazardaki ticareti anlatıyor ve halkın dinî tercihlerini kaydetmiyor. “Dinden söz edilmemiş, öyleyse bölgede hiç din değişimi olmamış” sonucunun sorunu nedir?",
        options: [
          "Kaynağın sessizliği olayın kesin yokluğu sayılmıştır.",
          "Her seyyah bütün nüfusu her konuda saymak zorundadır.",
          "Din kelimesi yazılmayınca siyasi coğrafya değişir.",
          "Seyyahın anlattığı bütün ticaret mutlaka uydurmadır.",
          "Pazardan söz etmek bütün halkın dinini kesin verir.",
        ],
        answer: 0,
        hint: "Kaynağın açık konusunu ticaret olarak belirle.",
        explanation:
          "Ticaret odaklı metin bu soruyu kaydetmemiş olabilir; din değişiminin varlığı veya yokluğu için uygun ek kaynak gerekir.",
        guidance: {
          knowledge: [
            "Kaynakta bilgi bulunmaması olayın zorunlu yokluğu değildir.",
          ],
          strategy:
            "Seyyahın gözlem alanıyla yorumun iddia ettiği alanı karşılaştır; bir konunun kaydedilmemesi ile o konuda yokluk kanıtı bulunmasını ayrı mantıksal durumlar olarak ele al.",
          steps: [
            "Kaynağın açık konusunu ticaret olarak belirle.",
            "Dinî tercihlerin kaydedilmemesi bu alanda bilgi eksikliğidir.",
            "Eksik bilgiyi kesin yokluk yerine uygun yeni kaynak arama gerekçesi yap.",
          ],
          optionReasons: [
            "Doğru. Ticaret odaklı metin bu soruyu kaydetmemiş olabilir; din değişiminin varlığı veya yokluğu için uygun ek kaynak gerekir.",
            "Kaynağın amacı ve kapsamı sınırlı olabilir.",
            "Sözcük yokluğu coğrafi sınırı kendiliğinden değiştirmez.",
            "Bir konunun eksikliği başka konunun bütününü geçersiz yapmaz.",
            "Ekonomik betimleme bütün bireylerin inancını vermez.",
          ],
          commonError:
            "Sessizliği bütün toplum hakkında kesin olumsuz hüküm sayma.",
          check:
            "Doğru seçenek kaynağın amacını ve eksik alanını birlikte korur.",
        },
      },
      {
        prompt:
          "Bir tabloda Alp Tegin Gazneli oluşumuyla, Alp Arslan ise Büyük Selçuklu Sultanı ve 1071 Malazgirt’le ilişkilendiriliyor. Adların ortak Alp parçasından hareketle ikisini aynı kişi saymak neden yanlıştır?",
        options: [
          "Kişi, siyasi yapı ve olay eşleştirmeleri farklıdır.",
          "Gazneli ile Büyük Selçuklu bütün olayları aynı devlettir.",
          "Malazgirt ilk Karahanlı hükümdarının adıdır.",
          "Alp sözcüğü geçen herkes aynı yılda yaşar.",
          "Kişi isimleri tarih araştırmasında hiç kullanılamaz.",
        ],
        answer: 0,
        hint: "İki adın yanındaki devlet ve olayı ayrı oku.",
        explanation:
          "Ortak bir ad parçası iki farklı tarihsel kişiyi aynı yapmaz; devlet ve olay alanları kontrol edilmelidir.",
        guidance: {
          knowledge: ["Ad benzerliği kişi özdeşliği değildir."],
          strategy:
            "Her Alp adını tam kişi adı, siyasi yapı ve olayla birlikte kimlik kartına yaz; ortak bir ad parçasının aynı kişiyi kanıtlamak için yeterli olup olmadığını bu kartlarla kontrol et.",
          steps: [
            "İki adın yanındaki devlet ve olayı ayrı oku.",
            "Alp Tegin ile Alp Arslan farklı eşleştirmeler taşır.",
            "Ortak sözcük yerine kişi-devlet-olay bağını kullan.",
          ],
          optionReasons: [
            "Doğru. Ortak bir ad parçası iki farklı tarihsel kişiyi aynı yapmaz; devlet ve olay alanları kontrol edilmelidir.",
            "Bunlar farklı siyasi oluşumlardır.",
            "Malazgirt savaş adıdır; kişi ve olay türü karıştırılır.",
            "Ortak sözcük ortak dönem veya kişi kanıtı değildir.",
            "İsimler olay ve siyasi bağlamla birlikte yararlı kanıttır.",
          ],
          commonError:
            "İsimdeki ortak parçayı tarih ve devlet bilgisinin yerine koyma.",
          check: "Doğru gerekçe iki satırın farklı siyasi bağlamına dayanır.",
        },
      },
    ],
  },
  {
    id: "selcuklu-yerlesme-devletlesme-ileri",
    base: "selcuklu-yerlesme-devletlesme",
    title: "Selçuklu Türkiyesi: ileri devlet ve kaynak soruları",
    questions: [
      {
        prompt:
          "Bir öğretim notu XI. yüzyıldan önce Anadolu’da farklı yerel toplulukların, Bizans-Sasani ve Bizans-Müslüman mücadelelerinin bulunduğunu anlatıyor. Bu zemin bilgisi hangi yaklaşımı destekler?",
        options: [
          "Anadolu’daki bütün yaşamın 1071’de ilk kez başlaması.",
          "Bütün yerel toplulukların her zaman aynı tepkiyi göstermesi.",
          "Göç ve yerleşme konularında coğrafyanın hiç önemi olmaması.",
          "Türk yerleşimini daha önce insan ve kurum bulunmayan boş bir alana geliş gibi anlatmamak.",
          "Her bölgenin aynı gün aynı devlete bağlanması.",
        ],
        answer: 3,
        hint: "XI. yüzyıl öncesi varlığı açıkça verilen topluluk ve ilişkileri bul.",
        explanation:
          "Önceki topluluk ve mücadeleler yerleşmenin mevcut bir tarihsel çevreyle etkileşim içinde gerçekleştiğini gösterir.",
        guidance: {
          knowledge: [
            "Yerleşme mevcut toplumsal ve siyasi çevre içinde gelişir.",
          ],
          strategy:
            "Yerleşme öncesinin topluluk ve mücadele bilgilerini başlangıç koşulları olarak listele; seçeneklerin bu zemini koruyup korumadığını ve geçmiş nüfusu görünmez kılıp kılmadığını denetle.",
          steps: [
            "XI. yüzyıl öncesi varlığı açıkça verilen topluluk ve ilişkileri bul.",
            "Yeni yerleşmenin bu mevcut çevreyle karşılaşma içinde geliştiğini kur.",
            "Boş alan, aynı tepki ve aynı gün birlik gibi yeni genellemeler ekleme.",
          ],
          optionReasons: [
            "Not daha önceki insan ve siyasi ilişkileri açıkça verir.",
            "Çeşitli toplulukların tek değişmez davranışı belirtilmez.",
            "Yerel çevreyi incelemek coğrafyayı yok saymak değildir.",
            "Doğru. Önceki topluluk ve mücadeleler yerleşmenin mevcut bir tarihsel çevreyle etkileşim içinde gerçekleştiğini gösterir.",
            "Önceki zemin bilgisi böyle eşzamanlı siyasi birlik vermez.",
          ],
          commonError:
            "Bir dönüm noktasını bütün insan hayatının başlangıcı sayma.",
          check: "Doğru yaklaşım nottaki önceki varlıkları yok saymaz.",
        },
      },
      {
        prompt:
          "Bir ders anlatısında önce çevrenin tanınması, sonra belirli askerî hareketler, daha sonra aynı yerde düzenli konut ve üretim kayıtları veriliyor. Bu farklı aşamalar nasıl adlandırılabilir?",
        options: [
          "Her konut mutlaka hareketli savaş birliğidir.",
          "Yalnız para basımı, çeviri ve astronomi.",
          "Keşif, akın ve kalıcı yerleşme.",
          "Üçü de modern genel seçim.",
          "Üçü de aynı gün gerçekleşen tek fetih.",
        ],
        answer: 2,
        hint: "Her aşamadaki fiili ayrı yaz: tanıma, askerî hareket, düzenli yaşama.",
        explanation:
          "Çevreyi tanıma, askerî hareket ve düzenli yaşam-üretim farklı eylem türleridir.",
        guidance: {
          knowledge: ["Keşif, askerî hareket ve yerleşme aynı aşama değildir."],
          strategy:
            "Her aşamanın amacı, süresi ve maddi izi için bir gözlem satırı aç; kalıcı konut ve üretim bilgisinin önceki hareketlerden farkını koruyarak adlandırmaları eşleştir.",
          steps: [
            "Her aşamadaki fiili ayrı yaz: tanıma, askerî hareket, düzenli yaşama.",
            "Bu fiilleri keşif, akın ve yerleşmeyle eşleştir.",
            "Ortak coğrafyayı aynı eylem veya aynı gün sonucu yapma.",
          ],
          optionReasons: [
            "Düzenli konut ve üretim doğrudan bu askerî özdeşliği vermez.",
            "Bu işlemler kökte verilmemiştir.",
            "Doğru. Çevreyi tanıma, askerî hareket ve düzenli yaşam-üretim farklı eylem türleridir.",
            "Seçim veya oy hakkı verisi yoktur.",
            "Anlatı farklı eylem ve aşamaları ayırır.",
          ],
          commonError:
            "Akın kaydını tek başına bütün yerleşimin tamamlanması sayma.",
          check: "Üç terim kökteki üç farklı işe uyar.",
        },
      },
      {
        prompt:
          "Bir kronoloji kartı 1048 Pasinler’i Bizans’la mücadele, 1071 Malazgirt’i Alp Arslan–Romen Diyojen karşılaşması olarak veriyor. Karttan hangi sonuç çıkar?",
        options: [
          "1048,1071’den sonra gelmektedir.",
          "Türkiye Selçuklu Devleti’nin kuruluş tarihi 1048’dir.",
          "Pasinler ile Malazgirt aynı savaşın iki adıdır.",
          "Romen Diyojen Gazneli Devleti’nin kurucusudur.",
          "1071’den önce de Selçuklu-Bizans askerî karşılaşmaları bulunmuştur.",
        ],
        answer: 4,
        hint: "İki MS yılı küçükten büyüğe sırala.",
        explanation:
          "1048,1071’den öncedir ve kartta Bizans’la mücadele açıkça belirtilmiştir.",
        guidance: {
          knowledge: ["Bir dönüm noktasından önceki ilişkiler de araştırılır."],
          strategy:
            "İki karşılaşmayı tarih, taraf ve olay başlıklarıyla bir kronolojiye koy; seçeneklerde kronoloji aralığına aykırı bir ilk olma veya tek olay iddiası bulunup bulunmadığını kontrol et.",
          steps: [
            "İki MS yılı küçükten büyüğe sırala.",
            "1048’deki karşılaşma 1071’den önceki askerî ilişkiyi gösterir.",
            "Olay sırasından iki savaşın aynı olduğu veya ayrı devletin kurulduğu sonucu çıkmaz.",
          ],
          optionReasons: [
            "MS yıl sıralamasında 1048 daha erkendir.",
            "Kart askerî karşılaşma verir; 1077 kuruluşunun yerine geçmez.",
            "Kart iki farklı tarih ve olayı ayırır.",
            "Kart onu Bizans karşılaşmasına bağlar; Gazneli kuruluşu değildir.",
            "Doğru. 1048,1071’den öncedir ve kartta Bizans’la mücadele açıkça belirtilmiştir.",
          ],
          commonError:
            "Malazgirt’i bütün önceki askerî temasların yokluğu sayma.",
          check: "1048<1071 koşulu doğru sonucu destekler.",
        },
      },
      {
        prompt:
          "Bir eser kartında Malabadi Köprüsü ile Mardin-Hasankeyf çevresindeki siyasi faaliyetler birlikte veriliyor. Ders çerçevesinde hangi beylik bağlantısı doğrudur?",
        options: [
          "Çaka Beyliği.",
          "Saltuklular.",
          "Şam Emevileri.",
          "Artuklular.",
          "Avrupa Hunları.",
        ],
        answer: 3,
        hint: "Eserle birlikte verilen coğrafyayı kullan.",
        explanation:
          "Malabadi Köprüsü Artuklu bağlamıyla; Mardin ve Hasankeyf de bu siyasi çevreyle ilişkilidir.",
        guidance: {
          knowledge: [
            "Eser atfı coğrafya ve siyasi yapı ile birlikte yapılır.",
          ],
          strategy:
            "Eseri kendi yer ve siyasi faaliyet bağlamıyla birlikte tanıtan bir eşleştirme kartı kullan; yakın coğrafyadaki başka hanedanların eserlerini aynı kurucuya yığan seçenekleri ayır.",
          steps: [
            "Eserle birlikte verilen coğrafyayı kullan.",
            "Malabadi ve Mardin-Hasankeyf Artuklu bağlantısını kur.",
            "Bütün eserleri Türkiye Selçuklu veya başka beylik adına otomatik yazma.",
          ],
          optionReasons: [
            "Çaka İzmir ve denizcilik çevresiyle ayrılır.",
            "Saltuklu merkez bağlamı Erzurum’dur; verilen eser eşleştirmesi değildir.",
            "Farklı dönem ve coğrafyanın siyasi yapısıdır.",
            "Doğru. Malabadi Köprüsü Artuklu bağlamıyla; Mardin ve Hasankeyf de bu siyasi çevreyle ilişkilidir.",
            "Anadolu’daki bu beylik-eser bağlantısını karşılamaz.",
          ],
          commonError:
            "Ortak Türk veya Anadolu adından bütün eserleri aynı hanedana atfetme.",
          check: "İki farklı ipucu aynı Artuklu eşleştirmesini destekler.",
        },
      },
      {
        prompt:
          "Bir araştırmacı Danişmentnâme’deki kahramanlık anlatılarını başka tarihli belgelerle karşılaştırmak istiyor. Hangi yöntem daha uygundur?",
        options: [
          "Metindeki bütün adları aynı kişi kabul etmek.",
          "Her cümleyi yorum gerektirmeyen tam olay kaydı saymak.",
          "Başka belgeleri yalnız anlatıya uymuyorsa yok saymak.",
          "Kahramanlık dili varsa metnin hiçbir tarihsel değeri yoktur demek.",
          "Anlatının üretim ve aktarım bağlamını inceleyip olay iddialarını başka kanıtlarla sınamak.",
        ],
        answer: 4,
        hint: "Anlatının türünü ve amacını belirle.",
        explanation:
          "Destansı anlatı hafıza ve temsil için değerlidir; her ayrıntısını çağdaş bir işlem tutanağı gibi kabul etmek gerekmez.",
        guidance: {
          knowledge: [
            "Kaynağın türü hangi soruya nasıl cevap vereceğini etkiler.",
          ],
          strategy:
            "Anlatının ne zaman, hangi amaçla ve hangi yolla aktarıldığına ilişkin sorular oluştur; olay iddialarını karşılaştırırken kaynak türünü tümden değersiz veya yanılmaz saymayan yöntemi ara.",
          steps: [
            "Metnin anlatı türünü ve amacını belirle.",
            "Tarihsel hafıza değeriyle her olay ayrıntısının doğrulanmasını ayır.",
            "Başka belgelerle uyum ve farklılıkları araştır; kaynağı ne tümden reddet ne eleştirisiz kabul et.",
          ],
          optionReasons: [
            "Farklı kişilerin kimliği olay ve zamanla denetlenir.",
            "Tür, amaç ve aktarım zinciri eleştiriyi gerektirir.",
            "Karşı kanıtı dışlamak kaynak karşılaştırması değildir.",
            "Hafıza, değer ve temsil hakkında kaynak olabilir.",
            "Doğru. Destansı anlatı hafıza ve temsil için değerlidir; her ayrıntısını çağdaş bir işlem tutanağı gibi kabul etmek gerekmez.",
          ],
          commonError:
            "Anlatı türünü bütün değersizlik veya tam tarafsızlık sayma.",
          check:
            "Doğru yöntem hem kullanım değerini hem kaynak eleştirisini korur.",
        },
      },
      {
        prompt:
          "Bir öğretim notu Çaka Beyliği ile Türkiye Selçukluları arasındaki evlilik bağını ve farklı dönemlerde değişen siyasi ilişkileri birlikte anlatıyor. Evlilik bağı tek başına hangi sonucu vermez?",
        options: [
          "İki siyasi yapının bütün zamanlarda tek ve aynı devlet olduğunu.",
          "Dönem değişiminin ayrıca önemli olduğunu.",
          "Hanedan ilişkilerinin siyasette incelenebileceğini.",
          "Bir ilişkinin başka kaynaklarla karşılaştırılabileceğini.",
          "Diplomatik bağ ile siyasi birlik kavramlarının ayrılması gerektiğini.",
        ],
        answer: 0,
        hint: "Evlilik bağıyla fiilî siyasi egemenliği ayrı tanımla.",
        explanation:
          "Hanedanlar arası ilişki ittifak ve diplomasiye katkı verebilir; bütün dönemlerde tek siyasi otorite olduklarını göstermez.",
        guidance: {
          knowledge: ["Hanedan bağı siyasi özdeşliğin tamamı değildir."],
          strategy:
            "Evlilik, ittifak ve fiilî yönetim için ayrı ilişki çizgileri kullan; bir çizginin ötekilerin bütün dönemlerdeki durumunu zorunlu belirleyip belirlemediğini seçeneklerde sına.",
          steps: [
            "Evlilik bağıyla fiilî siyasi egemenliği ayrı tanımla.",
            "İlişkilerin dönem içinde değişmesi sürekli özdeşlik iddiasını sınırlar.",
            "Olumsuz kökte tek ve değişmez devlet sonucunu seç.",
          ],
          optionReasons: [
            "Doğru. Hanedanlar arası ilişki ittifak ve diplomasiye katkı verebilir; bütün dönemlerde tek siyasi otorite olduklarını göstermez.",
            "Metin değişen siyasi ilişkileri açıkça belirtir.",
            "Evlilik bağı bu sınırlı araştırma alanına örnektir.",
            "Evlilik ve siyasi uygulama kayıtları birlikte incelenebilir.",
            "Tek ilişki tek devlet kanıtı olmadığından bu ayrım uygundur.",
          ],
          commonError:
            "Bir ittifak aracını bütün dönemlerin tek devlet kanıtı sayma.",
          check: "Desteklenmeyen seçenek metne kesintisiz siyasi birlik ekler.",
        },
      },
      {
        prompt:
          "Haçlı seferleri için bir açıklama kutsal yerler hedefini, soyluların güç ve toprak arayışını, tüccarların ticari beklentilerini ayrı veriyor. Bu açıklama hangi yöntemi kullanıyor?",
        options: [
          "Farklı aktörlerin farklı amaçlarını birlikte değerlendirmeyi.",
          "Ekonomik beklenti varsa dinî hedef hiç bulunamaz demeyi.",
          "Farklı amaçlar varsa hiç sefer gerçekleşmemiştir demeyi.",
          "Bütün seferleri tek kişinin tek günlük kararı saymayı.",
          "Bütün kişilerin yalnız aynı ekonomik nedenle katıldığını.",
        ],
        answer: 0,
        hint: "Her amaç için ilişkili aktörü ayrı bul.",
        explanation:
          "Dinî, siyasi ve ekonomik beklentiler farklı aktörlerde birlikte bulunabilir; katılımı tek değişmez neden açıklamaz.",
        guidance: {
          knowledge: [
            "Tarihsel harekette farklı aktör ve amaçlar birlikte bulunabilir.",
          ],
          strategy:
            "Amaçları aktörlere göre bir matrise yerleştir; ortak sefer başlığı altında farklı beklentileri koruyan açıklamayla tüm aktörlere tek amaç yükleyeni karşılaştır.",
          steps: [
            "Her amaç için ilişkili aktörü ayrı bul.",
            "Üç alanın birlikte bulunabileceğini koru.",
            "Tek neden veya birbirini dışlama iddialarını açıklamanın kapsamıyla karşılaştır.",
          ],
          optionReasons: [
            "Doğru. Dinî, siyasi ve ekonomik beklentiler farklı aktörlerde birlikte bulunabilir; katılımı tek değişmez neden açıklamaz.",
            "Açıklama bu alanları birlikte ele alır.",
            "Amaç çeşitliliği olayın yokluğu anlamına gelmez.",
            "Aktör çeşitliliği ve uzun süreç böyle daraltılmaz.",
            "Metin dinî ve siyasi hedefleri de verir.",
          ],
          commonError:
            "Büyük bir hareketin tüm katılımcılarını tek amaçla tanımlama.",
          check: "Doğru seçenek üç ayrı beklentiyi açıklamada korur.",
        },
      },
      {
        prompt:
          "Bir kronoloji notu 1147’de II. Haçlı Seferi sırasında Alman kuvvetlerinin I. Mesut döneminde Anadolu’da yenilgiye uğratılmasını anlatıyor. Hangi eşleştirme notla uyumludur?",
        options: [
          "Alp Arslan ve I. Kök Türk kuruluşu.",
          "Satuk Buğra Han ve 632 Medine.",
          "Cengiz Han ve 1077 Türkiye Selçuklu kuruluşu.",
          "I. Mesut ve II. Haçlı Seferi.",
          "II. Kılıç Arslan ve 1243 Kösedağ.",
        ],
        answer: 3,
        hint: "Yıl, hükümdar ve sefer sırasını ayrı yaz.",
        explanation:
          "Not hükümdar ve sefer sırasını açıkça bu biçimde verir; II. Kılıç Arslan’ın 1176 karşılaşması ayrı gelişmedir.",
        guidance: {
          knowledge: ["Sefer sırası ve hükümdar birlikte denetlenir."],
          strategy:
            "Kronoloji notunu hükümdar, sefer sırası ve karşılaşılan kuvvet başlıklarıyla kontrol et; şıklardaki eşleştirmeleri bu üçlüyle aynı anda sınayarak ilerle.",
          steps: [
            "Yıl, hükümdar ve sefer sırasını ayrı yaz.",
            "1147 notu I. Mesut ve II. Haçlı ilişkisini verir.",
            "Başka savaş veya devletin kişisini bu eşleştirmenin yerine koyma.",
          ],
          optionReasons: [
            "Farklı devlet ve dönemler birleştirilmiştir.",
            "Farklı kişi ve yüzyılların birleşimidir.",
            "Kuruluş Kutalmışoğlu Süleyman Şah bağlamındadır.",
            "Doğru. Not hükümdar ve sefer sırasını açıkça bu biçimde verir; II. Kılıç Arslan’ın 1176 karşılaşması ayrı gelişmedir.",
            "II. Kılıç Arslan 1176 bağlamıyla; Kösedağ başka dönemle ilişkilidir.",
          ],
          commonError: "Bütün Selçuklu karşılaşmalarını tek sultana bağlama.",
          check: "Doğru seçenek notun iki açık adlandırmasını korur.",
        },
      },
      {
        prompt:
          "Miryokefalon’a ilişkin bir öğretim betimlemesi dar geçitte hareket eden ordunun pusu ve arazi koşullarıyla zorlanmasını anlatıyor. Bu betimlemede açıklamanın doğrudan kullandığı alan hangisidir?",
        options: [
          "Her yerde aynı anda kurulan tek hukuk sistemi.",
          "Arazi ile askerî hareket arasındaki ilişki.",
          "Bütün savaşların yalnız asker sayısıyla sonuçlandığı.",
          "Bütün ticaretin kesin sonu.",
          "Yalnız bütün nüfusun ana dili.",
        ],
        answer: 1,
        hint: "Betimlemenin somut engelini dar geçit olarak belirle.",
        explanation:
          "Geçidin darlığı ve pusu, ordunun hareket ve manevra koşullarıyla ilgilidir; bütün savaşları tek neden açıklamaz.",
        guidance: {
          knowledge: ["Askerî avantaj koşul ve araziyle ilişkilidir."],
          strategy:
            "Betimlemedeki çevre koşulu ile ordunun hareket imkânı arasına bir ilişki oku çiz; açıklamanın dayandığı somut değişkeni diğer neden türlerinden ayır.",
          steps: [
            "Betimlemenin somut engelini dar geçit olarak belirle.",
            "Pusuyla birlikte ordunun hareket koşulunu açıkla.",
            "Bu özel mekanizmayı bütün savaşların tek nedeni veya başka toplumsal alanların ölçümü yapma.",
          ],
          optionReasons: [
            "Betimleme hukuk düzeni vermez.",
            "Doğru. Geçidin darlığı ve pusu, ordunun hareket ve manevra koşullarıyla ilgilidir; bütün savaşları tek neden açıklamaz.",
            "Metin sayıdan farklı olarak arazi ve pusuyu vurgular.",
            "Askerî arazi koşulu tüm ticaretin bittiğini göstermez.",
            "Arazi ve pusu dil dağılımı bilgisi değildir.",
          ],
          commonError:
            "Bir savaşın koşulunu her savaşta aynı sonuç garantisi sayma.",
          check: "Yanıt verilen geçit ve pusu verilerini birlikte kullanır.",
        },
      },
      {
        prompt:
          "Bir ders kartı 1204’te IV. Haçlı Seferi kuvvetlerinin İstanbul’u almasını anlatıyor. Bu olay hangi basit genellemeyi sınırlar?",
        options: [
          "Seferlerde farklı aktörlerin bulunabildiğini.",
          "Dönem ve tarafların ayrı incelenmesi gerektiğini.",
          "Bütün Haçlı gruplarıyla Bizans’ın her dönemde tamamen aynı çıkarla hareket ettiğini.",
          "Olayın siyasi sonuçları olabileceğini.",
          "Aynı geniş dinî çevrede de siyasi çatışma olabileceğini.",
        ],
        answer: 2,
        hint: "1204’te hangi şehrin kimin eline geçtiğini belirle.",
        explanation:
          "Bizans’ın başkentinin Haçlı kuvvetlerince alınması, aktörlerin her aşamada çıkarlarının özdeş olmadığını gösterir.",
        guidance: {
          knowledge: ["Ortak dinî çevre sürekli aynı siyasi çıkar değildir."],
          strategy:
            "Olayın aktör ve hedeflerini bir ilişkiler şemasına yerleştir; seçeneklerdeki her zaman ve bütün gruplar türü ifadeleri bu tek olayın karşı örnek olma gücüyle denetle.",
          steps: [
            "1204’te hangi şehrin kimin eline geçtiğini belirle.",
            "Bizans’la bütün Haçlı gruplarının çıkarları tamamen özdeş olsaydı bu gelişme açıklanamazdı.",
            "Genellemeyi sınırla; bütün dönemler için tersine kesintisiz düşmanlık da kurma.",
          ],
          optionReasons: [
            "Olay bu çeşitliliği dışlamaz, tersine araştırmayı gerektirir.",
            "1204 örneği bu yöntemi destekler.",
            "Doğru. Bizans’ın başkentinin Haçlı kuvvetlerince alınması, aktörlerin her aşamada çıkarlarının özdeş olmadığını gösterir.",
            "Başkent üzerinde egemenlik değişimi bu sınırlı yorumu destekler.",
            "Olay bu sınırlı ilişkiye uygundur.",
          ],
          commonError:
            "İttifak veya yardım ilişkisinden bütün çağlar için tam çıkar birliği çıkarma.",
          check: "Yanıt olayın ayırt edici taraf ve şehir bilgisini kullanır.",
        },
      },
      {
        prompt:
          "Bir görev sözlüğü atabeyi meliklerin eğitimi ve deneyimiyle, pervaneyi arazi işleriyle ilgili düzenlemelerle tanımlıyor. Bu iki görev nasıl eşleştirilir?",
        options: [
          "İkisi de yalnız kervanın gece konaklaması.",
          "Atabey eğitim-deneyim; pervane arazi düzenlemeleri.",
          "Atabey yalnız hasta tedavisi; pervane deniz pusulası.",
          "Atabey arazi düzenlemesi; pervane melik eğitimi.",
          "İkisi de bütün halkın genel oy seçimi.",
        ],
        answer: 1,
        hint: "Sözlükte her unvanın yanındaki işi ayır.",
        explanation:
          "Verilen görevler farklı idari ihtiyaçlardır; adların aynı yönetim çevresinde bulunması işleri özdeş yapmaz.",
        guidance: {
          knowledge: ["İdari unvan somut işle eşleştirilir."],
          strategy:
            "İki görev adını ilgili kişi veya iş alanıyla eşleştiren mini sözlük kullan; şıklarda görevlerin ters çevrilip çevrilmediğine veya ilgisiz kurumlara aktarılıp aktarılmadığına bak.",
          steps: [
            "Sözlükte her unvanın yanındaki işi ayır.",
            "Melik eğitimi atabey, arazi işleri pervane olarak verilmiştir.",
            "Ortak devlet çevresinden aynı görev sonucu çıkarma.",
          ],
          optionReasons: [
            "Bu kervansaray işlevi bağlamıdır, verilen görevler değildir.",
            "Doğru. Verilen görevler farklı idari ihtiyaçlardır; adların aynı yönetim çevresinde bulunması işleri özdeş yapmaz.",
            "Sözlükteki iki görev tanımıyla da uyuşmaz.",
            "İşlevlerin yerini değiştirir.",
            "Görev tanımları siyasi oy hakkı değildir.",
          ],
          commonError:
            "Ses veya aynı dönemde bulunma benzerliğinden görevleri ters kullanma.",
          check: "İki tanım kendi yerine konduğunda sıra korunur.",
        },
      },
      {
        prompt:
          "Bir Türkiye Selçuklu ordu betimlemesinde hükümdara yakın hizmetteki gulam birlikleriyle boy kuvvetleri ve ücretli unsurlar birlikte anılıyor. Hangi ifade bu betimlemeye uygundur?",
        options: [
          "Ücretli unsur varsa diğer bütün kuvvetler yoktur.",
          "Orduda farklı bağlılık ve hizmet biçimleri birlikte bulunabilir.",
          "Her birlik bütün savaşlarda aynı görevi yapmıştır.",
          "Askerî çeşitlilik bütün halkın farklı devletler olduğunu kanıtlar.",
          "Ordudaki herkes yalnız aynı boyun mensubudur.",
        ],
        answer: 1,
        hint: "Listede birbirinden ayrılan kuvvet türlerini koru.",
        explanation:
          "Liste birden fazla örgütlenme unsurunu verir; bütün kuvvetlerin tek yöntemle oluştuğunu göstermez.",
        guidance: {
          knowledge: ["Ordu tek bir kaynak ve bağlılık türüne indirgenmez."],
          strategy:
            "Asker türlerini kaynak ve bağlılık ölçütlerine göre satırlara ayır; listedeki çeşitliliğe yer bırakan yorumlarla bütün orduda tek biçim varsayanları karşılaştır.",
          steps: [
            "Listede birbirinden ayrılan kuvvet türlerini koru.",
            "Bu bileşim farklı hizmet ve bağlılık biçimlerini gösterebilir.",
            "Listeyi tek köken veya bütün görevlerin değişmezliği biçiminde daraltma.",
          ],
          optionReasons: [
            "Metin unsurları birlikte saymaktadır.",
            "Doğru. Liste birden fazla örgütlenme unsurunu verir; bütün kuvvetlerin tek yöntemle oluştuğunu göstermez.",
            "Liste bütün görev dağılımını ve bütün savaşları kapsamaz.",
            "Ordu bileşimi siyasi bölünmenin tek başına kanıtı değildir.",
            "Gulam ve ücretli unsurlar listede ayrıca verilmiştir.",
          ],
          commonError: "Önemli bir kuvvet grubunu bütün ordunun tamamı sayma.",
          check: "Doğru seçenek listelenen bütün unsurlara yer bırakır.",
        },
      },
      {
        prompt:
          "Babaîler Ayaklanması üzerine bir açıklama geçim sorunları, merkezle ilişkiler ve dinî-sosyal çevreleri birlikte inceliyor. Bu yaklaşımın özelliği nedir?",
        options: [
          "Toplumsal hareketi birden fazla ilişkili etkenle araştırması.",
          "Yalnız savaş adını yazmanın bütün açıklamayı tamamlaması.",
          "İç gerilimlerin merkezî güçle hiç ilişkisi bulunmadığı.",
          "Bütün katılımcıların tek aynı kişisel amacı olduğu.",
          "Dinî-sosyal unsur varsa geçim sorunu olamaz demesi.",
        ],
        answer: 0,
        hint: "Açıklamadaki üç alanı ayrı belirle.",
        explanation:
          "Ekonomik, siyasi ve dinî-sosyal alanlar aynı hareketin koşullarında birlikte rol oynayabilir.",
        guidance: {
          knowledge: ["Toplumsal hareket çoklu koşullarla açıklanabilir."],
          strategy:
            "Ekonomik, siyasi ve dinî-sosyal verileri ilişkili ama ayrı etkenler olarak haritala; seçeneklerde bu alanlardan birinin diğerlerini zorunlu dışlayıp dışlamadığını sına.",
          steps: [
            "Açıklamadaki üç alanı ayrı belirle.",
            "Bu alanların birlikte toplumsal koşul oluşturabileceğini gör.",
            "Birini diğerlerinin yokluğu veya tüm bireylerin tek niyeti yapma.",
          ],
          optionReasons: [
            "Doğru. Ekonomik, siyasi ve dinî-sosyal alanlar aynı hareketin koşullarında birlikte rol oynayabilir.",
            "Kaynak hareketin farklı toplumsal koşullarını inceler.",
            "Merkezle ilişkiler açıklamada açıkça yer alır.",
            "Çoklu alan incelemesi bütün bireylerin niyetini tekleştirmez.",
            "Verilen yaklaşım bu alanları birlikte ele alır.",
          ],
          commonError: "Bütün katılımcıları tek değişmez gerekçeyle tanımlama.",
          check: "Doğru seçenek açıklamanın üç boyutunu da korur.",
        },
      },
      {
        prompt:
          "Bir öğretim anlatısında I. Alâeddin Keykubad’ın Harzemşahlarla iş birliği aradığı, fakat Celâleddin Harzemşah’ın Ahlât kuşatmasının yeni bir tehdit algısı doğurduğu veriliyor. Bu bilgiler neyi göstermeye uygundur?",
        options: [
          "Ahlât kuşatması bütün coğrafyalarda aynı sonucu doğurur.",
          "İttifak arayışı ile sonraki çatışma, amaç ve koşullar değişince farklılaşabilir.",
          "İlk iş birliği talebi varsa daha sonra hiçbir çatışma olamaz.",
          "İş birliği arayan hükümdarın hiçbir amacı bulunamaz.",
          "Aynı dinî çevredeki devletler her zaman tek devlettir.",
        ],
        answer: 1,
        hint: "İlk aşamadaki iş birliği arayışını belirle.",
        explanation:
          "İş birliği arayışı sürekli dostluğu garanti etmez; yeni eylem tarafların güvenlik değerlendirmesini değiştirebilir.",
        guidance: {
          knowledge: ["Dış ilişki amaç ve yeni eylemlerle değişebilir."],
          strategy:
            "İlk amaç, sonraki eylem ve yeni tehdit değerlendirmesini üç aşamada kaydet; ilişkideki değişimi açıklayan yorumla başlangıç bağını değişmez sayanı karşılaştır.",
          steps: [
            "İlk aşamadaki iş birliği arayışını belirle.",
            "Sonraki kuşatmanın güvenlik algısını değiştirdiğini izle.",
            "İttifakı değişmez kimlik bağı yerine dönemin amaç ve koşullarıyla değerlendir.",
          ],
          optionReasons: [
            "Belirli olay ve taraflar verilmiştir; evrensel sonuç yoktur.",
            "Doğru. İş birliği arayışı sürekli dostluğu garanti etmez; yeni eylem tarafların güvenlik değerlendirmesini değiştirebilir.",
            "Anlatı değişen koşulları ve tehdit algısını açıkça verir.",
            "Anlatıda güvenlik değerlendirmesiyle ilişkili siyasi amaçlar vardır.",
            "İş birliği ve tehdit ilişkileri ayrı siyasi aktörler arasında kurulmuştur.",
          ],
          commonError: "İlk ittifak arayışını sonsuza kadar aynı ilişki sayma.",
          check: "Doğru yorum iki aşamayı da açıklamada korur.",
        },
      },
      {
        prompt:
          "Bir not I. Alâeddin Keykubad’ın Moğol baskısına karşı bazı şehir surlarını güçlendirmesini ve farklı güçlerle iş birliği aramasını birlikte anlatıyor. Ortak amaç hangi alandadır?",
        options: [
          "Tarımsal üretimin hiçbir yerde kalmaması.",
          "Bütün devletlerin aynı hanedana katılması.",
          "Bütün öğretim kurumlarının aynı anda kapanması.",
          "Yalnız bir dinî metnin çoğaltılması.",
          "Savunma hazırlığı ve güvenlik.",
        ],
        answer: 4,
        hint: "İki aracın işini ayır: sur güçlendirme ve diplomatik iş birliği.",
        explanation:
          "Surlar fiziksel savunma, iş birliği arayışı siyasi-diplomatik güvenlik aracı olarak birlikte düşünülebilir.",
        guidance: {
          knowledge: [
            "Aynı amaç farklı askerî ve diplomatik araçlarla izlenebilir.",
          ],
          strategy:
            "İki tedbiri kullandıkları araç ve cevap verdikleri ihtiyaç bakımından eşleştir; ortak amaç ararken uygulamaların doğrudan değinmediği kurum ve nüfus sonuçlarını ele.",
          steps: [
            "İki aracın işini ayır: sur güçlendirme ve diplomatik iş birliği.",
            "İkisi güvenlik ihtiyacının farklı cevaplarıdır.",
            "Araçların ortak amacını koru; ilgisiz kurum veya bütün nüfus sonuçları ekleme.",
          ],
          optionReasons: [
            "Güvenlik hazırlığı böyle evrensel ekonomik sonuç vermez.",
            "İş birliği arayışı hanedan birliğiyle aynı değildir.",
            "Savunma tedbirlerinden öğretimin bütünüyle bitmesi çıkmaz.",
            "Sur ve iş birliği metin nüshası işlemi değildir.",
            "Doğru. Surlar fiziksel savunma, iş birliği arayışı siyasi-diplomatik güvenlik aracı olarak birlikte düşünülebilir.",
          ],
          commonError: "Güvenlik siyasetini yalnız tek savaş yöntemi sanma.",
          check: "Doğru amaç iki uygulamayı da açıklar.",
        },
      },
      {
        prompt:
          "Bir sınıflama ilk Anadolu beyliklerini Malazgirt sonrası, ikinci dönem beyliklerini Kösedağ sonrası merkezî gücün değişimiyle ilişkilendiriyor. Hangi kullanım uygundur?",
        options: [
          "Danişmentli ve Saltuklu gibi ilk örneklerle Karaman ve Germiyan gibi sonraki oluşumları ayrı bağlamlarda incelemek.",
          "İlk dönem beyliklerin hepsinin aynı merkez ve aynı kurucusu olduğunu söylemek.",
          "Karaman ve Germiyan adları hiçbir siyasi yapıya ait değildir demek.",
          "Bütün beyliklerin 1243’te aynı gün kurulduğunu söylemek.",
          "Saltukluları yalnız sonraki Osmanlı hanedanının bir adı saymak.",
        ],
        answer: 0,
        hint: "İki dönem adının hangi siyasi kırılmalarla ilişkilendirildiğini bul.",
        explanation:
          "İlk ve ikinci dönem adları farklı siyasi oluşum çevrelerini ayırır; bütün beyliklerin aynı gün kurulduğunu söylemez.",
        guidance: {
          knowledge: ["Dönemlendirme farklı siyasi bağlamları ayırır."],
          strategy:
            "İlk ve sonraki beylik gruplarını siyasi kırılma, örnek ad ve coğrafya başlıklarıyla sınıflandır; dönem adını bütün kuruluşları tek tarihe indirgeyen biçimde kullanma.",
          steps: [
            "İki dönem adının hangi siyasi kırılmalarla ilişkilendirildiğini bul.",
            "Verilen erken ve sonraki örnekleri ayrı gruplarda tut.",
            "Dönem ortaklığını aynı kuruluş günü veya aynı hanedan yapma.",
          ],
          optionReasons: [
            "Doğru. İlk ve ikinci dönem adları farklı siyasi oluşum çevrelerini ayırır; bütün beyliklerin aynı gün kurulduğunu söylemez.",
            "Ortak dönem tek merkez veya kurucu vermez.",
            "Bu adlar sonraki beylikler çevresinde incelenir.",
            "Sınıflama farklı kuruluş ortamlarını açıkça ayırır.",
            "Saltuklular ayrı erken Anadolu siyasi yapısıdır.",
          ],
          commonError: "Beylik adını bütün oluşumların aynı kimliği sayma.",
          check: "Doğru kullanım iki grubun ayrımını korur.",
        },
      },
      {
        prompt:
          "Bir öğretim kartı darüşşifada hastaların tedavisiyle tıp bilgisinin öğretilmesini birlikte anlatıyor. Kart hangi yorumu destekler?",
        options: [
          "Her darüşşifa yalnız askerî kale işlevi görür.",
          "Tedavi varsa hiçbir bilgi aktarımı olamaz.",
          "Sağlık kurumu hizmetle öğretimi birlikte taşıyabilir.",
          "Bu kurum mutlaka bir hanedanın ilk kuruluş tarihidir.",
          "Bütün halkın aynı anda hekim olduğu.",
        ],
        answer: 2,
        hint: "İki eylemi ayır: tedavi ve bilgi öğretimi.",
        explanation:
          "Tedavi ve tıp öğretimi iki ayrı ama ilişkili işlevdir; aynı kurum çevresinde bulunabilir.",
        guidance: {
          knowledge: [
            "Bir kurumun farklı hizmet ve öğretim işlevleri olabilir.",
          ],
          strategy:
            "Tedavi ile bilgi aktarımını iki ayrı işlev satırına yaz; aynı kurumda birlikte bulunma olanağını, bütün toplumun aynı mesleğe geçmesi iddiasından ayırarak şıkları değerlendir.",
          steps: [
            "İki eylemi ayır: tedavi ve bilgi öğretimi.",
            "Bir kurum çevresinde ilişkili iki işlevin birlikte bulunabileceğini gör.",
            "Bu işlevleri bütün halkın mesleğine veya devletin kuruluşuna dönüştürme.",
          ],
          optionReasons: [
            "Kart sağlık ve öğretim işlevini açıkça verir.",
            "İki işlev birlikte anlatılmıştır.",
            "Doğru. Tedavi ve tıp öğretimi iki ayrı ama ilişkili işlevdir; aynı kurum çevresinde bulunabilir.",
            "Sağlık yapısı siyasi kuruluş olayının yerine geçmez.",
            "Kurumun işlevi herkesin mesleği değildir.",
          ],
          commonError:
            "Kurum işlevini bütün nüfusun aynı mesleği yapması sayma.",
          check: "Doğru yanıt iki açık eylemi de korur.",
        },
      },
      {
        prompt:
          "Bir kaynak incelemesi XII. yüzyılda Anadolu için Turchia adının kullanılmasını ele alıyor. Bu adlandırma en dar biçimde hangi kanıt alanına katkı sunar?",
        options: [
          "Bugünkü Türkiye Cumhuriyeti sınırlarının aynen çizildiğine.",
          "Bütün bölgelerin aynı gün tek hükümdara bağlandığına.",
          "Kaynağı yazanın bütün olayları doğrudan gördüğüne.",
          "Bölgenin kaynakta Türk varlığıyla ilişkilendirilme biçimine.",
          "Anadolu’da başka hiçbir topluluğun bulunmadığına.",
        ],
        answer: 3,
        hint: "Adın kullanıldığı yüzyıl ve alanı belirle.",
        explanation:
          "Tarihsel ad kullanımı dış gözlem ve adlandırma için kanıttır; bütün Anadolu’nun tek yönetimde bulunduğunu tek başına göstermez.",
        guidance: {
          knowledge: ["Adlandırma belirli tarihsel algıya kanıt olabilir."],
          strategy:
            "Adlandırmanın kim tarafından hangi yüzyıl ve coğrafya için kullanıldığını bir kaynak kartına geçir; sözcükten çıkarılan hükmün gözlem kapsamını aşıp aşmadığını denetle.",
          steps: [
            "Adın kullanıldığı yüzyıl ve alanı belirle.",
            "Adlandırmayı kaynakta Türk varlığı algısıyla ilişkilendir.",
            "Modern sınır, tüm nüfus veya tek siyasi birlik gibi geniş sonuçlar ekleme.",
          ],
          optionReasons: [
            "XII. yüzyıl adlandırması modern sınır haritası değildir.",
            "Tek ad siyasi birleşmenin tarihi ve kapsamını vermez.",
            "Ad kullanımı yazarın bütün tanıklık kapsamını belirlemez.",
            "Doğru. Tarihsel ad kullanımı dış gözlem ve adlandırma için kanıttır; bütün Anadolu’nun tek yönetimde bulunduğunu tek başına göstermez.",
            "Adlandırma bütün nüfusun eksiksiz sayımı değildir.",
          ],
          commonError:
            "Coğrafi adı bütün nüfus ve egemenliğin tam sayımı sayma.",
          check:
            "Doğru seçenek yalnız kaynağın gösterdiği ad kullanımını açıklar.",
        },
      },
      {
        prompt:
          "Artuklu çevresindeki Cezerî’yi anlatan bir metin su ve mekanik parçalarla çalışan düzenekleri örnekliyor. Bu veri hangi değerlendirmeye uygundur?",
        options: [
          "Teknik üretim yalnız XX. yüzyılda mümkündür.",
          "Su kullanıldığı için hiçbir tasarım gerekmez.",
          "Elektrikle çalışan bütün çağdaş cihazlar aynen kurulmuştur.",
          "Düzenek varsa bütün halk aynı meslekte uzmandır.",
          "Dönemin mevcut araçlarıyla mekanik tasarım ve teknik üretim incelenebilir.",
        ],
        answer: 4,
        hint: "Metindeki güç ve parça türünü belirle.",
        explanation:
          "Su ve mekanik parçalar belirli teknoloji ve tasarım bilgisine kanıt sunar; bütün modern cihazların tek kişi tarafından üretildiği anlamına gelmez.",
        guidance: {
          knowledge: ["Teknik katkı kendi araç ve bağlamıyla incelenir."],
          strategy:
            "Düzeneği enerji kaynağı, parça ve tasarım işi başlıklarıyla çözümle; tarihsel teknik katkıyı modern cihazlarla özdeşleştiren veya bütünüyle yok sayan seçenekleri karşılaştır.",
          steps: [
            "Metindeki güç ve parça türünü belirle.",
            "Bunları dönemin mekanik tasarım bilgisiyle ilişkilendir.",
            "Önemli katkıyı bütün modern teknoloji veya bütün nüfusun aynı uzmanlığı yapma.",
          ],
          optionReasons: [
            "Verilen tarihsel düzenekler bu yokluk iddiasına uymaz.",
            "Mekanik parçaların düzenlenmesi tasarım ve teknik bilgiyle ilişkilidir.",
            "Metin elektrikli modern cihazlar değil su ve mekanik düzenekler verir.",
            "Belirli üretim bütün nüfusun uzmanlık dağılımı değildir.",
            "Doğru. Su ve mekanik parçalar belirli teknoloji ve tasarım bilgisine kanıt sunar; bütün modern cihazların tek kişi tarafından üretildiği anlamına gelmez.",
          ],
          commonError:
            "Tarihsel düzeneği bütün modern cihazların aynısı sayma.",
          check: "Doğru yorum su ve mekanik parça bilgisini korur.",
        },
      },
      {
        prompt:
          "Bir öğretim notu Mevlânâ, Yunus Emre ve Hacı Bektaş-ı Veli gibi isimleri dinî-sosyal öğretim ve tasavvuf çevreleriyle birlikte anıyor. Bu bağlamda öne çıkan rol hangisidir?",
        options: [
          "Üçünün de Türkiye Selçuklu Devleti’nin aynı kurucusu olması.",
          "Her düşüncenin bütün kişilerce aynı gün aynı biçimde benimsendiği.",
          "Toplumsal ve kültürel ilişkilerde dinî düşünce ve öğretim çevreleri.",
          "Üçünün de Kösedağ’da aynı ordunun komutanı olması.",
          "Bütün şehirlerin tek bina içinde birleşmesi.",
        ],
        answer: 2,
        hint: "İsimlerin notta hangi ortak bağlamda anıldığını bul.",
        explanation:
          "Metindeki bağ tasavvuf ve dinî-sosyal ilişkidir; isimleri otomatik savaş komutanı veya devlet kurucusu yapmaz.",
        guidance: {
          knowledge: [
            "Kişinin tarihsel rolü verilen eylem ve çevreyle belirlenir.",
          ],
          strategy:
            "Kişilere metinde atfedilen faaliyet ve çevreleri bir rol çizelgesine yerleştir; isimlerin öneminden hareketle verilmemiş askerî veya siyasi görevler ekleyen seçenekleri ele.",
          steps: [
            "İsimlerin metinde hangi ortak bağlamda anıldığını bul.",
            "Tasavvuf ve dinî-sosyal öğretim bu bağlamın ayırıcı alanıdır.",
            "Bu rolü verilmemiş komutanlık, kuruluş veya bütün nüfus iddiasıyla değiştirme.",
          ],
          optionReasons: [
            "Kuruluş Kutalmışoğlu Süleyman Şah bağlamındadır; bu isimlerin verilen rolü farklıdır.",
            "Bir çevrenin etkisi bütün nüfusun eşzamanlı aynı uygulaması değildir.",
            "Doğru. Metindeki bağ tasavvuf ve dinî-sosyal ilişkidir; isimleri otomatik savaş komutanı veya devlet kurucusu yapmaz.",
            "Metin böyle bir askerî görev vermez.",
            "Düşünce ve öğretim çevresi fiziki şehir birleşmesi değildir.",
          ],
          commonError:
            "Aynı yüzyıldaki bütün önemli kişileri aynı görevde sayma.",
          check: "Doğru seçenek metindeki ortak rolü karşılar.",
        },
      },
    ],
  },
];
export const forge026HistoryBLessons: Lesson[] = historyBSets026.map((s) => ({
  id: s.id,
  subjectId: "tyt-tarih",
  title: txt(s.title),
  minutes: 50,
  objectives: [
    txt(
      "Tarihsel kişi, kurum, coğrafya ve olayları kanıtlarıyla birlikte ayırmak.",
    ),
    txt(
      "Çoklu kanıtları ve alternatif açıklamaları kullanarak kapsamı doğru yorumlamak.",
    ),
  ],
  body: [],
  source: txt(
    "Kaynaklarla karşılaştırılan özgün ileri sorular. Resmî sınav sorusu değildir; ayrıntılı rehber mevcut temel dersin kimliğinde bulunur.",
  ),
  tags: ["özgün-sorular", "ileri-uygulama", "forge026"],
  questions: s.questions.map((q, i) => ({
    id: `f026-hb-${s.base}-${i + 1}`,
    prompt: txt(q.prompt),
    options: q.options.map(txt),
    answer: q.answer,
    hint: txt(q.hint),
    explanation: txt(q.explanation),
    guidance: q.guidance,
    skill: `f026-hb-${s.base}-${i + 1}`,
  })),
}));
export const forge026HistoryBTopics: Record<string, string> = {
  "ortacag-dunya-ileri": "detail-228",
  "ilk-turk-dunyasi-ileri": "detail-229",
  "islam-medeniyetinin-dogusu-ileri": "detail-230",
  "turklerin-islamiyeti-kabulu-ileri": "detail-231",
  "selcuklu-yerlesme-devletlesme-ileri": "detail-232",
};
