import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

const finite020 = (v: number, low: number, high: number) =>
  Number.isFinite(v) && v >= low && v <= high;
const integer020 = (v: number, low: number, high: number) =>
  Number.isInteger(v) && finite020(v, low, high);
const bool020 = (v: boolean) => typeof v === "boolean";

export const femaleSites020 = {
  ovary: "Yumurtalık",
  tube: "Yumurta kanalı",
  uterus: "Rahim",
  cervix: "Serviks",
  vagina: "Vajina",
} as const;
/** A route experiment after release, not a fertility or ectopic-pregnancy diagnosis. */
export function femaleRoute020(
  site: keyof typeof femaleSites020,
  tubeOpen: boolean,
  step: number,
) {
  if (
    !Object.hasOwn(femaleSites020, site) ||
    !bool020(tubeOpen) ||
    !integer020(step, 0, 4)
  )
    throw new RangeError("FEMALE_ROUTE020");
  const positions = [
    "Yumurtalık",
    "Kanal girişi",
    "Yumurta kanalı",
    "Rahim boşluğu",
    "Endometriyum",
  ];
  const arrived = tubeOpen ? step : Math.min(step, 1);
  const functions = {
    ovary: "Oosit gelişimi ve eşey hormonu üretimi",
    tube: "Döllenme, ilk bölünmeler ve rahme taşıma",
    uterus: "Endometriyumda tutunma ve gelişim ortamı",
    cervix: "Rahim ile vajina arasında geçit ve mukus",
    vagina: "Dışa açılan üreme ve doğum yolu",
  };
  return {
    site,
    tubeOpen,
    step,
    arrived,
    position: positions[arrived],
    selected: femaleSites020[site],
    function: functions[site],
    blocked: !tubeOpen && step >= 2,
    implantationSite: "Endometriyum",
    urinarySeparate: true,
  };
}

export const gameteModes020 = {
  sperm: "Sperm yolu",
  oocyte: "Oosit yolu",
} as const;
export const gameteStages020 = {
  primary: "Birincil hücre",
  secondary: "Mayoz I sonrası",
  products: "Son ürün ve olgunlaşma",
} as const;
/** One primary cell after S; sperm final stage includes postmeiotic maturation. C is one unreplicated haploid genome. First polar body does not divide here. */
export function gametogenesis020(
  mode: keyof typeof gameteModes020,
  stage: keyof typeof gameteStages020,
  fertilizationSignal: boolean,
  n: number,
) {
  if (
    !Object.hasOwn(gameteModes020, mode) ||
    !Object.hasOwn(gameteStages020, stage) ||
    !bool020(fertilizationSignal) ||
    !integer020(n, 1, 23)
  )
    throw new RangeError("GAMETOGENESIS020");
  const complete =
    stage === "products" && (mode === "sperm" || fertilizationSignal);
  const primary = stage === "primary";
  const mainCells = mode === "sperm" ? (primary ? 1 : complete ? 4 : 2) : 1;
  const polarBodies = mode === "sperm" || primary ? 0 : complete ? 2 : 1;
  return {
    mode,
    stage,
    fertilizationSignal,
    n,
    complete,
    mainCells,
    polarBodies,
    totalCells: mainCells + polarBodies,
    chromosomesPerMainCell: primary ? 2 * n : n,
    chromatidsPerMainCell: primary ? 4 * n : complete ? n : 2 * n,
    dnaC: primary ? 4 : complete ? 1 : 2,
    functionalGametes: complete ? (mode === "sperm" ? 4 : 1) : 0,
    name:
      mode === "sperm"
        ? primary
          ? "Birincil spermatosit"
          : complete
            ? "Spermatitten olgunlaşmış sperm"
            : "İkincil spermatosit"
        : primary
          ? "Birincil oosit; profaz I"
          : complete
            ? "Ovum; çekirdek birleşmesi öncesi"
            : "İkincil oosit; metafaz II",
    paused: mode === "oocyte" && !complete,
  };
}

const lerp020 = (anchors: [number, number][], day: number) => {
  const next = anchors.findIndex(([d]) => d >= day);
  if (next <= 0) return anchors[0][1];
  const [x0, y0] = anchors[next - 1],
    [x1, y1] = anchors[next];
  return y0 + ((y1 - y0) * (day - x0)) / (x1 - x0);
};
/** Fixed 28-day teaching timeline; relative units are invented, not measured or a calendar contraception tool. */
export function menstrual020(day: number, hcg: boolean) {
  if (!integer020(day, 1, 28) || !bool020(hcg))
    throw new RangeError("MENSTRUAL020");
  const supported = hcg && day >= 20;
  const estrogen = lerp020(
    [
      [1, 15],
      [5, 20],
      [10, 55],
      [12, 90],
      [14, 50],
      [16, 35],
      [21, 60],
      [24, 50],
      [28, 15],
    ],
    day,
  );
  const progesterone = lerp020(
    [
      [1, 5],
      [13, 5],
      [14, 10],
      [17, 50],
      [21, 85],
      [24, 65],
      [28, 5],
    ],
    day,
  );
  const lh = lerp020(
    [
      [1, 8],
      [11, 8],
      [12, 15],
      [13, 45],
      [14, 100],
      [15, 25],
      [16, 8],
      [28, 8],
    ],
    day,
  );
  const fsh = lerp020(
    [
      [1, 22],
      [5, 18],
      [11, 10],
      [14, 35],
      [16, 12],
      [24, 10],
      [28, 22],
    ],
    day,
  );
  return {
    day,
    hcg,
    supported,
    estrogen: supported ? Math.max(estrogen, 60) : estrogen,
    progesterone: supported ? Math.max(progesterone, 80) : progesterone,
    lh,
    fsh: supported ? 10 : fsh,
    ovarian:
      day < 14 ? "Folikül evresi" : day === 14 ? "Ovulasyon" : "Luteal evre",
    uterine: day <= 5 ? "Kanama" : day < 15 ? "Çoğalma" : "Salgı",
    feedback:
      day >= 12 && day <= 14
        ? "Yüksek östrojen ile LH artışı"
        : day >= 15
          ? "Progesteron ile baskı"
          : "Düşük östrojen ile baskı",
    corpus:
      day < 15
        ? "Henüz oluşmadı"
        : supported
          ? "hCG desteği var"
          : day >= 25
            ? "Destek yok; geriler"
            : "Progesteron üretir",
  };
}

export const embryoStages020 = {
  cleavage: "Segmentasyon",
  blastocyst: "Blastosist",
  layers: "Üç tabaka",
} as const;
export const embryoLayers020 = {
  ecto: "Ektoderm",
  meso: "Mezoderm",
  endo: "Endoderm",
} as const;
export function embryo020(
  stage: keyof typeof embryoStages020,
  divisions: number,
  layer: keyof typeof embryoLayers020,
) {
  if (
    !Object.hasOwn(embryoStages020, stage) ||
    !integer020(divisions, 0, 5) ||
    !Object.hasOwn(embryoLayers020, layer)
  )
    throw new RangeError("EMBRYO020");
  const cellCount = stage === "cleavage" ? 2 ** divisions : null;
  const targets = {
    ecto: "Sinir sistemi ve deri epidermisi",
    meso: "Kas, kemik, dolaşım ve böbrek dokuları",
    endo: "Sindirim ve solunum epitelinin büyük bölümü",
  };
  return {
    stage,
    divisions,
    layer,
    cellCount,
    totalVolume: stage === "cleavage" ? 128 : null,
    volumePerCell: cellCount === null ? null : 128 / cellCount,
    selectedLayer: embryoLayers020[layer],
    target: targets[layer],
    ploidy: "2n",
    implantation: stage === "blastocyst",
    differentiated: stage === "layers",
  };
}

/** All else controlled; observed effect signs do not uniquely identify predation versus parasitism. */
export function community020(
  aloneA: number,
  aloneB: number,
  togetherA: number,
  togetherB: number,
) {
  if (
    ![aloneA, aloneB].every((v) => integer020(v, 1, 30)) ||
    ![togetherA, togetherB].every((v) => integer020(v, 0, 30))
  )
    throw new RangeError("COMMUNITY020");
  const deltaA = togetherA - aloneA,
    deltaB = togetherB - aloneB;
  const sign = (v: number) => (v > 0 ? "+" : v < 0 ? "−" : "0");
  const pair = [sign(deltaA), sign(deltaB)];
  const plus = pair.filter((x) => x === "+").length,
    minus = pair.filter((x) => x === "−").length;
  const interpretation =
    plus === 2
      ? "Mutualizm ile uyumlu"
      : minus === 2
        ? "Rekabet ile uyumlu"
        : plus === 1 && minus === 1
          ? "Avlanma veya parazitlik ile uyumlu"
          : plus === 1
            ? "Kommensalizm ile uyumlu"
            : minus === 1
              ? "Amensalizm ile uyumlu"
              : "Bu ölçümde net etki yok";
  return {
    aloneA,
    aloneB,
    togetherA,
    togetherB,
    deltaA,
    deltaB,
    pair,
    interpretation,
    causalLimit:
      "Birlikte ölçülen sayı tek başına ilişki mekanizmasını kanıtlamaz.",
  };
}

/** Flow counts belong to one equal period. Growth slope is a separate instantaneous logistic rate, not a time-stepped head count. */
export function population020(
  initial: number,
  births: number,
  deaths: number,
  incoming: number,
  outgoing: number,
  area: number,
  capacity: number,
  r: number,
) {
  if (
    ![initial, births, deaths, incoming, outgoing].every((v) =>
      integer020(v, 0, 1000),
    ) ||
    deaths + outgoing > initial + births + incoming ||
    !finite020(area, 1, 100) ||
    !finite020(capacity, 1, 1000) ||
    !finite020(r, 0, 1)
  )
    throw new RangeError("POPULATION020");
  const change = births + incoming - deaths - outgoing,
    final = initial + change;
  const growthSlope = r * initial * (1 - initial / capacity);
  return {
    initial,
    births,
    deaths,
    incoming,
    outgoing,
    area,
    capacity,
    r,
    change,
    final,
    density: final / area,
    percentage: initial === 0 ? null : (change / initial) * 100,
    growthSlope,
  };
}

export const nucleicKinds020 = {
  dna: "Çift zincirli DNA",
  rna: "Tek zincirli RNA",
} as const;
export function nucleic020(
  kind: keyof typeof nucleicKinds020,
  sequence: string,
  circular: boolean,
) {
  if (
    !Object.hasOwn(nucleicKinds020, kind) ||
    typeof sequence !== "string" ||
    !bool020(circular) ||
    !(kind === "dna" ? /^[ACGT]{1,12}$/ : /^[ACGU]{1,12}$/).test(sequence)
  )
    throw new RangeError("NUCLEIC020");
  const bases = { A: 0, C: 0, G: 0, T: 0, U: 0 };
  for (const b of sequence) bases[b as keyof typeof bases]++;
  const pair: Record<string, string> = { A: "T", T: "A", G: "C", C: "G" };
  const complement =
    kind === "dna" ? [...sequence].map((b) => pair[b]).join("") : null;
  const length = sequence.length,
    strands = kind === "dna" ? 2 : 1;
  const totals =
    kind === "dna"
      ? {
          A: bases.A + bases.T,
          T: bases.A + bases.T,
          C: bases.C + bases.G,
          G: bases.C + bases.G,
          U: 0,
        }
      : bases;
  return {
    kind,
    sequence,
    circular,
    complement,
    reverseComplement:
      complement === null ? null : [...complement].reverse().join(""),
    length,
    strands,
    nucleotides: strands * length,
    phosphodiester: strands * (circular ? length : length - 1),
    hydrogen:
      kind === "dna" ? 2 * (bases.A + bases.T) + 3 * (bases.C + bases.G) : null,
    totals,
    sugar: kind === "dna" ? "Deoksiriboz" : "Riboz",
  };
}

export const discoveryExperiments020 = {
  griffith: "Griffith",
  avery: "Avery ve ekip",
  phage: "Hershey ve Chase",
} as const;
export const discoveryConditions020 = {
  griffith: {
    R: "Canlı R",
    S: "Canlı S",
    deadS: "Isıyla ölü S",
    mix: "Canlı R + ölü S",
  },
  avery: {
    none: "Enzim yok",
    dnase: "DNaz",
    rnase: "RNaz",
    protease: "Proteaz",
  },
  phage: { P32: "DNA işaretli ³²P", S35: "Kılıf işaretli ³⁵S" },
} as const;
export function discovery020(
  experiment: keyof typeof discoveryExperiments020,
  condition: string,
) {
  if (
    !Object.hasOwn(discoveryExperiments020, experiment) ||
    !Object.hasOwn(discoveryConditions020[experiment], condition)
  )
    throw new RangeError("DISCOVERY020");
  const transformed =
    experiment === "avery"
      ? condition !== "dnase"
      : experiment === "griffith" && condition === "mix";
  return {
    experiment,
    condition,
    transformed,
    mouseSurvives:
      experiment === "griffith"
        ? condition === "R" || condition === "deadS"
        : null,
    livingS:
      experiment === "griffith"
        ? condition === "S" || condition === "mix"
        : experiment === "avery"
          ? transformed
          : null,
    signal:
      experiment === "phage"
        ? condition === "P32"
          ? "Çoğu işaret çökelti içinde"
          : "Çoğu işaret üst sıvıda"
        : null,
    conclusion:
      experiment === "griffith"
        ? "Aktarılabilir kalıtsal değişim; maddenin kimliği bu deneyde belirlenmez."
        : experiment === "avery"
          ? "Bu kontrollü özütte dönüşüm için sağlam DNA gereklidir."
          : "İncelenen T2 fajında hücreye giren kalıtım maddesi DNA ile uyumludur.",
  };
}

type Item020 = [
  string,
  string,
  [string, string, string, string],
  string,
  string,
];
type Unit020 = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: LessonGuide["recall"];
  items: Item020[];
  source: string;
};

// Authored teaching payload follows. Source files and private identifiers are never bundled.
const data: Unit020[] = [
  {
    id: "ureme-kadin-organlar",
    topic: "detail-322",
    title: "Kadın üreme organları: yapı, yol ve görev",
    minutes: 65,
    objectives: [
      "Yumurtalık, tüp, rahim, serviks ve vajinayı yerleri ve işlevleriyle birlikte tanı.",
      "Oositin taşınmasını, döllenmeyi ve implantasyonu farklı olaylar olarak sırala.",
      "Folikül, endometriyum ve kas tabakasını hücre ve doku ölçeğinde açıkla.",
      "Üreme ve idrar yollarını, hormonun kan yolunu ve yardımcı üreme işlemlerini ayır.",
    ],
    sections: [
      {
        title: "Önce görevleri yerlerine yerleştir",
        paragraphs: [
          "Üreme sistemini tek bir boşluk olarak değil, birbirine bağlı fakat farklı iş yapan organlar dizisi olarak düşün. Yumurtalıklar oositlerin geliştiği gonadlardır. Yumurta kanalları oositi yakalar ve rahme doğru taşır. Rahim gelişen embriyo için ortam oluşturur. Rahim ağzı, yani serviks, rahim ile vajina arasındaki dar geçittir; vajina dışarıya açılır.",
          "Bu dizide hücre üretimi, taşıma, döllenme ve gelişim aynı yer ve aynı olay değildir. Normal insan üremesinde döllenme çoğunlukla yumurta kanalında, yerleşme rahmin endometriyumunda olur. Bir şekli incelerken önce organın adını, sonra içinde gerçekleşen olayı söyle; yalnız sırayı ezberlemek benzer görünen seçenekleri ayırmaya yetmez.",
        ],
      },
      {
        title: "Yumurtalık bir kanal değil, iki görevli gonaddır",
        paragraphs: [
          "Bir çift yumurtalık alt karın boşluğunda rahmin iki yanında, bağ dokusuyla desteklenmiş olarak bulunur. Oosit gelişimi bu organlarda gerçekleşir. Yumurtalık ayrıca östrojen ve progesteron gibi eşey hormonlarını üretir. Hücre üretimi ile hormon üretimini birlikte yapması, bu organın hem üreme hem endokrin sistemle ilişkili olmasını sağlar.",
          "Hormonlar özel hedeflere kanla taşınır; yumurta kanalının içinde hormon akması gerekmez. Bir tüp geçişinin kapanması, yumurtalığın hormon üreten bütün hücrelerinin de zorunlu olarak işlevsiz kaldığı anlamına gelmez. Şemada bir oositi tüp boyunca izlerken kanda giden hormon sinyalini ayrı bir rota olarak düşün.",
        ],
      },
      {
        title: "Folikülde oosit ile destek hücrelerini ayır",
        paragraphs: [
          "Folikül, gelişen oositi çevreleyen destek hücreleriyle birlikte bir yapıdır. Oosit tek hücredir; folikül onunla özdeş değildir. Çevredeki hücreler beslenme ve korunmaya katkı verir, hormon üretiminde görev alır. Folikül büyürken hem oosit hem çevresindeki hücresel düzen değişir; sıvı dolu bir boşluk da gelişebilir.",
          "Folikül hücrelerinin östrojen üretmesi ile oositin mayoz geçirmesi farklı görevlerdir. Örneğin bir görselde büyük bir folikülün içinde küçük bir oosit işaretlenmişse, bütün folikülün tek bir dev yumurta hücresi olduğunu söyleme. Ovulasyonda oosit ve onu saran bazı hücreler serbestleşir; geride kalan folikül dokusu başka bir yapıya dönüşür.",
        ],
      },
      {
        title: "Oosit rezervi doğumdan önce oluşmaya başlar",
        paragraphs: [
          "Oogonyumların çoğalması ve birincil oositlerin oluşması embriyonik dönemde başlar. Birincil oositler mayozun profaz I evresinde bekleyebilir. Kaynakta yeni doğanda iki yumurtalıkta toplam yaklaşık 1–2 milyon folikül bulunduğu, bunların yalnız birkaç yüzünün üreme dönemi boyunca ovulasyona ulaşabildiği anlatılır. Sayılar bireyler arasında değişir.",
          "Her folikülün mutlaka olgunlaşıp yumurta olarak atılacağı sonucu çıkmaz; büyük kısmı zamanla geriler ve geri emilir. Ergenlik, sıfırdan bütün oositlerin üretildiği başlangıç değildir; önceden başlamış gelişimin hormonal denetimle ilerlemesidir. Menopozda foliküler etkinlik ve ovulasyon sonlanır; bu durum bir yaş sayısından bağımsız olarak biyolojik süreçle tanımlanır.",
        ],
      },
      {
        title: "Tüpün saçaklı girişi ve oositin taşınması",
        paragraphs: [
          "Yumurta kanalı rahimden yumurtalık yakınına uzanan bir tüptür. Yumurtalığa yakın huni biçimli ucunda saçaklar bulunur. Yumurtalık ile tüp arasında kesintisiz, kapalı bir boru bağlantısı yoktur; serbestleşen oosit bu uç tarafından yakalanarak tüpe alınır. Tüpün diğer ucu rahim boşluğuna açılır.",
          "İç yüzeydeki silli epitel ve duvardaki düz kas hareketleri taşınmaya katkı sağlar. Oositin kendi kamçısıyla yüzerek rahme gittiğini düşünme. Epitel salgıları da uygun ortamın parçasıdır. Etkileşimde ilerleme adımı, bu mekanizmaları kavramak için bir sıra göstergesidir; gerçek taşıma hızının veya gün gün kişinin durumunun ölçümü değildir.",
        ],
      },
      {
        title: "Döllenme ile ilk mitozların yeri",
        paragraphs: [
          "Sperm uygun koşullarda yumurta kanalındaki ikincil oosite ulaşırsa döllenme başlayabilir. Gametlerin haploit çekirdek katkıları bir araya gelerek diploit zigotun kalıtsal düzenini kurar. Oositin mayoz II’yi tamamlaması da bu süreçte uyarılır. Döllenme rahimde embriyonun tutunmasıyla aynı olay değildir.",
          "Zigot rahme doğru taşınırken ilk mitoz bölünmelerini yapar. Böylece bir hücreli yapı daha çok hücreli erken embriyoya dönüşür. Normal güzergâhta önce döllenme, sonra ilk bölünmeler, daha sonra rahim iç yüzeyine yerleşme görülür. Bu sırayı tersine çeviren bir seçenek, organ adları tek tek doğru görünse bile yanlış olabilir.",
        ],
      },
      {
        title: "Rahimde iç yüzey ile kas duvarı farklıdır",
        paragraphs: [
          "Rahim, idrar kesesinin arkasında yer alan kalın duvarlı, kaslı ve esnek bir organdır. İç yüzeyi endometriyumdur; epitel, bezler, bağ dokusu ve damarlar birlikte bu tabakaya katkı verir. Damar ağı ve bez salgıları, erken gelişim ve yerleşme için uygun ortamın hazırlanmasında önemlidir.",
          "Daha dıştaki kas tabakası miyometriyumdur; gebelik boyunca esneyebilir ve doğumdaki kasılmalara katılır. Endometriyumun hormonlara yanıtla kalınlaşması, rahmin bütün kas dokusunun her ay dökülmesi değildir. Adet kanamasında işlevsel iç tabakanın bir bölümü kaybedilir; rahmin tamamı ortadan kalkıp yeniden yapılmaz.",
        ],
      },
      {
        title: "Serviks, vajina ve üretranın ayrı açıklıkları",
        paragraphs: [
          "Serviks rahmin vajinaya açılan boyun bölümüdür. Buradaki mukus ve geçit özellikleri üreme sürecinin parçasıdır. Vajina esnek kaslı bir kanaldır; spermin bırakıldığı bölge, adet içeriğinin dışarı çıkış yolu ve normal vajinal doğumda doğum kanalının bir bölümüdür.",
          "Kadınlarda üretra, vajinadan ayrı bir idrar çıkış yoludur. Mesaneden gelen idrarın rahim veya vajinadan geçmesi gerekmez. Aynı alt vücut bölgesinde bulunmaları organları tek sisteme dönüştürmez. Erkekte üretranın hem idrar hem semen taşımada rol alması bilgisi, kadına aynen uygulanamaz.",
        ],
      },
      {
        title: "Yerleşmenin yeri ve tüp geçişinin önemi",
        paragraphs: [
          "Normal implantasyonda blastosist endometriyuma tutunur ve içine yerleşir. Tüpün taşıma işlevi bu konuma ulaşmayı destekler. Bir oositin salınmış olması, döllenmiş olması ve normal yerleşmiş olması üç ayrı koşuldur; tek birinin gerçekleşmesi diğerlerini garanti etmez.",
          "Embriyonun rahim boşluğu dışında yerleşmesi dış gebeliktir; en sık tüplerde görülür, fakat yalnız tüp anlamına gelmez. Tüp tıkanıklığı veya epitel hasarı doğal geçişi etkileyebilir. Etkileşimde yolu kapatmak bu görevin mantığını gösterir; bir kişinin doğurganlığına veya belirli bir hastalığına tanı koymaz.",
        ],
      },
      {
        title: "IVF hangi basamağı başka ortamda gerçekleştirir?",
        paragraphs: [
          "İn vitro fertilizasyonda oositler ve spermler laboratuvar ortamında bir araya getirilir; uygun erken embriyo daha sonra rahme aktarılır. Mikroenjeksiyon, tek bir spermin oosit içine verilmesini içeren yardımcı bir yöntemdir. Hedef, döllenme basamağını desteklemektir; bundan sonra embriyonun uygun gelişim ve yerleşme koşullarına hâlâ ihtiyacı vardır.",
          "Kaynaklardaki dört, sekiz hücreli veya daha ileri transfer örnekleri belirli uygulama aşamalarını gösterir; bütün IVF işlemlerinde değişmez tek hücre sayısı kuralı değildir. Tüp geçişinin aşılması rahmin görevini ortadan kaldırmaz. Bir yöntem adı duyduğunda “hangi doğal basamak nerede destekleniyor?” sorusuyla açıklama kur.",
        ],
      },
      {
        title: "Doku sağlığı, enfeksiyon ve koruyucu ortam",
        paragraphs: [
          "Vajinanın doğal mikrobiyotası ve çoğunlukla asidik ortamı bazı mikroorganizmaların çoğalmasını sınırlar. Dış bölgenin temiz ve kuru tutulması, kişisel hijyen, dengeli beslenme ve tütün ile alkolden uzak durma üreme sağlığını destekler. İç ortamı gelişigüzel kimyasallarla değiştirmek doğal korumayı bozabilir.",
          "Cinsel yolla bulaşabilen enfeksiyonlar arasında HIV, hepatit B ve C, bel soğukluğu, frengi, HPV ile ilişkili genital siğiller ve genital herpes örnekleri bulunur; bulaş olasılığı etken ve temas koşuluna göre değişir. HIV bir virüs ve enfeksiyon etkenidir; AIDS, tedavi edilmemiş bazı enfeksiyonların ilerleyebildiği bağışıklık yetmezliği tablosudur, her HIV tanısı aynı anda AIDS demek değildir. Uygun korunma, aşıyla önlenebilen enfeksiyonlarda aşılama ve sağlık değerlendirmesi önemlidir. Bir organın yerini bilmek ile hastalığa tanı koymak farklıdır. Dersin amacı, yapı–işlev bağlantısını öğrenmek ve değişiklikleri tek bir açıklamaya indirgememektir.",
        ],
      },
    ],
    examples: [
      {
        title: "İki olayın yerini bul",
        prompt:
          "Bir erken embriyo önce tüpte iki hücreye ayrılıyor, sonra rahmin damarlı iç yüzeyine tutunuyor. Bölünmenin ve tutunmanın yerini adlandır.",
        strategy: "Olay fiilini ilgili doku ile eşleştir.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İlk iki hücreli evre, zigotun ilk mitozlarından biridir; verilen olay yumurta kanalındadır.",
          },
          {
            label: "2. adım",
            explanation:
              "Tutunma, rahmin iç tabakası olan endometriyumda implantasyondur.",
          },
          {
            label: "3. adım",
            explanation:
              "İki olayın farklı yerde gerçekleşmesi normal güzergâhla uyumludur; döllenme ile yerleşme aynı olay değildir.",
          },
        ],
        answer: "İlk mitoz tüpte; implantasyon endometriyumda.",
        check: "Rahim kası yerine iç yüzeyin adını kullandığını denetle.",
        pitfall: "Döllenmeyi implantasyon diye adlandırmak.",
      },
      {
        title: "Bir yol etkilenirken diğerini koru",
        prompt:
          "Varsayımsal deneyde yalnız bir yumurta kanalının iç geçişi kapatılıyor; yumurtalıkların kanlanması ve hormon üreten hücreleri sağlam tutuluyor. Hangi işlev doğrudan etkilenir?",
        strategy: "Değiştirilen yapıyı deneyde korunanlardan ayır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Kapalı lümen, oositin ve erken embriyonun o taraftaki normal taşıma yolunu etkiler.",
          },
          {
            label: "2. adım",
            explanation:
              "Östrojen ve progesteron kanla taşınır; bu deneyde hormon üreten hücreler korunmuştur.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu nedenle doğrudan tüp taşıma işlevi etkilenir; bütün hormonların yok olduğunu söylemek verilen koşulu aşar.",
          },
        ],
        answer: "O taraftaki tüp geçişi etkilenir.",
        check: "Sonucu yalnız değiştirilen yol için kur.",
        pitfall: "Bir lümeni kapatmayı bütün gonadı çıkarmakla eşitlemek.",
      },
      {
        title: "Folikül tek hücre midir?",
        prompt:
          "Bir kesitte merkezde bir oosit, çevresinde 40 destek hücresi sayılıyor. İşaretlenen bütün yapı folikül. Oosit ve folikül neden eş anlamlı değildir?",
        strategy: "Parça ile bütünü ayrı say.",
        steps: [
          {
            label: "1. adım",
            explanation: "Oosit bu kesitte bir hücredir.",
          },
          {
            label: "2. adım",
            explanation:
              "Folikül, oositi ve onu çevreleyen hücreleri birlikte içeren yapıdır; verilen sayımda en az 41 hücre vardır.",
          },
          {
            label: "3. adım",
            explanation:
              "Destek hücrelerinin koruma ve hormon üretimi görevleri oositin mayoz göreviyle aynı değildir.",
          },
        ],
        answer: "Folikül çok hücreli bütündür; oosit onun içindeki hücredir.",
        check: "40+1=41 sayımı yalnız verilen kesitin hücreleri içindir.",
        pitfall:
          "Gerçek bütün folikülün kesin toplamını tek kesitten hesaplamak.",
      },
      {
        title: "Laboratuvar basamağı rahmi gereksiz kılar mı?",
        prompt:
          "Bir IVF örneğinde döllenme laboratuvarda gerçekleşiyor ve gelişen embriyo rahme aktarılıyor. Rahmin hangi temel görevi sürer?",
        strategy: "Döllenme ortamı ile gelişim ortamını ayır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Laboratuvar, bu örnekte gametlerin birleştiği ortamdır.",
          },
          {
            label: "2. adım",
            explanation:
              "Embriyonun uygun endometriyuma tutunması ve sonraki gelişim ortamı rahimle ilişkilidir.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu yüzden döllenmenin dışarıda gerçekleşmesi, rahmin yerleşme ve gelişim görevini kaldırmaz.",
          },
        ],
        answer: "Rahim yerleşme ve gelişim ortamını sağlar.",
        check: "Her yöntemin hangi basamağı desteklediğini söyle.",
        pitfall: "IVF ile bütün gebeliğin vücut dışında geçtiğini sanmak.",
      },
    ],
    recall: [
      {
        prompt: "Oosit tüpe kendi kamçısıyla mı ilerler?",
        answer:
          "Hayır. Fimbrialar yakalamaya; silli epitel ve düz kas hareketleri taşımaya katkı sağlar.",
      },
      {
        prompt: "Endometriyum ile miyometriyumun görevleri nasıl ayrılır?",
        answer:
          "Endometriyum iç yüzey ve yerleşme ortamıdır; miyometriyum kaslı duvardır ve kasılmalara katılır.",
      },
      {
        prompt: "Kadında idrarın vajinadan çıkması gerekir mi?",
        answer: "Hayır. Üretra ayrı idrar çıkış yoludur.",
      },
      {
        prompt: "Her folikül mutlaka ovulasyona ulaşır mı?",
        answer:
          "Hayır. Çoğu folikül geriler; yalnız bir kısmı üreme dönemi boyunca ovulasyona ulaşır.",
      },
    ],
    items: [
      [
        "Normal insan üremesinde sperm ile ikincil oositin karşılaşıp döllenmenin çoğunlukla gerçekleştiği yapı hangisidir?",
        "Yumurta kanalı",
        ["Mesane", "Vajina duvarı", "Rahmin kas tabakasının bütünü", "Üretra"],
        "Taşıma yolu ile yerleşme yüzeyini ayır.",
        "Döllenme çoğunlukla yumurta kanalındadır. Sonraki yerleşme rahmin endometriyumunda gerçekleşir; mesane ve üretra idrar yollarıdır.",
      ],
      [
        "Bir folikül çiziminde merkezde oosit, çevresinde onu saran destek hücreleri bulunuyor. Hangi açıklama bu yapıyı doğru tanımlar?",
        "Folikül, oositi ve çevresindeki hücreleri içeren bütündür.",
        [
          "Folikül yalnız oositin çekirdeğidir.",
          "Her destek hücresi ayrı bir döllenmiş zigottur.",
          "Folikül rahmin kas tabakasına verilen addır.",
          "Folikül ile vajina aynı organdır.",
        ],
        "Tek hücreyi onu saran yapıdan ayır.",
        "Oosit bir hücredir; folikül onu çevreleyen destek hücrelerini de kapsar. Destek ve hormon üretimi ile oositin mayoz görevi böylece farklı hücrelere bağlanabilir.",
      ],
      [
        "Varsayımsal deneyde yalnız tüp lümeni kapatılıyor; yumurtalık kanlanması ve hormon üreten hücreler sağlam kalıyor. Hangi sonuç doğrudan beklenir?",
        "O taraftaki normal oosit taşıma yolu aksar.",
        [
          "Östrojenin kanla taşınması zorunlu olarak sıfırlanır.",
          "Her iki yumurtalık zorunlu olarak yok olur.",
          "Üretra yumurta kanalının görevini üstlenir.",
          "Rahmin bütün kas hücreleri anında dökülür.",
        ],
        "Deneyde değişen yapıyı korunan yapılardan ayır.",
        "Tüp lümeni hücrenin taşındığı yoldur. Hormon üreten hücreler ve kanlanma korunuyorsa yalnız lümenin kapanmasından tüm hormonların yokluğu çıkarılamaz.",
      ],
      [
        "Rahmin damar ve bez bakımından zengin iç tabakasına yerleşen blastosist hangi yapıya tutunmuştur?",
        "Endometriyum",
        ["Epididimis", "Seminifer tüpçük", "Üreter", "Yumurtalığın bütünü"],
        "Yerleşme yüzeyinin adını ara.",
        "Endometriyum rahmin iç tabakasıdır ve implantasyon ortamını oluşturur. Epididimis ve seminifer tüpçük erkek üreme yapıları, üreter ise üriner yoldur.",
      ],
      [
        "Kadın üreme ve idrar yolları için hangi ifade doğrudur?",
        "Vajina ile üretra ayrı dışa açılan yollardır.",
        [
          "Mesanedeki idrar önce rahim boşluğuna akar.",
          "Bütün adet içeriği böbrekten gelir.",
          "Üretra doğrudan ovaryum içindeki foliküldür.",
          "Vajina ve yumurta kanalı kesintisiz tek organdır.",
        ],
        "Aynı bölgede bulunmayı tek açıklık sanma.",
        "Kadında idrar üretrayla, adet içeriği vajinayla dışarı çıkar. Yakın anatomik konumları bu yolların aynı kanala dönüşmesini gerektirmez.",
      ],
      [
        "Bir yumurta kanalındaki oositin rahme taşınmasına doğrudan katkı sağlayan ikili hangisidir?",
        "Silli epitel hareketi ve tüp düz kaslarının etkinliği",
        [
          "Oositin kendi kanatları ve pençeleri",
          "Eritrosit çekirdeği ve trombosit mayozu",
          "Mesane filtrasyonu ve üreter kapakları",
          "Kemik iliği kasılması ve safra üretimi",
        ],
        "Oositin kendi hareketiyle dokunun sağladığı hareketi ayır.",
        "Tüpün iç yüzeyindeki siller ve duvarındaki düz kaslar taşınmaya katkı verir. Oosit kendi kamçısıyla yüzerek ilerleyen bir hücre değildir.",
      ],
      [
        "Bir çalışma notunda yumurtalıkta büyüyen folikül, tüpte ilk mitozunu geçiren zigot ve rahimde yerleşmiş blastosist tanımlanıyor. Hangi sıra olaylarla uyumludur?",
        "Folikül gelişimi → döllenme → ilk mitozlar → implantasyon",
        [
          "İmplantasyon → folikül gelişimi → döllenme → ilk mitozlar",
          "İlk mitozlar → implantasyon → folikül gelişimi → döllenme",
          "Döllenme → implantasyon → ilk folikül gelişimi → oosit oluşumu",
          "Folikül gelişimi → implantasyon → oositin tüpe geçişi → döllenme",
        ],
        "Gamet oluşmadan zigot, zigot oluşmadan embriyo bekleme.",
        "Folikül ve oosit gelişimi önce gelir. Döllenmeyle zigot oluşur, ilk mitozlar taşınma sırasında gerçekleşir ve daha ileri embriyo endometriyuma yerleşir.",
      ],
      [
        "Doğumdan sonra mevcut oosit rezervinin büyük kısmının zamanla gerilediği, yalnız bir bölümünün ovulasyona ulaştığı belirtiliyor. Bu bilgi hangi yorumu destekler?",
        "Her folikülün işlevsel olarak salınan oosite dönüşmesi gerekmez.",
        [
          "Doğumdaki bütün foliküller ilk ayda ovule olur.",
          "Oosit rezervi yalnız döllenme gerçekleşince ilk kez kurulur.",
          "Folikül sayısı üretra uzunluğuna eşittir.",
          "Her gerileyen folikül yeni bir fetüs oluşturur.",
        ],
        "Bir başlangıç havuzunu bütün üyelerin aynı sona ulaşmasıyla eşitleme.",
        "Foliküllerin bir kısmı olgunlaşırken büyük bölümü geriler. Bu nedenle başlangıç rezervi ile üreme dönemi boyunca gerçekleşen toplam ovulasyon sayısı aynı değildir.",
      ],
      [
        "Bir IVF örneğinde oosit ile sperm laboratuvarda birleştiriliyor; uygun embriyo daha sonra rahme aktarılıyor. Hangi görev rahimle ilişkili kalır?",
        "Embriyonun uygun iç yüzeye yerleşmesi ve gelişim ortamı",
        [
          "Bütün spermlerin seminifer tüpçükte üretilmesi",
          "Böbrekte süzülmenin ilk kez başlaması",
          "Her oositin akrozom enzimi üretmesi",
          "Östrojenin yalnız vajina lümeninde taşınması",
        ],
        "Yardımcı yöntemin desteklediği basamağı bütün süreçten ayır.",
        "IVF döllenmeyi laboratuvar ortamında destekler. Embriyonun yerleşmesi ve gelişimi için rahmin endometriyumu ve gebelik ortamı yine gereklidir.",
      ],
      [
        "Bir kesitte rahmin kaslı duvarı ile iç yüzey tabakası ayrı işaretleniyor. Doğum sırasındaki güçlü kasılmalarla doğrudan ilişkilendirilecek yapı hangisidir?",
        "Miyometriyum",
        [
          "Yumurta kanalının içindeki sperm çekirdeği",
          "Zona pellusida",
          "Folikülün içindeki oosit çekirdeği",
          "Mesanenin içindeki idrar",
        ],
        "Kas tabakasını yerleşme yüzeyinden ayır.",
        "Miyometriyum rahmin kas tabakasıdır ve doğumdaki kasılmalara katılır. Endometriyum ise iç yüzey ve yerleşme ortamıdır; bu iki dokunun adları ve görevleri ayrılmalıdır.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 2 PDF s. 3–4, 8–9 (basılı 123–124, 128–129); OGM Üreme Sistemi-II PDF s. 2–24 ve IV s. 9–24; Dersler Cepte Üreme PDF s. 17, 19 doğrudan okundu. Özgün açıklama ve öğretim soruları; resmî soru değildir.",
  },
  {
    id: "ureme-gametogenez",
    topic: "detail-323",
    title: "Gametogenez: hücreden gamete, sayıdan işleve",
    minutes: 72,
    objectives: [
      "Spermatogenez ile oogenezi başlangıç, bekleme ve ürün bakımından karşılaştır.",
      "Kromozom, kromatit ve göreli DNA miktarını mayoz boyunca ayrı say.",
      "Oositin profaz I ve metafaz II beklemelerini döllenmeyle ilişkilendir.",
      "Mayoz, farklılaşma ve hormonal desteği birbirinin yerine kullanmadan açıkla.",
    ],
    sections: [
      {
        title: "Gamet yapmak yalnız hücreyi ikiye bölmek değildir",
        paragraphs: [
          "Gametogenez, eşey hücrelerinin oluşması ve işlev kazanması sürecidir. Mayoz kromozom takımını yarıya indirir; büyüme, hücre farklılaşması ve uygun ortam da olgun gametin oluşumuna katkı sağlar. Erkekte süreç spermatogenez, dişide oogenez adını alır. İnsan somatik hücrelerinin tipik diploit sayısı 46, gametlerin haploit sayısı 23’tür.",
          "Gametlerin birleşmesiyle iki haploit katkı bir araya gelir ve yeni bireyin diploit kromozom düzeni kurulur. Mayoz kromozom sayısını azaltmasaydı her kuşakta takım sayısı artardı. Gametogenez ile döllenme bu nedenle birbirini tamamlayan, fakat farklı olaylardır; birincisi gameti üretir, ikincisi gamet katkılarını bir araya getirir.",
        ],
      },
      {
        title: "Önce üç sayacın ne saydığını bil",
        paragraphs: [
          "Kromozom sayımında sentromer düzeni, kromatit sayımında DNA taşıyan kopyalar izlenir. DNA eşlenmiş bir insan birincil spermatositi veya birincil oositinde 46 kromozom ve 92 kromatit bulunur. Homolog kromozomlar anne ve baba kökenli eşlerdir; kardeş kromatitler bir kromozomun eşlenmiş kopyalarıdır.",
          "C, eşlenmemiş tek haploit genomun DNA miktarını gösteren göreli ölçü olarak kullanılabilir. Mayoza girecek, S evresini tamamlamış diploit birincil hücre 4C; mayoz I sonrası hücre n ve 2C; mayoz II sonrası çekirdek n ve 1C’dir. C bir kromozom sayısı veya gram cinsinden sabit değer değildir; karşılaştırılan tür ve ölçüm tanımı önemlidir.",
        ],
      },
      {
        title: "Eşlenme iki bölünmeden önce bir kez olur",
        paragraphs: [
          "Mayozdan önce DNA S evresinde eşlenir. Ardından mayoz I’de homolog kromozomlar, mayoz II’de kardeş kromatitler ayrılır. İki bölünmenin arasında yeni bir tam DNA eşlenmesi yoktur. Bu nedenle ikinci bölünme, haploit hücredeki eşlenmiş kromozomların kardeşlerini ayırarak DNA miktarını yeniden azaltabilir.",
          "“Haploit” demek her kromozomun mutlaka tek kromatitli olması demek değildir. Mayoz I sonrasında hücre haploittir ama kromozomları hâlâ iki kromatitlidir. Soruda 23 kromozomlu bir hücre verildiğinde evreyi bulmak için kromatit ve DNA miktarına da bak; yalnız 23 sayısı ikincil hücre ile olgun gameti ayırmayabilir.",
        ],
      },
      {
        title: "Sperm yolunda çoğalma ve mayoz basamakları",
        paragraphs: [
          "Spermatogonyumlar testisin seminifer tüpçüklerinde mitozla hücre havuzunu sürdürür. Bazı hücreler büyüyüp mayoza hazırlanan birincil spermatositlere dönüşür. Bir birincil spermatosit mayoz I sonunda iki ikincil spermatosit, bu iki hücre de mayoz II sonunda toplam dört spermatit oluşturur.",
          "Bu dört spermatit haploittir; ancak yuvarlak bir spermatit, hareketli olgun spermle aynı görünüş ve işlevde değildir. Bir başlangıç hücresinden dört haploit çekirdek oluşmasını, her koşulda dört başarılı döllenme gerçekleşmesiyle eşitleme. Ürün sayısı, hücrelerin daha sonra hayatta kalması ve işlev kazanması farklı ölçümlerdir.",
        ],
      },
      {
        title: "Spermatit farklılaşırken takım sayısı değişmez",
        paragraphs: [
          "Spermatitlerden sperm oluşurken çekirdek yoğunlaşır, başta akrozom gelişir, kuyruk hareket yapısı kurulur ve mitokondriler orta bölümde toplanır. Bu yapısal dönüşüm spermiogenez olarak da adlandırılır. Bu sırada yeni bir mayozla kromozom sayısı tekrar yarıya indirilmez; haploit düzen korunur.",
          "Spermler epididimiste olgunlaşma ve hareket yeteneği kazanmayla ilişkili değişiklikler geçirir; dişi üreme yolunda döllenmeye hazırlanmanın başka basamakları da bulunur. Etkileşimin “son ürün” sperm seçeneği, mayoz II sonrasındaki farklılaşma ve olgunlaşmanın da tamamlandığı koşulu içerir. Böylece dört sayısı işlev kazanmamış spermatit ile karıştırılmaz.",
        ],
      },
      {
        title: "Oosit yolunun başlangıcı doğumdan öncedir",
        paragraphs: [
          "Oogonyumlar embriyonik dönemde mitozla çoğalır; gelişen birincil oositler mayoza girer ve profaz I’de bekler. Bu hücreler destek hücreleriyle çevrilidir. Doğum ile ergenlik arasında bekleme süresi uzun olabilir; ergenlik bütün birincil oositlerin ilk kez oluştuğu tarih değildir.",
          "Ergenlikle birlikte hormonal döngüler bazı foliküllerin gelişimini destekler. Birincil oosit mayoz I’i tamamladığında bir ikincil oosit ve küçük birinci kutup hücresi oluşur. Döllenme potansiyeli için gereken bol sitoplazma büyük hücrede korunur; kalıtsal takım sayısının yarıya inmesi, sitoplazmanın eşit paylaşılmasını zorunlu kılmaz.",
        ],
      },
      {
        title: "İki bekleme evresini bir sıraya bağla",
        paragraphs: [
          "Birincil oositin ilk beklemesi profaz I’dedir. Mayoz I’i tamamlayan ikincil oosit mayoz II’ye başlar ve metafaz II’de bekler. Ovulasyonda salınan hücre tipik olarak bu ikincil oosittir; mayoz II’yi çoktan tamamlamış ovum diye adlandırmak zamanlamayı değiştirir.",
          "Spermle etkileşim ve döllenmenin başlattığı sinyaller, mayoz II’nin tamamlanmasını uyarır. Büyük ovum ile küçük ikinci kutup hücresi oluşur; sonra anne ve baba çekirdek katkıları diploit düzeni kurar. Etkileşimde “döllenme sinyali” seçildiğinde gösterilen ovum, çekirdeklerin birleşmesinden önceki n ve 1C aşamasıdır; henüz 2n zigot değildir.",
        ],
      },
      {
        title: "Kutup hücresi sayısını varsayımıyla söyle",
        paragraphs: [
          "Oogenezde sitoplazma bölünmesi eşit değildir. Birincil oositin temel işlevsel sonucu bir büyük yumurta hücresidir; küçük kutup hücreleri gelişim için aynı büyük sitoplazmayı taşımaz. İlk kutup hücresi bölünmeden kalırsa iki kutup hücresi görülebilir; o da bölünürse toplam üç küçük kutup hücresi oluşabilir.",
          "Bu nedenle her şemayı koşulsuz üç ya da koşulsuz iki kutup hücresiyle zorunlu kılma. Modelimiz ilk kutup hücresinin yeniden bölünmediğini açıkça kabul eder: bir büyük ovum ve iki küçük kutup hücresi gösterilir. Hangi kutup sayısı seçilirse seçilsin “dört eşit büyüklükte işlevsel yumurta” sonucu doğru olmaz.",
        ],
      },
      {
        title: "Büyük sitoplazma ve farklı ürün stratejileri",
        paragraphs: [
          "Sperm küçük, hareketli ve hedefe ulaşmaya özelleşmiş; oosit ise büyük sitoplazmalı bir hücredir. Oosit erken gelişimin kullanacağı organelleri, RNA’ları ve hücresel bileşenleri taşır. İnsanda embriyo gelişimi daha sonra anneyle kurulan ilişkiye dayanır; bu bilgi oositin dev bir kuş yumurtası kadar besin deposu olduğunu göstermez.",
          "Spermatogenezde dört ana ürünün sitoplazma paylaşımı oogenezdekine göre daha dengelidir; oogenezde büyük hücre lehine belirgin eşitsizlik vardır. Ürünlerin büyüklük farkı kromozom takım farkı değildir: hem olgun sperm hem ovum haploittir. Soruda hücre hacminden doğrudan 23 veya 46 kromozom sonucu çıkarmak yerine süreç bilgisini kullan.",
        ],
      },
      {
        title: "GnRH, FSH ve LH görev paylaşımı kurar",
        paragraphs: [
          "Hipotalamus gonadotropin salgılatıcı hormon olan GnRH ile hipofizin ön lobunu uyarır. Ön lobdan gelen FSH ve LH gonadlara etki eder. Erkekte FSH Sertoli desteğiyle, LH Leydig hücrelerinin testosteron üretimiyle ilişkilidir; testosteron ve yerel destek spermatogenez için önemlidir. İnhibin özellikle FSH salgısını baskılar.",
          "Dişide FSH folikül gelişimini, LH ovulasyon ve korpus luteum oluşumunu destekler. Östrojen ve progesteron, döngünün evresine bağlı geri bildirimler kurar. Aynı hormon adının iki eşeyde bulunması, iki sistemde her hedef hücre ve sonucun aynı olmasını gerektirmez. Hormonun çıktığı organ, hedefi ve sonucu ayrı oklarla bağla.",
        ],
      },
      {
        title: "Başlama zamanı ve süreklilik aynı değildir",
        paragraphs: [
          "Spermatogenez ergenlikle belirginleşir ve uygun koşullarda çok sayıda hücreyle devam eder. Oogenez doğumdan önce başlamıştır; üreme dönemi boyunca sınırlı bir folikül havuzunun seçilen üyeleri ilerler. Bir döngüde çoğunlukla bir oosit salınsa da her ay ve her birey için değişmez tek hücre garantisi kurulmaz.",
          "Menopoz foliküler döngü ve ovulasyonun sonlanmasıdır; kaynaklarda yaklaşık orta yaş aralıkları verilir, fakat tek bir evrensel doğum günü sınırı yoktur. Sperm ve yumurta üretiminin zamanlamasını karşılaştırırken “başlangıç”, “bekleme”, “olgunlaşma” ve “üretimin sürmesi” ifadelerini birbirinden ayır.",
        ],
      },
      {
        title: "Çeşitlilik ve ayrılma hatasını ayır",
        paragraphs: [
          "Mayoz I’de homologların dağılımı ve homolog kromozomların kardeş olmayan kromatitleri arasındaki parça değişimi gametlerin kalıtsal çeşitliliğine katkı sağlar. Döllenmede farklı gametlerin birleşmesi bu çeşitliliğe başka bir katman ekler. Bu süreçler, gametlerin her birinin mutlaka farklı kromozom sayısı taşıması demek değildir.",
          "Homologların veya kardeş kromatitlerin düzgün ayrılmaması, bazı gametlerin bir kromozomu fazla veya eksik taşımasına yol açabilir. Normal n takım sayısıyla DNA dizisi çeşitliliğini ayır: dört farklı gamet de 23 kromozom taşıyabilir. Bir fenotipten veya tek bir gametin sayımından kişinin bütün genetik durumunu kesinleştirmek gerekmez.",
        ],
      },
    ],
    examples: [
      {
        title: "İnsan birincil hücresinde üç sayaç",
        prompt:
          "S evresini tamamlamış normal insan birincil spermatositi için kromozom, kromatit ve göreli DNA miktarını yaz. 1C, eşlenmemiş haploit genom miktarıdır.",
        strategy: "Takım sayısını kopya sayısından ayır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İnsan diploit sayısı 2n=46’dır; eşlenme sentromere göre sayılan kromozom sayısını iki katına çıkarmaz.",
          },
          {
            label: "2. adım",
            explanation:
              "Her kromozom iki kardeş kromatit taşır: 46×2=92 kromatit.",
          },
          {
            label: "3. adım",
            explanation:
              "İki haploit takımın DNA’sı eşlenmiş olduğundan göreli miktar 4C olur.",
          },
        ],
        answer: "46 kromozom, 92 kromatit, 4C DNA.",
        check:
          "Mayoz I sonrası her hücrede 23/46/2C bekleyerek tutarlılığı denetle.",
        pitfall: "DNA eşlendi diye 92 kromozom saymak.",
      },
      {
        title: "Varsayımsal türde sperm ürünleri",
        prompt:
          "2n=8 olan varsayımsal türde bir birincil spermatosit normal mayozu ve sperm olgunlaşmasını tamamlıyor. Kaç ana ürün vardır, her biri kaç kromozom taşır?",
        strategy: "Önce n’yi, sonra iki bölünmenin ürününü bul.",
        steps: [
          {
            label: "1. adım",
            explanation: "2n=8 ise n=4’tür.",
          },
          {
            label: "2. adım",
            explanation:
              "Bir birincil spermatosit mayoz I’de iki, mayoz II’de toplam dört spermatit oluşturur.",
          },
          {
            label: "3. adım",
            explanation:
              "Farklılaşma yeni bölünme sayılmaz; son dört sperm hücresinin her biri 4 kromozom taşır.",
          },
        ],
        answer: "4 sperm; her birinde 4 kromozom.",
        check:
          "Toplam ürün sayısı ile hücre başına kromozom sayısını ayrı birimlerle yaz.",
        pitfall:
          "Dört ürün oluştu diye her birinde bir kromozom kaldığını sanmak.",
      },
      {
        title: "Döllenme sinyali gelmeyen oosit",
        prompt:
          "Normal insan ikincil oositi metafaz II’de bekliyor; spermle etkileşim yok. Kromozom, kromatit ve DNA miktarı nedir? 1C eşlenmemiş haploit genomdur.",
        strategy: "İlk bölünmenin bitip ikinci bölünmenin bitmediğini izle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Mayoz I homologları ayırmıştır; hücre n=23 kromozomludur.",
          },
          {
            label: "2. adım",
            explanation:
              "Kardeş kromatitler henüz ayrılmadığından 23×2=46 kromatit vardır.",
          },
          {
            label: "3. adım",
            explanation:
              "DNA miktarı 2C’dir; mayoz II tamamlandığında ovumun ana çekirdeğinde 1C olur.",
          },
        ],
        answer: "23 kromozom, 46 kromatit, 2C.",
        check:
          "Haploit ile tek kromatitli ifadelerinin aynı olmadığını kontrol et.",
        pitfall: "Ovulasyondaki oositi 46 kromozomlu veya 1C saymak.",
      },
      {
        title: "Kutup hücreli bir şemanın koşulu",
        prompt:
          "Bir oogenezin sonunda ilk kutup hücresi yeniden bölünmüyor; ikincil oosit mayoz II’yi tamamlıyor. Büyük hücre ve toplam kutup hücresi sayısını bul.",
        strategy: "Her eşitsiz bölünmenin küçük ürününü izle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Mayoz I, bir büyük ikincil oosit ve birinci kutup hücresini oluşturur.",
          },
          {
            label: "2. adım",
            explanation:
              "İkincil oositin mayoz II’si bir büyük ovum ve ikinci kutup hücresini oluşturur.",
          },
          {
            label: "3. adım",
            explanation:
              "Birinci kutup yeniden bölünmediğinden iki küçük kutup ve bir büyük ovum vardır.",
          },
        ],
        answer: "1 büyük ovum ve 2 kutup hücresi.",
        check: "İlk kutup da bölünseydi küçük hücre sayısı üçe çıkabilirdi.",
        pitfall: "Kutup sayısını koşulsuz tek değere sabitlemek.",
      },
    ],
    recall: [
      {
        prompt:
          "Mayoz I sonrasında haploit hücrenin kromozomları iki kromatitli olabilir mi?",
        answer:
          "Evet. Homologlar ayrılmıştır fakat kardeşler mayoz II’ye kadar birlikte kalır.",
      },
      {
        prompt: "Oositte iki bekleme hangi evrelerdedir?",
        answer:
          "Birincil oosit profaz I’de; ikincil oosit metafaz II’de bekler.",
      },
      {
        prompt: "Spermatitin sperme farklılaşması yeni bir mayoz mudur?",
        answer:
          "Hayır. Yapı ve işlev kazanılır; haploit kromozom sayısı korunur.",
      },
      {
        prompt: "Oogenezden dört eşit işlevsel ovum çıkar mı?",
        answer:
          "Hayır. Büyük sitoplazma bir ovumda korunur; küçük kutup hücreleri oluşur.",
      },
    ],
    items: [
      [
        "S evresini tamamlamış normal insan birincil oositinde kromozom ve kromatit sayıları hangi ikilidir?",
        "46 kromozom, 92 kromatit",
        [
          "92 kromozom, 46 kromatit",
          "23 kromozom, 23 kromatit",
          "46 kromozom, 23 kromatit",
          "23 kromozom, 92 kromatit",
        ],
        "Eşlenme kromozom sayısını değil kopya sayısını artırır.",
        "Birincil oosit diploittir:46 kromozom. S evresi sonrası her biri iki kardeş kromatit taşır; toplam 92 kromatit vardır. Kromatit ile kromozom aynı sayaç değildir.",
      ],
      [
        "Normal insan mayoz I’i tamamlamış bir ikincil spermatosit için hangi ifade doğrudur?",
        "23 kromozomu vardır ve bunlar henüz iki kromatitlidir.",
        [
          "46 kromozomu vardır ve her biri dört kromatitlidir.",
          "23 kromozomu vardır ve DNA eşlenmesi zorunlu olarak yeniden başlar.",
          "92 bağımsız kromozomu vardır.",
          "Çekirdeği bütün kalıtsal bilgisini kaybetmiştir.",
        ],
        "İlk bölünmede homologlar, ikincide kardeşler ayrılır.",
        "Homolog çiftler ayrıldığı için ikincil spermatosit haploittir. Kardeş kromatitler mayoz II’ye kadar birlikte kaldığından 23 kromozomun toplam 46 kromatidi bulunur.",
      ],
      [
        "2n=12 olan bir türde bir birincil spermatosit, normal mayoz ve son olgunlaşmayı kayıpsız tamamlıyor. Sonuç hangi seçenektir?",
        "Dört sperm; her birinde 6 kromozom",
        [
          "İki sperm; her birinde 12 kromozom",
          "Dört sperm; her birinde 3 kromozom",
          "Bir sperm; içinde 24 kromozom",
          "Sekiz sperm; her birinde 12 kromozom",
        ],
        "Önce haploit takım sayısını hesapla.",
        "2n=12 ise n=6’dır. İki mayoz bölünmesi dört spermatit oluşturur; farklılaşma yeni hücre bölünmesi olmadığından dört olgun sperm elde edilir.",
      ],
      [
        "İnsanda ovulasyonla serbestleşen tipik hücre hangi aşamadadır?",
        "Metafaz II’de bekleyen ikincil oosit",
        [
          "Profaz I’de bekleyen oogonyum",
          "Mayoz II’yi bitirmiş 2n zigot",
          "Dört eşit hücreli sperm kümesi",
          "Mitozla üretilen diploit fetüs",
        ],
        "Ovulasyonu döllenmeyle aynı an sayma.",
        "Birincil oosit mayoz I’i tamamlar. İkincil oosit metafaz II’de beklerken ovule olur; döllenme sinyali mayoz II’nin tamamlanmasını uyarır.",
      ],
      [
        "Bir birincil oosit mayoz I’i, ardından döllenme sinyaliyle mayoz II’yi tamamlıyor. İlk kutup hücresi bölünmeden kalıyor. Hangi ürün sayımı doğrudur?",
        "Bir büyük ovum ve iki küçük kutup hücresi",
        [
          "Dört eşit büyük ovum",
          "İki diploit ovum ve hiç kutup hücresi yok",
          "Sekiz büyük ovum ve dört kutup hücresi",
          "Bir diploit sperm ve üç ovum",
        ],
        "Küçük yan ürünleri her bölünmede ayrı izle.",
        "Mayoz I birinci kutbu; büyük hücrenin mayoz II’si ikinci kutbu oluşturur. İlk kutup yeniden bölünmediği için iki küçük kutup ve bir büyük ovum bulunur.",
      ],
      [
        "Bir spermatit akrozom ve kuyruk geliştirerek sperme farklılaşıyor; yeni bölünme yok. Kromozom takımı için ne beklenir?",
        "Haploit takım korunur.",
        [
          "Her kuyruk eklendiğinde takım iki katına çıkar.",
          "Akrozom oluşunca kromozomların tamamı atılır.",
          "Takım zorunlu olarak diploit olur.",
          "Her farklılaşmada n sayısı bir azalır.",
        ],
        "Şekil değişimini mayoz diye adlandırma.",
        "Spermatit zaten mayoz ürünüdür. Sperm biçimi ve işlevi kazanılırken yeni bir mayoz yoktur; normal haploit kromozom sayısı korunur.",
      ],
      [
        "1C, eşlenmemiş tek haploit genomun DNA miktarıdır. Normal insan metafaz II oositinde DNA miktarı hangisidir?",
        "2C",
        ["0C", "1/2C", "4C", "8C"],
        "Haploit ama iki kromatitli aşamayı düşün.",
        "İkincil oosit n kromozom taşır; her kromozom henüz iki kromatitlidir. Bu nedenle DNA miktarı 2C’dir. Mayoz II sonunda ovum çekirdeğinde 1C olur.",
      ],
      [
        "Kadın ve erkek gametogenezinin zamanlaması için hangi karşılaştırma doğrudur?",
        "Oogenez doğumdan önce başlar; spermatogenez ergenlikle belirginleşir.",
        [
          "İki süreç de yalnız ilk döllenmeden sonra başlar.",
          "Birincil oositler ilk kez menopozda üretilir.",
          "Sperm üretimi yalnız anne karnında tamamlanır.",
          "Oogenezde hiçbir bekleme evresi yoktur.",
        ],
        "Süreç başlangıcıyla son olgunlaşmayı ayır.",
        "Birincil oositlerin gelişimi embriyonik dönemde başlar ve profaz I’de bekler. Spermatogenez ergenlikle etkinleşen, uygun koşullarda süren bir üretim düzenidir.",
      ],
      [
        "Hipotalamus–hipofiz–gonad yolu için hangi ifade doğrudur?",
        "GnRH hipofiz ön lobunun FSH ve LH salgısını uyarır.",
        [
          "FSH doğrudan vajina lümeninde üretilir.",
          "LH yalnız alyuvar çekirdeğinden salınır.",
          "GnRH sperm kuyruğunun yapısal proteinidir.",
          "İnhibin bütün koşullarda FSH salgısını artırır.",
        ],
        "Hormonu salgılayan bölgeyi hedefinden ayır.",
        "GnRH gonadotropin salgılatıcı hormondur ve hipofiz ön lobuna etki eder. Ön lobun FSH/LH hormonları gonadlara gider; inhibin özellikle FSH üzerine negatif geri bildirim yapar.",
      ],
      [
        "Normal mayozdan oluşan dört sperm aynı sayıda kromozom taşıyor fakat bazı DNA dizileri farklı. Hangi yorum uygundur?",
        "Kalıtsal çeşitlilik için kromozom sayılarının farklı olması gerekmez.",
        [
          "Aynı kromozom sayısı bütün DNA dizilerinin aynı olduğunu kanıtlar.",
          "Parça değişimi her zaman kromozom sayısını ikiye katlar.",
          "Her farklı gamet mutlaka anöploittir.",
          "Mayozda yalnız sitoplazma değişir; kalıtsal dağılım değişmez.",
        ],
        "Sayı ile dizilim çeşitliliğini ayrı tut.",
        "Homolog dağılımı ve parça değişimi farklı alel bileşimleri oluşturabilir. Bu normal çeşitlilikte gametler aynı haploit sayıyı koruyabilir; sayı farkı çeşitliliğin zorunlu koşulu değildir.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 2 PDF s. 4, 8; OGM Üreme Sistemi-II PDF s. 17–24 ve IV s. 2–8; Dersler Cepte Üreme PDF s. 16–17 doğrudan okundu. Kromozom/kromatit/C sayımları ve örnekler özgündür; son sperm aşaması farklılaşmanın da tamamlandığı modeli kullanır.",
  },
  {
    id: "ureme-menstrual-dongu",
    topic: "detail-324",
    title: "Menstrual döngü: aynı takvimde iki değişim",
    minutes: 72,
    objectives: [
      "Yumurtalık ve rahim döngülerini aynı zaman çizgisinde eşleştir.",
      "Östrojenin düzey ve süreye bağlı geri bildirimini progesteron ve inhibinden ayır.",
      "LH artışı, ovulasyon, korpus luteum ve hormon düşüşünü neden sırasıyla açıkla.",
      "28 günlük örneğin bir öğretim modeli olduğunu koruyarak grafik ve gün hesaplarını yap.",
    ],
    sections: [
      {
        title: "Aynı zaman çizgisinde iki farklı organ değişir",
        paragraphs: [
          "Üreme döngüsünde yumurtalık ve rahim birbiriyle uyumlu fakat farklı değişimler geçirir. Ovaryum döngüsü folikül evresi, ovulasyon ve luteal evreyle anlatılır. Rahim döngüsünde ise kanama, yeniden çoğalma ve salgı evreleri ayırt edilir. Biri folikül ve oositi, diğeri endometriyumun durumunu izler.",
          "Bu iki diziyi art arda sıralanan altı ayrı evre gibi düşünme; aynı zaman aralığında paralel gerçekleşirler. Örneğin kanama başlarken yumurtalıkta yeni folikül gelişimi başlayabilir. Bir çizimde “hangi organın evresi?” sorusunu sorarak ovariyal folikül evresini rahmin kanama evresiyle aynı anda görebilirsin.",
        ],
      },
      {
        title: "Birinci gün kanamanın başladığı gündür",
        paragraphs: [
          "Döngü günleri, adet kanamasının ilk gününden sayılır. Kaynaklarda 28 günlük bir örnek üzerinden yaklaşık 14. günde ovulasyon ve ardından luteal dönem gösterilir. Bu sayılar hormonlar ve dokular arasındaki ilişkiyi okumayı kolaylaştırır; her kişinin her döngüsünün 28 gün olmasını gerektirmez.",
          "Etkileşimdeki gün kaydırıcısı bu sabit 28 günlük okul modeline aittir. Bir kişide gerçek ovulasyon günü veya gebelik olasılığı yalnız bu takvimden belirlenmez. Model verisiyle işlem yaparken “verilen örnekte” ifadesini koru; örnek takvimi kişisel bir ölçümle karıştırmadan doğru gün hesabını öğren.",
        ],
      },
      {
        title: "Hipotalamustan gonada giden uyarı zinciri",
        paragraphs: [
          "Hipotalamusun GnRH sinyali hipofizin ön lobunda FSH ve LH salgısını düzenler. Bu gonadotropinler kanla yumurtalıklara ulaşır. FSH folikül gelişimine ve granüloza hücrelerinin işlevine; LH yumurtalık steroid üretimine, ovulasyona ve luteal yapının oluşumuna katkı verir. İkisi aynı hormon değildir.",
          "Geri bildirimler sayesinde üretilen yumurtalık hormonları bu üst merkezlerin etkinliğini etkiler. Böylece yalnız yukarıdan aşağı bir emir yolu değil, sonucu geri bildiren bir düzen oluşur. Şekilde kan hormonu eğrisi görmek, hormonun doğrudan rahim içine boşaltıldığı anlamına gelmez; endokrin sinyalin yolu kandır.",
        ],
      },
      {
        title: "Folikül evresinde büyüme ve seçim",
        paragraphs: [
          "Döngü başında FSH desteğiyle bir grup folikül gelişebilir; bunlardan çoğunlukla biri baskın hâle gelir. Oosit büyür, çevresindeki hücreler çoğalır ve folikülün yapısı olgunlaşır. Folikülden artan östrojen, rahim iç yüzeyinin yenilenmesini ve çoğalmasını destekler.",
          "Birden fazla folikülün gelişime başlaması, hepsinin o döngüde mutlaka ovule olacağı anlamına gelmez. Ayrıca düşük ve orta düzey östrojenin geri bildirim etkisini geç folikül dönemindeki yeterince yüksek ve süreklilik gösteren östrojen etkisiyle ayırmak gerekir. “Östrojen arttıysa daima bütün hormonlar artar” biçiminde tek yönlü bir kural yoktur.",
        ],
      },
      {
        title: "Östrojenin iki geri bildirim bağlamı",
        paragraphs: [
          "Folikül evresinin büyük bölümünde östrojen, üst merkezlerin gonadotropin salgısını baskılayan negatif geri bildirim düzenine katkı yapar. Geç folikül döneminde yeterince yüksek ve belli süre devam eden östrojen sinyali ise pozitif geri bildirime döner. LH’de belirgin tepe bu bağlamla ilişkilidir.",
          "Aynı molekülün farklı düzey ve hormonal ortamda farklı geri bildirim oluşturması çelişki değildir. Soruda düzey, süre ve evre belirtilmeden “östrojen her zaman artırır” veya “her zaman azaltır” demek eksik kalır. Kaynak grafiğini okurken önce eğrinin hangi bölümünde olduğuna, sonra hedef hormonun tepkisine bak.",
        ],
      },
      {
        title: "LH tepesi ve ovulasyon",
        paragraphs: [
          "LH artışı olgun folikülde ovulasyona giden olayları ve mayozun ilerlemesini tetikler. Folikül yırtılır, metafaz II’deki ikincil oosit çevresindeki bazı hücrelerle birlikte serbestleşir ve tüpün huni ucuna alınabilir. Bu, döllenmiş bir zigotun yumurtalıktan bırakılması değildir.",
          "28 günlük örnekte ovulasyon yaklaşık 14. güne yerleştirilir. Grafikte LH’nin en yüksek olduğu dönemi görmek, oositin kesin döllendiğini veya embriyonun endometriyuma yerleştiğini göstermez. Döllenme ve implantasyon için daha sonraki ayrı olayların gerçekleşmesi gerekir; bir hormon tepesinden bütün sonucu çıkarma.",
        ],
      },
      {
        title: "Folikülün kalanı korpus luteuma dönüşür",
        paragraphs: [
          "Ovulasyondan sonra geride kalan folikül hücreleri LH etkisiyle korpus luteum denen geçici endokrin yapıyı oluşturur. Bu yapı özellikle progesteron, ayrıca östrojen ve inhibin üretir. Ovulasyonda oosit ayrılmıştır; korpus luteum oositin rahimde büyüyen biçimi değildir.",
          "Luteal dönemde progesteronun artması endometriyum bezlerinin salgı işlevini ve olası yerleşmeye uygun ortamı destekler. İnhibin özellikle FSH salgısına negatif geri bildirim sağlar. Progesteron ve östrojen de GnRH/gonadotropin düzenini baskılayan ortamı güçlendirerek aynı dönemde yeni bir foliküler döngünün başlamasını sınırlar.",
        ],
      },
      {
        title: "Rahim önce yenilenir, sonra salgı işlevi artar",
        paragraphs: [
          "Kanamayla işlevsel endometriyum tabakasının bir bölümü kaybedilir. Ardından östrojen etkisiyle hücre çoğalması ve doku yenilenmesi belirginleşir; bu çoğalma evresidir. Ovulasyon sonrasında progesteron etkisiyle bezler ve damar düzeni yerleşmeye elverişli salgı özellikleri kazanır; bu da salgı evresidir.",
          "Endometriyum kalınlığı, hormon derişimi ve folikül büyüklüğü farklı büyüklüklerdir. Grafikleri üst üste koyabilmek, bunları aynı birimle ölçtüğümüz anlamına gelmez. “Eğri yukarı çıktı” demeden önce eksenin hormon birimi mi, gün mü, doku kalınlığı mı gösterdiğini kontrol et.",
        ],
      },
      {
        title: "Gebelik desteği yoksa hormonlar düşer",
        paragraphs: [
          "Uygun gebelik sinyali olmadığında korpus luteum geriler; progesteron ve östrojen üretimi azalır. Endometriyumu sürdüren hormonal destek çekilince işlevsel tabakada damar ve doku değişimleri oluşur, adet kanaması başlar. Süre birkaç gün olabilir; kaynaklardaki 3–7 veya 4–7 günlük aralıklar yaklaşık örneklerdir.",
          "Steroidlerin baskısı azalınca hipofiz–hipotalamus üzerindeki negatif geri bildirim de hafifler ve yeni folikül gelişimi için koşullar oluşur. Kanamanın nedeni yalnız döllenmemiş minicik oositin dışarı atılması değildir; görünen içeriğin önemli bölümü kan, endometriyum dokusu ve salgılardır. Rahmin bütün kas duvarı dökülmez.",
        ],
      },
      {
        title: "Erken gebelikte hCG desteği",
        paragraphs: [
          "Yerleşen erken gebelikte trofoblast kökenli hCG sinyali korpus luteumun sürmesine yardım eder. Böylece progesteron ve östrojen desteği erken dönemde korunur. Plasenta geliştikçe steroid üretimindeki rolü ilk trimesterde kademeli olarak artar; görevi ancak değişmez biçimde beşinci ayda ilk kez devraldığı sonucu doğru değildir.",
          "hCG gebelik testlerinde kullanılan bir göstergedir; bir testin zamanı, ölçümü ve klinik bağlamı ayrıca önem taşır. Etkileşimde hCG anahtarı geç luteal dönemde destek var/yok karşılaştırması içindir; model bir tanı testi değildir. Amaç, hormon kaynağının sürmesinin endometriyum desteğini nasıl değiştirdiğini görmektir.",
        ],
      },
      {
        title: "Gebelik, emzirme ve menopoz aynı durum değildir",
        paragraphs: [
          "Gebelikte yüksek steroid desteği ve geri bildirimler yeni folikül gelişimi ile ovulasyonun baskılanmasına katkı sağlar. Emzirme döneminde prolaktin ve sinirsel uyarılar üreme eksenini etkileyebilir; fakat bu durum kişiden kişiye değişir ve tek bir hormon bilgisi kesin takvim öngörüsü vermez. Menopoz ise foliküler etkinlik ve ovulasyonun sonlanmasıyla ilişkilidir.",
          "Bir döngünün geçici olarak değişmesiyle üreme döneminin kalıcı sonlanmasını ayır. Kaynaklar menopoz için yaklaşık yaş aralıkları verir; herkes için sabit tek yaş yasası değildir. Ders sorularında önce verilen fizyolojik durumu tanı, sonra aynı geri bildirim kuralının hangi bağlamda kullanıldığını değerlendir.",
        ],
      },
      {
        title: "Grafikten çıkarılabilen ve çıkarılamayan",
        paragraphs: [
          "Bir hormon grafiğinde tepe zamanı, artış–azalış yönü ve iki eğrinin sıralaması okunabilir. Hormonların sayısal derişimleri aynı birim ve ölçekle verilmişse nicel karşılaştırma yapılır. Farklı normalize edilmiş eksenlerde yalnız çizgi yüksekliğinden bir hormonun diğerinden kaç kat fazla olduğunu bulamazsın.",
          "Bizim etkileşimde 0–100 göreli birimler öğretim için seçilmiş şekil değerleridir; gerçek kan testi değildir. Önce bir günde yumurtalık ve rahim durumunu tahmin et, sonra gerekçeni hormon kaynağıyla bağla ve modeli açarak karşılaştır. Tahminin doğru olması bütün kişisel döngülerin böyle olacağını kanıtlamaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı gün iki evre",
        prompt:
          "Verilen okul modelinde döngü 28 gün, ovulasyon 14. gün ve kanama 1–5. günler arasındadır. 3. günde rahim ve yumurtalık için hangi evreler aynı anda sürer?",
        strategy: "İki organın zaman çizgisini paralel oku.",
        steps: [
          {
            label: "1. adım",
            explanation: "3. gün, verilen 1–5 günlük kanama aralığı içindedir.",
          },
          {
            label: "2. adım",
            explanation: "Ovulasyondan önce yumurtalıkta folikül evresi sürer.",
          },
          {
            label: "3. adım",
            explanation:
              "Dolayısıyla rahimde kanama ile yumurtalıkta folikül gelişimi aynı anda bulunabilir.",
          },
        ],
        answer: "Rahimde kanama, yumurtalıkta folikül evresi.",
        check:
          "İki evreyi art arda yazılmış tek organ evresi saymadığını kontrol et.",
        pitfall: "Kanama varken yumurtalıkta hiçbir olay olamayacağını sanmak.",
      },
      {
        title: "Geri bildirim yönü neden değişti?",
        prompt:
          "Düzenekte geç folikül dönemine benzer biçimde yeterince yüksek ve sürekli östrojen sinyali veriliyor. LH’de belirgin artış görülüyor. Geri bildirim türünü ve olası döngü olayını açıkla.",
        strategy: "Koşulda verilen düzey ve süreyi kullan.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Östrojenin bu bağlamda üst merkezlerin LH yanıtını artırması pozitif geri bildirimdir.",
          },
          {
            label: "2. adım",
            explanation:
              "LH artışı olgun folikülde ovulasyona giden olaylarla ilişkilidir.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu deney, düşük östrojenin de aynı yanıtı vereceğini veya döllenmenin kesin olduğunu göstermez.",
          },
        ],
        answer: "Pozitif geri bildirim; ovulasyonla ilişkili LH artışı.",
        check: "Düzey ve evre koşullarını cevabında tut.",
        pitfall: "Östrojenin her durumda pozitif etki yaptığına genellemek.",
      },
      {
        title: "Model takviminde gün farkı",
        prompt:
          "Bir öğretim takviminde kanamanın ilk günü ayın 6’sı ve bu tarih döngünün 1. günüdür. Aynı ay içindeki 14. döngü günü hangi tarihtir?",
        strategy: "İlk günü bir sayıp aradaki farkı ekle.",
        steps: [
          {
            label: "1. adım",
            explanation: "14. gün, 1. günden 13 gün sonradır.",
          },
          {
            label: "2. adım",
            explanation: "Ayın 6’sına 13 eklenir: 6+13=19.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu yalnız verilen takvim hesabıdır; gerçek bir kişinin ovulasyon günü ölçülmüş değildir.",
          },
        ],
        answer: "Ayın 19’u.",
        check: "6’sını sıfırıncı gün sayıp 20’sine kaymadığını denetle.",
        pitfall:
          "Döngü günü hesabını kişisel gebelik olasılığı tahmini yapmak için kullanmak.",
      },
      {
        title: "Progesteron desteğini karşılaştır",
        prompt:
          "İki varsayımsal geç luteal modelde başka koşullar eşit. A’da korpus luteum geriliyor, B’de hCG desteğiyle sürüyor. Endometriyum hormonal desteği nasıl farklılaşır?",
        strategy: "Hormonun kaynağını ve hedefini bağla.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "A’da korpus luteum gerilediği için progesteron ve östrojen desteği azalır.",
          },
          {
            label: "2. adım",
            explanation:
              "B’de hCG, korpus luteumun sürmesini ve erken dönem steroid desteğini korur.",
          },
          {
            label: "3. adım",
            explanation:
              "B’de iç yüzeyin korunmasına destek vardır; A’da destek çekilmesi kanama sürecine yol açabilir.",
          },
        ],
        answer: "B’de erken endometriyum desteği korunur; A’da azalır.",
        check:
          "Doğrudan hedef hCG’nin tek başına bütün gebeliği oluşturması değil, kaynak desteğidir.",
        pitfall:
          "hCG anahtarını döllenme ve normal gelişimin bütün koşullarıyla eşitlemek.",
      },
    ],
    recall: [
      {
        prompt: "Kanama başlarken yumurtalıkta folikül evresi olabilir mi?",
        answer:
          "Evet. Rahim ve yumurtalık döngüleri paralel ilerler; aynı organın art arda evreleri değildir.",
      },
      {
        prompt:
          "Ovulasyona en belirgin hangi hipofiz hormonunun tepesi eşlik eder?",
        answer:
          "LH artışı. Bu tek başına döllenme veya implantasyon kanıtı değildir.",
      },
      {
        prompt: "Geç luteal dönemde steroidlerin düşmesi neye yol açar?",
        answer:
          "Endometriyumun hormonal desteği çekilir; doku değişimleri ve adet kanaması başlayabilir.",
      },
      {
        prompt: "Östrojen her düzeyde pozitif geri bildirim mi yapar?",
        answer:
          "Hayır. Düşük/orta düzeylerde baskı, uygun geç folikül bağlamında yüksek ve sürekli düzeyde LH artışı görülebilir.",
      },
    ],
    items: [
      [
        "Bir okul modelinde kanama 1–5. gün, ovulasyon 14. gün olarak veriliyor. 3. günde hangi ikili aynı anda bulunabilir?",
        "Rahimde kanama ve yumurtalıkta folikül evresi",
        [
          "Rahimde implantasyon ve yumurtalıkta kesin menopoz",
          "Rahimde bütün kasların dökülmesi ve yeni zigot mayozu",
          "Rahimde sperm üretimi ve tüpte korpus luteum oluşumu",
          "Yumurtalıkta fetüs gelişimi ve mesanede folikül olgunlaşması",
        ],
        "İki organın evreleri aynı takvimde paraleldir.",
        "Verilen 3. gün kanama aralığındadır. Ovulasyon öncesinde yumurtalıkta folikül evresi sürer; kanama yeni folikül gelişiminin durmasını gerektirmez.",
      ],
      [
        "Geç folikül döneminde yeterince yüksek ve belli süre devam eden östrojen sinyalinden sonra LH belirgin artıyor. Bu ilişki nasıl adlandırılır?",
        "Pozitif geri bildirim",
        [
          "Kromozomların mayoz II’de ayrılması",
          "DNA’nın yarı korunumlu eşlenmesi",
          "Üreterde süzülme",
          "Yalnız negatif geri bildirim",
        ],
        "Son ürünün üst merkez yanıtını hangi yönde etkilediğine bak.",
        "Bu koşulda östrojen LH yanıtını artıran pozitif geri bildirim oluşturur. Düşük/orta östrojen bağlamındaki baskıyı bu geç folikül koşuluyla karıştırmamak gerekir.",
      ],
      [
        "Normal bir döngüde LH tepesine en doğrudan bağlanabilecek olay hangisidir?",
        "Olgun folikülden ikincil oositin serbestleşmesi",
        [
          "Bütün endometriyumun bir dakikada kas dokusuna dönüşmesi",
          "Spermin testiste ilk kez oluşması",
          "hCG’nin bütün gebe olmayan kişilerde zorunlu tepe yapması",
          "Her ovulasyonda iki zigotun yumurtalıkta oluşması",
        ],
        "Ovulasyonun hücre ve organ bağlamını hatırla.",
        "LH artışı ovulasyona giden olayları tetikler. Serbestleşen hücre tipik olarak metafaz II’deki ikincil oosittir; döllenmiş zigot değildir.",
      ],
      [
        "Ovulasyondan sonra folikülden geride kalan hücreler hangi yapıyı oluşturur?",
        "Progesteron da üreten korpus luteum",
        [
          "Rahim içindeki embriyo",
          "Mesanedeki idrar",
          "Vajina içindeki üretra",
          "Fetüsün karaciğeri",
        ],
        "Oosit ayrıldıktan sonra kalan folikül dokusunu izle.",
        "Geride kalan folikül hücreleri luteal endokrin yapıya dönüşür. Korpus luteum progesteron, östrojen ve inhibin üretimiyle döngünün denetimine katkı sağlar.",
      ],
      [
        "Gebelik desteği olmayan bir geç luteal dönemde korpus luteum geriliyor. Hangi değişim kanamaya giden sürecin temelidir?",
        "Progesteron ve östrojen desteğinin azalması",
        [
          "Progesteronun sonsuza kadar artması",
          "Rahmin bütün dış kas tabakasının sperm üretmesi",
          "LH’nin endometriyum içinde kromozoma dönüşmesi",
          "Oositin her gün dört büyük ovuma bölünmesi",
        ],
        "Kaynak hormon üretimi azalınca hedef doku desteğini düşün.",
        "Korpus luteumun gerilemesi steroid desteğini düşürür. Endometriyumun işlevsel tabakasında damar ve doku değişimleri gelişir; kanama yalnız bir oositin dışarı atılması değildir.",
      ],
      [
        "Bir hormon grafiğinde iki eğri ayrı ayrı 0–100 göreli aralığa ölçeklenmiştir; gerçek derişim birimleri verilmemiştir. Hangi bilgi bu çizimden kesin bulunamaz?",
        "Bir hormonun gerçek kan derişiminin diğerinin kaç katı olduğu",
        [
          "Aynı eğrinin hangi gün tepeye ulaştığı",
          "Aynı eğrinin seçili iki gün arasında yükselip yükselmediği",
          "Çizimde verilen günlerin sırası",
          "Grafikte hangi eğrinin hangi hormon adıyla işaretlendiği",
        ],
        "Normalize yükseklik ile gerçek ölçüm birimini ayır.",
        "Ayrı göreli ölçekler gerçek derişim oranını vermez. Gün sırası, işaretli hormon adı ve bir eğrinin kendi içindeki yükselme/tepe zamanı okunabilir.",
      ],
      [
        "Erken gebelikte trofoblast kökenli hCG’nin korpus luteumla ilişkisi hangisidir?",
        "Korpus luteumun sürmesini ve erken steroid desteğini korumasına katkı sağlar.",
        [
          "Korpus luteumdaki bütün DNA’yı zorunlu olarak yok eder.",
          "Rahim yerine bütün fetüsü tek başına oluşturur.",
          "Her oositi dört eşit sperme dönüştürür.",
          "Yalnız mesanenin idrar kapasitesini ölçer.",
        ],
        "hCG’yi bir kaynak desteği sinyali olarak düşün.",
        "hCG luteal yapının devamını destekler; progesteron/östrojen desteği erken endometriyumun korunmasına katkı sağlar. Plasenta geliştikçe steroid üretimindeki payı artar.",
      ],
      [
        "Bir öğretim takviminde ayın 9’u döngünün 1. günü, aynı ayın 22’si ise başka bir gündür. 22’si kaçıncı döngü günüdür?",
        "14. gün",
        ["13. gün", "12. gün", "22. gün", "31. gün"],
        "İlk günü bir say: geçen gün farkına bir ekle.",
        "22−9=13 gün geçmiştir. Başlangıç günü 1 sayıldığından 13+1=14. Bu bir takvim hesabıdır; kişide gerçek ovulasyonun ölçüldüğü anlamına gelmez.",
      ],
      [
        "Ovaryum döngüsü ile rahim döngüsü arasındaki fark hangi seçenekte doğru verilmiştir?",
        "Folikül ve korpus luteum yumurtalıkta; endometriyum değişimleri rahimdedir.",
        [
          "Endometriyum yumurtalık içindeki sperm kanalıdır.",
          "Korpus luteum rahim kasının her ay dışarı atılan adıdır.",
          "Folikül mesanede oluşur, hormonlar yalnız üretradan gider.",
          "Ovaryum ve rahim döngüsü aynı dokunun altı ardışık adı demektir.",
        ],
        "Yapının hangi organa ait olduğunu önce belirle.",
        "Ovaryum döngüsü folikül–ovulasyon–luteal değişimleri izler. Rahimde kanama, çoğalma ve salgı değişimleri olur; iki süreç aynı takvim üzerinde uyum içinde ilerler.",
      ],
      [
        "Menopozun temel biyolojik tanımı hangisidir?",
        "Foliküler döngü ve ovulasyonun sonlanmasıyla ilişkili durum",
        [
          "Her insanda tam aynı doğum gününde ilk mayozun başlaması",
          "Normal implantasyonun yumurta kanalında gerçekleşmesi",
          "Her adet kanamasının yalnız bir günlük adı",
          "Testiste dört spermatidin oluşması",
        ],
        "Yaklaşık yaş aralığını sürecin kendisiyle karıştırma.",
        "Menopoz üreme döngüsünün sonlanmasıyla ilişkilidir. Kaynaklardaki yaklaşık yaşlar herkes için sabit tek bir gün sınırı değildir; geçici bir döngü değişimiyle de özdeş değildir.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 2 PDF s. 5–7 (basılı 125–127); OGM Üreme Sistemi-III PDF s. 2–16; Dersler Cepte Üreme PDF s. 18 doğrudan okundu. 28 gün ve göreli hormon birimleri açık öğretim modelidir; kişisel takvim/derişim ölçümü değildir. Özgün sorular.",
  },
  {
    id: "ureme-embriyonik-gelisim",
    topic: "detail-325",
    title: "Döllenmeden doğuma: embriyonik gelişim",
    minutes: 90,
    objectives: [
      "Döllenme, segmentasyon, implantasyon ve gastrulasyonu yer ve sonuçlarıyla sırala.",
      "Üç embriyonik tabakanın katkılarını hücre farklılaşmasıyla ilişkilendir.",
      "Plasenta, göbek bağı ve embriyo dışı zarları anne ile fetüs arasındaki alışverişte izle.",
      "Gelişim zamanı, ikizlik, doğum ve süt üretiminin koşullarını birbirinden ayır.",
    ],
    sections: [
      {
        title: "İki gametten tek başlangıç hücresine",
        paragraphs: [
          "Döllenme, sperm ile ikincil oositin etkileşimiyle başlayan ve iki haploit çekirdek takımının aynı hücrede bir araya gelmesine uzanan olaylar dizisidir. İnsanlarda çoğunlukla yumurta kanalının geniş bölümünde gerçekleşir. Spermin uygun yüzeylere bağlanması, akrozom tepkimesi ve zarların birleşmesi bu sürecin ayrı basamaklarıdır; yalnız iki hücrenin yan yana gelmesi döllenme değildir.",
          "Oositin etkinleşmesiyle hücre içi kalsiyum sinyalleri oluşur. Kortikal granüllerin içeriği hücre dışı örtüyü değiştirerek ek sperm girişini sınırlamaya katkı verir. Bu engel, normal embriyonun kromozom takımının korunması bakımından önemlidir. Sonucu anlatırken sperm bileşenlerinin her koşulda yalnız baştan ibaret girdiği gibi mutlak bir çizim kuralına dayanma.",
        ],
      },
      {
        title: "Mayozun bitmesi ile çekirdeklerin birleşmesi farklıdır",
        paragraphs: [
          "Ovulasyonda serbestleşen insan hücresi genellikle metafaz II evresindeki ikincil oosittir. Spermle başlayan etkinleşme mayoz II’nin tamamlanmasını ve ikinci kutup hücresinin ayrılmasını tetikler. Bu sırada oluşan dişi çekirdek haploittir; erkek ve dişi genetik takımların birleşmesi daha sonraki aşamada diploit zigotu kurar.",
          "İnsan için olgun gamet çekirdeğinde 23, zigotta 46 kromozom beklenir. Kromozom sayısı ile DNA’nın eşlenmiş olması aynı özellik değildir: zigot ilk mitozundan önce DNA eşler, ancak sırf eşlenme oldu diye türün kromozom takımı dört takıma çıkmaz. Bir soruda n, kromatit ve DNA miktarı birlikte veriliyorsa olayların sırasını önce yaz.",
        ],
      },
      {
        title:
          "Segmentasyon: daha çok hücre, başlangıçta daha büyük olmayan bütün",
        paragraphs: [
          "Zigot art arda mitozlar geçirir. Bu erken bölünmelere segmentasyon denir; oluşan hücreler blastomer olarak adlandırılır. Basit eş zamanlı ve kayıpsız örnekte her tur hücre sayısını iki katına çıkarır: 1, 2, 4, 8, 16. Gerçekte bölünmeler eş zamanlılığını yitirebilir; bu dizi erken sayım öğretmek için kullanılan modeldir.",
          "Erken evrede embriyonun dış sınırının hacmi yaklaşık korunurken her hücrenin ortalama hacmi küçülür. Mitoz yeni kromozom takımları icat etmez; normal blastomerler aynı diploit takımı taşır. Bütün genlerin her hücrede aynı anda etkin olduğu sonucu da çıkmaz. Gelişim, genlerin nerede ve ne zaman çalıştığının denetimiyle ilerler.",
        ],
      },
      {
        title: "Moruladan iç boşluğu olan blastosiste",
        paragraphs: [
          "Sıkı hücre kitlesi görünümündeki erken evre morula olarak adlandırılır. Daha sonra sıvı dolu bir boşluk gelişir ve memelilere özgü blastosist düzeni belirginleşir. Dış hücre tabakası trofoblasttır; iç hücre kitlesi embriyonun kendisini oluşturacak hücrelerin temel kaynağıdır. Boşluk ile iç hücre kitlesi aynı yapı değildir.",
          "Erken dış örtüden çıkış, yani hatching, blastosistin rahim dokusuyla temas kurmasına olanak verir. İç hücre kitlesinin çok sayıda hücre tipine dönüşebilmesi, her birinin tek başına her evrede bütün embriyo dışı yapıları da oluşturacağı anlamına gelmez. Kök hücre potansiyelini evre ve hücrenin bulunduğu bağlamla birlikte değerlendir.",
        ],
      },
      {
        title: "İmplantasyon endometriyumla başlayan karşılıklı bir süreçtir",
        paragraphs: [
          "Blastosist rahim boşluğuna geldikten sonra uygun endometriyumla etkileşir ve dokuya yerleşmeye başlar. Bu olay implantasyondur. Döllenme yumurta kanalında, normal implantasyon rahmin iç tabakasında gerçekleşir; iki olayı aynı yer veya aynı an kabul etmek taşıma yolunu siler.",
          "Trofoblastın gelişimi ile anne dokusunun yanıtı birlikte ilerler. Embriyo doğrudan bir anne damarının içine bırakılmış değildir. Rahim dışı yerleşme, normal bir alternatif gelişim durağı değildir; sağlık değerlendirmesi gerektirir. Konu şeması kişide gebeliğin yerini veya sonucunu teşhis eden araç olarak kullanılmaz.",
        ],
      },
      {
        title: "Gastrulasyon üç tabakayı kurar",
        paragraphs: [
          "Gastrulasyonda hücre hareketleri ve yerleşimleri üç temel embriyonik tabakayı oluşturur: ektoderm, mezoderm ve endoderm. İnsan embriyosunda bu düzen, amniyon ve yolk kesesiyle ilişkili disk biçimindeki yapıda gelişir. Başka hayvanlara ait içe çökme çizimini insan embriyosunun bire bir anatomisi sanma; ortak öğreti tabakaların kurulması ve hücrelerin konum değiştirmesidir.",
          "Mezoderm yalnız gastrulasyon bittikten sonra dışarıdan eklenen bir tabaka değildir; üç tabakalı düzen bu süreçte oluşur. Hücre göçü, bölünmesi ve farklılaşması koordinelidir. Aynı DNA’ya sahip hücrelerin farklı görev edinmesini, farklı kromozom sayısı taşımalarıyla açıklamak yerine farklı gen ifadesi ve hücresel sinyallerle açıkla.",
        ],
      },
      {
        title: "Ektoderm, mezoderm ve endodermi organ katkılarıyla öğren",
        paragraphs: [
          "Ektoderm epidermisin ve sinir sisteminin temel kaynağıdır. Mezoderm kas, kemik, bağ dokusu, kan ve damarlar, böbrekler ve gonadlar gibi çok sayıda yapıya katkı verir. Endoderm sindirim ve solunum yollarının birçok epitelini, karaciğer ile pankreasın salgı yapan temel hücrelerini oluşturur.",
          "Bu eşlemeler bir organın bütün hücrelerinin tek tabakadan geldiğini göstermez. Örneğin bağırsak epitelinin endoderm kökenli olması, duvarındaki düz kasın da endoderm kökenli olduğu anlamına gelmez; düz kas mezoderm katkısıdır. Soru organın tamamını mı, belirli bir doku veya hücreyi mi soruyor, bunu mutlaka ayır.",
        ],
      },
      {
        title: "Organ gelişiminde komşu hücreler birbirini yönlendirir",
        paragraphs: [
          "Hücrelerin çevrelerinden gelen sinyallere yanıt vererek belirli gelişim yollarına yönelmesine embriyonik indüksiyon örnekleri verilir. Bir dokunun oluşumu, yanındaki dokunun sinyalleriyle ilişkili olabilir. Organogenez boyunca hücre bölünmesi, göçü, farklılaşması ve hücreler arası bağlantılar birlikte yeni biçimler oluşturur.",
          "Programlı hücre ölümü olan apoptoz da normal şekillenmenin bir parçasıdır; örneğin bazı geçici hücre gruplarının kaldırılması dokuların ayrılmasına katkı verir. Bu olay her hücre ölümünün hastalık olduğu düşüncesini düzeltir. Farklılaşmış hücrelerin aynı genomu farklı kullanması, gelişimin yalnız hücre sayısını artırmaktan ibaret olmadığını gösterir.",
        ],
      },
      {
        title: "Embriyo dışı zarların her birine ayrı görev ver",
        paragraphs: [
          "Amniyon embriyoyu çevreleyen sıvı ortamın sınırını oluşturur; amniyon sıvısı mekanik etkileri azaltmaya ve gelişen yapılar için uygun ortam sağlamaya katkı verir. Koryon, anne dokusuyla etkileşen ve plasentanın fetal bölümüne katılan önemli zardır. Yolk kesesi insanda büyük bir besin sarısı deposu değildir; erken kan hücresi oluşumu gibi gelişim görevleri taşır.",
          "Allantoyis ve bağlantılı yapılar göbek bölgesindeki gelişime katkı verir. Kuş yumurtasında atık depolama görevi anlatılırken bunu insan fetüsünün bütün azotlu atıklarını bir kesede biriktirdiği şeklinde aktarma. İnsan fetüsünün atıklarının önemli bir kısmı plasenta üzerinden anne dolaşımına geçer ve anne organlarınca uzaklaştırılır.",
        ],
      },
      {
        title: "Plasentada iki kan yolu birbirine karışmadan yaklaşır",
        paragraphs: [
          "Plasenta anne dokusu ve fetal koryon katkılarından oluşan alışveriş organıdır. Fetal damarlar villuslar içinde, anne kanı bunların çevresindeki aralıklarda bulunur. Oksijen ve besinler fetüse; karbondioksit ve birçok atık anneye doğru taşınabilir. Madde geçişi tek bir mekanizmaya indirgenmez; maddenin özelliğine göre farklı taşıma yolları kullanılabilir.",
          "Normal alışveriş iki kanın bütünüyle tek havuzda karışması demek değildir. Bununla birlikte plasenta her zararlı maddeyi veya mikrobu kesin durduran kusursuz bir duvar da değildir. Bazı antikorlar, özellikle IgG, anneden fetüse geçerek pasif bağışıklığa katkı verir; bütün antikor türlerinin aynı ölçüde geçtiği söylenmez.",
        ],
      },
      {
        title: "Göbek kordonunda yönü kalbe göre adlandır",
        paragraphs: [
          "Göbek kordonunda tipik olarak iki atardamar ve bir toplardamar bulunur. Göbek atardamarları kanı fetüsten plasentaya götürür; göbek toplardamarı plasentadan fetüse getirir. Damar adları oksijen miktarına göre değil, fetal kalbe göre akış yönüne göre konur. Bu nedenle göbek toplardamarında oksijence daha zengin kan bulunabilir.",
          "Bir kordon şekli üzerinde önce fetüs ve plasentayı işaretle, sonra okları çiz ve ancak ondan sonra damar adını söyle. Fetal dolaşımdaki şantlar, akciğerlerin doğum öncesinde hava ile gaz alışverişi yapmamasıyla ilişkilidir. Ancak fetüsün hücreleri oksijenli solunum yapar; havayla soluk alıp vermemesi hücresel enerji üretiminin durduğu anlamına gelmez.",
        ],
      },
      {
        title: "Erken gebeliğin hormonal desteği kademeli el değiştirir",
        paragraphs: [
          "Erken trofoblast kökenli hCG, korpus luteumun sürmesine ve progesteron desteğinin korunmasına katkı verir. Progesteron ile östrojen endometriyumun ve gebeliğin sürmesine yardım eder. Plasenta geliştikçe steroid üretimindeki payı artar; bu geçiş ilk trimesterde kademeli olur, herkes için tek bir gün veya zorunlu beşinci ay sınırı değildir.",
          "Gebelikte böbrekler, sindirim, sinir ve dolaşım yapıları aynı anda tamamen olgunlaşmaz. Fetal böbrekler ilk trimesterde idrar üretmeye başlar; ilerleyen evrelerde idrar amniyon sıvısına önemli katkı verir. İdrarın ilk kez altıncı ayda oluştuğu veya bütün organların ilk günden erişkin gibi çalıştığı biçimindeki kesin zaman iddiaları doğru değildir.",
        ],
      },
      {
        title: "Gelişim haftasının nereden sayıldığını kontrol et",
        paragraphs: [
          "Döllenmeden doğuma ortalama yaklaşık 38 hafta, son âdet başlangıcından sayılan klinik gebelik yaşıyla yaklaşık 40 hafta anlatılır. İki sayı farklı başlangıç noktaları kullanır. Döllenmeden sonraki ilk sekiz haftayı izleyen dönemde fetüs adı kullanılır; klinik hafta ifadesiyle karşılaştırırken yaklaşık iki haftalık başlangıç farkını unutma.",
          "Doğum zamanı tek bir zorunlu gün değildir. Prematürite klinik gebelik yaşına göre 37 tamamlanmış haftadan önce doğumu anlatır. Her 270 günden kısa gebeliği aynı sınıfa koymak başlangıç ve tanım farkını siler. Buradaki takvim öğrenme amaçlıdır; kişisel gebelik izlemi veya klinik tarih hesabının yerini almaz.",
        ],
      },
      {
        title: "İkizliği zigot sayısından başlayarak çöz",
        paragraphs: [
          "Çift yumurta ikizlerinde iki ayrı oosit iki ayrı spermle döllenir ve iki zigot oluşur. Genetik benzerlikleri, aynı anne babanın farklı kardeşleri arasındaki benzerlik düzeyinde değerlendirilir. Tek yumurta ikizlerinde bir zigotun erken gelişiminde ayrılma olur; başlangıç genetik yapıları çok benzerdir.",
          "Tek zigottan gelişmek bütün hücrelerin yaşam boyunca her ayrıntıda kesin özdeş kalacağı veya her zaman aynı plasentanın paylaşılacağı anlamına gelmez. Zar ve plasenta paylaşımı ayrılmanın zamanına bağlıdır. İki ayrı zigot ile tek zigotun ayrılması farkını, plasenta sayısını tek başına değişmez genetik test saymadan öğren.",
        ],
      },
      {
        title: "Yardımcı üreme, izlem ve korunmayı görevleriyle ilişkilendir",
        paragraphs: [
          "IVF’de oosit ile sperm uygun laboratuvar ortamında buluşturulur; ICSI’de sperm oosite doğrudan verilir. Gelişen embriyonun rahme aktarılması ayrı basamaktır. Her aktarımın zorunlu olarak aynı dört veya sekiz hücre evresinde yapılması gerekmez. Ultrason, gerektiğinde genetik incelemeler ve sağlık izlemi birbirinden farklı bilgi sağlar.",
          "Folat yeterliliği erken sinir sistemi gelişimi, demir ve B12 kan hücresi yapımı, kalsiyum ve D vitamini kemik gelişimiyle ilişkilidir; dengeli beslenme tek maddeye indirgenmez. Alkol, tütün ve bazı ilaçlar gelişimi olumsuz etkileyebilir; ilaç kararı sağlık uzmanıyla verilir. Kordon kanındaki kan yapıcı kök hücrelerin bazı kullanım alanları olması, bütün hastalıklar için sınırsız tedavi güvencesi oluşturmaz.",
        ],
      },
      {
        title: "Doğum ve emzirmede iki hormonun işini ayır",
        paragraphs: [
          "Doğuma yakın serviksin gerilmesi sinirsel yollarla oksitosin salınmasını destekler; oksitosin rahim kasılmalarını güçlendirerek gerilmeyi artırabilir. Bu, süreç tamamlandığında uyaranın sonlandığı pozitif geri bildirim örneğidir. Pozitif ifadesi yararlı veya zararlı demek değil, başlangıç etkisinin güçlenmesini anlatır.",
          "Doğumdan sonra prolaktin süt yapımını, oksitosin ise meme çevresindeki kasılabilir hücreler aracılığıyla sütün dışarı verilmesini destekler. Süt üretimi ile sütün kanallardan boşalması aynı iş değildir. Emme uyarısı bu sinirsel ve hormonal yolları birlikte etkileyebilir; iki hormonun adını aynı görevin eş anlamlısı gibi ezberleme.",
        ],
      },
    ],
    examples: [
      {
        title: "Dört erken bölünmenin hücre ve hacim hesabı",
        prompt:
          "Başlangıçta tek zigotun toplam hacmi 128 keyfî birimdir. Dört eş zamanlı mitoz turu kayıpsız gerçekleşiyor; toplam hacim sabit. Hücre sayısı ve hücre başına ortalama hacim nedir?",
        strategy:
          "Tur sayısının üstlü sayımını toplam hacmin hücrelere bölünmesiyle birleştir.",
        steps: [
          {
            label: "1. adım",
            explanation: "Her tur sayı iki kat olur: 2⁴ = 16 blastomer.",
          },
          {
            label: "2. adım",
            explanation:
              "Sabit toplam hacmi 16 hücreye böl: 128/16 = 8 birim/hücre.",
          },
          {
            label: "3. adım",
            explanation:
              "Normal mitozda her blastomer diploittir; 16 hücre oluşması tek hücrenin 16n olduğu anlamına gelmez.",
          },
        ],
        answer: "16 hücre; ortalama 8 hacim birimi/hücre.",
        check: "16 × 8 = 128 ile başlangıç hacmini geri kur.",
        pitfall:
          "Gerçek gelişimin her evresinde bütün bölünmelerin eş zamanlı olduğunu varsayma.",
      },
      {
        title: "Bir organ, iki tabaka katkısı",
        prompt:
          "Bir modelde bağırsak iç epitelinin endodermden, bağırsak duvarındaki düz kasın mezodermden geliştiği veriliyor. Bütün bağırsağın yalnız endoderm kökenli olduğu iddiasını değerlendir.",
        strategy: "Doku adlarını organ bütününden ayır.",
        steps: [
          {
            label: "1. adım",
            explanation: "İç epitel için verilen köken endodermdir.",
          },
          {
            label: "2. adım",
            explanation:
              "Düz kas için verilen köken mezodermdir; aynı organın başka dokusudur.",
          },
          {
            label: "3. adım",
            explanation:
              "İki ayrı katkı olduğundan bütün organı tek tabakaya bağlayan iddia model verileriyle çelişir.",
          },
        ],
        answer: "İddia doğru değildir; organ birden çok embriyonik katkı alır.",
        check: "Epitel ve kasın adlarını aynı satırda farklı kökenlerle yaz.",
        pitfall: "Epitel kökenini bütün organa genelleme.",
      },
      {
        title: "Kordon okunu doğru adlandır",
        prompt:
          "Şemada X kanı fetüsten plasentaya, Y plasentadan fetüse taşıyor. X ve Y’nin damar türü ile tipik oksijen farkını açıkla.",
        strategy:
          "Adı kalbe göre yön, oksijeni plasentadaki alışveriş belirler.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Fetüsten uzaklaşan X kordonun göbek atardamarı yönüdür.",
          },
          {
            label: "2. adım",
            explanation: "Fetüse gelen Y göbek toplardamarı yönüdür.",
          },
          {
            label: "3. adım",
            explanation:
              "Plasentadan dönüşte Y tipik olarak oksijence daha zengindir; toplardamar adı düşük oksijen zorunluluğu taşımaz.",
          },
        ],
        answer:
          "X göbek atardamarı, Y göbek toplardamarı; Y’nin oksijeni tipik olarak daha yüksektir.",
        check: "Damar adını değiştirmeden okları fetal kalbe göre tekrar izle.",
        pitfall: "Atardamarı her zaman oksijence zengin kabul etme.",
      },
      {
        title: "Hafta başlangıcını değiştir",
        prompt:
          "Bir eğitim örneğinde döllenme son âdet başlangıcından tam iki hafta sonra kabul ediliyor. Döllenme sonrası 10. hafta tamamlandığında klinik gebelik yaşı kaç tamamlanmış haftadır?",
        strategy: "Aynı güne iki ayrı başlangıçtan uzaklığı hesapla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Klinik başlangıç döllenmeden iki hafta öncedir.",
          },
          {
            label: "2. adım",
            explanation:
              "Döllenme sonrası 10 haftaya bu iki haftayı ekle: 10 + 2 = 12.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu yalnız verilen iki haftalık varsayımın hesabıdır; kişide ovulasyon tarihini kesinleştirmez.",
          },
        ],
        answer: "12 tamamlanmış klinik hafta.",
        check:
          "Daha erken başlangıç aynı olay için daha büyük süre vermelidir.",
        pitfall: "38 ve 40 haftayı birbirini çürüten iki ölçü sanma.",
      },
    ],
    recall: [
      {
        prompt:
          "Segmentasyonda hücre sayısı artarken ortalama hücre hacmi neden küçülebilir?",
        answer:
          "Erken modelde toplam dış hacim yaklaşık sabit kalır; aynı hacim daha fazla blastomere bölünür.",
      },
      {
        prompt: "Bağırsak epiteli ile düz kası hangi tabakalara örnektir?",
        answer:
          "Epitel için endoderm; düz kas için mezoderm katkısı. Bütün organı tek kökene indirgemeyiz.",
      },
      {
        prompt: "Göbek toplardamarı hangi yönde taşır?",
        answer: "Plasentadan fetüse; damar adı fetal kalbe göre yöne dayanır.",
      },
      {
        prompt: "Prolaktin ve oksitosin emzirmede hangi farklı işleri yapar?",
        answer:
          "Prolaktin süt yapımını, oksitosin sütün verilmesini destekler.",
      },
    ],
    items: [
      [
        "Normal insan üremesinde döllenme ve implantasyonun tipik yerleri hangi seçenekte doğru sıradadır?",
        "Yumurta kanalı; rahim endometriyumu",
        [
          "Vajina; yumurtalık folikülü",
          "Rahim kası; üretra",
          "Plasenta; mesane",
          "Serviks; epididimis",
        ],
        "Hücre birleşmesi ile yerleşmeyi ayır.",
        "Döllenme çoğunlukla yumurta kanalında olur. Embriyo daha sonra rahme taşınır ve endometriyuma yerleşir; ikisi aynı olay değildir.",
      ],
      [
        "Tek zigottan başlayan, kayıpsız ve eş zamanlı üç mitoz turu sonunda kaç blastomer oluşur?",
        "8",
        ["3", "4", "6", "16"],
        "Her tur hücre sayısını ikiyle çarp.",
        "Başlangıç 1 hücredir; üç tur sonunda 1 × 2³ = 8 hücre olur. Tur sayısı hücre sayısıyla aynı değildir.",
      ],
      [
        "Toplam hacmi sabit 96 keyfî birim olan erken embriyo modelinde 12 blastomer var. Hücre başına ortalama hacim kaç birimdir?",
        "8",
        ["6", "12", "24", "1.152"],
        "Toplamı hücre sayısına böl.",
        "96/12 = 8 birim/hücre. Bu ortalamadır; her gerçek blastomerin aynı büyüklükte olduğu sonucu ayrıca varsayılmadıkça çıkmaz.",
      ],
      [
        "İnsan embriyosunda gastrulasyonun temel sonucu hangisidir?",
        "Ektoderm, mezoderm ve endoderm düzeninin kurulması",
        [
          "Bütün hücrelerin haploit sperme dönüşmesi",
          "Bütün organların erişkin olgunluğa aynı anda ulaşması",
          "Her hücrenin zorunlu farklı kromozom sayısı edinmesi",
          "Anne ve fetal kanın tek ortak damara karışması",
        ],
        "Hücrelerin konumları ve tabakalarıyla düşün.",
        "Gastrulasyon üç embriyonik tabakayı oluşturur. Farklılaşma çoğunlukla farklı gen ifadesiyle gerçekleşir; her doku için farklı kromozom takımı gerekmez.",
      ],
      [
        "Aşağıdaki belirli doku–embriyonik katkı eşlemelerinden hangisi doğrudur?",
        "Bağırsak duvarındaki düz kas — mezoderm",
        [
          "Sinir sistemi — yalnız endoderm",
          "Epidermis — yalnız mezoderm",
          "Kan hücreleri — yalnız ektoderm",
          "Sindirim yolu iç epiteli — yalnız trofoblast",
        ],
        "Organın tamamı yerine adı verilen dokuya bak.",
        "Düz kas mezoderm katkısıdır. Aynı bağırsakta iç epitel endodermden gelişebilir; bir organın dokuları farklı köken katkıları alır.",
      ],
      [
        "Normal plasenta alışverişiyle ilgili doğru ifade hangisidir?",
        "Fetal damar kanı ile anne kanı ayrı bölmelerde yaklaşır; bazı maddeler aradaki yapılardan geçer",
        [
          "Bütün anne kanı önce fetal aorta doğrudan akar",
          "Plasenta bütün zararlı maddeleri kesin engeller",
          "Bütün antikor çeşitleri aynı oranda zorunlu geçer",
          "Fetüs bütün atığını yalnız amniyonda biriktirir",
        ],
        "Yakın temas ile kanların karışmasını ayır.",
        "Plasentada fetal villus damarları anne kanıyla çevrili alanlara yaklaşır; normalde iki kan yolu tek havuz değildir. Bariyer seçicidir ama bütün maddeler için kusursuz engel değildir.",
      ],
      [
        "Tipik göbek kordonunda plasentadan fetüse dönen, oksijence daha zengin kanı hangi damar taşır?",
        "Göbek toplardamarı",
        [
          "Göbek atardamarlarının her biri",
          "Anne portal veni",
          "Fetal üreter",
          "Yumurta kanalı",
        ],
        "Adlandırma fetal kalbe göre yönü izler.",
        "Göbek toplardamarı plasentadan fetüse gelir. Göbek atardamarları fetal kanı plasentaya götürür; oksijen düzeyi damar adının tek ölçütü değildir.",
      ],
      [
        "İki ayrı oositin iki ayrı spermle döllenmesiyle başlayan ikizlik için kesin başlangıç bilgisi hangisidir?",
        "İki ayrı zigot oluşmuştur",
        [
          "Tek zigotun tek mitozu ikiye ayrılmıştır",
          "Bütün genler iki kardeşte zorunlu özdeştir",
          "Mutlaka tek ortak amniyon vardır",
          "İki embriyonun her hücresi aynı DNA mutasyonlarını taşır",
        ],
        "Başlangıç döllenme olaylarını say.",
        "İki oosit ve iki spermden iki zigot oluşur; bu çift yumurta ikizliğidir. Genetik özdeşlik veya zar paylaşımı bu öncülden zorunlu çıkmaz.",
      ],
      [
        "Fetüsün doğum öncesi enerji ve gaz alışverişi için doğru açıklama hangisidir?",
        "Hücreleri oksijenli solunum yapabilir; oksijen plasenta üzerinden sağlanır",
        [
          "Havayla soluk almadığı için hücresel solunum hiç yoktur",
          "Bütün oksijen yalnız amniyon suyunun yutulmasından gelir",
          "Her fetal doku yalnız etil alkol fermantasyonu yapar",
          "Göbek kordonu gaz alışverişi yapan hava borusudur",
        ],
        "Organ düzeyindeki soluk alışverişini hücresel solunumdan ayır.",
        "Doğum öncesi akciğerler havayla gaz alışverişi yapmaz; buna rağmen fetal hücrelerde oksijenli enerji üretimi vardır. Oksijen anne–plasenta–fetal dolaşım bağlantısıyla ulaşır.",
      ],
      [
        "Süt yapımı ve sütün memeden verilmesi için temel hormon eşlemesi hangisidir?",
        "Yapım: prolaktin; verilme: oksitosin",
        [
          "Yapım: oksitosin; verilme: yalnız ADH",
          "Yapım: melatonin; verilme: tiroksin",
          "Yapım: kalsitonin; verilme: aldosteron",
          "Yapım: yalnız inhibin; verilme: glukagon",
        ],
        "Üretilen sütün dışarı çıkarılması ayrı basamaktır.",
        "Prolaktin süt sentezini, oksitosin kasılabilir hücrelerin yanıtıyla süt salıverilmesini destekler. Aynı emme uyarısı iki farklı yolu etkileyebilir.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 2 fiziksel PDF 8–14; OGM Üreme Sistemi II ve Embriyonik Gelişim I sunuları; Dersler Cepte Üriner–Üreme basılı 19 ile karşılaştırılmış özgün öğretim. Embriyonik tabaka katkıları, ilk trimester hormonal geçiş ve fetal idrar başlangıcı kaynak genellemelerinden ayrılmıştır. Sorular resmî sınav maddesi değildir.",
  },
  {
    id: "ekoloji-komunite",
    topic: "detail-326",
    title: "Komünite ekolojisi: çeşitlilik, ilişkiler ve değişim",
    minutes: 95,
    objectives: [
      "Komüniteyi popülasyon, habitat, niş ve ekosistemden ayır.",
      "Çeşitlilik, baskınlık, kilit taşı, gösterge ve istilacılık için gerekli kanıtı seç.",
      "Türler arası ilişkileri kontrol grubuna göre yarar, zarar veya gözlenen etkisizlikle yorumla.",
      "Rekabet, savunma ve süksesyonu çevre ve zaman koşulları içinde açıkla.",
    ],
    sections: [
      {
        title: "Komünite bir arada yaşayan farklı popülasyonlardır",
        paragraphs: [
          "Belirli bir alanda ve zamanda birlikte bulunan farklı türlerin popülasyonları komüniteyi oluşturur. Bir göldeki sazanların tümü bir popülasyon örneğidir; aynı gölde yaşayan balıklar, planktonlar, bitkiler ve mikroorganizmaların topluluğu komünite kapsamında ele alınır. Sayımda alan, zaman ve hangi canlı gruplarının incelendiği belirtilmelidir.",
          "Ekosistem, bu canlılar ile su, ışık, sıcaklık ve mineral gibi cansız çevre etmenlerinin etkileşimini de kapsar. Komünite yalnız hayvanlar veya yalnız görünür büyük canlılar demek değildir. Tür sayısını karşılaştırırken bir gölde yalnız balıkları, diğerinde bütün canlı gruplarını saymak farklı kapsamları aynı veri gibi kullanmaktır.",
        ],
      },
      {
        title: "Habitat yer; niş ilişkili görev ve koşullar bütünüdür",
        paragraphs: [
          "Habitat bir canlının yaşadığı ortamdır. Ekolojik niş ise kullandığı kaynakları, çevresel gereksinimlerini, etkinlik zamanını ve diğer canlılarla ilişkilerini içerir. Aynı ormanda iki kuş türü yaşayabilir, fakat biri gövde çatlaklarında diğeri yaprak uçlarında besleniyorsa kaynak kullanımları farklıdır.",
          "Nişi yalnız meslek adı gibi tek kelimeye veya yalnız beslenmeye indirgeme. Bir canlının yaşam evresine göre habitatı ve nişi değişebilir; kurbağa larvası ile erişkini aynı kaynakları aynı biçimde kullanmaz. İki türün aynı yerde görülmesi nişlerinin bütünüyle aynı olduğunu kanıtlamaz; kaynak ve zaman verisi gerekir.",
        ],
      },
      {
        title: "Tür zenginliği ve bireylerin dağılımı farklı bilgi verir",
        paragraphs: [
          "Tür zenginliği sayılan türlerin sayısıdır. Tür çeşitliliğini yorumlarken türlerin birey sayılarının ne kadar dengeli dağıldığı da önemlidir. Dört tür içeren iki alandan birinde bireyler 25; 25; 25; 25; diğerinde 97; 1; 1; 1 ise zenginlik eşit, eşitlik farklıdır.",
          "Biyoçeşitlilik yalnız komünitedeki tür sayısından ibaret değildir; tür içi genetik ve ekosistem çeşitliliği de vardır. Bir türün bütün bireylerinin çevre değişimine zorunlu aynı yanıtı vereceği söylenemez. Karşılaştırma yaparken örnekleme çabası, mevsim ve alan büyüklüğü benzer olmalıdır; daha büyük alanda daha çok tür bulmak tek başına daha yüksek yerel çeşitlilik kanıtı değildir.",
        ],
      },
      {
        title: "Çevre koşulları çeşitliliğin sınırlarını etkiler",
        paragraphs: [
          "Işık, sıcaklık, su, tuzluluk, besin kaynakları ve habitat yapısı hangi türlerin bir arada bulunabileceğini etkiler. Karasal alanlarda ekvatora yakın birçok sıcak ve nemli bölgede tür zenginliği yüksektir. Sucul ortamlarda ışık ve besin dağılımı, derinlik ve oksijen gibi etmenler birlikte değerlendirilir.",
          "Bunlar bütün yerler için tek etmenli değişmez sıralama değildir. Derin denizde ışık az diye hiç canlı veya hiç çeşitlilik olmadığı sonucu çıkmaz; farklı enerji kaynaklarına dayanan topluluklar da vardır. Bir grafik yalnız incelenen alan ve zaman aralığında ilişki gösteriyorsa, onu bütün dünyada kesin nedensel yasa gibi okumamak gerekir.",
        ],
      },
      {
        title: "Ekoton iki topluluğun temas bölgesidir",
        paragraphs: [
          "Komşu komünitelerin karşılaştığı geçiş alanına ekoton denir. Orman ile çayır arasındaki kenar, iki ortamın bazı türlerini ve kenara özgü türleri birlikte barındırabilir. Işık, nem ve rüzgâr gibi koşullar da kenarda değiştiğinden burada görülen desen yalnız iki listenin mekanik toplamı değildir.",
          "Kenar etkisi kimi durumlarda tür sayısını artırabilir; fakat her ekotonun zorunlu en zengin, en az bireyli veya bütün türler için en elverişli yer olduğu söylenmez. Dar kenar koşulları iç ortam türlerini olumsuz etkileyebilir. Gerçek yorum için alan büyüklüğü ve hangi türlerin sayıldığı gibi ölçüm koşullarını koru.",
        ],
      },
      {
        title: "Baskın tür, kilit taşı ve göstergeyi ayrı sorularla tanı",
        paragraphs: [
          "Baskın tür sayı, biyokütle veya kapladığı alan gibi belirtilen ölçütte öne çıkar. Kilit taşı türün ekolojik etkisi kendi bolluğuna göre orantısız büyüktür; çıkarılması ağın yapısını ciddi biçimde değiştirebilir. Bu iki ad aynı türü gösterebilir ama anlamları aynı değildir.",
          "Gösterge türün varlığı, yokluğu veya durumundaki değişim çevre koşulları hakkında bilgi sağlar. Örneğin kimi likenlerin hava kirliliğine duyarlılığı izleme amacıyla kullanılabilir. Gösterge ile kirleticinin nedeni aynı şey değildir. Bir canlının rengi veya büyük gövdesi tek başına onu kilit taşı ya da gösterge yapmaz; etkisini gösteren karşılaştırmalı kanıt gerekir.",
        ],
      },
      {
        title: "Yabancı tür her zaman istilacı değildir",
        paragraphs: [
          "Doğal yayılış alanı dışına insan etkisiyle taşınan tür yabancı tür olarak ele alınabilir. Bu türün yerleşip yayılması ve çevreye, ekonomiye veya insan sağlığına zarar vermesi istilacılık değerlendirmesinde önemlidir. Aynı tür bir bölgede doğal topluluğun parçası, başka bir bölgede zararlı yayılan tür olabilir.",
          "Bir türe bütün dünyada bağlamdan bağımsız istilacı damgası vurmak doğru değildir. Sazan örneğinde de su havzası, doğal yayılış ve etkiler belirtilmelidir. Yerli bir türün sayısının artması ile yabancı tür istilası farklıdır. Mücadele kararları tür kimliği, ekolojik etki ve uygulanacak yöntemin diğer canlılara etkisiyle birlikte düşünülür.",
        ],
      },
      {
        title: "Rekabet ortak ve sınırlı kaynağa dayanır",
        paragraphs: [
          "Canlıların gereksindiği aynı kaynağın miktarı talepleri karşılamadığında rekabet ortaya çıkabilir. Besin, su, ışık, yuva alanı veya eş için tür içi rekabet; farklı türler arasında ise türler arası rekabet görülebilir. Doğrudan kavga gerekmez: bir bitkinin gölgesi komşusuna ulaşan ışığı azaltabilir.",
          "Rekabetin iki tarafa maliyeti olduğu için basit işaret tablosunda −/− gösterimi kullanılır. Bu, her iki popülasyonun da mutlaka yok olması veya her bireyin aynı zarar görmesi demek değildir. Kaynak bol olduğunda aynı alanda bulunmak tek başına rekabet kanıtı olmaz; kontrol koşulları ve kaynak kullanımı karşılaştırılmalıdır.",
        ],
      },
      {
        title: "Rekabet dışlanması koşullarıyla geçerlidir",
        paragraphs: [
          "Gause deneyleriyle örneklenen rekabet dışlanması düşüncesi, aynı sınırlı kaynağı aynı biçimde kullanan türlerin sabit koşullarda uzun süre tam örtüşen nişlerle bir arada kalmakta zorlanacağını anlatır. Başarı, koşula göre bir türün diğerini azaltması veya yerel olarak dışlamasıyla sonuçlanabilir.",
          "Doğada çevre heterojenliği, değişen koşullar ve kaynak paylaşımı birlikte yaşamaya olanak verir. Kuşların ağacın farklı katlarında beslenmesi ya da farklı saatlerde etkin olması niş ayrışmasına örnektir. Rekabet yaşayan her iki türün bütün dünyada birbirini mutlaka yok edeceğini söylemek bu koşulları aşar.",
        ],
      },
      {
        title: "Karakter kayması hedefli bir karar değildir",
        paragraphs: [
          "Bir arada yaşayan türlerin kaynak kullanımına ilişkin kalıtsal özelliklerinde ayrışma görülmesi karakter kayması bağlamında incelenebilir. Doğal seçilim, farklı kaynakları daha iyi kullanan varyantların üreme başarısını etkileyebilir. Sonuç uzun zaman içinde popülasyonların özellik dağılımında değişimdir.",
          "Canlıların ihtiyaç duyunca bilinçli biçimde gagalarını veya genlerini değiştirdiği anlatımı doğru değildir. Aynı anda görülen iki özellik farkı tek başına evrimsel nedeni kanıtlamaz; ayrı ve birlikte yaşayan popülasyonların karşılaştırılması gibi kanıt gerekir. Bireyin gelişim sırasında verdiği esnek yanıt ile kuşaklar arası kalıtsal değişimi ayır.",
        ],
      },
      {
        title: "Av–avcı ilişkisini zaman içinde takip et",
        paragraphs: [
          "Avcı canlı başka canlıyı yakalayıp tüketerek kaynak kazanır; av zarar görür. Otçullukta bitkinin tamamı yerine bazı kısımları tüketilebilir. Bir avın artması avcı için besini artırabilir; avcıdaki artış daha sonra av üzerindeki baskıyı değiştirebilir. Bu nedenle bazı grafiklerde avcı tepe noktası avı gecikmeli izler.",
          "Her av–avcı çiftinin aynı aralıkla kusursuz döngü çizmesi beklenmez. Hastalık, başka besinler, iklim ve göç de sayıları etkiler. Bir tür çıkarılınca bütün ağın tek yönde kesin değişeceği iddiası, alternatif yollar ve rekabet bilinmeden kurulamaz. Gözlenen zaman ilişkisiyle nedensel mekanizmayı birlikte değerlendir.",
        ],
      },
      {
        title: "Savunma ve taklit hangi alıcıyı etkiliyor?",
        paragraphs: [
          "Diken ve kabuk gibi mekanik özellikler, zehirli veya tatsız maddeler, kaçış ve saklanma avlanma olasılığını etkileyebilir. Kamuflaj çevreyle benzerlik yoluyla fark edilmeyi azaltır. Uyarıcı renkler bazı savunmalı canlıların tanınmasına katkı verir; canlıların deneyimi ve duyuları da etkilidir.",
          "Taklitte bir canlının görünümü başka bir canlıya veya nesneye benzer. Savunmasız bir türün savunmalı türe benzemesi ile iki savunmalı türün benzer uyarı görünümü geliştirmesi aynı koşul değildir. Bazı avcılar da avı kendine çeken taklitler kullanır. Yalnız parlak renk görmek, türün kesin zehirli olduğunu kanıtlamaz.",
        ],
      },
      {
        title: "Yarar ve zararı kontrol grubuna göre tanımla",
        paragraphs: [
          "Bir ilişkiyi +, − veya 0 ile özetlemek için her türün ilişkisiz kontrol koşuluna göre üreme, yaşama veya uygun başka ölçütünün nasıl değiştiğini incele. İki türün de yarar gördüğü +/+ mutualizm; birinin yarar görüp ötekinde ölçülen net etki bulunmadığı +/0 kommensalizm örneğidir.",
          "0 işareti evrendeki hiçbir etkinin olmadığı anlamına gelmez; seçilen koşul, zaman ve ölçütte belirgin net etki gözlenmediğini söyler. Bir birey sayımı ilişkinin bütün mekanizmasını açığa çıkarmaz. +/− örüntüsü avcılıkta da parazitlikte de görülebilir; bu ikisini ayırmak için ilişkinin süresi ve tüketim biçimi gibi ek bilgi gerekir.",
        ],
      },
      {
        title: "Mutualizmin somut örneklerinde paylaşılan kaynağı izle",
        paragraphs: [
          "Mikoriza ilişkisinde mantar köke su ve mineral alımında katkı verebilir; bitkiden organik bileşik alır. Liken birlikteliğinde mantar ortam ve koruma sağlarken fotosentez yapan ortak organik madde üretimine katkı verir. Otçul sindirim sistemindeki mikroorganizmalar selüloz gibi bileşenlerin işlenmesini kolaylaştırabilir.",
          "Bu örneklerin her ayrıntısı bütün ortaklıklarda aynı değildir. Bazı liken ortakları uygun koşullarda ayrı da yaşayabilir; iki ortağın da tek başına asla yaşayamayacağı genellemesi kurulmaz. Geviş getirenlerin mikrobiyotasında konağa önemli enerji katkısı uçucu yağ asitleri üzerinden olabilir; ilişkiyi yalnız hazır glikoz paylaşımı olarak daraltma. Simbiyoz dar kullanımda uzun süreli yakın birlikteliği anlatır; okulun ilişki tabloları daha geniş etki türlerini de karşılaştırır.",
        ],
      },
      {
        title: "Kommensalizm, amensalizm ve gözlenen etkisizlik",
        paragraphs: [
          "Bir canlının diğerinin sağladığı barınak veya taşıma olanağından yararlanıp diğerinin uygun ölçütte belirgin etkilenmediği koşullar +/0 olarak anlatılabilir. Deniz şakayığıyla ilişkili örneklerde deniz şakayığının bir anemon olduğunu unutma; onu bütün bağlamlarda mercan adıyla özdeşleştirme. İlişkinin işareti verilen koşula bağlıdır.",
          "Bir türün olumsuz etkilenip diğerinde ölçülen net etki bulunmadığı −/0 amensalizm örneğidir; örneğin çevreye salınan bir maddenin bazı komşuları baskılaması bu çerçevede incelenebilir. Hiçbir net fark gözlenmeyen 0/0 deseni de ölçümün sonucudur. Bu desenlerden canlının niyeti veya bütün ekolojik rolü çıkarılmaz.",
        ],
      },
      {
        title: "Parazit ile konağı zaman ve besin bağı üzerinden bağla",
        paragraphs: [
          "Parazit konağından kaynak sağlayarak yararlanır, konak zarar görür. Ektoparazit vücut yüzeyinde, endoparazit iç ortamda yaşar. Yapıları yaşam biçimlerine uyarlanabilir; bazı gruplarda tutunma yapıları ve yüksek üreme kapasitesi öne çıkar. Ancak bütün iç parazitlerin sindirim sistemi olmadığı söylenemez; gruplar arasında fark vardır.",
          "Vektör bir etkeni taşıyan aracıdır. Sıtma etkeni Plasmodium bir ökaryotik parazittir; uygun dişi Anopheles sivrisineği aktarımda rol alabilir. Her sivrisinek ısırığı aynı hastalığı oluşturmaz. Virüsler hücresel yapıda değildir; onları tek hücreli parazitlerle aynı hücre sınıfına koymamak gerekir.",
        ],
      },
      {
        title: "Parazit bitkilerde hangi madde hazır alınıyor?",
        paragraphs: [
          "Yarı parazit bitkiler fotosentez yapabilir; konaktan özellikle su ve mineral alma ilişkisi kurarlar. Ökse otu bu çerçevede anlatılan örneklerdendir. Tam parazit bitkiler organik maddeyi de konaktan sağlama bakımından farklıdır; küsküt veya canavar otu gibi örnekler okul kaynaklarında kullanılır.",
          "Bitkinin başka bitki üzerinde bulunması tek başına parazit olduğunu göstermez; epifit, başka bitkiyi yalnız tutunma yüzeyi olarak kullanabilir. Soruda klorofil, fotosentez ve alınan madde yolu veriliyorsa bunları birlikte kullan. Suyu almak ile hazır organik besini almak aynı bağımlılık düzeyi değildir.",
        ],
      },
      {
        title: "Birincil ve ikincil süksesyonu başlangıçtan ayır",
        paragraphs: [
          "Komünitenin zaman içinde tür bileşimi ve yapısının değişmesine süksesyon denir. Birincil süksesyon toprak oluşmamış veya yeni açılmış çıplak yüzey gibi başlangıçlarda ele alınır. Öncü canlılar yüzeyin aşınması, organik birikim ve yeni canlıların yerleşmesine katkı verebilir; liken ve yosunlar bazı örneklerde önemlidir.",
          "İkincil süksesyonda önceki topluluk bozulmuş fakat toprak, tohum bankası veya bazı canlı kalıntıları korunmuş olabilir; terk edilmiş tarla veya yangın sonrası alan örnektir. Her alanın aynı tür sırasıyla zorunlu ormana dönmesi beklenmez. İklim, toprak, bozucu olay ve yayılabilecek türler gelişim yolunu değiştirir.",
        ],
      },
      {
        title: "Klimaks durağan ve ölü bir son değildir",
        paragraphs: [
          "Klimaks kavramı belirli çevre koşullarında görece kararlı topluluk düzeni için kullanılır. Bu düzende de bireyler doğar ve ölür, madde ve enerji akışı sürer. Kararlılık bütün bireylerin veya tür sayılarının donması demek değildir; değişimler belirli sınırlar içinde kalabilir.",
          "İklim değişimi, yangın, otlatma veya yeni türlerin gelişi topluluğu yeniden dönüştürebilir. Ekolojik restorasyon yalnız ağaç dikmek değil, yerel koşullara uygun yapı ve işlevlerin iyileştirilmesidir; doğal çayırı orman hedefiyle değiştirmek her yerde doğru amaç değildir. Süksesyonu verilen başlangıç ve çevre koşullarına göre değerlendir.",
        ],
      },
    ],
    examples: [
      {
        title: "Aynı zenginlik, farklı eşitlik",
        prompt:
          "İki eşit alan aynı yöntemle sayılıyor. X alanında dört türün sayıları 25; 25; 25; 25; Y’de 97; 1; 1; 1. Zenginlik ve eşitliği karşılaştır.",
        strategy: "Tür sayısı ile birey dağılımını ayrı hesapla.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Her iki listede dört tür vardır; tür zenginliği eşittir.",
          },
          {
            label: "2. adım",
            explanation:
              "Her iki toplam da 100 bireydir; fark toplam birey sayısından kaynaklanmaz.",
          },
          {
            label: "3. adım",
            explanation:
              "X’te paylar eşitken Y’de bir tür %97 pay taşır; X’in eşitliği daha yüksektir.",
          },
        ],
        answer: "Zenginlik eşit; X’in eşitliği daha yüksek.",
        check: "Yüzdeleri toplayınca her alanda %100 olmalı.",
        pitfall:
          "Tek sayıya bakarak bütün biyoçeşitlilik düzeylerini eşitleme.",
      },
      {
        title: "İki kontrollü etkiyi oku",
        prompt:
          "A tek başına 20, B tek başına 12 bireye ulaşıyor. Aynı koşullarda birlikte A=26, B=18. Başlangıç ve ölçüm süreleri aynı. Bu ölçütte etki işaretleri nedir?",
        strategy: "Birlikte değerden her türün kendi kontrolünü çıkar.",
        steps: [
          {
            label: "1. adım",
            explanation: "A değişimi 26−20 = +6 bireydir.",
          },
          {
            label: "2. adım",
            explanation: "B değişimi 18−12 = +6 bireydir.",
          },
          {
            label: "3. adım",
            explanation:
              "İki değişim de pozitif olduğundan bu ölçütte +/+ etki vardır; mekanizmayı ayrıntılandırmak için ek veri gerekir.",
          },
        ],
        answer: "+/+; mutualizmle uyumlu yarar örüntüsü.",
        check: "A’yı B’nin kontrolüyle değil kendi kontrolüyle karşılaştır.",
        pitfall: "Sayı farkından hangi besinin taşındığını uydurma.",
      },
      {
        title: "Artı eksi tek mekanizma seçtirmez",
        prompt:
          "Kontrollü deneyde A yalnızken 15, birlikte 20; B yalnızken 30, birlikte 18 birey veriyor. Yalnız bu sayılarla avcılık mı parazitlik mi kesin seçilebilir?",
        strategy: "Önce işareti bul, sonra işaretin kanıt sınırını söyle.",
        steps: [
          {
            label: "1. adım",
            explanation: "A için 20−15 = +5; A yarar görüyor.",
          },
          {
            label: "2. adım",
            explanation: "B için 18−30 = −12; B zarar görüyor.",
          },
          {
            label: "3. adım",
            explanation:
              "+/− deseni hem avcılık hem parazitlikle uyumludur; süre, konağın kullanımı ve tüketim bilgisi yoksa kesin ayrım yapılamaz.",
          },
        ],
        answer: "Hayır; +/− belirlenir ama mekanizma tekleşmez.",
        check: "İki olası ilişkinin de aynı işareti taşıdığını kontrol et.",
        pitfall: "Sonuç işaretini ilişkinin ayrıntılı adıyla özdeşleştirme.",
      },
      {
        title: "Bozulma sonrası başlangıcı seç",
        prompt:
          "X alanı yeni soğuyan lav üzerinde ve henüz topraksız. Y alanında yangından sonra toprak ve bazı tohumlar duruyor. Süksesyon türlerini açıkla.",
        strategy:
          "Toprak ve biyolojik kalıntıların korunup korunmadığını incele.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "X’te toprak bulunmadığından başlangıç birincil süksesyon örneğidir.",
          },
          {
            label: "2. adım",
            explanation:
              "Y’de önceki toprağın ve tohumların kalması ikincil süksesyonla uyumludur.",
          },
          {
            label: "3. adım",
            explanation:
              "İki alanın aynı hız ve aynı tür sırasını izlemesi zorunlu değildir; çevre ve başlangıç farklıdır.",
          },
        ],
        answer: "X birincil; Y ikincil süksesyon.",
        check:
          "Yangın sözcüğünü tek başına yeterli sayma; verilen toprak koşulunu kullan.",
        pitfall: "Bütün süksesyonların zorunlu ormanla biteceğini ileri sürme.",
      },
    ],
    recall: [
      {
        prompt: "Habitat ile nişin farkını bir kuş örneğiyle açıkla.",
        answer:
          "Habitat yaşadığı ormandır; niş hangi kaynakları, nerede ve ne zaman kullandığı gibi koşul ve ilişkileri de kapsar.",
      },
      {
        prompt: "Tür zenginliği eşitken çeşitlilik yorumu neden değişebilir?",
        answer:
          "Türlerin birey paylarının eşitliği farklı olabilir; örnekleme kapsamı da korunmalıdır.",
      },
      {
        prompt: "+/− işareti neden tek başına avcılığı kanıtlamaz?",
        answer:
          "Parazitlik de aynı net yarar–zarar örüntüsünü verebilir; mekanizma için ek veri gerekir.",
      },
      {
        prompt:
          "Birincil ile ikincil süksesyonda hangi başlangıç bilgisini ararsın?",
        answer:
          "Önceden oluşmuş toprak ve biyolojik kalıntıların bulunup bulunmadığını; ikincilde bunlar korunmuş olabilir.",
      },
    ],
    items: [
      [
        "Aynı gölde ve aynı ayda yaşayan farklı balık, alg, bitki ve mikroorganizma popülasyonlarının birlikte ele alınması hangi düzeydir?",
        "Komünite",
        [
          "Tek bir birey",
          "Yalnız tek tür popülasyonu",
          "Bir nükleotit",
          "Yalnız cansız çevre",
        ],
        "Farklı türlerin popülasyonlarını birlikte düşün.",
        "Komünite belirli alan ve zamanda farklı tür popülasyonlarının topluluğudur. Cansız çevreyle bütün etkileşimleri birlikte kapsayan üst çerçeve ekosistemdir.",
      ],
      [
        "Eşit örneklenen iki alanda tür sayıları dörderdir. A’da bireyler 10; 10; 10; 10; B’de 37; 1; 1; 1. Veriler hangi sonucu destekler?",
        "Tür zenginliği eşit, A’daki dağılım daha eşittir",
        [
          "B’de beş tür vardır",
          "A’da toplam birey sayısı daha azdır",
          "B’nin her türü aynı paydadır",
          "B bütün çeşitlilik ölçütlerinde zorunlu üstündür",
        ],
        "Dört sayı dört türü; sayıların dengesi eşitliği anlatır.",
        "Her alanda dört tür ve toplam 40 birey vardır. A’da her tür %25 iken B’de tek tür %92,5 pay taşır; zenginlik eşitliği, dağılım eşitliği değildir.",
      ],
      [
        "A türü yalnızken 16, B yalnızken 10 bireye ulaşıyor. Aynı başlangıç, süre ve kaynak koşullarında birlikte A=12, B=7. Bu ölçütte etki deseni nedir?",
        "−/−",
        ["+/+", "+/0", "0/0", "+/−"],
        "Her türü kendi yalnız kontrolüyle karşılaştır.",
        "A için 12−16 = −4, B için 7−10 = −3. İki tür de kontrolüne göre azaldığından −/− örüntüsü rekabetle uyumludur; ikisinin de yok olması gerekmez.",
      ],
      [
        "Kontrollü koşulda A’nın üreme ölçütü artmış, B’ninki değişmemiştir. Seçilen ölçüt ve süre için uygun özet hangisidir?",
        "+/0; kommensalizmle uyumlu net etki",
        [
          "+/+; iki yarar zorunludur",
          "−/−; iki zarar zorunludur",
          "0/0; A’nın artışı sayılmaz",
          "B’nin bütün evrende hiçbir etkilenmesi yoktur",
        ],
        "0 seçilen ölçütte net fark gözlenmediğini anlatır.",
        "A pozitif, B sıfır net etki taşır. Bu +/0 kommensalizm örüntüsüdür; B için her koşulda hiçbir etki olamayacağı gibi sınırsız bir sonuç kurulmaz.",
      ],
      [
        "Az sayıda bulunmasına rağmen deneysel çıkarılması topluluk ağını büyük ölçüde değiştiren tür için hangi niteleme desteklenir?",
        "Kilit taşı tür",
        [
          "Mutlaka en yüksek sayılı baskın tür",
          "Mutlaka yabancı istilacı tür",
          "Yalnız cansız habitat",
          "Kesin olarak tek hücreli virüs",
        ],
        "Etkinin bolluğa göre büyüklüğüne odaklan.",
        "Kilit taşı türün topluluk üzerindeki etkisi bolluğuna oranla büyüktür. Az sayılı olması baskınlık iddiasını desteklemez; yabancı köken veya hastalık etkeni olduğu da verilmemiştir.",
      ],
      [
        "Bir bitki başka bir ağacı yalnız tutunma yüzeyi olarak kullanıyor; ağacın dokusundan su, mineral veya organik besin almıyor. Yalnız bu bilgiyle hangisi doğru olur?",
        "Başka bitki üzerinde bulunmak tek başına parazitliği kanıtlamaz",
        [
          "Mutlaka tam parazittir",
          "Mutlaka fotosentezsizdir",
          "Kesin konak kanını emer",
          "Bütün kökleri konak floemine bağlıdır",
        ],
        "Fiziksel konum ile madde bağımlılığını ayır.",
        "Epifitik yaşam tutunma yüzeyi kullanmayı içerebilir. Parazitlik için konaktan kaynak edinme ve zarar ilişkisi gerekir; yalnız ağacın üstünde bulunmak bu koşulları vermez.",
      ],
      [
        "Fotosentez yapabilen X bitkisi konak bitkiden su ve mineral alıyor. Modelde hazır organik besin alımı yok. Hangi yorum uygundur?",
        "Yarı parazit beslenme örüntüsüyle uyumludur",
        [
          "Tamamen fotosentezsiz tam parazit olduğu kesindir",
          "Yalnız hayvansal avcılık yapar",
          "Konaktan hiçbir kaynak almaz",
          "Su aldığı için bütün organik karbonunu da zorunlu hazır alır",
        ],
        "Organik madde üretimini su ve mineral alımından ayır.",
        "X fotosentez yapıyor, konaktan su ve mineral sağlıyor; bu yarı parazitlik öğretimiyle uyumludur. Organik maddenin de zorunlu konaktan geldiği eklenemez.",
      ],
      [
        "Yangın sonrası alanda eski toprak ve canlı tohum bankası korunuyor. Bu başlangıç hangi süreçle uyumludur?",
        "İkincil süksesyon",
        [
          "Topraksız yeni yüzeyde zorunlu birincil süksesyon",
          "Bütün hücrelerde mayoz",
          "Yalnız kıtaların kayması",
          "Her türün değişmez ve sonsuz aynı sayıda kalması",
        ],
        "Önceki topluluğun kalıntılarına bak.",
        "Toprak ve tohumların korunması ikincil süksesyonun önemli başlangıç koşuludur. Gelecekteki tür sırası ve son topluluk bu tek bilgiden kesinleşmez.",
      ],
      [
        "Yeni bir ülkeye taşınan bir türün istilacı olarak değerlendirilmesinde hangi ek bilgi en anlamlıdır?",
        "Yerleşip yayılmasının ilgili ortamda zararlı etki doğurması",
        [
          "Adının Latin alfabesiyle yazılması",
          "Bütün dünyada aynı renkte olması",
          "Bir bireyinin fotoğrafının bulunması",
          "Türün mutlaka en büyük hayvan olması",
        ],
        "Yabancılık ile zarar vererek yayılmayı ayır.",
        "İstilacılık değerlendirmesi yeni yayılış alanındaki yerleşme ve zararlı etkilerle ilgilidir. Her taşınan tür her ortamda istilacı olmaz; bağlam korunmalıdır.",
      ],
      [
        "Belirli koşullarda görece kararlı klimaks topluluk için hangi ifade doğrudur?",
        "Doğum, ölüm, madde ve enerji akışları sürebilir",
        [
          "Hiçbir birey bir daha ölmez",
          "Bütün ekosistemler mutlaka ormana dönüşür",
          "Çevre değişimi topluluğu artık etkileyemez",
          "Bütün türlerin sayısı her saniye kesin eşittir",
        ],
        "Kararlılık hareketsizlik değildir.",
        "Klimaks görece kararlı topluluk düzenini anlatır; birey düzeyindeki süreçler ve enerji akışı sürer. İklim ve bozucu olaylar bu düzeni değiştirebilir.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 2 fiziksel PDF 15–23; OGM Komünite Ekolojisi I–III sunuları ve Dersler Cepte Komünite–Popülasyon öğretim sayfalarıyla karşılaştırılmış özgün içerik. İlişki işaretleri kontrol grubuna göre tanımlanır; ekoton, istilacılık ve klimaks koşulları korunur. Sorular özgündür.",
  },
  {
    id: "ekoloji-populasyon",
    topic: "detail-327",
    title: "Popülasyon ekolojisi: sayım, büyüme ve sınırlar",
    minutes: 90,
    objectives: [
      "Popülasyonun sayısını, yoğunluğunu ve dağılımını zaman–alan koşullarıyla hesapla.",
      "Doğum, ölüm ve göçü korunmuş bir birey bilançosunda kullan.",
      "Üstel ve lojistik büyümeyi, anlık hız ile son birey sayısını ayırarak yorumla.",
      "Hayatta kalma ve yaş yapısı grafiklerinin desteklediği koşullu sonuçları seç.",
    ],
    sections: [
      {
        title: "Bir sayının nüfus verisi olması için kapsamı gerekir",
        paragraphs: [
          "Popülasyon belirli bir türün belirli alan ve zamanda yaşayan bireyleridir. Bir adadaki geyikler veya belirli bir göldeki aynı balık türü bu çerçevede incelenebilir. Tür sınırı, alan sınırı ve sayım tarihi değiştiğinde aynı adla verilen iki sayı farklı kapsamları gösterebilir.",
          "Popülasyon büyüklüğü birey sayısı N ile; yoğunluk birim alan veya hacim başına birey sayısıyla anlatılır. Biyokütle ise canlıların toplam kütlesidir. Aynı sayıda birey farklı yaş ve büyüklük dağılımı nedeniyle farklı biyokütle taşıyabilir; sayı, yoğunluk ve kütleyi birbirinin yerine yazma.",
        ],
      },
      {
        title: "Yoğunlukta hem payı hem paydayı izle",
        paragraphs: [
          "Alan esaslı yoğunluk N/A biçiminde bulunur. 120 birey 6 km² alanda yaşıyorsa ortalama yoğunluk 20 birey/km² olur. Bu bir ortalamadır; her kilometrekarede kesin 20 birey bulunması gerekmez. Sucul örneklerde alan yerine su hacmi kullanılabilir; birimi buna göre yaz.",
          "Yoğunluk yalnız birey sayısı artınca yükselmez. Alan küçülürken birey sayısı bir miktar azalsa bile yoğunluk artabilir. Zaman karşılaştırmasında aynı sınırların kullanılıp kullanılmadığını denetle. Nüfus değişimi ile habitat kaybının birlikte olduğu durumda yalnız N’ye bakmak kaynak baskısını kaçırabilir.",
        ],
      },
      {
        title: "Kareleme örneklemesi bütün alanı varsayımla temsil eder",
        paragraphs: [
          "Hareketi sınırlı canlılarda belirli büyüklükte örnek alanlar seçilip bireyler sayılabilir. Örnek alanların toplamındaki ortalama yoğunluk, uygun temsil varsayımı altında bütün alana uygulanır. Rastgele veya uygun katmanlı seçim, yalnız kolay ulaşılan yoğun yerleri sayma yanlılığını azaltır.",
          "Örneğin toplam 10 m² örnekte 50 bitki sayılmışsa örnek yoğunluğu 5 bitki/m²’dir; 200 m² alan için tahmin 1.000 olabilir. Bu kesin tam sayım değildir. Alanların benzerliği, örnekleme sayısı, mevsim ve türün tanınması tahminin güvenilirliğini etkiler; bu koşullar verilmeden sınırsız genelleme yapılmaz.",
        ],
      },
      {
        title: "İşaretle–yeniden yakala olasılık düşüncesidir",
        paragraphs: [
          "Hareketli hayvanlarda ilk yakalamada M birey işaretlenip bırakılır. İkinci örnekte C birey yakalanır ve bunların R tanesi işaretlidir. İşaretli payın tüm popülasyondaki payı temsil ettiği basit kapalı modelde R/C ≈ M/N, dolayısıyla N ≈ M×C/R kullanılır.",
          "Bunun için işaretin kaybolmaması, yakalanma ve yaşama şansını değiştirmemesi, bireylerin yeterince karışması ve iki örnek arasında büyük doğum/ölüm/göç olmaması gibi varsayımlar önemlidir. R=0 iken formülle sonlu bir sayı bulunamaz; bu sıfır popülasyon demek değildir. Tahmin ile garanti edilen gerçek sayıyı ayır.",
        ],
      },
      {
        title: "Kümeli, düzenli ve rastgele dağılımın nedenlerini düşün",
        paragraphs: [
          "Kümeli dağılım kaynakların yamalı olması, sosyal davranış veya yavruların yakın yerde kalmasıyla oluşabilir. Düzenli dağılım alan savunması veya komşular arası rekabetle ilişkili olabilir. Rastgele dağılımda konumlar arasında güçlü çekim veya itme bulunmayan bir model düşünülür.",
          "Şekildeki görünüm tek başına tek nedeni kanıtlamaz. Aynı tür farklı ölçeklerde farklı desen gösterebilir: küçük ölçekte düzenli aralıklı ağaçlar, büyük ölçekte uygun toprak yamalarında kümelenebilir. Bireylerin dağılımı ile türlerin dünya üzerindeki yayılışını aynı harita sorusu sanma.",
        ],
      },
      {
        title: "Birey bilançosunu dört akışla kur",
        paragraphs: [
          "Belirli aralık sonunda Nson = Nilk + doğum + içe göç − ölüm − dışa göç yazılır. Doğum ve içe göç giriş, ölüm ve dışa göç çıkıştır. İçe göç ölüm sayısını silmez; her akış aynı zaman aralığı ve alan için bağımsız sayılmalıdır. Birim birey, akışın hızı verilmişse birey/zaman olabilir.",
          "Örneğin başlangıç 100, doğum 20, içe göç 5, ölüm 8 ve dışa göç 7 ise son sayı 110’dur. Toplam değişim +10; başlangıca göre yüzde değişim %10 olur. Başlangıç sıfırsa yüzde değişim için bu payda kullanılamaz. Modelde çıkan toplamın mevcut bireyleri aşmasına izin vermemek de sayımın fiziksel sınırıdır.",
        ],
      },
      {
        title: "Doğal artış ile toplam artış aynı değildir",
        paragraphs: [
          "Doğal değişim doğum eksi ölümdür. Toplam değişim buna net göçün eklenmesiyle bulunur. Doğumlar ölümlerden fazla olsa bile dışa göç çok büyükse alanın toplam birey sayısı azalabilir. İnsan nüfusunda aynı ayrım ülke, il ve farklı dönem verileri için de önemlidir.",
          "Artış miktarı mutlak birey farkı, artış oranı ise bu farkın belirli nüfusa göre payıdır. 100’den 110’a çıkış ile 1.000’den 1.010’a çıkış aynı +10 miktar, farklı yüzde oran taşır. Oran grafiğinin düşmesi nüfusun mutlaka azaldığı anlamına gelmez; oran hâlâ pozitifse sayı artarken artış yavaşlıyor olabilir.",
        ],
      },
      {
        title: "Doğum ve ölüm örüntüleri yaşa bağlıdır",
        paragraphs: [
          "Yaş yapısı üreme öncesi, üreme dönemi ve üreme sonrası bireylerin payını gösteren bir yaklaşım sağlayabilir. Bu sınıfların sınırları türe ve kullanılan tanıma bağlıdır. Cinsiyet oranı, üreme yaşı, yavru sayısı ve bakım biçimi doğum ve hayatta kalma örüntülerini etkiler.",
          "Geniş genç taban, diğer koşullar korunursa gelecekte daha çok üreme çağındaki birey olabileceğiyle uyumludur. Ancak göç, hastalık ve çevre değişimi bilinmeden kesin gelecek sayısı çıkarılamaz. Bir ülkenin veya kıtanın bütün dönemlerde tek yaş piramidi taşıdığı söylenmez; grafiklerin yılı ve veri kapsamı korunmalıdır.",
        ],
      },
      {
        title: "Hayatta kalma eğrisi bir doğum grubunu izler",
        paragraphs: [
          "Kohort aynı dönemde doğan bireyler grubudur. Hayatta kalma eğrisi bu başlangıç grubundan yaş ilerledikçe kaçının veya hangi payının kaldığını gösterir. Tip I’de erken ve orta yaşlarda yaşama yüksek, ileri yaşlarda ölüm artışı belirgindir. Tip III’te erken kayıp fazladır; kalanlar daha uzun yaşayabilir.",
          "Tip II yaklaşımında yaş başına ölüm olasılığı yaklaşık sabit düşünülür. Bu her aralıkta aynı sayıda bireyin öldüğü demek değildir: her yıl kalanların %10’u ölüyorsa 1.000→900→810 olur, kayıplar 100 ve 90’dır. Düşey eksen logaritmikse eşit oransal kayıp düz çizgi verebilir; eksen türünü okumadan eğimi yorumlama.",
        ],
      },
      {
        title: "Üstel büyümede kişi başına hız ile toplam hız farklıdır",
        paragraphs: [
          "Kaynak kısıtı düşük ve çevre görece sabitken popülasyon büyümesi üstel modele yaklaşabilir. Sürekli model dN/dt = rN biçimindedir; r kişi başına net büyüme katsayısıdır. Aynı r korunurken N arttıkça birim zamandaki mutlak artış büyür, bu da J biçimli görünüm oluşturabilir.",
          "Bu öğretim sınırsız kaynakların doğada sonsuza kadar sürdüğünü söylemez. Ayrıca r=0,1 değeri birim ve model belirtilmeden tek başına anlam taşımaz; sürekli anlık katsayı ile belirli aralıktaki yüzde değişim tam aynı işlem değildir. Verilen modelin denklemine göre hesapla ve zaman birimini açık tut.",
        ],
      },
      {
        title: "Taşıma kapasitesi çevrenin koşullu desteğidir",
        paragraphs: [
          "Taşıma kapasitesi K, belirtilen çevre koşullarının uzun dönemde destekleyebildiği popülasyon büyüklüğü için kullanılan model parametresidir. Besin, su, alan, atık birikimi, hastalık ve etkileşimler bu desteği etkiler. Kaynak artışı veya habitat kaybıyla K değişebilir; türün bütün ortamlar için sabit genetik sayısı değildir.",
          "Gerçek popülasyon K’yı geçici olarak aşabilir. Gecikmiş doğum ve ölüm yanıtları aşım, dalgalanma veya çöküş doğurabilir; K beton bir tavan çizgisi değildir. K’ya yakınlık bütün bireylerin aynı deneyimi yaşadığı veya doğumların tamamen sıfırlandığı anlamına gelmez; net değişim ve bireysel olaylar ayrıdır.",
        ],
      },
      {
        title: "Lojistik modelde S eğrisi ve en hızlı mutlak artış",
        paragraphs: [
          "Basit sürekli lojistik model dN/dt = rN(1−N/K) yazar. N küçükken toplam birey az olduğu için mutlak artış sınırlıdır; orta düzeyde artış hızlanır; K’ya yaklaşınca kişi başına kaynak baskısı nedeniyle net artış yavaşlar. N=K olduğunda modelin net anlık eğimi sıfırdır.",
          "r ve K sabitken en yüksek mutlak anlık artış N=K/2’de bulunur; en yüksek kişi başına artışla aynı koşul değildir. N>K için eğim negatiftir. Bu bir türev, yani birey/zaman hızıdır; doğrudan yeni birey sayısı değildir. Modelde ayrı gösterilen bilanço son sayısını bu anlık eğime eşitleme.",
        ],
      },
      {
        title: "Yoğunluğa bağlı ve bağımsız etkileri koşullarıyla ayır",
        paragraphs: [
          "Kaynak rekabeti, bazı hastalıklar ve parazit yayılımı kalabalık arttıkça birey başına etkisini artırabilir; bunlar yoğunluğa bağlı düzenleme örnekleridir. Sert don, yangın veya ani sel gibi olaylar ise başlangıç yoğunluğundan görece bağımsız dış baskılar yaratabilir.",
          "Bu sınıflama gerçek etkilerin hiçbir zaman birleşmeyeceği anlamına gelmez. Aynı kuraklık düşük ve yüksek yoğunlukta farklı sonuca yol açabilir; kaynak azalması ardından rekabeti güçlendirebilir. Çevre direnci tek bir düşman canlı değildir; çoğalmayı sınırlayan etmenlerin toplam çerçevesidir. Uygulama modelinin basitliği bu mekanizmaların hepsini ölçtüğü iddiasına dönüşmez.",
        ],
      },
      {
        title: "İnsan nüfusunda tarihli veriyi ve varsayımı açık tut",
        paragraphs: [
          "Sağlık, temizlik, besin üretimi ve yaşam koşullarındaki değişimler ölüm ve doğum örüntülerini dönüştürmüştür. Demografik geçiş öğretimi, yüksek doğum–yüksek ölümden düşük doğum–düşük ölüme uzanan farklı dönemleri karşılaştırır; bütün toplumlar aynı hızla veya aynı tarihte ilerlemek zorunda değildir.",
          "Kaynakta verilen Türkiye 2016 yaş payları veya 2050 projeksiyonu kendi tarihine ve varsayımlarına aittir; bugünün kesin ölçümü veya garanti edilmiş gelecek olarak sunulmaz. Projeksiyonda doğurganlık, ölüm ve göç varsayımları değişirse sonuç değişir. Daha çok tarihli tablo ezberlemekten önce pay, oran, miktar ve belirsizliğin hangi soruya yanıt verdiğini öğren.",
        ],
      },
    ],
    examples: [
      {
        title: "Doğal artışa rağmen toplam düşüş",
        prompt:
          "Bir alanda başlangıçta 200 birey var. Bir yılda 30 doğum, 10 ölüm, 5 içe göç ve 40 dışa göç kaydediliyor. Son sayı ve doğal değişim nedir?",
        strategy: "Doğal farkı net göçten ayrı hesapla.",
        steps: [
          {
            label: "1. adım",
            explanation: "Doğal değişim 30−10 = +20 bireydir.",
          },
          {
            label: "2. adım",
            explanation: "Net göç 5−40 = −35 bireydir.",
          },
          {
            label: "3. adım",
            explanation: "Son sayı 200+20−35 = 185; toplam değişim −15 olur.",
          },
        ],
        answer: "185 birey; doğal değişim +20.",
        check: "200+30+5−10−40 işlemi de 185 vermeli.",
        pitfall: "Doğal artış pozitif diye toplamı zorunlu artmış sayma.",
      },
      {
        title: "Sayı azalırken yoğunluğun artması",
        prompt:
          "Başta 120 birey 6 km² alanda, sonra 100 birey 4 km² alanda bulunuyor. Ortalama yoğunlukları karşılaştır.",
        strategy: "Her tarihte kendi pay ve paydasını kullan.",
        steps: [
          {
            label: "1. adım",
            explanation: "İlk yoğunluk 120/6 = 20 birey/km².",
          },
          {
            label: "2. adım",
            explanation: "Son yoğunluk 100/4 = 25 birey/km².",
          },
          {
            label: "3. adım",
            explanation:
              "Sayı 20 azalsa da alanın daha büyük oransal daralması yoğunluğu 5 birey/km² artırır.",
          },
        ],
        answer: "20’den 25 birey/km²’ye artış.",
        check: "Paydanın 6’dan 4’e küçülmesi sonucu etkiler.",
        pitfall: "Yalnız birey sayısını izleyerek yoğunluk yönüne karar verme.",
      },
      {
        title: "İşaretli paydan toplam tahmini",
        prompt:
          "Kapalı ve iyi karışmış popülasyonda 40 birey işaretleniyor. Sonraki 50 bireylik rastgele örnekte 10 işaretli var. İşaret yakalanmayı ve yaşamayı etkilemiyor. Basit tahmin nedir?",
        strategy: "Örnek işaretli payını popülasyon payına eşitle.",
        steps: [
          {
            label: "1. adım",
            explanation: "İkinci örnekte işaretli payı 10/50 = 0,2.",
          },
          {
            label: "2. adım",
            explanation: "40/N ≈ 0,2 olduğundan N ≈ 40/0,2 = 200.",
          },
          {
            label: "3. adım",
            explanation:
              "200 yaklaşık tahmindir; kapalı popülasyon ve eşit yakalanma koşullarına dayanır.",
          },
        ],
        answer: "Yaklaşık 200 birey.",
        check: "40×50/10 işlemi aynı sonucu vermeli.",
        pitfall: "10 işaretli yakalandı diye toplamı 10 sanma.",
      },
      {
        title: "Lojistik anlık hız son sayı değildir",
        prompt:
          "Sürekli lojistik modelde r=0,2 yıl⁻¹, K=100 birey. N=50 ve N=100 için dN/dt kaçtır?",
        strategy: "Her N’yi rN(1−N/K) içine koy ve hız birimini koru.",
        steps: [
          {
            label: "1. adım",
            explanation: "N=50 için 0,2×50×(1−0,5) = 5 birey/yıl.",
          },
          {
            label: "2. adım",
            explanation: "N=100 için 0,2×100×(1−1) = 0 birey/yıl.",
          },
          {
            label: "3. adım",
            explanation:
              "İlk değer anlık eğimdir; bir yıl sonundaki N’yi doğrudan 55 kabul etmek sürekli modeli tam çözmek değildir.",
          },
        ],
        answer: "N=50’de 5 birey/yıl; N=100’de 0.",
        check: "N=K/2 maksimum mutlak anlık artış koşuluyla uyumludur.",
        pitfall: "Türev değerini sonraki nüfus sayısı olarak yazma.",
      },
    ],
    recall: [
      {
        prompt: "Toplam değişim ve doğal değişim nasıl ayrılır?",
        answer:
          "Doğal değişim doğum−ölümdür; toplam değişim buna içe göç−dışa göç eklenerek bulunur.",
      },
      {
        prompt: "Sayı azalırken yoğunluk artabilir mi?",
        answer:
          "Evet; alan veya hacim daha büyük oranda küçülürse N/alan artabilir.",
      },
      {
        prompt: "Tip II’de sabit olan ölüm sayısı mı, olasılığı mı?",
        answer:
          "Basit Tip II modelinde yaklaşık yaşa bağlı ölüm olasılığıdır; kalanlar azaldıkça aynı oran farklı sayıda kayıp verir.",
      },
      {
        prompt: "Lojistik modelde K/2 hangi büyüklüğü en büyük yapar?",
        answer:
          "r ve K sabitken mutlak anlık net büyüme hızı rN(1−N/K); kişi başına hız veya garanti gelecek sayı değil.",
      },
    ],
    items: [
      [
        "Bir popülasyonda 90 birey 3 km² alana dağılmıştır. Ortalama alan yoğunluğu nedir?",
        "30 birey/km²",
        ["270 birey/km²", "3 birey/km²", "90 km²/birey", "0 birey/km²"],
        "Birey sayısını alana böl.",
        "90/3 = 30 birey/km². Bu alanın ortalamasıdır; her küçük parçada tam 30 birey olduğu sonucunu vermez.",
      ],
      [
        "Başlangıç 100 birey; aynı ayda 20 doğum, 5 içe göç, 8 ölüm ve 7 dışa göç var. Son büyüklük nedir?",
        "110",
        ["100", "120", "140", "70"],
        "Girişleri ekle, çıkışları çıkar.",
        "100+20+5−8−7 = 110 birey. Net değişim +10’dur; bütün akışlar aynı alan ve süreyi kapsar.",
      ],
      [
        "Bir yılda doğum 40, ölüm 15, içe göç 10, dışa göç 50 bireydir. Doğal ve toplam değişim hangi sırayla doğrudur?",
        "+25; −15",
        ["−25; +15", "+40; +50", "+25; +65", "−15; +25"],
        "Net göç 10−50’yi doğal değişime ekle.",
        "Doğal değişim 40−15 = +25; net göç −40; toplam +25−40 = −15. Doğal artış toplam artış garantisi değildir.",
      ],
      [
        "Kapalı modelde 30 işaretli birey bırakılıyor. Rastgele ikinci örnek 40 birey ve bunların 6’sı işaretli. İşaretler korunuyor ve yakalanmayı etkilemiyor. M×C/R tahmini nedir?",
        "200 birey",
        ["76 birey", "120 birey", "7,5 birey", "1.200 birey"],
        "30×40’ı 6’ya böl.",
        "30×40/6 = 200 birey. Sonuç verilen karışma ve kapalı popülasyon koşullarına bağlı tahmindir, kesin tam sayım iddiası değildir.",
      ],
      [
        "Aynı kohortta her yıl o yılın başında yaşayanların %10’u ölüyor. Başlangıç 1.000 ise iki yıl sonunda kaç birey kalır?",
        "810",
        ["800", "900", "980", "100"],
        "Sabit oranı her yıl kalan sayıya uygula.",
        "İlk yıl 1.000×0,9 = 900, ikinci yıl 900×0,9 = 810. Aynı ölüm olasılığı, her yıl aynı mutlak ölüm sayısını vermez.",
      ],
      [
        "Sürekli lojistik model dN/dt=rN(1−N/K); r ve K pozitif sabit. En yüksek mutlak anlık artış hangi N’de olur?",
        "K/2",
        ["K", "2K", "0", "Her N’de aynı"],
        "N(1−N/K) ifadesinin orta noktadaki tepesini düşün.",
        "Çarpım K/2’de en büyüktür. N=0 ve N=K’da net anlık eğim sıfırdır; N>K’da negatiftir.",
      ],
      [
        "Sürekli lojistik modelde r=0,1 yıl⁻¹, N=40 birey, K=100 birey. Anlık net artış hızı kaç birey/yıldır?",
        "2,4",
        ["4", "24", "40,24", "60"],
        "0,1×40×(1−40/100) hesapla.",
        "0,1×40×0,6 = 2,4 birey/yıl. Bu hızdır; son birey sayısı veya kesin bir yıllık artış miktarı olarak etiketlenmez.",
      ],
      [
        "Taşıma kapasitesiyle ilgili hangi ifade doğrudur?",
        "K çevre koşullarıyla değişebilir ve gerçek sayı geçici olarak K’yı aşabilir",
        [
          "K türün her ortamda aynı kalan gen sayısıdır",
          "K aşıldığında fizik yasaları bütün bireyleri anında yok eder",
          "K’da bütün doğumlar ve bütün ölümler zorunlu sıfır olur",
          "K yalnız bir bireyin vücut kütlesidir",
        ],
        "Uzun dönem destek ile anlık sayıyı ayır.",
        "K koşullu çevresel destek parametresidir. Gecikmeli yanıtlar geçici aşım doğurabilir; net denge, bireysel doğum ve ölüm olaylarının tümden durması değildir.",
      ],
      [
        "Başlangıç 80 birey 8 km², sonraki sayım 72 birey 4 km². Doğru karşılaştırma hangisidir?",
        "Sayı azalmış, yoğunluk 10’dan 18 birey/km²’ye artmıştır",
        [
          "Sayı ve yoğunluk ikisi de kesin azalmıştır",
          "Yoğunluk her iki tarihte 10’dur",
          "Sayı 8 birey artmıştır",
          "Son yoğunluk 288 birey/km²’dir",
        ],
        "İki yoğunluğu ayrı hesapla.",
        "İlk 80/8 = 10, son 72/4 = 18. Sayı düşmesine rağmen alan yarıya düştüğünden yoğunluk yükselir.",
      ],
      [
        "Bir yaş piramidinde genç birey payı yüksek. Göç, ölüm ve doğumun gelecekte nasıl değişeceği verilmemiş. Hangi yorum uygundur?",
        "Diğer koşullar korunursa ileride üreme çağında daha çok birey olma potansiyeli vardır",
        [
          "Gelecek yılın kesin birey sayısı tek başına bulunur",
          "Ölümlerin mutlaka sıfır olacağı kanıtlanır",
          "Bütün gençler aynı anda kesin eşit sayıda yavru yapar",
          "Her ülkede göçün durduğu sonucu çıkar",
        ],
        "Yapısal potansiyeli kesin gelecek sayısından ayır.",
        "Genç yapı ilerideki üreme potansiyeli hakkında koşullu bilgi verir. Kesin geleceği belirlemek için ölüm, göç, doğurganlık ve başka süreçlerin varsayımları gerekir.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 2 fiziksel PDF 24–28; OGM Popülasyon Ekolojisi I–II ve Dersler Cepte ilgili öğretim sayfalarıyla karşılaştırılmış özgün içerik. Lojistik çıktı anlık hızdır; taşıma kapasitesi mutlak tavan yapılmaz. Tarihli nüfus örnekleri güncel veya kesin gelecek verisi sayılmaz.",
  },
  {
    id: "nukleik-asitler-yapi",
    topic: "detail-328",
    title: "Nükleik asitler: yapı, yön, bağ ve görev",
    minutes: 95,
    objectives: [
      "Baz, pentoz ve fosfatı bağlarıyla nükleotit içinde göster.",
      "DNA’nın iki antiparalel zincirini tek zincirin verisinden doğru kur.",
      "Baz, hidrojen bağı ve omurga bağı hesabında verilen bütünün sınırını koru.",
      "DNA–RNA görevlerini, hücredeki yerlerini ve kromatin paketlenmesini açıkla.",
    ],
    sections: [
      {
        title: "Kalıtsal bilginin kimyasal taşıyıcısı",
        paragraphs: [
          "Nükleik asitler nükleotitlerin oluşturduğu polimerlerdir. DNA uzun süreli kalıtsal bilginin saklanması ve aktarılmasında, RNA ise bu bilginin kullanılması ve birçok düzenleyici süreçte görev alır. Yapılarında karbon, hidrojen, oksijen, azot ve fosfor bulunur; bu elementleri taşımak tek başına bir molekülü DNA diye tanımlamaz.",
          "Bir DNA dizisindeki bilgi, bazların sırasıyla ilişkilidir. Aynı toplam baz sayısı veya aynı yüzde bileşim, aynı dizinin bulunduğunu kanıtlamaz. Gen yalnız protein için kod veren bir bölüm olmak zorunda değildir; işlevsel RNA ürünüyle ilişkili genler de vardır. Molekülün kimyasal yapısı ile hangi hücrede ne zaman kullanıldığı ayrı sorulardır.",
        ],
      },
      {
        title: "Bir nükleotidi üç parçayla kur",
        paragraphs: [
          "Nükleotitte azotlu organik baz, beş karbonlu şeker ve fosfat bulunur. DNA’nın şekeri deoksiriboz, RNA’nınki ribozdur. Ribozun 2′ karbonunda hidroksil grubu bulunurken deoksiribozda bu konumda hidrojen vardır. Bu fark molekül adındaki deoksi ifadesinin temelidir.",
          "Baz ile şekerin birleşmiş hâline nükleozit denir; fosfat eklendiğinde nükleotit yapısı oluşur. Kaynak şekillerindeki beşgen pentozu, daire fosfatı ve farklı baz biçimlerini ezber simgesi değil bağlantı haritası olarak kullan. Fosfatın varlığıyla fosfat sayısını karıştırma: hücrede serbest nükleotitlerin farklı fosfatlı biçimleri bulunabilir.",
        ],
      },
      {
        title: "Bazları halka yapısı ve molekül türüyle ayır",
        paragraphs: [
          "Adenin ve guanin çift halkalı pürin; sitozin, timin ve urasil tek halkalı pirimidin bazlarıdır. Standart DNA’da A, T, G, C; standart RNA’da A, U, G, C bulunur. Aynı baz adını taşıyan DNA ve RNA nükleotitleri farklı şeker nedeniyle aynı tam molekül değildir.",
          "Bu öğretimde dört DNA ve dört RNA olmak üzere sekiz temel nükleotit türü karşılaştırılır. Her kısa DNA veya RNA parçasında bu bazların hepsinin mutlaka bulunması gerekmez. Ayrıca canlılarda değişikliğe uğramış bazlar vardır; örneğin bazı tRNA’larda farklılaşmış bazlar bulunması standart harf karşılaştırmasını geçersiz kılmaz ama mutlak kimyasal yasak gibi okumamayı gerektirir.",
        ],
      },
      {
        title: "Glikozit, ester ve fosfodiester bağının yerini bul",
        paragraphs: [
          "Baz ile şeker arasında glikozit bağı bulunur. Tek nükleotidin fosfatı şekere fosfoester bağıyla bağlanabilir. Zincirde bir fosfatın iki farklı şekerin uygun hidroksil gruplarıyla kurduğu omurga bağlantısı fosfodiester bağı olarak adlandırılır. Adları karıştırmamak için hangi iki parçanın bağlandığını çiz.",
          "DNA’nın iki zinciri boyunca nükleotitleri bağlayan güçlü omurga ile zincirler arasındaki baz eşleşmesini ayır. A–T ve G–C çiftleri arasındaki hidrojen bağları, aynı zincirde komşu nükleotitleri birleştiren fosfodiester bağları değildir. DNA’nın açılması sırasında zincirlerin ayrılması, omurgadaki bütün kovalent bağların kesilmesi anlamına gelmez.",
        ],
      },
      {
        title: "Zincirin yönü şekerin karbon numaralarından gelir",
        paragraphs: [
          "Nükleik asit zinciri 5′ ve 3′ uçlarıyla yönlendirilir. Standart iki zincirli DNA’da zincirler antiparaleldir: bir zincir 5′→3′ yönünde okunurken karşısı aynı fiziksel doğrultuda 3′→5′ olur. Eşleşmede A’nın karşısına T, G’nin karşısına C gelir.",
          "Örneğin üst zincir 5′-ATGC-3′ ise hemen karşısı 3′-TACG-5′ yazılır. Karşı zinciri kendi 5′→3′ yönünde yazmak istenirse sıra ters çevrilir: 5′-GCAT-3′. Yalnız harfleri eşleyip iki uca da aynı yönü yazmak biyolojik yön bilgisini kaybettirir.",
        ],
      },
      {
        title: "Çift sarmalda pürin ile pirimidin karşılaşır",
        paragraphs: [
          "Standart DNA baz çiftinde bir pürin ile bir pirimidin karşılaşır; bu düzen sarmalın yaklaşık sabit genişliğine katkı verir. A–T arasında iki, G–C arasında üç hidrojen bağı bulunur. Bazlar içe, şeker–fosfat omurgaları dışa dönük bir çift sarmal düzeni düşünülür.",
          "Okul düzeyi B-DNA modelinde çap yaklaşık 2 nm, komşu baz çiftleri arası eksenel uzaklık yaklaşık 0,34 nm ve bir tur yaklaşık 10 baz çiftiyle 3,4 nm olarak anlatılır. On baz çifti toplam yirmi nükleotittir; on nükleotit değildir. Gerçek sarmal parametreleri koşula ve DNA biçimine göre değişebilir; bu değerler açıkça kullanılan yaklaşık modeldir.",
        ],
      },
      {
        title: "Chargaff eşitliğini doğru bütüne uygula",
        paragraphs: [
          "Standart çift zincirli DNA’nın bütünü için A=T ve G=C olur; toplam pürin toplam pirimidine eşittir. Bir çiftte A bulunduğunda karşı zincirde T olduğundan bu eşitlik bütün iki zincir birlikte sayılınca ortaya çıkar. Tek zincirde ise A sayısının T’ye eşit olması zorunlu değildir.",
          "Yüzde hesabında da hangi bütünün verildiğini yaz. Çift zincirli DNA’da A=%30 ise T=%30, kalan %40’ın G ve C payları eşit olduğundan her biri %20 olur. Yalnız tek zincirin A yüzdesi verildiğinde bütün molekülün diğer yüzdeleri aynı kesinlikle belirlenmez. Bir soruyu çözmeden önce zincir sayısını işaretlemek birçok yanlışı engeller.",
        ],
      },
      {
        title: "Hidrojen bağlarını baz çifti sayısıyla hesapla",
        paragraphs: [
          "Bir çift zincirli DNA parçasında a tane A–T, g tane G–C çifti varsa toplam baz çifti a+g, toplam nükleotit 2(a+g), hidrojen bağı 2a+3g olur. a veya g’yi toplam nükleotit sayısıyla karıştırma; bir çift iki nükleotit taşır.",
          "Örneğin altı A–T ve dört G–C çifti toplam on baz çifti, yirmi nükleotit ve 24 hidrojen bağı verir. Aynı uzunluk ve karşılaştırılabilir tuz, pH gibi koşullarda daha yüksek G–C oranı genellikle daha yüksek zincir ayrılma, yani erime sıcaklığıyla ilişkilidir; baz yığılmaları ve ortam da etkili olduğundan tek belirleyici yalnız üç hidrojen bağı değildir. Baz dizilişi bu sayılarla tekleşmez; birçok farklı sıra aynı bileşimi taşır. RNA için yalnız harf sayısı verildiğinde molekülün nasıl katlandığı bilinmediğinden toplam hidrojen bağını kesin hesaplayamayabiliriz.",
        ],
      },
      {
        title: "Omurga bağı sayısı doğrusal veya halkasal oluşa bağlıdır",
        paragraphs: [
          "Tek doğrusal zincirde N nükleotit ardışık bağlanmışsa komşuluk bağlantısı N−1’dir. Aynı uzunluktaki iki doğrusal DNA zincirinde toplam fosfodiester bağlantısı 2(N−1) olur. Burada N bir zincirin uzunluğudur; toplam nükleotit kullanılıyorsa toplamdan zincir sayısı çıkarılır.",
          "Halkasal, kesintisiz bir zincirde uçlar da bağlandığı için bağlantı sayısı N olur; iki halkasal zincir için toplam 2N. Bu yalnız topolojik bağ sayımıdır; çok kısa bir harf dizisinin kararlı halka DNA olarak laboratuvarda mutlaka oluşabileceği iddiası değildir. Bir molekülün doğrusal olması ile hücrenin prokaryot veya ökaryot olması aynı şey değildir.",
        ],
      },
      {
        title: "Polimerin kurulmasında enerji taşıyan öncüller kullanılır",
        paragraphs: [
          "DNA sentezinde hücre serbest ve enerji bakımından etkin nükleotit öncüllerini kullanır; standart öncüller dATP, dTTP, dGTP ve dCTP gibi trifosfatlardır. Yeni bağ kurulurken pirofosfat ayrılması ve devamındaki süreçler sentezin enerji yönüne katkı verir. Omurga uzaması uygun 3′ uç üzerinden ilerler.",
          "Basit ders sayımlarında su çıkışıyla kurulan dehidrasyon modeli kullanılabilse de hücrede DNA polimerazın her eklemede yalnız tek fosfatlı nükleotitleri birleştirip tam bir su çıkardığı ayrıntılı mekanizma olarak sunulmaz. Soru açıkça soyut bağlanma–su modeli veriyorsa o varsayım içinde hesaplanır; gerçek enzim yoluyla aynı iddia sayılmaz.",
        ],
      },
      {
        title: "DNA hücrede nerede ve nasıl paketlenir?",
        paragraphs: [
          "Ökaryotlarda DNA’nın büyük bölümü çekirdekte, ayrıca mitokondri ve fotosentez yapan ökaryotların kloroplastlarında bulunur. Çekirdek DNA’sı histon proteinleriyle ilişkilenir; DNA’nın sekiz temel histondan oluşan çekirdek çevresine sarıldığı nükleozomlar daha büyük kromatin düzenine katılır. Bölünme sırasında yoğunlaşma kromozomların belirginleşmesini sağlar.",
          "Eşlenmemiş bir kromozomda bir temel çift zincirli DNA molekülü, eşlenmiş kromozomun iki kardeş kromatidinde iki DNA molekülü düşünülür. Metafazdaki X görünümünü iki ayrı homolog kromozom sanma. Olgun insan alyuvarı çekirdeksizdir; mitokondrisini de kaybetmiştir. Her ökaryot hücrenin mutlaka çekirdek ve organel DNA’sı taşıdığı genellemesi bu örneğe uymaz.",
        ],
      },
      {
        title: "Nükleoit ile plazmiti çekirdek zarı sanma",
        paragraphs: [
          "Bakterilerde temel kromozomal DNA sitoplazmadaki nükleoit bölgesiyle ilişkilidir; çevresinde ökaryotik çekirdek zarı yoktur. Birçok bakteri kromozomu halkasaldır. Plazmitler bazı hücrelerde kromozomdan ayrı çoğalabilen, farklı özellikler taşıyabilen küçük genetik elemanlardır.",
          "Bütün prokaryotların tek halkasal kromozom, hiç DNA bağlayıcı protein ve aynı eşlenme düzeni taşıdığı söylenemez. Bakterilerde histon benzeri DNA düzenleyici proteinler vardır; arkelerde histon benzeri veya histon proteinleri de görülebilir. Temel okul karşılaştırması çekirdek zarının yokluğudur; ayrıntılı çeşitliliği yok sayan mutlak tanımlara dönüştürülmez.",
        ],
      },
      {
        title: "mRNA bilgiyi uygun sentez ortamına taşır",
        paragraphs: [
          "Mesajcı RNA, DNA’daki belirli bölümlerin transkripsiyonuyla oluşur ve protein sentezinde okunabilecek kodon dizisini taşır. Ökaryotlarda birçok mRNA işlenir, çekirdekten sitoplazmaya taşınır ve ribozomlarla etkileşir. Prokaryotlarda çekirdek zarı olmadığı için işlemlerin yer ve zaman ilişkisi farklı olabilir.",
          "Her mRNA’nın tek bir protein çeşidiyle her zaman bire bir eşitlendiği söylenmez; farklı işlenme ve düzenleme yolları vardır. Gen ifadesi yalnız transkripsiyon miktarına değil, RNA kararlılığına ve çeviri denetimine de bağlıdır. Aynı genomu taşıyan iki hücrenin farklı protein bileşimi kazanması bu denetimlerle ilişkilidir.",
        ],
      },
      {
        title: "tRNA eşleştirir, rRNA ribozomun işine katılır",
        paragraphs: [
          "Taşıyıcı RNA, belirli amino asitlerin ribozoma taşınmasında görev yapar; antikodon bölgesi uygun kodonla eşleşir. tRNA tek polinükleotit zinciridir ama kendi içinde katlanıp baz eşleşmeleri oluşturabilir. Bu nedenle tek zincirli olmak hiç hidrojen bağı bulunmaması anlamına gelmez.",
          "Ribozomal RNA ribozomun yapısına ve işlevine katılır; ribozom RNA ve proteinlerden oluşur. Hücresel RNA’nın çoğunu rRNA oluşturabilse de yaklaşık %80 rRNA, %15 tRNA, %5 mRNA gibi ders oranları bütün hücre ve koşullarda sabit yasa değildir. Ayrıca düzenleyici ve başka işlevli RNA sınıfları da vardır; tüm RNA evreni yalnız bu üç addan ibaret değildir.",
        ],
      },
      {
        title: "RNA’nın kısa ve katlanabilir oluşunu mutlak kurala çevirme",
        paragraphs: [
          "Birçok hücresel RNA tek zincirli ve DNA’ya göre daha kısa olabilir. Ribozun 2′ hidroksili kimyasal davranışı etkiler; bazı koşullarda RNA daha kolay parçalanabilir. RNA molekülleri kendi içinde eşleşerek belirli üç boyutlu yapılar kurabilir ve kimi RNA’lar katalitik işlev görebilir.",
          "Hücresel RNA genellikle DNA’dan transkripsiyonla üretilir; ancak RNA genomlu virüslerde RNA’nın kalıtsal bilgi taşıması ve RNA’ya göre RNA sentezi gibi yollar vardır. Bu nedenle hiçbir RNA hiçbir bağlamda kalıtsal bilgi taşıyamaz veya kopyalanamaz cümlesi doğru değildir. Öğrendiğin karşılaştırmanın hücresel normal akışa mı, bütün biyolojik sistemlere mi ait olduğunu belirt.",
        ],
      },
      {
        title: "Diziyi okumak ile genin kullanıldığını bilmek farklıdır",
        paragraphs: [
          "Mutasyon DNA dizisinde değişikliktir; etkisi değişen yere, değişikliğin türüne ve gen ifadesine bağlıdır. Bir değişim protein dizisini değiştirebilir, düzenleyici bölgeyi etkileyebilir veya belirgin bir sonuç vermeyebilir. Aynı toplam A/T/G/C sayısı korunurken bazların yeri değişebilir ve bilgi farklılaşabilir.",
          "Bir DNA parçasının eşlenmesi, o genin o anda protein üretmesiyle aynı olay değildir. RNA üretimi ve protein sentezi başka enzim ve denetim yolları taşır. Yapı konusunu bitirirken üç soruyu ayrı tut: Bilgi hangi dizidedir, molekül nasıl kopyalanır, bu bilgi hangi hücrede hangi ürüne dönüştürülür?",
        ],
      },
    ],
    examples: [
      {
        title: "Karşı zinciri iki yönde yaz",
        prompt:
          "Verilen DNA zinciri 5′-AGTC-3′. Karşısını aynı fiziksel doğrultuda ve kendi 5′→3′ yönünde yaz.",
        strategy: "Önce eşle, sonra uçları tersle.",
        steps: [
          {
            label: "1. adım",
            explanation: "A↔T ve G↔C eşleşmesiyle karşı dizi TCAG bulunur.",
          },
          {
            label: "2. adım",
            explanation: "Antiparalel aynı doğrultu gösterimi 3′-TCAG-5′ olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Karşı zinciri kendi 5′ ucundan okuyunca 5′-GACT-3′ yazılır.",
          },
        ],
        answer: "3′-TCAG-5′; kendi yönünde 5′-GACT-3′.",
        check:
          "İki zincirde karşılıklı bazları ve 5′/3′ uçlarını tek tek denetle.",
        pitfall: "Karşı diziyi eşleyip iki zincire aynı yönü verme.",
      },
      {
        title: "Yüzdeyi çift zincirin bütününde kullan",
        prompt:
          "Standart çift zincirli DNA’nın bütününde A=%28. T, G ve C yüzdelerini bul.",
        strategy: "Eşleşme eşitliklerini ve %100 toplamını kullan.",
        steps: [
          {
            label: "1. adım",
            explanation: "A=T olduğundan T=%28.",
          },
          {
            label: "2. adım",
            explanation: "A+T=%56; G+C için %44 kalır.",
          },
          {
            label: "3. adım",
            explanation: "G=C olduğundan her biri %22 olur.",
          },
        ],
        answer: "T=%28; G=%22; C=%22.",
        check: "28+28+22+22=%100.",
        pitfall:
          "Veri yalnız tek zincir olsaydı aynı çıkarım yapılamayacağını unutma.",
      },
      {
        title: "Hidrojen ve omurga bağlarını ayrı say",
        prompt:
          "Doğrusal DNA’nın her zinciri 10 nükleotittir. Molekülde 6 A–T ve 4 G–C çifti var. Hidrojen bağı ve toplam fosfodiester bağlantısını bul.",
        strategy:
          "Çiftler zincirler arası bağı, uzunluk ve uçlar omurgayı belirler.",
        steps: [
          {
            label: "1. adım",
            explanation: "Hidrojen bağları 6×2+4×3 = 24.",
          },
          {
            label: "2. adım",
            explanation:
              "Tek doğrusal zincir 10−1 = 9 komşuluk bağlantısı taşır.",
          },
          {
            label: "3. adım",
            explanation:
              "İki zincirde toplam 2×9 = 18 fosfodiester bağlantısı bulunur.",
          },
        ],
        answer: "24 hidrojen bağı; 18 fosfodiester bağlantısı.",
        check:
          "10 çift toplam 20 nükleotittir; 20−2 = 18 omurga bağlantısı doğrular.",
        pitfall:
          "Hidrojen bağını zincir uzunluğundan bir eksiltmeyle hesaplama.",
      },
      {
        title: "Aynı bileşim, farklı sıra",
        prompt:
          "5′-AAGC-3′ ve 5′-AGAC-3′ DNA zincirlerinin her birinde A=2,G=1,C=1,T=0. Diziler aynı mıdır, karşıları aynı mıdır?",
        strategy: "Bileşim vektörü ile sırayı karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İki zincirde baz toplamları eşittir; bu yalnız bileşim bilgisidir.",
          },
          {
            label: "2. adım",
            explanation:
              "İkinci ve üçüncü konumdaki sıra farklıdır; diziler aynı değildir.",
          },
          {
            label: "3. adım",
            explanation:
              "Karşı diziler 3′-TTCG-5′ ve 3′-TCTG-5′ olur, onlar da farklıdır.",
          },
        ],
        answer: "Bileşim aynı; diziler ve eşlenen karşı sıralar farklı.",
        check:
          "Her konumu tek tek karşılaştır; toplam sayıyı sıra yerine koyma.",
        pitfall: "Baz yüzdesinden tek bir gen dizisi çıkarmak.",
      },
    ],
    recall: [
      {
        prompt: "Nükleozit ile nükleotidi nasıl ayırırsın?",
        answer:
          "Nükleozit baz+şekerdir; fosfat eklenmesi nükleotit yapısını oluşturur.",
      },
      {
        prompt: "A=T eşitliği tek DNA zincirinde zorunlu mu?",
        answer:
          "Hayır; standart çift zincirli DNA’nın bütününde zorunludur. Tek zincirin baz bileşimi farklı olabilir.",
      },
      {
        prompt:
          "Tek doğrusal N nükleotitli zincirde kaç komşuluk bağlantısı vardır?",
        answer:
          "N−1; kesintisiz halkasal zincirde N. Zincir sayısı ve uç koşulu belirtilmelidir.",
      },
      {
        prompt: "Tek zincirli RNA hiç hidrojen bağı taşımaz mı?",
        answer:
          "Hayır; kendi içinde katlanıp baz eşleştirebilir. Dizi tek başına her katlanmanın bağ sayısını belirlemez.",
      },
    ],
    items: [
      [
        "Bir molekülde azotlu baz ile riboz var, fosfat yok. Bu yapının uygun adı nedir?",
        "Nükleozit",
        [
          "Tam nükleotit",
          "Çift zincirli kromozom",
          "Fosfodiester polimeri",
          "Yalnız amino asit",
        ],
        "Baz+şeker ile fosfatlı bütünü ayır.",
        "Nükleozit baz ve şekerden oluşur. Nükleotit tanımı fosfatı da içerir; verilen yapı fosfatsız olduğundan nükleotit değildir.",
      ],
      [
        "Standart DNA ve RNA’daki şeker farkını doğru belirten seçenek hangisidir?",
        "Ribozun 2′ konumunda OH, deoksiribozun aynı konumunda H bulunur",
        [
          "DNA’nın şekeri altı karbonlu glikozdur",
          "RNA hiçbir şeker taşımaz",
          "İki şeker yalnız fosfor atomu sayısıyla ayrılır",
          "Deoksiribozda azotlu baz hiçbir zaman bulunmaz",
        ],
        "Deoksi farkı pentozun 2′ karbonundadır.",
        "Riboz ve deoksiriboz beş karbonlu şekerlerdir. 2′ konumundaki OH/H farkı tam nükleotidin kimyasal özelliğini etkiler; bazın varlığına engel değildir.",
      ],
      [
        "DNA zinciri 5′-ATGC-3′ ise karşı zincirin kendi 5′→3′ yönündeki dizisi nedir?",
        "5′-GCAT-3′",
        ["5′-TACG-3′", "5′-ATGC-3′", "5′-AUGC-3′", "5′-CGTA-3′"],
        "Önce karşısına 3′-TACG-5′ yaz; sonra onu ters yönden oku.",
        "Antiparalel eşlemede aynı fiziksel doğrultuda karşı 3′-TACG-5′ olur. Kendi 5′ ucundan okununca GCAT elde edilir; TACG’yi 5′ diye etiketlemek yön hatasıdır.",
      ],
      [
        "Standart çift zincirli DNA’nın bütününde G=%20. A yüzdesi kaçtır?",
        "%30",
        ["%20", "%40", "%60", "%80"],
        "G=C; kalan pay A ve T arasında eşittir.",
        "C=%20 olduğundan G+C=%40; kalan %60 A ve T’ye eşit dağılır. A=%30 olur; öncül bütün iki zincire aittir.",
      ],
      [
        "Doğrusal çift zincirli bir DNA parçasında her zincir 8 nükleotittir. İki omurgadaki toplam fosfodiester komşuluk bağlantısı kaçtır?",
        "14",
        ["7", "8", "16", "24"],
        "Her doğrusal zincirde bir eksik bağlantı vardır.",
        "Her zincir 8−1 = 7 bağlantı taşır; iki zincirde 14. Hidrojen bağları bu sayıya eklenmez; başka bağ türüdür.",
      ],
      [
        "Bir DNA parçasında 5 A–T ve 3 G–C çifti var. Baz çiftleri arasındaki toplam hidrojen bağı kaçtır?",
        "19",
        ["8", "16", "21", "24"],
        "A–T için 2, G–C için 3 kullan.",
        "5×2+3×3 = 10+9 = 19 hidrojen bağı. Sekiz baz çifti toplam on altı nükleotittir; bağ sayısı doğrudan toplam nükleotit değildir.",
      ],
      [
        "Bir tek RNA zincirinin harf dizisi veriliyor, hangi iç bölgelerinin eşleştiği belirtilmiyor. Hangisi doğru değerlendirmedir?",
        "Toplam hidrojen bağı sayısı yalnız bu bilgiyle kesinleştirilemez",
        [
          "Tek zincir olduğu için bütün koşullarda hidrojen bağı sıfırdır",
          "RNA’da her A mutlaka karşı zincir T’ye bağlıdır",
          "RNA’nın bütün bazları çift halkalıdır",
          "RNA hiçbir zaman katlanamaz",
        ],
        "Tek zincir kendi içinde eşleşebilir ama katlanma ayrıca bilinmelidir.",
        "RNA iç baz eşleşmeleriyle katlanabilir. Diziye göre olası eşleşmeler bulunsa da gerçek yapı ve koşul verilmeden tek kesin hidrojen bağı sayısı dayatılmaz.",
      ],
      [
        "Okulun yaklaşık B-DNA modelinde bir tur 10 baz çifti içeriyorsa bu turdaki toplam nükleotit sayısı kaçtır?",
        "20",
        ["5", "10", "30", "40"],
        "Bir baz çifti iki ayrı nükleotit taşır.",
        "10 çift × 2 = 20 nükleotit. Yaklaşık 3,4 nm tur yüksekliği ve 0,34 nm çift aralığı aynı baz çifti birimini kullanır.",
      ],
      [
        "Eşlenmiş bir ökaryotik kromozomun iki kardeş kromatidiyle ilgili uygun okul modeli hangisidir?",
        "Her kardeş kromatitte bir temel çift zincirli DNA molekülü bulunur",
        [
          "İki kardeş kromatit zorunlu iki ayrı homolog türüdür",
          "Her kromatit yalnız serbest fosfattan oluşur",
          "DNA eşlenmesi kromozom sayısını otomatik iki katına çıkarır",
          "Bir kromatitte hiçbir gen bulunmaz",
        ],
        "Kromozom, kromatit ve DNA molekülünü ayrı say.",
        "DNA eşlenmesi iki kardeş kromatit oluşturur; bir arada kalan kromozom sentromer ölçütüyle tek sayılır. Her kromatit bir temel çift zincirli DNA molekülü taşır.",
      ],
      [
        "Aynı baz yüzdelerine sahip iki DNA örneği için hangisi kesin söylenebilir?",
        "Bileşimleri bu ölçütte benzerdir; baz sıralarının aynı olması zorunlu değildir",
        [
          "Bütün gen dizileri kesin aynıdır",
          "Aynı canlı türü oldukları zorunludur",
          "Bütün genleri aynı anda aynı hızla çalışır",
          "Mutlaka aynı uzunlukta kromozom taşırlar",
        ],
        "Yüzde toplamı dizideki sırayı bildirmez.",
        "Baz yüzdesi bileşim bilgisidir. Aynı yüzdeler farklı uzunluk ve birçok farklı sıra ile elde edilebilir; tür, gen ifadesi ve dizi özdeşliği bundan zorunlu çıkmaz.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 2 fiziksel PDF 32–37; OGM Nükleik Asitlerin Yapısı ve DNA Replikasyonu sunularının yapı sayfaları; Dersler Cepte Nükleik Asitler I basılı 10–16; Aurelia TYT Nükleik Asitler DNA ve RNA kopya kağıdı gerçek 1–9. Çift zincir koşulu, omurga uçları, modifiye RNA ve prokaryot çeşitliliği korunmuştur. Özgün sorular resmî sınav sorusu değildir.",
  },
  {
    id: "kalitim-molekulu-kesfi",
    topic: "detail-329",
    title: "Kalıtım molekülünün keşfi: deneyden kanıta",
    minutes: 85,
    objectives: [
      "Maddenin ayrıştırılmasıyla kalıtsal işlevinin kanıtlanmasını ayır.",
      "Griffith ve Avery deneylerinde deney gruplarını ve alternatif açıklamaları izle.",
      "Hershey–Chase deneyinde işaretleme, ayırma ve sinyalin yerini birlikte yorumla.",
      "Baz bileşimi ve kırınım verilerinin DNA modeli için katkılarını sınırlarıyla açıkla.",
    ],
    sections: [
      {
        title: "Bir maddenin bulunması işlevinin kanıtı değildir",
        paragraphs: [
          "Miescher 1869’da hücre çekirdeğinden fosforca zengin bir madde ayırarak nükleik asit araştırmalarına önemli başlangıç sağladı. Bu kimyasal ayırma, DNA’nın bütün kalıtım olaylarını taşıdığını tek başına göstermez. Bilimde yapı, hücredeki yer ve işlev için farklı deneysel sorular sorulur.",
          "Başlangıçta proteinlerin çok çeşitli yapılar taşıması onları güçlü kalıtım adayı hâline getirmişti. Bir hipotezin yaygın olması doğru olduğunu kanıtlamaz; yeni kanıtlarla sınanması gerekir. Keşif tarihini yalnız isim–yıl listesi olarak değil, her deneyin hangi alternatif açıklamayı zayıflattığı üzerinden öğren.",
        ],
      },
      {
        title: "Griffith’in iki bakteri tipini ve kontrol gruplarını tanı",
        paragraphs: [
          "Griffith 1928’de zatürre etkeni bakterilerin kapsüllü S ve kapsülsüz R biçimlerini karşılaştırdı. Ders modelinde canlı S verilen fare ölür, canlı R verilen fare yaşar. Isıyla öldürülmüş S tek başına verildiğinde fare yaşar. Bu gruplar başlangıçtaki virülans ve ısı etkisi için ayrı kontrollere karşılık gelir.",
          "Canlı R ile ısıyla öldürülmüş S karıştırıldığında fare ölür ve canlı S bakterileri elde edilir. Yalnız ölü bakterinin toksik artığı farenin ölümünü açıklayabilir diye düşünülse bile canlı S’nin yeniden elde edilmesi kalıcı özellik dönüşümünü destekleyen ek gözlemdir. S/R adları hücre şekli veya bütün türlerde zorunlu tek hastalık kuralı değildir.",
        ],
      },
      {
        title: "Transformasyon neyi gösterir, neyi henüz göstermez?",
        paragraphs: [
          "Karışımdaki canlı R hücreleri ölü S kökenli bir etkeni alarak kapsüllü özellik kazanabilir; bu olaya transformasyon denir. Canlı S’nin sonraki çoğalmada özelliğini sürdürmesi, etkisinin yalnız geçici çevre boyası olmadığını düşündürür. Gözlenen değişim, hücre dışından gelen bilginin özellik değiştirebildiğini gösterir.",
          "Griffith’in bu düzeni dönüştürücü etkenin kimyasal olarak DNA olduğunu tek başına teşhis etmez. Ölü S hücrelerinde DNA, RNA, protein ve başka maddeler birlikte vardır. Etkenin hangi madde olduğunu ayırmak için seçici ayırma ve bozma deneyleri gerekir. Bir deneyin sonraki keşifle tutarlı olması, ilk deneyin o sonraki ayrıntıyı doğrudan ölçtüğü demek değildir.",
        ],
      },
      {
        title: "Avery, MacLeod ve McCarty etkeni seçici enzimlerle sınar",
        paragraphs: [
          "1944’te Avery, MacLeod ve McCarty, S kökenli dönüştürücü özütü farklı işlemlerle karşılaştırdı. Proteaz proteinleri, RNaz RNA’yı, DNaz DNA’yı bozmak için kullanılır. Uygun koşullarda proteaz ve RNaz sonrası dönüşüm sürerken DNA’yı bozan işlem dönüşümü ortadan kaldırır. Kaynak şemasındaki yağları ve karbonhidratları parçalayan seçici enzim kontrollerinde de dönüşüm sürer; lipaz veya karbonhidrat parçalayıcı işlemin hedefi, DNazın hedefiyle aynı değildir.",
          "Çıkarım, gereken bileşenin DNA olduğuyla uyumludur. Bunun güçlü olması için enzimlerin seçiciliği, işlemlerin gerçekten hedefi bozduğu ve alıcı R hücrelerinin yaşayabildiği kontrol edilmelidir. DNaz eklendiğinde bütün canlılar zehirleniyorsa dönüşümün yokluğu tek başına DNA gerekliliğine bağlanamaz; kontrol tasarımı bu alternatifleri sınar.",
        ],
      },
      {
        title: "Deneyde gereklilik ve tek başına yeterlilik farklı sorulardır",
        paragraphs: [
          "Bir bileşeni bozunca olayın durması, uygun kontrol altında o bileşenin süreç için gerekli olduğunu destekler. Saflaştırılmış bileşenin uygun alıcıya verildiğinde dönüşüm oluşturması ise yeterlilik yönünde başka kanıt sağlar. Deney sonucunu kullanılan madde saflığı ve alıcı hücrenin koşullarıyla birlikte yorumla.",
          "Bir kontrol grubunda sonuç görülmediğinde yokluğu ölçümün duyarlılığına göre değerlendirmek gerekir. Eksik veriyle bütün biyolojik sistemlerde aynı mekanizmanın zorunlu bulunduğu iddia edilmez. Genetik bilginin taşınmasına ilişkin farklı organizmalarda bağımsız kanıtlar birikmesi ortak açıklamayı güçlendirir.",
        ],
      },
      {
        title: "Hershey–Chase T2 fajında iki farklı molekülü işaretler",
        paragraphs: [
          "1952’de Hershey ve Chase, bakteri enfekte eden T2 fajıyla DNA ve protein katkısını ayırdı. Bu deneyde DNA fosfat omurgası nedeniyle radyoaktif fosfor-32 ile; fajın protein kılıfı kükürt içeren amino asitleri nedeniyle kükürt-35 ile izlenebilir. DNA’nın standart yapısında kükürt bulunmaz; incelenen kılıf işaretlemesi de deneyin maddesel koşuludur.",
          "Buradan bütün proteinlerde hiç fosfor olmadığı veya bütün proteinlerin aynı oranda kükürt taşıdığı gibi genelleme çıkmaz. İşaretli fajların bakteriyle buluşması iki ayrı deney grubunda izlenir. İzotopun adını bilmek yeterli değildir; hangi molekülün işaretlendiğini ve sinyalin sonra hangi bölmede arandığını birlikte düşün.",
        ],
      },
      {
        title: "Karıştırma ve santrifüj sinyalin yerini anlamlı kılar",
        paragraphs: [
          "Enfeksiyon sonrası karıştırma faj kılıflarını bakteri yüzeyinden ayırmaya yardım eder. Santrifüjle bakteriler çökeltiye, ayrılmış hafif kılıflar büyük ölçüde üst sıvıya ayrılır. Fosfor-32 sinyalinin daha çok bakteri çökeltisinde, kükürt-35’in daha çok üst sıvıda bulunması iki molekülün farklı yolunu gösterir.",
          "Yavru fajlarda işaretin izlenmesi de kalıtsal katkının anlaşılmasını destekler. Ölçüm çoğunluk dağılımıdır; bütün tüplerde sinyalin yüzde yüz tek bölmede bulunması zorunlu değildir. Karıştırma veya ayırma yapılmadan yalnız toplam tüp radyoaktivitesine bakmak, maddenin hücrenin içine mi yüzeyine mi geldiğini ayıramaz.",
        ],
      },
      {
        title: "Sonucun kapsamı incelenen sistemle başlar",
        paragraphs: [
          "T2 fajı DNA genomlu bir virüstür; deneyde DNA’nın bakteriye giren ve yavru üretimiyle ilişkili kalıtsal bileşen olduğunu destekleyen sonuçlar bulunur. Hücresel canlılar ve farklı DNA sistemlerinde başka deneyler de DNA’nın rolünü destekler. Ortak bilgi bağımsız kanıtların birikiminden doğar.",
          "RNA genomlu virüsler bulunduğundan bütün virüslerin kalıtsal maddesi mutlaka DNA’dır sonucu doğru değildir. Virüslerin hücresel yapısı bulunmaması, bakterilerle aynı hücre sınıfı oldukları anlamına gelmez. Keşif sorularında bütün canlılar ve bütün virüsler gibi kapsamı genişleten sözcüklere dikkat et; sonucu kanıttan büyük yapma.",
        ],
      },
      {
        title: "Chargaff bileşimi ölçer, diziyi doğrudan çözmez",
        paragraphs: [
          "Chargaff’ın farklı DNA örneklerindeki baz bileşimini incelemesi, çift zincirli DNA’da A ile T ve G ile C miktarlarının eşitliğine temel kanıt sağladı. Türler arasında toplam A+T ve G+C oranları değişebilir. Bu bulgular eşleşme modelinin kimyasal kısıtlarını anlamaya katkı verdi.",
          "Aynı baz yüzdeleri aynı sırayı veya aynı türü kesinleştirmez. Bir zincirin tek başına A=T olacağı da bu ölçümlerden çıkmaz. Yüzde bileşimi, dizideki konumlar ve molekülün üç boyutlu yapısı farklı veri türleridir; birini diğerinin tam ölçümü gibi sunmak keşif mantığını bozar.",
        ],
      },
      {
        title: "Kırınım ile model kurma bir kanıt ortaklığıdır",
        paragraphs: [
          "Rosalind Franklin ve Raymond Gosling’in X ışını kırınım çalışmaları, Maurice Wilkins’in de yer aldığı araştırma ortamıyla birlikte, DNA’nın helisel düzeni ve boyutlarına ilişkin önemli bilgiler sağladı. Watson ve Crick 1953’te kimyasal bağ, baz eşleşmesi ve mevcut yapısal verilerle uyumlu çift sarmal modeli sundu.",
          "Bir kırınım fotoğrafı bazların tek tek harf sırasını doğrudan okumaz. Kimyasal ve geometrik verilerin birlikte sağladığı kısıtlar modelin gücüdür; bilimsel katkılar tek bir kişinin tek fotoğrafıyla her ayrıntıyı çözmesi biçiminde anlatılmaz. Yapı modeli ayrıca her zincirin eşlenmede kalıp olabileceği düşüncesine anlamlı bir temel verir.",
        ],
      },
      {
        title: "İzotopları işaretleme amacıyla sınıflandır",
        paragraphs: [
          "Fosfor-32 ve kükürt-35 radyoaktiftir; yaydıkları sinyal izlenebilir. Azot-15 ise kararlı ağır izotoptur; DNA’nın yoğunluğunu değiştirmede kullanılabilir ve aynı tür radyoaktivite ölçümünü gerektirmez. İzotop etiketinin nasıl saptandığı deneydeki ayırma yöntemine bağlıdır.",
          "Bu ayrım DNA’nın ne olduğunu gösteren deneylerle nasıl eşlendiğini sınayan deneyleri karıştırmayı önler. Hershey–Chase hücreye giren kalıtsal bileşeni karşılaştırırken, yoğunlukla işaretli eşlenme deneyleri eski ve yeni zincirlerin dağılımını sınar. İkisi aynı işaret adı veya aynı sonuca sahip tek deney değildir.",
        ],
      },
    ],
    examples: [
      {
        title: "Dört fare grubu ve eksik kimyasal kimlik",
        prompt:
          "Canlı S fareyi öldürüyor; canlı R ve ısıyla ölü S ayrı ayrı öldürmüyor. Canlı R+ölü S karışımı öldürüyor ve canlı S elde ediliyor. Dönüşüm ve kimyasal kimlik açısından çıkarımı kur.",
        strategy:
          "Yeni kalıcı fenotipi gözle, kimliği henüz bilinmeyen etkeni ayrı tut.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Karışım sonucunun iki ayrı kontrolden farklı olması iki bileşenin birlikte etkisini gösterir.",
          },
          {
            label: "2. adım",
            explanation:
              "Canlı S elde edilmesi R’nin kalıcı özellik dönüşümünü destekler.",
          },
          {
            label: "3. adım",
            explanation:
              "Karışım çok madde içerdiğinden DNA kimliği bu verilerle tek başına kesinleştirilemez.",
          },
        ],
        answer:
          "Transformasyon desteklenir; dönüştürücü maddenin DNA olduğu henüz doğrudan ayrılmamıştır.",
        check:
          "Ölü S tek başına kontrolünü ve canlı S geri elde edilmesini birlikte kullan.",
        pitfall:
          "Griffith deneyine Avery’nin enzim sonucunu sonradan eklenmiş öncül gibi taşıma.",
      },
      {
        title: "Enzim seçiciliğiyle gereklilik",
        prompt:
          "Aynı S özütünde işlem yok, proteaz ve RNaz sonrası R→S dönüşümü var; DNaz sonrası yok. Alıcıların yaşadığı ve enzimlerin hedefleri seçici bozduğu kontrol edilmiş. Hangi bileşen gerekli görünür?",
        strategy: "Tek değişen sonuçla seçici işlem hedefini eşle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Protein bozulduğunda olay sürdüğünden bu işlemde protein gerekli etken olarak desteklenmez.",
          },
          {
            label: "2. adım",
            explanation: "RNA bozulduğunda olay sürer; DNA bozulduğunda durur.",
          },
          {
            label: "3. adım",
            explanation:
              "Canlılık ve seçicilik kontrolleri altında dönüştürücü işlev için DNA gerekliliği desteklenir.",
          },
        ],
        answer: "DNA.",
        check: "DNazın hücreleri öldürmediği öncülünü sonuçla birlikte tut.",
        pitfall:
          "Kontrolü olmayan enzim etkisini kimyasal gereklilik diye sunma.",
      },
      {
        title: "Çökelti ve üst sıvıda sinyal",
        prompt:
          "Ayrı T2 faj gruplarında P-32 DNA’yı, S-35 protein kılıfını işaretliyor. Enfeksiyon, karıştırma ve santrifüj sonrası P-32 çoğunlukla bakterili çökeltide, S-35 üst sıvıda. Ne desteklenir?",
        strategy: "Ayırmanın hangi parçayı nereye taşıdığını izle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Bakteriler çökeltiye, ayrılmış kılıflar üst sıvıya ayrılır.",
          },
          {
            label: "2. adım",
            explanation:
              "DNA işareti bakterilerle, protein kılıf işareti çoğunlukla dış bölmeyle birliktedir.",
          },
          {
            label: "3. adım",
            explanation:
              "T2’de DNA’nın içeri giren kalıtsal katkı olduğu desteklenir; bütün virüslere mutlak DNA sonucu çıkmaz.",
          },
        ],
        answer:
          "İncelenen T2 sisteminde DNA’nın içeri giren kalıtsal rolü desteklenir.",
        check: "Toplam tüp sinyalini değil ayrılmış bölmeleri karşılaştır.",
        pitfall:
          "Bütün sinyalin yüzde yüz tek yerde olması gerektiğini varsayma.",
      },
      {
        title: "Bileşim modeli sınırlar, diziyi tekleştirmez",
        prompt:
          "İki çift zincirli DNA örneğinde A=%30,T=%30,G=%20,C=%20 ölçülüyor. Aynı dizi ve aynı tür sonucu çıkar mı?",
        strategy: "Ölçülmeyen konum bilgisini yüzdelerden üretme.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Veriler iki örneğin bu dört baz yüzdesinin eşit olduğunu gösterir.",
          },
          {
            label: "2. adım",
            explanation:
              "Bazların yerleri ve molekül uzunlukları verilmemiştir.",
          },
          {
            label: "3. adım",
            explanation:
              "Aynı yüzdeyi sağlayan birçok sıra ve uzunluk olabileceğinden dizi veya tür özdeşliği zorunlu değildir.",
          },
        ],
        answer: "Hayır; yalnız bileşim benzerliği desteklenir.",
        check:
          "ATGC gibi kısa sıraların yerlerini değiştirince toplamlar korunabilir.",
        pitfall: "Eşleşme kuralını tür teşhis testi sayma.",
      },
    ],
    recall: [
      {
        prompt: "Griffith ile Avery’nin soruları nasıl farklıdır?",
        answer:
          "Griffith kalıcı dönüşüm olgusunu gösterir; Avery ve çalışma arkadaşları seçici işlemlerle dönüştürücü kimyasal bileşeni sınar.",
      },
      {
        prompt: "Hershey–Chase’de karıştırma neden gerekir?",
        answer:
          "Yüzeye bağlı faj kılıflarını bakterilerden ayırmaya yardım eder; çökelti/üst sıvı sinyali içerideki ve dışarıdaki katkıyı karşılaştırabilir.",
      },
      {
        prompt: "P-32 ile S-35 deneyde neyi izler?",
        answer:
          "T2 koşullarında P-32 DNA’yı, S-35 kükürt içeren protein kılıfını izler; bütün proteinlere değişmez element genellemesi yapılmaz.",
      },
      {
        prompt: "Azot-15 radyoaktif işaret midir?",
        answer:
          "Hayır, kararlı ağır izotoptur; yoğunluk farkıyla izleme amacı taşır. P-32 ve S-35 radyoaktif örneklerdir.",
      },
    ],
    items: [
      [
        "Miescher’in çekirdekten fosforca zengin nükleik madde ayırması tek başına hangi sonucu vermez?",
        "Bu maddenin kalıtsal işlevinin bütün ayrıntılarıyla kanıtlandığını",
        [
          "Çekirdekle ilişkili bir madde incelendiğini",
          "Kimyasal bir ayırma yapıldığını",
          "Fosfor bakımından dikkat çeken bileşim bulunduğunu",
          "Sonraki araştırmalar için bir başlangıç verisi sağlandığını",
        ],
        "Maddenin bulunmasını işlev deneyinden ayır.",
        "Kimyasal ayırma yapı ve bileşim hakkında bilgi verir. Kalıtsal işlev için özellik aktarımı ve gereken bileşenin sınanması gibi ek deneyler gerekir.",
      ],
      [
        "Canlı R+ısıyla öldürülmüş S karışımından canlı S elde edilen Griffith düzeninde en doğrudan desteklenen olay hangisidir?",
        "Canlı R’de kalıcı özellik dönüşümü",
        [
          "Isıyla ölmüş bütün S hücrelerinin kendiliğinden dirilmesi",
          "DNA kimliğinin saf DNaz deneyiyle bu düzende ayrılması",
          "Bütün virüslerin RNA genomlu olduğunun kanıtı",
          "Her proteinin fosfor içermediğinin kimyasal kanıtı",
        ],
        "Dönüşüm olgusu ile etkenin kimyasal kimliğini ayır.",
        "Karışımda R hücrelerinin S özelliği edinmesi transformasyonu destekler. Griffith’in grupları DNazla kimyasal ayrım içermez; DNA kimliği ek deney gerektirir.",
      ],
      [
        "Bir dönüşüm deneyinde proteaz ve RNaz sonrası dönüşüm sürüyor, DNaz sonrası duruyor. Alıcı canlılığı ve seçici hedef bozunması kontrol edilmiş. Hangi bileşenin gerekliliği desteklenir?",
        "DNA",
        [
          "Yalnız protein",
          "Yalnız RNA",
          "Hücre dışı kum",
          "Yalnız kükürt gazı",
        ],
        "Olayı durduran seçici işlemin hedefini bul.",
        "DNaz DNA’yı bozar. Diğer iki işlemde dönüşüm sürmesi ve canlılık kontrolü, DNA’nın dönüştürücü işlevde gerekli olduğuna kanıt sağlar.",
      ],
      [
        "DNaz eklenen grupta hem dönüşüm yok hem alıcı bakterilerin tamamı ölmüş. DNA gerekliliği için temel sorun nedir?",
        "Olayın yokluğu DNA bozunması yerine alıcıların ölümüyle de açıklanabilir",
        [
          "Ölü alıcılar dönüşümü daha iyi yapar",
          "Bütün proteazlar DNA’yı zorunlu sentezler",
          "Her DNaz deneyi yüzde yüz kimlik kanıtıdır",
          "Alıcı canlılığı hiçbir deneyde önemli değildir",
        ],
        "Tek açıklamayı seçmeden önce canlılık alternatifini denetle.",
        "Yaşayan alıcı gerekliyse hücre ölümü dönüşümü zaten durdurur. DNA’ya özgü çıkarım için alıcı canlılığı ve enzim seçiciliği ayrıca korunmalıdır.",
      ],
      [
        "T2 fajında standart DNA’yı P-32 ile izlemeyi hangi yapı özelliği sağlar?",
        "DNA’nın fosfat içeren omurgası",
        [
          "DNA’nın kükürt içeren protein kılıfı olması",
          "DNA’da hiçbir element bulunmaması",
          "DNA’nın yalnız yağ asidi taşıması",
          "DNA’daki bütün bazların kükürtten oluşması",
        ],
        "Fosforun nükleotitteki yerini hatırla.",
        "DNA nükleotitlerinin fosfatları fosfor taşır. S-35 ise bu deneyde kükürt içeren faj protein kılıfını izlemek için kullanılır.",
      ],
      [
        "Hershey–Chase düzeninde enfeksiyon sonrası karıştırma ve santrifüj yapılıyor. Bakteriler çökeltideyse, DNA işareti çoğunlukla nerede beklenir?",
        "Bakterili çökeltide",
        [
          "Yalnız tamamen boş cam duvarda",
          "Zorunlu yüzde yüz ayrılmış kılıf üst sıvısında",
          "Yalnız havaya çıkan oksijende",
          "Hiçbir yerde; fosfor kaybolur",
        ],
        "Hücreye geçen molekül bakterilerle birlikte ayrılır.",
        "T2 DNA’sı bakteriye giren katkı olduğundan P-32 sinyali büyük ölçüde bakterili çökeltide bulunur. Ölçüm çoğunluk dağılımıdır; yüzde yüz saflık öncülü eklenmez.",
      ],
      [
        "T2 deneyindeki S-35 işaretinin büyük ölçüde üst sıvıda bulunması neyle uyumludur?",
        "Protein kılıflarının çoğunun hücre dışında kalıp ayrılmasıyla",
        [
          "Bütün DNA’nın kükürt taşımak zorunda olmasıyla",
          "Bakterilerin hiç çökelmemesiyle",
          "Fajın zorunlu insan plasentası olmasıyla",
          "Proteinlerin bütün canlılarda kalıtsal olamayacağının tek başına evrensel kanıtıyla",
        ],
        "İşaretli molekülü ve ayırma adımını birlikte kullan.",
        "S-35 bu düzende protein kılıfını izler; karıştırmayla ayrılan kılıflar üst sıvıda kalabilir. Bu gözlem verilen T2 sisteminde yorumlanır.",
      ],
      [
        "DNA genomlu T2 fajı üzerine yapılan deneyden hangi genelleme çıkarılamaz?",
        "Bütün virüslerin genomu mutlaka DNA’dır",
        [
          "T2’de DNA’nın içeri giren katkısı desteklenebilir",
          "Protein kılıf ile DNA farklı işaretlerle izlenebilir",
          "Karıştırma dış kılıfların ayrılmasına yardım edebilir",
          "Santrifüj bölmeleri sinyal karşılaştırması sağlayabilir",
        ],
        "Başka virüslerin genomları deneyin kapsamı dışındadır.",
        "RNA genomlu virüsler vardır. İncelenen T2’nin DNA sonucunu bütün virüslere genişletmek deneyin kapsamını aşar; diğer seçenekler düzenin doğrudan parçalarıdır.",
      ],
      [
        "X ışını kırınım verisinin DNA çift sarmal modeline temel katkısı hangisidir?",
        "Helisel düzen ve moleküler boyutlara ilişkin yapısal kısıtlar sağlamak",
        [
          "Her genin baz sırasını tek tek doğrudan okumak",
          "Bütün mutasyonları onarmak",
          "Her nükleotidin mRNA olduğunu göstermek",
          "Yalnız yavru farelerin yaşını ölçmek",
        ],
        "Yapı verisini dizi verisinden ayır.",
        "Kırınım desenleri üç boyutlu düzen ve boyutların anlaşılmasını destekler. Harf dizisini tek tek okumaz; kimyasal verilerle birlikte model kurulmasına katkı verir.",
      ],
      [
        "İşaretleme araçları için doğru eşleme hangisidir?",
        "Azot-15 kararlı ağır izotop; P-32 ve S-35 radyoaktif izotoplar",
        [
          "Azot-15 zorunlu bir enzim; P-32 yalnız protein",
          "S-35 bir fosfodiester bağı; P-32 bir hücre",
          "Üçü de aynı elementin aynı izotopudur",
          "Azot-15 ile S-35’in kütlesi ve elementi kesin aynıdır",
        ],
        "İzotop adı hem elementi hem kütle numarasını taşır.",
        "Azot-15 yoğunluk farkında kullanılan kararlı izotoptur. Fosfor-32 ve kükürt-35 radyoaktiftir; bunların sinyal saptama yöntemleri aynı varsayılmaz.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 2 fiziksel PDF 29–31; OGM Nükleik Asitlerin Keşfi sunusunun gerçek deney şekilleri 4–13 ile karşılaştırılmış özgün öğretim. Kontrol, çıkarım kapsamı, T2 sınırı, katkı sahipleri ve kararlı/radyoaktif izotop ayrımı korunmuştur.",
  },
];

export const forge020BiologyGuideExtensions: Pick<
  LessonGuide,
  "id" | "sections" | "examples" | "recall" | "source"
>[] = [
  {
    id: "dna-eslenmesi",
    sections: [
      {
        title: "İlk nükleotidi yerleştirmek ayrı bir başlangıç işidir",
        paragraphs: [
          "DNA polimeraz mevcut bir zincirin uygun 3′ hidroksil ucunu uzatır; tek başına boş şablon üzerinde ilk bağı her durumda kuramaz. Primaz kısa RNA başlangıcı, yani primer üretir. Primerin 3′ ucu DNA uzamasına başlangıç sağlar. Öncü zincir için de başlangıç gereksinimi vardır; yalnız geciken zincirin sorunu değildir.",
          "Geciken zincirde her yeni Okazaki parçası için uygun yeni başlangıç gerekir. Parçalar oluştuğunda primerler uzaklaştırılır, açılan bölgeler DNA ile tamamlanır ve kalan omurga kesintileri birleştirilir. Farklı canlı gruplarında enzim adları ve iş bölümü değişebilir; ortak mantık başlatma, uzatma, işleme ve birleştirmeyi ayırmaktır.",
        ],
      },
      {
        title: "Helikazın arkasındaki tek zincirler yeniden eşleşmeden korunur",
        paragraphs: [
          "Helikaz baz çiftleri arasındaki eşleşmeyi açarak kalıpları ayırır. Açılmış tek zincire bağlanan proteinler, bu bölgelerin istenmeyen biçimde kendi üzerine katlanmasını veya yeniden eşleşmesini sınırlamaya yardım eder. Ökaryotlardaki RPA ve bakterilerde SSB adları bu işlev çerçevesinde karşılaştırılabilir.",
          "DNA’nın ileri kısmında açılma dönme gerilimi doğurabilir. Topoizomerazlar DNA omurgasında kontrollü, geçici kesme ve yeniden birleştirme işlemleriyle bu topolojik sorunu yönetir. Bu işlevi bütün omurganın kalıcı parçalanması veya helikazın baz dizisini değiştirmesi olarak anlatma; işin hedefi yapısal gerilimi düzenlemektir.",
        ],
      },
      {
        title: "Enerji öncül nükleotidin fosfat düzeninde de taşınır",
        paragraphs: [
          "DNA uzaması dNTP öncülleriyle yürür. Yeni nükleotit zincire katılırken pirofosfat ayrılır; pirofosfatın hidrolizi ileri yöndeki kimyasal akışa katkı verir. Bu nedenle sentezi yalnız tek fosfatlı nükleotitler arasında, her bağ için aynı tek su çıkışıyla gerçekleşen atomik mekanizma olarak kurmak yetersizdir.",
          "Enerji kullanımı, helikaz gibi yardımcı enzimlerin ATP kullanımıyla birlikte ele alınabilir; her enzimin aynı kimyasal adımı yaptığı söylenmez. Ders sorusu soyut bir bağ–su sayımı koşulu verirse o model içinde işlem yapılır. Ancak gerçek polimerazın etkin öncülü ve ürünleri açıkça soruluyorsa dNTP ile pirofosfat ayrımını kullan.",
        ],
      },
      {
        title: "Orijin, çatal ve tamamlanan bölgeyi say",
        paragraphs: [
          "Bir çift yönlü orijinden başlayan eşlenme kabarcığında başlangıçta iki çatal vardır. Çok orijinli doğrusal DNA’da farklı kabarcıklar büyür ve komşu çatallar karşılaştığında aradaki bölge tamamlanır. Orijin sayısı ile her anda etkin çatal sayısı bu nedenle her evrede aynı sabit kat değildir.",
          "Örneğin etkinliği sürmekte olan üç ayrı kabarcık ve henüz birleşme yoksa altı çatal bulunur. İki komşu çatal birleşip sonlandığında etkin sayı azalabilir. Soruda başlatılmış orijin mi, eşlenme öncesi potansiyel orijin mi, yoksa o anda etkin çatal mı soruluyor, bunu belirle. Prokaryot–ökaryot karşılaştırmasını bütün canlılarda tek değişmez orijin sayısına dönüştürme.",
        ],
      },
      {
        title: "Çatal hızından süre hesaplarken bölge sınırını belirt",
        paragraphs: [
          "Bir doğrusal bölgenin ortasında tek orijin olduğunu ve iki çatalın eşit, sabit hızla zıt yönlerde ilerlediğini varsay. Toplam uzunluk L, her çatal hızı v ise ve başka kısıt yoksa her çatal L/2 yolu alır; tamamlanma süresi L/(2v) olur. Birim baz çifti ve baz çifti/saniye uyumlu olmalıdır.",
          "Orijin uçtaysa, çatalların hızları farklıysa veya başka orijinlerle karşılaşma varsa aynı formül doğrudan kullanılamaz. Çok orijin çoğu durumda eşlenmeyi paralelleştirebilir; fakat bütün süreyi yalnız orijin sayısına bölmek için uzunluk paylaşımı ve hız koşullarının verilmesi gerekir. Model sonucunu gerçek genomda sabit garanti süre olarak sunma.",
        ],
      },
      {
        title: "Ligazın birleştirdiği kesintiyi doğru say",
        paragraphs: [
          "Doğrusal bir yeni zincir bölgesinde n parça peş peşe dizilmişse aradaki parça sınırı n−1’dir. Primerler kaldırılıp boşluklar DNA ile tamamlandıktan sonra bu sınırların uygun omurga kesintileri ligazla kapatılabilir. Ligaz komşu uçlar arasında kovalent omurga bağlantısını tamamlar; karşı zincirlerin bazlarını birbirine dikmez.",
          "Bu basit sayım yalnız belirtilen doğrusal parça serisi ve seçilen sınırlar içindir. Halkasal kapanma, başka bölge sınırı veya ayrıca verilen çentikler varsa sayı değişebilir. Parça sayısından bütün hücrede kullanılan toplam ligaz molekülünü veya ATP miktarını çıkarmak için ek stoikiyometri gerekir; n−1 doğrudan enzim molekülü sayısı değildir.",
        ],
      },
      {
        title: "Yoğunluk verisi iki alternatif modeli farklı turlarda ayırır",
        paragraphs: [
          "Meselson ve Stahl’ın 1958’de yoğunluk işaretlemesiyle sınadığı yaklaşımda, ağır azotla işaretli DNA hafif ortama alındığında ilk eşlenmede ara yoğunluklu DNA görülmesi, korunumlu modelin beklediği ayrı ağır ve hafif moleküller örüntüsünü desteklemez. Ancak ilk turdaki tek ara bant, yarı korunumlu model ile bazı dağılımlı model beklentilerini tek başına ayıramayabilir.",
          "İkinci turda bir ara ve bir hafif bant görülmesi yarı korunumlu dağılımla uyumludur; dağılımlı beklentinin tek ara bandının giderek hafiflemesiyle karşılaştırılabilir. Denatürasyon zincirleri ayırdığında ölçülen birim de değişir. Çift zincirli bütün molekül yoğunluğu ile ayrılmış tek zincir sinyalini aynı bant hesabı gibi kullanma.",
        ],
      },
      {
        title: "İşaret değişiminde zincir kohortlarını izle",
        paragraphs: [
          "Yarı korunumlu eşlenmede eski zincirler kaybolmaz; her biri yeni bir zincir için kalıp olur. Ortamın etiketi değiştirildiğinde yeni sentezlenen zincirler o andaki öncül havuzunun etiketini taşır. Her tur için eski ve o tur yeni oluşan zincirleri renk veya harfle ayrı saymak karmaşık etiket sorularını çözer.",
          "Örneğin bir çift zincirli molekül üç kayıpsız turda sekiz moleküle ve on altı zincire ulaşır; başlangıçtaki iki zincir hâlâ yalnız ikidir. Belirli bir turda eklenen yeni etiketin kaç zincirde bulunduğu, o turdan sonra kaç tur daha geçildiğine göre moleküller arasında dağılır. Mutasyon veya ortam etiketi kendiliğinden bütün eski bazları yeniden boyamaz.",
        ],
      },
      {
        title: "Doğruluk denetimi, onarım ve telomer sorununu ayır",
        paragraphs: [
          "Bazı DNA polimerazlar yanlış eklenen bazı nükleotitleri düzeltmeye yardımcı olur; eşlenme sonrası eşleşme onarımı gibi başka sistemler de hata yükünü azaltır. Bunlar sıfır hata garantisi değildir. DNA hasarının giderilmesi, normal eşlenmenin bütün genomu kopyalamasıyla aynı süreç değildir.",
          "Aziz Sancar’ın katkıları DNA onarımının, özellikle nükleotit çıkarım onarımının mekanizmalarıyla ilişkilidir; DNA eşlenmesini veya çift sarmalı ilk keşfeden kişi olarak anlatılmaz. Doğrusal kromozom uçlarının kopyalanma sorunu ve bazı hücrelerde telomerazın katkısı ayrı bir uzmanlaşmadır. Bir enzimin varlığı bütün hücreleri sınırsız bölünür yapmaz; düzenleme ve hücre tipi önemlidir.",
        ],
      },
      {
        title: "DNA miktarını kromozom ve hücre sayısından ayır",
        paragraphs: [
          "S evresinde DNA miktarı artarken, sentromerler ayrılmadan sayılan kromozom sayısı aynı kalabilir. Bir kromozomun iki kardeş kromatide sahip olması iki homolog kromozom oluştuğu anlamına gelmez. Eşlenme, hücre bölünmesinden önce gerçekleşen molekül çoğaltma işlemidir; hücre sayısını o anda ikiye katlamaz.",
          "Bu nedenle grafiklerde düşey eksenin DNA miktarı mı, kromozom sayısı mı, molekül sayısı mı olduğunu okuyarak başla. Dört kat DNA miktarı, dört kat gen çeşidi veya kesin dört hücre demek değildir. Yeni zincir sayımını, kardeş kromatit düzenini ve bölünme olayını ayrı satırlarda izlemek ileri sorularda güvenilir bir yol verir.",
        ],
      },
    ],
    examples: [
      {
        title: "Ortadaki tek orijinden süre",
        prompt:
          "Doğrusal bir bölge 12.000 baz çifti. Ortadaki tek orijinden iki çatal eşit sabit 300 baz çifti/saniye hızla ilerliyor; başka gecikme ve orijin yok. Tamamlanma süresi nedir?",
        strategy: "Her çatalın alacağı yarım yolu hızına böl.",
        steps: [
          {
            label: "1. adım",
            explanation: "Her çatal 12.000/2 = 6.000 baz çifti ilerler.",
          },
          {
            label: "2. adım",
            explanation: "Süre 6.000/300 = 20 saniyedir.",
          },
          {
            label: "3. adım",
            explanation:
              "İki çatal aynı anda çalıştığı için iki süre toplanmaz; ikisi 20 saniyede uçlara ulaşır.",
          },
        ],
        answer: "20 saniye.",
        check: "İki çatal toplam 2×300×20 = 12.000 baz çiftini kapsar.",
        pitfall: "Toplam uzunluğu tek çatal hızına bölüp iki yönü yok sayma.",
      },
      {
        title: "Parça sınırı ile enzim sayısını ayır",
        prompt:
          "Seçilen doğrusal yeni zincir bölgesinde altı Okazaki parçası ardışık diziliyor. Primer işlenmesi sonrası yalnız aralarındaki beş sınır kalmış. Kaç omurga kesintisi kapanmalıdır?",
        strategy: "n parçanın komşu sınırını say.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Altı parçayı bir sıra üzerinde 1–2–3–4–5–6 diye yerleştir.",
          },
          {
            label: "2. adım",
            explanation: "Aradaki sınır sayısı 6−1 = 5 olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Beş bağlantının tamamlanması gerekir; verilen bilgi beş farklı ligaz molekülü zorunluluğu vermez.",
          },
        ],
        answer: "5 omurga kesintisi.",
        check:
          "Tek doğrusal seri koşulunu ve başka çentik bulunmadığını kontrol et.",
        pitfall: "Bağlantı sayısını enzim molekülü sayısına eşitleme.",
      },
      {
        title: "İlk tur neden her modeli ayırmaz?",
        prompt:
          "Tam ağır DNA hafif ortamda bir tur eşleniyor ve tek ara yoğunluk bandı bulunuyor. Karşılaştırılan modeller: korunumlu ayrı ağır+hafif; yarı korunumlu ara; dağılımlı ara. Bu tek gözlem hangisini ayırır?",
        strategy:
          "Gözlenen desenle her modelin verilen beklentisini karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Korunumlu beklenti iki ayrı yoğunluk olduğundan tek ara bantla uyuşmaz.",
          },
          {
            label: "2. adım",
            explanation:
              "Yarı korunumlu ve dağılımlı beklentilerin ikisi de verilen ilk turda ara banttır.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu ikisini ayırmak için sonraki tur veya uygun ek deney gerekir.",
          },
        ],
        answer:
          "Korunumlu beklenti desteklenmez; diğer ikisi bu turla tekleşmez.",
        check: "İlk turun iki farklı hipotezde aynı sonuç verdiğini gör.",
        pitfall: "Sonraki turun bilgisini verilmemiş ilk tur verisine ekleme.",
      },
      {
        title: "İkinci turda eklenen etiket",
        prompt:
          "Başlangıçtaki tek DNA molekülü etiketsiz. Birinci tur etiketsiz, yalnız ikinci tur etiketli öncüllerle, üçüncü tur yine etiketsiz ortamda kayıpsız yarı korunumlu eşlenme yapıyor. Üçüncü tur sonunda ikinci tur etiketli zincir sayısı kaçtır?",
        strategy: "Her turun yeni zincir kohortunu ayrı say.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Birinci tur sonunda iki molekül ve dört zincir vardır.",
          },
          {
            label: "2. adım",
            explanation:
              "İkinci turda dört yeni etiketli zincir eklenir; toplam sekiz zincire çıkılır.",
          },
          {
            label: "3. adım",
            explanation:
              "Üçüncü tur etiketsiz sekiz yeni zincir ekler; eski dört etiketli zincir korunur ve sayısı dört kalır.",
          },
        ],
        answer: "4 etiketli zincir.",
        check:
          "Son toplam sekiz molekül/on altı zincirdir; etiketli kohort dört eski zincirdir.",
        pitfall:
          "Ortam değişince eski zincirlerin etiketinin kendiliğinden silindiğini sanma.",
      },
    ],
    recall: [
      {
        prompt: "DNA polimeraz için primer neden gerekir?",
        answer:
          "Uygun mevcut 3′ OH ucunu uzatır; primaz başlangıç RNA’sını sağlar. Başlatma ve uzatma ayrı işlerdir.",
      },
      {
        prompt: "Topoizomerazın hedefi baz sırasını değiştirmek mi?",
        answer:
          "Hayır; açılmanın doğurduğu dönme gerilimini kontrollü kesme ve yeniden birleştirmeyle düzenler.",
      },
      {
        prompt: "Altı doğrusal parçanın yalnız aralarındaki sınır sayısı?",
        answer:
          "Beş; n−1 komşuluk bağıdır, doğrudan enzim molekülü sayısı değildir.",
      },
      {
        prompt:
          "S evresinde DNA ikiye çıkınca kromozom sayısı mutlaka ikiye çıkar mı?",
        answer:
          "Hayır; sentromerler ayrılmadan kardeş kromatitler bir kromozom olarak sayılır. DNA miktarı ve kromozom sayısı farklıdır.",
      },
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 2 fiziksel PDF 38–40; OGM DNA Replikasyonu sunusu 9–17 ve video sunumu gerçek seçili 10–32; Dersler Cepte Nükleik Asitler II öğretim sayfalarıyla karşılaştırılmış yeni ileri bölümler. Eski anlatım, sorular ve görsel model korunur; soru seti özgündür.",
  },
];

const advancedItems: Item020[] = [
  [
    "DNA polimerazın yeni zinciri uzatması için primazın temel katkısı nedir?",
    "Uzatılabilir 3′ ucu olan kısa başlangıç RNA’sı oluşturmak",
    [
      "Bütün eski DNA’yı amino aside çevirmek",
      "Her durumda bütün fosfodiesterleri kalıcı koparmak",
      "Kardeş kromozomları mayoz II’de ayırmak",
      "Yeni DNA’nın bütün bazlarını tek tipe dönüştürmek",
    ],
    "Başlatma ile mevcut ucu uzatmayı ayır.",
    "Primaz RNA primeri üretir; DNA polimeraz uygun 3′ uca ekleme yapar. Primer daha sonra işlenir; bu rol ligazın son omurga bağlantısından ayrıdır.",
  ],
  [
    "Eşlenme çatalının önünde açılmaya bağlı dönme gerilimini kontrollü DNA kesme ve yeniden bağlama ile düzenleyen işlev hangisidir?",
    "Topoizomeraz işlevi",
    [
      "Ribozomun peptit sentezi",
      "Spermin kapasitasyonu",
      "Likenin fotosentezi",
      "Göbek damarında kanın taşınması",
    ],
    "Tek zincir açma ile topolojik gerilimi ayır.",
    "Topoizomerazlar omurgada kontrollü geçici işlemle dönme gerilimini yönetir. Helikaz kalıp zincirleri ayırır; her enzim aynı sorunu çözmez.",
  ],
  [
    "DNA sentezinde yeni nükleotit zincire katılırken kullanılan etkin öncül ve ayrılan ürün için uygun eşleme hangisidir?",
    "dNTP; pirofosfat",
    [
      "Yalnız amino asit; CO₂",
      "Yağ asidi; glikojen",
      "Tek serbest baz; bütün ribozom",
      "Yalnız kalsiyum; üre",
    ],
    "Trifosfat öncülünün bir kısmı zincirde kalır.",
    "DNA polimerizasyonunda deoksiribonükleozit trifosfatlar kullanılır ve pirofosfat ayrılır. Bu ayrıntı her gerçek adımı yalnız bir su çıkışına indirgemekten farklıdır.",
  ],
  [
    "Doğrusal 8.000 baz çiftlik bölgenin ortasında tek orijin var. İki çatal aynı anda zıt yönlerde sabit 200 baz çifti/saniye ile uçlara ilerliyor; başka gecikme yok. Süre nedir?",
    "20 saniye",
    ["10 saniye", "40 saniye", "80 saniye", "200 saniye"],
    "Her çatal toplamın yarısını gider.",
    "Yarım yol 4.000 baz çiftidir; 4.000/200 = 20 saniye. Çatallar paralel çalıştığından süreler toplanmaz.",
  ],
  [
    "Üç ayrı çift yönlü eşlenme kabarcığı etkin; hiçbir çatal henüz karşılaşıp sonlanmamış. Bu anda etkin çatal sayısı kaçtır?",
    "6",
    ["3", "4", "9", "12"],
    "Her etkin kabarcığın iki ilerleyen ucu vardır.",
    "3×2 = 6 çatal bulunur. Sonraki birleşmeler bu sayıyı değiştirebilir; ilk orijin sayısını bütün anlara sabit çatal sayısı saymayız.",
  ],
  [
    "Yalnız seçilen doğrusal zincir bölgesinde beş yeni parça ardışık dizilmiş. Başka çentik yok ve yalnız aralarındaki sınırlar ligazla kapanacak. Kaç sınır vardır?",
    "4",
    ["3", "5", "6", "10"],
    "Bir çizgide n parçanın arası n−1’dir.",
    "Beş parçanın dört komşu sınırı vardır. Bu sayı tamamlanacak bağlantı sayısıdır; dört farklı ligaz molekülü kullanıldığı sonucu verilmemiştir.",
  ],
  [
    "Verilen beklentiler: korunumlu model ilk turda ayrı ağır ve hafif bant; yarı korunumlu ve dağılımlı modeller ilk turda tek ara bant verir. Gerçekte tek ara bant görüldü. Hangisi uygundur?",
    "Korunumlu beklentiyle uyuşmaz; diğer ikisi bu tek turla ayırt edilmez",
    [
      "Yalnız bu veriyle iki diğer modelden biri kesin seçilir",
      "Korunumlu beklenti tam doğrulanmıştır",
      "Bütün DNA’nın protein olduğu kanıtlanır",
      "Ağır izotop bütün türlerde genom sırasını değiştirir",
    ],
    "Aynı sonucu öngören hipotezler aynı gözlemle tekleşmez.",
    "Tek ara bant korunumlu modelin verilen ayrı bant beklentisine uymaz. Yarı korunumlu ve dağılımlı ilk turda aynı beklentiyi verdiğinden ek tur veya ek deney gerekir.",
  ],
  [
    "Etiketsiz tek DNA üç kayıpsız yarı korunumlu tur geçiriyor. Yalnız ikinci turun yeni öncülleri işaretli; ilk ve üçüncü tur etiketsiz. Üçüncü tur sonunda ikinci turdan kalan işaretli tek zincir sayısı kaçtır?",
    "4",
    ["2", "8", "12", "16"],
    "İkinci tur başlamadan kaç kalıp zincir var?",
    "İlk tur sonunda dört zincir vardır; ikinci tur bunların her birine bir işaretli yeni zincir ekleyerek dört işaretli zincir oluşturur. Üçüncü turda etiketli zincirler korunur, yeni zincirler etiketsizdir; sayı dört kalır.",
  ],
  [
    "Normal diploit hücrede S evresinde DNA miktarı ikiye çıkıyor, kardeş sentromerler henüz ayrılmıyor. Hangi sonuç doğrudur?",
    "DNA artışı kromozom sayısını bu anda zorunlu ikiye çıkarmaz",
    [
      "Hücre sayısı bu anda zorunlu iki kat olur",
      "Bütün gen çeşitleri zorunlu iki katına çıkar",
      "Hücre kesin dört haploit takıma dönüşür",
      "Her kardeş kromatit başka türden olur",
    ],
    "Sentromerle kromozom sayımı ile DNA miktarını ayır.",
    "S evresi DNA’yı çoğaltarak kardeş kromatitler oluşturur. Ayrılmamış yapı kromozom sayımında tek kalabilir; hücre bölünmesi ve gen çeşidi artışı aynı olay değildir.",
  ],
  [
    "Aziz Sancar’ın DNA konusundaki temel bilimsel katkısını doğru yerleştiren seçenek hangisidir?",
    "DNA onarım mekanizmalarının, özellikle nükleotit çıkarım onarımının aydınlatılması",
    [
      "Çift sarmalın 1953’te tek başına ilk kurulması",
      "Griffith fare deneyinin 1928’de yapılması",
      "DNA polimerazın her hücrede yok edilmesi",
      "Bütün mutasyonların imkânsız olduğunun kanıtı",
    ],
    "Kopyalama ile hasar giderme süreçlerini ayır.",
    "Sancar’ın önemli katkıları DNA onarım mekanizmalarıyla ilişkilidir. Onarım, replikasyon ve ilk yapı modeli farklı bilimsel sorular ve araştırma tarihleri taşır.",
  ],
];

function question020(id: string, item: Item020, i: number): Question {
  const [prompt, correct, wrong, hint, explanation] = item;
  if (wrong.length !== 4 || new Set([correct, ...wrong]).size !== 5)
    throw new Error("FIVE_CHOICES:" + id);
  const answer = i % 5,
    options = [...wrong];
  options.splice(answer, 0, correct);
  return {
    id: `f020-bio-${id}-${i + 1}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(explanation),
    skill: `f020-bio-${id}-${i + 1}`,
  };
}
export const forge020BiologyTopics: Record<string, string> = {
  ...Object.fromEntries(data.map((d) => [d.id, d.topic])),
  "dna-replikasyonu-ileri": "detail-330",
};
export const forge020BiologyGuides: LessonGuide[] = data.map(
  ({ items: _items, topic: _topic, title: _title, ...d }) => d,
);
export const forge020BiologyLessons: Lesson[] = [
  ...data.map((d) => ({
    id: d.id,
    subjectId: "ayt-biyoloji",
    title: txt(d.title),
    minutes: d.minutes,
    objectives: d.objectives.map(txt),
    body: d.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join(" ")),
    })),
    questions: d.items.map((q, i) => question020(d.id, q, i)),
    source: txt(d.source),
    tags: ["kaynakli", "etkilesimli", "forge020"],
  })),
  {
    id: "dna-replikasyonu-ileri",
    subjectId: "ayt-biyoloji",
    title: txt("DNA eşlenmesi: ileri kanıt ve mekanizma soruları"),
    minutes: 25,
    objectives: [
      txt(
        "Primer, çatal hızı, parça sınırı, işaret kohortu ve deney kanıtını koşullarıyla çöz.",
      ),
    ],
    body: [],
    questions: advancedItems.map((q, i) =>
      question020("dna-replikasyonu-ileri", q, i),
    ),
    source: txt(forge020BiologyGuideExtensions[0].source),
    tags: ["soru-seti", "kaynakli", "forge020"],
  },
];
