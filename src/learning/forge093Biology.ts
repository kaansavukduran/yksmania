import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

export type FlowDirection = "in" | "out" | "none";
export type MembraneSolute = "oxygen" | "glucose" | "sodium" | "protein";
export interface SoluteExperiment {
  solute: MembraneSolute;
  active: boolean;
  carrier: boolean;
  atp: boolean;
  permeability: number;
  outside: number;
  inside: number;
}
export function membraneTransport(input: SoluteExperiment) {
  const { solute, active, carrier, atp, permeability, outside, inside } = input;
  if (
    ![outside, inside, permeability].every(Number.isFinite) ||
    outside < 0 ||
    inside < 0 ||
    permeability < 0 ||
    permeability > 3
  )
    throw new RangeError("MEMBRANE_SCOPE");
  let blocked = "";
  if (solute === "protein")
    blocked =
      "Büyük protein bu küçük-madde yolundan geçemez; veziküler taşıma ayrı süreçtir.";
  else if (active && solute !== "sodium")
    blocked =
      "Bu seçilmiş pompa modeli yalnız Na⁺ taşır; başka maddeye uygunluğu varsayılmaz.";
  else if (active && !carrier)
    blocked = "Uygun pompa proteini yok; ATP tek başına maddeyi geçirmez.";
  else if (active && !atp)
    blocked = "ATP kaynağı kapalı; bu ATP kullanan pompa çalışamaz.";
  else if (active && inside === 0)
    blocked = "İç bölmede bu yönde taşınabilecek Na⁺ kalmadı.";
  else if (!active && solute !== "oxygen" && !carrier)
    blocked = "Polar veya yüklü madde için uygun taşıma proteini yok.";
  else if (permeability === 0)
    blocked =
      "Seçili uygun yolun geçirgenliği sıfır; derişim farkı tek başına yeterli değil.";
  const difference = outside - inside;
  const amount = blocked
    ? 0
    : active
      ? Math.min(inside, permeability / 3)
      : Math.min(Math.abs(difference) / 2, permeability / 3);
  const direction: FlowDirection =
    amount === 0 ? "none" : active ? "out" : difference > 0 ? "in" : "out";
  const signed =
    direction === "in" ? amount : direction === "out" ? -amount : 0;
  return {
    direction,
    amount,
    blocked,
    outsideAfter: outside - signed,
    insideAfter: inside + signed,
    mechanism: active
      ? "ATP kullanan Na⁺ pompası"
      : solute === "oxygen"
        ? "Basit difüzyon"
        : "Kolaylaştırılmış difüzyon",
  };
}

export function osmosisModel(
  inside: number,
  outside: number,
  pressure: number,
  waterOpen: boolean,
) {
  if (
    ![inside, outside, pressure].every(Number.isFinite) ||
    inside < 0 ||
    outside < 0 ||
    pressure < 0
  )
    throw new RangeError("OSMOSIS_SCOPE");
  // Fixed temperature, ideal dilute solutions, impermeant solute; pressure is in the same normalized units as RTΔC.
  const drive = inside - outside - pressure;
  const direction: FlowDirection =
    !waterOpen || Math.abs(drive) < 1e-9 ? "none" : drive > 0 ? "in" : "out";
  const environment =
    outside > inside
      ? "Hipertonik"
      : outside < inside
        ? "Hipotonik"
        : "İzotonik";
  return { direction, drive, environment };
}

export const classificationRanks = [
  "Üst âlem",
  "Âlem",
  "Şube",
  "Sınıf",
  "Takım",
  "Familya",
  "Cins",
  "Tür",
] as const;
export const namedOrganisms = [
  {
    id: "lion",
    common: "Aslan",
    genus: "Panthera",
    epithet: "leo",
    lineage: [
      "Eukarya",
      "Animalia",
      "Chordata",
      "Mammalia",
      "Carnivora",
      "Felidae",
      "Panthera",
      "Panthera leo",
    ],
  },
  {
    id: "tiger",
    common: "Kaplan",
    genus: "Panthera",
    epithet: "tigris",
    lineage: [
      "Eukarya",
      "Animalia",
      "Chordata",
      "Mammalia",
      "Carnivora",
      "Felidae",
      "Panthera",
      "Panthera tigris",
    ],
  },
  {
    id: "cat",
    common: "Ev kedisi",
    genus: "Felis",
    epithet: "catus",
    lineage: [
      "Eukarya",
      "Animalia",
      "Chordata",
      "Mammalia",
      "Carnivora",
      "Felidae",
      "Felis",
      "Felis catus",
    ],
  },
  {
    id: "human",
    common: "İnsan",
    genus: "Homo",
    epithet: "sapiens",
    lineage: [
      "Eukarya",
      "Animalia",
      "Chordata",
      "Mammalia",
      "Primates",
      "Hominidae",
      "Homo",
      "Homo sapiens",
    ],
  },
  {
    id: "sparrow",
    common: "Bayağı serçe",
    genus: "Passer",
    epithet: "domesticus",
    lineage: [
      "Eukarya",
      "Animalia",
      "Chordata",
      "Aves",
      "Passeriformes",
      "Passeridae",
      "Passer",
      "Passer domesticus",
    ],
  },
  {
    id: "cricket",
    common: "Ev cırcır böceği",
    genus: "Acheta",
    epithet: "domesticus",
    lineage: [
      "Eukarya",
      "Animalia",
      "Arthropoda",
      "Insecta",
      "Orthoptera",
      "Gryllidae",
      "Acheta",
      "Acheta domesticus",
    ],
  },
] as const;

export function narrowestSharedRank(firstId: string, secondId: string) {
  const a = namedOrganisms.find((o) => o.id === firstId),
    b = namedOrganisms.find((o) => o.id === secondId);
  if (!a || !b) throw new RangeError("UNKNOWN_TAXON");
  let index = -1;
  for (
    let i = 0;
    i < classificationRanks.length && a.lineage[i] === b.lineage[i];
    i++
  )
    index = i;
  return { index, rank: classificationRanks[index], taxon: a.lineage[index] };
}

// Constructed aligned characters illustrate inference; these are not measured genes from the named animals.
export const teachingSequences = [
  { name: "Sazan", sequence: "AAAAAA" },
  { name: "Kurbağa", sequence: "AACCAA" },
  { name: "Kedi", sequence: "GGCCTT" },
  { name: "Kertenkele", sequence: "GGCCGA" },
  { name: "Güvercin", sequence: "GGCCGG" },
] as const;
export function alignedDifferences(a: string, b: string) {
  if (a.length !== b.length || !a.length || !/^[ACGT]+$/.test(a + b))
    throw new RangeError("ALIGNMENT_SCOPE");
  return [...a].reduce((n, base, i) => n + Number(base !== b[i]), 0);
}

export function classificationInference(evidence: string) {
  if (evidence === "cell")
    return {
      resolved: false,
      expected: "insufficient",
      conclusion: "Yalnız ökaryot hücre bilgisiyle yakın çift seçilemez.",
      detail:
        "Beş örneğin tümü bu özelliği taşır. İç dallanma için ayırt edici ek kanıt gerekir; belirsizlik gerçek akrabalıkların eşit olduğu anlamına gelmez.",
    };
  if (evidence === "structure")
    return {
      resolved: false,
      expected: "insufficient",
      conclusion:
        "Amniyot grubu ayrılır; grubun iç sırası bu paketle çözülmez.",
      detail:
        "Kedi, kertenkele ve güvercin amniyon ortaklığıyla gruplanır. Yalnız bu ortaklık bu üçünün içindeki en yakın çifti seçmez.",
    };
  if (evidence === "dna")
    return {
      resolved: true,
      expected: "sister",
      conclusion:
        "Ek öğretim verisi kertenkele–güvercin yakınlığını destekler.",
      detail:
        "Oluşturulmuş hizalı dizilerde bu çift 1 konumda, kediyle karşılaştırmalar 2 konumda farklıdır. Şema bu paket içindir; gerçek genom ölçümü veya her veri için geçerli bir ağaç algoritması değildir.",
    };
  throw new RangeError("EVIDENCE_SCOPE");
}

const section = (
  title: string,
  first: string,
  second: string,
  table?: GuideSection["table"],
): GuideSection => ({
  title,
  paragraphs: [first, second],
  ...(table ? { table } : {}),
});
const example = (
  title: string,
  prompt: string,
  strategy: string,
  steps: [string, string, string][],
  answer: string,
  check: string,
  pitfall: string,
): WorkedExample => ({
  title,
  prompt,
  strategy,
  steps: steps.map(([label, explanation, expression]) => ({
    label,
    explanation,
    ...(expression ? { expression } : {}),
  })),
  answer,
  check,
  pitfall,
});
const question = (
  id: string,
  prompt: string,
  options: string[],
  answer: number,
  hint: string,
  explanation: string,
  skill: string,
): Question => ({
  id,
  prompt: txt(prompt),
  options: options.map(txt),
  answer,
  hint: txt(hint),
  explanation: txt(explanation),
  skill,
});

const membraneGuide: LessonGuide = {
  id: "hucre-zarinda-madde-alisverisleri",
  minutes: 75,
  objectives: [
    "Maddeyi, geçirgen yolu ve net yönü birlikte kullanarak taşıma mekanizmasını seç.",
    "Protein kullanımını ATP kullanımından, su geçişini çözünenin geçişinden ayır.",
    "Tonisiteyi geçemeyen çözünenler ve basınç koşuluyla yorumla; bitki ve hayvan sonucunu karşılaştır.",
    "Derişim deneyini, diyalizi ve veziküler taşımayı bağımsız kanıtlarla çöz.",
  ],
  sections: [
    section(
      "Zardan önce maddeyi tanı",
      "Hücre zarı fosfolipit çift tabaka ve proteinlerin oluşturduğu seçici bir sınırdır. Seçicilik bir kapının her küçük şeyi aynı hızda geçirmesi değildir. Molekülün boyutu, yükü, polaritesi, lipitte çözünürlüğü ve kullanılabilecek protein yolu birlikte önemlidir. O₂ gibi küçük apolar bir molekül lipit tabakadan geçebilirken Na⁺ gibi küçük fakat yüklü bir iyon genellikle uygun protein ister. Büyük bir protein için küçük iyon kanalının açık olması işe yaramaz.",
      "Bir şekli okurken hücre içini ve dışını etiketle, hangi maddenin izlendiğini yaz. Glikoz ile su aynı kaptaysa ikisinin yollarını ayrı değerlendir. Kanalın yalnız gözenek büyüklüğüne bakarak her iyonu geçireceğini varsayma; seçicilik yük ve protein yapısıyla da ilişkilidir. Zarların bütünü için tek bir sabit elektrik yükü sırası veya ‘bütün negatifler bütün pozitiflerden hızlıdır’ kuralı kullanılmaz. İyonlarda elektriksel potansiyel de etkilidir; modelimiz bunu sabit ve sıfır kabul ederek derişim etkisini ayırır.",
    ),
    section(
      "Basit difüzyonda net hareket ile hareketi ayır",
      "Difüzyon taneciklerin ısıl hareketi nedeniyle yayılmasıdır. Başlangıçta bir tarafta daha çok geçebilir tanecik varsa iki yöndeki geçişlerin farkı çok derişikten az derişiğe net akış verir. Basit difüzyonda madde fosfolipit tabakadan geçer; ayrı bir taşıyıcı protein veya taşımayı süren doğrudan ATP harcaması gerekmez. Hücre ile doku sıvısı arasındaki O₂ ve CO₂ alışverişi bu düşünceyi örnekler.",
      "Eşit derişimde ‘moleküller durdu’ deme. İki yönde hareket sürerken birim zamanda geçenlerin sayısı yaklaşık eşit olabilir; net geçiş sıfırdır. Difüzyon yalnız canlıya özgü değildir. Derişim farkı yönü belirlerken uygun sıcaklık, yüzey alanı, geçirgenlik ve yol uzunluğu hızı etkiler. Daha çok yüzey genellikle daha hızlı geçiş sağlar; çok yüksek sıcaklığın canlı zar proteinlerini bozabilmesi, sıcaklığı sınırsız artırma sonucunu geçersiz kılar.",
    ),
    section(
      "Kolaylaştırılmış difüzyon: protein var, ATP şart değil",
      "Glikoz gibi polar maddeler ve iyonlar uygun taşıyıcı veya kanal proteinleri üzerinden gradyan yönünde pasif taşınabilir. Kolaylaştırılmış difüzyonda protein görev alır; buna bakarak aktif taşıma diyemezsin. Taşıyıcı ilgili maddeyle uygun etkileşimi kurar, kanal da belirli iyonlara seçici olabilir. Bu yüzden bir proteinin varlığı bütün maddelerin geçeceği anlamına gelmez.",
      "Taşıyıcı sayısı sınırlı olduğunda geçişin kapasitesi sınırlanabilir; derişimi artırmak her koşulda aynı oranda hız artışı vermez. Basit difüzyon ve kolaylaştırılmış difüzyonun ortak noktası, uygun yol varsa net pasif yönün gradyan boyunca olmasıdır. ATP üretimi baskılanınca, zar bütünlüğü ve protein işlevi korunmuşsa mevcut gradyanla pasif geçiş sürebilir. Uzun vadede gradyanı koruyan pompaların aksaması ayrı bir dolaylı etkidir; deneyin süresini ve verilen koşullarını oku.",
    ),
    section(
      "Aktif taşımada enerjiyi ve gradyanı izle",
      "Küçük bir madde elektrokimyasal gradyanına karşı biriktiriliyorsa taşıma enerjiye bağlanmalıdır. TYT’nin temel örneğinde taşıyıcı/pompa proteini ATP kullanır. Na⁺/K⁺ pompası hücre zarında Na⁺’u dışarı ve K⁺’u içeri taşır; etkinin yönü ‘her zaman hücreye’ değildir. Derişimler eşitken çalışan pompa da fark oluşturabilir; aktif taşımayı yalnız mevcut farkın büyüklüğüyle tanımlama.",
      "Doğrudan ATP kullanan birincil taşıma ile bir iyon gradyanından enerji alan ikincil taşıma ayrılabilir. Bu modelde yalnız seçilmiş ATP kullanan Na⁺ çıkış yolu incelenir; K⁺ karşı taşınması ve gerçek pompanın 3:2 sayımı çizilmez. ATP’nin kapalı olması bu yolun çalışmasını engeller; uygun pompa proteini yokken ATP’yi açmak da yeterli değildir. Büyük parçacığın veziküle alınması ise enerji kullansa da küçük-madde pompasıyla aynı mekanizma değildir.",
    ),
    section(
      "Ozmozda taşınan su, tonisitede belirleyici geçemeyen çözünen",
      "Ozmoz suyun seçici geçirgen bir zar üzerinden net geçişidir. Aynı sıcaklıkta, benzer basınçta ve geçemeyen çözünenler karşılaştırılıyorsa su, çözünen derişimi düşük taraftan yüksek tarafa net geçer. Su aktif taşıma pompasıyla taşınıyor diye yorumlanmaz. Aquaporin gibi su kanalları geçişi kolaylaştırabilir; bir kanalın kullanılması bu olayı ATP kullanan taşıma yapmaz.",
      "Hipertonik, hipotonik ve izotonik karşılaştırma sözcükleridir; dış ortam hücreye göre adlandırılır. Uzun süreli tonisite için özellikle zarı kolay geçemeyen çözünenin etkisi önemlidir. Zar iki çözüneni farklı geçiriyorsa yalnız toplam yüzdeyi karşılaştırmak eksik olabilir. Modelin su bölümünde tek tür, zarı geçemeyen ideal çözünen, sabit sıcaklık ve belirtilen basınç varsayılır; yoğun karışımların, bütün iyonların veya gerçek hücrenin kesin hacim değişimini hesaplamaz.",
    ),
    section(
      "Aynı su yönü, iki farklı hücre sonucu",
      "Dış ortam hipertonikse hayvan hücresi su kaybederek büzülür. Bitki hücresinde protoplast su kaybıyla çeperden uzaklaşabilir; bu görünüm plazmolizdir. Çeperin kendisi büzülüp küçülmüş sayılmaz. Plazmoliz olmuş uygun bir bitki hücresi tekrar su aldığında zarın çepere yaklaşmasına deplazmoliz denir. Modelde çeperin çizimi sabit tutulurken içteki zarın konumu bu farkı görünür kılar.",
      "Hipotonik ortamda su hayvan hücresine girer; aşırı alım hücre zarını parçalayabilir. Genel ad lizistir; alyuvar parçalanmasına özel olarak hemoliz denir. Bitki hücresinde sağlam çeper karşı basınç oluşturarak turgoru destekler; tipik koşulda alyuvar gibi patlama beklenmez. İzotonik ortamda net su değişimi yaklaşık sıfır olabilir fakat moleküler geçiş sürer; bitki için bu durum mutlaka en dik ve en turgorlu durum değildir.",
    ),
    section(
      "Basınç farkı ozmotik eğilime karşı koyabilir",
      "Osmotik basınç, belirtilen çözelti koşullarında net ozmotik su girişini dengeleyecek basınç farkıyla ilişkilidir. Bitki hücresindeki turgor basıncı su girişine karşı koyabilir. ‘Su her koşulda yalnız çözüneni daha çok tarafa gider’ kuralı bu karşı basıncı yok sayar. Eşit sıcaklıkta ideal seyreltik çözelti için su potansiyelinde çözünen etkisi ile basınç etkisi birlikte değerlendirilir.",
      "Su modelinde içe sürücü etki = iç çözünen − dış çözünen − iç basınç farkı biçiminde normalize edilir. İç 3, dış 1 ve basınç 0 için içe eğilim vardır; basınç 2 bu farkı dengeler, daha büyük karşı basınç yönü ters çevirebilir. Bunlar Pa veya mol/L ölçümü değil aynı ölçeğe getirilmiş öğretim birimleridir. Turgor ve osmotik basınç bütün farklı hücreler arasında evrensel bir ters orantı yasası değildir; izotonik demek de her hücrede iki basıncın zorunlu eşitliği demek değildir.",
    ),
    section(
      "Büyük yükü vezikülle taşı: endositoz ve ekzositoz",
      "Endositozda zar içeri çökerek hücre dışındaki yükü veziküle alır. Katı büyük parçacığın alınması fagositoz, sıvı ve beraberindeki çözünmüş yükün küçük keselerle alınması pinositoz bağlamında incelenir. Akyuvarın bir bakteriyi yutması küçük iyonun kanaldan geçişi değildir. Vezikül oluşumu ve hücresel düzenleme enerji gerektirir; yön yalnız derişim farkıyla seçilmez.",
      "Ekzositozda salgı vezikülünün zarı hücre zarıyla birleşir ve içerik dışarı çıkar. Örneğin salgı proteinleri bu yolla verilebilir. Tek bir endositoz olayında yüzeyden zar ayrılırken ekzositoz yüzeye zar ekler; gerçek hücre iki süreci dengelediğinden yüzeyin sonsuza dek büyüyüp küçüldüğü çıkarılamaz. Sert çeper büyük parçayı yalancı ayakla sarmayı sınırlar; bitki ve mantarlarda hiçbir endositoz türü olamaz diye evrensel yasak kurulmaz. Prokaryotların salgı yolları da ökaryot vezikül sistemiyle aynı kabul edilmez.",
    ),
    section(
      "Diyalizde zarı ve her maddeyi ayrı takip et",
      "Bir zar üre gibi küçük bir atığı geçirip kan hücreleri ve büyük proteinleri tutuyorsa, atığın iki taraf arasındaki derişim farkı pasif net geçişi belirler. Diyaliz sıvısının uygun bileşimde tutulması ve yenilenmesi bu farkı sürdürür. Üre iki tarafta aynı derişime yaklaşınca net uzaklaştırma yavaşlayabilir; zarın varlığı tek başına sınırsız temizleme sağlamaz.",
      "Diyaliz cihazının kanı dolaştırmak için enerji kullanması, ürenin zardan aktif taşındığını göstermez. Makinenin işi ile zar üzerinden taneciğin geçiş mekanizması farklı düzeylerdir. Su da basınç ve ozmotik koşullara göre değişebilir; bu derste küçük çözünenin difüzyonunu suyun filtrasyonuyla bir tutmuyoruz. Bir madde zarı geçemiyorsa yüksek derişim farkına rağmen o madde için net difüzyon çizme.",
    ),
    section(
      "Soruyu üç kanıtla çöz ve karşı örnekle denetle",
      "İlk olarak neyin taşındığını yaz: su, küçük çözünmüş madde veya büyük parçacık. Sonra zarın o maddeye geçirgenliğini ve uygun proteini belirle. Üçüncü adımda iç/dış derişimleri, varsa elektriksel veya basınç koşulunu karşılaştır. Protein, ATP, vezikül ve yön bilgilerini birlikte tart; yalnız bir anahtar kelimeye göre seçenek seçme. ‘Protein kullanıldı’ bilgisi hem kolaylaştırılmış difüzyona hem pompaya uyabilir.",
      "Kontrollü deneyde geçirgenliği değiştirirken başlangıç derişimi ve sıcaklığı sabit tut. Birim zamanda geçen miktarı karşılaştırıyorsan eşit süre ve yüzey şartını ara. Modeldeki bir adım gerçek saniye değildir; eşit hacimli iki bölmede sayısal korunumu ve yönü görmen içindir. Yanlış genellemeyi karşı örnekle onar: protein + ATP yok için kolaylaştırılmış difüzyon, hipotonik ama sağlam kalan hücre için çeperli bitki. Sonucu başka bir maddeye aktarırken yeni geçirgenlik koşulunu yeniden kontrol et.",
    ),
  ],
  examples: [
    example(
      "İki bölmede maddeyi koru",
      "Eşit ve sabit hacimli iki bölmede O₂ derişimleri dışta 8, içte 2 model birimidir. Elektriksel etki yok, uygun yol açık. Bir model adımı dıştan içe 1 birim aktarırsa yeni derişimler ve toplam ne olur?",
      "Önce net yönü belirle; verenden çıkarıp alana aynı miktarı ekle.",
      [
        [
          "Yön",
          "O₂ küçük apolar örnektir; uygun yolda pasif net geçiş 8’den 2’ye olur.",
          "8 > 2",
        ],
        [
          "İki tarafı güncelle",
          "Dış bölme 1 birim kaybeder; eşit hacimli iç bölme aynı 1 birimi kazanır.",
          "Dış:8−1=7; iç:2+1=3",
        ],
        [
          "Korunumu denetle",
          "Toplam başlangıçta ve sonda 10’dur. Model gerçek süre veya hücrenin oksijen tüketimini içermez.",
          "8+2=7+3=10",
        ],
      ],
      "Dış7, iç3; toplam10.",
      "Dengeye yaklaşılmıştır; fark 6’dan 4’e indi.",
      "Yalnız içi artırıp dışı sabit bırakmak kapalı iki bölmede madde yaratır.",
    ),
    example(
      "Protein mi, ATP mi?",
      "Na⁺ için zar potansiyeli sıfır kabul ediliyor. Hücre içi 2, dışı 8 birimdir. Uygun pompa Na⁺’u içten dışa taşıyor; ATP kesilince geçiş duruyor. Bu olay neden basit veya kolaylaştırılmış difüzyon değildir?",
      "Maddeyi, yönü ve enerji deneyini ayrı kanıt yap.",
      [
        [
          "Gradyan",
          "İçten dışa 2’den 8’e taşınma derişim farkına karşıdır.",
          "2 → 8",
        ],
        [
          "Enerji",
          "ATP kesilmesi seçilmiş pompayı durdurur; bu yol ATP kullanır.",
          "ATP + uygun pompa",
        ],
        [
          "Alternatifleri ele",
          "Basit difüzyon protein istemez; kolaylaştırılmış difüzyon bu koşulda net 8’den 2’ye olurdu. Vezikül bilgisi de yoktur.",
          "Aktif taşıma",
        ],
      ],
      "ATP kullanan aktif pompa taşıması.",
      "Hücre dışına doğru olması onu pasif yapmaz.",
      "Yalnız ‘protein var’ diyerek karar verme; kolaylaştırılmış difüzyonda da protein vardır.",
    ),
    example(
      "Su aynı yönde, sonuç farklı",
      "Alyuvar ile sağlam çeperli bir bitki hücresinin içindeki geçemeyen çözünen derişimi 3 birim, dış ortam 1 birimdir. Başlangıç basınç farkı yok ve iki zar da suyu geçiriyor. Başlangıç su yönü ve olası hücre sonuçlarını karşılaştır.",
      "Önce iki hücreye ortak su yönünü, sonra çeper farkını kullan.",
      [
        [
          "Ortam",
          "Dışarıdaki geçemeyen çözünen daha azdır; dış ortam iki hücreye göre hipotoniktir.",
          "1 < 3",
        ],
        [
          "Su yönü",
          "Eşit başlangıç basıncında net su dıştan içe geçer.",
          "Dış → iç",
        ],
        [
          "Yapısal fark",
          "Alyuvarda aşırı su alımı hemolize yol açabilir. Bitkide çeper karşı basınç oluşturarak turgoru destekler; çeper su geçişini tamamen kapatan bir zar değildir.",
          "Alyuvar:lizis riski; bitki:turgor",
        ],
      ],
      "İkisine de başlangıçta su girer; alyuvar ve bitki aynı mekanik sonucu vermez.",
      "Bitkide basınç yükselmesi daha sonra net su girişini dengeleyebilir.",
      "Her hayvan hücresi parçalanmasına hemoliz deme; bu ad alyuvar için özeldir.",
    ),
    example(
      "Geçen ile geçmeyeni ayır",
      "A ve B kapları seçici zarla ayrılmıştır. A’da üre 6, B’de üre 1 birimdir. Zar üre ve suyu geçiriyor; büyük proteini geçirmiyor. İki taraftaki basınç eşit ve sıcaklık sabitken ürenin ilk net yönü nedir? Proteinin geçmemesi üreyi de durdurur mu?",
      "Her maddenin geçirgenliğini ayrı listele.",
      [
        [
          "Yol",
          "Üre zardan geçebilir; protein geçemez. Birinin engellenmesi diğerinin yolunu otomatik kapatmaz.",
          "Üre:açık; protein:kapalı",
        ],
        [
          "Gradyan",
          "Üre için derişim farkı A’dan B’ye net akış verir.",
          "6 → 1",
        ],
        [
          "Sınır",
          "Bu veriyle ürenin yönü bulunur. Suyun kesin toplam hareketi ve son hacimler için diğer çözünenler ve basınç değişimleri gerekir.",
          "Üre:A → B",
        ],
      ],
      "Üre A’dan B’ye difüze olur; protein zarı geçmez.",
      "ATP kullanımı veya vezikül gerektiren bir kanıt verilmemiştir.",
      "Sorulmayan su yönünü yalnız ürenin yönüyle aynı ilan etme.",
    ),
  ],
  recall: [
    {
      prompt: "Kanal proteini gördüğünde neden hemen aktif taşıma demiyorsun?",
      answer:
        "Protein hem pasif kolaylaştırılmış difüzyonda hem aktif taşımada olabilir. Net yönü ve enerji kullanımını ayrıca kontrol ederim.",
    },
    {
      prompt: "Dengeye ulaşan çözünenlerin hareketi tamamen durur mu?",
      answer:
        "Hayır; iki yönlü rastgele geçiş sürebilir, yalnız net fark sıfırdır.",
    },
    {
      prompt:
        "Ozmotik su yönünü derişimle bulmadan önce hangi koşulları yazarsın?",
      answer:
        "Zar suyu geçirmeli; karşılaştırılan çözünenlerin geçirgenliği ve sıcaklık/basınç koşulları belirtilmelidir. Karşı basınç ozmotik eğilimi dengeleyebilir.",
    },
    {
      prompt: "Hipertonik ortamda bitki çeperi mi küçülür?",
      answer:
        "Hayır; protoplast su kaybedip çeperden uzaklaşabilir. Çeperin dış sınırı korunur; bu görünüm plazmolizdir.",
    },
    {
      prompt:
        "Ekzositoz ile küçük bir iyonun aktif taşınmasının ortak ve farklı yanı ne?",
      answer:
        "İkisi enerjiye bağlı olabilir; ekzositoz vezikül-zar birleşmesiyle büyük yükü dışarı verir, iyon pompası küçük maddeyi uygun protein yoluyla taşır.",
    },
  ],
  source:
    "MEBİ TYT Biyoloji Konu Özetleri PDF 66–73 / basılı 64–71; Aurelia Hücre Zarında Madde Alışverişleri kopya kağıdı PDF 1–12 doğrudan karşılaştırıldı. Diyagramlar, model ve sorular özgündür. Kaynaktaki iyon yükü, izotonik basınç ve hayvan hücresinde hemoliz genellemeleri koşullarıyla netleştirildi; atıf yapılan diğer kitap ve ÖSYM maddeleri ayrıca doğrulanmış sayılmaz.",
};

const classificationGuide: LessonGuide = {
  id: "canlilarin-siniflandirilmasi",
  minutes: 70,
  objectives: [
    "Takson, kategori ve evrimsel akrabalığı farklı kavramlar olarak kullan.",
    "Ağaçta ortak atayı ve kanıtın yetmediği dallanmaları belirle.",
    "Homoloji ile analojiyi karşılaştırılan özellik düzeyinde ayır.",
    "Geçerli gerçek tür örnekleriyle ikili adı ve hiyerarşik kapsama kuralını uygula.",
  ],
  sections: [
    section(
      "Çeşitliliği düzenlemek, akrabalığı açıklamak",
      "Taksonomi canlıların tanımlanması, adlandırılması ve sınıflandırılmasıyla ilgilenir; sistematik bu çeşitliliği evrimsel ilişkilerle birlikte inceler. Ortak bir adlandırma düzeni, araştırmacıların aynı canlıyı farklı yerel adlarla karıştırmasını azaltır. Bir takson adını öğrenmek, o grubun üyeleri ve ilişkileri hakkında bilgiye ulaşmanın başlangıcıdır; yalnız isim listesi ezberlemek değildir.",
      "Tarihsel sınıflandırmalar dış görünüş veya yaşam ortamını öne çıkarabiliyordu. Suda yaşamak balıkla balinayı aynı yakın gruba yerleştirmeye yetmez. Modern sınıflandırmada anatomi, gelişim, biyokimya ve uygun moleküler diziler birlikte değerlendirilir. Aristo, John Ray ve Linnaeus tarihsel sürecin farklı örnekleridir; bir kişinin adı tek başına güncel bir akrabalık iddiasının kanıtı olmaz.",
    ),
    section(
      "Ortak bir özellik her dalı çözmez",
      "İki canlının ökaryot olması gerçek bir ortaklıktır; fakat bu çok geniş özellik kedi, güvercin ve kertenkelenin hangilerinin daha yakın ortak atayı paylaştığını tek başına belirlemez. Kanıtın doğruluğu ile ayırt etme gücü farklıdır. Gruptaki bütün canlıların taşıdığı bir karakter, o grup içinde daha dar bir alt grup seçtirmeyebilir.",
      "Paylaşılan türemiş karakterler belirli bir soyun ortak kökenini anlamada değerlidir. Amniyon gibi bir özellik seçilmiş örnekte memeli, sürüngen ve kuşları amniyot çerçevesinde bir araya getirir; bu tek özellik üçünün kendi içindeki her dallanmayı çözmez. Modelde yalnız hücre bilgisi, yapısal karakterler ve ek dizi karakterleri ayrı veri paketleridir. Yeni kanıt ağacın çözünürlüğünü değiştirir; canlıların geçmişini seçimle değiştirmiyoruz.",
    ),
    section(
      "Homolog mu, analog mu? Önce karşılaştırılan düzeyi söyle",
      "Homolog yapılar ortak kökene dayanır; görevlerinin aynı olması gerekmez. İnsan kolu, balinanın ön yüzgeci ve yarasanın ön üyesi temel kemik planı açısından ortak tetrapod ön üyesinin dönüşümleridir. Tutmak, yüzmek ve uçmak farklı görevler olsa da bu köken benzerliğini ortadan kaldırmaz. İç yapı ve gelişim kanıtı, yalnız dış görünüşten daha açıklayıcıdır.",
      "Kuş ve böcek kanadı uçuş işlevinde benzerdir fakat aynı atasal kanadın aynı yapısal dönüşümü değildir; bu düzeyde analoji örneğidir. Kuş ile yarasanın ön üyeleri kemik planı açısından homologken uçuşa özelleşmiş kanatlarının bazı özellikleri bağımsız gelişmiştir. Bu yüzden bütün bir organa bağlamdan bağımsız tek etiket yapıştırma: sorunun kökeni mi, işlevi mi, hangi yapısal parçayı mı karşılaştırdığını belirt.",
    ),
    section(
      "Soy ağacını merdiven gibi okuma",
      "Filogenetik ağaçta bir düğüm ortak atayı, dallar soyların ayrılmasını temsil eder. İki ucun çizimde yan yana durması yakın akrabalığı kanıtlamaz; paylaşılmış en yakın ortak düğümü bul. Bir düğüm çevresinde dalları döndürmek aynı ilişkiyi farklı görünüşle verebilir. Uçların hepsi günümüzde örneklenen canlılarsa yukarıda veya sağda çizilmek ‘daha gelişmiş’ olmak anlamına gelmez.",
      "Bir düğümden üç ya da daha fazla soy ayrılmış çizildiyse bu çoğu öğretim bağlamında iç sıranın eldeki kanıtla çözülmediğini gösterebilir. ‘Veri yetersiz’ ile ‘gerçekte eşit derecede akrabalar’ aynı iddia değildir. Modelde dal uzunlukları zaman veya değişim miktarı değildir. Oluşturulmuş kısa dizi verisi yalnız çıkarım mantığını göstermek içindir; gerçek türlerin ölçülmüş gen dizisi ve kapsamlı filogenetik analizi diye sunulmaz.",
    ),
    section(
      "Basamak başka, takson başka",
      "Üst âlem, âlem, şube/bölüm, sınıf, takım, familya, cins ve tür hiyerarşik kategori adlarıdır. Mammalia belirli bir sınıf taksonudur; ‘sınıf’ ise onun derecesidir. Bir tür bir cinsin, o cins bir familyanın içindedir. Aynı cinsteki iki tür bu cinsin bağlı olduğu üst taksonları paylaşır; aynı familyada bulunmak aynı cinste bulunmayı zorunlu yapmaz.",
      "Geniş gruptan dar gruba gidildikçe kapsanan çeşitlilik genellikle azalır ve üyelerin paylaştığı özellikler artar. Belirli bir takımın kaç tür içerdiği sabit bir kota değildir. Bu yön kuralı kromozom sayısını, bütün DNA dizilerinin aynılığını veya birey sayısının her doğa anında belli oranda değişmesini garanti etmez. Hiyerarşi kapsama ilişkisini, moleküler karşılaştırma ise akrabalık kanıtını açıklar; biri ötekinin bütün ayrıntılarını vermez.",
      {
        headers: ["Genişten dara", "Örnek aslan taksonu"],
        rows: [
          ["Üst âlem", "Eukarya"],
          ["Âlem", "Animalia"],
          ["Şube", "Chordata"],
          ["Sınıf", "Mammalia"],
          ["Takım", "Carnivora"],
          ["Familya", "Felidae"],
          ["Cins", "Panthera"],
          ["Tür", "Panthera leo"],
        ],
      },
    ),
    section(
      "Tür ölçütünü verilen canlıya göre kullan",
      "Biyolojik tür yaklaşımı doğal koşullarda birbiriyle çiftleşerek verimli döl oluşturabilen ve diğer topluluklardan üreme açısından ayrılan popülasyonları ele alır. Tek bir bireyin üreyememesi onu türün dışına çıkarmaz; yaş, cinsiyet veya bireysel durum üremeyi etkileyebilir. Benzer görünüş de tek başına aynı türü kanıtlamaz.",
      "Eşeysiz canlılarda veya fosillerde çiftleşme deneyi doğrudan uygulanamaz; morfolojik, ekolojik ve moleküler başka ölçütler gerekir. Türler arası melezler ve doğadaki üreme sınırları da her örnekte tek cümlelik mutlak kuralı zorlaştırabilir. Soru temel biyolojik tür ölçütünü veriyorsa o koşulla çöz; bütün canlılar için yalnız bu ölçüt kullanılabilir diye genelleme yapma. Kromozom sayısı aynı olan farklı türler bulunabilir; sayı eşitliği aynı tür veya yakın akrabalık belgesi değildir.",
    ),
    section(
      "İkili ad iki sözcükle bir bütündür",
      "Bilimsel tür adında ilk sözcük cins adı, ikinci sözcük türü niteleyen tamamlayıcı addır. Cins büyük harfle başlar; tamamlayıcı ad küçük harfle yazılır. İkisi birlikte italik basılır; el yazısında ayrı ayrı altları çizilebilir. Adlar Latince veya Latinceleştirilmiş kurallarla kurulur. Homo tek başına cins, sapiens tek başına bu bağlamda tamamlayıcı ad, Homo sapiens ise ikili tür adıdır.",
      "Panthera leo ile Panthera tigris aynı cinsteki farklı tür adlarıdır. Passer domesticus ile Acheta domesticus adlarında ikinci sözcük aynı olsa da cinsler ve türler farklıdır; biri kuş, diğeri böcektir. Kısaltılmış H. sapiens biçimi, cins daha önce açıkça belirtildiyse bağlamda anlaşılabilir. Model güncel ve bilinen örnekleri kullanır; yalnız kelime oyununa uygun olsun diye yeni bir cins-tür birleşimi gerçek canlı adı olarak uydurulmaz.",
    ),
    section(
      "Üç üst âlem yalnız hücre şekliyle ayrılmaz",
      "Temel üç üst âlem çerçevesi Bacteria, Archaea ve Eukarya’dır. Bakteriler ve arkeler zarla çevrili çekirdek taşımayan prokaryot hücre düzenine sahiptir; buna rağmen moleküler ve biyokimyasal özellikleri bakımından ayrılırlar. ‘Prokaryot olanların hepsi aynı üst âlemdedir’ çıkarımı bu nedenle yanlıştır. Eukarya ise ökaryot soyları kapsar.",
      "Üç üst âlemi bir hücrenin yalnız büyüklüğünden veya yaşadığı yerden kesin belirleme. Tek hücreli ökaryotlar vardır; bütün tek hücreliler prokaryot değildir. Bir organizmanın ökaryot olması her özelleşmiş hücresinde mutlaka çekirdek görüneceği anlamına da gelmez; olgun memeli alyuvarı gibi istisnalar bulunur. Burada sınıflandırma çerçevesi öğrenilir; her âlemin ayrıntılı özellikleri ve virüslerin konumu ayrı ünitelerde genişletilir.",
    ),
    section(
      "DNA benzerliğini hizalama ve kapsamla yorumla",
      "Moleküler karşılaştırmada karşılık gelen yani homolog dizi bölgeleri uygun biçimde hizalanır. Aynı konumdaki farklı bazlar sayılabilir; ancak rastgele seçilmiş veya çok kısa iki parçanın yüzdesinden bütün evrimsel geçmiş kesinleştirilemez. Seçilmiş genlerin hızları, örnekleme ve kullanılan çıkarım yöntemi sonucu etkiler. Birden fazla bağımsız kanıtın uyumu önemlidir.",
      "Atölyedeki altı bazlık diziler açıklama için oluşturulmuştur. Kertenkele GGCCGA ile güvercin GGCCGG arasında bir, kedi GGCCTT ile bu ikisinin her biri arasında iki farklı konum vardır. Bu paket seçilmiş basit ağaçla uyumludur; gerçek hayvanların genomlarının bu altı bazdan oluştuğu veya gerçek ölçüm yapıldığı iddia edilmez. Ayrıca en az fark her koşulda tek başına doğru ağacı garanti eden evrensel algoritma değildir; burada yapılandırılmış örnek üzerinde kanıtın ayırt etme gücü gösterilir.",
    ),
    section(
      "Kesinlik sözcüğünü kanıtla sınırla",
      "Aynı cins bilgisinden aynı familyayı çıkarabilirsin; aynı kromozom sayısını veya aynı yaşam alanını otomatik çıkaramazsın. Aynı görev bilgisinden homolog köken sonucu da zorunlu değildir. Bir önermedeki ‘hepsi’, ‘mutlaka’ veya ‘kesinlikle’ sözcüğünü görünce iddianın koşullarını taşıyan karşı örnek ara. Yalnız uygun karşı örnek ilgili genellemeyi çürütür; sorudaki bütün diğer öncülleri kendiliğinden yanlış yapmaz.",
      "Çözüm sonunda hangi basamağı, hangi özellik düzeyini ve hangi canlı kümesini kullandığını bir cümleyle yaz. Ağacın dışındaki bilinmeyen türler hakkında ek sonuç uydurma. Model seçimleri ve gerekçen çalışma notudur; keşifte doğru yönü seçmek bağımsız soru doğrusu, ustalık veya konu tamamlanması olarak kaydedilmez. Konuyu öğrendiğini sınamak için açıklamayı kapatıp yeni bir canlı çiftiyle aynı kapsama ve kanıt kurallarını yeniden uygula.",
    ),
  ],
  examples: [
    example(
      "Aynı cins neyi zorunlu kılar?",
      "Panthera leo ve Panthera tigris farklı tür adlarıdır. Verilen cins bilgisiyle hangi ortak üst basamak kesin çıkar; kromozom sayılarının eşitliği çıkar mı?",
      "İlk sözcükleri karşılaştır; hiyerarşide yukarı git, verilmemiş nicelik ekleme.",
      [
        [
          "Cinsi bul",
          "İlk sözcük iki adda da Panthera’dır; cins ortaktır.",
          "Panthera = Panthera",
        ],
        [
          "Kapsamı kullan",
          "Aynı cinsin üyeleri aynı familya ve onun üst taksonları içindedir.",
          "Cins ⊂ familya",
        ],
        [
          "Kesinliği sınırla",
          "İkinci sözcükler farklı tür adlarını gösterir. Cins ortaklığı kromozom sayısını veya bütün DNA’nın aynı olmasını zorunlu kılmaz.",
          "Sayı eşitliği çıkarılamaz",
        ],
      ],
      "Aynı familya ve üst taksonlar; kromozom sayısı için ek veri gerekir.",
      "Aynı familyadan aynı cinse ters çıkarım yapılamaz.",
      "Yakınlığı kromozom sayısı eşitliğine dönüştürme.",
    ),
    example(
      "Aynı ikinci sözcük tuzağı",
      "Passer domesticus bayağı serçeyi, Acheta domesticus ev cırcır böceğini adlandırıyor. Bu iki ad aynı türü veya aynı cinsi gösterir mi?",
      "İkili adı cins ve tamamlayıcı ad sütunlarına ayır.",
      [
        [
          "İlk sözcük",
          "Cins adları Passer ve Acheta’dır; farklıdır.",
          "Passer ≠ Acheta",
        ],
        [
          "İkinci sözcük",
          "domesticus iki farklı cinste tekrarlanabilir; tek başına tür adı değildir.",
          "Cins + domesticus",
        ],
        [
          "Bütünü denetle",
          "İki sözcüğün bütünü farklı tür adlarıdır. İlk örnek kuş, ikinci örnek böcektir.",
          "İki farklı ikili ad",
        ],
      ],
      "Ne aynı cins ne aynı tür sonucu çıkar; burada iki farklı cins ve tür vardır.",
      "Modelde italik basılan bütün iki sözcüğü birlikte oku.",
      "Geçerli örneğin yerine uydurulmuş bir bilimsel ad oluşturma.",
    ),
    example(
      "Ortak özellik kanıtı yetmezse",
      "Sazan, kurbağa, kedi, kertenkele ve güvercinin ökaryot olduğu biliniyor. Bu tek veri kertenkeleyle güvercinin birbirine kediden daha yakın olduğunu kanıtlar mı?",
      "Özelliğin grupta kimi kimden ayırdığını sor.",
      [
        [
          "Ortak kümeyi bul",
          "Ökaryot hücre bilgisi beş örneğin tamamında ortaktır.",
          "5 örnekte aynı özellik",
        ],
        [
          "Ayırt etme gücü",
          "Bu ortaklık kedi, kertenkele ve güvercin arasında daha dar bir çift seçmez.",
          "İç dallanma belirsiz",
        ],
        [
          "Ek kanıt iste",
          "Karşılaştırılabilir anatomik/embriyolojik karakterler ve uygun moleküler diziler daha dar ilişkiyi desteklemelidir.",
          "Veri yetersiz",
        ],
      ],
      "Hayır; aynı hücre tipi bu karşılaştırmayı tek başına çözmez.",
      "Veri yetersizliği, gerçek akrabalıkların eşit olduğu iddiası değildir.",
      "Doğru ama çok geniş bir özelliği bütün sorulara yeterli kanıt sanma.",
    ),
    example(
      "Köken ve işlevi ayrı tart",
      "İnsan kolu ile yarasanın ön üyesinde aynı temel kemik planı bulunuyor; kuş ve böcek kanatları ise uçuşa hizmet ediyor fakat kökenleri farklı. Hangi karşılaştırma homoloji, hangisi analoji için uygundur?",
      "Önce karşılaştırılan yapı düzeyini, sonra köken ve işlev kanıtını yaz.",
      [
        [
          "Köken kanıtı",
          "İnsan ve yarasa ön üyelerindeki temel kemik planı ortak kökeni yansıtır.",
          "Ön üyeler:homolog",
        ],
        [
          "Görev benzerliği",
          "Kuş ve böcek kanatlarının aynı uçuş işi, aynı atasal kanattan geldiklerini göstermez.",
          "Uçuş kanadı:analog",
        ],
        [
          "Genelleme sınırı",
          "Kuş ve yarasa ön üyesi kemik planı ayrıca homolog olabilir; hangi düzeyin sorulduğunu değiştirmek etiketi de değiştirebilir.",
          "Düzeyi açık yaz",
        ],
      ],
      "Ön üye planı homoloji; bağımsız kökenli uçuş yapısı analoji.",
      "Görev aynı olmak zorunda olmadığı gibi görev eşitliği de kökeni kanıtlamaz.",
      "Bütün bir organa karşılaştırma ölçütünü söylemeden mutlak etiket verme.",
    ),
  ],
  recall: [
    {
      prompt:
        "Aynı familyadaki iki canlının neden aynı cinste olması gerekmez?",
      answer:
        "Familya birden fazla cins içerebilen üst gruptur. Aynı alt takson üstleri kapsar; ters yön aynı dar taksonu garanti etmez.",
    },
    {
      prompt:
        "Sadece ökaryot olduklarını bilmek neden üç amniyotun iç ağacını çözmez?",
      answer:
        "Bu özellik hepsinde vardır ve daha dar bir çift seçmez. Ayırt edici ek karakter ve moleküler kanıt gerekir.",
    },
    {
      prompt: "domesticus tek başına neden bilimsel tür adı değildir?",
      answer:
        "Tamamlayıcı addır; farklı cinslerde tekrarlanabilir. Cins ile birlikte iki sözcük tür adını oluşturur.",
    },
    {
      prompt: "Bir dalın solda veya yukarıda olması neyi göstermez?",
      answer:
        "Tek başına daha ilkel/gelişmiş olmayı, yaşını veya yakın akrabalığı göstermez. Ortak düğümler ve açıklanmış dal ölçeği gerekir.",
    },
    {
      prompt:
        "Aynı kromozom sayısını ortak atanın yakınlığı yerine kullanabilir misin?",
      answer:
        "Hayır; farklı türlerde sayı eşit olabilir ve yakın türlerde değişebilir. Karşılaştırılabilir dizi ve köken kanıtları birlikte değerlendirilir.",
    },
  ],
  source:
    "MEBİ TYT Biyoloji Konu Özetleri PDF 75–78 / basılı 73–76; Aurelia Canlıların Sınıflandırılması kopya kağıdı PDF 1–10 doğrudan okundu. Öğretim dizileri oluşturulmuş örnektir, gerçek gen verisi değildir. Geçerli bilinen ikili adlar kullanılır; kaynak içindeki tarihsel/temsili adlar güncel bağımsız tür kanıtı sayılmaz. Özgün açıklamalar ve sorular resmî ÖSYM maddesi değildir.",
};

const membraneQuestions = [
  question(
    "f093-membrane-1",
    "O₂ derişimi hücre dışında 8, içinde 2 birimdir. Zar O₂’yi geçiriyor; sıcaklık sabit ve elektriksel etki ihmal ediliyor. Protein veya ATP kullanımı olmayan ilk net O₂ geçişi hangisidir?",
    [
      "Dıştan içe basit difüzyon",
      "İçten dışa aktif taşıma",
      "Dıştan içe fagositoz",
      "İçten dışa ozmoz",
      "Derişim farkına rağmen hiçbir koşulda geçiş olmaz",
    ],
    0,
    "Taşınan su değil O₂; geçebilir apolar küçük molekülün gradyanını izle.",
    "O₂ için 8’den 2’ye, dıştan içe basit difüzyon beklenir. Aktif taşıma için enerji ve uygun pompa kanıtı yoktur. Fagositoz büyük parçacık/vezikül yoludur. Ozmoz suyun geçişidir. Zarın O₂’yi geçirdiği verildiğinden son seçenek de yanlıştır.",
    "basit-difuzyon",
  ),
  question(
    "f093-membrane-2",
    "Glikoz dışta 6, içte 2 birimken uygun taşıyıcı üzerinden hücreye net geçiyor. Doğrudan ATP tüketilmiyor ve deney boyunca başlangıç gradyanı korunuyor. Bu gözlemin doğru yorumu hangisidir?",
    [
      "Protein varsa mutlaka aktif taşımadır",
      "Kolaylaştırılmış difüzyonla uyumludur",
      "Büyük parçacığın fagositozudur",
      "Su aktif olarak pompalanmıştır",
      "Net yön azdan çoğadır",
    ],
    1,
    "Protein kullanımıyla enerji kullanımını ayrı kanıt olarak değerlendir.",
    "Glikozun 6’dan 2’ye uygun proteinle ve doğrudan ATP olmadan geçişi kolaylaştırılmış difüzyonla uyumludur. Protein tek başına aktif taşıma kanıtı değildir. Glikoz için vezikül veya su taşıması verilmemiştir. Net yön çoktan azadır; azdan çoğa değildir.",
    "kolaylastirilmis-difuzyon",
  ),
  question(
    "f093-membrane-3",
    "Na⁺ için zar potansiyeli sıfır kabul ediliyor. Hücre içinde 2, dışında 8 birim Na⁺ varken iyon uygun pompayla içten dışa taşınıyor. ATP kesilince bu pompa duruyor. Hangisi doğrudur?",
    [
      "Yön hücre dışına olduğu için mutlaka pasiftir",
      "Na⁺ büyük protein olduğu için ekzositozdur",
      "ATP kullanan, derişim gradyanına karşı taşıma vardır",
      "Bu geçiş yalnız su hareketidir",
      "ATP’nin varlığı pompa proteini olmasa da yeterlidir",
    ],
    2,
    "2’den 8’e geçişin gradyana göre yönünü yaz.",
    "Verilen sıfır potansiyel koşulunda 2’den 8’e çıkış derişim gradyanına karşıdır; ATP bağımlı uygun pompa aktif taşımayı destekler. Hücre dışı yön pasiflik ölçütü değildir. Na⁺ küçük iyondur, vezikül kanıtı yoktur. Ozmoz su içindir. ATP tek başına seçici protein yolu oluşturmaz.",
    "aktif-tasima",
  ),
  question(
    "f093-membrane-4",
    "Eşit sabit hacimli iki bölmede geçen X maddesi başlangıçta dışta 8, içte 2 derişim birimindedir. Kapalı sistemde tek bir adımda dıştan içe 1 birim X aktarılıyor; üretim ve tüketim yoktur. Yeni dış/iç değerleri hangisidir?",
    ["8 ve3", "9 ve1", "7 ve2", "7 ve3", "6 ve6"],
    3,
    "Bir bölmenin kaybı diğerinin kazancı olmalı.",
    "Dış 8−1=7, iç 2+1=3 olur; toplam 10 korunur.8/3 madde yaratır;9/1 ters yönde aktarımı gösterir;7/2 madde kaybettirir.6/6 toplam 12 olduğu için korunumla çelişir. Verilen eşit sabit hacim koşulu, bu sayısal güncellemeyi geçerli kılar.",
    "madde-korunumu",
  ),
  question(
    "f093-membrane-5",
    "Bir hayvan hücresinin geçemeyen çözünen derişimi 3, dış ortamınki 1 model birimidir. Zar suyu geçiriyor; sıcaklık ve başlangıç basıncı eşittir. İlk net su yönü ve aşırı su alımında olası sonuç hangisidir?",
    [
      "Su dışarı; turgor",
      "Su dışarı; bitki plazmolizi",
      "Net su yok; bütün moleküller durur",
      "Çözünen içeri; fagositoz",
      "Su içeri; şişme ve lizis riski",
    ],
    4,
    "Dış ortam hücreye göre hipotoniktir; hayvan hücresinde çeper yoktur.",
    "Bu koşullarda su düşük geçemeyen çözünen derişiminden yükseğe, hücre içine net geçer. Hayvan hücresi şişebilir; aşırı alımda lizis mümkündür. Turgor/bitki plazmolizi çeperli hücre bağlamında ayrılır. Net sıfır ve hareketin durması söylenemez. Ozmozda izlenen şey çözünen değil sudur.",
    "ozmoz-hayvan",
  ),
  question(
    "f093-membrane-6",
    "Sağlam çeperli bir bitki hücresi kendisine göre hipertonik ortama bırakılıyor. Zar suyu geçiriyor; başka etki ihmal ediliyor. Plazmolizle uyumlu görünüm hangisidir?",
    [
      "Çeperin bütünü küçülür, zar çepere daha çok dayanır",
      "Protoplast su kaybeder; zar çeperden uzaklaşır",
      "Su girer ve alyuvar hemolizi gerçekleşir",
      "Geçemeyen çözünen zarın içinden hızla dışarı çıkar",
      "ATP olmadan hiçbir su hareketi gerçekleşmez",
    ],
    1,
    "Sert çeperle içteki zar/protoplastın sınırlarını ayrı çiz.",
    "Hipertonik ortamda su kaybı protoplastı küçültebilir ve zar çeperden uzaklaşır. Çeperin dış sınırının aynı şekilde küçülmesi plazmolizin açıklaması değildir. İçeri su ve hemoliz bu bitki örneğine uymaz. Geçemeyen çözünen için yol varsayılamaz. Ozmoz doğrudan ATP gerektirmez.",
    "plazmoliz",
  ),
  question(
    "f093-membrane-7",
    "İdeal bir su modelinde iç çözünen 3, dış çözünen 1, iç karşı basınç 2 ortak öğretim birimidir. Suya geçirgen zarda içe sürücü etki ‘iç−dış−basınç’ olarak tanımlanıyor. Model ne öngörür?",
    [
      "Sürücü etki 6; zorunlu içe akış",
      "Sürücü etki 4; zorunlu dışa akış",
      "Su her koşulda yalnız çözüneni çok tarafa gider",
      "Sürücü etki 0; bu koşulda net su akışı dengelenir",
      "Suyun moleküler hareketi tamamen yok olur",
    ],
    3,
    "Tanımlanan etkiyi verilen üç sayıyla hesapla.",
    "3−1−2=0; karşı basınç ozmotik eğilimi dengeler. İlk iki seçenek yanlış işlemdir. Üçüncü seçenek basıncı yok sayan bir genellemedir. Net sıfır, su moleküllerinin tamamen hareketsiz olduğu anlamına gelmez. Verilen model birimleri gerçek basınç ölçümü değildir.",
    "ozmotik-basinc",
  ),
  question(
    "f093-membrane-8",
    "Bir akyuvar büyük bir bakteriyi zarla çevrili keseye alıyor. Başka bir ökaryot salgı hücresinde protein içeren vezikül hücre zarıyla birleşip içeriğini dışarı veriyor. Bu iki olay sırasıyla hangileridir?",
    [
      "Fagositoz ve ekzositoz",
      "Basit difüzyon ve ozmoz",
      "Aktif iyon pompası ve basit difüzyon",
      "Ekzositoz ve fagositoz",
      "Ozmoz ve pinositoz",
    ],
    0,
    "Büyük katı parçacığın içeri alınmasıyla salgı kesesinin dışarı açılmasını ayır.",
    "Bakterinin büyük katı yük olarak keseye alınması fagositoz; salgı vezikülünün zarla birleşmesi ekzositozdur. Basit difüzyon/ozmoz bu vezikül hareketlerini açıklamaz. İyon pompası küçük madde yoludur. Ters sıra yönleri ters okur. Pinositoz sıvı ve beraberindeki yükün içeri alınması bağlamındadır.",
    "vezikuler-tasima",
  ),
  question(
    "f093-membrane-9",
    "Diyaliz zarından üre geçebiliyor, kan hücreleri geçemiyor. Başlangıçta üre kanda 6, diyaliz sıvısında 1 birimken, bir süre sonra sıvıda 5 birime çıkıyor; kan değeri bu karşılaştırmada 6’da tutuluyor. Net üre geçişinin azalmasını hangisi açıklar?",
    [
      "Kan hücreleri de zardan geçmeye başlamıştır",
      "Üre artık su molekülüne dönüşmüştür",
      "Bütün difüzyonlar ATP azalınca durur",
      "Diyaliz zarı her maddeyi aynı ölçüde geçirir",
      "Üre için derişim farkı 5’ten 1’e küçülmüştür",
    ],
    4,
    "Aynı üre için iki başlangıç farkını karşılaştır.",
    "İlk fark 6−1=5, sonraki fark 6−5=1’dir. Diğer koşullar aynıysa daha küçük itici fark net difüzyonu azaltır. Kan hücresinin geçmesi verilmemiş ve zarın tutma koşuluna aykırıdır. Üre suya dönüşmez. Pasif üre geçişini ATP kesilmesine bağlayan kanıt yoktur. Seçicilik bütün maddelerin aynı geçmesini gerektirmez.",
    "diyaliz",
  ),
  question(
    "f093-membrane-10",
    "Bir zar küçük X molekülünü başlangıçta geçirmiyor. X’in dış derişimi 10, iç derişimi 1 birim; sıcaklık sabittir. X’e uygun yeni bir pasif protein yolu açılıyor ve ATP kullanılmıyor. Diğer koşullar değişmezse doğru beklenti hangisidir?",
    [
      "Kapalı yol varken fark mutlaka X’i geçirirdi",
      "Yeni yol X’i 1’den 10’a enerji olmadan biriktirir",
      "Uygun yol açılınca X’in ilk net geçişi dıştan içe olabilir",
      "Protein eklenmesi her durumda endositozdur",
      "Protein eklenince tüm büyük proteinler de geçer",
    ],
    2,
    "Gradyan geçişe eğilim verir; fiilî geçiş için uygun yol da gerekir.",
    "Yeni uygun pasif yol,10’dan 1’e dıştan içe net geçişi mümkün kılar. Kapalı yol farkla otomatik açılmaz. Enerji olmadan gradyana karşı biriktirme bu koşuldan çıkmaz. Kanal/taşıyıcı ile vezikül farklıdır. X’e seçicilik tüm büyük moleküllere geçirgenlik anlamına gelmez.",
    "gecirgenlik-deneyi",
  ),
];

const classificationQuestions = [
  question(
    "f093-classification-1",
    "K ve L’nin aynı cinse ait farklı türler olduğu veriliyor. Yalnız bu bilgiye dayanarak hangisi kesinlikle ortaktır?",
    [
      "Yaşadıkları bütün ortamlar",
      "Kromozom sayıları",
      "Cinsin bağlı olduğu familya",
      "Bütün DNA dizileri",
      "Tamamlayıcı adları",
    ],
    2,
    "Cinsin üst basamağına git; verilmemiş nicelik ekleme.",
    "Aynı cins aynı familya ve üst taksonları kapsar. Yaşam ortamı, kromozom sayısı ve DNA’nın bütünü yalnız cins ortaklığıyla eşitlenmez. Farklı türlerin tamamlayıcı adları da aynı olmak zorunda değildir. Kapsama kuralı bir takson ilişkisi verir, bütün biyolojik özelliklerin aynılığını vermez.",
    "hiyerarsi",
  ),
  question(
    "f093-classification-2",
    "Panthera leo aslanı, Panthera tigris kaplanı adlandırıyor. Bu iki bilimsel adın doğru karşılaştırması hangisidir?",
    [
      "Aynı cins, farklı tür adlarıdır",
      "Farklı cins, aynı tür adlarıdır",
      "İkinci sözcükler tek başına cins adıdır",
      "İkisi de yalnız familya adıdır",
      "Aynı cins olmaları bütün kromozom sayılarını zorunlu eşit yapar",
    ],
    0,
    "İlk sözcük cinsi; iki sözcüğün bütünü tür adını verir.",
    "Panthera iki adda ortak cinstir; leo ve tigris tamamlayıcı adları farklı ikili tür adları oluşturur. Cins ilk sözcüktür; familya adı burada verilmemiştir. Kromozom sayısı eşitliği cins ortaklığının zorunlu sonucu değildir. Farklı tür adı, bu bağlamda aynı tür adıdır diye okunamaz.",
    "ikili-adlandirma",
  ),
  question(
    "f093-classification-3",
    "Passer domesticus bayağı serçenin, Acheta domesticus ev cırcır böceğinin bilimsel adıdır. ‘domesticus’ sözcüğünün ortak olması için hangi yorum geçerlidir?",
    [
      "Aynı cins olduklarını kanıtlar",
      "Aynı tür olduklarını kanıtlar",
      "Aynı kromozom sayısını zorunlu kılar",
      "Bütün genlerinin aynı olduğunu gösterir",
      "Tamamlayıcı ad farklı cinslerde tekrarlanabilir; tek başına türü belirlemez",
    ],
    4,
    "Cins adlarını gözden kaçırma.",
    "Passer ile Acheta farklı cinslerdir; domesticus farklı cinslerde kullanılabilen tamamlayıcı addır. Tür adı iki sözcüğün bütünüdür. Ortak ikinci sözcük aynı cins, aynı tür, aynı kromozom veya bütün genlerin aynılığı sonucunu vermez. Burada bilinen iki farklı hayvan örneği karşılaştırılır.",
    "tamamlayici-ad",
  ),
  question(
    "f093-classification-4",
    "Üst âlemden türe doğru gidilen sınıflandırma basamaklarında, genel kapsama eğilimi için hangisi uygundur?",
    [
      "Kapsanan çeşitlilik artar, ortak özellik azalır",
      "Kapsanan çeşitlilik azalır, ortak özellik genellikle artar",
      "Her basamak tam olarak 10 tür içerir",
      "Kromozom sayısı her basamakta yarıya iner",
      "Son basamakta bütün bireylerin DNA’sı zorunlu aynıdır",
    ],
    1,
    "Geniş gruptan dar alt gruba gidiliyor.",
    "Daha dar grup daha sınırlı çeşitliliği ve daha fazla ortak özelliği kapsar. Ters yön ilk seçeneği geçersiz kılar. Sabit tür kotası veya kromozomun yarılanması gibi bir kural yoktur. Aynı türde de bireysel genetik çeşitlilik bulunabilir; bütün DNA’nın aynılığı çıkmaz.",
    "basamak-yonu",
  ),
  question(
    "f093-classification-5",
    "Kuş ile böceğin kanadı uçuşta kullanılıyor; verilen anatomik ve gelişimsel inceleme kanatların farklı kökenlerden oluştuğunu gösteriyor. Yalnız uçuş yapıları düzeyinde doğru sınıflama hangisidir?",
    [
      "Aynı görev gördükleri için zorunlu homolog",
      "Aynı tür olmaları zorunlu",
      "Aynı cins olmaları zorunlu",
      "Analog işlevsel yapılar; görev benzerliği tek başına yakın akrabalık kanıtı değildir",
      "Farklı kökeni bilmek bütün ortak ataları reddetmeyi gerektirir",
    ],
    3,
    "İşlev benzerliğiyle aynı yapısal kökeni ayır.",
    "Verilen farklı köken ve ortak uçuş görevi analoji örneğidir. Görev aynılığı homolojiyi, aynı türü veya aynı cinsi zorunlu yapmaz. Belirli bir uçuş yapısının bağımsız gelişmesi, canlıların daha eski hiçbir ortak atası olmadığı anlamına da gelmez; iddianın düzeyini koru.",
    "analoji",
  ),
  question(
    "f093-classification-6",
    "İnsan kolu ile yarasanın ön üyesinin temel kemik planının ortak kökenden geldiği veriliyor. Birinin tutmaya, diğerinin uçmaya uyumlanması hangi sonucu değiştirir?",
    [
      "Görevler farklı olsa da ön üye planı bakımından homolog olabilirler",
      "Farklı görev ortak kökeni imkânsız yapar",
      "Her homolog yapı aynı görevi yapmak zorundadır",
      "Kemik planı bilgisi yalnız yaşam ortamını verir",
      "Bu iki canlı aynı tür olmak zorundadır",
    ],
    0,
    "Homolojinin ölçütü mutlaka aynı görev değildir.",
    "Ortak kökene dayalı ön üye planı homolojiyi destekler; görevler farklılaşabilir. İkinci ve üçüncü seçenek homolojiyi işlevle karıştırır. Kemik planı köken/anatomi kanıtıdır; yalnız habitat bilgisi değildir. Homolog bir yapı paylaşmak aynı tür olmayı gerektirmez.",
    "homoloji",
  ),
  question(
    "f093-classification-7",
    "Sazan, kurbağa, kedi, kertenkele ve güvercin için yalnız ‘hepsi ökaryottur’ verisi sunuluyor. Bu tek veriden hangi sonuç çıkar?",
    [
      "Kertenkeleyle güvercinin en yakın çift olduğu kesinleşir",
      "Beşinin aynı tür olduğu kesinleşir",
      "Ortak geniş hücre özelliği vardır; iç akrabalık sırası tek başına çözülmez",
      "Kedinin bütün diğerlerinin atası olduğu anlaşılır",
      "DNA dizilerinin aynı olduğu kanıtlanır",
    ],
    2,
    "Bir özellik bütün örneklerde aynıysa, daha dar bir çifti ayırıyor mu?",
    "Ökaryotluk ortak geniş bir özellik verir fakat bu beş örneğin iç dallanmalarını tek başına çözmez. Yakın çift, aynı tür, bir güncel canlının diğerlerine ata olması ve bütün DNA’nın aynılığı ek kanıt olmadan söylenemez. Veri yetersizliği gerçek ilişkilerin eşit olduğunu da kanıtlamaz.",
    "kanit-yeterliligi",
  ),
  question(
    "f093-classification-8",
    "Tamamı karşılaştırma için oluşturulmuş ve uygun hizalandığı verilen 6 konumluk diziler K:GGCCGA, G:GGCCGG, M:GGCCTT’dir. Yalnız farklı baz konumları sayılırsa doğru hesap ve sınırlı yorum hangisidir?",
    [
      "K-G farkı 6’dır; bütün genomlar aynıdır",
      "K-M farkı 0’dır; aynı türdürler",
      "G-M farkı 1’dir; yaşları kesin hesaplanır",
      "Bütün çiftler aynı farktadır; veri ayırt etmez",
      "K-G farkı 1, K-M ve G-M farkı 2’dir; bu öğretim paketinde K-G yakınlığını destekler",
    ],
    4,
    "Her sütunu eş konumla karşılaştır; kısa örneği bütün genom diye sunma.",
    "K ile G yalnız son konumda farklıdır:1. K-M ve G-M beşinci ve altıncı konumlarda farklıdır:2. Bu yapılandırılmış örnekte K-G yakınlığını destekleyen ayırt edici veri vardır. Diğer sayımlar yanlıştır; kısa oluşturulmuş diziden aynı tür, genom aynılığı veya kesin ayrılma tarihi çıkarılamaz.",
    "dizi-karsilastirma",
  ),
  question(
    "f093-classification-9",
    "Bacteria, Archaea ve Eukarya üst âlemleri kullanılıyor. X ve Y’nin ikisi de zarla çevrili çekirdek taşımayan prokaryot düzenindedir; başka veri verilmemiştir. Hangi çıkarım bilimsel olarak sınırlıdır?",
    [
      "İkisi de zorunlu aynı üst âlemdedir",
      "Prokaryotluk tek başına Bacteria ile Archaea ayrımını çözmez",
      "İkisi de kesin Eukarya’dır",
      "Prokaryotların DNA’sı yoktur",
      "Tek hücreli bütün canlılar bu iki örnekle aynı gruptadır",
    ],
    1,
    "İki farklı üst âlem prokaryot hücre düzeni paylaşabilir.",
    "Bacteria ve Archaea prokaryot düzenini paylaşırken moleküler/biyokimyasal özelliklerle ayrılır. Yalnız çekirdeksizlik aynı üst âlemi kanıtlamaz; Eukarya sonucu da çıkmaz. Prokaryotlarda DNA bulunur. Tek hücreli ökaryotlar olduğundan bütün tek hücreliler bu gruba sokulamaz.",
    "uc-ust-alem",
  ),
  question(
    "f093-classification-10",
    "Aynı takımda sınıflandırılan iki farklı hayvan için yalnız hiyerarşik kapsama kuralıyla hangisi zorunlu çıkar?",
    [
      "Aynı türdedirler",
      "Aynı cinstedirler",
      "Aynı familyadadırlar",
      "Aynı sınıfta ve takımın diğer üst taksonlarındadırlar",
      "Doğal koşullarda mutlaka verimli döl verirler",
    ],
    3,
    "Takımdan yukarı git; aşağıdaki dar basamakları zorunlu eşitleme.",
    "Takım bir sınıfın altındadır; aynı takım ortak sınıf ve onun üst taksonlarını gerektirir. Aynı familya, cins ve tür gibi daha dar basamaklar zorunlu değildir. Verimli döl oluşturma da yalnız takım ortaklığından çıkmaz. Bu soru yeni bir soy ağacı veya üreme deneyi varsaymadan kapsama ilişkisini kullanır.",
    "takson-kapsama",
  ),
];

export const forge093BiologyGuides: LessonGuide[] = [
  membraneGuide,
  classificationGuide,
];
export const forge093BiologyTopics: Record<string, string> = {
  "hucre-zarinda-madde-alisverisleri": "detail-12",
  "canlilarin-siniflandirilmasi": "detail-13",
};
export const forge093BiologyLessons: Lesson[] = forge093BiologyGuides.map(
  (guide, index) => ({
    id: guide.id,
    subjectId: "tyt-biyoloji",
    title: txt(
      index === 0
        ? "Hücre zarında madde alışverişleri"
        : "Canlıların sınıflandırılması",
    ),
    minutes: guide.minutes,
    objectives: guide.objectives.map(txt),
    body: guide.sections.map((s) => ({
      title: txt(s.title),
      text: txt(s.paragraphs.join("\n\n")),
    })),
    questions: index === 0 ? membraneQuestions : classificationQuestions,
    source: txt(guide.source),
    tags: ["kaynakli", "etkilesimli", "forge093"],
  }),
);
