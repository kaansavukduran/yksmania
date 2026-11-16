import { txt, type Lesson, type Question } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";

const inRange022 = (x: number, low: number, high: number) =>
  Number.isFinite(x) && x >= low && x <= high;
const whole022 = (x: number, low: number, high: number) =>
  Number.isInteger(x) && inRange022(x, low, high);

/** Complete canonical pathways from free glucose; amounts are mol, not rates. */
export function fermentation022(
  glucose: number,
  processed: number,
  route: "alcohol" | "lactate",
) {
  if (
    !inRange022(glucose, 0, 20) ||
    !inRange022(processed, 0, glucose) ||
    !["alcohol", "lactate"].includes(route)
  )
    throw new RangeError("Geçersiz glikoz stoğu veya yol");
  const product = 2 * processed,
    co2 = route === "alcohol" ? 2 * processed : 0;
  return {
    glucose,
    processed,
    glucoseLeft: glucose - processed,
    spentATP: 2 * processed,
    grossATP: 4 * processed,
    netATP: 2 * processed,
    pyruvateProduced: 2 * processed,
    nadHFormed: 2 * processed,
    nadHUsed: 2 * processed,
    nadRegenerated: 2 * processed,
    product,
    co2,
    oxygenUsed: 0,
    carbonInitial: 6 * glucose,
    carbonRemaining: 6 * (glucose - processed),
    carbonProduct: (route === "alcohol" ? 2 : 3) * product,
    carbonGas: co2,
    route,
  };
}

/** Fixed measured hourly fluxes. R is explicitly held equal in light/dark; RQ=1. */
export function photoRespiration022(
  gross: number,
  respiration: number,
  lightHours: number,
) {
  if (
    !inRange022(gross, 0, 30) ||
    !inRange022(respiration, 0, 10) ||
    !inRange022(lightHours, 0, 24)
  )
    throw new RangeError("Geçersiz akı veya süre");
  const fixed = gross * lightHours,
    released = respiration * 24,
    net = fixed - released;
  return {
    gross,
    respiration,
    lightHours,
    darkHours: 24 - lightHours,
    fixed,
    released,
    net,
    lightRespiration: respiration * lightHours,
    darkRespiration: respiration * (24 - lightHours),
    litNet: gross - respiration,
    netOxygen: net,
    compensation: gross === respiration,
    dailyDirection: net > 0 ? "gain" : net < 0 ? "loss" : "equal",
  } as const;
}

/** Closed synchronous lineage; all final daughters elongate at fixed cross section. */
export function meristem022(
  founders: number,
  rounds: number,
  elongation: number,
) {
  if (
    !whole022(founders, 1, 8) ||
    !whole022(rounds, 0, 4) ||
    !inRange022(elongation, 1, 4)
  )
    throw new RangeError("Geçersiz soy veya uzama");
  const finalCells = founders * 2 ** rounds;
  return {
    founders,
    rounds,
    elongation,
    finalCells,
    newCells: finalCells - founders,
    divisions: finalCells - founders,
    volumeBeforeElongation: finalCells,
    finalVolume: finalCells * elongation,
    lengthPerCell: elongation,
    daughterChromosomes: 8,
    representedGenerations: Array.from(
      { length: rounds + 1 },
      (_, k) => 2 ** k,
    ),
  };
}

/** Selected mesophyll-only sample: no epidermis/vessel included; measured area, not gas rate. */
export function groundTissue022(
  totalArea: number,
  airPercent: number,
  palisadePercentOfCells: number,
) {
  if (
    !inRange022(totalArea, 100, 2000) ||
    !inRange022(airPercent, 0, 50) ||
    !inRange022(palisadePercentOfCells, 0, 100)
  )
    throw new RangeError("Geçersiz kesit alanı");
  const air = (totalArea * airPercent) / 100,
    cells = totalArea - air,
    palisade = (cells * palisadePercentOfCells) / 100,
    spongyCells = cells - palisade;
  return {
    totalArea,
    airPercent,
    palisadePercentOfCells,
    air,
    cells,
    palisade,
    spongyCells,
    palisadePercentOfTotal: (1 - airPercent / 100) * palisadePercentOfCells,
  };
}

/** Constant imposed pressure difference and concentration until finite donor liquid is exhausted.
 * Pressure kPa, resistance kPa·h/mL, concentration mg/mL, stock mg, time h. */
export function phloem022(
  stock: number,
  concentration: number,
  sourcePressure: number,
  sinkPressure: number,
  resistance: number,
  hours: number,
  source: "leaf" | "tuber",
) {
  if (
    !inRange022(stock, 0, 100) ||
    !inRange022(concentration, 1, 5) ||
    !inRange022(sourcePressure, 0, 10) ||
    !inRange022(sinkPressure, 0, 10) ||
    !inRange022(resistance, 1, 10) ||
    !inRange022(hours, 0, 10) ||
    !["leaf", "tuber"].includes(source)
  )
    throw new RangeError("Geçersiz aktarım koşulu");
  const difference = sourcePressure - sinkPressure,
    rate = Math.max(0, difference) / resistance;
  if (difference > 0 && rate === 0)
    throw new RangeError("Pozitif akı bu sayı hassasiyetinde gösterilemiyor");
  const capacity = rate * concentration * hours,
    transferred = Math.min(stock, capacity),
    volume = transferred / concentration;
  return {
    stock,
    concentration,
    difference,
    rate,
    hours,
    capacity,
    transferred,
    remaining: stock - transferred,
    collected: transferred,
    donorInitialVolume: stock / concentration,
    donorFinalVolume: (stock - transferred) / concentration,
    volume,
    activeHours: rate > 0 ? Math.min(hours, stock / concentration / rate) : 0,
    stockLimited: capacity > stock,
    source,
    direction:
      rate > 0 && transferred > 0
        ? source === "leaf"
          ? "down"
          : "up"
        : "none",
  } as const;
}

type Item022 = {
  prompt: string;
  correct: string;
  wrong: [string, string][];
  knowledge: string;
  strategy: string;
  steps: [string, string, string];
  check: string;
  commonError: string;
};
type Unit022 = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  items: Item022[];
  source: string;
};
const s022 = (
  title: string,
  a: string,
  b: string,
  table?: GuideSection["table"],
): GuideSection => ({ title, paragraphs: [a, b], ...(table ? { table } : {}) });
const e022 = (
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
    label: ["Koşulu kur", "İşlemi yürüt", "Sonucu yorumla"][i],
    explanation,
  })),
  answer,
  check,
  pitfall,
});
const q022 = (
  prompt: string,
  correct: string,
  wrong: [string, string][],
  knowledge: string,
  strategy: string,
  steps: [string, string, string],
  check: string,
  commonError: string,
): Item022 => ({
  prompt,
  correct,
  wrong,
  knowledge,
  strategy,
  steps,
  check,
  commonError,
});

const units022: Unit022[] = [
  {
    id: "ayt-fermantasyon",
    topic: "detail-340",
    title: "Fermantasyon: karbon, ATP ve NAD⁺ döngüsü",
    minutes: 48,
    objectives: [
      "Glikoliz ile son ürün basamağını ayır; net ATP'yi gerekçelendir.",
      "Laktat ve etanol yollarında karbonu ve elektron taşıyıcısını izle.",
      "Fermantasyonu oksijensiz solunumdan; üretim miktarını üretim hızından ayır.",
    ],
    sections: [
      s022(
        "Enerjiyi kullanılabilir hâle getirmek",
        "Hücre, glikozdaki kimyasal enerjinin bir bölümünü ATP senteziyle kullanılabilir bir biçime aktarır. Fermantasyonda glikozun karbonu bütünüyle CO₂'ye dönüşmez; laktat veya etanol gibi organik ürünlerde enerji taşıyan bağlar kalır. Bu nedenle ürün oluşması, bütün enerjinin ATP'de toplandığı anlamına gelmez.",
        "Bu derste serbest glikozla başlayan standart glikolizi ve onunla eşleşen iki son ürün yolunu inceleyeceğiz. Aynı mol glikoz başına ATP verimi ile bir hücrenin birim zamanda ürettiği ATP farklı büyüklüklerdir. Az ATP veren bir yol uygun enzim ve besin koşullarında hızlı çalışabilir; yalnız verimden hız bulunmaz.",
      ),
      s022(
        "Glikoliz: iki üç karbonlu ürün",
        "Glikoliz sitozolde gerçekleşir. Bir 6 karbonlu glikoz, enzimli basamaklar sonunda iki 3 karbonlu pirüvata dönüşür. İlk basamaklarda glikozun işlenmesi için 2 ATP harcanır; sonraki basamaklarda substrat düzeyinde fosforilasyonla toplam 4 ATP oluşur. Net kazanç 4 − 2 = 2 ATP'dir.",
        "Substrat düzeyinde fosforilasyonda fosfat, uygun bir organik ara üründen ADP'ye enzim yardımıyla aktarılır. Bu adım için solunum ETS'si gerekmez. Glikoz sayısını katlarken harcanan ve oluşan ATP'yi ayrı çarpmak, brüt üretimi net kazanç sanmayı önler. Buradaki sayı serbest glikoz ve belirtilen yol içindir.",
      ),
      s022(
        "NAD⁺ neden yeniden kazanılır?",
        "NAD⁺, glikolizde elektron ve hidrojen taşınmasına katılan yükseltgenmiş taşıyıcıdır; indirgenince NADH olur. Bir glikozun standart glikolizinde 2 NADH oluşur. Hücrenin NAD⁺ havuzu sonludur; taşıyıcı sürekli yalnız indirgenmiş biçimde birikirse glikolizin ilgili basamakları sürdürülemez.",
        "Fermantasyonun son ürün basamakları NADH'yi yeniden NAD⁺'a dönüştürür. Böylece glikoliz için taşıyıcı tekrar kullanılabilir. Bu geri kazanım yeni bir taşıyıcının atomlarını yoktan üretmek değildir; var olan taşıyıcının kimyasal biçimi değişir. İncelediğimiz iki kanonik son ürün yolunda bu basamak ayrıca ATP üretmez.",
      ),
      s022(
        "Etanol yolunda karbonun ayrılması",
        "Alkol fermantasyonunda iki pirüvatın her biri bir CO₂ kaybederek iki karbonlu asetaldehide dönüşür. Ardından asetaldehit NADH'den elektron alarak etanole indirgenir; NAD⁺ yenilenir. Elektron alan son organik ara ürün asetaldehittir; CO₂'yi bu indirgenmenin elektron alıcısı sanmayız. Bu yol bazı maya ve bakterilerde, ayrıca oksijenin sınırlı olduğu uygun bitki dokularında da görülebilir; bütün tohumlar için zorunlu tek yol değildir.",
        "Bir glikozdan 2 etanol ve 2 CO₂ oluşur. Etanollerde toplam 4, CO₂'lerde toplam 2 karbon vardır; başlangıçtaki 6 karbon korunur. Gaz çıkışı bu yolun ayırt edici bir ürünüdür. Ancak kapalı kaptaki gaz basıncını ayrıca sıcaklık, hacim, çözünme ve sızıntı koşulları belirler; gaz molü tek başına basınç değildir.",
      ),
      s022(
        "Laktat yolunda karbon içeride kalır",
        "Homolaktik fermantasyonda pirüvat, NADH'den elektron alarak laktata dönüşür. Bir glikozdan iki 3 karbonlu laktat oluşur; bu kanonik yolda CO₂ ayrılmaz. Hücresel pH'da ürünün büyük bölümü laktat biçimindedir; okul kaynaklarında kullanılan laktik asit adıyla aynı karbon iskeletini takip ederiz.",
        "İki pirüvatın indirgenmesiyle 2 NAD⁺ yeniden kazanılır. Glikoliz dışındaki bu dönüşümde ek ATP oluşmaz; bütün süreçteki net 2 ATP glikolizden gelir. Karbonun laktatta tutulması, onun artık hiçbir canlı tarafından kullanılamayacağı anlamına gelmez; sonraki metabolik yollar farklı koşullarda bu maddeyi değerlendirebilir.",
      ),
      s022(
        "İki yolu aynı ölçütle karşılaştır",
        "Aynı miktarda serbest glikoz iki yolda da glikolize girerse brüt ve net ATP ile NAD⁺ geri kazanımı eşittir. Ayrılan CO₂ ve son organik ürünlerin karbon sayıları farklıdır. Bir karşılaştırma tablosunda her satıra yalnız tek ölçüt yazmak, ürün çeşidi ile enerji kazancını karıştırmayı önler.",
        "Son ürün için bütün organik metabolizmaya tek bir kural koymayız. Buradaki 'CO₂ yok' ifadesi homolaktik yol içindir; farklı mikroplar başka fermantasyon ürünleri oluşturabilir. Etanol veya laktat miktarı verilince hangi yolun ve hangi başlangıç maddesinin kullanıldığı sorunun kendi koşulunda bulunmalıdır.",
        {
          headers: [
            "Ölçüt: 1 mol serbest glikoz",
            "Etanol yolu",
            "Homolaktik yol",
          ],
          rows: [
            ["Net ATP", "2 mol", "2 mol"],
            [
              "Organik ürün",
              "2 mol etanol, her biri 2 C",
              "2 mol laktat, her biri 3 C",
            ],
            ["CO₂", "2 mol", "0 mol"],
            ["Yenilenen NAD⁺", "2 mol", "2 mol"],
          ],
        },
      ),
      s022(
        "Oksijen varlığı ile yolun tanımı",
        "Fermantasyonun kendisi oksijeni son elektron alıcısı olarak kullanmaz. Bununla birlikte ortamda O₂ bulunması laktat oluşumunu mantıksal olarak imkânsız yapmaz. Hücrenin mitokondri içeriği, enzim düzeni ve glikoz işleme hızı hangi yolların ne ölçüde birlikte çalışacağını etkiler.",
        "Olgun memeli alyuvarında mitokondri bulunmadığından ATP gereksinimi glikolizle karşılanır ve laktat oluşur; kanın oksijen taşıması bu hücreye mitokondri kazandırmaz. Kas hücrelerinde de laktat üretimi ile oksijenli yollar aynı dönemde görülebilir. Bu yüzden yalnız 'O₂ var' gözleminden fermantasyonun kesin sıfır olduğu söylenmez.",
      ),
      s022(
        "Oksijensiz solunumla sınır",
        "Oksijensiz solunumda bir elektron taşıma zinciri vardır; son elektron alıcısı O₂ dışındaki uygun bir maddedir. Fermantasyonda ise bu tür solunum ETS'si kullanılmaz ve elektronlar organik bir ara ürüne aktarılır. İki süreç O₂ kullanmıyor diye aynı adla tanımlanmaz.",
        "Verim, kullanılan elektron vericisi, son alıcı, zar bağlaşımı ve hücresel koşullara bağlıdır. Bütün oksijensiz solunum örnekleri için tek bir ATP sayısı veya koşulsuz sıralama ezberlemek yerine verilen yolu okuruz. Bu ünitenin 2 ATP hesabı yalnız açıkça tanımlanan glikoliz–fermantasyon bütçesidir.",
      ),
      s022(
        "Laktat son durak olmak zorunda değil",
        "Laktat uygun hücrelerde yeniden pirüvata çevrilip oksidatif yollarda kullanılabilir. Ayrıca karaciğerde karbonunun glikoz yapımına katıldığı döngüler vardır. Bu dönüşümler için enzim, taşıma ve enerji koşulları gerekir; kasın kazandığı ATP'yi karaciğerde hiçbir bedel olmadan yeniden üretmiş saymayız.",
        "Laktatı bütün kas ağrılarının veya ertesi günkü tutukluğun tek nedeni olarak sunmak doğru değildir. Yoğun egzersizde yorulma birçok etkenle ilişkilidir; bu konudaki model tıbbi tanı vermez. Burada öğrenilen güvenilir sonuç, karbonun ve taşıyıcının kimyasal biçim değiştirerek başka yollara katılabilmesidir.",
      ),
      s022(
        "Gıdada canlıların farklı görevleri",
        "Ekmek mayasında etanol yoluyla oluşan CO₂ hamurun kabarmasına katkı verir; ürünün yapısı ve pişirme koşulları son gaz ve etanol miktarını değiştirir. Yoğurt üretimindeki laktik asit bakterileri şekerleri işlerken ortamın asitliğini değiştirir. Kefir, turşu veya ekşi maya gibi örneklerde birden fazla canlı ve yol birlikte bulunabilir.",
        "Gıda dilindeki her 'fermantasyon' sözcüğü burada çizilen iki yolun aynısı değildir. Sirke üretiminde etanolün asetik aside mikrobiyal oksidasyonu O₂ gerektirir. Kontrollü mikrobiyal üretim; ürünü koşulsuz steril, herkes için tedavi edici veya saklama kuralından bağımsız yapmaz. Uygun sıcaklık ve hijyen gibi değişkenler ayrıca önemlidir. Etanol birikimi, türe ve derişime bağlı olarak enzimleri ve hücre işlevlerini baskılayıp süreci sınırlayabilir; bütün canlılar için tek bir dayanım yüzdesi yoktur.",
      ),
      s022(
        "Deneyde neyi ölçtüğünü tanımla",
        "Bir deney kabında glikoz tüketimi, CO₂ birikimi, hücre sayısı veya ATP derişimi farklı ölçümlerdir. Net ATP üretimi hesaplanırken hücrenin aynı anda ATP harcaması dikkate alınmadıysa sonuç 'üretilen miktar'dır; son ATP stoğu değildir. Benzer biçimde pH, tampon kapasitesi bilinmeden ürün molünden doğrudan bulunamaz.",
        "Karşılaştırmalı deneyde başlangıç miktarı, süre, sıcaklık, canlı miktarı ve ölçüm yöntemi uygun biçimde kontrol edilir. Tek bir zaman sonundaki daha çok ürün, ancak aynı koşullarda ve aynı süre için daha yüksek ortalama üretim hızına işaret edebilir. Bu deneysel öncülleri soru kökünden aramak çözümü sağlamlaştırır.",
      ),
      s022(
        "Bütçeyi kur, ardından kontrol et",
        "Bir miktar hesabında önce başlangıçtaki serbest glikozu ve işlenen kısmı ayır. İşlenen her mol için ilgili katsayıları kullan; kalan glikozu ürün sanma. Daha sonra ürün karbonu ile gaz karbonunu topla ve işlenen glikozun karbonuna eşitle. Birim mol molekül ile mol karbon atomunu ayrı yaz.",
        "Keşif modeli kapalı karbon hesabı için tasarlanmıştır: iki kanonik yolda tamamen işlenen payı gösterir; büyüme, başka yan ürünler ve ATP tüketimini hesaplamaz. Önce bir tahmin yapıp sonra NAD⁺ ve karbon bilançosuna bakmak, sadece sayı ezberlemek yerine yolun neden sürdüğünü açıklamayı sağlar.",
      ),
    ],
    examples: [
      e022(
        "Brüt ile net ATP",
        "3 mol serbest glikoz standart glikoliz ve homolaktik yolla tamamen işleniyor. Başka ATP tüketimi sayılmıyor. Harcanan, brüt oluşan ve net kazanılan ATP kaç moldür?",
        "Üç ATP satırını ayrı tut.",
        [
          "1 mol glikoz için harcama 2, brüt oluşum 4 mol ATP'dir; laktat basamağı ek ATP oluşturmaz.",
          "3 mol için harcama 3 × 2 = 6; brüt oluşum 3 × 4 = 12 mol ATP'dir.",
          "Net kazanç 12 − 6 = 6 mol ATP'dir; son hücresel ATP stoğu ayrıca başlangıç ve tüketim bilgisi ister.",
        ],
        "6 mol harcama, 12 mol brüt, 6 mol net ATP",
        "12 − 6 = 6; her glikozun neti 2 ile de aynı sonuç bulunur.",
        "12 mol brüt üretimi net sanmak.",
      ),
      e022(
        "Gazdan glikoza",
        "Kanonik etanol yolunda 8 mol CO₂ oluşuyor; bütün gaz toplanmış ve başka CO₂ kaynağı yok. İşlenen serbest glikoz ve oluşan etanol kaç moldür?",
        "CO₂ katsayısından tepkime ölçeğini bul.",
        [
          "Her glikoz 2 CO₂ oluşturur; işlenen glikoz 8 / 2 = 4 moldür.",
          "Her glikoz 2 etanol verdiğinden 4 × 2 = 8 mol etanol oluşur.",
          "Başlangıç karbonu 4 × 6 = 24; etanolde 8 × 2 = 16 ve gazda 8 mol C vardır.",
        ],
        "4 mol glikoz, 8 mol etanol",
        "16 + 8 = 24 mol C; karbon korunur.",
        "8 mol CO₂'yi 8 mol glikoz saymak veya gazın çözünmesini öncülsüz yok saymak.",
      ),
      e022(
        "İşlenmeyen stok",
        "Başlangıç 5 mol glikozun 2 molü homolaktik yolla tamamen işlenmiş; kalanı değişmemiştir. Laktat, kalan glikoz ve toplam son karbon miktarı nedir?",
        "İşlenen ve kalan karbonu ayrı hesapla.",
        [
          "İşlenen 2 mol glikoz 4 mol laktat oluşturur; kalan glikoz 5 − 2 = 3 moldür.",
          "Laktatta 4 × 3 = 12 mol C; glikozda 3 × 6 = 18 mol C kalır; kanonik yolda CO₂ yoktur.",
          "Toplam 12 + 18 = 30 mol C bulunur; başlangıç 5 × 6 = 30 mol C ile eşittir.",
        ],
        "4 mol laktat, 3 mol glikoz, 30 mol C",
        "Ürün miktarı artarken element stoğu yaratılmamıştır.",
        "Bütün başlangıç glikozunun ürüne dönüştüğünü varsaymak.",
      ),
      e022(
        "Taşıyıcı yeniden kullanılır",
        "4 mol glikoz standart glikolizden ve etanol son ürün basamağından geçiyor. Bu süreçte oluşan NADH ve yeniden kazanılan NAD⁺ kaç moldür? Başka yollar sayılmıyor.",
        "Taşıyıcının oluşum ve yenilenme akısını eşleştir.",
        [
          "Glikolizde glikoz başına 2 mol NADH oluşur; 4 glikoz için 8 mol NADH oluşum olayı vardır.",
          "Asetaldehit indirgenirken bu 8 mol NADH yeniden NAD⁺ biçimine döner; aynı havuz tekrar kullanılabilir.",
          "8 mol geri kazanım, başlangıç havuzunun zorunlu 8 mol olduğu anlamına gelmez; olay toplamı ile aynı andaki stok farklıdır.",
        ],
        "8 mol NADH oluşumu ve 8 mol NAD⁺ geri kazanımı",
        "NADH'nin verdiği elektronlar ürüne geçer; taşıyıcı döngüsü kapanır.",
        "Dönüşüm olay sayısını başlangıçta gereken taşıyıcı havuzuyla eşitlemek.",
      ),
    ],
    recall: [
      {
        prompt: "Son ürün basamağı ATP üretmiyorsa neden gereklidir?",
        answer: "NADH'yi NAD⁺'a dönüştürüp glikolizin devamına olanak verir.",
      },
      {
        prompt: "Etanol yolunda 6 karbon nasıl dağılır?",
        answer: "İki etanolde 4 C, iki CO₂'de 2 C bulunur.",
      },
      {
        prompt: "O₂ varken laktat oluşumu olanaksız mı?",
        answer:
          "Hayır. Yolun tanımı O₂'yi kullanmamasıdır; ortamda bulunması oluşumu kesin engellemez.",
      },
      {
        prompt: "Oksijensiz solunumdan temel fark nedir?",
        answer:
          "Fermantasyonda solunum ETS'si yoktur; organik bir ara ürün elektron alır.",
      },
    ],
    items: [
      q022(
        "2 mol serbest glikoz, standart glikoliz ve homolaktik yol ile tamamen işleniyor. Başka ATP tüketimi sayılmıyor. Net ATP kazancı kaç moldür?",
        "4",
        [
          [
            "8",
            "8 mol brüt üretimdir; başlangıçta harcanan 4 mol ATP düşülmemiştir.",
          ],
          ["2", "Bu, yalnız 1 mol glikozun net kazancıdır."],
          ["0", "NAD⁺ yenilenmesi glikolizin net ATP kazancını yok etmez."],
          [
            "12",
            "Bu değer brüt ve harcananı toplar; net kazanç toplama ile bulunmaz.",
          ],
        ],
        "Serbest glikozun standart glikolizinde 2 ATP harcanır, 4 ATP oluşur.",
        "Her glikozun brüt ve harcananını ayrı çarp, sonra çıkar.",
        [
          "2 mol glikoz için brüt ATP 2 × 4 = 8 moldür.",
          "Başlangıç harcaması 2 × 2 = 4 mol ATP'dir.",
          "Net 8 − 4 = 4 mol ATP olur; laktat basamağı ek ATP vermez.",
        ],
        "Mol glikoz başına net 4 / 2 = 2 mol ATP bulunur.",
        "Brüt ATP'yi net sanmak.",
      ),
      q022(
        "Bir glikozun kanonik etanol yolunda son organik ürün ve CO₂ oluşumu hangisidir?",
        "2 etanol ve 2 CO₂",
        [
          [
            "2 etanol ve 0 CO₂",
            "İki üç karbonlu pirüvatın iki karbonlu etanole dönüşmesinde ayrılan iki karbon gözden kaçmıştır.",
          ],
          [
            "1 etanol ve 1 CO₂",
            "Yalnız 3 karbonu açıklar; başlangıçtaki 6 karbonu açıklamaz.",
          ],
          [
            "2 laktat ve 2 CO₂",
            "İki laktat zaten 6 karbon içerir; buna iki CO₂ eklemek karbon yaratır.",
          ],
          [
            "6 etanol ve 0 CO₂",
            "Altı etanol 12 karbon taşır; bir glikozda 6 karbon vardır.",
          ],
        ],
        "Glikoz 6 C, etanol 2 C, CO₂ 1 C içerir.",
        "Glikolizden çıkan iki pirüvatın her birini ayrı izle.",
        [
          "Her pirüvat bir CO₂ kaybedip asetaldehit olur.",
          "İki asetaldehit indirgenerek iki etanol oluşturur.",
          "İki etanolde 4 C, iki CO₂'de 2 C vardır; toplam 6 C korunur.",
        ],
        "4 + 2 = 6 C.",
        "Etanol yoluna homolaktik yolun gazsızlığını taşımak.",
      ),
      q022(
        "Standart homolaktik fermantasyonda NADH'nin son ürün basamağında elektron verdiği organik madde hangisidir?",
        "Pirüvat",
        [
          ["O₂", "Oksijen bu fermantasyonun son elektron alıcısı değildir."],
          [
            "CO₂",
            "Kanonik laktat yolunda son alıcı CO₂ değildir; gaz da ayrılmaz.",
          ],
          [
            "Etanol",
            "Etanol diğer yolun ürünüdür; laktat yolunun alıcısı değildir.",
          ],
          [
            "ATP",
            "ATP enerji aktarımına katılır; burada NADH'yi yükseltgeyen karbonlu alıcı değildir.",
          ],
        ],
        "Laktat, pirüvatın indirgenmesiyle oluşur.",
        "Ürün basamağında NADH'nin karşısındaki ara ürünü belirle.",
        [
          "Glikoliz iki pirüvat ve iki NADH üretir.",
          "Pirüvat elektron alırken laktata dönüşür.",
          "NADH elektron verip NAD⁺ olur; doğru alıcı pirüvattır.",
        ],
        "Taşıyıcı yenilenmesi ile ürünün indirgenmesi eşleşir.",
        "Fermantasyonun elektron alıcısını solunumdaki O₂ ile karıştırmak.",
      ),
      q022(
        "Kanonik laktat son ürün basamağı glikolize en doğrudan hangi katkıyı yapar?",
        "NAD⁺'ı yeniden kullanılabilir hâle getirir",
        [
          [
            "Glikoz başına ayrıca 34 ATP üretir",
            "Bu yolda solunum ETS'si ve böyle bir ek ATP üretimi yoktur.",
          ],
          [
            "Her pirüvatı 3 CO₂'ye kadar parçalar",
            "Laktat üç karbonu korur; bu basamak tam karbon oksidasyonu değildir.",
          ],
          [
            "Mitokondriyi zorunlu olarak oluşturur",
            "Enzimli dönüşüm sitozoldedir; organel üretimi değildir.",
          ],
          [
            "NAD⁺'ın atomlarını yoktan üretir",
            "Taşıyıcı biçim değiştirir; elementler yoktan yaratılmaz.",
          ],
        ],
        "Sonlu NAD⁺ havuzu glikolizde NADH biçimine dönüşür.",
        "Sürecin devamı için hangi taşıyıcı biçiminin gerektiğini sor.",
        [
          "Glikolizin ilgili basamağı yükseltgenmiş NAD⁺ ister.",
          "Son ürün dönüşümü NADH'yi yeniden NAD⁺'a çevirir.",
          "Bu geri dönüş glikolizi destekler; ek ATP'nin kaynağı sayılmaz.",
        ],
        "NAD⁺/NADH toplam havuzu ile çevrim olayını ayır.",
        "Son ürün basamağını ikinci büyük ATP üretim merkezi sanmak.",
      ),
      q022(
        "Olgun bir memeli alyuvarında mitokondri yoktur. Hücre O₂ içeren kanda glikolizle ATP sağlıyor ve pirüvatı laktata çeviriyor. En uygun yorum hangisidir?",
        "O₂ bulunması laktat oluşumunu kesin engellemez",
        [
          [
            "O₂ varsa gözlem mutlaka yanlıştır",
            "Ortamda O₂ olması, mitokondrisiz hücrenin laktat oluşturmasını yasaklamaz.",
          ],
          [
            "Alyuvar zorunlu olarak yeni mitokondri oluşturmuştur",
            "Kökte mitokondri olmadığı verilmiştir; laktat için mitokondri gerekmez.",
          ],
          [
            "Laktat mutlaka ETS'nin son ürünüdür",
            "Bu olay sitozolik taşıyıcı geri kazanımıdır; solunum ETS'si değildir.",
          ],
          [
            "Glikoliz yalnız karanlıkta olur",
            "Glikoliz için karanlık bir tanım koşulu yoktur.",
          ],
        ],
        "Yolun O₂ kullanmaması, O₂'nin ortamda bulunamaması demek değildir.",
        "Hücrenin organel bilgisiyle yolun yerini eşleştir.",
        [
          "Alyuvarın mitokondrisi yoktur; ATP glikolizden sağlanır.",
          "Pirüvatın laktata dönüşmesi NAD⁺ yeniler.",
          "Bu olay O₂ taşıyan kanda da gerçekleşebilir; O₂ bulunması laktat oluşumunu kesin engellemez.",
        ],
        "Kökteki bütün gözlemler aynı anda tutarlıdır.",
        "O₂ yokluğunu her laktat oluşumunun zorunlu ortam koşulu saymak.",
      ),
      q022(
        "X yolunda solunum ETS'si yok; organik ara ürün elektron alıyor. Y yolunda ETS var ve son alıcı nitrattır. Doğru sınıflama hangisidir?",
        "X fermantasyon, Y oksijensiz solunum",
        [
          [
            "X oksijenli solunum, Y fermantasyon",
            "X'te solunum ETS'si yoktur; Y'de olması fermantasyon sınıflamasını dışlar.",
          ],
          [
            "İkisi de yalnız glikolizin diğer adıdır",
            "ETS ve son alıcı bilgisi glikolizden sonraki enerji yolunu ayırır.",
          ],
          [
            "İkisi de mutlaka fotosentezdir",
            "Işıkla karbon bağlama koşulu verilmemiştir.",
          ],
          [
            "Y'de ETS olamaz",
            "O₂ dışı alıcılarla çalışan solunum ETS'si bulunabilir.",
          ],
        ],
        "Fermantasyon ile oksijensiz solunum ETS ve son alıcıyla ayrılır.",
        "Önce ETS var mı, sonra son alıcı nedir diye sırala.",
        [
          "X'te organik ara ürünle taşıyıcı yenilenmesi tarif edilmiştir.",
          "Y'de elektronlar ETS üzerinden O₂ dışındaki nitrata gider.",
          "Bu nedenle X fermantasyon, Y oksijensiz solunumdur.",
        ],
        "İki yolun O₂ kullanmaması onları özdeş yapmaz.",
        "Oksijensiz sözcüğünü otomatik olarak fermantasyon sanmak.",
      ),
      q022(
        "Başlangıçtaki 6 mol glikozun yalnız 2 molü kanonik etanol yolunda tamamen işleniyor. Kalan glikoz değişmiyor. Son toplam karbon kaç mol atomdur?",
        "36",
        [
          [
            "12",
            "Bu yalnız işlenen glikozun karbonudur; kalan 4 mol glikoz unutulmuştur.",
          ],
          [
            "24",
            "Bu yalnız kalan glikozun karbonudur; ürünlerin karbonu yok sayılmıştır.",
          ],
          ["8", "Etanol ve CO₂ molekül sayıları karbon atomu sayısı değildir."],
          ["40", "Kapalı karbon modelinde fazladan karbon oluşmaz."],
        ],
        "Başlangıç karbonu = 6 × glikoz molü; kanonik yolda karbon korunur.",
        "Kalan glikoz, etanol ve gaz karbonunu birlikte topla.",
        [
          "Kalan 4 mol glikoz 24 mol C içerir.",
          "2 mol işlenen glikoz 4 etanol ve 4 CO₂ verir; bunlarda 8 + 4 = 12 mol C vardır.",
          "Toplam 24 + 12 = 36 mol C bulunur.",
        ],
        "Başlangıç 6 × 6 = 36 mol C ile aynıdır.",
        "Yalnız ürünleri sayıp işlenmeyen stoğu unutmak.",
      ),
      q022(
        "Bir kapta kanonik etanol fermantasyonuyla toplam 10 mol CO₂ toplanıyor; gaz kaybı ve başka CO₂ kaynağı yok. Net ATP üretimi kaç moldür?",
        "10",
        [
          ["5", "5 mol işlenen glikozdur; net ATP glikoz başına 2 moldür."],
          ["20", "Bu brüt ATP miktarıdır; 10 mol ATP harcanır."],
          ["0", "Etanol son basamağı ATP vermese de glikoliz net ATP verir."],
          [
            "30",
            "Bu yolu belirtilmeyen yüksek verimli solunum hesabıyla karıştırır.",
          ],
        ],
        "Bir glikozdan 2 CO₂ ve 2 net ATP oluşur.",
        "Önce gazdan glikozu, sonra net ATP'yi bul.",
        [
          "İşlenen glikoz 10 / 2 = 5 moldür.",
          "Net ATP 5 × 2 = 10 moldür.",
          "Gaz ile ATP sayısının eşitliği bu yolun katsayılarından gelir; evrensel gaz kuralı değildir.",
        ],
        "Brüt 20 − harcanan 10 = net 10 mol ATP.",
        "Brüt üretimi seçmek.",
      ),
      q022(
        "İki maya kabında başlangıç hücre ve glikoz miktarı, sıcaklık, kap ve 20 dakikalık süre eşit. X'te 4, Y'de 2 mmol CO₂ toplanıyor; gaz kaybı yok ve tek yol kanonik etanol fermantasyonu. Hangisi çıkarılabilir?",
        "X'in bu süredeki ortalama CO₂ üretim hızı daha yüksektir",
        [
          [
            "X'in glikoz başına net ATP verimi iki katıdır",
            "Aynı kanonik yolda glikoz başına katsayı değişmez; işlenen miktar farklı olabilir.",
          ],
          [
            "Y'de hiç ATP oluşmamıştır",
            "2 mmol CO₂, bu yolda pozitif glikoz işlenmesine ve net ATP'ye karşılık gelir.",
          ],
          [
            "X mutlaka her sıcaklıkta daha hızlıdır",
            "Deney yalnız verilen sıcaklık ve süre için bilgi sağlar.",
          ],
          [
            "X'in son ATP stoğu kesin iki katıdır",
            "ATP üretimi verilse bile başlangıç ve eşzamanlı ATP tüketimi bilinmez.",
          ],
        ],
        "Ortalama ürün akısı = toplanan ürün / ortak süre.",
        "Sabit tutulan koşullarda miktarı süreye böl; verim ile stoğu ayır.",
        [
          "X ortalama 4 / 20 = 0,2; Y 2 / 20 = 0,1 mmol CO₂/dakika üretmiştir.",
          "X'in ölçülen ortalama gaz akısı iki katıdır.",
          "Bu gözlem enzim verimini, her koşuldaki hızı veya son ATP stoğunu tek başına belirlemez.",
        ],
        "İki kap aynı zaman aralığında karşılaştırılmıştır.",
        "Hız farkını glikoz başına ATP verimi farkı sanmak.",
      ),
      q022(
        "Gıda üretiminde etanolün O₂ kullanılarak asetik aside mikrobiyal oksidasyonu için hangisi doğrudur?",
        "Gıda dilindeki adından bağımsız olarak bu basamak O₂ gerektirir",
        [
          [
            "Fermantasyon adı geçerse mutlaka O₂ kullanılmaz",
            "Gıda terminolojisi biyokimyasal yolları her durumda aynı sınıra göre adlandırmaz.",
          ],
          [
            "Bu, homolaktik yolun CO₂ çıkaran basamağıdır",
            "Verilen etanol oksidasyonu laktat yoluna ait değildir.",
          ],
          [
            "Süreç ürünü koşulsuz steril yapar",
            "Canlı ve saklama güvenliği yalnız yol adıyla garanti edilmez.",
          ],
          [
            "Asetik asit oluşursa hiçbir enerji dönüşümü olmaz",
            "Kimyasal dönüşüm enerji aktarımı içerebilir; bu mutlak iddia dayanaksızdır.",
          ],
        ],
        "Süreç adı yerine verilen elektron alıcısı ve tepkime okunur.",
        "Kökteki O₂ koşulunu doğrudan kullan.",
        [
          "Verilen basamak etanolün mikrobiyal oksidasyonudur.",
          "Kök açıkça O₂ kullanıldığını belirtir.",
          "Bu nedenle adı ne olursa olsun bu basamak O₂ gerektirir; kanonik etanol fermantasyonuyla özdeş değildir.",
        ],
        "Sınıflama, ürünün ticari adına değil yolun mekanizmasına dayanır.",
        "Her gıda fermantasyonunu aynı anaerobik yol saymak.",
      ),
      q022(
        "Standart homolaktik yolda 5 mol glikoz işleniyor. Glikolizde oluşan NADH ile son ürün basamağında yenilenen NAD⁺ kaç moldür?",
        "10 ve 10",
        [
          [
            "5 ve 5",
            "Her glikoz iki taşıyıcı dönüşüm olayı verir; katsayı atlanmıştır.",
          ],
          [
            "10 ve 0",
            "NAD⁺ yenilenmezse sonlu havuzla glikoliz sürdürülemez; yolun son basamağı bunu sağlar.",
          ],
          ["0 ve 10", "Glikolizde NADH oluşumu açıkça vardır."],
          [
            "20 ve 10",
            "20 ATP brüt miktarına benzeyen sayı NADH katsayısı değildir.",
          ],
        ],
        "Bir glikozda 2 NADH oluşur ve iki pirüvat indirgenirken 2 NAD⁺ yenilenir.",
        "İki taşıyıcı akısını aynı glikoz ölçeğinde çarp.",
        [
          "NADH oluşumu 5 × 2 = 10 moldür.",
          "Tam son ürün yolu bu 10 mol NADH'yi NAD⁺'a döndürür.",
          "Dolayısıyla oluşum ve geri kazanım 10'ar moldür; bu akı başlangıç havuzu değildir.",
        ],
        "Taşıyıcı çevrimi kapanır.",
        "ATP katsayısını NADH hesabına taşımak.",
      ),
      q022(
        "Bir kas hücresinde oluşan laktatın daha sonra başka bir dokuda kullanılması için en uygun ifade hangisidir?",
        "Uygun enzim ve koşullarda karbonu yeniden metabolizmaya katılabilir",
        [
          [
            "Laktat karbonu her durumda sonsuza kadar kullanılamaz",
            "Organik ürünler uygun yollarda yeniden işlenebilir.",
          ],
          [
            "Laktatın glikoza dönüşümü her zaman enerji bedelsizdir",
            "Glikoz yapım yolları enerji ve uygun enzimler gerektirir.",
          ],
          [
            "Bütün kas ağrılarının tek kanıtı laktattır",
            "Ağrı ve yorgunluk çok etkenlidir; tek maddeyle kesin tanı kurulamaz.",
          ],
          [
            "Laktat oluşursa hücrede bütün ATP üretimi durur",
            "Laktat oluşumu glikolizin devamına katkı sağlayabilir.",
          ],
        ],
        "Organik son ürün metabolik bağlama göre başka yolların girdisi olabilir.",
        "Maddenin karbonu ile dönüşümün enerji maliyetini ayır.",
        [
          "Laktat üç karbonlu bir organik üründür; karbon atomları korunur.",
          "Uygun hücrelerde pirüvata dönüşüp oksidatif yollara veya glikoz yapımına katılabilir.",
          "Bunun için koşul ve enerji gerekir; evrensel atık ya da tek ağrı nedeni değildir.",
        ],
        "Karbonun geri kullanımı enerji döngüsünün bedelsiz olduğu anlamına gelmez.",
        "Son ürün sözcüğünü doğada mutlak ve kalıcı çıkmaz sanmak.",
      ),
    ],
    source:
      "MEBİ AYT Biyoloji Bölüm 2 fiziksel PDF 74–76; OGM Hücresel Solunum (Fermantasyon) PDF 7–19 ve 21–27; OGM Dersler Cepte Hücresel Solunum PDF 10–19. Anlatım, hesaplar ve sorular özgündür. Oksijen varlığında laktat oluşumu, olgun memeli alyuvarı, gaz ve net ATP öncülleri bilimsel sınırlarıyla açıklanır.",
  },
];

units022.push({
  id: "ayt-fotosentez-solunum",
  topic: "detail-341",
  title: "Fotosentez ve solunum: iki akı, bir madde bütçesi",
  minutes: 50,
  objectives: [
    "Brüt fotosentez, solunum ve net gaz değişimini ayır.",
    "Işık–karanlık sürelerini kullanarak günlük karbon bilançosu kur.",
    "İki organelde elektron, proton ve ATP akışının yönünü gerekçelendir.",
  ],
  sections: [
    s022(
      "Birbirini tamamlayan iki dönüşüm",
      "Oksijenli fotosentez, ışık enerjisinden yararlanarak CO₂'nin karbonunu organik maddelere bağlar; sudan elektron alırken O₂ açığa çıkarır. Hücresel solunum ise uygun organik maddelerin kimyasal enerjisinin bir bölümünü ATP sentezine aktarır. Glikozun oksijenli solunumunda CO₂ ve su oluşur.",
      "Bu süreçlerin toplam madde denklemleri birbirini tamamlar; fakat yollar aynı basamakların ters sırada çalışması değildir. Enzimleri, ara ürünleri ve enerji bağlama düzenekleri farklıdır. Birinin ürününün diğerine girdi olması, her hücrede iki yolun da bulunmasını veya aynı hızla çalışmasını gerektirmez.",
    ),
    s022(
      "Bitki yalnız fotosentez yapmaz",
      "Canlı bitki hücreleri bakım, sentez, taşıma ve büyüme için ATP kullanır. Uygun koşullarda hücresel solunum gece de gündüz de sürebilir. Kloroplast taşıyan dokular kullanılabilir ışıkta fotosentez yapabilir; kök gibi fotosentez yapmayan dokular da solunumla enerji sağlar.",
      "'Gündüz fotosentez, gece solunum' iki işi birbirini dışlayan saatler gibi gösterir ve yanıltır. Doğru soru, aynı zaman aralığında her yolun ne kadar gerçekleştiğidir. Çok düşük ışıkta gündüz bile brüt fotosentez solunumu karşılamayabilir. Yapay ışık da uygun koşullarda fotosentezi destekleyebilir; takvimde gündüz olması esas ölçüt değildir.",
    ),
    s022(
      "Brüt ve net: ölçülen fark",
      "Brüt fotosentez, fotosentetik karbon bağlamanın tamamıdır. Aynı örnekte solunumla açığa çıkan CO₂ bu brüt miktardan düşüldüğünde net CO₂ alımı bulunur. Basit kapalı ölçümde dışarıyla net gaz değişimi gözlenirken içeride iki yönde eşzamanlı akı olabilir.",
      "Örneğin saatte 8 birim karbon bağlanıp 3 birim CO₂ bırakılıyorsa net alım saatte 5 birimdir. Net 5'i brüt üretim diye kullanmak, iki yolu tek bir sonuçla karıştırır. Birimler ve sistem sınırı aynı olmalıdır: yalnız yaprak ölçümü ile bütün bitki solunumunu doğrudan çıkarıp toplamayız.",
    ),
    s022(
      "Işık dengeleme noktası",
      "Belirli sıcaklık ve koşullarda fotosentetik CO₂ alımı solunumsal CO₂ çıkışına eşit olduğunda net CO₂ değişimi sıfır olabilir. Bu ışık düzeyine ilişkin dengeleme kavramı, iki yolun da durduğu anlamına gelmez. Örneğin iki yönde saatte 4 birim akı varsa dışarıdan net sıfır görülür.",
      "Bu noktanın değeri tür, doku, sıcaklık ve başka koşullarla değişebilir. Tek bir yaprağın anlık dengeleme hâli bütün gün boyunca karbon kazancı olduğu anlamına da gelmez; geceki solunum eklenmelidir. Soruda anlık hız mı, gün sonu bilanço mu istendiğini ilk adımda ayır.",
    ),
    s022(
      "Süreyle çarpılan akı miktar olur",
      "Sabit hız varsayımı verilirse bir zaman aralığındaki miktar, hız ile sürenin çarpımıdır. Günlük bilanço için aydınlıkta bağlanan karbonu bulur; solunumun hem aydınlık hem karanlık bölümdeki miktarını çıkarırız. Solunumu yalnız geceye yazmak gündüzdeki ATP gereksinimini unutmak olur.",
      "Bu ünitenin sayısal modeli, solunum hızının 24 saat aynı kaldığını ve seçilen aydınlık saatlerde brüt fotosentezin sabit olduğunu açıkça varsayar. Gerçek bitkide hızlar değişirse aralıklar ayrı hesaplanır veya zamana göre akı toplanır. Basit modelin katsayıları gerçek bir türün ışık yanıt eğrisi değildir.",
    ),
    s022(
      "Gaz oranı için kullanılan varsayım",
      "Tam glikoz oksidasyonu için C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O toplamı yazılır. Böyle bir örnekte tüketilen O₂ ile çıkan CO₂ molü eşittir. Buna karşılık farklı besinler ve metabolik süreçler farklı gaz oranları verebilir; bütün canlılar için CO₂/O₂ oranı 1 diye genellenmez.",
      "Sayısal keşifte glikoz temelli solunum ve oksijenli fotosentezin basitleştirilmiş 1:1 CO₂–O₂ akı eşleştirmesi kullanılır. Bu yüzden net karbon alımı ile net O₂ çıkışının sayısal büyüklüğü eşleşir. Başka gaz alışverişleri, fotorespirasyon ve değişen depolar modele dahil değildir; ölçüm verisi bunları gerektirirse ek bilgi gerekir.",
    ),
    s022(
      "Oksijenin hangi atomdan geldiği",
      "Fotosentezde dışarı verilen O₂'nin oksijen atomları suyun parçalanmasından gelir. CO₂'nin karbonu ise organik karbon iskeletlerine katılır. Toplam denklemde aynı elementin iki tarafta görünmesi, hangi atomun hangi ürüne geçtiğini tek başına göstermeyebilir; izotopla işaretleme bu soruyu aydınlatır.",
      "Oksijenli solunumda O₂ son elektron alıcısı olarak indirgenir ve su oluşumuna katılır. CO₂'nin karbonu işlenen organik maddelerden gelir. Bu atom yollarını ayırmak, 'fotosentez solunumun tam tersi' ezberinden daha güçlüdür; farklı basamaklar birbirinden ayrı izlenebilir.",
    ),
    s022(
      "İki organelde ortak ilke: kemiosmoz",
      "Mitokondri iç zarında elektron aktarımı protonların zarlar arası boşlukta birikmesine katkı sağlar. Protonların ATP sentaz üzerinden matrikse dönüşü ATP senteziyle bağlaşır. ATP sentaz enerjiyi yoktan yaratmaz; zarın iki yanında kurulmuş elektrokimyasal farkın kullanılmasına aracılık eder.",
      "Kloroplastta ışıkla bağlantılı elektron akışı tilakoit lümeninde proton birikmesine katkı verir; protonlar ATP sentaz üzerinden stromaya dönerken ATP üretilir. Ortak ilke proton itici güçtür; bölmeler aynı değildir. Kloroplast stromasını yapraktaki stoma açıklığı ile karıştırma.",
    ),
    s022(
      "Elektron vericisi ve son alıcı",
      "Oksijenli fotosentezin doğrusal akışında su elektron kaynağıdır; NADP⁺ elektron alarak NADPH biçimine geçer. NADP⁺'ı bu akışın ilk elektron vericisi saymak yönü ters çevirir. Işık enerjisi elektronların enerji düzeyini yükseltmeye katılır; kendisi yeni bir elektron atomu değildir.",
      "Oksijenli solunumda besinlerin yükseltgenmesiyle indirgenen NADH ve FADH₂ elektronlarını ETS'ye aktarır; O₂ son alıcıdır. O₂ dışı uygun son alıcılarla gerçekleşen solunum ile ETS'siz fermantasyon farklı yollardır. Bütün prokaryotlara mitokondri atfetmeyiz; uygun solunum zarları hücre zarıyla ilişkili olabilir.",
    ),
    s022(
      "ATP yerel bir ara taşıyıcıdır",
      "Kloroplastın ışığa bağlı basamaklarında üretilen ATP ve NADPH, karbon bağlama tepkimelerine enerji ve indirgeme gücü sağlar. Karbon iskeletlerinden sükroz, nişasta ve başka organik maddeler oluşabilir. Besin zincirinde enerji aktarımını, güneşte yapılmış ATP'nin değişmeden bütün hayvanlara taşınması diye açıklamayız.",
      "Organik maddeler tüketici hücrelerde yeniden işlenir; ATP bu hücrelerde üretilip kullanılır. Enerjinin bir bölümü süreçler boyunca çevreye ısı olarak aktarılır. Bu nedenle elementlerin döngüsü ile kullanılabilir enerjinin besin zincirindeki akışı aynı kavram değildir.",
    ),
    s022(
      "Karbon kazancı ile taze kütleyi ayır",
      "Pozitif günlük net karbon alımı, seçilen sınırda karbon deposuna katkı verebilir. Fakat bir bitkinin ölçülen taze kütlesi su alışverişinden de büyük ölçüde etkilenir. Yalnız net CO₂ miktarından, su ve diğer giriş–çıkışlar verilmeden bütün taze kütle değişimi bulunmaz.",
      "Bir depoya neyin dahil edildiği açık olmalıdır: karbon birimi, glikoz eşdeğeri veya toplam organik kütle farklı ölçülerdir. Model karbon bilançosunu gösterir; farklı besinlere dağılım, büyüme verimi, yaprak dökümü ve ihracat verilmez. Pozitif bilanço tek başına belirli bir boy uzamasını garanti etmez.",
    ),
    s022(
      "Ekosistem bağlantısı ve ölçek",
      "Üreticiler karbon bağlama yoluyla besin ağlarına organik madde sağlar; üreticiler, tüketiciler ve ayrıştırıcılar solunumla karbonu çevreye geri aktarır. Bu bağlantı madde döngüsünün temel parçalarındandır. Bir atmosfer bilançosu ayrıca fosil yakıt kullanımı, yangın, okyanus ve kara depolarını da içerir.",
      "Ormanları korumak karbon depoları ve yaşam alanları bakımından değerlidir; fakat her ek emisyonun bitkilerce otomatik ve anında dengelendiği sonucu çıkmaz. Bir yaprak kabındaki basit gaz modeli küresel iklim hesabı değildir. Çözümde önce ölçülen sistemin sınırını, sonra giriş ve çıkışların tamamını belirleriz.",
    ),
    s022(
      "Grafiği okuyarak düşün",
      "Keşifte aydınlık süresini uzattığında, aynı brüt hızda toplam bağlanan karbon artar; 24 saatlik sabit solunum miktarı değişmez. Solunum hızını yükselttiğinde hem aydınlık hem karanlık kaybı artar. Günlük sıfır bilanço için brüt hız × aydınlık saat = solunum hızı × 24 koşulu gerekir.",
      "Anlık aydınlıkta net sıfır ile günlük net sıfırın neden farklı olabileceğini kendi cümlenle açıklamayı dene. Önce yönü tahmin et, ardından okların miktarını ve günlük toplamı kontrol et. Bu uygulamadaki keşif tahmini öğrenme puanı değildir; bağımsız sorular yöntemini ayrıca sınar.",
    ),
  ],
  examples: [
    e022(
      "Bir günün karbon bilançosu",
      "Bir örnekte brüt fotosentez aydınlıkta 8 µmol CO₂/saat, solunum bütün gün sabit 3 µmol CO₂/saat. Aydınlık 12, karanlık 12 saattir. Günlük net CO₂ alımı nedir?",
      "Brüt bağlamayı 12; solunumu 24 saatle çarp.",
      [
        "Brüt bağlama 8 × 12 = 96 µmol CO₂'dir.",
        "Toplam solunum 3 × 24 = 72 µmol CO₂ çıkarır; bunun 36'sı aydınlıkta, 36'sı karanlıktadır.",
        "Günlük net alım 96 − 72 = 24 µmol CO₂ olur.",
      ],
      "24 µmol net CO₂ alımı",
      "Aydınlık net 60, karanlık kayıp 36; 60 − 36 = 24.",
      "Solunumu yalnız karanlık saatlerle çarpmak.",
    ),
    e022(
      "Net ölçümden brüt hıza",
      "Aydınlıkta net CO₂ alımı 6 µmol/saat ölçülüyor. Aynı örnekte solunumun bu anda 2 µmol/saat olduğu bağımsız ölçümle verilmiş. Brüt fotosentez hızı nedir?",
      "Net = brüt − solunum bağıntısını ters kullan.",
      [
        "Net 6, fotosentetik alımdan solunumsal çıkış düşüldükten sonraki farktır.",
        "Brüt = net + solunum = 6 + 2 = 8 µmol/saat hesaplanır.",
        "Kontrol: brüt 8'den solunum 2 çıkınca gözlenen net 6 kalır.",
      ],
      "8 µmol CO₂/saat",
      "8 − 2 = 6 ölçülen net değeri verir.",
      "Netten solunumu bir kez daha çıkarmak.",
    ),
    e022(
      "Anlık denge günlük denge değildir",
      "Aydınlıkta brüt fotosentez ve solunum ayrı ayrı 4 µmol/saat. 10 saat aydınlık, 14 saat karanlık var; solunum karanlıkta da 4 µmol/saat. Günlük bilanço nedir?",
      "Aydınlık farkı ve gece kaybını ayrı tut.",
      [
        "Aydınlıkta net 4 − 4 = 0 µmol/saat; iki süreç de sürer.",
        "Karanlıkta toplam solunum 4 × 14 = 56 µmol CO₂'dir.",
        "Günlük net alım 0 − 56 = −56 µmol'dür; yani 56 µmol net CO₂ çıkışı vardır.",
      ],
      "56 µmol net CO₂ çıkışı",
      "Brüt toplam 40 − solunum toplam 96 = −56.",
      "Dengeleme noktasında bütün gün hiçbir madde değişmez sanmak.",
    ),
    e022(
      "Günlük sıfır için gereken süre",
      "Aydınlıkta brüt bağlama 12 µmol/saat; solunum 24 saat sabit 4 µmol/saat. Günlük net sıfır için kaç saat aydınlık gerekir?",
      "Toplam bağlamayı 24 saatlik kayba eşitle.",
      [
        "Günlük solunum 4 × 24 = 96 µmol CO₂'dir.",
        "12 × t = 96 eşitliğinden t = 8 saat bulunur.",
        "8 saat aydınlık ve 16 saat karanlıkta toplam brüt alım 96'dır; toplam kayıpla eşittir.",
      ],
      "8 saat",
      "8, fiziksel olarak mümkün 0–24 saat aralığındadır.",
      "Anlık denge için 12 = 4 olması gerektiğini düşünerek süre hesabını reddetmek.",
    ),
  ],
  recall: [
    {
      prompt: "Net CO₂ değişimi sıfırsa iki süreç durur mu?",
      answer: "Hayır; eşit zıt akılar birlikte sürebilir.",
    },
    {
      prompt: "Günlük modelde neden solunum 24 ile çarpılır?",
      answer:
        "Model solunum hızını hem ışıkta hem karanlıkta sabit ve etkin kabul eder.",
    },
    {
      prompt: "Kloroplastta ATP sentazdan geçen protonlar nereye döner?",
      answer:
        "Tilakoit lümeninden stromaya; mitokondride ise zarlar arası boşluktan matrikse.",
    },
    {
      prompt: "Fotosentezde açığa çıkan O₂'nin atom kaynağı nedir?",
      answer: "Su. CO₂'nin karbonu organik karbon iskeletlerine katılır.",
    },
  ],
  items: [
    q022(
      "Aydınlıkta brüt fotosentez 9, aynı anda solunum 4 µmol CO₂/saat. Başka gaz yolu yok. Net CO₂ alımı kaç µmol/saat?",
      "5",
      [
        ["13", "İki zıt yönlü akı toplanmaz; solunum alımı azaltır."],
        ["9", "Bu brüt akıdır, solunum düşülmemiştir."],
        ["4", "Bu yalnız solunum akısıdır."],
        ["0", "Akılar eşit değildir; net sıfır olmaz."],
      ],
      "Net alım = brüt fotosentez − solunum.",
      "Aynı örnek ve zamanda iki zıt akıyı çıkar.",
      [
        "Brüt alım 9 µmol/saat olarak verilmiştir.",
        "Solunumun 4 µmol/saat çıkışı buna karşı yöndedir.",
        "Net 9 − 4 = 5 µmol/saat alımdır.",
      ],
      "Sonucun işareti pozitif; dışarıdan net CO₂ girişi beklenir.",
      "Brüt ve neti aynı saymak.",
    ),
    q022(
      "Brüt fotosentez aydınlıkta 10 µmol CO₂/saat, solunum bütün gün sabit 3 µmol CO₂/saat. Aydınlık 8 saat. Günlük net CO₂ alımı kaç µmol?",
      "8",
      [
        [
          "56",
          "Bu yalnız aydınlık netidir; 16 saatlik karanlık solunumu eksiktir.",
        ],
        ["80", "Bu brüt günlük bağlamadır; hiçbir solunum çıkarılmamıştır."],
        ["72", "Bu toplam solunumdur, net alım değildir."],
        ["−8", "Çıkarmanın yönü ters çevrilmiştir; bağlama 80, kayıp 72'dir."],
      ],
      "24 saatlik kayıp R × 24; bağlama P × aydınlık saattir.",
      "Akıları süreyle miktara çevir.",
      [
        "Toplam brüt bağlama 10 × 8 = 80 µmol'dür.",
        "Solunum 3 × 24 = 72 µmol CO₂ çıkarır.",
        "Net 80 − 72 = 8 µmol alımdır.",
      ],
      "Aydınlık net 56 − karanlık kayıp 48 = 8.",
      "Gündüz solunumunu veya karanlık kaybını atlamak.",
    ),
    q022(
      "Bir yaprakta anlık brüt CO₂ alımı ve solunumsal CO₂ çıkışı ayrı ayrı 5 µmol/saat. Başka yol yok. Doğru yorum?",
      "Net sıfırdır; iki yol da etkin olabilir",
      [
        [
          "Fotosentez kesin durmuştur",
          "Brüt akı 5 verilmiştir; durma iddiası veriye aykırıdır.",
        ],
        ["Solunum kesin durmuştur", "Solunum akısı da 5 verilmiştir."],
        ["Net alım 10 µmol/saattir", "Zıt akılar toplanmaz; fark alınır."],
        [
          "Bütün gün karbon bilançosu kesin sıfırdır",
          "Anlık eşitlik karanlık ve diğer zaman aralıklarını belirlemez.",
        ],
      ],
      "Dengeleme noktasında net ölçüm iki etkin akının farkı olabilir.",
      "Sıfır farkı sıfır süreçten ayır.",
      [
        "Brüt alım 5 ve çıkış 5 aynı anda sürmektedir.",
        "Net alım 5 − 5 = 0'dır.",
        "Bu yalnız ölçülen anın bilançosudur; günlük toplam ayrıca süre ister.",
      ],
      "Her iki verilen pozitif akı korunur.",
      "Net sıfırı metabolik durma sanmak.",
    ),
    q022(
      "Glikozla tam oksijenli solunum ve oksijenli fotosentez için basit 1:1 CO₂–O₂ modeli kullanılıyor. Günlük net CO₂ alımı 18 µmol ise net O₂ değişimi hangisidir?",
      "18 µmol O₂ çıkışı",
      [
        [
          "18 µmol O₂ alımı",
          "Verilen modelde karbon alımı ile net O₂ çıkışı eşleşir; yön ters yazılmıştır.",
        ],
        [
          "108 µmol O₂ çıkışı",
          "6 katsayısı glikoz molüne göredir; CO₂ molü zaten verilmiştir.",
        ],
        [
          "0 µmol",
          "Pozitif karbon bilançosu bu özel modelde pozitif O₂ çıktısıyla eşleşir.",
        ],
        [
          "Her besin ve koşulda 18 µmol O₂ çıkışı",
          "Kökteki özel gaz oranı bütün metabolizmalara genellenemez.",
        ],
      ],
      "Glikoz temelli toplam denklemde O₂/CO₂ mol oranı 1'dir.",
      "Verilen özel oranı kullan; sınırını koru.",
      [
        "Net CO₂ alımı 18 µmol'dür.",
        "Model aynı miktarda net O₂ çıkışı tanımlar.",
        "Sonuç 18 µmol O₂ çıkışıdır; bütün besinler için evrensel oran iddiası içermez.",
      ],
      "CO₂ ve O₂'nin 6:6 katsayıları sadeleşir.",
      "Glikoz katsayısı 6'yı CO₂ miktarına yeniden uygulamak.",
    ),
    q022(
      "Oksijenli fotosentezde dışarı verilen O₂'nin oksijen atomlarını doğrudan izlemek için hangi girdinin oksijeni işaretlenmelidir?",
      "Su",
      [
        [
          "Yalnız CO₂'nin karbonu",
          "Karbon etiketi oksijen atomunun kaynağını göstermez.",
        ],
        ["Yalnız ATP'nin adenini", "Adenin bu O₂'nin atom kaynağı değildir."],
        [
          "Yalnız glikozun karbonu",
          "Bu karbon izleme olur; fotosentetik gazın oksijen kaynağı suyla ilişkilidir.",
        ],
        ["Yalnız klorofilin magnezyumu", "Mg atomu O atomuna dönüşmez."],
      ],
      "Fotosentetik O₂ suyun parçalanmasıyla oluşur.",
      "Gazdaki elementin girdi atom yolunu izle.",
      [
        "Doğrusal ışık tepkimelerinde su elektron verir.",
        "Bu suyun oksijen atomları O₂ ürününe katılır.",
        "Bu nedenle suyun oksijenini işaretlemek doğrudan kaynak denetimidir.",
      ],
      "Element etiketi aynı elementin ürün atomlarında aranır.",
      "Toplam denkleme bakıp O₂'yi CO₂'nin parçalanmasına bağlamak.",
    ),
    q022(
      "ATP sentaz üzerinden proton dönüş yönleri hangi seçenekte doğrudur?",
      "Kloroplastta lümen → stroma; mitokondride zarlar arası boşluk → matriks",
      [
        [
          "Kloroplastta stroma → lümen; mitokondride matriks → zarlar arası boşluk",
          "Bu yönler proton gradyanının kurulma tarafıyla karıştırılmıştır.",
        ],
        [
          "Her ikisinde çekirdek → sitozol",
          "Verilen organel zarlarının bölmeleri bunlar değildir.",
        ],
        [
          "Kloroplastta stoma → epidermis; mitokondride ribozom → DNA",
          "Stoma yaprak açıklığıdır; stroma değildir, diğer yön de proton bölmesi değildir.",
        ],
        [
          "Her ikisinde su yalnız hücre dışına akar",
          "Sorulan protonların ATP sentazdan geçişidir; suyun toplu akışı değildir.",
        ],
      ],
      "ATP sentaz, protonların yüksek elektrokimyasal potansiyelden dönüşünü ATP senteziyle bağlar.",
      "Her organelde proton biriken bölmeyi ve dönüş tarafını ayrı adlandır.",
      [
        "Kloroplastta proton birikimi tilakoit lümenindedir; dönüş stromayadır.",
        "Mitokondride birikim zarlar arası boşlukta, dönüş matriksedir.",
        "Aynı ilke farklı zar bölmeleriyle uygulanır.",
      ],
      "Stroma ile stoma sözcüklerini ayır.",
      "Pompalama yönünü ATP sentaz dönüş yönü sanmak.",
    ),
    q022(
      "Bir bitkinin kloroplast taşımayan canlı kök hücresi için hangisi uygundur?",
      "Uygun besin ve koşullarda solunumla ATP sağlayabilir",
      [
        [
          "Kloroplast yoksa hiçbir ATP üretilemez",
          "Hücresel enerji üretimi yalnız fotosenteze bağlı değildir.",
        ],
        [
          "Gece bütün enzimleri zorunlu durur",
          "Solunum gece de sürebilir; böyle bir kural yoktur.",
        ],
        [
          "Kök hücresi mutlaka fotosentetik O₂ verir",
          "Kloroplastsız hücreye oksijenli fotosentez atfedilemez.",
        ],
        [
          "Mitokondri taşıması için yaprak olması gerekir",
          "Kökün canlı hücreleri de mitokondri taşıyabilir.",
        ],
      ],
      "Fotosentez ile hücresel solunum farklı organel ve yolları kullanır.",
      "Kloroplast bilgisini yalnız fotosentez yeteneğine bağla.",
      [
        "Kök hücresinin ATP gereksinimi vardır.",
        "Uygun organik besinler hücresel solunumda kullanılabilir.",
        "Kloroplast bulunmaması bu solunum olanağını ortadan kaldırmaz.",
      ],
      "Bitkide fotosentez yapmayan canlı dokular da enerji kullanır.",
      "Bitkilerin bütün hücrelerini fotosentez yapan hücre saymak.",
    ),
    q022(
      "Aydınlıkta net CO₂ alımı 7 µmol/saat. Solunumun aynı anda 2 µmol/saat olduğu ayrıca verilmiş. Brüt fotosentez kaç µmol/saattir?",
      "9",
      [
        ["5", "Netten solunumu yeniden çıkarmak yerine eklemek gerekir."],
        ["7", "Bu yalnız ölçülen net akıdır."],
        ["14", "Akılar arasında verilmiş bir iki kat kuralı yoktur."],
        ["2", "Bu solunum akısıdır, brüt foto akısı değildir."],
      ],
      "Net = brüt − R olduğundan brüt = net + R.",
      "Bağıntıyı bilinmeyen brüt akı için düzenle.",
      [
        "Net alım 7, solunumsal çıkış 2 olarak verilmiştir.",
        "Brüt alım = 7 + 2 = 9 µmol/saat.",
        "9'dan 2 çıkınca ölçülen 7 elde edilir.",
      ],
      "Sonuç brüt ≥ net ilişkisini sağlar.",
      "Aynı solunumu iki kez çıkarmak.",
    ),
    q022(
      "Brüt fotosentez 12 µmol/saat; solunum bütün gün sabit 2 µmol/saat. Günlük sıfır net CO₂ değişimi için aydınlık kaç saat olmalıdır?",
      "4",
      [
        ["2", "2 saat brüt 24 verir; günlük kayıp 48'dir."],
        ["6", "6 saat brüt 72 verir ve bilanço pozitif olur."],
        ["12", "Bu, verilen hızlara göre gerekenden fazladır."],
        ["24", "Sıfır günlük bilanço bütün gün ışık gerektirmez."],
      ],
      "Günlük denge P × t = R × 24 ile kurulur.",
      "Önce 24 saatlik kaybı hesapla.",
      [
        "Günlük kayıp 2 × 24 = 48 µmol CO₂'dir.",
        "12 × t = 48 için t = 4 saattir.",
        "Bu süre 0–24 aralığında olduğundan verilen modelde mümkündür.",
      ],
      "4 × 12 − 24 × 2 = 0.",
      "Anlık hız eşitliğiyle günlük süre dengesini karıştırmak.",
    ),
    q022(
      "Fotosentez ve solunum ilişkisi için hangi ifade doğrudur?",
      "Toplam maddeler bağlanabilir; iki yol aynı enzimli basamakların tam tersi değildir",
      [
        [
          "Solunumda yapılan ATP besin zincirinde değişmeden bütün canlılara gider",
          "ATP hücrelerde yerel üretilip kullanılır; besinlerde kimyasal enerji taşınır.",
        ],
        [
          "İki toplam denklem benziyorsa bütün ara tepkimeler de ters sıradadır",
          "Toplam stoikiyometri enzim mekanizmasının özdeşliğini göstermez.",
        ],
        [
          "Bütün prokaryotların solunum için mitokondrisi bulunur",
          "Prokaryotlarda mitokondri yoktur; uygun zar düzenekleri kullanılabilir.",
        ],
        [
          "Elementler ve kullanılabilir enerji aynı biçimde döngü yapar",
          "Elementler döngüye girerken enerji aktarımında ısı kayıpları ve yönlü akış vardır.",
        ],
      ],
      "Toplam denklem ile mekanizma ayrı açıklama düzeyleridir.",
      "Madde bağlantısını kabul ederken enzim ve enerji yolunu ayrı kontrol et.",
      [
        "Bir yolun ürünleri diğerine girdi sağlayabilir.",
        "Ancak enzimler, ara ürünler ve enerji bağlama düzenekleri farklıdır.",
        "Bu nedenle toplam ilişki, basamakların bire bir tersliği değildir.",
      ],
      "Toplam madde hesabı doğru mekanizma ayrımıyla birlikte kullanılmalıdır.",
      "Denklem oklarını ters çevirip bütün yolu aynı sanmak.",
    ),
    q022(
      "Karanlık ölçümde solunum 3 µmol/saat bulunuyor. Bu değerden aydınlıktaki brüt fotosentezi hesaplamak için solunumu aynı kabul etmek isteniyor. Hangi ek öncül gereklidir?",
      "Solunum hızının iki ölçüm koşulunda aynı kaldığı",
      [
        [
          "Aydınlıkta bütün ATP tüketiminin sıfır olduğu",
          "Brüt hesabı için gerekli olan, solunumun eşitliği koşuludur; ATP tüketiminin sıfırlanması değildir.",
        ],
        [
          "Bitkinin bütün hücrelerinde kloroplast bulunduğu",
          "Bu hem zorunlu değildir hem genelde yanlıştır.",
        ],
        [
          "Günlük taze kütlenin kesin değişmediği",
          "Taze kütle başka girdilerden etkilenir ve bu akı varsayımını sağlamaz.",
        ],
        [
          "Işık görülünce mitokondrilerin yok olduğu",
          "Aydınlıkta solunum sürebilir; organel yok oluşu varsayılmaz.",
        ],
      ],
      "Bir koşuldaki ölçümü diğerine taşımak aynı kalan değişken öncülü ister.",
      "Karanlıkta ölçülen hangi akının aydınlıkta kullanıldığını belirle.",
      [
        "Karanlık ölçümü o koşulun solunumunu verir.",
        "Bunu aydınlık netine eklemek için aydınlık solunumunun da 3 olması gerekir.",
        "Bu eşitlik verilmeden kesin brüt hız hesaplanamaz.",
      ],
      "Ölçümün geçerliği ile başka koşula aktarımı aynı şey değildir.",
      "Gece ölçümünü her gündüz koşulunda değişmez sanmak.",
    ),
    q022(
      "Bir bitki için günlük net karbon alımı pozitif ölçülmüştür. Su alışverişi ve diğer madde giriş–çıkışları verilmemiştir. Hangisine kesin ulaşılamaz?",
      "Taze kütlesinin kaç gram arttığına",
      [
        [
          "Seçilen sınırda net karbon girişinin pozitif olduğuna",
          "Bu doğrudan verilmiş ölçümdür.",
        ],
        [
          "Ölçümün günlük bir aralığı kapsadığına",
          "Kök günlük ölçümü açıkça belirtir.",
        ],
        [
          "Karbon alımının net bir fark olduğuna",
          "Net sözcüğü alım ve çıkış farkını anlatır.",
        ],
        [
          "Taze kütle için ek madde bilgisi gerektiğine",
          "Su ve diğer girdiler bilinmediği için bu doğrudur.",
        ],
      ],
      "Taze kütle yalnız karbon değil, su ve diğer maddeleri de içerir.",
      "Verilen karbon birimini istenen toplam gramla karşılaştır.",
      [
        "Pozitif net karbon, seçilen ölçümde girişin çıkışı aşmasıdır.",
        "Ancak taze kütlede su alışverişinin katkısı da bulunur.",
        "Su ve diğer bütçeler verilmeden taze kütlenin kaç gram değiştiği kesin bulunamaz.",
      ],
      "Karbon miktarından tek başına toplam taze kütleye geçilmez.",
      "Karbon kazancını bütün taze kütle artışına eşitlemek.",
    ),
  ],
  source:
    "MEBİ AYT Biyoloji Bölüm 2 fiziksel PDF 72–73; OGM Hücresel Solunum PDF 8–29; OGM Fotosentez–Hücresel Solunum PDF 2–16; Dersler Cepte Hücresel Solunum PDF 10–19. Günlük sabit akı modeli ve özgün sorular; RQ = 1, aynı solunum hızı ve seçilen sistem sınırı açıkça belirtilir.",
});

units022.push({
  id: "ayt-meristem-doku",
  topic: "detail-342",
  title: "Meristem: bölünme, uzama ve kalınlaşma",
  minutes: 55,
  objectives: [
    "Meristem hücresini yapısı ve bulunduğu yerle tanı.",
    "Bölünme, uzama ve farklılaşmayı ayrı olaylar olarak açıkla.",
    "Kambiyum ürünlerinin yönünü ve yıllık halka sayımının koşullarını kullan.",
  ],
  sections: [
    s022(
      "Bitkide büyümenin kaynağı",
      "Doku, ortak görevler için düzenlenmiş hücre topluluğudur. Bitkide meristemler yeni hücre oluşumuna kaynaklık eden bölgelerdir. Yeni hücrelerin bir bölümü meristem özelliğini sürdürürken diğerleri büyüyüp farklılaşabilir; böylece hem büyüme bölgesi korunur hem de olgun dokular oluşur.",
      "Kök sistemi su ve mineral alınmasına, sürgün sistemi yaprak, gövde ve üreme organlarının taşınmasına katkı verir. Bu sistemlerin büyümesi eşgüdüm gerektirir. Bir bitkinin büyümesini yalnız hücre bölünmesi sayısına indirgemeyiz; hücrelerin uzaması, hacim kazanması ve göreve özgü biçim alması da gerekir.",
    ),
    s022(
      "Bir meristem hücresini tanı",
      "Tipik etkin meristem hücreleri canlıdır; ince birincil çeper, görece büyük çekirdek ve yoğun sitoplazma taşır. Kofulları genellikle küçük ve çok sayıda olabilir; hücreler birbirine yakın yerleşir. Bu yapı, olgun büyük kofullu parankima hücresinden farklı bir görünüm verebilir.",
      "Bu özellikler mikroskobik kanıtları birlikte yorumlamaya yarar. Tek başına büyük çekirdek her örneğin kesin meristem olduğu anlamına gelmez; bulunduğu bölge ve bölünme etkinliği de dikkate alınır. Meristem, her hücrenin her an aynı hızla bölündüğü veya sonsuza dek hiç değişmediği bir topluluk değildir.",
    ),
    s022(
      "Bölünme sayıyı, uzama boyutu değiştirir",
      "Mitoz ve sitokinez bir ana hücreden iki yavru hücre oluşturur. DNA eşlenmesi hücre döngüsünün mitozdan önceki S evresindedir. Tamamlanmış mitoz sonrasında yavruların kromozom sayısı, normal bir mitotik soyda ana hücrenin sayısıyla aynıdır; hücre sayısının artması hücre başına kromozom sayısının artması değildir.",
      "Uzama evresinde bir hücre su alımı, çeper düzenlenmesi ve madde senteziyle boyut kazanabilir; bunun için aynı anda yeni bir hücre bölünmesi olmak zorunda değildir. Farklılaşmada ise gen etkinlikleri ve yapı değişerek iletim, örtü veya temel doku işlevleri gelişir. Bu üç olayı bir büyüme çiziminde ayrı işaretlemek neden–sonuç ilişkisini netleştirir.",
    ),
    s022(
      "Kök ucundaki sıralı bölgeler",
      "Kök ucunda kaliptra, yani kök şapkası, ilerleyen hassas ucu korur. Onun gerisinde apikal meristemle ilişkili bölünme bölgesi bulunur; daha geride uzama, ardından farklılaşma ve olgunlaşma bölgeleri belirginleşir. Emici tüyler olgunlaşma bölgesinde görülen özelleşmelerdir; kaliptrayı emici tüy bölgesi sanmayız.",
      "Kökün toprağa ilerlemesinde bu bölgelerin birlikte işi vardır: yeni hücreler oluşturulur, hücreler uzar ve sonunda işlev kazanır. Mikroskopta kök boyunca farklı yerlerden alınan örneklerde hücre boyutu ve bölünme oranı bu nedenle farklı olabilir. Bölge sınırları şemada öğrenmeyi kolaylaştırır; gerçek dokuda geçişler bütünüyle keskin çizgiler değildir.",
    ),
    s022(
      "Sürgün ucu ve tomurcuk",
      "Sürgün apikal meristemi gövde uçlarında bulunur ve birincil büyümeye katkı verir. Genç yaprak taslakları ve tomurcuk yapıları hassas büyüme bölgesini koruyabilir. Yaprak koltuklarındaki tomurcuk meristemleri yan sürgünlerin gelişmesine kaynaklık edebilir; bütün yeni dallar gövdenin rastgele ölü noktalarından çıkmaz.",
      "Apikal etkinlik ve yan tomurcukların gelişmesi bitkinin genetik ve hormonal düzenlenmesiyle ilişkilidir. Bir ucu kesmenin bütün türlerde aynı hızda ve aynı sayıda dal oluşturacağını öncülsüz söylemeyiz. Bu ünitenin sayısal soy modeli bu karmaşık hormonal düzeni değil, verilen ideal hücre bölünme hesabını gösterir.",
    ),
    s022(
      "İki sınıflama iki farklı soru sorar",
      "Konumuna göre apikal meristem uçlarda; lateral meristem kök ve gövdede yan doğrultuda uzanan büyüme bölgelerinde bulunur. Apikal etkinlik boyuna, lateral etkinlik enine büyümeye katkı verir. Bazı bitkilerde, özellikle çimensi türlerin boğum veya yaprak tabanlarında, ara meristem etkinliği yeniden uzamayı destekleyebilir.",
      "Kökenine göre birincil meristem embriyonik bölünme özelliğini sürdüren hücrelerle, ikincil meristem ise sonradan yeniden bölünür hâle gelen hücrelerle tanımlanır. Konum ve köken aynı eksen değildir. Özellikle bütün lateral meristem hücrelerini yalnızca sonradan dönüşmüş tek bir hücre tipine indirgemek gerçek doku kökenlerini aşırı basitleştirir.",
      {
        headers: ["Soru", "Sınıflama", "Ana ilişki"],
        rows: [
          [
            "Nerede?",
            "Apikal / lateral / bazı türlerde ara",
            "Büyümenin konumu",
          ],
          [
            "Hangi gelişim kökeni?",
            "Birincil / ikincil",
            "Bölünme özelliğinin sürekliliği veya yeniden kazanılması",
          ],
        ],
      },
    ),
    s022(
      "Birincil dokulara giden yollar",
      "Birincil büyüme sırasında uç meristemden gelişen hücreler örtü, temel ve iletim doku sistemlerine farklılaşır. Protoderma birincil örtüyle, temel meristem temel dokularla, prokambiyum birincil iletim dokularıyla ilişkilidir. Bu adlar aynı hücrenin aynı anda bütün olgun işlevleri yaptığı anlamına gelmez; gelişim çizgilerini adlandırır.",
      "Birincil büyüme yalnız bir bitkinin hayatındaki ilk takvim yılı demek değildir. Çok yıllık bir ağaçta uçlar yeni sürgünler ve kök bölümleri oluştururken birincil büyüme devam eder; daha eski kısımlarda aynı dönemde ikincil büyüme görülebilir. Aynı bitkide iki büyüme tipinin birlikte bulunması normaldir.",
    ),
    s022(
      "Damar kambiyumunun iki yanı",
      "Vasküler, yani damar kambiyumu bölünerek içe doğru ikincil ksilem, dışa doğru ikincil floem oluşturur. Ksilem birikimi odunun önemli bölümünü meydana getirir. Kambiyumun hangi yanında hangi ürünün oluştuğunu kesitte merkeze ve dış çevreye göre izlemek, yalnız iki renk ezberlemekten daha güvenlidir.",
      "Damar kambiyumunun bir kısmı prokambiyumdan kalan hücre çizgileriyle, bazı kısımları da yeniden bölünür hâle gelen hücrelerle ilişkili olabilir. Bu yüzden 'her kambiyum hücresi yalnız parankimanın sonradan dönüşmesidir' diye evrensel kural koymayız. Köken ayrıntısı farklı olsa da iç ksilem–dış floem yönü bu öğretim modelinin temel ilişkisidir.",
    ),
    s022(
      "Mantar kambiyumu ve koruyucu dış yapı",
      "Kalınlaşan bir gövdenin ilk epidermisi çevre artışına her zaman uyum sağlayamaz. Mantar kambiyumu dışa doğru koruyucu mantar hücreleri, içe doğru felloderm denilen canlı doku oluşturabilir. Bu üçlü, yani mantar, mantar kambiyumu ve felloderm, periderm sistemini meydana getirir.",
      "Mantar dokunun çeperlerindeki süberin su kaybının ve dış etkenlerin sınırlandırılmasına katkı sağlar. Koruma, gaz alışverişinin bütünüyle sonsuza dek sıfır olduğu anlamına gelmez; ilgili açıklıklar ve doku yapısı ayrıca önemlidir. Peridermi yalnız mantar kambiyumunun kendisiyle veya tamamı canlı parankimayla eşitlemeyiz.",
    ),
    s022(
      "Odun ve kabuk aynı sınır değildir",
      "Odunsu bir kesitte ikincil ksilem merkez tarafında birikir; odun kavramı bu doku birikimiyle ilişkilidir. Kabuğun botanik kullanımı ise damar kambiyumunun dışında kalan dokuları kapsar; yalnız elimize gelen en dış kuru tabaka değildir. İçte floem, dışta koruyucu yapılar bu kapsama katkı verir.",
      "Kesit şemasını okurken önce öz ve merkezi, sonra ksilemi, damar kambiyumunu ve dış dokuları sırala. Her renkli halka doğrudan bir yıllık yaş çizgisi değildir; bazıları farklı dokudur. Yaş hesabı yapılacaksa özellikle yıllık odun artışlarının nasıl tanımlandığı verilmelidir.",
    ),
    s022(
      "Yıllık halkada iki farklı odun",
      "Mevsimsel büyüme görülen uygun örneklerde erken odun genellikle daha geniş lümenli ve daha ince çeperli elemanlar; geç odun daha dar lümenli ve daha kalın çeperli elemanlar içerebilir. Bu farklar açık ve koyu görünüm veren bantlar oluşturur. Bir erken ve onu izleyen geç odun bölümü bir yıllık büyüme artışını temsil edebilir.",
      "Bu sayım için yıllık düzenin o örnekte geçerli olduğu, eksik veya yalancı halka bulunmadığı belirtilmelidir. Belirli bir gövde yüksekliğindeki kesit o noktaya ait birikimi gösterir; bütün ağacın tohumdan beri yaşıyla her zaman aynı değildir. Halka genişliği de yalnız yağışın değil çok sayıda çevresel ve gelişimsel etkenin sonucudur.",
    ),
    s022(
      "Hangi bitkide hangi kalınlaşma?",
      "Alışılagelmiş damar kambiyumuna bağlı ikincil büyüme açık tohumlularda ve çok sayıda odunsu çift çenekli grupta belirgindir. Bazı otsu çift çeneklilerde de sınırlı ikincil büyüme olabilir. Bir bitkiye yalnız dış görünüşünden otsu denmesi bütün lateral büyümenin yokluğunu kanıtlamaz.",
      "Çoğu tek çeneklide bu tip kesintisiz damar kambiyumu bulunmaz; bununla birlikte bazı gruplarda farklı kalınlaşma düzenleri vardır. Dolayısıyla 'hiçbir tek çenekli kalınlaşamaz' gibi bir sonuç kurmayız. Sınavda öğretim şeması ile gerçek örneğin koşulu birlikte okunur; istisnalar temel yön ve doku ilişkilerini ortadan kaldırmaz.",
    ),
    s022(
      "İdeal soyu sayısallaştır",
      "Başlangıçtaki N hücrenin her turda bir kez bölündüğü ve hiçbir hücrenin kaybolmadığı kapalı bir soyda k tur sonunda N × 2ᵏ hücre oluşur. Yeni hücre sayısı son sayıdan başlangıcı çıkararak bulunur. Her mitoz olayı toplam hücre sayısını bir artırdığı için toplam bölünme olayı da bu farktır.",
      "Keşifte bütün son hücrelerin daha sonra aynı katsayıyla uzadığı ve en kesit alanlarının sabit olduğu varsayılır. Bu, hacmi değiştirebilir fakat hücre sayısını tekrar ikiye katlamaz. Çizim bir başlangıç hücresinin örnek soyunu gösterirken HTML sonucu verilen bütün başlangıç hücrelerini sayar; model gerçek bitkinin günlük büyümesini öngörmez.",
    ),
  ],
  examples: [
    e022(
      "Üç tur sonunda",
      "Başlangıçta 3 hücre var. Her hücre üç turun her birinde bir kez mitoz ve sitokinez geçiriyor; ölüm yok. Son hücre ve toplam bölünme olayı sayısı nedir?",
      "Her tur ikiye katla, sonra başlangıcı çıkar.",
      [
        "Son hücre sayısı 3 × 2³ = 24 olur.",
        "Toplam artış 24 − 3 = 21 hücredir.",
        "Her bölünme toplamı bir artırdığından 21 bölünme olayı gerçekleşmiştir.",
      ],
      "24 hücre, 21 bölünme olayı",
      "Tur artışları 3 + 6 + 12 = 21'dir.",
      "Tur sayısı 3'ü bütün bölünme olaylarının sayısı sanmak.",
    ),
    e022(
      "Sayı aynı, hacim farklı",
      "8 son hücrenin her biri başlangıçta 1 hacim birimi. Hücreler bölünmeden, sabit en kesitle uzunluklarını 3 katına çıkarıyor. Son hücre sayısı ve toplam hacim nedir?",
      "Bölünme ile boyut değişimini ayır.",
      [
        "Yeni bölünme olmadığından hücre sayısı 8 kalır.",
        "Sabit en kesitte uzunluk 3 kat olunca her hücrenin hacmi 3 birim olur.",
        "Toplam hacim 8 × 3 = 24 birimdir; hücre sayısı 24 değildir.",
      ],
      "8 hücre, 24 hacim birimi",
      "Başlangıç toplam hacim 8; son hacim üç katıdır.",
      "Uzama katsayısını hücre sayısına uygulamak.",
    ),
    e022(
      "Kambiyumun yönünü izle",
      "Merkezden dışa kesit sırası öz → ksilem → damar kambiyumu → floem olarak verilmiş. Yeni ikincil ksilem ve floem hangi yanda birikir?",
      "Kambiyumu referans al, merkeze göre yönü belirle.",
      [
        "Kambiyumun merkez tarafı iç, epidermise doğru tarafı dıştır.",
        "İkincil ksilem kambiyumun iç tarafında, ikincil floem dış tarafında oluşur.",
        "Bu birikim enine büyümeye katkı verir; uç meristemin boyuna büyümesiyle aynı yön değildir.",
      ],
      "İçte ksilem, dışta floem",
      "Verilen başlangıç kesit sırası korunur.",
      "İç ve dışı çizimin sağ veya soluna göre tanımlamak.",
    ),
    e022(
      "Halka çiftlerini say",
      "Bir gövde noktasında eksik ve yalancı halka olmadığı, her yıl bir erken ve bir geç odun bandı oluştuğu verilmiş. 7 erken ve 7 geç odun bandı var. Bu noktadaki birikim kaç yılı temsil eder?",
      "İki bandı bir yıllık artış olarak eşleştir.",
      [
        "Bir yılın erken ve geç odunu bir çifttir.",
        "7 erken ve 7 geç bant 7 tam çift oluşturur.",
        "Birikim bu noktada 7 yılı temsil eder; bütün ağacın çimlenmeden beri yaşı için kesit yüksekliği de gerekir.",
      ],
      "Bu kesit noktasında 7 yıl",
      "14 ayrı bandı 2'ye bölünce 7 çift bulunur.",
      "Her açık veya koyu bandı ayrı yıl saymak.",
    ),
  ],
  recall: [
    {
      prompt: "Bölünme ve uzama aynı değişkeni mi artırır?",
      answer:
        "Bölünme hücre sayısını; uzama hücre boyutunu artırabilir. İkisi ayrı olaydır.",
    },
    {
      prompt: "Damar kambiyumu içe ve dışa ne üretir?",
      answer: "İçe ikincil ksilem, dışa ikincil floem.",
    },
    {
      prompt: "Konum ve köken sınıflamaları neden ayrı?",
      answer:
        "Apikal/lateral nerede olduğunu, birincil/ikincil gelişim kökenini sorar.",
    },
    {
      prompt: "Bir açık ve bir koyu odun bandı hangi koşulda bir yıldır?",
      answer:
        "Örnekte yıllık erken/geç düzeni geçerli ve yalancı/eksik halka yoksa.",
    },
  ],
  items: [
    q022(
      "Bir kök ucunda ince çeperli, yoğun sitoplazmalı, görece büyük çekirdekli, küçük kofullu ve sık yerleşmiş hücreler bölünüyor. En uygun doku?",
      "Meristem",
      [
        [
          "Olgun sklerenkima lifi",
          "Olgun ligninli lif tipik olarak kalın ikincil çeperlidir ve bölünen canlı hücre görünümünü vermez.",
        ],
        [
          "Olgun trake",
          "Trake iletim olgunluğunda canlılığını yitirmiş bir iletim elemanıdır.",
        ],
        [
          "Mantarın ölü dış hücreleri",
          "Verilen etkin bölünme ve canlı iç yapı bu hücrelerle uyuşmaz.",
        ],
        [
          "Yalnız boş hava aralığı",
          "Kökte çekirdekli ve sitoplazmalı gerçek hücreler tarif edilmiştir.",
        ],
      ],
      "Meristemler yeni hücre oluşumuna kaynaklık eden bölgelerdir.",
      "Birlikte verilen hücre yapısı ve etkinlik kanıtlarını eşleştir.",
      [
        "İnce çeper ve yoğun sitoplazma bölünen hücrelerle uyumludur.",
        "Kök ucu ve gözlenen bölünme konum–işlev kanıtı ekler.",
        "Bu birleşik kanıt meristemi gösterir.",
      ],
      "Tek bir özellik yerine bütün gözlemler aynı dokuyla uyuşur.",
      "Yalnız kökte bulunmayı yeterli saymak.",
    ),
    q022(
      "2 başlangıç hücresinin her biri dört turun her birinde bir kez mitoz ve sitokinez geçiriyor; hücre kaybı yok. Son sayı?",
      "32",
      [
        [
          "8",
          "Başlangıç sayısını tur sayısıyla çarpmak üstel soy büyümesini vermez.",
        ],
        [
          "16",
          "Bu tek başlangıç hücresinin dört tur sonudur; iki başlangıç vardır.",
        ],
        ["30", "Bu yeni hücre sayısıdır; son toplam 32'dir."],
        ["64", "Bir fazladan ikiye katlama yapılmıştır."],
      ],
      "Kapalı eşzamanlı soyda son sayı N × 2ᵏ'dır.",
      "Tur sayısını üste, başlangıç sayısını çarpan olarak yaz.",
      [
        "Dört turun katı 2⁴ = 16'dır.",
        "İki başlangıç için 2 × 16 = 32 hücre oluşur.",
        "Yeni hücre sayısı 30 olsa da sorulan son toplam 32'dir.",
      ],
      "2 → 4 → 8 → 16 → 32 dizisi dört turdur.",
      "Yeni sayı ile son toplamı karıştırmak.",
    ),
    q022(
      "Normal mitotik bir soyda başlangıç hücresi 2n = 8 kromozomlu. Tamamlanmış mitoz ve sitokinezden sonra her yavruda kaç kromozom bulunur?",
      "8",
      [
        [
          "16",
          "DNA'nın önce eşlenmesi tamamlanmış yavruda kromozom sayısının iki kat kalması değildir.",
        ],
        ["4", "Bu mayotik yarılanma olurdu; verilen olay mitozdur."],
        [
          "2",
          "İki yavru oluşması kromozom sayısının iki olması demek değildir.",
        ],
        ["0", "Normal canlı yavrular çekirdek kromozomlarını kaybetmez."],
      ],
      "Normal mitoz kromozom takımını yavrularda korur.",
      "Tamamlanmış yavruyu S evresindeki DNA miktarından ayır.",
      [
        "DNA eşlenmesi mitozdan önce gerçekleşir.",
        "Kardeş kromatitler ayrılıp yavrulara dağıtılır.",
        "Her tamamlanmış yavruda başlangıçtaki gibi 8 kromozom bulunur.",
      ],
      "Her yavru ana hücrenin normal mitotik takımını taşır.",
      "DNA miktarı artışını kalıcı kromozom sayısı artışı sanmak.",
    ),
    q022(
      "10 hücre bölünmeden, sabit en kesitte uzunluklarını 2 katına çıkarıyor. Her biri önce 1 hacim birimi. Son hücre sayısı ve toplam hacim?",
      "10 hücre ve 20 hacim birimi",
      [
        [
          "20 hücre ve 20 hacim birimi",
          "Uzama yeni hücre oluşturmaz; sayı iki katına çıkmaz.",
        ],
        [
          "10 hücre ve 10 hacim birimi",
          "Sabit en kesitte uzunluk iki kat olunca hacim de artar.",
        ],
        ["5 hücre ve 20 hacim birimi", "Uzama hücre sayısını yarıya indirmez."],
        [
          "20 hücre ve 10 hacim birimi",
          "Hem sayı hem hacim ilişkileri ters kurulmuştur.",
        ],
      ],
      "Sabit en kesitte hacim uzunlukla orantılıdır; bölünme yoksa hücre sayısı değişmez.",
      "Sayı ve hacim için iki ayrı satır kur.",
      [
        "Bölünme olmadığından 10 hücre korunur.",
        "Her hücre 2 hacim birimi olur.",
        "Toplam 10 × 2 = 20 hacim birimidir.",
      ],
      "Son hacim iki kat, sayı aynı kalır.",
      "Büyümeyi her durumda bölünme saymak.",
    ),
    q022(
      "Kökün ilerleyen ucunu koruyan yapı ile emici tüylerin belirgin olduğu bölge doğru eşleşmesi?",
      "Kaliptra; olgunlaşma bölgesi",
      [
        [
          "Emici tüy; kaliptranın içindeki bütün bölge",
          "Emici tüyler uç koruyucusu değil, olgunlaşan epidermal yapılardır.",
        ],
        [
          "Damar kambiyumu; yalnız kök şapkası",
          "Damar kambiyumu uç koruyucusu değildir; emici tüy bölgesi de kök şapkası değildir.",
        ],
        [
          "Floem; yalnız bölünme bölgesi",
          "Floem iletim dokusudur; emici tüyler bölünme bölgesinin adı değildir.",
        ],
        [
          "Yıllık halka; sürgün tomurcuğu",
          "Bunlar sorulan kök ucu yapı–bölge çiftini karşılamaz.",
        ],
      ],
      "Kaliptra kök ucunu korur; emici tüyler farklılaşma/olgunlaşma alanıyla ilişkilidir.",
      "Koruma görevini emilim görevinden ayır.",
      [
        "İlerleyen apikal bölgenin önündeki kök şapkası kaliptradır.",
        "Uzama bölgesinin gerisindeki hücreler farklılaşıp emici tüy geliştirebilir.",
        "Doğru çift kaliptra ve olgunlaşma bölgesidir.",
      ],
      "Kök boyunca konum sırası koruma → bölünme → uzama → olgunlaşmadır.",
      "Bütün kök yapılarını aynı noktada sanmak.",
    ),
    q022(
      "Bir gövdede damar kambiyumu yeni ikincil iletim dokuları oluşturuyor. Merkeze ve dışa doğru doğru sıra?",
      "İçe ksilem, dışa floem",
      [
        [
          "İçe floem, dışa ksilem",
          "Kambiyum ürünlerinin yönü ters çevrilmiştir.",
        ],
        [
          "İçe yalnız epidermis, dışa yalnız öz",
          "Bu dokular damar kambiyumunun iki ana ikincil iletim ürünü değildir.",
        ],
        [
          "İki tarafa yalnız kaliptra",
          "Kaliptra kök ucunu korur; gövde kambiyum ürünü değildir.",
        ],
        [
          "İki tarafa yalnız çiçek poleni",
          "Polen üretimi bu lateral doku görevi değildir.",
        ],
      ],
      "Vasküler kambiyum ikincil ksilemi içe, floemi dışa üretir.",
      "İç yönü gövdenin merkezine göre belirle.",
      [
        "Kambiyumun merkeze bakan yanında ksilem birikir.",
        "Dış çevreye bakan yanında floem oluşur.",
        "Bu düzen enine büyümeye katkı verir.",
      ],
      "Odun birikimi merkez tarafındaki ikincil ksilemle ilişkilidir.",
      "Çizimin sağına bakıp anatomik yönü ters çevirmek.",
    ),
    q022(
      "Periderm sistemini doğru tanımlayan seçenek hangisidir?",
      "Mantar, mantar kambiyumu ve felloderm",
      [
        [
          "Yalnız damar kambiyumu",
          "Damar kambiyumu ile mantar kambiyumu farklı meristemlerdir; periderm üçlü bir sistemdir.",
        ],
        [
          "Yalnız olgun ksilem lümeni",
          "Lümen iletim boşluğudur; periderm dış koruyucu sistemdir.",
        ],
        [
          "Yalnız yaprak kloroplastları",
          "Kloroplast organeldir; periderm dokular topluluğudur.",
        ],
        [
          "Yalnız kalburlu boru ve arkadaş hücresi",
          "Bu çift floemle ilişkilidir; periderm değildir.",
        ],
      ],
      "Mantar kambiyumu dışa mantar, içe felloderm oluşturabilir.",
      "Meristemin iki ürününü meristemle birlikte say.",
      [
        "Koruyucu dış mantar hücreleri bir parçadır.",
        "Ortada mantar kambiyumu, iç tarafta felloderm yer alır.",
        "Bu üçü periderm sistemini oluşturur.",
      ],
      "Periderm yalnız en dış ölü tabaka değildir.",
      "Mantar doku ile bütün peridermi özdeş saymak.",
    ),
    q022(
      "'Apikal/lateral' ile 'birincil/ikincil' sınıflamalarının ilişkisini doğru açıklayan seçenek?",
      "İlki konumu, ikincisi gelişim kökenini sorar",
      [
        [
          "Dört sözcük aynı konumun eş anlamıdır",
          "Konum ve gelişim kökeni ayrı ölçütlerdir.",
        ],
        [
          "Her lateral hücre yalnız tek bir parankima kökeninden gelir",
          "Kambiyum gelişim çizgileri daha çeşitlidir; böyle bir evrensellik kurulmaz.",
        ],
        [
          "Birincil yalnız ilk takvim günü demektir",
          "Bu gelişim sınıflamasıdır; takvim günü sayımı değildir.",
        ],
        [
          "İkincil doku kesinlikle bölünemez",
          "İkincil meristem yeniden bölünebilme özelliğiyle ilişkilidir.",
        ],
      ],
      "Aynı yapıya farklı sınıflama soruları yöneltilebilir.",
      "Her terimin hangi soruyu yanıtladığını belirle.",
      [
        "Apikal/lateral, büyüme bölgesinin yerini anlatır.",
        "Birincil/ikincil, bölünme özelliğinin gelişim geçmişini anlatır.",
        "Bu eksenler tek bir özdeş liste gibi kullanılmaz.",
      ],
      "Konum bilgisi tek başına bütün hücre kökenini kanıtlamaz.",
      "Farklı sınıflama eksenlerini özdeşleştirmek.",
    ),
    q022(
      "Bir kesitte yıllık erken/geç odun düzeni doğrulanmış, eksik ve yalancı halka yok. 6 erken ve 6 geç odun bandı kaç yıllık yerel birikimdir?",
      "6",
      [
        ["12", "Bir erken ve bir geç bant aynı yılın iki bölümüdür."],
        ["3", "Zaten altı çift vardır; bir kez daha ikiye bölünmez."],
        ["24", "Bant sayısını fazladan ikiyle çarpmak için dayanak yoktur."],
        [
          "Kesinlikle bütün ağacın çimlenmeden beri 6 yıllık yaşıdır",
          "Verilen sayı kesit noktasının birikimidir; kesit yüksekliği ve öncesi bilinmez.",
        ],
      ],
      "Doğrulanmış örnekte bir erken–geç çifti bir yıllık artıştır.",
      "Bantları çiftle ve yerel kapsamı koru.",
      [
        "Altı erken bandın her biri bir geç bantla eşleşir.",
        "Altı tam çift altı yıllık artış verir.",
        "Bu, ölçülen kesit noktasındaki altı yıllık birikimdir.",
      ],
      "12 bant ÷ (2 bant/yıl) = 6 yıl.",
      "Her rengi ayrı yıl saymak veya yerel yaşı tüm ağaca taşımak.",
    ),
    q022(
      "Bir gövdede odun halkası geniş bulunuyor; tek başına bu ölçümden hangisi kesin çıkarılamaz?",
      "O yıl yalnız yağışın yüksek olduğu",
      [
        [
          "Ölçülen halkada radyal artışın daha geniş olduğu",
          "Bu ölçümün doğrudan betimidir.",
        ],
        [
          "Bir büyüme artışının gözlendiği",
          "Verilen halka bir büyüme artışı olarak tanımlanmıştır.",
        ],
        [
          "Neden için ek çevre ve gelişim bilgisi gerektiği",
          "Halka genişliği çok etkenlidir; bu doğru yorumdur.",
        ],
        [
          "Ölçümün belirli bir kesite ait olduğu",
          "Kök bunu açıkça belirtmektedir.",
        ],
      ],
      "Halka genişliği su, sıcaklık, yaş, rekabet ve başka etkenlerle değişebilir.",
      "Ölçülen sonucu tek bir nedene bağlamadan önce alternatifleri sor.",
      [
        "Geniş bir artış görülmüştür.",
        "Bu artışı birçok çevresel veya gelişimsel etken etkileyebilir.",
        "Tek ölçümden yalnız yağışın yüksek olduğu kesin sonucu çıkmaz.",
      ],
      "Korelasyon kanıtı tek başına tek neden değildir.",
      "Halka genişliğini yalnız yağış ölçeri gibi kullanmak.",
    ),
    q022(
      "Başlangıçta 4 hücre var; her biri iki tur tam mitoz ve sitokinez geçiriyor, kayıp yok. Toplam bölünme olayı kaçtır?",
      "12",
      [
        ["2", "Bu tur sayısıdır; her turda birçok hücre bölünür."],
        ["8", "Başlangıç sayısı ile turu çarpmak bütün soy olaylarını saymaz."],
        ["16", "Bu son hücre sayısıdır; toplam olay için başlangıç çıkarılır."],
        ["20", "Son ve ilk sayıyı toplamak olay sayısını vermez."],
      ],
      "Her bölünme hücre toplamına bir ekler; olay = son − ilk.",
      "Önce soy sonunu, sonra net artışı bul.",
      [
        "Son sayı 4 × 2² = 16 hücredir.",
        "Net artış 16 − 4 = 12'dir.",
        "Kayıp olmadığından toplam 12 bölünme olayı vardır.",
      ],
      "İlk tur 4 ve ikinci tur 8 olay; toplam 12.",
      "Son hücre sayısını bölünme olayı saymak.",
    ),
    q022(
      "Bitkilerde büyüme için en uygun genel ifade hangisidir?",
      "Aynı çok yıllık bitkide uçlarda birincil, eski kısımlarda ikincil büyüme birlikte görülebilir",
      [
        [
          "Birincil büyüme yalnız çimlenmenin ilk günü olur",
          "Birincil büyüme uçlarda yaşam boyunca sürebilir.",
        ],
        [
          "Otsu denen hiçbir bitkide lateral büyüme olmaz",
          "Bazı otsu gruplarda sınırlı ikincil büyüme görülebilir.",
        ],
        [
          "Hiçbir tek çenekli hiçbir yolla kalınlaşamaz",
          "Bazı tek çeneklilerde alışılmış damar kambiyumundan farklı kalınlaşma düzenleri vardır.",
        ],
        [
          "Kambiyum kök ucundaki kaliptranın diğer adıdır",
          "Biri lateral meristem, diğeri koruyucu kök şapkasıdır.",
        ],
      ],
      "Birincil büyüme gelişim tipidir; bitkinin bütün bölümlerini tek saate bağlamaz.",
      "Bitkinin farklı bölgelerini ayrı değerlendir.",
      [
        "Yeni kök ve sürgün uçları birincil büyümeyi sürdürebilir.",
        "Daha eski uygun kısımlarda kambiyumlar ikincil büyüme yapabilir.",
        "Bu iki etkinlik aynı bireyde birlikte bulunabilir.",
      ],
      "Yaşam biçimi etiketlerinden koşulsuz yokluk kuralı kurulmaz.",
      "Büyüme tiplerini bütün bireye ait tek bir dönem saymak.",
    ),
  ],
  source:
    "MEBİ AYT Biyoloji Bölüm 2 fiziksel PDF 77–80; OGM Bitkisel Dokular I PDF 4–11 ve 19; Dersler Cepte Bitkilerin Yapısı PDF 4, 6–7 ve 16–17; Aurelia TYT Bitki PDF 1–6 önkoşul sınıflaması. Özgün soy modeli normal mitoz, kayıpsız eşzamanlı bölünme ve sonradan sabit en kesitte uzama varsayar; gerçek bitki büyüme tahmini değildir.",
});

units022.push({
  id: "ayt-temel-doku",
  topic: "detail-343",
  title: "Temel doku: üretim, depo ve destek",
  minutes: 52,
  objectives: [
    "Parankima, kollenkima ve sklerenkimayı yapı–görev ilişkisiyle ayır.",
    "Dört parankima rolünü gerçek organ örnekleriyle açıkla.",
    "Kesit alanı bütçesini kur; alan verisinden ölçülmeyen hız sonucu çıkarma.",
  ],
  sections: [
    s022(
      "Doldurmak aynı zamanda iş yapmaktır",
      "Temel doku sistemi bitkinin örtü ve iletim sistemleri arasında kalan birçok bölgesini oluşturur. Kök, gövde ve yapraklarda bulunur; yalnız pasif bir dolgu değildir. Fotosentez, depo, kısa mesafeli madde alışverişi ve mekanik destek gibi farklı işler için özelleşmiş hücreleri kapsar.",
      "Parankima, kollenkima ve sklerenkima bu sistemin temel doku tipleridir. Bir organda birden fazla tip birlikte bulunabilir. Hücrenin canlılığı, çeperinin yapısı, şekli ve bulunduğu yer görevi açıklamaya yardımcı olur. Dokunun yalnız adına bakmak yerine bu kanıtları birlikte kullanacağız.",
    ),
    s022(
      "Parankimanın canlı hücreleri",
      "Olgun parankima hücreleri çoğunlukla canlıdır; genellikle ince birincil çeper ve belirgin koful taşır. Sitoplazma ve çekirdeğin bulunması metabolizma ve depo işlevlerini destekler. Hücreler işlev ve organa göre yuvarlak, uzamış veya farklı biçimlerde olabilir; tek bir şekil bütün parankimayı tanımlamaz.",
      "Parankima birçok görev için farklılaşabilir ama bu, her hücrenin her koşulda bütün bitkiye dönüşebileceği demek değildir. Yaralanma sonrası bazı hücrelerin yeniden bölünmesi veya doku kültüründe gelişim göstermesi uygun hormonal, besinsel ve genetik koşullara bağlıdır. Hücresel potansiyel ile gerçek deney sonucunu ayırmak gerekir.",
    ),
    s022(
      "Özümleme parankiması",
      "Kloroplastça zengin parankima fotosentezle organik madde üretimine katkı verir. Yaprak mezofilindeki palizat ve sünger parankiması yaygın örneklerdir; yeşil gövdelerde de özümleme yapan hücreler bulunabilir. Kloroplast sayısı ve ışık koşulu, hücrenin yalnız bulunduğu organ adından daha doğrudan kanıtlardır.",
      "Palizat hücreleri birçok sırt–karın yapılı yaprakta üst yüzeye yakın, uzun ve sık yerleşmiştir. Sünger hücreleri arasında daha çok hava aralığı bulunabilir; bunlar da kloroplast taşıyıp fotosentez yapabilir. 'Yalnız palizat fotosentez yapar' veya 'her yaprakta aynı katman düzeni vardır' genellemeleri doğru değildir.",
    ),
    s022(
      "Hava boşluğu hücre değildir",
      "Mezofildeki hava aralıkları gazların yaprak içinde yayılmasına katkı sağlar. Bir kesitte boşluk genişliği ile hücrelerin kapladığı alan ayrı ölçülür. Boşlukta çekirdek veya kloroplast bulunmaz; fakat boşluğun çevresindeki canlı hücreler gaz alışverişinden yararlanabilir.",
      "Kesitte hava oranı arttığında sabit toplam alanda hücrelere kalan alan azalır. Bu geometrik sonuç tek başına fotosentez hızının hangi yönde değişeceğini söylemez; gaz yayılımı, ışık, kloroplast, su ve enzim koşulları da etkilidir. Keşifte ölçülen alanları hesaplayacağız; bunları doğrudan hız tahmini diye sunmayacağız.",
    ),
    s022(
      "Depo parankimasında farklı maddeler",
      "Depo parankiması uygun organlarda karbonhidrat, yağ, protein veya su depolamaya katkı verir. Patates yumrusundaki nişasta, bazı tohumlardaki protein ve yağ, zeytin meyvesindeki yağ gibi örnekler aynı genel işlevin farklı içerikleridir. Kaktüs gibi etli yapılarda su depolama da önemlidir.",
      "Bir hücrenin depo maddesi taşıması onun mutlaka fotosentez yapması anlamına gelmez. Örneğin yer altındaki yumru başka dokulardan gelen organik karbonu kullanabilir. Depo ile kaynak olma durumu da değişebilir: çimlenme veya sürgün verme sırasında depolanmış madde mobilize edilip başka büyüyen bölgelere gönderilebilir.",
    ),
    s022(
      "Havalandırma parankiması",
      "Aerenkima denilen havalandırma parankimasında belirgin hücreler arası gaz boşlukları bulunur. Özellikle sucul veya suya doygun ortamlarla ilişkili bazı bitkilerde iç gaz taşınmasına katkı sağlayabilir. Hava kanalları, canlı hücrelere gerekli gazların ulaşmasını kolaylaştıran bir doku düzenidir.",
      "Bu boşluklar bitkinin fotosentez veya solunum gereksinimini ortadan kaldırmaz ve her suda yaşayan bitkide aynı oranı taşımaz. Geniş boşluk gözlemek tek başına tür adı veya su derinliği vermeye yetmez. İşlev yorumunu çevre ve diğer yapı kanıtlarıyla birlikte kurmak gerekir.",
    ),
    s022(
      "İletim parankiması ve kısa mesafe",
      "İletim demetlerinin çevresindeki parankima hücreleri, özümleme ürünleri ve su–mineral alışverişinde kısa mesafeli bağlantılar kurabilir. Bu görev, canlı hücreler arası yerel aktarımı açıklar. Parankimanın depo ve metabolizma görevleri de aynı bölgedeki madde kullanımını etkileyebilir.",
      "İletim parankiması, bütün bitki boyunca uzanan trake veya kalburlu borunun diğer adı değildir. Uzun mesafeli akışın ana iletim elemanları ile onlara madde sağlayan yerel hücreleri ayırırız. Benzer bir görev sözcüğü kullanılması bütün hücrelerin aynı çeper, çekirdek ve lümen yapısında olduğu anlamına gelmez.",
    ),
    s022(
      "Kollenkima: büyüyen bölgeye esnek destek",
      "Kollenkima, işlevsel olgunluğunda canlı hücrelerden oluşan destek dokusudur. Birincil çeperinde selüloz ve pektinle ilişkili eşit olmayan kalınlaşmalar görülebilir. Genç gövde ve yaprak sapı gibi uzamayı sürdüren bölgelerde mekanik desteğe katkı verir; büyümeyi bütünüyle durduracak tek tip taş duvar değildir.",
      "Köşe kollenkimasında kalınlaşma köşelerde, levha kollenkimasında belirli karşılıklı yüzlerde daha belirgin olabilir. Temel tanı, canlılıkla birlikte düzensiz birincil çeper kalınlaşmasıdır. Kollenkimayı ligninli kalın ikincil çeper taşıyan olgun sklerenkimayla yalnız 'ikisi destek' diye birleştirmeyiz.",
    ),
    s022(
      "Sklerenkima: kalın ikincil çeper",
      "Sklerenkima hücrelerinde genellikle ligninle güçlenmiş kalın ikincil çeper gelişir. Birçok örnekte hücreler işlevsel olgunluğa ulaştığında canlılığını yitirir; geride kalan çeper mekanik göreve katılır. Bu, desteğin yalnız canlı sitoplazmayla sağlanmadığını gösterir.",
      "Çeper kalınlığı, yerleşim ve hücre biçimi dayanımın türünü etkiler. 'Bütün sklerenkima yalnız kırılgan taş gibidir' demeyiz; uzun lifler çekme ve bükülmeye karşı katkı verebilir. Canlılık ve görev yorumunu hücrenin gelişim evresiyle birlikte yapmak, henüz olgunlaşan bir hücreyi yanlış sınıflamayı önler.",
    ),
    s022(
      "Lif ile taş hücresini ayır",
      "Sklerenkima lifleri uzun, dar ve çoğu kez demetler hâlinde düzenlenmiş hücrelerdir. Keten gibi bitkilerde liflerin mekanik niteliğinden yararlanılır. Taş hücreleri, yani sklereidler ise daha kısa veya farklı dallanmış biçimlerde olabilir; armuttaki kumlu his ve bazı sert kabuklar örnek verilebilir.",
      "İki örnek aynı genel doku grubuna girebilir; biri lif, diğeri taş hücresidir. Bir meyvenin tamamını tek bir taş hücresinden oluşmuş saymayız; parankima ve başka dokular birlikte bulunur. Mikroskobik kesitte tek hücre tipi görmek, organın bütün işlevlerini o hücreye yüklemek için yeterli değildir.",
    ),
    s022(
      "Üç dokuyu karşılaştırma ölçütü",
      "Bir tanı sorusunda önce canlılık ve çeperin birincil mi ikincil mi olduğunu incele. Sonra çeper kalınlaşmasının eşitliğini, hücre biçimini ve görevi ekle. Fotosentez yapan ince çeperli canlı hücre parankimayla; canlı düzensiz kalın birincil çeper kollenkimayla; olgun ligninli destek hücresi sklerenkimayla uyumludur.",
      "Bunlar eğitim için temel örüntülerdir; bir ölçütü bütün gelişim evreleri için mutlaklaştırmayız. Özellikle 'çekirdeği görülmedi' gözlemi, kesit düzlemi ve boyama bilgisi olmadan tek başına ölüm kanıtı değildir. Birden fazla kanıtı eşleştirerek yanlış seçenekleri elemek daha güvenilir bir yöntemdir.",
      {
        headers: ["Tipik özellik", "Parankima", "Kollenkima", "Sklerenkima"],
        rows: [
          [
            "Olgunlukta canlılık",
            "Çoğunlukla canlı",
            "Canlı",
            "Çoğu örnekte ölü",
          ],
          [
            "Çeper",
            "Genellikle ince birincil",
            "Eşit olmayan birincil kalınlaşma",
            "Genellikle ligninli kalın ikincil",
          ],
          [
            "Örnek görev",
            "Özümleme, depo, yerel aktarım",
            "Büyüyen kısımda destek",
            "Lif ve sklereid desteği",
          ],
        ],
      },
    ),
    s022(
      "Yüzdede hangi bütün?",
      "Bir mezofil örneğinin toplam alanı A ve hava oranı h ise hücre alanı A × (1 − h) olur. Palizatın hücre alanındaki payı p olarak verilirse palizat alanı, bütün A'nın değil kalan hücre alanının p katıdır. Sünger hücre alanı da kalan hücre alanından palizatı çıkararak bulunur.",
      "Örneğin toplamın yüzde 20'si hava, hücrelerin yüzde 75'i palizat ise palizat toplamın yüzde 60'ıdır: 0,80 × 0,75 = 0,60. Yüzdeleri doğrudan toplayıp çıkarmak yerine her yüzdede paydanın ne olduğunu yaz. Hava + palizat hücreleri + sünger hücreleri toplamı seçilen örnek alanını vermelidir.",
    ),
    s022(
      "Kesit modeli ve gerçek bitki",
      "Keşif, epidermis ve iletim demeti dahil edilmemiş seçili bir mezofil alanının ölçümünü gösterir. Hava, palizat hücreleri ve sünger hücreleri bu seçili alanın tamamını paylaşır. Renkli şekiller hesaplanan alanlarla orantılıdır; her çizili kutu gerçek bir hücre sayımı değildir.",
      "Bu model bir türün bütün yaprak anatomisini veya büyüme başarısını belirlemez. Alan bütçesini kurduktan sonra hangi ek ölçümün bir hız veya çevre sorusunu çözebileceğini düşün. Böylece geometrik bir gözlemi biyolojik mekanizmayla ilişkilendirirken ölçülmeyen sonucu uydurmamış olursun.",
    ),
  ],
  examples: [
    e022(
      "İç içe iki yüzde",
      "Epidermis ve demet içermeyen mezofil örneği 1000 µm². Hava toplamın %20'si; kalan hücre alanının %75'i palizat. Hava, palizat ve sünger hücre alanları?",
      "Önce hava çıkar, sonra hücre içindeki payı kullan.",
      [
        "Hava 1000 × 0,20 = 200 µm²; hücre alanı 800 µm²'dir.",
        "Palizat 800 × 0,75 = 600 µm² olur.",
        "Sünger hücre alanı 800 − 600 = 200 µm²'dir; toplam 200 + 600 + 200 = 1000.",
      ],
      "200; 600; 200 µm²",
      "Palizat toplamın %60'ıdır; hücre alanının %75'idir.",
      "%75'i doğrudan 1000'e uygulamak.",
    ),
    e022(
      "Boşluk artınca alan",
      "Aynı 1000 µm² örnekte hava payı %10'dan %30'a çıkıyor; hücre alanının palizat payı iki durumda da %50. Palizat alanındaki değişim?",
      "Her durumun hücre alanını ayrı bul.",
      [
        "İlk hücre alanı 900, palizat 900 × 0,50 = 450 µm²'dir.",
        "İkinci hücre alanı 700, palizat 700 × 0,50 = 350 µm²'dir.",
        "Palizat alanı 100 µm² azalır; bu tek başına fotosentez hızının 100 birim azalması değildir.",
      ],
      "100 µm² azalma",
      "Hava artışı 200 µm²; bunun yarısı palizat alanı kaybına yansır.",
      "Alan değişimini doğrudan gaz üretim hızı saymak.",
    ),
    e022(
      "Destek dokusunu kanıtla",
      "Bir genç yaprak sapındaki hücreler canlı; birincil çeperleri özellikle köşelerde kalın. Diğer örnekte olgun uzun liflerin ligninli ikincil çeperi kalmış. Sırasıyla hangi tipler?",
      "Görevden önce canlılık ve çeper tipini eşleştir.",
      [
        "İlk örnekte canlılık ve eşit olmayan birincil kalınlaşma vardır.",
        "Bu örüntü kollenkimayla; ikinci örneğin ligninli olgun lifi sklerenkimayla uyumludur.",
        "İkisi de destek verebilir fakat hücre gelişimi ve çeper yapısı aynı değildir.",
      ],
      "Kollenkima; sklerenkima lifi",
      "Her tip için en az iki bağımsız yapı kanıtı kullanılmıştır.",
      "Her destek hücresini aynı doku saymak.",
    ),
    e022(
      "Paydanın değişmesi",
      "Seçili mezofil alanı 800 µm²; hava 200 µm², palizat hücreleri 300 µm². Palizatın toplam alandaki ve hücre alanındaki yüzdesi?",
      "İki farklı paydayı ayrı yaz.",
      [
        "Toplam alan payı 300 / 800 × 100 = %37,5'tir.",
        "Hücre alanı 800 − 200 = 600 µm²'dir.",
        "Hücreler içindeki palizat payı 300 / 600 × 100 = %50'dir.",
      ],
      "Toplamda %37,5; hücre alanında %50",
      "Aynı pay, daha küçük paydada daha yüksek yüzdedir.",
      "İki yüzdeyi aynı bütünün yüzdesi sanmak.",
    ),
  ],
  recall: [
    {
      prompt: "Parankimanın dört temel rolünü örnekle.",
      answer:
        "Özümleme: mezofil; depo: nişastalı yumru; havalandırma: aerenkima; yerel aktarım: demet çevresi parankima.",
    },
    {
      prompt: "Kollenkima ile sklerenkimayı yalnız destek görevi ayırır mı?",
      answer:
        "Hayır; canlılık, birincil/ikincil çeper ve kalınlaşma yapısı birlikte incelenir.",
    },
    {
      prompt: "Sünger parankiması fotosentez yapabilir mi?",
      answer:
        "Evet, kloroplast taşıyan hücreleri yapabilir; hava boşluğu hücre değildir.",
    },
    {
      prompt: "Palizat hücre alanının %60'ıysa toplamın da %60'ı mıdır?",
      answer:
        "Hava varsa hayır; önce toplamın hücrelere kalan payıyla çarpılır.",
    },
  ],
  items: [
    q022(
      "Hangi eşleştirme parankimanın doğrudan bir görev örneğidir?",
      "Patates yumrusunda nişasta depolama",
      [
        [
          "Olgun trakenin perforasyon plağı olması",
          "Bu ksilem iletim elemanının yapısıdır; depo parankima örneği değildir.",
        ],
        [
          "Ligninli uzun sklerenkima lifinin çekme desteği",
          "Bu sklerenkima görevidir; parankimanın depo örneği değildir.",
        ],
        [
          "Kök şapkasının bütün hücrelerinin polen oluşturması",
          "Kök şapkası polen üretmez; eşleştirme biyolojik olarak yanlıştır.",
        ],
        [
          "Kalburlu borunun mitokondrisiz bir organel olması",
          "Kalburlu boru bir organel değildir; floemin hücresel elemanıdır.",
        ],
      ],
      "Depo parankiması karbonhidrat, yağ, protein veya su tutabilir.",
      "Organdaki maddeyi ve hücre rolünü eşleştir.",
      [
        "Patates yumrusu organik madde depolayan bir yapıdır.",
        "Nişasta depolayan canlı hücreler parankima örneğidir.",
        "Diğer seçenekler başka dokular veya hatalı yapı adları içerir.",
      ],
      "Depo görevi fotosentez yapmayı zorunlu kılmaz.",
      "Bütün bitki hücrelerini tek görevle tanımlamak.",
    ),
    q022(
      "Bir mezofil örneği 1000 µm²; %20'si hava. Kalan hücre alanının %75'i palizat. Palizat alanı kaç µm²?",
      "600",
      [
        ["750", "%75 toplam alana uygulanmıştır; önce hava çıkarılmalıdır."],
        [
          "800",
          "Bu toplam hücre alanıdır; palizatın payı henüz uygulanmamıştır.",
        ],
        [
          "200",
          "Bu hava alanıdır; aynı örnekte sünger alanına da eşittir ama palizat değildir.",
        ],
        [
          "150",
          "Yüzde hava alanına uygulanmıştır; kökte hücre alanı denmektedir.",
        ],
      ],
      "Palizat alanı = toplam × hücre payı × palizatın hücre payı.",
      "Hava dışındaki alanı önce hesapla.",
      [
        "Hava 200, hücre alanı 800 µm²'dir.",
        "Palizat 800 × 0,75 = 600 µm² olur.",
        "Sünger hücreleri 200 µm² kalır; üç alanın toplamı 1000'dir.",
      ],
      "600 / 1000 = %60; %75 hücre içindeki paydır.",
      "İç içe yüzdelerde paydayı karıştırmak.",
    ),
    q022(
      "Sünger parankiması için doğru ifade hangisidir?",
      "Kloroplast taşıyan hücreleri fotosentez yapabilir; aralarında hava boşlukları bulunabilir",
      [
        [
          "Bütün sünger bölgesi yalnız cansız havadır",
          "Canlı sünger hücreleri ile hücreler arası boşluk ayrı yapılardır.",
        ],
        [
          "Hiçbir hücresi fotosentez yapamaz",
          "Kloroplast taşıyan sünger hücreleri fotosenteze katılabilir.",
        ],
        [
          "Bütün yapraklarda palizattan daha çok kloroplast taşıması zorunludur",
          "Böyle evrensel bir sıra yoktur; yapı tür ve koşula göre değişir.",
        ],
        [
          "Trake ile eş anlamlıdır",
          "Sünger parankiması mezofil dokusudur; trake ksilem elemanıdır.",
        ],
      ],
      "Sünger parankiması hücreler ve aralarındaki gaz boşluklarından oluşan bir düzen gösterebilir.",
      "Hücreyi boşluktan, kloroplastı yalnız doku adından ayır.",
      [
        "Sünger parankimasında canlı hücreler bulunur.",
        "Kloroplast içeren hücreleri organik madde üretimine katılır.",
        "Aralıklar gaz yayılımını destekler; tüm alanı cansız yapmaz.",
      ],
      "Parankima hücresi ile hava aralığı aynı nesne değildir.",
      "Hava boşluğu fazla diye hücrelerin tümünü fotosentezsiz saymak.",
    ),
    q022(
      "Canlı hücrelerin birincil çeperleri eşit olmayan biçimde, özellikle köşelerde kalınlaşmış; genç sapı destekliyor. En uygun tip?",
      "Kollenkima",
      [
        [
          "Olgun sklerenkima lifi",
          "Olgun lifte tipik yapı ligninli ikincil çeperdir; verilen canlı düzensiz birincil çeper değil.",
        ],
        [
          "Trake",
          "Trake olgunlukta su iletimine özelleşmiş, canlılığını yitirmiş elemandır.",
        ],
        [
          "Yalnız hava boşluğu",
          "Çeperli canlı hücreler tarif edilmiştir; boşluk değildir.",
        ],
        [
          "Sperm hücresi",
          "Sperm bir üreme hücresidir; verilen canlı, düzensiz kalın birincil çeperli destek dokusunu tanımlamaz.",
        ],
      ],
      "Kollenkima canlı ve eşit olmayan birincil çeper kalınlaşmasıyla tanınır.",
      "Çeperin türü, dağılımı ve canlılığı birlikte kullan.",
      [
        "Köşe kalınlaşması eşit olmayan birincil çeper kanıtıdır.",
        "Canlılık ve genç sap desteği kollenkimayla uyumludur.",
        "Bu üç kanıt kollenkimayı diğer destek dokusundan ayırır.",
      ],
      "Destek görevi tek başına değil, yapı kanıtıyla birlikte seçilmiştir.",
      "Kalın çeper gören her örneği sklerenkima sanmak.",
    ),
    q022(
      "Olgunlaşmış bir bitki lifinde canlı içerik kalmamış; kalın ligninli ikincil çeper mekanik görevi sürdürüyor. En uygun yorum?",
      "Sklerenkima lifiyle uyumludur",
      [
        [
          "Canlı içerik yoksa hiçbir destek veremez",
          "Mekanik desteği çeper sağlayabilir; sitoplazma zorunlu değildir.",
        ],
        [
          "Kesinlikle canlı kollenkimadır",
          "Verilen olgun ölü ve ikincil çeper örüntüsü bununla uyuşmaz.",
        ],
        [
          "Kesinlikle özümleme parankimasıdır",
          "Fotosentez yapan canlı kloroplastlı ince çeper örüntüsü verilmemiştir.",
        ],
        [
          "Lignin bulunursa hücre çeperi yoktur",
          "Lignin çeper yapısının güçlenmesine katılabilir.",
        ],
      ],
      "Olgun sklerenkima liflerinin kalın ikincil çeperi destek sağlayabilir.",
      "Gelişim evresini ve çeper maddesini birlikte yorumla.",
      [
        "Kökte olgun lif ve kalın ligninli ikincil çeper vardır.",
        "Canlılığın yitirilmesi böyle liflerde görülebilir.",
        "Geriye kalan çeperin desteği sklerenkima lifiyle uyumludur.",
      ],
      "Canlılık ile mekanik görevin varlığı ayrı ölçütlerdir.",
      "Ölü hücreden hiçbir yapısal görev çıkamayacağını sanmak.",
    ),
    q022(
      "Armut etindeki kumlu hisle ilişkilendirilen taş hücreleri hangi genel gruptadır?",
      "Sklerenkima",
      [
        [
          "Kollenkima",
          "Taş hücreleri kollenkimanın canlı birincil çeper örneği değildir.",
        ],
        ["Apikal meristem", "Taş hücreleri bölünen uç bölgenin adı değildir."],
        [
          "Yalnız havalandırma parankiması",
          "Kumlu sert hücreler gaz boşluğu sistemiyle aynı yapı değildir.",
        ],
        [
          "Yalnız kalburlu boru",
          "Kalburlu borular uzun mesafeli organik madde iletimine katılır.",
        ],
      ],
      "Sklerenkima lifleri ve sklereidler aynı genel destek grubundadır.",
      "Taş hücresi adını sklereid ve çeper yapısıyla eşleştir.",
      [
        "Armutta sert küçük hücre kümeleri görülebilir.",
        "Bu sklereidler kalın çeperli destek elemanlarıdır.",
        "Genel doku grupları sklerenkimadır; meyvenin tamamı bu hücrelerden oluşmaz.",
      ],
      "Hücre örneği ile bütün organın yapısı ayrılmıştır.",
      "Meyve organını tek bir hücre tipine indirgemek.",
    ),
    q022(
      "Seçili mezofil 1200 µm². Hava toplamın %25'i; palizat hücreleri kalan hücre alanının %40'ı. Sünger hücre alanı kaç µm²?",
      "540",
      [
        [
          "480",
          "Bu %40'ı yanlışlıkla toplam alana uygulamaktır; ayrıca palizat, sünger değil.",
        ],
        ["360", "Bu palizat alanıdır; hücre alanının %60'ı süngerdir."],
        ["900", "Bu bütün hücre alanıdır; palizat çıkarılmamıştır."],
        ["300", "Bu yalnız hava alanıdır."],
      ],
      "Hücre alanından palizat çıkarılarak sünger hücre alanı bulunur.",
      "Toplam → hücre → palizat ve sünger sırasını izle.",
      [
        "Hava 1200 × 0,25 = 300; hücre alanı 900 µm²'dir.",
        "Palizat 900 × 0,40 = 360 µm² olur.",
        "Sünger hücre alanı 900 − 360 = 540 µm²'dir.",
      ],
      "300 + 360 + 540 = 1200 µm².",
      "İstenen doku yerine ara sonucu seçmek.",
    ),
    q022(
      "Aerenkima ile ilgili en uygun ilişki hangisidir?",
      "Geniş hücreler arası gaz boşlukları iç gaz taşınmasına katkı sağlayabilir",
      [
        [
          "Bütün hücreleri zorunlu olarak trakedir",
          "Aerenkima parankima düzenidir; tüm hücreler ksilem elemanı değildir.",
        ],
        [
          "Her sucul bitki aynı boşluk yüzdesine sahiptir",
          "Oran tür ve koşullara göre değişebilir.",
        ],
        [
          "Boşluklar hücrenin solunum gereksinimini kaldırır",
          "Gaz erişimi ihtiyacı destekler; metabolik ihtiyacı yok etmez.",
        ],
        [
          "Gaz boşluğu görülürse tür adı kesin bulunur",
          "Tek yapı kanıtı kesin tür teşhisine yetmez.",
        ],
      ],
      "Havalandırma parankimasının düzeni gaz erişimini kolaylaştırabilir.",
      "Yapısal boşluğu işlevle ilişkilendir, evrensel sonuç kurma.",
      [
        "Aerenkimada belirgin hücreler arası boşluklar vardır.",
        "Bu boşluklar uygun bitkilerde iç gaz yayılımına katkı verir.",
        "Bunun büyüklüğü veya türü için ayrıca ölçüm gerekir.",
      ],
      "Yapı işlevi destekler; her koşulda aynı sonucu garanti etmez.",
      "Tek yapıyı kesin tür veya çevre ölçümü sanmak.",
    ),
    q022(
      "Bir yaralanma sonrası bazı canlı parankima hücreleri uygun hormon ve besin koşullarında yeniden bölünüyor. Doğru sonuç?",
      "Bazı parankima hücreleri koşullara bağlı yeniden bölünme gösterebilir",
      [
        [
          "Her parankima hücresi her ortamda tam bitkiye dönüşür",
          "Veri bazı hücreleri ve uygun koşulları söyler; evrensel sonuç çıkmaz.",
        ],
        [
          "Olgun canlı hücre asla yeniden bölünemez",
          "Verilen gözlem bu mutlak iddiayı çürütür.",
        ],
        [
          "Bu olay bütün hücrelerin mitozsuz çoğalmasıdır",
          "Kökte yeniden bölünme gözlenmiştir; mitoz dışı mucizevi çoğalma verilmemiştir.",
        ],
        [
          "Yara onarımı için her hücrenin ölü olması gerekir",
          "Verilen hücreler canlıdır; yeniden bölünme canlılık gerektirir.",
        ],
      ],
      "Hücresel yeniden bölünme potansiyeli bağlam ve koşullarla değerlendirilir.",
      "Bazı ve uygun koşul ifadelerinin kapsamını koru.",
      [
        "Gözlem seçili canlı parankima hücrelerine aittir.",
        "Uygun çevresel ve hormonal koşullar verilmiştir.",
        "Bu nedenle koşullu potansiyel çıkarılır; bütün hücrelere sınırsız genellenmez.",
      ],
      "Sonuç verilen örneklemden daha geniş olmamalıdır.",
      "Doku kültüründeki potansiyeli her ortamda garanti sonuç saymak.",
    ),
    q022(
      "İletim parankiması ile trake arasındaki doğru fark hangisidir?",
      "İlki yerel alışverişe katılan canlı hücrelerle, ikincisi olgun ksilem iletim elemanıyla ilişkilidir",
      [
        [
          "İkisi aynı organelin iki adıdır",
          "Bunlar organel değil farklı hücre/doku yapılarıdır.",
        ],
        [
          "İletim parankimasının her hücresi uzun mesafeli boş trake borusudur",
          "Yerel canlı parankima ile olgun boş iletim elemanı aynı değildir.",
        ],
        [
          "Trake yalnız nişasta depolayan kloroplasttır",
          "Trake organel değildir; ksilem hücresel elemanıdır.",
        ],
        [
          "Parankima hiçbir madde alışverişine katılamaz",
          "İletim parankiması yerel aktarım örneğidir.",
        ],
      ],
      "Benzer işlev sözcüğü aynı hücre yapısını zorunlu kılmaz.",
      "Canlı yerel bağlantıyı uzun mesafeli iletim elemanından ayır.",
      [
        "Demet çevresindeki parankima yerel alışveriş ve depoya katılabilir.",
        "Trake olgunlukta su iletimine özelleşmiş ksilem elemanıdır.",
        "Görevleri bağlantılı olabilir ama hücresel yapıları eş anlamlı değildir.",
      ],
      "Doku ve organel düzeyleri karıştırılmamıştır.",
      "İletim adı geçen her hücreyi aynı boru sanmak.",
    ),
    q022(
      "Seçili 800 µm² mezofilde hava 200, palizat 300 µm². Palizatın toplam alandaki payı hangisidir?",
      "%37,5",
      [
        [
          "%50",
          "Bu palizatın 600 µm² hücre alanındaki payıdır; sorulan toplam alandır.",
        ],
        ["%25", "Bu hava alanının toplam içindeki payıdır."],
        ["%75", "Bu toplamın hücrelere kalan payıdır."],
        ["%60", "300 / 800 oranından bu değer çıkmaz."],
      ],
      "Yüzde = istenen pay / belirtilen bütün × 100.",
      "Paydaya toplam 800'ü yaz.",
      [
        "Palizat payı 300 µm²'dir.",
        "Toplam 800 µm² olduğundan 300 / 800 × 100 hesaplanır.",
        "Sonuç %37,5'tir; hava çıkarılmış paydaya göre %50 olurdu.",
      ],
      "%37,5 × 800 = 300 µm².",
      "Toplam alan ile hücre alanını aynı payda sanmak.",
    ),
    q022(
      "İki mezofil kesitinin hava oranı farklı. Yalnız alan ölçümleri verilmiş. Fotosentez hızları için en uygun ifade?",
      "Hız karşılaştırması için ışık, kloroplast ve diğer koşullar hakkında ek veri gerekir",
      [
        [
          "Havası fazla olan kesin iki kat hızlıdır",
          "Alan oranı tek başına hız katsayısı vermez.",
        ],
        [
          "Havası az olan kesin hiç solunum yapmaz",
          "Hava alanı canlı hücrelerin solunumunu otomatik sıfırlamaz.",
        ],
        [
          "Aynı toplam alanda bütün biyokimyasal hızlar eşittir",
          "Eşit alan aynı enzim ve çevre koşullarını garanti etmez.",
        ],
        [
          "Palizat alanı biliniyorsa bütün taze kütle hesaplanır",
          "Alan ve taze kütle farklı ölçülerdir; su ve hacim bilgisi yoktur.",
        ],
      ],
      "Geometrik alan bütçesi biyokimyasal hızın tek belirleyicisi değildir.",
      "Ölçülen değişkenle çıkarılmak istenen sonucu ayır.",
      [
        "Alan ölçümü hücre ve boşluk payını verir.",
        "Gaz yayılımı, ışık ve kloroplast gibi etkenler de fotosentezi etkiler.",
        "Bu etkenler bilinmeden kesin hız sıralaması kurulamaz.",
      ],
      "Model sonucunun ölçülmeyen büyüklüğe genişletilmediğini denetle.",
      "Görsel alan farkını tek nedenli hız yasası yapmak.",
    ),
  ],
  source:
    "MEBİ AYT Biyoloji Bölüm 2 fiziksel PDF 81–83; OGM Bitkisel Dokular I PDF 12–18 ve 20; Dersler Cepte Bitkilerin Yapısı PDF 6–7, 16–17. Özgün kesit modeli yalnız seçili mezofili paylaşan hava ve hücre alanlarını hesaplar; hız, hücre sayısı veya tür tahmini değildir.",
});

units022.push({
  id: "ayt-iletim-doku",
  topic: "detail-344",
  title: "İletim doku: su yolu ve kaynak–havuz akışı",
  minutes: 58,
  objectives: [
    "Ksilem ve floemin hücrelerini, canlılığını ve yapısal kanıtlarını ayır.",
    "Kaynak ve havuzun organdan çok işlev olduğunu açıkla.",
    "Sonlu stok ve verilen basınç farkıyla taşınan şeker bütçesini kur.",
  ],
  sections: [
    s022(
      "Uzak organlar nasıl bağlanır?",
      "Kökten alınan su ve mineraller, yapraklarda üretilen karbon bileşikleri ve farklı organlarda yapılan bazı maddeler bitki içinde yer değiştirebilir. Ksilem ve floem, bu uzun mesafeli taşınmaya katılan iki iletim doku sistemidir. Çoğu damarlı bitki organında birbirleriyle ve çevredeki canlı hücrelerle bağlantılı düzenlenirler. Ksilem su ve mineralin yanında kökte yapılan bazı hormonları da taşıyabilir; floemde şeker yanında amino asit gibi organik azotlu bileşikler bulunabilir. Bu içerikler tek bir madde türüne indirgenmez.",
      "Bu sistemi tek bir içi boş borudan ibaret düşünmeyiz. İletim elemanları, destek hücreleri ve canlı parankima birlikte görev yapar. Yaprak kesitindeki küçük bir demet ile gövdedeki geniş birikim aynı genel sistemlerin farklı düzenlenmiş örnekleri olabilir; konum şekle ve bitki grubuna göre okunur.",
    ),
    s022(
      "Ksilem bir hücreden fazlasıdır",
      "Ksilemin su iletimine özelleşmiş ana elemanları trakeit ve trakeler, işlevsel olgunlukta çekirdek ve canlı içeriklerini kaybetmiş olabilir. Ligninli çeperleri iletim yolunun mekanik olarak açık kalmasına katkı verir. Boş lümen suyun geçtiği iç alandır; çeperin kendisiyle karıştırılmaz.",
      "Ancak bütün ksilem dokusu ölü hücrelerden oluşmaz. Ksilem parankiması canlı olup depo ve yanal alışverişe katılabilir; lifler destek sağlar. 'Olgun trake ölüdür' doğru bir hücre özelliğiyken bunu dokunun bütün hücrelerine yaymak yanlış olur. Soru kökünde hücre mi doku sistemi mi sorulduğunu dikkatle ayır.",
    ),
    s022(
      "Trakeit ve trake: geçit ve delik",
      "Trakeitler genellikle uzun, dar ve uçları sivrilen elemanlardır; su komşu elemanlara çeperdeki geçitler üzerinden aktarılabilir. Trake elemanları çoğu örnekte daha geniş ve kısadır; uç uca dizilerek damar oluşturur. Uç çeperlerindeki perforasyon plakaları daha açık bir bağlantı sağlar.",
      "Her trakenin bütün yan ve uç çeperlerinin tamamen yok olduğunu söylemeyiz. Ligninli yan duvarlar destek için kalır; perforasyonun biçimi de farklı olabilir. Geçit alanı ile bütün hücre zarını aynı yapı saymak doğru değildir. Bu farklar akış yolunun anatomisini anlamaya yardım eder; tek başına bütün bitki için sabit hız vermez.",
    ),
    s022(
      "Ksilemde itici güç ve enerji",
      "Yapraklardan terleme, su potansiyeli farkları, suyun kohezyonu ve çeperlerle etkileşimi ksilem akışının açıklamasına katılır. Kök basıncı bazı koşullarda katkı sağlayabilir. Olgun trake elemanının içindeki suyun her adımda kendi ATP pompasıyla yükseltildiği bir mekanizma söz konusu değildir.",
      "Buna karşılık bitkinin bütün su–mineral ekonomisinin enerji gerektirmediği sonucu çıkmaz. Kök canlı hücrelerinde iyon alımı ve başka süreçler enerji kullanabilir. Ksilemde ana kökten sürgüne su yolu yaygındır; yanal geçişler ve su potansiyeline bağlı farklı yönler de mümkündür. 'Her koşulda yalnız yukarı' mutlaklığı yerine sistemin koşulunu okuruz.",
    ),
    s022(
      "Floemin canlı iletim elemanı",
      "Kapalı tohumlu örneklerde kalburlu boru elemanları olgunlukta canlıdır, fakat çekirdeklerini ve bazı iç yapılarını kaybederler. Uç çeperlerdeki kalburlu plakalar komşu elemanlar arasındaki akışı kolaylaştırır. Canlı olmak ile bütün organelleri eksiksiz taşımak aynı koşul değildir.",
      "Çekirdekli arkadaş hücreleri kalburlu elemanlarla yakından bağlantılıdır ve onların metabolik işlevlerine destek verir. İki hücre tipi birlikte bir işlevsel birim gibi çalışabilir; arkadaş hücresi ana uzun eksenli borunun kendisi değildir. Floem parankiması depo ve alışverişe, lifleri ise mekanik desteğe katılabilir.",
    ),
    s022(
      "Arkadaş hücresi taşımaya katılır",
      "Arkadaş hücreleri uygun bitki ve yola göre organik maddelerin floeme yüklenmesine, boşaltılmasına ve iletim elemanlarının sürdürülmesine katkı verir. Dolayısıyla 'arkadaş hücreleri taşımaya hiç katılmaz' ifadesi yanlıştır. Görevi yalnız yan yana durmak değil, canlı bir bağlantı sağlamaktır.",
      "Her türde yükleme yolu aynı değildir; bazı yollar aktif, bazıları pasif bileşenler içerir. Uzun mesafeli kitlesel akışın basınç farkıyla gerçekleşmesi ile belirli zar geçişlerinin enerji gerektirmesi birbiriyle çelişmez. Enerjinin nerede kullanıldığını olayın ölçeğine göre belirtmek gerekir.",
    ),
    s022(
      "Kaynak ve havuz birer görevdir",
      "Kaynak, belirli zamanda taşınabilir organik maddeyi floeme veren; havuz ise onu alan ve kullanan veya depolayan bölgedir. Olgun fotosentetik yaprak sık görülen kaynaktır. Büyüyen sürgün, kök, meyve ve gelişen tohum gibi yapılar uygun dönemde havuz olabilir.",
      "Depo organı her zaman havuz kalmaz. Yumru yeni sürgün oluştururken depolarından şeker sağlayarak kaynak olabilir; gelişen yaprak önce havuzken olgunlaşınca kaynak hâline gelebilir. Bu nedenle 'floem her zaman yapraktan köke taşır' diye değişmez organ etiketi koymayız. Yön o andaki kaynak–havuz ilişkisine bağlıdır.",
    ),
    s022(
      "Basınç akışı nasıl kurulur?",
      "Kaynak bölgesinde floemde çözünmüş organik madde yüklenmesi su potansiyelini etkiler; uygun koşullarda suyun girişi turgor basıncının yükselmesine katkı verir. Havuzda madde boşaltılması ve su alışverişi daha düşük basınçla ilişkili olabilir. Basınç farkı kalburlu yol boyunca çözelti akışını yönlendirir.",
      "Bu açıklama, tek bir sükroz molekülünün her milimetrede ATP ile çekildiği bir bant sistemi değildir. Yükleme, boşaltma ve su hareketinin koşulları basıncı oluşturur; akışa boru geometrisi ve çözelti direnci de etki eder. Bu ünitenin sayısal modeli basınçları dışarıdan sabitlenmiş basit bir hazne düzeneğidir; canlı bitkinin bütün düzenlemesini çözmez.",
    ),
    s022(
      "Çift yön ne anlama gelir?",
      "Bir bitkide ayrı floem yollarında aynı anda farklı yönlerde taşınma görülebilir. Örneğin bir kaynak yapraktan aşağıdaki köke ve başka bir yol üzerinden yukarıdaki büyüyen sürgüne organik madde gidebilir. Bu, kaynak–havuz ağının dallanmış yapısıyla uyumludur.",
      "Ancak tek bir ideal boru kesitinde aynı andaki net kitlesel akışı iki zıt yönde eşitçe çizmek doğru değildir. Her seçili yolun o andaki basınç farkına karşılık gelen yönü vardır. Keşifte kaynak yumru olunca yukarı, kaynak yaprak olunca aşağı gösterilen yol yalnız verilen iki konumlu düzeneğe aittir; bütün floem ağının tek yönlü olduğu söylenmez.",
    ),
    s022(
      "Hızın nedeni tek bir etiket değildir",
      "Su veya floem çözeltisinin akış hızı; basınç ve su potansiyeli farkları, direnç, iletim elemanı geometrisi, viskozite ve çevre koşullarıyla değişir. Birinin hücreleri canlı, diğerinin ana elemanları ölü diye her koşulda kesin bir hız sırası kurulamaz. Benzer biçimde iki ayrı yolda farklı yönlerin bulunması tek borudaki hızı otomatik yarıya indirmez.",
      "Ölçülmüş hızlar karşılaştırılırken aynı büyüklüğün ölçüldüğünden emin ol: hacim akısı, doğrusal hız ve taşınan şeker kütlesi hızı farklıdır. Birimler verilirse hangi ilişkiyi kuracağın da belirginleşir. Bu modelde hacim akısı mL/saat; derişimle çarpılınca şeker akısı mg/saat olur.",
    ),
    s022(
      "İletim sistemini oluşturan hücreleri karşılaştır",
      "Ksilem ve floemi karşılaştırırken 'ana iletim elemanı' ile 'dokunun bütün bileşenleri' ayrı satırlarda tutulmalıdır. Trake ve trakeitlerin olgunluğu ile ksilem parankimasının canlılığı aynı dokuda bulunabilir. Floemde kalburlu elemanın çekirdeksizliği ile arkadaş hücresinin çekirdekli olması iş bölümü örneğidir.",
      "Vasküler kambiyum uygun gövdelerde içe ikincil ksilem, dışa ikincil floem oluşturur. Bu konumsal bilgi kesitte yön bulmayı kolaylaştırır; her bitki grubunda aynı biçimde halka kambiyumu bulunmaz. Yapı–konum–görev üçlüsünü birlikte düşünmek yalnız renk ezberinden daha güvenilir bir tanı sağlar.",
      {
        headers: ["Ölçüt", "Ksilem", "Floem"],
        rows: [
          ["Ana örnek eleman", "Trake, trakeit", "Kalburlu boru elemanı"],
          [
            "Olgun ana eleman",
            "Genellikle canlılığını yitirmiş",
            "Canlı, çekirdeğini yitirmiş olabilir",
          ],
          [
            "Ek canlı hücre",
            "Ksilem parankiması",
            "Arkadaş hücresi, parankima",
          ],
          [
            "Yaygın içerik",
            "Su, mineral ve bazı başka çözünmüş maddeler",
            "Şeker ve başka organik maddeler",
          ],
        ],
      },
    ),
    s022(
      "Basınç farkından miktara",
      "Keşifte birim direnç kPa·saat/mL olarak verilmiştir. Pozitif kaynak–havuz basınç farkı dirence bölününce hacim akısı bulunur: Q = ΔP / R. Derişim c mg/mL ise şeker akısı Q × c mg/saat olur. Süreyle çarpıldığında bu kez taşınabilecek mg miktarı hesaplanır.",
      "Fakat verici haznedeki şeker sonludur. Hesaplanan kapasite başlangıç stoğunu aşarsa yalnız var olan şeker taşınabilir; negatif kalan stok oluşturmayız. Model, derişim ve basınçları hazne tükenene kadar sabit tutar; karşı basınçta ters kaynaktan yeni madde sağlamaz. Sıfır veya negatif seçili farkta bu tek kaynaklı model aktarımı sıfır kabul eder.",
    ),
    s022(
      "Sonlu haznenin su ve şeker bütçesi",
      "Sabit derişimli başlangıç haznesinde hacim, şeker stoğunun derişime bölümüdür. Taşınan şekerin derişime bölünmesi, birlikte aktarılan çözeltinin hacmini verir. Kaynak haznesi bu hacim kadar azalır; toplama haznesi aynı miktarı alır. Böylece şeker kütlesi ve seçilen çözeltinin hacmi bütçede korunur.",
      "Bu düzenekte basınç dışarıdan sabit tutulur; gerçek bitkide yaprak fotosentezi, su geri dönüşü, yükleme ve büyüme birlikte değişir. Çizilen ok seçilen süre boyunca birikimli aktarımı gösterir; kaynak daha önce tükendiyse son anda hâlâ aynı hızda akıyor denmez. Tahminini yaparken kapasite ve mevcut stoktan hangisinin sınır olduğunu belirt.",
    ),
  ],
  examples: [
    e022(
      "Basınçtan şeker akısına",
      "Model haznesinde kaynak 8 kPa, havuz 2 kPa; direnç 3 kPa·saat/mL, derişim 2 mg/mL. Stok 40 mg ve süre 4 saat. Basınç/derişim sabit; aktarılan miktar nedir?",
      "Önce hacim akısı, sonra şeker akısı ve stok sınırını bul.",
      [
        "ΔP = 8 − 2 = 6 kPa; Q = 6 / 3 = 2 mL/saat olur.",
        "Şeker akısı 2 × 2 = 4 mg/saat; 4 saatlik kapasite 16 mg'dır.",
        "Stok 40 mg olduğu için 16 mg aktarılır; kaynakta 24 mg kalır.",
      ],
      "16 mg aktarım; 24 mg kalan",
      "16 + 24 = 40 mg; aktarım hacmi 16 / 2 = 8 mL.",
      "Derişimi kullanmadan mL ile mg'ı eşitlemek.",
    ),
    e022(
      "Kapasite var, stok yetmez",
      "Aynı sabit haznede ΔP = 6 kPa, R = 3 kPa·saat/mL, c = 2 mg/mL. Başlangıç yalnız 10 mg şeker ve süre 4 saat. Aktarım ve etkin akış süresi?",
      "Kapasiteyi stokla sınırla.",
      [
        "Q = 2 mL/saat; şeker akısı 4 mg/saattir.",
        "4 saatlik kapasite 16 mg olsa da yalnız 10 mg bulunur; aktarım 10 mg'dır.",
        "Hazne 10 / 4 = 2,5 saatte tükenir; kalan sürede bu kaynaktan aktarım sürmez.",
      ],
      "10 mg; 2,5 saat etkin akış",
      "Son stok 0; toplanan 10 mg başlangıçla eşittir.",
      "Kapasiteyi gerçek stoktan fazla aktarılan miktar saymak.",
    ),
    e022(
      "Organın görevi değişir",
      "Bir yumru depolarından şeker verip üstündeki yeni sürgünü besliyor. Seçili floem yolunda net madde yönü ve kaynak–havuz adları nedir?",
      "Organın eski adına değil verilen anlık işine bak.",
      [
        "Şekeri veren yumru bu anda kaynaktır.",
        "Şekeri alan yeni sürgün havuzdur.",
        "Bu iki konum arasındaki seçili yolda organik madde yukarı gider; bütün floem yolları için tek yön kuralı kurulmaz.",
      ],
      "Yumru kaynak, sürgün havuz; seçili yolda yukarı",
      "Verilen verme–alma ilişkisi yönü belirler.",
      "Bütün yumruları her zaman havuz saymak.",
    ),
    e022(
      "Çekirdeksiz ama canlı",
      "Bir demette X hücresi olgunlukta canlı ve çekirdeksiz, delikli uç plakalıdır; komşu Y çekirdekli ve X'i destekliyor. En uygun X–Y çifti?",
      "Canlılığı, uç yapıyı ve komşu iş bölümü kanıtını birleştir.",
      [
        "Canlı çekirdeksiz X, olgun kalburlu boru elemanıyla uyumludur.",
        "Çekirdekli destekleyici Y arkadaş hücresidir.",
        "Trake olgunlukta canlılığını yitirmiş olduğundan verilen X'in bütün kanıtlarını karşılamaz.",
      ],
      "Kalburlu boru elemanı – arkadaş hücresi",
      "İki komşu hücrenin farklı çekirdek durumu işlevsel birliği destekler.",
      "Çekirdeksiz bütün hücreleri ölü saymak.",
    ),
  ],
  recall: [
    {
      prompt: "Bütün ksilem hücreleri ölü müdür?",
      answer:
        "Hayır; olgun trake/trakeit tipik olarak ölüdür, fakat ksilem parankiması canlı olabilir.",
    },
    {
      prompt: "Arkadaş hücresi ana boruyla aynı şey mi?",
      answer:
        "Hayır; metabolik destek ve yükleme/boşaltmaya katkı verir, ana kalburlu elemandan farklıdır.",
    },
    {
      prompt: "Bir yumru ne zaman kaynak olabilir?",
      answer:
        "Depodan madde verip büyüyen sürgün gibi başka bir havuzu beslediğinde.",
    },
    {
      prompt: "Q × c × t başlangıç stoğunu aşarsa ne yapılır?",
      answer:
        "Aktarım mevcut stokla sınırlanır; kaynak tükenince modelde akış kesilir.",
    },
  ],
  items: [
    q022(
      "Ksilem dokusu için doğru ifade hangisidir?",
      "Olgun trake ve trakeitler ölü olabilir; dokuda canlı parankima da bulunur",
      [
        [
          "Dokunun bütün hücreleri zorunlu olarak ölüdür",
          "Ana iletim elemanının özelliği bütün doku bileşenlerine yayılmıştır.",
        ],
        [
          "Bütün hücreler kloroplastlı arkadaş hücresidir",
          "Arkadaş hücreleri floemle ilişkilidir; bu ksilem tanımı değildir.",
        ],
        [
          "Olgun trake mutlaka çekirdekli canlı hücredir",
          "İşlevsel olgun trake genellikle canlılığını yitirmiştir.",
        ],
        [
          "Ksilem hiçbir destek hücresi içeremez",
          "Ksilem lifleri mekanik desteğe katılabilir.",
        ],
      ],
      "Doku sistemi ana iletim elemanları ile başka hücre bileşenlerini birlikte içerir.",
      "Hücre tipi ile bütün doku kapsamını ayır.",
      [
        "Trake ve trakeitler olgunlukta canlılıklarını yitirebilir.",
        "Ksilem parankiması ise canlı depo ve alışveriş hücrelerini içerir.",
        "Bu nedenle dokunun tamamını ölü diye genellemek doğru değildir.",
      ],
      "Doku içindeki iş bölümü korunmuştur.",
      "Bir hücre özelliğini bütün dokuya yaymak.",
    ),
    q022(
      "Olgun canlı, çekirdeksiz ve kalburlu uç plakalı X; çekirdekli ve X'in sürdürülmesine katkı veren Y. Doğru çift?",
      "Kalburlu boru elemanı – arkadaş hücresi",
      [
        [
          "Trake – kaliptra",
          "Trake olgunlukta ölüdür; kaliptra bu komşu destek hücresinin adı değildir.",
        ],
        [
          "Trakeit – nişasta",
          "Nişasta hücre değil moleküler depodur; çift yapısal kanıtı karşılamaz.",
        ],
        [
          "Kollenkima – oksijen",
          "Oksijen hücre değildir; kollenkima kalburlu plaka elemanı değildir.",
        ],
        [
          "Mantar – hava boşluğu",
          "Bu çift canlı çekirdeksiz iletim elemanını ve çekirdekli komşusunu açıklamaz.",
        ],
      ],
      "Kalburlu eleman canlı kalabilirken çekirdeğini kaybeder; arkadaş hücresi çekirdeklidir.",
      "Üç kanıtı aynı çifte uygula.",
      [
        "X'in canlılığı ve kalburlu uçları floem elemanına işaret eder.",
        "Y'nin çekirdekli destek rolü arkadaş hücresine uyar.",
        "Doğru çift iki farklı ama bağlantılı canlı hücre tipidir.",
      ],
      "Çekirdeksizlik tek başına ölüm anlamına gelmez.",
      "Çekirdeksiz hücreyi otomatik ölü trake saymak.",
    ),
    q022(
      "Bir yumru depoladığı şekeri üstündeki gelişen sürgüne veriyor. Bu anda doğru kaynak–havuz ilişkisi?",
      "Yumru kaynak, sürgün havuz",
      [
        [
          "Yumru her koşulda havuz, sürgün her koşulda kaynak",
          "Roller organa kalıcı etiket değildir; verilen anda maddeyi yumru verir.",
        ],
        [
          "İkisi de mutlaka fotosentetik kaynak",
          "Gelişen sürgünün bu anda şeker aldığı verilmiştir.",
        ],
        [
          "İkisi de yalnız ksilem su boşluğu",
          "Şeker verme–alma rolü floem kaynak–havuz ilişkisidir.",
        ],
        [
          "Madde yalnız yapraktan köke gidebilir",
          "Depo kaynak olduğunda yukarı taşınma görülebilir.",
        ],
      ],
      "Kaynak maddeyi verir; havuz alır, kullanır veya depolar.",
      "Verilen anın verme–alma yönünü izle.",
      [
        "Yumru şekerini dışarı verdiği için kaynaktır.",
        "Sürgün aldığı şekeri büyümede kullanan havuzdur.",
        "Seçili iki konumlu yolda akış yukarı olabilir; evrensel organ yönü yoktur.",
      ],
      "Sonuç kökte verilen görevleri aynen karşılar.",
      "Depo organını her zaman havuz saymak.",
    ),
    q022(
      "Sabit hazne modelinde kaynak 9, havuz 3 kPa; R = 2 kPa·saat/mL. Hacim akısı Q kaç mL/saat?",
      "3",
      [
        ["6", "Bu basınç farkıdır; dirence bölünmemiştir."],
        ["12", "Basınç farkı dirençle çarpılmaz."],
        [
          "4,5",
          "Havuz basıncı çıkarılmadan kaynak basıncı dirence bölünmüştür.",
        ],
        ["0", "Pozitif basınç farkı ve sonlu direnç verilmiştir."],
      ],
      "Bu modelde Q = (P kaynak − P havuz) / R.",
      "Önce farkı, sonra dirence bölümü bul.",
      [
        "Basınç farkı 9 − 3 = 6 kPa'dır.",
        "Q = 6 / 2 = 3 mL/saat olur.",
        "Birim kPa / (kPa·saat/mL) = mL/saat biçiminde sadeleşir.",
      ],
      "3 × 2 = 6 kPa model farkını verir.",
      "Basıncı hacim akısıyla aynı büyüklük sanmak.",
    ),
    q022(
      "Modelde Q = 2 mL/saat, derişim 3 mg/mL ve süre 4 saat. Kaynakta 50 mg var; koşullar sabit. Kaç mg şeker aktarılır?",
      "24",
      [
        [
          "8",
          "Bu aktarılan çözeltinin mL hacmidir; mg'a geçmek için derişim gerekir.",
        ],
        ["6", "Bu mg/saat cinsinden şeker akısıdır; süreyle çarpılmamıştır."],
        ["50", "Stok 50 olsa da verilen sürede kapasite 24 mg'dır."],
        ["48", "Verilen çarpım 2 × 3 × 4 = 24'tür; fazladan katsayı yoktur."],
      ],
      "Şeker miktarı = hacim akısı × derişim × süre; stok üst sınırdır.",
      "Birimleri sırayla mL/saat → mg/saat → mg yap.",
      [
        "Şeker akısı 2 × 3 = 6 mg/saattir.",
        "Dört saatte kapasite 6 × 4 = 24 mg olur.",
        "50 mg stok yeterli olduğundan aktarım 24 mg'dır.",
      ],
      "Son stok 50 − 24 = 26 mg; toplam 50 korunur.",
      "Hacmi şeker kütlesiyle eşitlemek.",
    ),
    q022(
      "Aynı sabit modelde şeker akısı 6 mg/saat; süre 4 saat ama kaynakta yalnız 9 mg var. Gerçek aktarım ve etkin akış süresi?",
      "9 mg; 1,5 saat",
      [
        [
          "24 mg; 4 saat",
          "Kapasite mevcut stoktan büyük olsa da madde yoktan sağlanamaz.",
        ],
        [
          "9 mg; 4 saat boyunca değişmeyen 6 mg/saat",
          "Bu hız dört saat sürerse 24 mg gerekir; stok 1,5 saatte tükenir.",
        ],
        [
          "6 mg; 1 saat",
          "Bir saatlik akı keyfi son miktar değildir; stok 9 mg'dır.",
        ],
        ["0 mg; 0 saat", "Pozitif stok ve pozitif aktarım akısı vardır."],
      ],
      "Sonlu kaynak tükendiğinde bu modelde akış kesilir.",
      "Aktarımı stokla sınırla ve stok/akı ile zamanı bul.",
      [
        "Dört saatlik kapasite 24 mg'dır ama stok 9 mg'dır.",
        "Yalnız 9 mg aktarılabilir.",
        "Etkin süre 9 / 6 = 1,5 saattir; sonra kaynak boştur.",
      ],
      "6 mg/saat × 1,5 saat = 9 mg.",
      "Model kapasitesini gerçekleşmiş sınırsız üretim sanmak.",
    ),
    q022(
      "Arkadaş hücreleri için en uygun ifade hangisidir?",
      "Kalburlu elemanların sürdürülmesine ve uygun yollarla yükleme/boşaltmaya katkı verir",
      [
        [
          "Organik madde taşınmasına hiçbir biçimde katılmaz",
          "Metabolik destek ve zar geçişleri taşınma işlevine katkı sağlar.",
        ],
        [
          "Olgun trakenin bütün yan duvarlarının adıdır",
          "Arkadaş hücresi canlı floem bileşenidir; trake duvarı değildir.",
        ],
        [
          "Her zaman çekirdeksiz ölü borudur",
          "Arkadaş hücresi tipik olarak çekirdeklidir; ana boruyla aynı hücre değildir.",
        ],
        [
          "Bütün bitkilerde her yükleme olayı aynı aktif mekanizmayla olur",
          "Aktif/pasif bileşenler tür ve yola göre değişebilir.",
        ],
      ],
      "Floemde iş bölümü vardır; ana boru ve destekleyici canlı hücreler farklı roller taşır.",
      "Katkı vermeyi ana eksenli boru olmakla karıştırma.",
      [
        "Arkadaş hücreleri kalburlu elemanlarla bağlantılıdır.",
        "Metabolik destek ve uygun yükleme/boşaltma süreçlerine katılabilir.",
        "Bu katkı, her türde tek mekanizma olduğu veya borunun kendisi olduğu anlamına gelmez.",
      ],
      "Hem görevin varlığı hem mekanizma çeşitliliği korunur.",
      "Ana boru değilse taşımada hiç görevi yok sanmak.",
    ),
    q022(
      "Aynı bitkide iki farklı floem yolunda biri yukarı, diğeri aşağı net akış taşıyor. Doğru yorum?",
      "Farklı kaynak–havuz yolları zıt yönlerde çalışabilir",
      [
        [
          "Tek borunun aynı kesitinde aynı anda iki net kitlesel yön zorunludur",
          "Veri farklı yolları anlatır; bunu aynı kesitte iki net akışa dönüştürmez.",
        ],
        [
          "Floem akışı imkânsızdır; yalnız aşağı olabilir",
          "Kaynak–havuz konumları farklı yönlere izin verebilir.",
        ],
        [
          "Her iki yol kesinlikle ksilemdir",
          "Organik madde kaynak–havuz akışı floemde olabilir; yön tek başına ksilem kanıtı değildir.",
        ],
        [
          "İki yön varsa her borunun hızı kesin yarıya iner",
          "Yol sayısı ve yönü tek başına sayısal hız yasası değildir.",
        ],
      ],
      "Bitki düzeyindeki çift yön, ayrı yolların farklı yönlerde çalışmasıdır.",
      "Ölçülen sistemin bir boru mu ağ mı olduğunu ayır.",
      [
        "Kökte iki farklı yol verilmiştir.",
        "Kaynak ve havuz konumları her yolun yönünü belirleyebilir.",
        "Bu durum aynı kesitte eşzamanlı iki net akış gerektirmez.",
      ],
      "Ağın yön çeşitliliği tek yolun net yönüyle çelişmez.",
      "Bütün bitkinin çift yönlülüğünü tek boru kesitine taşımak.",
    ),
    q022(
      "Ksilemde olgun trake içindeki akışın kendi ATP pompasıyla sürmediği söyleniyor. Bundan hangi sonuç çıkarılamaz?",
      "Bitkinin bütün su–mineral ekonomisinde hiç enerji kullanılmadığı",
      [
        [
          "Trakenin kendi canlı metabolik ATP pompasının varsayılmadığı",
          "Bu verilen ifadenin doğrudan kapsamıdır.",
        ],
        [
          "Kök canlı hücrelerinin ayrıca incelenmesi gerektiği",
          "Sistemin başka hücreleri ayrı mekanizmalar taşıyabilir.",
        ],
        [
          "Su potansiyeli ve basınç farklarının önemli olabileceği",
          "Canlı ATP pompası dışındaki itici güçler önemlidir.",
        ],
        [
          "Doku ile tek hücre düzeyinin ayrılması gerektiği",
          "Bütün sistem sonucu için bu ayrım gereklidir.",
        ],
      ],
      "Tek bir elemanda enerji kullanılmaması bütün canlı sistemin enerjisiz olduğunu göstermez.",
      "İddianın sınırını trake ile bütün bitki arasında karşılaştır.",
      [
        "Olgun trake kendi canlı ATP pompasıyla suyu basamak basamak çekmez.",
        "Kök iyon alımı ve başka canlı süreçler enerji kullanabilir.",
        "Dolayısıyla bütün su–mineral ekonomisinin hiç enerji istemediği çıkarılamaz.",
      ],
      "Yerel mekanizma bütün sisteme sınırsız genellenmez.",
      "Bir akışın pasifliğini bütün bitkinin enerji kullanmaması saymak.",
    ),
    q022(
      "Trakeit ile trake için doğru anatomik karşılaştırma hangisidir?",
      "Trakeitlerde geçitler; trakelerin uç bağlantılarında perforasyon plakaları önemlidir",
      [
        [
          "İkisinde de bütün yan duvarlar tamamen yoktur",
          "Ligninli destek duvarları kalır; bütün duvarlar erimez.",
        ],
        [
          "Trakeit her zaman kalburlu floem hücresidir",
          "Trakeit ksilem elemanıdır; kalburlu hücre başka sistemdedir.",
        ],
        [
          "Trake bir kloroplast çeşididir",
          "Trake hücresel iletim elemanıdır, organel değildir.",
        ],
        [
          "Perforasyon varsa basınç ve direnç artık hiçbir şeyi etkilemez",
          "Akış yine fiziksel itici güç ve dirençlerle ilişkilidir.",
        ],
      ],
      "Geçit ve perforasyon farklı çeper bağlantı düzenleridir.",
      "İletim yolunun hücresel yapısını bütünüyle duvarsızlıkla karıştırma.",
      [
        "Trakeitler komşu elemanlarla geçitler üzerinden ilişki kurar.",
        "Trake elemanları uç perforasyonlarıyla daha açık damar bağlantıları oluşturabilir.",
        "Yan çeperler destek sağlar; bütün duvarların yok olması gerekmez.",
      ],
      "Yapısal açıklık ile destek duvarı aynı anda bulunabilir.",
      "Boru oluşmasını bütün çeperlerin yok olması diye düşünmek.",
    ),
    q022(
      "Sabit derişimli haznede 12 mg şeker, 3 mg/mL çözelti var. 9 mg şeker çözeltiyle birlikte aktarılıyor. Kalan verici hacmi kaç mL?",
      "1",
      [
        ["3", "Bu aktarılan 9 mg'ın hacmidir; sorulan kalan hacimdir."],
        ["4", "Bu başlangıç hacmidir; aktarım çıkarılmamıştır."],
        ["9", "mg miktarı mL hacmine doğrudan eşitlenemez."],
        ["0", "Başlangıçtan 3 mg şeker kalır; hazne bütünüyle tükenmemiştir."],
      ],
      "Sabit derişimde hacim = şeker kütlesi / derişim.",
      "Önce kalan şekeri, sonra ona karşılık gelen hacmi bul.",
      [
        "Kalan şeker 12 − 9 = 3 mg'dır.",
        "Kalan hacim 3 mg / (3 mg/mL) = 1 mL olur.",
        "Başlangıç 4 mL, aktarılan 3 mL; toplam hacim bütçesi de kapanır.",
      ],
      "1 + 3 = 4 mL.",
      "Aktarılan hacim ile kalan hacmi karıştırmak.",
    ),
    q022(
      "Ksilem ve floemde hız karşılaştırması için hangi yaklaşım uygundur?",
      "Aynı birim ve koşullardaki ölçüm, itici fark ve direnç birlikte değerlendirilir",
      [
        [
          "Ölü eleman varsa bütün koşullarda mutlaka daha hızlıdır",
          "Canlılık tek başına evrensel hız sırası belirlemez.",
        ],
        [
          "İki yönlü ağda bütün boruların hızı kesin yarıdır",
          "Ağ yönleri sayısal hız bölme kuralı değildir.",
        ],
        [
          "mL/saat ile mg/saat doğrudan aynı sayı olarak karşılaştırılır",
          "Kütle akısına geçmek için derişim gerekir; büyüklükler farklıdır.",
        ],
        [
          "Basınç farkı ve geometri hiçbir zaman etkili değildir",
          "Akışın fiziksel koşulları itici fark ve dirençle ilişkilidir.",
        ],
      ],
      "Hacim akısı, doğrusal hız ve kütle akısı farklı büyüklüklerdir.",
      "Önce karşılaştırılan değişken ve birimleri eşleştir.",
      [
        "Birimler ve sistem koşulları aynı tür ölçümü göstermelidir.",
        "Basınç farkı, geometri ve çözelti özellikleri direnci ve akıyı etkiler.",
        "Yalnız canlı/ölü etiketiyle bütün koşullarda kesin sıra kurulamaz.",
      ],
      "Birim denetimi yanlış sayısal karşılaştırmayı önler.",
      "Dokunun adını tek başına evrensel hız yasası sanmak.",
    ),
  ],
  source:
    "MEBİ AYT Biyoloji Bölüm 2 fiziksel PDF 84–85; OGM Bitkisel Dokular II PDF 2–6 ve 16; Dersler Cepte Bitkilerin Yapısı ve Madde Taşınması PDF 7, 13–14, 16–17. Özgün kaynak–havuz düzeneği sabit dış basınç, direnç ve derişimle yalnız sonlu sıvı haznesi aktarımını hesaplar. Doku canlılığı, arkadaş hücrelerinin katkısı ve yön/hız genellemeleri koşullarıyla öğretilir.",
});

const positions022 = [2, 4, 1, 0, 3, 1, 3, 4, 2, 0, 4, 1];
export const forge022BiologyTopics: Record<string, string> = Object.fromEntries(
  units022.map((u) => [u.id, u.topic]),
);
export const forge022BiologyGuides: LessonGuide[] = units022.map(
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
export const forge022BiologyLessons: Lesson[] = units022.map((u, j) => ({
  id: u.id,
  subjectId: "ayt-biyoloji",
  title: txt(u.title),
  minutes: u.minutes,
  objectives: u.objectives.map(txt),
  source: txt(u.source),
  tags: [u.id, "forge022", "kaynakli-anlatim"],
  body: u.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: u.items.map((item, i): Question => {
    const answer = (positions022[i % positions022.length] + j) % 5,
      options = item.wrong.map(([text]) => text),
      reasons = item.wrong.map(([, reason]) => reason);
    options.splice(answer, 0, item.correct);
    reasons.splice(answer, 0, item.steps.join(" "));
    const result = {
      id: `f022-bio-${u.id}-${i + 1}`,
      prompt: txt(item.prompt),
      options: options.map(txt),
      answer,
      hint: txt(item.strategy),
      explanation: txt(item.steps.join(" ") + " Kontrol: " + item.check),
      skill: u.id,
      guidance: {
        knowledge: [item.knowledge],
        strategy: item.strategy,
        steps: item.steps,
        optionReasons: reasons,
        commonError: item.commonError,
        check: item.check,
      },
    };
    return result;
  }),
}));
