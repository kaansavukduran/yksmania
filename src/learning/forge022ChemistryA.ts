import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";

/** Classroom approximation explicitly given in every numerical model. */
export const FARADAY_A022 = 96500;
const finiteA022 = (value: number, min: number, max: number) => {
  if (!Number.isFinite(value) || value < min || value > max)
    throw new RangeError("CHEMISTRY_A022_NUMBER");
  return value;
};
const booleanA022 = (value: boolean) => {
  if (typeof value !== "boolean")
    throw new RangeError("CHEMISTRY_A022_BOOLEAN");
  return value;
};
const precisionA022 = () => {
  throw new RangeError("CHEMISTRY_A022_PRECISION");
};
/** Inputs denote their written decimal values; no broad equality epsilon. */
function decimalA022(value: number) {
  const [mantissa, exponentText] = value.toString().split("e");
  const exponent = Number(exponentText ?? 0),
    dot = mantissa.indexOf(".");
  const places = dot < 0 ? 0 : mantissa.length - dot - 1;
  const digits = BigInt(mantissa.replace(".", "")),
    power = places - exponent;
  return power >= 0
    ? { n: digits, d: 10n ** BigInt(power) }
    : { n: digits * 10n ** BigInt(-power), d: 1n };
}
function ownedA022<T extends object>(object: T, key: string): keyof T {
  if (typeof key !== "string" || !Object.hasOwn(object, key))
    throw new RangeError("CHEMISTRY_A022_CHOICE");
  return key as keyof T;
}

/** Independent trials from fixed stocks; xi is a stoichiometric extent, not elapsed time. */
export function galvanicA022(extent: number, wire: boolean, ionPath: boolean) {
  finiteA022(extent, 0, 0.02);
  booleanA022(wire);
  booleanA022(ionPath);
  const connected = wire && ionPath,
    xi = connected ? extent : 0;
  const zincMetalInitial = 0.03,
    zincIonInitial = 0.01,
    copperIonInitial = 0.02,
    copperMetalInitial = 0.01;
  const zincMetal = zincMetalInitial - xi,
    zincIon = zincIonInitial + xi;
  const copperIon = copperIonInitial - xi,
    copperMetal = copperMetalInitial + xi;
  if (
    xi > 0 &&
    (zincMetal === zincMetalInitial ||
      zincIon === zincIonInitial ||
      copperIon === copperIonInitial ||
      copperMetal === copperMetalInitial)
  )
    precisionA022();
  const electronMol = 2 * xi,
    nitrateToAnode = 2 * xi,
    potassiumToCathode = 2 * xi;
  return {
    extent,
    xi,
    wire,
    ionPath,
    connected,
    zincMetalInitial,
    zincIonInitial,
    copperIonInitial,
    copperMetalInitial,
    zincMetal,
    zincIon,
    copperIon,
    copperMetal,
    electronMol,
    charge: electronMol * FARADAY_A022,
    nitrateToAnode,
    potassiumToCathode,
    zincMassLost: 65 * xi,
    copperMassGained: 64 * xi,
    zincBudget: zincMetal + zincIon,
    copperBudget: copperMetal + copperIon,
    anodeChargeResidual: 2 * zincIon - 2 * zincIonInitial - nitrateToAnode,
    cathodeChargeResidual:
      2 * copperIon + potassiumToCathode - 2 * copperIonInitial,
    standardReference: 1.1,
    status: !connected
      ? "open"
      : extent === 0.02
        ? "upper"
        : extent === 0
          ? "start"
          : "transfer",
    limit:
      "Başlangıç stokları mol cinsindedir; her yeni seçim ayrı bir deneydir. Tel ve iyon yolu kapalıysa seçili ξ uygulanır. ξ=0,02 mol yalnız stokiyometrik üst sınırdır; gerçek denge, akım, süre veya anlık gerilim hesaplanmaz. E°=1,10 V bir standart başvuru değeridir. M(Zn)=65, M(Cu)=64 g/mol ve F=96500 C/mol e⁻ verilmiştir.",
  };
}

export const cellChoicesA022 = {
  daniell: {
    label: "Zn / Cu",
    n: 2,
    standard: 1.1,
    left: "Zn",
    right: "Cu",
    leftIon: "Zn²⁺",
    rightIon: "Cu²⁺",
  },
  copper: {
    label: "Cu / Cu",
    n: 2,
    standard: 0,
    left: "Cu",
    right: "Cu",
    leftIon: "Cu²⁺",
    rightIon: "Cu²⁺",
  },
} as const;
/** Ideal activities approximated by concentration/1M; fixed25°C with decimal log. */
export function nernstA022(
  kind: string,
  leftInitial: number,
  rightInitial: number,
  leftDilution: number,
  rightDilution: number,
) {
  const key = ownedA022(cellChoicesA022, kind),
    data = cellChoicesA022[key];
  finiteA022(leftInitial, 0.001, 1);
  finiteA022(rightInitial, 0.001, 1);
  finiteA022(leftDilution, 1, 10);
  finiteA022(rightDilution, 1, 10);
  const l = decimalA022(leftInitial),
    r = decimalA022(rightInitial),
    dl = decimalA022(leftDilution),
    dr = decimalA022(rightDilution);
  const ln = l.n * dl.d,
    ld = l.d * dl.n,
    rn = r.n * dr.d,
    rd = r.d * dr.n;
  const qn = ln * rd,
    qd = ld * rn,
    difference = qn - qd;
  const left = Number(ln) / Number(ld),
    right = difference === 0n ? left : Number(rn) / Number(rd);
  const quotient = difference === 0n ? 1 : Number(qn) / Number(qd);
  const logQ =
    difference === 0n
      ? 0
      : Math.log1p(Number(difference) / Number(qd)) / Math.LN10;
  if (difference !== 0n && logQ === 0) precisionA022();
  const correction = (0.0592 / data.n) * logQ;
  const signedVoltage = data.standard - correction;
  const direction =
    signedVoltage > 0 ? "right" : signedVoltage < 0 ? "left" : "equal";
  const anode =
    direction === "right" ? "left" : direction === "left" ? "right" : null;
  const cathode =
    direction === "right" ? "right" : direction === "left" ? "left" : null;
  return {
    key,
    data,
    leftInitial,
    rightInitial,
    leftDilution,
    rightDilution,
    left,
    right,
    quotient,
    logQ,
    correction,
    signedVoltage,
    magnitude: Math.abs(signedVoltage),
    direction,
    anode,
    cathode,
    leftVolumeFactor: leftDilution,
    rightVolumeFactor: rightDilution,
    limit:
      "Girdiler yazılan ondalık değerleriyle ele alınır; eşitlik geniş toleransla kurulmaz. Sıcaklık25°C; log10 ve0,0592/n katsayısı verilir. Çözeltiler ideal, hacimler toplanır, saf suyla yalnız seyreltme olur. Etkinlik≈c/(1M); kompleks/çökelme, sıvı temas potansiyeli, direnç ve yük altında gerilim kaybı yok sayılır. E, yazılan sol-yükseltgenme/sağ-indirgenme yönü içindir; negatifse istemli yön tersidir.",
  };
}

export const electrolyteChoicesA022 = {
  molten: {
    label: "NaCl eriyik",
    medium:
      "Su yok; erimiş NaCl ve uygun inert elektrotlar. Yeterli dış gerilim ve fazla iyon stoku verilmiştir.",
    cathode: "Na metali",
    anode: "Cl₂",
    cathodeElectrons: 1,
    anodeElectrons: 2,
    cathodeHalf: "Na⁺ + e⁻ → Na",
    anodeHalf: "2Cl⁻ → Cl₂ + 2e⁻",
    net: "2NaCl → 2Na + Cl₂",
    why: "Eriyikte Na⁺ ve Cl⁻ hareketlidir; su yarışmaz. Katotta Na metali, anotta Cl₂ elde edilir. Eriyik sıcaklığında Na'nın katı olduğu iddia edilmez.",
    excluded:
      "Sulu NaCl için bu katot sonucu kullanılamaz; suda Na⁺ yerine suyun indirgenmesi beklenir.",
  },
  water: {
    label: "Asitli su",
    medium:
      "Seyreltik H₂SO₄ ile iletkenliği artırılmış su; inert Pt elektrot. Yalnız verilen su yarıları ve nicel gaz toplama kabul edilir.",
    cathode: "H₂",
    anode: "O₂",
    cathodeElectrons: 2,
    anodeElectrons: 4,
    cathodeHalf: "2H⁺ + 2e⁻ → H₂",
    anodeHalf: "2H₂O → O₂ + 4H⁺ + 4e⁻",
    net: "2H₂O → 2H₂ + O₂",
    why: "Katotta H₂ için2, anotta O₂ için4 mol e⁻ gerekir. Aynı yükte H₂ molü O₂'nin iki katıdır; asit net tepkimede tüketilmez.",
    excluded:
      "H₂O ⇌ H⁺ + OH⁻ yazmak elektroliz değildir; oksidasyon basamakları değişmeyen iyonlaşma ile gaz üretimi ayrılır.",
  },
  copperInert: {
    label: "Cu / Pt anot",
    medium:
      "Sulu CuSO₄; inert Pt anot ve uygun iletken katot. Seçili aralıkta Cu²⁺ yeterli, verilen yarı tepkimeler baskındır.",
    cathode: "Cu metali",
    anode: "O₂",
    cathodeElectrons: 2,
    anodeElectrons: 4,
    cathodeHalf: "Cu²⁺ + 2e⁻ → Cu",
    anodeHalf: "2H₂O → O₂ + 4H⁺ + 4e⁻",
    net: "2Cu²⁺ + 2H₂O → 2Cu + O₂ + 4H⁺",
    why: "Cu²⁺ katotta bakıra dönüşür. İnert anot bakır sağlamaz; verilen su yükseltgenmesi O₂ üretir. Katotta Cu²⁺ azalır; toplam çözeltide asit oluşabilir.",
    excluded:
      "Katotla anot kütlesinin eşit değişmesi gerekmez; burada Pt anot tüketilmez, anotta gaz çıkar.",
  },
  copperActive: {
    label: "Cu / Cu anot",
    medium:
      "Sulu CuSO₄ içinde iki Cu elektrot; pozitif elektrot aktif ve çözünür. Cu²⁺ yeterli, hacim sabit ve yan tepkime yoktur.",
    cathode: "Cu metali",
    anode: "Çözünen Cu",
    cathodeElectrons: 2,
    anodeElectrons: 2,
    cathodeHalf: "Cu²⁺ + 2e⁻ → Cu",
    anodeHalf: "Cu → Cu²⁺ + 2e⁻",
    net: "Cu(anot) → Cu(katot)",
    why: "Bir yanda Cu²⁺ tüketilirken diğer yanda aynı mol Cu²⁺ oluşur. Bu ideal aktif anot örneğinde çözelti bakır stoku net değişmez; metal bir elektrottan ötekine taşınır.",
    excluded:
      "Anotta her zaman O₂ çıkmaz. Aktif Cu'nun yükseltgenmesi ile inert Pt üzerindeki su yükseltgenmesi farklıdır.",
  },
  brine: {
    label: "Tuzlu su",
    medium:
      "Derişik NaCl çözeltisi; uygun inert elektrot ve ayırıcı. Bu hücrede Cl₂ veren anot koşulları açıkça sağlanmıştır; ürünler karışmaz.",
    cathode: "H₂",
    anode: "Cl₂",
    cathodeElectrons: 2,
    anodeElectrons: 2,
    cathodeHalf: "2H₂O + 2e⁻ → H₂ + 2OH⁻",
    anodeHalf: "2Cl⁻ → Cl₂ + 2e⁻",
    net: "2Cl⁻ + 2H₂O → Cl₂ + H₂ + 2OH⁻",
    why: "Sulu ortamda Na metali değil suyun indirgenmesiyle H₂ oluşur. Verilen derişim/elektrot koşulunda anotta Cl₂ seçilmiştir; katot yanında OH⁻ oluşur.",
    excluded:
      "Her sulu klorürün her koşulda Cl₂ verdiği sonucu çıkarılamaz; suyla yarışma, derişim ve aşırı gerilim önemlidir.",
  },
  magnesiumWater: {
    label: "MgSO₄ suda",
    medium:
      "Seyreltik sulu MgSO₄ ve inert elektrotlar. Su yarıları baskın kabul edilir; tuz stoku yeterlidir. Yerel çökelme/pH nicel modellenmez.",
    cathode: "H₂",
    anode: "O₂",
    cathodeElectrons: 2,
    anodeElectrons: 4,
    cathodeHalf: "2H₂O + 2e⁻ → H₂ + 2OH⁻",
    anodeHalf: "2H₂O → O₂ + 4H⁺ + 4e⁻",
    net: "2H₂O → 2H₂ + O₂",
    why: "Bu sulu koşulda su, Mg²⁺'den önce indirgenir; Mg metali kaplanmaz. Katot yakınında OH⁻ artışı ve Mg(OH)₂ oluşumu mümkün olsa da bu model çökelti miktarı vermez.",
    excluded:
      "Eriyik Mg tuzu için yapılan metal kütlesi hesabını sulu MgSO₄'e otomatik uygulama; önce gerçek katot ürününü belirle.",
  },
} as const;
export function electrolysisA022(
  kind: string,
  electronMol: number,
  powered: boolean,
  reversed: boolean,
) {
  const key = ownedA022(electrolyteChoicesA022, kind),
    data = electrolyteChoicesA022[key];
  finiteA022(electronMol, 0, 0.04);
  booleanA022(powered);
  booleanA022(reversed);
  const actualElectrons = powered ? electronMol : 0,
    cathodeMol = actualElectrons / data.cathodeElectrons,
    anodeMol = actualElectrons / data.anodeElectrons;
  if (actualElectrons > 0 && (cathodeMol === 0 || anodeMol === 0))
    precisionA022();
  return {
    key,
    data,
    electronMol,
    powered,
    reversed,
    actualElectrons,
    charge: actualElectrons * FARADAY_A022,
    cathodeMol,
    anodeMol,
    cathodeSide: reversed ? "left" : "right",
    anodeSide: reversed ? "right" : "left",
    leftSign: reversed ? "−" : "+",
    rightSign: reversed ? "+" : "−",
    status: !powered ? "off" : electronMol === 0 ? "zero" : "products",
    limit:
      "Verilen altı hazır hücre incelenir; bu bir genel ürün tahmin motoru değildir. Yeterli dış gerilim, iyon stoku ve belirtilen baskın yarı tepkimeler kabul edilir. Seçili mol e⁻, geçen yükün karşılığıdır; katotta ve anotta aynı yük bütçesi kullanılır. Kutupları terslemek fiziksel konumları değiştirir; anot yükseltgenme, katot indirgenme olarak kalır.",
  };
}

export const depositChoicesA022 = {
  copper: {
    label: "Cu²⁺",
    metal: "Cu",
    mass: 64,
    z: 2,
    medium:
      "Yeterli su ve inert anot içeren sulu ortam; verilen aralıkta Cu²⁺→Cu hedef süreci.",
  },
  silver: {
    label: "Ag⁺",
    metal: "Ag",
    mass: 108,
    z: 1,
    medium: "Sulu Ag⁺ ve uygun inert anot; Ag⁺→Ag hedef süreci.",
  },
  aluminium: {
    label: "Al³⁺",
    metal: "Al",
    mass: 27,
    z: 3,
    medium:
      "Uygun Al³⁺ içeren eriyik; sulu çözelti değildir. Al³⁺→Al hedef süreci verilmiştir.",
  },
} as const;
export function faradayA022(
  kind: string,
  current: number,
  seconds: number,
  targetShare: number,
  initialMoles: number,
) {
  const key = ownedA022(depositChoicesA022, kind),
    data = depositChoicesA022[key];
  finiteA022(current, 0, 5);
  finiteA022(seconds, 0, 3600);
  finiteA022(targetShare, 0, 100);
  finiteA022(initialMoles, 0, 0.1);
  const charge = current * seconds,
    electronMol = charge / FARADAY_A022,
    idealTargetCharge = (charge * targetShare) / 100;
  const stockCharge = initialMoles * (data.z * FARADAY_A022),
    targetCharge = Math.min(idealTargetCharge, stockCharge);
  const depositedMoles =
      targetCharge === stockCharge
        ? initialMoles
        : targetCharge / (data.z * FARADAY_A022),
    depositedMass = depositedMoles * data.mass;
  const remainingMoles = Math.max(0, initialMoles - depositedMoles),
    otherCharge = charge - targetCharge;
  const actualShare = charge === 0 ? null : (100 * targetCharge) / charge;
  if (
    (current > 0 && seconds > 0 && charge === 0) ||
    (charge > 0 && electronMol === 0) ||
    (charge > 0 && targetShare > 0 && idealTargetCharge === 0) ||
    (initialMoles > 0 && stockCharge === 0) ||
    (targetCharge > 0 &&
      (depositedMoles === 0 || depositedMass === 0 || actualShare === 0)) ||
    (depositedMoles > 0 && remainingMoles === initialMoles)
  )
    precisionA022();
  return {
    key,
    data,
    current,
    seconds,
    targetShare,
    initialMoles,
    charge,
    electronMol,
    idealTargetCharge,
    stockCharge,
    targetCharge,
    depositedMoles,
    depositedMass,
    remainingMoles,
    otherCharge,
    actualShare,
    stockLimited: idealTargetCharge > stockCharge,
    equalMassPerCharge: data.mass / (data.z * FARADAY_A022),
    limit:
      "F=96500 C/mol e⁻ ve verilen mol kütleleri kullanılır. Akım sabittir. Hedef payı, iyon yeterliyken hedef metale ayrılan akım yüzdesidir. Stok tavanında hedef durur; kalan yük başka katot süreçlerine ayrılır, türü nicel tahmin edilmez. Bu ideal bütçe gerçek banyo verimi veya yan ürün tahmini değildir. İnert anot metal stoku yenilemez.",
  };
}

export const protectorsA022 = {
  Mg: { label: "Mg", molarMass: 24, z: 2, reduction: -2.37 },
  Zn: { label: "Zn", molarMass: 65, z: 2, reduction: -0.763 },
  Cu: { label: "Cu", molarMass: 64, z: 2, reduction: 0.337 },
} as const;
export function protectionA022(
  partner: string,
  contact: boolean,
  wet: boolean,
  intactBarrier: boolean,
  mass: number,
  demand: number,
) {
  if (partner !== "none") ownedA022(protectorsA022, partner);
  booleanA022(contact);
  booleanA022(wet);
  booleanA022(intactBarrier);
  finiteA022(mass, 0, 20);
  finiteA022(demand, 0, 5000);
  const data =
    partner === "none"
      ? null
      : protectorsA022[partner as keyof typeof protectorsA022];
  const coupleVoltage = data ? -0.44 - data.reduction : null;
  const hasPartner = Boolean(data && mass > 0),
    sacrificialCandidate = Boolean(data && coupleVoltage! > 0);
  const validPath = contact && wet && !intactBarrier && hasPartner;
  const capacity =
    data && sacrificialCandidate
      ? mass * ((data.z * FARADAY_A022) / data.molarMass)
      : 0;
  const supplied =
    validPath && sacrificialCandidate ? Math.min(capacity, demand) : 0;
  const usedMass =
    data && supplied > 0
      ? supplied === capacity
        ? mass
        : supplied * (data.molarMass / (data.z * FARADAY_A022))
      : 0;
  const remainingMass = Math.max(0, mass - usedMass),
    gap = Math.max(0, demand - supplied);
  if (
    (mass > 0 && sacrificialCandidate && capacity === 0) ||
    (supplied > 0 && (usedMass === 0 || remainingMass === mass))
  )
    precisionA022();
  const status = intactBarrier
    ? "barrier"
    : !wet
      ? "dry"
      : !hasPartner || !contact
        ? "separate"
        : !sacrificialCandidate
          ? "ironAnode"
          : demand === 0
            ? "candidate"
            : capacity >= demand
              ? "budgetEnough"
              : "budgetShort";
  return {
    partner,
    data,
    contact,
    wet,
    intactBarrier,
    mass,
    demand,
    coupleVoltage,
    hasPartner,
    sacrificialCandidate,
    validPath,
    capacity,
    supplied,
    usedMass,
    remainingMass,
    gap,
    status,
    limit:
      "Fe²⁺/Fe E°=−0,440 V ve verilen çift değerleri standart kıyas içindir. Seçilen yük, ayrı bir örnekte verilmiş e⁻ ihtiyacıdır; sahada ölçülmüş akım değildir. Kurban anotta %100 stokiyometrik üst kapasite hesaplanır. Kapasite yeterliliği tek başına gerçek koruma tasarımı değildir; alan, pasif film, akım dağılımı ve koruma potansiyeli hesaplanmaz. Yıl/ömür veya demir kaybı tahmini yapılmaz. Bariyer seçeneği ideal kesintisiz yalıtım, kuru seçeneği bu sulu korozyon modelinde iyon yolu yok demektir.",
  };
}

const unitsA022 = [
  {
    id: "elektrokimyasal-piller",
    title: "Elektrokimyasal piller: elektronun ve iyonun yolu",
    detail: "detail-440",
    minutes: 110,
    objectives: [
      "Anot ve katodu tepkimeyle belirle; elektron ve iyon yollarını ayrı izle.",
      "Dengeli yarı tepkimelerden pil tepkimesini ve standart gerilimi kur.",
      "Elektrot kütlesi, stok kapasitesi ve gerilim arasındaki farkı açıkla.",
      "Şarj edilebilirlik, lityum iyon yapısı ve atık pil yönetimini doğru koşullarla yorumla.",
    ],
    sections: [
      {
        title: "Kimyasal değişim elektrik işi yapabilir",
        paragraphs: [
          "Çinko atomunun elektron verip Zn²⁺ olması yükseltgenme, Cu²⁺ iyonunun elektron alıp bakıra dönüşmesi indirgenmedir. Bu iki değişim aynı redoks olayının parçalarıdır. Elektron aktarımını dış bir iletken üzerinden düzenlersen uygun istemli tepkimeden elektrik işi elde edebilirsin; galvanik pilin temel fikri budur.",
          "Metali doğrudan çözeltiye atmak da redoks doğurabilir, fakat elektrik enerjisini dış bir devrede kullanmak için aktarım yolunu düzenlemek gerekir. İstemlilik, verilen koşullarda termodinamik yönü anlatır; işlemin ne kadar hızlı olduğunu veya her gerçek düzeneğin hemen çalışacağını tek başına göstermez.",
        ],
      },
      {
        title: "Yarı hücre, elektrot ve elektrolit",
        paragraphs: [
          "Elektrot, elektron alışverişinin gerçekleştiği iletken yüzeydir. Bu dersin metal yarı hücresinde metal çubuk kendi iyonunu içeren çözeltiyle temas eder. Elektrolit ise yükü hareketli iyonlarla taşıyan ortamdır. Elektrot ile elektrolit birlikte yarı hücreyi oluşturur; iki yarı hücrenin görevlerini ayırarak pili okursun.",
          "Her elektrot mutlaka çözeltiye metal iyonu veren bir çubuk değildir. Platin gibi uygun inert yüzeyler, gaz veya çözeltideki taneciklerin elektron alışverişine aracılık edebilir. Elektrolit yalnız sulu çözelti demek de değildir; eriyik ve uygun başka iyon ileten ortamlar vardır. Burada hangi sistemin verildiğini önce tanımla.",
        ],
      },
      {
        title: "Anot ile katodun kimliği tepkimedir",
        paragraphs: [
          "Anot yükseltgenmenin, katot indirgenmenin gerçekleştiği elektrottur. Zn → Zn²⁺ + 2e⁻ yarısı çinko tarafını anot yapar; Cu²⁺ + 2e⁻ → Cu yarısı bakır tarafını katot yapar. İsimleri ezberlediğin metal rengine veya çizimdeki sağ-sol yerine göre verme; önce elektron veren ve alan taneciği bul.",
          "Aynı metal başka bir çiftte farklı görev alabilir. Bakır, çinkoya karşı katot olurken uygun gümüş iyonu hücresinde anot olabilir. Ayrıca elektrolizde dış kaynak rolleri belirleyebilir. Değişmeyen tanım yükseltgenme–anot ve indirgenme–katot ilişkisidir; işaret ve konum bu tanımdan sonra okunur.",
        ],
      },
      {
        title: "Galvanik pilde kutuplar ve dış devre",
        paragraphs: [
          "Çalışan galvanik metal pilinde anot negatif, katot pozitiftir. Dış iletkendeki elektron aktarımı anottan katoda doğrudur. Çinko–bakır örneğinde yön Zn’den Cu’ya olur. Elektronun yönünü çizerken iletken teli izle; çözeltinin içinden serbest elektronların aynı biçimde yüzdüğünü düşünme.",
          "Geleneksel akım yönü pozitif yük hareketi kabulüyle tanımlanır ve dış metal telde elektron hareketine terstir. Soruda elektrik akımı mı elektron akışı mı istendiğini oku. İki okun aynı anlamı taşıdığını sanmak, kimyasal görevleri doğru bilsen bile yön sorusunu yanlış işaretlemene yol açabilir.",
        ],
      },
      {
        title: "Daniell pilinin yarı tepkimelerini birleştir",
        paragraphs: [
          "Anotta Zn(k) → Zn²⁺(suda) + 2e⁻, katotta Cu²⁺(suda) + 2e⁻ → Cu(k) yazılır. İki taraftaki elektron sayısı zaten eşittir. Toplayıp elektronları sadeleştirince Zn(k) + Cu²⁺(suda) → Zn²⁺(suda) + Cu(k) elde edilir. Sülfat gibi seyirci iyonu net redoksa gereksiz yere katma.",
          "Bir mol çinko bu denklemde bir mol Cu²⁺ ile eşleşir ve iki mol elektron aktarılır. Çinko atomları yok olmaz; metalden çözeltiye geçer. Bakır atomları da çözeltiden katıya geçer. Bu madde defteri, kütle değişimini ve sınırlayıcı stoku yalnız artar-azalır ezberinden daha güvenilir açıklar.",
        ],
      },
      {
        title: "Tuz köprüsü yük denkliğini sürdürür",
        paragraphs: [
          "Daniell hücresinde Zn²⁺ oluşması anot çözeltisindeki pozitif yükü artırma, Cu²⁺ tüketilmesi katot çözeltisinde pozitif yükü azaltma eğilimindedir. Uygun KNO₃ köprüsünden NO₃⁻ anot, K⁺ katot tarafına gider. İyon geçişi iki sıvıdaki yük denkliğini sürdürür; köprünün görevi dış telin yerine elektron taşımak değildir.",
          "U biçimli boru tek mümkün düzenek değildir; uygun gözenekli ayırıcı veya iyon ileten zar da bağlantı sağlayabilir. Elektrolit ve ayırıcı istenmeyen tepkime doğurmamalıdır: Ag⁺ içeren bir hücreye Cl⁻ taşıyıp AgCl çöktürmek basit seyirci koşulunu bozar. Belirli köprü örneğini her pil için aynı kimyasal seçim sanma.",
        ],
      },
      {
        title: "İki iletim yolunu birlikte denetle",
        paragraphs: [
          "Sürekli pil akımı için dış elektronik yol ile iç iyonik yol birlikte tamamlanmalıdır. Tel kopuksa dış devrede sürekli elektron aktarımı olmaz. İyonik bağlantı kesikse başlangıçtaki küçük yük ayrışması daha fazla aktarımı engeller. Yalnız iki metali bir resimde birbirine yakın çizmek çalışan devre kurulduğunu göstermez.",
          "Açık devrede uygun voltmetreyle potansiyel farkı bulunabilmesi, büyük ve sürekli yük akımı aktığı anlamına gelmez. İdeal voltmetre akım çekmeden potansiyel farkını gösterir. Gerçek yüksek dirençli ölçerde akım çok küçük olabilir. Gerilim ile akımı ayrı büyüklükler olarak düşün; birinin varlığını diğerinin miktarı diye raporlama. İnteraktif stok modeli her seçimi yeni bir başlangıç deneyi olarak karşılaştırır.",
        ],
      },
      {
        title: "Pil şemasını fazlarıyla oku",
        paragraphs: [
          "Yaygın pil gösteriminde anot sola, katot sağa yazılır: Zn(k) | Zn²⁺(suda) || Cu²⁺(suda) | Cu(k). Tek çizgi faz sınırını, çift çizgi yarı hücreler arasındaki iyonik bağlantıyı temsil eder. Şema bir coğrafi yön zorunluluğu değil, tepkimeyi düzenli yazma uzlaşımıdır.",
          "Derişim, gaz basıncı ve inert elektrot gerekiyorsa gösterimde belirtilir. Hidrojen yarısında yalnız H₂ gazını metal çubukmuş gibi çizmek yerine uygun Pt iletken yüzeyi gerekir. Hücre ters yönde tanımlandığında anot/katot yazımını ve elektron yönünü de yeni tepkimeye göre yeniden kur; eski şeklin oklarını otomatik koruma.",
        ],
      },
      {
        title: "Standart hidrojen elektrodu ortak referanstır",
        paragraphs: [
          "Voltmetre iki elektrot arasındaki potansiyel farkını ölçer; tek bir yarı hücrenin potansiyeli bağımsız bir mutlak voltaj olarak doğrudan ölçülmez. İndirgenme potansiyellerini ortak ölçekte karşılaştırmak için standart hidrojen elektrodunun (SHE) standart potansiyeli uzlaşımla 0 V alınır. Bu derste referans 25°C’de, H⁺ etkinliği 1 ve H₂ gaz basıncı 1 bar olan Pt/H₂/H⁺ yarısıdır. Pt uygun iletken yüzey sağlar; H₂ gazı kendi başına metal elektrot değildir. İdeal çözelti yaklaşımında etkinlik yaklaşık [H⁺]/(1 M) ile kurulur; bazı okul sorularının 1 atm yaklaşımı açık veriyse o sorunun verisi ayrıca kullanılır.",
          "Sıfır başvuru değeri, hidrojen yarısında tepkime olamayacağı anlamına gelmez. Zn²⁺/Zn verisi −0,763 V olduğunda Zn yükseltgenir, SHE katot olur ve H⁺ iyonları H₂’ye indirgenir. Ag⁺/Ag verisi +0,799 V olduğunda ise Ag⁺ katotta indirgenir, SHE anot olur ve H₂ yükseltgenir. Referans olmak, her çiftte aynı elektrot görevini almak değildir. H⁺ tüketilen katot örneğinde sabit hacim, tamponsuz çözelti ve başka H⁺ sağlayan süreç yok varsayılırsa H⁺ etkinliği azalır, pH artar; sabit etkinlikte tutulan gerçek standart referans için otomatik pH artışı ileri sürülmez.",
        ],
      },
      {
        title: "Standart gerilim iki indirgenme verisinin farkıdır",
        paragraphs: [
          "İki değer de indirgenme olarak verilmişse E°pil = E°katot − E°anot kullanılır. Verilen E°(Cu²⁺/Cu)=+0,337 V ve E°(Zn²⁺/Zn)=−0,763 V için fark 1,100 V’tur. Anot yarısını yükseltgenme yönünde yazarsan onun işareti değişir ve indirgenme yarısının değeriyle toplanabilir.",
          "Denklemde elektronları eşitlemek için katsayıları artırmak gerilimi aynı katsayıyla çarpmaz. Volt, birim yük başına enerjiyle ilişkilidir; daha çok madde aktarımı daha çok toplam yük ve iş sağlayabilir. Standart basınç modern tanımda 1 bar iken bazı sınıf soruları 1 atm yaklaşımı verir; sayısal sorunun açık verisini kullan.",
        ],
      },
      {
        title: "E ile E° aynı kayıt değildir",
        paragraphs: [
          "E° belirli sıcaklıkta standart durumlara ait başvuru gerilimidir. Çalışan hücrenin E değeri ise o andaki etkinliklere, sıcaklığa ve gaz varsa ilgili basınca bağlıdır. Pil boşalırken derişimler değişebilir ve ölçülen gerilim azalabilir; bu, aynı sıcaklıktaki tablodaki E° sayısının tüketildiği anlamına gelmez.",
          "Dengeye ulaşan tersinir bir hücrede net ilerlemeyi sağlayan gerilim sıfır olur. Bu sınır ile telin kopması veya reaktif stoğunun pratik kullanım sınırı farklı nedenlerdir. Sonraki derişim ünitesinde E ile Q ilişkisini hesaplayacaksın; burada standart gerilim hesabını her anın ölçümü gibi kullanmamak temel beceridir.",
        ],
      },
      {
        title: "Kütle artışı ve azalışının koşulu",
        paragraphs: [
          "Çözünen metal anot örneğinde metal iyonu oluştuğundan çubuğun kütlesi azalır. Katotta çözeltiden metal birikirse katot kütlesi artar. Ancak H⁺ iyonları H₂ gazına indirgeniyorsa iletken katot üzerinde mutlaka metal birikmez; gaz çıkışı gözlenebilir. Aynı indirgenme görevi farklı fiziksel sonuç verebilir.",
          "Katot olarak kullanılan bakır çubuk asit çözeltisindeyse, çözeltide hiç Cu²⁺ bulunmadan Cu²⁺ indirgenmesi yazılamaz. Önce gerçekten bulunan ve verilen koşullarda yarışabilen tanecikleri belirle. İnert anotta da elektrodun kendisi çözünmeden çözeltideki tür yükseltgenebilir; elektrot adıyla tepkimeye giren maddeyi karıştırma.",
        ],
      },
      {
        title: "Kapasite stokla, gerilim çiftle ilgilidir",
        paragraphs: [
          "İdeal bir stok hesabında aktarılabilecek yük, uygun reaktif miktarı ve elektron katsayısıyla sınırlıdır: Q = n(e⁻)F. Bir mol Zn’nin tam Zn²⁺ dönüşümü iki mol elektronluk üst kapasite verir. Fakat Cu²⁺ daha önce sınırlanıyorsa fazla Zn tek başına bu pilde bütün kapasitesini kullanamaz.",
          "Aynı çift, sıcaklık ve etkinliklerde metal çubuğu kalınlaştırmak başlangıç denge gerilimini iki katına çıkarmaz. Kullanılabilir stok, yüzey ve iç direnç yük altındaki davranışı etkileyebilir. Kapasiteyi çalışma saati yapmak için akım, verim ve kesme koşulu da gerekir; yalnız gramdan evrensel bir pil ömrü yılı çıkarma.",
        ],
      },
      {
        title: "Enerji, akım ve gerçek kayıplar",
        paragraphs: [
          "Bir coulomb yükün bir volt farktan geçişi bir joule enerji ölçeğidir. Aynı gerilimde daha çok uygun madde daha çok toplam yük sağlayabilir. Bir anın akımı ise dış devre, iç direnç, yüzey tepkimeleri ve taşınım gibi etkenlerle ilgilidir. Standart gerilim tablosu bu hız bilgilerini tek başına vermez.",
          "Gerçek yük altında uç gerilimi, açık devredeki denge geriliminden farklı olabilir. Bu derste iç direnç ve aşırı gerilim sayısal hesaplanmıyorsa ölçülmüş güç iddiası üretme. Şeklin anlatması gereken, yükün ve maddenin hangi yoldan aktığıdır; akan bir süs animasyonunu ölçülmüş amper gibi yorumlama.",
        ],
      },
      {
        title: "Birincil ve yeniden şarj edilebilen hücreler",
        paragraphs: [
          "Birincil piller genellikle yeniden doldurulmak için tasarlanmaz. İkincil hücrelerde uygun dış elektrik enerjisiyle kullanışlı kimyasal durum geri kurulabilir. Bu geri dönüş, yalnız denklemi kâğıtta ters çevirmek değil, elektrot ve elektrolitin tekrarlı çalışmaya uygun olmasıyla mümkündür.",
          "Her galvanik pili gelişigüzel ters gerilimle şarj etmeye çalışma. Gerçek şarj işlemi üreticinin akım, gerilim ve sıcaklık sınırlarıyla yönetilir. Bir çevrim kabaca dolum–boşaltma dizisini anlatır; takvim yaşlanması ve kullanım koşulları da kapasiteyi etkiler. Bütün kimyaları tek sabit çevrim sayısıyla tanımlama.",
        ],
      },
      {
        title: "Lityum iyonu, lityum metalinden ayır",
        paragraphs: [
          "Yaygın lityum iyon hücrelerinde Li⁺ iyonları iki uygun elektrot yapısı arasında taşınır; elektrotların redoks durumları bu taşınmaya eşlik eder. Bu sistemleri tümüyle metalik Li anot ve TiS₂ katottan oluşan tek tip pil sanma. Li/TiS₂ gibi tarihsel lityum metal örnekleri ile yaygın girişim temelli Li-ion hücreleri ayrı yapılardır.",
          "Li-ion bir aile adıdır; elektrot kimyası, elektrolit türü ve çalışma gerilimi tasarıma göre değişir. Her biri katı polimer içerir, her biri tam 3,6 V’tur veya hiçbir zararlı madde içermez denemez. Taşınabilir cihazlarda yüksek enerji/kütle oranı avantaj olabilir; güvenli kullanım ve geri dönüşüm gereksinimi yine sürer.",
        ],
      },
      {
        title: "Pil bakımını kimya ve çevreyle ilişkilendir",
        paragraphs: [
          "Aşırı ısı, kısa devre, fiziksel hasar ve uygun olmayan şarj koşulları istenmeyen süreçleri artırabilir. Uzun süre bekleyen hücrede kendi kendine boşalma ve takvim yaşlanması görülebilir; ne zaman işlevsiz olacağı kimyaya, şarj durumuna ve koruma devresine bağlıdır. Akım sınırı amper, gerilim sınırı volt ile ifade edilir.",
          "Ömrünü tamamlayan pilleri uygun toplama ve geri dönüşüm kanalına ver. Kimyasal içeriği farklı pilleri tek bir sabit toprak alanı veya su hacmi zararıyla ölçülmüş gibi anlatmak yerine sızıntı, yangın ve kaynak geri kazanımı bağlamını öğren. Öğrendiğin ilke, maddeyi tanımak ve tasarıma uygun yönetmektir.",
        ],
      },
    ],
    examples: [
      {
        title: "Daniell yarılarını ve gerilimi kur",
        prompt:
          "25 °C için E°(Zn²⁺/Zn)=−0,763 V ve E°(Cu²⁺/Cu)=+0,337 V veriliyor. Uygun standart yarı hücreler bağlıdır. Net tepkime ve E°pil nedir?",
        strategy:
          "İndirgenme verilerini karşılaştır, elektronları denkleştir, potansiyel farkını al.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Cu²⁺ daha büyük indirgenme değerine sahiptir; katotta Cu oluşur. Zn anotta Zn²⁺ olur ve 2e⁻ verir.",
          },
          {
            label: "2. adım",
            explanation:
              "Zn → Zn²⁺+2e⁻ ile Cu²⁺+2e⁻→Cu toplanır; aynı iki elektron sadeleşir.",
          },
          {
            label: "3. adım",
            explanation:
              "E°pil=0,337−(−0,763)=1,100 V. İki elektron katsayısı gerilimi ikiyle çarpmaz.",
          },
        ],
        answer: "Zn+Cu²⁺→Zn²⁺+Cu; E°=1,100 V.",
        check:
          "Atomlar Zn 1/Cu 1, toplam iyon yükü iki yanda +2; gerilim pozitiftir.",
        pitfall: "İki indirgenme değerini işaret değiştirmeden toplama.",
      },
      {
        title: "Stok üst kapasitesini belirle",
        prompt:
          "Başlangıçta 0,020 mol Zn metali ve 0,015 mol Cu²⁺ var. Yalnız Zn+Cu²⁺→Zn²⁺+Cu dönüşümü düşünülüyor. F=96500 C/mol e⁻ veriliyor. Stokiyometrik üst yük nedir?",
        strategy:
          "Önce 1: 1 stok eşleşmesini, sonra iki elektron katsayısını kullan.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Denklem bir mol Zn için bir mol Cu²⁺ ister. Cu²⁺ 0,015 mol ile sınırlayıcıdır; Zn’nin 0,005 molü üst sınırda kalır.",
          },
          {
            label: "2. adım",
            explanation:
              "ξüst=0,015 mol olduğundan n(e⁻)=2×0,015=0,030 moldür. Bu bir stok üst sınırıdır; gerçek son denge hesabı değildir.",
          },
          {
            label: "3. adım",
            explanation:
              "Qüst=0,030×96500=2895 C. Yalnız fazla Zn miktarını kullanarak daha büyük yük yazılamaz.",
          },
        ],
        answer: "Üst yük 2895 C.",
        check:
          "0,015 mol Cu²⁺ ve aynı mol Zn tüketimi, iki mol e⁻/mol koşulunu korur.",
        pitfall: "Reaktiflerden yalnız birinin toplamını kapasite sanma.",
      },
      {
        title: "Köprüdeki iyon ihtiyacını say",
        prompt:
          "İdeal Daniell hücresinde 0,010 mol Zn, Zn²⁺ olurken aynı mol Cu²⁺ katotta tüketiliyor. KNO₃ köprüsü ve sabit hacimler varsayılıyor. Yük denkliği için hangi iyonlardan kaç mol geçer?",
        strategy:
          "Oluşan ve azalan iki değerlikli yükü tek değerlikli köprü iyonuyla eşleştir.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Anotta 0,010 mol Zn²⁺ oluşması +0,020 mol birim yük katkısı yapar; bunu dengelemek için 0,020 mol NO₃⁻ gerekir.",
          },
          {
            label: "2. adım",
            explanation:
              "Katotta 0,010 mol Cu²⁺ azalması +0,020 mol birim yük eksiltir; 0,020 mol K⁺ bu tarafın denkliğini tamamlar.",
          },
          {
            label: "3. adım",
            explanation:
              "NO₃⁻ anot, K⁺ katot çözeltisine gider. Aynı süreçte dış telde 0,020 mol elektron Zn’den Cu’ya aktarılır.",
          },
        ],
        answer: "Anoda 0,020 mol NO₃⁻; katoda 0,020 mol K⁺.",
        check:
          "İki yarı hücrenin yük değişimi ayrı ayrı sıfırlanır; köprüden elektron geçmez.",
        pitfall: "İyon molünü metal molüne eşitleyip iki değerliği unutma.",
      },
      {
        title: "Katotta kütle artışı zorunlu değildir",
        prompt:
          "Bu soruda 25°C, ideal 1 M H⁺ ve 1 atm H₂ standart koşul yaklaşımı verilmiştir. Zn/Zn²⁺ yarısı bu Pt/H₂/H⁺ yarısıyla bağlanıyor; modern 1 bar tanımıyla 1 atm yaklaşımı aynı şey sayılmıyor. E°Zn=−0,763 V ve E°H=0 V. Katot ve gözlenen ürün nedir?",
        strategy: "Elektrodun yüzeyi ile çözeltide indirgenen taneciği ayır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "H⁺/H₂ çiftinin indirgenme değeri Zn²⁺/Zn’den büyüktür; Pt üzerindeki H⁺ indirgenmesi katot yarısıdır.",
          },
          {
            label: "2. adım",
            explanation:
              "2 H⁺+2e⁻→H₂ gazı yazılır; Pt yalnız uygun iletken yüzeydir. Pt metali kaplanması veya Cu birikmesi verilmemiştir.",
          },
          {
            label: "3. adım",
            explanation:
              "Net Zn+2 H⁺→Zn²⁺+H₂; E°=0−(−0,763)=0,763 V. Gaz üretimi katotta metal kütlesi artışı gerektirmez.",
          },
        ],
        answer: "Pt katot yüzeyinde H₂ gazı oluşur; E°=0,763 V.",
        check: "Zn 1, H2 ve toplam +2 iyon yükü korunur.",
        pitfall: "Katot sözcüğünden otomatik metal birikmesi çıkarma.",
      },
    ],
    recall: [
      {
        prompt: "Anodu metal adına mı tepkimeye mi göre tanırsın?",
        answer:
          "Yükseltgenmenin olduğu yer anottur; aynı metal başka bir çiftte katot olabilir.",
      },
      {
        prompt: "Tuz köprüsündeki yük taşıyıcı nedir?",
        answer:
          "Hareketli iyonlardır. Daniell örneğinde anyon anot, katyon katot tarafına gider; dış telde elektron taşınır.",
      },
      {
        prompt: "Denklemi ikiyle çarpmak E° değerini ne yapar?",
        answer:
          "Değiştirmez; toplam madde ve elektron miktarı ölçeklenir, birim yük başına gerilim ölçeklenmez.",
      },
      {
        prompt: "Pil boşalınca E° de tüketilir mi?",
        answer:
          "Aynı sıcaklıkta standart başvuru değeri tüketilmez. Derişimler ve gerçek koşullar değiştikçe E değişir.",
      },
    ],
    questions: [
      {
        prompt:
          "Standart Zn/Zn²⁺ ve Cu²⁺/Cu hücresinde Zn yükseltgeniyor. Dış telde elektronların yönü hangisidir?",
        options: [
          "SO₄²⁻ iyonunun içinden Cu’ya",
          "Hiçbir bağlantı olmadan iki yöne eşit",
          "Zn’den Cu’ya",
          "Cu’dan Zn’ye",
          "K⁺ ile birlikte köprüden Zn’ye",
        ],
        answer: 2,
        hint: "Elektron veren yarıyı önce bul.",
        explanation:
          "Zn → Zn²⁺+2e⁻ yarısı elektronun kaynak tarafını gösterir. Cu²⁺ bu elektronları katotta alır; telde yön Zn’den Cu’ya olur. İki elektron bir Cu²⁺ indirgenmesine eşleşebilir.",
        guidance: {
          knowledge: [
            "Anotta yükseltgenme elektron verir; katotta indirgenme elektron alır.",
          ],
          strategy:
            "Verilen Zn yükseltgenmesini anoda bağla, sonra dış teli izle.",
          steps: [
            "Zn → Zn²⁺+2e⁻ yarısı elektronun kaynak tarafını gösterir.",
            "Cu²⁺ bu elektronları katotta alır; telde yön Zn’den Cu’ya olur.",
          ],
          optionReasons: [
            "Sülfat net tepkimede seyircidir; elektron ileten telin yerine geçmez.",
            "Sürekli aktarım için devre gerekir; verilen çalışan galvanik pilin belirli elektron yönü vardır.",
            "Elektron veren Zn anottur; dış telde elektron alan Cu katot yönüne aktarım olur.",
            "Bu ters yöndür; verilen Zn yükseltgenmesi elektronları Cu tarafına sağlar.",
            "Köprü iyon iletir; serbest elektronların dış tel yoluyla karıştırılmıştır.",
          ],
          commonError: "Geleneksel akım ile elektron akışını aynı yönde çizme.",
          check: "İki elektron bir Cu²⁺ indirgenmesine eşleşebilir.",
        },
      },
      {
        prompt:
          "Uygun Daniell hücresinde KNO₃ tuz köprüsü vardır. NO₃⁻ ve K⁺ için doğru yön çifti hangisidir?",
        options: [
          "NO₃⁻ anoda, K⁺ katoda",
          "NO₃⁻ katoda, K⁺ anoda",
          "İkisi de yalnız dış telden geçer",
          "NO₃⁻ elektronlara dönüşür",
          "K⁺ katotta Cu metaline dönüşür",
        ],
        answer: 0,
        hint: "Yük denkliğini iki kap için ayrı kur.",
        explanation:
          "Zn²⁺ oluşması anot çözeltisinde ek pozitif yük doğurur; NO₃⁻ bu tarafa gelir. Cu²⁺ tüketilmesi katot tarafında pozitif yük eksiltir; K⁺ bu tarafa gelir. Her 0,01 mol çift değerli iyon değişimi 0,02 mol tek değerli köprü iyonuyla dengelenir.",
        guidance: {
          knowledge: ["İki çözelti kendi içinde yük denkliğini korumalıdır."],
          strategy:
            "Anotta artan, katotta azalan pozitif iyon yükünü ayrı değerlendir.",
          steps: [
            "Zn²⁺ oluşması anot çözeltisinde ek pozitif yük doğurur; NO₃⁻ bu tarafa gelir.",
            "Cu²⁺ tüketilmesi katot tarafında pozitif yük eksiltir; K⁺ bu tarafa gelir.",
          ],
          optionReasons: [
            "Zn²⁺ oluşan tarafta anyon, Cu²⁺ tüketilen tarafta katyon yük denkliğini sağlar.",
            "Bu çift verilen Daniell hücresinin yük değişimlerini artırır, dengelemez.",
            "Dış telde iyon geçişi değil elektronik iletim incelenir.",
            "Köprü iyonu elektron kaynağı değildir; verilen koşulda seyirci kalır.",
            "K⁺ iyonu Cu atomu olamaz; verilen katot yarısı Cu²⁺→Cu’dur.",
          ],
          commonError: "İyon hareketini elektronun yönüne göre ezberleme.",
          check:
            "Her 0,01 mol çift değerli iyon değişimi 0,02 mol tek değerli köprü iyonuyla dengelenir.",
        },
      },
      {
        prompt:
          "25 °C için E°(Ag⁺/Ag)=+0,80 V ve E°(Cu²⁺/Cu)=+0,34 V verilmiştir. Standart galvanik Cu–Ag pilinin gerilimi kaç volttur?",
        options: ["1,14 V", "0,92 V", "−0,46 V", "0 V", "0,46 V"],
        answer: 4,
        hint: "İki sayı aynı yönün tablosundan verilmiştir.",
        explanation:
          "Ag⁺ 0,80 V ile indirgenir; Cu metali anotta yükseltgenir. E°=0,80−0,34=0,46 V bulunur; Ag yarısının 2 katsayısı gerilimi çarpmaz. Pozitif 0,46 V seçilen galvanik yönle tutarlıdır.",
        guidance: {
          knowledge: ["İki veri de indirgenme yönündeyse E°=E°katot−E°anot."],
          strategy: "Büyük indirgenme verisini katoda koy.",
          steps: [
            "Ag⁺ 0,80 V ile indirgenir; Cu metali anotta yükseltgenir.",
            "E°=0,80−0,34=0,46 V bulunur; Ag yarısının 2 katsayısı gerilimi çarpmaz.",
          ],
          optionReasons: [
            "İki indirgenme değerini doğrudan toplamak anot yönünü ters çevirmeyi unutur.",
            "Elektronları eşitlemek için katsayı kullanılması gerilimi iki kat yapmaz.",
            "Bu değer ters yazılan Ag yükseltgenmesi/Cu indirgenmesi yönü içindir.",
            "Elektrot çiftlerinin standart potansiyelleri eşit değildir.",
            "Katot Ag için 0,80’den anot Cu’nun indirgenme verisi 0,34 çıkarılır.",
          ],
          commonError: "Katsayıyla potansiyeli çarpma.",
          check: "Pozitif 0,46 V seçilen galvanik yönle tutarlıdır.",
        },
      },
      {
        prompt:
          "Yalnız Zn+Cu²⁺→Zn²⁺+Cu dönüşümü için başlangıçta 0,030 mol Zn ve 0,010 mol Cu²⁺ vardır. Stokiyometrik üst sınırda kaç mol elektron aktarılır?",
        options: [
          "0,040 mol",
          "0,020 mol",
          "0,010 mol",
          "0,030 mol",
          "0,060 mol",
        ],
        answer: 1,
        hint: "Bir mol Cu²⁺ kaç elektron alır?",
        explanation:
          "ξüst=min(0,030; 0,010)=0,010 mol olur. n(e⁻)=2ξ=0,020 mol. Bu stok üst sınırıdır, gerçek son denge hesabı değildir. Üst sınırda 0,020 mol Zn fazla kalır.",
        guidance: {
          knowledge: [
            "Önce sınırlayıcı reaktif bulunur; sonra elektron katsayısı uygulanır.",
          ],
          strategy: "İki stoktan küçük olan 1: 1 ilerlemeyi sınırlar.",
          steps: [
            "ξüst=min(0,030; 0,010)=0,010 mol olur.",
            "n(e⁻)=2ξ=0,020 mol. Bu stok üst sınırıdır, gerçek son denge hesabı değildir.",
          ],
          optionReasons: [
            "Zn ve Cu²⁺ molünü toplamak tepkimenin 1: 1 eşleşmesini karşılamaz.",
            "Cu²⁺ 0,010 mol ile sınırlayıcıdır; her mol Cu²⁺ 2 mol e⁻ alır.",
            "Bu Cu²⁺ molüdür; iki elektron katsayısı henüz uygulanmamıştır.",
            "Başlangıç Zn molünü doğrudan elektron molü sanmaktır.",
            "Bütün Zn’nin kullanılacağını varsayar; Cu²⁺ stoku buna yetmez.",
          ],
          commonError: "Fazla metali sınırlayıcı iyonu yok sayarak tüketme.",
          check: "Üst sınırda 0,020 mol Zn fazla kalır.",
        },
      },
      {
        prompt:
          "Aynı elektrot çifti, sıcaklık ve iyon etkinlikleri korunuyor. Metal çubukların kullanılabilir miktarı artırılırsa hangi yargı doğrudur?",
        options: [
          "Anot ve katot adları yer değiştirir",
          "Elektron katsayısı iki kat olur",
          "Her koşulda çalışma süresi tam iki kat olur",
          "Başlangıç denge gerilimi otomatik artmaz",
          "Gerilim gramla doğru orantılı artar",
        ],
        answer: 3,
        hint: "Kimyasal koşullar mı, yalnız stok mu değişti?",
        explanation:
          "E, aynı sıcaklık ve etkinliklerde yalnız çubuk gramını artırmakla zorunlu değişmez. Daha büyük stok, başka reaktif sınırlamıyorsa kullanılabilir yükü artırabilir; kesin saat verilmez. Sabit derişimde hacim artışı da başlangıç E’yi zorunlu artırmaz.",
        guidance: {
          knowledge: [
            "Gerilim yoğunluk niteliğinde bir fark; kapasite reaktif stoku ve kullanım koşullarıyla ilgilidir.",
          ],
          strategy:
            "Sabit tutulan etkinliklerle yalnız miktar değişimini ayır.",
          steps: [
            "E, aynı sıcaklık ve etkinliklerde yalnız çubuk gramını artırmakla zorunlu değişmez.",
            "Daha büyük stok, başka reaktif sınırlamıyorsa kullanılabilir yükü artırabilir; kesin saat verilmez.",
          ],
          optionReasons: [
            "Sadece stok artışı redoks rollerini değiştirmez.",
            "Dengeli kimyasal denklemde elektron oranı metal kalınlığıyla değişmez.",
            "Sınırlayıcı diğer reaktif, akım ve kullanım koşulları verilmeden süre oranı kesin değildir.",
            "Gerilim aynı kimyasal çift ve etkinliklerde aynı kalabilir; stok kapasitesi ayrı büyüklüktür.",
            "Gram ile volt arasında böyle bir doğru orantı yoktur.",
          ],
          commonError: "Kapasite ile gerilimi aynı ölçek sanma.",
          check:
            "Sabit derişimde hacim artışı da başlangıç E’yi zorunlu artırmaz.",
        },
      },
      {
        prompt:
          "Zn/Zn²⁺ yarısı, H⁺ içeren asit ve inert Pt yüzeyiyle çalışan galvanik pil oluşturuyor. Katotta 2 H⁺+2e⁻→H₂ gerçekleşiyor. Hangisi zorunlu değildir?",
        options: [
          "H₂ ürününün elektron alımına bağlanması",
          "Katotta metal kütlesinin artması",
          "Katotta indirgenme olması",
          "Anotta Zn’nin yükseltgenmesi",
          "Dış devrede elektron aktarımı olması",
        ],
        answer: 1,
        hint: "Katot yarısında gerçekten ne oluşuyor?",
        explanation:
          "Katotta H⁺ iyonları elektron alıp H₂ oluşturur. Pt uygun yüzeydir; verilen denklem Pt metali veya başka metal birikimi gerektirmez. H atomu sayısı 2, iki taraftaki toplam yük 0 olur.",
        guidance: {
          knowledge: [
            "Katot indirgenme yeridir; ürün her zaman kaplanan metal değildir.",
          ],
          strategy: "Verilen yarı denklemin ürününe bak.",
          steps: [
            "Katotta H⁺ iyonları elektron alıp H₂ oluşturur.",
            "Pt uygun yüzeydir; verilen denklem Pt metali veya başka metal birikimi gerektirmez.",
          ],
          optionReasons: [
            "2 H⁺ için 2e⁻ verilmiştir; ürün bu alımın sonucudur.",
            "Verilen ürün H₂ gazıdır; inert Pt üzerinde metal birikmesi zorunlu değildir.",
            "H⁺ elektron alır; bu indirgenme tanımıdır ve zorunludur.",
            "Verilen çalışan çiftte Zn elektron veren yarıdır.",
            "Çalışan pilin redoks yarıları dış elektronik yolla bağlanmıştır.",
          ],
          commonError: "Katot kelimesini kütle artışıyla özdeşleştirme.",
          check: "H atomu sayısı 2, iki taraftaki toplam yük 0 olur.",
        },
      },
      {
        prompt:
          "Zn(k)|Zn²⁺(suda)||Cu²⁺(suda)|Cu(k) pil gösteriminde çift çizgi neyi temsil eder?",
        options: [
          "Elektron sayısının iki olduğunu",
          "Çinko ile bakırın aynı katı faz olduğunu",
          "Gerilimin iki volt olduğunu",
          "Suyun her iki kapta tükendiğini",
          "Yarı hücreler arası iyonik bağlantıyı",
        ],
        answer: 4,
        hint: "Çift çizgi iki yarıyı bağlayan hangi parçaya karşılık gelir?",
        explanation:
          "Tek çizgiler metal/çözelti gibi faz sınırlarıdır. Çift çizgi iki yarı hücre arasında iyon iletişimini sağlayan bağlantıyı gösterir. Dış teldeki elektron yolu şemada ayrıca fiziksel düzenekle gösterilebilir.",
        guidance: {
          knowledge: [
            "Pil gösterimi faz sınırlarını ve yarı hücre bağlantısını ayırır.",
          ],
          strategy: "Tek çizgi ile çift çizginin işlevini karşılaştır.",
          steps: [
            "Tek çizgiler metal/çözelti gibi faz sınırlarıdır.",
            "Çift çizgi iki yarı hücre arasında iyon iletişimini sağlayan bağlantıyı gösterir.",
          ],
          optionReasons: [
            "Elektron katsayısı gösterimdeki çizgi sayısından bulunmaz.",
            "Çift çizgi iki ayrı yarı hücreyi ayırır; aynı metal fazını belirtmez.",
            "Sembolden sayı olarak volt okunmaz; potansiyel verileri gerekir.",
            "Bu simge net tepkimede su tüketimi hakkında bilgi vermez.",
            "Çift çizgi tuz köprüsü/uygun iyonik bağlantı gösterimidir.",
          ],
          commonError: "Çizgileri sayısal katsayı sanma.",
          check:
            "Dış teldeki elektron yolu şemada ayrıca fiziksel düzenekle gösterilebilir.",
        },
      },
      {
        prompt:
          "Uygun galvanik hücrede dış tel açık ve ideal voltmetreyle denge gerilimi ölçülebiliyor. Aşağıdaki yorumlardan hangisi yanlıştır?",
        options: [
          "Büyük ve sürekli dış devre akımı mutlaka akıyordur.",
          "İki yarı hücre arasında potansiyel farkı bulunur.",
          "Voltmetre gerilim ölçmek için kullanılır.",
          "Akım ve gerilim farklı büyüklüklerdir.",
          "Sürekli akım için elektronik yolun tamamlanması gerekir.",
        ],
        answer: 0,
        hint: "Soru volt mu amper mi ölçüyor?",
        explanation:
          "İdeal voltmetre akım çekmeden potansiyel farkını gösterir; gerçek yüksek dirençli ölçerde akım çok küçük olabilir. Bu değer büyük sürekli akım veya güç ölçümü değildir; telin açık olması aktarım yolunu keser. Açık devre gerilimi ile yük altı uç gerilimi de farklı olabilir.",
        guidance: {
          knowledge: [
            "Volt potansiyel farkı, amper birim zamanda yük aktarımıdır.",
          ],
          strategy: "Ölçümün hangi fiziksel büyüklüğe ait olduğunu belirle.",
          steps: [
            "İdeal voltmetre akım çekmeden potansiyel farkını gösterir; gerçek yüksek dirençli ölçerde akım çok küçük olabilir.",
            "Bu değer büyük sürekli akım veya güç ölçümü değildir; telin açık olması aktarım yolunu keser.",
          ],
          optionReasons: [
            "Açık devre gerilimi ile büyük sürekli yük akımı ayrı büyüklüklerdir.",
            "Ölçülen denge gerilimi bu farkı bildirir.",
            "Düzenekte verilen cihazın görevi gerilim ölçümüdür.",
            "Gerilim farkı ölçümü akım miktarı ölçümü değildir.",
            "Açık dış yol sürekli akımı engeller; bu temel devre koşuluyla tutarlıdır.",
          ],
          commonError: "Gerilim gördüğünde doğrudan amper miktarı üretme.",
          check:
            "Açık devre gerilimi ile yük altı uç gerilimi de farklı olabilir.",
        },
      },
      {
        prompt:
          "Bir kaynak lityum iyon pillerini anlatıyor. Aşağıdaki ifadelerden hangisi bilimsel olarak en uygundur?",
        options: [
          "Hiçbiri zararlı kimyasal içermez",
          "Hepsi tam aynı çevrimde ömrünü tamamlar",
          "Li-ion farklı elektrot ve elektrolit tasarımlarını içeren bir ailedir",
          "Her Li-ion pilin anodu mutlaka saf lityum metalidir",
          "Bütün Li-ion hücreleri tam 3,6 V verir",
        ],
        answer: 2,
        hint: "Aynı ailede farklı kimya mümkün mü?",
        explanation:
          "Li-ion hücrelerde uygun iki elektrot yapısı arasında Li⁺ taşınması redoksla eşleşir. Elektrot/elektrolit ve çalışma gerilimi tasarıma göre değiştiğinden tek reçete bütün aileyi tanımlamaz. Bir aileye ait olmak bütün sayısal özelliklerin eşitliğini gerektirmez.",
        guidance: {
          knowledge: [
            "Tarihsel lityum metal örnekleriyle Li⁺ girişimli hücre ailelerini ayır.",
          ],
          strategy:
            "Her/bütün/mutlaka ifadelerinin tasarım farklılıklarını silip silmediğine bak.",
          steps: [
            "Li-ion hücrelerde uygun iki elektrot yapısı arasında Li⁺ taşınması redoksla eşleşir.",
            "Elektrot/elektrolit ve çalışma gerilimi tasarıma göre değiştiğinden tek reçete bütün aileyi tanımlamaz.",
          ],
          optionReasons: [
            "Güvenli kullanım ve geri dönüşüm gereksinimi bu genellemeyle silinemez.",
            "Kimya, sıcaklık, şarj aralığı ve takvim yaşlanması farklıdır.",
            "Aile adı bütün hücrelerde metalik Li/TiS₂/katı polimer zorunluluğu kurmaz.",
            "Yaygın girişim temelli Li-ion tasarımları bu mutlaklığı sağlamaz.",
            "Gerilim elektrot kimyasına ve çalışma durumuna bağlıdır.",
          ],
          commonError:
            "Tek tarihsel pil örneğini bütün cihazların yapısı sayma.",
          check:
            "Bir aileye ait olmak bütün sayısal özelliklerin eşitliğini gerektirmez.",
        },
      },
      {
        prompt:
          "Aynı sıcaklıkta çalışan pil boşalırken ölçülen E azalıyor. Hücrenin standart E° başvuru değeri için doğru yorum hangisidir?",
        options: [
          "E° elektron sayısıyla sıfıra bölünür",
          "E ile E° koşuldan bağımsız daima eşittir",
          "Gerilim azalması atomların yok olduğunu kanıtlar",
          "Aynı standart durum başvuru değeri tüketilmez",
          "E° her saniye aynı miktarda azalır",
        ],
        answer: 3,
        hint: "Ölçüm hangi koşula, tablo hangi koşula ait?",
        explanation:
          "Deşarj sırasında iyon etkinlikleri ve kullanılabilir stoklar değişebilir; ölçülen E bundan etkilenir. Aynı sıcaklıktaki standart veri E° tüketilmez; dengeye yaklaşma gerçek E’nin değişmesidir. Sonraki Nernst hesabı E−E° farkını Q ile açıklar.",
        guidance: {
          knowledge: [
            "E gerçek koşul, E° belirli T’de standart başvuru gerilimidir.",
          ],
          strategy: "Değişen derişim ile sabit standart tanımı ayrı tut.",
          steps: [
            "Deşarj sırasında iyon etkinlikleri ve kullanılabilir stoklar değişebilir; ölçülen E bundan etkilenir.",
            "Aynı sıcaklıktaki standart veri E° tüketilmez; dengeye yaklaşma gerçek E’nin değişmesidir.",
          ],
          optionReasons: [
            "Böyle bir ilişki veya anlamlı işlem yoktur.",
            "Standart dışı etkinliklerde anlık E farklı olabilir.",
            "Atomlar faz/tür değiştirir; madde korunur.",
            "Deşarj gerçek etkinlikleri değiştirir; E° aynı T/standart durum için tablosal başvurudur.",
            "Tablo değeri zamanla tüketilen bir stok değildir.",
          ],
          commonError: "Tablo potansiyelini reaktif gibi harcanan madde sayma.",
          check: "Sonraki Nernst hesabı E−E° farkını Q ile açıklar.",
        },
      },
    ],
  },
  {
    id: "pil-gerilimi-derisim-pilleri",
    title: "Pil gerilimi ve derişim pilleri: oran değişince yön değişir",
    detail: "detail-441",
    minutes: 115,
    objectives: [
      "Standart E° ile gerçek E’yi ve tepkime bölümü Q’yu ayır.",
      "25°C Nernst eşitliğinde üsleri ve elektron sayısını doğru kullan.",
      "Seyreltme, karıştırma ve derişim hücresinde rol değişimini hesapla.",
      "Gaz basıncı, sıcaklık ve yan tepkimelerin etkisini verilen koşullarla sınırla.",
    ],
    sections: [
      {
        title: "Tablo değeri ile hücrenin koşulu",
        paragraphs: [
          "E° belirli sıcaklıktaki standart durum başvurusudur; E hücrenin o andaki etkinliklerine karşılık gelir. Çözeltiyi seyreltmek, gaz basıncını değiştirmek veya sıcaklığı değiştirmek gerçek koşulu etkiler. Bu değişimlerin hepsini E° tablosunun zamanla yıpranması gibi okumak yerine hangi değişkenin değiştiğini açık yaz.",
          "Standart durum etkinlik kavramıyla kurulur. Seyreltik ideal yaklaşımda çözeltideki etkinlik c/(1 mol/L) ile yaklaşık gösterilebilir. Bu derste molarite kullanılarak yapılan Nernst hesapları bu varsayıma dayanır; derişik çözeltide etkinlik katsayısını veya sıvı temas potansiyelini ölçmüş olduğumuz söylenmez.",
        ],
      },
      {
        title: "Önce dengeli net tepkimeyi seç",
        paragraphs: [
          "Zn+Cu²⁺→Zn²⁺+Cu için iki elektron aktarılır ve tepkime bölümü Q=a(Zn²⁺)/a(Cu²⁺) olur. Saf Zn ve Cu katılarının etkinlikleri uygun saf faz yaklaşımında 1 kabul edildiği için bu oranda yazılmaz. Paydaki ürün ile paydadaki giren, yazdığın net yön tarafından belirlenir.",
          "Cd+2 Ag⁺→Cd²⁺+2 Ag gibi bir tepkimede Q=a(Cd²⁺)/a(Ag⁺)² yazılır. Ag⁺ katsayısı 2 olduğu için üs 2’dir. Buna karşılık n, toplam aktarılan elektron sayısı 2’dir; iyonların yüklerini rastgele toplamak değildir. Net denklem olmadan hazır anot/katot oranını her sisteme uygulama.",
        ],
      },
      {
        title: "Nernst eşitliğinin sabit sıcaklık biçimi",
        paragraphs: [
          "25°C için verilen yaklaşık eşitlik E=E°−(0,0592/n)log₁₀Q’dur. E ve E° volt, n dengeli tepkimede taşınan elektron mol katsayısıdır. Logaritmaya giren Q etkinliklerle boyutsuz kurulur; ideal molarite oranlarında birimler uygun standart derişimle sadeleşir.",
          "0,0592 sayısı her sıcaklık için aynı katsayı değildir. Başka sıcaklıkta E=E°−[RT/(n F)]ln Q biçimi ve E°’nün o sıcaklıktaki değeri gerekir. Burada ln doğal logaritmadır; 10 tabanındaki logaritmaya geçerken ln Q≈2,303 log₁₀Q dönüşümü kullanılır. Buradaki etkileşim sıcaklığı 25°C’de tutar. Sorunun 0,059 veya 0,06 gibi açık yuvarlaması verilmişse bütün işlem boyunca o veriyi tutarlı kullan.",
        ],
      },
      {
        title: "Q’nun büyüklüğünden değişimin işaretini çıkar",
        paragraphs: [
          "Q=1 ise log₁₀Q=0 ve E=E° olur. Q<1 için logaritma negatiftir; eksi bir negatif sayı çıkarıldığı için E>E° bulunur. Q>1 durumunda pozitif bir düzeltme çıkarılır ve E<E° olur. Önce bu yön kontrolünü yapmak işlem sonunda ters işareti fark etmeyi kolaylaştırır.",
          "E=E° olması, bütün iyon derişimlerinin zorunlu 1 M olduğu anlamına gelmez; örneğin iki çift değerli iyonun derişimi eşit 0,1 M olduğunda oran yine 1 olabilir. Ayrıca Q=1 ile denge aynı şey değildir. Denge için Q=K ve E=0 bağı kurulur; K’nın 1 olması ayrı bir özel koşuldur.",
        ],
      },
      {
        title: "Seyreltmede molü ve hacmi ayır",
        paragraphs: [
          "Yalnız saf su eklenip tepkime veya çökelme yoksa çözünmüş iyon molü değişmez. Son derişim n/V ile azalır; M₁V₁=M₂V₂ kullanılabilir. Daniell’de anottaki Zn²⁺ seyreltildiğinde Q azalır ve yazılan Zn→Cu yönünün E değeri artar.",
          "Katottaki Cu²⁺ seyreltildiğinde aynı oranın paydası küçülür, Q artar ve E azalır. Burada hem maddeyi hem tarafı adlandırmak önemlidir. Herhangi bir kaba su eklenmesi her pilde gerilimi artırır biçiminde tek bir kural yoktur; net tepkime bölümüne dönerek karar ver.",
        ],
      },
      {
        title: "İki çözeltiyi karıştırırken toplam molü bul",
        paragraphs: [
          "Aynı iyonu içeren ve yan tepkime vermeyen iki çözelti için toplam mol M₁V₁+M₂V₂’dir. Hacimler toplanabiliyorsa son molarite bu toplamın V₁+V₂’ye bölümüdür. Örneğin 100 mL 0,10 M çözeltiyle 100 mL 0,40 M çözeltinin son derişimi 0,25 M olur; yalnız derişimleri toplamak 0,50 M hatasını verir.",
          "Yeni derişim bir derişim pilindeki diğer tarafı aşarsa anot ve katot da yer değiştirebilir. Bu yüzden başlangıç şeklinin renklerine göre rolü sabit tutma. Önce son molariteyi hesapla, sonra aynı metal çiftinde hangi tarafın daha seyreltik olduğunu yeniden karşılaştır.",
        ],
      },
      {
        title: "Tuz ekleme ve çökelme koşulludur",
        paragraphs: [
          "Katot tepkimesinde tüketilen bir metal iyonunun derişimi artırılırsa uygun basit metal pilinde Q küçülüp E artabilir. Anotta oluşan iyonun derişimi artırılırsa Q büyüyüp E azalabilir. Çözünen tuzun gerçekten ilgili serbest iyonu sağladığı ve hacim değişiminin hesaba katıldığı belirtilmelidir.",
          "Bir çöktürücü iyonu katı faza çekerek serbest iyon etkinliğini azaltabilir; kompleks oluşturucu da toplam molarite ile serbest iyonu farklılaştırabilir. Örnekte yalnız iyon derişimi azaltma etkisi verilmişse o koşulla Q’yu kur. H₂S veya sülfür eklemeyi pH, yan tepkime ve çözünürlük bilgisi olmadan evrensel bir gerilim artırma yöntemi sayma.",
        ],
      },
      {
        title: "Elektrot gramı ile potansiyeli karıştırma",
        paragraphs: [
          "Aynı metal fazı, sıcaklık ve iyon etkinlikleri korunuyorsa elektrot kütlesini veya çözeltinin miktarını artırmak denge gerilimini doğrudan ölçeklemez. Nernst ifadesinde saf metal gramı ve aynı etkinlikteki toplam litre ayrı birer üs olarak bulunmaz. Daha büyük bir çubuk aynı kimyasal çiftte iki kat volt vermez.",
          "Bu durum gerçek yük altındaki akımın veya iç direncin hiçbir şeyden etkilenmediği anlamına gelmez. Yüzey, taşınım ve kullanılabilir stok çalışma davranışını değiştirebilir. Sorunun açık devre/denge gerilimi mi yoksa yük altında akım/ömür mü sorduğunu ayırarak kapsamı doğru tut.",
        ],
      },
      {
        title: "Gazın basıncı varsa Q’da yeri vardır",
        paragraphs: [
          "Zn+2 H⁺→Zn²⁺+H₂ yönünde Q=a(Zn²⁺)·(p H₂/p°)/a(H⁺)² olur. Diğer koşullar sabitken ürün H₂ basıncını artırmak Q’yu artırır ve yazılan yöndeki E’yi azaltır. Ters yöndeki bir hidrojen hücresinde aynı gaz giren tarafta olabilir; o zaman basıncın etkisi de ters okunur.",
          "Basınç etkisi yalnız standart hidrojen elektroduna özgü değildir; tepkimede uygun gaz türleri varsa genel Q bağı geçerlidir. Buna karşılık ilgisiz dış hava basıncını her sıvı metal hücresinin gerilimine doğrudan orantı yapma. Kullanılan gazın kısmi basıncı, fazı ve net denklemdeki katsayısı verilmelidir.",
        ],
      },
      {
        title: "Sıcaklığın etkisi evrensel ters orantı değildir",
        paragraphs: [
          "Sıcaklık hem Nernst katsayısında hem standart tepkime verilerinde rol alır. Aynı koşullarda E°’nün sıcaklığa göre değişimi tepkimenin entropi değişimiyle ilişkilidir. Bu nedenle bütün pillerde sıcaklık artınca gerilim mutlaka azalır veya E sıcaklığın tersiyle doğru biçimde ölçeklenir denemez.",
          "Bir soruda deney tablosu, ΔS bilgisi veya açıkça sınırlandırılmış bir eğilim veriliyorsa o veriyi kullan. Tepkime hızının ısınmayla değişmesi ise gerilimin aynı yönde değiştiğini tek başına kanıtlamaz. Soğukta saklama, kendi kendine boşalma ve güvenli çalışma sıcaklığı gibi kullanım konuları da ayrı kimyasal/teknik koşullardır.",
        ],
      },
      {
        title: "Aynı metalden de pil kurulabilir",
        paragraphs: [
          "Aynı Cu/Cu²⁺ çiftinin farklı iyon etkinliklerine sahip iki yarısı bir derişim hücresi oluşturabilir. İki standart yarı hücre değeri aynı olduğundan E°hücre=0’dır. Buna rağmen gerçek koşullarda iyon etkinlikleri farklıysa E sıfırdan farklı olur; enerji farkı yalnız metal adlarının farklılığından gelmez.",
          "Basit metal/metal iyonu derişim hücresinde seyreltik taraf anot, daha derişik taraf katot olur. Seyreltik tarafta metal iyonu oluşması, derişik tarafta iyon tüketilmesi farkı azaltma yönündedir. Bu kural burada aynı iyon ve değerliğe sahip uygun hücre içindir; başka tür derişim hücrelerine kör biçimde taşınmaz.",
        ],
      },
      {
        title: "Gerilimin büyüklüğü derişim oranını izler",
        paragraphs: [
          "Cu/Cu²⁺ hücresinde seyreltiğe göre daha derişik katot için E=(0,0592/2)log₁₀(cderişik/cseyreltik) yazılır. Oran 10 olduğunda E=0,0296 V, oran 100 olduğunda 0,0592 V olur. Oranı iki kat yapmak gerilimi iki kat yapmaz; bağıntı logaritmiktir.",
          "İki derişimi aynı oranla seyreltirsen ideal modelde derişim oranı ve E aynı kalabilir. Toplam stok ve pratik direnç ise değişebilir. Bu karşılaştırma, derişim farkının aritmetik değerini değil uygun etkinlik oranını kullanmanın neden gerekli olduğunu gösterir.",
        ],
      },
      {
        title: "Roller ters dönebilir, eşitlikte net yön kalmaz",
        paragraphs: [
          "Solda 0,10 M, sağda 0,20 M Cu²⁺ varken sol taraf anot, sağ taraf katottur. Soldaki derişimi 0,40 M yaparsan sol katot olur ve elektron yönü sağdan sola döner. Şeklin oku gerçek son koşulu izlemelidir; seçimi değiştirirken eski rolün okunu korumak görsel bir öğretim hatasıdır.",
          "İki tarafın etkinlikleri eşitse bu ideal derişim hücresinin gerilimi 0’dır ve bir tarafı zorunlu anot diye seçmek için net eğilim yoktur. Aynı anda her iki yönde mikroskobik değişimler olabilmesi, dış devrede sürdürülebilir net akım bulunduğunu göstermez. Sonuçta hem sıfır değeri hem yön yokluğu birlikte belirtilmelidir.",
        ],
      },
      {
        title: "Dengeye gidiş ile pratik pil bitişi",
        paragraphs: [
          "Yazılan tersinir tepkimede E=0 olduğunda Q=K ilişkisi vardır. Bu, her pilin mutlaka tam bir reaktifi matematiksel olarak sıfıra kadar tükettiği anlamına gelmez; pratikte cihaz kesme gerilimi, yavaşlama ve stok sınırları daha önce önem kazanabilir. E° tablosunun da sıfırlandığı sonucu çıkarılmaz.",
          "Bir derişim hücresinin ideal eşitlenmesi, iki farklı metalin standardındaki E°’nün yok olmasıyla aynı olay değildir. Önce hücre türünü ve tepkimeyi belirle. Standart olmayan ama Q=1 olan bir metal pilinin E=E° olması da ayrıca mümkündür; bu eşitliği otomatik denge işareti sayma.",
        ],
      },
      {
        title: "Çözerken sıra ve birim kontrolünü koru",
        paragraphs: [
          "Önce gerçek tanecikleri, yarı tepkimeleri ve net yönü yaz. Elektronları eşitleyip n’yi belirle; sonra ürün etkinliklerini paya, girenleri paydaya katsayı üsleriyle yerleştir. Sıcaklık ve logaritma tabanı uygun olduğunda E°−düzeltme hesabına geç. Bu sıra, hazır oran ezberinin çok değerli iyonlarda bozulmasını önler.",
          "Sonuç için üç kontrol kullan: Q 1’den küçükse E>E° mü, katsayıyla E° yanlış çarpıldı mı, seçilen net yönün E işareti doğru mu? Negatif sonuç, yazılan yönün verilen koşulda istemsiz olduğunu söyler; fiziksel galvanik yön ters çevrilirse gerilimin pozitif büyüklüğü raporlanabilir. Yön belirtilmeden yalnız bir sayı verme.",
        ],
      },
    ],
    examples: [
      {
        title: "Logaritma işaretini gör",
        prompt:
          "25°C’de Zn+Cu²⁺→Zn²⁺+Cu için E°=1,100 V, n=2, [Zn²⁺]=0,010 M, [Cu²⁺]=0,100 M. İdeal yaklaşım ve 0,0592/n katsayısı veriliyor. E kaçtır?",
        strategy: "Q’yu kur, logaritmanın işaretini önceden denetle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Q=0,010/0,100=0,1. Saf Zn ve Cu katıları orana yazılmaz.",
          },
          {
            label: "2. adım",
            explanation: "log₁₀0,1=−1 ve 0,0592/2=0,0296 V bulunur.",
          },
          {
            label: "3. adım",
            explanation:
              "E=1,100−0,0296×(−1)=1,1296 V. Q<1 olduğundan E’nin E°’den büyük çıkması beklenir.",
          },
        ],
        answer: "E=1,1296 V.",
        check: "1,1296>1,100 yön kontrolünü sağlar.",
        pitfall: "Negatif logaritmayı çıkarırken işareti ters yapma.",
      },
      {
        title: "Üs doğruysa Q bir olabilir",
        prompt:
          "25°C’de Cd+2 Ag⁺→Cd²⁺+2 Ag için E°=1,202 V, n=2, [Cd²⁺]=0,010 M, [Ag⁺]=0,100 M. İdeal etkinlik ve 0,0592/n kullanılıyor. E nedir?",
        strategy: "Ag⁺ katsayısını derişimin üssüne taşı.",
        steps: [
          {
            label: "1. adım",
            explanation: "Q=[Cd²⁺]/[Ag⁺]²=0,010/(0,100)² olarak yazılır.",
          },
          {
            label: "2. adım",
            explanation:
              "Payda 0,010 olduğundan Q=1 ve log₁₀Q=0’dır; iyonların ikisi de 1 M olmak zorunda değildir.",
          },
          {
            label: "3. adım",
            explanation:
              "E=1,202−0=1,202 V. Bu E=E° eşitliği tek başına E=0 denge anlamına gelmez.",
          },
        ],
        answer: "E=1,202 V.",
        check:
          "n=2 ve Ag⁺ üssü 2 ayrı görevlerdir; hiçbir E° sayısı katsayıyla çarpılmadı.",
        pitfall: "Ag⁺ derişimini karesiz yazma.",
      },
      {
        title: "Derişim hücresinde karışımla yön değişsin",
        prompt:
          "25°C’de iki Cu/Cu²⁺ yarısında başlangıçta solda 100 mL 0,10 M, sağda 100 mL 0,20 M çözelti var. Sola 100 mL 0,40 M aynı iyon çözeltisi ekleniyor; hacimler toplanıyor, yan tepkime yok. Son anot neresi ve E kaçtır? n=2, 0,0592/n veriliyor.",
        strategy: "Önce son molariteyi bul, sonra rolleri yeniden ata.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Soldaki mol 0,100×0,10+0,100×0,40=0,050 mol; son hacim 0,200 L, dolayısıyla sol derişim 0,25 M’dir.",
          },
          {
            label: "2. adım",
            explanation:
              "Sağ 0,20 M artık daha seyreltiktir; sağ anot, sol katot olur. Elektron aktarımı sağdan sola yönelir.",
          },
          {
            label: "3. adım",
            explanation:
              "Pozitif galvanik büyüklük E=0,0296log₁₀(0,25/0,20)≈0,00287 V bulunur.",
          },
        ],
        answer: "Sağ anot; elektron sağdan sola, E≈0,00287 V.",
        check:
          "1,25 oranı 10’dan küçük olduğu için gerilim 0,0296 V’tan küçüktür.",
        pitfall:
          "Başlangıçta anot olan tarafın karışım sonrası da aynı kalacağını varsayma.",
      },
      {
        title: "Seyreltme eşitliği sonlandırabilir",
        prompt:
          "İdeal 25°C Cu/Cu²⁺ derişim hücresinde sol 0,10 M/100 mL, sağ 1,00 M/100 mL. Yalnız sağa 900 mL saf su ekleniyor; hacimler toplanıyor, yan tepkime yok. Son E ve net yön nedir?",
        strategy: "İyon molünü koruyup iki son etkinliği karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Sağ başlangıç molü 1,00×0,100=0,100 mol, son hacim 1,000 L olur. Son derişim 0,10 M’dir.",
          },
          {
            label: "2. adım",
            explanation:
              "Sol taraf hâlâ 0,10 M olduğundan ideal etkinlikler eşittir; Q oranı 1 olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu aynı metal hücresinde E°=0 ve E=−0,0296log₁₀1=0 V. Zorunlu bir net elektron yönü kalmaz.",
          },
        ],
        answer: "E=0 V; net yön yok.",
        check:
          "İki kapta toplam iyon miktarı farklı olabilir; eşit olan derişim/etkinliktir.",
        pitfall:
          "Eşit derişim için toplam molün de eşit olması gerektiğini sanma.",
      },
    ],
    recall: [
      {
        prompt: "Q’da saf katı metallerin gramları yazılır mı?",
        answer:
          "Uygun saf faz yaklaşımında etkinlikleri 1’dir; gram stokları Q’ya ek çarpan olmaz.",
      },
      {
        prompt: "Q=1 hangi eşitliği verir?",
        answer:
          "Verilen Nernst biçiminde E=E°. Denge için ayrıca E=0 ve Q=K gerekir.",
      },
      {
        prompt: "Aynı metal derişim hücresinde hangi taraf anottur?",
        answer:
          "Bu basit metal/metal iyonu modelinde daha seyreltik taraf anottur; derişim değişirse rol yeniden hesaplanır.",
      },
      {
        prompt: "Sıcaklık her pilin gerilimini aynı yönde değiştirir mi?",
        answer:
          "Hayır. Sıcaklık bağı için uygun E°(T), entropi veya deney verisi gerekir; 25°C katsayısı her T’ye taşınmaz.",
      },
    ],
    questions: [
      {
        prompt:
          "25°C’de Zn+Cu²⁺→Zn²⁺+Cu yönü için E°=1,100 V, n=2, Q=0,01 veriliyor. E=E°−(0,0592/n)log₁₀Q ile E kaç volttur?",
        options: ["1,1592 V", "1,0408 V", "1,1296 V", "2,2000 V", "0 V"],
        answer: 0,
        hint: "0,01 hangi 10 kuvvetidir?",
        explanation:
          "log₁₀Q=−2 ve katsayı 0,0296 V’tur. E=1,100+0,0592=1,1592 V. Sonuç E°’den büyüktür; Q<1 yönüyle uyumludur.",
        guidance: {
          knowledge: ["25°C’de logaritmik düzeltmede Q<1 için E>E° olur."],
          strategy: "Önce logaritmayı, sonra 0,0592/2 katsayısını hesapla.",
          steps: [
            "log₁₀Q=−2 ve katsayı 0,0296 V’tur.",
            "E=1,100+0,0592=1,1592 V.",
          ],
          optionReasons: [
            "log₁₀0,01=−2; 1,100−0,0296×(−2)=1,1592 V.",
            "Negatif logaritmanın işareti yanlış çıkarılırsa bu düşük sonuç bulunur.",
            "Bu değer Q=0,1 için olur; Q=0,01’in logaritması −2’dir.",
            "Elektron katsayısı potansiyeli ikiyle çarpmaz.",
            "Q=0,01 verilmesi E=0 denge koşulunu sağlamaz.",
          ],
          commonError: "Eksi negatif sayı çıkarma adımını kaybetme.",
          check: "Sonuç E°’den büyüktür; Q<1 yönüyle uyumludur.",
        },
      },
      {
        prompt:
          "Cd+2 Ag⁺→Cd²⁺+2 Ag tepkimesi için ideal derişim yaklaşımında Q hangisidir? Saf katı etkinlikleri 1 alınacaktır.",
        options: [
          "[Cd²⁺]/[Ag⁺]",
          "[Cd²⁺][Ag⁺]",
          "m(Cd)/m(Ag)",
          "[Cd²⁺]/[Ag⁺]²",
          "[Ag⁺]²/[Cd²⁺]",
        ],
        answer: 3,
        hint: "Katsayı 2’nin Q’daki görevi nedir?",
        explanation:
          "Cd²⁺ ürün olduğundan paya tek kuvvetle yazılır. İki Ag⁺ giren olduğundan paydaya [Ag⁺]² gelir; saf metallerin etkinliği 1’dir. Q, verilen net yön için [Cd²⁺]/[Ag⁺]²’dir.",
        guidance: {
          knowledge: [
            "Tepkime bölümünde ürünler paya, girenler paydaya; katsayılar üs olur.",
          ],
          strategy: "Dengeli net tepkimeye göre her çözünmüş türü yerleştir.",
          steps: [
            "Cd²⁺ ürün olduğundan paya tek kuvvetle yazılır.",
            "İki Ag⁺ giren olduğundan paydaya [Ag⁺]² gelir; saf metallerin etkinliği 1’dir.",
          ],
          optionReasons: [
            "Ag⁺ üzerindeki 2 katsayısı üs olarak unutulmuştur.",
            "Girenin etkinliği çarpımda değil paydada yer alır.",
            "Saf katıların gramları verilen etkinlik bölümüne yazılmaz.",
            "Ürün Cd²⁺ oranın üst kısmındadır; giren Ag⁺ katsayısı 2 olduğu için karesi paydaya gelir.",
            "Bu ters tepkimenin bölümüdür; verilen net yönü ters çevirir.",
          ],
          commonError: "Katsayıyı üsten bağımsız sanma.",
          check: "Q, verilen net yön için [Cd²⁺]/[Ag⁺]²’dir.",
        },
      },
      {
        prompt:
          "25°C ideal Cu/Cu²⁺ derişim hücresinde solda 0,010 M, sağda 1,00 M çözelti var. n=2 ve E°hücre=0. Pozitif galvanik gerilim ve anot hangisidir? 0,0592/n kullanın.",
        options: [
          "1,100 V; sol anot",
          "0,0592 V; sol anot",
          "0,0296 V; sol anot",
          "0,0592 V; sağ anot",
          "0 V; iki metal aynı olduğu için",
        ],
        answer: 1,
        hint: "Oran 10 mu 100 mü?",
        explanation:
          "Sağ/sol oranı 1/0,010=100’dür. E=0,0296×2=0,0592 V; elektronlar soldan sağa aktarılır. Derişim farkı sıfır değildir; E’nin pozitif büyüklüğü vardır.",
        guidance: {
          knowledge: [
            "Aynı metal çiftinin E° farkı 0, gerçek E etkinlik oranına bağlıdır.",
          ],
          strategy:
            "Seyreltik tarafı anot seç; derişik/seyreltik oranının logunu al.",
          steps: [
            "Sağ/sol oranı 1/0,010=100’dür.",
            "E=0,0296×2=0,0592 V; elektronlar soldan sağa aktarılır.",
          ],
          optionReasons: [
            "1,100 V Daniell standart örneğine aittir; bu Cu/Cu çiftine taşınamaz.",
            "Derişim oranı 100, log 100=2 ve 0,0296×2=0,0592 V; sol daha seyreltiktir.",
            "Bu gerilim 10 kat oran içindir; burada 100 kat vardır.",
            "Büyüklük doğru fakat basit metal derişim hücresinde seyreltik sol anottur.",
            "Aynı metal E°’yü sıfır yapar; farklı etkinlikte gerçek E sıfır olmayabilir.",
          ],
          commonError: "Aynı metalden dolayı bütün gerilimleri 0 sayma.",
          check:
            "Derişim farkı sıfır değildir; E’nin pozitif büyüklüğü vardır.",
        },
      },
      {
        prompt:
          "25°C ideal Daniell hücresinde yalnız anot Zn²⁺ çözeltisine saf su ekleniyor. İyon molü korunuyor, yan tepkime yok; diğer taraf değişmiyor. Yazılan Zn+Cu²⁺→Zn²⁺+Cu yönünün E değeri nasıl değişir?",
        options: [
          "Azalır",
          "Kesinlikle değişmez",
          "E° tablosu sıfıra iner",
          "Elektron katsayısı 1 olur",
          "Artar",
        ],
        answer: 4,
        hint: "Zn²⁺, Q’nun hangi tarafında?",
        explanation:
          "Zn²⁺ derişimi azalır; Cu²⁺ değişmediğinden Q küçülür. E=E°−0,0296log Q olduğundan E yükselir. E° aynı 25°C başvurusudur; değişen E’dir.",
        guidance: {
          knowledge: [
            "Daniell net tepkimesinde Q=[Zn²⁺]/[Cu²⁺] olur; saf Zn ve Cu fazlarının etkinlikleri 1 kabul edilir.",
          ],
          strategy:
            "Su eklenince hangi serbest iyonun oranı değiştirdiğine bak.",
          steps: [
            "Zn²⁺ derişimi azalır; Cu²⁺ değişmediğinden Q küçülür.",
            "E=E°−0,0296log Q olduğundan E yükselir.",
          ],
          optionReasons: [
            "Bu, katot Cu²⁺ seyreltilmesine ait etkiyle karıştırılmıştır.",
            "Etkinlik oranı değiştiği için Nernst düzeltmesi de değişir.",
            "Seyreltme tablodaki standart başvuru değerini tüketmez.",
            "Seyreltme dengeli net redokstaki 2 elektronu değiştirmez.",
            "Zn²⁺ paydada değil paydadır; pay küçülünce Q azalır ve E artar.",
          ],
          commonError: "Her kaba su eklemenin aynı etkiyi yaptığını sanma.",
          check: "E° aynı 25°C başvurusudur; değişen E’dir.",
        },
      },
      {
        prompt:
          "İki Cu/Cu²⁺ yarısında son etkinlikler eşittir; sıcaklık aynıdır ve sıvı temas potansiyeli yok sayılır. Hangisi doğrudur?",
        options: [
          "E° kimyasal olarak tüketilmiştir",
          "Elektronların yükü artık değişmiştir",
          "İdeal hücre E=0; net galvanik yön yok",
          "Sol taraf her koşulda anottur",
          "Sağ taraf her koşulda katottur",
        ],
        answer: 2,
        hint: "Etkinlik oranı kaç olur?",
        explanation:
          "İki yarının standart indirgenme verileri aynı olduğundan fark 0’dır. Etkinlikler eşitken düzeltme de 0; dış net yönü seçecek gerilim kalmaz. Mikroskobik değişimler net dış akımla aynı değildir.",
        guidance: {
          knowledge: [
            "Bu basit derişim hücresinde farkı etkinlik oranı doğurur.",
          ],
          strategy: "E°0 ve log 1=0’ı birlikte kullan.",
          steps: [
            "İki yarının standart indirgenme verileri aynı olduğundan fark 0’dır.",
            "Etkinlikler eşitken düzeltme de 0; dış net yönü seçecek gerilim kalmaz.",
          ],
          optionReasons: [
            "E°0 olması aynı çiftin standart farkıdır; tüketilme değildir.",
            "Hücre koşulu temel elektron yükünü değiştirmez.",
            "Aynı çift için E°=0 ve etkinlik oranı 1 olduğundan E=0 olur.",
            "Rol konumla değil etkinlikle belirlenir; eşitlikte belirli net yön yoktur.",
            "Başlangıç çiziminin rolünü eşitlikten sonra zorla korumaktır.",
          ],
          commonError: "Eşitlikte bile sol-sağ etiketlerini zorunlu rol sanma.",
          check: "Mikroskobik değişimler net dış akımla aynı değildir.",
        },
      },
      {
        prompt:
          "Bir Cu/Cu²⁺ derişim hücresinde solda 100 mL 0,10 M, sağda 100 mL 0,20 M çözelti var. Sola 100 mL 0,40 M aynı iyon çözeltisi ekleniyor; hacimler toplanıyor, yan tepkime yok. Son durumda hangi taraf anottur?",
        options: [
          "Karışım sonunda iki taraf da 0,30 M olur.",
          "Sağ taraf",
          "Sol taraf",
          "İki taraf da eşit derecede anot",
          "İki taraf da katot",
        ],
        answer: 1,
        hint: "0,10+0,40 toplamı doğrudan son molarite mi?",
        explanation:
          "Sol n=0,100×0,10+0,100×0,40=0,050 mol, son V=0,200 L. Sol 0,25 M; sağ 0,20 M olduğundan sağ anot olur. Elektron yönü sağdan sola döner.",
        guidance: {
          knowledge: ["Karıştırmada toplam mol bölü toplam hacim kullanılır."],
          strategy:
            "Önce son sol molariteyi hesapla; sonra seyreltik tarafı bul.",
          steps: [
            "Sol n=0,100×0,10+0,100×0,40=0,050 mol, son V=0,200 L.",
            "Sol 0,25 M; sağ 0,20 M olduğundan sağ anot olur.",
          ],
          optionReasons: [
            "Karışım molü toplam hacme bölünür; son derişimler sol 0,25 M ve sağ 0,20 M olur. İki tarafın 0,30 M olması hesap hatasıdır.",
            "Solda toplam 0,050 mol/0,200 L=0,25 M olur; sağ 0,20 M daha seyreltiktir.",
            "Bu başlangıç rolüdür; karışım sonrası 0,25 M olan sol daha derişiktir.",
            "Son derişimler 0,25 ve 0,20 M eşit değildir.",
            "Kapalı çalışan hücrede net yükseltgenme yarısı da gerekir.",
          ],
          commonError:
            "Derişimleri doğrudan toplama veya başlangıç okunu koruma.",
          check: "Elektron yönü sağdan sola döner.",
        },
      },
      {
        prompt:
          "Aynı sıcaklıkta bir pilin tepkimesi katsayılarıyla iki katına yazılıyor. Nernst düzeltmesinin aynı kalmasını hangi eşleşme açıklar?",
        options: [
          "n aynı kalır, Q ikiyle çarpılır",
          "E° iki kat olur, n aynı kalır",
          "Q sıfır olur",
          "Logaritma kullanılamaz",
          "n iki kat olur, Q’nun karesi alınır",
        ],
        answer: 4,
        hint: "logQ², log Q’nun kaç katıdır?",
        explanation:
          "Qyeni=Q² ve nyeni=2n olur. (0,0592/2n)logQ²=(0,0592/n)log Q; gerilim değişmez. E° de aynı kaldığından E aynıdır.",
        guidance: {
          knowledge: [
            "Net tepkime ölçeklenince bütün katsayılar ve elektron sayısı birlikte ölçeklenir.",
          ],
          strategy: "Yeni Q ve yeni n’yi aynı adımda karşılaştır.",
          steps: [
            "Qyeni=Q² ve nyeni=2n olur.",
            "(0,0592/2n)logQ²=(0,0592/n)log Q; gerilim değişmez.",
          ],
          optionReasons: [
            "Denklem ölçeklemesi Q’yu 2Q yapmaz; üsleri ölçekler.",
            "Standart gerilim katsayıyla çarpılmaz ve elektron sayısı ölçeklenir.",
            "Denklemi ölçeklemek etkinlikleri sıfır yapmaz.",
            "Etkinlikler pozitifken aynı Nernst hesabı geçerlidir.",
            "logQ²=2log Q; paydadaki 2n ile çarpan 2 sadeleşir.",
          ],
          commonError: "Yalnız n’yi değiştirip Q üslerini eski bırakma.",
          check: "E° de aynı kaldığından E aynıdır.",
        },
      },
      {
        prompt:
          "Zn+2 H⁺→Zn²⁺+H₂ yönü için sıcaklık ve iyon etkinlikleri sabit tutuluyor. Ürün H₂ gazının kısmi basıncı artarsa yazılan yöndeki E ne olur?",
        options: [
          "Azalır",
          "Artar",
          "Basınç hiçbir gaz hücresini etkilemez",
          "Elektron sayısı 4 olur",
          "Zn metalinin atom numarası değişir",
        ],
        answer: 0,
        hint: "Gaz Q’nun payında mı?",
        explanation:
          "H₂ ürün olduğundan kısmi basıncındaki artış Q’yu artırır. E=E°−(0,0592/2)log Q olduğundan E azalır. Ters yazılan tepkimede basınç etkisinin işareti de ters okunur.",
        guidance: {
          knowledge: ["Q=a Zn²⁺·(p H₂/p°)/a H⁺² biçimindedir."],
          strategy: "Verilen net yönde gaz ürün mü giren mi belirle.",
          steps: [
            "H₂ ürün olduğundan kısmi basıncındaki artış Q’yu artırır.",
            "E=E°−(0,0592/2)log Q olduğundan E azalır.",
          ],
          optionReasons: [
            "Q’da ürün H₂ kısmi basıncı oranın üst kısmındadır; Q artınca E azalır.",
            "Ürün gazının etkisi giren gazın ters yönüyle karıştırılmıştır.",
            "Gaz etkinliği Q’ya girer; basınç etkisi vardır.",
            "Gaz basıncı net denklemin elektron katsayısını değiştirmez.",
            "Basınç değişimi kimyasal element kimliğini değiştirmez.",
          ],
          commonError: "SHE her zaman aynı rolde sanılıp yönü ezberleme.",
          check:
            "Ters yazılan tepkimede basınç etkisinin işareti de ters okunur.",
        },
      },
      {
        prompt:
          "Belirli bir pil için sıcaklığa bağlı E° tablosu, entropi veya deney eğilimi verilmemiştir. Yalnız sıcaklığın yükseltildiği biliniyor. Hangi yorum en sağlamdır?",
        options: [
          "Gerilim bütün pillerde mutlaka artar",
          "0,0592 katsayısı her T’de aynen kalır",
          "Elektron yükü sıcaklıkla iki katına çıkar",
          "Bütün piller için tek bir gerilim yönü çıkarılamaz",
          "Gerilim bütün pillerde mutlaka azalır",
        ],
        answer: 3,
        hint: "Soruda T’ye ait hangi ek veri var?",
        explanation:
          "Aynı tepkime için E°(T) veya uygun termodinamik/deney verisi gerekir. Yalnız ısınma bilgisi tüm hücrelerde E’nin artış/azalış yönünü zorunlu vermez. Sayısal 25°C formülü başka T’ye veri olmadan taşınmaz.",
        guidance: {
          knowledge: [
            "Sıcaklık, denge verisi ve Nernst katsayısına etki eder; hız ile gerilim aynı değildir.",
          ],
          strategy: "Eksik sıcaklık verisini evrensel kural gibi doldurma.",
          steps: [
            "Aynı tepkime için E°(T) veya uygun termodinamik/deney verisi gerekir.",
            "Yalnız ısınma bilgisi tüm hücrelerde E’nin artış/azalış yönünü zorunlu vermez.",
          ],
          optionReasons: [
            "Ters yöndeki bu mutlak genelleme de desteklenmez.",
            "Bu yaklaşık sayı 25°C biçimine aittir.",
            "Temel elektron yükü sıcaklık artışıyla böyle değişmez.",
            "E°’nün T bağı ve Nernst katsayısı birlikte önemlidir; evrensel ters orantı yoktur.",
            "Bu genelleme sıcaklık bağı bilinmeyen her tepkimeye uygulanamaz.",
          ],
          commonError:
            "Sıcaklık tepkimeyi hızlandırabilir bilgisini E’nin yönü sanma.",
          check: "Sayısal 25°C formülü başka T’ye veri olmadan taşınmaz.",
        },
      },
      {
        prompt:
          "25°C’de farklı metal hücresinde E°=0,46 V ve Q=1 veriliyor. Nernst eşitliğine göre hangisi doğrudur?",
        options: [
          "E° artık 0 V olur",
          "Derişimlerin hepsi mutlaka 1 M’dir",
          "E=0,46 V; bu bilgi tek başına denge değildir",
          "E=0 V; çünkü Q=1 her zamanK’dır",
          "E=0,92 V; çünkü iki elektrot vardır",
        ],
        answer: 2,
        hint: "Denge için E kaç olmalı?",
        explanation:
          "Q=1 için log Q=0, düzeltme yoktur. E=0,46 V olduğu için verilen yazılı yönde net eğilim vardır; denge kanıtlanmaz. Standart olmayıp Q=1 veren derişim örnekleri mümkündür.",
        guidance: {
          knowledge: ["Q=1, E=E° verir; denge koşulu Q=K ve E=0’dır."],
          strategy: "Birbirine benzeyen iki eşitliği ayır.",
          steps: [
            "Q=1 için log Q=0, düzeltme yoktur.",
            "E=0,46 V olduğu için verilen yazılı yönde net eğilim vardır; denge kanıtlanmaz.",
          ],
          optionReasons: [
            "Q’nun değeri standart başvuru potansiyelini değiştirmez.",
            "Q oranı 1, standart olmayan eşit etkinliklerde de sağlanabilir.",
            "log 1=0 olduğu için E=E°; denge için E=0 gerekir.",
            "Q=1’in denge sabiti olduğunu söyleyen bir veri yoktur.",
            "Elektrot sayısı gerilimi bu biçimde çarpmaz.",
          ],
          commonError: "Q=1 ile dengeyi özdeşleştirme.",
          check: "Standart olmayıp Q=1 veren derişim örnekleri mümkündür.",
        },
      },
    ],
  },
  {
    id: "elektroliz",
    title: "Elektroliz: dış enerji, doğru ürün ve doğru elektrot",
    detail: "detail-442",
    minutes: 115,
    objectives: [
      "Elektrolitik ve galvanik hücrede enerji yönünü ve kutup işaretlerini ayır.",
      "Sulu ortamla eriyikte yarışan tanecikleri doğru belirle.",
      "İnert/aktif anot, kaplama ve su elektrolizinin dengeli yarı tepkimelerini kur.",
      "Ürün miktarını verilen elektron bütçesiyle ve açık koşullarla ilişkilendir.",
    ],
    sections: [
      {
        title: "Dış elektrik enerjisi kimyasal değişim sağlar",
        paragraphs: [
          "Elektrolizde uygun dış elektrik kaynağı, verilen net yönde kendiliğinden ilerlemeyen bir redoks dönüşümünü sürdürebilir. Kimyasal enerji elektrik olarak alınmak yerine elektrik enerjisi kimyasal değişime harcanır. Bunun gerçekleşmesi için yalnız bir pil simgesi değil, uygun elektrotlar, iyonik ortam ve tamamlanmış devre gerekir.",
          "Her istemsiz tepkimeyi herhangi bir gerilimle istediğin ürüne çeviremezsin. Yarışan tepkimeler, elektrot yüzeyi ve taşınım sonucu belirler. Bu ünitenin modellerinde baskın yarı tepkimeler ve yeterli güç kaynağı açık verilir; dışarıdaki bütün endüstriyel elektroliz ürünlerini kendiliğinden çözen bir makine olduğu iddia edilmez.",
        ],
      },
      {
        title: "Tanımlar aynı, elektrot işaretleri farklıdır",
        paragraphs: [
          "Anot her zaman yükseltgenme, katot indirgenme yeridir. Elektrolitik hücrede üretecin pozitif ucuna bağlanan elektrot anot, negatif ucuna bağlanan elektrot katot olur. Galvanik hücredeki anot negatif/katot pozitif işaretini bu düzeneğe aynen taşımak en yaygın yön hatalarındandır.",
          "Uçları ters bağlamak uygun simetrik elektrotlu örnekte fiziksel konumların rolünü değiştirir; sol-sağ etiketleri yeniden kurulmalıdır. Metalin adı hangi ürünün kesin çıkacağını tek başına söylemez. Elektrot aktif olarak çözünüyor mu, inert mi ve çözeltide hangi türler var sorularını işaretlerden sonra birlikte incele.",
        ],
      },
      {
        title: "Elektron yolu ile iyon yolunu ayır",
        paragraphs: [
          "Güç kaynağının negatif tarafı katoda elektron sağlar; anotta yükseltgenmeyle verilen elektronlar dış devrede pozitif uç yönüne alınır. Çözeltide ise katyon ve anyonların hareketi yük aktarımını tamamlar. Katot çevresinde indirgenme gerçekleşmesi, çözeltinin serbest elektronlarla dolu olduğu anlamına gelmez.",
          "İyonların belirli elektroda göçü ile o elektrotta mutlaka boşalması ayrı olaylardır. Sulu NaCl’de Na⁺ katot tarafına taşınabilir ama normal koşulda metalik Na kaplaması yerine suyun indirgenmesi olur. Hareketli bir iyonun varlığı, onu tek mümkün ürün diye seçmek için yeterli değildir.",
        ],
      },
      {
        title: "İyon hareketliliği neden gereklidir?",
        paragraphs: [
          "Basit bir iyonik tuzun soğuk katısında iyonlar örgüde bağlıdır; bu sınıf düzeneğinde yeterli iyonik iletim sağlanmaz. Eriyikte veya uygun çözeltide hareketli iyonlar bulunur. Elektroliz sorusunun sulu, eriyik veya başka iletken ortam dediğini ilk satırda işaretlemek ürün hesabının ön koşuludur.",
          "Bu açıklamayı hiçbir katı elektrolit uygulaması olamaz diye evrenselleştirme. Özel katı iyon iletkenleri başka elektrokimyasal tasarımlarda kullanılır. Burada ele alınan tuz örnekleri için ortamın belirtilmesi gerekir; eksik ortam bilgisini çözümün içine sessizce ekleyerek sonuç üretme.",
        ],
      },
      {
        title: "Eriyik NaCl ile sulu NaCl aynı değildir",
        paragraphs: [
          "Erimiş NaCl’de su yoktur. Uygun elektrotlarda katot Na⁺+e⁻→Na, anot 2 Cl⁻→Cl₂+2e⁻ yarılarıyla net 2 NaCl→2 Na+Cl₂ yazılır. Na metalinin fiziksel hâli çalışma sıcaklığına bağlıdır; eriyik sıcaklığında onu otomatik oda sıcaklığı katısı gibi gösterme.",
          "Sulu NaCl’de ise su indirgenme adayıdır. Normal sulu koşullarda Na metalinin birikip suda kararlı kalması beklenmez; katotta H₂ ve OH⁻ oluşabilir. Anotta Cl₂ veya O₂ yarışması derişim, elektrot ve aşırı gerilim gibi koşullara bağlıdır. Eriyik ürün listesini sulu çözeltiye doğrudan aktarma.",
        ],
      },
      {
        title: "Sulu çözeltide su bir tepki adayıdır",
        paragraphs: [
          "Çözeltideki metal katyonu ile suyun indirgenmesi birlikte düşünülmelidir. Örneğin uygun sulu MgSO₄ ve inert elektrot koşulunda normal katot ürünü Mg metali değildir; su indirgenerek H₂ oluşturur. Katot çevresinde OH⁻ artışı Mg(OH)₂ çökelmesine de yol açabilir; bu metalik Mg birikimiyle aynı olay değildir.",
          "Bu yüzden yalnız yükten hesaplanan teorik metal gramını ürünün varlığını denetlemeden doğru cevap sayma. Önce gerçek yarı tepkimeyi seç, sonra Faraday hesabına geç. Bir kaynakta sulu MgSO₄ yazılıp Mg metal hesabı yapılmışsa eriyik varsayımıyla kökü gizlice değiştirmek yerine ortam–ürün uyuşmazlığını fark et.",
        ],
      },
      {
        title: "İnert anotta su yükseltgenebilir",
        paragraphs: [
          "Sulu CuSO₄ içinde uygun katotta Cu²⁺+2e⁻→Cu baskın kabul edilirse bakır kaplanır. İnert Pt anotta verilen süreç 2 H₂O→O₂+4 H⁺+4e⁻ olabilir. Toplam net denklem 2 Cu²⁺+2 H₂O→2 Cu+O₂+4 H⁺ olarak dengelenir; elektrolit türünün yanında elektrot malzemesi de gereklidir.",
          "Bu örnekte Pt anodu Cu iyonu sağlamaz ve metal çubuk mutlaka aşınmaz. Cu²⁺ tüketilir, çözeltinin asitliği değişebilir. Sıcaklık ve taşınım gibi gerçek etkiler sabit varsayıldığında bu öğretim modeli anlaşılır olur; fakat her sülfat çözeltisinin her elektrotla aynı ürünleri vereceği sonucu çıkarılmaz.",
        ],
      },
      {
        title: "Aktif bakır anot başka bir denklem kurar",
        paragraphs: [
          "Sulu CuSO₄ içinde bakır anot kullanılıp Cu→Cu²⁺+2e⁻ baskın olduğunda anot çözünür. Katotta Cu²⁺+2e⁻→Cu olur. İdeal aynı yükte aynı mol bakır anottan ayrılır ve katotta birikir; hacim sabit, yan tepkime yokken çözeltideki toplam Cu²⁺ stoku net değişmeyebilir.",
          "İnert anotta O₂ çıkışı ile aktif Cu anotta metal çözünmesi iki ayrı seçenektir. İki elektrodun kütlesinin eşit değişmesi ancak aynı metal/aynı elektron katsayısı ve uygun verim koşulunda geçerlidir. İnert anotlu gaz çıkışına bu eşit kütle sonucunu taşımak yanlış olur.",
        ],
      },
      {
        title: "Su elektrolizinin iki yarısını denkleştir",
        paragraphs: [
          "Seyreltik uygun asitle iletkenliği artırılmış su ve inert elektrot örneğinde katot 2 H⁺+2e⁻→H₂, anot 2 H₂O→O₂+4 H⁺+4e⁻ yazılır. Katot yarısını ikiyle çarpıp topladığında H⁺ ve elektronlar sadeleşir; net 2 H₂O→2 H₂+O₂ elde edilir. Asit bu net denklemde tüketilen esas madde değildir.",
          "H₂O⇌H⁺+OH⁻ iyonlaşması ise redoks değildir: H’nin +1 ve O’nun −2 basamakları değişmez. Gaz üretiminde H +1’den 0’a, O −2’den 0’a değişir. Suyun elementlerine ayrılması ile kendi iyonlaşmasını aynı denklem sanma; kimyasal değişimin türünü oksidasyon basamaklarıyla doğrula.",
        ],
      },
      {
        title: "Hacim oranının geçerli koşullarını söyle",
        paragraphs: [
          "Su elektrolizinde aynı toplam yük için H₂ molü O₂ molünün iki katıdır. Gazlar aynı sıcaklık ve basınçta, aynı nicel toplama koşullarında karşılaştırılıyorsa hacim oranı da 2: 1 olur. Katotta H₂, anotta O₂ bulunduğunu ayırmak, hangi tüpün iki kat olduğunu doğru söylemeni sağlar.",
          "Sıcaklık/basınç farklıysa, miktarlar farklı verimle toplanıyorsa veya gazlar su buharı içeriyorsa ham hacimleri otomatik 2: 1 kabul etme. Ayrıca H₂/Cl₂ üreten belirtilmiş tuzlu su örneğinin mol oranı 1: 1 olabilir. Oranı cihazın şekline değil dengeli yarı tepkimelere bağla.",
        ],
      },
      {
        title: "Derişik tuzlu suda verilen koşulu kullan",
        paragraphs: [
          "Bazı klorür elektroliz düzeneklerinde uygun anotta Cl₂, katotta suyun indirgenmesiyle H₂ üretilir. Verilen yarılar 2 Cl⁻→Cl₂+2e⁻ ve 2 H₂O+2e⁻→H₂+2 OH⁻ olduğunda net yük, atom ve ürün oranları açıkça kurulabilir. Na⁺ bu net denklemde seyirci olarak kalabilir.",
          "Ürünlerin ayrılması önemlidir; Cl₂ ile OH⁻ karışırsa başka kimyasal süreçler doğabilir. Model bu örnekte ayırıcı ve uygun baskın Cl₂ koşulu verildiğini söyler. Klorür adı gördüğün her çözeltide Cl₂ kesin oluşur veya bütün anotlarda sadece en pasif anyon çıkar biçiminde kural üretme.",
        ],
      },
      {
        title: "Kaplanacak nesne katot olur",
        paragraphs: [
          "Bakır bir nesneyi uygun Ag⁺ çözeltisinde gümüşle kaplamak için nesne katot yapılır; Ag⁺ elektron alıp yüzeyde Ag metaline dönüşür. Çözünen gümüş anot seçilmişse Ag→Ag⁺+e⁻ yarısı çözeltide tüketilen iyonu yenileyebilir. Kaplamanın madde hesabı önce bu yarı tepkimelerle kurulur.",
          "Her kaplama süreci kaplama metalinden oluşmuş çözünen anot kullanmak zorunda değildir; inert anotlu endüstriyel tasarımlar da vardır. Yüzey hazırlığı, istenen kalınlık, alan ve akım verimi gerçek sonuçları etkiler. Bu yüzden dersin basit aktif-anot örneğini bütün sanayi için tek reçete gibi sunma.",
        ],
      },
      {
        title: "Saflaştırma ile kaplama benzer ama aynı amaç değildir",
        paragraphs: [
          "Elektrolitik saflaştırmada uygun aktif metal anot çözündürülür, hedef metal daha saf katot ürünü olarak toplanabilir. Bazı safsızlıklar çözeltide kalabilir, bazıları anot çamuru oluşturabilir; hangi davranışın olacağı türlere ve uygulanan koşullara bağlıdır. Aynı elektron ilkesi farklı bir üretim amacına hizmet eder.",
          "Bu süreçte de atom ve yük korunur. Ancak her safsızlık katoda gider veya bütün anottaki madde aynı metal olarak nicel birikir denemez. Verilen denklemleri ve seçilen koşulları izle. İyi bir çözüm yalnız katot işaretini söylemez; indirgenen taneciğin nereden geldiğini ve diğer maddelerin ne olduğunu açıklar.",
        ],
      },
      {
        title: "Ters sürme için yalnız sayı ezberi yetmez",
        paragraphs: [
          "Bir galvanik net tepkimeyi ters yönde sürmek için dış kaynağın uygun yönde karşı potansiyeli aşması gerekir. İdeal bir örnekte 1,10 V standart hücre farkı referans alınabilir; gerçekte akım akarken aşırı gerilim, direnç ve anlık etkinlikler de gereken uygulama gerilimine katkı yapar.",
          "Bu nedenle her Zn–Cu düzeneğine her koşulda 1,10 V’tan biraz büyük gerilim bağlamak aynı ürünü garanti eder denmez. Elektrot işaretleri, çözeltideki türler ve iyonik bağlantı yeni yönde değerlendirilir. Bu ünitenin etkileşiminde yeterli dış kaynak açık varsayımdır; gerçek uygulama için gerilim tasarımı veya deney talimatı verilmez.",
        ],
      },
      {
        title: "Önce ürünü seç, sonra miktarı hesapla",
        paragraphs: [
          "Çözüm sırası ortam→elektrot→baskın yarı tepkime→elektron eşleştirme→miktar olmalıdır. Katot ve anot aynı toplam yük bütçesine bağlıdır; her ürünü oluşturmak için gereken elektron katsayısı farklı olabilir. H₂ için 2, O₂ için 4, Ag için 1 mol e⁻/mol oranlarını ancak doğru ürünü seçtikten sonra kullan.",
          "Adımın sonunda atom, yük, ortam ve verim kontrolü yap. Elektroliz sonucunu yalnız ekrandaki güzel kabarcıklarla öğrenmiş sayma; hangi taneciğin hangi yönde redoks geçirdiğini kendi cümlenle söyle. Etkileşim kendi başına doğru soru, XP veya ustalık üretmez; bağımsız soruda koşulu doğru uygulamak ayrıca ölçülür.",
        ],
      },
    ],
    examples: [
      {
        title: "Eriyik NaCl ürünlerini say",
        prompt:
          "Su içermeyen NaCl eriyiği uygun inert elektrotlarla elektroliz ediliyor. 0,20 mol e⁻ aktarılmıştır ve iyonlar yeterlidir. Katotta Na⁺+e⁻→Na, anotta 2 Cl⁻→Cl₂+2e⁻ veriliyor. Ürün molleri nedir?",
        strategy: "İki ürün için elektron başına oranı ayrı kur.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Katotta bir mol Na oluşumu bir mol elektron ister; Na miktarı 0,20 mol olur.",
          },
          {
            label: "2. adım",
            explanation:
              "Anotta bir mol Cl₂ için 2 mol e⁻ verilir; Cl₂ miktarı 0,20/2=0,10 mol olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Net 2 NaCl→2 Na+Cl₂ ile Na: Cl₂ mol oranı 2: 1 doğrulanır. Sulu ortam sonucu eklenmez.",
          },
        ],
        answer: "0,20 mol Na ve 0,10 mol Cl₂.",
        check: "0,20 mol Na⁺ ve 0,20 mol Cl⁻ bütçesi iki tarafa eşleşir.",
        pitfall: "Eriyik koşulunu unutup H₂ ürünü yazma.",
      },
      {
        title: "İnert ve aktif anot aynı çözeltide farklıdır",
        prompt:
          "Sulu CuSO₄’te katotta Cu²⁺+2e⁻→Cu baskındır. 0,040 mol e⁻ aktarılıyor. I. düzende Pt anotta 2 H₂O→O₂+4 H⁺+4e⁻; II. düzende Cu anotta Cu→Cu²⁺+2e⁻ veriliyor. Anot sonuçları nedir?",
        strategy: "Katot aynı kalırken verilen anot yarılarını ayrı hesapla.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İki düzende katotta 0,040/2=0,020 mol Cu birikir; bu ortak sonucu önce ayır.",
          },
          {
            label: "2. adım",
            explanation:
              "I. düzende O₂ molü 0,040/4=0,010 olur; Pt metali verilmiş yarıda tüketilmez.",
          },
          {
            label: "3. adım",
            explanation:
              "II. düzende 0,040/2=0,020 mol Cu çözünür. İdeal yan tepkimesiz II. düzende Cu²⁺ tüketimi aynı mol oluşumla dengelenir.",
          },
        ],
        answer: "I: 0,010 mol O₂; II: 0,020 mol Cu çözünmesi.",
        check: "Anot ve katot her düzende aynı 0,040 mol e⁻ bütçesine dayanır.",
        pitfall: "Çözeltinin adı aynı diye anot ürününü aynı sanma.",
      },
      {
        title: "Su elektrolizinde gaz tüplerini ayır",
        prompt:
          "İnert elektrotlarla asitli su elektrolizinde 2 H₂O→2 H₂+O₂ net tepkimesi geçerlidir. İki kuru gaz aynı T/P’de toplam 180 mL toplanmıştır. Hangi elektrotta kaç mL gaz vardır?",
        strategy: "2: 1 oranını toplam hacimle ve elektrot tanımıyla eşleştir.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "H₂ katotta, O₂ anotta oluşur; aynı T/P’de hacimler 2 V ve V yazılabilir.",
          },
          {
            label: "2. adım",
            explanation: "Toplam 3 V=180 mL olduğundan V=60 mL olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Anotta 60 mL O₂, katotta 120 mL H₂ vardır. Hacim toplamı 180 mL ve oran 2: 1 korunur.",
          },
        ],
        answer: "Katot 120 mL H₂; anot 60 mL O₂.",
        check: "Gazlar aynı T/P ve nicel/kuru toplama koşuluyla verilmiştir.",
        pitfall:
          "İki kat hacmi anoda yazma veya her elektrolize bu oranı taşıma.",
      },
      {
        title: "Sulu MgSO₄’te önce ürün koşulunu denetle",
        prompt:
          "Seyreltik sulu MgSO₄, inert elektrot ve normal su indirgenmesinin baskın olduğu koşul verilmiştir. Katotta 0,10 mol e⁻ aktarılıyor; 2 H₂O+2e⁻→H₂+2 OH⁻. Mg metal molü ve H₂ molü nedir?",
        strategy:
          "Metal iyonu bulunması ile metalin gerçekten indirgenmesini ayır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Verilen baskın yarı tepkimede Mg²⁺→Mg yoktur; su H₂’ye indirgenir. Bu koşulda Mg metali birikimi 0’dır.",
          },
          {
            label: "2. adım",
            explanation:
              "Bir mol H₂ için 2 mol e⁻ gerektiğinden H₂ miktarı 0,10/2=0,050 mol olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Yerel OH⁻ artışı ve olası Mg(OH)₂ çökelmesi metal kaplama değildir; çökelti miktarı için ek veri verilmemiştir.",
          },
        ],
        answer: "Mg metali 0 mol; H₂ 0,050 mol.",
        check:
          "Doğru ürüne ait elektron katsayısı kullanıldı; eriyik varsayımı eklenmedi.",
        pitfall: "Sulu kökü sessizce eriyiğe çevirip Mg gramı hesaplama.",
      },
    ],
    recall: [
      {
        prompt: "Elektrolizde anot ve katot işaretleri nedir?",
        answer:
          "Anot pozitif ve yükseltgenme yeri; katot negatif ve indirgenme yeridir. İşaretlerin galvanik pildekinden farklılığı tanımı değiştirmez.",
      },
      {
        prompt: "Katoda göçen her metal katyonu metal olarak birikir mi?",
        answer:
          "Hayır. Sulu ortamda suyla yarışma ve elektrot koşulları gerekir; Na⁺ veya Mg²⁺ varlığından normal sulu metal kaplaması çıkarılmaz.",
      },
      {
        prompt: "Aktif Cu anot ile Pt anot neden farklıdır?",
        answer:
          "Aktif Cu kendisi yükseltgenip Cu²⁺ sağlayabilir; inert Pt üzerinde verilen su yükseltgenmesi O₂ oluşturabilir.",
      },
      {
        prompt: "Su gazlarında 2: 1 hacim hangi koşulda geçerlidir?",
        answer:
          "Yalnız bu su yarılarıyla oluşan H₂/O₂, aynı T/P ve uygun nicel gaz toplama koşulunda karşılaştırılırsa.",
      },
    ],
    questions: [
      {
        prompt:
          "Bir elektrolitik hücrede dış kaynağın pozitif ucuna bağlanan elektrot üzerinde yükseltgenme gerçekleşiyor. Bu elektrot hangisidir?",
        options: [
          "Her zaman tuz köprüsü",
          "İki rolü aynı anda taşıyan tek katot",
          "Verilen bilgilerle anot–katot rolü belirlenemez",
          "Anot",
          "Katot",
        ],
        answer: 3,
        hint: "Yükseltgenmenin elektrot adı nedir?",
        explanation:
          "Yükseltgenme elektron verme sürecidir ve anotta olur. Elektrolizde anot dış kaynağın pozitif ucuna bağlanır; galvanik işareti taşınmaz. Verilen pozitif uç ile yükseltgenme aynı elektrotta tutarlıdır.",
        guidance: {
          knowledge: [
            "Anot ve katot isimleri işaretle değil redoks göreviyle tanımlanır.",
          ],
          strategy: "Önce verilen yükseltgenme olayını oku.",
          steps: [
            "Yükseltgenme elektron verme sürecidir ve anotta olur.",
            "Elektrolizde anot dış kaynağın pozitif ucuna bağlanır; galvanik işareti taşınmaz.",
          ],
          optionReasons: [
            "Tuz köprüsü bir elektrot adı değildir.",
            "Verilen yarı süreç yükseltgenmedir; rol tanımı anottur.",
            "Metal adı gerekmeden verilen tepkime ve bağlantı anodu belirler.",
            "Yükseltgenmenin olduğu pozitif elektrot elektrolizde anottur.",
            "Katot indirgenme yeridir; verilen yükseltgenme buna uymaz.",
          ],
          commonError: "Galvanik anot negatif kuralını her hücreye kopyalama.",
          check:
            "Verilen pozitif uç ile yükseltgenme aynı elektrotta tutarlıdır.",
        },
      },
      {
        prompt:
          "Su içermeyen NaCl eriyiğinde uygun inert elektrotlar ve yeterli dış gerilim veriliyor. Katot ürünü hangisidir?",
        options: ["Na metali", "H₂ gazı", "O₂ gazı", "Cl₂ gazı", "Cu metali"],
        answer: 0,
        hint: "Ortamda su var mı?",
        explanation:
          "Na⁺+e⁻→Na katot yarısıdır. 2 Cl⁻ → Cl₂ + 2 e⁻ elektron verme yarısı anoda aittir; iki ürünü karıştırma. Net 2 NaCl→2 Na+Cl₂ atomları korur.",
        guidance: {
          knowledge: ["Eriyik NaCl’de Na⁺ ve Cl⁻ hareketlidir; su yarışmaz."],
          strategy: "Katotta elektron alacak iyonu seç.",
          steps: [
            "Na⁺+e⁻→Na katot yarısıdır.",
            "2 Cl⁻ → Cl₂ + 2 e⁻ elektron verme yarısı anoda aittir; iki ürünü karıştırma.",
          ],
          optionReasons: [
            "Su yoktur; Na⁺ elektron alarak Na metaline dönüşür.",
            "Hidrojen içeren bir tür verilmemiştir; eriyiğe su eklenemez.",
            "Oksijen türü yoktur; ayrıca bu katot ürünü olmaz.",
            "Cl⁻ yükseltgenmesi anotta Cl₂ verir, katotta değil.",
            "Bakır türü verilmemiştir; ürün için madde kaynağı yoktur.",
          ],
          commonError: "Sulu NaCl ile eriyik NaCl’yi aynı ürün listesi sanma.",
          check: "Net 2 NaCl→2 Na+Cl₂ atomları korur.",
        },
      },
      {
        prompt:
          "Normal sulu koşulda MgSO₄ çözeltisi inert elektrotlarla elektroliz ediliyor; katotta su indirgenmesinin baskın olduğu açık veriliyor. Hangisi beklenir?",
        options: [
          "Mg metali nicel birikir",
          "Katotta SO₄²⁻ Mg atomuna dönüşür",
          "Katotta Cl₂ oluşur",
          "Elektron aktarımı atomları yok eder",
          "H₂ oluşur; Mg metal kaplaması beklenmez",
        ],
        answer: 4,
        hint: "Verilen yarı tepkime Mg içeriyor mu?",
        explanation:
          "Su 2 H₂O+2e⁻→H₂+2 OH⁻ ile indirgenir. Mg metali değil H₂ oluşur; olası Mg(OH)₂ ayrı bir çökelme olayıdır. H₂ için iki mol e⁻/mol oranı kullanılabilir.",
        guidance: {
          knowledge: [
            "Sulu elektrolizde su bir yarışmacıdır; ürün belirlenmeden metal kütlesi formülü uygulanmaz.",
          ],
          strategy: "Kökte verilen baskın katot yarısını kullan.",
          steps: [
            "Su 2 H₂O+2e⁻→H₂+2 OH⁻ ile indirgenir.",
            "Mg metali değil H₂ oluşur; olası Mg(OH)₂ ayrı bir çökelme olayıdır.",
          ],
          optionReasons: [
            "Bu verilen sulu/su-baskın koşulla çelişir; eriyik varsayımı eklenmiştir.",
            "Sülfat Mg elementi içermez; kimyasal tür kimliği korunmamıştır.",
            "Klorür verilmemiştir ve Cl₂ yükseltgenme ürünü olurdu.",
            "Redoks atomları yok etmez; elektron durumlarını değiştirir.",
            "Verilen su yarısı H₂ üretir; Mg²⁺ varlığı metal kaplama garantisi değildir.",
          ],
          commonError: "Sulu ifadesini sessizce eriyik yapma.",
          check: "H₂ için iki mol e⁻/mol oranı kullanılabilir.",
        },
      },
      {
        prompt:
          "Sulu CuSO₄’te Cu²⁺+2e⁻→Cu katot yarısı baskındır. Pt inert anotta 2 H₂O→O₂+4 H⁺+4e⁻ veriliyor. 0,080 mol e⁻ için anot ürünü kaç moldür?",
        options: [
          "0,160 mol H₂",
          "0 mol; inert yüzeyde hiç tepkime olmaz",
          "0,020 mol O₂",
          "0,040 mol O₂",
          "0,080 mol Cu",
        ],
        answer: 2,
        hint: "O₂ denkleminde kaç elektron var?",
        explanation:
          "O₂ oluşumu başına 4 mol e⁻ verilir. n(O₂)=0,080/4=0,020 mol; Pt tüketimi verilmemiştir. Katotta Cu molü 0,040 olabilir; bu anot O₂ molüyle aynı değildir.",
        guidance: {
          knowledge: ["İnert anot demek yükseltgenme yok demek değildir."],
          strategy: "Verilen anot denkleminin elektron katsayısını say.",
          steps: [
            "O₂ oluşumu başına 4 mol e⁻ verilir.",
            "n(O₂)=0,080/4=0,020 mol; Pt tüketimi verilmemiştir.",
          ],
          optionReasons: [
            "Verilen anotta H₂ değil O₂ vardır; H₂ indirgenme ürünüdür.",
            "İnert elektrot kendisi tüketilmeden suyun elektron alışverişine aracılık edebilir.",
            "Bir mol O₂ için 4 mol e⁻; 0,080/4=0,020 mol.",
            "İki elektron katsayısı katot Cu’ya aittir; O₂ için 4 gerekir.",
            "Bu hem yanlış elektrotta yanlış ürünü hem katsayıyı karıştırır.",
          ],
          commonError: "İnert ile işlevsiz elektrodu özdeşleştirme.",
          check:
            "Katotta Cu molü 0,040 olabilir; bu anot O₂ molüyle aynı değildir.",
        },
      },
      {
        prompt:
          "Yan tepkimesiz sulu CuSO₄ içinde aktif Cu anot ve Cu kaplanan katot kullanılıyor; hacim sabit. Her iki yarıda 0,020 mol e⁻ aktarılmıştır. Çözeltide Cu²⁺ toplamına net etki nedir?",
        options: [
          "Cu²⁺ atomları elektrona dönüşür",
          "Net değişim 0 mol",
          "0,020 mol azalır",
          "0,010 mol mutlaka artar",
          "0,010 mol mutlaka azalır",
        ],
        answer: 1,
        hint: "Anot çözeltideki Cu²⁺ stoğunu yeniliyor mu?",
        explanation:
          "Cu→Cu²⁺+2e⁻ yarısında 0,020/2=0,010 mol iyon oluşur. Cu²⁺+2e⁻→Cu yarısında 0,010 mol tüketilir; net 0’dır. Net olay Cu’nun bir elektrottan ötekine taşınmasıdır.",
        guidance: {
          knowledge: [
            "Aktif aynı metal anot/katot yarıları Cu²⁺ için zıt ve eşit stok değişimi doğurur.",
          ],
          strategy: "Her yarının Cu²⁺ molünü ayrı yaz.",
          steps: [
            "Cu→Cu²⁺+2e⁻ yarısında 0,020/2=0,010 mol iyon oluşur.",
            "Cu²⁺+2e⁻→Cu yarısında 0,010 mol tüketilir; net 0’dır.",
          ],
          optionReasons: [
            "Atomlar elektronlara dönüşmez; bakır türler arasında taşınır.",
            "Anotta 0,010 mol Cu²⁺ oluşur, katotta aynı mol tüketilir.",
            "Elektron molü doğrudan Cu²⁺ molü değildir; anot üretimi de atlanmıştır.",
            "Bu yalnız anottaki oluşumdur; katot tüketimi unutulmuştur.",
            "Bu yalnız katottaki tüketimdir; aktif anot yenilemesi unutulmuştur.",
          ],
          commonError:
            "İnert Pt anot sonucu ile aktif Cu anot sonucunu karıştırma.",
          check: "Net olay Cu’nun bir elektrottan ötekine taşınmasıdır.",
        },
      },
      {
        prompt:
          "Asitle iletkenliği artırılmış su, inert elektrotlarla nicel elektroliz ediliyor. Aynı T/P’de kuru H₂ ve O₂ toplam 300 mL. Katotta hangi gazdan kaç mL vardır?",
        options: [
          "O₂, 200 mL",
          "H₂, 100 mL",
          "O₂, 100 mL",
          "H₂, 300 mL",
          "H₂, 200 mL",
        ],
        answer: 4,
        hint: "İki kat ürün hangi elektrotta?",
        explanation:
          "3 V=300 mL, bu yüzden V=100 mL’dir. Katotta H₂=2 V=200 mL, anotta O₂=100 mL. 200+100=300 mL ve aynı T/P koşulu verilmiştir.",
        guidance: {
          knowledge: ["Net 2 H₂O→2 H₂+O₂; H₂ katotta, O₂ anotta oluşur."],
          strategy: "Toplamı 2 V+V diye kur.",
          steps: [
            "3 V=300 mL, bu yüzden V=100 mL’dir.",
            "Katotta H₂=2 V=200 mL, anotta O₂=100 mL.",
          ],
          optionReasons: [
            "O₂ anotta ve üçte bir hacimdedir; ürün yerleri ters çevrilmiştir.",
            "100 mL anottaki O₂ hacmidir; katot H₂ iki kattır.",
            "Hacim O₂ için doğru ama sorulan katot değil anot ürünüdür.",
            "Toplamın tamamı H₂ değildir; O₂ de nicel toplanmıştır.",
            "H₂ katotta oluşur; 2:1 oranında toplamın üçte ikisi 200 mL’dir.",
          ],
          commonError: "Gaz oranını doğru bulup elektrodu ters yazma.",
          check: "200+100=300 mL ve aynı T/P koşulu verilmiştir.",
        },
      },
      {
        prompt:
          "Bir metal nesne uygun Ag⁺ çözeltisinde gümüşle kaplanacaktır. Nesnenin bağlanacağı elektrot rolü hangisidir?",
        options: [
          "Katot",
          "Anot",
          "Tuz köprüsünün kendisi",
          "Dış devreden tamamen kopuk bir yüzey",
          "Her zaman galvanik pilin negatif anodu",
        ],
        answer: 0,
        hint: "Metal iyonu elektron alıyor mu veriyor mu?",
        explanation:
          "Ag⁺ iyonları katotta elektron alır. Kaplanacak nesne bu birikme yüzeyi olduğundan katot yapılır. Aktif Ag anot varsa çözeltiye Ag⁺ sağlayabilir; nesnenin rolü değişmez.",
        guidance: {
          knowledge: [
            "Kaplama iyonunun elektron alması nesne üzerinde indirgenmedir.",
          ],
          strategy: "Ag⁺+e⁻→Ag yarısını nesneyle eşleştir.",
          steps: [
            "Ag⁺ iyonları katotta elektron alır.",
            "Kaplanacak nesne bu birikme yüzeyi olduğundan katot yapılır.",
          ],
          optionReasons: [
            "Ag⁺ elektron alıp Ag olarak nesnenin yüzeyine birikir; bu indirgenmedir.",
            "Anotta yükseltgenme olur; verilen metal birikmesi indirgenmedir.",
            "Nesne elektron alacak yüzeydir; köprü elektrot yerine geçmez.",
            "Elektrokimyasal kaplama için elektron yolu gerekir.",
            "Bu dış kaynaklı kaplama katotta yapılır; galvanik anot işareti uygulanmaz.",
          ],
          commonError: "Kaplanacak nesneyle çözünen kaynak anodu karıştırma.",
          check:
            "Aktif Ag anot varsa çözeltiye Ag⁺ sağlayabilir; nesnenin rolü değişmez.",
        },
      },
      {
        prompt:
          "Aşağıdaki denklemlerden hangisi suyun elektrolizinin net redoks dönüşümüdür?",
        options: [
          "NaCl→Na⁺+Cl⁻",
          "H⁺+OH⁻→H₂O",
          "H₂O→H₂+O₂",
          "2 H₂O→2 H₂+O₂",
          "H₂O⇌H⁺+OH⁻",
        ],
        answer: 3,
        hint: "Oksijen atomlarını say.",
        explanation:
          "2 H₂O iki H₂ ve bir O₂ sağlayabilir; her iki tarafta 4 H ve 2 O atomu korunur. H’nin +1→0 ve O’nun −2→0 değişimi gerçek redokstur. Net tepkimenin toplam yükü iki tarafta 0’dır.",
        guidance: {
          knowledge: [
            "Redoksta oksidasyon basamakları değişir ve atom/yük korunur.",
          ],
          strategy: "Gaz ürünlerini seçip oksijen sayısını denetle.",
          steps: [
            "2 H₂O iki H₂ ve bir O₂ sağlayabilir; her iki tarafta 4 H ve 2 O atomu korunur.",
            "H’nin +1→0 ve O’nun −2→0 değişimi gerçek redokstur.",
          ],
          optionReasons: [
            "Bu verilen biçimde iyonlara ayrılmadır; su gazlarını üretmez.",
            "Bu nötrleşmedir; H₂ ve O₂ ürünü vermez.",
            "Oksijen atom sayısı dengeli değildir; bir O’dan iki O oluşmuş görünür.",
            "H +1’den 0’a, O −2’den 0’a değişir; atomlar 2 su için korunur.",
            "Bu oksidasyon basamaklarını değiştirmeyen iyonlaşmadır; gaz elektrolizi değildir.",
          ],
          commonError: "Suyun iyonlaşmasını gazlara ayrılma sanma.",
          check: "Net tepkimenin toplam yükü iki tarafta 0’dır.",
        },
      },
      {
        prompt:
          "Derişik NaCl sulu çözeltisinde uygun inert anot, ürünleri ayıran zar ve Cl₂ üretiminin baskın olduğu koşul verilmiştir. Katotta 2 H₂O+2e⁻→H₂+2 OH⁻ gerçekleşiyor. Doğru ürün çifti nedir?",
        options: [
          "İki elektrotta yalnız Na",
          "Her iki tarafta kesin O₂",
          "Katot H₂, anot Cl₂",
          "Katot Na, anot Cl₂",
          "Katot Cl₂, anot H₂",
        ],
        answer: 2,
        hint: "Su olup olmadığı ve anot koşulu açık mı?",
        explanation:
          "Katot yarısı H₂ ve OH⁻ oluşturur; Na⁺ seyirci kalır. Anotta 2 Cl⁻→Cl₂+2e⁻ koşulu verilmiştir; ürünler ayrılır. İki gaz bu verilen yarılarda aynı elektron katsayısına sahiptir.",
        guidance: {
          knowledge: [
            "Ürünler verilen ortam ve baskın yarı tepkimelerle belirlenir.",
          ],
          strategy:
            "Klorürün anottaki elektron vermesiyle suyun katottaki almasını ayır.",
          steps: [
            "Katot yarısı H₂ ve OH⁻ oluşturur; Na⁺ seyirci kalır.",
            "Anotta 2 Cl⁻→Cl₂+2e⁻ koşulu verilmiştir; ürünler ayrılır.",
          ],
          optionReasons: [
            "Na⁺ indirgenmesi katot için bile verilmemiştir; anotta aynı ürün olmaz.",
            "Kökteki baskın Cl₂ anot koşulu ve H₂ katot yarısı yok sayılmıştır.",
            "Kökte verilen su indirgenmesi H₂, klorür yükseltgenmesi Cl₂ verir.",
            "Sulu koşulda verilen katot yarısı Na üretmez.",
            "İndirgenme ve yükseltgenme ürünlerinin yerleri ters çevrilmiştir.",
          ],
          commonError: "Bu özel Cl₂ koşulunu her sulu klorüre genelleme.",
          check:
            "İki gaz bu verilen yarılarda aynı elektron katsayısına sahiptir.",
        },
      },
      {
        prompt:
          "Bir galvanik tepkimeyi dış kaynakla ters yönde sürmek isteniyor. Gerçek elektroliz için hangi yorum en uygundur?",
        options: [
          "Tepkimeyi ters yazmak bütün istenen ürünleri garanti eder",
          "Uygun yönlü karşı gerilim, aşırı gerilim ve direnç koşulları birlikte değerlendirilir",
          "Her hücrede tam 1,10 V yeterlidir",
          "Anot artık indirgenme yeri olur",
          "İyon yolu olmadan sürekli işlem sürer",
        ],
        answer: 1,
        hint: "Açık devre farkıyla yük altı uygulama aynı mı?",
        explanation:
          "Dış kaynak ters yöndeki dönüşümü sürmek için uygun bağlanmalıdır. Gerçek akım için aşırı gerilim, direnç ve anlık etkinlikler de önemlidir; her hücreye aynı sayı verilemez. Bu ünitenin modelinde yeterli kaynak açık varsayılır; gerçek cihaz tasarımı yapılmaz.",
        guidance: {
          knowledge: [
            "İdeal denge farkı ile gerçek yük altındaki uygulama gerilimi ayrı bilgiler taşır.",
          ],
          strategy: "Ölçülmemiş kayıpları yok varsayan mutlak reçeteleri ele.",
          steps: [
            "Dış kaynak ters yöndeki dönüşümü sürmek için uygun bağlanmalıdır.",
            "Gerçek akım için aşırı gerilim, direnç ve anlık etkinlikler de önemlidir; her hücreye aynı sayı verilemez.",
          ],
          optionReasons: [
            "Yarışan yarı tepkimeler ve malzeme/ortam koşulları ayrıca gerekir.",
            "Yalnız standart E° farkı her gerçek akım için yeterli gerilimi reçete etmez.",
            "1,10 V belirli standart Daniell örneğidir; evrensel eşik değildir.",
            "Tanım değişmez; elektrolizde de yükseltgenme anottadır.",
            "Sürekli yük aktarımı için yük denkliğini tamamlayan iyonik yol gerekir.",
          ],
          commonError:
            "Bir kitaptaki 1,10 V örneğini bütün sanayi için eşik sayma.",
          check:
            "Bu ünitenin modelinde yeterli kaynak açık varsayılır; gerçek cihaz tasarımı yapılmaz.",
        },
      },
    ],
  },
  {
    id: "faraday-yasalari",
    title: "Faraday yasaları: yükten maddeye, koşulları koruyarak",
    detail: "detail-443",
    minutes: 115,
    objectives: [
      "Akım ve süreyi coulomb ve elektron molüne çevir.",
      "Doğru yarı tepkimeden z seçerek metal/gaz miktarı hesapla.",
      "Seri-paralel bağlantı, akım verimi ve sonlu stok sınırlarını ayır.",
      "Verilen kütleden süre, akım veya yükseltgenme basamağını geri kur.",
    ],
    sections: [
      {
        title: "Yük, akımın süre boyunca aktarımıdır",
        paragraphs: [
          "Sabit akım için Q=I·t kullanılır. Amper, bir saniyede geçen coulomb miktarıdır; bu nedenle I amper ve t saniyeyse Q coulomb çıkar. Verilen dakika veya saati saniyeye çevirmeden doğrudan formüle koymak, doğru yöntemi 60 veya 3600 kat hatalı sonuca götürebilir.",
          "Akım değişiyorsa tek bir anın değerini bütün süreye yayma. Parçalı sabit akımda her aralığın I·t yükünü toplayabilirsin; genel olarak yük akım–zaman grafiğinin alanıdır. Bu dersin sayısal etkileşimi sabit akımı açık varsayar; gerçek cihazdan zamanla ölçülmüş akım verisi kullandığını söylemez.",
        ],
      },
      {
        title: "Bir Faraday ve kullanılan yuvarlama",
        paragraphs: [
          "Bir mol elektronun toplam yük büyüklüğü Faraday sabitidir. Güncel değeri yaklaşık 96485 C/mol e⁻’dir; sınıf sorularında 96500 gibi yuvarlama açık verilebilir. Her hesapta sorunun verdiği F değerini kullanmak sayısal sonucu ve birim tutarlılığını korur.",
          "Buradaki model F=96500 C/mol e⁻ kabul eder. Örneğin 9650 C yük 0,100 mol e⁻ demektir. Bu sayıyı doğrudan bütün ürünlerden 0,100 mol oluştu şeklinde yorumlama; ürün başına kaç mol elektron gerektiği yarı tepkimeyle belirlenir. Yükten maddeye geçişin ara durağı elektron molüdür.",
        ],
      },
      {
        title: "Elektron katsayısı z nereden gelir?",
        paragraphs: [
          "Ag⁺+e⁻→Ag için z=1, Cu²⁺+2e⁻→Cu için z=2, Al³⁺+3e⁻→Al için z=3 kullanılır. Bir mol ürün için gereken elektron sayısı bu katsayıdır. Bir iyonun yalnız formüldeki görünüşünü değil, başlangıç ve son oksidasyon durumunu karşılaştırarak değişimi belirle.",
          "Bir metal iyonu başka bir iyon basamağına indirgeniyorsa z doğrudan son metal atomu varsayımıyla seçilemez. Gaz ürünlerinde de iyon yüküne bakarak değil dengeli yarıdan oran kurulur: bir mol H₂ için 2, bir mol O₂ için 4 mol e⁻ gerekir. Önce doğru ürün, sonra doğru z yaklaşımı zorunludur.",
        ],
      },
      {
        title: "Elektron molünden ürün molüne geç",
        paragraphs: [
          "Yüzde 100 hedef akım veriminde n(e⁻)=Q/F ve n(ürün)=Q/(z F) olur. Bu iki adımı ayrı yazmak işlemin nedenini gösterir. Cu²⁺ için 0,10 mol e⁻ ancak 0,050 mol Cu sağlayabilir; elektron molünü doğrudan metal molü yazmak iki katsayısını siler.",
          "Sonuç daha sonra m=n·M ile grama çevrilir. M mol kütlesidir, g/mol birimiyle verilir; iyonun yükü veya atom numarası değildir. Kullanılan ürün gerçekten metal mi gaz mı, çözeltide yeterli stok var mı, yan tepkime hedef yükün bir kısmını alıyor mu soruları hesap yapılmadan önce yanıtlanmalıdır.",
        ],
      },
      {
        title: "Kütle bağıntısının birimlerini aç",
        paragraphs: [
          "Adımları birleştirince m=M·I·t/(z F) elde edilir. I·t coulomb, F coulomb/mol e⁻ olduğundan önce elektron molü bulunur; z ile bölünce ürün molü ve M ile çarpınca gram çıkar. Formülün içindeki her sayının bir fiziksel görevi vardır.",
          "Bu biçim sabit akım, verilen doğru ürün, stok yeterliliği ve yüzde 100 hedef verim varsayar. Başka koşulda verim çarpanı veya stok sınırı eklenir. Formülü görünce otomatik gram üretmek yerine hangi varsayımların soruda bulunduğunu söyle; özellikle sulu aktif metal tuzunda yanlış ürün seçimini doğru aritmetik onarmaz.",
        ],
      },
      {
        title: "Gazlarda katsayı ve hâl koşulu gerekir",
        paragraphs: [
          "H₂, O₂ veya Cl₂ miktarını yükten hesaplarken her gazın yarı tepkimesindeki elektron oranını kullan. Verilmiş su örneğinde n(H₂)=Q/(2F), n(O₂)=Q/(4F) olur. Aynı yükte iki gazın molü eşit değildir; elektron sayısı eşit, ürün katsayıları farklıdır.",
          "Molden litreye geçiş için sıcaklık ve basınç veya açık molar hacim gerekir. İdeal gazın 0°C ve 1 atm yaklaşımında 22,4 L/mol verilmişse kullanılabilir; bu sayı her ortam için sabit değildir. Gaz su üzerinde toplanmışsa kuru gaz basıncı ve buhar gibi ek koşullar ayrıca önem kazanabilir.",
        ],
      },
      {
        title: "İkinci yasa: eşit yükte M/z oranı",
        paragraphs: [
          "Aynı hedef verim ve yeterli stokta eşit Q, ürünler için eşit elektron molü verir. Buna karşılık kütleler M/z ile orantılıdır. Ag için 108/1 ve Cu için 64/2=32 karşılaştırıldığında aynı yükte gümüş kütlesi bakır kütlesinin 108/32 katıdır.",
          "Bu oran eşit kütle veya eşit mol ürünü garanti etmez. İki metalin yükleri farklıysa ürün molleri de farklı olur. Oranı kurmadan önce ikisine aynı yükün gerçekten geçtiğini ve verimlerinin aynı olduğunu denetle; farklı akımlarda veya stok tükenmesinde ikinci yasa basit karşılaştırması değişebilir.",
        ],
      },
      {
        title: "Seri bağlı hücrelerde ortak yük",
        paragraphs: [
          "İdeal seri devrede aynı akım aynı süre boyunca bütün hücrelerden geçer; dolayısıyla her hücrenin Q değeri eşittir. Her hücrede oluşan madde için m·z/M ortak elektron molüyle eşleşir. Bu bağlantı farklı iyonların yükseltgenme basamağını veya biriken kütlesini bulmada kullanışlıdır.",
          "Seri hücreler aynı kabın içinde olmak zorunda değildir; elektriksel yol boyunca sıralı olmaları yeterlidir. Ürünlerin farklı elektron katsayıları nedeniyle aynı mol oluşması beklenmez. İyon stoku bitmiş bir hücrede başka süreçler akımı taşıyorsa hedef metal hesabı için bu sınır ayrıca belirtilmelidir.",
        ],
      },
      {
        title: "Paralelde akım payları ayrıca verilir",
        paragraphs: [
          "Paralel kollarda aynı süre geçmesi, her koldan aynı akım veya yük geçtiğini zorunlu kılmaz. Her kol için Qkol=Ikol·t kurulur. Toplam akımın iki kol arasında nasıl dağıldığı verilmeden bütün hücrelere toplam akımı ayrı ayrı atamak yükü iki kez sayar.",
          "Aynı gerilime bağlı kolların akımı direnç, yüzey ve tepkime koşullarıyla değişebilir. Soruda kol akımları verilmişse onları kullan; yalnız paralel kelimesinden eşit Q çıkarma. Seri–paralel ayrımı, Faraday formülünden önce yapılması gereken devre okumasıdır.",
        ],
      },
      {
        title: "Akım verimi hedefe ayrılan paydır",
        paragraphs: [
          "Hedef metalin oluşmasına yükün yalnız yüzde η’sı gidiyorsa hedef yük Qhedef=(η/100)Q olur. Yeterli iyon stoğunda metal miktarı bu hedef yükle hesaplanır. Bu yüzde, enerji verimi veya hücre gerilimiyle aynı büyüklük değildir; ne kadar yükün istenen yarı sürece gittiğini belirtir.",
          "Modelde seçilen pay iyon yeterliyken hedef sürece ayrılan nominal paydır. İyon stoğu biterse hedefe ayrılabilecek toplam yük daha da sınırlanır ve gerçekleşen bütün-deney hedef yüzdesi düşebilir. Kalan yükün hangi yan ürünü oluşturduğunu veri olmadan kesin söylemek yerine ayrı yük bütçesi olarak gösteririz.",
        ],
      },
      {
        title: "Sonlu stok formüle tavan koyar",
        paragraphs: [
          "Başlangıçta n₀ mol uygun metal katyonu varsa bu iyonlardan en fazla n₀ mol metal üretilebilir. Teorik Q/(z F) bundan büyükse formül sonucu stoğu aşan bir üst taleptir; gerçek hedef miktarı eldeki iyonla sınırlanır. İnert anot kullanıldığında aynı metal iyonu otomatik yenilenmez.",
          "Aktif aynı metal anot iyon sağlayan başka bir model kurabilir. Bu yüzden stok sınırını değerlendirirken anot türünü ve eklenen maddeleri de oku. Modelin inört-anot örneğinde hedef yük min((η/100)Q, zFn₀) olarak seçilir; metal molü, artan iyon ve kalan yük birlikte korunur.",
        ],
      },
      {
        title: "Anot ve katot kütleleri her zaman eşit değildir",
        paragraphs: [
          "Aynı devreden geçen yük, iki elektrottaki elektron bütçesini eşitler; ürün kütlesini değil. Katotta Cu birikirken inert anotta O₂ çıkabilir. Katotta bir metal, anotta farklı bir metal çözünüyorsa M/z oranları farklı olduğundan kütleler farklı olabilir.",
          "Çözünen Cu anot ve Cu katot gibi aynı metal/aynı z ve eşit hedef verimi koşulunda kütle değişimleri eşit büyüklükte olabilir. Bu özel sonucu bütün elektroliz düzenekleri için zorunlu yasa sanma. Önce her yarı tepkimeyi ayrı kur, sonra ortak elektron sayısıyla iki tarafı karşılaştır.",
        ],
      },
      {
        title: "Ters hesapta bilinmeyeni son adımda seç",
        paragraphs: [
          "İstenen kütleden önce n(ürün)=m/M, sonra n(e⁻)=z·m/M ve Q=F·n(e⁻) bulunabilir. Sabit akım verilmişse t=Q/I, süre verilmişse I=Q/t kullanılır. Bu sıra, kütleden doğrudan saniye çıkaran bir formül ezberinden daha kolay kontrol edilir.",
          "Bilinmeyen yükseltgenme basamağında da aynı elektron eşleşmesi çalışır. Seri bağlı bilinen bir hücre Q/F’yi verir; diğer ürün molüne bölünce ürün başına z bulunur. Sonucun verilen iyon türü ve olası tam sayı basamakla tutarlı olduğunu denetle; yuvarlama hatasını yeni kimyasal durum diye yorumlama.",
        ],
      },
      {
        title: "Grafik doğrusal olabilir, koşulu değişebilir",
        paragraphs: [
          "Sabit z, M ve η ile stok yeterliyken m–Q grafiği doğrusal ve eğimi ηM/(100z F) olur. Stok tavanında hedef metal birikimi yataylaşabilir; bu sırada akımın durması zorunlu değildir, başka süreçler yük taşıyabilir. Modelin bütçe grafiği bu koşullu tavanı gösterir.",
          "Başlangıçtaki elektrot toplam kütlesiyle yeni biriken kütleyi ayır. Toplam kütle grafiği başlangıç kütlesinden başlayabilir; yalnız birikim grafiği 0’dan başlar. Bir grafiğin eksen birimi ve gösterdiği miktar açık değilse eğimi doğrudan mol kütlesi veya gram/saniye diye adlandırma.",
        ],
      },
      {
        title: "Son kontrolde madde ve yük defteri",
        paragraphs: [
          "Hesabın sonunda hedef üründeki elektron eşdeğeri ile kullanılan yükü karşılaştır. Qhedef+Qdiğer=Q, başlangıç iyonu=biriken metal+artan iyon ilişkileri uygun modelde birlikte sağlanmalıdır. Bir sonucun doğru birimi taşıması tek başına stok veya ürün hatasını dışlamaz.",
          "Hesapların çalışma akımı ve kimyasal koşulları verilmiş öğretim örnekleri olduğunu koru. Bu bölüm gerçek elektroliz cihazı kurma veya tehlikeli gaz üretme yönergesi değildir. Öğrenme görevi, doğru yarı tepkimeyi ve varsayımları tanıyıp miktarı gerekçesiyle hesaplamaktır; bir modeli oynatmak bağımsız soru başarısının yerine geçmez.",
        ],
      },
    ],
    examples: [
      {
        title: "Akım-süre-elektron-metal zinciri",
        prompt:
          "Cu²⁺+2e⁻→Cu hedef sürecinde stok yeterli ve akım verimi %100. I=2,00 A, t=965 s, F=96500 C/mol e⁻, M(Cu)=64 g/mol. Biriken Cu kaç gram?",
        strategy: "Önce Q, sonra ne, sonra Cu molü ve gramı bul.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Q=I·t=2,00×965=1930 C. Elektron molü 1930/96500=0,020 mol olur.",
          },
          {
            label: "2. adım",
            explanation:
              "Bir mol Cu için 2 mol e⁻ gerekir; Cu molü 0,020/2=0,010 mol’dür.",
          },
          {
            label: "3. adım",
            explanation:
              "m=0,010×64=0,640 g Cu. Yeterli stok ve yüzde 100 hedef verimi verilmiştir.",
          },
        ],
        answer: "0,640 g Cu.",
        check: "0,640/64×2×96500=1930 C ile yük geri bulunur.",
        pitfall: "Elektron molünü doğrudan Cu molü yazma.",
      },
      {
        title: "Seri hücrede farklı değerlik",
        prompt:
          "Seri bağlı uygun eriyik Mg²⁺ ve Al³⁺ hücrelerinde hedef verim %100, stoklar yeterli. Mg hücresinde 4,80 g Mg oluşuyor. M(Mg)=24, M(Al)=27 g/mol. Al kaç gramdır?",
        strategy: "Ortak elektron molünü Mg’den bul ve Al için 3’e böl.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "n(Mg)=4,80/24=0,200 mol; Mg²⁺ için ne=2×0,200=0,400 mol olur.",
          },
          {
            label: "2. adım",
            explanation:
              "Seri bağlantıda aynı Q geçtiğinden Al hücresinde ne=0,400 mol’dür. Al molü 0,400/3’tür.",
          },
          {
            label: "3. adım",
            explanation:
              "m(Al)=(0,400/3)×27=3,60 g. Aynı elektron bütçesi eşit metal molü veya eşit kütle demek değildir.",
          },
        ],
        answer: "3,60 g Al.",
        check: "4,80×2/24=3,60×3/27=0,400 mol e⁻.",
        pitfall: "Eşit yükten eşit mol metal çıkarma.",
      },
      {
        title: "Verim ve stok aynı anda sınırlar",
        prompt:
          "İnert anotlu Cu²⁺ hedefinde I=5 A, t=1930 s, F=96500 C/mol e⁻, M(Cu)=64 g/mol. İyon yeterliyken yükün %80’i Cu’ya ayrılıyor; başlangıç Cu²⁺ stoğu 0,015 mol ve anot yenilemesi yok. Biriken Cu ve hedef yük nedir?",
        strategy:
          "Önce nominal hedef yükü bul; stok yük tavanıyla küçüğünü al.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Q=5×1930=9650 C; nominal Cu yükü 0,80×9650=7720 C olur. Bu 0,040 mol Cu talep eder.",
          },
          {
            label: "2. adım",
            explanation:
              "Stok yalnız 0,015 mol; hedef için üst yük 0,015×2×96500=2895 C. Bu daha küçüktür.",
          },
          {
            label: "3. adım",
            explanation:
              "Cu kütlesi 0,015×64=0,960 g; diğer süreçlere ayrılan yük 9650−2895=6755 C. Bütün-deney hedef yüzdesi %30’dur.",
          },
        ],
        answer: "0,960 g Cu; hedef 2895 C.",
        check:
          "2895/9650=%30 ve 0,015 mol stok tam kullanılır; nominal %80 ile gerçek %30 farklıdır.",
        pitfall: "%80’i uygulayıp stoğu aşan 2,56 g sonucu son cevap sanma.",
      },
      {
        title: "Kütleden süreye geri dön",
        prompt:
          "Cu²⁺+2e⁻→Cu için %100 hedef verim ve stok yeterli. 1,28 g Cu kaplamak isteniyor. M(Cu)=64 g/mol, F=96500 C/mol e⁻, sabit I=2 A. Süre kaç saniye?",
        strategy: "Kütle→ürün molü→elektron molü→yük→süre sırasını ters kur.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "n(Cu)=1,28/64=0,020 mol; gereken elektron 0,040 mol’dür.",
          },
          {
            label: "2. adım",
            explanation:
              "Q=0,040×96500=3860 C bulunur. Akım 2 C/s olduğundan bu yükü taşıma süresi Q/I ile bulunur.",
          },
          {
            label: "3. adım",
            explanation:
              "t=3860/2=1930 s. Dakika istense 1930/60≈32,17 dakika yazılır; 1930 dakika değildir.",
          },
        ],
        answer: "1930 s.",
        check: "2×1930=3860 C ve aynı yük 1,28 g Cu üretir.",
        pitfall: "Saniye değerini dakika etiketiyle yazma.",
      },
    ],
    recall: [
      {
        prompt: "Q=It’de süre hangi birimde olmalı?",
        answer:
          "I amper, Q coulomb için t saniye olmalıdır. Değişken akımda aralıkların yükleri toplanır.",
      },
      {
        prompt: "Aynı yükte Ag ve Cu metal molleri neden farklı olabilir?",
        answer:
          "Ag⁺ için 1, Cu²⁺ için 2 mol e⁻/mol gerekir; eşit elektron molü eşit ürün molü değildir.",
      },
      {
        prompt: "Paralel kolların Q’su zorunlu eşit mi?",
        answer:
          "Hayır. Her kolun akımı gerekir; aynı süre tek başına aynı yük sağlamaz. Seride aynı akım ve süreyle Q eşittir.",
      },
      {
        prompt:
          "Nominal hedef verimiyle gerçek bütün-deney payı ne zaman farklılaşır?",
        answer:
          "Sonlu hedef iyonu erken biterse hedef yük stokla sınırlanır; kalan yükün farklı süreçlere gitmesi toplam hedef payını düşürebilir.",
      },
    ],
    questions: [
      {
        prompt:
          "Sabit 2 A akım 5 dakika uygulanıyor. Geçen elektrik yükü kaç C’dur?",
        options: ["120 C", "96500 C", "600 C", "10 C", "150 C"],
        answer: 2,
        hint: "5 dakika kaç saniye?",
        explanation:
          "t=5×60=300 s. Q=I·t=2×300=600 C. 600 C/300 s=2 A veriyi geri verir.",
        guidance: {
          knowledge: ["1 A=1 C/s ve 1 dakika 60 s’dir."],
          strategy: "Önce süreyi saniye yap.",
          steps: ["t=5×60=300 s.", "Q=I·t=2×300=600 C."],
          optionReasons: [
            "5 dakika yerine 60 s gibi yanlış süre kullanılmıştır.",
            "Bir Faraday sabitini verilen I·t hesabının yerine koymaktır.",
            "5 dakika 300 s; Q=2×300=600 C.",
            "Dakikayı saniyeye çevirmeden 2×5 yapılmıştır.",
            "Akımla bölme yerine çarpma gerekir; Q=It’dir.",
          ],
          commonError: "Dakikayla saniyeyi karıştırma.",
          check: "600 C/300 s=2 A veriyi geri verir.",
        },
      },
      {
        prompt:
          "Cu²⁺+2e⁻→Cu için %100 hedef verim, yeterli stok ve Q=9650 C verilmiştir. F=96500 C/mol e⁻, M(Cu)=64 g/mol. Cu kütlesi kaç g?",
        options: ["3,20 g", "6,40 g", "1,60 g", "32,0 g", "0,100 g"],
        answer: 0,
        hint: "Bir Cu atomu için kaç elektron gerekir?",
        explanation:
          "ne=9650/96500=0,100 mol. n Cu=0,100/2=0,050 mol; m=0,050×64=3,20 g. 3,20/64×2×96500=9650 C.",
        guidance: {
          knowledge: ["Metal molü ne/z, gramı M·ne/z’dir."],
          strategy: "Yükten önce elektron molünü bul.",
          steps: [
            "ne=9650/96500=0,100 mol.",
            "n Cu=0,100/2=0,050 mol; m=0,050×64=3,20 g.",
          ],
          optionReasons: [
            "ne=0,100 mol; Cu 0,050 mol; 64×0,050=3,20 g.",
            "Elektron molü Cu molüne doğrudan eşitlenmiş, z=2 unutulmuştur.",
            "İki elektron katsayısı iki kez uygulanarak gereksiz 4’e bölünmüştür.",
            "Q/F adımında ondalık basamak 10 kat hatalıdır.",
            "0,100 elektron molünü gram gibi etiketlemektir.",
          ],
          commonError: "z=2 katsayısını atlama.",
          check: "3,20/64×2×96500=9650 C.",
        },
      },
      {
        prompt:
          "İdeal seri iki hücrede Ag⁺→Ag ve Cu²⁺→Cu ürünleri, aynı %100 hedef verimi ve yeterli stokla oluşuyor. M(Ag)=108, M(Cu)=64 g/mol. m Ag/m Cu kaçtır?",
        options: ["108/64", "1", "32/108", "2", "108/32"],
        answer: 4,
        hint: "Cu için M/2 nedir?",
        explanation:
          "Ag için M/z=108, Cu için M/z=32 g/mol e⁻ olur. Oran 108/32=3,375’tir. 0,02 mol e⁻ örneğinde Ag 2,16 g, Cu 0,64 g oranı aynı verir.",
        guidance: {
          knowledge: ["Seride Q eşit, kütleler M/z ile orantılıdır."],
          strategy: "İki eşdeğer mol kütlesini ayrı hesapla.",
          steps: [
            "Ag için M/z=108, Cu için M/z=32 g/mol e⁻ olur.",
            "Oran 108/32=3,375’tir.",
          ],
          optionReasons: [
            "Mol kütlelerini karşılaştırıp Cu’nun 2 elektronunu unutmuştur.",
            "Eşit elektron yükü eşit ürün kütlesi demek değildir.",
            "İstenen Ag/Cu oranı ters çevrilmiştir.",
            "Yalnız iyon yüklerini karşılaştırmak mol kütlesi etkisini atlar.",
            "Eşit Q’da kütleler M/z ile orantılıdır; Ag 108/1, Cu 64/2=32.",
          ],
          commonError: "Aynı yükten aynı metal molü çıkarmama.",
          check: "0,02 mol e⁻ örneğinde Ag 2,16 g, Cu 0,64 g oranı aynı verir.",
        },
      },
      {
        prompt:
          "Al³⁺ içeren uygun eriyikte Al metali depolanıyor. 0,30 mol e⁻ hedefe ayrılmış, stok yeterli. M(Al)=27 g/mol. Biriken Al kaç g?",
        options: [
          "0 g; sulu ortamda Al oluşmaz",
          "2,70 g",
          "8,10 g",
          "24,30 g",
          "0,30 g",
        ],
        answer: 1,
        hint: "Verilen ortam sulu mu eriyik mi?",
        explanation:
          "n Al=0,30/3=0,10 mol olur. m Al=0,10×27=2,70 g. 0,10 mol Al için 0,30 mol e⁻ gerekir.",
        guidance: {
          knowledge: ["Verilen eriyik ürün için z=3 kullanılır."],
          strategy: "Elektron molünü ürün katsayısına böl.",
          steps: ["n Al=0,30/3=0,10 mol olur.", "m Al=0,10×27=2,70 g."],
          optionReasons: [
            "Kök sulu değil uygun eriyiktir; yanlış ortam eklenmiştir.",
            "Bir mol Al 3 mol e⁻ ister; 0,30/3×27=2,70 g.",
            "Elektron molü Al molü sanılmıştır.",
            "Üçe bölmek yerine üçle çarpılmıştır.",
            "Mol e⁻ sayısı grama doğrudan çevrilemez.",
          ],
          commonError: "Sulu/eriyik koşulunu ters varsayma.",
          check: "0,10 mol Al için 0,30 mol e⁻ gerekir.",
        },
      },
      {
        prompt:
          "Cu²⁺→Cu hedefi için Q=9650 C, iyon stoğu yeterli ve hedef akım verimi %80. F=96500 C/mol e⁻, M(Cu)=64 g/mol, z=2. Kütle kaç g?",
        options: ["4,00 g", "5,12 g", "0,80 g", "2,56 g", "3,20 g"],
        answer: 3,
        hint: "Hedefe toplam yükün tamamı mı gidiyor?",
        explanation:
          "Qhedef=0,80×9650=7720 C ve ne hedef=0,080 mol. Cu 0,040 mol olduğundan m=2,56 g. 2,56 g, %100 verim 3,20 g’nin %80’idir.",
        guidance: {
          knowledge: [
            "Yüzde η hedef akım verimiyse hedef yük (η/100)Q ile hesaplanır; enerji verimi değildir.",
          ],
          strategy: "Önce toplam yükün %80’ini ayır.",
          steps: [
            "Qhedef=0,80×9650=7720 C ve ne hedef=0,080 mol.",
            "Cu 0,040 mol olduğundan m=2,56 g.",
          ],
          optionReasons: [
            "Verimle çarpmak yerine 0,80’e bölmek ürünü artırmıştır.",
            "Cu’nun 2 elektron katsayısı unutulmuştur.",
            "Verim yüzdesini gram olarak etiketlemek madde hesabı değildir.",
            "Hedef yük 7720 C; ne 0,080 mol; Cu 0,040 mol; kütle 2,56 g.",
            "Bu %100 hedef verimi sonucudur; %80 verilmiştir.",
          ],
          commonError:
            "Daha düşük verimin aynı yükte daha çok metal üretmesini bekleme.",
          check: "2,56 g, %100 verim 3,20 g’nin %80’idir.",
        },
      },
      {
        prompt:
          "İnert anotlu Cu²⁺ çözeltisinde başlangıç hedef iyon stoğu 0,010 mol. Nominal %100 hedef verimle Q=3860 C geçiyor; F=96500 C/mol e⁻, M(Cu)=64 g/mol, z=2. Anot Cu²⁺ yenilemiyor. En çok kaç g Cu birikebilir?",
        options: [
          "1,280 g",
          "2,560 g",
          "0 g; inert anot hiçbir akım geçirmez",
          "3,860 g",
          "0,640 g",
        ],
        answer: 4,
        hint: "İki üst sınırdan hangisi küçük?",
        explanation:
          "Q/(z F)=3860/(2×96500)=0,020 mol Cu talebidir. Stok 0,010 mol olduğundan üst kütle 0,010×64=0,640 g olur. Hedef için 1930 C kullanılır; kalan yük başka süreçlere ayrılabilir.",
        guidance: {
          knowledge: [
            "Hedef miktar hem Q/(z F) hem başlangıç stok ile sınırlıdır.",
          ],
          strategy: "Teorik talep ile eldeki iyonun küçüğünü al.",
          steps: [
            "Q/(z F)=3860/(2×96500)=0,020 mol Cu talebidir.",
            "Stok 0,010 mol olduğundan üst kütle 0,010×64=0,640 g olur.",
          ],
          optionReasons: [
            "Bu yalnız yük sonucudur; mevcut Cu²⁺ stoğunu iki kat aşar.",
            "Hem stok hem değerlik yanlış hesaplanmıştır.",
            "İnert yüzey başka yükseltgenmeye aracılık edebilir; iyon stoğu Cu için vardır.",
            "Coulomb değeri grama keyfi ölçeklenmiştir.",
            "Yük 0,020 mol Cu talep etse de iyon stoğu 0,010 mol sınır koyar; 0,010×64=0,640 g.",
          ],
          commonError: "İnert anodu metal iyonunu yenileyen aktif anot sanma.",
          check:
            "Hedef için 1930 C kullanılır; kalan yük başka süreçlere ayrılabilir.",
        },
      },
      {
        prompt:
          "Su elektrolizinde H₂ için 2 mol e⁻/mol yarısı geçerli. Hedefe 0,10 mol e⁻ gidiyor. Kuru H₂ için 0°C ve 1 atm’de ideal molar hacim 22,4 L/mol verilmiştir. H₂ hacmi kaç L?",
        options: ["1,12 L", "2,24 L", "0,56 L", "22,4 L", "4,48 L"],
        answer: 0,
        hint: "İki elektron bir H₂ için mi bir H atomu için mi?",
        explanation:
          "n H₂=0,10/2=0,050 mol. V=0,050×22,4=1,12 L, verilen 0°C/1 atm yaklaşımındadır. Aynı koşulda O₂ molü bunun yarısı olurdu.",
        guidance: {
          knowledge: ["Gaz miktarında da doğru elektron/ürün oranı gerekir."],
          strategy: "H₂ molünü bulduktan sonra verilen molar hacmi kullan.",
          steps: [
            "n H₂=0,10/2=0,050 mol.",
            "V=0,050×22,4=1,12 L, verilen 0°C/1 atm yaklaşımındadır.",
          ],
          optionReasons: [
            "H₂ molü 0,10/2=0,050; hacim 0,050×22,4=1,12 L.",
            "Elektron molü H₂ molü sanılmıştır.",
            "Bu aynı yükte O₂ için 4 elektron katsayısının sonucudur.",
            "Verilen molar hacim bir mol içindir; burada bir mol yoktur.",
            "İkiye bölmek yerine ikiyle çarpma yapılmıştır.",
          ],
          commonError: "22,4 L’yi her sıcaklık ve basınç için sabit sanma.",
          check: "Aynı koşulda O₂ molü bunun yarısı olurdu.",
        },
      },
      {
        prompt:
          "Paralel iki elektroliz kolu aynı süre çalışıyor; kol akımları verilmemiştir. Hangisi kesin söylenebilir?",
        options: [
          "Her iki metal kütlesi eşittir",
          "Faraday yasaları paralelde geçersizdir",
          "Her kolun yükü için kendi akımı gerekir",
          "Her koldan toplam devre akımı aynen geçer",
          "Yükler her koşulda eşittir",
        ],
        answer: 2,
        hint: "Q için t dışında hangi veri gerekli?",
        explanation:
          "Her kol Q=Ikol·t bağıntısını ayrı sağlar. Akım payları verilmeden yük, mol veya kütle eşitliği kurulamaz. I1=2 A ve I2=1 A olan aynı süreli iki kol bile karşı örnektir.",
        guidance: {
          knowledge: ["Paralelde akım bölüşür; seride ortak akım vardır."],
          strategy:
            "Aynı t verilmesinin tek başına Q’yu belirleyip belirlemediğini düşün.",
          steps: [
            "Her kol Q=Ikol·t bağıntısını ayrı sağlar.",
            "Akım payları verilmeden yük, mol veya kütle eşitliği kurulamaz.",
          ],
          optionReasons: [
            "Yükler bilinmiyor; ayrıca M/z ve verim de önemlidir.",
            "Yasalar her kol için geçerlidir; eksik olan I verisidir.",
            "Qkol=Ikol·t; aynı süre akımların ve yüklerin eşitliğini sağlamaz.",
            "Bu toplam akımı her kolda tekrarlayıp yükü fazla sayar.",
            "Paralelde akım payları bilinmeden eşit Q çıkarılamaz.",
          ],
          commonError: "Seri bağlantının eşit Q kuralını paralele taşıma.",
          check:
            "I1=2 A ve I2=1 A olan aynı süreli iki kol bile karşı örnektir.",
        },
      },
      {
        prompt:
          "Seri bağlı iki uygun eriyik hücrede Ca²⁺ ve Xⁿ⁺ iyonları %100 verimle metallere dönüşüyor. Ca 0,15 mol ve X 0,10 mol oluşmuş. X iyonunun n değeri kaçtır?",
        options: ["6", "3", "1", "2", "4"],
        answer: 1,
        hint: "Her Ca²⁺ kaç elektron ister?",
        explanation:
          "Ca için ne=2×0,15=0,30 mol’dür. X başına elektron 0,30/0,10=3; n=3 bulunur. 0,10 mol X³⁺ de 0,30 mol e⁻ alır.",
        guidance: {
          knowledge: ["Seri hücrelerde elektron molü ortaktır."],
          strategy: "Bilinen Ca²⁺ yarısından ortak ne’yi bul.",
          steps: [
            "Ca için ne=2×0,15=0,30 mol’dür.",
            "X başına elektron 0,30/0,10=3; n=3 bulunur.",
          ],
          optionReasons: [
            "Bu X için 0,60 mol e⁻ ister; ortak yükün iki katıdır.",
            "Ortak ne=2×0,15=0,30 mol; n=0,30/0,10=3.",
            "Bu X miktarının 0,30 mol olmasını gerektirirdi; veri 0,10 mol.",
            "Bu X miktarını 0,15 mol yapardı; verilene eşit değildir.",
            "Bu X için 0,40 mol e⁻ gerektirir; Ca 0,30 mol belirler.",
          ],
          commonError: "Metal mollerini doğrudan birbirine eşitleme.",
          check: "0,10 mol X³⁺ de 0,30 mol e⁻ alır.",
        },
      },
      {
        prompt:
          "Cu²⁺+2e⁻→Cu için %100 hedef verim ve stok yeterli. 1,28 g Cu isteniyor. M=64 g/mol, F=96500 C/mol e⁻, I=2 A. Süre kaç saniyedir?",
        options: ["3860 s", "1930 dakika", "32,17 s", "1930 s", "965 s"],
        answer: 3,
        hint: "Önce kaç mol Cu ve elektron gerekir?",
        explanation:
          "1,28/64=0,020 mol Cu, gereken ne=0,040 mol ve Q=3860 C. t=3860/2=1930 s. 2 C/s×1930 s=3860 C sağlanır.",
        guidance: {
          knowledge: ["Süreyi bulmak için ürün molünden gereken yüke dön."],
          strategy: "m/M, z, F adımlarından sonra t=Q/I kullan.",
          steps: [
            "1,28/64=0,020 mol Cu, gereken ne=0,040 mol ve Q=3860 C.",
            "t=3860/2=1930 s.",
          ],
          optionReasons: [
            "Q sayısı I ile bölünmeden saniye yazılmıştır.",
            "Hesap Q/I ile saniye verir; birim etiketi yanlış.",
            "Bu 1930 s’nin dakika sayısıdır; saniye olarak yazılamaz.",
            "Cu 0,020 mol, ne 0,040 mol, Q 3860 C; 2 A’da 1930 s.",
            "İki elektron katsayısı unutulursa yarı süre bulunur.",
          ],
          commonError: "Doğru sayıyı yanlış birimle etiketleme.",
          check: "2 C/s×1930 s=3860 C sağlanır.",
        },
      },
    ],
  },
  {
    id: "korozyon-katodik-koruma",
    title: "Korozyon ve katodik koruma: yüzeydeki redoksu yönet",
    detail: "detail-444",
    minutes: 110,
    objectives: [
      "Nemli demir yüzeyinde anodik metal kaybı ve katodik indirgenmeyi ayır.",
      "Aktiflik, pasif film, ortam ve galvanik bağlantının farklı etkilerini açıkla.",
      "Bariyer, kurban anot veharici akım yöntemlerini devreleriyle karşılaştır.",
      "Verilmiş yük ihtiyacını sonlu koruyucu metalin üst kapasitesiyle sınırlı biçimde kıyasla.",
    ],
    sections: [
      {
        title: "Korozyon malzemenin çevreyle kimyasal değişimidir",
        paragraphs: [
          "Korozyon terimi özellikle metallerin çevreyle kimyasal veya elektrokimyasal etkileşerek bozulması için kullanılır. Demirin paslanması tanıdık bir örnektir; fakat her metal aynı ürünleri ve aynı yüzey görünümünü vermez. Ahşap veya plastiğin bozulmasını da görürüz, ama metal korozyonunun redoks mekanizması bu başka süreçlerle özdeş değildir.",
          "Bir olayın kendiliğinden ilerleyebilmesi onun istenen veya yararlı olması demek değildir. Korozyon malzeme kaybı, sızıntı, bakım ve işlev sorunları doğurabilir. Önleme yaklaşımı yalnız güzel bir dış görünüm değil, hangi yarı tepkimenin hangi yüzeyde gerçekleştiğini ve ortamın bu devreyi nasıl tamamladığını anlamaktır.",
        ],
      },
      {
        title: "Aynı yüzeyde küçük anot ve katot alanları",
        paragraphs: [
          "Nemli demir üzerinde farklı bölgeler aynı elektrokimyasal devrenin parçaları olabilir. Anodik bölgede Fe→Fe²⁺+2e⁻ yazılır; demir metalden çözelti türüne geçtiği için bu bölge madde kaybeder. Elektronlar metalin içinden başka bir yüzey bölgesindeki katodik sürece iletilebilir.",
          "Katot bölgesi her zaman ayrı bir metal çubuk olmak zorunda değildir; aynı parçada farklı yerel koşullar yeterli olabilir. Su filmi ve iyonlar yük aktarımının sıvı bölümünü sağlar. Böylece dışarıdan pil bağlanmamış bir demir yüzeyinde de eşleşmiş yükseltgenme ve indirgenme bulunabileceğini görürsün.",
        ],
      },
      {
        title: "Oksijen elektron alır, itilerek korunmaz",
        paragraphs: [
          "Havayla temas eden nötr veya bazik sulu örnekte katodik yarı O₂+2 H₂O+4e⁻→4 OH⁻ olabilir. Asidik uygun koşulda O₂+4 H⁺+4e⁻→2 H₂O biçimi kullanılır. İki yazım da elektron alımıdır; O₂ molekülünü baştan negatif yüklü bir iyon gibi göstermeye gerek yoktur.",
          "Katodik koruma, negatif oksijenin negatif yüzeyden itilmesi diye açıklanmaz. Oksijen yüzeye ulaşabilir ve elektron alarak indirgenebilir; korunan metalin anodik çözünmesi baskılanır. Oksijeni yalıtımla uzak tutmak başka bir bariyer yaklaşımıdır. İki yöntemin mekanizmasını aynı cümlede karıştırma.",
        ],
      },
      {
        title: "Pas, ilk yarı tepkimenin kendisi değildir",
        paragraphs: [
          "Demirin Fe²⁺ olarak çözünmesi ilk anodik adımdır. Yerel OH⁻ ile hidroksitler oluşabilir ve oksijenle sonraki değişimler demir(III) içeren sulu oksit/oksihidroksit karışımlarına ilerleyebilir. Pas için kullanılan Fe₂O₃·n H₂O gösterimi bu değişken hidratlı ürünlerin basitleştirilmiş anlatımıdır.",
          "Bütün pası tek sabit n değerine sahip saf bir madde sayma. Renk ve ürün yapısı ortama göre değişebilir. Bir yarı tepkimede Fe²⁺ çıkması, hemen yalnız Fe₂O₃ elde edildiğini kanıtlamaz. Soru hangi aşamayı ve ürünü açık veriyorsa onun dengeli denklemine göre işlem yap.",
        ],
      },
      {
        title: "Ortam, iletkenlik ve asitlik birlikte önemlidir",
        paragraphs: [
          "Nemli ortam metal ile çözelti arasında iyon hareketine yol sağlayabilir. Çözünmüş tuzlar iletkenliği artırabilir; asidik koşullar da belirli yüzeylerde korozyon davranışını değiştirebilir. Bu yüzden deniz, ıslak toprak ve asitli ortam örnekleri aynı malzemenin kuru kullanımından farklı değerlendirilebilir.",
          "Yine de yalnız tuz adı veya pH sayısı her metalin kesin korozyon hızını vermez. Oksijen taşınımı, pasif film, sıcaklık ve alaşım yapısı da önemlidir. Öğretim modelinin kuru seçeneği bu sulu devrede iyon yolu yok demektir; çok yüksek sıcaklıktaki kuru yükseltgenme gibi başka süreçlerin evrensel olarak imkânsızlığı değildir.",
        ],
      },
      {
        title: "Aktiflik ile korozyon hızı aynı ölçü değildir",
        paragraphs: [
          "Standart indirgenme potansiyeli metal/iyon çiftinin belirli termodinamik eğilimini karşılaştırır. Daha aktif bir metalin uygun bağlamda kurban anot olması bu kıyasa dayanır. Fakat bir metalin görünür ortamda ne kadar hızlı aşındığı yalnız bu sayıdan bulunmaz.",
          "Alüminyum gibi metallerde uygun pasif yüzey filmi koruyucu olabilir; çinko ve çeşitli alaşımlarda da yüzey/ortam davranışı önemlidir. Aktiflik sırası verilmiş bir soruyu çözebilirsin, ama bu sırayı bütün ortamlarda saat başına kayıp listesine çeviremezsin. Kinetik ve pasivasyon, termodinamik yönle birlikte düşünülmelidir.",
        ],
      },
      {
        title: "Farklı metaller temasta galvanik çift kurabilir",
        paragraphs: [
          "Fe ile Cu uygun bir elektrolitte metalik olarak bağlanırsa verilen standart kıyasta Fe daha kolay yükseltgenen taraf olabilir. Fe anodik çözünmeye, Cu yüzeyi katodik indirgenmeye katkı yapabilir. Soy bir metalin varlığı korunacak demir için otomatik koruma anlamına gelmez.",
          "Bu eğilimden gerçek aşınma hızını sayısal çıkarmak için yüzey alanları, temas ve ortam verileri gerekir. Özellikle küçük açık Fe alanı ile büyük soy kaplama alanı farklı akım dağılımı doğurabilir. Model bu bağlamı bir risk yönü olarak gösterir; alan oranı verilmeden kaç gram/hız öngörmez.",
        ],
      },
      {
        title: "Boya ve kaplama bir bariyer olabilir",
        paragraphs: [
          "Uygun bir boya veya yalıtıcı tabaka metalin su, oksijen ve iyonlarla temasını azaltabilir. İdeal kesintisiz bariyer örneğinde yüzeye sulu elektrokimyasal yol açılmaz. Bu koruma, anotta başka metalin harcanmasıyla elektron sağlamaktan farklı bir mekanizmadır.",
          "Gerçek kaplama kusurları, çizikler ve geçirgenlik zamanla önem kazanabilir. Çizik açıldığında alttaki metal ortamla yeniden temas eder. O yüzden yalnız nesnenin boyalı olduğunu bilmek ömür boyu eksiksiz koruma garantisi değildir; bakım ve yüzey bütünlüğü ilgili koşullardır.",
        ],
      },
      {
        title: "Çinkoyla ve bakırla kaplama aynı değildir",
        paragraphs: [
          "Demir üzerindeki uygun Zn kaplama hem bariyer hem de elektriksel/iyonik bağlantı varken daha aktif metalin kurban rolüyle katkı sağlayabilir. Çizikte Fe açığa çıksa bile kalan Zn, uygun koşulda elektron vererek Fe’nin katodik kalmasına yardımcı olabilir. Koruyucu metal stoğu bu yüzden önemlidir.",
          "Cu veya Ni gibi daha soy kaplama ise kesintisizken bariyer olabilir; çizikte açık Fe ile uygun galvanik çift kurulduğunda Fe anodik taraf hâline gelebilir. Bu ayrım yalnız kaplama parlaklığıyla anlaşılmaz. Hangi metalin daha aktif olduğu ve iki iletim yolunun tamamlanıp tamamlanmadığı sorulmalıdır.",
        ],
      },
      {
        title: "Kurban anot elektron verir",
        paragraphs: [
          "Korunacak Fe’ye uygun Mg veya Zn gibi daha aktif bir metal bağlandığında bu metal yükseltgenmeye aday olur. Mg→Mg²⁺+2e⁻ veya Zn→Zn²⁺+2e⁻ yarısı elektron sağlar; Fe yüzeyindeki katodik süreç bu elektronları kullanabilir. Kurban olarak kaybedilen metal anottur, korunacak yapı katodik tutulur.",
          "Galvanik kurban anot yönteminde metalin yapıya doğrudan veya iletken kabloyla bağlanması gerekir. Aynı suyun yakınına bağlantısız bir parça bırakmak, elektronların mutlaka yapıya ulaştığını göstermez. Hem metalik elektron yolu hem ortamın uygun iyonik yolu birlikte değerlendirilir.",
        ],
      },
      {
        title: "Kurban anot ile harici akımı ayır",
        paragraphs: [
          "Kurban anot koruması uygun aktif metalin kendi yükseltgenme eğiliminden yararlanır. Harici akım katodik korumasında ise dış doğru akım kaynağı, korunacak yapıyı katodik yönde besler; uygun yardımcı anot ve elektrolit yolu kullanılır. İki yöntemin devreleri aynı değildir.",
          "Harici akım düzenindeki pozitif yardımcı anot ile galvanik kurban anodu aynı kutup çizimiymiş gibi kopyalama. Her iki yöntemde değişmeyen hedef, korunacak metalin anodik çözünmesini azaltmaktır. Gerçek tasarımda korunma potansiyeli, akım dağılımı ve ortam koşulları ayrıca denetlenir.",
        ],
      },
      {
        title: "Sonlu koruyucu stoğun kapasitesi",
        paragraphs: [
          "İdeal yüzde 100 anot kullanımıyla n mol iki değerlikli Mg veya Zn en çok 2n mol elektronluk yük sağlayabilir. Qüst=zFn ilişkisi, sabit olarak verilmiş bir örnek yük ihtiyacına karşı stokun yeterli olup olmadığını kıyaslamaya yarar. Bu, maddenin tükendikçe yenilenmesi gerektiğini nicel gösterir.",
          "Bu üst kapasiteyi doğrudan gerçek saha ömrü yılına dönüştürme. Gerçek kullanım verimi, pasivasyon, akım talebi, alan ve koruma potansiyeli bilinmelidir. Etkileşimde seçilen yük önceden verilmiş bir öğretim ihtiyacıdır; ölçülmüş korozyon akımı veya bir borunun gerçek güvenli ömrü değildir.",
        ],
      },
      {
        title: "Koruma her koşulda tek yöntem değildir",
        paragraphs: [
          "Dayanıklı malzeme seçimi, ortamı değiştirme, uygun bariyer, kaplama veya katodik koruma farklı işlevler görebilir. Bir sistemde yöntemler birlikte kullanılabilir; örneğin kaplama etkin alanı azaltırken katodik koruma kusur bölgelerinde katkı sağlayabilir. Hangi seçimin uygunluğu çalışma koşuluna bağlıdır.",
          "Katodik koruma her malzemede her koşulda en etkili ve en ucuz çözüm diye evrensel sıralanmaz. Bakım, erişim, çevre etkisi ve malzeme uyumu düşünülür. Öğrenilen temel, istenmeyen anodik çözünmeyi hangi süreç üzerinden değiştirdiğini gösterebilmek; reklam gibi tek bir üstünlük sözü seçmek değildir.",
        ],
      },
      {
        title: "Uygulama örneklerinde devreyi ara",
        paragraphs: [
          "Gemi gövdesi, sıvı tankı, boru hattı veya nemli toprakla temaslı çelik parçalarda uygun kurban anot uygulamaları bulunabilir. Aktif metal parçası ile korunacak yapının kablo/temas bağlantısı ve elektrolit ortamı şekilde birlikte görünmelidir. Metalin yalnız toprağın üstünde havada yakın durması yeterli işlev çizimi değildir.",
          "Malzemenin kütlesi azalınca bağlantı ve anot durumu kontrol edilmelidir; koruma stoğu kendiliğinden sonsuz kalmaz. Ancak gerçek bakım aralığı bu dersin basit modelinden çıkarılmaz. Modelin yaptığı, verilmiş malzeme ve elektron bütçesini görünür ve izlenebilir kılmaktır.",
        ],
      },
      {
        title: "Bir soruyu mekanizmayla sonuçlandır",
        paragraphs: [
          "Önce hangi metal kaybediliyor, hangi yüzeyde ne indirgeniyor belirle. Sonra elektron ve iyon yollarını çiz; kaplamanın bariyer mi kurban mı olduğunu ayır. Sayısal veriler varsa yalnız verilen yarı tepkime ve Faraday katsayılarıyla üst stok hesabı yap.",
          "Son cümlende sonucu kapsamıyla söyle: bu standart kıyasta Mg kurban adaydır, bu ideal yük için stok yeterlidir veya bu çizikte Fe anodik risk taşır gibi. Yalnız seçilen mavi renk veya eksi işaret koruma kanıtı değildir. Oksijenin nötr molekül olduğunu, indirgenme ile itilmenin farklı kavramlar olduğunu koru.",
        ],
      },
    ],
    examples: [
      {
        title: "Kurban metali standart kıyasla seç",
        prompt:
          "Fe²⁺/Fe için E°=−0,440 V, Zn²⁺/Zn için −0,763 V ve Cu²⁺/Cu için +0,337 V veriliyor. Uygun elektrolit ve metalik temas koşulunda Fe’ye kurban anot adayını seç; hız hesabı istenmiyor.",
        strategy:
          "Daha düşük indirgenme değerine sahip metalin yükseltgenme eğilimini karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Zn’nin −0,763 V değeri Fe’den küçüktür; uygun çiftte Zn yükseltgenmeye adaydır.",
          },
          {
            label: "2. adım",
            explanation:
              "Cu’nun +0,337 V değeri daha büyüktür; Fe–Cu çiftinde Fe anodik tarafta kalabilir, Cu kurban olmaz.",
          },
          {
            label: "3. adım",
            explanation:
              "Zn anot olarak elektron sağlayıp Fe yüzeyinin katodik tutulmasına yardım edebilir; bu standart yön kıyası gerçek hız veya yıl ömrü vermez.",
          },
        ],
        answer: "Zn uygun kurban anot adayıdır.",
        check:
          "Fe indirgenme verisi eksi Zn indirgenme verisi −0,440−(−0,763)=+0,323 V standart yön farkıdır.",
        pitfall: "Soy metalin her zaman koruyucu kurban olduğunu sanma.",
      },
      {
        title: "Çinko stoğunu yükle karşılaştır",
        prompt:
          "İdeal %100 kullanımda 0,650 g Zn, Zn²⁺ olacak şekilde kurban anot adayıdır. M(Zn)=65 g/mol, F=96500 C/mol e⁻ ve örnek ihtiyaç 1500 C verilmiştir. Stok üst kapasitesi yeterli mi?",
        strategy: "Metal molü→elektron molü→yük üst sınırını hesapla.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "n Zn=0,650/65=0,010 mol; z=2 ile ne üst=0,020 mol’dür.",
          },
          {
            label: "2. adım",
            explanation:
              "Qüst=0,020×96500=1930 C olur; verilmiş 1500 C yükünden büyüktür.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu ideal bütçede gereken en az Zn 1500/(2×96500)×65≈0,505 g; yaklaşık 0,145 g stok kalır. Gerçek koruma tasarımı ayrıca koşul ister.",
          },
        ],
        answer: "1930 C üst kapasite, 1500 C için ideal bütçede yeterlidir.",
        check:
          "Kullanılan ve kalan Zn toplamı 0,650 g olur; kapasite gerçek yıl ömrü değildir.",
        pitfall:
          "Faraday üst kapasitesini saha verimi bilinmeden ömür garantisi yapma.",
      },
      {
        title: "Nötr oksijen yarısını birleştir",
        prompt:
          "Nemli nötr ortam modeli için Fe→Fe²⁺+2e⁻ ve O₂+2 H₂O+4e⁻→4 OH⁻ veriliyor. Elektronları sadeleştiren ilk net denklem nedir?",
        strategy: "Demir yarısını ikiyle çarpıp atom ve yükleri kontrol et.",
        steps: [
          {
            label: "1. adım",
            explanation: "İki Fe atomu 2 Fe→2 Fe²⁺+4e⁻ ile 4 elektron verir.",
          },
          {
            label: "2. adım",
            explanation:
              "Oksijen yarısı aynı 4 elektronu alır; toplayınca 2 Fe+O₂+2 H₂O→2 Fe²⁺+4 OH⁻ olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Sağ toplam yük +4−4=0, sol 0; Fe 2, O 4, H 4 atomları korunur. Bu ilk adım sonrasında hidroksit/pas süreçleri ayrıca olabilir.",
          },
        ],
        answer: "2 Fe+O₂+2 H₂O→2 Fe²⁺+4 OH⁻.",
        check: "O₂ başlangıçta nötrdür; katodik yarı elektron alır.",
        pitfall: "Oksijeni önceden negatif yüklü sayıp itilmeyle açıklama.",
      },
      {
        title: "Bağlantı kesilince stok tek başına yetmez",
        prompt:
          "Islak Fe yapısının yanında uygun Mg parçası var; ancak aradaki metalik kablo kopuk ve başka elektron bağlantısı yok. Mg kütlesi yeterli görünüyor. Sadece bu stokla Fe’nin katodik korunduğu söylenebilir mi?",
        strategy: "Kapasiteden önce devre sürekliliğini denetle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Mg uygun aktif aday olsa bile elektronların Fe’ye ulaşacağı metalik yol verilmemiştir; kopuk kablo bu yolu keser.",
          },
          {
            label: "2. adım",
            explanation:
              "Ortak iyonik ortam tek başına dış elektron yolunun yerini tutmaz. Mg’nin kendi yüzey tepkimeleri Fe’ye hedef koruma sağlandığını kanıtlamaz.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu düzenek için stok yeterli demek, koruma devresinin çalıştığını göstermez. Bağlantı ve uygun koruma koşulları ayrıca kurulmalıdır.",
          },
        ],
        answer:
          "Hayır; yalnız stok bilgisi ve kopuk bağlantıyla Fe koruması kanıtlanmaz.",
        check: "Metalik ve iyonik iki yol ayrı ayrı aranmıştır.",
        pitfall:
          "Yakındaki aktif metal parçasını bağlantısızken çalışan kurban anot sanma.",
      },
    ],
    recall: [
      {
        prompt: "Katodik koruma oksijeni negatif olduğu için iter mi?",
        answer:
          "Hayır. O₂ molekülü nötrdür; uygun katodik yüzeyde elektron alarak indirgenebilir. Koruma, metalin anodik çözünmesini azaltma mekanizmasıdır.",
      },
      {
        prompt: "Kurban anotla Fe arasında hangi yollar gerekir?",
        answer:
          "Elektron için metalik temas/kablo ve iyonlar için uygun elektrolit yolu birlikte gerekir.",
      },
      {
        prompt: "Aktif metalin daha hızlı aşınması her ortamda kesin mi?",
        answer:
          "Hayır. Pasivasyon, yüzey, alaşım ve ortam hız belirler; standart yön kıyası kinetik ölçüm değildir.",
      },
      {
        prompt: "Q=zFn hesaplamak gerçek bakım yılını verir mi?",
        answer:
          "Yalnız ideal stok üst kapasitesi verir. Gerçek verim, akım talebi, alan ve koruma potansiyeli bilinmeden yıl ömrü hesaplanmaz.",
      },
    ],
    questions: [
      {
        prompt:
          "Nemli Fe yüzeyinde Fe→Fe²⁺+2e⁻ gerçekleşiyor. Bu yüzey bölgesinin görevi nedir?",
        options: [
          "Oksijenin negatif yükle itilmesi",
          "Anodik yükseltgenme",
          "Katodik indirgenme",
          "Yalnız asit-baz nötrleşmesi",
          "Hiç madde kaybı olmayan inert yüzey",
        ],
        answer: 1,
        hint: "Elektronlar ürün mü giren mi?",
        explanation:
          "Fe 0’dan +2’ye geçip 2e⁻ verir. Bu anodik metal çözünmesidir; katodik süreç başka bölgede elektron alır. Sol ve toplam sağ yük 0; atom korunur.",
        guidance: {
          knowledge: ["Yükseltgenme elektron vermedir ve anotta olur."],
          strategy: "Denklemde elektronun hangi tarafta olduğuna bak.",
          steps: [
            "Fe 0’dan +2’ye geçip 2e⁻ verir.",
            "Bu anodik metal çözünmesidir; katodik süreç başka bölgede elektron alır.",
          ],
          optionReasons: [
            "Denklemde böyle bir mekanizma yoktur; Fe yükseltgenir.",
            "Fe elektron verip iyonlaştığı için anodik çözünme olur.",
            "Elektron alımı değil verimi gerçekleşmektedir.",
            "Verilen Fe oksidasyon basamağı 0’dan +2’ye değişir; redokstur.",
            "Fe metalden iyona geçtiği için metal stoku kaybolur.",
          ],
          commonError: "Fe²⁺ oluşumunu indirgenme sanma.",
          check: "Sol ve toplam sağ yük 0; atom korunur.",
        },
      },
      {
        prompt:
          "Nötr sulu ortam için O₂+2 H₂O+4e⁻→4 OH⁻ verilmiştir. Doğru açıklama hangisidir?",
        options: [
          "Bu bir anodik Fe çözünmesidir",
          "Katotta elektron verilmiştir",
          "Su atomları yok olur",
          "O₂ katodik süreçte elektron alır",
          "O₂ baştan negatif yüklüdür ve katottan itilir",
        ],
        answer: 3,
        hint: "O₂ üstünde yük işareti var mı?",
        explanation:
          "O₂ ve H₂O, 4e⁻ alarak 4 OH⁻ oluşturur. Bu mekanizma elektron alımıdır; negatif oksijenin itilmesi değildir. O4, H4 ve toplam −4 yük iki tarafta korunur.",
        guidance: {
          knowledge: ["Katodik süreç indirgenmedir; O₂ nötr moleküldür."],
          strategy: "Elektronların giren tarafta olmasını oku.",
          steps: [
            "O₂ ve H₂O, 4e⁻ alarak 4 OH⁻ oluşturur.",
            "Bu mekanizma elektron alımıdır; negatif oksijenin itilmesi değildir.",
          ],
          optionReasons: [
            "Denklemde Fe yoktur ve elektronlar alınır.",
            "Elektronlar giren taraftadır; alım vardır.",
            "Atomlar OH⁻ içinde korunur; madde yok olmaz.",
            "Oksijen başlangıçta nötrdür; verilen yarıda indirgenir.",
            "Nötr O₂ ile oksit/hidroksit iyonları karıştırılmıştır.",
          ],
          commonError:
            "O₂’nin molekül yüküyle O atomunun oksidasyon basamağını karıştırma.",
          check: "O4, H4 ve toplam −4 yük iki tarafta korunur.",
        },
      },
      {
        prompt:
          "Verilen standart aktiflik sırası Mg>Zn>Fe>Cu. Uygun elektrolit ve metalik bağlantı varsayımıyla Fe için kurban anot adayları hangileridir?",
        options: [
          "Mg ve Zn",
          "Yalnız Cu",
          "Fe ve Cu",
          "Yalnız Fe",
          "Hiçbiri; aktiflik sırası bir kavram değildir",
        ],
        answer: 0,
        hint: "Sıra Fe’ye göre hangi iki metali daha aktif veriyor?",
        explanation:
          "Mg ve Zn Fe’den önce gelir; elektron vermeye adaydırlar. Cu daha pasif olduğundan Fe’yi kurban olarak çözdürme yönü doğurabilir; seçilmez. Gerçek pasivasyon ve bağlantı koşulları ayrı tasarım gerektirir.",
        guidance: {
          knowledge: [
            "Kurban metal, korunacak metalden daha aktif bir adaydır.",
          ],
          strategy: "Verilen sırada Fe’nin önündekileri bul.",
          steps: [
            "Mg ve Zn Fe’den önce gelir; elektron vermeye adaydırlar.",
            "Cu daha pasif olduğundan Fe’yi kurban olarak çözdürme yönü doğurabilir; seçilmez.",
          ],
          optionReasons: [
            "Fe’den aktif oldukları için uygun bağlamda anodik yükseltgenmeye adaydırlar.",
            "Cu verilen sırada Fe’den pasiftir; kurban metal seçimi değildir.",
            "Aynı Fe verisi fark sağlamaz; Cu da Fe’den pasiftir.",
            "Aynı metal parçasını bağlamak bu aktiflik kıyasında yeni bir kurban anot seçimi sağlamaz.",
            "Verilen sıra uygun koşullarda yön kıyasına yarar; hız ile karıştırılmamalıdır.",
          ],
          commonError: "Soy metali koruyucu anot sanma.",
          check:
            "Gerçek pasivasyon ve bağlantı koşulları ayrı tasarım gerektirir.",
        },
      },
      {
        prompt:
          "Fe yapı ile Mg parçası aynı ıslak ortamda ama elektriksel bağlantıları kopuk. Başka elektronik yol verilmemiş. Hangi yorum doğrudur?",
        options: [
          "Mg yakınsa Fe kesin korunur",
          "Su dış telde elektronları aynen taşır",
          "Kabloya gerek yoktur; her stok koruyucudur",
          "Fe artık kimyasal olarak Mg elementine dönüşür",
          "Yalnız Mg stoğunun çokluğu Fe korumasını kanıtlamaz",
        ],
        answer: 4,
        hint: "Elektron Fe’ye hangi yoldan gidecek?",
        explanation:
          "Islak ortam iyonik bölümü sağlayabilir; kopuk metalik yol ayrı sorundur. Verilen koşulda elektronların Fe’ye beslendiği gösterilemez. Kapasite yeterliliği devre sürekliliğinin yerine geçmez.",
        guidance: {
          knowledge: [
            "Koruma devresi elektronik ve iyonik yolu birlikte ister.",
          ],
          strategy: "Stok hesabından önce bağlantıyı denetle.",
          steps: [
            "Islak ortam iyonik bölümü sağlayabilir; kopuk metalik yol ayrı sorundur.",
            "Verilen koşulda elektronların Fe’ye beslendiği gösterilemez.",
          ],
          optionReasons: [
            "Yakınlık elektron iletim yolu değildir.",
            "Çözeltide iyonik iletim, metalik telde elektronik iletimden ayrıdır.",
            "Kurban anot yönteminde elektriksel süreklilik gerekir.",
            "Metaller böyle element kimliği değiştirmez.",
            "Elektronların Fe’ye ulaşacağı metalik yol olmadığından kurban-devre kanıtlanmaz.",
          ],
          commonError: "Aynı suda bulunmayı metalik bağlantı sanma.",
          check: "Kapasite yeterliliği devre sürekliliğinin yerine geçmez.",
        },
      },
      {
        prompt:
          "İdeal %100 anot kullanımında 0,650 g Zn, Zn²⁺ yükseltgenmesiyle harcanabilir. M(Zn)=65 g/mol, F=96500 C/mol e⁻. Stokiyometrik üst yük kaç C?",
        options: [
          "125450 C",
          "0 C; Zn elektron veremez",
          "1930 C",
          "965 C",
          "9650 C",
        ],
        answer: 2,
        hint: "Bir Zn kaç elektron verir?",
        explanation:
          "0,650/65=0,010 mol Zn. 2×0,010 mol e⁻×96500=1930 C üst kapasitedir. Bu yük için ideal kullanım verilmiştir; gerçek yıl ömrü değildir.",
        guidance: {
          knowledge: ["Qüst=z F·m/M bağıntısı uygun yarıdan gelir."],
          strategy: "Gramı metal molüne dönüştür.",
          steps: [
            "0,650/65=0,010 mol Zn.",
            "2×0,010 mol e⁻×96500=1930 C üst kapasitedir.",
          ],
          optionReasons: [
            "Gram doğrudan mol yerine kullanılmıştır.",
            "Verilen Zn→Zn²⁺+2e⁻ yarısı elektron verir.",
            "n Zn 0,010 mol, z 2; 0,020×96500=1930 C.",
            "İki elektron katsayısı unutulmuştur.",
            "Metal molü 10 kat büyük alınmıştır.",
          ],
          commonError: "Gram ile molü eşit sanma.",
          check:
            "Bu yük için ideal kullanım verilmiştir; gerçek yıl ömrü değildir.",
        },
      },
      {
        prompt:
          "İdeal Zn kurban anodunun üst kapasitesi 1930 C, bir öğretim örneğinde istenen elektron desteği 2500 C olarak veriliyor. Hangisi doğrudur?",
        options: [
          "E° değeri 570 V azalır",
          "570 C bütçe açığı vardır; stok bu kıyasa yetmez",
          "Stok kesin 2500 C sağlar",
          "Koruma bütün sahalarda 1930 yıl sürer",
          "Fe mutlaka 570 g aşınır",
        ],
        answer: 1,
        hint: "İki sayının birimi aynı mı?",
        explanation:
          "2500 C ihtiyaç 1930 C üst kapasiteden büyüktür. Eksik 570 C’dir; alan, verim ve koruma potansiyeli verilmeden Fe kaybı ve ömrü bulunamaz. 1930+570=2500 C.",
        guidance: {
          knowledge: ["Kapasite ile ihtiyaç aynı C biriminde kıyaslanır."],
          strategy: "Eksik yükü hesapla, sonucun neyi ölçmediğini de belirt.",
          steps: [
            "2500 C ihtiyaç 1930 C üst kapasiteden büyüktür.",
            "Eksik 570 C’dir; alan, verim ve koruma potansiyeli verilmeden Fe kaybı ve ömrü bulunamaz.",
          ],
          optionReasons: [
            "Yük ile gerilim farklı büyüklüklerdir; bu çıkarma V vermez.",
            "2500−1930=570 C; eksik bütçe gerçek Fe kaybı gramını kendiliğinden vermez.",
            "Verilen üst kapasite 1930 C olduğundan bu kütle ek yükü sağlayamaz.",
            "Coulomb zaman ve gerçek saha ömrü değildir.",
            "Yük açığını grama sayısal olarak eşitlemek birim hatasıdır; gerçek mekanizma verisi yoktur.",
          ],
          commonError: "Yük açığını gram veya yıl olarak etiketleme.",
          check: "1930+570=2500 C.",
        },
      },
      {
        prompt:
          "Bariyer kaplama kesintisiz ve yalıtkan kabul ediliyor; Fe yüzeyi sulu ortamdan ideal olarak ayrılmıştır. Korumanın bu örnekteki mekanizması nedir?",
        options: [
          "Boyanın mutlaka Zn²⁺ yükseltgenmesi",
          "O₂’nin negatif yükle elektrostatik itilmesi",
          "Fe atomlarının Cu’ya dönüşmesi",
          "F sabitinin sıfırlanması",
          "Metal-ortam temasının kesilmesi",
        ],
        answer: 4,
        hint: "Ortam ile bir temas kalıyor mu?",
        explanation:
          "Soru ideal eksiksiz yalıtımı veriyor; Fe yüzeyinde sulu yol kesiliyor. Bu etki ortamla metalin temasını azaltmaktır; kurban metal bütçesi gerektirmez. Gerçek çizik veya geçirgenlik varsa ideal koşul değişir.",
        guidance: {
          knowledge: [
            "Bariyer koruması ile katodik elektron beslemesi ayrı yöntemlerdir.",
          ],
          strategy: "Verilen düzende tüketilen aktif anot var mı bak.",
          steps: [
            "Soru ideal eksiksiz yalıtımı veriyor; Fe yüzeyinde sulu yol kesiliyor.",
            "Bu etki ortamla metalin temasını azaltmaktır; kurban metal bütçesi gerektirmez.",
          ],
          optionReasons: [
            "Boya Zn olarak verilmemiştir; bu farklı kurban anot mekanizmasıdır.",
            "O₂ nötrdür; yalıtım bu mekanizmadan farklıdır.",
            "Kimyasal kaplamayla element çekirdeği değişmez.",
            "Bariyer teması değiştirir; temel elektrokimyasal sabiti değiştirmez.",
            "İdeal bariyer su/iyon/oksijen erişimini sınırlar; kurban metal tüketimi verilmemiştir.",
          ],
          commonError:
            "Bütün korumayı aynı redoks kurban mekanizması gibi anlatma.",
          check: "Gerçek çizik veya geçirgenlik varsa ideal koşul değişir.",
        },
      },
      {
        prompt:
          "Verilen standart kıyasta Fe, Cu’dan aktiftir. Cu kaplı Fe yüzeyinde çizik açılmış; Fe ve Cu hem metalik temasta hem uygun elektrolitte. Hangi yorum daha doğrudur?",
        options: [
          "Açık Fe anodik risk taşıyabilir; kesin hız bu veriden çıkmaz",
          "Cu her koşulda Fe için kurban anottur",
          "Çizik bütün metali başka elementlere ayırır",
          "Fe kütlesi mutlaka saatte 1 g azalır",
          "Kablo olduğu için bariyer hâlâ eksiksizdir",
        ],
        answer: 0,
        hint: "Hangi metal elektron vermeye daha yatkın verilmiş?",
        explanation:
          "Fe verilen kıyasta daha aktiftir; çizikte Fe anodik çözünmeye aday olabilir. Gerçek hız; yüzey alanına, pasivasyona ve ortama bağlıdır; yalnız bu verilerle gram/saat verilemez. Zn gibi daha aktif bir kaplama aynı role sahip değildir.",
        guidance: {
          knowledge: [
            "Soy kaplamanın bariyer etkisi ile çizikte galvanik eğilimi ayır.",
          ],
          strategy: "Verilen Fe–Cu aktiflik ilişkisinden anodik adayı seç.",
          steps: [
            "Fe verilen kıyasta daha aktiftir; çizikte Fe anodik çözünmeye aday olabilir.",
            "Gerçek hız; yüzey alanına, pasivasyona ve ortama bağlıdır; yalnız bu verilerle gram/saat verilemez.",
          ],
          optionReasons: [
            "Soy Cu ile temas Fe’nin yükseltgenmesine eşleşebilir; alan ve ortam hız verisi yoktur.",
            "Cu verilen kıyasta Fe’den pasiftir; kurban rolü yanlıştır.",
            "Çizik ortam temasını açar; element kimliğini değiştirmez.",
            "Hiçbir sayısal hız/alan verisi verilmemiştir.",
            "Çizik Fe yüzeyini ortama açmıştır; metalik temas bariyeri onarmaz.",
          ],
          commonError: "Daha soy kaplamayı her çizikte kurban metal sanma.",
          check: "Zn gibi daha aktif bir kaplama aynı role sahip değildir.",
        },
      },
      {
        prompt:
          "Bir öğrenci “Al çok aktif olduğundan her ortamda Fe’den daha hızlı korozyona uğrar.” diyor. Bu yargı için en uygun değerlendirme hangisidir?",
        options: [
          "Kesin yanlıştır; Al hiçbir ortamda hiç tepkime vermez",
          "Fe her ortamda tamamen inerttir",
          "Yalnız metalin rengi bütün hızı belirler",
          "Aktiflik yalnız başına hız sırası vermez; pasivasyon ve ortam önemlidir",
          "Kesin doğrudur; E° doğrudan gram/saat birimidir",
        ],
        answer: 3,
        hint: "Gerçek yüzey filmi verisi var mı?",
        explanation:
          "Al uygun koşullarda koruyucu pasif film oluşturabilir. Standart aktiflik sırası bu film, alan ve ortamın hız etkilerinin yerine geçmez. Doğru yorum hem aktiflik bilgisini hem sınırını korur.",
        guidance: {
          knowledge: [
            "Hız, fiziksel/kimyasal yüzey ve çevre koşullarıyla ilgilidir.",
          ],
          strategy:
            "Her ortamda sözüne yeterli veri verilip verilmediğini bul.",
          steps: [
            "Al uygun koşullarda koruyucu pasif film oluşturabilir.",
            "Standart aktiflik sırası bu film, alan ve ortamın hız etkilerinin yerine geçmez.",
          ],
          optionReasons: [
            "Pasif film koruyabilir ama evrensel tepkimesizlik iddiası da desteklenmez.",
            "Fe’nin verilen sulu korozyon mekanizması bile bu kesinliği yalanlar.",
            "Renk tek başına elektrokimyasal ve kinetik veri değildir.",
            "Termodinamik kıyas gerçek yüzey filmi ve kinetik ölçümü değildir.",
            "Volt gerilimdir; gram/saat korozyon hızı birimi değildir.",
          ],
          commonError:
            "Mutlak iddianın karşıtını da bir başka mutlak kural sanma.",
          check: "Doğru yorum hem aktiflik bilgisini hem sınırını korur.",
        },
      },
      {
        prompt:
          "Harici akım katodik korumasıyla kurban anot koruması karşılaştırılıyor. Hangi ifade doğrudur?",
        options: [
          "Kurban anot asla tüketilmez",
          "Her iki sistemde fiziksel bağlantı gereksizdir",
          "İkisinde de korunacak metal katodik yönde tutulur; enerji ve anot düzeni farklıdır",
          "İkisinde de O₂ baştan negatif yüklü olduğu için itilir",
          "Harici kaynakta korunacak metal zorunlu anottur",
        ],
        answer: 2,
        hint: "Korunacak Fe’de hangi rol sürdürülmek isteniyor?",
        explanation:
          "Kurban anot daha aktif metalin yükseltgenmesini kullanır. Harici akım yönteminde dış doğru akım desteği vardır; her ikisinde korunan metal katodik yöndedir. Anot daima yükseltgenme, katot daima indirgenme yeridir.",
        guidance: {
          knowledge: [
            "İki yöntem de istenmeyen anodik çözünmeyi azaltır; devre kaynakları aynı değildir.",
          ],
          strategy: "Korunacak metal ile yardımcı anodun görevlerini belirle.",
          steps: [
            "Kurban anot daha aktif metalin yükseltgenmesini kullanır.",
            "Harici akım yönteminde dış doğru akım desteği vardır; her ikisinde korunan metal katodik yöndedir.",
          ],
          optionReasons: [
            "Anot olarak yükseltgenen kurban metal stoku kullanılır.",
            "Elektronik ve iyonik yollar olmadan hedef devre kurulmaz.",
            "Kurban metal kendi yükseltgenmesiyle, dış kaynaklı sistem uygun doğru akımla e⁻ desteği sağlar.",
            "O₂ nötrdür; koruma indirgenme/anodik baskılamayla açıklanır.",
            "Katodik korumanın hedefi korunacak metalin katodik yönde tutulmasıdır.",
          ],
          commonError:
            "Dış kaynaklı pozitif yardımcı anotu galvanik negatif kurban anotla aynı işaret sanma.",
          check: "Anot daima yükseltgenme, katot daima indirgenme yeridir.",
        },
      },
    ],
  },
];
const sourceA022 =
  "MEBİ AYT Kimya'nın elektrokimyasal hücreler, elektrot potansiyelleri, elektroliz ve korozyon bölümleri; OGM ders sunuları, video notu ve Dersler Cepte öğretimiyle karşılaştırılmış özgün anlatım ve sorular. Koşulsuz kaynak genellemeleri bilimsel sınırlarıyla düzeltilmiştir; alıştırmalar resmî sınav sorusu değildir.";
type GuidedQuestionA022 = Question & {
  guidance: {
    knowledge: string[];
    strategy: string;
    steps: string[];
    optionReasons: string[];
    commonError: string;
    check: string;
  };
};
export const forge022ChemistryATopics: Record<string, string> =
  Object.fromEntries(unitsA022.map((unit) => [unit.id, unit.detail]));
export const forge022ChemistryAGuides: LessonGuide[] = unitsA022.map(
  (unit) => ({
    id: unit.id,
    minutes: unit.minutes,
    objectives: unit.objectives,
    sections: unit.sections,
    examples: unit.examples,
    recall: unit.recall,
    source: sourceA022,
  }),
);
export const forge022ChemistryALessons: Lesson[] = unitsA022.map((unit) => ({
  id: unit.id,
  subjectId: "ayt-kimya",
  title: txt(unit.title),
  minutes: unit.minutes,
  objectives: unit.objectives.map(txt),
  body: unit.sections.map((section) => ({
    title: txt(section.title),
    text: txt(section.paragraphs.join("\n\n")),
  })),
  questions: unit.questions.map((row, index): GuidedQuestionA022 => ({
    id: `${unit.id}-022a-${index + 1}`,
    skill: unit.id,
    prompt: txt(row.prompt),
    options: row.options.map(txt),
    answer: row.answer,
    hint: txt(row.hint),
    explanation: txt(row.explanation),
    guidance: row.guidance,
  })),
  source: txt(sourceA022),
  tags: ["kaynakli-anlatim", "adim-adim", "Özgün öğretim soruları"],
}));
