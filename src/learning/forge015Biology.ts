import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

export const variationEvents = [
  "crossing",
  "assortment",
  "fertilization",
  "mutation",
  "transfer",
  "environment",
] as const;
export type VariationEvent = (typeof variationEvents)[number];
export type CellLine = "skin" | "germline";
/** Explicit evidence cards; a changed phenotype alone never proves a mutation. */
export function variationSnapshot(
  event: VariationEvent,
  line: CellLine,
  selectedGamete: boolean,
) {
  if (!variationEvents.includes(event) || !["skin", "germline"].includes(line))
    throw new RangeError("VARIATION");
  const mutation = event === "mutation";
  const recombined = ["crossing", "assortment", "fertilization"].includes(
    event,
  );
  const before =
    event === "crossing"
      ? ["AB", "ab"]
      : event === "assortment"
        ? ["Aa", "Bb"]
        : event === "fertilization"
          ? ["Ab", "aB"]
          : event === "transfer"
            ? ["DNA", "plazmit"]
            : ["ATGC"];
  const after =
    event === "crossing"
      ? ["Ab", "aB"]
      : event === "assortment"
        ? ["Ab", "aB"]
        : event === "fertilization"
          ? ["AaBb"]
          : event === "mutation"
            ? ["ATAC"]
            : event === "transfer"
              ? ["DNA + plazmit"]
              : ["ATGC"];
  const inheritance = !mutation
    ? "Bu kart tek başına belirli bir insan çocuğuna geçişi göstermez."
    : line === "skin"
      ? "Verilen insanda yalnız deri hücresindeki değişim, gamet soyuna geçiş kanıtı değildir."
      : selectedGamete
        ? "Varyantı taşıyan gamet bu seçili döllenmede kullanılıyor: seçili zigot varyantı taşır."
        : "Gamet soyundaki varyant aktarılabilir; hangi gametin döllendiği gösterilmediğinden belirli zigot sonucu kesin değildir.";
  return {
    event,
    before,
    after,
    newVariant: mutation,
    reshuffled: recombined,
    transferred: event === "transfer",
    phenotypeOnly: event === "environment",
    inheritance,
    selectedZygoteHasVariant: mutation && line === "germline" && selectedGamete,
  };
}
export type GliaTask = "myelin" | "defence" | "support" | "fluid";
export function gliaSnapshot(
  region: "central" | "peripheral",
  task: GliaTask,
  myelin: boolean,
) {
  if (
    !["central", "peripheral"].includes(region) ||
    !["myelin", "defence", "support", "fluid"].includes(task)
  )
    throw new RangeError("GLIA");
  const glia =
    task === "myelin"
      ? region === "central"
        ? "Oligodendrosit"
        : "Schwann hücresi"
      : task === "defence"
        ? region === "central"
          ? "Mikroglia"
          : "Bu kart çevresel bir hücre tipini tek başına belirlemez"
        : task === "support"
          ? region === "central"
            ? "Astrosit"
            : "Çevresel destek hücreleri; tek işlevden kesin tip çıkarılmaz"
          : region === "central"
            ? "Ependim hücresi"
            : "BOS boşluğu bu çevresel akson kesitinde gösterilmiyor";
  return {
    region,
    task,
    glia,
    myelin,
    nodes: myelin ? 3 : 0,
    mode: myelin
      ? "Yalıtılmış aralıklarda yerel akım; boğumlarda aksiyon potansiyeli yeniden oluşur."
      : "Bu şemada miyelin kaldırıldı. Kesin hız oranı için ölçüm gerekir.",
  };
}
export const potentialPoints: readonly (readonly [number, number])[] = [
  [0, -70],
  [1, -70],
  [1.5, -55],
  [2, 30],
  [3, -70],
  [3.5, -80],
  [4, -70],
];
export function potentialSnapshot(time: number) {
  if (!Number.isFinite(time) || time < 0 || time > 4)
    throw new RangeError("AP_TIME");
  let i = potentialPoints.findIndex(([t]) => t >= time);
  if (i === 0) i = 1;
  const [a, va] = potentialPoints[i - 1],
    [b, vb] = potentialPoints[i];
  const voltage = va + ((vb - va) * (time - a)) / (b - a);
  const phase =
    time < 1.5
      ? "Dinlenme ve eşik yönünde yerel değişim"
      : time < 2
        ? "Depolarizasyon"
        : time < 3
          ? "Repolarizasyon"
          : time < 4
            ? "Hiperpolarizasyon ve dinlenmeye dönüş"
            : "Dinlenme";
  const ion =
    time >= 1.5 && time < 2
      ? "Na⁺ içeri"
      : time >= 2 && time < 3.5
        ? "K⁺ dışarı"
        : "Dinlenme gradyanları korunur";
  return {
    time,
    voltage,
    phase,
    ion,
    sodiumIn: time >= 1.5 && time < 2,
    potassiumOut: time >= 2 && time < 3.5,
  };
}
export function secondImpulse(voltage: number, recovery: "ready" | "absolute") {
  if (
    !Number.isFinite(voltage) ||
    voltage < -80 ||
    voltage > -40 ||
    !["ready", "absolute"].includes(recovery)
  )
    throw new RangeError("AP_SECOND");
  return {
    threshold: -55,
    voltage,
    recovery,
    fires: recovery === "ready" && voltage >= -55,
    reason:
      recovery === "absolute"
        ? "Mutlak refrakter dönemde Na⁺ kanallarının uygun biçimde toparlanması gerekir; yalnız uyaranı büyütmek yeni bir normal aksiyon potansiyeli başlatmaz."
        : voltage >= -55
          ? "Bu örnekte zar hazır ve verilen −55 mV eşiğine ulaşılmıştır."
          : "Bu örnekte zar hazır olsa da verilen −55 mV eşiğine ulaşılmamıştır.",
  };
}
export type ForebrainTask = "vision" | "touch" | "temperature" | "rhythm";
export const forebrainRegions = {
  occipital: "Oksipital lob",
  parietal: "Pariyetal lob",
  hypothalamus: "Hipotalamus",
  pineal: "Epifiz",
} as const;
export function forebrainSnapshot(task: ForebrainTask, temperature: number) {
  if (
    !["vision", "touch", "temperature", "rhythm"].includes(task) ||
    !Number.isFinite(temperature) ||
    temperature < 36 ||
    temperature > 38
  )
    throw new RangeError("FOREBRAIN");
  const target =
    task === "vision"
      ? "occipital"
      : task === "touch"
        ? "parietal"
        : task === "temperature"
          ? "hypothalamus"
          : "pineal";
  return {
    task,
    target,
    label: forebrainRegions[target],
    error: temperature - 37,
    regulation:
      temperature > 37
        ? "Isı kaybını destekleyen yanıtlar"
        : temperature < 37
          ? "Isıyı korumayı ve üretmeyi destekleyen yanıtlar"
          : "Verilen hedefle fark yok",
    network:
      task === "vision"
        ? "Retina → talamik aktarım → oksipital görsel işlemleme"
        : task === "touch"
          ? "Reseptör → yükselen yollar → talamus → pariyetal işlemleme"
          : task === "temperature"
            ? "Sıcaklık bilgisi → hipotalamik ağlar → otonom, endokrin ve davranışsal yanıtlar"
            : "Işık-karanlık bilgisi ve hipotalamik saat → epifiz melatonin ritmi",
  };
}
export type HindTask = "orientation" | "coordination" | "respiration" | "relay";
export const hindRegions = {
  midbrain: "Orta beyin",
  cerebellum: "Beyincik",
  medulla: "Omurilik soğanı",
  pons: "Pons",
} as const;
export function hindbrainSnapshot(task: HindTask) {
  if (!["orientation", "coordination", "respiration", "relay"].includes(task))
    throw new RangeError("HINDBRAIN");
  const target =
    task === "orientation"
      ? "midbrain"
      : task === "coordination"
        ? "cerebellum"
        : task === "respiration"
          ? "medulla"
          : "pons";
  return {
    target,
    label: hindRegions[target],
    brainstem: target !== "cerebellum",
    hindbrain: target !== "midbrain",
    scope:
      task === "respiration"
        ? "Omurilik soğanındaki ağlar solunum düzenlenmesine katılır; pons ve diğer girdilerle bütünleşir."
        : task === "orientation"
          ? "Seçili yönelme refleksi orta beyin bağlamında gösterilir; bilinçli görmenin tamamı değildir."
          : task === "coordination"
            ? "Beyincik zamanlama, hata düzeltme ve dengeye katkı verir; tek başına bütün hareket komutlarını üretmez."
            : "Pons önemli bağlantılar ve solunum düzenleme ağlarıyla ilişkilidir; bütün görevi tek bir kablo olmak değildir.",
  };
}
export type ReflexCut = "none" | "dorsal" | "ventral" | "ascending";
export function spinalSnapshot(interneuron: boolean, cut: ReflexCut) {
  if (!["none", "dorsal", "ventral", "ascending"].includes(cut))
    throw new RangeError("SPINAL");
  const sensoryInput = cut !== "dorsal",
    localResponse = sensoryInput && cut !== "ventral",
    ascending = sensoryInput && cut !== "ascending";
  const centralSynapses = interneuron ? 2 : 1;
  return {
    interneuron,
    cut,
    sensoryInput,
    localResponse,
    ascending,
    neurons: interneuron ? 3 : 2,
    centralSynapses,
    latency: localResponse ? 20 + centralSynapses * 0.5 : null,
    limits:
      "Bu düşünce modelinde her iki periferik yol 0,5 m ve 50 m/s; her merkezî kimyasal sinaps 0,5 ms. Nöromüsküler kavşak ve kasın mekanik gecikmesi eklenmemiştir.",
  };
}
export type PeripheralTarget = "skeletal" | "smooth" | "cardiac" | "gland";
export type DiseaseEvidence =
  "symptom" | "myelin" | "dopamine" | "memory" | "network" | "mood";
export const evidenceLabels: Record<DiseaseEvidence, string> = {
  symptom: "Yalnız titreme belirtisi",
  myelin: "MSS miyelini ve iletim sorunu",
  dopamine: "Dopaminerjik hareket ağı",
  memory: "Bellek ağı, amiloid ve tau",
  network: "Anormal ağ etkinliği ve nöbet",
  mood: "Biyolojik, psikolojik ve çevresel etkenler",
};
export function peripheralSnapshot(
  target: PeripheralTarget,
  evidence: DiseaseEvidence,
) {
  if (
    !["skeletal", "smooth", "cardiac", "gland"].includes(target) ||
    !Object.hasOwn(evidenceLabels, evidence)
  )
    throw new RangeError("PERIPHERAL");
  const autonomic = target !== "skeletal";
  const relation =
    evidence === "symptom"
      ? "Tek titreme belirtisi kesin tanı vermez."
      : evidence === "myelin"
        ? "Multipl skleroz bağlamında merkezî miyelin ve iletim incelenir."
        : evidence === "dopamine"
          ? "Parkinson bağlamında dopaminerjik hareket ağları incelenir."
          : evidence === "memory"
            ? "Alzheimer bağlamında bellek ağları ve ilgili patolojik süreçler incelenir."
            : evidence === "network"
              ? "Epilepsi bağlamında farklı nöbet türleri ve anormal ağ etkinliği incelenir."
              : "Depresyon çok etkenli değerlendirilir; tek neden veya karakter yargısı yeterli değildir.";
  return {
    target,
    evidence,
    autonomic,
    motorNeurons: autonomic ? 2 : 1,
    peripheralSomas: autonomic ? 1 : 0,
    route: autonomic
      ? "MSS gövdesi → periferik gangliyon gövdesi → hedef"
      : "MSS motor gövdesi → iskelet kası",
    relation,
    diagnosis: false as const,
  };
}

type Unit = {
  id: string;
  topic: string;
  title: string;
  source: string;
  minutes: number;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: LessonGuide["recall"];
  questions: Question[];
};

const data: Unit[] = [
  {
    id: "genetik-cesitlilik",
    topic: "detail-284",
    title: "Genetik çeşitlilik: yeni alel mi, yeni birleşim mi?",
    source:
      "MEBİ TYT Biyoloji, basılı s. 143–144 (PDF 145–146); OGM 10. sınıf Genetik Varyasyonlar; Aurelia AYT Biyoloji 002, PDF 1–6. Özgün öğretim ve sorular; resmî sınav sorusu aktarımı değildir.",
    minutes: 44,
    objectives: [
      "DNA değişimini, alellerin yeniden birleşimini ve çevresel görünümü kanıtlarına göre ayır.",
      "Bağımsızlık, bağlılık ve hücre soyu koşullarını aynı çıkarımda birleştir.",
      "Aktarılabilir olanla seçili yavruya gerçekten aktarılanı ayır.",
    ],
    sections: [
      {
        title: "Farklı görünmek aynı şeyi kanıtlamaz",
        paragraphs: [
          "Genetik çeşitlilik, aynı türün bireyleri veya popülasyonları arasındaki kalıtsal farklılıkları kapsar. Bir genin farklı sürümlerine alel denir; A ve a harfleri bir öğretim modelinde iki aleli temsil edebilir. Genotip alel bileşimi, fenotip ise gözlenen özelliklerin bütünüdür. Bir bitkinin rengi değiştiğinde önce hangi bilginin gerçekten ölçüldüğünü sor: DNA dizisi mi, yalnız görünüm mü?",
          "Aynı genotip farklı ışık, beslenme veya sıcaklık koşullarında farklı fenotipler gösterebilir. Farklı genotipler de aynı gözlenen özelliği verebilir. Bu nedenle farklı renk, mutlaka yeni mutasyon veya yeni tür demek değildir. Kalıtsal açıklama için uygun genetik veri ve kontrollü karşılaştırma gerekir; insanın kimliği veya karmaşık özellikleri tek bir harfle belirlenmiş gibi sunulmaz.",
        ],
      },
      {
        title: "Mutasyon yeni varyantın kaynağı olabilir",
        paragraphs: [
          "DNA dizisindeki kalıcı değişiklikler ve kromozom yapısı ya da sayısındaki değişiklikler genetik farklılık oluşturabilir. Belirli bir gen bölgesindeki dizi değişimi yeni bir alel kaynağı olabilir. Mutasyonun gerçekleşmesi onun mutlaka gözle görülür, yararlı veya zararlı olması demek değildir; etkisi değişen bölgeye, hücreye ve koşullara bağlıdır. Bir farklılığın görülmemesi de DNA değişikliği olmadığını kanıtlamaz.",
          "DNA eşlenmesindeki hatalar kendiliğinden ortaya çıkabilir; bazı etkenler mutasyon olasılığını artırabilir. Mutasyonlar organizmanın ihtiyaç duyduğu özelliği bilinçli olarak üretmek için gerçekleşmez. Seçilim, ortaya çıkan kalıtsal farklılıklar arasında üreme başarısını değiştirebilir; mutasyonla aynı olay değildir. Her mutasyonu yalnız çevresel bir maddeyle veya her fenotip değişimini mutasyonla açıklama.",
        ],
      },
      {
        title: "Aktarım için değişikliğin bulunduğu hücre soyunu izle",
        paragraphs: [
          "Olağan insan eşeyli üremesinde deri gibi somatik hücrelerdeki bir değişiklik, yalnız bu yoldan gamete ve çocuğa geçmez. Gamet veya gametleri oluşturacak hücre soyundaki değişiklik ise sonraki nesle aktarılabilir. Aktarılabilir sözcüğü garanti değildir: varyantı taşıyan gametin gerçekten döllenmeye katılması ve değişikliğin oluşan zigotta bulunması gerekir.",
          "Bitkilerde ve eşeysiz çoğalan canlılarda hücre soyları ve üreme yolu farklı olabilir; bütün canlıların somatik değişiklikleri hiçbir koşulda yavruya geçmez diye genelleme kurma. Bir hücredeki mutasyon ile bütün bireyin genotipi de aynı kapsam değildir; mozaik yapı oluşabilir. Soruda verilen üreme biçimi ve seçilen hücre, kalıtım çıkarımının sınırını belirler.",
        ],
      },
      {
        title: "Rekombinasyon mevcut bilgiyi yeniden bir araya getirir",
        paragraphs: [
          "Rekombinasyon alellerin yeni birleşimlerini oluşturur; her yeni birleşim yeni bir alel yaratılması değildir. AB ve ab birlikte taşınan haplotipler olsun. Ab biçimi yeni bir birliktelik olabilir, fakat A, a, B ve b alellerinin her biri daha önce var olabilir. Harfleri ayrı ayrı saymak ile birlikte taşınan kombinasyonları saymak farklı sorulara cevap verir.",
          "Profaz I sırasında homolog kromozomların kardeş olmayan kromatitleri arasında parça değişimi, seçilen genler arasında rekombinant kombinasyonlar oluşturabilir. Hangi iki genin arasının incelendiğini belirt: kromozomun başka bölümündeki parça değişimi seçilen iki lokusun birlikte aktarımını mutlaka değiştirmez. Yeni bir kombinasyon gözlemini, koşullar ve alternatif kaynaklar verilmeden bütün DNA değişim türlerinin kesin kanıtı sayma.",
        ],
      },
      {
        title: "Bağımsız dağılım için fiziksel yerleşimi denetle",
        paragraphs: [
          "Farklı homolog çiftlerin metafaz I yönelimleri ve anafaz I ayrılmaları, anne ve baba kökenli kromozomların farklı gametlerde birleşmesine katkı verir. İki bağımsız heterozigot lokus için A veya a ile B veya b ayrı seçilebilir: AB, Ab, aB, ab. Bu çeşitlilik, seçilen genler arasında krossing-over bulunmasa da mümkündür. Baskın alelin bulunması onu gamete zorunlu üstünlükle göndermez.",
          "2ʰ kuralında h, bu modelde birbirinden bağımsız ayrılan heterozigot gen çiftlerinin sayısıdır. AaBbCc üç bağımsız lokusta sekiz teorik gamet genotipi verebilir; tek bir mayozun sekiz gamet oluşturduğu anlamına gelmez. Bir mayozun hücresel ürün sayısı ile çok sayıda mayoz boyunca olası gamet türleri ayrıdır. Bağlı AB/ab ve bu aralıkta parça değişimi yok koşulunda yalnız AB ve ab beklenir; körlemesine 2² uygulama.",
        ],
      },
      {
        title: "Döllenme iki ayrı örnek uzayını birleştirir",
        paragraphs: [
          "Rastgele döllenmede bir ebeveynden gelen gametin alelleri diğer ebeveyninkilerle birleşir. Ab ile aB birleşirse seçilen lokuslar için AaBb zigotu oluşabilir; bunun için A, a, B ve b dışında yeni alel yaratılması gerekmez. Genotipin yeni birleşimi ile DNA dizisinde yeni varyant oluşumu aynı çıkarım değildir.",
          "Bir gamet türünün mümkün olması, her doğumda seçileceği veya belli sayıdaki çocuk arasında mutlaka görüleceği anlamına gelmez. Olasılık hesabında gametlerin oluşma ve birleşme olasılıkları ayrıca belirtilmelidir. Yalnız olası gamet adlarının listesi verilmişken bütün genotipleri eşit olasılıklı sayma. Bir seçili zigotta varyantın bulunması da ailenin bütün gelecek yavruları için garanti oluşturmaz.",
        ],
      },
      {
        title: "Bakteriyel DNA aktarımı mayoz değildir",
        paragraphs: [
          "Bakteriler çevreden veya başka bakterilerden genetik bilgi kazanabilir. Alıcı hücrenin yeni bir kalıtsal özellik göstermesi, mevcut DNA bilgisinin aktarılmasıyla açıklanabilir; her durumda alıcının DNA’sında kendiliğinden yeni mutasyon oluştuğu kanıtlanmış olmaz. Alıcı için yeni olan bilgi, bütün popülasyon için ilk kez oluşmuş alel anlamına da gelmez.",
          "Bir deneyde yalnız canlı alıcı, yalnız etkisizleştirilmiş verici ve ikisinin birlikte bulunduğu grupları ayırmak çıkarımı güçlendirir. Yeni fenotip gözlemi ile hangi molekülün taşındığını doğrudan gösteren veri farklı kanıt düzeyleridir. Deney pasajı tam verilmeden mutasyon, DNA aktarımı veya doğal seçilimden yalnız birini kesin neden seçme. Bu ünitenin kanıt modeli olası açıklamayı, zorunlu sonucu ve eksik veriyi ayrı gösterir.",
        ],
      },
      {
        title: "Çeşitlilik ve uyumda birey ile popülasyonu ayır",
        paragraphs: [
          "Genetik, tür ve ekosistem çeşitliliği farklı ölçeklerdir. Aynı tür içinde alel farklılıklarını saymak, bir alandaki farklı türleri saymak değildir. Çevre değiştiğinde farklı kalıtsal özellikler taşıyan bireylerin üreme başarıları farklılaşabilir; böylece popülasyonun bileşimi nesiller boyunca değişebilir. Bireyin ihtiyacı olduğu için hemen uygun DNA üretmesi şeklinde amaçlı bir açıklama kurma.",
          "Soy içi üreme homozigotluğu artırabilir ve küçük, yalıtılmış popülasyonlarda başka süreçlerle birlikte çeşitlilik sorunları görülebilir. Ancak tek eşleşmenin bütün alelleri zorunlu yok ettiği söylenmez. Yeni olayda önce hücre soyunu ve DNA kanıtını, sonra kromozomların yerleşimini, en son olasılık ve kesinlik dilini denetle. Önceki TYT çaprazlamalarını bu çıkarım zincirine bağlamak, aynı hesabı yeniden ezberlemekten farklı bir beceridir.",
        ],
      },
    ],
    examples: [
      {
        title: "Kromozom sayısı ile olası tür sayısı",
        prompt:
          "AaBbCc bireyinde üç lokus üç ayrı homolog çiftte, eşit ayrılma varsayılıyor. Teorik gamet genotipi sayısı ile tek gametteki bu lokusların alel sayısını ayır.",
        strategy: "Bağımsız seçimleri çarp, sonra bir gametin içeriğini say.",
        steps: [
          {
            label: "Koşulu doğrula",
            explanation: "Üç lokus heterozigot ve bağımsızdır.",
            expression: "h=3",
          },
          {
            label: "Olası birleşimleri say",
            explanation: "Her lokusta iki seçenek vardır.",
            expression: "2×2×2=8",
          },
          {
            label: "Bir hücreyi sınırla",
            explanation: "Her gamet her lokustan yalnız bir alel taşır.",
            expression: "bir gamette 3 alel etiketi",
          },
        ],
        answer: "Sekiz olası genotip; tek gamette bu üç lokus için üç alel.",
        check:
          "Sekiz tür, bir mayozun sekiz ürün verdiği veya sekiz yavrunun garanti olduğu değildir.",
        pitfall: "h’yi toplam kromozom ya da çocuk sayısı sanma.",
      },
      {
        title: "Aynı harfler, farklı bağlılık",
        prompt:
          "İki lokus AB/ab düzeninde aynı homolog çiftte. Bu aralıkta krossing-over ve mutasyon yok. Hangi gamet haplotipleri beklenir?",
        strategy: "Bağımsız aleller yerine birlikte taşınan blokları izle.",
        steps: [
          {
            label: "Blokları göster",
            explanation: "Bir homolog AB, diğeri ab taşır.",
            expression: "AB / ab",
          },
          {
            label: "Koşulu uygula",
            explanation: "İlgili aralıkta parça değişimi yoktur.",
            expression: "bloklar korunur",
          },
          {
            label: "Listeyi kur",
            explanation: "Her gamet homologlardan bir blok alır.",
            expression: "AB veya ab",
          },
        ],
        answer: "İki ebeveyn tip haplotip: AB ve ab.",
        check:
          "A, a, B, b varlığının yeni Ab ve aB birleşimini zorunlu kılmadığını denetle.",
        pitfall: "AaBb yazımını tek başına bağımsızlık kanıtı sayma.",
      },
      {
        title: "Değişiklik hangi soydan çocuğa ulaşabilir?",
        prompt:
          "Olağan insan eşeyli üremesinde bir deri hücresinde A→a, bir gamet soyunda B→b değişimi var. İkinci varyantı taşıyan gamet döllenmeye katılmamış. Seçili zigot için ne söylenir?",
        strategy:
          "Önce hücre soyunu, sonra gerçek döllenme katılımını denetle.",
        steps: [
          {
            label: "Somatik yolu ayır",
            explanation: "Deri hücresi bu örnekte gamet üretmiyor.",
            expression: "somatik yol → seçili zigota geçiş yok",
          },
          {
            label: "Germ hattını ayır",
            explanation:
              "Gamet soyundaki varyant aktarılabilir bir konumdadır.",
            expression: "aktarılabilir ≠ aktarılmış",
          },
          {
            label: "Döllenmeyi denetle",
            explanation:
              "Varyantı taşıyan gamet seçili döllenmeye katılmamıştır.",
            expression: "bu zigotta B→b aktarımı gösterilmedi",
          },
        ],
        answer:
          "İkinci değişiklik genel olarak aktarılabilir; verilen seçili zigota bu gametle aktarılmış değildir.",
        check: "Olayı bütün canlıların eşeysiz/vejetatif üremesine genelleme.",
        pitfall: "Germ hattı değişikliğini her yavruya kesin geçer sayma.",
      },
      {
        title: "Yeni görünümün mekanizmasını seç",
        prompt:
          "Bir bakteri deneyinde canlı alıcı tek başına özellik göstermiyor; etkisizleştirilmiş verici tek başına çoğalmıyor. Birlikte tutulunca alıcının verici DNA’sını edindiği ve özelliği ifade ettiği ölçülüyor. Mutasyon zorunlu mudur?",
        strategy: "Doğrudan ölçülen bilgiyle olası alternatifleri ayır.",
        steps: [
          {
            label: "Kontrolleri oku",
            explanation:
              "Tek başına gruplar ile birlikte grubun farkını belirle.",
            expression: "birlikte grupta yeni alıcı özellik",
          },
          {
            label: "Moleküler kanıtı seç",
            explanation: "Verici DNA’sının alıcıya girdiği ölçülmüş.",
            expression: "genetik bilgi aktarımı",
          },
          {
            label: "Kesinliği sınırla",
            explanation:
              "Yeni rastlantısal dizi değişimi ayrıca gösterilmemiş.",
            expression: "mutasyon zorunlu çıkarım değil",
          },
        ],
        answer:
          "DNA aktarımı ve ifade desteklenir; yeni mutasyon zorunlu değildir.",
        check: "Fenotip ile DNA aktarımının ayrı ölçümler olduğunu koru.",
        pitfall:
          "Mayoz veya yeni alel yaratımını her kalıtsal farklılığın tek yolu sayma.",
      },
    ],
    recall: [
      {
        prompt: "Yeni kombinasyon her zaman yeni alel midir?",
        answer:
          "Hayır. Mevcut alellerin yeniden birleşimi yeni genotip/haplotip oluşturabilir.",
      },
      {
        prompt: "Germ hattında varyant bulunması neden kesin aktarım değildir?",
        answer:
          "Varyantı taşıyan gamet ilgili döllenmeye katılmalıdır; olası ile gerçekleşmiş ayrıdır.",
      },
      {
        prompt: "Krossing-over olmadan çeşitlilik olabilir mi?",
        answer:
          "Farklı homolog çiftlerin bağımsız dağılımı ve gametlerin birleşmesi farklı kombinasyonlar verebilir.",
      },
      {
        prompt: "Fenotip farkı tek başına mutasyonu kanıtlar mı?",
        answer:
          "Hayır. Çevre, mevcut alel birleşimleri veya aktarılmış DNA gibi alternatifler olabilir.",
      },
    ],
    questions: [
      {
        id: "f015-bio-genetik-cesitlilik-1",
        prompt: {
          tr: "Aynı genetik klondan iki bitki farklı ışık koşullarında farklı renkte büyüyor. DNA dizisi ölçülmemiştir. Hangi sonuç bu veriden kesin çıkarılamaz?",
        },
        options: [
          {
            tr: "Yeni bir DNA mutasyonunun mutlaka oluştuğu",
          },
          {
            tr: "İki grupta ışık koşulunun farklı olduğu",
          },
          {
            tr: "Gözlenen rengin gruplar arasında farklı olduğu",
          },
          {
            tr: "DNA kanıtının ayrıca araştırılabileceği",
          },
          {
            tr: "Çevresel etki olasılığının değerlendirilebileceği",
          },
        ],
        answer: 0,
        hint: {
          tr: "Ölçülen fenotip ile ölçülmeyen DNA’yı ayır.",
        },
        explanation: {
          tr: "Renk farkı gözlenmiştir ama bunun nedeni olarak yeni mutasyon zorunlu değildir. Çevresel etki ve başka süreçler değerlendirilir; DNA değişimi için ayrıca kanıt gerekir.",
        },
        skill: "f015-genetik-cesitlilik-1",
      },
      {
        id: "f015-bio-genetik-cesitlilik-2",
        prompt: {
          tr: "AaBbCc genotipinde üç lokus bağımsız ve heterozigottur. Olağan eşit ayrılma modelinde teorik gamet genotipi sayısı kaçtır?",
        },
        options: [
          {
            tr: "3",
          },
          {
            tr: "8",
          },
          {
            tr: "4",
          },
          {
            tr: "6",
          },
          {
            tr: "16",
          },
        ],
        answer: 1,
        hint: {
          tr: "Her bağımsız heterozigot lokus iki seçenek verir.",
        },
        explanation: {
          tr: "2×2×2=8 olası genotip vardır. Bu sayı tek bir mayozun hücre ürün sayısı veya belirli sayıdaki çocukta hepsinin mutlaka görüleceği anlamına gelmez.",
        },
        skill: "f015-genetik-cesitlilik-2",
      },
      {
        id: "f015-bio-genetik-cesitlilik-3",
        prompt: {
          tr: "AB/ab haplotipleri aynı homolog çift üzerindedir. İlgili aralıkta krossing-over ve mutasyon yok. Hangi gamet listesi verilen modele uyar?",
        },
        options: [
          {
            tr: "AB, Ab, aB ve ab",
          },
          {
            tr: "Yalnız AaBb",
          },
          {
            tr: "AB ve ab",
          },
          {
            tr: "A, a, B ve b ayrı ayrı tek genli dört gamet",
          },
          {
            tr: "Yalnız ABab",
          },
        ],
        answer: 2,
        hint: {
          tr: "Birlikte taşınan alelleri blok olarak izle.",
        },
        explanation: {
          tr: "Bağlı bloklar korunur; AB ve ab ebeveyn tipleridir. Bağımsızlık koşulu verilmediğinden iki heterozigot lokusa körlemesine 2² uygulanamaz.",
        },
        skill: "f015-genetik-cesitlilik-3",
      },
      {
        id: "f015-bio-genetik-cesitlilik-4",
        prompt: {
          tr: "Bir kromozom bölgesindeki mevcut A alelinin DNA dizisi değişip daha önce o modelde bulunmayan A* varyantı oluşuyor. Bu olay hangi yorumu destekler?",
        },
        options: [
          {
            tr: "Rastgele döllenme her zaman DNA’yı bu biçimde değiştirir",
          },
          {
            tr: "Her yeni birleşim yeni alel yaratır",
          },
          {
            tr: "Değişiklik kesin yararlıdır",
          },
          {
            tr: "Mutasyon yeni bir alel kaynağı olabilir",
          },
          {
            tr: "Değişiklik her yavruya zorunlu geçer",
          },
        ],
        answer: 3,
        hint: {
          tr: "Yeni diziyi yeni birleşimden ayır.",
        },
        explanation: {
          tr: "Doğrudan dizi değişimi yeni alel oluşumuyla uyumludur. Etkinin yararı, görünümü ve sonraki yavruya aktarımı ayrıca koşullara bağlıdır; mutasyon olmak bunları garanti etmez.",
        },
        skill: "f015-genetik-cesitlilik-4",
      },
      {
        id: "f015-bio-genetik-cesitlilik-5",
        prompt: {
          tr: "Olağan insan eşeyli üremesinde yalnız deri hücresindeki bir mutasyon için hangisi uygundur?",
        },
        options: [
          {
            tr: "Çocukların tamamına zorunlu geçer",
          },
          {
            tr: "Bütün gametler bu deri hücresinden oluşur",
          },
          {
            tr: "Mutasyon olduğu için mutlaka yararlıdır",
          },
          {
            tr: "Her canlı türünde her üreme yoluna aynı sonuç koşulsuz uygulanır",
          },
          {
            tr: "Bu somatik değişikliğin verilen yoldan gamete ve çocuğa geçmesi beklenmez",
          },
        ],
        answer: 4,
        hint: {
          tr: "Üremeye katılan hücre soyunu denetle.",
        },
        explanation: {
          tr: "Verilen insan somatik deri hücresi gamet soyunu oluşturmaz. Sonuç bu yol için sınırlıdır; bütün canlıların vejetatif veya eşeysiz üremesine evrensel yasak diye taşınmaz.",
        },
        skill: "f015-genetik-cesitlilik-5",
      },
      {
        id: "f015-bio-genetik-cesitlilik-6",
        prompt: {
          tr: "Bir gamette yeni varyant vardır; fakat o gamet incelenen döllenmeye katılmamıştır. Hangi çıkarım doğrudur?",
        },
        options: [
          {
            tr: "O varyantın bu gamet aracılığıyla seçili zigota geçtiği söylenemez",
          },
          {
            tr: "Varyant her zigotta kesin bulunur",
          },
          {
            tr: "Gamet türünün mümkün olması döllenmeyi garanti eder",
          },
          {
            tr: "Bütün diğer gametler aynı varyanta zorunlu sahiptir",
          },
          {
            tr: "Mutasyonun somatik olduğu kesinleşmiştir",
          },
        ],
        answer: 0,
        hint: {
          tr: "Potansiyel aktarımı gerçek katılımdan ayır.",
        },
        explanation: {
          tr: "Gamette bulunmak aktarım olanağı sağlar; verilen gamet döllenmeye katılmadığından bu olay üzerinden seçili zigotta varyantın bulunduğu sonucuna ulaşılamaz.",
        },
        skill: "f015-genetik-cesitlilik-6",
      },
      {
        id: "f015-bio-genetik-cesitlilik-7",
        prompt: {
          tr: "Homolog kromozomların kardeş olmayan kromatitleri arasında profaz I’de parça değişimi gözleniyor. Hangi olay tanımlanmıştır?",
        },
        options: [
          {
            tr: "Normal mitozda bütün homologların zorunlu eşleşmesi",
          },
          {
            tr: "Krossing-over",
          },
          {
            tr: "Yalnız rastgele döllenme",
          },
          {
            tr: "Yalnız sitoplazma bölünmesi",
          },
          {
            tr: "Her durumda yeni alel üretimi",
          },
        ],
        answer: 1,
        hint: {
          tr: "Evreyi ve değişen kromatitlerin ilişkisini birlikte oku.",
        },
        explanation: {
          tr: "Profaz I ve kardeş olmayan homolog kromatitler parça değişimi tanımını verir. Yeni kombinasyon oluşturabilir; her olayın yeni alel yarattığı sonucu doğru değildir.",
        },
        skill: "f015-genetik-cesitlilik-7",
      },
      {
        id: "f015-bio-genetik-cesitlilik-8",
        prompt: {
          tr: "Ab gameti ile aB gameti birleşerek AaBb zigotunu oluşturuyor; DNA dizisinde yeni değişiklik gösterilmemiş. Hangi açıklama uygundur?",
        },
        options: [
          {
            tr: "Döllenme zorunlu olarak yeni alel yaratmıştır",
          },
          {
            tr: "Zigot yalnız bir gametin alellerini taşır",
          },
          {
            tr: "Mevcut aleller yeni bir zigot birleşiminde toplanmıştır",
          },
          {
            tr: "A ve a tek bir gametten zorunlu gelmiştir",
          },
          {
            tr: "Bu birleşim aynı sayıda bütün yavruları garanti eder",
          },
        ],
        answer: 2,
        hint: {
          tr: "Gametlerden hangi alelin geldiğini tek tek göster.",
        },
        explanation: {
          tr: "Ab ile aB birleşiminde iki ebeveynin mevcut alelleri bir araya gelir. Bu işlem kendi başına yeni DNA varyantı veya bütün sonraki yavrular için garanti oluşturmaz.",
        },
        skill: "f015-genetik-cesitlilik-8",
      },
      {
        id: "f015-bio-genetik-cesitlilik-9",
        prompt: {
          tr: "Bir bakterinin dışarıdan verici DNA’sı aldığı ve yeni kalıtsal özellik gösterdiği doğrudan ölçülüyor. Hangi iddia zorunlu değildir?",
        },
        options: [
          {
            tr: "Genetik bilgi aktarımının gerçekleştiği",
          },
          {
            tr: "Alıcının yeni bilgiyi edindiği",
          },
          {
            tr: "Özelliğin alıcıda ifade edildiği",
          },
          {
            tr: "Yeni özelliğin mutlaka kendiliğinden mutasyonla doğduğu",
          },
          {
            tr: "Mutasyon iddiası için ayrı kanıt aranabileceği",
          },
        ],
        answer: 3,
        hint: {
          tr: "Aktarılan DNA, yeni rastlantısal dizi değişimiyle aynı kanıt değildir.",
        },
        explanation: {
          tr: "Deney DNA alımını ve ifadesini gösterir. Alıcı için yeni olan özellik mevcut verici bilgisinden gelebilir; kendiliğinden mutasyon tek zorunlu açıklama değildir.",
        },
        skill: "f015-genetik-cesitlilik-9",
      },
      {
        id: "f015-bio-genetik-cesitlilik-10",
        prompt: {
          tr: "Bir popülasyonda yakın akraba eşleşmesi artıyor. Hangi ifade en uygun kapsamı korur?",
        },
        options: [
          {
            tr: "Bütün aleller bir nesilde kesin kaybolur",
          },
          {
            tr: "Her birey ihtiyacına göre yeni DNA üretir",
          },
          {
            tr: "Bütün türler birbirine dönüşür",
          },
          {
            tr: "Genetik çeşitlilik yalnız birey sayısının başka adıdır",
          },
          {
            tr: "Homozigotluk artabilir; bütün alellerin tek eşleşmede yok olması zorunlu değildir",
          },
        ],
        answer: 4,
        hint: {
          tr: "Genotip oranı ile alellerin varlığını ayır.",
        },
        explanation: {
          tr: "Soy içi üreme homozigotluğu artırabilir. Küçük/yalıtılmış popülasyonlarda başka süreçler de etkili olabilir; tek eşleşmenin bütün alelleri kesin silmesi bilimsel bir sonuç değildir.",
        },
        skill: "f015-genetik-cesitlilik-10",
      },
    ],
  },
  {
    id: "sinir-sistemi-noron-ve-glialar",
    topic: "detail-285",
    title: "Nöron ve glialar: yapıyı, görevi ve yeri birlikte oku",
    source:
      "MEBİ AYT Biyoloji, basılı s. 9–11 (PDF 11–13); OGM Sinir Sistemi I, PDF 10–12 ve 14–15; OGM Nöronları Tanıyalım, PDF 1–2; Aurelia AYT 003, PDF 1–7. Özgün öğretim/model/sorular.",
    minutes: 44,
    objectives: [
      "Nöron parçalarını ve alıcıdan efektöre işlev yönünü ayır.",
      "Glia türlerini anatomik bölge ve özgül işlevle eşleştir.",
      "Miyelin, çap ve koşulları denetleyerek hız yorumunun sınırını belirle.",
    ],
    sections: [
      {
        title: "Uyarıdan yanıt yoluna bir bütün olarak bak",
        paragraphs: [
          "Sinir sistemi iç veya dış ortam değişimlerinin algılanması, bilginin işlenmesi ve uygun yanıtın oluşmasına katılır. Uyarı değişimin kendisi, reseptör onu algılayan yapı, efektör ise yanıt oluşturan kas veya bez gibi hedef yapıdır. Bir ışık uyaranı ile nörondaki elektriksel sinyal aynı nicelik değildir. Sinir doku nöronlar ve farklı görevler taşıyan glialarla birlikte işler.",
          "Bir nöronu anlamak yalnız şeklini ezberlemek değildir: bilginin hangi taraftan geldiği, hücre içinde nasıl bütünleştirildiği ve hangi hedefe gittiği sorulur. Her sinir hücresi aynı biçimde görünmez. Bu ünitedeki çok kutuplu miyelinli şekil tipik bir öğretim modelidir; duyu yollarında ve diğer bölgelerde farklı hücre biçimleri bulunabilir.",
        ],
      },
      {
        title: "Dendrit, soma ve akson aynı parça değildir",
        paragraphs: [
          "Dendritler çoğunlukla diğer hücrelerden gelen girdileri alır. Soma yani hücre gövdesi çekirdeği, metabolik organelleri ve protein üretim düzeneklerini içerir; girdilerin bütünleşmesine katkı verir. Nissl cisimcikleri granüllü endoplazmik retikulum ve ribozomlarla ilişkilidir. Akson boyunca mikrotübüller hücre içi taşınmayı destekler; uzun uzantı kendi başına ayrı bir hücre değildir.",
          "Akson sinyali başlangıç bölgesinden uçlara taşır; uçlar başka nöron, kas veya bez hücreleriyle bağlantı kurabilir. Şeklin kâğıttaki sağa veya sola bakması, anatomik işlevi değiştirmez. Dalları yalnız uzunluklarına göre adlandırmak yerine soma bağlantısını ve verilen sinyal yönünü de oku. Çizim ölçeği verilmemişse aksonun sayfadaki santimetresinden gerçek iletim hızı hesaplanmaz.",
        ],
      },
      {
        title: "Duyu, ara ve motor birer görev tanımıdır",
        paragraphs: [
          "Duyu nöronları çevreden veya vücudun içinden gelen bilgiyi merkezî sinir sistemine taşır; bu yön merkeze getirici, yani afferent yön olarak adlandırılır. Motor nöronlar yanıtı efektöre götürür; bu yön merkezden götürücü, yani efferent yöndür. Ara nöronlar birçok merkezî devrede girdileri işlemeye ve bağlantı kurmaya katılır. Her nöron tipi için tek bir basit şekil zorunlu değildir.",
          "Bir refleks yolunda duyu→ara→motor sırası bulunabilir; fakat tek sinapslı gerilme refleksinin seçili duyu-motor bağlantısında ara nöron zorunlu değildir. Kasın kendisini motor nöron veya reseptörü doğrudan ara nöron sayma. Somatik/otonom ve MSS/ÇSS sınıfları daha sonraki anatomik ölçütlerdir; görev yönüyle aynı etiket değildir.",
        ],
      },
      {
        title: "MSS ve ÇSS yer bildirir; görevle karıştırma",
        paragraphs: [
          "Merkezî sinir sistemi beyin ve omuriliği, çevresel sinir sistemi bu merkezlerle vücut arasındaki sinir ve gangliyon bağlantılarını kapsar. Bir duyu yolunun merkeze girmesi veya motor aksonun merkezden çıkması anatomik sınırı aşabilir. Sinir, birçok aksonun oluşturduğu bir demettir; tek bir nöronla veya onun tek aksonuyla aynı büyüklük değildir.",
          "Nöron gövdelerinin çevresel kümelerine gangliyon denir. Bir hücrenin duyu veya motor görevini yalnız bulunduğu yere bakarak belirlemek yeterli olmayabilir; iletimin yönünü ve hedefini sor. Özellikle otonom motor yolun çevresel gangliyonda gövdesi bulunan kısmı olabilir. Bütün motor nöronların gövdeleri her koşulda merkezde bulunur diye ezberleme.",
        ],
      },
      {
        title: "Miyelin ve Ranvier boğumunu birlikte tanı",
        paragraphs: [
          "Miyelin aksonun belirli bölümlerini saran, lipit ve protein içeren yalıtıcı yapıdır. Komşu segmentler arasındaki açık akson zarı Ranvier boğumudur; boğum miyelinin en kalın olduğu yer değildir. Miyelin her aksonda bulunmaz. Uygun diğer koşullar eşitken iyi işleyen miyelinlenme iletimi hızlandırabilir; bu yarar bütün aksonların miyelinli olduğu sonucunu vermez.",
          "MSS aksonlarının miyelinlenmesinde oligodendrositler, ÇSS’de Schwann hücreleri görev alır. Miyelin nöronun kendisi veya yeni bir sinir hücresi değildir. Atlamalı iletim, impuls maddesinin boşluklardan zıplaması değil, elektriksel değişimin boğumlarda yeniden oluşturulmasıyla ilgili bir süreçtir. İyon kanalları ve ayrıntılı gerilim evreleri aksiyon potansiyeli ünitesinde ayrıca izlenecek.",
        ],
      },
      {
        title: "Glia yalnız boşluk dolduran destek değildir",
        paragraphs: [
          "Mikroglia savunma, fagositoz ve hücresel artıkların uzaklaştırılmasına katılır. Astrositler hücre dışı ortamın düzenlenmesi, metabolik destek ve kan-beyin bariyeri işlevinin desteklenmesiyle ilişkilidir; bariyer yalnız astrositlerden oluşmaz. Ependim hücreleri merkezî boşlukları döşer ve beyin-omurilik sıvısının işleyişine katkı verir. Her glianın temel görevi miyelin yapmak değildir.",
          "Yalnız destek hücresi denmişse özgül glia adı kesinleşmeyebilir; bölge ve işlev birlikte gerekir. Gliaların elektriksel veya kimyasal sinyalleşme gösterebilmesi, hepsinin nöronun yaptığı biçimde aksiyon potansiyeliyle uzun mesafe bilgi taşıdığı anlamına gelmez. Glia/nöron oranı bütün bölgelerde değişmeyen 25 kat gibi bir sayı değildir; bölgeye göre değişebilen niceliği evrenselleştirme.",
        ],
      },
      {
        title: "Kimyasal sinapsta hücre sınırını geç",
        paragraphs: [
          "Tipik kimyasal sinapsta presinaptik akson ucuna gelen elektriksel olay, kalsiyum girişini ve nörotransmitter salımını destekler. Haberci sinaptik aralıkta yayılır, uygun postsinaptik reseptörlere bağlanır. Sonuç uyarıcı veya baskılayıcı olabilir; her bağlanma mutlaka yeni aksiyon potansiyeli doğurmaz. Elektriksel sinapslar da vardır; bu bölüm seçili kimyasal bağlantıyı anlatır.",
          "Nöromüsküler kavşak motor nöron ile kas arasındaki özel kimyasal sinapstır. Sinapsı yalnız nöron-nöron ilişkisine daraltma; bezle iletişim de kurulabilir. Habercinin etkisinin sonlanmasında parçalanma, uygun geri alım ve yayılma gibi yollar vardır. Bütün küçük nörotransmitterlerin geri alınmasını tek bir endositoz işlemi sanma; molekül ve taşıyıcı özellikleri değişir.",
        ],
      },
      {
        title: "Karşılaştırmada sabit koşulu ara",
        paragraphs: [
          "İki aksonun çapı ve sıcaklığı eşit, yalnız biri sağlam miyelinliyse genel olarak miyelinli olanın hızlı iletimi beklenir. Çap ve miyelin aynı anda karşıt yönde değişiyorsa bu iki sözcük tek başına kesin sıralama veya kaç kat hesabı vermez. Gerçek hız nicel model veya ölçüm gerektirir; uyaranın daha güçlü olması aksonun yapısal hız farkını otomatik tersine çevirmez.",
          "Olgun nöronların çoğu normal koşullarda mitotik bölünme yapmaz; fakat bu, bütün sinir sistemi hücrelerinin asla bölünmediği veya hiçbir onarımın olamayacağı anlamına gelmez. Bir çizimde daha çok mitokondri bulunması yüksek enerji gereksinimiyle uyumlu olabilir; sayısı verilmeden ATP miktarı hesaplanamaz. Yeni bir soruda önce yer, sonra yapı, görev ve kanıt sınırını ayrı satırlarda yaz.",
        ],
      },
    ],
    examples: [
      {
        title: "İki yerde miyelini kim yapar?",
        prompt:
          "I omuriliğin beyaz madde aksonu, II periferik kol siniri aksonu. Miyelinle ilişkili gliaları seç.",
        strategy: "Önce anatomik konumu, sonra işlevi eşleştir.",
        steps: [
          {
            label: "Yerleri ayır",
            explanation:
              "Omurilik merkezî, kolun periferik siniri çevreseldir.",
            expression: "I=MSS; II=ÇSS",
          },
          {
            label: "İşlevi seç",
            explanation:
              "Sorulan işlev miyelin oluşumudur; savunma veya BOS değil.",
            expression: "miyelin yapıcı",
          },
          {
            label: "Adlandır",
            explanation: "Yer-işlev eşleşmesini uygula.",
            expression: "I oligodendrosit; II Schwann",
          },
        ],
        answer: "I oligodendrosit, II Schwann.",
        check:
          "Mikroglianın fagositoz rolü bu sorunun istediği miyelin yapımı değildir.",
        pitfall: "Glia adını yeri sormadan seçme.",
      },
      {
        title: "Hızda ne kadar kanıt var?",
        prompt:
          "A ve B aksonlarının çapı, sıcaklığı ve diğer ilgili koşulları aynı; yalnız A iyi işleyen miyelin taşıyor. Hangi hız yorumu yapılabilir?",
        strategy: "Değişen tek etkeni belirle ve nicel verinin sınırını koru.",
        steps: [
          {
            label: "Kontrolleri say",
            explanation: "Çap ve fiziksel koşullar eşitlenmiştir.",
            expression: "miyelin dışında eşit",
          },
          {
            label: "Etkiyi bağla",
            explanation: "Miyelin yalıtım ve boğumlu iletim katkısı sağlar.",
            expression: "A için daha hızlı iletim beklenir",
          },
          {
            label: "Sayısal sınırı koy",
            explanation: "Hız ölçümü veya oran verilmemiştir.",
            expression: "kaç kat belirlenemez",
          },
        ],
        answer: "A daha hızlı beklenir; sayısal hız oranı verilmez.",
        check:
          "Çaplar farklı olsaydı bu tek etkenli kısa yol yeterli olmayabilirdi.",
        pitfall: "Hızlı bekleniri her durumda tam iki kat diye değiştirme.",
      },
      {
        title: "Kas hedefi sinapsı değiştirir mi?",
        prompt:
          "Motor nöron ucu kas hücresine kimyasal haberci salıyor. Uç, aralık ve hedefin rolünü açıkla.",
        strategy: "Hücre sınırını ve iletim biçimini sırala.",
        steps: [
          {
            label: "Göndericiyi belirle",
            explanation: "Akson ucu presinaptik göndericidir.",
            expression: "motor nöron",
          },
          {
            label: "Aralığı geç",
            explanation: "Haberci salınıp aralıkta yayılır.",
            expression: "kimyasal ileti",
          },
          {
            label: "Hedefi eşleştir",
            explanation: "Kas uygun reseptörlerle sinyali alır.",
            expression: "nöromüsküler kavşak",
          },
        ],
        answer: "Bu bağlantı nöron-kas arasındaki özel kimyasal sinapstır.",
        check:
          "Akson içindeki yayılma ile aralıktaki kimyasal basamağı aynı olay sayma.",
        pitfall: "Hedef nöron değilse sinaps olamaz deme.",
      },
      {
        title: "Destek sözcüğü yeterli mi?",
        prompt:
          "MSS’de X hücresinin yalnız destek verdiği söyleniyor. Sonra X’in hücresel artıkları fagosite ettiği ekleniyor. Kesinlik nasıl değişir?",
        strategy:
          "İlk bilgiyle mümkün seçenekleri koru; ayırıcı ek veriyi kullan.",
        steps: [
          {
            label: "İlk veriyi sınırla",
            explanation: "Destek geniş bir işlev grubudur.",
            expression: "tek glia adı belirlenmez",
          },
          {
            label: "Ek veriyi seç",
            explanation: "Fagositoz ve savunma belirleyici rol verir.",
            expression: "artıkların uzaklaştırılması",
          },
          {
            label: "Eşleştir",
            explanation: "Bu rol mikroglia ile ilişkilidir.",
            expression: "X: mikroglia ile uyumlu",
          },
        ],
        answer:
          "İlk bilgi yetersiz; ek fagositoz bilgisi mikroglia seçimini destekler.",
        check: "Glia türünü yalnız çizimdeki renkten seçmediğini denetle.",
        pitfall: "Destek kelimesini otomatik astrosit yapmak için kullanma.",
      },
    ],
    recall: [
      {
        prompt: "MSS ve duyu aynı sınıflandırma mıdır?",
        answer:
          "Hayır. MSS anatomik bölge, duyu nöronu bilgi taşıma görevidir.",
      },
      {
        prompt: "Ranvier boğumunda miyelin var mıdır?",
        answer:
          "Boğum komşu miyelin segmentleri arasındaki açık akson zarıdır.",
      },
      {
        prompt: "Hangi koşul oligodendrosit/Schwann ayrımını yapar?",
        answer: "Miyelinlenecek aksonun MSS veya ÇSS konumu.",
      },
      {
        prompt: "Her kimyasal sinaps yalnız iki nöron arasında mıdır?",
        answer: "Hayır. Nöron-kas ve nöron-bez bağlantıları da olabilir.",
      },
    ],
    questions: [
      {
        id: "f015-bio-sinir-sistemi-noron-ve-glialar-1",
        prompt: {
          tr: "Tipik çok kutuplu nöron çiziminde çekirdekli gövdeden çıkan uzun uzantı, bilgiyi uzak akson uçlarına taşıyor. Bu yapı hangisidir?",
        },
        options: [
          {
            tr: "Akson",
          },
          {
            tr: "Yalnız çekirdek",
          },
          {
            tr: "BOS boşluğu",
          },
          {
            tr: "Bir sinir demetinin tamamı",
          },
          {
            tr: "Mikroglianın fagositoz kesesi",
          },
        ],
        answer: 0,
        hint: {
          tr: "Yapıyı yalnız uzunlukla değil verilen iletim yönüyle eşleştir.",
        },
        explanation: {
          tr: "Gövde bağlantısı ve uçlara giden iletim görevi aksonu tanımlar. Tipik şema bütün nöronların tek bir şekle sahip olduğu anlamına gelmez.",
        },
        skill: "f015-sinir-sistemi-noron-ve-glialar-1",
      },
      {
        id: "f015-bio-sinir-sistemi-noron-ve-glialar-2",
        prompt: {
          tr: "Omurilik içindeki bir akson ile periferik ayak siniri aksonunda miyelin oluşumundan sorumlu temel glialar sırasıyla hangileridir?",
        },
        options: [
          {
            tr: "Schwann ve oligodendrosit",
          },
          {
            tr: "Oligodendrosit ve Schwann",
          },
          {
            tr: "Mikroglia ve ependim",
          },
          {
            tr: "Ependim ve astrosit",
          },
          {
            tr: "Yalnız her ikisinde mikroglia",
          },
        ],
        answer: 1,
        hint: {
          tr: "Önce merkezî/çevresel konumu ayır.",
        },
        explanation: {
          tr: "Omurilik MSS, periferik ayak siniri ÇSS kapsamındadır. Miyelin oluşumunda MSS’de oligodendrosit, ÇSS’de Schwann eşleştirilir; diğer glia rolleri bu işlevin yerine geçmez.",
        },
        skill: "f015-sinir-sistemi-noron-ve-glialar-2",
      },
      {
        id: "f015-bio-sinir-sistemi-noron-ve-glialar-3",
        prompt: {
          tr: "MSS’de hücresel artıkları ve yabancı parçaları fagositozla uzaklaştıran glia hangi rolüyle tanınır?",
        },
        options: [
          {
            tr: "Ependim: temel periferik miyelin yapımı",
          },
          {
            tr: "Schwann: BOS boşluklarını döşeme",
          },
          {
            tr: "Mikroglia: savunma ve fagositoz",
          },
          {
            tr: "Oligodendrosit: yalnız kasın kasılması",
          },
          {
            tr: "Astrosit: bütün nöronların aksonu olma",
          },
        ],
        answer: 2,
        hint: {
          tr: "Verilen özgül işlevi seç.",
        },
        explanation: {
          tr: "Fagositoz ve savunma mikroglianın ayırıcı işlevlerindendir. Yalnız genel destek sözcüğünden kesin tür seçmek yerine özgül görev kullanılmalıdır.",
        },
        skill: "f015-sinir-sistemi-noron-ve-glialar-3",
      },
      {
        id: "f015-bio-sinir-sistemi-noron-ve-glialar-4",
        prompt: {
          tr: "İki aksonun çapı, sıcaklığı ve diğer ilgili koşulları eşit; A sağlam miyelinli, B miyelinsiz. Hangi çıkarım uygundur?",
        },
        options: [
          {
            tr: "A her koşulda tam iki kat hızlıdır",
          },
          {
            tr: "B daha güçlü uyarılırsa yapısal hız farkı zorunlu tersine döner",
          },
          {
            tr: "İkisinin hızı yalnız çizimdeki renklerine bağlıdır",
          },
          {
            tr: "A’da daha hızlı iletim beklenir; kaç kat olduğu verilmemiştir",
          },
          {
            tr: "Miyelin bulunduğu için bütün nöronlar miyelinlidir",
          },
        ],
        answer: 3,
        hint: {
          tr: "Koşullu yön ile nicel oranı ayır.",
        },
        explanation: {
          tr: "Eşit diğer koşullarda miyelinin yalıtım ve boğumlu iletim katkısı daha yüksek hızı destekler. Ölçüm veya nicel ilişki olmadan belirli kat sayısı hesaplanamaz.",
        },
        skill: "f015-sinir-sistemi-noron-ve-glialar-4",
      },
      {
        id: "f015-bio-sinir-sistemi-noron-ve-glialar-5",
        prompt: {
          tr: "Ranvier boğumu için hangi ifade doğrudur?",
        },
        options: [
          {
            tr: "Miyelinin her zaman en kalın yeridir",
          },
          {
            tr: "Her nöronun çekirdeğinin adıdır",
          },
          {
            tr: "Bütün sinir demetini tek hücre yapan yapıdır",
          },
          {
            tr: "Kasın doğrudan DNA’sıdır",
          },
          {
            tr: "Miyelin segmentleri arasındaki açık akson zarı bölgesidir",
          },
        ],
        answer: 4,
        hint: {
          tr: "Boğum ile onu çevreleyen miyelin segmentini ayır.",
        },
        explanation: {
          tr: "Ranvier boğumunda akson zarı miyelin segmentleri arasında açıktadır. Boğumu kılıfın kalınlaşmış bölgesi diye tanımlamak anatomik ilişkiyi ters çevirir.",
        },
        skill: "f015-sinir-sistemi-noron-ve-glialar-5",
      },
      {
        id: "f015-bio-sinir-sistemi-noron-ve-glialar-6",
        prompt: {
          tr: "Derideki reseptörden merkezî sinir sistemine doğru bilgi taşıyan nöronun görevi ve yönü hangisidir?",
        },
        options: [
          {
            tr: "Duyu nöronu; afferent",
          },
          {
            tr: "Motor nöron; yalnız efferent",
          },
          {
            tr: "Kas hücresi; afferent nöron",
          },
          {
            tr: "Oligodendrosit; doğrudan motor yanıt",
          },
          {
            tr: "Ependim; çevresel kas siniri",
          },
        ],
        answer: 0,
        hint: {
          tr: "Bilginin merkeze mi merkezden uzağa mı gittiğini izle.",
        },
        explanation: {
          tr: "Reseptörden merkeze taşıma duyu yani afferent işlevdir. Motor/efferent yol merkezden efektöre gider; hedef kasın kendisi nöron değildir.",
        },
        skill: "f015-sinir-sistemi-noron-ve-glialar-6",
      },
      {
        id: "f015-bio-sinir-sistemi-noron-ve-glialar-7",
        prompt: {
          tr: "Motor nöron kimyasal haberciyi kas hücresine aktarıyor. Hangi bağlantı tanımı uygundur?",
        },
        options: [
          {
            tr: "Hedef kas olduğundan sinaps değildir",
          },
          {
            tr: "Nöromüsküler kavşak, özel bir kimyasal sinaps",
          },
          {
            tr: "Yalnız nöronun tek aksonu içindeki yayılmadır",
          },
          {
            tr: "Miyelin segmentinin başka adıdır",
          },
          {
            tr: "Bütün aktarımlar için zorunlu elektriksel sinaps",
          },
        ],
        answer: 1,
        hint: {
          tr: "Gönderici ve alıcı hücreleri ayrı belirle.",
        },
        explanation: {
          tr: "Nöron-kas kimyasal bağlantısı nöromüsküler kavşaktır. Sinaps yalnız nöron-nöron ilişkisinden ibaret değildir; akson içindeki yayılmayla aynı basamak da değildir.",
        },
        skill: "f015-sinir-sistemi-noron-ve-glialar-7",
      },
      {
        id: "f015-bio-sinir-sistemi-noron-ve-glialar-8",
        prompt: {
          tr: "Bir glia için yalnız “MSS’de destek veriyor” bilgisi var. Hangi yaklaşım uygundur?",
        },
        options: [
          {
            tr: "Kesin Schwann demek",
          },
          {
            tr: "Kesin mikroglia demek",
          },
          {
            tr: "Özgül türü seçmeden önce işlev ve konum hakkında ayırıcı veri istemek",
          },
          {
            tr: "Bütün gliaların aynı hücre olduğunu söylemek",
          },
          {
            tr: "Renginden kesin hücre adı çıkarmak",
          },
        ],
        answer: 2,
        hint: {
          tr: "Genel destek görevi birden fazla hücreyle uyumludur.",
        },
        explanation: {
          tr: "Genel destek tanımı tek glia türünü zorunlu kılmaz. Fagositoz, miyelin veya BOS gibi ek işlev bilgileri seçimi daraltabilir; belirsizliği kesin adla doldurmak yanlıştır.",
        },
        skill: "f015-sinir-sistemi-noron-ve-glialar-8",
      },
      {
        id: "f015-bio-sinir-sistemi-noron-ve-glialar-9",
        prompt: {
          tr: "Bir refleks yolunda duyu nöronu doğrudan motor nöronla tek merkezî sinaps kuruyor. Hangi iddia bu örnekle çürütülür?",
        },
        options: [
          {
            tr: "Bazı reflekslerde ara nöron bulunabildiği",
          },
          {
            tr: "Duyu ve motorun farklı görev adları olduğu",
          },
          {
            tr: "Kasın efektör olabildiği",
          },
          {
            tr: "Her refleksin duyu ve motor arasında zorunlu ara nöron içerdiği",
          },
          {
            tr: "Sinapsın hücreler arası bağlantı olduğu",
          },
        ],
        answer: 3,
        hint: {
          tr: "Evrensel her iddiası için tek uygun karşı örnek yeter.",
        },
        explanation: {
          tr: "Verilen tek sinapslı devre ara nöronsuz duyu-motor bağlantısı içerir. Bu, tüm reflekslerin aynı olduğu veya başka devrelerde ara nöron bulunamayacağı anlamına gelmez.",
        },
        skill: "f015-sinir-sistemi-noron-ve-glialar-9",
      },
      {
        id: "f015-bio-sinir-sistemi-noron-ve-glialar-10",
        prompt: {
          tr: "Akson A miyelinli ve ince, B miyelinsiz ve kalındır. Sayısal hız modeli veya ölçüm yok. Hangi sonuç en uygun kapsamı korur?",
        },
        options: [
          {
            tr: "A her durumda daha hızlıdır",
          },
          {
            tr: "B her durumda tam beş kat hızlıdır",
          },
          {
            tr: "Çap hiçbir koşulda etkili olamaz",
          },
          {
            tr: "Miyelin varsa sıcaklığın hiçbir etkisi olamaz",
          },
          {
            tr: "Etkenler karşıt yönde olduğundan yalnız bu verilerle kesin hız sıralaması yapılamaz",
          },
        ],
        answer: 4,
        hint: {
          tr: "Tek bir olumlu etkeni diğerlerinden bağımsız kesin hükme çevirmeme.",
        },
        explanation: {
          tr: "Miyelin ve çap iletim hızını etkileyebilir; karşılaştırmanın nicel etkileri ve başka fizyolojik koşullar verilmemiştir. Bu yüzden tek sözcüğe bakarak kesin hız sırası uydurulmaz.",
        },
        skill: "f015-sinir-sistemi-noron-ve-glialar-10",
      },
    ],
  },
  {
    id: "sinir-sistemi-aksiyon-potansiyeli",
    topic: "detail-286",
    title: "Aksiyon potansiyeli: gerilimi, iyonu ve zamanı birlikte izle",
    source:
      "MEBİ AYT Biyoloji, basılı s. 11–13 (PDF 13–15); OGM Sinir Sistemi I, PDF 12–15; Aurelia AYT 004, PDF 1–9. Değerler belirtilen öğretim modelleridir; özgün sorular resmî sınav sorusu değildir.",
    minutes: 44,
    objectives: [
      "Zar potansiyelinin işaretini ve grafiğin evresini iyon yönleriyle açıkla.",
      "Hızlı kanal akışı ile ATP kullanan pompanın rolünü ayır.",
      "Tek AP genliği, frekans, hız ve toplam gecikmeyi farklı birimlerle karşılaştır.",
    ],
    sections: [
      {
        title: "Gerilim, içeride kaç iyon bulunduğunun başka adı değildir",
        paragraphs: [
          "Zar potansiyeli bu derste hücre içi elektriksel potansiyel eksi hücre dışı potansiyel olarak tanımlanır. −70 mV, hücre içinin dışına göre 70 mV daha negatif olduğunu söyler. mV milivolttur; 1 mV=0,001 V. Bu işareti toplam iyon sayısıyla karıştırma: zarın yakınındaki küçük yük ayrımı potansiyel farkı oluşturur; hücrenin bütün iç ve dış sıvısı tek tür elektrik yüküyle dolu değildir.",
          "Örnek bir nöronda Na⁺ dışta, K⁺ içte daha yüksek derişimde olabilir. İyonların hareketinde hem derişim hem elektriksel etki, yani elektrokimyasal gradyan önemlidir. Dinlenme değeri bütün nöronlarda zorunlu −70, eşik de her zaman −55 değildir. Soruda verilen referans ve değerleri kullan; negatif sayılarda −50’nin −60’tan daha büyük olduğunu koru.",
        ],
      },
      {
        title: "Pompa gradyanı korur; hızlı tepeyi doğrudan yapmaz",
        paragraphs: [
          "Na⁺/K⁺-ATPaz her tam çevrimde ATP kullanarak üç Na⁺’u dışarı, iki K⁺’u içeri taşır. Bu, uzun vadeli iyon derişim farklarının korunmasına katkı verir. Dinlenme potansiyelinde seçici geçirgenlik ve sızıntı kanalları da önemlidir; yalnız pompa çalışıyor diye bütün elektriksel olayların aynı mekanizmayla oluştuğu söylenemez.",
          "Depolarizasyonun hızlı Na⁺ girişi uygun voltaj kapılı kanallardan, mevcut elektrokimyasal etkiyle gerçekleşir. Kanal üzerinden bu geçiş doğrudan ATP hidrolizi yapan pompa çevrimi değildir. Pompanın engellenmesi gradyanları zamanla bozabilir; mevcut gradyanlar nedeniyle tek bir AP’nin aynı anda mutlaka olanaksızlaştığı sonucu çıkmaz. Bir AP bütün Na⁺ ve K⁺ stoklarını yer değiştirmez.",
        ],
      },
      {
        title: "Eşik bir koşuldur; uyaran birimini gerilimle eşitleme",
        paragraphs: [
          "Bir yerel depolarizasyon, uygun kanal ve zaman koşullarında eşik düzeyine ulaştığında kendini güçlendiren AP başlatabilir. Örnek eşik −55 mV ise −60 mV daha negatiftir ve bu ölçüm eşik altında kalır; −50 mV ise daha pozitiftir. Verilen örnekte −70’ten eşiğe 15 mV, −50’ye 20 mV değişim vardır. Mutlak sayıların büyüklüğünü alıp negatif işaretleri atma.",
          "Uyaran şiddeti ile zar potansiyeli aynı nicelik değildir. Soruda bir uyaranın zarı hangi gerilime getirdiği açık verilirse gerilim karşılaştırılabilir. Aynı son gerilim farklı refrakter evrede farklı uyarılabilirlik anlamına gelebilir. Eşik üzeri sözü tek başına her anda ve her akson koşulunda yeni AP garantisi değildir; modelin diğer koşullarını oku.",
        ],
      },
      {
        title: "Depolarizasyon, repolarizasyon ve hiperpolarizasyon",
        paragraphs: [
          "Tipik akson AP’sinde voltaj kapılı Na⁺ kanallarının açılması içe Na⁺ akışını artırır; zar potansiyeli hızla daha pozitife gider. Sonra Na⁺ kanalları inaktive olurken daha geç açılan K⁺ kanalları dışa K⁺ akışını artırır. Hücre içinin pozitif yük kaybetmesi potansiyelin düşmesine, yani repolarizasyona katkı verir. Repolarizasyonu Na⁺ pompasının anlık dışarı boşaltması diye çizme.",
          "K⁺ geçirgenliği bir süre yüksek kaldığında potansiyel dinlenme düzeyinin altına, örneğin −80 mV’ye inebilir; bu hiperpolarizasyondur. Sonra dinlenme koşullarına yaklaşılır. Tek bir −30 mV ölçümü yükselişte de inişte de bulunabilir; fazı seçmek için zaman, eğim ve tepeye göre konum gerekir. +25’ten −40’a tepe sonrası düşüşte değişim −65 mV’dir; bu, son potansiyelin −65 olduğu anlamına gelmez.",
        ],
      },
      {
        title:
          "Refrakterlik kanalların yeniden kullanılabilirliğiyle ilgilidir",
        paragraphs: [
          "Mutlak refrakter dönemde ilgili Na⁺ kanalları yeni AP başlatmaya uygun durumda değildir; çok güçlü ikinci uyaran da aynı yerde ikinci AP’yi zorunlu başlatmaz. Göreli dönemde K⁺ geçirgenliği ve kanal durumları nedeniyle normalden güçlü uyaran gerekebilir. İlk uyaranın öncesindeki eşik yorumunu iyileşmenin her anına değişmeden taşıma.",
          "Yerel akımlar komşu zar bölgelerinin eşiğe ulaşmasına katkı verir; arka bölgenin refrakterliği normal yayılmanın yönünü destekler. Bu, elektriksel sinyalin sıvı içinde bir paket madde gibi taşınması değildir. Uygun koşullarda akson zarı boyunca AP yeniden oluşturulur. Bir uyaranın ardından kanal durumları ve iyon gradyanları ilişkili olsa da yeniden uyarılmayı yalnız bütün pompa çevrimleri bitince olur diye açıklama.",
        ],
      },
      {
        title: "Genlik, frekans ve etkin hücre sayısı farklıdır",
        paragraphs: [
          "Aynı akson ve aynı uygun fizyolojik koşullarda eşik üstü uyaranlar tek AP’nin genliğini uyaranla orantılı biçimde büyütmez; bu ya hep ya hiç yaklaşımıdır. Şiddetli duyusal bilgi daha sık AP, daha uzun etkinlik veya daha çok nöronun katılımıyla kodlanabilir. Tek bir impulsun yüksekliği ile bir süre içinde oluşan impulsların sayısını ayrı değerlendir.",
          "Frekans birim zamandaki impuls sayısıdır; Hz=s⁻¹. Eşit bir saniyelik kayıtta 20 ve 40 impuls, 20 ve 40 Hz’dir. Bu veriden ikinci kaydın her AP’sinin genliğinin veya akson hızının iki kat olduğu çıkmaz. Sinir demetinde farklı eşiklere sahip liflerin sırayla katılması toplam kaydı değiştirebilir; bütün demeti tek bir aksonun ya hep ya hiç grafiği gibi çizme.",
        ],
      },
      {
        title: "Miyelinli iletimde boğumlar arasında ne olur?",
        paragraphs: [
          "Miyelin akson zarının elektriksel özelliklerini değiştirerek yerel akımın uygun mesafeye yayılmasını destekler. AP’ler Ranvier boğumlarında yeniden oluşturulur; bu örüntüye atlamalı iletim denir. Madde, nörotransmitter veya tek bir Na⁺ iyonu bir boğumdan ötekine havada atlamaz. Miyelinsiz aksonlarda da zar boyunca elektriksel yayılma ve yeniden oluşturma mümkündür.",
          "Çap, miyelin ve fizyolojik koşullar hızı etkileyebilir. Eşit diğer koşullarda kalınlık veya iyi işleyen miyelin hızlı iletimi destekler; sırf çizimde daha çok boğum bulunması kesin hız sırası vermez. Uzunluk, boğum aralığı ve akson özellikleri gerekir. Uyaranı güçlendirmek aynı sağlam aksonun hızını zorunlu artıran bir yöntem değildir.",
        ],
      },
      {
        title: "Akson hızı ile hedefe varış süresini ayır",
        paragraphs: [
          "Hız yolun süreye oranıdır: 2 cm=0,02 m ve 2 ms=0,002 s verilirse v=10 m/s bulunur. Bir yolda birden fazla akson bölümü ve kimyasal sinaps varsa toplam gecikme, her bölümün L/v süresi ile verilen sinaps gecikmelerinin toplamıdır. Daha çok sinaps eklemek aynı aksonun m/s değerini zorunlu düşürmeden hedefe varışı geciktirebilir.",
          "Etkileşimde gerilim eğrisi bir örnek AP’yi, ikinci uyaran alanı ayrı bir uyarılabilirlik koşulunu gösterir. Akış kendiliğinden başlamaz; isteyen bir kez oynatabilir veya zaman sürgüsünü kullanabilir. Temsili ms değerleri bir gerçek nöron ölçümü veya kişisel performans değildir. Hareket kapalıyken bütün fazlar kontrolle seçilebilir; animasyon süresi öğrenme puanı oluşturmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Negatif sayıda eşik nerede?",
        prompt:
          "Dinlenme −70 mV, eşik −55 mV. Uygun ve refrakter olmayan aynı akson iki ayrı denemede −60 ve −50 mV’ye getiriliyor. Hangi ölçüm AP başlangıcıyla uyumludur?",
        strategy: "Aynı referansta negatif gerilimleri sırala.",
        steps: [
          {
            label: "Sırala",
            explanation: "Daha az negatif sayı daha büyüktür.",
            expression: "−70<−60<−55<−50",
          },
          {
            label: "İlk denemeyi denetle",
            explanation: "−60, eşiğin daha negatif tarafındadır.",
            expression: "−60<−55",
          },
          {
            label: "İkincisini denetle",
            explanation: "−50, eşiğin daha pozitif tarafındadır.",
            expression: "−50>−55",
          },
        ],
        answer: "İlk eşik altında; ikinci uygun koşulda AP başlatabilir.",
        check:
          "İkinci olay mutlak refrakter dönemde olsaydı aynı karşılaştırma tek başına yetmezdi.",
        pitfall: "60>55 diye eksi işaretlerini silme.",
      },
      {
        title: "Tepe sonrasındaki değişim",
        prompt:
          "Bir AP’nin tepesinden sonra potansiyel +25 mV’den −40 mV’ye düşüyor. Değişim ve baskın hızlı iyon yönü nedir?",
        strategy: "Son−ilk hesabını yap, sonra iyonun işaretini kullan.",
        steps: [
          {
            label: "Farkı yaz",
            explanation: "Gerilim farkı son değer eksi ilk değerdir.",
            expression: "−40−(+25)=−65 mV",
          },
          {
            label: "Fazı tanı",
            explanation: "Tepe sonrası aşağı eğim repolarizasyonla uyumludur.",
            expression: "potansiyel düşüyor",
          },
          {
            label: "İyonu bağla",
            explanation:
              "Pozitif K⁺’un dışarı çıkması hücre içini daha negatif yapar.",
            expression: "K⁺ dışarı",
          },
        ],
        answer: "−65 mV değişim; repolarizasyonda K⁺ dışarı akışı.",
        check: "−65 değişimdir; son potansiyel −40 mV olarak kalır.",
        pitfall:
          "Na⁺ pompasını hızlı repolarizasyonun tek doğrudan mekanizması sayma.",
      },
      {
        title: "On pompa çevrimi",
        prompt:
          "Her çevrim 3 Na⁺ dışarı, 2 K⁺ içeri ve 1 ATP hidrolizi olan ideal pompa on tam çevrim yapıyor. Taşınma sayıları nedir?",
        strategy: "Her çevrim katkısını ayrı çarp.",
        steps: [
          {
            label: "Sodyumu say",
            explanation: "On çevrimde her biri üç Na⁺ taşır.",
            expression: "10×3=30 Na⁺ dışarı",
          },
          {
            label: "Potasyumu say",
            explanation: "Her çevrim iki K⁺ taşır.",
            expression: "10×2=20 K⁺ içeri",
          },
          {
            label: "Enerjiyi say",
            explanation: "Her tam çevrim bir ATP hidrolizi varsayılmıştır.",
            expression: "10 ATP",
          },
        ],
        answer: "30 Na⁺ dışarı, 20 K⁺ içeri, 10 ATP.",
        check:
          "Bu sayılar bir AP’de geçen toplam iyon sayısını veya bütün hücrenin enerji bütçesini vermez.",
        pitfall: "Kanalın pasif akışını pompa çevrimi gibi sayma.",
      },
      {
        title: "Sinaps hızı mı, toplam gecikme mi?",
        prompt:
          "0,02 m akson bölümü 10 m/s hızla iletiyor; ardından iki kimyasal sinapsın her biri 0,5 ms gecikme ekliyor. Başka gecikme yok varsayılıyor. Toplam süre nedir?",
        strategy:
          "Akson süresini aynı zaman birimine çevirip gecikmeleri ekle.",
        steps: [
          {
            label: "Aksonu böl",
            explanation: "L/v ile süre bulunur.",
            expression: "0,02/10=0,002 s=2 ms",
          },
          {
            label: "Sinapsları topla",
            explanation: "İki eş gecikme vardır.",
            expression: "2×0,5=1 ms",
          },
          {
            label: "Birleştir",
            explanation: "Aynı yoldaki süreleri topla.",
            expression: "2+1=3 ms",
          },
        ],
        answer: "Toplam 3 ms; aksonun verilen hızı 10 m/s olarak kalır.",
        check:
          "Ek kas veya başka yol gecikmeleri soruda dışlandığı için sayılmadı.",
        pitfall: "Daha çok sinapsı aynı aksonun hızını düşürme diye tanımlama.",
      },
    ],
    recall: [
      {
        prompt: "−50 mV neden −60 mV’den büyüktür?",
        answer: "Aynı referansta daha az negatiftir; sayı doğrusunda sağdadır.",
      },
      {
        prompt: "Hızlı depolarizasyonu doğrudan hangi geçiş destekler?",
        answer:
          "Uygun voltaj kapılı Na⁺ kanallarından içeri akış; ATPazın dışarı pompalaması değil.",
      },
      {
        prompt:
          "Mutlak refrakter dönemde daha güçlü ikinci uyaran yeterli midir?",
        answer: "Hayır. İlgili kanal durumu yeni AP başlatmaya uygun değildir.",
      },
      {
        prompt: "AP genliği sabitken frekans değişebilir mi?",
        answer:
          "Evet. Tek tepe yüksekliği ile eşit zamanda oluşan impuls sayısı farklı niceliklerdir.",
      },
    ],
    questions: [
      {
        id: "f015-bio-sinir-sistemi-aksiyon-potansiyeli-1",
        prompt: {
          tr: "Refrakter olmayan örnek aksonun eşiği −55 mV’dir. Uyaran sonrası potansiyel −60 mV ölçülüyor. Hangi yorum uygundur?",
        },
        options: [
          {
            tr: "Verilen modelde eşik henüz aşılmamıştır",
          },
          {
            tr: "60 sayısı 55’ten büyük olduğu için eşik kesin aşılmıştır",
          },
          {
            tr: "Potansiyelin mutlak değeri eşiği belirler",
          },
          {
            tr: "Her negatif değer AP’yi zorunlu başlatır",
          },
          {
            tr: "Bu değer tek başına gerçek iletim hızını verir",
          },
        ],
        answer: 0,
        hint: {
          tr: "Negatif sayıları aynı referansta sırala.",
        },
        explanation: {
          tr: "−60<−55 olduğundan ölçüm eşik altındadır. İşaretleri silmek sıralamayı tersine çevirir; mV değeri aynı zamanda m/s hız ölçümü değildir.",
        },
        skill: "f015-sinir-sistemi-aksiyon-potansiyeli-1",
      },
      {
        id: "f015-bio-sinir-sistemi-aksiyon-potansiyeli-2",
        prompt: {
          tr: "Bir AP’nin tepesinden sonra zar potansiyeli +20 mV’den −60 mV’ye iniyor. Gerilim değişimi ve uygun baskın hızlı iyon akışı hangisidir?",
        },
        options: [
          {
            tr: "+80 mV; K⁺ içeri",
          },
          {
            tr: "−80 mV; K⁺ dışarı",
          },
          {
            tr: "−40 mV; yalnız ATP ile Na⁺ içeri",
          },
          {
            tr: "+40 mV; Ca²⁺ dışarı",
          },
          {
            tr: "−80 mV; bütün iyonlar zorunlu eşitlenir",
          },
        ],
        answer: 1,
        hint: {
          tr: "Son−ilk farkını ve pozitif iyon kaybını birlikte kullan.",
        },
        explanation: {
          tr: "−60−(+20)=−80 mV’dir. Tepe sonrası repolarizasyonda K⁺ dışarı akışı önemli rol oynar; bütün iyon derişimlerinin bir anda eşitlendiği sonucu çıkmaz.",
        },
        skill: "f015-sinir-sistemi-aksiyon-potansiyeli-2",
      },
      {
        id: "f015-bio-sinir-sistemi-aksiyon-potansiyeli-3",
        prompt: {
          tr: "Aynı grafikte yalnız −30 mV değeri görülüyor; önceki zamanlar ve eğim yok. Hangi sonuç uygundur?",
        },
        options: [
          {
            tr: "Kesin depolarizasyondur",
          },
          {
            tr: "Kesin repolarizasyondur",
          },
          {
            tr: "Fazı kesin seçmek için zaman yönü ve tepeye göre konum gerekir",
          },
          {
            tr: "Kesin dinlenme −70 mV’dir",
          },
          {
            tr: "Bu değer kesin 10 m/s hıza eşittir",
          },
        ],
        answer: 2,
        hint: {
          tr: "Aynı gerilim yükselişte ve düşüşte bulunabilir.",
        },
        explanation: {
          tr: "−30 mV bir potansiyel değeridir; aynı AP’nin yükselen ve alçalan kollarında görülebilir. Zaman veya eğim verilmeden tek faz kesinleştirilemez.",
        },
        skill: "f015-sinir-sistemi-aksiyon-potansiyeli-3",
      },
      {
        id: "f015-bio-sinir-sistemi-aksiyon-potansiyeli-4",
        prompt: {
          tr: "Na⁺/K⁺-ATPaz için bir çevrimde 3 Na⁺ dışarı, 2 K⁺ içeri ve 1 ATP kullanıldığı veriliyor. Beş tam çevrimde sonuç nedir?",
        },
        options: [
          {
            tr: "10 Na⁺ dışarı, 15 K⁺ içeri, 5 ATP",
          },
          {
            tr: "5 Na⁺ dışarı, 5 K⁺ içeri, 1 ATP",
          },
          {
            tr: "15 Na⁺ içeri, 10 K⁺ dışarı, 0 ATP",
          },
          {
            tr: "15 Na⁺ dışarı, 10 K⁺ içeri, 5 ATP",
          },
          {
            tr: "Bütün hücre iyonları eşitlenir",
          },
        ],
        answer: 3,
        hint: {
          tr: "Her çevrimin katsayısını beşle ayrı çarp.",
        },
        explanation: {
          tr: "5×3=15 Na⁺ dışarı, 5×2=10 K⁺ içeri ve 5 ATP bulunur. Bu pompa sayımıdır; bir AP’deki bütün iyon geçişleri veya toplam hücre enerjisi değildir.",
        },
        skill: "f015-sinir-sistemi-aksiyon-potansiyeli-4",
      },
      {
        id: "f015-bio-sinir-sistemi-aksiyon-potansiyeli-5",
        prompt: {
          tr: "Bir aksonda hızlı Na⁺ içe akışı, başka ölçümde ATP kullanarak Na⁺ dışa ve K⁺ içe taşıma gözleniyor. Doğru ayrım hangisidir?",
        },
        options: [
          {
            tr: "İkisi her durumda aynı pasif kanaldır",
          },
          {
            tr: "Hızlı içeri Na⁺ akışını doğrudan dışarı taşıyan pompa yapar",
          },
          {
            tr: "Pompa hiçbir koşulda ATP kullanmaz",
          },
          {
            tr: "İyon yönü iki olayda da zorunlu aynıdır",
          },
          {
            tr: "İlki uygun kanal akışı; ikincisi Na⁺/K⁺-ATPaz pompasıdır",
          },
        ],
        answer: 4,
        hint: {
          tr: "Yönü ve doğrudan enerji kullanımını ayır.",
        },
        explanation: {
          tr: "Depolarizasyondaki hızlı Na⁺ girişi uygun kanallardan elektrokimyasal hareketle olur. ATPaz gradyanı sürdürmek için farklı yönde ve ATP harcayarak taşır.",
        },
        skill: "f015-sinir-sistemi-aksiyon-potansiyeli-5",
      },
      {
        id: "f015-bio-sinir-sistemi-aksiyon-potansiyeli-6",
        prompt: {
          tr: "Aynı aksonun eşit 1 saniyelik iki kaydında 20 ve 40 AP var; tek AP genlikleri aynı. Hangi sonuç doğrudan bulunur?",
        },
        options: [
          {
            tr: "İkinci kaydın frekansı birincinin iki katıdır",
          },
          {
            tr: "İkinci kayıtta her AP iki kat genliklidir",
          },
          {
            tr: "Akson çapı kesin iki katına çıkmıştır",
          },
          {
            tr: "İletim hızı kesin iki katına çıkmıştır",
          },
          {
            tr: "İkinci kayıt hiç refrakter dönem içermez",
          },
        ],
        answer: 0,
        hint: {
          tr: "Eşit zamanda impuls sayısı frekansı belirler.",
        },
        explanation: {
          tr: "20/1=20 Hz ve 40/1=40 Hz; oran 2’dir. Sayı artışı tek AP’nin genliğini, akson çapını veya iletim hızını zorunlu olarak değiştirmez.",
        },
        skill: "f015-sinir-sistemi-aksiyon-potansiyeli-6",
      },
      {
        id: "f015-bio-sinir-sistemi-aksiyon-potansiyeli-7",
        prompt: {
          tr: "Aynı akson mutlak refrakter dönemde çok güçlü ikinci uyaran alıyor. Hangi ifade uygundur?",
        },
        options: [
          {
            tr: "Uyaran güçlü olduğu için her durumda ikinci AP oluşur",
          },
          {
            tr: "İlgili kanal durumu nedeniyle ikinci AP zorunlu başlatılamaz",
          },
          {
            tr: "Bütün iyon gradyanları kesin tamamen yoktur",
          },
          {
            tr: "İkinci AP’nin genliği mutlaka iki kat olur",
          },
          {
            tr: "Bu dönem bütün nöronlarda sabit 1 saniyedir",
          },
        ],
        answer: 1,
        hint: {
          tr: "Eşik kıyasına kanalın yeniden kullanılabilirliğini ekle.",
        },
        explanation: {
          tr: "Mutlak refrakterlikte ilgili Na⁺ kanalları yeni AP başlatmaya uygun değildir. Bu, bütün gradyanların yok olduğu veya sürenin bütün nöronlarda aynı olduğu anlamına gelmez.",
        },
        skill: "f015-sinir-sistemi-aksiyon-potansiyeli-7",
      },
      {
        id: "f015-bio-sinir-sistemi-aksiyon-potansiyeli-8",
        prompt: {
          tr: "2 cm yol, 2 ms sürede kat ediliyor. Verilen temsili iletim hızı kaç m/s’dir?",
        },
        options: [
          {
            tr: "0,01",
          },
          {
            tr: "1",
          },
          {
            tr: "10",
          },
          {
            tr: "100",
          },
          {
            tr: "1.000",
          },
        ],
        answer: 2,
        hint: {
          tr: "Santimetre ve milisaniyeyi SI birimlerine çevir.",
        },
        explanation: {
          tr: "2 cm=0,02 m; 2 ms=0,002 s. 0,02/0,002=10 m/s bulunur. Bu sorunun verisidir; her nöron için evrensel hız değildir.",
        },
        skill: "f015-sinir-sistemi-aksiyon-potansiyeli-8",
      },
      {
        id: "f015-bio-sinir-sistemi-aksiyon-potansiyeli-9",
        prompt: {
          tr: "Bir yolda akson iletimi 2 ms; iki kimyasal sinapsın her biri 0,5 ms gecikiyor. Başka gecikme yok. Toplam kaç ms’dir?",
        },
        options: [
          {
            tr: "1",
          },
          {
            tr: "2",
          },
          {
            tr: "2,5",
          },
          {
            tr: "3",
          },
          {
            tr: "4",
          },
        ],
        answer: 3,
        hint: {
          tr: "Süreleri aynı birimle topla.",
        },
        explanation: {
          tr: "Akson 2 ms, sinapslar toplam 1 ms verir; sonuç 3 ms’dir. Toplam varış gecikmesi ile aynı aksonun hızının değişmesi farklı yorumlardır.",
        },
        skill: "f015-sinir-sistemi-aksiyon-potansiyeli-9",
      },
      {
        id: "f015-bio-sinir-sistemi-aksiyon-potansiyeli-10",
        prompt: {
          tr: "Miyelinli aksonda atlamalı iletimi doğru anlatan ifade hangisidir?",
        },
        options: [
          {
            tr: "Bir Na⁺ iyonu bütün akson boyunca tek sıçramayla gider",
          },
          {
            tr: "Nörotransmitter her miyelin segmentinden havaya atılır",
          },
          {
            tr: "Miyelin varsa hiçbir iyon kanalı gerekmez",
          },
          {
            tr: "Her çizimde daha çok boğum kesin daha yüksek hız demektir",
          },
          {
            tr: "Elektriksel değişim boğumlarda yeniden oluşturulur; impuls maddesinin havada zıplaması değildir",
          },
        ],
        answer: 4,
        hint: {
          tr: "Sinyalin yayılması ile bir madde paketinin taşınmasını ayır.",
        },
        explanation: {
          tr: "Yerel akımlar ve Ranvier boğumlarındaki yeniden oluşum atlamalı iletim örüntüsünü açıklar. Hız için yapı ve koşullar gerekir; tek boğum sayısı yeterli değildir.",
        },
        skill: "f015-sinir-sistemi-aksiyon-potansiyeli-10",
      },
    ],
  },
  {
    id: "sinir-sistemi-on-beyin",
    topic: "detail-287",
    title: "Ön beyin: algı, davranış ve iç denge ağları",
    source:
      "MEBİ AYT Biyoloji, basılı s. 14–16 (PDF 16–18); OGM Sinir Sistemi I, PDF 16–17. Kaynakla karşılaştırılmış özgün anatomi modelleri ve öğretim soruları.",
    minutes: 44,
    objectives: [
      "Uç beyin ve ara beyin yapılarını işlevleriyle ilişkilendir.",
      "Duyusal aktarım, bilinçli yorum ve motor yanıtı seçili yolda ayır.",
      "Homeostatik düzenlemeyi tek merkez veya tek hormon açıklamasına indirgeme.",
    ],
    sections: [
      {
        title: "Ön beyin bir tek kutu değildir",
        paragraphs: [
          "Beyin gelişimsel olarak ön, orta ve arka bölümlerle incelenir. Ön beyin uç beyin ve ara beyinden oluşur. Uç beyin iki serebral yarımküreyi içerir; dıştaki korteks bu bütünün yüzey tabakasıdır. Bütün uç beyni yalnız korteksle eşitleme. Yarımkürelerin içindeki ak madde yolları ve daha derindeki gri madde yapıları da bağlantıların parçasıdır.",
          "Ara beyin içinde talamus, hipotalamus ve epitalamusla ilişkili yapılar ele alınır. Bir anatomik parça çok sayıda işlev ağına katılabilir. Modelde bölgeyi seçmek öğrenme amacıyla bir ilişkiyi öne çıkarır; başka bütün görevlerin o bölgede bulunmadığını veya işlevin tek başına o küçük kutuda gerçekleştiğini iddia etmez. Şeklin kesit yönü ve etiketleri her zaman birlikte okunmalıdır.",
        ],
      },
      {
        title: "Koruyucu yapılar ve beyin-omurilik sıvısı",
        paragraphs: [
          "Beyin ve omurilik merkezî sinir sistemini oluşturur; kemik yapılar, zarlar ve beyin-omurilik sıvısı korumaya katkı sağlar. Zarlar dıştan içe sert, örümceksi ve ince zar olarak adlandırılır. Örümceksi ile ince zar arasındaki boşlukta BOS bulunur; beyin ventrikülleri ve omurilik içindeki sıvı boşlukları da BOS dolaşımıyla ilişkilidir.",
          "BOS mekanik koruma, uygun çevre koşulları ve madde alışverişiyle ilişkilidir; sinir dokunun oksijen ve bütün besin gereksinimi yalnız BOS tarafından karşılanır denmez. Damarlar ve bariyer işlevleri de önemlidir. Kafatası, bir zar ve bir sıvı farklı koruma katmanlarıdır. Aynı kesitte görünmeleri aynı anatomik yapı oldukları anlamına gelmez.",
        ],
      },
      {
        title: "Korteksin lobları görev ağlarına katılır",
        paragraphs: [
          "Frontal bölgeler istemli hareket planlama ve denetimi, dikkat, karar ve sözel iletişim ağlarıyla ilişkilidir. Paryetal bölgeler bedensel duyuların işlenmesi ve mekânsal bütünleştirme; temporal bölgeler işitme, bellek ve dil ağları; oksipital bölgeler görsel işlemeyle ilişkilendirilir. Bu ilişkiler bir eğitim haritasıdır; her karmaşık davranışın yalnız tek loba ait olduğu anlamına gelmez.",
          "Merkezî oluğun önünde primer motor, arkasında primer somatosensoriyel korteks bulunur. Birincisi seçili hareket çıktılarıyla, ikincisi bedensel duyu girdileriyle ilişkilidir. Duyu organı ile duyunun beyinde işlendiği bölge aynı yapı değildir. Gözün ışığı algılaması, talamik aktarım ve görsel korteksin yorumlaması farklı ama bağlantılı basamaklardır.",
        ],
      },
      {
        title: "Talamus yalnız bir geçiş kablosu değildir",
        paragraphs: [
          "Talamus birçok duyusal bilginin kortekse iletilmesi ve düzenlenmesine katılır; motor ağlardan gelen bilgi alışverişinde ve uyanıklıkla ilişkili ağlarda da rol oynar. Okul düzeyinde koku dışındaki duyuların talamik aktarımı vurgulanır. Bu ifade, kokuyla ilgili bütün işlemlerde talamusun hiçbir bağlantısı yoktur diye sınırsız biçimde genişletilmemelidir.",
          "Koku bilgisinin ilk kortikal yolu tipik talamik ilk aktarmayı atlayabilir; daha sonraki bütünleştirme farklı bağlantılar içerebilir. Dokunma veya görme vakasında alıcı, yükselen yol, aktarım ve kortikal işleme ayrı gösterilir. Bir bilgi talamustan geçiyor diye nihai bilinçli yorum yalnız talamusta tamamlanmıştır sonucunu çıkarma.",
        ],
      },
      {
        title: "Hipotalamus iç dengeyi çoklu yollarla düzenler",
        paragraphs: [
          "Hipotalamus sıcaklık, su-osmotik denge, beslenme, günlük ritimler ve otonom-endokrin yanıtların bütünleştirilmesiyle ilişkilidir. Hipofizle bağlantısı önemli olsa da bütün etkileri yalnız hipofiz hormonları üzerinden gerçekleşmez. Sinirsel, hormonal ve davranışsal yanıtlar birlikte çalışabilir; tek bir duygu veya yeme davranışı yalnız bir hormona indirgenmez.",
          "Temsili bir termostat modelinde hedef 37 °C, ölçüm 38 °C ise fark +1 °C’dir ve ısı kaybını destekleyen yanıt yönü seçilebilir. Ölçüm 36 °C ise fark −1°C, ısı korunması/üretimi yönüyle ilişkilendirilir. Bu basit örnek gerçek kişinin ateş tanısı, güvenli sıcaklık sınırı veya tüm fizyolojik yanıtların hız hesabı değildir. Geri bildirimde amaç sapmayı azaltan uygun yanıtı bulmaktır.",
        ],
      },
      {
        title: "Epitalamus, epifiz ve günlük zamanlama",
        paragraphs: [
          "Epitalamus bölgesindeki epifiz melatonin salgısıyla günlük zamanlama ağlarına katılır. Işık-karanlık bilgisi, hipotalamik ritim düzenlenmesi, hormonlar ve davranış birbiriyle ilişkilidir. Melatonin ismi tek başına her uyku sorununun nedenini, çözümünü veya bütün uyku süresini vermez. Bir öğretim modeli ritimle ilişki kurar; kişiye ilaç veya doz seçmez.",
          "Uyku sırasında beyin bütünüyle kapanmaz; farklı evrelerde etkinlik örüntüleri değişir. Öğrenilen bilginin işlenmesi, bellek ve dinlenmeyle ilişkili süreçler gece boyunca sürer. Uç beyin ve talamus uykuda hiç etkin değildir gibi bir açıklama kullanılmaz. Işık koşulları ile zamanlama bağlantısını göstermek, herkes için aynı saatte aynı zorunlu uyku sonucu üretmek değildir.",
        ],
      },
      {
        title: "Sağ-sol ilişkisini seçili yol üzerinde göster",
        paragraphs: [
          "Birçok motor ve duyu yolunda çapraz bağlantılar bulunur; örneğin seçilen çapraz motor yol modelinde sol korteks sağ vücut tarafıyla ilişki kurabilir. Bütün sinyallerin aynı yerde çaprazlandığı veya her işlevin yalnız karşı tarafta temsil edildiği söylenmez. Bir soruda hangi yolun ve hangi çaprazlaşma noktasının verildiğini kullanmak gerekir.",
          "Nasırlı cisim serebral yarımküreler arasında çok sayıda akson bağlantısı içerir. Sağ beyinli veya sol beyinli kişi gibi tek taraflı kişilik/zekâ etiketleri bu anatomiden çıkarılamaz. İşlem ağları iki taraf ve başka bölgeler arasında iş bölümü yapar. Bir belirtiyi tek başına tek lezyonun kesin kanıtı saymak için bu basit harita yeterli değildir.",
        ],
      },
      {
        title: "Bir vaka çözümünü giriş, işlem ve çıkışa ayır",
        paragraphs: [
          "Bir hedefe uzanırken görsel girdi, mekânsal değerlendirme, hareket planı ve kas yanıtı aynı işin farklı parçalarıdır. Hangi bölge seçilecek sorusunda önce verilen işlevi daralt: ışığın reseptörde algılanması mı, görüntünün bilinçli yorumu mu, ani yönelme refleksi mi, yoksa hareketin düzeltmesi mi? Benzer görünüşlü durumlar farklı ağırlıklı yolları kullanabilir.",
          "Etkileşimde görev kartını değiştirerek ilgili ön beyin bölgesinin rolünü ve başka bölgelerle bağlantısını gör. Şekil anatomik ölçekli bir beyin taraması değildir; kesit ve lob görünümü birbirinden ayrılır. İlişkiyi gerekçelendirirken kanıtın sınırını eklemek, yalnız renkli bölgenin adını seçmekten daha güçlü öğrenme sağlar.",
        ],
      },
    ],
    examples: [
      {
        title: "Göz mü, görsel yorum mu?",
        prompt:
          "Bir kart ışığı algılayan reseptörü, başka kart görüntünün bilinçli işlenmesiyle ilişkili kortikal bölgeyi soruyor. Aynı cevap verilir mi?",
        strategy: "Girdi organı ile merkezî işlemeyi ayır.",
        steps: [
          {
            label: "İlk görevi tanı",
            explanation: "Işık önce görme alıcılarıyla algılanır.",
            expression: "reseptör düzeyi",
          },
          {
            label: "İkinci görevi tanı",
            explanation: "Bilinçli görsel işleme kortikal ağlarla ilişkilidir.",
            expression: "oksipital bölgeler",
          },
          {
            label: "Sınırı koru",
            explanation:
              "Göz bebeği refleksi veya başka işlev ayrı yol olabilir.",
            expression: "tek görme kutusu yok",
          },
        ],
        answer: "Aynı yapı değildir; alıcı ile oksipital görsel ağlar ayrılır.",
        check:
          "Reseptörün ayrıntılı hücre tipi sorulmadıkça başka üniteyi varsayma.",
        pitfall: "Işık geçen her aşamayı yalnız göz veya yalnız talamus sayma.",
      },
      {
        title: "İç denge sapmasının yönü",
        prompt:
          "Temsili hipotalamik sıcaklık modelinde hedef 37 °C. A durumunda 38 °C, B durumunda 36 °C ölçülüyor. Sapma ve uygun genel yanıt yönleri nedir?",
        strategy: "Ölçüm−hedef farkını bul; sapmayı azaltan yönü seç.",
        steps: [
          {
            label: "A’yı hesapla",
            explanation: "Ölçüm hedeften yüksektir.",
            expression: "38−37=+1°C",
          },
          {
            label: "B’yi hesapla",
            explanation: "Ölçüm hedeften düşüktür.",
            expression: "36−37=−1°C",
          },
          {
            label: "Yanıtı bağla",
            explanation:
              "A’da ısı kaybını, B’de ısı korunması/üretimini destekleyen yön beklenir.",
            expression: "negatif geri bildirim",
          },
        ],
        answer: "A+1°C: ısı kaybı yönü; B−1°C: ısı korunması/üretimi yönü.",
        check:
          "Bu değerler bir ders modelidir; klinik tanı veya kişisel sıcaklık hedefi değildir.",
        pitfall:
          "Farkın işaretini yanıtın mutlaka daha da artırılmasıyla eşleme.",
      },
      {
        title: "Aktarım merkezi nihai yorum mudur?",
        prompt:
          "Dokunma bilgisi bir talamik aktarımdan sonra ilgili kortikal bölgeye ulaşıyor. Talamus ve paryetal yüzey için nasıl bir ayrım yapılır?",
        strategy: "İşlevleri aynı yolun ayrı basamakları olarak yerleştir.",
        steps: [
          {
            label: "Girdiyi tanı",
            explanation: "Dokunma bilgisi merkeze taşınır.",
            expression: "duyusal girdi",
          },
          {
            label: "Aktarımı belirle",
            explanation:
              "Talamus bu seçili yolun aktarım/düzenlemesine katılır.",
            expression: "talamik basamak",
          },
          {
            label: "İşlemeyi bağla",
            explanation: "Bedensel duyu korteksi paryetal bölgede bulunur.",
            expression: "somatosensoriyel işleme",
          },
        ],
        answer:
          "Talamik aktarım ile kortikal bedensel duyu işleme farklı ama bağlantılı rollerdir.",
        check: "Bütün duyular ve bütün yollar aynı şemaya zorlanmaz.",
        pitfall: "Bir merkezden geçmeyi bütün işlevin orada bittiği sayma.",
      },
      {
        title: "Bir yolun çaprazlaşmasını izle",
        prompt:
          "Verilen soyut motor şemada sol korteksten çıkan yol bir kez çaprazlanıp sağ el kasına gidiyor. Şemaya göre hedef taraf hangisidir?",
        strategy: "Verilen yolu izle; bütün sinirlere evrensel kural ekleme.",
        steps: [
          {
            label: "Başlangıcı bul",
            explanation: "Çıkış sol kortekstir.",
            expression: "sol",
          },
          {
            label: "Çaprazı izle",
            explanation: "Şemada bir kez karşıya geçer.",
            expression: "sol→sağ",
          },
          {
            label: "Hedefi adlandır",
            explanation: "Gösterilen uç sağ el kasıdır.",
            expression: "sağ el",
          },
        ],
        answer: "Bu seçili modelde sağ el.",
        check:
          "Şema diğer bütün yolakların aynı noktada çaprazlandığını göstermez.",
        pitfall:
          "Sağ-sol anatomisinden tek taraflı kişilik veya zekâ sonucu çıkarma.",
      },
    ],
    recall: [
      {
        prompt: "Korteks bütün uç beynin başka adı mıdır?",
        answer:
          "Hayır. Korteks uç beynin dış yüzey tabakasıdır; bütün yapı bundan ibaret değildir.",
      },
      {
        prompt: "Hipotalamusun bütün etkileri yalnız hipofizle mi olur?",
        answer:
          "Hayır. Otonom, hormonal ve davranışsal yollar birlikte rol oynayabilir.",
      },
      {
        prompt: "Uyku beynin bütünüyle kapanması mıdır?",
        answer:
          "Hayır. Etkinlik örüntüleri ve evreler değişir; işlem ve düzenleme sürer.",
      },
      {
        prompt: "Bir duyu yolunun talamustan geçmesi neyi göstermez?",
        answer:
          "Bütün bilinçli yorumun yalnız talamusta tamamlandığını göstermez.",
      },
    ],
    questions: [
      {
        id: "f015-bio-sinir-sistemi-on-beyin-1",
        prompt: {
          tr: "Ön beynin temel bölümleri hangi seçenekte doğru verilmiştir?",
        },
        options: [
          {
            tr: "Uç beyin ve ara beyin",
          },
          {
            tr: "Yalnız pons ve omurilik",
          },
          {
            tr: "Yalnız beyincik ve omurilik soğanı",
          },
          {
            tr: "Yalnız çevresel sinirler",
          },
          {
            tr: "Yalnız reseptör ve kas",
          },
        ],
        answer: 0,
        hint: {
          tr: "Gelişimsel üst bölümü onun alt bölümleriyle eşleştir.",
        },
        explanation: {
          tr: "Ön beyin uç beyin ve ara beyinle incelenir. Pons, beyincik ve omurilik soğanı arka beyin bağlamındadır; periferik sinirler bu bölümlerin başka adları değildir.",
        },
        skill: "f015-sinir-sistemi-on-beyin-1",
      },
      {
        id: "f015-bio-sinir-sistemi-on-beyin-2",
        prompt: {
          tr: "Korteks için doğru ifade hangisidir?",
        },
        options: [
          {
            tr: "Bütün uç beynin yalnızca başka adıdır",
          },
          {
            tr: "Uç beynin yüzey tabakasıdır; bütün uç beyinle özdeş değildir",
          },
          {
            tr: "Periferik aksonların oluşturduğu tek gangliyondur",
          },
          {
            tr: "Yalnız BOS’un kimyasal adıdır",
          },
          {
            tr: "Omurilik ön kökünün aynısıdır",
          },
        ],
        answer: 1,
        hint: {
          tr: "Yüzey tabakası ile bütün yapıyı ayır.",
        },
        explanation: {
          tr: "Korteks yüzey katmanıdır; uç beyin ayrıca iç bağlantı yolları ve derin yapılar içerir. Bir parça ile bütünün eşitlenmesi anatomik kapsam hatasıdır.",
        },
        skill: "f015-sinir-sistemi-on-beyin-2",
      },
      {
        id: "f015-bio-sinir-sistemi-on-beyin-3",
        prompt: {
          tr: "Bilinçli görsel bilginin işlenmesiyle özellikle ilişkili kortikal bölge hangisidir?",
        },
        options: [
          {
            tr: "Yalnız periferik gangliyon",
          },
          {
            tr: "Yalnız omurilik ön kökü",
          },
          {
            tr: "Oksipital bölgeler",
          },
          {
            tr: "Yalnız epifizden oluşan tek merkez",
          },
          {
            tr: "Bütün işlevlerden bağımsız akson miyelini",
          },
        ],
        answer: 2,
        hint: {
          tr: "Sorunun ışığın algılanmasını mı kortikal yorumunu mu istediğini oku.",
        },
        explanation: {
          tr: "Oksipital bölgeler görsel işleme ağlarıyla ilişkilidir. Bu, gözde reseptör veya başka görsel refleks yollarının aynı yapıya dönüştüğü anlamına gelmez.",
        },
        skill: "f015-sinir-sistemi-on-beyin-3",
      },
      {
        id: "f015-bio-sinir-sistemi-on-beyin-4",
        prompt: {
          tr: "Merkezî oluğun hemen önündeki primer motor ve arkasındaki primer somatosensoriyel korteks için hangi görev eşleştirmesi uygundur?",
        },
        options: [
          {
            tr: "Yalnız iki farklı BOS üretimi",
          },
          {
            tr: "Yalnız iki periferik miyelin yapıcısı",
          },
          {
            tr: "İkisinde de yalnız akciğer gaz değişimi",
          },
          {
            tr: "Seçili hareket çıktıları ve bedensel duyu girdilerinin işlenmesi",
          },
          {
            tr: "Yalnız epifiz ve hipofizin aynı hormonları",
          },
        ],
        answer: 3,
        hint: {
          tr: "Motor çıktı ile bedensel duyuyu ayır.",
        },
        explanation: {
          tr: "Motor korteks hareket çıktılarıyla, somatosensoriyel korteks bedensel duyu girdileriyle ilişkilidir. Anatomik yakınlık görevlerinin tamamen aynı olduğu anlamına gelmez.",
        },
        skill: "f015-sinir-sistemi-on-beyin-4",
      },
      {
        id: "f015-bio-sinir-sistemi-on-beyin-5",
        prompt: {
          tr: "Örnek sıcaklık modelinde hedef 37 °C, ölçüm 38 °C. Ölçüm−hedef farkı ve sapmayı azaltan genel yön hangisidir?",
        },
        options: [
          {
            tr: "−1°C; daha çok ısı kaybı",
          },
          {
            tr: "+75°C; bütün kanalların kapanması",
          },
          {
            tr: "+1°C; her durumda daha çok ısı üretimi",
          },
          {
            tr: "0°C; hiçbir fark yok",
          },
          {
            tr: "+1°C; ısı kaybını destekleyen yanıt",
          },
        ],
        answer: 4,
        hint: {
          tr: "Önce farkın işaretini, sonra geri bildirim yönünü belirle.",
        },
        explanation: {
          tr: "38−37=+1°C; basit modelde ısı kaybını desteklemek sapmayı azaltır. Gerçek kişiye ait tanı, normal sınır veya yanıt hızı bu örnekten belirlenmez.",
        },
        skill: "f015-sinir-sistemi-on-beyin-5",
      },
      {
        id: "f015-bio-sinir-sistemi-on-beyin-6",
        prompt: {
          tr: "Hipotalamusun düzenleyici rolü için hangisi doğrudur?",
        },
        options: [
          {
            tr: "Otonom ve endokrin yolları bütünleştirir; tüm etkileri yalnız hipofize indirgenmez",
          },
          {
            tr: "Yalnız bir kas lifidir",
          },
          {
            tr: "Bütün etkileri her koşulda tek hipofiz hormonudur",
          },
          {
            tr: "Yalnız görme reseptörü üretir",
          },
          {
            tr: "Uyku sırasında bütün beyni tamamen kapatır",
          },
        ],
        answer: 0,
        hint: {
          tr: "Çoklu düzenleme yollarını tek araca indirgeme.",
        },
        explanation: {
          tr: "Hipotalamus homeostaz ve davranışın farklı düzenleyici yollarına katılır. Hipofiz bağlantısı önemlidir ama bütün otonom ve diğer etkilerin yalnız bu yolla olduğu söylenemez.",
        },
        skill: "f015-sinir-sistemi-on-beyin-6",
      },
      {
        id: "f015-bio-sinir-sistemi-on-beyin-7",
        prompt: {
          tr: "Epifiz ve melatonin hangi bağlamla ilişkilidir?",
        },
        options: [
          {
            tr: "Periferik aksonda yalnız miyelin üretimi",
          },
          {
            tr: "Günlük zamanlama ve uyku-uyanıklık ağları",
          },
          {
            tr: "Bütün reflekslerin tek başına yürütülmesi",
          },
          {
            tr: "Her uyku sorununun tek ve kesin nedeni",
          },
          {
            tr: "Yalnız böbrekte DNA eşlenmesi",
          },
        ],
        answer: 1,
        hint: {
          tr: "Bir ilişkiyi bütün sonuçların tek garantisine çevirme.",
        },
        explanation: {
          tr: "Epifiz melatonin salgısıyla ritim ağlarına katılır. Bu ilişki her uyku sorununun tek nedeni veya kişiye tedavi seçme bilgisi olarak yorumlanamaz.",
        },
        skill: "f015-sinir-sistemi-on-beyin-7",
      },
      {
        id: "f015-bio-sinir-sistemi-on-beyin-8",
        prompt: {
          tr: "Koku için okul düzeyindeki talamus istisnasını en doğru sınırlayan ifade hangisidir?",
        },
        options: [
          {
            tr: "Koku hakkında beyinde hiçbir işlem yapılmaz",
          },
          {
            tr: "Talamusun hiçbir koşulda kokuyla ilişkisi olamaz",
          },
          {
            tr: "İlk kortikal yol tipik talamik ilk aktarmayı atlayabilir; bütün sonraki bağlantılar dışlanmaz",
          },
          {
            tr: "Koku yalnız omurilik refleksidir",
          },
          {
            tr: "Bütün diğer duyular da zorunlu aynı istisnadır",
          },
        ],
        answer: 2,
        hint: {
          tr: "İlk aktarım basamağı ile bütün işlevsel ilişkileri ayır.",
        },
        explanation: {
          tr: "Koku yolunun ilk kortikal aktarım özelliği, daha sonraki bütünleştirmede hiçbir talamik ilişki bulunmadığı gibi sınırsız bir sonuca dönüştürülmez.",
        },
        skill: "f015-sinir-sistemi-on-beyin-8",
      },
      {
        id: "f015-bio-sinir-sistemi-on-beyin-9",
        prompt: {
          tr: "Bir soyut motor şemada sol korteksten çıkan yol bir kez çaprazlanıp sağ ele gidiyor. Şemaya göre uygun sonuç hangisidir?",
        },
        options: [
          {
            tr: "Her yol hiçbir zaman çaprazlanmaz",
          },
          {
            tr: "Şema bütün insanların kişiliğini sol beyinli yapar",
          },
          {
            tr: "Bütün sinirler her koşulda aynı noktada çaprazlanır",
          },
          {
            tr: "Verilen yol sağ ele ulaşır; bütün sinir yolları için aynı yer kuralı çıkarılamaz",
          },
          {
            tr: "Hedef zorunlu sol eldir",
          },
        ],
        answer: 3,
        hint: {
          tr: "Yalnız gösterilen yolu izle.",
        },
        explanation: {
          tr: "Tek çaprazlaşma verilen modelde sol başlangıcı sağ hedefe bağlar. Bu gözlem bütün duyusal/motor yolların aynılığı veya kişilik sınıflaması için yeterli değildir.",
        },
        skill: "f015-sinir-sistemi-on-beyin-9",
      },
      {
        id: "f015-bio-sinir-sistemi-on-beyin-10",
        prompt: {
          tr: "Uyku sırasında beyin etkinliği için hangi ifade uygundur?",
        },
        options: [
          {
            tr: "Korteks ve talamus bütün gece kesin sıfır etkinliktedir",
          },
          {
            tr: "Bellekle ilişkili bütün işlemler yalnız uyanıkken olabilir",
          },
          {
            tr: "Uyku bütün insanlar için tek sabit hormon miktarıdır",
          },
          {
            tr: "BOS bütün nöronların yerini alır",
          },
          {
            tr: "Farklı evrelerde etkinlik örüntüleri değişir; beyin bütünüyle kapanmaz",
          },
        ],
        answer: 4,
        hint: {
          tr: "Etkinlik örüntüsünün değişmesini yok oluşla eşitleme.",
        },
        explanation: {
          tr: "Uyku farklı evre ve düzenlemeler içerir; beyin işlevleri tamamen durmaz. Bellek ve düzenlemeyle ilişkili süreçler de uyku sırasında devam edebilir.",
        },
        skill: "f015-sinir-sistemi-on-beyin-10",
      },
    ],
  },
  {
    id: "sinir-sistemi-orta-arka-beyin",
    topic: "detail-288",
    title: "Orta ve arka beyin: yönelme, koordinasyon ve yaşamsal düzenleme",
    source:
      "MEBİ AYT Biyoloji, basılı s. 17–18 (PDF 19–20) ve Parkinson bağlamı PDF 22; OGM Sinir Sistemi I, PDF 17. Özgün kesit modelleri ve kaynakla karşılaştırılmış öğretim soruları.",
    minutes: 44,
    objectives: [
      "Orta beyin, arka beyin ve beyin sapı gruplamalarını ayır.",
      "Refleks, bilinçli algı ve motor koordinasyonu farklı işlevler olarak ilişkilendir.",
      "Bir yapının önemi ile her lezyonun kesin sonucunu birbirine karıştırma.",
    ],
    sections: [
      {
        title: "İki sınıflandırma aynı parçaları aynı biçimde gruplayamaz",
        paragraphs: [
          "Orta beyin gelişimsel bir bölümdür. Arka beyin pons, omurilik soğanı ve beyincikle ele alınır. Beyin sapı ise orta beyin, pons ve omurilik soğanını kapsayan gruplamadır; beyincik arka beyindedir ama beyin sapının parçası değildir. Bir yapının iki farklı gruplamada bulunması çelişki değil, sınıflama ölçütünün farklılığıdır.",
          "Kesitte bir bölgenin daha aşağıda çizilmesi onun işlevinin daha basit veya önemsiz olduğu anlamına gelmez. Üst ve alt bölgeler çok sayıda yol ve döngüyle bağlıdır. Bir şekli önce adlandır, sonra hangi gruba dâhil olduğunu göster. Örneğin pons hem arka beyin hem beyin sapı içinde ele alınırken orta beyin arka beyin diye etiketlenmez.",
        ],
      },
      {
        title: "Orta beyin yönelme ve refleks ağlarına katılır",
        paragraphs: [
          "Görsel veya işitsel bir olay üzerine baş ve gözlerin yönelmesi gibi yanıtlar orta beyin ağlarıyla ilişkilidir. Göz bebeği ışık refleksinin yolunda da orta beyin yapıları rol oynar. Bir görüntüyü bilinçli olarak tanımakla ani yönelme refleksi aynı işlem değildir; ön beyin görsel ağlarıyla ilişkiler korunurken sorulan işlev daraltılır.",
          "Orta beyin motor düzenleme ağları, kas tonusu ve duruşla ilişkili bağlantılar içerir. Dopaminerjik nöronların bulunduğu bölgeler bazı hareket düzenleme yollarında önemlidir. Her hareket veya her ses algısı yalnız orta beyinde tamamlanır denmez. Bir hücre grubunun bozulmasıyla ilişkili hastalık mekanizması da tek bir günlük belirtiden kesin tanı koydurmaz.",
        ],
      },
      {
        title: "Beyincik komutu kopyalamakla kalmaz, karşılaştırmaya katılır",
        paragraphs: [
          "Beyincik denge, hareket zamanlaması, koordinasyon ve motor öğrenmeyle ilişkili ağlara katılır. Planlanan hareketle vücuttan gelen duyu geri bildirimleri arasında karşılaştırma ve düzeltme yapılmasına yardım eder. Elin bir hedefe düzgün ulaşması yalnız kasın güçlü olmasına değil, uygun zamanlama ve koordinasyona da bağlıdır.",
          "İstemli hareket komutu, hareketin duyusal izlenmesi ve koordinasyonun düzeltilmesi ayrı rollerdir. Beyinciği bütün istemli hareketlerin tek başına başlatıcısı sayma; kortikal ve başka motor ağlarla birlikte çalışır. Bir soruda denge ve el-göz koordinasyonu vurgulanıyorsa ilgili rol seçilir, fakat gerçek kişide yalnız sendeleme gözleminden tek bölge hasarı kesinleştirilmez.",
        ],
      },
      {
        title: "Pons bağlantı ve düzenleme görevleri taşır",
        paragraphs: [
          "Pons farklı beyin bölgeleri arasında bilgi alışverişine ve beyincikle bağlantılara katılır. Solunumun normal ritminin düzenlenmesinde omurilik soğanıyla birlikte rol oynar. Sadece iki beyincik yarısını birbirine tutturan tek bir lif veya yalnızca geçişe izin veren boş kablo değildir; içinde farklı çekirdek ve yollar bulunur.",
          "Birçok görev aynı işlevsel ağda paylaşılır. Pons ve omurilik soğanı solunumla ilişkili diye ikisini birbiriyle veya akciğerin kendisiyle eşitleme. Soru bilgiyi taşıma mı, ritim düzenleme mi yoksa gaz değişiminin gerçekleştiği organı mı soruyor, önce bunu ayır. Aynı gündelik soluk alma olayında bu farklı düzeyler birlikte bulunabilir.",
        ],
      },
      {
        title: "Omurilik soğanı yaşamsal otomatik düzenlemeye katılır",
        paragraphs: [
          "Omurilik soğanı yani medulla; solunum, dolaşım ve bazı koruyucu refleks ağlarında önemli merkezler içerir. Kalp hızı, damar çapı ve solunum örüntüsünün düzenlenmesi; yutma, öksürme ve kusma gibi yanıtlarla ilişkileri okul düzeyinde ele alınır. Bir organın kasılmasını sağlayan hücreyle bu kasılmanın düzenlenmesine katılan merkez aynı yapı değildir.",
          "Bu işlevlerin yaşamsal önemi, bölgenin her türlü ve her büyüklükte hasarının aynı kesin sonuca yol açtığı anlamına gelmez. Lezyonun yeri, yaygınlığı ve başka koşullar önemlidir. Koma veya bilinç bozukluğu bulunan herkesin desteksiz solunumu aynen sürer ya da herkesin hemen aynı sonuca ulaşacağı gibi klinik garantiler bu basit öğretim haritasından çıkarılmaz.",
        ],
      },
      {
        title: "Çaprazlaşma yolun özelliğidir",
        paragraphs: [
          "Birçok motor yolun lifleri medulla çevresinde çapraz bağlantılar kurar; fakat bütün sinirlerin her zaman aynı noktada çapraz yaptığı söylenemez. Duyu ve motor yollarının güzergâhları farklı olabilir. Bir modelde sol başlangıçtan sağ hedefe geçen yol gösterilmişse yalnız o yolun verdiği sonucu izle.",
          "Nasırlı cisim serebral yarımkürelerin bağlantısıyla, pons başka beyin yolları ve beyincik bağlantılarıyla ilişkilidir. İkisinin bağlantı görevi olması aynı anatomik parça oldukları anlamına gelmez. Şemada bir çizginin başka çizgiyi kesmesi de mutlaka sinaps veya anatomik çaprazlaşma değildir; çizgi anahtarı ve verilen bağlantı noktaları açık olmalıdır.",
        ],
      },
      {
        title: "Refleks merkezi ile bilinçli algı aynı değildir",
        paragraphs: [
          "Ani bir ışığa karşı göz bebeğinin değişmesi, hareketli nesneye başın dönmesi ve o nesnenin ne olduğunu bilinçli tanıma farklı işlerdir. Birincilerde seçili beyin sapı-refleks yolları önemlidir; tanıma ve yorumlamada kortikal ağlar devrededir. Bir refleksin gerçekleşmesi bütün ayrıntılı bilinçli yorumun tamamlandığını göstermez.",
          "Her refleksin merkezi omurilik değildir. Bazıları beyin sapıyla, bazıları omurilikteki devrelerle ilişkilidir; üst merkezler yanıtları düzenleyebilir. Gündelik dilde otomatikleşmiş her beceriye refleks denebilse de bisiklet sürmek gibi öğrenilmiş motor beceriyi tek bir basit refleks yayıyla eşitleme. Kullanılan terimin bilimsel kapsamını belirt.",
        ],
      },
      {
        title: "İşlev sorusunu klinik sonuca çevirmeden çöz",
        paragraphs: [
          "Bir vakada önce görev sorusunu belirle: algılama, yönelme, koordinasyon, ritim düzenleme veya kas yanıtı. Sonra yapının bu görevdeki katkısını gerekçelendir. Tek bir yapıya bir işlev eşleştirmen başka yapılar gereksiz demek değildir. İstenen en uygun ders ilişkisiyle gerçek bir hastadaki kesin lezyon tanısı farklı kanıt ister.",
          "Etkileşimli kesitte seçilen görev farklı bölge ve yolları öne çıkarır. Beyincik ile beyin sapının sınırlarını aynı resim üzerinde görürken metinsel grup listesi de korunur. Kesit çizimi ölçekli beyin taraması veya kişisel sağlık sonucu değildir. Belirsizlik olduğunda ek veri gerektiğini söylemek, ezbere kesin yanıt uydurmaktan daha doğru bir biyoloji muhakemesidir.",
        ],
      },
    ],
    examples: [
      {
        title: "Beyin sapı mı, arka beyin mi?",
        prompt:
          "Orta beyin, pons, medulla ve beyincik verilmiş. İki farklı gruplamaya yerleştir.",
        strategy: "Her gruplamanın ölçütünü ayrı uygula.",
        steps: [
          {
            label: "Arka beyni kur",
            explanation: "Arka beyin pons, medulla ve beyincik içerir.",
            expression: "{pons, medulla, beyincik}",
          },
          {
            label: "Sapı kur",
            explanation: "Beyin sapı orta beyin, pons ve medulla içerir.",
            expression: "{orta beyin, pons, medulla}",
          },
          {
            label: "Farkı denetle",
            explanation:
              "Beyincik yalnız ilk, orta beyin yalnız ikinci listededir.",
            expression: "iki grup aynı değil",
          },
        ],
        answer:
          "Pons ve medulla ortak; beyincik sapın dışında, orta beyin arka beynin dışında.",
        check: "Bir yapının iki farklı grupta yer alması çelişki değildir.",
        pitfall:
          "Beyincik arka beyinde diye onu beyin sapına da otomatik ekleme.",
      },
      {
        title: "Görsel yorumla refleksi ayır",
        prompt:
          "A kartı aniden gelen ışıkta göz bebeği yanıtını, B kartı görülen bir nesnenin bilinçli tanınmasını soruyor. İlişkili işlevleri ayır.",
        strategy: "İstenen yanıtı alıcıdan ve yorumdan ayrı adlandır.",
        steps: [
          {
            label: "A’yı seç",
            explanation: "Işık refleksi seçili orta beyin yoluyla ilişkilidir.",
            expression: "refleks yanıtı",
          },
          {
            label: "B’yi seç",
            explanation:
              "Nesnenin bilinçli yorumunda kortikal görsel ağlar rol alır.",
            expression: "bilinçli işleme",
          },
          {
            label: "İlişkiyi koru",
            explanation: "Aynı uyaran farklı yollara bilgi verebilir.",
            expression: "ortak uyaran ≠ aynı işlem",
          },
        ],
        answer: "Refleks ve bilinçli yorum aynı tek merkez olarak ele alınmaz.",
        check:
          "Bu ayırım bütün görsel yolların yalnız iki kutudan oluştuğu iddiası değildir.",
        pitfall:
          "Işığın geçtiği her aşamaya aynı adı verip görevi gözden kaçırma.",
      },
      {
        title: "Komut ve düzeltme",
        prompt:
          "Bir kişi hedefe uzanma komutunu başlatıyor; hareketin zamanlaması ve dengeyle uyumu ayrıca düzenleniyor. Beyincik hangi katkıyla ilişkilidir?",
        strategy: "Başlatma, geri bildirim ve düzeltme rollerini ayır.",
        steps: [
          {
            label: "Komutu ayır",
            explanation:
              "İstemli hareket planı çoklu motor ağlarla ilişkilidir.",
            expression: "başlatma tek başına beyincik değil",
          },
          {
            label: "Geri bildirimi izle",
            explanation: "Hedef ve vücut konumuna ilişkin bilgi alınır.",
            expression: "duyusal izleme",
          },
          {
            label: "Katkıyı seç",
            explanation:
              "Zamanlama ve koordinasyon düzeltmeleri beyincikle ilişkilidir.",
            expression: "uyumlu hareket",
          },
        ],
        answer:
          "Beyincik koordinasyon, denge ve motor öğrenme katkısıyla öne çıkar.",
        check:
          "Tek bir sendeleme belirtisiyle gerçek hastaya kesin lezyon sonucu verilmez.",
        pitfall: "Hareketle ilgilenen her yapıyı aynı tek komut merkezi sayma.",
      },
      {
        title: "Solunumun hangi düzeyi?",
        prompt:
          "Bir şema pons/medulla ritim düzenlemesi ile akciğerdeki gaz değişimini ayrı kutularda gösteriyor. Neden aynı ad verilmez?",
        strategy: "Düzenleme ile mekanik/kimyasal organ işlevini ayır.",
        steps: [
          {
            label: "Merkezi seç",
            explanation: "Pons ve medulla solunum ritmi ağlarına katkı verir.",
            expression: "sinirsel düzenleme",
          },
          {
            label: "Organı seç",
            explanation:
              "Gaz alışverişi akciğerin uygun yüzeylerinde gerçekleşir.",
            expression: "organ düzeyi",
          },
          {
            label: "Bağlantıyı kur",
            explanation:
              "Düzenleme ilgili kas ve organ yollarıyla sonucu etkiler.",
            expression: "farklı ama bağlantılı düzeyler",
          },
        ],
        answer:
          "Ritim düzenleme merkezi ile gaz değişiminin yapıldığı organ aynı yapı değildir.",
        check: "Tek görevde birden çok düzeyin çalışması beklenir.",
        pitfall: "Solunum sözcüğünü görüp her seçeneği aynı işlev sanma.",
      },
    ],
    recall: [
      {
        prompt: "Beyincik beyin sapının parçası mıdır?",
        answer:
          "Hayır. Arka beyindedir; beyin sapı orta beyin, pons ve medullayla ele alınır.",
      },
      {
        prompt: "Beyincik hareketle nasıl ilişkilidir?",
        answer:
          "Koordinasyon, zamanlama, denge ve motor öğrenme ağlarına katkı verir; bütün istemli komutu tek başına üretmez.",
      },
      {
        prompt: "Her refleksin merkezi omurilik midir?",
        answer:
          "Hayır. Orta beyin ve diğer beyin sapı yollarıyla ilişkili refleksler de vardır.",
      },
      {
        prompt: "Bir yapının yaşamsal olması neyi kanıtlamaz?",
        answer:
          "Her tür ve büyüklükte hasarın her kişide aynı kesin klinik sonuca yol açacağını kanıtlamaz.",
      },
    ],
    questions: [
      {
        id: "f015-bio-sinir-sistemi-orta-arka-beyin-1",
        prompt: {
          tr: "Beyin sapı için okul düzeyindeki doğru grup hangisidir?",
        },
        options: [
          {
            tr: "Orta beyin, pons ve omurilik soğanı",
          },
          {
            tr: "Yalnız beyincik ve korteks",
          },
          {
            tr: "Yalnız talamus ve epifiz",
          },
          {
            tr: "Bütün periferik gangliyonlar",
          },
          {
            tr: "Pons, deri reseptörü ve iskelet kası",
          },
        ],
        answer: 0,
        hint: {
          tr: "Beyin sapı gruplamasını arka beyinle özdeş sayma.",
        },
        explanation: {
          tr: "Beyin sapı orta beyin, pons ve medullayla ele alınır. Beyincik arka beyin içindedir fakat beyin sapına otomatik dâhil değildir.",
        },
        skill: "f015-sinir-sistemi-orta-arka-beyin-1",
      },
      {
        id: "f015-bio-sinir-sistemi-orta-arka-beyin-2",
        prompt: {
          tr: "Hangi yapı arka beyin içinde olup beyin sapı grubunun dışında yer alır?",
        },
        options: [
          {
            tr: "Pons",
          },
          {
            tr: "Beyincik",
          },
          {
            tr: "Omurilik soğanı",
          },
          {
            tr: "Orta beyin",
          },
          {
            tr: "Periferik sinir demeti",
          },
        ],
        answer: 1,
        hint: {
          tr: "İki gruplamanın ortak ve farklı üyelerini ayır.",
        },
        explanation: {
          tr: "Arka beyin pons, medulla ve beyinciği içerir; beyin sapı orta beyin, pons ve medulladır. Bu iki listeyi aynı sanmak beyinciğin yerini yanlışlaştırır.",
        },
        skill: "f015-sinir-sistemi-orta-arka-beyin-2",
      },
      {
        id: "f015-bio-sinir-sistemi-orta-arka-beyin-3",
        prompt: {
          tr: "Ani görsel olaya baş-göz yönelmesi ve seçili göz bebeği refleksi hangi bölümle ilişkilidir?",
        },
        options: [
          {
            tr: "Yalnız periferik miyelin",
          },
          {
            tr: "Yalnız parmak kası",
          },
          {
            tr: "Orta beyin ağları",
          },
          {
            tr: "Yalnız BOS’un kimyasal bileşimi",
          },
          {
            tr: "Bütün bilinçli görmenin tek başına epifizde oluşması",
          },
        ],
        answer: 2,
        hint: {
          tr: "Refleks görevi ile bilinçli tanımayı ayır.",
        },
        explanation: {
          tr: "Orta beyin görsel/işitsel yönelme ve bazı refleks yollarında rol alır. Bu, bilinçli görsel yorumun bütününün aynı yerde tamamlandığı anlamına gelmez.",
        },
        skill: "f015-sinir-sistemi-orta-arka-beyin-3",
      },
      {
        id: "f015-bio-sinir-sistemi-orta-arka-beyin-4",
        prompt: {
          tr: "Hareketin zamanlama, denge ve el-göz koordinasyonu düzeltmeleriyle özellikle ilişkili yapı hangisidir?",
        },
        options: [
          {
            tr: "Yalnız aksonun çekirdeği",
          },
          {
            tr: "Yalnız epifiz hormonu",
          },
          {
            tr: "Yalnız retina pigmenti",
          },
          {
            tr: "Beyincik",
          },
          {
            tr: "Periferik sinirin bütününden oluşan tek hücre",
          },
        ],
        answer: 3,
        hint: {
          tr: "Motor komut ile koordinasyona katkıyı ayır.",
        },
        explanation: {
          tr: "Beyincik koordinasyon ve motor öğrenme ağlarına katılır. Hareketin başlatılması ve yürütülmesinde başka motor yapılar da rol alır; tek işlev merkezi gibi genellenmez.",
        },
        skill: "f015-sinir-sistemi-orta-arka-beyin-4",
      },
      {
        id: "f015-bio-sinir-sistemi-orta-arka-beyin-5",
        prompt: {
          tr: "Ponsun rolü için en uygun ifade hangisidir?",
        },
        options: [
          {
            tr: "Yalnız iki kemiği tutan lif",
          },
          {
            tr: "Bütün duyu reseptörlerinin tek hücresi",
          },
          {
            tr: "Hiçbir sinirsel düzenleme içermeyen boş kanal",
          },
          {
            tr: "Bütün insan belleğinin tek başına saklandığı yer",
          },
          {
            tr: "Bölgeler arası bağlantı ve medullayla solunum ritim düzenlemesine katkı",
          },
        ],
        answer: 4,
        hint: {
          tr: "Bağlantı görevini yapının bütün işlevlerinin yokluğu sayma.",
        },
        explanation: {
          tr: "Pons farklı yollar ve çekirdeklerle bağlantı ve düzenleme görevlerine katılır. Solunum bağlamında medullayla ilişkisi vardır; yalnız basit kablo diye tanımlanmaz.",
        },
        skill: "f015-sinir-sistemi-orta-arka-beyin-5",
      },
      {
        id: "f015-bio-sinir-sistemi-orta-arka-beyin-6",
        prompt: {
          tr: "Omurilik soğanının yaşamsal düzenleme rolünden hangi sonuç zorunlu çıkarılamaz?",
        },
        options: [
          {
            tr: "Her büyüklükte ve her konumdaki hasarın herkes için aynı kesin sonucu vereceği",
          },
          {
            tr: "Solunum ağlarına katkı verebildiği",
          },
          {
            tr: "Dolaşım düzenlemesiyle ilişkili olduğu",
          },
          {
            tr: "Bazı koruyucu refleks yollarında rol aldığı",
          },
          {
            tr: "Hasarın yeri ve yaygınlığının önem taşıyabileceği",
          },
        ],
        answer: 0,
        hint: {
          tr: "İşlevsel önem ile klinik sonucu garanti etmeyi ayır.",
        },
        explanation: {
          tr: "Medulla önemli yaşamsal merkezler içerir; fakat hasarın kapsamı ve başka koşullar sonucu etkiler. Basit anatomi bilgisi bütün lezyonların tek sonucu için yeterli değildir.",
        },
        skill: "f015-sinir-sistemi-orta-arka-beyin-6",
      },
      {
        id: "f015-bio-sinir-sistemi-orta-arka-beyin-7",
        prompt: {
          tr: "Nasırlı cisim ile ponsun ikisinin de bağlantı rolü olması neyi göstermez?",
        },
        options: [
          {
            tr: "Farklı yollar arasında bilgi alışverişi bulunabildiğini",
          },
          {
            tr: "Aynı anatomik yapı olduklarını",
          },
          {
            tr: "Birden çok beyin bölgesinin birlikte çalışabildiğini",
          },
          {
            tr: "Bağlantı işlevinin farklı yerlerde bulunabildiğini",
          },
          {
            tr: "Görev ve konumun birlikte okunmasının yararlı olduğunu",
          },
        ],
        answer: 1,
        hint: {
          tr: "Ortak işlev sözcüğü tek yapı özdeşliği değildir.",
        },
        explanation: {
          tr: "Nasırlı cisim serebral yarımküreler arasında; pons başka bağlantı/düzenleme ağlarında rol alır. Bağlantı kelimesi bu iki bölgeyi aynı parça yapmaz.",
        },
        skill: "f015-sinir-sistemi-orta-arka-beyin-7",
      },
      {
        id: "f015-bio-sinir-sistemi-orta-arka-beyin-8",
        prompt: {
          tr: "Bir şemada sol motor başlangıçtan çıkan yol bir kez sağ tarafa geçiyor. Verilen model için hangi yorum uygundur?",
        },
        options: [
          {
            tr: "Bütün duyu yolları kesin aynı noktada geçer",
          },
          {
            tr: "Hiçbir motor yol çaprazlanamaz",
          },
          {
            tr: "Bu yolun hedefi karşı tarafta olabilir; bütün yolların aynı noktada çaprazlandığı çıkmaz",
          },
          {
            tr: "Şema kişinin zekâ tipini belirler",
          },
          {
            tr: "Çizgilerin her kesişmesi mutlaka sinapstır",
          },
        ],
        answer: 2,
        hint: {
          tr: "Yol anahtarıyla gösterilen çaprazı kullan.",
        },
        explanation: {
          tr: "Seçili yolun çapraz bağlantısı karşı tarafla ilişki kurabilir. Bu veri bütün yolakların anatomisini veya herhangi bir kişilik özelliğini kesinleştirmez.",
        },
        skill: "f015-sinir-sistemi-orta-arka-beyin-8",
      },
      {
        id: "f015-bio-sinir-sistemi-orta-arka-beyin-9",
        prompt: {
          tr: "Bir uyaran hem hızlı yönelme refleksi hem sonra bilinçli yorum doğuruyor. Hangi ifade uygundur?",
        },
        options: [
          {
            tr: "Refleks varsa bilinçli yorum mümkün değildir",
          },
          {
            tr: "İki yanıt mutlaka aynı tek hücrede tamamlanır",
          },
          {
            tr: "Refleks bütün görsel yorumun bittiğini kanıtlar",
          },
          {
            tr: "Aynı uyaran farklı işlevsel yollara bilgi verebilir",
          },
          {
            tr: "Bilinçli yorum yalnız iskelet kasında oluşur",
          },
        ],
        answer: 3,
        hint: {
          tr: "Uyaranın ortaklığını yolun tekliği sanma.",
        },
        explanation: {
          tr: "Sinir sisteminde aynı bilgi farklı ağlarda farklı amaçlarla işlenebilir. Refleks ile bilinçli tanıma farklı rollerdir; ortak uyaran onları özdeş yapmaz.",
        },
        skill: "f015-sinir-sistemi-orta-arka-beyin-9",
      },
      {
        id: "f015-bio-sinir-sistemi-orta-arka-beyin-10",
        prompt: {
          tr: "Bir ders kartı sendeleme ile beyinciğin koordinasyon rolünü ilişkilendiriyor. Hangi yaklaşım kanıt sınırını korur?",
        },
        options: [
          {
            tr: "Sendeleyen herkesin aynı bölgesi kesin yok olmuştur",
          },
          {
            tr: "Başka neden araştırmak gereksizdir",
          },
          {
            tr: "Beyincik yalnız refleks dışı bütün organların yeridir",
          },
          {
            tr: "Bu belirti bütün kişilerin aynı tedaviyi almasını gerektirir",
          },
          {
            tr: "İlişki öğretilebilir; tek belirtiden kişiye kesin lezyon tanısı konmaz",
          },
        ],
        answer: 4,
        hint: {
          tr: "Ders ilişkilendirmesi ile tıbbi tanının veri gereksinimi farklıdır.",
        },
        explanation: {
          tr: "Koordinasyon rolü konu öğreniminde anlamlıdır; gerçek belirti farklı nedenlerle ortaya çıkabilir. Tek gözlemden kesin lezyon veya tedavi sonucu verilmez.",
        },
        skill: "f015-sinir-sistemi-orta-arka-beyin-10",
      },
    ],
  },
  {
    id: "sinir-sistemi-omurilik",
    topic: "detail-289",
    title: "Omurilik: kökleri, yolları ve refleks devrelerini izle",
    source:
      "MEBİ AYT Biyoloji, basılı s. 18 (PDF 20); OGM Sinir Sistemi I, PDF 17; Aurelia AYT 003 tek-sinapslı devre sınırları. Özgün devre modelleri ve öğretim soruları.",
    minutes: 44,
    objectives: [
      "Gri madde boynuzu ile duyu/motor kökü birbirinden ayır.",
      "Tek sinapslı ve ara nöronlu seçili refleks devrelerini karşılaştır.",
      "Bir yol kesintisinin giriş, çıkış ve yükselen bilgi üzerindeki model etkilerini ayrı izle.",
    ],
    sections: [
      {
        title: "Omurilik içindeki doku dağılımını oku",
        paragraphs: [
          "Omurilik omurlar, merkezî sinir sistemi zarları ve BOS ile korunur. Enine kesitte ak madde dışta, gri madde daha içeride bulunur. Gri madde hücre gövdeleri ve yerel bağlantılarla, ak madde yükselen ve alçalan yollarla ilişkilidir. Bu genel dağılımı beynin kortikal yüzeyindeki düzenle karşılaştırırken beynin derin gri yapılarının da varlığını unutma.",
          "Gri madde kelebek benzeri bir görünüm verebilir; öne ve arkaya uzanan kısımlarına boynuz denir. Bir çizimin simetrik görünmesi bütün sinirsel işlevlerin sağda solda aynı tek hücrede bulunduğu anlamına gelmez. Kesitin ön/arka yönü etiketle belirtilmelidir; ekrandaki üst tarafı otomatik anatomik arka sayma.",
        ],
      },
      {
        title: "Arka kökten giriş duyu yoluyla ilişkilidir",
        paragraphs: [
          "Arka yani dorsal kök, uygun duyu liflerinin omuriliğe giriş yoludur. Duyu nöronlarının hücre gövdeleri arka kök gangliyonunda bulunabilir. Bir duyu lifinin merkeze girmesi, reseptörün de omuriliğin içinde olduğu anlamına gelmez. Periferik alıcıdan gelen bilgi merkezi devrelere ve yükselen yollara ulaşabilir.",
          "Arka kök ile gri maddenin arka boynuzu aynı yapı değildir: kök liflerin giriş demeti, boynuz merkezdeki doku bölgesidir. Soru kesilen yolun neresi olduğunu açık vermelidir. Bir seçili arka kök girişi kesintiye uğratılırsa o yoldan gelen afferent bilgi etkilenir; bütün vücudun bütün duyularının yok olacağı gibi sınırsız sonuç çıkarılmaz.",
        ],
      },
      {
        title: "Ön kök motor çıkışla ilişkilidir",
        paragraphs: [
          "Ön yani ventral kök motor aksonların ilgili efektörlere giden çıkış yoludur. Somatik motor gövde omuriliğin uygun gri bölgesinde bulunabilir; otonom yolların düzeni ayrıca ele alınır. Ön ve arka kökler birleştiğinde karışık omurilik siniri hem giriş hem çıkış lifleri taşıyabilir. Sinir demetinin iki yönlü lif içermesi tek aksonun normal görevinin her anda tersine dönmesi değildir.",
          "Seçili ön kök çıkışı kesilirse ilgili motor yanıt yolu engellenebilir; aynı örneğin duyu girişi kendi bağlantıları sağlamsa merkeze ulaşmayı sürdürebilir. Alıcı, kök ve kas etkisini tek bir devre üzerinde ayrı ayrı izle. Canlı kişideki hasarın bütün kapsamı ek klinik veri gerektirir; bu laboratuvar yalnız verilen şematik bağlantıyı hesaplar.",
        ],
      },
      {
        title: "Refleks yayı uyaranın adından değil bağlantılardan kurulur",
        paragraphs: [
          "Refleks bir uyarana karşı otomatik yanıt örüntüsüdür. Seçili devrede alıcı, duyu nöronu, merkezî bağlantı, motor nöron ve efektör ayrı rollerdir. Alıcı kasın içindeki bir yapı da olabilir; bütün refleksler deri ağrısıyla başlamaz. Refleks yayındaki hücre sayısını hesaplamak için çizimde hangi nöronların ve sinapsların verildiğini kullan.",
          "Elin sıcak yüzeyden çekilmesi gibi çok sinapslı yanıtlar ara nöronlar içerir. Gerilme refleksinin seçili uyarıcı duyu-motor yolu tek merkezî sinapsla kurulabilir; her refleks mutlaka üç nöron içerir kuralı yanlıştır. Gerçek geniş devrelerde ek düzenleme ve karşıt kas bağlantıları bulunabilir; basit seçili alt-devre bunların tamamını saymış olmaz.",
        ],
      },
      {
        title: "Tek sinapslı örnekte sayılanları açıkça tanımla",
        paragraphs: [
          "Bu derste tek sinapslı modelde bir duyu ve bir motor nöron arasında bir merkezî kimyasal sinaps bulunur. Reseptör ve kasın efektör olması onları ayrıca birer nöron yapmaz. Motor nöron-kas kavşağı da bağlantıdır; merkezî sinaps sayısı soruluyorsa o sayıya başka basamağı sessizce ekleme.",
          "Bir ara nöron eklenen seçili model üç nöron ve iki merkezî sinaps içerir. Bu değerler bütün çekilme reflekslerinin gerçek tam hücre sayısı değildir; yalnız gösterilen yolun sayımıdır. Önce sayılan niceliğin nöron, merkezî sinaps, tüm bağlantı veya toplam süre olup olmadığını işaretle. Birbiriyle ilişkili sayılar farklı birimlerle cevaplanır.",
        ],
      },
      {
        title: "Yerel yanıt ile beyne giden bilgi paralel olabilir",
        paragraphs: [
          "Bir omurilik refleksinin başlaması için bilinçli kortikal karar zorunlu olmayabilir. Bununla birlikte beyin ve omurilik bağımsız, hiç bağlantısız iki sistem değildir; üst merkezler refleksleri düzenleyebilir. Uyarana ait bilgi yükselen yollardan beyne taşınırken yerel devre motor yanıtı başlatabilir; iki akışın zorunlu tamamen ardışık olduğu söylenmez.",
          "Bir düşünce deneyinde yalnız yükselen yol engellenmiş, yerel refleks devresi sağlamsa seçili refleks yanıtı kalabilir. Bu, kişinin tüm bilinç, duyu veya motor durumunu belirleyen klinik sonuç değildir. İletinin beyne çıkması ile omurilikte değerlendirilmesi farklı dallardır. Grafikte ortak bir girişten iki ok çıkması aynı enerjinin veya hücrenin iki katına çıkması anlamına gelmez.",
        ],
      },
      {
        title: "Gecikmeyi parçalara ayırarak hesapla",
        paragraphs: [
          "Bir yolun süresi her akson bölümünde L/v ile bulunur. Duyu kısmı 0,5 m ve hızı 50 m/s ise süre 0,01 s=10 ms; aynı motor bölüm için de 10 ms olur. Bir merkezî sinapsın gecikmesi 0,5 ms verilmişse seçili tek sinapslı yol 20,5 ms eder. İki merkezî sinapslı model 21 ms olur; bu sayılar yalnız açık varsayımlı öğretim verisidir.",
          "Nöromüsküler bağlantı ve kasın mekanik yanıt gecikmesi bu hesapta dışlanmışsa sonuç tam gözlenen hareket süresi diye sunulmaz. Daha fazla sinaps toplam varışı geciktirebilir ama verilen akson hızını m/s olarak otomatik düşürmez. Çizilen yol uzunluğu ölçekli değilse gerçek metre hesabı yapılamaz; sayısal uzunluk soruda ayrıca verilmelidir.",
        ],
      },
      {
        title: "Kesinti sorusunda üç ayrı sonucu sorgula",
        paragraphs: [
          "Seçili devrede önce afferent girişin merkeze gelip gelmediğini, sonra yerel motor çıkışın kası etkileyip etkilemediğini, son olarak yükselen bilginin açık yoldan ilerleyip ilerlemediğini sor. Arka kök, ön kök ve yükselen yol kesintileri aynı sonuç değildir. Bir bağlantının kaybını bütün başka bağlantıların da kaybı sayma.",
          "Etkileşimde devre türü ve kesinti yeri değişince gerçek SVG yolları ve metinsel sonuçlar birlikte güncellenir. Kesintiler bir düşünce deneyidir; fiziksel kişiye uygulanacak deney veya tek başına tanı yöntemi değildir. Öğrenilmiş karmaşık becerileri tek refleks yayına indirmeden ve her refleksi omurilikte sanmadan modelin kapsamını koru.",
        ],
      },
    ],
    examples: [
      {
        title: "İki nöron mu, üç mü?",
        prompt:
          "Seçili devrede duyu nöronu motor nöronla doğrudan bir merkezî sinaps yapıyor. Kas efektörü ayrıca çizilmiş. Nöron ve merkezî sinaps sayısı nedir?",
        strategy: "Hücre görevi ile sayılan bağlantı türünü ayır.",
        steps: [
          {
            label: "Nöronları say",
            explanation: "Bir duyu ve bir motor vardır.",
            expression: "2 nöron",
          },
          {
            label: "Merkezî bağlantıyı say",
            explanation: "Duyu-motor arasında tek sinaps verilmiş.",
            expression: "1 merkezî sinaps",
          },
          {
            label: "Efektörü ayır",
            explanation: "Kas hedef hücresidir; bu sayımda nöron değildir.",
            expression: "kas nöron sayısına eklenmez",
          },
        ],
        answer: "İki nöron, bir merkezî sinaps.",
        check:
          "Kas kavşağı sorulursa farklı bağlantı sayımı yapılabilir; soru merkezî sinaps demiştir.",
        pitfall: "Her refleks mutlaka üç nöronlu diye şemayı değiştirme.",
      },
      {
        title: "Giriş ve çıkış kesintileri",
        prompt:
          "Seçili devrede A durumu arka kök girişini, B durumu yalnız ön kök motor çıkışını engelliyor. Duyu ve kas yanıtını karşılaştır.",
        strategy: "Verilen kesintiyi ilgili okun üzerinde uygula.",
        steps: [
          {
            label: "A girişini izle",
            explanation: "Arka kök kesintisi seçili afferent girişi durdurur.",
            expression: "merkeze giriş yok",
          },
          {
            label: "B girişini izle",
            explanation:
              "B’de duyu yolu verilene göre sağlamsa bilgi merkeze gelebilir.",
            expression: "giriş korunabilir",
          },
          {
            label: "B çıkışını izle",
            explanation: "Ön kök kesintisi motor hedefe gidişi durdurur.",
            expression: "kas çıktısı engellenir",
          },
        ],
        answer:
          "İki kesinti aynı değildir; ön kök durumunda duyu girişi kalabilirken motor yanıt yolu kesilir.",
        check: "Sonuç yalnız gösterilen yola aittir; bütün vücudu kapsamaz.",
        pitfall: "Sinir kökünü gri madde boynuzuyla eşitleme.",
      },
      {
        title: "Aynı aksonlar, farklı sinaps sayısı",
        prompt:
          "Duyu ve motor bölümler ayrı ayrı 0,5 m ve 50 m/s. Her merkezî sinaps 0,5 ms. Bir ve iki merkezî sinapslı yolları karşılaştır; başka gecikmeler dışlanmış.",
        strategy:
          "Akson sürelerini bir kez hesapla, sinaps katkısını değiştir.",
        steps: [
          {
            label: "İletim süreleri",
            explanation: "Her bölüm 0,5/50 saniye sürer.",
            expression: "10+10=20 ms",
          },
          {
            label: "Bir sinaps ekle",
            explanation: "İlk yolun merkezî gecikmesi 0,5 ms.",
            expression: "20,5 ms",
          },
          {
            label: "İki sinaps ekle",
            explanation: "İkinci yolun merkezî gecikmesi 1 ms.",
            expression: "21 ms",
          },
        ],
        answer: "20,5 ve 21 ms; fark 0,5 ms.",
        check:
          "Kasın mekanik gecikmesi dışlandığı için klinik tam refleks süresi olduğu iddia edilmez.",
        pitfall: "Daha uzun süreyi akson hızının değişmesi sayma.",
      },
      {
        title: "Beyne çıkan dal kesilirse",
        prompt:
          "Düşünce deneyinde yerel duyu-motor devresi sağlam; yalnız yükselen bilgi dalı engellenmiş. Seçili refleks ve bu daldan bilgi ulaşması nasıl yorumlanır?",
        strategy: "Dallanmış yolları ayrı izle.",
        steps: [
          {
            label: "Yerel devreyi kontrol et",
            explanation: "Duyu girişi ve motor çıkış bağlantıları sağlam.",
            expression: "yerel yol açık",
          },
          {
            label: "Yükselen dalı kontrol et",
            explanation: "Verilen kesinti yalnız bu dalda.",
            expression: "bu yükselen yol kapalı",
          },
          {
            label: "Sınırı ekle",
            explanation: "Bütün kişinin duyu ve bilinç durumu modellenmiyor.",
            expression: "devre sonucu ≠ klinik tanı",
          },
        ],
        answer:
          "Seçili yerel refleks kalabilir; gösterilen yükselen daldan bilgi ilerlemez.",
        check:
          "Üst merkezlerin normalde reflekslere düzenleyici etkisi olabileceği inkâr edilmez.",
        pitfall:
          "Refleks için korteks zorunlu değil sözünü beyin hiçbir rol oynamaz diye genişletme.",
      },
    ],
    recall: [
      {
        prompt: "Arka kök ve arka boynuz aynı mıdır?",
        answer:
          "Hayır. Kök giriş lifleri, boynuz gri maddenin anatomik bölgesidir.",
      },
      {
        prompt: "Tek merkezî sinapslı modelde kas neden üçüncü nöron değildir?",
        answer:
          "Kas efektördür; duyu ve motor nöronla aynı hücre tipi değildir.",
      },
      {
        prompt:
          "Ön kök motor çıkışı kesilirse duyu yolu mutlaka da kesilir mi?",
        answer: "Hayır. Seçili bağlantılar sağlamsa afferent giriş sürebilir.",
      },
      {
        prompt: "Refleksle yükselen bilgi her durumda ardışık mıdır?",
        answer:
          "Hayır. Yerel yanıt başlarken bilgi başka dallardan paralel ilerleyebilir.",
      },
    ],
    questions: [
      {
        id: "f015-bio-sinir-sistemi-omurilik-1",
        prompt: {
          tr: "Omuriliğin tipik enine kesitinde ak ve gri maddenin genel yeri hangisidir?",
        },
        options: [
          {
            tr: "Ak madde dışta, gri madde daha içeride",
          },
          {
            tr: "Gri madde yalnız kemikte",
          },
          {
            tr: "Ak madde yalnız BOS içinde çözünmüş",
          },
          {
            tr: "İkisi de yalnız çevresel gangliyonun diğer adı",
          },
          {
            tr: "Gri madde yalnız beyincikte bulunur",
          },
        ],
        answer: 0,
        hint: {
          tr: "Kesit içindeki iki doku dağılımını ayır.",
        },
        explanation: {
          tr: "Omurilik kesitinde iç gri bölge ve dış ak bölge görülür. Bu genel düzen, doku türlerinin bütün beyinde yalnız tek konumda bulunması gibi sınırsız sonuçlara dönüştürülmez.",
        },
        skill: "f015-sinir-sistemi-omurilik-1",
      },
      {
        id: "f015-bio-sinir-sistemi-omurilik-2",
        prompt: {
          tr: "Arka kök ile arka boynuz için doğru ayrım hangisidir?",
        },
        options: [
          {
            tr: "İkisi tamamen aynı anatomik parçadır",
          },
          {
            tr: "Arka kök giriş lifleriyle; arka boynuz merkezî gri maddeyle ilişkilidir",
          },
          {
            tr: "Arka boynuz yalnız kas hücresidir",
          },
          {
            tr: "Arka kök yalnız melatonin salgılar",
          },
          {
            tr: "İkisi de beyin yarımkürelerinin başka adıdır",
          },
        ],
        answer: 1,
        hint: {
          tr: "Sinir lif demeti ile merkezî doku bölgesini ayır.",
        },
        explanation: {
          tr: "Kök ve boynuz farklı yapılardır. Arka kök afferent liflerin giriş yoludur; arka boynuz gri maddenin bölgesidir. Aynı yönde çizilmeleri özdeşlik oluşturmaz.",
        },
        skill: "f015-sinir-sistemi-omurilik-2",
      },
      {
        id: "f015-bio-sinir-sistemi-omurilik-3",
        prompt: {
          tr: "Seçili devrede yalnız ön kök motor çıkışı kesilmiş; duyu girişi sağlam. Hangi yorum uygundur?",
        },
        options: [
          {
            tr: "Her duyu yolu bütün vücutta kesin yok olur",
          },
          {
            tr: "Kasın kendisi duyu nöronuna dönüşür",
          },
          {
            tr: "Duyu bilgisi merkeze ulaşabilirken ilgili motor yanıt yolu engellenebilir",
          },
          {
            tr: "Arka kök zorunlu aynı anda kesilmiş sayılır",
          },
          {
            tr: "Bütün bilinç her durumda kaybolur",
          },
        ],
        answer: 2,
        hint: {
          tr: "Giriş ve çıkış oklarını ayrı izle.",
        },
        explanation: {
          tr: "Ön kök motor çıkış yoludur; verilen durumda afferent bağlantı ayrı ve sağlamdır. Sonuç yalnız gösterilen devreyle sınırlıdır; bütün kişi için klinik tanı değildir.",
        },
        skill: "f015-sinir-sistemi-omurilik-3",
      },
      {
        id: "f015-bio-sinir-sistemi-omurilik-4",
        prompt: {
          tr: "Bir duyu nöronu bir motor nöronla doğrudan tek merkezî sinaps yapıyor; kas efektör olarak çizilmiş. Nöron sayısı kaçtır?",
        },
        options: [
          {
            tr: "1",
          },
          {
            tr: "3",
          },
          {
            tr: "4",
          },
          {
            tr: "2",
          },
          {
            tr: "5",
          },
        ],
        answer: 3,
        hint: {
          tr: "Efektörü nöron sayısına ekleme.",
        },
        explanation: {
          tr: "Duyu ve motor iki nörondur. Kas hedef hücresidir; bir merkezî sinapslı seçili yolun nöron sayısı üç diye zorlanamaz.",
        },
        skill: "f015-sinir-sistemi-omurilik-4",
      },
      {
        id: "f015-bio-sinir-sistemi-omurilik-5",
        prompt: {
          tr: "Seçili alt-devrede bir duyu, bir ara ve bir motor nöron ardışık bağlanıyor. Aralarında kaç merkezî sinaps vardır?",
        },
        options: [
          {
            tr: "0",
          },
          {
            tr: "1",
          },
          {
            tr: "3",
          },
          {
            tr: "4",
          },
          {
            tr: "2",
          },
        ],
        answer: 4,
        hint: {
          tr: "Üç ardışık nöron arasındaki bağlantıları say.",
        },
        explanation: {
          tr: "Duyu→ara ve ara→motor iki merkezî sinapstır. Bu sayı gerçek bütün çekilme ağlarının tam hücre sayısı olarak değil, verilen alt-devre için kullanılır.",
        },
        skill: "f015-sinir-sistemi-omurilik-5",
      },
      {
        id: "f015-bio-sinir-sistemi-omurilik-6",
        prompt: {
          tr: "Duyu akson bölümü 0,5 m, hızı 50 m/s. Bu bölümün iletim süresi kaç ms’dir?",
        },
        options: [
          {
            tr: "10",
          },
          {
            tr: "0,01",
          },
          {
            tr: "0,1",
          },
          {
            tr: "1",
          },
          {
            tr: "100",
          },
        ],
        answer: 0,
        hint: {
          tr: "L/v sonucunu saniyeden milisaniyeye çevir.",
        },
        explanation: {
          tr: "0,5/50=0,01 s=10 ms. Çizimdeki uzunluk değil verilen metre değeri kullanılır; bu temsili öğretim verisidir.",
        },
        skill: "f015-sinir-sistemi-omurilik-6",
      },
      {
        id: "f015-bio-sinir-sistemi-omurilik-7",
        prompt: {
          tr: "Duyu ve motor aksonlar toplam 20 ms, her merkezî sinaps 0,5 ms gecikiyor. İki merkezî sinaps ve başka gecikme yoksa toplam kaç ms olur?",
        },
        options: [
          {
            tr: "20",
          },
          {
            tr: "21",
          },
          {
            tr: "20,5",
          },
          {
            tr: "22",
          },
          {
            tr: "40",
          },
        ],
        answer: 1,
        hint: {
          tr: "Sadece verilen iki sinaps katkısını ekle.",
        },
        explanation: {
          tr: "20+2×0,5=21 ms bulunur. Nöromüsküler veya mekanik gecikme dışlandığı için tam klinik hareket süresi diye etiketlenmez.",
        },
        skill: "f015-sinir-sistemi-omurilik-7",
      },
      {
        id: "f015-bio-sinir-sistemi-omurilik-8",
        prompt: {
          tr: "Yerel refleks alt-devresi sağlamken yalnız gösterilen yükselen dal kesiliyor. Hangi sonuç modelle uyumludur?",
        },
        options: [
          {
            tr: "Bütün yerel bağlantılar da zorunlu yok olur",
          },
          {
            tr: "Beyin normalde hiçbir refleksi düzenleyemez",
          },
          {
            tr: "Yerel yanıt kalabilir; bu daldan yukarı bilgi ilerlemez",
          },
          {
            tr: "Bütün gerçek duyular kesin aynı biçimde kaybolur",
          },
          {
            tr: "Kas sayısı zorunlu ikiye katlanır",
          },
        ],
        answer: 2,
        hint: {
          tr: "Dallanan yolların sağlamlığını ayrı denetle.",
        },
        explanation: {
          tr: "Yükselen bilgi dalı ile yerel duyu-motor yol ayrıdır. Verilen kesinti yerel devreyi otomatik silmez; kişinin bütün duyu/bilinç durumu bu şemadan çıkmaz.",
        },
        skill: "f015-sinir-sistemi-omurilik-8",
      },
      {
        id: "f015-bio-sinir-sistemi-omurilik-9",
        prompt: {
          tr: "Bir omurilik siniri hem afferent hem efferent lif taşıyor. Hangi yorum uygundur?",
        },
        options: [
          {
            tr: "Bir tek akson aynı anda bütün nöronların yerine geçer",
          },
          {
            tr: "Sinir demeti kas dokusudur",
          },
          {
            tr: "Bütün lifler yalnız BOS taşır",
          },
          {
            tr: "Demette farklı işlevli lifler bulunabilir; tek aksonun bütün rolleri aynılaşmaz",
          },
          {
            tr: "Afferent ve efferent aynı yönün iki adıdır",
          },
        ],
        answer: 3,
        hint: {
          tr: "Demetin kapsamı ile tek lifin görevini ayır.",
        },
        explanation: {
          tr: "Karışık sinir farklı yön ve hedeflere sahip lifleri birlikte taşıyabilir. Bu, duyu ve motor görevlerinin veya afferent/efferent yönlerinin özdeş olduğu anlamına gelmez.",
        },
        skill: "f015-sinir-sistemi-omurilik-9",
      },
      {
        id: "f015-bio-sinir-sistemi-omurilik-10",
        prompt: {
          tr: "Bir refleksin başlaması için bilinçli kortikal kararın zorunlu olmaması hangi iddiayı desteklemez?",
        },
        options: [
          {
            tr: "Bazı yerel devrelerin hızlı yanıt başlatabildiğini",
          },
          {
            tr: "Bilginin farklı dallardan ilerleyebildiğini",
          },
          {
            tr: "Üst merkezlerle bağlantıların ayrıca incelenebileceğini",
          },
          {
            tr: "Refleks merkezi için sorulan yolun önemli olduğunu",
          },
          {
            tr: "Beynin hiçbir refleks üzerinde düzenleyici etkisinin bulunmadığını",
          },
        ],
        answer: 4,
        hint: {
          tr: "Zorunlu karar ile herhangi bir düzenleyici katkıyı ayır.",
        },
        explanation: {
          tr: "Yerel yanıt kortikal karar beklemeyebilir; buna rağmen üst merkezler refleksleri düzenleyebilir. Korteks zorunlu değil sözünü bütün etkiler yok diye genişletmek yanlıştır.",
        },
        skill: "f015-sinir-sistemi-omurilik-10",
      },
    ],
  },
  {
    id: "sinir-sistemi-css-hastaliklar",
    topic: "detail-290",
    title: "Çevresel sinir sistemi ve hastalık mekanizmaları",
    source:
      "MEBİ AYT Biyoloji, basılı s. 19–22 (PDF 21–24); OGM Sinir Sistemi I, PDF 17; Aurelia AYT 003–004 yer/görev, miyelin ve iletim sınırları. Özgün yol modelleri ve öğretim soruları; kişisel tanı veya tedavi aracı değildir.",
    minutes: 44,
    objectives: [
      "ÇSS’nin duyu ve motor yollarını hedeflerle ilişkilendir.",
      "Somatik ve temel iki nöronlu otonom yolu karşılaştır.",
      "Hastalıkla ilişkili mekanizma ile tek belirtiye dayalı kesin tanıyı ayır.",
    ],
    sections: [
      {
        title: "ÇSS bir haberleşme ağıdır",
        paragraphs: [
          "Çevresel sinir sistemi merkezî sistemle reseptörler ve efektörler arasındaki sinir ve gangliyon bağlantılarını kapsar. Duyu bölümü iç ve dış değişimler hakkında bilgiyi merkeze taşır; motor bölüm yanıtları hedeflere götürür. Sinir akson demeti, gangliyon periferik hücre gövdesi topluluğudur. Bu iki yapı aynı şey değildir ve bir sinir tek bir nöron değildir.",
          "Okulun temel anatomik sayımında 12 çift kafa siniri ve 31 çift omurilik siniri ele alınır; toplam 43 çift, çift başına ikiyle 86 sinir eder. Bu sayı nöron veya bütün küçük sinir dalı sayısı değildir. Sayımın birimini korumak önemlidir. Baş bölgesinde bulunmak da tek başına her yapıyı çevresel veya merkezî seçmek için yeterli değildir; verilen anatomik yapı okunur.",
        ],
      },
      {
        title: "Afferent ve efferent yönünü hedefe göre yaz",
        paragraphs: [
          "Afferent yol bilgiyi merkezî sisteme getirir; efferent yol merkezden ilgili efektöre götürür. Göz, deri veya iç organdaki alıcıdan gelen bilgi duyu görevine aittir. Kas veya bezin yanıtı motor çıkışla ilişkili olabilir. Bir kasın bizzat kasılması ile motor nöronun ona bilgi taşıması farklı hücresel rollerdir.",
          "Bir sinir demetinde farklı görevli lifler bulunabilir. Ayrıca anatomik yer ile işlev yönü farklı sınıflardır: duyu bilgisi merkeze giren bir uzantıda, otonom motor bilgi periferik gangliyonda işlenebilir. Şekilde sağa giden ok her zaman motor değildir; merkez nerede tanımlanmışsa ona göre yön seçilir. Resim çevrilince anatominin görevi değişmez.",
        ],
      },
      {
        title:
          "Somatik yolun hedefi iskelet kasıdır; her yanıt istemli değildir",
        paragraphs: [
          "Somatik motor yollar iskelet kaslarıyla ilişkilidir. Temel modelde merkezî motor nöronun aksonu kas hedefe gider. İstemli hareketler bu sistemi kullanabilir; fakat gerilme veya çekilme gibi somatik refleksler bilinçli karar olmadan da yanıt oluşturabilir. Bu yüzden somatik sistemi her koşulda yalnız istemli yanıt diye tanımlamak eksiktir.",
          "Tek motor nöronlu çıkış modelinin öncesinde duyu girdisi ve merkezî ağlar bulunabilir; bütün devre yalnız tek nörondan oluşuyor demek değildir. Sayılan motor çıkışın nöron sayısıyla tüm duyusal-motor ağın sayısını ayır. Nöromüsküler kavşak hedef kasla özel kimyasal bağlantıdır. Kasın istemsiz refleks yanıtı onu otomatik düz kas veya otonom hedef yapmaz.",
        ],
      },
      {
        title: "Otonom temel yolakta iki motor hücreyi izle",
        paragraphs: [
          "Otonom motor yollar düz kas, kalp kası ve bezler gibi hedeflerle ilişkilidir. Bu dersin temel iki nöronlu yolunda pregangliyonik nöronun gövdesi MSS’dedir; aksonu periferik gangliyonda postgangliyonik nörona bağlanır. İkinci nöronun gövdesi ÇSS’de bulunur ve aksonu hedefe uzanır. Bütün motor gövdeler yalnız MSS içindedir iddiasını bu örnek çürütür.",
          "Bu, otonom sistemin bütün ayrıntıları ve bütün istisnaları tek şemaya sığar demek değildir. Otonom işlevler farklı düzenleyici yollar ve geri bildirimlerle bütünleşir. Hedef organın çalışması her durumda tamamen bilinçsiz veya hiçbir üst merkezle ilişkili olmayan kapalı kutu sayılmaz. Modelin iki motor hücresi ile seçili gangliyon bağlantısını açık göster; görünmeyen tek bir nöron varmış gibi çizme.",
        ],
      },
      {
        title: "Miyelin ve dopaminerjik ağ bozuklukları farklıdır",
        paragraphs: [
          "Multipl skleroz bağlamında merkezî miyelin ve ilgili sinir iletiminin bozulması ele alınır. Yalıtımın bozulması yerel akımın yayılımını ve boğumda yeterli yeniden oluşumu etkileyebilir; gecikme veya iletim aksaması görülebilir. Fakat bütün miyelin sorunları otomatik aynı hastalıktır veya tek uyuşma MS’i kesin gösterir denmez. Bulguların yeri ve klinik değerlendirme önemlidir.",
          "Parkinson bağlamında orta beyindeki dopaminerjik nöronların ve hareket düzenleme ağlarının bozulması öne çıkar. Titreme, katılık veya hareket yavaşlığı gibi bulgularla ilişki kurulabilir; tek bir titremenin tek nedeni Parkinson değildir. Hastalık mekanizmasını öğrenmek ile kişiye tanı veya tedavi seçmek farklı kanıt ister. Tam iyileşme, belirti yönetimi ve destek olanakları da aynı kavram değildir.",
        ],
      },
      {
        title: "Bellek kaybı ve anormal ağ etkinliğini ayır",
        paragraphs: [
          "Alzheimer hastalığında bellek ve başka bilişsel işlevlerle ilişkili ağlar etkilenebilir; hipokampal bölgeler erken dönemde önemli olabilir. Amiloid ve tau ile ilişkili patolojik süreçler hastalık bağlamında incelenir. Normal yaşlanmayı hastalıkla özdeşleştirme ve bütün unutkanlıkları aynı tanı sayma. Bir ders kartındaki ilişki, kişinin bütün bilişsel durumunu ölçmüş olmaz.",
          "Epilepside belirli ağlarda anormal ve aşırı senkronize etkinlikle ilişkili tekrarlayan nöbetler ele alınır. Nöbetlerin biçimleri değişebilir; bütün nöbetlerde aynı hareket ve bilinç kaybı zorunlu değildir. Bazı kişilerde ışık örüntüleri tetikleyici olabilir ama bütün epilepsiler ışıkla tetiklenmez. Bu nedenle uygulama flaşla hastalık deneyi yapmaz; mekanizmayı sakin, isteğe bağlı ve kontrollü şemayla öğretir.",
        ],
      },
      {
        title: "Depresyon ve sağlıklı yaşamda tek neden vaadinden kaçın",
        paragraphs: [
          "Depresyon biyolojik, psikolojik ve çevresel etkenlerin birlikte değerlendirildiği bir durumdur; yalnız tek bir nörotransmitter miktarıyla veya karakter zayıflığıyla açıklanmaz. Uykudaki, istekteki veya iştahtaki değişiklikler tek başına kesin tanı değildir. Tedavi ve destek seçenekleri vardır; ders bir kişiye ilaç, doz veya tek çözüm seçmez.",
          "Dengeli beslenme, uygun uyku, hareket ve sosyal destek sinir sistemi sağlığını destekleyebilir. Bununla birlikte bir vitamin, bulmaca veya besinin herkeste zekâyı kesin artırdığı ya da Alzheimer’ı kesin önlediği söylenemez. Besin eksikliğini gidermek ile eksikliği olmayan herkese aynı ekin fayda garantisi farklıdır. Konu öğreniminde sağlığı koruyan genel alışkanlıklarla kanıtlanmamış tedavi vaadini ayır.",
        ],
      },
      {
        title: "Mekanizma eşleştirmesinde kanıtın sınırı görünür olsun",
        paragraphs: [
          "Bir açıklama “MSS miyelini etkileniyor” dediğinde ilgili ders mekanizması seçilebilir; yalnız “el uyuşuyor” dediğinde aynı kesinlik yoktur. Nörotransmitter, doku, bölge ve devre gibi ek bilgiler seçenekleri daraltır. Hastalık adları arasında bir renk oyunu yerine hangi mekanizmanın hangi kanıta dayandığını yazmak gerekir. Benzer belirti farklı nedenlerle ortaya çıkabilir.",
          "Etkileşimde somatik/otonom hedef ve motor yol değişirken seçilen mekanizma kartı açıklayıcı ilişkiyi ayrıca gösterir. Bu iki sınıflamayı karıştırma: ÇSS yolu öğretmek, bütün sinir hastalıklarının yalnız ÇSS’de olduğu anlamına gelmez. Öğrenme soruları kendi bağlamını ve varsayımını verir; model kullanımı tanı, soru doğrusu veya ustalık kaydı oluşturmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Çift siniri say, nöronu değil",
        prompt:
          "Okul temel sayımında 12 çift kafa ve 31 çift omurilik siniri veriliyor. Çift ve tek sinir sayısını bul.",
        strategy: "Önce aynı birimde topla, sonra çift katsayısını uygula.",
        steps: [
          {
            label: "Çiftleri topla",
            explanation: "İki grup da çift cinsinden verilmiş.",
            expression: "12+31=43 çift",
          },
          {
            label: "Tek sayıya çevir",
            explanation: "Bir çift iki sinir olarak sayılır.",
            expression: "43×2=86 sinir",
          },
          {
            label: "Kapsamı koru",
            explanation:
              "Bu sayım nöron veya bütün küçük dalların sayımı değildir.",
            expression: "sinir ≠ nöron",
          },
        ],
        answer: "43 çift, 86 sinir.",
        check: "Toplam 43’ü tek sinir sayısı gibi yazmadığını denetle.",
        pitfall: "Bir siniri tek bir hücre sayma.",
      },
      {
        title: "Motor gövde nerede olabilir?",
        prompt:
          "Temel otonom modelde ilk motor gövde MSS’de, ikinci gövde periferik gangliyonda; hedef düz kas. Bütün motor gövdeler MSS’de iddiasını değerlendir.",
        strategy: "Görev ile anatomik yer ölçütlerini ayır.",
        steps: [
          {
            label: "Görevleri tanı",
            explanation: "İki hücre de bu seçili motor yolun parçasıdır.",
            expression: "pregangliyonik ve postgangliyonik",
          },
          {
            label: "Yerleri izle",
            explanation: "İlk merkezde, ikinci çevreseldir.",
            expression: "MSS→ÇSS gangliyonu",
          },
          {
            label: "Karşı örneği kur",
            explanation: "İkinci motor gövde ÇSS’de bulunur.",
            expression: "bütün gövdeler MSS iddiası yanlış",
          },
        ],
        answer:
          "Verilen postgangliyonik gövde evrensel iddiaya karşı örnektir.",
        check:
          "Bu temel yol otonom sistemin bütün istisnalarını tüketmiş sayılmaz.",
        pitfall: "Motor görevi merkezî yerle aynı tanım sanma.",
      },
      {
        title: "Hedef iskelet kası ama yanıt otomatik",
        prompt:
          "Bir gerilme refleksinde iskelet kası bilinçli karar beklemeden yanıtlıyor. Bu durum somatik hedefle çelişir mi?",
        strategy: "Kas türü ve istemlilik ölçütlerini ayrı oku.",
        steps: [
          {
            label: "Hedefi belirle",
            explanation: "Verilen hedef iskelet kasıdır.",
            expression: "somatik motor hedef",
          },
          {
            label: "Kararı belirle",
            explanation: "Yanıt refleksle başlayabilir.",
            expression: "bilinçli karar zorunlu değil",
          },
          {
            label: "İlişkiyi kur",
            explanation:
              "Somatik sistem hem istemli hareket hem uygun reflekslerde rol alabilir.",
            expression: "hedef ≠ her zaman istemlilik",
          },
        ],
        answer: "Çelişmez; somatik refleks istemsiz başlayabilir.",
        check: "Kasın otomatik yanıtı onu düz kas yapmaz.",
        pitfall: "İstemsiz gördüğün her olayı otonom diye etiketleme.",
      },
      {
        title: "Bilgi artınca kesinlik nasıl değişir?",
        prompt:
          "İlk kart yalnız titreme diyor. İkinci kart belirli orta beyin dopaminerjik ağ bozulmasını hareket düzenlemesiyle ilişkilendiriyor. Hangi ders yorumu yapılır?",
        strategy:
          "Tek belirtiyle mekanizma verisini farklı kanıt düzeyinde tut.",
        steps: [
          {
            label: "İlk kartı sınırla",
            explanation: "Titremenin farklı nedenleri olabilir.",
            expression: "tek başına kesin tanı yok",
          },
          {
            label: "İkinci veriyi kullan",
            explanation: "Dopaminerjik motor ağ mekanizması verilmiş.",
            expression: "Parkinson bağlamıyla ilişki",
          },
          {
            label: "Kapsamı koru",
            explanation:
              "Ders ilişkisi kişisel tanı veya tedavi seçimi değildir.",
            expression: "mekanizma eşleştirmesi",
          },
        ],
        answer:
          "İkinci kart Parkinson bağlamını öğretir; ilk kart tek başına kesinleştirmez.",
        check:
          "Başka hastalıkları yalnız tek semptomu paylaştığı için özdeş sayma.",
        pitfall: "Bir ders kutusunu kişiye otomatik teşhis sonucu yapma.",
      },
    ],
    recall: [
      {
        prompt: "Afferent ve efferent nasıl ayrılır?",
        answer: "Afferent merkeze getirir, efferent merkezden hedefe götürür.",
      },
      {
        prompt: "Somatik hedef her zaman istemli yanıt mıdır?",
        answer: "Hayır. İskelet kasının somatik refleksleri de olabilir.",
      },
      {
        prompt: "Temel otonom modelde hangi motor gövde çevreseldedir?",
        answer:
          "Postgangliyonik motor nöronun gövdesi periferik gangliyondadır.",
      },
      {
        prompt: "Mekanizma ilişkisi tek belirtiyle tanı demek midir?",
        answer:
          "Hayır. Özgül doku/bölge ve klinik veri gerekir; ders modeli tek başına tanı aracı değildir.",
      },
    ],
    questions: [
      {
        id: "f015-bio-sinir-sistemi-css-hastaliklar-1",
        prompt: {
          tr: "Okul temel anatomik sayımında 12 çift kafa ve 31 çift omurilik siniri var. Toplam çift ve tek sinir sayısı hangisidir?",
        },
        options: [
          {
            tr: "43 çift ve 86 sinir",
          },
          {
            tr: "43 çift ve 43 sinir",
          },
          {
            tr: "86 çift ve 43 sinir",
          },
          {
            tr: "19 çift ve 38 sinir",
          },
          {
            tr: "372 çift ve 744 sinir",
          },
        ],
        answer: 0,
        hint: {
          tr: "Çift cinsinden topladıktan sonra ikiyle çarp.",
        },
        explanation: {
          tr: "12+31=43 çift; 43×2=86 sinir. Bu sayı nöron sayısı veya bütün küçük sinir dallarının tamamı olarak yorumlanmaz.",
        },
        skill: "f015-sinir-sistemi-css-hastaliklar-1",
      },
      {
        id: "f015-bio-sinir-sistemi-css-hastaliklar-2",
        prompt: {
          tr: "Periferik reseptörden merkezî sinir sistemine bilgi taşıyan yolun yönü hangisidir?",
        },
        options: [
          {
            tr: "Efferent motor çıkış",
          },
          {
            tr: "Afferent",
          },
          {
            tr: "Yalnız hedef kasın kasılması",
          },
          {
            tr: "Yalnız BOS akımı",
          },
          {
            tr: "Epifizden kana hormon salımı",
          },
        ],
        answer: 1,
        hint: {
          tr: "Merkeze gelen ile merkezden çıkan yönü ayır.",
        },
        explanation: {
          tr: "Afferent getirici duyu yönüdür. Efferent ise merkezden ilgili efektöre motor çıkışla ilişkilidir; resimde sağa/sola çizilmek bu tanımı değiştirmez.",
        },
        skill: "f015-sinir-sistemi-css-hastaliklar-2",
      },
      {
        id: "f015-bio-sinir-sistemi-css-hastaliklar-3",
        prompt: {
          tr: "Temel iki nöronlu otonom motor yolda postgangliyonik nöronun gövdesi nerededir?",
        },
        options: [
          {
            tr: "Her koşulda yalnız korteksin içinde",
          },
          {
            tr: "Yalnız iskelet kasının çekirdeğinde",
          },
          {
            tr: "Periferik gangliyonda",
          },
          {
            tr: "BOS’un çözünmüş kısmında",
          },
          {
            tr: "Her durumda yalnız epifiz bezinde",
          },
        ],
        answer: 2,
        hint: {
          tr: "Pregangliyonik ve postgangliyonik gövdeleri ayrı izle.",
        },
        explanation: {
          tr: "Verilen temel yolda ilk gövde MSS’de, ikinci motor gövde periferik gangliyondadır. Bu, bütün motor gövdelerin merkezde olduğu iddiasına karşı örnektir.",
        },
        skill: "f015-sinir-sistemi-css-hastaliklar-3",
      },
      {
        id: "f015-bio-sinir-sistemi-css-hastaliklar-4",
        prompt: {
          tr: "İskelet kası bilinçli karar beklemeden bir gerilme refleksine katılıyor. Hangi yorum doğrudur?",
        },
        options: [
          {
            tr: "İskelet kası bu olayda düz kasa dönüşür",
          },
          {
            tr: "Her istemsiz yanıt zorunlu otonomdur",
          },
          {
            tr: "Kasın kendisi ara nörondur",
          },
          {
            tr: "Somatik hedefle uyumludur; somatik yanıt her zaman istemli olmak zorunda değildir",
          },
          {
            tr: "Bu olay bütün duyu girdilerini gereksiz kılar",
          },
        ],
        answer: 3,
        hint: {
          tr: "Hedef doku ile istemlilik ölçütünü ayır.",
        },
        explanation: {
          tr: "Somatik motor yollar iskelet kasıyla ilişkilidir; uygun refleksler bilinçli karar olmadan başlayabilir. İstemsizlik tek başına hedefin otonom olduğunu kanıtlamaz.",
        },
        skill: "f015-sinir-sistemi-css-hastaliklar-4",
      },
      {
        id: "f015-bio-sinir-sistemi-css-hastaliklar-5",
        prompt: {
          tr: "MSS miyelininde bozulma ve ilgili iletim aksaması bir ders kartında anlatılıyor. Hangi bağlamla ilişkilendirilebilir?",
        },
        options: [
          {
            tr: "Her uyuşma için kesin tek tanı",
          },
          {
            tr: "Yalnız kas protein sentezinin tamamen durması",
          },
          {
            tr: "Bütün çevresel sinirlerin tek hücreye dönüşmesi",
          },
          {
            tr: "Yalnız epifizden melatonin artışı",
          },
          {
            tr: "Multipl skleroz bağlamı; tek belirtiyle kişiye kesin tanı konmaz",
          },
        ],
        answer: 4,
        hint: {
          tr: "Verilen doku mekanizmasını klinik kesinlikten ayır.",
        },
        explanation: {
          tr: "Merkezî miyelin ve iletim sorunları MS öğretim bağlamıyla ilişkilidir. Fakat gerçek bir belirtinin nedenini tek karttan belirlemek veya bütün miyelin sorunlarını aynı hastalık saymak doğru değildir.",
        },
        skill: "f015-sinir-sistemi-css-hastaliklar-5",
      },
      {
        id: "f015-bio-sinir-sistemi-css-hastaliklar-6",
        prompt: {
          tr: "Orta beyindeki dopaminerjik nöron ve motor düzenleme ağlarının bozulması hangi hastalık bağlamında ele alınır?",
        },
        options: [
          {
            tr: "Parkinson",
          },
          {
            tr: "Yalnız her sağlıklı uyku evresi",
          },
          {
            tr: "Yalnız periferik reseptörün normal yenilenmesi",
          },
          {
            tr: "Yalnız omurilik kemiğinin uzaması",
          },
          {
            tr: "Bütün nöbet türlerinin değişmez tek mekanizması",
          },
        ],
        answer: 0,
        hint: {
          tr: "Nörotransmitter ve hareket ağı bilgisini birlikte kullan.",
        },
        explanation: {
          tr: "Dopaminerjik motor ağ bozulması Parkinson bağlamında önemlidir. Bu ilişki tek titreme belirtisinin mutlaka bu tanı olduğu veya bütün hareket sorunlarının aynı mekanizmaya sahip olduğu anlamına gelmez.",
        },
        skill: "f015-sinir-sistemi-css-hastaliklar-6",
      },
      {
        id: "f015-bio-sinir-sistemi-css-hastaliklar-7",
        prompt: {
          tr: "Bellek ağı, hipokampal etkilenme ve amiloid/tau ile ilişkili süreçler bir ders kartında veriliyor. Hangi yaklaşım uygundur?",
        },
        options: [
          {
            tr: "Her unutkanlığı kesin aynı tanı saymak",
          },
          {
            tr: "Alzheimer bağlamını öğrenmek; bütün unutkanlığı bu hastalıkla özdeşleştirmemek",
          },
          {
            tr: "Normal yaşlanmayı hastalıkla tamamen aynı kabul etmek",
          },
          {
            tr: "Tek bir bulmacanın herkeste kesin önlediğini söylemek",
          },
          {
            tr: "Bir gözlemden bütün tedavi kararlarını vermek",
          },
        ],
        answer: 1,
        hint: {
          tr: "Mekanizma öğrenimi ile tek belirtiye dayalı genellemeyi ayır.",
        },
        explanation: {
          tr: "Kart Alzheimer bağlamındaki mekanizmaları öğretir. Gerçek unutkanlığın farklı nedenleri olabilir; tek gözlem, normal yaşlanma veya bir alışkanlık hastalık hakkında kesin garanti oluşturmaz.",
        },
        skill: "f015-sinir-sistemi-css-hastaliklar-7",
      },
      {
        id: "f015-bio-sinir-sistemi-css-hastaliklar-8",
        prompt: {
          tr: "Epilepsi için hangi ifade en uygun kapsamı korur?",
        },
        options: [
          {
            tr: "Her nöbet mutlaka aynı hareket ve bilinç kaybıdır",
          },
          {
            tr: "Bütün epilepsiler ışık patlamasıyla tetiklenir",
          },
          {
            tr: "Anormal ağ etkinliğiyle ilişkili nöbetlerin biçimi değişebilir; hepsi ışıkla tetiklenmez",
          },
          {
            tr: "Her ışık rahatsızlığı kesin epilepsi tanısıdır",
          },
          {
            tr: "Tek bir şekil kişiye ilaç seçmeye yeter",
          },
        ],
        answer: 2,
        hint: {
          tr: "Bazı tetikleyicileri bütün hastalara yayma.",
        },
        explanation: {
          tr: "Epilepsi farklı nöbet türleri ve koşullar içerir. Fotosensitivite bazı kişilerde önemli olabilir; bu, bütün nöbetlerin aynı olduğu veya tek tetikleyici gözleminin tanı koydurduğu anlamına gelmez.",
        },
        skill: "f015-sinir-sistemi-css-hastaliklar-8",
      },
      {
        id: "f015-bio-sinir-sistemi-css-hastaliklar-9",
        prompt: {
          tr: "Depresyonun nedenlerini konu alan bir açıklamada hangi yaklaşım uygundur?",
        },
        options: [
          {
            tr: "Yalnız karakter zayıflığı demek",
          },
          {
            tr: "Herkeste tek bir nörotransmitter sayısıyla bütün sonucu açıklamak",
          },
          {
            tr: "Uykudaki her değişikliği kesin aynı tanı saymak",
          },
          {
            tr: "Biyolojik, psikolojik ve çevresel etkenleri birlikte değerlendirmek",
          },
          {
            tr: "Herkese aynı ilaç ve dozu bu dersten seçmek",
          },
        ],
        answer: 3,
        hint: {
          tr: "Tek nedene indirgeme yerine farklı kanıt katmanlarını koru.",
        },
        explanation: {
          tr: "Depresyon çok etkenli değerlendirilir; karakter yargısı veya tek moleküle dayalı kesinlik doğru değildir. Ders mekanizma ve kanıt sınırlarını öğretir; kişisel tanı ve tedavi seçmez.",
        },
        skill: "f015-sinir-sistemi-css-hastaliklar-9",
      },
      {
        id: "f015-bio-sinir-sistemi-css-hastaliklar-10",
        prompt: {
          tr: "Sağlıklı uyku ve dengeli beslenmeyle ilgili hangi ifade savunulabilir?",
        },
        options: [
          {
            tr: "Bir vitamin herkeste Alzheimer’ı kesin önler",
          },
          {
            tr: "Bulmaca bütün hastalıkların tek tedavisidir",
          },
          {
            tr: "Eksikliği olmayan herkes aynı ekten zorunlu aynı yararı görür",
          },
          {
            tr: "Bu alışkanlıklar gerekli tıbbi değerlendirmeyi her zaman kaldırır",
          },
          {
            tr: "Sinir sistemi sağlığını destekleyebilir; herkeste zekâ artışı veya kesin hastalık önleme garantisi vermez",
          },
        ],
        answer: 4,
        hint: {
          tr: "Destekleyici alışkanlık ile koşulsuz tedavi vaadini ayır.",
        },
        explanation: {
          tr: "Genel sağlıklı alışkanlıklar yararlı olabilir; bireysel durum ve hastalık mekanizmaları değişir. Bu bilgilerden herkes için aynı kesin koruma veya tedavi sonucu çıkmaz.",
        },
        skill: "f015-sinir-sistemi-css-hastaliklar-10",
      },
    ],
  },
];
export const forge015BiologyTopics: Record<string, string> = Object.fromEntries(
  data.map((d) => [d.id, d.topic]),
);
export const forge015BiologyGuides: LessonGuide[] = data.map((d) => ({
  id: d.id,
  minutes: d.minutes,
  objectives: d.objectives,
  sections: d.sections,
  examples: d.examples,
  recall: d.recall,
  source: d.source,
}));
export const forge015BiologyLessons: Lesson[] = data.map((d) => ({
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
  tags: ["kaynakli", "etkilesimli", "forge015"],
}));
