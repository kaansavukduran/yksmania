import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";

function number025(
  value: unknown,
  min: number,
  max: number,
  integer = false,
): asserts value is number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < min ||
    value > max ||
    (integer && !Number.isSafeInteger(value))
  )
    throw new RangeError("CHEM025_NUMBER");
}
function menu025(
  value: unknown,
  values: readonly string[],
): asserts value is string {
  if (typeof value !== "string" || !values.includes(value))
    throw new RangeError("CHEM025_MENU");
}
export const fuelChoices025 = {
  carbon: {
    name: "Saf C modeli (kömürün sadeleştirmesi)",
    formula: "C",
    C: 1,
    H: 0,
    O: 0,
    molarMass: 12,
    heat: 32.8,
  },
  methane: {
    name: "Saf metan modeli",
    formula: "CH₄",
    C: 1,
    H: 4,
    O: 0,
    molarMass: 16,
    heat: 50,
  },
  ethanol: {
    name: "Saf etanol modeli",
    formula: "C₂H₆O",
    C: 2,
    H: 6,
    O: 1,
    molarMass: 46,
    heat: 26.8,
  },
  hydrogen: {
    name: "Saf hidrojen modeli",
    formula: "H₂",
    C: 0,
    H: 2,
    O: 0,
    molarMass: 2,
    heat: 120,
  },
} as const;
export function energy025(
  fuel: string,
  usefulMJ: number,
  efficiencyPct: number,
) {
  menu025(fuel, Object.keys(fuelChoices025));
  number025(usefulMJ, 10, 50);
  number025(efficiencyPct, 20, 60);
  const f = fuelChoices025[fuel as keyof typeof fuelChoices025],
    eta = efficiencyPct / 100,
    input = usefulMJ / eta,
    rejected = input - usefulMJ,
    massKg = input / f.heat,
    moles = (massKg * 1000) / f.molarMass,
    oxygenCoefficient = f.C + f.H / 4 - f.O / 2,
    oxygenMoles = moles * oxygenCoefficient,
    co2Moles = moles * f.C,
    waterMoles = (moles * f.H) / 2,
    oxygenKg = (oxygenMoles * 32) / 1000,
    co2Kg = (co2Moles * 44) / 1000,
    waterKg = (waterMoles * 18) / 1000;
  const atoms = {
    C: [moles * f.C, co2Moles],
    H: [moles * f.H, waterMoles * 2],
    O: [moles * f.O + oxygenMoles * 2, co2Moles * 2 + waterMoles],
  };
  return {
    fuel,
    ...f,
    usefulMJ,
    efficiencyPct,
    input,
    rejected,
    massKg,
    moles,
    oxygenCoefficient,
    oxygenMoles,
    oxygenKg,
    co2Moles,
    co2Kg,
    waterMoles,
    waterKg,
    atoms,
    balanced:
      Object.values(atoms).every(([a, b]) => Math.abs(a - b) < 1e-8) &&
      Math.abs(massKg + oxygenKg - co2Kg - waterKg) < 1e-8,
    co2PerUseful: co2Kg / usefulMJ,
    equation: `${f.formula} + ${oxygenCoefficient === 1 ? "" : oxygenCoefficient + " "}O₂ → ${[f.C ? `${f.C === 1 ? "" : f.C + " "}CO₂` : "", f.H ? `${f.H === 2 ? "" : f.H / 2 + " "}H₂O` : ""].filter(Boolean).join(" + ")}`,
    scope:
      "Saf türlerle tam yanma ve varsayımsal sabit alt ısıl değer modeli. Isıl değer MJ/kg; su buharı kabul edilir. Saf C gerçek kömürün kül, nem, S/N ve bileşim değişimini içermez. Hidrojenin kullanım noktasındaki CO₂’si sıfırdır; üretim/taşıma yaşam döngüsü burada hesaplanmaz.",
  };
}
export function hydrogenCycle025(
  electricMJ: number,
  electrolysisPct: number,
  cellPct: number,
) {
  number025(electricMJ, 10, 100);
  number025(electrolysisPct, 40, 90);
  number025(cellPct, 30, 70);
  const chemical = (electricMJ * electrolysisPct) / 100,
    output = (chemical * cellPct) / 100,
    firstLoss = electricMJ - chemical,
    secondLoss = chemical - output;
  return {
    electricMJ,
    electrolysisPct,
    cellPct,
    chemical,
    output,
    firstLoss,
    secondLoss,
    totalLoss: firstLoss + secondLoss,
    roundTripPct: (electrolysisPct * cellPct) / 100,
    balanced: Math.abs(electricMJ - output - firstLoss - secondLoss) < 1e-9,
    scope:
      "İki verim aynı alt ısıl değer temeline göre varsayılmıştır. Sıkıştırma, depolama, taşıma ve yardımcı cihaz kayıpları dışarıda; gerçek toplam geri dönüş daha düşük olabilir. H₂ enerji taşıyıcısıdır; elektroliz için dış enerji gerekir.",
  };
}
export function borohydride025(moles: number) {
  number025(moles, 0.1, 4);
  const left = { Na: moles, B: moles, H: 8 * moles, O: 2 * moles },
    right = { Na: moles, B: moles, H: 8 * moles, O: 2 * moles };
  return {
    moles,
    water: 2 * moles,
    hydrogen: 4 * moles,
    metaborate: moles,
    left,
    right,
    equation: "NaBH₄ + 2 H₂O → NaBO₂ + 4 H₂",
    balanced: Object.keys(left).every(
      (e) => left[e as keyof typeof left] === right[e as keyof typeof right],
    ),
    scope:
      "Basitleştirilmiş net stokiyometri; sulu ürünlerin hidrat/denge ayrıntıları dışarıdadır. NaBO₂’den NaBH₄’ü geri üretmek enerji ve ek süreç gerektirir; bor veya su, bedelsiz sınırsız enerji kaynağı değildir.",
  };
}
export const materialChoices025 = {
  aluminium: { name: "Alüminyum örneği", virgin: 45, recycled: 5 },
  glass: { name: "Cam örneği", virgin: 4, recycled: 3 },
  paper: { name: "Kâğıt örneği", virgin: 6, recycled: 2 },
  pet: { name: "PET örneği", virgin: 20, recycled: 6 },
} as const;
export function materialFlow025(
  initial: number,
  avoidPct: number,
  reusePct: number,
  collectionPct: number,
  acceptPct: number,
  yieldPct: number,
  material: string,
) {
  number025(initial, 100, 1000);
  number025(avoidPct, 0, 30);
  number025(reusePct, 0, 40);
  number025(collectionPct, 0, 100);
  number025(acceptPct, 0, 100);
  number025(yieldPct, 0, 100);
  menu025(material, Object.keys(materialChoices025));
  const avoided = (initial * avoidPct) / 100,
    generated = initial - avoided,
    reused = (generated * reusePct) / 100,
    waste = generated - reused,
    collected = (waste * collectionPct) / 100,
    uncollected = waste - collected,
    accepted = (collected * acceptPct) / 100,
    sortingReject = collected - accepted,
    recovered = (accepted * yieldPct) / 100,
    processReject = accepted - recovered,
    disposed = uncollected + sortingReject + processReject,
    virginNeeded = initial - avoided - reused - recovered,
    m = materialChoices025[material as keyof typeof materialChoices025],
    baselineEnergy = initial * m.virgin,
    newEnergy = virginNeeded * m.virgin + recovered * m.recycled,
    energySaved = baselineEnergy - newEnergy;
  return {
    initial,
    avoidPct,
    reusePct,
    collectionPct,
    acceptPct,
    yieldPct,
    material,
    ...m,
    avoided,
    generated,
    reused,
    waste,
    collected,
    uncollected,
    accepted,
    sortingReject,
    recovered,
    processReject,
    disposed,
    virginNeeded,
    baselineEnergy,
    newEnergy,
    energySaved,
    recoveryOfInitialPct: (100 * recovered) / initial,
    balanced:
      Math.abs(initial - avoided - reused - recovered - disposed) < 1e-8,
    scope:
      "Varsayımsal tek döngü: aynı hizmet daha az malzemeyle sağlanıyor; yeniden kullanılan ve geri kazanılan uygun kaliteli her kg, 1 kg yeni üretimi ikame ediyor. Tüm verimler kendi aşama girdisine uygulanır. kWh/kg yoğunlukları öğretim için verilmiş varsayımsal sayılardır; toplama/taşıma, yeniden kullanım temizliği ve tesis altyapısı enerji sınırının dışındadır. Bu sınırla bulunan tasarruf bütün yaşam döngüsü sonucu değildir.",
  };
}
function reuseDifference025(
  uses: number,
  production: number,
  wash: number,
  single: number,
) {
  // Verilen ondalık sayıları ortak 10 tabanında karşılaştır; sabit eşitlik eşiği küçük gerçek farkları silmesin.
  const parts = [production, wash, single].map((value) => {
    const [mantissa, power = "0"] = String(value).split("e"),
      [whole, fraction = ""] = mantissa.split(".");
    return {
      digits: BigInt(whole + fraction),
      power: Number(power) - fraction.length,
    };
  });
  const power = Math.min(...parts.map((p) => p.power)),
    scaled = parts.map((p) => p.digits * 10n ** BigInt(p.power - power)),
    n = BigInt(uses),
    delta = n * scaled[2] - scaled[0] - n * scaled[1];
  return {
    difference: Number(`${delta}e${power}`),
    advantage: delta > 0n ? "reusable" : delta < 0n ? "single" : "equal",
  };
}
export function reuseImpact025(
  uses: number,
  reusableProduction: number,
  washPerUse: number,
  singlePerUse: number,
) {
  number025(uses, 1, 100, true);
  number025(reusableProduction, 0.1, 100);
  number025(washPerUse, 0, 5);
  number025(singlePerUse, 0.1, 10);
  const reusable = reusableProduction + uses * washPerUse,
    single = uses * singlePerUse,
    { difference, advantage } = reuseDifference025(
      uses,
      reusableProduction,
      washPerUse,
      singlePerUse,
    );
  return {
    uses,
    reusableProduction,
    washPerUse,
    singlePerUse,
    reusable,
    single,
    difference,
    advantage,
    breakEven:
      singlePerUse > washPerUse
        ? reusableProduction / (singlePerUse - washPerUse)
        : null,
    scope:
      "Aynı işlev için verilmiş tek etki ölçütü; üretim bir defa, temizlik her kullanımda sayılır. Bu sayılarla kazanç başka çevresel ölçütleri veya gerçek kullanım ömrünü otomatik kanıtlamaz.",
  };
}
export function cube025(edgeNm: number, divisions: number) {
  number025(edgeNm, 10, 1000);
  number025(divisions, 1, 10, true);
  const smallEdge = edgeNm / divisions,
    pieces = divisions ** 3,
    volume = edgeNm ** 3,
    totalVolume = pieces * smallEdge ** 3,
    initialArea = 6 * edgeNm ** 2,
    totalArea = pieces * 6 * smallEdge ** 2;
  return {
    edgeNm,
    divisions,
    smallEdge,
    pieces,
    volume,
    totalVolume,
    initialArea,
    totalArea,
    areaRatio: totalArea / initialArea,
    surfacePerVolume: totalArea / totalVolume,
    initialSurfacePerVolume: initialArea / volume,
    nanorange: smallEdge >= 1 && smallEdge <= 100,
    edgeM: edgeNm * 1e-9,
    smallEdgeM: smallEdge * 1e-9,
    balanced: Math.abs(totalVolume - volume) <= Math.max(1, volume) * 1e-12,
    scope:
      "Eş küplere ideal geometrik bölme; kesim kaybı ve aralık yoktur. Bütün yeni yüzeylerin erişilebilir, parçaların ayrık ve birleşmemiş olduğu varsayılır. Kimyasal bileşim ve toplam hacim korunur; hız, toksisite veya dayanım yalnız bu geometriyle hesaplanmaz.",
  };
}
export function lattice025(n: number, layer: number) {
  number025(n, 2, 16, true);
  number025(layer, 1, n, true);
  const total = n ** 3,
    interior = (n - 2) ** 3,
    surface = total - interior,
    points = Array.from({ length: n * n }, (_, i) => {
      const x = i % n,
        y = Math.floor(i / n),
        z = layer - 1;
      return {
        x,
        y,
        z,
        surface:
          x === 0 ||
          y === 0 ||
          z === 0 ||
          x === n - 1 ||
          y === n - 1 ||
          z === n - 1,
      };
    });
  return {
    n,
    layer,
    total,
    interior,
    surface,
    surfaceFraction: surface / total,
    points,
    surfaceInLayer: points.filter((p) => p.surface).length,
    scope:
      "Basit kübik n×n×n nokta modeli; yüzey, sınırda bulunan noktalardır. Bu sayım gerçek her kristalin yapısı veya bir nano parçacığın atom sayısı değildir; element, örgü ve yüzey yapısı ayrıca gerekir.",
  };
}
export function length025(value: number, unit: string) {
  number025(value, 0.001, 1e6);
  menu025(unit, ["m", "mm", "μm", "nm"]);
  const scales: Record<string, number> = { m: 1, mm: 1e-3, μm: 1e-6, nm: 1e-9 },
    metres = value * scales[unit];
  return {
    value,
    unit,
    metres,
    nanometres: metres * 1e9,
    micrometres: metres * 1e6,
  };
}
export const chemistryDefaults025 = {
  energyMode: "fuel",
  fuel: "methane",
  useful: 30,
  efficiency: 40,
  electric: 60,
  electrolysis: 70,
  cell: 50,
  bor: 0.5,
  initial: 500,
  avoid: 10,
  reuse: 20,
  collection: 80,
  accept: 90,
  process: 80,
  material: "pet",
  sustainMode: "flow",
  uses: 10,
  production: 12,
  wash: 0.2,
  single: 2,
  nanoMode: "cube",
  edge: 300,
  divisions: 3,
  lattice: 6,
  layer: 1,
  length: 50,
  unit: "nm",
  guess: "",
  reason: "",
  checked: false,
  show: false,
};
export function normalizeChemistry025(saved: Record<string, unknown>) {
  const d = chemistryDefaults025,
    num = (key: keyof typeof d, min: number, max: number, step = 1) => {
      const a = saved[key];
      return typeof a === "number" && Number.isFinite(a)
        ? Math.min(
            max,
            Math.max(
              min,
              step ? Number((Math.round(a / step) * step).toFixed(8)) : a,
            ),
          )
        : (d[key] as number);
    },
    choice = (key: keyof typeof d, allowed: readonly string[]) =>
      typeof saved[key] === "string" && allowed.includes(saved[key] as string)
        ? (saved[key] as string)
        : (d[key] as string),
    n = num("lattice", 2, 16);
  const out = {
    energyMode: choice("energyMode", ["fuel", "hydrogen", "bor"]),
    fuel: choice("fuel", Object.keys(fuelChoices025)),
    useful: num("useful", 10, 50),
    efficiency: num("efficiency", 20, 60),
    electric: num("electric", 10, 100),
    electrolysis: num("electrolysis", 40, 90),
    cell: num("cell", 30, 70),
    bor: num("bor", 0.1, 4, 0.1),
    initial: num("initial", 100, 1000, 10),
    avoid: num("avoid", 0, 30),
    reuse: num("reuse", 0, 40),
    collection: num("collection", 0, 100),
    accept: num("accept", 0, 100),
    process: num("process", 0, 100),
    material: choice("material", Object.keys(materialChoices025)),
    sustainMode: choice("sustainMode", ["flow", "reuse"]),
    uses: num("uses", 1, 100),
    production: num("production", 0.1, 100, 0.1),
    wash: num("wash", 0, 5, 0.1),
    single: num("single", 0.1, 10, 0.1),
    nanoMode: choice("nanoMode", ["cube", "lattice", "length"]),
    edge: num("edge", 10, 1000, 10),
    divisions: num("divisions", 1, 10),
    lattice: n,
    layer: num("layer", 1, n),
    length: num("length", 0.001, 1e6, 0),
    unit: choice("unit", ["m", "mm", "μm", "nm"]),
    guess: typeof saved.guess === "string" ? saved.guess : "",
    reason: typeof saved.reason === "string" ? saved.reason.slice(0, 128) : "",
    checked: saved.checked === true,
    show: saved.show === true,
  };
  return Object.keys(out).some(
    (k) =>
      !["guess", "reason", "checked", "show"].includes(k) &&
      out[k as keyof typeof out] !== saved[k],
  )
    ? { ...out, guess: "", reason: "", checked: false, show: false }
    : out;
}

type Section025 = LessonGuide["sections"][number];
type Example025 = LessonGuide["examples"][number];
type Item025 = {
  prompt: string;
  options: string[];
  answer: number;
  hint: string;
  explanation: string;
  guidance: NonNullable<Question["guidance"]>;
};
const s025 = (title: string, a: string, b: string): Section025 => ({
  title,
  paragraphs: [a, b],
});
const e025 = (
  title: string,
  prompt: string,
  strategy: string,
  steps: string[],
  answer: string,
  check: string,
  pitfall: string,
): Example025 => ({
  title,
  prompt,
  strategy,
  steps: steps.map((explanation, i) => ({
    label: `${i + 1}. adım`,
    explanation,
  })),
  answer,
  check,
  pitfall,
});
const q025 = (
  prompt: string,
  knowledge: string,
  strategy: string,
  steps: string[],
  pairs: [string, string][],
  commonError: string,
  check: string,
): Item025 => ({
  prompt,
  options: pairs.map(([s]) => s),
  answer: 0,
  hint: strategy,
  explanation: steps.join(" ") + " " + check,
  guidance: {
    knowledge: [knowledge],
    strategy,
    steps,
    optionReasons: pairs.map(([, s], i) => (i === 0 ? "Doğru. " : "") + s),
    commonError,
    check,
  },
});
type Pack025 = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  sections: Section025[];
  examples: Example025[];
  recall: LessonGuide["recall"];
  items: Item025[];
};
// Her kartın başlangıçtaki ilk seçeneği ve gerekçesi aynı anlamsal çifttir.
const nanoPack025: Pack025 = {
  id: "ayt-nanoteknoloji-gelismeler",
  topic: "detail-462",
  title: "Nanoteknoloji ve Bilimsel Gelişmeler",
  minutes: 85,
  objectives: [
    "Nanometre ölçeğini ve nano yapının boyut koşulunu doğru dönüştürmek",
    "Küçülmenin yüzey/hacim ve sınır atomu payına etkisini korunumlardan türetmek",
    "Nano uygulamalarda malzeme, erişilebilirlik ve kanıt koşullarını ayırmak",
  ],
  sections: [
    s025(
      "Başlamadan: nano öneki",
      "Nano, milyarda bir yani 10⁻⁹ çarpanını belirtir; 1 nm=10⁻⁹ m’dir.1μm=10³ nm ve 1 mm=10⁶ nm dönüşümleri farklı ölçekleri karşılaştırmayı sağlar. Önek uzunluğa uygulandığında birim de nanometredir.",
      "Ön koşul ondalık üsler, alan-hacim ve oran bilgisidir. Uzunluk küçülmesinin alanı karesi, hacmi küpü oranında değiştirdiğini bilmek gerekir. Birim dönüştürürken sayıyı değiştirip birimi sabit bırakmak veya alanı uzunluk gibi çevirmek hata doğurur.",
    ),
    s025(
      "Nanomalzeme koşulu",
      "Nano ölçek çoğu temel anlatımda yaklaşık 1–100 nm aralığıdır; en az bir boyutu bu ölçekte olan yapılar incelenir. İnce bir kaplamanın kalınlığı nano iken genişliği çok daha büyük olabilir; üç boyutun da aynı küçüklükte olması şart değildir.",
      "Bu aralık eğitimde kullanılan bir ölçektir; tanımın uygulama ve ölçüm bağlamı ayrıca belirtilir. Bir ürünün adında nano bulunması tek başına boyut ölçümü veya yeni özellik kanıtı değildir. Ölçülen boyut, şekil ve dağılım verilmelidir.",
    ),
    s025(
      "Atom, molekül ve parçacık farklıdır",
      "Bir nanoparçacık çok sayıda atom veya molekül içerebilir; nanometre sözcüğü tek atom demek değildir. Gerçek atom boyutu ve bağ uzaklığı elemente ve yapıya bağlıdır; her nanometrede sabit sayıda atom bulunduğu varsayılmaz.",
      "Kimyasal bileşim aynı kaldığında bile boyut ve yüzey ortamı özellikleri değiştirebilir. Fiziksel küçültme elementleri birbirine dönüştürmez; C atomunu başka element yapan bir nanoteknoloji kuralı yoktur. Bağ düzeni ve yapı değişimi ile çekirdek değişimini ayır.",
    ),
    s025(
      "Küpün alan ve hacmi",
      "Kenar uzunluğu a olan küpte hacim a³, toplam dış yüzey 6 a²’dir. Yüzey/hacim oranı 6/a olur; aynı biçimde daha küçük a daha büyük yüzey/hacim oranı verir.",
      "Oranın birimi ters uzunluktur:nm⁻¹ gibi. Bir küpün kenarı yarıya inerse tek parçanın alanı dörtte, hacmi sekizde kalır; alan ve hacim aynı çarpanla değişmez. Toplam maddeyi koruyan çoklu parça hesabı bundan sonraki adımdır.",
    ),
    s025(
      "Kesmeyle toplam yüzey artışı",
      "Büyük küp her eksende k eş parçaya bölünürse k³ küçük küp oluşur; her birinin kenarı a/k olur. Küpler ayrık ve bütün yeni yüzeyler erişilebilir kabul edilirse toplam alan 6 a² k’dır.",
      "Toplam hacim k³(a/k)³=a³ olarak korunur; toplam yüzey başlangıcın k katına çıkar. Bu artış yeni atom yaratmak değil, içte kalan yüzeylerin dışa açılmasıdır. Model kesim kaybı ve parçalar arası boşluk hacmini dışarıda tutar.",
    ),
    s025(
      "Hacim, kütle ve yoğunluk",
      "Aynı malzeme aynı yoğunlukta ideal parçalara ayrıldığında toplam hacim ve kütle korunur. Parça başına kütle küçülürken parça sayısı artar; toplam kütlenin de aynı oranda azaldığı sonucu çıkmaz.",
      "Gerçek öğütmede toz kaybı, şekil dağılımı veya yüzey kimyası değişebilir. Bu tür etkiler verilmemişse ideal geometri hesabına gizlice eklenmez. Gözlenen kütle azalması varsa kayıp akışı ayrıca ölçülmeli; yalnız küçüldü diye kütle yok oldu denmemelidir.",
    ),
    s025(
      "Yüzeydeki atom payı",
      "Basit kübik n×n×n nokta modelinde toplam n³, sınırda olmayan iç noktalar(n−2)³ sayılır; n en az 2’dir. Sınır noktası n³−(n−2)³ olarak türetilir; köşe ve kenarlar iki kez sayılmaz.",
      "n küçüldükçe sınır noktalarının toplam içindeki payı büyür. Bu oyuncak sayım gerçek her kristalin örgüsü veya parçacık atom sayısı değildir. Gerçek malzemede atom dizilişi, yüzey yüzleri, kusurlar ve kimyasal çevre ayrıca belirlenir.",
    ),
    s025(
      "Erişilebilir yüzey ve kümelenme",
      "Geometrik alanın büyük olması bütün yüzeyin çevredeki moleküllerce erişilebilir olduğu anlamına gelmez. Parçacıkların kümelenmesi veya kaplanması bazı yüzeyleri temas içinde kapatabilir; gözenek yapısı da erişimi etkiler.",
      "Bu yüzden model alan artışını, parçaların ayrık ve yeni yüzeylerin açık olduğu varsayımıyla verir. Ölçülen özgül yüzey alanı geometri dışında yapısal ve erişim bilgisi içerir. Tozun yalnız küçük etiketinden etkin yüzeyi kesin hesaplama.",
    ),
    s025(
      "Yüzey ve tepkime davranışı",
      "Daha büyük erişilebilir yüzey, kataliz veya adsorpsiyon için daha çok etkileşim yeri sağlayabilir. Aynı bileşim, koşul ve uygun etkin yüzey varsayımı altında yüzey artışı önemli bir açıklamadır.",
      "Geometrik alanın iki katı olması her kimyasal tepkimenin hızını kesin iki kat yapmaz. Etkin yer kimyası, taşınım, sıcaklık, derişim ve yüzey kapanması sonucu etkiler. Model yüzey oranını hesaplar; deneysel kinetik sabit üretmez.",
    ),
    s025(
      "Boyuta bağlı elektronik ve optik özellik",
      "Bazı yarı iletken nano yapılarda boyut, elektronik enerji düzeyleri ve ışık soğurma/yayma davranışını etkileyebilir. Bu tür etkiler kuantum sınırlama gibi malzemeye özgü açıklamalar gerektirir; yalnız makroskopik yüzey hesabı yeterli değildir.",
      "Bütün küçük parçacıkların aynı rengi, aynı iletkenliği veya daha yüksek dayanımı taşıdığı kuralı yoktur. Özellik değişimi boyut yanında bileşim, şekil, kusur ve ortamla birlikte değerlendirilir. Bir örnekteki değişim bütün nanomalzemelere taşınmaz.",
    ),
    s025(
      "Karbon nano yapıları",
      "Grafen, karbonun bir atom kalınlığındaki tabaka yapısına; karbon nanotüp, tüp biçimli karbon ağına; fullerenler kapalı kafes yapılara örnek verir. Bunlar ortak karbon elementi üzerinden farklı bağ düzeni ve geometrilerle incelenir.",
      "Nanotüpün çapı nano iken uzunluğu çok daha büyük olabilir. Mekanik ve elektriksel davranış yapı ve tüp türüyle değişir; her karbon nano yapı aynı özelliği göstermez. Fulleren ailesi ile nanotüp keşif tarihlerini tek olay veya tek zorunlu üretim yolu gibi birleştirme.",
    ),
    s025(
      "Yukarıdan aşağıya ve aşağıdan yukarıya",
      "Yukarıdan aşağıya yaklaşım daha büyük yapının uygun yöntemle küçültülmesi/örüntülenmesidir. Aşağıdan yukarıya yaklaşım atom, molekül veya küçük birimlerden kontrollü yapı kurulmasını içerir.",
      "İki yaklaşımın da boyut dağılımı, saflık, yüzey ve üretim ölçeği sınırları vardır. Birini bütün malzemeler için daha ucuz veya kusursuz ilan etmek doğru değildir. Hedef özellik ve ölçüm verisi, üretim yönteminin uygunluğunu sınamak için gerekir.",
    ),
    s025(
      "Gözlem ve ölçüm",
      "Nano boyutta yapı incelemede elektron mikroskobu veya uygun taramalı prob teknikleri gibi araçlar kullanılabilir. Ölçüm tekniğinin çözünürlüğü, örnek hazırlama ve hangi özelliği ölçtüğü sonuçla birlikte açıklanmalıdır.",
      "Bir resmin büyütülmüş görünmesi, her görünen lekenin tek atom olduğu anlamına gelmez. Numunenin boyut dağılımı ve görüntü/ölçüm sınırları önemlidir. Makro ölçekte bir üründe nano kaplama bulunması ürünün bütününün tek nano parçacık olduğu sonucu vermez.",
    ),
    s025(
      "Kaplama ve yüzey işlevi",
      "Bazı nano yapılı kaplamalar suyla ıslanma, kir tutma veya ışıkla yüzey tepkimesi davranışını değiştirmek için tasarlanır. Örneğin uygun TiO₂ sistemlerinde fotokataliz, ışık ve kimyasal koşulla ilişkilidir.",
      "Kendi kendini temizleyen ifadesi hiçbir koşul gerektirmeyen sonsuz temizlik demek değildir. Işık, nem, kir türü, aşınma ve kaplama ömrü sonucu etkiler. Deneyde aynı kir ve koşullar altında kaplı/kaplanmamış örnekler karşılaştırılarak iddia sınanmalıdır.",
    ),
    s025(
      "Enerji uygulamaları",
      "Nano ölçekli katalizör yüzeyleri, yakıt pili elektrotları, batarya elektrotları ve bazı güneş hücresi yapıları enerji araştırmalarında kullanılır. Amaç etkin yüzey, taşınım veya elektronik/optik davranışı uygun biçimde düzenlemektir.",
      "Bir laboratuvar hücresindeki iyileşme cihaz ömrü, üretim maliyeti ve büyük ölçek güvenirliğiyle birlikte değerlendirilir. Nano parçacık eklenmesi hiçbir girdi gerektirmeyen enerji üretmez; elektrik/kimyasal enerji bilançosu ve verim sınırları korunur.",
    ),
    s025(
      "Su arıtma ve adsorpsiyon",
      "Nano yapılı yüzeyler veya gözenekli malzemeler bazı kirleticileri adsorbe etmek ya da uygun tepkimelerle dönüştürmek için araştırılır. Adsorpsiyonda madde yüzeye tutunur; kirletici atomları yok olmuş sayılmaz.",
      "Kapasite, doygunluk, seçicilik, yeniden kullanım ve tutulan maddenin son yönetimi önemlidir. Bir yüzeyin belirli boyuttaki her kirleticiyi koşulsuz ayıracağı kuralı yoktur. Filtreleme ile çözünmüş tür adsorpsiyonu farklı mekanizmalar olabilir.",
    ),
    s025(
      "Biyomedikal uygulama ve kanıt",
      "Nano taşıyıcılar, ilaç dağıtımı, görüntüleme veya tanı amaçlarıyla geliştirilen malzeme örnekleridir. Bir ürünün etkisi boyut, bileşim, doz, dağılım ve hedef koşullarda yapılan kontrollü çalışmalarla değerlendirilir.",
      "Araştırma hedefi olan her nanorobot veya tek ilaçla bütün hastalıkları çözme fikri kanıtlanmış genel sonuç değildir. Bir uygulamanın işe yaradığı belirli koşullardan tüm hastalık/kişilere başarı garantisi çıkarılmaz. Bu öğretim bölümü kişisel tedavi yolu önermez.",
    ),
    s025(
      "Yarar, risk ve gelecek iddiası",
      "Nanomalzeme riski yalnız küçük olmasına değil bileşim, şekil, yüzey, doz, maruziyet yolu ve kalıcılığa bağlıdır. Bir malzemenin olası yararı, tüm nano ürünlerin zararsız veya tümünün zararlı olduğu anlamına gelmez.",
      "Bilimsel değerlendirmede ölçülmüş sonuç, belirli varsayım ve geleceğe yönelik hedef ayrı yazılır. Daha küçük mutlaka daha güçlü, daha ucuz veya daha güvenlidir genellemeleri sınanmış veri gerektirir. Boyut modeli bu ayrımı görünür kılar; tek başına toksisite veya klinik başarı ölçmez.",
    ),
  ],
  examples: [
    e025(
      "Metreden nanometreye",
      "Bir kaplama kalınlığı 0,000000075 m olarak ölçülüyor. Nanometre karşılığı ve temel nano aralık yorumu nedir?",
      "Bilimsel gösterime geçip 10⁹ ile çarp.",
      [
        "0,000000075 m=7,5×10⁻⁸ m’dir.",
        "Nanometre değeri 7,5×10⁻⁸×10⁹=75 nm olur.",
        "75 nm, bu öğretimde kullanılan yaklaşık 1–100 nm kalınlık aralığındadır.",
      ],
      "75 nm; nano kalınlık örneği",
      "75×10⁻⁹ m=7,5×10⁻⁸ m ile geri dönüş doğrulanır.",
      "Metreyi nanometreye çevirirken 10⁹’a bölmek.",
    ),
    e025(
      "216 parçada hacim korunumu",
      "600 nm kenarlı ideal küp her eksende 6 eş parçaya bölünüyor. Parçalar ayrık, kayıp yok. Parça sayısı, küçük kenar ve toplam alan oranı nedir?",
      "Bölme sayısını sayı, hacim ve alan bağıntılarına ayrı uygula.",
      [
        "Parça sayısı 6³=216; küçük kenar 600/6=100 nm’dir.",
        "Toplam hacim 216×100³=216000000 nm³=600³ ile aynıdır.",
        "Toplam yüzey oranı 6’dır; başlangıç 2160000 nm², son 12960000 nm² olur.",
      ],
      "216 parça; 100 nm kenar; 6 kat toplam alan",
      "Hacim ve aynı yoğunlukta toplam kütle korunur; artış yalnız erişilebilir dış alandadır.",
      "Parça sayısını 6 veya 36 saymak; üç ekseni birlikte düşünmemek.",
    ),
    e025(
      "Kübik örgüde sınır sayımı",
      "Basit 6×6×6 nokta küp modelinde sınır ve iç nokta sayıları nedir?",
      "Tüm noktalardan sınırdan birer katman çıkarılmış iç küpü düş.",
      [
        "Toplam 6³=216 nokta vardır.",
        "İç küp(6−2)³=4³=64 nokta taşır.",
        "Sınır 216−64=152 nokta, yüzey payı 152/216≈%70,4’tür.",
      ],
      "152 sınır; 64 iç nokta",
      "152+64=216; köşe/kenar noktaları birden çok yüzün üyesi olsa da toplamda bir kez sayılır.",
      "Altı yüzü 6×36 sayıp kenar ve köşeleri tekrar tekrar eklemek.",
    ),
    e025(
      "Aynı hacimde küresel parçalar",
      "Aynı malzemenin küresel bir parçacığı, yarı yarıçaplı eş kürelere kayıpsız ayrılıyor. Toplam hacim sabit, parçalar ayrık. Kaç küçük küre ve toplam alan oranı gerekir?",
      "Küre hacminin r³, alanının r² ile değişmesini kullan.",
      [
        "Yarı yarıçaplı tek kürenin hacmi 1/8 olur; aynı toplam için 8 küre gerekir.",
        "Her küçük kürenin alanı başlangıcın 1/4’üdür.",
        "Toplam alan 8×1/4=2 kat olur; toplam hacim değişmez.",
      ],
      "8 küre; 2 kat toplam alan",
      "Parça sayısı 8 ile hacim payı 1/8 çarpımı 1’dir; alan farklı üs taşır.",
      "Alan da hacim de yarıya iner diye bütün geometrik nicelikleri aynı oranla değiştirmek.",
    ),
    e025(
      "Verilmiş yüzey kapasitesi",
      "Bir adsorbanın erişilebilir özgül alanı 4 m²/g, yükleme sınırı 2 mg/m²’dir.3 g örnek için ideal toplam kapasite nedir? Bütün yüzey kullanılabilir kabul ediliyor.",
      "Önce kütle×özgül alan, sonra alan×yükleme hesapla.",
      [
        "Toplam erişilebilir alan 3×4=12 m²’dir.",
        "Kapasite 12×2=24 mg kirleticidir.",
        "Bu değer belirtilen doygunluk/erişim varsayımına aittir; daha çok kirletici girişi sınırsız tutulmaz.",
      ],
      "24 mg",
      "Birimler g×m²/g×mg/m²=mg olarak sadeleşir.",
      "Özgül alanı toplam alan gibi alıp örnek kütlesini atlamak.",
    ),
    e025(
      "Kaplama iddiasını kontrollü sınamak",
      "Yeni kaplama için ışıkta kir giderimini artırır iddiası var. Aynı yüzey malzemesi ve aynı kir yüküyle nasıl karşılaştırma kurulur?",
      "Kaplama ve ışık değişkenlerini ayrı kontrol et.",
      [
        "Aynı kir ve alan için kaplı/kaplanmamış örnekleri aynı ışıkta karşılaştır.",
        "Kaplı örneği karanlık koşuluyla da karşılaştırarak ışık etkisini ayır.",
        "Süre, sıcaklık ve ölçüm yöntemi sabit tutulur; sonuç yalnız sınanan koşullara genellenir.",
      ],
      "Kaplama ve ışık için uygun kontrollü karşılaştırmalar",
      "Yalnız farklı kirli iki yüzeyi farklı koşullarda izlemek kaplamanın etkisini ayırmaz.",
      "Gözle daha temiz görünen tek örnekten bütün kir ve ışıklarda kesin başarı iddiası çıkarmak.",
    ),
  ],
  recall: [
    {
      prompt: "1μm kaç nanometredir?",
      answer: "1000 nm; çünkü 10⁻⁶ m/10⁻⁹ m=10³’tür.",
    },
    {
      prompt: "Nano kaplamanın bütün boyutları nano olmak zorunda mı?",
      answer:
        "Hayır; en az bir boyut, örneğin kalınlık, yaklaşık nano aralıkta olabilir.",
    },
    {
      prompt: "Küp her eksende k parçaya bölünürse toplam hacim ve alan?",
      answer:
        "İdeal ayrık parçalarda hacim aynı; toplam alan k kat olur, parça sayısık³’tür.",
    },
    {
      prompt: "n×n×n basit nokta küpünün iç sayısı?",
      answer:
        "n≥2 için(n−2)³; bu gerçek bütün kristallerin zorunlu örgüsü değildir.",
    },
    {
      prompt:
        "Daha büyük geometrik alan neden her zaman daha büyük etkin alan değildir?",
      answer:
        "Kümelenme, kaplama ve erişim kısıtları bazı yüzeyleri kapatabilir.",
    },
    {
      prompt: "Nanometre boyutu tek başına hangi sonuçları vermez?",
      answer:
        "Kesin hız, dayanım, toksisite, klinik başarı veya maliyet üstünlüğünü tek başına vermez; malzeme ve koşul verisi gerekir.",
    },
  ],
  items: [],
};
const energyPack025: Pack025 = {
  id: "ayt-enerji-kaynaklari-gelismeler",
  topic: "detail-460",
  title: "Enerji Kaynakları ve Bilimsel Gelişmeler",
  minutes: 100,
  objectives: [
    "Enerji kaynağı, taşıyıcısı, yenilenebilirlik ve verimi farklı ölçütlerle açıklamak",
    "Yanma, hidrojen çevrimi ve enerji dönüşümünde madde/enerji bilançosu kurmak",
    "Fosil, yenilenebilir ve nükleer seçenekleri açık sistem sınırlarıyla karşılaştırmak",
  ],
  sections: [
    s025(
      "Başlamadan: enerji ile gücü ayır",
      "Enerji aktarılabilen ve dönüşebilen bir niceliktir; SI birimi joule’dür. Güç, birim zamanda aktarılan enerjidir: P=E/t. Bir kW güçte bir saat çalışan aygıt 1 kWh=3,6 MJ enerji kullanır.",
      "Ön koşul mol, dengeli denklem ve yüzde hesabıdır. Kaynaktan alınan enerji yararlı çıktıya ve çevreye aktarılan enerjiye ayrılır; düşük verim enerji yok oldu demek değildir. kW ile kWh’yi aynı tür birim gibi toplama.",
    ),
    s025(
      "Kaynak, taşıyıcı ve zaman ölçeği",
      "Güneş ışınımı, rüzgâr ve jeotermal ısı birincil enerji kaynaklarıdır. Elektrik ve çoğu kullanım bağlamında hidrojen, başka kaynaktan üretilen enerji taşıyıcılarıdır. Taşıyıcının kullanım ürünü üretim sürecinin bütün etkisini söylemez.",
      "Yenilenebilirlik, kaynağın insan kullanım ölçeğinde doğal süreçlerle yeniden sağlanabilmesiyle ilgilidir. Alternatif sözcüğü fosile alternatif olmayı anlatabilir; nükleer alternatif olup yenilenebilir değildir. Hiçbir sınıf adı sıfır çevresel etkiyi tek başına garanti etmez.",
    ),
    s025(
      "Fosil yakıtların kökeni",
      "Kömür, petrol ve doğal gaz jeolojik zaman boyunca organik maddelerin dönüşümüyle oluşan sınırlı stoklardır. Tüketilmeleriyle yeniden oluşmaları aynı zaman ölçeğinde değildir; bu yüzden kısa insan ölçeğinde yenilenemez kabul edilirler.",
      "Kömür saf C değil; C yanında H, O, N, S, mineral kül ve nem içeren değişken bir malzemedir. Turba–linyit–taş kömürü–antrasit örüntüsü kömürleşmeyi öğretir; gerçek ısıl değeri yalnız yaş değil bileşim ve nem de belirler. Grafit karbon allotropudur.",
    ),
    s025(
      "Petrol: karışım ve ayrımsal damıtma",
      "Ham petrol tek molekül veya sabit kaynama noktalı saf madde değildir; çok sayıda hidrokarbon ve başka bileşen karışımıdır. Rafineride ayrımsal damıtma, bileşenlerin kaynama aralıkları farkından yararlanarak fraksiyonlar ayırır.",
      "Kule tabanı sıcak, üst bölümü daha soğuktur; daha uçucu düşük kaynama aralıklı kısımlar üstlere ulaşabilir. LPG, benzin/nafta, kerosen, motorin ve ağır kalıntılar farklı fraksiyon örnekleridir. Damıtma fiziksel ayırmadır; kraking ise bağ kıran farklı işlemdir.",
    ),
    s025(
      "Doğal gaz, LPG, LNG ve CNG",
      "Doğal gaz çoğunlukla metan içeren değişken bir gaz karışımıdır; petrol sahasıyla birlikte veya ayrı yataklarda bulunabilir. LPG’de çoğunlukla propan/bütan, LNG’de soğutularak sıvılaştırılmış doğal gaz, CNG’de sıkıştırılmış doğal gaz söz konusudur.",
      "LNG ile CNG aynı fiziksel depolama değildir. Metanı oda sıcaklığında yalnız basıncı artırarak sıvı yapma varsayımı kurulmaz; kritik sıcaklığı önemlidir. Yanma/kaçak riskleri ile safsızlık etkileri nedeniyle doğal gazı koşulsuz zararsız diye adlandırmak da doğru değildir.",
    ),
    s025(
      "Tam yanma ve oksijen hesabı",
      "Saf C, CH₄, C₂H₆O ve H₂ için yeterli O₂ ile tam yanma net ürünleri atom sayımından çıkarılır. Karbon CO₂’ye, hidrojen H₂O’ya gider; yakıtın kendi O atomu gerekiyorsa dış O₂ ihtiyacından düşülür.",
      "CH₄+2 O₂→CO₂+2 H₂O; C₂H₆O+3 O₂→2 CO₂+3 H₂O denklikleri örnektir. Gerçek yakıtta S/N, kül, nem ve eksik yanma ürünleri ayrıca önemlidir. Saf tür modeli gerçek kömür veya tüm doğal gaz bileşimini aynen temsil etmez.",
    ),
    s025(
      "Isıl değer ile verim farklıdır",
      "Isıl değer, belirli ürün ve hâl koşullarında yakıt kütlesi başına açığa çıkan enerjidir; MJ/kg ile verilebilir. Verim η=yararlı enerji/giren enerji oranıdır; aynı yakıt farklı cihazlarda farklı yararlı çıktı verebilir.",
      "Alt ve üst ısıl değer suyun buhar veya sıvı kabulüyle farklılaşır. Sayıları ortak temelde karşılaştır; yüksek enerji yoğunluğu otomatik yüksek aygıt verimi demek değildir. Modelin sabit yaklaşık alt ısıl değerleri açıkça verilen öğretim verileridir.",
    ),
    s025(
      "Aynı hizmet için karşılaştır",
      "İki yakıtı karşılaştırırken aynı yararlı enerji hedefini ve verim varsayımını kullanmak gerekir. Gerekli yakıt m=Eyararlı/(η·ısıl değer) bağıntısıyla bulunur; eşit kütle yakmak eşit hizmet sağlamak değildir.",
      "CO₂ de o gereken yakıtın karbon hesabından çıkarılır. Kullanım noktası CO₂’si bir ölçüttür; metan kaçağı, üretim, nakliye ve arazi değişimi eklenmeden bütün yaşam döngüsü sonucu ilan edilmez. Model bu sınırı sonuçla birlikte gösterir.",
    ),
    s025(
      "Sera etkisinin fiziksel yönü",
      "Yeryüzü Güneş’ten enerji alır ve uzun dalga kızılötesi ışınım yayar. CO₂ ve CH₄ gibi sera gazları bu kızılötesi ışınımın bir bölümünü soğurup yeniden yayarak enerji dengesini etkiler.",
      "Küresel ısınmayı yalnız zararlı Güneş ışınlarının tutulması diye açıklamak yönü karıştırır. İnsan kaynaklı sera gazı artışı doğal sera etkisini güçlendirir. Su buharı önemli bir sera gazıdır; uzun süreli iklim zorlaması ve geri besleme rolleri ayrıca ayrılır.",
    ),
    s025(
      "Hava kirliliği ile iklim etkisi",
      "CO eksik yanmayla oluşabilen zehirli gaz; partiküller ve kükürt/azot oksitleri hava kalitesi açısından önemli kirleticilerdir. SO₂ ve NOx dönüşümleri kuvvetli asitli yağışa katkı verir; CO₂’nin doğal zayıf asitliği aynı açıklama değildir.",
      "CO₂ iklim etkisinde, CO ise hemoglobine bağlanma gibi farklı bir sağlık mekanizmasında öne çıkar. NO₂ ile N₂O aynı formül değildir. Emisyonu azaltmak için enerji verimliliği, kaynak seçimi ve uygun arıtma teknolojileri ayrı hedefleri destekleyebilir.",
    ),
    s025(
      "Sistem sınırı ve yaşam döngüsü",
      "Bir santralin işletmede yakıt yakmaması, panellerin/türbinlerin üretim ve ömür sonu etkisinin sıfır olduğu anlamına gelmez. Karşılaştırmanın hangi aşamaları içerdiği, hangi işlev için yapıldığı ve hangi etkiyi ölçtüğü yazılmalıdır.",
      "Aynı kWh elektrik için kullanım CO₂’si, yaşam döngüsü sera gazı, su kullanımı, arazi ve atık ayrı ölçütlerdir. Bir ölçütte iyi olan seçenek bütün ölçütlerde otomatik üstün değildir; miktar iddiaları verili ve tarihli kaynak gerektirir.",
    ),
    s025(
      "Güneş: ısı ve elektrik",
      "Güneş ışınımı termal kolektörle su ısıtmada veya fotovoltaik hücreyle elektrikte kullanılabilir. Güneş’in enerjisi çekirdekteki füzyondan kaynaklanır; bir fotovoltaik panelin kendisi fisyon reaktörü değildir.",
      "Güneşli süre, ışınım, panel alanı, yönelim ve verim üretimi etkiler. Basit hesap E=ışınım gücü/alan×alan×süre×η biçiminde kurulabilir. Gece ve değişen hava için depolama/şebeke planı gerekir; Güneş’in büyük kaynağı her yerde her an aynı çıkış demek değildir.",
    ),
    s025(
      "Rüzgârın dönüşümü",
      "Atmosferin Güneş’le eşit olmayan ısınması basınç farkları ve rüzgâra katkı verir. Türbin, hareketli havanın kinetik enerjisinin bir bölümünü mekanik dönmeye, jeneratör elektriğe dönüştürür.",
      "Yer seçimi ve rüzgâr örüntüsü üretimi etkiler; değişkenlik depolama ve şebeke esnekliği gerektirebilir. Kuş habitatları, ses ve malzeme etkileri planlamaya katılır. Yenilenebilir olmak bütün yerel etkilerin veya yatırım maliyetinin sıfır olması değildir.",
    ),
    s025(
      "Hidroelektrik ve diğer akışlar",
      "Hidroelektrikte yüksekteki suyun potansiyel enerjisi akışa, türbine ve elektriğe aktarılır. Su döngüsünü Güneş destekler; barajın üretimi debi ve düşü yüksekliği gibi değişkenlere bağlıdır.",
      "Barajlar ekosistem ve yerleşim etkileri taşıyabilir; yağış değişkenliği önemlidir. Gelgit enerjisi başlıca Ay/Güneş kütle çekimiyle ilişkilidir. Bu ve jeotermal/nükleer örnekler, Dünya’daki bütün enerji türleri yalnız Güneş kökenlidir genellemesini sınırlar.",
    ),
    s025(
      "Jeotermal ısı",
      "Jeotermal enerji yer içinin ısısından yararlanır; yerkabuğundaki sıcak kaya ve akışkanlar ısıtma veya uygun sıcaklıkta elektrik üretimi sağlar. Yer altı suyunun Dünya’nın çekirdeğine inmesi gerekmez.",
      "Kaynağın yenilenebilir sayılan kullanımında çekim hızı, akışkan ve ısı dengesi, reenjeksiyon gibi işletme koşulları önemlidir. Yerel gaz salımı, su kimyası ve arazi etkileri incelenir. Her sıcak su kaynağı aynı elektrik üretim potansiyelini taşımaz.",
    ),
    s025(
      "Biyokütle ve biyoyakıtlar",
      "Bitkisel ve hayvansal organik maddeler/atıklar biyokütle kaynağı olabilir. Biyoetanol, yağ kökenli biyodizel ve anaerobik süreçle oluşan metan içeren biyogaz farklı yakıt örnekleridir; biyogaz saf metan değildir.",
      "Yenilenebilirlik üretim hızına ve kaynağın yerine konmasına bağlıdır; tarım arazisi, su, gübre, taşıma ve metan kaçağı sonucu etkiler. Biyoyakıt yanması CO₂ üretebilir; biyojenik karbonun yeniden bağlanması bilanço ve zaman ölçeğiyle değerlendirilir.",
    ),
    s025(
      "Hidrojen bir enerji taşıyıcısı",
      "H₂, O₂ ile tepkimesinde su oluşturup kimyasal enerji aktarabilir. Kullanım noktasında saf H₂/O₂ yakıt pilinin karbon girdisi olmadığı için doğrudan CO₂ ürünü de yoktur.",
      "Hidrojenin su veya doğal gazdan üretimi enerji ve madde girdisi gerektirir. Üretim elektriği fosil kaynaklıysa kullanımda CO₂ olmaması bütün zinciri sıfır karbon yapmaz. H₂’nin kütle başına yüksek enerjisi, hacimsel depolama zorluklarını ortadan kaldırmaz.",
    ),
    s025(
      "Elektroliz ve yakıt pili",
      "Su elektrolizi dış elektrik enerjisiyle 2 H₂O→2 H₂+O₂ net dönüşümünü yürütür. Hidroliz ise kimyasal bağların suyla parçalanmasına ilişkin başka kavramdır; suyu elektrikle ayırmanın adı elektrolizdir.",
      "Yakıt pilinde H₂ ve O₂’nin kontrollü elektrokimyasal dönüşümü elektrik ve ısı aktarır, su oluşur. Aynı maddeleri geri elde etmek enerji maliyetini silmez; elektroliz ile yakıt pili verimlerinin birlikte hesaplanması çevrimin net dönüşünü verir.",
    ),
    s025(
      "Depolama ve çevrim verimi",
      "Elektroliz verimi η₁, yakıt pili verimi η₂ aynı enerji temelinde verilirse ideal iki aşamalı geri dönüş η₁η₂’dir. Yüzdeleri toplamak veya ikisinin ortalamasını almak doğru çevrim verimini vermez.",
      "Sıkıştırılmış gaz, çok düşük sıcaklıkta sıvı ve bazı katı taşıyıcılar farklı depolama yollarıdır; tek bir evrensel en iyi yol yoktur. Sıkıştırma, taşıma ve yardımcı cihaz tüketimleri bu iki aşamalı modelin dışında kalırsa gerçek zincirde ek kayıp beklenir.",
    ),
    s025(
      "Borhidrürden hidrojen hesabı",
      "Basitleştirilmiş okul denkliği NaBH₄+2 H₂O→NaBO₂+4 H₂’dir. Dört H atomu borhidrürden, dört H atomu iki sudan gelir; toplam sekiz H atomu dört H₂ oluşturur.",
      "Bu stokiyometri bor madeninin veya suyun sınırsız bedava yakıt olduğunu söylemez. Metaborattan yeniden borhidrür üretimi enerji ve ek işlemler gerektirir. Bir taşıyıcının yeniden üretilebilir olması, çevrimin enerji üreten kapalı sonsuz döngü olması değildir.",
    ),
    s025(
      "Nükleer fisyon ve füzyon",
      "Fisyon ağır çekirdeğin daha küçük çekirdeklere ayrılması, füzyon hafif çekirdeklerin birleşmesidir. Kimyasal yanmada atom çekirdekleri değişmezken nükleer süreçte çekirdek türleri değişebilir; enerji ölçeği farklıdır.",
      "Ticari nükleer elektrik üretimi fisyon ısısından yararlanır; Güneş’in ana enerji süreci füzyondur. Sık örnek uranyum yakıtıdır ve stok yenilenemezdir. Birim yakıt kütlesinden yüksek enerji almak, ısının elektriğe dönüşümünde yüzde yüz verim anlamına gelmez.",
    ),
    s025(
      "Nükleer santralde enerji zinciri",
      "Fisyon ısısı uygun soğutucu ve ısı değişim sistemleriyle buhar/türbin/jeneratör zincirini besler. Kontrollü zincir tepkimesi ve nötron soğurma, ısının uzaklaştırılması ve koruyucu sınırlar birbirinden ayrı güvenlik işlevleridir.",
      "İşletmede fosil yanması gibi CO₂ üretmemesi düşük karbon niteliğini destekler; madencilik, inşaat ve yakıt döngüsü dışarıda bırakılmaz. Kullanılmış yakıtın radyoaktif atıkları özel yönetim ister; soğutma suyu ve sıcak hava gibi koşullar işletmeyi etkileyebilir.",
    ),
    s025(
      "Seçenekleri bir ölçüte indirme",
      "Enerji seçimi kaynak yenilenmesi, güvenilir arz, depolama, maliyet, yerel etki, sera gazı ve atık yönetimi gibi ölçütler gerektirir. Aynı enerji hedefi ve açık varsayımlarla hazırlanmış tablo, yalnız iyi/kötü sınıf etiketinden daha açıklayıcıdır.",
      "Yerli rüzgâr veya güneş akışı yakıt ithalatını azaltmayı destekleyebilir; cihaz ve malzeme tedariki yine dış bağlantı taşıyabilir. Her ülke ve yıl için koşulsuz bağımsızlık veya en ucuzluk iddiası yerine verilen sistem verilerini kullan.",
    ),
    s025(
      "Bilimsel gelişmeyi kanıtla değerlendirmek",
      "Yeni enerji malzemeleri, katalizörler, bataryalar ve verimli dönüşüm sistemleri araştırma alanlarıdır. Bir laboratuvar sonucunun örnek boyutu, koşulu, ölçütü ve üretim ölçeği açıklanmadan bütün uygulamalarda aynı başarı beklenmez.",
      "Tarihsiz ülke payları, fiyatlar veya mevzuat sınırları değişmez fizik yasası değildir. Bu ünitede hesaplar verilen öğretim verileriyle yapılır; ölçüm, varsayım ve geleceğe dönük hedef ayrılır. Tasarımın başarısı yalnız tek parlak sayı yerine bütün sistem bilançosunda sınanır.",
    ),
  ],
  examples: [
    e025(
      "Aynı yararlı enerjiye göre metan",
      "Bir öğretim modelinde 40 MJ yararlı enerji hedefi, %50 verimli metan yakıcıyla karşılanıyor. Metanın alt ısıl değeri 50 MJ/kg, M(CH₄)=16 ve M(CO₂)=44 g/mol. Yakıt ve kullanım CO₂ kütlesi nedir?",
      "Önce gerekli yakıt enerjisini, sonra metan ve karbon molünü bul.",
      [
        "Giren enerji 40/0,50=80 MJ; metan kütlesi 80/50=1,60 kg’dır.",
        "1600/16=100 mol metan vardır; CH₄:CO₂ oranı 1:1’den 100 mol CO₂ oluşur.",
        "CO₂ kütlesi 100×44=4400 g=4,40 kg; çevreye giden enerji 80−40=40 MJ’dir.",
      ],
      "1,60 kg metan; 4,40 kg CO₂",
      "Yakıtı değiştirecek bir karşılaştırma yine 40 MJ aynı yararlı hedefe göre yapılmalıdır.",
      "Verimi yakıt enerjisine çarpmak yerine hedef enerjiyi çarpıp eksik yakıt bulmak.",
    ),
    e025(
      "Hidrojenin iki aşamalı geri dönüşü",
      "80 MJ elektrik, %75 verimli elektroliz ve %55 verimli yakıt pili dizisinden geçiriliyor. İki aşama aynı enerji temelinde ve ek depolama kaybı yok. Geri elektrik nedir?",
      "Her verimi kendi aşamasının girişine sırayla uygula.",
      [
        "Elektroliz sonrası H₂’nin kimyasal enerji karşılığı 80×0,75=60 MJ’dir.",
        "Yakıt pili elektriği 60×0,55=33 MJ olur.",
        "Geri dönüş 33/80=%41,25; toplam çevreye aktarılan/kullanılamayan enerji 47 MJ’dir.",
      ],
      "33 MJ elektrik; %41,25 geri dönüş",
      "İlk kayıp 20 MJ, ikinci kayıp 27 MJ; 33+20+27=80 MJ kapanır.",
      "İki verimi toplayarak %130 veya ortalayarak %65 almak.",
    ),
    e025(
      "Fotovoltaik alan hesabı",
      "3,0 m² panele 5 saat boyunca ortalama 0,80 kW/m² ışınım geliyor. Panelin elektrik verimi %20, diğer kayıplar yok. Elektrik kaç kWh olur?",
      "Gelen toplam gücü alana, enerjiyi süreye ve sonra verime bağla.",
      [
        "Gelen güç 0,80×3,0=2,40 kW’dır.",
        "Işınım enerjisi 2,40×5=12,0 kWh olur.",
        "Elektrik 12,0×0,20=2,40 kWh, yani 8,64 MJ’dir.",
      ],
      "2,40 kWh",
      "Çıktı gelen 12,0 kWh’den küçüktür; kW güç, kWh enerjidir.",
      "Panel alanını hesaba katmadan yalnız süreyle ışınımı çarpmak.",
    ),
    e025(
      "Borhidrürde H atomlarını saymak",
      "NaBH₄+2 H₂O→NaBO₂+4 H₂ basitleştirilmiş denkliğinde 0,45 mol NaBH₄ yeterli suyla tamamen dönüşüyor. H₂ ve tüketilen su kaç moldür?",
      "Bir borhidrür için 4 H₂ ve 2 su katsayılarını ayrı uygula.",
      [
        "0,45 mol NaBH₄,0,90 mol H₂O tüketir.",
        "H₂ oluşumu 4×0,45=1,80 moldür.",
        "H atomu miktarı solda borhidrürden 1,80, sudan 1,80 mol; sağda 3,60 mol H atomudur.",
      ],
      "1,80 mol H₂; 0,90 mol H₂O",
      "B ve Na her tarafta 0,45 mol kalır; bu bilanço geri üretimin enerji maliyetini hesaplamaz.",
      "H₂’nin tamamını yalnız NaBH₄’ün dört H atomundan türetip yarım ürün bulmak.",
    ),
    e025(
      "Nükleer ısı ve elektrik",
      "Fisyon kaynağından elde edilen 1000 MJ ısı, %35 verimli ısı-elektrik dönüşümüne giriyor. Elektrik ve diğer enerji aktarımı nedir?",
      "Nükleer enerji yoğunluğunu dönüşüm verimiyle karıştırmadan oranı uygula.",
      [
        "Yararlı elektrik 1000×0,35=350 MJ olur.",
        "Diğer enerji aktarımı 1000−350=650 MJ’dir.",
        "350 MJ elektrik, yaklaşık 350/3,6=97,2 kWh’tir; toplam enerji 1000 MJ kalır.",
      ],
      "350 MJ elektrik; 650 MJ diğer aktarım",
      "Yakıtın küçük kütlede çok ısı vermesi, türbin/jeneratör zincirini %100 verimli yapmaz.",
      "Nükleer süreç olduğu için bütün 1000 MJ’nin elektriğe dönüştüğünü varsaymak.",
    ),
    e025(
      "Damıtma kulesinde doğru sıralama",
      "A, B, C fraksiyonlarının verilen kaynama aralığı temsil değerleri 65,180,320 °C’dir. Kule altta sıcak, yukarıda soğuktur. Daha üstten ayrılma eğilimi hangi sıradadır?",
      "Uçuculuğu kaynama sıcaklığıyla ters yönde karşılaştır.",
      [
        "A en düşük kaynama değerine sahiptir ve daha uçucudur.",
        "B ara, C en yüksek değerdedir; C daha sıcak alt kesimde yoğunlaşmaya eğilimlidir.",
        "Üstten alta eğilim A–B–C olur; bu fiziksel ayırmadır.",
      ],
      "Üstten alta A–B–C",
      "Gerçek fraksiyonlar birer kaynama aralığı taşır; verilen sayılar bu örneğin temsil verileridir.",
      "En yüksek kaynama noktasını en üstte çıkar diye düşünmek.",
    ),
  ],
  recall: [
    {
      prompt: "Enerji yoğunluğu ile verim aynı mıdır?",
      answer:
        "Hayır. Enerji yoğunluğu birim yakıt başına enerji; verim yararlı çıktı/girdi oranıdır.",
    },
    {
      prompt: "Hidrojenin kullanım CO₂’si sıfırsa yaşam döngüsü de sıfır mı?",
      answer:
        "Hayır; üretim, elektrik kaynağı, taşıma ve depolama aşamaları ayrıca değerlendirilir.",
    },
    {
      prompt: "Sera gazları hangi ışınımla temel olarak etkileşir?",
      answer:
        "Yeryüzünün yaydığı uzun dalga kızılötesi ışınımı soğurup yeniden yayarlar.",
    },
    {
      prompt: "Alternatif kaynak yenilenebilir olmak zorunda mı?",
      answer:
        "Hayır; nükleer fosile alternatif olabilir ama uranyum stoklu ve yenilenemezdir.",
    },
    {
      prompt: "İki ardışık dönüşümün verimi nasıl bulunur?",
      answer:
        "Aynı enerji temelindeki iki verim kesir olarak çarpılır; ek süreç kayıpları ayrıca eklenir.",
    },
    {
      prompt: "NaBO₂’nin yeniden NaBH₄ yapılabilmesi neyi kanıtlamaz?",
      answer:
        "Enerji ve ek girdi gerektirmeyen sonsuz enerji çevrimini kanıtlamaz.",
    },
  ],
  items: [],
};
energyPack025.items = [
  q025(
    "Kömür, petrol ve doğal gazın insan kullanım zaman ölçeğinde yenilenemez sayılmasının temel nedeni hangisidir?",
    "Jeolojik stok oluşumu ile tüketim süresi aynı ölçekte değildir.",
    "Doğal oluşum hızını tüketim hızıyla karşılaştır.",
    [
      "Bu yakıtlar organik maddelerin jeolojik uzun dönüşümlerinden oluşur.",
      "Kullanılan stok aynı kısa insan zamanında geri oluşmaz.",
      "Bu nedenle kaynaklar insan ölçeğinde yenilenemez sınıfındadır.",
    ],
    [
      [
        "Oluşmaları tüketimlerine göre çok uzun jeolojik süre gerektirir",
        "Yenilenme ölçütünü doğru zaman ölçeğine bağlar.",
      ],
      [
        "Hiçbiri karbon içermez",
        "Fosil yakıtların karbon içeriğini yok sayar.",
      ],
      [
        "Yandıklarında enerji yok olur",
        "Enerjinin dönüşüm ve korunumu ilkesini bozar.",
      ],
      ["Yalnız sıvı hâlde bulunurlar", "Katı kömür ile gaz doğal gazı dışlar."],
      [
        "Doğal olan her madde yenilenemezdir",
        "Güneş/rüzgâr ve yenilenebilen biyokütle akışlarını haksızca dışlar.",
      ],
    ],
    "Yenilenemezliği doğal veya yapay etiketiyle belirlemek.",
    "Sınıflama kaynağın yerine konma hızını içerir; yakıtın depoda bulunması yenilenme değildir.",
  ),
  q025(
    "Bir damıtma kulesinde alt bölüm sıcak, üst bölüm soğuktur. Verilen A, B, C fraksiyonlarının kaynama temsil değerleri 80,220,360 °C’dir. Üstten alta beklenen sıra hangisidir?",
    "Daha uçucu düşük kaynama aralıklı fraksiyon üst kesimlere ulaşabilir.",
    "Kaynama değerlerini küçükten büyüğe sırala.",
    [
      "A80 °C ile en uçucu fraksiyondur.",
      "B220 °C ara, C360 °C en yüksek değerdedir.",
      "Üstten alta A–B–C eğilimi bulunur.",
    ],
    [
      [
        "A–B–C",
        "Soğuk üstte düşük, sıcak altta yüksek kaynama kesimini yerleştirir.",
      ],
      ["C–B–A", "Kaynama ile kule yüksekliğini aynı yönde artırır."],
      ["B–A–C", "Ara fraksiyonu en üstte, daha uçucuyu altında bırakır."],
      ["A–C–B", "B ile C’nin kaynama sırasını ters çevirir."],
      [
        "Üçü de tek saf madde olduğundan ayrılamaz",
        "Verilen farklı fraksiyonları ve kaynama verisini yok sayar.",
      ],
    ],
    "Damıtmayı moleküllerin karbon bağlarını kıran işlem sanmak.",
    "Bu fiziksel ayırma örneği gerçek fraksiyonların kaynama aralığı taşımasını basitleştirir.",
  ),
  q025(
    "8,0 g saf CH₄ yeterli O₂ ile tamamen yanıyor. M(CH₄)=16 ve M(CO₂)=44 g/mol ise CO₂ kütlesi kaç gramdır?",
    "CH₄+2 O₂→CO₂+2 H₂O denkliğinde CH₄:CO₂=1:1’dir.",
    "Yakıtı mole, karbon ürününü tekrar kütleye çevir.",
    [
      "8,0/16=0,50 mol metan bulunur.",
      "Her metan bir C taşıdığı için 0,50 mol CO₂ oluşur.",
      "m(CO₂)=0,50×44=22,0 g olur.",
    ],
    [
      ["22,0", "0,50 mol CO₂’yi 44 g/mol ile çarpar."],
      ["8,0", "Eşit mol oranını eşit kütle sanır."],
      ["11,0", "1:1 oranını yanlışlıkla yarıya indirir."],
      ["44,0", "Yakıtı 0,50 yerine 1 mol alır."],
      [
        "16,0",
        "CO₂’nin 44 yerine O₂’nin 32 g/mol değerini kullanır: 0,50×32=16,0 g.",
      ],
    ],
    "Yanma ürününe dışarıdan katılan oksijenin kütlesini hesaptan silmek.",
    "CO₂ kütlesi yakıt kütlesinden büyük olabilir; O atomları dış O₂’den gelir.",
  ),
  q025(
    "0,30 mol etanol C₂H₆O yeterli O₂ ile tam yanıyor. Gerekli O₂ kaç moldür?",
    "Etanolün kendi O’su dış oksijen gereksinimine katılmadan önce sayılır.",
    "C ve H ürünlerinden toplam O açığını bul.",
    [
      "Bir etanol 2 CO₂ ve 3 H₂O verir; ürünlerde 7O atomu vardır.",
      "Bir O etanolden gelir; dışarıdan 6O atomu yani 3 O₂ gerekir.",
      "0,30×3=0,90 mol O₂ tüketilir.",
    ],
    [
      ["0,90", "Etanol başına 3 O₂ oranını korur."],
      ["1,05", "Ürünün yedi O’sunu tamamen dış O₂’den sayar."],
      ["0,60", "Yalnız karbon dioksit için gereken oksijeni sayar."],
      ["0,45", "Üç O₂ katsayısını gereksiz yarılar."],
      ["1,80", "O atomu molünü O₂ molekülü molü sanır."],
    ],
    "Oksijenli yakıtın bünyesindeki O atomunu yok kabul etmek.",
    "C₂H₆O+3 O₂→2 CO₂+3 H₂O atom ve yük bakımından dengelidir.",
  ),
  q025(
    "Bir dönüştürücü 160 MJ enerji alıp 40 MJ yararlı enerji veriyor. Verimi ve diğer enerji aktarımı hangisidir?",
    "Verim yararlı/giren; diğer aktarım giren−yararlıdır.",
    "Oranı ve enerji farkını ayrı hesapla.",
    [
      "η=40/160=0,25, yani %25’tir.",
      "Diğer enerji 160−40=120 MJ’dir.",
      "40+120=160 MJ ile toplam korunur; 120 MJ yok olmamıştır.",
    ],
    [
      ["%25; 120 MJ", "Oran ve enerji farkını birlikte doğru verir."],
      ["%75; 120 MJ", "Diğer enerji payını yararlı verim sanır."],
      ["%25; 40 MJ", "Geri kalan enerjiyi yararlı enerjiyle eşitler."],
      ["%400; 120 MJ", "Giren/yararlı oranını verim gibi yazar."],
      [
        "%25; enerji korunmaz",
        "Çevreye aktarılan kısmı enerji yok olması sayar.",
      ],
    ],
    "Yararlı kullanılmayan enerjinin fiziksel olarak yok olduğunu düşünmek.",
    "Verim kesir olarak 0,25’tir; karşılaştırılan iki enerji aynı birimdedir.",
  ),
  q025(
    "Bir öğretim modelinde 30 MJ yararlı enerji için %40 verimli yakıcı kullanılıyor. Yakıtın alt ısıl değeri 50 MJ/kg ise gereken yakıt kaç kilogramdır?",
    "Eyararlı=η·m·ısıl değer bağıntısı kullanılır.",
    "Önce giren enerjiyi, sonra yakıt kütlesini bul.",
    [
      "Giren enerji 30/0,40=75 MJ’dir.",
      "Her kilogram 50 MJ sağladığından m=75/50 olur.",
      "Gerekli yakıt 1,50 kg’dır.",
    ],
    [
      ["1,50", "Hedefi verime bölüp ısıl değere böler."],
      ["0,24", "30’u önce %40 ile çarparak gerekli girdiyi küçültür."],
      ["0,60", "Verimi atlayıp 30/50 hesaplar."],
      ["3,75", "Isıl değeri yanlış 20 MJ/kg gibi kullanır."],
      ["75,0", "Giren MJ değerini kilogram sanır."],
    ],
    "Yararlı hedefi verime bölmek yerine çarpmak.",
    "1,50×50×0,40=30 MJ hedefi geri verir.",
  ),
  q025(
    "Bir aygıt 2,0 kW güçle 3,0 saat çalışıyor. Harcadığı enerji kWh ve MJ olarak hangisidir? 1 kWh=3,6 MJ.",
    "Enerji güç×süre ile bulunur; kW ve kWh farklı niceliklerdir.",
    "Önce kWh’yi, sonra verilen dönüşümü uygula.",
    [
      "E=2,0×3,0=6,0 kWh’tir.",
      "6,0×3,6=21,6 MJ bulunur.",
      "Güç 2,0 kW kalırken enerji çalışma süresiyle artmıştır.",
    ],
    [
      ["6,0 kWh; 21,6 MJ", "Güç-süre çarpımını doğru dönüştürür."],
      ["6,0 kW; 21,6 MJ", "Enerjiye güç birimi yazar."],
      ["2,0 kWh; 7,2 MJ", "Üç saatlik süreyi hesaba katmaz."],
      ["0,667 kWh; 2,4 MJ", "Gücü süreyle çarpmak yerine böler."],
      ["21,6 kWh; 6,0 MJ", "Birim dönüşümünü ve değerleri ters yerleştirir."],
    ],
    "Aygıtın güç etiketini doğrudan tüketilen enerji olarak okumak.",
    "6,0 kWh elektrik enerjidir; bu kart aygıtın yararlı çıktı verimini ayrıca vermemiştir.",
  ),
  q025(
    "Sera gazlarının enerji dengesine etkisinin temel fiziksel açıklaması hangisidir?",
    "Sera gazları yeryüzünden yayılan uzun dalga kızılötesiyle etkileşir.",
    "Gelen Güneş ışınımı ile giden yer ışınımını ayır.",
    [
      "Yeryüzü aldığı enerjinin bir bölümünü kızılötesi ışınımla yayar.",
      "CO₂ gibi gazlar uygun kızılötesi dalga boylarını soğurup yeniden yayar.",
      "Bu etkileşim atmosfer-yüzey enerji dengesini değiştirir.",
    ],
    [
      [
        "Yeryüzünün yaydığı kızılötesini soğurup yeniden yaymaları",
        "Sera etkisinin temel ışınım yönünü doğru açıklar.",
      ],
      [
        "Yalnız Güneş’in zararlı UV’sini tutmaları",
        "Sera etkisini UV korunmasıyla karıştırır.",
      ],
      [
        "Oksijeni karbona çevirmeleri",
        "Element dönüşümü gibi olmayan bir mekanizma kurar.",
      ],
      [
        "Güneş’in füzyonunu Dünya’da başlatmaları",
        "Atmosfer etkisine nükleer süreç ekler.",
      ],
      [
        "Enerjiyi bütünüyle yok etmeleri",
        "Enerjinin korunumu yerine yok olmayı ileri sürer.",
      ],
    ],
    "Sera etkisini ozonun UV soğurmasıyla aynı mekanizma saymak.",
    "Burada anahtar giden uzun dalga ışınımdır; atmosferin farklı gazlarının başka etkileri ayrıca olabilir.",
  ),
  q025(
    "Fosil yakıtlarla ilişkili kuvvetli asitli yağışın azaltılmasında hangi gaz grubunun uygun kontrolü doğrudan önemlidir?",
    "SO₂/SOx ve NOx atmosferde asit oluşturan dönüşümlere katılır.",
    "Doğal zayıf karbonik asitliği kuvvetli asit kirleticilerinden ayır.",
    [
      "Kükürt oksitleri sülfürik asit oluşumuna katkı verebilir.",
      "Azot oksitleri nitrik asit oluşumuna katkı verebilir.",
      "Bu yüzden SOx ve NOx kontrolü bu hedefle doğrudan ilişkilidir.",
    ],
    [
      ["SOx ve NOx", "Kuvvetli asit oluşturan öncü gazları seçer."],
      ["Yalnız He ve Ne", "Soy gazları bu asit oluşumunun öncüsü sanır."],
      [
        "Yalnız O₂ ve N₂",
        "Olağan hava bileşenlerini kirletici ürünlerle aynılaştırır.",
      ],
      ["Yalnız H₂ ve He", "Asit yağışı öncülerini içermez."],
      [
        "CO₂’nin bütün doğal etkisini tek başına asit yağışı diye adlandırmak",
        "Doğal zayıf asitlik ile kirletici kuvvetli asitli yağışı ayırmaz.",
      ],
    ],
    "CO₂, SO₂ veNO₂’yi mekanizma farkını silerek tek tür kirletici kabul etmek.",
    "İklim için CO₂’yi azaltma hedefi de önemlidir; fakat sorunun asitli yağış ölçütü farklıdır.",
  ),
  q025(
    "CO ile CO₂ için verilen ayrımlardan hangisi doğrudur?",
    "Farklı formüller farklı sağlık ve çevre mekanizmaları gösterebilir.",
    "CO’nun eksik yanma/hemoglobin etkisini CO₂’nin iklim etkisinden ayır.",
    [
      "CO eksik yanma ürünü olabilir ve hemoglobine bağlanarak O₂ taşınmasını bozar.",
      "CO₂ tam yanmada oluşabilir ve atmosferde sera etkisine katkı verir.",
      "Bu nedenle ikisini aynı gaz ve tek mekanizma saymak uygun değildir.",
    ],
    [
      [
        "CO zehirlenme mekanizmasıyla; CO₂ sera etkisiyle öne çıkar",
        "İki gazı farklı formül ve mekanizmalarıyla açıklar.",
      ],
      [
        "İkisi aynı moleküldür; ad farkıdır",
        "O atomu sayısındaki farkı siler.",
      ],
      [
        "CO₂ yalnız eksik yanmada oluşur",
        "Tam yanmanın temel karbon ürününü yanlış sınırlar.",
      ],
      [
        "CO hemoglobine O₂ gibi yararlı yük taşır",
        "CO’nun oksijen taşımasını bozma etkisini ters çevirir.",
      ],
      ["CO₂ karbon içermez", "Formüldeki C atomunu yok sayar."],
    ],
    "Benzer adları aynı maddenin iki yazımı sanmak.",
    "Bir O farkı bağlanma ve kimyasal davranış farkını kaldırmaz; gazlar birbiri yerine yorumlanmaz.",
  ),
  q025(
    "2,0 m² panele 4,0 saat boyunca 1,0 kW/m² ortalama ışınım geliyor. Elektrik verimi %15 ve diğer kayıplar yoksa kaç kWh elektrik elde edilir?",
    "Işınım gücü/alan×alan×süre gelen enerjidir; verim sonra uygulanır.",
    "Toplam gelen 8 kWh’nin %15’ini al.",
    [
      "Gelen güç 1,0×2,0=2,0 kW’dır.",
      "Dört saatte gelen enerji 2,0×4,0=8,0 kWh olur.",
      "Elektrik 8,0×0,15=1,20 kWh’tir.",
    ],
    [
      ["1,20", "Alan, süre ve verimi sırayla uygular."],
      ["8,00", "Elektrik dönüşüm verimini uygulamaz."],
      ["0,60", "Panel alanını bir metrekare kabul eder."],
      ["0,30", "Süreyi hesaba katmaz."],
      ["12,0", "Yüzde 15’i yanlış katsayıyla kullanıp gelen enerjiyi aşar."],
    ],
    "Işınım gücü yoğunluğunu panelin toplam gücü sanmak.",
    "1,20 kWh<8,0 kWh; kalan enerji elektrik çıktısına dönüşmemiştir.",
  ),
  q025(
    "Rüzgâr türbini ve jeneratörün temel enerji zinciri hangisidir?",
    "Rüzgârın kinetik enerjisi dönme hareketi üzerinden elektriğe aktarılır.",
    "Havanın hareketi, türbin ve jeneratör rollerini sırala.",
    [
      "Hareketli hava kinetik enerji taşır.",
      "Türbin bu enerjinin bir bölümünü mekanik dönmeye aktarır.",
      "Jeneratör mekanik enerjinin bir bölümünü elektrik enerjisine çevirir.",
    ],
    [
      [
        "Hava kinetiği→mekanik dönme→elektrik",
        "Türbin ve jeneratör rollerini doğru sıraya koyar.",
      ],
      [
        "Uranyum fisyonu→güneş pili→elektrik",
        "Rüzgâr sistemine ilgisiz kaynak ve aygıt ekler.",
      ],
      ["Elektrik→metan üretimi→rüzgâr", "Kaynak ve çıktı yönünü değiştirir."],
      [
        "Hava→yeni atom çekirdeği→elektrik",
        "Kimyasal/fiziksel dönüşüme nükleer element değişimi ekler.",
      ],
      [
        "Rüzgâr enerjisi bütünüyle elektriğe kayıpsız geçer",
        "Kısmi yakalama ve dönüşüm verimini atlar.",
      ],
    ],
    "Yenilenebilir akıştan yararlanan aygıtı otomatik %100 verimli saymak.",
    "Üretim rüzgâr koşullarına bağlıdır; akış yenilenebilir olsa da yerel etkiler ayrıca değerlendirilir.",
  ),
  q025(
    "Jeotermal enerji hakkında doğru açıklama hangisidir?",
    "Jeotermal, yer içinin ısısından yararlanmadır.",
    "Yer kabuğundaki sıcak kaya/akışkan ile çekirdeğe inme iddiasını ayır.",
    [
      "Kaynak yer içindeki ısıdır.",
      "Uygun sıcak kaya ve akışkanlar ısıtma veya elektrik üretiminde kullanılabilir.",
      "Yer altı suyunun Dünya çekirdeğine inmesi gerekmez.",
    ],
    [
      [
        "Sıcak kaya ve akışkanlarla yer içi ısısından yararlanılır",
        "Kaynağı ve erişilebilir sistemi doğru tanımlar.",
      ],
      [
        "Su mutlaka Dünya’nın çekirdeğine inmelidir",
        "Erişilen jeotermal sistemi fiziksel olmayan derinliğe taşır.",
      ],
      [
        "Kaynağı yalnız Güneş’teki fotovoltaik hücrelerdir",
        "Jeotermali güneş paneliyle karıştırır.",
      ],
      [
        "Her sıcak su aynı elektrik verimini verir",
        "Kaynak sıcaklığı ve sistem farklarını yok sayar.",
      ],
      [
        "Jeotermal kullanımın hiçbir yerel etkisi olamaz",
        "Akışkan kimyası ve işletme etkilerini koşulsuz siler.",
      ],
    ],
    "Bir kaynak yenilenebilir listesinde diye yönetim hızını ve çevresel koşullarını yok saymak.",
    "Sürdürülebilir çekim ve reenjeksiyon gibi işletme bilgileri kaynak bilançosunda önemlidir.",
  ),
  q025(
    "Biyoetanolün sürdürülebilirliği değerlendirilirken hangi ifade doğrudur?",
    "Biyolojik kaynaklı yakıtın yanması CO₂ verebilir; yaşam döngüsü ve yenilenme ayrıca incelenir.",
    "Yanma denklemiyle biyokütlenin yeniden oluşma hesabını ayrı tut.",
    [
      "Etanol karbon içerdiğinden tam yanmada CO₂ oluşturur.",
      "Biyokütle yeniden büyürken karbon bağlayabilir; üretim, arazi ve zaman ölçeği önemlidir.",
      "Bu nedenle yalnız biyolojik köken sıfır yaşam döngüsü etkisini garanti etmez.",
    ],
    [
      [
        "Yenilenme ve tüm yaşam döngüsü koşullarıyla değerlendirilmelidir",
        "Kullanım CO₂’siyle kaynak döngüsünü birlikte sınırlar.",
      ],
      [
        "Biyoetanol karbon içermediği için CO₂ oluşturmaz",
        "C₂H₆O formülündeki iki C’yi siler.",
      ],
      [
        "Her biyokütle her yerde sınırsız hızla büyür",
        "Kaynağın yenilenme hızını sınırsız kabul eder.",
      ],
      [
        "Tarım ve taşıma enerjisi hiçbir karşılaştırmaya girmez",
        "Sistem sınırı açıklanmadan aşamaları dışlar.",
      ],
      [
        "Biyogaz yalnız saf H₂’dir",
        "Metan veCO₂ içeren değişken gaz karışımını yanlış tanımlar.",
      ],
    ],
    "Biyoyakıt sözcüğünü sıfır emisyon etiketi olarak kullanmak.",
    "Biyojenik karbonun dengesi ve fosil girdiler açık zaman/sistem sınırında hesaplanır.",
  ),
  q025(
    "H₂’nin saf O₂ ile yakıt pilinde kullanımında doğrudan CO₂ çıkmaması hangi sonucu tek başına kanıtlamaz?",
    "Kullanım noktası ürünleri, önceki üretim ve taşıma etkilerini kapsamaz.",
    "Yakıt piline giren C yokluğunu bütün üretim zincirinden ayır.",
    [
      "Saf H₂ ve O₂ girdilerinde karbon yoktur.",
      "Yakıt pili kullanım ürünü bu nedenle CO₂ içermez.",
      "Ancak H₂ üretimi fosil kaynaklı elektrik veya doğal gaz kullanmış olabilir; bütün zincir sıfır karbon denemez.",
    ],
    [
      [
        "Hidrojenin bütün yaşam döngüsünün sıfır karbon olduğunu",
        "Kullanım sınırını üretim/taşıma sınırına genişletmez.",
      ],
      [
        "Kullanım tepkimesinde su oluşabileceğini",
        "Bu sonuç H₂/O₂ tepkimesiyle uyumludur; sorulan kanıtlanamayan sonuç değildir.",
      ],
      [
        "H₂’nin karbon atomu taşımadığını",
        "Verilen formülden bu doğrudan okunabilir.",
      ],
      ["Saf O₂’nin karbon içermediğini", "O₂ formülü bunu zaten gösterir."],
      [
        "Yakıt pilinin enerji dönüştürebildiğini",
        "Verilen kullanım yakıt pili dönüşümünü belirtmiştir.",
      ],
    ],
    "Doğrudan CO₂ sıfır bilgisini yaşam döngüsünün bütününe yaymak.",
    "Hidrojen enerji taşıyıcısıdır; üretim yöntemi ve girdiler ayrıca belirlenir.",
  ),
  q025(
    "Su elektrolizinin ideal net denkliği 2 H₂O→2 H₂+O₂’dir. 0,60 mol su tamamen ayrışırsa H₂ ve O₂ miktarları hangisidir?",
    "Su elektrolizinde H₂:O₂ mol oranı 2:1’dir.",
    "Su katsayısıyla her gazın katsayısını ayrı oranla.",
    [
      "İki mol sudan iki mol H₂ oluşur; 0,60 mol su 0,60 mol H₂ verir.",
      "O₂ miktarı su molünün yarısıdır:0,30 mol.",
      "H veO atomları 0,60 mol su bilançosuyla korunur.",
    ],
    [
      ["0,60 mol H₂; 0,30 mol O₂", "2:2:1 su–hidrojen–oksijen oranını korur."],
      ["0,30 mol H₂; 0,60 mol O₂", "İki gazın katsayılarını ters çevirir."],
      ["0,60 mol H₂; 0,60 mol O₂", "O atomunu başlangıcın iki katına çıkarır."],
      ["1,20 mol H₂; 0,60 mol O₂", "Bir mol suyu iki mol H₂ gibi sayar."],
      [
        "0,30 mol H₂; 0,15 mol O₂",
        "Verilen suyun yalnız yarısını tüketmiş olur.",
      ],
    ],
    "H₂ içindeki iki H atomu ile iki H₂ molekülünü aynı saymak.",
    "Elektroliz dış enerji gerektirir; bu ayrışma enerji üreten hidroliz diye adlandırılmaz.",
  ),
  q025(
    "100 MJ elektrik önce %70 verimli elektrolizle H₂’ye, sonra %50 verimli yakıt piliyle elektriğe dönüyor. Aynı enerji temeli ve ek kayıp yoksa geri elektrik kaç MJ’dir?",
    "Ardışık verimler her aşamanın girişine uygulanarak çarpılır.",
    "100’ün %70’ini, sonucun %50’sini bul.",
    [
      "H₂ kimyasal enerji karşılığı 100×0,70=70 MJ’dir.",
      "Yakıt pili 70×0,50=35 MJ elektrik verir.",
      "Geri dönüş %35; toplam diğer enerji aktarımı 65 MJ olur.",
    ],
    [
      ["35", "0,70×0,50 çarpımını 100 MJ’ye uygular."],
      ["50", "İlk aşama kaybını yok sayar."],
      ["70", "İkinci aşama kaybını yok sayar."],
      ["60", "İki yüzdeyi ortalayıp çevrim verimi sayar."],
      ["120", "Verimleri toplayıp girenden fazla çıktı üretir."],
    ],
    "İki verim yüzdesini çarpmak yerine toplamak veya ortalamak.",
    "İlk kayıp 30 MJ, ikinci kayıp 35 MJ; 35+30+35=100 MJ’dir.",
  ),
  q025(
    "NaBH₄+2 H₂O→NaBO₂+4 H₂ basitleştirilmiş denkliğine göre 0,20 mol NaBH₄ yeterli suyla tam dönüşüyor. H₂ miktarı kaç moldür?",
    "Bir mol borhidrür dört mol H₂ verir; H atomlarının bir bölümü sudan gelir.",
    "Denklemdeki 1:4 oranını uygula.",
    [
      "0,20 mol borhidrür 0,40 mol su tüketir.",
      "H₂ katsayısı dört olduğundan 4×0,20 hesaplanır.",
      "0,80 mol H₂ elde edilir.",
    ],
    [
      ["0,80", "Bir borhidrürden dört H₂ oranını kullanır."],
      [
        "0,40",
        "Yalnız borhidrürün kendi dört H’sini sayıp su katkısını atlar.",
      ],
      ["0,20", "Borhidrür ileH₂’yi 1:1 alır."],
      ["0,10", "H atomu/H₂ sayımını ters yarılar."],
      ["1,60", "Dört H₂ katsayısını sekiz H₂ gibi kullanır."],
    ],
    "H₂’nin tüm atomlarının yalnız NaBH₄’ten geldiğini sanmak.",
    "Solda toplam 1,60 mol H atomu, sağda 0,80 mol H₂ içinde yine 1,60 mol H atomu vardır.",
  ),
  q025(
    "Bir araştırma NaBO₂’nin ek işlemlerle yeniden NaBH₄’e dönüştürülebildiğini gösteriyor. Bundan hangi doğru sonuç çıkar?",
    "Kimyasal taşıyıcının geri üretimi enerji ve madde girdisi gerektirebilir.",
    "Madde çevriminin kapanmasını enerji kazancıyla eşitleme.",
    [
      "NaBH₄ hidrolizinde H₂ açığa çıkarken daha düşük enerji durumlu ürünler oluşur.",
      "NaBO₂’den taşıyıcıyı geri hazırlamak ek kimyasal/enerji işlemleri gerektirir.",
      "Bu nedenle yeniden üretilebilirlik bedelsiz sonsuz enerji çevrimini kanıtlamaz.",
    ],
    [
      [
        "Geri üretimin enerji ve madde girdisi bilançosu ayrıca gerekir",
        "Kapalı madde döngüsünü enerji üretme iddiasından ayırır.",
      ],
      [
        "Su tek başına sınırsız bedelsiz yakıttır",
        "Taşıyıcıyı geri kurmanın maliyetini yok sayar.",
      ],
      [
        "Bor atomları her çevrimde enerjiden yaratılır",
        "Atom korunumu yerine element yaratılması iddia eder.",
      ],
      [
        "Katalizör enerji gereksinimini tamamen yok eder",
        "Hız etkisini termodinamik enerji bilançosuyla karıştırır.",
      ],
      [
        "Denklem dengeli olunca net enerji sonsuzdur",
        "Atom dengesiyle enerji kazancını aynı ölçüt sayar.",
      ],
    ],
    "Bir maddenin yeniden kullanılabilmesini enerji girişi gerekmemesi olarak yorumlamak.",
    "Madde denkliği doğru olsa da enerji ve süreç verimi ayrı değerlendirilir.",
  ),
  q025(
    "Ağır bir çekirdeğin daha küçük çekirdeklere ayrılması ve Güneş’te hafif çekirdeklerin birleşmesi sırasıyla nasıl adlandırılır?",
    "Fisyon ayrılma; füzyon birleşme çekirdek süreçleridir.",
    "Büyükten küçüğe ve küçükten büyüğe yönlerini eşleştir.",
    [
      "Ağır çekirdek bölünmesi fisyondur.",
      "Hafif çekirdeklerin birleşmesi füzyondur.",
      "Bu iki süreç kimyasal yanmadan farklı olarak çekirdek türlerini değiştirebilir.",
    ],
    [
      ["Fisyon; füzyon", "İki çekirdek sürecini doğru yönle eşler."],
      ["Füzyon; fisyon", "Birleşme ve ayrılmayı ters adlandırır."],
      [
        "Damıtma; elektroliz",
        "Çekirdek süreçlerini moleküler/fiziksel işlemlerle değiştirir.",
      ],
      ["Yanma; çözünme", "Nükleer dönüşüme kovalent/karışma süreçleri atar."],
      [
        "Hidroliz; esterleşme",
        "Çekirdek yerine organik bağ tepkimelerini seçer.",
      ],
    ],
    "Fisyon ilefüzyonu yalnız benzer söylenişlerinden eşleştirmek.",
    "Nükleer enerji yoğunluğu ile termik-elektrik verimi yine ayrı kavramlardır.",
  ),
  q025(
    "Bir nükleer ısı kaynağından 600 MJ alan dönüştürücünün elektrik verimi %40’tır. Elektrik ve diğer enerji aktarımı hangisidir?",
    "Isı kaynağı nükleer olsa da dönüşüm verimi yararlı/giren oranıdır.",
    "600 MJ’nin %40’ını alıp kalanını çıkar.",
    [
      "Elektrik 600×0,40=240 MJ olur.",
      "Diğer aktarım 600−240=360 MJ’dir.",
      "Toplam 240+360=600 MJ korunur.",
    ],
    [
      [
        "240 MJ elektrik; 360 MJ diğer aktarım",
        "Verimi ve enerji toplamını korur.",
      ],
      [
        "600 MJ elektrik; 0 MJ diğer aktarım",
        "Nükleer kaynağı otomatik %100 verimli sanır.",
      ],
      [
        "360 MJ elektrik; 240 MJ diğer aktarım",
        "Yararlı ile diğer payı ters çevirir.",
      ],
      [
        "1500 MJ elektrik; 900 MJ diğer aktarım",
        "Hedefi olmayan bu soruda verime bölerek girdiyi aşar.",
      ],
      [
        "240 MJ elektrik; 360 MJ enerji yok olur",
        "Doğru sayıyı enerji yok olması gibi yanlış yorumlar.",
      ],
    ],
    "Birim yakıt başına yüksek enerji ile ısı-elektrik dönüşüm verimini eşitlemek.",
    "Elektrik kısmı toplamın %40’ıdır; diğer enerji de sistem çevresine aktarılır.",
  ),
  q025(
    "Ticari uranyum yakıtlı fisyon santrali için en uygun ifade hangisidir?",
    "Uranyum stoklu kaynaktır; işletmede düşük CO₂ ve atık yönetimi farklı ölçütlerdir.",
    "Kaynak yenilenmesi, işletme ve atık boyutlarını ayrı değerlendir.",
    [
      "Uranyum insan zaman ölçeğinde yenilenmeyen madde stokudur.",
      "İşletme elektriği fosil yanması gibi doğrudan CO₂ kaynağı değildir.",
      "Kullanılmış radyoaktif yakıtın ve yaşam döngüsü etkilerinin yönetimi gerekir.",
    ],
    [
      [
        "Yenilenemez; düşük işletme CO₂’sine rağmen radyoaktif atık yönetimi gerekir",
        "Üç ayrı özelliği koşulsuz zararsızlık üretmeden birleştirir.",
      ],
      [
        "Yenilenebilir; çünkü türbin döner",
        "Aygıtın dönmesini yakıt stokunun yenilenmesi sanır.",
      ],
      [
        "Her ticari santral Güneş gibi füzyonla çalışır",
        "Mevcut fisyon santralini füzyonla karıştırır.",
      ],
      [
        "Hiçbir atık veya yaşam döngüsü etkisi yoktur",
        "Düşük doğrudan CO₂’den sıfır toplam etki çıkarır.",
      ],
      [
        "Elektrik verimi zorunlu %100’dür",
        "Nükleer enerji yoğunluğundan dönüşüm kayıpsızlığı çıkarır.",
      ],
    ],
    "Bir çevresel ölçütteki avantajı bütün etki türlerinin yokluğu sanmak.",
    "İklim, atık, güvenilir arz ve kaynak yenilenmesi ayrı değerlendirme başlıklarıdır.",
  ),
  q025(
    "A seçeneğinin yalnız işletme CO₂’si, B seçeneğinin ise üretim+taşıma+işletme+ömür sonu CO₂’si verilmiştir. Bu iki sayıdan doğrudan bütün yaşam döngüsü üstünlüğü çıkarılamamasının nedeni nedir?",
    "Karşılaştırılan işlev ve sistem sınırları aynı olmalıdır.",
    "İki sayının kapsadığı aşamaları yan yana koy.",
    [
      "A için üretim ve ömür sonu gibi aşamalar eksiktir.",
      "B daha geniş sistem sınırı içerir.",
      "Aynı işlev ve kapsam sağlanmadan toplam yaşam döngüsü sırası kurulamaz.",
    ],
    [
      [
        "Sistem sınırları aynı değildir",
        "Eksik ve tam aşamalı sayıları eşdeğer ölçüt saymaz.",
      ],
      [
        "CO₂ hiçbir enerji sisteminde oluşmaz",
        "Verilmiş emisyon verisini ve karbonlu yanmayı reddeder.",
      ],
      [
        "Daha küçük yazılan sayı her ölçütte zorunlu iyidir",
        "Kapsamı ve başka etkileri siler.",
      ],
      [
        "Ömür sonu bütün malzemelerde otomatik sıfırdır",
        "Ömür sonu etkilerini verisiz yok sayar.",
      ],
      [
        "Güç birimi olan kW, CO₂ kütlesiyle aynıdır",
        "Farklı fiziksel nicelikleri birleştirir.",
      ],
    ],
    "Sistem sınırı dar olan bir sonucu kapsamlı sonuçmuş gibi yorumlamak.",
    "Aynı kWh hizmeti için aynı aşamalar ve veri koşullarıyla karşılaştırma gerekir.",
  ),
  q025(
    "LNG veCNG için doğru ayrım hangisidir?",
    "LNG soğutularak sıvılaştırılmış, CNG sıkıştırılmış doğal gazdır.",
    "Sıvılaştırma ile sıkıştırılmış gaz depolamayı ayrı oku.",
    [
      "LNG çok düşük sıcaklıkta sıvı doğal gazı anlatır.",
      "CNG yüksek basınçta gaz depolamadır.",
      "Bu ikisini oda sıcaklığında yalnız basınçla aynı sıvı hâl elde edilir diye eşitlemek doğru değildir.",
    ],
    [
      [
        "LNG sıvılaştırılmış; CNG sıkıştırılmış doğal gazdır",
        "İki depolama biçimini doğru ayırır.",
      ],
      [
        "İkisi de daima aynı sıcaklık ve basınçta sıvıdır",
        "Faz ve koşul farkını siler.",
      ],
      [
        "LNG saf karbon, CNG saf uranyumdur",
        "Doğal gazın kimyasal bileşimini değiştirir.",
      ],
      [
        "LNG ileLPG her zaman aynı propan/bütan karışımıdır",
        "Doğal gaz ile LPG’nin başlıca bileşenlerini karıştırır.",
      ],
      [
        "CNG hiçbir basınç altında gaz olamaz",
        "CNG’nin sıkıştırılmış gaz niteliğini ters çevirir.",
      ],
    ],
    "Gazı basınçlandırma ile her sıcaklıkta sıvılaştırmayı aynı olay saymak.",
    "Metanın kritik sıcaklığı nedeniyle faz değişimi yalnız basınç sözcüğüyle açıklanamaz.",
  ),
  q025(
    "Varsayımsal A yakıtı 50 MJ/kg, %50 verim ve 3 kg CO₂/kg; B yakıtı 25 MJ/kg, %80 verim ve 2 kg CO₂/kg verilerine sahiptir.40 MJ aynı yararlı hedef için kullanım CO₂’si hangisinde azdır?",
    "Aynı yararlı hedefte kütle=hedef/(verim×ısıl değer), CO₂=kütle×emisyon katsayısıdır.",
    "İki yakıtın gereken kütlesini ayrı bul.",
    [
      "A için 40/(0,50×50)=1,60 kg; CO₂=1,60×3=4,80 kg’dır.",
      "B için 40/(0,80×25)=2,00 kg; CO₂=2,00×2=4,00 kg’dır.",
      "Bu kullanım sınırında B daha az CO₂ verir; ısıl değerinin küçük olması tek başına aleyhine karar verdirmez.",
    ],
    [
      [
        "B; 4,00 kg CO₂",
        "Aynı yararlı hizmet için iki verimi ve emisyon katsayısını kullanır.",
      ],
      [
        "A; 3,00 kg CO₂",
        "Birer kilogram yakıtı karşılaştırıp gereken farklı kütleleri atlar.",
      ],
      ["A; 2,40 kg CO₂", "Verimi hesaba katmadan 40/50 kütlesini kullanır."],
      ["B; 8,00 kg CO₂", "B’nin verimini yanlış %40 gibi uygular."],
      [
        "İkisi eşit; çünkü hedef 40 MJ",
        "Aynı enerji hizmetinin aynı CO₂ gerektirdiğini varsayar.",
      ],
    ],
    "Yalnız MJ/kg değerine bakıp yararlı verimi ve karbon katsayısını atlamak.",
    "Sonuç yalnız verilmiş kullanım CO₂ ölçütü içindir; yaşam döngüsünün diğer aşamaları belirtilmemiştir.",
  ),
];
const sustainPack025: Pack025 = {
  id: "ayt-surdurulebilirlik-geri-donusum",
  topic: "detail-461",
  title: "Sürdürülebilirlik ve Geri Dönüşüm",
  minutes: 95,
  objectives: [
    "Kaynak azaltımı, yeniden kullanım ve geri dönüşümü işlev ve sistem sınırıyla ayırmak",
    "Polimer, kâğıt, metal ve camın geri dönüşüm olanak ve sınırlarını açıklamak",
    "Aşamalı verimleri doğru girdilere uygulayıp malzeme ve enerji bilançosu kurmak",
  ],
  sections: [
    s025(
      "Başlamadan: sürdürülebilirliğin üç boyutu",
      "Sürdürülebilir kalkınma, bugünkü gereksinimleri gelecek kuşakların gereksinimlerini karşılama yeteneğini tehlikeye atmadan karşılamayı amaçlar. Çevre, ekonomi ve toplum birlikte düşünülür; yalnız kısa vadeli üretim miktarı yeterli ölçüt değildir.",
      "Ön koşul yüzde, oran ve kütle korunumu bilgisidir. Bir uygulamanın sürdürülebilirliği kaynağı, üretimi, kullanımı ve ömür sonunu içerir. Geri dönüşüm önemli bir araçtır fakat tek başına bütün kaynak, atık ve adalet sorunlarını çözmüş sayılmaz.",
    ),
    s025(
      "Azaltım ve yeniden kullanım",
      "Gereksiz malzeme talebini azaltmak atığın oluşmasını önler. Dayanıklı ürünün aynı veya uygun başka işlevde yeniden kullanılması, maddeyi zorunlu olarak eritip yeni ham maddeye dönüştürmekten farklıdır.",
      "Bir şişeyi uygun işlevle yeniden kullanmak ile camını kırıp eriterek yeni ürün yapmak aynı işlem değildir. Önleme, onarım ve yeniden kullanımın olanakları işlev, hijyen, güvenlik ve gerçek ömürle değerlendirilir; en çok döngü her durumda en düşük etkiyi garanti etmez.",
    ),
    s025(
      "Karşılaştırmanın işlevsel birimi",
      "Bir ambalajı yalnız gram başına değil, aynı miktar ürünü uygun koşulda koruma hizmeti için karşılaştır. Bir çanta için aynı sayıda taşıma, aydınlatmada aynı ışık hizmeti gibi işlevsel birim ortak ölçüt sağlar.",
      "Daha hafif malzeme üretimde daha az kütle kullanabilir ama dayanım, ürün kaybı, temizlik veya taşıma etkileri sonucu değiştirebilir. Sayısal çevre iddiasının aşamaları ve etki ölçütü belirtilmeden genel üstünlük sonucu çıkarılmaz.",
    ),
    s025(
      "Yenilenebilir, geri dönüştürülebilir, biyobozunur",
      "Yenilenebilir ham madde kaynağın yeniden oluşmasıyla; geri dönüştürülebilirlik uygun süreçle malzeme kazanımıyla; biyobozunurluk canlı süreçleriyle belirli koşullarda parçalanmayla ilgilidir. Bu üç kavram eşanlamlı değildir.",
      "Biyolojik kökenli bir plastik her ortamda hızla biyobozunur olmak zorunda değildir; petrol kökenli bazı malzemeler uygun tesiste geri dönüştürülebilir. Etiketi değerlendirirken koşul ve gerçek yerel toplama/işleme olanağına bakılır; yalnız yeşil sözcükleri kanıt sayılmaz.",
    ),
    s025(
      "Polimer ve monomer",
      "Polimer, çok sayıda yapı biriminin kovalent bağlarla bağlandığı büyük molekül yapılarıdır. Nişasta, selüloz, protein ve DNA doğal polimer örnekleridir; PE, PVC, PET ve naylon sentetik örnekler arasında yer alır.",
      "Polimer ile plastik bire bir aynı kapsam değildir: bütün doğal polimerlere gündelik plastik denmez. Plastik ürün çoğu zaman polimer yanında katkı ve dolgu da taşır. Polimerin doğal olması tek başına her kullanımda zararsız veya sınırsız kaynak olduğunu göstermez.",
    ),
    s025(
      "PE ve PVC tekrar birimleri",
      "Eten CH₂=CH₂ katılma polimerleşmesinde pi bağının açılmasıyla –CH₂–CH₂– tekrar birimini verir; polietilen PE oluşur. Vinil klorür CH₂=CHCl ise –CH₂–CHCl– tekrar birimiyle PVC oluşturur.",
      "Tekrar birimi çizimindeki uç çizgiler komşu birimlere bağlanmayı gösterir; kapalı küçük molekül uçları değildir. PVC’nin Cl taşıması PE ile aynı atom bileşiminde olmadığını gösterir. Bu yapısal fark, atıkların malzeme türüne göre ayrılmasının nedenlerinden biridir.",
    ),
    s025(
      "Diğer yaygın polimerler",
      "PTFE’nin –CF₂–CF₂– birimi tetrafloroetenden; PAN’ın –CH₂–CH(CN)– birimi akrilonitrilden gelir. PET, polietilen tereftalattır; tekrar eden ester bağlantıları taşır. Poliamitlerde amid bağlantısı bulunur.",
      "Polyester elyaf, poliamit tekstil, kauçuk lastik ve çeşitli polimer yalıtkanlar yapı-özellik-kullanım ilişkisini gösterir. Bütün polimerler aynı ısı dayanımı, iletkenlik veya kimyasal inertlikte değildir. Lateks bir dağılım türünü anlatabilir; doğal veya sentetik kauçuk kökenli olabilir.",
    ),
    s025(
      "Termoplastik ve ağ yapı",
      "Birçok termoplastik uygun sıcaklıkta yumuşayıp yeniden şekillendirilebilir; PE vePET yaygın örneklerdir. Çapraz bağlı termosetlerde kovalent ağ, aynı biçimde tekrar eriyip akmayı engeller; aşırı ısı bozunma doğurabilir.",
      "Bu ayrım, bütün polimerler defalarca eritilip aynı kalitede kullanılır iddiasını sınırlar. Termoset için mekanik öğütme, kompozit dolgu veya özel kimyasal yollar değerlendirilebilir; basit eriyik geri işleme ile aynı süreç değildir.",
    ),
    s025(
      "Ürün ile saf polimer farkı",
      "Ambalajın veya parçanın ana polimeri kadar pigment, dolgu, plastikleştirici ve çok katmanlı yapısı da geri dönüşümü etkiler. Aynı genel ad, her ürünün aynı tesisçe kabul edileceği anlamına gelmez.",
      "Reçine tanımlama kodu malzeme türünü işaret edebilir fakat bulunduğun yerde geri dönüşüm garantisi vermez. Toplama sistemi, kirlilik, renk, katman ve pazar/ürün gereği kabulü etkiler. Tanımlama ile fiilî geri kazanımı ayırmak yanlış başarı hesabını önler.",
    ),
    s025(
      "Mekanik geri dönüşüm",
      "Uygun atığın ayrılması, temizlenmesi, öğütülmesi ve gerekirse eritilip şekillendirilmesi mekanik geri dönüşüme örnektir. Temel amaç malzemeyi tekrar kullanıma uygun biçimde kazanmaktır; her aşamada kayıp veya kalite değişimi olabilir.",
      "Karışık polimerlerin davranışları ve katkıları uyumsuzluk doğurabilir; bu yüzden kaynakta ayrım ve uygun tasarım önemlidir. Kirli veya karışık atığı toplamak, onun tamamını aynı kalitede yeni ürün olarak elde etmek demek değildir.",
    ),
    s025(
      "Kimyasal dönüşüm ve enerji geri kazanımı",
      "Bazı kimyasal geri dönüşüm süreçleri polimeri daha küçük kimyasal türlere veya monomere dönüştürmeyi amaçlar. Ürün saflığı, gerekli enerji ve yan ürünler sürecin değerlendirilmesine katılır; her polimer için aynı yöntem işlemez.",
      "Atığı yakıp ısı/elektrik elde etmek enerji geri kazanımı olabilir; polimer malzemesini aynı madde döngüsünde geri kazanmakla eşit değildir. Önleme, yeniden kullanım, malzeme geri dönüşümü ve enerji geri kazanımı farklı akışlardır; isimleri kütle bilançosunda karıştırma.",
    ),
    s025(
      "Aşama yüzdelerinin paydası",
      "Toplama oranı oluşan atığa, ayıklama kabul oranı toplanan miktara, işleme verimi ise kabul edilen girdiye uygulanır. Üç aşamanın yüzdelerini toplamak toplam geri kazanım yüzdesini vermez.",
      "Örneğin %80 toplama, %90 kabul ve %75 işleme verimi zincirinde kazanılan pay 0,80×0,90×0,75=%54’tür. Her kayıp kendi aşamasında çıkarılır; toplanan %80’in tümünü geri kazanıldı diye raporlama.",
    ),
    s025(
      "Malzeme bilançosunu kapatmak",
      "Başlangıç talebi; önlenen, yeniden kullanılan, geri kazanılan ve bu çevrimde kazanılamayan kütleler olarak ayrılabilir. Son kazanılamayan miktar, toplanmayan+ayıklama reddi+işleme kaybının toplamıdır.",
      "Etkileşimli model her aşamayı kendi girdisiyle hesaplar ve toplamı başlangıca eşitler. Burada kütle yok olmaz; geri kazanılmayan bölüm başka atık akışına gider. Model özel bir tesisin ölçülmüş performansı değildir; sayılar seçilmiş varsayımlardır.",
    ),
    s025(
      "Kalite ve yeni ham madde ikamesi",
      "Geri kazanılan bir kilogramın yeni ham maddenin bir kilogramını ikame edebilmesi ürün kalitesi ve işlevinin uygun olmasını gerektirir. Alt kaliteli farklı ürüne giden akış, daha yüksek kaliteli kapalı döngüyle aynı sonuç değildir.",
      "Modeldeki 1:1 ikame açık varsayımdır; gerçek değerlendirmede ikame oranı, katkı ihtiyacı ve ürün ömrü değişebilir. Yalnız geri kazanılmış kütleden toplam kaynak tasarrufu çıkarmadan bu koşulları ve başka akışların girdilerini belirt.",
    ),
    s025(
      "Enerji tasarrufunun sistem sınırı",
      "Birincil üretim ve geri dönüşüm için kWh/kg verildiğinde aynı ürün miktarı için enerji hesaplanabilir. Fakat toplama, taşıma, temizlik, tesis kurulumu ve atık işlemleri dâhil değilse sonuç yalnız belirtilen üretim sınırına aittir.",
      "Modelde verilen yoğunluklar öğretim amaçlı varsayımsaldır; gerçek alüminyum, cam, kâğıt veyaPET tesislerinin değişmez sayıları değildir. Azalan üretim enerjisi, başka çevresel ölçütlerde veya bütün yaşam döngüsünde aynı oranda kazanç kanıtlamaz.",
    ),
    s025(
      "Yeniden kullanımda başa baş noktası",
      "Tekrar kullanılabilir ürünün başlangıç üretim etkisi R, her kullanım temizliği w; tek kullanımlığın kullanım başına etkisi s ise n kullanımda R+n·w ile n·s karşılaştırılır. Aynı etki birimi ve işlev kullanılır.",
      "s>w olduğunda başa baş n=R/(s−w)’dir; tam kullanım sayısı ve eşitlik/üstünlük ayrımı dikkat ister. w≥s ise bu basit modelde üretim etkisi pozitifken daha çok kullanım otomatik üstünlük getirmez. Ömür ve güvenli kullanım sınırı da ayrı koşuldur.",
    ),
    s025(
      "Kâğıt ve selüloz lifleri",
      "Kâğıt, selüloz lifli hamurdan ve ürününe göre katkılardan oluşur. Atık kâğıdın hamurlaştırılması, ayıklama ve uygun temizleme işlemleriyle yeniden kâğıt/karton üretiminde kullanılması yeni lif ihtiyacını azaltabilir.",
      "Lifler süreçte kısalabilir ve kirlenebilir; bu yüzden her lif sınırsız sayıda aynı kaliteli üründe döngü yapamaz. Islak, kirli, kaplamalı veya çok katmanlı ürünlerin uygunluğu değişir; bütün kâğıt kütlesinin kayıpsız geri geldiği varsayımı gerçek süreç için genel kural değildir.",
    ),
    s025(
      "Metallerin geri kazanımı",
      "Metallerin cevherden üretimi ile uygun hurdadan geri kazanımı farklı işlem ve enerji gerektirir. Alüminyum, çelik ve bakır hurdalarının ayrı ve uygun kalitede toplanması kaynak kullanımını ve bazı üretim girdilerini azaltabilir.",
      "Metal atomları yeniden eritmede türünü korusa da alaşım karışması, oksitlenme, cüruf ve kirlenme kalite/kütle kaybı doğurabilir. Metal geri dönüşümü sınırsız kayıpsız bütün ürünler eşdeğerdir anlamına gelmez; ağır metal içeren atıklar uygun özel akış ister.",
    ),
    s025(
      "Cam ve karışık akışlar",
      "Cam uygun bileşim ve renk ayrımıyla kırık cam olarak yeniden üretime katılabilir. Ambalaj camı ile farklı yüksek sıcaklık camları veya seramik parçalar aynı erime ve bileşim davranışını göstermeyebilir.",
      "Bu nedenle malzeme adı yanında ürün türü ve tesis kabulü de önemlidir. Bir kutuda farklı kırılgan ürünlerin bulunması hepsinin aynı cam ham maddesi olduğunu kanıtlamaz. Ayrım ve kirlilik oranı geri kazanımın gerçek verimini etkiler.",
    ),
    s025(
      "Özel atıklar ve ürün tasarımı",
      "Pil, elektronik ve bazı kimyasal içeren ürünler sıradan karışık malzeme akışından ayrı değerlendirilir. İçlerindeki değerli madde ve tehlikeli bileşenler uygun toplama/işleme düzeni gerektirir; çevreye kontrolsüz yayılma başka bir kayıp türüdür.",
      "Dayanıklılık, onarılabilirlik, kolay sökülme, malzeme tanımlaması ve uyumlu parça seçimi ürün daha atık olmadan geri kazanım olanağını etkiler. Sonradan ayırmakta zorlanılan çok katmanlı yapıyı yalnız toplama yüzdesini büyüterek çözemezsin.",
    ),
    s025(
      "Kimyada atığı baştan azaltmak",
      "Daha seçici tepkime, uygun katalizör, daha az çözücü, güvenli madde seçimi ve enerji verimliliği atığı oluşmadan azaltmayı destekleyebilir. Amaç yalnız üretilen atığı sonradan arıtmak değil, girdi ve yan ürünleri tasarımda düşünmektir.",
      "Bir katalizör tepkime hızını ve seçiciliği iyileştirebilir; kütle/enerji korunumu kuralını ortadan kaldırmaz. Kimyasal verim, atom ekonomisi ve süreç etkisi ayrı ölçütlerdir; yüksek hedef ürün yüzdesi başka tüm girdilerin düşük olduğunu tek başına kanıtlamaz.",
    ),
    s025(
      "Döngüselliği kanıtla izlemek",
      "Toplanan, tesise kabul edilen ve yeni üründe kullanılan kütleyi ayrı raporlamak gerçek iyileşmeyi görünür kılar. Her aşamanın paydası, ölçüm dönemi ve kalite tanımı verilmelidir; yalnız hedef veya sembol başarı kaydı değildir.",
      "Sürdürülebilirlik çevreyle birlikte erişilebilirlik, çalışma koşulları ve ekonomik uygulanabilirliği de içerir. Bireysel azaltım ve doğru ayrım önemlidir; ürün tasarımı, tesis kapasitesi ve ortak politika da sonucu belirler. Model bir seçeneğin etkisini varsayımları içinde açıklar.",
    ),
  ],
  examples: [
    e025(
      "Üç geri kazanım aşaması",
      "360 kg atığın %75’i toplanıyor; toplananın %80’i kabul ediliyor; kabul edilenin %90’ı geri kazanılıyor. Geri kazanılan ve bu döngüde kazanılamayan miktar nedir?",
      "Her yüzdeyi kendi aşama girdisine uygula.",
      [
        "Toplanan 360×0,75=270 kg; toplanmayan 90 kg’dır.",
        "Kabul 270×0,80=216 kg; ayıklama reddi 54 kg’dır.",
        "Kazanılan 216×0,90=194,4 kg; işleme kaybı 21,6 kg ve toplam kazanılamayan 165,6 kg’dır.",
      ],
      "194,4 kg kazanım; 165,6 kg diğer akış",
      "90+54+21,6+194,4=360 kg; üç verimin çarpımı %54’tür.",
      "%75+%80+%90 toplamını geri kazanım yüzdesi saymak.",
    ),
    e025(
      "Önleme ile yeniden kullanımın paydası",
      "İlk talep 400 kg. Talebin %20’si önleniyor; kalanın %25’i yeniden kullanımla karşılanıyor. Geri dönüşüme aday atık kaç kilogramdır?",
      "Önce talebi azalt, ikinci yüzdeyi yeni kalana uygula.",
      [
        "Önlenen 400×0,20=80 kg; kalan 320 kg’dır.",
        "Yeniden kullanılan 320×0,25=80 kg’dır.",
        "Atık adayı 320−80=240 kg; başlangıç 80+80+240 olarak kapanır.",
      ],
      "240 kg",
      "İkinci %25,400 kg’a değil 320 kg’a uygulanmıştır.",
      "İki yüzdeyi doğrudan toplayıp başlangıçtan %45 çıkarmak.",
    ),
    e025(
      "Üretim enerjisi sınırı",
      "Varsayımsal alüminyum üretim verileri:birincil 40 kWh/kg, geri kazanılmış 8 kWh/kg. Aynı kalitede 25 kg ürünün tümü uygun hurdadan yapılıyor; diğer aşamalar dışarıda. Enerji farkı nedir?",
      "Aynı 25 kg için iki üretim yolunu ayrı hesapla.",
      [
        "Birincil üretim 25×40=1000 kWh kullanır.",
        "Geri kazanılmış girdili üretim 25×8=200 kWh kullanır.",
        "Bu üretim sınırında fark 1000−200=800 kWh, %80 azalmadır.",
      ],
      "800 kWh daha az üretim enerjisi",
      "Toplama ve taşıma verilmediğinden bu sonuç bütün yaşam döngüsünün %80 azaldığını kanıtlamaz.",
      "Varsayımsal bir yoğunluğu bütün gerçek tesisler için değişmez yasa saymak.",
    ),
    e025(
      "Yeniden kullanım başa baş hesabı",
      "Tekrar kullanılan ürünün üretim etkisi 18 birim, her kullanım temizliği 0,30 birim; tek kullanımlığın etkisi 1,80 birim/kullanımdır. Başa baş ve 15 kullanımdaki fark nedir?",
      "18+0,30 n ile 1,80 n’yi eşitle.",
      [
        "18=1,50 n denklemi n=12 kullanımda eşitlik verir.",
        "15 kullanımda yeniden kullanılabilir etki 18+4,5=22,5 birimdir.",
        "Tek kullanımlık 15×1,80=27 birim; fark 4,5 birim yeniden kullanım lehinedir.",
      ],
      "12’de eşit; 15’te 4,5 birim daha az",
      "Üretim bir defa, temizlik 15 defa sayılmıştır; birimler aynı etki ölçütüdür.",
      "İlk üretimi her kullanımda yeniden eklemek veya temizliği hiç saymamak.",
    ),
    e025(
      "Döngüde kayıp birikimi",
      "1000 kg uygun malzeme iki ardışık döngünün her birinde %80 kütle verimiyle kazanılıyor; ara yeni girdi yok. İkinci döngü çıkışı nedir?",
      "İkinci verimi ilk döngü çıkışına uygula.",
      [
        "İlk döngü 1000×0,80=800 kg verir.",
        "İkinci döngü 800×0,80=640 kg verir.",
        "Toplam iki döngüde 360 kg bu ürün akışından ayrılmıştır; verimler toplanmaz.",
      ],
      "640 kg",
      "1000×0,80²=640 kg; yeniden girdi olmadığı açıkça belirtilmiştir.",
      "Her döngüde başlangıçtaki 1000 kg’a %80 uygulayıp kaybı biriktirmemek.",
    ),
    e025(
      "Hafiflik tek başına yetmez",
      "A ambalajı 20 g veüretim katsayısı 5 kg CO₂/kg; B ambalajı 50 g ve 1,5 kg CO₂/kg’dır. Aynı koruma hizmeti ve yalnız üretim sınırında CO₂ karşılaştırması nedir?",
      "Gramları kilograma çevirip kendi katsayısıyla çarp.",
      [
        "A:0,020 kg×5=0,100 kg CO₂ verir.",
        "B:0,050 kg×1,5=0,075 kg CO₂ verir.",
        "Bu verilerde B daha ağır olsa da üretim CO₂’si 0,025 kg daha azdır.",
      ],
      "B üretim sınırında 0,025 kg daha az CO₂",
      "İşlev eşitliği varsayımı ve üretim sınırı sonuçla birlikte korunur; taşıma/ömür sonu dışarıdadır.",
      "En hafif olanı katsayı ve işlev verisini okumadan otomatik en düşük etkili seçmek.",
    ),
  ],
  recall: [
    {
      prompt: "Toplama %80, kabul %90, işleme %75 ise nihai kazanım payı?",
      answer: "Aynı başlangıca göre 0,80×0,90×0,75=%54; oranlar toplanmaz.",
    },
    {
      prompt: "Geri dönüşüm kodu yerel kabul garantisi midir?",
      answer:
        "Hayır; malzeme tanımını, ürün yapısını ve yerel toplama/tesis kabulünü ayrı değerlendirmek gerekir.",
    },
    {
      prompt: "Termoset neden termoplastik gibi tekrar akmayabilir?",
      answer:
        "Kovalent çapraz bağ ağı aynı eriyik yeniden şekillenmeyi engeller; ısıtma bozunma doğurabilir.",
    },
    {
      prompt: "Yenilenebilir ve biyobozunur aynı şey midir?",
      answer:
        "Hayır; ilki kaynak yenilenmesi, ikincisi belirli ortamda biyolojik parçalanma koşuludur.",
    },
    {
      prompt: "Kâğıt lifleri niçin sınırsız aynı kaliteli döngü yapmaz?",
      answer:
        "İşlemde lif kısalması ve kirlilik/ayıklama kayıpları kaliteyi sınırlar.",
    },
    {
      prompt: "Yeniden kullanımda başa baş hangi iki ifadeden bulunur?",
      answer:
        "Üretim+her kullanım temizliği ile kullanım sayısı×tek kullanımlık etki eşitlenir.",
    },
  ],
  items: [],
};
sustainPack025.items = [
  q025(
    "Bir üretim planı yalnız bugünkü kazancı artırıyor; gelecek kaynak kapasitesi, çalışma koşulları ve çevresel etkiler incelenmiyor. Sürdürülebilirlik açısından temel eksik hangisidir?",
    "Sürdürülebilirlik çevre, toplum ve ekonomiyi zaman boyutuyla birlikte değerlendirir.",
    "Planın dışarıda bıraktığı boyutları belirle.",
    [
      "Kısa vadeli kazanç ekonomik boyutun yalnız bir kısmıdır.",
      "Gelecek kaynaklar çevresel, çalışma koşulları toplumsal boyuta girer.",
      "Bu boyutlar ve gelecek kuşak gereksinimleri birlikte değerlendirilmelidir.",
    ],
    [
      [
        "Çevresel ve toplumsal boyutlarla gelecek kapasitesinin dışlanması",
        "Tek kısa vadeli ölçütün bütün sürdürülebilirlik olmadığını gösterir.",
      ],
      [
        "Bugünkü üretimin herhangi bir ekonomik değer taşıması",
        "Ekonomik boyutu bütünüyle dışlamak sürdürülebilirlik gereği değildir.",
      ],
      [
        "Planın herhangi bir malzeme kullanması",
        "Her madde kullanımını otomatik sürdürülemez sayar.",
      ],
      [
        "Sürdürülebilirliğin yalnız atık kutusu rengi olması",
        "Kavramı işlevsiz bir sembole indirger.",
      ],
      [
        "Gelecek kaynak kapasitesinin hiçbir planla ilişkili olmaması",
        "Kuşaklar arası boyutu reddeder.",
      ],
    ],
    "Sürdürülebilirliği yalnız kârlılık veya tek atık göstergesiyle eşitlemek.",
    "Aynı kararın çevre, toplum ve ekonomi etkileri birlikte incelenir; birinin varlığı diğerlerini ortadan kaldırmaz.",
  ),
  q025(
    "A işlemi uygun bir cam kabı temizleyip aynı işlevde tekrar kullanıyor; B işlemi kırık camı eriterek yeni kap üretiyor. Doğru ayrım hangisidir?",
    "Ürünün yeniden kullanımı ile malzemenin geri dönüştürülmesi farklı süreçlerdir.",
    "Ürün biçiminin korunup korunmadığını izle.",
    [
      "A’da kap ürün olarak korunup yeniden işlev görür.",
      "B’de cam malzeme yeni üretim girdisine dönüşür.",
      "A yeniden kullanım, B malzeme geri dönüşümüdür.",
    ],
    [
      [
        "A yeniden kullanım; B geri dönüşüm",
        "Ürün ve malzeme döngüsünü doğru ayırır.",
      ],
      [
        "A yakma; B yeniden kullanım",
        "A’da olmayan yanmayı ekler, B’deki malzeme dönüşümünü siler.",
      ],
      ["İkisi de yalnız çöpe atmadır", "İki geri kazanım işlemini yok sayar."],
      [
        "A geri dönüşüm; B enerji geri kazanımı",
        "B’de ısı kullanılmasıyla atıktan enerji üretimini karıştırır.",
      ],
      [
        "İki işlem her koşulda aynı etkiye sahiptir",
        "Temizlik, üretim, taşıma ve ömür sınırlarını verisiz eşitler.",
      ],
    ],
    "Tekrar kullanılıyor sözcüğünü bütün döngüler için aynı teknik işlem sanmak.",
    "Hangi yolun daha düşük etkili olduğu aynı hizmet ve sistem verileriyle ayrıca karşılaştırılır.",
  ),
  q025(
    "Bir ambalajın biyolojik kökenli ham maddeden üretildiği belirtiliyor. Bu bilgi tek başına hangisini kanıtlamaz?",
    "Ham madde kökeni ile belirli ortamda biyolojik parçalanma farklı ölçütlerdir.",
    "Köken bilgisinden çevresel davranış iddiasına yapılan sıçramayı bul.",
    [
      "Biyolojik köken başlangıç kaynağını anlatır.",
      "Biyobozunma malzeme yapısına ve ortam koşullarına bağlıdır.",
      "Bu nedenle ambalajın her ortamda hızla biyobozunacağı sonucu çıkmaz.",
    ],
    [
      [
        "Her ortamda hızla biyobozunacağını",
        "Kökeni koşulsuz parçalanma garantisi yapmaz.",
      ],
      [
        "Ham maddenin biyolojik kaynakla ilişkili olduğunu",
        "Verilen köken bilgisinin doğrudan kendisidir.",
      ],
      [
        "Ambalajın bir üretim sürecinden geçtiğini",
        "Üretildiği zaten belirtilmiştir.",
      ],
      [
        "Ürünün ambalaj işlevi için tasarlandığını",
        "Soruda verilen ürün niteliğidir.",
      ],
      [
        "Malzemenin çevresel etkisinin ayrıca incelenebileceğini",
        "Bu inceleme mümkündür; verilen bilgiyle çelişmez.",
      ],
    ],
    "Biyolojik köken, geri dönüştürülebilirlik ve biyobozunurluğu eşanlamlı kullanmak.",
    "Gerçek biyobozunma iddiasında sıcaklık, ortam ve zaman koşulu gerekir.",
  ),
  q025(
    "Aşağıdakilerden hangisi doğal bir polimer örneğidir?",
    "Selüloz çok sayıda bağlı birimden oluşan doğal polimerdir.",
    "Doğal büyük molekülü küçük molekül ve sentetik polimerlerden ayır.",
    [
      "Selüloz bitkisel yapıların polimer bileşenidir.",
      "PE, PVC vePET sentetik yaygın polimer örnekleridir.",
      "Etanol ise küçük molekül olduğundan doğru doğal polimer selülozdur.",
    ],
    [
      ["Selüloz", "Doğal polimer örneğidir."],
      [
        "Polietilen",
        "Yaygın sentetik polimerdir; doğal polimer örneği değildir.",
      ],
      ["PVC", "Vinil klorürden üretilen sentetik polimerdir."],
      ["PET", "Sentetik polyester örneğidir."],
      ["Etanol", "Küçük moleküldür; polimer zinciri değildir."],
    ],
    "Polimer sözcüğünü yalnız sentetik plastiklerle sınırlamak.",
    "Protein, DNA ve nişasta da doğal polimer örnekleri arasında yer alır.",
  ),
  q025(
    "Eten CH₂=CH₂ katılma polimerleşmesiyle polietilen oluşturuyor. Zincirin temel tekrar birimi hangisidir?",
    "Katılma polimerleşmesinde C=C pi bağı açılıp zincire yeni sigma bağlantıları kurulur.",
    "Her etenin iki C ve dört H’sini tekrar biriminde koru.",
    [
      "Eten birimi iki C, dört H taşır.",
      "Pi bağının açılması C iskeletinin komşu birimlere bağlanmasını sağlar.",
      "Tekrar birimi –CH₂–CH₂– olur; uç çizgiler devam eden zinciri gösterir.",
    ],
    [
      ["–CH₂–CH₂–", "İki C ve dört H’yi zincir bağlantısıyla korur."],
      ["–CH₂–CHCl–", "Başlangıçta olmayan Cl’yi ekleyerek PVC birimi kurar."],
      ["–CF₂–CF₂–", "H’lerin yerine verilmemiş F koyar; PTFE birimidir."],
      ["–CH₂–CH(CN)–", "Verilmemiş nitril grubu ekler; PAN birimidir."],
      ["–CO–O–", "Etene olmayan O ve karbonil ekler."],
    ],
    "Polimerleşmede pi açılmasını bütün atomların değişmesi gibi yorumlamak.",
    "Bu tekrar birimi kapalı küçük etan molekülü değildir; iki yanda zincire bağlantı vardır.",
  ),
  q025(
    "PE vePVC atıklarının malzeme türüne göre ayrılması açısından hangi yapısal fark doğrudur?",
    "PE’nin tekrar birimi yalnız C/H, PVC’ninki C/H yanında Cl taşır.",
    "–CH₂CH₂– ile–CH₂CHCl– birimlerini atom atom karşılaştır.",
    [
      "PE biriminde klor bulunmaz.",
      "PVC biriminde bir H yerine Cl bulunur.",
      "Bu nedenle iki polimer aynı atom bileşimi ve işleme davranışı varsayımıyla birleştirilmez.",
    ],
    [
      [
        "PVC Cl taşır; PE taşımaz",
        "Tekrar birimlerinin temel bileşim farkını korur.",
      ],
      ["PE Cl taşır; PVC taşımaz", "Klorun bulunduğu polimeri ters seçer."],
      ["İkisinde de C yoktur", "İki karbon zincirini yok sayar."],
      ["PVC yalnız bir metal alaşımıdır", "Polimeri metal olarak sınıflar."],
      [
        "Aynı görünüşteki tüm plastikler aynı polimerdir",
        "Ürün görünümünü kimyasal bağlantı özdeşliği sanır.",
      ],
    ],
    "Ambalajın görünüşünü reçine bileşimi yerine kanıt saymak.",
    "Ayrımın gerçek sonucu katkı, kirlilik ve tesis kabulüyle birlikte değerlendirilir.",
  ),
  q025(
    "Bir polimer kovalent çapraz bağlarla ağ oluşturmuş; ısıtıldığında termoplastik gibi akmadan bozunuyor. Hangi çıkarım uygundur?",
    "Çapraz bağlı termoset ağ, basit eriyik yeniden şekillendirmeyi sınırlayabilir.",
    "Ağ bağlantısıyla tekrar eritilebilirlik iddiasını karşılaştır.",
    [
      "Çapraz bağlar zincirleri kalıcı kovalent ağda tutar.",
      "Bu ağ sıradan termoplastik akışına izin vermeyebilir.",
      "Bu yüzden bütün polimerler defalarca eritilerek aynı kalitede kullanılır genellemesi geçersizdir.",
    ],
    [
      [
        "Basit tekrar eritme yolu her polimer için geçerli değildir",
        "Ağ yapının yeniden işleme sınırını açıklar.",
      ],
      [
        "Malzeme polimer olamaz",
        "Termosetlerin de polimer olabildiğini reddeder.",
      ],
      [
        "Isıtma bütün çapraz bağları kayıpsız yeni ürüne çevirir",
        "Verilmiş bozunma davranışına aykırıdır.",
      ],
      [
        "Kütle yok olduğu için erimez",
        "İşleme güçlüğünü atom/kütle yok olması sanır.",
      ],
      [
        "Her ağ yapı mutlaka selülozdur",
        "Bir yapı özelliğinden tek madde kimliği çıkarır.",
      ],
    ],
    "Termoplastik davranışı bütün polimer ailesine yaymak.",
    "Özel öğütme veya kimyasal yöntem olasılığı, basit eriyik geri işleme ile aynı değildir.",
  ),
  q025(
    "Bir ürün üzerinde malzeme tanımlama/geri dönüşüm işareti bulunuyor. Bundan hangi sonuç doğrudan çıkarılamaz?",
    "Sembol veya reçine tanımı yerel toplama ve tesis kabulünü tek başına belirlemez.",
    "Tanımlamayı gerçek kabul ve işleme akışından ayır.",
    [
      "İşaret malzemeye ilişkin bilgi verebilir.",
      "Yerel sistem ürün türü, kirlilik ve katman koşullarına göre kabul kararı verebilir.",
      "Bu yüzden her yerde kesin geri dönüştürülecek sonucu yalnız sembolle kanıtlanmaz.",
    ],
    [
      [
        "Ürünün her yerde kesin geri dönüştürüleceği",
        "Sembolü fiilî süreç garantisi saymaz.",
      ],
      [
        "Malzemenin ayrıştırılmasında işaretin bilgi sağlayabileceği",
        "Tanımlama bilgisi bu amaçla kullanılabilir.",
      ],
      [
        "Tesis kabul koşullarının ayrıca kontrol edilebileceği",
        "Bu gerekli ayrı incelemeyle uyumludur.",
      ],
      [
        "Ürün tasarımının işlenebilirliği etkileyebileceği",
        "Çok katmanlılık ve katkılar bu etkiye örnektir.",
      ],
      [
        "Toplama ile geri kazanımın ayrı aşamalar olduğu",
        "Süreç ayrımı doğrudur; sembolle çelişmez.",
      ],
    ],
    "Bir etiket veya hedefi tamamlanmış geri kazanım kanıtı saymak.",
    "Gerçek sonuç toplanan, kabul edilen ve kazanılan kütlelerle ayrı raporlanır.",
  ),
  q025(
    "500 kg atığın %80’i toplanıyor; toplananın %75’i kabul ediliyor; kabul edilenin %90’ı geri kazanılıyor. Nihai kazanım kaç kilogramdır?",
    "Ardışık verimler kendi aşamasının girdisine uygulanır.",
    "500×0,80×0,75×0,90 çarpımını sırayla hesapla.",
    [
      "Toplanan 500×0,80=400 kg’dır.",
      "Kabul edilen 400×0,75=300 kg’dır.",
      "Geri kazanılan 300×0,90=270 kg olur.",
    ],
    [
      ["270", "Üç aşamanın çarpımını doğru uygular."],
      ["400", "Toplananı tümüyle geri kazanılmış sayar."],
      ["300", "İşleme kaybını uygulamadan kabul miktarında durur."],
      ["450", "Yalnız son %90’ı başlangıca uygular."],
      ["1225", "Üç yüzdeyi toplayıp %245 gibi uygular."],
    ],
    "Toplama başarısını nihai ürün başarısıyla eşitlemek.",
    "Nihai başlangıç payı 270/500=%54’tür; 500−270=230 kg bu ürüne dönmemiştir.",
  ),
  q025(
    "240 kg atıktan 180 kg toplanıyor,144 kg tesise kabul ediliyor ve 108 kg geri kazanılıyor. Başlangıca göre nihai geri kazanım oranı nedir?",
    "Nihai oran, son kazanımı başlangıç atığına böler.",
    "108 kg’ı hangi toplamla kıyasladığını açık tut.",
    [
      "Başlangıç paydası 240 kg’dır.",
      "Nihai kazanım 108 kg olduğundan 108/240=0,45 bulunur.",
      "Başlangıca göre oran %45’tir; 108/144 ise yalnız son aşama verimidir.",
    ],
    [
      ["%45", "Son ürünü doğru başlangıç paydasına böler."],
      ["%75", "108/144 son aşama verimini toplam oran sanır."],
      ["%60", "108/180 ile toplama sonrası payı kullanır."],
      ["%80", "144/180 kabul oranında durur."],
      [
        "%135",
        "108/180=%60 ile 108/144=%75 oranlarını toplar; farklı paydalı aşama oranları toplam nihai oran değildir.",
      ],
    ],
    "Yüzde verilirken hangi aşamanın paydasının kullanıldığını belirtmemek.",
    "Toplama %75, kabul %80, işleme %75 çarpımı yine %45 verir.",
  ),
  q025(
    "İlk malzeme talebi 400 kg. Talebin %10’u önleniyor; kalanın %20’si yeniden kullanımla karşılanıyor. Diğer aşamalara gidecek atık adayı kaç kilogramdır?",
    "Yeniden kullanım yüzdesi önleme sonrası kalan miktara uygulanmıştır.",
    "Önce 400’den %10 çıkar, sonra kalanın %20’sini ayır.",
    [
      "Önlenen 40 kg; kalan 360 kg’dır.",
      "Yeniden kullanım 360×0,20=72 kg’dır.",
      "Atık adayı 360−72=288 kg bulunur.",
    ],
    [
      ["288", "İkinci yüzdeyi 360 kg paydasına uygular."],
      ["280", "%10 ve %20’yi başlangıç üzerinde doğrudan toplar."],
      ["320", "Önlemeyi atlayıp yalnız yeniden kullanım yüzdesini kullanır."],
      ["360", "Yeniden kullanımı hesaba katmaz."],
      ["72", "Yeniden kullanılanı atık miktarı sanır."],
    ],
    "Sıralı iki yüzdeyi aynı başlangıç tabanındaymış gibi işlemek.",
    "40 kg önleme+72 kg yeniden kullanım+288 kg aday=400 kg’dır.",
  ),
  q025(
    "50 kg malzeme geri kazanılmıştır; ürün kalitesi nedeniyle her 1 kg kazanım yalnız 0,80 kg yeni ham maddeyi ikame ediyor. İkame edilen yeni ham madde kaç kilogramdır?",
    "Kazanılan kütle ile yeni ham madde ikamesi kalite oranıyla farklılaşabilir.",
    "50 kg kazanıma 0,80 ikame katsayısını uygula.",
    [
      "Geri kazanılan gerçek kütle 50 kg’dır.",
      "Yeni ham madde karşılığı 50×0,80 olarak verilir.",
      "İkame 40 kg’dır; bu sonuç gerçek 50 kg kütlenin kaybolduğu anlamına gelmez.",
    ],
    [
      ["40", "Kaliteye bağlı 0,80 ikame katsayısını doğru uygular."],
      ["50", "Her durumda 1:1 ikame varsayar."],
      ["62,5", "Verilen çarpanı ters bölerek fazla ikame çıkarır."],
      ["10", "İkame farkını ikame miktarı sanır."],
      ["0", "Alt kaliteyi hiçbir kullanım değeri yok diye yorumlar."],
    ],
    "Geri kazanılmış her kilogramı koşulsuz aynı kaliteli yeni ürün kilogramıyla eşitlemek.",
    "İkame bir hizmet/kalite hesabıdır; kütle bilançosunda kazanım yine 50 kg olarak kalır.",
  ),
  q025(
    "Kâğıt liflerinin aynı kalitede sınırsız geri dönüşememesinin en uygun açıklaması hangisidir?",
    "Lif kısalması, kirlilik ve ayıklama kayıpları süreç kalitesini sınırlar.",
    "Maddenin korunmasını işlevsel kalitenin aynen korunmasından ayır.",
    [
      "Hamurlaştırma ve işlemler liflerin boyut/kalitesini etkileyebilir.",
      "Kirleticiler ve uygun olmayan parçalar ayrılırken kütle kaybı da oluşabilir.",
      "Bu nedenle bütün liflerin sonsuz aynı kaliteli döngüsü varsayılamaz.",
    ],
    [
      [
        "Lifler kısalabilir ve süreçte kirlilik/kayıp oluşabilir",
        "Kalite ve aşama verimi sınırlarını açıklar.",
      ],
      [
        "Selüloz atomları her döngüde tamamen yok olur",
        "Kütle korunumunu bozarak açıklama yapar.",
      ],
      [
        "Kâğıt hiçbir zaman geri kazanılamaz",
        "Uygun geri dönüşüm yollarını tümden reddeder.",
      ],
      [
        "Geri dönüşen her kâğıt otomatik saf metal olur",
        "Malzeme türünü element dönüşümüyle değiştirir.",
      ],
      [
        "Bütün kâğıt ürünleri katkısız aynı saflıktadır",
        "Kaplama ve ürün bileşimi farklarını siler.",
      ],
    ],
    "Atomların korunmasını ürünün mekanik özelliklerinin değişmemesi sanmak.",
    "Yeni lif ve uygun katkı ihtiyacı gerçek ürün/tesis koşuluna göre değerlendirilir.",
  ),
  q025(
    "Metallerin geri dönüşümü için hangi ifade doğrudur?",
    "Metal türü korunabilse de alaşım, kirlilik ve oksitlenme kalite/verim etkiler.",
    "Atom kimliğini süreçteki ürün uygunluğu ve kayıplardan ayır.",
    [
      "Ergitme metal atomunu başka elemente dönüştürmez.",
      "Farklı alaşım ve kirleticiler uygun ürün kalitesini bozabilir.",
      "Bu nedenle ayrı toplama ve uygun işleme, verim ve kalite için önemlidir.",
    ],
    [
      [
        "Alaşım ve kirlenme kontrolü kaliteyi etkiler",
        "Madde kimliğiyle ürün kalitesini ayrı tutar.",
      ],
      [
        "Her metal atığı ayrılmadan her üründe aynen kullanılabilir",
        "Uyumsuz alaşım ve safsızlıkları yok sayar.",
      ],
      [
        "Metal atomları eritilince başka element olur",
        "Fiziksel işlemi nükleer element değişimi sanır.",
      ],
      [
        "Oksit/cüruf kaybı hiçbir tesiste olamaz",
        "Süreç kaybını koşulsuz reddeder.",
      ],
      [
        "Bütün metal atıkları sıradan karışık akışta güvenle işlenir",
        "Tehlikeli bileşen taşıyan atıkların özel akışını dışlar.",
      ],
    ],
    "Metal geri dönüştürülebilir bilgisini kayıpsız ve kalite koşulsuz bir garanti yapmak.",
    "Aynı işlevde ikame ve enerji kazancı açık malzeme/tesis verisiyle değerlendirilir.",
  ),
  q025(
    "Varsayımsal üretim verileriyle PET ürün için birincil enerji 20 kWh/kg, uygun geri kazanılmış girdili enerji 6 kWh/kg’dır.10 kg aynı kaliteli ürünün üretim sınırındaki enerji azalması kaç kWh’dir?",
    "Aynı ürün kütlesi için iki kWh/kg yoğunluğu ayrı uygulanır.",
    "10 kg için 20 ile 6 arasındaki farkı çarp.",
    [
      "Birincil üretim 10×20=200 kWh’tir.",
      "Geri kazanılmış üretim 10×6=60 kWh’tir.",
      "Azalma 200−60=140 kWh olur.",
    ],
    [
      ["140", "Aynı kütle için iki üretim yolunun farkını verir."],
      ["200", "Geri dönüşüm enerjisini sıfır sayar."],
      ["60", "Azalma yerine yeni üretim tüketimini verir."],
      ["14", "Kilogram başına farkı 10 kg ile çarpmaz."],
      ["260", "İki tüketimi fark yerine toplar."],
    ],
    "Geri kazanımın enerji girdisini yok kabul etmek.",
    "Veriler varsayımsaldır; toplama/taşıma gibi dışlanan aşamaların tüm yaşam döngüsü etkisi bu sayıyla kanıtlanmaz.",
  ),
  q025(
    "Yeniden kullanılan kabın üretim etkisi 12 birim, her kullanım temizliği 0,20 birim; tek kullanımlığın etkisi 2 birim/kullanımdır.10 kullanım için doğru karşılaştırma hangisidir?",
    "Yeniden kullanımda üretim bir kez, temizlik her kullanımda sayılır.",
    "12+10×0,20 ile 10×2’yi hesapla.",
    [
      "Yeniden kullanım etkisi 12+2=14 birimdir.",
      "Tek kullanımlık etkisi 20 birimdir.",
      "Verilen aynı etki ölçütünde yeniden kullanım 6 birim daha azdır.",
    ],
    [
      [
        "14’e karşı 20 birim; yeniden kullanım 6 birim az",
        "İlk üretim ile her kullanım temizliğini doğru sayar.",
      ],
      [
        "2’ye karşı 20 birim; yeniden kullanım 18 birim az",
        "Başlangıç üretim etkisini atlar.",
      ],
      [
        "122’ye karşı 20 birim",
        "Üretim etkisini her kullanımda yeniden ekler.",
      ],
      ["12’ye karşı 2 birim", "Kullanım sayısını iki tarafta da ihmal eder."],
      [
        "İkisi zorunlu eşit; çünkü aynı işlevdir",
        "Aynı işlevi aynı etkiyle eşitler; verilen katsayıları yok sayar.",
      ],
    ],
    "Tek kullanım başına temizliği toplam temizlik sanmak.",
    "Sonuç yalnız belirtilen etki ve işlev içindir; gerçek ömür ve diğer etkiler ayrıca gerekir.",
  ),
  q025(
    "Yeniden kullanılan ürünün başlangıç üretim etkisi pozitiftir. Her kullanım temizliği, tek kullanımlık ürünün kullanım başına etkisine eşit veya daha büyüktür. Bu basit modelde hangi sonuç çıkar?",
    "R+n·w ilen·s karşılaştırmasında R>0 ve w≥s ise ilk ifade daha büyüktür.",
    "Farkı R+n(w−s) biçiminde yaz.",
    [
      "Yeniden kullanım eksi tek kullanım farkı R+n(w−s)’dir.",
      "R pozitiftir; w−s de sıfır veya pozitiftir.",
      "Bu yüzden daha çok kullanım bu verilen ölçütte başa baş/üstünlük sağlamaz.",
    ],
    [
      [
        "Bu verilerle kullanım sayısını artırmak üstünlük sağlamaz",
        "Pozitif farkın işaretini korur.",
      ],
      [
        "Her zaman bir kullanımda başa baş olur",
        "Pozitif üretim etkisini yok sayar.",
      ],
      [
        "Verimler toplanınca negatif etki oluşur",
        "Etki denklemine olmayan verim toplamı ekler.",
      ],
      [
        "n arttıkça bütün üretim etkisi otomatik sıfırlanır",
        "Bir defalık pozitif etkiyi matematiksel olarak siler.",
      ],
      [
        "Yeniden kullanım bütün gerçek koşullarda daima kötüdür",
        "Verilen tek ölçüt modelini bütün olası koşullara yayar.",
      ],
    ],
    "Çok tekrarın koşullardan bağımsız çevresel üstünlük sağladığını varsaymak.",
    "Sonuç modelin R, w, s verilerine bağlıdır; başka ürün veya temizlik koşulu ayrı sonuç verebilir.",
  ),
  q025(
    "200 kg uygun malzeme iki ardışık döngüde ayrı ayrı %90 kütle verimiyle kazanılıyor; ara yeni girdi yok. İkinci döngü çıkışı kaç kilogramdır?",
    "İkinci döngü verimi ilk döngüden kalan miktara uygulanır.",
    "200×0,90² hesapla.",
    [
      "İlk döngü 200×0,90=180 kg verir.",
      "İkinci döngü 180×0,90=162 kg verir.",
      "Toplam 38 kg bu ürün akışına dönmemiştir.",
    ],
    [
      ["162", "Ardışık iki verimi doğru çarpar."],
      ["180", "İlk döngü çıkışında durur."],
      ["160", "Her döngüde başlangıçtan 20 kg çıkarıp aynı kaybı varsayar."],
      ["200", "Kayıpları yok sayar."],
      ["360", "İki döngünün çıkışlarını yeni kütle gibi toplar."],
    ],
    "Her aşamanın yeni girdisi yerine başlangıç miktarını tekrar kullanmak.",
    "200−162=38 kg fark, kütlenin yok olması değil başka akışlara ayrılmasıdır.",
  ),
  q025(
    "Bir tesis plastik atığı yakıp ısı elde ediyor; polimeri yeni ham madde olarak geri kazanmıyor. İşlemin en doğru adı hangisidir?",
    "Atıktan enerji elde etmek malzeme geri dönüşümünden farklıdır.",
    "Son çıktının malzeme mi enerji mi olduğuna bak.",
    [
      "Başlangıçtaki polimer yanmayla başka kimyasal ürünlere dönüşür.",
      "Hedef çıktı ısıdır; aynı polimer ham maddesi kazanılmamıştır.",
      "Bu işlem enerji geri kazanımı olarak adlandırılabilir.",
    ],
    [
      ["Enerji geri kazanımı", "Isı çıktısını malzeme döngüsünden ayırır."],
      [
        "Ürünün aynı biçimde yeniden kullanımı",
        "Ürün yanıp dönüşmüştür; biçimi korunmaz.",
      ],
      [
        "Kayıpsız mekanik polimer geri dönüşümü",
        "Yanma yerine eritme/şekillendirme varmış gibi yorumlar.",
      ],
      [
        "Yalnız kaynakta azaltım",
        "Atık oluşumunu önleme işlemi verilmemiştir.",
      ],
      ["Nükleer füzyon", "Kimyasal yanmayı çekirdek birleşmesiyle karıştırır."],
    ],
    "Atıktan yarar elde edilen her işlemi aynı malzeme geri dönüşümü saymak.",
    "Üretimin emisyonları ve diğer etkiler enerji kazancı yanında ayrı değerlendirilir.",
  ),
  q025(
    "Bir ürün için yalnız fabrika üretim enerjisinde %30 azalma ölçülmüş; taşıma, temizlik, ömür ve atık aşamaları çalışılmamıştır. Hangi sonuç güvenle söylenir?",
    "Sonuç ölçülen sistem sınırı ve ölçütüyle sınırlandırılır.",
    "Verilen enerji sonucunu çalışılmayan aşamalara genişletme.",
    [
      "Ölçüm fabrika üretim enerjisini kapsar.",
      "Diğer yaşam döngüsü aşamalarında veri yoktur.",
      "Bu nedenle doğrulanan iddia yalnız üretim enerjisindeki %30 azalmadır.",
    ],
    [
      [
        "Belirtilen üretim sınırında enerji %30 azalmıştır",
        "Ölçümün kapsamını korur.",
      ],
      [
        "Bütün yaşam döngüsü CO₂’si kesin %30 azalmıştır",
        "Enerji ileCO₂’yi ve sınırları verisiz eşitler.",
      ],
      [
        "Ürünün bütün çevresel etkileri sıfır olmuştur",
        "Kısmi azalmadan sıfır toplam etki çıkarır.",
      ],
      [
        "Ürün sonsuz kez kullanılabilir",
        "Ömür bilgisi olmayan sonuçtan sınırsız dayanım çıkarır.",
      ],
      [
        "Geri dönüşümde hiç kütle kaybı kalmamıştır",
        "Üretim enerjisini geri dönüşüm verimi sanır.",
      ],
    ],
    "Tek ölçütteki kısmi gelişmeyi kanıtsız bütün ürün başarısı diye sunmak.",
    "İddianın birimi, işlevi ve ölçülen aşaması açık tutulduğunda sonuç değerlendirilebilir.",
  ),
];

nanoPack025.items = [
  q025(
    "Bir nanometrenin metre cinsinden karşılığı hangisidir?",
    "Nano öneki 10⁻⁹ çarpanıdır.",
    "Milyarda biri ondalık üs olarak yaz.",
    [
      "Bir milyar 10⁹’dur.",
      "Metrenin milyarda biri 1/10⁹ m’dir.",
      "Bu değer 10⁻⁹ m yani 1 nm olur.",
    ],
    [
      ["10⁻⁹ m", "Nano uzunluk ölçeğini doğru verir."],
      ["10⁻⁶ m", "Mikrometre değeridir; bin kat daha büyüktür."],
      ["10⁻³ m", "Milimetre değeridir; bir milyon kat daha büyüktür."],
      ["10⁹ m", "Milyarda bir yerine milyar katı yazar."],
      ["1 m", "Önek etkisini tamamen yok sayar."],
    ],
    "Nano ile mikro öneklerini eşanlamlı kullanmak.",
    "1 m=10⁹ nm dönüşümü de aynı bağıntıyı ters yönde gösterir.",
  ),
  q025(
    "Bir ince tabakanın kalınlığı 0,040μm’dir.1μm=1000 nm ise kalınlık kaç nm’dir?",
    "Mikrometre-nanometre dönüşümünde 1000 çarpanı kullanılır.",
    "0,040 ile 1000’i çarp.",
    [
      "1μm 1000 nm’ye eşittir.",
      "0,040μm×1000=40 nm bulunur.",
      "40 nm yaklaşık 1–100 nm öğretim aralığında bir kalınlıktır.",
    ],
    [
      ["40", "Mikrometreyi nanometreye doğru çarpar."],
      ["0,000040", "Ters yönde 1000’e böler."],
      ["40000", "1000 yerine bir milyon çarpar."],
      ["0,040", "Sayısal değeri birim değişimine rağmen sabit bırakır."],
      ["4", "Ondalık yeri bir basamak eksik taşır."],
    ],
    "Küçük birime geçerken sayının büyüdüğünü unutmak.",
    "40 nm×10⁻³μm/nm=0,040μm ile geri dönüş kapanır.",
  ),
  q025(
    "Bir kaplamanın genişliği 1 mm, uzunluğu 2 mm, kalınlığı 20 nm olarak ölçülüyor. En az bir boyutu yaklaşık 1–100 nm olan yapı ölçütüne göre doğru yorum hangisidir?",
    "Nano ölçütü üç boyutun da nano olmasını gerektirmez.",
    "Verilen üç uzunluktan nano aralığındakini seç.",
    [
      "Genişlik ve uzunluk milimetre ölçeğindedir.",
      "Kalınlık 20 nm ile verilen nano aralığındadır.",
      "Bu nedenle yapı nano kalınlıklı kaplama olabilir; makro genişlik bunu dışlamaz.",
    ],
    [
      [
        "Kalınlığı nano ölçektedir; diğer boyutların büyük olması bunu dışlamaz",
        "En az bir boyut koşulunu uygular.",
      ],
      [
        "Üç boyut da nano olmadığı için hiçbir nano özellik incelenemez",
        "Ölçütü gereksiz üç boyut zorunluluğuna çevirir.",
      ],
      [
        "1 mm ile 20 nm aynı uzunluktur",
        "Milimetre ve nanometre ölçeklerini eşitler.",
      ],
      [
        "Kaplama yalnız bir atomdan oluşmak zorundadır",
        "Boyut ölçüsünden atom sayısını verisiz çıkarır.",
      ],
      [
        "Nano kalınlık her hastalığı iyileştirdiğini kanıtlar",
        "Boyut bilgisini klinik başarıya taşır.",
      ],
    ],
    "Bütün ürünün bir nano tanecik olmasıyla nano kalınlıklı bir katmanı karıştırmak.",
    "Boyut ölçütü bir yapısal bilgidir; özellik ve işlev iddiaları ayrıca sınanır.",
  ),
  q025(
    "Kenar uzunluğu 40 nm olan bir küpte toplam alan 6 a², hacim a³’tür. Yüzey/hacim oranı kaç nm⁻¹ olur?",
    "Küp için alan/hacim 6/a olarak sadeleşir.",
    "6’yı 40 nm’ye böl.",
    [
      "6 a²/a³=6/a bağıntısı kurulur.",
      "a=40 nm için 6/40=0,15 bulunur.",
      "Alan/hacim birimi nm²/nm³=nm⁻¹’dir.",
    ],
    [
      ["0,15", "6/40 oranını ve ters uzunluk birimini korur."],
      ["240", "6×40 hesaplayıp bölmeyi ters uygular."],
      ["6", "Kenar uzunluğunu hesaba katmaz."],
      ["1600", "Tek yüz alanı a²=40²=1600 nm²’yi yüzey/hacim oranı sanır."],
      ["64000", "Hacmi oran sanır."],
    ],
    "Alan/hacim oranını tek başına alan veya hacim değeri gibi okumak.",
    "Kenar yarıya inse 6/a iki kat olur; burada geometri dışında kimyasal hız hesaplanmamıştır.",
  ),
  q025(
    "240 nm kenarlı ideal küp, her eksende 4 eş parçaya bölünüyor. Kayıp yok ve parçalar ayrık. Parça sayısı ve küçük kenar hangisidir?",
    "Üç eksende k bölme k³ parça ve a/k kenar verir.",
    "4’ün küpünü ve 240/4’ü ayrı bul.",
    [
      "Parça sayısı 4³=64’tür.",
      "Her küçük küpün kenarı 240/4=60 nm’dir.",
      "64×60³=240³ olduğundan toplam hacim korunur.",
    ],
    [
      ["64 parça; 60 nm", "Üç boyutlu sayı ile doğrusal kenarı ayrı hesaplar."],
      ["4 parça; 60 nm", "Yalnız bir eksendeki bölmeyi toplam parça sayar."],
      ["16 parça; 60 nm", "İki eksenin karesinde durur."],
      ["64 parça; 960 nm", "Kenar bölme yerine dörtle çarpar."],
      [
        "64 parça; 15 nm",
        "Doğrusal kenarı 4 yerine 4²=16’ya böler: 240/16=15 nm.",
      ],
    ],
    "Parça sayısı ile eksen başına bölme sayısını eşitlemek.",
    "Küçük kenar 60 nm olsa da her parçanın çok sayıda atom içermesi mümkündür.",
  ),
  q025(
    "200 nm kenarlı ideal küp her eksende 5 eş parçaya ayrılıyor. Parçalar tamamen ayrık ve yeni yüzeyler erişilebilir. Toplam hacim ve toplam dış alan için doğru ifade hangisidir?",
    "İdeal küp bölmede hacim aynı, toplam alan k kat kalır.",
    "k³ küçük hacimleri ve k kat alan bağıntısını kullan.",
    [
      "Küçük kenar 200/5=40 nm, parça sayısı 125’tir.",
      "125×40³=200³ ile hacim değişmez.",
      "Toplam alan başlangıcın 5 katına çıkar.",
    ],
    [
      [
        "Hacim aynı; alan 5 kat",
        "Toplam hacim korunumu ile alan artışını ayırır.",
      ],
      [
        "Hacim 5 kat; alan aynı",
        "İçteki yüzeylerin açılmasını ve hacim korunmasını ters yorumlar.",
      ],
      [
        "Hacim 125 kat; alan 25 kat",
        "Parça sayısını toplam hacim çarpanı sanır.",
      ],
      [
        "Hacim 1/5; alan 1/5",
        "Toplam yerine tek parça kenar oranını bütün niceliklere uygular.",
      ],
      [
        "Hacim ve alan zorunlu sıfır",
        "Küçülmeyi madde ve yüzeyin yokluğu sanır.",
      ],
    ],
    "Tek parçanın küçülen hacmini bütün örneğin hacmiyle karıştırmak.",
    "Parçalar kümelenip yüzey kapanırsa erişilebilir alan ideal toplamdan daha düşük olabilir.",
  ),
  q025(
    "Aynı yoğunluktaki saf bir katı, kayıpsız küçük parçalara ayrılıyor. Kimyasal bileşim değişmiyor. Hangi nicelik zorunlu korunur?",
    "Kayıpsız fiziksel bölmede toplam kütle korunur.",
    "Parça başına değerle toplam değeri ayır.",
    [
      "Her parçanın kütlesi başlangıç bütününden küçüktür.",
      "Parçalar kayıpsız toplandığı için kütleleri toplamı başlangıca eşittir.",
      "Dolayısıyla toplam kütle korunur; parça sayısı ve toplam alan değişebilir.",
    ],
    [
      ["Toplam kütle", "Kayıpsız bölmenin madde bilançosunu korur."],
      [
        "Her parçanın başlangıçla aynı kütlesi",
        "Birçok parçaya bölünmeyle çelişir.",
      ],
      ["Parça sayısının bir kalması", "Bölünmeyi yok sayar."],
      [
        "Toplam dış alanın kesin aynı kalması",
        "Yeni erişilebilir yüzey açılmasını dışlar.",
      ],
      [
        "Bütün parçacıkların başka elemente dönüşmesi",
        "Fiziksel küçültmeye nükleer element değişimi ekler.",
      ],
    ],
    "Daha küçük parçaların toplamının da daha az madde olduğu sonucuna atlamak.",
    "Gerçek öğütmede kayıp ölçülürse ayrı akış yazılır; bu kart kayıp olmadığını açıkça belirtmiştir.",
  ),
  q025(
    "Bir küresel parçacık, aynı malzemeden yarıçapı başlangıcın 1/3’ü olan eş kürelere kayıpsız ayrılıyor. Küre hacmi r³, alanı r² ile orantılı. Toplam hacim sabitse kaç küçük küre ve kaç kat toplam alan oluşur?",
    "Tek küçük kürenin hacmi 1/27, alanı 1/9 olur.",
    "Hacmi koruyan sayıyı bulup alan payıyla çarp.",
    [
      "Aynı hacmi sağlamak için 27 küçük küre gerekir.",
      "Her birinin alanı başlangıcın 1/9’udur.",
      "Toplam alan 27×1/9=3 kat olur.",
    ],
    [
      ["27 küre; 3 kat alan", "Hacim ve alan üslerini doğru birleştirir."],
      ["3 küre; 3 kat alan", "Yalnız yarıçap oranını parça sayısı sanır."],
      ["9 küre; 3 kat alan", "Alan payını hacim payı gibi kullanır."],
      [
        "27 küre; 9 kat alan",
        "Tek alan payının tersini toplam alan sonucu sanır.",
      ],
      [
        "27 küre; 27 kat alan",
        "Her küçük kürenin küçülen alanını hesaba katmaz.",
      ],
    ],
    "Yarıçap, alan ve hacim oranlarını aynı güçte sanmak.",
    "27×1/27=1 toplam hacim payını,27×1/9=3 toplam alan payını verir.",
  ),
  q025(
    "Basit 5×5×5 nokta küpünde iç nokta sayısı(5−2)³ olarak tanımlanıyor. Sınırdaki noktalar kaç tanedir?",
    "Sınır sayısı toplam n³ eksi iç(n−2)³’tür.",
    "125’ten 27’yi çıkar.",
    [
      "Toplam 5³=125 nokta bulunur.",
      "İç noktalar 3³=27’dir.",
      "Sınır 125−27=98 noktadır.",
    ],
    [
      ["98", "Toplamdan içi çıkararak kenar/köşe tekrarını önler."],
      ["150", "Altı yüz×25 sayarken ortak kenar/köşeleri tekrarlar."],
      ["27", "İç sayısını sınır diye verir."],
      ["125", "İç noktaları da yüzeyde sayar."],
      [
        "75",
        "125−2×25=75 hesabında gerçek 27 iç nokta yerine iki 25’lik yüzü çıkarır.",
      ],
    ],
    "Bir kenar noktasının iki yüzde görünmesini iki farklı nokta sanmak.",
    "98+27=125; bu basit nokta modeli gerçek her kristalin atom örgüsü değildir.",
  ),
  q025(
    "Basit n×n×n nokta modelinde sınır payı 1−(n−2)³/n³’tür. n=4 ile n=8 karşılaştırmasında hangi küpün sınır payı büyüktür?",
    "Daha küçük eş biçimli küpte sınırın toplam içindeki payı büyür.",
    "İki kesri toplam nokta paydasıyla ayrı hesapla.",
    [
      "n=4 için sınır 64−8=56; pay 56/64=%87,5’tir.",
      "n=8 için sınır 512−216=296; pay 296/512≈%57,8’dir.",
      "Bu nedenle n=4 küçük küpünün sınır payı daha büyüktür.",
    ],
    [
      [
        "n=4; yaklaşık %87,5’e karşı %57,8",
        "Sınır sayısı ile sınır oranını ayrı tutar.",
      ],
      [
        "n=8; çünkü 296>56",
        "Daha büyük mutlak sınır sayısını daha büyük oran sanır.",
      ],
      [
        "İkisi aynı; ikisi de küptür",
        "Ölçek değişiminin yüzey payını etkilemesini yok sayar.",
      ],
      [
        "n=4; çünkü bütün 64 nokta sınırdadır",
        "Doğru yönü yanlış iç nokta sayımıyla gerekçelendirir.",
      ],
      ["n=8; çünkü iç noktası yoktur", "8 küpündeki 216 iç noktayı siler."],
    ],
    "Mutlak yüzey sayısının büyümesini yüzey payının büyümesi sanmak.",
    "Büyük küp daha çok yüzey noktası taşıyabilir ama toplamı daha hızlı büyür.",
  ),
  q025(
    "Basit 5×5×5 nokta küpünün ortadaki z=3 katmanı inceleniyor. Bir nokta herhangi bir koordinatta dış sınırdaysa yüzey sayılıyor. Bu 25 noktalı orta katmanda kaç yüzey noktası vardır?",
    "Orta katmanda z sınırda değildir; yalnız x/y çevresi sınırdır.",
    "5×5 kareden 3×3 iç kareyi çıkar.",
    [
      "Katmanda toplam 25 nokta vardır.",
      "x veya y sınırına değmeyen iç kare 3×3=9 noktadır.",
      "Yüzey noktaları 25−9=16’dır; dış z katmanı seçilseydi 25 olurdu.",
    ],
    [
      ["16", "Orta katmanın çevresini tekrar etmeden sayar."],
      ["25", "Orta z katmanını dış yüzey katmanı sanır."],
      ["9", "İç kareyi yüzey olarak verir."],
      ["20", "Dört kenarı 5’er sayıp köşeleri iki kez sayar."],
      ["0", "z ortada diye x/y sınırlarını da yok sayar."],
    ],
    "Tek bir koordinat ortada olunca noktanın hiçbir yüzeyde olamayacağını düşünmek.",
    "Dört kenarda 4×5−4=16 sayımı da köşe tekrarları çıkarıldığında aynı sonucu verir.",
  ),
  q025(
    "Nano parçacıklar ayrık durumdan sıkı kümeler hâline geliyor; birçok yüzey birbirine temas ederek kapanıyor. Hangi yorum uygundur?",
    "Geometrik toplam yüzey ile çevreye erişilebilir etkin yüzey farklılaşabilir.",
    "Kümelenmeyle kapanan temas bölgelerini düşün.",
    [
      "Ayrık parçaların toplam geometrik yüzeyi büyüktür.",
      "Kümede temas yüzeylerine dış moleküller ulaşamayabilir.",
      "Bu nedenle erişilebilir yüzey ideal ayrık parçacık hesabından küçük olabilir.",
    ],
    [
      [
        "Erişilebilir yüzey ideal ayrık hesaplamadan azalabilir",
        "Kapanan temas bölgelerini hesaba katar.",
      ],
      ["Bütün atomlar yok olur", "Kümelenmeyi kütle yok olması sanır."],
      [
        "Her koşulda kimyasal hız kesin sonsuz olur",
        "Yüzey etkisini ölçülmemiş sınırsız kinetik iddiaya çevirir.",
      ],
      [
        "Kümelenme her zaman yeni element üretir",
        "Fiziksel bir araya gelmeyi çekirdek dönüşümü sayar.",
      ],
      [
        "Yüzey erişimi parçacık düzeninden bağımsızdır",
        "Temasla kapanma bilgisini reddeder.",
      ],
    ],
    "Yalnız parça boyutundan tüm yüzeyin etkin olduğu sonucunu çıkarmak.",
    "Kümelenme etkisi malzeme/ortama bağlıdır; basit küp modeli tüm yeni yüzeyler açık varsayımını ayrıca yazar.",
  ),
  q025(
    "Bir katalizör örneğinde geometrik yüzey alanı iki katına çıktı. Başka yüzey kimyası veya hız ölçümü yok. Hangi sonuç tek başına kanıtlanamaz?",
    "Geometri tek başına tam kinetik sonuç vermez.",
    "Alan oranını etkin yer ve ölçülen hızdan ayır.",
    [
      "Geometrik alan artışı daha çok etkileşim yeri olanağı sağlayabilir.",
      "Etkin yer kimyası, erişim, derişim ve sıcaklık ayrıca hızı etkiler.",
      "Dolayısıyla tepkime hızı kesin iki kat oldu sonucu yalnız alanla kanıtlanmaz.",
    ],
    [
      [
        "Tepkime hızının kesin iki katına çıktığı",
        "Alan artışını ölçülmemiş kesin hız katsayısına dönüştürmez.",
      ],
      ["Geometrik alanın iki kat olduğu", "Bu zaten verilen ölçüm bilgisidir."],
      ["Hızın ayrıca ölçülebileceği", "Bu mümkün bir doğrulama yoludur."],
      [
        "Etkin yüzey koşullarının incelenebileceği",
        "Verilen eksik bilgiyi tamamlamaya uygun bir adımdır.",
      ],
      [
        "Parçacık düzeninin erişimi etkileyebileceği",
        "Bu bilimsel olasılık alan bilgisini tamamlar.",
      ],
    ],
    "Yüzey oranını bütün koşullarda doğrudan hız oranı saymak.",
    "Aynı koşullarda ölçülen hız ve etkin yüzey verisi iddiayı ayrı sınamalıdır.",
  ),
  q025(
    "Bir adsorbanın erişilebilir alanı 3 m²/g ve ideal yükleme kapasitesi 1,5 mg/m²’dir.5 g örneğin bütün yüzeyi erişilebilir kabul edilirse toplam kapasite kaç mg’dır?",
    "Toplam kapasite=kütle×özgül alan×alan başına yüklemedir.",
    "Önce 15 m² toplam alanı, sonra kirletici kütlesini bul.",
    [
      "5 g×3 m²/g=15 m² alan vardır.",
      "15 m²×1,5 mg/m²=22,5 mg bulunur.",
      "Bu değer verilen ideal doygunluk/erişim varsayımının kapasitesidir.",
    ],
    [
      ["22,5", "İki yoğunluğu örnek kütlesiyle doğru çarpar."],
      ["4,5", "Örnek kütlesini çarpmadan gram başına değerde durur."],
      ["7,5", "Özgül alanı atlayıp 5×1,5 hesaplar."],
      ["15,0", "Toplam alanı kirletici mg değeri sanır."],
      ["45,0", "Yükleme katsayısını gerekçesiz ikiye katlar."],
    ],
    "m²/g ile toplam m²’yi veya mg/m² ile toplam mg’yi karıştırmak.",
    "Birimler g×m²/g×mg/m²=mg olarak sadeleşir; adsorpsiyon kirletici atomlarını yok etmez.",
  ),
  q025(
    "Bir parçacığın çapı 50 nm ölçülmüş, element ve atom dizilişi verilmemiştir. Atom sayısı için hangi yorum uygundur?",
    "Boyut tek başına atom sayısı değildir; malzeme ve yapı bilgisi gerekir.",
    "Nanometreyi uzunluk birimi olarak tut.",
    [
      "50 nm bir uzunluktur.",
      "Atom sayısı için yoğunluk, bileşim, şekil ve örgü gibi bilgiler gerekir.",
      "Bu nedenle yalnız 50 nm’den kesin 50 atom veya tek atom sonucu çıkarılamaz.",
    ],
    [
      [
        "Kesin atom sayısı için ek malzeme ve yapı bilgisi gerekir",
        "Uzunluk ile tanecik sayısını ayırır.",
      ],
      ["Tam 50 atom vardır", "Bir nanometreyi bir atom gibi sayar."],
      ["Tam bir atom vardır", "Nano parçacığı tek atomla eşitler."],
      ["50 mol atom vardır", "Uzunluğu doğrudan mol miktarı yapar."],
      ["Parçacıkta hiç atom bulunmaz", "Maddenin tanecikli yapısını reddeder."],
    ],
    "Nano sözcüğünü en küçük tek tanecik anlamında kullanmak.",
    "Bir nanoparçacık çok sayıda atom içerebilir; aynı çapta farklı malzemeler farklı atom sayısı verebilir.",
  ),
  q025(
    "Saf karbon parçası kimyasal bileşimi değişmeden nano boyuta küçültülüyor. Hangi ifade doğrudur?",
    "Fiziksel küçültme elementin çekirdek kimliğini değiştirmez.",
    "Boyut ve element türünü ayrı değerlendir.",
    [
      "Başlangıç elementinin atomları C’dir.",
      "Küçültme ile boyut, yüzey ve bazı özellikler değişebilir.",
      "Verilen fiziksel işlem C’yi Au veya başka elemente dönüştürmez.",
    ],
    [
      [
        "Karbon elementi korunur; boyut/yüzey özellikleri değişebilir",
        "Fiziksel ölçek değişimiyle çekirdek türünü ayırır.",
      ],
      [
        "Karbon otomatik altına dönüşür",
        "Nanoteknolojiye element dönüşümü atar.",
      ],
      [
        "Bütün atom çekirdekleri yok olur",
        "Maddenin korunmasına aykırı sonuç çıkarır.",
      ],
      [
        "Boyut küçüldüğü için toplam kütle zorunlu sıfırlanır",
        "Küçük parçaları madde yokluğu sayar.",
      ],
      [
        "Karbonun bütün örnekleri her ölçekte aynı elektrik özelliğindedir",
        "Boyut/bağ yapısına bağlı özellik olasılıklarını koşulsuz dışlar.",
      ],
    ],
    "Atom düzenini kontrol etme fikrini çekirdek elementini sınırsız değiştirme olarak okumak.",
    "Yeni karbon yapıları farklı bağ düzenleri taşıyabilir; bu başka element oldukları anlamına gelmez.",
  ),
  q025(
    "Bazı yarı iletken nano yapıların ışık yayımı boyuta bağlı değişiyor. Bu bulgudan hangi ifade desteklenir?",
    "Boyut bazı malzemelerde elektronik enerji düzeylerini etkileyebilir.",
    "Belirli malzeme bulgusunu evrensel özellik iddiasından ayır.",
    [
      "Ölçüm belirli yarı iletken yapı ve koşula aittir.",
      "Boyutun elektronik/optik davranışa etkisi için malzemeye özgü açıklama kurulabilir.",
      "Bu bulgu bütün nanomalzemelerin aynı renk veya iletkenliği taşıdığı anlamına gelmez.",
    ],
    [
      [
        "Boyutun optik etkisi malzeme ve koşulla değerlendirilir",
        "Bulguyu uygun kapsamda yorumlar.",
      ],
      [
        "Bütün nanomalzemeler zorunlu aynı rengi verir",
        "Tek malzeme sonucunu bütün aileye yayar.",
      ],
      [
        "Boyut değişirse element çekirdeği de mutlaka değişir",
        "Optik etkiye nükleer değişim zorunluluğu ekler.",
      ],
      [
        "Her küçük parçacık otomatik daha güvenlidir",
        "Işık yayımı verisinden toksisite sonucu çıkarır.",
      ],
      [
        "Geometrik alan oranı bütün enerji düzeylerini tek başına verir",
        "Kuantum ve bağ yapısı bilgisini makro geometriye indirger.",
      ],
    ],
    "Bir örneğin boyuta bağlı özelliğini bütün nano ürünlere değişmez yasa yapmak.",
    "Bileşim, şekil, yüzey ve ölçüm koşulu optik sonuçla birlikte kaydedilmelidir.",
  ),
  q025(
    "A yaklaşımı büyük bir yüzeyi daha küçük desenlere işliyor; B yaklaşımı moleküler birimlerden yapı kuruyor. Eşleştirme hangisidir?",
    "Yukarıdan aşağıya küçültme/örüntüleme; aşağıdan yukarıya küçük birimlerle kurmadır.",
    "İki üretimin başlangıç ölçeğini karşılaştır.",
    [
      "A büyük yapıyı küçülten/desenleyen yöndedir.",
      "B küçük birimleri birleştirerek yapı kurar.",
      "A yukarıdan aşağıya, B aşağıdan yukarıya yaklaşımıdır.",
    ],
    [
      [
        "A yukarıdan aşağıya; B aşağıdan yukarıya",
        "Başlangıç ölçeği ve işlem yönünü doğru eşler.",
      ],
      ["A aşağıdan yukarıya; B yukarıdan aşağıya", "İki yönü ters adlandırır."],
      [
        "İkisi de zorunlu nükleer fisyondur",
        "Malzeme işlemine çekirdek bölünmesi ekler.",
      ],
      [
        "İkisi her malzemede sıfır maliyetlidir",
        "Üretim yönteminden evrensel maliyetsizlik çıkarır.",
      ],
      [
        "B’de küçük birimler varsa boyut dağılımı ölçülemez",
        "Ölçüm gereğini yöntem adıyla dışlar.",
      ],
    ],
    "Üretim yaklaşımını tek başına kusursuz veya üstün kalite garantisi saymak.",
    "Boyut dağılımı, saflık, yüzey veölçeklenebilirlik iki yaklaşımda da sınanır.",
  ),
  q025(
    "Bir proje raporu gelecekte hastalıklı dokuyu bulup işlem yapabilecek nano aygıtlar geliştirmeyi hedefliyor. Bu hedefin doğru bilimsel yorumu hangisidir?",
    "Gelecek hedefi ile kontrollü çalışmayla gösterilmiş sonuç farklı kanıt düzeyleridir.",
    "Hedef dilini mevcut başarı garantisine dönüştürme.",
    [
      "Rapor bir geliştirme hedefini belirtmiştir.",
      "Etki, güvenilirlik ve uygun kullanım için belirli çalışmalar gerekir.",
      "Bu cümle bütün hastalıkların bugün tek nano aygıtla kesin çözüldüğünü kanıtlamaz.",
    ],
    [
      [
        "Hedef, mevcut evrensel klinik başarı kanıtı değildir",
        "Araştırma amacı ile gösterilmiş sonucu ayırır.",
      ],
      [
        "Bütün hastalıklar bugün kesin çözülmüştür",
        "Gelecek amacını tamamlanmış genel tedaviye çevirir.",
      ],
      [
        "Nano aygıtlar hiçbir koşulda araştırılamaz",
        "Bir hedefin kanıtlanmamış olmasından araştırma imkânsızlığı çıkarır.",
      ],
      [
        "Aygıt boyutu tek başına doğru dozu belirler",
        "Klinik değişkenleri boyuta indirger.",
      ],
      [
        "Bir laboratuvar görüntüsü bütün insanlarda aynı etkiyi garanti eder",
        "Ölçek vekontrollü çalışma gereğini siler.",
      ],
    ],
    "Kaynakta yapılabilir sözcüğünü her koşulda yapılmış ve kanıtlanmış sonucu saymak.",
    "Ürün, bileşim, doz, hedef ve çalışma koşulları belli olmadan kişisel tedavi sonucu çıkarılmaz.",
  ),
  q025(
    "İki nano parçacığın boyutu aynı; birinin bileşimi, şekli, yüzeyi ve maruziyet dozu diğerinden farklı. Risk için en uygun değerlendirme hangisidir?",
    "Nano risk yalnız boyutla değil malzeme ve maruziyet özellikleriyle değerlendirilir.",
    "Aynı kalan boyutu, değişen diğer risk etkenlerinden ayır.",
    [
      "Boyut iki örnekte eşittir.",
      "Bileşim, şekil, yüzey ve doz farklı olduğundan biyolojik/çevresel etkileşimleri farklı olabilir.",
      "Bu nedenle riskin kesin aynı olduğu veya tüm nano ürünlerin zararsız olduğu söylenemez.",
    ],
    [
      [
        "Risk için bileşim, şekil, yüzey, doz ve maruziyet de incelenir",
        "Boyutu tek belirleyici saymadan veriyi tamamlar.",
      ],
      [
        "Aynı boyut kesin aynı risk demektir",
        "Verilmiş diğer farklılıkları yok sayar.",
      ],
      [
        "Nano olan bütün maddeler koşulsuz zararsızdır",
        "Ölçekten evrensel güvenlilik çıkarır.",
      ],
      [
        "Nano olan bütün maddeler her dozda aynı zararı verir",
        "Malzeme ve doz farkını siler.",
      ],
      [
        "Küçük parçacıklar hiçbir yüzey etkileşimine girmez",
        "Nano yüzeyin etkileşim olasılığını reddeder.",
      ],
    ],
    "Tek boyut sayısını bütün sağlık/çevre verilerinin yerine koymak.",
    "Yarar ve risk belirli malzeme ve kullanım koşulunda değerlendirilir; geometri modeli tek başına toksisite ölçmez.",
  ),
];
const packs025 = [energyPack025, sustainPack025, nanoPack025];
const source025 =
  "MEBİ AYT Kimya, OGM Enerji Kaynakları ve Bilimsel Gelişmeler sunuları ile Dersler Cepte hedef bölümleri karşılaştırılarak yazılmış özgün anlatım, varsayımlı modeller, çözümlü örnekler ve sorular. Resmî sınav sorusu değildir.";
function shuffle025<T>(values: T[], seed: number) {
  const out = [...values];
  let state = seed >>> 0;
  for (let i = out.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const j = state % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
function remap025(q: Item025, target: number, seed: number) {
  const order = shuffle025([1, 2, 3, 4], seed);
  order.splice(target, 0, 0);
  return {
    ...q,
    answer: target,
    options: order.map((i) => q.options[i]),
    guidance: {
      ...q.guidance,
      optionReasons: order.map((i) => q.guidance.optionReasons[i]),
    },
  };
}
export const forge025ChemistryTopics: Record<string, string> =
  Object.fromEntries(packs025.map((p) => [p.id, p.topic]));
export const forge025ChemistryGuides: LessonGuide[] = packs025.map((p) => ({
  id: p.id,
  minutes: p.minutes,
  objectives: p.objectives,
  sections: p.sections,
  examples: p.examples,
  recall: p.recall,
  source: source025,
}));
export const forge025ChemistryLessons: Lesson[] = packs025.map((p, group) => {
  const targets = shuffle025(
    Array.from({ length: p.items.length }, (_, i) => i % 5),
    19777 + group * 353,
  );
  return {
    id: p.id,
    subjectId: "ayt-kimya",
    title: txt(p.title),
    minutes: p.minutes,
    objectives: p.objectives.map(txt),
    body: p.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    source: txt(source025),
    tags: [p.topic, "Özgün öğretim soruları"],
    questions: p.items.map((raw, i) => {
      const q = remap025(raw, targets[i], group * 3911 + i * 87 + 7);
      return {
        id: `f025c-${p.id}-${i + 1}`,
        prompt: txt(q.prompt),
        options: q.options.map(txt),
        answer: q.answer,
        hint: txt(q.hint),
        explanation: txt(q.explanation),
        guidance: q.guidance,
        skill: p.id,
      };
    }),
  };
});
