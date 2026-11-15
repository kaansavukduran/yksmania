import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";
const clamp016 = (n: number, a: number, b: number) =>
  Number.isFinite(n) ? Math.min(b, Math.max(a, n)) : a;
/** Given dilute ideal, nonvolatile-solute model; water Kf/Kb and 1 atm are explicit teaching data. */
export function colligative016(
  soluteMol: number,
  solventKg: number,
  particles: number,
) {
  const n = clamp016(soluteMol, 0, 0.1),
    water = clamp016(solventKg, 1, 3),
    i = Math.round(clamp016(particles, 1, 3));
  const effective = n * i,
    molality = effective / water,
    waterMoles = (water * 1000) / 18;
  return {
    n,
    water,
    i,
    effective,
    molality,
    freezingDrop: 1.86 * molality,
    boilingRise: 0.52 * molality,
    freezingC: -1.86 * molality,
    boilingC: 100 + 0.52 * molality,
    solventFraction: waterMoles / (waterMoles + effective),
  };
}
/** Four-component inventory, fully dissolved salt; no dragging, reaction, loss or entrainment. */
export function separation016(stage: number, collectWater: boolean) {
  const step = Math.round(clamp016(stage, 0, 3)),
    iron = step >= 1 ? 4 : 0,
    sand = step >= 2 ? 6 : 0;
  const waterCollected = step === 3 && collectWater ? 100 : 0,
    waterToSurroundings = step === 3 && !collectWater ? 100 : 0;
  const vessel = 120 - iron - sand - waterCollected - waterToSurroundings;
  return {
    step,
    iron,
    sand,
    waterCollected,
    waterToSurroundings,
    vessel,
    dissolvedSalt: step < 3 ? 10 : 0,
    drySalt: step === 3 ? 10 : 0,
    total: iron + sand + waterCollected + waterToSurroundings + vessel,
  };
}
/** Signed net strong-acid concentration. Stable quadratic includes water autoionization at 25°C. */
export function strongPH016(netAcid: number) {
  const net = clamp016(netAcid, -1, 1),
    root = Math.hypot(net, 2e-7);
  const hydronium = net >= 0 ? (net + root) / 2 : 2e-14 / (root - net);
  const hydroxide = 1e-14 / hydronium;
  return {
    net,
    hydronium,
    hydroxide,
    pH: -Math.log10(hydronium),
    pOH: -Math.log10(hydroxide),
    classification: net === 0 ? "Nötr" : net > 0 ? "Asidik" : "Bazik",
  };
}
export function acidBase016(kind: string, exponent: number) {
  const type = kind === "base" ? "base" : kind === "water" ? "water" : "acid",
    power = Math.round(clamp016(exponent, -8, -1));
  const concentration = type === "water" ? 0 : 10 ** power;
  return {
    type,
    power,
    concentration,
    ...strongPH016(type === "base" ? -concentration : concentration),
  };
}
/** This indicator interval is provided as model data; one color is not an exact-pH measurement. */
export function indicator016(pH: number) {
  const value = clamp016(pH, 0, 14);
  return {
    value,
    color: value < 8.2 ? "Renksiz" : value > 10 ? "Pembe" : "Geçiş aralığı",
    position: value / 14,
  };
}
/** Ideal fully dissociated HCl/NaOH at 25°C, additive given volumes, no hydrolyzing spectator ions. */
export function neutralization016(
  acidM: number,
  acidMl: number,
  baseM: number,
  baseMl: number,
) {
  const ca = clamp016(acidM, 0, 0.2),
    va = clamp016(acidMl, 10, 50),
    cb = clamp016(baseM, 0, 0.2),
    vb = clamp016(baseMl, 0, 100);
  const acid = (ca * va) / 1000,
    base = (cb * vb) / 1000,
    volumeL = (va + vb) / 1000,
    reacted = Math.min(acid, base);
  // Remove only relative machine-roundoff at mathematical equivalence.
  // The standalone pH model still preserves genuine tiny acid/base additions.
  const rawDifference = acid - base,
    difference =
      Math.abs(rawDifference) <= 8 * Number.EPSILON * Math.max(acid, base)
        ? 0
        : rawDifference;
  return {
    ca,
    va,
    cb,
    vb,
    acid,
    base,
    volumeL,
    reacted,
    remainingAcid: Math.max(0, difference),
    remainingBase: Math.max(0, -difference),
    ...strongPH016(difference / volumeL),
  };
}
type Item016 = [string, string, string[], string, string];
type Unit016 = LessonGuide & { title: string; topic: string; items: Item016[] };

const unitData: Unit016[] = [
  {
    id: "koligatif-ayirma",
    topic: "detail-186",
    title: "Koligatif özellikler / karışımların ayrılması",
    minutes: 42,
    objectives: [
      "Aynı koşullarda çözünmüş etkin tanecik miktarını karşılaştır.",
      "Ayırma amacını fiziksel özellik ve uygun yöntemle eşleştir.",
      "Birden fazla ayırma adımında her bileşenin nereye gittiğini izle.",
    ],
    sections: [
      {
        title: "Eşit gram, eşit tanecik değildir",
        paragraphs: [
          "Koligatif özellikler, uygun koşullarda çözeltideki çözünmüş tanecik derişimine bağlı değişir. Mol kütlesi farklı iki maddenin eşit gramları eşit mol değildir. Önce maddenin miktarını, sonra çözündüğünde hangi varlıklara ayrıldığını belirle.",
          "Şekerin her molekülü suda bir molekül olarak kalabilir. NaCl kristalinden ise uygun koşullarda Na⁺ ve Cl⁻ iyonları ayrılır. Tam ayrışma varsayımında 0,10 mol NaCl, toplam 0,20 mol çözünmüş iyon verir; bu, 0,20 mol NaCl eklendiği anlamına gelmez.",
        ],
      },
      {
        title: "Karşılaştırma koşullarını sabitle",
        paragraphs: [
          "İki çözeltiyi karşılaştırırken çözücü türünü ve çözücü miktarını kontrol et. Aynı sayıda taneciğin 1 kg ve 2 kg suda bulunması aynı derişimi vermez. Çözünmeden ayrı fazda kalan katı, çözünmüş tanecik hesabına eklenmez.",
          "Buhar basıncı karşılaştırmasında sıcaklık, kaynama karşılaştırmasında dış basınç aynı tutulur. Verilen seyreltik ideal model bir öğretim yaklaşımıdır; gerçek derişik elektrolitte iyon etkileşimleri nedeniyle tam aynı sonuç beklenmez.",
        ],
      },
      {
        title: "Buhar basıncı neden azalır?",
        paragraphs: [
          "Uçucu olmayan çözünen içeren ideal çözeltide, aynı sıcaklıkta çözücünün kısmi buhar basıncı saf çözücüye göre daha düşüktür. Sıvı ve buhar arasında denge kurulurken çözücü molekülleri iki yönde de hareket etmeye devam eder.",
          "İdeal modelde çözücünün kısmi basıncı, çözücünün mol kesri ile saf çözücü basıncının çarpımıdır. İki bileşen de uçucuysa toplam buhar basıncına ikisi de katkı verir; yalnız uçucu olmayan çözünen için kurulan karşılaştırmayı bu duruma koşulsuz taşıma.",
        ],
      },
      {
        title: "Kaynama yükselmesi: basıncı unutma",
        paragraphs: [
          "Kaynama, sıvının buhar basıncının dış basınca eşit olduğu koşulda gerçekleşir. Uçucu olmayan çözünenin bulunduğu çözeltide bu eşitliğe ulaşmak için genellikle daha yüksek sıcaklık gerekir. Saf suyun 100 °C örneği 1 atm dış basınç koşuluyla birlikte anlamlıdır.",
          "Seyreltik ideal modelde yükselme, çözünmüş etkin tanecik miktarının çözücü kilogramına oranıyla artar. Kütlece yüzde ile bu oran farklı paydalara sahiptir. Suyu iki katına çıkarıp çözüneni sabit tutmak, bu modelde kaynama yükselmesini yarıya indirir.",
        ],
      },
      {
        title: "Donma alçalması ve verilen model",
        paragraphs: [
          "Aynı çözücüde çözünmüş etkin tanecik derişimi arttıkça donmanın başladığı sıcaklık düşebilir. Yola tuz serpilmesinde amaç bu etkiden yararlanmaktır; uygulamanın çevresel zararları ve etkili olduğu sıcaklık aralığı ayrıca değerlendirilir.",
          "Sayısal panelde su için Kf = 1,86 ve Kb = 0,52 °C kg/mol değerleri verilmiştir. ΔTf = Kf × i × m ve ΔTb = Kb × i × m, belirtilen ideal yaklaşımın sonuçlarıdır. Çok derişik antifrizin gerçek donma sıcaklığını bu doğrusal formülle kesin ölçülmüş gibi sunamayız.",
        ],
      },
      {
        title: "Osmoz: net akış ve molekül hareketi",
        paragraphs: [
          "Yarı geçirgen zarın suyu geçirdiği, seçilen çözüneni geçirmediği iki bölmede suyun net hareketi uygun koşullarda daha yüksek etkin çözünen derişimi yönündedir. Her iki yönde de moleküler geçiş olabilir; net yön bu geçişlerin farkıdır.",
          "Denge kurulması bütün moleküllerin durması değildir; net akış sıfır olabilir. Ters osmozda dışarıdan basınç uygulanarak arıtılan su tarafına net geçiş sağlanır ve iş gerekir. İki çözeltinin aynı formül molaritesinde olması, farklı ayrışma ve zar geçirgenliğinde otomatik izotonik olduklarını göstermez.",
        ],
      },
      {
        title: "Ayırma hedefini önce seç",
        paragraphs: [
          "Bir karışımı ayırırken önce hangi bileşenin geri kazanılacağını söyle: Tuzlu sudan yalnız tuz mu, yoksa su da mı isteniyor? Yöntem seçimi karışımın fazına, tanecik boyutuna, yoğunluğa, uçuculuğa ve çözünürlüğe dayanır.",
          "Karışımı ayırmak, bileşiği kimyasal olarak parçalamakla aynı değildir. Demir tozunu mıknatısla almak yeni bir element oluşturmaz; suyu elektrolizle hidrojen ve oksijene dönüştürmek ise kimyasal değişimdir. Yöntemin adı kadar kullandığı farkı da açıklayabilmelisin.",
        ],
      },
      {
        title: "Boyut ve mıknatısla ayırma",
        paragraphs: [
          "Kum ve çakıl elekle, uygun boyuttaki çözünmemiş katı ve sıvı sıradan süzgeçle ayrılabilir. Demir gibi uygun manyetik bileşenler başka maddelerden mıknatısla ayrılabilir; her metalin aynı ölçüde çekildiğini varsayma.",
          "Suda çözünmüş Na⁺ ve Cl⁻ iyonları sıradan kağıt filtreden tutulmadan geçer. Diyaliz ise uygun zarın bazı küçük türleri geçirmesi, daha büyük türleri tutmasıyla seçici ayırma sağlar. Elek, filtre ve zar aynı gözenek yapısı ya da aynı seçicilik değildir.",
        ],
      },
      {
        title: "Yoğunluk ve karışmayan iki faz",
        paragraphs: [
          "Ayırma hunisi, seçilen koşullarda birbiriyle karışmayan iki sıvı fazı yoğunluk farkından yararlanarak ayırır. Yoğunluğu büyük faz altta toplanır; musluktan önce alt faz alınır. Sadece yoğunlukların farklı olması yeterli değildir.",
          "Su ve uygun yağ iki faz oluşturabilir; su ve etanol ise olağan koşullarda homojen karışır ve sırf yoğunlukları farklı diye huniyle katman katman alınamaz. Flotasyon, aktarma ve santrifüj gibi yöntemlerde de hangi fazın taşındığı ve ayrılmayı hangi farkın sağladığı belirtilmelidir.",
        ],
      },
      {
        title: "Buharlaştırma ve damıtmayı ayır",
        paragraphs: [
          "Tuzlu suda yalnız suyu buharlaştırıp çevreye bırakırsan kapta tuz kalabilir fakat suyu toplamış olmazsın. Basit damıtmada buhar soğutulur, yeniden sıvılaştırılır ve ayrı kapta toplanır; uçucu olmayan tuz ilk kapta kalır.",
          "Karışan uçucu sıvıları ayırmada ayrımsal damıtma kolonu, tekrarlanan buharlaşma ve yoğuşmayla ayrımı iyileştirir. Başarı bağıl uçuculuk, denge ve saflık hedefine bağlıdır. Kaynama noktaları farkı için tek bir 40 °C sınırını evrensel yasa veya yüzde yüz saflık garantisi olarak kullanma.",
        ],
      },
      {
        title: "Çözünürlükten yararlan",
        paragraphs: [
          "Kristallendirmede çözünmüş katının ayrılması, çözücüyü uzaklaştırma ya da uygun sıcaklık değişimiyle sağlanabilir. Soğutma ile kristal hesabı yaparken soruda verilen çözünürlük eğrisini kullan; her katının çözünürlüğü sıcaklıkla aynı yönde değişmez.",
          "Özütleme, uygun çözücünün bir bileşeni seçici biçimde çözmesinden yararlanır. Çayın demlenmesi katıdan sıvıya özütlemeye örnektir. Ayrımsal kristallendirmede ise iki çözünenin çözünürlüklerinin sıcaklığa farklı tepkisi önemlidir; tek soğutmanın her durumda tam saf iki ürün verdiği söylenemez.",
        ],
      },
      {
        title: "Dört bileşeni izleyen ayırma yolu",
        paragraphs: [
          "Modelde 4 g demir, 6 g kum, 10 g tuz ve 100 g su bulunur; tuz tamamen çözünmüş, demir ve kum çözünmemiş kabul edilir. Önce mıknatısla demir, sonra filtreyle kum alınır. Filtratta 10 g tuz ile 100 g su birlikte kalır.",
          "İdeal damıtmayla 100 g su ayrı kapta, 10 g tuz ilk kapta elde edilir; bütün kapların toplamı yine 120 g olur. Yalnız buharlaştırmada su çevreye gitmiştir, geri kazanılmış sayılmaz. Gerçek deneyde sürüklenme ve kayıp olabileceği için bu ideal envanteri ölçülmüş saflık garantisi sayma.",
        ],
      },
      {
        title: "Aktarma, santrifüj ve koagülasyon",
        paragraphs: [
          "Katı tanecikler yerçekimi etkisiyle dibe çöktüğünde üstteki sıvıyı dikkatle başka kaba almak aktarma, yani dekantasyon olarak adlandırılır. Bu yöntem çözünmüş tuzu sudan ayırmaz; ayrılan, farklı fazdaki çökelti ve üst sıvıdır. Santrifüj ise farklı bileşenlerin çökelme davranışından yararlanarak uygun karışımlarda ayrılmayı hızlandırır.",
          "Koagülasyonda küçük dağılmış taneciklerin daha büyük kümeler oluşturması sağlanabilir; ardından çöktürme veya süzme gibi işlemler kolaylaşır. Kullanılan yardımcı maddenin görevi ve suyun amacı belirtilmelidir. Bulanıklığın azalması bütün çözünmüş kimyasalların veya mikroorganizmaların giderildiğini ve suyun içilebilir olduğunu tek başına kanıtlamaz.",
        ],
      },
      {
        title: "Erime, süblimleşme ve elektriklenme",
        paragraphs: [
          "Uygun katı karışımlarda erime davranışının farklı olması ayırma için kullanılabilir; ancak gerçek alaşımlar her zaman iki saf metalin sırayla ve bütünüyle erimesi gibi davranmaz. Verilen faz veya erime verisini kullanmak gerekir. Süblimleşebilen bir bileşen, uygun koşullarda gaz fazına geçirilip başka yüzeyde yeniden katılaştırılarak ayrılabilir.",
          "Elektriklenme veya uygun elektriksel alanla ayırma, bileşenlerin elektriksel davranışlarının farkından yararlanır. Bu özellik mıknatısla çekilme ile aynı değildir. Soruda hangi farkın kullanıldığını seçerken tanecik boyutu, manyetik etki ve elektriksel etkiyi birbirinin yerine yazma; deneyin verilen koşulunu açıkça adlandır.",
        ],
      },
      {
        title: "Özütleme ve kristal seçiciliği",
        paragraphs: [
          "Sıvıdan sıvıya özütlemede seçilen ikinci çözücünün ilk sıvıyla uygun koşullarda ayrı faz oluşturması ve hedef bileşeni tercihli çözmesi gerekir. Çözünen genellikle iki faz arasında dağılır; tek işlemde tamamının öbür faza geçtiği söylenemez. Çözücüyü uzaklaştırmak da elde edilen maddenin mutlak saflığını kendiliğinden kanıtlamaz.",
          "Kristal hesabında çözelti içindeki çözünmüş miktarı, o sıcaklıktaki denge çözünürlüğüyle karşılaştır. Dipte çözünmemiş katı bulunması aşırı doymuş çözelti demek değildir. Aşırı doymuşluk, çözünmüş miktarın mevcut koşuldaki denge sınırının üstünde kalmasıdır; çoğu örnekte geçici ve kararsızdır. Ayrımsal kristallendirme için iki bileşenin çözünürlük değişimleri ayrı değerlendirilir.",
        ],
      },
    ],
    examples: [
      {
        title: "Eşit molde farklı etkin tanecik",
        prompt:
          "1 kg suya ayrı ayrı 0,10 mol şeker ve 0,10 mol NaCl tamamen çözülüyor. Şeker i = 1, NaCl i = 2; aynı basınçta ideal seyreltik model kullanılıyor. Hangisinin donma alçalması büyüktür?",
        strategy: "Molü etkin taneciğe, sonra çözücü kilogramına oranla.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Şeker için etkin miktar 0,10 × 1 = 0,10 mol; NaCl için 0,10 × 2 = 0,20 mol.",
          },
          {
            label: "2. adım",
            explanation: "Aynı 1 kg çözücüde oranlar 0,10 ve 0,20 mol/kg olur.",
          },
          {
            label: "3. adım",
            explanation:
              "NaCl modelde iki kat alçalma verir: 1,86 × 0,20 = 0,372 °C; şeker 0,186 °C.",
          },
        ],
        answer: "NaCl: iki kat donma alçalması",
        check: "0,372 / 0,186 = 2; karşılaştırma aynı çözücü kütlesindedir.",
        pitfall: "NaCl formül molü ile oluşan toplam iyon molünü karıştırma.",
      },
      {
        title: "Suyu iki katına çıkar",
        prompt:
          "0,10 mol NaCl, i = 2 varsayımıyla 1 kg yerine 2 kg suda çözülüyor. Kf = 1,86 °C kg/mol; ideal seyreltik yaklaşımda donma başlangıcı kaç °C olur?",
        strategy: "Çözünen aynı kaldığında yalnız paydayı değiştir.",
        steps: [
          {
            label: "1. adım",
            explanation: "Etkin tanecik miktarı 0,20 mol olarak kalır.",
          },
          {
            label: "2. adım",
            explanation: "Etkin oran 0,20/2 = 0,10 mol/kg olur.",
          },
          {
            label: "3. adım",
            explanation:
              "Donma alçalması 1,86 × 0,10 = 0,186 °C; saf su için 0 °C alındığında sonuç −0,186 °C.",
          },
        ],
        answer: "−0,186 °C",
        check: "Önceki 1 kg su durumundaki 0,372 °C alçalmanın yarısıdır.",
        pitfall: "2 kg suyu toplam çözeltinin kilogramı diye adlandırma.",
      },
      {
        title: "Kayıpsız ayırmada toplam",
        prompt:
          "4 g demir, 6 g kum, 10 g tamamen çözünmüş tuz ve 100 g su; sırayla mıknatıs, sıradan filtre ve ideal damıtma uygulanıyor. Her basamağın çıktısı nedir?",
        strategy: "Her bileşeni bir kez say ve hedef kabı izle.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Mıknatıs 4 g demiri alır; geride 116 g karışım vardır.",
          },
          {
            label: "2. adım",
            explanation:
              "Filtre 6 g kumu tutar; 110 g filtratta 10 g tuz ve 100 g su kalır.",
          },
          {
            label: "3. adım",
            explanation:
              "Damıtma 100 g suyu toplar, 10 g tuz ilk kapta kalır; 4 + 6 + 100 + 10 = 120 g.",
          },
        ],
        answer: "Demir 4 g, kum 6 g, tuz 10 g, toplanan su 100 g",
        check: "Çıktıların toplamı başlangıçtaki 120 gramla aynıdır.",
        pitfall: "Çözünmüş tuzu sıradan filtrede kalmış sayma.",
      },
      {
        title: "Verilen eğriden kristal",
        prompt:
          "X katısının çözünürlüğü verilen sıcak ve soğuk koşullarda sırasıyla 60 ve 20 g/100 g sudur. 100 g suda 60 g X tamamen çözünmüş; su kaybı olmadan soğutuluyor. Kaç gram kristal oluşur?",
        strategy: "Soğukta çözünmüş kalabilen miktarı çıkar.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "Su kütlesi değişmediği için soğukta en çok 20 g X çözünmüş kalır.",
          },
          {
            label: "2. adım",
            explanation:
              "Başlangıçtaki 60 gramdan 20 gramı sıvıda kalır; 60 − 20 = 40 g kristal ayrılır.",
          },
          {
            label: "3. adım",
            explanation:
              "Ana çözelti 100 + 20 = 120 g, kristal 40 g; toplam 160 g korunur.",
          },
        ],
        answer: "40 g kristal",
        check: "120 g ana çözelti + 40 g kristal = 160 g başlangıç toplamı.",
        pitfall:
          "Verilen X eğrisini bütün katıların gerçek çözünürlüğü gibi genelleme.",
      },
    ],
    recall: [
      {
        prompt: "Koligatif karşılaştırmada hangi miktar önemlidir?",
        answer:
          "Belirtilen ideal koşullarda çözünmüş etkin tanecik derişimi; yalnız eklenen gram değil.",
      },
      {
        prompt: "Sıradan filtre çözünmüş tuzu neden ayırmaz?",
        answer:
          "Çözünmüş iyonlar bu filtreyle ayrı katı faz gibi tutulmaz; filtrat tuzlu kalabilir.",
      },
      {
        prompt: "Huni için yoğunluk farkı tek başına yeterli mi?",
        answer:
          "Hayır; uygun koşullarda birbiriyle karışmayan iki sıvı faz da gerekir.",
      },
      {
        prompt: "Buharlaştırma ile damıtmada suyun farkı nedir?",
        answer:
          "Damıtmada buhar yoğunlaştırılarak toplanır; yalnız buharlaştırmada su çevreye gidebilir.",
      },
    ],
    items: [
      [
        "Aynı 1 kg suya ayrı ayrı 0,10 mol şeker ve 0,10 mol NaCl tamamen çözülüyor. Şeker i = 1, NaCl i = 2 verilen ideal seyreltik modelde hangisi doğrudur?",
        "NaCl çözeltisinin donma alçalması şekerinkinin iki katıdır.",
        [
          "Alçalmalar mutlaka eşittir.",
          "Şekerinki iki kat büyüktür.",
          "NaCl hiç tanecik oluşturmaz.",
          "Her iki çözelti de saf suyla aynı sıcaklıkta donmaya başlar.",
        ],
        "Formül molü ile toplam çözünmüş tanecik molünü ayır.",
        "Şeker 0,10 mol, NaCl toplam 0,20 mol çözünmüş tanecik verir. Aynı çözücü kütlesinde ideal donma alçalması bunlarla orantılıdır.",
      ],
      [
        "0,10 mol NaCl, i = 2 varsayımıyla 2 kg suda tamamen çözünüyor. Kf = 1,86 °C kg/mol, saf su donma noktası 0 °C. Verilen ideal seyreltik modelin donma başlangıcı nedir?",
        "−0,186 °C",
        ["−0,372 °C", "+0,186 °C", "−1,86 °C", "0 °C"],
        "Önce 0,20 mol etkin taneciği 2 kg suya böl.",
        "Etkin oran 0,10 mol/kg; alçalma 1,86 × 0,10 = 0,186 °C. Donma başlangıcı 0 − 0,186 °C olur.",
      ],
      [
        "Uçucu olmayan çözünen içeren ideal bir çözelti ile saf çözücüsü aynı sıcaklıkta karşılaştırılıyor. Hangisi doğrudur?",
        "Çözeltide çözücünün kısmi buhar basıncı daha düşüktür.",
        [
          "Çözünen mutlaka gaz olarak kaçar.",
          "Basınç kıyaslamak için sıcaklığı farklı seçmek gerekir.",
          "Çözelti her sıcaklıkta kaynar.",
          "İki uçucu bileşenin toplam basıncı her durumda sıfırdır.",
        ],
        "Aynı sıcaklıkta çözücünün mol kesrini düşün.",
        "Uçucu olmayan çözünen, ideal çözeltide çözücünün mol kesrini azaltır; çözücünün kısmi basıncı da azalır. İki uçucu türün toplam basıncı farklı bir durumdur.",
      ],
      [
        "Suyu geçiren, şekeri geçirmeyen zarla ayrılmış iki şeker çözeltisi osmotik dengededir. Hangisi doğrudur?",
        "Suyun iki yöndeki moleküler geçişi sürebilir; net geçiş sıfırdır.",
        [
          "Bütün su molekülleri hareketsizdir.",
          "Şekerin zardan geçmesi zorunludur.",
          "Denge, iki tarafın kesinlikle aynı sıvı yüksekliğinde olması demektir.",
          "Ters osmoz dışarıdan hiçbir iş gerektirmez.",
        ],
        "Mikroskobik hareket ile net akışı ayır.",
        "Dinamik dengede iki yöndeki geçişler birbirini dengeleyebilir. Osmotik ve hidrostatik etkiler birlikte olduğundan aynı yükseklik zorunlu değildir.",
      ],
      [
        "10 g tuz 100 g suda tamamen çözünmüştür. Sıradan kağıt filtre uygulanınca, kayıp olmadığı varsayımında hangi sonuç beklenir?",
        "Tuz çözünmüş halde filtratta suyla birlikte kalır.",
        [
          "10 g tuzun tamamı filtrede kalır.",
          "Filtrat kesinlikle saf sudur.",
          "Tuz yeni bir elemente dönüşür.",
          "Suyun tamamı filtrede katılaşır.",
        ],
        "Ayrı katı faz var mı?",
        "Çözünmüş iyonlar sıradan kağıt filtreyle tutulacak ayrı bir katı faz değildir; filtrat tuzlu su olabilir.",
      ],
      [
        "60 mL suyun yoğunluğu 1,0 g/mL, 40 mL yağın yoğunluğu 0,8 g/mL. Sıvılar karışmıyor ve tepkime vermiyor. Ayırma hunisinden önce hangi faz alınır?",
        "Alttaki su fazı",
        [
          "Üstteki yağ fazı",
          "Mutlaka iki sıvının eşit karışımı",
          "Katı buz fazı",
          "Yoğunluğu küçük olduğu için su fazı",
        ],
        "Yoğunluğu büyük olan faz altta olur.",
        "Suyun yoğunluğu daha büyüktür; altta su, üstte yağ bulunur. Musluktan önce alt faz su alınır; suyun toplam kütlesi 60 g, yağınki 32 g olur.",
      ],
      [
        "Tuzlu sudaki hem su hem tuz geri kazanılmak isteniyor. Uçucu olmayan tuz, kayıp ve sürüklenme yok. En uygun seçenek hangisidir?",
        "Suyu buharlaştırıp yoğunlaştırarak toplamak; tuzu ilk kapta bırakmak",
        [
          "Sadece suyu açıkta buharlaştırıp çevreye bırakmak",
          "Sıradan filtreden geçirip saf su beklemek",
          "Mıknatısla suyu çekmek",
          "Ayırma hunisiyle homojen çözeltiyi katmanlara ayırmak",
        ],
        "İstenen su nereye gidecek?",
        "Basit damıtma suyu buharlaştırıp yoğunlaştırır ve ayrı kapta toplar. Sadece açık buharlaştırmada tuz kalabilir fakat su geri kazanılmaz.",
      ],
      [
        "Ayrımsal damıtmaya ilişkin hangi ifade savunulabilir?",
        "Kolonun tekrarlanan buharlaşma ve yoğuşması, uygun karışımda ayrımı iyileştirir.",
        [
          "Her iki sıvı mutlaka tamamen saf olarak tek adımda ayrılır.",
          "Kaynama farkı 40 °C ise bütün karışımlarda işlem imkansızdır.",
          "Karışan sıvılar yalnız yoğunluk farkıyla hunide ayrılır.",
          "Kolon kimyasal olarak yeni element üretir.",
        ],
        "Kolonun amacı denge basamaklarını artırmaktır.",
        "Ayırma başarısı uçuculuk, denge ve saflık hedefine bağlıdır. Tek bir sıcaklık farkı evrensel karar sınırı veya tam saflık garantisi değildir.",
      ],
      [
        "Verilen X katısı için çözünürlük sıcak koşulda 60, soğuk koşulda 20 g/100 g sudur. 100 g suda çözünmüş 60 g X, su kaybı olmadan soğutuluyor. Oluşan kristal kütlesi nedir?",
        "40 g",
        ["20 g", "60 g", "100 g", "120 g"],
        "Soğukta çözünmüş kalabilecek 20 gramı çıkar.",
        "60 − 20 = 40 g X kristali ayrılır. Ana çözelti 120 gramdır; bu değer kristal kütlesi değildir.",
      ],
      [
        "4 g Fe, 6 g kum, 10 g tamamen çözünmüş tuz ve 100 g sudan oluşan karışıma sırasıyla mıknatıs ve sıradan filtre uygulanıyor. Kayıp ve tepkime yok. Filtrat kaç gramdır?",
        "110 g",
        ["10 g", "100 g", "116 g", "120 g"],
        "Önce demir, ardından kum ayrılır.",
        "Başlangıç 120 g; mıknatıs 4 g, filtre 6 g alır. Filtratta 10 g tuz + 100 g su = 110 g kalır.",
      ],
    ],
    source:
      "Aurelia TYT Kimya 048 PDF 1–7; MEBİ TYT Kimya Konu Özetleri fiziksel PDF 77–81; OGM 10. Sınıf  Ayırma ve Saflaştırma PDF 10–13; OGM 11. Sınıf  ilgili fasikül PDF 22–25,28–29 karşılaştırıldı. Anlatım, şekil ve alıştırmalar özgündür; ideal model koşulları kaynak genellemelerinden ayrıldı. Resmî sınav sorusu değildir.",
  },
  {
    id: "asit-baz-tuz-ozellikleri",
    topic: "detail-187",
    title: "Asit baz ve tuzlar genel özellikler",
    minutes: 42,
    objectives: [
      "Sulu ortamda H₃O⁺ ve OH⁻ üzerinden asitlik ve bazlık kanıtını yorumla.",
      "Kuvvet, derişim, pH ve indikatör aralığını ayrı değerlendir.",
      "Tuzun iyon yapısını ve çözeltisinin davranışını koşullarıyla açıkla.",
    ],
    sections: [
      {
        title: "Suda hangi iyon artıyor?",
        paragraphs: [
          "Sulu çözelti bağlamında asit, hidronyum H₃O⁺ derişimini; baz ise hidroksit OH⁻ derişimini artırabilen madde olarak tanıtılır. H⁺ yazımı çoğu okul denkleminde sulu proton için kullanılan kısaltmadır; suda serbest ve yalnız duran bir proton resmiyle karıştırılmamalıdır.",
          "Asidik çözeltide OH⁻ hiç yoktur ya da bazik çözeltide H₃O⁺ hiç yoktur demeyiz. Suyun kendisi de çok az iyonlaşır. Sınıflandırma, uygun sıcaklıkta iki iyonun derişimlerinin hangisinin daha büyük olduğuna dayanır.",
        ],
      },
      {
        title: "Formüldeki harf tek başına yetmez",
        paragraphs: [
          "NH₃ formülünde OH grubu yoktur ama suyla proton alışverişinde NH₄⁺ ve OH⁻ oluşumunu artırabilir. Buna karşılık CH₃OH yapısında OH bulunması, suda NaOH gibi serbest OH⁻ vererek güçlü baz olduğu anlamına gelmez.",
          "Benzer biçimde hidrojen içeren bütün bileşikler suda asit gibi davranmaz. CO₂ gibi bazı hidrojen içermeyen türler ise suyla etkileşerek ortamın asitliğini artırabilir. Formülden ezber yerine yapı, çözücü ve verilen tepkime kanıtını birlikte kullan.",
        ],
      },
      {
        title: "Nötrlük eşitliktir; 7 sıcaklığa bağlıdır",
        paragraphs: [
          "Nötr sulu çözeltide H₃O⁺ ve OH⁻ derişimleri eşittir. 25 °C için saf suyun iyon çarpımı yaklaşık 10⁻¹⁴ kabul edildiğinde her biri 10⁻⁷ mol/L ve pH 7 olur. Bu sıcaklıkta pH 7 altı asidik, üstü baziktir.",
          "Sıcaklık değiştiğinde suyun iyonlaşma dengesi değişebilir; nötr pH değerinin her sıcaklıkta kesin 7 olduğu söylenemez. Sık kullanılan 0–14 cetveli de tanıtıcı bir aralıktır, bütün çözeltiler için aşılması imkansız fizik sınırı değildir.",
        ],
      },
      {
        title: "pH doğrusal bir yüzde değildir",
        paragraphs: [
          "İdeal seyreltik yaklaşımda pH, H₃O⁺ derişiminin on tabanındaki logaritmasıyla ilişkilidir: pH = −log[H₃O⁺]. Bu ifade için derişimin mol/L cinsindeki sayısal değeri kullanılır; daha ileri kimyada etkinlik düzeltmesi gerekir.",
          "pH 2 ile pH 3 arasında hidronyum derişimi iki ya da üç kat değil, on kat değişir. pH 2 için yaklaşık 0,01 mol/L, pH 3 için 0,001 mol/L H₃O⁺ vardır. İki pH sayısını toplayarak karışım pH hesaplanmaz; önce miktarlar ve tepkimeler incelenir.",
        ],
      },
      {
        title: "Kuvvet ile derişimi ayır",
        paragraphs: [
          "Kuvvet, seçilen çözücüde bir türün iyonlaşma eğilimiyle; derişim, belirli miktar çözeltideki madde miktarıyla ilgilidir. Seyreltik HCl yine güçlü asit olarak sınıflandırılır; su eklenmesi onu otomatik zayıf asit türüne dönüştürmez.",
          "Zayıf asidin daha derişik bir numunesi bulunabilir. Tek bir pH veya iletkenlik ölçümü, tür ve derişim bilgisi yoksa kuvveti tek başına belirleyemez. Ayrıca zayıf terimi güvenli ya da zararsız anlamına gelmez; madde ve maruziyet koşulları ayrıca önemlidir.",
        ],
      },
      {
        title: "Seyreltme ve suyun katkısı",
        paragraphs: [
          "Güçlü tek protonlu asidin yeterince seyreltik ama suyun iyonlarından çok daha derişik olduğu bölgede, on kat seyreltme hidronyumu yaklaşık on kat azaltır ve pH yaklaşık bir artar. Çözünen molü kayıp ve tepkime yoksa sabit kalır; değişen hacimdir.",
          "Çok küçük asit derişiminde yalnız eklenen asidi saymak hatalı sonuç verir. Örneğin 10⁻⁸ mol/L güçlü asit için saf asit katkısından pH 8 çıkarıp bazik dememelisin. Panel, 25 °C su iyonlaşmasını da katar; bu numune çok az asidik, pH yaklaşık 6,978 olur.",
        ],
      },
      {
        title: "İndikatör bir aralık okur",
        paragraphs: [
          "İndikatör rengi, belirli geçiş aralığında ortamın asitliği hakkında bilgi verir. Panelde fenolftalein için 8,2–10,0 geçiş aralığı açık veri olarak verilir. Bu aralığın altında renksiz kalması, örneğin kesin asit olduğunu kanıtlamaz.",
          "25 °C ve pH 7,5 olan bazik numune de fenolftaleinle renksiz olabilir. Bir renkten kesin ondalıklı pH elde etmek için uygun kalibrasyon ve ölçüm gerekir. Renkleri tek kanıt yapma; yanında yazılı aralık ve sınıfı da kullan.",
        ],
      },
      {
        title: "Günlük numuneyi kanıtla tanı",
        paragraphs: [
          "Limon suyu, sirke veya sabunlu su için kaynaklarda verilen pH sayıları tipik numune örnekleridir. Gerçek ürünün reçetesi, seyrelmesi ve ölçüm sıcaklığı değeri değiştirebilir. Ürün adından her koşulda tek bir kesin pH çıkarma.",
          "Tatma, koklama veya elle kayganlık arama bir kimya testi değildir. Uygulamada örnekler veri kartları ve güvenli temsillerle incelenir. Biberin acı hissi gibi duyu etkileri de bir maddenin baz olduğunun güvenilir kimyasal ölçütü sayılmaz.",
        ],
      },
      {
        title: "Oksit sınıflarında koşul ve istisna",
        paragraphs: [
          "Bazı ametal oksitler suyla etkileşerek asidik, bazı metal oksitler bazik davranış gösterebilir. CO₂ ve uygun bazik oksit örnekleri, verilen tepkimeler üzerinden karşılaştırılabilir; oksitteki oksijen sayısını tek başına evrensel karar kuralı yapma.",
          "CO, NO gibi nötr oksit örnekleri ve Al₂O₃ gibi amfoter örnekler basit genellemenin sınırını gösterir. Her oksidin suda kolayca çözündüğünü veya anında aynı tür iyon oluşturduğunu da varsayma. Tepkime ve çözünürlük koşullarını ayrı düşün.",
        ],
      },
      {
        title: "Tuz: kristal ve çözelti farklı gösterilir",
        paragraphs: [
          "Tuzlar iyonik bileşiklerdir; kristalde katyon ve anyonlar örgü oluşturur. NaCl formül birimi, iyon sayılarının en sade oranını gösterir; tek bağımsız NaCl molekülü gibi düşünülmez. Birim hücre ise kristal örgünün geometrik tekrar birimidir, formül birimiyle aynı kavram değildir.",
          "Katı kristalde iyonlar konumları çevresinde titreşirken serbestçe göç edemez. Uygun eriyik veya çözeltide hareketli iyonlar elektrik akımı taşıyabilir. Suda az çözünen tuz ile çözeltisinin asitlik etkisi farklı sorulardır; az çözünüyor diye mutlaka nötr denmez.",
        ],
      },
      {
        title: "Her tuz çözeltisi nötr değildir",
        paragraphs: [
          "NaCl uygun seyreltik sulu örnekte nötr davranırken NH₄Cl çözeltisi NH₄⁺ iyonunun suyla etkileşimi nedeniyle asidik olabilir. Asetat içeren CH₃COONa çözeltisi ise asetat iyonunun suyla etkileşimi nedeniyle bazik davranabilir.",
          "Bu karşılaştırmada tuzun adı veya formülündeki H sayısı tek başına karar verdirmez. Hangi iyonun suyla nasıl etkileştiği önemlidir. Asit ile bazın tepkimesinde tuz oluştuğunu bilmek, son çözeltinin her koşulda pH 7 olduğunu söylemek için yeterli değildir.",
        ],
      },
      {
        title: "Tanıdık tuzları karıştırma",
        paragraphs: [
          "Na₂CO₃ çamaşır sodası, NaHCO₃ yemek sodası, CaCO₃ kireç taşı, NH₄Cl nişadır olarak bilinir. Kabartma tozu ise yalnız saf NaHCO₃ ile özdeş değildir; genellikle asitli bileşenler ve başka yardımcı maddeler içeren karışımdır.",
          "NaCl su yumuşatma sistemlerinde iyon değiştirici reçinenin yenilenmesinde kullanılabilir; suya sırf NaCl eklemek bütün Ca²⁺ ve Mg²⁺ iyonlarını doğrudan çöktürür demek değildir. Kullanım alanını ezberlerken hangi kimyasal işlevi yerine getirdiğini de sor.",
        ],
      },
    ],
    examples: [
      {
        title: "pH cetvelini doğru oku",
        prompt:
          "25 °C sulu üç numunenin pH değerleri sırasıyla 3, 7 ve 11. Hangileri asidik, nötr ve baziktir?",
        strategy: "Önce sıcaklık koşulunu, sonra 7 ile karşılaştırmayı kullan.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "25 °C için nötrlük H₃O⁺ ve OH⁻ derişimlerinin eşitliğine karşılık pH 7 verir.",
          },
          {
            label: "2. adım",
            explanation: "pH 3, 7’den küçük; pH 11, 7’den büyüktür.",
          },
          {
            label: "3. adım",
            explanation:
              "Sıra asidik, nötr, baziktir; bu etiketler numunedeki iki iyonun hiç birinin tamamen yok olduğu anlamına gelmez.",
          },
        ],
        answer: "3: asidik; 7: nötr; 11: bazik",
        check: "pH 7 olan numunede iki iyonun derişimleri eşittir.",
        pitfall: "25 °C koşulunu bütün sıcaklıklara taşımama.",
      },
      {
        title: "On kat seyreltme",
        prompt:
          "25 °C ideal güçlü HCl çözeltisi 0,010 mol/L’den 0,0010 mol/L’ye seyreltiliyor. Bu aralıkta suyun katkısı ihmal edilebiliyor. Yaklaşık pH değişimi?",
        strategy: "Derişimi kuvvetle karıştırmadan logaritmik ölçeği uygula.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "İlk H₃O⁺ derişimi yaklaşık 10⁻² mol/L; pH yaklaşık 2.",
          },
          {
            label: "2. adım",
            explanation:
              "Son H₃O⁺ derişimi yaklaşık 10⁻³ mol/L; pH yaklaşık 3.",
          },
          {
            label: "3. adım",
            explanation: "pH bir artar; HCl türü güçlü asit olmayı sürdürür.",
          },
        ],
        answer: "Yaklaşık 2’den 3’e çıkar",
        check: "Hidronyum yaklaşık on kat azalır; pH değeri on katına çıkmaz.",
        pitfall: "Seyreltmeyi asit türünün zayıflamasıyla özdeşleştirme.",
      },
      {
        title: "Renksiz ama bazik",
        prompt:
          "25 °C’de pH 7,5 olarak ölçülen numuneye fenolftalein uygulanıyor. Verilen geçiş aralığı 8,2–10,0; 8,2 altında renksiz kabul ediliyor. Beklenen sınıf ve renk?",
        strategy: "Asitlik sınırı ile göstergenin renk sınırını ayrı tut.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "pH 7,5 değeri 25 °C nötrlük değeri 7’den büyüktür; numune baziktir.",
          },
          {
            label: "2. adım",
            explanation:
              "7,5, verilen indikatör geçişinin alt sınırı 8,2’den küçüktür.",
          },
          {
            label: "3. adım",
            explanation:
              "Numune bu modelde renksiz ve baziktir; renksizlik kesin asit kanıtı değildir.",
          },
        ],
        answer: "Bazik ve renksiz",
        check: "Tek gösterge rengi kesin pH sayısı vermez.",
        pitfall: "pH sınıflandırması ile indikatör aralığını aynı sınır sanma.",
      },
      {
        title: "Tuzun iyonunu izle",
        prompt:
          "Verilen deneylerde NaCl çözeltisi nötr, NH₄Cl asidik, CH₃COONa baziktir. Açıklamada hangi iyonlar önemlidir?",
        strategy: "Verilen gözlemi suyla etkileşen iyon üzerinden açıkla.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "NaCl için bu seyreltik koşullarda belirgin asitlik/bazlık değişimi oluşturmayan Na⁺ ve Cl⁻ örneği kullanılır.",
          },
          {
            label: "2. adım",
            explanation:
              "NH₄⁺ suyla etkileşerek H₃O⁺ artışına; CH₃COO⁻ ise OH⁻ artışına yol açabilir.",
          },
          {
            label: "3. adım",
            explanation:
              "Bütün tuzları nötr kabul etmek yerine verilen iyonların suyla etkileşimini ayır.",
          },
        ],
        answer: "NH₄⁺ asidik, CH₃COO⁻ bazik etkiyi açıklar",
        check: "Na⁺ içeren her tuzun aynı pH vermesi zorunlu değildir.",
        pitfall: "Tuz oluşmasını her durumda pH 7 garantisi sayma.",
      },
    ],
    recall: [
      {
        prompt: "Nötr çözeltinin asıl ölçütü nedir?",
        answer:
          "Sıcaklığına uygun koşullarda H₃O⁺ ve OH⁻ derişimlerinin eşit olmasıdır.",
      },
      {
        prompt: "Güçlü asidin seyrelmesi onu zayıf asit türü yapar mı?",
        answer:
          "Hayır; numunenin derişimi değişir, aynı çözücüde türün kuvvet sınıfı ayrı kavramdır.",
      },
      {
        prompt: "Renksiz fenolftalein kesin asit kanıtı mı?",
        answer:
          "Hayır; geçiş aralığının altındaki hafif bazik örnek de renksiz olabilir.",
      },
      {
        prompt: "Formül birimi ile birim hücre aynı mı?",
        answer:
          "Hayır; formül birimi iyon oranını, birim hücre kristalin geometrik tekrarını anlatır.",
      },
    ],
    items: [
      [
        "25 °C sulu bir numunede [H₃O⁺] = 10⁻³ mol/L ve [OH⁻] = 10⁻¹¹ mol/L verilmiştir. Numune için hangisi doğrudur?",
        "Asidiktir; pH yaklaşık 3’tür.",
        [
          "Baziktir; pH yaklaşık 11’dir.",
          "Nötrdür; bütün iyonlar eşittir.",
          "Hiç OH⁻ içermemektedir.",
          "Bu iki derişimin birimi gramdır.",
        ],
        "Hidronyum baskın ve 10⁻³ düzeyindedir.",
        "H₃O⁺ derişimi OH⁻ derişiminden büyüktür. İdeal seyreltik modelde −log(10⁻³) = 3; OH⁻ çok az da olsa vardır.",
      ],
      [
        "NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ tepkimesi verilmiştir. Sulu NH₃ için hangi çıkarım yapılır?",
        "Formülünde OH grubu bulunmasa da bazik davranabilir.",
        [
          "Bütün NH₃ molekülleri kesinlikle tamamen iyonlaşır.",
          "NH₃ bu denklemde CO₂ oluşturur.",
          "Formülünde OH yoksa hiçbir baz olamaz.",
          "Suda yalnız katı NH₃ oluşur.",
        ],
        "Denklemin sağındaki OH⁻ artışını izle.",
        "NH₃ sudan proton alarak NH₄⁺ ve OH⁻ oluşumunu artırabilir; bazlık için başlangıç formülünde OH bulunması zorunlu değildir. Denge oku tam ayrışma garantisi değildir.",
      ],
      [
        "Suda hazırlanan 0,10 mol/L HCl çözeltisine su eklenerek derişimi 0,010 mol/L yapılıyor; tepkime veya kayıp yok. Hangi ifade doğrudur?",
        "Numunenin derişimi azalır; HCl güçlü asit türü olmayı sürdürür.",
        [
          "HCl mutlaka zayıf asit türüne dönüşür.",
          "Çözünen HCl miktarı otomatik on kat artar.",
          "Su eklemek pH değerini zorunlu olarak 0 yapar.",
          "Derişim ile kuvvet aynı kavramdır.",
        ],
        "Türün iyonlaşma eğilimi ile numune miktarını ayır.",
        "Seyreltme çözelti hacmini ve derişimi değiştirir; aynı asit türünün kuvvet sınıfını otomatik değiştirmez.",
      ],
      [
        "25 °C ideal seyreltik modelde bir numunenin pH değeri 2, diğerinin 3’tür. İlk numunenin H₃O⁺ derişimi ikincinin kaç katıdır?",
        "10",
        ["2", "3", "1,5", "1000"],
        "pH farkı bir, ölçek logaritmiktir.",
        "10⁻² / 10⁻³ = 10. pH sayıları doğrudan derişim oranı olarak bölünmez.",
      ],
      [
        "25 °C’de pH 7,5 olan numunede, verilen 8,2–10,0 geçiş aralığına sahip fenolftalein 8,2 altında renksizdir. Hangi eşleştirme doğrudur?",
        "Bazik numune; renksiz gösterge",
        [
          "Asidik numune; pembe gösterge",
          "Nötr numune; kesin pH 7",
          "Bazik numune; mutlaka pembe gösterge",
          "Renksiz olduğu için H₃O⁺ ve OH⁻ kesinlikle yok",
        ],
        "Nötrlük ve renk geçişi iki ayrı sınırdır.",
        "7,5 > 7 olduğundan numune bazik; 7,5 < 8,2 olduğundan verilen gösterge renksizdir. Renksizlik tek başına asit kanıtı değildir.",
      ],
      [
        "25 °C saf su için H₃O⁺ ve OH⁻ derişimleri eşit, her biri 10⁻⁷ mol/L verilmiştir. Nötrlük hakkında en doğru ifade hangisidir?",
        "Asıl koşul iyon derişimlerinin eşitliğidir; nötr pH sıcaklığa bağlı olabilir.",
        [
          "Nötr çözeltide hiç iyon bulunamaz.",
          "Her sıcaklıkta nötr pH kesinlikle 7’dir.",
          "Sıcaklık değişimi suyun iyonlaşmasını etkileyemez.",
          "Nötrlük için OH⁻ mutlaka daha büyük olmalıdır.",
        ],
        "Eşitlik ile belirli sıcaklıktaki sayıyı ayır.",
        "Nötr olma koşulu derişim eşitliğidir. Suyun iyonlaşma dengesi sıcaklığa bağlı olduğundan nötr pH sayısı da değişebilir.",
      ],
      [
        "Verilen çözünme modeli NaCl(k) → Na⁺(suda) + Cl⁻(suda) şeklindedir. NaCl katısı için hangisi doğrudur?",
        "Formül birimi iyonların 1: 1 oranını gösterir; bağımsız NaCl molekülü çizmek uygun değildir.",
        [
          "Her formül birimi bağımsız NaCl molekülüdür.",
          "Katıda yalnız Na⁺ bulunur.",
          "Cl⁻ iyonları çözünürken elementten yok olur.",
          "Birim hücre her zaman tek bir iyon demektir.",
        ],
        "Kristal örgü ile molekül kavramını ayır.",
        "İyonik kristal tekrarlanan örgüdür. NaCl formülü katyon/anyon oranını anlatır; birim hücre ise ayrı geometrik kavramdır.",
      ],
      [
        "Verilen deneyde NH₄Cl çözeltisi asidik, NaCl çözeltisi nötrdür. Hangisi bu verilerle uyumludur?",
        "Tuz iyonlarının suyla etkileşimi farklı olduğundan bütün tuzların pH değeri aynı değildir.",
        [
          "Bütün tuzların pH değeri mutlaka 7’dir.",
          "NH₄Cl hiç iyon içermez.",
          "Her Cl⁻ içeren çözelti aynı pH vermek zorundadır.",
          "NaCl’nin nötr olması suda çözünmediğini kanıtlar.",
        ],
        "Ortak Cl⁻ dışında kalan iyonu da düşün.",
        "NH₄⁺ suyla etkileşerek asitlik oluşturabilir; NaCl’nin verilen nötr davranışı bütün tuzlara genellenemez.",
      ],
      [
        "Yemek sodası ile kabartma tozu arasındaki hangi ayrım doğrudur?",
        "Yemek sodası NaHCO₃ olabilir; kabartma tozu genellikle asitli bileşen de içeren karışımdır.",
        [
          "İkisi her üründe kesinlikle saf NaCl’dir.",
          "Kabartma tozu tek bir elementtir.",
          "NaHCO₃ hiçbir koşulda asitle tepkime vermez.",
          "Karışımın bütün bileşenleri zorunlu olarak aynı kimyasal formüldedir.",
        ],
        "Saf bileşik ile ürün karışımını ayır.",
        "NaHCO₃ yemek sodasıdır. Kabartma tozu bununla birlikte uygun asitli bileşenler ve yardımcı maddeler içerebilir; birebir aynı saf madde değildir.",
      ],
      [
        "25 °C’de formal derişimi 10⁻⁸ mol/L olan ideal güçlü HCl çözeltisi inceleniyor. Suyun iyonlaşması ihmal edilemiyor. Hangi yaklaşım doğrudur?",
        "Suyun katkısı da sayılmalıdır; numune çok az asidik olur.",
        [
          "Yalnız −log(10⁻⁸) = 8 hesaplanır ve baziktir denir.",
          "HCl eklemek zorunlu olarak OH⁻ fazlası oluşturur.",
          "Suyun bütün iyonları kaybolur.",
          "Asit çözeltisinin pH değeri tam olarak 0 olmak zorundadır.",
        ],
        "Çok küçük asit katkısını saf suyun iyonlarıyla karşılaştır.",
        "Yük dengesi ve suyun iyonlaşması birlikte kullanılır. Bu ideal modelde [H₃O⁺] yaklaşık 1,051×10⁻⁷ mol/L ve pH yaklaşık 6,978 olur; pH 8 sonucuyla bazik denmez.",
      ],
    ],
    source:
      "Aurelia TYT Kimya 049 PDF 1–7; MEBİ TYT Kimya Konu Özetleri fiziksel PDF 82,85–86; OGM 10. Sınıf  Asitler ve Bazlar ilgili fasikül PDF 10–13,22,25 okundu. Anlatım, model ve alıştırmalar özgündür; 25°C, gösterge aralığı ve tuz hidrolizi sınırları açık verilir. Resmî sınav sorusu değildir.",
  },
  {
    id: "asit-baz-tepkimeleri",
    topic: "detail-188",
    title: "Asit baz tepkimeleri",
    minutes: 42,
    objectives: [
      "Asit-baz olayını atom, yük ve iyon korunumu ile açıkla.",
      "Derişim ve hacimden mol hesabıyla gereken miktarı ve artanı bul.",
      "Eşdeğerlik, son pH ve gaz türü çıkarımlarını verilen koşullarla sınırla.",
    ],
    sections: [
      {
        title: "Proton aktarımı ve yeni su",
        paragraphs: [
          "Sulu güçlü asit ile hidroksit içeren bazın nötrleşmesinde H₃O⁺ + OH⁻ → 2H₂O net iyon denklemi kullanılabilir. H⁺ kısaltmasıyla yazıldığında H⁺ + OH⁻ → H₂O olur; iki gösterimin su ortamını nasıl saydığı farklıdır.",
          "Hidronyumlu denklemde atom ve toplam yük iki tarafta da korunur. Bu tepkimeyi bütün suyun ilk kez oluşması gibi yorumlama: Çözücü olarak zaten çok miktarda su vardır. Modelde hesaplanan, seçilen tepkime denklemine göre oluşan yeni su miktarıdır.",
        ],
      },
      {
        title: "Seyirci iyon yok olmaz",
        paragraphs: [
          "HCl ve NaOH sulu çözeltilerinin tam iyon gösteriminde Na⁺ ile Cl⁻ her iki tarafta bulunur; net tepkimeden çıkarılmalarının nedeni kimyasal olarak yok olmaları değil, bu net değişimde seyirci kalmalarıdır.",
          "Çözünmüş NaCl’yi her koşulda bağımsız molekül ya da çökmüş kristal olarak çizmek doğru olmaz. Uygun seyreltik sulu ortamda Na⁺ ve Cl⁻ iyonları hareketlidir. Moleküler, tam iyon ve net iyon denklemleri aynı olayın farklı ayrıntı düzeyleridir.",
        ],
      },
      {
        title: "Katsayılar eşdeğer ihtiyacını verir",
        paragraphs: [
          "HCl + NaOH → NaCl + H₂O denkleminde mol oranı 1: 1’dir. H₂SO₄’ün iki protonunun tam nötrleştiği verilen toplam denklemde ise 1 mol H₂SO₄ için 2 mol KOH gerekir. Katsayı gram ya da mililitre oranı değildir.",
          "Ca(OH)₂ için formül başına iki OH grubu bulunması, uygun çözünme ve tam tepkime koşulunda iki eşdeğer bazlık verebilir. Birden çok proton verebilen bir asidin bütün protonlarının başlangıçta bütünüyle serbest olduğu sonucu çıkarılamaz; tam nötrleşme için toplam stokiyometrik ihtiyaç ayrı kavramdır.",
        ],
      },
      {
        title: "Hacimden önce birimi düzelt",
        paragraphs: [
          "Derişim mol/L verildiğinde n = c × V hesabında hacim litre olmalıdır. 25 mL, 0,025 L’dir. Örneğin 0,20 mol/L HCl’nin 25 mL’si 0,0050 mol asit verir; 25 sayısını doğrudan litre kabul etmek bin kat hata doğurur.",
          "Eşit hacimli iki çözeltide mol sayısı eşit olmak zorunda değildir. Karşılaştırmada her iki numunenin derişimini, hacmini ve verilen tepkimede kaç eşdeğer verdiğini ayrı yaz. Sonra mol oranı üzerinden tepkimeyi ilerlet.",
        ],
      },
      {
        title: "Başlangıç, değişim, son",
        paragraphs: [
          "Başlangıç miktarları, tepkimede tüketilenler ve kalanlar ayrı satırlarda tutulur. 0,20 mol HCl ile 0,15 mol NaOH için tepkime sınırlayıcı NaOH tükenene kadar sürerse 0,15 mol HCl tüketilir ve 0,05 mol asit artar. Başlangıçta ürün yoksa oluşan ürün son miktarı verir.",
          "Başlangıçta ürün de varsa oluşan ürün miktarı bu başlangıç miktarına eklenir. Tepkime tablosunda ürünün başlangıç, oluşan ve son miktarlarını ayrı hücrelerde göster; atom korunumu ile sonucu denetle. Artan reaktif, oluşan tuz ve yeni suyu aynı şey sayma; farklı varlıklardır.",
        ],
      },
      {
        title: "Eşdeğerlik her tuzda pH 7 değildir",
        paragraphs: [
          "Güçlü HCl ile güçlü NaOH’nin 25 °C’de ideal seyreltik sulu karışımında asit ve baz eşdeğerleri eşit olduğunda belirgin asit ya da baz fazlası kalmaz. Na⁺ ve Cl⁻ bu modelde pH’ı değiştirmediğinden son pH yaklaşık 7 olur.",
          "Bu sonuç bütün asit-baz çiftleri için evrensel değildir. Zayıf asit veya bazdan gelen tuz iyonları suyla etkileşerek eşdeğerlikte asidik ya da bazik çözelti oluşturabilir. Eşdeğer miktar ile nötr pH kavramlarını koşulsuz özdeşleştirme.",
        ],
      },
      {
        title: "Artanı son hacme böl",
        paragraphs: [
          "Asit ya da baz fazla kaldığında ideal güçlü çift için kalan mol, karışımın son hacmine bölünür. Modelde hacimlerin toplandığı açık varsayılmıştır; bu bir öğretim verisidir, her gerçek karışımda hacimlerin tam toplandığı iddiası değildir.",
          "25 mL 0,20 mol/L HCl ile 25 mL 0,10 mol/L NaOH karıştırılırsa 0,0025 mol asit artar. Toplam 0,050 L’de bu 0,050 mol/L net güçlü asit derişimidir; pH yaklaşık 1,301 olur. Tek başlangıç hacmini payda yapmak yanlış sonuç verir.",
        ],
      },
      {
        title: "Ters hesapta hedefe dön",
        paragraphs: [
          "Nötrleşme için gereken baz hacmi sorulursa önce asidin molünü, sonra denklem oranından bazın gereken molünü bul. Son adımda V = n/c ile hacme geç. Bu sıra farklı derişimleri ve çok eşdeğerli türleri bir arada güvenilir biçimde işler.",
          "25 mL 0,20 mol/L HCl için 0,0050 mol NaOH gerekir. Baz 0,10 mol/L ise hacim 0,050 L yani 50 mL olur. Hacimleri doğrudan eşitlemek, ancak uygun molarite ve eşdeğer koşulları zaten sağlanmışsa doğru olabilir.",
        ],
      },
      {
        title: "Su oluşmadan da asit-baz olabilir",
        paragraphs: [
          "NH₃(g) + HCl(g) → NH₄Cl(k) örneği, su oluşmadan asit-baz tepkimesi olabileceğini gösterir. NH₃ proton alır; HCl proton verir. Bu gaz/katı örneğine sulu çözeltinin pH formülünü doğrudan uygulayamayız.",
          "Sulu zayıf baz ve asit etkileşiminde de her olayın net denkleminde mutlaka OH⁻ giren ve H₂O ürün olmak zorunda değildir. Tanımı ezberlenen bir ürün listesine indirgemek yerine proton aktarımını ve verilen ortamı birlikte izle.",
        ],
      },
      {
        title: "Karbonatta çıkan gaz CO₂",
        paragraphs: [
          "CaCO₃ + 2HCl → CaCl₂ + CO₂ + H₂O denkleminde karbonat, asitle tepkimeye girerek CO₂ oluşturur. 1 mol CaCO₃ için 2 mol HCl tüketilir ve 1 mol CO₂ açığa çıkar; bu gaz H₂ değildir.",
          "Örneğin 0,05 mol CaCO₃ tamamen tepkimeye girerse 0,10 mol HCl gerekir ve 0,05 mol CO₂ oluşur. Gaz hacmi istenirse sıcaklık ve basınç koşulları da gerekir. Molü otomatik 22,4 L ile çarpma; uygun ideal gaz ve NK koşulları açık verilmelidir.",
        ],
      },
      {
        title: "Metal tepkimesinin koşulunu oku",
        paragraphs: [
          "Uygun aktif metal ile oksitleyici olmayan uygun asit koşulunda H₂ oluşabilir; Mg + 2HCl → MgCl₂ + H₂ böyle bir örnektir. Her metalin her asitle aynı gazı verdiğini söylemek ise yanlıştır.",
          "Oksitleyici asitlerin derişimi, metalin pasifleşmesi ve suyla olası tepkimesi ürünleri değiştirebilir. Verilen bir tepkimede gazın kimliğini denklem ve koşullardan çıkar. Basit metal listelerini bütün sıcaklık ve çözeltilere geçerli mutlak kural gibi kullanma.",
        ],
      },
      {
        title: "Günlük örneği doğru sınırla",
        paragraphs: [
          "Asitlerin kireç taşıyla tepkimesi, mineral yüzeylerinde değişimi ve uygun nötrleşme uygulamaları aynı kavramları farklı bağlamda gösterir. Ancak gerçek temizlik kimyasallarını karıştırmak bir öğrenme görevi değildir; uygulamada yalnız güvenli temsili veriler kullanılır.",
          "Soruyu çözerken son kez dört kontrol yap: atom ve yük korunuyor mu, eşdeğer oranı uygun mu, artan tür doğru mu, son hacim ve sıcaklık verilmiş mi? Bir sonuç sayısı bu koşullarla birlikte anlamlıdır; eksik koşul varsa kesin çıkarım yerine hangi bilgiye ihtiyaç olduğunu belirt.",
        ],
      },
    ],
    examples: [
      {
        title: "Artan asit",
        prompt:
          "0,20 mol HCl ve 0,15 mol NaOH suda HCl + NaOH → NaCl + H₂O denklemine göre, sınırlayıcı madde tükenene kadar tepkimeye giriyor. Hangi reaktif ne kadar artar?",
        strategy: "1: 1 oranını başlangıç miktarlarına uygula.",
        steps: [
          {
            label: "1. adım",
            explanation: "0,15 mol NaOH en çok 0,15 mol HCl tüketir.",
          },
          {
            label: "2. adım",
            explanation:
              "Asit fazlası 0,20 − 0,15 = 0,05 mol; NaOH tamamen tükenir.",
          },
          {
            label: "3. adım",
            explanation:
              "Yeni su ve verilen denklemde oluşan tuz miktarı 0,15’er moldür; artan asit ayrı envanterdir.",
          },
        ],
        answer: "0,05 mol HCl artar",
        check: "Tüketilen asit + kalan asit = 0,15 + 0,05 = 0,20 mol.",
        pitfall: "Son pH sayısı için ayrıca son hacim ve uygun model gerekir.",
      },
      {
        title: "Gereken baz hacmi",
        prompt:
          "25 mL 0,20 mol/L HCl, 0,10 mol/L NaOH ile tam nötrleştiriliyor. Güçlü çift ve 1: 1 denklem kabulüyle gereken baz hacmi nedir?",
        strategy: "mL → L, mol → oran, sonra hacim sırasını kullan.",
        steps: [
          {
            label: "1. adım",
            explanation: "Asit miktarı 0,20 × 0,025 = 0,0050 mol.",
          },
          {
            label: "2. adım",
            explanation: "NaOH için gereken miktar 1: 1 oranıyla 0,0050 mol.",
          },
          {
            label: "3. adım",
            explanation: "V = 0,0050/0,10 = 0,050 L = 50 mL NaOH.",
          },
        ],
        answer: "50 mL NaOH",
        check: "0,10 mol/L × 0,050 L = 0,0050 mol baz.",
        pitfall:
          "25 mL asit var diye 25 mL bazın her durumda yeteceğini düşünme.",
      },
      {
        title: "İki protonun tam nötrleşmesi",
        prompt:
          "0,040 mol H₂SO₄ ile 0,100 mol KOH için H₂SO₄ + 2KOH → K₂SO₄ + 2H₂O tam nötrleşme denklemi verilmiştir. Tepkime sınırlayıcı madde tükenene kadar sürüyor. Hangi reaktif artar?",
        strategy: "Verilen tam nötrleşme denklemindeki iki katsayısını kullan.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "0,040 mol H₂SO₄ için gereken KOH 2 × 0,040 = 0,080 mol.",
          },
          {
            label: "2. adım",
            explanation: "0,100 mol KOH bulunduğundan asit tamamen tüketilir.",
          },
          {
            label: "3. adım",
            explanation: "Artan KOH 0,100 − 0,080 = 0,020 mol.",
          },
        ],
        answer: "0,020 mol KOH artar",
        check: "Gereken 0,080 + artan 0,020 = başlangıç 0,100 mol.",
        pitfall:
          "Bu toplam ihtiyaç hesabını başlangıçtaki bütün protonların aynı anda tam serbest olmasıyla karıştırma.",
      },
      {
        title: "Karbonatın gazı",
        prompt:
          "0,050 mol CaCO₃, yeterli HCl ile CaCO₃ + 2HCl → CaCl₂ + CO₂ + H₂O denklemine göre tamamen tepkimeye giriyor. HCl ihtiyacı ve CO₂ miktarı nedir?",
        strategy: "Katsayıları ayrı ayrı CaCO₃ molüne uygula.",
        steps: [
          {
            label: "1. adım",
            explanation:
              "1 mol CaCO₃ için 2 mol HCl gerekir; ihtiyaç 2 × 0,050 = 0,100 mol.",
          },
          {
            label: "2. adım",
            explanation:
              "1 mol CaCO₃ için 1 mol CO₂ oluşur; ürün 0,050 mol CO₂.",
          },
          {
            label: "3. adım",
            explanation:
              "Gaz karbon dioksittir; hacim için sıcaklık ve basınç verilmediğinden kesin litre değeri yazılmaz.",
          },
        ],
        answer: "0,100 mol HCl ve 0,050 mol CO₂",
        check: "Karbon sayısı CaCO₃ ve CO₂ arasında 1: 1 korunur.",
        pitfall: "Bütün asit tepkimelerinde H₂ çıkar sanma.",
      },
    ],
    recall: [
      {
        prompt: "Net iyon denkleminde silinen Na⁺ ve Cl⁻ yok olur mu?",
        answer:
          "Hayır; bu tepkimede seyirci oldukları için net değişim denkleminde yer almazlar, çözeltide kalabilirler.",
      },
      {
        prompt: "Eşit hacim neden her zaman yetmez?",
        answer:
          "Derişimler ve verilen eşdeğer oranları farklı olabilir; önce mol ve tepkime oranı hesaplanır.",
      },
      {
        prompt: "Eşdeğerlikte her zaman pH 7 mi?",
        answer:
          "Hayır; güçlü çift ve 25 °C gibi koşullar ile tuz iyonlarının suyla etkileşimi değerlendirilir.",
      },
      {
        prompt: "Asit-karbonat örneğinde gazın kimliği nedir?",
        answer:
          "Verilen CaCO₃/HCl denkleminde CO₂; uygun aktif metal/HCl örneğindeki H₂ ile aynı değildir.",
      },
    ],
    items: [
      [
        "H₃O⁺(suda) + OH⁻(suda) → 2H₂O(sıvı) denklemine ilişkin hangisi doğrudur?",
        "Toplam yük ve H/O atom sayıları iki tarafta korunur.",
        [
          "Solda toplam yük +2’dir.",
          "Oksijen atomları yok olur.",
          "Sağda zorunlu olarak H₂ gazı oluşur.",
          "Denklem çözeltide daha önce hiç su bulunmadığını söyler.",
        ],
        "Soldaki +1 ve −1 yükleri birlikte say.",
        "Solda toplam yük 0, hidrojen 4, oksijen 2; sağda da aynı sayılar vardır. Çözücü suyun varlığı yeni su oluşumunu dışlamaz.",
      ],
      [
        "HCl(aq) + NaOH(aq) tepkimesinde Na⁺ ve Cl⁻ iyonları tam iyon denkleminin iki tarafında da bulunuyor. Net denklemi yazarken çıkarılmaları ne demektir?",
        "Bu net değişimde seyircidirler; çözeltide varlıkları sürebilir.",
        [
          "Bu elementler evrenden yok olur.",
          "İyonlar mutlaka gazdır.",
          "NaCl kesinlikle çöker.",
          "Suyun bütün molekülleri iyonlaşır.",
        ],
        "Net değişim ile toplam envanteri ayır.",
        "İki tarafta aynı kalan türler net denkleme yazılmaz. Bu, çözünmüş seyirci iyonların fiziksel olarak ortamdan silindiği anlamına gelmez.",
      ],
      [
        "25 mL, 0,20 mol/L HCl çözeltisi kaç mol HCl içerir?",
        "0,0050 mol",
        ["5 mol", "0,050 mol", "0,20 mol", "0,00020 mol"],
        "25 mL = 0,025 L.",
        "n = cV = 0,20 × 0,025 = 0,0050 mol. Molarite litre başına verildiği için mL doğrudan kullanılamaz.",
      ],
      [
        "0,20 mol HCl ile 0,15 mol NaOH için HCl + NaOH → NaCl + H₂O denklemi verilmiştir. Tepkime sınırlayıcı madde tükenene kadar sürüyor. Hangisi artar?",
        "0,05 mol HCl",
        [
          "0,05 mol NaOH",
          "0,15 mol HCl",
          "0,20 mol NaOH",
          "İkisi de aynı anda tamamen tükenir.",
        ],
        "Oran 1:1, küçük mol miktarı 0,15.",
        "0,15 mol NaOH aynı miktarda HCl tüketir; HCl’den 0,20 − 0,15 = 0,05 mol kalır. Son hacim olmadan bu miktardan doğrudan kesin pH çıkarılmaz.",
      ],
      [
        "25 mL 0,20 mol/L HCl’yi, HCl + NaOH → NaCl + H₂O denklemine göre tam nötrleştirmek için 0,10 mol/L NaOH’den kaç mL gerekir?",
        "50 mL",
        ["12,5 mL", "25 mL", "100 mL", "200 mL"],
        "Asit 0,0050 mol; gereken baz da bu kadar.",
        "V = n/c = 0,0050/0,10 = 0,050 L = 50 mL. Asit ve baz hacimleri molariteler farklı olduğundan eşit değildir.",
      ],
      [
        "Verilen tam nötrleşme denklemi H₂SO₄ + 2KOH → K₂SO₄ + 2H₂O. 0,040 mol H₂SO₄ ile 0,100 mol KOH için tepkime sınırlayıcı madde tükenene kadar sürerse hangisi artar?",
        "0,020 mol KOH",
        [
          "0,060 mol KOH",
          "0,020 mol H₂SO₄",
          "0,040 mol H₂SO₄",
          "İki giren de tamamen tükenir.",
        ],
        "Asit için gereken baz 0,080 moldür.",
        "İki katsayısı nedeniyle 0,040 × 2 = 0,080 mol KOH tüketilir. 0,100 − 0,080 = 0,020 mol KOH kalır; başlangıç protonlarının ayrışma dengesi ayrı konudur.",
      ],
      [
        "25 °C’de ideal sulu güçlü HCl/NaOH karışımı inceleniyor. Hacimler toplanabilir kabul ediliyor. 25 mL 0,20 mol/L HCl ile 25 mL 0,10 mol/L NaOH sonrası net fazla güçlü asit derişimi nedir?",
        "0,050 mol/L",
        ["0,0025 mol/L", "0,10 mol/L", "0,15 mol/L", "0,30 mol/L"],
        "Fazla 0,0025 mol asidi toplam 0,050 L’ye böl.",
        "İlk mol miktarları 0,0050 ve 0,0025; asit fazlası 0,0025 moldür. Son hacim 0,050 L olduğundan net fazla derişim 0,050 mol/L olur. Suyun çok küçük katkısı bu net farktan ayrıca ayrıdır.",
      ],
      [
        "CH₃COOH + NaOH → CH₃COONa + H₂O toplam denklemi verilmiştir. Zayıf asit ile güçlü baz eşdeğer miktarlarda tepkimeye giriyor; oluşan asetat iyonunun suyla etkileşerek OH⁻ oluşumunu artırdığı belirtiliyor. Hangisi kesin olarak söylenemez?",
        "Son pH mutlaka 7’dir.",
        [
          "Tepkime oranı verilen denklemden hesaplanabilir.",
          "Tuz iyonu son çözeltiyi etkileyebilir.",
          "Eşdeğerlik ile nötr pH aynı tanım değildir.",
          "Son pH için uygun denge ve sıcaklık bilgisi gerekebilir.",
        ],
        "Eşdeğerliği güçlü çift örneğiyle koşulsuz özdeşleştirme.",
        "Zayıf asitten gelen anyon suyla etkileşerek bazik etki yapabilir. Eşdeğer miktar her tür tuz için pH 7 garantisi değildir.",
      ],
      [
        "0,050 mol CaCO₃, yeterli HCl ile CaCO₃ + 2HCl → CaCl₂ + CO₂ + H₂O denklemine göre tamamen tepkimeye giriyor. Doğru ürün miktarı hangisidir?",
        "0,050 mol CO₂",
        ["0,050 mol H₂", "0,100 mol CO₂", "0,025 mol CO₂", "0,100 mol O₂"],
        "CaCO₃ ve CO₂ katsayıları 1:1.",
        "Bir karbonat bir karbon dioksit oluşturur; ürün 0,050 mol CO₂’dir. Gaz H₂ değildir ve koşul verilmeden kesin gaz hacmi yazılmaz.",
      ],
      [
        "NH₃(g) + HCl(g) → NH₄Cl(k) denklemi, NH₃’ün proton aldığı belirtilerek verilmiştir. Hangi çıkarım doğrudur?",
        "Su oluşmadan da asit-baz tepkimesi olabilir.",
        [
          "Her asit-baz tepkimesinde ürün olarak su zorunludur.",
          "Bu denklemde mutlaka CO₂ gazı oluşur.",
          "Katı ürüne sulu çözeltinin pH formülü doğrudan uygulanır.",
          "H ve Cl atomları korunmaz.",
        ],
        "Verilen proton aktarımını ürün listesiyle karıştırma.",
        "HCl proton verir, NH₃ alır ve NH₄Cl oluşur. Su ürünü bulunmaması bu olayın asit-baz niteliğini ortadan kaldırmaz.",
      ],
    ],
    source:
      "Aurelia TYT Kimya 050 PDF 1–7; MEBİ TYT Kimya Konu Özetleri fiziksel PDF 83–86; OGM 10. Sınıf  Asitler ve Bazlar ilgili fasikül PDF 16–18,22,25 karşılaştırıldı. Yanlış ürün başlangıç/son tablo gösterimi taşınmadı; güçlü çift,25°C ve tam nötrleşme koşulları ayrıldı. Anlatım ve alıştırmalar özgündür; resmî sınav sorusu değildir.",
  },
];

export const forge016ChemistryGuides: LessonGuide[] = unitData.map(
  ({ items, title, topic, ...guide }) => guide,
);
export const forge016ChemistryTopics: Record<string, string> =
  Object.fromEntries(unitData.map((u) => [u.id, u.topic]));
export const forge016ChemistryLessons: Lesson[] = unitData.map((u) => ({
  id: u.id,
  subjectId: "tyt-kimya",
  title: txt(u.title),
  minutes: u.minutes,
  objectives: u.objectives.map(txt),
  body: u.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: u.items.map(
    ([prompt, correct, wrong, hint, explanation], i): Question => {
      const answer = i % 5,
        options = [...wrong];
      options.splice(answer, 0, correct);
      return {
        id: `f016-chem-${u.id}-${i + 1}`,
        prompt: txt(prompt),
        options: options.map(txt),
        answer,
        hint: txt(hint),
        explanation: txt(explanation),
        skill: u.id,
      };
    },
  ),
  source: txt(u.source),
  tags: [u.id, "kaynakli-anlatim"],
}));
