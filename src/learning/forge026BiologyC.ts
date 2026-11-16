import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";
function integerC026(
  value: unknown,
  min: number,
  max: number,
): asserts value is number {
  if (
    typeof value !== "number" ||
    !Number.isSafeInteger(value) ||
    value < min ||
    value > max
  )
    throw new RangeError("BIOC026_INTEGER");
}
function booleanC026(value: unknown): asserts value is boolean {
  if (typeof value !== "boolean") throw new RangeError("BIOC026_BOOLEAN");
}
function choiceC026(
  value: unknown,
  choices: readonly string[],
): asserts value is string {
  if (typeof value !== "string" || !choices.includes(value))
    throw new RangeError("BIOC026_CHOICE");
}
/** Explicit peptide backbone graph. Folding changes drawing coordinates, never connectivity. */
export function proteinGraphC026(
  length: number,
  topology: string,
  cutMask: number,
  pattern: number,
  folded: boolean,
) {
  integerC026(length, 3, 9);
  choiceC026(topology, ["line", "ring"]);
  integerC026(pattern, 0, 2);
  booleanC026(folded);
  const edgeCount = topology === "ring" ? length : length - 1;
  integerC026(cutMask, 0, 2 ** edgeCount - 1);
  const patterns = [
    ["G", "A", "S"],
    ["G", "S", "A"],
    ["A", "G", "S"],
  ] as const;
  const sequence = Array.from({ length }, (_, i) => patterns[pattern][i % 3]);
  const links = Array.from({ length: edgeCount }, (_, i) => ({
    a: i,
    b: (i + 1) % length,
    cut: (cutMask & (1 << i)) !== 0,
  }));
  const neighbours = Array.from({ length }, () => [] as number[]);
  for (const link of links)
    if (!link.cut) {
      neighbours[link.a].push(link.b);
      neighbours[link.b].push(link.a);
    }
  const seen = new Set<number>(),
    groups: number[][] = [];
  for (let start = 0; start < length; start++)
    if (!seen.has(start)) {
      const pending = [start],
        group: number[] = [];
      while (pending.length) {
        const at = pending.pop()!;
        if (seen.has(at)) continue;
        seen.add(at);
        group.push(at);
        for (const next of neighbours[at])
          if (!seen.has(next)) pending.push(next);
      }
      groups.push(group.sort((a, b) => a - b));
    }
  const cuts = links.filter((x) => x.cut).length,
    peptideBonds = edgeCount - cuts;
  const masses = { G: 75, A: 89, S: 105 },
    freeMass = sequence.reduce((sum, aa) => sum + masses[aa], 0),
    initialMass = freeMass - 18 * edgeCount;
  return {
    length,
    topology,
    cutMask,
    pattern,
    folded,
    sequence,
    links,
    groups,
    cuts,
    peptideBonds,
    fragments: groups.length,
    freeUnits: neighbours.filter((x) => x.length === 0).length,
    hydrolysisWater: cuts,
    freeMass,
    initialMass,
    fragmentMass: freeMass - 18 * peptideBonds,
    scope:
      "G glisin, A alanin, S serindir. Nokta bir amino asit kalıntısı, çizgi peptit bağlantısıdır. Açık zincir ve uçları peptit bağıyla kapatılmış örnek halka ayrı modellerdir; her protein halkalı değildir. Kesim kutuları yalnız seçilen bağı hidroliz eder. Katlı/açık çizim molekülün gerçek atom konumu veya deneyle kanıtlanmış işlevi değildir. Kütle hesabında verilen yuvarlak serbest amino asit kütleleri G=75, A=89, S=105 g/mol ve bağ başına18 g/mol su kullanılır; gerçek ribozomal sentezin bütün basamakları modellenmez.",
  };
}
/** Illustrative reversible competitive initial-rate law at fixed temperature and pH. */
export function enzymeRateC026(
  substrate: number,
  enzyme: number,
  inhibitor: number,
  active: boolean,
) {
  integerC026(substrate, 0, 40);
  integerC026(enzyme, 0, 4);
  integerC026(inhibitor, 0, 3);
  booleanC026(active);
  const maximum = active ? 2 * enzyme : 0,
    apparentConstant = 2 * (1 + inhibitor),
    rateAt = (s: number) => (maximum * s) / (apparentConstant + s);
  return {
    substrate,
    enzyme,
    inhibitor,
    active,
    maximum,
    apparentConstant,
    rate: rateAt(substrate),
    points: Array.from({ length: 41 }, (_, s) => ({
      substrate: s,
      rate: rateAt(s),
    })),
    scope:
      "Özgün başlangıç hızı modeli v=2ES/[2(1+I)+S]. E etkin enzim miktarı, S başlangıç substrat derişimi, I tersinir rekabetçi engelleyici basamağıdır; ölçekler bu örneğe aittir. Sıcaklık, pH ve hacim sabit, erken ölçümde substrat tükenmesi ihmal edilir. Etkin değil seçiminde enzim katkısı0; enzimsiz arka plan hızı bu ölçekte ihmal edilir. Her enzim veya her inhibitör için evrensel bağıntı değildir.",
  };
}
export function energyProfileC026(profile: number, lowering: number) {
  integerC026(profile, 0, 1);
  integerC026(lowering, 0, 40);
  const initial = profile === 0 ? 30 : 10,
    final = profile === 0 ? 10 : 30,
    uncatalysedPeak = initial + 70,
    catalysedPeak = uncatalysedPeak - lowering;
  return {
    profile,
    lowering,
    initial,
    final,
    uncatalysedPeak,
    catalysedPeak,
    delta: final - initial,
    withoutForward: 70,
    withForward: 70 - lowering,
    withoutReverse: uncatalysedPeak - final,
    withReverse: catalysedPeak - final,
    scope:
      "İki özgün enerji profili; düşey eksen kJ/mol, yatay tepkime ilerleyişidir, zaman değildir. Parçalı çizgiler atomik mekanizma veya ölçülmüş enzim verisi değildir. Enzimli ve enzimsiz yolun başlangıcı/ürünü aynı; engel azaltımı iki yönde de aynıdır. Net enerji farkı ve aynı koşullardaki denge konumu yalnız katalizörle değişmez.",
  };
}
export const temperatureSamplesC026 = [10, 20, 30, 40, 50, 60, 70] as const;
export const pHSamplesC026 = [2, 4, 6, 8, 10] as const;
export function enzymeConditionsC026(
  temperatureIndex: number,
  pHIndex: number,
) {
  integerC026(temperatureIndex, 0, 6);
  integerC026(pHIndex, 0, 4);
  const temperatureRates = [
      [1, 3, 7, 10, 4, 1, 0],
      [0, 1, 2, 4, 7, 10, 6],
    ],
    pHRates = [
      [2, 6, 10, 5, 1],
      [0, 2, 5, 10, 3],
    ];
  const rows = temperatureSamplesC026.map((temperature, i) => ({
    temperature,
    x: (temperatureRates[0][i] * pHRates[0][pHIndex]) / 10,
    y: (temperatureRates[1][i] * pHRates[1][pHIndex]) / 10,
  }));
  const x = rows[temperatureIndex].x,
    y = rows[temperatureIndex].y;
  return {
    temperatureIndex,
    pHIndex,
    temperature: temperatureSamplesC026[temperatureIndex],
    pH: pHSamplesC026[pHIndex],
    rows,
    pHRates,
    x,
    y,
    winner: x > y ? "X" : x < y ? "Y" : "tie",
    scope:
      "X ve Y adlı iki varsayımsal enzim için özgün veri tablosu. Başlangıç substratı, etkin enzim miktarı ve ölçüm süresi eşittir. Sıcaklık tablosu ile verilen pH çarpanı bu sonlu öğretim modelinde çarpılır; gerçek enzimlerde etkenlerin bağımsız olduğu genellenmez. Çizgiler yalnız veri noktalarını birleştirir; aradaki kesin hız veya gerçek optimumu kanıtlamaz. Bir örneğin en yüksek ölçümü bütün enzimlere37°C optimumu vermez.",
  };
}
/** Unmeasured water is unknown, except when conservation itself forces zero. */
export function vitaminBalanceC026(
  initial: number,
  solid: number,
  water: number,
  measured: boolean,
  keepWater: boolean,
) {
  integerC026(initial, 0, 120);
  integerC026(solid, 0, initial);
  integerC026(water, 0, initial - solid);
  booleanC026(measured);
  booleanC026(keepWater);
  const unaccounted = initial - solid,
    chemicalLoss = measured
      ? unaccounted - water
      : unaccounted === 0
        ? 0
        : null,
    retained = keepWater
      ? measured
        ? solid + water
        : unaccounted === 0
          ? initial
          : null
      : solid;
  return {
    initial,
    solid,
    water: measured ? water : unaccounted === 0 ? 0 : null,
    measured,
    keepWater,
    chemicalLoss,
    retained,
    minimumChemicalLoss: chemicalLoss ?? 0,
    maximumChemicalLoss: chemicalLoss ?? unaccounted,
    minimumRetained: retained ?? solid,
    maximumRetained: retained ?? initial,
    scope:
      "Bir C vitamini örneğinde aynı keyfî miktar birimiyle üç bölme: katıda etkin kalan, suda etkin kalan, kimyasal etkinliğini yitiren. Başlangıç ve ölçüm karşılaştırılabilir; başka bölme, sızıntı veya yeni vitamin girişi yoktur. Etkinlik kaybı atomların yok olması değildir. Su ölçülmediyse ona0 yazılmaz; korunumu kullanarak aralık bulunur. Suyu dökmek suya geçen molekülün parçalanması değildir. Sayılar kişisel beslenme gereksinimi veya doz değildir.",
  };
}
export const vitaminSamplesC026 = [
  {
    id: "A",
    name: "A",
    solubility: "fat",
    role: "Görme ve epitel işlevleri",
    note: "Hazır A biçimleriyle bazı bitkisel karotenoid öncülleri farklıdır; dönüşüm verimi koşullara bağlıdır.",
  },
  {
    id: "D",
    name: "D",
    solubility: "fat",
    role: "Kalsiyum–fosfat dengesi ve kemik mineralizasyonu",
    note: "İnsanda uygun UVB ile deride başlayan yol, karaciğer ve böbrek dönüşümleriyle ilişkilidir; bütün basamaklar deride tamamlanmaz.",
  },
  {
    id: "E",
    name: "E",
    solubility: "fat",
    role: "Özellikle lipit yapılarda antioksidan savunma",
    note: "Bu işlev, bütün hastalıkların her insanda vitaminle önleneceğini göstermez.",
  },
  {
    id: "K",
    name: "K",
    solubility: "fat",
    role: "Bazı pıhtılaşma proteinlerinin işlev kazanmasına katkı",
    note: "K vitamini pıhtılaşma proteininin veya kalsiyum iyonunun kendisi değildir.",
  },
  {
    id: "B1",
    name: "B1",
    solubility: "water",
    role: "Tiamin kökenli koenzimlerle bazı metabolik dönüşümler",
    note: "Enerji metabolizmasına yardım etmek vitaminin kalorili yakıt olması değildir.",
  },
  {
    id: "B9",
    name: "B9",
    solubility: "water",
    role: "Tek karbon aktarımı, DNA sentezi ve kan hücresi oluşumuyla ilişki",
    note: "B12 ile bazı ortak süreçleri olması iki vitaminin aynı molekül olduğunu göstermez.",
  },
  {
    id: "B12",
    name: "B12",
    solubility: "water",
    role: "DNA sentezi, kan hücresi oluşumu ve sinir işlevleriyle ilişki",
    note: "Suda çözünmesine karşın önemli vücut depoları bulunabilir. Besine bağlı B12’nin alınması serbestleşme, iç faktör ve özel bağırsak alımı basamaklarıyla ilişkilidir.",
  },
  {
    id: "C",
    name: "C",
    solubility: "water",
    role: "Kolajen yapımına ve antioksidan işlevlere katkı",
    note: "İnsan gereksinimini karşılayacak C vitaminini sentezleyemez; başka canlıların sentez yeteneği insana genellenmez.",
  },
] as const;
export function vitaminRoleC026(id: string) {
  choiceC026(
    id,
    vitaminSamplesC026.map((v) => v.id),
  );
  return {
    ...vitaminSamplesC026.find((v) => v.id === id)!,
    scope:
      "İnsan bağlamında okul düzeyi çözünürlük ve görev sınıflaması. Vitaminler farklı organik düzenleyicilerdir; yağda çözünmek trigliserit olmak, suda çözünmek hiç depolanmamak değildir. Bir eksiklik örneği tek kişide kesin tanı veya takviye dozu belirlemez.",
  };
}
export const biologyCDefaults026 = {
  length: 6,
  topology: "line",
  cutMask: 0,
  pattern: 0,
  folded: true,
  enzymeMode: "rate",
  substrate: 6,
  enzyme: 2,
  inhibitor: 0,
  active: true,
  energyProfile: 0,
  lowering: 40,
  temperatureIndex: 3,
  pHIndex: 2,
  vitaminMode: "balance",
  initial: 80,
  solid: 40,
  water: 20,
  measured: true,
  keepWater: true,
  vitamin: "B12",
  guess: "",
  reason: "",
  checked: false,
};
export function normalizeBiologyC026(raw: Record<string, unknown>) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw))
    throw new RangeError("BIOC026_STATE");
  const d = biologyCDefaults026,
    n = (k: keyof typeof d, lo: number, hi: number) =>
      Math.max(
        lo,
        Math.min(
          hi,
          Math.round(
            typeof raw[k] === "number" && Number.isFinite(raw[k])
              ? (raw[k] as number)
              : (d[k] as number),
          ),
        ),
      ),
    b = (k: keyof typeof d) =>
      typeof raw[k] === "boolean" ? (raw[k] as boolean) : (d[k] as boolean),
    s = (k: keyof typeof d, choices: readonly string[]) =>
      typeof raw[k] === "string" && choices.includes(raw[k] as string)
        ? (raw[k] as string)
        : (d[k] as string);
  const length = n("length", 3, 9),
    topology = s("topology", ["line", "ring"]),
    initial = n("initial", 0, 120),
    solid = n("solid", 0, initial);
  return {
    length,
    topology,
    cutMask: n(
      "cutMask",
      0,
      2 ** (topology === "ring" ? length : length - 1) - 1,
    ),
    pattern: n("pattern", 0, 2),
    folded: b("folded"),
    enzymeMode: s("enzymeMode", ["rate", "energy", "conditions"]),
    substrate: n("substrate", 0, 40),
    enzyme: n("enzyme", 0, 4),
    inhibitor: n("inhibitor", 0, 3),
    active: b("active"),
    energyProfile: n("energyProfile", 0, 1),
    lowering: n("lowering", 0, 40),
    temperatureIndex: n("temperatureIndex", 0, 6),
    pHIndex: n("pHIndex", 0, 4),
    vitaminMode: s("vitaminMode", ["balance", "roles"]),
    initial,
    solid,
    water: n("water", 0, initial - solid),
    measured: b("measured"),
    keepWater: b("keepWater"),
    vitamin: s(
      "vitamin",
      vitaminSamplesC026.map((x) => x.id),
    ),
    guess: typeof raw.guess === "string" ? raw.guess.slice(0, 128) : "",
    reason: typeof raw.reason === "string" ? raw.reason.slice(0, 120) : "",
    checked: raw.checked === true,
  };
}

// AUTHORED_CONTENT_BIOC026
export const forge026BiologyCGuides: LessonGuide[] = [
  {
    id: "proteinler",
    sections: [
      {
        title: "Yapı birimi amino asittir",
        paragraphs: [
          "Proteinlerin polipeptit zincirlerini amino asitler oluşturur. Standart protein sentezinde yirmi yaygın amino asit çeşidi üzerinden düşünülür; tek bir protein bunların tamamını içermek zorunda değildir. Amino asitlerin ortak iskeletindeki amino ve karboksil grupları ile değişebilen yan grup, yapı ile özellik arasında ilişki kurar.",
          "Bir polipeptitte amino asit sayısı, türleri ve sıralanışı ayrı bilgilerdir. Aynı türlerden aynı sayıda bulunması dizilerin de aynı olduğunu garanti etmez. İki diziyi karşılaştırırken harflerin yalnız toplamını değil yerlerini de eşleştir; hangi amino asidin hangisinin ardından geldiği protein yapısını etkileyebilir.",
        ],
      },
      {
        title: "Peptit bağını doğru say",
        paragraphs: [
          "Bir amino asidin karboksil bölgesiyle diğerinin amino bölgesi arasındaki kovalent bağlantı peptit bağıdır. İki amino asitten dipeptit, üçünden tripeptit oluşturulabilir. Tek, açık ve halkasız bir polipeptitte n amino asit için n−1 peptit bağı bulunur; sayımın koşulu zincirin bağlantı yapısıdır.",
          "Birden çok ayrı polipeptitte toplam bağı bulmak için toplam amino asit sayısından zincir sayısını çıkar. Bir proteindeki bütün etkileşimler peptit bağı değildir: zincir içi veya zincirler arası hidrojen bağları ve başka etkileşimler de düzeni etkiler. Onları amino asit omurgasının peptit bağı sayısına ekleme.",
        ],
      },
      {
        title: "Dizi ile şekil birlikte işlev üretir",
        paragraphs: [
          "Ribozom, amino asitleri genetik bilginin yönlendirdiği sırada polipeptide bağlar. Oluşan zincirin uygun biçimde katlanması da işlev açısından önemlidir. Bir enzimin aktif bölgesinde veya bir taşıyıcının bağlanma yerinde gerekli düzen sağlanmadığında aynı amino asit dizisi beklenen işlevi gösteremeyebilir.",
          "Bilgi → amino asit dizisi → katlanma → işlev sırası açıklayıcıdır; fakat her DNA değişiminin kesin olarak farklı protein veya işlev kaybı üreteceği söylenemez. Değişimin yerine ve türüne ilişkin veri gerekir. Bir gözlemden dizinin mi, katlanmanın mı yoksa başka koşulun mu değiştiğini ayır.",
        ],
      },
      {
        title: "Denatürasyon, tüm bağların kesilmesi değildir",
        paragraphs: [
          "Sıcaklık, pH veya başka koşullar proteinin doğal katlanma düzenini bozabilir; buna denatürasyon denir. İşlev kaybı görülebilir. Tipik denatürasyon tanımı, bütün peptit bağlarının hidrolizle ayrılarak zincirin serbest amino asitlere dönüşmesi değildir; birincil dizi çoğu böyle karşılaştırmada korunur.",
          "Hidroliz peptit bağlarını su kullanarak ayırır ve daha küçük peptitler veya amino asitler oluşturur. Bazı proteinler uygun koşullarda yeniden katlanabilir, bazıları geri dönmez. Şeklin bozulması, bağların hidrolizi ve yeniden katlanma kapasitesi ayrı deney sorularıdır; yalnız “etkinlik azaldı” verisi bunların hepsini kesinleştirmez.",
        ],
      },
      {
        title: "Tek bir görev ezberleme",
        paragraphs: [
          "Hemoglobin taşıma, keratin yapı, antikor savunma, aktin ve miyozin hareket görevleri için örneklerdir. Protein yapılı enzimler kataliz, bazı protein ve peptit hormonlar iletişim ve düzenleme işlevi görür. Proteinler yalnız kaslarda bulunmaz; hücrelerin pek çok bölümünde farklı görevler üstlenir. Zar kanal ve taşıyıcı proteinleri seçici geçişe; karbonhidrat bölümü taşıyan glikoproteinler hücrelerin tanınmasına katılabilir. Fibrinojenin fibrine dönüşmesi pıhtı ağının oluşmasına, albümin ise kan plazmasının kolloid ozmotik basıncına katkı verir. Bunlar aynı amino asit temelli molekül grubunun farklı yapı ve etkileşimlerle görev üstlenmesine örnektir.",
          "Her protein enzim, her hormon protein değildir. Proteinlerin enerji elde etmek için kullanılabilmesi de onların tek veya başlıca görevinin enerji depolamak olduğunu göstermez. Bir soruda görev örneği verilmişse bunu yapı birimiyle karıştırma: farklı görevlerin proteinleri amino asit temelli olabilir.",
        ],
      },
      {
        title: "Amino asidin ortak ve değişen kısımlarını ayır",
        paragraphs: [
          "Standart amino asitlerin merkez karbonuna amino grubu, karboksil grubu, hidrojen ve değişken yan grup bağlanır. Yan grup R ile gösterilebilir; örneğin glisinde R bir hidrojen, alaninde metil grubudur. Bu farklar moleküllerin boyutunu, kutupluluğunu ve birbirleriyle etkileşmesini etkiler.",
          "Amino asitler karbon, hidrojen, oksijen ve azot içerir; bazıları kükürt de taşır. Her amino asitte veya her proteinde kükürt bulunması zorunlu değildir. Glisinin merkez karbonunda iki hidrojen bulunduğundan her amino asidin o karbonunu koşulsuz asimetrik ilan etmek de doğru değildir.",
        ],
      },
      {
        title: "Asit ve baz grupları pH ile ilişkilendir",
        paragraphs: [
          "Karboksil ve amino grupları amino asitlerin asit–baz davranışı göstermesine katkı verir. Çözeltinin pH’ına göre taşıdıkları yükler değişebilir. Ortamdaki yüklerin değişmesi, protein zincirinin kendi içindeki ve çevresindeki etkileşimleri de etkileyebilir. Bu, pH’ın protein düzenine neden etki edebildiğini açıklayan yollardan biridir. Serbest amino asitte amino grubu uygun koşulda proton (H⁺) alabilir; karboksil grubu proton verebilir. Koşula göre asit veya baz gibi davranabilmesine amfoter özellik denir. Bu tanım her pH’ta aynı yükü taşımak anlamına gelmez.",
          "Bir molekülün net yükünün değişmesi amino asit dizisinin mutlaka değiştiğini göstermez. Diziyi oluşturan peptit omurgasıyla grupların proton alıp verme durumu farklı düzeylerdir. Soruda ayrıntılı yük hesabı gerekiyorsa gereken pH ve grup bilgileri verilmeli; yalnız isimden kesin bir yük dağılımı üretilmemelidir.",
        ],
      },
      {
        title: "Esansiyel amino asit sentez yeterliliğini anlatır",
        paragraphs: [
          "İnsanın gereksinimini karşılayacak miktarda sentezleyemediği amino asitlerin besinlerden edinilmesi gerekir; bunlara esansiyel amino asitler denir. Bu ayrım proteinin hangi tür amino asitlerden yapıldığını değil, insanın onları üretme yeterliliğini adlandırır. Esansiyel olanlar da protein sentezinde diğerleriyle birlikte kullanılabilir.",
          "Esansiyel olmayan amino asit “gereksiz” demek değildir; uygun yollardan sentezlenebilmesi anlamına gelir. Sentez yeterliliği yaşam dönemi ve bazı koşullarla değişebilir. Bu rehberin sayım deneyleri beslenme gereksinimi veya kişisel eksiklik tanısı üretmez; birimlerin dizideki yerini ve bağlarını karşılaştırır.",
        ],
      },
      {
        title: "N ve C uçları zincirin yönünü gösterir",
        paragraphs: [
          "Açık bir polipeptidin iki ucu aynı değildir. Bir uç amino bölgesiyle ilişkili N ucu, diğeri karboksil bölgesiyle ilişkili C ucu olarak adlandırılır. Bir amino asit dizisi belirli bir yönde yazılır; diziyi ters okumak çoğu durumda aynı sıra anlamına gelmez.",
          "Aynı amino asit sayısını veren iki harf dizisini konum konum karşılaştır. Dizi uzunluğu sabitse yalnız türlerin sayısını toplamak, konumsal değişimi gizleyebilir. Şemadaki harfler tam atom formülleri değil amino asit birimlerinin kısaltmalarıdır; çizgiler ise gösterilen peptit bağlantılarını belirtir.",
        ],
      },
      {
        title: "Birincil yapı ile üst düzenleri ayır",
        paragraphs: [
          "Birincil yapı polipeptitteki amino asit sıralanışıdır. İkincil yapı, omurgadaki karbonil ve N–H grupları arasındaki hidrojen bağlarıyla kararlılaşan yerel alfa helis ve beta tabaka düzenlerini kapsar. Üçüncül yapı tek polipeptidin genel üç boyutlu katlanmasıdır; yan gruplar arasındaki etkileşimler bu düzeye katkı verir. Dördüncül yapı birden çok polipeptit zincirinin işlevsel bütün oluşturmasıdır. Her protein birden çok zincir içermez; dolayısıyla her protein dördüncül yapıya sahip olmak zorunda değildir.",
          "Amino asit sayısını bilmek, bu üst düzenlerin bütün ayrıntılarını belirlemez. Bir proteinin birden çok zinciri olması zincirler arasında mutlaka peptit bağı bulunduğunu da göstermez. Bağ sayımı sorusunda polipeptit omurgasını, şekil veya işlev sorusunda ise gereken katlanma ve etkileşim bilgisini izle.",
        ],
      },
      {
        title: "Dizi değişimi ile bileşim değişimini karşılaştır",
        paragraphs: [
          "Bir amino asidin başka bir amino asitle yer değiştirmesi hem diziyi hem bileşimi değiştirebilir. İki konumdaki amino asitlerin yer değiştirmesi ise toplam bileşimi koruyup diziyi değiştirebilir. Bu nedenle “aynı amino asit türlerinden yapılmış” sözü tek bir polipeptit dizisini zorunlu kılmaz.",
          "Bir değişimin proteinin işlevine etkisi konuma, yan grubun niteliğine ve proteinin yapısına bağlıdır. Yalnız dizide bir fark görmekten kesin bir hastalık veya aynı derecede işlev kaybı sonucu çıkmaz. Verilen deney işlevi ölçüyorsa onun sonucunu, yalnız diziyi ölçüyorsa dizisel sonucu belirt.",
        ],
      },
      {
        title: "Dehidrasyon suyunu başlangıç koşuluyla say",
        paragraphs: [
          "Serbest amino asitlerden açık zincirler kurulan TYT net modelinde her yeni peptit bağı için bir su açığa çıkışı sayılır. Başta bağlı peptitler verilmişse onların mevcut bağları yeniden kurulmuş sayılmaz. Yeni zincirleri birleştiren ek bağların suyunu başlangıçtaki bütün amino asitlerden yeniden hesaplama.",
          "Bu net sayım canlıdaki protein sentezinin bütün tRNA ve enerji aktarımı basamaklarını çizmez. Soruda model açıkça belirtilirse bağ–su muhasebesi yapılır. Sentez sırasında su çıkışı ile daha sonra hidrolizde kullanılan suyu ayrı aşamalarda tut; eşit miktarlar iki işlemi birbirine özdeş yapmaz.",
        ],
      },
      {
        title: "Kısmi hidrolizde kesim yerlerini kullan",
        paragraphs: [
          "Tek bir açık polipeptitte her peptit bağı kesimi parça sayısını bir artırır. Halkadaki ilk kesim ise halkayı yalnız açar; ilk durumda parça sayısı değişmez. Serbest amino asit sayısı, kaç bağın koptuğunun yanında hangi bağların koptuğuna bağlıdır. Ortadan tek kesim iki peptit verebilir; uçtaki tek kesim bir amino asidi serbest bırakabilir.",
          "Bu nedenle serbest amino asit sorusunda bağlantı listesini, kesim yerlerini veya eşdeğer açık şemayı kullan. Parça uzunlukları toplamı başlangıç amino asit sayısını vermelidir. Bütün amino asitlerin serbest olduğu tam hidrolizde n birimli tek açık zincirin n−1 bağı ayrılmış olur.",
        ],
      },
      {
        title: "İşlev kaybının nedenini karşılaştırmayla ayır",
        paragraphs: [
          "Bir proteinin etkinliği azaldığında ilk soru, hangi koşulun değiştirildiği ve neyin ölçüldüğüdür. pH değişimi sonrası etkinlik kaybı katlanmayla ilişkili olabilir; fakat ölçüm tek başına amino asit sırasının değiştiğini göstermez. Kontrol örneği ve peptit uzunluğu gibi ek veriler farklı açıklamaları ayırır.",
          "Etkinlik eski koşula dönünce geri geliyorsa bu deneyde geri dönüşe ilişkin kanıt vardır. Geri gelmemesi de bütün proteinlerin her koşulda geri dönüşsüz olduğu sonucunu vermez. Bir gözlemi bütün proteinlere taşımadan önce kapsamını koru; aynı tür proteinin bile işlem koşulları farklı olabilir.",
        ],
      },
      {
        title: "Proteinlerin yenilenmesini bağ düzeyinde düşün",
        paragraphs: [
          "Hücreler proteinleri sentezler ve gerektiğinde parçalar; aynı protein molekülü sonsuza dek değişmeden kalmaz. Protein yapılı bir enzimin bir çevrim sonunda yeniden kullanılabilmesi, onun zamanla hasar görmeyeceği veya hücrede yenilenmeyeceği anlamına gelmez. Çevrim ile molekülün ömrü farklı zaman ölçekleridir.",
          "Proteinin hidroliziyle oluşan amino asitler başka sentezlerde kullanılabilir. Yeniden kullanılan birimlerin aynı sırayla bağlanması zorunlu değildir; bunu genetik bilgi ve hücresel süreçler yönlendirir. Ortak amino asit havuzu, bütün proteinlerin aynı molekül olduğu iddiasını desteklemez.",
        ],
      },
      {
        title: "Protein miktarı ile protein çeşidini ayır",
        paragraphs: [
          "Bir örnekteki toplam protein miktarı, kaç farklı protein türü bulunduğunu tek başına belirlemez. Aynı kütle, farklı uzunluk ve çeşitlerdeki protein karışımlarıyla sağlanabilir. Tür veya görev tanısı için dizi, bağlanma ya da işleve özgü ek ölçümler gerekir.",
          "Bir deney belirli koşullarda belirli bir proteine duyarlıysa sonucu bütün proteinlere genelleme. Toplam amino asit sayısı ve toplam peptit bağı sayısı bile zincirlerin ayrıntılı sırasını vermez. Hangi niceliğin ölçüldüğünü başlık, birim ve kullanılan varsayımla birlikte oku.",
        ],
      },
      {
        title: "Şekil çizimi atomik yapı kanıtı değildir",
        paragraphs: [
          "Şemada zincirin katlı ve açık görünümü aynı amino asit sırasıyla çizilebilir. Görünüm değişince peptit bağlarını otomatik olarak kesmek doğru değildir; hidroliz ayrı bir işlemdir. Çizimdeki bir nokta bir amino asit birimidir, gerçek atomların tek tek koordinatı değildir.",
          "Katlı görünümü seçmek gerçek bir denatürasyon deneyinin ardından her proteinin kendiliğinden eski işlevine döneceği anlamına gelmez. Bu etkinlik yalnız bağlantı ile şekil ayrımını gösterir. İşlevsel yapı için gerçek molekülün çok sayıda etkileşimi ve çevre koşulları gerekir; kısa harf dizisi bunların hepsini belirlemez.",
        ],
      },
      {
        title: "Dizi, bağ ve işlev için ayrı sonuç yaz",
        paragraphs: [
          "Önce amino asit sayısı ile sırasını, sonra zincir ve kesim yerlerini, en son sorulan katlanma veya işlev verisini incele. Sayım için bağ ve su muhasebesini; dizi için konum eşleştirmesini; işlev için gerçekten verilmiş deney sonucunu kullan. Bir bilgi düzeyinden diğerini koşulsuz çıkarma.",
          "SVG’nin altında sıra, bağlantılar, kopan bağlar ve parça uzunlukları HTML olarak da bulunur. Sayısal tahminin modelle kıyaslanması yazdığın gerekçenin bilimsel doğruluğunu otomatik değerlendirmez. Açıklamana hangi kanıtın hangi sonucu verdiğini ekle; gerekiyorsa belirlenemeyen sonucu da açıkça söyle.",
        ],
      },
      {
        title: "Halka bağlantısında ilk kesimi ayrı say",
        paragraphs: [
          "Açık bir zincirde n birim arasında n−1 bağlantı bulunur. Uçların ayrıca peptit bağıyla birleştirildiği tek halkada n bağlantı vardır. Bu, bazı peptitlerin kapalı bağlantı yapısını inceleyen ayrı bir modeldir; bütün proteinlerin halkalı olduğu veya normal katlanmanın uçlara yeni peptit bağı eklediği anlamına gelmez.",
          "Halkadaki ilk peptit bağını kesmek tek halkayı tek açık zincire dönüştürür. Parça sayısı henüz artmaz. Aynı yapıda ikinci bir bağ kesilince iki açık parça oluşur. Genel sayımı bağlantı çizgilerini izleyerek yap; yalnız kesim sayısından, başlangıçtaki çevrimi görmeden parça sayısı çıkarma.",
        ],
      },
      {
        title: "Peptit kütlesinde suyun atomlarını koru",
        paragraphs: [
          "Serbest amino asitlerden peptit kurulmasının net ders hesabında, her yeni bağ için bir su ayrılır. Verilen serbest amino asit molar kütleleri toplamından bağ sayısı×18 g/mol çıkarıldığında peptidin molar kütlesi bulunur. Bu hesap için başlangıç maddelerinin gerçekten serbest amino asitler olduğu ve başka değişim bulunmadığı açık olmalıdır.",
          "Hidroliz ters yönde su tüketir: aynı örnekte kesilen her peptit bağı için ürünlerin toplam kütlesine 18 g/mol eklenir. Zincir katlanınca kütleye yeni su eklenmez. Etkinlikte G=75, A=89, S=105 g/mol değerleri yuvarlatılmış öğretim verileridir; çizilen her parçanın toplamı ve kullanılan su birlikte korunur.",
        ],
      },
    ],
    minutes: 75,
    objectives: [
      "Amino asit bileşimi, dizisi ve katlanmayı ayrı incele.",
      "Peptit bağlarını kesim yerleriyle say; parçayı serbest amino asitten ayır.",
      "Denatürasyonu hidroliz ve zorunlu geri dönüşle karıştırma.",
    ],
    source:
      "MEBİ TYT Biyoloji konu özetleri, OGM Dersler Cepte temel bileşikler ve Aurelia ilgili notlarının gerçekten okunan bölümleriyle karşılaştırılan özgün derin anlatım. Açık koşullu bağlantı, enerji ve miktar verileri öğretim modelleridir; alıştırmalar resmî sınav sorusu değildir.",
    examples: [
      {
        title: "Seçici kesimden ürün dizisini ve kütleyi bul",
        prompt:
          "Tek kapalı peptit halkası ok yönünde A–G–S–A–G–S–(başlangıca) dizili. A alanin, G glisin, S serin; ok, omurganın N→C bağ yönünü izliyor, kapalı halkada serbest uç yok. Bu örnek proteaz yalnız A→G peptit bağlarını tamamen hidroliz ediyor; başka bağ kesmiyor. Bir mol halkadan hangi dizide kaç mol açık peptit oluşur; her ürünün molar kütlesi ve toplam kütle bilançosu nedir? Serbest A89, G75, S105; su 18 g/mol.",
        strategy:
          "Önce hedeflenen bağları halkada işaretle; yeni uçlardan ürün dizilerini oku, sonra her açık ürünün kütlesini hesapla.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Halkadaki iki A→G bağı kesilir. Her yeni G amino ucu olur; ok yönünde G–S–A okunur ve sonraki kesimde ürün biter. Bir mol halkadan aynı dizide iki mol G–S–A çıkar.",
          },
          {
            label: "2. adım",
            explanation:
              "Her açık üçlüde iki peptit bağı vardır. M(G–S–A)=75+105+89−2×18=233 g/mol; ürünlerin toplam kütlesi 2×233=466 g olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Başlangıç halkasında altı bağ vardır: Mhalka=2×(89+75+105)−6×18=430 g/mol. Kesilen iki bağ için 2 mol su, yani 36 g alınır;430+36=466 g ürünle eşleşir.",
          },
        ],
        answer:
          "2 mol G–S–A; her biri 233 g/mol.430 g halka+36 g su=466 g açık ürün.",
        check:
          "Ürünlerde toplam altı amino asit birimi ve dört peptit bağı kalır; iki hidroliz iki su tüketir. Halka başlangıcını farklı yerden yazmak ürün dizisini değiştirmez.",
        pitfall:
          "Halkayı yazıdaki başlangıç noktasından açık zincir sanmak veya proteazın A→G dışındaki bağları da kestiğini varsaymak.",
      },
      {
        title: "Peptit kütlesinden bileşimi geri çıkar",
        prompt:
          "Yalnız glisin ve alaninden oluşan tek açık sekizli peptidin molar kütlesi 544 g/mol. Serbest glisin 75, alanin 89, su 18 g/mol. Başka kimyasal değişim yok. Kaç glisin ve alanin içerir?",
        strategy:
          "Önce ayrılan suyu geri ekle, sonra sayı ve kütle denklemlerini birlikte çöz.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Yedi bağ için 7×18=126 g/mol su ayrılmıştır; serbest birim toplamı 544+126=670 g/mol.",
          },
          {
            label: "2. adım",
            explanation:
              "Alanin adedi a ise glisin 8−a:89a+75(8−a)=670; 14a=70, a=5.",
          },
          {
            label: "3. adım",
            explanation:
              "Glisin 8−5=3’tür. Diziliş bu iki toplamdan belirlenmez; yalnız bileşim bulunmuştur.",
          },
        ],
        answer: "3 glisin ve 5 alanin; dizi belirlenmez.",
        check: "3×75+5×89−7×18=225+445−126=544 g/mol.",
        pitfall:
          "Molar kütleyi doğrudan 75 veya 89’a bölmek karışım ve su ayrılmasını atlar.",
      },
      {
        title: "Parça dizisinden kesilecek bağları tasarla",
        prompt:
          "N→C yönünde 1–8 numaralı tek açık zincir, N ucundan başlayarak sırasıyla 1,2 ve 5 birimli üç parçaya ayrılacak. En az hangi peptit bağları hidroliz edilmeli? Su ve son bağ sayısını da bul.",
        strategy: "Hedef parça sınırlarını kümülatif birim sayısından bul.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İlk parça 1; ikincisi 2–3; sonuncusu 4–8 birimleridir. Sınırlar 1–2 ve 3–4 arasındadır.",
          },
          {
            label: "2. adım",
            explanation:
              "Bu iki bağı kesmek yeterlidir; tek başlangıç zincirini üçe ayırmanın en az iki kesimi vardır.",
          },
          {
            label: "3. adım",
            explanation:
              "İki su kullanılır; başlangıç 7 bağdan 5 kalır. Parçalar 0+1+4=5 bağ taşır.",
          },
        ],
        answer: "1–2 ve 3–4 bağları; 2 su,5 kalan bağ.",
        check: "1+2+5=8; 0+1+4=5 ve 7−2=5.",
        pitfall:
          "Parça uzunluklarını kesim numarası sanıp 1–2 ve 2–3 kesmek 1,1,6 verir.",
      },
      {
        title: "Disülfit çözülmesini peptit hidrolizinden ayır",
        prompt:
          "Dört ve altı amino asitli iki açık zincir, iki disülfit yan grup bağıyla birlikte duruyor. Yalnız disülfitler indirgeniyor; peptit omurgası korunuyor. Sonra ayrı bir aşamada tam peptit hidrolizi yapılıyor. İki aşamanın peptit sayımını karşılaştır.",
        strategy:
          "Bağ türünü her aşamada ayrı tut; yan grup bağlantısını omurgaya ekleme.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Başta peptit bağı(4−1)+(6−1)=8’dir; iki S–S bağı ayrı türdedir.",
          },
          {
            label: "2. adım",
            explanation:
              "Yalnız disülfit indirgenince iki zincirin peptit omurgaları 4 ve 6 birimli kalır; peptit bağ sayısı yine 8’dir.",
          },
          {
            label: "3. adım",
            explanation:
              "Sonraki tam peptit hidrolizinde 8 su kullanılır ve 10 serbest amino asit oluşur. İndirgeme aşamasını peptit hidrolizi suyu diye sayma.",
          },
        ],
        answer:
          "İndirgeme sonrası 8 peptit bağı; tam hidrolizde 8 su ve 10 amino asit.",
        check: "Başlangıç ve indirgeme sonrası 3+5=8 peptit bağı.",
        pitfall:
          "Her zincirler arası bağlantıyı peptit saymak yanlış 10 bağ üretir.",
      },
      {
        title: "Örtüşen dizi parçalarını tek sırada birleştir",
        prompt:
          "Aynı açık peptidin ayrı örneklerinden alınmış örtüşen kısa dizi okumaları G–A–S, A–S–A ve S–A–G. N ucuG, C ucuG ve tam uzunluk 5 birim olduğu ayrıca biliniyor. Diziyi ve açık omurga bağ sayısını bul.",
        strategy:
          "Ayrı okumalardaki ortak son–baş çiftlerini eşleştir; okunan parçaları ayrı molekül toplamı sanma.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "GAS’ın sonAS çifti ASA’nın ilkAS çiftiyle örtüşür: ortak dizilimGASA.",
          },
          {
            label: "2. adım",
            explanation:
              "ASA’nın sonSA çifti SAG’ın ilkSA çiftiyle örtüşür: beşli tam diziGASAG.",
          },
          {
            label: "3. adım",
            explanation:
              "N veC uçlarıG, uzunluk 5 koşulu sağlanır; tek açık omurgada 4 bağ vardır.",
          },
        ],
        answer: "G–A–S–A–G; 4 peptit bağı.",
        check: "Üç okuma tam dizinin 1–3,2–4,3–5 konumlarında bulunur.",
        pitfall:
          "Örtüşen üçlüleri toplam 9 ayrı amino asit sanmak aynı konumları yeniden sayar.",
      },
      {
        title: "Kesim sonrası yük grupları ile net yükü ayır",
        prompt:
          "Altı birimli açık bir peptitte bu modelde yalnız N ucu+1, C ucu−1 yüklü; yan gruplar yüksüz. Ortadaki tek peptit bağı hidroliz edilip iki açık üçlü oluşuyor; her yeni ucun aynı yük kuralına uyduğu verilmiş. Pozitif uç, negatif uç ve toplam net yük nasıl değişir?",
        strategy: "Yeni açık uç sayısını say, sonra işaretli toplamı kur.",
        steps: [
          {
            label: "1. adım",
            explanation: "Önce bir N ucu+1 ve bir C ucu−1 vardır; net 0.",
          },
          {
            label: "2. adım",
            explanation:
              "Kesimle iki açık zincirin ikişer ucu olur: iki pozitif N, iki negatif C.",
          },
          {
            label: "3. adım",
            explanation:
              "Toplam yük+2−2=0 kalır; grup adedi artması net yükün artmasını zorunlu kılmaz.",
          },
        ],
        answer: "Pozitif uç 1→2, negatif uç 1→2; net 0→0.",
        check: "İki üçlünün her birinde+1−1=0; toplam 0.",
        pitfall: "Yüklü grup sayısı ile işaretli net yükü aynı büyüklük sanma.",
      },
    ],
    recall: [
      {
        prompt: "Açık ve kapalı n birimli tek yapıda kaç peptit bağı vardır?",
        answer:
          "Açıkta n−1, tek halkada n; katlanma bu bağlantı sayısını değiştirmez.",
      },
      {
        prompt: "Halkadaki ilk kesim parça sayısını neden artırmaz?",
        answer: "Halkanın çevrimini açar; bağlantılı tek açık zincir kalır.",
      },
      {
        prompt: "Kısmi hidrolizde serbest amino asit sayısı nasıl bulunur?",
        answer:
          "Kesimlerden sonra komşu peptit bağlantısı kalmayan tek birimler sayılır; yalnız kesim adedi yetmez.",
      },
      {
        prompt:
          "Serbest amino asit toplam kütlesinden peptit kütlesine nasıl geçilir?",
        answer:
          "Net modelde yeni peptit bağı başına 18 g/mol su çıkarılır; hidrolizde tersine su eklenir.",
      },
      {
        prompt: "Bileşim eşitliği dizi eşitliği midir?",
        answer: "Hayır; aynı tür ve adetler N→C yönünde farklı sıralanabilir.",
      },
      {
        prompt: "Denatürasyon ve hidroliz hangi düzeyde ayrılır?",
        answer:
          "Denatürasyon doğal katlanmayı bozabilir; hidroliz peptit bağlarını suyla ayırır.",
      },
    ],
  },
  {
    id: "enzimler",
    sections: [
      {
        title: "Enzim enerji engelini değiştirir",
        paragraphs: [
          "Enzim biyolojik katalizördür. Uygun bir tepkime için daha düşük aktivasyon enerjili bir yol sağlayarak hızın artmasına yardım eder. Aktivasyon enerjisi başlangıç durumundan tepkimenin enerji tepesine ulaşmak için gereken farktır. Bu engel, ürün ile başlangıç arasındaki toplam enerji farkıyla aynı nicelik değildir.",
          "Enzim başlangıç ve ürün enerji düzeylerini, dolayısıyla net enerji değişimini değiştirmez; enerjiyi yoktan üretmez. Dengeye daha hızlı ulaşılmasına yardım edebilir fakat aynı koşullardaki denge konumunu tek başına kaydırmaz. Hem yapım hem yıkım tepkimelerinde enzimler görev alabilir; enerji gerektiren basamakların gereken enerji kaynağı ayrıca sağlanır.",
        ],
      },
      {
        title: "Özgüllük ve çevrim",
        paragraphs: [
          "Enzimin etki ettiği madde substrattır. Substrat aktif bölgeyle etkileşir; enzim–substrat ilişkisi tepkimeyi kolaylaştırır, ürünler ayrılır ve enzim uygun koşullarda yeni bir çevrime katılabilir. Aktif bölgenin kimyasal özellikleri ve biçimi hangi maddelerle hangi tepkimelerin gerçekleşebildiğini etkiler.",
          "Anahtar–kilit benzetmesi uygunluğu anlatır; bütün moleküllerin tamamen katı olduğunu söylemez. Gerçek bağlanmada şekil ve etkileşimler değişebilir. Bir enzimin bir çevrimde tüketilmemesi de onun hiç bozulmayacağını göstermez. Hücreler enzim sentezler ve yeniler; protein yapılı sindirim enzimleri hücre dışında da çalışabilir. Birçok enzimin adı substrat veya tepkimeyle ilişkili -az ekini taşır; maltaz buna örnektir. Pepsin ve tripsin gibi adlar bu ekin her enzim için zorunlu olmadığını gösterir; ad tek başına bütün çalışma koşullarını belirlemez.",
        ],
      },
      {
        title: "Yardımcı parça her enzimde aynı değildir",
        paragraphs: [
          "Bazı enzimler protein kısmıyla, bazıları ise gerekli yardımcı bileşenleriyle birlikte etkinlik gösterir. Protein kısmı apoenzim; gerekli yardımcıyla çalışan bütün holoenzim olarak adlandırılabilir. Metal iyonu gibi inorganik yardımcılar ve organik koenzimler aynı kimyasal tür değildir.",
          "Kofaktör sözcüğü geniş kullanımda gerekli yardımcıları kapsayabilir; okul sınıflandırmasında inorganik yardımcı ile organik koenzimi ayırmak yararlıdır. Birçok koenzim vitamin kökenlidir; bütün vitaminler koenzim, bütün enzimler yardımcı gerektirir denemez. Protein enzimler odaktadır; katalitik RNA örnekleri bütün biyolojik katalizörlerin protein olduğu genellemesini sınırlar.",
        ],
      },
      {
        title: "Sıcaklık ve pH: her artış daha hızlı değildir",
        paragraphs: [
          "Bir sıcaklık aralığında moleküler hareketin artması tepkime hızını artırabilir. Daha yüksek sıcaklıkta protein enzimin düzeni bozulup etkinlik azalabilir. Düşük sıcaklıkta hızın düşmesi tek başına denatürasyon kanıtı değildir; koşullar değişince etkinliğin geri dönüp dönmediği ayrıca gözlenebilir.",
          "Enzimlerin uygun sıcaklık ve pH aralıkları farklıdır; bütün enzimler için ortak bir optimum yoktur. pH, moleküldeki grupların yüklerini ve etkileşimlerini etkileyebilir. Grafikte hangi enzim, hangi ölçüm ve hangi sabit koşulların verildiğini oku; bir mide enziminin eğrisini bütün enzimlere taşıma.",
        ],
      },
      {
        title: "Substrat artarken hız neden sınırlanabilir?",
        paragraphs: [
          "Enzim miktarı ve diğer koşullar sabitken substratın artırılması başlangıç hızını yükseltebilir. Yüksek substratta etkin bölgelerin kullanım sınırı nedeniyle hız bir üst değere yaklaşır. Bu nedenle aynı miktarda ek substrat her düzeyde aynı hız artışını sağlamak zorunda değildir.",
          "Bu eğri başlangıç hızına aittir; uzun süre sonunda oluşan toplam ürünle aynı şey değildir. Enzim miktarı, inhibitör veya sıcaklık değişirse karşılaştırmanın koşulu değişir. Önce eksenleri adlandır: substrat miktarı, zaman, başlangıç hızı ve birikmiş ürün farklı niceliklerdir.",
        ],
      },
      {
        title: "Enerji grafiğinde başlangıç, tepe ve ürünü ayrı oku",
        paragraphs: [
          "Enerji yolu grafiğinde tepkimeye girenlerin ve ürünlerin düzeyleri verilir. Başlangıçtan tepeye fark ileri yön aktivasyon enerjisini; başlangıçtan ürüne fark net enerji değişimini verir. Katalizli yolun tepesi daha düşük olabilir; iki uç düzey aynı koşullarda korunur.",
          "Yatay eksen tepkimenin ilerleyişini gösteriyorsa onu doğrudan zaman sanma. Tepeden ürüne fark ise geri yön için engel yorumuna yardım eder. Bir enzimin ileri yöndeki engeli azaltmasını ürünün enerjisini düşürmesi veya tepkimeden daha fazla net enerji çıkarması biçiminde açıklama.",
        ],
      },
      {
        title: "Denge miktarı ile dengeye ulaşma süresini ayır",
        paragraphs: [
          "Aynı tersinir tepkimeye katalizör eklendiğinde uygun koşullarda hem ileri hem geri yolların engelleri değişir. Böylece dengeye yaklaşma süresi değişebilir. Dengedeki ürün–giren oranını ise sıcaklık gibi dengeyi belirleyen koşullar sabitken yalnız enzim eklemek değiştirmez.",
          "Bir deneyde aynı sürede daha çok ürün görülmesi, son denge ürününün de daha çok olacağını zorunlu kılmaz. Erken zaman ölçümü ile yeterince uzun zaman ölçümünü ayır. Tepkime tersinmez kabul ediliyorsa veya ürün ortamdan uzaklaştırılıyorsa bu koşullar kartta ayrıca belirtilmelidir.",
        ],
      },
      {
        title: "Enzim miktarının etkisini substrat koşuluyla kur",
        paragraphs: [
          "Substratın yeterli olduğu ve diğer koşulların korunduğu bir başlangıç hızı deneyinde daha fazla etkin enzim daha fazla eş zamanlı kataliz olanağı sağlayabilir. Bu nedenle hız enzim miktarıyla artabilir. Ancak substrat sınırlıyken sınırsız bir ürün veya sınırsız süreli aynı hız çıkarılamaz.",
          "Toplam enzim miktarı ile gerçekten etkin enzim miktarı farklı olabilir. Bozulmuş veya gerekli yardımcısı bulunmayan moleküller ölçülen etkinliğe aynı katkıyı vermez. Bir tabloda protein miktarı korunup hız azalırsa sadece molekül adedini değil etkinlik koşulunu da incele.",
        ],
      },
      {
        title: "Rekabetçi engellemeyi belirtilen modelle yorumla",
        paragraphs: [
          "Bazı inhibitörler substratla etkileşim bölgesi için rekabet ederek belirli substrat düzeyinde hızı azaltabilir. Basit tersinir rekabetçi modelde yeterince yüksek substratta aynı üst hız sınırına yaklaşılabilir. Bu, bütün inhibitörlerin aynı biçimde çalıştığı veya her engellemenin substrat eklenince giderilebildiği kuralı değildir. Uygun koşulda enzim etkinliğini artıran etkene aktivatör denir. Etki enzime ve ortama bağlıdır; aynı maddenin bütün enzimleri artırdığı sonucu çıkmaz. Buradaki rekabetçi engelleme hesabı ayrıca bir aktivatör hız yasası tanımlamaz.",
          "Etkinlikte v=2ES/[2(1+I)+S] bağıntısı açıkça verilmiştir. E etkin enzim, S substrat, I engelleyici basamağıdır; sayılar özgün modelin birimleridir. I artırıldığında payda büyür; E sabitken kuramsal üst sınır 2E olarak kalır. Bu bağıntı gerçek bir enzimin ölçülmüş sabitlerini bildirmez.",
        ],
      },
      {
        title: "Ürün birikimini zaman aralığıyla bağla",
        paragraphs: [
          "Bir hız, birim zamanda oluşan ürün değişimi olarak yorumlanabilir. Hız gerçekten sabitse belirli sürede ürün değişimi hız×süre ile bulunur. Hız zamanla değişiyorsa ilk hızla bütün süreyi çarpmak doğru sonuç vermeyebilir; substrat azalması ve ürün birikimi gibi koşullar süreci değiştirebilir.",
          "Başlangıç hızları eşit iki deneyin son ürün miktarlarının her sürede eşit olması zorunlu değildir. Toplam başlangıç substratı veya enzimin dayanıklılığı farklı olabilir. Sabit hız varsayımı gereken sorularda bu kabul kartta açıkça yazılır; çizginin biçiminden verilmeyen bir süre icat edilmez.",
        ],
      },
      {
        title: "Düşük sıcaklıkta yavaşlamayı deneyle sınırla",
        paragraphs: [
          "Bir enzim soğuk koşulda az ürün oluşturuyorsa bu gözlem o koşuldaki düşük etkinliği gösterir. Enzim uygun sıcaklığa alınır, diğer koşullar korunur ve hız geri gelirse bu deneyde kalıcı işlev kaybı bulunmadığı yönünde kanıt elde edilir. Aynı yorum aşırı ısıtma sonrası otomatik olarak yapılamaz.",
          "Kontrolsüz karşılaştırmada sıcaklıkla birlikte pH veya enzim miktarı da değişmişse neden tek başına sıcaklığa bağlanamaz. Aynı protein için birkaç koşulun etkisi ayrılmak isteniyorsa uygun kontroller gerekir. Her soğutma veya her ısıtma olayına tek bir geri dönüş sonucu atama.",
        ],
      },
      {
        title: "pH grafiğinde optimumu ve ölçüm aralığını ayır",
        paragraphs: [
          "Verilen ölçümler arasında en yüksek hızın bulunduğu pH, o veri aralığındaki uygun bölgeyi gösterir. Daha ince aralıkta ölçüm yapılmadıysa tepe noktasının kesin ondalık değerini söylemek gerekmez. Bir enzimin düşük hızda çalışmasıyla hiç ölçülebilir ürün oluşturmaması da farklı sonuçlardır. İnsanın sindiriminde pepsin asidik mide ortamıyla, tripsin daha bazik ince bağırsak ortamıyla ilişkilendirilen örneklerdir. Bu örneklerin uygun pH bölgelerinin farklı olması bütün enzimlere tek bir pH optimumu atanamayacağını gösterir.",
          "pH değişimi amino asit yan gruplarının yüklerini etkileyebilir; bağlanma ve katlanma bundan etkilenebilir. Bu açıklama her düşük etkinlik noktasında bütün peptit bağlarının koptuğu anlamına gelmez. Dizi, miktar ve işlev ölçümlerini birbirinin yerine kullanma.",
        ],
      },
      {
        title: "Yüzey alanı fiziksel erişimi değiştirebilir",
        paragraphs: [
          "Katı veya damla hâlindeki bir substratın daha küçük parçalara dağılması enzimle temas eden yüzey alanını artırabilir. Uygun diğer koşullar sabitken başlangıç hızının değişmesine yardım edebilir. Ancak fiziksel parçalama tek başına kimyasal bağların hidrolizle ayrıldığı anlamına gelmez.",
          "Bir karşılaştırmada toplam substrat miktarı aynı tutulurken parçacık boyutu değiştirilebilir. Böylece miktar ile temas yüzeyi ayrılır. Enzim miktarı da değişmişse iki neden karışır; sonuçtan yalnız yüzey alanının etkisini çıkarmak için gereken kontrol korunmalıdır.",
        ],
      },
      {
        title: "Su ve ortam koşullarına tek sayı dayatma",
        paragraphs: [
          "Enzimlerin çalışması için uygun bir kimyasal ortam gerekir; su, iyonlar ve çözünen maddeler bu ortamın parçalarıdır. Fakat bütün enzimler veya bütün canlı dokular için geçerli tek bir su yüzdesi eşiği verilemez. Sorudaki deney belirli bir su koşulunu sınamışsa sonuç o kapsamdadır.",
          "Kuru tohumdaki düşük metabolik etkinlikle uygun su sonrası hızlanan süreçler ilişkilendirilebilir; bundan her enzimin yalnız belirli bir yüzde aşıldığında aniden çalışacağı sonucu çıkmaz. Ölçülen hızın enzim sentezi, substrat erişimi veya ortam değişimiyle ilişkisini ayırmak için ek veri gerekebilir.",
        ],
      },
      {
        title: "Yardımcı eksikliğini kurtarma deneyiyle araştır",
        paragraphs: [
          "Bir protein enzimin gerekli metal iyonu uzaklaştırıldığında etkinliği düşüyor, aynı iyon geri verildiğinde kontrol düzeyine geliyorsa o koşulda iyon gereksinimine ilişkin destek vardır. Yalnız metal eklemek her proteini enzim yapmaz; gerekli protein yapısı ve uygun substrat da bulunmalıdır.",
          "Organik bir koenzim eksikliği ile denatürasyon farklı açıklamalardır. Yardımcının eklenmesiyle geri gelen etkinlik bu deneydeki gereksinimi destekler; bütün enzimlerin aynı yardımcıyı kullandığını göstermez. Kurtarma ve kontrol gruplarında hangi bileşenlerin korunduğunu tabloya yaz. Yardımcı eklenmesiyle etkinleşme, inaktif protein öncülünün işlenmesiyle aynı olay değildir. Örneğin pepsinojenden pepsin oluşumunda öncü bölümün sınırlı proteolizle ayrılması görevli proteini açığa çıkarır; bütün zincirin serbest amino asitlere tam hidrolizi yapılmaz. Bu yüzden öncü enzim, yardımcı eksiği olan apoenzim ve tamamen sindirilmiş protein ayrı durumlardır.",
        ],
      },
      {
        title: "Enzimin ürün değil yol üzerindeki görevini izle",
        paragraphs: [
          "Enzim çoğunlukla belirli bir kimyasal dönüşümü kolaylaştırır; başlangıç maddelerinin atomlarını yoktan ürün oluşturacak biçimde çoğaltmaz. Bir metabolik yolun ardışık basamaklarını farklı enzimler katalizleyebilir. Bir basamak yavaşlarsa önceki ara ürünün birikmesi, sonraki ürünün azalması gibi sonuçlar koşullara bağlı olarak görülebilir. Nişasta sindiriminde amilaz, maltoz gibi daha küçük ürünlerin oluşmasına katkı verir; maltaz maltozu hidroliz ederek iki glikoz oluşturur. Bir basamağın ürününün sonrakinin substratı olması, bütün yolu tek enzimin yürüttüğü anlamına gelmez.",
          "Bu örüntü için yolun dallanmadığı, başka giriş veya çıkış bulunmadığı gibi varsayımlar gerekebilir. Yalnız bir ürünün azaldığını görmekten belirli bir enzimin kesin eksikliği çıkarılmaz. Sorular gerekli yol şemasını ve koşulları kendi kartlarında verir; verilmeyen ara basamak eklenmez.",
        ],
      },
      {
        title: "Başlangıç hızını ölçerken eşit başlangıç kur",
        paragraphs: [
          "Farklı koşulları karşılaştırmak için başlangıç substratının, ölçüm süresinin ve kullanılan etkin enzim miktarının hangilerinin sabit tutulduğunu belirt. İlk kısa aralıkta ürün değişiminin süreye oranı yaklaşık başlangıç hızını verebilir. Aralığın seçimi ve ölçüm duyarlılığı sonuç yorumunun parçasıdır.",
          "Bir grafikte ürün miktarı eğrisinin eğimi hızla ilişkilidir; yüksek ürün değerinin kendisi yüksek anlık hız demek değildir. Yataylaşan ürün eğrisi çok ürün içerebilirken o anda ürün artışı düşük olabilir. Ürün miktarıyla ürünün artış hızını farklı sütunlarda izlemek bu karışıklığı azaltır.",
        ],
      },
      {
        title: "Model kıyasını biyolojik genellemeden ayır",
        paragraphs: [
          "Etkinlikteki sayılar örnek bir rekabetçi başlangıç hızı bağıntısını izler; sıcaklık ve pH sabittir. Enzim etkisiz seçildiğinde bu ölçekte enzim katkısı sıfır alınır, enzimsiz arka plan hızı ihmal edilir. Bu sıfır, gerçek dünyada hiçbir enzimsiz kimyasal tepkimenin gerçekleşemeyeceği iddiası değildir.",
          "Hız eğrisi, enerji yolu ve sıcaklık–pH tablosu ayrı gösterimlerdir; birinin yatayı substrat, diğerinin yatayı tepkime ilerleyişi veya sıcaklıktır. Veriler HTML satırlarında da bulunur. Kıyas yalnız seçilen tahmine ilişkindir; yazılı gerekçeyi doğru saymaz ve öğrenme kaydı üretmez. Yeni koşulda hangi bağıntının geçerli kaldığını açıklamak amaçlanır.",
        ],
      },
      {
        title: "İki enzimin örnek koşul tablolarını karşılaştır",
        paragraphs: [
          "X ve Y için verilen sıcaklık ve pH tabloları özgün varsayımsal verilerdir. X’in sıcaklık ölçümlerinde en yüksek değer 40°C, Y’ninki 60°C olabilir; bu fark hangi enzimin incelendiğini belirtmenin önemini gösterir. Bu noktalar gerçek bütün türlerin optimumları veya deneyler arasında taşınabilecek hız sabitleri değildir.",
          "Etkinlikte her sıcaklıktaki örnek hız değeri, seçili pH için verilen çarpanla ölçeklenir. Bu ayrılabilir etki yalnız ilan edilen sonlu modelin kabulüdür. Gerçek bir deneyde sıcaklık ve pH etkileri birbirini değiştirebilir; veriler etkileşim gösteriyorsa iki bağımsız çarpan varsayımı otomatik kullanılmaz. Noktaları birleştiren çizgi aradaki kesin ölçümü kanıtlamaz.",
        ],
      },
      {
        title: "Hızdan ürün grafiğini zamanla yeniden kur",
        paragraphs: [
          "Bir aralıkta hız sabit verildiyse o aralığın ürün artışı hız×süredir. Ardışık aralıklardaki artışları başlangıç ürününe ekleyerek ürün–zaman grafiği kurulur. Birimlere bak: µmol/dakika ile dakika çarpımıµmol verir; hızların kendilerini toplayıp doğrudan toplam ürün sayma.",
          "Farklı sürelerdeki hızların genel ortalaması, toplam ürün artışının toplam süreye bölünmesiyle bulunur. Süreleri eşit olmayan iki hızın aritmetik ortalaması doğru olmak zorunda değildir. Aynı toplam ürün, farklı zaman dağılımlarıyla oluşabilir; bu nedenle son miktar tek başına hangi aralıkta daha hızlı çalışıldığını belirlemez.",
        ],
      },
    ],
    minutes: 75,
    objectives: [
      "Aktivasyon engeli, net enerji, başlangıç hızı ve dengeyi ayır.",
      "Substrat, etkin enzim ve engelleyici verisini belirtilen modelle yorumla.",
      "Kontrollü deney ve kurtarma örnekleriyle genellemenin sınırını koru.",
    ],
    source:
      "MEBİ TYT Biyoloji konu özetleri, OGM Dersler Cepte temel bileşikler ve Aurelia ilgili notlarının gerçekten okunan bölümleriyle karşılaştırılan özgün derin anlatım. Açık koşullu bağlantı, enerji ve miktar verileri öğretim modelleridir; alıştırmalar resmî sınav sorusu değildir.",
    examples: [
      {
        title: "Enerji düzeylerini engel verisinden kur",
        prompt:
          "Başlangıç 20 kJ/mol. Enzimsiz ileri engel 80, geri engel 55 kJ/mol. Enzimli ileri engel 35 kJ/mol oluyor. Ürün düzeyini, iki tepeyi ve enzimli geri engeli bul.",
        strategy:
          "Önce ortak tepeyi başlangıca ekle; geri engelden ürünü geri çıkar.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Enzimsiz tepe 20+80=100. Geri başlangıç ürün olduğundan ürün 100−55=45 kJ/mol.",
          },
          {
            label: "2. adım",
            explanation:
              "Enzimli tepe 20+35=55; ürün düzeyi 45 olarak korunur.",
          },
          {
            label: "3. adım",
            explanation:
              "Enzimli geri engel 55−45=10; iki yönde engel azalması 45, net fark 45−20=+25’tir.",
          },
        ],
        answer: "Ürün 45; tepe 100 ve 55; enzimli geri engel 10 kJ/mol.",
        check: "80−55=35−10=25 net ileri enerji farkı.",
        pitfall:
          "Verilen geri engeli ürün enerji düzeyi yerine koyma; aynı tepeden çıkar.",
      },
      {
        title: "İki hızdan örnek bağıntının sabitlerini bul",
        prompt:
          "Yalnız v=VS/(K+S) modeli geçerli kabul ediliyor. Aynı koşulda S=2 için v=2, S=6 için v=4 birim. Pozitif K ve V’yi bul; S=0’da modelin verdiğini kontrol et.",
        strategy:
          "İki noktayı aynı bağıntıya koyup iki bilinmeyenli sistemi çöz.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "2=2V/(K+2) eşitliğinden V=K+2. İkinci ölçüm 4=6V/(K+6).",
          },
          {
            label: "2. adım",
            explanation: "4K+24=6K+12; K=6 veV=8 bulunur.",
          },
          {
            label: "3. adım",
            explanation:
              "Kontrol: S2’de 16/8=2, S6’da 48/12=4. S0’da pay 0 olduğundan hız 0; V8 bir üst sınırdır.",
          },
        ],
        answer: "K=6, V=8; S0 hızı 0.",
        check: "İki ölçüm aynı pozitif sabitlerle yeniden elde edilir.",
        pitfall:
          "Son ölçülen hız 4’ü zorunlu Vmax sanma; S6’da üst sınıra henüz eşit değildir.",
      },
      {
        title: "Hız aralıklarından ürün eğrisini yeniden kur",
        prompt:
          "Başlangıç 5 µmol ürün var. İlk 2 dakika net hız 3 µmol/dakika, sonraki 4 dakika 1 µmol/dakika sabit. 2. ve 6. dakika ürününü ve bütün aralığın ortalama net hızını bul.",
        strategy:
          "Her hızın geçerli olduğu süreyi kullan; başlangıç ürünüyle net artışı ayrı tut.",
        steps: [
          {
            label: "1. adım",
            explanation: "İlk artış 3×2=6; P2=5+6=11 µmol.",
          },
          {
            label: "2. adım",
            explanation:
              "Sonraki artış 1×4=4; P6=11+4=15 µmol. Ürün eğrisi iki aralıkta farklı eğimli doğrulardan oluşur.",
          },
          {
            label: "3. adım",
            explanation:
              "Toplam yeni ürün 10 µmol; ortalama 10/6=5/3 µmol/dakika. (3+1)/2=2, süreler eşit olmadığı için doğru ortalama değildir.",
          },
        ],
        answer: "P2=11, P6=15; ortalama 5/3 µmol/dakika.",
        check: "15−5=6+4=10 µmol.",
        pitfall:
          "Son miktar 15’i toplam yeni ürün veya iki hızın basit ortalamasını genel hız sanma.",
      },
      {
        title: "pH etkisinin sıcaklıkla değiştiğini tabloyla göster",
        prompt:
          "Özgün hız tablosu:30°C’de pH4→2, pH8→8; 50°C’de pH4→5, pH8→3. Aynı enzim miktarı ve substrat kullanılmış. pH4’ten 8’e geçmenin etkisi iki sıcaklıkta aynı mıdır?",
        strategy: "Her sıcaklık içinde yalnız pH farkını hesapla.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "30°C’de değişim 8−2=+6 birimdir; 50°C’de 3−5=−2 birimdir.",
          },
          {
            label: "2. adım",
            explanation:
              "pH artışı bir sıcaklıkta artırıp diğerinde azaltmıştır; bu veride tek sabit pH etkisi yoktur.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu nedenle sıcaklık ve pH etkilerini evrensel bağımsız çarpanlar gibi kullanamayız. Tablo en yüksek verilen koşulu 30°C, pH8 olarak gösterir; ara değerleri ölçmez.",
          },
        ],
        answer: "Hayır; +6 ve−2. En yüksek verilen koşul 30°C, pH8.",
        check: "Dört hücrenin değerleri 2,8,5,3; max 8.",
        pitfall:
          "Farklı sıcaklıktaki iki satırı yalnız pH karşılaştırması sanarak kontrolü kaybetme.",
      },
      {
        title: "Yol şemasında eksik basamağı kurtarmayla bul",
        prompt:
          "Dallanmayan A→B→C→D yolunda başka giriş/çıkış yok. D üretimi A veya B verilince 0, C verilince 9 birim; son C→D basamağı için gerekli koşulların sağlam olduğu ayrıca doğrulanmış. Hangi dönüşümün aksamasıyla uyumludur?",
        strategy:
          "Kurtaran en erken ara maddenin hemen önceki basamağını incele.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "A veB ile D oluşmaması, bu girişlerin C’ye kadar ilerleyememesiyle uyumludur.",
          },
          {
            label: "2. adım",
            explanation:
              "C doğrudan verilince D oluşur; C→D’nin işleyebildiği ayrıca doğrulanmıştır.",
          },
          {
            label: "3. adım",
            explanation:
              "B→C basamağının aksaması üç sonucu birlikte açıklar. Bu model, başka dal veya engel olmadığı açık kabulüyle yorumlanır.",
          },
        ],
        answer: "B→C basamağı.",
        check: "B→C atlanıpC verilince son ürün 9 oluşur; B verilince 0.",
        pitfall:
          "Ürünün azlığından yol şeması ve kurtarma olmadan belirli bir enzim kimliği uydurma.",
      },
      {
        title: "Toplam enzimden etkin kısmı ters hesapla",
        prompt:
          "Örnek v=2ES/[2(1+I)+S] modelinde toplam 8 enzim biriminin yalnız bir kısmı etkin. S6, I1 iken hız 3,6 ölçülüyor. Etkin E’yi ve yüzdeyi bul; I0 yapılınca aynı etkin miktarda hız ne olur?",
        strategy: "Ölçülen hızdan E’yi çöz; toplam 8 ile etkinE’yi aynı sayma.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "I1, S6 için v=12E/10=1,2E. 3,6=1,2E olduğundan etkinE3.",
          },
          {
            label: "2. adım",
            explanation:
              "Etkin oran 3/8=0,375 yani%37,5’tir; geri kalan 5 bu modelde hız katkısı vermez.",
          },
          {
            label: "3. adım",
            explanation:
              "I0’da v=2×3×6/(2+6)=36/8=4,5. Yalnız inhibitör koşulu değişmiştir; etkinE3 korunur.",
          },
        ],
        answer: "EtkinE3, %37,5; I0 hızı 4,5.",
        check: "I1 hızı 36/10=3,6; I0 hızı 36/8=4,5.",
        pitfall:
          "Toplam enzim proteinini etkin miktar sanmak gözlenen hızla çelişir.",
      },
    ],
    recall: [
      {
        prompt: "Enerji profilinde ileri aktivasyon ve net fark nasıl okunur?",
        answer:
          "Tepe−başlangıç ileri engel; ürün−başlangıç net farktır. Katalizör aynı uçları korur.",
      },
      {
        prompt: "Rekabetçi örnek modelde I artınca Vmax neden değişmeyebilir?",
        answer:
          "EtkinE sabitken üst sınır 2E’dir; I görünür payda sabitini değiştirir. Bu her inhibitöre genellenmez.",
      },
      {
        prompt: "Ürün eğrisi yatayken ürün miktarı 0 olmak zorunda mı?",
        answer: "Hayır; net artış hızı 0’dır, mevcut ürün pozitif kalabilir.",
      },
      {
        prompt: "Ölçülen en yüksek sıcaklık gerçek optimumu kesin verir mi?",
        answer:
          "Yalnız denenen noktalar içindeki maksimumu verir; ara ölçümler yoksa kesin tepe bilinmez.",
      },
      {
        prompt: "Kofaktör ile koenzim hangi kullanımda ayrılır?",
        answer:
          "Geniş kofaktör yardımcı bileşenleri kapsar; organik yardımcı koenzimdir, metal iyonları inorganik örnektir.",
      },
      {
        prompt: "Daha çok enzim tam dönüşümde daha çok ürün zorlar mı?",
        answer:
          "Hayır; sabit sonlu substrat 1:1 tamamen dönüşüyorsa üst ürün kapasitesi aynı kalır; erken hız değişebilir.",
      },
    ],
  },
  {
    id: "vitaminler",
    sections: [
      {
        title: "Az miktarla işlev, sıfır gereksinim demek değildir",
        paragraphs: [
          "Vitaminler metabolik ve düzenleyici görevlerde bulunan çeşitli organik bileşiklerdir. Küçük miktarlarda gerekli olmaları hiç gerekli olmadıkları anlamına gelmez. İnsan vitaminleri karbohidrat veya yağ gibi enerji sağlamak için yakıt saymaz; birçok vitamin enerji dönüşümünün yürütülmesinde yardımcı rollerle ilişkilidir.",
          "Birçoğu koenzimlerle bağlantılıdır fakat bütün vitaminlerin tek görevi koenzim olmak değildir. Enerji metabolizmasında görev alma ile doğrudan enerji veren besin olma ayrıdır. Vitaminler de birbirinin rastgele yerine geçmez; farklı türlerin yapı ve işlevleri ayrı değerlendirilir.",
        ],
      },
      {
        title: "İki çözünürlük grubunu ayrı tut",
        paragraphs: [
          "A, D, E ve K vitaminleri yağda; B grubu ile C vitamini suda çözünen grupta ele alınır. Çözünürlük emilim, taşınma ve depolanma davranışlarıyla ilişkilidir. Yağda çözünenlerin birikebilmesi, fazlasının her koşulda güvenli olduğu anlamına gelmez.",
          "Suda çözünen vitaminlerin genel olarak daha sınırlı depolanması koşulsuz bir depo yasağı değildir; B12 için anlamlı vücut depoları bulunabilir. Bu grupta bulunmak her miktarın zararsız olduğu sonucunu da vermez. Bir özelliği bütün grup üyelerine, istisnayı belirtmeden mutlaklaştırma.",
        ],
      },
      {
        title: "İşlevi vitamin adıyla eşleştir",
        paragraphs: [
          "A vitamini görme ve epitel işlevleriyle; D vitamini kalsiyum–fosfor dengesi ve kemik mineralizasyonuyla; K vitamini pıhtılaşmada görev alan bazı proteinlerin uygun işleviyle ilişkilidir. E vitamini antioksidan savunmaya, C vitamini kolajen yapımı gibi süreçlere katkı verir.",
          "B grubu tek bir molekül değildir; birbirinden farklı vitaminleri kapsar. Aynı grup adı, bütün üyelerin aynı yardımcı moleküle dönüştüğü veya aynı eksiklik örüntüsünü verdiği anlamına gelmez. Bir tablo sorusunda çözünürlük, verilen görev ve koşul sütunlarını ayrı ayrı eşleştir.",
        ],
      },
      {
        title: "Sentez ve dönüşüm aynı şey değildir",
        paragraphs: [
          "İnsan bazı vitaminleri ya da öncüllerinden ilgili ürünleri belirli koşullarda oluşturabilir. D vitamini oluşumunda deride başlayan bir süreç, A vitamini için bazı bitkisel öncüllerden dönüşüm örnektir. Bu olanaklar insanın bütün vitaminleri her koşulda yeterli miktarda sentezlediği anlamına gelmez.",
          "Bağırsaktaki bazı mikroorganizmaların vitamin üretmesi de bütün gereksinimin mutlaka karşılandığını göstermez. Üretim yeri, yararlanma ve koşullar önemlidir. Hangi canlı, hangi vitamin, hangi öncül ve hangi dönüşüm basamağı verildiyse sonucu o kapsamda kur; sentezle besinden doğrudan alınmayı aynı işlem sayma.",
        ],
      },
      {
        title: "Tablo sorusunda üç ayrı bilgiyi oku",
        paragraphs: [
          "Vitaminle ilgili bir kartta önce organik düzenleyici oluşu, sonra çözünürlük grubu, sonra verilen özel görev veya eksiklik bilgisini ayır. Düzenleyici görev vitaminin mineral olduğu anlamına gelmez; minerallerle organik–inorganik ayrımı vardır. Yağda çözünmek de molekülü trigliserit yapmaz.",
          "Eksikliklerin okul örnekleri bilimsel eşleştirme içindir; gerçek bir kişiye tek belirtiyle tanı veya doz önerisi üretmez. Bir belirti birçok nedenle ortaya çıkabilir. Bu rehberde kişiye sağlık puanı verilmez; tabloda belirtilen bileşik ve deney koşullarıyla gerekçeli sonuç kurulması amaçlanır.",
        ],
      },
      {
        title: "Yağda çözünenleri A, D, E, K olarak bağla",
        paragraphs: [
          "Yağda çözünen vitaminlerin alınan besinlerden yararlanılması lipitlerin emilim koşullarıyla ilişkilidir. Bu vitaminlerin vücutta depolanabilmesi, her gün alınan miktarla o gün kullanılan miktarın bire bir aynı olmasını gerektirmez. Depo ve gereksinim, aynı nicelik değildir.",
          "A, D, E ve K’nin hepsini steroid iskeletli saymak doğru değildir. Ortak sınıflandırma ölçütü çözünürlüktür; bu, bütün moleküler yapıların aynı olduğu anlamına gelmez. D vitamininin kolesterol kökenli öncülle ilişkisi diğer üç vitaminin yapısına koşulsuz taşınmaz.",
        ],
      },
      {
        title: "Suda çözünenlerde B12 istisnasını görünür tut",
        paragraphs: [
          "B grubu ve C vitamini suda çözünenlerdendir. Genel olarak fazla miktarın uzaklaştırılması ve sınırlı depolama eğilimi öğretilse de B12’nin anlamlı depoları bulunabilir. Bu bilgi, suda çözünenlerin hiç depolanmadığı yargısını geçersiz kılar.",
          "Bir depoya sahip olmak gereksinimin sonsuza dek ortadan kalkması anlamına gelmez. Suda çözünmek de sınırsız güvenlilik garantisi değildir. Okul sorusunda grup özelliği isteniyorsa verilen kapsamı kullan; mutlak her zaman/hiçbir zaman sözleri için istisna olup olmadığını denetle.",
        ],
      },
      {
        title: "A vitamininde görme ile öncül dönüşümünü ayır",
        paragraphs: [
          "A vitamini görmeyle ilişkili moleküllerin ve epitel dokunun uygun işlevinde rol alır. Bazı bitkisel karotenoidler insanda A vitaminiyle ilişkili ürünlere dönüştürülebilen öncüllerdir. Bir öncülün besinde bulunması ile hazır vitaminin aynı kimyasal formda bulunması aynı bilgi değildir. Beta-karoten, insanda A vitamini etkinliğine katkı verebilen bir provitamin A örneğidir; hazır A vitamininin retinol biçimiyle aynı molekül değildir. Öncülün bulunması ile onun uygun dönüşümlerden geçirilmesi ayrı aşamalardır; dönüşüm verimi her koşulda aynı kabul edilmez.",
          "A eksikliği için gece görmesinde bozulma okul örneği olarak kullanılır; bu eşleştirme her görme sorununun tek nedenini bulmaz. Yapı, öncül ve görev sorularını ayrı yanıtla. “Yağda çözünür” bilgisinden doğrudan enerji yakıtı veya steroid olduğu sonucu çıkarma.",
        ],
      },
      {
        title: "D vitamininde deri ve etkinleşme basamaklarını ayır",
        paragraphs: [
          "D vitamini oluşumuyla ilişkili süreç deride uygun ultraviyole B (UVB) ışığıyla öncül dönüşümü üzerinden başlayabilir; vücutta sonraki dönüşümlerle etkin biçimlerin oluşması karaciğer ve böbrek gibi organlarla ilişkilidir. Deride öncül dönüşümü, bütün işlemlerin tek yerde tamamlandığını söylemez.",
          "D vitamini kalsiyum–fosfor dengesi ve kemik mineralizasyonuna katkı verir. Eksikliğinin okul örnekleri çocukta raşitizm, erişkinde osteomalazi bağlamlarıdır. Bu ilişkiler kişisel belirti tanısı değildir; verilen soruda hangi basamak veya hangi işlevin anlatıldığını seçmek için kullanılır.",
        ],
      },
      {
        title: "E ve K vitaminlerinin görevlerini birbirine taşıma",
        paragraphs: [
          "E vitamini, hücresel yapılarda oksidatif etkilerin sınırlandırılmasıyla ilişkili antioksidan savunmanın parçalarındandır. K vitamini ise kanın pıhtılaşmasında görevli bazı proteinlerin işlevsel hâle gelmesine katkı verir. Ortak yağda çözünürlük bu iki farklı görevi eşitlemez.",
          "Her kanama sorunu K eksikliği veya her üreme sorunu E eksikliği diye adlandırılamaz. Okul eşleştirmesinde verilen işlevin hangi vitamine karşılık geldiği incelenir; gerçek bir olayın nedenini belirlemek ek veriler gerektirir. Vitaminin görevi ile bir belirtiye atanan tek neden arasında ayrım kur.",
        ],
      },
      {
        title: "C vitaminini kolajen ve deneyde kayıpla ilişkilendir",
        paragraphs: [
          "C vitamini kolajen yapımındaki bazı basamaklara ve başka metabolik süreçlere katkı verir. Eksikliğiyle ilişkili skorbüt okul düzeyinde bağ doku ve diş eti bulguları bağlamında ele alınır. Suda çözünen C vitamini, yiyeceğin suyuna geçebildiği için hazırlama koşullarında miktar dağılımı değişebilir.",
          "Suya geçiş ile kimyasal olarak C vitamini etkinliğini kaybetme farklı olaylardır. Suyun dökülmesi yemekte kalan miktarı azaltabilir; bu, suya geçmiş bütün moleküllerin kimyasal olarak yok olduğu anlamına gelmez. Isı, ışık, oksijen ve süre etkileri deneyin koşullarına bağlıdır; her hazırlama biçimine tek bir kayıp yüzdesi uygulanmaz.",
        ],
      },
      {
        title: "B grubunda yardımcı roller çeşitlidir",
        paragraphs: [
          "B1, B2 ve B3 vitaminleri enerji dönüşümlerinde kullanılan farklı yardımcı moleküllerle ilişkilidir; B2 kökenli FAD ve B3 kökenli NAD buna örnek gösterilebilir. B5 koenzim A’yla, B6 birçok amino asit metabolizması basamağıyla, B7 bazı karboksilleme süreçleriyle ilişkilidir. B1’in adı tiamindir; başlıca etkin yardımcı biçimlerinden biri tiamin difosfat (TDP) olarak adlandırılır. TDP bazı metabolik tepkimelerde koenzim görevi üstlenir; vitaminin besinle alınan biçimi, görevli türevi ve protein enzimin bütünü aynı molekül değildir. Bu yardım, B1’i doğrudan kalori veren yakıt yapmaz.",
          "B9 ve B12, DNA sentezi ve sağlıklı kan hücresi oluşumu gibi süreçlerle bağlantılıdır; B12’nin sinir sistemiyle ilgili görevleri de vardır. Bu çeşitlilik B grubu üyelerinin tek bir vitamin sayılmaması gerektiğini gösterir. Ayrıntılı bir tablo sorusunda gereken görev bilgisi kartta da açıkça verilir.",
        ],
      },
      {
        title: "Eksiklik örneklerini bağlamlarıyla eşleştir",
        paragraphs: [
          "B1 eksikliğiyle beriberi, B3 eksikliğiyle pellagra, C eksikliğiyle skorbüt gibi okul eşleştirmeleri yapılabilir. B9 ve B12 eksikliklerinde kan hücresi yapımıyla ilişkili bozukluklar görülebilir; iki vitaminin bütün işlevleri bu nedenle aynı sayılmaz. Benzer belirti farklı süreçlerle ilişkili olabilir.",
          "Bir soru açıkça yalnız verilen okul tablosundaki eşleştirmeyi soruyorsa tablo kanıtını kullan. Gerçek bir kişinin yorgunluğu gibi tek bir gözlemi belirli bir vitamine kesin bağlama. Buradaki örneklerin amacı kavram ve görev ilişkisini öğretmektir; tıbbi karar üretmek değildir.",
        ],
      },
      {
        title: "Besin hazırlamada üç bölmeli miktar hesabı kur",
        paragraphs: [
          "Etkinlikte başlangıçtaki etkin C vitamini miktarı üç bölmede izlenir: katı besinde kalan, suya geçen ve bu deneyde etkin C vitamini olarak ölçülmeyen bölüm. Kapalı modelde bu üç bölümün toplamı başlangıca eşittir. Sayılar aynı keyfî miktar birimiyle verilmiştir; gram besin veya kişisel gereksinim değildir.",
          "Katı ve su miktarları ölçüldüyse etkinlik kaybı başlangıç−katı−su ile bulunur. Bu muhasebe vitamin kimliğini veya ölçülen etkinliğini kaybeden bölüm içindir; atomların yoktan kaybolması iddiası değildir. Başka bölmeler veya sızıntılar bulunuyorsa aynı üç bölmeli hesap ek bilgi olmadan kullanılamaz.",
        ],
      },
      {
        title: "Ölçülmeyen suyu sıfır diye kaydetme",
        paragraphs: [
          "Yalnız katıdaki miktar ölçüldüğünde kalan farkın ne kadarının suya geçtiği, ne kadarının etkinlik kaybı olduğu genellikle tek tek belirlenemez. Su ölçümünün yapılmamış olması, suyun vitamin içermediğine ilişkin bir ölçüm değildir. Olası değer aralığı ve kesin bilinen toplam ayrılmalıdır.",
          "Başlangıç miktarının tümü zaten katıda kalmışsa bu kapalı, negatif miktar içermeyen modelde suya geçiş ve kayıp sıfır olarak çıkarılabilir. Bu özel durumda sıfır, ölçüm yokluğundan değil miktar korunumu kanıtından gelir. Belirsizliği her durumda zorunlu kılmak da sıfır uydurmak kadar hatalı olabilir.",
        ],
      },
      {
        title: "Suyu tutmak ile kimyasal kaybı azaltmak aynı sonuç değildir",
        paragraphs: [
          "Suyu yemekte tutarsan yenebilir bölümdeki toplam katı+su olarak hesaplanabilir. Suyu dökersen yenebilir bölüm yalnız katıda kalan miktardır. Suya geçen miktarın yenebilir bölümden çıkarılması, daha önce olmuş kimyasal etkinlik kaybını geriye dönük olarak değiştirmez.",
          "Su ölçülmediyse ve yemekte tutuluyorsa yenebilir toplam da bazı koşullarda belirsiz kalır; katı miktarı alt, başlangıç miktarı üst sınır olabilir. Su dökülüyorsa katıda ölçülmüş miktar bilindiğinden yenebilir toplam kesin olabilir. Hangi niceliğin sorulduğunu belirtmeden yalnız “kayıp” sözcüğüne dayanma.",
        ],
      },
      {
        title: "Karşılaştırma deneyinde ısı ve suyu ayrı değiştir",
        paragraphs: [
          "Hazırlama koşullarının etkisini ayırmak için başlangıç örnekleri ve ölçüm yöntemi karşılaştırılabilir olmalıdır. Süre veya sıcaklıkla birlikte su miktarı ve suyun atılması da değişiyorsa yenebilir bölümdeki fark tek başına sıcaklığa bağlanamaz. Suyun ayrıca ölçülmesi dağılımla etkinlik kaybını ayırmaya yardım eder.",
          "Bir örnekte daha az vitamin bulunması hangi basamağın buna neden olduğunu tek başına söylemez. Başlangıç miktarı, işlem sonrası bölmeler ve ölçülemeyen bölümün kapsamı birlikte verilmelidir. Çözümlü örneklerde bu koşulların açık tutulması gerçek bir besinin her koşulda aynı oranda değiştiği izlenimini önler.",
        ],
      },
      {
        title: "Grup bilgisini ve miktar bilgisini ayrı denetle",
        paragraphs: [
          "Önce vitaminin organik düzenleyici rolünü ve çözünürlük grubunu, sonra istenen özel görevi veya deney niceliğini seç. Bir karışım hesabında bütün miktarların aynı birimde olduğundan emin ol. Ölçülmeyen bir bölmeye sıfır yazmak yerine korunumu ve olası aralığı kullan.",
          "Şemadaki katı, su ve kayıp bölmeleri HTML metninde de açıklanır. Kullanıcı tahmini modelle kıyaslanır; bir insanın vitamin durumu, sağlığı veya konuyu öğrenmişliği puanlanmaz. Kısa bir matematik gerekçesi de geçerlidir; önemli olan sonucu hangi verilenlerden çıkardığını kendinin açıklayabilmesidir.",
        ],
      },
      {
        title: "B12 örneğinde emilim basamaklarını görünür tut",
        paragraphs: [
          "Vitaminlerin büyük besin polimerleri gibi önce monomerlere parçalanması gerekmez. Bu ders düzeyi ayrım, her vitaminin her zarı engelsiz geçtiği anlamına gelmez. Besine bağlı B12’nin serbestleşmesi, mide kaynaklı iç faktörle ilişkisi ve özel bağırsak alımı gibi basamakları vardır; iç faktör vitaminin kendisi değil bir proteindir.",
          "Bir ön basamak verimsizse sonraki basamağa ulaşan miktar azalabilir. Ardışık yüzde hesaplarında her yüzde hangi giriş miktarına uygulanıyorsa onu kullan. Etkinlikte kişisel emilim ölçülmez; çözümlü örnekte verilen basamak yüzdeleri yalnız o özgün öğretim düzeni içindir, gerçek bir insanın genel emilim oranı değildir.",
        ],
      },
      {
        title: "Vitamin gereksinimini insan ve molekül koşuluyla kur",
        paragraphs: [
          "İnsan C vitamini gereksinimini karşılayacak sentez yoluna sahip değildir; başka canlıların bir vitamin sentezleyebilmesi bu yolu insana kazandırmaz. A vitamini için bazı bitkisel öncüller uygun dönüşümlerle etkinliğe katkı sağlar. D vitaminiyle ilişkili deri, karaciğer ve böbrek basamakları da kendi öncül ve koşullarını gerektirir.",
          "Vitaminin adı, besinsel kaynakta bulunan kimyasal biçim ve vücudun yararlanabildiği etkin biçim ayrı bilgidir. Bir vitaminin dönüşüm olanağı bütün vitaminlerin besinden karşılanma gereksinimini ortadan kaldırmaz. Tür, öncül, emilim ve görev bilgilerini birlikte kullan; tek tablodan bütün canlılar için yeterlilik veya kişiye gereken miktar çıkarma.",
        ],
      },
    ],
    minutes: 75,
    objectives: [
      "Vitaminlerin çözünürlük ve özel görevlerini örneklerle ilişkilendir.",
      "Öncül dönüşümü, depolama ve grup genellemelerini koşullarıyla açıkla.",
      "Ölçülen bölmelerden korunumu kur; ölçülmeyeni sıfır sayma.",
    ],
    source:
      "MEBİ TYT Biyoloji konu özetleri, OGM Dersler Cepte temel bileşikler ve Aurelia ilgili notlarının gerçekten okunan bölümleriyle karşılaştırılan özgün derin anlatım. Açık koşullu bağlantı, enerji ve miktar verileri öğretim modelleridir; alıştırmalar resmî sınav sorusu değildir.",
    examples: [
      {
        title: "İki örneğin korunma yüzdesini doğru ağırlıkla birleştir",
        prompt:
          "İki kapalı C vitamini deneyinde P başlangıç 60, katı 30, su 10; Q başlangıç 120, katı 60, su 50 birim. Her iki su da tutulup örnekler birleştiriliyor. Birleşik etkin miktarı, kaybı ve korunma oranını bul.",
        strategy:
          "Aynı birimde miktarları topla; iki yüzdeyi gerekçesiz eşit ağırlıkla ortalama.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "P etkin 40, kayıp 20; Q etkin 110, kayıp 10 birimdir. Başlangıç toplamı 180.",
          },
          {
            label: "2. adım",
            explanation: "Birleşik etkin miktar 40+110=150, kayıp 20+10=30.",
          },
          {
            label: "3. adım",
            explanation:
              "Korunma 150/180=5/6 yani%83⅓. İki başlangıç eşit olmadığından örnek yüzdelerinin basit ortalaması bu toplamı vermez.",
          },
        ],
        answer: "Etkin 150, kayıp 30; korunma 5/6.",
        check: "150+30=180; P veQ aynı miktar birimiyle toplanmıştır.",
        pitfall:
          "60 ve 120 farklı ağırlıklardır; iki yüzdeyi eşit ağırlıkla birleştirme.",
      },
      {
        title: "Kayıp iddiasını garanti edecek analizi tasarla",
        prompt:
          "Kapalı C vitamini deneyinde başlangıç 100, son katı 58 birim etkin miktar var; yeni giriş ve başka bölme yok. Su analizi yalnız 0≤W≤U üst sınırını raporluyor; Analiz sınırı fiziksel mümkün aralıkta seçiliyor: 0≤U≤42. Kimyasal etkinlik kaybının en az 30 birim olduğunu bütün uyumlu durumlarda garanti etmek istiyoruz. Bu garanti için kabul edilebilecek en büyük U nedir? Analiz U=15 bildirirse iddia garanti edilir mi; geçerli bir karşı durum göster.",
        strategy:
          "İddiayı kaybın en küçük olabileceği durumla sına; analizin üst sınırını bilinmeyen tasarım koşulu olarak çöz.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Korunum 100=58+W+D olduğundan kimyasal etkinlik kaybı D=42−W. Suya daha çok etkin madde gitmesi, aynı katı verisinde kimyasal kaybı daha küçük bırakır.",
          },
          {
            label: "2. adım",
            explanation:
              "Verilen üst sınır içinde en küçük kayıp 42−U olur. Bunun en az 30 kalması için 42−U≥30; yani U≤12 gerekir. Kabul edilebilecek en büyük üst sınır 12 birimdir.",
          },
          {
            label: "3. adım",
            explanation:
              "U=15 raporu W=15,D=27 durumuna izin verir:58+15+27=100 fakat 27<30. Bu nedenle en az 30 iddiası garanti edilmez. W=8,D=34 de aynı raporla uyumludur; iddianın her durumda yanlış olduğu da söylenmez.",
          },
        ],
        answer:
          "En büyük U12 birimdir. U15 raporu en az 30 kaybı garanti etmez; W15,D27 geçerli karşı durumdur.",
        check:
          "U12 sınırında en kötü W12,D30 toplamı 100 verir. U13’e izin verilse W13,D29 garantiyi bozar;12 gerçekten en büyük izinli üst sınırdır.",
        pitfall:
          "Bir analiz üst sınırını kesin ölçülmüş su miktarı sanmak veya garanti edilemeyen iddiayı bütün durumlarda yanlış saymak.",
      },
      {
        title: "İki özellikten anonim vitaminleri tanı",
        prompt:
          "U, V, W ayrı ayrı A, C, K vitaminlerinden biri. Üçü birbirinden farklıdır; A, C, K birer kez kullanılır. U veW yağda, V suda çözünüyor. V kolajen yapımını, W bazı pıhtılaşma proteinlerinin işlevini destekliyor. Hangi vitamin hangisidir; U mineral sayılır mı?",
        strategy:
          "Önce özgül görevleri eşleştir, sonra kalan adı ve molekül sınıfını belirle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Kolajen katkısı ve su grubu V=C ile uyumludur. Pıhtılaşma ve yağ grubu W=K.",
          },
          {
            label: "2. adım",
            explanation:
              "A, C, K birer kez kullanılacağı için U=A kalır; yağda çözünme koşulu da sağlanır.",
          },
          {
            label: "3. adım",
            explanation:
              "U organik vitamindir; düzenleyici görev veya yağda çözünme onu mineral yapmaz.",
          },
        ],
        answer: "U=A, V=C, W=K; U mineral değildir.",
        check:
          "Üç vitamin ayrı kullanılmış; iki yağ, bir su grubu koşulu sağlanmıştır.",
        pitfall:
          "Yalnızçözünürlük U ileW’yi ayıramaz; görev sütunu da gerekir.",
      },
      {
        title: "B12 alımında ardışık yüzdelerin paydasını izle",
        prompt:
          "Yalnız öğretim B12 modelinde başlangıç 100 besine bağlı birim var. %70’i serbestleşiyor; serbestleşenin%50’si gerekli bağlayıcıya bağlanıyor; bağlananın%80’i alınıyor. Başka yol yok. Son alınan ve her basamakta ilerleyemeyen miktarları bul.",
        strategy:
          "Her yüzdeyi o basamağın girişine uygula; gerçek kişiye emilim oranı atama.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "100×0,70=70 serbestleşir; 30 bağlı kalır. 70×0,50=35 bağlanır; 35 serbest birim bu yolu ilerleyemez.",
          },
          {
            label: "2. adım",
            explanation:
              "35×0,80=28 alınır; 7 bağlanmış birim alınmadan kalır.",
          },
          {
            label: "3. adım",
            explanation:
              "Toplam ilerleyemeyen 30+35+7=72; 28+72=100. Son oran%28’dir; 70+50+80 yüzdeleri toplanmaz.",
          },
        ],
        answer: "Alınan 28; basamak kayıpları 30,35,7.",
        check:
          "28+30+35+7=100; bu modelde kimyasal parçalanma varsayılmamıştır.",
        pitfall: "%80’i ilk 100’e uygulamak önceki basamakların sınırını aşar.",
      },
      {
        title: "Seyreltmede miktar ile derişimi ayır",
        prompt:
          "C vitamini deneyinde son katı 30 birim; 20 mL sudaki etkin derişim 2 birim/mL; kimyasal etkinlik kaybı 10 birim. Kapalı modelde başlangıcı bul. Ardından yalnız suya 20 mL saf su ekleniyor; bu aşamada başka kimyasal değişim yok. Etkin miktar ve derişim nasıl değişir?",
        strategy:
          "Su miktarını derişim×hacimle bul; eklenen saf suda vitamin bulunmadığını kullan.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İlk sudaki miktar 2×20=40 birimdir; başlangıç 30+40+10=80.",
          },
          {
            label: "2. adım",
            explanation:
              "Suyun hacmi 40 mL olur; etkin vitamin miktarı 40 birim kalır.",
          },
          {
            label: "3. adım",
            explanation:
              "Yeni derişim 40/40=1 birim/mL. Kimyasal kayıp bu saf su eklemesiyle değişmemiştir.",
          },
        ],
        answer: "Başlangıç 80; su miktarı 40 kalır, derişim 2→1.",
        check: "1 birim/mL×40mL=40 birim; başta 2×20 de 40.",
        pitfall:
          "Derişimin yarıya düşmesini vitamin miktarının yarıya inmesi sayma.",
      },
      {
        title: "Birden çok genelleme için en az kanıt kümesi seç",
        prompt:
          "Üç yanlış iddia: I suda çözünen hiç depolanmaz; II yağda çözünen üyelerin tablodaki görev etiketleri aynıdır; III bütün organik vitaminler enerji yakıtıdır. Kayıtlar: B12 suda, depo var, yakıt değil; A yağda, görme görevi; K yağda, pıhtılaşma görevi. Yalnız bu kayıtlarla üçünü çürütmek için en az kaç kayıt gerekir?",
        strategy:
          "Bir kaydın hangi iddiaya karşı örnek olduğunu işaretle; II için iki farklı görev kaydını karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "B12 tek kaydı I’i depo karşı örneğiyle, III’ü yakıt olmayan organik vitamin örneğiyle çürütür.",
          },
          {
            label: "2. adım",
            explanation:
              "II için iki yağda çözünen üyenin görev farkı gerekir: A veK birlikte bu farkı verir.",
          },
          {
            label: "3. adım",
            explanation:
              "Üç kaydın tamamı gerekir. B12’siz I kanıtı; A veyaK’den biri olmadan iki yağ üyesi arasında görev farkı eksik kalır.",
          },
        ],
        answer: "En az 3 kayıt: B12, A, K.",
        check: "B12→I veIII; A+K→II.",
        pitfall:
          "Bir örneğin bir evrensel iddiayı çürütebilmesini, iki üye arası görev farkı için tek kaydın yetmesiyle karıştırma.",
      },
    ],
    recall: [
      {
        prompt: "A, D, E, K ile B grubu, C hangi gruplardır?",
        answer:
          "A, D, E, K yağda; B grubu veC suda çözünür. Grup eşliği görev eşliği değildir.",
      },
      {
        prompt: "B12 hangi mutlak depo cümlesini bozar?",
        answer:
          "Suda çözünen hiçbir vitamin depolanmaz cümlesini; B12 anlamlı vücut depolarına sahip olabilir.",
      },
      {
        prompt: "Su ölçülmediyse miktarı neden 0 yazılmaz?",
        answer:
          "Ölçüm yokluğu sıfır ölçümü değildir; korunuma göre aralık hesaplanır.",
      },
      {
        prompt:
          "Başlangıç miktarının tamamı katıdaysa ölçülmeyen su ve kayıp ne olur?",
        answer:
          "Kapalı, negatif olmayan üç bölmeli modelde ikisi de 0 zorunlu olur.",
      },
      {
        prompt:
          "Vitaminin enerji metabolizmasındaki yardımı yakıt olduğu anlamına gelir mi?",
        answer:
          "Hayır; koenzim veya başka düzenleyici rol kalorili yakıt rolünden ayrıdır.",
      },
      {
        prompt:
          "D oluşumundaki deri, karaciğer ve böbrek bilgisi nasıl okunur?",
        answer:
          "Uygun öncül ve koşullarla ilişkili farklı basamaklardır; bütün vitaminler için yeterli sentez sonucu vermez.",
      },
    ],
  },
];
export const forge026BiologyCLessons: Lesson[] = [
  {
    id: "proteinler-ileri",
    subjectId: "tyt-biyoloji",
    title: {
      tr: "Proteinler: amino asit sırası, bağlar ve katlanma — ileri uygulama",
    },
    minutes: 45,
    objectives: [
      {
        tr: "Dizi,tepkime ve ölçüm koşullarını bağımsız kartlarda gerekçeyle uygulamak.",
      },
    ],
    body: [],
    source: {
      tr: "Kaynaklarla karşılaştırılmış özgün ileri alıştırmalar;resmî sınav sorusu değildir.",
    },
    tags: ["özgün-sorular", "ileri-uygulama", "forge026"],
    questions: [
      {
        id: "f026bc-proteinler-1",
        prompt: {
          tr: "Bir örnekte 5 ve 7 amino asitli iki ayrı açık zincir ile 4 amino asitli tek kapalı peptit halkası bulunuyor. Yan grup çapraz bağları yoktur. Toplam peptit bağı kaçtır?",
        },
        options: [
          {
            tr: "16",
          },
          {
            tr: "14",
          },
          {
            tr: "15",
          },
          {
            tr: "12",
          },
          {
            tr: "13",
          },
        ],
        answer: 1,
        hint: {
          tr: "Açık zincirlerde birim sayısından bir çıkar; halkada her birimin sonraki birime bağı vardır.",
        },
        explanation: {
          tr: "Açık zincirlerde birim sayısından bir çıkar; halkada her birimin sonraki birime bağı vardır. İki açık zincir 4+6=10; dört birimli halka 4 peptit bağı içerir. Toplam 10+4=14 bağdır; yalnız açık zincirler toplam birimden birer bağ eksiltir.",
        },
        skill: "f026bc-proteinler",
        guidance: {
          knowledge: [
            "Açık tek zincirde B=n−1, tek kapalı halkada B=n; yapı türleri ayrı sayılır.",
          ],
          strategy:
            "Üç yapı için ayrı satır aç; iki açık yapının uçlarını ve kapalı yapının çevrimini izleyip bağ sayılarını son satırda birleştir.",
          steps: [
            "Açık zincirlerde birim sayısından bir çıkar; halkada her birimin sonraki birime bağı vardır.",
            "İki açık zincir 4+6=10; dört birimli halka 4 peptit bağı içerir.",
            "Toplam 10+4=14 bağdır; yalnız açık zincirler toplam birimden birer bağ eksiltir.",
          ],
          optionReasons: [
            "Her birimi bir bağ sayar; açık zincirlerin iki uç farkını gözetmez.",
            "Doğru. (5−1)+(7−1)+4=14.",
            "Toplam 16 birimi tek açık zincir sanıp 16−1 hesaplar.",
            "Halkadan da iki bağı eksiltip 4−2=2 alır; dört birimli kapalı halkada 4 bağ bulunur.",
            "Üç yapıya da n−1 uygular:16−3=13; halka için bu kural geçerli değildir.",
          ],
          commonError:
            "Üç yapıya da n−1 uygular:16−3=13; halka için bu kural geçerli değildir.",
          check:
            "16 toplam birim; iki açık zincir nedeniyle toplam bağ 16−2=14. ",
        },
      },
      {
        id: "f026bc-proteinler-2",
        prompt: {
          tr: "Sekiz amino asitli tek kapalı peptit halkasında yalnız bir peptit bağı suyla kesiliyor. Başka bağ kopması yok. Parça sayısı ve kalan peptit bağı sırasıyla nedir?",
        },
        options: [
          {
            tr: "8; 0",
          },
          {
            tr: "2; 6",
          },
          {
            tr: "1; 7",
          },
          {
            tr: "1; 8",
          },
          {
            tr: "2; 7",
          },
        ],
        answer: 2,
        hint: {
          tr: "Kapalı halkada başlangıçta 8 bağ ve tek bağlı yapı vardır.",
        },
        explanation: {
          tr: "Kapalı halkada başlangıçta 8 bağ ve tek bağlı yapı vardır. İlk bağın kesilmesi halkayı açar; yapı henüz iki parçaya ayrılmaz. Bir açık sekizli zincir kalır:1 parça ve 8−1=7 bağ.",
        },
        skill: "f026bc-proteinler",
        guidance: {
          knowledge: [
            "Halkadaki ilk kesim çevrimi açar; açık zincirdeki sonraki kesimler bileşen sayısını artırır.",
          ],
          strategy:
            "Halkadaki kesilen bağı işaretle; kalan yoldan bütün birimlere hâlâ ulaşılıp ulaşılamadığını denetle, ardından kalan bağları say.",
          steps: [
            "Kapalı halkada başlangıçta 8 bağ ve tek bağlı yapı vardır.",
            "İlk bağın kesilmesi halkayı açar; yapı henüz iki parçaya ayrılmaz.",
            "Bir açık sekizli zincir kalır:1 parça ve 8−1=7 bağ.",
          ],
          optionReasons: [
            "Tek kesimi tam hidrolizle karıştırır; sekiz bağın tamamı kesilmemiştir.",
            "İki bağ kesilmiş gibi 8−2=6 alır ve iki parça varsayar.",
            "Doğru. İlk kesim halkayı tek açık zincire dönüştürür; kalan 7 bağdır.",
            "Kesilen bağı hâlâ var sayar; 8−1=7 kalmalıdır.",
            "Açık zincirdeki her kesim parça sayısını artırır kuralını henüz kapalı halkaya uygular.",
          ],
          commonError:
            "Açık zincirdeki her kesim parça sayısını artırır kuralını henüz kapalı halkaya uygular.",
          check: "Kalan 7 bağ+1 açık zincir=8 birim.",
        },
      },
      {
        id: "f026bc-proteinler-3",
        prompt: {
          tr: "Amino asitleri soldan 1–9 numaralı tek açık zincirde yalnız 3–4 ve 6–7 peptit bağları hidroliz ediliyor. Son parça sayısı ve serbest tek amino asit sayısı nedir?",
        },
        options: [
          {
            tr: "3; 0",
          },
          {
            tr: "3; 2",
          },
          {
            tr: "2; 0",
          },
          {
            tr: "9; 8",
          },
          {
            tr: "1; 2",
          },
        ],
        answer: 0,
        hint: {
          tr: "Kesimlerin ayırdığı birim gruplarını yaz:1–3,4–6,7–9.",
        },
        explanation: {
          tr: "Kesimlerin ayırdığı birim gruplarını yaz:1–3,4–6,7–9. Üç grubun da uzunluğu 3 olduğundan hiçbiri tek amino asit değildir. Sonuç 3 peptit parçası ve 0 serbest amino asittir; iki su kullanılmıştır.",
        },
        skill: "f026bc-proteinler",
        guidance: {
          knowledge: [
            "Parça uzunlukları kesim konumlarından çıkarılır; kopan bağ sayısı serbest amino asit sayısı değildir.",
          ],
          strategy:
            "Dokuz birimi sıra üzerinde gösterip belirtilen iki komşuluk bağlantısını sil; bağlantılı grupları ve tek başına kalan birimleri ayrı say.",
          steps: [
            "Kesimlerin ayırdığı birim gruplarını yaz:1–3,4–6,7–9.",
            "Üç grubun da uzunluğu 3 olduğundan hiçbiri tek amino asit değildir.",
            "Sonuç 3 peptit parçası ve 0 serbest amino asittir; iki su kullanılmıştır.",
          ],
          optionReasons: [
            "Doğru. Üç tripeptit oluşur; tek birimli parça yoktur.",
            "Kesim sayısını serbest amino asit sayısı sanır; bu kesimler üçlü parçalar verir.",
            "Kesim sayısı 2’yi parça sayısı alır; ilk açık zincir de sayılır.",
            "İki kesimi sekiz bağın tam hidrolizi sanır; bütün birimler serbestleşmez.",
            "İki kesim sonrasında tek bağlantılı yapı kaldığını varsayar.",
          ],
          commonError:
            "Kesim sayısını serbest amino asit sayısı sanır; bu kesimler üçlü parçalar verir.",
          check: "3+3+3=9; kalan bağlar 2+2+2=6, başlangıç 8−2=6.",
        },
      },
      {
        id: "f026bc-proteinler-4",
        prompt: {
          tr: "1–7 numaralı tek açık zincirde 1–2,2–3 ve 6–7 bağları kesiliyor. Başka bağ değişmiyor. Son parça sayısı ile serbest amino asit sayısı nedir?",
        },
        options: [
          {
            tr: "3; 4",
          },
          {
            tr: "7; 6",
          },
          {
            tr: "4; 4",
          },
          {
            tr: "3; 3",
          },
          {
            tr: "4; 3",
          },
        ],
        answer: 4,
        hint: {
          tr: "Bağlantıda kalan grupları yaz:1; 2; 3–4–5–6; 7.",
        },
        explanation: {
          tr: "Bağlantıda kalan grupları yaz:1; 2; 3–4–5–6; 7. Dört parça vardır; bunlardan 1,2 ve 7 tek birimlidir. Üç serbest amino asit ve bir dört birimli peptit bulunur; sonuç 4; 3.",
        },
        skill: "f026bc-proteinler",
        guidance: {
          knowledge: [
            "Açık zincirde k ayrı bağ kesimi k+1 parça verir; serbest birimler grafikte derecesi 0 olanlardır.",
          ],
          strategy:
            "Yedi birimin bağlantı çiziminde üç kesimi uygula; parça sayımı ile hiçbir peptit komşusu kalmayan birimlerin sayımını ayrı yap.",
          steps: [
            "Bağlantıda kalan grupları yaz:1; 2; 3–4–5–6; 7.",
            "Dört parça vardır; bunlardan 1,2 ve 7 tek birimlidir.",
            "Üç serbest amino asit ve bir dört birimli peptit bulunur; sonuç 4; 3.",
          ],
          optionReasons: [
            "Hem kesimleri parça hem de bütün parçaları amino asit sayar.",
            "Tam hidroliz olmuş gibi 7 serbest birim varsayar; yalnız 3 bağ kesilmiştir.",
            "Her parçayı serbest amino asit sayar; 3–6 parçasında 4 birim bağlıdır.",
            "Kesim sayısı 3’ü parça sayısı alır; başlangıç zincirine üç yeni parça eklenir.",
            "Doğru. Gruplar 1,2,3–6,7; dört parça ve üç tek birimdir.",
          ],
          commonError:
            "Her parçayı serbest amino asit sayar; 3–6 parçasında 4 birim bağlıdır.",
          check: "1+1+4+1=7; kalan 3 peptit bağı dört birimli parçadadır.",
        },
      },
      {
        id: "f026bc-proteinler-5",
        prompt: {
          tr: "Uzunlukları 2,3,5 ve 6 amino asit olan dört hazır açık peptit, uçlarından eklenerek tek açık zincir yapılıyor. Net dehidrasyon modelinde yalnız bu birleştirmede kaç yeni peptit bağı ve su oluşur?",
        },
        options: [
          {
            tr: "16 bağ; 16 su",
          },
          {
            tr: "3 bağ; 3 su",
          },
          {
            tr: "4 bağ; 4 su",
          },
          {
            tr: "15 bağ; 15 su",
          },
          {
            tr: "12 bağ; 12 su",
          },
        ],
        answer: 1,
        hint: {
          tr: "Başlangıçta dört ayrı zincir vardır; mevcut iç bağlar yeniden kurulmaz.",
        },
        explanation: {
          tr: "Başlangıçta dört ayrı zincir vardır; mevcut iç bağlar yeniden kurulmaz. Dört zinciri art arda bağlamak için zincirler arasına 3 bağlantı eklenir. Yeni bağ 3 ve yeni su 3’tür; son toplam bağ 16−1=15 olsa da bunun 12’si önceden vardır.",
        },
        skill: "f026bc-proteinler",
        guidance: {
          knowledge: [
            "Hazır zincirlerin birleştirilmesinde yalnız eklenen bağlar için su sayılır.",
          ],
          strategy:
            "Önceden var olan iç bağları bu aşamanın dışında tut; dört hazır zinciri tek yapıya bağlayan yeni birleşme noktalarını çiz ve suyu bu noktalarla eşleştir.",
          steps: [
            "Başlangıçta dört ayrı zincir vardır; mevcut iç bağlar yeniden kurulmaz.",
            "Dört zinciri art arda bağlamak için zincirler arasına 3 bağlantı eklenir.",
            "Yeni bağ 3 ve yeni su 3’tür; son toplam bağ 16−1=15 olsa da bunun 12’si önceden vardır.",
          ],
          optionReasons: [
            "Toplam 16 amino asit sayısını bağ ve su sayısı yapar.",
            "Doğru. Dört başlangıç bileşenini bire indirmek 3 yeni bağlantı gerektirir.",
            "Her başlangıç zinciri için bir yeni bağlantı sayar; dört zincir arasında üç ara vardır.",
            "Son zincirin bütün 15 bağını bu aşamada yeni kurulmuş sayar.",
            "Başlangıçtaki(2−1)+(3−1)+(5−1)+(6−1)=12 bağı yeni oluşanla karıştırır.",
          ],
          commonError:
            "Son zincirin bütün 15 bağını bu aşamada yeni kurulmuş sayar.",
          check: "Başlangıç 12+ek 3=son 15 bağ.",
        },
      },
      {
        id: "f026bc-proteinler-6",
        prompt: {
          tr: "Üç glisin ve iki alaninden tek açık beşli peptit oluşturuluyor. Serbest glisin 75, alanin 89 ve su 18 g/mol alınsın; her yeni peptit bağında bir su ayrıldığı net model kullanılsın. Peptidin molar kütlesi kaç g/mol olur?",
        },
        options: [
          {
            tr: "385",
          },
          {
            tr: "475",
          },
          {
            tr: "331",
          },
          {
            tr: "403",
          },
          {
            tr: "313",
          },
        ],
        answer: 2,
        hint: {
          tr: "Serbest amino asitlerin toplamı 3×75+2×89=403 g/mol.",
        },
        explanation: {
          tr: "Serbest amino asitlerin toplamı 3×75+2×89=403 g/mol. Açık beşli zincirde 4 peptit bağı için 4×18=72 g/mol su ayrılır. 403−72=331 g/mol; zincir kurarken su kütlesi çıkarılır.",
        },
        skill: "f026bc-proteinler",
        guidance: {
          knowledge: [
            "Peptidin net kütlesi serbest amino asit toplamından yeni bağ başına su kütlesinin çıkarılmasıyla bulunur.",
          ],
          strategy:
            "Glisin ve alaninin serbest kütlelerini adetleriyle ağırlıklandır; açık beşliyi kurarken ayrılan suyun kütlesini bu toplamdan çıkar.",
          steps: [
            "Serbest amino asitlerin toplamı 3×75+2×89=403 g/mol.",
            "Açık beşli zincirde 4 peptit bağı için 4×18=72 g/mol su ayrılır.",
            "403−72=331 g/mol; zincir kurarken su kütlesi çıkarılır.",
          ],
          optionReasons: [
            "Yalnız tek bağ kurulmuş gibi 403−18=385 alır.",
            "Dört suyu çıkarmak yerine ekler:403+72=475.",
            "Doğru. 403−4×18=331 g/mol.",
            "Su ayrılmasını atlayıp serbest birimlerin 403 g/mol toplamını verir.",
            "Beşli halka gibi 5 su çıkarır:403−90=313.",
          ],
          commonError:
            "Su ayrılmasını atlayıp serbest birimlerin 403 g/mol toplamını verir.",
          check: "331+72=403 g/mol kütle korunumu.",
        },
      },
      {
        id: "f026bc-proteinler-7",
        prompt: {
          tr: "Molar kütlesi 548 g/mol olan yedi amino asitli tek açık peptit tamamen hidroliz ediliyor. Su18 g/mol ve başka kimyasal değişim yoktur. Elde edilen serbest amino asitlerin toplam molar kütlesi kaç g/mol olur?",
        },
        options: [
          {
            tr: "548",
          },
          {
            tr: "108",
          },
          {
            tr: "674",
          },
          {
            tr: "440",
          },
          {
            tr: "656",
          },
        ],
        answer: 4,
        hint: {
          tr: "Yedili açık zincirin 6 peptit bağı tam hidrolizde ayrılır.",
        },
        explanation: {
          tr: "Yedili açık zincirin 6 peptit bağı tam hidrolizde ayrılır. Altı su eklenir:6×18=108 g/mol. Ürün toplamı 548+108=656 g/mol; tüketilen su da ürünlerin kütlesine katılır.",
        },
        skill: "f026bc-proteinler",
        guidance: {
          knowledge: [
            "Tam hidrolizde her peptit bağı bir su tüketir; su atomları ürünlerde korunur.",
          ],
          strategy:
            "Tam hidrolizi zincir kurulmasının ters kütle bilançosu olarak yaz; yedili açık yapının her bağında alınan suyu başlangıç peptidine ekle.",
          steps: [
            "Yedili açık zincirin 6 peptit bağı tam hidrolizde ayrılır.",
            "Altı su eklenir:6×18=108 g/mol.",
            "Ürün toplamı 548+108=656 g/mol; tüketilen su da ürünlerin kütlesine katılır.",
          ],
          optionReasons: [
            "Reaktant suyunun kütlesini hesaba katmaz.",
            "Yalnız kullanılan suyun 108 g/mol kütlesini ürün toplamı sanır.",
            "Yedi bağ var sanıp 7×18=126 ekler:674.",
            "Hidrolizde su eklemek yerine çıkarır:548−108=440.",
            "Doğru. Altı bağ için 108 g/mol su eklenir; toplam 656.",
          ],
          commonError: "Hidrolizde su eklemek yerine çıkarır:548−108=440.",
          check: "656−548=108=6×18.",
        },
      },
      {
        id: "f026bc-proteinler-8",
        prompt: {
          tr: "Yan grubu R=H olan glisin ile R=CH₃ olan alanin karşılaştırılıyor. Standart alfa amino asit iskeleti için hangi sonuç doğrudur?",
        },
        options: [
          {
            tr: "Alanin amino asit değil monosakkarittir.",
          },
          {
            tr: "Her ikisinin R grubu zorunlu kükürt içerir.",
          },
          {
            tr: "İki yan grup aynı olduğundan iki molekül özdeştir.",
          },
          {
            tr: "Glisinin merkez karbonunda hiç H bulunmaz.",
          },
          {
            tr: "Yan gruplar farklıdır; glisinin merkez karbonuna iki H bağlıdır.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Ortak iskelette merkez karbona bir H zaten bağlıdır.",
        },
        explanation: {
          tr: "Ortak iskelette merkez karbona bir H zaten bağlıdır. Glisinde R de H olduğundan merkezde iki H bulunur; alaninde R metildir. Yan grup farkı amino asit türünü değiştirir; glisinin merkez karbonu bu nedenle asimetrik değildir.",
        },
        skill: "f026bc-proteinler",
        guidance: {
          knowledge: [
            "Ortak iskelet ile değişen R grubu ayrılır; her alfa karbon koşulsuz asimetrik sayılmaz.",
          ],
          strategy:
            "Ortak alfa karbon çizimini bir kez kur; R yerine her yan grubu ayrı yerleştirip merkez karbona doğrudan bağlı grupları say.",
          steps: [
            "Ortak iskelette merkez karbona bir H zaten bağlıdır.",
            "Glisinde R de H olduğundan merkezde iki H bulunur; alaninde R metildir.",
            "Yan grup farkı amino asit türünü değiştirir; glisinin merkez karbonu bu nedenle asimetrik değildir.",
          ],
          optionReasons: [
            "Metil yan grup alanini şeker yapmaz; ortak amino–karboksil iskeleti verilmiştir.",
            "VerilenH veCH₃ yan gruplarında S atomu yoktur.",
            "H ileCH₃ aynı atom grubu değildir.",
            "R=H verisini ve ortak merkez H’sini yok sayar.",
            "Doğru. Ortak H ve R=H birlikte glisinde iki merkez H verir.",
          ],
          commonError: "R=H verisini ve ortak merkez H’sini yok sayar.",
          check:
            "Glisinde merkez komşularıH, H, amino, karboksil; iki komşu aynı.",
        },
      },
      {
        id: "f026bc-proteinler-9",
        prompt: {
          tr: "Bir proteinde sistein ve metiyonin bulunmadığı, diğer standart amino asitlerden oluştuğu verilmiştir. Bu iki türün kükürt içeren standart amino asitler olduğu biliniyor. Protein için hangi yorum uygundur?",
        },
        options: [
          {
            tr: "S yerine bütün peptit bağları ester bağına dönüşür.",
          },
          {
            tr: "Peptit yapısı korunabilir; her proteinin S içermesi zorunlu değildir.",
          },
          {
            tr: "S yoksa protein hiçbir amino asit içeremez.",
          },
          {
            tr: "Azot içermemesi zorunludur.",
          },
          {
            tr: "Protein olması için 20 türün tamamını içermelidir.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Protein olma ölçütünü amino asit zinciri ve peptit bağları üzerinden kur.",
        },
        explanation: {
          tr: "Protein olma ölçütünü amino asit zinciri ve peptit bağları üzerinden kur. Kükürt belirli yan gruplarla ilişkilidir; bu türler yoksa S zorunluluğu kurulamaz. Peptit omurgası başka amino asitlerle de oluşabilir; bütün 20 tür tek proteinde şart değildir.",
        },
        skill: "f026bc-proteinler",
        guidance: {
          knowledge: [
            "Proteinler C, H, O, N içerir; S varlığı kullanılan amino asitlere bağlıdır.",
          ],
          strategy:
            "Kükürdün hangi yan gruplardan gelebileceğini verilen iki türe bağla; element bileşimi çıkarımıyla peptit omurgasının kurulabilmesini ayrı sına.",
          steps: [
            "Protein olma ölçütünü amino asit zinciri ve peptit bağları üzerinden kur.",
            "Kükürt belirli yan gruplarla ilişkilidir; bu türler yoksa S zorunluluğu kurulamaz.",
            "Peptit omurgası başka amino asitlerle de oluşabilir; bütün 20 tür tek proteinde şart değildir.",
          ],
          optionReasons: [
            "Yan grup bileşimi peptit omurgasını ester bağına dönüştürmez.",
            "Doğru. Kükürt her protein için zorunlu bir element değildir.",
            "Kükürt içermeyen amino asitler de peptit oluşturabilir.",
            "Amino asitlerin amino kısmında N bulunur; S yokluğu N yokluğu değildir.",
            "Yirmi yaygın tür, her proteinin hepsini içerdiğini göstermez.",
          ],
          commonError:
            "Sistein ve metiyonin yoksa peptit omurgası kurulamaz, dolayısıyla bu yapı protein olamaz sanmak.",
          check: "Yan grubun atomu ile omurga bağ türü farklı özelliklerdir.",
        },
      },
      {
        id: "f026bc-proteinler-10",
        prompt: {
          tr: "N ucundan C ucuna yazılmış iki açık dizi A–A–G–S–G ve A–G–A–S–G biçimindedir; A alanin, G glisin, S serindir. Diziler yalnız hangi konumlarda farklıdır?",
        },
        options: [
          {
            tr: "2 ve 3",
          },
          {
            tr: "1 ve 5",
          },
          {
            tr: "Hiçbir konumda",
          },
          {
            tr: "3 ve 5",
          },
          {
            tr: "2 ve 4",
          },
        ],
        answer: 0,
        hint: {
          tr: "Konumları soldan 1–5 numarala ve iki diziyi alt alta koy.",
        },
        explanation: {
          tr: "Konumları soldan 1–5 numarala ve iki diziyi alt alta koy. İlk, dördüncü ve beşinci konumlar aynıdır; ikinciA/G, üçüncüG/A farklıdır. Bileşim iki dizide de 2A,2G,1S olsa da fark 2 ve 3 konumlarındadır.",
        },
        skill: "f026bc-proteinler",
        guidance: {
          knowledge: [
            "Dizi eşitliği N→C yönünde konum konum eşitlik gerektirir.",
          ],
          strategy:
            "İki diziyi N uçları aynı sütunda olacak biçimde hizala; eşit toplam bileşime bakmak yerine her sıra numarasındaki harf çiftini karşılaştır.",
          steps: [
            "Konumları soldan 1–5 numarala ve iki diziyi alt alta koy.",
            "İlk, dördüncü ve beşinci konumlar aynıdır; ikinciA/G, üçüncüG/A farklıdır.",
            "Bileşim iki dizide de 2A,2G,1S olsa da fark 2 ve 3 konumlarındadır.",
          ],
          optionReasons: [
            "Doğru. İkinci ve üçüncü birimler yer değişmiştir; toplam bileşim korunur.",
            "İlk konumA/A, beşinciG/G olduğundan ikisi de aynıdır.",
            "Aynı toplam tür sayısını aynı sıra sanır; iki konum değişmiştir.",
            "Üçüncü değişir ama beşinciG/G korunur; ikinci farkı atlar.",
            "İkinci değişir ama dördüncüS/S korunur; üçüncü farkı atlar.",
          ],
          commonError:
            "N→C sütunlarını karşılaştırmadan ilk veya son konumu değişmiş saymak; aynı toplam bileşimi aynı sıra sanmak.",
          check:
            "İki dizide amino asit sayısı 5, peptit bağı 4; bu eşitlik sıra eşitliği değildir.",
        },
      },
      {
        id: "f026bc-proteinler-11",
        prompt: {
          tr: "Altı birimli tek açık zincirin iki örneği var. X’te 2–3 ve 4–5; Y’de 1–2 ve 2–3 bağları kesiliyor. X ve Y için serbest amino asit sayıları sırasıyla nedir?",
        },
        options: [
          {
            tr: "3; 3",
          },
          {
            tr: "0; 0",
          },
          {
            tr: "2; 2",
          },
          {
            tr: "0; 2",
          },
          {
            tr: "2; 0",
          },
        ],
        answer: 3,
        hint: {
          tr: "X’in parçaları 1–2,3–4,5–6: üç ikili peptit.",
        },
        explanation: {
          tr: "X’in parçaları 1–2,3–4,5–6: üç ikili peptit. Y’nin parçaları 1; 2; 3–6: iki tek birim ve bir dörtlü peptit. Her ikisinde parça sayısı 3 iken serbest amino asit sayıları 0 ve 2’dir.",
        },
        skill: "f026bc-proteinler",
        guidance: {
          knowledge: [
            "Aynı sayıda kesim, aynı parça sayısını verebilir; serbest amino asit sayısı yine konuma bağlıdır.",
          ],
          strategy:
            "X ve Y için aynı altılı omurganın iki ayrı çizimini kullan; her çizimde kesimlerden sonra yalnız kalan birimleri işaretleyerek sonuçları karşılaştır.",
          steps: [
            "X’in parçaları 1–2,3–4,5–6: üç ikili peptit.",
            "Y’nin parçaları 1; 2; 3–6: iki tek birim ve bir dörtlü peptit.",
            "Her ikisinde parça sayısı 3 iken serbest amino asit sayıları 0 ve 2’dir.",
          ],
          optionReasons: [
            "Üç parçanın her birini tek amino asit sanır.",
            "Y’de 1 ve 2’nin iki komşu bağlantısı da kesildiği için serbest olduklarını atlar.",
            "İki kesimi her örnekte iki serbest amino asit sanır.",
            "Doğru. Kesim yeri X’te üç ikili, Y’de iki tek birim oluşturur.",
            "X ve Y’nin serbest birim sayılarını ters verir.",
          ],
          commonError: "İki kesimi her örnekte iki serbest amino asit sanır.",
          check:
            "Her örnekte toplam uzunluk 6, kalan bağ 3; serbest birim dağılımı farklı.",
        },
      },
      {
        id: "f026bc-proteinler-12",
        prompt: {
          tr: "Standart peptit omurgasında bir amino asidin karboksil tarafı ile diğerinin amino tarafı arasında kurulan bağ hangisidir?",
        },
        options: [
          {
            tr: "Karbonil C ile N arasında peptit bağı",
          },
          {
            tr: "Gliserol ile yağ asidi arasında ester bağı",
          },
          {
            tr: "İki fosfat arasında fosfodiester bağı",
          },
          {
            tr: "İki yan grup arasında zorunlu disülfit bağı",
          },
          {
            tr: "İki su arasında hidrojen bağı",
          },
        ],
        answer: 0,
        hint: {
          tr: "Bağlanan işlevsel grupları belirle: karboksil ve amino.",
        },
        explanation: {
          tr: "Bağlanan işlevsel grupları belirle: karboksil ve amino. Net yoğunlaşmada karboksil karbonu ile amino azotu arasında C–N bağlantısı oluşur. Bu bağ amid niteliğindeki peptit bağıdır; yan grup veya başka biyomolekül bağı değildir.",
        },
        skill: "f026bc-proteinler",
        guidance: {
          knowledge: [
            "Peptit bağı bir kovalent amid bağlantısıdır; katlanma etkileşimleriyle eşitlenmez.",
          ],
          strategy:
            "İki işlevsel grubun birleştiği omurga bölgesini çiz; bu bağlantıyı yan grup veya başka makromolekül bağlarını anlatan seçeneklerden ayır.",
          steps: [
            "Bağlanan işlevsel grupları belirle: karboksil ve amino.",
            "Net yoğunlaşmada karboksil karbonu ile amino azotu arasında C–N bağlantısı oluşur.",
            "Bu bağ amid niteliğindeki peptit bağıdır; yan grup veya başka biyomolekül bağı değildir.",
          ],
          optionReasons: [
            "Doğru. Peptit bağı omurgadaki karbonilC–N bağlantısıdır.",
            "Ester gliserol–yağ asidi bağlamıdır; verilen amino grubunun N atomunu içermez.",
            "Fosfodiester, bir fosfatın iki ester bağlantısıyla bağlanmasını anlatır; yalnız iki fosfat arası bağ diye tanımlanmaz. Seçenekteki ifade karboksil karbonu ile amino azotu arasındaki peptit C–N bağı değildir.",
            "Disülfit belirliS içeren yan gruplar arasında olabilir; genel peptit omurgası değildir.",
            "Hidrojen etkileşimi bu kovalent C–N bağlantısının adı değildir.",
          ],
          commonError:
            "Sistein yan grupları arasında kurulabilen disülfit bağını genel karboksil–amino omurga bağlantısı sanmak.",
          check: "Bağın iki tarafında karbonil C ve N bulunur.",
        },
      },
      {
        id: "f026bc-proteinler-13",
        prompt: {
          tr: "Uzunlukları 3,5 ve 7 olan üç açık polipeptit ayrıca iki zincirler arası disülfit bağıyla birleşiyor. Yalnız peptit bağlarının toplam sayısı kaçtır?",
        },
        options: [
          {
            tr: "10",
          },
          {
            tr: "12",
          },
          {
            tr: "15",
          },
          {
            tr: "13",
          },
          {
            tr: "14",
          },
        ],
        answer: 1,
        hint: {
          tr: "Üç omurgayı ayrı say: (3−1)+(5−1)+(7−1).",
        },
        explanation: {
          tr: "Üç omurgayı ayrı say: (3−1)+(5−1)+(7−1). Peptit toplamı 2+4+6=12’dir. İki disülfit S–S yan grup bağlantısıdır; peptit toplamına eklenmez.",
        },
        skill: "f026bc-proteinler",
        guidance: {
          knowledge: [
            "Zincirler arası yan grup bağları, her zincirin peptit omurgası sayımından ayrıdır.",
          ],
          strategy:
            "Her açık omurganın bağ sayısını kendi uzunluğundan bul; zincirleri tutan yan grup köprülerini peptit bağı toplamına katma.",
          steps: [
            "Üç omurgayı ayrı say: (3−1)+(5−1)+(7−1).",
            "Peptit toplamı 2+4+6=12’dir.",
            "İki disülfit S–S yan grup bağlantısıdır; peptit toplamına eklenmez.",
          ],
          optionReasons: [
            "Üç zincir eksiltmesine ek olarak iki disülfidi de çıkarır:15−3−2=10.",
            "Doğru. 15 amino asit−3 açık zincir=12 peptit bağı.",
            "Toplam amino asit sayısı 15’i bağ sayısı yapar.",
            "Bütün 15 birimi iki açık zincir gibi sayar:15−2=13.",
            "İki disülfit bağını peptit toplamına ekler:12+2=14.",
          ],
          commonError: "İki disülfit bağını peptit toplamına ekler:12+2=14.",
          check: "2+4+6=12; disülfit 2 ayrı sütunda kalır.",
        },
      },
      {
        id: "f026bc-proteinler-14",
        prompt: {
          tr: "Bir enzimin ısı işleminden önce ve sonra tek açık, halkasız ana zincir uzunluğu 90 amino asit olarak ölçülüyor; işlemden sonra doğal katlanması ve etkinliği bozuluyor. Tam peptit hidrolizi saptanmıyor. En doğrudan sonuç hangisidir?",
        },
        options: [
          {
            tr: "Peptit bağı sayısı 90’dan 0’a inmiştir.",
          },
          {
            tr: "90 serbest amino asit kesin oluşmuştur.",
          },
          {
            tr: "Ana zincirde amino asit kalmamıştır.",
          },
          {
            tr: "Protein kesinlikle yeniden tam etkinlik kazanacaktır.",
          },
          {
            tr: "Katlanma bozulması vardır; 90 birimin serbestleştiği söylenemez.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Ölçülen uzunluğun 90 kalmasıyla serbest monomer oluşumunu ayır.",
        },
        explanation: {
          tr: "Ölçülen uzunluğun 90 kalmasıyla serbest monomer oluşumunu ayır. Katlanma ve işlev değişmiş; tam hidroliz kanıtı verilmemiştir. Denatürasyonla uyumlu sonuç vardır; serbest amino asit ve tam geri dönüş sonucu yoktur.",
        },
        skill: "f026bc-proteinler",
        guidance: {
          knowledge: [
            "Denatürasyon katlanmayı değiştirir; tam hidroliz ve renatürasyon ayrı kanıt ister.",
          ],
          strategy:
            "Ana zincir uzunluğu, doğal katlanma ve etkinliği üç ayrı veri olarak yaz; ısı işlemini her birini zorunlu aynı biçimde değiştiren tek olay saymadan değerlendir.",
          steps: [
            "Ölçülen uzunluğun 90 kalmasıyla serbest monomer oluşumunu ayır.",
            "Katlanma ve işlev değişmiş; tam hidroliz kanıtı verilmemiştir.",
            "Denatürasyonla uyumlu sonuç vardır; serbest amino asit ve tam geri dönüş sonucu yoktur.",
          ],
          optionReasons: [
            "Açık 90’lı zincirde başlangıç 89 bağ vardır; ne 90 ne de verilere göre 0 denebilir.",
            "Zincir korunumu verisini yok sayıp tam hidroliz varsayar.",
            "90 amino asitli zincir ölçümünü doğrudan çürütür.",
            "Yeniden katlanma her protein ve işlem için garanti değildir.",
            "Doğru. Şekil/işlev kanıtı denatürasyonla uyumludur; tam hidroliz ayrı olaydır.",
          ],
          commonError:
            "Zincir korunumu verisini yok sayıp tam hidroliz varsayar.",
          check:
            "Uzunluk 90 kalmış; etkinliğin azalması tek başına omurga kesimi değildir.",
        },
      },
      {
        id: "f026bc-proteinler-15",
        prompt: {
          tr: "Aynı proteinin iki örneği farklı işlemlerden sonra başlangıç koşullarına alınıyor. X’in etkinliği başlangıcın %70’ine, Y’ninki %10’una dönüyor; aynı yöntemle ölçülüyor. Hangi çıkarım veriyi aşmaz?",
        },
        options: [
          {
            tr: "Y kesin hiç protein içermez.",
          },
          {
            tr: "X başlangıç etkinliğinin tamamına dönmüştür.",
          },
          {
            tr: "X ve Y’nin amino asit sıraları kesin farklıdır.",
          },
          {
            tr: "Bu koşullarda geri kazanılan etkinlik derecesi farklıdır; tam geri dönüş kanıtlanmamıştır.",
          },
          {
            tr: "Bütün proteinler her işlemden sonra %70 döner.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Başlangıç%100 ile son%70 ve%10’u karşılaştır.",
        },
        explanation: {
          tr: "Başlangıç%100 ile son%70 ve%10’u karşılaştır. İki örnekte de tam etkinlik yoktur; X’te geri kazanım daha fazladır. Bu veri işlem ve protein kapsamındadır; dizi değişimi veya bütün proteinler hakkında kesinlik kurmaz.",
        },
        skill: "f026bc-proteinler",
        guidance: {
          knowledge: [
            "Renatürasyon işlevin kısmen ya da uygun koşulda geri kazanılmasıyla araştırılır; evrensel garanti değildir.",
          ],
          strategy:
            "Başlangıç etkinliğini ortak referans alıp iki geri dönüş yüzdesini ayrı karşılaştır; ölçülmeyen bağ kopması veya tam eski hâle dönüş hakkında ek iddia kurma.",
          steps: [
            "Başlangıç%100 ile son%70 ve%10’u karşılaştır.",
            "İki örnekte de tam etkinlik yoktur; X’te geri kazanım daha fazladır.",
            "Bu veri işlem ve protein kapsamındadır; dizi değişimi veya bütün proteinler hakkında kesinlik kurmaz.",
          ],
          optionReasons: [
            "Düşük etkinlik protein yokluğu ölçümü değildir.",
            "%70’i%100 ile eşitler.",
            "Etkinlik ölçümü tek başına amino asit dizisini belirlemez.",
            "Doğru. Ölçülen etkinlik geri kazanımı X’te daha yüksektir; ikisi de%100 değildir.",
            "Tek protein ve iki işlemin verisini bütün proteinlere taşır.",
          ],
          commonError: "%70’i%100 ile eşitler.",
          check: "70<100 ve 10<100; tam geri dönüş iddiası desteklenmez.",
        },
      },
      {
        id: "f026bc-proteinler-16",
        prompt: {
          tr: "Bir tabloda H proteininin O₂ bağlayıp taşıdığı, K’nın lifli doku yapısına katıldığı, A’nın belirli yabancı molekülleri tanıdığı yazıyor. Tabloya göre hangi görev sırası uygundur?",
        },
        options: [
          {
            tr: "Taşıma; yapı; savunma",
          },
          {
            tr: "Savunma; taşıma; yapı",
          },
          {
            tr: "Yapı; savunma; taşıma",
          },
          {
            tr: "Üçü de yalnız enerji deposu",
          },
          {
            tr: "Üçü de kesin aynı enzim",
          },
        ],
        answer: 0,
        hint: {
          tr: "H’nin bağlama/taşıma, K’nın doku yapısı, A’nın tanıma işlevini ayrı oku.",
        },
        explanation: {
          tr: "H’nin bağlama/taşıma, K’nın doku yapısı, A’nın tanıma işlevini ayrı oku. Sırasıyla taşıma, yapı ve savunma görevleriyle ilişki kur. Ortak protein yapısı görevleri özdeş yapmaz; kataliz verisi yoktur.",
        },
        skill: "f026bc-proteinler",
        guidance: {
          knowledge: [
            "Protein ailesi farklı görevler içerir; molekül sınıfı görev eşitliği değildir.",
          ],
          strategy:
            "Tablodaki her proteinin yaptığı işi belirten fiili işaretle; taşıma, dokuya katılma ve tanıma görevlerini verilen sıraya göre eşleştir.",
          steps: [
            "H’nin bağlama/taşıma, K’nın doku yapısı, A’nın tanıma işlevini ayrı oku.",
            "Sırasıyla taşıma, yapı ve savunma görevleriyle ilişki kur.",
            "Ortak protein yapısı görevleri özdeş yapmaz; kataliz verisi yoktur.",
          ],
          optionReasons: [
            "Doğru. Tablodaki üç ayrı işlevi H, K, A sırasıyla eşler.",
            "H’nin taşımasını savunma, K’nın yapısını taşıma, A’nın tanımasını yapı sanır.",
            "H’yi yapı, K’yı savunma, A’yı taşıma yaparak üç veriyi de yanlış eşler.",
            "Tablo üç ayrı biyolojik görev verir; yalnız enerji deposu sonucu bunlarla çelişir.",
            "Aktif bölge veya tepkime katalizi verisi yokken üçünü aynı enzim sayar.",
          ],
          commonError:
            "H’yi yapı, K’yı savunma, A’yı taşıma yaparak üç veriyi de yanlış eşler.",
          check: "Yanıt H, K, A sırasını korumalıdır.",
        },
      },
      {
        id: "f026bc-proteinler-17",
        prompt: {
          tr: "Bir gendeki AAA kodonu AAG’ye değişiyor. Bu soruda verilen kodon tablosunda hem AAA hem AAG lizin amino asidini belirtmektedir. Başka değişim yoksa polipeptidin bu konumu için ne söylenir?",
        },
        options: [
          {
            tr: "Bütün katlanma ve işlev her koşulda kesin bozulur.",
          },
          {
            tr: "Lizin kesin glisine dönüşür.",
          },
          {
            tr: "Polipeptitte bir peptit bağı kesin eklenir.",
          },
          {
            tr: "Lizin korunur; her DNA değişimi amino asidi değiştirmek zorunda değildir.",
          },
          {
            tr: "Bu konumdaki amino asit tamamen yok olur.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Kodon tablosundaki iki eşlemeyi birlikte kullan: AAA→lizin, AAG→lizin.",
        },
        explanation: {
          tr: "Kodon tablosundaki iki eşlemeyi birlikte kullan: AAA→lizin, AAG→lizin. Kodonda değişim olsa da bu konumda yazılan amino asit aynıdır. Bu veri amino asit değişimi gerektirmez; bütün işlev hakkında kesin kayıp çıkarılmaz.",
        },
        skill: "f026bc-proteinler",
        guidance: {
          knowledge: [
            "Genetik değişimin protein sonucunu belirlemek için kodon ve değişim türü gerekir.",
          ],
          strategy:
            "Eski ve yeni kodonu verilen tablo üzerinden ayrı ayrı amino aside çevir; DNA harfindeki değişimle elde edilen amino asit çıktısını karşılaştır.",
          steps: [
            "Kodon tablosundaki iki eşlemeyi birlikte kullan: AAA→lizin, AAG→lizin.",
            "Kodonda değişim olsa da bu konumda yazılan amino asit aynıdır.",
            "Bu veri amino asit değişimi gerektirmez; bütün işlev hakkında kesin kayıp çıkarılmaz.",
          ],
          optionReasons: [
            "Aynı amino asit sonucundan koşulsuz bütün işlev kaybı çıkarılamaz.",
            "Glisin eşlemesi tabloda yoktur; iki kodon da lizin olarak verilmiştir.",
            "Zincire yeni bir amino asit ekleme verisi yoktur.",
            "Doğru. Verilen tablo iki kodonu da aynı amino aside bağlar.",
            "Dur kodonu veya silinme verilmemiştir.",
          ],
          commonError:
            "Kodon harfi değiştiğinde verilen eşlemeye bakmadan amino asidin de mutlaka değiştiğini veya glisin oluştuğunu sanmak.",
          check: "AAA veAAG’nin bu kartta verilen çevirisi aynıdır.",
        },
      },
      {
        id: "f026bc-proteinler-18",
        prompt: {
          tr: "Toplam 36 amino asit yalnız ayrı açık, halkasız polipeptitler hâlindedir. Yan grup bağlantıları sayılmıyor ve toplam 31 peptit bağı ölçülüyor. Kaç ayrı zincir vardır?",
        },
        options: [
          {
            tr: "6",
          },
          {
            tr: "31",
          },
          {
            tr: "5",
          },
          {
            tr: "4",
          },
          {
            tr: "35",
          },
        ],
        answer: 2,
        hint: {
          tr: "Açık zincirlerde toplamB=N−c bağıntısını kur.",
        },
        explanation: {
          tr: "Açık zincirlerde toplamB=N−c bağıntısını kur. 31=36−c olduğundan c=36−31. Ayrı zincir sayısı 5’tir; uzunluklarının eşit olması gerekmez.",
        },
        skill: "f026bc-proteinler",
        guidance: {
          knowledge: [
            "Toplam birim ve peptit bağı biliniyorsa açık zincir sayısı N−B’dir.",
          ],
          strategy:
            "Toplam birim sayısını, ayrı açık zincirlerin her birindeki bir eksik bağla ilişkilendiren denklemi kur; bilinmeyen zincir sayısını bu denklemden çöz.",
          steps: [
            "Açık zincirlerde toplamB=N−c bağıntısını kur.",
            "31=36−c olduğundan c=36−31.",
            "Ayrı zincir sayısı 5’tir; uzunluklarının eşit olması gerekmez.",
          ],
          optionReasons: [
            "Bir zinciri fazla sayar; 36−6=30 bağ olurdu.",
            "Bağ adedini zincir adedi sanır; 31 zincirde yalnız 5 bağ kalırdı.",
            "Doğru. c=N−B=36−31=5.",
            "Bir zinciri eksiltir; 36−4=32 bağ olurdu.",
            "Tek zincirin 35 bağı ile ayrı zincir sayısını karıştırır.",
          ],
          commonError: "Bir zinciri eksiltir; 36−4=32 bağ olurdu.",
          check: "36−5=31 bağı geri verir.",
        },
      },
      {
        id: "f026bc-proteinler-19",
        prompt: {
          tr: "Bir alanin, bir glisin ve bir serin tek açık üçlü peptitte kullanılacak. N→C yönü ayrıdır; her tür bir kez kullanılacak ve yalnız sıra sayılacaktır. Kaç farklı dizi yazılabilir?",
        },
        options: [
          {
            tr: "3",
          },
          {
            tr: "1",
          },
          {
            tr: "6",
          },
          {
            tr: "2",
          },
          {
            tr: "9",
          },
        ],
        answer: 2,
        hint: {
          tr: "İlk konum için 3, ikinci için kalan 2, son için 1 seçim vardır.",
        },
        explanation: {
          tr: "İlk konum için 3, ikinci için kalan 2, son için 1 seçim vardır. Sıra yönü verilmiş olduğundan ters sıraları otomatik aynı sayma. 3×2×1=6 farklı N→C dizisi vardır; bu sayı işlevin aynı olduğunu söylemez.",
        },
        skill: "f026bc-proteinler",
        guidance: {
          knowledge: [
            "Bileşim sabit olsa da yönlü açık amino asit dizileri farklı sıralarda kurulabilir.",
          ],
          strategy:
            "Her konuma bir tür yerleşince kalan seçim sayısını azalt; N→C yönü nedeniyle ters diziyi aynı saymadan bütün sıraları say.",
          steps: [
            "İlk konum için 3, ikinci için kalan 2, son için 1 seçim vardır.",
            "Sıra yönü verilmiş olduğundan ters sıraları otomatik aynı sayma.",
            "3×2×1=6 farklı N→C dizisi vardır; bu sayı işlevin aynı olduğunu söylemez.",
          ],
          optionReasons: [
            "İlk konum seçeneklerini sayıp sonraki sırayı atlar.",
            "Aynı bileşimin tek sırayı zorunlu kıldığını sanır.",
            "Doğru. Üç farklı birimin yönlü açık diziliş sayısı 3!=6.",
            "Yalnız bir diziyi ve tersini sayar; diğer dört sıralamayı eksiltir.",
            "İlk iki konumda türlerin yeniden kullanılmasına izin verip 3×3 sayar.",
          ],
          commonError: "İlk konum seçeneklerini sayıp sonraki sırayı atlar.",
          check: "AGS, ASG, GAS, GSA, SAG, SGA altı dizidir.",
        },
      },
      {
        id: "f026bc-proteinler-20",
        prompt: {
          tr: "İnsan, besin proteininin sindirimiyle amino asit elde ediyor; hücresindeki ribozomlar kendi genetik bilgisine göre bir insan proteini sentezliyor. Hangi ayrım doğrudur?",
        },
        options: [
          {
            tr: "Bütün bitkisel besinlerde amino asit bulunamaz.",
          },
          {
            tr: "Besin proteini değişmeden her insan proteinine dönüşür.",
          },
          {
            tr: "Ribozom amino asitleri peptit yerine ester bağlarıyla bağlar.",
          },
          {
            tr: "Besindeki protein ile sentezlenen proteinin dizisinin aynı olması zorunlu değildir.",
          },
          {
            tr: "Sindirimle oluşan amino asitler protein sentezinde hiç kullanılamaz.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Sindirimdeki hidrolizle hücredeki sentez aşamalarını ayır.",
        },
        explanation: {
          tr: "Sindirimdeki hidrolizle hücredeki sentez aşamalarını ayır. Elde edilen amino asitler hücrenin havuzuna katılabilir; yeni sırayı genetik bilgi yönlendirir. Ortak yapı taşları, besin proteininin sırasını yeni proteine zorunlu olarak taşımaz.",
        },
        skill: "f026bc-proteinler",
        guidance: {
          knowledge: [
            "Amino asidin besinsel kaynağı ile ribozomda kurulan protein dizisi ayrı bilgilerdir.",
          ],
          strategy:
            "Besindeki yapının sindirimini ve ribozomdaki yeni dizinin kurulmasını iki aşamalı şema yap; monomer kaynağıyla diziyi belirleyen bilgiyi ayır.",
          steps: [
            "Sindirimdeki hidrolizle hücredeki sentez aşamalarını ayır.",
            "Elde edilen amino asitler hücrenin havuzuna katılabilir; yeni sırayı genetik bilgi yönlendirir.",
            "Ortak yapı taşları, besin proteininin sırasını yeni proteine zorunlu olarak taşımaz.",
          ],
          optionReasons: [
            "Bitkiler de amino asit ve protein taşır; bitkisel kaynak bütünüyle dışlanamaz.",
            "Hidroliz ve yeni diziliş bilgisi verisini yok sayar.",
            "Protein omurgasında peptit bağlantısı kurulur; ester değildir.",
            "Doğru. Kaynak amino asitlerle yeni dizinin belirlenmesi farklı süreçlerdir.",
            "Amino asitlerin yeni sentezlerde kullanılabilmesi bu süreçle uyumludur.",
          ],
          commonError: "Hidroliz ve yeni diziliş bilgisi verisini yok sayar.",
          check:
            "Yeni protein dizisi verilen insan hücresinin bilgi ve sentez düzeniyle kurulur.",
        },
      },
    ],
  },
  {
    id: "enzimler-ileri",
    subjectId: "tyt-biyoloji",
    title: {
      tr: "Enzimler: enerji yolu, başlangıç hızı ve koşul — ileri uygulama",
    },
    minutes: 45,
    objectives: [
      {
        tr: "Dizi,tepkime ve ölçüm koşullarını bağımsız kartlarda gerekçeyle uygulamak.",
      },
    ],
    body: [],
    source: {
      tr: "Kaynaklarla karşılaştırılmış özgün ileri alıştırmalar;resmî sınav sorusu değildir.",
    },
    tags: ["özgün-sorular", "ileri-uygulama", "forge026"],
    questions: [
      {
        id: "f026bc-enzimler-1",
        prompt: {
          tr: "Aynı tepkimenin başlangıcı 25, ürünü 5, enzimsiz tepe 95 ve enzimli tepe 55 kJ/mol’dür. Enzimli ileri aktivasyon enerjisi ve net enerji değişimi sırasıyla kaç kJ/mol’dür?",
        },
        options: [
          {
            tr: "30; 20",
          },
          {
            tr: "30; −20",
          },
          {
            tr: "55; −20",
          },
          {
            tr: "50; 0",
          },
          {
            tr: "70; −20",
          },
        ],
        answer: 1,
        hint: {
          tr: "İleri aktivasyon için enzimli tepeden başlangıcı çıkar.",
        },
        explanation: {
          tr: "İleri aktivasyon için enzimli tepeden başlangıcı çıkar. 55−25=30 kJ/mol; net değişim ürün−başlangıç=5−25. Net değişim−20 kJ/mol’dür; aynı uçlar iki yolda da korunur.",
        },
        skill: "f026bc-enzimler",
        guidance: {
          knowledge: [
            "İleri engel=tepe−başlangıç; net değişim=ürün−başlangıç.",
          ],
          strategy:
            "Başlangıçtan enzimli tepeye ve başlangıçtan ürüne iki ayrı yönlü fark çiz; aktivasyon engeliyle net enerji farkını birbirine karıştırmadan hesapla.",
          steps: [
            "İleri aktivasyon için enzimli tepeden başlangıcı çıkar.",
            "55−25=30 kJ/mol; net değişim ürün−başlangıç=5−25.",
            "Net değişim−20 kJ/mol’dür; aynı uçlar iki yolda da korunur.",
          ],
          optionReasons: [
            "Net farkın yönünü ters çevirir; ürün 5 başlangıç 25’ten düşüktür.",
            "Doğru. Enzimli engel 30, net değişim−20’dir.",
            "Tepe 55’i başlangıçtan ölçülen engel sanır; 25 çıkarılmalıdır.",
            "55−5=50 geri engelini ileri sanır ve net farkı sıfırlar.",
            "Enzimsiz 95−25=70 engelini enzimli diye verir.",
          ],
          commonError:
            "Tepe 55’i başlangıçtan ölçülen engel sanır; 25 çıkarılmalıdır.",
          check: "30+25=55; −20+25=5.",
        },
      },
      {
        id: "f026bc-enzimler-2",
        prompt: {
          tr: "Bir enerji profilinde girenler 15, ürünler 45, enzimli tepe 65 kJ/mol’dür. Enzimli ileri ve geri aktivasyon enerjileri nedir?",
        },
        options: [
          {
            tr: "50; 20",
          },
          {
            tr: "20; 50",
          },
          {
            tr: "65; 65",
          },
          {
            tr: "30; 20",
          },
          {
            tr: "50; 30",
          },
        ],
        answer: 0,
        hint: {
          tr: "İleri yönde başlangıç 15, geri yönde başlangıç 45’tir.",
        },
        explanation: {
          tr: "İleri yönde başlangıç 15, geri yönde başlangıç 45’tir. İleri 65−15=50; geri 65−45=20 hesaplanır. İki engelin farkı 50−20=30, net ileri enerji farkıyla aynıdır.",
        },
        skill: "f026bc-enzimler",
        guidance: {
          knowledge: [
            "Aynı tepeye iki yönden çıkarken başlangıç düzeyleri farklı olabilir.",
          ],
          strategy:
            "İleri ve geri yön için başlangıç düzeyini yeniden seç; aynı enzimli tepenin her yönün başlangıcına uzaklığını ayrı bul.",
          steps: [
            "İleri yönde başlangıç 15, geri yönde başlangıç 45’tir.",
            "İleri 65−15=50; geri 65−45=20 hesaplanır.",
            "İki engelin farkı 50−20=30, net ileri enerji farkıyla aynıdır.",
          ],
          optionReasons: [
            "Doğru. İleri 50, geri 20 kJ/mol; yönün başlangıcı ayrı çıkarılır.",
            "İleri ve geri yönleri ters eşler.",
            "Her iki yönde mutlak tepeyi engel alır; başlangıç düzeylerini atlar.",
            "45−15=30 net farkını ileri engel sanır.",
            "Net fark 30’u geri engel yerine kullanır; geri engel 20’dir.",
          ],
          commonError:
            "Her iki yönde mutlak tepeyi engel alır; başlangıç düzeylerini atlar.",
          check: "50−20=45−15=30 kJ/mol.",
        },
      },
      {
        id: "f026bc-enzimler-3",
        prompt: {
          tr: "Sabit koşullarda örnek bir enzimin başlangıç hızı v=4S/(2+S) ile veriliyor; S model derişimidir. S=2’den S=6’ya çıkarılınca hızın son/ilk oranı kaç olur?",
        },
        options: [
          {
            tr: "1,5",
          },
          {
            tr: "2",
          },
          {
            tr: "3",
          },
          {
            tr: "4",
          },
          {
            tr: "0,5",
          },
        ],
        answer: 0,
        hint: {
          tr: "S=2 için v=8/4=2 hız birimi.",
        },
        explanation: {
          tr: "S=2 için v=8/4=2 hız birimi. S=6 için v=24/8=3 hız birimi. Son/ilk=3/2=1,5; substrat üç kat olsa da hız üç kat değildir.",
        },
        skill: "f026bc-enzimler",
        guidance: {
          knowledge: [
            "Doygunluk bağıntısında substrat hem payı hem paydayı etkiler.",
          ],
          strategy:
            "Bağıntıya iki substrat değerini ayrı yerleştir; son hızı ilk hıza oranlarken değişen paydanın etkisini de koru.",
          steps: [
            "S=2 için v=8/4=2 hız birimi.",
            "S=6 için v=24/8=3 hız birimi.",
            "Son/ilk=3/2=1,5; substrat üç kat olsa da hız üç kat değildir.",
          ],
          optionReasons: [
            "Doğru. Hız 2’den 3’e çıkar; oran 1,5.",
            "Başlangıç hız 2’yi boyutsuz oran yerine cevaplar.",
            "Yalnız substrat 6/2=3 oranını hıza taşır; payda da değişir.",
            "Paydaki 4 katsayısını oran sanır; iki koşulda da aynı katsayıdır.",
            "Artışın ilk hıza oranı(3−2)/2=0,5’i son/ilk sanır.",
          ],
          commonError:
            "Yalnız substrat 6/2=3 oranını hıza taşır; payda da değişir.",
          check: "İki hız da üst sınır 4’ün altındadır.",
        },
      },
      {
        id: "f026bc-enzimler-4",
        prompt: {
          tr: "Özgün rekabetçi model v=2ES/[2(1+I)+S]. E=3, S=4 sabit. I,0’dan 2’ye çıkıyor. Son başlangıç hızı ve çok yüksek S’de yaklaşılan üst sınır nedir?",
        },
        options: [
          {
            tr: "6; 6",
          },
          {
            tr: "2,4; 2,4",
          },
          {
            tr: "4; 6",
          },
          {
            tr: "1,2; 3",
          },
          {
            tr: "2,4; 6",
          },
        ],
        answer: 4,
        hint: {
          tr: "Pay 2×3×4=24’tür. I=2 için payda 2×3+4=10.",
        },
        explanation: {
          tr: "Pay 2×3×4=24’tür. I=2 için payda 2×3+4=10. Son hız 24/10=2,4; E=3 için üst sınır 2E=6. Bu belirtilen rekabetçi modelde I üst sınırı değil sonlu S’deki hızı değiştirir.",
        },
        skill: "f026bc-enzimler",
        guidance: {
          knowledge: [
            "Basit tersinir rekabetçi modelde artan inhibitör görünür sabiti artırır; aynı etkin enzimde üst hız sabit kalır.",
          ],
          strategy:
            "Son inhibitör değerini bağıntıya yerleştirerek hızı bul; üst sınır için pay ve paydayı S’ye bölüp çok büyük S davranışını ayrıca incele.",
          steps: [
            "Pay 2×3×4=24’tür. I=2 için payda 2×3+4=10.",
            "Son hız 24/10=2,4; E=3 için üst sınır 2E=6.",
            "Bu belirtilen rekabetçi modelde I üst sınırı değil sonlu S’deki hızı değiştirir.",
          ],
          optionReasons: [
            "S=4’te doygunluk tam olmuş sanıp hızı 6 verir; payda 10’dur.",
            "SeçiliS’deki 2,4 hızını kuramsal üst sınırla eşitler.",
            "I=0’daki 24/6=4 hızını I=2 sonrası da kullanır.",
            "Paydaki 2 katsayısını iki sonuçtan da atar; hız ve üst sınır yarıya iner.",
            "Doğru. SonluS’de 2,4; S çok artınca üst sınır 6.",
          ],
          commonError: "I=0’daki 24/6=4 hızını I=2 sonrası da kullanır.",
          check: "I=0 hız 4, I=2 hız 2,4; her ikisi 6’nın altındadır.",
        },
      },
      {
        id: "f026bc-enzimler-5",
        prompt: {
          tr: "Bir öğretim modelinde v=2ES/(2+S); enzimsiz arka plan hızı ihmal ediliyor. E=0 ve S=20 iken model hızı nedir; bu sonuç hangi kapsamda geçerlidir?",
        },
        options: [
          {
            tr: "2; denklemdeki 2 sabit hızdır",
          },
          {
            tr: "0; yalnız bu modelde enzim katkısı ve ihmal edilen arka plan koşulunda",
          },
          {
            tr: "20; substratın her birimi bir hızdır",
          },
          {
            tr: "40; paydadan bağımsız 2S alınır",
          },
          {
            tr: "0; evrende enzimsiz hiçbir tepkime gerçekleşmez",
          },
        ],
        answer: 1,
        hint: {
          tr: "E=0 olduğundan pay 2×0×20=0’dır.",
        },
        explanation: {
          tr: "E=0 olduğundan pay 2×0×20=0’dır. Payda 22 pozitif; model hızı 0 olur. Sıfır, en fazla belirtilen enzim katkısı modelini anlatır; bütün kimyaya evrensel yasak değildir.",
        },
        skill: "f026bc-enzimler",
        guidance: {
          knowledge: [
            "Bir modelde bir katkının 0 alınması, gerçek dünyadaki bütün süreçlerin yokluğunu kanıtlamaz.",
          ],
          strategy:
            "Verilen enzim miktarını modelin payında uygula; çıkan hesabı, ihmal edildiği açıkça söylenen enzimsiz arka planla aynı evrensel iddia sayma.",
          steps: [
            "E=0 olduğundan pay 2×0×20=0’dır.",
            "Payda 22 pozitif; model hızı 0 olur.",
            "Sıfır, en fazla belirtilen enzim katkısı modelini anlatır; bütün kimyaya evrensel yasak değildir.",
          ],
          optionReasons: [
            "Pay katsayısı 2, E veS ile birlikte kullanılır; sabit hız değildir.",
            "Doğru. Model hızı 0; arka planın ihmal edildiği açık koşul korunur.",
            "Substrat derişimini birim zamanda ürün hızına eşitler.",
            "E=0 ve payda 22’yi yok sayar.",
            "Sayısal 0 doğru olsa da bütün enzimsiz kimyayı reddeden kapsam aşımı vardır.",
          ],
          commonError: "Substrat derişimini birim zamanda ürün hızına eşitler.",
          check: "0/22=0; koşul arka plan hızının ihmal edilmesidir.",
        },
      },
      {
        id: "f026bc-enzimler-6",
        prompt: {
          tr: "Aynı S, pH ve sıcaklıkta örnek v=2ES/(2+S) modeli kullanılıyor. S=6, E=1 iken E=2 yapılıyor. Başlangıç hızları sırasıyla nedir?",
        },
        options: [
          {
            tr: "1,5; 3",
          },
          {
            tr: "1,5; 1,5",
          },
          {
            tr: "2; 4",
          },
          {
            tr: "6; 12",
          },
          {
            tr: "3; 6",
          },
        ],
        answer: 0,
        hint: {
          tr: "S=6 için ortak çarpan 2×6/(2+6)=12/8=1,5.",
        },
        explanation: {
          tr: "S=6 için ortak çarpan 2×6/(2+6)=12/8=1,5. E=1 hızı 1,5; E=2 hızı 3 verir. Bu koşullarda etkin enzim iki kat olunca hız iki kat olur; son ürün kapasitesi hakkında tek başına bilgi vermez.",
        },
        skill: "f026bc-enzimler",
        guidance: {
          knowledge: [
            "Belirtilen başlangıç hızı yasasında S ve diğer koşullar sabitse hız etkin enzim miktarıyla orantılıdır.",
          ],
          strategy:
            "Aynı substrat için ortak derişim çarpanını ayır; yalnız enzim miktarı değiştiğinde bu çarpanın iki başlangıç hızına etkisini karşılaştır.",
          steps: [
            "S=6 için ortak çarpan 2×6/(2+6)=12/8=1,5.",
            "E=1 hızı 1,5; E=2 hızı 3 verir.",
            "Bu koşullarda etkin enzim iki kat olunca hız iki kat olur; son ürün kapasitesi hakkında tek başına bilgi vermez.",
          ],
          optionReasons: [
            "Doğru. 1,5E ile iki hız 1,5 ve 3 bulunur.",
            "Enzim miktarı etkisini tamamen atlar.",
            "Yalnız 2E üst sınırlarını cevaplar; seçiliS’de hız üst sınıra eşit değildir.",
            "S’yi doğrudan hız kabul edip E ile çarpar; doygunluk paydasını atlar.",
            "İlk koşulda daE=2 kullanır; iki hızı iki kat yüksek verir.",
          ],
          commonError:
            "İlk koşulda daE=2 kullanır; iki hızı iki kat yüksek verir.",
          check:
            "3/1,5=2; başlangıç hızları kendi 2E üst sınırlarından küçüktür.",
        },
      },
      {
        id: "f026bc-enzimler-7",
        prompt: {
          tr: "İki kapta başlangıçta 80’er substrat birimi var; her birim tek ürüne dönüşüyor. Yan tepkime ve denge sınırlaması yok, tam dönüşüm için yeterli süre veriliyor. X’te 2, Y’de 4 birim etkin enzim var. Son ürün miktarları nedir?",
        },
        options: [
          {
            tr: "80; 160",
          },
          {
            tr: "40; 80",
          },
          {
            tr: "2; 4",
          },
          {
            tr: "80; 80",
          },
          {
            tr: "160; 320",
          },
        ],
        answer: 3,
        hint: {
          tr: "Son ürünün kaynağı başlangıçtaki 80 substrat birimidir.",
        },
        explanation: {
          tr: "Son ürünün kaynağı başlangıçtaki 80 substrat birimidir. Enzim erken hızı değiştirebilir; başlangıç substratını çoğaltmaz. Tam dönüşümde iki kapta da 80 ürün oluşur; aynı kısa süre verilse ayrı veri gerekirdi.",
        },
        skill: "f026bc-enzimler",
        guidance: {
          knowledge: [
            "Başlangıç hızı ile sonlu substratın tam dönüşüm kapasitesi farklı niceliklerdir.",
          ],
          strategy:
            "Son ürün için başlangıç substrat bütçesini ve 1:1 dönüşümü kullan; tam dönüşüme ayrılan süreyle enzim miktarının hız etkisini ayrı değerlendir.",
          steps: [
            "Son ürünün kaynağı başlangıçtaki 80 substrat birimidir.",
            "Enzim erken hızı değiştirebilir; başlangıç substratını çoğaltmaz.",
            "Tam dönüşümde iki kapta da 80 ürün oluşur; aynı kısa süre verilse ayrı veri gerekirdi.",
          ],
          optionReasons: [
            "Y’nin enzimini iki kat görüp mevcut 80 substrattan 160 ürün üretir.",
            "X’in enzim miktarı yarı diye tamamlanmış ürününü de yarıya indirir.",
            "Enzim miktarlarını ürün miktarı sanır; enzim katalizörde yeniden kullanılabilir.",
            "Doğru. İki kapta 80’er substratın tamamı 1:1 dönüşür.",
            "Enzim miktarını substratla çarpıp madde miktarını yapay artırır.",
          ],
          commonError:
            "X’in enzim miktarı yarı diye tamamlanmış ürününü de yarıya indirir.",
          check: "Her kapta 80 substrat birimi→80 ürün birimi.",
        },
      },
      {
        id: "f026bc-enzimler-8",
        prompt: {
          tr: "Bir tüpte ürün miktarı 0. dakikada 3,2. dakikada 15 ve 5. dakikada 24 µmol olarak ölçülüyor. 2–5. dakika aralığındaki ortalama net ürün oluşum hızı kaç µmol/dakikadır?",
        },
        options: [
          {
            tr: "3",
          },
          {
            tr: "9",
          },
          {
            tr: "6",
          },
          {
            tr: "4,2",
          },
          {
            tr: "4,8",
          },
        ],
        answer: 0,
        hint: {
          tr: "İstenen aralıkta ürün artışı 24−15=9 µmol.",
        },
        explanation: {
          tr: "İstenen aralıkta ürün artışı 24−15=9 µmol. Geçen süre 5−2=3 dakika. Ortalama hız 9/3=3 µmol/dakika; başlangıç 3 µmol bu aralığın ilk miktarı değildir.",
        },
        skill: "f026bc-enzimler",
        guidance: {
          knowledge: [
            "Ortalama hız, seçili aralıkta miktar değişimi/süre değişimidir.",
          ],
          strategy:
            "Yalnız istenen zaman penceresinin iki uç ürün değerini seç; bu aralıktaki miktar farkını aynı pencerenin süre farkına böl.",
          steps: [
            "İstenen aralıkta ürün artışı 24−15=9 µmol.",
            "Geçen süre 5−2=3 dakika.",
            "Ortalama hız 9/3=3 µmol/dakika; başlangıç 3 µmol bu aralığın ilk miktarı değildir.",
          ],
          optionReasons: [
            "Doğru. (24−15)/(5−2)=3.",
            "9 µmol artışı süreye bölmeden hız sayar.",
            "0–2 aralığının(15−3)/2=6 hızını cevaplar.",
            "Bütün 0–5 aralığının(24−3)/5=4,2 hızını istenen aralığa verir.",
            "Son 24 miktarını 0–5 süresine böler:24/5=4,8; ilk miktarı da çıkarmaz.",
          ],
          commonError:
            "Bütün 0–5 aralığının(24−3)/5=4,2 hızını istenen aralığa verir.",
          check: "3×3=9 µmol artış; 15+9=24.",
        },
      },
      {
        id: "f026bc-enzimler-9",
        prompt: {
          tr: "Bir ürün–zaman grafiğinde miktar 10. dakikadan sonra 100 µmol’de yatay kalıyor. Bu aralıkta ölçülen net ürün değişimi için ne söylenir?",
        },
        options: [
          {
            tr: "Yatay çizgi bütün enzimlerin yok olduğunu kesin kanıtlar.",
          },
          {
            tr: "Miktar 0 µmol, hız 100 µmol/dakikadır.",
          },
          {
            tr: "Her dakikada 100 µmol yeni ürün zorunlu eklenir.",
          },
          {
            tr: "Miktar 100 olduğu için hız da 100’dür.",
          },
          {
            tr: "Miktar 100 µmol, net artış hızı 0’dır.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Yükseklik mevcut miktarı, eğim miktarın zamana göre değişimini gösterir.",
        },
        explanation: {
          tr: "Yükseklik mevcut miktarı, eğim miktarın zamana göre değişimini gösterir. İki sonraki anda da 100 ölçüldüğünden fark 0’dır. Net hız 0 olabilirken ürün miktarı 100 kalır; bunun tek nedeni enzim yokluğu değildir.",
        },
        skill: "f026bc-enzimler",
        guidance: {
          knowledge: [
            "Ürün miktarıyla net ürün oluşum hızı aynı büyüklük değildir.",
          ],
          strategy:
            "Yatay parçanın miktar yüksekliğini ve bu parçadaki değişim eğimini ayrı oku; net değişim bilgisinden verilmeyen moleküler nedeni çıkarmaya çalışma.",
          steps: [
            "Yükseklik mevcut miktarı, eğim miktarın zamana göre değişimini gösterir.",
            "İki sonraki anda da 100 ölçüldüğünden fark 0’dır.",
            "Net hız 0 olabilirken ürün miktarı 100 kalır; bunun tek nedeni enzim yokluğu değildir.",
          ],
          optionReasons: [
            "Substrat tükenmesi veya denge gibi alternatifleri verisiz eler.",
            "Miktar ve hız eksenlerini değiştirip sayıları ters rollere atar.",
            "Yatay çizgi artış değil sabit miktar bildirir.",
            "Miktarın yüksekliğini zaman türeviyle eşitler.",
            "Doğru. Yatay ürün eğrisinin eğimi 0; yüksekliği 100’dür.",
          ],
          commonError:
            "Miktar ve hız eksenlerini değiştirip sayıları ters rollere atar.",
          check: "İki anda 100−100=0 net ürün farkı.",
        },
      },
      {
        id: "f026bc-enzimler-10",
        prompt: {
          tr: "Eşit başlangıç koşullarında varsayımsal X enziminin 20,40,60°C hızları 3,9,2; Y’nin 1,4,10 birimdir. Ölçülen sıcaklıklar içinde en yüksek hızlar hangi sıcaklıklardadır?",
        },
        options: [
          {
            tr: "X20°C; Y20°C",
          },
          {
            tr: "X60°C; Y40°C",
          },
          {
            tr: "X40°C; Y60°C",
          },
          {
            tr: "X37°C; Y37°C",
          },
          {
            tr: "X40°C; Y40°C",
          },
        ],
        answer: 2,
        hint: {
          tr: "X için 3,9,2 değerlerinden en büyüğünü seç:9.",
        },
        explanation: {
          tr: "X için 3,9,2 değerlerinden en büyüğünü seç:9. Y için 1,4,10 değerlerinden en büyüğünü seç:10. Ölçülenler içinde X40, Y60°C; denenmeyen ara sıcaklıklar için kesin optimum uydurma.",
        },
        skill: "f026bc-enzimler",
        guidance: {
          knowledge: [
            "Optimum yorumunda enzim türü ve denenen sıcaklık aralığı korunur.",
          ],
          strategy:
            "X ve Y satırlarını ayrı tarayıp yalnız ölçülmüş sıcaklıklardaki hızları karşılaştır; verilmeyen ortak bir optimum ekleme.",
          steps: [
            "X için 3,9,2 değerlerinden en büyüğünü seç:9.",
            "Y için 1,4,10 değerlerinden en büyüğünü seç:10.",
            "Ölçülenler içinde X40, Y60°C; denenmeyen ara sıcaklıklar için kesin optimum uydurma.",
          ],
          optionReasons: [
            "Her iki enzimin en düşük sıcaklığını maksimum sanır; hızlar 3 ve 1’dir.",
            "İki enzimin en yüksek ölçüm sıcaklıklarını ters verir.",
            "Doğru. Verilen iki tablonun en yüksek değerlerini ayrı eşler.",
            "37°C ölçülmemiştir ve bütün enzimlere ortak optimum verilemez.",
            "X’in maksimumunu Y’ye kopyalar; Y’de 60°C hızı 10,40°C hızı 4’tür.",
          ],
          commonError:
            "Ölçülmeyen 37°C’yi bütün enzimlerin ortak optimumu diye seçmek veya X ile Y’nin en yüksek hızlarını aynı sıcaklığa zorlamak.",
          check: "9>3,2 ve 10>1,4.",
        },
      },
      {
        id: "f026bc-enzimler-11",
        prompt: {
          tr: "Bir enzimin pH2,4,6,8’de ölçülen hızları sırasıyla 5,9,4,0 birimdir. pH3,5 veya 4,5 ölçülmemiştir. Hangi ifade kesin olarak desteklenir?",
        },
        options: [
          {
            tr: "Hızın pH2’den 8’e her adımda arttığı kanıtlanmıştır.",
          },
          {
            tr: "pH8’de bütün peptit bağları kesin kopmuştur.",
          },
          {
            tr: "Gerçek optimum kesin pH4,000’dür.",
          },
          {
            tr: "Denenen pH değerleri içinde en yüksek hız pH4’tedir.",
          },
          {
            tr: "Bütün enzimlerin optimumu pH4’tür.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Ölçülen dört hız arasında en büyük değer 9’dur.",
        },
        explanation: {
          tr: "Ölçülen dört hız arasında en büyük değer 9’dur. 9 değeri pH4’e aittir; ara ölçümler yoktur. Ölçülen maksimumu söyle; gerçek tepenin kesin ondalık yerini veya molekülün bağ hasarını çıkarma.",
        },
        skill: "f026bc-enzimler",
        guidance: {
          knowledge: [
            "Örneklenen noktaların maksimumu ile sürekli eğrinin kesin optimumu ayrılır.",
          ],
          strategy:
            "Gözlenen en büyük değerle ölçülmeyen ara pH değerlerini ayrı tut; kesin gözlem sıralamasını bütün pH ekseninde optimum iddiasına dönüştürme.",
          steps: [
            "Ölçülen dört hız arasında en büyük değer 9’dur.",
            "9 değeri pH4’e aittir; ara ölçümler yoktur.",
            "Ölçülen maksimumu söyle; gerçek tepenin kesin ondalık yerini veya molekülün bağ hasarını çıkarma.",
          ],
          optionReasons: [
            "5→9 artarken 9→4→0 azalır; her adımda artış yoktur.",
            "Sıfır hız, omurgadaki bütün bağların hidrolizini tek başına ölçmez.",
            "Denenmeyen yakın pH noktalarını dışlayacak veri yoktur.",
            "Doğru. Dört ölçüm arasındaki maksimum 9, pH4’tedir.",
            "Bir enzimin verisi bütün enzimler için yasa değildir.",
          ],
          commonError:
            "Ölçülen pH noktalarından birindeki en yüksek değeri, ölçülmeyen bütün ara değerleri de dışlayan kesin optimum sanmak.",
          check: "pH4 hızı 9; diğer ölçümler 5,4,0.",
        },
      },
      {
        id: "f026bc-enzimler-12",
        prompt: {
          tr: "X tüpünde etkin enzim 30°C’de, Y’de enzimsiz karışım 10°C’de daha az ürün veriyor. Enzimin etkisini tek başına ayırmak için en uygun yeni karşılaştırma hangisidir?",
        },
        options: [
          {
            tr: "Yalnız tüplerin rengini aynı yapmak",
          },
          {
            tr: "İki tüpte hem sıcaklığı hem pH’ı farklı tutmak",
          },
          {
            tr: "Y’nin sıcaklığıyla birlikte substratını da artırmak",
          },
          {
            tr: "Aynı sıcaklık, pH, substrat ve hacimde yalnız etkin enzim varlığını değiştirmek",
          },
          {
            tr: "Kontrol tüpünden substrat dahil her şeyi çıkarmak",
          },
        ],
        answer: 3,
        hint: {
          tr: "İlk düzende enzim varlığı ve sıcaklık birlikte değişmiştir.",
        },
        explanation: {
          tr: "İlk düzende enzim varlığı ve sıcaklık birlikte değişmiştir. İstenen etki enzime ait olduğundan diğer koşulları eşitle. Tek değişken etkin enzim varlığı olduğunda karşılaştırma bu etkiyi ayırmaya uygundur.",
        },
        skill: "f026bc-enzimler",
        guidance: {
          knowledge: [
            "Uygun kontrol, bütün bileşenlerin yokluğu değil hedef değişken dışındaki koşulların eşliğidir.",
          ],
          strategy:
            "İlk iki tüpte birlikte değişen etkenleri belirle; enzim varlığını sınamak için sıcaklığı ve diğer başlangıç koşullarını eşleyen çifti seç.",
          steps: [
            "İlk düzende enzim varlığı ve sıcaklık birlikte değişmiştir.",
            "İstenen etki enzime ait olduğundan diğer koşulları eşitle.",
            "Tek değişken etkin enzim varlığı olduğunda karşılaştırma bu etkiyi ayırmaya uygundur.",
          ],
          optionReasons: [
            "Renk eşliği sıcaklık ve kimyasal koşulları eşitlemez.",
            "İki yeni karıştırıcı değişkeni korur; enzim etkisini ayırmaz.",
            "Substrat ve sıcaklığı birlikte değiştirerek nedenleri daha çok karıştırır.",
            "Doğru. Diğer ölçümü etkileyen koşulları sabit tutup istenen değişkeni ayırır.",
            "Substratı kaldırmak ürün oluşumu karşılaştırmasını eş başlangıçtan çıkarır.",
          ],
          commonError:
            "Substrat ve sıcaklığı birlikte değiştirerek nedenleri daha çok karıştırır.",
          check: "Karşılaştırmada yalnız enzim varlığı farklı kalmalıdır.",
        },
      },
      {
        id: "f026bc-enzimler-13",
        prompt: {
          tr: "Aynı protein enzimin çözeltisinden Mn²⁺ uzaklaştırılınca hız 10’dan 1’e düşüyor. Mn²⁺ geri eklenince 10’a, Mg²⁺ eklenince 1’de kalıyor; diğer koşullar aynı. Hangi sonuç desteklenir?",
        },
        options: [
          {
            tr: "Mn²⁺ proteinin tüm amino asitlerinin kendisidir.",
          },
          {
            tr: "Mg²⁺ her enzimi kesin zehirler.",
          },
          {
            tr: "Bütün enzimler Mn²⁺ kullanmak zorundadır.",
          },
          {
            tr: "Her metal iyonu aynı etkiyi göstermiştir.",
          },
          {
            tr: "Bu koşullarda Mn²⁺ gereksinimiyle uyumlu özgül kurtarma vardır.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Metalsiz hız 1’i kontrol 10 ile karşılaştır.",
        },
        explanation: {
          tr: "Metalsiz hız 1’i kontrol 10 ile karşılaştır. YalnızMn²⁺ eklenmesi kontrol hızını geri getirmiştir; Mg²⁺ getirmemiştir. Bu protein ve koşul için yardımcı gereksinimi desteklenir; bütün enzimlere taşınmaz.",
        },
        skill: "f026bc-enzimler",
        guidance: {
          knowledge: [
            "Bir metal iyonuyla kurtarma, uygun protein ve substrat koşullarında araştırılan özgül yardımcı rolüne destek olabilir.",
          ],
          strategy:
            "Uzaklaştırma, geri ekleme ve farklı iyon ekleme sonuçlarını aynı kontrolle karşılaştır; yalnız bu enzimin hangi yardımcıya yanıt verdiğini belirle.",
          steps: [
            "Metalsiz hız 1’i kontrol 10 ile karşılaştır.",
            "YalnızMn²⁺ eklenmesi kontrol hızını geri getirmiştir; Mg²⁺ getirmemiştir.",
            "Bu protein ve koşul için yardımcı gereksinimi desteklenir; bütün enzimlere taşınmaz.",
          ],
          optionReasons: [
            "Metal iyonu peptit zinciri veya amino asit dizisi değildir.",
            "Mg²⁺ burada kurtarmamıştır; bütün enzimlerde zehirlenme ölçülmemiştir.",
            "Tek enzimin bulgusunu bütün enzimlere genişletir.",
            "Mn²⁺ sonrası 10, Mg²⁺ sonrası 1; etkiler eşit değildir.",
            "Doğru. Aynı sistemde Mn²⁺ ile etkinlik geri gelir; bu özel gereksinime destek verir.",
          ],
          commonError: "Tek enzimin bulgusunu bütün enzimlere genişletir.",
          check:
            "Kontrol 10→uzaklaştırma 1→Mn10; Mg1 karşılaştırması belirleyicidir.",
        },
      },
      {
        id: "f026bc-enzimler-14",
        prompt: {
          tr: "Ürün deneyi aynı koşullarda: protein kısım+substrat 0; X+substrat 0; protein kısım+X+substrat 12 birim. X’in organik mi inorganik mi olduğu verilmemiş. Hangisi güvenlidir?",
        },
        options: [
          {
            tr: "X kesin inorganik metal iyonudur.",
          },
          {
            tr: "Protein kısım gereksizdir; X tek başına 12 üretmiştir.",
          },
          {
            tr: "X kesin organik koenzimdir.",
          },
          {
            tr: "Bu düzende iki bileşen birlikte gereklidir; X’e kesin koenzim adı verilemez.",
          },
          {
            tr: "Ürün 12 birim olduğundan X kesin 12 birim enerji vermiştir.",
          },
        ],
        answer: 3,
        hint: {
          tr: "İlk iki tek bileşenli durum ürün vermemiştir.",
        },
        explanation: {
          tr: "İlk iki tek bileşenli durum ürün vermemiştir. Birlikte ürün oluşması bu koşullarda iki bileşenin gerekliliğiyle uyumludur. X’in yapısı verilmediğinden organik koenzim veya metal ayrımı yapılamaz; ürün miktarı enerji değildir.",
        },
        skill: "f026bc-enzimler",
        guidance: {
          knowledge: [
            "Gerekli yardımcı varlığı ile yardımcının kimyasal sınıfı ayrı kanıt ister.",
          ],
          strategy:
            "Tek bileşen ve birlikte verilen bileşen deneylerini yan yana koy; çalışma için gereken birliktelik çıkarımını X’in bilinmeyen kimyasal sınıfından ayır.",
          steps: [
            "İlk iki tek bileşenli durum ürün vermemiştir.",
            "Birlikte ürün oluşması bu koşullarda iki bileşenin gerekliliğiyle uyumludur.",
            "X’in yapısı verilmediğinden organik koenzim veya metal ayrımı yapılamaz; ürün miktarı enerji değildir.",
          ],
          optionReasons: [
            "İnorganik yapı veya metal kimliği verisi yoktur.",
            "X+substrat satırı 0’dır; protein gereksiz sonucu bu satırla çelişir.",
            "Organik yapı verisi olmadan koenzim kesinleştirilemez.",
            "Doğru. Kurtarma birlikteliği gösterir; kimyasal tür bilgisi yoktur.",
            "Ürün birimi ile enerji birimini karıştırır; enerji ölçümü yoktur.",
          ],
          commonError:
            "X’in kimyasal yapısı verilmediği hâlde gerekli yardımcı olduğu için kesin organik koenzim olduğunu sanmak.",
          check:
            "0,0,12 örüntüsü birlikteliği destekler; X’in atom yapısını vermez.",
        },
      },
      {
        id: "f026bc-enzimler-15",
        prompt: {
          tr: "Protein içermeyen saf bir RNA örneğinin belirli bir tepkimeyi katalizlediği deneyle gösteriliyor. Bu örnek hangi iddiayı doğrudan çürütür?",
        },
        options: [
          {
            tr: "Bir protein enzimi uygun koşulda tekrar kullanılabilir.",
          },
          {
            tr: "Proteinler amino asitlerden oluşabilir.",
          },
          {
            tr: "Bütün biyolojik katalizörler istisnasız proteindir.",
          },
          {
            tr: "Bazı enzimler protein yapılıdır.",
          },
          {
            tr: "RNA nükleik asit sınıfındadır.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Katalitik örneğin RNA olduğu ve protein içermediği açıkça verilmiştir.",
        },
        explanation: {
          tr: "Katalitik örneğin RNA olduğu ve protein içermediği açıkça verilmiştir. Bu tek örnek bütün biyolojik katalizörleri protein sayan evrensel ifadeye karşı örnektir. Protein enzimlerin varlığını veya başka doğru sınıflamaları ortadan kaldırmaz.",
        },
        skill: "f026bc-enzimler",
        guidance: {
          knowledge: [
            "Katalitik RNA örneği biyolojik katalizörlerin tümünü protein saymayı sınırlar.",
          ],
          strategy:
            "Evrensel iddianın kapsadığı bütün katalizör grubuyla verilen protein içermeyen örneği karşılaştır; tek karşı örneğin hangi zorunluluk iddiasını bozduğunu seç.",
          steps: [
            "Katalitik örneğin RNA olduğu ve protein içermediği açıkça verilmiştir.",
            "Bu tek örnek bütün biyolojik katalizörleri protein sayan evrensel ifadeye karşı örnektir.",
            "Protein enzimlerin varlığını veya başka doğru sınıflamaları ortadan kaldırmaz.",
          ],
          optionReasons: [
            "Protein enzimin çevrimde yeniden kullanılabilmesi ayrı bir özelliktir.",
            "Proteinlerin yapı birimi bilgisi bu deneyden değişmez.",
            "Doğru. Katalitik RNA, istisnasızprotein iddiasıyla bağdaşmaz.",
            "RNA katalizi bazı protein enzimlerin varlığını reddetmez.",
            "RNA’nın kataliz yapması nükleik asit sınıfını ortadan kaldırmaz.",
          ],
          commonError:
            "Protein içermeyen bir RNA katalizörü gösterilince protein yapılı enzimlerin de var olmadığı sonucuna gitmek.",
          check: "Karşı örnek, her iddiasını bozar; bazı iddiasını bozmaz.",
        },
      },
      {
        id: "f026bc-enzimler-16",
        prompt: {
          tr: "Bir sindirim enziminin protein zinciri bir hücrenin ribozomlarında sentezleniyor, daha sonra bağırsak boşluğunda çalışıyor. Hangi yorum doğrudur?",
        },
        options: [
          {
            tr: "Enzim peptit içerdiği için bağırsakta kesin hiç değişemez.",
          },
          {
            tr: "Hücre dışındaki enzim katalizör olamaz.",
          },
          {
            tr: "Sentez yeriyle çalışma yeri farklı olabilir.",
          },
          {
            tr: "Enzim yalnız çalıştığı bağırsak boşluğunda ribozomsuz sentezlenmiştir.",
          },
          {
            tr: "Enzimin substratı enzimin üretildiği ribozomun tamamıdır.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Veride sentez ribozomda, çalışma bağırsak boşluğundadır.",
        },
        explanation: {
          tr: "Veride sentez ribozomda, çalışma bağırsak boşluğundadır. Bağırsak boşluğu bu hücrenin sitoplazması değildir. Protein enzim hücre içinde üretilip uygun hücre dışı ortamda görev yapabilir.",
        },
        skill: "f026bc-enzimler",
        guidance: {
          knowledge: [
            "Protein senteziyle enzimin çalışma bölmesi aynı olmak zorunda değildir.",
          ],
          strategy:
            "Üretim yerini ve görev yapılan ortamı iki ayrı sütuna yaz; hücresel sentez bilgisini etkinliğin mutlaka aynı yerde olması koşuluna dönüştürme.",
          steps: [
            "Veride sentez ribozomda, çalışma bağırsak boşluğundadır.",
            "Bağırsak boşluğu bu hücrenin sitoplazması değildir.",
            "Protein enzim hücre içinde üretilip uygun hücre dışı ortamda görev yapabilir.",
          ],
          optionReasons: [
            "Protein yapısı hiç hasar görmeme veya hiç yıkılmama garantisi değildir.",
            "Sindirim boşluğundaki uygun kataliz hücre dışı işlev örneğidir.",
            "Doğru. İki yer açıkça farklı verilmiştir; üretim ve işlev karıştırılmaz.",
            "Ribozomda sentez bilgisiyle çelişir.",
            "Substrat belirli dönüştürülen maddedir; ribozomun tamamı diye verilmemiştir.",
          ],
          commonError:
            "Bağırsak boşluğunda çalışan proteinin o boşlukta ribozomsuz sentezlendiğini veya yalnız sentezlendiği hücrede çalışabileceğini sanmak.",
          check: "Ribozom→salgılama→bağırsak boşluğunda işlev ayrılır.",
        },
      },
      {
        id: "f026bc-enzimler-17",
        prompt: {
          tr: "Yalnız tersinir rekabetçi engelleme modeli geçerli kabul edilsin. E sabitken inhibitör varlığında düşük S’de hız azalıyor, çok yüksek S’de inhibitörsüzle aynı üst sınıra yaklaşılıyor. Uygun yorum hangisidir?",
        },
        options: [
          {
            tr: "Üst sınıra yaklaşmak denge ürününü kesin artırır.",
          },
          {
            tr: "Her inhibitörün bütün etkileri substratla kesin silinir.",
          },
          {
            tr: "Sonlu S’de rekabet etkilidir; üst hız korunabilir, bu sonuç her inhibitöre genellenmez.",
          },
          {
            tr: "İnhibitör enzimin bütün amino asitlerini artırmıştır.",
          },
          {
            tr: "Düşük S’de hızın azalması substratın enzim olduğunu kanıtlar.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Kök yalnız belirtilen rekabetçi mekanizmayı kabul ediyor.",
        },
        explanation: {
          tr: "Kök yalnız belirtilen rekabetçi mekanizmayı kabul ediyor. Aynı etkin enzimde üst sınır korunabilirken sonluS’de bağlanma rekabeti hızı azaltır. Bu koşullu sonuç başka mekanizmalara veya denge miktarına taşınmaz.",
        },
        skill: "f026bc-enzimler",
        guidance: {
          knowledge: [
            "İnhibitör yorumu mekanizmaya bağlıdır; üst hız ile sonlu derişimdeki hız ayrılır.",
          ],
          strategy:
            "Yalnız kabul edilen rekabetçi model içinde düşük substrat hızını ve çok yüksek substrat sınırını karşılaştır; yorumun diğer engelleme türlerine taşmadığını denetle.",
          steps: [
            "Kök yalnız belirtilen rekabetçi mekanizmayı kabul ediyor.",
            "Aynı etkin enzimde üst sınır korunabilirken sonluS’de bağlanma rekabeti hızı azaltır.",
            "Bu koşullu sonuç başka mekanizmalara veya denge miktarına taşınmaz.",
          ],
          optionReasons: [
            "Başlangıç hızı üst sınırı denge konumu değildir.",
            "Kökte yalnız rekabetçi mekanizma verilmiştir; diğer inhibitörleri kapsamaz.",
            "Doğru. Verilen mekanizma ve gözlemin kapsamını birlikte korur.",
            "Amino asit sentezi veya enzim miktarı artışı verisi yoktur.",
            "Hız değişimi substrat ile katalizörün aynı molekül olduğunu göstermez.",
          ],
          commonError:
            "Yalnız rekabetçi model için verilen ortak üst sınır sonucunu bütün inhibitör mekanizmalarına koşulsuz genellemek.",
          check: "DüşükS farkı ve yüksekS aynılimit birlikte okunur.",
        },
      },
      {
        id: "f026bc-enzimler-18",
        prompt: {
          tr: "Kenar 4 birim olan katı substrat küpü,8 eş küpe fiziksel olarak ayrılıyor; madde kaybı ve kimyasal bağ hidrolizi yoktur. Başlangıç ve son toplam dış yüzey alanları 96 ve 192 birim². Hangi sonuç uygundur?",
        },
        options: [
          {
            tr: "Yüzey sekiz katına çıkmıştır; bütün protein bağları kopmuştur.",
          },
          {
            tr: "Yüzey iki katına çıkmıştır; peptit hidrolizi bu işlemden çıkarılamaz.",
          },
          {
            tr: "Hacim iki katına çıkmıştır.",
          },
          {
            tr: "Fiziksel parçalama kesin yeni enzim sentezlemiştir.",
          },
          {
            tr: "Her küçük küpün kenarı 4 birim kalmıştır.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Yüzey oranı 192/96=2’dir.",
        },
        explanation: {
          tr: "Yüzey oranı 192/96=2’dir. Sekiz küçük küpün kenarı 2, toplam hacmi 8×2³=64 başlangıç 4³’e eşittir. Erişilebilir yüzey değişebilir; kök kimyasal hidroliz ve yeni sentez vermiyor.",
        },
        skill: "f026bc-enzimler",
        guidance: {
          knowledge: [
            "Fiziksel yüzey artışı ile kimyasal bağ kesilmesi farklı olaylardır.",
          ],
          strategy:
            "Verilen iki toplam alanı oranla; fiziksel parçalanmanın dış yüzeyiyle kimyasal bağ hidrolizini ve ölçülmeyen hız değişimini ayrı değerlendir.",
          steps: [
            "Yüzey oranı 192/96=2’dir.",
            "Sekiz küçük küpün kenarı 2, toplam hacmi 8×2³=64 başlangıç 4³’e eşittir.",
            "Erişilebilir yüzey değişebilir; kök kimyasal hidroliz ve yeni sentez vermiyor.",
          ],
          optionReasons: [
            "Küp sayısı 8’i yüzey oranı sanır ve kökün hidroliz yok koşulunu çiğner.",
            "Doğru. Yüzey oranı 2; fiziksel ayırma peptit hidrolizi değildir.",
            "Hacim 64 olarak korunur; yüzey değişimi hacim artışı değildir.",
            "Parçalama yeni protein sentezi verisi içermez.",
            "Sekiz eş küpün her biri kenar 2 olmalıdır; kenar 4 kalırsa hacimsekizkat olur.",
          ],
          commonError:
            "Küp sayısı 8’i yüzey oranı sanır ve kökün hidroliz yok koşulunu çiğner.",
          check: "8×6×2²=192; 8×2³=64.",
        },
      },
      {
        id: "f026bc-enzimler-19",
        prompt: {
          tr: "Kapalı bir sistemde dallanmayan A→B→C yolunda her dönüşüm 1:1’dir. BaşlangıçA60, B10, C0 birimdir. İlk 5 dakika A→B hızı 6, B→C hızı 2 birim/dakika sabit kalıyor; başka giriş/çıkış yok. Beşinci dakikada B ve C miktarları nedir?",
        },
        options: [
          {
            tr: "40; 10",
          },
          {
            tr: "20; 10",
          },
          {
            tr: "30; 20",
          },
          {
            tr: "10; 30",
          },
          {
            tr: "30; 10",
          },
        ],
        answer: 4,
        hint: {
          tr: "İlk basamak 5×6=30 A’yı B’ye; ikinci 5×2=10 B’yi C’ye dönüştürür.",
        },
        explanation: {
          tr: "İlk basamak 5×6=30 A’yı B’ye; ikinci 5×2=10 B’yi C’ye dönüştürür. Bson=10+30−10=30; Cson=0+10=10. Ason 30, B30, C10 toplam 70 başlangıç 60+10=70 ile eşittir.",
        },
        skill: "f026bc-enzimler",
        guidance: {
          knowledge: [
            "Ardışık yolda ara ürün bilançosu başlangıç+giriş−çıkış biçiminde kurulur.",
          ],
          strategy:
            "İki basamaktan geçen miktarları aynı beş dakikalık aralıkta hesapla; B’ye geleni ve B’den gideni başlangıç B stokuna işaretleriyle ekle.",
          steps: [
            "İlk basamak 5×6=30 A’yı B’ye; ikinci 5×2=10 B’yi C’ye dönüştürür.",
            "Bson=10+30−10=30; Cson=0+10=10.",
            "Ason 30, B30, C10 toplam 70 başlangıç 60+10=70 ile eşittir.",
          ],
          optionReasons: [
            "B’ye eklenen 30’u başlangıç 10’a katıp ikinci basamaktaki 10 çıkışını atlar.",
            "B’nin net artışı 20’yi son miktar sanıp başlangıç 10’u atlar.",
            "C dönüşüm hızını ikinci kez iki kat alır; verilen 2×5=10’dur.",
            "B veC rollerini değiştirip ilk basamağın 30 ürününü doğrudanC sayar.",
            "Doğru. BaşlangıçB10 da eklenir; netB artışı 20, C artışı 10.",
          ],
          commonError:
            "B’nin net artışı 20’yi son miktar sanıp başlangıç 10’u atlar.",
          check: "A30+B30+C10=70; negatif stok oluşmaz.",
        },
      },
      {
        id: "f026bc-enzimler-20",
        prompt: {
          tr: "Aynı net tepkimede ürünlerin enerji düzeyi girenlerden 15 kJ/mol yüksektir. Enzim alternatif yolun aktivasyon enerjisini azaltıyor; başka enerji kaynağı eklenmiyor. Hangi sonuç doğrudur?",
        },
        options: [
          {
            tr: "Enzim 15 kJ/mol enerjiyi yoktan üretmiştir.",
          },
          {
            tr: "Net enerji farkı+15 kalır; katalizör bu farkı enerji vererek kapatmış sayılmaz.",
          },
          {
            tr: "Net fark kendiliğinden−15 olur.",
          },
          {
            tr: "Aktivasyon enerjisi azaldığından bütün denge ürünleri zorunlu iki kat olur.",
          },
          {
            tr: "Ürün düzeyi kesin girenle eşitlenir.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Net farkı ürün−giren olarak+15 belirle.",
        },
        explanation: {
          tr: "Net farkı ürün−giren olarak+15 belirle. Katalizör tepki yolunun engelini değiştirir; başlangıç ve son düzeylerini değiştirmez. Gereken enerjiyle ilişkili süreç ayrıca ele alınır; katalizör enerji kaynağı diye sayılamaz.",
        },
        skill: "f026bc-enzimler",
        guidance: {
          knowledge: [
            "Kataliz, aktivasyon engelini azaltır; enerji korunumu ve aynı koşuldaki dengeyi değiştirmez.",
          ],
          strategy:
            "Giren ve ürün enerji düzeyleri arasındaki farkı sabit uç veri olarak tut; alternatif yolun tepesini alçaltmanın bu uç farkına ne yaptığını sına.",
          steps: [
            "Net farkı ürün−giren olarak+15 belirle.",
            "Katalizör tepki yolunun engelini değiştirir; başlangıç ve son düzeylerini değiştirmez.",
            "Gereken enerjiyle ilişkili süreç ayrıca ele alınır; katalizör enerji kaynağı diye sayılamaz.",
          ],
          optionReasons: [
            "Katalizörün enerji üretmediği koşulla çelişir.",
            "Doğru. Uçlar korununca+15 fark korunur.",
            "Engelin azalmasını net farkın işaretinin tersine dönmesi sanır.",
            "Hız etkisini koşulsuz denge miktarı artışına çevirir; iki kat bilgisi yoktur.",
            "Ürün ve başlangıç farklı 15 düzeyde kalır; tepe azaltımı uçları eşitlemez.",
          ],
          commonError:
            "Engelin azalmasını net farkın işaretinin tersine dönmesi sanır.",
          check: "Ürün−giren=+15 hem enzimli hem enzimsiz yolda aynıdır.",
        },
      },
    ],
  },
  {
    id: "vitaminler-ileri",
    subjectId: "tyt-biyoloji",
    title: {
      tr: "Vitaminler: görev, çözünürlük ve ölçüm sınırı — ileri uygulama",
    },
    minutes: 45,
    objectives: [
      {
        tr: "Dizi,tepkime ve ölçüm koşullarını bağımsız kartlarda gerekçeyle uygulamak.",
      },
    ],
    body: [],
    source: {
      tr: "Kaynaklarla karşılaştırılmış özgün ileri alıştırmalar;resmî sınav sorusu değildir.",
    },
    tags: ["özgün-sorular", "ileri-uygulama", "forge026"],
    questions: [
      {
        id: "f026bc-vitaminler-1",
        prompt: {
          tr: "Bir sınıflama etkinliğinde 2 A,3 D,4 B12 ve 5 C kartı var. Her kart yalnız bir vitamin adını temsil ediyor; miktar veya beslenme dozu değildir. Yağda ve suda çözünen vitamin kartı adetleri sırasıyla nedir?",
        },
        options: [
          {
            tr: "5; 9",
          },
          {
            tr: "9; 5",
          },
          {
            tr: "2; 12",
          },
          {
            tr: "7; 7",
          },
          {
            tr: "14; 0",
          },
        ],
        answer: 0,
        hint: {
          tr: "A veD yağda, B12 veC suda çözünen gruptadır.",
        },
        explanation: {
          tr: "A veD yağda, B12 veC suda çözünen gruptadır. Yağda 2+3=5; suda 4+5=9 kart bulunur. Kart adetleri toplanır; ortak gruptaki vitaminlerin görevlerinin aynı olduğu sonucu çıkmaz.",
        },
        skill: "f026bc-vitaminler",
        guidance: {
          knowledge: [
            "Çözünürlük grubu vitamin kimliğine göre belirlenir; kart adediyle vitamin miktarı veya görevi karıştırılmaz.",
          ],
          strategy:
            "Her vitamin adını çözündüğü ortama göre gruplandır; ardından kart adetlerini kendi grubunda topla, bunları beslenme dozu gibi yorumlama.",
          steps: [
            "A veD yağda, B12 veC suda çözünen gruptadır.",
            "Yağda 2+3=5; suda 4+5=9 kart bulunur.",
            "Kart adetleri toplanır; ortak gruptaki vitaminlerin görevlerinin aynı olduğu sonucu çıkmaz.",
          ],
          optionReasons: [
            "Doğru. A+D5, B12+C9 kart verir.",
            "İki çözünürlük grubunu ters eşler.",
            "D’nin 3 kartını yağ grubundan su grubuna yanlış taşır.",
            "Her iki grupta eşit sayıda ad var diye kart adetlerini eşit sanır.",
            "B12 veC’yi de yağda çözünenlere katar.",
          ],
          commonError: "İki çözünürlük grubunu ters eşler.",
          check: "5+9=14 toplam kart.",
        },
      },
      {
        id: "f026bc-vitaminler-2",
        prompt: {
          tr: "Üç kayıt var: A yağda çözünür; C yağda çözünür; B12 suda çözünür ve hiçbir koşulda depolanamaz. Hangi düzeltme iki hatayı birlikte giderir?",
        },
        options: [
          {
            tr: "C suda çözünür; B12’nin anlamlı depoları bulunabilir.",
          },
          {
            tr: "C vitamini mineraldir; B12 trigliserittir.",
          },
          {
            tr: "B12 yağda çözünür; depo yasağı değişmez.",
          },
          {
            tr: "Üç kayıt da bütünüyle doğrudur.",
          },
          {
            tr: "A suda çözünür; C yağda kalır.",
          },
        ],
        answer: 0,
        hint: {
          tr: "A’nın yağda çözünür sınıflaması uygundur.",
        },
        explanation: {
          tr: "A’nın yağda çözünür sınıflaması uygundur. C suda çözünür; B12’nin su grubunda olması mutlak depo yasağı vermez. C’nin grubu ve B12’nin depo genellemesi düzeltilir; B12’nin grubu değiştirilmez.",
        },
        skill: "f026bc-vitaminler",
        guidance: {
          knowledge: ["B12 depo istisnası, suda çözünen sınıfını değiştirmez."],
          strategy:
            "Üç kaydın çözünürlük ve depo iddialarını ayrı denetle; doğru kaydı koruyarak iki yanlış önermeyi birlikte düzelten seçeneği ara.",
          steps: [
            "A’nın yağda çözünür sınıflaması uygundur.",
            "C suda çözünür; B12’nin su grubunda olması mutlak depo yasağı vermez.",
            "C’nin grubu ve B12’nin depo genellemesi düzeltilir; B12’nin grubu değiştirilmez.",
          ],
          optionReasons: [
            "Doğru. İki ayrı yanlış sınıflama/genellemeyi doğru biçimde düzeltir.",
            "İki organik vitamini mineral ve trigliserit diye yanlış adlandırır.",
            "Depo istisnasını düzeltmek için B12’yi yanlış çözünürlük grubuna taşır.",
            "C sınıflaması ve B12 mutlak depo yasağı hatalıdır.",
            "DoğruA kaydını bozup yanlışC kaydını korur.",
          ],
          commonError: "DoğruA kaydını bozup yanlışC kaydını korur.",
          check: "A yağda; C veB12 suda; B12 için anlamlı depo mümkündür.",
        },
      },
      {
        id: "f026bc-vitaminler-3",
        prompt: {
          tr: "Kapalı bir hazırlama deneyinde başlangıç 120 birim etkin C vitamini, son katıda 50, suda 30 birimdir. Başka bölme yoktur. Su yemekte tutulursa yenebilir toplam ve kimyasal etkinlik kaybı nedir?",
        },
        options: [
          {
            tr: "120; 0",
          },
          {
            tr: "80; 30",
          },
          {
            tr: "50; 70",
          },
          {
            tr: "40; 80",
          },
          {
            tr: "80; 40",
          },
        ],
        answer: 4,
        hint: {
          tr: "Yenebilir kısım su da tutulduğundan 50+30=80 birimdir.",
        },
        explanation: {
          tr: "Yenebilir kısım su da tutulduğundan 50+30=80 birimdir. Etkinlik kaybı 120−50−30=40 birimdir. Dağılım ile kimyasal kayıp farklıdır; suya geçen 30 etkin miktar toplamda kalır.",
        },
        skill: "f026bc-vitaminler",
        guidance: {
          knowledge: [
            "Kapalı üç bölmeli modelde başlangıç=katı+su+etkinlik kaybı.",
          ],
          strategy:
            "Katı, su ve etkinlik kaybı için tek korunum bilançosu kur; su tutulduğunda yenebilir toplamı bu bilançodan ayrı seç.",
          steps: [
            "Yenebilir kısım su da tutulduğundan 50+30=80 birimdir.",
            "Etkinlik kaybı 120−50−30=40 birimdir.",
            "Dağılım ile kimyasal kayıp farklıdır; suya geçen 30 etkin miktar toplamda kalır.",
          ],
          optionReasons: [
            "Ölçülen 40 birim etkinlik kaybını yok sayar.",
            "Suda ölçülen 30’u kimyasal kayıp sanır.",
            "Su tutulduğu hâlde onu dışlayıp 50 alır; kalan 70’in tamamını kimyasal kayıp sayar.",
            "Kimyasal kayıp ve yenebilir miktarı ters verir.",
            "Doğru. Katı+su 80; korunum farkı 40.",
          ],
          commonError:
            "Su tutulduğu hâlde onu dışlayıp 50 alır; kalan 70’in tamamını kimyasal kayıp sayar.",
          check: "80+40=120 birim.",
        },
      },
      {
        id: "f026bc-vitaminler-4",
        prompt: {
          tr: "Başlangıç 100, son katı 60 birim etkin C vitamini ölçülüyor. Su ölçülmüyor fakat yemekte tutuluyor; kapalı modelde başka bölme yoktur ve miktarlar negatif olamaz. Yenebilir toplam için hangi aralık kesindir?",
        },
        options: [
          {
            tr: "0–40",
          },
          {
            tr: "Yalnız 60",
          },
          {
            tr: "60–100",
          },
          {
            tr: "100–160",
          },
          {
            tr: "Yalnız 100",
          },
        ],
        answer: 2,
        hint: {
          tr: "Bilinmeyen su miktarı 0 ile 100−60=40 arasında olabilir.",
        },
        explanation: {
          tr: "Bilinmeyen su miktarı 0 ile 100−60=40 arasında olabilir. Yenebilir toplam 60+su olduğundan 60 ile 100 arasında kalır. Su ölçülmemesi suyu 0 veya 40 olarak tek değere sabitlemez.",
        },
        skill: "f026bc-vitaminler",
        guidance: {
          knowledge: [
            "Ölçülmeyen bölmede negatif olmayan olasılıklar ve korunum sınırları kullanılır.",
          ],
          strategy:
            "Ölçülmeyen suyu değişken bırak; başlangıç ile katı arasındaki farkı negatif olmayan su ve kayıp arasında paylaştırarak yenebilir miktarın sınırlarını bul.",
          steps: [
            "Bilinmeyen su miktarı 0 ile 100−60=40 arasında olabilir.",
            "Yenebilir toplam 60+su olduğundan 60 ile 100 arasında kalır.",
            "Su ölçülmemesi suyu 0 veya 40 olarak tek değere sabitlemez.",
          ],
          optionReasons: [
            "Katıdan sonra açıklanmayan 40 miktarını yenebilir toplam aralığı sanır.",
            "Ölçülmeyen suyu ölçülmüş 0 sayar.",
            "Doğru. Alt sınırkatı 60, üst sınırbaşlangıç 100’dür.",
            "Başlangıç 100’e katıyı yeniden ekleyip korunum üst sınırını aşar.",
            "Bütün farkın suda kaldığını, kimyasal kaybın 0 olduğunu verisiz kabul eder.",
          ],
          commonError: "Ölçülmeyen suyu ölçülmüş 0 sayar.",
          check:
            "Su0 ise toplam 60; su 40 ise toplam 100; ara olasılıklar mümkündür.",
        },
      },
      {
        id: "f026bc-vitaminler-5",
        prompt: {
          tr: "Kapalı C vitamini modelinde başlangıç 80, son katı 80 birim ölçülüyor. Su ayrıca ölçülmemiştir. Yeni vitamin girişi ve başka bölme yoktur. Suya geçiş ve etkinlik kaybı için ne çıkar?",
        },
        options: [
          {
            tr: "İkisi de 0’dır; korunum bunu zorunlu kılar.",
          },
          {
            tr: "Su80, kayıp 0’dır.",
          },
          {
            tr: "Su0, kayıp 80’dir.",
          },
          {
            tr: "Su40, kayıp 40’tır.",
          },
          {
            tr: "İkisi de daima belirsizdir; korunum kullanılamaz.",
          },
        ],
        answer: 0,
        hint: {
          tr: "Başlangıç ile katı eşit olduğundan açıklanmayan fark 80−80=0’dır.",
        },
        explanation: {
          tr: "Başlangıç ile katı eşit olduğundan açıklanmayan fark 80−80=0’dır. Su ve kayıp negatif olamayacağı için toplamları 0 ancak her ikisi 0 iken mümkündür. Bu sıfır, ölçüm yokluğundan değil açık korunum koşulundan çıkar.",
        },
        skill: "f026bc-vitaminler",
        guidance: {
          knowledge: [
            "Ölçülmeyen değer genellikle belirsizdir; fakat korunum bazı sınır durumlarında tek değer zorlayabilir.",
          ],
          strategy:
            "Başlangıç ve katı farkını önce hesapla; kalan iki bölmenin negatif olamayacağını kullanarak sıfır farkın özel sonucunu sına.",
          steps: [
            "Başlangıç ile katı eşit olduğundan açıklanmayan fark 80−80=0’dır.",
            "Su ve kayıp negatif olamayacağı için toplamları 0 ancak her ikisi 0 iken mümkündür.",
            "Bu sıfır, ölçüm yokluğundan değil açık korunum koşulundan çıkar.",
          ],
          optionReasons: [
            "Doğru. 0 toplamında iki negatif olmayan miktar ayrı ayrı 0 olur.",
            "Katıda 80’e ek su 80, başlangıcı 160’a çıkarırdı.",
            "Katıda 80’e kayıp 80 ekleyip başlangıcı iki kat sayar.",
            "80 katı+40 su+40 kayıp 160 eder; kapalı 80 başlangıçla çelişir.",
            "Özel sıfır fark durumunda korunumu yok sayar; belirsizlik zorunlu değildir.",
          ],
          commonError:
            "Özel sıfır fark durumunda korunumu yok sayar; belirsizlik zorunlu değildir.",
          check: "80=80+0+0.",
        },
      },
      {
        id: "f026bc-vitaminler-6",
        prompt: {
          tr: "Başlangıç 90, son katı 40, su 35 birim etkin C vitamini ölçülüyor. Su dökülüyor ve başka bölme yok. Yenebilir miktar, suyla uzaklaşan etkin miktar ve kimyasal etkinlik kaybı nedir?",
        },
        options: [
          {
            tr: "40; 15; 35",
          },
          {
            tr: "90; 35; 0",
          },
          {
            tr: "35; 40; 15",
          },
          {
            tr: "75; 0; 15",
          },
          {
            tr: "40; 35; 15",
          },
        ],
        answer: 4,
        hint: {
          tr: "Kimyasal kayıp 90−40−35=15 birim.",
        },
        explanation: {
          tr: "Kimyasal kayıp 90−40−35=15 birim. Su döküldüğü için yenebilir bölüm yalnız katı 40’tır; 35 birim etkin vitamin suyla uzaklaşır. Suya geçiş 35 ile kimyasal etkinlik kaybı 15 ayrı sütunlarda tutulur.",
        },
        skill: "f026bc-vitaminler",
        guidance: {
          knowledge: [
            "Dökülen suyun taşıdığı etkin vitamin, kimyasal olarak etkinliğini yitiren vitaminle aynı miktar değildir.",
          ],
          strategy:
            "Son miktarları yenebilir katı, dökülen sudaki etkin vitamin ve kimyasal etkinlik kaybı olarak üç ayrı hesaba ayır.",
          steps: [
            "Kimyasal kayıp 90−40−35=15 birim.",
            "Su döküldüğü için yenebilir bölüm yalnız katı 40’tır; 35 birim etkin vitamin suyla uzaklaşır.",
            "Suya geçiş 35 ile kimyasal etkinlik kaybı 15 ayrı sütunlarda tutulur.",
          ],
          optionReasons: [
            "Suyla uzaklaşma ve kimyasal kayıp niceliklerini ters verir.",
            "Başlangıç 90’ı işlem sonrası yenebilir sayar; ölçülen katı 40’tır.",
            "Katı ve suyu ters bölmelere koyar.",
            "Suyu dökmeye rağmen katı+su 75’i yenebilir sayar.",
            "Doğru. Katı 40, suyla uzaklaşan 35, etkinlik kaybı 15.",
          ],
          commonError: "Suyu dökmeye rağmen katı+su 75’i yenebilir sayar.",
          check: "40+35+15=90.",
        },
      },
      {
        id: "f026bc-vitaminler-7",
        prompt: {
          tr: "Bir deneyde katıda 60, suda 20 birim etkin C vitamini kalmış; kimyasal etkinliğini yitiren bölüm 20 birim bulunmuştur. Kapalı modelde başlangıç miktarı kaç birimdir?",
        },
        options: [
          {
            tr: "60",
          },
          {
            tr: "100",
          },
          {
            tr: "40",
          },
          {
            tr: "120",
          },
          {
            tr: "80",
          },
        ],
        answer: 1,
        hint: {
          tr: "Üç son bölmeyi aynı birimde sırala:60,20,20.",
        },
        explanation: {
          tr: "Üç son bölmeyi aynı birimde sırala:60,20,20. Başlangıç, bütün bölmelerin toplamıdır. 60+20+20=100 birim bulunur; etkinliğini yitiren bölüm de başlangıç muhasebesine dahildir.",
        },
        skill: "f026bc-vitaminler",
        guidance: {
          knowledge: [
            "Ters miktar hesabında başlangıç, bütün son bölmelerin toplamıdır.",
          ],
          strategy:
            "Başlangıç miktarını bilinmeyen al; son etkin katı ve suyla etkinliğini yitiren kısmı aynı kapalı bilançoda birleştir.",
          steps: [
            "Üç son bölmeyi aynı birimde sırala:60,20,20.",
            "Başlangıç, bütün bölmelerin toplamıdır.",
            "60+20+20=100 birim bulunur; etkinliğini yitiren bölüm de başlangıç muhasebesine dahildir.",
          ],
          optionReasons: [
            "Yalnız katıyı başlangıç kabul eder.",
            "Doğru. Üç bölmenin toplamı 100’dür.",
            "Katıdan suyu çıkarır:60−20=40; başlangıç için yanlış yönde işlem yapar.",
            "20 birimlik kaybı iki kez ekler:60+20+20+20=120.",
            "Yalnız etkin kalan katı+su 80’i başlangıç sayar; 20 kaybı atlar.",
          ],
          commonError:
            "Yalnız etkin kalan katı+su 80’i başlangıç sayar; 20 kaybı atlar.",
          check: "100−60−20=20 kayıp değerini geri verir.",
        },
      },
      {
        id: "f026bc-vitaminler-8",
        prompt: {
          tr: "Başlangıç 80, son katı 30 birim etkin C vitamini. Su ölçülmeden dökülüyor; başka bölme yok. Hangi iki bilgi birlikte doğrudur?",
        },
        options: [
          {
            tr: "Yenebilir miktar kesin 80; kayıp kesin 0.",
          },
          {
            tr: "Yenebilir miktar daima belirsiz; kayıp kesin 50.",
          },
          {
            tr: "Yenebilir miktar 50; kayıp 30.",
          },
          {
            tr: "Yenebilir miktar 30; kimyasal kayıp 0–50 arasında olabilir.",
          },
          {
            tr: "Yenebilir miktar 30; kayıp kesin 0.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Su döküldüğü için yenebilir bölüm ölçülen katı 30’dur.",
        },
        explanation: {
          tr: "Su döküldüğü için yenebilir bölüm ölçülen katı 30’dur. Açıklanmayan 80−30=50, suya geçiş ile etkinlik kaybı arasında paylaşılabilir. Kimyasal kayıp 0–50 aralığındadır; su ölçülmediği için tek değer yoktur.",
        },
        skill: "f026bc-vitaminler",
        guidance: {
          knowledge: [
            "Aynı deneyde bazı nicelikler kesin, bazıları yalnız aralık olarak belirlenebilir.",
          ],
          strategy:
            "Suyun dökülmesini yenebilir kısım hesabında uygula; ölçülmeyen su ile kimyasal kaybın paylaşımına ilişkin bilinmeyeni ayrıca koru.",
          steps: [
            "Su döküldüğü için yenebilir bölüm ölçülen katı 30’dur.",
            "Açıklanmayan 80−30=50, suya geçiş ile etkinlik kaybı arasında paylaşılabilir.",
            "Kimyasal kayıp 0–50 aralığındadır; su ölçülmediği için tek değer yoktur.",
          ],
          optionReasons: [
            "Dökülen su ve olası etkinlik kaybını yok sayar.",
            "Su dökülünce yenebilir katı kesin 30’dur; 50’nin tamamının kimyasal kayıp olduğu bilinmez.",
            "Başlangıçtan katıyı çıkarınca kalan 50’yi yenebilir sanır.",
            "Doğru. Yenebilir katı bilinir; su ve kimyasal kaybın paylaşımı bilinmez.",
            "50’nin tamamının suya geçtiğini verisiz varsayar.",
          ],
          commonError: "Dökülen su ve olası etkinlik kaybını yok sayar.",
          check: "30+su+kayıp=80 ve 0≤kayıp≤50.",
        },
      },
      {
        id: "f026bc-vitaminler-9",
        prompt: {
          tr: "İki kapalı deney 80’er birim C vitaminiyle başlıyor. X sonunda katı 40, su 20; Y’de katı 30, su 40 birim. Su tutulursa yenebilir miktarı daha yüksek olan ve su dökülürse daha yüksek olan örnek sırasıyla hangisidir?",
        },
        options: [
          {
            tr: "X; X",
          },
          {
            tr: "Y; Y",
          },
          {
            tr: "X; Y",
          },
          {
            tr: "Y; X",
          },
          {
            tr: "İki durumda da eşit",
          },
        ],
        answer: 3,
        hint: {
          tr: "Su tutulunca X40+20=60, Y30+40=70.",
        },
        explanation: {
          tr: "Su tutulunca X40+20=60, Y30+40=70. Su dökülünce X40, Y30 kalır. Su kararı sıralamayı değiştirir: önceY, sonraX; bu kimyasal kaybı geriye dönük değiştirmez.",
        },
        skill: "f026bc-vitaminler",
        guidance: {
          knowledge: [
            "Karşılaştırılan bölmeler aynı seçilmelidir; yalnızkatı ve katı+su farklı sonuçlar verebilir.",
          ],
          strategy:
            "Her deney için su tutulduğunda ve döküldüğünde iki farklı yenebilir toplam yaz; iki senaryonun sıralamalarını bağımsız karşılaştır.",
          steps: [
            "Su tutulunca X40+20=60, Y30+40=70.",
            "Su dökülünce X40, Y30 kalır.",
            "Su kararı sıralamayı değiştirir: önceY, sonraX; bu kimyasal kaybı geriye dönük değiştirmez.",
          ],
          optionReasons: [
            "X’in katı üstünlüğünü su tutulduğu duruma da taşır.",
            "Y’nin katı+su üstünlüğünü su döküldükten sonra da varsayar.",
            "İki kararın sıralamasını ters verir.",
            "Doğru. Tutma toplamındaY70>X60; dökmedeX40>Y30.",
            "60≠70 ve 40≠30; iki karşılaştırma da eşit değildir.",
          ],
          commonError: "İki kararın sıralamasını ters verir.",
          check:
            "X kayıp 20, Y kayıp 10; yenebilir bölüm seçimi ayrıca belirtilir.",
        },
      },
      {
        id: "f026bc-vitaminler-10",
        prompt: {
          tr: "Bir işlemden önce 100 birim etkin C vitamini var. Son katıda 45, suda 25 ölçülüyor; kapalı model. Yalnız katı ölçülseydi görülen 55 birim azalışın ne kadarı suya geçiş, ne kadarı kimyasal etkinlik kaybıdır?",
        },
        options: [
          {
            tr: "45 suya geçiş; 10 kayıp",
          },
          {
            tr: "25 suya geçiş; 30 etkinlik kaybı",
          },
          {
            tr: "55 suya geçiş; 0 kayıp",
          },
          {
            tr: "0 suya geçiş; 55 kayıp",
          },
          {
            tr: "30 suya geçiş; 25 kayıp",
          },
        ],
        answer: 1,
        hint: {
          tr: "Katıdaki azalış 100−45=55 birimdir.",
        },
        explanation: {
          tr: "Katıdaki azalış 100−45=55 birimdir. Suda ölçülen 25 birim bu azalışın dağılım bölümüdür. Geriye 55−25=30 birim etkinlik kaybı kalır.",
        },
        skill: "f026bc-vitaminler",
        guidance: {
          knowledge: [
            "Ölçülen katı azalması, suya geçiş ve etkinlik kaybını birlikte içerebilir.",
          ],
          strategy:
            "Katıdaki eksilmeyi önce toplam fark olarak yaz; ölçülmüş su miktarıyla açıklanan bölümü ayırıp kalan farkı kimyasal kayba bağla.",
          steps: [
            "Katıdaki azalış 100−45=55 birimdir.",
            "Suda ölçülen 25 birim bu azalışın dağılım bölümüdür.",
            "Geriye 55−25=30 birim etkinlik kaybı kalır.",
          ],
          optionReasons: [
            "Katıda kalan 45’i suya geçen miktar sanır.",
            "Doğru. Azalış 55=su 25+kayıp 30 olarak ayrılır.",
            "Suda ölçülen 25’i55 yapar ve korunumda kaybı siler.",
            "Suda ölçülen 25’i yok sayıp 55’in tümünü kimyasal kayıp sayar.",
            "Suyun 25 ile kaybın 30 değerlerini ters verir.",
          ],
          commonError: "Suda ölçülen 25’i55 yapar ve korunumda kaybı siler.",
          check: "45+25+30=100.",
        },
      },
      {
        id: "f026bc-vitaminler-11",
        prompt: {
          tr: "Bir enerji hesabında glikoz 16 birim enerji sağlıyor. B1’den türemiş yardımcı, gerekli enzimin çalışmasına katılıyor; bu hesapta vitamin enerji yakıtı olarak sayılmıyor. B1 yardımcısı eklenince vitaminin doğrudan sağladığı enerji için hangi sonuç uygundur?",
        },
        options: [
          {
            tr: "Enerji dönüşümüne katılan hiçbir enzim çalışamaz.",
          },
          {
            tr: "Bu hesapta 0; yardımcı rol yakıt rolü değildir.",
          },
          {
            tr: "Glikozla aynı 16 birim",
          },
          {
            tr: "Glikozun iki katı 32 birim",
          },
          {
            tr: "Molekül organik olduğundan mutlaka pozitif ve ölçülmüş enerji",
          },
        ],
        answer: 1,
        hint: {
          tr: "Kökte enerji veren yakıt glikoz olarak tanımlanmıştır.",
        },
        explanation: {
          tr: "Kökte enerji veren yakıt glikoz olarak tanımlanmıştır. B1 kökenli yardımcı belirli dönüşümün yürütülmesinde görev alır. Bu rol vitaminin doğrudan kalorili yakıt olarak 16 veya 32 birim sağladığı anlamına gelmez.",
        },
        skill: "f026bc-vitaminler",
        guidance: {
          knowledge: [
            "Enerji metabolizmasında görev almak enerji hammaddesi olmakla aynı değildir.",
          ],
          strategy:
            "Yakıt olarak sayılan glikozla enzim yardımcısının görevini ayrı etiketle; verilen enerji hesabına vitamin adına yeni bir yakıt katkısı ekleme.",
          steps: [
            "Kökte enerji veren yakıt glikoz olarak tanımlanmıştır.",
            "B1 kökenli yardımcı belirli dönüşümün yürütülmesinde görev alır.",
            "Bu rol vitaminin doğrudan kalorili yakıt olarak 16 veya 32 birim sağladığı anlamına gelmez.",
          ],
          optionReasons: [
            "Yardımcı rol ve yakıt rolünün ayrılması enzimli dönüşümleri engellemez.",
            "Doğru. Kökte vitamin yakıt sayılmadığından doğrudan yakıt katkısı 0’dır.",
            "Glikozun 16 enerji miktarını yardımcının miktarı gibi kopyalar.",
            "Verilmeyen iki kat enerji katsayısı uydurur.",
            "Organik oluşu enerji yakıtı kabulüyle eşitler; ölçüm de verilmemiştir.",
          ],
          commonError:
            "Glikozun 16 enerji miktarını yardımcının miktarı gibi kopyalar.",
          check: "Glikoz yakıtı 16; vitaminin görevi ayrı sütundadır.",
        },
      },
      {
        id: "f026bc-vitaminler-12",
        prompt: {
          tr: "Tabloda B2’den türeyen bir yardımcı FAD, B3’ten türeyen bir yardımcı NAD olarak verilmiş. Bu bilgi hangi yorumu destekler?",
        },
        options: [
          {
            tr: "B2 ileB3’ün her eksikliği diğerinin sınırsız verilmesiyle giderilir.",
          },
          {
            tr: "FAD veNAD protein enzimin tamamının adlarıdır.",
          },
          {
            tr: "NAD bir mineral elementtir.",
          },
          {
            tr: "B2 veB3 aynı tek molekülün iki zorunlu eş adıdır.",
          },
          {
            tr: "Aynı B grubu, farklı vitamin ve farklı yardımcı molekülleri kapsar.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Tablo iki farklı öncül ve iki farklı ürün eşlemesi verir.",
        },
        explanation: {
          tr: "Tablo iki farklı öncül ve iki farklı ürün eşlemesi verir. Ortak B grubu kimyasal özdeşlik veya görevlerin tamamen eşliği değildir. B2→FAD veB3→NAD ayrımı korunur; yardımcılar enzim proteininden ayrı değerlendirilir.",
        },
        skill: "f026bc-vitaminler",
        guidance: {
          knowledge: [
            "Koenzim öncülleri ve enzim proteinleri farklı bileşenlerdir; B grubu çok üyeli bir gruptur.",
          ],
          strategy:
            "İki vitamin öncülü ve iki yardımcı ürün için eşleme tablosu kur; örneklerden desteklenen vitamin–yardımcı ilişkisini evrensel özdeşlik iddialarından ayır.",
          steps: [
            "Tablo iki farklı öncül ve iki farklı ürün eşlemesi verir.",
            "Ortak B grubu kimyasal özdeşlik veya görevlerin tamamen eşliği değildir.",
            "B2→FAD veB3→NAD ayrımı korunur; yardımcılar enzim proteininden ayrı değerlendirilir.",
          ],
          optionReasons: [
            "Ortak grup adı her görev için birbirinin yerine geçebilme kanıtı değildir.",
            "Organik yardımcıyı protein katalizörün bütünüyle karıştırır.",
            "NAD organik yardımcıdır; mineral element değildir.",
            "Tablodaki farklı öncülleri özdeş sayar.",
            "Doğru. B grubunun tek vitamin olmadığını somut iki eşlemeyle gösterir.",
          ],
          commonError: "Tablodaki farklı öncülleri özdeş sayar.",
          check: "İki eşlemenin yönü ve adı korunmalıdır.",
        },
      },
      {
        id: "f026bc-vitaminler-13",
        prompt: {
          tr: "Bir deneyde E vitamininin belirli bir zar lipidi örneğinde oksidatif hasarı azalttığı ölçülüyor. Diğer hastalıklar veya insanlar araştırılmamış. Hangi sonuç kapsamı korur?",
        },
        options: [
          {
            tr: "E vitamini bütün vitaminlerle aynı yapıda olmak zorundadır.",
          },
          {
            tr: "E vitamini her insanda bütün tümörleri kesin önler.",
          },
          {
            tr: "Ölçülen koşulda antioksidan etki desteklenir; bütün hastalıkların önlendiği çıkmaz.",
          },
          {
            tr: "Antioksidan etki, E vitamininin protein olduğunu kanıtlar.",
          },
          {
            tr: "Tek deney bütün dozların güvenli olduğunu göstermiştir.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Ölçülen sonucun zar lipidi hasarı olduğunu belirle.",
        },
        explanation: {
          tr: "Ölçülen sonucun zar lipidi hasarı olduğunu belirle. Araştırılan örnek ve koşulla sınırlı antioksidan ilişki kur. Ölçülmeyen hastalık, insan grubu ve miktarlara kesin koruma veya güvenlilik taşıma.",
        },
        skill: "f026bc-vitaminler",
        guidance: {
          knowledge: [
            "Vitamin göreviyle geniş hastalık önleme garantisi farklı iddialardır.",
          ],
          strategy:
            "Deneyin malzemesini, ölçülen etkisini ve araştırılmayan grupları listele; seçeneğin yalnız bu kanıt sınırında kaldığını denetle.",
          steps: [
            "Ölçülen sonucun zar lipidi hasarı olduğunu belirle.",
            "Araştırılan örnek ve koşulla sınırlı antioksidan ilişki kur.",
            "Ölçülmeyen hastalık, insan grubu ve miktarlara kesin koruma veya güvenlilik taşıma.",
          ],
          optionReasons: [
            "Tek işlev ölçümü bütün vitaminlerin moleküler özdeşliğini göstermez.",
            "Araştırılmayan bütün insanlar ve tümörlere kesin sonuç taşır.",
            "Doğru. Verilen deneyin ölçtüğü antioksidan sonucu kendi kapsamıyla ifade eder.",
            "Antioksidan işlev protein sınıfına özgü değildir; E vitamini protein değildir.",
            "Doz güvenliliği bu deneyde incelenmemiştir.",
          ],
          commonError:
            "Araştırılmayan bütün insanlar ve tümörlere kesin sonuç taşır.",
          check: "Kanıt yalnız verilen zar lipidi ve koşula aittir.",
        },
      },
      {
        id: "f026bc-vitaminler-14",
        prompt: {
          tr: "İnsanda D vitaminiyle ilgili yol şeması bu kartta “deride uygun UVB ile öncül dönüşümü → karaciğerde dönüşüm → böbrekte etkin biçimin oluşumuna katkı” olarak veriliyor. Hangi yorum doğrudur?",
        },
        options: [
          {
            tr: "UVB vitamindeki bütün karbon atomlarını yoktan üretir.",
          },
          {
            tr: "Bu yol insanın bütün vitaminleri yeterince sentezlediğini kanıtlar.",
          },
          {
            tr: "Bütün basamaklar yalnız deride gerçekleşir.",
          },
          {
            tr: "Başlangıç ve sonraki etkinleşme basamakları farklı organlarla ilişkilidir.",
          },
          {
            tr: "Böbrek basamağının varlığı derideki başlangıcı imkânsız kılar.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Şemadaki üç yerin sırasını koru: deri, karaciğer, böbrek.",
        },
        explanation: {
          tr: "Şemadaki üç yerin sırasını koru: deri, karaciğer, böbrek. Işık uygun öncülün dönüşüm koşuludur; organların farklı basamakları vardır. Bu özel yol diğer vitaminlerin bütün gereksinimlerine genellenmez.",
        },
        skill: "f026bc-vitaminler",
        guidance: {
          knowledge: [
            "Öncül oluşumu ve etkinleşme basamakları aynı olay veya aynı yer olmak zorunda değildir.",
          ],
          strategy:
            "Verilmiş insan yolundaki yerleri oklarla sırala; öncül oluşumunu sonraki organ dönüşümleriyle birlikte okuyup tek aşamaya indirgeme.",
          steps: [
            "Şemadaki üç yerin sırasını koru: deri, karaciğer, böbrek.",
            "Işık uygun öncülün dönüşüm koşuludur; organların farklı basamakları vardır.",
            "Bu özel yol diğer vitaminlerin bütün gereksinimlerine genellenmez.",
          ],
          optionReasons: [
            "Işık, verilen biyolojik öncülün atomlarını yoktan yaratmaz.",
            "Tek vitamin yolu bütün vitaminler için sentez yeterliliği kanıtı değildir.",
            "Karaciğer ve böbrek basamaklarını yok sayar.",
            "Doğru. Şema farklı yerlerde ilişkili basamaklar verir.",
            "Ardışık iki basamağın farklı organlarda olması çelişki değildir.",
          ],
          commonError: "Karaciğer ve böbrek basamaklarını yok sayar.",
          check: "Şemada üç ayrı yer vardır; sonuç yalnızD yoluna aittir.",
        },
      },
      {
        id: "f026bc-vitaminler-15",
        prompt: {
          tr: "Yalnız öğretim hesabında 40 öncül biriminin %20’si etkin A vitamini birimine 1:1 dönüşüyor. Başka kayıp yok. Ayrı örnekte 10 birim hazır etkin A var. İlk örneğin etkin ürünü ve ikinciye göre eksiği nedir?",
        },
        options: [
          {
            tr: "8; 2",
          },
          {
            tr: "20; 10",
          },
          {
            tr: "8; 8",
          },
          {
            tr: "10; 0",
          },
          {
            tr: "40; 30",
          },
        ],
        answer: 0,
        hint: {
          tr: "Dönüşen öncül 40×20/100=8 birimdir.",
        },
        explanation: {
          tr: "Dönüşen öncül 40×20/100=8 birimdir. Verilen 1:1 modelde etkin ürün de 8 birim olur. Hazır 10’a göre eksik 10−8=2 birimdir; bu oran gerçek insan dönüşüm sabiti değildir.",
        },
        skill: "f026bc-vitaminler",
        guidance: {
          knowledge: [
            "Öncül miktarı ile etkin ürün miktarı, dönüşüm koşulu verilmeden özdeş sayılamaz.",
          ],
          strategy:
            "Dönüşüm yüzdesini öncül miktarına uygula; belirtilen 1:1 dönüşümden sonra bulunan etkin ürünü hazır etkin örnekle aynı birimde karşılaştır.",
          steps: [
            "Dönüşen öncül 40×20/100=8 birimdir.",
            "Verilen 1:1 modelde etkin ürün de 8 birim olur.",
            "Hazır 10’a göre eksik 10−8=2 birimdir; bu oran gerçek insan dönüşüm sabiti değildir.",
          ],
          optionReasons: [
            "Doğru. 8 etkin ürün ve 10−8=2 eksik bulunur.",
            "Yüzde 20’yi ürün 20 sanır; başlangıç 40’a uygulamaz.",
            "Ürün 8’i fark yerine de kullanır; fark 10−8=2’dir.",
            "Hazır örneğin 10’unu dönüşümlü örneğe kopyalar.",
            "Bütün öncülün dönüştüğünü varsayıp%20 koşulunu atlar.",
          ],
          commonError: "Yüzde 20’yi ürün 20 sanır; başlangıç 40’a uygulamaz.",
          check: "40=8 dönüşen+32 dönüşmeyen; ikinci örnek 10 etkin birim.",
        },
      },
      {
        id: "f026bc-vitaminler-16",
        prompt: {
          tr: "Kartta insanın C vitamini gereksinimini karşılayacak sentez yoluna sahip olmadığı, bir P bitkisinin ise C vitamini sentezlediği veriliyor. Hangisi uygundur?",
        },
        options: [
          {
            tr: "C vitamini P’de üretildiğinden organik olamaz.",
          },
          {
            tr: "İnsan da P olduğu için aynı sentezi zorunlu yapar.",
          },
          {
            tr: "Bitkide C sentezi bütün vitaminlerin bütün bitkilerde aynı miktarda üretildiğini kanıtlar.",
          },
          {
            tr: "İnsan hiçbir organik molekül sentezleyemez.",
          },
          {
            tr: "Sentez yeterliliği canlı türü bağlamında değerlendirilir; P’nin yolu insana taşınmaz.",
          },
        ],
        answer: 4,
        hint: {
          tr: "İki canlı için verilen sentez durumları farklıdır.",
        },
        explanation: {
          tr: "İki canlı için verilen sentez durumları farklıdır. P’deki bir yolun insanda bulunmasını ortak vitamin adı zorunlu kılmaz. Sonucu belirli tür ve vitamin kapsamında kur; insanın bütün organik sentezlerini reddetme.",
        },
        skill: "f026bc-vitaminler",
        guidance: {
          knowledge: [
            "Vitamin gereksinimi ve sentez yeteneği ilgili canlı ve biyolojik koşulla birlikte tanımlanır.",
          ],
          strategy:
            "İnsan ve P bitkisi için verilen sentez durumlarını ayrı satırlarda tut; bir canlıya ait koşulu bütün canlılara veya diğer satıra taşımadan yorumla.",
          steps: [
            "İki canlı için verilen sentez durumları farklıdır.",
            "P’deki bir yolun insanda bulunmasını ortak vitamin adı zorunlu kılmaz.",
            "Sonucu belirli tür ve vitamin kapsamında kur; insanın bütün organik sentezlerini reddetme.",
          ],
          optionReasons: [
            "Organik sınıflama sentezin gerçekleştiği canlıya göre ortadan kalkmaz.",
            "İnsan veP bitkisi aynı canlı değildir; verilen yetersizlikle de çelişir.",
            "Tek P veC örneği bütün bitkiler/bütün vitaminler/miktarlar için kanıt değildir.",
            "C yolunun yetersizliğini bütün organik sentezlere yayar.",
            "Doğru. Tür ve molekül kapsamını korur.",
          ],
          commonError:
            "İnsana ait sentez yetersizliğini P bitkisine de aktararak bütün canlıların C vitamini sentezleyemediğini sanmak.",
          check:
            "İnsanC sentezi yetersiz; P’deC sentezi var, iki veri ayrı korunur.",
        },
      },
      {
        id: "f026bc-vitaminler-17",
        prompt: {
          tr: "Bir okul tablosunda B1–beriberi, B3–pellagra, C–skorbüt eşleştirmeleri verilmiş. X kaydı kollajen yapımını destekleyen vitaminin skorbütle ilişkisini arıyor. Tabloya göre X hangi vitamindir?",
        },
        options: [
          {
            tr: "B3",
          },
          {
            tr: "C",
          },
          {
            tr: "D",
          },
          {
            tr: "B1",
          },
          {
            tr: "K",
          },
        ],
        answer: 1,
        hint: {
          tr: "Kökteki tablo ve kollajen görevini birlikte oku.",
        },
        explanation: {
          tr: "Kökteki tablo ve kollajen görevini birlikte oku. Skorbüt eşlemesi C’ye aittir; C kollajen yapımına katkıyla ilişkilidir. Bu bir okul eşleştirmesidir; bir kişiye tek belirtiyle tanı veya doz vermez.",
        },
        skill: "f026bc-vitaminler",
        guidance: {
          knowledge: [
            "İşlev ve eksiklik tabloları kimlik eşleştirmesi için birlikte kullanılabilir.",
          ],
          strategy:
            "Aranan görev ipucunu ve hastalık eşleşmesini aynı vitamin kaydında birleştir; yalnız tabloda birlikte desteklenen adı seç.",
          steps: [
            "Kökteki tablo ve kollajen görevini birlikte oku.",
            "Skorbüt eşlemesi C’ye aittir; C kollajen yapımına katkıyla ilişkilidir.",
            "Bu bir okul eşleştirmesidir; bir kişiye tek belirtiyle tanı veya doz vermez.",
          ],
          optionReasons: [
            "Tabloda B3–pellagra yazılıdır; skorbüt değildir.",
            "Doğru. C hem verilen skorbüt eşlemesi hem kollajen göreviyle uyumludur.",
            "D mineral dengesiyle ilişkilidir; tabloda skorbütC’ye bağlanmıştır.",
            "Tabloda B1–beriberi yazılıdır; skorbüt değildir.",
            "K pıhtılaşma proteinleriyle ilişkilidir; skorbüt eşlemesi değildir.",
          ],
          commonError:
            "B1’in tabloda beriberiyle eşleştirildiğini görmezden gelip onu skorbüt–kollajen kaydına yerleştirmek.",
          check: "Verilen eşlemeC–skorbüt; görevkolajen desteğidir.",
        },
      },
      {
        id: "f026bc-vitaminler-18",
        prompt: {
          tr: "B12 depolanmasını yalnız sonlu bir öğretim stok hesabında düşünelim. Başlangıç 18 stok birimi var; her adım 3 birim kullanılıyor,4 adımda giriş ve başka çıkış yok. Son stok nedir; bu hesap çözünürlük grubunu değiştirir mi?",
        },
        options: [
          {
            tr: "12; evet, yağda çözünür olur",
          },
          {
            tr: "6; evet, protein olur",
          },
          {
            tr: "6; hayır, B12 suda çözünen kalır",
          },
          {
            tr: "0; suda çözünen hiç depolanamaz",
          },
          {
            tr: "18; depolanırsa kullanılamaz",
          },
        ],
        answer: 2,
        hint: {
          tr: "Dört adımda kullanılan 4×3=12 birimdir.",
        },
        explanation: {
          tr: "Dört adımda kullanılan 4×3=12 birimdir. Son stok 18−12=6; stok varlığı çözünürlük ölçütü değildir. B12 suda çözünen kalır; bu keyfî stok gerçek kişide süre veya gereksinim ölçmez.",
        },
        skill: "f026bc-vitaminler",
        guidance: {
          knowledge: [
            "Depo miktarı ve kullanım ile çözünürlük sınıfı farklı özelliklerdir.",
          ],
          strategy:
            "Her adımdaki tüketimi adım sayısıyla birleştirip stoktan düş; sayısal depo bilançosuyla vitaminin çözünürlük sınıfını ayrı sorular olarak tut.",
          steps: [
            "Dört adımda kullanılan 4×3=12 birimdir.",
            "Son stok 18−12=6; stok varlığı çözünürlük ölçütü değildir.",
            "B12 suda çözünen kalır; bu keyfî stok gerçek kişide süre veya gereksinim ölçmez.",
          ],
          optionReasons: [
            "Kullanılan 12’yi kalan sayar ve depo nedeniyle grubu yanlış değiştirir.",
            "6 hesabı doğru olsa da vitaminin protein olduğu sonucu çıkmaz.",
            "Doğru. Stok 6 olur; B12’nin çözünürlük sınıfı değişmez.",
            "B12 depo istisnasını reddedip verilmiş stok 18’i yok sayar.",
            "Depolanabilmenin kullanımı engellediğini varsayar; her adım 3 kullanım verilmiştir.",
          ],
          commonError:
            "Kullanılan 12’yi kalan sayar ve depo nedeniyle grubu yanlış değiştirir.",
          check: "6 kalan+12 kullanılan=18 başlangıç.",
        },
      },
      {
        id: "f026bc-vitaminler-19",
        prompt: {
          tr: "İki insan bağırsak emilimi öğretim modelinde aynı 80 birim D vitamini bulunuyor. X koşulunda emilen oran%25, Y’de%50 olarak verilmiş; bu oranlar evrensel değildir. Emilen Y/X oranı ve iki örneğin başlangıç vitamin miktarı ilişkisi nedir?",
        },
        options: [
          {
            tr: "0,5; başlangıçlar eşit",
          },
          {
            tr: "1; başlangıçlar eşit",
          },
          {
            tr: "2; Y’nin başlangıcı iki kat",
          },
          {
            tr: "2; başlangıçlar eşit",
          },
          {
            tr: "4; X’in başlangıcı daha çok",
          },
        ],
        answer: 3,
        hint: {
          tr: "X emilimi 80×0,25=20, Y emilimi 80×0,50=40 birimdir.",
        },
        explanation: {
          tr: "X emilimi 80×0,25=20, Y emilimi 80×0,50=40 birimdir. EmilenY/X=40/20=2. Başlangıç miktarları 80 ve 80 eşit kalır; emilim oranı ile besinde bulunan miktarı ayır.",
        },
        skill: "f026bc-vitaminler",
        guidance: {
          knowledge: [
            "Besindeki miktar, emilen oran ve emilen miktar ayrı niceliklerdir.",
          ],
          strategy:
            "İki emilen miktarı kendi yüzdesiyle hesapla; Y/X oranında ortak başlangıcın nasıl sadeleştiğini ve ilk miktarların eşitliğini denetle.",
          steps: [
            "X emilimi 80×0,25=20, Y emilimi 80×0,50=40 birimdir.",
            "EmilenY/X=40/20=2.",
            "Başlangıç miktarları 80 ve 80 eşit kalır; emilim oranı ile besinde bulunan miktarı ayır.",
          ],
          optionReasons: [
            "İstenenY/X yerineX/Y=20/40 hesaplar.",
            "Başlangıç eşliğini emilen miktar eşliği sanır; oranlar farklıdır.",
            "Emilimdeki iki katlığı başlangıç miktarına taşır; ikisi 80’dir.",
            "Doğru. 40/20=2; iki başlangıç 80 olarak verilmiştir.",
            "40/10 gibi verilmeyen X emilimi kullanır; başlangıç üstünlüğü de yoktur.",
          ],
          commonError:
            "Başlangıç eşliğini emilen miktar eşliği sanır; oranlar farklıdır.",
          check: "X20≤80, Y40≤80; Y/X2.",
        },
      },
      {
        id: "f026bc-vitaminler-20",
        prompt: {
          tr: "A ve B adlı iki model tepkime, uygun protein enzimlerini içeriyor. Eksik yardımcılar eklendiğinde yalnızB1 kökenli X, A’yı 0’dan 10’a; yalnızB12 kökenli Y, B’yi 0’dan 8’e çıkarıyor. X, B’yi; Y, A’yı kurtarmıyor. Hangi sonuç uygundur?",
        },
        options: [
          {
            tr: "B grubundaki bütün vitaminler aynı yardımcıdır.",
          },
          {
            tr: "X veY protein enzimlerin tamamen aynısıdır.",
          },
          {
            tr: "Bu koşullarda X ile Y farklı yardımcı gereksinimlerini karşılar; rastgele birbirinin yerine geçmez.",
          },
          {
            tr: "X’in 10 ürünü, B1’in 10 enerji birimi verdiğini kanıtlar.",
          },
          {
            tr: "A veB’nin son ürünü mutlaka aynı moleküldür.",
          },
        ],
        answer: 2,
        hint: {
          tr: "İki kurtarma örüntüsünü ayrı oku: X→A, Y→B.",
        },
        explanation: {
          tr: "İki kurtarma örüntüsünü ayrı oku: X→A, Y→B. Çapraz eklemelerde kurtarma yoktur; bu düzende yardımcılar eşdeğer değildir. Ortak B grubu üyeliği bütün işlevlerde değiştirilebilirlik veya yakıt rolü oluşturmaz.",
        },
        skill: "f026bc-vitaminler",
        guidance: {
          knowledge: [
            "Vitamin kökenli yardımcılar belirli tepkimelerde farklı görevler üstlenebilir.",
          ],
          strategy:
            "Yardımcıları satır, tepkimeleri sütun yapan bir kurtarma tablosu kur; olumlu ve olumsuz çapraz sonuçları birlikte kullanarak görev eşleşmesini sınırla.",
          steps: [
            "İki kurtarma örüntüsünü ayrı oku: X→A, Y→B.",
            "Çapraz eklemelerde kurtarma yoktur; bu düzende yardımcılar eşdeğer değildir.",
            "Ortak B grubu üyeliği bütün işlevlerde değiştirilebilirlik veya yakıt rolü oluşturmaz.",
          ],
          optionReasons: [
            "Çapraz kurtarma olmaması aynıyardımcı iddiasına karşı veridir.",
            "Kökte yardımcılarla protein enzimler ayrı bileşenlerdir.",
            "Doğru. Verilen iki ayrı ve çapraz olmayan kurtarma örüntüsünü korur.",
            "Ürün adedi enerji ölçümü değildir; yardımcı yakıtla eşitlenmez.",
            "Kurtarma miktarları ürünlerin kimyasal özdeşliğini vermez.",
          ],
          commonError:
            "Yardımcıların ikisi de vitamin kökenli diye çapraz kurtarma olmadığı hâlde her iki tepkimede birbirlerinin yerine geçebileceklerini sanmak.",
          check: "X→A10, B0; Y→A0, B8 örüntüsü eşdeğerlik göstermez.",
        },
      },
    ],
  },
];
export const forge026BiologyCTopics: Record<string, string> = {
  "proteinler-ileri": "detail-7",
  "enzimler-ileri": "detail-8",
  "vitaminler-ileri": "detail-9",
};
