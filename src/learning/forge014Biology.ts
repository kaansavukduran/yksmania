import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

/** Selection model, not an ecosystem census or a universal species test. */
export function pondSelection(
  count: number,
  otherSpecies: boolean,
  abiotic: boolean,
) {
  if (!Number.isInteger(count) || count < 1 || count > 20)
    throw new RangeError("POND_COUNT");
  const biological = otherSpecies
    ? "Komünite"
    : count === 1
      ? "Organizma"
      : "Popülasyon";
  return {
    biological,
    level: abiotic ? "Ekosistem kesiti" : biological,
    species: otherSpecies ? 3 : 1,
    frogs: count,
    abiotic,
  };
}

export type PyramidKind = "energy" | "number" | "biomass";
export function pyramidSnapshot(kind: PyramidKind, efficiency: number) {
  if (
    !["energy", "number", "biomass"].includes(kind) ||
    !Number.isFinite(efficiency) ||
    efficiency < 5 ||
    efficiency > 30
  )
    throw new RangeError("PYRAMID_MODEL");
  const fraction = efficiency / 100;
  const firstTransfer = 10000 * fraction;
  const values =
    kind === "energy"
      ? [10000, firstTransfer, firstTransfer * fraction]
      : kind === "number"
        ? [1, 100, 10]
        : [4, 20, 5];
  return {
    kind,
    values,
    unit:
      kind === "energy"
        ? "J/m²/yıl"
        : kind === "number"
          ? "birey"
          : "g kuru kütle/m²",
    inverted: values[0] < values[1],
  };
}

export const foodNodes = [
  "grass",
  "grasshopper",
  "frog",
  "mouse",
  "hawk",
] as const;
export type FoodNode = (typeof foodNodes)[number];
export const foodLabels: Record<FoodNode, string> = {
  grass: "Çayır bitkisi",
  grasshopper: "Çekirge",
  frog: "Kurbağa",
  mouse: "Fare",
  hawk: "Şahin",
};
export const foodEdges: readonly (readonly [FoodNode, FoodNode])[] = [
  ["grass", "grasshopper"],
  ["grasshopper", "frog"],
  ["frog", "hawk"],
  ["grass", "mouse"],
  ["mouse", "hawk"],
];
export function foodWebSnapshot(selected: FoodNode, removeFrog: boolean) {
  if (!foodNodes.includes(selected)) throw new RangeError("FOOD_NODE");
  const edges = foodEdges.filter(
    ([a, b]) => !removeFrog || (a !== "frog" && b !== "frog"),
  );
  const levels = (node: FoodNode): number[] => {
    if (removeFrog && node === "frog") return [];
    if (node === "grass") return [1];
    return [
      ...new Set(
        edges
          .filter(([, b]) => b === node)
          .flatMap(([a]) => levels(a).map((n) => n + 1)),
      ),
    ].sort((a, b) => a - b);
  };
  return {
    edges,
    levels: levels(selected),
    food: edges.filter(([, b]) => b === selected).map(([a]) => a),
    predators: edges.filter(([a]) => a === selected).map(([, b]) => b),
    removed: removeFrog && selected === "frog",
  };
}

export type CycleKind = "water" | "carbon" | "nitrogen";
export const cycleLabels: Record<CycleKind, string> = {
  water: "Su",
  carbon: "Karbon",
  nitrogen: "Azot",
};
type Transfer = { id: string; label: string; from: string; to: string };
export const cycleProcesses: Record<CycleKind, Transfer[]> = {
  water: [
    {
      id: "evaporation",
      label: "Yüzeyden buharlaşma",
      from: "surface",
      to: "air",
    },
    { id: "rain", label: "Atmosferden yağış", from: "air", to: "surface" },
    {
      id: "infiltration",
      label: "Toprağa sızma",
      from: "surface",
      to: "ground",
    },
    {
      id: "transpiration",
      label: "Kök alımı ve bitki terlemesi yolu",
      from: "ground",
      to: "air",
    },
  ],
  carbon: [
    {
      id: "fixCarbon",
      label: "Ototrof karbon bağlama",
      from: "co2",
      to: "organic",
    },
    {
      id: "respiration",
      label: "Organik karbonun solunumu",
      from: "organic",
      to: "co2",
    },
    {
      id: "combustion",
      label: "Fosil karbonun yanması",
      from: "fossil",
      to: "co2",
    },
  ],
  nitrogen: [
    {
      id: "fixNitrogen",
      label: "Biyolojik N₂ fiksasyonu",
      from: "n2",
      to: "nh4",
    },
    {
      id: "nitrify1",
      label: "Nitrifikasyon: amonyum → nitrit",
      from: "nh4",
      to: "no2",
    },
    {
      id: "nitrify2",
      label: "Nitrifikasyon: nitrit → nitrat",
      from: "no2",
      to: "no3",
    },
    {
      id: "denitrify",
      label: "Denitrifikasyon: nitrat → N₂",
      from: "no3",
      to: "n2",
    },
    {
      id: "assimilate",
      label: "Nitratın organik yapıya asimilasyonu",
      from: "no3",
      to: "organic",
    },
    {
      id: "ammonify",
      label: "Organik azotun amonifikasyonu",
      from: "organic",
      to: "nh4",
    },
  ],
};
export const reservoirLabels: Record<string, string> = {
  surface: "Yüzey suyu",
  air: "Atmosferde su",
  ground: "Toprak ve yeraltı suyu",
  co2: "CO₂ deposu",
  organic: "Organik madde",
  fossil: "Fosil karbon",
  n2: "Atmosfer N₂",
  nh4: "NH₄⁺",
  no2: "NO₂⁻",
  no3: "NO₃⁻",
};
const initialReservoirs: Record<CycleKind, Record<string, number>> = {
  water: { surface: 50, air: 20, ground: 30 },
  carbon: { co2: 60, organic: 30, fossil: 10 },
  nitrogen: { n2: 50, nh4: 20, no2: 10, no3: 10, organic: 10 },
};
export function cycleTransfer(
  cycle: CycleKind,
  process: string,
  requested: number,
) {
  if (
    !(cycle in initialReservoirs) ||
    !Number.isFinite(requested) ||
    requested < 0 ||
    requested > 20
  )
    throw new RangeError("CYCLE_INPUT");
  const step = cycleProcesses[cycle].find((p) => p.id === process);
  if (!step) throw new RangeError("CYCLE_PROCESS");
  const before = { ...initialReservoirs[cycle] },
    after = { ...before };
  const moved = Math.min(requested, before[step.from]);
  after[step.from] -= moved;
  after[step.to] += moved;
  return {
    before,
    after,
    step,
    moved,
    total: Object.values(after).reduce((a, b) => a + b, 0),
    limited: moved < requested,
  };
}

export type LakeIntervention = "none" | "litter" | "nutrient";
const lakeStages = [
  "Besleyici girişi",
  "Alg üretiminde artış",
  "Ölü organik yükte artış",
  "Ayrıştırıcı solunumunda artış",
  "Oksijen azalma baskısı",
];
export function lakeSnapshot(stage: number, intervention: LakeIntervention) {
  if (
    !Number.isInteger(stage) ||
    stage < 0 ||
    stage > 4 ||
    !["none", "litter", "nutrient"].includes(intervention)
  )
    throw new RangeError("LAKE_MODEL");
  return {
    stage,
    label: lakeStages[stage],
    incoming: intervention !== "nutrient",
    legacy: stage >= 2,
    oxygenIndex: [5, 5, 4, 2, 1][stage],
    algae: stage === 0 ? 0 : stage === 1 ? 5 : stage === 2 ? 12 : 4,
  };
}

export function resourceBudget(renewal: number, use: number, years: number) {
  if (
    ![renewal, use, years].every(Number.isInteger) ||
    renewal < 0 ||
    renewal > 40 ||
    use < 0 ||
    use > 60 ||
    years < 1 ||
    years > 5
  )
    throw new RangeError("RESOURCE_BUDGET");
  const stocks = [100];
  let unmet = 0;
  for (let i = 0; i < years; i++) {
    const available = stocks[i] + renewal;
    unmet += Math.max(0, use - available);
    stocks.push(Math.min(100, Math.max(0, available - use)));
  }
  return {
    stocks,
    final: stocks[stocks.length - 1],
    net: renewal - use,
    unmet,
  };
}

type UnitData = {
  id: string;
  topic: string;
  title: string;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  questions: Question[];
};

const data: UnitData[] = [
  {
    id: "ekoloji-giris",
    topic: "detail-31",
    title: "Ekolojiye giriş: canlıyı ilişkileriyle tanı",
    objectives: [
      "Organizma, popülasyon, komünite ve ekosistemi seçilen bileşenlerden ayır.",
      "Habitatı, nişi ve abiyotik etkenleri aynı vaka üzerinde ilişkilendir.",
      "Beslenme rolünü hücre tipiyle karıştırmadan kanıta göre belirle.",
    ],
    sections: [
      {
        title: "Önce araştırılan birimi seç",
        paragraphs: [
          "Ekoloji, canlıların birbirleriyle ve fiziksel-kimyasal çevreleriyle ilişkilerini inceler. Gölette tek bir kurbağanın su kaybını ölçmek ile bütün göletin azot bütçesini ölçmek aynı araştırma düzeyi değildir. Soruyu çözmeden önce hangi canlılar, hangi alan, hangi zaman ve hangi çevresel değişkenlerin incelendiğini işaretle. Çizimin büyük olması, onun mutlaka ekosistem düzeyinde olduğu anlamına gelmez.",
          "Organizma tek bir bireydir; tür ise bir sınıflandırma birimidir. Aynı türün bireyleri renk, büyüklük veya yaş bakımından farklı olabilir. Okulda kullanılan çiftleşip verimli döl oluşturma ölçütü eşeyli üreyen canlıların bir kısmında yararlıdır; fosillere, eşeysiz üreyen canlılara veya bütün tür sorunlarına uygulanabilen evrensel bir deney değildir.",
        ],
      },
      {
        title: "Popülasyon için tür, yer ve zamanı birlikte denetle",
        paragraphs: [
          "Bir gölde aynı dönemde yaşayan aynı türden saz kurbağaları bir popülasyon oluşturur. Göletteki bütün kurbağalar ifadesi, birden fazla tür içeriyorsa tek popülasyon demek değildir. Aynı türün iki uzak ve bağlantısız göldeki gruplarını araştırmanın ölçeğini belirtmeden tek yerel popülasyon saymak da yanıltır. Sayılan bireylerin hangi alana ve tarihe ait olduğunu koru.",
          "Popülasyonun yaş dağılımı, birey sayısı ve yoğunluğu incelenebilir. Yoğunluk birey sayısının alan veya hacme oranıdır: aynı yirmi birey daha küçük alana dağılırsa yoğunluk artar, birey sayısı artmış olmaz. Cinsiyet veya yaş farkı tek başına farklı tür kanıtı değildir. Bir sayımın eksik olması da o türün bölgede hiç bulunmadığını otomatik olarak göstermez.",
        ],
      },
      {
        title:
          "Komünite canlıları, ekosistem ilişkili cansız çevreyi de kapsar",
        paragraphs: [
          "Kurbağa, alg, su böceği ve bakterilerin aynı göldeki popülasyonlarını birlikte ele aldığında komüniteyi incelersin. Su sıcaklığı, çözünmüş oksijen, ışık ve mineral gibi abiyotik bileşenleri canlılarla etkileşimleri içinde eklediğinde ekosistem düzeyine geçersin. Su içen bir hayvanın fotoğrafında suyun görünmesi, araştırmanın gerçekten bütün ekosistemi ölçtüğünü kanıtlamaz; belirleyici olan sorunun kapsamıdır.",
          "Bir akvaryum da bir orman da uygun sınırlarla ekosistem olarak incelenebilir. Ekosistemin sınırı çalışmaya göre çizilir; dışarıdan ışık, su, canlı veya madde girişi olabilir. Biyom, geniş iklim ve karakteristik yaşam topluluklarıyla tanımlanan büyük bir bölge tipidir. Biyosfer ise Dünya üzerindeki yaşam alanları ve ekosistemlerin bütününü kapsayan en geniş ölçektir.",
        ],
      },
      {
        title: "Habitat adres, niş ilişkiler ve gereksinimler bütünüdür",
        paragraphs: [
          "Habitat, organizmanın yaşadığı ve yaşam döngüsünü sürdürebildiği alandır. Niş; kullandığı kaynakları, etkin olduğu zamanı, çevresel gereksinimlerini ve başka canlılarla ilişkilerini de kapsar. Aynı ağaç üzerinde iki kuş türünün yaşaması ortak habitat örneği olabilir; biri gövdedeki böcekleri, diğeri tohumları tüketiyorsa kaynak kullanımının bir bölümü farklıdır. Biyotop ise bir komünitenin yer aldığı yaşam alanı için kullanılan terimdir. Böylece bir sazlığı tek kuş türünün yaşadığı yer olarak sorarsan habitat, birlikte yaşayan topluluğun alanı olarak sorarsan biyotop bağlamında incelersin; niş kaynak kullanımı ve etkileşim bilgisidir.",
          "Nişi yalnız meslek veya tek bir besinle sınırlamak öğretimi daraltır. Kuşun yuvalama yeri, avlandığı saatler ve sıcaklığa toleransı da önemlidir. Nişlerin örtüşmesi rekabet olasılığı doğurabilir; her gözlemde zorunlu olarak bir türün yok olacağını söylemez. Rekabeti değerlendirmek için kaynağın gerçekten sınırlı olup olmadığı ve başka etkileşimler de bilinmelidir.",
        ],
      },
      {
        title: "Ekoton bir geçiştir; her yerde aynı sonucu veren yasa değildir",
        paragraphs: [
          "Orman ile çayırın geçiş kuşağı, iki topluluğun özelliklerini taşıyan bir ekoton oluşturabilir. İki taraftan türlerin yanında geçişe özgü türler bulunması yerel tür zenginliğini artırabilir. Bununla birlikte her ekotonda çeşitlilik kesin fazladır veya bütün türlerin birey sayısı azdır önermeleri evrensel değildir. Alan büyüklüğü, örnekleme ve insan etkisi sonucu değiştirir.",
          "Bir çizelgede geçiş kuşağında on iki, ormanda sekiz tür sayılmışsa yalnız aynı örnekleme koşulları altında ölçülen zenginliği karşılaştır. Bu veri bütün Dünya için bir kural, daha yüksek birey sayısı veya daha hızlı madde döngüsü kanıtlamaz. Ekoton sorularında gözlenen sonuç ile genellenen iddianın kapsamını ayrı cümlelerle yazmak hatayı azaltır.",
        ],
      },
      {
        title: "Abiyotik etkenler birlikte sınır koyar",
        paragraphs: [
          "Işığın şiddeti, süresi ve dalga boyu; sıcaklık, su, pH, tuzluluk, toprağın yapısı ve mineral bulunurluğu canlıların dağılımını etkiler. Işık yalnız fotosentezi değil, davranış ve mevsimsel zamanlamayı da etkileyebilir. Enzimler sıcaklık ve pH değişimine farklı aralıklarda yanıt verir; bütün türler ve bütün enzimler için tek bir ideal çevre değeri yoktur. Çok katlı bir ormanda üst örtü ışığın bir bölümünü tuttuğundan alt katmanın ışık, nem ve sıcaklık koşulları farklılaşabilir. Yıl boyunca sıcak ve yağışlı bir biyomda bile alt katmanda ışık sınırlı olabilir; bitki çokluğu ışık rekabetinin önemsizliği demek değildir.",
          "Bir bitkinin büyümesi için ışık yeterliyken su sınırlı olabilir. Işığı artırıp büyüme değişmediğinde ışığın hiçbir rolü olmadığı sonucu çıkmaz; başka etken sınırlandırıyor olabilir. Kontrollü karşılaştırmada tek değişkeni değiştirmek, tekrar yapmak ve başlangıç koşullarını eşitlemek önemlidir. Doğal ortam korelasyonu tek başına hangi etkenin neden olduğunu ayırmaz.",
        ],
      },
      {
        title:
          "Üretici olmak enerji kaynağı ile karbon kaynağını birlikte düşünmektir",
        paragraphs: [
          "Ototroflar, inorganik karbonu organik bileşiklere bağlayabilir. Fotoototroflar bu işlemde ışık enerjisinden, kemoototroflar bazı inorganik maddelerin oksidasyonundan sağlanan kimyasal enerjiden yararlanır. Bu yüzden her üretici kloroplastlıdır, her üretici Güneş ışığına doğrudan muhtaçtır veya üretici enerji yaratır demek yanlıştır. Enerji dönüştürülür; karbon atomları yeniden düzenlenir.",
          "Bitkiler, algler ve bazı bakteriler fotoototrof olabilir; bazı bakteri ve arkeler kemoototroftur. Bir grubun bazı üyelerindeki özelliği bütün üyelerine yayma. Yeşil bitkiler de solunum yapar. Fotosentez yapabilmek bütün besin gereksinimlerinin her koşulda karşılandığını göstermez; mineral, su ve uygun ortam gereksinimi devam eder.",
        ],
      },
      {
        title: "Tüketim, ayrıştırma ve karma beslenmeyi kanıtla ayır",
        paragraphs: [
          "Heterotroflar organik maddeleri dışarıdan alır. Otçul, etçil ve omnivor ayrımı yenilen besinin kaynağına dayanır. Omnivor, hem bitkisel hem hayvansal besin tüketir; kendi başına fotosentez yapan canlı demek değildir. Bazı öglena türleri uygun koşullarda ototrof ve heterotrof yollar kullanabilir; bu karma beslenme, yalnız iki farklı besini yemekten farklı bir ölçüttür.",
          "Saprotroflar ölü organik maddeye enzim salgılar, oluşan küçük organik molekülleri alır; metabolizmalarıyla mineralleşmeye katkı sağlar. Bazı bakteriler ve mantarlar bu roldedir. Ayrıştırıcı da enerji ve organik madde kullanan bir heterotroftur; bütün bakteriler ayrıştırıcı değildir. Solucanın atığı parçalamasıyla bakterinin hücre dışı sindirimi aynı basamak değildir; ikisi detritus yolunda bağlantı kurabilir.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı göle dört farklı ölçekten bak",
        prompt:
          "Bir öğrenci tek kurbağayı, aynı türün 20 kurbağasını, bütün canlı topluluklarını ve son olarak bunlarla etkileşen su-pH-ışığı sırasıyla inceliyor. Düzeyleri adlandır.",
        strategy:
          "Birey, aynı tür, farklı türler ve cansız çevre eşiğini sırayla ara.",
        steps: [
          {
            label: "Bireyi bul",
            explanation: "Tek kurbağa kendi başına bir organizmadır.",
            expression: "1 birey → organizma",
          },
          {
            label: "Tür sınırını kur",
            explanation:
              "Aynı türün aynı yer ve zamandaki 20 bireyi popülasyondur; farklı popülasyonlar komüniteyi oluşturur.",
            expression: "aynı tür → popülasyon; çok tür → komünite",
          },
          {
            label: "Çevreyi ilişkilendir",
            explanation:
              "Canlı topluluklarıyla etkileşen su, pH ve ışık birlikte ekosistem kapsamıdır.",
            expression: "komünite + abiyotik etkileşimler → ekosistem",
          },
        ],
        answer: "Organizma → popülasyon → komünite → ekosistem.",
        check: "Komünite listesine suyu canlıymış gibi katmadığını denetle.",
        pitfall: "Tek bir türü tek bireyle eşitleme.",
      },
      {
        title: "Yoğunluk ile sayıyı ayır",
        prompt:
          "Aynı türden 20 bitki A parselinde 5 m², B parselinde 10 m² alana yayılıyor. Birey sayısı ve yoğunluğu karşılaştır.",
        strategy:
          "Önce sayıyı yaz, sonra her alanın birim alan başına değerini bul.",
        steps: [
          {
            label: "Sayıyı koru",
            explanation: "Her parselde yirmi birey bulunduğu verilmiştir.",
            expression: "N_A=N_B=20",
          },
          {
            label: "A parselini böl",
            explanation: "Yirmi bireyi beş metrekareye böl.",
            expression: "20/5=4 birey/m²",
          },
          {
            label: "B parselini karşılaştır",
            explanation:
              "Yirmiyi ona böl; sayılar eşit, yoğunluklar farklıdır.",
            expression: "20/10=2 birey/m²",
          },
        ],
        answer: "A yoğunluğu B’nin iki katı; birey sayıları eşittir.",
        check: "Yoğunluk sonucuna birey/m² birimini ekle.",
        pitfall: "Daha yüksek yoğunluğu daha fazla birey diye yorumlama.",
      },
      {
        title: "Aynı ağaçta farklı kaynak kullanımı",
        prompt:
          "Kuş K gövdedeki böcekleri sabah, kuş L ağacın tohumlarını öğleden sonra tüketiyor. Ortak ve farklı özellikleri ayır.",
        strategy:
          "Mekân bilgisini habitat, kaynak ve zaman bilgisini niş içinde değerlendir.",
        steps: [
          {
            label: "Mekânı işaretle",
            explanation: "İki tür aynı ağaç çevresini kullanıyor.",
            expression: "ortak habitat",
          },
          {
            label: "Kaynağı ayır",
            explanation: "Böcek ve tohum farklı besin kaynaklarıdır.",
            expression: "kaynak kullanımı farklı",
          },
          {
            label: "Zamanı ekle",
            explanation:
              "Sabah ve öğleden sonra etkinlik, nişin bir başka boyutudur.",
            expression: "zaman boyutu farklı",
          },
        ],
        answer: "Habitat örtüşür; gözlenen niş boyutları farklılaşır.",
        check:
          "Veri bütün nişlerin tamamen ayrıldığını veya rekabetin imkânsız olduğunu söylemez.",
        pitfall: "Habitat aynıysa niş tamamen aynıdır deme.",
      },
      {
        title: "Işık artınca büyüme neden değişmedi?",
        prompt:
          "İki aynı bitki grubunda su çok az ve eşit; yalnız ışık artırılıyor. Büyüme değişmiyor. Işık gereksiz midir?",
        strategy:
          "Sonucu yalnız sınanan koşulda yorumla ve alternatif sınırlayıcıyı ayır.",
        steps: [
          {
            label: "Koşulu yaz",
            explanation: "Her grupta su az tutulmuştur.",
            expression: "olası sınırlayıcı: su",
          },
          {
            label: "Müdahaleyi izle",
            explanation:
              "Değiştirilen değişken ışıktır; büyümede fark bulunmamıştır.",
            expression: "ışık artışı → bu koşulda fark yok",
          },
          {
            label: "Yeni deneyi tasarla",
            explanation:
              "Suyu yeterli düzeyde eşitleyip ışık düzeylerini yeniden karşılaştır.",
            expression: "su kontrolü + ışık karşılaştırması",
          },
        ],
        answer:
          "Işığın gereksizliği kanıtlanmaz; su sınırlaması ışık yanıtını maskeleyebilir.",
        check: "Ölçülmeyen bütün etkenlerin nedenini kesinleştirme.",
        pitfall: "Sonuç yokluğunu etkinin her koşulda yokluğu sayma.",
      },
    ],
    recall: [
      {
        prompt: "Komünite ile ekosistem arasındaki ayırıcı nedir?",
        answer:
          "Komünite canlı popülasyonlarıdır; ekosistem bunlarla etkileşen abiyotik çevreyi de kapsar.",
      },
      {
        prompt: "Omnivor ile hem ototrof hem heterotrof aynı mıdır?",
        answer:
          "Hayır. İlki bitkisel/hayvansal organik besin tüketimi, ikincisi organik madde üretme ve dışarıdan alma yollarının birlikte bulunmasıdır.",
      },
      {
        prompt: "Bir üretici ışık kullanmadan organik karbon bağlayabilir mi?",
        answer:
          "Evet; kemoototrof canlılar uygun inorganik oksidasyonlardan enerji sağlayabilir.",
      },
      {
        prompt: "Her ekotonun tür zenginliği kesin yüksek midir?",
        answer:
          "Hayır. Geçiş etkisi zenginliği artırabilir; sonuç örnekleme, alan ve çevreye bağlıdır.",
      },
    ],
    questions: [
      {
        id: "f014-bio-ekoloji-giris-1",
        prompt: {
          tr: "Aynı gölette aynı ay içinde yaşayan aynı türe ait 30 kurbağa hangi ekolojik birimi oluşturur?",
        },
        options: [
          {
            tr: "Popülasyon",
          },
          {
            tr: "Biyom",
          },
          {
            tr: "Biyosfer",
          },
          {
            tr: "Otuz ayrı tür",
          },
          {
            tr: "Su ve mineral içeren ekosistemin tamamı",
          },
        ],
        answer: 0,
        hint: {
          tr: "Tür, yer ve zaman koşullarını birlikte ara.",
        },
        explanation: {
          tr: "Aynı türün belirli yer ve zamandaki bireyleri popülasyondur. Sayının otuz olması tür sayısını otuz yapmaz; cansız bileşenler verilmediği için bütün ekosistem tanımlanmış değildir.",
        },
        skill: "f014-ekoloji-giris-1",
      },
      {
        id: "f014-bio-ekoloji-giris-2",
        prompt: {
          tr: "Bir göldeki alg, balık ve bakteri popülasyonları birlikte inceleniyor; sıcaklık, su ve ışık araştırma kapsamına alınmıyor. Seçilen canlı topluluklarının adı nedir?",
        },
        options: [
          {
            tr: "Tek popülasyon",
          },
          {
            tr: "Komünite",
          },
          {
            tr: "Abiyotik faktör",
          },
          {
            tr: "Tek organizma",
          },
          {
            tr: "Yalnız habitatın kimyası",
          },
        ],
        answer: 1,
        hint: {
          tr: "Birden fazla tür var; kapsam canlılarla sınırlı.",
        },
        explanation: {
          tr: "Farklı türlere ait popülasyonların aynı alandaki topluluğu komünitedir. Fiziksel-kimyasal çevre ile etkileşimleri kapsama eklenirse ekosistem düzeyi incelenebilir.",
        },
        skill: "f014-ekoloji-giris-2",
      },
      {
        id: "f014-bio-ekoloji-giris-3",
        prompt: {
          tr: "Bir kuşun yaşadığı sazlık ile sazlıkta yediği böcekler, üreme zamanı ve etkin olduğu saatler sırasıyla hangi kavramlarla ilişkilidir?",
        },
        options: [
          {
            tr: "Niş ve atom numarası",
          },
          {
            tr: "Popülasyon ve türün tek bireyi",
          },
          {
            tr: "Habitat ve ekolojik niş",
          },
          {
            tr: "Biyosfer ve yalnız sıcaklık",
          },
          {
            tr: "İki ayrı habitat tanımı",
          },
        ],
        answer: 2,
        hint: {
          tr: "Yaşanan yer ile kaynak/ilişki boyutlarını ayır.",
        },
        explanation: {
          tr: "Sazlık yaşam alanı, yani habitat bilgisidir. Besin, üreme ve etkinlik zamanı nişin boyutlarıdır; niş yalnız bulunduğu yerin başka bir adı değildir.",
        },
        skill: "f014-ekoloji-giris-3",
      },
      {
        id: "f014-bio-ekoloji-giris-4",
        prompt: {
          tr: "İnorganik maddelerin oksidasyonundan enerji sağlayıp CO₂’den organik madde üreten bir bakteri hangi beslenme özelliğini gösterir?",
        },
        options: [
          {
            tr: "Zorunlu fotoototrofluk",
          },
          {
            tr: "Yalnız otçulluk",
          },
          {
            tr: "Yalnız saprotrofluk",
          },
          {
            tr: "Kemoototrofluk",
          },
          {
            tr: "Omnivorluk",
          },
        ],
        answer: 3,
        hint: {
          tr: "Enerji kaynağı ışık mı, kimyasal oksidasyon mu?",
        },
        explanation: {
          tr: "İnorganik oksidasyondan enerji ve inorganik karbondan organik madde üretimi kemoototroflukla uyumludur. Bakteri olması onu otomatik ayrıştırıcı veya zorunlu heterotrof yapmaz.",
        },
        skill: "f014-ekoloji-giris-4",
      },
      {
        id: "f014-bio-ekoloji-giris-5",
        prompt: {
          tr: "Küf mantarı ölü besine dışarıdan enzim salgılıyor, oluşan küçük organik molekülleri alıyor. Bu gözlem hangi rolü destekler?",
        },
        options: [
          {
            tr: "İnorganik karbondan zorunlu fotosentez",
          },
          {
            tr: "Işık enerjisini doğrudan kullanma",
          },
          {
            tr: "Bütün mantarların üretici olması",
          },
          {
            tr: "Enerjiyi yoktan üretme",
          },
          {
            tr: "Saprotrof ayrıştırıcılık",
          },
        ],
        answer: 4,
        hint: {
          tr: "Sindirim enzimlerinin nerede etkili olduğunu izle.",
        },
        explanation: {
          tr: "Ölü organik maddede hücre dışı sindirim ve çözünmüş ürünlerin alınması saprotrofluğu destekler. Bu canlı heterotroftur; mineral döngüsüne katkısı organik maddeyi kendi başına üretici gibi sentezlediği anlamına gelmez.",
        },
        skill: "f014-ekoloji-giris-5",
      },
      {
        id: "f014-bio-ekoloji-giris-6",
        prompt: {
          tr: "Bir ayı hem meyve hem hayvan tüketiyor; fotosentez yaptığına ilişkin veri yok. Hangi tanım doğrudan desteklenir?",
        },
        options: [
          {
            tr: "Omnivor heterotrof",
          },
          {
            tr: "Hem fotoototrof hem kemoototrof",
          },
          {
            tr: "Yalnız mineral tüketen ototrof",
          },
          {
            tr: "Kloroplastlı üretici",
          },
          {
            tr: "İnorganik karbondan besin sentezleyen canlı",
          },
        ],
        answer: 0,
        hint: {
          tr: "İki organik besin kaynağını yemek, karbonu inorganikten bağlamak değildir.",
        },
        explanation: {
          tr: "Bitkisel ve hayvansal besinlerin tüketimi omnivorluktur. Hem ototrof hem heterotrof demek için organik madde üretme yolu da gösterilmelidir; meyve yemek fotosentez yapmak değildir.",
        },
        skill: "f014-ekoloji-giris-6",
      },
      {
        id: "f014-bio-ekoloji-giris-7",
        prompt: {
          tr: "Eşit yöntemle örneklenen bir ormanda 8, bitişiğindeki geçiş kuşağında 12 tür bulunuyor. Verinin sınırını aşmayan sonuç hangisidir?",
        },
        options: [
          {
            tr: "Her ekotonda birey sayısı kesin daha azdır",
          },
          {
            tr: "Bu örneklemede geçiş kuşağının tür zenginliği daha yüksektir",
          },
          {
            tr: "Bütün ekotonlarda madde döngüsü kesin daha hızlıdır",
          },
          {
            tr: "Geçiş kuşağında her türden daha çok birey vardır",
          },
          {
            tr: "Dünya üzerindeki bütün ekotonlar tam 12 tür içerir",
          },
        ],
        answer: 1,
        hint: {
          tr: "Ölçülen değişken tür sayısıdır; genellemenin alanını koru.",
        },
        explanation: {
          tr: "Veri yalnız bu iki örnek alanın tür zenginliğini karşılaştırır. Birey sayısı, madde döngüsü hızı veya bütün ekotonlar hakkında evrensel sonuç üretmek için yeterli değildir.",
        },
        skill: "f014-ekoloji-giris-7",
      },
      {
        id: "f014-bio-ekoloji-giris-8",
        prompt: {
          tr: "Aynı türün 24 bireyi A alanında 6 m², B alanında 12 m² alana dağılıyor. Doğru karşılaştırma hangisidir?",
        },
        options: [
          {
            tr: "A’da 6, B’de 12 birey vardır",
          },
          {
            tr: "B’nin yoğunluğu A’nın iki katıdır",
          },
          {
            tr: "A’da yoğunluk 4, B’de 2 birey/m²; birey sayıları eşittir",
          },
          {
            tr: "A ve B’nin yoğunlukları zorunlu eşittir",
          },
          {
            tr: "A’da yoğunluk 24, B’de 48 birey/m²’dir",
          },
        ],
        answer: 2,
        hint: {
          tr: "Yoğunluk için birey sayısını alana böl.",
        },
        explanation: {
          tr: "A:24/6=4; B:24/12=2 birey/m². Sayılar iki yerde de 24’tür; yoğunluk farkı alan farkından kaynaklanır ve yeni birey üretildiğini göstermez.",
        },
        skill: "f014-ekoloji-giris-8",
      },
      {
        id: "f014-bio-ekoloji-giris-9",
        prompt: {
          tr: "Birbiriyle karşılaştırılabilir iki bitki grubunda su çok az ve eşit tutuluyor; yalnız bir grupta ışık artırılıyor. Gruplar arasında büyüme farkı görülmüyor. Bu deneyden hangi sonuca kesin olarak ulaşılamaz?",
        },
        options: [
          {
            tr: "Sınanan koşulda büyüme farkı gözlenmediğine",
          },
          {
            tr: "Işığın deneyde değiştirilen etken olduğuna",
          },
          {
            tr: "Suyun her iki grupta az tutulduğuna",
          },
          {
            tr: "Işığın bu bitki için bütün koşullarda gereksiz olduğuna",
          },
          {
            tr: "Suyun yeterli tutulduğu yeni bir karşılaştırmanın yararlı olabileceğine",
          },
        ],
        answer: 3,
        hint: {
          tr: "Koşula bağlı sonuçtan evrensel hüküm çıkarma.",
        },
        explanation: {
          tr: "Su başka bir sınırlayıcı olabilir. Işık artışına bu koşulda yanıt olmaması ışığın bütün koşullarda gereksizliğini kanıtlamaz; diğer seçenekler verilen tasarımı veya uygun sonraki adımı ifade eder.",
        },
        skill: "f014-ekoloji-giris-9",
      },
      {
        id: "f014-bio-ekoloji-giris-10",
        prompt: {
          tr: "Araştırma listesinde kurbağa, alg, bakteri ile bunların etkileştiği su sıcaklığı, pH ve ışık birlikte yer alıyor. Araştırmanın en uygun kapsamı nedir?",
        },
        options: [
          {
            tr: "Yalnız tek organizma",
          },
          {
            tr: "Yalnız aynı türün popülasyonu",
          },
          {
            tr: "Yalnız cansız çevre",
          },
          {
            tr: "Bütün Dünya’nın biyosferinin eksiksiz sayımı",
          },
          {
            tr: "Ekosistem",
          },
        ],
        answer: 4,
        hint: {
          tr: "Canlı ve cansız bileşenlerin birlikte ele alınıp alınmadığını denetle.",
        },
        explanation: {
          tr: "Bir bölgenin canlı toplulukları ile etkileştikleri fiziksel-kimyasal çevre ekosistem kapsamıdır. Bu yerel araştırma bütün biyosferin eksiksiz sayımı olarak genişletilemez.",
        },
        skill: "f014-ekoloji-giris-10",
      },
    ],
  },
  {
    id: "besin-piramidi",
    topic: "detail-32",
    title: "Besin piramitleri: enerji, sayı ve biyokütleyi ayır",
    objectives: [
      "Üç piramit türünün birimini ve zaman temelini ayır.",
      "Verilen aktarım verimiyle basamak enerjisini hesapla.",
      "Ters piramitleri ve biyolojik birikimin sınırlarını kanıtla açıkla.",
    ],
    sections: [
      {
        title: "Grafiğe bakmadan önce birimi oku",
        paragraphs: [
          "Bir piramidin genişliği enerji, birey sayısı veya biyokütleyi gösterebilir. Şekil aynı olsa bile ölçülen nicelik aynı değildir. Enerji piramidinde birim alan ve belirli süre başına aktarılan enerji; sayı piramidinde birey adedi; biyokütlede belirli andaki toplam canlı madde kütlesi kullanılır. Karşılaştırmadan önce hangi alanın ve zamanın incelendiğini kaydet. J joule, kJ kilojoule birimidir; 1 kJ=1.000 J. Aynı alan ve süreyi koruyarak birim dönüştürülebilir; örneğin 900 kJ’nin yüzde 10’u 90 kJ, yani 90.000 J’dür.",
          "İki grafikte aynı şekli görmek aynı ekolojik sonucu kanıtlamaz. Bir gölde fitoplanktonun anlık kütlesi küçükken yıl boyunca üretimi büyük olabilir. Kilogramı joule ile, bir anlık stoğu yıllık akışla doğrudan bölüp verim bulma. Verim sorusunda pay ve payda aynı enerji/alan/zaman temeline dayanmalıdır.",
        ],
      },
      {
        title: "Trofik basamak tüketici adından bir fazladır",
        paragraphs: [
          "Üreticiler birinci trofik düzeydedir. Üretici yiyen birincil tüketici ikinci; onu yiyen ikincil tüketici üçüncü düzeye yerleşir. İkincil tüketici demek ikinci trofik düzey demek değildir. Bir canlının ağda farklı besinler yemesi birden çok düzeyle ilişki kurmasına yol açabilir. Omnivorları otomatik dördüncü düzeye yerleştirme.",
          "Ayrıştırıcılar bütün düzeylerden ölü madde ve atık alabilir. Bu nedenle her piramidin tepesine eklenen tek son tüketici basamağı değillerdir. Düzey, bir canlının karmaşıklık, zekâ veya gelişmişlik sırası değildir; hangi yoldan beslendiğini tanımlar. Üreme hızı ve vücut büyüklüğü de yalnız düzeye bakılarak bütün canlılar için sıralanamaz.",
        ],
      },
      {
        title: "Enerjinin sonraki düzeye geçmeyen bölümü nereye gider?",
        paragraphs: [
          "Organik maddede bağlanan enerjinin bir bölümü canlıların solunumuyla ısıya dönüşür. Yenmeyen veya sindirilemeyen bölümler detritus yoluna gider; tüketicinin sonraki basamağına hemen aktarılmış sayılmaz. Kullanılan enerji yok olmaz; ekosistemin iş yapmada kullanılabilir enerji akışı açısından azalır. Detritustaki kimyasal enerji ayrıştırıcıları besleyebilir.",
          "Aynı sistem ve zaman tabanında olağan trofik aktarım enerjisi üst basamağa geçtikçe azalır; enerji piramidi bu nedenle ters çizilmez. Bununla birlikte sonraki düzeye aktarılmayan bütün enerjiyi o anda doğrudan ısı saymak doğru değildir. Bir kısmı henüz yenmemiş biyokütlede veya atıkta kalabilir. Açık sistemde yeni enerji girişlerini ve çalışma sınırını ayrıca belirt.",
        ],
      },
      {
        title: "Yüzde on bir modeldir; verilen verimi kullan",
        paragraphs: [
          "Aktarım verimi, üst düzeyin üretimine geçen enerjinin önceki düzeyin üretimine oranı olarak tanımlandığında E_sonraki=E_önceki×verim bağıntısı kullanılır. Soruda yüzde 10 varsayılmışsa her geçişte 0,10 ile çarpılır. İki geçiş yüzde 20 değil, 0,10×0,10 olduğundan başlangıcın yüzde 1’idir.",
          "Doğada verim canlılara ve koşullara bağlıdır; bütün basamakların tam yüzde 10 olması bir doğa sabiti değildir. Soruda yüzde 20 verilmişken alışkanlıkla yüzde 10 kullanma. 10.000 J/m²/yıl üretimde yüzde 20 verim önce 2.000, sonra 400 J/m²/yıl verir. Üreticinin bağladığı enerji ile Güneş’ten gelen toplam ışınım farklı paydalardır. Enerjiler verildiğinde verimi ters yönden de bulabilirsin: üretici 6.000, birincil tüketici 900 ve ikincil tüketici 90 kJ/m²/yıl ise ilk geçiş 900/6.000×100=%15, ikincisi 90/900×100=%10’dur. Son düzeyin üreticiye oranı 90/6.000×100=%1,5 olur. Her payda hemen önceki basamak için değişir; farklı geçişlerin yüzdelerini zorunlu eşitleme.",
        ],
      },
      {
        title: "Sayı piramidi ters olabilir",
        paragraphs: [
          "Bir meşe çok sayıda tırtılı, tırtıllar daha az kuşu besleyebilir. Bir ağaç, yüz tırtıl ve on kuş sayımı, üretici birey sayısının birincil tüketiciden az olduğu ters sayı örneğidir. Bir ağacın çok büyük kütlesini tek birey sayımı gizler. Bu durum enerji korunmasına veya üreticilerin ekosistemdeki önemine aykırı değildir.",
          "Sayı piramidinden tek başına toplam kütleyi, birey büyüklüğünü veya enerji aktarımını hesaplayamazsın. Aynı sayıda birey farklı büyüklükte olabilir. Bir ağacı kaç birey sayacağın ile bir alg kolonisini sayma yöntemi de örnekleme kararları gerektirir. Soru belirli sayım yöntemini ve alanını veriyorsa o ölçütü koru.",
        ],
      },
      {
        title: "Anlık biyokütle ile üretim hızı farklıdır",
        paragraphs: [
          "Biyokütle, seçilen düzeyin belirli alandaki canlılarının toplam kütlesidir; karşılaştırmada kuru kütle gibi yöntem belirtilmelidir. Bazı sucul sistemlerde fitoplankton hızlı üreyip hızla tüketildiğinden herhangi bir andaki üretici kütlesi tüketicinin kütlesinden düşük olabilir. Düşük stok, yıl boyunca az üretim yapıldığı anlamına gelmez.",
          "Örneğin üretici anlık 4 g/m² ve tüketici 20 g/m² ise biyokütle piramidi bu iki düzeyde terstir. Bu sayıdan enerji piramidinin de ters olduğu çıkarılamaz. Üreticinin yenilenme hızı ve aynı süredeki üretim ölçülmelidir. Anlık stokları yüzde 10 ile zorunlu ilişkilendirmek, kütle ile zaman içindeki enerji akışını karıştırır.",
        ],
      },
      {
        title: "Bireyde birikme ile besin ağında büyütülme",
        paragraphs: [
          "Biyoakümülasyon, belirli bir maddenin bireye girişinin uzaklaştırılmasından fazla olması sonucu dokuda zamanla birikmesidir. Trofik büyütülme ise bazı kalıcı ve uygun özellikteki maddelerin derişiminin besin ağı boyunca yüksek düzeylerde artabilmesidir. Her kirletici aynı şekilde davranmaz; parçalanma, atılım ve kimyasal biçim önemlidir.",
          "Bir balıktaki mg kirletici ile mg/kg doku derişimi aynı ölçü değildir. Büyük birey toplamda daha çok madde taşırken daha düşük derişimde olabilir. Belirli kalıcı kirletici için verilen ölçüm zincirini yorumla; bütün maddeler kesin birikir veya tepedeki her birey en çok toplam kirletici taşır gibi sınırsız sonuçlar kurma. Risk değerlendirmesi maruziyet ve doz bilgisini de gerektirir.",
        ],
      },
      {
        title: "Piramit sorusunu dört denetimle çöz",
        paragraphs: [
          "Önce niceliği ve birimi yaz; sonra üreticiden başlayarak geçiş sayısını say. Ardından verilen verimi her geçişte ayrı uygula ve sonucun aynı alan/zaman temelinde kaldığını doğrula. Yalnız karşılaştırma isteniyorsa gereksiz bir yüzde varsayma. Veri yalnız sayıysa enerji miktarını bilmediğini söylemek doğru bilimsel yanıttır.",
          "Son denetimde tersliğin hangi piramide ait olduğunu belirt. Üretici sayısının azlığı ile üretici enerji akışının azlığını eşitleme. Ayrıştırıcıları bütün düzeylerle bağla. Bir önermenin her zaman mı yoksa verilen örnekte mi geçerli olduğunu ayır; tek doğru yanıt çoğu kez bu kapsam farkında saklıdır.",
        ],
      },
    ],
    examples: [
      {
        title: "İki ardışık enerji aktarımı",
        prompt:
          "Üretici üretimi 10.000 J/m²/yıl; her geçişte verim yüzde 10. Birincil ve ikincil tüketici üretimini hesapla.",
        strategy: "İki geçişi ayrı çarp; aynı birimi koru.",
        steps: [
          {
            label: "İlk geçiş",
            explanation: "Üreticiden birincil tüketiciye onda bir geçer.",
            expression: "10.000×0,10=1.000",
          },
          {
            label: "İkinci geçiş",
            explanation:
              "İkincil tüketici, birincil tüketicinin onda birini alır.",
            expression: "1.000×0,10=100",
          },
          {
            label: "Payı denetle",
            explanation: "Son düzeyi başlangıca böl.",
            expression: "100/10.000=0,01=%1",
          },
        ],
        answer: "1.000 ve 100 J/m²/yıl.",
        check: "İkinci basamak başlangıcın yüzde 1’i; yüzde 20’si değildir.",
        pitfall: "Verimleri toplama.",
      },
      {
        title: "Verim değişirse sonuç nasıl değişir?",
        prompt:
          "Aynı 10.000 J/m²/yıl üretim her iki geçişte yüzde 20 verimle aktarılıyor. Son düzeyi yüzde 10 modeliyle karşılaştır.",
        strategy: "Aynı başlangıç ve aynı iki geçişi koru.",
        steps: [
          {
            label: "Yeni ilk düzey",
            explanation: "Verilen yeni verim 0,20’dir.",
            expression: "10.000×0,20=2.000",
          },
          {
            label: "Yeni ikinci düzey",
            explanation: "Bir kez daha 0,20 ile çarp.",
            expression: "2.000×0,20=400",
          },
          {
            label: "Karşılaştır",
            explanation: "Yüzde 10 modelinin ikinci düzeyi 100’dü.",
            expression: "400/100=4",
          },
        ],
        answer: "İkinci tüketici 400 J/m²/yıl; önceki modelin dört katı.",
        check: "Verim iki katına çıkınca iki geçişli sonuç dört katına çıkar.",
        pitfall: "Gerçek doğada verimin hep sabit kalacağını ileri sürme.",
      },
      {
        title: "Bir meşe yüz tırtılı nasıl taşır?",
        prompt:
          "Aynı alanda 1 meşe, 100 tırtıl, 10 böcekçil kuş sayılıyor. Bu veri hangi piramitte terslik gösterir?",
        strategy: "Ölçülen niceliği belirleyip yalnız onun grafiğini yorumla.",
        steps: [
          {
            label: "Birimi belirle",
            explanation: "Veri birey sayısıdır; enerji veya kütle değildir.",
            expression: "birim: birey",
          },
          {
            label: "İlk iki düzeyi karşılaştır",
            explanation: "Bir üretici yüz tüketiciden sayıca azdır.",
            expression: "1<100",
          },
          {
            label: "Sınırı koru",
            explanation: "Kütle ve yıllık üretim verilmedi.",
            expression: "enerji tersliği çıkarılamaz",
          },
        ],
        answer: "Sayı piramidi taban ile birincil tüketici arasında terstir.",
        check:
          "Ağacın tek birey olmasına rağmen büyük kütle taşıyabileceğini hatırla.",
        pitfall: "Sayı grafiğini enerji grafiği sayma.",
      },
      {
        title: "Stok küçük, akış büyük olabilir",
        prompt:
          "Gölün üretici kuru biyokütlesi 4 g/m², otçul planktonunki 20 g/m² ölçülüyor. Bir yorumcu üretici enerji üretiminin de daha az olduğunu söylüyor. Değerlendir.",
        strategy:
          "Anlık kütle stoğunu birim zamandaki enerji üretiminden ayır.",
        steps: [
          {
            label: "Ölçümü tanı",
            explanation: "İki değer de belirli andaki kuru kütledir.",
            expression: "4 ve 20 g/m²",
          },
          {
            label: "Grafiği adlandır",
            explanation: "Üretici stoğu tüketiciden küçüktür.",
            expression: "ters anlık biyokütle",
          },
          {
            label: "Eksik bilgiyi belirt",
            explanation:
              "Fitoplanktonun yenilenmesi ve dönemlik enerji üretimi ölçülmemiştir.",
            expression: "üretim hızı gerekli",
          },
        ],
        answer:
          "Biyokütle tersliği vardır; enerji tersliği iddiası desteklenmez.",
        check:
          "Enerji karşılaştırması için aynı alan ve sürede üretim verisi iste.",
        pitfall: "Hızla yenilenen küçük stoğu önemsiz üretim sayma.",
      },
    ],
    recall: [
      {
        prompt: "Enerji piramidinin birimi neden yalnız kilogram değildir?",
        answer:
          "Enerji akışı ölçülür; alan ve zaman temelinde J/m²/yıl gibi birim kullanılır.",
      },
      {
        prompt: "Birincil tüketici kaçıncı trofik düzeydedir?",
        answer:
          "Üretici birinci olduğundan birincil tüketici ikinci trofik düzeydedir.",
      },
      {
        prompt: "Ayrıştırıcılar neden yalnız en tepe değildir?",
        answer:
          "Bütün düzeylerin ölü kalıntı ve atıklarından madde/enerji alabilirler.",
      },
      {
        prompt: "Biyokütle tersliği enerji tersliğini kanıtlar mı?",
        answer:
          "Hayır. Anlık stok ile dönemlik üretim farklıdır; hızlı yenilenme küçük üretici stokunu destekleyebilir.",
      },
    ],
    questions: [
      {
        id: "f014-bio-besin-piramidi-1",
        prompt: {
          tr: "Bir alandaki yıllık üretici enerji üretimi 10.000 J/m²/yıl, iki ardışık aktarımın her birinde verim yüzde 10’dur. İkincil tüketicinin üretimi kaç J/m²/yıldır?",
        },
        options: [
          {
            tr: "100",
          },
          {
            tr: "10",
          },
          {
            tr: "1.000",
          },
          {
            tr: "2.000",
          },
          {
            tr: "9.000",
          },
        ],
        answer: 0,
        hint: {
          tr: "Üreticiden ikincil tüketiciye iki kez geçilir.",
        },
        explanation: {
          tr: "10.000×0,10×0,10=100 bulunur. İki aktarımın yüzdeleri toplanmaz; son düzey başlangıç üretiminin yüzde 1’idir.",
        },
        skill: "f014-besin-piramidi-1",
      },
      {
        id: "f014-bio-besin-piramidi-2",
        prompt: {
          tr: "Üretici üretimi 10.000 J/m²/yıl olan modelde iki aktarım da yüzde 20 verimlidir. Son düzey kaç J/m²/yıl üretim alır?",
        },
        options: [
          {
            tr: "200",
          },
          {
            tr: "400",
          },
          {
            tr: "2.000",
          },
          {
            tr: "4.000",
          },
          {
            tr: "100",
          },
        ],
        answer: 1,
        hint: {
          tr: "Her geçişte 0,20 ile çarp.",
        },
        explanation: {
          tr: "İlk tüketici 10.000×0,20=2.000; ikinci tüketici 2.000×0,20=400 J/m²/yıl olur. Yüzde 20 burada verilen model koşuludur; evrensel sabit değildir.",
        },
        skill: "f014-besin-piramidi-2",
      },
      {
        id: "f014-bio-besin-piramidi-3",
        prompt: {
          tr: "Bir bahçede 1 meşe, 100 tırtıl ve 10 böcekçil kuş sayılmıştır. Bu veri hangi yorumu doğrudan destekler?",
        },
        options: [
          {
            tr: "Enerji piramidi zorunlu terstir",
          },
          {
            tr: "Üretici toplam kütlesi kesin en azdır",
          },
          {
            tr: "Sayı piramidi üretici ile birincil tüketici arasında ters olabilir",
          },
          {
            tr: "Bütün bireylerin kütlesi eşittir",
          },
          {
            tr: "Meşe enerji üretmediği için tüketiciler azalmalıdır",
          },
        ],
        answer: 2,
        hint: {
          tr: "Verilen birim birey adedidir.",
        },
        explanation: {
          tr: "Bir üreticiye yüz birincil tüketici düşmesi sayı piramidinin bu bölümünü ters yapar. Kütle veya dönemlik enerji ölçülmediğinden diğer niceliklerin sırası belirlenmez.",
        },
        skill: "f014-besin-piramidi-3",
      },
      {
        id: "f014-bio-besin-piramidi-4",
        prompt: {
          tr: "Aynı anda üretici plankton kuru kütlesi 4 g/m², otçul planktonunki 20 g/m² ölçülüyor. Hangi yorum uygundur?",
        },
        options: [
          {
            tr: "Enerji üretimi kesin 20/4 kat tüketicide fazladır",
          },
          {
            tr: "Üreticiler bu gölde gereksizdir",
          },
          {
            tr: "Bütün biyokütle piramitleri zorunlu düzdür",
          },
          {
            tr: "Anlık biyokütle ters olabilir; enerji akışı için üretim hızı ayrıca gerekir",
          },
          {
            tr: "Tüketiciler enerjiyi yoktan yaratmıştır",
          },
        ],
        answer: 3,
        hint: {
          tr: "Stok ile birim zamanda üretimi ayır.",
        },
        explanation: {
          tr: "Hızla yenilenen üretici planktonun anlık stoğu düşük olabilir. Bu, tüketiciyi besleyen dönemlik enerji üretiminin düşük olduğunu kanıtlamaz; iki grafik aynı niceliği ölçmez.",
        },
        skill: "f014-besin-piramidi-4",
      },
      {
        id: "f014-bio-besin-piramidi-5",
        prompt: {
          tr: "Ot→çekirge→kurbağa zincirinde kurbağa hangi basamaktadır?",
        },
        options: [
          {
            tr: "İkinci trofik düzeyde üretici",
          },
          {
            tr: "Birincil tüketici ve birinci trofik düzey",
          },
          {
            tr: "Üçüncül tüketici ve ikinci trofik düzey",
          },
          {
            tr: "Ayrıştırıcı ve yalnız son düzey",
          },
          {
            tr: "İkincil tüketici ve üçüncü trofik düzey",
          },
        ],
        answer: 4,
        hint: {
          tr: "Üreticiyi birinci düzey say.",
        },
        explanation: {
          tr: "Ot birinci, çekirge ikinci, kurbağa üçüncü trofik düzeydedir. Tüketici sırası birinci tüketiciden başladığı için kurbağa ikincil tüketicidir.",
        },
        skill: "f014-besin-piramidi-5",
      },
      {
        id: "f014-bio-besin-piramidi-6",
        prompt: {
          tr: "Ayrıştırıcıların besin piramidindeki yeri için hangisi doğrudur?",
        },
        options: [
          {
            tr: "Bütün trofik düzeylerden gelen ölü madde ve atıkları kullanabilirler",
          },
          {
            tr: "Yalnız son yırtıcının üstünde yaşarlar",
          },
          {
            tr: "Yalnız üreticilerin canlı dokusunu avlarlar",
          },
          {
            tr: "Organik enerji kullanmadıkları için heterotrof değildirler",
          },
          {
            tr: "Isıyı yeniden organik besin enerjisine zorunlu çevirirler",
          },
        ],
        answer: 0,
        hint: {
          tr: "Detritus girdisinin hangi canlılardan gelebileceğini düşün.",
        },
        explanation: {
          tr: "Üretici ve tüketicilerin her düzeyinden kalıntı/atık gelebilir. Ayrıştırıcıları tek bir en üst trofik kutuya hapsetmek bu bağlantıları gizler; ısı enerjisini döngüye soktukları da söylenemez.",
        },
        skill: "f014-besin-piramidi-6",
      },
      {
        id: "f014-bio-besin-piramidi-7",
        prompt: {
          tr: "Bir üst tüketiciye aktarılmayan enerjinin tamamı hakkında hangisi söylenemez?",
        },
        options: [
          {
            tr: "Bir bölümü yenmemiş organik maddede kalabilir",
          },
          {
            tr: "Hepsi aynı anda doğrudan ısıya dönüşmüştür",
          },
          {
            tr: "Bir bölümü detritus yoluna girebilir",
          },
          {
            tr: "Bir bölümü solunumla ısıya dönüşebilir",
          },
          {
            tr: "Aktarım hesabında sonraki tüketici üretimine katılmamış sayılır",
          },
        ],
        answer: 1,
        hint: {
          tr: "Aktarılmama ile anında ısı olmayı eşitleme.",
        },
        explanation: {
          tr: "Solunum enerjiyi ısıya dönüştürür; fakat yenmemiş biyokütle ve sindirilmemiş atık da sonraki canlı tüketiciye geçmemiş enerji içerir. Bu yüzden tamamını aynı anda ısı saymak yanlıştır.",
        },
        skill: "f014-besin-piramidi-7",
      },
      {
        id: "f014-bio-besin-piramidi-8",
        prompt: {
          tr: "Bir balığın dokusundaki kalıcı maddenin derişimi yaşamı boyunca artıyor. Yalnız bu birey içindeki artış hangi kavramdır?",
        },
        options: [
          {
            tr: "Kesin enerji piramidi tersliği",
          },
          {
            tr: "Atmosferik azot fiksasyonu",
          },
          {
            tr: "Biyoakümülasyon",
          },
          {
            tr: "Nitrifikasyon",
          },
          {
            tr: "Bütün türlerde zorunlu trofik büyütülme",
          },
        ],
        answer: 2,
        hint: {
          tr: "Bireyin zaman içindeki değişimi ile düzeyler arası karşılaştırmayı ayır.",
        },
        explanation: {
          tr: "Bireye giriş ve uzaklaştırma dengesizliğiyle dokuda zamanla birikme biyoakümülasyondur. Trofik büyütülme demek için besin ağının farklı düzeylerinin derişimleri karşılaştırılmalıdır.",
        },
        skill: "f014-besin-piramidi-8",
      },
      {
        id: "f014-bio-besin-piramidi-9",
        prompt: {
          tr: "Aynı alan ve yıl için enerji grafiği kuruluyor. Hangi özellik genel bir trofik kural olarak kullanılamaz?",
        },
        options: [
          {
            tr: "Üreticiler ilk trofik düzeydedir",
          },
          {
            tr: "Solunumla enerjinin bir bölümü ısıya dönüşür",
          },
          {
            tr: "Aktarım verimi hesaplanırken aynı zaman temeli korunur",
          },
          {
            tr: "Düzey yükseldikçe bütün canlıların gelişmişlik ve üreme hızı zorunlu aynı sırada değişir",
          },
          {
            tr: "Detritus farklı düzeylerden gelebilir",
          },
        ],
        answer: 3,
        hint: {
          tr: "Trofik düzey beslenme ilişkisini tanımlar.",
        },
        explanation: {
          tr: "Gelişmişlik bilimsel bir trofik sıralama ölçütü değildir; üreme hızı canlıya ve koşula bağlıdır. Diğer seçenekler enerji akışı ve çalışma tanımlarıyla uyumludur.",
        },
        skill: "f014-besin-piramidi-9",
      },
      {
        id: "f014-bio-besin-piramidi-10",
        prompt: {
          tr: "Bir çiftlikte yalnız her düzeydeki birey sayıları verilmiştir; canlı kütlesi ve dönemlik üretim bilinmiyor. Hangi nicelik bu veriden tek başına hesaplanamaz?",
        },
        options: [
          {
            tr: "Üretici diye sayılan birey adedi",
          },
          {
            tr: "Birincil tüketici diye sayılan birey adedi",
          },
          {
            tr: "İki düzeyin birey sayısı oranı",
          },
          {
            tr: "Sayı piramidinde hangi sayımın büyük olduğu",
          },
          {
            tr: "Trofik enerji aktarım verimi",
          },
        ],
        answer: 4,
        hint: {
          tr: "Enerji verimi için enerji üretim verisi gerekir.",
        },
        explanation: {
          tr: "Birey sayısı bilinince sayım ve oranları bulunur; bir bireyin büyüklüğü veya üretimi bilinmediğinden enerji akışı ve aktarım verimi hesaplanamaz.",
        },
        skill: "f014-besin-piramidi-10",
      },
    ],
  },
  {
    id: "besin-zinciri-agi",
    topic: "detail-33",
    title: "Besin zinciri ve ağı: enerjinin yollarını izle",
    objectives: [
      "Okları besinden tüketiciye okuyup doğrudan ilişkileri çıkar.",
      "Ağdaki farklı yollarla trofik düzeyleri bul.",
      "Tür kaybında kesin bağlantı değişimi ile olası nüfus etkisini ayır.",
    ],
    sections: [
      {
        title: "Okun yönü avcının baktığı yön değildir",
        paragraphs: [
          "Bu derste beslenme oku yenilen organizmadan onu tüketene gider. Ot→çekirge oku, otun maddesinin ve kimyasal enerjisinin çekirgeye aktarılabildiğini söyler. Çekirgenin ota saldırdığı davranışın yönüyle karıştırma. Şeklin anahtarı başka bir ok tanımlıyorsa önce onu oku; ok işaretinin anlamı açıkça tanımlanmalıdır.",
          "Aynı ok karbon ve azot gibi maddelerin besinle taşınmasını da gösterebilir. Bununla birlikte enerji ve madde sonrasında aynı biçimde dolaşmaz: maddeler çevreye dönüp yeniden kullanılabilirken kullanılabilir enerji akışı solunum ısısıyla dağılır. Ağda bir ok görmek, bütün enerjinin yüzde 100 geçtiği anlamına gelmez.",
        ],
      },
      {
        title: "Bir zinciri tek bir yol olarak kur",
        paragraphs: [
          "Çayır→çekirge→kurbağa→şahin yolu bir besin zinciridir. Üretici ilk düzey, çekirge birincil tüketici, kurbağa ikincil, şahin bu yol üzerinde üçüncül tüketicidir. Ok sayısı aktarım sayısını verir; dört canlılı yol üç beslenme aktarımı içerir. Güneş’in çizime eklenmesi onu canlı trofik basamak yapmaz.",
          "Besin zincirlerinin temelinde yalnız ışık kullanan üreticiler bulunmak zorunda değildir; kemosentetik üretim de bazı sistemlerin girişini sağlayabilir. Ölü organik maddeyle başlayan detritus yolları da vardır. Burada kurulan ot zinciri, bütün ekosistemlerin tek zorunlu biçimi değil, yön ve düzey saymayı öğreten açık bir örnektir.",
        ],
      },
      {
        title: "Ağ, kesişen zincirleri bir arada gösterir",
        paragraphs: [
          "Çayıra hem çekirge hem fare bağlanır; şahin hem fareyi hem kurbağayı yiyebilir. Böylece iki zincir aynı üretici ve son tüketicide kesişir. Bir türün birden çok besin kaynağı olması alternatif aktarım yolları oluşturur. Bir çizimde görünmeyen bağlantı, gerçek doğada kesin yoktur demek değildir; modelin kapsamı sınırlıdır.",
          "Ağdan doğrudan çıkarılabilecek bilgiler, belirtilen avlar, avcılar ve yollarla sınırlıdır. Avcının günlük kaç av yediği, nüfus büyüklüğü, göç veya avlanma tercihi yalnız bağlantıdan bulunmaz. Sayısal dinamik model için tüketim hızları, üreme, ölüm ve ortam koşulları gibi ek veriler gerekir. Doğrudan besin için tek ok aranır: tohum→fare→yılan→şahin yolunda şahine son ok yılandan gelir. Fare ve tohum dolaylı madde/enerji kaynaklarıdır; ayrıca fare→şahin oku verilmedikçe fareyi şahinin doğrudan av listesine ekleyemezsin. İki farklı hayvan tüketmek de tek başına hepçillik kanıtı değildir; doğrudan üretici tüketimine dair yol gerekir.",
        ],
      },
      {
        title: "Aynı canlı farklı yollarda farklı düzeyde olabilir",
        paragraphs: [
          "Şahin fareyi yediğinde çayır→fare→şahin yolunda üçüncü trofik düzeydedir. Kurbağayı yediğinde çayır→çekirge→kurbağa→şahin yolunda dördüncü düzeydedir. Türün adı değişmeden yol uzunluğu değişmiştir. Dolayısıyla bütün şahinler her ağda yalnız dördüncü düzeydedir diye bir kural kurulamaz.",
          "Omnivor bir kuş doğrudan tohum ve ayrıca otçul böcek yiyebilir; ikinci ve üçüncü düzeyle ilişki kurar. Ağda basitleştirilmiş tam sayılarla yol düzeyleri gösterilir. Gerçek beslenme oranları biliniyorsa ağırlıklı trofik konum hesaplanabilir; oranlar verilmemişken bir yol seçip tek kesin düzey uydurma.",
        ],
      },
      {
        title: "Ayrıştırıcı yolu ağın kenarında unutulmasın",
        paragraphs: [
          "Üreticiler, otçullar ve yırtıcılar öldüğünde veya organik atık bıraktığında detritus havuzuna katkı verir. Saprotroflar bu organik maddelerden beslenir; mineral dönüşümleri üreticilerin kullanılabilir kaynaklarına katkı sağlar. Ayrıştırıcılar enerjiye gereksinim duymayan temizlik araçları değil, metabolizması ve beslenmesi olan canlılardır.",
          "Ayrıştırma üreticilerin başlangıçta bağladığı organik enerjiyi yeni bir dış enerji kaynağına dönüştürmez. Detritus yolunda da solunum ve ısı dağılımı vardır. Ağda minerali bitkiye döndüren okla bakteriden bitkiye beslenme oku aynı anlamda değildir; besin ağı okları ve madde döngüsü okları ayrı anahtarla gösterilmelidir.",
        ],
      },
      {
        title: "Bir tür kaldırıldığında önce kesin değişeni söyle",
        paragraphs: [
          "Kurbağa ağdan çıkarılırsa çekirge→kurbağa ve kurbağa→şahin bağlantıları modelden kalkar. Bu, iki doğrudan yolun artık bulunmadığını kesin olarak söyler. Şahin fareyi de yiyebildiğinden bütün şahinlerin kesin yok olacağını söylemek için veri yoktur. Aynı şekilde çekirge sayısının tam iki katına çıkması yalnız çizimden hesaplanamaz.",
          "Av baskısının azalması belirli koşullarda avın artmasını destekleyebilir; fakat kaynak azlığı, başka avcılar, hastalık ve göç sonucu değiştirebilir. Sınavda basitleştirilmiş diğer koşullar sabit varsayımı verilmişse o model içinde eğilim belirt. Gerçek doğa için kesin nüfus ve süre tahminleri üretme.",
        ],
      },
      {
        title: "Dolaylı etkiyi neden zinciriyle açıkla",
        paragraphs: [
          "Bir avcı azalınca av üzerindeki baskı hafifleyebilir; avın daha çok tükettiği üretici üzerinde baskı artabilir. Böyle bir trofik kaskad doğrudan avlanma ilişkisinden daha uzun bir etki yoludur. Her ağda aynı şiddet ve yönde gerçekleşeceği garanti değildir. Bağlantı işaretleriyle sonucu, ölçülmüş etki büyüklüğüyle karıştırma.",
          "Bir müdahalenin ardından tek türü saymak yeterli olmayabilir. Önceki dönemle karşılaştırma, kontrol alanı, alternatif avlar ve çevresel değişimler araştırılmalıdır. Birlikte değişme tek başına tek neden kanıtı değildir. Koruma planında bağlantıları bilmek hangi ölçümleri yapacağını seçmeye yardım eder; bütün sonuçları önceden kesinleştirmez.",
        ],
      },
      {
        title: "Yeni bir ağı çözerken izlenecek yol",
        paragraphs: [
          "Önce üreticileri ve ok anahtarını bul. Seçilen türün içine gelen okları besin, dışına giden okları onu tüketenler olarak listele. Her üreticiden o türe ulaşan yolu ayrı izle ve ilk düzeyi birden başlat. Aynı tür iki yolda geçiyorsa sonucu tek sayıya zorlamadan bütün uygun düzeyleri yaz.",
          "Sonra sorunun doğrudan ilişki mi, verim hesabı mı yoksa tür değişimi yorumu mu istediğini belirle. Her aktarımda enerji verimi verilirse ayrı çarp; oran verilmezse hesap uydurma. Tür kaldırma sorusunda önce silinen okları söyle, ardından yalnız belirtilen varsayımlar altında olası dolaylı etkileri tartış.",
        ],
      },
    ],
    examples: [
      {
        title: "Oku ters okuma",
        prompt:
          "Ağda ot→çekirge, çekirge→kurbağa ve kurbağa→şahin okları var; ok besinden tüketiciye tanımlanmış. Kurbağanın doğrudan besini ve avcısı nedir?",
        strategy: "Kurbağaya giren ve ondan çıkan oku ayır.",
        steps: [
          {
            label: "Girişi bul",
            explanation: "Çekirgeden kurbağaya ok gelir.",
            expression: "besin: çekirge",
          },
          {
            label: "Çıkışı bul",
            explanation: "Kurbağadan şahine ok çıkar.",
            expression: "avcı: şahin",
          },
          {
            label: "Tanımı kontrol et",
            explanation:
              "Ok enerji/madde aktarımını gösterir; avcının hareket yönünü değil.",
            expression: "çekirge → kurbağa → şahin",
          },
        ],
        answer: "Besini çekirge, avcısı şahindir.",
        check:
          "Şahinin kurbağaya doğru avlanmasını çizimdeki aktarım yönüyle karıştırma.",
        pitfall: "Okun ucunu yenilen canlı sanma.",
      },
      {
        title: "Şahinin iki düzeyi",
        prompt:
          "Ot→fare→şahin ve ot→çekirge→kurbağa→şahin yollarında şahinin trofik düzeylerini bul.",
        strategy: "Her yolu üreticiden başlayarak ayrı say.",
        steps: [
          {
            label: "Kısa yolu say",
            explanation: "Ot 1, fare 2, şahin 3.",
            expression: "1→2→3",
          },
          {
            label: "Uzun yolu say",
            explanation: "Ot 1, çekirge 2, kurbağa 3, şahin 4.",
            expression: "1→2→3→4",
          },
          {
            label: "Birleştir",
            explanation:
              "Tek ağda iki yol olduğundan iki düzeyle ilişki kurar.",
            expression: "{3,4}",
          },
        ],
        answer:
          "Şahin bu ağda üçüncü ve dördüncü trofik düzeylerle ilişkilidir.",
        check: "Tüketici adını sorarsa ikincil ve üçüncül diye adlandır.",
        pitfall: "Trofik düzeyi türün değişmez etiketi sanma.",
      },
      {
        title: "Kurbağa kaldırılırsa ne kesin değişir?",
        prompt:
          "Ot→çekirge→kurbağa→şahin ve ot→fare→şahin ağından kurbağa çıkarılıyor. Şahin kesin yok olur mu?",
        strategy: "Silinen bağlantıları ve kalan alternatifi ayrı göster.",
        steps: [
          {
            label: "Bağları sil",
            explanation: "Kurbağaya giren ve çıkan iki ok kaldırılır.",
            expression: "çekirge→kurbağa ve kurbağa→şahin yok",
          },
          {
            label: "Alternatifi koru",
            explanation: "Ot→fare→şahin yolu modelde kalır.",
            expression: "fare→şahin sürer",
          },
          {
            label: "Kesinliği sınırla",
            explanation: "Nüfus ve beslenme yeterliliği verilmemiştir.",
            expression: "kesin yok oluş çıkarılamaz",
          },
        ],
        answer: "Kurbağa yolu kaybolur; şahinin kesin yok olacağı söylenemez.",
        check: "Kalan ok, şahin nüfusunun hiç değişmeyeceğini de kanıtlamaz.",
        pitfall: "Alternatif yol varsa hiçbir etki olmaz sonucuna da atlama.",
      },
      {
        title: "Zincir uzunluğu ve enerji",
        prompt:
          "Ot üretimi 20.000 J/m²/yıl; her beslenme aktarımı yüzde 10. Ot→fare→şahin yoluyla ve ot→çekirge→kurbağa→şahin yoluyla ulaşan enerjiyi ayrı ideal modellerde karşılaştır.",
        strategy:
          "İki ayrı ideal yolun geçiş sayısını say; gerçek ağda aynı enerjiyi iki kez sayma.",
        steps: [
          {
            label: "Kısa yol",
            explanation: "İki aktarım vardır.",
            expression: "20.000×0,1²=200",
          },
          {
            label: "Uzun yol",
            explanation: "Üç aktarım vardır.",
            expression: "20.000×0,1³=20",
          },
          {
            label: "Sınırı belirt",
            explanation:
              "Başlangıç üretiminin tümü her ayrı ideal yola ayrılmış varsayılmıştır.",
            expression: "200/20=10",
          },
        ],
        answer:
          "Ayrı ideal karşılaştırmada 200 ve 20 J/m²/yıl; kısa yol on kat.",
        check:
          "Gerçek ağda başlangıç enerjisinin yollara bölünme oranı verilmeden bu iki sonucu toplayamazsın.",
        pitfall:
          "Aynı üretici enerjisini iki yola bütünüyle verip toplam gerçek enerji diye sunma.",
      },
    ],
    recall: [
      {
        prompt: "Besinden tüketiciye tanımlanan ok ne taşır?",
        answer:
          "Besinle madde ve kimyasal enerji aktarım yolunu gösterir; yüzde 100 aktarım demek değildir.",
      },
      {
        prompt: "Bir türün trofik düzeyi neden birden fazla olabilir?",
        answer:
          "Üreticiden başlayan farklı uzunluktaki yollar veya karma beslenme nedeniyle.",
      },
      {
        prompt: "Tür kaldırma çizimi hangi sonucu kesin verir?",
        answer:
          "O türe bağlı doğrudan bağlantıların modelden kalktığını; gerçek nüfus değişiminin büyüklüğünü değil.",
      },
      {
        prompt: "Besin ağı ile madde döngüsü okları aynı mıdır?",
        answer:
          "Hayır. Beslenme ilişkisi ile kimyasal dönüşüm/geri dönüş farklı anahtarlarla açıklanmalıdır.",
      },
    ],
    questions: [
      {
        id: "f014-bio-besin-zinciri-agi-1",
        prompt: {
          tr: "Oklar besinden tüketiciye tanımlıdır: ot→çekirge→kurbağa→şahin. Kurbağanın doğrudan besini hangisidir?",
        },
        options: [
          {
            tr: "Çekirge",
          },
          {
            tr: "Ot",
          },
          {
            tr: "Şahin",
          },
          {
            tr: "Güneş",
          },
          {
            tr: "Kurbağanın kendisi",
          },
        ],
        answer: 0,
        hint: {
          tr: "Kurbağaya gelen oku izle.",
        },
        explanation: {
          tr: "Çekirgeden kurbağaya ok geldiği için doğrudan besin çekirgedir. Ot dolaylı enerji kaynağıdır; şahin ise kurbağayı tüketir.",
        },
        skill: "f014-besin-zinciri-agi-1",
      },
      {
        id: "f014-bio-besin-zinciri-agi-2",
        prompt: {
          tr: "Ot→fare→şahin ve ot→çekirge→kurbağa→şahin yolları aynı ağda bulunuyor. Şahin için uygun trofik düzeyler hangileridir?",
        },
        options: [
          {
            tr: "Yalnız birinci",
          },
          {
            tr: "Üçüncü ve dördüncü",
          },
          {
            tr: "Yalnız ikinci",
          },
          {
            tr: "Yalnız beşinci",
          },
          {
            tr: "İkinci ve beşinci",
          },
        ],
        answer: 1,
        hint: {
          tr: "Her yolu ottan 1 diye başlat.",
        },
        explanation: {
          tr: "Kısa yol üç, uzun yol dört canlı düzeyi içerir. Şahin besin yoluna göre üçüncü veya dördüncü trofik düzeyle ilişkilidir; tek bir değişmez düzeye zorlanamaz.",
        },
        skill: "f014-besin-zinciri-agi-2",
      },
      {
        id: "f014-bio-besin-zinciri-agi-3",
        prompt: {
          tr: "Ot→çekirge→kurbağa→şahin ve ot→fare→şahin ağından kurbağa çıkarılıyor. Yalnız çizime dayanarak hangi sonuç kesindir?",
        },
        options: [
          {
            tr: "Şahinlerin hepsi hemen ölür",
          },
          {
            tr: "Çekirge nüfusu tam iki katına çıkar",
          },
          {
            tr: "Kurbağaya bağlı doğrudan beslenme okları modelden kalkar",
          },
          {
            tr: "Fare nüfusu hiç değişemez",
          },
          {
            tr: "Ot miktarı her koşulda artar",
          },
        ],
        answer: 2,
        hint: {
          tr: "Önce bağlantı değişimini nüfus tahmininden ayır.",
        },
        explanation: {
          tr: "Kurbağaya giren ve çıkan bağlantılar silinir. Alternatif fare yolu kalır; nüfusların tam büyüklüğü, zamanlaması ve gerçek yaşam sonucu için ek veri gerekir.",
        },
        skill: "f014-besin-zinciri-agi-3",
      },
      {
        id: "f014-bio-besin-zinciri-agi-4",
        prompt: {
          tr: "Bir kuş doğrudan tohum ve ayrıca otçul böcek tüketiyor. Üreticiyi birinci sayan modelde kuş hangi düzeylerle ilişkilidir?",
        },
        options: [
          {
            tr: "Yalnız birinci",
          },
          {
            tr: "Yalnız dördüncü",
          },
          {
            tr: "Üçüncü ve beşinci",
          },
          {
            tr: "İkinci ve üçüncü",
          },
          {
            tr: "Bütün besinlerde zorunlu beşinci",
          },
        ],
        answer: 3,
        hint: {
          tr: "İki besinin üreticiye uzaklığını ayrı say.",
        },
        explanation: {
          tr: "Tohum yolunda üretici→kuş iki düzey; otçul böcek yolunda üretici→böcek→kuş üç düzeydir. Karma beslenme tek bir sabit düzey anlamına gelmez.",
        },
        skill: "f014-besin-zinciri-agi-4",
      },
      {
        id: "f014-bio-besin-zinciri-agi-5",
        prompt: {
          tr: "Üretici enerjisi 10.000 J/m²/yıl; ot→çekirge→kurbağa→şahin tek ideal yolu ve her geçişte yüzde 10 verim verilmiştir. Şahine ayrılan üretim kaç J/m²/yıldır?",
        },
        options: [
          {
            tr: "1",
          },
          {
            tr: "100",
          },
          {
            tr: "1.000",
          },
          {
            tr: "3.000",
          },
          {
            tr: "10",
          },
        ],
        answer: 4,
        hint: {
          tr: "Dört canlı, üç beslenme aktarımı demektir.",
        },
        explanation: {
          tr: "10.000×0,1×0,1×0,1=10 bulunur. Üreticiyi ilk düzey saymak gerekir; Güneş canlı trofik basamak olarak eklenmez.",
        },
        skill: "f014-besin-zinciri-agi-5",
      },
      {
        id: "f014-bio-besin-zinciri-agi-6",
        prompt: {
          tr: "Bir besin ağında ayrıştırıcılara hem üreticiden hem otçuldan hem yırtıcıdan ölü madde gittiği gösteriliyor. Hangi yorum uygundur?",
        },
        options: [
          {
            tr: "Ayrıştırıcılar farklı trofik düzeylerin detritusunu kullanabilir",
          },
          {
            tr: "Ayrıştırıcı yalnız yırtıcının avcısıdır",
          },
          {
            tr: "Ayrıştırıcılar organik enerjiye gereksinim duymaz",
          },
          {
            tr: "Ayrıştırma Güneş enerjisini yaratır",
          },
          {
            tr: "Üreticiler hiç ölmediği için ok hatalıdır",
          },
        ],
        answer: 0,
        hint: {
          tr: "Ölü madde kaynağını tek bir düzeye sınırlama.",
        },
        explanation: {
          tr: "Bütün canlı düzeyleri kalıntı veya atık üretebilir. Ayrıştırıcıların heterotrof metabolizması bu organik girdileri kullanır; enerji gereksinimleri ortadan kalkmaz.",
        },
        skill: "f014-besin-zinciri-agi-6",
      },
      {
        id: "f014-bio-besin-zinciri-agi-7",
        prompt: {
          tr: "Basit ağda yırtıcı azalınca av artabilir yorumu yapılmıştır. Gerçek popülasyon büyüklüğünü kesin tahmin etmek için aşağıdakilerden hangisi ek olarak gereklidir?",
        },
        options: [
          {
            tr: "Yalnız okların kâğıttaki rengi",
          },
          {
            tr: "Üreme, ölüm, alternatif avcılar ve kaynak koşulları gibi dinamik veriler",
          },
          {
            tr: "Şeklin kenar boşluğunun büyüklüğü",
          },
          {
            tr: "Canlı adlarının alfabetik sırası",
          },
          {
            tr: "Çizimde hangi kutunun daha yukarıda olduğu",
          },
        ],
        answer: 1,
        hint: {
          tr: "Bağlantı bilgisi ile değişim hızını ayır.",
        },
        explanation: {
          tr: "Beslenme ağı olası etkileşim yolunu gösterir; nüfusun hızını ve büyüklüğünü tek başına vermez. Üreme, ölüm, kaynak ve başka etkileşimler sonucu değiştirebilir.",
        },
        skill: "f014-besin-zinciri-agi-7",
      },
      {
        id: "f014-bio-besin-zinciri-agi-8",
        prompt: {
          tr: "Bir ağda üretici→fare oku bulunuyor. Ok besinden tüketiciye tanımlandığına göre hangisi doğrudur?",
        },
        options: [
          {
            tr: "Fare fotosentez için ışık üretir",
          },
          {
            tr: "Üretici fareyi tüketir",
          },
          {
            tr: "Üreticinin organik maddesi ve enerjisinin bir bölümü fareye geçebilir",
          },
          {
            tr: "Enerjinin tamamı kayıpsız fareye aktarılır",
          },
          {
            tr: "Ok doğrudan yalnız atmosferik azot fiksasyonudur",
          },
        ],
        answer: 2,
        hint: {
          tr: "Okun anahtarını kullan; aktarımı yüzde 100 sayma.",
        },
        explanation: {
          tr: "Verilen ok beslenme yolunu gösterir. Üretici fare tarafından tüketilir; aktarımın ne kadar olduğu verim ve tüketim verisi olmadan hesaplanamaz.",
        },
        skill: "f014-besin-zinciri-agi-8",
      },
      {
        id: "f014-bio-besin-zinciri-agi-9",
        prompt: {
          tr: "Bir araştırmacı yırtıcı azaldıktan sonra avın arttığını ölçüyor. Tek başına bu eşzamanlı değişim hangi iddiayı kanıtlamaz?",
        },
        options: [
          {
            tr: "İki değişkenin incelenen dönemde farklı yönde değiştiğini",
          },
          {
            tr: "Av sayısında artış gözlendiğini",
          },
          {
            tr: "Yırtıcı sayısında azalma gözlendiğini",
          },
          {
            tr: "Av artışının tek ve kesin nedeninin yırtıcı azalması olduğunu",
          },
          {
            tr: "Başka çevresel etkenlerin de araştırılmasının uygun olduğunu",
          },
        ],
        answer: 3,
        hint: {
          tr: "Birlikte değişme, başka nedenleri otomatik elemez.",
        },
        explanation: {
          tr: "Yağış, kaynak artışı, göç veya hastalık gibi başka etkenler aynı dönemde değişmiş olabilir. Kontrollü ve uzun dönemli veriler olmadan tek nedeni kesinleştirmek kapsamı aşar.",
        },
        skill: "f014-besin-zinciri-agi-9",
      },
      {
        id: "f014-bio-besin-zinciri-agi-10",
        prompt: {
          tr: "Ot üretiminin tümünün tek yola ayrıldığı iki ayrı ideal model karşılaştırılıyor. Üretim 10.000 J/m²/yıl ve verim yüzde 10: ot→fare→şahin ile ot→çekirge→kurbağa→şahin için son enerjiler hangileridir?",
        },
        options: [
          {
            tr: "1.000 ve 100 J/m²/yıl",
          },
          {
            tr: "100 ve 100 J/m²/yıl",
          },
          {
            tr: "10 ve 100 J/m²/yıl",
          },
          {
            tr: "2.000 ve 3.000 J/m²/yıl",
          },
          {
            tr: "100 ve 10 J/m²/yıl",
          },
        ],
        answer: 4,
        hint: {
          tr: "Kısa yolda iki, uzun yolda üç aktarım vardır.",
        },
        explanation: {
          tr: "10.000×0,1²=100;10.000×0,1³=10. Bunlar başlangıç enerjisinin her ayrı modele bütünüyle verildiği karşılaştırmadır; gerçek ağda paylaştırma bilinmeden ikisini toplayamazsın.",
        },
        skill: "f014-besin-zinciri-agi-10",
      },
    ],
  },
  {
    id: "madde-donguleri",
    topic: "detail-34",
    title: "Madde döngüleri: depoları ve dönüşümleri izle",
    objectives: [
      "Su, karbon ve azotun depoları ile aktarım süreçlerini ayır.",
      "Fiksasyon, amonifikasyon, nitrifikasyon ve denitrifikasyonu doğru kimyasal yönle eşleştir.",
      "Temsili birim modelinde madde korunumu ile akış hızını birbirine karıştırma.",
    ],
    sections: [
      {
        title: "Döngü, aynı maddenin aynı yerde kalması değildir",
        paragraphs: [
          "Madde döngüsünde atomlar canlılar, hava, su, toprak ve kayaçlar arasında taşınır; kimyasal biçimleri değişebilir. Azot atomu N₂, amonyum, nitrat ve protein yapısında bulunabilir. Döngü sözcüğü her atomun kısa sürede başlangıç deposuna döneceği anlamına gelmez. Fosil karbon veya kayaçlar çok uzun süreli depolardır.",
          "Madde korunurken depolardaki miktarlar değişebilir. Kapalı temsili modelde bir depodan 10 birim çıkarıp diğerine 10 eklemek toplamı korur. Gerçek araştırmada sınırdan giriş-çıkış varsa seçilen yerel toplam değişebilir. Enerji ise aynı kullanılabilir biçimde dönüp duran bir madde değildir; yaşamın sürekliliği için dış enerji girişi gerekir. Depo veya stok belirli andaki miktardır; akı ise birim zamandaki giriş ya da çıkıştır. 20 kg C ile 20 kg C/yıl aynı değişken değildir. Aynı orman ve bir yılda 60 kg C giriş, 42 kg C solunum/ayrışma çıkışı ve 8 kg C yangın çıkışı varsa stok değişimi 60−42−8=+10 kg C’dir. Bu, atmosferin değil seçilen orman deposunun bilançosudur; bakış yönünü belirt.",
        ],
      },
      {
        title: "Su döngüsünde fiziksel hâl ve güzergâhı ayır",
        paragraphs: [
          "Buharlaşma yüzeydeki sıvı suyu atmosfere taşır; yoğuşma su buharını sıvı damlacıklara dönüştürür. Yağış suyun atmosferden yüzeye düşmesidir; her yağışın hemen içme suyuna dönüştüğü söylenemez. Su yüzey akışıyla akarsulara, sızmayla yeraltına gidebilir. Bitkilerin kökleriyle aldığı suyun bir kısmı terleme yoluyla atmosfere döner.",
          "Güneş enerjisi buharlaşmayı, yer çekimi yağış ve akışın yönünü destekler. Orman veya kent yüzeyinin değişmesi sızma, akış ve terlemeyi değiştirebilir. Buharlaşma birçok çözünmüş maddeyi geride bırakır, fakat doğadaki su döngüsü her kirleticiyi gideren ve her suyu güvenli yapan tam bir arıtma sistemi değildir. Kullanım amacına göre kalite ölçümü gerekir.",
        ],
      },
      {
        title: "Karbonun organik yapıya girişi",
        paragraphs: [
          "Fotosentetik ototroflar CO₂’den organik karbon bağlarken ışık enerjisini kullanır. Kemoototroflar da uygun inorganik oksidasyon enerjisiyle karbon bağlayabilir; karbonun canlı yapısına bütün girişi yalnız ışığa bağlı fotosentez değildir. Hayvanlar organik karbonu besinle alır; karbon atomları türler arasında beslenme yoluyla taşınır.",
          "Fotosentez üreticinin CO₂ aldığı bir süreçtir; aynı üretici solunumla CO₂ de verir. Sadece bitki sayısına bakarak bir ekosistemin net karbon dengesini hesaplayamazsın. Fotosentez, solunum, ayrışma, dış madde alışverişi ve depolama aynı alan ve süre içinde değerlendirilmelidir. Günlük akış ile yıllık net depolama farklı olabilir.",
        ],
      },
      {
        title: "Karbonun geri dönüşü ve uzun süreli depolar",
        paragraphs: [
          "Üretici, tüketici ve ayrıştırıcıların solunumu organik karbonun bir bölümünü CO₂’ye döndürür. Ölü kalıntıların ayrışması ve fosil yakıtların yanması da karbon dönüşüm yollarıdır. Okyanusta çözünme ve gaz alışverişi, tortu ve kayaç depoları döngünün başka parçalarıdır. Her süreç aynı hızda çalışmaz.",
          "Fosil yakıt kullanımı uzun sürede birikmiş karbonu kısa zamanda atmosferik depoya aktarabilir. Toplam karbonun korunması atmosfer CO₂’sinin artamayacağı anlamına gelmez; korunan toplam ile bir depodaki pay farklıdır. Karbon bütçesi sorusunda kaynak ve hedef depoyu göster, sonra verilen miktarı ekle/çıkar; sayı verilmezse kesin derişim üretme.",
        ],
      },
      {
        title: "Azot fiksasyonu ile asimilasyon farklı işlemlerdir",
        paragraphs: [
          "Azot protein ve nükleik asitlerin yapısına katılır. Atmosferde bol N₂ bulunması, bitki ve hayvanların bu gazı doğrudan kullanabildiği anlamına gelmez. Biyolojik fiksasyonda bazı prokaryotlar N₂’yi amonyak/amonyum biçimine indirger. Baklagil köklerindeki uygun ortak bakteriler, serbest yaşayan bazı bakteriler ve bazı siyanobakteriler örnek olabilir.",
          "Bitkilerin amonyum veya nitratı alıp organik azota katması asimilasyondur; N₂ fiksasyonuyla aynı olay değildir. Hayvanlar çoğunlukla beslenmeyle organik azot alır. Yıldırım gibi abiyotik süreçler de atmosfer azotunun reaktif bileşiklere dönüşmesine katkı verir; biyolojik nitrogenaz yoluyla aynı kimyasal basamak diye sunulmaz.",
        ],
      },
      {
        title: "Amonifikasyon ve nitrifikasyonda başlangıç maddesini oku",
        paragraphs: [
          "Ayrıştırmada organik azotlu bileşiklerden amonyak/amonyum oluşmasına amonifikasyon denir. Nitrifikasyon ise amonyumun önce nitrite, sonra nitrata oksidasyonudur. Bunlar iki ayrı kimyasal geçiştir: NH₄⁺→NO₂⁻→NO₃⁻. Okul modelinde bu dönüşümler aerobik kemoototrof mikroorganizmalarla ilişkilendirilir; canlıların bütün azot dönüşümlerini tek türe yükleme.",
          "Nitrifikasyonun doğrudan başlangıç maddesi atmosfer N₂’si değildir. Yalnız NH₄⁺’ü NO₂⁻ veya NO₃⁻ biçimine dönüştürmek atmosfer deposunu azaltmaz; fiksasyonla karıştırma. Nitrat bitkilerce alınabilir ama yıkanmayla suya da taşınabilir. Bir dönüşümün toprağın verimini her koşulda kesin artırdığını söylemek için bütün kayıp ve kullanım süreçleri bilinmelidir.",
        ],
      },
      {
        title: "Denitrifikasyon azotu atmosfere döndüren yoldur",
        paragraphs: [
          "Denitrifikasyonda uygun mikroorganizmalar nitrat gibi oksitlenmiş azot bileşiklerini gaz ürünlerine dönüştürebilir; basitleştirilmiş son ürün N₂ olarak gösterilir. Oksijeni az ortamlar bu süreci destekleyebilir. Nitrat deposunun azalması ve atmosferik gaz azotuna dönüş, fiksasyonun ters yönüyle ilişkili bir geri dönüş yoludur; aynı enzim veya tek ters tepkime değildir.",
          "Toprakta bir yandan fiksasyon, nitrifikasyon, asimilasyon ve başka yollar çalışabilir. Tek süreci artırmak toplam azot dengesinin bütün sonucunu vermez. Gübre, atık, yüzey akışı ve yıkanma doğal döngünün depolarını değiştirerek sucul sistemde besleyici yükünü yükseltebilir. Tarımsal uygulamada yalnız daha çok azot değil, zamanlama ve alıcı ortam da önemlidir.",
        ],
      },
      {
        title: "Dönüşüm tablosunu bir korunum hesabına çevir",
        paragraphs: [
          "Bir azot modeli N₂’de 50, NH₄⁺’te 20, NO₂⁻’te 10, NO₃⁻’te 10 ve organik depoda 10 temsili azot birimiyle başlasın. 10 birim NH₄⁺’ü NO₂⁻’e aktarmak 20→10 ve 10→20 yapar; N₂ 50’de kalır ve toplam 100 korunur. Sayılan şey molekül adedi değil, aynı tanımlı azot miktarıdır; N₂’nin iki azot atomu taşımasını bu birim tanımıyla karıştırma.",
          "Her soruda önce atom miktarı mı, molekül sayısı mı ölçüldüğünü oku. Kaynakta bulunandan fazla maddeyi taşıyamazsın. Bu dersteki etkileşim tek bir seçili aktarımı başlangıç stoklarına uygular; zaman geçişi veya gerçek süreç hızı ölçmez. Kontrolü değiştirince görülen fark doğal ekosistemin gün veya yıl tahmini değildir.",
        ],
      },
      {
        title: "Oksijen döngüsü: üretim ve tüketimi birlikte izle",
        paragraphs: [
          "Oksijenli fotosentez yapan bitkiler, algler ve siyanobakteriler O₂ açığa çıkarabilir. Oksijenli solunum ise üretici, tüketici ve ayrıştırıcılarda O₂ kullanabilir; birçok yanma olayı da O₂ tüketir. Bu nedenle bitki yalnız oksijen verir veya ayrıştırıcı oksijen tüketmez genellemeleri yanlıştır. Suya çözünmüş oksijenin havayla alışverişi ve suyun karışması da yerel depoyu etkiler.",
          "Bir su örneğinde gündüz alg fotosentezi O₂’yi artırabilirken aynı topluluğun gece solunumu tüketimi sürdürür. Ölçülen 5 mg/L bir derişimdir; 5 mg/L/saat gibi bir değişim hızı değildir. Farklı zaman ve sıcaklıkta ölçülen iki değerden tek nedeni kesinleştirme. Karbon döngüsündeki fotosentez/solunum okları oksijen süreçleriyle bağlantılıdır, fakat karbon miktarı ile O₂ derişimi aynı nicelik değildir.",
        ],
      },
      {
        title: "Fosfor döngüsü: büyük gaz deposu olmadan da dolaşım",
        paragraphs: [
          "Fosforun önemli depoları kayaçlar, toprak ve tortulardır. Kayaç aşınmasıyla fosfat suya ve toprağa geçebilir; üreticilerce alınır, beslenme yoluyla taşınır ve organik kalıntıların ayrışmasıyla yeniden çevreye dönebilir. Sucul ortama taşınan fosforun bir bölümü tortulaşabilir. Azot döngüsünün atmosferik N₂ deposunu bütün elementlere kopyalama: fosfor döngüsünde bunun gibi büyük bir gaz deposu yoktur.",
          "Gübre veya yüzey akışıyla göle fosfat eklenmesi, fosforun doğrudan O₂ gazına dönüştüğü anlamına gelmez. Besleyici yükü alg üretimini destekleyebilir; oluşan organik kalıntılar ayrışırken oksijen tüketilebilir. Böylece fosforun taşınmasıyla oksijenin azalması arasında biyolojik ara basamaklar vardır. Fosfat stoku, çözünmüş O₂ ve ayrışma hızını ayrı ölç; tek bir fosfat sayısı gerçek gölün bütün oksijen seyrini belirlemez.",
        ],
      },
    ],
    examples: [
      {
        title: "Nitrifikasyon N₂’yi azaltır mı?",
        prompt:
          "Depolardaki değerler molekül veya iyon adedi değil, aynı ölçekte azot miktarı birimleridir: N₂ 50, NH₄⁺ 20, NO₂⁻ 10, NO₃⁻ 10, organik azot 10 birim. 10 birim NH₄⁺ ilk nitrifikasyon basamağıyla dönüştürülüyor. Son stokları bul.",
        strategy: "Yalnız başlangıç ve hedef depoyu değiştir.",
        steps: [
          {
            label: "Kaynağı azalt",
            explanation: "NH₄⁺ deposundan 10 çıkar.",
            expression: "20−10=10",
          },
          {
            label: "Hedefi artır",
            explanation: "NO₂⁻ deposuna 10 ekle.",
            expression: "10+10=20",
          },
          {
            label: "Diğerlerini koru",
            explanation:
              "N₂, nitrat ve organik depo bu seçili işlemde değişmez.",
            expression: "50+10+20+10+10=100",
          },
        ],
        answer: "N₂ 50, NH₄⁺ 10, NO₂⁻ 20, NO₃⁻ 10, organik 10; toplam 100.",
        check: "Atmosfer N₂’sinin 50’de kaldığını ayrıca kontrol et.",
        pitfall: "Nitrifikasyonu N₂ fiksasyonu sanma.",
      },
      {
        title: "Fiksasyonda değişen depolar",
        prompt:
          "Aynı başlangıçta 50 birim atmosfer N₂, 20 birim NH₄⁺ var. 10 temsili azot birimi biyolojik fiksasyonla aktarılıyor. Ne değişir?",
        strategy:
          "Azot miktarı birimiyle gazdan indirgenmiş havuza geçişi izle.",
        steps: [
          {
            label: "Başlangıç türü",
            explanation: "Biyolojik fiksasyon atmosfer N₂’sinden başlar.",
            expression: "N₂→NH₃/NH₄⁺",
          },
          {
            label: "Miktarı taşı",
            explanation: "Kaynak 10 azalır, hedef 10 artar.",
            expression: "50−10=40;20+10=30",
          },
          {
            label: "Toplamı denetle",
            explanation: "Diğer depolar sabit; toplam azot miktarı korunur.",
            expression: "40+30+10+10+10=100",
          },
        ],
        answer: "Atmosferik depo 40, NH₄⁺ 30 birim olur.",
        check: "Molekül adedi yerine temsili azot miktarı sayıldığını koru.",
        pitfall: "Biyolojik fiksasyon ürününü doğrudan nitrat diye yazma.",
      },
      {
        title: "Bitki hem alır hem verir",
        prompt:
          "Bir sistemde aynı sürede fotosentez 60, bitki solunumu 20 ve diğer solunumlar 30 temsili karbon birimi olarak ölçülüyor. Yalnız bu üç akışta atmosferik CO₂ net değişimi nedir?",
        strategy: "CO₂’ye giriş ve CO₂’den çıkışı ayrı işaretle.",
        steps: [
          {
            label: "Çıkışı yaz",
            explanation: "Fotosentez atmosferik CO₂’den 60 birim alır.",
            expression: "−60",
          },
          {
            label: "Girişleri topla",
            explanation: "Bitki ve diğer solunumlar 20+30 birim verir.",
            expression: "+50",
          },
          {
            label: "Neti hesapla",
            explanation: "Aynı sınır ve sürede akışları topla.",
            expression: "−60+50=−10",
          },
        ],
        answer: "Bu üç akışın toplamında atmosferik depo 10 birim azalır.",
        check:
          "Yanma veya dış alışveriş verilmedi; gerçek küresel bütçenin tamamı iddia edilmez.",
        pitfall: "Bitki solunumunu sıfır sayma.",
      },
      {
        title: "Yağıştan sonra su nereye gider?",
        prompt:
          "100 birim yağışın 30’u yüzey akışı, 50’si sızma, 20’si kısa süreli yüzey deposu olarak ölçülüyor. Bu basit bütçeyi ve su kalitesi yorumunu değerlendir.",
        strategy: "Miktar korunumu ile güvenli kullanım kararını ayır.",
        steps: [
          {
            label: "Parçaları topla",
            explanation: "Aynı dönemin üç çıkış/depo bileşeni toplanır.",
            expression: "30+50+20=100",
          },
          {
            label: "Güzergâhları ayır",
            explanation: "Sızma ile yüzey akışı farklı fiziksel yollardır.",
            expression: "50 yeraltına; 30 yüzey akışına",
          },
          {
            label: "Kaliteyi sınırla",
            explanation: "Miktar hesabında kirletici ve patojen ölçümü yoktur.",
            expression: "içilebilirlik sonucu yok",
          },
        ],
        answer:
          "Bütçe tutarlıdır; 100 birim olması suyun güvenli içilebilirliğini kanıtlamaz.",
        check: "Hacim ile saflık farklı ölçütlerdir.",
        pitfall: "Doğal döngüyü bütün kirleticileri gideren tam arıtma sayma.",
      },
    ],
    recall: [
      {
        prompt: "Nitrifikasyonun iki temel oku nedir?",
        answer: "NH₄⁺→NO₂⁻→NO₃⁻; atmosfer N₂’si doğrudan başlangıç değildir.",
      },
      {
        prompt: "Fiksasyon ile asimilasyon nasıl ayrılır?",
        answer:
          "Fiksasyon N₂’yi reaktif azota dönüştürür; asimilasyon alınan azotu organik yapıya katar.",
      },
      {
        prompt: "Üreticiler karbonu yalnız alır mı?",
        answer:
          "Hayır. Fotosentez/kemosentezle bağlayabilir, solunumla CO₂ verebilirler.",
      },
      {
        prompt: "Toplam madde korunuyorsa bir depodaki miktar artabilir mi?",
        answer:
          "Evet. Başka depodan aktarım o depoyu büyütür; toplam ile dağılım farklıdır.",
      },
    ],
    questions: [
      {
        id: "f014-bio-madde-donguleri-1",
        prompt: {
          tr: "Azot döngüsünde NH₄⁺→NO₂⁻→NO₃⁻ dönüşümünün adı nedir?",
        },
        options: [
          {
            tr: "Nitrifikasyon",
          },
          {
            tr: "Fotosentez",
          },
          {
            tr: "Denitrifikasyon",
          },
          {
            tr: "Biyolojik N₂ fiksasyonunun tek doğrudan ürünü",
          },
          {
            tr: "Buharlaşma",
          },
        ],
        answer: 0,
        hint: {
          tr: "Başlangıç amonyum, son ürün nitrat.",
        },
        explanation: {
          tr: "Amonyumun nitrit ve nitrata oksidasyonu nitrifikasyondur. Atmosfer N₂’sini amonyak/amonyuma bağlayan fiksasyonla veya nitratı gaz azotuna döndüren denitrifikasyonla karıştırılmaz.",
        },
        skill: "f014-madde-donguleri-1",
      },
      {
        id: "f014-bio-madde-donguleri-2",
        prompt: {
          tr: "Kapalı temsili modelde değerler molekül veya iyon adedi değil, aynı ölçekte azot miktarı birimleridir: N₂ 50, NH₄⁺ 20, NO₂⁻ 10, NO₃⁻ 10, organik azot 10 birim. Yalnız 10 birim NH₄⁺→NO₂⁻ aktarılıyor. Hangi sonuç doğrudur?",
        },
        options: [
          {
            tr: "N₂ 40’a düşer; NH₄⁺ 30 olur",
          },
          {
            tr: "N₂ 50’de kalır; NH₄⁺ 10, NO₂⁻ 20 olur",
          },
          {
            tr: "Toplam azot 110’a çıkar",
          },
          {
            tr: "NO₃⁻ 20 olurken NH₄⁺ 20’de kalır",
          },
          {
            tr: "Organik azot sıfırlanır",
          },
        ],
        answer: 1,
        hint: {
          tr: "Kaynak ve hedef dışında depo değiştirme.",
        },
        explanation: {
          tr: "Bu basamak ilk nitrifikasyondur: amonyum 10 azalır, nitrit 10 artar. N₂ doğrudan kullanılmadığından 50’de kalır; toplam 100 azot birimi korunur.",
        },
        skill: "f014-madde-donguleri-2",
      },
      {
        id: "f014-bio-madde-donguleri-3",
        prompt: {
          tr: "Bazı prokaryotların atmosfer N₂’sini NH₃/NH₄⁺ biçimine dönüştürmesi hangi olaydır?",
        },
        options: [
          {
            tr: "Nitratın N₂’ye dönüşü",
          },
          {
            tr: "Suyun yoğuşması",
          },
          {
            tr: "Biyolojik azot fiksasyonu",
          },
          {
            tr: "Organik azotun yalnız solunumla CO₂ olması",
          },
          {
            tr: "Nitritin nitrata oksidasyonu",
          },
        ],
        answer: 2,
        hint: {
          tr: "Atmosfer gazının kullanılabilir reaktif biçime girişini izle.",
        },
        explanation: {
          tr: "Biyolojik fiksasyon N₂’yi indirgenmiş amonyak/amonyum biçimine dönüştürür. Nitrat oluşumu daha sonra nitrifikasyonla gerçekleşebilir; iki süreç tek basamak değildir.",
        },
        skill: "f014-madde-donguleri-3",
      },
      {
        id: "f014-bio-madde-donguleri-4",
        prompt: {
          tr: "Bitki kökünün nitratı alıp amino asit yapısına katması hangi kavramla açıklanır?",
        },
        options: [
          {
            tr: "Atmosferik N₂’yi doğrudan fiksasyon",
          },
          {
            tr: "Denitrifikasyon",
          },
          {
            tr: "Yalnız suyun buharlaşması",
          },
          {
            tr: "Azot asimilasyonu",
          },
          {
            tr: "Nitritin nitrata oksidasyonu",
          },
        ],
        answer: 3,
        hint: {
          tr: "Alınan inorganik azot organik yapıya katılıyor.",
        },
        explanation: {
          tr: "Nitrat/amonyumdan alınan azotun organik bileşiklere katılması asimilasyondur. Bitkinin nitrat alması, kendisinin atmosfer N₂’sini doğrudan bağladığını göstermez.",
        },
        skill: "f014-madde-donguleri-4",
      },
      {
        id: "f014-bio-madde-donguleri-5",
        prompt: {
          tr: "Basitleştirilmiş azot döngüsünde NO₃⁻→N₂ geri dönüşü hangi süreçtir?",
        },
        options: [
          {
            tr: "Nitrifikasyonun amonyum basamağı",
          },
          {
            tr: "Fotosentez",
          },
          {
            tr: "Biyolojik fiksasyon",
          },
          {
            tr: "Terleme",
          },
          {
            tr: "Denitrifikasyon",
          },
        ],
        answer: 4,
        hint: {
          tr: "Oksitlenmiş toprak azotundan gaz deposuna dönüş var.",
        },
        explanation: {
          tr: "Denitrifikasyon nitrat gibi oksitlenmiş azot bileşiklerinden gaz ürünlerine dönüşüm yoludur; basit şemada N₂ ile gösterilir. Nitrifikasyon ise amonyumdan nitrat yönündedir.",
        },
        skill: "f014-madde-donguleri-5",
      },
      {
        id: "f014-bio-madde-donguleri-6",
        prompt: {
          tr: "Üreticilerin karbon döngüsündeki rolleri için hangisi doğrudur?",
        },
        options: [
          {
            tr: "Organik karbon bağlayabilir ve solunumla CO₂ verebilirler",
          },
          {
            tr: "Yalnız CO₂ alır, hiç solunum yapmazlar",
          },
          {
            tr: "Bütün ototroflar zorunlu ışık kullanır",
          },
          {
            tr: "Karbon atomlarını yoktan yaratırlar",
          },
          {
            tr: "Karbon yalnız hayvanlar üzerinden üreticiye girebilir",
          },
        ],
        answer: 0,
        hint: {
          tr: "Üretim ile solunumu aynı canlıda birlikte düşün.",
        },
        explanation: {
          tr: "Fotoototroflar ve kemoototroflar inorganik karbon bağlayabilir; üreticiler ayrıca solunum yapar. Bu nedenle net karbon değişimi bütün giriş-çıkışların aynı süre ve sınırda değerlendirilmesini gerektirir.",
        },
        skill: "f014-madde-donguleri-6",
      },
      {
        id: "f014-bio-madde-donguleri-7",
        prompt: {
          tr: "Aynı dönemde yalnız üç karbon akışı var: fotosentez atmosferden 60 birim alıyor, bitki solunumu 20 ve diğer solunumlar 30 birim veriyor. Atmosferik CO₂ net değişimi nedir?",
        },
        options: [
          {
            tr: "10 birim artma",
          },
          {
            tr: "10 birim azalma",
          },
          {
            tr: "50 birim azalma",
          },
          {
            tr: "60 birim artma",
          },
          {
            tr: "110 birim azalma",
          },
        ],
        answer: 1,
        hint: {
          tr: "Atmosferden alımı eksi, atmosfere dönüşü artı işaretle.",
        },
        explanation: {
          tr: "−60+20+30=−10 bulunur. Bu hesap yalnız verilen üç akışa aittir; bitki solunumunu unutmak veya açıklanmayan başka akış eklemek sonucu bozar.",
        },
        skill: "f014-madde-donguleri-7",
      },
      {
        id: "f014-bio-madde-donguleri-8",
        prompt: {
          tr: "Su döngüsündeki buharlaşma ve sızma için doğru eşleştirme hangisidir?",
        },
        options: [
          {
            tr: "İkisi de yalnız atmosferik azotu azaltır",
          },
          {
            tr: "Buharlaşma nitratı protein yapar",
          },
          {
            tr: "Buharlaşma sıvıdan atmosfere; sızma yüzeyden toprağın içine su taşır",
          },
          {
            tr: "Sızma yalnız gazdan sıvı damlacık oluşturur",
          },
          {
            tr: "İkisi de bütün kirleticileri kesin yok eder",
          },
        ],
        answer: 2,
        hint: {
          tr: "Hâl değişimi ile yeraltına ilerlemeyi ayır.",
        },
        explanation: {
          tr: "Buharlaşma sıvı suyun gaz fazına geçişidir; sızma suyun toprak/yeraltı yoluna girişidir. Bunlar tek başına bütün kirleticilerin giderildiği anlamına gelmez.",
        },
        skill: "f014-madde-donguleri-8",
      },
      {
        id: "f014-bio-madde-donguleri-9",
        prompt: {
          tr: "Kapalı bir karbon modelinde fosil depodan atmosfere 10 birim aktarılıyor. Toplam karbon korunuyorsa hangi yorum doğrudur?",
        },
        options: [
          {
            tr: "Atmosfer miktarı hiçbir zaman değişemez",
          },
          {
            tr: "Toplam korunumu her deponun sabitliği demektir",
          },
          {
            tr: "Fosil karbon aktarılırken atomlar kaybolur",
          },
          {
            tr: "Atmosfer artabilir; başka depo aynı miktarda azalır",
          },
          {
            tr: "Atmosfer 10 artarsa toplam zorunlu 10 artar",
          },
        ],
        answer: 3,
        hint: {
          tr: "Korunan toplam ile depolar arasındaki dağılımı ayır.",
        },
        explanation: {
          tr: "Bir deponun 10 artışı başka deponun 10 azalmasıyla toplamı korur. Fosil karbonun atmosfere taşınması bu nedenle toplam korunurken atmosferik CO₂ artışına katkı verebilir.",
        },
        skill: "f014-madde-donguleri-9",
      },
      {
        id: "f014-bio-madde-donguleri-10",
        prompt: {
          tr: "Organik atık azotunun ayrıştırma sonucu NH₃/NH₄⁺ biçimine dönüşmesinin adı nedir?",
        },
        options: [
          {
            tr: "Denitrifikasyon",
          },
          {
            tr: "Yağış",
          },
          {
            tr: "Fotosentez",
          },
          {
            tr: "Nitritin nitrata oksidasyonu",
          },
          {
            tr: "Amonifikasyon",
          },
        ],
        answer: 4,
        hint: {
          tr: "Başlangıç organik azot, hedef amonyak/amonyumdur.",
        },
        explanation: {
          tr: "Amonifikasyon organik azotun indirgenmiş inorganik amonyak/amonyum havuzuna dönüşmesidir. Nitrifikasyon bu havuzdan nitrit/nitrat yönünde ayrı bir süreçtir.",
        },
        skill: "f014-madde-donguleri-10",
      },
    ],
  },
  {
    id: "guncel-cevre-sorunlari",
    topic: "detail-35",
    title: "Çevre sorunları: kaynaktan ekosistem etkisine",
    objectives: [
      "Kirletici kaynağı, taşınma, biyolojik etki ve müdahaleyi ilişkilendir.",
      "Ötrofikasyonda besleyici artışı ile oksijen azalması arasındaki basamakları açıkla.",
      "İklim, ozon, asitlenme, radyasyon ve habitat kaybını birbirine karıştırma.",
    ],
    sections: [
      {
        title: "Çevre sorununu bir neden zinciri olarak kur",
        paragraphs: [
          "Bir sorunu yalnız kirlilik var diye adlandırmak çözümü seçmeye yetmez. Kaynak nedir, madde hangi ortamla taşınır, hangi canlı hangi yoldan maruz kalır ve hangi işlev etkilenir sorularını sırayla yanıtla. Gübre tarladan yüzey akışıyla göle taşınabilir; bacadan çıkan bir madde başka yerde çökelebilir. Kaynak ile zarar görülen alan aynı yerde olmak zorunda değildir.",
          "Etki maddenin türüne, kimyasal biçimine, derişimine, maruziyet süresine ve alıcı canlının duyarlılığına bağlıdır. Her madde her dozda aynı hastalığı yapar veya tek maruziyet kesin belirti doğurur deme. Gözlenen sonuç için uygun örnekleme ve ölçüm gerekir. Kaynağı azaltma, taşınma yolunu kesme ve maruz kalan habitatı onarma farklı müdahale basamaklarıdır.",
        ],
      },
      {
        title: "Hava kirliliğinde parçacık ve gaz aynı filtreyle çözülmez",
        paragraphs: [
          "Fosil yakıt kullanımı, sanayi, trafik ve bazı doğal olaylar partikül veya gaz salabilir. İnce parçacıklar solunum yollarını etkileyebilir; bazı gazlar kimyasal tepkimelerle ikincil kirleticiler oluşturur. Bir bacaya takılan sıradan parçacık filtresi bütün gazları ve CO₂’yi otomatik gidermez. Hedef kirleticiye uygun teknoloji ve kaynak azaltma birlikte düşünülmelidir.",
          "Asit çökelmesinde özellikle kükürt dioksit ve azot oksitlerin dönüşümleri önemlidir. Karbondioksitin suda çözünmesiyle doğal yağmurun hafif asitliği, güçlü antropojenik asit çökelmesiyle aynı iddia değildir. Karbonmonoksiti sülfürik asidin doğrudan hammaddesi sayma. Göl ve toprağın tamponlama kapasitesi, aynı asit girdisinin etkisini farklılaştırabilir.",
        ],
      },
      {
        title: "Sera etkisi ile ozon incelmesi farklı mekanizmalardır",
        paragraphs: [
          "Doğal sera etkisi, atmosferdeki bazı gazların yeryüzünün yaydığı kızılötesi enerjiyle etkileşmesiyle yaşam için önemli bir sıcaklık dengesi sağlar. İnsan kaynaklı sera gazı artışı bu dengeyi değiştirir. İklim değişimi uzun dönemli sıcaklık, yağış ve aşırı olay örüntüleriyle ilgilidir; tek bir soğuk gün küresel eğilimi tek başına çürütmez.",
          "Stratosferik ozon zararlı morötesi ışınımın bir bölümünü soğurur. Ozon tabakasının incelmesi ile sera gazlarının kızılötesi etkisi aynı süreç değildir. Yüzeye yakın ozon ise solunum sağlığını olumsuz etkileyen kirletici olabilir. Aynı O₃ molekülünün bulunduğu katman değişince ekolojik ve sağlık bağlamı da değişir; ozon her yerde yalnız yararlıdır denemez.",
        ],
      },
      {
        title: "Ötrofikasyonu tek sıçramayla değil basamak basamak açıkla",
        paragraphs: [
          "Suyla gelen azot ve fosfor gibi besleyicilerin artışı uygun koşullarda alg ve bitki üretimini artırabilir. Yüzeyde yoğun gelişme derine giden ışığı azaltabilir. Üretilen organik madde öldüğünde ayrıştırıcıların kullanacağı yük büyür. Aerobik ayrıştırıcıların solunumu çözünmüş oksijeni tüketerek balıklar ve başka canlılar üzerinde baskı oluşturabilir.",
          "Alg artışı bütün anlarda oksijenin sıfır olduğu anlamına gelmez; gündüz fotosentezi ve gece solunumu, suyun karışması ve sıcaklık da etkilidir. Besleyici girişini azaltmak etkili bir önlemdir ama birikmiş organik yük anında kaybolmaz. Görünür katı çöpleri tutan filtre, çözünmüş besleyiciyi hedefleyen arıtmayla aynı işi yapmaz. Bu dersin modeli nitel süreç sırasını gösterir; gerçek gün veya mg/L tahmini değildir.",
        ],
      },
      {
        title: "Su ve toprakta kimyasal yük ile patojeni ayır",
        paragraphs: [
          "Kanalizasyon, tarımsal akış, sanayi atığı ve yanlış atık yönetimi suya ya da toprağa farklı yükler taşır. Bir ağır metalin taşınması ile bir patojenin bulaşması ayrı risk yollarıdır. Berrak görünen su mikropsuz veya kimyasal açıdan güvenli olmak zorunda değildir. Kimyasal giderim ve dezenfeksiyon hedefleri ölçülerek doğrulanmalıdır.",
          "Toprak yalnız bitkilerin tutunduğu bir zemin değil, gözenekleri, organik maddesi ve canlı toplulukları olan bir sistemdir. Kirletici hareketi, mineral bağlanması ve yeraltı suyuna geçiş toprağa ve maddeye bağlıdır. Her kirlenmiş yerde hiçbir bitki yetişmez gibi mutlak sonuç yerine, canlıların ve üretimin etkilenebileceğini koşuluyla ifade et. Tehlikeli atıklar uygun toplama ve işlem gerektirir.",
        ],
      },
      {
        title: "Radyasyon sözcüğü tek bir tehlike türü değildir",
        paragraphs: [
          "İyonlaştırıcı ışınım yeterli enerjiyle atomlardan elektron koparabilir; X ışınları, gama ve bazı parçacık ışımaları bu kapsamda değerlendirilir. Radyoaktif kirlenme, radyoaktif maddelerin çevrede istenmeyen biçimde bulunmasıyla ilgilidir. X ışını cihazının çalışırken ışınım üretmesi, bulunduğu her yeri radyoaktif maddeyle kirlettiği anlamına gelmez.",
          "Görünür ışık, radyo dalgaları ve telefonun haberleşme dalgaları da elektromanyetik ışınımdır fakat sırf bu nedenle iyonlaştırıcı veya radyoaktif sayılmaz. Riskleri aynı mekanizma ve aynı doz birimiyle eşitleme. İyonlaştırıcı maruziyette doz, süre, ışınım türü ve doku önemlidir; gündelik cihazların hepsine aynı kesin DNA hasarı iddiası yüklemek bilimsel olarak doğru değildir.",
        ],
      },
      {
        title: "Ses, erozyon ve parçalanma farklı biyolojik yollarla etki eder",
        paragraphs: [
          "İstenmeyen yüksek ses iletişim, uyku, davranış ve işitme üzerinde etkili olabilir; düzey ve süre birlikte değerlendirilir. Yalıtım, kaynağı azaltma ve planlama sesin yolunu hedefler. Erozyon toprağın üst katmanının taşınmasıdır; eğim, örtü kaybı ve yanlış arazi kullanımı riski artırabilir. Örtünün korunması ve eğime uygun uygulamalar toprağı yerinde tutmaya yardım eder.",
          "Bir habitatın yolla parçalara ayrılması toplam alanın azalmasının yanında bağlantıları, hareketi ve gen alışverişini etkileyebilir. Koridorlar uygun tür ve tasarımla bağlantı sağlayabilir; her koridor bütün riskleri sıfırlamaz. Yangın, kuraklık ve insan baskısının etkileri birlikte değerlendirilmeli; tek tip ağaç dikmenin eski ekosistemi bütün çeşitliliğiyle anında geri getirdiği varsayılmamalıdır.",
        ],
      },
      {
        title: "Önleme ve iyileşmeyi ölçülebilir hedeflerle izle",
        paragraphs: [
          "Sorunu kaynağında azaltmak çoğu zaman sonradan temizlemekten daha etkili olabilir. Yine de müdahalenin başarısı yalnız afiş veya ekipman sayısıyla değil, hedefteki değişimle değerlendirilir: besleyici girişi, çözünmüş oksijen, habitat bağlantısı veya uygun canlı göstergeleri izlenebilir. Önceki durum, karşılaştırma alanı ve zaman ölçeği belirtilmelidir.",
          "Bireysel tasarruf, kamu denetimi, sanayi tasarımı ve uluslararası iş birliği farklı ölçeklerde birbirini tamamlar. Karbon ayak izi sera gazlarını ortak CO₂ eşdeğeriyle, su ayak izi tüketim ve kirlilik boyutlarını, ekolojik ayak izi ise biyolojik üretken alan talebini ele alır. Bu göstergeleri tek birim sanma; birinde azalma diğer bütün etkilerin otomatik ortadan kalkması değildir.",
        ],
      },
      {
        title: "Doğru göstergeyi seç: birey, tür ve derişim ayrı sütunlar",
        paragraphs: [
          "Bir kıyıda toplam kuş sayısı 100’den 120’ye çıkarken tür sayısı 12’den 8’e düşebilir: birey sayısı 20 artmış, tür zenginliği 4 azalmıştır. Birkaç yaygın türün artması kaybolan türleri sayıca örtebilir. Aynı alan, süre ve örnekleme yöntemiyle karşılaştır; yalnız toplam canlı sayısının yükselmesini bütün biyoçeşitliliğin iyileşmesi sayma. Genetik ve ekosistem çeşitliliği de ayrıca izlenir.",
          "Ölçümü mekanizmayla eşleştir: SO₂/azot oksit kaynaklı asit çökelmesinde yağış pH’sı ve ilgili iyonlar; stratosferik ozon kaybında ozon sütunu ve yüzey UV düzeyi incelenebilir. Ozon sütunu birim yüzey üzerindeki hava kolonunda bulunan ozon miktarını özetler. Kalıcı kirletici küçük balıkta 0,2, onu yiyen büyük balıkta 1,2 mg/kg ise derişim oranı 1,2/0,2=6’dır. Bu örüntü trofik büyütülmeyle uyumludur; nedensel yorum için beslenme bağlantısı, yaş ve ölçüm koşulları kontrol edilir. Büyük balığın toplam kirletici kütlesini bulmak için doku kütlesi de gerekir.",
        ],
      },
    ],
    examples: [
      {
        title: "Göl neden oksijensizleşmeye eğilim gösteriyor?",
        prompt:
          "Gübreli yüzey akışı artıyor; sonra alg artışı, organik kalıntı ve yoğun ayrıştırıcı solunumu gözleniyor. Oksijen üzerindeki baskının zincirini kur.",
        strategy:
          "Besleyici girişini doğrudan oksijen miktarı sanma; ara basamakları yaz.",
        steps: [
          {
            label: "Girişi tanımla",
            explanation: "Azot/fosfor girdisi alg üretimini destekleyebilir.",
            expression: "besleyici↑ → alg↑",
          },
          {
            label: "Organik yükü izle",
            explanation: "Alg/bitki ölümü ayrıştırılacak maddeyi artırır.",
            expression: "ölü organik madde↑",
          },
          {
            label: "Solunumu bağla",
            explanation:
              "Aerobik ayrıştırıcı faaliyeti çözünmüş oksijen tüketir.",
            expression: "solunum↑ → O₂ üzerinde azalma baskısı",
          },
        ],
        answer:
          "Ötrofikasyonda artan organik yük ve ayrıştırıcı solunumu oksijen azalmasına katkı verebilir.",
        check:
          "Gündüz alg fotosentezi, karışım ve sıcaklık gerçek ölçümü etkiler.",
        pitfall: "Alg var diye her an O₂ sıfır deme.",
      },
      {
        title: "Çöp filtresi doğru hedef mi?",
        prompt:
          "Göldeki ana sorun çözünmüş fosfor girdisi. Bir ekip yalnız yüzen poşetleri tutan ızgara kuruyor. Müdahaleyi değerlendir.",
        strategy: "Hedef kirletici ile cihazın tuttuğu maddeyi karşılaştır.",
        steps: [
          {
            label: "Sorunu yaz",
            explanation: "Çözünmüş fosfor besleyici yüküdür.",
            expression: "hedef: çözünmüş P",
          },
          {
            label: "Aracı tanı",
            explanation: "Izgara iri katı atıkları tutar.",
            expression: "hedeflenen: katı çöp",
          },
          {
            label: "Uygun önlemi ekle",
            explanation:
              "Gübre kaybını azaltma ve uygun besleyici giderimi gerekir.",
            expression: "kaynak kontrolü + hedef arıtma",
          },
        ],
        answer:
          "Izgara katı çöpe yararlıdır; fosfor sorununu tek başına çözmez.",
        check: "Bir önlem işe yarıyor diye bütün kirleticilere yeterli sayma.",
        pitfall: "Görünür temizliği su kalitesinin tamamı sanma.",
      },
      {
        title: "Sera mı, ozon mu?",
        prompt:
          "A vakası atmosferik CO₂ artışının kızılötesi enerji dengesi; B vakası stratosferik ozon azalmasının morötesi maruziyetiyle ilgilidir. Mekanizmaları ayır.",
        strategy: "Gaz adı, ışınım türü ve atmosfer katmanını birlikte kullan.",
        steps: [
          {
            label: "A’yı sınıfla",
            explanation: "CO₂ artışı güçlenen sera etkisiyle ilişkilidir.",
            expression: "kızılötesi enerji dengesi",
          },
          {
            label: "B’yi sınıfla",
            explanation: "Ozon azalması UV korumasını etkiler.",
            expression: "morötesi soğurma",
          },
          {
            label: "Ortaklığı sınırla",
            explanation:
              "İkisi atmosfer sorunudur ama aynı mekanizma değildir.",
            expression: "sera ≠ ozon incelmesi",
          },
        ],
        answer: "A sera/iklim, B ozon koruması sorunudur.",
        check:
          "Yüzeye yakın ozonun farklı bir kirletici rolü olabileceğini ekle.",
        pitfall: "Ozon deliğini bütün küresel ısınmanın tek nedeni sayma.",
      },
      {
        title: "Yol yapımının görünmeyen etkisi",
        prompt:
          "Bir orman iki parçaya ayrılıyor; toplam ağaç sayısı ilk yıl benzer kalıyor. Kurbağa toplulukları arasında geçiş azalıyor. Sorunu değerlendir.",
        strategy:
          "Sayıyı ve habitat bağlantısını ayrı göstergeler olarak izle.",
        steps: [
          {
            label: "Sayıyı oku",
            explanation:
              "Ağaç sayısı benzer olmakla alanın bütün işlevleri aynı kalmış olmaz.",
            expression: "N benzer",
          },
          {
            label: "Bağlantıyı izle",
            explanation: "Yol hareket ve karşılaşma yolunu azaltabilir.",
            expression: "geçiş azalıyor",
          },
          {
            label: "Uygun yanıtı seç",
            explanation:
              "Türün gereksinimine uygun geçiş ve habitat koruması araştırılır.",
            expression: "bağlantı + izleme",
          },
        ],
        answer:
          "Habitat parçalanması, sayım benzer olsa da bağlantı ve gen alışverişini etkileyebilir.",
        check: "Bir geçidin başarısı tür ve kullanım ölçümüyle doğrulanır.",
        pitfall: "Ağaç sayısı eşitse ekosistem etkilenmemiştir deme.",
      },
    ],
    recall: [
      {
        prompt:
          "Ötrofikasyonda oksijen azalmasına hangi ara süreç katkı sağlar?",
        answer: "Artan ölü organik yükün aerobik ayrıştırıcılarca solunması.",
      },
      {
        prompt: "CO₂ için sıradan partikül filtresi yeterli midir?",
        answer: "Otomatik olarak hayır; gaz ve parçacık hedefleri farklıdır.",
      },
      {
        prompt: "Her elektromanyetik ışınım iyonlaştırıcı mıdır?",
        answer:
          "Hayır. Enerji/frekans ve mekanizma ayrımı yapılır; telefon dalgası sırf ışınım olduğu için radyoaktif sayılmaz.",
      },
      {
        prompt: "Kaynağı kesmek gölü hemen eski durumuna döndürür mü?",
        answer:
          "Hayır. Birikmiş besleyici/organik yük ve ekosistemin toparlanma süresi devam edebilir.",
      },
    ],
    questions: [
      {
        id: "f014-bio-guncel-cevre-sorunlari-1",
        prompt: {
          tr: "Göle azot ve fosfor girişi artıyor; algler çoğalıyor, sonra ölü organik madde ve aerobik ayrıştırıcı solunumu artıyor. Oksijen azalmasına doğrudan katkı veren basamak hangisidir?",
        },
        options: [
          {
            tr: "Artan aerobik ayrıştırıcı solunumu",
          },
          {
            tr: "Dış ortam ışığının her durumda tamamen yok olması",
          },
          {
            tr: "Işığın suya hiç ulaşmaması her durumda zorunluluğu",
          },
          {
            tr: "Bütün suyun anında buharlaşması",
          },
          {
            tr: "Organik maddenin oksijen yaratmadan yok olması",
          },
        ],
        answer: 0,
        hint: {
          tr: "Aerobik solunumun hangi maddeyi tükettiğini düşün.",
        },
        explanation: {
          tr: "Ayrıştırıcılar organik yükü kullanırken çözünmüş oksijen tüketebilir. Besleyici girişinden oksijen azalmasına alg/kalıntı/solunum gibi ara basamaklar vardır; gerçek hız koşullara bağlıdır.",
        },
        skill: "f014-guncel-cevre-sorunlari-1",
      },
      {
        id: "f014-bio-guncel-cevre-sorunlari-2",
        prompt: {
          tr: "Ana sorun çözünmüş fosfor olan bir su girişine yalnız büyük poşetleri tutan ızgara takılıyor. Hangi yorum uygundur?",
        },
        options: [
          {
            tr: "Bütün çözünmüş fosfor zorunlu giderilir",
          },
          {
            tr: "Katı çöpler tutulabilir; çözünmüş fosfor için ayrı hedef önlem gerekir",
          },
          {
            tr: "Su otomatik içilebilir olur",
          },
          {
            tr: "Bütün mikroorganizmalar kesin öldürülür",
          },
          {
            tr: "Ötrofikasyon aynı anda tamamen sonlanır",
          },
        ],
        answer: 1,
        hint: {
          tr: "Aracın tutabildiği madde ile sorunun kimyasal biçimini ayır.",
        },
        explanation: {
          tr: "Izgara iri katı atıkları tutar. Çözünmüş besleyici için kaynak azaltma veya uygun giderim gerekir; cihazın katı çöpe etkisi bütün su kalitesi hedeflerini karşılamaz.",
        },
        skill: "f014-guncel-cevre-sorunlari-2",
      },
      {
        id: "f014-bio-guncel-cevre-sorunlari-3",
        prompt: {
          tr: "Stratosferik ozon azalması ile artan sera etkisi için doğru ayrım hangisidir?",
        },
        options: [
          {
            tr: "İkisi aynı mekanizmanın iki adıdır",
          },
          {
            tr: "CO₂ yalnız UV’yi geçirmediği için etki yapar",
          },
          {
            tr: "Ozon UV korumasıyla; sera etkisi kızılötesi enerji dengesiyle ilişkilidir",
          },
          {
            tr: "Ozon her atmosfer katmanında yalnız yararlıdır",
          },
          {
            tr: "Sera etkisinin doğal bölümü hiç yoktur",
          },
        ],
        answer: 2,
        hint: {
          tr: "Işınım türünü ve atmosfer katmanını birlikte oku.",
        },
        explanation: {
          tr: "Stratosfer ozonu morötesi ışınımın bir bölümünü soğurur. Sera gazları yeryüzünün kızılötesi yayımıyla etkileşir; doğal sera etkisi vardır ve güçlenmesi iklimi etkiler.",
        },
        skill: "f014-guncel-cevre-sorunlari-3",
      },
      {
        id: "f014-bio-guncel-cevre-sorunlari-4",
        prompt: {
          tr: "Asit çökelmesinde sülfürik ve nitrik asit oluşumuyla özellikle ilişkili salımlar hangileridir?",
        },
        options: [
          {
            tr: "Yalnız saf N₂ ve argon",
          },
          {
            tr: "Yalnız helyum ve neon",
          },
          {
            tr: "Yalnız suyun sıvıdan buharlaşması",
          },
          {
            tr: "Kükürt dioksit ve azot oksitler",
          },
          {
            tr: "Bütün ışığın yansıtılması",
          },
        ],
        answer: 3,
        hint: {
          tr: "Asitlerin kükürt ve azot içeriğini düşün.",
        },
        explanation: {
          tr: "SO₂ ve azot oksitlerin atmosferik dönüşümleri asit çökelmesine katkı verir. Doğal CO₂ kaynaklı hafif yağmur asitliğini veya her gazı aynı güçlü asit mekanizmasıyla eşitleme.",
        },
        skill: "f014-guncel-cevre-sorunlari-4",
      },
      {
        id: "f014-bio-guncel-cevre-sorunlari-5",
        prompt: {
          tr: "Telefonun haberleşme radyo dalgaları ile gama ışını için hangi ifade doğrudur?",
        },
        options: [
          {
            tr: "Her radyo dalgası gama ile aynı foton enerjisine sahiptir",
          },
          {
            tr: "Telefon kullanımı çevreye zorunlu radyoaktif izotop döker",
          },
          {
            tr: "Görünür ışık elektromanyetik olmadığı için ayrıdır",
          },
          {
            tr: "Işınım adı geçen her etki aynı doz ve mekanizmayla açıklanır",
          },
          {
            tr: "İkisi de elektromanyetik olabilir; sırf bu yüzden ikisi de iyonlaştırıcı veya radyoaktif madde değildir",
          },
        ],
        answer: 4,
        hint: {
          tr: "Elektromanyetik olmayı iyonlaştırıcı olmakla eşitleme.",
        },
        explanation: {
          tr: "Elektromanyetik ışınımlar farklı frekans ve foton enerjilerine sahiptir. Radyo dalgası sırf ışınım olduğu için iyonlaştırıcı sayılmaz; radyoaktif kirlenme ise radyoaktif maddenin çevrede bulunmasıyla ilgilidir.",
        },
        skill: "f014-guncel-cevre-sorunlari-5",
      },
      {
        id: "f014-bio-guncel-cevre-sorunlari-6",
        prompt: {
          tr: "Bir orman yol ile iki parçaya ayrılıyor; ilk yıl ağaç sayısı benzer kalırken hayvan geçişleri azalıyor. Hangi sonuç uygundur?",
        },
        options: [
          {
            tr: "Habitat bağlantısı ve gen alışverişi ağaç sayısı değişmeden de etkilenebilir",
          },
          {
            tr: "Ekosistem kesin hiç etkilenmemiştir",
          },
          {
            tr: "Tür sayısı aynı gün zorunlu sıfırlanır",
          },
          {
            tr: "Bütün türler yolu aynı rahatlıkta geçer",
          },
          {
            tr: "Tek ölçüt ağaç sayısı olduğu için geçiş verisi önemsizdir",
          },
        ],
        answer: 0,
        hint: {
          tr: "Habitatın miktarı ile bağlantısını ayrı değerlendir.",
        },
        explanation: {
          tr: "Parçalanma hareket, eşleşme ve kaynak erişimini değiştirebilir. Ağaç sayısı benzerliği ekosistemin bütün işlevlerinin korunduğu anlamına gelmez; etki tür ve koşula bağlıdır.",
        },
        skill: "f014-guncel-cevre-sorunlari-6",
      },
      {
        id: "f014-bio-guncel-cevre-sorunlari-7",
        prompt: {
          tr: "Eğimli arazide bitki örtüsü kaldırılıyor. Erozyon riskini azaltmaya uygun yaklaşım hangisidir?",
        },
        options: [
          {
            tr: "Toprağı her yerde daha çıplak bırakmak",
          },
          {
            tr: "Örtüyü korumak ve yüzey akışını eğime uygun uygulamalarla azaltmak",
          },
          {
            tr: "Anızı düzenli yakmak",
          },
          {
            tr: "Bütün yağışı yüzeyde hızlandırmak",
          },
          {
            tr: "Arazinin su tutmasını kasıtlı azaltmak",
          },
        ],
        answer: 1,
        hint: {
          tr: "Üst toprağın taşınmasını ve suyun akışını düşün.",
        },
        explanation: {
          tr: "Bitki örtüsü ve uygun arazi uygulamaları üst toprağın yerinde tutulmasına yardım eder. Çıplaklık, hızlı akış ve yanlış işleme ise birçok koşulda erozyon riskini artırabilir.",
        },
        skill: "f014-guncel-cevre-sorunlari-7",
      },
      {
        id: "f014-bio-guncel-cevre-sorunlari-8",
        prompt: {
          tr: "Göle besleyici girişini azaltan önlem alındığında hangi sonuç tek başına garanti edilemez?",
        },
        options: [
          {
            tr: "Yeni besleyici kaynağının hedeflenmiş olması",
          },
          {
            tr: "İzleme yapılmasının gerekli olması",
          },
          {
            tr: "Biriken organik yükün aynı anda tamamen kaybolması",
          },
          {
            tr: "Geçmişte biriken yükün etkisinin sürebilmesi",
          },
          {
            tr: "Toparlanma hızının çevresel koşullara bağlı olabilmesi",
          },
        ],
        answer: 2,
        hint: {
          tr: "Yeni girişi azaltmak geçmiş stoğu anında silmez.",
        },
        explanation: {
          tr: "Besleyici kaynağını kesmek önemli bir önlemdir; ancak dipteki yük, ayrışma ve diğer çevresel koşullar iyileşme süresini etkiler. Anında tam düzelme bu bilgiden çıkarılamaz.",
        },
        skill: "f014-guncel-cevre-sorunlari-8",
      },
      {
        id: "f014-bio-guncel-cevre-sorunlari-9",
        prompt: {
          tr: "Berrak görünen bir su örneğinin güvenliği hakkında hangi ifade uygundur?",
        },
        options: [
          {
            tr: "Berraksa bütün kimyasal kirleticiler sıfırdır",
          },
          {
            tr: "Berraksa bütün patojenler yoktur",
          },
          {
            tr: "Görünür çöp yoksa arıtma gerekmez",
          },
          {
            tr: "Berraklık mikrop ve çözünmüş kirleticinin yokluğunu tek başına kanıtlamaz",
          },
          {
            tr: "Suyun rengi tek başına tüm kalite ölçümüdür",
          },
        ],
        answer: 3,
        hint: {
          tr: "Gözle görünmeyen kirletici türlerini düşün.",
        },
        explanation: {
          tr: "Mikroorganizmalar ve çözünmüş maddeler gözle seçilmeyebilir. Kullanım amacına uygun mikrobiyolojik ve kimyasal ölçütler gerekir; yalnız görünüşten tam güvenlik kararı verilmez.",
        },
        skill: "f014-guncel-cevre-sorunlari-9",
      },
      {
        id: "f014-bio-guncel-cevre-sorunlari-10",
        prompt: {
          tr: "Bir okul çevre projesinin hedefi göldeki ötrofikasyon baskısını azaltmak. Başarıyı değerlendirmede en uygun gösterge grubu hangisidir?",
        },
        options: [
          {
            tr: "Yalnız afişlerdeki renk sayısı",
          },
          {
            tr: "Yalnız satın alınan çöp kutusunun markası",
          },
          {
            tr: "Yalnız toplantı salonunun alanı",
          },
          {
            tr: "Yalnız proje adının uzunluğu",
          },
          {
            tr: "Besleyici girdisi, çözünmüş oksijen ve uygun biyolojik göstergelerin zaman içindeki değişimi",
          },
        ],
        answer: 4,
        hint: {
          tr: "Başarı ölçütü sorunun neden ve etkisine bağlı olmalıdır.",
        },
        explanation: {
          tr: "Hedef süreç besleyici yükü ve biyolojik oksijen koşullarıyla ilişkilidir. Öncesi/sonrası ve mümkünse karşılaştırma alanı ölçümleri, yalnız faaliyet sayısından daha doğrudan kanıt sağlar.",
        },
        skill: "f014-guncel-cevre-sorunlari-10",
      },
    ],
  },
  {
    id: "dogal-kaynaklar-surdurulebilirlik",
    topic: "detail-36",
    title: "Doğal kaynaklar ve sürdürülebilirlik: bugünü gelecekle dengele",
    objectives: [
      "Kaynak stoğu, yenilenme hızı ve tüketimi aynı bütçede karşılaştır.",
      "Genetik, tür ve ekosistem çeşitliliğiyle koruma yollarını ilişkilendir.",
      "Ayak izi, atık hiyerarşisi ve yaşam döngüsü verileriyle gerekçeli karar ver.",
    ],
    sections: [
      {
        title: "Sürdürülebilirlik yalnız bugünkü miktar değildir",
        paragraphs: [
          "Sürdürülebilir kullanım bugünkü gereksinimleri karşılarken gelecek kuşakların olanaklarını ve ekosistem işlevlerini korumayı gözetir. Bir depoda bugün çok su bulunması, her yıl beslenenden çok çekildiğinde aynı stokun süreceğini göstermez. Nicelik yanında su kalitesi, habitat, eşit erişim ve ekolojik gereksinimler de değerlendirilmelidir.",
          "Yenilenebilir sözcüğü sınırsız anlamına gelmez. Bir ormanın veya yeraltı suyunun yenilenme hızı belirli koşullara bağlıdır; tüketim bu hızı aşabilir. Yenilenmeyen kaynakların geri dönüşümü de bütün kayıpları veya yeni çıkarım gereksinimini otomatik sıfırlamaz. Zaman ölçeğini ve incelenen sistemin sınırını belirtmeden sürdürülebilirlik etiketi yapıştırma.",
        ],
      },
      {
        title: "Kaynak bütçesini giriş ve çıkışla kur",
        paragraphs: [
          "Basit bütçe gelecek stok=önceki stok+yenilenme−kullanım biçimindedir. Başlangıç 100, yıllık yenilenme 20 ve kullanım 30 temsili birimse ilk yıl 90, beşinci yıl 50 kalır. Bu sayılar bir çalışma modelidir; gerçek gölün, ormanın veya balıkçılığın yenilenme hızının her stokta sabit olduğunu iddia etmez.",
          "Modelde kullanım 20’ye düşerse stok 100’de korunabilir. Gerçek doğada aynı aritmetik eşitlik tek başına güvenli kullanım izni değildir: mevsimsellik, eşik, habitat kalitesi, belirsizlik ve diğer canlıların gereksinimleri vardır. Düşük stokta yenilenme değişebilir. Bütçe, kararın gerekli bir parçasıdır ama bütün ekolojik ölçütlerin yerine geçmez.",
        ],
      },
      {
        title: "Çeşitliliğin üç düzeyi farklı şeyleri korur",
        paragraphs: [
          "Genetik çeşitlilik aynı türün bireyleri veya popülasyonları arasındaki kalıtsal farklılıktır. Tür çeşitliliği bir alandaki farklı türleri ve dağılımlarını; ekosistem çeşitliliği farklı habitat ve ekolojik sistemleri ele alır. Bir tarladaki çok sayıda özdeş klon, tek başına yüksek genetik çeşitlilik örneği değildir.",
          "Bütün ağaçlar aynı yaş ve tek tür olacak biçimde bir alanı dikmek, doğal ormanın komünitesini otomatik geri getirmez. Türler arası ilişkiler, toprak canlıları, yapı ve genetik çeşitlilik de önemlidir. Çeşitliliğin işlevlere katkısı vardır ama daha çok tür her koşulda her işlevi kesin aynı oranda artırır gibi sayısal bir yasa kurulamaz.",
        ],
      },
      {
        title: "Endemik, yerli ve tehlikede sözcüklerini ayır",
        paragraphs: [
          "Endemik türün doğal dağılımı belirli bir bölgeyle sınırlıdır; yerli olmak yalnız o bölgede bulunduğu anlamına gelmez. Nesli tehlikede olmak ise yok olma riskiyle ilgili ayrı bir değerlendirmedir. Bir tür hem endemik hem tehlikede olabilir, fakat iki kavram birbirinin tanımı değildir. Sınırlı yayılış habitat kaybına duyarlılığı artırabilir.",
          "Evcil hayvan ırkı ile biyolojik tür aynı sınıflandırma düzeyi değildir. Bir yerel kedi veya köpek ırkının adını görmek onu otomatik bağımsız endemik tür yapmaz. Tür örneklerini doğrulanmış takson ve doğal yayılışla ele al. Koruma gerekçesi yalnız insana ekonomik fayda değil, ekolojik ilişkiler ve canlıların sürekliliğidir.",
        ],
      },
      {
        title: "Yerinde ve yer dışında koruma birbirini tamamlar",
        paragraphs: [
          "Yerinde koruma türü doğal habitatı ve ilişkileriyle korur; millî park, habitat yönetimi, koridor ve uygun av/hasat denetimi buna katkı verebilir. Yer dışında korumada tohum, hücre, gamet veya uygun diğer genetik materyal özel koşullarda saklanabilir. Her materyal aynı yöntemle korunamaz; canlılık ve genetik temsil izlenmelidir.",
          "Gen bankası bir güvence katmanıdır, kaybedilen habitatın bütün işlevlerini tek başına yeniden üretmez. Tohumu saklamak tozlaşmayı, toprak ağını veya bütün komüniteyi saklamak değildir. İzinsiz biyolojik örnek toplama ve taşımaya karşı izin ve denetim önemlidir. Koruma; bilimsel araştırma, yerel topluluklar ve kurumların birlikte çalışmasını gerektirir.",
        ],
      },
      {
        title: "Önce azalt, sonra yeniden kullan ve geri dönüştür",
        paragraphs: [
          "Gereksiz tüketimi önlemek, ürün ömrünü uzatmak ve onarım/yeniden kullanım, atık ortaya çıkmadan kaynak talebini azaltabilir. Geri dönüşüm uygun maddeler için değerlidir ama toplama, ayırma ve işlem sırasında enerji ve madde kayıpları vardır. Bir ürünün geri dönüştürülebilir olması onun her yerde gerçekten toplandığını veya yüzde 100 geri kazanıldığını göstermez.",
          "Yemek israfını azaltmak yalnız çöp miktarını değil, üretimde kullanılan arazi, enerji ve suyu da etkiler. Tehlikeli pil veya elektronik atığı sıradan çöpten ayırmak farklı bir hedefi korur. Tek kullanımlık bir ürünü sürekli daha fazla kullanıp sonra geri dönüştürmeyi bütün sorunların çözümü sayma; toplam kullanım miktarını da izle.",
        ],
      },
      {
        title: "Enerji tercihini yaşam döngüsüyle değerlendir",
        paragraphs: [
          "Güneş ve rüzgâr gibi yenilenebilir kaynaklar işletme sırasında fosil yakıta dayalı üretime göre sera gazı salımlarını azaltabilir. Ancak malzeme çıkarımı, üretim, arazi kullanımı, bakım ve ömrün sonu da değerlendirilmelidir. Yenilenebilir demek hiçbir çevresel etkisi yok demek değildir. Uygun yer seçimi ve habitat koruması önemini korur.",
          "Karşılaştırmada aynı sağlanan hizmet ve aynı dönem kullanılmalıdır. Daha verimli ampulün birim saat tüketimi azalırken kullanım süresi çok artarsa toplam kazanç küçülebilir. Kaynak tasarrufunu yalnız cihaz etiketinden değil, gerçek güç×süre hesabından kontrol et. Enerji verimliliği, talebi azaltma ve temiz üretim birbirini tamamlayan yaklaşımlardır.",
        ],
      },
      {
        title: "Ayak izlerini ve koruma başarısını doğru birimle ölç",
        paragraphs: [
          "Karbon ayak izi, farklı sera gazlarını uygun ortak CO₂ eşdeğeriyle değerlendirir. Su ayak izi üretim zincirindeki tüketim ve kirlilik boyutlarını içerir; yeşil su yağışla ilişkili tüketim, mavi su yüzey/yeraltı suyu tüketimi, gri su ise belirli kalite standardına göre kirliliği özümsemek için tanımlanan gösterge hacmidir. Gri suyu yalnız borudan akan gri renkli su sayma.",
          "Ekolojik ayak izi biyolojik üretken alan talebini ele alır; bu göstergeleri doğrudan tek birim gibi toplama. Verilen örnek katsayılar yer, yöntem ve zamana bağlıdır; bir fincan içeceğe sonsuza dek değişmeyen evrensel su sayısı ezberletme. Koruma başarısını sayılan fidan kadar habitat işlevi, türlerin devamlılığı, genetik temsil ve kaynak kalitesindeki değişimle birlikte izle.",
        ],
      },
      {
        title: "İnsan kullanımı tek çıkış değildir",
        paragraphs: [
          "Akifer, yeraltı suyunu barındıran ve iletebilen jeolojik birimdir. Bir akifere yılda 90 birim su giriyor, 72 birim pompaj ve 30 birim doğal boşalım oluyorsa değişim 90−72−30=−12 birim/yıldır. Yalnız pompajı girişle karşılaştırıp 72<90 diye stok artıyor deme. Diğer akışlar sabitken pompajı 60’a indirmek bu basit bütçeyi dengeler; gerçek güvenli çekim kararı kalite, mevsimsellik ve ekosistem gereksinimlerini de içerir.",
          "Canlı kaynaklarda doğum, ölüm, göç ve av ayrı akışlardır. Bir dönem doğum−doğal ölüm farkı +40 balık; göçle ayrılma 15 ve av 35 ise net değişim 40−15−35=−10 balıktır. Av doğal artıştan küçük olsa da göç nedeniyle stok düşebilir. Net doğal artış verilmişse ölümü ikinci kez çıkarma. Tek yılın artışını geleceğin her yılına sabit garanti olarak taşıma; stokun büyüklüğü ve çevre koşulları yenilenmeyi değiştirebilir.",
        ],
      },
    ],
    examples: [
      {
        title: "Stok azalmasını yıl yıl izle",
        prompt:
          "Başlangıç 100 birim, her yıl sabit 20 birim yenilenme ve 30 birim kullanım olan temsili depoda beş yıl sonu stok nedir?",
        strategy:
          "Önce net yıllık değişimi bul; modelin sabit hız varsayımını koru.",
        steps: [
          {
            label: "Yıllık denge",
            explanation: "Giriş 20, çıkış 30; net değişim−10.",
            expression: "20−30=−10",
          },
          {
            label: "Beş yılı uygula",
            explanation: "Beş aynı dönemde toplam 50 birim azalma olur.",
            expression: "5×10=50",
          },
          {
            label: "Stoku bul",
            explanation: "Başlangıçtan toplam azalmayı çıkar.",
            expression: "100−50=50",
          },
        ],
        answer: "50 temsili birim kalır.",
        check:
          "Bu model gerçek yenilenmenin her stokta sabitliğini kanıtlamaz.",
        pitfall: "Yenilenebilir diye kullanımın sınırsız olduğunu sanma.",
      },
      {
        title: "Kullanım yenilenmeye eşit olursa",
        prompt:
          "Aynı 100 birimlik depoda yıllık yenilenme 20; kullanım 20’ye indiriliyor. Beş yıl stok ve kararın sınırı nedir?",
        strategy: "Aritmetik dengeyi ekolojik yeterlilikten ayır.",
        steps: [
          {
            label: "Neti hesapla",
            explanation: "Giriş ve çıkış eşittir.",
            expression: "20−20=0",
          },
          {
            label: "Dönemleri izle",
            explanation: "Her yıl model stoğu aynı kalır.",
            expression: "100+5×0=100",
          },
          {
            label: "Sınırı ekle",
            explanation: "Kalite, habitat ve mevsimsel eşikler modelde yoktur.",
            expression: "stok sabitliği ≠ bütün güvenlik ölçütleri",
          },
        ],
        answer:
          "Modelde 100 kalır; gerçek sürdürülebilirlik için ek ölçütler gerekir.",
        check:
          "Bir sayısal dengeye dayanarak gerçek su çekme izni sonucu üretme.",
        pitfall: "Eşit bütçeyi bütün ekolojik risklerin yokluğu sayma.",
      },
      {
        title: "Enerji tasarrufu güç ve süreyle hesaplanır",
        prompt:
          "Eski aydınlatma 100 W ile günde 5 saat, yenisi 20 W ile aynı 5 saat çalışıyor. Otuz gündeki enerji farkını bul.",
        strategy: "Aynı hizmet süresinde W×saat hesabını kWh’a çevir.",
        steps: [
          {
            label: "Eski tüketim",
            explanation: "Gücü kW’a çevirip süreyle çarp.",
            expression: "0,100×5×30=15 kWh",
          },
          {
            label: "Yeni tüketim",
            explanation: "Yeni güçle aynı süreyi kullan.",
            expression: "0,020×5×30=3 kWh",
          },
          {
            label: "Farkı bul",
            explanation: "Yeni tüketimi eskiden çıkar.",
            expression: "15−3=12 kWh",
          },
        ],
        answer: "Otuz günde 12 kWh daha az enerji.",
        check:
          "Kullanım süresi artarsa gerçek tasarruf bu sayıdan farklı olabilir.",
        pitfall: "W güç birimini doğrudan kWh enerji birimi sayma.",
      },
      {
        title: "Gen bankası habitatın yerini tutar mı?",
        prompt:
          "Tehlikedeki bir bitkinin tohumları saklanıyor; fakat yaşadığı sulak alan kurutuluyor. Koruma paketini değerlendir.",
        strategy: "Korunan materyal ile kaybedilen ekolojik ilişkileri ayır.",
        steps: [
          {
            label: "Kazancı tanı",
            explanation:
              "Tohum saklama genetik materyale güvence sağlayabilir.",
            expression: "yer dışında koruma",
          },
          {
            label: "Eksiği tanı",
            explanation:
              "Habitat, tozlaştırıcılar ve toprak ilişkileri kaybolabilir.",
            expression: "ekosistem işlevleri korunmadı",
          },
          {
            label: "Tamamlayıcı plan",
            explanation:
              "Habitatı ve uygun popülasyonları koruma/iyileştirme eklenmelidir.",
            expression: "yerinde + yer dışında",
          },
        ],
        answer:
          "Gen bankası değerlidir; habitat korumasının yerine tek başına geçmez.",
        check:
          "Saklanan örneklerin canlılığı ve temsil ettiği genetik çeşitlilik de izlenmelidir.",
        pitfall: "Tohum sayısını bütün ekosistemin korunduğu kanıtı sayma.",
      },
    ],
    recall: [
      {
        prompt: "Yenilenebilir neden sınırsız değildir?",
        answer:
          "Kullanım yenilenme hızını aşabilir; kalite ve habitat da bozulabilir.",
      },
      {
        prompt: "Yerel evcil ırk otomatik endemik tür müdür?",
        answer:
          "Hayır. Irk ve tür farklı sınıflandırma düzeyleridir; endemizm doğal tür yayılışıyla değerlendirilir.",
      },
      {
        prompt: "Geri dönüşüm bütün kayıpları sıfırlar mı?",
        answer:
          "Hayır. Önleme, azaltma, onarım ve yeniden kullanım da önemlidir; işlem kayıpları bulunabilir.",
      },
      {
        prompt: "Gri su ayak izi neyi ifade eder?",
        answer:
          "Belirli kalite standardına göre kirletici yükünü özümsemek için tanımlanan gösterge hacmini; yalnız gri renkli atık suyu değil.",
      },
    ],
    questions: [
      {
        id: "f014-bio-dogal-kaynaklar-surdurulebilirlik-1",
        prompt: {
          tr: "Temsili bir kaynak stoğu 100 birim; her yıl yenilenme 20 ve kullanım 30 birim sabit. Başka giriş/çıkış yok. Beş yıl sonra stok kaç birimdir?",
        },
        options: [
          {
            tr: "50",
          },
          {
            tr: "20",
          },
          {
            tr: "80",
          },
          {
            tr: "100",
          },
          {
            tr: "150",
          },
        ],
        answer: 0,
        hint: {
          tr: "Her yıl net 20−30 değişim uygulanır.",
        },
        explanation: {
          tr: "Yıllık net değişim−10’dur. Beş yılda 50 birim azalır ve 100−50=50 kalır. Bu sabit hız modeli gerçek ekosistem yenilenmesinin bütün koşullardaki biçimini iddia etmez.",
        },
        skill: "f014-dogal-kaynaklar-surdurulebilirlik-1",
      },
      {
        id: "f014-bio-dogal-kaynaklar-surdurulebilirlik-2",
        prompt: {
          tr: "Başlangıç 100 birim, yıllık yenilenme 20 ve kullanım 20 olan basit bütçede başka akış yok. Hangi sonuç uygundur?",
        },
        options: [
          {
            tr: "Stok her yıl 20 artar",
          },
          {
            tr: "Stok modelde 100’de kalır; bu tek başına bütün ekolojik riskleri dışlamaz",
          },
          {
            tr: "Gerçek habitat için bütün güvenlik ölçütleri kesin sağlanmıştır",
          },
          {
            tr: "Su kalitesi zorunlu kusursuzdur",
          },
          {
            tr: "Kaynak artık yenilenmeye gereksinim duymaz",
          },
        ],
        answer: 1,
        hint: {
          tr: "Aritmetik net sıfır ile ekolojik yeterliliği ayır.",
        },
        explanation: {
          tr: "20−20=0 olduğundan model stoğu değişmez. Ancak kalite, mevsimsel eşikler, canlı gereksinimleri ve değişen yenilenme bu dar modelde değerlendirilmemiştir.",
        },
        skill: "f014-dogal-kaynaklar-surdurulebilirlik-2",
      },
      {
        id: "f014-bio-dogal-kaynaklar-surdurulebilirlik-3",
        prompt: {
          tr: "Aynı türün bireylerindeki kalıtsal farklılıklar hangi çeşitlilik düzeyidir?",
        },
        options: [
          {
            tr: "Yalnız ekosistem çeşitliliği",
          },
          {
            tr: "Farklı atom numarası çeşitliliği",
          },
          {
            tr: "Genetik çeşitlilik",
          },
          {
            tr: "Zorunlu tür sayısı artışı",
          },
          {
            tr: "Sadece habitat alanı büyüklüğü",
          },
        ],
        answer: 2,
        hint: {
          tr: "Aynı tür içinde değişen özellikleri düşün.",
        },
        explanation: {
          tr: "Genetik çeşitlilik tür içindeki kalıtsal farklılıklardır. Aynı türden daha çok birey veya çok sayıda özdeş klon olması tek başına bu çeşitliliğin yüksek olduğunu göstermez.",
        },
        skill: "f014-dogal-kaynaklar-surdurulebilirlik-3",
      },
      {
        id: "f014-bio-dogal-kaynaklar-surdurulebilirlik-4",
        prompt: {
          tr: "Bir türün doğal yayılışı yalnız belirli bir bölgeyle sınırlıdır. Hangi terim doğrudan uygundur?",
        },
        options: [
          {
            tr: "Kesin evcil ırk",
          },
          {
            tr: "Her yerde yayılış gösteren tür",
          },
          {
            tr: "Zorunlu istilacı tür",
          },
          {
            tr: "Endemik tür",
          },
          {
            tr: "Kesin soyu tükenmiş tür",
          },
        ],
        answer: 3,
        hint: {
          tr: "Dağılım sınırı ile yok olma riskini ayır.",
        },
        explanation: {
          tr: "Endemizm doğal yayılışın belirli bölgeyle sınırlı olmasıdır. Tür tehlikede olabilir ama bu ayrıca değerlendirilir; evcil ırkla veya yok olmuş olmakla aynı kavram değildir.",
        },
        skill: "f014-dogal-kaynaklar-surdurulebilirlik-4",
      },
      {
        id: "f014-bio-dogal-kaynaklar-surdurulebilirlik-5",
        prompt: {
          tr: "Bir bitkinin tohumlarının gen bankasında saklanması için hangi yorum doğrudur?",
        },
        options: [
          {
            tr: "Doğal habitat artık gereksizdir",
          },
          {
            tr: "Bütün toprak canlıları aynı anda saklanmıştır",
          },
          {
            tr: "Bütün bireylerin genetiği zorunlu temsil edilir",
          },
          {
            tr: "Türün doğadaki tüm riskleri kesin sıfırlanır",
          },
          {
            tr: "Yer dışında koruma sağlar; habitat ve ekolojik ilişkileri tek başına korumaz",
          },
        ],
        answer: 4,
        hint: {
          tr: "Saklanan materyal ile bütün ekosistemi ayır.",
        },
        explanation: {
          tr: "Gen bankası genetik materyali korumaya katkı verir. Canlılık, temsil ve yöntem izlenmelidir; habitat, tozlaştırıcı ve komünite ilişkilerini bütünüyle yerine koymaz.",
        },
        skill: "f014-dogal-kaynaklar-surdurulebilirlik-5",
      },
      {
        id: "f014-bio-dogal-kaynaklar-surdurulebilirlik-6",
        prompt: {
          tr: "Bir ürünün kullanım ömrü uzatılıp onarılarak tekrar kullanılması hangi yaklaşımla uyumludur?",
        },
        options: [
          {
            tr: "Yeni kaynak talebini ve atık oluşumunu azaltma",
          },
          {
            tr: "Her zaman daha çok tek kullanımlık ürün tüketme",
          },
          {
            tr: "Geri dönüşümün bütün kayıpları yok ettiğini kanıtlama",
          },
          {
            tr: "Bütün tehlikeli atığı suya verme",
          },
          {
            tr: "İsrafı kaynak yenilenmesi sayma",
          },
        ],
        answer: 0,
        hint: {
          tr: "Atık ortaya çıkmadan önceki basamağı düşün.",
        },
        explanation: {
          tr: "Onarım ve yeniden kullanım ürün ömrünü uzatıp yeni üretim talebini azaltabilir. Geri dönüşüm ayrıca değerlidir fakat her yerde yüzde 100 kazanım sağladığı varsayılmaz.",
        },
        skill: "f014-dogal-kaynaklar-surdurulebilirlik-6",
      },
      {
        id: "f014-bio-dogal-kaynaklar-surdurulebilirlik-7",
        prompt: {
          tr: "Aydınlatma 100 W’tan 20 W’a düşürülüyor; ikisi de günde 5 saat, 30 gün kullanılıyor. Enerji tasarrufu kaç kWh’tır?",
        },
        options: [
          {
            tr: "3",
          },
          {
            tr: "12",
          },
          {
            tr: "5",
          },
          {
            tr: "15",
          },
          {
            tr: "120",
          },
        ],
        answer: 1,
        hint: {
          tr: "Güç farkını kW’a çevirip toplam saatle çarp.",
        },
        explanation: {
          tr: "Güç farkı 80 W=0,08 kW; süre 150 saattir. 0,08×150=12 kWh tasarruf olur. Güç ile enerji birimleri farklıdır.",
        },
        skill: "f014-dogal-kaynaklar-surdurulebilirlik-7",
      },
      {
        id: "f014-bio-dogal-kaynaklar-surdurulebilirlik-8",
        prompt: {
          tr: "Bir enerji kaynağının yenilenebilir olması hangi iddiayı tek başına doğrulamaz?",
        },
        options: [
          {
            tr: "İşletme ve yaşam döngüsünün ayrı incelenebileceğini",
          },
          {
            tr: "Yer seçiminin ekolojik değerlendirme gerektirebileceğini",
          },
          {
            tr: "Üretim, malzeme ve arazi kullanımı dâhil hiçbir çevresel etkisinin olmadığını",
          },
          {
            tr: "Aynı hizmet için karşılaştırma yapılmasının uygun olduğunu",
          },
          {
            tr: "Kaynak ve talep yönetiminin birlikte ele alınabileceğini",
          },
        ],
        answer: 2,
        hint: {
          tr: "Yenilenebilir etiketi bütün yaşam döngüsünü sıfır etki yapmaz.",
        },
        explanation: {
          tr: "Malzeme çıkarımı, tesis üretimi, habitat ve ömrün sonu gibi etkiler bulunabilir. Yenilenebilir kaynaklar yararlı seçenekler olabilir; fakat bütün etkiler sıfırmış gibi genellenemez.",
        },
        skill: "f014-dogal-kaynaklar-surdurulebilirlik-8",
      },
      {
        id: "f014-bio-dogal-kaynaklar-surdurulebilirlik-9",
        prompt: {
          tr: "Gri su ayak izi için doğru açıklama hangisidir?",
        },
        options: [
          {
            tr: "Yalnız rengi gri olan bütün boru suları",
          },
          {
            tr: "Atmosferdeki bütün su buharı",
          },
          {
            tr: "Yalnız yağış suyunun tüketimi",
          },
          {
            tr: "Belirli kalite standardına göre kirletici yükünü özümsemek için tanımlanan gösterge hacmi",
          },
          {
            tr: "Sera gazlarının kilogram CO₂ eşdeğeri",
          },
        ],
        answer: 3,
        hint: {
          tr: "Gösterge tanımı ile suyun görünür rengini ayır.",
        },
        explanation: {
          tr: "Gri su ayak izi bir kirlilik göstergesi hacmidir; suyun rengi veya yalnız belirli evsel atık su hattıyla eşitlenmez. Yeşil ve mavi bileşenler farklı tüketim kaynaklarını ele alır.",
        },
        skill: "f014-dogal-kaynaklar-surdurulebilirlik-9",
      },
      {
        id: "f014-bio-dogal-kaynaklar-surdurulebilirlik-10",
        prompt: {
          tr: "Tek tür ve aynı yaşta ağaçlar dikilen alan, eski doğal ormanın yerini alıyor. Hangi sonuç yalnız bu dikimden kesin çıkarılamaz?",
        },
        options: [
          {
            tr: "Dikim yapılmış olduğu",
          },
          {
            tr: "Yeni ağaçların tek tür seçildiği",
          },
          {
            tr: "Toprak canlıları ve habitat yapısının ayrıca izlenebileceği",
          },
          {
            tr: "Koruma başarısı için yalnız fidan sayısının yeterli ölçüt olmadığı",
          },
          {
            tr: "Eski komünitenin genetik, tür ve ekosistem işlevlerinin tamamının geri geldiği",
          },
        ],
        answer: 4,
        hint: {
          tr: "Fidan sayısı ile ekolojik restorasyonun bütününü ayır.",
        },
        explanation: {
          tr: "Doğal orman çok sayıda tür, yapı ve ilişki içerir. Tek tip dikim bazı işlevleri desteklese de bütün eski çeşitliliği ve işlevleri otomatik yeniden kurmaz; ek izleme gerekir.",
        },
        skill: "f014-dogal-kaynaklar-surdurulebilirlik-10",
      },
    ],
  },
];

const source =
  "MEBİ TYT Biyoloji Konu Özetleri, basılı s. 145–171 (PDF 147–173): ekoloji, beslenme, enerji akışı, madde döngüleri, çevre ve koruma. Aurelia TYT Biyoloji 031–036 öğretim kağıtlarıyla karşılaştırılmış özgün anlatımlar, modeller ve öğretim soruları; resmî sınav sorusu aktarımı değildir.";
export const forge014BiologyGuides: LessonGuide[] = data.map((d) => ({
  id: d.id,
  minutes: 40,
  objectives: d.objectives,
  sections: d.sections,
  examples: d.examples,
  recall: d.recall,
  source,
}));
export const forge014BiologyTopics: Record<string, string> = Object.fromEntries(
  data.map((d) => [d.id, d.topic]),
);
export const forge014BiologyLessons: Lesson[] = data.map((d) => ({
  id: d.id,
  subjectId: "tyt-biyoloji",
  title: txt(d.title),
  minutes: 40,
  objectives: d.objectives.map(txt),
  body: d.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join(" ")),
  })),
  questions: d.questions,
  source: txt(source),
  tags: ["kaynakli", "etkilesimli", "forge014"],
}));
