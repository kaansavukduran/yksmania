import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";

function number026(
  v: unknown,
  min: number,
  max: number,
  integer = true,
): asserts v is number {
  if (
    typeof v !== "number" ||
    !Number.isFinite(v) ||
    v < min ||
    v > max ||
    (integer && !Number.isSafeInteger(v))
  )
    throw new RangeError("CHEM026_NUMBER");
}
export function atom026(z: number, n: number, e: number) {
  number026(z, 1, 30);
  number026(n, 0, 50);
  number026(e, 0, 36);
  return {
    z,
    p: z,
    n,
    e,
    a: z + n,
    q: z - e,
    total: z + n + e,
    charged: z + e,
    nucleons: z + n,
  };
}
export function ion026(z: number, n: number, e: number, received: number) {
  const before = atom026(z, n, e);
  number026(received, -6, 6);
  const after = atom026(z, n, e + received);
  return {
    before,
    after,
    received,
    externalCharge: received,
    systemCharge: after.q + received,
    conserved: before.q === after.q + received,
  };
}
export interface AtomicPart026 {
  z: number;
  a: number;
  count: number;
}
export function aggregate026(parts: readonly AtomicPart026[], q: number) {
  if (!Array.isArray(parts) || parts.length < 1 || parts.length > 12)
    throw new RangeError("CHEM026_PARTS");
  number026(q, -20, 20);
  let p = 0,
    n = 0,
    atoms = 0;
  for (const row of parts) {
    if (
      !row ||
      typeof row !== "object" ||
      !["z", "a", "count"].every((k) => Object.hasOwn(row, k))
    )
      throw new RangeError("CHEM026_PART");
    number026(row.z, 1, 30);
    number026(row.a, row.z, row.z + 50);
    number026(row.count, 1, 100);
    p += row.z * row.count;
    n += (row.a - row.z) * row.count;
    atoms += row.count;
  }
  const e = p - q;
  if (e < 0) throw new RangeError("CHEM026_ELECTRONS");
  return {
    p,
    n,
    e,
    q,
    atoms,
    nucleons: p + n,
    total: p + n + e,
    charged: p + e,
  };
}
export interface Nuclide026 {
  z: number;
  n: number;
  e: number;
}
export function relations026(
  left: Nuclide026,
  right: Nuclide026,
  sameConfiguration: boolean | null = null,
) {
  for (const x of [left, right])
    if (
      !x ||
      typeof x !== "object" ||
      !["z", "n", "e"].every((k) => Object.hasOwn(x, k))
    )
      throw new RangeError("CHEM026_NUCLIDE");
  if (sameConfiguration !== null && typeof sameConfiguration !== "boolean")
    throw new RangeError("CHEM026_CONFIGURATION");
  const x = atom026(left.z, left.n, left.e),
    y = atom026(right.z, right.n, right.e);
  if (sameConfiguration === true && x.e !== y.e)
    throw new RangeError("CHEM026_CONFIGURATION");
  const isotope = x.z === y.z && x.n !== y.n,
    isotone = x.n === y.n && x.z !== y.z,
    isobar = x.a === y.a && x.z !== y.z,
    sameNuclide = x.z === y.z && x.n === y.n;
  const nuclear = isotope
    ? "isotope"
    : isotone
      ? "isotone"
      : isobar
        ? "isobar"
        : sameNuclide
          ? "same"
          : "none";
  return {
    left: x,
    right: y,
    isotope,
    isotone,
    isobar,
    sameNuclide,
    sameElectrons: x.e === y.e,
    isoelectronic: x.e !== y.e ? false : sameConfiguration,
    nuclear,
    deltaZ: y.z - x.z,
    deltaN: y.n - x.n,
    deltaA: y.a - x.a,
    deltaQ: y.q - x.q,
  };
}
export function mixture026(light: number, heavy: number, lightPct: number) {
  number026(light, 1, 300, false);
  number026(heavy, 1, 300, false);
  number026(lightPct, 0, 100, false);
  if (light >= heavy) throw new RangeError("CHEM026_MASSES");
  const fraction = lightPct / 100,
    mean = light * fraction + heavy * (1 - fraction);
  return {
    light,
    heavy,
    lightPct,
    heavyPct: 100 - lightPct,
    lightContribution: light * fraction,
    heavyContribution: heavy * (1 - fraction),
    mean,
  };
}
export function abundance026(light: number, heavy: number, mean: number) {
  mixture026(light, heavy, 50);
  number026(mean, light, heavy, false);
  return {
    lightPct: (100 * (heavy - mean)) / (heavy - light),
    heavyPct: (100 * (mean - light)) / (heavy - light),
  };
}
export const compounds026 = [
  {
    name: "Hidroksit OH⁻",
    formula: "¹⁶O¹H⁻",
    q: -1,
    parts: [
      { z: 8, a: 16, count: 1 },
      { z: 1, a: 1, count: 1 },
    ],
  },
  {
    name: "Karbonat CO₃²⁻",
    formula: "¹²C(¹⁶O)₃²⁻",
    q: -2,
    parts: [
      { z: 6, a: 12, count: 1 },
      { z: 8, a: 16, count: 3 },
    ],
  },
  {
    name: "Amonyum NH₄⁺",
    formula: "¹⁴N(¹H)₄⁺",
    q: 1,
    parts: [
      { z: 7, a: 14, count: 1 },
      { z: 1, a: 1, count: 4 },
    ],
  },
  {
    name: "Ağır su D₂O",
    formula: "(²H)₂¹⁶O",
    q: 0,
    parts: [
      { z: 1, a: 2, count: 2 },
      { z: 8, a: 16, count: 1 },
    ],
  },
] as const;
export const pairs026 = [
  {
    name: "Magnezyum çekirdekleri",
    left: { z: 12, n: 13, e: 12 },
    right: { z: 12, n: 14, e: 12 },
    labels: ["²⁵Mg", "²⁶Mg"],
    configurations: ["2,8,2", "2,8,2"],
    sameConfiguration: true,
  },
  {
    name: "Oksit ve neon",
    left: { z: 8, n: 10, e: 10 },
    right: { z: 10, n: 10, e: 10 },
    labels: ["¹⁸O²⁻", "²⁰Ne"],
    configurations: ["2,8", "2,8"],
    sameConfiguration: true,
  },
  {
    name: "Argon ve kalsiyum iyonu",
    left: { z: 18, n: 22, e: 18 },
    right: { z: 20, n: 20, e: 18 },
    labels: ["⁴⁰Ar", "⁴⁰Ca²⁺"],
    configurations: ["2,8,8", "2,8,8"],
    sameConfiguration: true,
  },
  {
    name: "Aynı potasyum izotopu",
    left: { z: 19, n: 20, e: 19 },
    right: { z: 19, n: 20, e: 18 },
    labels: ["³⁹K", "³⁹K⁺"],
    configurations: ["2,8,8,1", "2,8,8"],
    sameConfiguration: false,
  },
  {
    name: "Oksijen ve flor çekirdekleri",
    left: { z: 8, n: 9, e: 8 },
    right: { z: 9, n: 9, e: 9 },
    labels: ["¹⁷O", "¹⁸F"],
    configurations: ["2,6", "2,7"],
    sameConfiguration: false,
  },
  {
    name: "Karbon çekirdekleri",
    left: { z: 6, n: 7, e: 6 },
    right: { z: 6, n: 8, e: 6 },
    labels: ["¹³C", "¹⁴C"],
    configurations: ["2,4", "2,4"],
    sameConfiguration: true,
  },
  {
    name: "Florür ve sodyum iyonu",
    left: { z: 9, n: 10, e: 10 },
    right: { z: 11, n: 12, e: 10 },
    labels: ["¹⁹F⁻", "²³Na⁺"],
    configurations: ["2,8", "2,8"],
    sameConfiguration: true,
  },
  {
    name: "Neonun farklı elektronik durumları",
    left: { z: 10, n: 10, e: 10 },
    right: { z: 10, n: 10, e: 10 },
    labels: ["²⁰Ne temel hâl", "²⁰Ne uyarılmış"],
    configurations: ["2,8", "2,7,1"],
    sameConfiguration: false,
  },
] as const;
export const isotopeSamples026 = [
  {
    name: "Yalnız ²⁴Mg ve ²⁶Mg içeren hazırlanmış örnek",
    light: 23.985,
    heavy: 25.983,
    labels: ["²⁴Mg", "²⁶Mg"],
  },
  {
    name: "Yalnız ²⁰Ne ve ²²Ne içeren hazırlanmış örnek",
    light: 19.992,
    heavy: 21.991,
    labels: ["²⁰Ne", "²²Ne"],
  },
  {
    name: "Yalnız ³²S ve ³⁴S içeren hazırlanmış örnek",
    light: 31.972,
    heavy: 33.968,
    labels: ["³²S", "³⁴S"],
  },
] as const;
export const defaultsChemistry026 = {
  mode: "count",
  z: 12,
  n: 13,
  e: 12,
  received: 2,
  compound: 0,
  copies: 1,
  pair: 0,
  secondReceived: 0,
  sample: 0,
  lightPct: 75,
  guess: "",
  reason: "",
  checked: false,
  show: false,
};
export function normalizeChemistry026(input: unknown) {
  const raw =
    input && typeof input === "object" && !Array.isArray(input)
      ? (input as Record<string, unknown>)
      : {};
  const d = defaultsChemistry026;
  const pick = (k: keyof typeof d, min: number, max: number) =>
    Math.max(
      min,
      Math.min(
        max,
        typeof raw[k] === "number" && Number.isFinite(raw[k])
          ? Math.round(raw[k] as number)
          : (d[k] as number),
      ),
    ) + 0;
  const z = pick("z", 1, 30),
    n = pick("n", 0, 50),
    e = pick("e", 0, 36),
    received = pick("received", Math.max(-6, -e), Math.min(6, 36 - e));
  const v = {
    mode: ["count", "transfer", "aggregate", "pair", "mixture"].includes(
      String(raw.mode),
    )
      ? String(raw.mode)
      : d.mode,
    z,
    n,
    e,
    received,
    compound: pick("compound", 0, compounds026.length - 1),
    copies: pick("copies", 1, 4),
    pair: pick("pair", 0, pairs026.length - 1),
    secondReceived: pick("secondReceived", -2, 2),
    sample: pick("sample", 0, isotopeSamples026.length - 1),
    lightPct: pick("lightPct", 0, 100),
    guess: typeof raw.guess === "string" ? raw.guess.slice(0, 128) : "",
    reason: typeof raw.reason === "string" ? raw.reason.slice(0, 120) : "",
    checked: raw.checked === true,
    show: raw.show === true,
  };
  const science: (keyof typeof v)[] = [
    "mode",
    ...((v.mode === "count"
      ? ["z", "n", "e"]
      : v.mode === "transfer"
        ? ["z", "n", "e", "received"]
        : v.mode === "aggregate"
          ? ["compound", "copies"]
          : v.mode === "pair"
            ? ["pair", "secondReceived"]
            : ["sample", "lightPct"]) as (keyof typeof v)[]),
  ];
  const validGuess =
    v.mode === "pair"
      ? ["isotope", "isotone", "isobar", "same", "none"].includes(v.guess)
      : v.guess.trim() !== "" &&
        Number.isFinite(Number(v.guess.replace(",", ".")));
  if (science.some((k) => v[k] !== raw[k]))
    return {
      ...v,
      guess: validGuess ? v.guess : "",
      reason: "",
      checked: false,
      show: false,
    };
  if (!validGuess || !v.reason.trim())
    return { ...v, guess: validGuess ? v.guess : "", checked: false };
  return v;
}

type Card026 = {
  prompt: string;
  options: [string, string, string, string, string];
  steps: [string, string, string];
  reasons: [string, string, string, string, string];
  explanation: string;
  knowledge: string;
  error: string;
  check: string;
};
type Pack026 = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  sections: LessonGuide["sections"];
  examples: LessonGuide["examples"];
  recall: LessonGuide["recall"];
  items: Card026[];
};
const source026 =
  "MEBİ TYT Kimya Konu Özetleri, Atomun Yapısı ve Mol Kavramı; OGM Dersler Cepte 9. Sınıf Kimya, Atomun Yapısı. Tanecik sayma, yük muhasebesi, karşılaştırma ve karışım modelleri ile bütün çözümlü örnekler ve ileri sorular özgündür. Sayım şemaları gerçek boyut, yörünge veya kararlı izotop öngörüsü değildir.";
// AUTHORED_CONTENT_026
const packs026: Pack026[] = [
  {
    id: "atomun-temel-tanecikleri",
    topic: "detail-144",
    title: "Atomun temel tanecikleri: ileri sayım ve yük muhasebesi",
    minutes: 50,
    objectives: [
      "Çekirdek kimliği, kütle numarası, elektron ve yükü ayrı denklemlerle kur.",
      "Ters, oranlı ve çok atomlu sayımlarda verilenleri denetle.",
      "Elektron aktarımında tanecik ile bütün sistemin yük korunumunu izle.",
    ],
    sections: [
      {
        title: "Üç taneciği iki bölgeyle ilişkilendir",
        paragraphs: [
          "Bir atomu sayarken iki bölgeyi ayır: çekirdekte proton ve nötron, çekirdeğin çevresindeki kuantum durumlarında elektron bulunur. Protonun yükü +1, elektronun −1, nötronun net yükü 0 temel yük birimidir. Bir proton ile bir elektronun yük büyüklükleri eşittir; kütleleri eşit değildir. Nötr atomda yüklü tanecikler vardır, fakat yüklerin toplamı sıfırdır.",
          "Proton ve nötronun kütleleri yaklaşık 1 u düzeyindedir; elektronun kütlesi proton kütlesinin yaklaşık 1/1836’sı kadardır. Küçük katkıyı yaklaşık hesapta ihmal etmek, elektronun kütlesini sıfır kabul etmekle aynı değildir. Buradaki “temel tanecikler”, TYT sayımında kullanılan üç taneciği adlandırır; proton ile nötronun parçacık fiziğinde bölünmez olduğu söylenmez.",
        ],
        table: {
          headers: ["Tanecik", "Bölge", "Yük / temel yük", "Yaklaşık kütle"],
          rows: [
            ["Proton", "Çekirdek", "+1", "1 u"],
            ["Nötron", "Çekirdek", "0", "1 u"],
            ["Elektron", "Elektron bulutu", "−1", "0,00055 u"],
          ],
        },
      },
      {
        title: "Atom numarası elementin kimliğidir",
        paragraphs: [
          "Atom numarası Z, çekirdekteki proton sayısı p ile aynıdır: Z=p. Z=8 olan çekirdek oksijene, Z=12 olan çekirdek magnezyuma aittir. Aynı elementin bütün çekirdekleri aynı proton sayısını taşır; nötron sayıları farklı olabilir. Nötr oksijen ile oksit iyonunun yükleri ve elektron sayıları farklı olsa da proton sayıları değişmedikçe elementleri oksijendir.",
          "“Aynı element” bütün özelliklerin eşitliği demek değildir. Proton sayısı değişirse element kimliği değişir; bu, yalnız elektron alışverişi olan sıradan kimyasal iyonlaşma değildir. Bir tabloda X ve Y gibi varsayımsal harfler kullanılması farklı element olduklarını tek başına kanıtlamaz; belirleyici bilgi Z’nin aynı veya farklı oluşudur.",
        ],
      },
      {
        title: "Kütle numarası ile gerçek atom kütlesini ayır",
        paragraphs: [
          "Kütle numarası A, tek çekirdekteki proton ve nötronların toplamıdır: A=p+n=Z+n. Bu nedenle n=A−Z olur. A bir nükleon adedidir ve tam sayıdır; gram cinsinden tartılmış kütle değildir. Elektronlar A’ya katılmaz. Bir atom elektron aldığında toplam tanecik sayısı değişebilir, ancak çekirdek aynı kalıyorsa A değişmez.",
          "Hassas izotop kütlesi u birimiyle ifade edilir; bağlanma enerjisi ve tanecik kütleleri nedeniyle A ile sayısal olarak tam aynı olmak zorunda değildir. Bir örneğin ortalama atom kütlesi ise izotop kütleleri ve bolluklarıyla hesaplanır. A, tek izotopun kütlesi ve örneğin ortalama kütlesi üç ayrı niceliktir. Tablodaki ondalığı yuvarlayarak her atomun nötron sayısı kesinleştirilemez.",
        ],
      },
      {
        title: "Yük hesabını tanımdan kur",
        paragraphs: [
          "Tek atomlu taneciğin net yükünü temel yük cinsinden q ile gösterirsek q=p−e=Z−e olur. Buradan e=Z−q ve ters yönde Z=e+q elde edilir. q=+2 ise iki elektron eksikliği; q=−2 ise iki elektron fazlalığı vardır. Negatif yükü çıkarırken parantez kullan: e=8−(−2)=10.",
          "q=0 için p=e koşulu nötrlüğü verir; p=n veya n=e koşulu gerekmez. Katyon q>0, anyon q<0 taşır. “Yüksüz tanecik” ile “yüksüz atom” bağlamlarını ayır: nötron tek başına yüksüzdür, nötr atom ise proton ve elektron yüklerinin dengelendiği yapıdır. Yükten nötron sayısı bulunmaz.",
        ],
      },
      {
        title: "İyonlaşmada çekirdek korunur",
        paragraphs: [
          "Sıradan kimyasal elektron alışverişinde Z, p, n ve A korunur. Elektron alınırsa e artar ve q azalır; elektron verilirse e azalır ve q artar. Değişim işaretiyle Δq=−Δe yazılabilir. Bu, başlangıç taneciğinin nötr olmasını gerektirmez; bir anyon bir elektron verince daha az negatif olabilir.",
          "İzole bir iyonun yükü değişirken çevreyi de hesaba katarsan toplam elektrik yükü korunur. Elektron verme denklemi X → X⁺ + e⁻ biçiminde yazılır: 0=+1−1. Elektron alma denklemi X + e⁻ → X⁻ biçimindedir: 0−1=−1. Çekirdekteki değişimleri bu elektron alışverişinin sonucu olarak yorumlama.",
        ],
      },
      {
        title: "Üç eşitlikle eksik bilgiyi denetle",
        paragraphs: [
          "İlk sıra Z=p, ikinci sıra n=A−Z, üçüncü sıra e=Z−q olsun. Her satırı doldurduktan sonra iki bağımsız geri kontrol yap: p+n verilen A’yı, p−e verilen q’yu vermeli. İyonun yükünü yalnız işaret veya yalnız büyüklük olarak değil, işaretli sayı olarak işle.",
          "“Toplam proton+nötron+elektron” istenirse T=A+e, “yüklü taneciklerin toplam sayısı” istenirse Y=p+e yazılır. Y, net yük q değildir: elektronların adedi pozitif sayılırken yük katkısı negatiftir. Sonuçlar negatif veya kesirli adet veriyorsa verilenlerin tutarlılığı ya da işlem denetlenmelidir.",
        ],
      },
      {
        title: "Gösterimde dört konumu doğru oku",
        paragraphs: [
          "Standart ᴬZXᵠ gösteriminde sol üst A, sol alt Z, sağ üst yük q’dur. Düz yazıda “A=25, Z=12, q=+2” aynı bilgiyi daha okunaklı verir. Element sembolünü biliyorsan Z tablodan bulunabilir; varsayımsal X için verilmeyen Z’yi harften tahmin edemezsin.",
          "Bir kimyasal formülün sağ alt indisi atom adedidir: O₂ iki oksijen atomu içerir. Sağ üst 2− ise bütün iyonun net yüküdür. CO₃²⁻ gösterimindeki 3, elektron veya yük sayısı değildir; üç O atomu bulunduğunu söyler. İşleme başlamadan her sayının hangi nesneye ait olduğunu yaz.",
        ],
      },
      {
        title: "Nötr atomda ne bilinir, ne bilinmez?",
        paragraphs: [
          "Nötr olduğu açıkça belirtilen atomda q=0 ve e=p=Z kesinleşir. Nötron sayısı için A ya da bağımsız bir çekirdek verisi gerekir. “Nötr” sözcüğü nötronsuz, kararlı, bütün tanecikleri eşit veya kimyasal olarak etkisiz demek değildir.",
          "¹H için p=1, n=0, e=1 olabilir; ³He için p=2, n=1, e=2 olur. Bu örnekler hem “her atomda nötron vardır” hem “proton nötrondan fazla yalnız hidrojende olur” genellemelerini bozar. Birkaç hafif izotopta p=n bulunması evrensel bir bağıntı değildir.",
        ],
      },
      {
        title: "Elektron ve yükten protona geri git",
        paragraphs: [
          "Bazı kartlarda Z yerine elektron sayısı ve yük verilir. q=Z−e eşitliğinin iki yanına e ekleyerek Z=e+q yaz. Önce kimliği bul; A ayrıca verilmişse n=A−Z ile çekirdeği tamamla. Negatif iyonun proton sayısı elektron sayısından az olmalıdır.",
          "Verilen yükün elektron alışverişi sayısı mı, yoksa son net yük mü olduğunu ayır. Başlangıçta +1 olan iyon iki elektron alırsa son yük −1’dir; iki elektron aldığı için son yük her zaman −2 olmaz. Başlangıç bilgisi bu yüzden çözümün parçasıdır.",
        ],
      },
      {
        title: "Toplamlardan iki bilinmeyeni ayır",
        paragraphs: [
          "Tek atomlu tanecikte T=p+n+e ve A=p+n olduğundan T−A=e olur. q da biliniyorsa p=e+q ve n=A−p ile hepsi bulunur. Nötr atomda T=2 p+n yazılabilir; bu tek eşitlik p ile n’yi ayrı ayrı belirlemez.",
          "İki bağımsız koşul gerektiğini örnekle denetleyebilirsin. Aynı T için farklı p, n çiftleri bulunuyorsa tek cevap zorunlu değildir. Verilmeyen sayıyı sıfırla doldurmak ek bir varsayım yapmaktır. “Yeterli bilgi yok” sonucunu gerekçelendirmek de geçerli bir çözümdür.",
        ],
      },
      {
        title: "Oran verisini tam sayı denklemine çevir",
        paragraphs: [
          "n/p=5/4 gibi bir oran, p=4 k ve n=5 k seçilerek yazılabilir. A verilirse 9 k=A olur. Bu yoldan bulunan p, n tam sayı ve negatif olmayan değerler olmalıdır. Oran yalnız hangi iki nicelik arasında verildiyse o niceliklere uygulanır.",
          "n/p ile e/p aynı oran değildir. İyon yükü elektronları çekirdeğe başka bir bağıntıyla bağlar. Oran sorusunda önce çekirdek toplamını veya tanecik toplamını uygun denklemle kur, ardından yükü uygula. Kesirli proton sonucunu en yakın tam sayıya yuvarlama; sayım verisi tutarsız olabilir.",
        ],
      },
      {
        title: "Kimyasal değişim ile çekirdek değişimini ayır",
        paragraphs: [
          "Elektron sayısının değişmesi iyon yükünü değiştirir. Nötron sayısı değişirse aynı Z’de farklı izotop, proton sayısı değişirse farklı element söz konusu olabilir. Bu üç değişkenin etkileri ayrı ayrı izlenir; A’daki değişim tek başına hangi taneciğin değiştiğini söylemez.",
          "Örneğin çekirdeğe bir nötron eklenmesini sayım düzeyinde düşünürsen p sabit, n bir fazla, A bir fazla olur; q ancak e değişiyorsa değişir. Bu bir hesap karşılaştırmasıdır, gündelik bir kimyasal işlem tarifi veya her çekirdeğin böyle kararlı oluşacağı iddiası değildir.",
        ],
      },
      {
        title: "Grafikte önce eksenleri tabloya çevir",
        paragraphs: [
          "Yatay p, düşey e eksenli bir grafikte her nokta (p, e) sırasını taşır. q=p−e olduğundan e=p doğrusu nötr tanecikleri gösterir; doğrunun e’si daha büyük olan tarafı negatif yük verir. Eksenler yer değiştirirse aynı iki koordinatın yorumu da değişir.",
          "Yatay Z, düşey n grafiğinde A=Z+n hesaplanır; elektron veya yük gösterilmediği sürece q bulunmaz. Grafik üzerindeki renk, nokta boyutu veya çizim uzaklığı tanecik adedi yerine geçmez. Eşitlikleri eksen etiketleriyle birlikte oku; ölçeksiz atom resminden gerçek çap çıkarma.",
        ],
      },
      {
        title: "Bir molekülde çekirdekleri ayrı topla",
        paragraphs: [
          "Çok atomlu tanecikte toplam proton P=Σ(adet×Z), toplam nötron N=Σ[adet×(A−Z)] olarak bulunur. Farklı atomların sayısını ve belirtilen izotoplarını kullan. Molekül veya iyonun bütün yükü q ise toplam elektron E=P−q olur.",
          "Tek atomun A’sı bir çekirdeğe aittir. Çok atomlu taneciğin toplam nükleonunu P+N diye adlandırmak daha açıktır; bütün molekülü tek çekirdekmiş gibi bir A/Z gösterimine sokma. Elektronların bağlarda paylaşılması, toplam elektron sayısının bu yük hesabını bozmaz.",
        ],
      },
      {
        title: "Bütün iyonun yükünü bir kez uygula",
        paragraphs: [
          "Çok atomlu bir iyonun q değeri bütün iyonun net yüküdür. Önce nötr atomların toplam protonunu bul, sonra E=P−q hesabını bir kez yap. Örneğin iki eksi yük toplam proton sayısına iki elektron ekler; her atoma ayrı ayrı iki elektron eklemek başka bir toplam yük üretir.",
          "İyonda elektronları belirli atomlara dağıtmak, toplam sayı hesabından farklı bir konudur. Bu derste Lewis yapısı, bağ sayısı veya biçimsel yük dağılımı sorulmuyorsa bütün elektronları atomlara paylaştırmaya gerek yoktur. Toplam yük kontrolü P−E=q yeterlidir.",
        ],
      },
      {
        title: "Birden çok tanecikte toplam ile tanecik başına değeri ayır",
        paragraphs: [
          "Özdeş k adet iyonun her birinde P, N, E ve q biliniyorsa bütün örnek için her niceliği k ile çarp. Önce tek iyonun elektronunu bulup sonra sayıyla çarpmak, proton toplamından bütün örneğin yükünü çıkarmakla aynı sonucu vermelidir.",
          "Bir iyonun q=−2 olması ile dört böyle iyonun toplam yükünün −8 olması farklı ölçeklerdir. Bir atomun kütle numarası örnek büyüdü diye değişmez; yalnız toplam nükleon sayısı artar. Sorudaki “bir iyon”, “üç molekül” ve “örnekteki toplam” ifadelerini çözümde yeniden belirt.",
        ],
      },
      {
        title: "Yüklü tanecik adedi ile elektrik yükünü karşılaştır",
        paragraphs: [
          "Yüklü tanecik adedi Y=p+e veya çok atomlu yapıda P+E’dir. Bu toplama nötronlar katılmaz. Net elektrik yükünde ise elektronlar eksi katkı yapar: q=p−e. Aynı sayıda proton ve elektron için Y sıfır değildir, q sıfırdır.",
          "Aynı çekirdeğe elektron eklenirse Y artarken q azalır; T de eklenen elektron kadar artar ve A sabit kalır. Bu dört sonuç birbiriyle tutarlıdır. Yükü “kaç tane yüklü parçacık var?” sorusunun cevabı olarak kullanmak işaret ile adet kavramlarını karıştırır.",
        ],
      },
      {
        title: "Kütle yaklaşımının amacını açık tut",
        paragraphs: [
          "Tanecik sayımında A=p+n tamdır. Yaklaşık atom kütlesi hesabında p ve n için yaklaşık 1 u, elektron için çok küçük katkı alınabilir. Hassas izotop kütlesinde bağlanmanın etkisi de vardır. Bu farklı hesap düzeylerini bir eşitlik işaretiyle koşulsuz birleştirme.",
          "u, ¹²C atomunun kütlesinin on ikide biriyle tanımlanan atomik kütle birimidir. Bağıl atom kütlesi ise bu birime oranlanmış boyutsuz sayıdır. Bir örnek için ortalama kütle u ile yazılabilir; A’ya u veya gram birimi eklemek, onun bir adet olduğunu gizler.",
        ],
      },
      {
        title: "Tutarsız veri ile eksik veriyi ayır",
        paragraphs: [
          "A<Z ise n=A−Z negatif çıkar; q>Z ise e=Z−q negatif olur. Bu veriler bu dersin atom/iyon sayımında geçersizdir. İki farklı doğru satırın aynı çekirdeğe farklı A vermesi de çelişkidir. Negatif tanecik sayısını mutlak değerle düzeltme.",
          "Eksik veri farklıdır: A verilmiş fakat Z verilmemişse birden çok p, n çifti olabilir. Hiç çözüm bulunmaması ile birden çok çözüm bulunması aynı durum değildir. Cebirsel uygunluk da doğada kararlılık kanıtı değildir; sayma modeli yarı ömür veya bolluk hesaplamaz.",
        ],
      },
      {
        title: "Çözümünü yeni veriye aktar",
        paragraphs: [
          "Önce nesneyi belirle: tek atom, tek atomlu iyon, molekül, çok atomlu iyon veya birden çok tanecik. Sonra verilenleri ve isteneni ayrı yaz; gerekli bağıntıyı anlamıyla seç. Sonucun çekirdeğe mi, elektronlara mı, bütün örneğe mi ait olduğunu açıkça belirt.",
          "Son denetimde iki korunumu ara: çekirdekte p+n ve elektrik yükünde p−e; örnek büyüklüğü varsa çarpanları da denetle. Etkinlikte önce tahmin ve kısa gerekçe yazıp sonra kıyaslayabilirsin. Yazılı gerekçe otomatik olarak doğru veya yanlış sayılmaz; model yalnız seçilen sayısal tahmini denetler.",
        ],
      },
    ],
    examples: [
      {
        title: "İki farklı toplamdan çekirdeği kur",
        prompt:
          "Bir tek atomlu iyonun proton+elektron toplamı 32, proton+nötron+elektron toplamı 49 ve net yükü +2’dir. p, n, e, A sayılarını bulunuz.",
        strategy:
          "Yüklü tanecik adedi ile net yükü iki bağımsız denklem olarak kullan; nötr varsayma.",
        steps: [
          {
            label: "Toplamların farkı",
            explanation:
              "Bütün taneciklerden yüklü olanları çıkarınca yalnız nötron kalır.",
            expression: "n=49−32=17",
          },
          {
            label: "Yük ile yüklü tanecik toplamı",
            explanation:
              "p+e=32 ve p−e=2 denklemlerini topla; sonra elektronu çıkar.",
            expression: "2 p=34 → p=17; e=15",
          },
          {
            label: "Çekirdek ve geri kontrol",
            explanation: "Kütle numarası yalnız çekirdek toplamıdır.",
            expression: "A=17+17=34; 17−15=2",
          },
        ],
        answer: "p=17, n=17, e=15; A=34.",
        check:
          "17+17+15=49 ve 17+15=32. Aynı veriler iki farklı toplamı da sağlar.",
        pitfall:
          "32’yi net yük veya A sanmak, iki bağımsız koşulu tek koşula indirir.",
      },
      {
        title: "Üç iyon ile çevre arasındaki yük bilançosu",
        prompt:
          "Her biri ³⁵Cl⁻ olan üç iyonda Z(Cl)=17’dir. Bu üç iyonun oluşturduğu sistemden toplam iki elektron dışarı çıkarılıyor; çekirdekler korunuyor. Sistemin başlangıç P, N, E toplamlarını ve son E ile toplam yükünü bulunuz. Elektron kaybının iyonlar arasında nasıl paylaşıldığı sorulmuyor.",
        strategy:
          "Önce bütün sistemin yükünü bul; verilen iki elektron bütün sistemden ayrılır.",
        steps: [
          {
            label: "Başlangıçta tek iyon",
            explanation:
              "Bir çekirdek 17 proton ve 18 nötron; bir eksi yük 18 elektron verir.",
            expression: "p=17; n=35−17=18; e=18",
          },
          {
            label: "Üç iyonu topla",
            explanation: "Her adedi üçle çarp; üç iyonun toplam yükü −3’tür.",
            expression: "P=51; N=54; E=54; Q=51−54=−3",
          },
          {
            label: "Elektronları dışarı aktar",
            explanation:
              "Sistemde iki elektron azalır; dışarıdaki iki elektron da toplam yük kontrolüne girer.",
            expression: "Eson=52; Qson=51−52=−1; −1+(−2)=−3",
          },
        ],
        answer: "Başlangıç P=51, N=54, E=54; son E=52, Q=−1.",
        check:
          "Çekirdekte 105 nükleon hem önce hem sonra aynıdır; sistem ile ayrılan elektronların toplam yükü −3 kalır.",
        pitfall:
          "İki elektronu her iyondan ayrı ayrı çıkarmak, verilen toplam iki elektronu altıya çıkarır.",
      },
      {
        title: "İzotop değişince molekül sayımının hangi kısmı değişir?",
        prompt:
          "A örneği 10 adet (¹H)₂¹⁶O, B örneği 10 adet (²H)₂¹⁶O nötr molekül içeriyor. Z(H)=1, Z(O)=8. İki örneğin P, N, E toplamlarını ve B−A nötron farkını bulunuz.",
        strategy:
          "Hidrojenin Z’si aynı, A’sı farklı olduğundan yalnız nötron katkısını değiştir.",
        steps: [
          {
            label: "Tek molekülde çekirdekler",
            explanation:
              "Her iki formülde P=2×1+8=10. ¹H nötronsuz, ²H bir nötronludur.",
            expression: "NA=2×0+8=8; NB=2×1+8=10",
          },
          {
            label: "On moleküle geç",
            explanation: "P, N değerlerini onla çarp; nötr moleküllerde E=P.",
            expression: "PA=PB=100; EA=EB=100; NA=80; NB=100",
          },
          {
            label: "Farkı belirle",
            explanation:
              "Yalnız iki hidrojenin nötron katkısı her molekülde iki artmıştır.",
            expression: "NB−NA=100−80=20",
          },
        ],
        answer:
          "Her iki örnekte P=E=100; A’da N=80, B’de N=100; fark 20 nötron.",
        check:
          "On moleküldeki yirmi hidrojenin her birine bir nötron eklenmesi 20 fark verir; toplam elektrik yükü iki örnekte de sıfırdır.",
        pitfall:
          "Ağır suyun “ağır” oluşunu proton veya elektron artışı diye okumak element kimliğini değiştirir.",
      },
      {
        title: "Hatalı laboratuvar kaydını düzelt",
        prompt:
          "Bir kayıtta aynı tek atomlu tanecik için A=31, p=15, e=18 ve q=+3 yazıyor. A, p, e ölçümlerinin doğru olduğu belirtiliyor. Yanlış alanı düzeltiniz; sonra bu tanecik iki elektron verirse n, A, e, q son değerlerini bulunuz.",
        strategy:
          "Hangi verilerin güvenilir olduğunu kullan; önce tutarlılığı, sonra değişimi çöz.",
        steps: [
          {
            label: "Kayıttaki yükü denetle",
            explanation:
              "Güvenilir p ve e, net yükü belirler; yalnız q alanı yanlış yazılmıştır.",
            expression: "q=15−18=−3; n=31−15=16",
          },
          {
            label: "İki elektron verme",
            explanation: "Elektronlar 18’den 16’ya iner; çekirdek değişmez.",
            expression: "eson=16; p=15; n=16; A=31",
          },
          {
            label: "Son yük ve işaret",
            explanation:
              "Başlangıç −3’ten iki elektron vermek yükü iki artırır; son tanecik hâlâ anyondur.",
            expression: "qson=15−16=−1",
          },
        ],
        answer: "Yanlış q alanı −3 olmalı; son n=16, A=31, e=16, q=−1.",
        check: "Δq=−Δe=+2; −3+2=−1. Proton+nötron 31 kalır.",
        pitfall:
          "Elektron veren her taneciğin mutlaka pozitif olacağını sanma; başlangıç yükü önemlidir.",
      },
      {
        title: "Grafik noktaları arasında elektron aktarımı",
        prompt:
          "Bir grafikte yatay eksen elektron, düşey eksen proton sayısıdır. U=(14,12), V=(14,15). U’dan V’ye bir elektron geçiyor; iki çekirdek korunuyor. Başlangıç ve son yükleri ile ikili sistemin toplam yükünü bulunuz.",
        strategy:
          "Koordinatları önce p, e tablosuna çevir; aktarımı iki taneciğe ters yönlü uygula.",
        steps: [
          {
            label: "Eksenleri oku",
            explanation: "U için e=14, p=12; V için e=14, p=15.",
            expression: "qU=−2; qV=+1",
          },
          {
            label: "Bir elektron aktar",
            explanation: "U elektron verir: e=13. V elektron alır: e=15.",
            expression: "qUson=12−13=−1; qVson=15−15=0",
          },
          {
            label: "Sistemi geri denetle",
            explanation:
              "Elektron sistem içinde yer değiştirmiştir; toplam proton ve elektron değişmez.",
            expression: "Qilk=−2+1=−1; Qson=−1+0=−1",
          },
        ],
        answer: "U: −2→−1; V: +1→0; sistemin toplam yükü −1 kalır.",
        check:
          "Toplam P=27 ve E=28 her iki durumda da aynıdır; aktarım yeni proton oluşturmaz.",
        pitfall:
          "Eksenleri (p, e) sanmak her iki başlangıç işaretini ters çevirir; elektronu iki taneciğe de eklemek toplam yükü bozar.",
      },
      {
        title: "Elektron/proton oranını yükle birleştir",
        prompt:
          "Varsayımsal tek atomlu bir iyon için e/p=4/5, q=+3 ve p+n+e=47 veriliyor. Bütün sayım değerlerini bulunuz; verilerden kararlılık çıkarılmayacak.",
        strategy: "Oranı p=5 k, e=4 k biçiminde kur; farkları yükü verir.",
        steps: [
          {
            label: "Oranı yüke bağla",
            explanation: "q=p−e=(5−4)k=k. Verilen +3, ortak çarpanı belirler.",
            expression: "k=3 → p=15, e=12",
          },
          {
            label: "Toplamdan nötron",
            explanation: "Toplam bütün belirtilen tanecikleri kapsar.",
            expression: "n=47−15−12=20",
          },
          {
            label: "Çekirdek ve geri kontrol",
            explanation:
              "A çekirdekteki p+n’dir; oranı ve yükü yeniden kontrol et.",
            expression: "A=35; 12/15=4/5; 15−12=3",
          },
        ],
        answer: "p=15, n=20, e=12; Z=15, A=35, q=+3.",
        check:
          "15+20+12=47. Veriler tam sayı ve negatif olmayan tanecik adetleri verir.",
        pitfall:
          "e/p oranını n/p gibi kullanmak çekirdek toplamını yanlış kurar.",
      },
    ],
    recall: [
      {
        prompt: "Bir atomun nötr olması n hakkında ne söyler?",
        answer:
          "Yalnız p=e koşulu çıkar; n için A veya başka çekirdek verisi gerekir.",
      },
      {
        prompt: "Bir anyon elektron verince mutlaka katyon olur mu?",
        answer:
          "Hayır. Başlangıç yükü ve verilen elektron sayısına bağlı olarak daha az negatif veya nötr de olabilir.",
      },
      {
        prompt:
          "A ve bütün tanecik toplamı T verilmişse ilk bulunacak sayı nedir?",
        answer: "e=T−A; q da verildiyse p=e+q ve n=A−p ile devam edilir.",
      },
      {
        prompt:
          "CO₃²⁻ içinde toplam elektron bulunurken iki eksi yük kaç kez uygulanır?",
        answer:
          "Bütün iyonun toplam protonuna bir kez iki elektron eklenir; her atoma ayrı ayrı uygulanmaz.",
      },
      {
        prompt: "Yüklü tanecik adedi neden net yüke eşit değildir?",
        answer:
          "Adette proton ve elektron sayıları toplanır; net yükte elektronlar eksi katkı yaptığı için çıkarılır.",
      },
      {
        prompt: "Sayım denklemi uygun çıkan her çekirdek doğada kararlı mıdır?",
        answer:
          "Bu sonuç çıkarılmaz. Sayım uygunluğu kararlılık, bolluk veya yarı ömür öngörüsü değildir.",
      },
    ],
    items: [
      {
        prompt:
          "A=30, Z=14, q=−2 olan tek atomlu tanecikte p, n, e sıralaması hangisidir?",
        options: ["14,16,16", "14,16,12", "16,14,16", "14,30,16", "14,14,14"],
        steps: [
          "Sol alt kimlik verisi p=Z=14 verir; A proton sayısı değildir.",
          "Çekirdekten n=30−14=16 bulunur.",
          "Negatif yükü paranteze al: e=14−(−2)=16; sonucu 14−16 ile denetle.",
        ],
        reasons: [
          "p=14, n=16, e=16; hem 14+16=30 hem 14−16=−2 sağlanır.",
          "12 elektron, 14−12=+2 verir; anyon yerine katyon hesabıdır.",
          "p ile n yer değişirse Z=16 olur; verilen 14 kimliği bozulur.",
          "30 nötron A’yı 14+30=44 yapar; A’nın tümünü nötron sayar.",
          "Üç sayıyı 14 almak A=28 ve q=0 üretir; iki veri de bozulur.",
        ],
        explanation:
          "Sol alt kimlik verisi p=Z=14 verir; A proton sayısı değildir. Çekirdekten n=30−14=16 bulunur. Negatif yükü paranteze al: e=14−(−2)=16; sonucu 14−16 ile denetle. p=14, n=16, e=16; hem 14+16=30 hem 14−16=−2 sağlanır.",
        knowledge: "A=p+n ve q=p−e, çekirdek ile yük için ayrı denklemlerdir.",
        error: "12 elektron, 14−12=+2 verir; anyon yerine katyon hesabıdır.",
        check:
          "Doğru üçlüde iki bağımsız toplamı verilen A ve q ile karşılaştır.",
      },
      {
        prompt:
          "A=41 olan tek atomlu X⁺ iyonunda 18 elektron bulunuyor. Nötron sayısı kaçtır?",
        options: ["22", "23", "24", "19", "59"],
        steps: [
          "Yük denklemine +1=Z−18 yaz.",
          "Z=18+1=19 bulunduğu için proton 19’dur.",
          "n=A−Z=41−19 hesabıyla çekirdeği tamamla.",
        ],
        reasons: [
          "Z=19 ve n=22; 19+22=41,19−18=+1 olur.",
          "41−18=23, elektronu proton yerine çıkarmaktır; iyon olduğu için p≠e.",
          "Z’yi 18−1=17 almak 24 verir; +1 yükün işareti ters uygulanmıştır.",
          "19, bulunan proton sayısıdır; nötron için A−Z gerekir.",
          "41+18=59, kütle numarasıyla elektronu toplar; nötron sayısını vermez.",
        ],
        explanation:
          "Yük denklemine +1=Z−18 yaz. Z=18+1=19 bulunduğu için proton 19’dur. n=A−Z=41−19 hesabıyla çekirdeği tamamla. Z=19 ve n=22; 19+22=41,19−18=+1 olur.",
        knowledge: "Elektron ve yükten önce Z=e+q bulunur.",
        error:
          "41−18=23, elektronu proton yerine çıkarmaktır; iyon olduğu için p≠e.",
        check: "22 nötron ile 19 proton toplamı 41 olmalı.",
      },
      {
        prompt:
          "Bir tek atomlu iyon için A=29, p+n+e=41 ve q=+1 veriliyor. Z kaçtır?",
        options: ["13", "12", "17", "28", "42"],
        steps: [
          "T=A+e olduğundan elektronu toplamlar farkından bul: e=41−29.",
          "e=12 ve q=+1 için Z=e+q yaz.",
          "Z=13 sonucunu n=29−13 ve p−e hesabıyla denetle.",
        ],
        reasons: [
          "e=12, Z=13, n=16; 13+16+12=41 olur.",
          "12, elektron sayısıdır; +1 yük nedeniyle proton bir fazladır.",
          "17, 29−12 işleminden gelir; elektron çıkarılarak Z bulunmaz.",
          "28, A−q işlemidir; A proton değil nükleon toplamıdır.",
          "42, T+q toplamıdır; toplam tanecik sayısı elektron sayısı yerine kullanılmıştır.",
        ],
        explanation:
          "T=A+e olduğundan elektronu toplamlar farkından bul: e=41−29. e=12 ve q=+1 için Z=e+q yaz. Z=13 sonucunu n=29−13 ve p−e hesabıyla denetle. e=12, Z=13, n=16; 13+16+12=41 olur.",
        knowledge: "T−A=e; q=Z−e.",
        error: "12, elektron sayısıdır; +1 yük nedeniyle proton bir fazladır.",
        check: "13−12=+1 ve A+e=29+12=41.",
      },
      {
        prompt:
          "Proton sayısı 16 olan bir iyonun başlangıç yükü −2’dir. Çekirdek değişmeden üç elektron verirse son elektron sayısı ve yükü hangisi olur?",
        options: ["15; +1", "21; −5", "13; +3", "18; −2", "19; +3"],
        steps: [
          "Başlangıçta e=16−(−2)=18 elektron vardır.",
          "Üç elektron verme 18−3=15 elektron bırakır.",
          "Son net yükü başlangıçtan değil, 16−15 hesabından bul.",
        ],
        reasons: [
          "15 elektron için q=+1; yük −2’den üç artmıştır.",
          "21; −5, üç elektron verme yerine alma durumudur.",
          "13; +3, başlangıç iyonunu nötr kabul edip 16−3 yapar.",
          "18; −2 başlangıç durumudur; verilen aktarımı uygulamaz.",
          "19 elektron +3 vermez: 16−19=−3; kendi içinde de tutarsızdır.",
        ],
        explanation:
          "Başlangıçta e=16−(−2)=18 elektron vardır. Üç elektron verme 18−3=15 elektron bırakır. Son net yükü başlangıçtan değil, 16−15 hesabından bul. 15 elektron için q=+1; yük −2’den üç artmıştır.",
        knowledge:
          "Bir elektron verilmesi q’yu bir artırır; başlangıç yükü korunarak takip edilir.",
        error: "21; −5, üç elektron verme yerine alma durumudur.",
        check: "Δe=−3 ve Δq=+3 olmalı.",
      },
      {
        prompt:
          "Bir ⁴²Ca²⁺ iyonu iki elektron alıp nötrleşiyor. Z(Ca)=20. Bu sırada hangi değişim üçlüsü doğrudur? Sıra ΔA, Δe, Δq’dur.",
        options: ["0,+2,−2", "+2,+2,−2", "0,−2,+2", "−2,+2,0", "0,+2,+2"],
        steps: [
          "Kimyasal elektron alımında çekirdek ve A korunur.",
          "Başlangıç e=20−2=18; nötr son durumda e=20 olur.",
          "Son q=0’dan başlangıç +2’yi çıkar; Δq=−2.",
        ],
        reasons: [
          "A değişmez, elektron iki artar, yük iki azalır.",
          "A’yı iki artırmak elektronları nükleon sayısına ekler.",
          "Elektronun azalması ve yükün artması elektron vermeyi anlatır.",
          "A’nın azalması ve yükün değişmemesi belirtilen nötrleşmeyle bağdaşmaz.",
          "Elektron alırken yük artmaz; Δq=−Δe olmalıdır.",
        ],
        explanation:
          "Kimyasal elektron alımında çekirdek ve A korunur. Başlangıç e=20−2=18; nötr son durumda e=20 olur. Son q=0’dan başlangıç +2’yi çıkar; Δq=−2. A değişmez, elektron iki artar, yük iki azalır.",
        knowledge: "Elektron değişimi A’yı etkilemez; Δq=−Δe.",
        error: "A’yı iki artırmak elektronları nükleon sayısına ekler.",
        check: "Başlangıç +2 ile son 0 arasındaki fark −2’dir.",
      },
      {
        prompt:
          "Bir tanecikte p=9, n=11, e=10 veriliyor. Yüklü tanecik adedi ile net yük sırasıyla hangisidir?",
        options: ["19; −1", "20; −1", "30; −1", "−1; 19", "19; +1"],
        steps: [
          "Yüklü olan türler proton ve elektrondur; nötronun yükü sıfırdır.",
          "Yüklü tanecik adedini 9+10 olarak say.",
          "Net yükte elektron katkısı eksi olduğundan 9−10 hesapla.",
        ],
        reasons: [
          "Y=19 ve q=−1; adet toplamı ile işaretli yük ayrılmıştır.",
          "20, p+n çekirdek toplamıdır; nötronları yüklü sayar, elektronları dışlar.",
          "30, bütün taneciklerin toplamıdır; 11 nötronu da yüklü sayar.",
          "−1 bir adet değildir; net yükü ilk sıraya, adedi ikinciye koyar.",
          "19 doğru adettir, ancak +1 işareti proton−elektron yerine elektron−proton alınmıştır.",
        ],
        explanation:
          "Yüklü olan türler proton ve elektrondur; nötronun yükü sıfırdır. Yüklü tanecik adedini 9+10 olarak say. Net yükte elektron katkısı eksi olduğundan 9−10 hesapla. Y=19 ve q=−1; adet toplamı ile işaretli yük ayrılmıştır.",
        knowledge: "Y=p+e, q=p−e; nötron iki yük hesabına da katkı vermez.",
        error:
          "20, p+n çekirdek toplamıdır; nötronları yüklü sayar, elektronları dışlar.",
        check: "Adet negatif olamaz; net yük negatif olabilir.",
      },
      {
        prompt:
          "Yalnız A=26 ve taneciğin nötr olduğu biliniyor. Hangi nicelik kesin belirlenir?",
        options: [
          "p+n toplamı",
          "Proton sayısı",
          "Nötron sayısı",
          "Elektron sayısı",
          "p+n+e toplamı",
        ],
        steps: [
          "A’nın tanımı p+n=26’dır.",
          "Nötrlük ayrıca e=p verir; p ile n’yi ayrı belirleyen ikinci çekirdek verisi yoktur.",
          "T=26+p olduğundan bütün tanecik toplamının da p’ye bağlı kaldığını gör.",
        ],
        reasons: [
          "p+n=26 doğrudan tanımdır ve kesindir.",
          "p=Z bilinmiyor; p+n=26 farklı paylaşımlar verebilir.",
          "n=26−p olduğu için p bilinmeden tek değer değildir.",
          "e=p fakat p bilinmiyor; nötrlük sayı vermez, eşitlik verir.",
          "T=26+p bilinmeyen p’yi içerir; yalnız A’ya eşit değildir.",
        ],
        explanation:
          "A’nın tanımı p+n=26’dır. Nötrlük ayrıca e=p verir; p ile n’yi ayrı belirleyen ikinci çekirdek verisi yoktur. T=26+p olduğundan bütün tanecik toplamının da p’ye bağlı kaldığını gör. p+n=26 doğrudan tanımdır ve kesindir.",
        knowledge: "A çekirdek toplamını; nötrlük p=e eşitliğini verir.",
        error: "p=Z bilinmiyor; p+n=26 farklı paylaşımlar verebilir.",
        check: "Eksik Z verisini nötr sözcüğünden üretme.",
      },
      {
        prompt:
          "Varsayımsal tek atomlu tanecik için hangi veri çifti sayım düzeyinde olanaksızdır? Yük q temel yük cinsindendir.",
        options: [
          "Z=7, q=+8",
          "Z=7, A=14",
          "Z=7, q=−2",
          "A=7, Z=7",
          "Z=1, A=1",
        ],
        steps: [
          "Her adayda n=A−Z ya da e=Z−q’nun negatif olup olmadığını ara.",
          "Z=7, q=+8 için e=7−8=−1 çıkar.",
          "Diğer çiftlerin negatif olmayan sayım değerleri verebildiğini kontrol et; kararlılık ayrıca sorulmuyor.",
        ],
        reasons: [
          "−1 elektron olamaz; q=+8, yedi protonlu taneciğin tüm elektronlarını vermesinden de büyük pozitif yüktür.",
          "n=14−7=7 sayım düzeyinde uygundur; yük verilmemesi bu çekirdek çiftini çelişkili yapmaz.",
          "e=7−(−2)=9 uygundur; anyon elektron fazlası taşır.",
          "n=0 çıkar; nötronsuz çekirdek sayımı negatif değildir, kararlılık iddiası kurulmamıştır.",
          "¹H için p=1, n=0 mümkündür; nötronun sıfır olması hata değildir.",
        ],
        explanation:
          "Her adayda n=A−Z ya da e=Z−q’nun negatif olup olmadığını ara. Z=7, q=+8 için e=7−8=−1 çıkar. Diğer çiftlerin negatif olmayan sayım değerleri verebildiğini kontrol et; kararlılık ayrıca sorulmuyor. −1 elektron olamaz; q=+8, yedi protonlu taneciğin tüm elektronlarını vermesinden de büyük pozitif yüktür.",
        knowledge:
          "Tanecik adetleri tam sayı ve negatif olmayan değerler olmalıdır.",
        error:
          "n=14−7=7 sayım düzeyinde uygundur; yük verilmemesi bu çekirdek çiftini çelişkili yapmaz.",
        check:
          "Olanaksızlık gerekçesini doğada bollukla değil negatif adetle kur.",
      },
      {
        prompt:
          "A=33 olan varsayımsal bir X²⁺ iyonunda n/p=7/4’tür. Elektron sayısı kaçtır?",
        options: ["10", "12", "14", "19", "21"],
        steps: [
          "Oranı p=4 k, n=7 k yaz; A=11 k=33 olur.",
          "k=3 için p=12, n=21 bulunur.",
          "+2 yükte e=p−2=10 hesapla.",
        ],
        reasons: [
          "p=12, e=10; 12−10=+2 sağlar.",
          "12 proton sayısıdır; katyonda elektron sayısı iki azdır.",
          "14, katyona iki elektron ekler; yükü −2 yapar.",
          "19, nötron 21’den iki çıkarmaktır; yük elektrona uygulanır.",
          "21 nötron sayısıdır; e yerine n seçilmiştir.",
        ],
        explanation:
          "Oranı p=4 k, n=7 k yaz; A=11 k=33 olur. k=3 için p=12, n=21 bulunur. +2 yükte e=p−2=10 hesapla. p=12, e=10; 12−10=+2 sağlar.",
        knowledge: "Oran çekirdek sayılarına, yük elektron sayısına bağlanır.",
        error: "12 proton sayısıdır; katyonda elektron sayısı iki azdır.",
        check: "12+21=33 ve 21/12=7/4.",
      },
      {
        prompt:
          "Yatay ekseni elektron, düşey ekseni proton sayısı olan grafikte K=(18,16) noktasının yükü ve türü hangisidir?",
        options: [
          "−2; anyon",
          "+2; katyon",
          "0; nötr",
          "−18; anyon",
          "+16; katyon",
        ],
        steps: [
          "Koordinat sırası eksenlerden e=18, p=16 diye okunur.",
          "q=p−e=16−18 işlemini kur.",
          "Sonucun negatif oluşunu anyon adıyla eşleştir.",
        ],
        reasons: [
          "q=−2; iki elektron fazlası vardır.",
          "+2, koordinatları p=18, e=16 diye ters okumaktır.",
          "Nötrlük p=e gerektirir; 16 ve 18 eşit değildir.",
          "−18 yalnız elektronların toplam yüküdür; 16 proton dışlanmıştır.",
          "+16 yalnız protonların yüküdür; 18 elektron dışlanmıştır.",
        ],
        explanation:
          "Koordinat sırası eksenlerden e=18, p=16 diye okunur. q=p−e=16−18 işlemini kur. Sonucun negatif oluşunu anyon adıyla eşleştir. q=−2; iki elektron fazlası vardır.",
        knowledge: "Grafik koordinatlarının anlamını eksen adları belirler.",
        error: "+2, koordinatları p=18, e=16 diye ters okumaktır.",
        check: "+16−18=−2; p ve e’nin toplamı net yük değildir.",
      },
      {
        prompt:
          "Çekirdeği 12 proton ve 14 nötron taşıyan bir tanecik iki elektron alıyor. Başlangıç elektron sayısı verilmemiştir. Hangisi kesin söylenebilir?",
        options: [
          "Kütle numarası 26 kalır.",
          "Son yük kesin −2’dir.",
          "Başlangıçta kesin 12 elektron vardır.",
          "Son proton sayısı 14’tür.",
          "Son nötron sayısı 16’dır.",
        ],
        steps: [
          "A=12+14=26 çekirdek verilerinden bulunur.",
          "Elektron alımı p, n, A’yı korur ve q’yu iki azaltır.",
          "Başlangıç e veya q verilmediği için son yükün tek değeri bulunamaz.",
        ],
        reasons: [
          "Çekirdek korunur; A=26 değişmez.",
          "−2 ancak başlangıç nötrse çıkar; bu koşul verilmemiştir.",
          "12 elektron nötr varsayımıdır; başlangıç yükü bilinmiyor.",
          "Elektron almak iki proton eklemez; p=12 kalır.",
          "Elektron almak iki nötron eklemez; n=14 kalır.",
        ],
        explanation:
          "A=12+14=26 çekirdek verilerinden bulunur. Elektron alımı p, n, A’yı korur ve q’yu iki azaltır. Başlangıç e veya q verilmediği için son yükün tek değeri bulunamaz. Çekirdek korunur; A=26 değişmez.",
        knowledge:
          "Elektron değişiminin miktarı son yükü ancak başlangıç yüküyle birlikte belirler.",
        error: "−2 ancak başlangıç nötrse çıkar; bu koşul verilmemiştir.",
        check: "Kesin olan Δq=−2’dir; qson tek başına −2 değildir.",
      },
      {
        prompt:
          "¹⁶O ve¹H kullanılarak oluşturulmuş bir OH⁻ iyonunda toplam nötron ve elektron sayıları sırasıyla kaçtır? Z(O)=8, Z(H)=1.",
        options: ["8; 10", "9; 10", "8; 8", "16; 18", "9; 9"],
        steps: [
          "Nötronları ayrı hesapla: O için 16−8, H için 1−1.",
          "Toplam proton P=8+1=9 olur.",
          "İyonun bütün yükünü bir kez uygula: E=9−(−1)=10.",
        ],
        reasons: [
          "N=8+0=8, E=10; bütün iyonun yükü 9−10=−1’dir.",
          "9, proton toplamıdır; nötronlar hidrojen için sıfır katkıyla 8 eder.",
          "8 elektron, P=9 için +1 yük verir; anyon işareti ters uygulanmıştır.",
          "16; 18, atom adetlerini iki kat sayar; formülde bir O, bir H vardır.",
          "9; 9, nötron yerine proton seçer ve iyonu nötr kabul eder.",
        ],
        explanation:
          "Nötronları ayrı hesapla: O için 16−8, H için 1−1. Toplam proton P=8+1=9 olur. İyonun bütün yükünü bir kez uygula: E=9−(−1)=10. N=8+0=8, E=10; bütün iyonun yükü 9−10=−1’dir.",
        knowledge:
          "Çok atomlu iyonda N izotoplardan, E bütün iyonun yükünden bulunur.",
        error:
          "9, proton toplamıdır; nötronlar hidrojen için sıfır katkıyla 8 eder.",
        check: "Toplam nükleon 9+8=17=16+1.",
      },
      {
        prompt:
          "¹²C ve¹⁶O izotoplarından kurulan bir CO₃²⁻ iyonunun toplam elektron sayısı kaçtır? Z(C)=6, Z(O)=8.",
        options: ["32", "28", "30", "36", "48"],
        steps: [
          "Üç oksijenin proton katkısını 3×8=24 hesapla.",
          "Karbonla birlikte toplam P=6+24=30 olur.",
          "Bütün iyonun 2− yükü nedeniyle E=P+2 yaz.",
        ],
        reasons: [
          "E=32; 30−32=−2 doğru toplam yükü verir.",
          "28, proton toplamından 2 çıkarır ve +2 yüklü iyon üretir.",
          "30, nötr atomların elektron toplamıdır; iki eksi yük hesaba katılmamıştır.",
          "36, 2 elektronu yalnız üç O’ya ayrı ayrı ekler; bütün iyon yükünü −6 yapar.",
          "48, üç oksijenin kütle numaraları toplamıdır; elektron sayısı değildir.",
        ],
        explanation:
          "Üç oksijenin proton katkısını 3×8=24 hesapla. Karbonla birlikte toplam P=6+24=30 olur. Bütün iyonun 2− yükü nedeniyle E=P+2 yaz. E=32; 30−32=−2 doğru toplam yükü verir.",
        knowledge:
          "Alt indis atom adedini, sağ üst yük bütün iyonun yükünü belirtir.",
        error: "28, proton toplamından 2 çıkarır ve +2 yüklü iyon üretir.",
        check: "Yükü 32 elektrondan her atoma yeniden uygulama.",
      },
      {
        prompt:
          "Her biri ¹⁶O²⁻ olan dört iyonun toplam proton ve elektron sayısı nedir? Z(O)=8.",
        options: ["32; 40", "8; 10", "32; 34", "40; 32", "64; 40"],
        steps: [
          "Tek iyon p=8, e=8−(−2)=10 taşır.",
          "Dört iyon için proton ve elektron sayısını ayrı ayrı 4 ile çarp.",
          "Örneğin toplam yükünü P−E ile denetle: dört kez−2 olmalı.",
        ],
        reasons: [
          "P=32, E=40; toplam yük−8’dir.",
          "8; 10 yalnız tek iyonun değerleridir; dört iyon sayılmamıştır.",
          "34 elektron, dört iyonun toplamına yalnız bir kez−2 yük uygular; toplam yük−8 olmalı.",
          "Proton ile elektron yer değiştirirse toplam yük+8 olur.",
          "64 dört iyonun toplam nükleon sayısıdır; proton toplamı değildir.",
        ],
        explanation:
          "Tek iyon p=8, e=8−(−2)=10 taşır. Dört iyon için proton ve elektron sayısını ayrı ayrı 4 ile çarp. Örneğin toplam yükünü P−E ile denetle: dört kez−2 olmalı. P=32, E=40; toplam yük−8’dir.",
        knowledge:
          "Birden çok özdeş taneciğin hem adetleri hem toplam yükü tanecik sayısıyla çarpılır.",
        error: "8; 10 yalnız tek iyonun değerleridir; dört iyon sayılmamıştır.",
        check: "32−40=−8=4×(−2).",
      },
      {
        prompt:
          "A=37, Z=17 olan bir çekirdeğin nötron sayısı bir artarken proton ve elektron sayıları aynı kalıyor. Hangi sonuç doğrudur? Olay yalnız sayım karşılaştırmasıdır.",
        options: [
          "A bir artar; q değişmez.",
          "Z bir artar; element değişir.",
          "A değişmez; q bir artar.",
          "Elektron sayısı bir artar.",
          "A bir azalır; q bir azalır.",
        ],
        steps: [
          "Başlangıç n=37−17=20’dir; yeni n=21 olur.",
          "p sabitken A=p+n=17+21 hesapla.",
          "q=p−e’de iki sayı da sabit olduğundan net yük korunur.",
        ],
        reasons: [
          "A: 37→38, q sabit; değişen sayı yalnız nötrondur.",
          "Z proton sayısıdır; proton aynı kaldığı için Z artmaz.",
          "Nötron eklenmesi A’yı değiştirir ve q’ya yük katkısı yapmaz.",
          "Elektronların aynı kaldığı verilmiştir; nötron artışı onları artırmaz.",
          "Nötron artışı A’yı azaltmaz; nötron yüksüz olduğu için q da azalmaz.",
        ],
        explanation:
          "Başlangıç n=37−17=20’dir; yeni n=21 olur. p sabitken A=p+n=17+21 hesapla. q=p−e’de iki sayı da sabit olduğundan net yük korunur. A: 37→38, q sabit; değişen sayı yalnız nötrondur.",
        knowledge: "A çekirdek toplamı, q proton−elektron farkıdır.",
        error: "Z proton sayısıdır; proton aynı kaldığı için Z artmaz.",
        check: "A’nın artışını elektron veya proton artışı sanma.",
      },
      {
        prompt: "³He nötr atomu için Z=2, A=3 veriliyor. Hangi yorum doğrudur?",
        options: [
          "p=2, n=1, e=2; p>n olabilir.",
          "p=n=e=2; bütün nötr atomlarda üçü eşittir.",
          "p=3, n=2, e=3; A kimliği belirler.",
          "n=0; nötr sözcüğü nötronsuz demektir.",
          "e=1; nötron kadar elektron bulunur.",
        ],
        steps: [
          "Z=2 bilgisi proton sayısını doğrudan verir.",
          "n=A−Z=3−2=1 hesapla.",
          "Nötrlükten e=p=2 yazıp p ile n’yi karşılaştır.",
        ],
        reasons: [
          "2 proton,1 nötron,2 elektron; hidrojenden başka proton fazlası örneğidir.",
          "p=n=2 olsaydı A=4 olurdu; nötrlük n eşitliği istemez.",
          "A ve Z yer değiştirilmiştir; kimliği 2 proton belirler.",
          "n=0, A=Z gerektirirdi; burada 3−2=1’dir.",
          "Elektron nötr atomda protona eşittir, nötrona değil.",
        ],
        explanation:
          "Z=2 bilgisi proton sayısını doğrudan verir. n=A−Z=3−2=1 hesapla. Nötrlükten e=p=2 yazıp p ile n’yi karşılaştır. 2 proton,1 nötron,2 elektron; hidrojenden başka proton fazlası örneğidir.",
        knowledge:
          "Nötrlük p=e’dir; p ile n’nin büyüklük sırası ayrı bilgidir.",
        error: "p=n=2 olsaydı A=4 olurdu; nötrlük n eşitliği istemez.",
        check: "2+1=3 ve 2−2=0.",
      },
      {
        prompt:
          "Bir tek atomlu iyon için p=11, n=13, e=10 veriliyor. Bir öğrenci “A=21 ve q=+1” yazıyor. Hangi düzeltme gerekir?",
        options: [
          "Yalnız A,24 olmalı.",
          "Yalnız q,−1 olmalı.",
          "A=23, q=+2 olmalı.",
          "İki değer de doğrudur.",
          "A=34, q=0 olmalı.",
        ],
        steps: [
          "Kütle numarası için p+n=11+13 işlemini yap.",
          "Yük için bağımsız olarak p−e=11−10 hesapla.",
          "Öğrencinin 21 sayısının p+e’den geldiğini ayırt et.",
        ],
        reasons: [
          "A=24; q=+1 zaten doğru.",
          "q=−1, elektron−proton farkıdır; doğru işaret+1’dir.",
          "23 ve+2 verilen sayılardan çıkmaz; 24 ve+1 birlikte sağlanır.",
          "21 kütle numarası değil yüklü tanecik adedidir; A alanı yanlıştır.",
          "34 bütün tanecik toplamıdır; q da 11−10 nedeniyle sıfır değildir.",
        ],
        explanation:
          "Kütle numarası için p+n=11+13 işlemini yap. Yük için bağımsız olarak p−e=11−10 hesapla. Öğrencinin 21 sayısının p+e’den geldiğini ayırt et. A=24; q=+1 zaten doğru.",
        knowledge: "A=p+n; p+e başka bir toplamdır.",
        error: "q=−1, elektron−proton farkıdır; doğru işaret+1’dir.",
        check: "24+10=34 toplam tanecik ve 11−10=+1.",
      },
      {
        prompt:
          "Çekirdeği değişmeyen bir tanecikte elektron sayısı 8’den 11’e çıkıyor. Başlangıç yükü+1 ise son yük nedir?",
        options: ["−2", "+4", "−3", "+1", "+2"],
        steps: [
          "Elektron artışı Δe=11−8=+3’tür.",
          "Δq=−Δe=−3 ile başlangıç+1 yükünü ilişkilendir.",
          "qson=+1−3 bul; istersen p=8+1=9 ile yeniden hesapla.",
        ],
        reasons: [
          "qson=−2; 9 proton ve 11 elektronla doğrulanır.",
          "+4, elektron alımını yük artışı olarak uygulamıştır.",
          "−3, başlangıç yükünü 0 kabul edip yalnız değişimi son yük sanır.",
          "+1, elektron değişiminin yükü değiştirdiğini dışlar.",
          "+2, son farkın yalnız mutlak büyüklüğünü alıp işareti ters çevirir.",
        ],
        explanation:
          "Elektron artışı Δe=11−8=+3’tür. Δq=−Δe=−3 ile başlangıç+1 yükünü ilişkilendir. qson=+1−3 bul; istersen p=8+1=9 ile yeniden hesapla. qson=−2; 9 proton ve 11 elektronla doğrulanır.",
        knowledge:
          "Elektron artışında yük aynı miktarda azalır; başlangıç yükü eklenir.",
        error: "+4, elektron alımını yük artışı olarak uygulamıştır.",
        check: "9−11=−2; başlangıç 9−8=+1.",
      },
      {
        prompt:
          "Z=10 olan bir tanecikte A=22 ve proton+elektron toplamı 18’dir. Nötron ve net yük sırası hangisidir?",
        options: ["12; +2", "12; −2", "8; +2", "22; +8", "10; 0"],
        steps: [
          "Yüklü tanecik toplamından e=18−10=8 bulunur.",
          "Çekirdekten n=22−10=12 hesaplanır.",
          "Net yük q=10−8=+2 olarak belirlenir.",
        ],
        reasons: [
          "n=12, q=+2; iki farklı toplam bağımsız kullanılmıştır.",
          "n doğru; −2 elektron−proton farkının yanlış işaretidir.",
          "8 elektron sayısıdır; nötron 22−10=12 olmalı.",
          "22 A’dır, nötron değildir; 8 ise elektron adedi, net yük değildir.",
          "n=10 ve q=0 için A=20, Y=20 gerekirdi; iki veriyle çelişir.",
        ],
        explanation:
          "Yüklü tanecik toplamından e=18−10=8 bulunur. Çekirdekten n=22−10=12 hesaplanır. Net yük q=10−8=+2 olarak belirlenir. n=12, q=+2; iki farklı toplam bağımsız kullanılmıştır.",
        knowledge: "p+e verisi elektronları; A verisi nötronları belirler.",
        error: "n doğru; −2 elektron−proton farkının yanlış işaretidir.",
        check: "n+p=22 ve e+p=18 ayrı kontrol edilir.",
      },
      {
        prompt:
          "¹⁴N ve¹H kullanılarak kurulan nötr NH₃ molekülünün bütün proton+nötron+elektron sayısı kaçtır? Z(N)=7, Z(H)=1.",
        options: ["27", "17", "20", "24", "30"],
        steps: [
          "Proton toplamı 7+3×1=10; nötr molekülde E=10 olur.",
          "Nötron toplamı(14−7)+3×(1−1)=7’dir.",
          "Bütün belirtilen tanecikleri P+N+E=10+7+10 topla.",
        ],
        reasons: [
          "T=27; nükleon 17 ile elektron 10 birlikte sayılmıştır.",
          "17 yalnız toplam nükleondur; elektronlar unutulmuştur.",
          "20 yalnız P+E’dir; 7 nötron dışlanmıştır.",
          "24, üç H’yi proton katkısında unutup 14+3+7 yapar; toplam elektron 10 olmalı.",
          "30, her protona bir nötron varsayıp N=10 alır; ¹H nötronsuzdur.",
        ],
        explanation:
          "Proton toplamı 7+3×1=10; nötr molekülde E=10 olur. Nötron toplamı(14−7)+3×(1−1)=7’dir. Bütün belirtilen tanecikleri P+N+E=10+7+10 topla. T=27; nükleon 17 ile elektron 10 birlikte sayılmıştır.",
        knowledge:
          "Molekülde nükleon toplamı ile bütün tanecik toplamı ayrı niceliklerdir.",
        error: "17 yalnız toplam nükleondur; elektronlar unutulmuştur.",
        check: "14+3×1=17 nükleon; 17+10=27.",
      },
      {
        prompt:
          "Yalnız sıradan kimyasal iyonlaşma geçiren bir tanecik için hangisi değişebilir?",
        options: [
          "Proton/elektron oranı",
          "Atom numarası",
          "Nötron sayısı",
          "Kütle numarası",
          "Element kimliği",
        ],
        steps: [
          "Kimyasal iyonlaşmanın elektron alıp verme olduğunu kullan.",
          "p, n, Z, A ve element kimliği çekirdekle birlikte korunur.",
          "e değiştiği için p/e oranı, e sıfır olmayan durumlarda değişebilir.",
        ],
        reasons: [
          "p sabitken e değişirse p/e oranı değişebilir; tam elektron kaybında oran tanımsız olabilir.",
          "Z=p çekirdek korununca sabittir.",
          "n çekirdek taneciği olduğundan bu olayda korunur.",
          "A=p+n iki korunan sayının toplamıdır.",
          "Element kimliği proton sayısıyla korunur.",
        ],
        explanation:
          "Kimyasal iyonlaşmanın elektron alıp verme olduğunu kullan. p, n, Z, A ve element kimliği çekirdekle birlikte korunur. e değiştiği için p/e oranı, e sıfır olmayan durumlarda değişebilir. p sabitken e değişirse p/e oranı değişebilir; tam elektron kaybında oran tanımsız olabilir.",
        knowledge:
          "Elektron değişimi elektronik nicelikleri etkiler; çekirdek korunur.",
        error: "Z=p çekirdek korununca sabittir.",
        check:
          "Oran için pay ve paydayı ayrı izle; elektron sayısı sıfırsa bölme yapma.",
      },
      {
        prompt:
          "Bir tabloda A=18, Z=8, q=−2 taneciği için “n=10, e=6” yazıyor. Doğru değerlendirme hangisidir?",
        options: [
          "n doğru, e 10 olmalı.",
          "n 8 olmalı, e doğru.",
          "n 10, e 8 olmalı.",
          "Her ikisi de doğrudur.",
          "n 18, e 10 olmalı.",
        ],
        steps: [
          "n=18−8=10 olduğundan nötron alanı doğru.",
          "e=8−(−2) işleminde eksi yükü paranteze al.",
          "e=10 sonucunun q=8−10=−2 verdiğini denetle.",
        ],
        reasons: [
          "Yalnız elektron alanı düzeltilir; iki eksi yük iki elektron fazlasıdır.",
          "8 proton sayısıdır; n 10 zaten doğru, e 6 ise yanlış.",
          "e 8 nötr atomu verir; iyonun−2 yükünü dışlar.",
          "e 6 için q=+2 olur; kaydın yüküyle çelişir.",
          "18 A’dır; protonları çıkarmadan nötron hanesine yazılamaz.",
        ],
        explanation:
          "n=18−8=10 olduğundan nötron alanı doğru. e=8−(−2) işleminde eksi yükü paranteze al. e=10 sonucunun q=8−10=−2 verdiğini denetle. Yalnız elektron alanı düzeltilir; iki eksi yük iki elektron fazlasıdır.",
        knowledge:
          "Negatif yük çıkarıldığında elektron sayısına artı katkı gelir.",
        error: "8 proton sayısıdır; n 10 zaten doğru, e 6 ise yanlış.",
        check: "8+10=18 ve 8−10=−2.",
      },
      {
        prompt:
          "Aynı çekirdeğe sahip U ve V taneciklerinde qU=+2, qV=−1 veriliyor. eV−eU kaçtır?",
        options: ["3", "−3", "1", "2", "0"],
        steps: [
          "İki tanecik için eU=Z−2 ve eV=Z+1 yaz.",
          "eV−eU=(Z+1)−(Z−2) farkında ortak Z’yi götür.",
          "Sonuçta+1+2=3 kalır; daha negatif tanecikte daha çok elektron olmalı.",
        ],
        reasons: [
          "V, U’dan 3 elektron fazla taşır; çekirdek sayısı bilinmeden fark bulunur.",
          "−3, fark sırasını eU−eV olarak almıştır.",
          "1, yalnız V’nin nötrden fazlasını sayar; U’daki iki eksik elektronu dışlar.",
          "2, yalnız U’nun nötrden eksikliğini sayar; V’deki fazlayı dışlar.",
          "0, aynı çekirdeği aynı elektron sayısı sanır; yükler farklıdır.",
        ],
        explanation:
          "İki tanecik için eU=Z−2 ve eV=Z+1 yaz. eV−eU=(Z+1)−(Z−2) farkında ortak Z’yi götür. Sonuçta+1+2=3 kalır; daha negatif tanecikte daha çok elektron olmalı. V, U’dan 3 elektron fazla taşır; çekirdek sayısı bilinmeden fark bulunur.",
        knowledge: "Aynı Z’de elektron farkı yük farkının ters işaretlisidir.",
        error: "−3, fark sırasını eU−eV olarak almıştır.",
        check: "qV−qU=−3 ise eV−eU=+3.",
      },
      {
        prompt:
          "A=15, Z=7 olan nötr atomla aynı çekirdeğe sahip bir iyonun toplam tanecik sayısı 24’tür. İyonun yükü nedir?",
        options: ["−2", "+2", "−1", "0", "+7"],
        steps: [
          "Toplam T=A+e olduğundan e=24−15=9’dur.",
          "Aynı çekirdek bilgisi iyonun Z=7 değerini korur.",
          "q=Z−e=7−9 hesabını yap.",
        ],
        reasons: [
          "q=−2; başlangıç nötr 7 elektrondan iki elektron fazladır.",
          "+2,9−7 işlemiyle net yük işaretini ters alır.",
          "−1, e 8 gerektirir ve T23 olur; 24 sağlanmaz.",
          "0, e 7 ve T22 gerektirir; iyonun verilen toplamını karşılamaz.",
          "+7, çekirdeğin yüküdür; 9 elektronun katkısını dışlar.",
        ],
        explanation:
          "Toplam T=A+e olduğundan e=24−15=9’dur. Aynı çekirdek bilgisi iyonun Z=7 değerini korur. q=Z−e=7−9 hesabını yap. q=−2; başlangıç nötr 7 elektrondan iki elektron fazladır.",
        knowledge:
          "Aynı çekirdek, farklı toplam tanecik sayısı elektron farkından gelebilir.",
        error: "+2,9−7 işlemiyle net yük işaretini ters alır.",
        check: "7+(15−7)+9=24 ve 7−9=−2.",
      },
      {
        prompt:
          "Bir kaynak “elektronun kütlesi temel hesapta ihmal edilir” diyor. Bundan hangi sonuç çıkar?",
        options: [
          "Elektron kütlesi küçük katkıdır; tam sıfır olduğu söylenmez.",
          "Elektronun net yükü sıfırdır.",
          "Kütle numarasına elektron sayısı eklenmelidir.",
          "Elektron çekirdekteki bir nötrondur.",
          "Bütün izotopların hassas kütlesi A’ya tam eşittir.",
        ],
        steps: [
          "İhmalin bir hesap yaklaşımı olduğunu, varlık yokluğu olmadığını ayır.",
          "Elektronun yaklaşık kütlesi p veya n’den çok küçüktür; yükü yine−1’dir.",
          "A’nın bir nükleon sayısı oluşunu hassas kütleyle karıştırma.",
        ],
        reasons: [
          "Küçük ama sıfır olmayan kütle katkısı bazı yaklaşık hesaplarda ihmal edilebilir.",
          "Kütle ve yük farklı niceliklerdir; elektronun yükü−1’dir.",
          "A=p+n tanımdır; elektron eklemek tanımı değiştirir.",
          "Elektron çekirdek dışındaki kuantum durumlarında bulunur ve nötron değildir.",
          "Bağlanma etkileri nedeniyle hassas izotop kütlesi A’ya tam eşit alınamaz.",
        ],
        explanation:
          "İhmalin bir hesap yaklaşımı olduğunu, varlık yokluğu olmadığını ayır. Elektronun yaklaşık kütlesi p veya n’den çok küçüktür; yükü yine−1’dir. A’nın bir nükleon sayısı oluşunu hassas kütleyle karıştırma. Küçük ama sıfır olmayan kütle katkısı bazı yaklaşık hesaplarda ihmal edilebilir.",
        knowledge: "Yaklaşımın kapsamı ile tanecik özelliği ayrı tutulur.",
        error: "Kütle ve yük farklı niceliklerdir; elektronun yükü−1’dir.",
        check: "“İhmal” sözcüğünden sıfır kütle veya sıfır yük sonucu üretme.",
      },
    ],
  },
  {
    id: "izotop-izoton-izobar",
    topic: "detail-145",
    title: "İzotop, izoton, izobar: ileri karşılaştırma ve bolluk",
    minutes: 55,
    objectives: [
      "Çekirdek ve elektronik ilişkileri bütün tanım koşullarıyla ayır.",
      "Grafik, tablo ve eksik veride kesinlik sınırını belirle.",
      "İzotop bolluğundan ortalamaya ve ortalamadan bolluğa geç.",
    ],
    sections: [
      {
        title: "İsimden önce tablo kur",
        paragraphs: [
          "Her atom veya iyon için Z, A, n=A−Z, q ve e=Z−q sütunları aç. Aynı soruda çekirdek ilişkisi ve elektron ilişkisi birlikte bulunabilir; ikisini ayrı sütunlarda incele. Nötr atom olduğu verilmemişse e=Z yazma.",
          "Bir isim seçmeden önce eşit olan sayıyı ve farklı olması gereken sayıyı yaz. Aynı element mi, aynı nötron mu, aynı nükleon toplamı mı karşılaştırılıyor? Varsayımsal X, Y harfleri tek başına proton bilgisi değildir. Tablodaki bilinmeyeni sıfır saymak çözümün koşulunu değiştirir.",
        ],
      },
      {
        title: "İzotop: aynı kimlik, farklı nötron",
        paragraphs: [
          "Aynı Z’ye sahip, nötron sayıları farklı çekirdekler aynı elementin farklı izotoplarıdır. Z aynı kaldığından A farkı n farkına eşittir. Nötr ve aynı elektronik durumdaki izotopların elektron sayıları ile dizilimleri aynıdır; TYT modelinde kimyasal davranışları benzer kabul edilir.",
          "Kütleyle ilgili fiziksel özellikler ve nükleer kararlılık değişebilir; izotop etkilerini gerçekte bütünüyle yok sayan mutlak bir yargı kurulmaz. İzotop iyonlarının yükleri farklıysa elektron yapıları da değişebilir. “Aynı element” bilgisinden iyonların bütün kimyasal özelliklerinin aynı olduğu çıkarılmaz.",
        ],
      },
      {
        title: "İzoton ve izobar aynı element değildir",
        paragraphs: [
          "İzoton çiftte n aynı, Z farklıdır; dolayısıyla A da farklı olur. İzobar çiftte A aynı, Z farklıdır; bu kez n farklı olmak zorundadır. Her ikisinde de farklı proton sayıları farklı element anlamına gelir. Birinci ilişkide eşit olan fark A−Z, ikinci ilişkide eşit olan toplam Z+n’dir.",
          "İzotop, izoton ve izobar tanımlarındaki farklılık koşullarını unutma. Aynı Z ve aynı n taşıyan iki iyon aynı çekirdek türüdür; yalnız yükleri değişti diye farklı izotop veya izoton olmazlar. Aynı A da hassas izotop kütlelerinin tam eşitliğini veya aynı kimyasal davranışı garanti etmez.",
        ],
        table: {
          headers: ["İlişki", "Eşit olan", "Farklı olan"],
          rows: [
            ["İzotop", "Z", "n ve A"],
            ["İzoton", "n", "Z ve A"],
            ["İzobar", "A", "Z ve n"],
            [
              "Aynı çekirdek türü",
              "Z ve n; dolayısıyla A",
              "Elektron ve yük farklı olabilir",
            ],
          ],
        },
      },
      {
        title: "İzoelektroniklikte elektron düzenini de kontrol et",
        paragraphs: [
          "Bu rehberde izoelektronik tanecikler aynı elektron sayısı ve aynı elektron dizilimine sahiptir. Kapalı kabuklu temel hâl örneklerinde F⁻, Ne ve Na⁺ on elektronla 2,8 dağılımını taşır. Protonların farklı olması çekirdek kimliklerinin farklı olduğunu gösterir; yükleri de aynı olmak zorunda değildir.",
          "Elektron dizilimi elektronların enerji durumlarına dağılımını anlatır. Uyarılma veya farklı dizilim açıkça verilmişse e sayısının eşitliği tek başına yeterli değildir. Örneğin 2,8 ile 2,7,1 dağılımlarının toplamı on olsa da dağılımlar farklıdır. Katman yazımı bütün atom ve iyonların ayrıntılı orbital davranışına koşulsuz genellenmez.",
        ],
      },
      {
        title: "Elektron değiştirmek ile izotop değiştirmek ayrı işlemdir",
        paragraphs: [
          "Bir çekirdeğin elektron vermesi Z, n, A sayılarını korur ve yükü değiştirir. Nötron sayısı değiştiğinde ise aynı Z’de farklı izotop söz konusu olur. Bu yüzden bir izotopun nötr atomuyla iyonunu iki farklı izotop diye adlandırma.",
          "Çekirdek türünü Z ve A birlikte belirler; elektronik durum ve iyon yükü ayrıca belirtilir. Bir izotopun radyoaktif olması elementin bütün izotoplarının radyoaktif olduğunu göstermez. Bu derste sayısal karşılaştırma yapılması çekirdek dönüşümü üretme veya kararlılık tahmini anlamına gelmez.",
        ],
      },
      {
        title: "Periyodik tablodaki ondalık değer nereden gelir?",
        paragraphs: [
          "Bir örnekteki ortalama atom kütlesi, izotopların kütleleriyle atom sayısına dayanan bolluklarının ağırlıklı ortalamasıdır: m̄=Σ(fᵢmᵢ), Σfᵢ=1. İki izotopun yüzde bollukları x ve 100−x ise m̄=[xm₁+(100−x)m₂]/100 yazılır.",
          "Ağırlıklar atomların sayısal paylarıdır; kütle yüzdesiyle aynı veri değildir. Bir örneğin ortalaması tek atomun kesirli proton veya nükleon taşıdığı anlamına gelmez. Hassas hesapta gerçek izotop kütleleri kullanılır; A değerleri ancak soru açıkça yaklaşık kütle kabul ediyorsa yerlerine konur.",
        ],
      },
      {
        title: "İzotop çiftini yükten bağımsız tanı",
        paragraphs: [
          "İzotopluğun çekirdek koşulu Z eşitliği ve n farklılığıdır. İki iyonun elektron sayıları eşit de farklı da olabilir; bu elektronik bilgi tanımın yerini almaz. Çekirdek koşulunu bulduktan sonra elektron ilişkisini ayrıca adlandır.",
          "Aynı Z’ye sahip iki tanecikte A da aynıysa n=A−Z aynı çıkar. Farklı yükler yalnız elektron farkını gösterir. “İzotop iyonları” ifadesiyle aynı çekirdeğin iki yük hâlini karıştırmamak için her zaman iki A değerini açıkça yaz.",
        ],
      },
      {
        title: "İzotonda kütle farkını bul",
        paragraphs: [
          "A₁=Z₁+n ve A₂=Z₂+n yaz; çıkarınca A₂−A₁=Z₂−Z₁ elde edilir. Yani izoton çiftte proton sayısı kaç artıyorsa kütle numarası da o kadar artar. n eşitliği verilmeden bu fark yolu kullanılamaz.",
          "İzotonluk elektronlar hakkında tek başına eşitlik kurmaz. Nötr iki farklı element izotonsa elektron sayıları Z ile birlikte farklıdır. Uygun yükler verilirse izoton ve izoelektronik ilişkileri birlikte sağlanabilir; bunlar ayrı koşulların aynı örnekte buluşmasıdır.",
        ],
      },
      {
        title: "İzobarda proton ve nötron farkları ters yönlüdür",
        paragraphs: [
          "A sabitken Z+n toplamı sabittir. Bu nedenle Δn=−ΔZ olur; ikinci çekirdekte iki proton fazla varsa iki nötron eksik olmalıdır. Bu sayım farkı bir çekirdeğin gündelik kimyayla ötekine dönüştüğünü söylemez.",
          "İzobarlar için Z farklı olmalıdır. Aynı A ve aynı Z verilmişse aynı çekirdek türü bulunur. İyon yükleri uygun seçilirse farklı elementlerin izobar iyonları izoelektronik de olabilir; eşit A tek başına elektron eşitliği sağlamaz.",
        ],
      },
      {
        title: "Üç çekirdek adı bir çiftte birlikte bulunabilir mi?",
        paragraphs: [
          "İki farklı çekirdek aynı anda izotop ve izoton olamaz: aynı Z ve aynı n, aynı çekirdeği verir. İzotop ve izobar koşulları Z için hem eşitlik hem farklılık ister. İzoton ve izobar birlikteyse aynı n ve A’dan aynı Z çıkar; yine farklı element koşulu bozulur.",
          "Bu olanaksızlık yalnız üç çekirdek ilişkisine aittir. İzoelektroniklik elektronik eksendir ve bu ilişkilerden uygun olanıyla birlikte bulunabilir. Soruda birden çok etiket aranıyorsa “hiçbir çift iki ilişki taşıyamaz” biçiminde aşırı genelleme yapma.",
        ],
      },
      {
        title: "Z–n grafiğinde çizgilerin anlamını kur",
        paragraphs: [
          "Yatay eksen Z, düşey eksen n ise aynı dikeydeki farklı noktalar aynı Z’li izotoplardır. Aynı yataydaki farklı noktalar aynı n’li izotonlardır. Z+n sabitli çizgiler negatif eğimlidir ve farklı Z’li izobarları içerir.",
          "Bu çizgiler taneciklerin uzaydaki hareket yolları değildir; sayılar arasındaki bağıntının grafiğidir. Eksenlerden biri e yapılırsa yatay ve dikey hizaların anlamı yeniden okunur. Grafikte elektron veya yük verisi bulunmuyorsa izoelektroniklik kesinleştirilemez.",
        ],
      },
      {
        title: "Tablodan bütün çiftleri sistemli seç",
        paragraphs: [
          "Üç tanecik için üç çift, dört tanecik için altı çift vardır. Her çifte Z, n, A eşitliklerini sırayla uygula; bir taneciğin bir diğeriyle izotop olması üçüncüyle de izotop olmasını zorunlu kılmaz. Elektron ilişkisini son sütunda ayrıca işaretle.",
          "Bir çiftte aynı çekirdek türü görülürse bunu farklı izotoplar diye sayma. Sonuçları örneğin “U–V: izoton; V–W: izotop; U–W: izobar” biçiminde çift adlarıyla belirt. Etiketlerin toplamını değil, hangi iki satıra bağlandığını denetle.",
        ],
      },
      {
        title: "Eksik veride ilişkiyi denklem olarak kullan",
        paragraphs: [
          "İzotonluk A₁−Z₁=A₂−Z₂ denklemini, izobarlık A₁=A₂ denklemini, izotopluk Z₁=Z₂ ve A₁≠A₂ koşullarını verir. Bilinmeyen A’yı rastgele fark alarak değil, istenen ilişki üzerinden çöz.",
          "Elektron sayısı ve yükten Z=e+q ayrıca bulunabilir. Böylece elektronik bilgi çekirdeği tamamlamaya yardım eder, fakat n ile e aynı sayı diye varsayılmaz. Bulunan her değeri başlangıçtaki ilişki ve yük eşitliğine geri yerleştir.",
        ],
      },
      {
        title: "Kesin, olabilir ve olanaksız yargılarını ayır",
        paragraphs: [
          "“Kesin” bir yargı bütün verilen koşullardan zorunlu çıkar. “Olabilir” için koşulları bozmayan en az bir örnek yeterlidir. “Olanaksız” için koşulların birlikte çeliştiğini göstermek gerekir. Tek bir örneğin çalışması evrensel bir iddiayı kanıtlamaz.",
          "İzoelektronik farklı elementlerde e eşit ve Z farklı olduğundan q=Z−e ile yüklerin farklı olması kesindir. Nötronların eşit olması ise verilen A’lara bağlıdır; aynı e tek başına n’yi belirlemez. Karşı örnekte de bütün başlangıç koşullarını koru.",
        ],
      },
      {
        title: "Kimyasal benzerliği doğru kapsamda söyle",
        paragraphs: [
          "Aynı elementin nötr, aynı elektronik durumdaki izotoplarının elektronik yapısı aynıdır; okul düzeyinde kimyasal davranışları benzer kabul edilir. Farklı iyon yükü veya farklı elektronik durum bu koşulu değiştirir. İzotop kütlesinin bazı süreçlere etkisini “hiç yoktur” diye dışlama.",
          "Farklı elementlerin izoton, izobar ya da izoelektronik olması bütün fiziksel ve kimyasal özelliklerini eşitlemez. Aynı elektron sayılı yaygın kapalı kabuklu iyonlarda çekirdek yükü karşılaştırması yarıçap yorumuna yardım eder, ancak bu dersten her atom için genel yarıçap sıralaması çıkarılmaz.",
        ],
      },
      {
        title: "Ağırlıklı ortalamayı toplam atomlardan türet",
        paragraphs: [
          "N₁ atomun her biri m₁, N₂ atomun her biri m₂ kütlesindeyse toplam kütle N₁m₁+N₂m₂, toplam atom sayısı N₁+N₂ olur. Bölüm m̄’yi verir. N₁/(N₁+N₂) kesri bu yüzden ilk izotopun ağırlığıdır; basit ortalama yalnız eşit atom sayılarında geçerlidir.",
          "Ortalama, pozitif bollukla bulunan izotop kütlelerinin en küçüğü ile en büyüğü arasında yer alır. İki izotoplu örnekte orta noktadan hafif tarafa yakınsa hafif izotopun atom sayısı daha fazladır. Üç veya daha çok izotopta yalnız yakınlıktan bütün bolluklar tek tek bulunmaz.",
        ],
      },
      {
        title: "Ortalamadan bolluğa ters hesap yap",
        paragraphs: [
          "Yalnız iki izotop ve m₁<m₂ verildiğinde m̄=xm₁+(1−x)m₂ yaz. Düzenleyince x=(m₂−m̄)/(m₂−m₁) bulunur; x ilk izotopun atom kesridir. Yüzde için 100 ile çarp ve öteki bolluğu 100’den çıkar.",
          "Ortalama m₁ ile m₂ dışında verilmişse iki izotoplu pozitif bolluk modeliyle tutarsızdır. Başka bir izotop bulunabileceğini veya ölçüm/model verisinin farklı olduğunu düşün; negatif bolluğu yuvarlayarak gizleme. İki uç kütle eşitse bu ters denklem tek bir bolluk vermez.",
        ],
      },
      {
        title: "İki örneği birleştirirken atom sayısıyla ağırlıklandır",
        paragraphs: [
          "Aynı elementin iki örneğini karıştırırken örneklerin ortalamalarını ancak atom sayıları eşitse basitçe ortalayabilirsin. Birincide N, ikincide 3 N atom varsa birleşik ortalama (m̄₁+3 m̄₂)/4 olur. İstersen her izotopun atom sayısını ayrı toplayarak da aynı sonuca ulaşırsın.",
          "Gram miktarları veriliyorsa atom sayıları kütle/ortalama atom kütlesi ile orantılıdır; doğrudan gram yüzdesini atom bolluğu sanma. Bu rehberdeki ileri soru, gerekli oranı ya atom sayısı olarak verir ya da dönüşüm için bütün verileri açıkça belirtir.",
        ],
      },
      {
        title: "Modelin fiziksel sınırını koru",
        paragraphs: [
          "Etkinlikteki çekirdek noktaları Z ve n sayılarını, parçacık çubukları adetleri gösterir. Elektronlar gerçek sabit yörüngeler olarak çizilmez. Sayıların uygun çıkması her taneciğin doğada kararlı, bol veya serbest hâlde bulunabileceğini göstermez.",
          "İki izotoplu hazırlanmış örnek seçeneği doğanın eksiksiz izotop karışımı değildir. Gösterilen kütleler belirtilmiş yuvarlatılmış u değerleridir; bolluk atom sayısının yüzdesidir. Çizimden yarı ömür, bağ enerjisi, spektrum çizgisi şiddeti veya gerçek atom çapı çıkarılmaz.",
        ],
      },
      {
        title: "Çekirdeği, elektronu ve örneği birlikte denetle",
        paragraphs: [
          "Çözümün ilk denetimi her satırda A=Z+n ve q=Z−e’dir. İkinci denetim seçilen adın hem eşitlik hem farklılık koşuludur. Üçüncü denetim ortalama varsa bollukların toplamı ve sonucun uç kütleler arasında oluşudur.",
          "Bir koşulu değiştirerek düşün: yalnız elektron eklemek çekirdek ilişkisini korur, yalnız nötron farkı izotopluğu değiştirir, yalnız bolluk değişimi tek çekirdeği değiştirmez. Bu ayrım yeni bağlamlara aktarılacak ana yöntemdir; modelle kıyaslama tamamlanmış ustalık veya otomatik başarı puanı anlamına gelmez.",
        ],
      },
    ],
    examples: [
      {
        title: "İlişki zincirinden üç iyonun çekirdeklerini kur",
        prompt:
          "U²⁻, V⁻ ve nötr W temel hâlde 18 elektronla 2,8,8 dağılımındadır. U’nun 20 nötronu vardır. U ile V izoton, V ile W izobardır. Her taneciğin Z, n, A değerlerini ve U–W çekirdek ilişkisini bulunuz.",
        strategy:
          "Elektron-yük bilgisi önce Z’leri verir; sonra iki farklı çekirdek ilişkisini sırayla kullan.",
        steps: [
          {
            label: "Kimlikleri yükten bul",
            explanation: "Z=e+q her satır için ayrı uygulanır.",
            expression: "ZU=18−2=16; ZV=18−1=17; ZW=18",
          },
          {
            label: "İzoton ve izobar koşullarını uygula",
            explanation: "nV=nU=20; AV=17+20=37. W izobar olduğundan AW=37.",
            expression: "AU=36; AV=AW=37; nW=37−18=19",
          },
          {
            label: "U–W çiftini denetle",
            explanation:
              "Z: 16/18, n: 20/19, A: 36/37. Hiçbir çekirdek eşitliği yoktur; elektronik ilişki yine sağlanır.",
            expression: "U–W: izotop, izoton, izobar değil; izoelektronik",
          },
        ],
        answer:
          "U: (16,20,36), V: (17,20,37), W: (18,19,37). U–W yalnız belirtilen elektronik ilişkiyi taşır.",
        check:
          "U–V aynı n ve farklı Z; V–W aynı A ve farklı Z. Üçünde de Z−q=18.",
        pitfall:
          "İzotonluk ile izobarlığı geçişli tek bir ilişki gibi U’dan W’ye taşımak geçersizdir.",
      },
      {
        title: "Üç izotopta bir bolluk bilgisi neden gereklidir?",
        prompt:
          "Yalnız yaklaşık kütleleri 24,25,26 u kabul edilen üç Mg izotopundan oluşan örneğin ortalaması 24,30 u’dur. 25 u’luk izotopun atom bolluğu %20 verilmiştir. Diğer iki bolluğu bulunuz.",
        strategy:
          "Üç bolluktan biri verildiği için toplam ve ortalama iki bilinmeyeni belirler.",
        steps: [
          {
            label: "Toplam bolluk",
            explanation:
              "24 u izotopunun kesri x, 26 u izotopunun kesri y olsun.",
            expression: "x+y=0,80",
          },
          {
            label: "Ortalama denklemi",
            explanation:
              "x=0,80−y yazıp ortalamaya yerleştir; sabit 25 u katkısını koru.",
            expression: "24(0,80−y)+25×0,20+26 y=24,30",
          },
          {
            label: "Denklemi çöz ve denetle",
            explanation: "19,20+5,00+2 y=24,30; y=0,05, x=0,75.",
            expression: "%75, %20, %5 → 18,00+5,00+1,30=24,30 u",
          },
        ],
        answer: "24 u izotopu %75; 26 u izotopu %5.",
        check:
          "Yüzdeler 100 eder. Ortalamaya yakınlık tek başına üç bolluğu vermez; %20 bilgisi ikinci serbestliği kapatmıştır.",
        pitfall:
          "İki izotop formülünü ortadaki %20’yi yok sayarak uygulamak toplam atom sayısını değiştirir.",
      },
      {
        title: "Atom sayıları farklı iki örneği birleştir",
        prompt:
          "Yalnız yaklaşık 28 ve 30 u’luk Si izotopları içeren A örneğinin ortalaması 28,20 u, B örneğinin ortalaması 29,60 u’dur. A’da 2 N, B’de 3 N atom bulunuyor. Birleşik örneğin ortalamasını ve hafif izotopun bolluğunu bulunuz.",
        strategy:
          "Örnek ortalamalarını gramla değil, verilen atom sayılarıyla ağırlıklandır.",
        steps: [
          {
            label: "Birleşik ortalama",
            explanation:
              "Toplam kütle (2 N×28,20+3 N×29,60)u, toplam atom 5 N’dir.",
            expression: "m̄=(56,40+88,80)/5=29,04 u",
          },
          {
            label: "Örneklerin izotop kesirleri",
            explanation: "A için (30−28,20)/2=0,90; B için (30−29,60)/2=0,20.",
            expression: "Hafif atom adedi: 2 N×0,90+3 N×0,20=2,40 N",
          },
          {
            label: "Birleşik bolluk",
            explanation:
              "Hafif atomları toplam 5 N atoma böl; ortalamayı tekrar kur.",
            expression: "f=2,40/5=0,48; 28×0,48+30×0,52=29,04 u",
          },
        ],
        answer: "Birleşik ortalama 29,04 u; hafif izotopun atom bolluğu %48.",
        check:
          "İki ayrı yöntem aynı sonucu verir. Basit ortalama 28,90 u, atom sayıları eşit olmadığı için uygun değildir.",
        pitfall:
          "2: 3 atom oranını göz ardı edip örneklere eşit ağırlık vermek bollukları da yanlış taşır.",
      },
      {
        title: "Aynı elektron sayısı, farklı elektronik durum",
        prompt:
          "U=¹⁶O ve V=¹⁷O için Z=8, W=¹⁹F⁺ için Z=9’dur. Üçü de 8 elektronludur. Soruda U ve W için 2,6; uyarılmış V için 2,5,1 katman dağılımları veriliyor. Hangi çiftler izotop ve hangi çiftler izoelektroniktir?",
        strategy:
          "Önce çekirdeği, sonra verilmiş elektron dağılımlarını karşılaştır; toplam e eşitliğinde durma.",
        steps: [
          {
            label: "Çekirdek sütunları",
            explanation: "U, V, W için n değerlerini A−Z ile çıkar.",
            expression: "nU=8; nV=9; nW=10",
          },
          {
            label: "Çekirdek ilişkisi",
            explanation:
              "Yalnız U–V’de Z=8 eşit ve n farklıdır. Diğer çiftlerde Z, n, A eşitliği yoktur.",
            expression:
              "U–V izotop; U–W ve V–W bu üç çekirdek ilişkisini taşımaz",
          },
          {
            label: "Elektron dağılımı",
            explanation:
              "U ve W’nin e sayısı ve verilen 2,6 dağılımı aynıdır; V’nin dağılımı farklıdır.",
            expression: "İzoelektronik çift yalnız U–W",
          },
        ],
        answer: "İzotop: U–V. İzoelektronik: U–W.",
        check:
          "2+6=2+5+1=8; aynı toplamın farklı dağılımlar verebildiği bu örnekte açıkça görülür.",
        pitfall:
          "Uyarılmayı iyonlaşma veya nötron değişimi sanma; V’nin nötr oluşu ve çekirdeği verilmiştir.",
      },
      {
        title: "Eşit kütle, eşit atom sayısı değildir",
        prompt:
          "Yaklaşık izotop kütleleri 10 ve 11 u alınan iki B izotopundan ayrı ayrı toplam 110 u kütle içeren küçük örnekler birleştiriliyor. İzotop başına atom sayılarını, birleşik hafif izotop bolluğunu ve ortalama atom kütlesini bulunuz.",
        strategy:
          "Toplam kütleyi tek atom kütlesine bölerek atom sayısına geç; iki kütlenin eşitliği atom sayısını eşitlemez.",
        steps: [
          {
            label: "İki atom sayısı",
            explanation:
              "Her örnekte 110 u vardır; tek atom kütleleri farklıdır.",
            expression: "N10=110/10=11; N11=110/11=10",
          },
          {
            label: "Bolluk",
            explanation: "Toplam 21 atomun 11’i hafif izotoptur.",
            expression: "f 10=11/21 → yaklaşık %52,38",
          },
          {
            label: "Ortalama",
            explanation: "Birleşik 220 u kütleyi toplam 21 atoma böl.",
            expression: "m̄=220/21≈10,476 u",
          },
        ],
        answer:
          "11 hafif, 10 ağır atom; hafif bolluğu yaklaşık %52,38; ortalama yaklaşık 10,476 u.",
        check:
          "11×10+10×11=220 u. 10,5 u basit ortalaması ancak atom adetleri eşitse geçerli olurdu.",
        pitfall:
          "Kütlece %50’yi atomca %50 sanmak ortalama için yanlış ağırlık seçmektir.",
      },
      {
        title: "Yanlış sınıflandırmanın iki ayrı nedenini göster",
        prompt:
          "Bir tablo R: (Z=14, n=16, e=14), S: (Z=14, n=17, e=12), T: (Z=15, n=16, e=15) veriyor. Bir öğrenci “R–S aynı element olduğundan elektronları da aynıdır; S–T nötronları eşittir” diyor. İki iddiayı düzeltip bütün çekirdek ilişkilerini bulunuz.",
        strategy:
          "Önce sayıları tamamla; “aynı element” ile “aynı elektron” arasındaki ek varsayımı görünür yap.",
        steps: [
          {
            label: "Kütle ve yük sütunları",
            explanation: "A=Z+n ve q=Z−e hesapları iddiaları sayıya indirir.",
            expression: "AR=30, qR=0; AS=31, qS=+2; AT=31, qT=0",
          },
          {
            label: "İki hatayı ayrı düzelt",
            explanation:
              "R–S aynı Z ama e: 14/12; S–T n: 17/16 olduğundan nötron eşitliği yoktur.",
            expression: "R–S izotop; S–T izobar",
          },
          {
            label: "Üçüncü çifti tamamla",
            explanation: "R–T aynı n=16, farklı Z=14/15’tir.",
            expression: "R–T izoton; R–S için elektron eşitliği zorunlu değil",
          },
        ],
        answer:
          "R–S izotop, S–T izobar, R–T izoton. Öğrencinin iki gerekçesi de ilgili sayılarla çürür.",
        check:
          "Üç çifti tanımın hem eşitlik hem farklılık koşuluna geri koy; R ile S’nin yük farkı elektron farkını açıklar.",
        pitfall:
          "İzotop kimliğini kullanarak nötr olma koşulunu kendiliğinden ekleme.",
      },
    ],
    recall: [
      {
        prompt:
          "Aynı Z ve A taşıyan iki farklı yüklü tanecik iki farklı izotop mudur?",
        answer:
          "Hayır. Aynı çekirdek türünün farklı elektron sayılı yük hâlleridir.",
      },
      {
        prompt: "İzoton çiftte Z farkı A farkıyla nasıl ilişkilidir?",
        answer: "n sabit olduğundan ΔA=ΔZ olur; farklar aynı yönlüdür.",
      },
      {
        prompt: "Aynı e fakat verilmiş farklı dizilimler neyi kanıtlar?",
        answer:
          "Elektron sayısı eşitliğini kanıtlar; bu rehberin tanımıyla izoelektroniklik için aynı dizilim koşulu sağlanmaz.",
      },
      {
        prompt: "İki farklı element izoelektronikse yükleri eşit olabilir mi?",
        answer:
          "Tek atomlu taneciklerde q=Z−e olduğundan aynı e ve farklı Z, farklı q verir.",
      },
      {
        prompt:
          "İki izotopun basit kütle ortalaması hangi koşulda ağırlıklı ortalamadır?",
        answer:
          "Atom sayıları veya atom bollukları eşitse. Kütlece eşitlik tek başına yetmez.",
      },
      {
        prompt:
          "Ortalama uç izotop kütlelerinin dışında çıkarsa ne denetlenir?",
        answer:
          "Bollukların anlamı, toplamı ve iki izotop varsayımı denetlenir; pozitif ağırlıklarla ortalama uçlar dışında olamaz.",
      },
    ],
    items: [
      {
        prompt:
          "U için Z=15, A=31, q=0; V için Z=15, A=32, q=+3 veriliyor. Çekirdek ilişkileri ve elektron sayıları hangisidir?",
        options: [
          "İzotop; 15 ve 12",
          "İzoton; 15 ve 15",
          "İzobar; 31 ve 32",
          "Aynı çekirdek; 15 ve 12",
          "İzotop; 15 ve 18",
        ],
        steps: [
          "U’da n=31−15=16, V’de n=32−15=17 bulunur.",
          "Aynı Z ve farklı n koşulunu izotop tanımıyla eşleştir.",
          "eU=15, eV=15−3=12 hesaplayıp çekirdek ilişkisinden ayrı yaz.",
        ],
        reasons: [
          "Aynı elementin farklı nötronlu izotoplarıdır; farklı yükler elektronları 15/12 yapar.",
          "n 16 ve 17 eşit değildir; V’nin+3 yükü de e 15 vermez.",
          "A31 ve 32 farklı olduğu için izobar değiller; A değerleri elektron sayısı değildir.",
          "A ve n farklı olduğundan aynı çekirdek türü değiller.",
          "İzotop ilişkisi doğru; 18 elektron V için−3 yük verirdi, +3 değil.",
        ],
        explanation:
          "U’da n=31−15=16, V’de n=32−15=17 bulunur. Aynı Z ve farklı n koşulunu izotop tanımıyla eşleştir. eU=15, eV=15−3=12 hesaplayıp çekirdek ilişkisinden ayrı yaz. Aynı elementin farklı nötronlu izotoplarıdır; farklı yükler elektronları 15/12 yapar.",
        knowledge:
          "İzotopluk Z, n koşuludur; iyon yükü elektron sayısını ayrıca belirler.",
        error: "n 16 ve 17 eşit değildir; V’nin+3 yükü de e 15 vermez.",
        check: "15−12=+3; 31−15 ile 32−15 farklıdır.",
      },
      {
        prompt:
          "²⁷Al ve²⁸Si nötr atomlarında Z(Al)=13, Z(Si)=14’tür. Aralarındaki çekirdek ilişkisi hangisidir?",
        options: [
          "İzoton",
          "İzotop",
          "İzobar",
          "Aynı çekirdek türü",
          "İzoelektronik oldukları için aynı element",
        ],
        steps: [
          "nAl=27−13=14 ve nSi=28−14=14 hesapla.",
          "Z13/14 farklılığını aynı nötron sayısıyla birlikte denetle.",
          "Nötr atomlarda elektronlar 13/14 olduğundan elektronik eşitlik de yoktur.",
        ],
        reasons: [
          "Nötronları 14, protonları farklı: izotondurlar.",
          "Z değerleri farklıdır; izotop aynı Z gerektirir.",
          "A27 ve 28 farklıdır; izobarlık sağlanmaz.",
          "Aynı çekirdek için hem Z hem n eşit olmalı; Z farklıdır.",
          "Elektron 13/14 eşit değil; elementleri de Z farklı olduğundan farklıdır.",
        ],
        explanation:
          "nAl=27−13=14 ve nSi=28−14=14 hesapla. Z13/14 farklılığını aynı nötron sayısıyla birlikte denetle. Nötr atomlarda elektronlar 13/14 olduğundan elektronik eşitlik de yoktur. Nötronları 14, protonları farklı: izotondurlar.",
        knowledge: "İzotonluk n eşitliği yanında Z farklılığı ister.",
        error: "Z değerleri farklıdır; izotop aynı Z gerektirir.",
        check:
          "14 nötronu ortak olsa da A değerleri Z ile birlikte bir farklıdır.",
      },
      {
        prompt:
          "³⁶S ile³⁶Cl için Z değerleri 16 ve 17’dir. Nötron sayıları ve çekirdek ilişkileri hangisidir? Yük bilgisi verilmemiştir.",
        options: [
          "20 ve 19; izobar",
          "20 ve 20; izoton",
          "16 ve 17; izotop",
          "19 ve 20; izobar",
          "36 ve 36; aynı çekirdek",
        ],
        steps: [
          "İlk çekirdekte 36−16, ikincide 36−17 çıkar.",
          "A36 eşitken Z16/17 farklı olduğundan ilişkiyi seç.",
          "Elektron sonucu istenmediğini ve yük olmadan nötrlük varsayılmadığını koru.",
        ],
        reasons: [
          "n 20/19 ve eşit A36, farklı Z ile izobarlık sağlanır.",
          "İkinci n 19’dur; A’nın aynı olması nötron eşitliği vermez.",
          "16/17 proton sayılarıdır; Z farklılığı izotopluğu dışlar.",
          "İzobar etiketi doğru, fakat nötronların sırası ters çevrilmiştir.",
          "36 nükleon toplamıdır; nötron değildir ve Z farklıyken çekirdekler aynı değildir.",
        ],
        explanation:
          "İlk çekirdekte 36−16, ikincide 36−17 çıkar. A36 eşitken Z16/17 farklı olduğundan ilişkiyi seç. Elektron sonucu istenmediğini ve yük olmadan nötrlük varsayılmadığını koru. n 20/19 ve eşit A36, farklı Z ile izobarlık sağlanır.",
        knowledge:
          "İzobarda aynı A farklı proton ve nötron paylaşımlarıyla oluşur.",
        error: "İkinci n 19’dur; A’nın aynı olması nötron eşitliği vermez.",
        check: "16+20=17+19=36.",
      },
      {
        prompt:
          "⁵⁶Fe nötr atomu ile⁵⁶Fe²⁺ iyonu için Z=26 veriliyor. Hangi ifade doğrudur?",
        options: [
          "Aynı çekirdek türünün farklı yük hâlleridir.",
          "İki farklı izotoptur; elektron farkı yeterlidir.",
          "İzobardırlar; Z farklıdır.",
          "İzotondurlar; protonları farklıdır.",
          "İkisinde de 26 elektron vardır.",
        ],
        steps: [
          "Her ikisinde n=56−26=30 ve Z=26’dır.",
          "İki farklı izotop için n farkı gerekir; burada çekirdek aynı.",
          "Elektronlar nötrde 26, iyonda 26−2=24 olarak ayrılır.",
        ],
        reasons: [
          "Aynı Z, A, n korunmuş; yalnız elektron ve yük değişmiştir.",
          "İzotopluk elektron farkıyla değil nötron farkıyla tanımlanır.",
          "Z26/26 aynı olduğundan izobarın farklı element koşulu yoktur.",
          "Nötronlar aynı olsa da izoton için protonların farklı olması gerekir.",
          "İyonda 24 elektron vardır; 26 elektron nötr atom koşuludur.",
        ],
        explanation:
          "Her ikisinde n=56−26=30 ve Z=26’dır. İki farklı izotop için n farkı gerekir; burada çekirdek aynı. Elektronlar nötrde 26, iyonda 26−2=24 olarak ayrılır. Aynı Z, A, n korunmuş; yalnız elektron ve yük değişmiştir.",
        knowledge: "Aynı çekirdek farklı elektron sayıları taşıyabilir.",
        error: "İzotopluk elektron farkıyla değil nötron farkıyla tanımlanır.",
        check: "26−24=+2; iki taneciğin A değeri 56 kalır.",
      },
      {
        prompt:
          "Temel hâlde ¹⁵N³⁻ ile²⁴Mg²⁺ için Z(N)=7, Z(Mg)=12 verilmiştir. Elektron dağılımları ikisinde de 2,8’dir. Hangi ilişki kesin sağlanır?",
        options: [
          "İzoelektroniklik",
          "İzotopluk",
          "İzotonluk",
          "İzobarlık",
          "Aynı net yük",
        ],
        steps: [
          "eN=7−(−3)=10; eMg=12−2=10 hesapla.",
          "Verilmiş 2,8 dağılımlarının da aynı olduğunu kontrol et.",
          "nN=8, nMg=12; A15/24 ve Z7/12 değerlerini diğer adlar için karşılaştır.",
        ],
        reasons: [
          "Hem 10 elektron hem aynı dağılım vardır; izoelektronik koşulu tamamdır.",
          "Proton 7 ve 12 farklı olduğundan izotop değiller.",
          "Nötron 8 ve 12 eşit değildir.",
          "Kütle numaraları 15 ve 24 eşit değildir.",
          "Yükler−3 ve+2’dir; aynı elektron sayısı aynı yük demek değildir.",
        ],
        explanation:
          "eN=7−(−3)=10; eMg=12−2=10 hesapla. Verilmiş 2,8 dağılımlarının da aynı olduğunu kontrol et. nN=8, nMg=12; A15/24 ve Z7/12 değerlerini diğer adlar için karşılaştır. Hem 10 elektron hem aynı dağılım vardır; izoelektronik koşulu tamamdır.",
        knowledge:
          "Elektron sayısı ve verilmiş dağılım birlikte elektronik ilişkiyi belirler.",
        error: "Proton 7 ve 12 farklı olduğundan izotop değiller.",
        check: "2+8=10; Z−q iki tanecikte de 10.",
      },
      {
        prompt:
          "İki farklı çekirdeğin hem izotop hem izobar olması neden olanaksızdır?",
        options: [
          "İzotop aynı Z, izobar farklı Z ister.",
          "İzotoplar daima farklı elementtir.",
          "İzobarlar daima aynı nötron sayısını taşır.",
          "Elektronları eşit olan hiçbir çift çekirdek ilişkisi taşıyamaz.",
          "Kütle numarası kesirli olmak zorundadır.",
        ],
        steps: [
          "İzotop tanımını Z₁=Z₂ ve n₁≠n₂ olarak yaz.",
          "İzobar tanımını A₁=A₂ ve Z₁≠Z₂ olarak yaz.",
          "Z için aynı anda eşitlik ve farklılık istendiğini göster.",
        ],
        reasons: [
          "Aynı Z için eşit ve farklı koşulları birlikte sağlanamaz.",
          "İzotoplar aynı elementin farklı nötronlu çekirdekleridir.",
          "İzobarda farklı Z’ler eşit A’yı paylaşınca n farklı olur.",
          "Elektronik ilişki çekirdek ilişkisiyle uygun koşullarda birlikte bulunabilir.",
          "A bir tam sayı nükleon adedidir; kesirlilik bu çelişkinin nedeni değildir.",
        ],
        explanation:
          "İzotop tanımını Z₁=Z₂ ve n₁≠n₂ olarak yaz. İzobar tanımını A₁=A₂ ve Z₁≠Z₂ olarak yaz. Z için aynı anda eşitlik ve farklılık istendiğini göster. Aynı Z için eşit ve farklı koşulları birlikte sağlanamaz.",
        knowledge:
          "Tanımları birlikte uygularken yalnız eşitlikleri değil farklılıkları da yaz.",
        error: "İzotoplar aynı elementin farklı nötronlu çekirdekleridir.",
        check: "Aynı A ve Z zaten aynı n’yi verir; farklı çekirdek kalmaz.",
      },
      {
        prompt:
          "U ile V izotondur. V’nin proton sayısı U’dan 3 az ise AV−AU kaçtır?",
        options: [
          "−3",
          "+3",
          "0",
          "−6",
          "Belirlenemez; elektron sayısı gerekir.",
        ],
        steps: [
          "İzotonluk nV=nU koşulunu verir.",
          "AV−AU=(ZV+n)−(ZU+n)=ZV−ZU yaz.",
          "Verilen proton farkını−3 olarak yerleştir.",
        ],
        reasons: [
          "A farkı proton farkıyla aynı yönlüdür: −3.",
          "+3, izotonu izobardaki ters yönlü farkla karıştırır.",
          "A sabit değildir; yalnız n sabittir.",
          "−6, tek proton farkını iki kez sayar; ortak n götürülür.",
          "A=Z+n çekirdek hesabıdır; e gerektirmez.",
        ],
        explanation:
          "İzotonluk nV=nU koşulunu verir. AV−AU=(ZV+n)−(ZU+n)=ZV−ZU yaz. Verilen proton farkını−3 olarak yerleştir. A farkı proton farkıyla aynı yönlüdür: −3.",
        knowledge: "İzotonda ΔA=ΔZ.",
        error: "+3, izotonu izobardaki ters yönlü farkla karıştırır.",
        check: "n eşitken Z üç azalırsa toplam A da üç azalır.",
      },
      {
        prompt:
          "İzobar U ve V çekirdeklerinde ZV−ZU=+4 veriliyor. nV−nU kaçtır?",
        options: ["−4", "+4", "0", "+8", "−8"],
        steps: [
          "İzobarlık AV−AU=0 demektir.",
          "0=(ZV−ZU)+(nV−nU) yaz.",
          "Verilen+4’ü diğer tarafa geçirerek nötron farkını bul.",
        ],
        reasons: [
          "Δn=−4; proton artışı sabit A’da nötron azalmasıyla dengelenir.",
          "+4, A toplamını 8 artırır ve izobarlığı bozar.",
          "0, n sabitken Z+4 değişimi A’yı da 4 artırır.",
          "+8, proton farkını ikiyle çarpmaktır; toplam korunumu kurulmamıştır.",
          "−8, nötron azalmasını iki kat alır ve A farkını−4 yapar.",
        ],
        explanation:
          "İzobarlık AV−AU=0 demektir. 0=(ZV−ZU)+(nV−nU) yaz. Verilen+4’ü diğer tarafa geçirerek nötron farkını bul. Δn=−4; proton artışı sabit A’da nötron azalmasıyla dengelenir.",
        knowledge: "İzobarda ΔZ+Δn=0.",
        error: "+4, A toplamını 8 artırır ve izobarlığı bozar.",
        check: "+4+(−4)=0.",
      },
      {
        prompt:
          "Aynı Z’li iki farklı izotoptan V’de U’ya göre 3 fazla nötron var. Yükleri verilmemiştir. Hangisi kesin doğrudur?",
        options: [
          "AV−AU=3",
          "eV−eU=3",
          "qV=qU",
          "ZV−ZU=3",
          "Hassas atom kütleleri farkı tam 3 u’dur.",
        ],
        steps: [
          "İzotopluk ZV=ZU koşulunu verir.",
          "A farkınıΔA=ΔZ+Δn olarak yaz.",
          "ΔZ=0,Δn=3 yerleştir; elektron, yük ve hassas kütle için ek veri olmadığını koru.",
        ],
        reasons: [
          "ΔA=0+3=3 tam sayı nükleon farkıdır.",
          "Nötron farkı elektron farkı vermez; iyon yükleri belirtilmemiştir.",
          "Yüklerin eşitliği verilmemiştir; aynı Z tek başına e’yi eşitlemez.",
          "İzotopta Z farkı 0’dır; 3 nötron farkıdır.",
          "A farkı 3 olsa da hassas izotop kütlelerinde bağlanma etkileri bulunur; tam 3 u zorunlu değildir.",
        ],
        explanation:
          "İzotopluk ZV=ZU koşulunu verir. A farkınıΔA=ΔZ+Δn olarak yaz. ΔZ=0,Δn=3 yerleştir; elektron, yük ve hassas kütle için ek veri olmadığını koru. ΔA=0+3=3 tam sayı nükleon farkıdır.",
        knowledge: "A farkı ile hassas kütle farkı aynı kesinlikte değildir.",
        error:
          "Nötron farkı elektron farkı vermez; iyon yükleri belirtilmemiştir.",
        check: "A=Z+n bağıntısında yalnız n değişmiştir.",
      },
      {
        prompt:
          "Temel hâlde U⁺ ve V²⁻ izoelektroniktir. U⁺18 elektron taşır; ikisinin kütle numarası 40’tır. V’nin Z ve n sayıları hangisidir?",
        options: ["16; 24", "20; 20", "18; 22", "19; 21", "16; 22"],
        steps: [
          "İzoelektroniklikten V’nin e sayısı 18’dir.",
          "V’nin q=−2 yükü için Z=e+q=18−2 yaz.",
          "nV=40−16 ile çekirdeği tamamla.",
        ],
        reasons: [
          "ZV=16, nV=24; 16−18=−2 ve 16+24=40.",
          "20,−2 yerine+2 yük kullanır; nötrona da yanlış Z taşınır.",
          "18, V’yi nötr kabul eder; −2 yük atlanmıştır.",
          "19, U’nun Z=18+1 değeridir; U ile V yer değiştirilmiştir.",
          "Z16 doğru; n 22 ile A38 olur ve 40 koşulu bozulur.",
        ],
        explanation:
          "İzoelektroniklikten V’nin e sayısı 18’dir. V’nin q=−2 yükü için Z=e+q=18−2 yaz. nV=40−16 ile çekirdeği tamamla. ZV=16, nV=24; 16−18=−2 ve 16+24=40.",
        knowledge:
          "Elektron sayısı ortak olsa da Z=e+q her iyon için ayrı uygulanır.",
        error: "20,−2 yerine+2 yük kullanır; nötrona da yanlış Z taşınır.",
        check: "U içinZ19, V içinZ16; aynı A farklı Z ile izobarlık da vardır.",
      },
      {
        prompt:
          "Yatay Z, düşey n grafiğinde P=(5,6), R=(5,7), S=(6,6) noktaları var. Hangi çift izoton, hangi çift izobar olarak doğru verilmiştir?",
        options: [
          "P–S izoton; R–S izobar",
          "P–R izoton; P–S izobar",
          "P–R izobar; R–S izoton",
          "P–S izotop; R–S izobar",
          "R–S izoton; P–R izotop",
        ],
        steps: [
          "P, R, S için A değerlerini 11,12,12 olarak hesapla.",
          "P ile S’de n=6 eşit, Z5/6 farklıdır.",
          "R ile S’de A=12 eşit, Z5/6 farklıdır.",
        ],
        reasons: [
          "P–S aynı n ile izoton, R–S aynı A ile izobardır.",
          "P–R aynı Z ile izotoptur; P–S’nin A11/12 farklıdır.",
          "P–R’nin A11/12 farklı, R–S’nin n 7/6 farklıdır.",
          "P–S’de Z5/6 farklı olduğundan izotop değildir.",
          "P–R izotop olsa da R–S nötron 7/6 ile izoton değildir.",
        ],
        explanation:
          "P, R, S için A değerlerini 11,12,12 olarak hesapla. P ile S’de n=6 eşit, Z5/6 farklıdır. R ile S’de A=12 eşit, Z5/6 farklıdır. P–S aynı n ile izoton, R–S aynı A ile izobardır.",
        knowledge: "Z–n grafiğindeki eşit toplamları A=Z+n hesabıyla doğrula.",
        error: "P–R aynı Z ile izotoptur; P–S’nin A11/12 farklıdır.",
        check: "P–R aynı dikeyde izotop; birinci istenen ilişki izotondur.",
      },
      {
        prompt:
          "Yatay elektron, düşey nötron eksenli grafikte U=(10,12), V=(10,13) verilmiştir. Proton ve elektronik durum bilgisi yoktur. Kesin sonuç hangisidir?",
        options: [
          "Elektronları eşit, nötronları farklıdır.",
          "İzotopturlar.",
          "İzotondurlar.",
          "İzobardırlar.",
          "Elektron dizilimleri kesin aynıdır.",
        ],
        steps: [
          "İlk koordinatı e, ikinciyi n olarak tabloya aktar.",
          "eU=eV=10, nU=12, nV=13 sonucunu oku.",
          "Z, A ve dizilim verilmediği için bunlara dayalı tanımları kesinleştirme.",
        ],
        reasons: [
          "Bu iki eşitlik/fark doğrudan eksen verileridir.",
          "İzotopluk için Z eşitliği de gerekir; proton verilmemiştir.",
          "Nötron 12 ve 13 farklıdır; izoton değiller.",
          "A=Z+n için Z bilinmiyor; A eşitliği çıkarılamaz.",
          "Aynı e sayısı farklı verilmemiş elektronik durumları tekilleştirmez.",
        ],
        explanation:
          "İlk koordinatı e, ikinciyi n olarak tabloya aktar. eU=eV=10, nU=12, nV=13 sonucunu oku. Z, A ve dizilim verilmediği için bunlara dayalı tanımları kesinleştirme. Bu iki eşitlik/fark doğrudan eksen verileridir.",
        knowledge:
          "Grafikte bulunmayan proton veya elektronik durum bilgisini ekleme.",
        error: "İzotopluk için Z eşitliği de gerekir; proton verilmemiştir.",
        check: "Aynı yatay koordinat burada Z değil e eşitliğidir.",
      },
      {
        prompt:
          "İki tek atomlu taneciğin yalnız 18’er elektron taşıdığı veriliyor. Elektronik durumları belirtilmemiştir. En doğru değerlendirme hangisidir?",
        options: [
          "Elektron sayıları eşittir; dizilim eşitliği ayrıca gerekir.",
          "Kesin izotopturlar.",
          "Kesin aynı elementtirler.",
          "Kesin nötrdürler.",
          "Dizilim farkı 18 elektron taşımalarını olanaksız yapar.",
        ],
        steps: [
          "Verilen tek kesin niceliği e₁=e₂=18 olarak yaz.",
          "İzoelektronik tanımında aynı dizilim koşulunu da ara.",
          "Z, q, A ve durum verileri bulunmadığı için kesinliği yalnız e eşitliğinde tut.",
        ],
        reasons: [
          "Sayı eşitliği doğrudur; bu rehberin izoelektronik tanımı için dizilim de eşit olmalıdır.",
          "İzotopluk Z eşitliği ve n farkı ister; bu bilgiler yoktur.",
          "Aynı elektron sayısı farklı Z ve yüklerle oluşabilir.",
          "Nötrlük için Z=18 gerekir; proton sayısı verilmemiştir.",
          "Farklı enerji dağılımları aynı toplam elektronu taşıyabilir.",
        ],
        explanation:
          "Verilen tek kesin niceliği e₁=e₂=18 olarak yaz. İzoelektronik tanımında aynı dizilim koşulunu da ara. Z, q, A ve durum verileri bulunmadığı için kesinliği yalnız e eşitliğinde tut. Sayı eşitliği doğrudur; bu rehberin izoelektronik tanımı için dizilim de eşit olmalıdır.",
        knowledge:
          "Bir toplam sayı, elektronların bütün enerji dağılımını tek başına belirtmez.",
        error: "İzotopluk Z eşitliği ve n farkı ister; bu bilgiler yoktur.",
        check: "Koşulu olmayan “kesin” sonucunu sınırlı veriyle üretme.",
      },
      {
        prompt:
          "Aynı²⁰Ne çekirdeğini taşıyan iki nötr atom için dağılımlar 2,8 ve 2,7,1 olarak veriliyor. Hangisi doğrudur?",
        options: [
          "Çekirdekleri aynı, verilmiş dizilimleri farklıdır.",
          "Farklı izotoplardır.",
          "İzotondurlar; Z farklıdır.",
          "İzobardırlar; Z farklıdır.",
          "Dağılımlar farklı olduğundan net yükler kesin farklıdır.",
        ],
        steps: [
          "İki atomda daZ=10, A=20 olduğundan n=10’dur.",
          "Dağılımların toplamlarını 2+8=10 ve 2+7+1=10 hesapla.",
          "Aynı e sayısı ve farklı dağılımı, nötr çekirdek bilgisiyle birlikte değerlendir.",
        ],
        reasons: [
          "Aynı çekirdek ve aynı e sayısı vardır; elektronik durumlar farklıdır.",
          "Aynı Z ve A olduğundan n farkı yok; farklı izotop değiller.",
          "Z iki atomda da 10; izotonun farklı Z koşulu sağlanmaz.",
          "A eşit olsa da Z farklı olmadığı için farklı element izobarları değiller.",
          "İkisi de 10 proton ve 10 elektronla nötrdür; uyarılma yükü değiştirmez.",
        ],
        explanation:
          "İki atomda daZ=10, A=20 olduğundan n=10’dur. Dağılımların toplamlarını 2+8=10 ve 2+7+1=10 hesapla. Aynı e sayısı ve farklı dağılımı, nötr çekirdek bilgisiyle birlikte değerlendir. Aynı çekirdek ve aynı e sayısı vardır; elektronik durumlar farklıdır.",
        knowledge:
          "Uyarılma elektron dağılımını değiştirebilir; çekirdek veya toplam e değişmek zorunda değildir.",
        error: "Aynı Z ve A olduğundan n farkı yok; farklı izotop değiller.",
        check: "İki toplam da 10 ve q=10−10=0.",
      },
      {
        prompt:
          "Yalnız yaklaşık kütleleri 6 ve 7 u alınan iki Li izotopunda atom sayıları hafif: ağır=3: 1’dir. Ortalama kaçu olur?",
        options: ["6,25", "6,50", "6,75", "13,00", "4,75"],
        steps: [
          "Dört eş payın üçünün hafif izotop olduğunu belirle: f₆=3/4.",
          "Toplam kütleyi 3×6+1×7=25 u olarak kur.",
          "Dört atoma bölerek ortalamayı 25/4 hesapla.",
        ],
        reasons: [
          "25/4=6,25 u; hafif izotopun %75 bolluğu kullanılmıştır.",
          "6,50, eşit atom sayılarının basit ortalamasıdır; 3: 1’i atlar.",
          "6,75,3: 1 oranını ağır izotop lehine ters uygular.",
          "13,00, iki izotopun kütlelerini toplayıp atom sayısına bölmez.",
          "4,75,3×6+1×7 yerine 3×6+1 yapıp dörde böler; ağır atomun 7 u kütlesini 1 sayar.",
        ],
        explanation:
          "Dört eş payın üçünün hafif izotop olduğunu belirle: f₆=3/4. Toplam kütleyi 3×6+1×7=25 u olarak kur. Dört atoma bölerek ortalamayı 25/4 hesapla. 25/4=6,25 u; hafif izotopun %75 bolluğu kullanılmıştır.",
        knowledge:
          "Ortalama toplam kütle/toplam atom sayısıdır; bolluk atom adediyle belirlenir.",
        error: "6,50, eşit atom sayılarının basit ortalamasıdır; 3: 1’i atlar.",
        check: "6 ile 7 arasında ve 6’ya daha yakın olmalı.",
      },
      {
        prompt:
          "Yalnız yaklaşık 35 ve 37 u kütleli iki izotoptan oluşan hazırlanmış örneğin ortalaması 35,80 u’dur. Hafif izotopun atom bolluğu nedir?",
        options: ["%60", "%40", "%50", "%80", "%20"],
        steps: [
          "Hafif atom kesrine x de; 35 x+37(1−x)=35,80 yaz.",
          "37−2 x=35,80 eşitliğinde 2 x=1,20 bulunur.",
          "x=0,60 sonucunu yüzdeye çevir.",
        ],
        reasons: [
          "%60 hafif ve %40 ağır için 21+14,80=35,80 u olur.",
          "%40 ağır izotopun bolluğudur; istenen hafiftir.",
          "%50,36 u orta noktasını verir; 35,80 değildir.",
          "%80 hafiflik 35,40 u verir; ortalama 35,80 olmaz.",
          "%20 hafiflik 36,60 u verir; ortalama ağır tarafa kayar.",
        ],
        explanation:
          "Hafif atom kesrine x de; 35 x+37(1−x)=35,80 yaz. 37−2 x=35,80 eşitliğinde 2 x=1,20 bulunur. x=0,60 sonucunu yüzdeye çevir. %60 hafif ve %40 ağır için 21+14,80=35,80 u olur.",
        knowledge: "İki izotopta f₁+f₂=1 ve ortalama ağırlıklı toplamdır.",
        error: "%40 ağır izotopun bolluğudur; istenen hafiftir.",
        check: "35×0,60+37×0,40=35,80.",
      },
      {
        prompt:
          "Bir örnekte yaklaşık kütleleri 20,21,22 u alınan üç izotopun atom sayıları sırasıyla 2: 5: 3’tür. Ortalama kütle kaçu’dur?",
        options: ["21,1", "21,0", "21,3", "63,0", "211,0"],
        steps: [
          "Toplam pay 2+5+3=10’dur; üç izotopu eşit sayma.",
          "Kütle katkıları 2×20=40,5×21=105,3×22=66 u olur.",
          "Toplam 211 u’yu 10 atom payına böl.",
        ],
        reasons: [
          "211/10=21,1 u; her kütle kendi atom payıyla ağırlıklandırılmıştır.",
          "21,0, üç izotopun eşit bolluklu basit ortalamasıdır.",
          "21,3, iki hafif atoma 20 yerine 21 u yazılmasıyla(2×21+5×21+3×22)/10=21,3 çıkar; hafif kütle yanlış kullanılmıştır.",
          "63,0, yalnız 20+21+22 toplamıdır; bolluklar ve ortalama bölmesi yoktur.",
          "211,0, toplam kütle katkısıdır; 10 atom payına bölünmemiştir.",
        ],
        explanation:
          "Toplam pay 2+5+3=10’dur; üç izotopu eşit sayma. Kütle katkıları 2×20=40,5×21=105,3×22=66 u olur. Toplam 211 u’yu 10 atom payına böl. 211/10=21,1 u; her kütle kendi atom payıyla ağırlıklandırılmıştır.",
        knowledge:
          "Üç izotopta da bütün atom bollukları birlikte normalleştirilir.",
        error: "21,0, üç izotopun eşit bolluklu basit ortalamasıdır.",
        check: "Sonuç 20–22 aralığında olmalı; paylar toplamı 10.",
      },
      {
        prompt:
          "Yalnız kütleleri 10 ve 11 u kabul edilen iki izotoplu modelde hangi ortalama pozitif atom bolluklarıyla olanaksızdır?",
        options: ["11,2 u", "10,2 u", "10,5 u", "10,8 u", "10,01 u"],
        steps: [
          "Pozitif ağırlıklarla ortalamanın iki uç arasında kaldığını kullan.",
          "Alt sınır 10 u, üst sınır 11 u’dur.",
          "Her seçeneği bu aralıkla karşılaştır; 11,2 u üst sınırı aşar.",
        ],
        reasons: [
          "11,2 u,11 u’dan büyüktür; iki izotopun pozitif ağırlıklarıyla oluşamaz.",
          "10,2 u için hafif %80, ağır %20 uygundur.",
          "10,5 u eşit atom sayılarıyla sağlanır.",
          "10,8 u için hafif %20, ağır %80 uygundur.",
          "10,01 u için hafif %99, ağır %1 uygundur.",
        ],
        explanation:
          "Pozitif ağırlıklarla ortalamanın iki uç arasında kaldığını kullan. Alt sınır 10 u, üst sınır 11 u’dur. Her seçeneği bu aralıkla karşılaştır; 11,2 u üst sınırı aşar. 11,2 u,11 u’dan büyüktür; iki izotopun pozitif ağırlıklarıyla oluşamaz.",
        knowledge:
          "İki uç arasında ağırlıklı ortalama kurulabilir; uç dışı değer negatif bolluk gerektirir.",
        error: "10,2 u için hafif %80, ağır %20 uygundur.",
        check: "Ortalama, bileşen kütlelerinin maksimumunu aşamaz.",
      },
      {
        prompt:
          "Yaklaşık 40,42,44 u’luk üç izotop içeren bir örnekte ortalama 42 u’dur. Başka bolluk bilgisi verilmemiştir. Hangisi doğrudur?",
        options: [
          "Üç bolluk tek tek belirlenemez.",
          "Her izotop kesin %33⅓’tür.",
          "42 u izotopu kesin %100’dür.",
          "40 u izotopu bulunamaz.",
          "44 u izotopu kesin %50’dir.",
        ],
        steps: [
          "Toplam bolluk ve ortalama iki denklem, üç bilinmeyen verir.",
          "Örneğin %25,%50,%25 ortalaması 42 u eder.",
          "Ayrıca %10,%80,%10 da 42 u verir; iki farklı dağılımla tekilliğin bozulduğunu göster.",
        ],
        reasons: [
          "Aynı ortalamayı sağlayan birden çok pozitif bolluk üçlüsü vardır.",
          "Eşit bolluk bir olasılıktır; verilenlerden zorunlu çıkmaz.",
          "%100 olsaydı diğer iki izotop bulunmazdı; üç izotop içerme koşuluyla da bağdaşmaz.",
          "%25 hafif,%50 orta,%25 ağır örneğinde 40 u izotopu vardır.",
          "%50 ağır zorunlu değildir; %25 ağır da koşulları sağlar.",
        ],
        explanation:
          "Toplam bolluk ve ortalama iki denklem, üç bilinmeyen verir. Örneğin %25,%50,%25 ortalaması 42 u eder. Ayrıca %10,%80,%10 da 42 u verir; iki farklı dağılımla tekilliğin bozulduğunu göster. Aynı ortalamayı sağlayan birden çok pozitif bolluk üçlüsü vardır.",
        knowledge:
          "Üç izotopta ortalama ve toplam, bütün bollukları genellikle tekilleştirmez.",
        error: "Eşit bolluk bir olasılıktır; verilenlerden zorunlu çıkmaz.",
        check: "Karşı örneklerde hem ortalama 42 hem toplam %100 korunur.",
      },
      {
        prompt:
          "Aynı elementin nötr ve aynı elektronik durumdaki iki izotopu için hangi kapsamlı ifade en uygundur?",
        options: [
          "Elektronik yapıları aynı; TYT’de kimyasal davranışları benzer kabul edilir.",
          "Bütün fiziksel ve nükleer özellikleri zorunlu aynıdır.",
          "Nötron farkı farklı element olmalarını gerektirir.",
          "Gerçekte hiçbir süreçte izotop etkisi olamaz.",
          "Birinin radyoaktif olması diğerini de zorunlu radyoaktif yapar.",
        ],
        steps: [
          "Aynı element koşulundan Z eşitliğini, nötrlükten e eşitliğini kur.",
          "Aynı elektronik durum bilgisiyle elektronik yapı benzerliğini ilişkilendir.",
          "Kütle ve çekirdek farklarından bütün özelliklerin mutlak eşitliğini çıkarma.",
        ],
        reasons: [
          "Verilmiş nötrlük ve elektronik durum kapsamında okul düzeyindeki benzerlik doğru sınırlanmıştır.",
          "Nötron ve kütle farkı fiziksel/nükleer davranışları farklılaştırabilir.",
          "Element kimliğini nötron değil proton sayısı belirler.",
          "İzotop etkilerini evrensel olarak yok saymak okul yaklaşımını aşırı geneller.",
          "Farklı izotopların kararlılıkları farklı olabilir; radyoaktivite elementin tümüne zorunlu yayılmaz.",
        ],
        explanation:
          "Aynı element koşulundan Z eşitliğini, nötrlükten e eşitliğini kur. Aynı elektronik durum bilgisiyle elektronik yapı benzerliğini ilişkilendir. Kütle ve çekirdek farklarından bütün özelliklerin mutlak eşitliğini çıkarma. Verilmiş nötrlük ve elektronik durum kapsamında okul düzeyindeki benzerlik doğru sınırlanmıştır.",
        knowledge:
          "İzotop kimyası yorumunda nötrlük ve elektronik durum koşulları korunur.",
        error:
          "Nötron ve kütle farkı fiziksel/nükleer davranışları farklılaştırabilir.",
        check:
          "“Benzer” ifadesini “her koşulda bütün özellikler özdeş” diye genişletme.",
      },
      {
        prompt:
          "Farklı elementlere ait iki tek atomlu tanecik izoelektroniktir. Hangi sonuç zorunludur?",
        options: [
          "Net yükleri farklıdır.",
          "Nötronları eşittir.",
          "Kütle numaraları eşittir.",
          "İkisi de nötrdür.",
          "Bütün fiziksel özellikleri aynıdır.",
        ],
        steps: [
          "Farklı elementler Z₁≠Z₂ demektir.",
          "İzoelektroniklik e₁=e₂=e sağlar.",
          "q₁−q₂=(Z₁−e)−(Z₂−e)=Z₁−Z₂≠0 yaz.",
        ],
        reasons: [
          "Aynı e’de farklı Z, yüklerin farklı olmasını zorunlu kılar.",
          "Elektron eşitliği A veya n için veri vermez; n eşit olabilir ama zorunlu değildir.",
          "A=Z+n toplamı için nötron bilgisi yoktur; A eşitliği zorunlu değildir.",
          "İkisi nötr olsaydı e₁=Z₁ ve e₂=Z₂ ile Z’ler eşit olurdu; farklı element koşulu bozulur.",
          "Elektron yapısı benzerliği çekirdek yükü ve bütün fiziksel özellikleri eşitlemez.",
        ],
        explanation:
          "Farklı elementler Z₁≠Z₂ demektir. İzoelektroniklik e₁=e₂=e sağlar. q₁−q₂=(Z₁−e)−(Z₂−e)=Z₁−Z₂≠0 yaz. Aynı e’de farklı Z, yüklerin farklı olmasını zorunlu kılar.",
        knowledge:
          "Tek atomlu tanecikte q=Z−e; farklı kimlik aynı e ile farklı yük taşır.",
        error:
          "Elektron eşitliği A veya n için veri vermez; n eşit olabilir ama zorunlu değildir.",
        check: "Z farkını yok edecek bir e farkı yoktur.",
      },
      {
        prompt:
          "50 nötr Ne atomlu hazırlanmış örnekte atomların %40’ı²⁰Ne,%60’ı²²Ne’dir. Z=10. Örnekteki toplam nötron sayısı kaçtır?",
        options: ["560", "550", "600", "1000", "1060"],
        steps: [
          "İzotop atom sayılarını 50×0,40=20 ve 50×0,60=30 hesapla.",
          "Bir²⁰Ne atomunda 10, bir²²Ne atomunda 12 nötron vardır.",
          "Toplamı 20×10+30×12 olarak kur.",
        ],
        reasons: [
          "200+360=560 nötron; her çekirdek tam sayı nötron taşır.",
          "550, eşit izotop bolluklu ortalama 11’i kullanır; %40/%60’ı atlar.",
          "600, bütün 50 atomu 12 nötronlu²²Ne sayar.",
          "1000,50×20 ile hafif izotopun A’sını nötron sayısı sanır.",
          "1060, toplam nükleon sayısıdır; toplam 500 proton çıkarılmalıdır.",
        ],
        explanation:
          "İzotop atom sayılarını 50×0,40=20 ve 50×0,60=30 hesapla. Bir²⁰Ne atomunda 10, bir²²Ne atomunda 12 nötron vardır. Toplamı 20×10+30×12 olarak kur. 200+360=560 nötron; her çekirdek tam sayı nötron taşır.",
        knowledge:
          "Bolluk önce atom adedini, izotopun A−Z değeri sonra nötron katkısını belirler.",
        error:
          "550, eşit izotop bolluklu ortalama 11’i kullanır; %40/%60’ı atlar.",
        check: "Toplam nükleon 20×20+30×22=1060; 1060−50×10=560.",
      },
      {
        prompt:
          "Yalnız yaklaşık 50 ve 54 u kütleli iki izotop içeren örnekte hafif izotopun atom bolluğu %70’ten %45’e düşüyor. Ortalama kütlenin değişimi kaçu’dur?",
        options: ["+1,00", "−1,00", "+0,25", "+4,00", "0,00"],
        steps: [
          "Hafif kesir 0,25 azalırken ağır kesir 0,25 artar.",
          "Her aktarılan atom payının kütle farkı 54−50=4 u’dur.",
          "Ortalama değişimini 0,25×4 ile hesapla; ya da 51,20 ve 52,20 ortalamalarını çıkar.",
        ],
        reasons: [
          "Ortalama 1 u artar; ağır izotopun payı artmıştır.",
          "−1 u işareti ters alır; hafif pay azalınca ortalama ağır tarafa kayar.",
          "0,25 yalnız bolluk kesri değişimidir; 4 u kütle farkıyla çarpılmamıştır.",
          "4 u, bütün örneğin hafiften ağıra dönüşmesi olur; pay değişimi yalnız %25’tir.",
          "0 u, bolluk değişiminin ağırlıklı ortalamaya etkisini yok sayar.",
        ],
        explanation:
          "Hafif kesir 0,25 azalırken ağır kesir 0,25 artar. Her aktarılan atom payının kütle farkı 54−50=4 u’dur. Ortalama değişimini 0,25×4 ile hesapla; ya da 51,20 ve 52,20 ortalamalarını çıkar. Ortalama 1 u artar; ağır izotopun payı artmıştır.",
        knowledge:
          "İki izotopta ortalama değişimi, aktarılan atom kesri×kütle farkıdır.",
        error:
          "−1 u işareti ters alır; hafif pay azalınca ortalama ağır tarafa kayar.",
        check: "50×0,70+54×0,30=51,20; 50×0,45+54×0,55=52,20.",
      },
      {
        prompt:
          "Temel hâlde U: (Z=11, A=23, q=+1) ve V: (Z=12, A=24, q=+2) için elektron dağılımları 2,8 veriliyor. Hangi iki ilişki birlikte sağlanır?",
        options: [
          "İzoton ve izoelektronik",
          "İzotop ve izobar",
          "İzobar ve izoelektronik",
          "Aynı çekirdek ve aynı yük",
          "İzotop ve izoelektronik",
        ],
        steps: [
          "nU=23−11=12, nV=24−12=12 hesapla.",
          "eU=11−1=10, eV=12−2=10 bul.",
          "Aynı n/farklı Z ile izoton; aynı e/verilen aynı dağılımla izoelektronik sonucunu birleştir.",
        ],
        reasons: [
          "İki bağımsız koşul sağlanır: n 12 eşit, e 10 ve 2,8 dağılımı eşit.",
          "Z11/12 ve A23/24 farklıdır; ne izotop ne izobar koşulu vardır.",
          "Elektronik ilişki doğru fakat A23 ve 24 eşit değildir.",
          "Çekirdeklerin Z’leri, yüklerin+1/+2 değerleri farklıdır.",
          "Z farklı olduğundan izotop değiller; elektron eşitliği bunu değiştirmez.",
        ],
        explanation:
          "nU=23−11=12, nV=24−12=12 hesapla. eU=11−1=10, eV=12−2=10 bul. Aynı n/farklı Z ile izoton; aynı e/verilen aynı dağılımla izoelektronik sonucunu birleştir. İki bağımsız koşul sağlanır: n 12 eşit, e 10 ve 2,8 dağılımı eşit.",
        knowledge:
          "Elektronik ilişki ile bir çekirdek ilişkisi aynı çiftte birlikte bulunabilir.",
        error: "Z11/12 ve A23/24 farklıdır; ne izotop ne izobar koşulu vardır.",
        check: "Her iki iyon için P−E verilen pozitif yüke eşit olmalı.",
      },
      {
        prompt:
          "İki tek atomlu tanecik için hem A₁=A₂ hem n₁=n₂ verilmiştir. Elektron ve yük bilgisi yoktur. Hangi sonuç zorunludur?",
        options: [
          "Z₁=Z₂; aynı çekirdek türüdürler.",
          "Farklı elementlerin izobarlarıdırlar.",
          "Farklı nötronlu izotoplardırlar.",
          "Net yükleri kesin aynıdır.",
          "Elektron dizilimleri kesin aynıdır.",
        ],
        steps: [
          "Z=A−n eşitliğini iki tanecik için ayrı yaz.",
          "A ve n eşit olunca farklarının da eşit olduğunu göster.",
          "Aynı çekirdekten elektronik eşitlik çıkarma; yük verisi hâlâ yoktur.",
        ],
        reasons: [
          "Z=A−n iki satırda eşittir; Z ve n aynı olduğundan aynı çekirdek türü bulunur.",
          "İzobar adı için farklı Z gerekir; burada Z eşitliği zorunludur.",
          "Nötronların eşit olduğu açıkça verilmiş; farklı izotop koşulu yoktur.",
          "Aynı çekirdek farklı elektron sayılı iyonlar oluşturabilir; yük bilinmiyor.",
          "Dizilim için elektron sayısı ve durum bilgisi gerekir; çekirdek verisi yetmez.",
        ],
        explanation:
          "Z=A−n eşitliğini iki tanecik için ayrı yaz. A ve n eşit olunca farklarının da eşit olduğunu göster. Aynı çekirdekten elektronik eşitlik çıkarma; yük verisi hâlâ yoktur. Z=A−n iki satırda eşittir; Z ve n aynı olduğundan aynı çekirdek türü bulunur.",
        knowledge:
          "A, Z, n’den ikisinin eşitliği üçüncünün eşitliğini belirler.",
        error:
          "İzobar adı için farklı Z gerekir; burada Z eşitliği zorunludur.",
        check: "Aynı çekirdek türü ile aynı elektronik durumu ayrı tut.",
      },
    ],
  },
];

function shuffle026<T>(input: readonly T[], seed: number): T[] {
  const a = [...input];
  let state = seed >>> 0;
  for (let i = a.length - 1; i > 0; i--) {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    const j = state % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function remap026(c: Card026, target: number, seed: number) {
  const wrong = shuffle026([1, 2, 3, 4], seed),
    order: number[] = [];
  for (let i = 0; i < 5; i++) order.push(i === target ? 0 : wrong.shift()!);
  return {
    options: order.map((i) => c.options[i]),
    reasons: order.map((i) => c.reasons[i]),
    answer: target,
  };
}
export const forge026ChemistryLegacyIds = packs026.map((p) => p.id);
export const forge026ChemistryGuides: LessonGuide[] = packs026.map((p) => ({
  id: p.id,
  minutes: p.minutes,
  objectives: p.objectives,
  sections: p.sections,
  examples: p.examples,
  recall: p.recall,
  source: source026,
}));
export const forge026ChemistryTopics: Record<string, string> =
  Object.fromEntries(
    packs026.flatMap((p) => [
      [p.id, p.topic],
      [p.id + "-ileri", p.topic],
    ]),
  );
const authoredStrategies026: Record<string, string> = {
  "f026c-atomun-temel-tanecikleri-1":
    "Sol alt atom numarası, üst kütle numarası ve işaretli yük için üç ayrı sütun kur; önce çekirdeği, ardından bu çekirdeğe göre elektron sayısını tamamla.",
  "f026c-atomun-temel-tanecikleri-2":
    "Elektron ve pozitif yük bilgisinden önce proton sayısını geri bul; sonra verilen kütle numarasından çekirdeğin kalan bölümünü çıkar.",
  "f026c-atomun-temel-tanecikleri-3":
    "Çekirdek toplamıyla bütün tanecik toplamının farkını kullanarak elektronu ayır; bulunan sayıyı yük denkleminde kullanıp atom numarasına ulaş.",
  "f026c-atomun-temel-tanecikleri-4":
    "Önce başlangıç iyonunun elektron sayısını kur; verilen elektronları bu sayıdan düşürüp son yükü aynı proton sayısıyla yeniden denetle.",
  "f026c-atomun-temel-tanecikleri-5":
    "Başlangıç ve son durumları aynı çekirdek etrafında iki sütuna yaz; istenen üç değişimi son eksi ilk biçiminde ayrı hesapla.",
  "f026c-atomun-temel-tanecikleri-6":
    "Elektrik yükü taşıyan taneciklerin adedini sayarken işaret kullanma; net yük için aynı iki katkıyı işaretleriyle toplayarak ikinci hesabı yap.",
  "f026c-atomun-temel-tanecikleri-7":
    "Nötrlüğün verdiği eşitlikle kütle numarasının verdiği toplamı birlikte yaz; belirlenen bir toplam ile tek tek bilinmeyen sayıları ayır.",
  "f026c-atomun-temel-tanecikleri-8":
    "Her seçenek için proton, nötron ve elektron sayılarını kurmaya çalış; sayımda negatif adet üreten veriyi, çekirdek kararlılığı gibi verilmemiş koşullara başvurmadan ele.",
  "f026c-atomun-temel-tanecikleri-9":
    "Nötron/proton oranını ortak bir tam sayı katıyla göster; kütle numarasını bu ortak kata bağlayıp ardından iyonun elektron hesabına geç.",
  "f026c-atomun-temel-tanecikleri-10":
    "Önce yatay ve düşey eksenin hangi taneciği saydığını koordinat tablosuna aktar; yükün işaretini bu iki sayının farkıyla belirleyip adlandır.",
  "f026c-atomun-temel-tanecikleri-11":
    "Kesin çekirdek verilerini ve yalnız elektron sayısındaki değişimi ayrı kaydet; başlangıç elektronu verilmediğinde mutlak son sayı yerine hangi değişimin bilinebileceğini sına.",
  "f026c-atomun-temel-tanecikleri-12":
    "Oksijen ve hidrojen çekirdeklerini kendi izotop verileriyle ayrı çöz; nötronları topla, elektronlar için bütün iyonun toplam protonuna tek yük düzeltmesi uygula.",
  "f026c-atomun-temel-tanecikleri-13":
    "Formüldeki atom adetlerini proton toplamında çarpan olarak kullan; bütün çok atomlu iyonun yükünü toplam çekirdek yüküne yalnız bir kez uygula.",
  "f026c-atomun-temel-tanecikleri-14":
    "Önce bir oksit iyonunda proton ve elektronu say; özdeş iyon adedini her iki toplamda da uygula, tek iyon yükünü bütün örneğin yüküyle karıştırma.",
  "f026c-atomun-temel-tanecikleri-15":
    "Başlangıç ve son çekirdeği p,n sütunlarında karşılaştır; değişen çekirdek adedinin kütle numarasına etkisini sabit proton ve elektron verileriyle birlikte izle.",
  "f026c-atomun-temel-tanecikleri-16":
    "Verilen helyum izotopunu doğrudan p,n,e tablosuna dönüştür; proton–nötron karşılaştırmasını element adına dayalı genel bir kuralla değil bu çekirdekle yap.",
  "f026c-atomun-temel-tanecikleri-17":
    "Öğrencinin kütle numarası ve yük iddialarını birbirinden bağımsız denetle; birindeki yanlışın öteki hesabı da zorunlu yanlış yapmadığını kontrol et.",
  "f026c-atomun-temel-tanecikleri-18":
    "Çekirdek değişmediği için yalnız elektron artışını izle; ilk yük ile son yük arasındaki farkı bu değişimin ters işaretiyle kur.",
  "f026c-atomun-temel-tanecikleri-19":
    "Proton–elektron toplamından elektronu, kütle numarasından nötronu ayrı ayır; son olarak bulunan elektronla yükü hesaplayıp istenen sıraya diz.",
  "f026c-atomun-temel-tanecikleri-20":
    "Moleküldeki her atom türünün p,n katkısını atom adediyle çarp; nötr molekülün elektron toplamını kurduktan sonra bütün tanecik türlerini birleştir.",
  "f026c-atomun-temel-tanecikleri-21":
    "Kimyasal olayın hangi tanecik grubuyla gerçekleştiğini belirle; çekirdekten tanımlanan nicelikleri ve elektron sayısına bağlı nicelikleri iki grupta karşılaştır.",
  "f026c-atomun-temel-tanecikleri-22":
    "Tablonun nötron ve elektron sütunlarını iki ayrı bağıntıyla denetle; negatif yükün elektron hesabındaki işaretini özellikle kontrol ederek yalnız hatalı alanı düzelt.",
  "f026c-atomun-temel-tanecikleri-23":
    "İki iyon için ortak proton sayısını aynı sembolle yaz; elektron sayıları farkını alırken bu ortak bilinmeyenin nasıl sadeleştiğini göster.",
  "f026c-atomun-temel-tanecikleri-24":
    "Toplam tanecik sayısından çekirdek toplamını çıkararak iyonun elektronunu bul; aynı çekirdeğin proton sayısıyla bu elektronu yük denkleminde karşılaştır.",
  "f026c-atomun-temel-tanecikleri-25":
    "Kaynağın kullandığı hesap yaklaşımıyla taneciğin fiziksel özelliğini ayrı oku; çok küçük katkıyı hesaptan çıkarmanın tam yokluk iddiasına dönüşüp dönüşmediğini sına.",
  "f026c-izotop-izoton-izobar-1":
    "İki taneciğin çekirdek tablosunu önce Z ve n ile tamamla; çekirdek ilişkisini belirledikten sonra farklı iyon yüklerinin elektron hesabını ayrı yap.",
  "f026c-izotop-izoton-izobar-2":
    "Her nötr atomun nötronunu kendi A ve Z değerinden bul; eşit çıkan niceliği farklı kalan çekirdek kimlikleriyle birlikte sınıflandır.",
  "f026c-izotop-izoton-izobar-3":
    "Ortak kütle numarasını ve iki farklı atom numarasını tabloya geçir; nötronları hesaplayıp çekirdek ilişkisini yük bilgisi gerektiren çıkarımlardan ayır.",
  "f026c-izotop-izoton-izobar-4":
    "Atomla iyonun Z ve A değerlerini önce karşılaştır; çekirdeğin değişmesiyle yalnız elektron durumunun değişmesini iki ayrı sınıflama ölçütü olarak kullan.",
  "f026c-izotop-izoton-izobar-5":
    "İki yükü proton sayılarına uygulayarak verilen elektron dağılımlarını doğrula; elektronik eşleşmeyi nötron veya kütle numarası eşitliğiyle karıştırmadan sına.",
  "f026c-izotop-izoton-izobar-6":
    "İzotop ve izobar tanımlarındaki eşitlik ve farklılık koşullarını aynı iki çekirdek için yan yana yaz; birlikte kabulün hangi sayılarda çelişki oluşturduğunu ara.",
  "f026c-izotop-izoton-izobar-7":
    "Kütle numarası farkını proton farkı ve nötron farkının toplamı olarak yaz; izotonluk koşulunu yalnız ilgili fark terimine uygula.",
  "f026c-izotop-izoton-izobar-8":
    "İzobar iki çekirdeğin kütle numarası farkını sabitle; protondaki artışın nötron farkıyla nasıl dengelenmesi gerektiğini işaretli fark denklemiyle çöz.",
  "f026c-izotop-izoton-izobar-9":
    "İzotopların ortak protonunu ve verilen nötron artışını kütle numarasına taşı; yük verilmeyen elektron sayıları hakkında ek eşitlik varsayma.",
  "f026c-izotop-izoton-izobar-10":
    "İzoelektronik bilgiyi ikinci iyonun elektron sayısına aktar; o iyonun kendi yükünden protonunu, ardından ortak kütle numarasından nötronunu geri bul.",
  "f026c-izotop-izoton-izobar-11":
    "Grafikteki üç noktayı Z,n tablosu olarak oku; aynı nötron satırlarını ve aynı A toplamını veren çiftleri ayrı arayıp istenen sırada birleştir.",
  "f026c-izotop-izoton-izobar-12":
    "Koordinatları eksen adlarına göre e,n sütunlarına yerleştir; bu iki sütunun doğrudan kanıtladıklarıyla verilmemiş Z ve elektronik durum iddialarını ayır.",
  "f026c-izotop-izoton-izobar-13":
    "Kesin verilmiş elektron eşitliğini kaydet; elektron dizilimi veya çekirdek kimliği gerektiren daha güçlü ilişki için hangi bilginin eksik kaldığını denetle.",
  "f026c-izotop-izoton-izobar-14":
    "İki dağılımdaki toplam elektronu say ve sabit çekirdek verileriyle karşılaştır; aynı tanecik sayısıyla aynı elektronik yerleşimin farklı koşullar olduğunu sına.",
  "f026c-izotop-izoton-izobar-15":
    "Atom adedi oranını toplam atom içindeki paylara dönüştür; kütleleri bu paylarla ağırlıklandırıp toplamın iki izotop arasında kalmasını denetle.",
  "f026c-izotop-izoton-izobar-16":
    "Hafif izotopun atom payını bilinmeyen seçip ağır payı toplamı tamamlayacak biçimde yaz; ölçülen ortalamayı sağlayan denklemi çöz ve pay sınırlarını kontrol et.",
  "f026c-izotop-izoton-izobar-17":
    "Üç izotopun atom oranlarını ortak toplamla normalize et; her kütleyi kendi ağırlığıyla çarpıp üçünün katkısını aynı ortalamada birleştir.",
  "f026c-izotop-izoton-izobar-18":
    "Pozitif atom paylarının kurduğu ağırlıklı ortalama için uç sınırları belirle; seçenekleri hesap uydurmadan bu aralıkla karşılaştır.",
  "f026c-izotop-izoton-izobar-19":
    "Üç bolluk için toplam ve ortalama denklemlerini kur; tek çözüm iddiasını sınamak üzere aynı ortalamayı veren farklı pozitif dağılımlar aramayı dene.",
  "f026c-izotop-izoton-izobar-20":
    "Ortak elektronik koşulu ve farklı çekirdek kütlesini ayrı veri olarak kullan; kimyasal benzerlik düzeyindeki ifadeyle bütün fiziksel özelliklerin aynılığı iddiasını ayır.",
  "f026c-izotop-izoton-izobar-21":
    "Farklı proton sayılarıyla ortak elektron sayısını aynı yük denklemlerine yerleştir; iki yükün birlikte hangi eşitlikleri sağlayıp sağlayamayacağını sına.",
  "f026c-izotop-izoton-izobar-22":
    "Yüzdelerden her izotopun atom adedini bul; tek atomun nötron sayısını kendi grubundaki atom adediyle çarpıp örnek toplamını kur.",
  "f026c-izotop-izoton-izobar-23":
    "Bir izotoptan ötekine aktarılan atom payını belirle; ortalama değişimini bütün ortalamaları ayrı hesaplayarak veya aktarılan pay ile kütle farkını çarparak denetle.",
  "f026c-izotop-izoton-izobar-24":
    "İki çekirdek için nötron eşleşmesini ve iki iyon için elektron/dizilim eşleşmesini ayrı doğrula; iki ilişkiyi aynı seçenek üzerinde birlikte ara.",
  "f026c-izotop-izoton-izobar-25":
    "Her tanecikte atom numarasını A ve n cinsinden yalnız bırak; verilen iki eşitliğin çekirdek kimliğine etkisini yük ve elektron hakkındaki bilinmeyenden ayır.",
};
export const forge026ChemistryLessons: Lesson[] = packs026.map((p, group) => {
  const targets = shuffle026(
    Array.from({ length: p.items.length }, (_, i) => i % 5),
    24731 + group * 1171,
  );
  return {
    id: p.id + "-ileri",
    subjectId: "tyt-kimya",
    title: txt(p.title),
    minutes: 25,
    objectives: p.objectives.map(txt),
    body: [
      {
        title: txt("Özgün ileri soru seti"),
        text: txt(
          "Bu set, temel anlatımdan sonra bağımsız uygulama içindir. Her soru kendi verilerini ve gereken koşulları içerir; etkinliğin o anki ayarlarına dayanmaz. Çözümde önce verilen ve isteneni belirle, sonra çekirdek ve yük toplamlarını denetle.",
        ),
      },
    ],
    source: txt(source026),
    tags: [p.topic, "Özgün öğretim soruları", "ileri-soru-seti"],
    questions: p.items.map((c, i): Question => {
      const r = remap026(c, targets[i], 623 + group * 431 + i * 89);
      return {
        id: `f026c-${p.id}-${i + 1}`,
        prompt: txt(c.prompt),
        options: r.options.map(txt),
        answer: r.answer,
        hint: txt(c.steps[0]),
        explanation: txt(c.explanation),
        skill: p.id,
        guidance: {
          knowledge: [c.knowledge],
          strategy: authoredStrategies026[`f026c-${p.id}-${i + 1}`],
          steps: c.steps,
          optionReasons: r.reasons,
          commonError: c.error,
          check: c.check,
        },
      };
    }),
  };
});
export const forge026ChemistryAdvancedLessons = forge026ChemistryLessons;
