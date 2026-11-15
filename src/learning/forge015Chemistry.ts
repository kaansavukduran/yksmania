import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";
const clamp = (n: number, a: number, b: number) =>
  Number.isFinite(n) ? Math.min(b, Math.max(a, n)) : a;
export const AVOGADRO015 = 6.02214076e23;
export function microMacroGas(
  n: number,
  molar: number,
  celsius: number,
  pressure: number,
  gas = true,
) {
  const amount = clamp(n, 0, 4),
    M = clamp(molar, 1, 200),
    kelvin = clamp(celsius, 0, 100) + 273.15,
    atm = clamp(pressure, 0.5, 4);
  return {
    amount,
    molar: M,
    mass: amount * M,
    single: M / AVOGADRO015,
    particles: amount * AVOGADRO015,
    kelvin,
    atm,
    volume: gas ? (amount * 22.4 * kelvin) / 273.15 / atm : null,
  };
}
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
export function ethaneBalance(a: number, b: number, c: number, d: number) {
  const values = [a, b, c, d].map((x) => Math.round(clamp(x, 1, 28)));
  const [aa, bb, cc, dd] = values;
  const left = [2 * aa, 6 * aa, 2 * bb],
    right = [cc, 2 * dd, 2 * cc + dd];
  const balanced = left.every((x, i) => x === right[i]);
  return {
    values,
    left,
    right,
    balanced,
    divisor: values.reduce(gcd),
    smallest: balanced && values.reduce(gcd) === 1,
  };
}
export const reaction015Kinds = [
  {
    id: "mg",
    name: "Magnezyumun oksitlenmesi",
    equation: "2 Mg + O₂ → 2 MgO",
    labels: ["Mg", "O₂", "MgO"],
    initial: [8, 4, 0],
    delta: [-2, -1, 2],
    tags: "Yanma, sentez ve redoks; bunlar farklı ölçütlerdir.",
    note: "O₂ tüketilir; Mg 0’dan +2’ye, O 0’dan −2’ye geçer.",
  },
  {
    id: "agcl",
    name: "Gümüş klorür çökmesi",
    equation: "Ag⁺(suda) + Cl⁻(suda) → AgCl(k)",
    labels: ["Ag⁺", "Cl⁻", "AgCl"],
    initial: [4, 4, 0],
    delta: [-1, -1, 1],
    tags: "Çökelme; bu net denklemde redoks yok.",
    note: "Ag⁺ ve Cl⁻ çözeltiden katı örgüye geçer; yükseltgenme basamakları değişmez.",
  },
  {
    id: "acid",
    name: "Kuvvetli asit ve bazın nötralleşmesi",
    equation: "H⁺(suda) + OH⁻(suda) → H₂O(s)",
    labels: ["H⁺", "OH⁻", "Yeni H₂O"],
    initial: [4, 4, 0],
    delta: [-1, -1, 1],
    tags: "Asit-baz / nötralleşme; elektron aktarımı yok.",
    note: "Su ortamının tümünü saymıyoruz; net denklemde yeni oluşan su miktarı gösteriliyor.",
  },
  {
    id: "decomp",
    name: "Potasyum kloratın ayrışması",
    equation: "2 KClO₃ → 2 KCl + 3 O₂",
    labels: ["KClO₃", "KCl", "O₂"],
    initial: [8, 0, 0],
    delta: [-2, 2, 3],
    tags: "Ayrışma ve redoks; O₂ ürün olduğu için oksijen tüketen yanma değil.",
    note: "K ve Cl sayısı korunur; her iki KClO₃ başına üç O₂ oluşur.",
  },
] as const;
export function reactionProcess(kind: string, step: number) {
  const chosen =
      reaction015Kinds.find((x) => x.id === kind) ?? reaction015Kinds[0],
    extent = Math.round(clamp(step, 0, 4));
  return {
    chosen,
    extent,
    amounts: chosen.initial.map((x, i) => x + extent * chosen.delta[i]),
  };
}
export function ammoniaTransfer(value: number, unit: string) {
  const quantity = clamp(value, 0, 12),
    hydrogen =
      unit === "mol"
        ? quantity
        : unit === "litre"
          ? quantity / 22.4
          : quantity / 2,
    ammonia = (hydrogen * 2) / 3;
  return {
    quantity,
    hydrogen,
    nitrogen: hydrogen / 3,
    ammonia,
    mass: ammonia * 17,
    volume: ammonia * 22.4,
    molecules: ammonia * AVOGADRO015,
  };
}
export function ammoniaInventory(
  nitrogenGrams: number,
  hydrogenGrams: number,
  initialProduct: number,
  progress: number,
) {
  const n = clamp(nitrogenGrams, 0, 84) / 28,
    h = clamp(hydrogenGrams, 0, 18) / 2,
    initial = clamp(initialProduct, 0, 34),
    capacity = Math.min(n, h / 3),
    extent = (capacity * clamp(progress, 0, 100)) / 100;
  const limiter =
    n === 0 && h === 0
      ? "none"
      : Math.abs(n - h / 3) < 1e-10
        ? "both"
        : n < h / 3
          ? "nitrogen"
          : "hydrogen";
  return {
    n,
    h,
    initial,
    capacity,
    extent,
    limiter,
    leftN: n - extent,
    leftH: h - 3 * extent,
    newProduct: 34 * extent,
    finalProduct: initial + 34 * extent,
    total: 28 * n + 2 * h + initial,
  };
}
export function solidChange(
  kind: string,
  sample: number,
  purity: number,
  progress: number,
) {
  const mass = clamp(sample, 10, 100),
    pure = (mass * clamp(purity, 10, 100)) / 100,
    inert = mass - pure,
    consumed = (pure * clamp(progress, 0, 100)) / 100,
    remaining = pure - consumed,
    reduction = kind === "reduction";
  const product = consumed * (reduction ? 0.8 : 40 / 24),
    oxygen = consumed * (reduction ? 0.2 : 16 / 24),
    solid = inert + remaining + product;
  return {
    mass,
    pure,
    inert,
    consumed,
    remaining,
    product,
    oxygen,
    solid,
    change: solid - mass,
    water: reduction ? (consumed / 80) * 18 : 0,
    hydrogen: reduction ? (consumed / 80) * 2 : 0,
    reduction,
  };
}
export function yieldAnalysis(
  nitrogenMoles: number,
  hydrogenMoles: number,
  actualGrams: number,
) {
  const n = clamp(nitrogenMoles, 0, 3),
    h = clamp(hydrogenMoles, 0, 9),
    actual = clamp(actualGrams, 0, 102),
    theoretical = Math.min(n, h / 3) * 34;
  return {
    n,
    h,
    actual,
    theoretical,
    percent: theoretical === 0 ? null : (100 * actual) / theoretical,
    inconsistent: actual > theoretical + 1e-9,
  };
}
export function purityFromGas(sample: number, gas: number, recovery: number) {
  const mass = clamp(sample, 10, 100),
    actual = clamp(gas, 0, 44),
    fraction = clamp(recovery, 0, 100) / 100;
  const theory = fraction === 0 ? null : actual / fraction,
    pure = theory === null ? null : (theory / 44) * 100;
  return {
    mass,
    actual,
    fraction,
    theory,
    pure,
    percent: pure === null ? null : (100 * pure) / mass,
    inert: pure === null ? null : mass - pure,
    valid: pure !== null && pure <= mass + 1e-9,
    undefined: theory === null,
  };
}
export function isotopeMean(heavyPercent: number, basis: string) {
  const p = clamp(heavyPercent, 0, 100) / 100,
    heavyAtom = basis === "mass" ? p / 37 / ((1 - p) / 35 + p / 37) : p,
    lightAtom = 1 - heavyAtom;
  return {
    p,
    heavyAtom,
    lightAtom,
    mean: 35 * lightAtom + 37 * heavyAtom,
    protons: 17,
    lightNeutrons: 18,
    heavyNeutrons: 20,
  };
}
export function hydrocarbonMixture(
  total: number,
  carbonDioxide: number,
  measured: boolean,
) {
  const t = clamp(total, 0.1, 2),
    gas = clamp(carbonDioxide, 0, 4),
    ethane = gas - t,
    methane = 2 * t - gas,
    valid = measured && methane >= -1e-10 && ethane >= -1e-10;
  return {
    total: t,
    gas,
    ethane,
    methane,
    valid,
    determined: measured,
    mass: valid ? 16 * methane + 30 * ethane : null,
    water: valid ? 2 * methane + 3 * ethane : null,
    oxygen: valid ? 2 * methane + 3.5 * ethane : null,
  };
}
export const mixture015Kinds = [
  ["salt", "NaCl ve su"],
  ["sugar", "Şeker ve su"],
  ["sand", "Kum ve su"],
  ["oil", "Yağ ve su"],
  ["colloid", "Tipik kolloid ve su"],
] as const;
export function dissolutionModel(
  kind: string,
  added: number,
  stage: number,
  operation: string,
) {
  const amount = clamp(added, 0, 60),
    step = Math.round(clamp(stage, 0, 4)),
    soluble = kind === "salt" || kind === "sugar",
    capacity = kind === "salt" ? 36 : kind === "sugar" ? 200 : 0,
    dissolved = soluble ? (Math.min(amount, capacity) * step) / 4 : 0,
    undissolved = amount - dissolved;
  const filtered = operation === "filter",
    retained = filtered && (soluble || kind === "sand") ? undissolved : 0,
    passedSolute = filtered && soluble ? dissolved : 0;
  return {
    kind,
    amount,
    step,
    soluble,
    capacity,
    dissolved,
    undissolved,
    solution: soluble ? 100 + dissolved : null,
    total: 100 + amount,
    filtered,
    retained,
    passedSolute,
    settled: operation === "rest" && (kind === "sand" || kind === "oil"),
    ionic: kind === "salt",
  };
}
export function concentration015(
  solute: number,
  solvent: number,
  addedWater: number,
  evaporatedWater: number,
  density: number,
) {
  const dissolved = clamp(solute, 5, 40),
    initialWater = clamp(solvent, 100, 400),
    added = clamp(addedWater, 0, 300),
    evaporated = clamp(evaporatedWater, 0, 50),
    water = initialWater + added - evaporated,
    mass = dissolved + water,
    rho = clamp(density, 0.8, 1.4),
    volumeMl = mass / rho,
    moles = dissolved / 40;
  return {
    dissolved,
    initialWater,
    added,
    evaporated,
    water,
    mass,
    rho,
    volumeMl,
    moles,
    percent: (100 * dissolved) / mass,
    molarity: moles / (volumeMl / 1000),
    molality: moles / (water / 1000),
    ppm: (1e6 * dissolved) / mass,
  };
}

const unitData = [
  {
    id: "gercek-kutle-akb-nk",
    title: "Gerçek kütle, atomik kütle birimi ve koşullu gaz hacmi",
    topic: "detail-174",
    minutes: 50,
    objectives: [
      "Bir atomu ve bir molü ayrı tart",
      "Bağıl kütle bir oran, mol kütlesi birimlidir",
      "Avogadro köprüsünü hedef varlıkla kur",
      "Normal koşul etiketi hangi veriyi saklar",
    ],
    sections: [
      {
        title: "Bir atomu ve bir molü ayrı tart",
        paragraphs: [
          "Bir oksijen atomunun yaklaşık 16 u olması, terazide 16 g gelmesi değildir. u ya da Da atomik ölçektir; birim, karbon-12 atomu kütlesinin on ikide biri olarak tanımlanır. 1 u yaklaşık 1,6605 × 10⁻²⁴ g eder.",
          "Bir mol atomun kütlesi ise makroskopik miktardır. Tek atomu grama çevirirken u değerini küçük dönüşüm sabitiyle çarp; bir örneği grama çevirirken mol miktarıyla g/mol değerini çarp. İki yolun hedefleri farklıdır.",
        ],
      },
      {
        title: "Bağıl kütle bir oran, mol kütlesi birimlidir",
        paragraphs: [
          "Bağıl atom kütlesi Aᵣ, ortalama atom kütlesinin u birimine oranıdır ve boyutsuzdur. Ortalama atom kütlesi u ile, mol kütlesi M ise g/mol ile yazılır. Okul hesabının hassasiyetinde sayısal değerleri eşleşir; bu, birimlerin aynı olduğu anlamına gelmez.",
          "O₂ molekülü için iki O katkısı gerekir: yaklaşık 32 u ve M = 32 g/mol. O atomuyla O₂ molekülünü birbirinin yerine koymak hem tek tanecik kütlesini hem de örnekteki atom sayısını iki kat hatalı yapar.",
        ],
      },
      {
        title: "Avogadro köprüsünü hedef varlıkla kur",
        paragraphs: [
          "N = nNₐ bağıntısında sayılan varlığı önce adlandır. O₂ örneğinde n mol molekül, 2 n mol O atomu bulunur. İyonik bir katı için molekül yerine formül birimi miktarı kullanılır.",
          "Nₐ = 6,02214076 × 10²³ mol⁻¹ tam SI sabitidir. Bu ünitenin yaklaşık hesaplarında 6,02 × 10²³ kullanılır. Tek varlığın gram kütlesi M/Nₐ ile bulunur; n ile çarpılmadıkça bu sayı bütün örneğin kütlesi değildir.",
        ],
      },
      {
        title: "Normal koşul etiketi hangi veriyi saklar",
        paragraphs: [
          "Bu ünitede NK, 0 °C ve 1 atm olarak açıkça tanımlanır. İdeal gaz yaklaşımıyla molar hacim yaklaşık 22,4 L/mol olur. Bu değer sıcaklık ve basınç verisinin kısaltmasıdır; bütün koşullar için bir doğa sabiti değildir.",
          "Aynı gaz miktarı ısıtılınca sabit basınçta daha büyük hacim kaplar. Basınç iki katına çıkınca sabit sıcaklıkta hacim yarıya iner. Etkileşimli model T'yi kelvine çevirerek bu değişimleri hesaplar; madde miktarı veya kütlesi bu yüzden değişmez.",
        ],
      },
      {
        title: "Gaz hâlini ayrıca doğrula",
        paragraphs: [
          "22,4 L/mol bağıntısı katı demire, buza veya sıvı suya uygulanmaz. Önce örneğin belirtilen koşullarda gaz olduğunu ve ideal gaz modelinin istendiğini doğrula. Gerçek gazlar bu yaklaşımın dışında sapabilir.",
          "Bir mol sıvının hacmi için yoğunluk gibi farklı bilgi gerekir. Denklemde H₂O(s) yazıyorsa suyu gaz toplamına ekleme. Sıvı suyu gaza çevirmek sıcaklık ve faz koşullarını değiştiren ayrı bir olaydır.",
        ],
      },
      {
        title: "Eşit hacim eşit kütle değildir",
        paragraphs: [
          "Aynı sıcaklık ve basınçta ideal gazların eşit hacimleri eşit mol gaz taneciği içerir. He tek atomlu, O₂ iki atomlu olduğundan eşit moleküler ölçekli tanecik miktarları eşit atom miktarı demek değildir.",
          "NK'de 11,2 L He yaklaşık 2 g, aynı hacimde O₂ yaklaşık 16 g gelir. Hacim oranını kütle oranı sanma; eşit mol için kütleler mol kütleleriyle orantılıdır. Gaz koşulları farklıysa eşit hacimden eşit mol de çıkarılamaz.",
        ],
      },
      {
        title: "Ters dönüşümde birimleri sadeleştir",
        paragraphs: [
          "Hacim verildiğinde n = V/Vₘ; kütle verildiğinde n = m/M kullanılır. Molü bulduktan sonra başka birime geçmek çoğu çok adımlı sorunun güvenilir orta basamağıdır. L ÷ (L/mol) işlemi mol verir.",
          "Hacmi 22,4 ile çarparak mol bulmak birim kontrolünden geçmez. Birimlerin yanında madde adını da taşı: 0,5 mol O₂ ile 0,5 mol O atomu farklı miktarlardır. İşlem sonunda başlangıç verisine geri dönerek sonucu denetle.",
        ],
      },
      {
        title: "Karışım ve veri yeterliliği",
        paragraphs: [
          "NK'de gaz karışımının toplam hacmi toplam molü belirler, bileşenlerin ayrı miktarlarını tek başına belirlemez. Karışımın kütlesi için bileşim veya uygun ortalama mol kütlesi ayrıca gerekir.",
          "İki gazın toplamı 1 molse çok sayıda bileşim aynı hacmi verir. İkinci bağımsız ölçüm olmadan bir bileşenin kütlesini uydurma. Modelde gaz olmayan seçeneğin hacmi özellikle hesaplanmaz; eksik fiziksel koşulun sayıya dönüştürülmemesi de doğru sonuçtur.",
        ],
      },
    ],
    examples: [
      {
        title: "Tek atomdan grama",
        prompt:
          "Bir X atomunun kütlesi 24 u. 1 u = 1,6605 × 10⁻²⁴ g ise tek atom kaç gramdır?",
        strategy: "Hedef tek atom olduğundan u→g dönüşümü yap.",
        steps: [
          {
            label: "1. adım",
            explanation: "24 u değerini tek atom kütlesi olarak yaz.",
          },
          {
            label: "2. adım",
            explanation: "24 × 1,6605 = 39,852 çarpımını hesapla.",
          },
          {
            label: "3. adım",
            explanation:
              "Üssü bilimsel gösterime düzenle: 39,852 × 10⁻²⁴ = 3,9852 × 10⁻²³ g.",
          },
        ],
        answer: "3,9852 × 10⁻²³ g",
        check: "Sonuç atomik ölçekte küçüktür; 24 g değildir.",
        pitfall: "Nₐ ile tekrar çarpmak bir mol kütlesine geçer.",
      },
      {
        title: "Hacimden kütleye",
        prompt:
          "NK'de ideal kabul edilen 5,6 L CO₂ kaç gramdır? M(CO₂) = 44 g/mol, Vₘ = 22,4 L/mol.",
        strategy: "Önce molü, sonra örnek kütlesini bul.",
        steps: [
          {
            label: "1. adım",
            explanation: "n = 5,6/22,4 = 0,25 mol CO₂.",
          },
          {
            label: "2. adım",
            explanation: "m = 0,25 × 44 bağıntısını kur.",
          },
          {
            label: "3. adım",
            explanation:
              "m = 11 g; her molekülde iki O olduğundan O atomu miktarı ayrıca 0,5 moldür.",
          },
        ],
        answer: "11 g",
        check: "11/44 × 22,4 = 5,6 L başlangıca döner.",
        pitfall: "CO₂ molekülünü tek C atomuyla karıştırma.",
      },
      {
        title: "Koşul iki kat değişirse",
        prompt:
          "0 °C ve 1 atm'de 22,4 L ideal O₂, sıcaklık sabitken 2 atm'ye sıkıştırılıyor. Hacmi ve kütlesi? M = 32 g/mol.",
        strategy: "Mol ve sıcaklık sabit; PV sabit.",
        steps: [
          {
            label: "1. adım",
            explanation: "Başlangıç n = 1 mol, kütle 32 g.",
          },
          {
            label: "2. adım",
            explanation: "P₁V₁ = P₂V₂ kur: 1 × 22,4 = 2 V₂.",
          },
          {
            label: "3. adım",
            explanation:
              "V₂ = 11,2 L; kap madde kaybetmediği için kütle 32 g kalır.",
          },
        ],
        answer: "11,2 L ve 32 g",
        check: "Basınç artarken hacim azalır; kütle sabittir.",
        pitfall:
          "Yeni hacmi NK sayısıyla tekrar mole çevirmek yanlış koşul kullanır.",
      },
      {
        title: "Eşit hacmin farklı atomları",
        prompt:
          "NK'de 11,2 L ideal He ve 11,2 L ideal O₂ ayrı örneklerdir. He = 4, O₂ = 32 g/mol. Atom miktarlarını ve kütlelerini karşılaştır.",
        strategy: "Her gazın molünü ortak hacimden hesapla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Her örnek 0,5 mol gaz taneciğidir.",
          },
          {
            label: "2. adım",
            explanation: "He 0,5 mol atom; O₂ 1 mol O atomu içerir.",
          },
          {
            label: "3. adım",
            explanation: "Kütleler He için 2 g, O₂ için 16 g olur.",
          },
        ],
        answer: "Atom oranı O₂/He = 2; kütle oranı = 8",
        check:
          "Gaz taneciği sayıları eşit olsa da atom ve kütle aynı değildir.",
        pitfall: "He'yi iki atomlu kabul etme.",
      },
    ],
    recall: [
      {
        prompt: "Bağıl atom kütlesinin birimi nedir?",
        answer:
          "Boyutsuzdur; ortalama atom kütlesi u, mol kütlesi g/mol ile yazılır.",
      },
      {
        prompt: "NK'nin bu ünitedeki tanımı ve modeli nedir?",
        answer: "0 °C, 1 atm; ideal gaz yaklaşımında yaklaşık 22,4 L/mol.",
      },
      {
        prompt: "M/Nₐ hangi kütleyi verir?",
        answer: "M g/mol ve Nₐ mol⁻¹ ise tek varlığın gram kütlesini verir.",
      },
      {
        prompt: "1 mol sıvı su için 22,4 L kullanılır mı?",
        answer: "Hayır; bu bağıntı belirtilen koşullardaki ideal gaza aittir.",
      },
    ],
    items: [
      [
        "Bir atom 20 u'dur. 1 u = 1,6605 × 10⁻²⁴ g alınırsa bu tek atomun kütlesi kaç g olur?",
        "3,321 × 10⁻²³",
        ["20", "3,321 × 10⁻²⁴", "1,204 × 10²⁵", "1,6605 × 10⁻²³"],
        "u değerini gram dönüşüm çarpanıyla çarp.",
        "20 × 1,6605 × 10⁻²⁴ = 3,321 × 10⁻²³ g. Hedef tek atomdur; 20 g bir mol ölçeğidir.",
      ],
      [
        "O₂'nin mol kütlesi 32 g/mol, Avogadro sabiti Nₐ mol⁻¹ ise tek O₂ molekülünün gram kütlesi nedir?",
        "32/Nₐ",
        ["32 Nₐ", "Nₐ/32", "16 Nₐ", "32"],
        "Bir molün kütlesini varlık adedine böl.",
        "Bir molün 32 gramı Nₐ moleküle dağılır; her molekül 32/Nₐ g gelir. O₂ için 16 kullanılamaz.",
      ],
      [
        "0 °C ve 1 atm'de ideal gaz yaklaşımıyla 2,8 L N₂ kaç moldür? Vₘ = 22,4 L/mol.",
        "0,125 mol",
        ["0,25 mol", "0,5 mol", "8 mol", "62,72 mol"],
        "Litreyi L/mol değerine böl.",
        "n = 2,8/22,4 = 0,125 mol. Mol bulmak için hacimle 22,4 çarpılmaz.",
      ],
      [
        "0 °C ve 1 atm'de 0,5 mol ideal CO₂'nin hacmi kaç litredir? Vₘ = 22,4 L/mol.",
        "11,2 L",
        ["22,4 L", "44,8 L", "0,0224 L", "0,5 L"],
        "V = nVₘ kullan.",
        "0,5 mol × 22,4 L/mol = 11,2 L. Litre sonuç birimidir.",
      ],
      [
        "0 °C, 1 atm'de 11,2 L ideal CH₄ kaç mol H atomu içerir? Vₘ = 22,4 L/mol.",
        "2 mol",
        ["0,5 mol", "1 mol", "4 mol", "8 mol"],
        "Önce CH₄ molü, sonra dört H katkısı.",
        "11,2/22,4 = 0,5 mol CH₄; dört H ile 2 mol H atomu bulunur.",
      ],
      [
        "Aynı sıcaklık ve basınçta eşit hacimli ideal He ve O₂ örneklerinin hangi niceliği eşittir?",
        "Gaz taneciği sayısı",
        [
          "Toplam atom sayısı",
          "Kütlesi",
          "Mol kütlesi",
          "Bir taneciğin kütlesi",
        ],
        "Avogadro ilkesini hedef varlıkla oku.",
        "Eşit T, P ve V eşit mol gaz taneciği verir. He tek atomlu, O₂ iki atomludur; kütleleri de farklıdır.",
      ],
      [
        "İdeal gazın molü ve sıcaklığı sabitken basıncı 1 atm'den 2 atm'ye çıkarılırsa hacmi nasıl değişir?",
        "Yarıya iner.",
        ["İki katına çıkar.", "Dört katına çıkar.", "Değişmez.", "Sıfır olur."],
        "PV sabittir.",
        "P₂ = 2 P₁ olduğundan V₂ = V₁/2. Aynı hacmi NK molar hacmi sanarak yeni mol hesaplanamaz.",
      ],
      [
        "Bir maddenin bağıl atom kütlesi Aᵣ için hangisi doğrudur?",
        "Aᵣ boyutsuz bir orandır.",
        [
          "Birimi g/mol'dür.",
          "Birimi litredir.",
          "Her atomun nötron sayısıdır.",
          "Her izotop için aynı tam sayıdır.",
        ],
        "Oran ile kütleyi ayır.",
        "Aᵣ ortalama atom kütlesinin u'ya oranıdır. Ortalama kütle u, mol kütlesi g/mol ile yazılır.",
      ],
      [
        "0 °C ve 1 atm'de 1 mol buzun hacmini bulmak için hangi yaklaşım doğrudur?",
        "Yoğunluk gibi ek fiziksel veri gerekir.",
        [
          "22,4 L alınır.",
          "24,5 L alınır.",
          "Avogadro sabiti litreye eşittir.",
          "Hacim zorunlu olarak 1 L'dir.",
        ],
        "Fazı kontrol et.",
        "Buz katıdır. İdeal gaz molar hacmi katıya uygulanmaz; mol ve koşul tek başına katı hacmini belirlemez.",
      ],
      [
        "0 °C ve 1 atm'de ideal CO₂ örneği 5,6 L'dir. Vₘ = 22,4 L/mol ve M = 44 g/mol için kütlesi kaç gramdır?",
        "11 g",
        ["44 g", "22 g", "5,6 g", "0,25 g"],
        "Hacim→mol→gram sırasını izle.",
        "n = 0,25 mol; m = 0,25 × 44 = 11 g. Katsayı ve birimler ayrı tutulur.",
      ],
    ],
    source:
      "Aurelia TYT Kimya 036 kopya kağıdı PDF 1–7; MEBİ TYT Kimya Konu Özetleri PDF 63–65; OGM 10. Sınıf Dersler Cepte ilgili öğretim sayfaları doğrudan karşılaştırıldı. Anlatım, şema ve beş seçenekli alıştırmalar özgündür; resmî sınav sorusu değildir.",
  },
  {
    id: "tepkimeler-denklemler",
    title: "Kimyasal tepkimeler ve denkleştirme atölyesi",
    topic: "detail-175",
    minutes: 50,
    objectives: [
      "Denklem bir olayın dilidir",
      "Katsayı değişir, kimlik değişmez",
      "Atom envanterini iki sütuna ayır",
      "Etanın yanmasını sırayla kur",
    ],
    sections: [
      {
        title: "Denklem bir olayın dilidir",
        paragraphs: [
          "Girenler okun solunda, ürünler sağında yazılır. Formüller kimyasal kimliği, katsayılar göreli madde miktarını gösterir. (k), (s), (g), (suda) katı, sıvı, gaz ve sulu ortamı ayırır.",
          "Ok üstündeki sıcaklık, ışık ve katalizör bilgisi giren madde gibi toplanmaz. Tek yönlü ok, bu soruda izlenen dönüşüm yönünü belirtir; tek başına bütün koşullarda geri tepkimenin imkânsızlığını kanıtlamaz.",
        ],
      },
      {
        title: "Katsayı değişir, kimlik değişmez",
        paragraphs: [
          "2 H₂O iki su molekülünü veya iki mol suyu temsil edebilir; birim bağlamdan okunur. H₂O₂ ise farklı bir bileşiktir. Atom eşitlemek için alt indis değiştirmek denklemi çözmek yerine olayı değiştirir.",
          "3 Ca(OH)₂ içinde Ca üç, O altı, H altı kez sayılır. Ön katsayı bütün formüle, parantez dışı indis parantezin içine etkir. Önce bir formülü açıp sonra katsayıyla çarpmak hatayı azaltır.",
        ],
      },
      {
        title: "Atom envanterini iki sütuna ayır",
        paragraphs: [
          "Her element için giren ve ürün atom toplamlarını ayrı hesapla. C₂H₆ + O₂ → CO₂ + H₂O için karbon, hidrojen ve oksijen üç bağımsız denklik verir.",
          "Eşitlik yalnız toplam atom sayısında değil, her atom türünde sağlanmalıdır. Solda beş H ve sağda beş O bulunması denklem oluşturmaz. Modelde C, H ve O satırları bu yüzden ayrı gösterilir.",
        ],
      },
      {
        title: "Etanın yanmasını sırayla kur",
        paragraphs: [
          "Etan katsayısını 1 seçince karbon için 2 CO₂, hidrojen için 3 H₂O gerekir. Ürünlerde 4 + 3 = 7 O atomu bulunduğundan O₂ katsayısı 7/2 olur.",
          "Mol oranı olarak kesirli katsayı tutarlıdır. En küçük tam sayı biçimi isteniyorsa bütün katsayıları ikiyle çarp: 2, 7, 4, 6. Tek bir katsayıyı büyütmek atom eşitliğini bozar.",
        ],
      },
      {
        title: "Denk olmak ve en küçük olmak farklıdır",
        paragraphs: [
          "4 C₂H₆ + 14 O₂ → 8 CO₂ + 12 H₂O atomca dengelidir. Katsayıların ortak böleni 2 olduğundan en küçük tam sayı biçimi değildir.",
          "Bütün katsayıların ortak böleni 1 olduğunda sade biçime ulaşılır. Model, “denk” ile “en küçük tam sayı” sonuçlarını ayrı bildirir. Katsayıların tam sayı zorunluluğu, tek tek kesirli molün fiziksel olarak olanaksız olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Yükü ayrıca koru",
        paragraphs: [
          "İyon içeren denklemde atom sayımı yeterli değildir. Ag⁺ + Cl⁻ → AgCl(k) için giren net yükü 0, ürün net yükü 0'dır. Yalnız Ag⁺ → Ag gibi yazmak elektron aktarımını eksik bırakır.",
          "Seyirci iyonlar tam iyon denkleminde iki tarafta bulunabilir; aynı tür ve miktardaysa sadeleştirilebilir. Kimyasal denklem çekirdeği değiştirmez; radyoaktif dönüşüm bu çerçevenin dışındadır.",
        ],
      },
      {
        title: "Hangi nicelik değişebilir",
        paragraphs: [
          "Atom türü ve sayısı, toplam elektrik yükü ve uygun sistem sınırında toplam kütle korunur. Molekül adedi veya toplam molün korunması zorunlu değildir.",
          "2 H₂ + O₂ → 2 H₂O örneğinde üç mol giren iki mol ürün yapar. Gaz hacmi de ancak fazlar, sıcaklık ve basınç verilirse yorumlanır; sıvı ürünü gaz hacmine ekleme.",
        ],
      },
      {
        title: "Gözlemden kimyasal sonuca dikkatle geç",
        paragraphs: [
          "Gaz çıkışı, renk veya sıcaklık değişimi tepkimeyi düşündürebilir. Fakat kaynama da gaz görünümü, çözünme de sıcaklık değişimi oluşturabilir. Yeni kimyasal türün oluştuğunu destekleyen veriyi ara.",
          "Son denetimde her elementi yeniden say, gerekiyorsa yükü topla ve ortak böleni kontrol et. Tepkimeyi denkleştirmek onun hangi hızla veya hangi verimle gerçekleşeceğini belirlemez; bunlar ayrı verilerdir.",
        ],
      },
    ],
    examples: [
      {
        title: "Demir oksit",
        prompt: "Fe + O₂ → Fe₂O₃ en küçük tam sayılarla nasıl denkleşir?",
        strategy: "O atomunun ortak katını kullan.",
        steps: [
          {
            label: "1. adım",
            explanation: "3 O₂ ile 6 O seç.",
          },
          {
            label: "2. adım",
            explanation: "2 Fe₂O₃ sağda 6 O ve 4 Fe verir.",
          },
          {
            label: "3. adım",
            explanation: "Soldaki Fe'ye 4 yaz; 4,3,2 ortak bölen 1'dir.",
          },
        ],
        answer: "4 Fe + 3 O₂ → 2 Fe₂O₃",
        check: "Fe iki tarafta 4, O iki tarafta 6.",
        pitfall: "FeO₂ yazarak ürün kimliğini değiştirme.",
      },
      {
        title: "Etanın kesirli ara adımı",
        prompt: "C₂H₆ + O₂ → CO₂ + H₂O'yu en küçük tam sayıyla denkleştir.",
        strategy: "C ve H'yi önce say.",
        steps: [
          {
            label: "1. adım",
            explanation: "1 etan için 2 CO₂ yaz.",
          },
          {
            label: "2. adım",
            explanation: "6 H için 3 su, 7 O için 7/2 O₂ gerekir.",
          },
          {
            label: "3. adım",
            explanation: "Tüm katsayıları ikiyle çarp ve ortak böleni denetle.",
          },
        ],
        answer: "2, 7, 4, 6",
        check: "C 4, H 12, O 14 her iki tarafta eşit.",
        pitfall: "Yalnız O₂ katsayısını ikiyle çarpma.",
      },
      {
        title: "Karbonat ve asit",
        prompt: "Na₂CO₃ + HCl → NaCl + H₂O + CO₂ denklemini kur.",
        strategy: "Na ve Cl ile başla.",
        steps: [
          {
            label: "1. adım",
            explanation: "2 Na için 2 NaCl yaz.",
          },
          {
            label: "2. adım",
            explanation: "Bunun için 2 HCl gerekir; 2 H bir su yapar.",
          },
          {
            label: "3. adım",
            explanation: "C bir CO₂, O ise su ve CO₂'de toplam 3 olur.",
          },
        ],
        answer: "1, 2, 2, 1, 1",
        check: "Na 2, C 1, H 2, Cl 2, O 3 korunur.",
        pitfall: "NaCl₂ yazarak tuzu değiştirme.",
      },
      {
        title: "Denk ama sade değil",
        prompt:
          "4 H₂ + 2 O₂ → 4 H₂O dengeli midir ve en küçük tam sayı biçimi nedir?",
        strategy: "Atom eşitliğiyle ortak böleni ayrı denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "H 8 ve O 4 iki tarafta eşittir.",
          },
          {
            label: "2. adım",
            explanation: "4,2,4 katsayılarının ortak böleni 2'dir.",
          },
          {
            label: "3. adım",
            explanation: "Üçünü de ikiye böl.",
          },
        ],
        answer: "Dengeli; sade biçimi 2, 1, 2",
        check: "Yeni biçimde H 4 ve O 2 eşittir.",
        pitfall: "“En küçük değil” demek “denk değil” demek değildir.",
      },
    ],
    recall: [
      {
        prompt: "Katsayıyla alt indisin farkı nedir?",
        answer: "Katsayı miktarı, alt indis madde kimliğini belirler.",
      },
      {
        prompt: "Atom eşitliği sağlandıysa en küçük biçim kesin midir?",
        answer: "Hayır; ortak bölen ayrıca kontrol edilir.",
      },
      {
        prompt: "İyon denkleminde hangi ek kontrol gerekir?",
        answer: "Net elektrik yükü iki tarafta eşit olmalıdır.",
      },
      {
        prompt: "Toplam mol korunmak zorunda mıdır?",
        answer:
          "Hayır; her elementin atomları korunurken toplam molekül veya mol değişebilir.",
      },
    ],
    items: [
      [
        "Fe + O₂ → Fe₂O₃ denkleminin en küçük tam sayı katsayıları sırasıyla nedir?",
        "4, 3, 2",
        ["2, 1, 1", "1, 1, 1", "2, 3, 2", "4, 2, 3"],
        "O için ortak kat 6'yı dene.",
        "3 O₂ ve 2 Fe₂O₃ altı O verir; sağdaki dört Fe için solda 4 Fe gerekir.",
      ],
      [
        "C₂H₆ + O₂ → CO₂ + H₂O'nun en küçük tam sayı katsayıları nedir?",
        "2, 7, 4, 6",
        ["1, 3, 2, 3", "2, 6, 4, 6", "1, 7, 2, 3", "2, 7, 2, 6"],
        "Önce C ve H, sonra O.",
        "1 etan için 2 CO₂ ve 3 H₂O gerekir; 7/2 O₂ yazılır. Tüm katsayıların ikiyle çarpımı 2,7,4,6'dır.",
      ],
      [
        "3 Ca(OH)₂ ifadesindeki O atomlarının katsayıyla çarpılmış sayısı kaçtır?",
        "6",
        ["2", "3", "5", "9"],
        "Parantez dışı 2 ve ön katsayı 3 birlikte etkir.",
        "Her birimde iki O vardır; üç birimde 3 × 2 = 6 O bulunur.",
      ],
      [
        "4 H₂ + 2 O₂ → 4 H₂O için hangi yargı doğrudur?",
        "Dengelidir fakat en küçük tam sayı biçimi değildir.",
        [
          "O atomları korunmaz.",
          "H atomları korunmaz.",
          "Katsayılar bir daha sadeleşmez.",
          "Ürün formülü değiştirilmelidir.",
        ],
        "Denkliği ve ortak böleni ayrı incele.",
        "H 8/O 4 iki tarafta eşit; bütün katsayılar ikiye bölünebilir.",
      ],
      [
        "H₂ + O₂ → H₂O denkleminde O sayısını eşitlemek için H₂O yerine H₂O₂ yazılması neden uygun değildir?",
        "Ürün kimliğini değiştirir.",
        [
          "Yalnız yazı tipi değişir.",
          "Katsayıyı değiştirmek yasaktır.",
          "O atomu sayılmaz.",
          "H₂O₂ aynı maddenin kısaltmasıdır.",
        ],
        "Alt indis kimyasal türün parçasıdır.",
        "Su ile hidrojen peroksit farklı maddelerdir. Denkleştirmede formül korunur, ön katsayı ayarlanır.",
      ],
      [
        "Ag⁺(suda) + Cl⁻(suda) → AgCl(k) denkleminin iki tarafındaki net yükler sırasıyla nedir?",
        "0 ve 0",
        ["+1 ve 0", "−1 ve 0", "+2 ve −2", "+1 ve −1"],
        "Giren iyonların yüklerini topla.",
        "+1 − 1 = 0; yüksüz AgCl formül birimi de net 0'dır.",
      ],
      [
        "2 H₂(g) + O₂(g) → 2 H₂O(s) için hangi niceliğin korunması zorunlu değildir?",
        "Toplam mol miktarı",
        [
          "H atomu toplamı",
          "O atomu toplamı",
          "Kapalı sistem kütlesi",
          "Toplam elektrik yükü",
        ],
        "Üç mol girenden kaç mol ürün oluşur?",
        "Giren toplam 3 mol, ürün 2 mol olur. Atomlar ve kapalı sistem kütlesi bu değişimle yok olmaz.",
      ],
      [
        "Na₂CO₃ + HCl → NaCl + H₂O + CO₂ en küçük biçiminde HCl katsayısı kaçtır?",
        "2",
        ["1", "3", "4", "6"],
        "İki Na için iki NaCl gerekir.",
        "İki Cl'nin kaynağı 2 HCl'dir; aynı iki H bir su oluşturur.",
      ],
      [
        "Bir denklemde bütün katsayılar aynı pozitif sayıyla çarpılırsa ne olur?",
        "Atom dengesi korunur; en küçük biçim değişebilir.",
        [
          "Madde formülleri zorunlu değişir.",
          "Yalnız O atomları artar.",
          "Yük korunamaz.",
          "Denklem daima geçersiz olur.",
        ],
        "İki tarafın her katkısı aynı oranda büyür.",
        "Her elementin iki tarafı aynı çarpanla büyür. Ortak bölen 1 koşulu ise yeni biçimde sağlanmayabilir.",
      ],
      [
        "Bir reaksiyon okunun üzerindeki Δ işareti bu bağlamda neyi bildirir?",
        "Isıtma koşulunu",
        [
          "Yeni bir element eklendiğini",
          "Mutlaka %100 verimi",
          "Gaz molünün korunduğunu",
          "Katalizörün ürün olduğunu",
        ],
        "Ok üstündeki bilgi koşul bilgisidir.",
        "Δ ısıtmayı belirtir. Denklem katsayısı veya kendi başına tam verim kanıtı değildir.",
      ],
    ],
    source:
      "Aurelia TYT Kimya 037 kopya kağıdı PDF 1–7; MEBİ TYT Kimya Konu Özetleri PDF 66–67; OGM 10. Sınıf Dersler Cepte ilgili öğretim sayfaları doğrudan karşılaştırıldı. Anlatım, şema ve beş seçenekli alıştırmalar özgündür; resmî sınav sorusu değildir.",
  },
  {
    id: "tepkime-turleri",
    title: "Tepkime türleri: aynı olaya farklı ölçütlerle bak",
    topic: "detail-176",
    minutes: 50,
    objectives: [
      "Sınıflandırmadan önce ölçütü seç",
      "Yanma oksijenin giren olduğu örneklerle başlar",
      "Sentez ve ayrışma tür sayısını izler",
      "Asit-bazda proton aktarımını ara",
    ],
    sections: [
      {
        title: "Sınıflandırmadan önce ölçütü seç",
        paragraphs: [
          "Bir tepkime aynı anda yanma, sentez ve yükseltgenme-indirgenme olabilir. Bunlar birbirini dışlayan kutular değil, farklı sorulara verilen yanıtlardır: O₂ tüketiliyor mu, kaç ürün türü var, yükseltgenme basamağı değişiyor mu?",
          "Soruda yalnız bir sınıflandırma ekseni isteniyorsa o eksende karar ver. 2 Mg + O₂ → 2 MgO hem oksijenle birleşme hem tek bileşik oluşturmadır. “Hangisi?” sorusunun seçenekleri bu ayrımı açık tutmalıdır.",
        ],
      },
      {
        title: "Yanma oksijenin giren olduğu örneklerle başlar",
        paragraphs: [
          "Bu ünitedeki yanma örneklerinde O₂ girendir. Hidrokarbonun tam yanması yeterli O₂ ile CO₂ ve H₂O verir. Oksijenin üründe çıkması, olayın yanma olduğunu göstermez.",
          "Eksik yanmada CO veya karbon da oluşabilir; tam yanma denkleminden çıkarılan sayılar bu koşula doğrudan taşınmaz. Yanma her zaman görünür alev gerektirmez. Isı alışverişi etiketi için ayrıca enerji verisini kullan.",
        ],
      },
      {
        title: "Sentez ve ayrışma tür sayısını izler",
        paragraphs: [
          "Sentezde birden fazla girenden bir bileşik türü oluşur. Ayrışmada bir bileşik birden fazla kimyasal türe dönüşür; ısı veya elektrik enerji sağlayabilir. Bir molekülün fiziksel olarak çözeltide dağılması ayrışma tepkimesi sayılmaz.",
          "CaCO₃ → CaO + CO₂ ayrışmadır; tersi sentez olarak sınıflanabilir. Tepkime yönünü okumadan yalnız formüllere bakmak bu iki etiketi tersine çevirir. KClO₃ ayrışmasında O₂ çıkması da oksijen tüketimi değildir.",
        ],
      },
      {
        title: "Asit-bazda proton aktarımını ara",
        paragraphs: [
          "HCl ve NaOH sulu ortamda tepkimeye girince H⁺ ve OH⁻ su oluşturur. Seyirci Na⁺ ve Cl⁻ çözeltide kalır. Net denklem H⁺ + OH⁻ → H₂O'dur; yük iki tarafta sıfırdır.",
          "Her asit-baz tepkimesinin su oluşturması gerekmez. NH₃(g) + HCl(g) → NH₄Cl(k) proton aktarımıdır ve su içermez. Bir tuz ürününü görmek tek başına bütün tepkimeleri asit-baz yapmaz.",
        ],
      },
      {
        title: "Çökelmede yeni katıyı ayırt et",
        paragraphs: [
          "Ag⁺ ve Cl⁻ iyonları uygun koşulda düşük çözünürlüklü AgCl katısını oluşturur. “Çözünmez” bu öğretim modelinde çözünürlüğün ihmal edilmesi demektir; gerçek denge tamamen sıfır çözünürlük iddiası değildir.",
          "NaCl çözeltisinin saydam olması tuzun yok olduğunu göstermez. Sulu iyon ile dipteki örgü farklı fiziksel düzenlerdir. Tepkime sırasında birleşen iyonların yük oranı katının formülünde sıfır toplam yük sağlamalıdır.",
        ],
      },
      {
        title: "Tam iyon ve net iyon denklemi",
        paragraphs: [
          "AgNO₃ ve NaCl sulu çözeltilerinde iyonları ayrı yazınca Na⁺ ve NO₃⁻ iki tarafta değişmeden görünür. Bunlar sadeleşir; katıya geçen Ag⁺ ve Cl⁻ net denklemde kalır.",
          "Seyirci iyon “yok olan” iyon değildir; çözeltide varlığını sürdürür. Baryum sülfat örneğinde Ba²⁺ ve SO₄²⁻ birleşir, Na⁺ ve Cl⁻ seyirci kalır. Atom ve yük denetimini her iki gösterimde de yap.",
        ],
      },
      {
        title: "Elektron aktarımı ayrı bir eksendir",
        paragraphs: [
          "Mg'nin okside dönüşmesinde Mg 0→Mg+2, O 0→O−2 değişir; redoks vardır. HCl ile NaOH'nin verilen nötralleşmesinde ilgili atomların yükseltgenme basamakları değişmez.",
          "Çökelme olması tek başına elektron aktarımı kanıtı değildir. Ag⁺, AgCl içinde de +1 olarak kalır. Bir tepkimenin redoks olup olmadığını söylemek için bileşiklerdeki yük ve yükseltgenme basamaklarını karşılaştır.",
        ],
      },
      {
        title: "Gözlem, net denklem ve korunumu birlikte kullan",
        paragraphs: [
          "Bir sıvının bulanıklaşması çökeltiyi düşündürür ama askıdaki damlacıklar da bulanıklık yapabilir. Model bilinen iyonlardan yeni katı oluşumunu gösterir; rastgele bir bulanıklığı kimyasal katı ilan etmez.",
          "Etkileşimli çizimde adımlar temsilidir; hız veya saniye ölçümü değildir. Katı oluşurken seçilen iyon çiftleri azalır; toplam atom ve net yük değişmez. Renkler kimlik desteğidir, bütün sonuçlar adlarıyla da yazılır.",
        ],
      },
    ],
    examples: [
      {
        title: "Çift etiket",
        prompt:
          "2 Mg + O₂ → 2 MgO tepkimesini O₂ kullanımı ve ürün tür sayısı bakımından sınıflandır.",
        strategy: "İki ölçütü ayrı uygula.",
        steps: [
          {
            label: "1. adım",
            explanation: "O₂ giren taraftadır; Mg oksitlenir.",
          },
          {
            label: "2. adım",
            explanation: "Birden çok girenden yalnız MgO bileşiği oluşur.",
          },
          {
            label: "3. adım",
            explanation: "O₂ ekseninde yanma, ürün ekseninde sentez yaz.",
          },
        ],
        answer: "Yanma ve sentez",
        check: "İki etiket birlikte doğrudur.",
        pitfall: "Tek bir kutu seçmek zorunda değilsin.",
      },
      {
        title: "Oksijen çıkan olay",
        prompt: "2 KClO₃ → 2 KCl + 3 O₂ nasıl sınıflanır?",
        strategy: "Ok yönü ve tür sayısını izle.",
        steps: [
          {
            label: "1. adım",
            explanation: "Bir bileşik türü giriyor.",
          },
          {
            label: "2. adım",
            explanation: "İki farklı ürün türü çıkıyor.",
          },
          {
            label: "3. adım",
            explanation:
              "O₂ ürün olduğu için bu ölçütte oksijen tüketen yanma değildir.",
          },
        ],
        answer: "Ayrışma",
        check: "K 2, Cl 2 ve O 6 korunur.",
        pitfall: "Sağdaki O₂'yi giren sanma.",
      },
      {
        title: "Seyirci iyonları ayır",
        prompt:
          "BaCl₂ ve Na₂SO₄ sulu çözeltileri karışınca BaSO₄(k) oluşuyor. Net denklem?",
        strategy: "Katıya geçen iyonları seç.",
        steps: [
          {
            label: "1. adım",
            explanation: "Ba²⁺ ve SO₄²⁻ katının bileşenleridir.",
          },
          {
            label: "2. adım",
            explanation: "Na⁺ ve Cl⁻ iki tarafta aynı kalır.",
          },
          {
            label: "3. adım",
            explanation: "Ba²⁺(suda) + SO₄²⁻(suda) → BaSO₄(k) yaz.",
          },
        ],
        answer: "Çökelme; net yük 0→0",
        check: "Bir Ba ve bir sülfat grubu korunur.",
        pitfall: "Na ve Cl'yi katıya dahil etme.",
      },
      {
        title: "Su oluşmadan proton aktarımı",
        prompt:
          "NH₃(g) + HCl(g) → NH₄Cl(k) için asit-baz ve su oluşumu ayrımını açıkla.",
        strategy: "Protonun nereden nereye geçtiğini izle.",
        steps: [
          {
            label: "1. adım",
            explanation: "HCl proton verir, NH₃ alır.",
          },
          {
            label: "2. adım",
            explanation: "NH₄⁺ ile Cl⁻ tuzu oluşur.",
          },
          {
            label: "3. adım",
            explanation:
              "Su bulunmadığı için her asit-baz olayını su üretimiyle özdeşleştirme.",
          },
        ],
        answer: "Asit-baz; su ürünü yok",
        check: "N 1,H 4,Cl 1 korunur.",
        pitfall: "Tuz görüldü diye bütün tepkime türlerini aynı sayma.",
      },
    ],
    recall: [
      {
        prompt: "O₂ çıkması tek başına yanma kanıtı mıdır?",
        answer: "Hayır; O₂ bir ayrışma ürünü olabilir.",
      },
      {
        prompt: "Seyirci iyon tepkime sonunda yok olur mu?",
        answer: "Hayır, çözeltide değişmeden kalır.",
      },
      {
        prompt: "Ag⁺ + Cl⁻ → AgCl redoks mudur?",
        answer:
          "Bu denklemde yükseltgenme basamakları değişmediğinden değildir.",
      },
      {
        prompt: "Bir tepkime hem yanma hem sentez olabilir mi?",
        answer: "Evet; Mg'nin MgO oluşturması iki ölçütü de sağlar.",
      },
    ],
    items: [
      [
        "2 Mg + O₂ → 2 MgO için yalnız ürün tür sayısına göre sınıf hangisidir?",
        "Sentez",
        ["Ayrışma", "Buharlaşma", "Damıtma", "Süspansiyon"],
        "Birden fazla girenden kaç bileşik türü oluşur?",
        "Tek bileşik türü MgO oluşur; bu eksende sentezdir. Aynı olay ayrıca yanma ve redoks olabilir.",
      ],
      [
        "CaCO₃(k) → CaO(k) + CO₂(g) tür sayısı bakımından nedir?",
        "Ayrışma",
        ["Sentez", "Çözünme", "Yoğunlaşma", "Emülsiyon"],
        "Bir giren bileşikten kaç tür çıkıyor?",
        "Tek bileşikten iki farklı tür oluşur. O₂ tüketilmediği için sırf CO₂ çıktı diye yanma denmez.",
      ],
      [
        "Ag⁺(suda) + Cl⁻(suda) → AgCl(k) için yeni katı oluşumu bakımından doğru sınıf nedir?",
        "Çökelme",
        [
          "Kaynama",
          "Süblimleşme",
          "Tam hidrokarbon yanması",
          "Alaşım oluşturma",
        ],
        "Hâl simgesindeki katıyı izle.",
        "Çözünmüş iyonlar düşük çözünürlüklü katı oluşturur; bu çökelmedir.",
      ],
      [
        "HCl(suda) + NaOH(suda) → NaCl(suda) + H₂O(s) olayının net iyon denklemi nedir?",
        "H⁺ + OH⁻ → H₂O",
        [
          "Na⁺ + Cl⁻ → NaCl(k)",
          "H₂ + O₂ → H₂O",
          "Na → Na⁺ + e⁻",
          "Cl₂ → 2 Cl⁻",
        ],
        "Seyirci Na⁺ ve Cl⁻ çözeltide kalır.",
        "H⁺ ve OH⁻ su oluşturur. AgCl benzeri bir tuz çökmesi verilmemiştir.",
      ],
      [
        "CH₄'ün yeterli O₂ ile tam yanmasında karbon içeren ürün hangisidir?",
        "CO₂",
        ["CO", "C₂H₆", "CH₃OH", "CaCO₃"],
        "Tam yanma koşulunu kullan.",
        "Tam hidrokarbon yanmasında karbon CO₂'ye, hidrojen H₂O'ya gider. Oksijen yetersizliği farklı bir durumdur.",
      ],
      [
        "2 KClO₃ → 2 KCl + 3 O₂ tepkimesinde oksijenle ilgili hangisi doğrudur?",
        "O₂ üründür; bu olay O₂ tüketen yanma değildir.",
        [
          "O₂ girendir.",
          "O atomları yok olur.",
          "O₂ görülmesi her zaman yanmadır.",
          "KCl gaz hacmini zorunlu belirler.",
        ],
        "Okun sağını ve solunu ayır.",
        "O₂ sağda oluşur; tek bileşikten iki tür çıkması ayrışmayı gösterir.",
      ],
      [
        "BaCl₂(suda) + Na₂SO₄(suda) → BaSO₄(k) + 2 NaCl(suda) için seyirci iyon çifti hangisidir?",
        "Na⁺ ve Cl⁻",
        ["Ba²⁺ ve SO₄²⁻", "Ba²⁺ ve Na⁺", "Cl⁻ ve SO₄²⁻", "Ba²⁺ ve Cl⁻"],
        "Katıya geçenleri dışarıda bırak.",
        "Ba²⁺ ve sülfat katıyı oluşturur. Na⁺ ve Cl⁻ çözeltide değişmeden bulunur.",
      ],
      [
        "Ag⁺(suda) + Cl⁻(suda) → AgCl(k) için redoks ölçütünde hangi ifade doğrudur?",
        "Ag ve Cl'nin yükseltgenme basamakları değişmez.",
        [
          "Ag⁺ metale dönüşür.",
          "Cl⁻, Cl₂ olur.",
          "Her çökelme elektron aktarır.",
          "Net yük +2 olur.",
        ],
        "Katı formülde Ag+1 ve Cl−1 olarak kalır.",
        "Kimlikler iyonlardan örgüye geçer ama yükseltgenme basamakları aynı kalır; verilen olay redoks değildir.",
      ],
      [
        "NH₃(g) + HCl(g) → NH₄Cl(k) için hangisi doğrudur?",
        "Su oluşmadan asit-baz tepkimesi gerçekleşir.",
        [
          "Su zorunlu üründür.",
          "O₂ tüketilir.",
          "N atomu yok olur.",
          "Yalnız fiziksel buharlaşmadır.",
        ],
        "NH₃ proton alır.",
        "HCl'den NH₃'e proton aktarımı vardır. Ürün NH₄Cl'dir; denklemde O bile bulunmaz.",
      ],
      [
        "Bir olayın hem yanma hem sentez olarak nitelenebilmesi neyi gösterir?",
        "Sınıflandırma ölçütleri birbirini dışlamak zorunda değildir.",
        [
          "Her denklem hatalıdır.",
          "Sentezde tek giren gerekir.",
          "Yanma yalnız ayrışmadır.",
          "Molekül sayısı her zaman sabittir.",
        ],
        "Etiketlerin hangi soruyu yanıtladığını düşün.",
        "O₂ kullanımı ve tek bileşik oluşumu farklı eksenlerdir. Bir olay iki koşulu aynı anda sağlayabilir.",
      ],
    ],
    source:
      "Aurelia TYT Kimya 038 kopya kağıdı PDF 1–7; MEBİ TYT Kimya Konu Özetleri PDF 67–69; OGM 10. Sınıf Dersler Cepte ilgili öğretim sayfaları doğrudan karşılaştırıldı. Anlatım, şema ve beş seçenekli alıştırmalar özgündür; resmî sınav sorusu değildir.",
  },
  {
    id: "denklemli-miktar-gecisi",
    title: "Denklemli miktar geçişi: birimler arasında çok adımlı yol",
    topic: "detail-177",
    minutes: 50,
    objectives: [
      "Geçişin merkezi moldür",
      "Katsayı oranı tüketilen miktar içindir",
      "Kütleden başka kütleye",
      "Gaz hacminde iki ayrı kısa yol",
    ],
    sections: [
      {
        title: "Geçişin merkezi moldür",
        paragraphs: [
          "Kütle, hacim veya tanecik adedi farklı giriş kapılarıdır; denklemin katsayılarını güvenle kullanacağın merkez mol miktarıdır. Önce verilenin türünü ve harcanan mı başlangıç mı olduğunu yaz.",
          "n = m/M, n = N/Nₐ ve açıkça NK'deki ideal gaz için n = V/22,4 ilişkileri giriş dönüşümüdür. Birbirinden farklı kimyasal türlerin gramlarını katsayı oranıyla doğrudan bağlama.",
        ],
      },
      {
        title: "Katsayı oranı tüketilen miktar içindir",
        paragraphs: [
          "N₂ + 3 H₂ → 2 NH₃ denkleminde her 3 mol tüketilen H₂, 2 mol yeni NH₃ verir. Çarpan hedef katsayısı/kaynak katsayısıdır; kaynak H₂ ise 2/3 kullanılır.",
          "Başlangıçta 6 mol H₂ bulunması, 6 molün tümünün harcandığını kanıtlamaz. N₂ yeterli değilse veya dönüşüm kısmi verilmişse önce tüketilen H₂ bulunmalıdır. Model yeterli N₂ ve tam seçili dönüşüm varsayımını açık taşır.",
        ],
      },
      {
        title: "Kütleden başka kütleye",
        paragraphs: [
          "6 g H₂, M = 2 g/mol ile 3 moldür. Katsayı oranı NH₃ miktarını 2 mol verir; M(NH₃) = 17 g/mol ile son kütle 34 g olur.",
          "Ara basamakları madde adıyla yazmak 6 gramdan doğrudan 4 gram ürün çıkarma hatasını önler. Yeterli N₂'den tüketilen miktar 1 mol yani 28 g'dır; 6 + 28 = 34 g korunum denetimidir.",
        ],
      },
      {
        title: "Gaz hacminde iki ayrı kısa yol",
        paragraphs: [
          "Aynı sıcaklık ve basınçta ideal gazların tüketilen ve oluşan hacim oranı mol oranına eşittir. NK sayısı bilinmese de aynı koşul vurgusu hacim oranı için yeterli olabilir.",
          "Mutlak bir molü litreye çevireceksen sıcaklık ve basınç gerekir. NK bu ünitede 0 °C ve 1 atm'dir. Sıvı su veya katı ürünün hacmine gaz katsayısı uygulanmaz; toplam gaz hesabında yalnız gaz türlerini topla.",
        ],
      },
      {
        title: "Tanecik adedinin son basamağı",
        paragraphs: [
          "0,6 mol NH₃ yaklaşık 3,612 × 10²³ molekül içerir. Aynı örnekte H atomu sayısı üç katıdır. Bir molekülün katsayısıyla formüldeki alt indis farklı görevler taşır.",
          "N/Nₐ dönüşümünde “tane” sözcüğünün atom mu molekül mü olduğunu kontrol et. Bir mol NH₃'te bir mol N atomu, üç mol H atomu ve toplam dört mol atom vardır; bunların hiçbiri dört mol NH₃ değildir.",
        ],
      },
      {
        title: "Üründen girene geriye yürü",
        paragraphs: [
          "Gözlenen ürün miktarı verildiğinde zinciri ters kurabilirsin. CaCO₃ → CaO + CO₂ için 0,2 mol CO₂ oluşumu, seçilen tepkimede 0,2 mol CaCO₃ tüketildiğini gösterir.",
          "Bu sonuç başlangıç örneğinin tümünün o kadar olduğunu söylemez; artan, inert veya başka CO₂ kaynağı olabilir. “Tam”, “tek kaynak” ve “saf” bilgileri ters problemin hangi bilinmeyenini belirlediğini açıklar.",
        ],
      },
      {
        title: "Toplam ürün ve ardışık tepkimeler",
        paragraphs: [
          "Bir ayrışma iki gaz oluşturuyorsa toplam gaz molü ürün katsayılarının toplamıyla bulunur. 2 H₂O → 2 H₂ + O₂ için iki mol tüketilen su, üç mol gaz verir.",
          "İki aşamalı süreçte ilk aşamanın ara ürününü ikinciye taşı. Ara ürünün tamamının kullanıldığı ve ikinci reaktifin yeterli olduğu söylenmedikçe sonuçları kör çarpma. Kütle hesabında iki aşamaya ait birimleri ayrı tut.",
        ],
      },
      {
        title: "Veri yeterliliği ve son kontrol",
        paragraphs: [
          "Bir denklem miktarlar arasında oran verir; tek başına ne kadar madde bulunduğunu belirlemez. En az bir mutlak miktar veya uygun bağımsız ölçüm gereklidir. Başlangıç ile değişimi ayrı yaz.",
          "Sonuçta birimler hedefe dönmeli ve atom/kütle kontrolü sağlanmalıdır. Yeterli reaktif ifadesi miktarın tepkimeyi sınırlamadığını anlatır; mutlaka tam stokiyometrik başlangıç veya artansız karışım anlamına gelmez.",
        ],
      },
    ],
    examples: [
      {
        title: "Hidrojen gramından amonyağa",
        prompt:
          "N₂ + 3 H₂ → 2 NH₃. 6 g H₂, yeterli N₂ ile tamamen tepkimeye giriyor. M(H₂)=2, M(N₂)=28, M(NH₃)=17 g/mol. Ürün?",
        strategy: "Mol köprüsünü kullan.",
        steps: [
          {
            label: "1. adım",
            explanation: "H₂ = 6/2 = 3 mol.",
          },
          {
            label: "2. adım",
            explanation: "NH₃ = 3 × 2/3 = 2 mol.",
          },
          {
            label: "3. adım",
            explanation: "Ürün 2 × 17 = 34 g; tüketilen N₂ 28 g'dır.",
          },
        ],
        answer: "34 g NH₃",
        check: "6 + 28 = 34 g.",
        pitfall: "3:2 katsayısını gram oranı yapma.",
      },
      {
        title: "Oksijen hacminden ürüne",
        prompt:
          "2 CO + O₂ → 2 CO₂. NK'de ideal 2,24 L O₂ tamamen, yeterli CO ile tüketiliyor. Vₘ = 22,4 L/mol. CO₂ miktarı ve NK hacmi?",
        strategy: "O₂'yi mole çevir.",
        steps: [
          {
            label: "1. adım",
            explanation: "O₂ = 2,24/22,4 = 0,1 mol.",
          },
          {
            label: "2. adım",
            explanation: "CO₂ = 2 × 0,1 = 0,2 mol.",
          },
          {
            label: "3. adım",
            explanation: "Aynı NK'de CO₂ hacmi 0,2 × 22,4 = 4,48 L.",
          },
        ],
        answer: "0,2 mol; 4,48 L",
        check: "CO₂/O₂ hacim oranı 2'dir.",
        pitfall: "Gazların koşulları farklıysa oranı doğrudan kullanma.",
      },
      {
        title: "Kalsiyum oksitten geriye",
        prompt:
          "2 Ca + O₂ → 2 CaO. 14 g CaO oluştu. M(CaO)=56, M(Ca)=40 g/mol. Tüketilen Ca ve O₂ molü?",
        strategy: "Üründen katsayı oranıyla geri dön.",
        steps: [
          {
            label: "1. adım",
            explanation: "CaO = 14/56 = 0,25 mol.",
          },
          {
            label: "2. adım",
            explanation: "Ca = 0,25 mol; O₂ = 0,125 mol.",
          },
          {
            label: "3. adım",
            explanation: "Ca kütlesi 10 g, O₂ kütlesi 4 g'dır.",
          },
        ],
        answer: "0,25 mol Ca; 0,125 mol O₂",
        check: "10 + 4 = 14 g.",
        pitfall: "CaO molekülü demek yerine iyonik formül miktarını kullan.",
      },
      {
        title: "İki gazın toplamı",
        prompt:
          "2 H₂O → 2 H₂ + O₂. 0,4 mol su ayrıştı. Gazlar NK'de ideal ölçülüyor; Vₘ = 22,4 L/mol. Toplam hacim?",
        strategy: "Her ürünü ayrı hesapla.",
        steps: [
          {
            label: "1. adım",
            explanation: "H₂ 0,4 mol oluşur.",
          },
          {
            label: "2. adım",
            explanation: "O₂ 0,2 mol oluşur; toplam 0,6 mol gazdır.",
          },
          {
            label: "3. adım",
            explanation: "Toplam hacim 0,6 × 22,4 = 13,44 L.",
          },
        ],
        answer: "13,44 L",
        check: "H₂ 8,96 L + O₂ 4,48 L aynı sonucu verir.",
        pitfall: "Toplam gazı yalnız H₂ miktarına eşitleme.",
      },
    ],
    recall: [
      {
        prompt: "Miktar geçişinin üç ana basamağı nedir?",
        answer:
          "Verileni mole çevir, hedef/kaynak katsayısını uygula, hedef birime dön.",
      },
      {
        prompt: "Katsayı oranı doğrudan gram oranı mıdır?",
        answer: "Hayır; farklı mol kütleleri ayrıca hesaba katılır.",
      },
      {
        prompt: "Yeterli ikinci reaktif artansız başlangıç mı demektir?",
        answer: "Hayır; yalnız tepkimeyi sınırlamadığını belirtir.",
      },
      {
        prompt: "Ürün miktarından ilk örnek kütlesi kesin bulunur mu?",
        answer:
          "Tüketilen saf miktar bulunabilir; ilk toplam için artan ve safsızlık koşulları gerekir.",
      },
    ],
    items: [
      [
        "N₂ + 3 H₂ → 2 NH₃. 6 g H₂ yeterli N₂ ile tamamen tepkimeye giriyor. M(H₂)=2 ve M(NH₃)=17 g/mol. Kaç g NH₃ oluşur?",
        "34 g",
        ["4 g", "17 g", "51 g", "102 g"],
        "Önce H₂ molü, sonra 2/3.",
        "6/2 = 3 mol H₂;2 mol NH₃ =34 g. Katsayı gram oranı değildir.",
      ],
      [
        "N₂ + 3 H₂ → 2 NH₃. 0,9 mol H₂ tüketildiğinde kaç mol NH₃ oluşur?",
        "0,6 mol",
        ["0,3 mol", "0,9 mol", "1,35 mol", "2,7 mol"],
        "Hedef/kaynak oranı 2/3.",
        "0,9 × 2/3 =0,6 mol yeni NH₃ oluşur.",
      ],
      [
        "2 CO + O₂ → 2 CO₂. Aynı T ve P'de ideal 8 L CO tamamen, yeterli O₂ ile yanıyor. CO₂ hacmi kaç L olur?",
        "8 L",
        ["4 L", "12 L", "16 L", "24 L"],
        "CO/CO₂ katsayı oranı 1:1.",
        "Aynı koşullardaki ideal gazlarda hacim oranı mol oranıdır; CO ile CO₂ hacimleri eşittir.",
      ],
      [
        "CaCO₃ → CaO + CO₂. NK'de ideal 4,48 L CO₂ ölçüldü. Vₘ = 22,4 L/mol, M(CaCO₃)=100 g/mol. Tüketilen CaCO₃ kaç gram?",
        "20 g",
        ["4,48 g", "10 g", "44 g", "100 g"],
        "Gazdan mole, sonra giren grama.",
        "4,48/22,4 =0,2 mol CO₂;1:1 ile 0,2 mol CaCO₃ =20 g tüketilir.",
      ],
      [
        "2 KClO₃ → 2 KCl + 3 O₂. 0,4 mol KClO₃ ayrışırsa O₂ kaç mol olur?",
        "0,6 mol",
        ["0,2 mol", "0,4 mol", "0,8 mol", "1,2 mol"],
        "Ürün/kaynak oranı 3/2.",
        "0,4 × 3/2 =0,6 mol O₂. Katsayı yönünü ters çevirme.",
      ],
      [
        "2 Ca + O₂ → 2 CaO. 0,25 mol CaO için tüketilen O₂ kaç moldür?",
        "0,125 mol",
        ["0,25 mol", "0,5 mol", "1 mol", "2 mol"],
        "O₂/CaO oranı 1/2.",
        "0,25 × 1/2 =0,125 mol O₂ tüketilir.",
      ],
      [
        "2 H₂O → 2 H₂ + O₂. 0,4 mol su ayrışınca gaz ürünlerinin toplamı kaç mol olur?",
        "0,6 mol",
        ["0,2 mol", "0,4 mol", "0,8 mol", "1,2 mol"],
        "H₂ ve O₂ katkılarını topla.",
        "H₂ 0,4; O₂ 0,2; toplam 0,6 mol. Suyun kalan kısmı gaz ürünü sayılmaz.",
      ],
      [
        "0,5 mol NH₃ örneği kaç mol H atomu içerir?",
        "1,5 mol",
        ["0,5 mol", "1 mol", "2 mol", "3 mol"],
        "Bir molekülde üç H vardır.",
        "0,5 mol NH₃ ×3 =1,5 mol H atomu. NH₃ molekül molü 0,5 kalır.",
      ],
      [
        "N₂ + 3 H₂ → 2 NH₃. Başlangıçta 6 mol H₂ var; bunun yalnız 1,5 molü tüketiliyor. Yeni NH₃ kaç mol oluşur?",
        "1 mol",
        ["2 mol", "3 mol", "4 mol", "9 mol"],
        "Başlangıç değil tüketilen miktarı kullan.",
        "1,5 ×2/3 =1 mol NH₃. Tepkimeye katılmayan H₂ ürün hesabına girmez.",
      ],
      [
        "Bir tepkimede oluşan su H₂O(s) olarak verilmiştir. Toplam gaz hacmi hesaplanırken doğru yaklaşım nedir?",
        "Sıvı suyu gaz molüne katmamak.",
        [
          "Her mol suyu 22,4 L saymak.",
          "Suyun tüm atomlarını ayrı gaz saymak.",
          "Su katsayısını O₂'ye eklemek.",
          "Gaz hacmini katı kütleye eşitlemek.",
        ],
        "Fiziksel hâl simgesini oku.",
        "H₂O(s) sıvıdır; gaz molar hacmi ona uygulanmaz. Gaz ürünleri ayrı toplanır.",
      ],
    ],
    source:
      "Aurelia TYT Kimya 039 kopya kağıdı PDF 1–7; MEBİ TYT Kimya Konu Özetleri PDF 70–71; OGM 10. Sınıf Dersler Cepte ilgili öğretim sayfaları doğrudan karşılaştırıldı. Anlatım, şema ve beş seçenekli alıştırmalar özgündür; resmî sınav sorusu değildir.",
  },
  {
    id: "sinirlayici-bilesen",
    title: "Sınırlayıcı bileşen: denklem, başlangıç ürünü ve ters kontrol",
    topic: "detail-178",
    minutes: 50,
    objectives: [
      "Küçük mol tek başına sınırlayıcı değildir",
      "Başlangıç, değişim ve son satırı",
      "Başlangıç ürünü oluşan ürün değildir",
      "Kütleye dön ve toplamı koru",
    ],
    sections: [
      {
        title: "Küçük mol tek başına sınırlayıcı değildir",
        paragraphs: [
          "N₂ + 3 H₂ → 2 NH₃ için bir mol N₂ üç mol H₂ gerektirir.1 mol N₂ ve 2 mol H₂ karışımında N₂ daha az mol olsa da H₂ önce tükenir. Kararı ihtiyaç oranı verir.",
          "Her girenin n/ν değerini hesapla; ν pozitif denklem katsayısıdır. En küçük oran ideal tam gerçekleşmenin ilerleme kapasitesini belirler. Gram veya litre verildiyse uygun koşulla önce miktarı ortaklaştır.",
        ],
      },
      {
        title: "Başlangıç, değişim ve son satırı",
        paragraphs: [
          "N₂ başlangıcı a, H₂ başlangıcı b mol olsun. İlerleme ξ için değişimler N₂−ξ, H₂−3ξ, NH₃+2ξ biçimindedir. Hiçbir son giren miktarı negatif olamaz.",
          "Tam kapasite ξ = min(a,b/3) olur. Kısmi ilerlemede iki giren de kalabilir; bu, tam tepkimenin sınırlayıcısının değiştiği anlamına gelmez. Model kapasiteyi ve gerçekleşen seçili ilerlemeyi ayrı adlandırır.",
        ],
      },
      {
        title: "Başlangıç ürünü oluşan ürün değildir",
        paragraphs: [
          "Başta 17 g NH₃ varsa tepkimede yeni oluşan NH₃ buna eklenir. Son toplam ürünü bütününün bu denemede üretildiğini sanmak verimi ve korunum hesabını bozar.",
          "Modelde ilk NH₃ yalnız başlangıç envanteridir; ters tepkime ve denge bu öğretim modelinin dışında tutulur. Son kütle, yeni ürün ile eski ürün ve artanların toplamıdır. Gerçek amonyak üretiminin denge sınırlaması ayrı bilgidir.",
        ],
      },
      {
        title: "Kütleye dön ve toplamı koru",
        paragraphs: [
          "28 g N₂ ile 12 g H₂,1 mol ve 6 mol giren demektir. N₂ sınırlar;2 mol NH₃ oluşur ve 3 mol H₂ artar. Ürün 34 g, artan 6 g; toplam 40 g korunur.",
          "Başta 17 g NH₃ de varsa son NH₃ 51 g, artan H₂ 6 g ve toplam 57 g olur. Katsayıyı gram oranı sanmak bu çift denetimi geçemez. Her satırın sonunda kimyasal tür ve birim bulunmalıdır.",
        ],
      },
      {
        title: "Eşit kapasite ve sıfır sınırı",
        paragraphs: [
          "a = b/3 ise N₂ ile H₂ tam stokiyometrik oranla birlikte tükenir. Tek bir sınırlayıcı ismi zorlamak yerine birlikte bitişi açık yaz. Eşit gram veya eşit mol bu koşulun yerine geçmez.",
          "Bir giren sıfırsa kapasite sıfırdır. İkisi de sıfırsa “madde yok” durumu ayrı etiketlenir. Sıfır ürün oluşumu, ürün daha önce eklenmişse son ürünün de sıfır olmasını gerektirmez.",
        ],
      },
      {
        title: "Artan gazın son hacme katkısı",
        paragraphs: [
          "Gazlar aynı T/P'de ideal kabul edildiyse son toplam gaz molü ürün ve artan gazların toplamıdır. Fazı değişen veya sıvılaşan türü aynı biçimde gaz toplamında tutamazsın.",
          "2 CO + O₂ → 2 CO₂ için 8 L CO ve 6 L O₂'den 8 L CO₂ ile 2 L O₂ kalır. Son toplam 10 L'dir. Başlangıç toplam 14 L'nin korunması zorunlu değildir; atom ve kütle korunur.",
        ],
      },
      {
        title: "Ters veriden kapasiteyi sınama",
        paragraphs: [
          "Yeni NH₃ miktarı 2ξ ise ξ'yi üründen bulup tüketimleri geri hesaplayabilirsin. Bu tüketimler verilen başlangıçları aşarsa ölçüm, varsayım veya denklem tutarsızdır.",
          "Yalnız ürün miktarı, her reaktifin başlangıcını tek başına belirlemez. Ürünün hangisinin tükendiği ve artanla ilgili ikinci bilgi gerekir. “Daha fazla reaktif eklemek” ancak mevcut sınırlayıcıya uygun yöndeyse ürünü artırır.",
        ],
      },
      {
        title: "Gerçek tepkime ve model sınırı",
        paragraphs: [
          "Bu atölye tek yönlü, tek ürünlü, verilen stokiyometriye bağlı ideal miktar modelidir. Kaydırıcıdaki ilerleme yüzdesi geçen saniye veya laboratuvar verimi ölçümü değildir.",
          "Yan tepkime veya ayırma kaybı varsa yalnız hedef üründen bütün artanlar çıkarılamaz. Verim bilgisini tüketim yüzdesi sanma. Sonucun hangi koşula dayandığını söylemek, yalnız sınırlayıcı adını ezberlemekten daha güçlü kontroldür.",
        ],
      },
    ],
    examples: [
      {
        title: "Az molün aldatması",
        prompt:
          "N₂ + 3 H₂ → 2 NH₃. Başlangıç 1 mol N₂,2 mol H₂; ideal tam tepkime. Yeni ürün ve artan?",
        strategy: "n/ν oranlarını karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation: "N₂ kapasitesi 1; H₂ kapasitesi 2/3 mol.",
          },
          {
            label: "2. adım",
            explanation: "ξ =2/3; yeni NH₃ 4/3 mol.",
          },
          {
            label: "3. adım",
            explanation: "N₂ 1/3 mol kalır, H₂ tükenir.",
          },
        ],
        answer: "NH₃ 4/3 mol; N₂ 1/3 mol artar",
        check: "N atomu 2 ve H atomu 4 mol iki tarafta korunur.",
        pitfall: "Daha az mol olanı doğrudan seçme.",
      },
      {
        title: "Önceden ürün varsa",
        prompt:
          "N₂ + 3 H₂ → 2 NH₃.28 g N₂,12 g H₂,17 g ilk NH₃; M 28,2,17 g/mol. İdeal tam tepkimede son NH₃?",
        strategy: "Önce yeni ürünü, sonra toplamı bul.",
        steps: [
          {
            label: "1. adım",
            explanation: "N₂ 1 mol, H₂ 6 mol; ξ =1 mol.",
          },
          {
            label: "2. adım",
            explanation: "Yeni NH₃ 2 mol =34 g; H₂ 3 mol =6 g artar.",
          },
          {
            label: "3. adım",
            explanation: "Son NH₃ 17 +34 =51 g olur.",
          },
        ],
        answer: "51 g NH₃ ve 6 g H₂",
        check: "Başlangıç 57 g =son 57 g.",
        pitfall: "51 g'ın tamamını yeni ürün sayma.",
      },
      {
        title: "İkisi birlikte biter",
        prompt:
          "2 Mg + O₂ → 2 MgO.12 g Mg,8 g O₂; M 24 ve 32 g/mol. Tam tepkimede artan?",
        strategy: "Kapasiteleri katsayıya böl.",
        steps: [
          {
            label: "1. adım",
            explanation: "Mg 0,5 mol; O₂ 0,25 mol.",
          },
          {
            label: "2. adım",
            explanation: "0,5/2 =0,25/1 =0,25 mol.",
          },
          {
            label: "3. adım",
            explanation: "Her iki giren tükenir; MgO 0,5 mol =20 g.",
          },
        ],
        answer: "Artan yok;20 g MgO",
        check: "12 +8 =20 g.",
        pitfall: "En az bir artan olmak zorunda değildir.",
      },
      {
        title: "Kısmi ilerlemede son durum",
        prompt:
          "N₂ +3 H₂ →2 NH₃.1 mol N₂ ve 3 mol H₂ var; ideal kapasitenin %50'si kadar ilerledi. Son miktarlar?",
        strategy: "Gerçek ξ kapasitenin yarısıdır.",
        steps: [
          {
            label: "1. adım",
            explanation: "Kapasite 1 mol, seçili ξ0,5 moldür.",
          },
          {
            label: "2. adım",
            explanation: "N₂ 0,5 ve H₂ 1,5 mol tüketilir.",
          },
          {
            label: "3. adım",
            explanation: "N₂ 0,5, H₂ 1,5, NH₃ 1 mol kalır.",
          },
        ],
        answer: "0,5 mol N₂;1,5 mol H₂;1 mol NH₃",
        check: "N ve H atom toplamları sabittir.",
        pitfall: "Kısmi ilerlemede de bir giren sıfır olmalı sanma.",
      },
    ],
    recall: [
      {
        prompt: "Sınırlayıcı hangi karşılaştırmayla seçilir?",
        answer:
          "Girenlerin mol miktarları denklem katsayılarına bölünür; en küçük kapasite alınır.",
      },
      {
        prompt: "Başlangıç NH₃ son toplamda nasıl yer alır?",
        answer: "Yeni oluşan ürüne eklenir; yeni ürün olarak sayılmaz.",
      },
      {
        prompt: "İki giren birlikte tükenebilir mi?",
        answer: "Evet; kapasite oranları eşitse tam stokiyometrik bitiş olur.",
      },
      {
        prompt: "Kısmi ilerlemede iki giren de kalabilir mi?",
        answer: "Evet; kapasiteye ulaşılmamıştır.",
      },
    ],
    items: [
      [
        "N₂ +3 H₂ →2 NH₃ için 1 mol N₂,2 mol H₂ var. İdeal tam tepkimede sınırlayıcı hangisidir?",
        "H₂",
        [
          "N₂",
          "NH₃",
          "İkisi aynı anda biter.",
          "Verilenler karşılaştırılamaz.",
        ],
        "1/1 ve 2/3 kıyaslanır.",
        "2/3 daha küçük olduğundan H₂ sınırlar; N₂ daha az mol olması yeterli değildir.",
      ],
      [
        "N₂ +3 H₂ →2 NH₃ için 2 mol N₂,3 mol H₂ tam tepkimeye giriyor. Yeni NH₃ kaç mol?",
        "2 mol",
        ["1 mol", "3 mol", "4 mol", "6 mol"],
        "H₂ kapasitesi 3/3.",
        "ξ =1 mol; NH₃ 2ξ =2 mol. N₂'nin 1 molü artar.",
      ],
      [
        "N₂ +3 H₂ →2 NH₃ için 1 mol N₂,6 mol H₂ var. Tam tepkimede H₂ artanı kaç mol?",
        "3 mol",
        ["0 mol", "1 mol", "2 mol", "6 mol"],
        "Bir N₂ üç H₂ tüketir.",
        "N₂ tamamen biter;6−3 =3 mol H₂ kalır.",
      ],
      [
        "N₂ +3 H₂ →2 NH₃ için 1 mol N₂ ve 3 mol H₂ var. Tam tepkime sonucu hangisidir?",
        "İki giren birlikte tükenir.",
        [
          "Yalnız N₂'nin yarısı biter.",
          "H₂'nin 2 molü artar.",
          "N₂'nin 1 molü artar.",
          "Ürün oluşamaz.",
        ],
        "Kapasiteler 1 ve 1.",
        "Eşit kapasiteler tam oranı gösterir; artan zorunlu değildir.",
      ],
      [
        "N₂ +3 H₂ →2 NH₃.1 mol N₂ ve 6 mol H₂ yanında başlangıçta 1 mol NH₃ var. Tek yönlü ideal tam modelde son NH₃ kaç mol?",
        "3 mol",
        ["1 mol", "2 mol", "4 mol", "6 mol"],
        "Yeni ürün ile ilk ürünü topla.",
        "N₂ 1 mol →yeni NH₃ 2 mol; önceki 1 mol ile son toplam 3 mol olur.",
      ],
      [
        "N₂ +3 H₂ →2 NH₃.1 mol N₂,3 mol H₂ var; kapasitenin %50'si gerçekleşti. Son H₂ kaç mol?",
        "1,5 mol",
        ["0 mol", "0,5 mol", "1 mol", "3 mol"],
        "Seçili ilerleme ξ0,5 moldür.",
        "H₂ tüketimi 3 ×0,5 =1,5 mol; ilk 3 molden 1,5 mol kalır.",
      ],
      [
        "2 CO +O₂ →2 CO₂. Aynı T/P'de ideal 8 L CO ve 6 L O₂ tam tepkimeye giriyor. Son toplam gaz hacmi?",
        "10 L",
        ["8 L", "12 L", "14 L", "16 L"],
        "CO₂ ve artan O₂'yi topla.",
        "8 L CO,4 L O₂ tüketir;8 L CO₂ ve 2 L O₂ kalır; toplam 10 L.",
      ],
      [
        "2 Mg +O₂ →2 MgO için 12 g Mg ve 8 g O₂ var. M 24,32,40 g/mol. Tam tepkimede ürün kaç g?",
        "20 g",
        ["8 g", "12 g", "16 g", "40 g"],
        "Her gireni mole çevir.",
        "Mg 0,5 mol ve O₂ 0,25 mol tam oranlıdır;0,5 mol MgO 20 g oluşur.",
      ],
      [
        "N₂ +3 H₂ →2 NH₃. Başta N₂ yok, H₂ 3 mol ve NH₃ 1 mol var. Tek yönlü modelde yeni NH₃ kaç mol oluşur?",
        "0 mol",
        ["1 mol", "2 mol", "3 mol", "6 mol"],
        "Olmayan giren kapasiteyi sıfırlar.",
        "N₂ bulunmadığından yeni üretim 0'dır; ilk 1 mol NH₃ son envanterde kalabilir.",
      ],
      [
        "Sınırlayıcı girenin tamamen tükendiği tek yönlü bir tepkimede diğer reaktifin artması neyi tek başına kanıtlamaz?",
        "Ürün veriminin %100'den küçük olduğunu",
        [
          "Başlangıç oranının tam stokiyometrik olmadığını",
          "Bir maddenin tepkime sonunda bulunduğunu",
          "Artanın yeni ürün olmadığını",
          "Artan miktarının ayrıca yazılabileceğini",
        ],
        "Fazla reaktifle tam teorik ürün mümkün.",
        "Sınırlayıcı tamamen kullanılıp kuramsal ürünün tamamı oluşsa bile diğer reaktif artabilir; artan düşük verim kanıtı değildir.",
      ],
    ],
    source:
      "Aurelia TYT Kimya 040 kopya kağıdı PDF 1–7; MEBİ TYT Kimya Konu Özetleri PDF 70–72; OGM 10. Sınıf Dersler Cepte ilgili öğretim sayfaları doğrudan karşılaştırıldı. Anlatım, şema ve beş seçenekli alıştırmalar özgündür; resmî sınav sorusu değildir.",
  },
  {
    id: "kati-kutlesi-degisimi",
    title: "Katı kütlesi değişimi: oksijen alma ve uzaklaştırma",
    topic: "detail-179",
    minutes: 50,
    objectives: [
      "Terazinin kapsamı ilk denklemindir",
      "Magnezyumun oksijen alması",
      "Bakır oksitten oksijen uzaklaştırılması",
      "Kısmi dönüşümde iki katıyı topla",
    ],
    sections: [
      {
        title: "Terazinin kapsamı ilk denklemindir",
        paragraphs: [
          "Katı kütlesi, gazlarla birlikte kapalı sistemin toplam kütlesiyle aynı nicelik değildir. Katıya oksijen eklenirse tartılan katı artabilir; katıdan oksijen uzaklaşırsa azalabilir. Hiçbirinde atomlar yok olmaz.",
          "Gazın girip çıktığı açık deneyde yalnız katı kalıntıyı tarttığını belirt. Kabın darası, çıkan gaz ve dışarıdan giren reaktif ayrı hesaplanır. Yalnız katıdaki farkı bütün evrenin kütle kaybı gibi yorumlama.",
        ],
      },
      {
        title: "Magnezyumun oksijen alması",
        paragraphs: [
          "2 Mg +O₂ →2 MgO için 24 g Mg 16 g O alıp 40 g MgO oluşturur. O₂ molekülünden gelen oksijen atomları katının bileşimine katılır. Katı artışı bu modelde alınan oksijenin kütlesidir.",
          "Yalnız bir kısım Mg dönüşürse kalıntıda hem Mg hem MgO vardır. Başlangıçtaki bütün katıyı ürün diye adlandırma. Oksijenin yeterli olduğu ve başka yan ürün/kayıp bulunmadığı bu hesabın koşuludur.",
        ],
      },
      {
        title: "Bakır oksitten oksijen uzaklaştırılması",
        paragraphs: [
          "CuO +H₂ →Cu +H₂O için M(CuO)=80, M(Cu)=64, M(H₂O)=18 g/mol alınır. Her 80 g CuO'dan 16 g oksijen katıdan ayrılır;64 g Cu kalır.",
          "Su kütlesi yalnız katı kaybı değildir: çıkan 18 g suyun 2 gramı dışarıdan gelen H₂'dir. Bu nedenle katı 16 g azaldı diye 18 g suyu yanlış sayma. Kütleyi bütün reaktif ve ürünlerle kontrol et.",
        ],
      },
      {
        title: "Kısmi dönüşümde iki katıyı topla",
        paragraphs: [
          "80 g saf CuO'nun yarısı indirgenirse 40 g CuO kalır,40 g tüketilen CuO'dan 32 g Cu oluşur. Tartılan katı 72 g'dır; yeni Cu yalnız 32 g'dır.",
          "Katı kaybı 8 g O, oluşan su 9 g, tüketilen H₂ 1 g olur. Girenler 80+1, ürünler 72+9 =81 g. Aynı olayın iki ayrı sistem sınırı iki farklı ama tutarlı sonucu üretir.",
        ],
      },
      {
        title: "İnert dolgu kaybolmaz",
        paragraphs: [
          "Örnekte verilen koşulda tepkimeye girmeyen dolgu varsa önce saf reaktif kütlesini ayır. İnert kısmı stoikiyometrik dönüşüme sokma; kalıntı hesabına değişmeden ekle.",
          "100 g örneğin %80'i CuO ise 80 g CuO,20 g inert vardır. Tam indirgenmede 64 g Cu+20 g inert =84 g katı kalır.16 g kayıp,100 gramın tümünün oksidi olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Farktan geriye bileşim bul",
        paragraphs: [
          "Son katı kütlesinden çıkarılan değişim, tek gaz alışverişi modelinde oksijen miktarını belirleyebilir. Mg oksitlenmesinde 8 g artış,0,5 mol Mg'nin yani 12 g Mg'nin dönüştüğünü gösterir.",
          "Bunun ilk Mg'nin tamamı olduğunu söylemek için tam dönüşüm gerekir. Nem kaybı, başka gaz veya uçucu safsızlık da varsa aynı fark birden fazla kaynağı içerir. Ters probleme yeterli seçicilik verisini ekle.",
        ],
      },
      {
        title: "Kalıntı, ürün ve sistem toplamı",
        paragraphs: [
          "Kalıntı bir tartım kategorisidir; kimyasal kimliği tek olmak zorunda değildir. Ürün Cu, artan CuO ve inert dolgu aynı tartılan kalıntıda birlikte yer alabilir.",
          "Model bu üç parçayı ayrı ad ve miktarla gösterir. Gaz reaktifi katı toplamına baştan eklenmez; yalnız katıda kalan atom katkısı dahil edilir. Önceden eklenmiş su ya da gazı ürüne karıştırmak yeni bir hata kaynağıdır.",
        ],
      },
      {
        title: "Ölçümün geçerlilik sınırını denetle",
        paragraphs: [
          "Tam saf CuO'nun yalnız Cu'ya indirgenmesinde son katı başlangıcın %80'idir. Daha küçük katı oranı tek bu mekanizmayla açıklanamaz; ek kayıp veya yanlış veri gerekir.",
          "Kaydırıcı adımları zaman ölçümü değildir; seçili dönüşüm oranıdır. Sonuçlar, yeterli gaz reaktifi ve tek verilen reaksiyon varsayımına dayanır. Farkı yorumlamadan önce miktarların fiziksel olarak mümkün aralıkta kaldığını sınamak gerekir.",
        ],
      },
    ],
    examples: [
      {
        title: "Mg'de katı artışı",
        prompt:
          "12 g Mg tamamen MgO'ya dönüşüyor. M(Mg)=24, M(MgO)=40 g/mol. Artış ve son katı?",
        strategy: "Oksijen katkısını ayrı hesapla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Mg 12/24 =0,5 mol.",
          },
          {
            label: "2. adım",
            explanation: "MgO 0,5 ×40 =20 g olur.",
          },
          {
            label: "3. adım",
            explanation: "Katı artışı 20−12 =8 g'dır.",
          },
        ],
        answer: "20 g katı;8 g artış",
        check: "12 g Mg+8 g O =20 g.",
        pitfall: "O₂'nin molünü O atomu molüyle karıştırma.",
      },
      {
        title: "Yarım indirgenme",
        prompt:
          "80 g saf CuO'nun %50'si CuO+H₂→Cu+H₂O ile dönüşüyor. M(CuO)=80, M(Cu)=64, M(H₂)=2, M(H₂O)=18 g/mol. Son katı ve su?",
        strategy: "Artan oksit ile yeni metali topla.",
        steps: [
          {
            label: "1. adım",
            explanation: "40 g CuO =0,5 mol tüketilir.",
          },
          {
            label: "2. adım",
            explanation: "Cu 32 g ve su 9 g oluşur; CuO 40 g kalır.",
          },
          {
            label: "3. adım",
            explanation: "Katı 40+32 =72 g; H₂ tüketimi 1 g.",
          },
        ],
        answer: "72 g katı;9 g su",
        check: "80+1 =72+9 g.",
        pitfall: "8 g katı kaybını 9 g suya eşitleme.",
      },
      {
        title: "İnertli oksit",
        prompt:
          "100 g örnek %80 CuO, kalanı inerttir. CuO tamamen Cu'ya indirgeniyor; M 80→64 g/mol. Son katı?",
        strategy: "Saf kısım ve inert ayrı.",
        steps: [
          {
            label: "1. adım",
            explanation: "CuO 80 g, inert 20 g.",
          },
          {
            label: "2. adım",
            explanation: "80 g CuO'dan 64 g Cu oluşur.",
          },
          {
            label: "3. adım",
            explanation: "Son katı 64+20 =84 g'dır.",
          },
        ],
        answer: "84 g",
        check: "16 g O katıdan uzaklaşır.",
        pitfall: "İnert 20 gramı kayıp sanma.",
      },
      {
        title: "Artıştan ilk metale",
        prompt:
          "Saf Mg örneği tamamen MgO'ya dönüşünce katı kütlesi 4 g artıyor. M(Mg)=24, O=16 g/mol. İlk Mg?",
        strategy: "Artışı eklenen O olarak oku.",
        steps: [
          {
            label: "1. adım",
            explanation: "O atomu miktarı 4/16 =0,25 mol.",
          },
          {
            label: "2. adım",
            explanation: "Mg/O atom oranı 1:1; Mg 0,25 moldür.",
          },
          {
            label: "3. adım",
            explanation: "Mg kütlesi 0,25 ×24 =6 g.",
          },
        ],
        answer: "6 g Mg",
        check: "Son katı 10 g =6+4.",
        pitfall: "4 gramı MgO ürününün tümü sayma.",
      },
    ],
    recall: [
      {
        prompt: "CuO indirgenirken su kütlesi katı kaybına eşit midir?",
        answer: "Hayır; su ayrıca dışarıdan H₂ katkısı içerir.",
      },
      {
        prompt: "Kısmi tepkimede katı kalıntıda neler bulunabilir?",
        answer: "Yeni ürün, artan katı giren ve inert dolgu.",
      },
      {
        prompt: "Mg oksitlenirken katı artışının kaynağı nedir?",
        answer: "Katıya bağlanan oksijen kütlesi.",
      },
      {
        prompt: "Katı azalması kütle korunumu ihlali midir?",
        answer:
          "Hayır; gaz dahil bütün giren ve ürünlerle uygun sınırda toplam korunur.",
      },
    ],
    items: [
      [
        "24 g Mg, yeterli O₂ ile tamamen MgO oluyor. M(Mg)=24, M(MgO)=40 g/mol. Katı kütle artışı?",
        "16 g",
        ["8 g", "24 g", "32 g", "40 g"],
        "Bir mol Mg bir mol MgO verir.",
        "Son katı 40 g; artış 40−24 =16 g bağlanan O'dur.",
      ],
      [
        "CuO +H₂ →Cu +H₂O.80 g saf CuO tamamen dönüşüyor. M(CuO)=80, M(Cu)=64 g/mol. Son katı kaç g?",
        "64 g",
        ["16 g", "18 g", "80 g", "82 g"],
        "Oksidin bir molünden metal bir mol.",
        "1 mol CuO'dan 1 mol Cu 64 g oluşur.16 g O katıdan ayrılır.",
      ],
      [
        "CuO +H₂ →Cu +H₂O.80 g saf CuO'nun yarısı dönüştü. M(CuO)=80 ve M(Cu)=64 g/mol. Son katı kaç g?",
        "72 g",
        ["32 g", "40 g", "64 g", "80 g"],
        "Artan CuO ile yeni Cu'yu topla.",
        "40 g CuO kalır;0,5 mol Cu 32 g oluşur. Toplam 72 g'dır.",
      ],
      [
        "CuO +H₂ →Cu +H₂O.40 g CuO tamamen dönüşüyor. M(CuO)=80, M(Cu)=64, M(H₂)=2, M(H₂O)=18 g/mol. Oluşan su kaç g?",
        "9 g",
        ["8 g", "16 g", "18 g", "32 g"],
        "Suya H₂ de kütle verir.",
        "0,5 mol CuO 0,5 mol su verir:9 g. Katı kaybı 8 g; kalan 1 g sudaki H₂ katkısıdır.",
      ],
      [
        "100 g numune %80 CuO ve %20 inert içeriyor. CuO tamamen Cu'ya indirgeniyor; M 80→64 g/mol. Son katı kaç g?",
        "84 g",
        ["64 g", "80 g", "96 g", "100 g"],
        "Metali ve dolgu kütlesini ayrı topla.",
        "80 g CuO 64 g Cu verir;20 g inert kalır;84 g tartılır.",
      ],
      [
        "Saf Mg bütünüyle MgO'ya dönüşürken katı 4 g artıyor. Mg 24 ve O 16 g/mol. İlk Mg kaç g?",
        "6 g",
        ["4 g", "8 g", "10 g", "12 g"],
        "Artan 4 g O'dur.",
        "O 0,25 mol; Mg 0,25 ×24 =6 g. Artışın tümünü ürün sayma.",
      ],
      [
        "Bir katı kalıntıda artan CuO, yeni Cu ve inert madde bulunuyor. Hangisi doğrudur?",
        "Kalıntı kütlesi yalnız yeni ürün kütlesinden büyük olabilir.",
        [
          "Kalıntının tamamı zorunlu Cu'dur.",
          "İnert madde otomatik buharlaşır.",
          "Artan CuO ürün sayılır.",
          "Üç katı kütlesi toplanamaz.",
        ],
        "Kalıntı bir tartım kategorisidir.",
        "Kalıntı bütün kalan katıları kapsar; yeni Cu onun yalnız bir bileşeni olabilir.",
      ],
      [
        "CuO indirgenmesinde katı 8 g azalırken 9 g su çıkması nasıl açıklanır?",
        "Suya dışarıdan 1 g H₂ katkısı gelir.",
        [
          "Kütle korunmaz.",
          "1 g Cu yok olur.",
          "Su yalnız O atomlarından oluşur.",
          "Terazi zorunlu hatalıdır.",
        ],
        "Bütün giren ve ürünleri hesaba kat.",
        "CuO'dan 8 g O, H₂'den 1 g H suya katılır;9 g su oluşur. Uygun toplamda kütle korunur.",
      ],
      [
        "Yalnız CuO→Cu dönüşümünde saf CuO'nun tamamı indirgeniyor. M 80→64 g/mol. Son katının ilk katıya oranı?",
        "0,80",
        ["0,20", "0,64", "1,00", "1,25"],
        "Aynı mol için 64/80.",
        "Ürün/ilk kütle =64/80 =0,80. Bu sınırın altı ek mekanizma gerektirir.",
      ],
      [
        "Katı örnek ısıtılınca hem nem hem CO₂ kaybediyor. Toplam kütle kaybından yalnız CO₂ miktarı kesin bulunur mu?",
        "Hayır; iki kaynağı ayıran ek bilgi gerekir.",
        [
          "Evet, tamamı CO₂'dir.",
          "Evet, tamamı sudur.",
          "Her iki gazın molü eşittir.",
          "Kütle korunumu hiçbir bilgi vermez.",
        ],
        "Bir ölçüm iki katkının toplamıdır.",
        "Kayıp iki gazın toplamıdır. Katkılardan biri verilmeden yalnız CO₂ belirlenemez.",
      ],
    ],
    source:
      "Aurelia TYT Kimya 041 kopya kağıdı PDF 1–7; MEBİ TYT Kimya Konu Özetleri PDF 70–72; OGM 10. Sınıf Dersler Cepte ilgili öğretim sayfaları doğrudan karşılaştırıldı. Anlatım, şema ve beş seçenekli alıştırmalar özgündür; resmî sınav sorusu değildir.",
  },
  {
    id: "yuzde-verim",
    title: "Yüzde verim: kuramsal üst sınırdan ölçülen ürüne",
    topic: "detail-180",
    minutes: 50,
    objectives: [
      "Teorik ve gerçek aynı ürünü anlatmalı",
      "Önce sınırlayıcı sonra ürün",
      "Yüzdeyi doğru yönde kur",
      "Ters problemde kesre böl",
    ],
    sections: [
      {
        title: "Teorik ve gerçek aynı ürünü anlatmalı",
        paragraphs: [
          "Kuramsal ürün, verilen saf girenler ve seçilen denklemle hesaplanan üst sınırdır. Gerçek ürün deneyde elde edilen aynı ürünün ölçülmüş miktarıdır. İkisinin oranı ancak türleri ve birimleri eşleşince anlamlıdır.",
          "Gerçek CO₂ gramını teorik CaO gramına bölmek verim değildir. Gram ve mol farklı verilmişse aynı üründe birini diğerine dönüştür. Birim sadeleştiğinde oran boyutsuz, yüzde ise bu oranın 100 katıdır.",
        ],
      },
      {
        title: "Önce sınırlayıcı sonra ürün",
        paragraphs: [
          "N₂ +3 H₂ →2 NH₃ için her girenin mol/katsayı değerini bul. En küçük kapasiteye göre kuramsal NH₃ hesaplanır; çok olan reaktifi esas almak kuramsal sınırı şişirir.",
          "1 mol N₂ ve 3 mol H₂ en fazla 2 mol yani 34 g NH₃ verir. H₂ fazlası ürünün daha fazla oluşacağını garanti etmez. Teorik üst sınır gerçek koşullarda kesin ulaşılacak miktar değildir.",
        ],
      },
      {
        title: "Yüzdeyi doğru yönde kur",
        paragraphs: [
          "Verim = gerçek/teorik ×100'dür. Teori 34 g ve ölçülen 27,2 g aynı saf NH₃ ise 27,2/34 =0,8 ve %80 bulunur. Pay ölçülen, payda beklenen üründür.",
          "Teorik/gerçek kullanmak bu örnekte %125 verir ve oranı ters kurar. Önce iki miktarı adlandırmak, ezberden büyük sayıyı küçüğe bölmekten güvenilirdir. Artan reaktifin bulunması tek başına düşük verim kanıtı değildir.",
        ],
      },
      {
        title: "Ters problemde kesre böl",
        paragraphs: [
          "Gerçek ürün 24 g ve verim %60 ise 24 = teorik ×0,60 yaz. Teorik 40 g olur. Verilmiş 24 g'ı bir kez daha 0,60 ile çarpmak teorik ürünün gerçek üründen daha küçük çıkmasına yol açar.",
          "Verim %0 olduğunda ters bölme yapılamaz. Gerçek 0 ve teori pozitifse ileri oran %0'dır; teori 0 ise yüzde formülü tanımsızdır. Model bu sınırı keyfî%0 veya %100 diye doldurmaz.",
        ],
      },
      {
        title: "Saflık ile verim iki ayrı tabandır",
        paragraphs: [
          "Saflık ilk numunedeki etkin reaktif payıdır. Verim ise bu etkin reaktiften hesaplanan hedef ürünün ne kadarının elde edildiğidir. Önce saf kütle, sonra sınırlayıcı, sonra kuramsal ürün, en son ölçülen ürün sırası izlenir.",
          "40 g numune %75 CaCO₃ içeriyorsa saf reaktif 30 g'dır. Bunun teorik CO₂'si 13,2 g; elde etme verimi %80 ise 10,56 g ölçülür. Numunenin %75 saflığını ikinci kez ürün verimi diye uygulama.",
        ],
      },
      {
        title: "Yüzde 100 üstü veriyi saklama",
        paragraphs: [
          "Aynı saf ürünün gerçek ölçümü teorik azamiyi aşarsa aritmetik olarak %100'den büyük oran çıkar. Bu, verilen ideal modelle veri uyumsuzluğudur; otomatik olarak %100'e kırpılmamalıdır.",
          "Nemli veya kirli ürün tartılması, eksik giren bilgisi, yanlış saflık, ürün kimliği ya da cihaz hatası incelenebilir. Model gerçek miktarı üst sınıra zorla eşitlemez; oranı ve “veri/varsayım tutarsızlığı” uyarısını birlikte gösterir.",
        ],
      },
      {
        title: "Dönüşüm ve toplama kaybını ayır",
        paragraphs: [
          "Hedef ürünün az elde edilmesi, reaktifin az dönüşmesi kadar ürünün ayırma sırasında kaybolmasından da kaynaklanabilir. Yalnız son ürün verimi bütün reaktiflerin kalan miktarını belirlemez.",
          "Tek reaksiyonlu kapalı ve kayıpsız bir dönüşüm yüzdesi ayrıca verilmişse tüketimleri kurabilirsin. Fakat izole edilmiş ürün verimini tepkime ilerlemesi sanıp artanları çıkarmak koşulsuz doğru değildir; model bu iddiayı kurmaz.",
        ],
      },
      {
        title: "Ardışık verim ve karşılaştırma",
        paragraphs: [
          "Aynı akışta ilk aşama %80, ikinci aşama ilk aşamadan gelenin %75'ini koruyorsa toplam çarpan 0,80 ×0,75 =0,60'tır. Paralel iki deneyin yüzdeleri bu şekilde çarpılmaz.",
          "İki deneyi karşılaştırırken ham gramı değil, gerçek/teorik oranlarını karşılaştır.12/20 =%60 ve 15/20 =%75 arasındaki fark 15 yüzde puandır. “%15 daha fazla” ifadesiyle yüzde puanı birbirine karıştırma.",
        ],
      },
    ],
    examples: [
      {
        title: "Doğrudan oran",
        prompt: "Kuramsal aynı ürün 20 g, ölçülen 15 g. Yüzde verim?",
        strategy: "Payı gerçek, paydayı teori seç.",
        steps: [
          {
            label: "1. adım",
            explanation: "Gerçek 15, teorik 20 g olarak etiketle.",
          },
          {
            label: "2. adım",
            explanation: "15/20 =0,75 hesapla.",
          },
          {
            label: "3. adım",
            explanation: "0,75 ×100 =%75.",
          },
        ],
        answer: "%75",
        check: "20 ×0,75 =15 g.",
        pitfall: "20/15 işlemi ters orandır.",
      },
      {
        title: "Sınırlayıcıdan teoriye",
        prompt:
          "N₂ +3 H₂ →2 NH₃.2 mol N₂,3 mol H₂ ve gerçek 25,5 g NH₃. M 17 g/mol. Verim?",
        strategy: "Önce kapasiteyi bul.",
        steps: [
          {
            label: "1. adım",
            explanation: "2/1 ve 3/3 kıyasından ξ1 mol.",
          },
          {
            label: "2. adım",
            explanation: "Teorik NH₃ 2 mol =34 g.",
          },
          {
            label: "3. adım",
            explanation: "25,5/34 ×100 =%75.",
          },
        ],
        answer: "%75",
        check: "H₂ kuramsal sınırı belirler.",
        pitfall: "2 mol N₂'nin tamamını tüketilmiş sayma.",
      },
      {
        title: "Saflık ve verim",
        prompt:
          "40 g numune %75 CaCO₃; M 100 ve 44 g/mol, CaCO₃→CaO+CO₂. Gerçek CO₂ 10,56 g. Verim?",
        strategy: "Saflığı önce uygula.",
        steps: [
          {
            label: "1. adım",
            explanation: "Saf CaCO₃ 40 ×0,75 =30 g =0,3 mol.",
          },
          {
            label: "2. adım",
            explanation: "Teorik CO₂ 0,3 ×44 =13,2 g.",
          },
          {
            label: "3. adım",
            explanation: "10,56/13,2 ×100 =%80.",
          },
        ],
        answer: "%80",
        check: "Saflık %75, ürün verimi %80 ayrı niceliktir.",
        pitfall: "Paydaya 40 gramı doğrudan koyma.",
      },
      {
        title: "Tutarsız ölçüm",
        prompt:
          "Saf hedef üründe teori 10 g, tartılan 11 g. Verim hesabı ve yorum?",
        strategy: "Hesabı yap, model sınırını denetle.",
        steps: [
          {
            label: "1. adım",
            explanation: "11/10 =1,1 oranını bul.",
          },
          {
            label: "2. adım",
            explanation: "Yüzde 110 çıkar.",
          },
          {
            label: "3. adım",
            explanation:
              "İdeal üst sınır aşılmış; ölçüm, saflık ve varsayımlar yeniden incelenmelidir.",
          },
        ],
        answer: "%110; verilen ideal modelle tutarsız",
        check: "Sonuç %100'e gizlice kırpılmaz.",
        pitfall:
          "Aritmetiğin yapılabilmesi verinin fiziksel olarak tutarlı olduğunu kanıtlamaz.",
      },
    ],
    recall: [
      {
        prompt: "Yüzde verimin formülü nedir?",
        answer: "Aynı ürün ve birimde gerçek/teorik ×100.",
      },
      {
        prompt: "Teori 0 olduğunda yüzde tanımlı mıdır?",
        answer: "Hayır; sıfıra bölme yapılmaz.",
      },
      {
        prompt: "Artan reaktif düşük verim kanıtı mıdır?",
        answer: "Hayır; fazla reaktifle tam teorik ürün mümkün olabilir.",
      },
      {
        prompt: "Ürün verimi bütün artanları verir mi?",
        answer:
          "Hayır; dönüşüm, yan reaksiyon ve ayırma kaybı hakkında ek koşul gerekir.",
      },
    ],
    items: [
      [
        "Aynı ürün için teorik 24 g, gerçek 18 g verilmiştir. Yüzde verim kaçtır?",
        "%75",
        ["%25", "%80", "%125", "%133,33"],
        "Gerçek/teorik oranını kullan.",
        "18/24 ×100 =%75. Payda beklenen, pay ölçülen miktardır.",
      ],
      [
        "Aynı ürünün kuramsal miktarı 45 g ve verim %80. Gerçek ürün kaç g olur?",
        "36 g",
        ["9 g", "45 g", "56,25 g", "80 g"],
        "Yüzdeyi 0,80 kesri yap.",
        "45 ×0,80 =36 g. Bu ileri hesapta teoriyle verim kesri çarpılır.",
      ],
      [
        "Gerçek ürün 12 g, verim %75 ise teorik ürün kaç g'dır?",
        "16 g",
        ["9 g", "12 g", "15 g", "25 g"],
        "12 =teori ×0,75.",
        "Teori 12/0,75 =16 g; ters işlem çarpma değildir.",
      ],
      [
        "N₂ +3 H₂ →2 NH₃.2 mol N₂,3 mol H₂ başlangıcından 1,6 mol NH₃ elde ediliyor. Verim?",
        "%80",
        ["%40", "%50", "%60", "%100"],
        "H₂'ye göre teorik NH₃ 2 moldür.",
        "ξ=min(2,1)=1; teorik 2 mol.1,6/2 ×100 =%80.",
      ],
      [
        "CaCO₃→CaO+CO₂.25 g saf CaCO₃, gerçek 8,8 g CO₂. M 100 ve 44 g/mol. Verim kaçtır?",
        "%80",
        ["%35,2", "%50", "%75", "%125"],
        "0,25 mol CaCO₃ teorik CO₂'yi verir.",
        "Teori 0,25 ×44 =11 g;8,8/11 =0,80.",
      ],
      [
        "60 g numune %80 CaCO₃. CaCO₃→CaO+CO₂, M 100 ve 44 g/mol. Ölçülen CO₂ 15,84 g; safsızlık inert. Verim?",
        "%75",
        ["%60", "%80", "%90", "%100"],
        "Önce 48 g saf CaCO₃ ayır.",
        "0,48 molün teorisi 21,12 g CO₂;15,84/21,12 =%75. Saflık ayrı %80'dir.",
      ],
      [
        "Kuramsal saf ürün 10 g iken aynı saf ürün 11 g tartılmış. Doğru yorum hangisidir?",
        "Oran %110'dur; ideal model ve ölçüm birlikte yeniden kontrol edilir.",
        [
          "Sonuç otomatik %100 yapılır.",
          "Kütle korunumu gerekmez.",
          "Verim her zaman %110 olmalıdır.",
          "Teorik ürün 11 g diye değiştirilir.",
        ],
        "Üst sınırı aşmayı gizleme.",
        "11/10 ×100 =%110 aritmetik sonucu verilir; doğru tanımlı kuramsal sınırı aştığından veri/varsayım tutarsızlığı vardır.",
      ],
      [
        "Kuramsal hedef ürün 0 g, gerçek ürün 0 g. Yüzde verim için doğru ifade nedir?",
        "0/0 nedeniyle bu formülle tanımsızdır.",
        [
          "Kesin %0'dır.",
          "Kesin %100'dür.",
          "Kesin %50'dir.",
          "Kesin %200'dür.",
        ],
        "Paydayı kontrol et.",
        "Yüzde verim oranının paydası sıfırdır;0/0'a keyfî yüzde atanmaz.",
      ],
      [
        "Aynı ürün akışında ardışık aşamalar %90 ve %80 verimlidir. Tam verimli akışa göre toplam verim nedir?",
        "%72",
        ["%10", "%17", "%80", "%85"],
        "Kesirleri sırayla uygula.",
        "0,90 ×0,80 =0,72; toplam %72. Yüzdeleri toplamak veya düz ortalama almak bu akışa uymaz.",
      ],
      [
        "A deneyinde gerçek 9/teorik 12 g, B deneyinde gerçek 12/teorik 15 g aynı ürün vardır. Hangisinin yüzde verimi daha büyüktür?",
        "B; %80'e karşı %75.",
        [
          "A deneyinin verimi daha büyüktür.",
          "İkisi %75.",
          "İkisi %80.",
          "Gramlar farklı diye hesap yapılamaz.",
        ],
        "Her deneyin kendi paydasını kullan.",
        "A 9/12 =%75, B 12/15 =%80. Ham ürün kütlesi yerine oranlar kıyaslanır.",
      ],
    ],
    source:
      "Aurelia TYT Kimya 042 kopya kağıdı PDF 1–7; MEBİ TYT Kimya Konu Özetleri PDF 71–72; OGM 10. Sınıf Dersler Cepte ilgili öğretim sayfaları doğrudan karşılaştırıldı. Anlatım, şema ve beş seçenekli alıştırmalar özgündür; resmî sınav sorusu değildir.",
  },
  {
    id: "safsizlik-problemleri",
    title: "Saflık: numuneden etkin reaktife ve geriye",
    topic: "detail-181",
    minutes: 50,
    objectives: [
      "Numune bütün, saf kısım paydır",
      "Denkleme hangi miktar girer",
      "Üründen numuneye geri dön",
      "Bilinen ürün verimini düzelt",
    ],
    sections: [
      {
        title: "Numune bütün, saf kısım paydır",
        paragraphs: [
          "Kütlece saflık = etkin bileşenin kütlesi/numune kütlesi ×100'dür.50 g numunenin %80'i istenen maddeyse 40 g etkin,10 g diğer bileşen vardır. Payda ilk toplamdır.",
          "Saflık sözcüğü hedef bileşene göre tanımlanır; “diğer” her koşulda zararlı veya tepkimesiz demek değildir. Soruda inert denmişse yalnız belirtilen koşullarda tepkime vermediğini kabul et.",
        ],
      },
      {
        title: "Denkleme hangi miktar girer",
        paragraphs: [
          "CaCO₃→CaO+CO₂ için inert dolgulu numunenin tümünü 100 g/mol'e bölmek yanlış mole götürür. Önce numune ×saflık kesriyle CaCO₃ kütlesini ayır, sonra n=m/M kullan.",
          "80 g numune %75 CaCO₃ içeriyorsa saf 60 g =0,6 moldür. Tam dönüşümde 0,6 mol CO₂ =26,4 g oluşur.20 g inert CO₂ kaynağı değildir; kalıntı kapsamındaysa değişmeden bulunur.",
        ],
      },
      {
        title: "Üründen numuneye geri dön",
        paragraphs: [
          "CO₂'nin tek kaynağı CaCO₃ ve bütün etkin bileşen tepkimeye girmişse gazdan tüketilen CaCO₃ bulunabilir.11 g CO₂,0,25 mol yani 25 g CaCO₃'ye karşılık gelir.",
          "Numune 50 g ise saflık %50'dir. Numunenin yalnız bir kısmı dönüşmüş veya gaz kaybolmuşsa bu hesap ilk saflığı olduğundan küçük gösterebilir. Tam dönüşüm ve toplama koşulları ters çıkarımın temelidir.",
        ],
      },
      {
        title: "Bilinen ürün verimini düzelt",
        paragraphs: [
          "Ölçülen CO₂ 8,8 g ve eldesi %80 verimliyse teorik CO₂ 8,8/0,80 =11 g'dır. Bu teoriye göre saf CaCO₃ 25 g bulunur. Saflık yüzdesi daha sonra numune kütlesine bölünür.",
          "Verim kaybının hangi ürüne ait olduğu açık olmalıdır. Ürün verimini numune saflığı diye yazma; ikisi farklı paydaları olan oranlardır. Verim %0 ise ters bölme yapılamaz ve saflık tek ölçümle çıkmaz.",
        ],
      },
      {
        title: "Karışımın iki bileşeni de etkinse",
        paragraphs: [
          "İkinci bileşen de aynı gazı veriyorsa ölçülen gazın tamamını CaCO₃'ye bağlayamazsın. Her bileşen için mol ve ürün katsayısı yazılmalı; ikinci bağımsız bilgi gerekebilir.",
          "CaCO₃ ile MgCO₃'ün ikisi de CO₂ üretir. Bu durum inert kum içeren numuneden farklıdır. “Safsızlık” etiketiyle diğer bileşenin kimyasal katkısını silmek, gerçekte tepkimeli karışım problemi olan soruyu yanlış basitleştirir.",
        ],
      },
      {
        title: "Saflık ve kütle korunumu",
        paragraphs: [
          "50 g örneğin 25 g'ı CaCO₃,25 g'ı inertse tam ayrışmada 14 g CaO ve 11 g CO₂ oluşur. Katı kalıntı 14+25 =39 g'dır; katı ile gaz toplam 50 g olur.",
          "Ürün toplama verimi düşük verilirse eksik toplanan ürünün nerede kaldığı açıklanmadan katı kalıntı kesin hesaplanamaz. Model yalnız saflık çıkarımı yapar; ayırma kaybını otomatik tepkime tüketimine çevirmediğini belirtir.",
        ],
      },
      {
        title: "Yüzde sınırlarını veri denetimi yap",
        paragraphs: [
          "Çıkarılan saf kütle ilk numuneden büyükse hesap %100 üstü verir. Doğru tepki sayıyı %100'e kırpmak değil; gazın tek kaynağı, verim veya ölçüm varsayımını sorgulamaktır.",
          "Negatif inert kütle fiziksel bir bileşen değildir. Model bu durumda geçerli bir numune bileşimi çizmez; uyuşmazlığı görünür bildirir.0 numune kütlesi için yüzde tanımı da ayrıca sınanmalıdır.",
        ],
      },
      {
        title: "Planlı ters çözüm",
        paragraphs: [
          "Önce ölçülen ürünün kimliğini ve birimini yaz, varsa verim kesrine böl, mole çevir ve denklemle etkin girene dön. Son adım saf kütle/numune toplamıdır.",
          "Çözümü başlangıç numunesine geri koyarak teorik ürün ve gerçek ölçümü yeniden üret. Bu çift yönlü denetim, yüzdeleri gelişigüzel çarpmayı engeller. Başlangıç saflığı ile kişisel çalışma başarısı bu ünitede farklı kavramlardır.",
        ],
      },
    ],
    examples: [
      {
        title: "Etkin kütleyi ayır",
        prompt:
          "90 g numunenin %70'i hedef madde, kalanı inert. İki kütle nedir?",
        strategy: "Yüzdeyi kesre çevir.",
        steps: [
          {
            label: "1. adım",
            explanation: "%70 =0,70.",
          },
          {
            label: "2. adım",
            explanation: "Saf 90 ×0,70 =63 g.",
          },
          {
            label: "3. adım",
            explanation: "İnert 90−63 =27 g.",
          },
        ],
        answer: "63 g saf;27 g inert",
        check: "63+27 =90 g.",
        pitfall: "70 ile çarparak 6300 g bulma.",
      },
      {
        title: "Gazdan saflığa",
        prompt:
          "50 g CaCO₃/inert numunesi tam ayrışıp 11 g CO₂ verdi. M 100 ve 44 g/mol. Saflık?",
        strategy: "Gazın tek kaynağı karbonattır.",
        steps: [
          {
            label: "1. adım",
            explanation: "CO₂ 11/44 =0,25 mol.",
          },
          {
            label: "2. adım",
            explanation: "CaCO₃ 0,25 ×100 =25 g.",
          },
          {
            label: "3. adım",
            explanation: "Saflık 25/50 ×100 =%50.",
          },
        ],
        answer: "%50",
        check: "Teori 25 ×44/100 =11 g CO₂.",
        pitfall: "Gaz gramını numune gramına doğrudan bölme.",
      },
      {
        title: "Verimli ters problem",
        prompt:
          "50 g CaCO₃/inert numunesinden CO₂ 8,8 g elde edildi; ürün eldesi %80. M 100 ve 44 g/mol, gazın tek kaynağı karbonat. Saflık?",
        strategy: "Ölçümü önce teorik ürüne düzelt.",
        steps: [
          {
            label: "1. adım",
            explanation: "Teorik CO₂ 8,8/0,8 =11 g.",
          },
          {
            label: "2. adım",
            explanation: "Bu gaz 0,25 mol ve 25 g CaCO₃ gerektirir.",
          },
          {
            label: "3. adım",
            explanation: "25/50 ×100 =%50 saflık.",
          },
        ],
        answer: "%50",
        check: "25 ×0,44 ×0,8 =8,8 g.",
        pitfall: "Ürün %80'ini numune saflığı sanma.",
      },
      {
        title: "Gereken numune",
        prompt:
          "27 g saf Al gerekir; numune %90 Al ve kalanı inert. Kaç g numune alınır?",
        strategy: "Saf =numune ×kesir yaz.",
        steps: [
          {
            label: "1. adım",
            explanation: "27 =m ×0,90.",
          },
          {
            label: "2. adım",
            explanation: "m=27/0,90 =30 g.",
          },
          {
            label: "3. adım",
            explanation: "İnert 30−27 =3 g olur.",
          },
        ],
        answer: "30 g numune",
        check: "30 ×0,90 =27 g.",
        pitfall: "27'yi 0,90 ile çarpmak ters işlemdir.",
      },
    ],
    recall: [
      {
        prompt: "Saflık yüzdesinin paydası nedir?",
        answer: "İlk numunenin toplam kütlesi.",
      },
      {
        prompt: "İnert bütün koşullarda tepkimesiz midir?",
        answer:
          "Hayır; yalnız verilen deney koşulunda tepkime vermeyen olarak tanımlanır.",
      },
      {
        prompt: "Ölçülen ürün ve bilinen verimden teori nasıl bulunur?",
        answer:
          "Gerçek ürün, verim kesrine bölünür; sıfır verimde ters bölme yapılamaz.",
      },
      {
        prompt: "Çıkarılan saf kütle numuneden büyükse ne yapılır?",
        answer:
          "Veri ve varsayımlar sorgulanır; yüzde gizlice 100'e kırpılmaz.",
      },
    ],
    items: [
      [
        "90 g numune %70 saf hedef madde içeriyor. Saf kütle kaç g?",
        "63 g",
        ["27 g", "70 g", "90 g", "128,57 g"],
        "Numuneyi 0,70 ile çarp.",
        "90 ×0,70 =63 g; kalan 27 g'dır.",
      ],
      [
        "80 g numunede 20 g inert ve 60 g hedef bileşen var. Kütlece saflık?",
        "%75",
        ["%20", "%25", "%60", "%80"],
        "Hedefi ilk toplama böl.",
        "60/80 ×100 =%75. İnert kütlesi paya alınmaz.",
      ],
      [
        "%80 saf numunede 36 g hedef madde var. Numune toplam kaç gramdır?",
        "45 g",
        ["28,8 g", "36 g", "44 g", "80 g"],
        "36 =m ×0,80.",
        "m=36/0,80 =45 g;9 g diğer bileşen bulunur.",
      ],
      [
        "CaCO₃→CaO+CO₂.20 g numune inert dolgu içeriyor; tek CO₂ kaynağı CaCO₃ tam tepkimeyle 4,4 g CO₂ veriyor. M 100 ve 44 g/mol. Saflık?",
        "%50",
        ["%22", "%44", "%75", "%100"],
        "Gazı mole ve karbonata dönüştür.",
        "4,4/44 =0,1 mol;10 g CaCO₃;10/20 =%50.",
      ],
      [
        "50 g numune %80 CaCO₃ içeriyor; kalanı inert. CaCO₃→CaO+CO₂, M 100 ve 44. CO₂ eldesi %50 verimli. Gerçek CO₂ kaç g?",
        "8,8 g",
        ["4,4 g", "17,6 g", "20 g", "22 g"],
        "Saf reaktifi önce ayır.",
        "Saf 40 g =0,4 mol; teori 17,6 g; gerçek 8,8 g olur.",
      ],
      [
        "CaCO₃/inert numunesi 50 g. Tek kaynaktan ölçülen CO₂ 8,8 g, eldesi %80. M 100 ve 44. Numune saflığı nedir?",
        "%50",
        ["%40", "%64", "%80", "%100"],
        "Gazı önce 0,80'e böl.",
        "Teorik 11 g CO₂ 0,25 mol CaCO₃ yani 25 g gerektirir.25/50 =%50.",
      ],
      [
        "İnert sözcüğünün bu sorulardaki doğru anlamı nedir?",
        "Verilen koşullarda tepkimeye girmeyen bileşen.",
        [
          "Her koşulda hiçbir maddeyle tepkime vermeyen.",
          "Mutlaka zehirli madde.",
          "Tartılamayan madde.",
          "Daima gaz olan bileşen.",
        ],
        "Koşul kapsamını koru.",
        "İnertlik bu deney modeli için tanımlanır; bütün kimyaya yayılan mutlak özellik değildir.",
      ],
      [
        "CaCO₃ ve MgCO₃ aynı numunede birlikte CO₂ veriyor. Yalnız toplam CO₂'den tüm gazı CaCO₃'ye bağlamak neden yanlıştır?",
        "İkinci bileşenin de gaz katkısı vardır.",
        [
          "MgCO₃ kütlesizdir.",
          "CO₂ hiçbir zaman ölçülemez.",
          "Karbonatlar gaz oluşturmaz.",
          "Her bileşenin gramı eşittir.",
        ],
        "Her bileşenin tepkimesini ayrı yaz.",
        "İki katkı toplanır. Tek kaynağa özgü ters saflık hesabı koşulu sağlanmaz.",
      ],
      [
        "10 g numuneden çıkarılan etkin bileşen 12 g bulunuyor. Hangi yorum doğrudur?",
        "Varsayımlar veya veriler bu bileşimle tutarsızdır.",
        [
          "İnert−2 g gerçek bir maddedir.",
          "Saflık otomatik %100 yapılmalıdır.",
          "Toplam numune 12 g diye değiştirilir.",
          "Sonuç kesin %80'dir.",
        ],
        "Saf kütle toplamı aşamaz.",
        "12/10 =%120 fiziksel numune payı olamaz. Tek kaynak, ölçüm ve verim kontrol edilir.",
      ],
      [
        "Bir numunede saf bileşen 18 g, inert 2 g. Saflık yüzdesi için doğru işlem hangisidir?",
        "18/(18+2) ×100",
        ["18/2 ×100", "2/18 ×100", "18 ×2", "20/18 ×100"],
        "Payda numunenin tamamıdır.",
        "Toplam 20 g;18/20 ×100 =%90. Saf kütlenin kendisi paydaya konmaz.",
      ],
    ],
    source:
      "Aurelia TYT Kimya 043 kopya kağıdı PDF 1–7; MEBİ TYT Kimya Konu Özetleri PDF 70–72; OGM 10. Sınıf Dersler Cepte ilgili öğretim sayfaları doğrudan karşılaştırıldı. Anlatım, şema ve beş seçenekli alıştırmalar özgündür; resmî sınav sorusu değildir.",
  },
  {
    id: "atom-kutlesi-hesaplari",
    title: "Atom kütlesi: izotop, bolluk ve bilinmeyen mol kütlesi",
    topic: "detail-182",
    minutes: 50,
    objectives: [
      "İzotopun kimliğini proton sayısı belirler",
      "Gerçek izotop kütlesi ve u",
      "Atom bolluğu ağırlığı belirler",
      "Ortalama aralık denetimi",
    ],
    sections: [
      {
        title: "İzotopun kimliğini proton sayısı belirler",
        paragraphs: [
          "Aynı elementin izotopları aynı proton sayısına, farklı nötron sayısına sahiptir. Kütle numarası A proton ve nötronların tam sayı toplamıdır. Z proton sayısıysa nötron sayısı A−Z'dir.",
          "Ortalama atom kütlesini A yerine yazıp kesirli nötron bulamazsın. Ortalama bir örnek topluluğunun özelliğidir; tek tek atomlarda ortalama değerli yeni bir izotop var olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Gerçek izotop kütlesi ve u",
        paragraphs: [
          "u, karbon-12 atomunun kütlesinin on ikide biridir. Gerçek izotop kütlesi kütle numarasına çok yakın olabilir ama tam eşit olmak zorunda değildir. Soruda kütle verilmişse o değeri kullan.",
          "Bağıl atom kütlesi boyutsuz oran, ortalama atomik kütle u, mol kütlesi g/mol ile yazılır. Hesabın sayısal benzerliği bu birim ayrımını kaldırmaz. Model yaklaşık 35 ve 37 u'luk aynı Z'li iki izotopu kullanır.",
        ],
      },
      {
        title: "Atom bolluğu ağırlığı belirler",
        paragraphs: [
          "Ortalama =Σ(kütle ×atom adedi kesri) bağıntısıdır. İki izotopta kesirler x ve 1−x olur. Kesirlerin toplamı 1, yüzdelerin toplamı 100 olmalıdır.",
          "35 u izotopu %75,37 u izotopu %25 atom bolluğundaysa ortalama 35,5 u'dur. Düz 36 ortalaması yalnız eşit atom bolluğunda çıkar. Ortalama daha bol izotopun kütlesine yakın olmalıdır.",
        ],
      },
      {
        title: "Ortalama aralık denetimi",
        paragraphs: [
          "Pozitif bolluklarla ağırlıklı ortalama en küçük ve en büyük kütle arasında kalır. Yalnız 35 ve 37 u varsa 38 u sonucu, verilen bileşimle tutarsızdır; fiziksel bir negatif bolluk kullanılmaz.",
          "Bir izotopun bolluğu 0 veya 100 olabilir; ortalama uç değere ulaşır. İki izotop da pozitifse ortalama sıkı biçimde iki uç arasındadır. Model yüzde kaydırıcısının uçlarını bu koşulla açık gösterir.",
        ],
      },
      {
        title: "Ortalamadan bolluğa ters git",
        paragraphs: [
          "35(1−x)+37 x =35,6 için 2 x =0,6, x=0,30 bulunur. Ağır izotopun atom bolluğu %30'dur. Bilinmeyenin hangi izotopu temsil ettiğini ilk satırda yaz.",
          "x'i hafif izotop için tanımlarsan denklemin yerleri değişir ve sonuç %70 olur; bu aynı bileşimin başka ifadesidir. Yüzde ile kesri karıştırmak x'i 100 kat büyütür. Sonuçları ortalamaya geri koyarak denetle.",
        ],
      },
      {
        title: "Kütle yüzdesi atom yüzdesi değildir",
        paragraphs: [
          "Eşit kütlede hafif izotop örneği daha çok atom içerir. Atom sayısıyla orantılı miktar m/M'dir; kütle paylarını doğrudan aritmetik ortalama ağırlığı yapamazsın.",
          "Kütle payları wᵢ verilirse atom miktarları wᵢ/Mᵢ ile orantılıdır. Normalize ettikten sonra atom kesirlerini bul. Aynı 35/37 çiftinde %25 ağır kütle payı,%25 ağır atom payıyla aynı ortalamayı vermez; model iki modu ayırır.",
        ],
      },
      {
        title: "Denklemden bilinmeyen mol kütlesi",
        paragraphs: [
          "X +2 HCl →XCl₂ +H₂ için 24 g X ve 0,6 mol H₂ oluşmuşsa tüketilen X 0,6 moldür. Tam saf X dönüşümü koşulunda M(X)=24/0,6 =40 g/mol bulunur.",
          "Metal klorürünün XCl₂ olduğu bilgisi stokiyometriyi belirler; XCl₃ olsaydı katsayı değişirdi. Başlangıç 24 gramın tamamı tüketilmemişse bu ters hesap ilk kütleyi kullanamaz. Maddeyi yalnız M'den kesin adlandırmak da ek kimlik bilgisi ister.",
        ],
      },
      {
        title: "İki bileşikten element kütlesi bul",
        paragraphs: [
          "0,2 mol XY'nin kütlesi 5,6 g ise M(XY)=28 g/mol;0,2 mol XY₂ 8,8 g ise M(XY₂)=44 g/mol olur. İki denklem çıkarılınca Y 16, X 12 bulunur.",
          "Bu yöntem bilinmeyen ortalama mol kütlelerini verir; tek atomun gram kütlesi için ayrıca Nₐ'ya böl. İzotop bolluğu ile tepkime katsayısını aynı ağırlık gibi kullanma. Her ters problemin denklem ve verilen miktar koşulunu ayrı taşı.",
        ],
      },
    ],
    examples: [
      {
        title: "Ağırlıklı ortalama",
        prompt:
          "35 ve 37 u izotopları atomca %75 ve %25. Ortalama atomik kütle?",
        strategy: "Atom kesirlerini kullan.",
        steps: [
          {
            label: "1. adım",
            explanation: "35 ×0,75 =26,25 u katkı.",
          },
          {
            label: "2. adım",
            explanation: "37 ×0,25 =9,25 u katkı.",
          },
          {
            label: "3. adım",
            explanation: "İki katkıyı topla.",
          },
        ],
        answer: "35,5 u",
        check: "35 ile 37 arasında ve 35'e yakındır.",
        pitfall: "Eşit olmayan bollukta düz ortalama alma.",
      },
      {
        title: "Ters bolluk",
        prompt:
          "10 ve 11 u izotoplarının ortalaması 10,3 u. Ağır atom bolluğu?",
        strategy: "Ağır kesri x seç.",
        steps: [
          {
            label: "1. adım",
            explanation: "10(1−x)+11 x =10,3.",
          },
          {
            label: "2. adım",
            explanation: "10+x =10,3'ten x 0,3.",
          },
          {
            label: "3. adım",
            explanation: "Yüzdeye dön:0,3 ×100 =%30.",
          },
        ],
        answer: "%30 ağır",
        check: "10 ×0,7+11 ×0,3 =10,3.",
        pitfall: "%30'u kesir 30 olarak kullanma.",
      },
      {
        title: "Eşit kütleli izotoplar",
        prompt:
          "Kurgu aynı elementin 10 ve 20 u izotoplarından eşit kütlede örnek alındı. Ortalama atomik kütle?",
        strategy: "Önce atom sayı oranını bul.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Eşit 20 birim kütle seç; miktarlar 20/10 =2 ve 20/20 =1.",
          },
          {
            label: "2. adım",
            explanation: "Atom kesirleri 2/3 ve 1/3.",
          },
          {
            label: "3. adım",
            explanation: "Ortalama 10 ×2/3+20 ×1/3 =40/3 u.",
          },
        ],
        answer: "Yaklaşık 13,333 u",
        check: "Hafif izotop atomca daha boldur.",
        pitfall: "Eşit kütleyi eşit atom sayma.",
      },
      {
        title: "İki formülden bilinmeyen",
        prompt:
          "0,2 mol XY 5,6 g;0,2 mol XY₂ 8,8 g. X ve Y'nin sayısal mol kütleleri?",
        strategy: "Önce bileşiklerin mol kütlesini bul.",
        steps: [
          {
            label: "1. adım",
            explanation: "X+Y =5,6/0,2 =28.",
          },
          {
            label: "2. adım",
            explanation: "X+2 Y =8,8/0,2 =44.",
          },
          {
            label: "3. adım",
            explanation: "Çıkarma Y 16, yerine koyma X 12 g/mol verir.",
          },
        ],
        answer: "X 12;Y 16 g/mol",
        check: "XY 28,XY₂ 44 g/mol geri sağlanır.",
        pitfall: "Örnek gramlarını doğrudan atom kütlesi sayma.",
      },
    ],
    recall: [
      {
        prompt: "İzotoplarda hangi çekirdek niceliği aynıdır?",
        answer: "Proton sayısı Z aynıdır; nötron sayısı farklıdır.",
      },
      {
        prompt: "Ortalama atom kütlesi her atomun kütlesi midir?",
        answer: "Hayır; topluluktaki atom bolluklarıyla ağırlıklı ortalamadır.",
      },
      {
        prompt: "Kütle yüzdesi atom bolluğuna nasıl çevrilir?",
        answer:
          "Her kütle payı izotop mol kütlesine bölünür, miktarlar normalize edilir.",
      },
      {
        prompt: "M=m/n hesabında hangi kütle kullanılır?",
        answer:
          "Aynı türün gerçekten miktarı verilen/tüketilen kütlesi; artan ilk toplam koşulsuz kullanılamaz.",
      },
    ],
    items: [
      [
        "35 ve 37 u izotopları atomca %75 ve %25. Ortalama atomik kütle kaç u?",
        "35,5",
        ["35", "36", "36,5", "37"],
        "Atom bolluklarıyla ağırlıklandır.",
        "35 ×0,75+37 ×0,25 =35,5 u.",
      ],
      [
        "24 ve 26 u izotoplarında ağır olan atomca %20. Ortalama kaç u?",
        "24,4",
        ["24,2", "25", "25,6", "26,2"],
        "Hafif kesir 0,80'dir.",
        "24 ×0,80+26 ×0,20 =24,4 u; hafif izotopa yakındır.",
      ],
      [
        "10 ve 11 u izotoplarının ortalaması 10,65 u. Hafif atom bolluğu nedir?",
        "%35",
        ["%10", "%30", "%50", "%65"],
        "Ağır kesri x yaz.",
        "10+x =10,65; ağır %65, hafif %35 olur.",
      ],
      [
        "27 ve 29 u izotopları ortalama 28,4 u veriyor. Ağır atom kesri nedir?",
        "0,70",
        ["0,30", "0,40", "0,50", "0,90"],
        "27+2 x =28,4.",
        "2 x =1,4, x=0,70; bu %70 atom bolluğudur.",
      ],
      [
        "Atom numarası 8 ve kütle numarası 18 olan bir atomun nötron sayısı kaçtır?",
        "10",
        ["8", "16", "18", "26"],
        "A−Z kullan.",
        "18−8 =10 nötron vardır. Ortalama atom kütlesi burada kullanılmaz.",
      ],
      [
        "İzotop atomlar için zorunlu ortak özellik hangisidir?",
        "Proton sayısı",
        [
          "Nötron sayısı",
          "Kütle numarası",
          "Gerçek atomik kütle",
          "Doğadaki bolluk",
        ],
        "Element kimliği Z'ye bağlıdır.",
        "Aynı elementin izotoplarının Z'si aynıdır; nötronları farklıdır.",
      ],
      [
        "Yalnız 35 ve 37 u izotoplarını içeren bir örneğin ortalaması 38 u raporlanıyor. Doğru yorum?",
        "Pozitif bolluklarla bu veri mümkün değildir.",
        [
          "Ağır izotop %150 olmalıdır.",
          "Hafif izotopun kütlesi yoktur.",
          "Ortalama her zaman büyük olmalıdır.",
          "Rapor kesin doğrudur.",
        ],
        "Ortalama uç kütleler arasında kalır.",
        "35≤ortalama≤37 gerekir.38 bu aralığın dışındadır; negatif bolluk fiziksel çözüm değildir.",
      ],
      [
        "10 ve 20 u kurgu izotoplarından eşit kütlede örnek alınırsa atom sayılarının hafif/ağır oranı nedir?",
        "2",
        ["1/2", "1", "3", "4"],
        "Eşit kütlede adet kütleye ters orantılıdır.",
        "m/10 bölü m/20 =2. Eşit kütle eşit atom sayısı değildir.",
      ],
      [
        "X+2 HCl→XCl₂+H₂.24 g saf X tamamen tepkimeye girip 0,6 mol H₂ veriyor. X'in mol kütlesi kaç g/mol?",
        "40",
        ["14,4", "24", "28", "60"],
        "X/H₂ mol oranı 1:1.",
        "X 0,6 mol tüketilmiştir;M=24/0,6 =40 g/mol. Gaz hacmi dönüşümüne ihtiyaç yoktur.",
      ],
      [
        "0,2 mol XY 5,6 g,0,2 mol XY₂ 8,8 g. X ve Y'nin mol kütleleri sırasıyla kaç g/mol?",
        "12 ve 16",
        ["16 ve 12", "14 ve 14", "28 ve 44", "5,6 ve 8,8"],
        "Bileşik M değerleri 28 ve 44'tür.",
        "X+Y 28 ve X+2 Y 44 çıkarılırsa Y 16;X 12 bulunur.",
      ],
    ],
    source:
      "Aurelia TYT Kimya 044 kopya kağıdı PDF 1–7; MEBİ TYT Kimya Konu Özetleri PDF 63–64, 70; OGM 10. Sınıf Dersler Cepte ilgili öğretim sayfaları doğrudan karşılaştırıldı. Anlatım, şema ve beş seçenekli alıştırmalar özgündür; resmî sınav sorusu değildir.",
  },
  {
    id: "tepkimeli-karisim",
    title: "Tepkimeli karışımlar: katkıları ayır, bağımsız denklemi kur",
    topic: "detail-183",
    minutes: 50,
    objectives: [
      "Bir karışımın her bileşenine ayrı satır",
      "Seçici tepkimeyi verilen koşul belirler",
      "Ortak ürün, katkıların toplamıdır",
      "İki bilinmeyene iki bağımsız bilgi",
    ],
    sections: [
      {
        title: "Bir karışımın her bileşenine ayrı satır",
        paragraphs: [
          "Bir karışımın toplam kütlesi bileşenlerin kütleleri toplamıdır. Bilinmeyen mol miktarları x ve y ise m=M₁x+M₂y yazılır. Gramlarla molleri aynı toplamda birbirine ekleme.",
          "Bileşenlerin tepkimeleri farklıysa ürün katkılarını da ayrı bul. Aynı gazı üretmeleri gram başına aynı miktarı verdikleri anlamına gelmez. Denklem katsayıları, mol kütleleri ve seçicilik birlikte kullanılır.",
        ],
      },
      {
        title: "Seçici tepkimeyi verilen koşul belirler",
        paragraphs: [
          "Mg ve Cu karışımının verilen HCl koşulunda yalnız Mg'den H₂ çıkardığı söylenmişse gaz Mg miktarını belirler. Mg+2 HCl→MgCl₂+H₂ için mol oranı 1:1'dir.",
          "Asidin veya metalin kimliği değişince seçicilik de değişebilir. “Bütün asitler yalnız Mg ile tepkir” genellemesi yapılmaz. Soruda verilen seçici koşulu açık kullan; diğer bileşeni toplam kütleden çıkar.",
        ],
      },
      {
        title: "Ortak ürün, katkıların toplamıdır",
        paragraphs: [
          "CH₄'ün tam yanması bir mol başına 1 mol CO₂, C₂H₆'nın tam yanması 2 mol CO₂ verir. x mol CH₄ ve y mol C₂H₆ için CO₂=x+2 y olur.",
          "Her iki bileşeni bir mol CO₂ veriyor sanmak ikinci ölçümün ayırt ediciliğini yok eder. Tam yanma ve yeterli O₂ koşulu gerekir; eksik yanmada karbonun CO veya kurumda kalması farklı denklem gerektirir.",
        ],
      },
      {
        title: "İki bilinmeyene iki bağımsız bilgi",
        paragraphs: [
          "Toplam karışım 0,5 mol, toplam CO₂ 0,8 mol ise x+y=0,5 ve x+2 y=0,8 kurulur. İkinciden birinciyi çıkarınca y 0,3, x 0,2 mol bulunur.",
          "Toplam molü başka birimde yeniden söylemek ikinci bağımsız bilgi değildir. Aynı T/P'de ideal toplam gaz hacmi ile toplam mol aynı bilgiyi tekrarlayabilir. Model “yalnız toplam” modunda tek bileşim uydurmaz.",
        ],
      },
      {
        title: "Olabilirlik aralığını önce bul",
        paragraphs: [
          "Toplam t mol CH₄/C₂H₆ için CO₂ miktarı t ile 2 t arasında olmalıdır. İki bileşen de pozitifse değer bu uçların arasında kalır. Uç noktalar saf bileşen durumlarıdır.",
          "0,5 mol karışım için 1,2 mol CO₂ verilen tam yanma modeliyle mümkün değildir. Negatif x çıkarsa onu gerçek miktar gibi çizme; veri veya bileşen varsayımını sorgula. Model fiziksel olmayan oranı %0'a gizlice yuvarlamaz.",
        ],
      },
      {
        title: "Mol yüzdesi kütle yüzdesi değildir",
        paragraphs: [
          "0,2 mol CH₄ ve 0,3 mol C₂H₆ molce %40/%60'tır. M 16 ve 30 g/mol olduğundan kütleler 3,2 ve 9 g; toplam 12,2 g'dır. Kütlece yüzdeler farklı çıkar.",
          "İdeal gazların aynı T/P'deki hacim yüzdeleri mol yüzdelerine eşittir. Kütle yüzdesine geçerken mol kütleleri gerekir. “Karışım yüzdesi” ifadesinin hangi niceliğe göre tanımlandığını yazmadan sayı verme.",
        ],
      },
      {
        title: "İkinci ürünle çözümü doğrula",
        paragraphs: [
          "CH₄+x ilişkisiyle su 2 x, C₂H₆ için su 3 y katkısıdır; toplam su 2 x+3 y olur. O₂ tüketimi 2 x+3,5 y'dir. Bulduğun bileşimi bu yeni niceliklerde deneyebilirsin.",
          "Bu toplamlar aynı iki bilinmeyenden türetilse de deneyde bağımsız ölçülürse model uyumunu test eder. Sonuçları ilk iki eşitliğe geri koymak aritmetik hatayı yakalar. Fazı sıvı verilen suyu gaz hacmi toplamına ekleme.",
        ],
      },
      {
        title: "Seçicilik kaybolursa yöntem değişir",
        paragraphs: [
          "İki karbonatın ikisi de asitle CO₂ veriyorsa yalnız tek gaz kaynağı yaklaşımı geçersizdir. Toplam kütle ve toplam gaz molü çoğu durumda iki bağımsız denklem kurabilir; katsayılar her bileşen için ayrı yazılır.",
          "Aynı mol kütlesi ve aynı ürün katsayısı iki denklemi bağımlı yaparsa bileşim tek belirlenmez. Çözümün varlığı, tekliği ve negatif olmaması ayrı denetimlerdir. İnteraktif atölye bu üç durumu açık ayırır.",
        ],
      },
    ],
    examples: [
      {
        title: "Seçici metal",
        prompt:
          "10 g Mg/Cu karışımında yalnız Mg verilen asitle H₂ çıkarıyor. Mg+2 HCl→MgCl₂+H₂; H₂ 0,25 mol, M(Mg)=24 g/mol. Bileşim?",
        strategy: "Gazı yalnız Mg'ye bağla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Mg miktarı 0,25 mol.",
          },
          {
            label: "2. adım",
            explanation: "Mg 0,25 ×24 =6 g.",
          },
          {
            label: "3. adım",
            explanation: "Cu 10−6 =4 g.",
          },
        ],
        answer: "6 g Mg,4 g Cu",
        check: "Toplam 10 g; gaz kaynağı seçici verilmiştir.",
        pitfall: "Asidi değiştirince aynı seçiciliği varsayma.",
      },
      {
        title: "İki hidrokarbon",
        prompt:
          "0,5 mol CH₄/C₂H₆ tam yanıp 0,8 mol CO₂ veriyor. M 16,30 g/mol. Bileşim ve kütle?",
        strategy: "İki bağımsız denklem kur.",
        steps: [
          {
            label: "1. adım",
            explanation: "x+y 0,5; x+2 y 0,8.",
          },
          {
            label: "2. adım",
            explanation: "Çıkarma y 0,3; x 0,2 mol.",
          },
          {
            label: "3. adım",
            explanation: "Kütle 16 ×0,2+30 ×0,3 =12,2 g.",
          },
        ],
        answer: "0,2 mol CH₄;0,3 mol C₂H₆;12,2 g",
        check: "0,2+0,6 =0,8 mol CO₂.",
        pitfall: "Her bileşene aynı CO₂ katsayısını verme.",
      },
      {
        title: "Eksik veri",
        prompt:
          "CH₄/C₂H₆ karışımının yalnız toplam 1 mol olduğu biliniyor. Bileşim tek bulunur mu?",
        strategy: "Bağımsız denklem sayısını kontrol et.",
        steps: [
          {
            label: "1. adım",
            explanation: "x+y 1 tek eşitliktir.",
          },
          {
            label: "2. adım",
            explanation: "x 0,2/y 0,8 ve x 0,6/y 0,4 aynı toplamı sağlar.",
          },
          {
            label: "3. adım",
            explanation:
              "İkinci bağımsız ürün veya kütle ölçümü olmadan tek bileşim belirlenmez.",
          },
        ],
        answer: "Belirlenemez",
        check: "Farklı iki çözüm aynı veriyi sağlıyor.",
        pitfall: "Birini rastgele seçip kesin sonuç sunma.",
      },
      {
        title: "Olamayan ölçüm",
        prompt:
          "0,5 mol CH₄/C₂H₆ için tam yanma CO₂ ölçümü 1,2 mol. Tutarlı mı?",
        strategy: "Uç ürün sınırını kullan.",
        steps: [
          {
            label: "1. adım",
            explanation: "Tümü CH₄ olsa 0,5 mol CO₂.",
          },
          {
            label: "2. adım",
            explanation: "Tümü C₂H₆ olsa 1 mol CO₂.",
          },
          {
            label: "3. adım",
            explanation:
              "1,2 mol üst sınırı aşar; negatif bileşen çözümü fiziksel değildir.",
          },
        ],
        answer: "Tutarsız",
        check: "Gerekli CO₂ aralığı 0,5–1 mol.",
        pitfall: "Negatif maddeyi grafikte gizleme.",
      },
    ],
    recall: [
      {
        prompt: "CH₄/C₂H₆ için toplam CO₂ denklemi nedir?",
        answer: "x mol CH₄, y mol C₂H₆ için x+2 y.",
      },
      {
        prompt: "Yalnız toplam mol bileşimi belirler mi?",
        answer: "Genelde hayır; ikinci bağımsız bilgi gerekir.",
      },
      {
        prompt: "Mol yüzdesi kütle yüzdesiyle aynı mıdır?",
        answer: "Mol kütleleri farklıysa genellikle hayır.",
      },
      {
        prompt: "Negatif bileşen miktarı çıkınca ne anlama gelir?",
        answer:
          "Veriler veya varsayımlar fiziksel bileşimle tutarsız olabilir; negatif gerçek madde değildir.",
      },
    ],
    items: [
      [
        "0,4 mol CH₄/C₂H₆ karışımı yeterli O₂ ile tam yanınca 0,55 mol CO₂ veriyor. C₂H₆ kaç mol?",
        "0,15 mol",
        ["0,10 mol", "0,25 mol", "0,40 mol", "0,55 mol"],
        "x+y ve x+2 y denklemlerini çıkar.",
        "y=0,55−0,40 =0,15 mol; CH₄ 0,25 moldür.",
      ],
      [
        "0,5 mol CH₄/C₂H₆ tam yanınca 0,8 mol CO₂ veriyor. CH₄ kaç mol?",
        "0,2 mol",
        ["0,1 mol", "0,3 mol", "0,4 mol", "0,5 mol"],
        "Önce y=CO₂−toplam.",
        "C₂H₆ 0,3; CH₄ 0,5−0,3 =0,2 mol.",
      ],
      [
        "0,2 mol CH₄ ve 0,3 mol C₂H₆ karışımının kütlesi kaç g? M 16 ve 30 g/mol.",
        "12,2 g",
        ["8 g", "9 g", "10,6 g", "23 g"],
        "Her molü kendi M değeriyle çarp.",
        "0,2 ×16+0,3 ×30 =3,2+9 =12,2 g.",
      ],
      [
        "10 g Mg/Cu karışımında verilen koşulda yalnız Mg asitle H₂ veriyor. Mg+2 HCl→MgCl₂+H₂.0,25 mol H₂ için M(Mg)=24. Cu kaç gram?",
        "4 g",
        ["2,5 g", "6 g", "7,5 g", "10 g"],
        "Mg kütlesini gazdan bul, toplamdan çıkar.",
        "Mg 0,25 ×24 =6 g; Cu 10−6 =4 g.",
      ],
      [
        "30 g CaCO₃/inert kum karışımı yeterli asitle tam tepkimede 4,4 g CO₂ veriyor. Tek gaz kaynağı karbonat; M 100 ve 44. Kum kaç gram?",
        "20 g",
        ["4,4 g", "10 g", "25,6 g", "30 g"],
        "CO₂ 0,1 mol karbonat demektir.",
        "CaCO₃ 10 g; kum 30−10 =20 g'dır.",
      ],
      [
        "CH₄/C₂H₆ karışımında yalnız toplam mol bilinirse doğru yaklaşım nedir?",
        "İkinci bağımsız bilgi olmadan genelde tek bileşim bulunamaz.",
        [
          "İki bileşen zorunlu eşit moldür.",
          "İkisi zorunlu eşit gramdır.",
          "Karışım saf CH₄'tür.",
          "Bileşenlerin M değerleri eşit olur.",
        ],
        "Tek toplam eşitliği iki bilinmeyen içerir.",
        "x+y=t farklı bileşimlerce sağlanır; bağımsız ikinci ölçüm gerekir.",
      ],
      [
        "Toplam 0,5 mol CH₄/C₂H₆ tam yanıyor. Hangi CO₂ miktarı bu bileşenlerle mümkün değildir?",
        "1,2 mol",
        ["0,6 mol", "0,7 mol", "0,75 mol", "0,9 mol"],
        "Ürün alt sınırı t, üst sınırı 2 t.",
        "CO₂ 0,5–1 mol aralığında olabilir;1,2 mol bunu aşar.",
      ],
      [
        "0,2 mol CH₄ ve 0,3 mol C₂H₆ için C₂H₆'nın molce yüzdesi nedir?",
        "%60",
        ["%30", "%40", "%50", "%73,77"],
        "Paydaya toplam molü koy.",
        "0,3/(0,2+0,3) ×100 =%60. Kütlece yüzde ayrı hesaplanır.",
      ],
      [
        "CH₄/C₂H₆ karışımında x ve y mol bileşen tam yanıyor. Oluşan su miktarı hangi bağıntıdır?",
        "2 x+3 y",
        ["x+y", "x+2 y", "3 x+2 y", "2 x+2 y"],
        "Her yakıtın H atomlarını ikiye böl.",
        "CH₄ bir molü 2 mol, C₂H₆ bir molü 3 mol su verir; katkılar toplanır.",
      ],
      [
        "Aynı T/P'de ideal gaz karışımının toplam hacmi ve buna denk toplam molü birlikte verilmiş. Bileşimi bulmak için neden her zaman iki bağımsız bilgi değildir?",
        "İki veri aynı toplamı farklı birimde tekrar edebilir.",
        [
          "Hacim hiçbir zaman ölçülmez.",
          "Gazlar karışamaz.",
          "Her gazın kütlesi aynıdır.",
          "Molar hacim sıfırdır.",
        ],
        "V ile n aynı koşulda orantılıdır.",
        "V=nRT/P aynı toplam miktarı dönüştürür; bileşenleri ayıran yeni bir denklem doğmayabilir.",
      ],
    ],
    source:
      "Aurelia TYT Kimya 045 kopya kağıdı PDF 1–7; MEBİ TYT Kimya Konu Özetleri PDF 70–71; OGM 10. Sınıf Dersler Cepte ilgili öğretim sayfaları doğrudan karşılaştırıldı. Anlatım, şema ve beş seçenekli alıştırmalar özgündür; resmî sınav sorusu değildir.",
  },
  {
    id: "karisim-sinif-cozunme",
    title: "Karışımlar ve çözünme: fazdan tanecik düzeyine",
    topic: "detail-184",
    minutes: 50,
    objectives: [
      "Saflık ve faz farklı sorulardır",
      "Dağılan ve dağıtıcı fazı adlandır",
      "Tekdüze görünüm çözeltinin tek kanıtı değil",
      "Çözünme erime değildir",
    ],
    sections: [
      {
        title: "Saflık ve faz farklı sorulardır",
        paragraphs: [
          "Saf madde tek kimyasal bileşime, karışım birden fazla bileşene sahiptir. Homojenlik örnek boyunca tek fazlı ve tekdüze dağılımı anlatır. Şekerli su tek fazlı olsa da saf değildir.",
          "Buz ve sıvı sudan oluşan sistem iki fazlı olabilir ama ikisi aynı bileşiktir. Dolayısıyla faz sayısı tek başına kimyasal tür sayısı değildir. Karışımı tanımak için bileşen ve faz bilgilerini ayrı sor.",
        ],
      },
      {
        title: "Dağılan ve dağıtıcı fazı adlandır",
        paragraphs: [
          "Kumun su içindeki kaba katı parçacıkları süspansiyon, yağın suda damlacık dağılımı emülsiyondur. Sis, gaz ortamındaki sıvı damlacıklardan oluşan aerosoldür; su buharı ise moleküler gazdır.",
          "Kolloid bir boyut ve dağılım davranışı sınıfıdır; bazı emülsiyon ve aerosoller aynı zamanda kolloiddir. Bu etiketleri daima birbirini dışlayan seçenekler sanma. Çizimde parçacık boyutları gerçek ölçek değildir.",
        ],
      },
      {
        title: "Tekdüze görünüm çözeltinin tek kanıtı değil",
        paragraphs: [
          "Kolloidler çıplak gözle tekdüze görünebilir ama dağılan parçacıklar molekül/iyon ölçeğinde çözelti oluşturmaz. Işık saçılması gibi davranışlar ayırt etmeye yardım eder.",
          "Ders modelinde yaklaşık boyut bölgeleri çözelti<1 nm, kolloid 1–1000 nm, kaba süspansiyon>1000 nm olarak kullanılır. Bunlar bütün gerçek örneklerde keskin evrensel duvarlar değildir; dağılım ve ölçüm yöntemi önemlidir.",
        ],
      },
      {
        title: "Çözünme erime değildir",
        paragraphs: [
          "Şekerin suda dağılması katının saf sıvıya dönüşmesi değildir. Moleküller çözücü içinde dağılır; şeker bileşen olarak kaybolmaz. Erime ise maddenin katıdan sıvıya faz değişimidir.",
          "NaCl suda iyonik örgüden Na⁺ ve Cl⁻ olarak ayrılır; şeker çoğunlukla molekül olarak kalır. Bütün çözünenleri iyonlaştırmak yanlış tanecik sayısı ve iletkenlik çıkarır. Katı tuz örgüsünde hareketli iyon olmadığı ayrımı korunur.",
        ],
      },
      {
        title: "Hidratasyonda yön önemlidir",
        paragraphs: [
          "Su polardır: O tarafı kısmen negatif, H tarafları kısmen pozitiftir. Bir katyonun çevresinde O ucu, bir anyonun çevresinde H uçları daha uygun elektrostatik yönelim gösterir.",
          "Çözücüyle yeni etkileşimler oluşurken çözünen ve çözücü içi bazı etkileşimler zayıflatılır. Toplam enerji sonucu maddeye göre değişir; her çözünmenin ısı verdiği veya her çözünmenin aynı kuvvetle açıklanacağı söylenmez. Su ile sarılma hidratasyondur.",
        ],
      },
      {
        title: "Hız ile denge sınırını ayır",
        paragraphs: [
          "Karıştırma veya katıyı küçültme uygun koşullarda çözünmeye ulaşma hızını artırabilir. Aynı sıcaklık, basınç ve bileşimde denge çözünürlüğünü sırf karıştırmak yükseltmez.",
          "Atölyenin adımları gerçek zaman veya kinetik yasa değildir. Denge halinde 100 g su için yaklaşık 36 g NaCl, yaklaşık 200 g şeker öğretim yaklaşımı kullanılır. Bu değerler 20 °C civarı yuvarlanmış model verisidir; başka maddeye taşınmaz.",
        ],
      },
      {
        title: "Çözelti ve dipteki katı ayrı tartılır",
        paragraphs: [
          "100 g suya 50 g NaCl eklenip model dengesine ulaşıldığında 36 g çözünür,14 g ayrı katı kalır. Sıvı çözelti 136 g, bütün kap içeriği 150 g'dır.",
          "Dipteki katıyı çözeltinin yüzde hesabına katmak paydayı yanlış büyütür. Tam sınır kadar katı eklenmiş doygun çözeltide dipte katı bulunması zorunlu değildir. Doygun olmak, mutlaka heterojen kap içeriği demek değildir.",
        ],
      },
      {
        title: "Filtre işleminin neyi ayırdığını gör",
        paragraphs: [
          "Sıradan kâğıt filtre uygun kaba kum parçacıklarını tutabilir; çözünmüş iyonlar ve şeker molekülleri sıvıyla geçer. Tipik kolloidler bu filtreyle tümüyle ayrılmayabilir; ultrafiltrasyon farklı yöntemdir.",
          "Çalkalanmış yağ-su için sıradan kâğıt filtreyi her durumda kesin ayırıcı sayma. Bekleme damlacıkları birleştirip faz ayrımını görünür yapabilir. Model filtreyi yalnız hangi tanecik türünün geçebildiğini gösteren koşullu bir temsil olarak kullanır.",
        ],
      },
    ],
    examples: [
      {
        title: "Denge ve kap toplamı",
        prompt:
          "20 °C civarı öğretim modelinde 100 g su en çok 36 g NaCl çözüyor.50 g NaCl eklenip dengeye geliniyor. Miktarlar?",
        strategy: "Üst sınır ve eklenen miktarı karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation: "36 g çözünür;50−36 =14 g katı kalır.",
          },
          {
            label: "2. adım",
            explanation: "Sıvı çözelti 100+36 =136 g.",
          },
          {
            label: "3. adım",
            explanation: "Bütün kap 100+50 =150 g'dır.",
          },
        ],
        answer: "136 g çözelti;14 g ayrı katı",
        check: "136+14 =150 g.",
        pitfall: "150 gramı sıvı çözelti sayma.",
      },
      {
        title: "Çözünme ve erime",
        prompt:
          "Şeker suya katılıp tamamen dağıldı; sıvı tek faz. Olay ve karışım sınıfı?",
        strategy: "Faz değişimiyle çözücüde dağılımı ayır.",
        steps: [
          {
            label: "1. adım",
            explanation: "Şeker saf sıvı faza dönüşmüş sayılmaz.",
          },
          {
            label: "2. adım",
            explanation: "Şeker molekülleri su içinde dağılmıştır.",
          },
          {
            label: "3. adım",
            explanation:
              "Tek fazlı fakat iki bileşenli homojen çözelti vardır.",
          },
        ],
        answer: "Çözünme; homojen karışım",
        check: "Şeker kütlesi çözeltide korunur.",
        pitfall: "“Görünmedi, yok oldu” deme.",
      },
      {
        title: "Filtre karşılaştırması",
        prompt:
          "Kumlu su ve tamamen çözünmüş tuzlu su ayrı ayrı sıradan kâğıt filtreden geçiriliyor. Uygun kaba kum tanecikleri tutuluyor. Sonuç?",
        strategy: "Tanecik türünü izle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Kum ayrı katı parçacıklardır ve verilen filtrede tutulur.",
          },
          {
            label: "2. adım",
            explanation: "Tuzun Na⁺ ve Cl⁻ iyonları sıvıyla geçer.",
          },
          {
            label: "3. adım",
            explanation:
              "Filtrat tuz içerebilir; süzme onu otomatik saf su yapmaz.",
          },
        ],
        answer: "Kum tutulur; çözünmüş tuz geçer",
        check: "Filtre gözenek kapsamı açık verilmiştir.",
        pitfall: "Her filtreyi ters ozmoz sayma.",
      },
      {
        title: "Yağ damlacığının yolu",
        prompt:
          "Yağ ve su çalkalandı; sıvı damlacıklar suda dağılıyor, bekleyince iki tabaka oluşuyor. Sınıf ve süreç?",
        strategy: "Dağılan fazın sıvı olduğunu kullan.",
        steps: [
          {
            label: "1. adım",
            explanation: "Çalkalama yağ damlacıkları oluşturur.",
          },
          {
            label: "2. adım",
            explanation: "Sıvı içinde sıvı dağılımı emülsiyondur.",
          },
          {
            label: "3. adım",
            explanation:
              "Bekleme faz ayrımını gösterebilir; yağ moleküler çözünmüş sayılmaz.",
          },
        ],
        answer: "Emülsiyon; fiziksel dağılım",
        check: "Kimyasal olarak yeni tek madde verilmedi.",
        pitfall: "Saydamlık/bulanıklık tek başına kesin kimlik değildir.",
      },
    ],
    recall: [
      {
        prompt: "Şeker suda erir mi çözünür mü?",
        answer: "Çözünür; saf katıdan saf sıvıya erimeyle aynı olay değildir.",
      },
      {
        prompt: "NaCl çözeltisinde hangi tanecikler vardır?",
        answer:
          "Na⁺ ve Cl⁻ iyonları, su molekülleri ve uygun koşullarda ayrı katı faz bulunabilir.",
      },
      {
        prompt: "Karıştırma denge çözünürlüğünü artırır mı?",
        answer:
          "Sabit koşullarda tek başına artırmaz; dengeye ulaşma hızını değiştirebilir.",
      },
      {
        prompt: "Sis ile su buharı aynı mıdır?",
        answer: "Hayır; sis gazda sıvı damlacık, buhar moleküler gazdır.",
      },
    ],
    items: [
      [
        "Tamamen çözünmüş şekerli su tek fazlıdır. Doğru sınıf hangisidir?",
        "Homojen karışım",
        [
          "Saf element",
          "Saf bileşik",
          "Kaba süspansiyon",
          "İki fazlı emülsiyon",
        ],
        "Tek faz, tek kimyasal tür demek değildir.",
        "Şeker ve su iki bileşendir; dağılım tekdüze olduğu için homojen çözeltidir.",
      ],
      [
        "Suda dağılan, bekleyince çöken kaba kum parçacıkları hangi sınıftadır?",
        "Süspansiyon",
        ["Moleküler çözelti", "Saf gaz", "Alaşım", "Sıvı-sıvı emülsiyon"],
        "Dağılan faz katı, ortam sıvıdır.",
        "Kaba katı-sıvı heterojen dağılım süspansiyondur.",
      ],
      [
        "Sis için dağılan ve dağıtıcı fazlar sırasıyla hangisidir?",
        "Sıvı ve gaz",
        ["Gaz ve sıvı", "Katı ve katı", "Gaz ve gaz", "Sıvı ve katı"],
        "Sis damlacıklarını ortamından ayır.",
        "Sıvı su damlacıkları havada dağılmıştır; bu sıvı aerosolüdür, su buharı değildir.",
      ],
      [
        "NaCl suda çözündüğünde çözünmüş tanecikler hangileridir?",
        "Na⁺ ve Cl⁻",
        [
          "Na ve Cl atomları",
          "NaCl₂ molekülleri",
          "Yalnız elektronlar",
          "Na₂ ve Cl₂ molekülleri",
        ],
        "İyonik örgünün çözünmesini düşün.",
        "İyonlar suyla etkileşerek dağılır; metalik atom ve klor gazı oluştuğu söylenmez.",
      ],
      [
        "Su bir Na⁺ iyonunu sararken baskın uygun yönelim hangisidir?",
        "O'nun kısmen negatif ucu katyona bakar.",
        [
          "H'nin kısmen pozitif uçları katyona bakar.",
          "Su yükünü tamamen kaybeder.",
          "Na⁺ mutlaka nötr metale döner.",
          "Su tüm O-H bağlarını koparır.",
        ],
        "Zıt yüklerin çekimini kullan.",
        "Su O ucuδ−, H uçlarıδ+'dır; katyon O tarafıyla uygun iyon-dipol etkileşimi kurar.",
      ],
      [
        "Aynı T/P ve bileşimde tuzu karıştırmak tek başına neyi değiştirebilir?",
        "Dengeye ulaşma hızını",
        [
          "Denge çözünürlüğünü zorunlu artırır.",
          "Na/Cl oranını değiştirir.",
          "Tuzu yeni element yapar.",
          "Avogadro sabitini değiştirir.",
        ],
        "Hız ile son dengeyi ayır.",
        "Karıştırma teması ve taşınmayı artırabilir; aynı koşuldaki denge sınırı bu yüzden büyümez.",
      ],
      [
        "Bir modelde 100 g su en çok 36 g NaCl çözüyor.50 g eklenip dengeye gelirse sıvı çözeltinin kütlesi kaç g?",
        "136 g",
        ["100 g", "114 g", "150 g", "186 g"],
        "Yalnız çözünmüş 36 gramı suya ekle.",
        "Çözelti 100+36 =136 g;14 g ayrı katı kap toplamına girer.",
      ],
      [
        "Sıradan kâğıt filtre tamamen çözünmüş tuzlu suyu süzüyor. İyonların geçtiği verilmiştir. Filtrat için hangisi doğrudur?",
        "Çözünmüş tuz içerebilir.",
        [
          "Kesin saf sudur.",
          "NaCl katısının tamamı filtrededir.",
          "İyonlar yok olur.",
          "Su buharı olmuştur.",
        ],
        "Geçen bileşenlerin kimliğini koru.",
        "Çözünmüş iyonlar sıvıyla geçer. Kaba tanecik filtresi tuz giderimini garanti etmez.",
      ],
      [
        "Çalkalanmış yağ damlacıkları suda dağılmış, bekleme sonunda iki tabaka olmuş. Doğru sınıf?",
        "Emülsiyon",
        ["Gaz-gaz çözelti", "Saf bileşik", "Süblimleşme", "Metal alaşımı"],
        "Sıvı içinde sıvı dağılımı.",
        "Yağ moleküler çözeltiye dönüşmeden damlacık hâlinde dağılır; bu sıvı-sıvı heterojen modeldir.",
      ],
      [
        "Doygun çözelti için hangisi zorunlu değildir?",
        "Dipte çözünmemiş katı bulunması",
        [
          "Belirtilen koşulun olması",
          "Denge çözünürlük sınırına ulaşılması",
          "Çözünmüş maddenin bulunması",
          "Çözücü bulunması",
        ],
        "Tam sınır kadar ekleme durumunu düşün.",
        "Tam sınır kadar madde çözünmüşse çözelti doygundur ve dipte artık katı olmayabilir.",
      ],
    ],
    source:
      "Aurelia TYT Kimya 046 kopya kağıdı PDF 1–7; MEBİ TYT Kimya Konu Özetleri PDF 73–75, 79–80; OGM 10. Sınıf Dersler Cepte ilgili öğretim sayfaları doğrudan karşılaştırıldı. Anlatım, şema ve beş seçenekli alıştırmalar özgündür; resmî sınav sorusu değildir.",
  },
  {
    id: "cozelti-derisimi",
    title: "Çözelti derişimi: doğru payda, seyreltme ve birim dönüşümü",
    topic: "detail-185",
    minutes: 50,
    objectives: [
      "Kütlece yüzde çözeltinin payıdır",
      "Hacimce yüzde için son hacim ölçülür",
      "ppm birimini tabanıyla yaz",
      "Molarite ve molalite farklı paydalar",
    ],
    sections: [
      {
        title: "Kütlece yüzde çözeltinin payıdır",
        paragraphs: [
          "Kütlece yüzde =çözünen kütlesi/çözelti kütlesi ×100.20 g madde 180 g suda tamamen çözünürse toplam 200 g, yüzde 10'dur. Paydayı yalnız çözücü 180 g seçmek başka bir oran üretir.",
          "Çözünmemiş dip katı sıvı çözeltinin paydasına girmez. Önce fazların hangi kütleyi taşıdığını belirle.20 g çözünmüş ve 10 g dipte varsa çözünen payına 30 g yazılmaz; kap toplamı ayrı niceliktir.",
        ],
      },
      {
        title: "Hacimce yüzde için son hacim ölçülür",
        paragraphs: [
          "Hacimce yüzde =alınan çözünen sıvı hacmi/son çözelti hacmi ×100'dür.25 mL etanolle son hacim 250 mL'ye tamamlanmışsa hacimce %10 elde edilir.",
          "Sıvılar karışınca hacimler tam toplanmak zorunda değildir.50 mL alkol+50 mL su için son 100 mL'yi koşulsuz varsayma. Soruda hacim değişiminin ihmal edildiği açıkça söylenirse bu ayrı model kullanılabilir.",
        ],
      },
      {
        title: "ppm birimini tabanıyla yaz",
        paragraphs: [
          "Kütlece ppm, kütle kesrinin 10⁶ katıdır;1 mg/kg =1 ppm. Çözelti 2 kg ve çözünen 4 mg ise 2 ppm bulunur. Birimleri önce aynı kütle ölçeğine dönüştür.",
          "mg/L ile mg/kg aynı boyut değildir. Sulu seyreltik çözeltide yoğunluk yaklaşık 1 kg/L kabul edildiğinde sayıları yakın olabilir; yoğunluk verilmeden evrensel eşitlik kurulmaz. Derişim türünün adı sonucu tamamlar.",
        ],
      },
      {
        title: "Molarite ve molalite farklı paydalar",
        paragraphs: [
          "Molarite n(çözünen)/V(çözelti) ile mol/L; molalite n(çözünen)/m(çözücü) ile mol/kg'dır. Kütlece yüzde ise g/g oranıdır. Molarite için son çözeltinin hacmi gerekir.",
          "Yoğunluk ρ verilirse V=m(çözelti)/ρ bulunabilir. Bir yoğunluk g/mL ise hacim önce mL çıkar; molarite için litreye çevrilir. Molarite sıcaklıkla hacim üzerinden değişebilir; kapalı, kütlesi sabit bir örneğin kütlece payı sırf hacim değişti diye değişmez.",
        ],
      },
      {
        title: "Seyreltmede hangi miktar sabit",
        paragraphs: [
          "Kayıp, reaksiyon ve çökelme olmadan saf su eklenirse çözünen kütlesi sabittir.200 g %15 çözeltide 30 g çözünen vardır;100 g su eklenince toplam 300 g ve yüzde 10 olur.",
          "Derişimin azalması çözünenin yok olması değildir. Homojen çözeltinin bir kısmını ayırmak da yüzdeyi değiştirmez: miktarlar birlikte azalır. İlk ve son çözünen miktarlarını eşitlemek hangi kısa yolun geçerli olduğunu gösterir.",
        ],
      },
      {
        title: "Buharlaştırmada sınırı denetle",
        paragraphs: [
          "Yalnız çözücü uzaklaşır ve çökelme yoksa çözünen sabit kalır; toplam çözeltinin kütlesi azalır ve derişim artar. Modelde seçili buharlaşma bu koşulla sınırlandırılır.",
          "Çözünürlük aşılıp kristal oluşursa artık bütün çözünen sıvıda değildir. Bu durumda ilk çözüneni son sıvı kütlesine bölmek geçersiz olabilir. Uçucu çözünen de kayboluyorsa ayrıca bileşen dengesi gerekir.",
        ],
      },
      {
        title: "İki çözeltiyi ağırlıklarıyla birleştir",
        paragraphs: [
          "Aynı çözünenli 100 g %10 ve 300 g %30 çözeltide çözünenler 10 ve 90 g'dır. Karışım 400 g ve 100 g çözünen içerir; yüzde 25 çıkar. Yüzdelerin düz ortalaması 20 yanlıştır.",
          "Düz ortalama yalnız çözelti kütleleri eşitse kütlece yüzde için geçerlidir. Hacimler verilmiş ve kütlece yüzde istenmişse her çözeltinin yoğunluğu gerekebilir. Farklı kimyasal türlerin reaksiyon verdiği karışımda önce stokiyometri çözülür.",
        ],
      },
      {
        title: "Ters hazırlama ve güvenilir kontrol",
        paragraphs: [
          "İstenen çözünen sabitse hedef yüzde, gereken son toplamı belirler.30 g çözünenle %10 için toplam 300 g gerekir; ilk çözelti 200 g ise 100 g su eklenir. Hesabın birimleri ve tabanı açık yazılır.",
          "Atölye kurgu X maddesi için M 40 g/mol ve verilen yoğunlukla birim ilişkilerini gösterir; gerçek bir kimyasalın sıcaklığa bağlı yoğunluk ölçümü değildir. Hazırlandığı iddia edilen her çözelti için tam çözünme ve son hacim koşullarını ayrıca belirt.",
        ],
      },
    ],
    examples: [
      {
        title: "Doğru payda",
        prompt: "30 g tuz 120 g suda tamamen çözünüyor. Kütlece yüzde?",
        strategy: "Toplam çözeltinin kütlesini bul.",
        steps: [
          {
            label: "1. adım",
            explanation: "m=30+120 =150 g.",
          },
          {
            label: "2. adım",
            explanation: "Pay 30 g, payda 150 g.",
          },
          {
            label: "3. adım",
            explanation: "30/150 ×100 =%20.",
          },
        ],
        answer: "%20",
        check: "150 gramın %20'si 30 g'dır.",
        pitfall: "Paydaya 120 g suyu koyma.",
      },
      {
        title: "Ağırlıklı karıştırma",
        prompt:
          "100 g %10 ve 300 g %30 aynı X çözeltileri kayıpsız, tepkimesiz karışıyor. Yeni yüzde?",
        strategy: "Çözünenleri ayrı topla.",
        steps: [
          {
            label: "1. adım",
            explanation: "10 g ve 90 g X bulunur.",
          },
          {
            label: "2. adım",
            explanation: "Toplam X 100 g, çözelti 400 g.",
          },
          {
            label: "3. adım",
            explanation: "100/400 ×100 =%25.",
          },
        ],
        answer: "%25",
        check: "Sonuç 10 ile 30 arasında ve ağır ikinciye yakındır.",
        pitfall: "Eşit olmayan kütlede düz ortalama alma.",
      },
      {
        title: "Molariteye geç",
        prompt:
          "20 g X,180 g su tamamen karışıyor. M(X)=40 g/mol; verilen çözeltinin yoğunluğu 1,2 g/mL. Molarite?",
        strategy: "Molden önce hacim paydasını doğru kur.",
        steps: [
          {
            label: "1. adım",
            explanation: "X 20/40 =0,5 mol.",
          },
          {
            label: "2. adım",
            explanation: "Toplam 200 g; V=200/1,2 =166,667 mL =0,166667 L.",
          },
          {
            label: "3. adım",
            explanation: "Molarite 0,5/0,166667 ≈3 mol/L.",
          },
        ],
        answer: "3 mol/L",
        check: "0,166667 L ×3 mol/L ≈0,5 mol.",
        pitfall: "Yoğunlukla bulunan mL'yi litre sanma.",
      },
      {
        title: "Su ekleme",
        prompt:
          "200 g %15 X çözeltisi kayıpsız %10'a seyreltiliyor. Eklenecek saf su?",
        strategy: "Çözünen kütlesini sabit tut.",
        steps: [
          {
            label: "1. adım",
            explanation: "İlk X 200 ×0,15 =30 g.",
          },
          {
            label: "2. adım",
            explanation: "Son toplam 30/0,10 =300 g.",
          },
          {
            label: "3. adım",
            explanation: "Su 300−200 =100 g eklenir.",
          },
        ],
        answer: "100 g su",
        check: "30/300 =%10.",
        pitfall: "Son 300 gramın tümünü eklenen su sanma.",
      },
    ],
    recall: [
      {
        prompt: "Kütlece yüzde paydası nedir?",
        answer:
          "Sıvı çözeltinin toplam kütlesi; yalnız çözücü veya ayrı dip katı değil.",
      },
      {
        prompt: "Molarite ve molalitenin paydaları nedir?",
        answer: "Molarite son çözelti litresi, molalite çözücü kilogramıdır.",
      },
      {
        prompt: "1 mg/L her durumda 1 ppm midir?",
        answer:
          "Hayır; kütlece ppm için yoğunluk/uygun yaklaşık koşul gerekir.",
      },
      {
        prompt: "Su eklerken hangi varsayımda çözünen sabit kalır?",
        answer: "Kayıp, yeni reaksiyon ve çökelme yoksa.",
      },
    ],
    items: [
      [
        "20 g tuz 180 g suda tamamen çözünüyor. Kütlece yüzde?",
        "%10",
        ["%9", "%11,11", "%20", "%90"],
        "Toplam 200 g'dır.",
        "20/200 ×100 =%10;180 gramı payda yapmak çözücüye göre orandır.",
      ],
      [
        "100 g %10 ve 300 g %30 aynı tuz çözeltileri kayıpsız ve tepkimesiz karışıyor. Son yüzde?",
        "%25",
        ["%10", "%15", "%20", "%30"],
        "Tuz kütleleri 10 ve 90 gram.",
        "Toplam 100 g tuz/400 g çözelti =%25. Düz ortalama eşit kütle ister.",
      ],
      [
        "200 g %15 çözeltiye 100 g saf su ekleniyor; kayıp/çökelme yok. Son yüzde?",
        "%10",
        ["%5", "%7,5", "%15", "%20"],
        "30 g çözünen sabittir.",
        "30/(200+100) ×100 =%10.",
      ],
      [
        "Son çözelti hacmi 250 mL; hazırlanırken 25 mL etanol kullanılmış. Hacimce yüzde?",
        "%10",
        ["%5", "%11,11", "%25", "%90"],
        "Son ölçülen hacmi payda yap.",
        "25/250 ×100 =%10; hacimler toplamı varsayılmasına gerek yoktur.",
      ],
      [
        "2 kg çözeltide 4 mg X bulunuyor. Kütlece ppm kaçtır?",
        "2 ppm",
        ["0,5 ppm", "4 ppm", "8 ppm", "2000 ppm"],
        "mg/kg değerini hesapla.",
        "4 mg/2 kg =2 mg/kg =2 kütlece ppm.",
      ],
      [
        "Homojen 100 g %20 çözeltiden 50 g alınmıştır. Ayrılan parçanın kütlece yüzdesi nedir?",
        "%20",
        ["%10", "%25", "%40", "%50"],
        "Homojen numunenin oranı aynıdır.",
        "Parçada 10 g çözünen/50 g çözelti vardır; oran %20 kalır. Miktar yarıya inse de derişim yarılanmaz.",
      ],
      [
        "20 g X 180 g suda tamamen çözünmüş. M(X)=40 g/mol, son çözeltinin yoğunluğu 1,2 g/mL. Molarite?",
        "3 mol/L",
        ["0,003 mol/L", "0,5 mol/L", "2,5 mol/L", "30 mol/L"],
        "200 gramı yoğunluğa böl, mL'yi L yap.",
        "n 0,5 mol; V 200/1,2 =166,667 mL; M≈3 mol/L.",
      ],
      [
        "20 g X 180 g suda tamamen çözünüyor. M(X)=40 g/mol. Molalite kaç mol/kg çözücüdür?",
        "Yaklaşık 2,778",
        ["0,5", "2,5", "3", "27,78"],
        "Payda 0,180 kg sudur.",
        "n 0,5 mol;0,5/0,180 ≈2,778 mol/kg. Toplam çözelti 0,200 kg kullanılmaz.",
      ],
      [
        "Bir çözeltinin X derişimi 5 mg/L. Yoğunluk verilmemiş. Kütlece ppm için doğru ifade hangisidir?",
        "Yoğunluk veya uygun yaklaşık koşul olmadan sayısal eşitlik kesin değildir.",
        [
          "Her koşulda 5 ppm'dir.",
          "Her koşulda 0,005 ppm'dir.",
          "Litre ile kilogram aynı birimdir.",
          "Derişim sıfırdır.",
        ],
        "Hacim paydasını kütle paydasından ayır.",
        "ppm kütle kesriyse mg/kg gerekir. Yaklaşık 1 kg/L koşulu verilirse mg/L sayısına yaklaşabilir.",
      ],
      [
        "100 g çözeltide 10 g uçucu olmayan X var. Yalnız 20 g su buharlaşıyor, çökelme/reaksiyon yok. Son kütlece yüzde?",
        "%12,5",
        ["%8", "%10", "%20", "%25"],
        "Çözünen 10 g, son toplam 80 g.",
        "10/80 ×100 =%12,5. Buharlaşan yalnız çözücü olduğu için pay sabittir.",
      ],
    ],
    source:
      "Aurelia TYT Kimya 047 kopya kağıdı PDF 1–7; MEBİ TYT Kimya Konu Özetleri PDF 76–77; OGM 10. Sınıf Dersler Cepte ilgili öğretim sayfaları doğrudan karşılaştırıldı. Anlatım, şema ve beş seçenekli alıştırmalar özgündür; resmî sınav sorusu değildir.",
  },
];

type Item = [string, string, string[], string, string];
export const forge015ChemistryGuides: LessonGuide[] = unitData.map(
  ({ items, title, topic, ...guide }) => guide,
);
export const forge015ChemistryTopics: Record<string, string> =
  Object.fromEntries(unitData.map((u) => [u.id, u.topic]));
export const forge015ChemistryLessons: Lesson[] = unitData.map((u) => ({
  id: u.id,
  subjectId: "tyt-kimya",
  title: txt(u.title),
  minutes: u.minutes,
  objectives: u.objectives.map(txt),
  body: u.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: (u.items as Item[]).map(
    ([prompt, correct, wrong, hint, explanation], i): Question => {
      const answer = i % 5,
        options = [...wrong];
      options.splice(answer, 0, correct);
      return {
        id: `f015-chem-${u.id}-${i + 1}`,
        prompt: txt(prompt),
        options: options.map(txt),
        answer,
        hint: txt(hint),
        explanation: txt(explanation),
        skill: u.id,
      };
    },
  ),
  source: txt(u.source),
  tags: [u.id, "kaynakli-anlatim"],
}));
