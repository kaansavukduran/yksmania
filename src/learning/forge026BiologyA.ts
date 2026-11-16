import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";
function finite026(
  value: unknown,
  min: number,
  max: number,
  integer = true,
): asserts value is number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < min ||
    value > max ||
    (integer && !Number.isSafeInteger(value))
  )
    throw new RangeError("BIO026_NUMBER");
}
function choice026(
  value: unknown,
  choices: readonly string[],
): asserts value is string {
  if (typeof value !== "string" || !choices.includes(value))
    throw new RangeError("BIO026_CHOICE");
}
export const cellSamples026 = {
  bacterium: {
    name: "Tipik bakteri bireyi",
    cell: true,
    nucleus: false,
    ribosome: true,
    membraneOrganelles: false,
    dna: true,
    whole: true,
    plan: "Prokaryot",
    count: "Tek hücreli",
  },
  yeast: {
    name: "Maya bireyi",
    cell: true,
    nucleus: true,
    ribosome: true,
    membraneOrganelles: true,
    dna: true,
    whole: true,
    plan: "Ökaryot",
    count: "Tek hücreli",
  },
  plant: {
    name: "Yaprağın canlı mezofil hücresi",
    cell: true,
    nucleus: true,
    ribosome: true,
    membraneOrganelles: true,
    dna: true,
    whole: false,
    plan: "Ökaryot bitkinin hücresi",
    count: "Çok hücreli bireyin bir parçası",
  },
  redCell: {
    name: "Olgun insan alyuvarı",
    cell: true,
    nucleus: false,
    ribosome: false,
    membraneOrganelles: false,
    dna: false,
    whole: false,
    plan: "Ökaryot insanın özelleşmiş hücresi",
    count: "Çok hücreli bireyin bir parçası",
  },
  virus: {
    name: "Konak dışındaki virüs parçacığı",
    cell: false,
    nucleus: false,
    ribosome: false,
    membraneOrganelles: false,
    dna: null,
    whole: false,
    plan: "Hücresel plan yok",
    count: "Hücre sayısıyla sınıflanmaz",
  },
} as const;
export function cellEvidence026(sample: string) {
  choice026(sample, Object.keys(cellSamples026));
  const r = cellSamples026[sample as keyof typeof cellSamples026];
  return {
    ...r,
    sample,
    scope:
      sample === "virus"
        ? "Virüs genomu türe göre DNA veya RNA olabilir; kendi ribozomu ve bağımsız ATP üretim sistemi yoktur. Bu görünüm canlılık tartışmasını tek işarete indirgemez."
        : sample === "redCell"
          ? "Olgun memeli alyuvarının çekirdeksizliği organizmanın prokaryot olduğu anlamına gelmez; bu hücre glikolizle ATP sağlayabilir fakat kendi ribozomuyla yeni protein sentezleyemez."
          : "Gösterilen yapı planı, hücre sayısı ve birey sınırı ayrı ölçütlerdir; çizim gerçek boyut veya bütün organellerin dökümü değildir.",
  };
}
/** Finite classroom ATP accounting. A unit is a bookkeeping unit, not a measured cellular ATP yield. */
export function atpBudget026(
  initial: number,
  production: number,
  maintenance: number,
  synthesis: number,
  steps: number,
) {
  finite026(initial, 0, 100);
  finite026(production, 0, 20);
  finite026(maintenance, 0, 20);
  finite026(synthesis, 0, 20);
  finite026(steps, 0, 10);
  let stock = initial,
    totalMaintenance = 0,
    totalSynthesis = 0,
    unmet = 0;
  const rows = [
    {
      step: 0,
      before: initial,
      produced: 0,
      maintenance: 0,
      synthesis: 0,
      unmet: 0,
      stock: initial,
    },
  ];
  for (let step = 1; step <= steps; step++) {
    const before = stock,
      available = before + production,
      usedMaintenance = Math.min(maintenance, available),
      shortfall = maintenance - usedMaintenance,
      usedSynthesis = Math.min(synthesis, available - usedMaintenance);
    stock = available - usedMaintenance - usedSynthesis;
    totalMaintenance += usedMaintenance;
    totalSynthesis += usedSynthesis;
    unmet += shortfall;
    rows.push({
      step,
      before,
      produced: production,
      maintenance: usedMaintenance,
      synthesis: usedSynthesis,
      unmet: shortfall,
      stock,
    });
  }
  return {
    rows,
    stock,
    supplied: initial + production * steps,
    totalMaintenance,
    totalSynthesis,
    unmet,
    maintenanceMet: unmet === 0,
    scope:
      "Sonlu bir öğretim hesabı: her adımda üretim eklenir, önce verilen bakım talebi, sonra sentez talebi karşılanır. ATP enerji aktarım aracıdır; uzun süreli ana depo değildir. Eksik talep, bu modelde bir hesap sonucudur; gerçek hücrenin ölüm zamanını veya büyüme kütlesini ölçmez.",
  };
}
export const experimentGroups026 = [
  { id: "A", light: 4, water: 20, salt: 0, readings: [3, 4, 5] },
  { id: "B", light: 8, water: 20, salt: 0, readings: [5, 6, 7] },
  { id: "C", light: 4, water: 40, salt: 0, readings: [6, 7, 8] },
  { id: "D", light: 8, water: 40, salt: 0, readings: [10, 11, 12] },
  { id: "E", light: 4, water: 20, salt: 1, readings: [2, 3, 4] },
  { id: "F", light: 8, water: 20, salt: 1, readings: [4, 5, 6] },
  { id: "G", light: 4, water: 40, salt: 1, readings: [5, 6, 7] },
  { id: "H", light: 8, water: 40, salt: 1, readings: [9, 10, 11] },
] as const;
export function controlledPair026(
  first: number,
  second: number,
  factor: string,
) {
  finite026(first, 0, 7);
  finite026(second, 0, 7);
  choice026(factor, ["light", "water", "salt"]);
  const a = experimentGroups026[first],
    b = experimentGroups026[second],
    changed = (["light", "water", "salt"] as const).filter(
      (k) => a[k] !== b[k],
    );
  const mean = (xs: readonly number[]) =>
      xs.reduce((s, x) => s + x, 0) / xs.length,
    meanA = mean(a.readings),
    meanB = mean(b.readings);
  return {
    a,
    b,
    changed,
    meanA,
    meanB,
    difference: meanB - meanA,
    valid: changed.length === 1 && changed[0] === factor,
    factor,
    scope:
      "Sayılar özgün varsayımsal verilerdir: aynı tür, başlangıç boyu ve süre; her grupta üç ayrı bağımsız kap, her kapta bir bitki. Ölçüm son boy değil aynı sürede boy artışıdır (cm). Uygun çift yalnız seçilen faktörde farklıdır; bu, bütün türler veya her faktör düzeyi için bir yasa değildir.",
  };
}
export function measurement026(
  actual: number,
  gainPercent: number,
  bias: number,
  repeats: number,
) {
  finite026(actual, 10, 100);
  finite026(gainPercent, 50, 150);
  finite026(bias, -10, 10);
  finite026(repeats, 1, 9);
  const offsets = [0, -2, 2, -1, 1, -0.5, 0.5, -0.25, 0.25],
    readings = offsets
      .slice(0, repeats)
      .map((x) => (actual * gainPercent) / 100 + bias + x),
    mean = readings.reduce((s, x) => s + x, 0) / repeats;
  return {
    actual,
    gainPercent,
    bias,
    readings,
    mean,
    error: mean - actual,
    scope:
      "Bilinen referans uzunluğu (mm) üzerinde öğretim modeli. Okuma=gerçek×ölçek çarpanı+sabit kayma+verilen küçük sapma. Sapmalar gerçek rastgele örneklem değildir. Tekrar ortalamayı değiştirebilir; ölçek ve sıfır hatasını kendiliğinden düzeltmez.",
  };
}
export const mineralNeeds026 = [
  { id: "N", name: "Azot", need: 6 },
  { id: "P", name: "Fosfor", need: 2 },
  { id: "Mg", name: "Magnezyum", need: 3 },
] as const;
export function mineralCapacity026(n: number, p: number, mg: number) {
  for (const x of [n, p, mg]) finite026(x, 0, 120);
  const stocks = [n, p, mg],
    rows = mineralNeeds026.map((x, i) => ({
      ...x,
      stock: stocks[i],
      capacity: stocks[i] / x.need,
    }));
  let smallest = 0;
  for (let i = 1; i < rows.length; i++)
    if (
      rows[i].stock * rows[smallest].need <
      rows[smallest].stock * rows[i].need
    )
      smallest = i;
  const units = Math.floor(rows[smallest].stock / rows[smallest].need),
    limiting = rows
      .filter(
        (x) => x.stock * rows[smallest].need === rows[smallest].stock * x.need,
      )
      .map((x) => x.id),
    balances = rows.map((x) => ({
      ...x,
      used: units * x.need,
      remaining: x.stock - units * x.need,
    }));
  return {
    rows: balances,
    units,
    limiting,
    predicted: limiting.length === 1 ? limiting[0] : "tie",
    scope:
      "Bir tam büyüme birimi için N=6, P=2, Mg=3 mg kullanılabilen element varsayılır; başka etkenler yeterli, kayıp ve başlangıç deposu yoktur. Sayılar gerçek bitkinin evrensel mineral gereksinimi değildir. En küçük gereksinim kapasitesi sınırlar; ham mg miktarı veya bir mineralin fazlalığı diğerinin özel işlevini devralmaz.",
  };
}
export function thermalWater026(
  mode: string,
  mass: number,
  energy: number,
  stage: number,
) {
  choice026(mode, ["warming", "evaporating"]);
  finite026(mass, 10, 200);
  finite026(energy, 0, mode === "warming" ? 1200 : 12000);
  finite026(stage, 0, 4);
  const applied = (energy * stage) / 4,
    deltaT = mode === "warming" ? applied / (mass * 4) : 0,
    evaporated = mode === "evaporating" ? applied / 2400 : 0;
  return {
    mode,
    mass,
    energy,
    stage,
    applied,
    deltaT,
    temperature: 20 + deltaT,
    evaporated,
    remaining: mass - evaporated,
    losesLiquid: evaporated > 0,
    scope:
      mode === "warming"
        ? "Başlangıç20°C; faz değişimi ve ısı kaybı yok, yuvarlatılmış c=4 J/(g·°C). Q=m·c·ΔT. Seçilen sınırlar bu varsayımda suyu20–50°C aralığında tutar."
        : "Sabit sıcaklıkta sıvıdan buhara geçişe ayrılan enerji, temsili L=2400 J/g ile Q=m_buhar·L. Buharlaşan kütle seçili sıvıdan küçüktür. Moleküller H₂O olarak kalır; enerji vücudun bütün ısı kaybı veya gerçek ter miktarı ölçümü değildir.",
  };
}
export function ionMixture026(
  acid: number,
  acidVolume: number,
  base: number,
  baseVolume: number,
) {
  for (const x of [acid, base]) finite026(x, 0, 100);
  for (const x of [acidVolume, baseVolume]) finite026(x, 0, 100);
  if (acidVolume + baseVolume === 0) throw new RangeError("BIO026_VOLUME");
  const hydrogen = acid * acidVolume,
    hydroxide = base * baseVolume,
    paired = Math.min(hydrogen, hydroxide),
    excess = hydrogen - hydroxide,
    volume = acidVolume + baseVolume,
    c = excess / volume / 1000,
    kw = 1e-14,
    discriminant = Math.sqrt(c * c + 4 * kw),
    h = c >= 0 ? (c + discriminant) / 2 : (2 * kw) / (discriminant - c),
    oh = kw / h;
  return {
    hydrogen,
    hydroxide,
    paired,
    excess,
    volume,
    h,
    oh,
    pH: -Math.log10(h),
    category: excess > 0 ? "acid" : excess < 0 ? "base" : "neutral",
    scope:
      "25°C ideal sulu ortam: HCl ve NaOH tamamen iyonlaşır, hacimler toplanır; derişimler mmol/L (mM), hacimler mL, eşleşen miktarlar µmol. H⁺ ile OH⁻ 1:1 eşleşir; Na⁺ ve Cl⁻ çözeltide kalır. Son pH için suyun kendi iyonlaşması da hesaba katılır. Bu kap modeli kan veya mide pH düzenlemesi değildir.",
  };
}
export function pHRelation026(
  pHA: number,
  pHB: number,
  volumeA: number,
  volumeB: number,
) {
  finite026(pHA, 0, 14, false);
  finite026(pHB, 0, 14, false);
  finite026(volumeA, 1, 1000);
  finite026(volumeB, 1, 1000);
  const concentrationA = 10 ** -pHA,
    concentrationB = 10 ** -pHB;
  return {
    concentrationA,
    concentrationB,
    concentrationRatio: 10 ** (pHB - pHA),
    amountA: (concentrationA * volumeA) / 1000,
    amountB: (concentrationB * volumeB) / 1000,
    amountRatio: (10 ** (pHB - pHA) * volumeA) / volumeB,
  };
}

export const biologyALegacyIds026 = [
  "canli-ozellikleri",
  "bilimsel-yontem",
  "mineraller",
  "su-asit-baz-tuz",
] as const;
export const biologyADefaults026 = {
  livingView: "budget",
  sample: "bacterium",
  initial: 20,
  production: 8,
  maintenance: 6,
  synthesis: 4,
  steps: 3,
  methodView: "pair",
  first: 0,
  second: 1,
  factor: "light",
  actual: 50,
  gainPercent: 100,
  bias: 0,
  repeats: 3,
  nStock: 36,
  pStock: 12,
  mgStock: 15,
  waterView: "thermal",
  thermalMode: "warming",
  mass: 100,
  energy: 800,
  stage: 4,
  acid: 10,
  acidVolume: 20,
  base: 10,
  baseVolume: 10,
  pHA: 4,
  pHB: 5,
  volumeA: 10,
  volumeB: 100,
  guess: "",
  reason: "",
  checked: false,
  show: false,
};
export function biologyAId026(id: string) {
  const key = id.replace(/-ileri$/, "");
  if (!(biologyALegacyIds026 as readonly string[]).includes(key))
    throw new RangeError("BIO026_LESSON");
  return key;
}
export function normalizeBiologyA026(id: string, input: unknown) {
  const lesson = biologyAId026(id),
    validObject =
      input !== null && typeof input === "object" && !Array.isArray(input),
    raw = validObject ? (input as Record<string, unknown>) : {},
    d = biologyADefaults026;
  const read = (k: keyof typeof d) =>
    Object.hasOwn(raw, k) ? raw[k] : undefined;
  const menu = (k: keyof typeof d, options: readonly string[]) =>
    typeof read(k) === "string" && options.includes(read(k) as string)
      ? (read(k) as string)
      : (d[k] as string);
  const num = (k: keyof typeof d, min: number, max: number, whole = true) =>
    typeof read(k) === "number" && Number.isFinite(read(k))
      ? Math.max(
          min,
          Math.min(
            max,
            whole ? Math.round(read(k) as number) : (read(k) as number),
          ),
        )
      : (d[k] as number);
  const thermalMode = menu("thermalMode", ["warming", "evaporating"]);
  const values = {
    livingView: menu("livingView", ["budget", "cell"]),
    sample: menu("sample", Object.keys(cellSamples026)),
    initial: num("initial", 0, 100),
    production: num("production", 0, 20),
    maintenance: num("maintenance", 0, 20),
    synthesis: num("synthesis", 0, 20),
    steps: num("steps", 0, 10),
    methodView: menu("methodView", ["pair", "measurement"]),
    first: num("first", 0, 7),
    second: num("second", 0, 7),
    factor: menu("factor", ["light", "water", "salt"]),
    actual: num("actual", 10, 100),
    gainPercent: num("gainPercent", 50, 150),
    bias: num("bias", -10, 10),
    repeats: num("repeats", 1, 9),
    nStock: num("nStock", 0, 120),
    pStock: num("pStock", 0, 120),
    mgStock: num("mgStock", 0, 120),
    waterView: menu("waterView", ["thermal", "mixture", "relation"]),
    thermalMode,
    mass: num("mass", 10, 200),
    energy: num("energy", 0, thermalMode === "warming" ? 1200 : 12000),
    stage: num("stage", 0, 4),
    acid: num("acid", 0, 100),
    acidVolume: num("acidVolume", 0, 100),
    base: num("base", 0, 100),
    baseVolume: num("baseVolume", 0, 100),
    pHA: num("pHA", 0, 14, false),
    pHB: num("pHB", 0, 14, false),
    volumeA: num("volumeA", 1, 1000),
    volumeB: num("volumeB", 1, 1000),
    guess:
      typeof read("guess") === "string"
        ? (read("guess") as string).slice(0, 128)
        : "",
    reason:
      typeof read("reason") === "string"
        ? (read("reason") as string).slice(0, 120)
        : "",
    checked: read("checked") === true,
    show: read("show") === true,
  };
  if (values.acidVolume + values.baseVolume === 0) values.baseVolume = 1;
  const active =
    lesson === "canli-ozellikleri"
      ? values.livingView === "budget"
        ? [
            "livingView",
            "initial",
            "production",
            "maintenance",
            "synthesis",
            "steps",
          ]
        : ["livingView", "sample"]
      : lesson === "bilimsel-yontem"
        ? values.methodView === "pair"
          ? ["methodView", "first", "second", "factor"]
          : ["methodView", "actual", "gainPercent", "bias", "repeats"]
        : lesson === "mineraller"
          ? ["nStock", "pStock", "mgStock"]
          : values.waterView === "thermal"
            ? ["waterView", "thermalMode", "mass", "energy", "stage"]
            : values.waterView === "mixture"
              ? ["waterView", "acid", "acidVolume", "base", "baseVolume"]
              : ["waterView", "pHA", "pHB", "volumeA", "volumeB"];
  const validSelection =
    (input === undefined || validObject) &&
    [...active, "guess", "reason", "checked"].every(
      (k) =>
        !Object.hasOwn(raw, k) || raw[k] === values[k as keyof typeof values],
    );
  return {
    values: { ...values, checked: values.checked && validSelection },
    validSelection,
    active,
  };
}
type Item026A = {
  prompt: string;
  correct: string;
  wrong: [string, string][];
  knowledge: string[];
  strategy: string;
  steps: string[];
  reason: string;
  commonError: string;
  check: string;
};
type Pack026A = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  source: string;
  sections: LessonGuide["sections"];
  examples: LessonGuide["examples"];
  recall: LessonGuide["recall"];
  items: Item026A[];
};

// AUTHORED_CONTENT_026_BIOLOGY_A
const packs026A: Pack026A[] = [
  {
    id: "canli-ozellikleri",
    topic: "detail-1",
    title:
      "Canlıların ortak özellikleri: ilişkiler ve kanıtlarla ileri uygulama",
    minutes: 65,
    objectives: [
      "Hücresel yapı, besin edinme ve ATP aktarımını aynı organizmanın farklı işleri olarak açıkla.",
      "Birey, hücre, organ ve nesil ölçeğini seçerek ortak özellik iddialarını sınırla.",
      "Madde ve enerji bilançosunu kullanarak ölçülen net sonuçtan çıkabilen yorumu kur.",
      "İç düzenleme, uyarıya yanıt ve kalıtsal uyum için gereken kanıtları karşılaştır.",
    ],
    source:
      "MEBİ TYT Biyoloji Konu Özetleri, PDF s. 11–17; OGM Dersler Cepte, Biyoloji ve Canlıların Ortak Özellikleri, s. 10–17; Aurelia Canlıların Karakteristik Özellikleri kopya kâğıdı, s. 1–18. Rehber, deney modelleri, çözümlü örnekler ve ileri sorular özgündür; resmî sınav sorusu değildir.",
    sections: [
      {
        title: "Canlılık bir özellikler bütünüdür",
        paragraphs: [
          "Canlı bir bireye organizma denir. Hücre, canlılık işlerinin örgütlü biçimde yürüdüğü temel birimdir: bir zar iç ortamı sınırlar, enzimler kimyasal dönüşümleri yönetir, kalıtsal bilgi yeni yapıların oluşmasına katılır. Bakteri tek hücreyle bu bütünlüğü kurarken bir ağaçta çok sayıda hücre iş bölümü yapar.",
          "Hareket eden bir makine veya büyüyen kristal, tek başına hücresel canlılık örneği olmaz. Kanıtları bir araya getir: yapı, metabolizma, madde ve enerji alışverişi, düzenleme ve kalıtsal süreklilik. Kısa gözlemde bir süreci görememek, o sürecin yaşam döngüsünde hiç bulunmadığını göstermez.",
        ],
      },
      {
        title: "İki farklı sınıflama ekseni",
        paragraphs: [
          "Hücre sayısı ile hücre planı iki ayrı soruya cevap verir. Bakteri ve arke bireyleri prokaryottur; zarla çevrili çekirdekleri yoktur fakat DNA ve ribozom taşırlar. Maya ve amip tek hücreli ökaryottur; çekirdekli olmak çok hücreli olmayı gerektirmez.",
          "Ökaryot organizmanın her olgun hücresinde mutlaka çekirdek arama. Olgun insan alyuvarı çekirdeğini ve ribozomlarını kaybetmiş özelleşmiş bir hücredir; insanın ökaryot hücre planını değiştirmez. Bir kesitte gördüğün hücreyi, o hücrenin ait olduğu bireyin tamamı gibi sınıflama.",
        ],
      },
      {
        title: "Besin üretmek ve ATP üretmek farklı işlerdir",
        paragraphs: [
          "Beslenme, yapımda ve enerji aktarımında kullanılacak maddelerin edinilmesidir. Ototrof, inorganik karbonu organik maddeye bağlar; heterotrof organik maddeyi hazır alır. ATP ise hücre içindeki sentez ve taşıma gibi işlere enerji aktaran, sürekli yenilenen moleküldür.",
          "Yeşil bitkinin organik besin üretmesi, solunum yapmadığı anlamına gelmez. Bitki de kendi organik maddelerini yıkarak ATP sağlayabilir. Bütün canlıların oksijen kullanması gerekmez: oksijenli solunum, oksijensiz solunum ve fermantasyonun koşulları ayrıdır. Besin kaynağıyla ATP yolunu ayrı sütunlarda düşün.",
        ],
      },
      {
        title: "Denge, hiç değişmemek değildir",
        paragraphs: [
          "Homeostazi, değişen koşullarda iç ortamın uygun sınırlar içinde düzenlenmesidir. Hücreye fazla su girdiğinde tatlı su protistinin kontraktil kofulu bu suyu dışarı atabilir. Giriş sürerken çıkışın artması, dinamik düzenlemeyi gösterir; bütün madde geçişlerinin durması gerekmez.",
          "Metabolik atıkların uzaklaştırılması boşaltımdır; emilmemiş besin artıklarının atılması aynı kapsamda değildir. Uyarıya yanıt ve hareket de bu düzen içinde yer alabilir. Bitki yaprağının durum değiştirmesi bir harekettir; hareket için bireyin bütün olarak başka yere gitmesi şart değildir.",
        ],
      },
      {
        title: "Birey ve nesil ölçeğini seç",
        paragraphs: [
          "Büyüme kütle, hacim veya çok hücrelilerde hücre sayısı artışıyla; gelişme yapı ve işlevin olgunlaşmasıyla ilişkilidir. Tek hücreli bireyin iki yeni birey oluşturması üremedir. Aynı hücre bölünmesi, çok hücreli canlının bir dokusunu büyütürken yeni bir organizma oluşturmayabilir.",
          "Üreme soyun devamını sağlar; her bireyin yaşaması için mutlaka yavru vermesi gerekmez. Adaptasyon ise belirli çevrede yaşama ve üreme başarısına katkı veren kalıtsal özelliklerle ilgilidir. Bir bireyin kısa sürede verdiği fizyolojik yanıtı, nesiller boyunca kalıtsal uyumla aynı olay sayma.",
        ],
      },
      {
        title: "Hücre içindeki düzen nasıl kurulur?",
        paragraphs: [
          "Hücre zarı seçici bir sınır, sitoplazma birçok tepkimenin gerçekleştiği ortamdır. Ribozom protein yapımında görevli zarsız bir yapıdır. Çekirdek ve mitokondri gibi zarlı yapılarla aynı sınıfta değildir; prokaryot hücrede ribozom bulunması bu ayrımı görünür kılar.",
          "DNA bilgisinin kullanımıyla proteinlerin üretilmesi, enzimlerin maddeleri dönüştürmesi ve zarın iç ortamı koruması birbirine bağlıdır. Canlılık özellikleri bağımsız bir sözcük listesi değil, aynı hücre içinde birbirini destekleyen süreçlerdir. Birinin ölçümü diğerlerinin bütün ayrıntılarını tek başına vermez.",
        ],
      },
      {
        title: "Tek hücreli de örgütlüdür",
        paragraphs: [
          "Tek hücreli bir birey besin edinme, ATP aktarma, atık uzaklaştırma ve çevresel yanıt işlerini aynı hücre içinde yürütür. Doku veya böbrek taşımaması, bu işlevleri gerçekleştirmediği anlamına gelmez. Bir işlevin ortaklığı, aynı organın bütün canlılarda ortak olmasını gerektirmez.",
          "Çok hücreli organizmada özelleşme farklı hücrelerin katkısını birleştirir. Sinir hücresi, sinir dokusu, beyin ve sinir sistemi bir organizasyon örneğidir. Bu tam diziyi her çok hücreliye uygulama; organizasyon ortak olsa da doku, organ ve sistem düzeyleri bütün gruplarda aynı biçimde bulunmaz.",
        ],
      },
      {
        title: "Karbon kaynağı ile enerji kaynağını ayır",
        paragraphs: [
          "Fotoototrof canlı, organik madde üretirken enerjiyi ışıktan alır. Kemoototrof canlı, belirli inorganik maddelerin oksidasyonundan sağlanan kimyasal enerjiyi kullanır. İkisinde karbon kaynağı inorganik olabilir; ışıkta yaşamak veya karanlıkta yaşamak tek başına beslenme sınıfını belirlemez.",
          "Heterotrof bir mantar hazır organik maddeleri kullanır. Aynı hücre içinde bu maddelerin bir bölümü yeni yapıların hammaddesi, bir bölümü ATP aktarımının kaynağı olabilir. Kullanılan maddenin karbonunu, o maddenin kimyasal enerjisini ve hücrenin ürettiği ATP molekülünü aynı nicelik gibi sayma.",
        ],
      },
      {
        title: "ATP için giriş ve harcamayı birlikte izle",
        paragraphs: [
          "ATP, organik rezervler gibi uzun süreli ana enerji deposu olarak düşünülmez. Hücresel işlerde harcanır ve uygun tepkimelerle yeniden üretilir. Aktif taşıma ve birçok sentez ATP gerektirebilir; bu gereksinim, suyun osmozla her geçişinde doğrudan ATP harcandığı anlamına gelmez.",
          "Bir muhasebe modelinde son stok=ilk stok+üretim−kullanım yazılabilir. Kullanım verilmeden yalnız üretimden son stok bulunamaz. ATP harcamasıyla yeni doku kütlesi de doğrudan eşit değildir: madde girdisi, sentez yolu ve dönüşüm verimi ayrıca gerekir. Modelin birimini gerçek hücresel hız sanma.",
        ],
      },
      {
        title: "Solunum, fermantasyon ve nefes",
        paragraphs: [
          "Nefes alıp verme, gazların organizmayla çevre arasında taşınmasına hizmet eder. Hücresel solunum ise ATP elde edilmesine katılan kimyasal tepkimelerdir. Akciğer taşımayan bir canlıda da hücresel solunum olabilir; bir gaz hareketi bütün enerji yolunun yerine geçmez.",
          "Oksijensiz solunumda elektron taşıma sistemi bulunur ve son elektron alıcısı oksijen dışı olabilir. Fermantasyonda bu sistem kullanılmaz; kısmi organik yıkımla bağlantılı süreçte ATP kazanılır. Yalnız oksijen yokluğundan ikisini eşitleme; soru yolun ayırt edici koşulunu vermelidir.",
        ],
      },
      {
        title: "Yapım ve yıkım aynı anda sürebilir",
        paragraphs: [
          "Anabolizma, küçük yapı taşlarından daha büyük moleküllerin yapıldığı tepkimeleri kapsar. Amino asitlerden protein veya glikoz birimlerinden depo polisakkariti oluşması örnektir. Katabolizma ise moleküllerin daha küçük ürünlere yıkılmasıyla ilişkilidir; sindirim ve solunumdaki besin yıkımı bu başlığa girer.",
          "Bir hücre aynı dönemde eski proteinleri yıkıp yenilerini yapabilir. Toplam kütlenin sabit kalması bu iki sürecin durduğunu göstermez. Ayrıca her yıkım doğrudan ATP üretmez: besinin sindirimle küçük parçalara ayrılmasıyla o parçaların enerji aktarım yollarında kullanılması farklı aşamalardır.",
        ],
      },
      {
        title: "Net gaz değişimi iki sürecin farkıdır",
        paragraphs: [
          "Kapalı bir modelde CO₂ miktarındaki değişim, hücrelerin CO₂ üretimiyle tüketiminin net sonucudur. Karanlıkta yalnız solunumun etkili olduğu ayrıca verilirse net artış üretimi gösterebilir. Işıkta hem üretim hem tüketim varsa aynı net değer farklı iki hızla açıklanabilir.",
          "Örneğin üretim ve tüketim birbirine eşitse net CO₂ değişimi sıfır olur; ikisinin de sıfır olması gerekmez. Gaz kaçağı, farklı canlı miktarı veya ölçüm süresi de yorumun koşuludur. Yalnız net sinyalden ölçülmemiş ayrı süreç hızlarını kesin sayılarla doldurma.",
        ],
      },
      {
        title: "Atık, fazla ve sindirilmemiş artık",
        paragraphs: [
          "Hücrede solunumla oluşan CO₂ veya protein metabolizmasıyla bağlantılı azotlu atıklar uzaklaştırılmalıdır. Bitkilerde, tek hücrelilerde ve hayvanlarda kullanılan yapılar farklıdır. Böbreğin bulunmaması boşaltımın yokluğu değildir; hücre zarı da bazı maddelerin çıkışına yol sağlayabilir.",
          "Sindirilmemiş bir besin parçasının sindirim kanalından atılması, o parçanın hücre metabolizmasının ürünü olduğunu göstermez. Su ve iyon fazlasının uzaklaştırılması ise iç dengeye katkı verir. Olayı sınıflarken maddenin nerede oluştuğunu, hangi sınırdan çıktığını ve sorulan işlevi birlikte izle.",
        ],
      },
      {
        title: "Düzenleyici yanıtın yönünü bul",
        paragraphs: [
          "Negatif geri bildirimde bir değişimin etkisini azaltan yanıt oluşur. İç sıcaklık yükselirken ısı kaybının artması buna örnektir. Bu, başlangıç değerine tek anda ve kusursuz dönmek demek değildir; algılama, yanıt ve etki arasında gecikme olabilir.",
          "Düzenlenen değişkeni belirle: sıcaklık, su miktarı veya pH gibi. Ardından ilk sapmanın yönünü ve yanıtın bu sapmayı nasıl etkilediğini yaz. Aynı yöndeki iki ok her zaman geri bildirim değildir; hangi değerin ölçüldüğü ve hangisinin yanıt olduğu belirtilmelidir.",
        ],
      },
      {
        title: "Hareket ile yer değiştirme aynı kapsamda değildir",
        paragraphs: [
          "Bir bitkinin büyüme yönünü değiştirmesi, yaprağın açılıp kapanması veya hücre içindeki maddelerin taşınması farklı hareket örnekleridir. Bütün hareketler canlı bireyin yer değiştirmesini gerektirmez. Öte yandan rüzgârın sürüklediği bir tohumun yer değiştirmesi, tek başına aktif bir biyolojik yanıtı kanıtlamaz.",
          "Işık veya temas gibi bir uyaran, hücresel mekanizmalarla yanıt oluşturabilir. Yanıt için bilinçli seçim şart değildir. Deneyde uyaran kaldırıldığında, yönü değiştiğinde veya algı yolu engellendiğinde ne olduğu karşılaştırılarak mekanizma hakkında daha güçlü kanıt edinilir.",
        ],
      },
      {
        title: "Büyümeyi hangi birimde ölçüyorsun?",
        paragraphs: [
          "Tek hücreli bir canlının hacmi artabilir; daha sonra bölünmesi birey sayısını artırabilir. Çok hücreli bir organizmada hücre sayısı ve hücre büyüklüğü birlikte değişebilir. Toplam organizma kütlesi, hücre başına ortalama kütle ve birey sayısı aynı ölçüm değildir.",
          "Islak kütle artışı su girişini de içerebilir; bu yüzden yalnız hacim veya ıslak kütle verisinden belirli miktarda yeni protein sentezi hesaplanamaz. Soruda kuru kütle, hücre sayısı veya madde bileşimi verilmişse o niceliği kullan. Ölçülen büyüklüğün adını sonuç boyunca koru.",
        ],
      },
      {
        title: "Gelişme işlevsel olgunlaşmadır",
        paragraphs: [
          "Bir yapının yeni bir işlev kazanması veya özelleşmesi gelişmeyle ilişkilidir. Bir fidenin ilk gerçek yaprağını açmasıyla yalnız daha fazla su alıp şişmesi aynı tür kanıt değildir. Büyüme ve gelişme birlikte olabilir; biri gözlendi diye diğerinin bütün aşamaları tamamlanmış sayılmaz.",
          "Çok hücreli canlıda hücreler aynı kalıtsal bilgi takımını taşırken genlerin kullanım biçimleriyle farklı görevler üstlenebilir. Çekirdekli bir öncü hücrenin olgun alyuvara dönüşmesi gibi örneklerde işlevsel özelleşme, her hücrede aynı yapıların korunacağı varsayımını sınırlar.",
        ],
      },
      {
        title: "Üremede yeni bireyin sınırını çiz",
        paragraphs: [
          "Eşeysiz üremede gametlerin birleşmesi zorunlu değildir; bir hücreli canlının bölünmesi veya uygun bitki parçasından yeni bireyin oluşması örnek olabilir. Eşeyli üremede gamet birleşmesi ve iki kaynaktan gelen kalıtsal katkı yeni birleşimler oluşturur.",
          "Çok hücreli canlının yara çevresindeki hücrelerinin çoğalması, kendiliğinden yeni bir birey oluştuğunu göstermez. Eşeysiz yavruların genellikle benzer olması da hiçbir mutasyon olamayacağı anlamına gelmez. Üreme türünü sınıflarken hücre bölünmesini, birey oluşumunu ve kalıtsal değişim olasılığını ayrı tut.",
        ],
      },
      {
        title: "Anlık yanıt ile kalıtsal uyumu ayır",
        paragraphs: [
          "Kurak ortamda su kaybını azaltan kalıtsal bir yapının yaşama ve üreme başarısına katkısı adaptasyon bağlamındadır. Bir bireyin su kaybına kısa sürede verdiği stomayı kapatma yanıtı ise düzenleme sürecidir. Aynı çevre etkenine ilişkin olmaları bu iki ölçeği birleştirmez.",
          "Kalıtsallık, nesiller ve çevreye bağlı başarı bilgisi aranır. Bir özellik bir ortamda yarar sağlarken başka ortamda aynı avantajı sağlamayabilir. Bireyin yaşamı boyunca kazandığı her yararlı değişimin yavrulara otomatik aktarılacağı sonucu, yalnız yararlılık gözleminden çıkarılamaz.",
        ],
      },
      {
        title: "Virüs ve eksik gözlemi doğru sınırla",
        paragraphs: [
          "Virüsler hücresel yapı taşımaz; genomları türe göre DNA veya RNA olabilir. Kendi ribozomları ve bağımsız ATP üretim sistemleri yoktur; çoğalma konak hücrenin sistemlerine bağlıdır. Genetik bilgi taşımaları, onları prokaryot bir hücre gibi sınıflamaya yetmez.",
          "Bir kayıtta kısa süre boyunca hareket, büyüme veya çoğalma görülmemesi tek başına cansızlık kararı verdirmez. Uygun koşul, gözlem süresi ve araştırılan birim açıklanmalıdır. Sonuç kurarken “gözlenmedi”, “bu koşulda olmadı” ve “hiçbir koşulda olamaz” ifadelerinin farklı iddialar olduğunu koru.",
        ],
      },
    ],
    examples: [
      {
        title: "Bakım harcamasını tersine bul",
        prompt:
          "Varsayımsal hücre hesabında başlangıçta 18 ATP birimi var. Dört adım boyunca her adımda 9 birim üretiliyor; toplam 14 birim sentezde harcanıyor ve sonunda 8 birim kalıyor. Bakımda toplam kaç birim kullanılmıştır? Bütün ATP giriş ve çıkışları verilmiştir.",
        strategy:
          "Önce toplam kaynağı yaz; bilinmeyen harcamayı stok eşitliğinde yalnız bırak.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Toplam kaynak 18+4×9=54 ATP birimidir.",
          },
          {
            label: "Adım 2",
            explanation:
              "Son stok ve sentez için ayrılan miktar 8+14=22 birimdir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Bakım harcaması 54−22=32 birimdir; aynı bilanço son stok için yeniden kurulabilir.",
          },
        ],
        answer: "Toplam bakım harcaması 32 ATP birimi",
        check:
          "18+36−32−14=8; hesapta ATP birimi korunur, doku kütlesi sonucu çıkarılmaz.",
        pitfall:
          "Üretilen 36 birimi bütün kullanılabilir ATP sanıp başlangıç stokunu dışarıda bırakmak.",
      },
      {
        title: "Net sinyal aynı, mekanizma farklı",
        prompt:
          "Işıkta iki eş örnek için aynı sürede net CO₂ değişimi sıfır ölçülüyor. Bir modelde üretim ve tüketim 11’er birim, diğerinde 0’ar birim olabilir. Bu iki açıklamayı ayırabilecek ek ölçümün niteliğini belirt; bu görevde ayrı hızlar verilmemiştir.",
        strategy:
          "Aynı net sonuca götüren iki açıklamanın farklı öngördüğü bağımsız bir ölçüm ara.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "İki model de üretim−tüketim=0 eşitliğini sağlar; net ölçüm tek başına seçtirmez.",
          },
          {
            label: "Adım 2",
            explanation:
              "Ayrı süreçlerden birini doğrudan ölçen veya seçici biçimde ayıran, etkisi denetlenmiş bir düzenek gerekir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Ayrı CO₂ üretim ölçümü 11 ile 0 öngörüsünü karşılaştırabilir; yalnız aynı net ölçümü tekrarlamak bu iki ideal modeli ayırmaz.",
          },
        ],
        answer:
          "Bir bileşen süreci bağımsız ölçmek veya uygun kontrollü seçici düzenek kurmak gerekir.",
        check:
          "Ek yöntem, öteki sürecin de değiştiği bir müdahaleyi kontrolsüz biçimde kullanmamalıdır.",
        pitfall:
          "Net sıfır gördüğü için iki sürecin de yok olduğunu varsaymak.",
      },
      {
        title: "İş bölümü zincirindeki yanlış genellemeyi onar",
        prompt:
          "Bir öğrenci “Kalp farklı dokulardan oluşur; öyleyse bütün canlılarda organ bulunur” diyor. Kalp bilgisini koruyarak çıkarımdaki ilk geçersiz adımı ve kapsamı doğru bir karşı örneği yaz.",
        strategy: "Olumlu örnekle evrensel iddianın kapsamını ayır.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Kalbin farklı dokuların birlikte çalışmasıyla bir organ olması geçerli başlangıç bilgisidir.",
          },
          {
            label: "Adım 2",
            explanation:
              "Tek bir çok hücreli hayvan yapısından bütün organizmalara geçiş desteklenmez.",
          },
          {
            label: "Adım 3",
            explanation:
              "Tek hücreli bir bakteri bireyi organ taşımaz; buna rağmen hücre içinde beslenme ve boşaltım gibi işleri örgütlü biçimde yürütür.",
          },
        ],
        answer:
          "Yanlış adım tek örnekten bütün canlılara genellemedir; bakteri organ zorunluluğunu çürütür.",
        check:
          "Karşı örnek gerçekten “bütün canlılar” kapsamındadır; hücresiz virüs tartışmasına ihtiyaç yoktur.",
        pitfall:
          "Kalbin organ olduğunu da reddederek geçerli gözlemi yanlış çıkarımla birlikte silmek.",
      },
      {
        title: "Hücre başına kütle ile toplam kütle",
        prompt:
          "Tek hücreli bir kültürde başlangıçta 40 birey ve toplam 120 kuru kütle birimi, sonra 60 birey ve toplam 150 birim ölçülüyor. Ortalama birey kütlesi ve toplam kütle aynı yönde mi değişmiştir? Bütün bireyler sayılmıştır.",
        strategy:
          "Toplamı doğrudan karşılaştır; ortalamayı her zamanda kendi birey sayısına böl.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Başlangıç ortalaması 120/40=3, son ortalama 150/60=2,5 kuru kütle birimidir.",
          },
          {
            label: "Adım 2",
            explanation:
              "Toplam kütle 30 birim artarken birey başına ortalama 0,5 birim azalmıştır.",
          },
          {
            label: "Adım 3",
            explanation:
              "Birey sayısındaki artış ile ortalama büyüklük farklı niceliklerdir; yalnız toplamdan her bireyin büyüdüğü sonucu çıkmaz.",
          },
        ],
        answer: "Toplam artmış, birey başına ortalama azalmıştır.",
        check: "40×3=120 ve 60×2,5=150; iki zamanın paydaları karıştırılmaz.",
        pitfall:
          "Her iki toplamı da son birey sayısına bölmek veya toplam artışını her bireyin büyümesi saymak.",
      },
      {
        title: "Hücreden bireye doğru ölçeği seç",
        prompt:
          "Bir insan hücresinde çekirdek ve ribozom görülmüyor; öncü çekirdekli hücreden olgun alyuvara dönüştüğü ayrıca izlenmiş. Bu gözlemler hücrenin durumuyla organizmanın hücre planı hakkında nasıl birlikte okunur?",
        strategy:
          "Hücrenin gelişim geçmişini koru; organel yokluğunu bütün organizmaya taşıma.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "İzlenen öncü hücre ve insan kökeni, özelleşmiş bir ökaryot hücre bağlamını verir.",
          },
          {
            label: "Adım 2",
            explanation:
              "Olgun alyuvarın çekirdek ve ribozomunu kaybetmesi hücre düzeyinde bir farklılaşmadır.",
          },
          {
            label: "Adım 3",
            explanation:
              "İnsanı prokaryot sınıfına geçirmek veya bütün insan hücrelerinde ribozom yok demek bu tek hücre gözlemini aşar.",
          },
        ],
        answer:
          "Ökaryot insanın özelleşmiş olgun alyuvarı; organizma prokaryot olmaz.",
        check:
          "Bir organelin görüntüde yokluğu, hücrenin ait olduğu bireyin bütün hücrelerini betimlemez.",
        pitfall:
          "Çekirdeksiz görülen her biyolojik yapıyı bağlamdan bağımsız bir bakteri bireyi saymak.",
      },
      {
        title: "Düzenlenen akışın bilinmeyen miktarı",
        prompt:
          "Varsayımsal hücre su hesabında başlangıç endeksi 30. Birinci adımda 8 birim giriş ve 3 birim çıkış var. İkinci adımda giriş yine 8 birim; son endeks 32. Başka giriş veya çıkış yok. İkinci adımdaki su çıkışı kaç birimdir? Bu endeks gerçek hücre hacmi ölçümü değildir.",
        strategy:
          "Önce ara stoku bul; ikinci adımın son stok eşitliğinden bilinmeyen çıkışı çıkar.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Birinci adımın sonunda endeks 30+8−3=35 olur.",
          },
          {
            label: "Adım 2",
            explanation:
              "İkinci adımda çıkıştan önce 35+8=43 birim kaynak vardır.",
          },
          {
            label: "Adım 3",
            explanation:
              "Son değer 32 olduğuna göre ikinci çıkış 43−32=11 birimdir; artan çıkış önceki su artışını azaltan yöndedir.",
          },
        ],
        answer: "İkinci adımda 11 birim su çıkmıştır.",
        check:
          "Bütün dönem için 30+16−3−11=32; farklı zamanların akışları kendi stok sınırlarında izlenir.",
        pitfall:
          "İki adımın çıkışını aynı sanmak veya son değer 32’yi doğrudan ikinci adım çıkışı diye kullanmak.",
      },
    ],
    recall: [
      {
        prompt:
          "Bir hücrede DNA ve ribozom var; yalnız bu iki yapıdan zarla çevrili çekirdek varlığı çıkar mı?",
        answer:
          "Hayır. Prokaryot hücre de DNA ve ribozom taşır. Çekirdek zarı ayrı bir yapı bilgisidir; verilen kanıtın kapsamadığı organel eklenmez.",
      },
      {
        prompt:
          "Bir canlının ATP üretmesi neden karbon kaynağını tek başına söylemez?",
        answer:
          "Ototrof ve heterotrof canlılar ATP kullanıp yeniler. Karbonun CO₂ gibi inorganik kaynaktan mı, hazır organik maddeden mi geldiği ayrıca belirlenmelidir.",
      },
      {
        prompt:
          "Toplam protein miktarı sabitken hem yapım hem yıkım nasıl olabilir?",
        answer:
          "Aynı sürede yapılan ve yıkılan miktarlar eşit olabilir. Net stok değişiminin sıfır olması, karşıt süreçlerin hızlarının da sıfır olması demek değildir.",
      },
      {
        prompt:
          "Bir yapının dışarı atılması hangi durumda metabolik atık boşaltımı kanıtı verir?",
        answer:
          "Maddenin hücre metabolizmasının ürünü olduğu ve hücreden ya da organizmadan uzaklaştırıldığı bilgisi gerekir. Sindirilmemiş bir besin artığının çıkışı aynı kanıt değildir.",
      },
      {
        prompt:
          "Çok hücreli bir dokuda bölünme görüldü; birey sayısı kesin arttı mı?",
        answer:
          "Hayır. Bölünme büyüme veya onarıma katılabilir. Üreme yorumu için yeni bir organizma oluştuğu gösterilmelidir.",
      },
      {
        prompt:
          "Kısa sürede yararlı görünen bir yanıtı adaptasyon saymadan hangi iki ek bilgi aranır?",
        answer:
          "Özelliğin kalıtsallığı ve belirli çevrede nesiller boyunca yaşama/üreme başarısına katkısı aranır. Tek bireyin anlık yanıtı bu iki koşulu tek başına sağlamaz.",
      },
    ],
    items: [
      {
        prompt:
          "X örneğinde bir zarla çevrili sitoplazmada DNA, ribozom ve enzimlerle yürüyen kimyasal dönüşümler gözleniyor. Y kristaline yeni tanecikler ekleniyor; Z alevi çevreye yayılıyor. Bu gözlemlerden hangisi hücresel örgütlenmeye doğrudan kanıt sağlar?",
        correct:
          "X’te sınırlandırılmış iç ortam ve görevli hücre bileşenlerinin birlikte bulunması",
        wrong: [
          [
            "Y’nin hacminin artması",
            "Kristale dışarıdan tanecik eklenmesi büyüklüğü artırır; sitoplazma veya hücresel iş bölümü kanıtı vermez.",
          ],
          [
            "Z’nin bulunduğu yerden başka yere yayılması",
            "Alevin yayılması tek başına zar, kalıtsal bilgi ve ribozomla örgütlü hücre oluşturmaz.",
          ],
          [
            "Y ile Z’nin gözle görülebilmesi",
            "Gözle görülebilir boyut hücresel yapıyı ayırt eden bir ölçüt değildir.",
          ],
          [
            "X, Y ve Z’de herhangi bir değişim olması",
            "Değişim çok geniş bir özelliktir; kimyasal ve fiziksel birçok cansız olayda da görülür.",
          ],
        ],
        knowledge: [
          "Hücre, zarla sınırlandırılmış ve farklı bileşenlerin birlikte iş gördüğü temel canlılık birimidir.",
        ],
        strategy:
          "Hareket veya büyüklük yerine verilen yapısal bileşenlerin aynı sistemde bulunmasını ara.",
        steps: [
          "X kaydında zar sınırı, sitoplazma, DNA ve ribozom birlikte tanımlanmıştır.",
          "Y’nin kaydı yalnız tanecik eklenmesini, Z’ninki yayılmayı içerir.",
          "Hücresel örgütlenme sorusu bu yüzden X’in bileşenler bütünlüğüyle yanıtlanır.",
        ],
        reason:
          "Doğru. Verilen X yapısı hücrenin sınır ve iş bölümünü gösterir; tek davranış ölçütüne dayanmaz.",
        commonError:
          "Canlılık kanıtı yerine yalnız gözle görülen herhangi bir değişimi seçmek.",
        check:
          "Seçtiğin kanıtta hücre sınırı ve hücre içi bileşenler birlikte bulunmalıdır.",
      },
      {
        prompt:
          "L ve M örneklerinin her ikisinde zarla çevrili çekirdek var. L bireyi tek hücreden, M bireyi çok sayıda hücreden oluşuyor. Hangi iki özellik birlikte doğrudur?",
        correct:
          "Hücre planları ökaryottur; bireylerinin hücre sayısı farklıdır",
        wrong: [
          [
            "L prokaryot, M ökaryottur",
            "L’de çekirdek zarı verilmiştir; tek hücreli olması bu yapısal kanıtı silmez.",
          ],
          [
            "İkisi de çok hücrelidir",
            "L bireyinin tek hücreden oluştuğu açıkça belirtilmiştir.",
          ],
          [
            "İkisinde de ribozom bulunamaz",
            "Ökaryot hücrelerde protein yapımına katılan ribozomlar bulunur; çekirdek varlığı ribozomu dışlamaz.",
          ],
          [
            "M’nin çok hücreli olması çekirdek zarını gereksiz kılar",
            "Hücre sayısı, M’de gözlenen çekirdek zarının yokluğu anlamına gelmez.",
          ],
        ],
        knowledge: [
          "Hücre sayısı bireyin kaç hücreden oluştuğunu; prokaryot–ökaryot ayrımı hücresel planı belirtir.",
        ],
        strategy:
          "Çekirdek yapısı ve bireyin hücre sayısı için iki ayrı sonuç yaz.",
        steps: [
          "Her iki örnekte çekirdek zarı bulunduğundan hücre planı ökaryottur.",
          "L için tek, M için çok hücreli birey bilgisi verilmiştir.",
          "Ortak planla farklı hücre sayısını birleştiren seçeneği koru.",
        ],
        reason:
          "Doğru. Aynı ökaryot plan, tek ve çok hücreli bireylerde bulunabilir.",
        commonError: "Tek hücreli olmayı çekirdeksizliğin eş anlamı saymak.",
        check:
          "Hücre planı sonucunu çekirdek verisiyle; sayı sonucunu birey tanımıyla denetle.",
      },
      {
        prompt:
          "Bir prokaryot kültürde protein sentezi izleniyor. Bu gözlemi açıklamak için aşağıdaki yapılardan hangisinin varlığı beklenir?",
        correct: "Zarsız ribozom",
        wrong: [
          [
            "Zarla çevrili çekirdek",
            "Prokaryot hücrede çekirdek zarı yoktur; protein yapımı bu yapıyı gerektirdiği için gerçekleşiyor değildir.",
          ],
          [
            "Mitokondri",
            "Prokaryot hücre mitokondri taşımaz; ATP sağlama veya protein yapımı mitokondri varlığının kanıtı olmaz.",
          ],
          [
            "Kloroplast",
            "Prokaryot hücrede kloroplast bulunmaz; protein yapımı fotosentez organelini zorunlu kılmaz.",
          ],
          [
            "Hücre dışında kurulmuş bir organ sistemi",
            "Tek hücrenin protein sentezi, doku ve organ sistemlerinin varlığını gerektirmez.",
          ],
        ],
        knowledge: [
          "Ribozom zarsız bir yapıdır ve protein sentezine katılır; prokaryotlarda zarlı organel bulunmaması ribozomun da yokluğu değildir.",
        ],
        strategy:
          "Sorulan işlevi yapan yapıyı seç; zarlı organel yokluğu kuralının kapsamını koru.",
        steps: [
          "Ölçülen olay protein yapımıdır; ilgili hücresel yapı ribozomdur.",
          "Ribozom zarlı organeller sınıfına girmez.",
          "Prokaryotun bu işlevi görmesi çekirdek veya mitokondri taşıdığı sonucunu doğurmaz.",
        ],
        reason:
          "Doğru. Ribozom, prokaryot hücrenin protein yapmasını açıklayan zarsız yapıdır.",
        commonError:
          "“Zarlı organel yok” bilgisini bütün hücre içi görevli yapılar yok diye okumak.",
        check:
          "Seçilen yapının prokaryot hücre planıyla çelişmemesine dikkat et.",
      },
      {
        prompt:
          "E kültürü organik karbonu hazır alıyor. F kültürü CO₂’den organik madde yapıyor; gerekli enerjiyi belirli inorganik maddelerin oksidasyonundan sağlıyor. Bu iki kültür için uygun karşılaştırma hangisidir?",
        correct:
          "E heterotrof, F kemoototroftur; ikisi de hücresel işlerde enerji kullanır",
        wrong: [
          [
            "E ototrof, F heterotroftur",
            "Karbon kaynağı ters okunmuştur: hazır organik karbon E’de, CO₂’yi organiğe bağlama F’dedir.",
          ],
          [
            "F yalnız karanlıkta olduğu için heterotroftur",
            "F’nin sınıflaması aydınlık bilgisine değil, verilmiş karbon ve kimyasal enerji kaynağına dayanır.",
          ],
          [
            "E’nin ATP kullanması mümkün değildir",
            "Hazır organik besin kullanmak ATP gereksinimini ortadan kaldırmaz.",
          ],
          [
            "F inorganik maddeleri kullandığı için hiçbir organik molekül yapamaz",
            "F’nin CO₂’den organik madde sentezlediği doğrudan verilmiştir.",
          ],
        ],
        knowledge: [
          "Ototrofluk karbonun inorganik kaynaktan organik maddeye bağlanmasıyla; foto/kemo ayrımı enerji kaynağıyla ilişkilidir.",
        ],
        strategy:
          "Önce her kültürün karbon kaynağını, sonra F’nin enerji kaynağını yaz.",
        steps: [
          "E’nin hazır organik karbon alması heterotrof beslenmeye uyar.",
          "F’nin CO₂ kullanması ototrofluğu; inorganik oksidasyon enerjisi kemo ayrımını verir.",
          "Her iki kültürün de sentez ve taşıma gibi işlerde enerji gereksinimi vardır.",
        ],
        reason:
          "Doğru. Karbon kaynağı iki beslenme biçimini ayırır; enerji kullanımı ikisinde de sürer.",
        commonError:
          "Kimyasal enerji kullanmayı, organik besini mutlaka dışarıdan alma koşuluyla eşitlemek.",
        check:
          "F için CO₂ ve kimyasal enerji verilerinin ikisi de sınıflamada karşılık bulmalıdır.",
      },
      {
        prompt:
          "Işıkta tutulan yaprak örneğinde bir saatte 19 karşılaştırmalı birim CO₂ üretiliyor, 27 birim CO₂ tüketiliyor. Kapta gaz kaçağı yok, başka kaynak veya tüketici yok. Bu süre için net CO₂ değişimi ve solunum yorumu hangisidir?",
        correct:
          "Net 8 birim azalma olur; üretimin verilmiş olması CO₂ üreten sürecin sürdüğünü gösterir",
        wrong: [
          [
            "Net 46 birim artış olur; iki miktar toplanır",
            "Karşıt yönlü üretim ve tüketim net değişim için toplanmaz; tüketim stoktan çıkarılır.",
          ],
          [
            "Net 8 birim artış olur; büyük miktar stokta kalır",
            "27 birim tüketim 19 birim üretimden büyüktür; net yön artış değil azalmadır.",
          ],
          [
            "Net 8 birim azalma olur; CO₂ üretimi kesin yoktur",
            "Azalma hesabı doğru olsa da 19 birim üretim açıkça verilmiştir; üretim yok denemez.",
          ],
          [
            "Net sıfır olur; ışıkta bütün gaz süreçleri dengededir",
            "Üretim ve tüketim eşit değildir; ışık bulunması eşitliği zorunlu kılmaz.",
          ],
        ],
        knowledge: [
          "Net stok değişimi üretim eksi tüketimdir; ışıkta CO₂ tüketimiyle CO₂ üretimi birlikte bulunabilir.",
        ],
        strategy:
          "Net farkı işaretli hesapla; sonra üretim verisini yorumda koru.",
        steps: [
          "CO₂ için üretim +19, tüketim −27 olarak yazılır.",
          "Toplam değişim 19−27=−8 birimdir.",
          "Negatif sonuç tüketimin fazla olduğunu gösterir; verilmiş üretimi sıfırlamaz.",
        ],
        reason:
          "Doğru. Net azalma ile CO₂ üretiminin sürmesi aynı anda mümkündür.",
        commonError:
          "Net gaz azalışını bir üretim yolunun bütünüyle kapandığının kanıtı sanmak.",
        check:
          "Son stok başlangıçtan 8 eksik olmalıdır; ayrıca üretim satırındaki 19 yorumda yok edilmemelidir.",
      },
      {
        prompt:
          "P yolunda oksijen kullanılmıyor fakat elektron taşıma sistemi çalışıyor. Q yolunda oksijen ve elektron taşıma sistemi kullanılmıyor; organik maddenin kısmi yıkımıyla bağlantılı ATP kazanımı var. P ve Q için uygun ayrım hangisidir?",
        correct: "P oksijensiz solunumla, Q fermantasyonla uyumludur",
        wrong: [
          [
            "İkisi de zorunlu olarak aynı fermantasyon yoludur",
            "P’de elektron taşıma sisteminin varlığı, fermantasyonla verilen temel ayrımı oluşturur.",
          ],
          [
            "P fotosentez, Q oksijenli solunumdur",
            "P için ışıkla besin yapımı verilmemiş; Q için oksijen kullanımı açıkça dışlanmıştır.",
          ],
          [
            "Q’da ATP kazanılamaz",
            "Q’da ATP kazanımı doğrudan verilmiştir; oksijen yokluğu bütün ATP yollarını engellemez.",
          ],
          [
            "P prokaryot bir hücre olamaz",
            "Bu enerji yolu bilgisi tek başına prokaryot planı dışlamaz; hücre yapısı ayrıca gerekir.",
          ],
        ],
        knowledge: [
          "Oksijensiz solunumda elektron taşıma sistemi bulunur; fermantasyonda bu sistem kullanılmaz.",
        ],
        strategy:
          "Ortak oksijen yokluğu yerine yolları ayıran elektron taşıma sistemi verisini kullan.",
        steps: [
          "P’de oksijen dışlanmış fakat taşıma sistemi vardır.",
          "Q’da taşıma sistemi de dışlandığından fermantasyon koşulu sağlanır.",
          "İki yolun da ATP kazanımıyla ilişkili olabilmesi onları aynı mekanizma yapmaz.",
        ],
        reason:
          "Doğru. Belirleyici fark P’de elektron taşıma sisteminin bulunmasıdır.",
        commonError:
          "Oksijen kullanmayan bütün enerji yollarını tek ad altında birleştirmek.",
        check:
          "Seçimin, hem P’nin taşıma sistemi varlığına hem Q’nun yokluğuna uymalıdır.",
      },
      {
        prompt:
          "Bir hücrede X olayı glikoz birimlerini depo polisakkaritine bağlıyor; Y olayı bir proteini daha küçük parçalara ayırıyor. X ve Y için doğru yorum hangisidir?",
        correct:
          "X anabolizma, Y katabolizmadır; ikisi metabolizmanın parçalarıdır",
        wrong: [
          [
            "X ve Y yalnız boşaltımdır",
            "Maddelerin hücreden uzaklaştırıldığı verilmemiştir; olaylar kimyasal yapım ve yıkımdır.",
          ],
          [
            "X katabolizma, Y anabolizmadır",
            "Küçük birimleri büyük yapıya bağlama ile büyük yapıyı parçalama yönleri ters adlandırılmıştır.",
          ],
          [
            "Y her koşulda doğrudan ATP üretimini kanıtlar",
            "Yıkım görülmesi tek başına ATP’nin o basamakta doğrudan üretildiğini göstermez.",
          ],
          [
            "X varsa Y aynı hücrede gerçekleşemez",
            "Yapım ve yıkım hücrede aynı dönem içinde farklı moleküller üzerinde birlikte sürebilir.",
          ],
        ],
        knowledge: [
          "Anabolizma yapım, katabolizma yıkım tepkimeleridir; metabolizma ikisinin bütünüdür.",
        ],
        strategy: "Her olayda girdi ve ürünün birleşme/parçalanma yönünü çiz.",
        steps: [
          "X’te küçük glikoz birimleri büyük bağlı yapıya dönüşür.",
          "Y’de protein daha küçük ürünlere ayrılır.",
          "Yapım X’i, yıkım Y’yi sınıflar; ortak üst başlık metabolizmadır.",
        ],
        reason:
          "Doğru. Tepkime yönleri X için yapım, Y için yıkım anlamına gelir.",
        commonError:
          "Olayı yalnız enerji sözcüğüne göre adlandırıp molekül dönüşümünü okumamak.",
        check:
          "Birleşen glikozlar ile parçalanan protein iki ayrı yönü açıkça göstermelidir.",
      },
      {
        prompt:
          "Bir besin molekülünün enzimle daha küçük parçalara ayrıldığı gözleniyor. Aynı deneyde ATP miktarı veya enerji aktarımı ölçülmemiş. Hangi sonuç yalnız bu gözlemle kesin kurulamaz?",
        correct: "Bu parçalanma basamağında doğrudan ATP üretildiği",
        wrong: [
          [
            "Molekülün daha küçük ürünlere dönüştüğü",
            "Bu dönüşüm gözlemin kendisidir; ek ATP ölçümüne ihtiyaç duymaz.",
          ],
          [
            "Verilen olayın yıkım yönünde olduğu",
            "Büyük molekülün küçük ürünlere ayrılması katabolik yönü tanımlar.",
          ],
          [
            "Bir enzim etkisinin gözlendiği",
            "Soru enzimle parçalanma olduğunu açıkça belirtmiştir.",
          ],
          [
            "ATP üretimi için ek süreç bilgisi gerektiği",
            "Parçalanma ile ATP kazanımının aynı basamakta olduğunu göstermeyen gözlem, ek bilgi ihtiyacını doğurur.",
          ],
        ],
        knowledge: [
          "Sindirimle parçalama ve parçalanan maddelerden ATP kazanma aynı işlem değildir.",
        ],
        strategy: "Ölçülen dönüşümü koru; ölçülmemiş enerji sonucunu ayır.",
        steps: [
          "Doğrudan veri, molekülün daha küçük ürünlere ayrılmasıdır.",
          "ATP üretim basamağı veya miktarı hakkında veri yoktur.",
          "Yıkım yorumu yapılabilir; o basamakta ATP üretildiği kesinleştirilemez.",
        ],
        reason:
          "Doğru. Kimyasal parçalanma, doğrudan ATP kazanımını tek başına kanıtlamaz.",
        commonError:
          "Her katabolik olayın her basamağını ATP üreten tepkime sanmak.",
        check:
          "Kesin sonuç ararken yalnız soruda gözlenen veya tanım gereği çıkan kısmı kullan.",
      },
      {
        prompt:
          "Bir hücre grubunda toplam protein miktarı iki ölçüm arasında değişmiyor. İşaretli amino asitler yeni proteinlere katılıyor; eski işaretli proteinlerin bir bölümü de parçalanıyor. Hangi yorum uygundur?",
        correct: "Protein yapımı ve yıkımı sürerken net miktar sabit kalabilir",
        wrong: [
          [
            "Toplam sabitse metabolizma tamamen durmuştur",
            "Yeni katılım ve eski proteinlerin parçalanması metabolik dönüşümlerin sürdüğünü gösterir.",
          ],
          [
            "Yalnız protein yıkımı gerçekleşmiştir",
            "Yeni amino asitlerin proteinlere katılması yapımın da bulunduğuna kanıttır.",
          ],
          [
            "Protein yapımı varsa toplam her koşulda artmalıdır",
            "Eş zamanlı yıkım yapımın stok artışını dengeleyebilir.",
          ],
          [
            "Bu gözlem hücrelerin mutlaka çoğaldığını gösterir",
            "Protein dönüşümü yeni bağımsız birey oluşumunun kanıtı değildir.",
          ],
        ],
        knowledge: [
          "Net stok, karşıt yapım ve yıkım süreçlerinin farkına bağlıdır; net sıfır süreçlerin yokluğu değildir.",
        ],
        strategy:
          "Stok ölçümünü yeni katılım ve parçalanma kanıtlarıyla birlikte değerlendir.",
        steps: [
          "Yeni amino asit katılımı protein yapımının sürdüğünü gösterir.",
          "Eski protein parçalanması yıkımı gösterir.",
          "İki katkı aynı miktarı dengelediğinde toplam protein değişmeyebilir.",
        ],
        reason: "Doğru. Dinamik dönüşüm, sabit toplam miktarla bağdaşır.",
        commonError:
          "Tek bir toplam stok ölçümünü bütün reaksiyonların hızının ölçümü saymak.",
        check:
          "Seçilen yorum hem yeni katılımı hem eski protein kaybını açıklamalıdır.",
      },
      {
        prompt:
          "Tatlı su protistinde kontraktil koful fazla suyu dışarı atıyor. Başka bir hücrede metabolik CO₂ hücre zarından uzaklaşıyor. Bu iki olayın ortak yönü hangisidir?",
        correct:
          "Hücre içinden madde uzaklaştırmaları ve iç düzenin korunmasına katkı vermeleri",
        wrong: [
          [
            "İkisinin de aynı boşaltım organını kullanması",
            "Biri kontraktil kofulla, diğeri zar üzerinden gerçekleşiyor; yapı ortak değildir.",
          ],
          [
            "Her ikisinin de yeni birey oluşturması",
            "Su veya CO₂ çıkışı üreme kanıtı değildir.",
          ],
          [
            "İkisinin de sindirilmemiş besin atması",
            "Fazla su ve metabolik CO₂ sindirilmemiş besin parçaları değildir.",
          ],
          [
            "Hücrelerin prokaryot olduğunu kanıtlamaları",
            "Kontraktil koful verilen protist bağlamı prokaryot zorunluluğu vermez; işlevden aynı hücre planı çıkarılamaz.",
          ],
        ],
        knowledge: [
          "Boşaltım ve fazla madde uzaklaştırması farklı yapılardan yürüyebilir; işlev ortaklığı aynı organı gerektirmez.",
        ],
        strategy:
          "Madde çıkışı işlevini, bu çıkışı sağlayan yapının adından ayrı tut.",
        steps: [
          "Birinci olay fazla suyu koful aracılığıyla uzaklaştırır.",
          "İkinci olay metabolik CO₂’yi zardan dışarı verir.",
          "İki farklı yapı hücre içi düzen için madde uzaklaştırma işlevine katılır.",
        ],
        reason:
          "Doğru. Ortak olan işlevsel katkıdır; kullanılan yapıların aynı olması gerekmez.",
        commonError:
          "Ortak yaşam işlevinden bütün gruplarda aynı organ veya organel olduğu sonucunu çıkarmak.",
        check:
          "Seçenek, iki farklı çıkış yolunu da kapsarken onları tek yapıya indirmemelidir.",
      },
      {
        prompt:
          "I. Hücrede oluşan azotlu atığın idrarla uzaklaştırılması; II. emilmemiş selüloz parçalarının sindirim kanalından atılması; III. fazla suyun hücreden çıkarılması. Hangi olaylar metabolik atık veya fazla madde boşaltımı kapsamında değerlendirilebilir?",
        correct: "I ve III",
        wrong: [
          [
            "Yalnız II",
            "II’deki emilmemiş besin artığı, hücre metabolizmasının oluşturduğu atık olarak verilmemiştir.",
          ],
          [
            "Yalnız I",
            "Fazla suyun hücreden uzaklaştırılması da hücresel dengenin korunmasıyla ilgili boşaltım kapsamındadır.",
          ],
          [
            "I ve II",
            "II’yi hücresel atıkla eşitlerken III’teki fazla su uzaklaştırmasını dışarıda bırakır.",
          ],
          [
            "II ve III",
            "III uygundur; ancak II’nin besin artığı niteliği farklıdır ve I açık bir metabolik atık örneğidir.",
          ],
        ],
        knowledge: [
          "Boşaltım metabolik atıkların veya fazlanın uzaklaştırılmasıdır; sindirilmemiş besin artığının atılmasıyla aynı kapsam değildir.",
        ],
        strategy:
          "Her olayda atılan maddenin hücre metabolizmasındaki kökenini veya fazla madde niteliğini işaretle.",
        steps: [
          "I’de azotlu atığın hücrede oluştuğu verilmiştir.",
          "II emilmemiş besin kalıntısıdır; III fazla su çıkışıdır.",
          "Metabolik atık ve fazla madde koşullarını sağlayan I ile III birlikte seçilir.",
        ],
        reason: "Doğru. I metabolik atığı, III fazla suyu uzaklaştırır.",
        commonError:
          "Vücuttan çıkan her maddeyi kökenine bakmadan aynı boşaltım kanıtı saymak.",
        check:
          "Dışarı çıkış fiili tek başına yeterli değildir; madde türü de sınıflamaya uymalıdır.",
      },
      {
        prompt:
          "Varsayımsal bir hücrede ilk ATP stoku 7 birimdir. İki adımın her birinde 6 birim ATP üretiliyor ve 8 birim kullanılıyor. Başka giriş veya çıkış yok, talepler karşılanabiliyor. Son ATP stoku kaç birimdir?",
        correct: "3",
        wrong: [
          [
            "19",
            "7+2×6=19 toplam kaynaktır; iki adımlık harcama çıkarılmamıştır.",
          ],
          [
            "5",
            "Yalnız bir adımın 6−8=−2 farkı başlangıca uygulanmış; ikinci adım atlanmıştır.",
          ],
          [
            "−4",
            "İki adımın net değişimi −4’tür; başlangıçtaki 7 birim eklenmemiştir.",
          ],
          [
            "23",
            "7+2×8=23 harcamayı stok girişi gibi toplamaktan doğar; üretim ve tüketim yönleri karışmıştır.",
          ],
        ],
        knowledge: [
          "Son stok=başlangıç+toplam üretim−toplam kullanım; her adımın sayısı aynı zaman aralığıyla çarpılır.",
        ],
        strategy: "İki adımın toplam üretim ve kullanımını ayrı hesapla.",
        steps: [
          "Toplam üretim 2×6=12 birimdir.",
          "Toplam kullanım 2×8=16 birimdir.",
          "Son stok 7+12−16=3 birimdir; ara adımlarda stok negatif olmaz.",
        ],
        reason:
          "Doğru. İlk stokla iki adımın net −4 birim değişimi birlikte 3 verir.",
        commonError:
          "Adım başına verilen bir miktarı yalnız bir kez, diğerini iki kez hesaba katmak.",
        check:
          "Birinci adım sonunda 5, ikinci sonunda 3 olması toplu hesabı doğrular.",
      },
      {
        prompt:
          "Yaprağın temasla kapanması, bitkinin yerini bütünüyle değiştirmeden gerçekleşiyor. Rüzgâr ise kopmuş kuru yaprağı bir metre sürüklüyor. Bu iki gözlem için uygun yorum hangisidir?",
        correct:
          "İlkinde biyolojik uyaran yanıtı ve durum değiştirme vardır; ikincideki yer değişimi tek başına böyle bir yanıt kanıtı değildir",
        wrong: [
          [
            "Yer değiştirmeyen yaprak hiçbir hareket yapmamıştır",
            "Bir yapının durum değiştirmesi de hareket olabilir; tüm bireyin yer değiştirmesi gerekmez.",
          ],
          [
            "Rüzgârla sürüklenme kuru yaprağın canlı olduğunu kesin kanıtlar",
            "Dış kuvvetle taşınma, düzenlenmiş hücresel yanıt kanıtı değildir.",
          ],
          [
            "Her iki hareket de bilinçli karar gerektirir",
            "Bitkisel yanıt veya fiziksel sürüklenme için bilinçli karar sonucu çıkarılamaz.",
          ],
          [
            "İlk gözlem bitkinin kalıtsal yapısının mutlaka değiştiğini gösterir",
            "Temasa yanıt, tek başına DNA değişimi veya yeni adaptasyon oluştuğunun kanıtı değildir.",
          ],
        ],
        knowledge: [
          "Hareket durum değiştirmeyi de kapsar; dış kuvvetle taşınma ile hücresel uyaran yanıtı ayrıdır.",
        ],
        strategy:
          "Hareketin nedenini ve değişen birimin konumunu iki olay için ayrı incele.",
        steps: [
          "Temasın ardından yaprak kapanması canlı yapının yanıtı olarak verilmiştir.",
          "Kuru yaprakta hareketi sağlayan dış rüzgârdır.",
          "Yer değiştirme miktarı yerine yanıt mekanizması temelindeki ayrımı seç.",
        ],
        reason:
          "Doğru. Hareketin görülmesi kadar onu oluşturan mekanizma da canlılık yorumunda önemlidir.",
        commonError:
          "Daha büyük yer değiştirmeyi daha güçlü canlılık kanıtı sanmak.",
        check:
          "İlk gözlemde uyaran–yanıt ilişkisi; ikincide dış fiziksel kuvvet koşulu korunmalıdır.",
      },
      {
        prompt:
          "Bir hücrede su miktarı uygun aralığın üzerine çıktığında su çıkış hızı artıyor; su miktarı yeniden uygun aralığa yaklaşınca çıkış hızı azalıyor. Bu düzenleme hangi yoruma uygundur?",
        correct: "İlk sapmayı azaltan dinamik iç denge düzenlemesi",
        wrong: [
          [
            "Su giriş ve çıkışının yaşam boyunca tamamen durması",
            "Düzenleme değişen akışlarla sağlanıyor; bütün alışverişin durduğu verilmemiştir.",
          ],
          [
            "Hücre hacminin her anda matematiksel olarak aynı olması",
            "Uygun aralığa yaklaşma bilgisi bir sapma ve düzeltme içerir; mutlak değişmezlik değildir.",
          ],
          [
            "Her su çıkışının yeni bir kalıtsal adaptasyon oluşturması",
            "Kısa süreli akış yanıtı, kalıtsal özelliğin nesiller boyunca seçilmesiyle aynı olay değildir.",
          ],
          [
            "Hücrenin fazla suyu enerji veren organik yakıta çevirmesi",
            "Gözlenen süreç suyun uzaklaştırılmasıdır; organik yakıt üretimi verilmemiştir.",
          ],
        ],
        knowledge: [
          "Homeostazi uygun iç aralığın düzenlenmesidir; negatif geri bildirim ilk sapmanın etkisini azaltır.",
        ],
        strategy:
          "Sapmanın ve düzenleyici akışın iç su miktarına etkisini karşılaştır.",
        steps: [
          "İç su miktarı üst yönde sapınca çıkış artmaktadır.",
          "Artan çıkış, fazla suyu azaltacak yönde etki eder.",
          "Değer aralığa yaklaşınca yanıtın azalması dinamik düzenlemeyle uyumludur.",
        ],
        reason:
          "Doğru. Tepki, su fazlasını azaltacak yönde ayarlanır; madde alışverişi sürer.",
        commonError:
          "Homeostaziyi bütün değişkenlerin ve bütün akışların sıfır değişimi sanmak.",
        check:
          "Yanıtın iç su fazlasını artırmadığını, azaltan yönde olduğunu kontrol et.",
      },
      {
        prompt:
          "Kalıtsal olarak kalın örtü taşıyan bireylerin soğuk ortamda daha çok yavru bıraktığı kuşaklar boyunca gösteriliyor. Aynı türün başka bireyinde soğukta kısa süreli titreme gözleniyor. Bu veriler hangi ayrımı destekler?",
        correct:
          "Kalın örtünün verilen başarısı adaptasyonla; titreme kısa süreli düzenleyici yanıtla ilişkilidir",
        wrong: [
          [
            "Titreme tek başına yeni kalıtsal örtü özelliğini oluşturmuştur",
            "Titreme gözleminden DNA veya örtü kalıtımının değiştiği sonucu çıkmaz.",
          ],
          [
            "Yararlı olan iki olay da aynı nesiller arası mekanizmadır",
            "Birinde kalıtsallık ve kuşak başarısı, diğerinde bireyin kısa süreli yanıtı verilmiştir.",
          ],
          [
            "Kalıtsal örtü özelliği çevreye bağlı bir işlev taşıyamaz",
            "Soğuk ortamda artan üreme başarısı, özelliğin o çevredeki katkısını doğrudan belirtir.",
          ],
          [
            "Titreyen birey ATP kullanmayı bırakmıştır",
            "Titreme gibi kas yanıtları enerji gereksinimini ortadan kaldırmaz.",
          ],
        ],
        knowledge: [
          "Adaptasyon için kalıtsal özellik ve çevrede nesiller boyunca başarı; anlık düzenleme için bireyde fizyolojik yanıt aranır.",
        ],
        strategy:
          "Kalıtsallık ve zaman ölçeği verilerini iki olayda ayrı işaretle.",
        steps: [
          "Örtü için kalıtsallık ve kuşaklar boyunca daha çok yavru bilgisi vardır.",
          "Titreme aynı bireyin kısa süreli soğuk yanıtıdır.",
          "İki olayı ortak yararlılık sözcüğü yerine farklı kanıt ölçekleriyle adlandır.",
        ],
        reason:
          "Doğru. Örtü verisi kalıtsal uyumu, titreme verisi anlık düzenlemeyi destekler.",
        commonError:
          "Bir bireye yarar sağlayan her olayın yeni adaptasyon olduğunu varsaymak.",
        check:
          "Kalıtsallık ve kuşak başarısı yalnız hangi olayda açıkça verilmiştir, yeniden bak.",
      },
      {
        prompt:
          "I. Tek hücreli bir canlıdan iki ayrı canlı birey oluşuyor. II. Çok hücreli bir canlının deri hücreleri çoğalıyor fakat yeni birey oluşmuyor. Hangi yorum doğrudur?",
        correct:
          "I üremedir; II büyüme veya onarıma katılabilir ve tek başına bireyin üremesi değildir",
        wrong: [
          [
            "İki olay da her koşulda iki yeni organizma oluşturur",
            "II’de yeni birey oluşmadığı açıkça belirtilmiştir.",
          ],
          [
            "I yalnız organ büyümesidir",
            "I’de bağımsız canlı birey sayısı artmıştır; organ bağlamı verilmemiştir.",
          ],
          [
            "II’de hücreler canlılık özelliği gösteremez",
            "Deri hücrelerinin çoğalması hücresel bir olaydır; organizma üremesi olmaması hücreleri cansız yapmaz.",
          ],
          [
            "Hücre bölünmesi hiçbir zaman üremeyle ilişkili olamaz",
            "Tek hücreli bireyin bölünmesi yeni bireyler oluşturabilir; I buna örnektir.",
          ],
        ],
        knowledge: [
          "Hücre bölünmesinin organizma düzeyindeki işlevi, yeni birey oluşup oluşmadığına bağlıdır.",
        ],
        strategy: "Hücre sayısından önce organizma sayısını izle.",
        steps: [
          "I’de tek bireyden iki ayrı canlı birey oluşur.",
          "II’de daha fazla hücre aynı organizmanın içinde kalır.",
          "Bu yüzden I’de üreme, II’de büyüme/onarıma katkı yorumu uygun olur.",
        ],
        reason:
          "Doğru. Aynı tür hücresel işlem farklı organizasyon ölçeğinde farklı işlevlere katılabilir.",
        commonError:
          "Bölünen hücre sayısını yeni organizma sayısıyla eşitlemek.",
        check:
          "Sorudaki “yeni birey oluşmuyor” koşulu II hakkındaki yorumunda yer almalıdır.",
      },
      {
        prompt:
          "Bir bitki hücresinin hacmi kısa sürede %20 artıyor. Soru, bu sırada yalnız su girişinin değişmiş olabileceğini ve kuru kütlenin ölçülmediğini belirtiyor. Hangi sonuç kesin çıkarılamaz?",
        correct: "Hücrenin protein miktarının %20 arttığı",
        wrong: [
          [
            "Ölçülen hücre hacminin arttığı",
            "Hacim artışı soruda doğrudan ölçüm olarak verilmiştir.",
          ],
          [
            "Hacim ile kuru madde miktarının farklı nicelikler olduğu",
            "Su katkısı nedeniyle hacim ve kuru madde miktarını ayırmak gerekir.",
          ],
          [
            "Protein artışını hesaplamak için ek madde ölçümü gerektiği",
            "Kuru kütle ve bileşim verisi olmadığı için protein miktarına geçiş ek bilgi ister.",
          ],
          [
            "Su girişinin hacim değişimiyle uyumlu olabileceği",
            "Soruda bu olasılık açık bırakılmıştır; tek başına protein sentezi zorunlu değildir.",
          ],
        ],
        knowledge: [
          "Hacim, su içeriği ve kuru biyolojik madde miktarı aynı ölçüm değildir; yüzde bir nicelikten diğerine koşulsuz taşınmaz.",
        ],
        strategy: "Verilmiş yüzdeyi yalnız ölçüldüğü hacim niceliğinde tut.",
        steps: [
          "%20 artan nicelik hücre hacmidir.",
          "Su girişi bu artışa katkı verebilir; protein veya kuru kütle ölçülmemiştir.",
          "Hacim yüzdesini protein yüzdesi yapacak bir dönüşüm verisi olmadığı için kesin protein artışı kurulamaz.",
        ],
        reason:
          "Doğru. Aynı yüzdeyi farklı bir molekül miktarına aktarmak veriyi aşar.",
        commonError:
          "Hacimdeki yüzde artışını bütün hücre bileşenlerinin aynı yüzdeyle sentezi sanmak.",
        check:
          "Cevapta ölçülmemiş protein niceliğine yeni bir sayı eklenmemelidir.",
      },
      {
        prompt:
          "Bir larvanın boyu aynı kalırken daha önce bulunmayan işlevsel bir beslenme yapısı olgunlaşıyor. Bu gözlem hangi özelliğe doğrudan kanıttır?",
        correct: "Gelişme ve işlevsel olgunlaşma",
        wrong: [
          [
            "Birey sayısının artması",
            "Yeni bir organizma oluştuğu verilmemiştir.",
          ],
          [
            "Boyca büyümenin mutlaka gerçekleşmesi",
            "Boyun aynı kaldığı açıkça belirtilmiştir; yapı olgunlaşması için boy artışı zorunlu değildir.",
          ],
          [
            "Bütün metabolik tepkimelerin durması",
            "İşlevsel bir yapının olgunlaşması metabolizmanın yokluğunu göstermez.",
          ],
          [
            "Kalıtsal bilginin bütünüyle değişmesi",
            "Yeni bir işlevin gelişmesi bütün DNA’nın değiştiği anlamına gelmez.",
          ],
        ],
        knowledge: [
          "Gelişme yapı ve işlevin olgunlaşmasıdır; büyüme nicelik artışıyla ilişkilidir.",
        ],
        strategy:
          "Değişen ölçütü boy veya birey sayısı yerine işlev açısından oku.",
        steps: [
          "Boy ölçümü değişmemiştir.",
          "Yeni yapının işlevsel olgunluğu artmıştır.",
          "Doğrudan verilen bu değişim gelişme kavramıyla karşılanır.",
        ],
        reason:
          "Doğru. İşlev kazanımı gelişmeyi gösterir; aynı gözlem boy artışını gerektirmez.",
        commonError:
          "Gelişmeyi yalnız boy veya toplam kütle artışının başka adı saymak.",
        check:
          "Soru boy sabitken hangi özellikte değişim verdiğini açıkça ayır.",
      },
      {
        prompt:
          "Bir virüs parçacığı genetik materyal taşıyor fakat kendi ribozomu ve bağımsız ATP üretim sistemi yok; yeni parçacıkların oluşumu canlı konak hücre içinde gerçekleşiyor. Hangi yorum verilen sınırı korur?",
        correct:
          "Genetik bilgi taşımak tek başına virüsü prokaryot bir hücre yapmaz",
        wrong: [
          [
            "Çekirdeği olmadığı için kesin bir bakteridir",
            "Hücresiz virüs yapısı ile prokaryot hücre planı aynı sınıf değildir.",
          ],
          [
            "Genetik materyal taşıdığı için kendi ribozomuyla protein sentezler",
            "Kendi ribozomunun bulunmadığı soruda açıkça verilmiştir.",
          ],
          [
            "Konakta yeni parçacık oluşması, konak dışındaki bağımsız metabolizmayı kanıtlar",
            "Çoğalmanın konak içinde olması bağımsız ATP üretimini göstermez; soruda bu sistem yoktur.",
          ],
          [
            "Virüsün genomu her türde hem DNA hem RNA birlikte olmak zorundadır",
            "Virüs genomu türe göre DNA veya RNA olabilir; bu soru iki türün birlikte zorunlu olduğunu söylemez.",
          ],
        ],
        knowledge: [
          "Virüs hücresizdir; genom taşıma, bağımsız hücresel metabolizma ve ribozom varlığıyla aynı özellik değildir.",
        ],
        strategy:
          "Genetik bilgi verisini koru; verilmemiş hücresel yapılara genişletme.",
        steps: [
          "Genom varlığı kalıtsal materyal bulunduğunu gösterir.",
          "Kendi ribozomu ve bağımsız ATP sisteminin yokluğu hücresel organizmayla temel farkları verir.",
          "Bu yüzden yalnız genomdan prokaryot hücre sınıfına geçiş yapılamaz.",
        ],
        reason:
          "Doğru. Verilen hücresizlik ve konak bağımlılığı, basit çekirdeksiz hücre sınıflamasını engeller.",
        commonError:
          "Çekirdek yokluğunu hücre varlığını da kanıtlayan tek ölçüt olarak kullanmak.",
        check:
          "Seçim hem genom varlığına hem ribozom/bağımsız ATP yokluğuna uymalıdır.",
      },
      {
        prompt:
          "Bir araştırmada hücre A için ATP üretim yolu, B için besin kaynağı, C için yeni bağımsız birey oluşturma bilgisi kaydediliyor. Hangi kayıt, diğer ikisinden farklı olarak doğrudan soyun devamı ölçeğiyle ilgilidir?",
        correct: "C’de yeni bağımsız birey oluşması",
        wrong: [
          [
            "A’da ATP’nin hücresel işlere aktarılması",
            "ATP aktarımı bireyin yaşamsal işlerini sürdürmeye ilişkindir; tek başına yeni birey oluşturmaz.",
          ],
          [
            "B’de organik besinin dışarıdan alınması",
            "Besin edinmek büyüme ve bakımda kullanılabilir; bu kayıt üremeyi doğrudan belirtmez.",
          ],
          [
            "A ile B kayıtlarının birlikte bulunması",
            "Enerji ve besin bilgileri bir araya gelse de yeni birey oluştuğu kanıtı olmadan soy ölçeği sonucu zorunlu değildir.",
          ],
          [
            "Yalnız herhangi bir maddenin hücreye girmesi",
            "Madde girişi üreme hücreleri veya yeni birey oluşumu anlamına gelmez.",
          ],
        ],
        knowledge: [
          "Yeni organizma oluşması üreme ve soyun sürekliliğiyle; beslenme ve ATP aktarımı bireyin işlerinin sürmesiyle ilişkilidir.",
        ],
        strategy:
          "Sorunun istediği ölçeği seç ve doğrudan yeni birey verisini ara.",
        steps: [
          "A enerji aktarım yolunu tanımlar.",
          "B madde edinme biçimini tanımlar.",
          "C yeni birey oluşumunu verdiği için doğrudan soy devamı ölçeğine bağlanır.",
        ],
        reason:
          "Doğru. Yeni bağımsız birey bilgisi üreme ölçütünü doğrudan karşılar.",
        commonError:
          "Bireyin yaşamak için kullandığı her kaynağı yeni birey oluşumuyla eşitlemek.",
        check:
          "Soy yorumu yapan seçenekte yeni organizmanın oluşması açıkça bulunmalıdır.",
      },
      {
        prompt:
          "Bir hücrede DNA bilgisiyle enzimler yapılıyor; bu enzimler besin dönüşümüne katılıyor; elde edilen ATP de yeni yapı sentezinde kullanılıyor. Bu örnek hangi genel ilişkiyi destekler?",
        correct:
          "Kalıtsal bilgi, metabolizma ve enerji aktarımı birbirine bağlı işlevlerdir",
        wrong: [
          [
            "Canlılık özellikleri birbirini etkilemeyen bağımsız olaylardır",
            "Soruda bir sürecin ürününün diğer sürece katkısı açıkça gösterilmiştir.",
          ],
          [
            "ATP, DNA’nın bütün görevlerini devralır",
            "ATP enerji aktarımına katılır; bu rol kalıtsal bilgi taşıma görevinin yerine geçmez.",
          ],
          [
            "Enzimler yalnız hücrenin dışında bulunabilir",
            "Örnek hücre içindeki enzim ve metabolizma ilişkisini tanımlar; yalnız dış ortam sonucu çıkarılamaz.",
          ],
          [
            "Yeni yapı sentezi için hiçbir madde girdisi gerekmez",
            "ATP enerjisinin kullanılması, yapı maddelerinin ayrıca gerektiğini ortadan kaldırmaz.",
          ],
        ],
        knowledge: [
          "Hücresel işlevler birbirine bağlıdır; kalıtsal bilgi enzim yapımına, enzimler metabolizmaya, enerji aktarımı senteze katılabilir.",
        ],
        strategy:
          "Verilen süreç zincirinde her okun hangi katkıyı gösterdiğini izle.",
        steps: [
          "DNA bilgisi enzim üretimine iliştirilmiştir.",
          "Enzimlerin besin dönüşümüyle bağlantısı verilmiştir.",
          "ATP’nin yeni sentezde kullanılması zincirin işlevsel bütünlüğünü gösterir.",
        ],
        reason:
          "Doğru. Örnek, canlılık süreçlerinin aynı örgütlü sistemde karşılıklı katkısını gösterir.",
        commonError:
          "Bir molekülün katkısını gördüğünde diğer bütün yapı ve madde gereksinimlerini yok saymak.",
        check:
          "Doğru yorum zincirdeki üç bağlantıyı korumalı, bir molekülü bütün rollerin yerine koymamalıdır.",
      },
      {
        prompt:
          "Kontrollü bir kayıtta aynı hücrede bir saatte 24 birim organik yapı taşı yapılıyor ve 17 birim yapı taşı bir sentezde kullanılıyor. Başlangıç serbest stok 6 birim; başka giriş veya çıkış yok. Son serbest stok ve çıkarım hangisidir?",
        correct: "13 birim; yapım ile kullanım aynı sürede birlikte sürmüştür",
        wrong: [
          [
            "7 birim; başlangıç stoku sonucu etkilemez",
            "24−17=7 net değişimdir; başlangıçtaki 6 eklenince son stok 13 olur.",
          ],
          [
            "47 birim; üretim ve kullanım toplanır",
            "6+24+17=47 tüketimi stok girişi gibi eklemekten doğar.",
          ],
          [
            "13 birim; hücrede hiçbir sentez gerçekleşmemiştir",
            "Sayı doğru olsa da 17 birimin sentezde kullanıldığı açıkça verilmiştir.",
          ],
          [
            "30 birim; sentez için kullanılan madde stoktan düşmez",
            "6+24=30 toplam kaynaktır; harcanan 17 serbest stokta kalmaz.",
          ],
        ],
        knowledge: [
          "Serbest madde stoku başlangıç ve akışlarla hesaplanır; aynı sürede üretim ve kullanım bulunabilir.",
        ],
        strategy:
          "Serbest stok sınırını çizerek senteze aktarılan miktarı çıkış olarak yaz.",
        steps: [
          "Kaynağa eklenen miktarla toplam serbest kaynak 6+24=30 birimdir.",
          "Senteze geçen 17 birim serbest stoktan çıkar.",
          "Son serbest stok 30−17=13; hem üretim hem sentez kullanımı sürmüştür.",
        ],
        reason:
          "Doğru. Bilanço serbest stok için kurulmuştur; senteze aktarım kaybolan madde değil farklı yapıya geçen maddedir.",
        commonError:
          "Serbest stokla bütün hücredeki toplam maddeyi aynı sınır içinde saymak.",
        check:
          "Son serbest stok 13 ve senteze aktarılan 17 birlikte toplam 30 kaynağı karşılamalıdır.",
      },
    ],
  },
  {
    id: "bilimsel-yontem",
    topic: "detail-2",
    title: "Bilimsel yöntem: veri, deney ve çıkarımlarla ileri uygulama",
    minutes: 70,
    objectives: [
      "Gözlem, açıklama ve tahmini işlevleriyle ayırarak sınanabilir bir araştırma sorusu kur.",
      "Değişken, karşılaştırma grubu ve bağımsız deney birimini belirle.",
      "Oran, ortalama ve grafiklerden verinin izin verdiği sonucu çıkar.",
      "Karıştırıcı etken, ölçüm yanlılığı ve genelleme sınırını somut karşı örnekle denetle.",
    ],
    source:
      "Aurelia TYT Biyoloji Bilimsel Yöntem ve Çalışma Basamakları kopya kâğıdı, s. 1–12. Araştırma tasarımları, sayısal veriler, deney modelleri, çözümlü örnekler ve ileri sorular özgündür; yapılmış laboratuvar çalışması veya resmî sınav sorusu olarak sunulmaz. Kaynağın atıf yaptığı bütün dış yayınların ayrıca doğrulandığı iddia edilmez.",
    sections: [
      {
        title: "Bir soru ile başla, tek ezber sıraya kilitlenme",
        paragraphs: [
          "Bilimsel araştırma, doğal olaylara ilişkin açıklamaları gözlem ve ölçümlerle sınar. Bir problem fark edilir, soru daraltılır ve ilgili kanıt aranır. Araştırmanın her zaman tek çizgili bir sırayı izlemesi gerekmez; deney sırasında beklenmedik bir sonuç yeni bir soruya götürebilir.",
          "Gözlem kaydedilen olay veya ölçüm, çıkarım bu verinin anlamına ilişkin yorumdur. “Kapta sekiz filiz var” bir sayım; “bu kap daha uygun sıcaklıkta olduğu için çok filiz var” açıklama iddiasıdır. Aynı cümlede verilen veriyle ona eklenen nedeni ayrı işaretle.",
        ],
      },
      {
        title: "Hipotez, tahmin ve ölçüm",
        paragraphs: [
          "Hipotez gözlemleri açıklamak üzere önerilen, sınanabilir bir açıklamadır. Tahmin ise hipotez ve koşullar doğruysa beklenen gözlenebilir sonucu söyler. Bir tahminde sonuç ölçütü, karşılaştırma ve süre belirli olmalıdır; yalnız olumlu bir beklenti yazmak yeterli sınama kurmaz.",
          "“Bu türde tuz artışı su alımını azaltır” yönlü açıklama adayıdır. “Aynı koşullarda tuz düzeyi yüksek grupta 48 saat sonunda alınan su daha az olacak” ölçülebilir tahmindir. Sonuç ölçüldükten sonra veri kaydı oluşur; beklenen ile gözlenen aynı bilgi türü değildir.",
        ],
      },
      {
        title: "Neyi değiştirdin, neyi ölçtün?",
        paragraphs: [
          "Araştırmacının etkisini sınamak üzere değiştirdiği koşul bağımsız değişkendir. Kaydettiği sonuç bağımlı değişken, karşılaştırmayı bozmasın diye eş tuttuğu özellikler kontrol edilen değişkenlerdir. Bu roller bir sözcüğün kalıcı özelliği değildir; her araştırmanın sorusuna göre belirlenir.",
          "Bir düzende sıcaklık ayarlanıp büyüme ölçülürse sıcaklık bağımsızdır. Başka düzende ışık değiştirilip yaprak sıcaklığı ölçülürse sıcaklık bağımlıdır. Kontrol grubu ise bir özellik değil, sonuçların kıyaslandığı referans gruptur. Bu iki kontrol anlamını aynı terim gibi kullanma.",
        ],
      },
      {
        title: "Karşılaştırmayı bozacak ikinci değişkeni ara",
        paragraphs: [
          "İki grup hem ışık hem su bakımından farklıysa sonuç farkı yalnız birine yüklenemez. Bu karışmayı fark etmek için grupları satırlara, koşulları sütunlara yaz. Hedef faktör dışında değişen sütunlar, alternatif açıklama olasılığını gösterir.",
          "Tekrarlar bireysel değişkenliği görmeye yardım eder; aynı yanlış kurguya daha çok örnek eklemek karıştırıcı etkeni kendiliğinden gidermez. Tür, başlangıç durumu, süre ve ölçüm yolu gibi koşullardan hedef faktör dışında kalanlar mümkün olduğunca aynı tutulur veya denetlenir. Rastgele atama, sistematik grup farkını azaltmaya katkı verir fakat her hatayı sıfırlayan bir işlem değildir.",
        ],
      },
      {
        title: "Destek, kanıt ve genellemenin sınırı",
        paragraphs: [
          "Uygun sonuç hipotezi destekleyebilir; tek deney bütün olası tür, süre ve koşullarda mutlak doğruluk sağlamaz. Tahminle çelişen sonuçta önce kurgu ve ölçüm denetlenir; gerekirse açıklama değiştirilir. Veriyi saklamak veya sırf hipoteze uysun diye değiştirmek bilimsel onarım değildir.",
          "Teori geniş kanıtları birleştiren açıklayıcı çerçevedir; gündelik dildeki rastgele tahmin değildir. Yasa belirli koşullarda bir düzenliliği betimleyebilir. Hipotez yeterince tekrar edilince otomatik olarak teoriye, teori de yasaya terfi etmez; açıklama ve betimleme rollerini ayır.",
        ],
      },
      {
        title: "Nitel ve nicel gözlem",
        paragraphs: [
          "“Yaprak sarıdır” nitel, “yaprak 76 mm uzundur” nicel kayıttır. Sayı, birim ve ölçüm yöntemi nicel veriyi yorumlamayı sağlar. Fakat sayı kullanılması kaydın hatasız olduğunu garanti etmez; yanlış ayarlı araç da sayısal değer verir.",
          "Nicel karşılaştırmada birimleri eşitle. Santimetre ve milimetre farklı sayı gösterse de aynı uzunluğu anlatabilir. Bir gözlemin nitel veya nicel oluşu, yorumun nedensel gücünden ayrıdır: büyük örneklemle kaydedilmiş ilişki bile başka etkilerden kaynaklanabilir.",
        ],
      },
      {
        title: "Ölçülen sonucu açık tanımla",
        paragraphs: [
          "“Gelişme daha iyi” gibi geniş bir ifade tek ölçüm değişkeni değildir. Araştırmacı kök uzunluğu, kuru kütle veya belirli sürede çimlenen tohum sayısı gibi işlemsel bir ölçüt tanımlar. Bir ölçütü seçince bütün gruplarda aynı yöntem ve zamanda uygulamak gerekir.",
          "Çimlenme ölçütü kökün belirli düzeyde görünmesi olarak verilmişse yeşil yaprak açmayı aynı sayımın yerine koyma. İşlemsel tanım, bir kavramı bu çalışmada nasıl gözleyip ölçeceğini açıklar. Kavramın bütün biyolojik boyutlarını tek sayıyla eksiksiz temsil ettiği iddiası taşımaz.",
        ],
      },
      {
        title: "Sınanabilir açıklama ne gerektirir?",
        paragraphs: [
          "Bir hipotezin verilerle karşılaşabilen sonuçları olmalıdır. Hiçbir ölçümün farklılaşamayacağını söyleyen bir iddia, mevcut biçimiyle deneysel ayırt etme sağlamaz. “Hangi gözlem bu açıklamayı gözden geçirmemi gerektirir?” sorusu sınamanın somutlaşmasına yardım eder.",
          "Olumsuz sonuç açıklamayı her zaman tek başına çürütmez; uygulanan düzenek beklenen koşulu gerçekten kurmamış olabilir. Bu nedenle müdahalenin çalıştığına dair denetim ve uygun ölçüm gerekir. Her çelişkide görünmez bir ek gerekçeyle iddiayı korumak da güçlü sınama oluşturmaz.",
        ],
      },
      {
        title: "Yarışan açıklamaları ayır",
        paragraphs: [
          "Aynı veri birden fazla açıklamayla uyumlu olabilir. Bir çözeltide büyüme artışı besin etkisinden de, değişen pH’dan da doğabilir. Açıklamaları adlandırmak yeterli değildir; bunların farklı sonuç öngördüğü bir karşılaştırma tasarlamak gerekir.",
          "Besin miktarını değiştirirken pH’yı eş tutmak veya pH etkisini ayrı gruplarda sınamak iki açıklamayı ayırmaya yardım eder. Böyle bir tasarımda hangi grupların hangi farkı taşıdığı açıkça belirtilir. Ortak tahmini bir kez daha ölçmek, aynı tahmini veren iki modeli kendiliğinden ayırmaz.",
        ],
      },
      {
        title: "Referans grup her zaman boş değildir",
        paragraphs: [
          "Kontrol grubu bazen yalnız taşıyıcı sıvıyı, bazen etkisi bilinen bir uygulamayı içerebilir. Hedef maddenin etkisi aranıyorsa taşıyıcı sıvı ve işlem koşulları da karşılaştırılmalıdır. “Hiçbir şey yapmadım” grubu, farklı taşıyıcı etkisini her durumda denetlemez.",
          "Negatif kontrol, aranan etki oluşmadığında ölçümün nasıl göründüğünü; pozitif kontrol, düzenek işlediğinde beklenen yanıtın elde edilebildiğini gösterebilir. Bu roller araştırmaya göre tanımlanır. Bir kontrolün eksikliğiyle bütün veriyi çöpe atmak yerine hangi çıkarımın zayıfladığını söyle.",
        ],
      },
      {
        title: "Rastgele atama ile örnek seçimini ayır",
        paragraphs: [
          "Gruplara rastgele atama, başlangıçtaki birey özelliklerinin tek bir uygulama grubunda yığılmasını azaltmaya yardım eder. Örneklemin rastgele seçimi ise incelenen daha geniş topluluğun temsil edilmesiyle ilgilidir. Biri diğerinin yerine geçen aynı işlem değildir.",
          "Yalnız bir sera köşesindeki bütün fideleri uygulama grubuna ayırmak konum etkisini müdahaleyle karıştırabilir. Fideleri gruplara rastgele dağıtmak bu riski azaltır; yine de konum, bakım ve ölçüm düzeni açıklanmalıdır. Seçim ve atama bilgisi verilmemişse bunları yapılmış varsayma.",
        ],
      },
      {
        title: "Deney birimini say",
        paragraphs: [
          "Aynı kaptaki on tohum aynı suyu ve kap koşulunu paylaşabilir. On tohum ölçmek, on ayrı bağımsız kapta kurulmuş on uygulama tekrarıyla aynı tasarım değildir. Deney birimi, müdahalenin bağımsız uygulandığı birimdir; gözlem birimiyle ayrımı önemlidir.",
          "Bir yapraktaki çok sayıda hücreyi ölçmek ayrıntılı veri sağlar; yalnız bu sayı bütün bitkiler için bağımsız tekrar sayısını artırmaz. Soruda bağımsız kap veya birey bilgisi verildiğinde o sınırı kullan. Çok veri noktası görmek, bağımsız doğrulama sayısını otomatik olarak söylemez.",
        ],
      },
      {
        title: "Tekrar neyi düzeltir, neyi düzeltmez?",
        paragraphs: [
          "Tekrarlı ölçümler rastlantısal değişkenliği değerlendirmeye ve bir ortalama oluşturmaya yardım eder. Ölçümlerin birbirine yakın olması tutarlılığı gösterir; gerçek değere yakınlık için referans veya kalibrasyon bilgisi de gerekir. Tutarlı ama aynı yönde kaymış ölçümler mümkündür.",
          "Aynı bozuk aracı tekrar tekrar kullanmak sabit kaymayı sürdürür. Bağımsız araştırmacının uygun araç ve yöntemle benzer sonucu elde etmesi farklı bir doğrulama katkısıdır. Tekrar sayısı arttığında neden-sonuç yorumundaki karıştırıcıların veya yanlış ölçüm ölçütünün kendiliğinden yok olduğu söylenemez.",
        ],
      },
      {
        title: "Kalibrasyonda iki hata türünü gör",
        paragraphs: [
          "Kalibrasyon, ölçüm aracının bilinen referanslarla kontrol edilmesidir. Sabit kayma her değere aynı miktarı ekleyebilir; ölçek hatası farklı büyüklükleri belirli bir çarpanla değiştirebilir. Tek bir referans bazı hataları ayırmaya yetmeyebilir.",
          "Örneğin bilinen kısa ve uzun iki referans, aynı ek kayma ile oransal sapmayı ayırmakta daha çok bilgi sağlar. Düzeltme kuralı ancak verilen aralık ve modelde kullanılmalıdır. Aracın küçük uzunluklarda doğrulanması, çok daha büyük bütün ölçümlerde aynı doğruluğu garanti etmez.",
        ],
      },
      {
        title: "Sayım, oran ve yüzde",
        paragraphs: [
          "Bir sonuç sayısı, toplam örnek sayısından ayrı okunmalıdır. Başlangıçtaki tohum sayıları farklıysa daha fazla çimlenen tohum her zaman daha yüksek çimlenme oranı demek değildir. Oran=sonuç sayısı/toplam uygun sayı; yüzde bu oranın yüzle çarpımıdır.",
          "Yüzde puan farkı ile göreli değişim aynı nicelik değildir. Bir oranın %30’dan %45’e çıkması 15 yüzde puan fark, başlangıca göre %50 artıştır. Göreli değişimde payda başlangıçtır; başlangıç sıfırsa bu bölme formülü kullanılamaz. Sonucun birimini mutlaka yaz.",
        ],
      },
      {
        title: "Ortalama dağılımın tamamı değildir",
        paragraphs: [
          "Aritmetik ortalama, ölçümlerin toplamının ölçüm sayısına bölümüdür. İki grubun ortalaması aynıyken bireysel ölçümleri farklı yayılabilir. Sonuçların dağılımı ve örnek sayısı bilinmeden ortalamaların aynı olmasıyla bütün bireylerin aynı olduğu çıkarılamaz.",
          "Büyüklükleri farklı iki grubun ortak ortalaması, grup ortalamalarının basit ortalaması olmak zorunda değildir. Her grubun ölçüm sayısı ağırlık oluşturur. Bir tabloda tek özet sayı varsa ham verinin tamamını uydurma; hata çubuğunun neyi anlattığı belirtilmemişse ona kesin bir istatistik anlamı yükleme.",
        ],
      },
      {
        title: "Grafiği eksen ve aralıkla oku",
        paragraphs: [
          "Grafikte önce yatay ve düşey ekseni, birimi ve gösterilen örnekleri belirle. Düşey ekseni yüksek bir değerden başlatmak küçük farkları görsel olarak büyük gösterebilir. Sayısal fark değişmez; görsel izlenimle hesap sonucunu karıştırma.",
          "Ölçülen noktaları birleştiren çizgi, aradaki her koşulun ayrı ayrı ölçüldüğünü göstermez. Ölçüm aralığı dışında kalan bir doz veya sıcaklık için kesin sayı vermek ek modele dayanır. “Ölçülen en yüksek” sonuç ile “bu türün her koşuldaki kesin optimumu” aynı iddia değildir.",
        ],
      },
      {
        title: "Faktörlerin etkisi koşula bağlı olabilir",
        paragraphs: [
          "İki faktörlü bir düzende ışık ve suyun düşük-yüksek düzeyleri ayrı kombinasyonlarda denenebilir. Bu kurgu, ışık etkisini her su düzeyinde ayrı hesaplamaya olanak verir. İki karşılaştırmanın farkı eşit değilse ışık etkisi bu verilerde su düzeyine göre değişmektedir.",
          "Bu değişim, her faktörün tek başına sabit bir etki eklediği varsayımının yetersiz olduğunu gösterebilir. Etkileşim yorumunu tabloya dayandır; bütün biyolojik mekanizmayı yalnız dört özet değerden tanımlama. Grupların diğer koşulları ve bağımsız tekrarları yine denetlenmelidir.",
        ],
      },
      {
        title: "Birlikte değişme ve neden",
        paragraphs: [
          "Korelasyon iki niceliğin ilişkili değişmesidir. Birinin diğerine neden olması daha güçlü bir iddiadır. Sıcak ve aydınlık ortamlardaki fidelerin daha uzun olması, ışığın tek neden olduğunu göstermez; sıcaklık veya başka bir koşul da açıklamaya katılabilir.",
          "Kontrollü müdahale nedensel yorumu güçlendirebilir. Ancak bir etkenin değiştirilmesiyle birlikte başka etkiler de değişiyorsa sonuç yine karışabilir. Soru hangi etkenin bağımsız değiştirildiğini ve hangilerinin eş tutulduğunu vermelidir; verilmeyen kontrol bilgilerini hayal ederek tamamlamama alışkanlığı edin.",
        ],
      },
      {
        title: "Gözlenmedi ile etkisiz aynı iddia değildir",
        paragraphs: [
          "Bir deneyde iki grubun ortalamaları aynı ölçülmüş olabilir. Bu veri, verilen koşullardaki özetlerin eşitliğidir. Ölçüm duyarlılığı, dağılım, örnek sayısı ve tasarım sınırları bilinmeden her koşulda hiçbir etki olamayacağı sonucuna genişletilmez.",
          "Bir etkenin sınanmamış olması da onun gereksizliğini göstermez. Veri yokluğu ile etkinin yokluğu ayrı tutulur. Sınavda “kesin”, “bütün”, “yalnız” gibi kapsam sözcüklerini, verinin gerçekten sınadığı aralık ve toplulukla karşılaştırmak bu ayrımı somutlaştırır.",
        ],
      },
      {
        title: "Kaydı açık tut, sonucu sonradan seçme",
        paragraphs: [
          "Bilimsel kayıt yöntem, örnek sayısı, ölçüm, dışlama ölçütü ve sonucun sınırlarını açık tutar. İstenmeyen verileri gerekçesiz çıkarmak, yapılmayan deneyi yapılmış göstermek veya başkasının verisini kendi ölçümü gibi sunmak geçerli değildir. Hatalı kayıt fark edilirse düzeltmenin nedeni görünür olmalıdır.",
          "Bir çıkarımın güçlü olması sadece son sayının doğru hesaplanmasına bağlı değildir. Örnek seçimi, ölçüm tanımı ve eksik kayıtlar da değerlendirilir. Bu rehberdeki sayılar öğretim içindir; kontrol mantığını öğreten kurgular gerçek laboratuvar çalışmasının kanıtı olarak kullanılamaz.",
        ],
      },
      {
        title: "Yeni soruyla dönen araştırma",
        paragraphs: [
          "Bir sonuç beklenenden farklıysa araştırma süreci soruya geri dönebilir. Yeni bir değişken fark edilip ayrı sınama kurulabilir; ölçüm aracının sorunu giderildikten sonra aynı açıklama yeniden denenebilir. Döngü, düşüncenin veriye göre düzeltilmesini sağlar; basamak ezberini bozduğu için yanlış sayılmaz.",
          "Son değerlendirmede üç ayrı soru sor: veri ne gösteriyor, açıklama neyi öngörüyor, kurgu bu ikisini ayırabiliyor mu? Bu üçlü, hem pozitif destek hem karşı sonuç için kullanılır. Birden fazla çalışmayı ilişkilendiren geniş açıklama ise tek bir ölçümün sonucundan daha kapsamlı kanıt gerektirir.",
        ],
      },
    ],
    examples: [
      {
        title: "İki referanstan ölçüm kuralına",
        prompt:
          "Doğrusal okuma modeli R=aL+b veriliyor. Bilinen 20 mm referans 27 mm, 50 mm referans 63 mm okunuyor. Aynı aralıkta bir örnek 45 mm okunursa düzeltilmiş uzunluğu nedir? Aynı a ve b’nin geçerli olduğu varsayılır.",
        strategy:
          "Önce iki referansın farkından ölçeği, sonra sabit kaymayı çıkar.",
        steps: [
          {
            label: "Adım 1",
            explanation: "63−27=a×(50−20) olduğundan a=36/30=1,2 bulunur.",
          },
          {
            label: "Adım 2",
            explanation: "27=1,2×20+b eşitliğinden b=3 mm’dir.",
          },
          {
            label: "Adım 3",
            explanation: "45=1,2 L+3 olduğundan L=42/1,2=35 mm elde edilir.",
          },
        ],
        answer: "Düzeltilmiş uzunluk 35 mm",
        check: "1,2×35+3=45; iki referans da aynı kuralı sağlamalıdır.",
        pitfall:
          "Okumadan yalnız 3 mm çıkarıp ölçek çarpanını düzeltmeden 42 mm sonucunu vermek.",
      },
      {
        title: "Eksik hücreyi varsayımla tamamla",
        prompt:
          "İki faktörlü bir modelde X düşük/Y düşük için yanıt 4; X yüksek/Y düşük için 9; X düşük/Y yüksek için 7. Soruda X ile Y etkilerinin bu aralıkta bağımsız ve toplamsal olduğu özellikle kabul ediliyor. X yüksek/Y yüksek için model tahmini kaçtır?",
        strategy:
          "Tek faktör farklarını ortak başlangıçtan çıkar; verilen toplamsallık koşuluyla ekle.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "X’in düşük Y’de farkı 9−4=5; Y’nin düşük X’te farkı 7−4=3’tür.",
          },
          {
            label: "Adım 2",
            explanation:
              "Toplamsal modelde yüksek-yüksek tahmini 4+5+3=12 olur.",
          },
          {
            label: "Adım 3",
            explanation:
              "12 ölçülmüş veri değildir; toplamsallık varsayımının sınanabilir tahminidir.",
          },
        ],
        answer: "Model tahmini 12",
        check:
          "Gerçek yüksek-yüksek ölçüm farklı çıkarsa varsayımın uygunluğu ayrıca değerlendirilir.",
        pitfall:
          "Eksik sonucu ölçülmüş gibi sunmak veya toplamsallık verilmeden aynı toplamı zorunlu saymak.",
      },
      {
        title: "İki açıklamayı ayıran kontrol",
        prompt:
          "Bir hazırlık bitki uzamasını artırıyor. H₁: etki hazırlıktaki besinden; H₂: etki hazırlığın pH’yı değiştirmesinden kaynaklanıyor. İki hipotezi ayırmak için eklenecek en az bir karşılaştırmayı öner. pH ve besin diğer koşulları değiştirmeden ayrı ayarlanabiliyor kabul edilir.",
        strategy: "Açıklamaların farklı sonuç öngördüğü bir koşul yarat.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Başlangıç gözlemi besin ve pH etkisiyle aynı anda uyumlu olabilir.",
          },
          {
            label: "Adım 2",
            explanation:
              "Besinli ve besinsiz grupları aynı pH’ya ayarlayıp diğer koşulları eş tutmak besin katkısını ayrı sınar.",
          },
          {
            label: "Adım 3",
            explanation:
              "Ayrıca besinsiz gruplarda pH’yı değiştirmek pH açıklaması için ayrı kanıt sağlar; yalnız orijinal hazırlığı tekrar vermek iki nedeni ayırmaz.",
          },
        ],
        answer:
          "Aynı pH’da besinli–besinsiz veya aynı besinde farklı pH karşılaştırması",
        check:
          "Önerilen çiftte hedef dışındaki koşullar gerçekten eş tutulmalıdır.",
        pitfall:
          "Her hipotezin aynı artışı beklediği ilk düzeni çoğaltarak açıklamaların ayrıldığını sanmak.",
      },
      {
        title: "Grupları birleştirirken paydaları koru",
        prompt:
          "A grubunda 30 örneğin 21’i, B grubunda 70 örneğin 28’i aynı ölçütü sağlıyor. İki grubun bütün örnekleri tek kümede ele alınırsa oran nedir? Gruplar kendi sayılarıyla temsil ediliyor.",
        strategy:
          "Önce uygun örnek sayılarını ve toplam örnek sayılarını birleştir.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Olumlu toplam 21+28=49; örnek toplamı 30+70=100’dür.",
          },
          {
            label: "Adım 2",
            explanation: "Ortak oran 49/100=%49 bulunur.",
          },
          {
            label: "Adım 3",
            explanation:
              "Grup yüzdeleri%70 ve%40’ın basit ortalaması%55’tir; grup büyüklükleri eşit olmadığı için ortak oran yerine geçmez.",
          },
        ],
        answer: "Birleşik oran%49",
        check:
          "49 sonucu 100 kişilik toplamın sayımıyla uyuşur; her gruba yapay olarak eşit ağırlık verilmez.",
        pitfall:
          "İki grup yüzdesini örnek sayılarından bağımsız biçimde ortalamak.",
      },
      {
        title: "Bağımsız tekrar için yeniden düzenle",
        prompt:
          "Başlangıçta her uygulama için tek kap ve her kapta 12 tohum var. Tasarımcı uygulama başına 4 bağımsız kapta, kap başına 3 tohumla aynı toplam tohumu kullanmayı öneriyor. Tohum ve bağımsız uygulama birimi sayıları nasıl değişir?",
        strategy:
          "Her uygulama için toplam tohumla müdahalenin bağımsız uygulandığı kap sayısını ayrı say.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "İlk kurguda 12 tohum vardır fakat müdahale tek bir kapta uygulanır.",
          },
          {
            label: "Adım 2",
            explanation: "Yeni kurguda 4×3=12 tohum ve 4 ayrı kap bulunur.",
          },
          {
            label: "Adım 3",
            explanation:
              "Toplam tohum aynı kalırken bağımsız kap sayısı 1’den 4’e çıkar; aynı kaptaki tohumları ayrı kap tekrarı sayma sorunu azalır.",
          },
        ],
        answer: "Tohum sayısı 12 ile aynı; bağımsız kap sayısı 1’den 4’e çıkar",
        check:
          "Yeni kapların uygulama ve konum koşulları da uygun biçimde kurulmalıdır; kap çoğaltmak bütün yanlılığı gidermez.",
        pitfall:
          "Toplam 12 tohum değişmediği için tasarımın hiçbir bilgi katkısı değişmediğini söylemek.",
      },
      {
        title: "Beklenmeyen sonucu araştırma sorusuna çevir",
        prompt:
          "Bir çalışmada tüm işlem grupları kontrolden düşük değer veriyor; sonradan işlem gruplarına ortak çözücü verildiği, kontrole verilmediği fark ediliyor. İlk çalışmanın verisini koruyarak sonraki en doğrudan düzeltme nedir?",
        strategy:
          "İşlemle birlikte değişen ortak etkeni ayrı kontrol grubuyla denetle.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "İşlem grupları hedef maddeye ek olarak aynı çözücüyü taşır.",
          },
          {
            label: "Adım 2",
            explanation:
              "Kontrolün aynı çözücüyü aynı miktarda alması, hedef madde dışındaki ortak farkı azaltır.",
          },
          {
            label: "Adım 3",
            explanation:
              "Yeni kontrollü çalışma kurulur; önceki veri silinmez ve önceki düşük sonuçlar yalnız hedef maddeye kesin bağlanmaz.",
          },
        ],
        answer:
          "Aynı çözücüyü içeren uygun referans eklemek ve hedef maddeyi bu referansla kıyaslamak",
        check:
          "Yeni referansta süre, çözücü miktarı ve diğer işlemler de eş tutulmalıdır.",
        pitfall:
          "İstenmeyen ilk sonuçları kayıttan çıkarıp hipotezin doğrulandığını yazmak.",
      },
    ],
    recall: [
      {
        prompt: "Bir tahmini bir ölçüm kaydından nasıl ayırırsın?",
        answer:
          "Tahmin belirli koşullarda beklenen gözlemi söyler; ölçüm kaydı gerçekleşen gözlemdir. Cümlenin zamanı ve işlevi okunur; yalnız “eğer” sözcüğüne bakılmaz.",
      },
      {
        prompt: "Kontrol grubu ile kontrol edilen değişkenin farkı nedir?",
        answer:
          "Kontrol grubu sonuç kıyaslaması için seçilen referanstır. Kontrol edilen değişken ise gruplarda aynı tutulmuş tür, süre veya sıcaklık gibi bir özelliktir.",
      },
      {
        prompt:
          "Aynı kaptaki çok sayıda ölçüm neden aynı sayıda bağımsız kap demek değildir?",
        answer:
          "Ölçümler ortak kap koşulunu paylaşır. Müdahalenin bağımsız uygulandığı kap sayısı ayrıca sayılmalıdır; gözlem sayısı bağımsız tekrar sayısına otomatik eşit değildir.",
      },
      {
        prompt: "Tekrarlar birbirine çok yakınsa araç kesin doğru mudur?",
        answer:
          "Yakın değerler tutarlılığı gösterebilir; aynı sabit veya ölçek hatası bütün ölçümlerde korunabilir. Doğruluk için bilinen referanslarla kontrol gerekir.",
      },
      {
        prompt:
          "Grafikteki en yüksek ölçüm neden kesin biyolojik optimum olmayabilir?",
        answer:
          "Ölçümler belirli düzeylerle sınırlıdır; aradaki veya dışarıdaki koşullar ölçülmemiş olabilir. Tür, süre ve belirsizlik de genel optimum iddiasını sınırlar.",
      },
      {
        prompt: "Aynı ortalama neden her koşulda “etki yok” kanıtı değildir?",
        answer:
          "Özet eşitliği ölçüm duyarlılığı, dağılım, örnek sayısı ve tasarımdan ayrı yorumlanamaz. Verinin gösterdiği eşit ortalama, her düzey ve topluluk için yokluk iddiasına çevrilmez.",
      },
    ],
    items: [
      {
        prompt:
          "Kayıtta I: “Düşük mineralli kaptaki yaprakların altısı sarı.” II: “Sarı rengin tek nedeni bu mineralin eksikliğidir.” Hangi ayrım uygundur?",
        correct: "I gözlem kaydı, II nedensel çıkarımdır",
        wrong: [
          [
            "I hipotez, II doğrudan sayımdır",
            "Altı yaprağın sarı olması sayım-gözlem; tek neden iddiası ise ölçümden öte bir açıklamadır.",
          ],
          [
            "Her ikisi de yalnız ölçüm verisidir",
            "II’de görünüşün nedeni hakkında ek yorum vardır; doğrudan sayım değildir.",
          ],
          [
            "I sayı içerdiği için bütün nedenleri kanıtlar",
            "Sayısal kayıt nedenlerin tekliğini veya başka etkenlerin yokluğunu göstermez.",
          ],
          [
            "II’nin “tek” demesi çıkarımı otomatik doğrular",
            "Kesinlik sözcüğü kanıt yerine geçmez; başka açıklamaları dışlayan kurgu gerekir.",
          ],
        ],
        knowledge: [
          "Gözlem kaydedilen olaydır; nedensel çıkarım olayın açıklamasına ilişkin yorumdur.",
        ],
        strategy: "Doğrudan kaydedilen özelliği, neden ekleyen ifadeden ayır.",
        steps: [
          "I’de yaprak rengi ve bu rengi taşıyan yaprak sayısı kaydedilmiştir.",
          "II’de bu görünüşün yalnız bir nedeninin bulunduğu iddia edilmiştir.",
          "Birinciyi gözlem, ikinciyi çıkarım olarak sınıflamak verinin ve açıklamanın rolünü korur.",
        ],
        reason:
          "Doğru. Sayım kaydı ile tek neden iddiası farklı bilgi türleridir.",
        commonError:
          "Sayısal ilk cümleden ikinci cümlenin tek neden iddiasının da doğrudan ölçüldüğünü sanmak.",
        check:
          "“Neden” iddiasını kaldırınca kalan doğrudan kayıt yalnız I’dir.",
      },
      {
        prompt:
          "Hipotez: “Bu türde belirli aralıktaki tuz artışı su alımını azaltır.” Hangi cümle, aynı hipotezin sınanabilir bir tahminidir?",
        correct:
          "Diğer koşullar eşken yüksek tuz grubunun 48 saat sonunda aldığı su düşük tuz grubundan az olacaktır",
        wrong: [
          [
            "Yüksek tuz grubu 48 saatte 4 mL su aldı",
            "Bu cümle gerçekleşmiş ölçümü bildirir; tahmin değil sonuç kaydıdır.",
          ],
          [
            "Bütün doğal olayların gizli ve ölçülemeyen nedeni vardır",
            "Belirli tuz-su alımı hipotezinden ölçülebilir karşılaştırma çıkarmaz.",
          ],
          [
            "Araştırmacı su alımını merak ediyor",
            "Araştırma ilgisi bir beklenen sonuç veya ölçüm yönü tanımlamaz.",
          ],
          [
            "Tuz kesinlikle her canlıda her miktarda zararlıdır",
            "Verilen tür ve belirli aralık sınırını aşar; ölçülebilir sınırlı tahmin yerine evrensel hüküm kurar.",
          ],
        ],
        knowledge: [
          "Tahmin, hipotezin belirli koşullarda beklettiği ölçülebilir sonucu ifade eder.",
        ],
        strategy: "Tür, karşılaştırma, süre ve beklenen yönü bir arada ara.",
        steps: [
          "Hipotez tuz artınca su alımının azalacağını belirtiyor.",
          "Uygun tahmin aynı diğer koşullarda düşük-yüksek tuz gruplarını kıyaslamalıdır.",
          "48 saatlik su miktarı ve beklenen azalma bu öngörüyü ölçülebilir yapar.",
        ],
        reason:
          "Doğru. Aynı hipotezin yönünü belirli karşılaştırma ve süreye taşır.",
        commonError:
          "Geçmiş zamanda ölçülmüş sonucu henüz sınanacak tahminle eşitlemek.",
        check:
          "Tahmin gerçekleşmemiş olsa bile hangi veriyle karşılaştırılacağı açık olmalıdır.",
      },
      {
        prompt:
          "Bir açıklama“Etken Z var; fakat Z hiçbir gözlem veya ölçümde fark oluşturamaz” biçiminde kuruluyor. Bu haliyle temel yöntem sorunu nedir?",
        correct:
          "Z’nin varlığı ve yokluğu için ayırt edici gözlenebilir sonuç tanımlanmamıştır",
        wrong: [
          [
            "Açıklamada sayı bulunmaması onu zorunlu yanlış yapar",
            "Nitel sonuçlarla da sınanabilir açıklama kurulabilir; temel eksik sayı zorunluluğu değildir.",
          ],
          [
            "Hiç deney yapılmadan bir bilimsel yasa kesinleşmiştir",
            "Ayırt edici sonuç yokluğu yasa veya kesinlik oluşturmaz.",
          ],
          [
            "Daha çok aynı ölçüm otomatik olarak Z’yi kanıtlar",
            "Z hiçbir ölçüm farkı öngörmüyorsa aynı ölçümü artırmak iki durumu ayırmaz.",
          ],
          [
            "Z’nin harfle adlandırılması bilimsel değildir",
            "Değişkene harf verilmesi yöntem sorunu değildir; ölçülebilir öngörünün yokluğu sorundur.",
          ],
        ],
        knowledge: [
          "Sınama için alternatif durumların farklı gözlem veya ölçüm öngörüleri bulunmalıdır.",
        ],
        strategy: "İddianın hangi sonuçta destekten ayrılabileceğini sorgula.",
        steps: [
          "Z var ve yokken bütün gözlemler aynı kalacak denmektedir.",
          "Bu haliyle veri iki açıklama durumunu ayıramaz.",
          "Eksik olanı adın biçimi değil, ayırt edici gözlenebilir sonuç olarak tanımla.",
        ],
        reason:
          "Doğru. İddia mevcut biçimiyle deneysel bir fark öngörmediğinden ayırt etme sağlamaz.",
        commonError:
          "Bilimselliği yalnız sayı veya teknik ad bulunmasına bağlamak.",
        check:
          "Seçenek, Z var/yok durumlarında hangi farklı verinin beklendiği sorusuna cevap aramalıdır.",
      },
      {
        prompt:
          "Bir araştırmada ışık düzeyi değiştirilip yaprak sıcaklığı ölçülüyor. Ayrı bir araştırmada sıcaklık ayarlanıp oksijen tüketimi ölçülüyor. Sıcaklık sırasıyla hangi roldedir?",
        correct: "Bağımlı, bağımsız",
        wrong: [
          [
            "Bağımsız, bağımlı",
            "İlkinde sıcaklık ölçülen sonuç; ikincide araştırmacının ayarladığı koşuldur.",
          ],
          [
            "İkisinde de yalnız sabit değişken",
            "İlkinde sonuç olarak değişmesi izleniyor; ikincide doğrudan düzeyleri ayarlanıyor.",
          ],
          [
            "İkisinde de kontrol grubu",
            "Sıcaklık bir niceliktir; grup veya örneklem adı değildir.",
          ],
          [
            "İlkinde hipotez, ikincide teori",
            "Bir niceliğin deneydeki rolü hipotez veya teori bilgi türleriyle aynı sınıflama değildir.",
          ],
        ],
        knowledge: [
          "Bağımsız değişken ayarlanan koşul, bağımlı değişken ölçülen sonuçtur; rol araştırma sorusuna göre değişebilir.",
        ],
        strategy:
          "İki deneyde sıcaklığın yanındaki fiili bul: ölçülmek mi, ayarlanmak mı?",
        steps: [
          "Birinci deneyde ışık ayarlanırken sıcaklık sonuç olarak ölçülür.",
          "İkinci deneyde sıcaklık ayarlanırken oksijen tüketimi ölçülür.",
          "Bu yüzden sıcaklığın rolleri bağımlı ve bağımsız sırasını alır.",
        ],
        reason:
          "Doğru. Aynı nicelik iki farklı araştırmada farklı değişken rolü üstlenebilir.",
        commonError:
          "Sıcaklığın her deneyde değişmeyen tek bir rolü olduğunu ezberlemek.",
        check:
          "Cevaptaki sıra ilk ve ikinci araştırmanın anlatım sırasıyla uyuşmalıdır.",
      },
      {
        prompt:
          "A, B, C kaplarında aynı tür ve başlangıçtaki bitkiler aynı süre inceleniyor. A:18 °C/20 mL su; B:28 °C/20 mL; C:28 °C/35 mL. Su miktarı 20 mL iken sıcaklık etkisini karşılaştırmak için hangi çift uygundur?",
        correct: "A ve B",
        wrong: [
          [
            "A ve C",
            "A ile C’de hem sıcaklık hem su farklıdır; yalnız sıcaklık etkisi ayrılamaz.",
          ],
          [
            "B ve C",
            "Bu çiftte sıcaklık aynı, su farklıdır; su etkisini 28 °C koşulunda karşılaştırır.",
          ],
          [
            "Yalnız A’nın tek ölçümü",
            "Tek gruptaki sonuç, başka sıcaklık koşuluyla kıyaslama sağlamaz.",
          ],
          [
            "En yüksek sonuç hangi kapta çıkarsa o kap ile herhangi biri",
            "Uygun karşılaştırma koşullara göre seçilir; sonuç büyüklüğü karıştırıcı farkları ortadan kaldırmaz.",
          ],
        ],
        knowledge: [
          "Tek etken karşılaştırmasında hedef koşul farklı, diğer ilgili koşullar eş olmalıdır.",
        ],
        strategy: "Önce su sütununda 20 mL koşulunu sağlayan iki satırı seç.",
        steps: [
          "A ile B’nin su miktarı 20 mL ile aynıdır.",
          "Bu iki kapta sıcaklık 18’den 28 °C’ye değişmektedir.",
          "A/C çiftinde su da değiştiği için yalnız A/B istenen sıcaklık karşılaştırmasını sağlar.",
        ],
        reason:
          "Doğru. A/B’de verilen koşullar içinde yalnız hedef sıcaklık farkı vardır.",
        commonError:
          "İki grupta sonuç ölçüldüğü için bütün grup çiftlerini eşdeğer kontrollü karşılaştırma saymak.",
        check:
          "Seçilen iki satırda sıcaklık dışında değişen bir koşul kalmamalıdır.",
      },
      {
        prompt:
          "Bir çalışmanın sonuç ölçütü“48 saat sonunda kökü en az 2 mm görülen tohum” olarak tanımlanıyor. Grupları karşılaştırırken hangi uygulama bu ölçütü korur?",
        correct: "Bütün grupları 48 saatte aynı 2 mm kök ölçütüyle saymak",
        wrong: [
          [
            "İyi görünen grupta ilk yeşil yaprağı, diğerinde kök görünmesini saymak",
            "Gruplarda farklı biyolojik olaylar sayılırsa aynı sonuç değişkeni karşılaştırılmamış olur.",
          ],
          [
            "Bir grubu 24, diğerini 72 saatte saymak",
            "Gözlem süresi de farklılaşır; 48 saatlik ortak ölçüt korunmaz.",
          ],
          [
            "Her grupta en çok sonuç verecek eşiği sonradan seçmek",
            "Sonuca göre ölçüt değiştirmek grupların ölçümünü ve yorumun geçerliliğini bozar.",
          ],
          [
            "Kökü hiç ölçmeden bütün şişmiş tohumları aynı sonuç kabul etmek",
            "Şişme ile en az 2 mm kök oluşumu aynı işlemsel tanım değildir.",
          ],
        ],
        knowledge: [
          "İşlemsel tanım, kavramın bu çalışmada hangi somut ölçüt ve zamanda sayılacağını belirtir.",
        ],
        strategy: "Ölçüm zamanı ve kök eşiğini birlikte sabit tut.",
        steps: [
          "Tanım 48 saat ve en az 2 mm kök olmak üzere iki koşul içerir.",
          "İki koşul her grupta aynı uygulanmalıdır.",
          "Başka yapı, zaman veya eşik kullanımı farklı bir sonuç değişkeni oluşturur.",
        ],
        reason:
          "Doğru. Ortak zaman ve eşik grupların aynı olayı saymasını sağlar.",
        commonError:
          "Her grubun sonucuna göre farklı bir başarı ölçütünü sonradan seçmek.",
        check: "Hem 48 saat hem 2 mm koşulu cevapta korunmalıdır.",
      },
      {
        prompt:
          "Aynı ölçek katsayısıyla çalışan bir cetvel her uzunluğa bilinmeyen fakat sabit bir kayma ekliyor. İki örnek 9 ve 15 mm okunuyor. Ölçek katsayısı 1 olduğuna göre gerçek uzunlukların farkı kaç mm?",
        correct: "6",
        wrong: [
          ["24", "Okumaları toplamak ortak kaymayı gidermez ve farkı vermez."],
          [
            "4",
            "Sabit kaymanın miktarı verilmemiştir; keyfî bir düzeltme ekleyerek 4 sonucu üretilemez.",
          ],
          [
            "Gerçek fark mutlaka sıfırdır",
            "Aynı sabit ekleme iki farklı gerçek değeri eşitlemez; okuma farkı 6 mm’dir.",
          ],
          [
            "Kayma bilinmediği için fark hiçbir koşulda belirlenemez",
            "Aynı sabit b iki okuma eşitliğinin farkında yok olur: R₂−R₁=L₂−L₁.",
          ],
        ],
        knowledge: [
          "Ölçek katsayısı 1 ve aynı sabit kayma koşulunda iki okumanın farkında sabit kayma birbirini götürür.",
        ],
        strategy:
          "Tek tek uzunlukları değil, iki ölçüm eşitliğinin farkını kur.",
        steps: [
          "Okumalar R₁=L₁+b ve R₂=L₂+b olarak yazılır.",
          "Çıkarma yapınca R₂−R₁=L₂−L₁ olur.",
          "15−9=6 mm gerçek farktır; tek tek gerçek uzunluklar için b hâlâ gerekir.",
        ],
        reason:
          "Doğru. Ortak sabit kayma fark hesabında gider; verilen ölçek katsayısı koşulu önemlidir.",
        commonError:
          "Sabit kaymayı bilmeden hiçbir karşılaştırma yapılamayacağını düşünmek.",
        check:
          "Sonuç fark içindir; aynı bilgiden iki gerçek uzunluğun tek tek bulunduğu iddia edilmemelidir.",
      },
      {
        prompt:
          "Bir topluluktan seçilmiş fideler uygulama ve kontrol gruplarına kura ile dağıtılıyor. Bu atamanın doğrudan amacı hangisidir?",
        correct:
          "Başlangıç özelliklerinin tek bir grupta sistematik yığılmasını azaltmaya yardım etmek",
        wrong: [
          [
            "Topluluktaki bütün türlerin mutlaka örneğe girmesini sağlamak",
            "Atama, seçilmiş örneklerin gruplara dağıtımıdır; bütün topluluğun seçilme biçimini tek başına belirlemez.",
          ],
          [
            "Ölçüm aracındaki sabit hatayı otomatik düzeltmek",
            "Rastgele atama kalibrasyonun yerine geçmez.",
          ],
          [
            "Bütün grupların sonuçlarının eşit olmasını zorunlu kılmak",
            "Uygulama gerçek fark oluşturabilir; atama sonuç eşitliği garantisi değildir.",
          ],
          [
            "Tek bir deneyin bütün koşullarda kesin yasa olmasını sağlamak",
            "Atama tasarımı destekler; evrensel genelleme veya yasa oluşturma garantisi değildir.",
          ],
        ],
        knowledge: [
          "Rastgele atama başlangıç grup farklarının uygulamayla sistematik karışmasını azaltmayı amaçlar.",
        ],
        strategy:
          "İşlemin örnek seçimi mi, seçilmiş bireylerin gruplara dağıtımı mı olduğuna bak.",
        steps: [
          "Fideler seçilmiş durumdadır; kurayla yapılan işlem grup atamasıdır.",
          "Başlangıç özellikleri bu yolla tek uygulamada bilinçli olarak toplanmamaya çalışılır.",
          "Bu katkı araç doğruluğu, sonuç eşitliği ve evrensel yasa garantilerinden ayrıdır.",
        ],
        reason:
          "Doğru. Atama, başlangıç özelliklerinin karşılaştırmaya karışmasını azaltmaya yöneliktir.",
        commonError:
          "Rastgele atamayı bütün örnekleme ve ölçüm sorunlarını tek başına çözen bir işlem saymak.",
        check:
          "Cevap başlangıç özellikleri ile uygulama grubu arasındaki ilişkiyi hedeflemelidir.",
      },
      {
        prompt:
          "Bir deney yalnız aynı seranın kuzey köşesinden seçilen tek bir fide çeşidiyle yedi gün sürüyor. Hangi kapsam, verinin ilk değerlendirmesinde en doğrudan korunmalıdır?",
        correct: "İncelenen fide çeşidi, sera koşulları ve yedi günlük süre",
        wrong: [
          [
            "Bütün bitki türlerinin bütün iklimlerdeki yaşam boyu yanıtı",
            "Tür, ortam ve süre sınırlarının tümünü aşar.",
          ],
          [
            "Aynı sonucun bütün hayvanlarda geçerli olması",
            "Hayvan grubu bu deneyin örneklemine ve biyolojik kapsamına dahil değildir.",
          ],
          [
            "Seranın incelenmeyen bütün köşelerindeki koşulların eşit olması",
            "Diğer konumlardaki koşulların eşitliği ölçülmemiştir.",
          ],
          [
            "Deneyde ölçülmeyen bütün özelliklerin de aynı yönde değişmesi",
            "Bir sonuç değişkeninden ölçülmeyen özelliklere aynı değişim yüklenemez.",
          ],
        ],
        knowledge: [
          "Genelleme, örneklem, tür, süre ve incelenen koşulların sınırlarıyla birlikte değerlendirilir.",
        ],
        strategy: "Örneklem ve deney penceresini verildiği biçimde yaz.",
        steps: [
          "Tek fide çeşidi ve tek sera köşesi seçilmiştir.",
          "Süre yedi günle sınırlıdır.",
          "İlk yorum bu koşulları korur; başka tür ve iklimlere kesin sonuç eklemez.",
        ],
        reason:
          "Doğru. Verinin doğrudan dayandığı kapsam seçilen çeşit, yer ve süredir.",
        commonError:
          "Örneklem dar olsa da deney sözcüğü geçtiği için sınırsız genelleme yapabilmek.",
        check:
          "Cevapta sınanmamış bir canlı grubu, yer veya zaman aralığı eklenmemelidir.",
      },
      {
        prompt:
          "X grubunun ölçümleri 4,6,8; Y grubunun ölçümleri 6,6,6 birim. Hangi ifade doğrudur?",
        correct: "Ortalamaları eşit 6’dır; X’in ölçüm aralığı daha geniştir",
        wrong: [
          [
            "X’in ortalaması 8, Y’ninki 6’dır",
            "X’in en büyük değerini ortalama yapmak yanlıştır; (4+6+8)/3=6’dır.",
          ],
          [
            "Ortalama eşitse bütün bireysel ölçümler de eşittir",
            "X içinde 4 ve 8, Y içinde yalnız 6 vardır; özet eşitliği ham ölçümlerin eşitliğini sağlamaz.",
          ],
          [
            "Y’nin ölçüm aralığı daha büyüktür",
            "Y’de en büyük ve en küçük aynı 6; aralık sıfırdır.",
          ],
          [
            "Bu iki grup kesin aynı biyolojik mekanizmayla oluşmuştur",
            "Veriler aynı ortalamayı verir; mekanizma hakkında böyle bir kesinlik sağlamaz.",
          ],
        ],
        knowledge: [
          "Ortalama toplamın ölçüm sayısına bölümüdür; ölçüm aralığı en büyük eksi en küçüktür.",
        ],
        strategy: "Ortalama ile yayılmayı iki ayrı hesapla değerlendir.",
        steps: [
          "X toplam 18, Y toplam 18; her birinde üç ölçüm bulunduğundan ortalama 6’dır.",
          "X aralığı 8−4=4, Y aralığı 6−6=0’dır.",
          "Aynı ortalamayla farklı dağılımın bulunabileceği sonucu seçilir.",
        ],
        reason:
          "Doğru. Ortalama eşitliği ölçümlerin dağılımını tek başına belirtmez.",
        commonError:
          "Tek özet sayının bütün ham veriyi eksiksiz anlattığını varsaymak.",
        check:
          "Her iki toplam 18 olmalı; aralık hesaplarında yalnız en büyük ve en küçük kullanılır.",
      },
      {
        prompt:
          "Bir oran%20’den%35’e yükseliyor. Yüzde puan farkı ve başlangıca göre göreli artış sırasıyla nedir?",
        correct: "15 yüzde puan ve%75",
        wrong: [
          [
            "15 yüzde puan ve%15",
            "Göreli artışta 15 fark başlangıç 20’ye bölünmelidir; %15 bu bölmeyi yapmaz.",
          ],
          [
            "%75 ve 15 yüzde puan",
            "Doğru iki değer sorudaki sıranın tersinde verilmiştir.",
          ],
          [
            "35 yüzde puan ve%20",
            "Son oranı fark, ilk oranı göreli değişim olarak kullanmak doğru değildir.",
          ],
          [
            "%15 ve%75 her bakımdan aynı niceliktir",
            "15 yüzde puan ile göreli%75 farklı paydalarla ifade edilir; aynı nicelik adı değildir.",
          ],
        ],
        knowledge: [
          "Yüzde puan farkı son yüzde eksi ilk yüzde; göreli değişim farkın başlangıca bölümüdür.",
        ],
        strategy:
          "Önce farkı bul; sonra bu farkı başlangıç oranına göre ölçekle.",
        steps: [
          "35−20=15 yüzde puan fark vardır.",
          "Göreli değişim 15/20=0,75’tir.",
          "Yüzdeyle%75 artış yazılır; sonuçlar sorulan sırayla birleştirilir.",
        ],
        reason:
          "Doğru. Mutlak yüzde puan farkıyla başlangıca göre yüzde artış ayrı hesaplanmıştır.",
        commonError:
          "Yüzde puan farkını aynı sayıda göreli yüzde artış sanmak.",
        check:
          "20’nin 1,75 katı 35 olmalıdır; bu işlem göreli artışı bağımsız denetler.",
      },
      {
        prompt:
          "İki grafikte aynı 32 ve 36 birimlik sonuçlar gösteriliyor. Birincinin düşey ekseni 0’dan, ikincinin 30’dan başlıyor. İkinci grafikte sütun farkı daha büyük görünüyorsa hangi yorum doğrudur?",
        correct:
          "Sayısal fark yine 4 birimdir; eksen başlangıcı görsel izlenimi değiştirmiştir",
        wrong: [
          [
            "İkinci çizimde biyolojik fark kendiliğinden artmıştır",
            "Grafiğin eksenini değiştirmek ölçülmüş 32 ve 36 değerlerini değiştirmez.",
          ],
          [
            "İkinci çizimin farkı 36−30=6 birimdir",
            "36−30 ikinci sütunun eksen tabanından yüksekliğidir; iki ölçüm arasındaki fark 36−32’dir.",
          ],
          [
            "İlk grafikte fark yoktur",
            "İlk grafikte de aynı iki farklı değer bulunur; fark 4 birimdir.",
          ],
          [
            "Sütunların görünüşünden bütün evren için neden-sonuç kesinleşir",
            "Grafik görünüşü ne örneklem kapsamını ne nedensel tasarımı tek başına belirler.",
          ],
        ],
        knowledge: [
          "Grafik ölçeği görsel büyüklüğü etkiler; iki veri değeri arasındaki sayısal fark eksen başlangıcından bağımsızdır.",
        ],
        strategy: "Sütun görünüşünden önce yazılı iki ölçümü çıkar.",
        steps: [
          "Aynı iki veri 32 ve 36’dır.",
          "Fark 36−32=4 birim kalır.",
          "30’dan başlayan eksen bu farkın gösterimde kapladığı oranı büyütebilir; ölçümü değiştirmez.",
        ],
        reason: "Doğru. Görsel vurgu ile ölçülen fark farklıdır.",
        commonError:
          "Kesilmiş eksenin tabanını karşılaştırılan ilk grubun değeri gibi kullanmak.",
        check: "İki grafikte de aynı 36−32 hesabını elde etmelisin.",
      },
      {
        prompt:
          "Bir tür için 15,25 ve 35 °C’de sonuçlar ölçülüp noktalar çizgiyle birleştiriliyor.40 °C için hiçbir ölçüm veya matematiksel model verilmiyor. Hangi sonuç geçerlidir?",
        correct: "40 °C’deki kesin sonuç bu verilerden belirlenemez",
        wrong: [
          [
            "Çizgi uzatılarak 40 °C sonucu kesin bulunur",
            "Ölçülmeyen aralığa uzatma ek modele dayanır; bu model soruda verilmemiştir.",
          ],
          [
            "Son ölçümden sonra bütün canlılarda sonuç sıfırdır",
            "Bir türün üç düzeyinden bütün canlılar ve sonraki bütün sıcaklıklar için sıfır sonucu çıkarılamaz.",
          ],
          [
            "Noktaların bağlanması 15 ile 35 arasındaki her derecenin ölçüldüğünü kanıtlar",
            "Bağlantı çizgisi bütün ara koşulların ayrı ölçümünü göstermez.",
          ],
          [
            "En yüksek ölçülen değer türün bütün koşullardaki kesin optimumudur",
            "Yalnız seçilmiş düzey ve koşullardaki en yüksek değeri bilmek evrensel optimumu belirlemez.",
          ],
        ],
        knowledge: [
          "Grafikte veri noktası, bağlantı çizgisi ve ölçüm aralığı dışı model tahmini farklı bilgi türleridir.",
        ],
        strategy:
          "İstenen sıcaklığın gerçekten ölçülen düzeyler arasında bulunup bulunmadığını denetle.",
        steps: [
          "Ölçülen düzeyler 15,25 ve 35 °C’dir.",
          "40 °C bu listenin dışındadır ve sonuç üretmek için ek model verilmemiştir.",
          "Bu yüzden kesin 40 °C sayısı yerine veri yetersizliği sonucu korunur.",
        ],
        reason:
          "Doğru. Ölçüm aralığı dışındaki kesin değer ek kanıt veya model gerektirir.",
        commonError:
          "Grafikteki her çizgi parçasını bütün olası koşullar için doğrulanmış yasa saymak.",
        check:
          "Cevap, 40 °C için soruda bulunmayan yeni bir sayı üretmemelidir.",
      },
      {
        prompt:
          "Tam kontrollü iki faktörlü örnekte düşük suda düşük/yüksek ışık yanıtları 5/7; yüksek suda düşük/yüksek ışık yanıtları 9/8 birim. Hata veya belirsizlik bilgisi verilmiyor; yalnız bu özetleri yorumla. Hangi ifade veriye uyar?",
        correct:
          "Işık artışının farkı düşük suda+2, yüksek suda−1’dir; etki bu verilerde su koşuluna göre değişir",
        wrong: [
          [
            "Işık her su düzeyinde aynı+2 etkiyi yapmıştır",
            "Yüksek suda 8−9=−1 olduğundan aynı+2 etkisi yoktur.",
          ],
          [
            "Yüksek suda ışık etkisi 9+8=17’dir",
            "Etki karşılaştırılan iki yanıtın farkıyla okunur; toplamı fark yerine kullanılamaz.",
          ],
          [
            "Su etkisi bu dört değerle hiçbir şekilde karşılaştırılamaz",
            "Aynı ışıkta düşük-yüksek su çiftleri de tabloda bulunur; bu verilen özet farkları hesaplanabilir.",
          ],
          [
            "Bu dört ortalama bütün biyolojik mekanizmayı kesin açıklar",
            "Özetler koşula bağlı farkı gösterir; ayrıntılı mekanizmayı ve bütün türleri tek başına kesinleştirmez.",
          ],
        ],
        knowledge: [
          "Bir faktörün etkisi, diğer faktörün her sabit düzeyinde ayrı karşılaştırılır; farkların değişmesi koşula bağlı etkiyle uyumludur.",
        ],
        strategy: "Her su düzeyinde yüksek ışık eksi düşük ışık hesabı yap.",
        steps: [
          "Düşük suda 7−5=+2 bulunur.",
          "Yüksek suda 8−9=−1 bulunur.",
          "İki fark aynı olmadığından tek sabit ışık etkisi varsayımı bu dört özeti karşılamaz.",
        ],
        reason:
          "Doğru. İstenen, iki sabit su koşulundaki ışık farkını ayrı okumaktır.",
        commonError:
          "Dört değerin toplamını veya tek bir çiftin etkisini bütün koşullara taşımak.",
        check:
          "İşaretlerin+2 ve−1 olarak korunması, aynı yönlü evrensel artış iddiasını denetler.",
      },
      {
        prompt:
          "Bağımsız bir araştırma grubu benzer soruyu uygun karşılaştırmalarla ve kalibre edilmiş başka araçla yeniden sınayıp benzer sonuç buluyor. Bu durum hangi yorumu destekler?",
        correct:
          "Sonucun farklı uygun yöntem ve ekipte yeniden elde edilebilmesi açıklamaya güveni artırabilir",
        wrong: [
          [
            "İlk grubun verisine artık gerek kalmadığını",
            "Yeni sonuç ilk veri kaydını silme gerekçesi değildir; çalışmalar birlikte değerlendirilebilir.",
          ],
          [
            "Aynı sonuç bütün koşullarda değişmez bir kesinlik kazanmıştır",
            "Bağımsız doğrulama güveni destekler; incelenmeyen bütün koşullarda mutlak doğruluk vermez.",
          ],
          [
            "Bir açıklamanın otomatik olarak yasaya dönüştüğünü",
            "Tekrar ve doğrulama bilgi türlerinin zorunlu terfi merdiveni değildir.",
          ],
          [
            "İki ekip aynı sonucu bulduğu için örneklem ve yöntem raporlanmamalıdır",
            "Yöntem ve örneklem açıklığı, benzer sonuçların karşılaştırılabilmesi için yine gereklidir.",
          ],
        ],
        knowledge: [
          "Bağımsız doğrulama kanıt birikimine katkı verir; genelleme ve bilgi türleri yine kendi koşullarıyla değerlendirilir.",
        ],
        strategy:
          "Yeni çalışmanın bağımsızlığını ve uygun tasarımını, kesinlik iddiasından ayrı tut.",
        steps: [
          "Başka ekip ve kalibre edilmiş başka araç kullanılmıştır.",
          "Benzer sonuç bağımsız yöntemde de elde edilmiştir.",
          "Bu katkı güveni artırabilir; eski veriyi silme veya her koşulu kapsama sonucu vermez.",
        ],
        reason:
          "Doğru. Bağımsız yeniden elde etme, kanıtın tutarlılığına katkı sağlar.",
        commonError:
          "Güvenin artmasını sınırsız ve geri döndürülemez kesinlik olarak yorumlamak.",
        check:
          "Cevap yeni desteği kabul ederken yöntem ve kapsam sınırlarını korumalıdır.",
      },
      {
        prompt:
          "Önceden yazılmış yönlü tahmin“X uygulamasında ortalama artacak” şeklinde. Uygun ölçüm ve kontrol denetimleri de yapıldıktan sonra bütün tekrarlarda ortalama düşüyor. En uygun sonraki yaklaşım hangisidir?",
        correct:
          "Sonucu kaydetmek ve açıklamanın bu koşullardaki biçimini gözden geçirmek",
        wrong: [
          [
            "Düşük değerleri çıkarıp tahmine uyanları sonuç saymak",
            "Tahmine uymayan veriyi gerekçesiz silmek kanıt değerlendirmesi değildir.",
          ],
          [
            "Tahminin düşüş anlamına geldiğini sonradan söylemek",
            "Önceden artış yönü belirlenmiştir; sonradan anlamı değiştirerek başarılı sayılmaz.",
          ],
          [
            "Hiçbir yeni soru veya açıklama önerilemeyeceğini kabul etmek",
            "Karşı sonuç hipotezin geliştirilmesine veya yeni soruya yol açabilir.",
          ],
          [
            "Tekrarlar aynı yönde olduğu için yöntem hakkında bilgi vermemek",
            "Yöntem açıklığı karşı sonucun da değerlendirilebilmesi için gereklidir.",
          ],
        ],
        knowledge: [
          "Önceden belirlenmiş tahminle güvenilir karşı sonuç arasındaki çelişki, veri korunarak açıklamanın gözden geçirilmesini gerektirir.",
        ],
        strategy:
          "Tahminin yazılı yönünü sonuç yönüyle karşılaştır; veriyi hipoteze uydurma.",
        steps: [
          "Tahmin artış, tekrarlanan ölçümler düşüş yönündedir.",
          "Kurgu ve ölçüm denetimlerinin yapıldığı soruda belirtilmiştir.",
          "Bu koşullarda açıklamanın biçimi yeniden değerlendirilir; karşı sonuç kayıtta korunur.",
        ],
        reason:
          "Doğru. Sonuç, önceden yazılan yönlü tahmini desteklememektedir; gerekçeli düzeltme yapılır.",
        commonError:
          "Başarılı görünmek için tahmini veya veri kümesini sonuçtan sonra değiştirmek.",
        check: "Uygun cevapta düşen değerler kayıttan çıkarılmamalıdır.",
      },
      {
        prompt:
          "Bir ölçümde bozuk sensör kayıtlarını dışlama kuralı deneyden önce yazılmış. Hangi davranış kayıt açıklığını en iyi korur?",
        correct:
          "Hangi kayıtların hangi önceden tanımlı nedenle dışlandığını raporlamak",
        wrong: [
          [
            "Yalnız hipoteze uymayan değerleri sensör hatası diye adlandırmak",
            "Dışlama ölçütü sonucun istenip istenmemesine göre değiştirilmiş olur.",
          ],
          [
            "Dışlanan kayıtların varlığını saklamak",
            "Bu durumda veri kümesinin nasıl oluştuğu ve sonucun hangi kayıtlara dayandığı görülemez.",
          ],
          [
            "Dışlama kuralını her grup için farklı sonuca göre seçmek",
            "Grupların veri işleme koşulları karşılaştırılabilir olmaktan çıkar.",
          ],
          [
            "Önceden yazılmış kural bulunduğu için bütün ham kaydı yok etmek",
            "Önceden belirleme, kaydın izlenebilirliğini ve ham verinin korunmasını gereksiz yapmaz.",
          ],
        ],
        knowledge: [
          "Veri işleme ölçütleri ve dışlamalar açık raporlanmalıdır; sonucu beğenmemek teknik hata kanıtı değildir.",
        ],
        strategy:
          "Kuralın zamanını, dışlama nedenini ve raporda görünürlüğünü birlikte değerlendir.",
        steps: [
          "Dışlama kuralı deneyden önce belirlenmiştir.",
          "Uygulamada her kaydın bu kurala uyup uymadığı gerekçesiyle gösterilmelidir.",
          "Böylece sonuç seçimine göre keyfî silme ile teknik dışlama ayrılabilir.",
        ],
        reason:
          "Doğru. Kural ve kayıt ilişkisi açık tutulduğunda sonuç kümesi değerlendirilebilir.",
        commonError:
          "Her aykırı veya istenmeyen değeri otomatik olarak bozuk ölçüm saymak.",
        check:
          "Dışlama nedeni hipoteze uyum değil, önceden yazılmış teknik ölçüt olmalıdır.",
      },
      {
        prompt:
          "Yaprak hasarı fotoğraflarını puanlayan değerlendiriciye hangi fotoğrafın hangi uygulamadan geldiği söylenmiyor. Bu körleme işleminin en doğrudan amacı nedir?",
        correct:
          "Değerlendiricinin uygulama beklentisinin puanlamaya etkisini azaltmak",
        wrong: [
          [
            "Bütün fotoğraflardaki hasarın aynı olmasını sağlamak",
            "Körleme gerçek hasar değerlerini eşitlemez; değerlendirme yanlılığı riskini hedefler.",
          ],
          [
            "Her fotoğrafı ayrı bağımsız deney yapmak",
            "Fotoğrafların grup bilgisini gizlemek deney birimi sayısını değiştirmez.",
          ],
          [
            "Ölçüm birimine artık ihtiyaç bırakmamak",
            "Körlemede de puan ölçütü ve ölçek tanımlanmalıdır.",
          ],
          [
            "Araştırma sonuçlarının raporlanmasını engellemek",
            "Grup bilgisinin değerlendiriciden gizlenmesi, çalışmanın yöntem ve sonuçlarını raporlamaya engel değildir.",
          ],
        ],
        knowledge: [
          "Körleme, beklentinin veya grup bilgisinin değerlendirmeyi etkileme riskini azaltmaya yöneliktir.",
        ],
        strategy: "Gizlenen bilginin kimin kararını etkileyebileceğine bak.",
        steps: [
          "Fotoğrafı puanlayan kişi uygulama grubunu bilmiyor.",
          "Bu kişi belirli grubun iyi veya kötü görünmesini bekleyerek puan veremez hâle getirilmeye çalışılıyor.",
          "Hedef, biyolojik farkı veya deney birimi sayısını değiştirmek değil gözlemci beklentisini azaltmaktır.",
        ],
        reason:
          "Doğru. Körleme uygulama beklentisinin ölçüm yorumuna karışmasını azaltmayı amaçlar.",
        commonError:
          "Körlemeyi gerçek sonuç farkını yok eden veya tekrar sayısını artıran işlem sanmak.",
        check:
          "Seçilen amaç puanlayan kişinin bilgi ve beklentisiyle doğrudan bağlantılı olmalıdır.",
      },
      {
        prompt:
          "İki grubun aynı sürede ölçülen ortalaması 10’ar birim. Ham dağılım, ölçüm duyarlılığı ve örnek sayısı verilmemiş. Hangi ifade bu bilgiye dayanarak kesin kurulamaz?",
        correct: "Uygulamanın bütün koşullarda hiçbir etkisi olamayacağı",
        wrong: [
          [
            "Verilen iki ortalamanın eşit olduğu",
            "Bu eşitlik sorudaki doğrudan sayısal kayıttır.",
          ],
          [
            "İstatistiksel ayrıntılar için ek bilgi gerektiği",
            "Örnek sayısı ve dağılım verilmediğinden ayrıntılı istatistik yorumu ek veri gerektirir.",
          ],
          [
            "Sonucun incelenen süreyle birlikte değerlendirilmesi gerektiği",
            "Ölçüm belli bir süreye aittir; zaman kapsamını korumak gerekir.",
          ],
          [
            "Ham bireysel değerlerin ortalamadan tek tek çıkarılamadığı",
            "Aynı ortalama farklı ham veri kümeleriyle oluşabilir; tek tek değerler belirlenmez.",
          ],
        ],
        knowledge: [
          "Aynı ortalama, her koşulda etki yokluğu veya her bireyin aynı sonucu taşıdığı anlamına gelmez.",
        ],
        strategy:
          "Doğrudan eşit ortalama kaydıyla bütün koşulları kapsayan yokluk iddiasını ayır.",
        steps: [
          "Bilinen özetler 10 ve 10’dur.",
          "Dağılım, örnek sayısı ve ölçüm sınırları verilmemiştir.",
          "Bu nedenle eşit özetten evrensel etkisizlik sonucuna genişleme yapılamaz.",
        ],
        reason:
          "Doğru. Verilen eşit özet evrensel etkisizlik için yeterli kanıt değildir.",
        commonError:
          "“Bu ölçümde fark görülmedi” ifadesini “hiçbir koşulda fark olamaz” olarak okumak.",
        check:
          "Kesin çıkarılamayan seçeneğin incelenmeyen bütün koşulları kapsadığını kontrol et.",
      },
      {
        prompt:
          "Bir yaprağın rengi“sarı”, uzunluğu“8 cm” diye kaydediliyor. Hangi yorum uygundur?",
        correct:
          "Renk nitel, uzunluk nicel kayıttır; nicel olması hatasızlık garantisi vermez",
        wrong: [
          [
            "İkisi de yalnız çıkarımdır, hiçbiri gözlem olamaz",
            "Renk tanımı ve uzunluk ölçümü doğrudan gözlem kaydı olabilir.",
          ],
          [
            "8 cm kaydı sayı içerdiği için aracı kontrol etmek gereksizdir",
            "Sayısal ölçüm yanlış ayarlı araçtan da gelebilir; kalibrasyon bilgisi önemini korur.",
          ],
          [
            "Sarı sözcüğü bulunması rengi kesin olarak bir mineral eksikliğine bağlar",
            "Renk gözlemi tek neden iddiasını kendi başına sağlamaz.",
          ],
          [
            "Nitel kayıt hiçbir bilimsel araştırmada kullanılmaz",
            "Bilimsel gözlemler nitel de olabilir; önemli olan ölçüt ve kayıt açıklığıdır.",
          ],
        ],
        knowledge: [
          "Nitel kayıt sayı vermeden özelliği betimler; nicel kayıt ölçüm ve birim içerir. Bu ayrım doğruluk garantisi değildir.",
        ],
        strategy:
          "Kayıt biçimini belirle; sonra kesinlik iddiasını ayrıca denetle.",
        steps: [
          "Sarı bir renk tanımıdır; bu haliyle nitel kayıttır.",
          "8 cm sayısal uzunluk ve birim içerdiğinden niceldir.",
          "Araç ve ölçüm koşulları bilinmeden nicel kayda hatasızlık yüklenmez.",
        ],
        reason:
          "Doğru. Kayıt türü ve ölçüm güvenilirliği ayrı değerlendirilir.",
        commonError:
          "Nitel kaydı bilim dışı, nicel kaydı otomatik kesin saymak.",
        check:
          "Uzunluk türünü belirleyen sayı ve birim; doğruluğunu belirleyen ise ayrıca ölçüm koşullarıdır.",
      },
      {
        prompt:
          "Bir testte hedef yokken beklenen negatif kontrol sonucu alınıyor; hedef bulunduğu bilinen pozitif kontrol ise beklenen yanıtı vermiyor. Örneklerde de yanıt yok. Bu koşulda hangi yaklaşım daha uygundur?",
        correct:
          "Testin çalıştığını gösteren pozitif kontrol sorunu araştırılmadan örneklerde hedefin kesin yokluğu söylenmez",
        wrong: [
          [
            "Örneklerin hepsinde hedef kesin yoktur",
            "Pozitif kontrol yanıt vermediği için düzenek hedef varken de yanıt üretemiyor olabilir.",
          ],
          [
            "Negatif kontrol uygun olduğu için pozitif kontrolün önemi yoktur",
            "Negatif kontrol arka planı denetler; hedef bulunduğunda yanıt oluşturabilme işlevi ayrı denetlenir.",
          ],
          [
            "Örneklerin hepsinde hedef kesin vardır",
            "Yanıt yokluğu, bozuk pozitif kontrol durumunda hedef varlığını da kesin kanıtlamaz.",
          ],
          [
            "Kontrollerin sonuçları veri sayılmaz",
            "Kontrol sonuçları testin hangi yorumlara izin verdiğini belirleyen önemli verilerdir.",
          ],
        ],
        knowledge: [
          "Pozitif kontrol düzeneğin hedef varken yanıt verebildiğini sınar; başarısızlığı negatif örneklerin kesin yorumunu sınırlayabilir.",
        ],
        strategy:
          "Hedef varlığının bilindiği kontrolün beklenen yanıtı verip vermediğine bak.",
        steps: [
          "Pozitif kontrolde hedefin varlığı biliniyor fakat yanıt oluşmuyor.",
          "Bu durum örneklerdeki yanıtsızlığın gerçek yokluk dışında bir yöntem sorunundan da doğabileceğini gösterir.",
          "Düzenek sorunu araştırılmadan kesin hedef yokluğu sonucuna geçilmez.",
        ],
        reason:
          "Doğru. Beklenen pozitif yanıt alınmadan negatif örnek sonucu tek başına kesin yokluk vermez.",
        commonError:
          "Farklı kontrol türlerinin aynı soruya cevap verdiğini düşünüp birini ötekinin yerine koymak.",
        check:
          "Sonuç, hem pozitif kontrolün başarısızlığını hem örnek yanıtının yokluğunu birlikte açıklamalıdır.",
      },
      {
        prompt:
          "Araştırmacı deney sırasında beklemediği bir desen görüyor; ilk soruyu daraltıyor ve yeni karşılaştırma kuruyor. Bu süreç için hangi yorum doğrudur?",
        correct:
          "Yeni verinin araştırma sorusuna ve sınama tasarımına geri dönmesi bilimsel sürecin bir parçası olabilir",
        wrong: [
          [
            "Basamak sırası değiştiği için araştırma kesin bilim dışıdır",
            "Araştırma her zaman tek ve değişmez bir çizgisel sıra izlemez.",
          ],
          [
            "İlk veriler yeni soruya uymuyorsa silinmelidir",
            "Eski veri korunur; farklı bir soruya geçmek kayıtları yok etme gerekçesi değildir.",
          ],
          [
            "Beklenmeyen desen hiç sınanmadan geniş teori olmuş sayılır",
            "Bir desenin görülmesi kendiliğinden geniş açıklayıcı teori kurmaz.",
          ],
          [
            "Yeni soruda karşılaştırma ve ölçüm gerekmez",
            "Her yeni soru yine uygun veri ve sınama koşulları gerektirir.",
          ],
        ],
        knowledge: [
          "Bilimsel araştırma yeni verilerle soruya veya tasarıma geri dönebilen bir süreçtir; ezber bir sıraya indirgenmez.",
        ],
        strategy:
          "Sıra ezberi yerine yapılan değişikliğin veri ve sınama işlevini değerlendir.",
        steps: [
          "Beklenmeyen desen yeni bir soru doğurmuştur.",
          "Araştırmacı bu soruyu ayrı karşılaştırmayla sınamaya yönelmiştir.",
          "Bu geri dönüş, veri korunduğu ve uygun yöntem kullanıldığı sürece sürecin geçerli parçası olabilir.",
        ],
        reason:
          "Doğru. Yeni verinin soruyu geliştirmesi, araştırmanın sınama niteliğini ortadan kaldırmaz.",
        commonError:
          "Basamak adlarını sabit bir sıra olarak ezberleyip gerçek araştırma işlevlerini değerlendirmemek.",
        check:
          "Yeni sorunun da ölçülebilir karşılaştırmaya bağlandığını kontrol et.",
      },
    ],
  },
  {
    id: "mineraller",
    topic: "detail-3",
    title: "Mineraller: işlev, gereksinim ve deneylerle ileri uygulama",
    minutes: 70,
    objectives: [
      "Mineral element, iyon ve mineral içeren yapının rollerini ayır.",
      "Temel mineralleri yapısal ve düzenleyici görevleriyle ilişkilendir.",
      "Verilen miktarları gereksinim ve alınma koşullarıyla karşılaştır.",
      "Eksiklik, ekleme ve büyüme verilerinden kapsamı korunmuş çıkarım kur.",
    ],
    source:
      "MEBİ TYT Biyoloji Konu Özetleri, PDF s. 18–21; OGM Dersler Cepte, Canlıların Yapısında Bulunan Temel Bileşikler I, s. 10–14; Aurelia Mineraller kopya kâğıdı, s. 1–13. Gereksinim modelleri, deney verileri, çözümlü örnekler ve ileri sorular özgündür; gerçek bir organizma için günlük alım veya tanı hesabı değildir.",
    sections: [
      {
        title: "Az miktar, önemsiz görev demek değildir",
        paragraphs: [
          "Biyolojide mineral, canlının gereksinim duyduğu demir ve kalsiyum gibi inorganik besin elementlerini anlatır. Bu elementler yapıların bileşeni olabilir, iyon dağılımını etkileyebilir veya enzimlerin çalışmasına katılabilir. Gereken miktarının küçük olması görevini önemsiz yapmaz.",
          "İnsan beslenmesinde mineraller organik yakıt gibi kalori sağlamaz. ATP’nin fosfat içermesi, fosforun yakılarak enerji verdiği anlamına gelmez. Elementin yapıya katılması, hücresel işlevi desteklemesi ve besinsel enerji kaynağı olması farklı rollerdir.",
        ],
      },
      {
        title: "Bir atom, farklı yapılara katılabilir",
        paragraphs: [
          "Bir elementin atomları farklı moleküllere katılabilir. Fosfor DNA, RNA, ATP ve fosfolipitlerde fosfat gruplarıyla bulunur; bu yapıların görevleri aynı değildir. Demir hemoglobinin hem grubunda ve bazı elektron aktarım bileşenlerinde görev alabilir.",
          "Magnezyum klorofilin yapısıyla, iyot tiroit hormonlarının yapısıyla ilişkilidir. Aynı mineralin birden çok görevi olması bütün minerallerin birbirinin yerine geçebileceğini göstermez. Yapı adı, element kimliği ve olayın işlevini birlikte eşleştir.",
        ],
      },
      {
        title: "Yapısal rol ve düzenleyici rol",
        paragraphs: [
          "Kalsiyum kemik ve dişin mineral yapısına katılırken kas kasılması, hücre içi sinyal ve pıhtılaşma süreçleriyle de ilişkilidir. Bir mineral için yalnız “yapıcı” veya yalnız “düzenleyici” etiketini kullanmak bu çoklu görevleri eksiltebilir.",
          "Sodyum, potasyum ve klorür gibi iyonların hücre içi ve dışındaki dağılımı su dengesi ve elektriksel işlevler için önemlidir. Benzer olaylarda görev almaları aynı element olduklarını veya her durumda birbirlerini karşılayabileceklerini göstermez.",
        ],
      },
      {
        title: "Kofaktör, yakıt değildir",
        paragraphs: [
          "Bazı enzimler işlev görmek için protein dışı yardımcı bileşene ihtiyaç duyar. Bir metal iyonu böyle bir inorganik kofaktör olabilir. Organik bir yardımcı olan koenzimle mineral iyonunu aynı alt adla sınıflama; verilen yardımcının yapısını oku.",
          "Kofaktör eksikken etkinlik düşüp eklendiğinde toparlanabilir. Bu sonuç mineralin yakılarak enerji verdiğini göstermez; enzim işlevinin uygun koşulunu desteklediğini gösterir. Her enzim aynı mineral iyonuna gereksinim duymaz; ilişki belirli enzim ve yardımcı bağlamında kurulmalıdır.",
        ],
      },
      {
        title: "Tablo sorusunu işlev üzerinden çöz",
        paragraphs: [
          "Önce verilen yapı veya olayı belirle: hem grubu, klorofil, fosfatlı omurga, tiroit hormonu veya iyon dengesi. Ardından o yapıyla mineralin ilişkisini denetle. Yalnız “kas”, “büyüme” veya “yorgunluk” gibi geniş bir ipucu her durumda tek mineral seçtirmez.",
          "Miktar tablosunda ise gramları doğrudan sıralamadan gereken miktarı sor. Kullanılabilir miktar ve gereksinim oranı farklı sonuç verebilir. Bir eksikliği başka bir mineralin fazlasıyla gidermek veya her miktar artışını yararlı saymak doğru bir genel çözüm yolu değildir.",
        ],
      },
      {
        title: "Element, iyon ve tuzun dilini ayır",
        paragraphs: [
          "Element tek tür atomun kimliğini anlatır; Fe demir, Mg magnezyum simgesidir. İyon elektrik yükü taşıyan atom veya atom grubudur; Na⁺ ve Cl⁻ örnektir. Bir elementin iyon oluşturması kimliğini başka elemente dönüştürmez.",
          "NaCl gibi tuzlarda artı ve eksi iyonlar birlikte bulunur; çözünürlerse sulu ortamda dağılabilirler. Bir mineral element iyon olarak, bir tuz içinde veya organik bir moleküle bağlı bulunabilir. Bulunduğu yapının organik olması elementin mineral beslenme rolünü ortadan kaldırmaz.",
        ],
      },
      {
        title: "Alınan miktar ile kullanılan miktar",
        paragraphs: [
          "Besindeki toplam mineral miktarı, sindirim ortamında serbestleşen ve emilen miktarla aynı olmak zorunda değildir. Kimyasal biçim, çözünürlük ve ortam koşulları kullanılabilirliği etkileyebilir. Soruda emilim oranı verilmemişse etiket miktarını doğrudan kana geçen miktar yapma.",
          "Çözünmüş mineral iyonları bir protein polimeri gibi sindirimle daha küçük birimlere ayrılmayı gerektirmez. Fakat emilim ve hücreye taşınma ayrı süreçlerdir. “Sindirilmez” bilgisinden taşımanın sınırsız veya her koşulda kendiliğinden gerçekleşeceği sonucu çıkmaz.",
        ],
      },
      {
        title: "Üretici bitki de mineral alır",
        paragraphs: [
          "Bitki, CO₂’den organik madde üretse de azot, fosfor ve magnezyum gibi elementleri çevreden sağlamalıdır. Kökler mineral iyonlarını çoğunlukla toprak çözeltisinden alır. Toprakta toplam madde bulunması, bütününün kökün alabileceği kimyasal biçimde olduğu anlamına gelmez.",
          "Bitki bir elementi organik bir yapıya bağlayabilir veya bir bileşikten ayırabilir; kimyasal tepkimelerle demir atomunu başka element atomundan üretmez. Yeni klorofil sentezi ile yeni magnezyum elementi üretimini ayırmak ototrofluğun kapsamını doğru tutar.",
        ],
      },
      {
        title: "Demirin taşıma ve enzim görevleri",
        paragraphs: [
          "Hemoglobin, alyuvarlarda oksijen taşınmasına katılan proteindir. Hem gruplarındaki demir bu işleve katkı verir. Demir bazı elektron aktarım proteinleri ve enzimlerle de ilişkilidir; bir yapıya özgü görevi, demirin yalnız tek yerde bulunduğu sonucu değildir.",
          "Demirin hemoglobindeki rolü demiri kalori veren yakıt yapmaz. Demir eksikliği hemoglobin yapımını etkileyebilir; ancak tek bir belirtiyi kesin eksiklik tanısına çevirmek için bu genel ilişki yeterli değildir. Bir soru kapalı koşullar verirse çıkarımı o koşullara göre kur.",
        ],
      },
      {
        title: "Magnezyum ve klorofil",
        paragraphs: [
          "Klorofil fotosentezde ışığı yakalayan pigmenttir; merkezinde magnezyum bulunur. Magnezyum ayrıca birçok enzim işlevine katkı sağlar. Bir mineralin pigmentte yer alması ve enzim işlevine katılması farklı biyolojik bağlamlardaki iki görevdir.",
          "Yaprak sararması magnezyum eksikliğiyle uyumlu olabilir fakat bütün sararmalar için tek neden kanıtı değildir. Başka mineral eksikleri veya çevre koşulları benzer sonuçlar doğurabilir. Mineralin yapıya katılması bilgisi, her fenotipik değişimden kesin mineral teşhisine geçiş yetkisi vermez.",
        ],
      },
      {
        title: "Kalsiyum ile fosforu birlikte gör",
        paragraphs: [
          "Kemik ve dişin mineral kısmında kalsiyum ve fosfat içeren yapılar bulunur. Bu nedenle “kemik yapısı” tek başına yalnız bir elementin bulunduğu anlamına gelmez. Kalsiyum hücre içi sinyaller ve kas işlevlerinde de rol alır; yapısal ve işlevsel görevler birlikte olabilir.",
          "Fosforun fosfat grupları ATP, nükleik asit ve fosfolipit gibi yapılarda yer alır. Fosfatın bir molekülden diğerine aktarılması elementin kimliğini değiştirmez. Bir molekülün enerji aktarımındaki göreviyle fosforun besinsel yakıt olması ayrı iddialardır.",
        ],
      },
      {
        title: "Sodyum, potasyum ve klorür",
        paragraphs: [
          "Sodyum ve potasyum iyonlarının zarın iki yanındaki farklı dağılımları sinir ve kas işlevleriyle ilişkilidir. Bu düzen, toplam iyon miktarı kadar iyonun nerede bulunduğunun da önemli olduğunu gösterir. İki iyon benzer süreçlere katılsa da birbirinin adı değildir.",
          "Klorür hücre sıvılarının iyon dengesinde ve mide asidinin bileşeninde yer alır. Cl element simgesiyle Cl⁻ iyon gösterimini ayır. Hidroklorik asidin H⁺ ve Cl⁻ bileşenleri asidik ortamla ilişkilidir; klorürün bütün sindirim enzimlerini doğrudan birleştirdiği gibi belirsiz bir mekanizma kurma.",
        ],
      },
      {
        title: "İyot ve hormon yapısı",
        paragraphs: [
          "İyot tiroit hormonlarının yapısına katılır. Hormon, belirli hedef hücrelerin işleyişini etkileyen kimyasal habercidir; tiroit hormonları metabolik düzenlemeyle ilişkilidir. Bu yapısal ilişki, iyodun her hormonun veya her proteinin zorunlu elementi olduğu anlamına gelmez.",
          "İyot yetersizliği bazı tiroit sorunlarıyla ilişkili olabilir; bütün tiroit büyümelerinin tek nedeni olduğu söylenemez. Öğretim sorusunda iyot içeren hormon yapısı verildiğinde eşleşme yapılır. Genel hastalık adı ise tek başına aynı kesin yapısal kanıtı sağlamaz.",
        ],
      },
      {
        title: "Kükürt her amino asitte bulunmaz",
        paragraphs: [
          "Kükürt, sistein ve metiyonin gibi bazı amino asitlerin yapısında bulunur. Amino asitler proteinlerin yapı taşlarıdır. Bir proteinin kükürt içeriği, hangi amino asitleri kaç tane taşıdığına bağlı olabilir; bütün proteinlere aynı kükürt oranını atama.",
          "Bir soru varsayımsal zincir başına kükürt sayısı veriyorsa toplam zincir sayısıyla bu sayıyı çarparak atom muhasebesi yapılabilir. Fakat sadece “protein var” bilgisi, belirli sayıda kükürt atomu hesaplatmaz. Yapı taşı türü ve sayısı gereken ek veridir.",
        ],
      },
      {
        title: "Çinkonun yardımcı işlevleri",
        paragraphs: [
          "Çinko bazı enzimlerin yapısal veya işlevsel düzeninde görev alır; normal büyüme ve bağışıklık işlevleriyle ilişkilidir. Bir iyonun proteinin çalışmasına katkısı, onun amino asit dizisinin yerine geçen bir yapı taşı olduğu anlamına gelmez.",
          "Çinkonun insülinle ilişkisi, hormonun amino asit zincirinin çinko atomlarından yapıldığı sonucu değildir. Protein yapısı ile ona eşlik eden iyon veya moleküller ayrılmalıdır. Benzer biçimde bir mineralin gerekli olması, daha fazla miktarın her zaman daha iyi işlev sağlayacağını göstermez.",
        ],
      },
      {
        title: "Flor ile florürü karıştırma",
        paragraphs: [
          "Flor elementinin simgesi F, florür iyonunun gösterimi F⁻’dir. Florür bileşikleri diş mineral dokusunun dayanıklılığıyla ilişkilidir. Elementin F₂ biçimindeki gazı, besin veya diş dokusunda söz edilen florürle aynı kimyasal tür değildir.",
          "Eksiklik ve fazlalık ilişkileri aralık ve koşula bağlı değerlendirilir. Bir elementin önemli görevini öğrenmek, gereğinden fazlasının yararlı olduğu kuralını vermez. Soruda miktar–yanıt verisi varsa hangi aralığın gerçekten ölçüldüğünü ve sonucun hangi işlev için verildiğini kontrol et.",
        ],
      },
      {
        title: "Çok gereken ile çok önemli aynı değildir",
        paragraphs: [
          "Makro mineraller miktar bakımından daha fazla, iz mineraller daha az miktarda gereksinilen grupları anlatır. Bu sınıflama önem sıralaması değildir. Az miktarda gereken bir elementin özel bir yapıda eksik olması, büyük miktardaki başka bir elementi artırmakla otomatik giderilemez.",
          "Ham miktarı küçük olanın mutlaka sınırlayıcı olduğunu düşünme. İki mineral için gerekli miktarlar da farklı olabilir. Bir üretim modelinde mevcut/gereken oranı, kaç ortak üretim biriminin desteklenebildiğini göstermede daha anlamlıdır; oran aynı birimlerle kurulmalıdır.",
        ],
      },
      {
        title: "Enzim deneyinde eksiltme ve geri ekleme",
        paragraphs: [
          "Bir enzim hazırlığından belirli metal iyonu uzaklaştırılıp etkinlik düşüyorsa, ardından aynı iyonla toparlanma gözlenmesi yardımcı rolü destekleyebilir. Uzaklaştırma işleminin proteine başka zarar vermediğini denetleyen karşılaştırmalar yorumu güçlendirir.",
          "Sadece bir ekleme grubunun yüksek sonucuna bakıp bütün mekanizmayı kesinleştirme. Taşıyıcı sıvı, pH, sıcaklık ve enzim miktarı gibi koşullar da eş tutulmalıdır. Mineralin yardımıyla reaksiyonun hızlanması, iyonun tepkimede organik yakıt gibi tüketildiğinin kanıtı değildir.",
        ],
      },
      {
        title: "Minimum gereksinimi oranla karşılaştır",
        paragraphs: [
          "Belirli bir üretim birimi için iki mineralin sabit miktarlarda kullanıldığı bir modelde, her mineralin desteklediği kapasite mevcut miktarın birim gereksinime bölümüdür. İki madde de zorunluysa küçük kapasite ortak sonucu sınırlar. Kayıp, depo veya başka kısıtlar varsa onlar ayrıca hesaba katılır.",
          "En çok tam birim isteniyorsa en küçük kapasitenin tam kısmı alınır. İki mineralin kapasitesi eşitse birlikte sınırlayıcı olabilirler. Bu oran hesabı gerçek bütün bitkiler için evrensel büyüme yasası değildir; verilen gereksinim ve yeterli diğer koşullar varsayımına dayanır.",
        ],
      },
      {
        title: "Sınırlayıcı etken değişebilir",
        paragraphs: [
          "Sınırlayıcı olmayan bir minerali artırmak, diğer mineral kısıtı sürerken ortak üretimi artırmayabilir. İlk kısıt giderildiğinde başka mineral sınır oluşturabilir. Bu nedenle tek bir ilk ölçümden bütün sonraki eklemelerde aynı mineralin sınırlayıcı kalacağını çıkarma.",
          "Kalan stokları hesaplamak ek bir denetimdir: üretilen birim×birim gereksinim tüketilir, başlangıçtan çıkarılınca artan miktar bulunur. Bir tam birim daha için bütün gerekli stokların yetmesi gerekir. Artan madde bulunması onun özel işlevinin gereksiz olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Derişim, hacim ve alımı ayır",
        paragraphs: [
          "Derişim mg/L, hacim L olarak verilirse çözeltideki mineral miktarı bu ikisinin çarpımıdır. Mililitreyi litreye çevirmek gerekir. Eşit derişimde daha büyük hacim daha çok toplam mineral taşır; derişim ile toplam miktar aynı nicelik değildir.",
          "Çözeltideki toplam miktar, bitkinin aldığı miktarın kendisi değildir. Alım veya kullanılabilirlik yüzdesi açıkça verildiğinde ayrıca uygulanır. Sadece birim dönüşümü yapıldığı için bütün mineralin hücreye geçtiğini varsayma; alım sonucu başka bir ölçüm veya model koşuludur.",
        ],
      },
      {
        title: "Büyüme eğrisinde dönemleri koru",
        paragraphs: [
          "Mineral ekleme öncesi ve sonrasındaki bir büyüme eğrisinde hangi zaman aralığında hangi koşulların geçerli olduğunu yaz. Miktar–zaman eğrisinin yüksekliği toplam miktarı, eğimi o aralıktaki ortalama değişim hızını gösterir. Yüksekteki yatay çizgi yüksek büyüme hızı demek değildir.",
          "Bir derişim aralığında artış görülmesi çok yüksek bütün derişimlerde artışın süreceğini kanıtlamaz. Eksiklik, uygun aralık ve fazla miktar farklı sonuçlar verebilir. Sadece iki mineral sınandı diye geri kalan minerallerin gereksiz olduğu veya bütün türlerin aynı yanıtı vereceği sonucuna geçme.",
        ],
      },
    ],
    examples: [
      {
        title: "Hedef üretim için gereken ek mineral",
        prompt:
          "Kayıpsız modelde bir birim ürün 3 mg N ve 2 mg P gerektiriyor. Kullanılabilir N 18 mg, P 30 mg; hedef 9 tam birim. Yalnız N eklenebilir. Hedefe ulaşmak için gereken en az ek N kaç mg? Diğer etkenler yeterli kabul ediliyor.",
        strategy:
          "Mevcut ortak kapasiteyi görmekle hedef için gereken toplamı bulmayı ayrı adımlar yap.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Dokuz birim için N 9×3=27 mg ve P 9×2=18 mg gerekir.",
          },
          {
            label: "Adım 2",
            explanation: "P stoku 30 mg olduğundan hedef için yeterlidir.",
          },
          {
            label: "Adım 3",
            explanation:
              "N açığı 27−18=9 mg; bundan az eklenirse dokuz birimin N gereksinimi karşılanmaz.",
          },
        ],
        answer: "En az 9 mg ek N",
        check:
          "Ekleme sonrası N 27/P 30 mg; dokuz birim her ikisinin sınırı içindedir.",
        pitfall:
          "Ham P miktarı büyük diye P’nin gereksinim hesabını yapmadan hedefin kesin sağlandığını varsaymak.",
      },
      {
        title: "İyon yardımı ile işlem etkisini ayır",
        prompt:
          "Bir enzim hazırlığı başlangıçta 12 etkinlik birimi veriyor. Metal uzaklaştırma işlemi sonrası 3; aynı metal geri verilince 11; taşıyıcı sıvı verilince 3 ölçülüyor. Metal geri eklemesinin neyi desteklediğini ve uzaklaştırma adımı için gerekli ek denetimi belirt.",
        strategy:
          "Geri ekleme ile taşıyıcı kontrolünü karşılaştır; işlemin proteine başka etkisini ayrıca sorgula.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Metal geri eklemesiyle 11, taşıyıcıyla 3 bulunması verilen koşulda metalin yardımcı rolüyle uyumludur.",
          },
          {
            label: "Adım 2",
            explanation:
              "Başlangıç 12 değerine yakın toparlanma vardır; bu metalin yakıt olduğunu göstermez.",
          },
          {
            label: "Adım 3",
            explanation:
              "Aynı işlemin metal kaybı dışında protein yapısını değiştirip değiştirmediğini sınayan uygun işlem kontrolü mekanizma yorumunu güçlendirir.",
          },
        ],
        answer:
          "Yardımcı metal rolü desteklenir; işlemden kaynaklanan başka değişimler için kontrol gerekir.",
        check:
          "Aynı enzim miktarı, süre, pH ve sıcaklık korunmadan hızları tek etkene bağlamama koşulu sürer.",
        pitfall:
          "Geri eklemeyi bütün enzimlerin aynı metale gereksiniminin veya metalin enerji kaynağı olduğunun kanıtı saymak.",
      },
      {
        title: "Bitkide yeni atom üretilmez",
        prompt:
          "Bir bitkide başlangıçta 4 mg Fe, sonunda 10 mg Fe ölçülüyor. Ölçümler bütün bitkiyi kapsıyor; dışarıya Fe kaybı yok. Kökten alınma dışında bir Fe girişi bulunmadığı verilmiş. Dönemde dışarıdan alınan Fe miktarı nedir?",
        strategy:
          "Bütün bitkinin element sınırını çiz; toplamdaki farkı dış girişle eşleştir.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Bitkinin toplam Fe miktarı 10−4=6 mg artmıştır.",
          },
          {
            label: "Adım 2",
            explanation:
              "Organik molekül sentezi element atomu üretmez; Fe’nin bir yapıdan diğerine taşınması toplamı artırmaz.",
          },
          {
            label: "Adım 3",
            explanation:
              "Kayıp ve başka giriş dışlandığı için kökten alınan Fe 6 mg’dır.",
          },
        ],
        answer: "Dışarıdan 6 mg Fe alınmıştır.",
        check:
          "4+6=10 mg; ölçüm yalnız tek yaprağı kapsasaydı iç dağılım da değerlendirilirdi.",
        pitfall:
          "Bitki üretici olduğu için Fe artışını fotosentezle yeni demir elementi üretmesi olarak açıklamak.",
      },
      {
        title: "Toplam alınan miktardan hacme",
        prompt:
          "Varsayımsal alım modelinde Y çözeltisi 10 mg/L, 0,2 L; Z çözeltisi 5 mg/L ve hacmi bilinmiyor. Y’deki mineralin%40’ı, Z’dekinin%20’si alınıyor. Toplam alınan miktar 1,3 mg ise Z hacmi kaç L? Oranlar bu soruda sabit ve ayrı uygulanıyor.",
        strategy:
          "Bilinen kaynağın katkısını hesapla; hedefin kalan kısmını bilinmeyen kaynağın birim katkısına böl.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Y’de 10×0,2=2 mg mineral vardır; alınan 2×0,40=0,8 mg’dır.",
          },
          {
            label: "Adım 2",
            explanation:
              "Z’den alınması gereken 1,3−0,8=0,5 mg’dır; Z’nin litre başına alınan katkısı 5×0,20=1 mg’dır.",
          },
          {
            label: "Adım 3",
            explanation: "Gerekli Z hacmi 0,5/1=0,5 L bulunur.",
          },
        ],
        answer: "Z hacmi 0,5 L",
        check:
          "Z toplam 2,5 mg içerir; alınan 0,5 mg’dır ve 0,8+0,5=1,3 mg toplamını sağlar.",
        pitfall:
          "Çözelti miktarıyla alınan miktarı aynı saymak veya iki alım yüzdesini önce toplamak.",
      },
      {
        title: "Zincir türlerinden kükürt sayısına",
        prompt:
          "Tam tanımlı modelde A protein zinciri 2 S atomu, B zinciri 1 S atomu, C zinciri 0 S atomu içeriyor. On A zinciri ve bilinmeyen sayıda B zinciri toplam 32 S atomu taşıyor. B sayısını ve C bilgisinin genelleme açısından rolünü belirt.",
        strategy: "Atom toplamını zincir türlerinin katkılarına ayır.",
        steps: [
          {
            label: "Adım 1",
            explanation: "On A zincirinin katkısı 10×2=20 S atomudur.",
          },
          {
            label: "Adım 2",
            explanation:
              "B zincirlerinin katkısı 32−20=12; her biri 1 atom olduğundan 12 B zinciri vardır.",
          },
          {
            label: "Adım 3",
            explanation:
              "C’nin sıfır S içermesi, bu verilen modelde her proteinin kükürt içermesi gerektiği iddiasını engeller.",
          },
        ],
        answer:
          "12 B zinciri; C her proteine aynı S koşulunun yüklenemeyeceğini gösterir.",
        check:
          "20+12=32; belirli protein içeriği için amino asit tür/sayı bilgisi gerekir.",
        pitfall:
          "Bazı amino asitlerde kükürt bulunmasını her protein zincirinde aynı sayıda kükürt bulunması sanmak.",
      },
      {
        title: "Miktar eğrisinden büyüme hızına",
        prompt:
          "Özgün kültür verisinde 0,2,4,6.gün kuru kütle sırasıyla 10,14,14,20 mg. X minerali 2.gün, Y minerali 4.gün ekleniyor. Hangi iki günlük aralıkta ortalama kütle artış hızı en büyüktür? Sadece eğriyi yorumla; tek başına nedensellik sonucu istenmiyor.",
        strategy: "Her aralıkta son eksi ilk miktarı eşit süreye böl.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "0–2.gün hızı(14−10)/2=2 mg/gün; 2–4.gün hızı(14−14)/2=0’dır.",
          },
          {
            label: "Adım 2",
            explanation:
              "4–6.gün hızı(20−14)/2=3 mg/gündür ve ölçülen üç aralıkta en büyüktür.",
          },
          {
            label: "Adım 3",
            explanation:
              "En yüksek son kütleyle hız kavramlarını ayrı tuttuğumuz için yatay 14 mg dönemini büyüme hızı yüksek saymayız.",
          },
        ],
        answer: "En büyük ortalama hız 4–6.günde 3 mg/gün",
        check:
          "Üç dönemdeki toplam artış 4+0+6=10 mg; son−ilk 20−10=10 mg ile uyumludur.",
        pitfall:
          "Bir noktadaki toplam kütleyi aynı andaki büyüme hızı olarak kullanmak.",
      },
    ],
    recall: [
      {
        prompt:
          "Mineral içeren bir organik molekül yapılması neden mineral elementin üretildiği anlamına gelmez?",
        answer:
          "Canlı dışarıdan aldığı element atomlarını farklı yapılara bağlayabilir. Kimyasal molekül sentezi atomun element kimliğini başka elementten oluşturmaz.",
      },
      {
        prompt: "“Mineral sindirilmez” bilgisinden hangi iki ek sonuç çıkmaz?",
        answer:
          "Bütün mineralin emileceği ve hücreye taşınmanın her koşulda kendiliğinden olacağı çıkmaz. Çözünme, emilim ve taşıma ayrı koşullardır.",
      },
      {
        prompt:
          "Fosfatlı yapılarda ortak fosfor bulunması neden görevlerini eşitlemez?",
        answer:
          "Aynı element DNA’nın omurgasında, ATP’nin fosfatlarında veya fosfolipit başında farklı moleküler bağlamlara katılır; kalıtım, enerji aktarımı ve zar yapısı aynı görev değildir.",
      },
      {
        prompt:
          "Bir mineralin ham miktarı daha azken neden yine de sınırlayıcı olmayabilir?",
        answer:
          "Birim gereksinimi de daha az olabilir. Mevcut/gereken oranı daha yüksekse daha çok üretim birimini destekler; yalnız gram sırası yeterli değildir.",
      },
      {
        prompt:
          "Sınırlayıcı mineral eklendiğinde başka bir mineral nasıl yeni sınır olur?",
        answer:
          "İlk mineral kapasitesi yükselirken ötekinin stoku sabit kalabilir. Ortak üretimde küçük kalan kapasite yeni kısıt olur; ilk sınırlayıcı sonsuza dek aynı kalmaz.",
      },
      {
        prompt:
          "Bir büyüme grafiğinin yatay bölümü bitkinin öldüğünü kesin gösterir mi?",
        answer:
          "Hayır. Verilen aralıkta ölçülen miktar artmamıştır. Başka metabolik işler sürebilir; ölüm veya bütün gelecek zamanlar için yorum ek kanıt gerektirir.",
      },
    ],
    items: [
      {
        prompt:
          "Bir bitki aldığı sülfatı kullanarak kükürt içeren amino asitler yapıyor. Hangi yorum doğrudur?",
        correct:
          "Dışarıdan alınmış kükürt atomları yeni organik yapılara katılmıştır",
        wrong: [
          [
            "Fotosentez kükürt elementini başka elementten üretmiştir",
            "Organik molekül sentezi, element atomlarının kimliğini başka elementten kimyasal yolla oluşturmak değildir.",
          ],
          [
            "Amino asit oluşunca kükürt artık element olma özelliğini kaybeder",
            "Atomun farklı bileşiğe katılması element kimliğini ortadan kaldırmaz.",
          ],
          [
            "Organik yapı oluşması bitkinin mineral gereksinimini yok eder",
            "Yeni organik yapıda gereken elementlerin kaynağı yine alınan maddelerdir.",
          ],
          [
            "Kükürt içeren her molekül insan için kalori veren mineral sayılır",
            "Bir elementin organik yapı içinde bulunması onun mineral rolünü organik yakıt rolüyle eşitlemez.",
          ],
        ],
        knowledge: [
          "Canlılar mineral elementleri dışarıdan alıp organik yapılara katabilir; kimyasal sentez element kimliğini değiştirmez.",
        ],
        strategy: "Atomun kaynağıyla yeni molekülün yapımını ayrı izle.",
        steps: [
          "Kükürt bitkiye sülfatla alınmıştır.",
          "Yeni amino asit oluşurken bu element atomları başka bir moleküler yapıya bağlanır.",
          "İşlem yeni organik molekül sentezidir, yeni kükürt elementi üretimi değildir.",
        ],
        reason:
          "Doğru. Elementin kaynağı dış ortam, yeni bağlandığı yapı ise organik amino asittir.",
        commonError:
          "Üretici canlı terimini ihtiyaç duyduğu bütün elementleri de üreten canlı olarak okumak.",
        check:
          "Yeni ürün yapılırken kükürt atomlarının nereden geldiği sorudaki sülfat girdisiyle açıklanmalıdır.",
      },
      {
        prompt: "Ca²⁺ gösterimiyle ilgili hangi ifade doğrudur?",
        correct: "Kalsiyum elementine ait net+2 yüklü iyonu gösterir",
        wrong: [
          [
            "Birbirine bağlı iki kalsiyum atomunu gösterir",
            "Üstteki 2+ yükü belirtir; atom sayısı alt simgeyle aynı anlamda değildir.",
          ],
          [
            "İki protonunu kaybedip başka element olmuş atomu gösterir",
            "İyonlaşma elektron sayısıyla yükü değiştirir; proton kaybı ve başka element oluşumu bu gösterimin anlamı değildir.",
          ],
          [
            "Yüksüz kalsiyum molekülüdür",
            "Üstteki+2 net yükü bulunduğunu belirtir.",
          ],
          [
            "Kalsiyumun organik bir vitamin olduğunu gösterir",
            "Yük gösterimi elementin mineral niteliğini vitamin sınıfına dönüştürmez.",
          ],
        ],
        knowledge: [
          "İyon net yük taşıyan atom veya atom grubudur; üst simgedeki yük, element kimliği ve atom sayısından ayrıdır.",
        ],
        strategy:
          "Element simgesini ve üst yük işaretini iki ayrı bilgi olarak oku.",
        steps: [
          "Ca simgesi kalsiyumu belirtir.",
          "²⁺ üst simgesi net+2 yükü gösterir.",
          "Bu iki bilgi kalsiyum iyonunu tanımlar; iki atom veya yeni element sonucu vermez.",
        ],
        reason: "Doğru. Gösterim bir kalsiyum iyonunun yük durumunu anlatır.",
        commonError:
          "Üstteki yük sayısını moleküldeki atom adedi olarak kullanmak.",
        check: "Cevap hem Ca kimliğini hem+2 net yükünü korumalıdır.",
      },
      {
        prompt:
          "Fosfat gerektiren bir hücresel sentez, fosfat yokluğunda yavaşlıyor. Bu gözlemden“fosfor insan için enerji veren bir yakıttır” sonucu çıkar mı?",
        correct:
          "Hayır; yapı veya işlev için gereklilik, organik yakıt olmayı kanıtlamaz",
        wrong: [
          [
            "Evet; her gerekli madde doğrudan kalori veren yakıttır",
            "Su ve mineraller gibi gerekli maddeler yapısal veya düzenleyici görev alabilir; gereklilik yakıt sınıfı değildir.",
          ],
          [
            "Evet; fosforun herhangi bir molekülde bulunması onu yakıt yapar",
            "Moleküle katılma, elementin organik besin gibi yıkılarak enerji verdiği anlamına gelmez.",
          ],
          [
            "Hayır; fosfor hiçbir hücresel yapıda bulunamaz",
            "Fosfat grupları ATP, nükleik asit ve fosfolipit gibi yapılarda bulunur.",
          ],
          [
            "Hayır; fosfat eklenen bütün hücrelerde metabolizma tamamen durur",
            "Fosfatın verilmiş senteze katkısıyla böyle evrensel durma iddiası bağdaşmaz.",
          ],
        ],
        knowledge: [
          "Mineral bir yapının veya enzimin işlevi için gerekli olabilir; bu, insanda enerji veren organik besin rolünden ayrıdır.",
        ],
        strategy:
          "Gözlenen yavaşlamanın hangi gerekliliği gösterdiğini, yakıt iddiasından ayır.",
        steps: [
          "Veri fosfat koşulu değişince bir sentezin yanıtını bildirir.",
          "Bu, ilgili yapı veya işlev için fosfat gereksinimiyle uyumludur.",
          "Fosforun organik yakıt gibi enerji verdiği ölçülmediği için o sonuç kurulmaz.",
        ],
        reason:
          "Doğru. Bir sürecin çalışmasına katkı ile besinsel enerji kaynağı rolü aynı değildir.",
        commonError:
          "“Eksikliği işlevi azaltır” bilgisini “yakılarak enerji verir” sonucuna çevirmek.",
        check:
          "Sonuç, fosfatın katkısını reddetmeden enerji kaynağı iddiasını ayrı tutmalıdır.",
      },
      {
        prompt:
          "Verilen bir modelde X eksikliği hem grubunun yapılmasını, Y eksikliği klorofilin merkez yapısını aksatıyor. X ve Y farklı mineral elementleridir. Hangisi bu ayrımla uyumludur?",
        correct:
          "X yerine Y’yi artırmak, hem için gereken elementin sağlandığını tek başına göstermez",
        wrong: [
          [
            "İki yapı da canlıda bulunduğu için X ve Y aynı elementtir",
            "Canlı yapılara katılma ortaklığı element kimliğinin aynı olduğunu göstermez; hem ve klorofil merkezleri farklıdır.",
          ],
          [
            "Y eklendiğinde X’in atom kimliği mutlaka oluşur",
            "Bir mineralin miktarını artırmak başka bir element atomunu kimyasal olarak üretmez.",
          ],
          [
            "Hem ve klorofil aynı biyolojik görevdedir",
            "Hemoglobin bağlamında gaz taşıma, klorofil bağlamında ışık yakalama farklı işlevlerdir.",
          ],
          [
            "X ve Y yalnız organik yakıt olarak görev alır",
            "Yapısal mineral gerekliliği verilmiştir; yalnız yakıt sınıflaması doğru değildir.",
          ],
        ],
        knowledge: [
          "Hem grubunda Fe, klorofil merkezinde Mg bulunur; mineral kimlikleri ve özel görevleri otomatik yer değiştirmez.",
        ],
        strategy: "Farklı yapılar için verilen özel mineral koşulunu koru.",
        steps: [
          "X hem, Y klorofil merkez gereksinimiyle eşleştirilmiştir.",
          "Bu iki bağlamdaki Fe ve Mg farklı elementlerdir.",
          "Y’nin fazlası X’in özel yapısal gereksiniminin karşılandığını kanıtlamaz.",
        ],
        reason:
          "Doğru. Ortak gereklilik, farklı minerallerin her yapıda birbirinin yerini alacağı anlamına gelmez.",
        commonError:
          "İki mineralin de önemli olmasını tam işlevsel değiştirilebilirlik sanmak.",
        check:
          "Cevap element kimliklerini ve yapıların farklı görevlerini birbirine karıştırmamalıdır.",
      },
      {
        prompt:
          "Bir tabloda kemik mineral yapısında hem kalsiyum hem fosfat bulunduğu, ATP’de ise fosfat grupları olduğu belirtiliyor. Bu tablo hangi sonucu destekler?",
        correct:
          "Aynı yapı birden fazla mineral bileşen taşıyabilir; bir mineral bileşen de farklı yapılarda bulunabilir",
        wrong: [
          [
            "Kemikte yalnız kalsiyum bulunabilir",
            "Tablo fosfatı da kemik yapısında vermiştir.",
          ],
          [
            "Fosfat bulunduğu için kemik ve ATP aynı moleküldür",
            "Ortak bileşen, bütün moleküler yapı ve işlevlerin özdeş olduğu anlamına gelmez.",
          ],
          [
            "Kalsiyum her ATP molekülünün fosfatı yerine zorunlu olarak geçer",
            "Minerallerin yapıdaki rolleri bu biçimde değiş tokuş edilemez; tablo böyle bir yerine geçmeyi vermez.",
          ],
          [
            "Kemik yapısı için hiçbir element dışarıdan alınmaz",
            "Mineral element gereksiniminin dış kaynaklardan sağlanması, bu yapısal tabloda ortadan kalkmaz.",
          ],
        ],
        knowledge: [
          "Bir yapı birden çok element içerebilir; aynı element farklı işlevli yapılara katılabilir.",
        ],
        strategy:
          "Tabloyu yapıdan elemente ve elementten yapıya iki yönde oku.",
        steps: [
          "Kemik satırında kalsiyum ve fosfat birlikte verilmiştir.",
          "Fosfat hem kemik hem ATP satırlarında bulunur.",
          "Bu iki gözlem çoklu bileşen ve çoklu kullanım sonucunu destekler; özdeş molekül sonucunu vermez.",
        ],
        reason:
          "Doğru. Yapı–mineral ilişkisi zorunlu tekten teke eşleştirme değildir.",
        commonError:
          "Her yapıya yalnız bir mineral, her minerale yalnız bir yapı atamak.",
        check: "Doğru seçenek tablodaki iki ortaklığı da korumalıdır.",
      },
      {
        prompt:
          "İyodun belirli tiroit hormonlarının yapısında bulunduğu biliniyor. Bu bilgiden hangisi çıkarılamaz?",
        correct: "Bütün hormon türlerinin yapısında mutlaka iyot bulunduğu",
        wrong: [
          [
            "İyodun bazı hormonların yapısal bileşeni olabildiği",
            "Verilen tiroit hormonu ilişkisi bu sınırlı sonucu doğrudan destekler.",
          ],
          [
            "Yapısal görevin belirli molekül adıyla okunması gerektiği",
            "İyot için verilen moleküler bağlamı korumak doğru eşleştirmeyi sağlar.",
          ],
          [
            "Bir elementin düzenleyici bir molekülün yapısına katılabildiği",
            "Hormonlar düzenleyici işlevli moleküllerdir; iyodun böyle bir yapıda bulunması buna örnektir.",
          ],
          [
            "İyotla ilgili genellemede kapsam sözcüklerinin denetlenmesi gerektiği",
            "Belirli hormonlardan bütün hormonlara geçiş kapsamı genişlettiği için denetim gerekir.",
          ],
        ],
        knowledge: [
          "Belirli moleküllerde bulunan element, bütün aynı üst sınıf moleküllerin zorunlu ortak elementi değildir.",
        ],
        strategy:
          "“Belirli tiroit hormonları” kapsamını“bütün hormonlar” kapsamıyla karşılaştır.",
        steps: [
          "Verilen yapı ilişkisi iyot ve bazı tiroit hormonları arasındadır.",
          "Diğer hormon türlerinin bileşimi soruda verilmemiştir.",
          "Bu yüzden bütün hormonların iyot taşıdığı evrensel sonucu kurulamaz.",
        ],
        reason:
          "Doğru. Belirli bir alt gruptaki yapı bilgisinden bütün hormonlara zorunluluk yüklenemez.",
        commonError:
          "Bir örneğin bileşenini aynı üst sınıftaki bütün moleküllerde aramak.",
        check:
          "Çıkarılamayan seçenek “bütün” diyerek verilmiş molekül kapsamını aşmalıdır.",
      },
      {
        prompt:
          "Bir proteindeki kükürt atomlarının, kükürt içeren amino asitlerden geldiği gösteriliyor. Bu gözlem için uygun yorum hangisidir?",
        correct:
          "Mineral element atomları organik bir molekülün yapısında da bulunabilir",
        wrong: [
          [
            "Kükürt protein içinde yer alınca başka bir elemente dönüşmüştür",
            "Bağlandığı molekülün değişmesi elementin kimliğini değiştirmez.",
          ],
          [
            "Protein organik olduğu için içinde hiçbir mineral element bulunamaz",
            "Organik moleküller, kükürt veya fosfor gibi elementleri yapılarında taşıyabilir.",
          ],
          [
            "Veri bütün proteinlerde aynı sayıda kükürt olduğunu kanıtlar",
            "Tek proteindeki kaynak bilgisi bütün proteinlerin amino asit dizisini ve S sayısını vermez.",
          ],
          [
            "Kükürdün tek görevi insan için organik yakıt olmaktır",
            "Yapısal katkı verilmiştir; yalnız yakıt rolü iddiası bu veriden çıkmaz.",
          ],
        ],
        knowledge: [
          "Organik molekül yapısı ile o yapıya katılan elementin kimliği farklı sınıflama düzeyleridir.",
        ],
        strategy:
          "Molekülün organik niteliğini, içindeki atomların element kimliğinden ayır.",
        steps: [
          "İncelenen protein organik bir yapıdır.",
          "Kükürt atomları amino asitler yoluyla bu yapıya katılmıştır.",
          "Bu durum mineral elementlerin organik yapılarda da yer alabildiğini gösterir.",
        ],
        reason:
          "Doğru. Element atomları organik molekülde bulunurken element kimliklerini korur.",
        commonError:
          "Organik bir molekülün yapısındaki bütün elementleri yalnız karbon ve hidrojen sanmak.",
        check:
          "Doğru yorum tek proteinin verisini bütün proteinlerin aynı bileşimi olduğu iddiasına genişletmemelidir.",
      },
      {
        prompt:
          "Bir açıklamada“Çinko bazı proteinlerin işlevsel düzenine yardımcı olabilir” deniyor. Hangisi bu ifadeyi doğru sınırlar?",
        correct:
          "Yardımcı iyonun katkısı, proteinin amino asit zincirinin çinko atomlarından yapıldığı anlamına gelmez",
        wrong: [
          [
            "Çinko bütün amino asitlerin yerini tutabilir",
            "Bir yardımcı iyon, protein zincirinin yapı taşlarının yerine geçmez.",
          ],
          [
            "Çinkonun katkısı varsa protein içinde hiç amino asit bulunamaz",
            "Protein yapısı ile yardımcı iyon katkısı birlikte bulunabilir.",
          ],
          [
            "Aynı yardım bütün enzimlerde aynı biçimde zorunludur",
            "İfade bazı proteinler hakkındadır; bütün enzimlere aynı zorunluluğu vermez.",
          ],
          [
            "Çinko bulunması hücrenin başka mineral ihtiyacını kesin bitirir",
            "Bir mineralin işlevi diğer elementlerin farklı gereksinimlerini otomatik karşılamaz.",
          ],
        ],
        knowledge: [
          "Protein amino asit zinciri ile işlevine katılan yardımcı mineral iyonu aynı yapısal rol değildir.",
        ],
        strategy:
          "Yardımcı rol sözcüğünü, ana zincirin yapı taşı rolüne dönüştürme.",
        steps: [
          "Veri çinkonun bazı proteinlerin düzenine katkı verebildiğini söyler.",
          "Amino asit zincirinin yerine geçtiği veya bütün enzimlerde aynı olduğu belirtilmez.",
          "Yardımcı katkıyı ana zincirden ayıran yorum sınırı korur.",
        ],
        reason:
          "Doğru. Bir iyonun ilişkilendiği protein, onun atomlarından oluşan bir zincir olarak tanımlanmaz.",
        commonError:
          "Proteinle birlikte bulunan her bileşeni proteinin amino asit omurgasıyla özdeşleştirmek.",
        check:
          "Cevap hem yardımcı rolü kabul etmeli hem “bazı” kapsamını korumalıdır.",
      },
      {
        prompt:
          "Diş mineral dokusuyla ilgili bir metin florür iyonundan söz ediyor. F⁻ ile F₂ için doğru ayrım hangisidir?",
        correct:
          "F⁻ net eksi yüklü iyon, F₂ ise iki flor atomlu yüksüz moleküldür",
        wrong: [
          [
            "F⁻ iki flor atomunun yüksüz birleşimidir",
            "Üstteki eksi net yükü belirtir; iki atomlu molekül gösterimi F₂’dir.",
          ],
          [
            "F₂’deki alt 2 net+2 yük anlamına gelir",
            "Alt simge atom sayısıdır; yük işaretiyle aynı değildir.",
          ],
          [
            "İkisi aynı kimyasal türün birbirinin yerine geçen iki yazımıdır",
            "Atom sayısı ve yük farklı olduğundan aynı kimyasal tür değildir.",
          ],
          [
            "F⁻ bir protein zincirinin adıdır",
            "Gösterim florür iyonudur; protein dizisini belirtmez.",
          ],
        ],
        knowledge: [
          "Alt simge atom sayısını, üst işaret net elektrik yükünü anlatır; flor elementi ve florür iyonu aynı kimyasal tür değildir.",
        ],
        strategy: "İki gösterimde atom sayısı ve yük bilgisini ayrı ayrı oku.",
        steps: [
          "F⁻ tek flor simgesiyle eksi yük taşır.",
          "F₂ iki flor atomunun molekülünü belirtir; net yük işareti verilmemiştir.",
          "Bu nedenle iyon ile yüksüz iki atomlu molekül ayrımı yapılır.",
        ],
        reason:
          "Doğru. Florürle ilgili biyolojik bağlam, F₂ molekülünü aynı tür yapmaz.",
        commonError:
          "Element simgesi ortak diye iyon yükünü ve moleküldeki atom sayısını yok saymak.",
        check:
          "Seçenek iki gösterimde hem yük hem atom sayısı farkını korumalıdır.",
      },
      {
        prompt:
          "İki hücre modelinde toplam sodyum miktarı aynı, fakat birinde sodyum daha çok hücre içinde, diğerinde daha çok dış ortamda bulunuyor. Hangi yorum uygundur?",
        correct:
          "Aynı toplam miktar, zarın iki yanındaki iyon dağılımının aynı olduğunu göstermez",
        wrong: [
          [
            "Toplam aynıysa bütün elektriksel ve osmotik koşullar zorunlu aynıdır",
            "Dağılımın farklılığı yerel derişimleri ve zarın iki yanı arasındaki ilişkiyi etkileyebilir.",
          ],
          [
            "Sodyum bir taraftan diğerine geçince potasyuma dönüşür",
            "İyonun yer değiştirmesi element kimliğini başka elemente dönüştürmez.",
          ],
          [
            "Hücre dışında bulunan bütün iyonlar gereksizdir",
            "İyonların uygun hücre içi-dışı dağılımı işlevlerle ilişkilidir; dışta bulunma gereksizlik değildir.",
          ],
          [
            "İyonların yeri biyolojik işlevle hiç ilişkili olamaz",
            "Sinir, kas ve su dengesi gibi işlevlerde iyon dağılımları önem taşır.",
          ],
        ],
        knowledge: [
          "İyon dengesinde toplam miktarın yanında hücre içi ve dışındaki dağılım da önemlidir.",
        ],
        strategy: "Toplamı, iki bölmedeki miktarların ayrı değerlerinden ayır.",
        steps: [
          "İki modelin toplamı aynı verilmiştir.",
          "Bu toplamın iç ve dışa paylaşımı farklıdır.",
          "Aynı toplamdan aynı zar dağılımı veya bütün işlevlerin eşitliği sonucu çıkmaz.",
        ],
        reason: "Doğru. Yerel dağılım, tek bir toplam ölçümünden belirlenemez.",
        commonError:
          "Toplam mineral miktarını bütün bölmelerdeki derişim düzeninin eksiksiz ölçümü saymak.",
        check:
          "Cevap soruda açıkça verilmiş iç-dış dağılım farkını silmemelidir.",
      },
      {
        prompt:
          "Mineral X çözeltisi 8 mg/L ve hacmi 250 mL. Alınma veya emilim oranı verilmemiş. Hangi sonuç doğrudur?",
        correct:
          "Çözeltide 2 mg X vardır; hücreye alınan miktar bu bilgiyle kesin bulunmaz",
        wrong: [
          [
            "Çözeltide 2000 mg X vardır",
            "250 mL önce 0,25 L’ye çevrilmelidir; 8×250 işlemi litre-mililitre birimlerini karıştırır.",
          ],
          [
            "Hücre kesin 2 mg X almıştır",
            "Çözeltide bulunan toplamla hücreye geçen miktar aynı olmak zorunda değildir; alım verisi yoktur.",
          ],
          [
            "Çözeltide 8 mg X vardır",
            "8 mg bir litre içindir; verilen hacim bir litrenin dörtte biridir.",
          ],
          [
            "X sindirilmediği için çözeltideki miktarı hesaplanamaz",
            "Derişim×hacim hesabı sindirim gereksiniminden bağımsızdır; çözelti miktarı hesaplanabilir.",
          ],
        ],
        knowledge: [
          "Toplam miktar=derişim×hacim; mg/L ile hesapta hacim litreye çevrilir. Alınan miktar ayrıca belirlenir.",
        ],
        strategy:
          "Birim dönüşümünü yap; sonra çözelti miktarıyla alım yorumunu ayrı tut.",
        steps: [
          "250 mL=0,25 L’dir.",
          "Çözeltideki X 8×0,25=2 mg’dır.",
          "Alım oranı veya doğrudan ölçüm olmadığından hücreye geçen kesin miktar bulunmaz.",
        ],
        reason:
          "Doğru. Hesap çözeltide bulunan miktarı verir; alımın tamamlandığı sonucunu vermez.",
        commonError:
          "Derişim-hacim çarpımından bulunan miktarı otomatik olarak hücreye geçen miktar saymak.",
        check:
          "Sonuç 2 mg için birim mg/L×L=mg olmalı; ikinci sonuç veri sınırını korumalıdır.",
      },
      {
        prompt:
          "Aynı tür ve başlangıçta, diğer koşulları eşit bitkilerde A: X var/Y var; B: X yok/Y var; C: X var/Y yok. Y yeterliyken X koşulunun etkisini ayırmak için hangi karşılaştırma uygundur?",
        correct: "A ile B",
        wrong: [
          [
            "A ile C",
            "A/C yalnız Y farkını X varken karşılaştırır; istenen X farkı değildir.",
          ],
          [
            "B ile C",
            "B/C’de hem X hem Y’nin varlık durumu farklıdır; tek etken ayrışmaz.",
          ],
          [
            "Yalnız A’nın büyümesi",
            "Tek referans grubunun sonucu X yokluğuyla karşılaştırma sağlamaz.",
          ],
          [
            "En hızlı büyüyen grupla rastgele bir grup",
            "Sonuç büyüklüğü, koşulların kontrollü biçimde farklı olduğu anlamına gelmez.",
          ],
        ],
        knowledge: [
          "Bir mineralin etkisini ayırırken diğer mineral ve ilgili ortam koşulları eş tutulur.",
        ],
        strategy:
          "Y sütununda yeterli olan aynı koşulu seç; X’in değiştiğini denetle.",
        steps: [
          "A ile B’de Y vardır.",
          "Bu iki grupta yalnız X var/yok koşulu değişir.",
          "Bu yüzden Y varken X karşılaştırması A/B ile kurulur.",
        ],
        reason:
          "Doğru. Seçilen çift, verilen mineral koşulları içinde yalnız X’te farklıdır.",
        commonError:
          "Büyüme değeri yüksek diye denetimsiz iki gruptan tek mineral etkisi çıkarmak.",
        check: "Karşılaştırmada Y durumu aynı kalmalı, X durumu değişmelidir.",
      },
      {
        prompt:
          "Kayıpsız bir modelde bir tam ürün 6 mg X ve 3 mg Y gerektiriyor. Kullanılabilir X 24 mg, Y 15 mg; diğer etkenler yeterli. En çok tam ürün sayısı ve düşük kapasiteyi veren mineral hangisidir?",
        correct: "4 ürün, X",
        wrong: [
          [
            "5 ürün, Y",
            "Y 15/3=5 ürün destekler; fakat X 24/6=4 ile daha düşük ortak kapasite verir.",
          ],
          [
            "4 ürün, Y",
            "Ürün sayısı 4 olsa da küçük kapasite Y değil X’tedir.",
          ],
          [
            "15 ürün, Y",
            "Y’nin ham mg miktarı ürün adedi değildir; gereksinime bölünmelidir.",
          ],
          [
            "9 ürün, ikisi birlikte",
            "Kapasiteler 4 ve 5’tir; zorunlu kaynaklar için bunlar toplanmaz, en küçüğü seçilir.",
          ],
        ],
        knowledge: [
          "Ortak üretimde her zorunlu mineral için mevcut/birim gereksinim kapasitesi bulunur; en küçük kapasite sınırlar.",
        ],
        strategy:
          "Ham miktarları karşılaştırmak yerine iki ayrı ürün kapasitesi kur.",
        steps: [
          "X kapasitesi 24/6=4 üründür.",
          "Y kapasitesi 15/3=5 üründür.",
          "İkisi birlikte gerektiği için ortak en çok 4 ürün elde edilir; X düşük kapasiteyi verir.",
        ],
        reason:
          "Doğru. X’in dört ürün kapasitesi, Y’nin beş ürün kapasitesinden küçüktür.",
        commonError:
          "En az ham mg bulunan minerali gereksinimini dikkate almadan sınırlayıcı seçmek.",
        check: "Beş ürün X’ten 30 mg isterdi; mevcut 24 mg buna yetmez.",
      },
      {
        prompt:
          "Bir model ürün 3 mg A ve 5 mg B gerektiriyor. A 18 mg, B 30 mg; başka kısıt veya kayıp yok. Hangi sonuç doğrudur?",
        correct: "İki kapasite de 6’dır; A ve B birlikte sınır oluşturur",
        wrong: [
          [
            "Ham miktarı daha az olan A tek başına sınırlayıcıdır",
            "A’nın gereksinimi de daha azdır; 18/3=30/5=6 kapasite verir.",
          ],
          [
            "B daha çok bulunduğu için sınırsız ürün yapılabilir",
            "B’nin miktarı sonludur ve A da zorunlu bir kaynaktır.",
          ],
          [
            "Kapasiteler 6 ve 6 olduğundan 12 ürün yapılır",
            "İki zorunlu kaynak aynı ürünlere birlikte katılır; kapasiteleri toplamak doğru değildir.",
          ],
          [
            "Yalnız B artırılırsa ortak kapasite kesin 12 olur",
            "A kapasitesi 6’da kalır; B artışı tek başına ortak sınırı yükseltmez.",
          ],
        ],
        knowledge: [
          "Sabit gereksinim modelinde eşit en küçük kapasiteler birlikte sınırlayıcı olabilir.",
        ],
        strategy:
          "İki mineralin miktarını kendi gereksinimine böl ve oranların eşitliğine bak.",
        steps: [
          "A 18/3=6 ürün destekler.",
          "B 30/5=6 ürün destekler.",
          "Ortak kapasite 6’dır; ikisi de aynı sınıra ulaştığı için tek birini ayrıcalıklı seçme.",
        ],
        reason: "Doğru. Gereksinime göre iki stok aynı ortak kapasiteyi verir.",
        commonError:
          "Sınırlayıcı etkenin her soruda mutlaka tek bir mineral olması gerektiğini sanmak.",
        check:
          "Altı üründe 18 mg A ve 30 mg B tüketilerek iki stok da tam kullanılır.",
      },
      {
        prompt:
          "Kayıpsız modelde bir ürün 3 mg X ve 2 mg Y gerektiriyor. İlk stok X 30 mg, Y 12 mg. Y değişmeden X 60 mg yapılıyor. En çok tam ürün sayısı nasıl değişir?",
        correct: "6’dan 6’ya; Y kapasitesi aynı sınırda kalır",
        wrong: [
          [
            "10’dan 20’ye",
            "Y gereksinimi dışarıda bırakılarak yalnız X kapasitesi okunmuştur.",
          ],
          [
            "6’dan 12’ye",
            "X’in iki kat olması, diğer zorunlu kaynak Y sabitken ortak sonucu iki kat yapmaz.",
          ],
          ["12’den 24’e", "Y’nin ham mg miktarı ilk ürün sayısı değildir."],
          [
            "6’dan 0’a",
            "Soruda X fazlalığı için toksisite veya başka olumsuz etki verilmemiştir; model kapasitesi sıfırlanmaz.",
          ],
        ],
        knowledge: [
          "Sınırlayıcı olmayan kaynağı artırmak, başka zorunlu kaynak kapasitesi sabitken ortak üretimi artırmayabilir.",
        ],
        strategy: "İlk ve son durumda iki kapasitenin küçüğünü ayrı ayrı seç.",
        steps: [
          "İlk kapasiteler X 30/3=10, Y 12/2=6’dır; ortak sonuç 6.",
          "Ekleme sonrası X 60/3=20 olur, Y yine 6’dır.",
          "Her iki durumda da Y’nin 6 kapasitesi sınırı korur.",
        ],
        reason:
          "Doğru. Ek X, yeterli Y olmadan bu verilen modelde daha çok tam ürün sağlamaz.",
        commonError:
          "Bir mineral iki katına çıkınca her üretim sonucunun da zorunlu iki katına çıkacağını düşünmek.",
        check: "Altıdan fazla üründe gereken Y miktarı 12 mg’ı aşar.",
      },
      {
        prompt:
          "Bir ürün 4 mg X ve 3 mg Y gerektiriyor. Başlangıç X 20 mg, Y 21 mg. Sonra yalnız X’e 16 mg ekleniyor. Diğer koşullar yeterli ve kayıp yok. İlk ve son durumda en düşük kapasiteyi veren mineral sırasıyla hangisidir?",
        correct: "X, sonra Y",
        wrong: [
          [
            "Y, sonra X",
            "İlk oranlar 5 ve 7; son oranlar 9 ve 7’dir; verilen sıra tersine çevrilmiştir.",
          ],
          [
            "Her iki durumda X",
            "X eklemesi kapasitesini 5’ten 9’a yükseltir; son durumda Y’nin 7 kapasitesi daha küçüktür.",
          ],
          [
            "Her iki durumda Y",
            "Başlangıçta X kapasitesi 20/4=5 ile Y’nin 7 kapasitesinden düşüktür.",
          ],
          [
            "Hiçbiri; bir mineral eklenince bütün kısıtlar kalkar",
            "Y stoku 21 mg ile sabit ve sonludur; ekleme bütün gereksinimleri sınırsız yapmaz.",
          ],
        ],
        knowledge: [
          "Bir kaynak artırıldığında küçük kapasite başka zorunlu kaynağa geçebilir.",
        ],
        strategy:
          "Eklemeden önce ve sonra mevcut/gereken oranlarını yeniden kur.",
        steps: [
          "Başlangıç X 20/4=5, Y 21/3=7; ilk sınır X’tir.",
          "Son X 36/4=9, Y yine 7’dir.",
          "Son küçük kapasite Y’ye geçtiği için sıra X→Y olur.",
        ],
        reason:
          "Doğru. İlk kısıtı gidermek, diğer kaynağın sonlu kapasitesini yeni sınır yapmıştır.",
        commonError:
          "İlk belirlenen sınırlayıcıyı stoklar değiştikten sonra da yeniden hesaplamadan korumak.",
        check:
          "Son durumda yedi ürün için 28 mg X ve 21 mg Y gerekir; Y tam sınırdadır.",
      },
      {
        prompt:
          "Sadece tam ürünlerin sayıldığı kayıpsız modelde bir ürün 4 mg X ve 5 mg Y kullanıyor. Stok X 11 mg, Y 13 mg. En çok tam ürün sonrası artan X ve Y miktarları sırasıyla nedir?",
        correct: "2 ürün; 3 mg X ve 3 mg Y artar",
        wrong: [
          [
            "3 ürün; −1 mg X ve−2 mg Y artar",
            "Negatif kalan stok, mevcut kaynağın aşıldığını gösterir; üç tam ürün mümkün değildir.",
          ],
          [
            "2 ürün; iki mineralden de 0 mg artar",
            "İki ürün 8 mg X ve 10 mg Y tüketir; başlangıç 11 ve 13 olduğundan ikisinden de 3 mg kalır.",
          ],
          [
            "1 ürün; 7 mg X ve 8 mg Y artar",
            "Bu stok hesabı bir ürün için doğrudur; fakat iki tam ürün de yapılabildiğinden en çok sonucu değildir.",
          ],
          [
            "2,6 tam ürün; hiç Y artmaz",
            "2,6 kesirli kapasitedir; soruda yalnız tam ürünler sayıldığı için 2’ye inilir.",
          ],
        ],
        knowledge: [
          "Tam ürün sayısında en küçük kapasitenin tam kısmı kullanılır; kalan stok başlangıç eksi tüketimdir.",
        ],
        strategy:
          "Önce tam ürün sınırını bul, sonra her mineralin tüketimini ayrı çıkar.",
        steps: [
          "X kapasitesi 11/4=2,75, Y kapasitesi 13/5=2,6; en çok 2 tam üründür.",
          "İki ürün 8 mg X ve 10 mg Y kullanır.",
          "Kalanlar 11−8=3 ve 13−10=3 mg’dır.",
        ],
        reason:
          "Doğru. Tam ürün koşulu nedeniyle en düşük kaynaktan bile pozitif artık kalabilir.",
        commonError:
          "Sınırlayıcı kaynak varsa tam ürünlerden sonra mutlaka sıfır kalacağını sanmak.",
        check:
          "Üçüncü ürün için 12 mg X ve 15 mg Y gerekir; iki stok da buna yetmez.",
      },
      {
        prompt:
          "Özgün varsayımsal deneyde X derişimi 0,2,5,9 mg/L için aynı sürede ortalama kuru kütle artışları 1,4,4,2 mg.16 mg/L ölçülmemiştir. Hangi yorum doğrudur?",
        correct:
          "Ölçülen en yüksek sonuç 2 ve 5 mg/L’de 4 mg’dır; 16 mg/L için kesin değer verilmez",
        wrong: [
          [
            "X ne kadar artarsa sonuç daima artar",
            "5’ten 9 mg/L’ye çıkarken artış 4’ten 2 mg’a düşmüştür.",
          ],
          [
            "16 mg/L’de kesin 8 mg artış olur",
            "Ölçülmeyen düzey için bu sayıyı verecek model veya veri bulunmuyor.",
          ],
          [
            "0 mg/L’de artış olması X elementinin canlıda üretildiğini kanıtlar",
            "Başlangıç depoları ve başka etkenler dışlanmamıştır; sıfır ortam derişimi atom üretiminin kanıtı değildir.",
          ],
          [
            "2 ve 5 mg/L sonuçları aynı olduğundan bütün dozlarda etki yoktur",
            "Diğer ölçümlerde 1 ve 2 mg gibi farklı sonuçlar vardır; iki eşit noktadan bütün düzeylere yokluk çıkarılamaz.",
          ],
        ],
        knowledge: [
          "Miktar–yanıt verisi ölçülen aralıkta okunur; plateau veya yüksek düzey düşüşü, sonsuz artış iddiasını sınırlayabilir.",
        ],
        strategy: "En yüksek ölçümü ve henüz ölçülmemiş düzeyi ayrı bul.",
        steps: [
          "Dört ölçümde en büyük artış 4 mg’dır; iki farklı X düzeyinde elde edilmiştir.",
          "9 mg/L’de sonuç 2 mg olduğundan artışın sürekli yükseldiği iddiası bozulur.",
          "16 mg/L’ye kesin sayı taşımak için ek ölçüm veya model gerekir.",
        ],
        reason:
          "Doğru. Verilmiş tepe ölçümleri korunur, ölçülmemiş düzeye sayı eklenmez.",
        commonError:
          "İlk yükselişi bütün yüksek mineral derişimleri için değişmez eğilim saymak.",
        check:
          "Cevap 9 mg/L’deki düşüşü ve 16 mg/L veri yokluğunu birlikte korumalıdır.",
      },
      {
        prompt:
          "Bir bitki X eklenmeyen ortamda ilk iki gün büyüyor; başlangıç dokusunda X bulunduğu ayrıca ölçülmüş. Hangi sonuç uygundur?",
        correct:
          "Başlangıçtaki X deposunun kullanılması büyümeyle uyumlu olabilir; bu gözlem yeni X elementi üretildiğini göstermez",
        wrong: [
          [
            "Bitki kimyasal tepkimelerle yeni X atomu üretmiştir",
            "Doku deposu bulunduğundan büyümeyi açıklamak için element üretimi gerekmez; kimyasal molekül sentezi atom kimliği üretimi değildir.",
          ],
          [
            "X bütün bitkiler için kesin gereksizdir",
            "Kısa sürede depo kullanımı, bütün yaşam ve türlerde gereksizliği göstermez.",
          ],
          [
            "X içeren hiçbir molekül sentezlenemez",
            "Başlangıçta bulunan X atomları yeni yapılara katılabilir.",
          ],
          [
            "İlk iki gün büyüme varsa sonraki bütün sürelerde aynı büyüme sürer",
            "Sınırlı depo ve kısa gözlem, süresiz aynı büyümeyi zorunlu kılmaz.",
          ],
        ],
        knowledge: [
          "Ortamdan yeni giriş olmaması, organizmanın başlangıçta hiç stok taşımadığı anlamına gelmez.",
        ],
        strategy:
          "Dış ortam koşulunu, dokunun başlangıç stoğuyla birlikte değerlendir.",
        steps: [
          "Ortam X eklenmeden kurulmuştur fakat bitki dokusunda başlangıç X’i vardır.",
          "Bu stok ilk dönemde yapılara aktarılabilir.",
          "Kısa büyüme gözleminden ne element üretimi ne evrensel gereksizlik çıkarılır.",
        ],
        reason:
          "Doğru. Başlangıç deposu, ortamda ekleme olmadan kısa süreli kullanım olanağı sağlayabilir.",
        commonError: "Sıfır dış eklemeyi sıfır toplam başlangıç stoku sanmak.",
        check:
          "Cevapta başlangıç dokusunda ölçülmüş X bilgisi yok sayılmamalıdır.",
      },
      {
        prompt:
          "Varsayımsal bir organizmanın aynı işlev döneminde A mineralinden 6 mg, B mineralinden 0,04 mg gerektiği veriliyor. İkisi de zorunludur. Hangi yorum doğrudur?",
        correct:
          "B’nin daha az miktarda gerekmesi, özel görevinin önemsiz olduğu anlamına gelmez",
        wrong: [
          [
            "B az gerektiği için başka mineral olmadan tamamen gereksizdir",
            "Soruda iki mineralin de zorunlu olduğu açıkça verilmiştir.",
          ],
          [
            "A miktarı B’den büyük olduğu için B’nin bütün görevlerini devralır",
            "Miktar farkı özel işlevlerin değiştirilebilirliğini göstermez.",
          ],
          [
            "B’nin gereksinimi sıfırdır",
            "0,04 mg küçük fakat sıfır olmayan bir gereksinimdir.",
          ],
          [
            "İki mineralin bütün moleküler görevleri aynı olmalıdır",
            "Zorunluluk ortaklığı aynı yapıya veya aynı göreve sahip olmayı gerektirmez.",
          ],
        ],
        knowledge: [
          "Makro-iz miktar ayrımı önem sıralaması veya özel görevlerin birbirinin yerine geçmesi değildir.",
        ],
        strategy:
          "Küçük miktarı sıfır gereksinimle ve önemsizlikle karıştırma.",
        steps: [
          "A gereksinimi 6 mg, B gereksinimi 0,04 mg olarak verilmiştir.",
          "B daha az miktarda gerekir fakat soruda zorunlu olduğu belirtilmiştir.",
          "Bu nedenle küçük miktardan önemsizlik veya yerine başka mineral geçmesi sonucu kurulmaz.",
        ],
        reason:
          "Doğru. Miktar sınıflaması mineralin özel işlevinin gerekliliğini ortadan kaldırmaz.",
        commonError:
          "En fazla bulunan veya gereken minerali bütün işlevler için en önemli saymak.",
        check:
          "0,04 değerinin sıfır olmadığını ve“ikisi de zorunlu” koşulunu koru.",
      },
      {
        prompt:
          "Bir bitkinin yaprakları sarı görünüyor. Magnezyum eksikliği bu görünüşün olası nedenlerinden biri; başka mineral veya çevre etkileri dışlanmamış. Hangi ifade doğrudur?",
        correct: "Bu tek görünüş kesin magnezyum eksikliği tanısı koydurmaz",
        wrong: [
          [
            "Sararma görüldüğünde yalnız Mg eksikliği mümkündür",
            "Soru başka olası etkileri açıkça dışlamamıştır; tek neden iddiası desteklenmez.",
          ],
          [
            "Magnezyumun klorofille hiçbir ilişkisi yoktur",
            "Mg klorofilin yapısında bulunur; belirti tek başına kesin değil diye yapısal ilişki reddedilmez.",
          ],
          [
            "Bütün mineralleri eşit miktarda artırmanın kesin düzelteceği kanıtlanmıştır",
            "Hiçbir ekleme deneyi veya miktar–yanıt verisi verilmemiştir.",
          ],
          [
            "Bir görünüşün birden çok nedeni olması araştırmayı imkânsız yapar",
            "Uygun analiz ve kontrollü karşılaştırma alternatifleri ayırabilir; tek gözlemin yetersizliği araştırma olanağını bitirmez.",
          ],
        ],
        knowledge: [
          "Bir işlevle mineralin ilişkisi, benzer fenotipin her durumda tek nedene bağlı olduğunu göstermez.",
        ],
        strategy:
          "Olasılık ifadesini ve henüz dışlanmamış alternatifleri işaretle.",
        steps: [
          "Mg eksikliği bir olası neden olarak verilmiştir.",
          "Başka mineral ve çevre etkileri dışlanmamıştır.",
          "Bu nedenle sararma kaydı tek başına kesin Mg sonucu vermez; ek analiz veya karşılaştırma gerekir.",
        ],
        reason:
          "Doğru. Olası ilişki korunur fakat tek neden kesinliği yüklenmez.",
        commonError:
          "Bir belirtiyi daha önce öğrenilen tek mineral–görev eşleşmesiyle doğrudan kesin teşhise çevirmek.",
        check:
          "Doğru yorum hem Mg–klorofil ilişkisini hem alternatif nedenlerin açık kaldığını kabul etmelidir.",
      },
      {
        prompt:
          "A enzimi Mg²⁺ iyonuyla, B enzimi vitamin kökenli organik bir yardımcı molekülle işlev görüyor. Hangi karşılaştırma doğrudur?",
        correct:
          "A’nın yardımcısı inorganik mineral iyonudur; B’ninki organiktir ve ikisi otomatik aynı yakıt rolünde sayılmaz",
        wrong: [
          [
            "A’nın Mg²⁺ iyonu organik bir koenzimdir",
            "Magnezyum iyonu inorganik yardımcıdır; organik molekül sınıfına konulamaz.",
          ],
          [
            "B’nin organik yardımcısı zorunlu olarak bir mineral elementtir",
            "Vitamin kökenli organik molekül, mineral iyonuyla aynı kimyasal sınıf değildir.",
          ],
          [
            "Yardımcı kullanan bütün enzimler mutlaka aynı iyonu kullanır",
            "İki farklı yardımcı örneği verilmiştir; bütün enzimlere aynı iyon zorunluluğu yüklenemez.",
          ],
          [
            "Yardımcı varsa enzimin protein kısmına ihtiyaç kalmaz",
            "Yardımcı katkı protein kısmın yerine geçtiği anlamına gelmez; ikisi birlikte işlev görebilir.",
          ],
        ],
        knowledge: [
          "Enzim yardımcıları inorganik metal iyonu veya organik molekül olabilir; yardımcının kimyasal yapısı ve görevi ayrı okunur.",
        ],
        strategy:
          "İki yardımcının kimyasal türünü belirle; yardımcı rolü yakıt veya ana protein yerine koyma.",
        steps: [
          "Mg²⁺ bir mineral iyonudur.",
          "Vitamin kökenli B yardımcısı organik olarak verilmiştir.",
          "İkisi yardımcılık ortaklığına rağmen aynı kimyasal sınıf veya zorunlu yakıt rolü değildir.",
        ],
        reason:
          "Doğru. Yardımcılık ortak rolü, inorganik iyon ile organik molekül ayrımını ortadan kaldırmaz.",
        commonError:
          "Enzimle ilişkili her yardımcıyı tek bir koenzim veya mineral sınıfına zorlamak.",
        check:
          "Sınıflama seçiminde Mg²⁺ yük gösterimi ve B’nin organik yapısı birlikte korunmalıdır.",
      },
    ],
  },
  {
    id: "su-asit-baz-tuz",
    topic: "detail-4",
    title: "Su, asit–baz ve tuz: yapı, denge ve verilerle ileri uygulama",
    minutes: 75,
    objectives: [
      "Suyun kutupluluğunu çözünme, taşınma ve ısıl özellikleriyle ilişkilendir.",
      "Molekül içi bağ ile moleküller arası etkileşimi koruyarak hâl değişimini yorumla.",
      "pH, derişim ve toplam iyon miktarını verilen koşullarla karşılaştır.",
      "Nötrleşme, tuz ve tampon etkisi için miktar ile düzenleme sınırlarını ayır.",
    ],
    source:
      "MEBİ TYT Biyoloji Konu Özetleri, PDF s. 18–21; OGM Dersler Cepte, Canlıların Yapısında Bulunan Temel Bileşikler I, s. 10–12; Aurelia Su, Asit-Baz ve Tuz kopya kâğıdı, s. 1–13. Modeller, çözümlü örnekler ve ileri sorular özgündür. Isı ve iyon hesapları açık sınıf modeli varsayımları içindir; gerçek bir organın düzenlemesi veya resmî sınav verisi değildir.",
    sections: [
      {
        title: "Aynı su molekülünün iki farklı etkileşimi",
        paragraphs: [
          "H₂O molekülünde bir oksijen ve iki hidrojen atomu bulunur. Molekül içindeki O–H bağları kovalenttir; atomlar elektronları paylaşır. Molekülün toplam yükü sıfır olsa da elektron dağılımı eşit değildir: oksijen tarafı kısmen eksi, hidrojen tarafları kısmen artı özellik taşır.",
          "Bu polar yapı, farklı su molekülleri arasında hidrojen bağı kurulmasına katkı verir. Molekül içindeki kovalent bağ ile moleküller arasındaki etkileşim aynı şey değildir. Suyun buharlaşması sırasında moleküller uzaklaşabilir; bu olay suyun H₂ ve O₂ gazlarına ayrılması anlamına gelmez.",
        ],
      },
      {
        title: "Isıyı almak, sıcaklığın hızla artması değildir",
        paragraphs: [
          "Isı, sıcaklık farkı nedeniyle aktarılan enerjidir; ısı ile sıcaklık aynı nicelik değildir. Suyun yüksek özgül ısısı, belli kütlede aynı enerji alımına karşı sıcaklık değişiminin görece küçük olmasına katkı verir. Bu özellik büyük su kütlelerinin yavaş ısınıp soğumasıyla ilişkilidir.",
          "Buharlaşmada ise sıvıdan gaz fazına geçen su enerji alır; bu faz değişiminin enerji gereksinimi özgül ısıyla aynı nicelik değildir. Terin yalnız salgılanması ile gerçekten buharlaşması aynı ısı aktarımını göstermez. Buzun yüzmesi de bu iki ısıl nicelikten önce yoğunluk farkıyla açıklanır.",
        ],
      },
      {
        title: "Kohezyon ve adhezyonun taraflarını bul",
        paragraphs: [
          "Kohezyon su moleküllerinin birbirini çekmesi; adhezyon suyun cam veya bitki çeperi gibi başka bir yüzeyle etkileşmesidir. Aynı görüntüde iki ilişki de bulunabilir. Soruda hangi iki taraf arasındaki etkileşimin anlatıldığını yazmak adları ayırmaya yardım eder.",
          "Bitkide terlemeyle oluşan çekim, su sütununun sürekliliği ve çeperle etkileşim birlikte önem taşır. İnce boruda kılcal yükselme görülmesi, çok uzun bir ağacın bütün su taşınmasını tek başına kılcallığın açıkladığı anlamına gelmez. Mekanizmanın kapsamını verilen düzene göre seç.",
        ],
      },
      {
        title: "pH ölçeği eşit miktarlı bir cetvel değildir",
        paragraphs: [
          "Bu düzeyde 25 °C ideal sulu ortam için pH 7 nötr, pH 7’nin altı asidik ve üstü bazik örneklerdir. pH azaldıkça H⁺ derişimi artar. Bir pH birimi fark on kat derişim farkına karşılık gelir; iki pH sayısını bölmek iyon derişimi oranını vermez.",
          "pH derişimle ilgilidir; toplam H⁺ miktarı için hacim de gerekir. Aynı pH’daki büyük ve küçük kapta derişim eşitken toplam iyon miktarı farklı olabilir. Çözeltinin pH’sı asidin kuvvetini tek başına belirtmez; derişim ve iyonlaşma koşulları da önemlidir.",
        ],
      },
      {
        title: "Tuz ve inorganik maddeyi yakıt sanma",
        paragraphs: [
          "NaCl gibi tuzlar uygun koşulda suda iyonlarına ayrılır. İyonların türü ve dağılımı hücresel işlevlere katkı verir; çözünme onları kalori veren organik yakıt yapmaz. Su da birçok tepkimenin ortamı, gireni veya ürünü olabilir; bu roller enerji kaynağı rolüyle aynı değildir.",
          "Canlı hücrelerde metabolik su oluşabilir. Bu yüzden “inorganik olan hiçbir molekül canlıda üretilemez” genellemesi yanlıştır. Mineral elementin kimyasal yolla yeni element olarak üretilmesiyle su gibi bir bileşiğin atomlardan oluşturulması farklı iddialardır.",
        ],
      },
      {
        title: "Yüksüz molekül ile yüklü iyon",
        paragraphs: [
          "Bir su molekülü kısmi yük dağılımına rağmen toplamda nötrdür. Na⁺ ve Cl⁻ gibi iyonlar ise net elektrik yükü taşır. Üstteki yük işaretleriyle formüldeki atom sayısını gösteren alt simgeler farklı anlamdadır; H₂O’daki iki hidrojen, +2 yük demek değildir.",
          "Su molekülleri bir iyonun çevresinde yük dağılımlarına uygun yönlenebilir. Pozitif iyon çevresine suyun oksijen tarafı, negatif iyon çevresine hidrojen tarafları yönelmeye eğilimlidir. Bu etkileşim iyonun suda dağılmasını destekler; iyonun farklı bir elemente dönüşmesi değildir.",
        ],
      },
      {
        title: "Hidrojen bağı ağının sonuçları",
        paragraphs: [
          "Sıvı suda moleküller arası etkileşimler sürekli kurulup bozulabilir. Çok sayıda etkileşimin birlikte etkisi suyun kohezyonuna ve ısıl davranışına katkı verir. Hidrojen bağı ağını tek ve hiç değişmeyen katı bir zincir gibi düşünme.",
          "Bir su molekülünün kimliğiyle komşularına uzaklığı farklı özelliklerdir. Hâl değişiminde H₂O molekülleri korunabilirken moleküller arası düzen değişir. Atom veya kovalent bağ sayısı sorulursa kimyasal tepkime olup olmadığı belirtilmelidir; yalnız hacim artışını molekülün parçalanması sayma.",
        ],
      },
      {
        title: "İyi çözücü, her şeyi çözen demek değildir",
        paragraphs: [
          "Çözücü çözeltinin oluştuğu ortam, çözünen bu ortamda dağılan maddedir. Su birçok iyon ve polar molekülle etkileşebilir. Yağ gibi apolar maddelerin ayrı faz oluşturabilmesi suyun çözücülüğünün sınırını gösterir; organik olan her madde de suda çözünmez değildir.",
          "NaCl suda iyonlarıyla dağılırken glikoz moleküller hâlinde çözünebilir. Çözünme ile iyonlara ayrılma aynı evrensel işlem değildir. Çözünmüş glikozun kimliği korunması, çözeltide artık molekül bulunmadığı veya her çözünenin iyon oluşturduğu iddiasını engeller.",
        ],
      },
      {
        title: "Su, taşıma ve hücresel ortam",
        paragraphs: [
          "Hücrede birçok tepkime sulu ortamda gerçekleşir; çözünmüş maddeler bu ortamda taşınabilir. Kan ve doku sıvılarındaki su, besin ve metabolik ürünlerin taşınmasına katkı verir. Aynı işlevin görülmesi, her çözünmüş maddenin aynı hızda veya aynı yolla taşındığı anlamına gelmez.",
          "Bir maddenin suda çözünmesi, seçici geçirgen zarı kesin ve sınırsız geçtiğini göstermez. Molekül veya iyonun özellikleri ve zar koşulları ayrıca gerekir. Çözücü rolünü zardan geçiş mekanizmasının yerine koymak, birbiriyle ilişkili iki basamağı tek adımda birleştirir.",
        ],
      },
      {
        title: "Tepkimede suyun rolünü yaz",
        paragraphs: [
          "Hidrolizde uygun bağ su kullanılarak parçalanır; su girendir. TYT sayımında verilen dehidrasyon örneklerinde bağ kurulurken su açığa çıkabilir. Ancak her bağ kurma tepkimesinin otomatik olarak aynı sayıda su verdiği sonucu, kurgunun koşulu olmadan kullanılmaz.",
          "Su fotosentezin bazı tepkimelerinde kullanılan maddelerdendir ve solunumda metabolik su oluşabilir. Aynı hücrede su giren, ürün ve ortam rollerini farklı olaylarda taşıyabilir. Bir olayda kullanılması onu yakıt yapmaz; başka olayda oluşması da sürekli sınırsız su kaynağı olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Özgül ısı hesabının koşulları",
        paragraphs: [
          "Faz değişimi ve çevreye ısı kaybı yoksa, sabit kabul edilen c için Q=m·c·ΔT yazılabilir. Q ısı enerjisi, m kütle, c özgül ısı, ΔT son ve ilk sıcaklık farkıdır. Aynı Q ve m’de c büyüdükçe sıcaklık değişimi küçülür.",
          "Kütleler farklıysa yalnız c’ye bakarak son sıcaklıkları sıralama. Aynı enerjiyi alan büyük kütle daha küçük sıcaklık değişimi gösterebilir. Birim denetimi J/[g×J/(g·°C)]=°C sonucunu verir; ısı enerji birimiyle, sıcaklık farkı dereceyle ifade edilir.",
        ],
      },
      {
        title: "Buharlaşma ısısı ayrı bir niceliktir",
        paragraphs: [
          "Sabit sıcaklıktaki faz değişimi için Q=m_buhar·L modeli kullanılabilir. L birim kütleyi buharlaştırmak için gereken enerjidir. Bu bağıntıdaki kütle, salgılanan toplam sıvı değil gerçekten buharlaşan kütledir; formülde ayrı bir sıcaklık farkı çarpanı yoktur.",
          "Yüksek nem veya düşük hava akımı buharlaşmayı sınırlayabilir. Bu durumda aynı sıvı salgısı aynı soğutma etkisini vermeyebilir. Gerçek bir bedenin ısı bilançosunda başka alışverişler de bulunur; tek bir faz geçişinin enerjisini bütün vücut kaybına koşulsuz eşitleme.",
        ],
      },
      {
        title: "Buzun yüzmesi ve yoğunluk",
        paragraphs: [
          "Yoğunluk birim hacimdeki kütledir: ρ=m/V. Buzun yapısı aynı kütle için sıvı suya göre daha büyük hacim oluşturduğundan yoğunluğu düşüktür. Bu nedenle uygun tatlı su ortamında buz yüzeyde kalabilir; bu açıklama yüzey gerilimiyle aynı mekanizma değildir.",
          "Yüzey buzunun yalıtım etkisi alttaki suyun soğumasını yavaşlatabilir. Bundan her gölün hiçbir koşulda tamamen donamayacağı sonucu çıkmaz. Saf suyun yoğunluğunun yaklaşık 4 °C’de en yüksek olması da tuzlu bütün çözeltilere aynı değerle taşınacak evrensel bir sayı değildir.",
        ],
      },
      {
        title: "Yüzey gerilimi ve kaldırma kuvveti",
        paragraphs: [
          "Sıvı yüzeyinin alanını artırmaya karşı direnci yüzey gerilimiyle ilişkilidir. Küçük bir canlının su yüzeyinde durması veya suyu iyi ıslatmayan ince bir cismin yüzeyde desteklenmesi bu bağlamda incelenebilir. Cismin bütün hacminin sudan düşük yoğunluklu olması tek açıklama değildir.",
          "Bir buz parçasının yüzmesi ise sıvının kaldırma etkisi ve yoğunluklarla açıklanır. Görüntüde iki cisim de yüzeyde kalsa bile aynı fiziksel neden zorunlu değildir. Soruda temas biçimi, ıslanma ve cismin sıvıya ne kadar battığı gibi verilenleri koru.",
        ],
      },
      {
        title: "Kılcallık ile bitkide uzun yol",
        paragraphs: [
          "İnce ve suyu ıslatan bir boruda adhezyon ve kohezyon birlikte kılcal yükselmeye katkı verebilir. Boru çapı, yüzey özelliği ve yerçekimi sonucu etkiler. Bir yüzey değiştiğinde aynı sıvının aynı yüksekliğe çıkması zorunlu değildir.",
          "Bitkide ksilem su ve minerallerin taşınmasında görev alır. Terleme çekimi, sürekli su sütunu ve çeperle etkileşim birlikte yorumlanır. “Su yükseldi” cümlesinden yalnız bir etkileşim adını bütün mekanizmanın yerine koymak yerine, hangi bağlantının sorulduğunu ayır.",
        ],
      },
      {
        title: "Asit, baz ve ölçülebilir gösterge",
        paragraphs: [
          "Sulu ortamda asit H⁺ etkinliğini artırabilen, baz H⁺ alabilen veya OH⁻ derişimini artırabilen türler bağlamında ele alınır. H⁺ hidratlanmış proton için kısa gösterimdir; H₃O⁺ daha açık yazımdır. Amonyak NH₃ formülünde OH bulunmadan baz davranabilir.",
          "Turnusol ve pH metre farklı türde bilgi sağlayabilir. Gösterge renk değişimi belirli asit-baz koşuluna işaret eder fakat tek başına kesin pH veya bütün kimyasal bileşimi vermez. Tat ve dokunma özellikleri bir ölçüm yöntemi yerine kullanılmaz; burada sonuçlar verilen gösterge veya sayısal kayıtla okunur.",
        ],
      },
      {
        title: "Logaritmik yön ve miktar",
        paragraphs: [
          "İdeal seyreltik okul yaklaşımında pH≈−log₁₀[H⁺] yazılır. Logaritma burada onluk üsle ilişkilidir: [H⁺]=10⁻⁴ mol/L ise pH 4’tür. pH bir azalınca H⁺ derişimi on kat artar; artan pH ise ters yönde derişim değişimi demektir.",
          "Toplam H⁺ miktarı n=c·V ile bulunur. Daha düşük pH daha yüksek derişim gösterebilir, fakat kap çok küçükse toplam miktarı daha az olabilir. Derişim oranıyla miktar oranını ayırmak için hacim bilgisi gerekir; eksik hacim verisini eşit varsayarak kesin sonuç kurma.",
        ],
      },
      {
        title: "Seyreltmede ne korunur?",
        paragraphs: [
          "Çözünen miktarı korunup yalnız su ekleniyorsa derişim azalır. Tam iyonlaşan tek protonlu asit modelinde ve suyun katkısı ihmal edilebildiğinde c₁V₁=c₂V₂ kullanılabilir. Son hacim ile eklenen su hacmi aynı nicelik değildir; hesapta hangisinin verildiğini oku.",
          "Zayıf asitte iyonlaşma değişebilir; çok seyreltik çözeltilerde suyun kendi iyonlaşması önemli olur. Bu yüzden H⁺ derişimini her koşulda basitçe aynı katsayıyla bölerek pH’yı sınırsız artırma. Seyreltme, örnek alma ve nötrleşme üç farklı işlemdir; korunan miktar her aşamada ayrı seçilir.",
        ],
      },
      {
        title: "Nötrleşmede miktarlar eşleşir",
        paragraphs: [
          "H⁺ ve OH⁻ için temel nötrleşme eşitliği H⁺+OH⁻→H₂O’dur. Tam iyonlaşan tek değerli kuvvetli asit-baz modelinde önce c·V ile miktarlar hesaplanır, sonra 1:1 eşleşme kurulur. pH sayılarının aritmetik ortalaması bu miktar hesabının yerine geçmez.",
          "Asit miktarı fazlaysa artan H⁺, baz miktarı fazlaysa artan OH⁻ sonucu etkiler. Eşit miktarda kuvvetli asit ve kuvvetli baz için 25 °C ideal sulu model nötr sonuca yaklaşır. Her asit-baz çifti veya tuz çözeltisi için aynı son pH kuralı koşulsuz kullanılamaz.",
        ],
      },
      {
        title: "Her tuzun çözeltisi nötr değildir",
        paragraphs: [
          "Tuz artı ve eksi iyonlardan oluşan iyonik bileşiktir. NaCl bir örnektir fakat bütün tuzların kimliği veya suda davranışı aynı değildir. NaCl çözünürken Na⁺ ve Cl⁻ dağılır; elektrik iletkenliğine hareketli iyonlar katkı verir. Glikozun moleküler çözünmesi aynı nedenle iyon sayısını artırmaz.",
          "Tuz iyonlarının suyla etkileşimi çözeltinin pH’sını etkileyebilir. NaCl yaklaşık nötr, amonyum klorür asidik, sodyum karbonat bazik çözelti örnekleridir. Ayrıca her asit-baz tepkimesi mutlaka su oluşturmaz; NH₃ ile HCl’nin NH₄Cl oluşturması proton aktarımıyla tuz oluşumuna örnektir.",
        ],
      },
      {
        title: "Tampon değişimi azaltır, sonsuz koruma sağlamaz",
        paragraphs: [
          "Tampon sistem küçük asit veya baz eklemelerinde pH değişimini azaltabilir. Uygun asit-baz bileşenleri H⁺ alıp vererek etkiye katkı sağlar. Aynı eklemede daha az pH değişimi, belli koşullarda daha güçlü dirençle uyumlu olabilir; kimyasal bileşim ayrıca verilmedikçe adı kesinleşmez.",
          "Kapasite aşılırsa tamponlu ortamın pH’sı da belirgin değişebilir. pH farklarının oranını doğrudan mol cinsinden tampon kapasitesi oranı sayma. Başlangıç pH’sı, çözelti hacmi ve eklenen miktar karşılaştırılabilir olmalıdır; bu koşullar değişirse aynı sayısal yorum korunmayabilir.",
        ],
      },
      {
        title: "Bölmelerin iç dengesi farklıdır",
        paragraphs: [
          "Mide boşluğu, kan ve hücre içi aynı ortam değildir; her birine tek bir normal pH atanmaz. Enzimlerin ve hücresel süreçlerin uygun pH aralıkları farklı olabilir. Bir ortamın asidik olması bütün vücudun aynı pH’ya sahip olduğu anlamına gelmez.",
          "Canlıda pH düzenlenmesine tamponların yanında madde alışverişi, solunum ve böbrek işlevleri gibi süreçler katılabilir. Bir yiyeceğin pH’sından kan pH’sının aynı biçimde değişeceği sonucu kurulmaz. Basit kap modelinin iyon hesabıyla canlı bir bölmenin düzenleme mekanizmasını aynı kapsamda değerlendirme.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı ısıdan bilinmeyen kütleye",
        prompt:
          "Su örneği A 150 g ve cA=4 J/(g·°C); B sıvısının cB=2 J/(g·°C), kütlesi bilinmiyor. Faz değişimi ve kayıp yok. İkisi de aynı enerjiyi alırken A 2 °C, B 5 °C ısınıyor. B’nin kütlesi kaç g?",
        strategy:
          "Önce bilinen örneğin enerji miktarını bul; aynı enerjiyi B bağıntısına yerleştir.",
        steps: [
          {
            label: "Adım 1",
            explanation: "A için Q=150×4×2=1200 J’dür.",
          },
          {
            label: "Adım 2",
            explanation: "B için 1200=mB×2×5 yazılır.",
          },
          {
            label: "Adım 3",
            explanation:
              "mB=120 g bulunur; farklı kütle koşulu yalnız özgül ısıya bakarak yorum yapmayı engeller.",
          },
        ],
        answer: "B 120 g",
        check: "120×2×5=1200 J; iki örnekte enerji eşitliği sağlanır.",
        pitfall:
          "Özgül ısı oranını kullanırken kütleleri verilmediği hâlde eşit kabul etmek.",
      },
      {
        title: "Eşit toplam H⁺ için gereken hacim",
        prompt:
          "25 °C ideal sulu modelde A pH 3 ve hacmi 2 mL; B pH 5 ve hacmi bilinmiyor. Toplam H⁺ miktarları eşit olacaksa B’nin hacmi kaç mL olmalıdır?",
        strategy:
          "Derişim farkını bulup eşit miktar için hacmin ters yönde değişmesini kullan.",
        steps: [
          {
            label: "Adım 1",
            explanation: "A’nın H⁺ derişimi B’nin 100 katıdır.",
          },
          {
            label: "Adım 2",
            explanation:
              "Eşit miktarda cA·VA=cB·VB olduğundan VB 100×VA olmalıdır.",
          },
          {
            label: "Adım 3",
            explanation:
              "VB=100×2=200 mL bulunur; eşit toplam miktar eşit pH gerektirmez.",
          },
        ],
        answer: "B 200 mL",
        check: "10⁻³×0,002=10⁻⁵×0,200=2×10⁻⁶ mol.",
        pitfall:
          "İki pH değeri farklı olduğundan hiçbir hacimde eşit toplam H⁺ olamayacağını söylemek.",
      },
      {
        title: "Örnek almadan sonra gereken baz",
        prompt:
          "12 mL 0,020 mol/L HCl toplam 60 mL’ye seyreltiliyor. Bu homojen çözeltinin 15 mL’si alınıyor. Tam iyonlaşan 0,005 mol/L NaOH’den kaç mL bu örnekle eşit H⁺/OH⁻ miktarı sağlar?25 °C, tek değerli model.",
        strategy:
          "Toplam asidi koru; sonraki kaba taşınan payı bul; baz hacmini bu miktardan hesapla.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "İlk asit 0,020×12=0,24 mmol’dür; seyreltme bunu değiştirmez.",
          },
          {
            label: "Adım 2",
            explanation: "Örneğe 15/60=1/4’ü taşınır:0,24/4=0,06 mmol H⁺.",
          },
          {
            label: "Adım 3",
            explanation:
              "0,005 mol/L baz her mL’de 0,005 mmol OH⁻ verir; hacim 0,06/0,005=12 mL’dir.",
          },
        ],
        answer: "12 mL NaOH",
        check:
          "0,005×12=0,06 mmol; örnek alma öncesindeki bütün 0,24 mmol bazla eşleştirilmez.",
        pitfall:
          "Seyreltilmiş 60 mL’nin tamamı tepkimeye giriyormuş gibi gereken baz hacmini dört kat büyük bulmak.",
      },
      {
        title: "Tampon yanıtı her darbede eşit mi?",
        prompt:
          "Eşit iki küçük asit darbesi sonrasında X çözeltisinin pH’sı sırasıyla 7,2→7,1→6,0 ölçülüyor. İkinci pH düşüşü ilkinden kaç pH birimi büyüktür? Her eşit eklemede aynı pH direnci varsayımı bu veriye uyar mı?",
        strategy:
          "Her ardışık farkı kendi başlangıcından hesapla; aynı ekleme koşulunda farkları karşılaştır.",
        steps: [
          {
            label: "Adım 1",
            explanation: "İlk düşüş 7,2−7,1=0,1 pH birimidir.",
          },
          {
            label: "Adım 2",
            explanation:
              "İkinci düşüş 7,1−6,0=1,1; ilkinden 1,0 pH birimi büyüktür.",
          },
          {
            label: "Adım 3",
            explanation:
              "Eşit darbeye farklı yanıt bulunduğundan sabit pH direnci varsayımı bu aralıkta uygun değildir; tampon koruması sınırsız sayılmaz.",
          },
        ],
        answer:
          "İkinci düşüş 1,0 pH birimi daha büyük; eşit direnç varsayımı uymaz.",
        check:
          "0,1+1,1=1,2 toplam düşüş; 7,2−6,0 ile aynıdır. Fark oranı doğrudan mol cinsinden kapasite oranı değildir.",
        pitfall:
          "İkinci düşüşü başlangıç 7,2’den hesaplayıp ardışık darbe etkilerini karıştırmak.",
      },
      {
        title: "Buhardan sonra atom ve bağ sayısı",
        prompt:
          "Bir modelde 9 ayrı H₂O molekülü sıvıdan gaz fazına geçiyor; kimyasal tepkime ve molekül kaybı yok. Her H₂O’da iki O–H kovalent bağı kabul ediliyor. Gazda toplam O, H ve molekül içi O–H bağı sayıları nedir?",
        strategy:
          "Önce bir molekülün atom ve iç bağ sayısını yaz; korunan molekül adediyle çarp.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Her H₂O 1 O, 2 H ve 2 O–H bağı taşır.",
          },
          {
            label: "Adım 2",
            explanation:
              "Dokuz molekülde 9 O, 18 H ve 18 molekül içi O–H bağı vardır.",
          },
          {
            label: "Adım 3",
            explanation:
              "Faz değişimi bu korunumları bozmaz; sıvıdaki moleküller arası ağın aynı biçimde kalması ise gerekmez.",
          },
        ],
        answer: "9 O, 18 H ve 18 molekül içi O–H bağı",
        check:
          "H: O atom oranı 2:1 kalır; hidrojen bağlarının sayısı bu iç bağ toplamına eklenmez.",
        pitfall:
          "Buharlaşmada molekül içi bağların da koptuğunu sanıp iç bağ sayısını sıfır yapmak.",
      },
      {
        title: "Tepkime ve su stokunu birlikte izle",
        prompt:
          "Özgün hücre hesabında başlangıç su stoku 50 birim. Verilen hidrolizler 9 su kullanıyor, dehidrasyonlar 4 su açığa çıkarıyor, başka metabolik tepkimeler 8 su oluşturuyor. Başka giriş/çıkış yok. Son stok ve suyun iki tepkimedeki farklı rolü nedir?",
        strategy:
          "Su için giren ve çıkan katkıları aynı stok sınırında işaretle.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Hidroliz katkısı−9, dehidrasyon katkısı+4, öteki metabolik oluşum+8’dir.",
          },
          {
            label: "Adım 2",
            explanation: "Net değişim−9+4+8=+3; son stok 50+3=53 birimdir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Su hidrolizde giren, dehidrasyonda üründür; bu roller onu organik yakıt sınıfına sokmaz.",
          },
        ],
        answer: "Son su stoku 53; hidrolizde giren, dehidrasyonda ürün",
        check:
          "50+12−9=53; oluşan toplam 12 ile net artış 3 farklı niceliklerdir.",
        pitfall:
          "Oluşan 12 birimi doğrudan net stok artışı sayıp kullanılan 9 birimi göz ardı etmek.",
      },
    ],
    recall: [
      {
        prompt: "Su toplamda yüksüzken nasıl polar olabilir?",
        answer:
          "Molekülün toplam yükü sıfırdır fakat elektron dağılımı eşit değildir. Oksijen ve hidrojen taraflarının kısmi yükleri farklılaşır; net yük ile polar dağılım aynı özellik değildir.",
      },
      {
        prompt: "Buharlaşma ile suyun kimyasal parçalanmasını nasıl ayırırsın?",
        answer:
          "Buharlaşmada H₂O molekülleri korunarak aralarındaki düzen değişebilir. Kimyasal parçalanma molekül içi bağları ve ürün kimliklerini değiştirir; aynı olay değildir.",
      },
      {
        prompt:
          "Aynı enerjide daha küçük sıcaklık değişimini yalnız özgül ısıya bağlamak için hangi ek koşul gerekir?",
        answer:
          "Kütlelerin de aynı olması ve faz değişimi/ısı kaybı koşullarının uygun olması gerekir. Q=m·c·ΔT’de hem m hem c sonucu etkiler.",
      },
      {
        prompt:
          "Düşük pH neden her zaman kapta daha çok toplam H⁺ demek değildir?",
        answer:
          "Düşük pH daha yüksek H⁺ derişimi gösterir; toplam miktar için hacim de çarpılır. Küçük hacim yüksek derişime rağmen daha az toplam madde içerebilir.",
      },
      {
        prompt:
          "Nötrleşme neden her karışımın son pH’sının 7 olduğu anlamına gelmez?",
        answer:
          "Asit/baz miktarları eşit olmayabilir veya çiftin ve tuz iyonlarının suyla etkileşimi farklı olabilir.25 °C kuvvetli tek değerli eşit miktar modeli özel bir koşuldur.",
      },
      {
        prompt:
          "Tamponlu çözeltide büyük bir pH değişimi gözlenmesi tampon kavramını her durumda çürütür mü?",
        answer:
          "Hayır. Tampon etkisi kapasiteye ve koşula bağlıdır; yüksek eklemelerde koruma aşılabilir. Başlangıç, eklenen miktar ve hacim bilgileriyle karşılaştırılmalıdır.",
      },
    ],
    items: [
      {
        prompt:
          "Bir H₂O molekülü toplamda yüksüz, oksijen tarafı kısmen eksi ve hidrojen tarafları kısmen artı olarak gösteriliyor. Hangi yorum doğrudur?",
        correct:
          "Net yükün sıfır olması, kısmi yük dağılımının eşit olduğu anlamına gelmez",
        wrong: [
          [
            "H₂O kesin+2 yüklü iyondur",
            "Alt simge 2 hidrojen atomu sayısıdır; net+2 yük gösterimi değildir.",
          ],
          [
            "Oksijen tarafının kısmen eksi olması molekülde hiçbir hidrojen bulunmadığını gösterir",
            "Molekül formülü iki hidrojen atomu içerir; kısmi yük bu atomları yok etmez.",
          ],
          [
            "Yüksüz molekülde elektronlar her bağda tamamen eşit paylaşılmalıdır",
            "Su polardır; net yük sıfırken bağlardaki ve moleküldeki dağılım eşit olmayabilir.",
          ],
          [
            "Kısmi yük, her su molekülünün bütünüyle H⁺ ve OH⁻ iyonlarına ayrılmış olmasıdır",
            "Kısmi yük dağılımı bütün moleküllerin iyonlarına ayrılması anlamına gelmez; polar su net yüksüz molekül olarak bulunabilir.",
          ],
        ],
        knowledge: [
          "Polar molekülde net yük sıfır olabilir; pozitif ve negatif kısmi bölgeler yine bulunabilir.",
        ],
        strategy:
          "Toplam yük ile molekül içindeki dağılımı iki ayrı özellik olarak oku.",
        steps: [
          "H₂O toplamda yüksüz verilmiştir.",
          "O ve H taraflarının kısmi yükleri farklı gösterilmiştir.",
          "Bu iki bilgi çelişmez; net nötrlük kutupsuzluk zorunluluğu değildir.",
        ],
        reason:
          "Doğru. Molekülün toplam yüküyle kısmi yük dağılımı farklı niceliklerdir.",
        commonError:
          "Yüksüz olmayı mutlaka apolar ve eşit elektron dağılımlı olmakla eşitlemek.",
        check:
          "Doğru seçenek hem toplam nötrlüğü hem iki taraftaki kısmi farkı korumalıdır.",
      },
      {
        prompt:
          "Kapalı örnekte sıvı su ısı alıp su buharına dönüşüyor; kimyasal tepkime olmadığı verilmiş. Hangi değişim bu koşula uygundur?",
        correct:
          "H₂O molekülleri korunurken moleküller arası düzenin değişmesi",
        wrong: [
          [
            "Bütün H₂O moleküllerinin H₂ ve O₂’ye ayrılması",
            "Bu kimyasal ürün değişimidir; soruda yalnız faz değişimi ve tepkime yokluğu verilmiştir.",
          ],
          [
            "O–H kovalent bağlarının tümünün zorunlu kopması",
            "H₂O kimliği korunurken molekül içi bağların bütünüyle kopması gerekmez.",
          ],
          [
            "Buharlaşma enerjisinde moleküller arası etkileşimlerin hiçbir rolü bulunmaması",
            "Sıvıdaki moleküller arası çekim düzenini değiştirmek enerji gerektirir; bu bağlam kimyasal parçalanmadan ayrıdır.",
          ],
          [
            "Sıvıdaki moleküllerin sayısı arttığı için toplam atomların kendiliğinden çoğalması",
            "Kapalı ve tepkimesiz koşulda faz değişimi atom üretmez; gazda daha büyük hacim atom sayısı artışı değildir.",
          ],
        ],
        knowledge: [
          "Hâl değişiminde molekül kimliği korunabilir; moleküller arası etkileşim düzeni ile molekül içi kimyasal bağ farklıdır.",
        ],
        strategy:
          "Giren ve çıkan maddenin kimliğini karşılaştır, sonra düzen değişimini seç.",
        steps: [
          "Başlangıç ve ürün madde sudur; kimyasal tepkime dışlanmıştır.",
          "H₂O molekülü bu yüzden aynı kimlikle kalır.",
          "Faz değişiminin açıklaması moleküller arası düzen ve uzaklık değişimidir.",
        ],
        reason:
          "Doğru. Buharlaşma molekülü kimyasal olarak başka maddelere ayırmak değildir.",
        commonError:
          "Gaz hacmi büyüdüğünde moleküllerin de parçalandığını veya atom sayısının arttığını sanmak.",
        check: "Cevap, tepkime yokluğu koşuluna ve H₂O kimliğine uymalıdır.",
      },
      {
        prompt:
          "Bir Na⁺ iyonunun çevresinde su moleküllerinin yönlenmesi düşünülüyor. Suyun oksijen tarafı kısmen eksi, hidrojen tarafı kısmen artıdır. Hangi yönlenme elektrostatik etkileşimle uyumludur?",
        correct: "Oksijen tarafının pozitif Na⁺ iyonuna doğru yönelmesi",
        wrong: [
          [
            "Hidrojen taraflarının yalnız aynı artı yük nedeniyle Na⁺’a çekilmesi",
            "Aynı işaretli kısmi ve net yükler çekim yönünü açıklamaz; artı iyona eksi O tarafı yönelir.",
          ],
          [
            "Su çevreleyince Na⁺ iyonunun yükünün zorunlu sıfırlanması",
            "Polar suyun iyon çevresinde yönlenmesi iyonun yükünü ortadan kaldıran bir nötrleşme değildir.",
          ],
          [
            "Na⁺ çevresinde suyun bütün kovalent bağlarının zorunlu kopması",
            "İyon–su etkileşimi, H₂O’nun mutlaka kimyasal parçalanması değildir.",
          ],
          [
            "Suyun yüksüz olması nedeniyle hiçbir elektriksel etkileşim kuramaması",
            "Net yüksüz suyun kısmi yükleri iyonlarla etkileşebilir.",
          ],
        ],
        knowledge: [
          "Zıt elektriksel yük bölgeleri birbirini çekebilir; polar suyun kısmi yükleri iyon çevresinde yönlenmeye katkı verir.",
        ],
        strategy: "İyonun yükünü ve suyun zıt kısmi yük tarafını eşleştir.",
        steps: [
          "Na⁺ net pozitif yüklüdür.",
          "Suyun oksijen tarafı kısmen negatif olarak verilmiştir.",
          "Çekim için O tarafının Na⁺’a dönmesi uygun gösterimdir.",
        ],
        reason:
          "Doğru. Net pozitif iyonla suyun kısmen eksi tarafı arasında çekim beklenir.",
        commonError:
          "Su net yüksüz diye molekül içindeki kısmi yüklerin etkisini yok saymak.",
        check: "Seçilen yön, zıt işaretli yük bölgelerini karşılaştırmalıdır.",
      },
      {
        prompt:
          "NaCl suda Na⁺ ve Cl⁻ olarak, glikoz ise moleküllerini koruyarak dağılıyor. Bu iki örnekten hangi sonuç çıkar?",
        correct:
          "Çözünmek, her çözünen maddenin zorunlu olarak iyonlarına ayrılması demek değildir",
        wrong: [
          [
            "Glikoz çözündüğüne göre mutlaka Na⁺ üretmiştir",
            "Glikoz molekülü sodyum içermez; verilen çözünme Na⁺ üretimi değildir.",
          ],
          [
            "NaCl çözündüğünde iyonların yükleri kesin sıfır olmuştur",
            "Dağılan Na⁺ ve Cl⁻ iyonları yüklerini taşır; toplam yük dengesi tek tek iyonların yüksüzleşmesi değildir.",
          ],
          [
            "Suda hiçbir organik molekül çözülemez",
            "Glikozun moleküler çözünmesi bu evrensel iddiaya doğrudan karşı örnektir.",
          ],
          [
            "İki çözelti bütün elektriksel özellikleri bakımından zorunlu aynıdır",
            "İyonlu ve moleküler çözünme farklı tanecik türleri verir; bu veri bütün iletkenlik özelliklerini eşitlemez.",
          ],
        ],
        knowledge: [
          "Çözelti oluşumu maddenin tanecik türüne göre iyonlarla veya moleküllerle gerçekleşebilir.",
        ],
        strategy:
          "Her çözünenin çözeltide hangi tanecik kimliğini taşıdığını ayrı yaz.",
        steps: [
          "NaCl örneğinde çözeltide yüklü iyonlar belirtilmiştir.",
          "Glikoz örneğinde molekül kimliği korunmuştur.",
          "Bu iki durum, çözünme ile evrensel iyonlaşmanın aynı tanım olmadığını gösterir.",
        ],
        reason:
          "Doğru. Her iki madde çözünürken ortaya çıkan tanecik türleri aynı değildir.",
        commonError:
          "Çözünme, sindirim ve iyonlarına ayrılmayı tek bir kimyasal olay sanmak.",
        check:
          "Sonuç, verilen glikoz moleküllerinin korunmasını dışlamamalıdır.",
      },
      {
        prompt:
          "Bir kapta glikoz suda dağılıyor ve molekül kimliği korunuyor. Başka kapta bir polimer su kullanılarak daha küçük ürünlere ayrılıyor. Hangi ayrım uygundur?",
        correct:
          "İlkinde çözünme, ikincide verilen bağ parçalanmasına suyun katıldığı hidroliz vardır",
        wrong: [
          [
            "İki kapta da mutlaka aynı sayıda bağ kurulmuştur",
            "İlkinde bağ kurulması verilmemiş; ikincide parçalanma yönü belirtilmiştir.",
          ],
          [
            "İlk olay glikozun kimyasal sindirimini zorunlu kanıtlar",
            "Glikozun molekül kimliğinin korunduğu söylenmiştir; dağılma tek başına sindirim değildir.",
          ],
          [
            "İkinci olayda su yalnız enerji veren yakıttır",
            "Su bağ parçalanmasında giren olarak verilmiştir; bu rol organik yakıt rolü değildir.",
          ],
          [
            "İlkinde su yoktur, ikincide bütün su kaybolmak zorundadır",
            "İlk kap da sulu ortamdır; ikinci işlem belirli tepkime miktarında su kullanır, bütün suyun yokluğu verilmemiştir.",
          ],
        ],
        knowledge: [
          "Çözünme maddenin ortamda dağılmasıdır; hidroliz uygun bağın su kullanılarak kimyasal parçalanmasıdır.",
        ],
        strategy:
          "Molekül kimliği ve tepkimedeki su rolünü iki kapta ayrı izle.",
        steps: [
          "İlk kapta glikoz kimliği korunarak dağılır.",
          "İkinci kapta polimer bağları su kullanılarak parçalanır.",
          "Bu nedenle çözünmeyle hidrolizi aynı olay olarak adlandırmayan seçenek doğrudur.",
        ],
        reason:
          "Doğru. Dağılma ve suyun katıldığı kimyasal bağ parçalanması ayrıdır.",
        commonError:
          "Her suda dağılan besinin o sırada kimyasal olarak sindirildiğini sanmak.",
        check:
          "İlk olayda korunmuş glikoz kimliği, ikinci olayda değişen polimer yapısı birlikte açıklanmalıdır.",
      },
      {
        prompt:
          "Her biri 80 g iki sıvı aynı başlangıç sıcaklığında ve aynı 960 J enerjiyi alıyor. Faz değişimi veya kayıp yok; cA=4, cB=3 J/(g·°C). Sıcaklık artışları sırasıyla nedir?",
        correct: "3 °C ve 4 °C",
        wrong: [
          [
            "4 °C ve 3 °C",
            "Özgül ısı büyükken aynı kütle ve enerjide sıcaklık artışı küçüktür; sıra ters kurulmuştur.",
          ],
          [
            "12 °C ve 12 °C",
            "Q/m=12 J/g değeri sıcaklık artışı değildir; özgül ısıya ayrıca bölünmelidir.",
          ],
          [
            "960 °C ve 960 °C",
            "Enerji birimi J, doğrudan dereceye eşitlenemez.",
          ],
          [
            "3 °C ve 3 °C",
            "B’nin özgül ısısı 3 olduğu için artışı 960/(80×3)=4 °C’dir; A ile eşit değildir.",
          ],
        ],
        knowledge: [
          "Aynı fazda, sabit c ve ısı kaybı yokluğunda ΔT=Q/(m·c) kullanılır.",
        ],
        strategy:
          "İki sıvı için aynı enerji ve kütleyi kendi özgül ısısına böl.",
        steps: [
          "A:960/(80×4)=3 °C bulunur.",
          "B:960/(80×3)=4 °C bulunur.",
          "Daha yüksek özgül ısılı A’nın daha küçük artışı yön kontrolünü sağlar.",
        ],
        reason:
          "Doğru. Sıcaklık artışları verilen kütle ve özgül ısılarla 3 ve 4 °C’dir.",
        commonError:
          "Enerjiyi kütleye böldükten sonra özgül ısıyı hesap dışı bırakmak.",
        check: "80×4×3 ve 80×3×4 işlemlerinin ikisi de 960 J vermelidir.",
      },
      {
        prompt:
          "A sıvısı 50 g, cA=4; B sıvısı 100 g, cB=2 J/(g·°C). Aynı başlangıçta aynı enerjiyi alıyorlar; faz değişimi ve kayıp yok. Sıcaklık artışları nasıl karşılaştırılır?",
        correct: "Eşittir; iki örnekte m·c değeri 200 J/°C’dir",
        wrong: [
          [
            "A’nın c’si büyük olduğu için artışı kesin yarısıdır",
            "Kütleler eşit değildir; m·c çarpımları 50×4 ve 100×2 ile eşittir.",
          ],
          [
            "B’nin kütlesi büyük olduğu için artışı kesin iki katıdır",
            "Kütle tek başına kullanılmaz; B’nin daha düşük özgül ısısı aynı ısı kapasitesini verir.",
          ],
          [
            "İki örneğin aldığı enerji aynı olduğu için son molekül türleri aynıdır",
            "Eşit enerji kimyasal türlerin özdeşliğini göstermez; yalnız verilen ısıl koşullar kıyaslanır.",
          ],
          [
            "Isı kapasitesi eşit olduğunda hiçbir sıcaklık değişimi olmaz",
            "Q sıfır değilse aynı pozitif ΔT olabilir; eşit kapasite sıfır değişim demek değildir.",
          ],
        ],
        knowledge: [
          "Aynı enerjide ΔT, Q/(m·c) ile bulunur; farklı kütlelerde yalnız c sırası yeterli değildir.",
        ],
        strategy: "Her örneğin toplam ısı kapasitesi m·c’yi hesapla.",
        steps: [
          "A için 50×4=200 J/°C’dir.",
          "B için 100×2=200 J/°C’dir.",
          "Aynı Q bu eşit kapasitelere bölündüğünde aynı ΔT elde edilir.",
        ],
        reason:
          "Doğru. Kütle ve özgül ısı farklılıkları bu örnekte aynı toplam kapasiteyi vermiştir.",
        commonError:
          "Yüksek özgül ısı kuralını kütle eşitliği koşulu olmadan her örneğe taşımak.",
        check: "Sonuç, ΔTA/ΔTB=(mB·cB)/(mA·cA)=1 kontrolünü sağlamalıdır.",
      },
      {
        prompt:
          "Bir yüzeye 10 g sıvı su geliyor; aynı sürede bunun yalnız 3 g’ı gerçekten buharlaşıyor. Öğretim modelinde L=2100 J/g ve enerji yalnız bu faz geçişi için soruluyor. Alınan enerji kaç J?",
        correct: "6300",
        wrong: [
          [
            "21000",
            "Bu sonuç gelen bütün 10 g’ın buharlaştığını varsayar; gerçekte 3 g verilmiştir.",
          ],
          [
            "700",
            "2100/3 işlemi birimleri J/g² yapar; Q=m·L ilişkisine uymaz.",
          ],
          ["3", "Bu buharlaşan kütledir; enerji için L ile çarpılmalıdır."],
          [
            "0",
            "Buharlaşma için enerji alınır; faz değişimi sıcaklığı mutlaka artırmıyor diye enerji sıfır olmaz.",
          ],
        ],
        knowledge: [
          "Buharlaşma enerjisi gerçekten gaz fazına geçen kütleyle Q=m_buhar·L olarak hesaplanır.",
        ],
        strategy: "Yüzeye gelen toplamı değil, buharlaşan kütleyi seç.",
        steps: [
          "Buharlaşan miktar 3 g’dır.",
          "Q=3×2100=6300 J bulunur.",
          "10 g’ın kalan bölümü aynı faz geçişini yapmış sayılmaz; hesap yalnız istenen buharlaşma içindir.",
        ],
        reason: "Doğru. Faz değiştiren 3 g su için 6300 J gerekir.",
        commonError:
          "Salgılanan veya yüzeye ulaşan bütün sıvıyı buharlaşmış kabul etmek.",
        check:
          "Birim g×J/g=J olmalı; enerjinin 10 g’a değil 3 g’a ait olduğunu koru.",
      },
      {
        prompt:
          "Bir modelde aynı 90 g su sıvıyken 90 mL, buz hâlindeyken 100 mL yer kaplıyor. Hangi sonuç uygundur?",
        correct:
          "Buzun yoğunluğu 0,9 g/mL ile sıvının 1 g/mL yoğunluğundan küçüktür",
        wrong: [
          [
            "Buzun kütlesi mutlaka 100 g olmuştur",
            "100 mL hacimdir; iki hâlde de kütle 90 g verilmiştir.",
          ],
          [
            "Buz daha büyük hacimde olduğu için daha yoğundur",
            "Aynı kütlede daha büyük hacim, daha küçük m/V oranı verir.",
          ],
          ["İki hâlin yoğunluğu kesin aynıdır", "90/100 ve 90/90 farklıdır."],
          [
            "Yüzeyde kalan buzun açıklaması yalnız yüzey gerilimidir",
            "Verilen eşit kütle ve farklı hacim doğrudan yoğunluk farkını gösterir; bu mekanizma yüzey geriliminden ayrıdır.",
          ],
        ],
        knowledge: [
          "Yoğunluk m/V’dir; aynı kütle daha büyük hacme dağılırsa yoğunluk azalır.",
        ],
        strategy: "Her hâl için verilen aynı kütleyi kendi hacmine böl.",
        steps: [
          "Sıvı yoğunluğu 90/90=1 g/mL’dir.",
          "Buz yoğunluğu 90/100=0,9 g/mL’dir.",
          "Buzun daha düşük yoğunluklu olduğu sonucu bu iki oranın karşılaştırmasından gelir.",
        ],
        reason:
          "Doğru. Kütle korunurken buzun daha büyük hacmi düşük yoğunluk oluşturmuştur.",
        commonError:
          "Kütle ve hacim birimlerini sayıları benzer diye aynı nicelik gibi kullanmak.",
        check: "İki hesapta da pay 90 g kalmalı; yalnız hacim değişmelidir.",
      },
      {
        prompt:
          "İnce bir cisim su yüzeyini yarıp batmadan destekleniyor. Yalnız bu görüntüden cismin bütün hacminin sudan düşük yoğunluklu olduğu kesin söylenebilir mi?",
        correct: "Hayır; yüzey geriliminin desteği de değerlendirilmelidir",
        wrong: [
          [
            "Evet; yüzeyde duran her cismin yoğunluğu sudan küçüktür",
            "Yüzeyde desteklenme, yüzey gerilimi ve temas biçimi nedeniyle de olabilir; bu evrensel yoğunluk sonucu zorunlu değildir.",
          ],
          [
            "Evet; su yüzeyinde hiç moleküller arası etkileşim yoktur",
            "Yüzey gerilimi moleküller arası etkileşimlerle ilişkilidir.",
          ],
          [
            "Hayır; bu görüntü cismin kesin gaz olduğunu gösterir",
            "Cismin fazını yalnız yüzeyde desteklenmesinden bu biçimde belirlemek mümkün değildir.",
          ],
          [
            "Hayır; su mutlaka kimyasal olarak başka maddeye dönüşmüştür",
            "Görüntü kimyasal tepkime veya yeni madde kanıtı vermez.",
          ],
        ],
        knowledge: [
          "Yüzey gerilimiyle destek ve hacimsel yoğunluk/kaldırma koşulları aynı açıklama değildir.",
        ],
        strategy:
          "Yüzey temasındaki desteği, bütün cismin yoğunluk hesabından ayrı tut.",
        steps: [
          "Cismin su yüzeyini yarıp batmadığı verilmiştir.",
          "Bu temas biçiminde yüzey gerilimi katkısı olabilir.",
          "Kütle ve hacim verilmeden yalnız bu görüntüden zorunlu düşük yoğunluk sonucu kurulmaz.",
        ],
        reason:
          "Doğru. Yüzeyde desteklenme, tek başına hacimsel yoğunluk oranını belirlemez.",
        commonError:
          "Yüzen her görüntüyü buzun düşük yoğunluk açıklamasının aynısı sanmak.",
        check:
          "Cevap, kütle ve hacim verisi bulunmadığı hâlde kesin yoğunluk üretmemelidir.",
      },
      {
        prompt:
          "İnce borunun iç yüzeyi değiştirilince aynı suyun yüzeye tutunma davranışı değişiyor. Su türü ve diğer koşullar eş tutulmuş. Değiştirilen temas ilişkisi en doğrudan hangisidir?",
        correct: "Su ile farklı boru yüzeyi arasındaki adhezyon",
        wrong: [
          [
            "Su molekülündeki O–H kovalent bağının atom kimliği",
            "Yüzey kaplaması suyun H₂O kimliğini değiştirdiği anlamına gelmez.",
          ],
          [
            "Yalnız su–su kohezyonunun tanımı",
            "Doğrudan değiştirilen taraf boru yüzeyidir; su–su ilişkisiyle aynı eşleşme değildir.",
          ],
          [
            "Proteinlerin peptit bağı",
            "Su–boru tutunması protein sentezi veya peptit bağı örneği değildir.",
          ],
          [
            "H⁺ ve OH⁻ nötrleşmesi",
            "Bu temas değişiminde bir asit-baz eşleşmesi verilmemiştir.",
          ],
        ],
        knowledge: [
          "Adhezyon farklı maddeler arasındaki, kohezyon aynı tür tanecikler arasındaki çekim ilişkisidir.",
        ],
        strategy: "Değişen iki temas tarafını adlandır.",
        steps: [
          "Suyun türü aynı kalırken borunun iç yüzeyi değiştirilmiştir.",
          "Karşılaştırılan arayüz su–boru yüzeyidir.",
          "Bu farklı maddeler arası ilişki adhezyon kapsamındadır.",
        ],
        reason: "Doğru. Değiştirilen arayüz suyun başka yüzeye tutunmasıdır.",
        commonError:
          "İçinde su geçen her çekim örneğini otomatik olarak kohezyon adlandırmak.",
        check: "Eşleşmede bir taraf su, öteki boru yüzeyi olmalıdır.",
      },
      {
        prompt:
          "Uzun bir bitkide suyun ksilemde yukarı taşınması için hangi açıklama verilen genel mekanizmaları birlikte korur?",
        correct:
          "Terleme çekimi, su sütununun kohezyonu ve çeperle adhezyon birlikte katkı verebilir",
        wrong: [
          [
            "Yalnız ince boru kılcallığı bütün ağaçlarda her yüksekliği tek başına açıklar",
            "Kılcallık tek başına uzun taşımanın bütün koşullarını açıklayan sınırsız mekanizma değildir.",
          ],
          [
            "Su yukarı çıktığı için bütün su molekülleri her basamakta ATP pompasıyla itilir",
            "Su sütunu ve potansiyel farkına bağlı taşıma, her su geçişinin doğrudan ATP pompası olması demek değildir.",
          ],
          [
            "Yapraklardan su kaybı ile kök-yaprak taşıması tamamen ilişkisizdir",
            "Terleme çekimi bu süreçteki mekanizmalardan biridir; ilişki yok sayılamaz.",
          ],
          [
            "Kohezyon varsa çeperin ve diğer koşulların hiçbir önemi kalmaz",
            "Bir etkileşimin katkısı diğer mekanizma ve koşulları gereksiz yapmaz.",
          ],
        ],
        knowledge: [
          "Bitkide su taşınması, terleme çekimi ve su–su/su–çeper etkileşimleri gibi birlikte çalışan mekanizmalarla değerlendirilir.",
        ],
        strategy: "Tek kuvveti bütün sürecin yerine koyan ifadeleri ele.",
        steps: [
          "Terleme yapraktan su kaybıyla çekime katkı verebilir.",
          "Kohezyon su sütununun sürekliliğini, adhezyon çeperle etkileşimi destekler.",
          "Birlikte katkı açıklaması tek başına sınırsız kılcallık veya ATP pompası iddiasından ayrılır.",
        ],
        reason:
          "Doğru. Mekanizmalar birbirini dışlamadan taşıma bağlamına katılır.",
        commonError:
          "Bir mekanizmanın varlığını öğrenince diğer bütün katkıları sıfır saymak.",
        check:
          "Doğru yorum hem terleme hem iki farklı etkileşim tarafına yer vermelidir.",
      },
      {
        prompt:
          "25 °C ideal sulu ortamda bir çözeltinin pH’sı 8’den 5’e düşüyor. H⁺ derişimi ve son asit-baz sınıfı için doğru yorum hangisidir?",
        correct: "H⁺ derişimi 1000 kat artar; son çözelti asidiktir",
        wrong: [
          [
            "H⁺ derişimi 3 kat artar; son çözelti baziktir",
            "Üç pH birimi doğrusal 3 kat değil 10³ kat farktır; pH 5 bu koşulda asidiktir.",
          ],
          [
            "H⁺ derişimi 1000 kat azalır; son çözelti asidiktir",
            "Son sınıf doğru olsa da pH düşerken H⁺ azalmaz, artar.",
          ],
          [
            "H⁺ derişimi 100 kat artar; son çözelti nötrdür",
            "Fark 8−5=3 birimdir; 100 yerine 1000 kat olur ve nötrlük pH 7 için verilmiştir.",
          ],
          [
            "H⁺ değişmez; yalnız pH sayısı değişmiştir",
            "pH ideal yaklaşımda H⁺ derişimiyle ilişkili logaritmik ölçüdür; bu değişim derişim değişimini ifade eder.",
          ],
        ],
        knowledge: [
          "pH azalırken H⁺ artar; birim farkı onluk üs olur.25 °C sulu modelde pH 5 asidiktir.",
        ],
        strategy:
          "Önce değişimin yönünü, sonra üç birimlik üssü ve son sınıfı belirle.",
        steps: [
          "pH 8’den 5’e üç birim azalmıştır.",
          "H⁺son/H⁺ilk=10^(8−5)=10³=1000’dir.",
          "Son pH 5,7’nin altında olduğundan verilen koşulda asidiktir.",
        ],
        reason:
          "Doğru. Logaritmik oran ve son çözeltinin sınıfı birlikte korunmuştur.",
        commonError:
          "pH farkını doğrudan kat sayısı yapmak veya pH ile H⁺ yönünü aynı sanmak.",
        check:
          "Daha küçük pH için daha yüksek H⁺ ve pH 5 için asidik sonuç birlikte çıkmalıdır.",
      },
      {
        prompt:
          "A: pH 3 ve 1 mL; B: pH 4 ve 20 mL.25 °C ideal derişim yaklaşımında hangi karşılaştırma doğrudur?",
        correct:
          "A’nın H⁺ derişimi daha yüksek; B’nin toplam H⁺ miktarı daha fazladır",
        wrong: [
          [
            "A’nın hem derişimi hem toplam miktarı kesin daha yüksektir",
            "A derişimi 10 kat yüksek olsa da B hacmi 20 kattır; toplam B’de iki kat olur.",
          ],
          [
            "B’nin H⁺ derişimi daha yüksek; toplam A’da daha fazladır",
            "pH 4, pH 3’e göre daha düşük H⁺ derişimi gösterir; iki sıralama da ters okunmuştur.",
          ],
          [
            "İki toplam miktar eşittir",
            "A 10⁻³×0,001=10⁻⁶ mol; B 10⁻⁴×0,020=2×10⁻⁶ mol’dür; eşit değildir.",
          ],
          [
            "Hacim bilgisi H⁺ miktarı karşılaştırmasında kullanılamaz",
            "Toplam miktar için derişim hacimle çarpılır; hacim doğrudan gereklidir.",
          ],
        ],
        knowledge: [
          "pH derişimi, toplam miktar ise derişim×hacmi ifade eder; hacimler farklıysa sıralamalar farklı olabilir.",
        ],
        strategy:
          "Derişimleri pH’dan bul; toplamları her kabın kendi litre hacmiyle hesapla.",
        steps: [
          "A’da 10⁻³, B’de 10⁻⁴ mol/L H⁺ vardır; A derişimi daha yüksektir.",
          "Toplamlar A için 10⁻⁶, B için 2×10⁻⁶ mol’dür.",
          "B hacminin etkisi nedeniyle toplam miktarı daha fazladır.",
        ],
        reason:
          "Doğru. Yüksek derişim ile yüksek toplam miktar farklı kaplarda bulunabilir.",
        commonError:
          "pH sıralamasını hacmi kullanmadan toplam iyon miktarı sıralaması yapmak.",
        check: "B/A toplam oranı 2 olurken A/B derişim oranı 10 olmalıdır.",
      },
      {
        prompt:
          "İki ideal sulu çözeltinin pH’sı aynı 4. X hacmi 50 mL, Y hacmi 200 mL. H⁺ derişimleri ve toplam miktarları nasıl karşılaştırılır?",
        correct: "Derişimler eşit; Y’nin toplam H⁺ miktarı X’in 4 katıdır",
        wrong: [
          [
            "Y daha büyük hacimli olduğu için H⁺ derişimi 4 kattır",
            "Aynı pH aynı H⁺ derişimi verir; hacim toplamı değiştirir.",
          ],
          [
            "Toplam miktarlar eşit; hacim farkı önemsizdir",
            "n=c·V’de eşit derişim ve 4 kat hacim 4 kat toplam miktar verir.",
          ],
          [
            "X’in toplamı Y’nin 4 katıdır",
            "Hacim oranı ters alınmıştır; 200/50=4 ile büyük toplam Y’dedir.",
          ],
          [
            "pH aynıysa iki kapta bütün kimyasal maddeler aynı miktardadır",
            "pH yalnız H⁺ koşuluyla ilgilidir; diğer maddeler ve toplam hacim farklı olabilir.",
          ],
        ],
        knowledge: [
          "Aynı pH H⁺ derişiminin eşitliğini, aynı toplam miktarı değil gösterir.",
        ],
        strategy: "Eşit derişimde toplam miktar oranını hacim oranından bul.",
        steps: [
          "İki pH 4 olduğundan H⁺ derişimleri eşittir.",
          "Y/X hacim oranı 200/50=4’tür.",
          "n=c·V’ye göre Y/X H⁺ miktar oranı da 4’tür.",
        ],
        reason:
          "Doğru. Derişim sabitken hacim farkı toplam madde miktarında karşılık bulur.",
        commonError:
          "Derişim eşitliğini miktar ve bütün bileşim eşitliğiyle karıştırmak.",
        check: "Birimleri aynı mL olduğundan hacim oranı doğrudan 4 olmalıdır.",
      },
      {
        prompt:
          "Tam iyonlaşan tek protonlu asidin 10 mL’sinde [H⁺]=0,01 mol/L. Yalnız suyla toplam hacim 1000 mL’ye çıkarılıyor; bu koşulda suyun kendi katkısı ihmal ediliyor. Son H⁺ derişimi ve pH nedir?",
        correct: "10⁻⁴ mol/L ve pH 4",
        wrong: [
          [
            "10⁻² mol/L ve pH 2",
            "Bu başlangıç derişimidir; hacim 100 kat arttığı hâlde derişim aynı kalmaz.",
          ],
          [
            "10⁻³ mol/L ve pH 3",
            "Bu sonuç 10 kat seyreltmeye aittir; 1000/10=100 kat uygulanmalıdır.",
          ],
          [
            "10⁻⁴ mol/L ve pH−4",
            "Negatif üs pH hesabında eksi log ile+4 verir.",
          ],
          [
            "10⁻¹ mol/L ve pH 1",
            "Su eklemek miktarı artırıp derişimi yükseltmez; bu sonuç değişim yönüne aykırıdır.",
          ],
        ],
        knowledge: [
          "Madde miktarı korunarak seyreltmede c₂=c₁V₁/V₂; ideal tek protonlu tam iyonlaşma koşulu H⁺ için bu hesabı sağlar.",
        ],
        strategy: "Son hacmin başlangıcın kaç katı olduğunu bul.",
        steps: [
          "Seyreltme katsayısı 1000/10=100’dür.",
          "H⁺ derişimi 10⁻²/100=10⁻⁴ mol/L olur.",
          "pH=−log₁₀(10⁻⁴)=4 bulunur.",
        ],
        reason:
          "Doğru. Miktar korunurken 100 kat hacim, 100 kat düşük derişim verir.",
        commonError:
          "Eklenen suyu veya son hacmi yanlış kullanarak seyreltme katsayısını 10 almak.",
        check:
          "Başlangıç pH 2’den 4’e yükselirken çözeltinin asidik kalması yön kontrolünü sağlar.",
      },
      {
        prompt:
          "25 °C’de 20 mL 0,02 mol/L HCl ile 10 mL 0,01 mol/L NaOH karışıyor. İkisi tam iyonlaşan tek değerli türler; hacimler toplanıyor. Tepkime sonrası hangi iyonun kaç mmol eşdeğeri artar?",
        correct: "0,3 mmol H⁺",
        wrong: [
          [
            "0,3 mmol OH⁻",
            "Farkın büyüklüğü doğru fakat asit miktarı daha fazla olduğundan artan tür H⁺’tır.",
          ],
          [
            "0,5 mmol H⁺",
            "0,4+0,1 toplamını almak eşleşerek tüketilen miktarı hesaba katmaz.",
          ],
          [
            "0,1 mmol H⁺",
            "Bazın başlangıç miktarı 0,1 mmol’dür; artan asit miktarı 0,4−0,1=0,3’tür.",
          ],
          [
            "Artan iyon yoktur; asit ve baz içeren her karışım nötrdür",
            "Miktarlar eşit değildir; asit 0,4, baz 0,1 mmol verir.",
          ],
        ],
        knowledge: [
          "Tam iyonlaşan tek değerli asit-baz modelinde H⁺ ve OH⁻ miktarları 1:1 eşleşir; artan tür büyük miktarlı taraftır.",
        ],
        strategy: "Önce her kabın c·V miktarını aynı mmol biriminde bul.",
        steps: [
          "HCl 0,02×20=0,4 mmol H⁺ sağlar.",
          "NaOH 0,01×10=0,1 mmol OH⁻ sağlar.",
          "Eşleşme sonrası 0,4−0,1=0,3 mmol H⁺ eşdeğeri artar.",
        ],
        reason:
          "Doğru. Nötrleşme iki başlangıç miktarını eşitlemez; küçük taraf kadar tüketim olur.",
        commonError:
          "Asit ve bazın bir araya gelmesini miktarları hesaplamadan mutlaka nötr sonuç saymak.",
        check:
          "0,1 mmol eşleşen miktar ile 0,3 mmol artan miktar birlikte başlangıç 0,4 mmol asidi karşılamalıdır.",
      },
      {
        prompt:
          "25 °C ideal suda bir çözeltinin nötr olduğu belirtiliyor. Hangi ifade nötrlükle uyumludur?",
        correct:
          "H⁺ ve OH⁻ derişimleri eşittir; ikisinin de sıfır olması gerekmez",
        wrong: [
          [
            "Çözeltide hiçbir H⁺ ve OH⁻ bulunamaz",
            "Nötrlük iki iyonun yokluğu değil, eşit koşuludur; suyun kendi iyonlaşması vardır.",
          ],
          [
            "H⁺ her zaman OH⁻’ten daha fazladır",
            "Bu eşitsizlik verilen 25 °C modelde asidik yönü ifade eder; nötrlük değildir.",
          ],
          [
            "Çözelti nötrse hiçbir tuz çözünemez",
            "Nötr pH ile çözünmüş tuz bulunması birbirini dışlamaz; NaCl yaklaşık nötr örnektir.",
          ],
          [
            "Nötrlük her sıcaklıkta kesin pH 7 anlamına gelir",
            "Soruda 25 °C modeli verilmiştir; nötr pH sıcaklığa bağlı olabilir ve bu sayı bütün sıcaklıklara taşınmaz.",
          ],
        ],
        knowledge: [
          "Nötrlük, suyun H⁺ ve OH⁻ koşullarının eşitliğidir; tipik 25 °C ideal suda pH yaklaşık 7’dir.",
        ],
        strategy:
          "Eşitlik koşulunu iyonların yokluğu veya bütün sıcaklıklar için sabit sayı iddiasından ayır.",
        steps: [
          "Nötr durum iki iyonun dengeli derişim koşulunu gerektirir.",
          "Suyun iyonlaşması nedeniyle iki değer de sıfır olmak zorunda değildir.",
          "25 °C için kullanılan pH 7 yaklaşımı başka sıcaklıklara koşulsuz genişletilmez.",
        ],
        reason:
          "Doğru. Nötr sulu ortamda H⁺ ve OH⁻ bulunabilir; eşitlikleri belirleyicidir.",
        commonError:
          "Nötr sözcüğünü çözeltide hiçbir iyon bulunmaması anlamında kullanmak.",
        check:
          "Doğru seçenek sıfır koşulu yerine H⁺=OH⁻ ilişkisini korumalıdır.",
      },
      {
        prompt:
          "Eş koşullardaki üç tuz çözeltisinin ölçülen pH’ları X 7, Y 5, Z 9 olarak verilmiş. Hangi genelleme bu verilerle bağdaşmaz?",
        correct: "Bütün tuz çözeltilerinin pH’sı mutlaka 7’dir",
        wrong: [
          [
            "Tuz çözeltileri farklı asit-baz davranışı gösterebilir",
            "Y 5 ve Z 9 değerleri bu farklılığa örnektir.",
          ],
          [
            "25 °C modelde Y asidik, Z bazik örnektir",
            "Verilen pH’lar 7’nin altı ve üstündedir; bu sınıflama koşulla uyumludur.",
          ],
          [
            "Tuzun adı tek başına nötr pH garantisi değildir",
            "Üç tuzun farklı pH’sı bu sınırı destekler.",
          ],
          [
            "İyonların sulu ortamdaki davranışı sonuçla ilişkilidir",
            "Tuz iyonlarının suyla etkileşimi pH farklarının açıklanmasında önemlidir.",
          ],
        ],
        knowledge: [
          "Tuz çözeltisinin pH’sı iyonların sulu ortamda davranışına bağlıdır; her tuz nötr değildir.",
        ],
        strategy: "Evrensel pH 7 iddiasını Y ve Z ölçümleriyle denetle.",
        steps: [
          "X 7 iken Y 5, Z 9 ölçülmüştür.",
          "Y ve Z, pH 7 zorunluluğuna karşı verilmiş örneklerdir.",
          "Bu nedenle bütün tuzları nötr sayan genelleme veriye uymaz.",
        ],
        reason:
          "Doğru. İki ölçüm, bütün tuz çözeltilerinin pH 7 olduğu iddiasını çürütür.",
        commonError:
          "Nötrleşmeyle tuz oluşabilmesini, bütün tuz çözeltilerinin nötr olmasıyla eşitlemek.",
        check:
          "Veride 7 dışında pH bulunan tuzları seçenek değerlendirmesinde silme.",
      },
      {
        prompt:
          "NH₃, sulu ortamda H⁺ alarak baz davranabiliyor. Bu örnek hangi iddiayı sınırlar?",
        correct:
          "Baz olabilmek için formülde mutlaka OH grubu bulunması gerektiği iddiasını",
        wrong: [
          [
            "Bazların H⁺ ile ilişkili davranış gösterebildiğini",
            "NH₃ örneği bu ilişkiyi sınırlandırmaz; H⁺ alabilmesiyle destekler.",
          ],
          [
            "Bir maddenin net yüksüzken baz davranabileceği iddiasını",
            "NH₃ net yüksüz molekülken H⁺ alabilir; bu örnek iddiayı sınırlamak yerine destekler.",
          ],
          [
            "Baz davranışının sulu iyon dengesiyle ilişkili olabileceği iddiasını",
            "NH₃’ün H⁺ alması böyle bir ilişkiyle uyumludur; onu dışlamaz.",
          ],
          [
            "Bütün nötr maddelerin baz olduğunu",
            "NH₃’ün baz davranması bütün net yüksüz moleküllerin baz olduğu sonucunu vermez.",
          ],
        ],
        knowledge: [
          "Baz davranışı H⁺ alma veya sulu ortamda OH⁻ koşulunu artırmayla ilişkilidir; formülde OH bulunması evrensel zorunluluk değildir.",
        ],
        strategy:
          "NH₃ formülünde bulunmayan grubu, verilen baz davranışıyla birlikte karşılaştır.",
        steps: [
          "NH₃ formülünde OH grubu yoktur.",
          "Buna rağmen H⁺ alarak baz davranışı verilmektedir.",
          "Bu örnek, OH grubu olmadan baz olamaz iddiasına karşı örnektir.",
        ],
        reason:
          "Doğru. NH₃, bazlığı yalnız formüldeki OH grubuna bağlayan genellemeyi sınırlar.",
        commonError:
          "Bir sınıfın yaygın örneklerinin formülünü bütün sınıf için zorunlu tanım saymak.",
        check:
          "Karşı örnek hem OH grubunun yokluğunu hem baz davranışının varlığını taşımalıdır.",
      },
      {
        prompt:
          "Aynı başlangıç pH 7 ve eşit hacimli X ile Y’ye eşit küçük asit miktarı ekleniyor. Son pH’lar X 6,8, Y 4,5. Bu koşulda hangi yorum uygundur?",
        correct:
          "X daha küçük pH değişimi göstererek eklemeye daha çok direnmiştir",
        wrong: [
          [
            "Y daha düşük pH’ya indiği için daha güçlü direnç göstermiştir",
            "Büyük pH değişimi daha fazla direnç anlamına gelmez; değişim büyüklüğü ters okunmuştur.",
          ],
          [
            "X’in pH’sı hiç değişmemiştir",
            "7’den 6,8’e 0,2 birim değişim vardır; tam değişmezlik denemez.",
          ],
          [
            "X’in kimyasal bileşiminin adı yalnız bu iki sayıdan kesin bulunur",
            "Direnç deseni belirli bir bileşiğin kimliğini tek başına vermez.",
          ],
          [
            "X’e sonsuz miktarda asit eklense de aynı pH kalır",
            "Tek küçük eklemedeki direnç sınırsız tampon kapasitesi garantisi değildir.",
          ],
        ],
        knowledge: [
          "Aynı başlangıç, hacim ve eklemede küçük mutlak pH değişimi o koşulda daha fazla dirençle uyumludur.",
        ],
        strategy:
          "İki çözeltinin başlangıçtan değişim büyüklüğünü karşılaştır.",
        steps: [
          "X değişimi 7−6,8=0,2 birimdir.",
          "Y değişimi 7−4,5=2,5 birimdir.",
          "X daha küçük değiştiği için bu eklemeye daha çok direnç gösterir; sonsuz kapasite sonucu eklenmez.",
        ],
        reason:
          "Doğru. Direnç yorumu eşit koşullarda pH değişiminin küçük olmasıyla kurulmuştur.",
        commonError:
          "Son pH’nın daha küçük olmasını daha iyi tamponlama ölçütü sanmak.",
        check:
          "Karşılaştırmanın eşit başlangıç, hacim ve eklenen asit koşullarını koruduğunu kontrol et.",
      },
      {
        prompt:
          "Bir çözeltinin küçük asit eklemesine karşı pH’sını az değiştirdiği gözleniyor. Kimyasal bileşim hakkında başka veri yok. Hangi sonuç bu tek gözlemle kesinleşmez?",
        correct: "Tampon etkisine katılan maddelerin kesin kimyasal adları",
        wrong: [
          [
            "Verilen küçük eklemede pH değişiminin az olduğu",
            "Bu doğrudan gözlem olarak verilmiştir.",
          ],
          [
            "Daha büyük eklemelerin ayrıca sınanabileceği",
            "Küçük eklemenin gözlemi büyük ekleme sınamasını gereksiz veya imkânsız yapmaz.",
          ],
          [
            "Tampon kapasitesinin sınırlı olabileceği",
            "Tek küçük ekleme sınırsız koruma vermez; kapasite sınırı olasılığı korunur.",
          ],
          [
            "Bileşim için ek ölçüm gerekeceği",
            "Gözlem kimyasal adları ayırmadığından ek bileşim bilgisi gerekir.",
          ],
        ],
        knowledge: [
          "İşlevsel bir yanıt, birden çok kimyasal düzenle uyumlu olabilir; fenomenden tek bileşik kimliği zorunlu çıkmaz.",
        ],
        strategy:
          "Ölçülen direnç davranışıyla maddelerin adlarını ayrı bilgi olarak tut.",
        steps: [
          "Gözlenen bilgi küçük asit eklemesine düşük pH yanıtıdır.",
          "Hangi asit-baz bileşenlerinin bulunduğu belirtilmemiştir.",
          "Bu yüzden belirli kimyasal adlar için ek bileşim ölçümü gerekir.",
        ],
        reason:
          "Doğru. Tampon benzeri davranış kimyasal bileşimin tek ve kesin adını vermez.",
        commonError:
          "Bir işlevi görmenin, o işlevi sağlayan tek olası maddeyi belirlediğini varsaymak.",
        check:
          "Kesinleşmeyen seçenek, gözlenmiş pH davranışı değil ölçülmemiş madde kimliği olmalıdır.",
      },
      {
        prompt:
          "Bir organizmanın farklı bölmeleri için ölçülen pH’lar 2,7 ve 8. Bu bilgi hangi yorumu destekler?",
        correct:
          "Farklı bölmeler farklı pH koşulları taşıyabilir; tek bir ortak pH zorunlu değildir",
        wrong: [
          [
            "Organizmanın bütün kısımları kesin pH 2’dir",
            "7 ve 8 ölçümleri bu evrensel değeri doğrudan dışlar.",
          ],
          [
            "pH 8 olan bölmede hiçbir biyolojik süreç gerçekleşemez",
            "Biyolojik süreçlerin uygun aralıkları farklı olabilir; veri böyle evrensel işlev yokluğu belirtmez.",
          ],
          [
            "Bölmelerin pH farkı tek başına bütün elementlerin değiştiğini kanıtlar",
            "Asit-baz koşulu farkı element kimliklerinin bütünüyle değişmesi değildir.",
          ],
          [
            "Bir bölmenin pH’sı diğer iki bölmenin pH sayılarının ortalaması olmak zorundadır",
            "Ayrı düzenlenen bölmeler için böyle bir aritmetik ortalama kuralı verilmemiştir.",
          ],
        ],
        knowledge: [
          "Canlıdaki bölmeler farklı pH aralıklarında işlev görebilir; tek organ veya kap modeli bütün bölmelere aynı sayı olarak taşınmaz.",
        ],
        strategy:
          "Üç ölçümü kendi bölmesinde tut; birini bütün organizmaya genelleme.",
        steps: [
          "Üç bölmede üç farklı pH ölçülmüştür.",
          "Bu değerler tek bir ortak pH zorunluluğuyla bağdaşmaz.",
          "Farklı yerel koşullar sonucu desteklenir; işlevlerin tümden yokluğu veya ortalama kuralı eklenmez.",
        ],
        reason:
          "Doğru. Bölmeye özgü iç koşullar, bütün organizmayı tek sulu kap gibi ele almayı engeller.",
        commonError:
          "Bir yerdeki pH’yı bütün dokulara aynı normal değer olarak atamak.",
        check:
          "Cevap 2,7 ve 8 ölçümlerinin üçünü de kendi yerlerinde korumalıdır.",
      },
      {
        prompt:
          "Saf suya ayrı kaplarda NaCl ve glikoz eklenip çözünüyor. NaCl hareketli iyonlar veriyor, glikoz moleküllerini koruyor. Hangi yorum uygundur?",
        correct:
          "Çözünen tanecik türü iletkenlik için önemlidir; her sulu çözelti aynı miktarda hareketli iyon sağlamaz",
        wrong: [
          [
            "Çözünen madde adı ve tanecikleri bilinmeden bütün kapların iletkenliği aynı sayılır",
            "NaCl ile glikoz farklı tanecik türleri verir; yalnız su bulunması eşit iletkenlik garantisi değildir.",
          ],
          [
            "Glikoz çözündüğü için kesin Na⁺ ve Cl⁻ üretir",
            "Glikozun moleküler kimliği ve bileşimi bu iyonları üretmez.",
          ],
          [
            "Saf suyun iletkenliği her tuz çözeltisininkinden zorunlu yüksektir",
            "Saf suyun iletkenliği çok düşüktür; iyon eklenmesiyle aynı evrensel sıralama kurulamaz.",
          ],
          [
            "NaCl iyonları çözeltide yük taşımayı bırakır",
            "İyonların hareketli yükleri iletime katkı verir; toplam çözeltinin yük dengesi tek tek iyon yükünü kaldırmaz.",
          ],
        ],
        knowledge: [
          "Sulu çözeltilerde elektrik iletimine hareketli iyonlar katkı verir; moleküler çözünme aynı iyon katkısını zorunlu vermez.",
        ],
        strategy:
          "Çözünme ortaklığından önce oluşan taneciklerin yükünü karşılaştır.",
        steps: [
          "NaCl çözeltisinde hareketli Na⁺ ve Cl⁻ vardır.",
          "Glikoz örneğinde molekül kimliği korunur; aynı iyonlar oluşmaz.",
          "Bu nedenle yalnız suda çözünme bilgisi bütün kaplarda aynı iyon iletkenliği sonucunu vermez.",
        ],
        reason:
          "Doğru. Çözünen madde ve tanecik türü, iletim yorumunun bir parçasıdır.",
        commonError:
          "Suyun her türlü çözeltiyi kimliğinden bağımsız aynı iyi iletken yaptığını sanmak.",
        check:
          "Cevap moleküler glikozla yüklü NaCl iyonlarını birbirine dönüştürmemelidir.",
      },
    ],
  },
];
const permutations026A = [
  [
    [1, 0, 2, 4, 3],
    [4, 3, 2, 0, 1],
    [0, 1, 4, 3, 2],
    [4, 1, 0, 2, 3],
    [0, 3, 2, 1, 4],
    [0, 3, 2, 4, 1],
    [2, 0, 3, 4, 1],
    [4, 2, 1, 0, 3],
    [3, 4, 1, 0, 2],
    [0, 1, 2, 3, 4],
    [4, 0, 2, 1, 3],
    [1, 0, 3, 4, 2],
    [1, 4, 0, 3, 2],
    [1, 4, 0, 2, 3],
    [3, 2, 4, 1, 0],
    [2, 4, 1, 0, 3],
    [2, 4, 3, 1, 0],
    [0, 2, 1, 4, 3],
    [1, 4, 2, 3, 0],
    [3, 4, 1, 2, 0],
    [2, 4, 0, 3, 1],
    [3, 0, 4, 1, 2],
  ],
  [
    [1, 2, 4, 0, 3],
    [4, 1, 2, 3, 0],
    [4, 3, 1, 2, 0],
    [0, 4, 2, 1, 3],
    [4, 0, 1, 2, 3],
    [0, 4, 3, 2, 1],
    [4, 1, 2, 0, 3],
    [3, 0, 2, 4, 1],
    [3, 4, 0, 2, 1],
    [1, 2, 0, 4, 3],
    [0, 2, 3, 1, 4],
    [4, 2, 0, 3, 1],
    [2, 3, 0, 4, 1],
    [4, 0, 3, 1, 2],
    [4, 0, 3, 2, 1],
    [1, 2, 4, 0, 3],
    [0, 2, 4, 3, 1],
    [2, 1, 3, 0, 4],
    [4, 1, 2, 3, 0],
    [3, 2, 4, 1, 0],
    [0, 4, 2, 1, 3],
    [2, 0, 1, 4, 3],
  ],
  [
    [3, 0, 2, 4, 1],
    [0, 4, 3, 2, 1],
    [3, 1, 2, 4, 0],
    [2, 4, 0, 1, 3],
    [0, 1, 2, 4, 3],
    [4, 2, 3, 0, 1],
    [2, 1, 4, 3, 0],
    [4, 2, 1, 3, 0],
    [1, 3, 4, 0, 2],
    [4, 0, 2, 3, 1],
    [3, 0, 4, 2, 1],
    [3, 4, 0, 1, 2],
    [2, 4, 1, 0, 3],
    [4, 3, 1, 2, 0],
    [1, 0, 2, 4, 3],
    [0, 3, 1, 4, 2],
    [3, 4, 0, 1, 2],
    [0, 2, 4, 1, 3],
    [4, 1, 3, 0, 2],
    [2, 0, 3, 1, 4],
    [0, 2, 3, 1, 4],
    [4, 2, 0, 1, 3],
  ],
  [
    [3, 1, 4, 0, 2],
    [4, 0, 2, 3, 1],
    [2, 1, 0, 4, 3],
    [4, 2, 0, 1, 3],
    [0, 3, 1, 4, 2],
    [2, 1, 4, 0, 3],
    [1, 3, 2, 0, 4],
    [0, 1, 3, 4, 2],
    [4, 2, 1, 3, 0],
    [2, 0, 1, 3, 4],
    [4, 2, 0, 1, 3],
    [2, 1, 0, 4, 3],
    [1, 3, 2, 4, 0],
    [2, 1, 3, 0, 4],
    [3, 0, 1, 4, 2],
    [2, 0, 3, 1, 4],
    [0, 3, 2, 1, 4],
    [1, 4, 3, 0, 2],
    [2, 1, 0, 3, 4],
    [4, 1, 2, 3, 0],
    [0, 4, 3, 1, 2],
    [0, 3, 2, 4, 1],
    [3, 0, 2, 4, 1],
    [4, 1, 2, 3, 0],
  ],
];
export const forge026BiologyATopics: Record<string, string> =
  Object.fromEntries(
    packs026A.flatMap((p) => [
      [p.id, p.topic],
      [p.id + "-ileri", p.topic],
    ]),
  );
export const forge026BiologyAGuides: LessonGuide[] = packs026A.map((p) => ({
  id: p.id,
  minutes: p.minutes,
  objectives: p.objectives,
  sections: p.sections,
  examples: p.examples,
  recall: p.recall,
  source: p.source,
}));
export const forge026BiologyALessons: Lesson[] = packs026A.map((p, g) => ({
  id: p.id + "-ileri",
  subjectId: "tyt-biyoloji",
  title: txt(p.title),
  minutes: Math.ceil(p.items.length * 1.5),
  objectives: p.objectives.map(txt),
  source: txt(p.source),
  tags: [p.topic, "ileri-soru-seti", "özgün-sorular"],
  body: [
    {
      title: txt("Özgün ileri soru seti"),
      text: txt(
        "Temel anlatımın ardından bağımsız uygulama için hazırlanmıştır. Her soru kendi gerekli verilerini içerir; keşif modelinin anlık ayarlarına dayanmaz. Önce verilen ve isteneni belirle, sonra seçimini özgül kanıtla denetle.",
      ),
    },
  ],
  questions: p.items.map((q, i): Question => {
    const order = permutations026A[g][i],
      texts = [q.correct, ...q.wrong.map((x) => x[0])],
      reasons = [q.reason, ...q.wrong.map((x) => x[1])];
    return {
      id: `f026-bio-a-${p.id}-${i + 1}`,
      prompt: txt(q.prompt),
      options: order.map((k) => txt(texts[k])),
      answer: order.indexOf(0),
      skill: p.id,
      hint: txt(q.strategy),
      explanation: txt(
        q.reason + " " + q.steps.join(" ") + " Kontrol: " + q.check,
      ),
      guidance: {
        knowledge: q.knowledge,
        strategy: q.strategy,
        steps: q.steps,
        optionReasons: order.map((k) => reasons[k]),
        commonError: q.commonError,
        check: q.check,
      },
    };
  }),
}));
