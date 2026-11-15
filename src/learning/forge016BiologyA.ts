import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";
const validNumber = (x: number, min: number, max: number) =>
  Number.isFinite(x) && x >= min && x <= max;
export type HypoHormone = "trh" | "adh" | "oxy";
export type HypoBlock = "none" | "portal" | "axon" | "release";
/** A selective interruption experiment, not a whole-body concentration model. */
export function hypothalamusRoute(hormone: HypoHormone, block: HypoBlock) {
  if (
    !["trh", "adh", "oxy"].includes(hormone) ||
    !["none", "portal", "axon", "release"].includes(block)
  )
    throw new RangeError("HYPOTHALAMUS");
  const posterior = hormone !== "trh";
  const arrival = posterior ? block !== "axon" : block !== "portal";
  const release = arrival && block !== "release";
  return {
    posterior,
    arrival,
    release,
    synthesis: true,
    route: posterior ? "Akson" : "Portal kan",
    name: hormone === "trh" ? "TRH" : hormone === "adh" ? "ADH" : "Oksitosin",
    destination: posterior ? "Arka hipofiz" : "Ön hipofiz",
    output: posterior
      ? hormone === "adh"
        ? "ADH kana salımı"
        : "Oksitosin kana salımı"
      : "TRH’ye bağlı TSH salım katkısı",
    evidence: !arrival
      ? "Seçili yeni haber normal yolunda hedef bölüme ulaşamıyor. Hipotalamik sentez bu deneyde sağlamdır; önceki depo miktarı hesaplanmıyor."
      : !release
        ? "Haber hedef bölüme ulaşıyor; seçili kana salım basamağı engelli. Üretim ve ulaşma, salımla aynı olay değildir."
        : "Seçili yeni haber hedef bölüme ulaşır ve verilen sağlam salım basamağına katkı verebilir. Bu, bütün dolaşım düzeyini hesaplamaz.",
  };
}
export const pituitaryHormones = {
  gh: {
    name: "GH",
    source: "Ön hipofiz",
    target: "growth",
    targetLabel: "Büyüme dokusu",
    effect: "Büyüme ve metabolik yanıt; IGF-1 bağlantıları da önemlidir.",
  },
  prl: {
    name: "Prolaktin",
    source: "Ön hipofiz",
    target: "milk",
    targetLabel: "Meme salgı hücresi",
    effect:
      "Süt sentezinin desteklenmesi; mevcut sütün atımıyla aynı iş değildir.",
  },
  oxy: {
    name: "Oksitosin",
    source: "Hipotalamus; arka lobdan salım",
    target: "ejection",
    targetLabel: "Meme miyoepitelyal hücresi",
    effect:
      "Mevcut sütün kasılmayla kanala itilmesi; yeni süt sentezi değildir.",
  },
  adh: {
    name: "ADH",
    source: "Hipotalamus; arka lobdan salım",
    target: "kidney",
    targetLabel: "Böbrek son bölüm hedefi",
    effect:
      "Uygun koşullarda su geçirgenliği ve geri emiliminin desteklenmesi.",
  },
  tsh: {
    name: "TSH",
    source: "Ön hipofiz",
    target: "thyroid",
    targetLabel: "Tiroit folikül hücresi",
    effect:
      "T3/T4 üretim-salım yolunun uyarılması; iyot ve üretim kapasitesi ayrıca gerekir.",
  },
  acth: {
    name: "ACTH",
    source: "Ön hipofiz",
    target: "cortex",
    targetLabel: "Adrenal korteks kortizol yolu",
    effect:
      "Kortizol yolunun uyarılması; bütün adrenal ürünler aynı tek kontrol altında değildir.",
  },
  fsh: {
    name: "FSH",
    source: "Ön hipofiz",
    target: "sertoli",
    targetLabel: "Sertoli hücresi; erkek örneği",
    effect:
      "Spermatogenezin desteklenmesi; tek başına bütün süreç için yeter koşul değildir.",
  },
  lh: {
    name: "LH",
    source: "Ön hipofiz",
    target: "leydig",
    targetLabel: "Leydig hücresi; erkek örneği",
    effect:
      "Testosteron üretiminin desteklenmesi; hedef hücre ile hormon ürününü ayır.",
  },
} as const;
export type PituitaryHormone = keyof typeof pituitaryHormones;
export type PituitaryTarget =
  (typeof pituitaryHormones)[PituitaryHormone]["target"];
export function pituitaryResponse(
  hormone: PituitaryHormone,
  target: PituitaryTarget,
  receptor: boolean,
  platesOpen: boolean,
) {
  if (
    !Object.hasOwn(pituitaryHormones, hormone) ||
    !Object.values(pituitaryHormones).some((x) => x.target === target)
  )
    throw new RangeError("PITUITARY");
  const h = pituitaryHormones[hormone];
  const matches = h.target === target;
  return {
    ...h,
    matches,
    response: matches && receptor,
    posterior: hormone === "adh" || hormone === "oxy",
    evidence: !matches
      ? "Bu görev kartında seçilen hedef, hormonun verilen temel hedefiyle eşleşmiyor; özgül etki gösterilmedi."
      : !receptor
        ? "Ulaşma varsayımı sağlam; uygun hedef reseptör yanıtı engelli olduğu için normal doğrudan yanıt gösterilmiyor."
        : hormone === "gh"
          ? platesOpen
            ? "Plaklar açık: uzunlamasına büyüme olanağı vardır; sayısal boy veya tanı hesaplanmaz."
            : "Plaklar kapalı: aynı mekanizmayla uzunlamasına boy artışı beklenmez; GH’nin diğer etkileri yok sayılmaz."
          : h.effect,
  };
}
export const thyroidConditions = {
  intact: "Sağlam üretim; temel eksen",
  iodineLow: "İyot kısıtı; diğer basamaklar sağlam",
  autonomous: "Üst merkezden bağımsız artmış üretim",
  primaryLow: "Tiroid üretim kapasitesi düşük; üst merkezler sağlam",
} as const;
export type ThyroidCondition = keyof typeof thyroidConditions;
export function thyroidAxis(
  condition: ThyroidCondition,
  t4: number,
  t3: number,
) {
  if (
    !Object.hasOwn(thyroidConditions, condition) ||
    !validNumber(t4, 0, 6) ||
    !validNumber(t3, 0, 6) ||
    !Number.isInteger(t4) ||
    !Number.isInteger(t3)
  )
    throw new RangeError("THYROID");
  return {
    condition,
    t4,
    t3,
    iodineAtoms: 4 * t4 + 3 * t3,
    product:
      condition === "intact"
        ? "Temel örnek düzeyi"
        : condition === "autonomous"
          ? "Artma yönü"
          : "Azalma yönü",
    tsh:
      condition === "intact"
        ? "Temel örnek uyarısı"
        : condition === "autonomous"
          ? "Baskılanma yönü"
          : "Artma yönü",
    feedback: "Negatif geri bildirim",
    evidence:
      condition === "intact"
        ? "İleri TRH→TSH→T3/T4 uyarıları ile ürünün iki üst merkeze baskılayıcı geri dönüşü ayrı bağlantılardır."
        : condition === "autonomous"
          ? "Artış tiroid üretiminde başlıyor; sağlam geri dönüş üst merkez uyarısını baskılar. Bu örüntü tek hastalık tanısı değildir."
          : "Düşük ürünün üst merkezlere baskısı azalır; TSH artabilir. Üretim kısıtı sürerken yüksek uyarı normal ürünü garanti etmez.",
  };
}
/** Given amount flows are independent of the qualitative hormonal route controls. */
export function calciumBalance(
  pth: boolean,
  activeD: boolean,
  bone: number,
  gut: number,
  loss: number,
) {
  if (
    !validNumber(bone, 0, 5) ||
    !validNumber(gut, 0, 5) ||
    !validNumber(loss, 0, 8)
  )
    throw new RangeError("CALCIUM");
  return {
    initial: 10,
    bone,
    gut,
    loss,
    final: 10 + bone + gut - loss,
    pth,
    activeD,
    calciumRetention: pth,
    phosphateExcretion: pth,
    indirectGut: pth && activeD,
    evidence: pth
      ? activeD
        ? "PTH yön şeması: Ca geri emilimi ve fosfat atımı artabilir; bağırsak katkısı böbrekte aktif D üzerinden dolaylıdır."
        : "PTH seçili, fakat aktif D oluşum basamağı engelli: aynı dolaylı bağırsak katkısı otomatik sürmez; diğer PTH yolları ayrı kalır."
      : "Artmış PTH etkisi işaretlenmedi; bu seçim bütün bazal kalsiyum düzenlemesini sıfırlamaz.",
  };
}
export const adrenalProducts = {
  cortisol: {
    name: "Kortizol",
    region: "Korteks",
    signal: "acth",
    control: "CRH → ACTH",
    effect: "Metabolik yanıt; üst merkezlere negatif geri bildirim.",
  },
  aldosterone: {
    name: "Aldosteron",
    region: "Korteks",
    signal: "raas",
    control: "RAAS / K⁺",
    effect: "Uygun böbrekte Na⁺ geri emilimi ve K⁺ atımı desteklenir.",
  },
  catecholamine: {
    name: "Adrenalin / noradrenalin",
    region: "Medulla",
    signal: "sympathetic",
    control: "Sempatik sinirsel giriş",
    effect:
      "Organ ve reseptöre bağlı kısa süreli yanıt; tüm damarlar aynı yönde değildir.",
  },
  androgen: {
    name: "Adrenal androjenler",
    region: "Korteks",
    signal: "acth",
    control: "ACTH ile ilişkili adrenal korteks yolu",
    effect:
      "Eşeysel özelliklere katkı; gonad hormonlarının bütününün tek kaynağı değildir.",
  },
} as const;
export type AdrenalProduct = keyof typeof adrenalProducts;
export type AdrenalSignal = "acth" | "raas" | "sympathetic";
export function adrenalRoute(product: AdrenalProduct, signal: AdrenalSignal) {
  if (
    !Object.hasOwn(adrenalProducts, product) ||
    !["acth", "raas", "sympathetic"].includes(signal)
  )
    throw new RangeError("ADRENAL");
  const d = adrenalProducts[product];
  return {
    ...d,
    matched: d.signal === signal,
    feedback: product === "cortisol",
    evidence:
      d.signal === signal
        ? d.effect
        : "Seçilen giriş bu ürünün gösterilen başlıca denetim hattıyla eşleşmiyor. Bu eşleştirme deneyi, bütün ikincil etkilerin yokluğunu iddia etmez.",
  };
}
export const tissueLabels = {
  liver: "Karaciğer",
  muscle: "İskelet kası",
  fat: "Yağ dokusu",
  rbc: "Eritrosit",
} as const;
export type PancreaticTissue = keyof typeof tissueLabels;
export function pancreasTransfer(
  hormone: "insulin" | "glucagon",
  reserve: number,
  requested: number,
  responsive: boolean,
  tissue: PancreaticTissue,
) {
  if (
    !["insulin", "glucagon"].includes(hormone) ||
    !validNumber(reserve, 0, 50) ||
    !validNumber(requested, 0, 10) ||
    !Object.hasOwn(tissueLabels, tissue)
  )
    throw new RangeError("PANCREAS");
  const actual = responsive
    ? Math.min(requested, hormone === "insulin" ? 20 : reserve)
    : 0;
  return {
    hormone,
    reserve,
    requested,
    actual,
    blood: 20 + (hormone === "glucagon" ? actual : -actual),
    liver: reserve + (hormone === "insulin" ? actual : -actual),
    total: 20 + reserve,
    direction:
      hormone === "insulin"
        ? "Kandan karaciğer deposuna"
        : "Karaciğer deposundan kana",
    tissueEvidence:
      tissue === "liver"
        ? "Karaciğer: GLUT2 ile taşıma ve insülinle metabolizma-depolama düzenlemesi ayrıdır; kas-yağ GLUT4 şeması değildir."
        : tissue === "rbc"
          ? "Eritrosit: glikoz girişi kas-yağ GLUT4 düzenlemesiyle aynı biçimde insüline bağımlı değildir."
          : tissue === "muscle"
            ? "Kas: insüline duyarlı GLUT4 alımı önemlidir; glukagon kas glikojenini doğrudan kana boşaltan yol değildir."
            : "Yağ dokusu: insüline duyarlı GLUT4 alımı desteklenebilir; bütün hücreler aynı taşıyıcıyla çalışmaz.",
    evidence: !responsive
      ? "Seçili karaciğer aktarım yanıtı bu deneyde engelli; hesaplanan aktarım sıfır. Bu düğme bütün diyabet mekanizmalarını simüle etmez."
      : hormone === "glucagon" && requested > reserve
        ? "İstenen miktar depoyu aşıyor; yalnız mevcut depo kadar aktarılır. Modelde başka glikoz üretim yolu yoktur."
        : "Verilen tek aktarım yolunda iki havuz arasındaki miktar korunur. Bunlar glikoz eşdeğeri birimleridir; gerçek kan derişimi değildir.",
  };
}
const mod24 = (x: number) => ((x % 24) + 24) % 24;
export function pinealWindow(
  start: number,
  end: number,
  shift: number,
  hour: number,
  nightLight: boolean,
) {
  if (
    ![start, end, hour].every(
      (x) => validNumber(x, 0, 23) && Number.isInteger(x),
    ) ||
    !validNumber(shift, -6, 6) ||
    !Number.isInteger(shift)
  )
    throw new RangeError("PINEAL");
  const duration = mod24(end - start),
    from = mod24(start + shift),
    to = mod24(end + shift),
    inside = duration > 0 && mod24(hour - from) < duration;
  return {
    from,
    to,
    duration,
    hour,
    inside,
    nightLight,
    signalWindow: inside && !nightLight,
    toyArea: duration * 2,
    evidence:
      duration === 0
        ? "Başlangıç ve bitiş aynı: bu tanımlı pencerede süre sıfırdır; tam 24 saat karanlık anlamı verilmedi."
        : inside
          ? nightLight
            ? "Seçilen saat pencere içinde, ışık baskısı koşulu açık. Gerçek melatonin miktarı veya tam baskı yüzdesi hesaplanmıyor."
            : "Seçilen saat karanlık penceresinde; bu, yüksekliğin gerçek ölçümü değil zamanlama modelidir."
          : "Seçilen saat tanımlı karanlık penceresinin dışında. İç saatin bütün fizyolojisi tek pencereden ibaret değildir.",
  };
}

type Unit = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: LessonGuide["recall"];
  items: [string, string, string[], string, string][];
  source: string;
};
const data: Unit[] = [
  {
    id: "endokrin-hipotalamus",
    topic: "detail-291",
    title: "Hipotalamus: sinirden hormona uzanan düzenleme",
    minutes: 32,
    objectives: [
      "Hormonun kaynağını, taşıma yolunu ve reseptör taşıyan hedefini ayır.",
      "Ön hipofizin portal kan yolunu arka hipofizin akson yolundan ayır.",
      "Osmotik değişimi ve geri bildirim döngüsünü koşullarıyla açıkla.",
    ],
    sections: [
      {
        title: "Hormon nedir, neden her hücre aynı yanıtı vermez?",
        paragraphs: [
          "Endokrin hücrelerin kana verdiği hormonlar, dolaşımla birçok yere ulaşabilen kimyasal habercilerdir. Bir dokunun bu habere yanıt vermesi, uygun reseptör ve hücre içi yanıt düzeneklerinin bulunmasına bağlıdır. Bu yüzden hormonun kanda bulunması, bütün hücrelerin aynı işi yapması anlamına gelmez. Önce mesajı üreten hücreyi, sonra taşındığı ortamı, en son yanıt veren hedefi belirle.",
          "Peptit yapıdaki birçok hormon zar reseptörleri üzerinden, steroidler ve tiroid hormonları ise hücre içi reseptörlerle etkili olur. Bu ayrım hormonun kimyasal yapısı, çözünürlüğü ve hücredeki mekanizmayla ilişkilidir. Bütün aminoasit türevi hormonları tek sınıfa koyma: adrenalin ile tiroid hormonları aynı reseptör konumuna sahip değildir. Hormon etkisi tek bir evrensel eşikte ya hep ya hiç olmak zorunda değildir.",
        ],
      },
      {
        title: "Kanallı bez, kanalsız bez ve karma organ",
        paragraphs: [
          "Ekzokrin salgı, bir kanalla bir yüzeye veya organ boşluğuna taşınır; tükürük ve pankreasın sindirim salgısı buna örnektir. Endokrin salgı kan dolaşımına katılır; hipofiz hormonları bu gruptadır. Kanalın bulunması yalnız bir çizim ayrıntısı değildir: salgının nereye ulaştığını ve hangi işi yapacağını belirler. Aynı organ iki görev taşıyorsa organın bütün hücrelerini aynı tür sayma.",
          "Pankreasın adacıkları kana hormon verirken ekzokrin bölümü sindirim kanalına salgı gönderir; karma bez sözü bu iki örgütlenmenin birlikte oluşunu anlatır. Hipotalamik bazı nöronlar ise sinir hücresi olmalarına rağmen hormon sentezleyebilir. Sinir ve endokrin düzenleme arasında aşılmaz bir duvar yoktur. Timüsün bağışıklık ve T lenfosit gelişimiyle ilişkili salgıları da yalnız tek bezin bütün düzenlemeyi yaptığı düşüncesini sınırlar.",
        ],
      },
      {
        title: "Hipotalamus bilgileri nasıl birleştirir?",
        paragraphs: [
          "Ara beynin hipotalamus bölgesi, iç ortamdan ve sinir ağlarından gelen bilgileri birleştirerek homeostatik yanıtları düzenler. Isı, su dengesi, açlık-tokluk, otonom yanıtlar ve endokrin denetim birbiriyle bağlantılıdır. Burada bir reseptörden gelen bilgi, davranışsal yanıtı da salgı değişimini de destekleyebilir. Susama davranışı ile böbrekte su korunması aynı sonuca katkı veren iki ayrı yoldur.",
          "Bir örnekte yalnız su kaybı verilmişse önce çözünen miktarının sabit tutulup tutulmadığını sor. Yoğunlaşma yönündeki değişim, osmotik düzenleme ve ADH salımını destekleyebilir. Bu ilişkiyi bütün ADH değişimlerinin tek nedeni gibi genelleme; dolaşım hacmi ve başka girdiler de önemlidir. Ayrıca ADH doğrudan bütün susama davranışını yapan tek sinyal değildir: ortak hipotalamik düzenlemenin farklı çıktıları vardır.",
        ],
      },
      {
        title: "Ön hipofize giden yol: portal kan",
        paragraphs: [
          "Hipotalamusun salgılatıcı ve engelleyici düzenleyicileri, hipofiz portal damarlarıyla ön hipofize ulaşır. RH salgılatıcı, IH engelleyici etkiyi adlandırır; her birinin hedef hücresi ve ilişkili hormonu ayrıdır. Örneğin TRH, ön hipofizde TSH yolunu uyarır; TSH sonra tiroid bezini etkiler. Bu sıralamada hipotalamik haberci ile ön hipofizin ürettiği hormon aynı molekül değildir.",
          "Şemada portal damar yolu kesildiğinde düzenleyici haberin ön loba normal ulaşması bozulur; bu, bütün vücut hormonlarının anında sıfırlandığı anlamına gelmez. Bazı ön hipofiz salgıları baskılayıcı denetim altında olduğundan engelleyici sinyalin kaybı da önem taşır. “Hipotalamus ön lobu her zaman yalnız artırır” ezberi bu nedenle yetmez. Yolun yönünü, sinyalin etkisini ve hedefteki reseptörü birlikte izle.",
        ],
      },
      {
        title: "Arka hipofize giden yol: akson ve sinir ucu",
        paragraphs: [
          "ADH ve oksitosin hipotalamik nöronlarda sentezlenir; akson boyunca arka hipofizdeki sinir uçlarına taşınır. Bu uçlarda depolanan hormonlar uygun sinirsel etkinlikte kana salınır. Böylece sentez yeri hipotalamus, depolama ve kana salım yeri arka hipofiz olarak ayrılır. Ön loba portal kanla giden düzenleyicilerin rotasıyla aynı çizgiyi kullanmak iki mekanizmayı karıştırır.",
          "Bir deneyde hipotalamik sentez sağlamken arka lobdan salım engellenmiş olabilir. Bu koşulda “hormon sentezlenmiyor” sonucu zorunlu değildir; üretim ile kana çıkış ayrı basamaklardır. Arka hipofiz için depo ve salım demek, kendi endokrin hücrelerinde bu iki hormonu sentezlediğini söylemek değildir. Etkileşimde kesintiyi ayrı seçerek hangi basamağın önce durduğunu ve hangisinin hâlâ mümkün kaldığını kontrol et.",
        ],
      },
      {
        title: "ADH su yaratmaz, böbrekte suyu korumaya katkı verir",
        paragraphs: [
          "ADH, uygun koşullarda böbreğin özellikle son nefron bölümlerinde su geçirgenliğini ve suyun geri emilimini artıran mekanizmaları destekler. Sonuç, aynı gelen su için daha az suyun idrarla kaybedilmesi olabilir. Bu açıklamada suyun kaynağı filtrattır; hormon yeni su üretmez. İdrar miktarı ile yoğunluğu hakkında çıkarım yaparken başlangıç koşullarını ve böbreğin yanıt verebilirliğini koru.",
          "Örneğin yalnız seçili son bölüme gelen 10 su biriminin 8 birimi geri emilirse 2 birim dışarı çıkar. Aynı deneyde geri emilim 9 birime çıktığında çıkış 1 birimdir. Bunlar bütün böbreğin gerçek günlük litreleri veya gerçek hormon dozu değildir; verilen bir bölmenin kütle bilançosudur. ADH eksikliği ile hedef böbreğin ADH’ye yanıt vermemesi de aynı başlangıç kusuru değildir; ikisi su dengesi açısından benzer sonuçlar doğurabilir.",
        ],
      },
      {
        title: "İleri uyarı oku ile geri bildirim döngüsünü ayır",
        paragraphs: [
          "Bir hormonun sonraki bezi uyarması ileri yönde bir bağlantıdır. Geri bildirim olması için sonucun daha önceki denetleyici basamağı geri etkilemesi gerekir. Tiroid hormonlarının hipotalamus ve ön hipofiz salgılarını baskılaması negatif geri bildirim örneğidir. Şemada yalnız TRH’den TSH’ye bir artı oku görmek, tek başına kapalı bir pozitif geri bildirim döngüsü göstermez.",
          "Doğum örneğinde rahim ağzının gerilmesi sinirsel bilgi oluşturur; oksitosin rahim kasılmasını destekler, kasılma gerilmeyi artırarak döngüyü güçlendirebilir. Bu pozitif geri bildirim doğumla ilgili belirli bir bağlamda ve sonlandırıcı olayla ele alınır. “Pozitif iyidir, negatif kötüdür” biçiminde değer yargısı kurma: adlar değişimin yönünü anlatır. Döngünün çıktısını, geri dönüşünü ve durma koşulunu mutlaka işaretle.",
        ],
      },
      {
        title: "Bir sistemi incelerken dört soruluk yol haritası",
        paragraphs: [
          "Yeni bir endokrin sorusunda önce uyaranı ve ölçülen değişkeni bul: su oranı mı, kandaki hormon mu, hedef dokunun yanıtı mı? Sonra sentez, taşınma, depo ve salım basamaklarını sırala. Üçüncü adımda hedef reseptörü ve doku koşulunu denetle. Son adımda çıktının başlangıç değişimini azaltıp azaltmadığına ve hangi yoldan geri döndüğüne bak.",
          "Bu yöntem, tek bir hormon adını ezberlemekten daha çok duruma aktarılır. Örneğin kandaki hormon azlığından yalnız başına sentez kusuru, fazla bulunmasından da bütün hedeflerde aşırı etki sonucu çıkarılmaz; salım, parçalanma ve hedef yanıtı ayrıdır. Modeldeki yol kesintisi ve açıklamalar öğrenme kanıtıdır; keşfe basmak sınav sorusunu doğru çözme veya ustalık kaydı oluşturmaz. Kendi gerekçeni kurup kaynak-hedef zinciriyle karşılaştır.",
        ],
      },
      {
        title: "Hormonun etkisi yalnız üretime değil ömrüne de bağlıdır",
        paragraphs: [
          "Hormonlar genellikle çok düşük derişimlerde etkili olabilir; kandaki miktar salgılanma, dağılım ve uzaklaştırılmanın ortak sonucudur. Hedef hücrelerde, karaciğerde ve hormon türüne göre böbrek gibi organlarda işlenip uzaklaştırılabilirler. Bu yüzden aynı sentez hızında hormonun parçalanma hızı değişirse dolaşımdaki miktar değişebilir. Haberci molekülün kendisi enzim gibi bütün tepkimenin katalizörü olmak zorunda değildir; hedefteki sinyal sistemini düzenler.",
          "Endokrin hücreler yalnız adı bez olan organlarda bulunmaz; mide, ince bağırsak, böbrek, karaciğer ve pankreas gibi organların ilgili hücreleri de hormonal iletişime katılabilir. Genel olarak birçok endokrin yanıt sinirsel iletime göre daha yavaş başlayıp daha uzun sürebilir, ancak bütün hormonlar için değişmez hız kuralı kurulmaz: katekolaminlerin hızlı etkileri buna dikkat gerektirir. Birden çok hormon aynı hedefte aynı veya karşıt yönlü katkılar oluşturabilir; tek hormon tek sonuç ezberi yeterli değildir.",
        ],
      },
      {
        title: "Su fazlalığı, dolaşım kaybı ve ADH’nin diğer bağlamı",
        paragraphs: [
          "Su alımıyla plazma seyrelme yönünde değiştiğinde, diğer koşullar uygunsa hipotalamik ADH yanıtı azalabilir. Son nefron bölümlerinde daha az su korunması, daha fazla ve daha seyreltik idrar yönünü destekler. Susuzluk veya aşırı terleme gibi su kaybı örneklerinde ise ters yön görülebilir. Aynı anda çözünen kaybı veya dolaşım değişimi verilirse yalnız su sözcüğüne bakarak hüküm verme; oran ve ilgili algılayıcılar birlikte okunur.",
          "ADH’nin vazopressin adı damar etkisine de gönderme yapar: belirgin dolaşım hacmi veya basınç kaybı bağlamında artan ADH, uygun reseptörler üzerinden damar daralmasına katkı sağlayabilir. Bu etki böbrekteki su geçirgenliğiyle aynı hücresel hedef değildir. ADH’nin azlığı ile böbreğin ona yanıt vermemesi şekersiz diyabetin farklı mekanizmaları olabilir; insülin-glikoz diyabetiyle eş anlamlı değildir. Tek bir idrar miktarı gözlemi hangi basamağın bozuk olduğunu kesin belirlemez.",
        ],
      },
    ],
    examples: [
      {
        title: "Üretilmiş ama salınmamış",
        prompt:
          "Bir deneyde hipotalamik ADH sentezi ve aksonla taşınması sürüyor; arka hipofizden kana salım seçici olarak engelleniyor. Hangi basamak bozulmuştur?",
        strategy: "Üç fiili ayrı konumlandır.",
        steps: [
          {
            label: "Sentezi yerleştir",
            explanation: "ADH hipotalamik nöronda yapılır.",
            expression: "hipotalamus",
          },
          {
            label: "Taşımayı koru",
            explanation: "Verilen koşul aksonla taşınmayı engellemiyor.",
            expression: "akson → uç",
          },
          {
            label: "İlk kesintiyi bul",
            explanation: "Depodaki hormonun kana çıkışı engellidir.",
            expression: "salım kesintisi",
          },
        ],
        answer: "Kana salım bozulmuştur; sentez bozukluğu zorunlu değildir.",
        check: "Üretim sağlam bilgisi soruda açıkça verilmiştir.",
        pitfall: "Düşük kan düzeyini her zaman üretim yokluğu sayma.",
      },
      {
        title: "Portal yolu doğru izle",
        prompt:
          "TRH hipotalamustan ön hipofize gidip TSH salımını uyarıyor. TRH ve TSH hangi sırada hangi taşıma yolunu kullanır?",
        strategy: "İki farklı molekülün kaynağını yaz.",
        steps: [
          {
            label: "TRH kaynağı",
            explanation: "TRH hipotalamik düzenleyicidir.",
            expression: "hipotalamus",
          },
          {
            label: "İlk yolu seç",
            explanation: "Ön loba normal ulaşım portal kanladır.",
            expression: "portal kan → ön lob",
          },
          {
            label: "İkinci salgıyı ayır",
            explanation: "Ön lobun TSH’si genel dolaşımla tiroide gider.",
            expression: "TSH → kan → tiroid",
          },
        ],
        answer: "TRH portal kanla ön loba; TSH genel kanla tiroide gider.",
        check: "Arka lob akson yolunu bu sıraya ekleme.",
        pitfall: "TRH’yi TSH’nin başka adı sanma.",
      },
      {
        title: "Sabit çözünen, azalan su",
        prompt:
          "Bir kapta 100 çözünen birimi ve 100 su birimi var. Yalnız 20 su birimi kayboluyor. Çözünen/su oranı kaç olur?",
        strategy: "Payı sabit tut, yeni paydayı hesapla.",
        steps: [
          {
            label: "Başlangıcı yaz",
            explanation: "Başlangıç oranı birdir.",
            expression: "100/100=1",
          },
          {
            label: "Kaybı uygula",
            explanation: "Yeni su miktarı 80 birimdir.",
            expression: "100−20=80",
          },
          {
            label: "Yeni oranı kur",
            explanation: "Yoğunlaşma yönünde değişim olur.",
            expression: "100/80=1,25",
          },
        ],
        answer: "1,25; başlangıca göre %25 artış.",
        check:
          "Birimler varsayımsaldır; gerçek plazma osmolalitesi hesaplanmıyor.",
        pitfall: "Su %20 azaldığı için oran da yalnız %20 artar deme.",
      },
      {
        title: "Su bilançosunu kapat",
        prompt:
          "Seçili son böbrek bölümüne 10 su birimi geliyor. İlk durumda 8, ikinci durumda 9 birim geri emiliyor. İki çıkışı karşılaştır.",
        strategy: "Gelen=geri emilen+çıkan eşitliğini kullan.",
        steps: [
          {
            label: "İlk çıkış",
            explanation: "Geri emilmeyen bölüm dışarı çıkar.",
            expression: "10−8=2",
          },
          {
            label: "İkinci çıkış",
            explanation: "Aynı girişte daha çok geri emilim vardır.",
            expression: "10−9=1",
          },
          {
            label: "Değişimi yorumla",
            explanation:
              "Çıkış bir birim ve başlangıca göre yarı yarıya azalır.",
            expression: "2→1; %50 azalma",
          },
        ],
        answer: "Çıkışlar 2 ve 1 su birimi; su korunmuştur.",
        check: "Bu sayılar gerçek günlük toplam böbrek miktarları değildir.",
        pitfall: "ADH’nin bir birim su ürettiğini söyleme.",
      },
    ],
    recall: [
      {
        prompt: "ADH’nin sentez ve salım yerleri nerelerdir?",
        answer: "Hipotalamusta sentez; arka hipofizde depolama ve kana salım.",
      },
      {
        prompt: "RH/IH ön loba normalde nasıl ulaşır?",
        answer:
          "Hipofiz portal kan dolaşımıyla; arka lob akson hattıyla karıştırılmaz.",
      },
      {
        prompt: "Bir artı ok neden tek başına pozitif geri bildirim değildir?",
        answer:
          "Çıktıdan önceki denetleyiciye geri dönüş içeren güçlendirici döngü de gerekir.",
      },
      {
        prompt: "Hormon kana ulaşınca bütün dokular neden aynı yanıtı vermez?",
        answer:
          "Uygun reseptör, hücre içi mekanizma ve doku koşulları farklıdır.",
      },
    ],
    items: [
      [
        "İnsanda ADH için sentez ve kana salım yerlerini doğru eşleyen seçenek hangisidir?",
        "Hipotalamik nöronda sentez; arka hipofizden kana salım",
        [
          "Arka hipofizde sentez; tiroidden salım",
          "Ön hipofizde sentez; portal damarda sentez",
          "Böbrekte sentez; hipotalamustan salım",
          "Pankreasta sentez; arka hipofizde yıkım",
        ],
        "Sentez, depo ve salım fiillerini ayır.",
        "ADH hipotalamik nöronlarda sentezlenip aksonla arka loba taşınır; orada depolanır ve sinir uçlarından kana verilir. Arka lobun salım yeri olması onu sentez yeri yapmaz.",
      ],
      [
        "Hipotalamik TRH’nin ön hipofize normal ulaşma yolu hangisidir?",
        "Hipofiz portal kan dolaşımı",
        [
          "Arka hipofize uzanan ADH aksonu",
          "Pankreas kanalı",
          "Nefronun toplama kanalı",
          "Soluk borusunun iç yüzeyi",
        ],
        "Ön loba giden düzenleyicinin taşıma ortamını düşün.",
        "TRH, hipotalamustan ön hipofize portal kanla ulaşan düzenleyicidir. ADH ve oksitosinin arka loba aksonla taşınması farklı bir yol ve farklı moleküller için geçerlidir.",
      ],
      [
        "Bir hormon dolaşımla iki dokuya ulaşıyor. Yalnız birinde uygun reseptör ve yanıt mekanizması var. Diğer koşullar aynıysa hangi çıkarım uygundur?",
        "Doğrudan özgül yanıt uygun reseptörlü dokuda beklenir",
        [
          "Her iki doku zorunlu aynı yanıtı verir",
          "Hormon kana geçtiği için reseptör gereksizdir",
          "Reseptörsüz doku hormonu mutlaka sentezler",
          "İki dokunun bütün genleri mutlaka aynıdır",
        ],
        "Taşınma ile hedef olmayı ayır.",
        "Dolaşımda bulunma tek başına her hücreyi hedef yapmaz. Uygun reseptör ve hücre içi yanıt sistemi doğrudan özgül etki için gereklidir; buradan dokuların tüm genleri veya hormon sentezi hakkında sonuç çıkmaz.",
      ],
      [
        "Bir kapta 100 çözünen birimi ve 100 su birimi vardır. Yalnız 20 su birimi kaybolur; çözünen kaybı yoktur. Yeni çözünen/su oranı kaçtır?",
        "1,25",
        ["0,80", "1,00", "1,20", "2,00"],
        "Pay sabitken yeni payda 80 olur.",
        "Başlangıçta 100/100=1 iken yeni durumda 100/(100−20)=1,25 olur. Su kaybının yüzdesi ile orandaki artışın yüzdesi aynı değildir; verilenler varsayımsal miktarlardır.",
      ],
      [
        "Seçili böbrek bölümüne 10 su birimi gelir. Geri emilim 8 birimden 9 birime çıkıyor; başka giriş veya çıkış yok. İdrara geçen su miktarı nasıl değişir?",
        "2 birimden 1 birime iner",
        [
          "8 birimden 9 birime çıkar",
          "1 birimden 2 birime çıkar",
          "10 birimden 19 birime çıkar",
          "Her iki durumda da 10 birimdir",
        ],
        "Gelen sudan geri emileni çıkar.",
        "İlk çıkış 10−8=2, ikinci çıkış 10−9=1 birimdir. Bu kütle bilançosu suyun yeniden vücuda kazandırılmasını gösterir; hormonun yeni su üretmesini veya bütün böbreğin günlük hacmini göstermez.",
      ],
      [
        "Hipotalamik ADH sentezi ve aksonla taşınma sağlamken yalnız arka hipofizden kana salım engelleniyor. Hangi sonuç bu koşulla uyumludur?",
        "Sentez sürerken kana verilen ADH azalabilir",
        [
          "Hipotalamik sentez kesin durmuştur",
          "ADH artık ön hipofizde üretilir",
          "Böbrek kesin yeni ADH üretir",
          "Bütün hormonlar aynı anda sıfırlanır",
        ],
        "Engellenen basamağı verilen sağlam basamaklardan ayır.",
        "Üretim ve taşıma soruda sağlamdır; bozulan basamak kana çıkıştır. Bu nedenle depoya ulaşan hormon bulunabilirken dolaşıma salım azalabilir. Tüm hormonlar veya başka organlarda sentez hakkında zorunlu sonuç yoktur.",
      ],
      [
        "TRH ön hipofizde TSH salımını uyarıyor. Yalnız bu ileri bağlantı verilmişken hangisi söylenebilir?",
        "Bir ileri uyarı bağlantısı vardır; kapalı pozitif geri bildirim henüz gösterilmemiştir",
        [
          "Kesin kapalı pozitif geri bildirim vardır",
          "TSH’nin geri dönüş etkisi mutlaka artırıcıdır",
          "Negatif geri bildirim biyolojik olarak olanaksızdır",
          "TRH ile TSH aynı moleküldür",
        ],
        "Geri bildirim için sonucun önceki basamağa dönüşünü ara.",
        "TRH→TSH oku ileri yönde uyarıyı gösterir. Kapalı geri bildirim için çıktının önceki denetleyiciyi geri etkilemesi gerekir; yalnız bir artı ok geri dönüşün yönünü veya varlığını kanıtlamaz.",
      ],
      [
        "Rahim ağzındaki gerilme oksitosin salımını artırır; oksitosin kasılmayı, kasılma da gerilmeyi artırır. Bu doğum bağlamındaki döngü nasıl adlandırılır?",
        "Pozitif geri bildirim",
        [
          "Yalnız filtrasyon",
          "Kapalı döngü içermeyen bir kanal",
          "Negatif geri bildirimin zorunlu örneği",
          "DNA eşlenmesi",
        ],
        "Çıktının başlangıç değişimini güçlendirip güçlendirmediğine bak.",
        "Kasılmanın daha fazla gerilmeyi desteklemesi başlangıç uyarısını güçlendirir ve kapalı pozitif döngü oluşturur. Doğum gibi sonlandırıcı bağlam önemlidir; pozitif sözcüğü iyi veya kötü değer yargısı değildir.",
      ],
      [
        "Aşağıdaki örneklerden hangisi ekzokrin salgıyı gösterir?",
        "Pankreas sindirim salgısının kanalla ince bağırsağa ulaşması",
        [
          "İnsülinin adacıktan kana verilmesi",
          "TSH’nin ön hipofizden kana verilmesi",
          "ADH’nin arka hipofizden kana verilmesi",
          "Tiroksinin dolaşıma katılması",
        ],
        "Salgının kanal mı kan mı kullandığını izle.",
        "Ekzokrin salgı bir yüzey veya organ boşluğuna kanal yoluyla taşınır. Pankreasın sindirim salgısı bu örnektir; insülinin kana verilmesi aynı organın endokrin işlevini gösterir.",
      ],
      [
        "ADH etkisiyle ilgili hangi açıklama uygundur?",
        "Uygun böbrek yanıtı varsa su geri emiliminin artmasına katkı verebilir",
        [
          "Her koşulda yeni su atomları üretir",
          "Bütün susama davranışını tek başına ve doğrudan yapar",
          "Yalnız hipofizde glikoz depolar",
          "Her hücrede aynı tek eşikle ya hep ya hiç çalışır",
        ],
        "Su dengesi, hedef yanıtı ve davranış aynı basamak değildir.",
        "ADH, uygun böbrek koşullarında su geçirgenliği ve geri emilimini düzenleyerek su kaybını azaltabilir. Su yaratmaz; susama, dolaşım koşulları ve hedef duyarlılığı ayrıca değerlendirilir.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Konu Özeti, Bölüm 1, PDF 25–27; OGM Dersler Cepte, Endokrin Sistem II, PDF 10–16. Kaynaklarla karşılaştırılmış özgün anlatım, şema ve öğretim soruları.",
  },
  {
    id: "endokrin-hipofiz",
    topic: "detail-292",
    title: "Hipofiz: hormonun kaynağı, hedefi ve etkisi",
    minutes: 32,
    objectives: [
      "Ön lob sentezi ile arka lob depo ve salımını ayır.",
      "Büyüme, süt üretimi-atımı ve gonad hedeflerini doğru eşleştir.",
      "Hedef reseptörü ve gelişim döneminin etkiyi nasıl değiştirdiğini açıkla.",
    ],
    sections: [
      {
        title: "Küçük bez, farklı kökenli iki bölüm",
        paragraphs: [
          "Hipofiz beynin altında hipotalamusla bağlantılıdır; ön ve arka lob aynı görünümün iki eşdeğer hormon fabrikası değildir. Ön lobun endokrin hücreleri kendi hormonlarını sentezler. Arka lob ise hipotalamik nöronların uzantılarıyla ilişkilidir; ADH ve oksitosinin depolanıp kana salınmasına katılır. Bez adından önce bölüm ve hücre türünü belirlemek sonraki eşleştirmeleri kolaylaştırır.",
          "Ön lob için hipotalamustan gelen portal kanla düzenleme, arka lob için aksonla taşıma ve sinir ucundan salım düşün. “Hipofizden salgılanır” sözü sentez yerini tek başına açıklamaz. Hipofiz önemli bir düzenleyicidir fakat hipotalamus, hedef bezlerin geri bildirimi ve başka sinirsel-metabolik girdilerden bağımsız mutlak bir yönetici değildir. Kontrol ağını tek yönlü emir zincirine indirme.",
        ],
      },
      {
        title: "Tropik hormon, doğrudan etki ve geri dönüş",
        paragraphs: [
          "TSH tiroidin foliküler hormon yolunu, ACTH adrenal korteksin özellikle kortizol yolunu düzenleyen tropik hormon örnekleridir. FSH ve LH gonadlarda farklı hücre ve süreçleri etkiler. Hedef bezin ürettiği hormonla onu uyaran hipofiz hormonu ayrı moleküllerdir. TSH’nin yükselmesi ile tiroksinin yükselmesi, üretim kapasitesi veya iyot kısıtında aynı şey olmayabilir.",
          "GH ve prolaktin de ön lob hormonlarıdır; bunları yalnız başka bir endokrin beze emir veren tek tip hormon gibi anlatmak eksik kalır. GH’nin doğrudan metabolik etkileri ve IGF-1 aracılı büyüme ilişkileri vardır; prolaktin meme bezinde süt sentezini destekler. Bir hedef hormonun önceki merkezleri baskılaması negatif geri bildirimdir. ACTH’yi bütün böbreküstü salgılarının tek denetleyicisi saymak bu ayrımları siler.",
        ],
      },
      {
        title: "GH etkisini yaş ve büyüme plağıyla birlikte oku",
        paragraphs: [
          "Büyüme hormonu protein sentezi, metabolizma ve büyüme süreçleriyle ilişkilidir. Karaciğerde ve başka dokularda IGF-1 yoluyla oluşan yanıtlar uzunlamasına büyümeye katkı verir. Ancak aynı hormon değişiminin sonucu gelişim dönemine ve dokuların durumuna bağlıdır. Uzun kemiklerin epifiz plakları açıksa uzunlamasına büyüme potansiyeli vardır; plaklar kapandıktan sonra aynı yolu boy uzaması diye genelleme.",
          "Çocuklukta aşırı GH etkisiyle ilişkili aşırı uzunlamasına büyüme gigantizm; yetişkinde plaklar kapalıyken el, ayak ve yüz gibi bölgelerde büyüme-değişim akromegali bağlamında öğretilir. Bunlar tek fotoğraf veya yalnız uzun boyla kişiye tanı koyma kuralları değildir. Çocukluk büyüme geriliğinin de tek nedeni GH eksikliği değildir. Genetik yapı, beslenme ve diğer hormonlar değerlendirilmeden tek nedenli sonuç kurulmaz.",
        ],
      },
      {
        title: "Süt sentezi ile süt atımı aynı iş değildir",
        paragraphs: [
          "Prolaktin meme bezinin salgı hücrelerinde süt sentezini ve sürdürülmesini destekler. Oksitosin, süt bezlerindeki miyoepitelyal hücrelerin kasılmasına katkı vererek mevcut sütün kanallara itilmesini sağlar. Böylece aynı organ içinde iki farklı hedef hücre ve iki farklı iş vardır. “Süt salgısı” ifadesiyle karşılaştığında bunun üretim mi yoksa atım mı anlamına geldiğini ayrıca aç.",
          "Emme uyaranı sinirsel yollarla hipotalamik düzenlemeyi etkileyebilir; bu, hormonal yanıtın sinir sistemiyle bütünleşmesine örnektir. Prolaktin ön lobda sentezlenir; oksitosin hipotalamusta sentezlenip arka lobdan salınır. Atımın azalması zorunlu olarak sütün hiç sentezlenmediğini göstermez. İki basamağı ayrı inceleyen deney, yalnız organdaki toplam sonucu izleyen deneyden daha açıklayıcıdır.",
        ],
      },
      {
        title: "FSH ve LH: erkek gonadında farklı hücreler",
        paragraphs: [
          "Erkek üreme sisteminde FSH, Sertoli hücreleri üzerinden spermatogenezin desteklenmesiyle; LH, Leydig hücrelerinde testosteron üretimiyle ilişkilidir. Hücre, hormon ve üreme hücresi terimleri aynı düzeyde değildir. Leydig hücresi bir hormon değil hedef hücredir; testosteron bir sperm değil steroid hormondur. Önce FSH ve LH’nin hedeflerini ayrı yaz, sonra süreçler arasındaki iş birliğini kur.",
          "Spermatogenez yalnız FSH adını ezberleyerek bütünüyle açıklanmaz; testosteron ve uygun doku koşulları da önemlidir. LH uyarısı ile dolaşımdaki testosteron arasında üretim kapasitesi ve geri bildirim ilişkileri bulunur. Bu ünite yol eşleştirmesini öğretir; tek hormon ölçümünden doğurganlık garantisi vermez. Etkileşimdeki erkek gonadı hedef kartı bu sınırlı bağlamla sunulur; kadın hedefleri sonraki bölümde ayrıca ayrılır.",
        ],
      },
      {
        title: "Kadında folikül gelişimi, ovulasyon ve luteal işlev",
        paragraphs: [
          "Kadın üreme sisteminde FSH folikül gelişimi ve foliküler hücre işlevlerini destekler. LH ovulasyon ve korpus luteum oluşumu-işleviyle ilişkili önemli bir düzenleyicidir. Bu süreçlerin zamanlaması hipotalamus, hipofiz ve gonad hormonlarının birlikte oluşturduğu döngüye bağlıdır. İnsan dişide FSH etkisini “puberteden sonra sıfırdan yeni oositlerin sürekli üretilmesi” biçiminde anlatma.",
          "Oositin önceden kurulmuş gelişim dizisi içinde olgunlaşması ile yeni eşey hücresi soyunun ilk kez oluşması farklı olaylardır. Östrojen ve progesteronun geri etkileri de döngünün evresine göre birlikte okunmalıdır. Her geri dönüşü yalnız sabit tek negatif okla açıklamak, belirli evredeki pozitif geri bildirim ilişkisini kaçırabilir. Buradaki amaç ayrıntılı döngü ünitesinin yerini almak değil, hedef hücre ve süreç adlarını doğru bağlamaktır.",
        ],
      },
      {
        title: "ADH ve oksitosini arka lobun kendi üretimi sanma",
        paragraphs: [
          "ADH’nin suyun böbrekte korunmasına katkısı ve oksitosinin rahim kasılması-süt atımı etkileri farklı hedeflere aittir. Her ikisinin sentezi hipotalamik nöronlarda, depo ve kana salımı arka hipofizde gerçekleşir. Arka lob hasarı veya salım kesintisi sentezin normal olabilmesiyle çelişmez; süreçteki yerler farklıdır. Bu ayrım kaynağı, depoyu ve son hedefi tek kutuda toplamayı önler.",
          "Ön hipofizden ADH yapıldığı veya oksitosinin böbrek su dengesinin başlıca hormonu olduğu eşleştirmeler yanlıştır. ADH ile ilişkili su dengesizliğinde hormonun eksikliği ve böbreğin dirençli olması da ayrılmalıdır. Oksitosin için olumlu yönde ilerleyen doğum döngüsü belirli koşullarda anlatılır; bütün hormonların aynı tür geri bildirimi kullandığı sonucu çıkmaz. Bir şemadaki okların taşıma, uyarı ve geri dönüş işlevlerini adlandır.",
        ],
      },
      {
        title: "Hormon listelerini işlev ağlarına dönüştür",
        paragraphs: [
          "Okul kaynaklarında ön-ara lob ilişkisi içinde MSH de listelenebilir; MSH melanokortin sinyalleri ve pigmentle ilişkili bir adlandırmadır. Erişkin insanın ara lobu bütün omurgalılarda aynı ölçüde bağımsız belirgin bir organ gibi sunulmaz. MSH, melanin pigmenti ve epifiz melatonini üç farklı kavramdır. Benzer adları tek molekül veya tek organ işlevi gibi ezberlemekten kaçın.",
          "Tekrar yaparken her hormona beş alan aç: sentez yeri, salım yeri, hedef, temel etki ve önemli koşul. Örneğin GH için plak durumu; prolaktin için sentez-atım ayrımı; ACTH için kortizol odağı eklenir. Hormonun hedefe ulaşması reseptör işlevinin sağlam olduğu anlamına gelmez. Etkileşimde uygun hedefi ve reseptörü ayrı değiştirmek, bir hormon adını görür görmez otomatik sonuç seçme alışkanlığını kırar.",
        ],
      },
      {
        title: "Farklı kısaltmalar, aynı kaynak sorusu ve metabolik ayrıntı",
        paragraphs: [
          "Kaynaklarda büyüme hormonu GH, somatotropin veya STH; prolaktin ise PRL veya LTH adlarıyla görülebilir. ADH için antidiüretik hormon ve vazopressin adları kullanılır. Bunlar farklı listelerde yeni birer bez veya zorunlu yeni molekül saymak için gerekçe değildir. Adı değişse de sentez yeri, salım yeri ve hedef aynı mekanizma üzerinden kontrol edilir. Oksitosin için üretim hipotalamusta, salım arka lobda ayrımı bu eşleştirmelerde korunur.",
          "GH, büyüme dokularında protein sentezi ve hücresel büyüme süreçlerine katkı verir; yağ kullanımını destekleyen, bazı dokularda glikoz kullanımını azaltabilen metabolik etkileri de vardır. Plaklar kapalıyken boy uzaması beklenmemesi bu diğer etkilerin yokluğu demek değildir. Prolaktin meme dokusunun gebelikte gelişimi ve doğum sonrasında süt senteziyle bağlantılıdır. Timüs ise göğüste akciğerler arasında bulunur; timozin gibi timik hormonlar T lenfosit olgunlaşmasıyla ilişkilidir ve bezin çocukluk sonrası görece küçülmesi ayrı bir gelişim bilgisidir.",
        ],
      },
    ],
    examples: [
      {
        title: "Üretim mi, atım mı?",
        prompt:
          "A kartı yeni süt bileşenlerinin sentezini, B kartı önceden bulunan sütün kanala itilmesini gösteriyor. Başlıca hipofiz bağlantılarını eşleştir.",
        strategy: "Hedef hücrenin yaptığı işi adlandır.",
        steps: [
          {
            label: "A olayını ayır",
            explanation: "Salgı hücresi süt bileşeni üretir.",
            expression: "prolaktin",
          },
          {
            label: "B olayını ayır",
            explanation: "Miyoepitelyal kasılma mevcut sütü ilerletir.",
            expression: "oksitosin",
          },
          {
            label: "Kaynaklarını ekle",
            explanation:
              "Prolaktin ön lobda, oksitosin hipotalamusta sentezlenir.",
            expression: "ön lob / hipotalamus",
          },
        ],
        answer: "A prolaktin; B oksitosin.",
        check: "Aynı organ iki farklı olay ve hücre tipini içerebilir.",
        pitfall: "Atımın bozulmasını mutlaka sentezin sıfırlanması sayma.",
      },
      {
        title: "Açık ve kapalı plak",
        prompt:
          "İki kişide GH etkisi artmış olsun. Birinde uzun kemik plakları açık, diğerinde kapalı. Aynı kesin boy uzaması beklenir mi?",
        strategy: "Hormon ile doku koşulunu birlikte değerlendir.",
        steps: [
          {
            label: "Açık plağı yorumla",
            explanation: "Uzunlamasına büyüme olanağı vardır.",
            expression: "açık plak",
          },
          {
            label: "Kapalı plağı yorumla",
            explanation: "Aynı uzunlamasına büyüme yolu sürmez.",
            expression: "kapalı plak",
          },
          {
            label: "Sonucu sınırla",
            explanation:
              "Yetişkin örnekte uç bölge değişimleri akromegali bağlamındadır.",
            expression: "aynı boy sonucu yok",
          },
        ],
        answer: "Hayır; plak durumu sonucu değiştirir.",
        check: "Tek gözlemden kişisel tanı konulmaz.",
        pitfall: "GH artışını her yaşta kesin boy artışı sayma.",
      },
      {
        title: "Erkek gonadında iki hedef",
        prompt:
          "FSH ve LH’nin temel erkek gonadı hedeflerini ve ilgili işlevlerini ayır.",
        strategy: "Hücreyi ve ürünü iki ayrı sütunda yaz.",
        steps: [
          {
            label: "FSH hedefi",
            explanation: "Sertoli hücreleri spermatogenezi destekler.",
            expression: "FSH → Sertoli",
          },
          {
            label: "LH hedefi",
            explanation: "Leydig hücreleri testosteron üretir.",
            expression: "LH → Leydig",
          },
          {
            label: "İş birliğini koru",
            explanation: "Sperm oluşumu çok etkenli bir doku sürecidir.",
            expression: "destek ≠ tek yeter koşul",
          },
        ],
        answer: "FSH-Sertoli; LH-Leydig/testosteron.",
        check: "Leydig hücresi ile testosteron aynı tür kavram değildir.",
        pitfall: "FSH’nin doğrudan sperm adlı hormon ürettiğini söyleme.",
      },
      {
        title: "Reseptör sağlam değilse",
        prompt:
          "Prolaktin hedef dokuya normal ulaşıyor. Verilen deneyde salgı hücresinin uygun reseptör yanıtı seçici engellenmiş. Doğrudan etki kesin sürer mi?",
        strategy: "Ulaşma ile yanıt basamağını ayır.",
        steps: [
          {
            label: "Ulaşmayı koru",
            explanation: "Hormonal taşıma soruda sağlam verilmiştir.",
            expression: "kan → hedef",
          },
          {
            label: "Yanıtı denetle",
            explanation: "Reseptör sinyali deneyde engellenmiştir.",
            expression: "yanıt engeli",
          },
          {
            label: "Çıkarımı sınırla",
            explanation: "Ulaşma tek başına normal özgül yanıtı garanti etmez.",
            expression: "hormon var ≠ yanıt kesin",
          },
        ],
        answer: "Hayır; uygun hedef yanıtı ayrıca gereklidir.",
        check: "Bu bir seçici deney varsayımıdır, kişisel tanı değildir.",
        pitfall: "Kanda normal hormon varsa her hedef normal çalışır deme.",
      },
    ],
    recall: [
      {
        prompt: "Prolaktin ve oksitosin süt olayında neyi ayırır?",
        answer: "Sentez ve atım; salgı hücresi ile miyoepitelyal kasılma.",
      },
      {
        prompt: "ACTH bütün adrenal hormonların tek denetleyicisi midir?",
        answer:
          "Hayır; kortizol ekseniyle ilişkilidir, aldosteron ve medulla kontrolü farklıdır.",
      },
      {
        prompt: "GH’de epifiz plağı neden önemlidir?",
        answer:
          "Açık ve kapalı plakta uzunlamasına büyüme olanağı aynı değildir.",
      },
      {
        prompt: "FSH ile LH erkek gonadında hangi hücrelerle eşleşir?",
        answer: "FSH-Sertoli; LH-Leydig ve testosteron üretimi.",
      },
    ],
    items: [
      [
        "Yeni süt bileşenlerinin meme salgı hücrelerinde sentezini destekleyen ön hipofiz hormonu hangisidir?",
        "Prolaktin",
        ["Oksitosin", "ADH", "TSH", "Aldosteron"],
        "Sentez ile mevcut sütün atımını ayır.",
        "Prolaktin ön hipofizde sentezlenir ve meme salgı hücrelerinde süt sentezini destekler. Oksitosin ise miyoepitelyal kasılma yoluyla mevcut sütün atımına katkı verir; iki olay aynı değildir.",
      ],
      [
        "Önceden sentezlenmiş sütün miyoepitelyal hücre kasılmasıyla kanala itilmesinde temel hormon ve sentez yeri hangisidir?",
        "Oksitosin; hipotalamus",
        [
          "Prolaktin; arka hipofiz",
          "TSH; tiroid",
          "ADH; böbrek",
          "Aldosteron; ön hipofiz",
        ],
        "Atım hormonunun salım yeri ile sentez yerini karıştırma.",
        "Oksitosin hipotalamik nöronlarda sentezlenir, arka hipofizde depolanıp salınır. Meme miyoepitelyal hücrelerinin kasılması mevcut sütü ilerletir; süt sentezinin temel prolaktin etkisinden ayrıdır.",
      ],
      [
        "GH etkisi artmış iki örnekte birinin uzun kemik epifiz plakları açık, diğerinin kapalıdır. Hangi ifade uygundur?",
        "Uzunlamasına büyüme sonucu plak durumuna göre farklılaşır",
        [
          "İkisinde de aynı kesin boy uzaması olur",
          "Plaklar kapalıysa bütün GH etkileri yoktur",
          "GH yalnız tiroidin sentezlediği hormondur",
          "Açık plak büyümeyi fiziksel olarak tamamen engeller",
        ],
        "Hormonun varlığı kadar hedef dokunun durumunu düşün.",
        "Açık plakta uzunlamasına büyüme olanağı bulunur; kapalı plakta aynı mekanizmayla boy uzaması beklenmez. GH’nin başka metabolik ve doku etkilerinin bulunması, bu iki koşulu eşitlemez.",
      ],
      [
        "Erkek gonadındaki temel hedef eşleştirmelerinden hangisi doğrudur?",
        "FSH-Sertoli; LH-Leydig",
        [
          "FSH-Leydig; LH-tiroid folikülü",
          "FSH-eritrosit; LH-nöron",
          "FSH-kemik iliği; LH-alveol",
          "FSH-böbrek süzgeci; LH-deri pigmenti",
        ],
        "Spermatogenez desteği ile testosteron üretimi hedefini ayır.",
        "FSH Sertoli hücreleri üzerinden spermatogenezi destekler; LH Leydig hücrelerinde testosteron üretimini uyarır. Bu iş birliği tek hormonun tek başına bütün üreme sürecini tamamladığı anlamına gelmez.",
      ],
      [
        "İnsan dişide FSH etkisini açıklayan hangi ifade uygundur?",
        "Folikül gelişimini destekler; pubertede sürekli sıfırdan oosit oluştuğu sonucu çıkarılmaz",
        [
          "Puberteden sonra her gün sıfırdan sınırsız oosit üretir",
          "Oksitosinin başka adıdır",
          "Yalnız erkek gonadında bulunur",
          "Bütün ovulasyon mekanizmasını tek başına ve her koşulda tamamlar",
        ],
        "Gelişme-olgunlaşma ile yeni hücre soyunun ilk oluşumunu ayır.",
        "FSH foliküler gelişim ve işlevleri destekler. İnsanda oositlerin gelişim kökeni ile puberte sonrası folikül olgunlaşmasını birbirine karıştırmak, FSH’nin her gün yeni oositler yarattığı yanlışını doğurur.",
      ],
      [
        "Hangi hormon ön hipofizde sentezlenip tiroidin foliküler hormon yolunu uyarır?",
        "TSH",
        ["Tiroksin", "Melatonin", "Aldosteron", "Glukagon"],
        "Uyaran hipofiz hormonu ile hedef bezin ürününü ayır.",
        "TSH ön hipofiz hormonudur; tiroid folikül hücrelerinin T3/T4 üretim-salım yolunu düzenler. Tiroksin ise hedef tiroidin ürünüdür ve TSH ile aynı molekül değildir.",
      ],
      [
        "ACTH ile ilgili hangi sınır doğru konmuştur?",
        "Adrenal korteksin özellikle kortizol yolunu düzenler; bütün adrenal salgıların tek kontrolü değildir",
        [
          "Medullanın tek sinirsel nörotransmitteridir",
          "Aldosteronun tek ve her koşuldaki denetleyicisidir",
          "Epifizde melatonin sentezleyen pigmenttir",
          "Yalnız pankreasın sindirim kanalına salgılanır",
        ],
        "Korteks-kortizol ile medulla ve RAAS yollarını ayır.",
        "ACTH, hipotalamus-hipofiz-adrenal kortizol eksenindedir. Aldosteronun temel düzenlenmesinde renin-anjiyotensin sistemi ve potasyum, medullada ise sempatik sinirsel uyarı önemli olduğundan bütün yolları ACTH’ye bağlamak yanlıştır.",
      ],
      [
        "ADH ve oksitosin için arka hipofizin temel rolü hangisidir?",
        "Hipotalamusta sentezlenen hormonların depolanması ve kana salınması",
        [
          "Bu iki hormonun yalnız ön lobdan sentezlenmesi",
          "İki hormonun sindirim kanalına enzim olarak verilmesi",
          "Tiroksinin iyot içermeyen biçime çevrilmesi",
          "Her iki hormonun böbrekte DNA’ya çevrilmesi",
        ],
        "Arka lobun sinir uçlarıyla ilişkisini düşün.",
        "ADH ve oksitosin hipotalamik nöronlarda üretilip aksonla arka loba taşınır. Arka lob depo ve kana salım işlevindedir; salım yapan yerin aynı zamanda sentez yeri olması zorunlu değildir.",
      ],
      [
        "Bir deneyde hormon hedefe normal ulaşırken uygun reseptör yanıtı engelleniyor. Hangi sonuç savunulabilir?",
        "Normal hormon ulaşması doğrudan özgül etkinin kesin sürmesini sağlamaz",
        [
          "Reseptör engeli hiçbir hormonda önem taşımaz",
          "Hedef otomatik olarak yeni hipofize dönüşür",
          "Kandaki hormon kesin sıfır olur",
          "Hormon artık bütün hücrelerde aynı DNA’yı üretir",
        ],
        "Taşıma ve hücresel yanıtı ayrı denetle.",
        "Hormona özgü yanıt uygun reseptör ve hücre içi mekanizma gerektirir. Taşıma sağlamken yanıt engellenebilir; bu durum tek başına dolaşımdaki hormonun yok olduğunu veya yeni bir bez oluştuğunu göstermez.",
      ],
      [
        "Melatonin, melanin ve MSH ilişkisini doğru açıklayan seçenek hangisidir?",
        "Melatonin epifiz hormonu, melanin pigment, MSH farklı bir hormonal sinyaldir",
        [
          "Üçü aynı molekülün eş anlamlı adıdır",
          "Melanin ön hipofizin tek büyüme hormonudur",
          "MSH böbrek su filtresinin adıdır",
          "Melatonin eritrosit oksijen pigmentidir",
        ],
        "Benzer sözcükleri kimlik eşitliği sayma.",
        "Melatonin sirkadiyen düzenlemeyle ilişkili epifiz hormonudur; melanin pigmenttir, MSH ise melanokortin sinyali bağlamında hormon adıdır. İnsan ara lobunun sınırlı anatomik gelişimi de bütün türlerde aynı bağımsız bez şemasını zorunlu kılmaz.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Konu Özeti, Bölüm 1, PDF 26–27; OGM Dersler Cepte, Endokrin Sistem II, PDF 10–16. Kaynaklarla karşılaştırılmış özgün anlatım, şema ve öğretim soruları.",
  },
  {
    id: "endokrin-tiroit",
    topic: "detail-293",
    title: "Tiroit: iyot, metabolizma ve geri bildirim",
    minutes: 32,
    objectives: [
      "T3/T4 üretiminde iyotun rolünü ve folikül hücresini açıkla.",
      "HPT ekseninde ileri uyarı ile negatif geri dönüşü ayır.",
      "Guatr, hormon düzeyi ve neden ilişkisini koşullarıyla yorumla.",
    ],
    sections: [
      {
        title: "Boyundaki bezin iki farklı hormon yolu",
        paragraphs: [
          "Tiroit boynun ön bölümünde, soluk borusuyla ilişkili yerleşmiş bir endokrin bezdir. Folikül hücreleri T3 ve T4 hormonlarıyla; parafoliküler C hücreleri kalsitoninle ilişkilidir. Aynı organ adı, bütün hormonların aynı hücreden aynı uyaranla üretildiği anlamına gelmez. Metabolizma düzenlemesini incelerken T3/T4, kalsiyum ilişkisini incelerken kalsitonin yolunu ayrı tut.",
          "T3 ve T4 iyot içeren tirozin türevi hormonlardır; yapılarındaki sırasıyla üç ve dört iyot atomu adlandırmaya yansır. Aminoasit türevi olmalarına rağmen steroid hormonlara benzer biçimde hücre içi reseptörlerle gen ifadesini etkileyebilirler. Adrenalin de aminoasit türevidir diye aynı çözünürlük ve reseptör konumunu bekleme. Kimyasal köken, tek başına bütün etki mekanizmasını belirlemez.",
        ],
      },
      {
        title: "Folikül, iyot ve üretim kapasitesi",
        paragraphs: [
          "Foliküller, hücre tabakasıyla çevrili kolloid içeren yapılardır. Tiroid hormonlarının sentezi iyodürün alınması, tiroglobulin üzerindeki bileşenlerin iyotlanması ve hormonların salıma hazırlanması gibi basamaklar içerir. Kaynak, depo ve salım sırasını görmek TSH’yi ürünün kendisi sanmayı önler. İyot gereksinimi, daha çok iyot almanın koşulsuz daha sağlıklı veya daha çok hormon anlamına geldiğini göstermez.",
          "Üretim kapasitesi kısıtlanırsa aynı uyarı aynı çıktıyı vermeyebilir. Bu nedenle hormon zincirinde yalnız TSH okunu artırıp T4’ün her koşulda zorunlu artacağını söylemek eksiktir. İyot ve bezin işlevi gibi koşulları soruda verilen ölçüde kullan. Uygulamanın modeli gerçek bir doz veya tedavi aracı değildir; basamakları ve koşullu yönleri öğretir, kişiye iyot ya da hormon kullanımı önermez.",
        ],
      },
      {
        title: "Üç merkezli HPT ekseni",
        paragraphs: [
          "Hipotalamik TRH, ön hipofiz TSH yolunu; TSH, tiroid foliküler hormon yolunu uyarır. T3/T4 ise hipotalamus ve ön hipofizde düzenleyici geri etkiler oluşturarak kendi üretim uyarısını sınırlar. Böylece ileri yönde artı etkiler ile geri yönde eksi etkiler aynı ağda birlikte bulunur. Bir ok üzerindeki artı işareti ile bütün döngünün pozitif olması farklı kavramlardır.",
          "Tiroidden çıkan hormon üst merkezlere dönüp onları baskıladığında başlangıç değişimini sınırlayan negatif geri bildirim vardır. Normal bir üretim kapasitesinde bu ağ değişimleri dengelemeye yardım eder. Ancak otonom üretim veya iyot kısıtı gibi koşullar, tek basamaklı ezberlerin beklediğinden farklı TSH-T4 birliktelikleri oluşturabilir. Her soruda verilen neden ve sağlam kabul edilen basamaklar önce işaretlenmelidir.",
        ],
      },
      {
        title: "Çıktı düşükken uyarı neden yüksek olabilir?",
        paragraphs: [
          "Varsayımsal örnekte tiroid hormon sentezi iyot yetersizliği nedeniyle kısıtlı, diğer eksen basamakları sağlam olsun. T3/T4 azalınca üst merkezlere baskı azalır ve TSH uyarısı artma yönünde değişebilir. Buna rağmen üretim için gerekli iyot kısıtı sürdüğünden T4’ün hemen normale dönmesi zorunlu değildir. Yüksek uyarı ile düşük çıktı birlikte bulunabilir; bu mantıksal bir çelişki değildir.",
          "Bu koşullu örnek, her yüksek TSH sonucunun tek ve kesin nedenini vermez. Hipofiz durumu, ilaçlar, zaman ve başka nedenler farklı örüntüler oluşturabilir; klinik yorum çok sayıda veri gerektirir. Burada öğrenilen beceri, negatif geri bildirimin yönünü ve üretim kısıtını birlikte okumaktır. Yalnız şikâyet veya tek ölçümden kişiye hastalık tanısı koyma; soruda açık verilen mekanizma üzerinden çıkarım yap.",
        ],
      },
      {
        title: "Çıktı yüksekken uyarı neden azalabilir?",
        paragraphs: [
          "Tiroidin üst merkezlerden görece bağımsız aşırı hormon üretimi yaptığı bir düşünce deneyinde dolaşımdaki tiroid hormonu yükselebilir. Geri bildirim sağlam ise bu artış TRH/TSH uyarısını baskılama yönünde etkilidir. Bu örnekte yüksek T4 ile düşük TSH yönü beraber düşünülebilir. Ürün artışını otomatik olarak ürünü uyaran bütün önceki basamakların artışı diye yorumlamak doğru değildir.",
          "Hipertiroidi farklı nedenlerle ortaya çıkabilen hormon fazlalığı bağlamıdır; tüm örnekleri tek otoimmün hastalık sayma. Graves hastalığı otoimmün bir örnektir, tek olası neden değildir. TSH reseptörünü etkileyen bir uyarı ile hipofizin TSH salgısının yüksek olması da aynı açıklama değildir. Şemadaki giriş noktasını değiştirerek benzer sonucun farklı kontrol bozukluklarıyla oluşabileceğini fark et.",
        ],
      },
      {
        title: "Metabolizma ve gelişim: genel etkiyi abartma",
        paragraphs: [
          "Tiroid hormonları birçok dokuda metabolik etkinlik ve ısı üretimiyle, büyüme ve özellikle erken sinir sistemi gelişimiyle ilişkilidir. Hormon eksikliği veya fazlalığı çok sayıda sistemi etkileyebilir; bu yüzden yalnız tek bir organa veya tek belirtiye indirgenmez. Kalp hızı, enerji kullanımı ve sıcaklık hissi gibi örnekler mekanizma bağlantısını anlatır, herkeste aynı belirti dizisini garanti etmez.",
          "Tedavi edilmemiş doğumsal hipotiroidi gelişimi etkileyebilir; kaynaklardaki eski “kretenizm” terimi bu tarihsel bağlamla açıklanmalı, kişileri etiketlemek için kullanılmamalıdır. Erken değerlendirme ve tedavinin önemi, öğrenme uygulamasının kişiye tanı veya doz seçmesi anlamına gelmez. Çocukta gelişim sorunu ya da yetişkinde yorgunluk tek başına belirli bir hormon hastalığının kesin kanıtı değildir.",
        ],
      },
      {
        title: "Guatr bir büyüklük adıdır, tek hormon sonucu değil",
        paragraphs: [
          "Guatr tiroid bezinin büyümesini adlandırır. İyot yetersizliğiyle ilişkili uyarı artışı bazı örneklerde büyümeye katkı sağlayabilir; fakat her guatr yalnız iyot eksikliği demek değildir. Bez büyüklüğüyle dolaşımdaki hormon miktarı farklı değişkenlerdir. Büyümüş bezde düşük, normal veya yüksek hormon işlevi farklı nedenlerle görülebilir; yalnız görüntüden birini zorunlu seçme.",
          "Soruda bez büyüklüğü verilmişse bunun hangi ek ölçümle tamamlanması gerektiğini düşün: hormon düzeyi, uyarı düzeyi ve neden hakkında bilgi farklıdır. “Bez büyük, öyleyse her zaman çok hormon var” çıkarımı görünümden işleve aşırı sıçramadır. Büyüklük, sentez kapasitesi ve geri bildirim birbiriyle ilişkili olsa da eş anlamlı değildir. Gerekçeni bu üç ayrı alanı koruyarak kurmak yeni durumlara aktarılabilir bir alışkanlıktır.",
        ],
      },
      {
        title: "Kalsitonin yolunu tiroid hormonlarının yerine koyma",
        paragraphs: [
          "Kalsitonin tiroidin C hücreleriyle ilişkilidir ve okul düzeyinde kan kalsiyumunu azaltan, kemikte tutulmayı destekleyen etkisiyle öğretilir. T3/T4 gibi iyot sayısına dayalı adlandırılmaz ve HPT ekseninin aynı foliküler ürünü değildir. PTH ve aktif D vitaminiyle birlikte kalsiyum homeostazı ağında ele alınır; tüm insan kalsiyum düzenlemesini eşit ağırlıklı yalnız iki hormona indirme.",
          "Bir soruda TSH ve iyot verileri metabolizma hormonlarının yoluna aittir; kalsiyum değişimi ise başka hedef ve uyarı bağlantıları gerektirir. Aynı bezden çıkan iki molekülün aynı kontrol girdisine sahip olduğunu varsaymamak önemlidir. Tekrar sırasında folikül-T3/T4-iyot-TSH ve C hücresi-kalsitonin-kalsiyum ilişkilerini yan yana yaz. Böylece benzer organ adlarının iki farklı fizyolojik görevi örtmesi önlenir.",
        ],
      },
      {
        title: "Eksik ve fazla etkide hangi sistemler değişebilir?",
        paragraphs: [
          "Tiroid hormonu fazlalığında metabolik ısı üretimi, terleme, kalp-dolaşım yanıtları ve enerji tüketimiyle ilişkili bulgular görülebilir; bazı kişilerde kilo kaybı veya sıcaklığa tahammülsüzlük örneği verilir. Yetersizlik bağlamında metabolizmanın yavaşlaması, soğuğa duyarlılık ve yorgunluk gibi örnekler bulunur. Bunlar herkeste eksiksiz aynı sırayla görülen tanı listeleri değildir. Özellikle Graves ile ilişkili göz bulguları bütün hipertiroidi nedenlerinin zorunlu ortak bulgusu sayılmaz.",
          "T3/T4 normal büyüme, protein metabolizması ve sinirsel gelişimle de ilişkilidir; etkisi yalnız vücut sıcaklığına indirgenmez. İyot eksikliğinin önlenmesinde uygun toplum sağlığı uygulamaları ve iyotlu tuz örneği öğretilebilir, ancak fazla iyotun her kişide daha iyi hormon işlevi sağlayacağı sonucu yanlıştır. Kaynağın tedavi örnekleri farklı neden ve değerlendirmeler içindir; bir şemadan cerrahi, radyoaktif iyot veya hormon seçimi yapılamaz. Buradaki temel beceri mekanizma, belirti ve klinik kararın farklı kanıt düzeylerini ayırmaktır.",
        ],
      },
      {
        title: "Kalsitoninin böbrek ve kemik oklarını birlikte gör",
        paragraphs: [
          "Kaynakların kalsitonin şemasında yüksek kan kalsiyumuna karşı kemikte tutulmanın desteklenmesi ve kemikten çıkışın sınırlanması öne çıkar. Ayrıca böbrekte kalsiyum ve fosfat geri emiliminin azaltılmasıyla idrarla çıkışa katkı anlatılır. Bu, PTH’nin böbrekte kalsiyumu korurken fosfat atımını artırabilmesiyle aynı bütün ok dizisi değildir. Yalnız iki hormona artı ve eksi yazmak yerine her madde ve organ için ayrı yön çiz.",
          "Kaynakta bağırsak kalsiyum emiliminin azalmasına hafif katkı da verilir; bu, insanın bütün bağırsak-kalsiyum kontrolünü kalsitoninin tek başına yaptığı anlamına gelmez. Aktif D’nin emilim üzerindeki belirgin rolü ve PTH’nin böbrek üzerinden dolaylı ilişkisi görünür kalmalıdır. Temel karşıt etkilere antagonist etki denir; antagonist iki molekülün aynı kaynaktan çıktığı, bütün dokularda birebir aynı hedefi paylaştığı veya insanda eşit ağırlıkta denetleyici olduğu sonucu çıkarılmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Kısıtlı üretimde artan uyarı",
        prompt:
          "Yalnız iyot kısıtının T4 sentezini azalttığı, üst merkez geri bildiriminin sağlam olduğu örnekte TSH hangi yönde değişebilir?",
        strategy: "Ürün ve geri baskıyı sırala.",
        steps: [
          {
            label: "Ürünü bul",
            explanation: "İyot kısıtı T4 üretimini azaltır.",
            expression: "T4↓",
          },
          {
            label: "Geri baskıyı bul",
            explanation: "Üst merkeze baskı azalır.",
            expression: "negatif etki↓",
          },
          {
            label: "Uyarıyı yorumla",
            explanation:
              "TSH artabilir; kısıt sürdüğünden T4’ün düzelmesi kesin değildir.",
            expression: "TSH↑ yönü",
          },
        ],
        answer:
          "TSH artma yönünde; yüksek TSH düşük çıktıyla birlikte olabilir.",
        check:
          "Yalnız soruda verilen sağlam geri bildirim ve iyot kısıtı varsayımı geçerli.",
        pitfall: "Yüksek TSH’yi her durumda yüksek T4 sayma.",
      },
      {
        title: "Otonom üretim",
        prompt:
          "Tiroid üretimi üst merkez uyarısından bağımsız artmış ve geri bildirim sağlamdır. T4 ve TSH yönlerini ayır.",
        strategy: "Ürünün üst merkeze geri etkisini izle.",
        steps: [
          {
            label: "Başlangıcı seç",
            explanation: "Artış doğrudan tiroid üretiminde başlar.",
            expression: "T4↑",
          },
          {
            label: "Dönüşü izle",
            explanation: "Artan ürün üst merkezleri baskılar.",
            expression: "geri dönüş−",
          },
          {
            label: "TSH’yi yorumla",
            explanation: "TSH azalma yönünde değişir.",
            expression: "TSH↓",
          },
        ],
        answer: "T4 yüksekliği ve TSH baskılanma yönü birlikte olabilir.",
        check: "Bu koşullu eksen örneği tek hastalık tanısı değildir.",
        pitfall: "Her üst basamağın ürünle birlikte arttığını varsayma.",
      },
      {
        title: "Molekül başına iyot sayısı",
        prompt:
          "İki T4 ve üç T3 molekülünün toplam iyot atomu sayısını hesapla. Her T4 dört, her T3 üç iyot atomu taşır.",
        strategy: "Her türün sayısını atom içeriğiyle çarp.",
        steps: [
          {
            label: "T4 katkısı",
            explanation: "İki molekülün katkısı sekizdir.",
            expression: "2×4=8",
          },
          {
            label: "T3 katkısı",
            explanation: "Üç molekülün katkısı dokuzdur.",
            expression: "3×3=9",
          },
          {
            label: "Toplamı al",
            explanation: "Aynı tür atomları topla.",
            expression: "8+9=17",
          },
        ],
        answer: "17 iyot atomu.",
        check: "Molekül sayısı ile mol miktarı birbirine karıştırılmadı.",
        pitfall: "T3 ve T4 alt indislerini molekül sayısı sanma.",
      },
      {
        title: "Artı oku sınıflandır",
        prompt:
          "Bir çizimde yalnız TRH→TSH ve TSH→T4 artırıcı okları var; geri dönüş çizilmemiş. Pozitif geri bildirim kanıtlanmış mıdır?",
        strategy: "Ok sayısı yerine kapalı dönüşü ara.",
        steps: [
          {
            label: "İleri yolu oku",
            explanation: "İki bağlantı da sonraki basamağı uyarır.",
            expression: "ileri+",
          },
          {
            label: "Geri dönüşü ara",
            explanation: "Çıktının üst basamağa etkisi verilmemiştir.",
            expression: "döngü yok",
          },
          {
            label: "Doğru adlandır",
            explanation:
              "İleri uyarı zinciri görülür; geri bildirim türü gösterilmez.",
            expression: "kanıt sınırı",
          },
        ],
        answer: "Hayır; yalnız ileri uyarı zinciri verilmiştir.",
        check:
          "T4’ün baskılayıcı dönüşü eklendiğinde negatif döngü gösterilebilir.",
        pitfall: "Her artı işaretini pozitif geri bildirim sayma.",
      },
    ],
    recall: [
      {
        prompt: "T3/T4’te 3 ve 4 neyi gösterir?",
        answer: "Bir moleküldeki iyot atomu sayısını.",
      },
      {
        prompt: "HPT ekseninde negatif geri dönüş nereden nereye gider?",
        answer:
          "Tiroid hormonlarından hipotalamus ve ön hipofize baskılayıcı etki.",
      },
      {
        prompt: "Guatr hormon fazlalığıyla eş anlamlı mıdır?",
        answer:
          "Hayır; bez büyümesidir, hormon düzeyi ve neden ayrıca belirlenir.",
      },
      {
        prompt: "Kalsitonin foliküler T4 ile aynı ürün müdür?",
        answer:
          "Hayır; C hücreleriyle ilişkili ayrı kalsiyum düzenleme hormonudur.",
      },
    ],
    items: [
      [
        "Tiroit folikül hücreleri ile doğrudan eşleşen hormonlar hangileridir?",
        "T3 ve T4",
        [
          "İnsülin ve glukagon",
          "ADH ve oksitosin",
          "FSH ve LH",
          "Kortizol ve aldosteron",
        ],
        "Aynı bezin folikül ve C hücrelerini ayır.",
        "Tiroidin folikül hücreleri iyot içeren T3/T4 yoluyla ilişkilidir. Kalsitonin C hücrelerinin ürünüdür; diğer hormon çiftleri farklı organ ve hücre gruplarından kaynaklanır.",
      ],
      [
        "T4’ün hipotalamus ve ön hipofiz salgılarını baskılaması hangi düzenlemeye örnektir?",
        "Negatif geri bildirim",
        [
          "Yalnız ileri uyarı",
          "Pozitif geri bildirimin zorunlu örneği",
          "Ekzokrin kanal taşınması",
          "İyodun tamamen yok olması",
        ],
        "Çıktının kendi üretim uyarısını nasıl etkilediğine bak.",
        "Tiroid hormonu üst merkezlerin üretim uyarısını sınırladığında negatif geri bildirim vardır. TRH→TSH ileri uyarısından farklı olarak burada çıktı önceki basamaklara geri etki etmektedir.",
      ],
      [
        "Bir örnekte yalnız iyot yetersizliği T4 sentezini kısıtlıyor; üst merkezler ve negatif geri bildirim sağlam. Hangi yön birlikte mümkün olabilir?",
        "T4 azalırken TSH uyarısının artması",
        [
          "T4 azalırken bütün geri bildirimin zorunlu artması",
          "İyot gerekmeden T4’ün sınırsız üretilmesi",
          "TSH’nin T4 adlı aynı moleküle dönüşmesi",
          "T4 azalınca TSH’nin her koşulda sıfırlanması",
        ],
        "Ürün azalınca baskının ne olduğuna bak.",
        "Düşük T4 üst merkezlere baskıyı azaltır; TSH artma yönünde değişebilir. Üretim için iyot kısıtı sürdüğünden uyarının artışı T4’ün kesin yükselmesini sağlamaz; koşullar birlikte okunmalıdır.",
      ],
      [
        "Tiroit üst merkezden bağımsız olarak fazla T4 üretirken geri bildirim sağlam kabul ediliyor. TSH için beklenen yön hangisidir?",
        "Baskılanma yönü",
        [
          "Her koşulda aynı oranda artma",
          "Kesin tiroksine dönüşme",
          "Pankreastan sentezlenme",
          "Böbrek kanalına enzim olarak verilme",
        ],
        "Artan ürünün önceki basamağa geri etkisini düşün.",
        "Artmış tiroid hormonu hipotalamus ve ön hipofizde baskılayıcı geri etki yapar. Bu koşullu modelde TSH azalabilir; yüksek hormon düzeyini bütün üst basamakların artışı saymak yanlıştır.",
      ],
      [
        "Her T4 molekülünde 4, her T3 molekülünde 3 iyot atomu vardır. İki T4 ve üç T3 molekülü toplam kaç iyot atomu taşır?",
        "17",
        ["5", "7", "12", "20"],
        "İki türü ayrı çarpıp topla.",
        "İki T4 için 2×4=8, üç T3 için 3×3=9 iyot atomu bulunur. Toplam 17’dir; molekül türünün adındaki indis ile örnekte verilen molekül sayısı farklı görevlerdedir.",
      ],
      [
        "Guatr teriminden tek başına hangisine ulaşılır?",
        "Tiroit bezinin büyümüş olduğuna",
        [
          "T4’ün kesin yüksek olduğuna",
          "Nedenin kesin yalnız iyot eksikliği olduğuna",
          "Bütün olguların kesin otoimmün olduğuna",
          "TSH’nin kesin sıfır olduğuna",
        ],
        "Yapısal büyüklük ile hormon işlevini ayır.",
        "Guatr bezin büyümesidir; hormon düzeyi düşük, normal veya yüksek olabilir ve farklı nedenler bulunabilir. Tek büyüklük bilgisinden hormon düzeyi, tek neden veya uyarı miktarı zorunlu çıkarılmaz.",
      ],
      [
        "Hipertiroidi ve Graves ilişkisini doğru kuran ifade hangisidir?",
        "Graves otoimmün bir neden örneğidir; bütün hipertiroidi nedenleri aynı değildir",
        [
          "Her hipertiroidi yalnız iyot eksikliğidir",
          "Graves bütün hormon eksikliklerinin eş anlamıdır",
          "Hipertiroidi her zaman TSH yüksekliğidir",
          "Bütün hipertiroidi olguları tek mekanizmadır",
        ],
        "Bir örneği bütün nedenlere yayma.",
        "Graves otoimmün mekanizmayla tiroid hormonu fazlalığına yol açabilen bir örnektir. Tiroid hormonu fazlalığının farklı nedenleri bulunduğundan bütününü aynı hastalık veya aynı TSH örüntüsüyle eşitlemek doğru değildir.",
      ],
      [
        "Kalsitonin için doğru eşleştirme hangisidir?",
        "Tiroit C hücresi; kalsiyum düzenlenmesi",
        [
          "Folikül hücresi; dört iyotlu T4’ün eş adı",
          "Ön hipofiz; süt sentezi",
          "Pankreas β hücresi; glikoz alımı",
          "Böbreküstü medulla; sempatik katekolamin",
        ],
        "Tiroit içindeki farklı hücre tiplerini ayır.",
        "Kalsitonin tiroidin parafoliküler C hücreleriyle ilişkilidir ve kalsiyum homeostazı bağlamında iş görür. T3/T4’ün aynı ürünü değildir; PTH ve aktif D katkılarıyla birlikte ele alınır.",
      ],
      [
        "Tiroid hormonlarıyla adrenalin aminoasit türevidir. Bundan hangi sonuç zorunlu değildir?",
        "İkisinin reseptör yerinin ve hücresel etki yolunun aynı olduğu",
        [
          "İkisinin hormonal haberci olabildiği",
          "Kimyasal kökenin tek başına bütün etkiyi açıklamadığı",
          "Farklı dokularda farklı yanıtlar görülebildiği",
          "Hedef yanıtta uygun reseptörün önemli olduğu",
        ],
        "Ortak kökeni bütün özelliklerde özdeşlik sayma.",
        "Tiroid hormonları hücre içi reseptörlerle, adrenalin ise zar reseptörleriyle etkili olabilir. Ortak aminoasit kökeni çözünürlük, taşıma ve reseptör yerinin zorunlu aynı olduğunu göstermez.",
      ],
      [
        "Yalnız TRH→TSH→T4 artırıcı okları verilmiş; çıktının üst merkezlere geri dönüşü gösterilmemiştir. Hangisi doğrudur?",
        "İleri uyarı zinciri vardır; kapalı geri bildirim türü bu çizimle kanıtlanmaz",
        [
          "Pozitif kapalı döngü kesin gösterilmiştir",
          "T4’ün üst merkezleri artırdığı kesin verilmiştir",
          "Bütün hormonlar aynı reseptörü taşır",
          "TSH ile T4 aynı moleküldür",
        ],
        "Geri dönüş oku olmadan döngüyü tamamlanmış sayma.",
        "İleri artırıcı basamaklar tek başına geri bildirim oluşturmaz. Çıktının önceki basamağa dönüşü ve bu etkinin yönü gösterilmelidir; gerçek HPT negatif geri etkisi bu ileri zincirden ayrı bağlantıdır.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Konu Özeti, Bölüm 1, PDF 28–29; OGM Dersler Cepte, Endokrin Sistem II, PDF 10–16. Kaynaklarla karşılaştırılmış özgün anlatım, şema ve öğretim soruları.",
  },
  {
    id: "endokrin-paratiroit",
    topic: "detail-294",
    title: "Paratiroit: kalsiyum ve fosfatın ayrı yolları",
    minutes: 32,
    objectives: [
      "PTH’nin kemik, böbrek ve aktif D üzerinden bağırsak etkilerini ayır.",
      "Kalsiyum geri emilimi ile fosfat atımının farklı yönlerini açıkla.",
      "Verilen bir havuzda giriş-çıkış bilançosunu birimiyle kur.",
    ],
    sections: [
      {
        title: "Küçük bezler, yaşamsal iyon dengesi",
        paragraphs: [
          "Paratiroit bezleri tipik olarak tiroidin arka yüzüne yakın küçük yapılardır; sayısı ve yerleşimi bireyler arasında değişebilir. Salgıladıkları parathormon, PTH kısaltmasıyla anılır. Kandaki kalsiyumun düzenlenmesi sinir-kas uyarılabilirliği, kasılma ve başka hücresel süreçler için önemlidir. Bezlerin tiroidin yakınında oluşu, PTH’yi tiroidin T3/T4 hormonu veya kalsitoninle aynı ürün yapmaz.",
          "Kandaki düşük iyonize kalsiyum, uygun fizyolojik bağlamda PTH salımını artıran yönde etkili olur. Toplam kan kalsiyumu ile biyolojik olarak etkin iyonize bölüm tam aynı ölçüm değildir; protein bağlanması ve koşullar ayrılmalıdır. Okulda verilen yaklaşık 10 mg/dL gibi değerler tek başına her kişiye zorunlu tek hedef veya tanı eşiği değildir. Bu derste mekanizmanın yönü ve verilen miktarın birimi önceliklidir.",
        ],
      },
      {
        title: "Kanda azalma, PTH’de artış ve geri dönüş",
        paragraphs: [
          "Kalsiyum düşme eğilimine karşı PTH’nin desteklediği yanıtlar kan kalsiyumunun korunmasına katkı verir. Sonuçta kalsiyum yükseldikçe PTH uyarısı azalır; bu negatif geri bildirimin bir örneğidir. Burada hipofiz TSH’sine benzer zorunlu tek bir aracı basamak çizilmez. Paratiroit hücrelerinin kalsiyum algılaması, birçok endokrin düzenlemede hedef değişkenin doğrudan izlenebildiğini gösterir.",
          "Bir şekli okurken düşük kalsiyumdan PTH’ye, ardından dokulardan tekrar kana dönen etkiyi izle. “Hormon arttı, öyleyse ilk değişken daha da azalır” diye aynı yönde ok çizme. Negatif geri bildirim başlangıç sapmasını sınırlayan düzenlemedir. Yine de böbrek, kemik ve D vitamini basamaklarının çalışabilirliğini soruda verilen koşullarla birlikte değerlendir; aynı PTH düzeyi bütün durumlarda aynı son miktarı garanti etmez.",
        ],
      },
      {
        title: "Kemik yalnız sert bir yapı değil, mineral deposudur",
        paragraphs: [
          "Kemik kalsiyum ve fosfat içeren dinamik bir dokudur; yapım ve yıkım süreçleriyle mineral alışverişi sürer. PTH uygun bağlamda kemikten kana mineral geçişini artıran düzenlemeleri destekleyebilir. Bu etkiyi tek bir hormon molekülünün kemiği doğrudan kimyasal olarak eritmesi gibi anlatma: hücreler ve düzenleyici sinyaller aracılığıyla gerçekleşen bir süreçtir. Kemik depoları sınırsız değildir.",
          "Kemikten çıkışta kalsiyumla birlikte fosfat da dolaşıma katılabilir. Ancak bundan kan fosfatının her koşulda aynı yönde artacağı sonucu çıkmaz; böbreğin atım düzenlemesi ayrıca önemlidir. Kaynağa bakarken yerel çıkış ile bütün vücuttaki net havuzu ayır. Bir dokudan giren maddeyi başka bir dokudan çıkan miktarla birlikte düşünmek, organ adlarını ezberlemekten daha güçlü bir açıklama sağlar.",
        ],
      },
      {
        title: "Böbrekte kalsiyum korunur, fosfat atımı artabilir",
        paragraphs: [
          "PTH böbrekte kalsiyumun geri emilimini desteklerken fosfat geri emilimini azaltarak idrarla fosfat atımını artırabilir. Aynı hormona yanıt veren iki mineral aynı yönde davranmak zorunda değildir. Filtre edilen miktar, geri emilen miktar ve atılan miktar farklı büyüklüklerdir. “Bütün mineraller geri emilir” veya “bütün mineraller atılır” diye tek ok çizmek bu ünitenin temel ayrımını yok eder.",
          "Basit bir bölme modelinde filtreye gelen 10 kalsiyum biriminden 8’i geri emilirse 2 birim çıkar; 9’u geri emilirse 1 birim çıkar. Bu hesap belirli bir dönem ve seçili bölme içindir; gerçek böbreğin günlük süzme hacmiyle karıştırılmaz. Fosfat için ayrı veri gerekiyorsa ayrı hesap açılır. Kalsiyumun daha iyi korunması, fosfatın da zorunlu aynı oranda korunacağını göstermemektedir.",
        ],
      },
      {
        title: "Bağırsak oku neden aktif D basamağından geçer?",
        paragraphs: [
          "PTH’nin bağırsaktan kalsiyum emilimini artırıcı etkisi önemli ölçüde böbrekte D vitamininin etkin biçiminin oluşmasını desteklemesiyle ilişkilidir. Aktif D vitamini bağırsaktaki emilim mekanizmalarını etkiler. Bu nedenle düzgün şemada PTH→böbrekte aktif D→bağırsak zinciri görünmelidir. PTH’nin bütün bağırsak etkisini tek doğrudan reseptör oku gibi sunmak öğretim basamağını atlar.",
          "Böbrekteki etkinleştirme basamağı bir düşünce deneyinde engellenirse aynı PTH düzeyinden normal bağırsak katkısını otomatik beklemek doğru değildir. Gıdayla alınan miktar, D vitamini durumu ve bağırsak işlevi de önem taşır. D vitamininin yalnız bağırsakta veya yalnız kemikte görev yaptığını söylemek yerine bağlantılı süreçleri öğren. Bu ders mekanizma açıklamasıdır; kişiye D vitamini veya kalsiyum dozu belirlemez.",
        ],
      },
      {
        title: "Kalsitoninle karşıtlık, bütün sistemi iki düğmeye indirmez",
        paragraphs: [
          "Okul şemalarında PTH kan kalsiyumunu artıran, tiroid C hücresi kalsitonini azaltan etkiyle karşılaştırılır. Bu karşıtlık temel yönleri ayırmaya yardımcı olur. Bununla birlikte insanın uzun dönem kalsiyum homeostazını eşit önemde yalnız iki hormonun aç-kapa düğmesiyle bütünüyle açıklamak eksiktir. Aktif D, böbrek işlevi, kemik dönüşümü ve emilim kaynakları ağın parçasıdır.",
          "T3/T4’ün genel metabolizma etkisi ile kalsitoninin mineral bağlantısını da ayrı tut. Aynı bezin farklı hücre tipleri farklı işlevli hormonlar üretebilir; aynı kan değişkeni ise birden çok organın katkısıyla düzenlenebilir. Bir karşılaştırma tablosunda hormon, salgılayan hücre, ana hedef ve koşulu ayrı sütunlara yerleştir. “Karşıt etki” sözü, her dokudaki her basamağın birebir tam tersi olduğu anlamına gelmez.",
        ],
      },
      {
        title: "Miktar bilançosu ile derişim ölçümünü ayır",
        paragraphs: [
          "Bir havuzun son miktarı başlangıç miktarına girişlerin eklenip çıkışların çıkarılmasıyla bulunur. Varsayımsal kan havuzunda 10 birim kalsiyuma kemikten 3 ve bağırsaktan 2 birim girip 4 birim çıkarsa son miktar 11 birimdir. Bunlar aynı ölçekte kalsiyum miktarı birimleridir; hormon miktarı veya gerçek mg/dL değeri değildir. Model sayıları bu nedenle açık biçimde öğretim varsayımı olarak kullanır.",
          "Derişim miktarın hacme oranıdır. Hacim değişiyorsa miktardaki artıştan derişimin aynı oranda arttığı söylenemez. Etkileşimde miktar havuzu ve yön şeması birlikte ama ayrı anlamlarıyla gösterilir: sürgüdeki kemik, bağırsak ve atım miktarları verilen deney değerleridir; seçilen PTH düzeyinin gerçek hayatta zorunlu ürettiği sabit katsayılar değildir. Sonucu önce birimiyle, sonra sınırıyla ifade et.",
        ],
      },
      {
        title: "Belirti listesinden kesin hastalık çıkarma",
        paragraphs: [
          "Kalsiyum düzenlenmesindeki bozukluklar sinir-kas uyarılabilirliği ve kemik sağlığıyla ilişkili olabilir. Ancak bir kişide kasılma, halsizlik veya kemik sorunu görülmesinin tek olası nedeni paratiroit bozukluğu değildir. Kaynaktaki örnekler mekanizmayı ilişkilendirmek içindir; tek belirtiyi kesin tanıya dönüştürmek bilimsel kanıt sınırını aşar. Değişkenler ve organ işlevleri birlikte değerlendirilir.",
          "Sorularda düşük kalsiyum, sağlam böbrek ve belirli PTH değişimi açıkça verilirse o koşullarda yön çıkarımı yapabilirsin. Gerçek veri verilmeden bütün hormonları ve bütün mineralleri sayısal olarak tahmin edemezsin. Yeni duruma aktarırken şu sırayı koru: hangi iyon, hangi havuz, hangi organ, hangi doğrudan veya dolaylı yol? Bu dört ayrım kemik, böbrek ve bağırsak bilgilerinin birbirine karışmasını engeller.",
        ],
      },
      {
        title: "Kalsiyum neden yalnız kemik başlığı değildir?",
        paragraphs: [
          "Kalsiyum kemik mineralinin yanında kas kasılması, sinir uçlarında haberci salımı ve kan pıhtılaşması gibi süreçlerle ilişkilidir. Hücre içi kalsiyum sinyaliyle kandaki toplam kalsiyum ölçümünü aynı değişken sanma; farklı bölmelerde farklı düzey ve düzenlemeler vardır. Her aktif taşımanın tek zorunlu maddesi kalsiyumdur gibi bir genelleme de kurulmaz. Kaynaktaki görev listesini hangi hücresel olayla ilişkili olduğunu açıklayarak öğrenmek daha kullanışlıdır.",
          "PTH ve kalsitoninin temel kan-kalsiyum yönleri antagonist örneğidir; fakat kemikten kana giriş ve böbrekten çıkış ayrı süreçler olduğundan net sonucu birlikte belirler. Aşırı kemik mineral kaybı veya değişen sinir-kas uyarılabilirliği bu ağlarla ilişkili olabilir; bir belirtinin tek nedenini kanıtlamaz. Timüsün T lenfosit olgunlaşmasındaki timozin ilişkisi ise aynı komşu kaynak sayfasında yer alsa da kalsiyum hormonu değildir; konu yakınlığı molekül işlevini eşitlemez.",
        ],
      },
    ],
    examples: [
      {
        title: "İki mineral iki farklı yön",
        prompt:
          "PTH etkisi artarken böbrekte kalsiyum geri emilimi ve fosfat atımı nasıl birlikte değişebilir?",
        strategy: "İki madde için ayrı ok çiz.",
        steps: [
          {
            label: "Kalsiyum",
            explanation:
              "Kalsiyum korunmasını destekleyen geri emilim artabilir.",
            expression: "Ca geri emilim↑",
          },
          {
            label: "Fosfat",
            explanation: "Fosfat geri emilimi azalabilir.",
            expression: "fosfat geri emilim↓",
          },
          {
            label: "Atımı çevir",
            explanation:
              "Daha az geri emilim daha fazla fosfat çıkışına katkıdır.",
            expression: "fosfat atımı↑",
          },
        ],
        answer: "Kalsiyum geri emilimi artarken fosfat atımı da artabilir.",
        check: "Aynı hormon bütün mineralleri aynı yönde taşımaz.",
        pitfall: "Fosfat atımı ile fosfat geri emilimini aynı kavram sayma.",
      },
      {
        title: "Gelen ve geri emilen",
        prompt:
          "Bir deney bölmesine 10 kalsiyum birimi geliyor; önce 8, sonra 9 birim geri emiliyor. Başka akış yok. Çıkışlar kaçtır?",
        strategy: "Miktarı koru.",
        steps: [
          {
            label: "İlk dönem",
            explanation: "Çıkış, girişten geri emilen çıkarılarak bulunur.",
            expression: "10−8=2",
          },
          {
            label: "İkinci dönem",
            explanation: "Yeni geri emilim 9 birimdir.",
            expression: "10−9=1",
          },
          {
            label: "Yönü yorumla",
            explanation: "Daha fazla kalsiyum korunmuştur.",
            expression: "çıkış 2→1",
          },
        ],
        answer: "2 ve 1 kalsiyum birimi.",
        check: "Verilen miktarlar seçili bölme içindir.",
        pitfall:
          "Bu rakamları hormon miktarı veya gerçek günlük filtre hacmi sanma.",
      },
      {
        title: "Dolaylı bağırsak yolu",
        prompt:
          "PTH’nin aktif D üzerinden bağırsak emilimini etkilediği yolun böbrek basamağı deneyde engelleniyor. Aynı bağırsak yanıtı kesin midir?",
        strategy: "Aracı basamağı sıraya ekle.",
        steps: [
          {
            label: "Başlangıç",
            explanation: "PTH böbrekte etkin D oluşumunu destekler.",
            expression: "PTH → böbrek",
          },
          {
            label: "Aracı",
            explanation: "Aktif D bağırsak emilim mekanizmalarını etkiler.",
            expression: "aktif D → bağırsak",
          },
          {
            label: "Kesintiyi yorumla",
            explanation: "Aracı oluşmazsa aynı bütün yanıt otomatik beklenmez.",
            expression: "dolaylı yol kesilir",
          },
        ],
        answer: "Hayır; aracı basamak önemlidir.",
        check:
          "Bu sonuç PTH’nin bütün diğer etkilerinin yokluğu demek değildir.",
        pitfall: "Bağırsak okunu her koşulda doğrudan PTH etkisi sayma.",
      },
      {
        title: "Bir havuzun miktarı",
        prompt:
          "Sabit hacimli varsayımsal havuzda 10 kalsiyum birimi var. Kemikten 3, bağırsaktan 2 birim giriyor; 4 birim çıkıyor. Son miktar kaçtır?",
        strategy: "Girişleri ve çıkışı işaretiyle yaz.",
        steps: [
          {
            label: "Girişleri birleştir",
            explanation: "Toplam giriş beş birimdir.",
            expression: "3+2=5",
          },
          {
            label: "Net değişim",
            explanation: "Çıkış dört birimdir.",
            expression: "5−4=1",
          },
          {
            label: "Son havuz",
            explanation: "Başlangıca net değişimi ekle.",
            expression: "10+1=11",
          },
        ],
        answer: "11 kalsiyum miktarı birimi.",
        check: "Birimler aynı ölçektedir; gerçek mg/dL hesaplanmıyor.",
        pitfall: "Miktarı hacim bilgisi olmadan gerçek derişim sayma.",
      },
    ],
    recall: [
      {
        prompt: "PTH böbrekte kalsiyum ve fosfatı nasıl ayırır?",
        answer:
          "Kalsiyum geri emilimini destekler; fosfat atımını artırabilir.",
      },
      {
        prompt: "PTH’nin bağırsak katkısındaki aracı nedir?",
        answer: "Böbrekte etkinleşen D vitamini üzerinden emilim etkisi.",
      },
      {
        prompt:
          "Negatif geri bildirimde kalsiyum yükselince PTH uyarısı ne olur?",
        answer: "Uygun koşullarda azalır; başlangıç sapması sınırlanır.",
      },
      {
        prompt: "Miktar artışı neden her zaman aynı derişim artışı değildir?",
        answer: "Derişim hacme de bağlıdır; hacim koşulu ayrıca gerekir.",
      },
    ],
    items: [
      [
        "Paratiroit bezlerinin temel hormonu hangisidir?",
        "PTH",
        ["TSH", "Melatonin", "İnsülin", "Kortizol"],
        "Yakın yerleşim hormonların aynı olduğunu göstermez.",
        "Paratiroit parathormon, PTH salgılar. Tiroidin yakınında bulunması onu tiroid foliküllerinin T3/T4 veya C hücrelerinin kalsitonin ürünüyle aynı yapmaz; kaynak ve hedefler ayrıdır.",
      ],
      [
        "Sağlam düzenleme koşulunda kan iyonize kalsiyumunun düşmesi PTH salımını hangi yönde etkiler?",
        "Artırma yönünde",
        [
          "Her koşulda sıfırlama yönünde",
          "PTH’yi T4’e çevirme yönünde",
          "Salgıyı kesin yalnız pankreasa taşıma yönünde",
          "PTH sentezini DNA eşlenmesine dönüştürme yönünde",
        ],
        "Yanıtın başlangıç sapmasını sınırlamasını düşün.",
        "Düşük kalsiyum PTH salımını artıran bir girdidir. PTH’nin desteklediği etkiler kan kalsiyumunu korumaya katkı verir; kalsiyum yükseldiğinde uyarının azalması negatif geri bildirime örnektir.",
      ],
      [
        "PTH’nin böbrek etkileri için hangi birliktelik mümkündür?",
        "Kalsiyum geri emilimi artarken fosfat atımı artar",
        [
          "Kalsiyum ve fosfat her koşulda aynı oranda geri emilir",
          "Fosfat atımı artınca kalsiyum korunması olanaksızdır",
          "PTH bütün mineralleri mutlaka aynı yönde taşır",
          "Kalsiyum geri emilimi hormon senteziyle aynı olaydır",
        ],
        "Geri emilim ve atımı her mineral için ayrı yaz.",
        "PTH kalsiyum geri emilimini desteklerken fosfat geri emilimini azaltabilir; bu da fosfat atımını artırır. Aynı hormonal düzenleyicinin iki madde için farklı yönleri olması çelişki değildir.",
      ],
      [
        "PTH’nin bağırsaktan kalsiyum emilimini artırıcı önemli dolaylı yolu hangisidir?",
        "Böbrekte aktif D oluşumu üzerinden bağırsak etkisi",
        [
          "PTH’nin her bağırsak hücresinde doğrudan kalsiyuma dönüşmesi",
          "Tiroid folikülünün insülin üretmesi",
          "Melatoninin kemikte fosfata dönüşmesi",
          "TSH’nin pankreas kanalına geçmesi",
        ],
        "Şemaya böbrek-aktif D ara basamağını ekle.",
        "PTH böbrekte D vitamininin etkin biçiminin oluşumunu destekler; aktif D bağırsak kalsiyum emilimini etkiler. Bu önemli dolaylı yolun atlanması bütün bağırsak etkisini doğrudan PTH oku gibi yanlış öğretebilir.",
      ],
      [
        "Bir bölmeye 10 kalsiyum birimi giriyor, 9 birim geri emiliyor; başka akış yok. Çıkış kaç birimdir?",
        "1",
        ["2", "9", "10", "19"],
        "Giriş=geri emilim+çıkış.",
        "Miktar korunumu gereği 10−9=1 birim dışarı çıkar. Geri emilen 9 birim çıkış değildir; bu seçili bölme hesabı gerçek bütün böbreğin günlük miktarını veya hormon düzeyini göstermez.",
      ],
      [
        "Sabit hacimli varsayımsal havuzda 10 kalsiyum birimi var. Kemikten 3 ve bağırsaktan 2 birim girerken 4 birim çıkıyor. Son miktar kaçtır?",
        "11",
        ["5", "9", "15", "19"],
        "Başlangıç+girişler−çıkış.",
        "Son miktar 10+3+2−4=11 birimdir. Tüm değerler aynı kalsiyum miktarı ölçeğindedir; bunlar doğrudan gerçek mg/dL veya gerçek hormon doz-cevap katsayısı olarak yorumlanmaz.",
      ],
      [
        "Kemikten kana kalsiyum ve fosfat geçişi arttığı biliniyor. Net kan fosfatı için hangi ek süreç özellikle dikkate alınmalıdır?",
        "Böbrekten fosfat atımı",
        [
          "Sadece saç rengi",
          "Sadece göz merceğinin kırılması",
          "Oksitosinin süt atımı",
          "Yalnız melanin sentezi",
        ],
        "Bir havuza giriş kadar çıkış da önemlidir.",
        "Kemik çıkışı dolaşıma fosfat ekleyebilir; ancak böbrek atımındaki değişim net havuzu etkiler. PTH’nin fosfat atımını artırabilmesi nedeniyle yalnız bir organın girişinden kesin net kan düzeyi çıkarılmaz.",
      ],
      [
        "Kalsitonin-PTH karşılaştırmasının doğru sınırı hangisidir?",
        "Temel karşıt yönleri öğretir; bütün kalsiyum homeostazını eşit ağırlıklı yalnız iki hormon tüketmez",
        [
          "Aktif D’nin hiçbir rolü yoktur",
          "İki hormon her dokuda birebir aynı etki yapar",
          "PTH tiroid folikülünden çıkan T4’ün adıdır",
          "Böbrek ve bağırsak kalsiyum dengesine katılmaz",
        ],
        "Basit karşıtlık şemasını bütün sistemin yerine koyma.",
        "PTH ve kalsitoninin temel yönlerini karşılaştırmak yararlıdır; insan homeostazında aktif D, böbrek, bağırsak ve kemik süreçleri de önemlidir. Karşıtlık her basamağın tam ters olduğu veya iki hormonun eşit baskın olduğu anlamına gelmez.",
      ],
      [
        "Bir havuzun kalsiyum miktarı artıyor fakat hacmi de değişiyor. Derişim hakkında hangisi doğrudur?",
        "Miktar ve hacim birlikte bilinmeden aynı oranda artış kesin değildir",
        [
          "Miktar artışı derişimi her koşulda aynı oranda artırır",
          "Hacim derişim hesabında hiçbir zaman kullanılmaz",
          "Derişim yalnız PTH molekül sayısıdır",
          "Miktar ile derişim aynı birimdir",
        ],
        "Derişim=miktar/hacim ilişkisini kullan.",
        "Derişim havuzdaki miktarın hacme oranıdır. Hem pay hem payda değiştiğinde yalnız miktar yönü yeterli olmaz; birimleri ve hacim koşulunu korumak hatalı yüzde veya tanı çıkarımını önler.",
      ],
      [
        "Bir kişide kas krampları görülmesi tek başına neyi kanıtlamaz?",
        "Kesin bir paratiroit hastalığı tanısını",
        [
          "Gözlenen bir belirti bulunduğunu",
          "Ek değerlendirmeye ihtiyaç olabileceğini",
          "Belirtinin farklı nedenleri olabileceğini",
          "Mekanizma ile tanının farklı kanıt düzeyleri olduğunu",
        ],
        "Bir belirtiden tek nedene zorunlu sıçrama yapma.",
        "Kas krampları farklı nedenlerle görülebilir. Kalsiyum ve PTH mekanizmalarıyla ilişki kurmak öğreticidir; ancak tek belirti hormon düzeyi, organ kusuru veya kişisel tanı için yeterli kanıt değildir.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Konu Özeti, Bölüm 1, PDF 29–30; OGM Dersler Cepte, Endokrin Sistem II, PDF 10–16. Kaynaklarla karşılaştırılmış özgün anlatım, şema ve öğretim soruları.",
  },
  {
    id: "endokrin-bobrek-ustu",
    topic: "detail-295",
    title: "Böbreküstü bezi: korteks, medulla ve üç denetim yolu",
    minutes: 32,
    objectives: [
      "Korteks steroidlerini medulla katekolaminlerinden ayır.",
      "Kortizol-ACTH, aldosteron-RAAS/potasyum ve medulla-sinir bağlantılarını karşılaştır.",
      "Organ, reseptör ve bağlam değişince etkinin neden tek tip olmadığını açıkla.",
    ],
    sections: [
      {
        title: "Böbreğin üstünde ama böbrekle aynı organ değil",
        paragraphs: [
          "Böbreküstü bezleri böbreklerin üst bölgelerinde bulunan endokrin yapılardır. Dış korteks ve iç medulla farklı hücresel örgütlenme, hormon türü ve denetim ilişkilerine sahiptir. Korteksin steroidleri ile medullanın katekolaminlerini aynı hormonun iki üretim aşaması gibi düşünme. Konum adı organ kimliği değildir; böbreküstü bezi idrar üreten nefronun bir bölümü sayılmaz.",
          "Anatomik olarak ayrı organ olması düzenleyici ilişki bulunmadığı anlamına gelmez. Böbreğin renin-anjiyotensin sistemi aldosteron kontrolüne katılabilir. “Böbreklerden bağımsız” gibi kısa kaynak cümlelerini bütün fizyolojik bağlantılar yokmuş gibi genişletme. Bir anatomik resim üzerinde önce dış-iç bölümü, sonra her bölümün hormon grubunu, en son ilgili kontrol girişini ayrı renksiz etiketlerle de anlaşılır biçimde işaretle.",
        ],
      },
      {
        title: "Korteksin steroid ailesini işlevle gruplandır",
        paragraphs: [
          "Kortekste mineralokortikoidlerin temel örneği aldosteron, glukokortikoidlerin temel örneği kortizoldür; adrenal androjenler de bulunur. Steroid yapı, hücre içi reseptör ve gen ifadesi üzerinden etkilerle ilişkilidir. Aynı kimyasal ailede olmak aynı hedef veya aynı kontrol demek değildir. Aldosteronun iyon-su düzenlenmesiyle kortizolün metabolik-stres ilişkisini ayrı sütunlara yaz.",
          "Korteksin farklı tabakaları farklı ürünlerle ilişkili olsa da bu okul ünitesinin amacı her alt tabakayı ezberden tek başına tanı yapmak değildir. Verilen bir hormonun ana kontrolü ve hedefi öne çıkarılır. Adrenal androjenler eşeysel gelişim ve kıllanma gibi süreçlere katkı verebilir; bütün testosteronun yalnız adrenal kaynaktan geldiği veya androjenlerin yalnız tek eşeyde bulunduğu sonucu çıkarılmaz. Gonad katkıları ayrıca önemlidir.",
        ],
      },
      {
        title: "Kortizol yolu: hipotalamus, ACTH ve geri baskı",
        paragraphs: [
          "Hipotalamik CRH ön hipofizde ACTH yolunu, ACTH adrenal kortekste kortizol salgısını destekler. Kortizolün hipotalamus ve hipofize baskılayıcı geri etkisi negatif geri bildirim oluşturur. Uyaran, hipofiz hormonu ve hedef bez ürünü farklı moleküllerdir. Çizimde hangi ok ileri uyarı, hangisi çıktının geri dönüşü olduğunu adlandırmak ezberi mekanizmaya dönüştürür.",
          "Stres bağlamında eksenin etkinliği değişebilir; zaman, günlük ritim ve başka girdiler de vardır. Aynı anda ACTH ile kortizolün ölçülmüş olması tek başına değişimin hangi nedenle başladığını kanıtlamaz. Soruda diğer koşullar sabit veya giriş basamağı açıkça verilmişse o koşula göre yön çıkarımı yapılır. ACTH-kortizol eksenini medulla ve aldosteronun tek zorunlu yolu gibi bütün beze yayma.",
        ],
      },
      {
        title: "Kortizolün metabolik etkisinde madde kaynağını izle",
        paragraphs: [
          "Kortizol enerji gereksiniminin karşılanmasıyla ilişkili metabolik yanıtları düzenler; karaciğerde glikoz üretimini destekleyen süreçler ve bazı dokularda protein-yağ metabolizmasıyla ilişkiler bulunur. Glikoz üretimi denince hangi karbon kaynağının kullanıldığını düşün: aminoasitler ve trigliseritlerden gelen gliserol katkı sağlayabilir. İnsanlarda bütün çift karbonlu yağ asitlerinden net glikoz üretildiği genellemesi doğru değildir.",
          "Uzun süreli veya aşırı glukokortikoid etkisinin bağışıklık ve doku süreçleriyle farklı sonuçları olabilir; kaynaklardaki “baskılar” ifadesi her bağlamda bütün savunmayı tamamen sıfırlar anlamına gelmez. Düzey, süre ve hedef koşulları önem taşır. Bu bilgiler tedavi dozu veya ilaç bırakma önerisi değildir. Dersin soruları normal düzenleme mantığı ve verilen varsayımsal verilerle sınırlı çıkarım yaptırır.",
        ],
      },
      {
        title: "Aldosteron: sodyum, potasyum ve su ilişkisi",
        paragraphs: [
          "Aldosteron uygun böbrek koşullarında sodyum geri emilimini ve potasyumun tübül sıvısına salgılanıp atılmasını destekler. Sodyum ve su dengesi dolaşım hacmiyle bağlantılıdır; suyun izlediği sonuç uygun su geçirgenliği ve başka koşullara bağlıdır. Bu nedenle aldosteronu doğrudan yeni su üreten hormon veya bütün iyonları aynı yöne taşıyan etken gibi anlatma. Sodyum korunmasıyla potasyum çıkışı ayrı yönlerdir.",
          "Aldosteronun başlıca düzenlenmesinde renin-anjiyotensin sistemi ve kan potasyumu önemlidir. ACTH’nin bazı etkileri bulunabilse de kortizol eksenini aldosteronun tek denetleyicisi saymak yanlıştır. Böbreğin renin sinyali ve anjiyotensin bağlantısı anatomik komşuluğun ötesinde gerçek bir organlar arası iletişimdir. Etkileşimde ACTH, RAAS/potasyum ve sempatik uyarıyı ayrı seçerek hangi temel yolun eşleştiğini kontrol et.",
        ],
      },
      {
        title: "Medulla: sempatik ağdan kana uzanan hızlı yanıt",
        paragraphs: [
          "Medulla adrenalin ve noradrenalin gibi katekolaminlerle ilişkilidir; sempatik sinirsel uyarı önemli bir kontrol girişidir. Bu hücreler, sinir sistemi ile dolaşımsal hormonal yanıt arasında bağlantı kurar. Enerji kullanımı, kalp-dolaşım ve bazı organlara kan dağılımı gibi süreçler kısa süreli yanıtın parçaları olabilir. Medullayı ACTH’nin zorunlu tek hedefi veya kortizolün sentez yeri sayma.",
          "Adrenalin ve noradrenalin aynı hormonun iki eş adı değildir; farklı reseptör ve organlarda etkilerinin ağırlığı değişebilir. Bütün damarların her koşulda genişlediğini veya daraldığını söylemek eksiktir. Kan basıncıyla ilgili refleksler kalp hızının gözlenen sonucunu da etkileyebilir. Bir organ için verilen doğrudan etkiyi bütün vücudun net sonucuyla karıştırmamak, fizyolojinin önemli bir kanıt sınırıdır.",
        ],
      },
      {
        title: "Hedef reseptörü, süre ve geri bildirim birlikte",
        paragraphs: [
          "Aynı dolaşımsal haber farklı reseptörler taşıyan dokularda farklı etkiler oluşturabilir. Bir çizimde tüm hedeflere aynı ok vermek kolay görünse de doğru öğretim için organ ve yol ayrımı gerekir. Kortizolün HPA eksenindeki geri baskısı, medullanın sempatik girişinden farklıdır; aldosteronun böbrek hedefi ise mineral-su dengesiyle bağlantılıdır. Üç yolu tek düğmeye bağlama.",
          "Örneğin verilen iki zaman noktasında kortizol 10’dan 16’ya, ACTH 8’den 4’e değişmiş olabilir. Bu, ters yönlü değişim verisidir ve sağlam negatif geri etkiyle uyumludur; ancak yalnız bu iki ölçüm tüm nedenleri kesin belirlemez. Değerlerin birimi, zamanı ve deney koşulu yoksa gerçek hormon düzeyi karşılaştırması sınırlıdır. Model klinik sayı üretmek yerine yolun eşleşmesini ve açıklama sınırını gösterir.",
        ],
      },
      {
        title: "Karşılaştırma tablosunu yeni duruma uygula",
        paragraphs: [
          "Yeni soruda önce hormon adından korteks mi medulla mı olduğunu seç. Sonra ana uyarı yolunu yaz: kortizol için CRH-ACTH; aldosteron için RAAS/potasyum; katekolamin için sempatik giriş. Ardından hedefteki temel olayı ekle: metabolizma, mineral-su veya kısa süreli organ yanıtı. Bu sıra, isim benzerliklerinden ve organın tek resminden doğan karışıklıkları azaltır.",
          "Her tabloya bir sınır sütunu da ekle: bütün etkiler aynı anda ve aynı ölçüde olmaz; reseptör, süre ve fizyolojik durum önemlidir. Tek yorgunluk, tansiyon veya stres belirtisinden belirli böbreküstü hastalığı tanısı çıkmaz. Uygulamada keşif seçimleri kaydedilir fakat bu bir tanı raporu veya doğru soru sayısı değildir. Gerekçenin amacı tek kelimelik eşleştirmeden neden-sonuç ağına geçmektir.",
        ],
      },
      {
        title: "Kısa yanıtın organ haritasını somutlaştır",
        paragraphs: [
          "Adrenalin için epinefrin, noradrenalin için norepinefrin adları da kullanılır. Sempatik-katekolamin yanıtında kalp etkinliği ve enerji kullanılabilirliği artabilir; bronşların genişlemesi hava akımını destekleyebilir, karaciğerde glikojen yıkımı kan glikozuna katkı verebilir. Göz bebeği genişlemesi ve kılların dikleşmesi gibi gözlemler de sempatik ağ bağlamındadır. Bunların tümünü tek bir reseptör veya yalnız dolaşımdaki tek hormonla açıklamak yerine ortak ağın farklı hedeflerini ayır.",
          "Deri ve bazı iç organlara kan dağılımıyla aktif iskelet kasının gereksinimi farklılaşabilir; damar yanıtlarında reseptör ve yerel metabolik koşullar önemlidir. Kaynak çizimindeki bir organ için genişleme okunu bütün damarların aynı yönde değişmesi diye yayma. Benzer biçimde kortizolün dikkat, hafıza veya ağrı ile ilişkisi süre ve bağlama bağlıdır; kronik stresin her koşulda hafızayı iyileştirdiği veya tek nörotransmitteri sabit miktarda azalttığı evrensel sonuç çıkarılmaz. Ölçülen net yanıt doğrudan etkiyle reflekslerin birleşimidir.",
        ],
      },
      {
        title: "Mineral korunması böbrekle sınırlı değildir",
        paragraphs: [
          "Düşük etkili dolaşım hacmi renin-anjiyotensin yolunu, yüksek kan potasyumu ise aldosteron salımını destekleyen girdilerdir. Sodyum durumunun etkisini bütün örneklerde adrenal hücreye doğrudan tek sinyal gibi çizmek yerine dolaşım ve böbrek bağlantısını koru. Aldosteronun sodyum tutulmasına katkısı ter, tükürük ve bağırsak epiteli gibi böbrek dışı hedeflerde de görülebilir. Bununla birlikte her sıvının bütün iyonları aynı oranda korunmaz.",
          "Korteksin eşey steroidlerine katkısı çoğunlukla adrenal androjenlerle öğretilir; kaynakta küçük miktarlardaki diğer eşey steroidleri de anılır. Bu bilgi kadın ve erkekte yalnız tek bir eşey hormonunun bulunduğunu veya tüm üreme döngüsünün böbreküstünden yönetildiğini göstermez. Kortizol, aldosteron ve adrenal eşey steroidlerini aynı ailede görmek yararlıdır; ama ana kontrol, hedef ve geri etki tablosu her ürün için ayrı tutulur. Kimyasal akrabalık aynı fizyolojik göreve eşit değildir.",
        ],
      },
    ],
    examples: [
      {
        title: "Üç denetim hattı",
        prompt:
          "Kortizol, aldosteron ve adrenalin için temel kontrol girişlerini ayrı eşleştir.",
        strategy: "Önce doku, sonra sinyal.",
        steps: [
          {
            label: "Kortizol",
            explanation: "Korteks ve HPA eksenini seç.",
            expression: "CRH → ACTH",
          },
          {
            label: "Aldosteron",
            explanation: "Korteks ama farklı temel düzenleme vardır.",
            expression: "RAAS / K⁺",
          },
          {
            label: "Adrenalin",
            explanation: "Medulla sinirsel girdi alır.",
            expression: "sempatik uyarı",
          },
        ],
        answer:
          "Kortizol-ACTH; aldosteron-RAAS/potasyum; adrenalin-sempatik giriş.",
        check: "Başlıca yol sözü bütün ikincil etkilerin yokluğu değildir.",
        pitfall: "ACTH’yi bütün beze tek düğme yapma.",
      },
      {
        title: "Ayrı organ, bağlantılı kontrol",
        prompt:
          "Böbrek renin yoluyla anjiyotensin oluşumunu destekliyor; bunun aldosteron salgısına etkisi var. Böbreküstünün ayrı organ olması bu veriyle çelişir mi?",
        strategy: "Anatomi ile iletişimi ayır.",
        steps: [
          {
            label: "Organı tanımla",
            explanation: "Böbreküstü nefron değildir.",
            expression: "ayrı organ",
          },
          {
            label: "Yolu izle",
            explanation: "Böbrek kaynaklı sinyal diğer bezi etkileyebilir.",
            expression: "renin → anjiyotensin",
          },
          {
            label: "Sonuca bağla",
            explanation: "Aldosteron düzenlemesi organlar arasıdır.",
            expression: "aldosteron yanıtı",
          },
        ],
        answer: "Çelişmez; anatomik ayrılık düzenleyici ilişkiyi dışlamaz.",
        check: "Yakınlık tek başına neden değildir, verilen yol kanıttır.",
        pitfall: "Bağımsız organ sözcüğünü iletişim yokluğu sayma.",
      },
      {
        title: "Ölçülen iki değişim",
        prompt:
          "Aynı deneyde verilen normalleştirilmiş kortizol değeri 10’dan 16’ya, ACTH 8’den 4’e değişiyor. Değişimler ve kanıt sınırı nedir?",
        strategy: "Önce farkı, sonra yorumu hesapla.",
        steps: [
          {
            label: "Kortizol farkı",
            explanation: "Son değerden ilk değeri çıkar.",
            expression: "16−10=+6",
          },
          {
            label: "ACTH farkı",
            explanation: "Azalma dört birimdir.",
            expression: "4−8=−4",
          },
          {
            label: "Sınırı belirt",
            explanation:
              "Ters yönlü veri geri baskıyla uyumludur; tek başına bütün nedenleri kanıtlamaz.",
            expression: "uyum ≠ tek neden",
          },
        ],
        answer:
          "Kortizol +6, ACTH −4 birim; nedensellik için ek koşul gerekir.",
        check: "Değerler gerçek klinik eşik değildir.",
        pitfall: "Birlikte değişimi tek başına kesin neden kanıtı sayma.",
      },
      {
        title: "Mineral yönleri",
        prompt:
          "Sağlam böbrekte aldosteron etkisinin arttığı verilen örnekte temel sodyum ve potasyum yönlerini ayır.",
        strategy: "Geri emilim ve salgılamayı ayrı yaz.",
        steps: [
          {
            label: "Sodyum",
            explanation: "Vücuda geri kazanım desteklenir.",
            expression: "Na⁺ geri emilimi↑",
          },
          {
            label: "Potasyum",
            explanation: "Tübül sıvısına salgılama desteklenir.",
            expression: "K⁺ atımı↑",
          },
          {
            label: "Suyu sınırla",
            explanation:
              "Su dengesi geçirgenlik ve başka koşullarla birlikte okunur.",
            expression: "yeni su üretimi yok",
          },
        ],
        answer: "Na⁺ korunması ve K⁺ atımı artan yönde olabilir.",
        check: "Tüm iyonlar aynı yönde hareket etmez.",
        pitfall:
          "Hormonun su yarattığını veya bütün mineralleri tuttuğunu söyleme.",
      },
    ],
    recall: [
      {
        prompt: "Korteksin başlıca steroid örnekleri nelerdir?",
        answer: "Kortizol, aldosteron ve adrenal androjenler.",
      },
      {
        prompt: "Medullanın önemli sinirsel kontrolü nedir?",
        answer:
          "Sempatik giriş; adrenalin/noradrenalin salımıyla bağlantılıdır.",
      },
      {
        prompt: "Aldosteron kontrolü neden yalnız ACTH değildir?",
        answer: "RAAS ve kan potasyumu başlıca düzenleyicilerdir.",
      },
      {
        prompt: "Katekolaminlerin bütün damar etkileri aynı mıdır?",
        answer: "Hayır; organ, reseptör ve refleks bağlamı önemlidir.",
      },
    ],
    items: [
      [
        "Böbreküstü bezi için doğru doku-hormon eşleştirmesi hangisidir?",
        "Korteks-kortizol; medulla-adrenalin",
        [
          "Korteks-insülin; medulla-T4",
          "Korteks-melatonin; medulla-PTH",
          "Korteks-oksitosin; medulla-ADH",
          "Korteks-glukagon; medulla-TSH",
        ],
        "Dış steroid bölümüyle iç katekolamin bölümünü ayır.",
        "Korteks steroid hormonlarla, medulla katekolaminlerle ilişkilidir. Kortizol korteksin, adrenalin medullanın örneğidir; iki bölüm aynı hormonun ardışık üretim basamakları değildir.",
      ],
      [
        "Kortizol yolunun temel ileri sırası hangisidir?",
        "Hipotalamus CRH → ön hipofiz ACTH → adrenal korteks kortizol",
        [
          "Hipotalamus T4 → pankreas ACTH → medulla insülin",
          "Böbrek renini → tiroid prolaktini → epifiz kortizol",
          "Ön hipofiz melanin → hipotalamus glukagon → korteks ADH",
          "Pankreas TSH → medulla PTH → böbrek kortizol",
        ],
        "Uyaran, hipofiz ürünü ve hedef bez ürününü ayrı tut.",
        "HPA ekseninde hipotalamik CRH ön hipofiz ACTH yolunu, ACTH de korteks kortizol yolunu destekler. Kortizolün üst merkezlere baskılayıcı dönüşü negatif geri bildirimdir.",
      ],
      [
        "Aldosteronun başlıca düzenlenmesini doğru belirten seçenek hangisidir?",
        "Renin-anjiyotensin sistemi ve kan potasyumu önemlidir",
        [
          "Tek ve her koşuldaki kontrol yalnız ACTH’dir",
          "Yalnız ışığın retinaya gelmesi belirler",
          "Yalnız prolaktinin süt sentezi belirler",
          "Yalnız T3 molekülünün iyot sayısı belirler",
        ],
        "Aynı kortekste olmayı aynı tek kontrol sayma.",
        "Aldosteron düzenlenmesinde RAAS ve potasyum önemli temel girdilerdir. ACTH etkilerini mutlak yok saymak gerekmez; fakat kortizol eksenini aldosteronun tek ve zorunlu denetimi yapmak doğru değildir.",
      ],
      [
        "Sağlam böbrekte aldosteronun temel etkileri hangi yönde olabilir?",
        "Sodyum geri emilimi ve potasyum atımı artar",
        [
          "Sodyum ve potasyum her koşulda aynı miktarda tutulur",
          "Sodyum yeni atomlardan üretilir",
          "Bütün su molekülleri hormona dönüşür",
          "Potasyumun tübüle geçişi her koşulda sıfırlanır",
        ],
        "Her iyon için farklı taşıma yönünü düşün.",
        "Aldosteron sodyum geri emilimini ve potasyumun tübül sıvısına salgılanıp atılmasını destekler. Su dengesi ek koşullara bağlıdır; bu durum su yaratılması veya bütün minerallerin aynı yönde tutulması değildir.",
      ],
      [
        "Medulladan katekolamin salımında temel kontrol girişlerinden biri hangisidir?",
        "Sempatik sinirsel uyarı",
        [
          "TSH’nin tiroid folikülüne bağlanması",
          "FSH’nin folikül gelişimi",
          "PTH’nin aktif D yolu",
          "Pankreas kanalındaki sindirim enzimi",
        ],
        "Sinir sistemi ile hormon salımının bağlantısını ara.",
        "Böbreküstü medullası sempatik sinirsel girdiyle ilişkilidir. Katekolaminler dolaşıma hormonal yanıt sağlar; bu yol ACTH-kortizol ekseninden ve pankreasın ekzokrin kanalından farklıdır.",
      ],
      [
        "Adrenalin ve noradrenalin etkileri için hangi yaklaşım uygundur?",
        "Organ, reseptör ve refleks koşullarına göre net etkiler farklılaşabilir",
        [
          "Bütün damarlar her koşulda aynı yönde değişir",
          "İki ad aynı molekülün tam eş anlamıdır",
          "Her gözlenen kalp hızı sonucu yalnız tek doğrudan etkidir",
          "Bütün hedefler aynı reseptör ve yanıtı zorunlu taşır",
        ],
        "Yerel doğrudan etki ile bütün sistem sonucunu ayır.",
        "Katekolaminlerin etkileri reseptör tipi ve organa göre değişebilir; kan basıncı refleksleri net kalp hızını etkileyebilir. Bütün damarlar veya her koşul için tek değişmez sonuç genellemesi doğru değildir.",
      ],
      [
        "İnsanda kortizol-glikoz üretimi ilişkisi anlatılırken hangi ifade uygundur?",
        "Aminoasit ve gliserol gibi kaynaklar katkı verebilir; tüm çift karbonlu yağ asitleri net glikoza çevrilmez",
        [
          "Bütün yağ asitleri koşulsuz net glikoza çevrilir",
          "Kortizol glikoz adlı aynı moleküldür",
          "Glikoz üretiminde karbon kaynağına gerek yoktur",
          "Kortizol yalnız fotosentez yapan bir enzimdir",
        ],
        "Trigliseritin gliserol kısmıyla bütün yağ asitlerini eşitleme.",
        "Glukoneogenezde aminoasitler ve gliserol gibi kaynaklar önemlidir. İnsanlarda bütün çift karbonlu yağ asitlerinden net glikoz elde edildiği genellemesi yanlıştır; enerji sağlama ile net karbon kazanımı farklıdır.",
      ],
      [
        "Bir deneyde normalleştirilmiş kortizol 10’dan 16’ya, ACTH 8’den 4’e değişiyor. Değişimler sırasıyla kaçtır?",
        "+6 ve −4",
        ["+26 ve +12", "−6 ve +4", "+4 ve −6", "−16 ve −8"],
        "Son değer eksi ilk değer.",
        "Kortizol farkı 16−10=+6, ACTH farkı 4−8=−4 birimdir. Bu ters yönlü değişim geri baskıyla uyumlu olabilir; yalnız iki ölçüm tüm nedensel koşulları veya klinik tanıyı göstermez.",
      ],
      [
        "Böbreküstü bezinin böbrekten ayrı bir organ olmasıyla ilgili hangi genelleme yanlıştır?",
        "Böbrekle hiçbir düzenleyici ilişkisi olmadığı iddiasını",
        [
          "Korteks ve medulla ayrımı yapılabildiğini",
          "İdrar oluşturan nefronun kendisi olmadığını",
          "Organ kimliği ile komşuluğun farklı olduğunu",
          "Böbrekten gelen sinyallerin başka organları etkileyebileceğini",
        ],
        "Anatomik ayrılığı iletişimsizlik sayma.",
        "Böbreküstü ayrı bir endokrin organdır; buna rağmen böbreğin renin-anjiyotensin yolu aldosteron düzenlenmesine katılabilir. Dolayısıyla ayrı organ oluşu bütün fizyolojik ilişkinin yokluğunu kanıtlamaz.",
      ],
      [
        "Adrenal androjenler için hangi ifade uygundur?",
        "Korteks kaynaklı katkıları vardır; gonad hormonlarının bütününü tek başına oluşturmaz",
        [
          "Yalnız medullada sentezlenen tüm vücut testosteronudur",
          "Yalnız tek eşeyde bulunabilen pigmenttir",
          "Melatoninin başka adıdır",
          "Sadece pankreasın ekzokrin enzimidir",
        ],
        "Katkı ile tek kaynak olmayı ayır.",
        "Adrenal androjenler korteks ürünlerindendir ve eşeysel özelliklerle ilgili süreçlere katkı verebilir. Gonad kaynakları ve doku metabolizması da bulunduğundan bütün eşey hormonlarını yalnız adrenal kaynağa indirgemek doğru değildir.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Konu Özeti, Bölüm 1, PDF 31–32; OGM Dersler Cepte, Endokrin Sistem II, PDF 10–16. Kaynaklarla karşılaştırılmış özgün anlatım, şema ve öğretim soruları.",
  },
  {
    id: "endokrin-pankreas",
    topic: "detail-296",
    title: "Pankreas: öğün, açlık ve glikozun izlediği yollar",
    minutes: 32,
    objectives: [
      "Ekzokrin kanal ile adacıkların kana salgısını ayır.",
      "İnsülin ve glukagonun karaciğer, kas ve yağ hedeflerini koşullarıyla açıkla.",
      "Sınırlı depoda aktarımı ve glikoz birim dönüşümünü hesapla.",
    ],
    sections: [
      {
        title: "Aynı organın iki farklı çıkışı",
        paragraphs: [
          "Pankreasın ekzokrin bölümü sindirime katılan salgıları kanallarla ince bağırsağa gönderir. Endokrin adacıklar ise hormonlarını kana verir. Bu nedenle karma bez adı kullanılır; ama her pankreas hücresi hem bütün enzimleri hem bütün hormonları aynı anda yapan tek tip hücre değildir. Şemada kan damarıyla sindirim kanalını farklı yollar olarak görmek işlevleri ayırır.",
          "Langerhans adacıklarında β hücreleri insülin, α hücreleri glukagonla ilişkilidir. Bunlar temel karşılaştırma örnekleridir; adacıkların yalnız bu iki hücre türünden ve yalnız iki hormon işlevinden oluştuğu sonucu çıkarılmaz. Örneğin somatostatinle ilişkili δ hücreleri de bulunur. Bu ünitenin odağı glikoz düzenleme zinciridir; organın diğer işlevleri bu zincirle aynı moleküle indirgenmez.",
        ],
      },
      {
        title: "Kan glikozu bir havuzun anlık derişimidir",
        paragraphs: [
          "Besinlerin sindirimi-emilimi, karaciğerin üretim ve depolaması, dokuların tüketimi ve hormon sinyalleri kan glikozunu birlikte etkiler. Öğün sonrasında artma, açlıkta korunma gereksinimi basit başlangıç bağlamlarıdır; gerçek zaman dizisi tek bir düğmeyle açıklanmaz. Kanda bulunan glikoz miktarı ile dokudaki glikojen miktarı farklı havuzlardır. Molekülün nereye girip nereden çıktığını izlemek önemli bir başlangıçtır.",
          "Kaynaklarda verilen 90 mg/100 mL gibi bir değer öğretim referansı olabilir; herkesin her zamanda zorunlu aynı sayıda olması veya bu tek değerin tek başına tanı koydurması anlamına gelmez. Ölçümün zamanı, açlık-öğün durumu ve yöntemi önemlidir. Bu dersteki sayısal havuzlar varsayımsal glikoz eşdeğeri birimleridir; gerçek kişinin kan şekerini veya ilaç gereksinimini tahmin etmez.",
        ],
      },
      {
        title: "İnsülin: uygun hedefte kullanım ve depolamayı destekle",
        paragraphs: [
          "İnsülin öğün sonrasındaki glikoz düzenlemesinde, kas ve yağ dokusunda GLUT4 taşıyıcılarının zarla ilişkili düzenlenmesi üzerinden glikoz alımını destekler. Karaciğerde glikojen sentezi ve glikoz metabolizmasının düzenlenmesi de önemlidir. Her iki doku sonucuna aynı “kapıyı açma” benzetmesini koşulsuz uygulamak yanlıştır: karaciğerin temel glikoz taşıması GLUT2 ile ilişkilidir, GLUT4 üzerinden değildir.",
          "İnsülinin varlığı bütün hücrelerde aynı alım mekanizması olduğu anlamına gelmez. Beyin ve eritrosit gibi örneklerde glikoz girişi bu kas-yağ GLUT4 düzenlemesine aynı biçimde bağımlı değildir. İnsülin azlığında veya etkisizliğinde “bütün vücut hücrelerine hiç glikoz giremez” demek bu farklılıkları siler. Hormonun depo ve metabolizma etkileriyle hücre zarındaki taşıyıcı tipini ayrı açıklamak daha doğrudur.",
        ],
      },
      {
        title: "Glukagon: karaciğerden kana destek, sınırlı depo",
        paragraphs: [
          "Glukagon açlık bağlamında karaciğerin glikojen yıkımı ve glikoz üretimini destekleyerek kan glikozunun korunmasına katkı sağlar. Karaciğer deposu ile kas glikojeni aynı amaçla kullanılmaz; kas kendi gereksinimi için depo kullanır. Glukagonu doğrudan bütün kas glikojenini serbest glikoz olarak kana boşaltan düğme gibi öğretme. Karaciğerdeki süreçlerin enzim ve doku özellikleri önemlidir.",
          "Glikojen deposu sınırsız değildir. Varsayımsal karaciğer deposunda yalnız 3 glikoz eşdeğeri kalmışsa istenen 5 birimin tamamı yalnız bu depodan verilemez; en çok 3 birim aktarılır. Gerçek vücutta glukoneogenez gibi başka yollar da bulunabilir, ancak yalnız depo aktarımı verilen modelde bunlar kendiliğinden eklenmez. Böylece hangi kaynakların hesaba dahil edildiği hem şekil hem soruda açık kalır.",
        ],
      },
      {
        title: "Karşıt hormonlar ve negatif geri bildirim",
        paragraphs: [
          "Kan glikozu artışının insülin yanıtını desteklemesi, ardından uygun hedeflerde kullanım-depolamanın artması başlangıç artışını sınırlayan bir döngü kurabilir. Düşüş bağlamında glukagonun karaciğer katkısı da sapmayı azaltır. İki hormonun temel karşıt yönleri, bütün hücrelerde her olayın birebir ters yürüdüğü veya tüm glikoz dengesini yalnız iki molekülün yaptığı anlamına gelmez.",
          "Adrenalin, kortizol, büyüme hormonu ve sinirsel-metabolik koşullar gibi başka girdiler de dengeye katılabilir. Öğün ile açlık iki yararlı bağlamdır, fakat hormonların gün içinde kesin yalnız açık veya yalnız kapalı olduğu anahtarlar değildir. Bir deneyde yalnız verilen hormon ve depo yolunu incelemek açıklığı artırır; bu dar modelin sınırını gerçek bütün vücut düzenlemesine taşımamak gerekir.",
        ],
      },
      {
        title: "Tip 1 ve Tip 2 mekanizmalarını karıştırma",
        paragraphs: [
          "Tip 1 diyabette insülin üreten β hücrelerinin kaybıyla ilişkili ciddi insülin eksikliği temel mekanizmadır; sık görülen otoimmün bağlam bu ayrımı anlamaya yardımcı olur. Tip 2 diyabette insülin direnci ve zaman içinde β hücre işlevindeki yetersizlik birlikte önem taşıyabilir. Tip 2’yi yalnız bir kişinin tercihi veya yalnız çok şeker yemesiyle açıklamak çok etkenli yapıyı gereksiz biçimde daraltır.",
          "Yüksek kan glikozu tek başına diyabet tipini, tek nedeni veya bütün hücrelerdeki glikoz miktarını belirlemez. İdrarla glikoz ve su kaybı gibi ilişkiler uygun eşik ve böbrek koşulları gerektirir; her küçük artış için koşulsuz aynı sonuç verilmez. ADH ile ilişkili şekersiz diyabet su dengesi mekanizmasıdır ve insülin-glikoz bozukluğuyla aynı hastalık değildir. Benzer adlar aynı yol anlamına gelmez.",
        ],
      },
      {
        title: "Birim dönüşümünde madde ve hacmi koru",
        paragraphs: [
          "90 mg/dL, 100 mL’de 90 mg anlamına gelir. Bir litre on desilitre olduğundan 900 mg/L, yani 0,9 g/L eder. Glikoz mol kütlesi 180 g/mol verildiğinde 0,9/180=0,005 mol/L=5 mmol/L hesaplanabilir. Birimin her adımda yazılması, yalnız 90 sayısını alıp farklı birimlerde aynı kalıyormuş gibi kullanmayı önler.",
          "Bu dönüşüm bir mekanizma veya tanı hesabı değildir; aynı derişimin farklı birimlerde ifadesidir. Toplam glikoz miktarı istenirse ayrıca hacimle çarpılır; yalnız derişimden bir kişinin toplam kan şekeri miktarı bulunmaz. Etkileşimdeki iki havuz ise glikoz eşdeğeri miktarlarıdır, mg/dL değildir. Sabit hacim veya gerçek fizyolojik katsayı verilmeden miktarı derişim gibi yorumlama.",
        ],
      },
      {
        title: "Aktarım modelini kütle korunumu ve hedef farkıyla oku",
        paragraphs: [
          "Varsayımsal modelde kan havuzu 20, karaciğer glikojen havuzu 50 glikoz eşdeğeri birimle başlar. İnsülinle ilişkili depolama yönünde 5 birim aktarılırsa kan 15, depo 55 olur; toplam 70 korunur. Glukagonla ilişkili ters aktarımda kan 25, depo 45 olur. Bu sabit toplam yalnız modelde başka üretim veya tüketim yolunun kapalı tutulmasından kaynaklanır.",
          "Gerçek vücutta dokular glikoz tüketir, bağırsak ekler ve karaciğer başka kaynaklardan üretir; model bütün metabolizmayı tüketmez. “Hedef yanıtı engelli” seçimi de yalnız gösterilen karaciğer aktarımını durduran deney varsayımıdır, tüm tip 2 diyabeti tek düğmede simüle etmez. Kas, yağ, karaciğer ve eritrosit kartlarını karşılaştırarak sayıların yanında taşıma-metabolizma farkını da açıklamayı dene.",
        ],
      },
      {
        title: "Besin fazlasını depolama ve açlık kaynağını ayır",
        paragraphs: [
          "İnsülin etkisi karaciğer ve kas glikojen sentezini, uygun yağ dokusunda yağ depolanmasını ve protein sentezini destekleyen metabolik yönler içerir. Karaciğerde glikojen yıkımı ve yeni glikoz üretiminin baskılanması kan glikozu artışını sınırlamaya katkı verir. Bu yolların tamamını yalnız hücre zarında bir taşıyıcının açılması diye açıklamak eksik kalır. Molekülün glikojen, yağ veya protein havuzuna girişi farklı enzim ve kaynaklar gerektirir.",
          "Açlıkta karaciğer yalnız glikojenden değil, aminoasit ve gliserol gibi kaynaklardan glikoz üretimine de katkı sağlayabilir. Gliserolün yağ yıkımıyla sağlanması bütün yağ asitlerinden insanda net glikoz üretildiği anlamına gelmez. Glukagonun karaciğer rolü güçlü bir temel örnektir; yağ dokusuna her fizyolojik durumda tek ve doğrudan aynı etkiyi yaptığı genellemesi kurulmaz. Etkileşimde bu ek üretim yolları kapalı tutulur; bu yüzden depodaki sınır gerçek bütün açlık metabolizmasının sınırı değildir.",
        ],
      },
    ],
    examples: [
      {
        title: "Kanal ve kan",
        prompt:
          "Pankreasın A bölümü sindirim salgısını kanalla bağırsağa, B adacığı insülini kana veriyor. İki salgı tipini ayır.",
        strategy: "Salgının son yoluna bak.",
        steps: [
          {
            label: "A yolu",
            explanation: "Organ boşluğuna kanal vardır.",
            expression: "ekzokrin",
          },
          {
            label: "B yolu",
            explanation: "Hormon dolaşıma katılır.",
            expression: "endokrin",
          },
          {
            label: "Organı adlandır",
            explanation: "İki örgütlenme birlikte bulunur.",
            expression: "karma bez",
          },
        ],
        answer: "A ekzokrin; B endokrin; pankreas karma bezdir.",
        check: "Aynı organ bütün hücreleri tek tip yapmaz.",
        pitfall: "İnsülini sindirim kanalında çalışan enzim sayma.",
      },
      {
        title: "İki havuzda beş birim aktarım",
        prompt:
          "Kan 20, karaciğer deposu 50 glikoz eşdeğeri birimdir. Yalnız depodan kana 5 birim aktarılıyor. Son havuzlar nedir?",
        strategy: "Verici çıkar, alıcı ekle.",
        steps: [
          {
            label: "Kan",
            explanation: "Kan havuzu beş birim kazanır.",
            expression: "20+5=25",
          },
          {
            label: "Depo",
            explanation: "Depo aynı miktarı kaybeder.",
            expression: "50−5=45",
          },
          {
            label: "Toplam",
            explanation: "Başka yol yoksa toplam korunur.",
            expression: "25+45=70",
          },
        ],
        answer: "Kan 25, depo 45; toplam 70 birim.",
        check: "Bu miktar aktarımı gerçek kan derişimi değildir.",
        pitfall: "Alıcıya ekleyip vericiden çıkarmayı unutma.",
      },
      {
        title: "Depo sınırlıysa",
        prompt:
          "Kan 20, karaciğer deposu 3 birim. Yalnız glikojen deposundan kana aktarım modelinde 5 birim isteniyor. Kaç birim aktarılabilir?",
        strategy: "İstenen ile mevcut olanın küçüğünü al.",
        steps: [
          {
            label: "Sınır",
            explanation: "Depoda yalnız üç birim vardır.",
            expression: "mevcut=3",
          },
          {
            label: "Aktarım",
            explanation: "Modelde başka üretim kaynağı yoktur.",
            expression: "min(5,3)=3",
          },
          {
            label: "Son havuz",
            explanation: "Depo boşalır ve kan üç birim artar.",
            expression: "kan23; depo0",
          },
        ],
        answer: "3 birim aktarım; kan 23, depo 0.",
        check: "Gerçek glukoneogenez bu dar modele dahil edilmemiştir.",
        pitfall: "Eksik iki birimi kendiliğinden yaratma.",
      },
      {
        title: "Derişim birimini değiştir",
        prompt:
          "90 mg/dL glikozu mmol/L olarak yaz. Glikoz mol kütlesi 180 g/mol veriliyor.",
        strategy: "Önce litre ve gram, sonra mol.",
        steps: [
          {
            label: "Hacim birimi",
            explanation: "Bir litre on desilitredir.",
            expression: "90×10=900 mg/L",
          },
          {
            label: "Kütle birimi",
            explanation: "Bin mg bir gramdır.",
            expression: "900 mg/L=0,9 g/L",
          },
          {
            label: "Mol",
            explanation: "Mol kütlesine böl ve milimole çevir.",
            expression: "0,9/180=0,005 mol/L=5 mmol/L",
          },
        ],
        answer: "5 mmol/L.",
        check: "Bu birim dönüşümü kişisel tanı sınırı değildir.",
        pitfall: "mg/dL değerini doğrudan 180’e bölüp birimleri atlama.",
      },
    ],
    recall: [
      {
        prompt: "İnsülin ve glukagonun adacık kaynakları nedir?",
        answer:
          "β-insülin; α-glukagon, fakat adacıkta başka hücreler de vardır.",
      },
      {
        prompt: "Kas-yağ ile karaciğer glikoz alımında neyi ayırırız?",
        answer:
          "Kas-yağ GLUT4 düzenlenmesi; karaciğerde GLUT2 ve metabolik kontrol.",
      },
      {
        prompt: "Glukagon kas glikojenini doğrudan kana mı boşaltır?",
        answer: "Hayır; temel kan glikozu katkısında karaciğer yolu ayrıdır.",
      },
      {
        prompt: "İnsülin eksikliği bütün hücreye glikoz girişini sıfırlar mı?",
        answer: "Hayır; eritrosit ve beyin gibi farklı giriş düzenleri vardır.",
      },
    ],
    items: [
      [
        "Pankreas adacıklarında doğru temel eşleştirme hangisidir?",
        "β hücresi-insülin; α hücresi-glukagon",
        [
          "β hücresi-T4; α hücresi-TSH",
          "β hücresi-ADH; α hücresi-oksitosin",
          "β hücresi-melanin; α hücresi-PTH",
          "β hücresi-kortizol; α hücresi-aldosteron",
        ],
        "İki adacık hormonunun kaynaklarını ayır.",
        "İnsülin β, glukagon α hücreleriyle ilişkilidir. Bu temel eşleştirme adacıkta yalnız iki hücre türü olduğu anlamına gelmez; somatostatinle ilişkili başka hücreler de bulunur.",
      ],
      [
        "Pankreasın karma bez olması hangi iki yolu birlikte içerir?",
        "Sindirim salgısının kanalla bağırsağa, hormonun kana verilmesi",
        [
          "İnsülinin hem DNA’ya hem RNA’ya dönüşmesi",
          "Bütün hücrelerin aynı anda tek hormon yapması",
          "Yalnız kana iki farklı kan damarı açılması",
          "Bütün salgıların yalnız idrarla çıkması",
        ],
        "Karma bez için ekzokrin ve endokrin örgütlenme gerekir.",
        "Pankreas ekzokrin salgılarını kanalla sindirim kanalına, adacık hormonlarını dolaşıma verir. Farklı çıkış yolları farklı hedef ve işlevleri açıklar; iki işlev aynı hücre türünü zorunlu kılmaz.",
      ],
      [
        "İnsülinin kas ve yağ dokusundaki glikoz alımını destekleyen temel taşıyıcı düzenlemesi hangisidir?",
        "GLUT4’ün zarla ilişkili düzenlenmesi",
        [
          "Bütün dokularda yalnız GLUT2’nin yok edilmesi",
          "Glikozun her hücrede doğrudan TSH’ye çevrilmesi",
          "Eritrositin çekirdeğinde yeni pankreas oluşması",
          "Glikozun hücre zarından hiçbir zaman geçememesi",
        ],
        "Kas-yağ hedefini karaciğerle eşitleme.",
        "Kas ve yağdaki insüline duyarlı glikoz alımı GLUT4 düzenlenmesiyle ilişkilidir. Karaciğerin GLUT2 taşıması ve metabolizma kontrolü farklıdır; bütün dokuların aynı kapı modeline indirgenmesi yanlıştır.",
      ],
      [
        "İnsülin eksikliği için hangi genelleme doğru değildir?",
        "Beyin dışındaki bütün hücrelere glikoz girişi kesin sıfır olur",
        [
          "Kas ve yağın insüline duyarlı alımı etkilenebilir",
          "Karaciğerde metabolik düzenleme değişebilir",
          "Dokuya göre taşıyıcı mekanizmaları ayrılır",
          "Eritrosit gibi hücrelerde farklı giriş düzenleri vardır",
        ],
        "Bütün hücreler sözü farklı taşıyıcı yollarını siler.",
        "İnsülin yokluğu bütün hücrelerde glikoz girişinin sıfırlanması değildir. Eritrosit ve beyin gibi örnekler, karaciğerin GLUT2 ilişkisi ve kas-yağ GLUT4 düzenlenmesi hedeflerin farklı olduğunu gösterir.",
      ],
      [
        "Glukagonun kan glikozunu korumaya katkısında temel depo hedefi hangisidir?",
        "Karaciğer glikojeni",
        [
          "Bütün kas glikojeninin doğrudan kana aynı biçimde boşalması",
          "Yalnız saçtaki melanin",
          "Tiroidin iyot atomlarının glikoza dönüşmesi",
          "Bütün kemik kalsiyumunun şekere dönüşmesi",
        ],
        "Karaciğer ve kasın depo kullanım amaçlarını ayır.",
        "Glukagon karaciğerin glikojen yıkımı ve glikoz üretimiyle kan glikozuna destek olabilir. Kas glikojeni kasın kendi gereksinimiyle ilişkilidir; glukagon bütün kas deposunu doğrudan kana boşaltan tek yol değildir.",
      ],
      [
        "Kan havuzu 20, karaciğer glikojen havuzu 50 glikoz eşdeğeri birimdir. Başka yol yokken depodan kana 5 birim aktarılır. Son değerler hangisidir?",
        "Kan 25; depo 45",
        [
          "Kan 25; depo 55",
          "Kan 15; depo 45",
          "Kan 20; depo 55",
          "Kan 50; depo 20",
        ],
        "Aynı miktarı vericiden çıkarıp alıcıya ekle.",
        "Kan 20+5=25, depo 50−5=45 olur. Toplam 70 korunur; bunlar verilen varsayımsal miktarlardır ve doğrudan gerçek kan derişimi veya hormon dozu değildir.",
      ],
      [
        "Yalnız depodan kana aktarım modelinde kan 20, depo 3 birimdir. 5 birim isteniyor; başka üretim yolu yok. En çok kaç birim aktarılır?",
        "3",
        ["0", "2", "5", "8"],
        "Aktarım mevcut depoyu aşamaz.",
        "İstenen beş birim olsa da depoda yalnız üç birim bulunduğu için min(5,3)=3 birim aktarılır. Kan 23, depo 0 olur; modelde olmayan glukoneogenez yoluyla eksik miktar kendiliğinden eklenmez.",
      ],
      [
        "90 mg/dL glikoz kaç mmol/L eder? Glikoz mol kütlesi 180 g/mol ve 1 L=10 dL olarak veriliyor.",
        "5",
        ["0,5", "9", "50", "90"],
        "Önce 900 mg/L=0,9 g/L yaz.",
        "0,9 g/L değeri 180 g/mol’e bölünür: 0,005 mol/L=5 mmol/L. Hacim ve kütle birimleri birlikte çevrilmelidir; bu hesap aynı derişimin farklı birimle yazılmasıdır, tanı hesabı değildir.",
      ],
      [
        "Tip 1 ve Tip 2 diyabet için hangi karşılaştırma uygundur?",
        "Tip 1’de ciddi insülin eksikliği; Tip 2’de direnç ve β hücre yetersizliği birlikte önem taşıyabilir",
        [
          "İkisi de yalnız ADH’nin yeni su üretmesidir",
          "Tip 2 her kişide yalnız tek davranıştan kaynaklanır",
          "Tip 1 bütün hücrelerde glikozun kesin sıfır olmasıdır",
          "İki ad tüm hastalarda aynı tek mekanizmadır",
        ],
        "Hormon üretimi ile hedef duyarlılığı farklı başlangıçlardır.",
        "Tip 1’de β hücre kaybıyla ilişkili insülin eksikliği, Tip 2’de insülin direnci ve zaman içinde β hücre işlev bozukluğu önemlidir. Çok etkenli mekanizmalar tek davranışa veya bütün hücrelerde sıfır glikoza indirgenmez.",
      ],
      [
        "ADH ile ilişkili şekersiz diyabet ile insülin-glikoz bozukluğu arasındaki doğru ayrım hangisidir?",
        "Benzer adlara rağmen temel düzenlenen yollar su dengesi ve glikoz metabolizması olarak farklıdır",
        [
          "İki ad aynı hormonun tam eş anlamıdır",
          "ADH insülinin pankreas kanalındaki biçimidir",
          "Glukagon yalnız böbrekte su geçirgenliği yapar",
          "Bütün yüksek idrar miktarları kesin aynı nedenle oluşur",
        ],
        "Ad benzerliğini mekanizma eşitliği sayma.",
        "ADH sentez-salım veya böbrek yanıtı bozuklukları su dengesiyle ilişkilidir; diyabetes mellitus insülin etkisi ve glikoz düzenlenmesi bağlamındadır. Tek belirti veya benzer isim iki mekanizmanın aynı olduğunu kanıtlamaz.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Konu Özeti, Bölüm 1, PDF 32; OGM Dersler Cepte, Endokrin Sistem II, PDF 10–16. Kaynaklarla karşılaştırılmış özgün anlatım, şema ve öğretim soruları.",
  },
  {
    id: "endokrin-epifiz",
    topic: "detail-297",
    title: "Epifiz: ışık, karanlık ve biyolojik saatin ritmi",
    minutes: 32,
    objectives: [
      "Epifiz melatoninini melanin pigmenti ve MSH’den ayır.",
      "Retina-hipotalamik saat-sinirsel yol-epifiz ilişkisini sırala.",
      "Gece süresi ile faz kaymasını 24 saatlik modelde ayrı yorumla.",
    ],
    sections: [
      {
        title: "Epifiz bir ritim düğümüdür",
        paragraphs: [
          "Epifiz, beynin epitalamus bölgesiyle ilişkili küçük bir endokrin yapıdır; melatonin salgısıyla tanınır. Önceki beyin anatomisi dersindeki konum bilgisi burada bir hormon ağına bağlanır. Melatonin ışık-karanlık döngüsü ve sirkadiyen zamanlamayla ilişkilidir. “Uyku hormonu” kısaltması bir başlangıç olabilir, fakat bütün uyku ve uyanıklık mekanizmalarını tek molekülün aç-kapa düğmesine indirgememelidir.",
          "Uyku gereksinimi, uyanıklık ağları, davranış, çevresel zamanlayıcılar ve hormonal ritimler birlikte çalışır. Bu nedenle birinin uykulu olması melatonin düzeyini ölçmüş olmak değildir; melatoninin bulunması da her koşulda kesin uykuya geçiş garantisi vermez. Bu derste salgının zamanlanması ve ışık bilgisinin yolu öğretilir. Kişiye ilaç, takviye dozu veya uyku bozukluğu tanısı seçen bir araç kurulmaz.",
        ],
      },
      {
        title: "Benzer üç ad, üç farklı kavram",
        paragraphs: [
          "Melatonin epifizle ilişkili hormonal habercidir; melanin deride ve başka dokularda bulunan pigmenttir. MSH ise melanokortin sinyalleriyle ilişkili ayrı bir hormon adıdır. Sözcüklerin ortak heceler taşıması aynı molekülü, aynı kaynağı veya aynı temel işi göstermez. İnsanda epifiz melatonininin temel görevi “deriyi renklendirmek” şeklinde öğretilmemelidir; bu kaynak kısaltması yanlış ana fikir oluşturabilir.",
          "Bir kavram kartına molekül türü, kaynak ve ana bağlam yazmak ayrımı güçlendirir. Melatonin için epifiz-ritim; melanin için pigment; MSH için hormonal pigment düzenleme bağlamı uygun başlangıçtır. Türler arası farklı bulguları insan fizyolojisine koşulsuz taşımamak gerekir. Ayrıca melatoninin üreme zamanlamasıyla ilişkileri bulunabilse de insan menstrual döngüsünün tümünü yalnız bu hormonun yönettiği sonucu çıkarılmaz.",
        ],
      },
      {
        title: "Işık bilgisi doğrudan gözden epifize atlamaz",
        paragraphs: [
          "Retina çevresel ışık bilgisini algılayan sinirsel sistemin başlangıcındadır. Bu bilgi hipotalamustaki sirkadiyen saat ağlarına, özellikle suprakiazmatik çekirdek bağlantısına ulaşır. Epifize giden düzenleme sinirsel ve sempatik basamaklar üzerinden iletilir. Böylece göz, hipotalamik zamanlayıcı ve endokrin çıktı bir ağ içinde bağlanır; epifiz kendisine doğrudan görüntü düşen ikinci bir göz gibi sunulmaz.",
          "Bu rota ön hipofize portal kanla giden RH/IH yolu değildir; epifiz de arka hipofizin bir başka adı değildir. Şemadaki her ara basamak farklı doku ve iletişim biçimi içerir. Işık girişini ve çıkışın zamanını ayrı kontrol etmek “her gece saat aynı olunca aynı hormon kesin çıkar” ezberini sınırlar. Çevresel zamanlayıcı ve iç saat fazı birlikte düşünülmelidir.",
        ],
      },
      {
        title: "Karanlıkta artma eğilimini saatle birlikte oku",
        paragraphs: [
          "İnsanda melatonin salımı çoğunlukla biyolojik gece boyunca yükselir ve uygun ışık girdisiyle baskılanabilir. Ancak karanlık tek başına bütün anlarda aynı sınırsız üretimi yapan sabit musluk değildir; iç saat fazı ve ışığın zamanı-özellikleri önem taşır. Bu yüzden öğlen karanlık oda ile biyolojik gecenin bütün fizyolojik koşulları otomatik eşitlenmez. Eğilim ve koşulsuz kesinlik farklı anlatım düzeyleridir.",
          "Dersin 24 saatlik modeli bu karmaşık düzenlemenin yalnız verilen zaman penceresini gösterir. Karanlık penceresi ile seçilen saatin ilişkisi görünürdür; isteğe bağlı gece ışığı işareti, bu pencerede ışık baskısını açıklayan bir koşul kartıdır. Gösterilen parlaklık veya renk gerçek hormon derişimi değildir. Gerçek doz-cevap ölçümü verilmediği için sayısal melatonin miktarı tahmini yapılmaz.",
        ],
      },
      {
        title: "Gün uzunluğu: gece yarısını geçen süre",
        paragraphs: [
          "22.00’de başlayan ve 06.00’da biten karanlık pencereyi 6−22 diye negatif süre sayma. Önce gece yarısına kadar iki saat, sonra sabaha kadar altı saat sayılır; toplam sekiz saattir. Bir günlük döngüde süre hesabı 24 saat üzerinden tamamlanır. Saatin bir anı göstermesi ile iki an arasındaki sürenin gösterilmesi farklıdır.",
          "20.00–08.00 penceresi on iki saat karanlıktır; ilk örnekten dört saat uzundur. Bu bilgi tek başına gerçek hormon toplamının aynı oranda arttığını kanıtlamaz, çünkü salgı hızı sabit verilmemiştir. Eğer ayrı bir matematik sorusunda varsayımsal hız açıkça sabit iki sinyal birimi/saat verilirse alan hesabı yapılabilir. Bu öğretim varsayımı gerçek epifiz salgısının evrensel sabit hızı değildir.",
        ],
      },
      {
        title: "Faz kayması süre değişimi değildir",
        paragraphs: [
          "Bir pencerenin hem başlangıcını hem bitişini üç saat ileri taşımak 22.00–06.00 aralığını 01.00–09.00 yapar. Karanlık süresi hâlâ sekiz saattir; değişen, pencerenin 24 saat içindeki fazı yani konumudur. Başlangıç saatini değiştirmeyi otomatik olarak sürenin uzaması saymak yanlıştır. Ritimde zamanlama ve toplam süre farklı ölçütlerdir.",
          "Günlük ritimlerin çevreye uyarlanması karmaşık ve zaman alan süreçler içerebilir; modelde pencereyi tek hareketle kaydırmak kişinin gerçek saatinin anında aynı şekilde ayarlanacağı anlamına gelmez. Saat dilimi değişimleri veya vardiya gibi örnekler yalnız faz kavramına bağlanabilir. Kişisel melatonin alma zamanı ya da dozunu bu basit saat çiziminden belirlemek uygun değildir. Burada hesaplanan değer, açıkça tanımlı bir zaman penceresidir.",
        ],
      },
      {
        title: "Sinyal alanını ancak hız varsayımı verilince hesapla",
        paragraphs: [
          "Varsayımsal modelde karanlık boyunca sabit iki sinyal birimi/saat üretim, aydınlıkta sıfır kabul edilirse sekiz saatlik pencere 16, on iki saatlik pencere 24 sinyal birimi verir. Karşılaştırma 24/16=1,5’tir. Birimlerin çarpılması, hız ile sürenin farklı büyüklükler olduğunu gösterir. Gerçek melatonin ritmi bu dikdörtgen modelle birebir aynı değildir.",
          "Hızın zamanla değiştiği gerçek bir eğri verilirse toplamı yalnız gece saatine bakarak bulamazsın; eğrinin altındaki alan veya verilen ölçümler gerekir. Sabit hızlı öğretim sorusunun sonucunu bütün insanlara hormon oranı diye taşımamak önemlidir. Modelde verilen süre hesabı ve ışık durumu görsel-HTML olarak birlikte sunulur; sayısal alan yalnız belirtilen kurgusal varsayım altında anlam taşır.",
        ],
      },
      {
        title: "Ritmi öğrenirken davranış ve kanıt sınırını koru",
        paragraphs: [
          "Düzenli uyku-uyanıklık zamanları ve çevresel ışığın farkında olmak sirkadiyen düzenlemeyi anlamaya yardımcı olabilir; fakat tek alışkanlık her kişide kesin aynı hormonal sonuç veya başarı garantisi vermez. Bir gözlemden neden çıkarırken yaş, zaman, ışık ve diğer koşulları ayır. Sadece ekrana bakma süresinden kişinin gerçek melatonin düzeyi veya belirli hastalığı hesaplanmaz.",
          "Bu ünitenin sonunda epifiz kaynağını, retina-hipotalamus-sinir yolunu, karanlık penceresini ve faz-süre ayrımını kendi cümlenle kurabilmelisin. Sorularda bütün gerekli saatler ve varsayımlar kartın içinde verilir; önceki etkileşimin seçimine dayanılmaz. Tahmin ve gerekçe kaydı öğrenme sürecini görünür kılar, fakat kendi başına doğru sınav cevabı veya ustalık puanı sayılmaz. Kanıtı adım adım açıklamak ritim bilgisini aktarılabilir hale getirir.",
        ],
      },
      {
        title: "Mevsimsel zamanlayıcı: ışığın yalnız varlığı değil niteliği",
        paragraphs: [
          "Mevsimsel gün uzunluğu değiştiğinde aydınlık ve karanlık pencerelerinin süresi de değişir. Uzun kış geceleri melatonin ritminin geceye yayılan süresiyle ilişkilendirilebilir; fakat bu tek başına her kişide aynı salgı yüksekliği veya kesin toplam oranı demek değildir. Işığın devamlılığı, şiddeti ve zamanlaması önemlidir; aynı süreli iki ışık koşulu iç saat üzerinde bütünüyle aynı etkiyi zorunlu yaratmaz.",
          "Sirkadiyen ritim yaklaşık günlük bir örüntüdür ve çevresel zamanlayıcılarla eşgüdümlenir. Sadece bir gecelik pencereden mevsimsel üreme düzenini veya insan menstrual döngüsünün tüm nedenlerini çıkaramazsın. Üreme eksenindeki GnRH, FSH/LH ve gonad hormonları ayrı bir düzenleme ağıdır. Bu ünitede gece süresi ve fazını hesaplamak, hormonun bütün yaşam olaylarını tek başına kontrol ettiğini iddia etmek yerine zamanlama bilgisinin neyi gösterdiğini ve neyi göstermediğini ayırmaya yarar.",
        ],
      },
    ],
    examples: [
      {
        title: "Gece yarısını geç",
        prompt:
          "Karanlık 22.00’de başlıyor, ertesi gün 06.00’da bitiyor. Süre kaç saat?",
        strategy: "Gece yarısında iki parçaya ayır.",
        steps: [
          {
            label: "İlk parça",
            explanation: "22’den 24’e iki saat vardır.",
            expression: "24−22=2",
          },
          {
            label: "İkinci parça",
            explanation: "00’dan 06’ya altı saattir.",
            expression: "6−0=6",
          },
          {
            label: "Toplam",
            explanation: "İki parça aynı sürenin devamıdır.",
            expression: "2+6=8",
          },
        ],
        answer: "8 saat.",
        check: "Saat anı ile süre farklıdır.",
        pitfall: "6−22 sonucunu negatif gece süresi sayma.",
      },
      {
        title: "Uzun geceyi karşılaştır",
        prompt:
          "A penceresi 22.00–06.00, B penceresi 20.00–08.00. B karanlığı A’dan kaç saat uzundur?",
        strategy: "Önce iki toplam süreyi bul.",
        steps: [
          {
            label: "A",
            explanation: "Gece yarısının iki tarafını topla.",
            expression: "2+6=8",
          },
          {
            label: "B",
            explanation: "Yine iki parçayı birleştir.",
            expression: "4+8=12",
          },
          {
            label: "Fark",
            explanation: "B’den A’yı çıkar.",
            expression: "12−8=4",
          },
        ],
        answer: "4 saat daha uzun.",
        check:
          "Süre farkı tek başına gerçek hormon toplamının aynı oranda artışı değildir.",
        pitfall: "Bitiş saatleri farkını tüm süre farkı sanma.",
      },
      {
        title: "Fazı kaydır, süreyi koru",
        prompt:
          "22.00–06.00 penceresinin iki ucu üç saat ileri kaydırılıyor. Yeni pencere ve süresi nedir?",
        strategy: "24’ü geçen saati yeni güne taşı.",
        steps: [
          {
            label: "Başlangıç",
            explanation: "25.00 yeni günün 01.00’idir.",
            expression: "22+3=25→01",
          },
          {
            label: "Bitiş",
            explanation: "Sabah ucu da üç saat ilerler.",
            expression: "06+3=09",
          },
          {
            label: "Süre",
            explanation: "İki uca eşit kayma süreyi korur.",
            expression: "09−01=8",
          },
        ],
        answer: "01.00–09.00; 8 saat.",
        check:
          "Bu matematiksel faz kayması gerçek iç saatin anlık uyum modeli değildir.",
        pitfall: "Her ileri kaymayı süre artışı sayma.",
      },
      {
        title: "Yalnız verilen sabit hız altında",
        prompt:
          "Kurgusal sinyal karanlıkta sabit 2 birim/saat, aydınlıkta sıfırdır. 8 ve 12 saat karanlık için toplam sinyal ve oran nedir?",
        strategy: "Hız×süre, sonra oran.",
        steps: [
          {
            label: "Kısa pencere",
            explanation: "Sekiz saatte 16 birimdir.",
            expression: "2×8=16",
          },
          {
            label: "Uzun pencere",
            explanation: "On iki saatte 24 birimdir.",
            expression: "2×12=24",
          },
          {
            label: "Oran",
            explanation: "Uzun toplamı kısa toplama böl.",
            expression: "24/16=1,5",
          },
        ],
        answer: "16 ve 24 birim; oran 1,5.",
        check: "Sabit hız yalnız bu kurgusal sorunun varsayımıdır.",
        pitfall: "Gerçek melatonin salgısı için evrensel hız ilan etme.",
      },
    ],
    recall: [
      {
        prompt: "Melatonin, melanin ve MSH aynı mıdır?",
        answer:
          "Hayır; epifiz hormonu, pigment ve ayrı hormonal sinyal kavramlarıdır.",
      },
      {
        prompt: "Epifize ışık bilgisi hangi ağla bağlanır?",
        answer:
          "Retina → hipotalamik sirkadiyen saat → sinirsel/sempatik yol → epifiz.",
      },
      {
        prompt: "Pencerenin iki ucu eşit kayarsa ne korunur?",
        answer: "Süre korunur, 24 saat içindeki faz değişir.",
      },
      {
        prompt:
          "Uzun karanlıktan gerçek hormon toplamı oranı doğrudan çıkar mı?",
        answer: "Hayır; salgı hızının zaman içindeki seyri gerekir.",
      },
    ],
    items: [
      [
        "Epifiz ile doğru eşleşen temel hormon ve bağlam hangisidir?",
        "Melatonin; sirkadiyen zamanlama",
        [
          "Melanin; sindirim enzimi",
          "TSH; pankreas kanalı",
          "PTH; süt atımı",
          "İnsülin; tiroid iyotlanması",
        ],
        "Epifiz hormonunu benzer adlı pigmentten ayır.",
        "Epifiz melatonin salgısıyla ve ışık-karanlıkla ilişkili sirkadiyen zamanlamayla bağlantılıdır. Melanin pigment, MSH ayrı hormonal sinyaldir; benzer adlar aynı molekül veya aynı temel işlev değildir.",
      ],
      [
        "İnsanda ışık bilgisinin epifiz düzenlenmesine ulaşmasını doğru özetleyen yol hangisidir?",
        "Retina → hipotalamik saat ağları → sinirsel/sempatik basamaklar → epifiz",
        [
          "Retina → pankreas kanalı → epifiz",
          "Epifiz → mide boşluğu → retina",
          "Ön hipofiz portal damarı → göz merceği → kemik",
          "Melanin pigmenti → idrar kanalı → TSH",
        ],
        "Işığı alan doku ile hormon salan dokunun arasındaki ağı koru.",
        "Retinal ışık bilgisi hipotalamik sirkadiyen saatle ve epifize uzanan sinirsel düzenlemeyle ilişkilidir. Bu yol RH/IH’nin ön hipofize portal kanla taşınması veya doğrudan gözden epifize görüntü düşmesi değildir.",
      ],
      [
        "Karanlık 22.00’de başlayıp ertesi gün 06.00’da bitiyor. Pencere kaç saattir?",
        "8",
        ["−16", "4", "16", "28"],
        "Gece yarısından önce ve sonraki süreyi topla.",
        "22’den 24’e iki, 00’dan 06’ya altı saat vardır; toplam sekizdir. Saatlerin 24 saatlik döngü içindeki konumları ile iki zaman arasındaki süreyi ayırmak negatif süre hatasını önler.",
      ],
      [
        "A karanlık penceresi 22.00–06.00, B penceresi 20.00–08.00’dır. B, A’dan kaç saat uzundur?",
        "4",
        ["2", "6", "8", "12"],
        "Her pencerenin süresini ayrı bul.",
        "A sekiz, B on iki saat karanlıktır; 12−8=4 saat fark vardır. Bu süre farkı gerçek hormon toplamında kesin aynı oranlı artış anlamına gelmez; hız-zaman bilgisi ayrıca gerekir.",
      ],
      [
        "22.00–06.00 penceresinin başlangıç ve bitişi üç saat ileri kaydırılırsa hangisi doğrudur?",
        "01.00–09.00 olur; süre 8 saat kalır",
        [
          "01.00–06.00 olur; süre değişmez",
          "22.00–09.00 olur; iki uç eşit kaymıştır",
          "25.00–09.00 olur; bir günde 28 saat vardır",
          "01.00–09.00 olur; süre 12 saattir",
        ],
        "24’ü geçen saati yeni güne taşı ve iki ucu birlikte kaydır.",
        "22+3=25, yani ertesi gün 01.00; 06+3=09.00 olur. Her iki uç aynı miktar kaydığı için süre sekiz saat korunur; değişen penceredeki fazdır.",
      ],
      [
        "Kurgusal sinyal karanlıkta sabit 2 birim/saat, aydınlıkta sıfırdır. 8 saatlik karanlıkta toplam kaç sinyal birimi oluşur?",
        "16",
        ["2", "4", "8", "24"],
        "Verilen kurgusal hız ile süreyi çarp.",
        "Sabit hız varsayımı altında 2 birim/saat×8 saat=16 birimdir. Bu özel matematiksel koşul gerçek melatonin salgısının bütün insanlarda sabit iki birim/saat olduğu iddiası değildir.",
      ],
      [
        "Kurgusal sabit hız 2 birim/saat ise 12 saat ve 8 saat karanlıktaki toplam sinyalin uzun/kısa oranı nedir?",
        "1,5",
        ["0,5", "1", "2", "4"],
        "24 ve 16 toplamlarını karşılaştır.",
        "Uzun pencere 24, kısa pencere 16 birim verir; 24/16=1,5 olur. Oran yalnız açıkça verilen sabit hız varsayımı altındadır; gerçek hormonal eğri için süre tek başına yeterli değildir.",
      ],
      [
        "Yalnız karanlık süresinin uzadığı biliniyor; gerçek salgı hızının zamanla seyri ölçülmemiştir. Hangisi kesin olarak hesaplanamaz?",
        "Gerçek melatonin toplamının tam artış oranı",
        [
          "Karanlık süresinin uzadığı bilgisi",
          "Hız verisine ihtiyaç bulunduğu",
          "Süre ile toplamın farklı büyüklükler olduğu",
          "Salgı eğrisinin önemli olabileceği",
        ],
        "Toplam için yalnız süre değil hız-zaman bilgisi de gerekir.",
        "Gerçek toplam, salgının zaman içindeki hızına bağlıdır. Sabit hız verilmeden süre oranını hormon toplamı oranı saymak doğru değildir; bu nedenle tam sayısal artış hesaplanamaz.",
      ],
      [
        "Melatonin ve uyku ilişkisi için hangi ifade uygundur?",
        "Ritimle ilişkilidir; uyku bütünlüğünü tek başına koşulsuz açıp kapatan tek etken değildir",
        [
          "Her melatonin varlığı kesin anında uyku yapar",
          "Birinin uykulu olması gerçek hormon düzeyini ölçmüş olur",
          "Bütün uyku bozuklukları yalnız epifizden kaynaklanır",
          "İnsanın menstrual döngüsünü yalnız melatonin yönetir",
        ],
        "Çok etkenli davranışı tek hormona indirme.",
        "Melatonin sirkadiyen zamanlamayla ilişkilidir; uyku basıncı, sinir ağları ve çevresel-davranışsal koşullar da önemlidir. Tek gözlem hormon düzeyi, tanı veya bütün üreme döngüsünün kontrolü hakkında kesin sonuç vermez.",
      ],
      [
        "Gece ışığı ve melatonin hakkında hangi yaklaşım uygundur?",
        "Etki zaman, ışık koşulları ve iç saat fazıyla birlikte değerlendirilir",
        [
          "Her karanlık anında her kişide aynı sınırsız hormon üretilir",
          "Retina ışık bilgisini hiçbir şekilde iletmez",
          "Işık etkisi yalnız pankreas sindirim kanalıyla olur",
          "Her ekran süresi kişisel kesin hormon dozunu hesaplatır",
        ],
        "Eğilimi evrensel nicel yasa yapma.",
        "Işık girdisi melatonin ritmini etkileyebilir; ancak zamanlama, ışığın özellikleri ve iç saat fazı önemlidir. Yalnız karanlık veya ekran süresinden kişisel kesin hormon düzeyi ya da doz çıkarımı yapılamaz.",
      ],
    ],
    source:
      "MEBİ AYT Biyoloji Konu Özeti, Bölüm 1, PDF 25–26; OGM Dersler Cepte, Endokrin Sistem II, PDF 10–16. Kaynaklarla karşılaştırılmış özgün anlatım, şema ve öğretim soruları.",
  },
];
export const forge016BiologyATopics: Record<string, string> =
  Object.fromEntries(data.map((d) => [d.id, d.topic]));
export const forge016BiologyAGuides: LessonGuide[] = data.map(
  ({ items: _items, topic: _topic, title: _title, ...d }) => d,
);
function question(d: Unit, item: Unit["items"][number], i: number): Question {
  const [prompt, correct, wrong, hint, explanation] = item;
  if (wrong.length !== 4) throw Error("Five choices required: " + d.id);
  const answer = i % 5,
    options = [...wrong];
  options.splice(answer, 0, correct);
  return {
    id: `f016-bioa-${d.id}-${i + 1}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(explanation),
    skill: `f016-bioa-${d.id}-${i + 1}`,
  };
}
export const forge016BiologyALessons: Lesson[] = data.map((d) => ({
  id: d.id,
  subjectId: "ayt-biyoloji",
  title: txt(d.title),
  minutes: d.minutes,
  objectives: d.objectives.map(txt),
  body: d.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join(" ")),
  })),
  questions: d.items.map((item, i) => question(d, item, i)),
  source: txt(d.source),
  tags: ["kaynakli", "etkilesimli", "forge016"],
}));
