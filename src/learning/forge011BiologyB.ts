import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

export interface AnimalEvidence {
  id: string;
  label: string;
  matches: string[];
  reason: string;
}
export const invertebrateSamples = [
  { id: "sponge", name: "Deniz süngeri", group: "Süngerler" },
  { id: "hydra", name: "Hidra", group: "Sölenterler" },
  { id: "flatworm", name: "Planarya", group: "Yassı solucanlar" },
  { id: "roundworm", name: "Bağırsak solucanı", group: "Yuvarlak solucanlar" },
  { id: "earthworm", name: "Toprak solucanı", group: "Halkalı solucanlar" },
  { id: "mussel", name: "Midye", group: "Yumuşakçalar" },
  { id: "octopus", name: "Ahtapot", group: "Yumuşakçalar" },
  { id: "insect", name: "Çekirge", group: "Eklembacaklılar · böcek" },
  { id: "spider", name: "Örümcek", group: "Eklembacaklılar · örümceğimsi" },
  { id: "crab", name: "Yengeç", group: "Eklembacaklılar · kabuklu" },
  { id: "centipede", name: "Çıyan", group: "Eklembacaklılar · çok ayaklı" },
  { id: "starfish", name: "Denizyıldızı", group: "Derisidikenliler" },
] as const;
export const invertebrateEvidence: AnimalEvidence[] = [
  {
    id: "all",
    label: "Yalnız omurgası yok",
    matches: invertebrateSamples.map((s) => s.id),
    reason:
      "Bu geniş özellik bütün örneklerde var; tek bir yakın grup seçtirmez.",
  },
  {
    id: "pores",
    label: "Porlar var, gerçek doku yok",
    matches: ["sponge"],
    reason:
      "Su süzen porlu yapı ve gerçek doku-organ yokluğu süngerle uyumludur.",
  },
  {
    id: "stinging",
    label: "Yakıcı hücre var",
    matches: ["hydra"],
    reason:
      "Yakıcı hücre, hidranın sölenter grubuna yerleştirilmesini destekler.",
  },
  {
    id: "closed",
    label: "Kapalı dolaşım var",
    matches: ["earthworm", "octopus"],
    reason:
      "Halkalı solucan ile kafadanbacaklı yumuşakça kalır. Omurgasız olmak açık dolaşımı zorunlu kılmaz.",
  },
  {
    id: "mantle",
    label: "Manto ve kaslı ayak planı var",
    matches: ["mussel", "octopus"],
    reason:
      "Midye ve ahtapot yumuşakçadır; ahtapotun ayağı kollar yönünde özelleşmiştir.",
  },
  {
    id: "jointed",
    label: "Kitin dış iskelet ve eklemli üyeler var",
    matches: ["insect", "spider", "crab", "centipede"],
    reason:
      "Eklembacaklı üst grubu ayrılır; böcek için ek alt grup kanıtı gerekir.",
  },
  {
    id: "trachea",
    label: "Trake bulunabiliyor",
    matches: ["insect", "spider", "centipede"],
    reason:
      "Trake böceklerde tipiktir fakat bazı örümceğimsiler ve çok ayaklılarda da bulunabilir. Bu özellik tek başına böceğe özgü değildir.",
  },
  {
    id: "sixlegs",
    label: "Göğüste üç çift bacak var",
    matches: ["insect"],
    reason:
      "Böcek vücut planının ayırıcı kanıtı göğüste üç çift bacaktır; anten ve trake tek başına bu sonucu sağlamaz.",
  },
  {
    id: "tube",
    label: "Su damar sistemi ve tüp ayak var",
    matches: ["starfish"],
    reason:
      "Denizyıldızının derisidikenli oluşunu destekleyen yapılar su damar sistemi ve tüp ayaklardır; denizde yaşaması tek başına yeterli değildir.",
  },
];
export function filterInvertebrates(first: string, second = "all") {
  const a = invertebrateEvidence.find((e) => e.id === first);
  const b = invertebrateEvidence.find((e) => e.id === second);
  if (!a || !b) throw new RangeError("INVERTEBRATE_EVIDENCE");
  return invertebrateSamples.filter(
    (sample) => a.matches.includes(sample.id) && b.matches.includes(sample.id),
  );
}

export const vertebrateSamples = [
  {
    id: "carp",
    name: "Sazan",
    group: "Balıklar",
    cover: "Pullar",
    respiration: "Solungaç",
    heart: 2,
    thermal: "Ektoterm",
    reproduction: "Tipik sazan örneğinde dış döllenme ve dış gelişme",
    clue: "Solungaç ve iki odacıklı kalp birlikte balık planını gösterir.",
  },
  {
    id: "frog",
    name: "Ergin kurbağa",
    group: "İki yaşamlılar",
    cover: "Nemli, çıplak deri",
    respiration: "Akciğer ve deri; larvada solungaç",
    heart: 3,
    thermal: "Ektoterm",
    reproduction: "Bu kurbağa örneğinde dış döllenme, suda larva ve başkalaşım",
    clue: "Larva-ergin değişimiyle nemli deri iki yaşamlıları ayırır.",
  },
  {
    id: "lizard",
    name: "Kertenkele",
    group: "Sürüngenler",
    cover: "Kuru keratin pullar",
    respiration: "Akciğer",
    heart: 3,
    thermal: "Ektoterm",
    reproduction: "Seçilen örnekte iç döllenme ve amniyotik yumurta",
    clue: "Kuru keratinli pul ve akciğer sürüngen kanıtıdır; bütün sürüngenlerde kalp üç odacıklı değildir.",
  },
  {
    id: "crocodile",
    name: "Timsah",
    group: "Sürüngenler",
    cover: "Kuru keratinleşmiş örtü ve plakalar",
    respiration: "Akciğer",
    heart: 4,
    thermal: "Ektoterm",
    reproduction: "İç döllenme, yumurta ve yavru bakımı",
    clue: "Dört odacıklı kalp tek başına kuş veya memeli demek değildir: timsah sürüngendir.",
  },
  {
    id: "penguin",
    name: "Penguen",
    group: "Kuşlar",
    cover: "Tüy",
    respiration: "Akciğer ve hava keseleri",
    heart: 4,
    thermal: "Endoterm",
    reproduction: "İç döllenme, yumurta ve yavru bakımı",
    clue: "Uçamaması kuş oluşunu değiştirmez; tüy ayırıcı kanıttır. Hava keseleri gaz değişiminin temel yüzeyi değildir.",
  },
  {
    id: "bat",
    name: "Yarasa",
    group: "Memeliler",
    cover: "Kıl ve süt bezleri",
    respiration: "Akciğer",
    heart: 4,
    thermal: "Endoterm",
    reproduction: "İç döllenme, doğum ve sütle besleme",
    clue: "Uçmak kuşa özgü değildir. Kıl ve süt bezleri yarasanın memeli oluşunu ayırır.",
  },
  {
    id: "dolphin",
    name: "Yunus",
    group: "Memeliler",
    cover: "Kıl örtüsü belirgin değil; süt bezleri var",
    respiration: "Akciğer",
    heart: 4,
    thermal: "Endoterm",
    reproduction: "İç döllenme, doğum ve sütle besleme",
    clue: "Suda yaşamak ve yüzgeçli görünmek balık kanıtı değildir; yunus hava solur ve yavrusunu sütle besler.",
  },
  {
    id: "platypus",
    name: "Ornitorenk",
    group: "Memeliler",
    cover: "Kıl ve süt bezleri",
    respiration: "Akciğer",
    heart: 4,
    thermal: "Endoterm",
    reproduction: "İç döllenme, yumurtlama ve sütle besleme",
    clue: "Yumurtlamak memeli oluşunu dışlamaz. Ornitorenk yumurtlayan memelidir; süt bezi daha ayırt edicidir.",
  },
] as const;
export function vertebrateSample(id: string) {
  const sample = vertebrateSamples.find((s) => s.id === id);
  if (!sample) throw new RangeError("VERTEBRATE_SAMPLE");
  return sample;
}

export const mitosisStages = [
  "G₁",
  "S tamamlandı",
  "Profaz",
  "Metafaz",
  "Anafaz",
  "Telofaz",
  "Sitokinez tamamlandı",
] as const;
export const meiosisStages = [
  "G₁",
  "S tamamlandı",
  "Profaz I",
  "Metafaz I",
  "Anafaz I",
  "Sitokinez I tamamlandı",
  "Metafaz II",
  "Anafaz II",
  "Sitokinez II tamamlandı",
] as const;
export interface DivisionSnapshot {
  cells: number;
  chromosomes: number;
  dnaMolecules: number;
  dnaC: number;
  totalDnaMolecules: number;
  poleChromosomes?: number;
  poleDnaMolecules?: number;
  statement: string;
}
export function divisionSnapshot(
  kind: "mitosis" | "meiosis",
  stage: number,
  diploid: number,
): DivisionSnapshot {
  const last = kind === "mitosis" ? 6 : 8;
  if (
    !Number.isInteger(stage) ||
    stage < 0 ||
    stage > last ||
    ![2, 4, 6, 8].includes(diploid)
  )
    throw new RangeError("DIVISION_SCOPE");
  const n = diploid / 2;
  if (stage === 0)
    return {
      cells: 1,
      chromosomes: diploid,
      dnaMolecules: diploid,
      dnaC: 2,
      totalDnaMolecules: diploid,
      statement:
        "G₁: iki homolog takım var. Bir kromozom bir DNA molekülü taşır; C bir eşlenmemiş haploit takımın DNA miktarıdır.",
    };
  if (kind === "mitosis") {
    if (stage === 6)
      return {
        cells: 2,
        chromosomes: diploid,
        dnaMolecules: diploid,
        dnaC: 2,
        totalDnaMolecules: 2 * diploid,
        statement:
          "İki ayrı yavrunun her birinde başlangıçtaki takım sayısı ve G₁ DNA miktarı korunur. Normal ayrılma ve yeni mutasyon olmaması varsayılır.",
      };
    if (stage >= 4)
      return {
        cells: 1,
        chromosomes: 2 * diploid,
        dnaMolecules: 2 * diploid,
        dnaC: 4,
        totalDnaMolecules: 2 * diploid,
        poleChromosomes: diploid,
        poleDnaMolecules: diploid,
        statement:
          stage === 4
            ? "Kardeşler ayrıldı: hücre bütünü geçici olarak iki kat kromozom sayar. DNA yeniden eşlenmedi; bir kutup başlangıç sayısını alır."
            : "İki çekirdek bölgesi oluştu fakat sitoplazma henüz ayrılmadı. Bütün hücrenin toplamı ile tek çekirdeği karıştırma.",
      };
    return {
      cells: 1,
      chromosomes: diploid,
      dnaMolecules: 2 * diploid,
      dnaC: 4,
      totalDnaMolecules: 2 * diploid,
      statement:
        stage === 1
          ? "DNA eşlendi; kardeş kromatitler birlikte kaldığı için kromozom sayısı ve takım sayısı artmadı."
          : stage === 2
            ? "Profazda eşlenmiş kromozomlar yoğunlaşır. Şemadaki X iki kardeşiyle tek kromozomdur."
            : "Metafazda eşlenmiş kromozomlar tek tek orta düzleme dizilir. Homologlar tetrat oluşturmaz.",
    };
  }
  if (stage === 8)
    return {
      cells: 4,
      chromosomes: n,
      dnaMolecules: n,
      dnaC: 1,
      totalDnaMolecules: 2 * diploid,
      statement:
        "Dört haploit hücresel ürünün her biri n kromozom ve C DNA taşır. Dört ürün, dört işlevsel yumurta demek değildir.",
    };
  if (stage === 7)
    return {
      cells: 2,
      chromosomes: diploid,
      dnaMolecules: diploid,
      dnaC: 2,
      totalDnaMolecules: 2 * diploid,
      poleChromosomes: n,
      poleDnaMolecules: n,
      statement:
        "Anafaz II: her bölünmemiş hücrede kardeşler ayrı kromozom sayılır. Tek kutup n alır; bu geçici bütün-hücre sayımı diploit yavru oluştuğunu göstermez.",
    };
  if (stage >= 5)
    return {
      cells: 2,
      chromosomes: n,
      dnaMolecules: diploid,
      dnaC: 2,
      totalDnaMolecules: 2 * diploid,
      statement:
        stage === 5
          ? "Mayoz I bitti: her hücre haploittir ama kromozomları hâlâ iki kardeşlidir. İki bölünme arasında yeni DNA eşlenmesi olmaz."
          : "Metafaz II: iki haploit hücrenin her birinde eşlenmiş kromozomlar tek tek dizilir. İkinci bir S evresi gerçekleşmedi.",
    };
  return {
    cells: 1,
    chromosomes: diploid,
    dnaMolecules: 2 * diploid,
    dnaC: 4,
    totalDnaMolecules: 2 * diploid,
    ...(stage === 4 ? { poleChromosomes: n, poleDnaMolecules: diploid } : {}),
    statement:
      stage === 1
        ? "Eşlenme bir kez gerçekleşti: 2n korunurken DNA 2C’den 4C’ye çıktı."
        : stage === 2
          ? `Profaz I: ${n} homolog çift, ${n} tetrat oluşturabilir. Her tetratta dört kromatit vardır.`
          : stage === 3
            ? "Metafaz I: homolog çiftler karşılıklı dizilir. Çiftlerin yönelimleri birbirinden bağımsız olabilir."
            : "Anafaz I: homologlar ayrılır; aynı kromozomun kardeşleri birlikte gider. Bir kutup n kromozom ve 2C DNA alır.",
  };
}
export function independentProducts(reverseSecond: boolean) {
  return reverseSecond ? ["Ab", "Ab", "aB", "aB"] : ["AB", "AB", "ab", "ab"];
}
export function crossoverProducts(exchange: boolean) {
  return exchange ? ["AB", "Ab", "aB", "ab"] : ["AB", "AB", "ab", "ab"];
}
export function synchronousGrowth(
  initial: number,
  rounds: number,
  selected: number,
  loss: number,
) {
  if (
    ![initial, rounds, selected, loss].every(Number.isInteger) ||
    initial < 1 ||
    initial > 20 ||
    rounds < 0 ||
    rounds > 6 ||
    selected < 0 ||
    loss < 0
  )
    throw new RangeError("GROWTH_SCOPE");
  const afterRounds = initial * 2 ** rounds;
  if (selected > afterRounds || loss > afterRounds + selected)
    throw new RangeError("GROWTH_POPULATION");
  return { afterRounds, result: afterRounds + selected - loss };
}
export const asexualScenarios = [
  {
    id: "bud",
    name: "Hidrada çıkıntı",
    mechanism: "Tomurcuklanmayla eşeysiz üreme",
    newIndividual: true,
    fertilization: false,
    finalCount: 2,
    detail:
      "Ata üzerinde büyüyen tomurcuk ayrılıp yeni hidra olur. Bu örnekte bir ata ile bir yavru kalır.",
  },
  {
    id: "fragment",
    name: "Planaryada iki uygun parça",
    mechanism: "Rejenerasyonla eşeysiz üreme",
    newIndividual: true,
    fertilization: false,
    finalCount: 2,
    detail:
      "İki uygun parçanın her birinin bağımsız birey oluşturduğu verilmiştir. Yenilenme yeni birey kazandırır; her türde her parça için genellenmez.",
  },
  {
    id: "repair",
    name: "Kertenkelenin kuyruğu",
    mechanism: "Onarım; üreme değil",
    newIndividual: false,
    fertilization: false,
    finalCount: 1,
    detail:
      "Ata kendi kuyruğunu tamamlar; atılan kuyruktan kertenkele oluşmaz. Bir bağımsız birey kalır.",
  },
  {
    id: "endospore",
    name: "Bakteride endospor",
    mechanism: "Dayanıklılık; üreme değil",
    newIndividual: false,
    fertilization: false,
    finalCount: 1,
    detail:
      "Bir bakteri bir endospor oluşturur, uygun koşulda bir bakteri geri döner. 1→1→1 sayısı üremeyle artmaz.",
  },
  {
    id: "cutting",
    name: "Söğüt dalının köklenmesi",
    mechanism: "Vejetatif eşeysiz üreme",
    newIndividual: true,
    fertilization: false,
    finalCount: 2,
    detail:
      "Yaşayan ana söğütten alınan tek dal köklenir. Ana bitki ve yeni köklenmiş bitki iki ayrı bireydir; embriyo döllenmeyle başlamaz.",
  },
  {
    id: "seed",
    name: "Döllenmeyle oluşmuş tohum",
    mechanism: "Eşeyli üremenin gelişme evresi",
    newIndividual: true,
    fertilization: true,
    finalCount: 2,
    detail:
      "İzlenen ana bitki yaşarken, daha önce döllenmeyle oluşmuş tek embriyo yeni bitkiye gelişir. Tohumu toprağa ekmek önceki döllenmeyi silmez.",
  },
] as const;
export function asexualScenario(id: string) {
  const sample = asexualScenarios.find((s) => s.id === id);
  if (!sample) throw new RangeError("REPRODUCTION_SCENARIO");
  return sample;
}

const sec = (
  title: string,
  first: string,
  second: string,
  table?: GuideSection["table"],
): GuideSection => ({
  title,
  paragraphs: [first, second],
  ...(table ? { table } : {}),
});
const worked = (
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
const q = (
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

const invertebrateGuide: LessonGuide = {
  id: "omurgasizlar",
  minutes: 85,
  objectives: [
    "Ortak hayvan planından gruba özgü kanıta geç.",
    "Altı okul grubunu örnekleri ve sistemleriyle karşılaştır.",
    "Tümü, çoğu ve yalnızca koşullarını karşı örnekle sınayarak yorumla.",
    "Ekolojik rolü, rejenerasyonu ve üreme kanıtını ayır.",
  ],
  sections: [
    sec(
      "Omurgasızlık bir yokluk özelliğidir",
      "Omurgasız hayvanlarda omurga bulunmaz; bu geniş etiket tek bir yakın akrabalık dalının adı değildir. Okul düzeyinde süngerler, sölenterler, solucanlar, yumuşakçalar, eklembacaklılar ve derisidikenliler karşılaştırılır. Ortak hayvan planında ökaryot hücre, çok hücreli organizasyon, hücre duvarının olmaması ve heterotrof beslenme bulunur. Bir canlıyı mantardan ayırırken yalnız heterotrof olmasına bakmak yetmez; mantarda hücre duvarı vardır.",
      "Omurga yokluğu iskelet yokluğu demek değildir: eklembacaklı kitin dış iskelet, derisidikenli kireçli iç iskelet taşır. Yer değiştirme, tek bir simetri veya açık dolaşım bütün örneklerin ortak özelliği değildir. Sünger gibi erginleri zemine bağlı hayvanlar bulunur. Karşılaştırmada ‘hayvan’, ‘omurgasız’ ve ‘yalnız bu alt grup’ katmanlarını ayrı oku; geniş ortaklığı dar tanı yerine kullanma.",
    ),
    sec(
      "Sünger: su süzen hücrelerin iş bölümü",
      "Süngerlerin gövdesindeki çok sayıdaki por, suyun içeri girişine olanak verir. Su akımı hücrelere besin parçacığı ve oksijen getirir; atıkların uzaklaşmasına yardım eder. Gerçek doku ve organ sistemleri bulunmaz; hücrelerin iş birliğiyle organizasyon sürer. Yakalanan besinler hücre içi sindirilir. Özel bir kalp veya akciğer aramak bu organizasyon düzeyine yanlış bir beklenti taşımaktır.",
      "Süngerlerde eşeyli üreme yanında parçalanma veya tomurcuklanmayla eşeysiz yollar görülebilir. Yenilenme yeteneği tür ve koşulla sınırlıdır; herhangi bir parçadan mutlaka birey oluşur denmez. Su süzme, ekosistemde madde döngüsü ve su kalitesiyle ilişkilidir. Bir soruda denizde yaşama ortak, por ve gerçek doku yokluğu ise birlikte daha ayırt edici kanıttır.",
    ),
    sec(
      "Sölenter: yakıcı hücre ve tek açıklık",
      "Hidra, denizanası ve mercan gibi sölenterlerde yakıcı hücreler avlanma ve savunmada kullanılır. Ağsı sinir ağı ve doku düzeyinde organizasyon görülür; süngerle aynı hücresel düzeyde değillerdir. Sindirim boşluğunun tek açıklığı besin girişine ve artık çıkışına hizmet eder. Hücre dışı başlayan sindirim hücre içinde tamamlanabilir; özel dolaşım ve solunum organları bulunmaz.",
      "Polip gövde genellikle zemine bağlı, medüz gövde serbest yüzücü formdur. Hidranın tomurcuklanması eşeysiz bir örnektir; her sölenterin bütün yaşamı yalnız bu yolla geçmez. Bazı türlerde eşeyli ve eşeysiz evreler birbirini izler. Mercanların başka canlılarla ortaklıkları ve resif oluşturması ekolojik önem taşır; bütün türlerin aynı ortaklığı veya ışık üretimini taşıdığı varsayılmaz.",
    ),
    sec(
      "Solucanları gövde benzerliğinde birleştirme",
      "Yassı, yuvarlak ve halkalı solucanlar farklı vücut planlarıdır. Planarya ve tenya yassı solucanlara; bağırsak solucanı yuvarlak solucanlara; toprak solucanı ve sülük halkalı solucanlara örnektir. Planaryada tek açıklıklı sindirim boşluğu bulunurken tenya gibi parazitlerde sindirim sistemi yoktur. Yuvarlak ve halkalı solucanlarda ağız ve anüsün ayrı olduğu bir sindirim kanalı bulunur.",
      "Halkalı solucanların segmentli gövdesi ve kapalı dolaşımı önemlidir. Serbest yaşayan ve parazit türleri aynı beslenme ya da boşaltım kalıbına zorlanmaz. Vücut yüzeyinden gaz alışverişi yapan örneklerde nemli yüzey işlevseldir; her solucanın aynı habitat, sistem ve üreme özelliğinde olduğu söylenemez. Hermafroditlik iki gamet türünün aynı bireyde üretilmesidir; kendini döllemeyi veya eşeysizliği zorunlu kılmaz.",
    ),
    sec(
      "Yumuşakça: manto ve değişen ayak",
      "Yumuşakçaların temel vücut planında manto, iç organ kitlesi ve kaslı ayak bulunur. Manto kabuk oluşturabilen dokudur; her yumuşakçanın belirgin dış kabuğu olması gerekmez. Midye, salyangoz, ahtapot ve kalamar bu grubun farklılaşmış örnekleridir. Ahtapotun ayağı kollar yönünde özelleşmiştir; sınıflandırma sırf kabuk görünüşüne indirgenmez.",
      "Çoğu yumuşakçada açık dolaşım görülürken kafadanbacaklı ahtapot ve kalamarda kapalı dolaşım bulunur. Suda solungaç, karasal salyangozda özelleşmiş manto boşluğu gaz alışverişine katılabilir. Midyenin süzerek beslenmesi ile ahtapotun avcılığı aynı beslenme biçimi değildir. İnci ve besin üretimi ekonomik örneklerdir; kullanım alanı yapısal sınıflandırma kanıtının yerine geçmez.",
    ),
    sec(
      "Eklembacaklı: dış iskelet, eklem ve büyüme",
      "Eklembacaklıların kitinli dış iskeleti korur, kaslara tutunma yüzeyi sağlar ve su kaybını azaltabilir. Sert örtü büyümeyi sınırladığından deri değiştirme gerekir. Eklemli üyeler yürüme, yüzme, uçma, beslenme ve duyu için farklılaşabilir. Açık dolaşım bu grubun temel özelliğidir; dolaşım sıvısının görevlerini her alt grupta aynı sanma.",
      "Böceklerde trake gazı dokulara taşıyan temel yoldur; dolaşım sıvısı genellikle solunum gazlarını taşımaz. Örümceğimsilerde kitapsı akciğer ve/veya trake, kabuklularda solungaç görülebilir. Sucul ve karasal eklembacaklıların boşaltım atığı veya döllenme biçimi koşulsuz aynılaştırılmaz. Başkalaşım embriyo sonrasındaki gelişim evrelerinde görülebilir; yalnız embriyonik dönemde olur genellemesi yapılmaz.",
    ),
    sec(
      "Böcek mi, başka eklembacaklı mı?",
      "Böceklerde tipik vücut baş, göğüs ve karın olarak bölümlenir; üç çift bacak göğüste bulunur. Bir çift anten de tipiktir fakat anten yalnız böceğe özgü değildir. Örümceğimsiler genellikle dört çift yürüme bacağı taşır ve antenleri yoktur. Kabukluların iki çift anteni, çok ayaklıların çok segmentli gövdesi ayırmada yararlıdır.",
      "‘Trake gördüm, kesin böcektir’ kısa yolu geçersizdir; bazı örümceğimsiler ve çok ayaklılar da trake taşıyabilir. ‘Kitin dış iskelet’ üst grubu, ‘göğüste üç çift bacak’ alt grubu ayırır. İki bağımsız kanıtı birleştir; bir özelliğin tipik olması yalnız o grupta bulunduğunu kanıtlamaz. Etkileşimli kanıt süzgecinde tek ve çift koşulun bıraktığı adayları bu yüzden karşılaştır.",
    ),
    sec(
      "Derisidikenli: omurgasız ama iç iskeletli",
      "Denizyıldızı, denizkestanesi ve denizhıyarı denizel derisidikenlilerdir. Su damar sistemi ve bununla bağlantılı tüp ayaklar hareket, tutunma ve gaz alışverişi gibi işlevlere katılır. Kireçli iç iskelet bulunması onları omurgalı yapmaz; omurga ile iç destek yapısı aynı şey değildir. Erginlerde genellikle beşli ışınsal düzen görülürken larvalar iki yanlı simetri gösterebilir.",
      "Bazı denizyıldızlarında uygun parça yeni birey oluşturabilir; çoğu örnekte merkezî diskten pay ve türün yenilenme kapasitesi önemlidir. Kopan kolun yerine yenisinin gelmesi tek başına üreme değildir. Adındaki ‘yıldız’ veya yaşam alanı sınıflandırma yerine geçmez. Denizel olmak sünger, mercan, midye ve yengeçte de bulunduğundan su damar sistemi daha özgül kanıttır.",
    ),
    sec(
      "Sistemleri yok, açık ve kapalı diye ayır",
      "Açık dolaşımda dolaşım sıvısı damar dışı boşluklara çıkabilir; kapalı dolaşımda damarlar içinde kalır. Özel dolaşım sistemi olmayan sünger ve sölenteri bu iki sistemden birine zorla yerleştirme. Halkalı solucanlar ve kafadanbacaklı yumuşakçalar kapalı dolaşımla, eklembacaklılar açık dolaşımla karşılaştırılır. Çoğu yumuşakçanın açık oluşu bütün gruba yayılmaz.",
      "Solunumda vücut yüzeyi, solungaç, trake ve kitapsı akciğer farklı örneklerdir. Bir canlının çok hücreli olması her hücresine mutlaka kan damarı gittiği anlamına gelmez. ‘Tümünde ortak’ sorusunda evrensel iddiayı en farklı örnekle sına. Özelleşmiş sistemlerin farkı bir canlıyı değer bakımından üstün veya aşağı yapmaz; çevre ve vücut planı içindeki işlevi açıklar.",
    ),
    sec(
      "Ekolojik rolü kanıtla ilişkilendir",
      "Tozlaştırıcı böcekler bitkilerin üremesine, toprak solucanları toprağın fiziksel yapısı ve organik maddenin işlenmesine, süzücü canlılar su ekosistemlerine katkıda bulunur. Bazı türler parazit, bazıları doğal avcıdır; bütün omurgasızları zararlı veya yararlı diye tek sepete koyma. Biyolojik mücadelede hedef zararlının doğal düşmanından yararlanılırken ekolojik etkiler ayrıca değerlendirilir.",
      "Soru çözümünde önce istenen düzeyi yaz: ortak özellik, alt grup, sistem veya ekolojik rol mü? Sonra en özgül yapıyı seç, bir karşı örnek ara ve ‘tümü/çoğu/bazısı’ koşulunu kontrol et. Kanıt süzgecinde iki uyumsuz özellik seçince aday kalmaması gerçek dünyada hayvan bulunmadığı anlamına gelmez; bu sınırlı örnek paketinde uyumlu örnek bulunmadığını söyler.",
    ),
  ],
  examples: [],
  recall: [],
  source:
    "MEBİ TYT Biyoloji Konu Özetleri, basılı s.90–93; Aurelia Omurgasızlar kopya kağıdı, s.1–3 ve5–6 temel öğretim/karşılaştırmalarıyla kontrol edilmiş özgün anlatım ve modeller. Sorular resmî sınav sorusu değildir.",
};

const vertebrateGuide: LessonGuide = {
  id: "omurgalilar",
  minutes: 85,
  objectives: [
    "Beş omurgalı okul grubunu ortak plandan ayır.",
    "Örtü, solunum, dolaşım, ısı ve gelişme kanıtlarını birlikte kullan.",
    "Yunus, yarasa, timsah ve ornitorenk karşı örnekleriyle kesin iddiaları denetle.",
    "Kuş ve memeli özelliklerini habitatla karıştırmadan açıkla.",
  ],
  sections: [
    sec(
      "Ortak omurgalı planından başla",
      "Omurgalılar kordalı hayvanların bir grubudur; omurga ve kafatasıyla ilişkili iç destek planı taşırlar. İç iskelet kıkırdak veya kemikten oluşabilir; bütün iç iskeletli hayvanlar omurgalı değildir. Sinir sisteminin sırt tarafındaki düzeni, kapalı dolaşım ve böbreklerle boşaltım okul düzeyindeki ortak karşılaştırma noktalarıdır. Kanın oksijen taşıyan hemoglobini tipik olarak alyuvarlarda bulunur.",
      "Okul karşılaştırmasında balıklar, iki yaşamlılar, sürüngenler, kuşlar ve memeliler kullanılır. Bu beşli tablo modern evrim ağacının tüm dallanmasını temsil etmez; örneğin kuşlar evrimsel olarak sürüngen soyunun içindedir. Öğretim tablosunu işlev karşılaştırması olarak kullan. ‘Bütün omurgalılarda akciğer, dört odacık ve aynı vücut ısısı vardır’ iddiasını balık örneğiyle hemen sınayabilirsin.",
    ),
    sec(
      "Balık: solungaç ve tek dolaşım",
      "Sazan gibi tipik kemikli balıklarda solungaç gaz alışverişi yapar, kalbin iki ana odacığından çıkan kan önce solungaçlara sonra vücuda gider. Bu dolaşım tek çevrimlidir. Kıkırdaklı köpek balığı ve vatoz ile kemikli hamsi veya sazan aynı iskelet maddesini taşımak zorunda değildir. Yüzme kesesi birçok kemikli balıkta bulunur; köpek balığının yüzme kesesi yoktur.",
      "Çoğu okul örneğinde dış döllenme ve dış gelişme anlatılır; köpek balıkları gibi iç döllenen ve farklı gelişme yolları taşıyan türler karşı örnektir. Bütün balıklar aynı pulla kaplı değildir ve bütün köpek balıkları durmadan yüzmek zorunda değildir. Ektotermlik çevre ısısının vücut sıcaklığı üzerindeki güçlü etkisini anlatır; her an soğuk kan taşındığı anlamına gelmez. Habitatı tek başına balık tanısı yapma.",
    ),
    sec(
      "İki yaşamlıda larva ve ergini ayrı oku",
      "Kurbağa örneğinde nemli çıplak deri gaz alışverişine katılır; larva solungaçla, ergin akciğer ve deriyle solur. Başkalaşım yalnız büyüklük artışı değil, yapı ve yaşam biçiminin değişmesidir. Tipik üç odacıklı kalpte iki kulakçık ve bir karıncık bulunur. Nemli yüzeyin korunması ve yumurta-gelişme koşulları suyla yakın ilişkiyi açıklar.",
      "İki yaşamlı adı her bireyin mutlaka hayatının yarısını suda yarısını karada geçirdiği anlamına gelmez. Semender ve bacaksız iki yaşamlılar farklı örneklerdir; bütün türlerde aynı solunum organı veya döllenme yolu beklenmez. Soruda ergin mi larva mı izlendiğini belirt; aynı türün iki evresini farklı hayvan grubu sanma. Derinin nemli oluşu, larva-ergin değişimi ve verilen sistemler birlikte güçlü kanıttır.",
    ),
    sec(
      "Sürüngen: karasal yumurtanın işlevi",
      "Kuru ve keratinleşmiş pullar su kaybını azaltır; akciğer solunumu görülür. İç döllenme ve amniyotik embriyo zarları, gelişmenin su içindeki serbest larvaya aynı biçimde bağımlı olmamasını sağlar. Kertenkele, yılan, kaplumbağa ve timsah okul grubunun örnekleridir. Çoğu örnekte üç ana kalp odacığı ve karıncık içindeki kısmi bölme karşılaştırılır.",
      "Timsahgiller dört odacıklı kalp taşır ve yavru bakımı yapabilir. Bu yüzden ‘dört odacık varsa kuş ya da memelidir’ veya ‘sürüngende yavru bakımı yoktur’ kuralları geçersizdir. Bazı sürüngenlerde doğum görülmesi dış gelişmenin evrensel olmadığını da hatırlatır. Ektotermlik ve kuru örtü gibi farklı sistemlerden iki kanıtı birleştirmek tek sayıyla karar vermekten daha güvenilirdir.",
    ),
    sec(
      "Kuş: tüy uçmaktan daha ayırt edicidir",
      "Kuşlarda tüy, gaga, akciğere bağlı hava keseleri ve dört odacıklı kalp birlikte ele alınır. Hava keseleri havalandırmaya yardımcıdır; gaz alışverişinin temel yüzeyi akciğerdir. Endotermik metabolizma sıcaklığın düzenlenmesine katkı verir. İç döllenme, kabuklu yumurta ve kuluçka/yavru bakımı okul karşılaştırmasının başlıca özellikleridir.",
      "Penguen ve devekuşu uçamaz ama kuştur; yarasa uçar ama kuş değildir. Her kuşun bütün kemikleri aynı ölçüde boşluklu veya koku duyusu zayıf değildir. Uçuş uyarlamalarını her üyede istisnasız zorunlu yapı gibi sunma. ‘Tüy mü, kıl ve süt bezi mi?’ sorusu hareket biçiminden daha ayırt edicidir; uçabilmenin tek bir köken veya aynı yakın takson anlamına gelmediğini gösterir.",
    ),
    sec(
      "Memeli: süt bezinden hareket et",
      "Memeliler yavrularını süt bezlerinin ürünüyle besler; kıl, alveollü akciğer, kaslı diyafram ve dört odacıklı kalp tipik karşılaştırma özellikleridir. Olgun alyuvarlarının çekirdeksiz oluşu memelilerin önemli hücresel özelliğidir. Kıl örtüsünün erişkinde görünür yoğunluğu değişebilir; yunusun belirgin kürkü olmaması memeli oluşunu değiştirmez.",
      "Yarasa, yunus, kanguru ve ornitorenk çok farklı yaşam biçimlerine rağmen memelidir. Plasentalı, keseli ve yumurtlayan memelilerin embriyonik gelişimleri farklıdır. Bütün memelilerde doğum veya bütün embriyolarda aynı plasenta düzeni var denmez. Suda yaşamak solungaç taşımayı, uçmak tüy taşımayı gerektirmez; yapısal ve üreme kanıtı habitatın önüne konur.",
    ),
    sec(
      "Kalp odacığı ve kan yollarını birlikte değerlendir",
      "Sazan örneğinde iki, kurbağada üç, çoğu sürüngende üç, timsahta dört, kuş ve memelilerde dört odacık karşılaştırılır. Kapalı dolaşım bu farklı odacık sayılarını kapsar; kapalı demek mutlaka dört odacık demek değildir. İki kulakçık ve iki karıncık düzeni oksijence zengin ve fakir akışların kalp içindeki ayrılmasını sağlar.",
      "Küçük bir kalp şemasındaki bölmeleri sayarken çizginin yalnız karıncık içindeki kısmi bölme mi, tam bir duvar mı olduğunu kontrol et. Model odacık sayısını gösterir; gerçek kalbin bütün damarlarını veya timsahtaki özel şant yollarını simüle etmez. Bir sistemin değişkenini kullanarak bütün hayvanın habitatını kesinleştirmek aşırı çıkarımdır. Dört odacıklı timsah ektoterm, dört odacıklı penguen endotermdir.",
    ),
    sec(
      "Isı düzenleme ile çevreyi karıştırma",
      "Ektoterm canlılarda çevresel ısı vücut sıcaklığını güçlü biçimde etkiler; endotermlerde metabolik ısı üretimi büyük rol oynar. Kuş ve memeliler tipik endoterm örneklerdir. Bu terimler davranışla ısınmayı veya bütün sıcaklık dalgalanmalarını dışlamaz. Güneşteki bir kertenkelenin vücut sıcaklığı gölgedeki bir memeliden yüksek olabilir; bu gözlem sınıflandırmayı tersine çevirmez.",
      "Vücut sıcaklığının sabitliği ile ısının kaynağı aynı eksen değildir. Okul düzeyinde tipik karşılaştırma yararlıdır fakat ‘soğukkanlı canlının kanı her an daha soğuktur’ ifadesi yanlıştır. Hibernasyon veya günlük sıcaklık değişimi bütün türlerde aynı değildir. Soruda verilen ölçüm anı, çevre sıcaklığı ve canlı grubu ayrı yazılır; bir ölçümden bütün yaşamın ısı stratejisi çıkarılmaz.",
    ),
    sec(
      "Döllenme, gelişme ve yavru bakımı üç ayrı soru",
      "Döllenmenin iç veya dış olması gametlerin nerede birleştiğini; gelişmenin iç veya dış olması embriyonun nerede geliştiğini anlatır. Bir kuşta iç döllenme ve dış gelişme birlikte bulunur. Bir balığın dış döllenmesi bütün balıkların aynı yolu kullandığını göstermez. Amniyotik zarlar, döllenme konumu ve yumurtanın kabuğu ilişkili olsa da aynı terim değildir.",
      "Yavru bakımı ayrı bir davranış boyutudur. Kuşlar ve birçok memelide belirgin olsa da timsah ve bazı balıklarda da görülür. Ornitorenkte yumurtlama ile sütle besleme birlikte bulunduğundan yumurtayı tek başına kuş kanıtı sayma. Sorunun üç sütununu ayrı doldurmak, ‘iç döllenme varsa doğurur’ gibi yanlış zinciri engeller.",
    ),
    sec(
      "Karşı örneklerle son kararını sınama",
      "Bir örneği tanımlarken önce en özgül kanıtı bul: süt bezi memeli, tüy kuş, belirli solungaç-kalp paketi balık için güçlüdür. Sonra ikinci bir sistemle doğrula. Yarasanın uçuşu, yunusun yüzgeci ve timsahın kalbi yanlış kısa yolları ortaya çıkarır. Aynı kromozom sayısı veya benzer habitat tek başına aynı tür veya yakın akrabalık kanıtı değildir.",
      "Omurgalılar besin ağlarında av, avcı, tohum yayıcı ve tozlaştırıcı olabilir; besin, ilaç araştırması ve ekonomik üretimle ilişkileri tür ve bağlama bağlıdır. Uygulamadaki karşılaştırmalı modelde örnek ve sistemi değiştir; aynı yapının farklı gruplarda, farklı yapıların aynı grupta bulunabildiğini izle. Bu sabit örnek tablosu tüm türlerin tüm istisnalarını içerdiği iddiasında değildir.",
    ),
  ],
  examples: [],
  recall: [],
  source:
    "MEBİ TYT Biyoloji Konu Özetleri, basılı s.94–97; Aurelia Omurgalılar kopya kağıdı s.1–3 ve5–6 ile karşılaştırılarak hazırlanmış özgün açıklamalar. Sistem tablosu okul karşılaştırmasıdır; bütün türler için istisnasız evrensel özellik listesi değildir. Alıştırmalar özgündür.",
};

const mitosisGuide: LessonGuide = {
  id: "mitoz",
  minutes: 90,
  objectives: [
    "Kromozom, kardeş kromatit, homolog ve DNA miktarını ayrı say.",
    "İnterfaz ile mitoz ve sitokinezi olaylarına göre izle.",
    "Bütün hücre, tek kutup ve tek yavru için tutarlı hesap yap.",
    "Denetim noktaları, doku büyümesi ve seçili hücre bölünmesini yorumla.",
  ],
  sections: [
    sec(
      "Bölünme neyi sağlar?",
      "Mitoz ökaryot çekirdek kalıtımının iki çekirdek bölgesine dengeli dağıtılmasını sağlar. Tek hücreli bir ökaryotta üremenin, çok hücrelide büyüme, gelişme ve onarımın parçası olabilir. Aynı dokudaki bütün hücrelerin aynı anda veya aynı hızda bölünmesi gerekmez. Olgun memeli alyuvarı çekirdeksiz olduğu için mitoz geçiremez; yenileri kök hücrelerden gelişen öncüllerle sağlanır.",
      "Benzer şekilli bir hücre büyürken yüzeyi boyun karesi, hacmi küpüyle artar; yüzey/hacim oranı düşer. Bu madde alışverişi için bir kısıt oluşturabilir fakat tek başına otomatik bölünme emri değildir. Büyüme faktörleri, DNA durumu ve denetim mekanizmaları da rol oynar. Prokaryot ikiye bölünmesi mitoz evreleri taşımaz; tek hücreli olmak mitoz için yeterli bilgi değildir.",
    ),
    sec(
      "Kromozom ile kromatidi aynı sayma",
      "Kromatin DNA ve ilişkili proteinlerin oluşturduğu komplekstir; kromozomlar hücre döngüsü boyunca varlığını sürdürür, bölünmede yoğunlaşarak daha belirgin olur. Eşlenmiş bir kromozom iki kardeş kromatit taşır. Her kromatit bir çift sarmallı DNA molekülü içerir. Kardeşlerin birlikte tutulduğu sentromer bölgesindeki kinetokor, iğ ipliğinin bağlandığı protein yapısıdır.",
      "Homologlar aynı genleri karşılıklı lokuslarda taşıyan takım eşleridir; farklı alelleri olabilir. Kardeşler bir kromozomun eşlenmesinden doğan kopyalardır. Normal yeni mutasyon yok varsayımında kardeşlerin dizileri aynıdır. X çizimi iki bağımsız kromozom değil, sentromerle birlikte tutulan iki kardeşli tek kromozomdur. Yalnız X’in kol sayısını sayarak kromozom sayısı bulma.",
    ),
    sec(
      "n bir takım, C bir DNA miktarıdır",
      "n bir kromozom takımını, 2n iki takımı belirtir. 2n=6 diploit hücrede üç homolog çift vardır. C, eşlenmemiş bir haploit takımın çekirdek DNA miktarı olarak tanımlanır; G₁ diploit hücre 2C taşır. C birimi mutlak DNA molekülü veya kromozom adedi değildir. DNA kütlesi pg gibi birimlerle ayrıca verilebilir; kromozomlar aynı uzunlukta olmak zorunda değildir.",
      "DNA eşlenmesiyle G₁’deki 2n ve2C düzeni 2n ve4C olur: takım sayısı artmaz. Anafazda kardeşlerin ayrılması bütün hücredeki anlık kromozom sayımını artırır, yeni homolog takım yaratıldığı anlamına gelmez. Sayı sorusunun başına evre ve alan yaz: bütün hücre, tek kutup, tek çekirdek veya tek yavru. Mitokondri ve kloroplast DNA’sı bu çekirdek sayımının dışında tutulur.",
    ),
    sec(
      "İnterfaz dinlenme dönemi değildir",
      "G₁’de büyüme, madde alışverişi ve yoğun metabolizma sürer. S evresinde DNA eşlenir; işlem ilerlerken DNA miktarı artar. G₂’de bölünme hazırlığı ve hasar denetimi sürer. İnterfazın süresi hücre tipine ve koşula bağlıdır; her hücre için sabit saatlik bir takvim veya bütün embriyolara tek bir G₁/G₂ düzeni kurulmaz.",
      "Bir hücrenin DNA miktarının iki katına çıkması eşlenmenin tamamlandığını gösterebilir; hatasız DNA veya kesin bölünme garantisi vermez. Bazı hücreler döngü dışı G₀ durumuna geçebilir. ATP üretimi ve protein sentezi mitozda da hücrenin gereksinimleri içinde sürer; interfaz yalnız beklemek değildir. Şemadaki S tamamlandı karesi eşlenme sonunu gösterir, eşlenmenin bir anda gerçekleştiğini iddia etmez.",
    ),
    sec(
      "Profaz ve metafazı yapısal kanıtla bul",
      "Profazda kromatin yoğunlaşır, çekirdekçik kaybolur ve mitotik iğ kurulur; çekirdek zarı geç profaz/prometafaz sürecinde parçalanır. Sentrozom taşıyan hücrelerde bu merkezler kutuplara uzaklaşır. Yüksek yapılı bitki hücreleri tipik hayvan sentrozomunu taşımadan da mikrotübül düzenleyici yapılarla iğ oluşturabilir. Sentrozom yokluğu iğ yokluğu değildir.",
      "Metafazda eşlenmiş kromozomlar orta düzleme tek tek dizilir, kinetokor bağlantıları dengelenir. Homolog çiftlerin tetrat hâlinde karşı karşıya dizilmesi normal mitozun özelliği değildir. Yoğun ve ayırt edilebilir kromozomlar karyotip incelemesinde sayı ve biçim karşılaştırmasını kolaylaştırır. Karyotip tüm DNA dizisini veya bütün genlerin işlevini gösteren bir test değildir.",
    ),
    sec(
      "Anafazda ayrılan yapı artık kromozomdur",
      "Kardeşleri birlikte tutan bağlar çözülünce kardeş kromatitler zıt kutuplara ayrılır. Ayrılan her kardeş bağımsız kromozom sayılır. Başlangıç 2n=4 ise metafazda dört kromozom ve sekiz DNA molekülü vardır; anafazdaki henüz bölünmemiş hücre toplamı sekiz kromozom ve aynı sekiz DNA molekülüdür. Yeni DNA üretimi ayrılma olayının parçası değildir.",
      "Bir kutba dört kromozom ve dört DNA molekülü gider. Bütün hücre sayısını tek kutba yazmak cevabı iki katına çıkaran yaygın hatadır. Şekilde iki kutbu aynı anda görmen iki ayrı hücre olduğu anlamına gelmez; dış zarın ve sitoplazmanın ayrılmasını kontrol et. Model normal dengeli ayrılma varsayar; ayrılmama veya iğ hasarı verilen soru bu güvenli başlangıçtan ayrıca sapar.",
    ),
    sec(
      "Telofaz ile sitokinez ayrı olaylardır",
      "Telofazda kutuplarda yeni çekirdek zarları ve çekirdekçikler oluşur, kromozomlar gevşer ve iğ düzeni çözülür. Bir sitoplazma içinde iki çekirdek bulunabilir. Karyokinez çekirdek bölünmesi, sitokinez sitoplazmanın ayrılmasıdır; zamanları örtüşebilir. ‘Mitoz bitti’ ifadesini her bağlamda otomatik iki ayrı hücre sayısına dönüştürme.",
      "Hayvan hücresinde kasılabilen halka dıştan içe boğumlanma oluşturur. Bitki hücresinde veziküllerden oluşan hücre plağı merkezden dışa büyür ve yeni bölmeyi kurar. Sırf dış çizginin dikdörtgen veya yuvarlak olmasına bakarak hücre tipi seçilmez; bölünme yapısı kanıttır. Normal sitokinez sonunda her yavru başlangıç takımını ve G₁ çekirdek DNA miktarını alır.",
    ),
    sec(
      "DNA grafiğinde izlenen alanı koru",
      "Hücre başına DNA grafiği G₁’de2C, S sonunda4C, yavru başına yeniden2C gösterebilir. Bütün iki yavrunun toplamı4C’dir; DNA’nın yarısı yok olmamıştır. Aynı kat örüntüsü farklı kromozom sayılı türlerde görülebileceğinden DNA grafiğinden tek başına mutlak kromozom adedi çıkarılmaz. Dikey eksenin DNA mı kromozom mu olduğunu ilk adımda oku.",
      "G₁’de6 pg varsa eşlenme sonunda12 pg, anafazdaki bütün hücrede12 pg, bir kutupta6 pg bulunur. Telofazda iki çekirdeğin toplamı ile bir çekirdeğin miktarı da aynı ayrımı gerektirir. Grafik sorusunda zaman çizgisini ve hücre başına normalizasyonu sabit tut; toplam popülasyon DNA’sı ölçülüyorsa hücre sayısındaki artış ayrıca hesaba katılır.",
    ),
    sec(
      "Denetim noktaları neden önemlidir?",
      "G₁ denetimi yeterli büyüklük, besin, büyüme sinyalleri ve DNA durumuyla; G₂ denetimi eşlenmiş DNA’nın durumu ve hasarıyla; M denetimi kromozomların uygun iğ bağlantılarıyla ilişkilidir. Bağlanmayan kinetokor anafazı geciktirebilir. Sırf metafazda çok hücre gözlenmesi tek bir moleküler neden kanıtlamaz; deney ve kontrol koşulları gerekir.",
      "Denetimin bozulması kontrolsüz çoğalmaya katkıda bulunabilir. Tümör anormal hücre kitlesidir; iyi huylu ve kötü huylu davranış farkı çevre dokuya invazyon ve yayılma gibi özelliklerle değerlendirilir. Metastaz kötü huylu hücrelerin uzak bölgelerde yayılımıdır. Her DNA hasarı kanserle sonuçlanmaz ve her kanser aynı biçimde tümör oluşturmaz; bu anlatım temel biyoloji kavramıdır, kişisel tanı aracı değildir.",
    ),
    sec(
      "Hücre sayısını koşula göre hesapla",
      "Başlangıç N₀ hücrenin her biri her tur bir kez ikiye bölünüyorsa ve ölüm/kayıp yoksa k tur sonra N=N₀×2ᵏ olur. Buradaki k tur sayısıdır, kromozom takımı n ile karıştırılmaz. İki hücre üç tam tur bölünürse2×8=16 hücre oluşur. Tüm hücreler yerine yalnız seçilmiş üç hücre bölünürse toplam üç artar; bütün popülasyon ikiye katlanmaz.",
      "Kaybı veya bölünemeyen hücreyi ayrıca yaz. Dört hücre bir tam turda sekiz olur; sonra yalnız ikisi bölünürse on, bir hücre kaybolursa dokuz kalır. Haploit bir ökaryot hücre de mitozla haploit yavrular oluşturabilir; mitoz yalnız diploit hücrelere özgü değildir. Son kontrolde hücre sayısı, kromozom takımı ve toplam DNA’yı üç ayrı sonuç olarak değerlendir.",
    ),
  ],
  examples: [],
  recall: [],
  source:
    "MEBİ TYT Biyoloji Konu Özetleri, basılı s.101–108; Aurelia Hücre Bölünmeleri–Mitoz s.1–7 kavram, sayım ve deney örnekleriyle kontrol edilmiş özgün anlatım. Model çekirdek kromozomları ve normal dengeli bölünmeyi izler; sorular özgündür.",
};

const asexualGuide: LessonGuide = {
  id: "eseysiz-ureme",
  minutes: 80,
  objectives: [
    "Döllenme, gamet varlığı ve yeni birey oluşumunu ayrı denetle.",
    "Altı çoğalma yolunu başlangıç yapısından ayırt et.",
    "Endospor ve onarımı üremeden ayır.",
    "Klon benzerliğinin, mutasyonun, çevrenin ve arı örneğinin sınırlarını açıkla.",
  ],
  sections: [
    sec(
      "Önce yeni bireyi, sonra döllenmeyi ara",
      "Üreme yeni bireylerin oluşmasıdır. Eşeysiz üremede döllenme gerçekleşmez; birçok örnekte tek atadan, yeni mutasyon yoksa aynı genetik bilgiyi taşıyan yavrular oluşur. Gamet yumurta veya sperm gibi üreme hücresidir; gamet bulunması her olayda iki gametin birleştiğini göstermez. Döllenmemiş yumurtadan gelişme bu yüzden ayrıca incelenir.",
      "Büyüme, onarım ve dayanıklılık her zaman üreme değildir. Bir kertenkelenin kuyruğunu yenilemesi aynı bireyi onarır; bir planaryanın uygun parçasının bağımsız birey oluşturması birey sayısını artırır. Türün hayat boyu kullanabildiği yollar ile sorudaki tek olayı ayır. Eşeysiz üreyebilen bir tür başka koşullarda eşeyli de üreyebilir.",
    ),
    sec(
      "Klon benzerliği çevre etkisini dışlamaz",
      "Mitoza dayalı çoğalmada yeni mutasyon ve başka genetik değişim yok sayılırsa ata ve yavruların genotipleri korunur. Fenotip ise genotip ile çevrenin etkileşimiyle oluşur. Aynı bitkiden alınan iki çelik farklı ışıkta farklı boylara ulaşabilir; bu boy farkı tek başına eşeyli üretim veya farklı genotip kanıtı değildir.",
      "Mutasyon kalıtsal diziyi değiştirebilir; eşeysiz popülasyonda genetik çeşitlilik hiç oluşamaz denmez. Döllenmesiz gelişmenin bazı türlerinde yumurta oluşumu ve kromozom geri kazanımı da benzerliği etkiler. Aynı genotipin tek tip çevrede avantajı olabilirken hastalık veya çevre değişimi ortak duyarlılık yaratabilir. Hızlı çoğalma ile geniş genetik çeşitlilik aynı sonuç değildir.",
    ),
    sec(
      "İkiye bölünme her canlıda mitoz değildir",
      "Bakteri ve arkelerde DNA eşlenmesi, kopyaların ayrılması ve hücrenin ikiye bölünmesiyle çoğalma görülebilir. Zar çevrili çekirdek ve ökaryotik mitoz evreleri bulunmaz. Amip, öglena ve paramesyum gibi tek hücreli ökaryotlarda çekirdeğin bölünmesi mitozla yürür. Aynı son sayı iki olsa da hücresel mekanizma farklıdır.",
      "Amipte bölünme düzlemi daha değişken, öglenada boyuna ve paramesyumda enine bölünme tipik okul örnekleridir. Yavruların sitoplazma miktarı veya organel adedi tam aynı olmak zorunda değildir; genetik benzerlik bütün hücresel miktarların eşitliği demek değildir. Bölünmede DNA’nın önce kopyalanması, prokaryot olayı mitoz diye adlandırmak için yeterli değildir.",
    ),
    sec(
      "Tomurcuklanmada çıkıntının geçmişini izle",
      "Hidra veya bira mayasında ata üzerinde yerel bir çıkıntı oluşur, büyür ve yeni bireye gelişir. Tomurcuk ayrılabilir ya da bağlı kalarak koloni oluşturabilir. Ayırt edici olay bir parçanın önce kopması değil, ata üzerindeki yeni çıkıntının gelişmesidir. Hücre çoğalması ve büyüme bu yapıyı oluşturur.",
      "Her şişlik veya yara tomurcuk değildir; yeni birey gelişimi gösterilmelidir. Hidrada tomurcuklanma görülmesi bütün sölenterlerin her evresinde aynı yolun zorunlu olduğu anlamına gelmez. Mayanın tek hücreli oluşu ve hidranın çok hücreli oluşu, bu yolun farklı organizasyon düzeylerinde kullanılabildiğini gösterir. İsim yerine olay dizisini okuyarak karar ver.",
    ),
    sec(
      "Rejenerasyonda bütün birey ölçütü",
      "Rejenerasyon eksik doku veya organın yenilenmesidir; üreme olabilmesi için uygun parçadan yeni bağımsız birey oluşmalıdır. Planarya örneğinde iki uygun parçanın her birinin bütün bireye geliştiği verilirse iki birey elde edilir. Her türün her parçası bu yetenekte değildir; parçanın konumu, büyüklüğü ve hücre kapasitesi önemlidir.",
      "Denizyıldızında bazı türler ve koşullarda merkezî diskten pay taşıyan kol yeni birey geliştirebilir; sırf kol kopması yeterli değildir. Kertenkele kuyruğu veya iyileşen kemikte yeni canlı oluşmaz. Rejenerasyon yeteneğini canlıları tek çizgide ‘gelişmişlik’ sırasına koyan evrensel bir yasa gibi kullanma. Sorunun son karesinde bağımsız birey sayısını kontrol et.",
    ),
    sec(
      "Üreme sporu ile endospor farklıdır",
      "Mantar veya bazı alglerde oluşan üreme sporları uygun koşulda başka gametle birleşmeden yeni birey başlatabilir. Sporun hangi bölünmeyle oluştuğu canlıya ve yaşam evresine bağlıdır; mitotik ve mayotik sporlar vardır. Bir kara yosununun spordan gelişmesi, bütün yaşam döngüsünde döllenme olmadığı anlamına gelmez.",
      "Bakteri endosporu ise olumsuz koşullara dayanıklılık yapısıdır. Bir hücreden bir endospor, sonra bir hücre oluşuyorsa1→1→1 sayımı üreme artışı göstermez. Aynı ‘spor’ sözcüğünün geçmesi işlevlerin aynı olduğunu kanıtlamaz. Sporun dayanıklılığı da her tür ve yapı için tek sert çeper kuralına indirgenmez; model yalnız belirtilen örneğin işlevini karşılaştırır.",
    ),
    sec(
      "Vejetatif yolda somatik dokuyu izle",
      "Bitkinin kök, gövde, dal, yaprak veya uygun somatik dokusundan yeni bitki oluşması vejetatif üremedir. Çileğin sürünücü gövdesi boğumda köklenebilir; patatesin yumru gövdesindeki gözler tomurcuktur; zencefil rizomu toprak altında yatay gövdedir. Soğan kısa gövde ve etli yapraklardan oluşur. Toprak altında olmak bir yapıyı otomatik kök yapmaz.",
      "Çelikle üretimde uygun dal, gövde, kök ya da yaprak parçası köklendirilir. Aşılamada iki bitkinin uygun dokuları birleştirilir; anaç ve kalemin bütün hücrelerinin genotipi birleşip tek yeni genotip olmaz. Döllenmeyle oluşmuş tohumdaki embriyonun toprağa ekilmesi ise vejetatif yol değildir. Başlangıçta somatik parça mı, döllenmiş embriyo mu olduğunu yaz.",
    ),
    sec(
      "Doku kültürü: steril koşul ve farklılaşma",
      "Uygun somatik hücre veya küçük doku parçası besin ve düzenleyici koşulları sağlanan steril ortamda çoğaltılabilir. Hücre topluluğu kallus oluşturabilir; uygun farklılaşma koşullarında kök ve sürgün gelişerek yeni bitki elde edilebilir. Başlangıç dokusunun uygunluğu ve türün tepkisi önemlidir; her hücrenin her ortamda mutlaka bitki oluşturacağı varsayılmaz.",
      "Seçilmiş özelliklerin korunması, zor çoğalan türlerin üretilmesi ve bazı koruma çalışmaları bu yöntemin kullanım alanlarıdır. Çok sayıda benzer bitki elde etmek tüm hastalıklara dayanıklılık garantisi değildir. Mutasyon veya kültür kaynaklı değişim olasılıkları sıfır sayılmaz. Üretim yöntemiyle çevre etkisini ayırmak için yetiştirme koşulları ve gerektiğinde genetik karşılaştırma birlikte değerlendirilir.",
    ),
    sec(
      "Partenogenezde bal arısı özel modeldir",
      "Partenogenez döllenmemiş yumurtanın yeni bireye gelişmesidir. Bal arısının standart haplodiploit modelinde kraliçe2n, yumurtalar mayozla n, döllenmemiş yumurtadan gelişen erkek n olur. Erkek arının sperm üretimi n düzeyini korur ve okul modelinde mitozla açıklanır. Döllenmiş n yumurta ile n sperm2n dişiyi oluşturur.",
      "Dişi işçi ve kraliçe ayrımında larval yetiştirilme ve beslenme koşulları rol oynar; yalnız kromozom sayısı farkı değildir. Kraliçenin farklı mayoz ürünleri genetik olarak farklı olabileceğinden aynı anneden döllenmesiz gelişen erkekler mutlak klon sayılmaz. Diğer partenogenez türlerinde diploit yavrular da görülebilir; arıdaki n/2n ve cinsiyet ilişkisini bütün canlılara yayma.",
    ),
    sec(
      "Sayımı ve yöntemi aynı çözümde birleştir",
      "Tüm hücreler her tam turda bir kez ikiye bölünüyorsa ve kayıp yoksa N₀×2ᵏ kullanılır. Üç bakteri iki tam turda on iki olur; daha sonra yalnız beşi bölünürse sayı beş artıp on yedi olur. Parçalanma veya tomurcuk sayısı verilmişse her olaydaki yeni bireyi ayrı say; her üreme yolunu ikiye katlama formülüne zorlama.",
      "Bir olay için dört satır yeterlidir: başlangıç yapısı, döllenme durumu, bağımsız yeni birey ve genetik benzerlik koşulu. Sonuncusunda ‘mutasyon yok’ veya yumurtanın nasıl oluştuğu gibi varsayımları kontrol et. Modelde karşı örnek olarak döllenmeyle oluşmuş tohum da bulunur; bu örnek eşeysiz listesine eklenmek için değil, yanlış benzetmeyi ayırmak için kullanılır.",
    ),
  ],
  examples: [],
  recall: [],
  source:
    "MEBİ TYT Biyoloji Konu Özetleri, basılı s.109–113; Aurelia Eşeysiz Üreme s.1–7 öğretim ve çözümlü örnekleri temel alınarak hazırlanmış özgün anlatım. Partenogenez arı örneği belirtilen okul modeliyle sınırlıdır; bütün döllenmesiz gelişmeler için klon veya haploit kuralı kurulmaz.",
};

const meiosisGuide: LessonGuide = {
  id: "mayoz",
  minutes: 95,
  objectives: [
    "Bir eşlenme ve iki bölünmeyi homolog/kardeş ayrımıyla sırala.",
    "Kromozom, tetrat, DNA ve takım sayısını alanı belirterek hesapla.",
    "Bağımsız dağılım ile parça değişimini farklı modellerde açıkla.",
    "Bir mayozun dört ürünü ile olası gamet bileşimlerini birbirine karıştırma.",
  ],
  sections: [
    sec(
      "Mayoz ve döllenme birbirini tamamlar",
      "Standart diploit modelde mayoz bir DNA eşlenmesini izleyen iki bölünmeyle kromozom takımını yarıya indirir. İki haploit gamet döllenmede birleşince diploit sayı yeniden oluşur. Hayvanlarda gamet oluşum sürecine katılır; bitkilerde mayoz çoğunlukla haploit spor oluşturur, gametler haploit evrede mitozla üretilebilir. Mayoz her canlıda doğrudan gamet yapar demek eksiktir.",
      "Normal dört hücresel ürün ifadesi dört işlevsel yumurta demek değildir. Yumurta oluşumunda sitoplazma paylaşımı eşit olmayabilir ve kutup hücreleri oluşabilir. Bu laboratuvar sayım için dengeli dört hücreli temel modeli kullanır; gerçek gamet farklılaşmasının bütün ayrıntılarını taklit etmez. Başlangıçtaki diploit kromozom sayısını ve sorulan hücreyi ilk satıra yaz.",
    ),
    sec(
      "Homolog ile kardeşi farklı renk ve kökenle izle",
      "Homolog kromozomlar aynı genleri karşılıklı konumlarda taşıyan takım eşleridir; biri anneden biri babadan gelebilir ve farklı aleller taşıyabilir. Kardeş kromatitler tek kromozomun DNA eşlenmesinden oluşan iki kopyadır. 2n=4 hücrede iki homolog çift bulunur; eşlenmeden sonra dört kromozom ve sekiz kromatit vardır. X’in iki kolu iki homolog değildir.",
      "Şemada renk homologun kökenini, uzun-kısa ayrımı farklı kromozom çiftlerini temsil eder. Bunlar gerçek boyut veya bütün genlerin haritası değildir. İki kardeşin aynı renkte olması sayım birliğini kolaylaştırır; profaz I’de parça değişimi olursa kardeşler belirli bölgelerde artık aynı alel bileşimini taşımayabilir. Bu ihtimali normal mitozdaki yeni mutasyon yok kardeş kopyalarıyla karıştırma.",
    ),
    sec(
      "S evresinde takım değil DNA iki katına çıkar",
      "G₁’de diploit hücre2n kromozom ve2C çekirdek DNA’sı taşır. Bir kez gerçekleşen S evresinin sonunda2n ve4C olur; her kromozom iki kardeşli olduğu için DNA molekülü sayısı iki katına çıkar. C eşlenmemiş haploit takımın DNA miktarıdır; kromozom adedi veya sabit bir pikogram değeri değildir.",
      "Mayoz I ile mayoz II arasında ikinci bir S evresi yoktur. Arada tür ve koşula göre kısa bir ara dönem bulunabilir; ‘hiç ara olamaz’ ile ‘yeni DNA eşlenmez’ aynı iddia değildir. Anafaz II’de kardeşlerin ayrılması da yeni DNA üretmez. Çekirdek DNA’sı ile mitokondri DNA’sını birlikte saymadığımızı ve normal ayrılma varsaydığımızı her sayısal örnekte koru.",
    ),
    sec(
      "Profaz I: sinapsis, tetrat ve parça değişimi",
      "Homolog çiftlerin fiziksel eşleşmesine sinapsis, iki homologun toplam dört kromatitli birimine tetrat denir. Standart2n=6 örneğinde üç homolog çift ve üç tetrat vardır; eşlenmiş altı kromozom toplam on iki kromatit taşır. Kiyazmalar, homologların kardeş olmayan kromatitleri arasındaki değişimle ilişkili bağlantı bölgeleridir.",
      "Krossing over homolog çiftin kardeş olmayan kromatitlerinin karşılıklı eş bölgeleri arasında gerçekleşir. Farklı homolog çiftleri arasındaki normal bir olay diye tanımlanmaz; kaynakta görülebilen ‘homolog olmayan’ yazımı bu tanımla düzeltilir. Tek bir değişime tetrattaki dört kromatidin tamamı zorunlu katılmaz. Modelde bir kromatitten AB, diğerinden ab işaretleri izlenir; iki işaret arasındaki tek değişim Ab ve aB üretebilir.",
    ),
    sec(
      "Metafaz I: çiftlerin yönelimi bağımsızdır",
      "Homolog çiftler orta düzlemde karşılıklı durur ve her çiftin hangi homologunun hangi kutba yöneleceği diğer çiftlerden bağımsız olabilir. İki ayrı kromozom çiftindeki A/a ve B/b işaretleri için bir kutba AB, karşıya ab gidebildiği gibi başka bir yönelimde Ab ve aB gidebilir. Bu çeşitlilik için parça değişimi şart değildir.",
      "Parça değişimi dışlanmışken n homolog çiftin bağımsız yöneliminde olası takım bileşimi2ⁿ’dir. Her çift kendi içinde homolog iki kromozom taşır; farklı çiftler birbirine homolog değildir. Bu sayı tek mayozun dört hücresinin mutlaka2ⁿ farklı olduğu anlamına gelmez. İki çiftli bir olay AB,AB,ab,ab ürünlerini verirken başka bir olay Ab,Ab,aB,aB verebilir. Genel olasılık kümesiyle gerçekleşmiş tek olayın ürünlerini ayrı yaz.",
    ),
    sec(
      "Anafaz I: homolog gider, kardeş kalır",
      "Anafaz I’de homologlar karşı kutuplara çekilirken her kromozomun iki kardeşi birlikte kalır. 2n=4 hücrenin bir kutbuna iki çift kardeşli kromozom, yani iki kromozom ve dört DNA molekülü gider. Bütün hücrede ise hâlâ dört kromozom ve sekiz DNA molekülü bulunur. Takım azaltımı kutupların her birinin yalnız bir homolog takımı almasıyla ilişkilidir.",
      "‘X biçimli yapılar ayrılıyor’ tek başına kardeş ayrımı demek değildir: X’ler bütün olarak uzaklaşıyorsa homologlar ayrılıyor olabilir. Sentromerle birlikte kalan iki kardeşi aynı birim say. Ayrılmama verilmişse normal dengeli sayı uygulanmaz; bazı ürünler eksik veya fazla kromozom alabilir. Bu model ayrılmama olayını simüle etmediğini açıkça belirtir.",
    ),
    sec(
      "Mayoz I sonunda haploit ama eşlenmiş",
      "Sitokinez I sonunda iki hücrenin her biri n kromozom ve2C DNA taşır. Haploit olmak her kromozomun mutlaka tek kromatitli olması demek değildir; takım sayısı ile eşlenme durumu farklı değişkenlerdir. 2n=8 başlangıçta her ilk ürün dört kromozom, sekiz DNA molekülü ve2C DNA alır. İki ilk ürünün toplamı4C’dir.",
      "TelofazI’de çekirdek zarı türüne göre yeniden oluşabilir. Sitokinez sitoplazmayı ayırır; çekirdek sayısı ile hücre sayısını karıştırma. Mayoz II’ye geçerken kromozomları yeniden kopyalamak sayımı iki katına çıkaran yanlış bir adımdır. Modelde ilk bölünme sonu ile metafaz II arasındaki DNA miktarının aynı kaldığını kontrol edebilirsin.",
    ),
    sec(
      "Mayoz II: kardeşler bu kez ayrılır",
      "Metafaz II’de her haploit hücrenin eşlenmiş kromozomları orta düzleme tek tek dizilir. Anafaz II’de kardeşler ayrılıp bağımsız kromozom sayılır. Başlangıç2n=6 ise mayoz I ürünü üç iki-kardeşli kromozom taşır; anafaz II’de bölünmemiş o hücrenin toplamı altı bağımsız kromozom, bir kutbu üç kromozomdur. DNA miktarı hücre başına2C, kutup başınaC’dir.",
      "Anafaz II toplamını ‘2n yavru oluştu’ diye yorumlama; bir takımın ayrılan iki kopyasını henüz aynı sitoplazmada sayıyorsun. İkinci sitokinez sonunda dört hücrenin her biri üç kromozom veC DNA alır. Dört ürünün toplamı4C olup S sonrası toplamla tutarlıdır. Hücre başına düşüş DNA’nın yok olması değil ürünlere paylaşılmasıdır.",
    ),
    sec(
      "Çeşitliliğin kaynağını ve sınırını söyle",
      "Parça değişimi bağlı genler için yeni alel bileşimleri, bağımsız dağılım ise farklı kromozomların yeni takım bileşimlerini oluşturabilir. Döllenmede hangi gametlerin birleştiği de çeşitliliğe katkı verir. Bu mekanizmalar yeni alel dizisinin her zaman sıfırdan yaratıldığı anlamına gelmez; yeni alellerin bir kaynağı mutasyondur.",
      "Her mayoz ürününün diğer üçünden mutlaka farklı olması veya bir değişimin incelenen bütün işaretleri mutlaka değiştirmesi gerekmez. Değişim işaretlerin dışında ise o işaretlerle fark göremeyebilirsin. Aynı kromozomdaki AB/ab değişim modeli ile ayrı kromozomlardaki A/a,B/b dağılım modeli farklı varsayımlar kullanır; uygulamada bu iki panel ayrı açıklanır. Sayısal olasılık hesabını hangi modelin koşulları sağlıyorsa ona uygula.",
    ),
    sec(
      "Mitozla karşılaştır, grafiği olayla eşleştir",
      "Mitozda bir eşlenme ve bir bölünme sonunda takım korunur; standart mayozda bir eşlenme ve iki bölünme sonunda takım yarıya iner. İğ iplikleri, DNA eşlenmesi ve sitokinez iki süreçte de görülebilir. Tetrat-sinapsis ve homolog ayrımı mayoz I’i ayırırken kardeş ayrımı mitoz ile mayoz II’de ortak olaydır. Yalnız bir ortak olayı görüp süreç adı seçme.",
      "DNA’nın hücre başına2→4→2→1 kat deseni, arada başka eşlenme olmadan iki tamamlanmış bölünme verildiğinde standart mayozla uyumludur. Bu desen tek başına türün mutlak kromozom sayısını söylemez. Sorunun son kontrolü için toplam ürün DNA’sını S sonrasıyla karşılaştır, tek kutbu tek hücreden ayır ve kronolojik olayları eşlenme→homolog ayrımı→kardeş ayrımı şeklinde kur.",
    ),
  ],
  examples: [],
  recall: [],
  source:
    "MEBİ TYT Biyoloji Konu Özetleri, basılı s.114–120; Aurelia Hücre Bölünmeleri–Mayoz s.1–7 ile kontrol edilmiş özgün anlatım. Kaynaktaki homolog olmayan kromatitler yazımı bilimsel tanıma uygun olarak homologların kardeş olmayan kromatitleri biçiminde düzeltilmiştir. Alıştırmalar resmî değildir.",
};

invertebrateGuide.examples = [
  worked(
    "Üst gruptan böceğe in",
    "Bir hayvanda kitin dış iskelet, eklemli üyeler, bir çift anten ve göğüste üç çift bacak görülüyor. Üst ve alt grup nedir?",
    "Önce geniş yapısal ortaklığı, sonra alt gruba özgü kanıtı kullan.",
    [
      [
        "Üst grubu kur",
        "Dış iskelet ve eklemli üyeler eklembacaklı planını destekler.",
        "",
      ],
      [
        "Ayırıcı kanıtı seç",
        "Göğüste üç çift bacak böceği ayırır; anten tek başına ayırmaz.",
        "3 çift = 6 bacak",
      ],
      [
        "Karşı örnekle denetle",
        "Örümcekte dört çift bacak ve anten yokluğu; çok ayaklıda çok segment vardır.",
        "",
      ],
    ],
    "Eklembacaklılar → böcekler.",
    "Seçim yalnız habitat veya trake sözcüğüne dayanmıyor.",
    "Eklembacaklı ortaklığını yalnız böceğe özgü sayma.",
  ),
  worked(
    "Kapalı dolaşım iki adayı bırakır",
    "Toprak solucanı, çekirge, midye ve ahtapot karşılaştırılıyor. Kapalı dolaşım ölçütünü sağlayanları seç.",
    "Her örneği kendi alt grubunun sistem bilgisine bağla.",
    [
      [
        "Halkalıyı bul",
        "Toprak solucanı halkalı solucandır ve kapalı dolaşım taşır.",
        "",
      ],
      [
        "İstisnayı koru",
        "Ahtapot kafadanbacaklı yumuşakçadır ve kapalı dolaşım taşır.",
        "",
      ],
      [
        "Kalanları denetle",
        "Çekirge eklembacaklı, midye çoğu yumuşakça örneği olarak açık dolaşımlıdır.",
        "",
      ],
    ],
    "Toprak solucanı ve ahtapot.",
    "Omurgasızlık kapalı dolaşımla çelişmiyor.",
    "Yumuşakçaların çoğundaki açık dolaşımı ahtapota genelleme.",
  ),
  worked(
    "İskelet omurga değildir",
    "Denizde yaşayan bir hayvanda tüp ayak, su damar sistemi ve kireçli iç iskelet gözleniyor. Omurgalı mı?",
    "En özgül yapısal kanıtı seç; iç iskeleti omurgadan ayır.",
    [
      [
        "Özgül yapıyı işaretle",
        "Su damar sistemi ile tüp ayak derisidikenli kanıtıdır.",
        "",
      ],
      [
        "İskelet çıkarımını sınırla",
        "Kireçli iç destek omurga anlamına gelmez.",
        "",
      ],
      [
        "Ortak habitatı ele",
        "Denizde başka birçok omurgasız da yaşar; habitat tek başına seçtirmez.",
        "",
      ],
    ],
    "Derisidikenli bir omurgasızla uyumludur.",
    "Denizyıldızı örneği hem iç iskeletli hem omurgasızdır.",
    "İç iskelet gördüğünde otomatik omurgalı seçme.",
  ),
  worked(
    "Tek açıklık mı, hiç sindirim sistemi yok mu?",
    "Hidra ve tenyadaki beslenme yapıları karşılaştırılıyor. İkisine de iki açıklıklı kanal yazılabilir mi?",
    "Her örneğin kendi planından ilerle.",
    [
      [
        "Hidrayı değerlendir",
        "Sölenterde tek açıklıklı sindirim boşluğu bulunur.",
        "",
      ],
      [
        "Tenyayı değerlendir",
        "Parazit tenya besini yüzeyinden alır; sindirim sistemi yoktur.",
        "",
      ],
      [
        "Genellemeyi test et",
        "İki açıklıklı kanal yuvarlak ve halkalı solucan gibi başka örneklerle karşılaştırılır.",
        "",
      ],
    ],
    "Hayır; hidrada tek açıklıklı boşluk, tenyadan verilen örnekte sindirim sistemi yoktur.",
    "Solucan adı bütün üyelerin sindirim düzenini eşitlemedi.",
    "Yok ile tek açıklıklı ifadelerini aynı kabul etme.",
  ),
];
vertebrateGuide.examples = [
  worked(
    "Yunusun yaşam alanı yanıltmasın",
    "Suda yaşayan yüzgeçli canlı hava soluyor ve yavrusunu sütle besliyor. Hangi okul grubundadır?",
    "Habitatı ortak bilgi, süt bezini ayırıcı kanıt olarak al.",
    [
      [
        "Habitatı ayır",
        "Suda yaşamak balıklarda da memelilerde de mümkündür.",
        "",
      ],
      [
        "Ayırıcı kanıtı kullan",
        "Sütle besleme memeli özelliğidir; solunum akciğerdir.",
        "",
      ],
      ["Uyumu denetle", "Yunus ve balina bu kanıt paketine uyar.", ""],
    ],
    "Memeliler.",
    "Yüzgeçli görünüm süt bezi kanıtını geçersiz kılmaz.",
    "Suda yaşayan her omurgalıyı balık sayma.",
  ),
  worked(
    "Timsahın kalbi karşı örnektir",
    "Bir omurgalı kuru keratinleşmiş örtülü, akciğerli, ektoterm ve dört odacıklı kalplidir. Dört odacık kuş demeye yeter mi?",
    "Kalp verisini diğer sistemlerle birlikte yorumla.",
    [
      [
        "Ortaklığı gör",
        "Dört odacık kuş ve memelide bulunur ama onlara özgü değildir.",
        "",
      ],
      [
        "İstisnayı kullan",
        "Timsah sürüngendir ve dört odacıklı kalp taşır.",
        "",
      ],
      [
        "Örtü ve ısıyı denetle",
        "Verilen kuru örtü ve ektotermlik timsah örneğiyle uyumludur.",
        "",
      ],
    ],
    "Hayır; timsah gibi sürüngenle uyumludur.",
    "Tek sistem yerine üç bağımsız bilgi birleştirildi.",
    "Çoğu sürüngenin üç odacıklı kalbini bütün sürüngenlere yayma.",
  ),
  worked(
    "Yumurtlayan memeli",
    "Kıllı, süt bezli ve yumurtlayan bir omurgalı gözleniyor. Yumurtlama memeliyi dışlar mı?",
    "Grup tanısında daha özgül yapıyı öne al.",
    [
      ["Örtüyü oku", "Kıl memeli kanıtını destekler.", ""],
      ["Beslenmeyi oku", "Süt bezleri memeliler için ayırt edicidir.", ""],
      [
        "İstisnayı denetle",
        "Ornitorenk ve ekidne yumurtlayan memelilerdir.",
        "",
      ],
    ],
    "Dışlamaz; yumurtlayan memeliyle uyumludur.",
    "Doğum yerine süt bezine dayanan sınıflandırma tutarlıdır.",
    "Bütün memeliler doğurur kuralını kullanma.",
  ),
  worked(
    "Döllenme ile gelişme konumu",
    "Bir kuşun yumurtası dişinin içinde dölleniyor, kabuklu yumurta dışarı bırakılıp embriyo yumurtada gelişiyor. İki konumu adlandır.",
    "Gamet birleşimi ve embriyo gelişimini iki sütuna yaz.",
    [
      [
        "Döllenme yerini seç",
        "Birleşme dişinin içinde olduğu için iç döllenmedir.",
        "",
      ],
      [
        "Gelişme yerini seç",
        "Embriyo bırakılan yumurta içinde dışarıda gelişir.",
        "",
      ],
      [
        "Yanlış bağı sınırla",
        "İç döllenme her zaman rahimde doğuma kadar gelişme gerektirmez.",
        "",
      ],
    ],
    "İç döllenme, dış gelişme.",
    "İki terim farklı olayları ölçüyor.",
    "İç döllenmeyi otomatik iç gelişme sayma.",
  ),
];
mitosisGuide.examples = [
  worked(
    "Anafazı geriye çöz",
    "Anafazdaki henüz bölünmemiş hücrede toplam28 kromozom ve16 pg çekirdek DNA’sı var. Normal dengeli bölünmede metafaz kromozomu ve tek yavru DNA’sı kaçtır?",
    "Kardeş ayrılmasıyla değişen kromozomu, korunmuş DNA’dan ayır.",
    [
      ["Kromozomu geri al", "Anafaz toplamı metafazın iki katıdır.", "28÷2=14"],
      [
        "DNA’yı paylaş",
        "16 pg eşlenmiş toplam iki yavruya eşit gider.",
        "16÷2=8pg",
      ],
      ["Sonucu denetle", "İki yavruda toplam28 kromozom ve16 pg bulunur.", ""],
    ],
    "Metafaz14 kromozom; tek yavru8 pg DNA.",
    "Anafazda yeniden DNA üretimi eklenmedi.",
    "28’i tek kutba veya16 pg’ı tek yavruya yazma.",
  ),
  worked(
    "Eşlenmiş kromozomu say",
    "G₁’de2n=6 kromozomlu hücrenin S evresi tamamlandı. Kromozom, DNA molekülü ve takım sayısını bul.",
    "Kardeş kopyayı bir kromozom biriminden ayrı say.",
    [
      [
        "Başlangıcı yaz",
        "G₁’de altı kromozom ve altı DNA molekülü vardır.",
        "2n=6",
      ],
      [
        "Eşlenmeyi uygula",
        "Her DNA kopyalanır; kardeşler bağlı kalır.",
        "6×2=12 DNA",
      ],
      [
        "Takımı koru",
        "Yeni homolog takım oluşmaz; kromozom sayısı altı kalır.",
        "",
      ],
    ],
    "6 kromozom,12 DNA molekülü,2n.",
    "Altı çift kardeşli X, toplam on iki kromatit eder.",
    "DNA ikiye katlandı diye6’yı12 kromozoma çevirme.",
  ),
  worked(
    "Toplu ve seçili bölünme",
    "Dört hücrenin tümü bir tam tur bölünüyor. Sonra yalnız üç hücre birer kez bölünüyor ve bir hücre kayboluyor. Son sayı?",
    "Ortak turu ikiyle çarp, seçili her bölünmeye net bir ekle.",
    [
      ["Tam tur", "Dört hücre sekiz hücre oluşturur.", "4×2=8"],
      [
        "Seçili olay",
        "Üç hücrenin her biri bir ek hücre kazandırır.",
        "8+3=11",
      ],
      ["Kayıp", "Bir hücreyi sonuçtan çıkar.", "11−1=10"],
    ],
    "10 hücre.",
    "İkinci aşamada tüm sekiz hücrenin bölündüğü varsayılmadı.",
    "Her aşamaya2ᵏ uygulama; yalnız herkesin bölündüğü tam turlarda geçerlidir.",
  ),
  worked(
    "İğ hasarını DNA hasarından ayır",
    "A’da DNA eşlenmiş ama hasar var. B’de bir kinetokor iğe bağlanmamış. M öncesi ve kardeş ayrılması öncesi hangi denetimler düşünülür?",
    "Eksik olayı ve geciken geçişi eşleştir.",
    [
      [
        "A’yı kur",
        "Eşlenmiş DNA hasarı G₂’den M’ye geçişi geciktirebilir.",
        "",
      ],
      [
        "B’yi kur",
        "İğ bağlantısı kusuru M denetimiyle anafazı geciktirebilir.",
        "",
      ],
      [
        "Ölçümü denetle",
        "Kontrolde aynı hücre tipi ve süreyle DNA hasarı ile bağlantıyı ayrı ölç.",
        "",
      ],
    ],
    "A:G₂ denetimi; B:M denetimiyle uyumludur.",
    "DNA miktarının iki kat olması hatasızlık kanıtı değildir.",
    "Bölünme durdu diye her iki örneğe aynı nedeni yazma.",
  ),
];
asexualGuide.examples = [
  worked(
    "İki yenilenme, farklı sonuç",
    "X planaryasının iki uygun parçası iki bağımsız bireye gelişiyor. Y kertenkelesi kaybettiği kuyruğunu tamamlıyor; atılan kuyruk gelişmiyor. Hangisi üremedir?",
    "Yeni bağımsız birey sayısını son karede denetle.",
    [
      [
        "X’i say",
        "İki parçanın her biri canlı oluşturduğundan yeni birey artışı vardır.",
        "1→2",
      ],
      ["Y’yi say", "Aynı ata onarılır, yeni kertenkele oluşmaz.", "1→1"],
      ["Yöntemi adlandır", "X rejenerasyonla eşeysiz üreme, Y onarımdır.", ""],
    ],
    "Yalnız X üremedir.",
    "İkisinde de hücre çoğalması olabilmesi sonuçları aynı yapmaz.",
    "Her rejenerasyonu üreme sayma.",
  ),
  worked(
    "Arıda sayıların tutarlılığı",
    "Standart bal arısı modelinde dişinin vücut hücresi2n=32. Yumurta, döllenmesiz erkek ve erkeğin sperminde kromozom sayıları kaçtır?",
    "Mayozun azaltımını, döllenmesiz gelişmeyi ve erkeğin n düzeyini sırala.",
    [
      ["Yumurtayı bul", "Kraliçenin mayozu bir takım bırakır.", "32÷2=16"],
      ["Erkeği bul", "Döllenmeyen n yumurta n erkeğe gelişir.", "n=16"],
      [
        "Spermi denetle",
        "Haploit erkek okul modelinde mitozla16 kromozomlu sperm yapar.",
        "16+16=32 dişi zigot",
      ],
    ],
    "Üçünde de16 kromozom.",
    "Dişi zigot döllenmede32’ye döner.",
    "Bütün spermleri mayoz ürünü sayma; bu arı modelinin sınırını koru.",
  ),
  worked(
    "Endospor ile üreme sporu",
    "P’de bir bakteri bir dayanıklı yapıdan sonra bir bakteri olarak geri dönüyor. Q mantarı çok sayıda spor yayıyor; her biri yeni koloni başlatabiliyor. Hangisinde üreme artışı kanıtı var?",
    "Yapının adı yerine işlevini ve birey sayısını kullan.",
    [
      ["P’yi izle", "Birden bire geçiş dayanıklılık sağlar.", "1→1→1"],
      ["Q’yu izle", "Birçok yapı bağımsız yeni başlangıç oluşturabilir.", ""],
      [
        "Çıkarımı sınırla",
        "Q sporlarının mitozla mı mayozla mı oluştuğu ayrıca verilmelidir.",
        "",
      ],
    ],
    "Q’da sporla üreme; P’de dayanıklılık.",
    "Spor sözcüğü tek başına mekanizma veya bölünme adı vermedi.",
    "Bakteri endosporunu çoğalma sayma.",
  ),
  worked(
    "Benzer genotip, farklı boy",
    "Aynı söğütten alınan iki dal çeliği farklı ışıkta köklenip farklı boylara ulaşıyor. Bu fark eşeyli üremeyi kanıtlar mı?",
    "Başlangıç dokusu ile fenotip ölçümünü ayır.",
    [
      [
        "Başlangıcı seç",
        "İki yavru somatik daldan geliştiği için vejetatif yol izlenmiştir.",
        "",
      ],
      [
        "Fenotipi yorumla",
        "Boy çevreden etkilenebilir; fark genotip farklılığını zorunlu kılmaz.",
        "",
      ],
      [
        "Ek denetim öner",
        "Işık ve diğer koşullar eşleştirilir; genetik iddia için uygun DNA verisi gerekir.",
        "",
      ],
    ],
    "Hayır; farklı boy eşeyli üremeyi kanıtlamaz.",
    "Yalnız iki gözlemden ışığın tek neden olduğu da kesinleşmez.",
    "Gözlenen her farkı yeni genotip veya döllenme kanıtı sayma.",
  ),
];
meiosisGuide.examples = [
  worked(
    "Anafaz II’de alanı değiştir",
    "Başlangıç2n=10,G₁ DNA12 birim. Anafaz II’de tek bölünmemiş hücrede, tek kutupta ve son üründe hangi kromozom/DNA sayıları vardır?",
    "ÖnceC’yi bul, sonra her bölünmedeki paylaşımı izle.",
    [
      [
        "Birimini bul",
        "G₁ iki takımdır; bir takımın DNA’sı6birimdir.",
        "C=12÷2=6",
      ],
      [
        "Tek hücreyi say",
        "İlk bölünme ürünü5 çift kardeşlidir; anafaz II’de kardeşler ayrıldığında10 kromozom ve12 birim DNA vardır.",
        "",
      ],
      [
        "Kutbu ve ürünü bul",
        "Her kutup5 kromozom ve6 birim alır; son üründe aynı değerler bulunur.",
        "4×6=24 S sonrası toplam",
      ],
    ],
    "Hücre:10/12; kutup:5/6; son ürün:5/6.",
    "Kromozom ve DNA birimleri birbirine dönüştürülmedi.",
    "Anafaz II bütün-hücre toplamını diploit yavru diye adlandırma.",
  ),
  worked(
    "Tek parça değişiminde dört kromatit",
    "Bir tetratta homologların kardeşleri AB,AB veab,ab işaretlerini taşıyor. A ileB arasındaki tek karşılıklı değişime iki kardeş olmayan kromatit katılıyor. Son dört işaret nedir?",
    "Katılan iki kromatidi değiştir, diğer ikisini koru.",
    [
      [
        "Katılanları seç",
        "Her homologdan bir kromatit katılır; ikisi katılmaz.",
        "AB ileab",
      ],
      [
        "Uçları değiştir",
        "İki işaret arasındaki değişim yeni birleşimleri oluşturur.",
        "Ab veaB",
      ],
      [
        "Katılmayanı koru",
        "Diğer kardeşler başlangıç işaretlerini taşır.",
        "AB veab",
      ],
    ],
    "AB,Ab,aB,ab.",
    "Dört kromatit korunur; sayısal kayıp veya artış eklenmez.",
    "Tetrattaki dört kromatidin hepsinin aynı tek değişime katıldığını varsayma.",
  ),
  worked(
    "Olası dört bileşim tek olayda dört farklı değildir",
    "A/a veB/b ayrı kromozom çiftlerinde. Parça değişimi yok. Bir kutba A ve b gidiyor. Bu tek mayozun ürünlerini ve çok sayıda mayozdaki olası bileşimleri karşılaştır.",
    "Gerçekleşen yönelim ile bütün yönelim olasılıklarını ayrı yaz.",
    [
      ["Karşı kutbu kur", "Bir kutupAb alırsa diğeriaB alır.", ""],
      [
        "Kardeşleri ayır",
        "Mayoz II her kutup takımının iki kopyasını ayırır.",
        "Ab,Ab,aB,aB",
      ],
      [
        "Olasılık kümesini kur",
        "Diğer yönelimdeAB veab de mümkündür.",
        "2²=4 bileşim",
      ],
    ],
    "Tek olay:Ab,Ab,aB,aB; genel küme:AB,Ab,aB,ab.",
    "Dört ürün sayısı dört farklı işaret zorunluluğu değildir.",
    "2ⁿ’yi bir mayozdaki kesin farklı ürün sayısı olarak kullanma.",
  ),
  worked(
    "Kutuptan tetrata geri git",
    "Normal mayozun anafaz II’sinde tek kutba7 kromozom gidiyor. Başlangıçtaki2n ve profaz I tetrat sayısı kaçtır?",
    "Tek kutbu bir takım olarak al ve homolog çiftlere dön.",
    [
      ["Takımı bul", "Anafaz II kutbunda bir takım vardır.", "n=7"],
      ["Başlangıcı bul", "Standart diploit başlangıç iki takımdır.", "2n=14"],
      [
        "Tetratı denetle",
        "İki homolog bir tetrat oluşturur.",
        "14÷2=7 tetrat;7×4=28 kromatit",
      ],
    ],
    "2n=14;7 tetrat.",
    "Başlangıç eşlenmiş14 kromozom28 kromatit taşır.",
    "Anafaz II’de hücrenin tamamını tek kutup sanma.",
  ),
];

invertebrateGuide.recall = [
  {
    prompt: "Omurgasız ile iskeletsiz neden eş anlamlı değildir?",
    answer:
      "Omurga ayrı yapıdır; eklembacaklı dış iskelet, derisidikenli kireçli iç iskelet taşıyabilir.",
  },
  {
    prompt: "Kapalı dolaşımlı iki omurgasız örneği ve alt grupları?",
    answer:
      "Toprak solucanı halkalı solucan; ahtapot kafadanbacaklı yumuşakçadır.",
  },
  {
    prompt: "Trake neden tek başına böceği ayırmaz?",
    answer:
      "Bazı çok ayaklı ve örümceğimsilerde de bulunabilir; göğüste üç çift bacak daha ayırt edicidir.",
  },
  {
    prompt: "Süngeri ve sölenteri hangi iki kanıt ayırır?",
    answer:
      "Süngerde porlar ve gerçek doku yokluğu; sölenterde yakıcı hücre ve doku organizasyonu.",
  },
  {
    prompt: "İki uyumsuz filtrede aday kalmaması ne söyler?",
    answer:
      "Bu sınırlı örnek paketinde koşulları birlikte sağlayan örnek yoktur; bütün doğa için yokluk kanıtı değildir.",
  },
];
vertebrateGuide.recall = [
  {
    prompt: "Penguen, yarasa ve yunusta habitat/hareket yerine hangi kanıt?",
    answer:
      "Penguende tüy kuşu; yarasa ve yunusta süt bezleri memeliyi ayırır.",
  },
  {
    prompt: "Dört odacık neden memeliye özgü değildir?",
    answer: "Kuşlar ve timsahgiller de dört odacıklı kalp taşır.",
  },
  {
    prompt: "Yumurta bırakan memeli örneği?",
    answer:
      "Ornitorenk veya ekidne; yumurtlamak süt bezli memeli oluşunu dışlamaz.",
  },
  {
    prompt: "İç döllenme ve dış gelişme birlikte olabilir mi?",
    answer:
      "Evet; kuşta gametler içeride birleşir, embriyo dışarı bırakılan yumurtada gelişir.",
  },
  {
    prompt: "Hava keseleri kuşta temel gaz değişim yüzeyi mi?",
    answer:
      "Hayır; havalandırmaya yardımcı olur, temel gaz değişimi akciğerdedir.",
  },
];
mitosisGuide.recall = [
  {
    prompt: "S sonunda kromozom ve DNA nasıl değişir?",
    answer:
      "Kromozom ve takım sayısı korunur; DNA molekülü ve miktarı iki katına çıkar.",
  },
  {
    prompt: "Anafazda neden kromozom toplamı geçici artar?",
    answer:
      "Ayrılan kardeşler ayrı kromozom sayılır; yeni DNA üretildiği için değil.",
  },
  {
    prompt: "Telofaz her zaman iki ayrı hücre demek mi?",
    answer:
      "Hayır; bir sitoplazmada iki çekirdek oluşabilir. Hücre ayrımı sitokinezle tamamlanır.",
  },
  {
    prompt: "Haploit hücre mitoz geçirebilir mi?",
    answer:
      "Uygun ökaryot hücre evet; takım korunarak n yavrular oluşturabilir.",
  },
  {
    prompt: "N₀×2ᵏ için hangi iki önemli koşul?",
    answer:
      "Her tam turda tüm hücreler bir kez bölünür; ölüm/kayıp yoktur. Seçili bölünmeler ayrıca sayılır.",
  },
];
asexualGuide.recall = [
  {
    prompt: "Bakteri endosporu neden üreme değildir?",
    answer:
      "Bir hücreden bir dayanıklı yapı ve yeniden bir hücre oluşur; birey sayısı artmaz.",
  },
  {
    prompt: "Planarya parçası ile kertenkele kuyruğu farkı?",
    answer:
      "Uygun planarya parçası yeni bağımsız birey oluşturabilir; kuyruk yenilenmesi aynı bireyi onarır.",
  },
  {
    prompt: "Her eşeysiz yavru zorunlu genetik olarak aynı mı?",
    answer:
      "Hayır; mutasyon ve bazı döllenmesiz gelişme yolları farklılık oluşturabilir. Mitoza dayalı klon benzerliği belirtilen koşulladır.",
  },
  {
    prompt: "Bal arısında erkek ve spermi neden aynı n?",
    answer:
      "Erkek döllenmemiş n yumurtadan gelişir; okul modelinde n düzeyini koruyan mitozla sperm yapar.",
  },
  {
    prompt: "Tohum ekmek neden her zaman vejetatif üretim değildir?",
    answer:
      "Normal örnekte embriyo daha önce döllenmeyle oluşmuştur; ekim bu üreme geçmişini değiştirmez.",
  },
];
meiosisGuide.recall = [
  {
    prompt: "Anafaz I veII’de ayrılan yapılar?",
    answer: "I’de homolog kromozomlar; II’de kardeş kromatitler ayrılır.",
  },
  {
    prompt: "Mayoz I sonrası hücre haploitse neden iki kromatitli olabilir?",
    answer:
      "Takım sayısı ile eşlenme durumu ayrı değişkenlerdir; n kromozomun her biri hâlâ iki kardeşlidir.",
  },
  {
    prompt: "Krossing over hangi kromatitler arasındadır?",
    answer:
      "Homolog çiftin kardeş olmayan kromatitlerinin karşılıklı eş bölgeleri arasında.",
  },
  {
    prompt: "2ⁿ neyi sayar?",
    answer:
      "Parça değişimi dışlandığında bağımsız homolog çiftlerin çok sayıdaki mayozda oluşturabileceği olası takım bileşimlerini; tek olayda kesin farklı dört ürünü değil.",
  },
  {
    prompt: "2C→4C→2C→C grafiğinde DNA neden kaybolmaz?",
    answer:
      "Hücre başına paylaşım gösterilir; dört son ürünün toplamı S sonrası4C’yi korur.",
  },
];

const invertebrateQuestions = [
  q(
    "f011-bio-b-invert-1",
    "Bir hayvan çok sayıda porundan su alıyor, gerçek doku ve organ taşımıyor; yakaladığı besini hücre içinde sindiriyor. Hangi okul grubuyla en uyumludur?",
    [
      "Süngerler",
      "Sölenterler",
      "Halkalı solucanlar",
      "Eklembacaklılar",
      "Derisidikenliler",
    ],
    0,
    "Su süzme ile organizasyon düzeyini birlikte değerlendir.",
    "Porlu su süzme yapısı ve gerçek doku-organ yokluğu süngeri destekler. Sölenterde doku ve yakıcı hücre; halkalı solucanda organlaşma; eklembacaklıda eklemli üyeler; derisidikenlide su damar sistemi bulunur. Yalnız suda yaşama bu ayrımı yapmaz.",
    "grup-tanisi",
  ),
  q(
    "f011-bio-b-invert-2",
    "Bir hidrada yakıcı hücreler ve tek açıklıklı sindirim boşluğu gözleniyor. Hangi yorum doğrudur?",
    [
      "Ağız ve anüs zorunlu ayrıdır",
      "Sölenter planıyla uyumludur; aynı açıklık giriş ve çıkışa hizmet eder",
      "Gerçek doku kesinlikle bulunmaz",
      "Her hücresine kapalı dolaşımla kan gider",
      "Bütün yaşamı yalnız eşeysiz üremeyle geçmek zorundadır",
    ],
    1,
    "Tek açıklıklı boşluğu iki açıklıklı kanaldan ve sistem yokluğunu kapalı dolaşımdan ayır.",
    "Hidra sölenterdir; tek açıklık besin alımı ve artık çıkışında kullanılır. Doku organizasyonu vardır, özel dolaşım sistemi yoktur. Yakıcı hücre ve verilen boşluk iki açıklığı veya yaşam boyu tek üreme yolunu gerektirmez. Bu nedenle yalnız ikinci yorum verilen yapıya uygundur.",
    "sindirim-organizasyon",
  ),
  q(
    "f011-bio-b-invert-3",
    "Toprak solucanı, midye, çekirge ve ahtapot arasında kapalı dolaşım sistemini paylaşan çift hangisidir?",
    [
      "Midye ve çekirge",
      "Çekirge ve ahtapot",
      "Toprak solucanı ve ahtapot",
      "Toprak solucanı ve midye",
      "Midye ve ahtapot",
    ],
    2,
    "Halkalı solucanı ve kafadanbacaklı yumuşakça istisnasını hatırla.",
    "Toprak solucanı halkalı solucandır ve kapalı dolaşımlıdır; ahtapot kafadanbacaklı yumuşakça olarak kapalı dolaşım taşır. Midye çoğu yumuşakça gibi açık, çekirge eklembacaklı olarak açık dolaşımlıdır. Omurgasızlık bütün üyelerde açık dolaşım zorunluluğu değildir.",
    "sistem-istisnasi",
  ),
  q(
    "f011-bio-b-invert-4",
    "Kitin dış iskelet, eklemli üyeler ve trake verilen bir hayvanı yalnız böcekler alt grubuna yerleştirmek için hangi ek kanıt en ayırt edicidir?",
    [
      "Heterotrof beslenme",
      "Ökaryot hücre",
      "Açık dolaşım",
      "Göğüste üç çift bacak",
      "Omurganın olmaması",
    ],
    3,
    "Üst grubun ortaklarını değil, böceğin vücut planını ara.",
    "Göğüste üç çift bacak böcek vücut planının ayırt edici özelliğidir. Heterotrofluk ve ökaryotluk geniş hayvan ortaklıklarıdır; açık dolaşım eklembacaklılarda yaygındır, omurga yokluğu da çok geniştir. Trake bazı çok ayaklı ve örümceğimsilerde de bulunabildiğinden tek başına böceği seçtirmez.",
    "ust-alt-grup",
  ),
  q(
    "f011-bio-b-invert-5",
    "Bir deniz hayvanında su damar sistemi, tüp ayaklar ve kireçli iç iskelet bulunuyor. Hangi sonuç bu kanıtla uyumludur?",
    [
      "İç iskelet taşıdığı için zorunlu omurgalıdır",
      "Denizde yaşadığı için süngerdir",
      "Tüm yaşam evrelerinde kesin iki yanlı simetrilidir",
      "Kitin dış iskeletli bir böcektir",
      "Derisidikenli bir omurgasızla uyumludur",
    ],
    4,
    "Omurga ile iç destek yapısı aynı şey değildir.",
    "Su damar sistemi ve tüp ayak derisidikenli kanıtıdır; bu grupta kireçli iç iskelet bulunabilir ama omurga yoktur. Denizel yaşam tek başına sünger tanısı yapmaz. Ergin ve larva simetrileri farklı olabilir; kitin dış iskelet ve böcek planı verilen yapılarla aynı değildir.",
    "yapi-kanıti",
  ),
  q(
    "f011-bio-b-invert-6",
    "Yassı solucan planarya, parazit tenya ve halkalı toprak solucanı için hangi eşleştirme doğrudur?",
    [
      "Planarya: tek açıklıklı sindirim boşluğu; tenya: sindirim sistemi yok; toprak solucanı: ağız ve anüs ayrı",
      "Üçünde de ağız ve anüs ayrıdır",
      "Üçünde de sindirim sistemi yoktur",
      "Tenya: kapalı dolaşım; toprak solucanı: sistemsiz",
      "Planarya omurgalı, diğerleri omurgasızdır",
    ],
    0,
    "Solucan gövde benzerliği bütün sistemleri aynılaştırmaz.",
    "Planaryanın tek açıklıklı boşluğu, tenyadaki sindirim sistemi yokluğu ve toprak solucanının iki açıklıklı kanalı farklı planlardır. Diğer seçenekler bu farklılıkları siler veya yanlış dolaşım ve omurga bilgisi ekler. Özellikle parazit tenyanın besini yüzeyden alması ayrı değerlendirilir.",
    "solucan-karsilastirma",
  ),
  q(
    "f011-bio-b-invert-7",
    "Bir omurgasızda manto, iç organ kitlesi ve özelleşmiş kaslı ayak planı bulunuyor; belirgin dış kabuk görülmüyor. Hangisi güvenli yorumdur?",
    [
      "Kabuk yoksa yumuşakça olamaz",
      "Yumuşakça olabilir; ahtapot gibi dış kabuğu belirgin olmayan örnekler vardır",
      "Mutlaka böcektir",
      "Bütün benzerlerinde açık dolaşım zorunludur",
      "Manto omurgalılara özgü kanıttır",
    ],
    1,
    "Bir grubun temel planını her üyede zorunlu dış kabukla eşitleme.",
    "Manto ve özelleşmiş ayak planı yumuşakçayı destekler. Ahtapot belirgin dış kabuk taşımadan bu gruptadır ve kapalı dolaşımlıdır. Bu yüzden kabuk yokluğuyla grubu elemek ve tüm üyeleri açık dolaşımlı saymak yanlıştır. Böcek ve omurgalı çıkarımları verilen ayırıcı yapıyla uyuşmaz.",
    "grup-istisnasi",
  ),
  q(
    "f011-bio-b-invert-8",
    "Bir planaryanın iki uygun parçasının her birinden bağımsız birey oluşuyor. Başka bir hayvanda yalnız yara kapanıyor ve birey sayısı değişmiyor. Bu iki olayı hangi ifade ayırır?",
    [
      "İkisinde de mutlaka döllenme vardır",
      "İkisi de yalnız büyümedir",
      "İlkinde rejenerasyonla üreme, ikincisinde onarım vardır",
      "Yalnız ikincisi eşeysiz üremedir",
      "Hücre çoğalması varsa ikisi de zorunlu yeni birey üretmiştir",
    ],
    2,
    "Yenilenen dokudan önce son bağımsız birey sayısını kontrol et.",
    "Uygun parçaların iki bağımsız birey oluşturması rejenerasyonla üremedir. Yara kapanırken aynı birey onarılıyorsa üreme artışı yoktur. İkisinde hücre çoğalması bulunabilmesi aynı biyolojik sonucu gerektirmez; döllenme de verilen gözlemlerden çıkmaz. Ölçüt yalnız parça kopması değil yeni bireydir.",
    "ureme-onarim",
  ),
  q(
    "f011-bio-b-invert-9",
    "Örümcek ile çekirgeyi ayırmada hangi karşılaştırma tipik okul vücut planlarıyla uyumludur?",
    [
      "İkisinde de zorunlu iki çift anten",
      "Örümcekte üç çift, çekirgede dört çift bacak",
      "Çekirgede omurga, örümcekte dış iskelet",
      "Örümcekte dört çift yürüme bacağı ve anten yok; çekirgede göğüste üç çift bacak ve bir çift anten",
      "Çekirgede mutlaka kapalı dolaşım",
    ],
    3,
    "Anten ve bacak paketini birlikte kullan.",
    "Tipik örümceğimsi örümcekte dört çift yürüme bacağı ve anten yokluğu, böcek çekirgede göğüste üç çift bacak ve bir çift anten bulunur. İkisi eklembacaklıdır; omurga taşımaz ve açık dolaşımlıdır. İki çift anten kabuklu örnekleriyle karşılaştırılır; ilk iki seçenek sayıları karıştırır.",
    "eklembacakli-altgrup",
  ),
  q(
    "f011-bio-b-invert-10",
    "‘Bütün omurgasızlarda özel dolaşım sistemi vardır ve bu sistem açıktır’ iddiasını hangi gözlem paketi doğrudan çürütür?",
    [
      "Çekirgede açık dolaşım görülmesi",
      "Midyenin suda yaşaması",
      "Denizyıldızının heterotrof olması",
      "Kelebeğin kanat taşıması",
      "Süngerde özel dolaşım sistemi yokluğu ve toprak solucanında kapalı dolaşım görülmesi",
    ],
    4,
    "Evrensel iddianın sistem vardır ve açıktır parçalarını ayrı test et.",
    "Süngerde özel dolaşım sistemi olmaması ilk parçayı; toprak solucanında kapalı dolaşım bulunması ikinci parçayı çürütür. Çekirge örneği yalnız açık dolaşımlı bir üyeyi gösterir ve evrenselliği kanıtlamaz. Habitat, heterotrofluk ve kanat bilgileri iddianın sistem türünü doğrudan sınamaz.",
    "evrensel-iddia",
  ),
];
const vertebrateQuestions = [
  q(
    "f011-bio-b-vert-1",
    "Suda yaşayan bir omurgalı akciğerle soluyor ve yavrusunu sütle besliyor. Hangi okul grubuna yerleştirilir?",
    ["Memeliler", "Balıklar", "İki yaşamlılar", "Kuşlar", "Yumuşakçalar"],
    0,
    "Habitat yerine yavru besleme yapısını öne al.",
    "Süt bezlerinin ürünüyle yavru besleme memeli tanısını destekler; yunus ve balina suda yaşayan örneklerdir. Akciğer tek başına birkaç grupta görülebilir, su habitatı balığı zorunlu kılmaz. Diğer gruplarda bu memeli özelliği bulunmaz; yumuşakça zaten omurgalı değildir.",
    "habitat-yanilgisi",
  ),
  q(
    "f011-bio-b-vert-2",
    "Kuru keratinleşmiş örtü, akciğer, ektotermlik ve dört odacıklı kalp verilen bir örnek hangi canlıyla uyumludur?",
    ["Sazan", "Timsah", "Kurbağa larvası", "Penguen", "Yunus"],
    1,
    "Dört odacık kuş ve memeliye özgü değildir.",
    "Timsah sürüngen olup dört odacıklı kalp, kuru keratinleşmiş örtü, akciğer ve ektotermlik paketine uyar. Penguen ve yunus dört odacıklı olsa da endotermdir ve örtüleri farklıdır. Sazan solungaçlı iki odacıklı; kurbağa larvası ise verilen sürüngen örtüsünü taşımaz.",
    "istisna-kanıti",
  ),
  q(
    "f011-bio-b-vert-3",
    "Uçamayan bir omurgalıda tüy, gaga ve akciğere bağlı hava keseleri bulunuyor. Hangi yorum doğrudur?",
    [
      "Uçamıyorsa kuş olamaz",
      "Kesin memelidir",
      "Kuş planıyla uyumludur; uçuş yeteneği zorunlu değildir",
      "Solungaç solunumu yapması zorunludur",
      "Dört odacıklı kalp taşıyamaz",
    ],
    2,
    "Penguen gibi karşı örnekleri düşün.",
    "Tüy ve verilen solunum paketi kuş planını destekler; penguen ve devekuşu uçmadan kuş olabilir. Uçmamak memeli tanısı yapmaz. Kuşlar akciğerle solur ve dört odacıklı kalp taşır; solungaç veya dört odacık yokluğu verilen tanıyla uyumlu değildir.",
    "kus-ayırici",
  ),
  q(
    "f011-bio-b-vert-4",
    "Kıl, süt bezleri ve yumurtlama gözlenen bir omurgalı için hangisi güvenlidir?",
    [
      "Yumurtlama nedeniyle memeli olamaz",
      "Tüy taşımak zorundadır",
      "Balık olması zorunludur",
      "Ornitorenk gibi yumurtlayan memeliyle uyumludur",
      "Döllenme kesin dış ortamda gerçekleşmiştir",
    ],
    3,
    "Çoğu memelide doğum olması, tümünde doğum demek değildir.",
    "Ornitorenk ve ekidne yumurtlayan memelilerdir; kıl ve süt bezi kanıtı yumurtlamayla çelişmez. Yumurtlama kuşa veya balığa özgü değildir ve dış döllenme anlamına gelmez. Bu nedenle yalnız yumurtlama üzerinden memeliyi elemek veya tüy eklemek yanlış genellemedir.",
    "memeli-istisna",
  ),
  q(
    "f011-bio-b-vert-5",
    "Bir kuşta gametler dişinin içinde birleşiyor; embriyo sonradan dışarı bırakılan kabuklu yumurtada gelişiyor. Doğru adlandırma hangisidir?",
    [
      "Dış döllenme ve iç gelişme",
      "Dış döllenme ve dış gelişme",
      "İç döllenme ve zorunlu doğum",
      "Döllenmesiz vejetatif üreme",
      "İç döllenme ve dış gelişme",
    ],
    4,
    "Birleşme ve embriyonun gelişme yerlerini ayrı seç.",
    "Gamet birleşmesi içeride olduğundan iç döllenme, embriyonun bırakılan yumurtada dışarıda gelişmesi dış gelişmedir. İç döllenme zorunlu doğum demek değildir. Diğer seçenekler yerleri değiştirir veya döllenme verisini yok sayarak vejetatif üretim gibi farklı mekanizma ekler.",
    "ureme-konumu",
  ),
  q(
    "f011-bio-b-vert-6",
    "Sazan, kurbağa, kertenkele, penguen ve yunus örnekleri için hangisi okul düzeyinde ortak omurgalı planıyla uyumludur?",
    [
      "Kapalı dolaşım ve böbreklerle boşaltım",
      "Dört odacıklı kalp",
      "Akciğerle solunum",
      "Süt bezleri",
      "Tüy örtüsü",
    ],
    0,
    "En farklı örnek olan sazanla aday ortaklığı sınayabilirsin.",
    "Kapalı dolaşım ve böbrekler verilen omurgalı örneklerinde ortak planın parçalarıdır. Dört odacık sazan ve kurbağada yoktur; sazan temel gaz alışverişini solungaçla yapar. Süt bezi memeliye, tüy kuşa özgü tanı kanıtıdır. Dar grup özelliği geniş ortaklık yerine kullanılamaz.",
    "ortak-plan",
  ),
  q(
    "f011-bio-b-vert-7",
    "Bir kurbağanın larvası solungaç, ergini akciğer ve deriyle soluyor. Hangi açıklama uygundur?",
    [
      "Ergin olması onu sürüngene dönüştürür",
      "Başkalaşımda yapı ve yaşam biçimi değişir; iki evre aynı iki yaşamlı türünün evreleridir",
      "Larva ve ergin mutlaka farklı türlerdir",
      "Nemli deri solunumla ilişkili olamaz",
      "İki yaşamlılarda tüm yaşam boyunca tek solunum organı zorunludur",
    ],
    1,
    "Bireyin gelişim evresiyle sistem özelliğini birlikte oku.",
    "Başkalaşım belirgin yapı ve yaşam biçimi değişimidir; larva-ergin solunum farkı tür veya okul grubu değişimi değildir. Nemli deri gaz alışverişine katılabilir. Aynı türün her evresinde zorunlu tek organ varsaymak verilen gözlemi siler; ergin kurbağa sürüngen olmaz.",
    "gelisim-evresi",
  ),
  q(
    "f011-bio-b-vert-8",
    "Bir öğrenci ‘ektoterm canlının kanı her an bir endoterminkinden daha soğuktur’ diyor. Hangisi doğru düzeltmedir?",
    [
      "Ektoterm canlılarda metabolizma yoktur",
      "Endoterm canlılar çevreyle ısı alışverişi yapmaz",
      "Terimler ısı kaynağı ve düzenlemeyle ilişkilidir; tek ölçümde sıcaklık sırası zorunlu değildir",
      "Ektoterm bütün hayvanlar omurgasızdır",
      "Endotermlik dört odacık olmayan kalpte zorunlu görülür",
    ],
    2,
    "Güneşteki kertenkele ve gölgedeki canlı tek bir sıcaklık sırası vermeyebilir.",
    "Ektotermlik çevresel ısının, endotermlik metabolik ısı üretiminin önemli rolünü anlatır. Bu bir karşılaştırma anında kan sıcaklıkları için değişmez sıra koymaz. İkisinde de metabolizma ve çevreyle ısı alışverişi vardır. Diğer seçenekler grup veya kalp hakkında konuyla ilgisiz ve yanlış zorunluluklar ekler.",
    "isi-duzenleme",
  ),
  q(
    "f011-bio-b-vert-9",
    "Kuşların hava keseleri için hangi ifade doğrudur?",
    [
      "Akciğerin yerine geçen temel gaz değişim yüzeyidir",
      "Süt üretir",
      "Bütün omurgalılarda bulunur",
      "Havalandırmaya yardımcıdır; temel gaz değişimi akciğerde gerçekleşir",
      "Solungaçlarla bağlantılıdır",
    ],
    3,
    "Hava depolama/hareket işlevi ile gaz değişim yüzeyini ayır.",
    "Hava keseleri kuşlarda havalandırmayı destekler; temel gaz değişimi akciğerdeki yapılarda olur. Akciğerin yerine geçen solungaç değildir, bütün omurgalılara ortak değildir ve süt üretimiyle ilişkisi yoktur. Yapının işlevi belirlenmeden yalnız hava sözcüğünden gaz değişiminin orada olduğu çıkarılamaz.",
    "solunum-islevi",
  ),
  q(
    "f011-bio-b-vert-10",
    "‘İç iskelet taşıyan her hayvan omurgalıdır’ iddiasını hangi örnek çürütür?",
    [
      "Yunusun memeli olması",
      "Sazanda kıkırdak veya kemik destek bulunması",
      "Penguenin tüy taşıması",
      "Kurbağada kapalı dolaşım bulunması",
      "Denizyıldızında kireçli iç iskelet olmasına karşın omurga bulunmaması",
    ],
    4,
    "Omurgasız bir iç iskelet örneği ara.",
    "Derisidikenli denizyıldızı kireçli iç iskelet taşır ama omurga taşımaz; bu doğrudan karşı örnektir. Diğer örnekler zaten omurgalıdır veya başka sistem özelliği verir ve iddiayı çürütmez. İç destek yapısı ile omurga aynı ölçüt değildir.",
    "karsi-ornek",
  ),
];
const mitosisQuestions = [
  q(
    "f011-bio-b-mitosis-1",
    "Normal bir diploit hücre G₁’de2n=8 kromozom taşıyor. S evresi tamamlandığında çekirdek kromozomu ve DNA molekülü sayıları sırasıyla kaçtır?",
    ["8 ve16", "16 ve16", "8 ve8", "4 ve8", "16 ve8"],
    0,
    "Kardeşler eşlenir ama sentromer bölgesinde birlikte kalır.",
    "S sonunda sekiz kromozomun her biri iki kardeş kromatit taşır: sekiz kromozom ve on altı çekirdek DNA molekülü. Takım sayısı2n kalır. On altı kromozom yazmak eşlenmeyi ayrılmayla karıştırır; dört yazmak mayoz azaltımını ekler, diğer DNA sayıları eşlenmeyi göz ardı eder.",
    "s-evresi-sayim",
  ),
  q(
    "f011-bio-b-mitosis-2",
    "Başlangıcı2n=6 olan hücrenin normal mitoz anafazında, sitoplazma henüz ayrılmamışken bütün hücrede kaç kromozom ve kaç çekirdek DNA molekülü vardır?",
    ["6 ve12", "12 ve12", "12 ve24", "6 ve6", "3 ve6"],
    1,
    "Ayrılan kardeşler ayrı kromozom sayılır; anafazda DNA yeniden kopyalanmaz.",
    "Altı eşlenmiş kromozomun kardeşleri ayrılınca bütün hücrede on iki bağımsız kromozom sayılır. Aynı on iki DNA molekülü korunur. Tek kutupta altı kromozom ve altı DNA bulunur; bu soruda bütün hücre istenmiştir. Yirmi dört DNA eklemek yeni bir eşlenme varsayımıdır.",
    "anafaz-alani",
  ),
  q(
    "f011-bio-b-mitosis-3",
    "Bir hücrenin G₁ çekirdek DNA miktarı5 pg. Normal mitoz anafazında tek kutba giden DNA miktarı kaçtır?",
    ["20pg", "10pg", "5pg", "2,5pg", "0pg"],
    2,
    "Eşlenmiş toplam iki kutba paylaştırılır.",
    "G₁’de5 pg olan DNA S sonunda10 pg olur. Anafazdaki bütün hücre10 pg taşırken dengeli ayrılmada bir kutup bunun yarısı5 pg alır.10 pg bütün hücreyi kutba yazmak,2,5 pg ise mayozdaki ikinci paylaşımı eklemek olur. Yeni bir DNA kaybı veya ek eşlenme verilmemiştir.",
    "dna-paylasimi",
  ),
  q(
    "f011-bio-b-mitosis-4",
    "Bir bitki hücresinde iki çekirdek bölgesi görülüyor; ortada oluşan hücre plağı kenarlara doğru büyüyor. Hangi yorum doğrudur?",
    [
      "Hayvan tipi dıştan içe boğumlanmadır",
      "DNA’nın ikinci kez eşlendiği S evresidir",
      "Homologların tetrat oluşturduğu zorunlu evredir",
      "Bitki sitokineziyle uyumludur; çekirdek sayısı ile ayrı hücre sayısı ayrılmalıdır",
      "Sentrozom yoksa iğ oluşması mümkün değildir",
    ],
    3,
    "Ortadan dışa yeni bölme ile dıştan içe boğumu karşılaştır.",
    "Hücre plağının merkezden kenarlara büyümesi bitki sitokinezini destekler. İki çekirdek tek sitoplazmada bulunabileceği için ayrı hücre sayısı sitokinez durumuyla belirlenir. Bu S eşlenmesi veya zorunlu tetrat kanıtı değildir; yüksek yapılı bitkiler tipik hayvan sentrozomu olmadan iğ oluşturabilir.",
    "sitokinez-yapisi",
  ),
  q(
    "f011-bio-b-mitosis-5",
    "Dört hücrenin hepsi bir tam tur ikiye bölünüyor. Sonra yalnız üç hücre birer kez bölünüyor, ardından bir hücre ölüyor. Kalan hücre sayısı kaçtır?",
    ["7", "8", "11", "15", "10"],
    4,
    "Tam turdan sonra her seçili bölünme net bir hücre ekler.",
    "İlk tam tur4×2=8 hücre verir. Sonraki seçili üç bölünme toplamı3 artırır:11. Bir ölümle10 kalır. İkinci adımda tüm popülasyonun bölündüğü verilmediğinden tekrar ikiyle çarpmak yanlış olur.11 ölümün unutulmasıdır;8 seçili aşamanın atlanmasıdır.",
    "hücre-sayisi",
  ),
  q(
    "f011-bio-b-mitosis-6",
    "DNA eşlenmesi tamamlanmış bir hücrede onarılmamış DNA hasarı saptanıyor. M evresine geçiş öncesi ilgili temel denetim hangisidir?",
    [
      "G₂ denetimi",
      "Yalnız hücre dışı sindirim",
      "Döllenme denetimi",
      "Mayoz II kardeş dağılımı",
      "Gamet birleşmesi",
    ],
    0,
    "Eşlenme sonu ile M başlangıcı arasındaki denetimi seç.",
    "Eşlenmiş DNA’nın durumu G₂ denetimiyle ilişkilidir; hasar M’ye geçişi geciktirebilir. DNA miktarının artmış olması hatasızlığı göstermez. Diğer seçenekler bu hücre döngüsü geçişini açıklamaz ve verilmemiş döllenme, sindirim veya mayoz olayı ekler.",
    "g2-denetim",
  ),
  q(
    "f011-bio-b-mitosis-7",
    "Metafazdaki hücrede bir kromozomun kinetokoru iğ ipliğine uygun bağlanmamış. Beklenen temel denetim etkisi hangisidir?",
    [
      "DNA miktarı kendiliğinden yarıya iner",
      "M denetimi kardeş ayrılması ve anafazı geciktirebilir",
      "Hücre kesin haploit gamete dönüşür",
      "Yeni bir S evresi zorunlu başlar",
      "Sitoplazma hiç denetimsiz mutlaka ayrılır",
    ],
    1,
    "Bağlantının tamamlanmasıyla kardeşlerin ayrılması arasındaki ilişkiyi kur.",
    "İğ bağlantısı denetimi M evresinde anafaza geçişi düzenler; uygun bağlanma yoksa ayrılma gecikebilir. Bu doğrudan DNA’yı yarılamaz, gamet oluşturmaz ve yeni S evresini zorunlu kılmaz. Denetimin amacı normal dağılımı desteklemektir; kesin ve koşulsuz sitokinez çıkarımı verilenden çıkmaz.",
    "m-denetim",
  ),
  q(
    "f011-bio-b-mitosis-8",
    "Normal yeni mutasyon olmayan mitoz geçiren haploit bir ökaryot hücre için hangi sonuç doğrudur?",
    [
      "Yalnız diploit hücreler mitoz yapabildiği için olay imkânsızdır",
      "Her yavru zorunlu2n olur",
      "Takım sayısı korunarak n yavrular oluşabilir",
      "Kardeş yerine homolog tetratlar ayrılmak zorundadır",
      "Her yavru ata DNA miktarının dört katını alır",
    ],
    2,
    "Mitozun işi takım azaltmak veya döllenme yapmak değildir.",
    "Uygun haploit ökaryot hücre mitoz geçirebilir ve takım sayısını koruyan n yavrular oluşturabilir. DNA’nın önceden eşlenmesi ploidiyi ikiye katlamaz.2n oluşumu için burada verilmemiş takım birleşmesi gerekir; tetrat ve homolog ayrımı normal mitozun ayırıcı olayı değildir.",
    "haploit-mitoz",
  ),
  q(
    "f011-bio-b-mitosis-9",
    "Benzer küp hücre modelinde kenar uzunluğu a iken yüzey6a²,hacim a³. Kenar2 birimden4 birime çıktığında yüzey/hacim oranı nasıl değişir?",
    [
      "3’ten6’ya çıkar",
      "Değişmez",
      "1,5’ten3’e çıkar",
      "3’ten1,5’e iner; tek başına kesin bölünme kararı verdirmez",
      "Sıfır olur ve DNA yok olur",
    ],
    3,
    "Oranı sadeleştir:6/a.",
    "Yüzey/hacim6/a olduğundan a=2 için3,a=4 için1,5 ters uzunluk birimidir. Oran yarıya iner. Bu geometrik kısıt madde alışverişiyle ilişkilidir fakat büyüme sinyalleri ve denetimler olmadan tek başına kesin bölünme kararı değildir. DNA kaybı bu geometriden çıkarılamaz.",
    "yuzey-hacim",
  ),
  q(
    "f011-bio-b-mitosis-10",
    "Aynı soy hattında hücre başına DNA miktarı G₁’de2C,S sonunda4C ve normal mitoz yavrusunda2C ölçülüyor. Hangi yorum doğrudur?",
    [
      "DNA’nın yarısı hücre dışına atılmıştır",
      "S sonunda kromozom takımı kesin4n olmuştur",
      "Bu değerlerden türün kromozom sayısı kesin46’dır",
      "İki yavrunun toplam DNA’sı yalnız2C’dir",
      "İki yavrunun toplamı4C’dir; hücre başına azalma paylaşımı gösterir",
    ],
    4,
    "Tek yavru ile iki yavrunun toplamını ayır.",
    "Her yavru2C aldığı için iki yavrunun toplamı4C’dir; S sonrası miktar korunarak paylaşılmıştır. Yeni DNA kaybı veya4n takım oluşumu gerekmez. C göreli bir haploit DNA miktarıdır; bu kat örüntüsü türün mutlak kromozom sayısını vermez. Diğer seçenekler alanı veya ölçülen büyüklüğü değiştirir.",
    "grafik-alani",
  ),
];
const asexualQuestions = [
  q(
    "f011-bio-b-asexual-1",
    "Bir bakteriden bir dayanıklı endospor oluşuyor; uygun koşulda bundan tek bakteri geri dönüyor. Bu olayın temel işlevi hangisidir?",
    [
      "Dayanıklılığı artırmak; bu1→1→1 dizisi üreme artışı değildir",
      "Birey sayısını her aşamada iki katına çıkarmak",
      "İki gameti birleştirmek",
      "Dört haploit gamet oluşturmak",
      "Her olayda mitotik profaz oluşturmak",
    ],
    0,
    "Yapının adını değil, birey sayısı ve işlevini izle.",
    "Bir hücreden bir yapı ve yeniden bir hücre oluşması sayıyı artırmaz; endospor olumsuz koşulları aşmaya yarar. Bu üreme sporu veya gamet birleşmesi değildir. Bakteri prokaryot olduğundan mitoz evreleri eklenmez; dört gamet sonucu da verilen olaydan çıkmaz.",
    "endospor-islevi",
  ),
  q(
    "f011-bio-b-asexual-2",
    "Yaşayan bir hidranın gövdesinde çıkıntı büyüyor, sonra ayrılıp bağımsız hidra oluyor. Bu başlangıç dizisini en iyi adlandıran yol hangisidir?",
    [
      "Dış döllenme",
      "Tomurcuklanma",
      "Yalnız yara onarımı",
      "Mayozla gamet birleşmesi",
      "Bakteri endosporu",
    ],
    1,
    "Parça önce kopmuyor; çıkıntı ata üzerinde büyüyor.",
    "Ata üzerindeki yerel çıkıntının büyüyüp yeni bireye gelişmesi tomurcuklanmadır. Yeni birey bulunduğu için yalnız onarım değildir. Gamet birleşmesi veya bakteri dayanıklılık yapısı verilmemiştir; bunları ekleyen seçenekler olayın gerçek başlangıcını değiştirmektedir.",
    "tomurcuklanma",
  ),
  q(
    "f011-bio-b-asexual-3",
    "Bir kertenkele kaybettiği kuyruğunu yeniliyor; atılan kuyruk yeni canlı oluşturmuyor. Hangisi doğrudur?",
    [
      "Her rejenerasyon zorunlu eşeysiz üremedir",
      "Döllenme gerçekleşmiştir",
      "Aynı birey onarılmıştır; bağımsız birey sayısı artmadığı için üreme kanıtı yoktur",
      "İki kertenkele oluşmuştur",
      "Kuyruk kaybı kromozom takımını yarıya indirmiştir",
    ],
    2,
    "Son karede kaç bağımsız canlı kaldığını say.",
    "Kuyruğun yenilenmesi aynı kertenkelenin onarımıdır; yeni birey oluşmadığı için bu örnek üreme değildir. Rejenerasyon ancak uygun parçadan yeni birey gelişirse üremeye de hizmet edebilir. Döllenme, iki birey veya takım azaltımı verilmiş olaylar değildir.",
    "onarim-ureme",
  ),
  q(
    "f011-bio-b-asexual-4",
    "Aynı ana bitkiden alınan iki dal çeliği farklı ışık koşullarında yetişiyor ve boyları farklı oluyor. Hangi çıkarım güvenlidir?",
    [
      "Boy farkı kesin farklı genotipi gösterir",
      "İkisi de kesin eşeyli üretimdir",
      "Çevre fenotipi etkileyemez",
      "Farklı boy vejetatif üretimle çelişmez; genetik fark tek başına kanıtlanmaz",
      "İki bitkinin türü kesin farklıdır",
    ],
    3,
    "Somatik başlangıç ile gözlenen özelliği ayrı tut.",
    "Dal çeliği vejetatif başlangıçtır. Aynı genotipte çevre etkisiyle farklı fenotip görülebilir; boy farkı tek başına genetik fark, eşeyli üreme veya farklı tür kanıtı değildir. Ayrıca iki gözlem ışığın tek neden olduğunu da kesinleştirmez; başka koşulların denetimi gerekir.",
    "genotip-fenotip",
  ),
  q(
    "f011-bio-b-asexual-5",
    "Standart bal arısı modelinde dişinin vücut hücresi2n=32. Döllenmemiş yumurtadan gelişen erkek ve bu erkeğin spermi kaç kromozom taşır?",
    [
      "Erkek32,sperm16",
      "Erkek16,sperm8",
      "Erkek32,sperm32",
      "Erkek8,sperm8",
      "Erkek16,sperm16",
    ],
    4,
    "Yumurta n; haploit erkeğin sperm üretimi okul modelinde mitozdur.",
    "Kraliçenin mayoz ürünü yumurta n=16’dır. Döllenme olmadan gelişen erkek n=16 kalır; n düzeyini koruyan mitozla oluşturduğu sperm de16 taşır. Spermi yeniden yarılamak iki kez azaltım ekler; erkeğe32 yazmak verilmemiş döllenme gerektirir. Bu sayı ilişkisi arı modeline özgü tutulur.",
    "ari-ploidisi",
  ),
  q(
    "f011-bio-b-asexual-6",
    "Üç bakterinin tamamı iki tam tur bölünüyor. Sonra yalnız beş bakteri birer kez daha bölünüyor. Kayıp yok. Son sayı kaçtır?",
    ["17", "24", "15", "12", "20"],
    0,
    "İlk iki ortak turdan sonra seçili beş olay net beş ekler.",
    "Üç başlangıç hücresi iki tam turda3×2²=12 olur. Yalnız beşinin bölünmesi beş ek hücre kazandırır:12+5=17.24 tüm hücrelerin üçüncü turda bölündüğünü varsayar;12 ek bölünmeleri unutur. Mekanizma bakteride ikiye bölünmedir, mitoz evreleri değildir.",
    "secili-bolunme",
  ),
  q(
    "f011-bio-b-asexual-7",
    "Çileğin yüzeyde uzanan gövdesinin boğumundan kök ve sürgün oluşuyor. Başka bir bitki daha önce döllenmeyle oluşmuş tohumun embriyosundan gelişiyor. Hangisi doğrudur?",
    [
      "İkisi de zorunlu vejetatif yoldur",
      "İlkinde vejetatif üretim, ikincisinde eşeyli üreme geçmişi olan embriyo gelişimi vardır",
      "İlkinde mutlaka gamet birleşmesi olur",
      "Tohumu ekmek önceki döllenmeyi ortadan kaldırır",
      "Gövde boğumu mutlaka gamettir",
    ],
    1,
    "Somatik gövde ile döllenmiş embriyoyu ayır.",
    "Çileğin sürünücü gövdesi somatik dokudan yeni bitki oluşturduğu için vejetatif yoldur. İkinci örnekte embriyonun döllenmeyle oluştuğu açıkça verilmiştir; ekim bu geçmişi değiştirmez. Gövde boğumu gamet değildir ve ilk olaya yeni döllenme eklenemez.",
    "baslangic-yapisi",
  ),
  q(
    "f011-bio-b-asexual-8",
    "Bir mantar sporu başka gametle birleşmeden yeni koloni başlatıyor. Yalnız bu bilgiye göre hangi sonuç güvenlidir?",
    [
      "Spor kesin mitozla oluşmuştur",
      "Türün bütün yaşamında döllenme yoktur",
      "Bu spordan doğrudan gelişmede döllenme yoktur; sporun üretim bölünmesi için ek bilgi gerekir",
      "Bu yapı bakterinin endosporudur",
      "Yeni birey oluşumu kesin yoktur",
    ],
    2,
    "Sporun oluşumu ile spordan gelişme iki ayrı olaydır.",
    "Veri spordan doğrudan gelişmenin döllenmesiz olduğunu söyler. Sporun mitozla mı mayozla mı üretildiği veya türün diğer yaşam evrelerinde döllenme bulunup bulunmadığı belirtilmemiştir. Yeni koloni başlangıcı bakteri endosporundaki1→1 dayanıklılık dizisiyle aynı değildir.",
    "spor-yasam-dongusu",
  ),
  q(
    "f011-bio-b-asexual-9",
    "Mitoza dayalı eşeysiz çoğalan bir popülasyon için ‘kalıtsal farklılık hiçbir koşulda oluşamaz’ iddiasına hangi düzeltme uygundur?",
    [
      "Mitoz her olayda mutlaka yeni alel üretir",
      "Çevredeki her boy değişikliği DNA dizisi değişimidir",
      "Döllenme yoksa DNA bulunmaz",
      "Yeni mutasyonlar oluşabilir; klon benzerliği mutasyon yok varsayımıyla açıklanır",
      "Bütün yavrular her çevrede kesin aynı başarıyı gösterir",
    ],
    3,
    "Benzer kopyalanma beklentisini mutlak değişmezlikten ayır.",
    "Yeni mutasyon kalıtsal diziyi değiştirebilir; eşeysiz popülasyonda çeşitlilik olasılığı sıfır değildir. Ancak mitoz her defasında zorunlu yeni alel üretmez ve fenotipteki her çevre etkisi DNA değişimi değildir. Döllenmenin olmaması DNA yokluğu veya bütün ortamlarda aynı başarı anlamına gelmez.",
    "mutasyon-siniri",
  ),
  q(
    "f011-bio-b-asexual-10",
    "Yaşayan bir ana bitkiden dört çelik alınıyor; üçü tutuyor. Bu üç bitkinin ikisinden ikişer çelik daha alınıyor ve dördü de tutuyor. Önceki bitkiler yaşamaya devam ediyor. Ana bitki hariç toplam yavru sayısı kaçtır?",
    ["3", "4", "6", "8", "7"],
    4,
    "Başarısız ilk çeliği sayma; yaşayan önceki yavruları çıkarma.",
    "İlk aşamada yalnız üç yeni bitki oluşur. İkinci aşamada2×2=4 yeni bitki eklenir; donör üçü yaşamaya devam eder. Ana bitki hariç3+4=7 yavru vardır.4 yalnız ikinci aşamayı,8 tutmayan ilk çeliği de sayar. Çelik üretimi burada vejetatif yoldur.",
    "birey-sayimi",
  ),
];
const meiosisQuestions = [
  q(
    "f011-bio-b-meiosis-1",
    "Normal2n=8 hücrede DNA eşlenmesi tamamlandıktan sonra profaz I’de kaç tetrat ve toplam kaç kromatit bulunur?",
    [
      "4 tetrat ve16 kromatit",
      "8 tetrat ve8 kromatit",
      "4 tetrat ve8 kromatit",
      "16 tetrat ve16 kromatit",
      "2 tetrat ve4 kromatit",
    ],
    0,
    "Bir tetrat iki homolog ve dört kromatittir.",
    "Sekiz kromozom dört homolog çift oluşturur; her çift bir tetrat olduğundan dört tetrat vardır. Her eşlenmiş kromozom iki kardeşlidir:8×2=16 kromatit. Tetrat adedini kromozom adediyle eşitlemek veya eşlenmeyi yok saymak diğer sonuçları doğurur.",
    "tetrat-sayisi",
  ),
  q(
    "f011-bio-b-meiosis-2",
    "Normal mayozda anafaz I ile anafaz II’de ayrılan yapılar hangi sırayla verilmiştir?",
    [
      "Kardeşler; homologlar",
      "Homolog kromozomlar; kardeş kromatitler",
      "DNA bazları; homolog kromozomlar",
      "Çekirdekçikler; genler",
      "Her ikisinde yalnız tetratlar aynı kalır",
    ],
    1,
    "Birinci bölünmede X’in kardeşleri birlikte gidiyor mu?",
    "Anafaz I’de homologlar ayrılırken her kromozomun kardeşleri birlikte kalır. Anafaz II’de kardeş kromatitler ayrılıp bağımsız kromozom olarak kutuplara gider. İlk seçenek sırayı ters çevirir; baz, gen veya çekirdekçik ayrımı bu sayım olayının adı değildir.",
    "evre-ayrimi",
  ),
  q(
    "f011-bio-b-meiosis-3",
    "Başlangıcı2n=6 olan normal hücrenin sitokinez I’si tamamlandı. İlk ürünlerden birinde kromozom, DNA molekülü ve takım durumu nedir?",
    [
      "6 kromozom,12 DNA,2n",
      "3 kromozom,3 DNA,2n",
      "3 kromozom,6 DNA,n",
      "6 kromozom,6 DNA,n",
      "12 kromozom,12 DNA,4n",
    ],
    2,
    "Haploit olmak tek kromatitli olmak demek değildir.",
    "Mayoz I sonunda her ilk ürün bir homolog takım, yani n=3 kromozom taşır. Her kromozom hâlâ iki kardeşli olduğundan altı DNA molekülü vardır. İki bölünme arasında yeni eşlenme gerçekleşmez.3 DNA son ikinci ürünle,6 kromozom ise bütün ilk hücreyi veya geçici anafaz II sayımını karıştırır.",
    "ilk-urun-sayimi",
  ),
  q(
    "f011-bio-b-meiosis-4",
    "Normal2n=10 hücreden gelen bir mayoz I ürününün anafaz II’sinde sitoplazma henüz ayrılmamış. Bu tek hücrenin bütünü ve tek kutbu sırasıyla kaç kromozom taşır?",
    ["5 ve10", "10 ve10", "5 ve5", "10 ve5", "20 ve10"],
    3,
    "Kardeş ayrılması bütün hücrede anlık sayımı artırır, kutup bir takım alır.",
    "Mayoz I ürünü beş iki-kardeşli kromozom taşır. Anafaz II’de kardeşler ayrılınca henüz tek hücre olan bütün toplam on kromozom sayar; tek kutup beş alır. Bu diploit yavru oluştuğu anlamına gelmez. Yirmi yazmak fazladan bir eşlenme/ayrılma, beş toplam yazmak kutbu hücreyle karıştırmaktır.",
    "anafaz-ii-alani",
  ),
  q(
    "f011-bio-b-meiosis-5",
    "Krossing over için hangi ifade bilimsel olarak doğrudur?",
    [
      "Normalde farklı homolog çiftleri arasında olmak zorundadır",
      "Yalnız aynı kromozomun iki kardeşi arasında tanımlanır",
      "Her tek değişime tetrattaki dört kromatit mutlaka katılır",
      "DNA miktarını her seferinde iki katına çıkarır",
      "Homolog çiftin kardeş olmayan kromatitlerinin karşılıklı eş bölgeleri arasında olabilir",
    ],
    4,
    "Homolog eş ile kardeş kopyayı ayır.",
    "Krossing over homolog kromozomların kardeş olmayan kromatitleri arasındaki karşılıklı bölge değişimidir. Aynı kardeş çiftini veya farklı homolog çiftlerini normal tanım diye kullanmak yanlıştır. Tek bir değişim dört kromatidin tümünü zorunlu değiştirmez ve yeni bir DNA eşlenmesi gibi miktarı iki katına çıkarmaz.",
    "krossing-over-tanimi",
  ),
  q(
    "f011-bio-b-meiosis-6",
    "Bir tetratta homologlarAB,AB veab,ab kromatitlerini taşıyor. A-B arasında iki kardeş olmayan kromatitte tek karşılıklı değişim oluyor. Son dört kromatit işareti hangisidir?",
    ["AB,Ab,aB,ab", "AB,AB,AB,AB", "Ab,Ab,Ab,Ab", "AB,ab", "A,a,B,b"],
    0,
    "Katılan iki değişir; katılmayan iki başlangıç işaretini korur.",
    "KatılanAB veab kromatitleri iki işaret arasındaki ucu değiştirinceAb veaB olur. Diğer iki kardeşAB veab kalır; toplamAB,Ab,aB,ab bulunur. İki kromatide düşmek sayıyı kaybeder, bütününü tek bileşime dönüştürmek katılmayanları yok sayar. A,a,B,b ise tek kromatitteki iki işareti ayırır.",
    "parca-degisimi-urun",
  ),
  q(
    "f011-bio-b-meiosis-7",
    "A/a veB/b ayrı homolog çiftlerdedir; parça değişimi yok. Bir mayoz I kutbunaA ve b gidiyor. Normal bu tek mayozun dört son ürünündeki işaretler hangisidir?",
    [
      "AB,Ab,aB,ab olmak zorundadır",
      "Ab,Ab,aB,aB",
      "AB,AB,AB,AB",
      "A,A,b,b",
      "Ab,ab,ab,ab",
    ],
    1,
    "Karşı kutup tamamlayıcı homologları alır; mayoz II kopyaları ayırır.",
    "İlk kutupAb alırsa karşı kutup aB alır. Mayoz II’de her takımın kardeş kopyaları ayrıldığındanAb,Ab,aB,aB oluşur. Olası genel bileşim sayısı dört olsa da bu tek olayın dört farklı ürün vermesi gerekmez. Diğer seçenekler homolog paylaşımını veya iki işaretin aynı gamette birlikte oluşunu bozar.",
    "tek-olay-olasilik",
  ),
  q(
    "f011-bio-b-meiosis-8",
    "Parça değişimi dışlanmış, üç homolog çiftin bağımsız yöneldiği modelde çok sayıdaki mayozda olası homolog takım bileşimi kaçtır?",
    ["3", "6", "8", "4", "12"],
    2,
    "Her çift iki köken seçimi verir; bağımsız seçimleri çarp.",
    "Üç bağımsız homolog çift için2³=8 olası takım bileşimi vardır. Bu çok sayıdaki olası yönelimin kümesidir; tek mayozda sekiz hücre veya zorunlu sekiz farklı ürün oluştuğunu söylemez. Üçü doğrudan almak veya çiftleri toplamak bağımsız çarpma kuralını uygulamaz.",
    "bagimsiz-dagilim",
  ),
  q(
    "f011-bio-b-meiosis-9",
    "Aynı soy hattında hücre başına DNA8→16→8→4 birim değişiyor. ArtışS evresine, iki düşüş iki tamamlanmış normal bölünmeye ait; arada başka eşlenme yok. Hangi yorum uygundur?",
    [
      "İki ayrı mitozdan önce iki eşlenme kesin vardır",
      "DNA’nın yarısı zorunlu yok edilmiştir",
      "Mutlak kromozom sayısı kesin8’dir",
      "Standart diploit mayoz örüntüsüyle uyumludur; son ürün DNA’sıG₁’in yarısıdır",
      "Her son ürün diploit olmak zorundadır",
    ],
    3,
    "Kat desenini ölçülen DNA’ya uygula; sayıyı kromozoma çevirme.",
    "Bir eşlenme ve iki paylaşım2→4→2→1 C örüntüsüne uyar; son4 birim başlangıç8’in yarısıdır. Dört son ürünün toplamı16 olup S sonrası miktarı korur. İki mitoz arası yeni eşlenme gerekeceğinden verilen koşula uymaz. DNA biriminden mutlak kromozom adedi veya diploit son takım çıkarılamaz.",
    "dna-grafik",
  ),
  q(
    "f011-bio-b-meiosis-10",
    "Bitkilerde mayoz ve gamet oluşumu için hangi ifade temel yaşam döngüsü bilgisiyle uyumludur?",
    [
      "Mayoz bütün canlılarda doğrudan sperm yapar",
      "Haploit evrede mitoz mümkün değildir",
      "Spor her koşulda döllenmeyle oluşur",
      "Mayozdan önce DNA hiçbir zaman eşlenmez",
      "Mayoz haploit sporlar oluşturabilir; haploit evrede gametler mitozla üretilebilir",
    ],
    4,
    "Hayvan gamet modelini bütün yaşam döngülerine yayma.",
    "Bitkilerde mayoz haploit sporları oluşturabilir; bunların başlattığı haploit evrede gametler mitozla oluşabilir. Bu nedenle mayozun her canlıda doğrudan gamet yapması veya haploit hücrenin mitoz geçirememesi genellemeleri yanlıştır. Standart mayoz öncesinde bir DNA eşlenmesi vardır; spor oluşumu zorunlu döllenme değildir.",
    "yasam-dongusu",
  ),
];

export const forge011BiologyBGuides: LessonGuide[] = [
  invertebrateGuide,
  vertebrateGuide,
  mitosisGuide,
  asexualGuide,
  meiosisGuide,
];
export const forge011BiologyBTopics: Record<string, string> = {
  omurgasizlar: "detail-19",
  omurgalilar: "detail-20",
  mitoz: "detail-21",
  "eseysiz-ureme": "detail-22",
  mayoz: "detail-23",
};
const titles = [
  "Omurgasızlar: yapısal kanıttan gruba",
  "Omurgalılar: sistemleri karşılaştır",
  "Mitoz: kopyala, ayır ve say",
  "Eşeysiz üreme: yeni bireyin izini sür",
  "Mayoz: homologdan kardeşe iki bölünme",
];
const questionSets = [
  invertebrateQuestions,
  vertebrateQuestions,
  mitosisQuestions,
  asexualQuestions,
  meiosisQuestions,
];
export const forge011BiologyBLessons: Lesson[] = forge011BiologyBGuides.map(
  (guide, index) => ({
    id: guide.id,
    subjectId: "tyt-biyoloji",
    title: txt(titles[index]),
    minutes: guide.minutes,
    objectives: guide.objectives.map(txt),
    body: guide.sections.map((section) => ({
      title: txt(section.title),
      text: txt(section.paragraphs.join("\n\n")),
    })),
    questions: questionSets[index],
    source: txt(guide.source),
    tags: ["kaynakli", "etkilesimli", "forge011"],
  }),
);
