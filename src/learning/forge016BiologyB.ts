import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

export type SkinStimulus =
  "touch" | "pressure" | "vibration" | "stretch" | "heat" | "pain";
export type SkinPhase = "onset" | "steady" | "offset";
/** Ordinal teaching states, not measured receptor firing rates or clinical thresholds. */
export function skin016State(
  stimulus: SkinStimulus,
  phase: SkinPhase,
  gland: "eccrine" | "apocrine",
) {
  if (
    !["touch", "pressure", "vibration", "stretch", "heat", "pain"].includes(
      stimulus,
    ) ||
    !["onset", "steady", "offset"].includes(phase) ||
    !["eccrine", "apocrine"].includes(gland)
  )
    throw new RangeError("SKIN_STATE");
  const i = ["onset", "steady", "offset"].indexOf(phase);
  const patterns: Record<
    SkinStimulus,
    { id: string; name: string; levels: number[] }[]
  > = {
    touch: [
      {
        id: "meissner",
        name: "Meissner: değişen hafif dokunma",
        levels: [3, 0, 2],
      },
      { id: "merkel", name: "Merkel: süren temas", levels: [2, 2, 0] },
    ],
    pressure: [
      { id: "pacini", name: "Pacini: basıncın değişimi", levels: [3, 0, 2] },
      { id: "merkel", name: "Merkel: süren basınç", levels: [2, 2, 0] },
    ],
    vibration: [
      {
        id: "pacini",
        name: "Pacini: süren titreşimde yinelenen değişim",
        levels: [3, 3, 0],
      },
    ],
    stretch: [
      {
        id: "ruffini",
        name: "Ruffini: süren deri gerilmesi",
        levels: [2, 2, 0],
      },
    ],
    heat: [{ id: "free", name: "Serbest uç: ısı bilgisi", levels: [2, 1, 0] }],
    pain: [
      {
        id: "free",
        name: "Serbest uç: zararlı uyaran bilgisi",
        levels: [3, 3, 0],
      },
    ],
  };
  return {
    stimulus,
    phase,
    gland,
    responses: patterns[stimulus].map((r) => ({
      id: r.id,
      name: r.name,
      level: r.levels[i],
      pattern: r.levels,
    })),
    outlet:
      gland === "eccrine" ? "Deri yüzeyindeki por" : "Bu şemada kıl folikülü",
    caution:
      "Yanıt düzeyleri nitel şema kodlarıdır; gerçek impuls sayısı veya insan eşik ölçümü değildir.",
  };
}
export type TasteQuality = "sweet" | "salty" | "sour" | "bitter" | "umami";
export function smellTaste016State(
  noseOpen: boolean,
  quality: TasteQuality,
  cell: TasteQuality,
  path: "taste" | "smell",
) {
  const names: Record<TasteQuality, string> = {
    sweet: "Tatlı",
    salty: "Tuzlu",
    sour: "Ekşi",
    bitter: "Acı",
    umami: "Umami",
  };
  if (
    typeof noseOpen !== "boolean" ||
    !Object.hasOwn(names, quality) ||
    !Object.hasOwn(names, cell) ||
    !["taste", "smell"].includes(path)
  )
    throw new RangeError("CHEMOSENSE_STATE");
  return {
    noseOpen,
    quality,
    cell,
    path,
    qualityName: names[quality],
    cellName: names[cell],
    selectedTasteActive: quality === cell,
    basicTastePresent: true,
    aromaPresent: noseOpen,
    route:
      path === "taste"
        ? [
            "Tükürükte çözünme",
            "Tat hücresi",
            "Duyu siniri",
            "Talamus",
            "Tat korteksi",
          ]
        : [
            "Mukusta çözünme",
            "Koku nöronu",
            "Koku soğancığı",
            "İlk koku korteksi",
          ],
    firstThalamus: path === "taste",
    signalPresent: path === "taste" ? quality === cell : noseOpen,
  };
}
export type EyeDefect = "normal" | "myopia" | "hyperopia";
/** Thin equivalent optical system: millimetres, no patient prescription. */
export function eye016State(
  distance: "near" | "far",
  light: "bright" | "dim",
  defect: EyeDefect,
  corrected: boolean,
) {
  if (
    !["near", "far"].includes(distance) ||
    !["bright", "dim"].includes(light) ||
    !["normal", "myopia", "hyperopia"].includes(defect) ||
    typeof corrected !== "boolean"
  )
    throw new RangeError("EYE_STATE");
  const objectDistance = distance === "near" ? 250 : 6000;
  const retinalDistance =
    defect === "myopia" ? 27 : defect === "hyperopia" ? 21 : 24;
  const basePowerPerMM = 1 / objectDistance + 1 / 24;
  const correctionPerMM = corrected ? 1 / retinalDistance - 1 / 24 : 0;
  const focalLength = 1 / (basePowerPerMM + correctionPerMM);
  const imageDistance = 1 / (1 / focalLength - 1 / objectDistance);
  const delta = imageDistance - retinalDistance;
  return {
    distance,
    light,
    defect,
    corrected,
    objectDistance,
    retinalDistance,
    imageDistance,
    focalLength,
    correctionDioptres: correctionPerMM * 1000,
    focus: Math.abs(delta) < 1e-8 ? "retina" : delta < 0 ? "front" : "behind",
    ciliaryContracted: distance === "near",
    zonuleTaut: distance === "far",
    lensThickness: distance === "near" ? 28 : 14,
    pupilRadius: light === "bright" ? 9 : 18,
  };
}
export type BalanceMotion = "start" | "steady" | "stop" | "linear" | "tilt";
export const hearing016Stages = [
  "Kulak kepçesi ve dış yol",
  "Kulak zarı",
  "Çekiç–örs–üzengi",
  "Oval pencere",
  "Koklea sıvısı ve baziler zar",
  "Tüylü hücre",
  "İşitme siniri",
  "İşitme korteksi",
] as const;
export function ear016State(
  stage: number,
  motion: BalanceMotion,
  tympanicArea: number,
) {
  if (
    !Number.isInteger(stage) ||
    stage < 0 ||
    stage > 7 ||
    !["start", "steady", "stop", "linear", "tilt"].includes(motion) ||
    !Number.isFinite(tympanicArea) ||
    tympanicArea < 30 ||
    tympanicArea > 90
  )
    throw new RangeError("EAR_STATE");
  const rotation = ["start", "steady", "stop"].includes(motion);
  return {
    stage,
    stageName: hearing016Stages[stage],
    motion,
    rotation,
    cupulaDirection: motion === "start" ? -1 : motion === "stop" ? 1 : 0,
    otolithShift: motion === "linear" ? -1 : motion === "tilt" ? 1 : 0,
    signal:
      stage <= 4
        ? "Mekanik titreşim"
        : stage === 5
          ? "Dereceli hücre yanıtı ve iletici salımı"
          : "Sinirde aksiyon potansiyelleri",
    tympanicArea,
    ovalArea: 3,
    pressureRatio: tympanicArea / 3,
    outputForce: 1,
    inputPressure: 1 / tympanicArea,
    outputPressure: 1 / 3,
    condition:
      "Yalnız alan etkisi: aynı 1 N kuvvet, kayıpsız ve kaldıraç etkisiz temsili model; alanlar mm², basınç N/mm².",
  };
}
export function bone016State(
  age: "growing" | "adult",
  process: "length" | "width",
  step: number,
  tissue: "compact" | "spongy" | "marrow",
) {
  if (
    !["growing", "adult"].includes(age) ||
    !["length", "width"].includes(process) ||
    !Number.isInteger(step) ||
    step < 0 ||
    step > 4 ||
    !["compact", "spongy", "marrow"].includes(tissue)
  )
    throw new RangeError("BONE_STATE");
  const length =
      220 + (age === "growing" && process === "length" ? step * 12 : 0),
    width = 56 + (process === "width" ? step * 6 : 0);
  return {
    age,
    process,
    step,
    tissue,
    length,
    width,
    top: 350 - length,
    bottom: 350,
    plateOpen: age === "growing",
    lengthChanged: age === "growing" && process === "length" && step > 0,
    widthChanged: process === "width" && step > 0,
    condition:
      "Ölçüler SVG şema birimidir; adımlar gerçek yıl, yaş veya büyüme hızı değildir. Kalınlaşma için yapımın baskın olduğu varsayılır.",
  };
}
export type JointFocus =
  "surface" | "meniscus" | "ligament" | "tendon" | "fluid";
export function joint016State(angle: number, focus: JointFocus) {
  if (
    !Number.isFinite(angle) ||
    angle < 0 ||
    angle > 60 ||
    !["surface", "meniscus", "ligament", "tendon", "fluid"].includes(focus)
  )
    throw new RangeError("JOINT_STATE");
  const rad = (-angle * Math.PI) / 180,
    pivot = { x: 220, y: 200 };
  const rotate = (x: number, y: number) => ({
    x: pivot.x + (x - pivot.x) * Math.cos(rad) - (y - pivot.y) * Math.sin(rad),
    y: pivot.y + (x - pivot.x) * Math.sin(rad) + (y - pivot.y) * Math.cos(rad),
  });
  const names: Record<JointFocus, string> = {
    surface: "Eklem yüzündeki hiyalin kıkırdak",
    meniscus: "Dizdeki fibröz menisküs",
    ligament: "Kemik–kemik bağlantısı: ligament",
    tendon: "Kas–kemik bağlantısı: tendon",
    fluid: "Sinoviyal sıvı ve kayganlık",
  };
  return {
    angle,
    focus,
    pivot,
    upperEnd: { x: 220, y: 170 },
    lowerEnd: rotate(220, 230),
    lowerTip: rotate(220, 350),
    ligamentA: { x: 202, y: 140 },
    ligamentB: rotate(202, 270),
    tendonStart: { x: 310, y: 104 },
    tendonEnd: rotate(238, 285),
    label: names[focus],
    cartilage:
      focus === "meniscus" ? "fibröz" : focus === "surface" ? "hiyalin" : null,
    condition:
      "Boşluk ve doku kalınlıkları büyütülmüş menteşe şemasıdır; gerçek dizin üç boyutlu hareketini veya güvenli yük sınırını hesaplamaz.",
  };
}

type Unit = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  source: string;
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  questions: Question[];
};
const S = (title: string, a: string, b: string): GuideSection => ({
  title,
  paragraphs: [a, b],
});
const E = (
  title: string,
  prompt: string,
  strategy: string,
  steps: [string, string, string],
  answer: string,
  check: string,
  pitfall: string,
): WorkedExample => ({
  title,
  prompt,
  strategy,
  steps: steps.map((explanation, i) => ({
    label: ["Koşulu ayır", "İlişkiyi kur", "Sonucu denetle"][i],
    explanation,
  })),
  answer,
  check,
  pitfall,
});
const Q = (
  id: string,
  n: number,
  prompt: string,
  answer: string,
  distractors: [string, string, string, string],
  hint: string,
  explanation: string,
): Question => {
  const shift = (n * 2 + 1) % 5,
    choices = [answer, ...distractors],
    options = [...choices.slice(shift), ...choices.slice(0, shift)];
  return {
    id: `f016-b-${id}-${n}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer: options.indexOf(answer),
    hint: txt(hint),
    explanation: txt(explanation),
    skill: `f016-b-${id}-${n}`,
  };
};
const data: Unit[] = [
  {
    id: "duyu-organlari-deri",
    topic: "detail-298",
    title: "Deri: katmanlardan duyusal bilgiye",
    minutes: 42,
    objectives: [
      "Deri katmanları, bezler ve bağ dokusu hücrelerini işlevleriyle ilişkilendir.",
      "Uyaran türü ve zamanına göre reseptör yanıtını karşılaştır.",
      "Epitelin damarsızlığı ile duyarsızlığın aynı şey olmadığını açıkla.",
    ],
    source:
      "MEBİ AYT Biyoloji Konu Özetleri, duyu reseptörleri ve deri; OGM Dersler Cepte III, deri ve temel bağ doku. Kaynak kapsamından geliştirilmiş özgün anlatım, şema ve öğretim soruları.",
    sections: [
      S(
        "Duyunun ilk adımı: uygun uyaran",
        "Bir duyu organı dışarıdan gelen her enerjiyi aynı biçimde algılamaz. Reseptörün yapısı, özellikle yanıt verdiği uygun uyaranı belirler: fotoreseptör ışığa, kemoreseptör kimyasal maddelere, mekanoreseptör şekil değişimine duyarlıdır. Deri tek bir duyunun organı değil; temas, basınç, titreşim, gerilme, sıcaklık ve zararlı uyaran hakkında farklı bilgi sağlar.",
        "Reseptörde başlayan yerel değişim ile duyu sinirindeki aksiyon potansiyelini ayır. Bazı reseptörler duyu nöronunun özelleşmiş ucudur; bazı duyu organlarında ise ayrı bir hücre sinir ucuna haber verir. Aynı sinirsel iletim ilkeleri kullanılsa da uyaranın türü ve merkezde işlendiği yol duyunun niteliğini ayırt etmeye yardım eder.",
      ),
      S(
        "Epidermis: canlı taban, koruyucu yüzey",
        "Epidermis çok katlı epitelden oluşur. Alt katmanlardaki canlı hücreler bölünür; yüzeye ilerleyen hücrelerde keratinleşme artar ve dıştaki ölü tabaka mekanik ve kimyasal etkilere karşı bariyer oluşturur. Saç, kıl ve tırnak da keratin içeren epidermal oluşumlardır; dışarıdaki kıl telini kesmek canlı kökü kesmek değildir.",
        "Epidermisin kendi kan damarı ağı yoktur; altındaki bağ dokusundan gelen maddeler difüzyonla ulaşır. Damarsız olmak bütün katmanların ölü veya duyarsız olması demek değildir: canlı alt hücreler ve epidermise uzanabilen serbest sinir uçları vardır. Melanositlerin ürettiği melanin, hücreler arasında dağılarak ışınıma karşı korunmaya katkı sağlar; tek başına sınırsız koruma değildir.",
      ),
      S(
        "Epitelin iki ayrı sınıflama ölçütü",
        "Epitel görevine göre örtü, salgı ve duyu epiteli olarak karşılaştırılabilir. Örtü epiteli yüzeyleri kaplar; salgı epiteli süt, hormon veya mukus gibi ürünler oluşturabilir; duyu epiteli belirli reseptör hücrelerinin özelleşmesine katılır. Bu görev sınıflaması, kaç hücre katmanı bulunduğunu tek başına söylemez.",
        "Katman düzeninde tek katlı, çok katlı ve yalancı çok katlı örnekler ayrılır. Yalancı çok katlı epitelde hücrelerin boyu ve çekirdek düzeyleri farklı olsa da hücreler bazal yüzeyle ilişkilidir; görünüşü gerçek çok katmanla karıştırılmaz. Solunum yollarının bazı bölümlerindeki silli örnekler ile derinin çok katlı örtüsü farklıdır. Kaynakta yüzeydeki keratinli katman korun, alt canlı bölge ise Malpighi adıyla anılabilir; bu adlar bütün epidermis hücrelerinin aynı yapıda olduğu anlamına gelmez.",
      ),
      S(
        "Dermis ve deri altını birbirine karıştırma",
        "Dermis epidermisin altındaki bağ dokusudur. Kollajen dayanıklılığa, elastik lifler esneyip geri dönmeye katkı yapar. Yüzeye yakın papiller bölüm daha gevşek, daha derindeki retiküler bölüm yoğun düzensiz bağ dokusudur. Bu nedenle derinin tamamını yalnız tek bir bağ dokusu türü gibi adlandırmak ayrıntıyı kaybettirir.",
        "Damarlar, sinirler, kıl kökleri ve bezlerin önemli bölümleri dermiste yer alır. Daha aşağıdaki yağlı deri altı, yani hipodermis, ısı yalıtımı, enerji deposu ve yastıklama sağlar; burada gerçek derinin iki katmanı epidermis ve dermis olarak ele alınır. Şemadaki katman kalınlıkları bütün vücut bölgelerinde aynı değildir.",
      ),
      S(
        "Bağ dokusunun hücreleri aynı işi yapmaz",
        "Fibroblastlar bağ dokusu liflerini ve ara madde bileşenlerini üretir. Makrofajlar yabancı parçacıkların ve hücre artıklarının uzaklaştırılmasına katılır; plazma hücreleri antikor salgılar. Mast hücrelerinin histamin ve heparin gibi ürünleri yerel bağ doku yanıtlarında rol alır. Bir hücreyi yalnız görünüşünden değil, verilen işlev kanıtından tanımak daha güvenilirdir.",
        "Yara onarımında hücrelerin görevleri birlikte yürür: matriks üretimi, savunma ve yeniden düzenlenme birbirinin yerine geçmez. Yara büzülmesinde özelleşmiş miyofibroblastlar görev alabilir; buradan bütün fibroblastların kas hücresi olduğu sonucu çıkmaz. Kaynak sorusunda antikor belirtiliyorsa lif sentezleyen hücreyi seçmek, aynı dokuda bulunmalarına rağmen görevleri karıştırmaktır.",
      ),
      S(
        "Kıl, yağ bezi ve iki farklı ter çıkışı",
        "Kıl kökü epidermisin dermise uzanan bölümünde gelişir; çevresinde damar ve duyu siniri ilişkileri bulunur. Yağ bezleri çoğunlukla kıl folikülüyle ilişkilidir ve sebumla yüzeyin yağlanmasına katkı yapar. Kılın düz kasla dikleşmesi ile kıl telinin kendisinin kasılması aynı olay değildir.",
        "Ekrin ter bezlerinin kanalları deri yüzeyindeki porlara açılır ve özellikle ısı düzenlenmesine katılır. Apokrin bezlerin kanalları ise çoğunlukla belirli bölgelerdeki kıl foliküllerine açılır. Bu iki yolu aynı kesitte karşılaştırmak, bütün ter bezlerinin kıl köküne açıldığı yanlış genellemesini önler. Terin büyük kısmı su ve tuzdur; terleme bütün atıkları temizleyen tek yol değildir.",
      ),
      S(
        "Dokunma reseptörlerini görevle eşleştir",
        "Meissner cisimcikleri özellikle değişen hafif dokunma ve düşük frekanslı hareket bilgisine; Merkel yapıları süren temas ve basınç ayrıntılarına katkı yapar. Pacini cisimcikleri derin basıncın değişimi ve titreşimle, Ruffini yapıları derinin gerilmesiyle ilişkilidir. Dağılımlar bölgeye göre değiştiğinden bu görevler bütün reseptörleri tek bir yere hapsetmez.",
        "Serbest sinir uçlarının farklı alt tipleri sıcaklık, zararlı uyaran ve başka duyusal görevler taşır. Bir kapsül adı gördüğünde onu otomatik olarak yalnız sıcak ya da yalnız soğuk etiketiyle eşleştirme; eski şemalar bu noktada aşırı sade olabilir. Krause cisimcikleri de dokunma ve basınçla ilişkilendirilen kapsüllü örneklerdir; eski kaynaklardaki tek başına soğuk etiketini evrensel kural yapma. Dudak ve parmak ucu gibi bölgelerde duyu uçlarının yoğunluğu farklı olabilir. Derinlik, yapı, uygun uyaran ve yanıtın zaman içindeki değişimini birlikte değerlendir.",
      ),
      S(
        "Uyum: uyaran sürerken bilgi neden değişir?",
        "Bazı mekanoreseptörler değişimin başladığı ve bittiği anda belirgin yanıt verir; sabit basınç sürerken yanıtları azalır. Daha yavaş uyum gösteren reseptörler süren temas veya gerilme hakkında bilgi sağlamaya devam eder. Üzerindeki kıyafeti bir süre sonra daha az fark etmek, bütün deri sinirlerinin çalışmayı bıraktığı anlamına gelmez.",
        "Süren titreşim, sabit ve değişmeyen bir basınç değildir; her titreşim döngüsü yeni şekil değişimleri içerir. Bu yüzden hızlı uyumlu Pacini yapısı titreşim boyunca yinelenen bilgi sağlayabilir. Ağrı ve sıcaklık yanıtlarını da aynı tek uyum süresine zorlamamak gerekir. Laboratuvardaki çubuklar gerçek impuls sayıları değil, bu nitel farkları gösteren şema kodlarıdır.",
      ),
      S(
        "Isı düzenlenmesi tek bir bezin işi değil",
        "Sıcaklık arttığında terin buharlaşması ısı kaybına yardım eder; deri damarlarının genişlemesi de vücut içinden yüzeye ısı aktarımını artırabilir. Soğukta damarların daralması yüzeyden kaybı azaltmaya katkı sağlar. Bu yanıtlar sinirsel ve hormonal düzenlemelerle birlikte değerlendirilir; terin yüzeyde birikmesi ile buharlaşıp ısı alması aynı aşama değildir.",
        "Deri dış etkilere karşı bariyer, duyusal yüzey ve metabolik süreçlerin bir parçasıdır. Güneş ışığı etkisiyle D vitamini sentezinin başlangıç basamakları deride gerçekleşebilir; etkin vitaminin oluşumundaki bütün basamaklar deride tamamlanmaz. Bir işlevi bilmek, aşırı ışınımın yararlı olduğu veya tek bir alışkanlığın bütün sağlık sonuçlarını garantilediği anlamına gelmez.",
      ),
      S(
        "Şemayı nasıl okuyacaksın?",
        "Önce yüzeyi ve katman sınırlarını bul; sonra seçilen yapının gerçekten hangi tabakaya uzandığını izle. Bir bezin gövdesinin derinde, kanal ağzının yüzeyde bulunması çelişki değildir. Sinir ucunun epidermise uzanması da epidermisin kendi damar ağı olduğu anlamına gelmez. Şekildeki iki bağlantıyı aynı bağlantı gibi ezberlemek sık yapılan bir hatadır.",
        "Ardından uyaranın türünü ve süresini sor. Basıncın başlaması, sabit sürmesi ve kalkması farklı bilgiler taşır. Modelde reseptöre dokunmak yalnız keşif seçimini kaydeder; doğru cevap veya ustalık puanı oluşturmaz. Konuyu açıklayabildiğinde bağımsız sorulara geç ve cevabını katman, yol ve zaman kanıtıyla gerekçelendir.",
      ),
    ],
    examples: [
      E(
        "Damarsız ama canlı",
        "Bir deri kesitinde epidermiste damar görülmüyor; tabandaki hücrelerin canlı olduğu ve serbest sinir uçlarının yukarı uzandığı gösteriliyor. Bu bulgular çelişir mi?",
        "Beslenme yolu, canlılık ve duyu uçlarını ayrı değerlendir.",
        [
          "Epidermisin damarsızlığı kendi içinde kan damarının bulunmaması demektir.",
          "Besin ve oksijen alttaki bağ dokusundan difüzyonla ulaşabilir; serbest sinir uçları epidermise girebilir.",
          "Dolayısıyla canlı taban ve duyusal uçlar damarsızlıkla birlikte bulunabilir.",
        ],
        "Çelişmez; damar yokluğu canlılık ve duyarlılık yokluğu değildir.",
        "Görüntüdeki damar, hücre ve sinir kanıtlarını ayrı ayrı koruduk.",
        "Damarsız sözcüğünü bütün hücreler ölüdür diye çevirmek.",
      ),
      E(
        "Aynı temasın iki evresi",
        "Bir reseptör sabit basınç başlarken ve kalkarken yanıt veriyor; basınç sürerken yanıtı çok azalıyor. Başka reseptör sürme evresinde de etkin. İki reseptör aynı bilgiyi mi sağlıyor?",
        "Zamansal örüntüyü kullan.",
        [
          "İlk yanıt değişim anlarını öne çıkarır; hızlı uyum örüntüsüne uygundur.",
          "İkinci yanıt uyaranın sürmesi hakkında bilgi verebilir; daha yavaş uyum örüntüsüne uygundur.",
          "İkisini karşılaştırmak basıncın hem değişimini hem devamını ayırt etmeye yardım eder.",
        ],
        "Hayır; zaman içindeki bilgi katkıları farklıdır.",
        "İlk reseptörün sessizleşmesi tüm derinin duyusuzlaştığını göstermiyor.",
        "Uyumun bütün nöronlarda aynı sürede olduğu sonucuna varmak.",
      ),
      E(
        "Bez kanalı nereye gider?",
        "A bezinin kanalı doğrudan yüzey poruna, B bezinin kanalı kıl folikülüne açılıyor. Bu iki şemayı ekrin ve apokrin örnekleriyle eşleştir.",
        "Gövdenin derinliğine değil, kanalın çıkışına bak.",
        [
          "A'nın kanalı kıl kökünde bitmiyor; deri yüzeyinde açılıyor.",
          "Ekrin bez için bu çıkış tipiktir; apokrin örneği çoğunlukla folikülle ilişkilidir.",
          "Bu şemada A ekrin, B apokrin olarak eşleşir; bütün ter bezleri için tek çıkış kuralı kurulamaz.",
        ],
        "A ekrin; B bu şemada apokrin.",
        "Sadece ter salgılama ortaklığı çıkışların aynı olduğunu göstermedi.",
        "Bez gövdesi derinde diye kanalı da deride biter sanmak.",
      ),
      E(
        "Terleme ve buharlaşma",
        "Aynı miktarda ter üretilen iki sanal ortamdan X'te ter daha fazla buharlaşıyor. Diğer ısı alışverişleri eşit tutulduğunda ter yoluyla soğutma hangisinde daha etkilidir?",
        "Sıvı üretimi ile faz değişimini ayır.",
        [
          "Karşılaştırmada ter üretimi aynı ve diğer ısı yolları eşit verilmiş.",
          "Buharlaşma çevresinden enerji alarak gerçekleşir; yüzeyde duran sıvı bununla aynı değildir.",
          "Daha çok terin buharlaştığı X'te bu yolun ısı uzaklaştırma katkısı daha fazladır.",
        ],
        "Verilen eşitlik koşullarında X.",
        "Sonuç yalnız terin buharlaşma yoluna aittir; bütün vücut sıcaklığını tek başına hesaplamaz.",
        "Ter miktarı aynıysa bütün soğuma da kesin aynıdır demek.",
      ),
    ],
    recall: [
      {
        prompt: "Epidermis neden damar olmadan canlı hücre barındırabilir?",
        answer:
          "Altındaki bağ dokusundan difüzyonla beslenir; serbest sinir uçları da epidermise uzanabilir.",
      },
      {
        prompt: "Sabit basınç ile titreşim hızlı uyumlu reseptör için aynı mı?",
        answer:
          "Hayır; titreşim yinelenen değişim taşır, sabit basınçta değişim başlangıç ve bitişte belirgindir.",
      },
      {
        prompt: "Ekrin ve apokrin çıkışları nasıl ayrılır?",
        answer:
          "Ekrin yüzey poruna; apokrin çoğunlukla belirli bölgelerin kıl folikülüne açılır.",
      },
      {
        prompt: "Dermis ile hipodermis aynı katman mı?",
        answer:
          "Hayır; gerçek derinin bağ doku katmanı dermistir, hipodermis bunun altındaki destek dokusudur.",
      },
    ],
    questions: [
      Q(
        "deri",
        1,
        "Bir epitel kesitinde kendi kan damarı ağı yoktur; alt hücreler canlıdır. Beslenme için en uygun açıklama hangisidir?",
        "Alttaki bağ dokusundan difüzyonla madde alabilir.",
        [
          "Canlı hücreler besine gereksinim duymaz.",
          "Epitelin her boşluğunda gizli bir atardamar vardır.",
          "Bütün besinler yalnız deri yüzeyinden emilir.",
          "Bu bulgular birlikte kesinlikle bulunamaz.",
        ],
        "Kendi damarına sahip olmak ile komşu dokudan madde almak farklıdır.",
        "Epidermis avaskülerdir fakat canlı alt katmanları alttaki bağ dokusunun sağladığı maddeleri difüzyonla alır. Damar yokluğu, yaşamın veya sinir uçlarının yokluğu değildir.",
      ),
      Q(
        "deri",
        2,
        "Bir kıl telinin deri dışında kalan keratinleşmiş kısmı kesiliyor, canlı kök zarar görmüyor. Hangi açıklama uygundur?",
        "Dıştaki keratinleşmiş telin kesilmesi, canlı kökün kesilmesiyle aynı değildir.",
        [
          "Kıl telinin her noktası kan damarı taşır.",
          "Kıl yalnız dermisin salgıladığı sıvıdan oluşur.",
          "Kıl kökü bulunmadığı için kıl büyüyemez.",
          "Kıl teli kendisi düz kastır.",
        ],
        "Dış tel ile kökü ayır.",
        "Dış kıl teli keratinleşmiş hücrelerden oluşur; canlı büyüme bölgesi kökle ilişkilidir. Kılın dikleşmesini sağlayan kas ayrı bir yapıdır.",
      ),
      Q(
        "deri",
        3,
        "A ter bezinin kanalı doğrudan yüzey poruna; B'ninki kıl folikülüne açılıyor. Ekrin ve apokrin örneklerinin doğru eşleşmesi hangisidir?",
        "A ekrin; B bu şemada apokrin.",
        [
          "A apokrin; B ekrin.",
          "İkisi de mutlaka ekrindir.",
          "Ter bezleri hiçbir zaman yüzeye açılamaz.",
          "B yalnız bir fotoreseptördür.",
        ],
        "Şemadaki çıkışın hedefini izle.",
        "Ekrin kanallar deri yüzeyine açılır. Apokrin bezler çoğunlukla belirli bölgelerde folikülle ilişkilidir; bu nedenle verilen örnekte A ekrin, B apokrindir.",
      ),
      Q(
        "deri",
        4,
        "Sabit bir basınç başlarken ve kalkarken güçlü, sürerken çok az yanıt veren reseptör için hangi çıkarım desteklenir?",
        "Uyaranın değişim anları hakkında belirgin bilgi verir.",
        [
          "Bütün derideki tüm sinirler çalışmayı bırakmıştır.",
          "Her reseptörün uyumu aynı hızdadır.",
          "Basınç sürerken ciltte artık hiçbir reseptör etkin olamaz.",
          "Bu reseptör yalnız ışığı algılar.",
        ],
        "Veri tek reseptörün zaman örüntüsünü anlatıyor.",
        "Bu örüntü hızlı uyum gösteren mekanoreseptörlere uygundur. Diğer reseptörler süren temas bilgisi verebilir; tek örüntü tüm deri için genellenemez.",
      ),
      Q(
        "deri",
        5,
        "Bir bağ doku hücresinin temel görevi kollajen lif ve ara madde bileşenlerini üretmektir. Hangi hücre en uygun eşleşmedir?",
        "Fibroblast.",
        ["Plazma hücresi.", "Eritrosit.", "Osteoklast.", "Fotoreseptör."],
        "Matriks üretimini antikor salgısından ayır.",
        "Fibroblastlar bağ dokusu matriksini üretir. Plazma hücreleri antikor salgılar; aynı dokuda bulunan hücrelerin işlevleri birbirinin yerine geçmez.",
      ),
      Q(
        "deri",
        6,
        "Deri altındaki yağlı hipodermis için doğru ifade hangisidir?",
        "Deri altı destek ve yalıtım dokusudur; burada gerçek derinin iki katmanı epidermis ve dermistir.",
        [
          "Epidermisin yüzeyindeki ölü keratin tabakasıdır.",
          "Bütün tat tomurcuklarının bulunduğu yerdir.",
          "Yalnız kıl telinin dış kısmıdır.",
          "Derinin kendi kan damarı olmayan tek tabakası olmak zorundadır.",
        ],
        "Adındaki deri altı bilgisini katman sınırıyla birleştir.",
        "Hipodermis epidermis ve dermisin altında bulunur; yağ depolama, yastıklama ve ısı yalıtımına katkı yapar. Gerçek deri katmanlarıyla aynı ad altında karıştırılmaz.",
      ),
      Q(
        "deri",
        7,
        "Bir mekanoreseptör süren titreşim boyunca yanıt verirken sabit basınçta yanıtı azalıyor. Bu fark için uygun açıklama hangisidir?",
        "Titreşim yinelenen şekil değişimleri içerir.",
        [
          "Titreşimde sinir hücreleri ışık üretmek zorundadır.",
          "Sabit basınçta bütün duyu merkezleri kaybolur.",
          "Hızlı uyumlu reseptörler hiçbir titreşimi algılayamaz.",
          "Titreşim yalnız tat reseptörlerinin uyaranıdır.",
        ],
        "Sabitlik ile yinelenen değişimi ayır.",
        "Hızlı uyum, değişim anlarına duyarlılıkla bağdaşır. Titreşim ardışık değişim içerdiğinden Pacini gibi yapılar süren titreşim hakkında bilgi sağlayabilir.",
      ),
      Q(
        "deri",
        8,
        "Derinin yüzeye yakın papiller dermisi daha gevşek, derindeki retiküler dermisi yoğun düzensiz bağ dokusudur. Hangi sonuç uygundur?",
        "Dermisin bütününü yalnız gevşek bağ dokusu saymak ayrıntıyı kaybettirir.",
        [
          "Dermisin her bölümü kıkırdaktır.",
          "Yoğun bağ dokuda hiç matriks bulunmaz.",
          "Papiller dermis göz merceğinin bölümüdür.",
          "Dermis bütünüyle cansız keratinden oluşur.",
        ],
        "Aynı katmanın alt bölgeleri farklı örgütlenebilir.",
        "Dermiste bağ dokusunun bölgesel örgütlenmesi değişir. Kollajen ve elastik lifler dayanıklılık ve esneklik sağlar; tek alt bölgeyi tüm katmana genellemek yanlıştır.",
      ),
      Q(
        "deri",
        9,
        "Ter üretimi ve diğer ısı yolları eşit iki ortamdan X'te daha çok ter buharlaşıyor. Yalnız ter yoluyla ısı kaybı hakkında ne söylenebilir?",
        "X'te buharlaşma yoluyla ısı kaybı daha fazladır.",
        [
          "Ter yüzeyde durduğu için buharlaşmayla aynı miktar enerji alır.",
          "Her iki kişinin tüm vücut sıcaklığı mutlaka aynıdır.",
          "Terin buharlaşması her koşulda vücuda ısı verir.",
          "Buharlaşmanın ısı alışverişinde rolü yoktur.",
        ],
        "Faz değişimi enerji gerektirir.",
        "Buharlaşma için enerji alınır. Diğer koşullar eşitken daha fazla terin buharlaşması bu yolla daha çok ısı uzaklaştırır; sonuç bütün vücut sıcaklığına ilişkin kesin bir tahmin değildir.",
      ),
      Q(
        "deri",
        10,
        "Bir deri şemasında epidermise uzanan serbest sinir uçları gösteriliyor. Hangisi bu şekille uyumludur?",
        "Epidermisin damarsız oluşu, serbest sinir uçlarının bulunmasını dışlamaz.",
        [
          "Epidermiste mutlaka kendi atardamar ağı vardır.",
          "Bütün epidermis hücreleri kemik hücresidir.",
          "Serbest sinir uçları yalnız antikor üretir.",
          "Derideki bütün reseptörler tek bir sıcaklık kapsülüdür.",
        ],
        "Damar ve sinir ayrı yapılardır.",
        "Avaskülerlik damar ağı bulunmamasıdır. Sinir uçları ve canlı alt epitel hücreleri bununla çelişmez; duyusal yapıların görev ve dağılımları da çeşitlidir.",
      ),
    ],
  },
  {
    id: "duyu-organlari-dil-burun",
    topic: "detail-299",
    title: "Dil ve burun: temel tatlardan lezzete",
    minutes: 38,
    objectives: [
      "Papilla, tat tomurcuğu ve tat hücresini birbirinden ayır.",
      "Tat ve koku yollarının başlangıç hücrelerini ve ilk merkezlerini karşılaştır.",
      "Temel tat, aroma ve lezzet ayrımını gözlemden açıkla.",
    ],
    source:
      "MEBİ AYT Biyoloji Konu Özetleri, dil ve burun; OGM Dersler Cepte III, kimyasal duyular. Kaynak kapsamından geliştirilmiş özgün anlatım ve öğretim soruları.",
    sections: [
      S(
        "Kimyasal duyu bir temas zinciridir",
        "Tat ve koku kimyasal maddeler hakkında bilgi sağlar; fakat havada veya yiyecekte bir madde bulunması tek başına algının oluşması değildir. Molekül uygun yüzeye ulaşmalı, mukus veya tükürükte çözünmeli ve uygun reseptör mekanizmasını etkilemelidir. Ardından hücre yanıtı sinir sisteminin işleyebildiği bir iletiye dönüşür.",
        "Bu iki duyuya kemoresepsiyon denmesi, ikisinin aynı hücre tipinden ve aynı sinir yolundan geçtiği anlamına gelmez. Tat hücresi özelleşmiş epitel hücresidir; koku reseptör hücresi ise nörondur. Öğrenirken ortak uyaran türünü ve farklı hücresel yolu aynı anda düşünmek, soruda benzer sözcükler arasında yanlış eşleştirmeyi önler.",
      ),
      S(
        "Koku epiteli nerede, mukus ne işe yarar?",
        "Kokuya duyarlı bölge burun boşluğunun üst kısmındadır. Reseptör nöronlar destek hücreleriyle birlikte epitelde bulunur; bezlerin salgıladığı mukus yüzeyi nemli tutar. Kokulu moleküllerin mukusta çözünmesi, reseptörlerin bulunduğu yüzeyle etkileşmesine yardım eder. Burun boşluğunun her hücresi koku reseptörü değildir.",
        "Koku nöronunun yüzeye uzanan dendritik ucunda silyalar bulunur; aksonu ise koku soğancığına doğru ilerler. Silyayı dışarıdaki kokuyu beyne taşıyan bir sinir teli gibi düşünme: ilk etkileşim burada olur, hücrenin sinirsel çıkışı aksondadır. Şemada molekül, hücre gövdesi ve akson oklarını ayrı izleyerek yönü koru.",
      ),
      S(
        "Koku soğancığı ve ilk kortikal yol",
        "Koku nöronlarından gelen aksonlar soğancıkta sonraki sinir hücreleriyle bağlantı kurar. Koku bilgisinin ilk kortikal iletimi, birçok başka duyudan farklı olarak önce zorunlu bir talamik röleden geçmez. Bu özellik tat ve koku yolunu karşılaştıran sorularda ayırt edici bir basamaktır.",
        "Bunun anlamı talamusun koku ile ilgili hiçbir işlemde yer alamaması değildir; daha sonraki ağlar arasında bağlantılar vardır. Ayrıca algı yalnız soğancıkta biten bir kimlik etiketi değildir: dikkat, bağlam ve anılar koku deneyimine katılabilir. Soruda ilk yol mu, daha sonraki bütün işleme mi soruluyor, bunu ayır.",
      ),
      S(
        "Tek koku, tek düğme kadar basit değil",
        "Farklı kokulu moleküller farklı reseptör örüntülerini etkileyebilir; bir kokunun tanınması çok sayıda hücrenin birlikte ürettiği örüntüye dayanabilir. Tek bir yiyeceğin aroması da çok sayıda uçucu bileşen içerir. Bu yüzden her nesneye yalnız bir tek nöron ayrıldığını varsaymak doğru bir genel model değildir.",
        "Sürekli bir kokuya dikkatimizin ve duyarlılığımızın azalması uyum süreçleriyle ilişkilidir. Bu azalma, ortamdaki maddenin kesin kaybolduğunu veya her koku hücresinin aynı hızla sustuğunu kanıtlamaz. Laboratuvardaki koku yolu açık/kapalı karşılaştırması sadece molekülün erişimini temsil eder; gerçek reseptör afinitesi ve kişisel eşik hesaplamaz.",
      ),
      S(
        "Papilla, tomurcuk ve hücre: üç ölçek",
        "Dilin yüzeyindeki bazı çıkıntılar papilla olarak adlandırılır. Tat tomurcukları uygun papillalarda ve ağız-yutak bölgesinin başka alanlarında bulunabilir; her tomurcuk birden çok hücreden oluşur. Tat hücresi tomurcuğun içindeki özelleşmiş hücredir. Bir organı, doku içindeki yapıyı ve tek hücreyi aynı adla çağırmak sıklık sorularını da bozar.",
        "Her papilla tat tomurcuğu taşımak zorunda değildir; örneğin ipliksi papillalar daha çok mekanik görevlerle ilişkilidir. Tomurcuk sayısı kişi ve yaşa göre değişir; bir insandaki toplam sayıyı tek bir papillaya yükleme. Şemadaki büyütme basamaklarını izlediğinde dilin tamamından tek bir tat hücresine nasıl indiğini açıkça görmelisin.",
      ),
      S(
        "Tat hücresinden sinire aktarım",
        "Yiyecekteki çözünmüş madde tat hücresinin reseptör mekanizmalarını etkiler. Oluşan hücresel değişim, komşu duyu siniri ucuna kimyasal haber aktarılmasına ve sinirsel iletime katkı yapar. Bu sıra, tat hücresinin kendisini uzun aksonlu bir koku nöronu gibi çizmemen gerektiğini gösterir.",
        "Tat sinirleri bilgiyi beyin sapındaki bağlantılar üzerinden talamusa ve tatla ilgili kortikal alanlara taşır. Okul düzeyindeki kısa yol şeması, bu ara bağlantıların hepsini çizmek zorunda değildir; ama yolu doğrudan dilde oluşan bir görüntünün beyne taşınması gibi anlatmamalıdır. Tat hücresi, sinir ve merkez farklı basamaklardır.",
      ),
      S(
        "Beş temel tat ve yanlış dil haritası",
        "Tatlı, tuzlu, ekşi, acı ve umami temel tat nitelikleri olarak ele alınır. Bu niteliklerle ilişkili hücreler dilin tat alan bölgelerine dağılmıştır; tatlı yalnız uçta, ekşi yalnız yanda diye birbirinden kesin ayrılmış bir harita doğru değildir. Bölgesel duyarlılık farkı ile bir niteliğin yalnız bir bölgede algılanması aynı iddia değildir.",
        "Öte yandan farklı hücrelerin dilde dağılması, her tek tat hücresinin beş niteliğe de aynı yanıtı verdiği anlamına gelmez. Reseptör yolları ve hücre alt tipleri özelleşebilir. Modelde seçtiğin hücre belirli bir tat yolunun temsili örneğidir; bu hücrenin uyumsuz kartta etkin olmaması dilin o tadı hiç algılamadığını göstermez.",
      ),
      S(
        "Aroma ile temel tat birleşince",
        "Bir yiyeceği çiğnerken uçucu moleküller ağızdan burun bölgesine ulaşabilir; temel tat sinyallerine aroma katkısı eklenir. Isı, doku ve başka kimyasal duyumlar da lezzetin parçasıdır. Biberin yakıcılığı veya nanenin serinliği, beş temel tatla bire bir aynı sınıflama değildir.",
        "Burun erişimi azaldığında yiyeceğin karakterini seçmek zorlaşabilir; buna rağmen tuzluluk veya tatlılık gibi temel tat bilgisi kalabilir. Koku yolunu kapattığında bütün tat yolunu da sıfırlayan bir uygulama modeli bu ayrımı yanlış öğretir. Aynı yiyeceğin iki kanalını ayrı izleyip hangi bilginin korunduğunu düşün.",
      ),
      S(
        "Bir belirtiden bütün sistemi teşhis etme",
        "Ağız kuruluğu çözünme ve tat hücresine erişim koşullarını değiştirebilir; burun tıkanıklığı ise aroma erişimini etkileyebilir. Benzer biçimde yiyeceği daha az ayırt etme gözlemi farklı aşamalardan kaynaklanabilir. Tek bir gözlem, belirli bir hücrenin mutlaka yok olduğunu veya bütün duyu sinirlerinin kesildiğini kanıtlamaz.",
        "Bu dersin amacı anatomi ve nedensel sırayı öğretmektir. Sanal molekül ve bağlantıları değiştirerek verilmiş koşulların sonucunu inceleyebilirsin; bilinmeyen kimyasalı koklama veya tatma gerekmiyor. Kendi sağlık durumun için tanı üreten bir test yapılmaz. Soruları çözerken yalnız kartta verilen erişim, hücre ve yol kanıtlarını kullan.",
      ),
    ],
    examples: [
      E(
        "Burun erişimi değişince",
        "Sanal yiyeceğin tuzlu niteliği değişmiyor. Yalnız aromanın koku epiteline ulaşması engelleniyor. Hangi bilgi kalabilir?",
        "Tat ve koku girişlerini ayrı tut.",
        [
          "Kart temel tuzluluk uyaranının hâlâ tat hücrelerine ulaştığını söylüyor.",
          "Engellenen aşama aroma moleküllerinin koku epiteline erişimi; tat hücresinin bağlantısı değil.",
          "Tuzluluk bilgisi kalabilir, aroma katkısı azalır; bütün lezzet aynı kalmak zorunda değildir.",
        ],
        "Temel tuzluluk kalabilir; aroma katkısı azalır.",
        "Bir kanalı değiştirmek diğerinin otomatik olarak yok olması değildir.",
        "Burun kapalıysa beş temel tat da mutlaka yoktur demek.",
      ),
      E(
        "İki reseptörün hücre kimliği",
        "A reseptörünün silyalı dendriti ve soğancığa giden kendi aksonu var. B özelleşmiş epitel hücresi ve ayrı bir duyu sinirine haber veriyor. Eşleştirme?",
        "Aksonu hangi hücrenin taşıdığına bak.",
        [
          "A'nın dendrit ve kendi aksonu nöron yapısını gösterir.",
          "Koku reseptörü nörondur; tat hücresi ayrı sinir ucuyla bağlantılı özelleşmiş epitel hücresidir.",
          "A koku nöronu, B tat hücresidir; ikisi de kimyasal uyarıyla çalışabilir.",
        ],
        "A koku nöronu; B tat hücresi.",
        "Ortak kemoreseptör özelliğini korurken hücre tiplerini ayırdık.",
        "Kemoreseptör olan her hücrenin aynı yapıda olduğunu varsaymak.",
      ),
      E(
        "Dil haritası iddiasını sınama",
        "Dilin iki farklı tat alan bölgesinden alınan hücre grupları hem tatlıya hem tuzluya yanıt verebiliyor. Bu gözlem her tek hücrenin beş tadı aldığına kanıt mı?",
        "Grup ile tek hücre düzeyini ayır.",
        [
          "Gözlem hücre grubuna ait; grup içinde farklı alt tipler bulunabilir.",
          "Birden çok bölgede aynı tat niteliklerinin bulunması kesin bölge haritasına karşıdır.",
          "Fakat tek tek hücrelerin yanıt repertuvarı ölçülmediği için her hücreye beş tat atfedilemez.",
        ],
        "Hayır; farklı tat hücreleri aynı bölgelerde birlikte bulunabilir.",
        "Bölge dağılımından tek hücre özelliğine atlamadık.",
        "Yanlış bir haritayı düzeltirken ters bir aşırı genelleme kurmak.",
      ),
      E(
        "İlk röle karşılaştırması",
        "Kısa şemada X: reseptör→soğancık→ilk koku korteksi; Y: tat hücresi→sinir bağlantıları→talamus→tat korteksi. İlk kortikal iletimden önce zorunlu talamik röleyi hangisi gösteriyor?",
        "Yalnız verilen ilk yolları kıyasla.",
        [
          "X'in ilk kortikal yolunda önce gösterilmiş bir talamik röle yok.",
          "Y'de korteksten önce talamus açıkça verilmiş.",
          "Y ilk röleyi gösterir; bu, talamusun koku ile ilgili sonraki hiçbir işlemde bulunamayacağı demek değildir.",
        ],
        "Y; tat yolu.",
        "İlk yol ile bütün merkezi işleme aynı kapsam değildir.",
        "Koku şemasında talamus yok diye talamusun kokuyla hiçbir ilişkisi yok demek.",
      ),
    ],
    recall: [
      {
        prompt: "Koku reseptörü ile tat hücresinin temel hücresel farkı?",
        answer:
          "Koku reseptörü kendi aksonu olan nörondur; tat hücresi ayrı sinir ucuna haber veren özelleşmiş epitel hücresidir.",
      },
      {
        prompt: "Tatlı sadece dilin ucunda mı?",
        answer:
          "Hayır; farklı tat hücreleri tat alan bölgelere dağılır. Bu durum her tek hücrenin beş tadı aldığı anlamına gelmez.",
      },
      {
        prompt: "Lezzet yalnız beş tat mı?",
        answer:
          "Hayır; aroma, ısı, doku ve başka kimyasal duyumlar da katkı yapar.",
      },
      {
        prompt: "İlk koku korteksi yolunun talamik farkı?",
        answer:
          "Önce zorunlu talamik röleden geçmez; sonraki koku ağlarıyla talamusun ilişkisi bütünüyle dışlanmaz.",
      },
    ],
    questions: [
      Q(
        "dil-burun",
        1,
        "Kendi dendritik silyaları ve koku soğancığına giden aksonu bulunan bir reseptör hücresi hangisidir?",
        "Koku reseptör nöronu.",
        [
          "Tat tomurcuğundaki her epitel hücresi.",
          "Kırmızı kan hücresi.",
          "Yağ bezi salgısı.",
          "Göz merceğinin tamamı.",
        ],
        "Kendi aksonu hücrenin sinirsel kimliğini gösterir.",
        "Koku reseptör hücresi bir nörondur. Yüzeydeki silyaları kimyasal etkileşimle, aksonu soğancığa iletimle ilişkilidir; tat hücresi ise ayrı bir duyu sinirine haber verir.",
      ),
      Q(
        "dil-burun",
        2,
        "Dilin çıkıntısı, çıkıntıdaki duyu yapısı ve bu yapının içindeki reseptör hücre doğru genişten dara hangi sıradadır?",
        "Papilla→tat tomurcuğu→tat hücresi.",
        [
          "Tat hücresi→papilla→tat tomurcuğu.",
          "Koku soğancığı→papilla→retina.",
          "Tat tomurcuğu→dilin tamamı→papilla.",
          "Akson→epifiz→papilla.",
        ],
        "Organ yüzeyinden yapı ve tek hücreye in.",
        "Papilla yüzeydeki çıkıntıdır; uygun papillalarda tomurcuklar, onların içinde tat hücreleri bulunur. Her papilla mutlaka tat tomurcuğu içermez.",
      ),
      Q(
        "dil-burun",
        3,
        "Bir yiyeceğin tatlı molekülleri tat hücrelerine ulaşmaya devam ediyor. Yalnız aroma moleküllerinin koku epiteline erişimi engelleniyor. Hangi sonuç en uygundur?",
        "Temel tatlılık kalabilir, aroma katkısı azalır.",
        [
          "Bütün temel tatların mutlaka silinmesi gerekir.",
          "Tat hücreleri aniden koku nöronuna dönüşür.",
          "Tatlılık yalnız optik sinirle taşınır.",
          "Aroma erişiminin lezzetle hiçbir ilişkisi olamaz.",
        ],
        "İki giriş kanalını ayrı tut.",
        "Verilen engel koku erişimine aittir; tatlı uyaranın tat hücresine ulaşması korunur. Bu yüzden temel tat ile aroma katkısı farklı etkilenebilir.",
      ),
      Q(
        "dil-burun",
        4,
        "Farklı tat hücrelerinin dilin tat alan bölgelerine dağılmış olması hangi iddiayı desteklemez?",
        "Her tek tat hücresi beş temel tada da aynı yanıtı verir.",
        [
          "Kesin olarak ayrılmış tatlı-uç haritası aşırı basittir.",
          "Aynı bölgede farklı tat hücreleri birlikte bulunabilir.",
          "Tat hücresi ile hücre grubu farklı inceleme düzeyleridir.",
          "Bölge dağılımı tek hücre yanıtını tek başına belirlemez.",
        ],
        "Dağılım bilgisi tek hücrenin bütün özelliklerini vermez.",
        "Bir bölgede farklı hücre alt tipleri bulunabilir. Bu nedenle bölgesel çeşitlilikten her hücrenin beş tada aynı yanıtı verdiği sonucu çıkmaz; diğer ifadeler bu ayrımı korur.",
      ),
      Q(
        "dil-burun",
        5,
        "Kokunun ilk kortikal yolu için doğru sınırlı ifade hangisidir?",
        "İlk koku korteksine iletim önce zorunlu talamik röle gerektirmez.",
        [
          "Talamusun koku ile ilgili hiçbir sonraki ağla bağlantısı olamaz.",
          "Koku yalnız omurilikte algılanır.",
          "Koku nöronları mutlaka tat tomurcuğunda başlar.",
          "Koku sinyali kortekse hiçbir zaman ulaşmaz.",
        ],
        "İlk yol ile sonraki bütün ağları ayır.",
        "Okul düzeyinde ayırt edici özellik ilk kortikal koku yolunun önceden zorunlu talamik röle taşımamasıdır. Talamusun daha sonraki koku işlemlerindeki ilişkisi bütünüyle dışlanmaz.",
      ),
      Q(
        "dil-burun",
        6,
        "Tat hücresine ulaşacak maddelerin tükürükte çözünmesi belirgin azalıyor; diğer bağlantılar korunuyor. İlk etkilenen basamak için en uygun seçenek hangisidir?",
        "Kimyasal uyaranın reseptör yüzeyine uygun erişimi.",
        [
          "Retinadaki ışık kırılması.",
          "Kulak kemikçiklerinin sayısı.",
          "Omurgadaki kemiklerin kaynaşması.",
          "Bütün sinirlerin zorunlu olarak kopması.",
        ],
        "Sorunun değiştirdiği koşul sıvıda çözünmedir.",
        "Tat uyaranı çözünerek reseptörle etkileşir. Çözünme/erişim değişimi algıyı etkileyebilir; bundan bütün sinirlerin koptuğu gibi çok daha güçlü bir sonuç çıkmaz.",
      ),
      Q(
        "dil-burun",
        7,
        "Sürekli bir kokunun daha az fark edilmesi gözleniyor. Yalnız bu gözlemden hangisi kesin söylenemez?",
        "Ortamdaki kokulu madde tamamen yok olmuştur.",
        [
          "Duyu yanıtında uyum süreçleri rol oynayabilir.",
          "Dikkat değişimi deneyime katkı yapabilir.",
          "Algı şiddeti ile ortamdaki molekül varlığı aynı ölçüm değildir.",
          "Bütün hücreler için aynı zaman sabiti belirlenmemiştir.",
        ],
        "Algının azalması ortamın kimyasal ölçümü değildir.",
        "Uyum ve merkezi süreçler sürekli kokunun daha az fark edilmesine katkı sağlayabilir. Bu gözlem ortamda hiç molekül kalmadığını tek başına kanıtlamaz.",
      ),
      Q(
        "dil-burun",
        8,
        "Bir öğrencinin 'koku ve tat ikisi de kemoresepsiyon, o hâlde ilk reseptör hücreleri de aynı tiptir' çıkarımındaki hata nedir?",
        "Ortak uyaran türünden aynı hücre tipi sonucuna atlaması.",
        [
          "Tat ve kokuda hiçbir kimyasal uyaran bulunmaması.",
          "Koku nöronunda asla akson bulunmaması.",
          "Tat hücresinin mutlaka kemik hücresi olması.",
          "Kemoresepsiyonun yalnız ışıkla başlaması.",
        ],
        "İşlevsel ortaklık yapısal özdeşlik değildir.",
        "Koku reseptörü nöron, tat reseptör hücresi özelleşmiş epiteldir. İkisinin kimyasal maddelerle uyarılması bu hücresel farkı ortadan kaldırmaz.",
      ),
      Q(
        "dil-burun",
        9,
        "Aşağıdakilerden hangisi bu derste temel tat niteliği olarak sınıflanır?",
        "Umami.",
        [
          "Nanedeki serinlik.",
          "Yiyeceğin sertliği.",
          "Biberin yakıcılığı.",
          "Yiyeceğin sıcaklığı.",
        ],
        "Beş temel tat ile diğer ağız duyumlarını ayır.",
        "Tatlı, tuzlu, ekşi, acı ve umami temel tatlardır. Seçeneklerdeki biber yakıcılığı kimyasal somatik duyu, sıcaklık ve sertlik ise başka duyusal katkılardır; temel tat adı olan umamidir.",
      ),
      Q(
        "dil-burun",
        10,
        "Bir koku şemasında A yüzeyde mukusa uzanan silyalı dendritik uç, B soğancığa ilerleyen aksondur. Kimyasal ilk etkileşim ve sinirsel çıkış için doğru eşleşme?",
        "İlk etkileşim A; hücrenin aksonal çıkışı B.",
        [
          "İlk etkileşim B; B yalnız bir ter kanalıdır.",
          "A ve B aynı dış kıl telidir.",
          "Her iki yapı da yalnız ışığı kırar.",
          "Kokulu molekül doğrudan aksonun içinde yiyecek olarak taşınır.",
        ],
        "Giriş yüzeyi ile sinirsel çıkış yönünü izle.",
        "Kokulu madde mukusta çözünerek dendritik silyalardaki reseptör mekanizmalarıyla etkileşir. Nöronun aksonu ise sinirsel bilgiyi soğancığa taşır; molekülün kendisi akson boyunca tat olarak taşınmaz.",
      ),
    ],
  },
  {
    id: "duyu-organlari-goz",
    topic: "detail-300",
    title: "Göz: ışığın odağından görme alanına",
    minutes: 52,
    objectives: [
      "Işığın gözdeki yolu ile sinirsel bilgi yolunu ayrı izle.",
      "Yakın-uzak uyumu ve göz bebeği yanıtını nedenleriyle açıkla.",
      "Retina yapısı, görme alanı ve kırılma kusurlarını karşılaştır.",
    ],
    source:
      "MEBİ AYT Biyoloji Konu Özetleri, göz ve duyu organı rahatsızlıkları; OGM Dersler Cepte III, görme. Kaynak kapsamından geliştirilmiş özgün anlatım, sınırlı optik model ve öğretim soruları.",
    sections: [
      S(
        "Göz küresi tek başına çalışmaz",
        "Görme, ışığın gözde optik olarak yönlendirilmesiyle başlar; retinadaki hücre yanıtları ve beyindeki işleme ile sürer. Kaşlar, kirpikler ve göz kapakları dış etkilerden korunmaya; gözyaşı yüzeyin nemli ve kaygan kalmasına katkı yapar. Gözyaşı savunma bileşenleri de taşır, fakat bütün enfeksiyonları kesin engelleyen bir kalkan değildir.",
        "Dış göz kasları iki gözün bakışını yönlendirir; bunlar göz merceğinin uyumunu yapan siliyer kasla aynı yapı değildir. Soruda gözün bir cisme çevrilmesi ile merceğin o uzaklığa uyarlanması ayrı eylemler olabilir. Önce mekanik yönlendirme, koruyucu yapılar ve optik ayarlamaları birbirinden ayır.",
      ),
      S(
        "Dıştan içe üç örtü ve öndeki saydam pencere",
        "Dış fibröz örtü sklera ve önde saydam korneayı içerir. Sklera koruyucu ve destekleyicidir; kornea ışığın önemli ölçüde kırıldığı saydam yüzeydir. Bu ikisinin aynı dış örtünün farklı özellikteki bölümleri olması, gözün her yerinin saydam olduğunu göstermez.",
        "Ortadaki damarlı ve pigmentli koroit gözün beslenmesine ve içeride gereksiz ışık saçılmasının azalmasına katkı sağlar. İçte retina fotoreseptörleri ve bağlantılı sinir hücrelerini içerir. İris, siliyer yapı ve retina farklı görevler taşır; renkli iris gördüğünde onu ışığı algılayan ağ tabakayla karıştırma.",
      ),
      S(
        "Göz bebeği açıklıktır, mercek değildir",
        "Göz bebeği irisin ortasındaki açıklıktır. İrisin dairesel ve radyal kas gruplarının karşıt etkileri açıklığın büyüklüğünü değiştirir; parlak ışıkta küçülme, daha loş koşullarda büyüme retinaya ulaşan ışık miktarını düzenlemeye yardım eder. Bütün irisin aynı biçimde kasılıp gevşediği tek bir kas modeli yeterli değildir.",
        "Açıklığın değişmesi ışık miktarını etkiler; merceğin eğriliğini değiştirmek ise odaklanmayla ilgilidir. Yakına bakışta bu yanıtlar birlikte görülebilse de tek ve aynı mekanizma değildir. Laboratuvarda aydınlık ve bakış uzaklığı ayrı kontrollerdir; birini değiştirince diğerinin zorunlu olarak aynı yöne gitmesi beklenmez.",
      ),
      S(
        "Kornea, mercek ve iki sıvı bölgesi",
        "Işık korneadan geçer, göz bebeği açıklığından merceğe ulaşır ve retina yönünde ilerler. Kırılmaya kornea da mercek de katkı yapar; bütün kırılmayı yalnız merceğe yüklemek gözün optiğini eksik anlatır. Mercek odağı uzaklık değişimine uyarlamaya yardım eder.",
        "Ön bölümdeki aköz sıvı ile merceğin arkasındaki camsı yapı aynı şey değildir. Aközün üretim ve dışa akış dengesi göz içi basıncıyla ilişkilidir; camsı yapı arka boşluğu doldurur ve biçimin korunmasına katkı yapar. Modelde tek eşdeğer mercek kullanılması yalnız ışın hesabını sadeleştirir; gerçek gözün bütün parçalarının tek mercekten oluştuğunu iddia etmez.",
      ),
      S(
        "Yakına uyum: kas, bağ ve eğrilik zinciri",
        "Yakındaki bir cisme odaklanırken siliyer kas kasılır; merceği asılı tutan zonular liflerin gerginliği azalır. Mercek kendi esnekliği sayesinde daha bombeli hâle gelir ve kırma gücü artar. Burada asıcı bağlar kas değildir; onların gevşeyip gerilmesi pasif mekanik bağlantı değişimidir.",
        "Daha uzağa bakışta siliyer kas daha gevşek, asıcı lifler daha gergin ve mercek daha yassıdır. Bir zincirin tek halkasını ters öğrenmek bütün sonucu ters çevirir: yakın→kas kasılması→bağ gerginliği azalması→bombelik artışı sırasını nedenleriyle kur. İleri yaşta merceğin esnekliğinin azalması yakın uyumu güçleştirebilir; bu, göz küresinin uzamasıyla aynı durum değildir.",
      ),
      S(
        "Çubuk ve koni: görevler birbirini tamamlar",
        "Çubuk hücreleri loş ışık koşullarında ve çevresel görmede önemlidir; yüksek ayrıntı ve renk çözümlemesi koni sistemiyle aynı düzeyde değildir. Koni hücreleri daha aydınlık koşullarda renk ve ayrıntı ayrımına katkı sağlar. Farklı koni pigmentlerinin yanıt örüntüleri renk algısına birlikte katılır. Görme pigmentlerinde ışıkla etkileşen A vitamini türevi bileşenler bulunur; pigment, bütün fotoreseptör hücresinin kendisi değildir.",
        "Koni yoğunluğu foveada yüksektir; baktığın nesnenin merkezî ayrıntısı bu bölgeyle ilişkilidir. Çevresel nesnelerin görüntüsü retinanın başka bölgelerine düşer; bütün ışığın tek bir sarı noktada toplanması gerekmez. Yaklaşık hücre oranları kişiye ve sayım yöntemine göre değişebilir; görev ayrımını tek bir kesin yüzdeyi ezberleyerek kurma.",
      ),
      S(
        "Kör nokta ile sarı nokta aynı yapı değil",
        "Optik disk sinir liflerinin gözden çıktığı bölgedir ve fotoreseptör içermez; bu yüzden kör nokta olarak adlandırılır. Sarı noktanın merkezindeki fovea ise yoğun konilerle yüksek ayrıntı görmeye katkı yapar. Sinirin çıktığı yerin daha çok sinir hücresi bağlantısı taşıması, orada daha çok ışık algılandığı anlamına gelmez.",
        "Gözün kesitinde mercek, retina düzlemi, fovea ve optik disk ayrı etiketlenmelidir. Sinir lifini retinanın herhangi bir noktasından keyfî olarak başlatmak anatomik ilişkiyi bozar. Kendi kör noktanı ölçmeden de verilen bir şekilden fotoreseptör bulunmayan alanın sonucunu çıkarabilirsin; bu ders kişisel görme taraması yapmaz.",
      ),
      S(
        "Işık yolu biter, sinirsel işleme sürer",
        "Işık retinanın hücre katmanlarından geçerek fotoreseptörlerin ışığa duyarlı bölgelerine ulaşır. Fotoreseptördeki değişim dereceli hücresel yanıtlarla başlar; bilgi ara hücreler üzerinden ganglion hücrelerine aktarılır. Optik siniri oluşturan ganglion aksonlarında aksiyon potansiyelleri taşınır.",
        "Işık ışınıyla sinirsel iletiyi aynı ok gibi düşünme: ışık mercekten kırılarak geçer, aksiyon potansiyeli korneadan geçip kırılmaz. Retinada optik görüntü ters oluşabilir; beyin bir kâğıdı fiziksel olarak döndürmek yerine bu sinyallerden uzamsal yorum oluşturur. Algılanan dünyanın yönünü yalnız retina görüntüsünün geometrisiyle açıklamak yetersizdir.",
      ),
      S(
        "İki göz, iki görme alanı ve kısmi çapraz",
        "Her gözün burun tarafındaki retina yarısından çıkan lifler optik kiyazmada çapraz yaparken diğer yarının lifleri aynı tarafta kalır. Böylece sol görme alanına ilişkin bilgiler sağ, sağ alanın bilgileri sol beyin tarafındaki görme yollarına yönlendirilir. Bütün sol gözün yalnız sağ beyne gittiği kuralı doğru değildir.",
        "İki gözün ortak gördüğü alanın birlikte işlenmesi derinlik algısına katkı sağlar. Göz adı ile görme alanı adını ayır: sol göz hem ortak alanın sağ hem sol tarafına ilişkin bilgi alabilir. Şemada renkler alanı kodluyorsa önce renk anahtarını oku; renkli çizgiyi gözün tamamı gibi izleme.",
      ),
      S(
        "Kırılma kusurunda odak ile retinayı karşılaştır",
        "Gevşek uzak bakış koşulunda miyop gözde odak retinanın önünde kalabilir; gözün uzunluğu veya optik gücü bu ilişkiyi etkiler. Uygun eksi, yani ıraksak düzeltici mercek ışının yakınsamasını azaltmaya yardım eder. Hipermetrop ilişkisinde odak retinanın arkasında kalabilir ve artı, yakınsak düzeltme yardımcı olabilir; gerçek değerlendirme kişinin uyum durumuna da bağlıdır.",
        "Astigmatta farklı doğrultulardaki eğrilik ve kırılma eşit değildir; bunu yalnız göz küresinin çapı değişimiyle açıklama. Presbiyopi ise yaşla uyum kapasitesinin azalmasıdır. Laboratuvarın eksen uzunluğu presetleri tüm bu bozuklukların klinik çeşitliliğini modellemez; verilen eşdeğer sistemde odak-retina ilişkisini ve düzeltme işaretini öğretir.",
      ),
      S(
        "Bulanıklık tek mekanizma değildir",
        "Katarakt merceğin saydamlığının azalmasıyla ilişkilidir; glokom ise optik sinire zarar verebilen hastalıklar grubudur. Yüksek göz içi basıncı önemli bir risk olabilir ve aköz sıvının dışa akışındaki sorunlarla ilişkili olabilir; her yüksek basınç mutlaka glokom değildir, normal basınçta da glokom görülebilir. Bunu camsı sıvının hep artması diye öğretmek doğru olmaz.",
        "Yaygın kalıtsal kırmızı-yeşil renk görme kusurları X bağlantılı olabilir; her renk görme bozukluğu aynı kalıtım biçiminde değildir. A vitaminiyle ilişkili gece görme sorunları da başka mekanizmalarla karıştırılmamalıdır. Bu karşılaştırma tanı koymak veya ilaç/vitamin dozu önermek için değil; farklı yapı ve işlev bozulmalarını ayırarak düşünmek içindir.",
      ),
      S(
        "Modelin sınırını bilerek kanıt kullan",
        "Optik laboratuvarda uzaklıklar milimetre cinsinden tanımlı bir eşdeğer ince sistemle hesaplanır; nesne uzaklığı ve retina konumu ayrı değişkenlerdir. Yakın presetinde mercek uyumu sağlıklı referans göze göre seçilir; eksen farkı presetleri odağın retina önünde veya arkasında kalmasını görünür kılar. Düzeltme açıkken birleşik güç, verilen retina düzlemine odaklanacak biçimde değişir.",
        "Bu değerler gözlük reçetesi, kişisel göz ölçümü veya gerçek gözün tüm optik ayrıntıları değildir. Sonucu yorumlarken odak çizgisinin retina çizgisine göre konumunu, mercek geometrisini ve normal yazıyla verilen koşulları birlikte oku. Aydınlık yalnız açıklığı değiştirir; odak kusurunun kendiliğinden yok olduğu sonucu çıkarılmaz.",
      ),
    ],
    examples: [
      E(
        "Yakın uyumun dört halkası",
        "Sağlıklı referans göz uzak bir cisimden yakındaki cisme odak değiştiriyor. Siliyer kas, asıcı lif gerginliği, mercek bombeliği ve kırma gücü nasıl değişir?",
        "Süreci nedensel sırayla izle.",
        [
          "Yakın uyumda siliyer kas kasılır; mercek çevresindeki asıcı liflerin gerginliği azalır.",
          "Esnek mercek daha bombeli olur; asıcı lifler kendileri kasılmaz.",
          "Bombelik artışı kırma gücünü artırır ve yakın nesneden gelen ışınların retina yönünde odaklanmasına yardım eder.",
        ],
        "Kas kasılır; lif gerginliği azalır; bombelik ve kırma gücü artar.",
        "Dört değişken aynı zincirin doğru yönündedir.",
        "Yakına bakarken asıcı bağlar kasılır demek.",
      ),
      E(
        "Odak nerede?",
        "Temsili sistemde nesne 6000 mm uzakta; eşdeğer sistemin görüntü uzaklığı 24 mm. Retina sistemin 27 mm arkasında. Odak retinaya göre nerede ve hangi işaretli düzeltme gerekir?",
        "Mesafeleri aynı başlangıçtan kıyasla.",
        [
          "Odak 24 mm, retina 27 mm; odak retinadan 3 mm önce oluşur.",
          "Bu, verilen uzak bakışta miyop ilişkiye karşılık gelir.",
          "Düzeltme yakınsamayı azaltmalıdır: 1/27−1/24<0 olduğundan ek güç negatiftir.",
        ],
        "Odak önde; bu modelde eksi düzeltme.",
        "Düzeltme sonrası 1/görüntü uzaklığı=1/27 koşulu sağlanır.",
        "Retinanın daha uzakta olmasını odağın arkasında kalmakla karıştırmak.",
      ),
      E(
        "Açıklık ve odak ayrı",
        "Aynı uzaklıktaki nesneye bakan referans gözde yalnız ortam aydınlığı artıyor. Model nesne ve eşdeğer odak gücünü sabit tutuyor. Ne değişmesi beklenir?",
        "Hangi değişkenin kontrol edildiğini koru.",
        [
          "Nesne uzaklığı ve optik güç bu deneyde sabittir.",
          "Işık yanıtında iris açıklığı küçülebilir; retinaya giren ışık miktarı düzenlenir.",
          "Bu modelde açıklığın küçülmesi odak uzaklığını değiştirmez; uyum mekanizması ayrı kontrol edilir.",
        ],
        "Göz bebeği küçülür; verilen modelde odak aynı kalır.",
        "Işık miktarı ile kırma gücünü aynı değişken yapmadık.",
        "Her küçük göz bebeğinin mutlaka daha bombeli mercek gösterdiğini sanmak.",
      ),
      E(
        "Sol alan, sol göz demek değil",
        "Sol görme alanından gelen bilgi iki gözün ilgili retina yarılarına düşüyor. Nazal retina lifleri çapraz, temporal lifler aynı tarafta kalıyor. Bu alanın kortikal yolu genel olarak hangi tarafta birleşir?",
        "Göz adını değil alanı izle.",
        [
          "Sol görme alanı her iki gözün sağ retina yarılarıyla ilişkilidir.",
          "İlgili nazal lifler çapraz yaparken temporal lifler aynı tarafta ilerler.",
          "Bu düzen sol görme alanı bilgisinin sağ beyin tarafındaki görme yolunda birlikte işlenmesine yardım eder.",
        ],
        "Sağ beyin tarafı; bütün sol göz lifleri çapraz yapmaz.",
        "Kısmi çaprazı koruyarak alan bilgisini izledik.",
        "Sol gözün tamamı karşıya geçer diye ezberlemek.",
      ),
    ],
    recall: [
      {
        prompt: "Yakına uyumda asıcı lifler kasılır mı?",
        answer:
          "Hayır; siliyer kas kasılır, lif gerginliği azalır, esnek mercek bombelenir.",
      },
      {
        prompt: "Kör nokta ve fovea nasıl ayrılır?",
        answer:
          "Optik diskte fotoreseptör yoktur; foveada koni yoğunluğu ve ayrıntı görme yüksektir.",
      },
      {
        prompt: "Miyop ilişkiyi hangi kıyas belirler?",
        answer:
          "Verilen bakış koşulunda odağın retina önünde kalması; eksi düzeltme yakınsamayı azaltır.",
      },
      {
        prompt: "Bütün optik sinir lifleri çapraz mı?",
        answer:
          "Hayır; nazal retina lifleri çapraz yapar, temporal lifler aynı tarafta kalır; görme alanı göz adıyla karıştırılmaz.",
      },
    ],
    questions: [
      Q(
        "goz",
        1,
        "Sağlıklı göz yakındaki cisme uyum yaparken doğru değişim zinciri hangisidir?",
        "Siliyer kas kasılır; asıcı lif gerginliği azalır; mercek bombelenir.",
        [
          "Siliyer kas gevşer; asıcı lifler kas hücresi gibi kasılır.",
          "Mercek yassılaşırken kırma gücü zorunlu artar.",
          "Bütün retina göz bebeğine dönüşür.",
          "Kornea ışığı algılayan tek nörondur.",
        ],
        "Kas ile pasif asıcı lifleri ayır.",
        "Siliyer kasın kasılması zonular liflerin gerginliğini azaltır. Esnek mercek daha bombeli olur ve yakın uyuma katkı sağlar; asıcı lifler kas değildir.",
      ),
      Q(
        "goz",
        2,
        "Yalnız aydınlık artıyor; nesne uzaklığı sabit. Göz bebeği yanıtının temel görevi hangisidir?",
        "Retinaya ulaşan ışık miktarını açıklığı değiştirerek düzenlemek.",
        [
          "Fotoreseptörleri optik diskten üretmek.",
          "Göz küresini zorunlu olarak uzatmak.",
          "Işığı akson içinde taşımak.",
          "Bütün konileri çubuk hücrelerine dönüştürmek.",
        ],
        "Göz bebeği iris içindeki açıklıktır.",
        "İris kasları açıklığın çapını değiştirir; parlak ışıkta küçülme ışık girişini azaltır. Bu düzenleme mercek eğriliğiyle yapılan uyumla aynı mekanizma değildir.",
      ),
      Q(
        "goz",
        3,
        "Retinada fotoreseptör içermeyen ve optik sinir liflerinin çıktığı bölge hangisidir?",
        "Optik disk, yani kör nokta.",
        [
          "Foveanın koni bakımından zengin merkezi.",
          "Kornea.",
          "İrisin ortasındaki göz bebeği.",
          "Göz merceğinin ön yüzü.",
        ],
        "Sinirin çıktığı alanın algılayıcı hücre taşıması şart değildir.",
        "Optik disk fotoreseptörden yoksundur. Fovea ise ayrıntılı görmeyle ilişkili koni yoğun bölgedir; bu iki yapının görevleri ters öğrenilmemelidir.",
      ),
      Q(
        "goz",
        4,
        "Temsili optik sistemde odak merceğin 24 mm arkasında, retina 21 mm arkasındadır. Bu bakış koşulunda odak ve düzeltme ilişkisi hangisidir?",
        "Odak retinanın arkasında; modelde artı yakınsak düzeltme gerekir.",
        [
          "Odak retinanın önünde; mutlaka eksi düzeltme gerekir.",
          "Odak retinada; hiçbir fark yoktur.",
          "Retina mesafesinden hiçbir konum kıyası yapılamaz.",
          "Odak ışık yerine yalnız ter bezini gösterir.",
        ],
        "Aynı başlangıçtan ölçülen 24 ve 21'i sırala.",
        "24 mm, 21 mm'den uzaktadır: odak retina arkasında kalır. Aynı nesne koşulunda ek güç 1/21−1/24 pozitiftir; model artı düzeltmeyle odağı retina düzlemine getirir.",
      ),
      Q(
        "goz",
        5,
        "Bir öğrenci 'gözdeki bütün kırılma yalnız mercekte olur' diyor. En uygun düzeltme hangisidir?",
        "Kornea da önemli kırılma katkısı yapar; mercek uyuma yardım eder.",
        [
          "Gözde ışık hiç kırılmaz.",
          "Yalnız optik sinir ışığı kırar.",
          "Göz bebeği bir kemiktir.",
          "Retina dışarıdaki nesneyi mekanik olarak çeker.",
        ],
        "Gözün ilk saydam optik yüzeyini hatırla.",
        "Kornea ile gözün diğer optik yüzeyleri birlikte kırılmaya katılır. Merceğin eğriliğinin değişmesi uyum sağlar; modelde eşdeğer tek mercek kullanılması gerçek yapıyı tek merceğe indirmez.",
      ),
      Q(
        "goz",
        6,
        "Loş ışıkta çevresel görmeye katkısı belirgin, renk ve yüksek ayrıntı çözümlemesi konilerle aynı olmayan fotoreseptör hangisidir?",
        "Çubuk hücresi.",
        ["Osteosit.", "Tat hücresi.", "Kondrosit.", "İrisin tümü."],
        "Fotoreseptör türünü işlevle eşleştir.",
        "Çubuklar loş koşullarda ve çevresel görmede önemlidir. Koniler aydınlıkta renk ve ayrıntı ayrımına katkı sağlar; ikisi birbirinin tüm görevlerini aynı biçimde yapmaz.",
      ),
      Q(
        "goz",
        7,
        "Sol görme alanı bilgisinin sağ beyin tarafına yönelmesi için optik kiyazmadaki genel düzen hangisidir?",
        "Nazal retina lifleri çapraz yapar; temporal lifler aynı tarafta kalır.",
        [
          "Her iki gözün tüm lifleri iki kez çapraz yapar.",
          "Sol gözün bütün lifleri mutlaka sağda, sağ gözünkiler mutlaka soldadır.",
          "Bütün lifler yalnız omuriliğe gider.",
          "Optik sinirler ışığı göz bebeğine geri taşır.",
        ],
        "Göz ile görme alanı aynı adlandırma değildir.",
        "Kısmi çapraz, aynı görme alanından gelen bilgilerin karşı beyin tarafındaki yollarda birleşmesine yardım eder. Bütün göz liflerini tek paket olarak karşıya geçirmek doğru değildir.",
      ),
      Q(
        "goz",
        8,
        "Bir gözde farklı meridyenlerin eğriliği ve kırması eşit değil. Bunu yalnız göz küresinin uzunluk değişimiyle açıklamak neden yetersizdir?",
        "Astigmat ilişkisinde doğrultuya bağlı eğrilik farkı önemlidir.",
        [
          "Her görme sorunu yalnız aynı X bağlantılı genden kaynaklanır.",
          "Eğrilik ışığın davranışını hiçbir zaman etkilemez.",
          "Bütün görüntüler optik diskte odaklanmalıdır.",
          "Merceğin saydamlığı gözde hiç önemli değildir.",
        ],
        "Doğrultu farkını eksen uzunluğundan ayır.",
        "Astigmatta kornea veya merceğin farklı doğrultularındaki optik özellikler farklı olabilir. Bu mekanizma bütün görme kusurlarını göz çapıyla açıklayan tek kurala indirgenemez.",
      ),
      Q(
        "goz",
        9,
        "Glokom için aşağıdaki sınırlı açıklamalardan hangisi doğrudur?",
        "Optik sinir hasarıyla ilişkilidir; yüksek basınç risk olabilir ama her olguda zorunlu değildir.",
        [
          "Her olgu yalnız camsı sıvının artmasıyla oluşur.",
          "Göz basıncı normal olan hiç kimsede görülemez.",
          "Merceğin saydamlaşmasıyla aynı olaydır.",
          "Bütün renk görme sorunlarının tek adı glokomdur.",
        ],
        "Risk etkeni ile zorunlu neden aynı değildir.",
        "Glokom optik sinire zarar verebilen hastalıklar grubudur. Aköz dışa akış dengesi ve yüksek basınç önem taşıyabilir; normal basınçta da glokom görülebilir, her yüksek basınç da tek başına glokom demek değildir.",
      ),
      Q(
        "goz",
        10,
        "Işık retinada hücresel yanıtı başlatıyor. Optik sinirde beyne taşınan ileti için en uygun ifade hangisidir?",
        "Ganglion hücresi aksonlarında aksiyon potansiyelleri taşınır.",
        [
          "Işık ışını aynen aksonun içinde kırılarak yürür.",
          "Fotoreseptörler yerine kornea tüm görme anılarını saklar.",
          "Retina yalnız kemik hücrelerinden oluşur.",
          "Görüntü fiziksel bir kâğıt olarak beyine aktarılır.",
        ],
        "Optik yol ile sinirsel yol farklıdır.",
        "Fotoreseptör ve ara hücre yanıtları ganglion hücrelerine aktarılır. Optik sinirin aksonlarında aksiyon potansiyelleri taşınır; nesnenin ışığı veya bir kâğıt görüntü sinirin içinden geçmez.",
      ),
    ],
  },
  {
    id: "duyu-organlari-kulak",
    topic: "detail-301",
    title: "Kulak: titreşimden işitmeye, hareketten dengeye",
    minutes: 48,
    objectives: [
      "İşitmede hava, kemik, sıvı ve sinirsel basamakları sırala.",
      "Alan oranını basınç aktarımıyla ilişkilendir; enerji üretimiyle karıştırma.",
      "Açısal ivme, doğrusal ivme ve yerçekimi bilgisinin kaynaklarını ayır.",
    ],
    source:
      "MEBİ AYT Biyoloji Konu Özetleri, kulak ve duyu organı rahatsızlıkları; OGM Dersler Cepte III, işitme ve denge. Kaynak kapsamından geliştirilmiş özgün anlatım ve öğretim soruları.",
    sections: [
      S(
        "Dış, orta ve iç kulak sınırlarını kur",
        "Kulak kepçesi ve dış kulak yolu ses dalgalarının kulak zarına ulaşmasına yardım eder. Orta kulak boşluğunda çekiç, örs ve üzengi kemikçikleri bulunur. İç kulakta koklea işitmeyle, vestibüler yapılar ise başın hareketi ve yönelimiyle ilgili bilgi sağlar. Bir yapının kulağa ait olması bütün işitme ve denge işlerini aynı anda üstlendiğini göstermez.",
        "Dış ve orta kulakta hava ve kemik titreşiminin iletimi öne çıkar; iç kulakta sıvı hareketi ve tüylü hücrelerin mekanik etkilenmesi önemlidir. Sinirsel çıktı bu mekanik aşamalarla karıştırılmamalıdır. Yolun neresinde olduğuna göre taşınan bilginin fiziksel biçimi değişir.",
      ),
      S(
        "Zardan oval pencereye mekanik aktarım",
        "Kulak zarının titreşimi kemikçik zincirine aktarılır; üzengi oval pencereyi etkileyerek iç kulak sıvılarına hareket aktarılmasına yardım eder. Kemikçikler ve zar-alan ilişkisi, hava ile sıvı ortamları arasındaki aktarımda önemlidir. Bu aşamayı ses frekansının keyfî biçimde yükseldiği bir süreç gibi düşünme.",
        "Küçük alana aktarılan benzer kuvvet daha büyük basınç oluşturabilir. Basıncın artması enerji veya gücün yoktan üretilmesi değildir; sistemde yer değiştirme, kuvvet ve kayıplar birlikte değerlendirilir. Dersin alan modeli yalnız eşit kuvvet ve kayıpsız aktarım varsayımıyla P=F/A karşılaştırması yapar; gerçek kulağın bütün kaldıraç ve frekans özelliklerini hesaplamaz.",
      ),
      S(
        "Östaki ve iki pencerenin işleri farklı",
        "Östaki borusu orta kulakla yutak arasında bağlantı kurar ve kulak zarının iki tarafındaki basıncın dengelenmesine katkı yapar. Sesin normal işitme yolunu östakiden başlayıp doğrudan kokleaya giden tek bir hat gibi çizmek yanlıştır. Orta kulak boşluğu ile kokleanın sıvı bölmeleri de aynı boşluk değildir.",
        "Oval pencere üzengiden gelen hareketin iç kulağa aktarımında; yuvarlak pencere ise sıvı hareketinin basınç değişimleriyle uyumlu biçimde gerçekleşmesinde önemlidir. Bir pencereyi sabit ve değişmez bir duvar gibi kabul etmek sıvı hareketini eksik anlatır. Soruda basınç eşitlenmesi mi, mekanik giriş mi, basınç telafisi mi sorulduğunu ayır.",
      ),
      S(
        "Kokleayı katman ve sıvıyla oku",
        "Kokleanın kesitinde vestibüler ve timpanik kanallar perilenf, koklear kanal ise endolenf içerir. Baziler zar ve onun üzerindeki Corti organı, mekanik titreşimin hücresel yanıta dönüşmesinde temel ilişkiyi kurar. Kanal adları, sıvı adları ve zar adları farklı sınıflama düzeyleridir.",
        "Tüylü hücrelerin apikal uzantıları çevredeki hareketten etkilenir; baziler ve tektoryal yapılar arasındaki göreli hareket önemlidir. Bütün tüylü hücrelerin silyaları tektoryal zara aynı biçimde gömülüdür diye genelleme yapma. Öğretim kesiti bütün mikroskobik ayrıntıları aynı anda göstermese de hücre, zar ve sıvı ilişkilerini doğru yönde korumalıdır.",
      ),
      S(
        "Mekanik enerji sinirsel bilgiye nasıl dönüşür?",
        "Tüylü hücre uzantılarının mekanik etkilenmesi hücre zarındaki süreçleri değiştirir; dereceli hücre yanıtı ve kimyasal ileti aktarımı oluşabilir. Ardından işitme siniri liflerinde aksiyon potansiyelleri taşınır. Tüylü hücreyi otomatik olarak kendi uzun aksonuyla beyne uzanan bir nöron gibi çizmek doğru değildir.",
        "İşitme bilgisi beyin sapı bağlantıları, talamik röleler ve işitme korteksiyle birlikte işlenir. Sesin şiddeti artınca her aksiyon potansiyelinin boyunun sınırsız büyüdüğü düşünülmemelidir; sinirsel kodlamada etkinlik örüntüleri ve hangi liflerin katıldığı önemlidir. Bu derste ayrıntılı frekans analizi yerine yol ve sinyal türü ayrımı temellendirilir.",
      ),
      S(
        "Frekans ile şiddet aynı değişken değil",
        "Frekans titreşimin zamansal tekrarına, ses şiddeti ise enerji aktarımıyla ilgili bir özelliğe karşılık gelir. Daha yüksek frekans ile daha güçlü ses aynı şey değildir. İnsan işitmesi için verilen yaklaşık 20–20.000 Hz aralığı özellikle genç ve sağlıklı örneklerin genel çerçevesidir; bütün kişiler ve yaşlar için değişmez sınır değildir.",
        "Bir sesin işitilebilir veya zararlı olması yalnız tek bir frekans sayısından çıkarılamaz. Şiddet, maruz kalma süresi ve bireysel koşullar önemlidir; gürültü hasarı yalnız kulak zarının yırtılmasıyla sınırlı değildir. Ders ses dalgasını görsel şemayla işler; yüksek ses çalma veya kişisel işitme eşiği ölçme gerektirmez.",
      ),
      S(
        "Yarım daire kanalları dönmedeki değişimi bildirir",
        "Yarım daire kanallarındaki duyu düzenekleri açısal ivmeye, yani dönme hızının değişimine duyarlıdır. Dönmeye başlarken sıvının eylemsizliği, duyu yapısı üzerinde göreli etki oluşturur. Bir süre sabit açısal hızla dönmede göreli hareket ve yanıt azalabilir; sabit hızın kendisi sürekli aynı ivme değildir.",
        "Dönme durduğunda sıvının hareketini sürdürme eğilimi, başlangıca göre karşı yönlü bir göreli etki oluşturabilir. Bu nedenle başla, sabit dön ve dur evreleri aynı ok yönüyle gösterilmemelidir. Model basitleştirilmiş evreleri gösterir; sıvı sönümünün gerçek saniyesini veya kişisel baş dönmesi süresini hesaplamaz.",
      ),
      S(
        "Otolit organları: doğrusal ivme ve yerçekimi",
        "Utrikulus ve sakkulustaki duyu yapıları doğrusal ivme ve başın yerçekimine göre yönelimi hakkında bilgi sağlar. Otolitli tabakanın duyu hücrelerine göre mekanik etkisi bu algıya katkı yapar. Yarım daire kanallarının açısal ivme rolüyle bu görevi tek bir 'hareket algılar' sözüne sıkıştırma.",
        "Araç ileri ivmelenirken ve baş bir yana eğilirken iki farklı fiziksel durum vardır; otolit sistemi bunlara duyarlı olabilir. Bununla birlikte tek bir otolit sinyalinden bütün dünya hareketini kusursuz çıkarmak mümkün değildir; merkez başka duyusal verileri de kullanır. Modelin doğrusal ve eğim kartları bu farklı girdileri ayrı etiketlerle gösterir.",
      ),
      S(
        "Denge birden çok kanıtın birleşmesidir",
        "Vestibüler bilgiler görsel bilgi ve kas-eklem duyu verileriyle birlikte değerlendirilir. Beyin sapı, beyincik ve başka ağlar denge, bakışın sabitlenmesi ve duruş kontrolüne katkı yapar. Dengeyi yalnız kulakta ya da yalnız beyincikte biten tek basamak gibi düşünmek bu iş birliğini kaybettirir.",
        "Gözün gördüğü hareket ile vestibüler bilginin farklı olması deneyimi etkileyebilir; tek bir kaynaktaki bilgi tüm algıyı açıklamayabilir. Sanal modelde bir kanalın vurgulanması diğerlerinin gerçek yaşamda kapanması anlamına gelmez. Öğrenci seçilen hareketin hangi mekanizmayla daha doğrudan ilişkili olduğunu gerekçelendirmelidir.",
      ),
      S(
        "İşitme kaybı ve baş dönmesinde çıkarım sınırı",
        "Dış veya orta kulaktaki iletim sorunları sesin iç kulağa aktarılmasını etkileyebilir. Tüylü hücreler veya sinirsel yoldaki sorunlar ise başka bir düzeyde etkili olabilir. Bütün işitme kayıplarının yalnız iç kulakta aynı hücrenin bozulmasından kaynaklandığını söylemek doğru değildir.",
        "Baş dönmesi bir belirtidir; tek başına tek bir hastalık adını zorunlu kılmaz. Duyu organı hastalıkları karşılaştırılırken yapı, görev ve verilen kanıt ayrılmalıdır. Genel koruyucu bilgiler klinik tanı veya tedavi önerisi değildir; laboratuvarda gerçek dönme, kulağa madde sokma ya da yüksek sesle deneme yapılmaz.",
      ),
    ],
    examples: [
      E(
        "Hangi biçimde taşınıyor?",
        "Bir işitme yolu kartında A kemikçikler, B koklear sıvı, C işitme siniri olarak tanımlanıyor. A,B,C aşamalarını sinyal biçimiyle eşleştir.",
        "Mekanik aktarım ile sinirsel iletimi ayır.",
        [
          "Kemikçiklerde titreşim mekanik aktarılır; bu aşamada akson içinde bir impuls yoktur.",
          "Koklear sıvıdaki hareket de mekanik etkidir; tüylü hücre dönüşümüne katkı yapar.",
          "İşitme sinirindeki aksonlarda aksiyon potansiyelleri taşınır.",
        ],
        "A ve B mekanik; C sinirsel iletim.",
        "Hücreye dönüşüm basamağını iki fiziksel yolun arasına yerleştirdik.",
        "Ses dalgasının aynen sinirin içinde yürüdüğünü düşünmek.",
      ),
      E(
        "Alan oranı basınç oranıdır",
        "Kayıpsız, kaldıraçsız temsili modelde aynı 1 N kuvvet önce 60 mm², sonra 3 mm² alana uygulanıyor. Basınç oranı kaçtır ve bu güç üretimi midir?",
        "P=F/A ve aynı kuvvet koşulunu kullan.",
        [
          "İlk basınç 1/60 N/mm², ikinci basınç 1/3 N/mm² olur.",
          "Oran (1/3)/(1/60)=20 bulunur.",
          "20 basınç oranıdır; tek başına enerji veya güç üretildiğini göstermez.",
        ],
        "Basınç 20 kat; enerji/güç yaratıldığı sonucu çıkmaz.",
        "Her iki basıncın birimi aynı; kuvvet sabitliği korunuyor.",
        "Basınç, kuvvet ve gücü aynı büyüklük sanmak.",
      ),
      E(
        "Sabit dönme, sıfır ivme",
        "Sanal evrelerde baş önce dönmeye başlıyor, sonra uzun süre aynı açısal hızda kalıyor, en son duruyor. Yarım daire kanalı yanıtını hangi ayrım açıklar?",
        "Açısal hızın kendisiyle değişimini ayır.",
        [
          "Başlangıçta açısal hız değiştiğinden sıvı ile duyu yapısı arasında göreli etki oluşur.",
          "Sabit hız evresinde göreli etki azalabilir; bu, bütün denge bilgilerinin kaybolması değildir.",
          "Durmada sıvının eylemsizliği başlangıca karşı yönlü göreli etki verebilir.",
        ],
        "Başlangıç ve durma değişim taşır; uzun sabit hızda uyum görülebilir.",
        "Üç evrede aynı sürekli ivme var sayılmadı.",
        "Sabit hızla dönmeyi sürekli aynı açısal ivme sanmak.",
      ),
      E(
        "Basınç eşitlenmesi hangi yol?",
        "Bir kartta orta kulak boşluğunun yutakla bağlantısı ve zarın iki tarafındaki basınç farkının azaltılması soruluyor. Oval pencere, östaki ve yuvarlak pencereden hangisi doğrudan ilişkilidir?",
        "Yapının bağladığı iki bölgeyi kullan.",
        [
          "Soruda orta kulak ile yutak arasındaki hava bağlantısı verilmiş.",
          "Bu bağlantı östaki borusudur; oval pencere üzengi hareketini iç kulağa aktarır.",
          "Yuvarlak pencere iç kulak sıvısı hareketinin basınç telafisine katkı yapar; verilen yutak bağlantısı değildir.",
        ],
        "Östaki borusu.",
        "Üç yapıyı yalnız ortak kulak adıyla değil görev ve konumla ayırdık.",
        "İçinde pencere sözcüğü geçen her yapıyı basınç eşitleyen yutak yolu sanmak.",
      ),
    ],
    recall: [
      {
        prompt: "Östaki ile oval pencere aynı yolu mu kurar?",
        answer:
          "Hayır; östaki orta kulak-yutak basınç bağlantısıdır, oval pencere mekanik titreşimi iç kulağa aktarır.",
      },
      {
        prompt: "20 kat basınç aktarımı 20 kat güç üretmek mi?",
        answer:
          "Hayır; alan oranı ve kuvvet koşulları basıncı değiştirir, enerji yoktan oluşmaz.",
      },
      {
        prompt: "Yarım daire kanalları ile otolit organları nasıl ayrılır?",
        answer:
          "İlki açısal ivme; utrikulus/sakkulus doğrusal ivme ve yerçekimine göre yönelimle ilişkilidir.",
      },
      {
        prompt: "Tüylü hücreden sonraki sinyal nedir?",
        answer:
          "Dereceli hücre yanıtı ve sinir ucuna aktarımın ardından sinir aksonlarında aksiyon potansiyelleri taşınır.",
      },
    ],
    questions: [
      Q(
        "kulak",
        1,
        "Normal işitme aktarımında kulak zarından sonra verilen yapılardan hangisi oval pencereye kadar olan mekanik zincirdedir?",
        "Çekiç–örs–üzengi.",
        [
          "İris–mercek–retina.",
          "Utrikulus–sakkulus–dil.",
          "Östaki–talamus–epidermis.",
          "Koku soğancığı–papilla–korteks.",
        ],
        "Orta kulaktaki üç kemikçiği sırala.",
        "Kulak zarı titreşimi çekiç, örs ve üzengi zincirine aktarılır; üzengi oval pencereyi etkiler. Bu mekanik yol, göz veya koku yoluyla karıştırılmaz.",
      ),
      Q(
        "kulak",
        2,
        "Kayıpsız ve kaldıraç etkisiz modelde aynı 1 N kuvvet 90 mm² ve 3 mm² alanlara uygulanıyor. İkinci basıncın ilkine oranı kaçtır?",
        "30.",
        ["3.", "27.", "90.", "1/30."],
        "Aynı kuvvette basınç alanla ters orantılıdır.",
        "P1=1/90, P2=1/3 N/mm²; P2/P1=90/3=30 olur. Bu basınç oranı, 30 kat enerji üretildiği anlamına gelmez.",
      ),
      Q(
        "kulak",
        3,
        "Orta kulak boşluğu ile yutak arasındaki bağlantıyla zarın iki yanındaki basıncın dengelenmesine yardım eden yapı hangisidir?",
        "Östaki borusu.",
        [
          "Optik disk.",
          "Oval pencerenin kendisi.",
          "Tat tomurcuğu.",
          "Baziler zar.",
        ],
        "Bağlantının hangi iki boşluk arasında olduğunu kullan.",
        "Östaki orta kulak-yutak bağlantısıdır. Oval pencere ise kemikçik hareketinin iç kulak sıvılarına aktarımıyla ilişkilidir; aynı görev değildir.",
      ),
      Q(
        "kulak",
        4,
        "Koklear kanal ile vestibüler/timpanik kanalların sıvıları doğru hangi eşleşmededir?",
        "Koklear kanal endolenf; vestibüler ve timpanik kanallar perilenf.",
        [
          "Üçü de yalnız hava içerir.",
          "Koklear kanal perilenf; diğer ikisi mutlaka tükürük içerir.",
          "Koklear kanal kemik iliği içerir.",
          "Her kanal yalnız gözyaşı taşır.",
        ],
        "Orta kulak havasını iç kulak sıvılarıyla karıştırma.",
        "Koklear kanal endolenf, iki dış koklear kanal perilenf içerir. Bu ayrım Corti organı ve zarların kesitte doğru yerleştirilmesine yardım eder.",
      ),
      Q(
        "kulak",
        5,
        "Tüylü hücrede mekanik etkiye bağlı dereceli yanıt oluşuyor ve ayrı sinir ucuna haber aktarılıyor. İşitme siniri aksonunda sonraki ileti nedir?",
        "Aksiyon potansiyelleri.",
        [
          "Aynı hava molekülünün kesintisiz akışı.",
          "Bir ışık ışınının kırılması.",
          "Kemiklerin sayısının artması.",
          "Tükürüğün aksonda kaynaması.",
        ],
        "Dönüşümden sonra sinirsel iletim başlar.",
        "Tüylü hücrenin dereceli yanıtı sinir ucuyla aktarımı etkiler; işitme siniri liflerinde aksiyon potansiyelleri taşınır. Mekanik titreşim ile sinirsel ileti aynı fiziksel olay değildir.",
      ),
      Q(
        "kulak",
        6,
        "Bir baş uzun süre sabit açısal hızla dönüyor; idealize evre modelinde sıvıyla duyu yapısı arasındaki göreli etki azalmış. Hangisi uygundur?",
        "Sabit açısal hız, sürekli aynı açısal ivme demek değildir.",
        [
          "Bütün denge organları artık yapısal olarak yoktur.",
          "Açısal hız hiç var olmamıştır.",
          "Sabit dönme her an yeni bir başlangıç ivmesiyle aynıdır.",
          "Görsel bilgi dengeye hiçbir zaman katılmaz.",
        ],
        "Hız ile hızın değişimini ayır.",
        "Yarım daire kanalları açısal ivmeye duyarlıdır. Sabit hız evresinde göreli hareket ve yanıt azalabilir; buradan bütün vestibüler sistemin yok olduğu sonucu çıkmaz.",
      ),
      Q(
        "kulak",
        7,
        "Doğrusal ivme ve başın yerçekimine göre yönelimine ilişkin bilgide hangi yapılar daha doğrudan rol alır?",
        "Utrikulus ve sakkulusun otolitli duyu düzenekleri.",
        [
          "Yalnız kulak kepçesinin dış kılları.",
          "İrisin ortasındaki açıklık.",
          "Kokleadan bağımsız tüm kemik iliği.",
          "Yalnız göz merceğinin kılıfı.",
        ],
        "Dönme değişimiyle doğrusal/yerçekimi girdisini ayır.",
        "Otolit organları doğrusal ivme ve yerçekimine göre yönelimle ilişkilidir. Yarım daire kanallarının açısal ivme göreviyle aynı genel etiket altında kaybedilmemelidir.",
      ),
      Q(
        "kulak",
        8,
        "Yüksek sese maruz kalma için hangi açıklama daha doğrudur?",
        "Etki şiddet ve süreye bağlıdır; hasar yalnız kulak zarının yırtılmasıyla sınırlı değildir.",
        [
          "Her yüksek ses zararsızdır.",
          "Her kişide tek bir desibel sayısı her sürede aynı sonucu verir.",
          "İç kulaktaki hücreler gürültüden hiçbir zaman etkilenmez.",
          "Frekans ile ses şiddeti aynı büyüklüktür.",
        ],
        "Tek eşik sayıdan bütün kişilere sonuç çıkarma.",
        "Gürültü etkisi şiddet, süre ve bireysel koşullarla ilişkilidir; koklear tüylü hücreler de etkilenebilir. Frekans ve şiddet farklı özelliklerdir, zarar tek bir zar yırtığına indirgenemez.",
      ),
      Q(
        "kulak",
        9,
        "Dış ve orta kulakta iletim sorunu yaşayan bir örnek veriliyor. Yalnız bu bilgiyle hangisi söylenemez?",
        "Sorunun mutlaka koklear tüylü hücrelerin yok olmasından kaynaklandığı.",
        [
          "Sesin iç kulağa aktarımı etkilenebilir.",
          "İletim düzeyi ile sinirsel düzey farklıdır.",
          "Yapının konumu değerlendirmede önemlidir.",
          "Bütün işitme sorunlarının tek mekanizması yoktur.",
        ],
        "Verilen sorunun bulunduğu aşamayı koru.",
        "Dış/orta kulak iletim sorunu, iç kulaktaki belirli hücrelerin mutlaka kaybolduğuna kanıt değildir. İletim ve sinirsel bozukluk düzeyleri farklı olabilir.",
      ),
      Q(
        "kulak",
        10,
        "Sanal dönme modelinde baş dönmeye başlarken kupula bir yönde, uzun sabit hızdan sonra ani durmada karşı yönde etkileniyor. Bu farkın uygun açıklaması nedir?",
        "Endolenfin eylemsizliği ve göreli hareketin evrelere göre değişmesi.",
        [
          "Endolenfin her evrede mutlaka katı kemiğe dönüşmesi.",
          "Tüm ses frekanslarının sıfırlanması.",
          "Kulak zarının tat hücresine dönüşmesi.",
          "Bütün evrelerde göreli hareketin kesin aynı olması.",
        ],
        "Başın hareketi ile sıvının göreli hareketini ayrı düşün.",
        "Başlangıç ve durmada sıvının eylemsizliğe bağlı göreli etkisi farklı yönlerde olabilir. Model evreleri nitel olarak karşılaştırır; gerçek kişiye baş dönmesi süresi hesaplamaz.",
      ),
    ],
  },
  {
    id: "destek-hareket-kemik",
    topic: "detail-302",
    title: "Kemik: canlı kompozitten iskelet düzenine",
    minutes: 50,
    objectives: [
      "Kemik hücreleri, matriks ve damar yollarını görevleriyle ilişkilendir.",
      "Uzunluk ve kalınlık büyümesini, sık ve süngerimsi dokuyu ayır.",
      "İskelet bölümlerini tipik yetişkin sayımının koşullarıyla açıkla.",
    ],
    source:
      "MEBİ AYT Biyoloji Konu Özetleri, destek-hareket ve kemik; OGM Dersler Cepte III, kemik doku. Kaynak kapsamından geliştirilmiş özgün anlatım, şematik büyüme modeli ve öğretim soruları.",
    sections: [
      S(
        "Kemik cansız bir iskele değildir",
        "Kemik vücuda destek verir, iç organları korur ve kasların kuvvet uygulayabildiği bir hareket sistemi kurar. Aynı zamanda mineral deposudur; içindeki kırmızı ilik kan hücresi yapımına katılır. Bu görevler kemiğin yalnız sert bir dış kalıp olarak düşünülmemesi gerektiğini gösterir.",
        "Kemik doku canlı hücreler, damarlar, sinirler ve hücre dışı matriksten oluşan özelleşmiş bağ dokusudur. Sertliğin hücrelerin kendisinin taşlaşmasıyla oluştuğunu sanma: hücreler matriksi üretir, sürdürür ve yeniden düzenler. Kemik bütün yaşam boyunca aynı ve değişmez bir blok olarak kalmaz.",
      ),
      S(
        "Organik ve mineral bileşenler birlikte",
        "Kollajen başta olmak üzere organik matriks bileşenleri esneklik ve çekmeye dayanım katkısı sağlar. Mineral bileşenler, özellikle kalsiyum-fosfat içeren kristaller, sertlik ve basınca karşı dayanımda önemlidir. Kemik bu iki bileşenin birlikte örgütlendiği bir kompozittir; birini diğerinin yerine koymak mekanik işlevi eksik açıklar.",
        "Kaynaklarda kullanılan osein veya ara madde adını gördüğünde organik ve mineral bileşenlerin ayrı görevlerini kaybetme. Yalnız mineral miktarından her kişinin kırılma kuvveti hesaplanamaz; lif düzeni, mikro yapı, kemik geometrisi ve başka koşullar da önemlidir. Sanal karşılaştırmalar bileşen katkısını gösterir, gerçek kemikle asit veya yakma deneyi istemez.",
      ),
      S(
        "Yapan, yıkan ve sürdüren hücreler",
        "Osteoblastlar yeni kemik matriksi yapımına katılır. Matriks içinde kalan olgun osteositler lakünlerde bulunur ve doku sürdürülmesi ile mekanik çevrenin algılanmasına katkı sağlar. Osteoklastlar ise kemik yıkımı ve yeniden şekillenmede görev alır. Yapım ve yıkımın aynı dokuda birlikte bulunması bir hata değil, canlı dokunun düzenlenmesidir.",
        "Net değişimi değerlendirirken iki süreci birlikte düşün: yapım aynı kalırken yıkım artarsa doku dengesi kayıp yönüne kayabilir. Buna karşılık tek bir hücre adının geçmesi bütün kişinin gelecekteki kemik miktarını belirlemez. Hormonlar, beslenme, yüklenme ve yaş gibi koşullar bu dengede etkili olabilir; burada bunlardan bağımsız bir klinik sonuç üretilmez.",
      ),
      S(
        "Sık kemik: osteonun içindeki yollar",
        "Sık kemikte lamellerin düzenlediği osteon yapıları bulunur. Osteonun merkezindeki Havers kanalları damar ve sinirlerin geçtiği uzunlamasına yollardır; Volkmann kanalları yan bağlantılar kurar. Bir yapıda yoğun matriks bulunması, hücrelerin beslenmeden tümüyle uzak olduğu anlamına gelmez.",
        "Osteositlerin bulunduğu lakünler ince kanaliküllerle ilişkilidir. Damarın her lakünün içinden ayrı bir büyük boru gibi geçmesi gerekmez; hücreler ile madde alışverişi arasında bu mikroyapı önemlidir. Kesitte halkaları gördüğünde halkayı hücre, merkez kanalı da ilik boşluğu sanmadan ölçekleri ayır.",
      ),
      S(
        "Süngerimsi kemik: düzenli bir iç ağ",
        "Süngerimsi doku birbirine bağlanan trabeküllerden oluşur; aralarında ilik içeren boşluklar vardır. Bu ağ, kemiği bütünüyle dolu ve ağır hâle getirmeden destek sağlamaya yardım eder. Süngerimsi sözcüğü yumuşak, cansız veya dayanaksız bir köpük anlamına gelmez.",
        "Süngerimsi dokuda sık kemiktekiyle aynı osteon kanal sistemi tipik olarak bulunmaz; fakat trabekül çevresindeki boşluklarda damar ve ilik ilişkileri vardır. Bu yüzden 'kanal sistemi yoksa hiç damar yoktur' çıkarımı yanlıştır. Doku örgütlenmesi ile damar varlığını farklı düzeylerde değerlendir.",
      ),
      S(
        "Uzun kemiği baştan gövdeye izle",
        "Uzun kemikte uç bölümlere epifiz, gövdeye diafiz denir. Gövdede sık kemik belirgindir; uçların iç bölümünde süngerimsi ağ ve ilik alanları bulunur. Dıştaki periost, kemik yüzeyinin büyük bölümünü sarar; eklem kıkırdağıyla kaplı yüzleri aynı biçimde örtmez.",
        "Kırmızı ilik kan hücresi yapımıyla, sarı ilik yağ depolamayla ilişkilidir. Tipik yetişkin uzun kemik gövdesi şemasında sarı ilik gösterilebilir; bütün yaşlarda ve bütün kemiklerde aynı dağılım varmış gibi genelleme yapılmaz. Periost damarlı ve sinirli bağ dokusudur; kemik yüzeyinin onarım ve büyüme ilişkilerinde önemlidir.",
      ),
      S(
        "Boyuna ve enine büyüme ayrı süreçler",
        "Büyüme döneminde epifiz plağındaki kıkırdak ve onun yerini alan kemik doku, uzun kemiğin boyuna uzamasına katkı sağlar. Plağın kapanmasıyla bu mekanizmayla boy uzaması sona erer. Kapanış herkes için aynı kesin yaşta gerçekleşen tek bir düğme değildir; birey ve kemik bölgesi önemlidir.",
        "Kalınlaşma ise yüzeyde yeni doku eklenmesi ve içteki yeniden düzenlemelerle ilişkilidir; periostal katkı burada önemlidir. Plağın kapanması bütün kemik yapımının durduğu anlamına gelmez. Modelde yetişkin presetinde uzunluk sabitken yapımın baskın olduğu kalınlaşma seçeneği değişebilir; bu, her yetişkinde her yıl aynı kalınlaşma olduğu iddiası değildir.",
      ),
      S(
        "Kıkırdak taslağı evrensel bir zorunluluk değil",
        "Birçok kemik gelişirken kıkırdak modelin yerini kemik dokunun aldığı endokondral süreçler görülür. Büyüme plağı bu ilişkinin daha sonraki önemli bir örneğidir. Fakat bütün embriyonik iskeletin her parçasının önce aynı kıkırdak taslağından oluştuğunu söylemek fazla geneldir.",
        "Kafatasının bazı kemikleri gibi örneklerde bağ dokusu içinde doğrudan kemikleşme, yani intramembranöz gelişme önemlidir. Bu iki yol son dokunun canlı kemik oluşunu değiştirmez; başlangıç ve oluşum biçimlerini ayırır. Soruda 'birçok' ile 'bütün' sözcükleri arasındaki fark anahtarı değiştirebilir.",
      ),
      S(
        "Kemik şekilleri uzunlukla değil oranla",
        "Uzun kemik adı yalnız vücuttaki en büyük kemiğe ait değildir; boyun enine göre belirgin olduğu biçimi anlatır. Kısa kemikler daha benzer boyutlara; yassı kemikler koruyucu ve geniş yüzeyli şekillere; düzensiz kemikler ise bu basit gruplara sığmayan biçimlere sahip olabilir. Pazu ve uyluk uzun, el bileği kısa, kürek kemiği yassı, omurlar düzensiz örneklerdir.",
        "Bir kemiğin sınıfını yalnız bir cetveldeki santimetre değeriyle belirleme. Şekil ile iç doku türü de aynı sınıflama değildir: tek bir kemikte hem sık hem süngerimsi doku bulunabilir. 'Uzun kemik tamamen sık dokudur' sonucu bu iki sınıflama düzeyini birbirine karıştırır.",
      ),
      S(
        "Tipik yetişkin sayımında eksen ve üyeler",
        "Tipik yetişkin iskeleti 206 kemik olarak ele alınır: eksen iskeleti 80, üyeler iskeleti 126. Eksen sayımında baş bölgesi 29, erişkin omurga 26, göğüs kafesi 25 kemikle gösterilebilir. Baş sayısına kafatası 22, orta kulak kemikçikleri 6 ve hiyoid 1 dâhildir; sayımın kapsamını bilmeden farklı toplamları kıyaslama.",
        "Üyeler iskeletinde üst taraflar ve omuz kemeri toplam 64, alt taraflar ve kalça kemeri toplam 62 kemiktir. Toplamlar yaşa, kaynaşmaya ve kişisel varyasyona göre değişebilir; 206 her insanda her yaşta değişmez zorunlu sayı değildir. Kafatası ana eklemlerinin karşılaştırmasında mandibulanın hareketi öne çıkar; bu ifade kulak kemikçiklerinin veya hiyoidin hiç hareket etmediği anlamına gelmez.",
      ),
      S(
        "Omurga ve göğüs kafesinde ilişkileri koru",
        "Omurga gövdeyi destekler, omuriliği korur ve kontrollü harekete katkı yapar. Yetişkinde 24 ayrı omur ile kaynaşmış sakrum ve koksiksin birer kemik sayılması 26 sonucunu verir. Omur gövdeleri arasındaki diskler kıkırdak bağlantılar taşır; atlas ile axis ilişkisi gibi bölgeler aynı disk örüntüsünün basit tekrarı değildir.",
        "Göğüs kafesinde 12 çift kaburga ve sternum temel sayımı oluşturur. İlk yedi çift önde kendi kıkırdaklarıyla sternuma, sonraki üç çift dolaylı olarak bağlantı kurar; son iki çiftin önde sternuma bağlantısı yoktur. Yapıların koruyucu ve solunum hareketiyle ilişkili işlevlerini, yalnız sayı listesinin ötesinde bağlantı düzeniyle öğren.",
      ),
      S(
        "Yaşlanan kemikte tek oran yeterli değil",
        "Kemik yaşam boyunca yeniden yapılanır. Yaşlanma ve başka koşullarda yapım-yıkım dengesi, kemik kütlesi, mineral yoğunluğu ve mikro yapı değişebilir. Kırılganlığın her zaman bütün kemikte mineral oranının artmasından kaynaklandığını söylemek doğru değildir; osteoporozda kemik kaybı ve yapı değişikliği önemlidir.",
        "Organik-mineral katkılarını anlatan temsili deney, bütün yaşlanmayı açıklayan bir yasa değildir. Düşük yoğunluk veya kırılganlık hakkında değerlendirme tek bir şemadan kişiye tanı koymaz. Bu derste amaç doku, büyüme ve yeniden yapılanmanın nedenlerini ilişkilendirerek verilen koşullardan sınırlı sonuç çıkarmaktır.",
      ),
    ],
    examples: [
      E(
        "206 nasıl toplanır?",
        "Tipik yetişkin sayımında eksen: baş 29, omurga 26, göğüs 25; üyeler: üst taraf ve kemer 64, alt taraf ve kemer 62. Toplamı ve iki ana bölümü hesapla.",
        "Alt grupları kendi ana grubunda topla.",
        [
          "Eksen toplamı 29+26+25=80 kemiktir.",
          "Üyeler toplamı 64+62=126 kemiktir.",
          "80+126=206; sonuç belirtilen tipik yetişkin sayımına aittir.",
        ],
        "Eksen 80, üyeler 126, toplam 206.",
        "Baş sayımında ossikül ve hiyoid kapsamını koruduk; kemerleri iki kez saymadık.",
        "Bireysel ve yaşa bağlı farkları dışlayıp 206'yı evrensel zorunluluk yapmak.",
      ),
      E(
        "Büyüme plağı kapandıktan sonra",
        "Sanal A kemiğinde büyüme plağı açık, B'de kapalı. Yalnız plağa bağlı uzunluk artışı inceleniyor; diğer koşullar aynı tutuluyor. Karşılaştırma?",
        "İncelenen mekanizmayı açık tut.",
        [
          "A'da kıkırdak büyüme ve yer değiştirme mekanizması için açık plak var.",
          "B'de plak kapandığı için bu mekanizmayla boyuna uzama beklenmez.",
          "Bu sonuç B'de bütün kemik yapımı, onarım veya kalınlaşma yoktur anlamına gelmez.",
        ],
        "Bu mekanizmayla uzunluk artışı A'da; B'de değil.",
        "Uzunluk büyümesi ile tüm doku etkinliği farklı kapsamlar.",
        "Plak kapalıysa kemik artık cansızdır demek.",
      ),
      E(
        "Net yapım mı, net kayıp mı?",
        "Temsili bir karşılaştırmada yeni doku yapımı 5 şema birimi, yıkım 8 şema birimi. Aynı dönemde net değişim nedir?",
        "Yapım ve yıkımı birlikte hesapla.",
        [
          "Net değişim yapım eksi yıkım olarak tanımlanmış.",
          "5−8=−3 şema birimi bulunur.",
          "Bu sanal dönemde net kayıp vardır; sayı gerçek hastanın kemik ölçümü değildir.",
        ],
        "3 şema birimi net kayıp.",
        "Yıkım daha büyük olduğu için işaret negatif; hücresel süreçler doku dengesini etkiler.",
        "Osteoblast adı geçiyorsa net yapım mutlaka pozitiftir sanmak.",
      ),
      E(
        "Kanal yok, beslenme de mi yok?",
        "Bir trabeküler kesitte sık kemikteki gibi osteon kanalları görülmüyor; trabekül çevresindeki boşluklarda damar ve ilik gösteriliyor. Hangi sonuç uygundur?",
        "Damarın örgütlenmesini doku tipine göre ayır.",
        [
          "Eksik olan sık kemiğin tipik osteon kanal düzenidir.",
          "Şekil çevrede damarları açıkça göstermiş; damar varlığı inkâr edilemez.",
          "Süngerimsi dokunun farklı örgütlenmesi, onun damarsız veya cansız olduğu anlamına gelmez.",
        ],
        "Beslenme vardır; örgütlenme sık kemikle aynı değildir.",
        "Yokluğu verilen yapıyı başka bütün yapılara genellemedik.",
        "Havers kanalı görünmüyorsa hiçbir damar yoktur demek.",
      ),
    ],
    recall: [
      {
        prompt: "Osteoblast, osteoklast ve osteosit nasıl ayrılır?",
        answer:
          "Yapım, yıkım/yeniden şekillenme ve olgun dokunun sürdürülmesi görevleriyle; net sonuç yapım-yıkım dengesine bağlıdır.",
      },
      {
        prompt: "Büyüme plağı ile periostun büyüme ilişkisi?",
        answer:
          "Açık epifiz plağı boyuna büyümeyle; periostal yapım ve yeniden düzenlenme kalınlaşmayla ilişkilidir.",
      },
      {
        prompt: "Süngerimsi kemikte osteon düzeninin yokluğu neyi göstermez?",
        answer:
          "Damar, ilik, canlı hücre veya dayanıklılık yokluğunu göstermez.",
      },
      {
        prompt: "206 sayısının kapsamı nedir?",
        answer:
          "Tipik yetişkin sayımıdır; 80 eksen+126 üyeler. Yaş, kaynaşma ve kişisel varyasyonlar dikkate alınır.",
      },
    ],
    questions: [
      Q(
        "kemik",
        1,
        "Yeni kemik matriksi yapımı, kemik yıkımı ve olgun matriks içindeki hücre sırasıyla hangi eşleşmedir?",
        "Osteoblast–osteoklast–osteosit.",
        [
          "Osteoklast–osteosit–koni.",
          "Kondrosit–eritrosit–tat hücresi.",
          "Osteosit–fotoreseptör–osteoblast.",
          "Plazma hücresi–iris–Ruffini.",
        ],
        "Üç hücrenin işlevini sırayla eşleştir.",
        "Osteoblast yapım, osteoklast yıkım/yeniden şekillenme; osteosit olgun dokunun sürdürülmesiyle ilişkilidir. Aynı dokudaki farklı görevler tek bir hücreye yüklenmez.",
      ),
      Q(
        "kemik",
        2,
        "Kemik matriksindeki organik kollajen ve mineral bileşen için doğru karşılaştırma hangisidir?",
        "Kollajen esneklik/çekmeye dayanım, mineral sertlik/basınca dayanım katkısı sağlar.",
        [
          "İkisi de hiçbir mekanik katkı yapmaz.",
          "Kollajen yalnız sinir impulsu üretir.",
          "Mineral bütün canlı hücrelerin yerine geçer.",
          "Kemik yalnız tek tür sıvıdan oluşur.",
        ],
        "Kemiği bir kompozit olarak düşün.",
        "Kemik organik ve mineral bileşenlerin birlikte örgütlendiği dokudur. Bileşenlerin katkıları tamamlayıcıdır; yalnız bir oran her gerçek kemiğin kırılma kuvvetini belirlemez.",
      ),
      Q(
        "kemik",
        3,
        "Bir osteonun merkezindeki uzunlamasına damar/sinir yolu ile osteonlar arasındaki yan bağlantı yolu doğru hangi sıradadır?",
        "Havers kanalı–Volkmann kanalı.",
        [
          "Volkmann kanalı–tat poru.",
          "Östaki borusu–optik disk.",
          "Epifiz plağı–göz bebeği.",
          "Koklear kanal–papilla.",
        ],
        "Merkez ve yan bağlantı görevini ayır.",
        "Havers kanalı osteonun merkezinde uzunlamasına uzanır; Volkmann kanalları yan bağlantılar kurar. Lakün ise hücrenin bulunduğu boşluktur, aynı büyük damar kanalı değildir.",
      ),
      Q(
        "kemik",
        4,
        "Büyüme plağı kapalı yetişkin kemiği için hangi sonuç uygundur?",
        "Plağa bağlı boyuna uzama biter; bütün onarım ve yeniden yapılanma zorunlu olarak bitmez.",
        [
          "Bütün kemik hücreleri artık ölüdür.",
          "Periostal yapım hiçbir koşulda mümkün değildir.",
          "Her kemiğin boyu aynı hızla uzamayı sürdürür.",
          "Kemik dokusu kendiliğinden yalnız yağa dönüşür.",
        ],
        "Bir büyüme mekanizması ile tüm canlı doku etkinliğini ayır.",
        "Epifiz plağının kapanması o yolla boy uzamasını sona erdirir. Kemik buna rağmen canlıdır; onarım, yeniden yapılanma ve uygun koşullarda appozisyonel süreçler sürebilir.",
      ),
      Q(
        "kemik",
        5,
        "Tipik yetişkin sayımında baş 29, omurga 26, göğüs 25 kemik sayılıyor. Eksen iskeleti toplamı kaçtır?",
        "80.",
        ["54.", "126.", "206.", "79."],
        "Verilen üç alt grubu bir kez topla.",
        "29+26+25=80 bulunur. 126 üyeler iskeletinin, 206 ise belirtilen tipik yetişkin toplamının sayısıdır; sayım kapsamları karıştırılmamalıdır.",
      ),
      Q(
        "kemik",
        6,
        "Tipik yetişkin üst taraflar ve omuz kemeri 64, alt taraflar ve kalça kemeri 62 kemik. Üyeler iskeleti kaç kemiktir?",
        "126.",
        ["80.", "206.", "122.", "128."],
        "Her kemer kendi grubuna zaten dâhil.",
        "64+62=126 bulunur. Kemerleri yeniden eklemek çift sayım olur; bu toplam tipik yetişkin kapsamına aittir.",
      ),
      Q(
        "kemik",
        7,
        "Aynı sanal dönemde yapım 7, yıkım 11 şema birimi olarak tanımlanıyor. Net yapım eksi yıkım değişimi nedir?",
        "−4 şema birimi; net kayıp.",
        [
          "4 şema birimi; net yapım.",
          "18 şema birimi; net yapım.",
          "0; iki süreç her zaman eşittir.",
          "77 şema birimi.",
        ],
        "İstenen işaretli farkı hesapla.",
        "7−11=−4'tür. Bu modelde yıkım yapımı aşar; sonuç net kayıptır. Verilen temsili sayılar gerçek bir kişiye ait kemik yoğunluğu ölçümü değildir.",
      ),
      Q(
        "kemik",
        8,
        "Embriyonik kemik gelişimi hakkında hangi ifade uygundur?",
        "Birçok kemik kıkırdak taslağı üzerinden, bazıları bağ dokusu içinde doğrudan gelişir.",
        [
          "Her kemik zorunlu olarak aynı kıkırdak taslağından oluşur.",
          "Hiçbir kemikte kıkırdakla ilişki kurulamaz.",
          "Kafatasının bütün kemikleri ömür boyu yalnız kıkırdaktır.",
          "Kemik oluşumu yalnız sinir aksonlarının uzamasıdır.",
        ],
        "Birçok ile bütün arasındaki farkı koru.",
        "Endokondral gelişim birçok kemikte görülür; intramembranöz gelişim kafatasının bazı kemikleri gibi örneklerde önemlidir. Tek yol bütün kemiklere genellenmez.",
      ),
      Q(
        "kemik",
        9,
        "Süngerimsi kesitte trabeküller arasında damar ve kırmızı ilik var; tipik osteon kanalı düzeni yok. Hangi yorum yanlıştır?",
        "Bu dokuda hiçbir damar ve canlılık bulunamaz.",
        [
          "Doku örgütlenmesi sık kemikten farklıdır.",
          "Kırmızı ilik kan hücresi yapımıyla ilişkilidir.",
          "Trabeküller destekleyici bir iç ağ oluşturur.",
          "Osteon kanalının yokluğu bütün damarların yokluğu demek değildir.",
        ],
        "Şekilde açıkça verilen damar kanıtını koru.",
        "Veri damar ve iliği zaten göstermiştir. Osteon örgütlenmesinin bulunmaması dokuya ait bütün beslenme ve canlılık ilişkilerini yok saydırmaz; diğer yorumlar bu kanıtla uyumludur.",
      ),
      Q(
        "kemik",
        10,
        "Yaşlanan kemikte kırılganlık için hangi açıklama daha uygundur?",
        "Kemik kütlesi, mikro yapı ve yapım-yıkım dengesi değişebilir; tek bir mineral artışı kuralı yeterli değildir.",
        [
          "Bütün yaşlılarda mineral miktarı mutlaka artar ve tek neden budur.",
          "Yaşla kemik hiçbir değişim gösteremez.",
          "Osteoporoz her zaman daha yoğun ve daha çok kemik demektir.",
          "Kollajen ile mineralin hiçbir farklı katkısı yoktur.",
        ],
        "Basit bileşen deneyi bütün yaşlanmanın yasası değildir.",
        "Kemik canlı olarak yeniden yapılanır. Yaş ve başka etkenlerle kütle, yoğunluk ve yapı değişebilir; osteoporozda kayıp/kalite değişimi önemlidir. Her durumda artan mineral varsayımı doğru bir genel açıklama değildir.",
      ),
    ],
  },
  {
    id: "destek-hareket-kikirdak-eklem",
    topic: "detail-303",
    title: "Kıkırdak ve eklem: destekten kontrollü harekete",
    minutes: 44,
    objectives: [
      "Kıkırdak türlerini doku yapısı ve doğru anatomik bölgeyle eşleştir.",
      "Sinoviyal eklemde kapsül, sıvı, yüz kıkırdağı ve bağları ayır.",
      "Ligament ve tendonun bağladığı yapıları hareket sırasında izle.",
    ],
    source:
      "MEBİ AYT Biyoloji Konu Özetleri, kıkırdak ve eklemler; OGM Dersler Cepte III, destek-hareket. Kaynak kapsamından geliştirilmiş özgün anlatım, büyütülmüş eklem şeması ve öğretim soruları.",
    sections: [
      S(
        "Kıkırdak: hücre kadar matriks de önemli",
        "Kıkırdak canlı kondrositlerden ve bu hücrelerin çevresindeki matriksten oluşur. Kondrositler lakünlerde bulunur; matriksteki kollajen, elastik lifler ve su tutan bileşenler dokuya farklı mekanik özellikler kazandırır. Ara madde için kondrin adı kullanılabilir, fakat bu ad bütün kıkırdak türlerinin aynı lif düzenine sahip olduğu anlamına gelmez.",
        "Kıkırdak uygun bölgelerde destek, esneklik, kaygan yüzey ve yük dağılımına katkı yapar. Basıncı veya gerilmeyi tümüyle yok etmez; yapısına göre bunlara karşı koyar ve dağıtır. Hücre adını bilmek kadar hangi bölgede hangi işlevin gerektiğini açıklamak da önemlidir.",
      ),
      S(
        "Damarsızlık, difüzyon ve onarım sınırı",
        "Kıkırdak dokunun kendi içinde kan damarları bulunmaz; hücrelere maddeler difüzyonla ulaşır. Bazı kıkırdakların çevresinde damarlı perikondrium yer alır ve madde alışverişine katkı sağlar. Difüzyon uzaklığı ve doku örgütlenmesi, hasarın neden yavaş onarılabildiğini anlamaya yardım eder.",
        "Her kıkırdağı zorunlu olarak aynı damarlı kılıfla sarma: eklem yüzeyindeki hiyalin kıkırdak ve fibröz kıkırdak tipik perikondrium istisnalarıdır. Eklem kıkırdağının beslenmesinde sinoviyal sıvıyla alışveriş önemlidir. Damarsızlık bütün hücrelerin ölü olduğu anlamına gelmediği gibi, her hasarın aynı süre ve sonuçla onarılacağını da belirlemez.",
      ),
      S(
        "Hiyalin: kaygan yüz ve büyüme plağı",
        "Hiyalin kıkırdakta kollajen içeren matriks tipik olarak düzgün destekleyici bir yapı oluşturur. Burun, soluk borusu, kaburga bağlantıları ve birçok hareketli eklemin yüzeyleri örnek bölgelerdir. Büyüme dönemindeki epifiz plağı da hiyalin kıkırdakla ilişkilidir; bütün bu örneklerde görev aynı tek sözcükle bitmez.",
        "Eklem yüzeyinde düşük sürtünmeli hareket ve yük dağılımı öne çıkarken, büyüme plağında kemik uzamasıyla ilişkili süreçler önemlidir. Aynı doku türünün iki bölgede bulunması iki bölgenin aynı anatomik yapı olduğu demek değildir. Epifiz plağı ile eklem yüzü kıkırdağını kesitte ayrı etiketle.",
      ),
      S(
        "Elastik: esneyip şekle dönen destek",
        "Elastik kıkırdak elastik liflerle esneyip eski biçimine dönme kapasitesine katkı yapar. Kulak kepçesi ve epiglot gibi örneklerde dayanıklı ama esnek bir destek gerekir. Bu özellik, dokunun hiçbir kollajen taşımadığı veya sınırsız gerilebildiği anlamına gelmez.",
        "Bir doku sınıfını örnek yerine mekanik gereksinimle ilişkilendir: kulak kepçesinin bükülüp biçimini koruması ile eklem yüzeyinin kaygan hareket sağlaması aynı baskın iş değildir. Bölge adını duyunca yalnız en yakın kemiği düşünmek yerine o bölgede hangi dokunun seçildiğini belirle.",
      ),
      S(
        "Fibröz: kuvvetli kollajen düzeni",
        "Fibröz kıkırdakta kollajen liflerin belirgin örgütlenmesi çekme ve basınç yükleriyle baş etmeye katkı yapar. Omurlar arası diskler, diz menisküsleri ve kalça labrumu gibi yapılar örnek verilebilir. Bir eklem bölgesinde bulunması, o eklemin bütün yüzeyinin fibröz kıkırdak olduğu anlamına gelmez.",
        "Dizde tipik eklem yüzlerinin hiyalin kıkırdağı ile aradaki fibröz menisküs farklı yapılardır. Kalça eklemindeki labrum da yüzey kıkırdağından ayrı ele alınır. Kaynakta 'dizde fibröz kıkırdak bulunur' cümlesini okuduğunda hangi anatomik bölüme işaret edildiğini sormak, doğru bilgiyi yanlış genellemeye dönüştürmeni önler.",
      ),
      S(
        "Eklem sınıflamasında hangi ölçüt?",
        "Kemiklerin bağlantı kurduğu bölgeler eklem olarak adlandırılır. Okul düzeyindeki işlevsel sınıflama oynamaz, yarı oynar ve oynar gruplarını hareket miktarıyla karşılaştırır. Yapısal sınıflama ise fibröz, kıkırdak ve sinoviyal bağlantı gibi doku ve boşluk özelliklerine bakar; iki ölçüt aynı sözcük listesi değildir.",
        "Kafatası suturaları hareketi çok sınırlı bağlantılara, omur gövdeleri arasındaki diskli bağlantılar sınırlı harekete, tipik sinoviyal eklemler daha serbest harekete örnek olabilir. Bütün omurga bağlantılarını tek tipe indirgeme: faset eklemleri ve atlas-axis ilişkisi farklı özellikler taşır. Soruda hangi bağlantı ve hangi sınıflama ölçütü verildiyse onu kullan.",
      ),
      S(
        "Sinoviyal eklemde kasıtlı bir boşluk var",
        "Sinoviyal eklemde kemik uçları uygun eklem yüzeyleriyle karşılaşır; arada fizyolojik eklem boşluğu bulunur. Dış fibroz kapsül destek ve bütünlük sağlar, iç sinoviyal zar sıvının oluşumuna katkı yapar. Sıvı kayganlığa ve eklem kıkırdağının beslenmesine yardım eder; sıvıyı eklem uçlarını birbirine yapıştıran sert bir madde gibi düşünme.",
        "Yüzey kıkırdağı, kapsül ve sinoviyal sıvı farklı yapılardır. Öğretim çiziminde boşluğun büyütülmesi yapıları ayırt etmeyi sağlar; gerçek dokunun aynı ölçekte olmadığı açık olmalıdır. Bu boşluk anatomik olarak gereklidir; şemadaki her boşluğu yanlış bir havada durma hatası sayıp kapatmak da doğru değildir.",
      ),
      S(
        "Ligament ve tendonun uçlarını takip et",
        "Ligamentler kemikleri birbirine bağlayan bağ doku yapılarıdır; eklemin bütünlüğüne ve aşırı hareketin sınırlanmasına katkı yapar. Tendonlar ise kas kuvvetinin kemiğe aktarılmasında görev alan yoğun bağ dokusudur. Sırf ikisi de bağ doku diye aynı iki yapıyı bağladıkları düşünülmemelidir.",
        "Kasın tendona bağlanması, kas hücrelerinin ilerledikçe tendon hücresine dönüşmesi anlamına gelmez. Şemada bir bağlantının iki ucunu incele: kemik-kemik ise ligament; kas-kemik ilişkisi verilmişse tendon olarak yorumlanabilir. Hareket ederken tendonun kemiğe tutunduğu yer kemiğin hareketiyle birlikte kalmalı; keyfî olarak havada sürüklenmemelidir.",
      ),
      S(
        "Hareket: tek bir parçanın kayması değil",
        "Eklemin hareketi kas kuvveti, kemik biçimi, bağlar ve kapsülün birlikte kurduğu sınırlar içinde gerçekleşir. Menteşe şeması dönme merkezini açıkça göstererek yön değişimini öğretir; gerçek diz ise daha karmaşık üç boyutlu hareketler içerir. Basit şemadaki bir açı değeri gerçek kişi için güvenli egzersiz veya yaralanma sınırı değildir.",
        "Modelde alt kemik dönerken seçilen tendon ve ligament uçları tanımlı kemik noktalarını izler. Kıkırdak ve menisküs vurgusu doku tiplerini ayırır; kemikleri iç içe geçirerek hareket varmış gibi göstermez. Anatomik temsilde boşluklar ve doku kalınlıkları büyütüldüğünden sonuç, hassas biyomekanik yük hesabı olarak okunmamalıdır.",
      ),
      S(
        "Karşılaştırmayı doku ve bölgeyle bitir",
        "Bir örneği açıklarken doku türü, konum, işlev ve istisnayı birlikte söyle. 'Diz' tek başına bir kıkırdak türü değildir; 'damarsız' da tek başına cansızlık açıklaması değildir. Aynı bölgedeki yüz kıkırdağı, menisküs, ligament ve tendonun dört ayrı ilişki kurabildiğini düşün.",
        "Sorularda gerekli doku bölgesi ve şart kartta verilmelidir; görünmeyen bir şekli hayal ederek cevaplama gerekmemeli. Laboratuvar seçimi ve gerekçesi bu cihazda korunur ama kendiliğinden ustalık veya konu tamamlanması kaydetmez. Önce bağlantıyı açıklayabilir hâle gel, sonra bağımsız örneklerle yeni bağlama taşı.",
      ),
    ],
    examples: [
      E(
        "Aynı dizde iki kıkırdak",
        "Bir diz kesitinde A kemik uçlarının eklem yüzü, B menisküs olarak açıkça tanımlanıyor. Tipik doku eşleşmesi nedir?",
        "Bölgeyi bütün eklem adından daha ayrıntılı ele al.",
        [
          "A düşük sürtünmeli tipik yüz kıkırdağıdır; hiyalin olarak ele alınır.",
          "B menisküstür; fibröz kıkırdak örneğidir.",
          "Aynı dizde iki tür birlikte bulunabilir; dizin tamamı tek tür sayılmaz.",
        ],
        "A hiyalin, B fibröz.",
        "Doku konumları kartta tanımlı; görünmeyen şekle ihtiyaç yok.",
        "Dizde fibröz var diye bütün eklem yüzünü fibröz seçmek.",
      ),
      E(
        "İki bağlantının uçları",
        "A bağının iki ucu iki ayrı kemikte; B yapısının bir ucu kasta, diğeri kemikte. A ve B için en uygun eşleştirme?",
        "Bağlanan yapıları izle.",
        [
          "A kemik-kemik ilişkisi kurar; bu ligament tanımına uygundur.",
          "B kas kuvvetini kemiğe aktarır; tendon tanımına uygundur.",
          "İkisi de bağ doku içerebilir, fakat uçları ve görevleri aynı değildir.",
        ],
        "A ligament, B tendon.",
        "Kas hücresinin tendona dönüşmesi gibi bir hücresel değişim varsaymadık.",
        "Bağ doku ortaklığından aynı bağlantı görevini çıkarmak.",
      ),
      E(
        "Damarsız dokunun yaşaması",
        "Eklem yüzündeki hiyalin kıkırdakta damar ve tipik perikondrium görülmüyor; sinoviyal sıvıyla madde alışverişi gösteriliyor. Doku neden mutlaka ölü sayılamaz?",
        "Beslenmenin damar dışı yolunu kullan.",
        [
          "Kıkırdak dokunun kendisi damarsızdır; bu genel bir yapısal özelliktir.",
          "Bu bölgede difüzyon ve sinoviyal sıvıyla alışveriş hücre beslenmesine katkı yapar.",
          "Perikondriumun her kıkırdakta zorunlu olması gerekmez; eklem yüzü tipik istisnadır.",
        ],
        "Difüzyonla beslenebilir; damarsızlık hücresiz/ölü demek değildir.",
        "Kaynakta gösterilen sıvı yolunu ve bölgesel istisnayı koruduk.",
        "Her kıkırdağın etrafında aynı damarlı kılıfı zorunlu çizmek.",
      ),
      E(
        "Omurganın her bağlantısı aynı mı?",
        "Bir kart omur gövdeleri arasındaki diskli bağlantıyı, diğeri atlas-axis arasındaki hareketli bağlantıyı anlatıyor. İkisinden bütün omurgada tek tip eklem sonucu çıkar mı?",
        "Adı değil tanımlanmış bağlantıyı karşılaştır.",
        [
          "Diskli gövde bağlantısı sınırlı hareket ve kıkırdak ilişkisi taşır.",
          "Atlas-axis bağlantısının hareket ve yapısal özellikleri bu örüntünün basit aynısı değildir.",
          "Ayrıca faset eklemleri gibi bağlantılar bulunduğundan omurganın bütün eklemlerini tek sınıfa koymak doğru olmaz.",
        ],
        "Hayır; bölge ve bağlantı türü ayrı belirtilmelidir.",
        "Sınıflama ölçütünü ve anatomik kapsamı sabit tuttuk.",
        "Omurgada sözcüğünü görünce bütün bağlantıları aynı eklem sanmak.",
      ),
    ],
    recall: [
      {
        prompt: "Her kıkırdakta perikondrium var mı?",
        answer:
          "Hayır; eklem yüzü kıkırdağı ve fibröz kıkırdak tipik istisnalardır. Eklem kıkırdağı sinoviyal sıvıyla alışveriş yapar.",
      },
      {
        prompt: "Dizde hiyalin ile fibröz nerede ayrılır?",
        answer:
          "Tipik kemik uç yüzünde hiyalin, menisküste fibröz kıkırdak bulunur.",
      },
      {
        prompt: "Ligament ve tendon nasıl ayırt edilir?",
        answer:
          "Ligament kemik-kemik, tendon kas kuvvetini kemiğe aktaran kas-kemik ilişkisi kurar.",
      },
      {
        prompt: "Eklem boşluğu çizimde kapatılmalı mı?",
        answer:
          "Hayır; sinoviyal eklemin fizyolojik boşluğudur. Şematik büyütme ve gerçek ölçü ayrımı açıklanmalıdır.",
      },
    ],
    questions: [
      Q(
        "kikirdak-eklem",
        1,
        "Kıkırdak hücresi ve bu hücrenin yer aldığı küçük matriks boşluğu doğru hangi sıradadır?",
        "Kondrosit–lakün.",
        [
          "Osteoklast–göz bebeği.",
          "Koni–Havers kanalı.",
          "Tat hücresi–östaki.",
          "Plazma hücresi–oval pencere.",
        ],
        "Hücreyi çevresindeki anatomik boşluktan ayır.",
        "Kondrosit kıkırdak hücresidir; lakün matriks içindeki hücre boşluğudur. Matriksin lif ve diğer bileşenleri doku özelliklerine katkı yapar.",
      ),
      Q(
        "kikirdak-eklem",
        2,
        "Bir diz kesitinde A tipik kemik ucu eklem yüzü, B menisküs. Doğru eşleşme hangisidir?",
        "A hiyalin; B fibröz kıkırdak.",
        [
          "A fibröz; B mutlaka elastik kıkırdak.",
          "A ve B ikisi de zorunlu olarak yağ bezidir.",
          "Dizde hiçbir kıkırdak bulunmaz.",
          "A yalnız kan; B yalnız aksondur.",
        ],
        "Dizin adı yerine alt yapıyı kullan.",
        "Tipik eklem yüzü hiyalin kıkırdakla kaplıdır; diz menisküsü fibröz kıkırdak örneğidir. Aynı eklemde iki doku türü birlikte bulunabilir.",
      ),
      Q(
        "kikirdak-eklem",
        3,
        "Kulak kepçesinin bükülüp biçimini koruyan destek dokusu için en uygun örnek hangisidir?",
        "Elastik kıkırdak.",
        [
          "Yalnız sık kemik.",
          "Retinanın koni hücreleri.",
          "Bütün yüzeyde kırmızı ilik.",
          "Sinoviyal sıvının kendisi.",
        ],
        "Esneklik ve destek gereksinimini birlikte düşün.",
        "Kulak kepçesi elastik kıkırdak örneğidir; elastik lifler esneyip biçime dönmeye katkı yapar. Bu, dokunun sınırsız gerildiği anlamına gelmez.",
      ),
      Q(
        "kikirdak-eklem",
        4,
        "Eklem yüzü kıkırdağında damar ve tipik perikondrium yok, sinoviyal sıvıyla madde alışverişi var. Hangi yorum doğrudur?",
        "Damarsız hücreler difüzyonla beslenebilir; her kıkırdakta aynı perikondrium zorunlu değildir.",
        [
          "Damar yoksa bütün hücreler mutlaka ölüdür.",
          "Sinoviyal sıvı yalnız kemik üretir ve hiçbir madde taşımaz.",
          "Her kıkırdak doğrudan kendi atardamarını içerir.",
          "Perikondrium yokluğu bu kartta imkânsızdır.",
        ],
        "Beslenme yolu ve bölgesel istisnayı koru.",
        "Kıkırdak avaskülerdir; difüzyon önemlidir. Eklem yüzü kıkırdağı tipik perikondrium istisnasıdır, sinoviyal sıvı alışverişi hücre beslenmesine katkı yapar.",
      ),
      Q(
        "kikirdak-eklem",
        5,
        "A yapısı kemik-kemik, B yapısı kas-kemik bağlantısı kuruyor. En uygun eşleşme?",
        "A ligament; B tendon.",
        [
          "A tendon; B ligament.",
          "A retina; B iris.",
          "A tat poru; B koku epiteli.",
          "İkisi de zorunlu olarak eklem sıvısıdır.",
        ],
        "İki ucun hangi dokuda olduğunu izle.",
        "Ligament kemikleri birbirine bağlar; tendon kas kuvvetini kemiğe aktarır. Ortak bağ doku özellikleri farklı bağlantı görevlerini ortadan kaldırmaz.",
      ),
      Q(
        "kikirdak-eklem",
        6,
        "Bir sinoviyal eklemde iç sinoviyal zar ve eklem sıvısı için doğru açıklama hangisidir?",
        "Zar sıvı oluşumuna katkı yapar; sıvı kayganlığa ve yüz kıkırdağının beslenmesine yardım eder.",
        [
          "Sıvı bütün kemik uçlarını katı olarak kaynaştırır.",
          "Sinoviyal zar optik sinirin çıkış yeridir.",
          "Sıvı eklem boşluğunu yok etmek zorundadır.",
          "Bütün sinoviyal eklemler oynamaz kafatası suturasıdır.",
        ],
        "Sıvının sürtünme ve alışveriş rolünü kullan.",
        "Sinoviyal eklemde fizyolojik boşluk ve kayganlaştırıcı sıvı bulunur. Bu yapıların görevi kemikleri katı olarak kaynaştırmak veya boşluğu kaldırmak değildir.",
      ),
      Q(
        "kikirdak-eklem",
        7,
        "Omur gövdeleri arasındaki diskli bağlantı ve atlas-axis bağlantısı için hangi yaklaşım uygundur?",
        "Hareket ve yapı özellikleri bölgeye göre ayrı değerlendirilmelidir.",
        [
          "Omurgadaki bütün bağlantılar her ölçüte göre tamamen aynıdır.",
          "Atlas-axis hiçbir hareket yapamaz.",
          "Her omur bağlantısında aynı disk koşulsuz bulunur.",
          "Omurgada hiçbir eklem yoktur.",
        ],
        "Bütün omurgaya tek örnekten genelleme yapma.",
        "Diskli gövde bağlantıları, faset eklemleri ve atlas-axis ilişkisi aynı tek örüntüye indirgenmez. Soru hangi bağlantıyı tanımlıyorsa onun yapısı ve hareketi değerlendirilir.",
      ),
      Q(
        "kikirdak-eklem",
        8,
        "Kıkırdağın basınç ve sürtünmeyle ilişkisi için hangi ifade doğrudur?",
        "Yapısına ve konumuna göre yük dağılımı, destek ve düşük sürtünmeli harekete katkı yapabilir.",
        [
          "Bütün basınç ve gerilmeleri her koşulda sıfırlar.",
          "Hiçbir canlı hücre içermez.",
          "Sadece sinir impulsunu optik görüntüye çevirir.",
          "Her türü aynı lif düzeni ve göreve sahiptir.",
        ],
        "Katkı sağlamak ile bütün etkiyi yok etmek aynı değildir.",
        "Kıkırdak türleri farklı matriks örgütlenmeleriyle görev yapar. Kayganlık ve yük dağılımı önemlidir, ancak sınırsız yük koruması veya bütün kuvvetleri sıfırlama garantisi değildir.",
      ),
      Q(
        "kikirdak-eklem",
        9,
        "İşlevsel sınıflama hareket miktarına, yapısal sınıflama bağlantı dokusu ve boşluğa bakıyor. Hangi seçenek bu iki ölçütü ayırır?",
        "Oynar/yarı oynar/oynamaz ile sinoviyal/kıkırdak/fibröz aynı ölçüt listesi değildir.",
        [
          "Eklemde doku türü ile hareket miktarı her zaman aynı sözcüktür.",
          "Bütün eklemler aynı türde boşluk içerir.",
          "Her kemik-kemik bağlantısı mutlaka tamamen serbesttir.",
          "Sınıflama için anatomik bölge hiçbir zaman gerekmez.",
        ],
        "Sınıflamanın hangi soruyu sorduğunu belirle.",
        "Hareket temelli ve yapı temelli sınıflamalar farklı özellikleri karşılaştırır. Örneklerde ilişki kurulabilir ama iki sözcük listesi eş anlamlı ve koşulsuz özdeş değildir.",
      ),
      Q(
        "kikirdak-eklem",
        10,
        "Bir sanal eklem modeli 0–60° aralığında hareket gösteriyor; dokular ve boşluklar büyütülmüş. Hangi çıkarım geçerlidir?",
        "Model bağlantıların yönünü öğretir; 60° her kişi için güvenli yük/yaralanma sınırı değildir.",
        [
          "60° bütün gerçek dizler için evrensel kırılma açısıdır.",
          "Şemadaki her boşluk mutlaka çizim hatasıdır.",
          "Kas hücreleri hareket ettikçe tendon hücresine dönüşür.",
          "Bağın kemiğe tutunan ucu hareket sırasında kemikten bağımsız kaymalıdır.",
        ],
        "Şema sınırını fizyolojik veya klinik sınır yapma.",
        "Öğretim modeli dönme merkezi ve doku bağlantılarını sadeleştirir. Gerçek üç boyutlu eklem yükü, kişisel güvenlik ve yaralanma eşiği bu açı aralığından çıkarılamaz.",
      ),
    ],
  },
];
export const forge016BiologyBTopics: Record<string, string> =
  Object.fromEntries(data.map((d) => [d.id, d.topic]));
export const forge016BiologyBGuides: LessonGuide[] = data.map((d) => ({
  id: d.id,
  minutes: d.minutes,
  objectives: d.objectives,
  sections: d.sections,
  examples: d.examples,
  recall: d.recall,
  source: d.source,
}));
export const forge016BiologyBLessons: Lesson[] = data.map((d) => ({
  id: d.id,
  subjectId: "ayt-biyoloji",
  title: txt(d.title),
  minutes: d.minutes,
  objectives: d.objectives.map(txt),
  body: d.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join(" ")),
  })),
  questions: d.questions,
  source: txt(d.source),
  tags: ["kaynakli", "etkilesimli", "forge016"],
}));
