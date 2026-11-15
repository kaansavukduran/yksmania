import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide, GuideSection, WorkedExample } from "./guides/types";

const integer = (x: number) => Number.isFinite(x) && Number.isInteger(x);
const finite = (...xs: number[]) => xs.every(Number.isFinite);
const subshells017 = [
  { name: "1s", n: 1, l: 0 },
  { name: "2s", n: 2, l: 0 },
  { name: "2p", n: 2, l: 1 },
  { name: "3s", n: 3, l: 0 },
  { name: "3p", n: 3, l: 1 },
  { name: "4s", n: 4, l: 0 },
  { name: "3d", n: 3, l: 2 },
  { name: "4p", n: 4, l: 1 },
];
/** First 36 neutral ground states; cations remove highest n before (n−1)d. */
export function configurationB017(z: number, charge: number) {
  if (
    !integer(z) ||
    z < 1 ||
    z > 36 ||
    !integer(charge) ||
    charge < 0 ||
    charge > Math.min(z, 3)
  )
    throw new RangeError("CONFIGURATION_B017");
  let left = z;
  const occupancy = subshells017.map((s) => {
    const count = Math.min(left, 2 * (2 * s.l + 1));
    left -= count;
    return count;
  });
  if (z === 24 || z === 29) {
    occupancy[5]--;
    occupancy[6]++;
  }
  let remove = charge;
  const removalOrder = subshells017
    .map((s, i) => ({ ...s, i }))
    .sort((a, b) => b.n - a.n || b.l - a.l);
  for (const s of removalOrder) {
    const count = Math.min(remove, occupancy[s.i]);
    occupancy[s.i] -= count;
    remove -= count;
  }
  // NIST ASD ground configurations include relaxation beyond simply deleting an ns electron.
  if (charge === 1 && [23, 27, 28].includes(z)) {
    occupancy[5] = 0;
    occupancy[6] = z - 19;
  }
  const shells = [1, 2, 3, 4].map((n) =>
    subshells017.reduce((sum, s, i) => sum + (s.n === n ? occupancy[i] : 0), 0),
  );
  const rows = subshells017.map((s, i) => ({
    ...s,
    count: occupancy[i],
    boxes: Array.from({ length: 2 * s.l + 1 }, (_, k) =>
      occupancy[i] > k + (2 * s.l + 1) ? 2 : occupancy[i] > k ? 1 : 0,
    ),
  }));
  return {
    z,
    charge,
    electrons: z - charge,
    shells,
    rows,
    unpaired: rows.reduce(
      (sum, s) => sum + s.boxes.filter((b) => b === 1).length,
      0,
    ),
    configuration:
      rows
        .filter((s) => s.count)
        .map((s) => `${s.name}${s.count}`)
        .join(" ") || "Elektron yok",
  };
}
export function quantumB017(n: number, l: number, ml: number, ms: number) {
  if (!finite(n, l, ml, ms)) throw new RangeError("QUANTUM_B017_FINITE");
  const reason =
    !integer(n) || n < 1 || n > 4
      ? "Bu gezginde n, 1–4 arasında tam sayı olmalıdır."
      : !integer(l) || l < 0 || l >= n
        ? "l, 0 ile n−1 arasında tam sayı olmalıdır."
        : !integer(ml) || Math.abs(ml) > l
          ? "m_l, −l ile +l arasında tam sayı olmalıdır."
          : Math.abs(ms) !== 0.5
            ? "Elektron için m_s yalnız +1/2 veya −1/2 olabilir."
            : "Dört kuantum sayısı birlikte izinlidir.";
  const valid =
    integer(n) &&
    n >= 1 &&
    n <= 4 &&
    integer(l) &&
    l >= 0 &&
    l < n &&
    integer(ml) &&
    Math.abs(ml) <= l &&
    Math.abs(ms) === 0.5;
  return {
    n,
    l,
    ml,
    ms,
    valid,
    reason,
    orbitals: valid ? 2 * l + 1 : null,
    capacity: valid ? 2 * (2 * l + 1) : null,
    shellCapacity: valid ? 2 * n * n : null,
    radialNodes: valid ? n - l - 1 : null,
    angularNodes: valid ? l : null,
    name: valid ? `${n}${["s", "p", "d", "f"][l]}` : null,
  };
}
/** Absolute associated-Legendre angular amplitude; schematic polar cut, not a radial orbital boundary. */
export function angularB017(l: number, ml: number, theta: number) {
  if (
    !integer(l) ||
    l < 0 ||
    l > 3 ||
    !integer(ml) ||
    Math.abs(ml) > l ||
    !Number.isFinite(theta)
  )
    throw new RangeError("ANGULAR_B017");
  const m = Math.abs(ml),
    x = Math.cos(theta);
  let pmm = 1;
  for (let k = 1; k <= m; k++)
    pmm *= -(2 * k - 1) * Math.sqrt(Math.max(0, 1 - x * x));
  if (l === m) return Math.abs(pmm);
  let prev = pmm,
    current = x * (2 * m + 1) * pmm;
  for (let k = m + 2; k <= l; k++) {
    const next = ((2 * k - 1) * x * current - (k + m - 1) * prev) / (k - m);
    prev = current;
    current = next;
  }
  return Math.abs(current);
}
export const radiusFamiliesB017 = [
  {
    id: "iso",
    name: "Eş elektronlu iyonlar",
    reason:
      "Her iyon 10 elektronludur; Z arttıkça aynı düzen daha güçlü tutulur.",
    species: [
      { name: "O²⁻", z: 8, q: -2, rank: 5 },
      { name: "F⁻", z: 9, q: -1, rank: 4 },
      { name: "Na⁺", z: 11, q: 1, rank: 3 },
      { name: "Mg²⁺", z: 12, q: 2, rank: 2 },
      { name: "Al³⁺", z: 13, q: 3, rank: 1 },
    ],
  },
  {
    id: "period",
    name: "Aynı periyot, nötr atomlar",
    reason:
      "Üçüncü periyotta genel etkin çekim artışı yarıçapın azalmasını destekler.",
    species: [
      { name: "Na", z: 11, q: 0, rank: 3 },
      { name: "Mg", z: 12, q: 0, rank: 2 },
      { name: "Al", z: 13, q: 0, rank: 1 },
    ],
  },
  {
    id: "group",
    name: "Aynı grup, nötr atomlar",
    reason:
      "Grup 1’de aşağı doğru yeni katman ve perdeleme, daha büyük yarıçapı destekler.",
    species: [
      { name: "Li", z: 3, q: 0, rank: 1 },
      { name: "Na", z: 11, q: 0, rank: 2 },
      { name: "K", z: 19, q: 0, rank: 3 },
    ],
  },
] as const;
export function radiusB017(family: string, first: number, second: number) {
  const f = radiusFamiliesB017.find((x) => x.id === family);
  if (
    !f ||
    !integer(first) ||
    !integer(second) ||
    first < 0 ||
    second < 0 ||
    first >= f.species.length ||
    second >= f.species.length
  )
    throw new RangeError("RADIUS_B017");
  const a = f.species[first],
    b = f.species[second];
  return {
    family: f,
    a: { ...a, electrons: a.z - a.q },
    b: { ...b, electrons: b.z - b.q },
    comparison: a.rank === b.rank ? "=" : a.rank > b.rank ? ">" : "<",
    sizeA: 30 + a.rank * 11,
    sizeB: 30 + b.rank * 11,
    condition:
      "Bulut boyları yalnız nitel sırayı gösterir; pm ölçümü veya sert atom sınırı değildir.",
  };
}
export const ionEnergiesB017 = {
  na: { name: "Na", values: [496, 4562, 6910, 9543], outer: 1 },
  mg: { name: "Mg", values: [738, 1451, 7733, 10542], outer: 2 },
  al: { name: "Al", values: [578, 1817, 2745, 11577], outer: 3 },
} as const;
export function ionEnergyB017(element: string, step: number) {
  if (
    !Object.hasOwn(ionEnergiesB017, element) ||
    !integer(step) ||
    step < 1 ||
    step > 4
  )
    throw new RangeError("ION_ENERGY_B017");
  const data = ionEnergiesB017[element as keyof typeof ionEnergiesB017];
  return {
    ...data,
    step,
    beforeCharge: step - 1,
    afterCharge: step,
    energy: data.values[step - 1],
    total: data.values.slice(0, step).reduce((a, b) => a + b, 0),
    core: step > data.outer,
  };
}
export function affinityB017(element: string, convention: string) {
  if (
    !["f", "cl"].includes(element) ||
    !["release", "enthalpy"].includes(convention)
  )
    throw new RangeError("AFFINITY_B017");
  const released = element === "f" ? 328 : 349;
  return {
    name: element === "f" ? "F" : "Cl",
    released,
    deltaH: -released,
    shown: convention === "release" ? released : -released,
    convention,
  };
}
export function bondB017(bond: string) {
  if (!["hcl", "hf"].includes(bond)) throw new RangeError("BOND_B017");
  const right =
    bond === "hf" ? { name: "F", en: 3.98 } : { name: "Cl", en: 3.16 };
  return {
    left: { name: "H", en: 2.2 },
    right,
    difference: right.en - 2.2,
    direction: "Hδ⁺ → " + right.name + "δ⁻",
    condition:
      "Pauling sayıları bağıl ve birimsizdir; δ kısmi yükü gösterir, serbest tam iyonu değil.",
  };
}
export const oxidationKindsB017 = [
  {
    id: "ammonium",
    name: "Amonyum · NH₄⁺",
    formula: "NH₄⁺",
    atom: "N",
    count: 1,
    known: [{ atom: "H", count: 4, value: 1 }],
    charge: 1,
  },
  {
    id: "dichromate",
    name: "Dikromat · Cr₂O₇²⁻",
    formula: "Cr₂O₇²⁻",
    atom: "Cr",
    count: 2,
    known: [{ atom: "O", count: 7, value: -2 }],
    charge: -2,
  },
  {
    id: "peroxide",
    name: "Peroksit · H₂O₂",
    formula: "H₂O₂",
    atom: "O",
    count: 2,
    known: [{ atom: "H", count: 2, value: 1 }],
    charge: 0,
  },
  {
    id: "of2",
    name: "Oksijen diflorür · OF₂",
    formula: "OF₂",
    atom: "O",
    count: 1,
    known: [{ atom: "F", count: 2, value: -1 }],
    charge: 0,
  },
  {
    id: "o2f2",
    name: "Dioksijen diflorür · O₂F₂",
    formula: "O₂F₂",
    atom: "O",
    count: 2,
    known: [{ atom: "F", count: 2, value: -1 }],
    charge: 0,
  },
  {
    id: "permanganate",
    name: "Permanganat · MnO₄⁻",
    formula: "MnO₄⁻",
    atom: "Mn",
    count: 1,
    known: [{ atom: "O", count: 4, value: -2 }],
    charge: -1,
  },
  {
    id: "manganate",
    name: "Manganat · MnO₄²⁻",
    formula: "MnO₄²⁻",
    atom: "Mn",
    count: 1,
    known: [{ atom: "O", count: 4, value: -2 }],
    charge: -2,
  },
  {
    id: "sulfate",
    name: "Sülfat · SO₄²⁻",
    formula: "SO₄²⁻",
    atom: "S",
    count: 1,
    known: [{ atom: "O", count: 4, value: -2 }],
    charge: -2,
  },
  {
    id: "fe3o4",
    name: "Karışık değerlik · Fe₃O₄",
    formula: "Fe₃O₄",
    atom: "Fe",
    count: 3,
    known: [{ atom: "O", count: 4, value: -2 }],
    charge: 0,
  },
  {
    id: "clf3",
    name: "Klor triflorür · ClF₃",
    formula: "ClF₃",
    atom: "Cl",
    count: 1,
    known: [{ atom: "F", count: 3, value: -1 }],
    charge: 0,
  },
  {
    id: "nitrate",
    name: "Nitrat · NO₃⁻",
    formula: "NO₃⁻",
    atom: "N",
    count: 1,
    known: [{ atom: "O", count: 3, value: -2 }],
    charge: -1,
  },
  {
    id: "nitrite",
    name: "Nitrit · NO₂⁻",
    formula: "NO₂⁻",
    atom: "N",
    count: 1,
    known: [{ atom: "O", count: 2, value: -2 }],
    charge: -1,
  },
  {
    id: "hydride",
    name: "Metal hidrürü · NaH",
    formula: "NaH",
    atom: "H",
    count: 1,
    known: [{ atom: "Na", count: 1, value: 1 }],
    charge: 0,
  },
] as const;
export function oxidationB017(kind: string) {
  const data = oxidationKindsB017.find((x) => x.id === kind);
  if (!data) throw new RangeError("OXIDATION_B017");
  const known = data.known.reduce((sum, x) => sum + x.count * x.value, 0),
    totalUnknown = data.charge - known,
    value = totalUnknown / data.count;
  return {
    ...data,
    known,
    totalUnknown,
    value,
    fractional: !Number.isInteger(value),
    total: known + data.count * value,
  };
}
export const gasRB017 = 8.31446261815324;
export function gasB017(
  n: number,
  temperature: number,
  volume: number,
  mass: number,
  area: number,
) {
  if (
    !finite(n, temperature, volume, mass, area) ||
    n < 0 ||
    temperature <= 0 ||
    volume <= 0 ||
    mass <= 0 ||
    area <= 0
  )
    throw new RangeError("GAS_B017");
  const pressurePa = (n * gasRB017 * temperature) / (volume / 1000),
    pressure = pressurePa / 101325;
  const rms =
    n === 0 ? null : Math.sqrt((3 * gasRB017 * temperature) / (mass / 1000));
  const translationEnergy = 1.5 * n * gasRB017 * temperature,
    force = (pressurePa * area) / 10000;
  if (
    !finite(pressurePa, pressure, translationEnergy, force) ||
    (rms !== null && !Number.isFinite(rms))
  )
    throw new RangeError("GAS_B017_OVERFLOW");
  return {
    n,
    temperature,
    volume,
    mass,
    area,
    pressure,
    pressurePa,
    rms,
    translationEnergy,
    force,
  };
}
export type LawB017 = "boyle" | "charles" | "gay" | "avogadro" | "combined";
/** Baseline n=1 mol, T=300 K, V=24.6 L; school R=0.082 gives P=1 atm. */
export function lawB017(
  mode: LawB017,
  temperature: number,
  volume: number,
  moles: number,
) {
  if (
    !["boyle", "charles", "gay", "avogadro", "combined"].includes(mode) ||
    !finite(temperature, volume, moles) ||
    temperature <= 0 ||
    volume <= 0 ||
    moles <= 0
  )
    throw new RangeError("LAW_B017");
  const n = mode === "avogadro" || mode === "combined" ? moles : 1;
  const t =
    mode === "charles" || mode === "gay" || mode === "combined"
      ? temperature
      : 300;
  const v =
    mode === "charles" || mode === "avogadro"
      ? n * 0.082 * t
      : mode === "gay"
        ? 24.6
        : volume;
  const pressure = (n * 0.082 * t) / v;
  const invariant = (pressure / n) * (v / t);
  if (
    !finite(v, pressure, invariant) ||
    v <= 0 ||
    pressure <= 0 ||
    invariant <= 0
  )
    throw new RangeError("LAW_B017_OVERFLOW");
  const xLabel =
    mode === "charles" || mode === "gay"
      ? "T (K)"
      : mode === "avogadro"
        ? "n (mol)"
        : "V (L)";
  const yLabel =
    mode === "charles" || mode === "avogadro" ? "V (L)" : "P (atm)";
  const x =
    mode === "charles" || mode === "gay" ? t : mode === "avogadro" ? n : v;
  const y = yLabel === "V (L)" ? v : pressure;
  return {
    mode,
    n,
    temperature: t,
    volume: v,
    pressure,
    x,
    y,
    xLabel,
    yLabel,
    fixed:
      mode === "boyle"
        ? "n=1 mol ve T=300 K sabit"
        : mode === "charles"
          ? "n=1 mol ve P=1 atm sabit"
          : mode === "gay"
            ? "n=1 mol ve V=24,6 L sabit"
            : mode === "avogadro"
              ? "P=1 atm ve T=300 K sabit"
              : "n, T ve V birlikte değişebilir; P hesaplanır",
    invariant,
  };
}

type RawUnitB017 = {
  id: string;
  topic: string;
  title: string;
  objectives: string[];
  source: string;
  minutes: number;
  strategies: string[];
  sections: [string, string, string][];
  examples: [
    string,
    string,
    [string, string, string],
    string,
    string,
    string,
  ][];
  recall: [string, string][];
  questions: [
    string,
    [string, string, string, string, string],
    string,
    string,
  ][];
};
const dataB017: RawUnitB017[] = [
  {
    id: "ayt-modern-atom-elektron-dizilimi",
    topic: "detail-408",
    title: "Modern atom: orbitallerden iyon dizilimine",
    objectives: [
      "Orbital modelini kesin yörüngeden ayır; olasılık yorumunu kullan.",
      "Aufbau, Pauli ve Hund ilkeleriyle temel hâli denetle.",
      "Cr/Cu istisnalarını ve geçiş metali katyonlarında 4s kaybını açıkla.",
    ],
    source:
      "MEBİ AYT Kimya, atomun kuantum modeli ve elektron dizilimleri; OGM Dersler Cepte, aynı kazanımlar; Aurelia katman dizilimi kağıdıyla TYT–AYT sınır karşılaştırması. Özgün öğretim, şema, çözüm ve sorular.",
    sections: [
      [
        "Yörüngeden olasılık modeline",
        "Bohr modelindeki belirli dairesel yol, çok elektronlu atomun modern açıklaması değildir. Kuantum modeli elektronun durumunu dalga fonksiyonu ve ölçüm olasılıklarıyla betimler. Orbital çizimi, elektronun izlediği ray veya içi katı bir kabuk gibi okunmaz.",
        "Konum ve momentumun birlikte belirlenmesindeki belirsizlik, yalnız kötü mikroskop kullanmamız değildir. Bir orbitalde bulunma olasılığı yoğunluğunu konuşabiliriz; fakat çizimdeki bir noktayı elektronun kesin anlık yeri diye seçemeyiz. Modeli değiştirirken önce bu anlam farkını koru.",
      ],
      [
        "Katman, alt kabuk ve orbital",
        "n ana katmanı, l alt kabuk türünü belirtir. s, p, d ve f alt kabuklarında sırasıyla 1, 3, 5 ve 7 orbital vardır. Bir p alt kabuğu ile tek bir p orbitali aynı büyüklük değildir: alt kabuk üç ayrı durumu birlikte içerir.",
        "Bir orbital en fazla iki elektron taşıdığı için alt kabuk kapasiteleri 2, 6, 10 ve 14 olur. Katman kapasitesi 2n² ise bütün izinli alt kabukların toplamıdır. Bu üst sınır, üçüncü katman tamamen dolmadan dördüncüye geçilemez anlamına gelmez.",
      ],
      [
        "Enerji sırası bir yerleştirme aracıdır",
        "Temel hâl en düşük toplam enerjiyle ilişkilidir. Başlangıç yerleştirme sırası 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p biçiminde kullanılır. n+l toplamı küçük olanın önce gelmesi, eşit toplamda n küçük olanın önce gelmesi yararlı bir doldurma kuralıdır.",
        "Bu şema bütün atom ve iyonlarda değişmeyen bir orbital enerji cetveli değildir. Elektronlar arasındaki etkileşim ve doluluk enerjileri etkiler. Özellikle 4s önce doluyor diye katyon oluşurken 3d elektronlarının mutlaka önce ayrılacağını söylemek yanlış olur.",
      ],
      [
        "Pauli: aynı orbitalde zıt spin",
        "Aynı atomda iki elektronun dört kuantum sayısı bütünüyle aynı olamaz. Aynı orbitalde n, l ve m_l ortak olduğundan iki elektronun m_s değerleri farklıdır. Kutu şemasındaki ↑↓ bu iki spin durumunu temsil eder.",
        "↑↑ aynı tek kutuda çizildiyse Pauli ihlali vardır; bunu yalnız uyarılmış ama izinli bir hâl diye adlandırma. Spin oku, elektronun küçük bir top gibi saat yönünde döndüğünün resmi değildir. Oklar ölçümde iki farklı spin izdüşümünü ayıran sembollerdir.",
      ],
      [
        "Hund: eş enerjili kutuları önce tekle",
        "Aynı alt kabuğun eş enerjili orbitallerine temel hâlde önce aynı spinli birer elektron yerleşir; sonra eşleşme başlar. Nötr N atomunun 2p³ bölümü üç kutuda ↑, ↑, ↑ biçiminde gösterilebilir. O atomunda 2p⁴ için bir kutu çift, iki kutu tek doludur.",
        "Kutu sırasının soldan sağa seçimi bu şemada gelenektir; fiziksel olarak mutlaka soldaki orbitalin önce dolduğu anlamına gelmez. Pauliye uyan fakat erken eşleşme yapan bir çizim temel hâl Hund düzenini vermez. Önce izinlilik, sonra temel hâl koşulunu denetle.",
      ],
      [
        "Dizilimi sayarak doğrula",
        "Nötr Fe için Z=26 olduğundan 26 elektron yerleştirilir. [Ar] çekirdeği 18 elektrondur; kalan sekiz elektron temel hâlde 3d⁶4s² olarak yazılır. Tam yazım ile soy gaz kısaltması aynı elektron sayısını vermelidir.",
        "Kısaltmadaki [Ar] yeni bir element çekirdeğinin Fe içinde oluştuğunu söylemez; yalnız iç elektron düzeninin 18 elektronluk bölümünü kısaltır. Üst indisleri toplamak, alt kabuk kapasitesini aşmamak ve yükü kontrol etmek birbirinden bağımsız üç yararlı denetimdir.",
      ],
      [
        "Cr ve Cu: doğrulanmış iki istisna",
        "Cr, Z=24 için temel hâl [Ar]3d⁵4s¹; Cu, Z=29 için [Ar]3d¹⁰4s¹ düzenindedir. Basit çapraz doldurma çizgisi Cr için 3d⁴4s², Cu için 3d⁹4s² üretebilir; bu iki sonuç gerçek temel hâl diye kullanılmaz.",
        "Yarı dolu ve tam dolu alt kabukların kararlılığı ders düzeyinde yararlı bir açıklamadır, ancak tüm enerji hesabının tek nedeni değildir. Bu iki örneği her elementin d⁴ veya d⁹ ile asla bitemeyeceği evrensel yasa yapma. Modelin nötr atom kapsamı Z=1–36 ile sınırlıdır.",
      ],
      [
        "Katyonu nötr atomdan kur",
        "Katyonda elektron sayısı Z−q olur; fakat geçiş metali için yalnız bu sayıyı nötr atom gibi yeniden doldurmak yanıltır. Önce nötr temel hâli yaz; sonra en büyük n katmanından elektron çıkar. Fe için 4s elektronları 3d elektronlarından önce ayrılır.",
        "Fe²⁺=[Ar]3d⁶, Fe³⁺=[Ar]3d⁵ olur. İkinci iyon birinciden bir 3d elektronu kaybetmiştir. Cr³⁺ için önce tek 4s, ardından iki 3d elektronu çıkarılır ve [Ar]3d³ kalır. Proton sayısı ve elementin periyodik konumu değişmez. Daha genel katyon temel hâllerinde elektronlar yeniden düzenlenebilir: bu gezgin V⁺ için [Ar]3d⁴, Co⁺ için [Ar]3d⁸, Ni⁺ için [Ar]3d⁹ doğrulanmış ek düzenlerini de kullanır. Nötrden mekanik bir oku silmek bütün elementlerde gerçek son temel hâli tek başına garanti etmez.",
      ],
      [
        "Anyon, uyarılma ve elektron sayısı",
        "Basit ana grup anyonlarında elektron kazanımıyla dolan valans alt kabuğu izlenir: S²⁻ toplam 18 elektronla [Ar] düzenindedir. İyon işareti elektron hesabında parantezle yazılır: 16−(−2)=18. Eş elektronlu olmak aynı çekirdek yüküne sahip olmak değildir.",
        "Uyarılmada elektron sayısı korunurken daha yüksek enerjili izinli bir durum dolabilir. Örneğin bir elektronu 2s yerine 2p bölgesine aktarmak, yükü veya proton sayısını kendiliğinden değiştirmez. Uyarılmayı iyonlaşmayla, Pauli ihlalini izinli uyarılmayla karıştırma.",
      ],
      [
        "Şemayı kullan, sonra anlat",
        "Etkileşimde Z ve pozitif yükü değiştirerek kutu doluluklarını, tek elektronları ve katman toplamını karşılaştır. Çizim bir orbital durum sayımıdır; gerçek yörünge, bağ geometrisi veya tüm atomlar için enerji ölçeği değildir. Her kutudaki okların kaynağını sözle açıklayabilmelisin.",
        "Notu kapatıp Fe³⁺ ile Cu²⁺ dizilimlerini yeniden kur. Önce nötr atom, sonra yüksek n elektronlarının çıkışı, en son toplam kontrolü sırasını izle. Aralıklı tekrarda yalnız aynı son dizilimi tanımak yerine farklı bir yükün neden farklı alt kabuktan elektron aldığına gerekçe üret.",
      ],
    ],
    examples: [
      [
        "Fe³⁺ nasıl oluşur?",
        "Z=26 olan Fe atomunun temel hâli [Ar]3d⁶4s² olarak verilmiştir. Fe³⁺ dizilimini bul.",
        [
          "Nötr atomda [Ar]18+3d⁶+4s²=26 elektron vardır.",
          "Üç elektronun önce ikisi en büyük n=4 katmanındaki 4s’den, üçüncüsü 3d’den çıkar.",
          "[Ar]3d⁵ kalır; 18+5=23 ve Z−q=26−3=23 sağlanır.",
        ],
        "[Ar]3d⁵",
        "Elektron toplamı 23, 4s boş.",
        "23 elektronu nötr V gibi yeniden doldurma.",
      ],
      [
        "Bakırın iki ayrı iyonu",
        "Cu, Z=29 için nötr temel hâl [Ar]3d¹⁰4s¹ verilmiştir. Cu⁺ ve Cu²⁺ dizilimlerini karşılaştır.",
        [
          "İlk kayıp en büyük n=4 olan tek 4s elektronudur.",
          "Cu⁺=[Ar]3d¹⁰ olur; ikinci kayıp artık 3d bölgesindendir.",
          "Cu²⁺=[Ar]3d⁹ olur; toplamlar 28 ve 27 elektrondur.",
        ],
        "Cu⁺: 3d¹⁰; Cu²⁺: 3d⁹",
        "Her basamakta yalnız bir elektron azalır.",
        "Cu²⁺ için nötr Cu istisnasını yeniden uygulama.",
      ],
      [
        "Oksijenin p kutuları",
        "Nötr O, Z=8 için 1s²2s²2p⁴ temel hâlinde eşleşmemiş elektron sayısı kaçtır?",
        [
          "1s ve 2s’deki dört elektron iki dolu kutu oluşturur.",
          "2p’nin üç kutusuna önce üç paralel tek elektron yerleşir; dördüncü bunlardan biriyle zıt spinle eşleşir.",
          "Bir çift ve iki tek p kutusu kaldığından eşleşmemiş elektron sayısı 2’dir.",
        ],
        "2 eşleşmemiş elektron",
        "2+2+4=8; hiçbir kutu ikiden fazla değil.",
        "Dört elektronu iki kutuya erken eşleyip bir kutuyu boş bırakma.",
      ],
      [
        "Katman kapasitesinin sınırı",
        "Ca, Z=20 için temel hâl 1s²2s²2p⁶3s²3p⁶4s² verilmiştir. M katmanı kaç elektron içerir; kapasitesi dolmuş mudur?",
        [
          "M katmanı n=3’tür; yalnız 3s² ve 3p⁶ doludur, 3d boştur.",
          "Doluluk 2+6=8; kuramsal kapasite 2×3²=18 elektrondur.",
          "8 doluluk 18 kapasiteden küçüktür; buna rağmen 4s dolabilir çünkü enerji sırası katman kapasitesi sırası değildir.",
        ],
        "8 elektron; kapasite dolmamış",
        "Toplam 2+8+8+2=20.",
        "2n²’yi zorunlu dolma sırasına çevirme.",
      ],
    ],
    recall: [
      [
        "Bir orbital ile alt kabuk aynı mı?",
        "Hayır; p alt kabuğu üç orbital içerir.",
      ],
      [
        "Fe³⁺ oluşurken ilk iki elektron nereden çıkar?",
        "En büyük n=4 katmanındaki 4s’den.",
      ],
      [
        "Cr ve Cu için hangi nötr temel hâller korunur?",
        "[Ar]3d⁵4s¹ ve [Ar]3d¹⁰4s¹.",
      ],
      [
        "Kutu spin okları kesin dönen top resmi mi?",
        "Hayır; iki spin izdüşümünün sembolüdür.",
      ],
    ],
    questions: [
      [
        "Nötr Fe (Z=26) [Ar]3d⁶4s² düzenindedir. Fe²⁺ temel hâli hangisidir?",
        ["[Ar]3d⁶", "[Ar]3d⁴4s²", "[Ar]3d⁵4s¹", "[Ar]3d⁸", "[Ar]3d⁶4s²"],
        "En büyük n katmanından elektron çıkar.",
        "İki 4s elektronu çıkar. Kalan 18+6=24 elektron, 26−2 ile uyumludur.",
      ],
      [
        "Nötr Cu (Z=29) temel hâli [Ar]3d¹⁰4s¹ ise Cu²⁺ için hangi düzen doğrudur?",
        ["[Ar]3d⁹", "[Ar]3d⁸4s¹", "[Ar]3d¹⁰4s¹", "[Ar]3d¹⁰", "[Ar]3d⁷4s²"],
        "Önce tek 4s, ardından bir 3d elektronu çıkar.",
        "İki kayıp sonunda 27 elektron ve 3d⁹ kalır.",
      ],
      [
        "Nötr Cr (Z=24) için doğrulanmış temel hâl hangisidir?",
        ["[Ar]3d⁵4s¹", "[Ar]3d⁴4s²", "[Ar]3d⁶", "[Ar]3d³4s³", "[Ar]3d⁵4s²"],
        "Basit çapraz doldurmanın Cr istisnasını kullan.",
        "Cr’nin gerçek nötr temel hâli 3d⁵4s¹’dir; 18+5+1=24.",
      ],
      [
        "2p⁴ alt kabuğunun temel hâl kutu şemasında kaç eşleşmemiş elektron bulunur?",
        ["2", "0", "1", "3", "4"],
        "Üç p kutusunu önce tekle, sonra eşle.",
        "Dört elektron bir çift ve iki tek bırakır; eşleşmemiş sayı 2’dir.",
      ],
      [
        "Tek bir orbitalde ↑↑ çizilmesi hangi temel sorunu gösterir?",
        [
          "Pauli ilkesine aykırıdır.",
          "Her zaman izinli temel hâldir.",
          "Yalnız proton sayısı artmıştır.",
          "Sadece orbitalin adı değişmiştir.",
          "Bütün atomlarda zorunlu düzendir.",
        ],
        "Aynı orbitalde ilk üç kuantum sayısı ortaktır.",
        "İki elektron aynı spinle aynı orbitalde bulunamaz. Bu izinli uyarılma diye düzeltilmez.",
      ],
      [
        "Ca (Z=20) için 1s²2s²2p⁶3s²3p⁶4s² veriliyor. n=3 katmanındaki elektron sayısı kaçtır?",
        ["8", "18", "20", "2", "10"],
        "Yalnız 3 ile başlayan terimleri topla.",
        "3s²+3p⁶=8; 3d boştur. Kapasite 18 olması doluluğun 18 olmasını gerektirmez.",
      ],
      [
        "Bir elektron 2s’den 2p’ye, atomdan ayrılmadan izinli bir duruma yükseliyor. Hangi nicelik kesin korunur?",
        [
          "Atomun toplam elektron sayısı",
          "Elektronun mutlaka eski enerjisi",
          "Orbital türü",
          "Alt kabuk doluluğu",
          "Mutlaka temel hâlde kalması",
        ],
        "Uyarılmada elektron kaptan çıkmış değildir.",
        "İç geçiş elektron sayısını veya net yükü değiştirmez; enerji ve alt kabuk doluluğu değişebilir.",
      ],
      [
        "p alt kabuğu için orbital ve en fazla elektron sayısı sırasıyla nedir?",
        ["3 ve 6", "1 ve 2", "3 ve 3", "6 ve 3", "5 ve 10"],
        "Her orbital en fazla iki elektron taşır.",
        "l=1 için 2l+1=3 orbital ve 2×3=6 elektron vardır.",
      ],
      [
        "S²⁻ iyonu için Z=16 veriliyor. Toplam elektron sayısı kaçtır?",
        ["18", "14", "16", "32", "8"],
        "e=Z−q eşitliğinde q=−2 yaz.",
        "16−(−2)=18. Negatif iyon iki elektron kazanmıştır.",
      ],
      [
        "Orbital çizimini hangi ifade doğru yorumlar?",
        [
          "Elektron durumuna ilişkin olasılık betimlemesidir.",
          "Elektronun her an izlediği kesin dairesel yoldur.",
          "İçi katı maddeyle dolu kabuktur.",
          "Çekirdeğin döndüğü raydır.",
          "Elektronun her ölçümde aynı noktada bulunmasını zorunlu kılar.",
        ],
        "Olasılık modeli ile kesin yörüngeyi ayır.",
        "Modern orbital, durum ve bulunma olasılığıyla ilişkilidir; kesin klasik yol değildir.",
      ],
    ],
    minutes: 54,
    strategies: [
      "Nötr dizilimden en büyük n elektronlarını sırayla çıkar.",
      "İlk ve ikinci kaybı ayrı basamaklarda izle.",
      "Üç p kutusunu önce tekle, sonra eşle.",
      "n=3 doluluğunu kuramsal kapasiteden ayır.",
    ],
  },
  {
    id: "ayt-kuantum-sayilari",
    topic: "detail-409",
    title: "Kuantum sayıları: izinli durumları kur",
    objectives: [
      "Dört kuantum sayısının izinli kümelerini birlikte denetle.",
      "Orbital, alt kabuk ve katman kapasitesini doğru say.",
      "Uzaysal şekil, olasılık, spin ve düğüm kavramlarını koşullarıyla yorumla.",
    ],
    source:
      "MEBİ AYT Kimya, kuantum sayıları ve orbital türleri; OGM Dersler Cepte, atomun kuantum modeli. Kaynak kazanımlarından geliştirilmiş özgün anlatım ve sorular.",
    sections: [
      [
        "Dört sayı aynı soruya cevap vermez",
        "Bir elektron durumu ders düzeyinde n, l, m_l ve m_s ile etiketlenir. İlk üçü uzaysal orbital durumunu, sonuncusu spin izdüşümünü ayırır. Bir atomdaki iki elektronu karşılaştırırken dört sayıyı tek bir koordinat listesi gibi değil, farklı görevli etiketler gibi oku.",
        "Bu sayılar elektronun o andaki x, y, z konumları değildir. Örneğin aynı 2p orbitalinde iki elektron bulunabilir, fakat bunların spin etiketleri farklı olmak zorundadır. Durum etiketi bilmek, ölçülen konumu önceden kesin bir noktaya indirmez.",
      ],
      [
        "n: pozitif tam sayı",
        "Baş kuantum sayısı n=1,2,3,… değerlerini alır; 0, negatif veya kesirli olamaz. Katman adlarında K, L, M, N sırasıyla n=1,2,3,4 karşılığıdır. n, izinli alt kabukların sınırını da belirlediği için ilk kontrol bu sayıdan başlar.",
        "Hidrojen benzeri tek elektronlu modelde enerji n ile belirlenir. Çok elektronlu atomda aynı n içindeki s, p ve d alt kabuklarının enerjileri aynı olmak zorunda değildir. n büyükse her koşulda tüm alt kabuklar daha yüksek enerjilidir genellemesini enerji sırası yerine kullanma.",
      ],
      [
        "l: katmanın içindeki alt kabuk",
        "Açısal momentum kuantum sayısı l, 0 ile n−1 arasında tam sayıdır. 0=s, 1=p, 2=d, 3=f olarak adlandırılır. Böylece n=2 yalnız 2s ve 2p içerir; 2d ifadesi izinli bir orbital adı değildir.",
        "n=4 katmanında s, p, d ve f bulunabilir. Buradaki bulunabilir sözcüğü, seçtiğin atomda bütün bu alt kabukların dolu olduğu anlamına gelmez. İzinli durum kümesi ile gerçek elektron doluluğu farklı sorulardır; önce küme, sonra doluluk değerlendirilir.",
      ],
      [
        "m_l: seçilen eksene göre durum",
        "Manyetik kuantum sayısı m_l=−l,…,0,…,+l tam sayılarını alır. l=2 için −2,−1,0,+1,+2 olmak üzere beş uzaysal durum vardır. n ve l sabitken m_l değişmesi aynı alt kabuk içindeki ayrı orbital durumlarını ayırır.",
        "p_x ve p_y gibi gerçek orbital çizimleri, m_l=±1 durumlarının uygun birleşimleriyle kurulabilir; her m_l değerini koşulsuz bir x/y/z adına yapıştırma. Seçilen z ekseninde l=1, m_l=0 durumu p_z ile ilişkilidir. Eksen ve kullanılan baz açıkça belirtilmelidir.",
      ],
      [
        "m_s: klasik dönme filmi değildir",
        "Spin kuantum sayısı yalnız +1/2 veya −1/2 alır. +1, 0 veya +3/2 bir elektron için bu dersin izinli spin etiketleri değildir. Aynı orbitaldeki iki elektronun zıt spinli olması Pauli denetimini sağlar.",
        "Spin, kuantum mekaniksel içsel açısal momentumdur. Kitaplardaki dönme okları iki izdüşümü hatırlatabilir; elektronun yüzeyi olan küçük bir küre gibi kendi ekseninde dönmesini ölçtüğümüzü göstermez. Etkileşimdeki oklar da bu sembolik anlamda kullanılır.",
      ],
      [
        "Bir alt kabuğu say",
        "Bir alt kabuğun orbital sayısı 2l+1, en fazla elektron sayısı 2(2l+1) olur. s için 1 ve 2; p için 3 ve 6; d için 5 ve 10; f için 7 ve 14 sonuçları aynı sayımın dört uygulamasıdır.",
        "Örneğin l=2 verildiyse n belirtilmese bile alt kabuk beş orbital içerir; fakat bu alt kabuğun var olabilmesi için n en az 3 olmalıdır. Tek bir orbitalde maksimum iki elektron kuralını bütün d alt kabuğuna uygulayıp kapasiteyi iki sanma.",
      ],
      [
        "Bir katmanı say",
        "n katmanında l=0’dan n−1’e kadar tüm alt kabukların orbital sayılarını topla: 1+3+…+(2n−1)=n². Her orbital iki spin durumuna izin verdiğinden katman kapasitesi 2n² olur. n=3 için 1+3+5=9 orbital ve 18 elektron bulunabilir.",
        "Bu sayılar kuramsal kapasitedir; her gerçek atomun n=3 katmanında 18 elektron bulunacağı sonucu çıkmaz. Aynı şekilde n=4 için 16 orbital, 32 kapasite hesaplamak, 4f’nin ilk 36 elementte dolacağı iddiası değildir. Kapasite hesabını temel hâl enerji sırasından ayır.",
      ],
      [
        "Şekillerin neyi gösterdiğini sor",
        "s orbitallerinin açısal dağılımı küresel simetrilidir; p_z iki eksen yönünde yoğunluk gösterir. d orbitallerinin hepsi aynı dört yapraklı resim değildir: d_z², eksen doğrultusundaki iki bölümle kuşak benzeri bir bölge içerir. f ailesinin de yedi ayrı durumu vardır.",
        "Kuantum gezginindeki polar çizim, seçilmiş z eksenine göre açısal genlik büyüklüğünün iki boyutlu kesitidir. Üç boyutlu hacim, gerçek sınır, elektron izi veya radyal olasılık grafiği değildir. Dalga fonksiyonu fazı için kullanılan renkleri pozitif/negatif elektrik yükü gibi yorumlama.",
      ],
      [
        "Düğümleri model koşuluyla say",
        "Hidrojen benzeri orbital modelinde radyal düğüm sayısı n−l−1, açısal düğüm sayısı l, toplam düğüm sayısı n−1 olur. Düğüm, o modelde olasılık yoğunluğunun sıfır olduğu bölgeyle ilişkilidir; elektronun çarpıp geri döndüğü katı duvar değildir.",
        "3p için n=3, l=1: bir radyal ve bir açısal düğüm vardır. 3d için radyal düğüm sıfır, açısal düğüm ikidir. Açısal düğümlerin hepsi düzlem olmak zorunda değildir; d_z² gibi durumlarda konik düğüm yüzeyleri bulunur.",
      ],
      [
        "Bir etiketi dört kapıdan geçir",
        "Önce n pozitif tam sayı mı, sonra l aralığı uygun mu, ardından |m_l|≤l sağlanıyor mu, en son m_s=±1/2 mi diye bak. İlk bozulan koşulu yazmak, bütün diziyi ezberden geçerli/geçersiz diye etiketlemekten daha öğreticidir.",
        "Modelde hatalı kümeyi de seçebilirsin; geçersiz durumda orbital şekli üretilmez ve bozulan kural açıklanır. Sonra yalnız gerekli sayıyı değiştirerek kümeyi onar. Tek doğru küme tanımak yerine aynı hatanın farklı n ve l ile yeniden oluştuğu bir örneği not kapalı çöz.",
      ],
    ],
    examples: [
      [
        "3d alt kabuğunu kur",
        "3d için izinli m_l değerlerini, orbital sayısını ve elektron kapasitesini bul.",
        [
          "3d adı n=3, l=2 anlamına gelir; 0≤2≤2 sağlanır.",
          "m_l=−2,−1,0,+1,+2 olmak üzere beş değer vardır.",
          "Her orbital iki spin durumu içerir; kapasite 5×2=10 elektrondur.",
        ],
        "5 orbital, en fazla 10 elektron",
        "m_l sayısı 2l+1 ile aynı.",
        "d alt kabuğunu tek orbital sayma.",
      ],
      [
        "Geçersiz etiketi onar",
        "(n, l, m_l, m_s)=(2,2,0,+1/2) kümesinin ilk sorunu nedir? n sabitken l nasıl değişebilir?",
        [
          "n=2 pozitif tam sayıdır; ilk kapı geçer.",
          "l≤n−1=1 olmalı; l=2 bu koşulu bozar.",
          "l=0 veya l=1 seçilip m_l=0 ve spin korunursa izinli küme elde edilir.",
        ],
        "l=2 geçersiz; 0 veya 1 olabilir",
        "Yeni l değerlerinde |m_l|=0≤l sağlanır.",
        "Sorunu spin işaretinde arama.",
      ],
      [
        "Katman sayımını topla",
        "n=4 katmanının orbital sayısını ve en fazla elektron kapasitesini hesapla.",
        [
          "İzinli l değerleri 0,1,2,3’tür.",
          "Alt kabuk orbital sayıları 1,3,5,7; toplamları 16’dır.",
          "İki spinle en fazla 2×16=32 elektron bulunabilir.",
        ],
        "16 orbital, 32 elektron",
        "n²=16 ve 2n²=32 doğrular.",
        "Kapasiteyi bir atomda zorunlu doluluk sanma.",
      ],
      [
        "Düğüm türlerini ayır",
        "Hidrojen benzeri modelde 4p için radyal ve açısal düğüm sayısını bul.",
        [
          "4p, n=4, l=1 demektir.",
          "Radyal düğüm n−l−1=4−1−1=2; açısal düğüm l=1’dir.",
          "Toplam 2+1=3 ve n−1=3 ile uyuşur.",
        ],
        "2 radyal, 1 açısal düğüm",
        "Toplam düğüm n−1.",
        "Bu bağıntıyı ölçülmüş bütün atom görüntülerinin bire bir sınırı diye sunma.",
      ],
    ],
    recall: [
      ["l=3 için en küçük n nedir?", "4."],
      [
        "m_l hangi sayılar arasında değişir?",
        "−l ile +l arasında tam sayılar.",
      ],
      ["Spin okları neyi ayırır?", "m_s=+1/2 ve −1/2 izdüşümlerini."],
      ["n=3 katmanının kapasitesi nedir?", "9 orbital; en fazla 18 elektron."],
    ],
    questions: [
      [
        "Bir elektron için hangi (n, l, m_l, m_s) kümesi izinlidir?",
        [
          "(3,2,−2,+1/2)",
          "(2,2,0,+1/2)",
          "(3,1,+2,−1/2)",
          "(0,0,0,+1/2)",
          "(3,1,0,0)",
        ],
        "n→l→m_l→m_s sırasıyla denetle.",
        "(3,2,−2,+1/2) kümesinde n≥1, l≤n−1, |m_l|≤l ve spin ±1/2 koşulları birlikte sağlanır.",
      ],
      [
        "4f alt kabuğu için orbital ve maksimum elektron sayısı nedir?",
        ["7 ve 14", "4 ve 8", "3 ve 6", "5 ve 10", "14 ve 28"],
        "f için l=3 kullan.",
        "2l+1=7; iki spinle 14 elektron.",
      ],
      [
        "n=3 katmanındaki toplam orbital sayısı kaçtır?",
        ["9", "3", "6", "18", "27"],
        "İzinli alt kabukların 1+3+5 orbitalini topla.",
        "Toplam n²=9; 18 elektron kapasitesidir.",
      ],
      [
        "l=2 veriliyorsa mümkün olan en küçük baş kuantum sayısı kaçtır?",
        ["3", "0", "1", "2", "5"],
        "l≤n−1 koşulunu n için çöz.",
        "l=2 için 2≤n−1, dolayısıyla n≥3 gerekir. Baş kuantum sayısı pozitif tam sayı olduğundan en küçük izinli değer 3’tür; daha küçük n d alt kabuğuna izin vermez.",
      ],
      [
        "n=4, l=1 veriliyorsa kaç farklı m_l değeri vardır?",
        ["3", "1", "4", "7", "9"],
        "m_l aralığını −1’den +1’e yaz.",
        "−1,0,+1 üç ayrı durumdur; n bu alt kabuk sayısını değiştirmez.",
      ],
      [
        "Aynı orbitalde bulunan iki elektron hangi etikette farklı olmak zorundadır?",
        ["m_s", "n", "l", "m_l", "Elementin proton sayısı"],
        "İlk üç sayı aynı orbitalin adıdır.",
        "Pauli nedeniyle aynı uzaysal orbitalde iki spin izdüşümü zıt olmalıdır.",
      ],
      [
        "Hidrojen benzeri orbital modelinde 3p’nin radyal düğüm sayısı n−l−1 ile hesaplanıyor. Sonuç kaçtır?",
        ["1", "0", "2", "3", "6"],
        "p alt kabuğu için l=1 değerini bağıntıya koy.",
        "3−1−1=1. Soruda model koşulu ve bağıntı birlikte verilmiştir.",
      ],
      [
        "Hangi ifade orbital çizimi hakkında doğrudur?",
        [
          "Seçilen modele ait olasılık veya genlik bilgisi taşır; kesin elektron yolu değildir.",
          "Her dış çizgi sert atom duvarıdır.",
          "İki renk iki zıt elektron yükü olduğunu kanıtlar.",
          "Elektron yalnız çizginin üzerinde bulunabilir.",
          "m_s=+1/2 mutlaka saat yönünde dönen katı top demektir.",
        ],
        "Şema ile klasik mekanik yolu ayır.",
        "Orbital yoğunluk/genlik betimlemesidir; faz rengi elektrik yükünü, spin oku klasik dönmeyi göstermez.",
      ],
      [
        "Seçilen z ekseninde p_z ile m_l=0 ilişkisi veriliyor. m_l=−1,+1 için hangi genelleme güvenlidir?",
        [
          "p_x/p_y adlarını bire bir vermeden, kullanılan orbital bazını belirtmek gerekir.",
          "−1 her durumda kesin p_x adıdır.",
          "+1 her durumda kesin p_y adıdır.",
          "Bu iki değer hiçbir p alt kabuğunda olamaz.",
          "m_l değeri elektronun tam x koordinatıdır.",
        ],
        "Gerçek orbital çizimleri ile manyetik özdurumları aynı ad listesi yapma.",
        "p_x, p_y gerçek birleşimlerle temsil edilebilir; eksen ve baz bilgisi olmadan koşulsuz bire bir adlandırma kurulmaz.",
      ],
      [
        "n=2, l=1, m_l=0 durumunda iki elektronun spinleri +1/2 ve −1/2’dir. Bu orbitalde üçüncü elektron için ne söylenir?",
        [
          "Pauli nedeniyle aynı orbitalde üçüncü elektron bulunamaz.",
          "m_s=0 seçilerek eklenir.",
          "m_s=+3/2 seçilerek eklenir.",
          "n aynıysa sınırsız elektron bulunur.",
          "Proton sayısı değiştirilmeden Pauli kalkar.",
        ],
        "Bir elektronun yalnız iki spin izdüşümü vardır.",
        "Aynı ilk üç sayıya üçüncü elektron eklemek en az bir dörtleme tekrarını zorunlu kılar.",
      ],
    ],
    minutes: 50,
    strategies: [
      "Orbital adı → m_l kümesi → iki spin sayımı.",
      "İlk bozulan izinlilik koşulunu bul.",
      "Alt kabukların orbital sayılarını topla.",
      "Hidrojen benzeri modelin iki düğüm türünü ayrı say.",
    ],
  },
  {
    id: "ayt-periyodik-sistem-atom-capi",
    topic: "detail-410",
    title: "Periyodik sistem: konumdan yarıçapın koşullarına",
    objectives: [
      "Nötr temel hâl diziliminden periyot, grup ve blok bul.",
      "Kovalent, metalik, iyonik ve van der Waals yarıçaplarını ayır.",
      "Eş elektronlu seri ve atom–iyon karşılaştırmasını gerekçeyle yap.",
    ],
    source:
      "MEBİ AYT Kimya, periyodik sistem ve atom/iyon yarıçapı; OGM Dersler Cepte, periyodik özellikler; Aurelia atom çapı karşılaştırma kağıdı. Kaynak kapsamından özgün anlatım, nitel şema ve alıştırmalar.",
    sections: [
      [
        "Sıralamanın değişen ölçütü",
        "Mendeleyev elementlerin tekrarlayan özelliklerini ve dönemin atom kütlelerini birlikte kullanarak boşluklar bırakabilen bir düzen geliştirdi. Modern sistemin sıralama ölçütü ise Moseley ile ilişkilendirilen atom numarası, yani proton sayısıdır. Yakın atom kütlesi tek başına aynı element veya aynı grup anlamına gelmez.",
        "Periyodik tekrar dış elektron düzenleriyle ilişkilidir. Tablo yalnız isimlerin arşivi değil; benzer kimyasal davranışları konum üzerinden sorgulama aracıdır. İstisnaları tablodan silmek yerine hangi sınıflandırma ölçütünün kullanıldığını açık tutmak gerekir.",
      ],
      [
        "Yedi periyot, on sekiz grup",
        "Yatay sıralar periyot, dikey sütunlar gruptur. Modern IUPAC numaralandırması 1–18 kullanır. Eski A/B adlandırmasında 8B üç ayrı sütunu kapsayabildiği için eski grup sayısını sütun sayısıyla karıştırma. Lantanoit ve aktinoitlerin alta alınması tabloyu yatayda kısaltır.",
        "Bu çalışmanın ilk 36 nötr atom kapsamında temel hâlde dolu orbitaller arasındaki en büyük n, periyodu verir. Bütün elementlere istisnasız bir tanım diye genişletme; daha ileri Pd gibi düzenler ayrı ele alınır. Bu kuralı elektron kaybetmiş iyonda son dolu katmana uygulayıp elementin yerini değiştirme. Na⁺ iki dolu katman taşısa da Na elementi üçüncü periyotta kalır; Z değişmemiştir.",
      ],
      [
        "Ana grubun dizilimden okunması",
        "Ana grup atomlarında ns¹ çoğunlukla grup 1, ns² grup 2; ns²np¹…ns²np⁶ sırasıyla grup 13…18 ile eşleştirilir. H için 1s¹ grup 1 konumunu verir fakat onu alkali metal yapmaz. He, 1s² olmasına rağmen dolu katman davranışıyla grup 18’dedir.",
        "Bu eşleştirmede nötr temel hâl ve ana grup koşulları önemlidir. ns² gördüğün her durumda yalnız grup 2 diye cevap verme: He ve geçiş metallerinin daha uzun dizilimleri ayrı değerlendirilir. Soruda bütün dizilim verilmişse son iki karakter yerine bütün valans bölgesini oku.",
      ],
      [
        "Blok ile grup aynı kavram değil",
        "s, p, d ve f blokları elektron düzeninin alt kabuk ailesiyle ilişkilidir. He’nin dolan alt kabuğu 1s olduğu için s bloğundadır; tabloda grup 18’in tepesinde bulunması onu p elektronlu yapmaz. Bloğu ve sütundaki yeri iki ayrı özellik olarak yazabilirsin.",
        "d bloğunda grup 3–12, okul düzeyinde ns ve (n−1)d elektronlarıyla ilişkilendirilir: Fe için 4s²3d⁶ toplamı grup 8, Cu için 4s¹3d¹⁰ grup 11 verir. Zn grup 12’dir. Bu toplam dış katmanın tek başına elektron sayısı değildir; iki farklı sayım ölçütünü aynı adla karıştırma.",
      ],
      [
        "Değerlik sayısının bağlamı",
        "Ana grup için dış katmandaki s ve p elektronları yararlı değerlik sayımıdır. Geçiş metallerinde kimyaya d elektronları da katılabildiğinden yalnız en büyük n katmanını saymak her soruyu çözmez. Fe’de en dış n=4 katmanında iki elektron olsa da grup 8 konumunu açıklarken d⁶ bölgesi de hesaba girer.",
        "Grup numarası, yükseltgenme basamağı ve serbest iyon yükü aynı sayı değildir. Bir iyon oluşunca çekirdek değişmediği için tablo konumu korunur. Fe³⁺ için dış katman değişimini görmek, Fe atomunu üçüncü periyoda veya grup 3’e taşıma gerekçesi olamaz.",
      ],
      [
        "Yarıçap bir ölçüm tanımı ister",
        "Elektron bulutunun keskin son duvarı bulunmadığından bütün bağlamlar için tek bir atom kenarı ölçülmez. Aynı iki atomun kovalent bağ uzunluğunun yarısı kovalent yarıçap için kullanılabilir. Bağ yapmamış temaslar van der Waals; metal kristalindeki komşuluklar metalik yarıçap tanımına yol açar.",
        "İyonik kristalde katyon ve anyon aynı büyüklükte olmak zorunda değildir. Çekirdekler arası uzaklığın yarısını her iki iyona eşit pay vermek genel iyon yarıçapı hesabı değildir. Koordinasyon ve kullanılan tanım sayısal değerleri etkileyebilir; farklı yarıçap tablolarını koşulsuz bir sıraya karıştırma.",
      ],
      [
        "Aynı periyotta genel küçülme",
        "Nötr ana grup atomlarını aynı periyotta karşılaştırırken temel katman sayısı aynı kalır. Proton sayısı artarken perdelemenin dış elektronu tamamen dengelemediği genel durumda etkin çekim artar; bulutun tipik boyutu azalır. Na, Mg, Al için aynı tanımdaki genel sıra Na>Mg>Al’dır.",
        "Bu bir nitel eğilimdir; yarıçap Z’nin basit tersine eşit diye sayısal bir formül üretmez. Özellikle soy gazın van der Waals değeriyle komşusunun kovalent değerini yan yana koyup eğilimin yanlış olduğunu söylemeden önce ölçüm türünü kontrol et.",
      ],
      [
        "Aynı grupta yeni katmanın etkisi",
        "Li, Na ve K gibi aynı gruptaki nötr atomlarda aşağı indikçe daha dış ana katmanlar dolmaya başlar. Artan uzaklık ve iç elektronların perdelemesi, dış bulutun daha büyük tipik boyutunu destekler. Bu seride Li<Na<K sırası kullanılır.",
        "Hem grup hem periyot farklıysa tek bir yön oku her çifti kesin sıralamayabilir. Karşıt etkiler varsa verilen deneysel tablo veya daha ayrıntılı bilgi gerekir. Model, yalnız açıkça tanımlanan karşılaştırılabilir serilerde bir boyut sırası verir; bütün element çiftlerine sahte sayısal yarıçap hesaplamaz.",
      ],
      [
        "Önce elektron sayısını eşitle",
        "O²⁻, F⁻, Na⁺, Mg²⁺ ve Al³⁺ iyonları için elektron sayıları 10’dur. Aynı elektron sayımında proton sayısı 8’den 13’e artarken aynı düzen daha güçlü tutulur; nitel yarıçap sırası O²⁻>F⁻>Na⁺>Mg²⁺>Al³⁺ olur. Yükün yalnız mutlak değerine bakmak bu sıralamayı açıklamaz.",
        "Atom ile kendi katyonu karşılaştırıldığında elektron kaybı ve bazen dış katmanın tamamen boşalması küçülmeyi destekler. Kendi anyonunda ise elektron kazanımı itme ve dağılımı değiştirerek büyümeyi destekler. Farklı element iyonlarını yalnız +/− işaretiyle sıralamak yerine önce e=Z−q ve katmanları denetle.",
      ],
      [
        "Çizimde büyüklük ile ölçüm ayrı",
        "Gezgindeki bulutlar nitel sırayı görünür kılmak için çizilir; kenarları sert sınır, boyları pikometre verisi değildir. Sıralamanın gerekçesini yanında normal metinle oku. Eş elektronlu seride bir taneciğin yerini değiştirip sonucun proton sayısıyla tutarlı olup olmadığını tahmin et.",
        "Öğrenmeyi kontrol etmek için Na’nın atom/iyon karşılaştırması ile Na–K nötr karşılaştırmasını peş peşe çöz. Birinde elektron kaybı, diğerinde yeni katman baskındır. Aynı sonuca farklı gerekçelerle ulaşılabileceğini görmek, bütün sorulara tek bir periyodik ok uygulama alışkanlığını azaltır.",
      ],
    ],
    examples: [
      [
        "Selenyumun konumu",
        "Nötr X için [Ar]3d¹⁰4s²4p⁴ dizilimi veriliyor. Periyot, grup ve bloğu bul.",
        [
          "En büyük dolu n=4 olduğundan periyot 4’tür.",
          "Ana grup valans bölgesi 4s²4p⁴ altı elektrondur; grup 16 (6A).",
          "p alt kabuğunun dolduğu aile olduğundan p bloğundadır; toplam 18+10+2+4=34 elektrondur.",
        ],
        "4. periyot, grup 16, p bloğu",
        "Nötr atom Z=34, Se ile uyumlu.",
        "3d¹⁰ elektronlarını ana grup numarasına ekleme.",
      ],
      [
        "He’nin iki farklı etiketi",
        "He atomunun temel hâli 1s²’dir. Grup ve blok adları neden farklı görünür?",
        [
          "En büyük n=1; dolu ilk katmanda iki elektron vardır.",
          "Tam dolu dış katman ve kimyasal sınıflama grup 18 konumuyla ilişkilidir.",
          "Dolan alt kabuk s olduğundan blok s’dir; grup 18 olmak p alt kabuğu taşımasını gerektirmez.",
        ],
        "Grup 18, s bloğu",
        "İlk katmanda p alt kabuğu zaten izinli değildir.",
        "Sütun konumunu orbital türüne eşitleme.",
      ],
      [
        "Eş elektronlu beş iyon",
        "O²⁻, F⁻, Na⁺, Mg²⁺, Al³⁺ için Z sırasıyla 8,9,11,12,13. Büyükten küçüğe nitel yarıçap sırasını bul.",
        [
          "e=Z−q ile tüm iyonlarda 10 elektron bulunduğunu denetle.",
          "Aynı elektron sayısı içinde proton sayısı arttıkça tutucu çekim güçlenir.",
          "En az protonlu O²⁻ en büyük, en çok protonlu Al³⁺ en küçüktür: O²⁻>F⁻>Na⁺>Mg²⁺>Al³⁺.",
        ],
        "O²⁻>F⁻>Na⁺>Mg²⁺>Al³⁺",
        "Seri boyunca Z artarken yarıçap küçülür.",
        "Farklı yük işaretlerini tek başına kural yapma.",
      ],
      [
        "Bağ uzunluğundan yarıçap",
        "Aynı tür iki X atomunun kovalent bağındaki çekirdekler arası uzaklık 198 pm. Bu tanımla X’in kovalent yarıçapını bul.",
        [
          "İki eş atom aynı kovalent yarıçapı temsil eder.",
          "Bağ uzunluğu r+r=2r olduğundan 2r=198 pm yazılır.",
          "r=99 pm bulunur; bu değer bu bağ tanımına aittir, bütün temas türlerinin yarıçapı değildir.",
        ],
        "99 pm",
        "99+99=198 pm.",
        "Eşit yarılama kuralını farklı katyon ve anyona otomatik taşıma.",
      ],
    ],
    recall: [
      [
        "Na⁺ oluşunca Na’nın periyodu değişir mi?",
        "Hayır; proton sayısı ve element konumu değişmez.",
      ],
      ["He hangi blok ve gruptadır?", "s bloğu, grup 18."],
      [
        "Eş elektronlu iyonlarda artan Z neyi destekler?",
        "Genellikle daha küçük yarıçapı.",
      ],
      [
        "Kovalent ile van der Waals yarıçapı aynı ölçüm mü?",
        "Hayır; bağ ve bağsız temas farklı tanımlardır.",
      ],
    ],
    questions: [
      [
        "Nötr X için [Ne]3s²3p³ dizilimi verilmiştir. Periyot ve IUPAC grup hangisidir?",
        [
          "3. periyot, grup 15",
          "3. periyot, grup 3",
          "2. periyot, grup 15",
          "3. periyot, grup 5",
          "5. periyot, grup 13",
        ],
        "En büyük n ve ana grup s+p toplamını ayır.",
        "n=3 periyot 3; dış s²p³ beş valans elektronu ana grupta grup 15 verir.",
      ],
      [
        "1s² temel hâlindeki He için doğru sınıflama hangisidir?",
        [
          "s bloğu, grup 18",
          "p bloğu, grup 2",
          "p bloğu, grup 18",
          "s bloğu, grup 2",
          "d bloğu, grup 8",
        ],
        "Blok orbital türü, grup kimyasal sütundur.",
        "He s elektronludur; dolu ilk katmanıyla grup 18’de bulunur.",
      ],
      [
        "Na atomu Na⁺ oluşturunca proton sayısı değişmiyor. Hangi ifade doğrudur?",
        [
          "Na elementi 3. periyottaki yerini korur.",
          "Na elementi 2. periyoda taşınır.",
          "Na elementi Ne olur.",
          "Atom numarası 10’a iner.",
          "Periyodik tablo yeri yalnız elektron sayısına göre yeniden belirlenir.",
        ],
        "Element kimliği Z’ye bağlıdır.",
        "İyonlaşma elektron sayısını değiştirir; Z=11 ve Na’nın tablo konumu korunur.",
      ],
      [
        "O²⁻, F⁻, Na⁺, Mg²⁺ iyonlarının hepsi 10 elektrondur; Z değerleri 8,9,11,12. Nitel yarıçapı en küçük olan hangisidir?",
        ["Mg²⁺", "O²⁻", "F⁻", "Na⁺", "Dördü zorunlu eşittir."],
        "Eş elektronlu seride en büyük çekirdek yükünü bul.",
        "Mg²⁺ 12 protonla aynı sayıda elektronu daha güçlü tutar; seride en küçük beklenir.",
      ],
      [
        "Aynı grupta bulunan nötr Li, Na, K atomları için genel yarıçap sırası küçükten büyüğe hangisidir?",
        ["Li<Na<K", "K<Na<Li", "Na<Li<K", "Li<K<Na", "Üçü kesin eşit"],
        "Aşağı doğru yeni dolu katman eklenir.",
        "Bu seride katman/uzaklık ve perdeleme etkileriyle yarıçap aşağı doğru artar.",
      ],
      [
        "Aynı 3. periyottaki nötr Na, Mg, Al için aynı yarıçap tanımındaki genel sıra hangisidir?",
        [
          "Na>Mg>Al",
          "Na<Mg<Al",
          "Mg>Na>Al",
          "Al>Na>Mg",
          "Hepsi aynı elektron sayısındadır.",
        ],
        "Aynı katmanda artan etkin çekimi düşün.",
        "Na’dan Al’ye proton sayısı artarken genel bulut boyutu azalır.",
      ],
      [
        "Eş iki atomun kovalent bağ uzunluğu 214 pm ise bu tanımla bir atomun kovalent yarıçapı kaç pm’dir?",
        ["107", "214", "428", "53,5", "14"],
        "Eş iki yarıçapın toplamı bağ uzunluğudur.",
        "Eş iki atom için aynı kovalent yarıçapın toplamı bağ uzunluğudur: 2r=214 pm, r=107 pm. Sonucun iki katı verilen uzaklığı geri verir; bu eşit pay farklı iyonlara otomatik taşınmaz.",
      ],
      [
        "Farklı büyüklükte katyon ve anyondan oluşan bir kristalde çekirdekler arası uzaklık d verilmiştir. Hangisi doğrudur?",
        [
          "Her iki iyon yarıçapını ayrı ayrı d/2 saymak genel olarak gerekmez.",
          "Katyon ve anyon mutlaka aynı büyüklüktedir.",
          "d elektron sayısını doğrudan verir.",
          "İyonik yarıçap kütle birimiyle ölçülür.",
          "İyonik yarıçap her durumda kovalent yarıçapla özdeştir.",
        ],
        "Uzaklık toplamı ile eşit pay koşulunu ayır.",
        "İyonlar eşit büyüklükte olmak zorunda değildir; iyonik yarıçap ataması uygun ölçüm/model bilgisi ister.",
      ],
      [
        "Nötr Fe’nin valans bölgesi 3d⁶4s²’dir. Grup 8 hesabında kullanılan toplam ile en dış n katmanındaki elektron sayısı nedir?",
        ["8 ve 2", "2 ve 8", "6 ve 6", "8 ve 8", "26 ve 18"],
        "Grup için d+s; dış katman için yalnız n=4 say.",
        "d⁶+s² grup 8 ile ilişkilidir; en büyük n=4 katmanında 2 elektron vardır. İki farklı sayımdır.",
      ],
      [
        "Bir tabloda Ne için van der Waals, F için kovalent yarıçap verilmiş. Eğilimi yorumlamadan önce ne denetlenmelidir?",
        [
          "Yarıçapların farklı ölçüm tanımları",
          "Yalnız sembollerin alfabetik sırası",
          "Her iki atomun kesin anlık elektron yeri",
          "Her ikisinin zorunlu aynı proton sayısı",
          "Yarıçapların mutlaka kJ/mol olması",
        ],
        "Aynı adın arkasındaki ölçüm koşulunu oku.",
        "Bağlı atom ile bağsız temas yarıçaplarını koşulsuz aynı tanım gibi sıralamak yanıltıcıdır.",
      ],
    ],
    minutes: 48,
    strategies: [
      "Periyot, ana grup ve bloğu üç ayrı ölçütle oku.",
      "Dolan orbital ile kimyasal sütunu ayır.",
      "Elektron eşitliğini doğrula, proton sayısını karşılaştır.",
      "Yalnız eş atomlu kovalent bağ tanımında eşit böl.",
    ],
  },
  {
    id: "ayt-iyonlasma-elektron-ilgisi-en",
    topic: "detail-411",
    title: "Elektron ve enerji: koparma, alma, bağda çekme",
    objectives: [
      "Birinci ve ardışık iyonlaşmayı tanecik yüküyle yaz.",
      "Elektron ilgisinde enerji salımı ve ΔH işaretini ayır.",
      "Elektronegatifliği doğru ölçek ve bağ koşulunda yorumla.",
    ],
    source:
      "MEBİ AYT Kimya, iyonlaşma enerjisi/elektron ilgisi/elektronegatiflik; OGM Dersler Cepte periyodik özellikler; Aurelia 012–013 karşılaştırması. Gerçek kaynak kazanımları, koşullu özgün açıklama ve alıştırmalar.",
    sections: [
      [
        "Üç kavram, üç ayrı işlem",
        "İyonlaşma enerjisi gaz hâlindeki bir atom veya iyondan elektron koparmayı anlatır. Elektron ilgisi gaz hâlindeki türün elektron kazanmasıyla ilişkili enerji değişimidir. Elektronegatiflik ise bağdaki ortak elektronları çekme eğilimini betimler. Benzer periyodik yönler göstermeleri bu üç kavramı özdeş yapmaz.",
        "Soruda önce süreci yaz: X(g)→X⁺(g)+e⁻ koparma; X(g)+e⁻→X⁻(g) alma; X–Y bağındaki elektronların eşit olmayan paylaşımı bağda çekmedir. Enerji birimi görmek ile bağıl ölçek görmek farklı bilgi verir. Kavramı seçmeden periyodik oku uygulama.",
      ],
      [
        "Birinci iyonlaşmada başlangıç nötrdür",
        "Birinci iyonlaşma X(g)+enerji→X⁺(g)+e⁻ biçiminde yazılır. Temel hâl gaz atomundan ilk elektronu uzaklaştırmak enerji gerektirir; değer pozitif bir koparma enerjisidir. kJ/mol değeri, bir mol atomdan bu sıradaki elektronların koparılması için gereken toplam enerjiye karşılık gelir.",
        "Katı metalin doğrudan çözünmesiyle ölçülen bütün ısıyı yalnız birinci iyonlaşma enerjisi sanma. Atomlaşma, hidratasyon veya başka tepkimeler ayrı enerji katkılarıdır. Bu nedenle gaz hâli koşulu tanımın gereksiz bir süsü değil, karşılaştırılan işlemin sınırıdır.",
      ],
      [
        "İkinci enerji farklı yüklü türe aittir",
        "İkinci iyonlaşma X⁺(g)→X²⁺(g)+e⁻, üçüncüsü X²⁺’ten X³⁺ oluşmasıdır. Aynı elementin art arda koparma enerjileri genellikle güçlü biçimde artar; kalan elektronlar giderek daha pozitif türe bağlıdır. İE₂, nötr atomdan iki elektron koparmanın toplamı değildir.",
        "Nötr atomdan +2 iyon oluşturmanın bu basamaklara ait toplam koparma enerjisi İE₁+İE₂’dir. Veri tablolarındaki her sütunun başlangıç yükünü yazmak, bir basamağı toplamla karıştırmayı önler. Sonuçları bir mol başlangıç atomu için topladığında mol temelini de aynı tut.",
      ],
      [
        "Periyot eğilimi ve yakın istisnalar",
        "Aynı periyotta artan etkin çekim genel olarak İE₁’i yükseltir; aynı grupta artan uzaklık ve perdeleme çoğunlukla düşürür. Fakat Be>B ve Mg>Al karşılaştırmalarında dolu s alt kabuğundan koparma ile daha kolay ayrılan p elektronu farkı önemlidir.",
        "N>O ve P>S örneklerinde p³ yarı dolu düzen ile p⁴ içindeki eşleşme ve itme farkını düşün. Atom yarıçapı ile iyonlaşma arasında genel ilişki olması İE=C/r biçiminde bütün elementlere uygulanan kesin bir okul formülü bulunduğu anlamına gelmez.",
      ],
      [
        "Büyük sıçramayı gerekçeyle oku",
        "Ana grup için dış elektronlar çıktıktan sonra iç kapalı düzenden elektron koparmaya geçilmesi büyük sıçrama oluşturabilir. Mg’nin ilk iki elektronu çıktıktan sonra üçüncü basamak belirgin yükselir; bu iki değerlik elektronunu destekler. Yüksek enerji artışını uygun dizilimle birlikte yorumla.",
        "Her ardışık oran 3 veya 3,5’i geçtiğinde iç katmana geçilmiştir kuralı güvenilir değildir. Al’da yaklaşık 578→1817 artışı üç kattan fazlayken ikinci elektron hâlâ değerlik bölgesindedir; belirgin iç-katman geçişi üçüncüden dördüncü koparmaya doğrudur. Sayısal oranı tek başına evrensel eşik yapma.",
      ],
      [
        "Elektron ilgisinde işaret sözleşmesi",
        "X(g)+e⁻→X⁻(g) sırasında enerji açığa çıkıyorsa süreç için ΔH negatiftir. Aynı olayın açığa çıkardığı enerji büyüklüğü A pozitif yazılabilir; bu iki gösterimde A=−ΔH olur. Hangi niceliğe elektron ilgisi adı verildiğini sorunun tanımından oku.",
        "F için yaklaşık A=328, Cl için A=349 kJ/mol verildiğinde Cl daha çok enerji salar; ΔH değerleri −328 ve −349’dur. −328’in sayıca büyük olması daha çok enerji salımı anlamına gelmez. Model iki gösterimi aynı fiziksel olay üzerinde değiştirir; olayı tersine çevirmeden yalnız raporlanan işareti değiştirirsin.",
      ],
      [
        "Elektron kazanımı her zaman kolay değildir",
        "Kapalı alt kabuklar, elektron-elektron itmesi ve ek elektronun gireceği bölge ilgide sapmalar yaratır. Cl’nin F’den daha fazla enerji salması, küçük olmak her koşulda en yüksek elektron ilgisini getirir ezberinin yakın karşı örneğidir. Genel yönler özel verinin yerine geçmez.",
        "Negatif bir gaz iyonuna ikinci elektronun eklenmesi çoğunlukla enerji gerektirir; nötr atoma ilk elektron eklenmesinin sayısını koşulsuz tekrar kullanma. Katı iyonik bileşikte toplam kararlılığa örgü enerjisi gibi başka katkılar da katılır. Tek gaz basamağının enerji istemesi o elementin bütün bileşiklerde böyle bir yük alamayacağını tek başına kanıtlamaz.",
      ],
      [
        "Elektronegatiflikte ölçeği belirt",
        "Pauling elektronegatifliği bağıl ve birimsizdir; F bu yaygın ölçekte çok yüksek değere sahiptir. Aynı periyotta genel sağa artış, aynı grupta genel aşağı azalış yararlı yönlerdir. Tablo bir element için değer vermiyorsa boş hücreyi sıfırla eşitleme.",
        "Mulliken yaklaşımında iyonlaşma enerjisi I ve pozitif salım biçimindeki elektron ilgisi A kullanılarak (I+A)/2 enerji temelli bir değer kurulur. Elektron alma verisi ΔH olarak verilmişse aynı ifade (I−ΔH)/2 olur. Bu sonucu kendiliğinden birimsiz Pauling sayısı diye adlandırma; ölçekler ve dönüşümler farklıdır.",
      ],
      [
        "Bağ kutuplaşması ile tam iyonu ayır",
        "İki atom arasındaki elektronegatiflik farkı, bağın kutuplaşmasını yorumlamaya yardım eder. H–Cl için Cl tarafı kısmi negatif, H tarafı kısmi pozitif gösterilebilir. Kısmi yük δ sembolüyle belirtilir; molekül içindeki her atom tam ayrılmış iyon değildir.",
        "Elektronegatiflik farkı büyüdükçe iyonik karakter artabilir; bütün bağlar için tek sayısal sınırın her koşulda kusursuz sınıflandırma yaptığı iddiası kurulmaz. Ayrıca molekülün toplam kutupluluğunda bağ yönleri ve geometri de önemlidir. Tek bir bağ verisiyle bütün molekül dipolünü hesaplama.",
      ],
      [
        "Enerji diyagramını denetle",
        "Gezginde koparma basamağını değiştir; gaz türünün yükünü ve enerji çubuğunu birlikte takip et. Elektron kazanımı görünümünde F/Cl ve işaret gösterimini değiştirerek çubuğun fiziksel aşağı yönü ile raporun işaretinin farklı görevler taşıdığını gör.",
        "Tekrar için bir soruda İE₂’yi, diğerinde toplam İE₁+İE₂’yi iste. Sonra aynı enerji salımını A ve ΔH ile iki biçimde yaz. Veriyi doğru okumak, istisnayı açıklamak ve hangi genellemeyi kullanamayacağını söylemek salt sayı ezberinden daha güçlü bir kontrol sağlar.",
      ],
    ],
    examples: [
      [
        "Basamak ile toplam",
        "X için İE₁=600 ve İE₂=1800 kJ/mol verilmiştir. Bir mol nötr X(g)’ten bir mol X²⁺(g) oluşturmanın toplam koparma enerjisi nedir?",
        [
          "İlk basamak nötrden +1’e 600 kJ gerektirir.",
          "İkinci basamak +1’den +2’ye 1800 kJ gerektirir; aynı başlangıç molü için iki basamak tamamlanır.",
          "Toplam 600+1800=2400 kJ; tek başına İE₂ değildir.",
        ],
        "2400 kJ",
        "Basamak birimleri aynı, sonuç bir mol dönüşüm içindir.",
        "İE₂’yi nötrden iki elektron koparma toplamı sayma.",
      ],
      [
        "Al verisinde sahte eşik",
        "Al için ardışık İE değerleri yaklaşık 578,1817,2745,11577 kJ/mol; nötr valans 3s²3p¹ veriliyor. İç katmana hangi geçişte girilir?",
        [
          "Üç dış elektron s²p¹ bölgesindedir; ilk üç basamak bu bölgeyi tüketir.",
          "İE₂/İE₁≈3,14 olmasına rağmen henüz ikinci dış elektron çıkarılır.",
          "Kapalı iç düzenin elektronu dördüncü koparmada ayrılır; İE₃→İE₄ sıçraması bu geçişi gösterir.",
        ],
        "Üçüncüden dördüncü iyonlaşmaya geçiş",
        "Dizilim sayımı ile belirgin yüksek enerji artışı uyuşur.",
        "Her 3 kat artışı aynı fiziksel sınır sanma.",
      ],
      [
        "Aynı salımı iki işaretle yaz",
        "Bir gaz atomu elektron alırken mol başına 210 kJ enerji salıyor. A salım büyüklüğü, ΔH süreç entalpisi olarak tanımlanıyor. İkisini yaz.",
        [
          "Son hâl daha düşük enerjiye geçtiği için süreç ekzotermiktir.",
          "Pozitif salım büyüklüğü A=+210 kJ/mol olur.",
          "Süreç enerji değişimi ΔH=−210 kJ/mol; A=−ΔH sağlanır.",
        ],
        "A=+210; ΔH=−210 kJ/mol",
        "İşaret değişirken aynı olay ve salım miktarı korunur.",
        "İki farklı gösterimi iki farklı fiziksel sonuç sanma.",
      ],
      [
        "Mulliken birimini koru",
        "Bir modelde I=800 kJ/mol ve elektron alma ΔH=−200 kJ/mol verilmiştir. Mulliken enerji temelli değer (I−ΔH)/2 ile hesaplanıyor. Sonuç nedir?",
        [
          "Salım biçimi A=−ΔH=+200 kJ/mol olur.",
          "(I+A)/2=(800+200)/2 yazılır.",
          "Sonuç 500 kJ/mol; bu doğrudan birimsiz Pauling değeri değildir.",
        ],
        "500 kJ/mol",
        "Her iki giriş enerji/mol; ortalaması aynı birimde.",
        "ΔH’nin negatif işaretini iki kez ters uygulama.",
      ],
    ],
    recall: [
      ["İE₂ hangi türden elektron koparır?", "X⁺(g) türünden."],
      ["Pozitif salım A ile ΔH ilişkisi nedir?", "A=−ΔH."],
      [
        "Cl/F elektron ilgisi neden önemlidir?",
        "Genel oku istisnasız yasa yapmamayı gösterir.",
      ],
      [
        "Pauling ile Mulliken aynı birim mi?",
        "Hayır; Pauling bağıl birimsiz, kullanılan Mulliken enerji ölçeği enerji birimli olabilir.",
      ],
    ],
    questions: [
      [
        "Bir mol gaz X⁺ iyonundan birer elektron koparılıp X²⁺ elde ediliyor. Kullanılan basamak hangisidir?",
        [
          "İkinci iyonlaşma enerjisi",
          "Birinci iyonlaşma enerjisi",
          "Nötr atomun elektron ilgisi",
          "Pauling elektronegatifliği",
          "Kovalent yarıçap",
        ],
        "Başlangıç türünün yükünü oku.",
        "İE₂, +1 gaz iyonundan +2 gaz iyonuna koparma basamağıdır.",
      ],
      [
        "İE₁=450 ve İE₂=1350 kJ/mol olan X için bir mol nötr gaz atomundan +2 iyon elde etmenin bu iki koparma basamağı toplamı kaç kJ’dür?",
        ["1800", "1350", "900", "450", "2700"],
        "İki ayrı basamağı topla.",
        "450+1350=1800 kJ; İE₂ tek başına toplam değildir.",
      ],
      [
        "Nötr Mg’nin son bölgesi 3s², Al’ınki 3s²3p¹’dir. Bu yakın çiftte birinci iyonlaşma enerjisi için hangi ilişki doğrudur?",
        [
          "Mg>Al",
          "Mg<Al",
          "Her zaman eşit",
          "İki atom için mutlaka sıfır",
          "Yalnız proton sayıları eşitse ölçülebilir",
        ],
        "Kopan elektronun alt kabuğunu karşılaştır.",
        "Al’ın daha kolay ayrılan 3p elektronu, basit sağa artış eğilimine istisna oluşturur.",
      ],
      [
        "N için 2p³, O için 2p⁴ valans bölgesi verilmiştir. Birinci iyonlaşma için hangi yorum uygundur?",
        [
          "N>O; O’daki eşleşme ve itme kopmayı kolaylaştırır.",
          "N<O; hiçbir periyodik istisna olamaz.",
          "N=O; p alt kabuğu adı aynıysa enerji aynıdır.",
          "İkisi de elektron koparırken enerji üretir.",
          "Spin eşleşmesi proton sayısını değiştirir.",
        ],
        "Yarı dolu p düzeni ile eşleşmiş elektronu ayır.",
        "N’nin yarı dolu p düzeni ve O’daki eşleşme farkı N>O istisnasını açıklar.",
      ],
      [
        "Al için İE değerleri 578,1817,2745,11577 kJ/mol; dış düzen 3s²3p¹ olarak verilmiştir. Hangi iddia yanlıştır?",
        [
          "1817/578 oranı 3’ten büyük olduğu için ikinci elektron kesin iç katmandandır.",
          "Üç dış elektron ilk üç basamakta çıkarılabilir.",
          "Dördüncü basamak iç düzenden elektron koparmayla ilişkilidir.",
          "Dış elektron sayımında verilen dizilim kullanılabilir.",
          "Ardışık enerjiler aynı nötr atomun tek seferlik enerji değerleri değildir.",
        ],
        "Oran eşiği yerine dış elektron sayısını denetle.",
        "İkinci elektron hâlâ değerlik bölgesindedir; 3 kat evrensel sınır değildir.",
      ],
      [
        "F ve Cl için elektron kazanımındaki pozitif enerji salımı A sırasıyla 328 ve 349 kJ/mol verilmiştir. Hangi süreç daha çok enerji salar?",
        [
          "Cl; süreç ΔH≈−349 kJ/mol",
          "F; süreç ΔH≈+328 kJ/mol",
          "İkisi eşit; ikisi de halojen",
          "F; 328 daha küçük olduğu için salım daha çoktur",
          "Verilenler yalnız yarıçap birimidir",
        ],
        "Salım büyüklüğünü karşılaştır.",
        "349>328; Cl daha çok salar. Aynı olayın süreç enerji değişimi negatiftir.",
      ],
      [
        "X(g)+e⁻→X⁻(g) için ΔH=−160 kJ/mol verilmiştir. Pozitif salım büyüklüğü A nedir?",
        ["+160 kJ/mol", "−160 kJ/mol", "0 kJ/mol", "+80 kJ/mol", "−320 kJ/mol"],
        "A=−ΔH bağıntısını uygula.",
        "Süreç ΔH=−160 kJ/mol ile enerji salar. A salımın pozitif büyüklüğü olarak tanımlandığından A=−ΔH=+160 kJ/mol olur; gösterim değişir, fiziksel olay tersine dönmez.",
      ],
      [
        "Pauling ölçeğinde H=2,20 ve Cl=3,16 veriliyor. H–Cl bağında hangi nitel gösterim uygundur?",
        [
          "Hδ⁺–Clδ⁻",
          "Hδ⁻–Clδ⁺",
          "İki atom zorunlu tam ayrılmış H⁻ ve Cl⁺ iyonudur.",
          "Elektronlar kesin aynı anda yalnız H çekirdeğindedir.",
          "Cl’nin proton sayısı bağ oluşunca azalır.",
        ],
        "Ortak elektronları daha güçlü çeken tarafı bul.",
        "Cl’nin EN değeri daha büyük; bağ elektron yoğunluğu Cl yönüne kayar. δ kısmi yükü belirtir.",
      ],
      [
        "Mulliken enerji modeli için I=700 kJ/mol ve elektron alma ΔH=−100 kJ/mol verilmiştir. (I−ΔH)/2 sonucu nedir?",
        [
          "400 kJ/mol",
          "300 kJ/mol",
          "800 kJ/mol",
          "400 pm",
          "400 birimsiz Pauling",
        ],
        "Negatif ΔH’yi parantezle yaz.",
        "(700−(−100))/2=400 kJ/mol. Ölçek ve birim korunur.",
      ],
      [
        "Bir temel elektronegatiflik tablosunda Ne hücresi boş bırakılmıştır. Bundan ne çıkar?",
        [
          "Bu tabloda Ne için değer verilmemiştir; boşluk sıfır demek değildir.",
          "Ne’nin değeri kesin 0’dır.",
          "Ne’nin değeri kesin bütün elementlerden büyüktür.",
          "Ne’nin atom numarası yoktur.",
          "Ne hiçbir koşulda fiziksel madde değildir.",
        ],
        "Verilmeyen veri ile sayısal sıfırı ayır.",
        "Tablo kapsamı değer atamamış olabilir; bu bilgi tek başına bir sayı veya tüm bağlamlara ilişkin mutlak hüküm vermez.",
      ],
    ],
    minutes: 56,
    strategies: [
      "İyonlaşma basamaklarını aynı başlangıç molü için topla.",
      "Dizilimdeki dış elektron sayısını enerji tablosuyla birleştir.",
      "Salım büyüklüğü ile süreç enerji değişiminin işaretini ayır.",
      "Önce enerji sözleşmesini ve birimi seç.",
    ],
  },
  {
    id: "ayt-elementler-yukseltgenme",
    topic: "detail-412",
    title: "Elementleri tanı: karakterden yükseltgenme hesabına",
    objectives: [
      "Blok, madde sınıfı ve tepkime eğilimini farklı ölçütlerle açıkla.",
      "Yükseltgenme basamağını gerçek iyon yükünden ayır.",
      "Hidrojen/oksijen istisnaları ve çok atomlu iyonlarda yük toplamını koru.",
    ],
    source:
      "MEBİ AYT Kimya, metalik–ametalik özellik, elementleri tanıyalım ve yükseltgenme basamakları; OGM Dersler Cepte aynı başlıklar; Aurelia 013 köprü karşılaştırması. Koşulları açık özgün metin, sayım modeli ve sorular.",
    sections: [
      [
        "Metalik karakter tek bir ölçüm değildir",
        "Metalik karakter çoğunlukla elektron verme eğilimi ve metal davranışlarıyla ilişkilendirilir; aynı ana grupta aşağı, aynı periyotta sola doğru genel artış kullanılır. Ametalik karakter için sağa-yukarı yönü yararlıdır. Bunlar seçilen karşılaştırma bağlamında kullanılan nitel eğilimlerdir.",
        "Bir metalin tepkime hızı, erime sıcaklığı ve sertliği aynı nicelik değildir. Metalik bağın gücü, kristal yapı ve elektron düzeni de önemlidir. Daha kolay elektron vermek her koşulda daha yüksek erime noktası veya daha hızlı gözlenen yüzey tepkimesi anlamına gelmez.",
      ],
      [
        "s bloğunda benzerlik ve istisna",
        "Grup 1’in Li, Na, K gibi üyeleri alkali metal, grup 2’nin Be, Mg, Ca gibi üyeleri toprak alkali metal olarak adlandırılır. Yaygın bileşiklerde sırasıyla +1 ve +2 basamakları önemlidir. H grup 1’de bulunur fakat ametaldir; He s elektronlu soy gazdır.",
        "Element hâlindeki metalik bağ ile bileşikteki bağ türünü ayır. Bu metallerin birçok tuzu iyonik modelle açıklanır; fakat BeCl₂ gibi kovalent karakterli örnekler vardır. Hepsi yalnız iyonik bağ yapar sözü her bileşiğin yapısını doğru anlatmaz. Aktif metallerin saklanması veya suyla davranışı burada ev deneyi talimatına çevrilmez.",
      ],
      [
        "p bloğunda tek bir madde sınıfı yok",
        "p bloğunda metal, ametal ve yarı metal örnekleri bulunur; Ne, Ar, Kr gibi soy gazlar da bu ailededir. Helyumun 1s² nedeniyle s bloğu istisnasını koru. B, Si ve Ge gibi sınır elementlerinin özellikleri farklı ölçütlerle sınıflandırılır; bütün p bloğunu ametal sayma.",
        "Oda koşullarında F₂ ve Cl₂ gaz, Br₂ sıvı, I₂ katıdır; bunlar belirli sıcaklık-basınç koşullarına ait örneklerdir. N₂, O₂ ve diğer iki atomlu elementler bileşik değildir. Süper ağır elementlerin az sayıdaki atomundan çıkarılan kuramsal öngörüleri sıradan makroskopik ölçüm sonucu gibi anlatma.",
      ],
      [
        "d bloğu ve geçiş kavramı",
        "d bloğu genel tabloda grup 3–12 arasındadır; üyeleri metaldir ve birden fazla yükseltgenme basamağı gösterebilir. Fe için +2/+3, Cu için +1/+2, Cr ve Mn için daha geniş örnekler kullanılır. Bu olası veya yaygın değerleri her ortamda aynı kararlılıkta diye sunma.",
        "Daha dar kimyasal geçiş elementi tanımı, atomda veya katyonda kısmen dolu d alt kabuğunu vurgular. Zn, Cd, Hg d bloğunda bulunurken bu dar tanımda ayrı değerlendirilir. Zn ve Cd grup 12 (eski 2B), Cu/Ag/Au grup 11’dir; benzer dizilimleri aynı sütun sanma.",
      ],
      [
        "f ailesi ve radyoaktivite sınırı",
        "Tablonun altta gösterilen uzun dizileri lantanoit ve aktinoitlerle ilişkilidir; bunlar altıncı ve yedinci periyotların parçasıdır. Pek çoğunda iç f doluluğu önem kazanır. Yerleşim ve sınır üyelerinin adlandırılması kullanılan tablo geleneğiyle açıklanmalıdır.",
        "Aktinoitlerde farklı yükseltgenme basamakları görülebilir; yalnız +3/+4 her üyenin bütün kimyasını kapsamaz. Radyoaktif olmak kimyasal iyonlaşma değil çekirdek kararsızlığıdır. Bazı küçük Z’li elementlerin de kararlı izotopu bulunmadığından büyük atom numarası dışında hiçbir radyoaktiflik olamaz kuralı kurulmaz.",
      ],
      [
        "Soy gaz: az tepkime, sıfır kimya değil",
        "He, Ne ve Ar gibi soy gazların temel gaz örnekleri tek atomludur ve kapalı elektron düzenleri düşük tepkime eğilimiyle ilişkilidir. Grup 18 sınıflaması yararlı bir başlangıçtır. Tek atomlu olmak ile tek protonlu olmak tamamen farklı kavramlardır.",
        "Kr ve Xe’nin uygun koşullarda bileşikleri bilinir; bütün soy gazlar hiçbir koşulda bağ yapamaz genellemesi yanlış olur. Bir elektronegatiflik tablosunun boş hücresi de sıfır değeri değildir. Og gibi süper ağır üyenin öngörülen özelliklerini oda koşullarında kap içinde ölçülmüş sıradan gaz davranışıyla karıştırma.",
      ],
      [
        "Oksit ve hidritlerde koşulu koru",
        "Birçok ana grup metal oksidi bazik, ametal oksidi asidik davranışla ilişkilidir. Al₂O₃ ve ZnO gibi amfoter oksitler, CO ve NO gibi nötr oksit örnekleri genel cümlenin sınırını gösterir. CrO₃ gibi bazı metal oksitler de asidik olabilir; yalnız metal/ametal etiketi her sonucu vermez.",
        "Ametal ve oksijen atom sayısını karşılaştıran tek bir eşik bütün oksitleri sınıflandıramaz: Cl₂O suyla HClO oluşturan asidik anhidrit örneğidir. HF/HCl/HBr/HI sulu asitliği gibi karşılaştırmalar ise belirli hidrit serisine aittir. Metalik karakter oku veya elektronegatiflik tek başına bütün asit kuvvetlerini hesaplamaz.",
      ],
      [
        "Yükseltgenme bir muhasebe aracıdır",
        "Element hâlindeki atomun yükseltgenme basamağı sıfırdır: Fe, O₂ ve O₃ bu açıdan aynı sıfır kuralına uyar. Tek atomlu iyonda yükseltgenme basamağı iyon yüküne eşittir. Kovalent bileşikte ise bağ elektronlarını kurallı atayan biçimsel bir sayıdır.",
        "ClF₃’te Cl için +3 bulmak molekülün içinde serbest Cl³⁺ iyonu bulunduğunu kanıtlamaz. Gerçek net iyon yükü, kısmi yük ve yükseltgenme basamağı farklı kavramlardır. Bu ayrım hesapları kolaylaştırırken molekülün yapısını yanlış çizmeni de önler.",
      ],
      [
        "Yük toplamı denklemi",
        "Nötr bileşikte atomların adetleriyle çarpılmış yükseltgenme basamakları toplamı sıfırdır. Çok atomlu iyonda toplam, iyonun net yüküne eşittir. SO₄²⁻ için S+4(−2)=−2 yazılır; dört oksijeni saymadan tek bir −2 eklemek yanlış toplam verir.",
        "Alkali metallerin yaygın bileşiklerinde +1, toprak alkali metallerde +2, F’nin bileşiklerinde −1 kuralları güçlü başlangıçlardır. Ana grupların üst-alt basamak özetleri kullanılırken F, O ve yaygın olmayan durumların sınırı korunur. Bir elementin grup numarasını bütün bileşiklerde sabit yükü yapma.",
      ],
      [
        "H ve O için öncelik sırası",
        "H çoğu ders örneğinde +1’dir; NaH gibi metal hidrürlerinde −1 olur. O çoğu bileşikte −2, H₂O₂ ve Na₂O₂ gibi peroksitlerde −1, süperoksitte ortalama −1/2 olabilir. Element O₂’de ise sıfırdır; molekül adı ve bağlamı önce okunur.",
        "F bileşiklerde −1 olduğundan OF₂’de O=+2, O₂F₂’de her O için ortalama +1 çıkar. Peroksit iyonu O₂²⁻’dir; her O’nun −1 basamağını bağımsız O⁻ iyonu varmış gibi yazma. Peroksitler yalnız grup 1/2 metallerine bağlı bir liste değildir; O–O içeren organik örnekler de bulunabilir.",
      ],
      [
        "İyon adını ve alt indisi ayır",
        "NH₄⁺ amonyum, H₃O⁺ hidronyum örnekleridir; pozitif iyon olmak içindeki her atomun pozitif basamakta olduğunu söylemez. NH₄⁺’te H=+1 kullanınca N=−3 bulunur. Net yük bütün atomların toplamına aittir.",
        "NO₂⁻ nitrit, NO₃⁻ nitrat; MnO₄⁻ permanganat, MnO₄²⁻ manganat; CrO₄²⁻ kromat, Cr₂O₇²⁻ dikromattır. Alt indis atom adedi, üstteki işaret/yük net iyon yüküdür. N³⁻ ile N₃⁻ yazımları da aynı türü göstermez; konumu ve işareti dikkatle oku.",
      ],
      [
        "Ortalama sayı gerçek her atom değildir",
        "Fe₃O₄ için O=−2 alındığında üç Fe’nin toplamı +8, ortalama Fe basamağı +8/3 olur. Bu ortalamayı her Fe atomunun yalıtılmış +8/3 yüklü bir iyonu varmış gibi okumak yanlıştır. Karışık değerlikli açıklamada Fe(II)/Fe(III) ayrımı önemlidir.",
        "Hesap gezgininde formülü seç, bilinen katkıları topla ve bilinmeyenin atom adedine böl. Atom simgelerinin kutuları yalnız sayımı gösterir; molekül bağ geometrisi veya iyonun suda kesin yapısı değildir. Sonucun neyi söylediğini ve hangi yük iddiasını kanıtlamadığını da açıklamayı dene.",
      ],
    ],
    examples: [
      [
        "Amonyumda negatif azot",
        "NH₄⁺ için H=+1 kullanılarak N’nin yükseltgenme basamağını bul.",
        [
          "İyonda toplam +1’dir; bir N ve dört H vardır.",
          "N+4(+1)=+1 eşitliği yazılır.",
          "N=+1−4=−3 bulunur; iyonun pozitif olması N’nin pozitif olmasını gerektirmez.",
        ],
        "N=−3",
        "−3+4=+1 net iyon yükünü verir.",
        "Toplam iyon yükünü her atoma ayrı ayrı atama.",
      ],
      [
        "Dikromatta iki krom",
        "Cr₂O₇²⁻ için O=−2 ise Cr’nin ortalama yükseltgenme basamağı nedir?",
        [
          "Toplam yük −2, oksijen katkısı 7×(−2)=−14’tür.",
          "İki Cr için 2x−14=−2 yazılır.",
          "2x=12, x=+6; bir Cr için +12 değil +6 bulunur.",
        ],
        "Cr=+6",
        "2×6−14=−2.",
        "Alt indisteki iki atomu bölme adımında unutma.",
      ],
      [
        "Florla oksijenin işareti",
        "OF₂ ve O₂F₂ nötr türlerinde F=−1’dir. O basamaklarını hesapla.",
        [
          "OF₂ için x+2(−1)=0, x=+2 olur.",
          "O₂F₂ için 2x+2(−1)=0, x=+1 olur.",
          "Her ikisinde de toplam sıfırdır; oksijen her bileşikte −2 değildir.",
        ],
        "OF₂: +2; O₂F₂: +1",
        "F her iki örnekte −1 kalır.",
        "Oksijenin +2 olmasını yalnız bütün F içeren türlere otomatik taşıma.",
      ],
      [
        "Ortalama ile tek türü ayır",
        "Fe₃O₄ için O=−2 veriliyor. Ortalama Fe basamağı nedir; bu her Fe’nin serbest iyon yükü müdür?",
        [
          "Dört O toplam −8 katkı verir; Fe toplamı +8 olmalıdır.",
          "Üç Fe için ortalama +8/3 bulunur.",
          "Bu biçimsel ortalamadır; karışık değerlik açıklamasında Fe(II)/Fe(III) ayrılır, her atom için serbest kesirli iyon yükü iddiası kurulmaz.",
        ],
        "Ortalama +8/3; her atom için serbest iyon yükü değildir.",
        "Üç ortalama katkının toplamı +8.",
        "Kesirli ortalamayı yanlış bir tek atom iyon çizimine dönüştürme.",
      ],
    ],
    recall: [
      [
        "He neden p bloğu sayılmaz?",
        "Dolan alt kabuğu 1s’dir; grup 18 konumu ayrı özelliktir.",
      ],
      [
        "Nötr ve çok atomlu iyonda toplam nedir?",
        "Sırasıyla sıfır ve net iyon yükü.",
      ],
      [
        "Peroksit iyonu ile tek O basamağı nasıl ayrılır?",
        "O₂²⁻ toplam iyon; her O’nun basamağı −1.",
      ],
      [
        "Yükseltgenme basamağı her zaman gerçek serbest iyon yükü mü?",
        "Hayır; kovalent türlerde biçimsel elektron atama sayımıdır.",
      ],
    ],
    questions: [
      [
        "NH₄⁺ iyonunda H=+1 ise N’nin yükseltgenme basamağı nedir?",
        ["−3", "+3", "−4", "+1", "+5"],
        "Toplamı iyon yükü +1’e eşitle.",
        "Dört H toplam +4 katkı verir. İyonun net yükü +1 olduğundan x+4=1, x=−3 bulunur. Pozitif çok atomlu iyonun içindeki her atomun pozitif basamakta olması gerekmez.",
      ],
      [
        "Cr₂O₇²⁻ iyonunda O=−2 ise Cr’nin ortalama basamağı nedir?",
        ["+6", "+12", "+7", "−6", "+3"],
        "İki Cr’nin toplamını bulduktan sonra ikiye böl.",
        "Yedi oksijen toplam −14 katkı verir. İki Cr için 2x−14=−2 yazılır; 2x=12 ve x=+6 olur. Bulunan +12 tek bir Cr’nin değil iki Cr’nin toplam katkısıdır.",
      ],
      [
        "H₂O₂’nin peroksit olduğu ve H=+1 olduğu veriliyor. O’nun basamağı nedir?",
        ["−1", "−2", "0", "+1", "+2"],
        "Nötr türde 2(+1)+2x=0 kur.",
        "2+2x=0, x=−1. Bu tek O⁻ iyonu varlığının kanıtı değildir.",
      ],
      [
        "OF₂ nötrdür ve F bileşikte −1’dir. O basamağı kaçtır?",
        ["+2", "−2", "−1", "0", "+1"],
        "O katkısı iki F’nin toplamını dengelemeli.",
        "İki F’nin toplam katkısı −2’dir; nötr molekülde tek O bunu +2 ile dengeler: x−2=0. Bu örnek O her bileşikte −2 olur genellemesini çürütür; F kuralı önce uygulanır.",
      ],
      [
        "ClF₃ molekülünde F=−1 alınıyor. Hangi yorum doğrudur?",
        [
          "Cl biçimsel olarak +3’tür; serbest Cl³⁺ iyonu olduğu sonucu zorunlu değildir.",
          "Cl kesin −3’tür.",
          "Molekülün toplam yükü +3 olmak zorundadır.",
          "Her F’nin basamağı +1’dir.",
          "Cl’nin proton sayısı bağ oluşurken üç artar.",
        ],
        "Biçimsel yükseltgenme ile gerçek iyon yükünü ayır.",
        "x+3(−1)=0 olduğundan x=+3; bu kovalent türde biçimsel muhasebedir.",
      ],
      [
        "NaH metal hidrürü için Na=+1 veriliyor. H basamağı nedir?",
        ["−1", "+1", "0", "+2", "−2"],
        "Nötr toplamı sıfır yap.",
        "+1+x=0 olduğundan H=−1. Hidrojen her örnekte +1 değildir.",
      ],
      [
        "MnO₄⁻ iyonunda O=−2 ise Mn basamağı kaçtır?",
        ["+7", "+8", "+6", "−7", "+4"],
        "Toplamı −1’e eşitle.",
        "x−8=−1, x=+7. Manganat MnO₄²⁻ olsaydı +6 çıkardı.",
      ],
      [
        "Zn/Cd ve Cu/Ag/Au için doğru IUPAC grup eşleştirmesi hangisidir?",
        [
          "Zn/Cd:12; Cu/Ag/Au:11",
          "Zn/Cd:11; Cu/Ag/Au:12",
          "Hepsi grup 1",
          "Hepsi grup 18",
          "Zn/Cd:2; Cu/Ag/Au:3",
        ],
        "d bloğunun sağ iki sütununu ayır.",
        "Zn/Cd eski 2B ve grup 12; Cu/Ag/Au eski 1B ve grup 11’dir.",
      ],
      [
        "Küresel veya yapraklı orbital çiziminden bağımsız olarak, metalik karakter ile erime sıcaklığı ilişkisi için hangi genelleme uygundur?",
        [
          "Aynı nicelik değillerdir; bağ ve kristal yapı da erimeyi etkiler.",
          "Metalik karakter artınca erime sıcaklığı her durumda aynı oranda artar.",
          "Bütün metallerin erime sıcaklığı eşittir.",
          "Metalik karakter birimi kesin °C’dir.",
          "Kristal düzen erimeyi hiçbir koşulda etkilemez.",
        ],
        "Elektron verme eğilimini bütün malzeme özelliklerine eşitleme.",
        "Kimyasal karakter ile termal/kristal özellikler farklı ölçütlerdir; tek monotoni her durumu kapsamaz.",
      ],
      [
        "Fe₃O₄ için O=−2 ile hesaplanan ortalama Fe basamağı nedir?",
        ["+8/3", "+8", "+4/3", "−8/3", "+2"],
        "Toplam +8’i üç Fe’ye böl.",
        "3x−8=0; x=+8/3 biçimsel ortalamadır. Bu her Fe’nin serbest kesirli iyonu olduğunu söylemez.",
      ],
    ],
    minutes: 62,
    strategies: [
      "İyonun yükünü atomların toplamına eşitle.",
      "Bilinen oksijen katkısını ayırıp iki Cr’ye böl.",
      "Önce F kuralını kullan; oksijenin işaretini sonra bul.",
      "Toplam ile tek atomun biçimsel ortalamasını ayır.",
    ],
  },
  {
    id: "ayt-gaz-ozellikleri",
    topic: "detail-413",
    title: "Gazları betimle: tanecikten ölçülen basınca",
    objectives: [
      "P, V, T, n büyüklüklerini birimleri ve ölçüm araçlarıyla ayır.",
      "Aynı sıcaklıkta kinetik enerji ile tanecik hızını karıştırma.",
      "İdeal gaz varsayımlarının neyi sadeleştirdiğini açıkla.",
    ],
    source:
      "MEBİ AYT Kimya, gazların özellikleri ve gaz yasalarına giriş; OGM Dersler Cepte gazların özellikleri/ideal gaz; Aurelia gaz–plazma kağıdıyla TYT kapsam sınırı. Özgün kontrollü tanecik modeli ve öğretim soruları.",
    sections: [
      [
        "Gazın hacmi taneciklerin öz hacmi değildir",
        "Bir gaz örneği uygun dengede bulunduğu kabın erişilebilir hacmini doldurur. Gazın V değeri, moleküllerin küçük katı küreleri yan yana toplandığında kaplayacağı öz hacim değil, gazın bulunduğu toplam hacimdir. Tanecikler arası uzaklık sıkıştırılabilirliği anlamaya yardım eder.",
        "Düşük yoğunluk ve akışkanlık birçok günlük gaz örneğinin özelliğidir; yoğunluğu tüm katı ve sıvılardan her koşulda küçük diye mutlaklaştırma. Sıcaklık, basınç ve hangi maddelerin karşılaştırıldığı önemlidir. Gaz modeli her madde durumunu yalnız düzensizlik sözcüğüyle sıralamaz.",
      ],
      [
        "Hareket türü moleküle bağlıdır",
        "Gaz tanecikleri kabın içinde öteleme yapar; çarpışmalar hız yönlerini değiştirebilir. Çok atomlu moleküllerde dönme ve titreşim gibi iç hareketler de bulunur. Tek atomlu He için molekülün iç bağ titreşimini çizmek doğru değildir; molekül yapısını hareket türünden önce tanı.",
        "Brown hareketi, akışkan taneciklerinin etkisiyle daha büyük asılı parçacıklarda gözlenen düzensiz harekettir. Her iki gaz molekülünün çarpışmasını doğrudan Brown hareketinin tanımı yapmak yerine mikroskobik çarpışmalar ile onun gözlenebilir sonucunu ayır. Buradaki oklar yalnız şematik öteleme hızını temsil eder.",
      ],
      [
        "Basınç: kuvveti alana böl",
        "Kabın duvarına taneciklerin momentum aktarması, makroskopik basınçla ilişkilidir. Basınç P=F/A olup kuvvetten farklı bir büyüklüktür. Aynı basınç daha geniş alana etki ederse toplam dik kuvvet daha büyük olabilir; duvarın her parçasındaki toplam kuvvet zorunlu eşit değildir.",
        "Küçük ve dengedeki gaz kabı modelinde basınç yaklaşık tek değerle betimlenir; büyük yüksekliklerde atmosfer basıncının değişimi ayrı bir konudur. Modeldeki tanecik sayısı ve hız okları n, T, V değişimine bağlıdır; bunlar gerçek çarpışma sayacından alınmış deneysel kayıt değildir.",
      ],
      [
        "Basınç birimi ve araç",
        "1 atm=760 mmHg=76 cmHg dönüşümü okul hesaplarında kullanılır; Torr da burada mmHg ile aynı yakınlıkta ele alınır. Pa bir SI basınç birimidir; atm ile SI denklem sabitini rastgele karıştırma. Ölçülen kuvvetin birimi N, basıncın birimi N/m²=Pa’dır.",
        "Açık hava basıncı barometre, kapalı sistemin gaz basıncı uygun manometreyle ölçülür. Bazı aygıtlar çevreye göre fark basıncı verir; gaz denklemi için mutlak basınç gerekir. Okuma türü belirtilmeden bütün göstergeleri doğrudan PV=nRT’de kullanma.",
      ],
      [
        "Hacim biriminde üçlü küp tuzağı",
        "1 L=1 dm³=1000 mL=1000 cm³, 1 m³=1000 L’dir. Bir uzunluk birimini küpe yükseltirken çarpan da küpe yükselir; santimetreden metreye dönüşümü yalnız yüzle bölerek hacme taşımak yanlış olur. Verilen ve istenen birimleri sayıdan önce yaz.",
        "Örneğin 2,5 dm³ hacim 2,5 L ve 2500 cm³ eder. Toplam hacimde kullanılan kaplar açık bağlantılıysa erişilebilir son hacimlerin toplamı uygun modelde alınabilir; gazın tek bir taneciğinin hacmiyle bu toplamı karıştırma. Hareketli piston varsa hacim işlem sırasında değişebilir.",
      ],
      [
        "Sıcaklıkta mutlak ölçek",
        "Gaz oranlarında sıcaklık Kelvin ile yazılır: T=t+273,15. Bazı sınav hesaplarında 273 yaklaşımı açıkça verilir; aynı soruda bir yerde tam dönüşüm, başka yerde farklı yaklaşım kullanarak sahte kesinlik üretme. Kelvin biriminde derece işareti bulunmaz.",
        "27 °C ile 54 °C iki kat mutlak sıcaklık değildir. 300 K ile 600 K iki kat olduğunda ideal modelin ortalama öteleme kinetik enerjisi de iki kat olur. T=0 sınırına ideal doğruyu uzatmak, gerçek gazın o noktaya dek aynı fazda kalacağını veya fiziksel sıfır hacme gideceğini göstermez.",
      ],
      [
        "Aynı T, aynı ortalama enerji; aynı hız değil",
        "İdeal gaz tanecikleri için ortalama öteleme kinetik enerjisi tanecik başına 3kT/2’dir. Aynı T’de He ve O₂ için bu ortalama aynı olur. Tek tek taneciklerin bütün hızları ve enerjileri ise aynı değildir; bir hız dağılımı bulunur.",
        "Karesel ortalama hız v_rms=√(3RT/M) olduğundan aynı T’de daha küçük mol kütleli gazın v_rms değeri daha büyüktür. Burada SI R ile M kg/mol kullanılır. Ortalama hız, en olası hız ve v_rms aynı sayı değildir; model yalnız açıkça adlandırılan v_rms büyüklüğünü verir.",
      ],
      [
        "Miktar, tanecik sayısı ve toplam enerji",
        "n mol miktarıdır; tanecik sayısı N=nN_A bağıntısıyla ilişkilidir. Moleküler gazda tanecik genellikle molekül, tek atomlu gazda atomdur. Bir mol O₂ molekülünde iki mol O atomu bulunması tanecik sayımında hangi varlığın istendiğinin önemini gösterir.",
        "Aynı T’de tanecik başına ortalama enerji eşitken örneklerin toplam öteleme enerjisi 3nRT/2 ile miktara bağlıdır. Bu, çok atomlu gazın titreşim/dönme katkıları dahil bütün iç enerjisini her sıcaklıkta verdiğimiz anlamına gelmez. Modelin öteleme sınırı sonuç yanında açık yazılır.",
      ],
      [
        "İdeal yaklaşım ve gerçek faz",
        "İdeal modelde taneciklerin öz hacmi kabın hacmine göre ihmal edilir; aralarındaki etkileşimler, çarpışma anları dışında hesaba katılmaz. Çarpışmalar toplam enerji korunumu bakımından elastik ele alınır. Bu, her çarpışmada her taneciğin tek tek eski hızını koruması demek değildir.",
        "Gerçek gazlar düşük basınç ve uygun yüksek sıcaklıkta ideal davranışa yaklaşabilir. Yoğuşma, güçlü etkileşim ve yüksek sıkıştırma sapma yaratır. Kritik sıcaklığın üzerindeki bir gazı yalnız basıncı artırarak sıradan sıvı-gaz geçişiyle sıvılaştıramazsın; bütün gazlar her sıcaklıkta sıkışınca sıvı olur genellemesi kullanılmaz.",
      ],
      [
        "Değişkenleri denetleyerek deney tasarla",
        "P, V, T, n birbirinden bağımsız dört serbest çıktı değildir; ideal yaklaşımda PV=nRT bağıntısıyla ilişkilidir. Kap hacmini sabit tutarken n veya T değişirse basınç değişebilir. Hacmi serbest bırakan bir pistonda ise dış yük ve denge koşulları ayrıca belirleyicidir.",
        "Tanecik gezgininde T, n, V ve mol kütlesini ayrı değiştir. Aynı n, T, V’de M artınca v_rms azalır fakat ideal basınç değişmez; bu beklenmeyen çifti önce tahmin edip sonra açık sonuçla karşılaştır. Gazlar tepki vermiyor ve aynı fazda kalıyorsa karışımın tek gaz fazlı homojen olması uygun bir yaklaşımdır; kimyasal tepkime ve yoğuşmayı bu varsayıma gizlice ekleme.",
      ],
    ],
    examples: [
      [
        "Basınç birimini ortaklaştır",
        "Bir gaz için basınç 1140 mmHg verilmiştir. 1 atm=760 mmHg ve 76 cmHg yaklaşımıyla atm ve cmHg değerlerini bul.",
        [
          "atm değeri 1140/760=1,5 bulunur.",
          "cmHg değeri 1140 mmHg/10=114 cmHg veya 1,5×76=114’tür.",
          "1,5 atm bir atmosferden büyük olduğundan 1140>760 yön kontrolü sağlanır.",
        ],
        "1,5 atm; 114 cmHg",
        "İki bağımsız dönüşüm aynı cmHg değerini verir.",
        "760 çarpanını cmHg ile karıştırma.",
      ],
      [
        "Aynı enerji, farklı hız",
        "Aynı sıcaklıktaki ideal He ve O₂ gazları için M=4 ve 32 g/mol veriliyor. v_rms(He)/v_rms(O₂) oranını ve tanecik başına öteleme enerjisi ilişkisini bul.",
        [
          "v_rms oranında aynı T ve R sadeleşir; hız mol kütlesinin kareköküyle ters orantılıdır.",
          "Oran √(32/4)=√8=2√2 olur.",
          "Aynı T nedeniyle ortalama öteleme enerjileri eşittir; farklı hızlar farklı kütleyle dengelenir.",
        ],
        "2√2; ortalama öteleme enerjileri eşit",
        "M büyürken hız küçülür.",
        "Aynı sıcaklığı aynı hız sanma.",
      ],
      [
        "Alana bağlı kuvvet",
        "Dengede gaz basıncı 200000 Pa, seçilen düz duvar alanı 3 cm². P=F/A ve 1 cm²=10⁻⁴ m² ile dik kuvveti bul.",
        [
          "Alan 3×10⁻⁴ m²’ye çevrilir.",
          "F=PA=200000×0,0003=60 N yazılır.",
          "Aynı basınçta alan 6 cm² olsaydı kuvvet 120 N olurdu; basınç tek başına toplam kuvvet değildir.",
        ],
        "60 N",
        "Pa×m²=N.",
        "cm² birimini metrekaresi gibi denkleme koyma.",
      ],
      [
        "Tanecik ve atom sayısı",
        "0,30 mol N₂ için N_A=6,0×10²³ mol⁻¹ veriliyor. Molekül ve N atomu sayısı nedir?",
        [
          "Molekül sayısı 0,30×6,0×10²³=1,8×10²³’tür.",
          "Her N₂ molekülünde iki N atomu vardır.",
          "Atom sayısı 2×1,8×10²³=3,6×10²³ olur; molekül ve atom adları ayrı tutulur.",
        ],
        "1,8×10²³ molekül; 3,6×10²³ atom",
        "Atom sayısı molekül sayısının iki katı.",
        "N₂’nin molünü N atomu molüyle özdeş sayma.",
      ],
    ],
    recall: [
      [
        "Gazın V değeri hangi hacimdir?",
        "Gazın erişebildiği kap hacmi; tanecik öz hacimlerinin toplamı değil.",
      ],
      [
        "Aynı T’de He ve O₂’nin hangi enerjisi eşittir?",
        "Tanecik başına ortalama öteleme kinetik enerjisi.",
      ],
      [
        "M artınca aynı n, T, V’de ne olur?",
        "v_rms azalır; ideal basınç aynı kalır.",
      ],
      [
        "Barometre ile manometreyi nasıl ayırırsın?",
        "Açık hava basıncı ile kapalı gaz/uygun fark basıncı ölçümleri.",
      ],
    ],
    questions: [
      [
        "1 atm=760 mmHg olarak alınıyor. 1520 mmHg kaç atm’dir?",
        ["2", "0,5", "1,5", "20", "76"],
        "mmHg değerini 760’a böl.",
        "mmHg değerini aynı basıncın 1 atm başına 760 mmHg dönüşümüne böl: 1520/760=2 atm. Sonuç 1 atm’den büyük olmalıdır; birim ve büyüklük yönü bunu doğrular.",
      ],
      [
        "Bir gaz kabının hacmi 2,4 L. 1 L=1000 cm³ ise hacim kaç cm³’tür?",
        ["2400", "240", "24", "0,0024", "24000"],
        "L başına bin cm³ kullan.",
        "1 L=1000 cm³ olduğundan 2,4×1000=2400 cm³ bulunur. Sayı büyür çünkü aynı hacim daha küçük birimle ifade edilir; hacmin kendisi değişmez.",
      ],
      [
        "Sıcaklık dönüşümünde bu soruda 273 yaklaşımı kullanılacak. 27 °C ve 127 °C sıcaklıklarının Kelvin oranı T₂/T₁ nedir?",
        ["4/3", "127/27", "2", "1/4", "3/4"],
        "Önce iki sıcaklığa da 273 ekle.",
        "T₁=300 K, T₂=400 K; oran 400/300=4/3.",
      ],
      [
        "İdeal He ve N₂ aynı T’dedir. Hangi ifade doğrudur?",
        [
          "Tanecik başına ortalama öteleme kinetik enerjileri eşittir.",
          "Bütün taneciklerin hızları kesin eşittir.",
          "Toplam enerjileri mol sayısı bilinmeden kesin eşittir.",
          "Molekül kütleleri zorunlu eşittir.",
          "Her taneciğin her anda kinetik enerjisi aynıdır.",
        ],
        "Ortalama ve tanecik başına koşullarını koru.",
        "3kT/2 aynı T’de aynıdır; hız dağılımı ve mol miktarı ayrı değişkenlerdir.",
      ],
      [
        "Aynı sıcaklıkta ideal A ve B için mol kütleleri 4 ve 16 g/mol. v_rms(A)/v_rms(B) kaçtır?",
        ["2", "4", "1/2", "1/4", "1"],
        "Hız oranı √(M_B/M_A).",
        "√(16/4)=2; daha hafif A daha hızlıdır.",
      ],
      [
        "İdeal gazda n, T, V aynı tutulup mol kütlesi 4’ten 16 g/mol’e çıkarılıyor. Basınç ve v_rms için sonuç nedir?",
        [
          "Basınç aynı; v_rms yarıya iner.",
          "Basınç dört kat; hız aynı.",
          "Basınç yarı; hız iki kat.",
          "İkisi de dört kat artar.",
          "İkisi de zorunlu sıfır olur.",
        ],
        "PV=nRT’de M yok; v_rms’de √M var.",
        "İdeal basınç nRT/V ile sabit; hız 1/√M nedeniyle 1/2 olur.",
      ],
      [
        "Gazın basıncı 150000 Pa, duvar parçası alanı 4×10⁻⁴ m². P=F/A ile dik kuvvet kaç N?",
        ["60", "600", "6", "0,6", "375"],
        "Basıncı alanla çarp.",
        "Alan zaten m² cinsindedir. F=PA=150000×0,0004=60 N; Pa×m² birimi N verir. Toplam kuvvet ile 150000 Pa basınç sayısı aynı nicelik değildir.",
      ],
      [
        "0,20 mol O₂ için N_A=6,0×10²³ mol⁻¹. O atomu sayısı kaçtır?",
        ["2,4×10²³", "1,2×10²³", "6,0×10²³", "0,6×10²³", "4,0×10²³"],
        "Önce molekül, sonra iki atom çarpanı.",
        "0,20×6,0×10²³×2=2,4×10²³ O atomu.",
      ],
      [
        "Bir gaz örneği için kritik sıcaklığın üzerinde bulunulduğu veriliyor. “Yalnız basıncı artırarak mutlaka sıradan sıvı-gaz faz sınırından sıvı elde edilir” iddiası için hangisi doğrudur?",
        [
          "Genelleme geçersizdir; kritik sıcaklık koşulu önemlidir.",
          "Her sıcaklıkta aynı kaynama basıncı vardır.",
          "Bütün gerçek gazlar sıfır öz hacimli taneciktir.",
          "Kritik sıcaklık yalnız atom numarası adıdır.",
          "Basınç uygulamak sıcaklığı zorunlu sıfır yapar.",
        ],
        "Yüksek basınç yeterli mi, sıcaklık koşulu ne?",
        "Kritik sıcaklık üstünde yalnız basınçla klasik sıvı-gaz geçişi beklenmez. İdeal varsayım gerçek faz davranışının tamamı değildir.",
      ],
      [
        "Gaz çarpışmalarının elastik kabul edilmesi hangi anlamdadır?",
        [
          "Çarpışmada toplam kinetik enerji korunur; tek tek tanecik hızları değişebilir.",
          "Her taneciğin hız yönü ve büyüklüğü asla değişmez.",
          "Proton sayıları her çarpışmada eşitlenir.",
          "Kabın duvarına hiçbir momentum aktarılmaz.",
          "Gaz molekülleri çarpışınca zorunlu kimyasal bağ kurar.",
        ],
        "Toplam korunumu tek taneciğin sabitliğiyle karıştırma.",
        "Elastik çarpışma enerji bilançosu koşuludur. Hız ve momentum dağılımı değişebilir; bu basınç mekanizmasıyla uyumludur.",
      ],
    ],
    minutes: 48,
    strategies: [
      "Dönüşümü iki farklı birim yoluyla denetle.",
      "Enerji eşitliğini kütle-hız ilişkisiyle birlikte kullan.",
      "Alanı SI birimine çevir, P=F/A uygula.",
      "Sayılacak varlığı molekül ve atom olarak ayrı adlandır.",
    ],
  },
  {
    id: "ayt-gaz-yasalari",
    topic: "detail-414",
    title: "Gaz yasaları: sabitleri seç, grafiği açıkla",
    objectives: [
      "Boyle, Charles, Gay-Lussac ve Avogadro ilişkilerini koşullarıyla seç.",
      "Birleşik değişim ve aynı sıcaklıkta kap birleştirme hesabını kur.",
      "Grafik ekseni, Kelvin, mutlak basınç ve birim tutarlılığını denetle.",
    ],
    source:
      "MEBİ AYT Kimya, gaz yasaları ve ideal gaz denklemi; OGM Dersler Cepte gaz yasaları/ideal gaz; Aurelia gaz kağıdı temel sınır karşılaştırması. Tam koşullu özgün örnekler, sayısal grafikler ve öğretim soruları.",
    sections: [
      [
        "İşlemden önce sabitleri yaz",
        "İdeal gaz yasası PV=nRT aynı dengedeki dört büyüklüğü birbirine bağlar. Bir değişkenin etkisini ayırabilmek için hangi diğer değişkenlerin sabit kaldığını belirtmek gerekir. Sıcaklık artıyor cümlesi tek başına hem basıncın hem hacmin hangi oranda değişeceğini söylemez.",
        "İki durum için P₁V₁/(n₁T₁)=P₂V₂/(n₂T₂)=R yazılabilir. Gaz ideal yaklaşıma uyuyor, basınç mutlak ve sıcaklık Kelvin olmalıdır. Gaz kaybı, tepkime, yoğuşma veya değişen koşulları sabit n varsayımının içine gizleme.",
      ],
      [
        "Boyle: sabit n ve T",
        "n ve T sabitken PV sabittir. Hacim yarıya indiğinde basınç iki katına çıkar. P–V grafiği ters orantılı bir eğri, P–1/V grafiği ise doğru orantı doğrusudur. Grafikte hangi eksenin V, hangisinin 1/V olduğunu okumadan doğru/eğri kararı verme.",
        "Bu koşullarda P₁V₁=P₂V₂ kullanılır. Aynı birimler iki tarafta da kullanılıyorsa hacmi mutlaka litreye çevirmek gerekmez; ancak bir taraf mL öteki L bırakılamaz. PV’nin sabit olması basınçla hacmin toplamının sabit olduğunu söylemez.",
      ],
      [
        "Charles: hareketli sınır ve sabit P",
        "n ve P sabitken V/T sabittir. Mutlak sıcaklık iki katına çıkarsa hacim iki kat olur. V–T(K) grafiğinin ideal uzantısı orijinden geçer; bu fiziksel sistemi 0 K’ye kadar aynı gaz fazında sürdürme deneyi değildir.",
        "Sürtünmesiz piston, sabit dış yük ve mekanik denge koşullarıyla sabit basınç modeline örnek olabilir. Gerçek balonda zar gerilimi değişebileceğinden esnek sözcüğü tek başına tam sabit P garantisi değildir. Soruda sabit basınç kabulü verilmişse hesap o ideal sınırda yapılır.",
      ],
      [
        "Gay-Lussac: sabit hacimde ısıtma",
        "n ve V sabitken P/T sabittir. Aynı kapta 300 K’den 450 K’ye geçen gazın basıncı 1,5 katına çıkar. Bu, çarpışma ve hız dağılımının sıcaklıkla değişmesine ilişkin makroskopik sonuçtur. Formülde V/T değil P/T kullanılmalıdır.",
        "Çelik kap veya sabit hacimli kap ifadesi verilen ideal hesapta hacmin sabit olduğunu anlatır; kabın gerçek genleşmesi ihmal edilir. Basınç artışını hacim artışıyla açıklamak bu modelin koşulunu bozar. Aynı T artışı sabit basınç koşulunda başka değişkende görünür.",
      ],
      [
        "Avogadro: miktarı değiştirirken basıncı izle",
        "P ve T sabitken V/n sabittir. 0,50 mol gaz 10 L kaplıyorsa aynı koşullarda 1,50 mol gaz 30 L kaplar. Eşit P, T’de eşit hacimler ideal yaklaşımda eşit mol ve eşit sayıda tanecik içerir; eşit kütle içermek zorunda değildir.",
        "n miktarı artarken V de sabit tutulursa bu Avogadro deneyi değildir; basınç artar. Madde eklemek kimyasal tepkime veya yoğuşmaya yol açıyorsa son gaz molü ayrıca hesaplanmalıdır. Kütle verilince önce n=m/M adımıyla hangi miktarın değiştiğini bul.",
      ],
      [
        "Miktar ile basınç ve kısmi basınç",
        "V ve T sabitken P/n sabittir. Bir ideal gaz karışımında her türün kısmi basıncı P_i=n_iRT/V, toplamı P_toplam=ΣP_i olur. Okul kaynaklarında miktar–basınç ilişkisi Dalton başlığı altında da özetlenebilir; kısmi basınç tanımı aynı ideal çerçeveyle bağlanır.",
        "Bir gazın karışımdaki mol kesri x_i=n_i/n_toplam ise P_i=x_iP_toplam yazılır. Bu, gazların tepkime vermediği ve aynı kapta aynı T’yi paylaştığı koşuldadır. Hangi türün mol sayısının arttığını bilmiyorsan yalnız toplam basınçtan tek tek türlerin bütün miktarları bulunmaz.",
      ],
      [
        "Kapları birleştirmede eksik sıcaklık tuzağı",
        "Birbirine bağlanan sabit hacimli kaplarda tepkime yok, tüm gazlar başlangıçta ve sonda aynı T’deyse toplam mol korunumu P₁V₁+P₂V₂=P_son(V₁+V₂) verir. Boş bağlı bir hacim varsa onun erişilebilir hacmi de sona eklenir.",
        "Başlangıç sıcaklıkları farklıysa bu kısa toplamı koşulsuz kullanma. Önce n_i=P_iV_i/(RT_i) ile molleri bulmak, son sıcaklık ve hacimle P_son hesaplamak gerekir. Isı alışverişi bilgisi olmadan son T’yi varsaymak tek bir sayısal sonucu haksız biçimde kesinleştirir.",
      ],
      [
        "İdeal gaz sabitini birimiyle seç",
        "R≈0,082 L·atm/(mol·K) kullanılıyorsa P atm, V L, T K ve n mol yazılır. SI R≈8,314 J/(mol·K) için P Pa ve V m³ uygundur. Aynı fiziksel denkleme farklı sayısal R koyarken birimlerin değiştiğini de göstermek gerekir.",
        "Normal şartlar bu soruda 0 °C ve 1 atm olarak tanımlanırsa yaklaşık 22,4 L/mol kullanılabilir. Başka standart basınç tanımları farklı molar hacim verir; bütün sıcaklık-basınçlarda 1 mol gaz 22,4 L yer kaplar sonucu yoktur. Kullanılan yaklaşım ve koşul kartın içinde verilmeli.",
      ],
      [
        "Yoğunluk denklemi neyi birleştirir?",
        "PV=(m/M)RT ve d=m/V birlikte kullanılırsa PM=dRT, yani d=PM/(RT) elde edilir. Aynı P, T’de ideal gaz yoğunluğu mol kütlesiyle doğru orantılıdır. Bu, aynı koşullarda eşit hacimlerin eşit mol fakat farklı kütle taşıyabilmesiyle tutarlıdır.",
        "Yoğunluğun birimi g/L ise M g/mol ve uygun L·atm temelli R birlikte kullanılabilir. Yoğunluk oranından M oranı çıkarırken P ve T’nin gerçekten aynı olduğunu kontrol et. Yalnız bir gazın yoğunluğu büyük diye onun moleküllerinin aynı T’de daha hızlı olduğunu söyleme; hız ilişkisi ters yöndedir.",
      ],
      [
        "Grafikte eğimi sabitlerle oku",
        "V–T(K) doğrusunda n sabitken eğim nR/P’dir; basınç büyükse eğim daha küçüktür. P–T(K) doğrusunda V sabitken eğim nR/V’dir; mol sayısı büyükse eğim daha büyüktür. Her iki durumda grafiğin hangi koşulda çizildiğini yazmadan doğruları sıralama.",
        "Santigrat eksenindeki doğruyu 0 °C’den sıfır hacimle başlatmak yanlıştır; ideal matematiksel uzantı yaklaşık −273,15 °C’ye gider. Bu uygulamanın sayısal grafiklerinde Kelvin ekseni ve pozitif çalışma aralığı açık görünür. Bir doğrunun uzantısı gerçek faz değişimini ortadan kaldırmaz.",
      ],
      [
        "Birden çok değişimi oranla kur",
        "Başlangıca göre mol oranı n₂/n₁, sıcaklık oranı T₂/T₁ ve ters hacim oranı V₁/V₂ birlikte basınç oranını verir: P₂/P₁=(n₂/n₁)(T₂/T₁)(V₁/V₂). Önce yön tahmini yap: daha çok mol ve daha yüksek T basıncı artırır; daha büyük V azaltır.",
        "İki etki birbirini dengeleyebilir; tek etkeni görüp sonuç ilan etme. Örneğin T iki kat, V iki kat ve n sabitse P aynı kalır. Basit özel yasalar bu genel bağıntının sabitleri doğru seçilmiş durumlarıdır; dört ayrı ezber gibi kopuk öğrenilmeleri gerekmez.",
      ],
      [
        "Tahminini veriyle sınayıp yeniden anlat",
        "Yasa gezgininde önce bir deneyi seç ve yalnız izin verilen değişkeni değiştir. Başlangıç–son sayıları, sabitleri, noktanın grafikteki yerini ve HTML sonucunu birlikte karşılaştır. Sonra birleşik değişimde birden çok etkiyi açıp tahmininin hangi varsayımını değiştirdiğini yaz.",
        "Bir sonraki tekrarda yasa adını görmeden verilen koşullardan doğru ilişkiyi kendin seç. Sonuç birimini, büyüme-küçülme yönünü ve yaklaşık büyüklüğü bağımsız kontrol et. Deneme için süreyi kısaltmadan önce koşul seçiminin doğruluğunu oturtmak, yalnız işlemi hızlandırmaktan daha güvenilir ilerleme sağlar.",
      ],
    ],
    examples: [
      [
        "İzoterm sıkıştırma",
        "İdeal gaz sabit n, T’de 1,4 atm ve 6 L’den 3 L’ye getiriliyor. Son basınç nedir?",
        [
          "Sabitler n, T olduğundan Boyle bağıntısı P₁V₁=P₂V₂ seçilir.",
          "P₂=(1,4×6)/3=2,8 atm hesaplanır.",
          "Hacim yarıya indiği için basıncın iki kat olması yön ve oran kontrolünü sağlar.",
        ],
        "2,8 atm",
        "1,4×6=2,8×3=8,4 L·atm.",
        "Sıcaklık sabitliği verilmeden bu bağıntıyı zorla seçme.",
      ],
      [
        "Santigrat ile oran kurma",
        "Bu soruda T=t+273 yaklaşımı kullanılacak. İdeal gaz sabit n, P’de 27 °C’de 6 L. 127 °C’de hacmi nedir?",
        [
          "Sıcaklıklar 300 K ve 400 K’ye çevrilir.",
          "V₁/T₁=V₂/T₂; V₂=6×400/300=8 L olur.",
          "Mutlak sıcaklık 4/3 kat, hacim de 4/3 kattır; 127/27 oranı kullanılmaz.",
        ],
        "8 L",
        "6/300=8/400.",
        "Celsius artışını mutlak sıcaklık oranı sanma.",
      ],
      [
        "Aynı anda üç etki",
        "İdeal gazın başlangıç basıncı 2 atm. Son durumda mol başlangıcın yarısı, T 300 K’den 450 K’ye, V 6 L’den 3 L’ye geçiyor. Son basınç nedir?",
        [
          "Genel oran P₂/P₁=(n₂/n₁)(T₂/T₁)(V₁/V₂) seçilir.",
          "Oran(1/2)×(450/300)×(6/3)=1,5 olur.",
          "P₂=2×1,5=3 atm. Mol azalmasının basıncı düşürmesi diğer iki artışla birlikte değerlendirilmiştir.",
        ],
        "3 atm",
        "P₂V₂/(n₂T₂) başlangıçla aynı R oranını verir.",
        "Gaz miktarının yarıya indiği bilgiyi sabit n formülünde kaybetme.",
      ],
      [
        "Bağlanan iki kap",
        "Aynı T’de tepkime vermeyen ideal gazlar: birinci sabit kap 2 L/3 atm, ikinci 4 L/0,5 atm. Kaplar bağlanıyor; son T aynı, toplam hacim 6 L. Son basınç nedir?",
        [
          "Mol korunumu aynı T’de P₁V₁+P₂V₂=P_sonV_son biçimine gelir.",
          "Toplam PV=3×2+0,5×4=8 L·atm olur.",
          "P_son=8/6=4/3 atm; basınçların aritmetik ortalaması değil hacim ağırlıklı sonuçtur.",
        ],
        "4/3 atm",
        "Son basınç 0,5 ile 3 atm arasında.",
        "Başlangıç sıcaklıkları farklıysa bu kısa yolu aynen kullanma.",
      ],
    ],
    recall: [
      ["Boyle için hangi sabitler gerekir?", "n ve T."],
      ["Sabit V, n’de hangi oran sabittir?", "P/T; sıcaklık Kelvin."],
      [
        "Aynı P, T’de eşit hacimler eşit kütle mi?",
        "Eşit mol/tanecik sayısı; M farklıysa kütle farklı olabilir.",
      ],
      ["T ve V birlikte iki kat olursa n sabitken P?", "Aynı kalır."],
    ],
    questions: [
      [
        "İdeal gaz n, T sabitken 1,8 atm ve 5 L hacme sahip. Hacim 3 L olursa basınç kaç atm’dir?",
        ["3", "1,08", "1,8", "5,4", "0,6"],
        "P₁V₁=P₂V₂ kullan.",
        "P₂=1,8×5/3=3 atm. Hacim azalınca P artar.",
      ],
      [
        "Bu soruda T=t+273 kullanılacak. İdeal gaz sabit n, P’de 27 °C’de 9 L. 127 °C’de kaç L olur?",
        ["12", "18", "27", "9", "3"],
        "300 K ve 400 K ile oran kur.",
        "Sabit n, P’de V/T sabittir. Sıcaklıklar 300 K ve 400 K; V₂=9×400/300=12 L olur. Hacim mutlak sıcaklıkla 4/3 kat artar; 127/27 oranı kullanılmaz.",
      ],
      [
        "İdeal gaz sabit n, V’de 300 K sıcaklıkta 1,2 atm. 600 K’de kaç atm’dir?",
        ["2,4", "0,6", "1,2", "3,6", "4,8"],
        "Sabit n ve V koşulunda P/T oranını kullan.",
        "T iki katına çıkınca P de iki kat olur:2,4 atm.",
      ],
      [
        "İdeal gaz P, T sabitken 0,40 mol için 8 L kaplıyor. 1,20 mol aynı koşullarda kaç L kaplar?",
        ["24", "8", "12", "16", "2,67"],
        "V/n sabit; mol üç kat.",
        "Sabit P, T’de V/n sabittir. Mol miktarı 1,20/0,40=3 kat olduğu için hacim 8×3=24 L’dir. Bu çıkarım eşit kütle varsayımı gerektirmez; değişen nicelik moldür.",
      ],
      [
        "İdeal gaz T, V sabitken mol miktarı 0,20’den 0,50’ye çıkıyor. Başlangıç basıncı 0,8 atm. Son basınç kaç atm?",
        ["2", "0,32", "0,8", "1,25", "4"],
        "Sabit V ve T koşulunda P/n oranını kullan.",
        "V ve T sabitken P/n sabittir. Mol miktarı 0,50/0,20=2,5 kat artar; basınç 0,8×2,5=2 atm olur. Hacim de değişseydi bu tek oran yeterli olmazdı.",
      ],
      [
        "İdeal gaz için n sabit, T ve V birlikte iki katına çıkarılıyor. P₂/P₁ nedir?",
        ["1", "2", "4", "1/2", "1/4"],
        "P oranında T oranını V oranına böl.",
        "P₂/P₁=2/2=1. İki etki dengelenir.",
      ],
      [
        "İdeal gazda başlangıç P=1,5 atm. n iki kat, T 300’den 450 K’ye, V 4’ten 6 L’ye geçiyor. Son P kaç atm?",
        ["3", "1,5", "2,25", "4,5", "6"],
        "Genel oran üç çarpan içerir.",
        "P₂=1,5×2×(450/300)×(4/6)=3 atm.",
      ],
      [
        "Aynı T’de tepkimesiz ideal gazlar 2 L’de 2 atm ve 3 L’de 1 atm. Kaplar bağlanınca toplam 5 L, son T aynı. Son basınç kaç atm?",
        ["1,4", "1,5", "3", "0,6", "7"],
        "PV katkılarını topla, son hacme böl.",
        "Başlangıç ve son T aynı olduğundan toplam mol, PV katkılarıyla korunur. (2×2+1×3)/5=1,4 atm bulunur. Sonuç 1 ile 2 atm arasındadır; basınçların basit aritmetik ortalaması değildir.",
      ],
      [
        "İdeal gaz için P=1 atm, T=300 K, M=24,6 g/mol, R=0,082 L·atm/(mol·K). d=PM/(RT) ile yoğunluk kaç g/L?",
        ["1", "24,6", "0,082", "300", "2"],
        "RT=24,6 L·atm/mol hesapla.",
        "d=PM/(RT) bağıntısında RT=0,082×300=24,6 L·atm/mol. Böylece d=24,6/24,6=1 g/L olur. Verilen M ve R birimleri gram/litre yoğunluğuyla uyumludur.",
      ],
      [
        "İdeal gazlarda aynı P, T altında eşit hacimde He ve CO₂ örnekleri var. Hangisi kesin eşittir?",
        [
          "Mol sayısı",
          "Kütle",
          "Tanecik başına kütle",
          "Bütün taneciklerin hızı",
          "Örneklerin gram yoğunluğu",
        ],
        "Avogadro ilişkisini M bilgisine karıştırma.",
        "V/n=RT/P aynı olduğundan eşit V, eşit n verir. M farklı olduğunda kütle/yoğunluk eşit olmak zorunda değildir.",
      ],
    ],
    minutes: 58,
    strategies: [
      "Sabitleri doğrula, ters hacim oranını uygula.",
      "İki sıcaklığı da Kelvin’e çevir.",
      "Mol, mutlak sıcaklık ve ters hacim oranlarını birlikte çarp.",
      "Aynı sıcaklıkta PV katkılarından mol korunumunu kur.",
    ],
  },
];
export const forge017ChemistryBTopics: Record<string, string> =
  Object.fromEntries(dataB017.map((u) => [u.id, u.topic]));
export const forge017ChemistryBGuides: LessonGuide[] = dataB017.map((u) => ({
  id: u.id,
  minutes: u.minutes,
  objectives: u.objectives,
  source: u.source,
  sections: u.sections.map(([title, a, b]): GuideSection => ({
    title,
    paragraphs: [a, b],
  })),
  examples: u.examples.map(
    ([title, prompt, steps, answer, check, pitfall], i): WorkedExample => ({
      title,
      prompt,
      strategy: u.strategies[i],
      steps: steps.map((explanation, j) => ({
        label: ["Koşulu ayır", "İlişkiyi kur", "Sonucu denetle"][j],
        explanation,
      })),
      answer,
      check,
      pitfall,
    }),
  ),
  recall: u.recall.map(([prompt, answer]) => ({ prompt, answer })),
}));
export const forge017ChemistryBLessons: Lesson[] = dataB017.map((u) => ({
  id: u.id,
  subjectId: "ayt-kimya",
  title: txt(u.title),
  minutes: u.minutes,
  objectives: u.objectives.map(txt),
  source: txt(u.source),
  tags: [u.id, "kaynakli", "forge017"],
  body: u.sections.map(([title, a, b]) => ({
    title: txt(title),
    text: txt(a + "\n\n" + b),
  })),
  questions: u.questions.map(
    ([prompt, choices, hint, explanation], i): Question => {
      const rotation = (i * 2 + 1) % 5,
        correct = choices[0],
        options = [...choices.slice(rotation), ...choices.slice(0, rotation)];
      return {
        id: `f017-chem-b-${u.id}-${i + 1}`,
        prompt: txt(prompt),
        options: options.map(txt),
        answer: options.indexOf(correct),
        hint: txt(hint),
        explanation: txt(explanation),
        skill: `f017-chem-b-${u.id}`,
      };
    },
  ),
}));
