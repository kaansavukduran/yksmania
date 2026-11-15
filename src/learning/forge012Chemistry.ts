import { txt, type Lesson, type Question } from "../domain/model";
import type { LessonGuide } from "./guides/types";

export const waterVapourTable = [
  { temperature: 0, pressure: 4.6 },
  { temperature: 10, pressure: 9.2 },
  { temperature: 25, pressure: 23.8 },
  { temperature: 50, pressure: 92.5 },
  { temperature: 70, pressure: 233.7 },
  { temperature: 100, pressure: 760 },
] as const;
const bounded = (x: number, min: number, max: number) =>
  Number.isFinite(x) ? Math.max(min, Math.min(max, x)) : min;
export const solidSamples = [
  {
    id: "salt",
    name: "NaCl",
    kind: "İyonik kristal",
    particle: "Na⁺ ve Cl⁻ iyonları",
    bond: "İyonik örgü",
    conductor: "Katı hâlde düşük; eriyikte hareketli iyonlarla",
    regular: true,
  },
  {
    id: "diamond",
    name: "Elmas",
    kind: "Kovalent ağ",
    particle: "Geniş ağda C atomları",
    bond: "Kovalent ağ",
    conductor: "Olağan koşullarda iyi iletmez",
    regular: true,
  },
  {
    id: "graphite",
    name: "Grafit",
    kind: "Kovalent ağ",
    particle: "Tabakalı C atom ağı",
    bond: "Tabaka içinde kovalent; tabakalar arası daha zayıf",
    conductor: "Elektron katkısıyla iletir",
    regular: true,
  },
  {
    id: "ice",
    name: "Buz",
    kind: "Moleküler kristal",
    particle: "H₂O molekülleri",
    bond: "Moleküller arası hidrojen bağları",
    conductor: "Saf hâlde düşük iletkenlik",
    regular: true,
  },
  {
    id: "copper",
    name: "Bakır",
    kind: "Metalik kristal",
    particle: "Metal merkezleri ve yayılmış elektronlar",
    bond: "Metalik bağ",
    conductor: "Elektronlarla iletir",
    regular: true,
  },
  {
    id: "glass",
    name: "Cam",
    kind: "Amorf yapı",
    particle: "Uzun mesafe periyodik düzeni olmayan ağ",
    bond: "Bileşime bağlı ağ yapısı",
    conductor: "Olağan örnekte düşük iletkenlik",
    regular: false,
  },
] as const;
export function flowExperiment(
  sample: string,
  temperature: number,
  elapsed: number,
) {
  const t = [20, 40, 60].includes(temperature) ? temperature : 20;
  const finish = ((sample === "y" ? 30 : 90) * 20) / t;
  const progress = bounded(elapsed, 0, 120) / finish;
  return {
    finish,
    volume: 20 * Math.min(1, progress),
    fraction: Math.min(1, progress),
    rate: 20 / finish,
    temperature: t,
  };
}
export function sealedVapour(
  index: number,
  totalGrams: number,
  gasLitres: number,
) {
  const datum = waterVapourTable[Math.round(bounded(index, 0, 5))];
  const mass = bounded(totalGrams, 0.001, 10),
    volume = bounded(gasLitres, 0.1, 10);
  const required =
    (((datum.pressure / 760) * volume) /
      (0.082057 * (datum.temperature + 273.15))) *
    18;
  const vapour = Math.min(mass, required),
    liquid = Math.max(0, mass - vapour);
  const pressure =
    (((vapour / 18) * 0.082057 * (datum.temperature + 273.15)) / volume) * 760;
  return {
    ...datum,
    saturation: datum.pressure,
    pressure,
    vapour,
    liquid,
    total: mass,
    required,
    saturated: mass >= required,
    hasLiquid: liquid > 0,
    volume,
  };
}
export function humidityState(index: number, initialPressure: number) {
  const datum = waterVapourTable[Math.round(bounded(index, 0, 5))];
  const initial = bounded(initialPressure, 0, 1000),
    pressure = Math.min(initial, datum.pressure);
  return {
    temperature: datum.temperature,
    saturation: datum.pressure,
    initial,
    initialRelative: (100 * initial) / datum.pressure,
    pressure,
    relative: (100 * pressure) / datum.pressure,
    condenses: initial > datum.pressure,
  };
}
export function gasPressure(moles: number, kelvin: number, litres: number) {
  if (
    ![moles, kelvin, litres].every(Number.isFinite) ||
    moles <= 0 ||
    kelvin <= 0 ||
    litres <= 0
  )
    throw new RangeError("IDEAL_GAS_SCOPE");
  return (moles * 0.082057 * kelvin) / litres;
}
export function ionisation(atoms: number, ionised: number) {
  const total = Math.round(bounded(atoms, 1, 24)),
    ions = Math.round(bounded(ionised, 0, total));
  return {
    total,
    ions,
    electrons: ions,
    neutral: total - ions,
    charge: ions - ions,
  };
}
export const treatmentInitial = {
  suspended: 100,
  organic: 40,
  hardness: 2000,
  microbes: 10000,
};
export function treatmentState(
  filter: boolean,
  carbon: boolean,
  exchange: boolean,
  disinfect: boolean,
) {
  return {
    suspended: treatmentInitial.suspended * (filter ? 0.1 : 1),
    organic: treatmentInitial.organic * (carbon ? 0.25 : 1),
    hardness: treatmentInitial.hardness * (exchange ? 0.1 : 1),
    microbes: treatmentInitial.microbes * (disinfect ? 0.01 : 1),
  };
}

const unitData = [
  {
    id: "katilar-viskozite",
    title: "Katılar ve viskozite: yapıdan akışa",
    topic: "detail-162",
    minutes: 65,
    objectives: [
      "Kristal türünü yapıtaşı ve baskın bağlanmayla ayır; amorf yapıyı dış görünüşten teşhis etme.",
      "Elektrik iletkenliğini faz ve hareketli yük taşıyıcısıyla açıkla.",
      "Kontrollü akış deneyinde süre, sıcaklık ve viskozite ilişkisini veriden çıkar.",
    ],
    sections: [
      {
        title: "Görünen cisim ile tanecik düzeni",
        paragraphs: [
          "Bir tuz küpünün düzgün görünmesi ile içindeki iyonların düzenli dizilmesi aynı düzeyde bilgi değildir. Katılar makroskobik olarak şekil ve hacimlerini korur; tanecikler konumları çevresinde titreşir. Olağan koşullarda katının bütün olarak akmaması, taneciklerinin tamamen hareketsiz olduğu anlamına gelmez. Katı sözcüğü tek bir bağ türü veya tek bir yapıtaşı belirtmez.",
          "Kristal yapıda uzun mesafede tekrarlanan bir düzen bulunur. Amorf yapıda böyle bir uzun mesafe düzeni yoktur. Kırılmış bir kristalin dışı düzensiz görünebilir; amorf cam düzenli bir kalıba dökülebilir. Bu nedenle yalnız fotoğraftaki şekle bakarak mikroskobik düzeni kesinleştirme. Aynı maddenin farklı kristal biçimleri veya farklı yapı düzenleri de bulunabilir.",
        ],
      },
      {
        title: "İyonik kristal: ayrı molekül yerine örgü",
        paragraphs: [
          "NaCl kristalinde yapıtaşları Na⁺ ve Cl⁻ iyonlarıdır; zıt yüklerin elektrostatik çekimi üç boyutlu örgüyü bir arada tutar. NaCl formülü en basit yük dengeli oranı verir, kristaldeki bağımsız NaCl moleküllerinin sayısını göstermez. Bu ayrım toplam atom, iyon ve molekül sayımı sorularının ilk adımıdır.",
          "Katı iyonik maddede iyonlar olağan koşullarda örgü boyunca serbestçe göç edemediği için elektrik iletimi çok düşüktür. Erimiş hâlde hareketli iyonlar yük taşıyabilir. Suda çözünürse çözeltide de iyonlarla iletim olabilir; her iyonik tuzun suda iyi çözüneceğini varsayma. Kırılganlık, kaydırılan katmanlarda aynı yüklerin karşı karşıya gelmesiyle açıklanır.",
        ],
      },
      {
        title: "Kovalent ağ ile moleküler kristal",
        paragraphs: [
          "Elmasta karbon atomları geniş bir kovalent ağ oluşturur. Kristali eritmek veya yapısını bozmak, yalnız ayrı moleküllerin arasını açmak değildir. Kuartz da ağ yapısına örnektir. Grafit ise tabakalı kovalent yapı taşır; tabakaların kolay kayması yumuşaklığına, hareketli elektron katkısı iletkenliğine yardım eder. Bu karşı örnek, kovalent katıların tamamı yalıtkan ve çok serttir ezberini engeller.",
          "Buz, kuru buz ve iyot kristalinde yapıtaşı moleküllerdir. Her molekülün içinde kovalent bağ bulunması, moleküller arası tutunmayı kovalent ağ yapmaz. Buz erirken H₂O molekülleri korunur; moleküller arası düzen değişir. Moleküler katıların erime noktaları genellikle ağ katılardan düşüktür; farklı aileleri yalnız tek bağ etiketiyle kesin sıralama.",
        ],
      },
      {
        title: "Metalik kristal ve hareketli elektron",
        paragraphs: [
          "Bakır, demir veya gümüşte metal merkezleri ile yayılmış değerlik elektronları birlikte metalik yapı oluşturur. Elektronların hareket olanağı elektrik ve ısı iletimini açıklar; bütün metal atomlarının telin bir ucundan öbürüne gitmesi gerekmez. Katmanlar kayarken bağlanmanın sürmesi tel ve levha yapılabilmeye katkı verir.",
          "Metallerin hepsi aynı sertlikte veya aynı erime sıcaklığında değildir. Oda koşullarında katı metal örnekleriyle kurulan açıklamayı cıvanın sıvı olmasıyla karıştırma. İletkenlik tek başına metal kanıtı da değildir: grafit ve iyon içeren çözeltiler farklı taşıyıcılarla iletebilir. Önce bileşim, sonra faz, sonra taşıyıcı sırasını izle.",
        ],
      },
      {
        title: "Amorf yapı ve erimeyi yorumlama",
        paragraphs: [
          "Cam ve birçok kauçuk/plastik örneği amorf yapı gösterebilir; bütün polimerlerin tamamen amorf olduğunu söylemek doğru değildir. Bazı polimerlerde kristal ve amorf bölgeler birlikte bulunur. Saf, iyi tanımlı kristaller sabit basınç altında belirli bir erime sıcaklığıyla incelenirken amorf malzemeler bir sıcaklık aralığında yumuşama gösterir.",
          "Sabit sıcaklıkta erime yorumu saf madde ve uygun denge koşuluna bağlıdır. Karışım, safsızlık ve hızlı ısıtma gözlenen aralığı değiştirebilir. Bir deneyde geniş aralık görmek tek başına bütün kimyasal bileşimi vermez. Kaynaklardaki genel tabloları ilk karşılaştırma aracı olarak kullan; grafit ve polimer gibi verilen özel örnekleri ayrıca değerlendir.",
        ],
      },
      {
        title: "Sıvı: şekil değişir, hacim yaklaşık korunur",
        paragraphs: [
          "Sıvı tanecikleri birbirlerine yakın kalırken yer değiştirebilir; sıvı bu nedenle bulunduğu kabın şeklini alır ve akabilir. Günlük basınç değişimlerinde hacmi gazlara göre çok az değiştiği için yaklaşık sıkıştırılamaz kabul edilir. Bu, sıvıların hiçbir basınçta hiçbir miktarda sıkışmadığı anlamına gelmez.",
          "Sıvılar genellikle gazlardan daha yoğun, kendi katılarından daha az yoğundur. Su önemli karşı örnektir: buzun yoğunluğu sıvı sudan küçüktür. Bir maddenin her koşulda en yoğun hâli katıdır sonucunu kullanma. Sıvı içinde titreşim ve öteleme hareketleri sürer; faz değişimi olmadıkça tanecik kimliği korunur.",
        ],
      },
      {
        title: "Viskoziteyi kontrollü deneyle gör",
        paragraphs: [
          "Viskozite akmaya karşı iç dirençtir. Aynı düzenekte yüksek viskoziteli sıvı, aynı hacmi geçirmek için daha uzun süre gerektirebilir. Balın yavaş, suyun hızlı akması sezgi verir; bilimsel kıyas için sıcaklık, boru çapı, basınç farkı ve geçirilen hacim eşit olmalıdır. Farklı kaplardaki iki fotoğraf tek başına ölçüm değildir.",
          "Bu atölyede X ve Y sıvılarının eşit 20 mL örnekleri için verilmiş kurmaca deney süreleri kullanılır. Aynı sıcaklıkta X daha yavaş akar. Sıcaklık yükseltildiğinde her iki örneğin ölçülmüş geçiş süresi kısalır. Sabit ortalama debi yaklaşımı yalnız çizimdeki ilerlemeyi hesaplamak içindir; gerçek her akışın hızı zamanla sabittir iddiası yoktur.",
        ],
      },
      {
        title: "Sıcaklık ve yapı: tek değişkenli kıyas",
        paragraphs: [
          "Birçok sıvıda sıcaklık arttıkça viskozite azalır. Isıtma sırasında sıvı taneciklerinin birbirini geçebilmesi kolaylaşır; molekül içi kovalent bağların kopması gerekmez. Etkileşim kuvveti, molekül şekli ve zincir uzunluğu da viskoziteye katkı verir. Birden çok özellik değişiyorsa yalnız mol kütlesiyle kesin sıralama yapma.",
          "Akıcılık viskoziteyle ters yönde değişir; yüksek viskozite yüksek akıcılık demek değildir. Günlük ürünlerin sıcaklık, bileşim ve kayma koşullarına duyarlı olduğunu unutma. Boya veya motor yağında tek bir evrensel en iyi viskozite bulunmaz; kullanım koşulları belirler. TYT sorusunda verilen deney ve sabit değişkenlere dayanmak, ürün adı ezberinden daha güvenlidir.",
        ],
      },
      {
        title: "Soruyu çöz: tanecik → bağ → faz → gözlem",
        paragraphs: [
          "Katı türü sorusunda önce yapıtaşını yaz: iyon, atom ağı, molekül veya metal merkezi. Sonra baskın tutunmayı ve verilen elektrik/erime özelliğini ekle. Molekül içinde kovalent bağ var diye bütün kristali kovalent ağ sınıfına koyma. İletkenlik sorusunda eriyik ile sulu çözeltinin koşullarını ayrı oku.",
          "Akış sorusunda önce ölçülenin süre mi, hacim mi, debi mi olduğunu belirle. Eşit hacim için ortalama debi V/t olur; süre azalınca debi artar. Ancak boru veya basınç değişmişse sonucun yalnız viskoziteden kaynaklandığını söyleyemezsin. Son adımda ilk varsayımı denetlemek yanlış ama hızlı bir orantıyı yakalar.",
        ],
      },
    ],
    examples: [
      {
        title: "Faz değişince taşıyıcı",
        prompt:
          "Katı ve erimiş NaCl ile katı bakırın elektrik iletimini karşılaştır.",
        strategy: "Önce fazı ve hareket edebilen yüklü taneciği yaz.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Katı NaCl iyonik örgüdür; iyonlar olağan koşullarda yerlerine bağlıdır.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Erimiş NaCl’de Na⁺ ve Cl⁻ hareket ederek yük taşır; bakırda yayılmış elektronlar hareketlidir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Aynı iletim gözlemi farklı mekanizmalarla oluşur; eriyik NaCl metal değildir.",
          },
        ],
        answer:
          "Katı NaCl düşük iletken; eriyiği iyonlarla, bakır elektronlarla iletir.",
        check:
          "Bileşik kimliği erime sırasında Na metali ve Cl₂ gazına dönüşmez.",
        pitfall: "İletiyorsa mutlaka metaldir deme.",
      },
      {
        title: "İki karbon örneği",
        prompt:
          "Elmas ve grafit karbon içeriyor. Grafitin iletken ve yumuşak olması onu moleküler katı yapar mı?",
        strategy: "Element bileşimini bağlanma düzeninden ayır.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Her ikisinin atomları kovalent bağlarla geniş yapılar oluşturur.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Grafitte tabakalar arasındaki kayma ve elektron hareketi elmasa göre farklıdır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Yumuşaklık veya iletkenlik tek başına moleküler yapı kanıtı değildir.",
          },
        ],
        answer: "Hayır; grafit tabakalı kovalent ağ yapısıdır.",
        check:
          "CO₂ kristalindeki ayrı moleküller ile grafitin karbon ağı farklıdır.",
        pitfall: "Grafitteki özel durumu bütün kovalent katılara yayma.",
      },
      {
        title: "Eşit hacimde akış",
        prompt:
          "Aynı borudan eşit koşullarda 20 mL X sıvısı 80 s, Y sıvısı 20 s içinde geçiyor. Ortalama debileri ve kıyası bul.",
        strategy: "Eşit hacim için V/t oranını ayrı hesapla.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Qₓ=20/80=0,25 mL/s bulunur.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "Qᵧ=20/20=1 mL/s bulunur.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Y’nin ortalama debisi X’in dört katıdır; verilen kontrollü koşulda X daha yüksek akış direnci gösterir.",
          },
        ],
        answer: "0,25 ve 1 mL/s; Y dört kat daha hızlı ortalama akış gösterir.",
        check: "Q×t her iki deneyde de 20 mL vermelidir.",
        pitfall: "Süre oranını debi oranı diye aynı yönde kullanma.",
      },
      {
        title: "Sıcaklığı değiştirme",
        prompt:
          "Aynı sıvının 20 mL örneği aynı düzenekte 20 °C’de 90 s, 40 °C’de 45 s içinde geçiyor. Ne çıkar?",
        strategy: "Değiştirilen tek değişkeni ve ölçülen süreyi belirle.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Sıvı, hacim ve düzenek aynı; sıcaklık değişmiştir.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Ortalama debi 20/90’dan 20/45’e, yani iki katına çıkar.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Bu veride ısınma akış direncini azaltma eğilimiyle uyumludur; molekül kimliği değiştiği sonucu yoktur.",
          },
        ],
        answer: "Ortalama debi iki kat; veriler azalan viskoziteyle uyumlu.",
        check: "Yarı süre eşit hacim için iki kat debi verir.",
        pitfall:
          "Sıcaklığın Celsius cinsinden iki katı diye bütün özellikleri iki kat sayma.",
      },
    ],
    recall: [
      {
        prompt: "NaCl kristalinin yapıtaşı nedir?",
        answer: "Na⁺ ve Cl⁻ iyonları; formül en basit yük dengeli oranı verir.",
      },
      {
        prompt: "Buz neden kovalent ağ değil moleküler katı olarak incelenir?",
        answer:
          "Ayrı H₂O molekülleri korunur; aralarındaki tutunma kristali oluşturur.",
      },
      {
        prompt: "Viskozite ile akıcılık nasıl değişir?",
        answer:
          "Diğer koşullar aynıyken yüksek viskozite daha düşük akıcılıkla ilişkilidir.",
      },
      {
        prompt: "Katılar her zaman kendi sıvısından yoğun mudur?",
        answer:
          "Hayır; buzun sıvı sudan daha düşük yoğunluğu önemli karşı örnektir.",
      },
    ],
    items: [
      [
        "NaCl katısındaki temel yapıtaşları hangileridir?",
        "Na⁺ ve Cl⁻ iyonları",
        [
          "Ayrı NaCl molekülleri",
          "Yalnız serbest elektronlar",
          "Yalnız nötr Cl atomları",
          "H₂O molekülleri",
        ],
        "Formül birimi ile molekülü ayır.",
        "İyonik örgü zıt yüklü iyonlardan oluşur. NaCl en basit yük dengeli oranı belirtir; bağımsız molekül sayımı değildir.",
      ],
      [
        "Saf buzun erimesinde hangi açıklama uygundur?",
        "H₂O molekülleri korunur; moleküller arası düzen değişir.",
        [
          "H₂ ve O₂ zorunlu oluşur.",
          "Tüm O–H bağları zorunlu kopar.",
          "Buz yalnız iyonlardan oluşur.",
          "Elektronlar tamamen yok olur.",
        ],
        "Fiziksel faz değişimini kimlik değişiminden ayır.",
        "Buz moleküler katıdır. Erime H₂O’nun kimliğini koruyan fiziksel geçiştir; moleküller arası düzen değişir.",
      ],
      [
        "Grafitin elektrik iletmesi hangi genellemeyi çürütür?",
        "Kovalent ağ yapılı bütün katılar yalıtkandır.",
        [
          "Bakır bir metaldir.",
          "NaCl iyonik yapılıdır.",
          "Buz moleküler kristaldir.",
          "Cam amorf olabilir.",
        ],
        "Grafitin sınıfını ve elektronlarını birlikte düşün.",
        "Grafit tabakalı kovalent ağ yapısına sahip olduğu hâlde hareketli elektron katkısıyla iletir. Verilen diğer ifadeler bu gözlemle çelişmez.",
      ],
      [
        "Camın düzgün bir küp biçiminde olması tek başına neyi kesinleştirmez?",
        "Taneciklerinin uzun mesafede kristal düzen göstermesini",
        [
          "Cismin dış yüzeyinin bulunmasını",
          "Gözlenen cismin bir hacminin olmasını",
          "Kalıplanmış olabilmesini",
          "Makroskobik şeklinin küp görünmesini",
        ],
        "Dış şekil ile iç düzeni ayır.",
        "Amorf cam düzgün bir kalıba dökülebilir. Dış geometrik biçim, mikroskobik uzun mesafe kristal düzeninin kanıtı değildir.",
      ],
      [
        "Aynı boru ve basınç farkında 30 mL X 60 s, 30 mL Y 20 s içinde geçiyor. Ortalama Qᵧ/Qₓ kaçtır?",
        "3",
        ["1/3", "1", "2", "60"],
        "Eşit hacimde debi süreye ters orantılıdır.",
        "Qₓ=30/60=0,5; Qᵧ=30/20=1,5 mL/s. Oran 1,5/0,5=3’tür. Hacimler eşit olduğu için süre oranını ters yönde kullanırız.",
      ],
      [
        "Aynı sıvı aynı düzenekte ısıtılıyor; fazı ve bileşimi korunuyor. Birçok sıvı için beklenen eğilim nedir?",
        "Viskozite azalırken akıcılık artar.",
        [
          "Viskozite ve akıcılık birlikte artar.",
          "Moleküllerin kimliği zorunlu değişir.",
          "Öteleme hareketi tamamen durur.",
          "Bütün kovalent bağlar kopar.",
        ],
        "Akış direnci ile akıcılık ters yöndedir.",
        "Birçok sıvının viskozitesi sıcaklık artışıyla azalır. Bu fiziksel davranış, sıvının kimyasal olarak parçalandığını veya molekül içi bağların koptuğunu göstermez.",
      ],
      [
        "Katı Cu ile erimiş NaCl’de başlıca yük taşıyıcıları sırasıyla hangileridir?",
        "Elektronlar; iyonlar",
        [
          "İyonlar; elektronlar",
          "Protonlar; nötronlar",
          "Nötronlar; iyonlar",
          "Yalnız bütün nötr moleküller; atom çekirdekleri",
        ],
        "Metal ve erimiş tuz farklı bağlanma modelleridir.",
        "Bakır metalinde hareketli elektronlar, NaCl eriyiğinde hareketli Na⁺ ve Cl⁻ iyonları akımı taşır. Aynı iletim özelliği aynı yapı demek değildir.",
      ],
      [
        "Su için olağan basınçta buzun yüzmesi neyi gösterir?",
        "Katı hâlin her maddede mutlaka en yoğun hâl olmadığını",
        [
          "Gazların hiçbir hacmi olmadığını",
          "Buzun H₂O içermediğini",
          "Tüm sıvıların daha yoğun olduğunu",
          "Kristallerin titreşmediğini",
        ],
        "Yüzen cismin yoğunluğunu sıvıyla karşılaştır.",
        "Buzun yoğunluğu sıvı sudan küçüktür. Bu örnek katılar her zaman kendi sıvılarından yoğundur genellemesini sınırlar; bütün maddeler için ters bir genelleme de kurulmaz.",
      ],
      [
        "Bir sıvı başka sıvıdan daha yavaş akıyor. Düzenek ve sıcaklıklar farklı. Hangi sonuç güvenlidir?",
        "Yalnız bu gözlemle viskoziteleri kesin sıralanamaz.",
        [
          "Yavaş akan kesin daha düşük viskozitelidir.",
          "Yavaş akan kesin kimyasal tepkime geçirmiştir.",
          "Sıcaklık asla etkili değildir.",
          "Borunun çapı hiçbir rol oynamaz.",
        ],
        "Kontrol edilmeyen değişkenleri ara.",
        "Akış hızı sıcaklık, basınç farkı ve boru boyutlarından da etkilenir. Kontrollü koşullar olmadan farkı yalnız viskoziteye bağlamak geçersizdir.",
      ],
      [
        "Elmas ile katı CO₂’nin yapı karşılaştırması hangisidir?",
        "Elmas kovalent ağ, katı CO₂ moleküler kristaldir.",
        [
          "İkisi de yalnız iyonik kristaldir.",
          "Elmas ayrı C₂ molekülleridir.",
          "Katı CO₂’de bağımsız moleküller yoktur.",
          "İkisi de metalik kristaldir.",
        ],
        "Molekül içindeki bağ ile kristali tutan etkileşimi ayır.",
        "Elmasta C atomları geniş kovalent ağ kurar. Katı CO₂’de ayrı CO₂ molekülleri vardır; molekül içi C=O bağlarının varlığı bütün kristali ağ yapmaz.",
      ],
    ],
    source:
      "MEBİ TYT Kimya Konu Özetleri, basılı s. 46–47/PDF 48–49 ile karşılaştırılan özgün öğretim ve kontrollü deney modelleri. Kurmaca deney verileri ayrıca belirtilir; resmî soru kopyası değildir.",
  },
  {
    id: "buharlasma-buhar-basinci",
    title: "Buharlaşma ve buhar basıncı: hız ile dengeyi ayır",
    topic: "detail-163",
    minutes: 65,
    objectives: [
      "Yüzeyden kaçış ve yoğuşmayı aynı tanecik modeliyle açıkla.",
      "Sıcaklık, alan, rüzgâr ve nemin ilk hız etkisini denge basıncından ayır.",
      "Sıvı kalma koşulunu sınayıp gerçek basıncı doygunluk basıncıyla karıştırma.",
    ],
    sections: [
      {
        title: "Kaynamadan buharlaşabilir",
        paragraphs: [
          "Açıkta bırakılan suyun miktarı oda sıcaklığında azalabilir. Sıvı yüzeyindeki bazı moleküller komşularından ayrılıp gaz fazına geçecek enerjiye sahiptir. Buharlaşma yalnız kaynama sıcaklığında gerçekleşmez; yüzeyden gerçekleşen bir faz geçişidir. Buharlaşan molekül yine H₂O’dur; suyun H₂ ve O₂’ye parçalanması değildir.",
          "Buharlaşma çevreden enerji alır. Hızlı moleküllerin ayrılması ve enerji aktarımı kalan sıvının serinlemesine katkı verebilir; elindeki kolonyanın serinletici etkisi buna örnektir. Bu gözlem her açık sıvının her koşulda aynı hızda soğuyacağını göstermez. Çevreden ısı alışverişi ve sıcaklığın sabit tutulup tutulmadığı ayrıca önemlidir.",
        ],
      },
      {
        title: "Hız için birim zamanda geçen miktarı sor",
        paragraphs: [
          "Buharlaşma hızı birim zamanda gaz fazına geçen kütle veya tanecik sayısıyla ölçülebilir. Diğer koşullar aynıysa daha geniş yüzey daha çok molekülün yüzeyden kaçmasına imkân verir. Sıcaklık artışı kaçabilecek molekül payını artırabilir. Sıvı cinsi ve tanecikler arası etkileşim de etkilidir.",
          "Hava akımı yüzeye yakın buharı uzaklaştırarak net buharlaşmayı artırabilir; yüksek nem net buharlaşmayı azaltabilir. Bunlar açık ortamdaki aktarım yorumlarıdır. Geniş ama soğuk bir kap ile dar ama sıcak bir kabın hızlarını verilen sayısal veri olmadan kesin sıralayamazsın. İki etki aynı anda değiştiğinde tek değişkenli kural yeterli olmaz.",
        ],
      },
      {
        title: "Kapalı kapta ters olay birikir",
        paragraphs: [
          "Başlangıçta havası alınmış, sızdırmaz bir kapta sıvı su bulunduğunu düşün. Suyun bir bölümü buharlaşınca gaz fazında H₂O birikir. Gaz moleküllerinin sıvıya dönmesi yoğuşmadır ve bu ters geçiş buharlaşmayla birlikte sürer. Kapalı olmak tek başına anında dengeye ulaşmak demek değildir.",
          "Sıcaklık sabitse ve yeterli sıvı varsa yoğuşma hızı zamanla artarak buharlaşma hızına eşitlenebilir. Denge sırasında iki geçişin hızı eşittir; her ikisi sıfır değildir. Gazdaki ortalama molekül sayısı ve basınç makroskobik olarak sabit görünse bile moleküller iki faz arasında yer değiştirmeyi sürdürür.",
        ],
      },
      {
        title: "Denge buhar basıncı koşullu bir özelliktir",
        paragraphs: [
          "Bir saf sıvının kendi buharıyla dengede bulunduğu belirli sıcaklıktaki basıncı P* ile gösterilebilir. Aynı sıvı ve aynı sıcaklık için iki kapta da sıvı kalıyorsa P* aynıdır. Sıvı miktarı, yüzey alanı veya gaz boşluğu hacmi tek başına bu doygunluk değerini belirlemez; dengeye erişme süresini veya gerekli buhar miktarını değiştirebilir.",
          "Kap çok büyük, başlangıç suyu çok az ise bütün sıvı buharlaşabilir. O zaman sıvı+buhar dengesi koşulu sağlanmadığından ölçülen basıncın P* olması zorunlu değildir. Bu atölye iki durumu ayrı hesaplar: doygunluğa yetecek buhar varsa P*, yoksa mevcut suyun ideal gaz yaklaşımıyla oluşturabileceği daha düşük basınç. Gaz hacmi sıvı hacminden ayrı verilmiştir.",
        ],
      },
      {
        title: "Gerçek tabloyu oran ezberine tercih et",
        paragraphs: [
          "MEBİ tablosunda su için 25 °C’de 23,8; 50 °C’de 92,5; 70 °C’de 233,7; 100 °C’de 760 mmHg bulunur. Aynı saf sıvının sıcaklığı arttıkça doygunluk basıncı artar. Ancak Celsius sıcaklığını ikiye katlamak buhar basıncını ikiye katlamak değildir; değerler doğrusal bir tablo oluşturmaz.",
          "Grafikte ölçüm noktalarını birleştiren çizgi yalnız okuma kılavuzu olabilir. Arada verilmemiş bir sıcaklığın kesin basıncını doğrusal aradeğerle hesaplamak için ayrıca böyle bir yaklaşımın istendiği belirtilmelidir. Sınavda önce eksenleri ve birimleri oku; mmHg ile atm karşılaştırılacaksa 760 mmHg=1 atm dönüşümünü yap.",
        ],
      },
      {
        title: "Saflık, çözeltinin bileşimi ve uçuculuk",
        paragraphs: [
          "Uçucu olmayan çözünenin ideal seyreltik çözeltide bulunması çözücünün buhar basıncını düşürebilir. Saf su ile tuzlu suyu karşılaştırırken aynı sıcaklık, çözücü ve tanecik koşullarını birlikte değerlendir. Çözünenin de uçucu olduğu bir karışımda toplam basınca iki bileşenin katkısı bulunabileceğinden aynı kısa kuralı koşulsuz kullanma.",
          "Aynı sıcaklıkta daha büyük denge buhar basıncı daha yüksek uçuculukla ilişkilidir. Benzer molekül ailelerinde daha kuvvetli moleküller arası tutunma genellikle daha düşük uçuculuk verir. Farklı molekül şekilleri, etkileşimler ve kütleler birlikte değişiyorsa tek bir etiketten kesin sayısal sıralama üretme; verilmiş deneysel veriyi kullan.",
        ],
      },
      {
        title: "Dış basınç ile buharın kısmi basıncı",
        paragraphs: [
          "Sabit sıcaklıktaki sıvının doygunluk basıncı ile dış ortamın toplam basıncı farklı niceliklerdir. Saf sıvı+buhar dengesi uygun biçimde kurulmuşsa P*(T) sıvı türü ve sıcaklıkla belirlenir. Kaynama ise bu değerin dış basınca erişmesiyle ilişkilidir. Birini değiştiren etkiyi otomatik öbürüne taşıma.",
          "Kapta hava da varsa ölçülen toplam gaz basıncı, su buharı kısmi basıncına ek olarak havanın basıncını içerir. Atölyedeki kap başlangıçta havası alınmış kabul edilir; bu sayede hesaplanan basınç yalnız H₂O buharına aittir. Başka bir soruda hava bulunuyorsa toplam basıncı doğrudan P* diye yazmak gerekmez.",
        ],
      },
      {
        title: "İki ayrı sütunla kıyas yap",
        paragraphs: [
          "Aynı saf sıvının aynı sıcaklıkta geniş ve dar iki açık kapta ilk hızlarını soran bir soruda yüzey alanı önemlidir. Aynı kaplar kapatılıp sıvı kalacak şekilde dengeye getirildiğinde sorulan denge basınçları eşittir. İlk hız sütunu ile son denge sütununa ayrı sonuç yazmak bu konunun temel çözüm tekniğidir.",
          "Denge basıncı sorusunda cins, sıcaklık, saflık, iki faz ve denge koşullarının altını çiz. İlk hız sorusunda ise yüzey, sıcaklık, hava akımı, çevre nemi ve ölçüm aralığını denetle. Bütün sıvının bitip bitmediği belirtilmemişse koşullu yanıt vermek, başlangıçtaki miktarı basınçla doğru orantılı saymaktan daha doğrudur.",
        ],
      },
    ],
    examples: [
      {
        title: "Miktar artarsa denge",
        prompt:
          "25 °C’de iki havasız kapta saf suyla kendi buharı dengede ve her ikisinde sıvı kalıyor. İkinci kapta su kütlesi üç kat. Basınç oranı nedir?",
        strategy: "Başlangıç kütlesini dengeyi belirleyen değişkenlerden ayır.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Sıvı türü ve sıcaklık aynıdır; iki faz mevcuttur.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "Her iki su buharı basıncı P*(25 °C)=23,8 mmHg olur.",
          },
          {
            label: "Sonucu denetle",
            explanation: "P₂/P₁=23,8/23,8=1 bulunur.",
          },
        ],
        answer: "1",
        check: "Üç kat su, üç kat denge basıncı üretmez.",
        pitfall: "İki fazın varlığı koşulunu atlama.",
      },
      {
        title: "Tablodan kıyas",
        prompt:
          "Su 25 °C’de 23,8; 50 °C’de 92,5 mmHg doygunluk basıncına sahip. Farkı ve oranı bul.",
        strategy: "Her iki veri aynı birimde; gerçek tabloyu kullan.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Basınç farkı 92,5−23,8=68,7 mmHg.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "Oran 92,5/23,8≈3,89.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Sıcaklığın Celsius oranı 2 olsa da basınç oranı 2 değildir.",
          },
        ],
        answer: "68,7 mmHg ve yaklaşık 3,89 kat.",
        check: "İki değer de pozitiftir; yüksek sıcaklıktaki daha büyüktür.",
        pitfall: "Buhar basıncını Celsius sıcaklığıyla doğrusal sanma.",
      },
      {
        title: "Sıvı biterse",
        prompt:
          "298,15 K’de 0,010 g su bütünüyle 2 L gaz boşluğuna geçiyor. M=18 g/mol, R=0,082057 L atm mol⁻¹ K⁻¹. Suyun P*=23,8 mmHg. Gerçek buhar basıncını yaklaşık bul.",
        strategy:
          "Önce bütün suyun oluşturabileceği ideal basıncı doygunlukla karşılaştır.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "n=0,010/18≈0,000556 mol.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "P=nRT/V≈0,00680 atm; 760 ile çarpınca 5,16 mmHg.",
          },
          {
            label: "Sonucu denetle",
            explanation: "5,16<23,8 olduğundan doygunluğa yetmez; sıvı kalmaz.",
          },
        ],
        answer: "Yaklaşık 5,16 mmHg; doygunluk altında.",
        check:
          "P* yazmak için sıvı+buhar dengesi gerekir; burada tüm su bitmiştir.",
        pitfall: "Koşulsuz her kapta P* vardır deme.",
      },
      {
        title: "Açık ve kapalı kıyas",
        prompt:
          "Aynı saf sıvı aynı sıcaklıkta A’da geniş, B’de dar yüzeyli. Önce açık ortamda, sonra iki faz kalacak şekilde kapalı dengede kıyasla.",
        strategy: "İlk hızı ve son basıncı ayrı yanıtla.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation:
              "Açıkta eşit nem ve hava akımı varsayımıyla A’nın ilk buharlaşma hızı daha büyüktür.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Kapalı dengede sıvı türü ve sıcaklık aynıdır; iki kapta da sıvı vardır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Denge buhar basınçları eşit olur; hız farkı son basınca taşınmaz.",
          },
        ],
        answer: "İlk hız A>B; son denge basıncı A=B.",
        check: "Sorunun iki farklı ölçülen büyüklüğü vardır.",
        pitfall: "Hız ile denge basıncını aynı sanma.",
      },
    ],
    recall: [
      {
        prompt: "Dengede moleküller durur mu?",
        answer: "Hayır; buharlaşma ve yoğuşma eşit hızlarla sürer.",
      },
      {
        prompt: "Geniş yüzey P* değerini yükseltir mi?",
        answer:
          "Aynı saf sıvı ve sıcaklıkta iki faz dengesi varsa hayır; ilk hızı etkileyebilir.",
      },
      {
        prompt: "P* yazmadan önce hangi kritik koşul denetlenir?",
        answer: "Denge kuruldu mu ve sıvı ile buhar birlikte kaldı mı?",
      },
      {
        prompt: "Celsius iki kat olunca P* iki kat mı?",
        answer: "Hayır; deneysel tablo veya geçerli bağıntı gerekir.",
      },
    ],
    items: [
      [
        "Buharlaşma için hangisi doğrudur?",
        "Sıvı yüzeyinden kaynama sıcaklığının altında da gerçekleşebilir.",
        [
          "Yalnız sıvının tamamında kabarcıkla olur.",
          "Yalnız 100 °C’de olur.",
          "H₂O kimliğinin H₂ ve O₂’ye değişmesidir.",
          "Daima çevreye ısı verir.",
        ],
        "Yer ve sıcaklık koşullarını ayır.",
        "Buharlaşma yüzeyden gaz fazına geçiştir; kaynama gerekmez. Enerji alır ve molekül kimliği korunur.",
      ],
      [
        "Kapalı kapta sıvı-buhar dinamik dengesi hangisidir?",
        "Buharlaşma ve yoğuşma hızları eşittir.",
        [
          "İki hız da mutlaka sıfırdır.",
          "Sıvı molekülleri tamamen hareketsizdir.",
          "Kapta mutlaka hiç sıvı kalmaz.",
          "Gaz basıncı sürekli sınırsız artar.",
        ],
        "Denge durmak değil karşıt hızların eşitliğidir.",
        "Moleküller iki yönde geçmeyi sürdürür. Makroskobik miktarların sabitliği mikroskobik hareketin bitmesi değildir.",
      ],
      [
        "25 °C’de iki kapta saf su ve kendi buharı dengededir, ikisinde de sıvı kalır. A’da 100 mL, B’de 300 mL başlangıç suyu varsa P* kıyası nedir?",
        "P*A=P*B",
        ["P*B=3P*A", "P*A=3P*B", "P*B=0", "Yalnız miktardan kesin P*B>P*A"],
        "İki faz ve aynı T koşullarını kullan.",
        "Aynı saf sıvının aynı sıcaklıktaki denge basıncı miktara bağlı değildir. Üç kat başlangıç suyu basıncı üç kat yapmaz.",
      ],
      [
        "Aynı saf sıvının aynı sıcaklıktaki açık kaplarında yalnız yüzey alanı büyütülüyor. İlk buharlaşma hızına etkisi hangisidir?",
        "Diğer koşullar aynıysa artabilir.",
        [
          "Zorunlu sıfır olur.",
          "Sıvı kimliği zorunlu değişir.",
          "Denge basıncı zorunlu iki kat olur.",
          "Yüzeyden molekül geçişi imkânsızlaşır.",
        ],
        "Birim zamanda geçebilen yüzey moleküllerini düşün.",
        "Daha geniş yüzey açık ortamda buharlaşmaya katkı verir. Bu hız etkisini kapalı denge basıncı değişikliğiyle karıştırmamak gerekir.",
      ],
      [
        "Su için 25 °C’de 23,8 ve 50 °C’de 92,5 mmHg veriliyor. Basınç artışı kaç mmHg?",
        "68,7",
        ["23,8", "25", "46,25", "116,3"],
        "Aynı birimdeki iki basıncın farkını al.",
        "92,5−23,8=68,7 mmHg. Celsius sıcaklığının iki kat olması bu fark veya oran yerine kullanılamaz.",
      ],
      [
        "Sızdırmaz ve başlangıçta havasız kapta çok az su tamamen buharlaşıyor; ölçülen basınç P* değerinden küçük. Doğru yorum hangisi?",
        "Sıvı+buhar doygun denge koşulu sağlanmamıştır.",
        [
          "Bütün kaplarda basınç mutlaka P* olmalıdır.",
          "Su molekülleri atomlarına ayrılmıştır.",
          "Kap mutlaka açık olmak zorundadır.",
          "Sıcaklık kavramı geçersizdir.",
        ],
        "İki fazın birlikte kalıp kalmadığını denetle.",
        "Tamamı gaz olan örnek doygunluk altında olabilir. Denge P* kuralı sıvı fazın da bulunmasını gerektirir; kapalı olmak yeterli değildir.",
      ],
      [
        "Hava içeren bir kapta ölçülen toplam basınç neden doğrudan suyun buhar basıncı sayılamayabilir?",
        "Havanın da kısmi basınç katkısı vardır.",
        [
          "Su buharının hiç basıncı yoktur.",
          "Hava her koşulda katıdır.",
          "Toplam basınç yalnız sıvı kütlesidir.",
          "Bütün gazlar iyoniktir.",
        ],
        "Toplam gazı oluşturan bileşenleri yaz.",
        "Toplam basınç su buharı ve havanın katkılarını içerir. Yalnız suyun P* değerini soran koşulla toplam basıncı ölçen koşul ayrılmalıdır.",
      ],
      [
        "A kabı geniş ve soğuk, B kabı dar ve sıcak; nem ve hava akımı bilinmiyor. İlk buharlaşma hızları için ne söylenebilir?",
        "Verilenlerle kesin sıralama yapılamaz.",
        [
          "A her koşulda daha hızlıdır.",
          "B her koşulda daha hızlıdır.",
          "İkisi kesin eşittir.",
          "İkisinde de buharlaşma sıfırdır.",
        ],
        "Zıt yönlü değişen etkilere dikkat et.",
        "Yüzey ve sıcaklık ayrı etkiler yapar; büyüklükleri ve diğer koşullar bilinmeden net hız sıralaması kesinleşmez.",
      ],
      [
        "1 atm=760 mmHg ise 380 mmHg kaç atm?",
        "0,5",
        ["2", "38", "760", "288800"],
        "mmHg değerini 760’a böl.",
        "380/760=0,5 atm. Basınç birimi değiştirmek fiziksel basıncı değiştirmez; birimlerin sadeleşmesini kontrol et.",
      ],
      [
        "İdeal seyreltik çözeltide uçucu olmayan çözünen saf çözücüye ekleniyor. Aynı sıcaklıkta çözücünün buhar basıncı için beklenen eğilim nedir?",
        "Azalır.",
        [
          "Her zaman sonsuz olur.",
          "Zorunlu üç katına çıkar.",
          "Sıvı miktarına bakmadan daima sıfırdır.",
          "Molekül kimliği zorunlu elemente dönüşür.",
        ],
        "Uçucu olmayan ve ideal koşullarını kullan.",
        "Uçucu olmayan çözünen çözücünün sıvıdaki etkinliğini düşürür; bu koşullarda çözücü buhar basıncı azalır. Uçucu bileşenli karışımlar için aynı kısa kuralı koşulsuz genelleme.",
      ],
    ],
    source:
      "MEBİ TYT Kimya Konu Özetleri, basılı s. 47–49/PDF 49–51; Aurelia 025 Buharlaşma ve Buhar Basıncı öğretim/örnek s. 1–4 ve yöntem bölümleriyle karşılaştırılan özgün anlatım. Resmî soru metni aktarımı değildir.",
  },
  {
    id: "kaynama-bagil-nem",
    title: "Kaynama ve bağıl nem: basınçları doğru eşleştir",
    topic: "detail-164",
    minutes: 65,
    objectives: [
      "Kaynama koşulunu P*(T)=Pdış biçiminde kullan; normal kaynama sıcaklığını ayır.",
      "Aynı sıcaklıktaki su buharı kısmi basıncından bağıl nemi hesapla.",
      "Isıtıcı gücü, çözelti ve soğuma etkilerini koşullarıyla karşılaştır.",
    ],
    sections: [
      {
        title: "Kabarcık neden büyüyebilir?",
        paragraphs: [
          "Buharlaşma yüzeyden olabilir; kaynamada sıvının içinde buhar kabarcıkları oluşup büyüyebilir. Saf sıvının buhar basıncı, sıvı üzerindeki dış basınca ulaştığında kaynama eşiği incelenir. Basit TYT modelinde P*(Tk)=Pdış yazılır. Derinlikten gelen küçük ek basınçlar veya çekirdeklenme ayrıntıları bu modelde ayrıca hesaplanmaz.",
          "Suyun 100 °C normal kaynama sıcaklığı yaklaşık 1 atm dış basınca aittir. Başka dış basınçta aynı su farklı sıcaklıkta kaynayabilir. Sıvı türünü değiştirmek P*(T) eğrisini, dış basıncı değiştirmek erişilmesi gereken eşiği değiştirir. Soruya başlamadan hangi değişkenin oynadığını iki ayrı sütuna yaz.",
        ],
      },
      {
        title: "Alçak basınç ve düdüklü tencere",
        paragraphs: [
          "Dış basınç azaldığında daha düşük P* yeterli olduğundan saf su daha düşük sıcaklıkta kaynayabilir. Yüksek yerlerde görülen yön budur. Düdüklü tencerede basıncın yükselmesi daha yüksek kaynama sıcaklığına izin verir; sıvı daha sıcak koşullarda pişirmeye katkı verir. Kap açıkken aynı yüksek basınç korunmaz.",
          "Rakım ile sıcaklık arasında her ortam için tek bir doğrusal dönüşüm kullanma. Basınç hava koşullarına da bağlıdır. Kaynak tablolarındaki kaba yükseklik örneklerini hassas fizik yasası gibi ara değerlemek doğru değildir. Bu atölye doğrudan ölçülmüş P*(T) noktalarına eşit dış basınçları seçtirir; verilmemiş rakımdan kesin derece üretmez.",
        ],
      },
      {
        title: "Aynı ortamda kaynayan iki sıvı",
        paragraphs: [
          "Aynı dış basınçta kaynamakta olan iki saf sıvının kaynama anındaki buhar basınçları dış basınca eşittir. Bu yüzden basınçları aynı olabilirken kaynama sıcaklıkları farklı olabilir. Her birini kendi kaynama anında karşılaştırmak ile ikisini aynı sıcaklıkta karşılaştırmak farklı sorulardır.",
          "Aynı sıcaklıkta daha uçucu olan sıvının P* değeri genellikle daha büyüktür ve aynı dış basınca daha düşük sıcaklıkta ulaşır. Ancak molekül yapısı veya ölçüm verisi verilmedikçe her kimyasal aile için tek sözcüklü kesin sıralama üretme. Sorunun karşılaştırma anını çizmek, aynı sıcaklık ve aynı kaynama anı tuzağını önler.",
        ],
      },
      {
        title: "Güç, süre ve sıcaklık",
        paragraphs: [
          "Dış basınç ve bileşim korunurken daha güçlü ısıtıcı saf sıvının kaynama sıcaklığını tek başına değiştirmez; o sıcaklığa ulaşma süresini ve kaynama sırasında enerji aktarım hızını değiştirebilir. Kaynama platosunda sıvı ve gaz birlikteyse alınan enerji faz dönüşümüne gider; sıcaklığın sabitliği enerjinin sıfır olduğu anlamına gelmez.",
          "Kayıpsız modelde kaynama için enerji Q=mL, süre t=Q/P yazılır. Isıtıcı gücü iki kat olursa aynı kütlenin aynı dönüşüm süresi yarıya iner. Gerçekte çevreye ısı kaybı ve basınç değişimi eklenebilir; soru bu ayrıntıları vermiyorsa kullanılan ideal varsayımı belirt. Platonun uzunluğu tek başına L ölçmez; kütle ve güç de önemlidir.",
        ],
      },
      {
        title: "Uçucu olmayan çözünenle karşılaştır",
        paragraphs: [
          "İdeal seyreltik çözeltide uçucu olmayan çözünen, aynı sıcaklıktaki çözücü buhar basıncını düşürür. Aynı dış basınca ulaşmak için daha yüksek sıcaklık gerektiğinden kaynamaya başlama sıcaklığı yükselir. Bu düşünceyi basınç eğrisi üzerinden kurmak, kaynama noktası yükselmesi ile buhar basıncı artışı yönlerini karıştırmayı önler.",
          "Eşit çözücü miktarı ve eşit mol koşulunda tam ayrışan NaCl iki, MgCl₂ üç iyon verir; suda moleküler kalan şeker bir tanecik birimi verir. İdeal karşılaştırmada etkin tanecik sayısı önemlidir. Gerçek derişik çözeltide ayrışma ve etkinlik farkları nicel sonucu değiştirebilir. Salt formülden kesin bir derece yükselmesi uydurma.",
        ],
      },
      {
        title: "Nem, su buharının bilgisidir",
        paragraphs: [
          "Havadaki su buharının kısmi basıncı p, aynı sıcaklıktaki doygunluk basıncı P* ise bağıl nem 100p/P* olarak hesaplanır. Pay toplam atmosfer basıncı değildir. Aynı sıcaklıkta p artarsa bağıl nem artar; aynı p korunurken sıcaklık ve P* artarsa bağıl nem azalır. Yüzde, mutlak su kütlesiyle aynı nicelik değildir.",
          "Örneğin 25 °C’deP*=23,8 mmHg ve p=11,9 mmHg ise bağıl nem %50’dir. Bu yüzde kabın yarısının sıvıyla dolu olduğu anlamına gelmez. Suyun havada gaz hâlindeki payını o sıcaklığın doygunluk sınırıyla karşılaştırır. Hava ısıtılınca su moleküllerinin sayısı kendiliğinden artmaz; su alışverişi olup olmadığı belirtilmelidir.",
        ],
      },
      {
        title: "Soğutma ve çiy noktasını koşulla oku",
        paragraphs: [
          "Hava soğurken doygunluk basıncı düşer. Yeterli su buharı varsa yüzeylerde yoğuşma başlayabilir; buğulanma ve çiy bu bağlantıyla açıklanır. Çiy noktası, verilen su buharı koşulunda doygunluğa erişilen sıcaklıktır. Yoğuşmadan önce p sabit varsayılması bazı soru modellerinin kolaylığıdır; kapalı sabit hacimli gerçek gazda sıcaklık değişimi p’yi de etkiler.",
          "Atölyede seçilen p başlangıç değeri olarak verilir. Sıcaklıkta p>P* çıkarsa düz su yüzeyiyle kararlı denge modeli fazla su buharının yoğuşmasını gösterir; sonp=P* ve son bağıl nem %100 olur. Model bulut çekirdeklenmesi veya geçici aşırı doygunluğu çözmez. Böylece %150 hesaplaması kararlı ortamın her zaman %150 nemle kaldığı sanısını üretmez.",
        ],
      },
      {
        title: "Terleme ve hissedilen sıcaklık",
        paragraphs: [
          "Terin buharlaşması vücuttan enerji uzaklaştırabilir. Sıcak havada yüksek bağıl nem buharlaşmalı serinlemeyi güçleştirebilir; hava akımı da önemlidir. Hissedilen sıcaklık yalnız nem yüzdesinden hesaplanan tek sayı değildir: gerçek sıcaklık, rüzgâr, güneşlenme ve kullanılan endeks birlikte belirler.",
          "Her sıcaklıkta yüksek nem mutlaka aynı miktarda sıcak hissettirir gibi koşulsuz bir kural kullanma. Sınav sorusu belirli sıcaklıkta terleme etkisini soruyorsa o mekanizmayı açıkla. Gerçek hava durumu hesabı istenmiyorsa örnek bir yüzdeye keyfî termometre derecesi ekleme. Ölçülen sıcaklık ile öznel/indekslenmiş hissedilen değeri ayır.",
        ],
      },
      {
        title: "Birimden doğru yönteme",
        paragraphs: [
          "Sorulan °C ise basıncı P*(T) tablosuyla eşleştir; sorulan % ise p/P* oranını kur; sorulan hız ise yüzey, rüzgâr ve nemi değerlendir; sorulan süre ise enerji ve gücü kullan. Aynı paragraftaki bütün sayıları tek formüle koymak yerine istenen niceliği önce yaz.",
          "Sonuç kontrolünde bağıl nem için aynı birimleri ve aynı sıcaklığı doğrula. Kaynama için P* ile dış basıncın eşitliğini yeniden yaz. Saflık, basınç veya çözücü miktarı değişiyorsa önce hangi kısa kuralın koşulunun bozulduğunu belirt. Bu kontrol, ezberlenmiş sıcaklıkların yanlış ortama uygulanmasını önler.",
        ],
      },
    ],
    examples: [
      {
        title: "Vakum altında kaynama",
        prompt:
          "Saf suyun 50 °C’deP*=92,5 mmHg olduğu veriliyor. Dış basınç 92,5 mmHg tutulursa kaynama eşiği nedir?",
        strategy: "P* değerini dış basınçla eşleştir.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Kaynama modelinde P*(Tk)=Pdış.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "Tabloda 92,5 mmHg basınç 50 °C’ye karşılık gelir.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Sonuç 100 °C olmak zorunda değildir; normal basınç verilmemiştir.",
          },
        ],
        answer: "50 °C",
        check: "İki basınç aynı birimde ve eşittir.",
        pitfall: "92,5 basıncını sıcaklık değeri gibi okuma.",
      },
      {
        title: "Nem yüzdesi",
        prompt: "25 °C’de p=14,28 mmHg, P*=23,8 mmHg. Bağıl nemi bul.",
        strategy: "Gerçek su buharı basıncını doygunluk değerine böl.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Pay 14,28; payda 23,8 mmHg.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "14,28/23,8=0,60.",
          },
          {
            label: "Sonucu denetle",
            explanation: "Yüzle çarpınca %60 bulunur.",
          },
        ],
        answer: "%60",
        check: "14,28<23,8 olduğundan sonuç %100’den küçüktür.",
        pitfall: "Toplam 760 mmHg hava basıncını paydaya koyma.",
      },
      {
        title: "Oranı ters çöz",
        prompt:
          "25 °C’deP*=23,8 mmHg ve bağıl nem %40. Su buharı kısmi basıncı nedir?",
        strategy: "Yüzdeyi 0,40 kesrine çevir.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "40=100p/23,8.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "p=23,8×0,40=9,52 mmHg.",
          },
          {
            label: "Sonucu denetle",
            explanation: "9,52/23,8×100=%40 geri kontrolü yapılır.",
          },
        ],
        answer: "9,52 mmHg",
        check: "Doygunluk basıncından küçüktür.",
        pitfall: "40 değerini doğrudan 23,8 ile çarpıp yüzde yüzü unutma.",
      },
      {
        title: "Güç iki kat",
        prompt:
          "Kayıpsız modelde aynı saf sıvının aynı basınçta buharlaşma enerjisi 24000 J. Güç 200 W iken süre ne,400 W iken ne?",
        strategy: "Süreyi Q/P ile hesapla; kaynama sıcaklığını ayrı tut.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "200 W=200 J/s; t₁=24000/200=120 s.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "400 W için t₂=24000/400=60 s.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Güç iki kat olduğundan süre yarı; basınç ve bileşim aynıysa kaynama sıcaklığı aynı.",
          },
        ],
        answer: "120 s ve 60 s; kaynama sıcaklığı değişmez.",
        check: "P×t her iki durumda 24000 J verir.",
        pitfall: "Güç artışını zorunlu kaynama noktası artışı sayma.",
      },
    ],
    recall: [
      {
        prompt: "Normal kaynama sıcaklığındaki normal neyi belirtir?",
        answer: "Yaklaşık 1 atm dış basınç koşulunu.",
      },
      {
        prompt:
          "Aynı ortamda kaynayan saf sıvıların P* değerleri nasıl kıyaslanır?",
        answer:
          "Kaynama anında aynı dış basınca eşittir; sıcaklıkları farklı olabilir.",
      },
      {
        prompt: "Bağıl nemin payına hangi basınç yazılır?",
        answer: "Suyun gerçek kısmi basıncı; toplam hava basıncı değil.",
      },
      {
        prompt: "Sabit p altında hava ısıtılırsa bağıl nemin yönü nedir?",
        answer:
          "P* arttığı için bağıl nem azalır; su miktarı kendiliğinden artmaz.",
      },
    ],
    items: [
      [
        "Saf su için P*(50 °C)=92,5 mmHg veriliyor. Dış basınç 92,5 mmHg ise kaynama eşiği kaç °C?",
        "50",
        ["25", "70", "92,5", "100"],
        "Kaynama koşulunu tabloyla eşleştir.",
        "P*(Tk)=Pdış olduğundan 50 °C uygun noktadır. 100 °C yalnız yaklaşık 1 atm normal koşula aittir.",
      ],
      [
        "Aynı saf sıvıda dış basınç azaltılırsa kaynama sıcaklığı için beklenen yön nedir?",
        "Azalır.",
        [
          "Artar.",
          "Mutlaka aynı kalır.",
          "Mutlaka 0 °C olur.",
          "Kimyasal formülü değişir.",
        ],
        "Daha düşük buhar basıncına hangi sıcaklıkta ulaşılır?",
        "P*(T) sıcaklıkla artar. Daha düşük dış basınca eşitlik daha düşük sıcaklıkta sağlanır; bu bir kimyasal dönüşüm değildir.",
      ],
      [
        "Aynı dış basınçta kaynayan iki farklı saf sıvı için hangisi doğrudur?",
        "Kaynama anındaki buhar basınçları eşittir.",
        [
          "Kaynama sıcaklıkları zorunlu eşittir.",
          "Molekül formülleri zorunlu aynıdır.",
          "Kütleleri zorunlu eşittir.",
          "Kaynama anında P*=0 olur.",
        ],
        "Her sıvıda aynı kaynama eşitliğini yaz.",
        "Her biri kendi kaynama sıcaklığında aynı dış basınca ulaşır. Basınçların eşitliği sıcaklık veya madde türünün eşitliği değildir.",
      ],
      [
        "25 °C’de p=11,9 mmHg ve P*=23,8 mmHg ise bağıl nem kaçtır?",
        "%50",
        ["%0,5", "%2", "%100", "%200"],
        "100p/P* kullan.",
        "100×11,9/23,8=%50. Pay su buharının kısmi basıncıdır; 760 mmHg toplam hava basıncı değildir.",
      ],
      [
        "Aynı sıcaklıkta P*=20 mmHg ve bağıl nem %75 ise gerçek p kaç mmHg?",
        "15",
        ["5", "20", "26,67", "75"],
        "Yüzde 75’i 0,75 olarak yaz.",
        "p=0,75×20=15 mmHg bulunur. Ters kontrol 100×15/20=%75’tir.",
      ],
      [
        "Su buharı kısmi basıncı sabit varsayılan hava ısıtılıyor. Doygunluk basıncı artarsa bağıl nem ne olur?",
        "Azalır.",
        [
          "Artar.",
          "Kesin %100 olur.",
          "Su molekülleri kendiliğinden çoğalır.",
          "Toplam hava basıncına eşit olur.",
        ],
        "Aynı pay daha büyük paydaya bölünüyor.",
        "Bağıl nem 100p/P* olduğundan sabit p ve artan P* oranı küçültür. Isıtmak tek başına sisteme yeni su eklemez.",
      ],
      [
        "Dış basınç ve bileşim sabitken saf sıvıya daha güçlü ısıtıcı konuyor. Hangisi uygundur?",
        "Kaynama noktasına ulaşma süresi kısalabilir; kaynama noktası aynı kalır.",
        [
          "Kaynama noktası zorunlu iki kat olur.",
          "Sıvı miktarı anında sıfır olur.",
          "Kaynama boyunca enerji aktarılmaz.",
          "Basınç eşitliği geçersizleşir.",
        ],
        "Güç ile madde özelliğini ayır.",
        "Güç enerji aktarım hızıdır. Aynı basınç ve bileşimde kaynama eşiğini değiştirmez; süreyi veya buharlaşma hızını etkiler.",
      ],
      [
        "Eşit su ve eşit mol uçucu olmayan çözünen, ideal ve tam ayrışma koşullarında şeker, NaCl, MgCl₂ kullanılıyor. Kaynamaya başlama sıcaklığı büyükten küçüğe hangisidir?",
        "MgCl₂>NaCl>şeker",
        [
          "Şeker>NaCl>MgCl₂",
          "NaCl>şeker>MgCl₂",
          "Hepsi mutlaka saf suyla aynı",
          "MgCl₂>şeker>NaCl",
        ],
        "Etkin çözünen taneciklerini 3,2,1 say.",
        "Eşit çözücü ve mol koşulunda MgCl₂ üç, NaCl iki, şeker bir tanecik birimi verir. İdeal karşılaştırmada daha çok çözünen taneciği daha büyük kaynama yükselmesi verir.",
      ],
      [
        "Kayıpsız modelde 30000 J buharlaşma enerjisi 300 W net güçle aktarılıyor. Süre kaçs?",
        "100",
        ["10", "30", "300", "9000"],
        "W birimi J/s demektir.",
        "t=Q/P=30000/300=100 s. Sıcaklığın plato boyunca sabit olması enerji aktarımının olmadığı anlamına gelmez.",
      ],
      [
        "Soğuk bir camda havadaki su buharının damlacıklara dönüşmesi hangi olaydır?",
        "Yoğuşma",
        [
          "Süblimleşme",
          "Elektroliz",
          "Kimyasal ayrışma",
          "Katıdan doğrudan gaza geçiş",
        ],
        "Gazdan sıvıya yönü oku.",
        "Su buharı gazdan sıvıya geçer ve enerji verir. Bu yoğuşmadır; suyun kimyasal kimliğinin değişmesini gerektirmez.",
      ],
    ],
    source:
      "MEBİ TYT Kimya Konu Özetleri, basılı s. 48–49/PDF 50–51; Aurelia 026 Kaynama ve Bağıl Nem öğretim/örnek s. 1–4 ve yöntem bölümleriyle karşılaştırılan özgün anlatım. Verilmiş tablo noktaları kullanılır; resmî soru kopyası değildir.",
  },
  {
    id: "gazlar-hal-degisim-plazma",
    title: "Gazlar, hâl değişim grafikleri ve plazma",
    topic: "detail-165",
    minutes: 65,
    objectives: [
      "Gazı P, V, T, n ile tanımla; oranlarda Kelvin kullan.",
      "Saf maddenin enerji grafiğinde evre payı ile sıcaklığı ayrı izle.",
      "Plazmada serbest elektron ve iyonları sayarak yük korunumu kur.",
    ],
    sections: [
      {
        title: "Gaz hacmi ve çeper çarpışmaları",
        paragraphs: [
          "Gazın belirli bir şekli ve bağımsız sabit hacmi yoktur; kapladığı erişilebilir kabın hacmiyle incelenir. Tanecikler arası boşluk büyük olduğundan gazlar sıvılara göre kolay sıkıştırılabilir. Çeperle çarpışmalar basınca katkı verir. Basınç kuvvetin kendisi değil birim yüzey başına etkisidir; birimini belirtmek gerekir.",
          "İdeal gaz modelinde taneciklerin kendi hacmi ve aralarındaki etkileşimler ihmal edilir. Bu yaklaşım özellikle görece düşük basınç ve yüksek sıcaklıkta daha uygundur. Gerçek gazlarda etkileşim, yoğuşma ve tepkime olabilir; bütün gazların kimyasal özelliklerinin hiçbir koşulda etkisiz olduğu söylenmez. Modelin kapsamını fiziksel sorunun başında yaz.",
        ],
      },
      {
        title: "Dört değişken ve birimler",
        paragraphs: [
          "P basınç, V hacim, T mutlak sıcaklık, n mol sayısıdır. Atölyede P=nRT/V ideal bağıntısı kullanılır; R=0,082057 L atm mol⁻¹ K⁻¹ alındığı için V litre, T Kelvin olmalıdır. 1 atm=760 mmHg; 1 L=1000 mL dönüşümleri birim kontrolünü sağlar. Bu sayısal model temel oranları görünür kılar; ileri gerçek gaz hesabı değildir.",
          "T(K)=t(°C)+273,15 bağıntısını kullan. Sınav yaklaşık 273 verilirse o yaklaşımı izleyebilirsin. 0 °C gazın sıfır kinetik enerjili olduğu anlamına gelmez. Celsius sıcaklıklarını oranlamak özellikle 27’den 127 °C’ye geçişte büyük hata verir; önce 300,15 ve 400,15 K değerlerini yaz.",
        ],
      },
      {
        title: "Sabitleri işaretleyerek orantı kur",
        paragraphs: [
          "n ve T sabitken PV sabittir: hacim azalınca basınç artar. n ve P sabitken V/T sabittir: Kelvin sıcaklığı artınca hacim artar. n ve V sabitken P/T sabittir. Her bir orantı aynı anda başka iki değişkenin korunmasına dayanır; hepsini aynı deneye koşulsuz uygulama.",
          "Bir kap ısıtıldığında rijitse basınç, serbest hareketli pistonlu ve dış basıncı sabitse hacim değişebilir. Gaz eklemekn değerini değiştirir; kaçak varsa sabit miktar kuralı bozulur. Soruyu okumadan tek bir gaz yasası seçmek yerine kap çizimine sabit değişkenleri yaz. Sonuçta büyüme/küçülme yönünü fiziksel sezgiyle denetle.",
        ],
      },
      {
        title: "Ortalama enerji, hız ve hareket",
        paragraphs: [
          "İdeal gazlarda aynı sıcaklık ortalama öteleme kinetik enerjisinin eşitliğini verir. Ancak farklı molekül kütleleri aynı ortalama hız demek değildir; hafif moleküller aynı sıcaklıkta ortalama olarak daha hızlı olabilir. Sıcaklık ortalama bir bilgidir; bütün moleküller aynı hızda hareket etmez.",
          "Moleküllerin rastgele hareketi ve çarpışmalarını, gaz içindeki daha büyük bir parçacığın çarpışmalarla yaptığı Brown hareketiyle terim olarak özdeşleştirme. Difüzyon gazların yayılmasıdır; tepkimeye giren gazlar karıştırılırsa kimyasal değişim de olabilir. Her gaz çifti her koşulda tepkimesiz kalır genellemesi geçersizdir.",
        ],
      },
      {
        title: "Enerji grafiğinde beş bölge",
        paragraphs: [
          "Saf suyun yaklaşık 1 atm altında katıdan başlayarak ısıtıldığı modelde sırasıyla katının ısınması, erime platosu, sıvının ısınması, kaynama platosu ve gazın ısınması görülebilir. Eğimli bölgede tek fazın sıcaklığı değişir; yatay bölgede iki fazın miktarları değişebilir. Kimyasal formül H₂O olarak kalır.",
          "Atölyenin enerji modu önceki su modelindeki 1 g örnek ve belirtilmiş gizli/öz ısı değerlerini kullanır. Grafiğin yatay bölgesinde sıcaklık sabitken verilen enerji faz dönüşümüne gider. 0 °C görmek tek başına tamamen sıvı,100 °C görmek tamamen gaz demek değildir. Platonun başı, içi ve sonu farklı faz miktarlarına karşılık gelir.",
        ],
      },
      {
        title: "Soğutma, saflık ve zaman ekseni",
        paragraphs: [
          "Aynı saf maddenin aynı basınçtaki ters denge geçişinde donma erime sıcaklığında, yoğuşma kaynama sıcaklığında incelenir. Soğutma grafiğinde eğimler aşağı yönlüdür; ilk plato yüksek sıcaklıktaki yoğuşma, sonraki plato donmadır. Yalnız yatay çizgi görmek olayın adını vermez; başlangıç hâli ve enerji yönü de gerekir.",
          "Enerji ekseni ile zaman ekseni farklıdır. Sabit net güç varsa Q=Pt ile dönüştürülebilir; güç değişirse aynı süre aynı enerji demek değildir. Karışım ve değişen basınç tek sabit sıcaklık platosu varsayımını bozabilir. Faz değişimi boyunca enerji alınması her taneciğin ortalama kinetik enerjisinin arttığı anlamına gelmez.",
        ],
      },
      {
        title: "Plazmanın yük taşıyıcıları",
        paragraphs: [
          "Plazma serbest elektronlar ve iyonlar içeren, elektriksel toplu davranışı önem taşıyan iyonlaşmış ortamdır. Nötr tanecikler de bulunabilir; bütün atomların tamamen iyonlaşması gerekmez. Sıradan gazla karşılaştırmada hareketli yüklerin varlığı ve elektromanyetik alanlara tepki önemlidir. İyonlaşma elektron kopmasıdır; çekirdeklerin yok olması değildir.",
          "Yaklaşık toplam nötrlük pozitif iyon sayısı negatif iyon sayısına eşittir demek değildir. Örneğin bir kez iyonlaşmış altı atom altı+1 iyon ve altı serbest elektron verir; negatif iyon hiç bulunmasa da toplam yük sıfır olabilir. Atölye on iki nötr atomdan seçilen kadarının birer elektron kaybetmesini sayar. Yükler sayılır; plazmanın tüm elektromanyetik dinamiği hesaplanmaz.",
        ],
      },
      {
        title: "Örnekleri kanıttan tanı",
        paragraphs: [
          "Güneş ve yıldızlar, yıldırım, uygun elektrik boşalma lambaları plazma örnekleriyle incelenebilir. Sıcaklık tek başına yeterli tanı değildir: lav sıcak bir kayaç eriyiğidir; yalnız sıcak olması onu plazma yapmaz. Bazı soğuk plazmalarda elektronların ve ağır taneciklerin sıcaklıkları aynı olmayabilir; hepsine tek sıcaklık zorlamak doğru değildir.",
          "Her alevin tamamı güçlü biçimde iyonlaşmış plazmadır veya bütün plazmaların yoğunluğu tüm katı ve sıvılardan düşüktür gibi koşulsuz ifadeler kullanma. Kimya sorusunun verdiği iyonlaşma ve iletkenlik kanıtına dayan. Plazma örneğiyle kimyasal tepkime hızının her ortamda otomatik arttığını iddia etme; ortam koşulları etkilidir.",
        ],
      },
      {
        title: "İlk hata denetim sırası",
        paragraphs: [
          "Gaz hesabında birimler, Kelvin dönüşümü ve sabitler kontrolü yap. Grafik sorusunda eksenin enerji mi zaman mı olduğunu, saf madde ve basınç koşulunu yaz. Sonra iki eşik arasında tek faz mı, eşikte iki faz mı olduğunu belirle. Eşik dışındaki geniş bir aralığa iki fazı keyfî yayma.",
          "Plazma sayımında önce her taneciğin yükünü ve sayısını çarp, sonra topla. Elektronları unutmak net pozitifmiş gibi yanlış sonuca götürür. Verilen bilgiler modelin ötesine geçmiyorsa yoğunluk, sıcaklık veya tepkime hızı için yeni sayılar üretme. Kullanılan basitleştirmeyi açıkça söylemek konunun fiziksel anlamını korur.",
        ],
      },
    ],
    examples: [
      {
        title: "Hacim yarıya",
        prompt:
          "Sabit T, n koşulunda ideal gaz 3 L ve 2 atm. Hacim 1,5 L olursa P nedir?",
        strategy: "PV sabitliğini yalnız verilen sabitlerle kur.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "P₁V₁=2×3=6 atm L.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "P₂=6/1,5=4 atm.",
          },
          {
            label: "Sonucu denetle",
            explanation: "Hacim yarı olduğundan basınç iki kat; yön uygundur.",
          },
        ],
        answer: "4 atm",
        check: "4×1,5=6 atm L eski değeri verir.",
        pitfall: "Hacimle basıncı doğru orantılı alma.",
      },
      {
        title: "Kelvin oranı",
        prompt:
          "Sabit P, n altında ideal gaz 27 °C’de 3 L. 127 °C’de yaklaşık V nedir? 273 yaklaşımı kullan.",
        strategy: "Sıcaklıkları önce Kelvin yap.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "27+273=300 K; 127+273=400 K.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "V₂=3×400/300=4 L.",
          },
          {
            label: "Sonucu denetle",
            explanation: "Kelvin sıcaklığı 4/3 kat; hacim de 4/3 kattır.",
          },
        ],
        answer: "4 L",
        check: "3×127/27 değil,3×400/300 kullanılır.",
        pitfall: "Celsius sayılarını doğrudan oranlama.",
      },
      {
        title: "Kaynama yarısı",
        prompt:
          "1 g suyun modelinde sıvıyı 100 °C’ye getirmek için 752 J; buharlaşma için 2256 J gerek. Toplam 1880 J verildiğinde gaz kütle payı nedir?",
        strategy: "Önce duyulur ısıyı çıkar, kalanı gizli ısıya böl.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "1880−752=1128 J buharlaşmaya ayrılır.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "1128/2256=0,50.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Modelde %50 sıvı ve %50 gaz 100 °C’de birlikte bulunur.",
          },
        ],
        answer: "Gaz payı %50; sıcaklık 100 °C.",
        check: "Başlangıç ve tam gaz enerjisi arasında kalır.",
        pitfall: "Bütün 1880 J değerini doğrudan 2256’ya bölme.",
      },
      {
        title: "İyonlaşmada korunum",
        prompt:
          "On iki nötr atomdan beşi birer elektron kaybediyor. Pozitif iyon, serbest elektron, nötr atom ve toplam yükü bul.",
        strategy: "Her kopan elektron için bir+1 iyon oluşur.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Beş+1 iyon oluşur ve beş elektron serbest kalır.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "On iki−beş=yedi nötr atom kalır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Toplam yük 5(+1)+5(−1)=0 olur; negatif iyon şart değildir.",
          },
        ],
        answer: "5 iyon,5 elektron,7 nötr atom; net 0e.",
        check: "Çekirdek sayısı 5+7=12; elektronlar sayımda korunur.",
        pitfall: "Toplam nötrlüğü eşitpozitif/negatif iyon sayısına indirgeme.",
      },
    ],
    recall: [
      {
        prompt: "Gaz oranlarında neden Kelvin?",
        answer:
          "Mutlak sıcaklık enerjiyle ilişkili orantıyı verir; Celsius sıfırı keyfî referanstır.",
      },
      {
        prompt: "Plato sırasında enerji aktarılır mı?",
        answer: "Evet; faz miktarı değişebilirken sıcaklık sabit kalabilir.",
      },
      {
        prompt: "Aynı T’de farklı ideal gazların hangi ortalaması eşittir?",
        answer:
          "Ortalama öteleme kinetik enerjileri; ortalama hızları zorunlu eşit değildir.",
      },
      {
        prompt: "Negatif iyon olmadan yaklaşık nötrplazma olabilir mi?",
        answer:
          "Evet; pozitif iyon yükü serbest elektronların negatif yüküyle dengelenebilir.",
      },
    ],
    items: [
      [
        "273 yaklaşımıyla 27 °C kaç K?",
        "300",
        ["27", "246", "273", "327"],
        "Celsius değerine 273 ekle.",
        "T=27+273=300 K. Gaz bağıntılarında Celsius oranı kullanılmaz; tam dönüşüm 273,15 ile yapılabilir.",
      ],
      [
        "Sabit T, n koşulunda ideal gaz 4 L’de 1,5 atm. 2 L’de basınç kaçatm?",
        "3",
        ["0,75", "1,5", "2", "6"],
        "P₁V₁=P₂V₂ kullan.",
        "P₂=1,5×4/2=3 atm. Hacim yarıya inerken basınç iki katına çıkar.",
      ],
      [
        "Sabit P, n altında ideal gaz 300 K’de 2 L. 450 K’de kaç L?",
        "3",
        ["1", "1,33", "2", "4,5"],
        "V/T sabittir.",
        "V₂=2×450/300=3 L. Sıcaklık mutlak ölçekte %50 arttığından hacim de %50 artar.",
      ],
      [
        "Aynı sıcaklıktaki ideal He ve Ar gazları için hangisi zorunludur?",
        "Ortalama öteleme kinetik enerjileri eşittir.",
        [
          "Her atom aynı hızdadır.",
          "Ortalama hızları kesin eşittir.",
          "Mol kütleleri eşittir.",
          "Hacimleri her koşulda eşittir.",
        ],
        "Enerji ile hızı ayır.",
        "İdeal modelde ortalama öteleme enerjisi sıcaklıkla belirlenir. Kütleleri farklı olduğundan aynı enerji aynı ortalama hız anlamına gelmez.",
      ],
      [
        "Saf madde sabit basınçta erime platosunda ısı alıyor. Hangisi uygundur?",
        "Sıcaklık sabitken sıvı miktarı artabilir.",
        [
          "Enerji aktarımı sıfırdır.",
          "Madde zorunlu kimyasal ayrışır.",
          "Her tanecik tamamen hareketsizdir.",
          "Sıcaklık zorunlu her an artar.",
        ],
        "Gizli ısı ile sıcaklığı ayır.",
        "Enerji faz dönüşümüne gider; iki fazın payı değişirken sıcaklık sabit kalabilir. Bu kimyasal kimlik değişimi değildir.",
      ],
      [
        "Saf X’in erime noktası −10 °C, kaynama noktası 80 °C; aynı basınçta denge hâli soruluyor. 0 °C’de hangi faz?",
        "Sıvı",
        ["Katı", "Gaz", "Mutlaka katı+gaz", "Mutlaka sıvı+gaz"],
        "0 sayısını iki eşik arasına yerleştir.",
        "−10<0<80 olduğundan tek sıvı faz bölgesindedir. İki fazı eşiklerin tüm aralığına yaymak doğru değildir.",
      ],
      [
        "Altı nötr atom birer elektron kaybediyor. Oluşan+1 iyon ve serbest elektronların toplam yükü nedir?",
        "0e",
        ["+6e", "−6e", "+12e", "−12e"],
        "Her iyonla kopan elektronun yükünü birlikte say.",
        "Altı+1 iyon+6e, altıelektron−6e taşır. Toplam 0e; negatif iyon bulunması gerekmez.",
      ],
      [
        "Hangi gözlem tek başına plazma tanısı değildir?",
        "Maddenin sıcak bir kayaç eriyiği olması",
        [
          "Serbest elektronlarla iyonların birlikte bulunması",
          "Elektrik boşalmasında iyonlaşmış ortam kanıtı",
          "Hareketli yüklerin toplu elektromanyetik tepki göstermesi",
          "Uygun plazma lambasında yük taşıyıcıları",
        ],
        "Lav ile iyonlaşmış gazı ayır.",
        "Lav sıcak kayaç eriyiğidir; yüksek sıcaklık tek başına plazma koşullarını kanıtlamaz. İyonlaşma ve toplu yüklü davranış önemlidir.",
      ],
      [
        "Sabit net güç 100 W ile 5000 J enerji aktarılıyor. Süre kaçs?",
        "50",
        ["5", "10", "100", "500"],
        "t=Q/P yaz.",
        "5000/100=50 s. Sabitgüç koşulu enerji ile zaman eksenini ilişkilendirir; güç değişirse bu doğrusal dönüşüm tek başına kullanılamaz.",
      ],
      [
        "1,25 atm basınç kaç mmHg? 1 atm=760 mmHg.",
        "950",
        ["95", "608", "760", "1520"],
        "760 ile 1,25’i çarp.",
        "760×1,25=760+190=950 mmHg bulunur. Birim dönüşümü basıncın fiziksel büyüklüğünü değiştirmez.",
      ],
    ],
    source:
      "MEBİ TYT Kimya Konu Özetleri, basılı s. 50–53/PDF 52–55; Aurelia 027 Gazlar, Hâl Değişim Grafiği ve Plazma öğretim/örnek s. 1–4 ve yöntem bölümleriyle karşılaştırılan özgün anlatım. Model ideal varsayımları açıklar; resmî soru kopyası değildir.",
  },
  {
    id: "doga-ve-kimya",
    title: "Doğa ve kimya: su, hava ve kirlilik yolları",
    topic: "detail-166",
    minutes: 65,
    objectives: [
      "Suyun kaynaklarını, sertliği ve arıtma basamaklarını ayrı değerlendir.",
      "Kirletici → taşınma → etki → önlem zincirini nedenleriyle kur.",
      "Arıtım yüzdelerinde kalan miktarı hesapla; tek işlemden içilebilirlik sonucu çıkarma.",
    ],
    sections: [
      {
        title: "Su neden ortak bir yaşam ortamıdır?",
        paragraphs: [
          "Su hücresel olayların ortamı, birçok madde için çözücü, taşıma ve sıcaklık düzenlemenin önemli bileşenidir. Bitkiler suyu fotosentezde ve mineral taşınmasında kullanır; hayvanlarda dolaşım, sindirim ve atıkların uzaklaştırılması suyla ilişkilidir. Bütün canlıların su gereksiniminin aynı sayısal miktarda olduğunu söylemek gerekmez.",
          "Dünyadaki suyun büyük bölümü tuzludur; tatlı suyun da önemli kısmı buzullarda veya erişimi güç yerlerde bulunur. Bu nedenle toplam su bolluğu her yerde temiz kullanılabilir su bolluğu demek değildir. Yaklaşık küresel oranları ölçek fikri için kullan; bölgesel erişim, kuraklık ve kirlenme ayrıca değerlendirilir. Tek bir su tüketim sayısını herkes için sağlık önerisine dönüştürme.",
        ],
      },
      {
        title: "Su döngüsü arıtmaya eşit değildir",
        paragraphs: [
          "Buharlaşma, yoğuşma, yağış, yüzey akışı ve yeraltına sızma suyun çevrimini oluşturur. Buharlaşmada birçok çözünmüş tuz geride kalabilir; buna karşılık uçucu kirleticiler farklı davranabilir. Yağmur suyu havadaki maddelerle ve toplandığı yüzeylerle yeniden kirlenebilir. Doğal döngü her suyun otomatik içilebilir hâle geldiği anlamına gelmez.",
          "İçilebilirlik kimyasal, mikrobiyolojik ve fiziksel ölçütlerle değerlendirilir. Berraklık yalnız görünür parçacıkların azlığıdır; çözünmüş kirletici veya mikroorganizma yokluğunu kanıtlamaz. Arıtma modelindeki çubuklar öğrenme için verilmiş kurmaca miktarlardır; gerçek bir suyun içilmesinin güvenli olduğuna karar vermez. Farklı kirleticiye farklı basamak gerekir.",
        ],
      },
      {
        title: "Sertlik: iyonu ve etkiyi tanı",
        paragraphs: [
          "Suda Ca²⁺ ve Mg²⁺ gibi iyonların miktarı sertliğe önemli katkı verir. Sert su sabunla daha zor köpürebilir; bazı ısıtma koşullarında kireç birikimi boru ve ısıtıcı performansını etkiler. Çözünmüş iyon görmek suyun mutlaka zehirli veya mikrobiyolojik olarak kirli olduğunu göstermez. Sertlik ve bütün sağlık ölçütleri aynı kavram değildir.",
          "İyon değiştirici düzenekler sertliğe katkı veren iyonları başka iyonlarla değiştirebilir. Bu işlem suyun tamamen saf H₂O olması demek değildir; bütün çözünmüş maddeleri ve mikroorganizmaları otomatik kaldırmaz. Kaynatmak bazı geçici sertlik bileşenlerinde çökelmeye yardım edebilir; her sertliği ve her kimyasal kirleticiyi yok eder genellemesi geçersizdir.",
        ],
      },
      {
        title: "Arıtmayı hedefe göre seç",
        paragraphs: [
          "Süzme askıda katıların bir kısmını ayırabilir. Aktif karbon bazı organik maddeleri tutabilir; performans maddeye ve kullanım koşuluna bağlıdır. Dezenfeksiyon belirli koşullarda mikroorganizmaları etkisizleştirmeyi hedefler; çözünmüş tuzları tümüyle ayırmak için aynı mekanizma kullanılamaz. İyon değişimi ise belirli çözünmüş iyonları hedefler.",
          "Atölyede her işlem için açıkça verilmiş örnek uzaklaştırma yüzdesi uygulanır. Bunlar gerçek bir cihazın garanti verisi değildir. Başlangıç miktarından kalan miktar hesaplanır ve hedeflenmeyen bileşen aynı kalır. Filtreyi seçince bütün çubukların sıfıra düşmemesi, işlem seçiminin kirleticinin niteliğine bağlı olduğunu gösterir. Gerçek tesislerde kontrol ve ölçüm birçok basamakta sürer.",
        ],
      },
      {
        title: "Hava: sera etkisi ile ozonun konumu",
        paragraphs: [
          "Doğal sera etkisi yeryüzünün enerji dengesinin parçasıdır. CO₂, CH₄, su buharı ve diğer sera gazları kızılötesi ışınımla etkileşir; insan kaynaklı artışlar iklimi etkileyebilir. Sera etkisini bütün gazların her koşulda zehirli olmasıyla eşitleme. Bir gazın doğal bulunması artan derişimin hiçbir etkisi olmayacağı anlamına da gelmez.",
          "Stratosferdeki ozon Güneş’ten gelen morötesi ışınımın bir bölümünü soğurur; yere yakın ozon ise hava kirleticisi olabilir. CFC gibi ozon incelmesine katkı veren maddeler ile sera gazları kısmen örtüşebilir ama ozon incelmesi ve küresel ısınma aynı mekanizma değildir. Her modern soğutucu veya her sprey aynı kimyasal bileşimi taşımaz; maddeyi adıyla değerlendir.",
        ],
      },
      {
        title: "Asit yağmuru ve yanma kirleticileri",
        paragraphs: [
          "Fosil yakıt yanması ve bazı sanayi süreçleri SO₂ ve azot oksitlerin salımına katkı verir. Atmosferdeki yükseltgenme ve suyla ilişkili süreçler asidik bileşiklerin yağışla veya kuru birikimle taşınmasına yol açabilir. Bitkiler, sular, toprak ve yapı malzemeleri etkilenebilir. Asit yağmurunu yalnız CO₂’ye veya ozon deliğine bağlama.",
          "Eksik yanmada CO önemli bir tehlikedir; CO ile CO₂ aynı gaz değildir. Partikül maddeler de solunum ve görüş üzerinde etkili olabilir. NOₓ, güneş ışığı ve uçucu organik maddeler yere yakın ozon/sis oluşumu zincirlerine katılabilir. Her azot oksidi tek bir gaz gibi bütün etkileriyle özdeşleştirme; verilen kaynak ve reaksiyon bilgisine dayan.",
        ],
      },
      {
        title: "Suya besin fazlası ve oksijen dengesi",
        paragraphs: [
          "Fosfat ve nitrat içeren fazla girdiler bazı sularda alg ve diğer üreticilerin aşırı çoğalmasını destekleyebilir. Organik maddenin ayrışması çözünmüş oksijeni tüketerek diğer canlıları etkileyebilir. Ötrofikasyon zincirini besin girdisi → çoğalma → ayrışma/oksijen tüketimi olarak kurmak, yalnız suyun rengine bakmaktan daha açıklayıcıdır.",
          "Her deterjan aynı formülde değildir; bütün ürünlere tek bir fosfat miktarı atama. Atık yağlar, petrol türevleri, çözücüler ve endüstriyel atıklar farklı kimyasal ve fiziksel yollarla suya zarar verebilir. Bazı maddeler yüzey tabakası, bazıları çözünmüş toksisite veya oksijen gereksinimi oluşturur. Kaynağı azaltmak ve uygun arıtmak, tek bir evrensel kimyasal eklemekten farklıdır.",
        ],
      },
      {
        title: "Toprak, plastik, metal ve pil",
        paragraphs: [
          "Kalıcılığı yüksek plastik atıklar zamanla küçük parçalara ayrılıp çevrede taşınabilir; görünmez olmak ortadan kalkmak demek değildir. Atık pil, akü ve elektronik ürünler türlerine göre farklı metal ve kimyasallar içerir. Uygun toplama ve geri kazanım, bu maddelerin toprağa ve suya kontrolsüz geçişini azaltmaya yardım eder.",
          "Bazı metal iyonlarının zararlılığı kimyasal türüne, doza ve maruz kalma yoluna bağlıdır. Bütün metal atomlarını aynı zehirlilikte sayma veya tek bir yoğunluk eşiğini bütün sağlık sonucuna dönüştürme. Biyobirikim ve besin ağıyla taşınma bazı kirleticilerde önemlidir. Yalnız suda anlık ölçüm değil kaynak, süre ve canlıya ulaşan biçim de değerlendirilir.",
        ],
      },
      {
        title: "Önleme, tasarruf ve ölçülebilir karar",
        paragraphs: [
          "Musluk kaçağını gidermek, gereksiz akışı azaltmak, uygun sulama ve süreçlerde suyun yeniden kullanılması tüketimi düşürebilir. Kirliliği kaynağında önlemek, sonradan uzaklaştırmaya göre önemli avantaj sağlayabilir. Ancak yeniden kullanılacak suyun amacı ve gereken kalite koşulu belirlenmelidir; her geri kazanılmış su doğrudan içme suyu değildir.",
          "Bir önlemi değerlendirirken hangi kirleticiyi, hangi akış yolunda ve ne kadar azalttığını sor. Yüzde uzaklaştırmayı başlangıç miktarıyla çarpıp kalan yükü bul. İki işlem aynı kirletici üzerinde ardışıksa yüzdeler genellikle doğrudan toplanmaz; her işlem kendisine gelen miktarın belirli payını azaltır. Modeldeki sınırları gerçek çevre için garantiye dönüştürmeden hesap ve neden bağlantısını öğren.",
        ],
      },
    ],
    examples: [
      {
        title: "Kalan askıda katı",
        prompt:
          "20 L örnekte toplam 100 mg askıda katı var. Verilmiş filtre verimi %90. Son miktar ve derişim?",
        strategy: "Giderilen ve kalan payları ayır.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Giderilen 100×0,90=90 mg.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "Kalan 100−90=10 mg.",
          },
          {
            label: "Sonucu denetle",
            explanation: "Derişim 10/20=0,5 mg/L.",
          },
        ],
        answer: "10 mg ve 0,5 mg/L",
        check: "90+10=100 mg kütle hesabını sağlar.",
        pitfall: "%90 giderimi %90 kalır diye okuma.",
      },
      {
        title: "Hedeflenmeyen iyon",
        prompt:
          "Aynı örnekte 2000 mg sertlik eşdeğeri çözünmüş bileşen ve 100 mg askıda katı var. Yalnız katı tutan filtre %90 askıda katı ayırıyor. Sertlik ne olur?",
        strategy: "İşlemin hedefini verilen veriyle sınırla.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Filtre 100 mg askıda katının 90 mg kısmını tutar.",
          },
          {
            label: "İlişkiyi uygula",
            explanation:
              "Modelde çözünmüş iyon giderimi verilmemiştir; 2000 mg aynı kalır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Berraklaşma bütün çözünmüş iyonların yokluğu değildir.",
          },
        ],
        answer: "Sertlik eşdeğeri yük 2000 mg kalır.",
        check: "Askıda katı ve çözünmüş iyon farklı kategoridir.",
        pitfall: "Tek filtre ile bütün kimyasal kirleticiler giderildi deme.",
      },
      {
        title: "Ardışık yüzdeler",
        prompt:
          "Bir organik kirletici 80 mg. İlk işlem %50, ikinci işlem kendisine gelenden %75 uzaklaştırıyor. Son miktar?",
        strategy: "İkinci yüzdeyi başlangıca değil kalan miktara uygula.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "İlk işlemden sonra 80×0,50=40 mg kalır.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "İkinci işlemden sonra 40×0,25=10 mg kalır.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Toplam giderim 70/80=%87,5; yüzdeler %125 diye toplanmaz.",
          },
        ],
        answer: "10 mg; toplam giderim %87,5",
        check: "Kalan pay 0,50×0,25=0,125; 80×0,125=10.",
        pitfall: "Ardışık giderim yüzdelerini doğrudan toplama.",
      },
      {
        title: "Tasarrufun ölçüsü",
        prompt:
          "Bir musluk gereksiz açıkken dakikada 6 L akıtıyor. Günde 5 dakika gereksiz akış önlenirse 7 günde kaç L su tasarrufu olur?",
        strategy: "Debi, zaman ve gün sayısını birlikte çarp.",
        steps: [
          {
            label: "Veriyi ayır",
            explanation: "Günlük tasarruf 6×5=30 L.",
          },
          {
            label: "İlişkiyi uygula",
            explanation: "Yedi günlük 30×7=210 L.",
          },
          {
            label: "Sonucu denetle",
            explanation:
              "Bu hesap su miktarını verir; kalitesini veya bütün kullanım gereksinimini tek başına göstermez.",
          },
        ],
        answer: "210 L",
        check: "L/dk×dk/gün×gün=L birim kontrolü.",
        pitfall: "Gün sayısını veya debinin zaman birimini atlama.",
      },
    ],
    recall: [
      {
        prompt: "Berrak su neden otomatik içilebilir sayılmaz?",
        answer:
          "Çözünmüş kimyasallar ve mikroorganizmalar görünmeden bulunabilir.",
      },
      {
        prompt: "Sertlikte hangi iki iyon sık kullanılır?",
        answer:
          "Ca²⁺ ve Mg²⁺; sertlik bütün kirlenme ölçütleriyle aynı kavram değildir.",
      },
      {
        prompt: "Ozonun etkisinde konum neden önemlidir?",
        answer:
          "Stratosferde UV soğurur; yere yakın ozon hava kirleticisi olabilir.",
      },
      {
        prompt: "Ötrofikasyonda oksijen neden azalabilir?",
        answer:
          "Aşırı organik maddenin ayrışması çözünmüş oksijeni tüketebilir.",
      },
    ],
    items: [
      [
        "Suyun berrak görünmesi hangi sonucu tek başına kanıtlamaz?",
        "İçilebilirlik ölçütlerinin tamamını sağladığını",
        [
          "Görünür bulanıklığın az olabileceğini",
          "Işığı geçirebildiğini",
          "Sıvı olarak gözlendiğini",
          "Renginin açık görünebildiğini",
        ],
        "Görünmeyen kirleticileri düşün.",
        "Çözünmüş kimyasal veya mikroorganizmalar berrak suda da bulunabilir. İçilebilirlik farklı ölçütlerle kontrol edilir.",
      ],
      [
        "Su sertliğine yaygın katkı veren iyon çifti hangisi?",
        "Ca²⁺ ve Mg²⁺",
        ["Na⁺ ve K⁺", "H₂ ve O₂", "He ve Ne", "Cl₂ ve N₂"],
        "Sertlik iyonlarını çözünmüş gazlarla karıştırma.",
        "Kalsiyum ve magnezyum iyonları sertlikte önemlidir; sabun tüketimi ve kireçlenme gibi etkilerle ilişkilidir.",
      ],
      [
        "Verilmiş bir filtre yalnız askıda katının %80’ini tutuyor. 100 mg askıda katıdan kaçmg kalır?",
        "20",
        ["0", "80", "100", "125"],
        "Kalanpay %20.",
        "100×(1−0,80)=20 mg. Uzaklaştırılan 80 mg ile kalan 20 mg toplamı başlangıç 100 mg eder.",
      ],
      [
        "Bir işlem çözünmüş iyonları azaltıyor fakat mikrop giderimi verilmemiş. Hangi çıkarım uygundur?",
        "Tek başına mikrobiyolojik güvenlik kanıtlanamaz.",
        [
          "Bütün mikroorganizmalar mutlaka yoktur.",
          "Su kesin saf H₂O olmuştur.",
          "Su otomatik her amaçla kullanılabilir.",
          "Suda hiçiyon kalmaması gerekir.",
        ],
        "Her işlem kendi hedefiyle değerlendirilir.",
        "İyon giderme ve dezenfeksiyon ayrı amaçlardır. Verilmeyen bir mikrop giderimini varsaymak içilebilirlik konusunda yanlış güven üretir.",
      ],
      [
        "Stratosferik ozon ileyere yakın ozon için hangisi uygundur?",
        "Konumlarına göre koruyucu ve kirletici roller ayrılabilir.",
        [
          "İkisi de yalnız su sertliğidir.",
          "Herikisinin etkisi her koşulda aynıdır.",
          "Ozon bütün atmosferde yalnız yararlıdır.",
          "Ozon hiçbir ışınımla etkileşmez.",
        ],
        "Atmosfer katmanını sor.",
        "Stratosferdeki ozon UV ışınımının bir bölümünü soğurur; yere yakın ozon hava kalitesini bozabilir. Aynı molekülün ortamı önemlidir.",
      ],
      [
        "SO₂ ve NOₓ kaynaklı atmosferik süreçler hangi çevresel olayla ilişkilidir?",
        "Asidik birikim ve asit yağmurları",
        [
          "Suyun yalnız Ca²⁺sertliği",
          "Buzun erimesinde H₂ üretimi",
          "Tüm atmosferin CO’ya dönüşmesi",
          "Bütün plastiklerin anında yok oluşu",
        ],
        "Oksitlerden asidik ürünlere giden yolu izle.",
        "Kükürt ve azot oksitler yükseltgenme/suyla ilişkili süreçlerle asidik bileşiklere katkı verebilir. Etkiyi yalnız ozon deliği veya su sertliğiyle eşitleme.",
      ],
      [
        "Bir göle fazla besin girdisi →aşırı alg →organik maddenin ayrışması zinciri hangi riski açıklar?",
        "Çözünmüş oksijenin azalması",
        [
          "Suyun mutlaka saf hâle gelmesi",
          "Bütün iyonların elektrona dönüşmesi",
          "Buzun katılaşması",
          "Atmosfer basıncının sıfırlanması",
        ],
        "Ayrıştırıcıların oksijen tüketimini düşün.",
        "Ayrışma çözünmüş oksijen gereksinimini artırabilir ve diğer canlıları etkileyebilir. Bu ötrofikasyon zinciridir; yalnızsu renginden güvenlik sonucu çıkarılmaz.",
      ],
      [
        "80 mg kirleticinin önce %50’si, sonra kalanın %50’si uzaklaştırılıyor. Kaçmg kalır?",
        "20",
        ["0", "40", "50", "80"],
        "İkinci yüzdeyi ilk kalana uygula.",
        "İlkinden 40 mg, ikinciden 20 mg kalır. Toplam giderim %75’tir; %50+%50 diye %100 olmaz.",
      ],
      [
        "Atık pil ve aküler için uygun ilk davranış hangisi?",
        "İçeriğine uygun ayrı toplama ve geri kazanıma yönlendirmek",
        [
          "Toprağa gömmek",
          "Lavaboya kimyasallarını boşaltmak",
          "İçindekileri evde yakmak",
          "Her pilin aynı zararsız maddeden oluştuğunu varsaymak",
        ],
        "Kontrolsüz çevreye geçişi azalt.",
        "Farklı piller farklı metal ve elektrolitler içerir. Uygun toplama kontrolsüz su/toprak kirlenmesini azaltmaya yardımcı olur; evde parçalama veya yakma öğretilmez.",
      ],
      [
        "Bir musluk 4 L/dk gereksiz akıyor. Günde 3 dakika bu akış önlenirse 5 günde kaç L tasarruf olur?",
        "60",
        ["12", "15", "20", "120"],
        "Debi × günlük süre×gün sayısı.",
        "4×3×5=60 L. Hesap tüketim miktarını gösterir; suyun kalitesi veya bütün ihtiyaçların karşılandığı anlamına gelmez.",
      ],
    ],
    source:
      "MEBİ TYT Kimya Konu Özetleri, basılı s. 54–58/PDF 56–60 doğrudan incelenerek hazırlanan özgün öğretim, kurmaca arıtım verileri ve alıştırmalar. Bu başlık için ayrı Aurelia 028 dosyası incelenmedi; hiçbir gerçek suya içilebilirlik onayı verilmez.",
  },
];

type Item = [string, string, string[], string, string];
export const forge012ChemistryGuides: LessonGuide[] = unitData.map(
  ({ items, title, topic, ...guide }) => guide,
);
export const forge012ChemistryTopics: Record<string, string> =
  Object.fromEntries(unitData.map((u) => [u.id, u.topic]));
export const forge012ChemistryLessons: Lesson[] = unitData.map((u) => ({
  id: u.id,
  subjectId: "tyt-kimya",
  title: txt(u.title),
  minutes: u.minutes,
  objectives: u.objectives.map(txt),
  body: u.sections.map((s) => ({
    title: txt(s.title),
    text: txt(s.paragraphs.join("\n\n")),
  })),
  questions: (u.items as Item[]).map(
    ([prompt, correct, wrong, hint, explanation], i): Question => {
      const answer = i % 5,
        options = [...wrong];
      options.splice(answer, 0, correct);
      return {
        id: `f012-chem-${u.id}-${i + 1}`,
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
