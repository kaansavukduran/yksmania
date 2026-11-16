import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";
function finite025(
  value: unknown,
  min: number,
  max: number,
): asserts value is number {
  if (
    typeof value !== "number" ||
    !Number.isFinite(value) ||
    value < min ||
    value > max
  )
    throw new RangeError("BIO025_NUMBER");
}
function integer025(
  value: unknown,
  min: number,
  max: number,
): asserts value is number {
  finite025(value, min, max);
  if (!Number.isSafeInteger(value)) throw new RangeError("BIO025_INTEGER");
}
function choice025(
  value: unknown,
  choices: readonly string[],
): asserts value is string {
  if (typeof value !== "string" || !choices.includes(value))
    throw new RangeError("BIO025_CHOICE");
}
export function seedLineage025(n: number, egg: string, sperm: string) {
  integer025(n, 1, 100);
  choice025(egg, ["A", "a"]);
  choice025(sperm, ["A", "a"]);
  const genotype = [egg, sperm].sort().join("");
  return {
    n,
    egg,
    sperm,
    embryo: { chromosomes: 2 * n, maternal: 1, paternal: 1, genotype },
    cotyledon: { chromosomes: 2 * n, genotype },
    endosperm: {
      chromosomes: 3 * n,
      maternal: 2,
      paternal: 1,
      genotype: egg + egg + sperm,
    },
    coat: { chromosomes: 2 * n, genotype: "Aa", maternal: 2, paternal: 0 },
    fruit: { chromosomes: 2 * n, genotype: "Aa" },
    assumption:
      "Tipik kapalı tohumlu, n gametler ve iki n polar çekirdek; anne ve baba Aa. Mitoz sonrası temel kromozom sayısı; özel DNA artışı yok. Kabuk ve meyve için genetik köken gösterilir.",
  };
}
export const germinationProfiles025 = {
  bean: {
    name: "Fasulye örneği",
    min: 8,
    optimum: 25,
    max: 38,
    light: "neutral",
    cotyledon: "toprak üstü",
  },
  maize: {
    name: "Mısır örneği",
    min: 10,
    optimum: 28,
    max: 42,
    light: "neutral",
    cotyledon: "toprak altı",
  },
  light: {
    name: "Işığa duyarlı tür örneği",
    min: 5,
    optimum: 20,
    max: 32,
    light: "required",
    cotyledon: "türe bağlı",
  },
} as const;
export function germination025(
  profile: string,
  temperature: number,
  water: number,
  oxygen: number,
  light: boolean,
  dormant: boolean,
  viable: boolean,
  day: number,
) {
  choice025(profile, Object.keys(germinationProfiles025));
  finite025(temperature, 0, 50);
  finite025(water, 0, 100);
  finite025(oxygen, 0, 100);
  integer025(day, 0, 14);
  if ([light, dormant, viable].some((x) => typeof x !== "boolean"))
    throw new RangeError("BIO025_BOOLEAN");
  const p =
    germinationProfiles025[profile as keyof typeof germinationProfiles025];
  const blockers: string[] = [];
  if (!viable) blockers.push("Canlı embriyo yok");
  if (dormant) blockers.push("Dormansi sürüyor");
  if (water < 30) blockers.push("Su erişimi yetersiz");
  if (oxygen < 20) blockers.push("Oksijen erişimi yetersiz");
  if (temperature <= p.min || temperature >= p.max)
    blockers.push("Sıcaklık etkin aralık dışında");
  if (p.light === "required" && !light) blockers.push("Bu profil ışık istiyor");
  const thermal = Math.max(
    0,
    temperature <= p.optimum
      ? (temperature - p.min) / (p.optimum - p.min)
      : (p.max - temperature) / (p.max - p.optimum),
  );
  const rate = blockers.length
      ? 0
      : thermal * Math.min(1, water / 60) * Math.min(1, oxygen / 60),
    progress = Math.min(1, (day * rate) / 7),
    root = progress > 0.15 ? (progress - 0.15) / 0.85 : 0,
    shoot = progress > 0.65 ? (progress - 0.65) / 0.35 : 0;
  return {
    profile,
    temperature,
    water,
    oxygen,
    light,
    dormant,
    viable,
    day,
    conditions: blockers.length === 0,
    blockers,
    thermal,
    rate,
    progress,
    root,
    shoot,
    cotyledon: p.cotyledon,
    stage:
      day === 0
        ? "Başlangıç"
        : !rate
          ? "Büyüme birikmiyor"
          : root === 0
            ? "Su alımı ve etkinleşme"
            : shoot === 0
              ? "Kök çıkışı"
              : "Kök ve sürgün gelişimi",
    assumption:
      "Sınırlar, su/O₂ endeks eşikleri ve üçgen sıcaklık yanıtı temsili sınıf modelidir; gerçek tür ölçümü veya kesin çimlenme yüzdesi değildir. Gün boyunca koşullar sabit; iz=min(1,gün×hız/7), kök izi 0,15; sürgün izi 0,65 üstünde başlar. Embriyo ölümü ve fotosentez hesabı yok.",
  };
}
export function reactionNorm025(temperature: number) {
  finite025(temperature, 10, 40);
  return {
    temperature,
    A: 90 - 2 * (temperature - 10),
    B: 30 + (temperature - 10),
    genotypeChanged: false,
    assumption:
      "Ortak koşullarda yetiştirilen iki klonal hat için temsili pigment birimi: A=90−2(T−10), B=30+(T−10). Genom sabit; doz/karakter ilişkisi gerçek türe ait değildir.",
  };
}
export function selection025(
  resistant: number,
  sensitive: number,
  dose: number,
  generations: number,
) {
  integer025(resistant, 0, 10000);
  integer025(sensitive, 0, 10000);
  finite025(dose, 0, 100);
  integer025(generations, 0, 12);
  if (resistant + sensitive === 0) throw new RangeError("BIO025_EMPTY");
  const neutralDose = -Math.log(0.8) / (1 / 20 - 1 / 150),
    survivalS = Math.exp(-dose / 20),
    survivalR = dose === neutralDose ? survivalS : 0.8 * Math.exp(-dose / 150),
    initialFrequency = resistant / (resistant + sensitive),
    trend =
      generations === 0 ||
      resistant === 0 ||
      sensitive === 0 ||
      dose === neutralDose
        ? "same"
        : dose > neutralDose
          ? "up"
          : "down",
    rows = [
      {
        generation: 0,
        R: resistant,
        S: sensitive,
        total: resistant + sensitive,
        frequency: resistant / (resistant + sensitive),
      },
    ];
  for (let i = 1; i <= generations; i++) {
    const last = rows.at(-1)!,
      R = last.R * survivalR * 2,
      S = last.S * survivalS * 2;
    rows.push({
      generation: i,
      R,
      S,
      total: R + S,
      frequency: dose === neutralDose ? initialFrequency : R / (R + S),
    });
  }
  return {
    resistant,
    sensitive,
    dose,
    generations,
    survivalR,
    survivalS,
    neutralDose,
    trend,
    rows,
    last: rows.at(-1)!,
    assumption:
      "Haploit iki kalıtsal soy; her kuşakta sağ kalan başına 2 yavru. R’de %20 maliyet; boyutsuz etki d için sR=0,8e^(−d/150), sS=e^(−d/20). Beklenen sayılar kesirli olabilir. Mutasyon, gen aktarımı, göç ve yoğunluk etkisi yok; bu bir tedavi dozu değildir.",
  };
}
export function mutation025(
  cells: number,
  exposure: number,
  site: string,
  route: string,
) {
  integer025(cells, 1, 1000000);
  finite025(exposure, 0, 100);
  choice025(site, ["skin", "gamete", "shoot"]);
  choice025(route, ["sexual", "vegetative"]);
  const probability = -Math.expm1(-exposure / 100),
    expected = cells * probability;
  if (site !== "shoot" && route === "vegetative")
    throw new RangeError("BIO025_ROUTE");
  const transmission =
    site === "gamete" && route === "sexual"
      ? "Mutant gamet döllenmeye katılırsa geçebilir"
      : site === "shoot" && route === "vegetative"
        ? "Mutant hücre soyu çeliğe katılırsa geçebilir"
        : site === "shoot" && route === "sexual"
          ? "Mutant sürgün soyu gamet verirse ve o gamet döllenirse geçebilir"
          : "Bu seçili üreme yoluyla aktarım gösterilmiyor";
  return {
    cells,
    exposure,
    site,
    route,
    probability,
    expected,
    transmission,
    conditional: (site === "gamete" && route === "sexual") || site === "shoot",
    assumption:
      "Boyutsuz etki için hücre başına en az bir işaretli DNA değişimi olasılığı p=1−e^(−d/100) varsayılır. Np beklenen hücre sayısıdır; gerçek mutajen riski, yararlı mutasyon ya da belirli gen hesabı değildir. Hücreler bağımsız; onarım/ölüm yok.",
  };
}
export const breedingLines025 = [
  { id: "K1", yield: 10, drought: 2 },
  { id: "K2", yield: 8, drought: 4 },
  { id: "K3", yield: 6, drought: 6 },
  { id: "K4", yield: 4, drought: 8 },
  { id: "K5", yield: 2, drought: 10 },
] as const;
export function breeding025(target: string, keep: number) {
  choice025(target, ["yield", "drought"]);
  integer025(keep, 1, 5);
  const key = target as "yield" | "drought",
    ranked = [...breedingLines025].sort((a, b) => b[key] - a[key]),
    selected = ranked.slice(0, keep);
  return {
    target,
    keep,
    selected,
    meanYield: selected.reduce((a, b) => a + b.yield, 0) / keep,
    meanDrought: selected.reduce((a, b) => a + b.drought, 0) / keep,
    representedLines: keep,
    newAlleles: 0,
    assumption:
      "Ortak çevrede ölçülmüş, kalıtsal farklılık taşıdığı ayrıca kabul edilen 5 saf hat; puanlar temsili. Seçim üreme katkısını sınırlar; yavru verimi garantisi veya yeni alel üretimi değildir.",
  };
}
export const biologyDefaults025 = {
  view: "lineage",
  n: 12,
  egg: "A",
  sperm: "a",
  profile: "bean",
  temperature: 25,
  water: 60,
  oxygen: 60,
  light: true,
  dormant: false,
  viable: true,
  day: 0,
  environmentView: "norm",
  normTemperature: 20,
  resistant: 100,
  sensitive: 900,
  dose: 20,
  generations: 0,
  cells: 1000,
  exposure: 0,
  site: "skin",
  route: "sexual",
  target: "yield",
  keep: 3,
  guess: "",
  reason: "",
  checked: false,
  show: false,
};
export function normalizeBiology025(saved: Record<string, unknown>) {
  const d = biologyDefaults025;
  const menu = (key: keyof typeof d, options: readonly string[]) =>
    typeof saved[key] === "string" && options.includes(saved[key] as string)
      ? (saved[key] as string)
      : (d[key] as string);
  const num = (key: keyof typeof d, min: number, max: number, int = false) =>
    typeof saved[key] === "number" && Number.isFinite(saved[key])
      ? Math.max(
          min,
          Math.min(
            max,
            int ? Math.trunc(saved[key] as number) : (saved[key] as number),
          ),
        )
      : (d[key] as number);
  const bool = (key: keyof typeof d) =>
    typeof saved[key] === "boolean"
      ? (saved[key] as boolean)
      : (d[key] as boolean);
  const r = {
    view: menu("view", ["lineage", "germination"]),
    n: num("n", 1, 100, true),
    egg: menu("egg", ["A", "a"]),
    sperm: menu("sperm", ["A", "a"]),
    profile: menu("profile", Object.keys(germinationProfiles025)),
    temperature: num("temperature", 0, 50),
    water: num("water", 0, 100),
    oxygen: num("oxygen", 0, 100),
    light: bool("light"),
    dormant: bool("dormant"),
    viable: bool("viable"),
    day: num("day", 0, 14, true),
    environmentView: menu("environmentView", [
      "norm",
      "selection",
      "mutation",
      "breeding",
    ]),
    normTemperature: num("normTemperature", 10, 40),
    resistant: num("resistant", 0, 10000, true),
    sensitive: num("sensitive", 0, 10000, true),
    dose: num("dose", 0, 100),
    generations: num("generations", 0, 12, true),
    cells: num("cells", 1, 1000000, true),
    exposure: num("exposure", 0, 100),
    site: menu("site", ["skin", "gamete", "shoot"]),
    route: menu("route", ["sexual", "vegetative"]),
    target: menu("target", ["yield", "drought"]),
    keep: num("keep", 1, 5, true),
    guess: typeof saved.guess === "string" ? saved.guess.slice(0, 128) : "",
    reason: typeof saved.reason === "string" ? saved.reason.slice(0, 128) : "",
    checked: saved.checked === true,
    show: saved.show === true,
  };
  if (r.resistant + r.sensitive === 0) r.sensitive = 1;
  if (r.site !== "shoot") r.route = "sexual";
  const corrected = Object.keys(r).some(
    (k) =>
      !["guess", "reason", "checked", "show"].includes(k) &&
      saved[k] !== r[k as keyof typeof r],
  );
  return corrected
    ? { ...r, guess: "", reason: "", checked: false, show: false }
    : r;
}
// AUTHORED_CONTENT_025
type Pack025 = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  sections: LessonGuide["sections"];
  examples: LessonGuide["examples"];
  recall: LessonGuide["recall"];
  source: string;
  items: {
    prompt: string;
    options: string[];
    answer: number;
    hint: string;
    explanation: string;
    guidance: NonNullable<Question["guidance"]>;
  }[];
};
const packs025: Pack025[] = [
  {
    id: "bitkilerde-dollenme-cimlenme",
    topic: "detail-356",
    title: "Bitkilerde Döllenme ve Çimlenme",
    minutes: 100,
    objectives: [
      "Çift döllenmede çekirdek, hücre, kromozom ve ebeveyn kökenini izlemek",
      "Embriyo, besi doku, çenek, kabuk ve meyve oluşumunu ayırmak",
      "Dormansi, çimlenme koşulları ve deney verilerinden sınırlı çıkarım yapmak",
    ],
    sections: [
      {
        title: "Başlamadan: yapı, hücre ve çekirdek",
        paragraphs: [
          "Kapalı tohumlu bitkinin büyük gövdesi ve çiçek dokuları sporofittir; olağan yaşam döngüsünde 2n kromozom taşır. Polen erkek gametofit, embriyo kesesi dişi gametofittir. Polen tanesi ile tek sperm hücresi aynı yapı değildir.",
          "Önkoşul mayozun kromozom takımlarını azaltması, mitozun temel takım sayısını koruması ve döllenmenin gamet çekirdeklerini birleştirmesidir. n takım sayısını, n=12 ise bir haploit çekirdekteki 12 kromozomu belirtir; hücre sayısı veya DNA kütlesi değildir.",
        ],
      },
      {
        title: "Tozlaşmadan embriyo kesesine",
        paragraphs: [
          "Tozlaşma polenin alıcı tepeciğe taşınmasıdır. Uyumlu ve canlı polenin vejetatif hücresi tüp geliştirir; tüp, dişicik borusundan tohum taslağına ilerleyerek spermlerin iletilmesine katılır. Polen tepecikte görülünce döllenmenin bittiği söylenemez.",
          "Sıklıkla tüp mikropilden girer ve spermler embriyo kesesine bırakılır. Sinerjitlerin yönlendirici işlevleri vardır. Tüpü büyüten hücreyi tüp çekirdeğinin kendisiyle karıştırma; çekirdek bir hücrenin organelidir.",
        ],
      },
      {
        title: "İki spermin oluşması",
        paragraphs: [
          "Generatif hücrenin mitozu iki haploit sperm verir. Bu olay bazı türlerde polen tüpü büyürken, bazılarında polen yayılmadan önce tamamlanır. Her örnekte spermlerin ilk kez mutlaka tüpte oluştuğu kabul edilmez.",
          "Aynı generatif hücrenin mitozuyla oluşan iki sperm, yeni mutasyon gibi ek olaylar dışarıda tutulduğunda aynı alelleri taşır. Bunlar farklı mayoz ürünleri değildir; aynı polendeki iki spermi bağımsız mayoz gametleri gibi sayma.",
        ],
      },
      {
        title: "Tipik embriyo kesesi: 7 hücre, 8 çekirdek",
        paragraphs: [
          "Yaygın monosporik örnekte bir işlevsel megaspor çekirdeği üç mitozla sekiz çekirdeğe ulaşır. Yumurta, iki sinerjit, üç antipod ve iki polar çekirdek taşıyan bir merkez hücre düzeni oluşur: toplam yedi hücre, sekiz çekirdek.",
          "Bu sayı, polar çekirdeklerin henüz birleşmediği tipik evre içindir. İki polar çekirdeğin aynı merkez hücrede bulunması, merkez hücrenin bulunmadığı anlamına gelmez. Tür ve gelişim evresi belirtilmeden bütün çiçeklilere tek hücre sayısı dayatılmaz.",
        ],
      },
      {
        title: "Birinci birleşme: embriyoyu başlatmak",
        paragraphs: [
          "Bir sperm çekirdeği n, yumurta çekirdeği n ile birleşerek 2n zigotu oluşturur. Zigot mitoz, büyüme ve farklılaşmayla embriyoyu verir. Embriyonik kök, sürgün ve çenekler bu yeni sporofitin parçalarıdır.",
          "Döllenme yeni genotip birleşimini kurar; embriyonun her hücresinde tekrar döllenme olmaz. Kromozom sayısı, mitozdaki geçici evreler veya endoreduplikasyon ayrıca sorulmadığında temel 2n olarak izlenir.",
        ],
      },
      {
        title: "İkinci birleşme: besi dokuyu başlatmak",
        paragraphs: [
          "Diğer sperm n, iki maternal polar çekirdeğin n+n katkısıyla birleşir. Tipik sonuç 3n birincil endosperm çekirdeğidir. Bunun gelişmesi besi dokuyu oluşturur; bu doku embriyonun gelişmesi için kaynak sağlar.",
          "Polar çekirdekler önceden birleşip 2n merkez çekirdeği oluşturmuşsa aynı hesap 2n+n=3n olarak yazılır. İki yolun yazımı farklı, toplam ebeveyn katkısı aynıdır: iki maternal, bir paternal takım.",
        ],
      },
      {
        title: "Çift döllenmede ne çift?",
        paragraphs: [
          "Aynı embriyo kesesinde iki sperm çekirdeğinin iki farklı hedefle birleşmesi çift döllenmedir. Birleşmelerden biri zigotu, diğeri endospermin başlangıcını verir; iki zigot veya iki embriyo zorunlu sonucu değildir.",
          "Tipik tamamlanmış olayda iki sperm, bir yumurta çekirdeği ve iki polar çekirdek katkı verir. Toplam katılan beş haploit çekirdek eşdeğerini, oluşan iki ürün çekirdeğinin sayısıyla karıştırma.",
        ],
      },
      {
        title: "Tek lokusta ebeveyn katkısı",
        paragraphs: [
          "Anne ve baba Aa, yumurta A, sperm a ise embriyo Aa olur. Aynı megaspordan mitozla oluşmuş iki polar çekirdek de A taşırsa endosperm AAa olur. Bu gösterim tek lokusun kopyalarını izler.",
          "Tohum kabuğu anne bitkinin örtülerinden gelir ve bu örnekte Aa’dır; yumurtanın A taşıması kabuğu AA yapmaz. Tek genli bu izleme modeli tüm görünür tohum özelliklerinin yalnız bir lokusla belirlendiği iddiası değildir.",
        ],
      },
      {
        title: "Tohum taslağından tohuma",
        paragraphs: [
          "Döllenme sonrası tipik gelişimde tohum taslağı tohum hâline gelir. Tohumda embriyo, koruyucu kabuk ve türe göre farklı düzenlenmiş besin kaynakları bulunur. Bir tohum taslağı, olağan modelde en fazla bir tohum verir.",
          "Bir yumurtalık çok sayıda tohum taslağı taşıyabilir. Bu nedenle tek meyve çok tohum içerebilir. Tozlaşma, döllenme ve olgunlaşma kayıpları verilmeden yalnız polen sayısından kesin olgun tohum sayısı çıkarılmaz.",
        ],
      },
      {
        title: "Kabuğun maternal kökeni",
        paragraphs: [
          "Tohum kabuğu, tohum taslağının örtülerinden gelişen anne kökenli sporofit dokudur. Genetik köken bakımından olağan 2n anne genotipini taşır. Olgun kabuğun birçok hücresi canlılığını yitirmiş olabilir; köken sayısı yaşam durumu demek değildir.",
          "Kabuk embriyo veya endospermden yapılmaz. Bir çaprazlamada embriyo iki ebeveynden katkı alırken kabuk anne dokusudur. Meyve duvarının kökeni de genellikle maternal yumurtalık duvarıdır.",
        ],
      },
      {
        title: "Çenek bir embriyo yaprağıdır",
        paragraphs: [
          "Çenekler embriyonun tohum yapraklarıdır; kökenleri zigottur ve tipik 2n takımı taşırlar. Tek çenekli örnekte bir, çift çenekli örnekte iki çenek bulunur. Çenek, embriyoyu dıştan saran kabukla aynı şey değildir.",
          "Mısırda belirgin endosperm olgun tohumda kalır; fasulyede gelişim sırasında besinlerin önemli bölümü çeneklerde depolanır. Besin aktarımı, endosperm hücrelerini çenek hücrelerine dönüştürmez; çenekler 3n olmaz.",
        ],
      },
      {
        title: "Depo maddesi ve canlılık",
        paragraphs: [
          "Tohumlar türe bağlı olarak nişasta, yağ ve protein depolar. Çimlenmedeki besin kaynağı olgun tohumun anatomisine göre endosperm veya depo çenekler olabilir. Her tohumun deposunun yalnız nişasta olduğu kabul edilmez.",
          "Canlı embriyo bulunması ve uygun gelişim programı gerekir. Besini olan fakat embriyosu ölmüş bir tohum, yalnız su eklenerek canlandırılamaz. Canlılık testi ile belirli süredeki çimlenme yüzdesi farklı ölçümlerdir.",
        ],
      },
      {
        title: "Meyve duvarı ve ek dokular",
        paragraphs: [
          "Tipik meyve gelişiminde yumurtalık duvarı perikarpa dönüşür; tohum taslakları tohumları verir. Bazı meyvelerde çiçek tablası gibi ek çiçek dokuları da yenilen yapıya katılır; elma ve çilekte bu katkı önemlidir.",
          "Meyve oluşumu genellikle döllenme sonrası hormonal süreçlerle bağlantılıdır, ancak partenokarpiyle döllenmesiz meyve gelişebilir. Bu yüzden meyve varlığı her zaman tohum veya tamamlanmış çift döllenme kanıtı değildir.",
        ],
      },
      {
        title: "Basit, küme ve bileşik meyve",
        paragraphs: [
          "Bir çiçeğin tek yumurtalığından gelişen kiraz gibi yapılar basit meyvedir. Bir çiçeğin birden fazla ayrı yumurtalığı böğürtlen gibi küme meyveyi oluşturabilir. Birçok çiçeğin yumurtalıkları birlikte geliştiğinde ananas veya dut gibi bileşik meyve oluşur.",
          "Bu ayrımın ölçütü çiçek ve yumurtalık sayısıdır; tek başına yenilen parçanın büyüklüğü veya tohum sayısı değildir. Çileğin toplu görünümü, çiçek tablasının büyümesi ve çok sayıdaki küçük meyvelerle birlikte değerlendirilir.",
        ],
      },
      {
        title: "Tohum ve meyvelerin yayılması",
        paragraphs: [
          "Rüzgârda taşınmayı kolaylaştıran kanatlar, hayvana tutunan kancalar ve suda taşınabilen yapılar yayılmaya katkı verir. Bazı meyvelerin açılması tohumları çevreye saçar; bazı hayvanların depoladığı tohumların bir kısmı çimlenir.",
          "Yayılma ana bireyden uzaklaşma ve yeni uygun alanlara erişme olasılığını etkiler; her uzağa taşınan tohumun yaşayacağı garantisi yoktur. Tohumun taşınması, polenin tepeciğe taşınması olan tozlaşmadan farklıdır.",
        ],
      },
      {
        title: "Dormansi ile dış koşul engelini ayırmak",
        paragraphs: [
          "Dormansi, canlı tohumun kendisine uygun dış koşullar sağlansa da iç veya kabuksal engeller nedeniyle hemen çimlenmemesidir. Su yokken çimlenmeyen, su verildiğinde hemen başlayan dormansisiz tohumda dış koşul engeli söz konusudur.",
          "Kabuk geçirimsizliği, embriyonun fizyolojik durumu ve hormon dengesi farklı dormansi nedenleridir. Soğukta bekletme, uygun ışık veya kabuk engelinin giderilmesi bazı türlerde etkili olabilir; her yöntem her türe gerekli değildir.",
        ],
      },
      {
        title: "Su alımı ve etkinleşme",
        paragraphs: [
          "Kuru tohum başlangıçta suyu bağlayan yapılarının şişmesiyle su alır; bu süreçte imbibisyon önemlidir. Hücrelerin hidratasyonu, enzim etkinleşmesi ve depo maddelerinin mobilizasyonu büyüyen embriyoya kaynak sağlar.",
          "Canlı kuru tohumda metabolizma genellikle çok düşüktür; tam sıfır olmak zorunda değildir. Bütün tohumlar için tek su yüzdesi eşiği yoktur. Bazı tohumlar kurumaya hassastır; her olgun tohum aynı uzun kuru bekleme evresinden geçmez.",
        ],
      },
      {
        title: "Suyun fazlası ve oksijen erişimi",
        paragraphs: [
          "Çimlenen embriyonun ATP gereksinimi büyük ölçüde depolanmış organik maddelerin solunumuyla karşılanır. Oksijen erişimi bu nedenle birçok türün çimlenmesini ve gelişmesini sınırlar. Oksijenli solunum kabuk çatlayıncaya kadar bütünüyle kapalı değildir.",
          "Suya doymuş bir ortam gazların iletimini azaltarak oksijen yetersizliğine yol açabilir. Bu, her suda her türün kesin öleceği anlamına gelmez; türler düşük oksijene farklı yanıtlar verir. Su ve oksijenin etkisini ayrı kontrol etmek gerekir.",
        ],
      },
      {
        title: "Sıcaklık aralığı ve hız",
        paragraphs: [
          "Çimlenme süreçleri sıcaklığa duyarlıdır; tür ve tohum partisine bağlı alt, uygun ve üst sıcaklık bölgeleri vardır. Belirli bir aralıkta sıcaklık artışı hızı artırabilir; daha da artması hızı düşürebilir veya zarar verebilir.",
          "Bütün bitkiler için uygun sıcaklık 25°C veya alt sınır 5°C değildir. Keşifte gösterilen sayılar temsili profillerin varsayımlarıdır. Bir türde bulunan optimumu doğrudan başka türe veya farklı gelişim evresine aktarma.",
        ],
      },
      {
        title: "Işık çimlenme ile fotosentezde aynı görevde değildir",
        paragraphs: [
          "Bazı tohumlar çimlenme için ışık sinyaline, bazıları karanlığa duyarlıdır; bazıları geniş ışık koşullarında çimlenir. Işığın bu sinyal görevi ilk evrede besin üretmesiyle özdeş değildir.",
          "Karanlıkta çimlenebilen fasulye tohumu depolarını kullanarak kök ve sürgün geliştirebilir. Daha sonra yeşil organlar fotosenteze katıldığında ışık beslenme için önem kazanır. Uzun süreli fide sağlığı, ilk kök çıkışıyla aynı ölçüt değildir.",
        ],
      },
      {
        title: "Hormon dengesi ve depo mobilizasyonu",
        paragraphs: [
          "Absisik asit tohum olgunlaşması ve dormansinin sürmesine; giberellinler uygun bağlamda çimlenmenin uyarılmasına katkı verir. Özellikle bazı tahıl örneklerinde hidrolitik enzim üretimi ve depo mobilizasyonu bu düzenlemeyle ilişkilidir.",
          "Tek hormon bütün fiziksel koşulların yerine geçmez. Ölü embriyoya veya oksijensiz uygun olmayan ortama hormon eklenmesi tek başına yeterli değildir. Hormon oranı ve dokunun duyarlılığı, yalnız hormonun adından daha açıklayıcı olabilir.",
        ],
      },
      {
        title: "İlk kök ve sonraki sürgün",
        paragraphs: [
          "Olağan örneklerde radikula yani embriyonik kök, kabuktan ilk çıkan yapıdır. Ardından sürgün ve yapraklar gelişir; meristem hücreleri mitoz, büyüme ve farklılaşmayla yeni dokulara katkı verir.",
          "Fasulyede çeneklerin toprak üstüne çıkması epigeal, bezelyede toprak altında kalması hipogeal çimlenmeye örnektir. Çenek sayısı tek başına bu konumu belirlemez. Tek veya çift çenekli olmayı kökün ilk çıkmasıyla karıştırma.",
        ],
      },
      {
        title: "Yaş kütle, kuru kütle ve kaynak akışı",
        paragraphs: [
          "Erken çimlenmede su alımı yaş kütleyi artırabilirken, depoların solunumda kullanılması bütün tohum/fidenin kuru organik kütlesini azaltabilir. Büyüyen embriyonun kütlesi artarken depo dokunun kütlesi azalabilir.",
          "Ölçülen parçayı ve dönemi belirt: yalnız embriyo ile bütün tohum aynı bilanço değildir. Yeşil organların fotosentezi başladığında net kuru kütle değişimi üretim ve solunumun toplamına bağlıdır; depoların son zerresinin tükenmesi beklenmez.",
        ],
      },
      {
        title: "Kontrollü çimlenme deneyi okumak",
        paragraphs: [
          "Aynı partiden rastgele dağıtılan yeterli sayıda tohum, eşit süre ve ortamda farklı tek etmenle karşılaştırılır. Çimlenme ölçütü örneğin kök ucunun görünmesi olarak önceden tanımlanır; çimlenen/tohum sayısı yüzdeyi verir.",
          "Tekrarlı kaplar, örnek sayısı ve canlılık farkları belirsizliği değerlendirir. Düşük çimlenme oranı tek başına tohumların tamamının ölü olduğunu kanıtlamaz. Keşifteki koşul kapıları ve büyüme izi bir öğretim modelidir; gerçek veri yerine deney sonucu diye sunulmaz.",
        ],
      },
    ],
    examples: [
      {
        title: "Ürünlerden ebeveyn kromozomlarına",
        prompt:
          "Bir deneyde embriyo çekirdeği 30, endosperm çekirdeği 50 kromozomlu ölçülüyor. İki polar çekirdeğin her biri yumurtayla aynı sayıda kromozom taşıyor; gametler ana hücrelerine göre indirgenmiş ve ek DNA çoğalması yok. Anne ve baba sporofitin kromozom sayılarını bulun. Yalnız çekirdek katkı hesabı soruluyor; yaşayan olgun tohum garantisi verilmemiştir.",
        strategy: "Yumurta m, sperm p ise iki ürün için iki denklem kur.",
        steps: [
          {
            label: "1. adım",
            explanation: "Embriyoda m+p=30, endospermde 2 m+p=50’dir.",
          },
          {
            label: "2. adım",
            explanation:
              "İkinci denklemden birincisini çıkarınca m=20; ardından p=10 bulunur.",
          },
          {
            label: "3. adım",
            explanation:
              "İndirgenmiş gamet varsayımıyla anne 40, baba 20 kromozomludur; iki ebeveynin başlangıç kromozom sayıları eşit değildir.",
          },
        ],
        answer: "Anne 40; baba 20 kromozom",
        check:
          "20+10=30 ve 2×20+10=50; tipik ortak n’li 2n/3n kısa yolu burada eşit ebeveyn varsayımına sahip değildir.",
        pitfall:
          "Ürün sayılarını aynı n’nin 2 ve 3 katı diye kabul edip verilmiş farklı toplamları zorlamak.",
      },
      {
        title: "Alel kopyalarından doku karışımına",
        prompt:
          "Anne AA, baba aa; tipik çift döllenme, iki maternal polar çekirdek ve mutasyonsuz gelişim kabul ediliyor. Yalnız embriyo ve endosperm hücrelerinden oluşan karışımda toplam 90 A,60 a lokus kopyası ölçülüyor. Her hücre DNA eşlenmesinden önceki G 1 evresinde; endoreduplikasyon ve kabuk bulaşı yok. Karışımda kaç embriyo, kaç endosperm hücresi vardır?",
        strategy:
          "Her doku hücresinin A/a kopyalarını say; iki bilinmeyen kur.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Bir embriyo hücresi Aa, bir endosperm hücresi AAa taşır.",
          },
          {
            label: "2. adım",
            explanation:
              "Embriyo hücresi E, besi doku hücresi D ise a sayımı E+D=60, A sayımı E+2 D=90 verir.",
          },
          {
            label: "3. adım",
            explanation: "Denklemlerin farkından D=30; E=30 hücre bulunur.",
          },
        ],
        answer: "30 embriyo ve 30 endosperm hücresi",
        check:
          "A:30+2×30=90; a:30+30=60.Kopya sayısı hücre adediyle aynı değildir.",
        pitfall:
          "Bütün hücrelerin iki alel kopyası taşıdığını varsaymak veya DNA evresi bilgisini atlamak.",
      },
      {
        title: "Meyve içindeki tohum potansiyeli",
        prompt:
          "Üç yumurtalığın her birinde 14 tohum taslağı vardır. Olağan eşeyli gelişimde toplam 30 taslakta çift döllenme tamamlanıyor; bunların %80’i olgun tohum veriyor. Olgun tohum sayısı ve ilk toplam taslağa oranı nedir?",
        strategy: "Ardışık paydaları karıştırmadan iki basamak hesapla.",
        steps: [
          {
            label: "1. adım",
            explanation: "İlk taslak sayısı 3×14=42’dir.",
          },
          {
            label: "2. adım",
            explanation: "Olgun tohum 30×0,80=24 olur.",
          },
          {
            label: "3. adım",
            explanation: "İlk 42 taslağa göre 24/42=4/7≈%57,1’dir.",
          },
        ],
        answer: "24 tohum; yaklaşık %57,1",
        check: "Olgun sayı 24≤döllenen 30≤taslak 42 sıralaması sağlanır.",
        pitfall: "%80’i ilk 42 taslağa uygulamak.",
      },
      {
        title: "Canlılık ile çimlenme farkı",
        prompt:
          "Aynı partiden 100 tohumun ayrı canlılık testinde 90’ı canlıdır. Uygun koşullardaki bir çimlenme kabında 100 tohumdan 72’si belirlenen sürede kök çıkarıyor. İki ölçüm neyi söyler?",
        strategy: "Paydaları ve testlerin hedeflerini ayrı tut.",
        steps: [
          {
            label: "1. adım",
            explanation: "Canlılık oranı %90, süreli çimlenme oranı %72’dir.",
          },
          {
            label: "2. adım",
            explanation:
              "İki test farklı alt örneklere ait olduğu için belirli 18 tohumun kimliği saptanamaz.",
          },
          {
            label: "3. adım",
            explanation:
              "Dormansi veya gecikme gibi etkenler farkla uyumludur; yalnız çimlenmeyenleri ölü sayamayız.",
          },
        ],
        answer:
          "Canlılık %90; zaman sınırlı çimlenme %72; neden için ek deney gerekir",
        check: "Aynı sayıdaki iki örneği aynı bireyler sanma.",
        pitfall: "Yüzde farkını tek nedenin kesin kanıtı saymak.",
      },
      {
        title: "İki etmenli deney",
        prompt:
          "Dormansisiz aynı tohum partisinde dört grup eşit tutuluyor: A su+/O₂+, B su−/O₂+, C su+/O₂−, D su−/O₂−. Yalnız A’da kök çıkışı gözleniyor. Deney neyi destekler?",
        strategy: "A’yı yalnız bir etmeni farklı gruplarla karşılaştır.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "A-B karşılaştırmasında oksijen sabitken su farklıdır.",
          },
          {
            label: "2. adım",
            explanation:
              "A-C karşılaştırmasında su sabitken oksijen farklıdır.",
          },
          {
            label: "3. adım",
            explanation:
              "Bu koşullarda su ve oksijenin birlikte yeterli olması büyümeyi desteklemiştir; tüm türler için evrensel eşik bulunmamıştır.",
          },
        ],
        answer: "Her iki etmenin etkisi ayrı karşılaştırmalarla desteklenir",
        check:
          "B-C hem su hem oksijende farklıdır; tek etmen karşılaştırması değildir.",
        pitfall: "B ve C’yi karşılaştırıp yalnız su etkisi demek.",
      },
      {
        title: "Kuru ve yaş kütle bilançosu",
        prompt:
          "Başlangıçta toplam kuru kütlesi 1,20 g ve suyu 0,10 g olan tohum grubunda, erken karanlık çimlenmede net kuru madde kaybı 0,18 g, tutulan su artışı 0,65 g ölçülüyor. Son kuru ve yaş kütle nedir?",
        strategy: "Kuru madde ve su defterlerini ayrı kapat.",
        steps: [
          {
            label: "1. adım",
            explanation: "Son kuru kütle 1,20−0,18=1,02 g’dir.",
          },
          {
            label: "2. adım",
            explanation: "Son su 0,10+0,65=0,75 g olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Son yaş kütle 1,02+0,75=1,77 g; başlangıç 1,30 g’a göre artmıştır.",
          },
        ],
        answer: "Kuru 1,02 g; yaş 1,77 g",
        check:
          "Yaş kütle artışı fotosentez kanıtı değildir; ölçülen suyu içerir.",
        pitfall: "Su girişini yeni organik madde sanmak.",
      },
      {
        title: "Aynı sıcakta farklı türler",
        prompt:
          "Varsayımsal X türünün çimlenme sıcaklık aralığı 10<T<30°C; Y’nin 20<T<40°C verilmiştir. Diğer bütün koşullar uygunken 15°C ve 35°C için karşılaştırma yap.",
        strategy: "Verilmiş açık aralıkları her sıcaklığa ayrı uygula.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "15°C yalnız X aralığındadır; X için uygun, Y için uygun değildir.",
          },
          {
            label: "2. adım",
            explanation:
              "35°C yalnız Y aralığındadır; Y için uygun, X için uygun değildir.",
          },
          {
            label: "3. adım",
            explanation:
              "Aralık bilgisi optimum hızı veya kesin çimlenen sayısını vermez.",
          },
        ],
        answer: "15°C: X;35°C: Y uygun",
        check: "Bu eşikler verilen kuramsal türlere özgüdür.",
        pitfall: "Bir türün aralığını bütün bitkilere taşımak.",
      },
      {
        title: "Meyve kökeninin iki ekseni",
        prompt:
          "P örneğinde bir çiçeğin çok sayıdaki ayrı yumurtalığı ve büyümüş çiçek tablası yenilen yapıya katılıyor. Q’da birçok çiçeğin yumurtalıkları birlikte gelişiyor. Oluşum bakımından karşılaştır.",
        strategy: "Çiçek sayısı ile ek doku katkısını ayrı eksenlerde incele.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "P tek çiçeğin ayrı yumurtalıklarını içerdiği için küme yapıya sahiptir.",
          },
          {
            label: "2. adım",
            explanation:
              "P’de çiçek tablası katkısı ayrıca aksesuar/yalancı doku özelliği verir.",
          },
          {
            label: "3. adım",
            explanation:
              "Q birden fazla çiçek kökenli olduğundan bileşik meyvedir.",
          },
        ],
        answer: "P aksesuar küme; Q bileşik",
        check: "Bir örneğin küme olması ek doku içermesini engellemez.",
        pitfall:
          "Küme ve aksesuar sınıflarını birbirini dışlayan aynı eksen sanmak.",
      },
    ],
    recall: [
      {
        prompt: "Çift döllenmenin iki çekirdek denklemini yaz.",
        answer:
          "Sperm n+yumurta n→zigot 2n; sperm n+polar n+n→endosperm başlangıcı 3n.",
      },
      {
        prompt: "Kabuk, çenek ve endospermin kökenleri nedir?",
        answer:
          "Kabuk maternal tohum taslağı örtüsü 2n; çenek zigottan gelişen embriyo 2n; endosperm tipik 2 maternal+1 paternal takım 3n.",
      },
      {
        prompt: "Tipik 7 hücre/8 çekirdek düzenindeki fark nereden gelir?",
        answer:
          "Merkez hücre iki polar çekirdek taşır; diğer altı hücre birer çekirdeklidir.",
      },
      {
        prompt: "Dormansiyi yalnız susuz beklemeden nasıl ayırırsın?",
        answer:
          "Dormant canlı tohum uygun dış koşullarda da iç/kabuksal engel yüzünden çimlenmeyebilir; yalnız dış su eksiği giderilince başlayan dormansisiz tohum farklıdır.",
      },
      {
        prompt:
          "Işık, ilk çimlenmede ve yeşil fidede hangi iki işleve sahip olabilir?",
        answer:
          "Bazı türlerde çimlenme sinyali; yeşil organlarda fotosentez için enerji kaynağı. İlk kök çıkışı her türde ışık istemez.",
      },
      {
        prompt: "Embriyo büyürken bütün kuru kütle neden azalabilir?",
        answer:
          "Depo organik maddesi aktarılır ve bir bölümü solunumla kaybedilir; embriyo tek parça, bütün tohum/fide daha geniş sistemdir.",
      },
      {
        prompt: "Epigeal/hipogeal ayrımı nedir?",
        answer:
          "Çeneklerin toprak üstüne çıkması/altında kalması; çenek sayısı tek başına bu konumu belirlemez.",
      },
      {
        prompt:
          "Olgun tohum sayısını yalnız tepecikteki polenden bulabilir misin?",
        answer:
          "Hayır; uyumluluk, tüp başarısı, çift döllenme ve olgunlaşma verileri ile taslak sayısı gerekir.",
      },
    ],
    items: [
      {
        prompt:
          "Tipik çift döllenme gösteren kapalı tohumluda ana bitki 2n=28’dir. İndirgenmiş gametler ve iki n polar çekirdek kabulüyle embriyo, endosperm ve tohum kabuğunun temel kromozom sayıları sırasıyla nedir?",
        options: ["14,28,42", "28,42,42", "28,42,28", "28,28,28", "42,28,14"],
        answer: 2,
        hint: "Önce n’yi bul; doku kökenlerine ayrı uygula.",
        explanation:
          "2n=28 ise n=14’tür. Embriyo 2×14=28, endosperm 3×14=42 kromozom taşır. Kabuk döllenme ürünü değil anne örtüsüdür;28 kromozom kökenlidir. 28=2n ve 42=3n ilişkisini kontrol et.",
        guidance: {
          knowledge: [
            "Embriyo 2n, endosperm 3n, kabuk maternal 2n kökenlidir.",
          ],
          strategy: "Önce n’yi bul; doku kökenlerine ayrı uygula.",
          steps: [
            "2n=28 ise n=14’tür.",
            "Embriyo 2×14=28, endosperm 3×14=42 kromozom taşır.",
            "Kabuk döllenme ürünü değil anne örtüsüdür;28 kromozom kökenlidir.",
          ],
          optionReasons: [
            "Gameti embriyo; embriyoyu endosperm; endospermi kabuk yerine koyar.",
            "Maternal kabuğu endospermden oluşmuş sanır.",
            "Doğru. Üç doku için ayrı köken hesabı korunur.",
            "İkinci birleşmenin üçüncü haploit katkısını saymaz.",
            "Zigot ve endosperm ürünlerini ters çevirip kabuğu gamet sayar.",
          ],
          commonError: "Tohumun bütün parçalarını aynı döllenme ürünü saymak.",
          check: "28=2n ve 42=3n ilişkisini kontrol et.",
        },
      },
      {
        prompt:
          "Anne Aa, baba Aa olan tipik kapalı tohumluda yumurta a ve aynı polendeki iki sperm A taşır. Aynı megaspordan gelişen iki polar çekirdek de a’dır. Tek lokusta endosperm genotipi hangisidir?",
        options: ["AAA", "aa", "Aa", "AAa", "aaA"],
        answer: 4,
        hint: "İki polar katkıyı sperm katkısına ekle.",
        explanation:
          "İki polar çekirdek a+a getirir. İkinci sperm A getirir. Toplam aaA üç kopyadır; embriyonun Aa’sından farklıdır. Üç kopyanın iki tanesi megaspor kökenlidir.",
        guidance: {
          knowledge: [
            "Tipik endosperm iki maternal ve bir paternal lokus kopyası alır.",
          ],
          strategy: "İki polar katkıyı sperm katkısına ekle.",
          steps: [
            "İki polar çekirdek a+a getirir.",
            "İkinci sperm A getirir.",
            "Toplam aaA üç kopyadır; embriyonun Aa’sından farklıdır.",
          ],
          optionReasons: [
            "Yumurta ve polar çekirdeklerin a katkısını siler.",
            "İkinci spermin A katkısını eksik bırakır.",
            "Zigotun iki kopyasını endosperm için kullanır.",
            "İki paternal ve bir maternal kopya yazar.",
            "Doğru. İki a maternal, bir A paternal kopyadır.",
          ],
          commonError: "Endospermde 2 baba+1 anne katkısı yazmak.",
          check: "Üç kopyanın iki tanesi megaspor kökenlidir.",
        },
      },
      {
        prompt:
          "Bir çaprazlamada anne tohum taslağı örtülerinin genotipi Bb, babanınki bb’dir. Yumurta b, sperm b taşıyor. Olağan tohum kabuğunun genetik kökeni için hangisi doğrudur?",
        options: [
          "b; gamet dokusu",
          "bb; zigot dokusu",
          "Bb; yalnız baba dokusu",
          "Bb; anne dokusu",
          "Bbb; endosperm dokusu",
        ],
        answer: 3,
        hint: "Gametin değil örtü dokusunun genotipini kullan.",
        explanation:
          "Embriyonun bb olması iki gametin birleşmesinden gelir. Kabuk ise annenin mevcut Bb örtü dokusudur. Bu nedenle kabuğun genetik kökeni Bb, maternaldir. Annenin örtü genotipi soruda Bb olarak verilmiştir.",
        guidance: {
          knowledge: ["Tohum kabuğu anne sporofitin örtüsünden gelişir."],
          strategy: "Gametin değil örtü dokusunun genotipini kullan.",
          steps: [
            "Embriyonun bb olması iki gametin birleşmesinden gelir.",
            "Kabuk ise annenin mevcut Bb örtü dokusudur.",
            "Bu nedenle kabuğun genetik kökeni Bb, maternaldir.",
          ],
          optionReasons: [
            "Örtü dokusunu haploit yumurtayla özdeşleştirir.",
            "Embriyo genotipini kabuğa taşır.",
            "Bb anne için verilmiştir; baba bb’dir.",
            "Doğru. Kabuğa babanın gamet aleli yeni bir takım olarak eklenmez.",
            "Maternal örtüyü üç kopyalı döllenme ürünü sanır.",
          ],
          commonError:
            "Yumurtanın aleli ile annenin bütün dokusunu aynı sanmak.",
          check: "Annenin örtü genotipi soruda Bb olarak verilmiştir.",
        },
      },
      {
        prompt:
          "Bir generatif hücrenin mitozuyla iki sperm oluşuyor; mutasyon ve kromozom ayrılma hatası yok. Bu iki sperm için en uygun yorum hangisidir?",
        options: [
          "İkisi de n ve aynı alelleri taşır.",
          "İkisi de mayozla oluşmuş farklı mikrosporlardır.",
          "İkisi de 3n endosperm hücresidir.",
          "Biri mutlaka yalnız anne, diğeri yalnız baba kromozomu taşır.",
          "Biri n, diğeri 2n olur.",
        ],
        answer: 0,
        hint: "Mayoz ürünü ile mitoz ürünü ayrımını kur.",
        explanation:
          "Başlangıç generatif hücresi haploittir. Mitoz kromozom takımını azaltmaz; iki sperm de n olur. Yeni değişim yokken aynı hücreden gelen spermler aynı alelleri taşır. Hedef farklılığı başlangıç sperm genotipinin farklı olmasını gerektirmez.",
        guidance: {
          knowledge: [
            "Mitoz mevcut kalıtsal yapıyı iki yavru çekirdeğe aktarır.",
          ],
          strategy: "Mayoz ürünü ile mitoz ürünü ayrımını kur.",
          steps: [
            "Başlangıç generatif hücresi haploittir.",
            "Mitoz kromozom takımını azaltmaz; iki sperm de n olur.",
            "Yeni değişim yokken aynı hücreden gelen spermler aynı alelleri taşır.",
          ],
          optionReasons: [
            "Doğru. Bir mitozun ürünleri ek değişim yokken eşdeğer kalıtsal katkı verir.",
            "Verilen generatif mitozu başka olayla değiştirir.",
            "Gameti döllenme sonrası dokuyla karıştırır.",
            "Haploit generatif hücrenin takımını iki ebeveyn kutusuna ayırmaz.",
            "Mitoza asimetrik takım artışı ekler.",
          ],
          commonError:
            "Spermlerin farklı hedeflere gitmesini farklı mayoz ürünleri sanmak.",
          check:
            "Hedef farklılığı başlangıç sperm genotipinin farklı olmasını gerektirmez.",
        },
      },
      {
        prompt:
          "Tipik bir megaspor ana hücresi 2n=24 kromozomla mayoza giriyor. Dört megaspordan biri işlevsel kalıp üç çekirdek mitozu geçiriyor. Polar çekirdekler birleşmeden önce oluşan sekiz çekirdeğin her birinin temel kromozom sayısı nedir?",
        options: ["24", "96", "3", "12", "48"],
        answer: 3,
        hint: "Önce mayoz ürününü bul, mitoz sayısını kromozomla çarpma.",
        explanation:
          "2n=24 ise her megaspor n=12’dir. Üç mitoz 1→2→4→8 çekirdek oluşturur. Çekirdek sayısı sekiz olsa da her çekirdek 12 kromozomludur. Sekiz çekirdeğin toplamı 96 olsa da istenen her bir çekirdektir.",
        guidance: {
          knowledge: [
            "Mayoz n’ye indirir; sonraki mitozlar temel takım sayısını korur.",
          ],
          strategy: "Önce mayoz ürününü bul, mitoz sayısını kromozomla çarpma.",
          steps: [
            "2n=24 ise her megaspor n=12’dir.",
            "Üç mitoz 1→2→4→8 çekirdek oluşturur.",
            "Çekirdek sayısı sekiz olsa da her çekirdek 12 kromozomludur.",
          ],
          optionReasons: [
            "Mayozun indirgenmesini yok sayar.",
            "Sekiz çekirdekteki toplamı tek çekirdeğe yazar.",
            "Üç mitozu kromozom sayısı sanır.",
            "Doğru. Hücre/çekirdek adediyle çekirdek başına kromozom ayrı niceliktir.",
            "Mitoz sayısını takım artışı sanır.",
          ],
          commonError: "Toplam çekirdek sayısını ploidi ile karıştırmak.",
          check:
            "Sekiz çekirdeğin toplamı 96 olsa da istenen her bir çekirdektir.",
        },
      },
      {
        prompt:
          "Tipik monosporik embriyo kesesinde bir yumurta, iki sinerjit, üç antipod ve iki polar çekirdekli bir merkez hücre var; polarlar henüz birleşmemiş. Hücre ve çekirdek sayısı sırasıyla nedir?",
        options: [
          "6 hücre,8 çekirdek",
          "7 hücre,7 çekirdek",
          "8 hücre,8 çekirdek",
          "8 hücre,7 çekirdek",
          "7 hücre,8 çekirdek",
        ],
        answer: 4,
        hint: "Merkez hücreyi tek hücre, iki çekirdek olarak say.",
        explanation:
          "Yumurta+sinerjit+antipod hücreleri 1+2+3=6’dır. Merkez hücre eklenince toplam 7 hücre olur. Altı tek çekirdeğe iki polar çekirdek eklenince 8 çekirdek bulunur. 1+2+3+1=7;1+2+3+2=8.",
        guidance: {
          knowledge: ["Bir hücre birden çok çekirdek taşıyabilir."],
          strategy: "Merkez hücreyi tek hücre, iki çekirdek olarak say.",
          steps: [
            "Yumurta+sinerjit+antipod hücreleri 1+2+3=6’dır.",
            "Merkez hücre eklenince toplam 7 hücre olur.",
            "Altı tek çekirdeğe iki polar çekirdek eklenince 8 çekirdek bulunur.",
          ],
          optionReasons: [
            "Merkez hücreyi hücre toplamından çıkarır.",
            "Henüz birleşmemiş polarları tek çekirdek sayar.",
            "İki polar çekirdeği iki ayrı hücre sayar.",
            "Hem hücre hem çekirdek sayımını ters kurar.",
            "Doğru. Merkez hücrenin iki çekirdeği hücre sayısını iki yapmaz.",
          ],
          commonError: "Çekirdek çevresindeki hücre sınırını göz ardı etmek.",
          check: "1+2+3+1=7;1+2+3+2=8.",
        },
      },
      {
        prompt:
          "Tipik kapalı tohumluda tamamlanan çift döllenmenin doğrudan iki başlangıç ürünü hangisidir?",
        options: [
          "İki 2n zigot",
          "İki n sperm ve bir n yumurta",
          "3n zigot ve 2n endosperm",
          "2n zigot ve 3n endosperm başlangıcı",
          "n embriyo ve 2n tohum kabuğu",
        ],
        answer: 3,
        hint: "Her birleşmenin hedefini ve ürününü eşleştir.",
        explanation:
          "Bir sperm yumurtayla birleşip 2n zigot verir. Diğer sperm iki polar çekirdekle birleşip 3n endosperm başlangıcını verir. İki olayın ürünü iki ayrı zigot değildir. Ürünlerin ebeveyn katkıları 1+1 ve 2+1’dir.",
        guidance: {
          knowledge: ["İki sperm farklı hedef çekirdeklerle birleşir."],
          strategy: "Her birleşmenin hedefini ve ürününü eşleştir.",
          steps: [
            "Bir sperm yumurtayla birleşip 2n zigot verir.",
            "Diğer sperm iki polar çekirdekle birleşip 3n endosperm başlangıcını verir.",
            "İki olayın ürünü iki ayrı zigot değildir.",
          ],
          optionReasons: [
            "İki spermi iki ayrı yumurtayla birleştirir.",
            "Bunlar başlangıç gametleridir; birleşme ürünleri değildir.",
            "Ürünlerin takım sayılarını ters çevirir.",
            "Doğru. İki farklı birleşme iki farklı gelişim hattını başlatır.",
            "Embriyoda sperm katkısını atar; kabuk döllenme ürünü değildir.",
          ],
          commonError: "Çift sözcüğünü iki embriyo diye okumak.",
          check: "Ürünlerin ebeveyn katkıları 1+1 ve 2+1’dir.",
        },
      },
      {
        prompt:
          "İki polar çekirdek sperm gelmeden önce birleşip 2n merkez çekirdeğini oluşturmuş. İkinci sperm n ise tipik endosperm başlangıcının ploidisi nedir?",
        options: ["n", "4n", "2n", "6n", "3n"],
        answer: 4,
        hint: "Merkez çekirdeği sperm takımıyla topla.",
        explanation:
          "Merkez çekirdeği 2n maternal katkıdır. Sperm bir n paternal takım getirir. 2n+n=3n endosperm başlangıcı oluşur. 2+1=3 takım.",
        guidance: {
          knowledge: [
            "Önceki polar birleşmesi toplam maternal katkıyı değiştirmez.",
          ],
          strategy: "Merkez çekirdeği sperm takımıyla topla.",
          steps: [
            "Merkez çekirdeği 2n maternal katkıdır.",
            "Sperm bir n paternal takım getirir.",
            "2n+n=3n endosperm başlangıcı oluşur.",
          ],
          optionReasons: [
            "Yalnız spermden gelen n’yi sayar; merkez çekirdeğinin 2n katkısını atlar.",
            "Spermi n yerine 2n kabul ederek 2n merkez çekirdeğine fazla takım ekler.",
            "İkinci sperm katkısını eklemez.",
            "Takım sayılarını toplamak yerine çarpar.",
            "Doğru. Önceden birleşme iki maternal takımı ortadan kaldırmaz.",
          ],
          commonError:
            "Polarların önceden birleşmesini fazladan bir döllenme saymak.",
          check: "2+1=3 takım.",
        },
      },
      {
        prompt:
          "Döllenmeyle oluşan 2n zigot büyüyüp embriyoya dönüşüyor. Mutasyon ve endoreduplikasyonun dışlandığı olağan gelişimde hangi olay bu gelişmenin temelidir?",
        options: [
          "Her embriyo hücresinde yeni spermle döllenmek",
          "Her hücrede mayozla n’ye inmek",
          "Mitoz, büyüme ve farklılaşma",
          "Endospermin 3n hücrelerinin kabuğa dönüşmesi",
          "Yalnız polenlerin tozlaşması",
        ],
        answer: 2,
        hint: "Yeni gamet üretimiyle embriyo gelişimini ayır.",
        explanation:
          "Zigot zaten iki gametin birleşme ürünüdür. Hücre sayısı mitozlarla artar; dokular farklılaşır. Embriyo oluşumu için her yeni hücrede tekrar mayoz veya döllenme gerekmez. Mitoz hücre adedini artırır; takım sayısını azaltmaz.",
        guidance: {
          knowledge: [
            "Embriyo yeni sporofittir; mitoz, büyüme ve farklılaşmayla gelişir.",
          ],
          strategy: "Yeni gamet üretimiyle embriyo gelişimini ayır.",
          steps: [
            "Zigot zaten iki gametin birleşme ürünüdür.",
            "Hücre sayısı mitozlarla artar; dokular farklılaşır.",
            "Embriyo oluşumu için her yeni hücrede tekrar mayoz veya döllenme gerekmez.",
          ],
          optionReasons: [
            "Döllenme başlangıcını bütün hücrelere tekrarlar.",
            "Embriyoyu haploit gamet oluşumuyla karıştırır.",
            "Doğru. Temel 2n takım gelişim boyunca korunur.",
            "Embriyonun zigot kökenini değiştirir.",
            "Önceki taşıma olayı embriyo dokusunun bölünmesi değildir.",
          ],
          commonError: "Üreme döngüsündeki bütün bölünmeleri mayoz saymak.",
          check: "Mitoz hücre adedini artırır; takım sayısını azaltmaz.",
        },
      },
      {
        prompt:
          "Olağan eşeyli kapalı tohumlu gelişiminde tohumun ve meyve duvarının kaynakları sırasıyla hangisidir?",
        options: [
          "Çanak yaprak; yumurta hücresi",
          "Tepecik; polen tüpü",
          "Yalnız sperm; yalnız endosperm",
          "Yumurtalık duvarı; zigot",
          "Tohum taslağı; yumurtalık duvarı",
        ],
        answer: 4,
        hint: "İki yapının gelişim sınırlarını eşleştir.",
        explanation:
          "Tohum taslağı embriyo ve ilgili tohum dokularını barındırır. Bu taslak olgun tohuma dönüşür. Yumurtalık duvarı ise meyve duvarının temel maternal kaynağıdır. Çok taslaklı bir yumurtalık tek meyvede çok tohum verebilir.",
        guidance: {
          knowledge: [
            "Tohum taslağı tohuma, yumurtalık duvarı perikarpa gelişir.",
          ],
          strategy: "İki yapının gelişim sınırlarını eşleştir.",
          steps: [
            "Tohum taslağı embriyo ve ilgili tohum dokularını barındırır.",
            "Bu taslak olgun tohuma dönüşür.",
            "Yumurtalık duvarı ise meyve duvarının temel maternal kaynağıdır.",
          ],
          optionReasons: [
            "Olağan tohum ve perikarp kaynakları bunlar değildir.",
            "Taşıma ve iletim yapılarını ürün dokularıyla karıştırır.",
            "Maternal ve embriyonik birçok katkıyı siler.",
            "Tohum ile meyve kökenlerini yanlış değiştirir.",
            "Doğru. Bir yumurtalık çok sayıda taslak taşıyabilir.",
          ],
          commonError: "Tohum taslağı ile bütün yumurtalığı aynı yapı saymak.",
          check: "Çok taslaklı bir yumurtalık tek meyvede çok tohum verebilir.",
        },
      },
      {
        prompt:
          "Bir çiçekte 32 tohum taslağı var. Olağan modelde 24’ünde çift döllenme tamamlanıyor; döllenenlerin%75’i olgun tohum oluyor. Kaç olgun tohum beklenir?",
        options: ["24", "8", "32", "18", "42"],
        answer: 3,
        hint: "Başarı basamağının paydasını doğru seç.",
        explanation:
          "%75’in paydası 24 döllenmiş taslaktır. 24×0,75=18 olgun tohum bulunur. 32 başlangıç taslak sayısı bir üst sınırdır; oran doğrudan buna uygulanmaz. Döllenmiş 24taslağın dörtte biri 6 kaybedilir;24−6=18.",
        guidance: {
          knowledge: [
            "Olgunlaşma oranı soruda belirtilen döllenmiş taslaklara uygulanır.",
          ],
          strategy: "Başarı basamağının paydasını doğru seç.",
          steps: [
            "%75’in paydası 24 döllenmiş taslaktır.",
            "24×0,75=18 olgun tohum bulunur.",
            "32 başlangıç taslak sayısı bir üst sınırdır; oran doğrudan buna uygulanmaz.",
          ],
          optionReasons: [
            "Döllenmiş 24taslağın%25olgunlaşma kaybını atlar.",
            "Yalnız döllenmeyen taslak sayısını verir.",
            "Her taslağın tohum olduğunu varsayar.",
            "Doğru. 18≤24≤32 sıralaması sağlanır.",
            "Olası 32 taslak üst sınırını aşar.",
          ],
          commonError: "Verilen oranı yanlış başlangıç kümesine uygulamak.",
          check: "Döllenmiş 24taslağın dörtte biri 6 kaybedilir;24−6=18.",
        },
      },
      {
        prompt:
          "Fasulyede olgun tohum gelişirken besinler endospermden çeneklere aktarılıyor. Endoreduplikasyon yoksa çenek için hangi yorum doğrudur?",
        options: [
          "Tohum kabuğunun ölü maternal uzantısıdır.",
          "Embriyo kökenli 2n yapı olarak kalır.",
          "Endosperm kökenli 3n olur.",
          "Üç polar çekirdekten oluşur.",
          "Yalnız baba kökenli n olur.",
        ],
        answer: 1,
        hint: "Madde aktarımıyla hücresel kökeni ayır.",
        explanation:
          "Çenekler zigottan gelişen embriyoya aittir. Olağan temel ploidileri 2n’dir. Endospermden besin almaları onları endosperm hücresi veya 3n yapmaz. Endospermde 3n; çenekte 2n ayrı kalır.",
        guidance: {
          knowledge: [
            "Çenek embriyonun parçasıdır; besin kaynağı doku kökenini değiştirmez.",
          ],
          strategy: "Madde aktarımıyla hücresel kökeni ayır.",
          steps: [
            "Çenekler zigottan gelişen embriyoya aittir.",
            "Olağan temel ploidileri 2n’dir.",
            "Endospermden besin almaları onları endosperm hücresi veya 3n yapmaz.",
          ],
          optionReasons: [
            "Çeneği koruyucu örtüyle karıştırır.",
            "Doğru. Aktarılan besinler ploidi aktarımı değildir.",
            "Besin aktarımını hücre soyunun değişmesi sayar.",
            "Tipik iki polar çekirdeği ve zigot kökenini değiştirir.",
            "Embriyodaki iki ebeveyn katkısını siler.",
          ],
          commonError:
            "Depo maddesinin geldiği yerle dokunun geldiği yeri karıştırmak.",
          check: "Endospermde 3n; çenekte 2n ayrı kalır.",
        },
      },
      {
        prompt:
          "Mısır ve fasulye için hangisi olgun tohumdaki besin depolama farkını doğru anlatır?",
        options: [
          "Fasulyede embriyo hiç bulunmaz.",
          "İkisinde de yalnız 3n çenek depo yapar.",
          "Besin aktarılınca fasulye iki ayrı zigot taşır.",
          "Mısır endospermi yalnız anne kabuğudur.",
          "Mısırda endosperm belirgindir; fasulyede depo çenekler önemlidir.",
        ],
        answer: 4,
        hint: "Besi doku ile embriyo yaprağını ayrı tanı.",
        explanation:
          "Mısırda belirgin endosperm olgun tohumda kalır. Fasulyede besinin önemli bölümü gelişim sırasında çeneklere taşınır. Bu fark çeneklerin embriyo kökenli olmasını değiştirmez. Depo yeri değişebilir; dokuların kökeni ayrı izlenir.",
        guidance: {
          knowledge: [
            "Tohum türüne göre besinin önemli deposu endosperm veya çenek olabilir.",
          ],
          strategy: "Besi doku ile embriyo yaprağını ayrı tanı.",
          steps: [
            "Mısırda belirgin endosperm olgun tohumda kalır.",
            "Fasulyede besinin önemli bölümü gelişim sırasında çeneklere taşınır.",
            "Bu fark çeneklerin embriyo kökenli olmasını değiştirmez.",
          ],
          optionReasons: [
            "Tohumun yeni bitkiyi oluşturacak embriyosunu yok sayar.",
            "Çenek ploidisini ve doku ayrımını bozar.",
            "Depo aktarımından yeni döllenme ürünü çıkarır.",
            "Döllenme ürünü 3n besi dokuyu maternal örtüyle karıştırır.",
            "Doğru. Her iki örnekte embriyo ve besin kaynağı ayrımı korunur.",
          ],
          commonError:
            "Bütün olgun tohumların aynı üçlü tabakayı aynı miktarda taşıdığını sanmak.",
          check: "Depo yeri değişebilir; dokuların kökeni ayrı izlenir.",
        },
      },
      {
        prompt:
          "Bir bitkide döllenme engellendiği hâlde hormon etkisiyle çekirdeksiz meyve gelişiyor. Bu gözlem hangi çıkarımı destekler?",
        options: [
          "Bütün tohum taslakları kesin 3n embriyo oluşturmuştur.",
          "Her bitkide her meyve döllenmesizdir.",
          "Tozlaşma ve çimlenme aynı olaydır.",
          "Meyve dokusu yalnız spermlerden yapılmıştır.",
          "Meyve gelişimi her durumda döllenme gerektirmez.",
        ],
        answer: 4,
        hint: "Gözlenen meyveyi ölçülmeyen tohumdan ayır.",
        explanation:
          "Deneyde döllenme engellendiği verilmiştir. Buna karşın meyve gelişmiştir. Meyve varlığının tek başına tamamlanmış döllenme kanıtı olmadığı anlaşılır. Bir karşı örnek evrensel zorunluluk iddiasını sınırlar.",
        guidance: {
          knowledge: ["Partenokarpide döllenmesiz meyve gelişimi olabilir."],
          strategy: "Gözlenen meyveyi ölçülmeyen tohumdan ayır.",
          steps: [
            "Deneyde döllenme engellendiği verilmiştir.",
            "Buna karşın meyve gelişmiştir.",
            "Meyve varlığının tek başına tamamlanmış döllenme kanıtı olmadığı anlaşılır.",
          ],
          optionReasons: [
            "Meyveden tohum ve yanlış embriyo ploidisi çıkarır.",
            "Tek örneği bütün bitkilere geneller.",
            "Üç farklı gelişim basamağını özdeşleştirir.",
            "Maternal yumurtalık kökenini yok sayar.",
            "Doğru. Bu deney tohum gelişimi veya embriyo genotipi hakkında veri vermiyor.",
          ],
          commonError:
            "Meyve görülmesini her taslakta çift döllenme garantisi saymak.",
          check: "Bir karşı örnek evrensel zorunluluk iddiasını sınırlar.",
        },
      },
      {
        prompt:
          "P bir çiçeğin ayrı yumurtalıklarından, Q birçok çiçeğin yumurtalıklarının birlikte gelişmesinden oluşuyor. Meyve oluşum tipleri sırasıyla hangisidir?",
        options: [
          "Basit; küme",
          "İkisi de yalnız tohum kabuğu",
          "İkisi de yalnız basit",
          "Küme; bileşik",
          "Bileşik; basit",
        ],
        answer: 3,
        hint: "Bir çiçek/çok çiçek sınırını kullan.",
        explanation:
          "P’de tek çiçek fakat birden fazla ayrı yumurtalık vardır. Bu yapı küme meyveye uyar. Q’daki çok çiçek kökeni bileşik meyveye uyar. Kümede bir, bileşikte birden fazla çiçek katkısı vardır.",
        guidance: {
          knowledge: ["Küme ve bileşik ayrımı çiçek kökeni sayısına dayanır."],
          strategy: "Bir çiçek/çok çiçek sınırını kullan.",
          steps: [
            "P’de tek çiçek fakat birden fazla ayrı yumurtalık vardır.",
            "Bu yapı küme meyveye uyar.",
            "Q’daki çok çiçek kökeni bileşik meyveye uyar.",
          ],
          optionReasons: [
            "P’nin ayrı yumurtalıklarını veQ’nun çok çiçeğini atlar.",
            "Meyveyi tohumun koruyucu dokusuyla karıştırır.",
            "İki örnekte de verilen çoklu kaynakları yok sayar.",
            "Doğru. Tohum sayısı bu iki kökeni tek başına belirlemez.",
            "Bir ve çok çiçek kökenini ters yazar.",
          ],
          commonError:
            "Dış görünüşte birleşik olmayı aynı köken sınıfı sanmak.",
          check: "Kümede bir, bileşikte birden fazla çiçek katkısı vardır.",
        },
      },
      {
        prompt:
          "Kancalı bir meyve hayvan kürküne tutunarak başka bölgeye taşınıyor. Bu olayın doğrudan adı hangisidir?",
        options: [
          "Meyve/tohum yayılması",
          "Çift döllenme",
          "Kesin yeni fidan oluşumu",
          "Endosperm mitozu",
          "Tepecikte tozlaşma",
        ],
        answer: 0,
        hint: "Taşınan yapıyı belirle.",
        explanation:
          "Taşınan yapı polen değil meyvedir. Hayvan kürkü bir yayılma aracıdır. Olay doğrudan meyve/tohum yayılması olarak sınıflanır. Olay adı taşınan yapının kimliğini içermelidir.",
        guidance: {
          knowledge: ["Meyve/tohum yayılması ile polen taşınması farklıdır."],
          strategy: "Taşınan yapıyı belirle.",
          steps: [
            "Taşınan yapı polen değil meyvedir.",
            "Hayvan kürkü bir yayılma aracıdır.",
            "Olay doğrudan meyve/tohum yayılması olarak sınıflanır.",
          ],
          optionReasons: [
            "Doğru. Yeni bölgedeki çimlenme veya döllenme henüz gözlenmemiştir.",
            "Gamet çekirdeği birleşmesi verilmemiştir.",
            "Taşınmayı sonraki başarılı yerleşmeyle eşitler.",
            "Bir doku bölünmesi yerine yer değiştirme gözlenmiştir.",
            "Soruda polen veya tepecik aktarımı yoktur.",
          ],
          commonError:
            "Taşıma aracının hayvan olmasıyla her olayı tozlaşma saymak.",
          check: "Olay adı taşınan yapının kimliğini içermelidir.",
        },
      },
      {
        prompt:
          "CanlıX tohumu su, oksijen ve türüne uygun sıcaklıkta çimlenmiyor; uygun soğuk ön işlemden sonra aynı koşullarda çimleniyor. En güçlü yorum hangisidir?",
        options: [
          "Soğuk işlem yeni çift döllenme oluşturmuştur.",
          "Ön işlemle giderilebilen dormansiyle uyumludur.",
          "İlk su yokluğu tek nedendir.",
          "Bütün türler soğuk istemek zorundadır.",
          "X başlangıçta kesin ölüydü.",
        ],
        answer: 1,
        hint: "Dış koşullar sabitken ön işlemin etkisini değerlendir.",
        explanation:
          "İlk aşamada dış çimlenme koşulları uygun verilmiştir. Soğuk ön işlem sonrasında büyüme başlamıştır. Ön işlemin giderdiği bir dormansi engeliyle uyumludur; bu yöntem her tür için zorunlu değildir. Aynı dış koşullarda ön işlem farkı gözleniyor.",
        guidance: {
          knowledge: [
            "Dormansi uygun dış koşullarda süren iç engel içerebilir.",
          ],
          strategy: "Dış koşullar sabitken ön işlemin etkisini değerlendir.",
          steps: [
            "İlk aşamada dış çimlenme koşulları uygun verilmiştir.",
            "Soğuk ön işlem sonrasında büyüme başlamıştır.",
            "Ön işlemin giderdiği bir dormansi engeliyle uyumludur; bu yöntem her tür için zorunlu değildir.",
          ],
          optionReasons: [
            "Olgun tohumun ön işlemine gamet birleşmesi ekler.",
            "Doğru. Ölümden canlılığa dönüşüm iddiası gerekmez.",
            "Soruda suyun uygun olduğu açıkça verilmiştir.",
            "TekXörneğini tüm tohumlara geneller.",
            "Sonraki çimlenme canlılıkla uyumludur; ölü embriyo canlandırma gösterilmemiştir.",
          ],
          commonError: "Dormansiyi yalnız ortamda su olmaması sanmak.",
          check: "Aynı dış koşullarda ön işlem farkı gözleniyor.",
        },
      },
      {
        prompt:
          "Dormansisiz canlı tohumlar kuru kapta kök çıkarmıyor; yalnız su eklenince uygun sıcaklık ve oksijende başlıyor. Bu deneyin en doğrudan sonucu nedir?",
        options: [
          "Oksijen çimlenme için hiçbir türde etkili değildir.",
          "Başlangıçta dış su yetersizliği çimlenmeyi sınırlamıştır.",
          "Su fotosentezle nişasta üretip döllenmeyi başlatmıştır.",
          "Su yeni embriyo üretmiştir.",
          "Bütün tohumlar mutlak dormansidedir.",
        ],
        answer: 1,
        hint: "Giderilen tek engeli izle.",
        explanation:
          "Tohumların dormansisiz ve canlı olduğu verilmiştir. Su eklenmesi sonrasında büyüme başlamıştır. Başlangıç engeli dış su yetersizliğidir; bu gözlem dormansi kanıtı değildir. Eklenen su dış koşulu değiştirmiştir.",
        guidance: {
          knowledge: [
            "Dış su eksiği ile tohum içi dormansi farklı engellerdir.",
          ],
          strategy: "Giderilen tek engeli izle.",
          steps: [
            "Tohumların dormansisiz ve canlı olduğu verilmiştir.",
            "Su eklenmesi sonrasında büyüme başlamıştır.",
            "Başlangıç engeli dış su yetersizliğidir; bu gözlem dormansi kanıtı değildir.",
          ],
          optionReasons: [
            "Sabit tutulan etmenin evrensel önemsizliği çıkarılamaz.",
            "Doğru. Oksijen ve sıcaklık zaten uygundur.",
            "Çimlenmenin erken depo kullanımını ve olay sırasını bozar.",
            "Embriyo önceden canlı olarak bulunur.",
            "Sorudaki dormansisiz bilgisini reddeder.",
          ],
          commonError: "Çimlenmeyen her tohumu dormant adlandırmak.",
          check: "Eklenen su dış koşulu değiştirmiştir.",
        },
      },
      {
        prompt:
          "Bir partiden seçilen 50 tohumun 35’i eşit sürede kök çıkarıyor. Çimlenmeyen 15 tohum için başka test yok. Hangi yorum savunulur?",
        options: [
          "Çimlenme%85’tir.",
          "Her tohum aynı gün mutlaka çimlenmelidir.",
          "Çimlenme%70; çimlenmeyenlerin nedeni belirsizdir.",
          "Çimlenme%30 ve kalanlar kesin canlıdır.",
          "Çimlenmeyen 15’in tamamı kesin ölüdür.",
        ],
        answer: 2,
        hint: "Gözlenen oranı hesapla; belirlenmeyen nedeni kesinleştirme.",
        explanation:
          "Çimlenme oranı 35/50×100=%70’tir. 15 tohum belirli sürede kök çıkarmamıştır. Bunların hepsinin ölü olduğu veya hepsinin dormant olduğu tek başına bilinmez. 35+15=50 toplamı korunur.",
        guidance: {
          knowledge: [
            "Süreli çimlenme oranı canlılığın bütün nedenlerini açıklamaz.",
          ],
          strategy:
            "Gözlenen oranı hesapla; belirlenmeyen nedeni kesinleştirme.",
          steps: [
            "Çimlenme oranı 35/50×100=%70’tir.",
            "15 tohum belirli sürede kök çıkarmamıştır.",
            "Bunların hepsinin ölü olduğu veya hepsinin dormant olduğu tek başına bilinmez.",
          ],
          optionReasons: [
            "35/50=%70oranı, verilen%85seçeneğiyle uyuşmaz.",
            "Tür ve bireyler arası gelişim farklarını yok sayar.",
            "Doğru. Canlılık ve dormansi için ek ölçüm gerekir.",
            "Payı ters kurup canlılık sonucu uydurur.",
            "Başarısızlığı tek olası nedene indirger.",
          ],
          commonError: "Tek süreli ölçümü bütün canlılık bilgisi sanmak.",
          check: "35+15=50 toplamı korunur.",
        },
      },
      {
        prompt:
          "A veB’de aynı canlı, dormansisiz tohum partisi ve sıcaklık kullanılıyor. A’da su ve oksijen yeterli, B’de su yeterli fakat oksijen düşük. A daha çok kök çıkarıyor. Tek etmen karşılaştırması hangi etkiyi sınar?",
        options: [
          "Çift döllenmenin gerçekleşmesini",
          "Oksijen erişiminin etkisini",
          "Bütün türlerin aynı optimum sıcaklığını",
          "Yalnız su miktarını",
          "Anne genotipini",
        ],
        answer: 1,
        hint: "İki grubun tek farkını yaz.",
        explanation:
          "İki kapta su, sıcaklık ve başlangıç partisi aynıdır. Değiştirilen etmen oksijen erişimidir. Sonuç bu koşullarda oksijen etkisiyle uyumludur. İki grup arasındaki tek tanımlı fark oksijendir.",
        guidance: {
          knowledge: ["Diğer koşullar sabitken değişen etmen sınanır."],
          strategy: "İki grubun tek farkını yaz.",
          steps: [
            "İki kapta su, sıcaklık ve başlangıç partisi aynıdır.",
            "Değiştirilen etmen oksijen erişimidir.",
            "Sonuç bu koşullarda oksijen etkisiyle uyumludur.",
          ],
          optionReasons: [
            "Deney olgun tohumun çimlenmesindedir.",
            "Doğru. Su farkı verilmediği için sonuç suya bağlanamaz.",
            "Yalnız bir partide oksijen değişmiştir.",
            "Her iki kapta su yeterli ve eşit tutulmuştur.",
            "Aynı parti kullanılmış; genotip değişkeni tanımlanmamıştır.",
          ],
          commonError: "Deneyin sabit tutulan etmenini neden ilan etmek.",
          check: "İki grup arasındaki tek tanımlı fark oksijendir.",
        },
      },
      {
        prompt:
          "Varsayımsal bir tohum partisinde diğer koşullar sabitken 10°C’de%20,20°C’de%80,30°C’de%45 çimlenme ölçülüyor. Yalnız bu verilerle hangisi söylenebilir?",
        options: [
          "Bütün bitkilerin kesin optimumu 20°C’dir.",
          "Ölçülen üç sıcaklıkta en yüksek oran 20°C’dedir.",
          "Sıcaklık arttıkça oran sürekli artar.",
          "Oksijen oranı üç kat artmıştır.",
          "10°C’de hiç canlı tohum yoktur.",
        ],
        answer: 1,
        hint: "Üç ölçümü karşılaştır; gözlenmeyen sıcaklığı ekleme.",
        explanation:
          "Ölçülen üç değer arasında en yüksek oran 20°C’de%80’dir. 30°C’de oran daha düşük olduğundan artış tek yönlü değildir. Kesin optimumun tam 20°C olduğu veya tüm türlerde aynı olduğu kanıtlanmaz. %80>%45>%20 yalnız ölçülen noktaları sıralar.",
        guidance: {
          knowledge: [
            "Ölçülen aralıkta en yüksek başarı ile evrensel optimum farklıdır.",
          ],
          strategy: "Üç ölçümü karşılaştır; gözlenmeyen sıcaklığı ekleme.",
          steps: [
            "Ölçülen üç değer arasında en yüksek oran 20°C’de%80’dir.",
            "30°C’de oran daha düşük olduğundan artış tek yönlü değildir.",
            "Kesin optimumun tam 20°C olduğu veya tüm türlerde aynı olduğu kanıtlanmaz.",
          ],
          optionReasons: [
            "Tek partiyi bütün türlere ve kesin tepeye geneller.",
            "Doğru. 15 ve 25°C ölçülmemiştir.",
            "20→30°C geçişindeki düşüşe aykırıdır.",
            "Oksijen değişimi verilmemiştir.",
            "%20çimlenme bunun tersini gösterir.",
          ],
          commonError:
            "Ölçülmüş en yükseği kesintisiz eğrinin kesin tepe noktası saymak.",
          check: "%80>%45>%20 yalnız ölçülen noktaları sıralar.",
        },
      },
      {
        prompt:
          "Işığa çimlenme sinyali bakımından duyarsız, canlı ve dormansisiz fasulye tohumları karanlıkta su, oksijen ve uygun sıcaklıkta kök çıkarıyor. İlk büyümenin organik maddesi nereden gelir?",
        options: [
          "Havadan hazır ATP emilmesinden",
          "Karanlıkta yeni fotosentezden",
          "Tohumda önceden depolanmış organik maddelerden",
          "Her kökün yaptığı çift döllenmeden",
          "Tohum kabuğunun yeni mayozundan",
        ],
        answer: 2,
        hint: "Işık yokluğu ile depo kaynağını birlikte kullan.",
        explanation:
          "Başlangıç büyümesi karanlıkta gerçekleşmektedir. Tohumun çeneklerindeki depolar büyüyen embriyoya kaynak verir. Kök çıkışı, aynı anda fotosentez yapılmasını gerektirmez. Karanlık ilk büyümesi mevcut depoyla açıklanır.",
        guidance: {
          knowledge: [
            "Erken çimlenmede depo organik maddeler mobilize edilebilir.",
          ],
          strategy: "Işık yokluğu ile depo kaynağını birlikte kullan.",
          steps: [
            "Başlangıç büyümesi karanlıkta gerçekleşmektedir.",
            "Tohumun çeneklerindeki depolar büyüyen embriyoya kaynak verir.",
            "Kök çıkışı, aynı anda fotosentez yapılmasını gerektirmez.",
          ],
          optionReasons: [
            "ATP havadan besin olarak alınmaz; hücre içinde sentezlenir.",
            "Soruda ışık yoktur; depo kaynağı göz ardı edilir.",
            "Doğru. Bu, fidenin ışık olmadan süresiz sağlıklı yaşayacağını göstermez.",
            "Kök büyümesi yeni gamet birleşmesi değildir.",
            "Mayoz organik besin üretim yolu değildir.",
          ],
          commonError:
            "İlk çimlenme ile sonraki fotosentetik beslenmeyi tek olay sanmak.",
          check: "Karanlık ilk büyümesi mevcut depoyla açıklanır.",
        },
      },
      {
        prompt:
          "Uygun su, oksijen ve sıcaklıktaki canlı tahıl tohumlarına giberellin uygulanınca depo mobilizasyonu ve çimlenme artıyor. Bu sonucun doğru sınırı hangisidir?",
        options: [
          "Suya hiçbir tohumun ihtiyacı yoktur.",
          "Giberellin bütün 3n endospermi n gamete çevirir.",
          "Giberellin bu koşullarda çimlenmeyi uyarabilir.",
          "Giberellin ölü embriyoyu kesin canlandırır.",
          "Absisik asit ve giberellin her dokuda aynı işi yapar.",
        ],
        answer: 2,
        hint: "Gözlenen artışı koşulları silmeden ifade et.",
        explanation:
          "Deneyde canlılık ve temel çevre koşulları uygundur. Uygulama bu bağlamda mobilizasyonu ve çimlenmeyi artırmıştır. Hormonun bütün türlerde su veya oksijenin yerine geçtiği sonucu çıkmaz. Koşul ve gözlenen etki birlikte okunmalı.",
        guidance: {
          knowledge: [
            "Hormon etkisi uygun doku ve çevre koşullarıyla birlikte yorumlanır.",
          ],
          strategy: "Gözlenen artışı koşulları silmeden ifade et.",
          steps: [
            "Deneyde canlılık ve temel çevre koşulları uygundur.",
            "Uygulama bu bağlamda mobilizasyonu ve çimlenmeyi artırmıştır.",
            "Hormonun bütün türlerde su veya oksijenin yerine geçtiği sonucu çıkmaz.",
          ],
          optionReasons: [
            "Su koşulu zaten uygun olarak verilmiştir.",
            "Hormon etkisini takım indirgenmesi sanır.",
            "Doğru. Etkinin gösterildiği koşullar sonuca dâhildir.",
            "Ölü embriyo deneyi yapılmamıştır.",
            "Bu deney aynı etki genellemesini göstermez.",
          ],
          commonError:
            "Bir düzenleyiciyi bütün fiziksel gereksinimlerin yerine koymak.",
          check: "Koşul ve gözlenen etki birlikte okunmalı.",
        },
      },
      {
        prompt:
          "Olağan fasulye çimlenmesinde kabuktan ilk çıkan embriyonik yapı hangisidir?",
        options: [
          "Mayozla oluşmuş yeni sperm",
          "Embriyonik kök(radikula)",
          "Polen tüpü",
          "Tohum kabuğunun 3n yaprağı",
          "Yeni yumurtalık",
        ],
        answer: 1,
        hint: "İlk çıkış ile sonraki sürgünü ayır.",
        explanation:
          "Embriyonik kök radikula adını alır. Tipik fasulye örneğinde önce radikula dışarı çıkar. Sürgün ve yaprak gelişimi daha sonra izlenir. Soru olgun fasulye tohumu üzerinedir.",
        guidance: {
          knowledge: ["Radikula embriyonik köktür."],
          strategy: "İlk çıkış ile sonraki sürgünü ayır.",
          steps: [
            "Embriyonik kök radikula adını alır.",
            "Tipik fasulye örneğinde önce radikula dışarı çıkar.",
            "Sürgün ve yaprak gelişimi daha sonra izlenir.",
          ],
          optionReasons: [
            "Fide kök çıkışı sperm üretimi değildir.",
            "Doğru. Kökün gelişimi su ve mineral alımına katılacak sistemi başlatır.",
            "Polen tüpü olgun tohum çimlenmesinin kökü değildir.",
            "Kabuk embriyonik yaprak değildir;3n ifadesi de yanlıştır.",
            "Üreme organı ilk fide çıkış yapısı değildir.",
          ],
          commonError: "Polen çimlenmesi ile tohum çimlenmesini karıştırmak.",
          check: "Soru olgun fasulye tohumu üzerinedir.",
        },
      },
      {
        prompt:
          "Erken karanlık çimlenmede bir tohum grubunun toplam kuru kütlesi 2,0 g’dan 1,7 g’a inerken su içeriği 0,2 g’dan 1,0 g’a çıkıyor. Son yaş kütle kaçtır?",
        options: ["2,2 g", "3,0 g", "2,7 g", "0,7 g", "1,7 g"],
        answer: 2,
        hint: "Son değerleri topla; başlangıçla karşılaştır.",
        explanation:
          "Son kuru kütle 1,7 g’dir. Son su 1,0 g’dır. Yaş kütle 1,7+1,0=2,7 g olur; yaş artarken kuru azalmıştır. 2,7 g=1,7 g kuru+1,0 g su.",
        guidance: {
          knowledge: ["Yaş kütle kuru kütle ile suyun toplamıdır."],
          strategy: "Son değerleri topla; başlangıçla karşılaştır.",
          steps: [
            "Son kuru kütle 1,7 g’dir.",
            "Son su 1,0 g’dır.",
            "Yaş kütle 1,7+1,0=2,7 g olur; yaş artarken kuru azalmıştır.",
          ],
          optionReasons: [
            "Başlangıç yaş kütleyi değişmemiş sayar.",
            "Başlangıç kuru 2,0 g ile son suyu toplar.",
            "Doğru. Başlangıç yaş 2,2 g; son yaş 2,7 g’dır.",
            "İki son değeri toplamak yerine çıkarır.",
            "Yalnız kuru kütleyi yaş kütle sayar.",
          ],
          commonError: "Su alımını kuru madde artışıyla eşitlemek.",
          check: "2,7 g=1,7 g kuru+1,0 g su.",
        },
      },
      {
        prompt:
          "Canlı bir tohum su alırken kabuk henüz görünür biçimde çatlamamış; oksijen tüketimi ölçülüyor. Bu gözlem hangi yorumu destekler?",
        options: [
          "Metabolik etkinlik kabuk çatlamasından önce artabilir.",
          "Tohum kesin fotosentez yapmıştır.",
          "Yeni çift döllenme başlamıştır.",
          "Kabuk çatlamadan hiçbir kimyasal olay olamaz.",
          "Embriyo kesin ölüdür.",
        ],
        answer: 0,
        hint: "Ölçümü görünür biçim değişiminden ayır.",
        explanation:
          "Oksijen tüketimi metabolik etkinlikle uyumludur. Görünür kabuk çatlaması henüz yoktur. Bu yüzden solunumun yalnız çatlamadan sonra başlayacağı zorunlu kuralı desteklenmez. Ölçülen değişken oksijen tüketimidir.",
        guidance: {
          knowledge: [
            "Solunumun başlaması görünür kabuk çatlamasından önce olabilir.",
          ],
          strategy: "Ölçümü görünür biçim değişiminden ayır.",
          steps: [
            "Oksijen tüketimi metabolik etkinlikle uyumludur.",
            "Görünür kabuk çatlaması henüz yoktur.",
            "Bu yüzden solunumun yalnız çatlamadan sonra başlayacağı zorunlu kuralı desteklenmez.",
          ],
          optionReasons: [
            "Doğru. Kabuk görüntüsü tek başına hücre içi metabolizmayı kapalı ilan ettirmez.",
            "Oksijen tüketimi fotosentez üretimiyle aynı değildir.",
            "Olgun tohum metabolizması gamet birleşmesi kanıtı değildir.",
            "Ölçülen oksijen tüketimine aykırıdır.",
            "Aktif tüketim canlı metabolizmayla uyumludur; ölüm kanıtı değildir.",
          ],
          commonError:
            "Gözle görülen eşiği bütün hücresel olayların başlangıcı sanmak.",
          check: "Ölçülen değişken oksijen tüketimidir.",
        },
      },
      {
        prompt:
          "Aynı canlı tohum partisi eşit sıcaklık ve oksijende karşılaştırılıyor. Dış ortamın tuz derişimi çok yükseldiğinde su bulunmasına rağmen çimlenme azalıyor. En uygun açıklama hangisidir?",
        options: [
          "Yüksek tuz tohumun su alımını güçleştirebilir.",
          "Tuz embriyonun tüm kromozomlarını kesin ikiye katlar.",
          "Tuz bütün tohumların besin yerine geçer.",
          "Su varsa her koşulda aynı hızla alınır.",
          "Çimlenme için oksijen hiçbir zaman gerekmez.",
        ],
        answer: 0,
        hint: "Su bulunması ile suyun alınabilirliğini ayır.",
        explanation:
          "Dış ortamda yüksek çözünen madde derişimi verilmiştir. Bu, ortamdan tohuma net su alımını azaltabilir. Su alımı güçleştiğinde etkinleşme ve büyüme sınırlanabilir. İki ortamda değişen etmen tuz derişimidir.",
        guidance: {
          knowledge: [
            "Dış çözeltinin su potansiyeli tohumun su alımını etkileyebilir.",
          ],
          strategy: "Su bulunması ile suyun alınabilirliğini ayır.",
          steps: [
            "Dış ortamda yüksek çözünen madde derişimi verilmiştir.",
            "Bu, ortamdan tohuma net su alımını azaltabilir.",
            "Su alımı güçleştiğinde etkinleşme ve büyüme sınırlanabilir.",
          ],
          optionReasons: [
            "Doğru. Bu gözlem her tuzun her türde aynı eşikte etkili olduğunu göstermez.",
            "Kromozom sayısı değişimi ölçülmemiştir.",
            "Mineral/çözünen maddeyi organik depo besiniyle özdeşleştirir.",
            "Su potansiyeli farkını yok sayar.",
            "Sabit oksijen koşulundan böyle bir sonuç çıkmaz.",
          ],
          commonError:
            "Dışarıdaki su miktarını kullanılabilir suyla aynı sanmak.",
          check: "İki ortamda değişen etmen tuz derişimidir.",
        },
      },
      {
        prompt:
          "Üç tekrarlı kapta her birine 40 tohum konuyor. Aynı sürede sırasıyla 28,30 ve 26 tohum kök çıkarıyor. Tüm kaplar birlikte değerlendirildiğinde çimlenme yüzdesi kaçtır?",
        options: ["%60", "%210", "%30", "%70", "%84"],
        answer: 3,
        hint: "Kap sayısını ve paydalarını birlikte say.",
        explanation:
          "Toplam tohum 3×40=120’dir. Çimlenen 28+30+26=84’tür. 84/120×100=%70 bulunur. 84+36=120 toplamı kapanır.",
        guidance: {
          knowledge: ["Birleşik yüzde toplam başarı/toplam denemedir."],
          strategy: "Kap sayısını ve paydalarını birlikte say.",
          steps: [
            "Toplam tohum 3×40=120’dir.",
            "Çimlenen 28+30+26=84’tür.",
            "84/120×100=%70 bulunur.",
          ],
          optionReasons: [
            "Toplam 84/120 oranıyla uyuşmaz.",
            "Üç kap yüzdesini ortalama almadan toplar.",
            "Bir kaptaki sayıyı toplam yüzde gibi kullanır.",
            "Doğru. Eşit kap büyüklüklerinde üç kap yüzdesinin ortalaması da%70’tir.",
            "Başarı sayısını yüzde sanır.",
          ],
          commonError: "Tekrarların tohum sayılarını paydadan silmek.",
          check: "84+36=120 toplamı kapanır.",
        },
      },
      {
        prompt:
          "Fasulyede çenekler toprak üstüne çıkarken bezelyede toprak altında kalıyor; ikisi de çift çeneklidir. Bu karşılaştırma neyi gösterir?",
        options: [
          "Çenek sayısı, çeneklerin toprak üstüne çıkmasını tek başına belirlemez.",
          "Fasulyenin çenekleri 3n endospermdir.",
          "Bezelye çeneği olmadığı için altta kalır.",
          "Çeneklerin konumu yumurtanın n olmasını değiştirir.",
          "Bütün tek çenekliler mutlaka üstte kalır.",
        ],
        answer: 0,
        hint: "Çenek sayısı ve çimlenme biçimini ayrı tut.",
        explanation:
          "İki bitki de iki çenek taşır. Buna rağmen çeneklerin toprak konumu farklıdır. Çift çeneklilik tek başına çeneklerin dışarı çıkmasını zorunlu kılmaz. Aynı çenek sayısı iki farklı konumla birlikte verilmiştir.",
        guidance: {
          knowledge: ["Epigeal ve hipogeal ayrımı çeneklerin konumudur."],
          strategy: "Çenek sayısı ve çimlenme biçimini ayrı tut.",
          steps: [
            "İki bitki de iki çenek taşır.",
            "Buna rağmen çeneklerin toprak konumu farklıdır.",
            "Çift çeneklilik tek başına çeneklerin dışarı çıkmasını zorunlu kılmaz.",
          ],
          optionReasons: [
            "Doğru. Fasulye epigeal, bezelye hipogeal örnektir.",
            "Embriyo yaprağını besi dokuyla karıştırır.",
            "Soruda ikisinin de çift çenekli olduğu verilmiştir.",
            "Fide biçimi gamet takımını yeniden belirlemez.",
            "Karşılaştırmada bu evrensel bilgi yoktur.",
          ],
          commonError:
            "Tek/çift çenek ayrımından tek çimlenme konumu çıkarmak.",
          check: "Aynı çenek sayısı iki farklı konumla birlikte verilmiştir.",
        },
      },
      {
        prompt:
          "Tipik kapalı tohumluda yumurta-sperm birleşmesi engellenirken sperm-polar çekirdek birleşmesi gözleniyor. İlk ürünler için hangi ifade doğrudur?",
        options: [
          "3n endosperm başlangıcı olabilir; tipik zigot oluşumu gösterilmemiştir.",
          "Tohum kabuğu doğrudan babadan oluşur.",
          "Endosperm otomatik 2n zigota dönüşür.",
          "Bu koşulda bütün taslaklar kesin canlı tohumdur.",
          "Kesin iki embriyo oluşur.",
        ],
        answer: 0,
        hint: "Hangi birleşmenin açık olduğuna göre ürünleri ayır.",
        explanation:
          "Yumurta birleşmesi yoksa tipik 2n zigot başlangıcı gösterilemez. Polarlarla birleşme 3n endosperm başlangıcı verebilir. Bu gözlem normal embriyo ve canlı olgun tohumun tamamlandığını kanıtlamaz. Gösterilen ürün ile gösterilmeyen ürün ayrı yazılmalı.",
        guidance: {
          knowledge: [
            "Zigot ve endosperm başlangıcı farklı birleşmelerden gelir.",
          ],
          strategy: "Hangi birleşmenin açık olduğuna göre ürünleri ayır.",
          steps: [
            "Yumurta birleşmesi yoksa tipik 2n zigot başlangıcı gösterilemez.",
            "Polarlarla birleşme 3n endosperm başlangıcı verebilir.",
            "Bu gözlem normal embriyo ve canlı olgun tohumun tamamlandığını kanıtlamaz.",
          ],
          optionReasons: [
            "Doğru. İkinci ürün birinci ürünün yerine geçmez.",
            "Maternal örtü kökenini değiştirir.",
            "İki gelişim hattını özdeşleştirir.",
            "Olgunlaşma ve embriyo başarısı ölçülmemiştir.",
            "Yumurta birleşmesi engeline ve iki ürün ayrımına aykırıdır.",
          ],
          commonError:
            "Bir birleşme gözleminden bütün gelişimin başarılı olduğunu varsaymak.",
          check: "Gösterilen ürün ile gösterilmeyen ürün ayrı yazılmalı.",
        },
      },
    ],
    source:
      "MEB ve OGM kapsamı temel alınarak hazırlanmış özgün anlatım, öğretim modelleri ve sorular. Resmî sınav sorusu değildir.",
  },
  {
    id: "canlilar-ve-cevre",
    topic: "detail-357",
    title: "Canlılar ve Çevre",
    minutes: 100,
    objectives: [
      "Genetik ve çevresel varyasyonu kontrollü karşılaştırmalarla ayırmak",
      "Mutasyon, aktarım, seçilim ve adaptasyonun farklı rollerini açıklamak",
      "Doğal ve yapay seçilimde sayı, oran ve üreme katkısını veriden hesaplamak",
    ],
    sections: [
      {
        title: "Başlamadan: birey, soy ve popülasyon",
        paragraphs: [
          "Popülasyon aynı türün belirli yer ve zamanda yaşayan bireylerinden oluşur. Bir bireyin yaşamı boyunca değişmesiyle, kuşaklar boyunca popülasyondaki kalıtsal özelliklerin dağılımının değişmesi farklı ölçeklerdir. Bu ayrım çevre etkisini okumanın başlangıcıdır.",
          "Önkoşul DNA, gen, alel, genotip ve fenotipi ayırmaktır. Genotip kalıtsal yapıyı, fenotip gözlenen özellikleri ifade eder. Bir özelliğin görünür olması genetik nedenin tek başına saptandığı anlamına gelmez.",
        ],
      },
      {
        title: "Canlı ve cansız çevre",
        paragraphs: [
          "Sıcaklık, ışık, su, tuzluluk ve pH cansız etmenlere; avcılar, parazitler, rakipler ve ortaklık kurulan canlılar canlı etmenlere örnektir. Aynı etmen türlere ve gelişim evrelerine farklı etkiler gösterebilir.",
          "Bir ağaç başka canlılara yaşam alanı sağlarken toprağı ve mikroiklimi de etkiler. Etkileşim çift yönlüdür. Besin ağları ve madde döngüleri bu ilişkilerin bir parçasıdır; burada özellikle çevrenin kalıtsal çeşitlilik üzerindeki seçici etkisine odaklanılır.",
        ],
      },
      {
        title: "Varyasyonun iki kaynağı",
        paragraphs: [
          "Aynı türün bireyleri arasında görülen farklılıklar varyasyondur. Genetik farklar, çevresel etkiler ve bunların etkileşimi fenotipte farklılık oluşturabilir. Boy, pigment miktarı veya verim gibi bir özelliği tek gözlemden tek nedene bağlayamayız.",
          "Kalıtsal varyasyon nesillere genetik yolla aktarılabilen farklılıkları içerir. Çevreye bağlı fenotip değişiminde DNA dizisi değişmek zorunda değildir. Bir özellikte çevre etkisinin bulunması, o özelliğin hiçbir genetik bileşen taşımadığı anlamına gelmez.",
        ],
      },
      {
        title: "Aynı genotip, farklı çevre",
        paragraphs: [
          "Aynı genotipli klonları iki sıcaklıkta yetiştirmek, çevresel yanıtı incelemeye yardım eder. Ortam değiştiğinde pigment düzeyi değişiyorsa, bu sonuç tek başına DNA dizisinin mutasyona uğradığını göstermez.",
          "Farklı çevrelerde aynı genotipin oluşturduğu fenotip aralığı tepki normuyla gösterilebilir. Keşifte iki hattın temsili pigment eğrileri karşılaştırılır. Eğriler bir popülasyonun doğal seçilimle değişiminden farklı olarak aynı genotipin çevre yanıtını gösterir.",
        ],
      },
      {
        title: "Aynı çevre, farklı genotip",
        paragraphs: [
          "Farklı genotipleri ortak çevrede yetiştirmek genetik farklılıkların etkisini ayırmaya yardım eder. Fark ortak çevrede sürüyorsa genetik bir açıklamayla uyumludur; tek ölçüm her olası ana etkisini veya gelişim geçmişini dışlamaz.",
          "Daha güçlü karşılaştırma için farklı genotipler birden fazla çevrede, yeterli tekrar ve rastgele yerleşimle incelenir. Böylece yalnız genotip ve yalnız çevre yerine ikisinin birlikte etkisi değerlendirilebilir.",
        ],
      },
      {
        title: "Genotip ile çevre etkileşimi",
        paragraphs: [
          "İki genotip sıcaklığa aynı eğimle yanıt vermek zorunda değildir. Bir ortamda yüksek verimli olan hat, başka bir ortamda daha düşük verimli olabilir. Sıralamanın değişmesi genotip-çevre etkileşimi için açık bir örnektir.",
          "Bir hattın her koşulda en iyi olduğu sonucu tek ortamdan çıkmaz. Keşifte A ve B eğrilerinin kesişmesi bu mantığı görünür kılar; sayısal katsayılar kuramsaldır ve gerçek bitki türünü temsil etmez.",
        ],
      },
      {
        title: "Çevresel değişim ve kalıtım",
        paragraphs: [
          "Bronzlaşma veya antrenmanla kas gelişimi, kişinin çevresine yanıt verebilir; bu kazanılmış görünümün aynısının çocuklara DNA aleli olarak aktarılması beklenmez. DNA dizisi değişmeden gelişim ve gen işleyişi değişebilir.",
          "Bu düzeyde çevresel fenotip yanıtı ile dizi mutasyonunu ayırırız. Epigenetik süreçler gibi ek mekanizmalar ayrıca incelenebilir; yalnız dış görünüşten bunların varlığı veya kuşaklar boyu aktarımı kesinleştirilmez.",
        ],
      },
      {
        title: "Yeni alel ile yeni birleşim",
        paragraphs: [
          "Mutasyon yeni alellerin temel kaynağıdır. Mayozdaki krossing over ve kromozomların dağılımı mevcut alellerin yeni birleşimlerini oluşturur. Döllenme farklı gametlerin kalıtsal katkılarını bir araya getirir.",
          "Bu nedenle çeşitlilik oluşumunda üç süreç birlikte anılsa da aynı işi yapmazlar. Krossing overın varlığı tek başına yeni DNA aleli oluştuğunu kanıtlamaz; verilen soruda hangi ölçekte değişiklik olduğu belirlenmelidir.",
        ],
      },
      {
        title: "Mutasyon nedir?",
        paragraphs: [
          "Hücresel canlıların genomundaki DNA dizisi veya kromozom yapısı/sayısındaki kalıcı değişiklikler mutasyon kapsamında ele alınır. RNA genomlu virüslerde kalıtsal materyal RNA’dır. Hücrede geçici olarak değişen her RNA miktarı genom mutasyonu değildir.",
          "DNA hasarı veya ilk kopyalama hatası onarılabilir. Onarılmayıp genomda sabitlenen dizi değişimi mutasyon olarak izlenir; etkisi nötr olabilir veya hücrenin özelliklerini etkileyebilir. Çevreye ihtiyaç duyulan aleli bilinçli biçimde yazdıran bir süreç olarak anlatılmaz.",
        ],
      },
      {
        title: "Mutajen, maruziyet ve olasılık",
        paragraphs: [
          "Bazı ışınımlar ve kimyasallar DNA hasarı veya mutasyon olasılığını artırabilir; bu etkenler mutajen olarak adlandırılır. Maruziyet olması her hücrede mutasyonun kesin oluştuğu veya oluşanın yararlı olduğu anlamına gelmez.",
          "Etki doza, süreye, dokuya, onarıma ve etkene bağlıdır. Keşifteki boyutsuz maruziyet yalnız varsayımsal olasılığı değiştirir. Beklenen hücre sayısı bir grubun ortalamasıdır; belirli bir deneyin kesin sayısı veya tıbbi risk tahmini değildir.",
        ],
      },
      {
        title: "Mutasyonun etkisi bağlama bağlıdır",
        paragraphs: [
          "Bir mutasyon zararlı, nötr veya belirli koşullarda yararlı olabilir. Protein işlevini değiştirmeyen veya mevcut ortamda üreme başarısını etkilemeyen değişimler mümkündür. Her mutasyon gözle görülen özellik değişimi yapmaz.",
          "Antimikrobiyal bulunan ortamda avantaj sağlayan direnç, madde yokken büyüme maliyeti taşıyabilir. Yararlılık bireyin isteğine göre değil, belirli çevredeki yaşam ve üreme katkısıyla değerlendirilir. Bir koşuldaki avantaj bütün koşullarda üstünlük değildir.",
        ],
      },
      {
        title: "Hangi hücre soyu aktarır?",
        paragraphs: [
          "İnsanın deri hücresindeki mutasyon o hücrenin mitozla oluşan soyuna geçebilir; fakat normal eşeyli üremede deri hücresi gamet oluşturmaz. Gametteki bir mutasyon ise o gamet döllenmeye katılırsa yavrunun genetik yapısına katılabilir.",
          "Bir bitkinin sürgünündeki mutant hücre soyu çelikle oluşturulan yeni bireye katılabilir. Bu nedenle somatik mutasyonun hiçbir üreme yoluyla aktarılamayacağı genellemesi yanlıştır. Hücre tipi kadar üreme yolu ve katkı veren soy da belirtilmelidir.",
        ],
      },
      {
        title: "Doğal seçilimin gerekli bağlantısı",
        paragraphs: [
          "Bireyler arasında kalıtsal farklılık bulunması ve bu farklılıkların yaşam veya üreme başarısını etkilemesi doğal seçilimi mümkün kılar. Bir sonraki kuşağa daha fazla katkı veren özelliklerin sıklığı artabilir.",
          "Çevre eleme ve üreme koşullarını değiştirir; bireyler gereksinim duydukları için aynı anda amaçlı mutasyon geçirmez. Rastgele ölüm de sayı değiştirir; bir olayın doğal seçilim sayılması için özellik ile farklı başarı bağlantısı aranır.",
        ],
      },
      {
        title: "Uyum başarısı yalnız hayatta kalmak değildir",
        paragraphs: [
          "Uzun yaşayan fakat hiç üremeyen birey, daha kısa yaşayıp çok sayıda üreyebilir yavru veren bireyden daha düşük genetik katkı sağlayabilir. Seçilim hesabında yaşama ve üreme birlikte düşünülür.",
          "En güçlü, en iri veya en hızlı birey her koşulda en çok katkı vermez. Uyum başarısı çevre ve rekabet bağlamındadır. Veride sağ kalma oranı kadar yavru sayısı veya sonraki kuşaktaki pay da gerekebilir.",
        ],
      },
      {
        title: "Adaptasyon ile geçici uyum",
        paragraphs: [
          "Adaptasyon belirli çevrede yaşam ve üreme başarısına katkı veren kalıtsal özellikler için kullanılır. Yapısal, fizyolojik veya davranışsal özellikler bu kapsama girebilir. Kuşaklar boyunca seçilim, böyle özelliklerin yayılmasına katkı sağlayabilir.",
          "Bir bireyin kısa sürede sıcaklığa alışması veya renginin geçici değişmesiyle, bu yanıt kapasitesinin kalıtsal temeli ayrı düzeylerdir. Örneğin renk değiştirme yeteneğinin kalıtsallığı ile o anda ortaya çıkan rengin kendisini ayırmak gerekir.",
        ],
      },
      {
        title: "Sayı ile sıklığı ayrı tutmak",
        paragraphs: [
          "Dirençli bireyler 100’den 80’e, duyarlılar 900’den 90’a düşerse dirençlilerin sayısı azalmıştır; fakat payları %10’dan 80/170≈%47,1’e yükselmiştir. Oran artışı çoğalma olduğunun tek başına kanıtı değildir.",
          "Keşif her kuşakta iki soyun beklenen sayısını ve dirençli payını birlikte gösterir. Tamamen yok edilmiş bir soy, mutasyon veya göç eklenmeyen modelde kendiliğinden geri gelemez. Varsayımlar, çıkarımın sınırını belirler.",
        ],
      },
      {
        title: "Antibiyotik direncinde seçici ortam",
        paragraphs: [
          "Bir popülasyonda önceden bulunan veya sonradan rastgele ortaya çıkan kalıtsal direnç, uygun antimikrobiyal ortamda göreli avantaj sağlayabilir. Duyarlıların daha fazla etkilenmesi ve dirençlilerin üremesi popülasyon bileşimini değiştirir.",
          "Antibiyotiğin hedefi, bakterinin fizyolojisi ve direnç mekanizması önemlidir. Tedaviye karar verme laboratuvar ve klinik değerlendirme gerektirir; sınıf modelindeki maruziyet değeri tedavi önerisi değildir. Kendiliğinden doz artırma sonucuna ulaşılmaz.",
        ],
      },
      {
        title: "Gen aktarımı seçilimden farklıdır",
        paragraphs: [
          "Bakteriler arasında plazmit aracılı gen aktarımı gibi yollar bir direnç özelliğinin farklı hücrelere geçmesini sağlayabilir. Bu, direnç taşıyanların daha çok üremesi olan seçilimden farklı bir mekanizmadır.",
          "Mutasyon yeni dizi değişimi, aktarım mevcut genin başka hücreye geçmesi, seçilim ise farklı üreme katkısıdır. Gerçek popülasyonlarda birlikte bulunabilirler; bir modelde hangilerinin açık veya kapalı olduğu ayrıca söylenmelidir.",
        ],
      },
      {
        title: "Pestisit ve herbisit direnci",
        paragraphs: [
          "İnsektisit böceklere, herbisit istenmeyen bitkilere yönelik pestisit gruplarıdır. Aynı etki mekanizmasının yinelenmesi, kalıtsal direnç taşıyanların göreli üreme katkısını artırabilir. Bir bireyin isteyerek dayanıklı hâle gelmesi gerekmez.",
          "Direnç yönetiminde farklı yöntemlerin birlikte değerlendirilmesi ve hedef dışı canlıların korunması önemlidir. Etkinliğin düşmesi tek başına her zaman direnç kanıtı değildir; uygulama, çevre ve hedefin yaşam evresi de incelenir. Her pestisit çevrede aynı kalıcılığa sahip değildir.",
        ],
      },
      {
        title: "Virüslerde kalıtsal değişim",
        paragraphs: [
          "Virüs genomları DNA veya RNA olabilir; mutasyon hızları ve onarım olanakları gruplar arasında farklıdır. Bazı değişimler belirli antiviral veya bağışıklık baskısı altında yayılma avantajı sağlayabilir.",
          "Her virüs her bakteriden daha hızlı mutasyon geçirir veya bütün ilaçlar sonunda etkisizdir gibi kesin genellemeler kurulmaz. Antibiyotiklerin bakterilere yönelik etkisiyle antivirallerin hedefleri ayrıdır; her direnç örneği aynı mekanizma değildir.",
        ],
      },
      {
        title: "Yapay seçilimde seçen kim?",
        paragraphs: [
          "İnsanların belli kalıtsal özellikleri taşıyan bireyleri damızlık veya tohumluk olarak seçmesi yapay seçilimdir. Süt verimi, tane sayısı veya kuraklık altında verim gibi hedefler için nesiller boyunca yetiştirme yapılabilir.",
          "İnsan eliyle oluşturulmuş bir ortamda bakterilerin dirençli payının istemeden artması genellikle doğal seçilim örneğidir. Ölçüt insanın ortamda bulunması değil, hangi bireylerin üremesine hedefli olarak karar vermesidir.",
        ],
      },
      {
        title: "Islah, çeşitlilik ve ödünleşim",
        paragraphs: [
          "Bir hedefe göre sınırlı sayıdaki ebeveyni seçmek bazı alellerin sıklığını artırabilir ve çeşitliliği azaltabilir. Yüksek verim seçimi, hastalığa veya kuraklığa dayanıklılığı otomatik artırmaz. Özellikler arasında ödünleşim görülebilir.",
          "Brokoli ve lahana gibi akraba kültür çeşitlerinde farklı organların özellikleri seçilmiştir; alabaşın şişkin gövdesi kök değildir. Islah hedefi ve genetik çeşitliliğin korunması birlikte planlanabilir; seçilen her hat her ortamda en iyi değildir.",
        ],
      },
      {
        title: "Seçim, gen aktarımı ve aşılama",
        paragraphs: [
          "Yapay seçilim mevcut çeşitler arasından üreme katkısını seçer; genetik mühendisliği belirli genetik düzenlemeler veya aktarımlar yapabilir. Modern ıslah ikisini birlikte kullanabilir, ancak işlem basamakları aynı değildir.",
          "Aşılamada kalem ve anaç farklı doku kökenlerini korur; anaç dokusunun genotipi sırf kalem takıldı diye kalemin genotipine dönüşmez. Bir uygulamada hangi kalıtsal değişimin yapıldığını adından değil, yapılan işlemden çıkar.",
        ],
      },
      {
        title: "Kanıtı doğru ölçekte kurmak",
        paragraphs: [
          "Aynı genotipin farklı ortamları çevre yanıtını, aynı ortamın farklı genotipleri kalıtsal farkı, kuşaklar arasındaki üreme katkıları ise seçilimi araştırır. Yeterli tekrar, rastgele örnekleme ve açık ölçütler sonuçların gücünü artırır.",
          "Bir fenotip değişimi tek başına mutasyon veya adaptasyon kanıtı değildir. Kaynak, zaman, hücre soyu, sayı ve payda bilgilerini birlikte kullan. Keşifteki her çıktı varsayımı belirtilmiş sınırlı model sonucudur; gerçek canlıyı bütünüyle tahmin ettiği iddia edilmez.",
        ],
      },
    ],
    examples: [
      {
        title: "Çaprazlaşan tepki normları",
        prompt:
          "Varsayımsal iki klonal hatta pigment P_A=100−2 T, P_B=10+T olarak verilmiştir; T 10–40°C aralığındadır. Hatların eşitlendiği sıcaklığı ve 35°C’de sıralamayı bul.",
        strategy:
          "Eşitlik denklemini çöz; sonra tek bir sıcaklığı iki hatta ayrı uygula.",
        steps: [
          {
            label: "1. adım",
            explanation: "100−2 T=10+T denklemi 90=3 T, T=30°C verir.",
          },
          {
            label: "2. adım",
            explanation: "35°C’deA 30, B 45 birimdir; B daha yüksektir.",
          },
          {
            label: "3. adım",
            explanation:
              "Aynı genotipin değerinin değişmesi verilen modelde mutasyon değildir; iki hattın yanıt eğimleri farklıdır.",
          },
        ],
        answer: "30°C;35°C’deB>A",
        check: "30°C’de iki denklem de 40 birim verir.",
        pitfall: "Tek ortamda en yüksek olanı bütün çevrelerde üstün saymak.",
      },
      {
        title: "Kalıtsal farkı ortak bahçede sınamak",
        prompt:
          "A veB bitki hatlarının farklı tarlalarda boyları 30 ve 50 cm. Her hattan çok sayıda klon iki ortak bahçeye rastgele dikiliyor; birinci bahçedeA 32/B 47, ikincideA 38/B 53 cm ortalama ölçülüyor. Hangi yorum güçlenir?",
        strategy: "Hat ve çevre karşılaştırmalarını ayrı yap.",
        steps: [
          {
            label: "1. adım",
            explanation: "İki ortak bahçede deB, A’dan 15 cm daha uzundur.",
          },
          {
            label: "2. adım",
            explanation:
              "Her iki hattın ikinci bahçede 6 cm daha uzun olması çevre etkisiyle uyumludur.",
          },
          {
            label: "3. adım",
            explanation:
              "Kalıtsal hat farkı ve çevre etkisi birlikte desteklenir; tek bir nedene indirgenmez.",
          },
        ],
        answer: "Hem hat farkı hem çevre etkisi vardır",
        check:
          "Ortak çevre karşılaştırması başlangıçtaki farklı tarla sorununu azaltır.",
        pitfall: "Hat farkı varsa çevre etkisi sıfırdır demek.",
      },
      {
        title: "Üreme katkısını iki basamakta saymak",
        prompt:
          "KalıtsalX veY tiplerinden başlangıçta 80’er birey var. X’in %75’i, Y’nin %50’si ürüyor; üreyenX başına 2, Y başına 4 yavru oluşuyor. Yeni kuşaktaX payı nedir?",
        strategy: "Önce üreyen sayısını, sonra yavru katkısını hesapla.",
        steps: [
          {
            label: "1. adım",
            explanation: "X:80×0,75×2=120 yavru verir.",
          },
          {
            label: "2. adım",
            explanation: "Y:80×0,50×4=160 yavru verir.",
          },
          {
            label: "3. adım",
            explanation:
              "X payı 120/(120+160)=3/7≈%42,9’dur; daha yüksek üreme katılımı tek başına daha çok yavru payı sağlamamıştır.",
          },
        ],
        answer: "X yaklaşık %42,9",
        check: "İki grubun toplam yavru sayısı 280’dir.",
        pitfall: "Yalnız sağ kalan/üreyen yüzdesine bakmak.",
      },
      {
        title: "Sağ kalmayı ölçüp yeni gruba aktarmak",
        prompt:
          "Üreme öncesi ilk grupta 120 R,480 S; uygulama sonrası 72 R,48 S sayılıyor. İkinci grupta başlangıç 30 R,270 S var. Aynı koşullarda ilk grubun sağ kalma oranlarının ikinci gruba da geçerli olduğu kabul ediliyor. İkinci gruptaki beklenen R/S sayıları ve toplam sağ kalan nedir?",
        strategy:
          "İlk grubun tip başına oranını bul; ikinci grubun kendi başlangıç sayısına uygula.",
        steps: [
          {
            label: "1. adım",
            explanation: "İlk grupta sR=72/120=0,60; sS=48/480=0,10’dur.",
          },
          {
            label: "2. adım",
            explanation: "İkinci grupta R=30×0,60=18, S=270×0,10=27 beklenir.",
          },
          {
            label: "3. adım",
            explanation:
              "Toplam 45 sağ kalan vardır; ilk grubun son yüzdesi ikinci gruba doğrudan kopyalanmaz.",
          },
        ],
        answer: "18 R,27 S; toplam 45",
        check:
          "İkinci gruptaki her beklenen sayı kendi başlangıcını aşmaz; oran aktarımı eşit koşul varsayımına bağlıdır.",
        pitfall:
          "İlk grubun son R/S payını farklı başlangıç bileşimine aynen uygulamak.",
      },
      {
        title: "Maliyet ortamla tersine dönerse",
        prompt:
          "KalıtsalR veS soyları eşit sayıda. Bir ortamda kuşak başına yavru çarpanlarıR 1,2/S 1,8; ikinci ortamdaR 1,5/S 0,3 olarak ölçülüyor. İki kuşak sonundaR paylarını karşılaştır.",
        strategy:
          "Başlangıç ortak çarpanını sadeleştirerek çarpanları karesine al.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İlk ortamdaR: S=1,2²:1,8²=1,44:3,24; R payı 1,44/4,68≈%30,8.",
          },
          {
            label: "2. adım",
            explanation:
              "İkinci ortamdaR: S=1,5²:0,3²=2,25:0,09; R payı≈%96,2.",
          },
          {
            label: "3. adım",
            explanation:
              "Aynı kalıtsalR özelliğinin göreli avantajı ortamla değişmiştir.",
          },
        ],
        answer: "İlk ortam %30,8; ikinci ortam %96,2",
        check:
          "Her iki hesapta başlangıç payı %50’dir; sonuçlar farklı seçici koşullardan gelir.",
        pitfall: "Bir özelliğe ortamdan bağımsız yararlı etiketi koymak.",
      },
      {
        title: "Beklenen değer kesin sonuç değildir",
        prompt:
          "Bağımsız hücre başına işaretli mutasyon olasılığı 0,004 kabul edilen 5000 hücrelik kuramsal deneyde beklenen mutant hücre sayısı kaçtır? Bu sayı her kapta aynı mıdır?",
        strategy: "Olasılık ile hücre sayısını çarp; ortalama anlamını koru.",
        steps: [
          {
            label: "1. adım",
            explanation: "Beklenen sayı 5000×0,004=20’dir.",
          },
          {
            label: "2. adım",
            explanation:
              "Tek kapta 19,20 veya başka sayı gözlenebilir; beklenen değer kesin gözlem değildir.",
          },
          {
            label: "3. adım",
            explanation:
              "Değişimin yararlı olup olmadığı ve yavruya aktarımı bu olasılıktan çıkmaz.",
          },
        ],
        answer: "Beklenen 20; kesin sayı değil",
        check:
          "Hücre başına olasılık 0 ile 1 arasında, sonuç 0 ile 5000 arasındadır.",
        pitfall: "Bekleneni deneyin zorunlu tam sayısı saymak.",
      },
      {
        title: "Yapay seçilimde karşı hedef",
        prompt:
          "Ortak çevrede kalıtsal farkı kabul edilen dört hattın verim/kuraklık puanlarıP 12/2, Q 9/5, R 6/8, S 3/11. Yalnız en verimli iki hat seçiliyor. Seçilen grubun iki ortalaması ve çeşitlilik bedeli nedir?",
        strategy: "Hedefe göre sırala; diğer özelliği aynı seçilen grupta ölç.",
        steps: [
          {
            label: "1. adım",
            explanation: "Verime göreP ve Q seçilir.",
          },
          {
            label: "2. adım",
            explanation:
              "Verim ortalaması(12+9)/2=10,5; kuraklık ortalaması(2+5)/2=3,5’tir.",
          },
          {
            label: "3. adım",
            explanation:
              "Dört hattan ikisi temsil edilir; yüksek verim, kuraklık puanını otomatik yükseltmemiştir.",
          },
        ],
        answer: "P/Q; verim 10,5, kuraklık 3,5; temsil 2 hat",
        check:
          "Başlangıç kuraklık ortalaması 6,5’ti; seçilenlerde daha düşüktür.",
        pitfall:
          "Tek ıslah hedefinin bütün özellikleri iyileştirdiğini sanmak.",
      },
      {
        title: "Aktarım yolunu değiştirmek",
        prompt:
          "Aynı bitkinin bir dalında DNA mutasyonu yalnız belirli meristem soyunda bulunuyor. Bu soyu taşıyan bir çelik köklendiriliyor; başka dalın gametleriyle de eşeyli yavru oluşturuluyor. Mutasyonun iki yoldaki olası aktarımı nedir?",
        strategy: "Yeni bireye hangi hücre soyunun katkı verdiğini izle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Mutant soy çelikte bulunduğu için vejetatif yavruya katılabilir.",
          },
          {
            label: "2. adım",
            explanation:
              "Diğer dalın mutant olmayan gametleriyle oluşan yavruya bu dal mutasyonu sırf aynı ana bitki diye geçmez.",
          },
          {
            label: "3. adım",
            explanation:
              "Somatik mutasyonun aktarımı üreme yoluna ve katkı veren soya bağlıdır.",
          },
        ],
        answer:
          "Mutant çelikte aktarılabilir; belirtilen mutant olmayan gamet yolunda aktarılmaz",
        check:
          "Aynı organizmada bütün hücrelerin aynı sonradan oluşan mutasyonu taşımadığı verilmiştir.",
        pitfall:
          "Somatik/eşeyli etiketlerinden hücre soyunu okumadan kesin hüküm kurmak.",
      },
    ],
    recall: [
      {
        prompt: "Mutasyon, rekombinasyon ve seçilim nasıl ayrılır?",
        answer:
          "Mutasyon yeni kalıtsal değişim; rekombinasyon mevcut alellerin yeni birleşimi; seçilim özelliklere bağlı farklı üreme katkısıdır.",
      },
      {
        prompt:
          "Bir bireyde pigment değişimi doğal seçilimi tek başına gösterir mi?",
        answer:
          "Hayır; çevresel fenotip yanıtı olabilir.Seçilim için kalıtsal farkla bağlantılı yaşam/üreme katkısı gerekir.",
      },
      {
        prompt: "Dirençli sayı azalırken oranı artabilir mi?",
        answer:
          "Evet; duyarlıların sayısı daha büyük oranda azalırsa dirençlilerin toplam içindeki payı artabilir.",
      },
      {
        prompt: "Mutajen yararlı değişimi garantiler mi?",
        answer:
          "Hayır; olasılığı değiştirebilir.Değişimin yeri, etkisi ve aktarım yolu ayrıca belirlenmelidir.",
      },
      {
        prompt: "Somatik mutasyon hangi yolla yeni bitkiye geçebilir?",
        answer:
          "Mutant hücre soyu vejetatif üreme materyaline katılırsa yeni bireye aktarılabilir.",
      },
      {
        prompt: "Hangi durumda insanın etkisi yapay seçilim olur?",
        answer:
          "Belirli kalıtsal özellikleri hedefleyip üreyecek bireyleri seçmesi; ortamı istemeden değiştirmesi tek başına yeterli değildir.",
      },
      {
        prompt: "Alel sıklığı ile alel çeşidi sayısı aynı mı?",
        answer:
          "Hayır; seçilim mevcut alelin payını artırabilirken toplam çeşit sayısı aynı kalabilir veya azalabilir.",
      },
      {
        prompt: "Bir hattın her ortamda üstün olduğu nasıl sınanır?",
        answer:
          "Farklı hatlar birden çok ortak çevrede tekrarlı karşılaştırılır; tek ortam sıralaması evrensel üstünlük göstermez.",
      },
    ],
    items: [
      {
        prompt:
          "Bir göldeki balık popülasyonu için pH, çözünmüş oksijen, yırtıcı balıklar ve parazitler inceleniyor. Hangisi canlı çevre etmenlerini birlikte verir?",
        options: [
          "pH ve çözünmüş oksijen",
          "Yalnız pH",
          "Çözünmüş oksijen ve parazitler",
          "Yırtıcı balıklar ve parazitler",
          "Dördü de yalnız cansızdır.",
        ],
        answer: 3,
        hint: "Etmenin organizma olup olmadığını ayır.",
        explanation:
          "pH kimyasal ortam özelliğidir. Çözünmüş oksijen cansız çevre değişkenidir. Yırtıcı balıklar ve parazitler canlı organizmalardır. Oksijeni canlılar üretse de oksijenin kendisi organizma değildir.",
        guidance: {
          knowledge: [
            "Diğer organizmalar canlı; pH ve oksijen gibi fiziksel-kimyasal koşullar cansız çevredir.",
          ],
          strategy: "Etmenin organizma olup olmadığını ayır.",
          steps: [
            "pH kimyasal ortam özelliğidir.",
            "Çözünmüş oksijen cansız çevre değişkenidir.",
            "Yırtıcı balıklar ve parazitler canlı organizmalardır.",
          ],
          optionReasons: [
            "İki cansız çevre değişkenini canlı sayar.",
            "Kimyasal ölçümü organizma sayar.",
            "Bir cansız, bir canlı etmeni karıştırır.",
            "Doğru. İkisi de başka canlıların etkisini temsil eder.",
            "Yırtıcı ve parazitlerin canlılığını yok sayar.",
          ],
          commonError:
            "Canlının etkilediği bütün değişkenleri canlı etmen sanmak.",
          check:
            "Oksijeni canlılar üretse de oksijenin kendisi organizma değildir.",
        },
      },
      {
        prompt:
          "DNA dizisi aynı kabul edilen bir bitki klonunun örnekleri 18°C’de 80,28°C’de 40 pigment birimi veriyor. Diğer etmenler aynı ve mutasyon saptanmamış. En doğrudan yorum hangisidir?",
        options: [
          "Sıcaklık kalıtsal yapıyı her zaman ikiye böler.",
          "Doğal seçilimle yeni kuşak oluşmuştur.",
          "Mutasyon kesin pigmenti yarıya indirmiştir.",
          "Aynı genotip sıcaklığa farklı pigment yanıtı vermiştir.",
          "İki örnek zorunlu iki ayrı türdür.",
        ],
        answer: 3,
        hint: "Genotipi sabit, çevreyi değişken tut.",
        explanation:
          "Örnekler aynı genotiplidir. Değişen sıcaklıkla pigment düzeyi farklılaşmıştır. Sonuç çevresel fenotip yanıtıyla uyumludur; yeni alel kanıtı değildir. Değişen ölçüm pigment; genotip sabit kabul edilmiştir.",
        guidance: {
          knowledge: ["Aynı genotip farklı çevrede farklı fenotip verebilir."],
          strategy: "Genotipi sabit, çevreyi değişken tut.",
          steps: [
            "Örnekler aynı genotiplidir.",
            "Değişen sıcaklıkla pigment düzeyi farklılaşmıştır.",
            "Sonuç çevresel fenotip yanıtıyla uyumludur; yeni alel kanıtı değildir.",
          ],
          optionReasons: [
            "Fenotip değerini kromozom/dizi bölünmesi sanır.",
            "Kuşak ve üreme katkısı ölçülmemiştir.",
            "Soruda mutasyon saptanmadığı ve genotipin aynı olduğu verilmiştir.",
            "Doğru. Pigment farkı tek başına DNA dizi değişimi göstermez.",
            "Aynı klon bilgisine aykırı tür farkı çıkarır.",
          ],
          commonError: "Fenotip değişince mutlaka genotip değiştiğini sanmak.",
          check: "Değişen ölçüm pigment; genotip sabit kabul edilmiştir.",
        },
      },
      {
        prompt:
          "A veB hatları aynı ortak bahçede, rastgele yerleşim ve tekrarlarla yetiştiriliyor. A’nın ortalama boyu 35, B’nin 50cm; hatlar arası genetik farklılık da doğrulanmış. Hangi ifade veriye en uygundur?",
        options: [
          "Bütün boy farkları yalnız farklı sulamadandır.",
          "Boy farkı kesin yeni türleşmedir.",
          "İki hat aynı genotip olmak zorundadır.",
          "Çevre hiçbir bitkide boyu etkileyemez.",
          "Genetik hat farkı boy farkına katkı verebilir.",
        ],
        answer: 4,
        hint: "Sabit çevre ile doğrulanmış hat farkını birlikte kullan.",
        explanation:
          "Hatlar aynı çevrede karşılaştırılmıştır. Boy farkı ortak koşullarda sürmektedir. Genetik hat farkının etkisiyle uyumludur; çevrenin hiçbir etkisi olmadığı çıkarılmaz. İddia katkı olasılığıdır; tek belirleyici olduğu değildir.",
        guidance: {
          knowledge: [
            "Ortak çevre genetik hat farkını değerlendirmeyi güçlendirir.",
          ],
          strategy: "Sabit çevre ile doğrulanmış hat farkını birlikte kullan.",
          steps: [
            "Hatlar aynı çevrede karşılaştırılmıştır.",
            "Boy farkı ortak koşullarda sürmektedir.",
            "Genetik hat farkının etkisiyle uyumludur; çevrenin hiçbir etkisi olmadığı çıkarılmaz.",
          ],
          optionReasons: [
            "Soruda ortak koşullar sağlandığı verilmiştir.",
            "Türleşme için üreme izolasyonu gibi veri yoktur.",
            "Doğrulanmış genetik fark bilgisine aykırıdır.",
            "Bir deneyden evrensel yokluk çıkarır.",
            "Doğru. Tek ortak çevre bütün çevreleri temsil etmez.",
          ],
          commonError:
            "Genetik katkıyı çevrenin tamamen etkisizliğiyle eşitlemek.",
          check: "İddia katkı olasılığıdır; tek belirleyici olduğu değildir.",
        },
      },
      {
        prompt:
          "Aynı iki genotipin verimleri serin ortamdaA 12/B 8, sıcak ortamdaA 6/B 10 birim. Her ortamda tekrarlarla doğrulanmış bu sıralama hangi yorumu destekler?",
        options: [
          "A her ortamda daha verimlidir.",
          "Genotiplerin çevreye göre sıralaması değişmektedir.",
          "Çevre hiçbir iki genotipi farklı etkilemez.",
          "B her ortamda daha verimlidir.",
          "Her birey kesin yeni bir alel üretmiştir.",
        ],
        answer: 1,
        hint: "Her ortamda A-B sıralamasını ayrı yaz.",
        explanation:
          "SerindeA>B’dir. SıcaktaB>A’dır. Sıralama değişimi genotip-çevre etkileşimiyle uyumludur. A−B serinde+4, sıcakta−4’tür.",
        guidance: {
          knowledge: ["Genotiplerin çevre yanıtları farklı olabilir."],
          strategy: "Her ortamda A-B sıralamasını ayrı yaz.",
          steps: [
            "SerindeA>B’dir.",
            "SıcaktaB>A’dır.",
            "Sıralama değişimi genotip-çevre etkileşimiyle uyumludur.",
          ],
          optionReasons: [
            "Sıcak ortamA 6<B 10 verisine aykırıdır.",
            "Doğru. Bir genotip bütün koşullarda en verimli değildir.",
            "Gözlenen sıra değişimini reddeder.",
            "Serin ortamB 8<A 12 verisine aykırıdır.",
            "Dizi mutasyonu ölçülmemiştir.",
          ],
          commonError: "Bir ortamın sıralamasını her ortama taşımak.",
          check: "A−B serinde+4, sıcakta−4’tür.",
        },
      },
      {
        prompt:
          "Bir DNA lokusunda daha önce var olmayan yeni bir alelin ilk kez oluşması soruluyor. Yeni alellerin nihai oluşum kaynağı hangi süreçtir?",
        options: [
          "Yalnız krossing over",
          "Yalnız döllenmede gametlerin rastgele birleşmesi",
          "Mutasyon",
          "Tohumun yalnız su alması",
          "Yalnız doğal seçilim",
        ],
        answer: 2,
        hint: "Yeni alel ile yeni alel birleşimini ayır.",
        explanation:
          "Soruda yeni bir DNA aleli tanımlanıyor. Mevcut alellerin yalnız yeniden dağılımı yeni alel üretmiş olmaz. Temel kaynak dizi değişimi olan mutasyondur. Oluşum ve yayılma farklı sorulardır.",
        guidance: {
          knowledge: [
            "Mutasyon yeni dizi değişimleri oluşturabilir; rekombinasyon mevcut alelleri birleştirir.",
          ],
          strategy: "Yeni alel ile yeni alel birleşimini ayır.",
          steps: [
            "Soruda yeni bir DNA aleli tanımlanıyor.",
            "Mevcut alellerin yalnız yeniden dağılımı yeni alel üretmiş olmaz.",
            "Temel kaynak dizi değişimi olan mutasyondur.",
          ],
          optionReasons: [
            "Verilen temel düzeyde mevcut alellerin yeni birleşimini sağlar.",
            "Yeni kombinasyonla yeni aleli karıştırır.",
            "Doğru. Seçilim bu alelin sonraki sıklığını etkileyebilir; oluşumla aynı süreç değildir.",
            "Hidratasyon yeni DNA alelinin zorunlu kaynağı değildir.",
            "Mevcut farklılıkların üreme katkısını değiştirir; zorunlu yeni dizi oluşturmaz.",
          ],
          commonError:
            "Çeşitlilik sağlayan bütün süreçleri yeni alel üretimi saymak.",
          check: "Oluşum ve yayılma farklı sorulardır.",
        },
      },
      {
        prompt:
          "Bir hücresel canlıda genin mRNA miktarı çevreye yanıtla artmış; DNA dizisi değişmemiş. Bu gözlem için en uygun sınıflama hangisidir?",
        options: [
          "Gen ifadesi değişimi; genom mutasyonu kanıtı yok",
          "Yeni sperm-yumurta birleşmesi",
          "mRNA artışı DNA’nın tamamen yok olduğunu gösterir.",
          "Kesin kromozom sayısı yarılanması",
          "Kesin DNA mutasyonu",
        ],
        answer: 0,
        hint: "Ölçülen miktarı genom dizisinden ayır.",
        explanation:
          "DNA dizisi sabit verilmiştir. Değişen, mRNA miktarıdır. Bu veri gen ifadesi değişimine uyar; tek başına genom mutasyonu değildir. Miktar değişimi ile dizi değişimi ayrı ölçümlerdir.",
        guidance: {
          knowledge: [
            "Gen işleyişi değişimi genom dizi mutasyonuyla özdeş değildir.",
          ],
          strategy: "Ölçülen miktarı genom dizisinden ayır.",
          steps: [
            "DNA dizisi sabit verilmiştir.",
            "Değişen, mRNA miktarıdır.",
            "Bu veri gen ifadesi değişimine uyar; tek başına genom mutasyonu değildir.",
          ],
          optionReasons: [
            "Doğru. RNA genomlu virüs örneği bu hücresel mRNA ölçümüyle aynı bağlam değildir.",
            "Üreme olayı verilmemiştir.",
            "Transkript miktarından genom kaybı çıkarılamaz.",
            "Kromozom sayısı ölçülmemiştir.",
            "Sabit DNA dizisi bilgisine aykırıdır.",
          ],
          commonError: "Her moleküler değişimi kalıtsal dizi değişimi sanmak.",
          check: "Miktar değişimi ile dizi değişimi ayrı ölçümlerdir.",
        },
      },
      {
        prompt:
          "Kuramsal bir hücre grubunda bağımsız hücre başına işaretli mutasyon olasılığı 0,02, N=3000 hücre olarak kabul ediliyor. Beklenen mutant hücre sayısı nedir?",
        options: ["150000", "600", "60", "3000", "6"],
        answer: 2,
        hint: "Hücre adediyle hücre başına olasılığı çarp.",
        explanation:
          "p=0,02 iki yüzde demektir. 3000×0,02=60 bulunur. Bu ortalama yararlı mutasyon sayısı veya kesin kap sonucu değildir. 3000 hücrenin%2’si 60’tır.",
        guidance: {
          knowledge: ["Beklenen sayı Np’dir; kesin gözlem sayısı değildir."],
          strategy: "Hücre adediyle hücre başına olasılığı çarp.",
          steps: [
            "p=0,02 iki yüzde demektir.",
            "3000×0,02=60 bulunur.",
            "Bu ortalama yararlı mutasyon sayısı veya kesin kap sonucu değildir.",
          ],
          optionReasons: [
            "N’yi p ile çarpmak yerine böler.",
            "Olasılığı 0,20 gibi kullanır.",
            "Doğru. 0≤60≤3000 olmalıdır.",
            "Hücre başına 0,02yerine 1olasılık kullanıp 3000 hücrenin hepsini sayar.",
            "Olasılığı 0,002 gibi kullanır.",
          ],
          commonError: "Olasılığı yüzdeye çevirirken iki sıfırı kaybetmek.",
          check: "3000 hücrenin%2’si 60’tır.",
        },
      },
      {
        prompt:
          "Bir direnç aleli, uygulama olan ortamda daha çok yavru katkısı sağlıyor; uygulama yokken büyüme maliyeti taşıyor. Bu neyi gösterir?",
        options: [
          "Avantaj ve maliyet çevre koşullarına bağlıdır.",
          "Hiçbir nötr alel bulunamaz.",
          "Maliyet varsa alel DNA’da bulunamaz.",
          "Direnç aleli bütün ortamlarda kesin avantajlıdır.",
          "Çevre her bireye ihtiyaç duyduğu aleli bilinçli üretir.",
        ],
        answer: 0,
        hint: "İki ortamın göreli başarısını ayrı değerlendir.",
        explanation:
          "İlk ortamda dirençli tip avantajlıdır. İkinci ortamda maliyet dezavantaj oluşturabilir. Aynı alelin her koşulda yararlı olduğu söylenemez. Karşılaştırma aynı alelin iki çevresidir.",
        guidance: {
          knowledge: ["Mutasyon/alel etkisinin yararlılığı çevreye bağlıdır."],
          strategy: "İki ortamın göreli başarısını ayrı değerlendir.",
          steps: [
            "İlk ortamda dirençli tip avantajlıdır.",
            "İkinci ortamda maliyet dezavantaj oluşturabilir.",
            "Aynı alelin her koşulda yararlı olduğu söylenemez.",
          ],
          optionReasons: [
            "Doğru. Mutasyonun oluşma amacı ile sonraki etkisi aynı şey değildir.",
            "Verilen tek alelden tüm mutasyon sınıflarını reddeder.",
            "Kalıcı dizi varlığıyla başarı etkisini karıştırır.",
            "Maliyet bilgisine aykırıdır.",
            "Seçilimi amaçlı dizi yazımı olarak anlatır.",
          ],
          commonError: "Bir ortamda yararlı sözcüğünü evrensel etiket saymak.",
          check: "Karşılaştırma aynı alelin iki çevresidir.",
        },
      },
      {
        prompt:
          "Bir insanda güneş etkisiyle yalnız belirli deri hücrelerinde DNA mutasyonu oluşmuş; üreme hücrelerinde yok. Olağan eşeyli üremede hangi yorum doğrudur?",
        options: [
          "Deri mutasyonu mutlaka yararlıdır.",
          "Mutant deri hücresi hiçbir zaman mitoz geçiremez.",
          "Mutasyon kişide olduğu için gametlere kendiliğinden taşınır.",
          "Deri hücre soyunda sürebilir; bu yolla çocuklara aktarımı gösterilmez.",
          "Bütün çocuklar kesin aynı mutasyonu alır.",
        ],
        answer: 3,
        hint: "Mutasyonun bulunduğu hücre soyunu izle.",
        explanation:
          "Mutasyon deri hücreleriyle sınırlıdır. Bu hücreler mitozla yerel mutant soy oluşturabilir. Gamette yokken bu mutasyonun çocuklara olağan eşeyli yolla geçmesi beklenmez. Gamete katkı veren soy soruda dışlanmıştır.",
        guidance: {
          knowledge: ["Deri hücresi soyu normal gamet oluşumuna katılmaz."],
          strategy: "Mutasyonun bulunduğu hücre soyunu izle.",
          steps: [
            "Mutasyon deri hücreleriyle sınırlıdır.",
            "Bu hücreler mitozla yerel mutant soy oluşturabilir.",
            "Gamette yokken bu mutasyonun çocuklara olağan eşeyli yolla geçmesi beklenmez.",
          ],
          optionReasons: [
            "Etki ve yararlılık ölçülmemiştir.",
            "Mutasyonun kendisi her durumda bölünmeyi engellemez.",
            "Hücre soyları arasında böyle zorunlu aktarım yoktur.",
            "Doğru. Yerel mitotik aktarım ile kuşaklar arası eşeyli aktarım farklıdır.",
            "Gamette yok bilgisine aykırıdır.",
          ],
          commonError:
            "Bireyin her hücresinin aynı sonradan oluşan mutasyonu taşıdığını sanmak.",
          check: "Gamete katkı veren soy soruda dışlanmıştır.",
        },
      },
      {
        prompt:
          "Bir hayvanın bazı gametlerinde yeni DNA aleli var. Bu alelin eşeyli yavruya aktarılması için en doğrudan gerekli olay hangisidir?",
        options: [
          "Yalnız derinin bronzlaşması",
          "Mutant olmayan gametin döllenmesi",
          "Yetişkinin daha fazla kas geliştirmesi",
          "Bütün somatik hücrelerin ölmesi",
          "Aleli taşıyan gametin döllenmeye katılması",
        ],
        answer: 4,
        hint: "Bazı gamet ile döllenmeye katılan gameti ayır.",
        explanation:
          "Bütün gametlerin mutant olduğu verilmemiştir. Yeni aleli taşıyan gametin döllenmeye katılması gerekir. Bu durumda alel zigotun kalıtsal katkısına girebilir. Aktarım yolu taşıyan gametten zigota uzanır.",
        guidance: {
          knowledge: ["Gamet kökenli aktarım katkı veren gamete bağlıdır."],
          strategy: "Bazı gamet ile döllenmeye katılan gameti ayır.",
          steps: [
            "Bütün gametlerin mutant olduğu verilmemiştir.",
            "Yeni aleli taşıyan gametin döllenmeye katılması gerekir.",
            "Bu durumda alel zigotun kalıtsal katkısına girebilir.",
          ],
          optionReasons: [
            "Üreme hücresi katkısı sağlamaz.",
            "İzlenen yeni aleli getirmez.",
            "İlgili DNA alelinin zigota katılımını belirlemez.",
            "Gametle alel aktarımı için böyle bir koşul yoktur.",
            "Doğru. Mutant gamet varlığı bütün yavruların mutantlığını garantilemez.",
          ],
          commonError:
            "Gamet grubunda bulunmayı tüm yavrularda zorunlu varlık saymak.",
          check: "Aktarım yolu taşıyan gametten zigota uzanır.",
        },
      },
      {
        prompt:
          "Bir bitkinin mutant sürgün hücre soyunu içeren dalından çelik alınarak yeni birey oluşturuluyor. Hangi ifade en uygundur?",
        options: [
          "Somatik hiçbir değişim hiçbir üreme yoluyla aktarılamaz.",
          "Yeni bireyde hiçbir DNA bulunmaz.",
          "Her yeni birey kesin 3n endospermdir.",
          "Mutant somatik soy vejetatif yavruya aktarılabilir.",
          "Çelik mutlaka iki gametin birleşmesidir.",
        ],
        answer: 3,
        hint: "Çeliğe katılan soy ile yeni bireyin dokusunu bağla.",
        explanation:
          "Çelik mutant hücre soyunu içermektedir. Vejetatif yeni birey bu somatik materyalden gelişir. Bu nedenle mutasyon yeni bireye aktarılabilir; gamet zorunlu değildir. Yol çelikle vejetatif üreme olarak açıkça verilmiştir.",
        guidance: {
          knowledge: [
            "Vejetatif üremede somatik hücre soyu yeni bireye katkı verebilir.",
          ],
          strategy: "Çeliğe katılan soy ile yeni bireyin dokusunu bağla.",
          steps: [
            "Çelik mutant hücre soyunu içermektedir.",
            "Vejetatif yeni birey bu somatik materyalden gelişir.",
            "Bu nedenle mutasyon yeni bireye aktarılabilir; gamet zorunlu değildir.",
          ],
          optionReasons: [
            "Vejetatif hücre katkısını yok sayar.",
            "Hücrelerden gelişen bitkinin genomunu yok sayar.",
            "Sürgün kökenini besi dokuyla değiştirir.",
            "Doğru. Mutant soyun bütün dokulara yayılması soruda ayrıca verilmediğinden garanti edilmez.",
            "Eşeysiz materyali döllenmeyle karıştırır.",
          ],
          commonError:
            "Somatik kalıtımı yalnız hayvan eşeyli üremesiyle sınırlı düşünmek.",
          check: "Yol çelikle vejetatif üreme olarak açıkça verilmiştir.",
        },
      },
      {
        prompt:
          "Bir kuş popülasyonunda kalıtsal gaga farkları bulunuyor. Belirli besin ortamında bir gaga tipinin bireyleri daha çok üreyebilir yavru bırakıyor ve bu tip sonraki kuşaklarda artıyor. En uygun süreç hangisidir?",
        options: [
          "Doğal seçilim",
          "Mutasyonun her kuşakta aynı yere zorunlu gelmesi",
          "Yapay seçilim olduğu kesindir.",
          "Her bireyin aynı anda isteyerek gaga değiştirmesi",
          "Yalnız tesadüfi göç olduğu kesindir.",
        ],
        answer: 0,
        hint: "Özellik, başarı ve kuşak değişimini bağla.",
        explanation:
          "Gaga farkı kalıtsal olarak verilmiştir. Bu fark farklı üreme katkısıyla bağlantılıdır. Sonraki kuşaklarda tipin payının artışı doğal seçilimle uyumludur. Özellik kalıtsallığı ve üreme katkısı birlikte verilmiştir.",
        guidance: {
          knowledge: [
            "Kalıtsal özelliğe bağlı farklı üreme katkısı doğal seçilimi destekler.",
          ],
          strategy: "Özellik, başarı ve kuşak değişimini bağla.",
          steps: [
            "Gaga farkı kalıtsal olarak verilmiştir.",
            "Bu fark farklı üreme katkısıyla bağlantılıdır.",
            "Sonraki kuşaklarda tipin payının artışı doğal seçilimle uyumludur.",
          ],
          optionReasons: [
            "Doğru. Yeni alelin gereksinimle amaçlı oluşması varsayılmamıştır.",
            "Gözlem böyle bir dizi oluşumunu gerektirmez.",
            "Üreyecek kuşları insanın hedefli seçmesi belirtilmemiştir.",
            "Popülasyon seçilimini bireysel amaçlı dönüşüm sanır.",
            "Göç verisi yok; özelliğe bağlı başarı verilmiştir.",
          ],
          commonError:
            "Seçilimle mevcut tipin yayılmasını ihtiyaçla yeni tip yaratılması sanmak.",
          check: "Özellik kalıtsallığı ve üreme katkısı birlikte verilmiştir.",
        },
      },
      {
        prompt:
          "KalıtsalX tipinden 40 bireyin 30’u, S tipinden 60 bireyin 20’si üreyebiliyor. Üreyen herX 2, herS 4 yavru bırakıyor. Hangi tip toplamda daha çok yavru katkısı verir?",
        options: [
          "İkisi de 100 yavru",
          "X;80 yavru",
          "X;60 yavru",
          "S;80 yavru",
          "S;20 yavru",
        ],
        answer: 3,
        hint: "Üreyen sayısı ile yavru sayısını çarp.",
        explanation:
          "X toplam 30×2=60 yavru verir. S toplam 20×4=80 yavru verir. S daha az üreyen bireye rağmen daha fazla toplam yavru katkısı yapmıştır. 60+80=140 toplam yavru; S payı 80/140’tır.",
        guidance: {
          knowledge: [
            "Uyum başarısında üreme katılımı ve yavru miktarı birlikte önemlidir.",
          ],
          strategy: "Üreyen sayısı ile yavru sayısını çarp.",
          steps: [
            "X toplam 30×2=60 yavru verir.",
            "S toplam 20×4=80 yavru verir.",
            "S daha az üreyen bireye rağmen daha fazla toplam yavru katkısı yapmıştır.",
          ],
          optionReasons: [
            "Verilen çarpımlarla uyuşmayan eşitlik kurar.",
            "İki tipin katsayılarını karıştırır.",
            "X sayısı doğru, fakat 80’den fazla değildir.",
            "Doğru. X’in daha yüksek üreme katılım oranı tek başına toplam katkıyı belirlemez.",
            "Üreyen birey sayısını yavru sayısı sanır.",
          ],
          commonError:
            "Yalnız hayatta kalan veya üreyen birey sayısına bakmak.",
          check: "60+80=140 toplam yavru; S payı 80/140’tır.",
        },
      },
      {
        prompt:
          "Üreme gerçekleşmeden önce bir popülasyonda 20 dirençli ve 180 duyarlı; uygulama sonrasında 10 dirençli ve 30 duyarlı sayılıyor. Dirençliler için hangisi doğrudur?",
        options: [
          "Sayı arttı, pay azaldı.",
          "Sayı azaldı, pay%10’dan%25’e yükseldi.",
          "Pay değişmedi.",
          "Sayı ve pay birlikte arttı.",
          "Sayı ve pay birlikte azaldı.",
        ],
        answer: 1,
        hint: "İki zamanda toplam ve oranı ayrı bul.",
        explanation:
          "İlk pay 20/200=%10’dur. Son pay 10/40=%25’tir. Dirençli sayı 20’den 10’a azalırken payı artmıştır. İki oranın paydaları 200 ve 40 olarak farklıdır.",
        guidance: {
          knowledge: ["Pay artışı mutlak sayı artışı demek değildir."],
          strategy: "İki zamanda toplam ve oranı ayrı bul.",
          steps: [
            "İlk pay 20/200=%10’dur.",
            "Son pay 10/40=%25’tir.",
            "Dirençli sayı 20’den 10’a azalırken payı artmıştır.",
          ],
          optionReasons: [
            "Hem sayının hem payın yönünü ters yazar.",
            "Doğru. Üreme henüz olmadığı soruda açıkça verilmiştir.",
            "10/40 ile 20/200 eşit değildir.",
            "10<20 olduğundan sayı artmamıştır.",
            "%25>%10 olduğundan pay azalmamıştır.",
          ],
          commonError:
            "Toplam küçülürken bir grubun payını sayısıyla eşitlemek.",
          check: "İki oranın paydaları 200 ve 40 olarak farklıdır.",
        },
      },
      {
        prompt:
          "Varsayımsal bir uygulamada dirençli soyun sağ kalma oranı%40, duyarlı soyunki%5’tir. Başlangıçta her tip 100 birey; üreme henüz yok. Dirençli sayısı ve son payı nedir?",
        options: [
          "40 birey; %40",
          "45 birey; %50",
          "40 birey; yaklaşık%88,9",
          "100 birey; %100",
          "5 birey; %11,1",
        ],
        answer: 2,
        hint: "Önce iki sağ kalan sayısını hesapla.",
        explanation:
          "Dirençli 100×0,40=40 kalır. Duyarlı 100×0,05=5 kalır. Son dirençli payı 40/45≈%88,9’dur; dirençli mutlak sayı yine azalmıştır. 40+5=45 son toplamdır.",
        guidance: {
          knowledge: [
            "Sağ kalma yüzdesi tip başına uygulanır; son pay yeni toplamdan bulunur.",
          ],
          strategy: "Önce iki sağ kalan sayısını hesapla.",
          steps: [
            "Dirençli 100×0,40=40 kalır.",
            "Duyarlı 100×0,05=5 kalır.",
            "Son dirençli payı 40/45≈%88,9’dur; dirençli mutlak sayı yine azalmıştır.",
          ],
          optionReasons: [
            "Sağ kalma oranını son toplam içindeki payla karıştırır.",
            "Toplamı tek gruba yazar ve yeni oranı güncellemez.",
            "Doğru. Yüksek pay, uygulamanın dirençliye hiç zarar vermediği anlamına gelmez.",
            "Dirençli soyda%60kaybı ve duyarlı sağ kalanı yok sayar.",
            "Duyarlı grubun sonucunu dirençliye yazar.",
          ],
          commonError: "Direnç kavramını tam etkilenmezlik sanmak.",
          check: "40+5=45 son toplamdır.",
        },
      },
      {
        prompt:
          "Kapalı haploit soy modelinde başlangıçta dirençli bakteri 0, duyarlı 1000. Mutasyon, gen aktarımı ve göç kapalı; uygulama yalnız sağ kalma oranlarını değiştiriyor. Birkaç kuşak sonra dirençli sayı için ne söylenir?",
        options: [
          "Mutlaka 1000 olur.",
          "Sayı verisi olmadan kesin%50 olur.",
          "0 olarak kalır.",
          "Her kuşakta kesin bir dirençli eklenir.",
          "Duyarlıların hepsi bilinçli biçimde dirençliye dönüşür.",
        ],
        answer: 2,
        hint: "Yeni direnç kaynağı olup olmadığını denetle.",
        explanation:
          "Dirençli soy başlangıçta yoktur. Yeni direnç oluşturabilecek/taşıyabilecek üç yol kapalıdır. Yalnız seçilimle dirençli soy sayısı 0 olarak kalır. 0×her sonlu üreme çarpanı=0.",
        guidance: {
          knowledge: [
            "Seçilim modelde bulunmayan aleli kendiliğinden yaratmaz.",
          ],
          strategy: "Yeni direnç kaynağı olup olmadığını denetle.",
          steps: [
            "Dirençli soy başlangıçta yoktur.",
            "Yeni direnç oluşturabilecek/taşıyabilecek üç yol kapalıdır.",
            "Yalnız seçilimle dirençli soy sayısı 0 olarak kalır.",
          ],
          optionReasons: [
            "Seçilime yeni soy yaratma görevi yükler.",
            "Sıfır başlangıca kaynak olmadan pay ekler.",
            "Doğru. Gerçek doğada ek mekanizmalar olabilir; bu modelde dışlanmıştır.",
            "Sabit yeni mutasyon varsayımı ekler.",
            "Amaçlı bireysel dönüşüm modelde yoktur.",
          ],
          commonError:
            "Model varsayımlarını gerçek dünyadan ek olaylarla sessizce değiştirmek.",
          check: "0×her sonlu üreme çarpanı=0.",
        },
      },
      {
        prompt:
          "Bir bakteri grubunda uygulama öncesi nadir dirençli tip var. Uygulamada duyarlılar daha çok eleniyor; sağ kalan dirençliler çoğalıyor. Gözlenen direnç artışının en doğrudan açıklaması hangisidir?",
        options: [
          "Önceden bulunan dirençli tipin seçilimle artması",
          "Dirençli olmak yalnız bakterinin çabasıdır.",
          "Bütün duyarlılar aynı anda dirençliye dönüşmüştür.",
          "Uygulama her bakteriye aynı yararlı mutasyonu zorunlu yazmıştır.",
          "Direnç hiçbir zaman kalıtsal olamaz.",
        ],
        answer: 0,
        hint: "Tipin oluşum zamanı ile çoğalmasını ayır.",
        explanation:
          "Dirençli tip uygulamadan önce vardır. Uygulama tiplerin göreli başarısını değiştirir. Sağ kalanların üremesi dirençli tipin payını artırabilir. Başlangıçtaki nadir tip sonuca yeterli kaynak sağlar.",
        guidance: {
          knowledge: ["Önceden var olan kalıtsal fark seçilimle yayılabilir."],
          strategy: "Tipin oluşum zamanı ile çoğalmasını ayır.",
          steps: [
            "Dirençli tip uygulamadan önce vardır.",
            "Uygulama tiplerin göreli başarısını değiştirir.",
            "Sağ kalanların üremesi dirençli tipin payını artırabilir.",
          ],
          optionReasons: [
            "Doğru. Yeni mutasyon oluşması bu verinin zorunlu açıklaması değildir.",
            "Kalıtsal mekanizmayı amaçlı iradeyle değiştirir.",
            "Soruda duyarlıların daha çok elendiği verilmiştir.",
            "Önceden direnç ve farklı elenme verisini yok sayar.",
            "Soruda kalıtsal tip farkı kabul edilmiştir.",
          ],
          commonError:
            "Özelliğin seçilmesini özelliğin ihtiyaçla yaratılması saymak.",
          check: "Başlangıçtaki nadir tip sonuca yeterli kaynak sağlar.",
        },
      },
      {
        prompt:
          "Direnç geni taşıyan bir plazmit, üreme olmaksızın bir bakteriden başka bakteriye geçiyor. Doğrudan hangi mekanizma gözlenmiştir?",
        options: [
          "Mayozla sperm oluşumu",
          "Çimlenmede besi dokunun büyümesi",
          "Yatay gen aktarımı",
          "Yalnız yeni nokta mutasyonu",
          "Yalnız doğal seçilimle farklı yavru sayısı",
        ],
        answer: 2,
        hint: "Genin bir hücreden diğerine geçtiğini izle.",
        explanation:
          "Plazmit üzerindeki gen önceden vardır. Başka hücreye aktarılmıştır. Gözlenen olay mevcut genin yatay aktarımıdır; yeni dizi oluşumu veya farklı üreme şart değildir. Olay sırasında genin kaynağı değişmemiş; bulunduğu hücre değişmiştir.",
        guidance: {
          knowledge: [
            "Yatay gen aktarımı seçilim ve bölünmeden ayrı olabilir.",
          ],
          strategy: "Genin bir hücreden diğerine geçtiğini izle.",
          steps: [
            "Plazmit üzerindeki gen önceden vardır.",
            "Başka hücreye aktarılmıştır.",
            "Gözlenen olay mevcut genin yatay aktarımıdır; yeni dizi oluşumu veya farklı üreme şart değildir.",
          ],
          optionReasons: [
            "Bakterilerdeki plazmit aktarımına gamet modeli ekler.",
            "Farklı organizma ve süreç bağlamıdır.",
            "Doğru. Sonraki seçilim bu genin yaygınlığını ayrıca etkileyebilir.",
            "Mevcut genin hücre değiştirmesini dizi oluşumuyla karıştırır.",
            "Soruda üreme olmaksızın aktarım verilmiştir.",
          ],
          commonError: "Dirençle ilgili bütün olaylara seçilim adını vermek.",
          check:
            "Olay sırasında genin kaynağı değişmemiş; bulunduğu hücre değişmiştir.",
        },
      },
      {
        prompt:
          "Bir bakteriye karşı farklı antimikrobiyallerin etkisi uygun laboratuvar koşullarında karşılaştırılıyor. Sonucun en uygun kullanım sınırı hangisidir?",
        options: [
          "Duyarlılık sonucu uzman değerlendirmesine veri sağlar.",
          "Sonuç bütün hastalarda aynı dozu kesin belirler.",
          "Hiçbir laboratuvar bulgusu yararlı değildir.",
          "Antibiyotikler bütün virüsleri de aynı biçimde öldürür.",
          "Direnç görülen her durumda kişi kendi dozunu artırmalıdır.",
        ],
        answer: 0,
        hint: "Laboratuvar kanıtıyla klinik kararı ayır.",
        explanation:
          "Test belirli bakterinin belirli koşullardaki duyarlılığını ölçer. Bu sonuç uzman değerlendirmesine katkı verebilir. Kişinin kendi başına dozu artırması sonucu testten çıkmaz. Ölçümün koşulu ile uygulamanın koşulu aynı olmak zorunda değildir.",
        guidance: {
          knowledge: [
            "Duyarlılık testi tedavi değerlendirmesine veri sağlar; tek başına öz tedavi dozu vermez.",
          ],
          strategy: "Laboratuvar kanıtıyla klinik kararı ayır.",
          steps: [
            "Test belirli bakterinin belirli koşullardaki duyarlılığını ölçer.",
            "Bu sonuç uzman değerlendirmesine katkı verebilir.",
            "Kişinin kendi başına dozu artırması sonucu testten çıkmaz.",
          ],
          optionReasons: [
            "Doğru. Vücuttaki etki ve uygun tedavi için ek klinik bilgiler gerekir.",
            "Kişi ve klinik bağlamı yok sayar.",
            "Testin sağladığı sınırlı ama gerçek bilgiyi reddeder.",
            "Bakteri testini virüs hedefine geneller.",
            "Ölçümden yetkisiz tedavi kararı çıkarır.",
          ],
          commonError:
            "Öğretim veya laboratuvar verisini kişisel tedavi talimatı saymak.",
          check:
            "Ölçümün koşulu ile uygulamanın koşulu aynı olmak zorunda değildir.",
        },
      },
      {
        prompt:
          "Bir tarlada istenmeyen otları etkileyen madde için kalıtsal direnç taşıyan bireyler daha çok tohum bırakıyor. Kullanılan pestisit grubu ve süreç hangisidir?",
        options: [
          "Fungusit; yalnız yapay seçilim",
          "İnsektisit; iki spermin birleşmesi",
          "Herbisit; doğal seçilim",
          "Antibiyotik; çevresel boy uzaması",
          "Herbisit; her bireyin amaçlı aynı mutasyonu üretmesi",
        ],
        answer: 2,
        hint: "Hedef organizmayı ve üreme farkını birlikte oku.",
        explanation:
          "Hedef istenmeyen ottur; yani bitkidir. Bu amaçlı pestisit grubu herbisittir. Dirençli tiplerin daha çok tohum katkısı doğal seçilimle uyumludur. Seçilen özellik çevrede göreli üreme başarısını etkiliyor.",
        guidance: {
          knowledge: [
            "Herbisit bitkilere yöneliktir; kalıtsal farklı başarı seçilime yol açabilir.",
          ],
          strategy: "Hedef organizmayı ve üreme farkını birlikte oku.",
          steps: [
            "Hedef istenmeyen ottur; yani bitkidir.",
            "Bu amaçlı pestisit grubu herbisittir.",
            "Dirençli tiplerin daha çok tohum katkısı doğal seçilimle uyumludur.",
          ],
          optionReasons: [
            "Hedef mantar değildir; hedefli damızlık seçimi de yoktur.",
            "Böcek hedefini bitkiyle, üremeyi çift döllenmeyle karıştırır.",
            "Doğru. İnsan maddeyi uygulasa da dirençli otları damızlık seçtiği verilmemiştir.",
            "Hedef ve kalıtsal üreme süreci yanlış sınıflanır.",
            "Madde grubu doğru, mekanizma amaçlı dönüşüm değildir.",
          ],
          commonError: "İnsan uyguladı diye bütün sonucu yapay seçilim saymak.",
          check: "Seçilen özellik çevrede göreli üreme başarısını etkiliyor.",
        },
      },
      {
        prompt:
          "Bir pestisit uygulamasından sonra hedef böcek azalırken hedef dışı yararlı böcekler de azalıyor. Bu verinin en doğrudan gösterdiği risk hangisidir?",
        options: [
          "Yararlı böceklerin azalması kesin yeni tür oluşumudur.",
          "Azalan her böcek mutlaka dirençli olmuştur.",
          "Bütün pestisitler her yerde aynı süre kalır.",
          "Uygulamanın çevreye hiçbir etkisi yoktur.",
          "Uygulamanın hedef dışı canlıları da etkilemesi",
        ],
        answer: 4,
        hint: "Ölçülen hedef dışı etkiyi belirt.",
        explanation:
          "Hedef popülasyonun azalması beklenen etkiyle uyumludur. Yararlı hedef dışı böceklerde de azalma gözlenmiştir. Bu uygulamada hedef dışı ekolojik etki vardır; her maddeye aynı kalıcılık atanmaz. Hedef dışı grubun sayısı doğrudan ölçülmüştür.",
        guidance: {
          knowledge: [
            "Pestisitler yalnız hedef türle sınırlı etki göstermeyebilir.",
          ],
          strategy: "Ölçülen hedef dışı etkiyi belirt.",
          steps: [
            "Hedef popülasyonun azalması beklenen etkiyle uyumludur.",
            "Yararlı hedef dışı böceklerde de azalma gözlenmiştir.",
            "Bu uygulamada hedef dışı ekolojik etki vardır; her maddeye aynı kalıcılık atanmaz.",
          ],
          optionReasons: [
            "Ölçülen hedef dışı sayı azalmasından yeni tür veya üreme izolasyonu sonucu çıkarılamaz.",
            "Azalma, kalıtsal direnç tipinin ölçümü değildir.",
            "Bu veride kalıcılık veya bütün maddeler karşılaştırması yoktur.",
            "Gözlenen hedef dışı azalmayı reddeder.",
            "Doğru. Besin ağı ve ekosistem etkileri için başka ölçümler gerekebilir.",
          ],
          commonError:
            "Tek hedefteki başarıyı bütün ekosistem için zarar yokluğu saymak.",
          check: "Hedef dışı grubun sayısı doğrudan ölçülmüştür.",
        },
      },
      {
        prompt:
          "RNA genomlu bir virüste kalıtsal genom değişimi ile hücresel bir canlıda protein miktarı artışı karşılaştırılıyor. Hangi ifade doğrudur?",
        options: [
          "Protein artışı mutlaka tüm kromozomların iki katına çıkmasıdır.",
          "Virüs genomundaki RNA dizi değişimiyle hücresel protein miktarı değişimi ayrıdır.",
          "Her hücrenin kalıtsal genomu yalnız proteindir.",
          "Bütün virüslerin bütün ilaçlara direnci aynıdır.",
          "RNA genomlu virüslerde hiçbir kalıtsal değişim olmaz.",
        ],
        answer: 1,
        hint: "Her örnekte hangi molekülün kalıtsal genom olduğunu belirle.",
        explanation:
          "RNA genomlu virüste genom dizisi değişimi kalıtsal değişim olabilir. Hücrede protein miktarının artışı DNA dizisi değişimini gerektirmez. İki olayı yalnız miktar değişti diye aynı genom mutasyonu sayamayız. Molekülün genomdaki rolü, kendi adı kadar önemlidir.",
        guidance: {
          knowledge: ["Genom materyali ile gen ifadesi ölçümü farklıdır."],
          strategy:
            "Her örnekte hangi molekülün kalıtsal genom olduğunu belirle.",
          steps: [
            "RNA genomlu virüste genom dizisi değişimi kalıtsal değişim olabilir.",
            "Hücrede protein miktarının artışı DNA dizisi değişimini gerektirmez.",
            "İki olayı yalnız miktar değişti diye aynı genom mutasyonu sayamayız.",
          ],
          optionReasons: [
            "Miktar ölçümünden kromozom değişimi çıkarır.",
            "Doğru. Bu karşılaştırma bütün virüslerin aynı mutasyon hızında olduğunu söylemez.",
            "Hücresel DNA genomunu reddeder.",
            "Hedef ve mekanizma farklılıklarını veri olmadan geneller.",
            "Genom dizisinin değişebilirliğini yok sayar.",
          ],
          commonError:
            "Virüs genom örneğini bütün hücresel RNA/protein değişimlerine taşımak.",
          check: "Molekülün genomdaki rolü, kendi adı kadar önemlidir.",
        },
      },
      {
        prompt:
          "Bir yetiştirici her kuşakta yüksek süt verimi kalıtsal olarak doğrulanan inekleri damızlık seçiyor. Doğrudan hangi süreç uygulanıyor?",
        options: [
          "Süt artışının çocuklara ihtiyaçla bilinçli yazılması",
          "Her kuşakta yeni türün kesin oluşması",
          "Yalnız rastgele çevresel değişim",
          "Tohum dormansisi",
          "Yapay seçilim",
        ],
        answer: 4,
        hint: "Kararı kimin, hangi özelliğe göre verdiğini belirle.",
        explanation:
          "Hedef yüksek süt verimidir. Üreyecek bireyleri yetiştirici seçmektedir. Kalıtsal özelliğe yönelik bu üreme seçimi yapay seçilimdir. Damızlık kararı insanın seçtiği kalıtsal ölçüte dayanır.",
        guidance: {
          knowledge: [
            "Yapay seçilim üreyecek bireylerin insan tarafından hedefli seçimidir.",
          ],
          strategy: "Kararı kimin, hangi özelliğe göre verdiğini belirle.",
          steps: [
            "Hedef yüksek süt verimidir.",
            "Üreyecek bireyleri yetiştirici seçmektedir.",
            "Kalıtsal özelliğe yönelik bu üreme seçimi yapay seçilimdir.",
          ],
          optionReasons: [
            "Kalıtsal seçimi amaçlı alel üretimine çevirir.",
            "Türleşme sonucu verilmemiştir.",
            "Hedefli damızlık seçimi soruda açıktır.",
            "Hayvan yetiştiriciliğindeki seçimin süreç adı değildir.",
            "Doğru. Seçim tek başına yeni DNA aleli oluşturmak zorunda değildir.",
          ],
          commonError: "Hedefli seçimi doğrudan yeni mutasyon üretimi saymak.",
          check: "Damızlık kararı insanın seçtiği kalıtsal ölçüte dayanır.",
        },
      },
      {
        prompt:
          "İnsanların kirlettiği bir ortamda kalıtsal toleranslı bakteriler istemeden daha çok çoğalıyor; insanlar üreyecek tek tek bakterileri seçmiyor. En uygun sınıflama hangisidir?",
        options: [
          "Bakterilerde kalıtsal farklılık olamaz.",
          "İnsan kaynaklı ortamda doğal seçilim",
          "Çevre hiçbir seçici etki yapamaz.",
          "Her bakteri aynı anda yeni aleli istemiştir.",
          "İnsan varsa her olay mutlaka yapay seçilimdir.",
        ],
        answer: 1,
        hint: "Ortamı değiştiren kişi ile üreme başarısını ayır.",
        explanation:
          "Çevre değişimi insan kaynaklıdır. Bakterilerin farklı başarısı kendi kalıtsal toleranslarıyla ilişkilidir. Hedefli ebeveyn seçimi olmadığından olay doğal seçilimle uyumludur. Ölçüt kontrollü damızlık kararıdır.",
        guidance: {
          knowledge: [
            "İnsan kaynaklı çevre değişimi ile hedefli damızlık seçimi farklıdır.",
          ],
          strategy: "Ortamı değiştiren kişi ile üreme başarısını ayır.",
          steps: [
            "Çevre değişimi insan kaynaklıdır.",
            "Bakterilerin farklı başarısı kendi kalıtsal toleranslarıyla ilişkilidir.",
            "Hedefli ebeveyn seçimi olmadığından olay doğal seçilimle uyumludur.",
          ],
          optionReasons: [
            "Soruda kalıtsal tolerans farkı verilmiştir.",
            "Doğru. Yapay seçilim için hedefli üreme katkısı seçimi aranır.",
            "Farklı çoğalma gözlemine aykırıdır.",
            "Kalıtsal farkı amaçlı bireysel dönüşümle değiştirir.",
            "İnsan varlığını hedefli damızlık seçimiyle eşitler.",
          ],
          commonError:
            "Yapay/doğal ayrımını yalnız insanın varlığına indirgemek.",
          check: "Ölçüt kontrollü damızlık kararıdır.",
        },
      },
      {
        prompt:
          "Ortak ortamda kalıtsal farkı kabul edilenX hattının verim/kuraklık puanı 10/3, Y’nin 6/9. Yalnız verimi hedefleyerekX seçiliyor. Hangisi doğrudur?",
        options: [
          "Kuraklık puanları seçimle otomatik eşitlenir.",
          "Seçim yeni kuraklık alelini zorunlu oluşturur.",
          "X her özellikteY’den yüksektir.",
          "Y daha verimlidir.",
          "Verim içinX seçilir; kuraklık puanındaY daha yüksektir.",
        ],
        answer: 4,
        hint: "Aynı seçilen hattın ikinci puanını da oku.",
        explanation:
          "X’in verimi 10, Y’nin 6’sından yüksektir. X’in kuraklık puanı 3, Y’nin 9’undan düşüktür. Verim hedefi X’i seçtirir; kuraklık üstünlüğü sağlanmamıştır. İki özellik iki ayrı karşılaştırmadır.",
        guidance: {
          knowledge: [
            "Bir özellikte seçim diğer özelliklerin hepsini otomatik iyileştirmez.",
          ],
          strategy: "Aynı seçilen hattın ikinci puanını da oku.",
          steps: [
            "X’in verimi 10, Y’nin 6’sından yüksektir.",
            "X’in kuraklık puanı 3, Y’nin 9’undan düşüktür.",
            "Verim hedefi X’i seçtirir; kuraklık üstünlüğü sağlanmamıştır.",
          ],
          optionReasons: [
            "Ölçülmüş 3 ve 9değerlerine ek sonuç uydurur.",
            "Damızlık seçimi yeni alel garantisi değildir.",
            "3<9 kuraklık verisine aykırıdır.",
            "6<10 verim sıralamasını ters çevirir.",
            "Doğru. Bir hedefe göre üstünlük bütün çevrelere üstünlük değildir.",
          ],
          commonError: "Islah hedefini bütün özellikler için kazanç saymak.",
          check: "İki özellik iki ayrı karşılaştırmadır.",
        },
      },
      {
        prompt:
          "Bir popülasyonda altı kalıtsal hat varken yalnız iki hat damızlık bırakılıyor; yeni mutasyon ve göç yok. Çeşitlilik için hangisi doğrudur?",
        options: [
          "Her seçim çeşitliliği mutlaka artırır.",
          "Temsil edilen hat çeşitliliği azalabilir.",
          "Seçim DNA’nın varlığını tamamen kaldırır.",
          "Yeni mutasyon olmadığı için hiçbir oran değişemez.",
          "Hat sayısı seçilince kesin on ikiye çıkar.",
        ],
        answer: 1,
        hint: "Başlangıç ve üremeye katılan hat sayısını karşılaştır.",
        explanation:
          "Altı hattan yalnız ikisi üreme katkısı verecektir. Bazı kalıtsal çeşitlerin temsili kaybolabilir. Seçilim bu durumda çeşitliliği mutlaka artırmaz. İki seçilen hat altı başlangıç hattan küçüktür.",
        guidance: {
          knowledge: [
            "Seçim mevcut temsil dağılımını daraltabilir; yeni alel üretmek zorunda değildir.",
          ],
          strategy: "Başlangıç ve üremeye katılan hat sayısını karşılaştır.",
          steps: [
            "Altı hattan yalnız ikisi üreme katkısı verecektir.",
            "Bazı kalıtsal çeşitlerin temsili kaybolabilir.",
            "Seçilim bu durumda çeşitliliği mutlaka artırmaz.",
          ],
          optionReasons: [
            "Dört hattın üreme dışı kalmasıyla çelişir.",
            "Doğru. Alel sıklığı artışı, alel çeşidi sayısı artışıyla aynı değildir.",
            "Üreyen iki hatta kalıtsal materyal vardır.",
            "Mevcut hatların üreme katkısı farklılaşabilir.",
            "Seçilen iki hattı yeni hat üretimi sanır.",
          ],
          commonError:
            "Alel payının artmasıyla toplam çeşit sayısını karıştırmak.",
          check: "İki seçilen hat altı başlangıç hattan küçüktür.",
        },
      },
      {
        prompt:
          "P çalışmasında mevcut bitki çeşitlerinden belli özelliği taşıyanlar üretilmek üzere seçiliyor. Q’da belirli bir gen aktarılıyor. İşlem ayrımı hangisidir?",
        options: [
          "Q’da hiçbir genom değişikliği olamaz.",
          "P’de her bireye gen aktarılmıştır.",
          "P veQ’da zorunlu yalnız mayoz yapılır.",
          "P yapay seçilim; Q genetik mühendisliği",
          "İki yöntem hiçbir zaman aynı programda kullanılamaz.",
        ],
        answer: 3,
        hint: "Her çalışmada genoma doğrudan müdahale olup olmadığını sor.",
        explanation:
          "P’de mevcut bireylerin üreme katkısı seçilmiştir. Q’da belirli genin aktarımı yapılmıştır. P yapay seçilim, Q genetik mühendisliği işlemidir; bir ıslah programında birlikte kullanılabilirler. Seçme ve aktarma fiilleri farklı basamakları tanımlar.",
        guidance: {
          knowledge: [
            "Seçilim ile doğrudan genetik aktarım farklı basamaklardır.",
          ],
          strategy:
            "Her çalışmada genoma doğrudan müdahale olup olmadığını sor.",
          steps: [
            "P’de mevcut bireylerin üreme katkısı seçilmiştir.",
            "Q’da belirli genin aktarımı yapılmıştır.",
            "P yapay seçilim, Q genetik mühendisliği işlemidir; bir ıslah programında birlikte kullanılabilirler.",
          ],
          optionReasons: [
            "Belirli gen aktarımı bilgisine aykırıdır.",
            "SorudaP için böyle bir işlem yoktur.",
            "Gen aktarımının doğrudan müdahalesini yok sayar.",
            "Doğru. Aynı hedefe hizmet etmeleri aynı işlem olduklarını göstermez.",
            "Farklı mekanizmalar birlikte uygulanabilir.",
          ],
          commonError: "Ortak ıslah amacını aynı moleküler işlem sanmak.",
          check: "Seçme ve aktarma fiilleri farklı basamakları tanımlar.",
        },
      },
      {
        prompt:
          "Genotipleri farklı bir anaç ve kalem aşılanıyor; gen aktarımı veya mutasyon yok kabul ediliyor. Anaç dokusu için hangisi doğrudur?",
        options: [
          "Anaç dokusu kendi genotipini korur.",
          "Aşı her durumda yeni tür oluşturur.",
          "Anaç otomatik 3n endosperm olur.",
          "Anaç ve kalem yeni tek gamet oluşturur.",
          "Anaçtaki tüm DNA kaleminkiyle kesin yer değiştirir.",
        ],
        answer: 0,
        hint: "Dokunun hangi başlangıç bireyinden geldiğini izle.",
        explanation:
          "Anaç ve kalem farklı hücre soylarıdır. Aşı yeni bir sperm-yumurta birleşmesi değildir. Verilen varsayımlarda anaç dokusu kendi başlangıç genotipini korur. Soruda gen aktarımı ve mutasyon dışlanmıştır.",
        guidance: {
          knowledge: [
            "Aşılamada doku soyları doğrudan birbirinin genomuna dönüşmez.",
          ],
          strategy: "Dokunun hangi başlangıç bireyinden geldiğini izle.",
          steps: [
            "Anaç ve kalem farklı hücre soylarıdır.",
            "Aşı yeni bir sperm-yumurta birleşmesi değildir.",
            "Verilen varsayımlarda anaç dokusu kendi başlangıç genotipini korur.",
          ],
          optionReasons: [
            "Doğru. Kalem meyve verebilir; bu, anaç hücrelerinin kalem genotipine dönüşmesi değildir.",
            "Üreme izolasyonu veya yeni tür verisi yoktur.",
            "Aşı dokusunu tohumdaki döllenme ürünüyle karıştırır.",
            "Aşılamanın hücre soyu sınırlarını siler.",
            "Doku birleşmesini genom aktarımı sanır.",
          ],
          commonError:
            "Aşılamayı bütün hücrelerin genotipini karıştıran döllenme sanmak.",
          check: "Soruda gen aktarımı ve mutasyon dışlanmıştır.",
        },
      },
      {
        prompt:
          "Bir bitki özelliğinde genotip ve sıcaklık etkilerini birlikte araştırmak için en uygun düzen hangisidir?",
        options: [
          "Yalnız bir genotipi tek sıcaklıkta ölçmek",
          "Her iki genotipi her iki sıcaklıkta tekrarlı, rastgele yerleşimle yetiştirmek",
          "Hiç ölçüm yapmadan boyu genotip diye adlandırmak",
          "Her genotipi yalnız farklı bir sıcaklıkta tek bireyle yetiştirmek",
          "Bir gruba ayrıca farklı su ve ışık vermek",
        ],
        answer: 1,
        hint: "İki değişkenin bütün çaprazlarını ve tekrarını kur.",
        explanation:
          "İki genotip aynı sıcaklıklarda karşılaştırılmalıdır. Her sıcaklıkta her genotipten yeterli tekrar gerekir. Rastgele yerleşim diğer konum etkilerini azaltır. Dört genotip×çevre kombinasyonu tekrarlanır.",
        guidance: {
          knowledge: [
            "Faktöriyel karşılaştırma her genotipi her çevrede sınar.",
          ],
          strategy: "İki değişkenin bütün çaprazlarını ve tekrarını kur.",
          steps: [
            "İki genotip aynı sıcaklıklarda karşılaştırılmalıdır.",
            "Her sıcaklıkta her genotipten yeterli tekrar gerekir.",
            "Rastgele yerleşim diğer konum etkilerini azaltır.",
          ],
          optionReasons: [
            "İki etmenin karşılaştırması yoktur.",
            "Doğru. Bu düzen hem ayrı etkileri hem etkileşimi inceleyebilir.",
            "Gözlem ve karşılaştırma temeli yoktur.",
            "Genotip ve sıcaklık etkilerini birbirinden ayıramaz.",
            "İstenen iki etmenin yanına karıştırıcı değişkenler ekler.",
          ],
          commonError: "Aynı anda değişen iki etmeni tek bir nedene bağlamak.",
          check: "Dört genotip×çevre kombinasyonu tekrarlanır.",
        },
      },
      {
        prompt:
          "Bir DNA değişimi incelenen ortamda protein işlevini ve üreme başarısını ölçülebilir biçimde değiştirmiyor. Bu bulgu için en uygun yorum hangisidir?",
        options: [
          "Mutasyon mutlaka bireyin ihtiyacı için oluşmuştur.",
          "Her başka çevrede de kesin etkisizdir.",
          "DNA değişimi yoktur.",
          "Bütün mutasyonlar öldürücüdür.",
          "Bu koşullarda nötr etkiyle uyumludur.",
        ],
        answer: 4,
        hint: "Ölçülen bağlamdaki etkisizliği doğru sınıra koy.",
        explanation:
          "Değişimin DNA’da bulunduğu verilmiştir. İncelenen işlev ve başarıda ölçülebilir etki yoktur. Bu ortamda nötr etkiyle uyumludur; hiç mutasyon olmadığı sonucu çıkmaz. Dizi ölçümü ile fenotip/başarı ölçümü farklıdır.",
        guidance: {
          knowledge: ["Her mutasyon zorunlu yararlı veya zararlı değildir."],
          strategy: "Ölçülen bağlamdaki etkisizliği doğru sınıra koy.",
          steps: [
            "Değişimin DNA’da bulunduğu verilmiştir.",
            "İncelenen işlev ve başarıda ölçülebilir etki yoktur.",
            "Bu ortamda nötr etkiyle uyumludur; hiç mutasyon olmadığı sonucu çıkmaz.",
          ],
          optionReasons: [
            "Etkinin yokluğu amaçlı oluşum göstermez.",
            "İncelenmemiş çevrelere sınırı aşar.",
            "Soruda değişimin saptandığı açıkça verilmiştir.",
            "Yaşama ve başarıdaki gözleme aykırı evrensel iddiadır.",
            "Doğru. Başka çevrede veya başka ölçütte etki olup olmadığı ayrıca sınanır.",
          ],
          commonError: "Görünür etki yoksa dizi değişimi de yoktur demek.",
          check: "Dizi ölçümü ile fenotip/başarı ölçümü farklıdır.",
        },
      },
      {
        prompt:
          "Bir popülasyonda yıllar içinde koyu renkli bireylerin payı artmış. Rengin kalıtsallığı, göç ve bireylerin üreme katkıları ölçülmemiş. Yalnız bu gözlem hangi sonucu verir?",
        options: [
          "Fenotip payı değişmiştir; mekanizma için ek veri gerekir.",
          "Koyu tip sayısı mutlaka artmıştır.",
          "Hiçbir biyolojik değişim gözlenmemiştir.",
          "Doğal seçilim tek mümkün neden olarak kanıtlanmıştır.",
          "Her birey kesin aynı DNA mutasyonunu geçirmiştir.",
        ],
        answer: 0,
        hint: "Gözlenen değişim ile mekanizma kanıtını ayır.",
        explanation:
          "Ölçülen olgu koyu fenotip payının artmasıdır. Kalıtsallık ve farklı üreme katkısı hakkında veri yoktur. Doğal seçilim olası açıklamalardan biri olabilir; tek neden olarak kesinleşmez. Pay artışı hem sayı hem neden bilgisini tek başına vermez.",
        guidance: {
          knowledge: [
            "Popülasyon oran değişimi tek başına nedenin seçilim olduğunu kanıtlamaz.",
          ],
          strategy: "Gözlenen değişim ile mekanizma kanıtını ayır.",
          steps: [
            "Ölçülen olgu koyu fenotip payının artmasıdır.",
            "Kalıtsallık ve farklı üreme katkısı hakkında veri yoktur.",
            "Doğal seçilim olası açıklamalardan biri olabilir; tek neden olarak kesinleşmez.",
          ],
          optionReasons: [
            "Doğru. Çevresel fenotip yanıtı veya göç gibi alternatifler incelenmelidir.",
            "Toplam popülasyon sayısı verilmediğinden mutlak sayı bilinmez.",
            "Fenotip payındaki ölçülmüş değişimi reddeder.",
            "Kalıtsallık ve farklı başarı ölçülmemiştir.",
            "Birey düzeyinde dizi bilgisi yoktur.",
          ],
          commonError:
            "Oran eğilimini tek bir mekanizmanın kesin kanıtı saymak.",
          check: "Pay artışı hem sayı hem neden bilgisini tek başına vermez.",
        },
      },
    ],
    source:
      "MEB ve OGM kapsamı temel alınarak hazırlanmış özgün anlatım, öğretim modelleri ve sorular. Resmî sınav sorusu değildir.",
  },
];
export const forge025BiologyTopics: Record<string, string> = Object.fromEntries(
  packs025.map((p) => [p.id, p.topic]),
);
export const forge025BiologyGuides: LessonGuide[] = packs025.map(
  ({ id, minutes, objectives, sections, examples, recall, source }) => ({
    id,
    minutes,
    objectives,
    sections,
    examples,
    recall,
    source,
  }),
);
export const forge025BiologyLessons: Lesson[] = packs025.map((p) => ({
  id: p.id,
  subjectId: "ayt-biyoloji",
  title: txt(p.title),
  minutes: p.minutes,
  objectives: p.objectives.map(txt),
  body: p.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  source: txt(p.source),
  tags: [p.topic, "Özgün öğretim soruları"],
  questions: p.items.map((q, i) => ({
    id: `f025b-${p.id}-${i + 1}`,
    prompt: txt(q.prompt),
    options: q.options.map(txt),
    answer: q.answer,
    hint: txt(q.hint),
    explanation: txt(q.explanation),
    guidance: q.guidance,
    skill: p.id,
  })),
}));
