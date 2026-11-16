import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

const within020 = (n: number, low: number, high: number) =>
  Number.isFinite(n) && n >= low && n <= high;
const KW020 = 1e-14;

/** Ideal concentration model, with fixed T and no other acid/base families. */
function positiveH020(charge: (h: number) => number) {
  let lo = -18,
    hi = 2;
  for (let i = 0; i < 120; i++) {
    const middle = (lo + hi) / 2;
    if (charge(10 ** middle) > 0) hi = middle;
    else lo = middle;
  }
  return 10 ** ((lo + hi) / 2);
}
function strongIons020(net: number, kw = KW020) {
  const major = (Math.abs(net) + Math.hypot(net, 2 * Math.sqrt(kw))) / 2;
  const h = net >= 0 ? major : kw / major,
    oh = kw / h;
  return {
    h,
    oh,
    ph: -Math.log10(h),
    poh: -Math.log10(oh),
    neutralPh: -Math.log10(kw) / 2,
  };
}
function acidFamily020(total: number, fixedNetPositive: number, ka: number) {
  const h = positiveH020(
    (h) => h + fixedNetPositive - total * (ka / (ka + h)) - KW020 / h,
  );
  const anion = total * (ka / (ka + h)),
    ha = total * (h / (ka + h));
  return {
    h,
    oh: KW020 / h,
    ph: -Math.log10(h),
    anion,
    ha,
    total,
    chargeResidual: h + fixedNetPositive - anion - KW020 / h,
  };
}

export const pressureModes020 = {
  volume: "Hacim adımı",
  inertV: "İnert, V sabit",
  inertP: "İnert, P sabit",
} as const;
/** AB⇌A+B. Initially one mole each at 300 K, R=.082 L atm/(mol K), V=24.6 L, Kp=1 atm. */
export function pressure020(
  mode: keyof typeof pressureModes020,
  inert: number,
  volumeRatio: number,
) {
  if (
    !Object.hasOwn(pressureModes020, mode) ||
    !within020(inert, 0, 3) ||
    !within020(volumeRatio, 0.5, 2)
  )
    throw new RangeError("PRESSURE020");
  const inertMol = mode === "volume" ? 0 : inert;
  const rt = 24.6;
  let a: number, volumeFactor: number;
  if (mode === "volume") {
    const l = volumeRatio;
    a = (4 * l) / (l + Math.sqrt(l * l + 8 * l));
    volumeFactor = l;
  } else if (mode === "inertV") {
    a = 1;
    volumeFactor = 1;
  } else {
    const c = 4 + 2 * inertMol;
    a = (2 * c) / (inertMol + Math.sqrt(inertMol * inertMol + 16 * c));
    volumeFactor = (2 + a + inertMol) / 3;
  }
  const volume = rt * volumeFactor;
  const ab = 2 - a,
    firstVolume =
      rt *
      (mode === "inertP"
        ? (3 + inertMol) / 3
        : mode === "volume"
          ? volumeRatio
          : 1);
  const instant = [rt / firstVolume, rt / firstVolume, rt / firstVolume];
  const partial = [(ab * rt) / volume, (a * rt) / volume, (a * rt) / volume];
  const extent = a - 1;
  return {
    mode,
    inertMol,
    volume,
    firstVolume,
    instant,
    partial,
    a,
    b: a,
    ab,
    extent,
    rt,
    temperature: 300,
    initialTotalPressure: ((3 + inertMol) * rt) / firstVolume,
    totalPressure: ((2 + a + inertMol) * rt) / volume,
    inertPressure: (inertMol * rt) / volume,
    quotient: (partial[1] * partial[2]) / partial[0],
    instantQ: (instant[1] * instant[2]) / instant[0],
    aInventory: ab + a,
    bInventory: ab + a,
    direction:
      mode === "inertV" ||
      (mode === "inertP" && inertMol === 0) ||
      (mode === "volume" && volumeRatio === 1)
        ? "Net değişim yok"
        : mode === "volume" && volumeRatio < 1
          ? "Girenlere"
          : "Ürünlere",
  };
}

export const waterTemperatures020 = {
  "25": 1e-14,
  "50": 5.473e-14,
  "80": 9e-14,
} as const;
/** Kw values supplied from the source examples; ideal dilute activities are approximated by concentrations. */
export function water020(
  kind: "water" | "acid" | "base",
  concentration: number,
  temperature: number,
) {
  if (
    !["water", "acid", "base"].includes(kind) ||
    !within020(concentration, 0, 0.1) ||
    ![25, 50, 80].includes(temperature)
  )
    throw new RangeError("WATER020");
  const kw =
    waterTemperatures020[
      String(temperature) as keyof typeof waterTemperatures020
    ];
  const analytical = kind === "water" ? 0 : concentration;
  const net = kind === "base" ? -analytical : analytical;
  return {
    kind,
    temperature,
    kw,
    analytical,
    net,
    ...strongIons020(net, kw),
    className: analytical === 0 ? "Nötr" : kind === "acid" ? "Asidik" : "Bazik",
  };
}

/** HA/NaA in water; positive dose is NaOH, negative dose HCl. Final volume is independently given. */
export function buffer020(
  haMol: number,
  anionMol: number,
  doseMol: number,
  volumeL: number,
  ka = 1e-5,
) {
  if (
    !within020(haMol, 0, 0.2) ||
    !within020(anionMol, 0, 0.2) ||
    haMol + anionMol === 0 ||
    !within020(doseMol, -0.1, 0.1) ||
    !within020(volumeL, 0.5, 2) ||
    !within020(ka, 1e-6, 1e-4)
  )
    throw new RangeError("BUFFER020");
  const total = (haMol + anionMol) / volumeL,
    fixed = (anionMol + doseMol) / volumeL;
  const m = acidFamily020(total, fixed, ka);
  const afterHAMol = Math.max(0, Math.min(haMol + anionMol, haMol - doseMol));
  const afterAnionMol = Math.max(
    0,
    Math.min(haMol + anionMol, anionMol + doseMol),
  );
  const hh =
    afterHAMol > 0 && afterAnionMol > 0
      ? -Math.log10(ka) + Math.log10(afterAnionMol / afterHAMol)
      : null;
  return {
    haMol,
    anionMol,
    doseMol,
    volumeL,
    ka,
    ...m,
    afterHAMol,
    afterAnionMol,
    hh,
    actualHAMol: m.ha * volumeL,
    actualAnionMol: m.anion * volumeL,
    strongAcidExcess: Math.max(0, -doseMol - anionMol),
    strongBaseExcess: Math.max(0, doseMol - haMol),
    bufferPairRemains: afterHAMol > 0 && afterAnionMol > 0,
  };
}

export const salts020 = {
  nacl: "NaCl",
  ammonium: "NH₄Cl",
  acetate: "NaCH₃COO",
  both: "NH₄CH₃COO",
} as const;
/** Acetic acid Ka and ammonia Kb are both explicitly 1.8e-5 at 25 C. No other hydrolysis or complexes. */
export function hydrolysis020(
  kind: keyof typeof salts020,
  concentration: number,
) {
  if (!Object.hasOwn(salts020, kind) || !within020(concentration, 0, 0.2))
    throw new RangeError("HYDROLYSIS020");
  const kaAc = 1.8e-5,
    kaNh = KW020 / 1.8e-5;
  let h: number;
  if (kind === "nacl" || kind === "both" || concentration === 0)
    h = Math.sqrt(KW020);
  else if (kind === "acetate")
    h = acidFamily020(concentration, concentration, kaAc).h;
  else h = acidFamily020(concentration, 0, kaNh).h;
  const acetate =
    kind === "acetate" || kind === "both"
      ? concentration * (kaAc / (kaAc + h))
      : 0;
  const acid =
    kind === "acetate" || kind === "both"
      ? concentration * (h / (kaAc + h))
      : 0;
  const ammonium =
    kind === "ammonium" || kind === "both"
      ? concentration * (h / (kaNh + h))
      : 0;
  const ammonia =
    kind === "ammonium" || kind === "both"
      ? concentration * (kaNh / (kaNh + h))
      : 0;
  const sodium = kind === "nacl" || kind === "acetate" ? concentration : 0;
  const chloride = kind === "nacl" || kind === "ammonium" ? concentration : 0;
  return {
    kind,
    concentration,
    kaAc,
    kaNh,
    h,
    oh: KW020 / h,
    ph: -Math.log10(h),
    acetate,
    acid,
    ammonium,
    ammonia,
    sodium,
    chloride,
    chargeResidual: h + sodium + ammonium - KW020 / h - chloride - acetate,
    className:
      concentration === 0 || kind === "nacl" || kind === "both"
        ? "Nötr"
        : kind === "acetate"
          ? "Bazik"
          : "Asidik",
  };
}

/** Fully dissolved HCl and Ba(OH)2, additive supplied solution volumes, 25 C; no CO2, precipitation or other buffers. */
export function neutralization020(
  acidM: number,
  acidML: number,
  baseM: number,
  baseML: number,
) {
  if (
    !within020(acidM, 0, 0.2) ||
    !within020(acidML, 10, 200) ||
    !within020(baseM, 0, 0.1) ||
    !within020(baseML, 0, 200)
  )
    throw new RangeError("NEUTRALIZATION020");
  const hInput = (acidM * acidML) / 1000,
    ohInput = (2 * baseM * baseML) / 1000;
  const scale = hInput + ohInput;
  const raw = hInput - ohInput;
  const netMol = Math.abs(raw) <= 8 * Number.EPSILON * scale ? 0 : raw;
  const volumeL = (acidML + baseML) / 1000;
  const consumed = Math.min(hInput, ohInput);
  const ions = strongIons020(netMol / volumeL);
  const barium = (baseM * baseML) / 1000 / volumeL,
    chloride = hInput / volumeL;
  return {
    acidM,
    acidML,
    baseM,
    baseML,
    hInput,
    ohInput,
    netMol,
    volumeL,
    consumed,
    acidExcess: Math.max(0, netMol),
    baseExcess: Math.max(0, -netMol),
    barium,
    chloride,
    ...ions,
    waterMol: consumed,
    reactionHeatKJ: -57.3 * consumed,
    chargeResidual: ions.h + 2 * barium - ions.oh - chloride,
    className: netMol === 0 ? "Nötr" : netMol > 0 ? "Asidik" : "Bazik",
  };
}

/** 100 mL 0.100 M HCl or HA (Ka=1e-5), titrated with 0.100 M NaOH, 25 C; volumes additive. */
export function titration020(kind: "strong" | "weak", addedML: number) {
  if (!["strong", "weak"].includes(kind) || !within020(addedML, 0, 200))
    throw new RangeError("TITRATION020");
  const acidMol = 0.01,
    baseMol = (0.1 * addedML) / 1000,
    volumeL = 0.1 + addedML / 1000;
  const total = acidMol / volumeL,
    sodium = baseMol / volumeL,
    ka = 1e-5;
  const water =
    kind === "strong" ? strongIons020((acidMol - baseMol) / volumeL) : null;
  const acid = kind === "weak" ? acidFamily020(total, sodium, ka) : null;
  const h = water?.h ?? acid!.h;
  return {
    kind,
    addedML,
    acidMol,
    baseMol,
    volumeL,
    total,
    sodium,
    ka,
    h,
    oh: KW020 / h,
    ph: -Math.log10(h),
    ha: acid?.ha ?? 0,
    anion: acid?.anion ?? total,
    equivalenceML: 100,
    halfEquivalence: kind === "weak" && addedML === 50,
    stage:
      addedML < 100
        ? "Eşdeğerlik öncesi"
        : addedML === 100
          ? "Eşdeğerlik"
          : "Fazla baz",
    chargeResidual:
      kind === "weak" ? acid!.chargeResidual : h + sodium - KW020 / h - total,
  };
}

export const solids020 = { agcl: "AgCl", caf2: "CaF₂" } as const;
/** Final volume supplied; ideal concentrations, no complexation, hydrolysis, competing precipitate or evaporation. */
export function solubilityEquilibrium020(
  kind: keyof typeof solids020,
  stockMicromol: number,
  commonMillimolar: number,
  volumeL: number,
) {
  if (
    !Object.hasOwn(solids020, kind) ||
    !within020(stockMicromol, 0, 500) ||
    !within020(commonMillimolar, 0, 10) ||
    !within020(volumeL, 0.5, 2)
  )
    throw new RangeError("SOLUBILITY_EQUILIBRIUM020");
  const common = commonMillimolar / 1000,
    ksp = kind === "agcl" ? 1.6e-10 : 4e-11;
  let saturation: number;
  if (kind === "agcl")
    saturation = (2 * ksp) / (common + Math.sqrt(common * common + 4 * ksp));
  else {
    let lo = -30,
      hi = 0;
    for (let i = 0; i < 120; i++) {
      const mid = (lo + hi) / 2,
        s = 10 ** mid;
      if (Math.log(s) + 2 * Math.log(2 * s + common) > Math.log(ksp)) hi = mid;
      else lo = mid;
    }
    saturation = 10 ** ((lo + hi) / 2);
  }
  const stockMol = stockMicromol / 1e6;
  const capacityMol = saturation * volumeL;
  const dissolvedMol = stockMol <= capacityMol ? stockMol : capacityMol;
  const dissolved = dissolvedMol / volumeL,
    solidMol = stockMol - dissolvedMol;
  const cation = dissolved,
    anion = (kind === "agcl" ? 1 : 2) * dissolved + common;
  const q = kind === "agcl" ? cation * anion : cation * anion * anion;
  return {
    kind,
    common,
    stockMol,
    volumeL,
    ksp,
    saturation,
    dissolved,
    dissolvedMol,
    solidMol,
    cation,
    anion,
    q,
    saturated: stockMol >= capacityMol,
    addedCounterion: common,
    chargeResidual: (kind === "agcl" ? 1 : 2) * cation + common - anion,
  };
}

interface Unit020 {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  items: [string, string, string[], string, string][];
  source: string;
}
const units020: Unit020[] = [
  {
    id: "ayt-denge-basinc-hacim",
    topic: "detail-430",
    title: "Dengeye basınç ve hacim etkisi",
    minutes: 62,
    objectives: [
      "Toplam basıncı, kısmi basıncı ve tepkime bölümünü ayrı hesapla.",
      "Hacim değişiminin ani etkisini sonraki net dönüşümden ayır.",
      "İnert gaz eklenmesini sabit hacim ve sabit toplam basınç için karşılaştır.",
    ],
    sections: [
      {
        title: "Önce gazın hangi basıncını konuştuğunu belirle",
        paragraphs: [
          "Bir ideal gaz karışımında toplam basınç bütün gazların kısmi basınçlarının toplamıdır. Her tür için pᵢ=nᵢRT/V yazılır. Böylece aynı sıcaklık ve hacimde bir gazın kısmi basıncı kendi mol miktarına bağlıdır; toplam mol sayısının artması her türün molünün arttığı anlamına gelmez.",
          "Örneğin kapta A, B ve AB gazlarının her biri 1 atm katkı veriyorsa toplam 3 atm olur. Sonradan tepkime vermeyen bir gaz eklenebilir; onun katkısı toplam basınca katılır. Kimyasal dengenin bağıntısında ise yalnız ilgili denklemdeki türlerin uygun basınçları yer alır.",
        ],
      },
      {
        title: "Gaz katsayıları hacme duyarlılığı açıklar",
        paragraphs: [
          "AB(g) ⇌ A(g)+B(g) denkleminde ileri yönde bir mol gaz yerine iki mol gaz oluşur. Gaz katsayıları farkı Δn gaz=2−1=+1 olur. Sabit sıcaklıkta hacim küçülünce gazların kısmi basınçları artar; bu örnekte yeni denge daha az gaz molü olan AB yönünde kurulur.",
          "Bunun nedenini bir kural cümlesinden daha açık görmek için Qp=pA·pB/pAB oranını yaz. Bütün kısmi basınçları aynı f sayısıyla çarpmak Qp'yi f²/f=f katına çıkarır. Kp sıcaklık sabitken aynı kaldığından Qp>Kp durumunda geri yönde net dönüşüm olur.",
        ],
      },
      {
        title: "Hacim adımı ile tepkime aynı an değildir",
        paragraphs: [
          "Hacim bir anda yarıya indirildiğinde, ilk anda mol miktarları henüz değişmeden bütün ideal gaz kısmi basınçları iki katına çıkar. Bu ani etkiyi grafikte eşzamanlı sıçramalarla gösteririz. Ardından tepkime ilerler; bazı mol miktarları artar, bazıları azalır ve Qp yeniden Kp'ye yaklaşır.",
          "Bir türün son basıncını eski dengeyle veya hacim değişiminin hemen sonrasıyla karşılaştırmak farklı sorudur. A gazı 1 atm'den önce 2 atm'ye çıkıp sonra 1,56 atm'ye inebilir. Son değer eskiden büyük olsa da son geçiş sırasında A tüketilmiş olabilir.",
        ],
      },
      {
        title: "Sıkıştırmada sayıların izini sür",
        paragraphs: [
          "300 K'de R=0,082 L·atm/(mol·K) ve 24,6 L kapta AB, A ve B'nin her birinden 1 mol bulunsun. Başlangıç kısmi basınçları 1 atm, Kp=1 atm olarak verilen ideal derişim gösterimindedir. Hacim 12,3 L'ye inince ilk Qp=2 atm olur.",
          "Son A ve B miktarlarına a mol denirse A ve B atom birimi stoklarının korunmasından AB miktarı 2−a mol kalır. Yeni bağıntı a²/[0,5(2−a)]=1 olur. Fiziksel kök a≈0,7808 mol, AB≈1,2192 mol verir; stok ve denge bağıntısı birlikte sağlanır.",
        ],
      },
      {
        title: "Genleşmede aynı yöntemi ters yönde uygula",
        paragraphs: [
          "Sabit sıcaklıkta hacim iki katına çıktığında aynı başlangıç karışımının bütün kısmi basınçları ilk anda yarıya iner. AB ⇌ A+B örneğinde Qp, Kp'nin yarısına düşer. İleri yönde dönüşüm AB tüketip A ve B oluşturarak oranı yükseltir.",
          "Yeni dengenin eski basıncın tamamını geri getirmesi gerekmez. Sistem daha büyük hacimde başka bir bileşimle Kp'yi sağlar. Le Chatelier yorumu değişimi tamamen yok eden bir geri dönüş garantisi değil, net dönüşüm yönünü anlatan bir denge yorumudur.",
        ],
      },
      {
        title: "İnert gazın anlamı tepkime koşuluna bağlıdır",
        paragraphs: [
          "İnert, seçilen deney koşullarında ilgili karışımla tepkime vermeyen madde demektir. Bu dersteki I gazı ideal kabul edilir; başka türlerle bağlanma veya etkinlik değişimi oluşturmaz. Dolayısıyla I denklemin reaktifi olmadığı gibi Kp ifadesine de ayrı bir çarpan olarak eklenmez.",
          "Bir gazın bir deneyde tepkime vermemesi her sıcaklıkta ve her maddeyle aynı davranacağını garanti etmez. Burada önemli ayrım, I'nın kimyasal tüketimi değil eklenirken kabın hacminin ne yaptığıdır. Aynı miktar I, sabit hacimde ve hareketli piston altında farklı mekanik sonuç doğurabilir.",
        ],
      },
      {
        title: "Sabit hacimde inert eklemek neyi değiştirir?",
        paragraphs: [
          "Sıcaklık ve hacim sabitse AB, A ve B'nin mol sayıları ilk anda değişmez. pᵢ=nᵢRT/V nedeniyle bunların kısmi basınçları da aynı kalır. I gazının kendi basıncı toplam basıncı artırsa bile tepkime bölümündeki terimler değişmez; ideal modelde net denge kayması olmaz.",
          "Önceki 24,6 L kapta her reaktif tür 1 molken 2 mol I eklenirse I'nın basıncı 2 atm, toplam basınç 5 atm olur. A'nın mol kesri 1/5 ve kısmi basıncı (1/5)×5=1 atm'dir. Eski mol kesri 1/3'ü yeni toplam basınca çarpmak hatalıdır.",
        ],
      },
      {
        title: "Sabit toplam basınçta pistonun payını gör",
        paragraphs: [
          "İnert eklenirken sıcaklık ve toplam basınç sabit tutuluyorsa piston dışarı hareket eder. İlk anda AB, A ve B'nin miktarları değişmese de hacim büyüdüğünden kısmi basınçları azalır. AB ⇌ A+B için Qp düşer ve net ileri dönüşüm olabilir.",
          "Başlangıçta toplam 3 mol, 3 atm ve 24,6 L olan örneğe 2 mol I eklenirse tepkime henüz ilerlemeden hacim 41 L olur. Her tepkime türünün ilk kısmi basıncı 0,6 atm, Qp=0,6 atm'dir. Sabit toplam basınç, bütün kısmi basınçların sabit olması demek değildir.",
        ],
      },
      {
        title: "Yeni denge, piston ve atom stokları birlikte çözülür",
        paragraphs: [
          "Sabit toplam 3 atm basınç altında denge ilerledikçe toplam gaz molü de değişebilir; pistonun son hacmini yalnız eklenen I miktarından bulup donduramayız. Son A ve B a, AB 2−a ve I 2 mol ise toplam gaz 4+a mol olur. İdeal gaz bağıntısı son hacmi belirler.",
          "Kp=1 atm koşulu 3a²/[(2−a)(4+a)]=1 verir. Buradan 4a²+2a−8=0 ve fiziksel a≈1,18614 mol bulunur. Son hacim yaklaşık 42,526 L'dir. İleri dönüşüm gaz molünü artırdığı için bu hacim ani 41 L değerinden de büyüktür.",
        ],
      },
      {
        title: "İki tarafta gaz katsayıları eşitse",
        paragraphs: [
          "A(g) ⇌ B(g) gibi Δn gaz=0 olan ideal bir dengede bütün kısmi basınçları aynı sayıyla ölçeklemek pB/pA oranını değiştirmez. Bu nedenle yalnız izotermal hacim değişimi bileşimi değiştirmeyebilir. H₂+I₂ ⇌ 2HI için de ortak ölçek çarpanları pay ve paydada aynı toplam kuvvette bulunur.",
          "Bu sonuç yalnız toplam basıncı değiştirmenin her zaman dengeyi kaydırdığı iddiasını sınırlar. Yalnız A eklemek bütün türleri aynı katsayıyla ölçeklemez ve oranı değiştirebilir. Müdahalenin adı basınç artışı olsa bile işlemin hangi türleri hangi oranda değiştirdiğini tek tek yaz.",
        ],
      },
      {
        title: "Katı veya sıvı bulunan bir denge de etkilenebilir",
        paragraphs: [
          "NH₄Cl(k) ⇌ NH₃(g)+HCl(g) örneğinde saf katı denge ifadesine ayrı derişim terimi olarak alınmaz; gazların basınçları yine önemlidir. Her iki fazın sürdüğü uygun ideal örnekte sıkıştırma gazların ürün basınç çarpımını artırıp katı oluşumu yönünde net dönüşüm sağlayabilir.",
          "Gaz sayarken sıvı ve katı katsayılarını gaz katsayılarına ekleme. Saf fazın denklemde görünmemesi tepkimeye katılmadığı veya miktarının her durumda aynı olduğu anlamına gelmez. Bir faz tamamen biterse başlangıçta kullanılan faz birlikteliği modelinin uygulanabilirliği ayrıca kontrol edilir.",
        ],
      },
      {
        title: "Grafiği stok, anlık oran ve son oranla denetle",
        paragraphs: [
          "Önce verilen sıcaklık ve kap koşulunu yaz; sonra ani kısmi basınçları hesapla. Bu ilk durumdan Qp'yi kurup Kp ile karşılaştır. Son adımda atom stoklarını koruyan değişim tablosu ile yeni dengeyi bul. Böylece yön ezberiyle sayı hesabı aynı sonucu destekler.",
          "Etkileşimde hacim adımı, sabit hacimde I ve sabit basınçta I ayrı seçeneklerdir. Çizim aşamaları zamanın eşit parçaları veya gerçek hız ölçümü değildir. İlk, ani ve son etiketleriyle hem kısmi basınçları hem toplam basıncı okuyup hangi büyüklüğün sabit tutulduğunu kendi cümlenle açıkla.",
        ],
      },
    ],
    examples: [
      {
        title: "Önce iki kat, sonra geri dönüşüm",
        prompt:
          "İdeal AB(g) ⇌ A(g)+B(g); 300 K, R=0,082 L·atm/(mol·K). Başlangıçta 24,6 L kapta her türden 1 mol ve Kp=1 atm. T sabitken V=12,3 L oluyor. Ani ve son durum?",
        strategy: "Ani ideal gaz hesabını stok koruyan yeni dengeden ayır.",
        steps: [
          {
            label: "Ani",
            explanation:
              "Her kısmi basınç 2 atm; Qp=2×2/2=2 atm>Kp, net yön AB'ye.",
          },
          {
            label: "Stok",
            explanation: "Son nA=nB=a, nAB=2−a. a²/[0,5(2−a)]=1 → 2a²+a−2=0.",
          },
          {
            label: "Kök",
            explanation:
              "a=(√17−1)/4≈0,780776 mol. pA=pB≈1,56155 atm, pAB≈2,43845 atm; oran yeniden 1 atm.",
          },
        ],
        answer: "Net geri dönüşüm; son A ve B yaklaşık 0,7808 mol.",
        check: "AB+A=AB+B=2 mol atom birimi; iki stok da korunur.",
        pitfall:
          "A'nın eski 1 atm'den büyük son basıncını, tepkimede A oluştuğu sanmak.",
      },
      {
        title: "Toplam basınç artar, oran aynı kalır",
        prompt:
          "300 K'de ideal AB ⇌ A+B dengesinin 24,6 L kabında her tür 1 mol ve p=1 atm. R=0,082 L·atm/(mol·K). T ve V sabitken tepkime vermeyen 2 mol I ekleniyor. Sonuç?",
        strategy:
          "I'nın katkısını ayrı hesapla; reaktif mol sayıları değişmez.",
        steps: [
          {
            label: "Reaktifler",
            explanation:
              "n, T ve V aynı olduğu için AB, A ve B'nin her birinin basıncı yine 1 atm.",
          },
          {
            label: "Toplam",
            explanation:
              "I için pI=2×0,082×300/24,6=2 atm. Toplam 1+1+1+2=5 atm.",
          },
          {
            label: "Denge",
            explanation:
              "Qp=1×1/1=1 atm, Kp'ye eşit. İdeal modelde net kayma yoktur.",
          },
        ],
        answer: "Toplam 5 atm; reaktif kısmi basınçları aynı; net kayma yok.",
        check: "A mol kesri 1/5; (1/5)×5=1 atm.",
        pitfall: "Eski 1/3 mol kesrini yeni toplam basınçla çarpmak.",
      },
      {
        title: "Aynı inert, hareketli piston",
        prompt:
          "İdeal AB ⇌ A+B; 300 K'de her tür 1 mol, toplam 3 atm, V=24,6 L ve Kp=1 atm. R=0,082 L·atm/(mol·K). 2 mol inert I eklenirken T ve toplam P=3 atm sabit tutuluyor. Yeni denge?",
        strategy:
          "Önce pistonun ani hacmi; sonra denge ilerlerken değişen son hacim.",
        steps: [
          {
            label: "Ani",
            explanation:
              "İlk toplam 5 mol olduğundan ani V=5×24,6/3=41 L. Her reaktif p=0,6 atm, Qp=0,6 atm; ileri yön.",
          },
          {
            label: "Birlikte çöz",
            explanation:
              "Son nA=nB=a, nAB=2−a, nI=2. pA=3a/(4+a), pAB=3(2−a)/(4+a). Kp=1 → 4a²+2a−8=0.",
          },
          {
            label: "Sonuç",
            explanation:
              "a≈1,18614 mol ve AB≈0,81386 mol. V=(4+a)×24,6/3≈42,526 L; toplam P yine 3 atm.",
          },
        ],
        answer: "Net ileri dönüşüm; son V yaklaşık 42,526 L.",
        check: "Son pA=pB≈0,68614, pAB≈0,470789 atm; pA·pB/pAB≈1 atm.",
        pitfall: "Denge dönüşümünden sonra da hacmi ani 41 L değerinde tutmak.",
      },
      {
        title: "Eşit gaz katsayısında inert",
        prompt:
          "İdeal A(g) ⇌ B(g), 300 K'de 24,6 L kapta A=1 mol, B=2 mol; Kp=2. R=0,082 L·atm/(mol·K). 3 mol inert eklenirken toplam basınç 3 atm sabit. Yeni bileşim?",
        strategy:
          "Pistonun ortak ölçek etkisinin oranı değiştirip değiştirmediğini denetle.",
        steps: [
          {
            label: "Hacim",
            explanation:
              "Toplam mol 3'ten 6'ya çıkar; aynı T ve P'de hacim 24,6 L'den 49,2 L'ye çıkar.",
          },
          {
            label: "Oran",
            explanation: "pA=0,5 atm, pB=1 atm. Qp=pB/pA=2, yine Kp.",
          },
          {
            label: "Bileşim",
            explanation:
              "Net dönüşüm gerekmez; A=1 mol ve B=2 mol kalır. İnert 1,5 atm katkı verir ve toplam 3 atm olur.",
          },
        ],
        answer: "A/B mol miktarları değişmez; pB/pA=2 korunur.",
        check: "Δn gaz=1−1=0; ortak basınç çarpanı oran içinde sadeleşir.",
        pitfall:
          "Sabit toplam basınçta inert her gaz dengesini mutlaka kaydırır demek.",
      },
    ],
    recall: [
      {
        prompt: "Sıkıştırmadan hemen sonra ilk değişen nedir?",
        answer:
          "Mol miktarları henüz aynıyken bütün ideal gaz kısmi basınçları RT/V nedeniyle birlikte değişir.",
      },
      {
        prompt: "Sabit V'de inert eklemek neden net kayma yapmaz?",
        answer:
          "İlgili gazların n,T,V değerleri ve kısmi basınçları aynı kaldığı için Qp değişmez.",
      },
      {
        prompt: "Sabit P'de inert neden farklıdır?",
        answer:
          "Piston genişler; tepkime türlerinin kısmi basınçları azalır. Δn gaz sıfır değilse Qp değişebilir.",
      },
      {
        prompt: "Son değer eskiden büyükken tür tüketilmiş olabilir mi?",
        answer:
          "Evet; hacim adımından sonraki ani değere göre azalma ile eski dengeye göre karşılaştırma farklıdır.",
      },
    ],
    items: [
      [
        "İdeal AB(g) ⇌ A(g)+B(g) karışımı dengede. Sıcaklık sabitken hacim yarıya indiriliyor, hiçbir tür eklenmiyor. Net yön ve Kp için doğru ifade?",
        "AB oluşumu yönü; Kp aynı",
        [
          "A ve B oluşumu yönü; Kp iki kat",
          "Net yön yok; Kp sıfır",
          "Her tür bütünüyle yok olur",
          "Yön yalnız toplam katı kütlesinden bulunur",
        ],
        "Bütün gaz basınçlarına aynı çarpanı uygula.",
        "Kısmi basınçlar ilk anda iki kat olur; Qp=pA·pB/pAB iki katına çıkar. Qp>Kp olduğundan geri yön AB oluşturur. T sabit olduğu için verilen aynı denklem Kp'si değişmez.",
      ],
      [
        "İdeal bir gaz dengesi karışımına sıcaklık ve hacim sabitken, hiçbir türle tepkime vermeyen I gazı ekleniyor. Doğru sonuç hangisidir?",
        "Toplam basınç artabilir; ilgili gazların kısmi basınçları ve Qp aynı kalır",
        [
          "İlgili bütün kısmi basınçlar zorunlu iki kat olur",
          "Kp yalnız inert miktarıyla aynı oranda artar",
          "Her dengede ürünler kesin tamamen biter",
          "Sıcaklık sabitken RT/V sıfır olur",
        ],
        "Her tür için pᵢ=nᵢRT/V yaz.",
        "İnertin eklenmesi ilgili reaktiflerin n,T,V değerlerini değiştirmez. İnert kendi basıncını toplama ekler; fakat verilen ideal koşulda denge oranına yeni bir reaktif terimi girmez.",
      ],
      [
        "İdeal AB(g) ⇌ A(g)+B(g) dengesi için başlangıç kısmi basınçları birer 1 atm, Kp=1 atm. İnert eklenirken T ve toplam P sabit tutuluyor; ani kısmi basınçların her biri 0,6 atm oluyor. İlk Qp ve net yön?",
        "0,6 atm; ürünlere",
        [
          "1 atm; net yön yok",
          "1,8 atm; yalnız inert tüketilir",
          "0,36 atm; AB oluşur",
          "3 atm; sıcaklık mutlaka düşer",
        ],
        "Payda AB'nin tek basıncıdır.",
        "Qp=0,6×0,6/0,6=0,6 atm. Bu değer Kp'den küçük olduğundan net ileri dönüşüm A ve B oluşturur. Toplam basıncın sabitliği kısmi basınçları sabitlemez.",
      ],
      [
        "İdeal H₂(g)+I₂(g) ⇌ 2HI(g) dengesi T sabitken yalnız hacmi yarıya indirerek sıkıştırılıyor. Başka etki yok. İlk Qp/Kp ilişkisi ve net kayma?",
        "Qp aynı kalır; bu ideal işlem tek başına net kayma gerektirmez",
        [
          "Qp dört kat olur; yalnız HI yok olur",
          "Qp iki kat olur; mutlaka sola kayar",
          "Kp hacimle yarıya iner",
          "Bütün gazların molü anında iki kat olur",
        ],
        "Pay ve paydadaki toplam gaz üslerini karşılaştır.",
        "Qp=pHI²/(pH₂·pI₂). Her basınca gelen iki çarpanı payı ve paydayı dörder kat yaptığı için oran aynı kalır. Δn gaz=0 olan bu örnekte izotermal ortak ölçek bileşimi değiştirmez.",
      ],
      [
        "X(g)+Y(saf sıvı) ⇌ Z(g) dengesi ideal gaz yaklaşımında ve sabit T'de hacim küçültülüyor. Saf Y sıvı fazı sürüyor, başka etki yok. Kp=pZ/pX. Doğru yorum?",
        "X ve Z basınçlarının ortak ölçeklenmesi oranı değiştirmez",
        [
          "Sıvı Y'nin katsayısı mutlaka iki gaz gibi sayılır",
          "Saf sıvı Y denkleme katılmadığı için atomları korunmaz",
          "Kp yalnız sıvının toplam gramına eşittir",
          "Gaz içeren her denge sıkıştırılınca kesin ürünlere gider",
        ],
        "Gaz katsayılarına sıvıyı ekleme.",
        "Bu bağıntıda saf sıvının etkinliği sabit kabul edilir; gazlar birer katsayıyla yer alır. pZ ve pX aynı sayıyla çarpıldığında Qp aynı kalır. Y'nin stok hesabına katılması ayrı bir konudur.",
      ],
      [
        "Bir hacim azaltma deneyinde A'nın kısmi basıncı eski dengede 1 atm, hemen sonra 2 atm, yeni dengede 1,56 atm. Yalnız son dengeye gidiş aralığı için hangisi doğrudur?",
        "A'nın basıncı ani duruma göre azalmıştır; net tüketimle uyumlu olabilir",
        [
          "Son değer eskiden büyük olduğu için A kesin net üretilmiştir",
          "Hacim sabit tutulurken bütün A atomları yok edilmiştir",
          "A'nın ilk basıncı aslında 0 atm olmalıdır",
          "Kp bu üç sayı arasında mutlaka 1,56 kat artmıştır",
        ],
        "Karşılaştırmanın başlangıç anını seç.",
        "Yeni dengeye gidiş 2 atm'den 1,56 atm'ye olan aralıktır. Bu aralıkta sabit son hacimde A miktarı azalabilir. Eski 1 atm başka hacme ait olduğundan yalnız o sayıyla net oluşum yönü seçilmez.",
      ],
      [
        "300 K'de R=0,082 L·atm/(mol·K), V=24,6 L sabit. Kapta AB,A,B birer mol ve sonradan 2 mol inert I var. A'nın mol kesri ve kısmi basıncı?",
        "1/5 ve 1 atm",
        ["1/3 ve 5/3 atm", "1/5 ve 5 atm", "1/2 ve 2,5 atm", "2/5 ve 2 atm"],
        "Yeni toplam mol sayısını kullan.",
        "Toplam mol 5; A mol kesri 1/5'tir. Toplam P=5 atm olduğundan pA=(1/5)×5=1 atm. Aynı sonuç nART/V ile doğrudan da bulunur.",
      ],
      [
        "İdeal AB(g) ⇌ A(g)+B(g) dengesinde T ve V sabit. Yalnız AB ekleniyor; diğer türlerin molü ilk anda aynı. İlk oran ve net yön nasıl değişir?",
        "Qp azalır; ürün oluşumu yönü desteklenir",
        [
          "Bütün basınçlar aynı oranda artar, Qp kesin aynı kalır",
          "Qp artar; AB oluşumu zorunludur",
          "Kp yalnız eklenen AB molüne eşittir",
          "İnert ekleme ile her koşulda bire bir aynı işlemdir",
        ],
        "Paydanın hangi türü içerdiğini belirle.",
        "AB basıncı artar; pA ve pB ilk anda aynı olduğundan pA·pB/pAB azalır. Bu, bütün gazların birlikte sıkışması değildir. Sabit T'de Kp'ye dönmek için net ileri dönüşüm olabilir.",
      ],
      [
        "NH₄Cl(k) ⇌ NH₃(g)+HCl(g) dengesi T sabitken sıkıştırılıyor; saf katı faz ve gazlar son durumda da var. İdeal gaz/saf katı modelinde net yön?",
        "Gazların tüketilip katı oluşması yönü",
        [
          "Katı bulunduğundan hiçbir basınç etkisi mümkün değildir",
          "Katının gaz katsayısı iki kabul edilir ve ürünlere kayar",
          "Kp saf katının son gramıyla değişir",
          "Yalnız katalizör eklenmiş sayılır",
        ],
        "Kp=pNH₃·pHCl oranının ani değişimini incele.",
        "Sıkıştırma iki gaz basıncını artırıp Qp'yi yükseltir. Sabit T'deki Kp'ye dönmek için gaz tüketen geri yön desteklenir. Saf katının ayrı terim olmaması tepkimenin basınca duyarsız olduğu anlamına gelmez.",
      ],
      [
        "İdeal AB(g) ⇌ A(g)+B(g) için aynı T'de Kp=1 atm. Verilen bir anda pA=pB=0,5 atm, pAB=0,25 atm; ayrıca tepkime vermeyen I'nın basıncı 10 atm. Qp ve net yön?",
        "1 atm; verilen oran açısından net kayma gerekmez",
        [
          "11 atm; inert tamamen tüketilir",
          "10,25 atm; mutlaka ürünler biter",
          "0,25 atm; sadece toplam basınca bakılır",
          "4 atm; Kp yeni toplam basınca dönüşür",
        ],
        "İnert I ilgili denklemde yer almaz.",
        "Qp=0,5×0,5/0,25=1 atm. Kp'ye eşit olduğu için ilgili tepkime açısından verilen durum denge oranını sağlar. İnertin büyük basıncı bu ideal kısmi basınç hesabına ayrıca çarpan yapılmaz.",
      ],
    ],
    source:
      "MEBİ AYT Kimya PDF 75; OGM Dengeyi Etkileyen Faktörler sunu PDF 12–15 ve özellikle gerçek13. sayfa grafiği karşılaştırılarak yazılmış özgün öğretim ve sorular. Sabit hacim/sabit toplam basınç ayrımı, anlık değişim ve atom stokları açık ideal model koşullarıdır; resmî sınav sorusu değildir.",
  },
  {
    id: "ayt-sulu-asit-baz-denge",
    topic: "detail-431",
    title: "Sulu çözeltilerde su ve asit-baz dengesi",
    minutes: 62,
    objectives: [
      "Suyun proton aktarımını ve Kw bağıntısını kur.",
      "pH, pOH ve sıcaklığa bağlı nötr sınırı birlikte hesapla.",
      "Asit-baz tanımlarını ve eşlenik çiftleri aynı örnekte ayır.",
    ],
    sections: [
      {
        title: "Saf suyun içinde de iyon vardır",
        paragraphs: [
          "Saf su çoğunlukla H₂O moleküllerinden oluşur; küçük bir bölümü proton aktarımıyla iyonik türler oluşturur. İyonlar elektrik alan altında hareket edebildiğinden çok saf suyun bile küçük bir elektrik iletkenliği vardır. Moleküler yapıda olmak, her koşulda hiç iyon bulunmaması demek değildir.",
          "Burada elektrolitik iletkenlikten söz ediyoruz; sıvı metallerdeki elektron iletkenliği başka mekanizmadır. Suya iyon içeren madde eklemek taşıyıcıların miktarını değiştirebilir. Asit-baz hesabında H₃O⁺ ve OH⁻ iyonlarını, çok daha büyük miktardaki su moleküllerinden ayrı sayarız.",
        ],
      },
      {
        title: "Bir su proton verirken diğeri alır",
        paragraphs: [
          "Otoiyonlaşma 2H₂O(sıvı) ⇌ H₃O⁺(suda)+OH⁻(suda) ile gösterilir. Bir su molekülü H⁺ aktarınca OH⁻, öteki H⁺ alınca H₃O⁺ olur. Atom ve yükler korunur: toplam dört H ve iki O, toplam sıfır yük her iki tarafta da aynıdır.",
          "Sulu çözeltide H⁺ yazımı çoğunlukla hidratlanmış protonun kısa gösterimidir; tek başına çıplak protonların su içinde bağımsızca dolaştığı bir çizim olarak düşünülmez. Saf suyun ileri ve geri proton aktarımları dengede sürer; iyon miktarının sabitliği moleküler hareketin durması değildir.",
        ],
      },
      {
        title: "Suyun iyon çarpımını kur",
        paragraphs: [
          "Seyreltik ideal yaklaşımda Kw=[H₃O⁺][OH⁻] yazılır; kaynaklarda Ksu adı da kullanılır. Sıvı suyun etkinliği bu modelde sabit alınır. 25 °C için verilen yaklaşık değer 1,0×10⁻¹⁴'tür. Burada köşeli parantezler mol/L cinsinden derişimi gösterir.",
          "Saf suda başka yük taşıyan madde yokken elektriksel denklik [H₃O⁺]=[OH⁻] verir. İki eşit derişimin çarpımı Kw olduğundan her biri √Kw olur. 25 °C'de bu değer 1,0×10⁻⁷ M'dir; suyun her molekülünün yüzde yarısının iyonlaşması anlamına gelmez.",
        ],
      },
      {
        title: "pH küçük sayıları logaritmayla anlatır",
        paragraphs: [
          "Bu dersin derişim yaklaşımında pH=−log₁₀[H₃O⁺], pOH=−log₁₀[OH⁻] tanımları kullanılır. [H₃O⁺]=10⁻⁵ M ise pH 5; 10⁻⁴ M ise pH 4 olur. Bir pH birimi fark H₃O⁺ derişiminde on kat farka karşılık gelir.",
          "3×10⁻⁶ M gibi bir derişimde pH=6−log3≈5,523 bulunur. Sayının katsayısını yok saymak pH'ı tam 6 sanmaya yol açar. Daha genel pH tanımı iyon etkinliğine dayanır; burada verilen seyreltik hesapların neyi yaklaştırdığı açık tutulur.",
        ],
      },
      {
        title: "pH ile pOH aynı dengeyi paylaşır",
        paragraphs: [
          "Kw bağıntısının negatif logaritmasını almak pH+pOH=pKw sonucunu verir. pKw=−logKw'dir; 25 °C'deki verilen Kw için pKw 14 olur. Bu nedenle pH 4,5 olan çözeltide aynı koşulda pOH 9,5'tir.",
          "H₃O⁺ artarken OH⁻ azalması, aynı sıcaklıkta ve aynı modelde çarpımın sabit olmasının sonucudur. Asidik çözeltide OH⁻ bütünüyle sıfır değildir. Sıfır derişimin logaritması tanımlı olmadığından pH hesabında suyun az da olsa karşı iyonunu silmek doğru bir genel yöntem değildir.",
        ],
      },
      {
        title: "Nötr olmak her sıcaklıkta pH yedi değildir",
        paragraphs: [
          "Nötr koşul [H₃O⁺]=[OH⁻] eşitliğidir; dolayısıyla nötr pH=pKw/2 olur. Suyun iyonlaşması sıcaklıkla değişir. Kaynak örneğinde 80 °C'de Kw=9,0×10⁻¹⁴ verilirse iki iyon derişimi de 3,0×10⁻⁷ M, pH yaklaşık 6,523 çıkar.",
          "Bu su asidik değildir; H₃O⁺ ve OH⁻ eşittir. Yalnız 25 °C'ye ait pH 7 sınırını başka sıcaklığa taşımamak gerekir. Etkileşimde 25, 50 ve 80 °C için ayrı verilen Kw değerleri kullanılır; sıcaklık bütün sayıları aynı 14 toplamına zorlamaz.",
        ],
      },
      {
        title: "Kuvvetli asitte önce analitik katkıyı hesapla",
        paragraphs: [
          "İdeal seyreltik HCl örneğinde asidin büyük ölçüde H₃O⁺ ve Cl⁻ oluşturduğu kabul edilir. Asidin analitik derişimi c ise Cl⁻ derişimi c'dir. Elektriksel denklik [H₃O⁺]−[OH⁻]=c, su dengesi de [H₃O⁺][OH⁻]=Kw verir.",
          "c, suyun 10⁻⁷ M düzeyinden çok büyükse H₃O⁺≈c uygun yaklaşımıdır. Örneğin 0,010 M HCl için pH yaklaşık 2'dir. Aynı formülü her seyreltikliğe koşulsuz uzatmak yerine, suyun katkısıyla karşılaştırarak neden işe yaradığını anlamak gerekir.",
        ],
      },
      {
        title: "Çok seyreltikte su katkısını koru",
        paragraphs: [
          "25 °C'de 10⁻⁸ M kuvvetli asit için yalnız −logc=8 yazmak çözeltinin bazik olduğu gibi yanlış bir sonuç verir. İki denklik birlikte [H₃O⁺]²−c[H₃O⁺]−Kw=0 bağıntısını verir. Fiziksel pozitif kök, asit katkısı olmasa bile su iyonlarını korur.",
          "c=10⁻⁸ M için H₃O⁺≈1,05125×10⁻⁷ M ve pH≈6,9783'tür. Asidik fark küçüktür ama yönü doğrudur. Sayı 7'ye yuvarlandığında tam nötrlük kanıtlanmış olmaz; ekrandaki basamak sayısı ile modeldeki madde katkısı farklı şeylerdir.",
        ],
      },
      {
        title: "Kuvvetli baz ve nötrlüğe yaklaşan seyreltme",
        paragraphs: [
          "NaOH veya KOH için çözünmüş bir formül birimi başına bir OH⁻ katkısı verilen modelde [OH⁻]−[H₃O⁺]=c olur. Su dengesiyle birlikte büyük iyon derişimi pozitif kökten, küçük iyon Kw/büyük iyon bağıntısından bulunabilir. 25 °C'de 0,020 M KOH için pOH≈1,699, pH≈12,301 olur.",
          "Sabit sıcaklıkta basit kuvvetli asit veya bazın seyreltilmesi pH'ı o sıcaklığın nötr sınırına yaklaştırır; maddenin kimliğini kuvvetli türden zayıf türe dönüştürmez. Buharlaşma, tepkime veya çözeltiden gaz kaybı varsa yalnız seyreltme modeli yeterli değildir.",
        ],
      },
      {
        title: "Brønsted-Lowry tanımında rol proton aktarımıdır",
        paragraphs: [
          "Proton veren tür asit, proton alan tür bazdır. NH₃+H₂O ⇌ NH₄⁺+OH⁻ örneğinde NH₃ ileri yönde proton alan baz, H₂O proton veren asittir. Geri yönde NH₄⁺ proton verebilir ve OH⁻ proton alabilir; roller seçilen yönde açıklanır.",
          "Eşlenik çiftler NH₄⁺/NH₃ ve H₂O/OH⁻ olur. Bir çift bir H⁺ ile ayrıldığından yükleri de bir birim farklıdır. Aynı sayıda H içeren veya aynı elementleri taşıyan herhangi iki tür otomatik eşlenik çift değildir. NH₄⁺, NH₃'ün zayıf eşlenik asididir; kuvvetli asit diye adlandırılmaz.",
        ],
      },
      {
        title: "Üç asit-baz tanımını örnek üzerinde ayır",
        paragraphs: [
          "Arrhenius yaklaşımı sulu ortamda H₃O⁺ veya OH⁻ oluşumunu artırmaya odaklanır. NH₃ formülünde OH grubu taşımadan suyla tepkimesinde OH⁻ oluşumunu artırır. NaOH'un suda ayrışmasıyla verilen OH⁻ ise Brønsted-Lowry anlamında proton alabilen bazdır.",
          "Lewis tanımı elektron çifti alışverişine odaklanır: çift alan asit, çift veren bazdır. NH₃'ün ortaklanmamış elektron çiftini BF₃'e verdiği örnekte NH₃ Lewis bazı, BF₃ Lewis asididir. Bu etkileşimde ayrıca bir proton aktarımı bulunması şart değildir; tanımların kapsamları aynı değildir.",
        ],
      },
      {
        title: "Kuvvet, derişim ve çözünürlüğü ayrı sor",
        paragraphs: [
          "Asit-baz kuvveti belirli ortamda proton alışverişi ve denge eğilimiyle; derişim bir çözeltideki madde miktarıyla; çözünürlük ise çözünebilen miktarın denge sınırıyla ilgilidir. Seyreltik kuvvetli asit ve derişik zayıf asit karşılaştırmasında yalnız pH sayısından hangi maddenin daha kuvvetli olduğunu her zaman çıkaramazsın.",
          "Önce sıcaklığı ve verilen tanımı seç, sonra gerekiyorsa n=cV ile analitik derişimi bul. H₃O⁺/OH⁻ dengesini kurup pH ve pOH toplamını denetle. Eşlenik çiftte atom ve yük farkını, sayısal hesapta ise su katkısını kontrol etmek aynı konunun birbirini tamamlayan iki denetimidir.",
        ],
      },
    ],
    examples: [
      {
        title: "Katsayılı çok küçük sayı",
        prompt:
          "25 °C'de ideal derişim yaklaşımıyla H₃O⁺=3,0×10⁻⁶ mol/L verilmiş. Kw=1,0×10⁻¹⁴ ve log3≈0,4771. OH⁻, pH ve pOH?",
        strategy: "Önce çarpımdan karşı iyonu; sonra logaritmayı bul.",
        steps: [
          {
            label: "Karşı iyon",
            explanation: "[OH⁻]=10⁻¹⁴/(3×10⁻⁶)=(1/3)×10⁻⁸≈3,333×10⁻⁹ M.",
          },
          {
            label: "Logaritma",
            explanation: "pH=−log(3×10⁻⁶)=6−log3≈5,5229.",
          },
          {
            label: "Toplam",
            explanation:
              "pOH=14−5,5229=8,4771. H₃O⁺ daha büyük olduğu için çözelti asidiktir.",
          },
        ],
        answer: "OH⁻≈3,333×10⁻⁹ M; pH≈5,5229; pOH≈8,4771.",
        check: "(3×10⁻⁶)(3,333×10⁻⁹)≈10⁻¹⁴.",
        pitfall: "3 katsayısını logaritmada silip pH 6 yazmak.",
      },
      {
        title: "Sıcak saf suyun nötr pH'ı",
        prompt:
          "80 °C'de saf su için Kw=9,0×10⁻¹⁴ verilmiş. Başka çözünen yok; ideal derişim modeli. H₃O⁺, OH⁻ ve pH? log3≈0,4771.",
        strategy: "Nötr eşitliğini kullan; 25 °C sınırını taşıma.",
        steps: [
          {
            label: "Eşitlik",
            explanation: "Saf suda elektriksel denklik H₃O⁺=OH⁻ verir.",
          },
          {
            label: "Karekök",
            explanation: "Her derişim √(9×10⁻¹⁴)=3×10⁻⁷ M olur.",
          },
          {
            label: "Sınıf",
            explanation:
              "pH=7−log3≈6,5229; iki iyon eşit olduğundan çözelti yine nötrdür.",
          },
        ],
        answer: "İki iyon da 3×10⁻⁷ M; pH≈6,5229 ve nötr.",
        check: "pH+pOH≈13,0458; bu sıcaklığın pKw değeridir.",
        pitfall: "pH 7'den küçük diye sıcak saf suyu asidik saymak.",
      },
      {
        title: "Su katkısı olmadan yanlış yöne giden hesap",
        prompt:
          "25 °C'de analitik HCl derişimi 1,0×10⁻⁸ M. HCl tam ayrışmış, Kw=1,0×10⁻¹⁴; diğer türler yok, ideal derişim yaklaşımı. Verilen pozitif kök H=(c+√(c²+4Kw))/2 ile pH?",
        strategy: "Asit yük farkını suyun iyon çarpımıyla birlikte uygula.",
        steps: [
          {
            label: "İki denklik",
            explanation: "H−OH=c ve H·OH=Kw; yerine koyunca H²−cH−Kw=0.",
          },
          {
            label: "Fiziksel kök",
            explanation: "H=(10⁻⁸+√(4,01×10⁻¹⁴))/2≈1,051249×10⁻⁷ M.",
          },
          {
            label: "Yorum",
            explanation:
              "pH≈6,9783; OH≈9,51249×10⁻⁸ M. Asit az da olsa H'yi OH'den büyük yapar.",
          },
        ],
        answer: "pH≈6,9783; çok seyreltik ama asidik.",
        check: "H−OH≈10⁻⁸ M; H·OH=10⁻¹⁴.",
        pitfall:
          "Suyu yok sayıp −log10⁻⁸=8 sonucunu asit çözeltisinin pH'ı saymak.",
      },
      {
        title: "Bazı pOH üzerinden çöz",
        prompt:
          "25 °C'de KOH tamamen ayrışmış, analitik derişimi 0,020 mol/L. Su katkısının bu derişime göre ihmal edilebilir olduğu yaklaşımı ve log2≈0,3010 veriliyor. pOH ve pH?",
        strategy: "OH derişiminden pOH; sonra 25 °C toplamı.",
        steps: [
          {
            label: "İyon",
            explanation: "KOH başına bir OH⁻; [OH⁻]≈2×10⁻² M.",
          },
          {
            label: "pOH",
            explanation: "pOH=2−log2≈1,6990.",
          },
          {
            label: "pH",
            explanation: "pH=14−1,6990=12,3010. H₃O⁺≈10⁻¹⁴/0,020=5×10⁻¹³ M.",
          },
        ],
        answer: "pOH≈1,6990; pH≈12,3010.",
        check:
          "OH katkısı 10⁻⁷ M su ölçeğinden çok büyüktür; belirtilen yaklaşım uygundur.",
        pitfall:
          "0,020 M değerini mol miktarı sanıp hacim verilmeden bir daha bölmek.",
      },
    ],
    recall: [
      {
        prompt: "Otoiyonlaşmada korunacak atom ve yükler?",
        answer: "2H₂O ⇌ H₃O⁺+OH⁻; iki O, dört H ve toplam sıfır yük korunur.",
      },
      {
        prompt: "Nötr pH'ın sıcaklığa uygun bağıntısı?",
        answer:
          "H₃O⁺=OH⁻ ve pH=pKw/2; 7 sayısı yalnız verilen 25 °C/Kw örneğine aittir.",
      },
      {
        prompt: "Eşlenik asit-baz çifti nasıl ayrılır?",
        answer:
          "Bir H⁺ ve ona bağlı bir yük birimi farkıyla; örneğin NH₄⁺/NH₃.",
      },
      {
        prompt: "Çok seyreltik kuvvetli asitte hangi iki denklik birlikte?",
        answer: "H−OH=analitik asit derişimi ve H·OH=Kw; su katkısı atılmaz.",
      },
    ],
    items: [
      [
        "25 °C'de ideal derişim yaklaşımında [H₃O⁺]=1,0×10⁻⁴ M ve Kw=1,0×10⁻¹⁴. [OH⁻] ve pH hangisidir?",
        "10⁻¹⁰ M ve 4",
        ["10⁻⁴ M ve 10", "10⁻⁷ M ve 7", "10⁻¹⁴ M ve 14", "0 M ve 0"],
        "Karşı iyon çarpımını ve negatif logaritmayı ayrı bul.",
        "OH⁻=10⁻¹⁴/10⁻⁴=10⁻¹⁰ M. pH=−log10⁻⁴=4; pOH 10 olup toplam 14'tür. Asidik çözeltide OH⁻ yok olmaz.",
      ],
      [
        "80 °C'de saf suya ait Kw=9,0×10⁻¹⁴ verilmiş, başka çözünen yok. H₃O⁺ ve OH⁻ için doğru yorum?",
        "İkisi de 3,0×10⁻⁷ M; su nötrdür",
        [
          "H₃O⁺=9,0×10⁻¹⁴ M; OH⁻ yok",
          "İkisi de zorunlu 10⁻⁷ M; sıcaklık önemsiz",
          "H₃O⁺ daha büyük olduğu için kesin asidik",
          "OH⁻=9 M olduğundan kuvvetli baz",
        ],
        "Saf suda yük eşitliği gerekir.",
        "Nötrlük iyonların eşitliğidir. Eşit iki derişimin çarpımı 9×10⁻¹⁴ ise her biri karekökten 3×10⁻⁷ M çıkar. pH'ın 25 °C sınırından farklı olması tek başına asitlik değildir.",
      ],
      [
        "25 °C'de 10⁻⁸ M tam ayrışmış HCl için yalnız pH=8 hesabı yapılıyor. Kw=10⁻¹⁴ ve başka tür yok. Bu hesapta hangi katkı eksik?",
        "Suyun kendi iyonlaşması ve elektriksel denklik",
        [
          "Klor atomlarının mutlaka metal olması",
          "HCl'nin derişiminin her zaman 1 M olması",
          "Gazların 22,4 L kaplaması",
          "pH'ın bütün sıcaklıklarda hacim birimi olması",
        ],
        "H−OH=c ve H·OH=Kw birlikte sağlanmalı.",
        "Bu kadar seyrek asit katkısında H'yi yalnız c'ye eşitlemek uygun değildir. Su katkısıyla pozitif kök H≈1,051×10⁻⁷ M, pH≈6,978 verir; bazik sonuç oluşmaz.",
      ],
      [
        "NH₃+H₂O ⇌ NH₄⁺+OH⁻ denkleminde Brønsted-Lowry eşlenik çift hangisidir?",
        "NH₄⁺ ve NH₃",
        ["NH₃ ve OH⁻", "NH₄⁺ ve OH⁻", "H₂O ve NH₃", "NH₄⁺ ve H₂O"],
        "Aynı atom iskeletinde bir H⁺ farkı ara.",
        "NH₄⁺ bir proton verdiğinde NH₃ olur; yük +1'den 0'a iner. H₂O/OH⁻ diğer çifttir. Farklı atom iskeletindeki gelişigüzel iki tür eşlenik değildir.",
      ],
      [
        "NH₃+H₂O ⇌ NH₄⁺+OH⁻ tepkimesinin ileri yönünde H₂O'nun rolü nedir?",
        "NH₃'e proton veren asit",
        [
          "Elektron çekirdeğini ikiye bölen baz",
          "OH⁻ aldığı için yalnız tuz",
          "Hiçbir atomu değişmeyen inert gaz",
          "Yalnız toplam gaz basıncı ölçeri",
        ],
        "NH₃'ün NH₄⁺ olması için H⁺ kaynağını izle.",
        "Su proton verince OH⁻ olur; bu yönde Brønsted-Lowry asididir. NH₃ proton alarak baz rolündedir. Bir türün rolünü etkileştiği eş ve yönle birlikte belirtmek gerekir.",
      ],
      [
        "25 °C'de pH=5 ve pH=3 olan iki çözeltinin ölçümleri ideal derişim yaklaşımıyla yorumlanıyor. İkinci çözeltinin H₃O⁺ derişimi birincinin kaç katıdır?",
        "100",
        ["2", "3/5", "10", "1/100"],
        "İki pH birimi on üzeri iki çarpanıdır.",
        "Derişimler sırasıyla 10⁻⁵ ve 10⁻³ M'dir. Oran 10⁻³/10⁻⁵=10²=100 çıkar. pH sayılarının farkını doğrudan derişim oranı sanamayız.",
      ],
      [
        "25 °C'de bir çözeltide pOH=2,30 ve Kw=10⁻¹⁴ verilmiş. pH nedir?",
        "11,70",
        ["2,30", "7,00", "16,30", "0,023"],
        "Aynı sıcaklığın pKw toplamını kullan.",
        "pH+pOH=14 olduğu için pH=14−2,30=11,70 bulunur. Burada 14 sayısını kullanmayı sağlayan verilen 25 °C ve Kw koşuludur.",
      ],
      [
        "Aynı sıcaklıkta farklı iki asit çözeltisinin yalnız pH değerleri biliniyor; başlangıç derişimleri ve asit türleri verilmemiş. Hangi sonuç kesin kurulamaz?",
        "Asitlerin kendi kuvvet sıralaması",
        [
          "İdeal modelde hangi çözeltinin H₃O⁺ derişiminin daha büyük olduğu",
          "Aynı pH farkının logaritmik derişim oranı",
          "Verilen pH sayılarının sayısal karşılaştırması",
          "pH'ın H₃O⁺ için kullanılan bir logaritmik ölçü olduğu",
        ],
        "Çözelti asitliğiyle maddenin denge eğilimini ayır.",
        "pH mevcut çözeltideki H₃O⁺ ile ilgilidir. Derişik zayıf ve seyrek kuvvetli asit farklı sonuçlar verebildiğinden, bilinmeyen analitik derişimlerle madde kuvveti tek başına sıralanamaz.",
      ],
      [
        "NH₃ suda NH₃+H₂O ⇌ NH₄⁺+OH⁻ tepkimesini veriyor. Formülünde OH yazmaması hakkında doğru yorum?",
        "Bazik çözelti oluşmasını engellemez; OH⁻ suyla etkileşimden doğar",
        [
          "Suda mutlaka hiç iyon bulunmadığını kanıtlar",
          "NH₃'ün zorunlu kuvvetli asit olduğunu gösterir",
          "NH₃'ün bu tepkimede proton vermesini gerektirir",
          "Bütün bazların metal hidroksit olması şarttır",
        ],
        "Tepkimede oluşan iyon ile başlangıç formülünü ayır.",
        "İleri yönde NH₃ proton alır ve su OH⁻ bırakır. Bu nedenle formülde hazır OH grubu olması sulu ortamda bazik katkının zorunlu koşulu değildir.",
      ],
      [
        "NH₃ ortaklanmamış bir elektron çiftini BF₃'e vererek bağ oluşturuyor; bu olayda proton aktarımı yok. Lewis tanımına göre hangisi doğrudur?",
        "NH₃ baz, BF₃ asittir",
        [
          "NH₃ asit, BF₃ bazdır",
          "Proton yoksa Lewis tanımı uygulanamaz",
          "İkisi de zorunlu nötr tuzdur",
          "Elektron çiftini veren her tür yalnız inert gazdır",
        ],
        "Lewis tanımı elektron çifti vereni baz sayar.",
        "Verilen olayda çift NH₃'ten BF₃'e gider; NH₃ verici baz, BF₃ alıcı asittir. Bu daha geniş tanımda ayrıca H⁺ aktarımı aranmaz.",
      ],
    ],
    source:
      "MEBİ AYT Kimya PDF 76–80; OGM Cepte PDF 16–17, Su Otoiyonizasyonu sunu PDF 2–18, Sulu Denge video notu PDF 2–6 ve Aurelia TYT 049 gerçek içerikleriyle karşılaştırılmış özgün öğretim ve sorular. Sıcaklık, seyreltiklik, eşlenik çift ve ideal etkinlik koşulları açık tutulur; resmî sınav sorusu değildir.",
  },
  {
    id: "ayt-zayif-asit-baz-tampon",
    topic: "detail-432",
    title: "Zayıf asit-baz ve tampon çözeltiler",
    minutes: 65,
    objectives: [
      "Kavramı tür, miktar ve denge bağıntısıyla açıkla.",
      "Önce madde miktarını, sonra uygun dengeyi kur.",
      "Yaklaşımı sonucun koşullarıyla denetle.",
    ],
    sections: [
      {
        title: "Çözünmek ve iyonlaşmak iki ayrı adımdır",
        paragraphs: [
          "Bir HA asidi suda çözündüğünde çözeltide HA(aq) molekülleri bulunabilir. Bunların bir bölümü suya proton aktarır: HA+H₂O ⇌ H₃O⁺+A⁻. İyonlaşmamış HA, çözünmeyen katı değildir; aynı sulu fazdaki moleküler türdür.",
          "Zayıflık, belirli çözücü ve sıcaklıkta proton aktarım dengesinin konumunu anlatır. Madde yeterince çözünmüş olsa da küçük bir bölümü iyonlaşabilir. Molar derişim, çözünen toplam asit ailesini; serbest H₃O⁺ derişimi ise bu ailenin ve suyun dengesini birlikte yansıtır.",
        ],
      },
      {
        title: "Ka bağıntısını denklemin anlamından kur",
        paragraphs: [
          "Seyreltik ideal derişim yaklaşımında Ka=[H₃O⁺][A⁻]/[HA] yazılır; çözücü suyun etkinliği bu sabitin tanımına alınır. Paydaki iki derişimin birlikte artması ve kalan HA'nın azalması denge kesrini büyütür. Aynı asit için sabit sıcaklıkta bu oran Ka'ya döner.",
          "Önce tepkimeyi doğru yazmak gerekir: çok protonlu asidin farklı proton verme basamaklarının ayrı Ka değerleri vardır. Bir çözeltiye eşlenik baz eklemek denge derişimlerini değiştirir; aynı sıcaklıkta asidin Ka'sını değiştirmez. Deneysel Ka etkinliklerle tanımlanır; burada sayısal örnekler belirtilen derişim yaklaşımındadır.",
        ],
      },
      {
        title: "Başlangıç, değişim ve denge tablosu",
        paragraphs: [
          "Yalnız HA eklenmiş, başlangıç analitik derişimi C olan bir çözeltide sudan gelen H₃O⁺ katkısı ihmal edilebiliyorsa iyonlaşmaya x M diyebiliriz. Denge satırı HA için C−x, A⁻ ve H₃O⁺ için x olur. Böylece Ka=x²/(C−x) bağıntısı kurulur.",
          "Bu eşitliği x²+Ka·x−Ka·C=0 biçiminde çözmek, varsayımla gereksiz hataya düşmeyi önler. Pozitif kökün çıkarma hatasına dayanıklı biçimi x=2KaC/[Ka+√(Ka²+4KaC)] olur. Kökün 0 ile C arasında olması ve yerine konunca aynı Ka'yı vermesi iki ayrı denetimdir.",
        ],
      },
      {
        title: "Küçük x yaklaşımı bir varsayımdır",
        paragraphs: [
          "x, C yanında yeterince küçükse C−x yaklaşık C alınır ve x≈√(KaC) bulunur. Bu yöntem çoğu okul örneğini hızlandırır; asidin adından dolayı otomatik olarak geçerli olmaz. Önce yaklaşık x hesaplanır, sonra x/C oranı değerlendirilir.",
          "Örneğin yüzde 5 kuralı bir pratik hata ölçütüdür, doğanın keskin sınırı değildir. Çok seyreltik çözeltilerde x/C büyüyebilir; ayrıca su iyonları önem kazanabilir. Böyle bir durumda hem aile toplamı [HA]+[A⁻]=C hem yük denkliği [H₃O⁺]=[A⁻]+[OH⁻] hem Kw birlikte çözülür.",
        ],
      },
      {
        title: "İyonlaşma yüzdesi ve seyreltme",
        paragraphs: [
          "İyonlaşma kesri α=x/C, iyonlaşma yüzdesi 100α'dır. Bu sayı bir molar derişim değildir; başlangıç asit ailesinin hangi payının iyonik biçimde bulunduğunu gösterir. Ka küçükken bile yeterli seyreltme iyonlaşma yüzdesini artırabilir.",
          "Aynı sıcaklıkta yalnız su eklenirse analitik C azalır. Yüzde artarken serbest H₃O⁺ derişimi genellikle azalabilir; bu iki cümle çelişmez çünkü biri oran, diğeri hacim başına miktardır. Çok seyreltilmiş sınırda su katkısını ihmal eden √(KaC) kestirimi nötr sınırı aşacak biçimde kullanılmaz.",
        ],
      },
      {
        title: "NH₃ üzerinden zayıf baz dengesi",
        paragraphs: [
          "NH₃+H₂O ⇌ NH₄⁺+OH⁻ tepkimesinde baz, sudan proton alır. Kb=[NH₄⁺][OH⁻]/[NH₃] olur. Başlangıçta yalnız çözünmüş NH₃ varsa ve su katkısı küçükse x²/(C−x)=Kb kurulur; bulunan x, OH⁻ derişimidir.",
          "Önce pOH=−log[OH⁻], sonra aynı sıcaklığın pKw değeri kullanılarak pH=pKw−pOH hesaplanır. Bir bazın formülünde OH grubu bulunması zorunlu değildir. Çözünürlüğün büyük olması da Kb'nin büyük olmasıyla aynı özellik değildir.",
        ],
      },
      {
        title: "Eşlenik asit ve bazın sabitlerini bağla",
        paragraphs: [
          "HA'nın proton vermesi Ka, A⁻'nın sudan proton alması Kb ile anlatılır. Bu iki tepkime toplanınca suyun iyonlaşma dengesi kalır; aynı sıcaklıkta ve aynı ortamda eşlenik çift için Ka(HA)·Kb(A⁻)=Kw elde edilir.",
          "Örneğin 25 °C'de asetik asit için Ka=1,8×10⁻⁵ verilirse asetatın Kb değeri 10⁻¹⁴/(1,8×10⁻⁵) olur. Rastgele seçilen bir asidin Ka'sı ile başka bir bazın Kb'si çarpılmaz. Büyük Ka, onun eşlenik bazının küçük Kb'siyle birlikte düşünülür.",
        ],
      },
      {
        title: "Tamponun iki bileşeni ne iş yapar?",
        paragraphs: [
          "Zayıf HA ile onun çözünür tuzu NaA birlikte yeterli miktarda bulunursa HA proton alan ek bazı, A⁻ ise ek asidi tüketebilir. Ek H₃O⁺ için A⁻+H₃O⁺→HA+H₂O; ek OH⁻ için HA+OH⁻→A⁻+H₂O dönüşümleri yazılır.",
          "Bu yüzden tamponda hem proton verebilen hem alabilen bir eşlenik çift bulunur. Sadece zayıf asit çözeltisine tampon denmez. Eklenen miktar sınırlı kaldığı sürece pH değişimi saf suya göre daha küçük olabilir; tamponun görevi pH'ı matematiksel olarak hiç değiştirmemek değildir.",
        ],
      },
      {
        title: "Önce güçlü türün mol hesabını yap",
        paragraphs: [
          "Tampona belirli mol HCl eklendiğinde önce aynı mol A⁻ tüketilip HA oluşur; NaOH eklendiğinde ise HA tüketilip A⁻ oluşur. Başlangıç hacimleri farklıysa cV ile mol bulmak derişimleri doğrudan toplamaktan daha güvenlidir.",
          "Bu stokiyometrik ara tablo, hızlı güçlü asit-baz tüketiminin hesabıdır. Son durumda türler yeniden dengeye gelir; ara tablodaki değerler son denge değerlerine yaklaşım olabilir. Bir bileşen bütünüyle tükenirse tampon bağıntısı zorlanmaz; artan güçlü tür ve kalan zayıf aile birlikte ele alınır.",
        ],
      },
      {
        title: "Orandan pH'a: Henderson–Hasselbalch",
        paragraphs: [
          "Ka=[H₃O⁺][A⁻]/[HA] bağıntısının logaritması pH=pKa+log([A⁻]/[HA]) verir. Bu biçim gerçek denge derişimleriyle, ideal derişim yaklaşımında aynı bağıntının yeniden yazılışıdır. Mol oranını kullanmak için iki türün aynı son hacimde bulunması gerekir.",
          "Pratik tampon hesabında güçlü tür tüketiminden kalan mol oranı kullanılır; bu ek bir yaklaşım içerir. [A⁻]=[HA] ise pH≈pKa olur. Oran 10 ise pH yaklaşık bir birim yüksek, 0,1 ise bir birim düşüktür; logaritmik ilişki değişimin yönünü hemen gösterir.",
        ],
      },
      {
        title: "Kapasite, oran ve seyreltme",
        paragraphs: [
          "Aynı HA/A⁻ oranına sahip iki tamponun yaklaşık pH'ları aynı olabilir; fakat daha çok toplam mol içeren tampon daha çok ek asit veya bazı tüketebilir. Kapasiteyi yalnız pH sayısından okuyamayız. Bir bileşenin çok az olduğu uç oranlarda o yöndeki koruma sınırlıdır.",
          "Yalnız su eklenince her iki bileşen aynı oranda seyrelir; uygun aralıkta oran ve yaklaşık pH fazla değişmeyebilir. Bununla birlikte kapasite hacim başına azalır; çok seyreltikte su katkısı ve etkinlik değişimleri önem kazanır. Modelde son hacim ayrı bir girdi, eklenen güçlü türün molü ayrı girdidir.",
        ],
      },
      {
        title: "Bir yöntemi nasıl seçersin?",
        paragraphs: [
          "Önce çözeltiye hangi ailelerin ve güçlü iyonların eklendiğini yaz; varsa hızlı güçlü asit-baz tüketimini mol ile tamamla. Sonra yalnız güçlü artan, yalnız zayıf tür, eşlenik çift veya tam yük dengesi seçeneklerinden uygun olanı seç. Her adım farklı kimyasal soruyu yanıtlar.",
          "Sonucun sağlamasını toplam aile ve elektriksel yük ile yap. HA ile A⁻ toplamı kaybolmamalı; ek Na⁺ ve Cl⁻ gibi seyirciler yük bütçesinde yer almalı. Keşif modelinde pH, bu bütçe ile Ka ve Kw'nin birlikte çözülmesinden gelir; gösterilen tampon kestirimi bu tam hesapla karşılaştırılır.",
        ],
      },
    ],
    examples: [
      {
        title: "Zayıf asitte pozitif kök",
        prompt:
          "25 °C'de C=0,100 M HA, Ka=1,0×10⁻⁵. Su katkısının küçük olduğu doğrulanacak; x=[H₃O⁺]. Ka=x²/(C−x). pH ve iyonlaşma yüzdesi?",
        strategy: "Önce tam ikinci dereceyi, sonra yaklaşım kontrolünü yap.",
        steps: [
          {
            label: "Adım 1",
            explanation: "x=2KaC/[Ka+√(Ka²+4KaC)]≈9,95012×10⁻⁴ M.",
          },
          {
            label: "Adım 2",
            explanation: "pH=−log x≈3,00217; 100x/C≈%0,995.",
          },
          {
            label: "Adım 3",
            explanation:
              "OH⁻=10⁻¹⁴/x≈1,01×10⁻¹¹ M; H₃O⁺ yanında küçüktür. √(KaC)=0,001 M kestirimi de yakındır.",
          },
        ],
        answer: "pH yaklaşık 3,002; yaklaşık %0,995 iyonlaşma.",
        check: "x<C ve x²/(C−x)=10⁻⁵.",
        pitfall: "İyonlaşmamış HA'yı çökelmiş katı saymak.",
      },
      {
        title: "Eşit bileşenli tampon",
        prompt:
          "25 °C'de 1,00 L son çözeltide 0,100 mol HA ve 0,100 mol NaA var. Ka=10⁻⁵. Tampon mol-oranı yaklaşımı geçerli kabul ediliyor. pH?",
        strategy: "Eşlenik çiftin oranını kullan.",
        steps: [
          {
            label: "Adım 1",
            explanation: "pKa=−log10⁻⁵=5.",
          },
          {
            label: "Adım 2",
            explanation:
              "A⁻/HA mol oranı 0,100/0,100=1; aynı son hacim sadeleşir.",
          },
          {
            label: "Adım 3",
            explanation:
              "pH≈5+log1=5. Bu bir mol-oranı tampon kestirimidir; tam yük dengesi küçük bir fark verebilir.",
          },
        ],
        answer: "Yaklaşık pH 5.",
        check:
          "HA/A⁻ oranını ters yazsan bile eşitlikte log1=0 kalır; eşit olmayan örnekle yönü ayrıca denetle.",
        pitfall: "NaA'yı güçlü bir asit gibi saymak.",
      },
      {
        title: "Tampona asit ekleme",
        prompt:
          "25 °C'de 0,100 mol HA ve 0,100 mol A⁻ içeren tampona 0,0200 mol HCl ekleniyor. Son hacim 1,00 L, pKa=5. Tampon mol-oranı yaklaşımı geçerli. log(2/3)=−0,17609. pH?",
        strategy: "Önce tüketim, sonra logaritma.",
        steps: [
          {
            label: "Adım 1",
            explanation: "H₃O⁺+A⁻→HA+H₂O; 0,0200 mol A⁻ tüketilir.",
          },
          {
            label: "Adım 2",
            explanation:
              "Ara mol tablosu A⁻=0,0800, HA=0,1200 mol. Her iki bileşen vardır.",
          },
          {
            label: "Adım 3",
            explanation: "pH≈5+log(0,0800/0,1200)=4,82391.",
          },
        ],
        answer: "pH yaklaşık 4,824; azalmıştır.",
        check: "Toplam asit ailesi 0,200 mol kalır.",
        pitfall:
          "Ek HCl'yi tüketilmemiş serbest H₃O⁺ gibi doğrudan son hacme bölmek.",
      },
      {
        title: "Tampon kapasitesi tükendiğinde",
        prompt:
          "0,0200 mol HA ve 0,0100 mol NaA bulunan çözeltiye 0,0300 mol NaOH ekleniyor. Son hacim 1,00 L ve 25 °C; güçlü baz artığının zayıf dengeye baskın olduğu kabul ediliyor. Kw=10⁻¹⁴. pH yaklaşık kaçtır?",
        strategy: "Asit stoğunun sınırını açıkça bul.",
        steps: [
          {
            label: "Adım 1",
            explanation: "NaOH önce 0,0200 mol HA tüketir, A⁻ oluşturur.",
          },
          {
            label: "Adım 2",
            explanation:
              "0,0100 mol güçlü OH⁻ artar; son [OH⁻]≈0,0100 M. Mol-oranı tampon kestirimi kullanılmaz.",
          },
          {
            label: "Adım 3",
            explanation: "pOH≈2 ve pH≈14−2=12.",
          },
        ],
        answer: "Yaklaşık pH 12; tampon çifti ara tabloda kalmamıştır.",
        check:
          "Eklenen 0,0300 mol bazın 0,0200 molü tüketildi, 0,0100 molü arttı.",
        pitfall:
          "Paydası sıfır olmuş HA ile Henderson bağıntısına sayı zorlamak.",
      },
    ],
    recall: [
      {
        prompt: "Zayıf asit çözeltisinde HA(aq) nedir?",
        answer:
          "Çözünmüş fakat henüz iyonlaşmamış asit türüdür; zorunlu olarak çözünmeyen madde değildir.",
      },
      {
        prompt: "Ka·Kb=Kw hangi çift içindir?",
        answer: "Aynı sıcaklık ve ortamda bir asit ile onun eşlenik bazı için.",
      },
      {
        prompt: "Tampona eklenen güçlü tür için ilk işlem?",
        answer:
          "Önce mol cinsinden hangi tampon bileşenini ne kadar tükettiğini bulmak.",
      },
      {
        prompt: "Aynı pH neden aynı kapasite değildir?",
        answer:
          "Oran aynı olsa bile toplam tampon molü farklı olabilir; tükenebilen stok değişir.",
      },
    ],
    items: [
      [
        "HA+H₂O ⇌ H₃O⁺+A⁻ dengesinde HA(aq) gösterimi hangisini anlatır?",
        "Çözünmüş, iyonlaşmamış asit moleküllerini",
        [
          "Yalnız kabın dibindeki katıyı",
          "Gaz hâlindeki asidi",
          "Bütün HA'nın kesin iyonlaştığını",
          "Yalnız OH⁻ iyonlarını",
        ],
        "Faz gösterimini proton aktarımından ayır.",
        "(aq) sulu fazı belirtir. HA molekülleri çözünmüş olabilirken yalnız bir bölümü A⁻ ve H₃O⁺ oluşturur; çözünme ile iyonlaşma farklıdır.",
      ],
      [
        "C=0,100 M HA, Ka=10⁻⁵; su katkısı ihmal ediliyor. x≪C yaklaşımıyla x=[H₃O⁺] yaklaşık kaç M?",
        "1,0×10⁻³",
        ["1,0×10⁻⁵", "1,0×10⁻¹", "1,0×10⁻⁶", "1,0×10⁻²"],
        "Ka≈x²/C.",
        "x≈√(10⁻⁵×0,100)=√10⁻⁶=10⁻³ M. x/C=%1 olduğundan küçük x kestirimi makuldür; tam kök biraz daha küçüktür.",
      ],
      [
        "Aynı sıcaklıkta yalnız zayıf HA çözeltisine su ekleniyor; su katkısının henüz ihmal edilebildiği aralıkta iyonlaşma yüzdesi artarken [H₃O⁺] azalıyor. Bu durum?",
        "Oran ile hacim başına miktarın farklı olmasıyla uyumludur",
        [
          "Ka'nın zorunlu büyüdüğünü kanıtlar",
          "Asidin zorunlu kuvvetli olduğunu gösterir",
          "Kütle korunmasına aykırıdır",
          "HA'nın artık çözünmediğini kanıtlar",
        ],
        "α=x/C ile x ayrı niceliklerdir.",
        "Seyreltmede C azalır. x≈√(KaC) azalırken x/C≈√(Ka/C) artabilir. Aynı sıcaklıkta Ka sabit kalır; yüzde artışı derişim artışı değildir.",
      ],
      [
        "25 °C'de HA için Ka=2,0×10⁻⁵, Kw=1,0×10⁻¹⁴. Eşlenik A⁻ için Kb?",
        "5,0×10⁻¹⁰",
        ["2,0×10⁻¹⁹", "2,0×10⁹", "5,0×10⁻⁶", "1,0×10⁻⁷"],
        "Aynı çiftin sabitleri çarpımı Kw.",
        "Kb=Kw/Ka=10⁻¹⁴/(2×10⁻⁵)=5×10⁻¹⁰. Bu ilişki rastgele iki asit-baza değil eşlenik çifte uygulanır.",
      ],
      [
        "NH₃+H₂O ⇌ NH₄⁺+OH⁻ için doğru Kb ifadesi, su çözücü etkinliği sabite alınmışken hangisidir?",
        "[NH₄⁺][OH⁻]/[NH₃]",
        ["[NH₃]/([NH₄⁺][OH⁻])", "[H₃O⁺][NH₃]", "[NH₄⁺]−[OH⁻]", "[NH₃]+[H₂O]"],
        "Ürünlerin derişimlerini paya, gireninkini paydaya yerleştir.",
        "İyonlaşma yönünde ürünlerin derişimleri çarpımı paya, kalan NH₃ paydaya yazılır. Sıvı çözücü suyun etkinliği burada Kb tanımının içindedir.",
      ],
      [
        "Bir tampona 0,030 mol HCl ekleniyor. Önce 0,100 mol HA ve 0,080 mol A⁻ vardır; başka tüketici yok. Güçlü asit tüketiminden hemen sonraki ara mol tablosu?",
        "HA 0,130 mol; A⁻ 0,050 mol",
        [
          "HA 0,070; A⁻ 0,110 mol",
          "HA 0,100; A⁻ 0,080 mol",
          "HA 0,030; A⁻ 0,030 mol",
          "HA 0,180; A⁻ 0 mol",
        ],
        "Ek proton A⁻ tarafından alınır.",
        "A⁻+H₃O⁺→HA+H₂O olduğundan 0,030 mol A⁻ azalır, HA aynı kadar artar. Aile toplamı 0,180 mol korunur; bu ara tablo sonrası yeniden denge kurulur.",
      ],
      [
        "pKa=5 olan HA/A⁻ tamponunda geçerli mol-oranı yaklaşımıyla A⁻/HA=10. pH yaklaşık?",
        "6",
        ["4", "5", "10", "1"],
        "log10=1.",
        "pH≈pKa+log(A⁻/HA)=5+1=6. Eşlenik baz payı büyüdüğü için aynı asit ailesinde pH, pKa'nın üstündedir.",
      ],
      [
        "Aynı hacimde iki HA/A⁻ tamponunun oranları eşit, ikinci tamponun her bileşeninin molü ilkinin iki katı. Yaklaşık pH ve asit tüketme stoğu için doğru yorum?",
        "pH benzer; ikinci tamponun A⁻ stoğu iki kat",
        [
          "pH iki kat; stok aynı",
          "pH aynıysa her kapasite kesin aynıdır",
          "İkinci tamponda Ka iki kat",
          "İlk tampon güçlü asit olmak zorundadır",
        ],
        "Oran ile toplam molü ayrı değerlendir.",
        "Henderson kestiriminde oran aynı olduğundan pH benzerdir. Ek asidi tüketen A⁻ molü ikinci kapta iki kattır; yalnız pH toplam stoğu söylemez.",
      ],
      [
        "0,010 mol HA ve 0,010 mol A⁻ üzerine 0,030 mol NaOH ekleniyor; başka asit yok. Hangi yöntem uygundur?",
        "Önce HA tüketimini ve artan güçlü OH⁻ miktarını bulmak",
        [
          "HA sıfırken aynı tampon oranını zorlamak",
          "NaOH'nin tamamını yok saymak",
          "Ka'yı 3 ile çarpmak",
          "A⁻'yi kesin çökelti kabul etmek",
        ],
        "Ek baz HA stoğundan büyük.",
        "HA 0,010 mol OH⁻ tüketir; 0,020 mol güçlü baz artar. Ara tabloda iki tampon bileşeni kalmadığından başlangıç oranıyla tampon pH hesabı yapılamaz.",
      ],
      [
        "Tampon çözeltisi için hangi ifade doğrudur?",
        "Sınırlı ek asit veya baza karşı pH değişimine direnç gösterir",
        [
          "Her miktar asitte pH kesin sabittir",
          "Yalnız kuvvetli asit içermek yeterlidir",
          "Her seyreltmede kapasite sonsuz artar",
          "Bir bileşenin tükenmesi hiçbir hesabı etkilemez",
        ],
        "Tamponun bileşenleri sonlu mol içerir.",
        "Tampon pH değişimini azaltabilir; bileşen oranı değiştiğinde pH da değişir. Yeterli doz bir bileşeni tüketebilir, bu nedenle kapasite sonludur.",
      ],
    ],
    source:
      "MEBİ AYT Kimya PDF 78–81; OGM Dersler Cepte PDF 21–23; Sulu Çözelti Dengeleri sunusu PDF 2–22 ve video notu PDF 8–14. Anlatım, hesaplar ve sorular özgündür; tampon kestirimi tam denge hesabından ayrılır.",
  },
  {
    id: "ayt-hidroliz",
    topic: "detail-433",
    title: "Tuzlarda hidroliz ve pH",
    minutes: 65,
    objectives: [
      "Kavramı tür, miktar ve denge bağıntısıyla açıkla.",
      "Önce madde miktarını, sonra uygun dengeyi kur.",
      "Yaklaşımı sonucun koşullarıyla denetle.",
    ],
    sections: [
      {
        title: "Tuz çözündüğünde ne oluşur?",
        paragraphs: [
          "Bir iyonik tuzun suda çözünmesi, kristaldeki iyonların suyla çevrilerek çözeltide dağılmasını sağlar. Örneğin NaCH₃COO çözündüğünde Na⁺ ve CH₃COO⁻ oluşur. Formül birimi başına iyon sayısını belirlemek, sonraki asit-baz hesabının ilk adımıdır.",
          "Çözünme tek başına suyla proton alışverişi demek değildir. Hidroliz diye adlandırılan asit-baz basamağında bir iyon suyla tepkimeye girip H₃O⁺ veya OH⁻ oluşumunu etkiler. Bu iki adımı ayrı yazınca tuzun çözünmesi ile çözeltinin pH'ı karıştırılmaz.",
        ],
      },
      {
        title: "Güçlü asit ve bazdan gelen seyirci iyonlar",
        paragraphs: [
          "NaCl için Na⁺ ve Cl⁻, bu sulu ve seyreltik okul modelinde belirgin proton aktarımı oluşturmaz. Su kendi iyonlaşma dengesini korur; 25 °C ve Kw=10⁻¹⁴ iken ideal çözeltide H₃O⁺ ile OH⁻ derişimleri eşit ve pH 7 olur.",
          "Bu sonuç bütün tuzların nötr olduğunun kanıtı değildir. Tuzun iyonlarını tanıyıp her birinin eşlenik asit-baz davranışını incelemek gerekir. Aynı şekilde iyonik güç ve etkinlik gibi gerçek çözelti etkileri bu ideal hesap kapsamından ayrılır.",
        ],
      },
      {
        title: "Asetat sudan proton alır",
        paragraphs: [
          "CH₃COO⁻+H₂O ⇌ CH₃COOH+OH⁻ tepkimesinde asetat bir bazdır. OH⁻ derişimi nötr sudakinden artar; yük denkliğinde Na⁺ seyirci katyonunun miktarı da yer alır. Oluşan asetik asit, çözünen toplam asetat ailesinin küçük bir bölümü olabilir.",
          "Asetatın Kb değeri, aynı sıcaklıkta asetik asidin Ka'sından Kw/Ka ile bulunur. Böylece hidroliz yeni ve bağımsız bir ezber değil, önceki eşlenik çift bilgisinin uygulamasıdır. Asetat çözeltisinin pH'ını hesaplarken Ka'yı doğrudan OH⁻ denklemine koymayız.",
        ],
      },
      {
        title: "Amonyum suya proton verir",
        paragraphs: [
          "NH₄⁺+H₂O ⇌ NH₃+H₃O⁺ tepkimesinde amonyum eşlenik asittir. NH₄Cl çözeltisinde Cl⁻ bu modelde seyirci kalırken amonyumun proton aktarımı H₃O⁺ derişimini artırır. Bu nedenle uygun derişimde çözelti asidiktir.",
          "NH₄⁺ için Ka=Kw/Kb(NH₃) kullanılır. NH₄⁺, NH₃'ün eşlenik asidi olduğu için mutlaka kuvvetli asit değildir; NH₃ zayıf bazının sayısal Kb'si bunu gösterir. Pozitif yüklü olmak tek başına asit kuvvetinin ölçüsü değildir.",
        ],
      },
      {
        title: "Yaklaşık pH hesabının iskeleti",
        paragraphs: [
          "Yalnız zayıf asit gibi davranan katyon veya zayıf baz gibi davranan anyon varsa, hidrolize uğrayan toplam derişimi C ile gösteririz. Su katkısı ve tüketilen pay küçükse x≈√(K·C) kestirimi kurulabilir. K burada ilgili iyonun proton aktarım sabitidir.",
          "Asetatta x yaklaşık OH⁻, amonyumda yaklaşık H₃O⁺ derişimidir. İkinci derece çözüm ve yük denkliği gerektiğinde yaklaşımın yerini alır. Aynı C ve aynı küçük sabit büyüklüğü, H ve OH için birbirine karşılık gelen asidik ve bazik örnekler oluşturabilir.",
        ],
      },
      {
        title: "İki iyon da zayıf olduğunda",
        paragraphs: [
          "NH₄CH₃COO çözeltisinde hem NH₄⁺ proton verebilir hem CH₃COO⁻ proton alabilir. Asidik ve bazik katkılar birlikte değerlendirilir; yalnız tuzun adındaki bir iyon seçilmez. İdeal eş mol ailelerde Ka(NH₄⁺) ile Kb(CH₃COO⁻) karşılaştırılabilir.",
          "Buradaki verilen örnekte Ka(CH₃COOH)=Kb(NH₃)=1,8×10⁻⁵ olduğundan iki iyonun karşılık gelen hidroliz sabitleri eşittir. Yük ve aile denklikleri pH 7 verir; yine de iki ailenin bir bölümü farklı protonlanma biçimindedir. Nötr pH, hiç proton alışverişi olmadığı anlamına gelmez.",
        ],
      },
      {
        title: "Kütle ve yük iki ayrı denetimdir",
        paragraphs: [
          "Asetat ailesinde [CH₃COO⁻]+[CH₃COOH]=C; amonyum ailesinde [NH₄⁺]+[NH₃]=C yazılır. Bu toplamlar türlerin aralarında dönüşmesini izler. Toplam analitik derişim ile yalnız yüklü türün derişimi aynı olmak zorunda değildir.",
          "Elektriksel denklikte her iyonun yük sayısı hesaba katılır: H₃O⁺ ve Na⁺ gibi artı yükler, OH⁻ ve asetat gibi eksi yüklerle dengelenir. Makroskopik çözeltinin asidik olması toplam elektrik yükünün pozitif olduğu anlamına gelmez. Fazla H₃O⁺ uygun karşı iyonlarla dengelenir.",
        ],
      },
      {
        title: "Yapısında H bulunması yeterli değildir",
        paragraphs: [
          "HCO₃⁻ proton verip CO₃²⁻ olabilir; proton alıp H₂CO₃ ailesine de geçebilir. Böyle türlere amfiprotik denir. Davranışı yalnız formülde H var diye asidik etiketlemek yerine iki yöndeki sabitlerle düşünürüz.",
          "Örneğin karbonik asit ailesinde Ka₁ ve Ka₂ farklı basamakları anlatır; HCO₃⁻ için bazlık sabiti Kw/Ka₁, asitlik sabiti Ka₂ olur. Uygun ideal koşullarda amfiprotik türün pH'ı yaklaşık (pKa₁+pKa₂)/2 ile kestirilebilir. Bu bağıntının öncülleri yokken her hidrojenli tuza uygulanmaz.",
        ],
      },
      {
        title: "Hidratlı metal katyonları",
        paragraphs: [
          "Bazı küçük ve yüksek yüklü metal katyonları çevrelerindeki su moleküllerini güçlü biçimde etkiler. Örneğin [Al(H₂O)₆]³⁺ içindeki bağlı su proton verebilir; bir hidroksi ligandı ve H₃O⁺ oluşur. Asitlik, metal atomunun kendi üzerinde H taşımasını gerektirmez.",
          "Bu yüzden tüm metal tuzlarına aynı nötr kuralı uygulanmaz. Sayısal hesap için ilgili hidratlı iyonun denge sabiti, derişimi ve olası çökelme gibi başka süreçlerin koşulları verilmelidir. Bu ünitenin dört tuzlu modeli metal komplekslerinin ayrıntılı kimyasını çözmez.",
        ],
      },
      {
        title: "Seyreltmenin etkisini oranla anlat",
        paragraphs: [
          "Zayıf hidroliz yapan bir iyonun çözeltisine su eklenince analitik derişim azalır. Uygun aralıkta hidrolize uğrayan yüzde artabilir; buna rağmen pH nötr değere yaklaşabilir. Yüzde ile hacim başına H₃O⁺ veya OH⁻ miktarı farklı niceliklerdir.",
          "Çok seyreltik sınırda suyun iyonları önem kazanır. Bu nedenle model, bir iyonun hidroliz kökünü suyun Kw'si ve yük bütçesiyle birlikte bulur. C=0 seçildiğinde kapta belirtilen tuz yoktur; çıkan sonuç yalnız suya aittir.",
        ],
      },
      {
        title: "Tuzun kaynağını nasıl kullanırsın?",
        paragraphs: [
          "Tuzu oluşturan asit ve bazın kuvveti, hangi iyonların proton alışverişi yapabileceğini belirlemek için bir başlangıç haritasıdır. Güçlü asit-zayıf baz tuzunda çoğu basit örnek asidik katyon, zayıf asit-güçlü baz tuzunda bazik anyon verir. İki zayıf eş varsa sabitler karşılaştırılır.",
          "Bu haritayı katı adlandırma oyunu olarak kullanma; her iyonun gerçek tepkimesini ve sabitini yaz. Çok yüklü metaller, çok protonlu aileler, sınırlı çözünürlük veya kompleksleşme ek denge gerektirebilir. Anlatımdaki açık varsayımlar, yöntemin nerede işe yaradığını gösterir.",
        ],
      },
      {
        title: "Bir pH sonucunun anlamı",
        paragraphs: [
          "pH, çözelti içindeki H₃O⁺ etkinliğini ideal yaklaşımda derişimle temsil eder. Tuz çözündükten sonra ana iyonun büyük çoğunluğu aynı kalsa bile küçük hidroliz payı pH'ı belirgin değiştirebilir. Bu nedenle pH değişimini tüm tuzun başka maddeye dönüştüğü biçiminde yorumlamayız.",
          "Karşılaştırıcıda iyon ailesi, H₃O⁺, OH⁻ ve elektriksel denklik birlikte gösterilir. Aynı nötr pH'a sahip NaCl ile amonyum asetatın tür dağılımları aynı değildir. Tek sayı benzerliği, mikroskobik mekanizmaların özdeş olduğunu kanıtlamaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Asetatta bazik hidroliz",
        prompt:
          "25 °C, 0,100 M NaCH₃COO. Ka(CH₃COOH)=1,8×10⁻⁵, Kw=10⁻¹⁴. Küçük hidroliz ve ideal derişim yaklaşımı geçerli. log7,45=0,872. pH yaklaşık?",
        strategy: "Önce anyonun Kb değerini bul.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Kb=Kw/Ka=5,56×10⁻¹⁰.",
          },
          {
            label: "Adım 2",
            explanation:
              "[OH⁻]≈√(KbC)=7,45×10⁻⁶ M; tüketilen pay yaklaşık %0,00745.",
          },
          {
            label: "Adım 3",
            explanation: "pOH≈5,128; pH≈8,872.",
          },
        ],
        answer: "pH yaklaşık 8,87.",
        check: "OH⁻ nötr sudaki 10⁻⁷ M değerinden büyüktür; anyon bazdır.",
        pitfall: "Asetik asidin Ka'sını doğrudan OH⁻ bağıntısına koymak.",
      },
      {
        title: "Amonyumda asidik hidroliz",
        prompt:
          "25 °C, 0,100 M NH₄Cl. Kb(NH₃)=1,8×10⁻⁵, Kw=10⁻¹⁴. Küçük hidroliz yaklaşımı geçerli; log7,45=0,872. pH yaklaşık?",
        strategy: "Katyon için asit tepkimesi kur.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Ka(NH₄⁺)=10⁻¹⁴/(1,8×10⁻⁵)=5,56×10⁻¹⁰.",
          },
          {
            label: "Adım 2",
            explanation: "[H₃O⁺]≈√(KaC)=7,45×10⁻⁶ M.",
          },
          {
            label: "Adım 3",
            explanation:
              "pH≈5,128; OH⁻≈1,34×10⁻⁹ M olup H₃O⁺ yanında küçüktür.",
          },
        ],
        answer: "pH yaklaşık 5,13.",
        check:
          "Çözeltinin yükü sıfır kalır; Cl⁻ karşı iyonunu unutmamak gerekir.",
        pitfall: "NH₄⁺'yı kuvvetli asit sayıp [H₃O⁺]=0,100 M almak.",
      },
      {
        title: "Nötr ama iki aile etkin",
        prompt:
          "25 °C'de eşit analitik derişimli NH₄CH₃COO çözeltisi. Ka(CH₃COOH)=Kb(NH₃)=1,8×10⁻⁵, Kw=10⁻¹⁴; ideal model ve başka denge yok. pH ve mekanizma?",
        strategy: "İki hidroliz sabitini karşılaştır.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Ka(NH₄⁺)=Kw/Kb(NH₃)=5,56×10⁻¹⁰.",
          },
          {
            label: "Adım 2",
            explanation:
              "Kb(CH₃COO⁻)=Kw/Ka(CH₃COOH)=5,56×10⁻¹⁰; eşit aile miktarlarında etkiler dengelenir.",
          },
          {
            label: "Adım 3",
            explanation:
              "Tam aile ve yük denklikleri [H₃O⁺]=[OH⁻]=10⁻⁷ M çözümünü verir; her iki ailede protonlanma dönüşümü vardır.",
          },
        ],
        answer: "pH 7; hidroliz yok değildir.",
        check:
          "Amonyumdan NH₃ oluşan pay ile asetattan HA oluşan pay eşit yük dengesini sağlar.",
        pitfall: "pH 7 gördüğünde her iyonun seyirci olduğunu söylemek.",
      },
      {
        title: "Amfiprotik anyon",
        prompt:
          "25 °C'de HCO₃⁻ için Ka₂=4,7×10⁻¹¹; H₂CO₃ ailesi için Ka₁=4,3×10⁻⁷ ve Kw=10⁻¹⁴ verilmiştir. Başka süreç yok. HCO₃⁻'nın bazlık mı asitlik mi sabiti büyüktür?",
        strategy: "Aynı türün iki yönünü karşılaştır.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Asitlik sabiti HCO₃⁻→CO₃²⁻ için 4,7×10⁻¹¹.",
          },
          {
            label: "Adım 2",
            explanation: "Bazlık sabiti HCO₃⁻→H₂CO₃ için Kw/Ka₁≈2,33×10⁻⁸.",
          },
          {
            label: "Adım 3",
            explanation:
              "Kb/Ka≈495; bu koşullarda bazlık yönü daha güçlüdür, formülde H bulunması tek başına asidiklik değildir.",
          },
        ],
        answer: "Bazlık sabiti yaklaşık 495 kat daha büyüktür.",
        check:
          "Karşılaştırma aynı sıcaklıkta, aynı HCO₃⁻ türünün iki yönü içindir.",
        pitfall: "Ka₁'i HCO₃⁻'nın proton verme sabiti sanmak.",
      },
    ],
    recall: [
      {
        prompt: "Çözünme ile hidroliz farkı?",
        answer:
          "Çözünme iyonları sulu faza dağıtır; hidroliz basamağı iyon ile su arasında proton aktarımıdır.",
      },
      {
        prompt: "NH₄Cl neden asidik olabilir?",
        answer:
          "NH₄⁺ suya proton verir; Ka=Kw/Kb(NH₃). Cl⁻ belirtilen modelde seyircidir.",
      },
      {
        prompt: "Nötr pH hidroliz yok demek mi?",
        answer:
          "Hayır. Eşit karşı etkiler bulunan iki zayıf iyonlu bir tuz da nötr pH verebilir.",
      },
      {
        prompt: "HCO₃⁻ neden yalnız H sayısıyla etiketlenmez?",
        answer:
          "Hem proton alabilir hem verebilir; iki yönün sabitleri karşılaştırılır.",
      },
    ],
    items: [
      [
        "NaCH₃COO suda çözündükten sonra bazik hidrolizi anlatan net tepkime hangisi?",
        "CH₃COO⁻+H₂O ⇌ CH₃COOH+OH⁻",
        [
          "Na⁺+H₂O→NaOH+H⁺",
          "CH₃COOH→Na⁺+Cl⁻",
          "CH₃COO⁻→yalnız katı",
          "Na⁺+Cl⁻→NH₃",
        ],
        "Asetatın proton almasını izle.",
        "Asetat sudan proton alırken su OH⁻ bırakır. Na⁺ bu ideal modelde proton aktarımında seyirci kalır; çözünme tepkimesi ile hidroliz ayrı basamaklardır.",
      ],
      [
        "25 °C'de NH₃ için Kb=2,0×10⁻⁵ ve Kw=10⁻¹⁴. NH₄⁺ için Ka kaçtır?",
        "5,0×10⁻¹⁰",
        ["2,0×10⁻¹⁹", "5,0×10⁻⁵", "2,0×10⁹", "10⁻⁷"],
        "Eşlenik çiftin çarpımını kullan.",
        "NH₄⁺, NH₃'ün eşlenik asididir. Ka=Kw/Kb=10⁻¹⁴/(2×10⁻⁵)=5×10⁻¹⁰; katyon olması onu kuvvetli asit yapmaz.",
      ],
      [
        "25 °C'de 0,10 M NaCl; iyonların proton aktarımı ve etkinlik etkileri ihmal, Kw=10⁻¹⁴. Beklenen pH?",
        "7",
        ["1", "13", "0", "14"],
        "Bu iki iyon verilen modelde seyirci.",
        "Na⁺ ve Cl⁻ proton aktarımı oluşturmadığı varsayımıyla su için H₃O⁺=OH⁻=10⁻⁷ M bulunur. Sonuç bu modelin koşulları içindir, bütün tuzların genellemesi değildir.",
      ],
      [
        "NH₄⁺+H₂O ⇌ NH₃+H₃O⁺ tepkimesinde NH₄⁺'nın rolü?",
        "Proton veren eşlenik asit",
        [
          "Elektron veren metal",
          "Proton alan kuvvetli baz",
          "Hiç değişmeyen seyirci",
          "Çökelme ürünü",
        ],
        "H sayısı ve yük değişimini izle.",
        "NH₄⁺ bir proton kaybederek NH₃ olur, su proton alıp H₃O⁺ olur. Bu asit-baz aktarımı redoks veya metal çözünmesi değildir.",
      ],
      [
        "İdeal NaA çözeltisinde A⁻ zayıf HA'nın eşlenik bazı. Ka(HA)=10⁻⁵, Kw=10⁻¹⁴, C=0,10 M. Küçük hidroliz yaklaşımıyla [OH⁻] yaklaşık?",
        "1,0×10⁻⁵ M",
        ["1,0×10⁻³ M", "1,0×10⁻⁷ M", "1,0×10⁻⁹ M", "0,10 M"],
        "Önce Kb=Kw/Ka, sonra karekök.",
        "Kb=10⁻⁹; OH⁻≈√(10⁻⁹×0,10)=10⁻⁵ M. Kullanılan sabit A⁻'nın Kb'sidir; ana asidin Ka'sı doğrudan konmaz.",
      ],
      [
        "Eş mol NH₄⁺ ve CH₃COO⁻ aileli ideal çözeltide Ka(NH₄⁺)=Kb(CH₃COO⁻); 25 °C. Nötr pH bulunması neyi gösterir?",
        "Asidik ve bazik etkiler dengelenebilir; iki aile de dönüşebilir",
        [
          "Hiçbir iyon suyla tepkimeye giremez",
          "Her tuz çözeltisi nötrdür",
          "Tuz artık çözünmemiştir",
          "H₃O⁺ ve OH⁻ ikisi de yoktur",
        ],
        "Sonuç sayısını mekanizma ile özdeşleme.",
        "İki hidroliz katkısı eşit koşullarda yük dengesini nötr pH'ta sağlayabilir. Bu, protonlanmış ve protonlanmamış türler arasında hiç dönüşüm olmadığı anlamına gelmez.",
      ],
      [
        "HCO₃⁻ hem H₂CO₃ hem CO₃²⁻ türüne dönüşebiliyor. Doğru yaklaşım hangisi?",
        "Proton alma ve verme sabitlerini ayrı karşılaştırmak",
        [
          "H içerdiği için yalnız asit saymak",
          "Eksi yüklü diye hiçbir zaman asit olamaz demek",
          "Her iki yönde aynı Ka'yı koşulsuz kullanmak",
          "Yük denkliğini kaldırmak",
        ],
        "İki yönde de bir proton değişiyor.",
        "HCO₃⁻ amfiprotiktir. Proton verme için ikinci basamak Ka, proton alma için önceki asidin Ka'sından türetilen Kb kullanılır; formül tek başına baskınlığı belirlemez.",
      ],
      [
        "Suda [Al(H₂O)₆]³⁺ bağlı su üzerinden proton verebiliyor. Bu hangi düşünceyi destekler?",
        "Hidratlı metal iyonu bağlı suyu etkileyerek asitlik oluşturabilir",
        [
          "Her metal iyonu aynı kuvvette bazdır",
          "Metal çekirdeği H⁺'a dönüşür",
          "Asitlik için serbest metal atomunda H bulunması zorunludur",
          "Bütün çözünmüş iyonlar seyircidir",
        ],
        "Protonu hangi ligandın verdiğini bul.",
        "Hidratlı iyonun su ligandı proton kaybedebilir. Proton metal çekirdeğinden gelmez; sayısal denge için bu kompleksin koşulları ve sabiti gerekir.",
      ],
      [
        "0,10 M asetat ailesinde denge sonunda [HA]=0,001 M ölçülüyor, başka aile tepkimesi yok. [A⁻] kaç M?",
        "0,099 M",
        ["0,101 M", "0,100 M", "0,001 M", "0,010 M"],
        "Aile toplamı korunur.",
        "[HA]+[A⁻]=0,100 M olduğundan A⁻=0,100−0,001=0,099 M. Yük hesabı ayrıca Na⁺, H₃O⁺ ve OH⁻'yi içerir; aile korunumu ile yük denkliği farklı denetimlerdir.",
      ],
      [
        "Bir ideal hidroliz modelinde tuzun analitik derişimi sıfıra ayarlanıyor; kapta yalnız su ve 25 °C, Kw=10⁻¹⁴ var. Doğru yorum?",
        "Tuz iyonu yoktur; suyun pH'ı 7 olur",
        [
          "Seçili tuz adı yüzünden pH mutlaka 1 kalır",
          "Suda H₃O⁺ kesin sıfırdır",
          "Negatif iyon derişimi oluşur",
          "C=0 iken sonsuz tuz vardır",
        ],
        "Seçilen tür adı ile gerçek miktarı ayır.",
        "Analitik miktar sıfırsa seçilmiş tuz çözeltide bulunmaz. Su kendi iyonlaşmasıyla 10⁻⁷ M H₃O⁺ ve OH⁻ verir; bir etiket gerçek stok yaratmaz.",
      ],
    ],
    source:
      "MEBİ AYT Kimya PDF 81–82; OGM Dersler Cepte PDF 21–23; Sulu Çözelti Dengeleri sunusu PDF 4–6,20–24; video notu PDF 15–16. Özgün açıklama ve sorular; amfiprotik tür ve hidratlı metal koşulları ayrı anlatılır.",
  },
  {
    id: "ayt-notrallesme",
    topic: "detail-434",
    title: "Nötralleşmede miktar, yük ve son pH",
    minutes: 65,
    objectives: [
      "Kavramı tür, miktar ve denge bağıntısıyla açıkla.",
      "Önce madde miktarını, sonra uygun dengeyi kur.",
      "Yaklaşımı sonucun koşullarıyla denetle.",
    ],
    sections: [
      {
        title: "Nötralleşme proton aktarımıdır",
        paragraphs: [
          "Sulu kuvvetli asit ile kuvvetli bazın net tepkimesi H₃O⁺+OH⁻→2H₂O biçiminde yazılabilir. H⁺ kısaltması kullanılırsa H⁺+OH⁻→H₂O olur. İki gösterim aynı proton aktarımını anlatır; birinde hidronyumun taşıdığı çözücü su da açık yazılmıştır.",
          "Denklem yazımına göre görünen toplam su katsayısını, kalorimetri için tanımlanan net oluşan su miktarıyla karıştırmayız. H⁺/OH⁻ eşdeğerleri üzerinden tüketilen bir mol çift, verilen klasik molar nötrleşme ısısı tanımında bir mol net su oluşumuna karşılık gelir. Hidronyum yazımındaki iki suyu kullanıp enerjiyi iki kat saymayız.",
        ],
      },
      {
        title: "Moleküler, tam iyon ve net iyon",
        paragraphs: [
          "2HCl+Ba(OH)₂→BaCl₂+2H₂O moleküler denkleminde katsayılar yük ve atomları korur. HCl ve Ba(OH)₂ tamamen çözünmüş ve güçlü kabul edildiğinde giren çözeltiler H⁺, Cl⁻, Ba²⁺ ve OH⁻ olarak açılır. Ba²⁺ ile Cl⁻ burada seyirci iyonlardır.",
          "İki tarafta değişmeden kalan seyirciler sadeleşince H⁺+OH⁻→H₂O net denklemi elde edilir. Seyirci demek çözeltiden yok oldular demek değildir. Son hacimde onların derişimleri ve elektriksel yük katkıları hâlâ bulunur; pH hesabının sağlamasında kullanılır.",
        ],
      },
      {
        title: "Molü ve eşdeğeri ayır",
        paragraphs: [
          "Bir mol HCl bu modelde bir mol H⁺ eşdeğeri, bir mol Ba(OH)₂ iki mol OH⁻ eşdeğeri sağlar. Bu yüzden eşdeğerlik şartı n(HCl)=2n(Ba(OH)₂) olur. Asit molekülünün molünü baz molekülünün molüne her durumda bire bir eşitlemek hatalıdır.",
          "Hangi protonların veya OH gruplarının ilgili tepkimede kullanılabildiği açık denklemden okunur. Çok protonlu asitlerde basamaklı nötrleşme mümkündür; bütün protonların aynı kuvvette olduğu varsayılmaz. Buradaki sayısal model, tamamen çözünmüş HCl ve Ba(OH)₂ için verilen iki OH katsayısını kullanır.",
        ],
      },
      {
        title: "Derişimden miktara geç",
        paragraphs: [
          "Çözelti miktarı n=cV ile bulunur; c mol/L ise hacim litreye çevrilir. Örneğin 0,100 M HCl'nin 100 mL'si 0,0100 mol HCl içerir. Aynı molar derişimde 50 mL Ba(OH)₂ ise 0,00500 mol baz ve 0,0100 mol OH⁻ eşdeğeri verir.",
          "Karıştırmadan önce mol hesaplamak, farklı hacimlerin derişimlerini doğrudan toplamayı önler. İki çözelti eşit molarite taşısa bile sağladıkları H⁺ ve OH⁻ eşdeğerleri hacme ve katsayıya bağlıdır. Son pH için başlangıç derişimleri değil karıştırma sonrası kalan miktar gerekir.",
        ],
      },
      {
        title: "Sınırlayıcı eşdeğer ve artan tür",
        paragraphs: [
          "Başlangıç H⁺ ve OH⁻ eşdeğerlerini iki ayrı stok olarak düşünürüz. Küçük olan stok tüketimin sınırını belirler; tüketilen mol min(nH,nOH), artan fark ise son güçlü türü belirler. Reaktiflerden biri tamamen biterken diğeri artabilir.",
          "Örneğin 0,0100 mol H⁺ ve 0,0120 mol OH⁻ karışırsa net 0,0100 mol su oluşur, 0,00200 mol baz eşdeğeri artar. Bu fark, başlangıçta bazın kaç molekül olduğundan ayrı bir ölçüdür. Son OH⁻ derişimi için bu farkı son çözelti hacmine böleriz.",
        ],
      },
      {
        title: "Son hacim ve serbest iyon",
        paragraphs: [
          "Bu derste çözelti hacimleri toplamsal kabul edilir; gerçek karışımlarda hacim değişimi ayrıca verilebilir. 100 mL asit ile 60 mL baz karışımı böylece 160 mL=0,160 L olur. Başlangıç asit hacmine bölmek son derişimi yanlış büyütür.",
          "Analitik güçlü artık d=[H₃O⁺]−[OH⁻] biçiminde yük farkını verir. Çok büyük artıkta küçük karşı iyon ihmal edilebilir; çok küçük farkta suyun Kw'si de çözülmelidir. Model pozitif kökü kullanır; eşdeğerlikte H₃O⁺ veya OH⁻ sıfır olmaz.",
        ],
      },
      {
        title: "Eşdeğerlikte su dengesi",
        paragraphs: [
          "25 °C'de güçlü HCl ile güçlü Ba(OH)₂ tam eşdeğer karıştığında ve başka hidroliz olmadığı varsayımında H₃O⁺=OH⁻=10⁻⁷ M olur. Nötr pH 7 bu açık sıcaklık ve tür koşullarına bağlıdır. Eşdeğerlik, eklenen proton ve baz eşdeğerlerinin eşit olmasıdır.",
          "Çok küçük ondalık makine artıkları kimyasal olarak fazla asit diye sunulmaz; ölçü ve katsayı hesabı esas alınır. Buna karşı gerçek küçük bir asit fazlası da keyfi olarak silinmez. Matematiksel modelin sayısal denetimi ile deneyin ölçüm belirsizliği farklı konulardır.",
        ],
      },
      {
        title: "Yük bütçesini kontrol et",
        paragraphs: [
          "HCl ve Ba(OH)₂ sisteminde son çözeltinin pozitif yük yoğunluğu [H₃O⁺]+2[Ba²⁺], negatif yük yoğunluğu [OH⁻]+[Cl⁻] olur. Toplamlar eşit olmalıdır. Ba²⁺'nın iki yükü olduğu için yalnız iyon adedini karşılaştırmak yeterli değildir.",
          "Bu denetim eksik katsayıyı veya unutulmuş seyirci iyonu yakalar. Çözelti bazik olsa bile toplam elektrik yükü sıfır kalır. Bazik sözcüğü OH⁻ derişiminin H₃O⁺'dan büyük olmasını anlatır; bütün eksi yüklerin artı yüklerden fazla olduğunu değil.",
        ],
      },
      {
        title: "Nötrleşme ısısını ayrı hesapla",
        paragraphs: [
          "Sabit basınçta, yalnız basınç-hacim işi koşulunda verilen molar tepkime entalpisi kullanılarak qP=n·ΔH yazılır. Seyreltik güçlü asit-güçlü baz için bu ünitede −57,3 kJ/mol net su açık veri olarak verilir. Isı miktarı tüketilen eşdeğerle bulunur.",
          "Negatif işaret tepkime sisteminin enerji verdiğini gösterir; çevre bu enerji kadar ısı alabilir. Isı kaybı ve çözelti ısı kapasitesi verilmeden sıcaklık artışı hesaplanmaz. Zayıf türün iyonlaşma enerjisi ek katkı verebileceğinden verilen molar ısı her asit-baza koşulsuz taşınmaz.",
        ],
      },
      {
        title: "Zayıf türde eşdeğerlik neden farklıdır?",
        paragraphs: [
          "HA+OH⁻→A⁻+H₂O ile zayıf asit tamamen stokiyometrik olarak tüketilirse son ortamda eşlenik baz A⁻ bulunur. A⁻ suyla hidroliz yapabilir; bu yüzden eşdeğerliğin pH'ı 25 °C'de 7'den büyük olabilir. HCl ile NH₃ eşdeğer karışımında NH₄⁺ asidik katkı verebilir.",
          "Dolayısıyla nötralleşme tepkimesi gerçekleşmesi, eşdeğerlik ve nötr pH üç ayrı bilgidir. Önce stoğu ve katsayıyı, sonra kalan zayıf türün dengesini kurarız. Çok basamaklı ve birden çok aileli çözeltilerde tek bir cV eşitliği pH'ı tek başına belirlemez.",
        ],
      },
      {
        title: "Redoks ile karıştırma",
        paragraphs: [
          "HCl ile NaOH arasındaki proton aktarımında türlerin yükseltgenme basamakları değişmez. Asidin metal ile H₂ oluşturması ise elektron aktarımı da içerebilir; her asitli tepkime net H⁺+OH⁻ değildir. Önce gerçek toplam denklemi incelemek gerekir.",
          "Benzer biçimde karbonatla asit tepkimesi gaz çıkışı ve su oluşumu içerebilir. Bu ünite modeli gaz kaybı, kompleksleşme veya çökelme olmayan açık HCl–Ba(OH)₂ sistemiyle sınırlıdır. Başka kimya eklenecekse ilgili madde ve yük denklikleri de eklenmelidir.",
        ],
      },
      {
        title: "Ters problemden çözelti tasarımına",
        paragraphs: [
          "Bilinmeyen derişim veya gereken baz hacmi, denklemin eşdeğerlik şartından bulunabilir. Verilen HCl molünü sağlanacak OH⁻ eşdeğerine eşitleyip bazın katsayısını ve molaritesini kullanırız. İstenen pH için ise eşdeğerlikten farklı, açık artık miktarı gerekebilir.",
          "Çözümü sonunda geri yerine koy: hesaplanan hacim hangi mol bazı, kaç mol OH⁻ ve hangi toplam hacmi veriyor? Artan farkın işareti hedef asidik veya bazik yönle uyumlu olmalıdır. Bu son kontrol, formül ezberinden daha genel bir yöntem kazandırır.",
        ],
      },
    ],
    examples: [
      {
        title: "İki OH ile tam eşdeğerlik",
        prompt:
          "25 °C'de 100 mL 0,100 M HCl ile 50 mL tamamen çözünmüş 0,100 M Ba(OH)₂ karıştırılıyor. Hacimler toplamsal, başka denge yok; Kw=10⁻¹⁴. Son pH ve net oluşan su molü?",
        strategy: "H⁺ ve OH⁻ eşdeğerlerini say.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "nH=0,100×0,100=0,0100 mol. nOH=2×0,100×0,0500=0,0100 mol.",
          },
          {
            label: "Adım 2",
            explanation:
              "İki güçlü stok eşittir; net oluşan su 0,0100 mol, son hacim 0,150 L.",
          },
          {
            label: "Adım 3",
            explanation:
              "Seyirciler hidroliz yapmıyorsa H₃O⁺=OH⁻=10⁻⁷ M; pH=7.",
          },
        ],
        answer: "pH 7 ve 0,0100 mol net su.",
        check: "Ba²⁺=0,005/0,150; Cl⁻=0,010/0,150. 2[Ba²⁺]=[Cl⁻].",
        pitfall: "Bir mol Ba(OH)₂'den tek OH eşdeğeri saymak.",
      },
      {
        title: "Eşdeğerliği geçmek",
        prompt:
          "25 °C'de 100 mL 0,100 M HCl ile 60 mL 0,100 M tamamen çözünmüş Ba(OH)₂. Hacimler toplamsal; güçlü artık baskın, log1,25=0,09691. Son pH yaklaşık?",
        strategy: "Artan eşdeğeri toplam hacme böl.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "nH=0,0100 mol; nOH=0,0120 mol. Baz fazlası 0,00200 mol.",
          },
          {
            label: "Adım 2",
            explanation: "Vson=0,160 L; [OH⁻]≈0,00200/0,160=0,0125 M.",
          },
          {
            label: "Adım 3",
            explanation: "pOH≈1,90309; pH≈12,09691.",
          },
        ],
        answer: "Yaklaşık pH 12,097.",
        check:
          "Baz fazla olduğundan pH 7'den büyüktür; son hacim 100 mL değildir.",
        pitfall: "Artan baz molekülü molünü doğrudan OH⁻ molü kabul etmek.",
      },
      {
        title: "Bilinmeyen baz hacmi",
        prompt:
          "30,0 mL 0,200 M HCl, tamamen çözünmüş 0,0500 M Ba(OH)₂ ile eşdeğerlenecek. Başka proton tüketicisi yok. Kaç mL baz gerekir?",
        strategy: "Denklemin iki OH katsayısını ters hesapta koru.",
        steps: [
          {
            label: "Adım 1",
            explanation: "Asit 0,0300×0,200=0,00600 mol H⁺ sağlar.",
          },
          {
            label: "Adım 2",
            explanation: "Gereken Ba(OH)₂=0,00600/2=0,00300 mol.",
          },
          {
            label: "Adım 3",
            explanation: "Vbaz=n/c=0,00300/0,0500=0,0600 L=60,0 mL.",
          },
        ],
        answer: "60,0 mL baz.",
        check: "2×0,0500×0,0600=0,00600 mol OH⁻.",
        pitfall: "Molariteler eşit değilken yalnız hacimleri eşitlemek.",
      },
      {
        title: "Isı ve pH aynı hesap değildir",
        prompt:
          "Sabit basınçta yalnız PV işi koşulunda 0,0100 mol güçlü H⁺ ile 0,0120 mol OH⁻ tepkimeye giriyor. Verilen ΔH=−57,3 kJ/mol net su. Başka ısıl süreç ihmal. Tepkime ısısı?",
        strategy: "Isıyı sınırlayıcı çift miktarından bul.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "H⁺ sınırlayıcıdır; 0,0100 mol çift tüketilir ve bu tanımda 0,0100 mol net su oluşur.",
          },
          {
            label: "Adım 2",
            explanation: "qP=0,0100×(−57,3)=−0,573 kJ.",
          },
          {
            label: "Adım 3",
            explanation:
              "0,00200 mol OH⁻ artması ayrı pH hesabına gider; bu artığı oluşan suya eklemeyiz.",
          },
        ],
        answer: "Sistem için qP=−0,573 kJ.",
        check:
          "Çevreye aktarılan enerji büyüklüğü, belirtilen ideal ısıl koşullarda 0,573 kJ olur.",
        pitfall: "Başlangıçtaki tüm OH⁻ molüyle ısıyı çarpmak.",
      },
    ],
    recall: [
      {
        prompt: "Ba(OH)₂ için eşdeğerlik nasıl yazılır?",
        answer: "Tam çözünmüş güçlü modelde n(HCl)=2n(Ba(OH)₂).",
      },
      {
        prompt: "Artan güçlü tür derişiminde hangi hacim kullanılır?",
        answer: "Belirtilen karıştırma sonrası toplam çözelti hacmi.",
      },
      {
        prompt: "Nötralleşme ve pH 7 aynı mı?",
        answer:
          "Hayır; eşdeğerlikte kalan zayıf iyonlar hidroliz yapabilir, sıcaklık da nötr pH'ı değiştirir.",
      },
      {
        prompt: "Seyirci iyon neden kaybolmaz?",
        answer:
          "Net tepkimede sadeleşse de çözeltide miktarı ve yük katkısı sürer.",
      },
    ],
    items: [
      [
        "Tam çözünmüş 0,010 mol Ba(OH)₂, güçlü baz modelinde kaç mol OH⁻ eşdeğeri sağlar?",
        "0,020 mol",
        ["0,010 mol", "0,005 mol", "0,030 mol", "0 mol"],
        "Formüldeki OH sayısını kullan.",
        "Ba(OH)₂ başına iki OH⁻ vardır; 2×0,010=0,020 mol OH⁻ eşdeğeri. Ba²⁺ yükünün iki olması da aynı iyonlaşma hesabıyla uyumludur.",
      ],
      [
        "0,012 mol H⁺ ve 0,008 mol OH⁻, H⁺+OH⁻→H₂O ile sınırlayıcı stok bitene kadar tepkimeye giriyor. Güçlü artık?",
        "0,004 mol H⁺",
        ["0,020 mol H⁺", "0,004 mol OH⁻", "0,008 mol H⁺", "Artık yok"],
        "Küçük stok iki taraftan aynı molü tüketir.",
        "0,008 mol çift tüketilir. H⁺ geriye 0,012−0,008=0,004 mol kalır; OH⁻ analitik güçlü stoğu biter. Suyun denge iyonları ayrıca vardır.",
      ],
      [
        "25 °C'de 0,0020 mol OH⁻ güçlü artığı 0,200 L son çözeltide. Su katkısı ihmal edilebilir. pH yaklaşık?",
        "12",
        ["2", "7", "11", "13"],
        "Önce OH⁻ molaritesi, sonra pOH.",
        "[OH⁻]≈0,0020/0,200=0,010 M, pOH≈2 ve 25 °C'de pH≈14−2=12. Başlangıç kap hacmi yerine son hacim kullanılır.",
      ],
      [
        "Güçlü HCl ile tamamen çözünmüş Ba(OH)₂ eşdeğerlik şartı hangisidir?",
        "cHCl·VHCl=2cBa(OH)₂·VBa(OH)₂",
        [
          "2cHCl·VHCl=cBa(OH)₂·VBa(OH)₂",
          "cHCl=cBa(OH)₂ her durumda",
          "VHCl=VBa(OH)₂ her durumda",
          "cHCl+VHCl=2",
        ],
        "Mol ve katsayıyı aynı denklemde buluştur.",
        "HCl bir, Ba(OH)₂ iki eşdeğer verir. cV her çözelti için molü bulur; hacimler aynı uygun birimde kullanıldığında eşitlik sağlanır.",
      ],
      [
        "HCl–Ba(OH)₂ sulu sisteminde son yük denkliği hangisidir?",
        "[H₃O⁺]+2[Ba²⁺]=[OH⁻]+[Cl⁻]",
        [
          "[H₃O⁺]+[Ba²⁺]=2[OH⁻]+[Cl⁻]",
          "[Ba²⁺]=[Cl⁻] her durumda",
          "[H₃O⁺]=0 her durumda",
          "[OH⁻]+[Cl⁻]=0",
        ],
        "Derişimi iyonun yük büyüklüğüyle çarp.",
        "Ba²⁺ başına iki pozitif yük vardır; diğer gösterilen iyonların yük büyüklüğü birdir. Bazik veya asidik çözeltide bile toplam artı ve eksi yükler dengelenir.",
      ],
      [
        "25 °C'de güçlü asit-güçlü baz tam eşdeğer, seyirciler hidroliz yapmıyor, Kw=10⁻¹⁴. Doğru ifade?",
        "H₃O⁺ ve OH⁻ derişimleri 10⁻⁷ M olur",
        [
          "Her iki iyon da kesin sıfır olur",
          "pH zorunlu 0 olur",
          "Çözelti toplam pozitif yüklüdür",
          "Bütün tuz katı olarak çöker",
        ],
        "Suyun iyonlaşması eşdeğerlikte de vardır.",
        "Analitik güçlü artık sıfır olduğunda H₃O⁺=OH⁻ ve çarpımları Kw olur. Karekök 10⁻⁷ M verir; nötr olmak iyonların yokluğu değildir.",
      ],
      [
        "HA zayıf asidi NaOH ile tam stokiyometrik eşdeğerliğe getiriliyor; kalan A⁻ suyla bazik hidroliz yapabiliyor. 25 °C'de son pH için doğru yorum?",
        "7'den büyük olabilir",
        [
          "Her eşdeğerlikte kesin 7'dir",
          "Mutlaka 0'dır",
          "Ka kesin sıfırlanır",
          "A⁻ çözeltiden yok olur",
        ],
        "Stokiyometri sonrasındaki yeni dengeyi düşün.",
        "HA tüketimi A⁻ oluşturur. A⁻+H₂O⇌HA+OH⁻ bazik katkı verir; eşdeğerlik proton-baz mol dengesi olup pH'ın evrensel değeri değildir.",
      ],
      [
        "Sabit basınçta yalnız PV işi; güçlü nötrleşmede 0,020 mol net su oluşuyor. Verilen ΔH=−57,3 kJ/mol su. qP kaç kJ?",
        "−1,146",
        ["+1,146", "−57,3", "−2,865", "0"],
        "Molar ısıyı oluşan net su molüyle çarp.",
        "qP=0,020×(−57,3)=−1,146 kJ. Negatif işaret sistemin enerji verdiğini gösterir; sıcaklık artışı için ayrıca ısı kapasitesi ve ısıl koşullar gerekir.",
      ],
      [
        "2HCl+Ba(OH)₂→BaCl₂+2H₂O toplam denkleminde, verilen tamamen çözünmüş güçlü modelin seyirci iyonları?",
        "Ba²⁺ ve Cl⁻",
        ["H⁺ ve OH⁻", "Yalnız H₂O", "Ba atomu ve Cl₂ gazı", "Yalnız H⁺"],
        "Tam iyon denkleminde değişmeden kalanları bul.",
        "Ba²⁺ ve Cl⁻ her iki tarafta aynı iyon olarak kalır; net proton aktarımında sadeleşir. Bu sadeleşme onların son çözeltide bulunmadığı anlamına gelmez.",
      ],
      [
        "30,0 mL 0,200 M HCl, 0,0500 M tamamen çözünmüş Ba(OH)₂ ile eşdeğerlenecek. Gereken baz hacmi?",
        "60,0 mL",
        ["15,0 mL", "30,0 mL", "120 mL", "6,0 mL"],
        "Gereken baz molekül molü, asit molünün yarısı.",
        "nHCl=0,00600 mol; baz=0,00300 mol. V=0,00300/0,0500=0,0600 L=60,0 mL. İki OH katsayısı ters problemde de korunur.",
      ],
    ],
    source:
      "MEBİ AYT Kimya PDF 81–83; OGM Dersler Cepte PDF 24; Sulu Çözelti Dengeleri sunusu PDF 25–29; video notu PDF 18–20; Aurelia Asit Baz Tepkimeleri kopya kâğıdı PDF 1–7. Denklemler, son hacim, eşdeğer ve enerji koşulları özgün örneklerle öğretilir.",
  },
  {
    id: "ayt-titrasyon",
    topic: "detail-435",
    title: "Titrasyon eğrisi ve eşdeğerlik",
    minutes: 65,
    objectives: [
      "Kavramı tür, miktar ve denge bağıntısıyla açıkla.",
      "Önce madde miktarını, sonra uygun dengeyi kur.",
      "Yaklaşımı sonucun koşullarıyla denetle.",
    ],
    sections: [
      {
        title: "Ölçümün amacı ve iki çözelti",
        paragraphs: [
          "Titrasyonda miktarı veya derişimi araştırılan analit, derişimi bilinen titrantla belirli tepkimeye sokulur. Titrant kontrollü ve ölçülen hacimlerle eklenir. Asit-baz titrasyonunda kullanılan temel bilgi, dengelenmiş tepkimenin proton ve baz eşdeğerleri arasındaki ilişkidir.",
          "Ölçüm bir renk gösterisinden ibaret değildir: analitin alınan hacmi, titrantın molaritesi ve harcanan hacim birlikte miktar hesabı verir. Bilinmeyen örneğin bütün kabı değil alınan temsilî kısmı titre edilmiş olabilir. Seyreltme veya numune alma varsa başlangıç örneğine dönüş hesabı ayrıca yazılır.",
        ],
      },
      {
        title: "Büret, erlen ve hacim farkı",
        paragraphs: [
          "Titrant çoğu düzende bürette, analit ise altında erlen içindedir; karıştırma türlerin temasını sağlar. Büret okuması eklenen toplam hacmi doğrudan sıfırdan başlatmak zorunda değildir. Harcanan hacim, son okuma ile ilk okuma arasındaki farktır.",
          "İndikatör kullanılıyorsa uygun miktarı analit ortamına eklenir; kalıcı renk değişimi bu karışımda gözlenir. Rengin bürette değişmesini beklemek yöntemi ters kurar. Gerçek laboratuvarda menisküs, hava kabarcığı ve damla kontrolü ölçümü etkiler; buradaki model ideal hesaplanmış hacimlerle çalışır.",
        ],
      },
      {
        title: "Eşdeğerlik noktasının tanımı",
        paragraphs: [
          "Stokiyometrik eşdeğerlik, eklenen titrantın analiti belirtilen tepkimeye göre tam karşılayan miktara ulaştığı noktadır. Bir protonlu HA ve bir OH⁻ sağlayan NaOH için nHA=nNaOH olur. İki OH veren baz veya çok basamaklı asitte katsayılar açıkça değişir.",
          "Bu tanım pH değerini önceden 7 olarak seçmez. Hangi tuzun ve hangi zayıf ailelerin kaldığı son pH'ı belirler. Eşdeğerlik hacmi stokiyometriyle, bu hacimdeki pH ise uygun denge hesabıyla bulunur; ikisi farklı sorulardır.",
        ],
      },
      {
        title: "Eğrinin eksenlerini oku",
        paragraphs: [
          "Asit üzerine baz eklenen eğride yatay eksen eklenen baz hacmi, düşey eksen pH'tır. Her noktada farklı bir toplam hacim ve farklı tür dağılımı vardır. Eğri zamana karşı çizilmediyse yataydaki aralığı tepkime hızı olarak okuyamayız.",
          "Etkileşimde 100 mL 0,100 M asit, 0,100 M NaOH ile titre edilir; 100 mL baz eşdeğerlik hacmidir. Aynı hacim ekseninde HCl veya Ka=10⁻⁵ olan HA seçilir. Bu iki eğri aynı asit molünü taşır fakat başlangıç ve eşdeğerlik pH'ları farklı olabilir.",
        ],
      },
      {
        title: "Kuvvetli asitte eşdeğerlik öncesi",
        paragraphs: [
          "HCl tamamen iyonlaşmış kabul edildiğinde eklenen OH⁻ güçlü H⁺ stoğunu azaltır. Eşdeğerlik öncesinde nH−nOH pozitif kalır; bu fark son hacme bölünür. Belirgin asit fazlasında pH yaklaşık bu derişimin negatif logaritmasıdır.",
          "Eşdeğerliğe çok yaklaşıldığında fark su iyonlarıyla aynı ölçekte olabilir. Bu nedenle gerçek model [H₃O⁺]−[OH⁻]=d ve [H₃O⁺][OH⁻]=Kw denklemlerini birlikte kullanır. Eşdeğerlikte hesaplanan pH sonlu ve süreklidir; log0 biçiminde tanımsız bırakılmaz.",
        ],
      },
      {
        title: "Zayıf asitte tampon bölgesi",
        paragraphs: [
          "HA üzerine baz eklenince HA azalırken eşlenik A⁻ oluşur. Eşdeğerlikten önce iki tür yeterli miktarda kaldığı bölgede tampon davranışı ortaya çıkar. Başlangıçta yalnız HA varken bu iki bileşenli tampon henüz aynı biçimde bulunmaz.",
          "Bu bölgede pH≈pKa+log(nA/nHA) kestirimi eğrinin yönünü açıklar. İki mol de ek bazın tüketim hesabından bulunur; son hacim oran içinde sadeleşir. Tam model aynı aile toplamı, Na⁺ miktarı, Ka ve Kw ile pH'ı hesaplar; kestirim ile tam sonuç eşit olmak zorunda değildir.",
        ],
      },
      {
        title: "Yarı eşdeğerlik ne söyler?",
        paragraphs: [
          "Bir protonlu zayıf HA'nın ideal titrasyonunda eşdeğerlik hacminin yarısında, stokiyometrik ara tabloda HA ve A⁻ miktarları eşittir. Uygun tampon yaklaşımıyla pH≈pKa bulunur. Böylece eğrinin bu noktası asidin kuvveti hakkında bilgi verir.",
          "Bu ilişki, her eğrinin yarı hacminde pH 7 demek değildir. Tam denge derişimleri su katkısı ve küçük iyonlaşma düzeltmeleri nedeniyle ara mol tablosundan az farklı olabilir. Model bu yüzden yarı noktada pH'ı yaklaşık 5 veren kestirimi, gerçek kökle bulunan 5,00026 gibi değerlerden ayırır.",
        ],
      },
      {
        title: "Zayıf asidin eşdeğerliği",
        paragraphs: [
          "HA stoğu bazla tam karşılandığında çözeltide ağırlıkla A⁻ ve Na⁺ bulunur. A⁻ suyla proton alarak az miktar HA ve OH⁻ oluşturur; eşdeğerlik pH'ı uygun koşullarda 7'den büyüktür. Buradaki HA için Kb(A⁻)=Kw/Ka=10⁻⁹ olur.",
          "Son A⁻ ailesinin analitik derişimi başlangıç HA molünün toplam hacme bölünmesiyle bulunur. İlk 100 mL'yi kullanmak bu noktadaki derişimi iki kat yapar. Eşdeğerlik pH'ı, titrantın güçlü olması kadar oluşan eşlenik türün davranışına da bağlıdır.",
        ],
      },
      {
        title: "Eşdeğerlik sonrası güçlü artık",
        paragraphs: [
          "Yeterli baz eklendikten sonra ek OH⁻, artık tüketilebilecek asit eşdeğerini aşar. Fazla mol baz son toplam hacme bölünür. Büyük güçlü artıkta pH, zayıf asidin başlangıç Ka'sından çok bu OH⁻ derişimiyle belirlenir.",
          "Yine de çok küçük artıkta ve hassas hesapta tam denge kullanılır. Eğrinin sağ tarafındaki pH artışının biçimi hem artan baz miktarına hem de artan toplam hacme bağlıdır. Fazla baz hacmini başlı başına OH⁻ derişimi gibi okumayız.",
        ],
      },
      {
        title: "Son nokta ve indikatör",
        paragraphs: [
          "Bir indikatör iki renkli asit-baz biçimi arasında belirli pH aralığında geçiş yapar. Gözlenen renk son noktası, bu aralığın ve gözlem kararının sonucudur. Eşdeğerlik ise tepkimenin mol şartıdır; ikisi yakın seçilebilir fakat tanımları özdeş değildir.",
          "Uygun indikatörün geçiş aralığı eğrinin eşdeğerlik çevresindeki dik bölgesine denk gelmelidir. Örneğin zayıf asit-güçlü baz eğrisindeki bazik eşdeğerlik için nötr çevresinde her indikatör eşit uygunluk taşımaz. Modelin hacim çizgisi stokiyometrik noktayı gösterir; kendiliğinden deneysel renk hatasını sıfırlamaz.",
        ],
      },
      {
        title: "Bilinmeyen derişimi geri hesapla",
        paragraphs: [
          "Bir protonlu asit ile NaOH eşdeğerliğinde cA·VA=cB·VB yazılır. Büret hacim farkını litreye çevirip bilinen baz derişimiyle çarparız; asidin alınan hacmine bölerek analit derişimini buluruz. Hacimler aynı ölçüdeyse oran yoluyla da birimler izlenebilir.",
          "Örnek önceden seyreltilmişse bulunan değer titrasyon kabındaki çözeltinindir. Başlangıç örneğine dönmek için madde miktarını koruyan seyreltme oranı gerekir. İndikatör son noktasının eşdeğerlikten sapması ise hesapta kullanılan hacme sistematik hata olarak yansıyabilir.",
        ],
      },
      {
        title: "Eğriden hangi sonuç kesin çıkmaz?",
        paragraphs: [
          "Tek bir pH ölçümü, analitin bütün bileşenlerini veya tepkimenin tamamlanma süresini söylemez. Eğrinin yorumunda asidin proton sayısı, başka tamponlar, çözücü ve sıcaklık açık olmalıdır. Birden çok belirgin basamak, uygun sistemde birden çok proton aktarımıyla ilişkili olabilir.",
          "Bu model tek protonlu HA veya güçlü HCl ile sınırlıdır; ölçülmüş çok bileşenli numuneyi otomatik tanımlamaz. Kullanıcı nokta seçip önce pH yönünü tahmin eder, sonra aynı hacimdeki tür ve yük sonuçlarıyla karşılaştırır. Keşif kaydı öğrenme puanı veya tamamlanmış sınav sayılmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Büretten bilinmeyen derişime",
        prompt:
          "25,0 mL bir protonlu HCl analiti, 0,100 M NaOH ile eşdeğerleniyor. Büret ilk 1,20 mL, son 21,20 mL. Başka tepkime yok; gözlenen nokta eşdeğerlik kabul ediliyor. HCl molaritesi?",
        strategy: "Önce gerçekten harcanan hacmi bul.",
        steps: [
          {
            label: "Adım 1",
            explanation: "VB=21,20−1,20=20,00 mL=0,02000 L.",
          },
          {
            label: "Adım 2",
            explanation:
              "nNaOH=0,100×0,02000=0,002000 mol; HCl aynı mol eşdeğer içerir.",
          },
          {
            label: "Adım 3",
            explanation: "cHCl=0,002000/0,0250=0,0800 M.",
          },
        ],
        answer: "0,0800 M HCl.",
        check: "0,0800×0,0250=0,100×0,02000.",
        pitfall: "Son büret okuması 21,20 mL'yi doğrudan harcanan hacim almak.",
      },
      {
        title: "Zayıf asitte yarı nokta",
        prompt:
          "25 °C'de 100 mL 0,100 M tek protonlu HA, 0,100 M NaOH ile titre ediliyor. Ka=10⁻⁵; tampon mol-oranı yaklaşımı geçerli. 50,0 mL bazda pH yaklaşık?",
        strategy: "Tüketim tablosu ile iki aile biçimini bul.",
        steps: [
          {
            label: "Adım 1",
            explanation: "HA başlangıç 0,0100 mol; baz 0,00500 mol.",
          },
          {
            label: "Adım 2",
            explanation:
              "HA yaklaşık 0,00500 mol, A⁻ yaklaşık 0,00500 mol kalır. Eşdeğerliğin yarısıdır.",
          },
          {
            label: "Adım 3",
            explanation: "pH≈pKa+log1=5. Tam denge küçük düzeltme verebilir.",
          },
        ],
        answer: "Yaklaşık pH 5.",
        check: "Eşdeğerlik hacmi 100 mL; seçilen hacim 50 mL.",
        pitfall: "Yarı eşdeğerlikte pH'ı her asit için 7 saymak.",
      },
      {
        title: "Bazik eşdeğerlik",
        prompt:
          "25 °C'de 100 mL 0,100 M HA, Ka=10⁻⁵; 100 mL 0,100 M NaOH ile eşdeğerlikte. Kw=10⁻¹⁴, hacimler toplamsal, küçük hidroliz yaklaşımı geçerli. log7,071=0,84949. pH yaklaşık?",
        strategy: "Oluşan A⁻ çözeltisinin hidrolizini hesapla.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Toplam aile 0,0100 mol/0,200 L=0,0500 M. Kb=Kw/Ka=10⁻⁹.",
          },
          {
            label: "Adım 2",
            explanation: "[OH⁻]≈√(10⁻⁹×0,0500)=7,071×10⁻⁶ M.",
          },
          {
            label: "Adım 3",
            explanation: "pOH≈5,15051; pH≈8,84949.",
          },
        ],
        answer: "Yaklaşık pH 8,85.",
        check: "A⁻ zayıf baz olduğundan 25 °C'de eşdeğerlik baziktir.",
        pitfall: "Eşdeğerlikte güçlü artık yok diye hidrolizi silmek.",
      },
      {
        title: "Eğrinin fazla baz tarafı",
        prompt:
          "25 °C'de 100 mL 0,100 M tek protonlu asit üzerine 120 mL 0,100 M NaOH ekleniyor. Hacimler toplamsal, güçlü OH⁻ artığı baskın; log9,0909=0,95861. pH yaklaşık?",
        strategy: "Toplam bazdan tüketilen eşdeğeri çıkar.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Asit 0,0100 mol; baz 0,0120 mol; güçlü baz artığı 0,00200 mol.",
          },
          {
            label: "Adım 2",
            explanation: "Son hacim 0,220 L; OH⁻≈0,0090909 M.",
          },
          {
            label: "Adım 3",
            explanation: "pOH≈2,04139; pH≈11,95861.",
          },
        ],
        answer: "Yaklaşık pH 11,959.",
        check: "120 mL eşdeğerlik hacmi olan 100 mL'nin üstündedir.",
        pitfall: "Fazla 20 mL'yi son çözelti hacmi saymak.",
      },
    ],
    recall: [
      {
        prompt: "Eşdeğerlik ile son nokta aynı tanım mı?",
        answer:
          "Hayır; eşdeğerlik mol koşulu, son nokta gözlenen indikatör veya cihaz karar ölçütüdür.",
      },
      {
        prompt: "Yarı eşdeğerlikte pH≈pKa ne zaman?",
        answer:
          "Tek protonlu zayıf asit ve uygun tampon yaklaşımında eşlenik biçimlerin mol oranı yaklaşık birken.",
      },
      {
        prompt: "Eğrinin yatay ekseni nedir?",
        answer:
          "Bu modelde eklenen baz hacmi; süre veya tepkime hızı değildir.",
      },
      {
        prompt: "Zayıf asit eşdeğerliğinde neden hidroliz gerekir?",
        answer:
          "Oluşan eşlenik baz A⁻ suyla proton alışverişi yapar ve pH'ı belirler.",
      },
    ],
    items: [
      [
        "Büret ilk 2,30 mL, son 22,80 mL okunuyor. Harcanan titrant hacmi kaç mL?",
        "20,50",
        ["22,80", "25,10", "2,30", "10,25"],
        "Son ile ilk arasındaki farkı bul.",
        "Harcanan hacim 22,80−2,30=20,50 mL. Başlangıç okuması sıfır olmak zorunda değildir; yalnız son değeri kullanmak fazladan titrant sayar.",
      ],
      [
        "25,0 mL tek protonlu HCl, 20,0 mL 0,100 M NaOH ile eşdeğerleniyor. HCl molaritesi?",
        "0,0800 M",
        ["0,125 M", "0,100 M", "0,00800 M", "0,500 M"],
        "Bir HCl bir OH⁻ eşdeğeri verir.",
        "nNaOH=0,100×0,0200=0,00200 mol; cHCl=0,00200/0,0250=0,0800 M. Bu değer alınan analit çözeltisinindir.",
      ],
      [
        "100 mL 0,100 M tek protonlu HA, 0,100 M NaOH ile titre ediliyor. Eşdeğerlik baz hacmi?",
        "100 mL",
        ["50 mL", "10 mL", "200 mL", "25 mL"],
        "Asit ve baz mol katsayıları bir.",
        "Asit molü 0,0100; gereken baz hacmi 0,0100/0,100=0,100 L=100 mL. Ka başlangıç pH'ını etkiler ama bu belirtilen tek protonlu eşdeğer mol şartını değiştirmez.",
      ],
      [
        "Tek protonlu zayıf HA'nın güçlü bazla titrasyonunda uygun tampon yaklaşımı geçerli; yarı eşdeğerlikte pKa=4,80. pH yaklaşık?",
        "4,80",
        ["7,00", "2,40", "9,60", "14,00"],
        "Ara tabloda HA ve A⁻ eşittir.",
        "pH≈pKa+log(nA/nHA), oran yaklaşık 1 olduğundan pH≈4,80. Bu bir tampon kestirimidir; her titrasyonda yarı nokta nötr değildir.",
      ],
      [
        "25 °C'de zayıf HA güçlü NaOH ile eşdeğerleniyor; A⁻ bazik hidroliz yapıyor. Beklenen eşdeğerlik pH'ı?",
        "7'den büyük",
        [
          "Mutlaka 7",
          "Mutlaka 0",
          "Ka'dan bağımsız her zaman 14",
          "Negatif olmak zorunda",
        ],
        "Kalan tür A⁻'dır.",
        "A⁻ suya karşı bazdır ve OH⁻ oluşumunu artırır. Eşdeğerlik güçlü OH⁻ artığının başladığı tanım değil, verilen asit molünün tam karşılanmasıdır.",
      ],
      [
        "Titrasyon grafiğinde yatay eksen eklenen NaOH hacmi (mL), düşey eksen pH. Eğrideki yatay uzunluk doğrudan neyi verir?",
        "İki durum arasında eklenen titrant hacmi farkını",
        [
          "Tepkime süresini saniye olarak",
          "Aktivasyon enerjisini",
          "Çözelti kütlesini gram olarak",
          "Her noktada aynı OH⁻ molaritesini",
        ],
        "Eksenin yazılı niceliğini kullan.",
        "Yatay eksenin birimi mL'dir; iki konum farkı eklenen hacim farkını verir. Zaman bilgisi olmadığı için tepkime hızı veya süre çıkarılamaz.",
      ],
      [
        "İndikatörlü bir asit-baz titrasyonunda doğru ayrım?",
        "Renk son noktası indikatör aralığına, eşdeğerlik mol şartına bağlıdır",
        [
          "Her indikatör her eğride aynı hatayı verir",
          "Renk yalnız bürette değişmelidir",
          "Eşdeğerlik yalnız çözelti kırmızı olunca tanımlanır",
          "İndikatör eklenirse stokiyometri gereksizdir",
        ],
        "İki terim farklı ölçütlere dayanır.",
        "Uygun indikatör aralığı eşdeğerlik çevresindeki dik eğri bölgesine denk getirilir. Gözlenen renk kararı ve mol eşitliği yakın olabilir ama tanımları aynı değildir.",
      ],
      [
        "100 mL 0,100 M HCl üzerine 50 mL 0,100 M NaOH ekleniyor. Hacimler toplamsal ve su katkısı ihmal. Artan H⁺ derişimi yaklaşık?",
        "0,0333 M",
        ["0,0500 M", "0,100 M", "0,150 M", "0,00500 M"],
        "Artan molü toplam 0,150 L'ye böl.",
        "Başlangıç asit 0,0100 mol, baz 0,00500 mol. Artan 0,00500 mol/0,150 L=0,0333 M. İlk asit hacmini kullanmak 0,0500 M hatasını verir.",
      ],
      [
        "0,0100 mol HA, 0,0120 mol NaOH ile karıştırılıyor. Son hacim 0,200 L, 25 °C; güçlü OH⁻ artığı baskın. Yaklaşık pH?",
        "12",
        ["2", "7", "5", "13"],
        "Güçlü artık 0,00200 mol.",
        "OH⁻≈0,00200/0,200=0,0100 M; pOH≈2, pH≈12. Bu örnekte zayıf asidin ilk Ka değeri fazla bazın baskın hesabının yerine geçmez.",
      ],
      [
        "Bir protonlu asitten 10,0 mL alınıp 100 mL'ye seyreltiliyor. Bu seyreltilmiş çözeltinin tamamı titre edilerek 0,0200 M bulunuyor. İlk asit derişimi?",
        "0,200 M",
        ["0,00200 M", "0,0200 M", "2,00 M", "0,100 M"],
        "Seyreltmede asit molü korunur.",
        "0,0200×0,100=0,00200 mol ilk 0,0100 L örnekteydi. Başlangıç c=0,00200/0,0100=0,200 M; bulunan titrasyon değeri doğrudan ilk örneğin değeri değildir.",
      ],
    ],
    source:
      "MEBİ AYT Kimya PDF 82–83; OGM Dersler Cepte PDF 23–24; Sulu Çözelti Dengeleri sunusu PDF 25–29; video notu PDF 18–20. Eğri ve bütün sorular özgündür; son nokta ile stokiyometrik eşdeğerlik ayrılır.",
  },
  {
    id: "ayt-cozunurluk-dengesi",
    topic: "detail-436",
    title: "Çözünürlük dengesi, Kç ve sonlu katı",
    minutes: 65,
    objectives: [
      "Kavramı tür, miktar ve denge bağıntısıyla açıkla.",
      "Önce madde miktarını, sonra uygun dengeyi kur.",
      "Yaklaşımı sonucun koşullarıyla denetle.",
    ],
    sections: [
      {
        title: "Katı ile iyonlar arasında dinamik denge",
        paragraphs: [
          "Az çözünen bir iyonik katı suyla temas ettiğinde bazı iyonlar kristalden ayrılıp suda çevrelenir. Çözeltideki uygun iyonlar da katı yüzeyine dönebilir. Doygun çözeltinin katıyla dengede olduğu durumda çözünme ve çökelme hızları eşittir; mikroskobik olaylar durmaz.",
          "Çözelti derişimi bu anda makroskopik olarak sabit kalabilir. Kapta ne kadar katı bulunduğu ile çözeltinin doygunluk derişimi farklı bilgidir. Yeterli katı kalmışsa aynı sıcaklıkta daha çok katı eklemek, ideal modelde doygunluk derişimini artırmaz.",
        ],
      },
      {
        title: "Kç ifadesini denklemden üret",
        paragraphs: [
          "AgCl(k) ⇌ Ag⁺(suda)+Cl⁻(suda) için Kç=[Ag⁺][Cl⁻] yazılır. Saf katının etkinliği sabitin tanımında bir kabul edilir. Bu, katı miktarı sıfırdır demek değildir; katı faz mevcutken onun miktarı bu derişim ifadesinin değişkeni değildir.",
          "CaF₂(k) ⇌ Ca²⁺+2F⁻ için Kç=[Ca²⁺][F⁻]² olur. İyonun denklem katsayısı üs olarak görünür. Elektriksel yükü doğrudan üs almak yanlış olabilir; üsler çözünme denkleminin katsayılarından gelir.",
        ],
      },
      {
        title: "Molar çözünürlük s neyi sayar?",
        paragraphs: [
          "Molar çözünürlük s, belirli koşulda bir litre doygun çözeltide çözünen tuz formül birimi molünü anlatır. Saf suda başka iyon kaynağı yoksa AgCl için Ag⁺ ve Cl⁻ derişimleri s olur. CaF₂ için Ca²⁺ derişimi s, F⁻ derişimi 2s olur.",
          "İyonik kristalde tek tek bağımsız tuz molekülleri varsaymak gerekmez; formül birimi doğru sayım terimidir. İyon derişimi, formül birimi derişimi ve toplam iyon derişimi farklı olabilir. CaF₂ için toplam iyon molaritesi 3s olurken Kç ifadesi s(2s)²=4s³'tür.",
        ],
      },
      {
        title: "Farklı formüllerde bağıntı değişir",
        paragraphs: [
          "Başka tepkime veya ortak iyon bulunmayan ideal saf su örneklerinde AB için Kç=s²; AB₂ ve A₂B için 4s³; AB₃ ve A₃B için 27s⁴ bulunur. A₂B₃ için iyon derişimleri 2s ve 3s olduğundan Kç=(2s)²(3s)³=108s⁵ olur.",
          "Bu bağıntılar atom adlarına değil çözünme katsayılarına dayanır. Farklı formülleri yalnız Kç sayısı küçük diye aynı sırada çözünür sayamayız. Önce her biri için s bulunup aynı sıcaklık ve çözücü koşullarında karşılaştırılır.",
        ],
        table: {
          headers: ["Çözünme oranı", "İyon derişimleri", "Kç"],
          rows: [
            ["AB", "s ve s", "s²"],
            ["AB₂ / A₂B", "s ve 2s / 2s ve s", "4s³"],
            ["AB₃ / A₃B", "s ve 3s / 3s ve s", "27s⁴"],
            ["A₂B₃", "2s ve 3s", "108s⁵"],
          ],
        },
      },
      {
        title: "Molü kütleye ve hacme çevir",
        paragraphs: [
          "s mol/L ve son çözelti hacmi V L ise doygun çözeltide çözünen tuz molü sV olur. Verilen molar kütle M ile çözünen kütle m=sVM bulunur. Bu işlemde çözücü suyunun hacmiyle son çözelti hacmi aynı varsayılacaksa açıkça belirtilmelidir.",
          "Ters yönde bir çözeltide belirli miktar çözünmüş bulunması tek başına Kç'yi vermez. Çözeltinin doygun dengede olduğu ve ilgili katının koşulları sağladığı bilinmelidir. Doymamış bir çözeltinin iyon çarpımı Kç'den küçük olabilir.",
        ],
      },
      {
        title: "Sonlu stok her zaman doygunluk yaratmaz",
        paragraphs: [
          "Bir kapta doygunluğa ulaşmak için sV mol katının çözünmesi gerekebilir. Eklenen toplam katı bundan azsa hepsi çözünür ve katı faz kalmaz; çözeltinin iyon çarpımı Kç'nin altında olur. Daha çok katı varsa sV çözünür, kalan katı tabanda bulunur.",
          "Tam sınırda bütün katı çözünmüşken iyon çarpımı Kç'ye eşit olabilir. Bu durumda çözelti doygundur ama görünür katı kalmak zorunda değildir. Doygunluk ile katı faz varlığını aynı iki seçenek gibi sunmak bu sınırı kaçırır; model ikisini ayrı gösterir.",
        ],
      },
      {
        title: "Ortak iyonun tam denklemi",
        paragraphs: [
          "AgCl üzerine bilinen son Cl⁻ derişimi c sağlayan NaCl çözeltisi kullanıldığında, AgCl'den çözünme s ek Ag⁺ ve s ek Cl⁻ oluşturur. Doygunluk denklemi Kç=s(c+s) olur. Ortak iyonun yanında tuzdan gelen katkı otomatik olarak yok sayılmaz.",
          "c büyük ve s küçükse s≈Kç/c kestirimi kurulabilir; sonra s/c oranı denetlenir. Tam pozitif kökün kararlı biçimi s=2Kç/[c+√(c²+4Kç)]'dir. CaF₂ için ortak F⁻ durumunda Kç=s(c+2s)² çözülür; aynı karekök kısayolu doğrudan taşınmaz.",
        ],
      },
      {
        title: "Karışımda önce son derişimleri bul",
        paragraphs: [
          "İki iyon kaynağı karıştırıldığında tepkime öncesi aday iyon derişimleri, her iyonun başlangıç molünün son toplam hacme bölünmesiyle bulunur. Sonra iyon çarpımı Q hesaplanır. Başlangıç şişelerindeki molariteleri doğrudan çarpmak seyreltmeyi atlar.",
          "Ag⁺ ve Cl⁻ için Q=[Ag⁺][Cl⁻]; Ca²⁺ ve F⁻ için Q=[Ca²⁺][F⁻]² olur. Q>Kç ise uygun katı oluşumu termodinamik olarak elverişlidir; Q<Kç ise o katı için doymamış durum vardır. Gerçek çekirdeklenme süresi ve başka katılar bu basit denge modelinin dışında kalır.",
        ],
      },
      {
        title: "Çökelme sonrasında iyonlar sıfırlanmaz",
        paragraphs: [
          "AgCl çökerken Ag⁺ ve Cl⁻ bire bir azalır. Büyük ölçekte sınırlayıcı iyon çok az kalabilir ama denge derişimi matematiksel olarak sıfır değildir. Son çözeltide Kç şartı ve başlangıç mol farkı birlikte çözülür.",
          "Örneğin başlangıç son derişimleri Ag⁺ için a, Cl⁻ için b ve b>a ise denge sonunda Cl⁻=Ag⁺+(b−a) olur. Kç=x[x+(b−a)] denkleminden kalan Ag⁺ bulunur; çöken mol (a−x)V'dir. Önce miktar farkını korumak, küçük kalanı güvenli hesaplamayı sağlar.",
        ],
      },
      {
        title: "Sıcaklık ve başka kimya",
        paragraphs: [
          "Kç belirli sıcaklık için verilir; sıcaklık değişimi çözünmenin entalpisine ve bütün denge koşullarına bağlıdır. Her tuzun ısınınca mutlaka daha çok çözüneceği genellemesi yapılmaz. Basit iyonik örneklerde sıcaklık sabit tutulduğunda ortak iyon etkisi ayrı incelenebilir.",
          "Ortamda kompleks oluşturucu veya iyonu protonla tüketen bir tür varsa serbest iyon derişimi değişir, toplam çözünürlük artabilir. Bu yüzden saf suyun her koşulda en yüksek çözünürlüğü verdiği söylenmez. Bu model kompleksleşme, hidroliz ve yarışan başka çökelti içermeyen ideal sistemi açıkça seçer.",
        ],
      },
      {
        title: "Elektriksel denklik ve karşı iyon",
        paragraphs: [
          "Ortak Cl⁻ eklemek için kullanılan NaCl, aynı miktarda Na⁺ karşı iyonu da sağlar. Çözünürlük hesabında Kç'ye seyirci Na⁺ girmez; yine de toplam yük hesabında bulunur. CaF₂'de Ca²⁺ iki pozitif yük, her F⁻ tek negatif yük taşır.",
          "Modelde [Na⁺]+2[Ca²⁺]=[F⁻] gibi denklikler seçilen sisteme göre sağlanır. Kç, stok korunumu ve yük denetimi birlikte sonuçların anlamını güçlendirir. Ortak iyonu tek başına yüklü bir madde eklenmiş gibi çizmek yerine karşı iyonun varlığını metinde ve bütçede koruruz.",
        ],
      },
      {
        title: "Bir çözünürlük sorusunu yönet",
        paragraphs: [
          "Önce çözünme denklemi ve sıcaklığı, sonra ortak iyon veya başka tepkime olup olmadığını belirle. Doygunluk öncülünü kontrol et; varsa s ile iyon derişimlerini kur. Sonlu stok veya karışım verildiyse mol ve son hacim hesabını bu dengeye bağla.",
          "Sonunda s≥0, çözünen mol≤eklenen mol ve iyon çarpımının doğru rejimde olması gerekir. Katı kalıyorsa Q≈Kç; stok yetersizse Q<Kç; sınırda katı olmadan Q=Kç mümkündür. Bu üç durum aynı kavram haritasında gösterilince çözünme ve çökelme tek yöntemle anlaşılır.",
        ],
      },
    ],
    examples: [
      {
        title: "AgCl için karekök",
        prompt:
          "Belirli sabit sıcaklıkta saf suda AgCl(k) ile doygun denge var ve katı kalıyor. Kç=1,6×10⁻¹⁰; başka denge yok, ideal derişimler. Molar çözünürlük?",
        strategy: "Denklemin bire bir iyonlarını kullan.",
        steps: [
          {
            label: "Adım 1",
            explanation: "AgCl⇌Ag⁺+Cl⁻; her iyon derişimi s.",
          },
          {
            label: "Adım 2",
            explanation: "Kç=s²; s=√(1,6×10⁻¹⁰)=1,26491×10⁻⁵ mol/L.",
          },
          {
            label: "Adım 3",
            explanation:
              "1,00 L doygun çözeltide çözünen AgCl formül birimi molü aynı sayıdır; iki iyonun toplam molü 2s olur.",
          },
        ],
        answer: "s≈1,265×10⁻⁵ M.",
        check: "[Ag⁺][Cl⁻] yeniden 1,6×10⁻¹⁰ verir.",
        pitfall: "Toplam iyon derişimi 2s'yi tek iyon yerine koymak.",
      },
      {
        title: "CaF₂ için katsayının üssü",
        prompt:
          "Sabit sıcaklıkta saf suda CaF₂ katısıyla doygun denge, yeterli katı ve başka denge yok. Kç=4,0×10⁻¹¹; ideal yaklaşım. s ve [F⁻]?",
        strategy: "İki F⁻ katsayısını önce derişime, sonra üsse taşı.",
        steps: [
          {
            label: "Adım 1",
            explanation: "CaF₂⇌Ca²⁺+2F⁻; [Ca²⁺]=s, [F⁻]=2s.",
          },
          {
            label: "Adım 2",
            explanation: "Kç=s(2s)²=4s³; s=(10⁻¹¹)^(1/3)≈2,15443×10⁻⁴ M.",
          },
          {
            label: "Adım 3",
            explanation: "[F⁻]≈4,30887×10⁻⁴ M; toplam iyon derişimi 3s olur.",
          },
        ],
        answer: "s≈2,154×10⁻⁴ M; F⁻≈4,309×10⁻⁴ M.",
        check: "s(2s)²=4,0×10⁻¹¹.",
        pitfall: "Ca²⁺ yükünü Kç'nin katsayısı veya üssü yapmak.",
      },
      {
        title: "Ortak iyon ve yaklaşım kontrolü",
        prompt:
          "AgCl katısı 0,0100 M son ortak Cl⁻ sağlayan NaCl çözeltisinde doygun dengeye geliyor; yeterli katı, Kç=1,6×10⁻¹⁰, başka denge yok. s yaklaşık ve tam kök ilişkisi?",
        strategy: "s(c+s) bağıntısını kur.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Kç=s(0,0100+s). s≪0,0100 ise s≈1,6×10⁻¹⁰/0,0100=1,6×10⁻⁸ M.",
          },
          {
            label: "Adım 2",
            explanation:
              "s/c≈1,6×10⁻⁶; ortak iyon yanında ek katkı çok küçüktür.",
          },
          {
            label: "Adım 3",
            explanation:
              "Tam kararlı kök 2Kç/[c+√(c²+4Kç)]≈1,59999744×10⁻⁸ M; kestirimle yakındır.",
          },
        ],
        answer: "Yaklaşık 1,60×10⁻⁸ M.",
        check:
          "s, saf sudaki 1,265×10⁻⁵ M değerinden küçüktür; aynı koşullarda ortak iyon bastırır.",
        pitfall:
          "Ortak iyon katkısını küçük olduğu kanıtlanmadan her soruda kesin ihmal etmek.",
      },
      {
        title: "Karışımda çökelme ve kalan iyon",
        prompt:
          "100 mL 0,00100 M AgNO₃ ile 100 mL 0,00200 M NaCl karıştırılıyor. Hacimler toplamsal; aynı sıcaklıkta AgCl Kç=1,6×10⁻¹⁰; başka tepkime yok. Çökelme olur mu, denge Ag⁺ nasıl bulunur?",
        strategy: "İlk Q'yu son hacimde bul, sonra mol farkını koru.",
        steps: [
          {
            label: "Adım 1",
            explanation:
              "Başlangıç aday Ag⁺=0,000500 M, Cl⁻=0,00100 M. Q=5,0×10⁻⁷>Kç; AgCl çökelmesi elverişlidir.",
          },
          {
            label: "Adım 2",
            explanation:
              "Cl⁻−Ag⁺=0,000500 M korunur. Son Ag⁺=x ise x(x+0,000500)=Kç.",
          },
          {
            label: "Adım 3",
            explanation:
              "x=2Kç/[0,000500+√(0,000500²+4Kç)]≈3,198×10⁻⁷ M. Çöken mol=(0,000500−x)×0,200≈9,9936×10⁻⁵.",
          },
        ],
        answer: "Çökelme olur; Ag⁺ sıfır değil yaklaşık 3,20×10⁻⁷ M kalır.",
        check: "Kalan Cl⁻≈0,00050032 M ile çarpım Kç'yi verir.",
        pitfall: "Sınırlayıcı iyonun denge derişimini tam sıfır yazmak.",
      },
    ],
    recall: [
      {
        prompt: "Kç'de saf katı neden yazılmaz?",
        answer:
          "Saf katının etkinliği sabite alınır; bu katı stoğunun sıfır olduğu anlamına gelmez.",
      },
      {
        prompt: "CaF₂ saf su için Kç–s ilişkisi?",
        answer: "[Ca²⁺]=s, [F⁻]=2s; Kç=4s³.",
      },
      {
        prompt: "Katı kalmadan doygunluk mümkün mü?",
        answer:
          "Evet; stok tam doygunluk kapasitesine eşitse hepsi çözünürken Q=Kç olabilir.",
      },
      {
        prompt: "Karışımda Q hesaplamadan önce ne yapılır?",
        answer:
          "Her iyonun molünü son hacme bölerek karışımın aday derişimlerini bulmak.",
      },
    ],
    items: [
      [
        "CaF₂(k) ⇌ Ca²⁺+2F⁻ için ideal çözünürlük çarpımı ifadesi?",
        "[Ca²⁺][F⁻]²",
        ["[Ca²⁺]²[F⁻]", "[CaF₂]", "[Ca²⁺]+2[F⁻]", "[F⁻]/[Ca²⁺]"],
        "Üsler denklem katsayılarıdır.",
        "Çözünme katsayıları Ca²⁺ için 1 ve F⁻ için 2'dir; saf katının etkinliği sabite alınır. İyonun elektrik yükünü doğrudan üs olarak kullanmayız.",
      ],
      [
        "Saf suda yeterli CaF₂ katısı ile doygun denge; başka iyon veya tepkime yok. Molar çözünürlük s ise Kç?",
        "4s³",
        ["s²", "2s²", "s³", "27s⁴"],
        "F⁻ derişimi 2s'dir.",
        "Kç=[Ca²⁺][F⁻]²=s(2s)²=4s³. s tuz formül birimi molar çözünürlüğüdür; her iyonun derişimi aynı değildir.",
      ],
      [
        "Saf suda AB(k) ⇌ A⁺+B⁻ için doygun denge ve yeterli katı; Kç=9,0×10⁻¹⁰. s kaç M?",
        "3,0×10⁻⁵",
        ["9,0×10⁻¹⁰", "3,0×10⁻¹⁰", "9,0×10⁻⁵", "1,0×10⁻⁷"],
        "Kç=s².",
        "s=√(9,0×10⁻¹⁰)=3,0×10⁻⁵ M. Doygunluk ve başka iyon yokluğu öncülleri tek iyon derişimlerini s yapar.",
      ],
      [
        "Bir katının doygunluk kapasitesi verilen kapta 20 µmol; kapta yalnız 10 µmol katı var. Başka tepkime yok, çözünme dengeye ulaşıyor. Son durum?",
        "Hepsi çözünür; doygunluğun altında kalır",
        [
          "20 µmol çözünür",
          "10 µmol katı değişmeden kalır",
          "Negatif katı oluşur",
          "Kesin 30 µmol çözünür",
        ],
        "Çözünen miktar mevcut stoğu aşamaz.",
        "Doygunluk için gereken 20 µmol mevcut 10 µmolün üstündedir. Modelde bütün stok çözünür; bu derişimde Q<Kç olur. Stoktan madde yaratılmaz.",
      ],
      [
        "Bir kapta tam doygunluk için gereken kadar tuz eklenmiş ve hepsi çözünmüş; Q=Kç. Doğru ifade?",
        "Katı kalmadan da sınırda doygun çözelti olabilir",
        [
          "Katı yoksa Q asla Kç olamaz",
          "Kç sıfır olmak zorunda",
          "Bütün iyonlar kaybolur",
          "Çözelti kesin aşırı doymuştur",
        ],
        "Doygunluk ile görünür katıyı ayrı değerlendir.",
        "Sınırda çözünmüş miktar doygunluk kapasitesine eşittir. Katı faz miktarı sıfır olabilirken iyon çarpımı Kç'ye eşit kalır; ek katı daha sonra dengeyi değiştirmeden kalabilir.",
      ],
      [
        "AgCl, ortak Cl⁻ son katkısı c olan ortamda doygun; çözünmeden s M AgCl geliyor, başka denge yok. Doğru bağıntı?",
        "Kç=s(c+s)",
        ["Kç=s² her c için", "Kç=c−s", "Kç=s/c", "Kç=2c+s"],
        "Cl⁻ iki kaynaktan gelir.",
        "Ag⁺=s, Cl⁻=c+s olduğundan çarpım s(c+s) olur. s≪c kanıtlanırsa s≈Kç/c kestirimi kullanılabilir; ek katkı başlangıçtan yok sayılamaz.",
      ],
      [
        "100 mL 0,001 M AgNO₃ ve 100 mL 0,002 M NaCl karışıyor; hacimler toplamsal, çökelme öncesi aday Q=[Ag⁺][Cl⁻]. Q kaçtır?",
        "5,0×10⁻⁷",
        ["2,0×10⁻⁶", "2,0×10⁻⁷", "5,0×10⁻⁴", "1,0×10⁻³"],
        "İki derişim de karışımda yarıya düşer.",
        "Son hacim 200 mL. Aday Ag⁺=0,0005 M, Cl⁻=0,001 M; Q=5×10⁻⁷. Başlangıç şişe molariteleri doğrudan çarpılmaz.",
      ],
      [
        "Aynı sıcaklıkta bir iyonik katı için Q>Kç bulunuyor; uygun katı oluşumu ve başka denge yokluğu varsayılıyor. Termodinamik yön?",
        "Çökelme yönü elverişlidir",
        [
          "Daha çok katının mutlaka çözünmesi",
          "Hiçbir iyonun etkilenmemesi",
          "Kç'nin kendiliğinden Q'ya değişmesi",
          "Katı kütlesinin negatifleşmesi",
        ],
        "İyon çarpımı denge değerinden büyük.",
        "İyonları tüketen çökelme Q'yu düşürür ve dengeye yaklaştırır. Gerçek çekirdeklenme süresi bu termodinamik yön bilgisinden tek başına çıkmaz.",
      ],
      [
        "AB ve AB₂ tuzlarının Kç sayıları farklı verilmiş. Molar çözünürlüklerini karşılaştırmak için ne gerekir?",
        "Her formülün stokiyometrisinden s hesaplamak",
        [
          "Yalnız daha küçük Kç olanı her durumda daha az çözünür saymak",
          "Her ikisi için s=Kç kullanmak",
          "Katı rengini bilmek yeterlidir",
          "İyon katsayılarını yok saymak",
        ],
        "Kç–s bağıntıları aynı olmayabilir.",
        "AB için s², AB₂ için 4s³ gibi farklı bağıntılar vardır. Aynı sıcaklık, ortam ve başka denge koşulları sağlandıktan sonra s değerleri karşılaştırılır.",
      ],
      [
        "CaF₂ çözünürlüğü ortak F⁻ sağlayan NaF ortamında inceleniyor. Kç ifadesinde Na⁺ yoktur. Yük hesabı için ne doğrudur?",
        "Na⁺ karşı iyonu yine toplam pozitif yükte bulunur",
        [
          "Na⁺ fiziksel olarak çözeltiden yok olur",
          "Her Ca²⁺ yalnız bir yük sayılır",
          "Çözelti net negatif kalmak zorundadır",
          "Ortak F⁻ yüksüz eklenmiş sayılır",
        ],
        "Net denge ifadesi bütün iyonları saymak zorunda değildir.",
        "Na⁺ seyirci olabilir fakat ortak F⁻ ile birlikte eklenmiştir. İdeal sistemde [Na⁺]+2[Ca²⁺]=[F⁻] dengesi korunur; Kç ile elektriksel denklik farklı görevler yapar.",
      ],
    ],
    source:
      "MEBİ AYT Kimya PDF 84–85; OGM Dersler Cepte PDF 28; Sulu Ortamda Çözünme–Çökelme sunusu PDF 2–11,16–19,24–26; video notu PDF 22–23. Özgün öğretim; doygunluk, sonlu stok, ortak iyon ve son hacim öncülleri açık tutulur.",
  },
];

const positions020 = [2, 4, 1, 0, 3, 1, 3, 4, 2, 0];
export const forge020ChemistryTopics: Record<string, string> =
  Object.fromEntries(units020.map((u) => [u.id, u.topic]));
export const forge020ChemistryGuides: LessonGuide[] = units020.map(
  ({ id, minutes, objectives, sections, examples, recall, source }) => ({
    id,
    minutes,
    objectives,
    sections,
    examples,
    recall,
    source,
  }),
);
export const forge020ChemistryLessons: Lesson[] = units020.map((u, ui) => ({
  id: u.id,
  subjectId: "ayt-kimya",
  title: txt(u.title),
  minutes: u.minutes,
  objectives: u.objectives.map(txt),
  source: txt(u.source),
  tags: [u.id, "kaynakli-anlatim", "forge020"],
  body: u.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: u.items.map(
    ([prompt, correct, wrong, hint, explanation], i): Question => {
      const answer = (positions020[i] + ui) % 5,
        options = [...wrong];
      options.splice(answer, 0, correct);
      return {
        id: `f020-chem-${u.id}-${i + 1}`,
        prompt: txt(prompt),
        options: options.map(txt),
        answer,
        hint: txt(hint),
        explanation: txt(explanation),
        skill: u.id,
      };
    },
  ),
}));
