import { txt, type Lesson } from "../domain/model";
import type { GuideSection, LessonGuide, WorkedExample } from "./guides/types";
import { brickPressureExample, brickPressureSection, uprightPrismSection } from "./mebiSolidPressure";

type Q = [string, string[], string, string];
type Pack = {
  id: string;
  topic: string;
  title: string;
  minutes: number;
  pages: string;
  paper: string;
  objectives: string[];
  sections: GuideSection[];
  examples: WorkedExample[];
  recall: { prompt: string; answer: string }[];
  questions: Q[];
};
const s = (title: string, a: string, b: string): GuideSection => ({
  title,
  paragraphs: [a, b],
});
const ex = (
  title: string,
  prompt: string,
  strategy: string,
  steps: [string, string, string?][],
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
    expression,
  })),
  answer,
  check,
  pitfall,
});
const pressure: Pack = {
  id: "basinc",
  topic: "detail-125",
  title: "Basınç: kuvvetten akışkan dengesine",
  minutes: 65,
  pages: "130–143",
  paper: "012 Basınç",
  objectives: [
    "Basınç ile yüzeye aktarılan dik kuvveti ayır; destek ve alan koşullarını denetle.",
    "Durgun sıvı, Pascal, manometre ve gaz modellerini uygun sabitlerle kur.",
    "Kap şekli, yüzey basıncı, kelvin ve akış koşullarından doğan tuzakları açıkla.",
  ],
  sections: [
    s(
      "Birim alana düşen etkiyi düşün",
      "Basınç, yüzeye dik kuvvetin birim alandaki etkisidir. Düz yüzeye düzgün dağılan dik kuvvet için P=F⊥/A yazılır; SI birimi Pa=N/m²’dir. Kuvvet vektörel, basınç skaler bir büyüklüktür. Aynı 60 N yük, 0,03 m²’de 2000 Pa, 0,01 m²’de 6000 Pa yapar. Keskin bıçağın küçük temas alanı, eşit kuvvetle daha büyük yerel basınç oluşturabilir.",
      "Bir yüzeyin her noktasındaki basınç aynı değilse tek bir P ile çarpım ancak ortalama basınç için kullanılabilir. Alan cm² ise önce m²’ye çevir: 1 cm²=10⁻⁴ m². Şekildeki yatay uzunluk ile temas alanı aynı nicelik değildir; iki kenarın da değişmesi alan oranını değiştirebilir. P ile F’yi ayrı satırlara yazmak birim ve anlam karışmasını önler.",
    ),
    s(
      "Katıda önce destek kuvvetini bul",
      "Yatay zeminde duran ve yalnız ağırlık ile zemin kuvveti etkisindeki cismin zemine uyguladığı dik kuvvet mg’dir. Fakat yukarı çeken ip, dışarıdan bastırma veya ivme varsa F=mg kestirmesi otomatik geçmez. Durgun cisimde yukarı destek T varsa N+T=mg; zemine uygulanan ortalama basınç N/A olur. Hareket etmiyor olması bütün kuvvetlerin ağırlığa eşit olduğu anlamına gelmez.",
      "Bir blok yan çevrilince ağırlık aynı kalabilir, taban alanı değiştiği için basınç değişebilir. İki özdeş blok yan yana konunca yük ve temas alanı birlikte iki katına çıkarsa basınç sabit kalır. Aynı maddeden homojen dik prizma için P=ρgh özel sonucu, V=Ah ve yalnız kendi ağırlığı koşullarından türetilir. Her eğri veya basamaklı cismin en büyük yüksekliğini bu formüle yerleştirme.",
    ),
    brickPressureSection,
    uprightPrismSection,
    s(
      "Durgun sıvıda düşey derinliği ölç",
      "Homojen, durgun ve yaklaşık sıkıştırılamaz sıvıda yüzeyden h düşey derinlikte basınç artışı ρgh’dir. Yüzey basıncı P₀ ise mutlak basınç P=P₀+ρgh olur. Aynı bağlı sıvıda aynı yatay seviyedeki basınçlar eşittir; aynı derinlikte ayrı kapları karşılaştırırken yüzey basınçları ve sıvı yoğunlukları da aynı olmalıdır.",
      "h, eğik borunun veya kıvrımlı yolun uzunluğu değildir. Sıvı basıncı yalnız tabana değil her temas yüzeyine dik etki eder. Kap genişliği, aynı h ve ρ altında bir noktanın basıncını doğrudan değiştirmez. Sabit debili musluk genişleyen kabı doldururken h artışı yavaşlayabilir; dolayısıyla P–zaman grafiği düz çizgi olmak zorunda değildir. Önce hacmin yüksekliğe nasıl dönüştüğünü belirle.",
    ),
    s(
      "Katmanları ve taban kuvvetini ayrı hesapla",
      "Karışmayan, üst üste duran sıvılarda her katmanın ρgh katkısı toplanır. Üstteki gaz basıncı da ayrıca eklenir. Aynı bağlı alt sıvıda bir yatay denge seviyesi seçmek, farklı kollardaki sıvı sütunlarını karşılaştırmayı kolaylaştırır. Başka yoğunluklu iki sıvının yalnız serbest yüzey yüksekliklerini eşitlemek doğru bir denge denklemi kurmaz.",
      "Yatay taban boyunca basınç düzgünse taban kuvveti PtabanA olur. Ancak sıvı ağırlığı ρVg’dir; V=Ah olmayan kapta sıvı kaynaklı taban kuvveti sıvı ağırlığına eşit çıkmayabilir. Eğik yan yüzeyler düşey kuvvet bileşenleri taşır. Kabın zemine toplam yükü ise dış destek ve taşma yoksa kap ile içindekilerin toplam ağırlığıyla belirlenir; iki farklı yüzeydeki kuvveti birbirine karıştırma.",
    ),
    s(
      "Pascal basınç değişimini iletir, kuvveti eşitlemez",
      "Kapalı sıvıya dışarıdan uygulanan basınç değişimi ideal statik koşullarda sıvıya iletilir. Bu, farklı derinliklerdeki toplam basıncın aynı olduğu anlamına gelmez; başlangıçtaki ρgh farkı korunur. Aynı seviyede, sürtünmesiz ve ağırlığı ihmal edilen iki pistonda F₁/A₁=F₂/A₂ yazılabilir. Büyük piston daha büyük kuvvet üretirken basınç artışı aynıdır.",
      "Sıkıştırılamaz sıvı ve sızıntısız pistonlarda A₁x₁=A₂x₂ hacim korunumu vardır. Büyük kuvvet elde edilen piston daha az yol alır; ideal iş F₁x₁=F₂x₂ korunur. Hidrolik fren ve kaldırıcılar bu ilişkiyi kullanır, bedelsiz enerji üretmez. Pistonlar farklı yükseklikte, ağır veya sürtünmeli ise basit kuvvet/alan eşitliğine ilgili yük ve derinlik terimlerini eklemek gerekir.",
    ),
    s(
      "Gaz karşılaştırmasında neyin sabit olduğunu yaz",
      "Gazın çeperlere çarpışmaları basınç oluşturur. İdeal gaz için PV=nRT; aynı n ve V’de P/T, aynı n ve T’de PV, aynı n ve P’de V/T sabittir. T mutlaka kelvindir. Sıcaklığın 20 °C’den 40 °C’ye çıkması kelvin sıcaklığının iki kat olması değildir. İki değişken aynı anda değişiyorsa oran biçimiyle bütün verilenleri kullan.",
      "Hareketli, sürtünmesiz ve sabit yüklü pistonun son dengesinde gaz basıncı dış basınç ve piston yüküyle belirlenir; ısıtma çoğunlukla hacmi değiştirir. Rijit kapta ise hacim sabittir ve aynı ısıtma basıncı artırabilir. Balon zarının gerilimi ihmal edilmiyorsa iç basınç dış basınca tam eşit olmak zorunda değildir. Esnek veya kapalı sözcüğü tek başına hangi niceliğin sabit olduğunu söylemez.",
    ),
    s(
      "Barometrede sütunun düşey yüksekliğine bak",
      "Atmosferin ağırlığına bağlı basınç yükseklik ve hava koşullarıyla değişir. Üstü yaklaşık vakum olan sıvılı barometrede P₀≈ρgh olur. Sütun eğilirse boru boyunca sıvı uzunluğu değişebilir; ölçülen basıncı belirleyen düşey h’dir. Daha düşük yoğunluklu sıvı, aynı P₀ için daha yüksek sütun gerektirir; kılcallık ihmal edilmiştir.",
      "1 atm tanımlı basınç birimidir ve yaklaşık 101325 Pa’dır; 76 cmHg olağan referans karşılığıdır, her şehirde ve her anda gerçek atmosfer basıncı değildir. Barometre dış basıncı ölçer, altimetre basınçtan yükseklik tahmin eder, batimetre su basıncından derinlik türetir. Ölçüm ile türetilen değeri ayır; sıcaklık, sıvı yoğunluğu ve kalibrasyon varsayımları sonuçta etkilidir.",
    ),
    s(
      "Manometrede işareti sıvı dengesi belirler",
      "Açık uçlu manometrede aynı sıvıda aşağı inerken basınç artar, yukarı çıkarken azalır. Gaz kolundaki sıvı yüzeyi açık koldan daha alçaksa Pgaz=P₀+ρgΔh; gaz kolu daha yüksekse Pgaz=P₀−ρgΔh olur. Δh iki yüzeyin düşey farkıdır. İşareti borunun çizimde sağda veya solda olmasına göre ezberleme.",
      "Kapalı kolun üstünde gerçek vakum kabul ediliyorsa o yüzeyin basıncı yaklaşık sıfırdır; ölçülen ρgΔh mutlak gaz basıncıdır. Kapalı uçta gaz veya önemli buhar basıncı varsa sıfır varsayımı değişir. Manometre sıvısının yoğunluğunu kullan; ölçülen gazın yoğunluğunu yanlışlıkla ρ yerine koyma. Pa ile cmHg aynı toplamda kullanılacaksa önce birimleri uyumlu hâle getir.",
    ),
    s(
      "Basıncın hâl değişimine etkisini koşullandır",
      "Kaynama, sıvının buhar basıncının dış basınca ulaşmasıyla ilişkilidir. Dış basınç artarsa aynı saf sıvının kaynama sıcaklığı genellikle yükselir; yüksek rakımda basınç daha düşük olduğundan su daha düşük sıcaklıkta kaynayabilir. Bu, her koşulda daha kısa sürede kaynar iddiası değildir; ısıtıcı gücü ve başlangıç sıcaklığı da süreyi belirler.",
      "Basınç erimeyi her maddede aynı yönde etkilemez. Buz gibi erirken hacmi azalan maddelerde basınç artışı erime sıcaklığını düşürebilir; erirken hacmi artan maddelerde ters eğilim beklenir. Dağdaki karın kalmasını tek başına basınçla açıklama; ortam sıcaklığı, ışınım ve hava koşulları da önemlidir. Düdüklü tencere örneğinde belirli bir cihazın güvenli sıcaklığını evrensel sabit sanma.",
    ),
    s(
      "Akış varsa durgun sıvı kuralını kör uygulama",
      "Kararlı, sıkıştırılamaz ve sürtünme kayıpları ihmal edilen akışta aynı akım çizgisi boyunca P+ρv²/2+ρgh sabittir. Aynı yükseklikte daralan boruda süreklilik nedeniyle hız artarken statik basınç azalabilir. Farklı yükseklik veya pompa/kayıp varsa yalnız 'hızlı olan düşük basınçlıdır' cümlesi yeterli değildir.",
      "Yük gemisinin durgun suda yüzmesi temel olarak Arşimet kaldırmasıyla açıklanır; Bernoulli’yi bütün kaldırma olaylarının ortak formülü yapma. Sprey ve dar boru uygulamalarında basınç farkını, akış geometrisini ve açık yüzeye etki eden atmosferi birlikte düşün. Bu dersin etkileşimli sıvı modeli durgundur; Bernoulli grafiği veya gerçek gaz akışı simülasyonu gibi yorumlanmaz.",
    ),
  ],
  examples: [
    ex(
      "Destek varken zemindeki basınç",
      "8 kg blok 0,02 m² alana oturuyor. Yukarıdaki ip 30 N taşıyor; blok durgun, g=10. Zemindeki ortalama basınç?",
      "Önce düşey dengeyi kur, ardından zemine aktarılan kuvveti alanla böl.",
      [
        ["Ağırlık", "Kütleyi kuvvete dönüştür.", "G=8·10=80 N"],
        ["Destek", "İp zeminin taşıyacağı yükü azaltır.", "N=80−30=50 N"],
        [
          "Basınç",
          "Yalnız zemine etki eden kuvveti kullan.",
          "P=50/0,02=2500 Pa",
        ],
      ],
      "2500 Pa",
      "İp yokken 4000 Pa olurdu; destek sonucu azaltmıştır.",
      "Blok duruyor diye N=mg yazmak ipi yok sayar.",
    ),
    ex(
      "İki sıvı ve mutlak basınç",
      "Açık kapta altta 0,3 m su (1000 kg/m³), üstte 0,2 m yağ (800 kg/m³) var. P₀=100 kPa, g=10. Tabanın mutlak basıncı?",
      "Her katmanı ayrı hesapla, aynı birimde topla.",
      [
        [
          "Su",
          "Alt katmanın kendi yüksekliğini al.",
          "ΔPsu=1000·10·0,3=3000 Pa",
        ],
        [
          "Yağ",
          "Üst katman da basınca katkı yapar.",
          "ΔPyağ=800·10·0,2=1600 Pa",
        ],
        ["Toplam", "Yüzey basıncını ekle.", "P=100000+3000+1600=104600 Pa"],
      ],
      "104,6 kPa",
      "Sıvıların katkısı 4,6 kPa, mutlak basınç daha büyüktür.",
      "Bütün 0,5 m için su yoğunluğu kullanmak iki farklı sıvıyı birleştirir.",
    ),
    ex(
      "Hidrolikte yolun bedeli",
      "Aynı seviyedeki ideal piston alanları 4 ve 20 cm². Küçük pistona 60 N uygulanıp 10 cm ilerletiliyor. Büyük piston kuvveti ve yolu?",
      "Basınç eşitliği ile hacim korunumu iki ayrı sonuç verir.",
      [
        ["Alan oranı", "Aynı birimde oran al.", "A₂/A₁=20/4=5"],
        [
          "Kuvvet",
          "Alan beş kat olduğu için aynı basınçta kuvvet beş kattır.",
          "F₂=60·5=300 N",
        ],
        ["Yol", "Yer değiştiren sıvı hacmini eşitle.", "x₂=4·10/20=2 cm"],
      ],
      "300 N ve 2 cm",
      "60·0,10=300·0,02=6 J.",
      "Büyük kuvvet ile büyük yolu aynı anda kazanmak enerji korunumu ihlalidir.",
    ),
    ex(
      "Manometrede eksi yönü",
      "Açık uçlu su manometresinde gaz kolundaki yüzey açık koldakinden 0,4 m daha yüksek. P₀=100000 Pa, ρ=1000 kg/m³ ve g=10. Gaz basıncı?",
      "Yüksek sıvı yüzeyinin üstündeki gazın daha düşük basınçlı olduğunu dengeyle göster.",
      [
        ["Sütun farkı", "Düşey farkı kullan.", "ρgΔh=1000·10·0,4=4000 Pa"],
        [
          "Seviye denklemi",
          "Gaz yüzeyinden aşağı açık yüzey seviyesine inince 4000 Pa eklenir.",
          "Pgaz+4000=P₀",
        ],
        ["Sonuç", "Dış basınçtan farkı çıkar.", "Pgaz=96000 Pa"],
      ],
      "96 kPa",
      "Atmosferden küçük olduğu için gaz kolunun daha yüksek olmasıyla uyumludur.",
      "Gaz çizimde solda diye otomatik artı seçilmez.",
    ),
    brickPressureExample,
  ],
  recall: [
    {
      prompt: "Basınç kuvveti her durumda mg midir?",
      answer: "Hayır; gerçek destek, dış kuvvet ve ivme durumundan bulunur.",
    },
    {
      prompt: "Durgun sıvıda aynı derinlik yeterli mi?",
      answer:
        "Yoğunluk ve yüzey basıncı da aynı olmalıdır; bağlı aynı sıvının aynı seviyesi dengede eşittir.",
    },
    {
      prompt: "Pascal neyi iletir?",
      answer:
        "Uygulanan basınç değişimini; alanlar farklıysa kuvvetler farklı olabilir.",
    },
    {
      prompt: "Manometrede gaz kolu yüksekse?",
      answer: "Açık kola göre gaz basıncı daha küçüktür: Pgaz=P₀−ρgΔh.",
    },
    {
      prompt: "Gaz oranlarında hangi sıcaklık?",
      answer:
        "Mutlak kelvin sıcaklığı; Celsius sayısının katı basınç oranı değildir.",
    },
  ],
  questions: [
    [
      "Durgun 50 N yükün temas alanı 0,025 m²’dir. Yük düzgün dağılıyorsa ortalama basınç kaç Pa’dır?",
      ["2000", "2", "1250", "20", "20000"],
      "P=F/A yaz; alan zaten m².",
      "50/0,025=2000 Pa. 1250 kuvvet/alan hesabını sağlamaz; 2 sonucu kPa olarak yazılabilse de kök Pa ister. Kuvveti ve basıncı aynı sayma.",
    ],
    [
      "Yatay zemindeki 10 kg blok yukarıdan 40 N’luk iple destekleniyor ve durgun. Temas alanı 0,03 m², g=10 m/s². Zemine uyguladığı basınç kaç Pa?",
      ["2000", "3333,3", "4666,7", "400", "60"],
      "N+T=mg; sonra N/A.",
      "G=100 N, N=100−40=60 N; P=60/0,03=2000 Pa. İpin yukarı desteği zemine aktarılan yükü azaltır; mg/A bütün yükü zemine yükler, 60 ise yalnız kuvvettir.",
    ],
    [
      "Açık kapta yoğunluğu 800 kg/m³ olan durgun sıvının yüzeyinden 0,5 m derindeki sıvı kaynaklı basınç kaç Pa? g=10 m/s²; atmosfer basıncı 100000 Pa.",
      ["4000", "104000", "400", "8000", "50000"],
      "Sıvı kaynaklı ifadesi yalnız ρgh ister.",
      "ΔP=800·10·0,5=4000 Pa. 104000 Pa mutlak basınç olur; kökte yüzey basıncı dahil istenmedi. ρ, g ve düşey h’yi birlikte kullan.",
    ],
    [
      "İki ayrı açık kapta aynı sıcaklıktaki su var. Atmosfer basınçları eşit; K ve L noktaları kendi yüzeylerinden 0,4 m derinde. Kapların şekilleri ve toplam su miktarları farklı. PK/PL nedir?",
      ["1", "2", "1/2", "4", "Yalnız su miktarıyla bulunur"],
      "Aynı P₀,ρ,g,h altında kap şekli nokta basıncını değiştirmez.",
      "Her iki noktada P=P₀+ρg·0,4 olduğundan oran 1’dir. Farklı su miktarı aynı düşey derinlikte farklı basınç zorunluluğu doğurmaz; taban kuvvetlerinin eşitliği ayrıca alan gerektirir.",
    ],
    [
      "Aynı seviyedeki sürtünmesiz, ağırlıksız ideal pistonlarda alanlar 3 ve 12 cm²’dir. Küçük pistona 45 N uygulanıyor. Büyük pistonda dengelenen kuvvet kaç N?",
      ["180", "45", "11,25", "540", "4"],
      "Basınç eşitliği kuvvet eşitliği değildir.",
      "F₂=45·12/3=180 N. Alan oranı 4’tür; 45 N kuvveti aynen iletmek ve 4 N yazmak basınç ile kuvveti karıştırır. İş kazanımı yoktur, büyük piston daha az yol alır.",
    ],
    [
      "Sabit miktarda ideal gaz rijit kapta 300 K’den 450 K’ye ısıtılıyor. İlk basıncı 80 kPa ise son basıncı kaç kPa?",
      ["120", "80", "53,3", "160", "200"],
      "n ve V sabit: P/T sabit.",
      "P₂=80·450/300=120 kPa. 80 kPa sabit yüklü hareketli piston durumuna ait olabilir; burada kap rijittir. Sıcaklıklar zaten kelvindir; ayrıca 273 ekleme.",
    ],
    [
      "Açık uçlu su manometresinde gaz kolundaki sıvı yüzeyi açık koldan 0,2 m alçaktır. P₀=100000 Pa, ρ=1000 kg/m³, g=10. Pgaz kaç Pa?",
      ["102000", "98000", "2000", "100200", "120000"],
      "Gaz sıvıyı daha aşağı ittiği için basıncı dışarıdan büyüktür.",
      "Fark ρgΔh=2000 Pa; Pgaz=P₀+2000=102000 Pa. 98000 ters seviye durumudur, 2000 yalnız basınç farkıdır. 0,2 m ile 20 cm’yi karıştırma.",
    ],
    [
      "Üstü yaklaşık vakum olan ideal sıvılı barometrede dış basınç ve g sabit tutuluyor. Kullanılan sıvının yoğunluğu yarıya inerse dengedeki düşey sütun yüksekliği nasıl değişir?",
      [
        "İki katına çıkar",
        "Yarıya iner",
        "Aynı kalır",
        "Dört katına çıkar",
        "Sıfır olur",
      ],
      "P₀=ρgh; sabit çarpımda ρ azalınca h artar.",
      "h=P₀/(ρg) olduğundan yoğunluk yarıya inerse yükseklik iki katına çıkar. Bu sonuç yeterince uzun boru ve ihmal edilebilir buhar/kılcallık koşulundadır; boru boyunca eğik uzunlukla değil düşey yükseklikle ilgilidir.",
    ],
    [
      "Düz taban alanı 0,02 m² olan kapta tabanın her noktasındaki sıvı kaynaklı basınç 3000 Pa. Sıvının tabana uyguladığı bu basınç kuvveti kaç N?",
      ["60", "150000", "6000", "0,06", "3000"],
      "Düzgün basınçta F=PA.",
      "F=3000·0,02=60 N. Pa·m²=N olur. Tüm kap şekli verilmediği için bu kuvvetten sıvının bütün ağırlığının 60 N olduğu koşulsuz çıkarılamaz; eğik yan duvarlar düşey kuvvet taşır.",
    ],
    [
      "Aynı yükseklikte kararlı, sıkıştırılamaz, kayıpsız akış olan yatay boru daralıyor. Debi sabit; pompa yok. Dar bölümde geniş bölüme göre hangisi beklenir?",
      [
        "Hız artar, statik basınç azalır",
        "Hız ve statik basınç birlikte artar",
        "Hız azalır, statik basınç artar",
        "Hız ve basınç mutlaka eşit kalır",
        "Basınç her durumda sıfır olur",
      ],
      "Süreklilik ve aynı akım çizgisinde Bernoulli’yi birlikte düşün.",
      "Kesit küçülürken Av sabitliği v’yi artırır; aynı yükseklikte P+ρv²/2 sabit olduğundan statik P azalır. Sonuç verilen kararlı/kayıpsız koşullar içindir, bütün rüzgâr olayları için koşulsuz bir yasa cümlesi değildir.",
    ],
  ],
};
const buoyancy: Pack = {
  id: "sivilarin-kaldirma-kuvveti",
  topic: "detail-126",
  title: "Sıvılarda kaldırma kuvveti: yer değiştiren hacmi izle",
  minutes: 55,
  pages: "144–146",
  paper: "013 Sıvılarda Kaldırma Kuvveti",
  objectives: [
    "Arşimet bağıntısını basınç farkından kur; batan hacim ile bütün hacmi ayır.",
    "Serbest yüzme, askıda kalma, batma ve dış kuvvetli dengeyi farklı çiz.",
    "Taşırma, dinamometre ve tekne örneklerinde hacim ve kuvvet bilançosu yap.",
  ],
  sections: [
    s(
      "Kaldırma alt ve üst basıncın farkından doğar",
      "Durgun sıvıda derine indikçe basınç arttığı için sıvının cismin alt yüzeyine uyguladığı yukarı kuvvet üst yüzeyindeki aşağı kuvvetten büyük olabilir. Her yüzeydeki basınç kuvvetlerinin vektörel toplamı kaldırma kuvvetidir. Homojen sıvıya batmış, çevresi sıvıyla temas eden cisim için sonuç Fk=ρsıvıgVb’dir. Vb sıvı içinde kalan, sıvının yerini alan hacimdir.",
      "Cisim daha ağır olduğu için kaldırma kuvveti otomatik daha büyük olmaz. Aynı sıvıda aynı batık hacme sahip farklı kütleli cisimler aynı kaldırmayı görebilir; hareketleri ise Fk ile ağırlıklarının farkına bağlıdır. Alt yüzeyin sıvıya tamamen kapandığı özel taban temaslarında standart Arşimet varsayımını denetle. Modelimiz sıvının cismin altına eriştiği ideal durumu ele alır.",
    ),
    s(
      "Arşimet: yer değiştiren sıvının ağırlığı",
      "Yer değiştiren sıvının kütlesi ρsVb, ağırlığı ρsVbg’dir; Arşimet ilkesi kaldırma büyüklüğünün bu ağırlığa eşit olduğunu söyler. Formüldeki ρ cisme değil çevredeki sıvıya aittir. Tam batık katı için Vb toplam hacim, kısmen yüzen için yalnız su çizgisinin altındaki hacimdir. 1 L=10⁻³ m³ dönüşümünü baştan yap.",
      "Bir cisim yüzmese de yer değiştiren sıvı kadar kaldırma görür. Ağır bir metalin batması kaldırmanın yok olduğunu değil, ağırlığını karşılayamadığını gösterebilir. Aynı hacim su ve yağ içinde farklı Fk üretebilir; yalnız hacim eşitliği yetmez, ρs ve g de aynı olmalıdır. Şeklin çizimdeki alanından sayısal hacim oranı çıkarma; verilen boyut veya denge bilgisini kullan.",
    ),
    s(
      "Serbest yüzmede önce Fk=G yaz",
      "Durgun sıvıda dış destek ve belirgin yüzey gerilimi etkisi olmadan serbest yüzen cisim için Fk=mg’dir. Aynı cismin farklı sıvılarda serbest yüzmesi hâlinde ağırlık aynı olduğu için kaldırma aynı kalır; değişen batan hacimdir. Daha yoğun sıvı aynı ağırlığı daha küçük Vb ile taşıyabilir. Tuzlu suda daha az batmanın anlamı daha büyük denge kaldırması değildir.",
      "Homojen cisim için m=ρcV olduğundan Vb/V=ρc/ρs elde edilir. Bu oran 0 ile 1 arasında olmalı; 1’den büyük çıkıyorsa cisim bu koşullarda kısmi yüzemez. İçi boş gemide toplam kütleyi bütün dış hacme bölerek ortalama yoğunluk düşünülür. Çelik malzemenin yoğun olması tek başına geminin batmasını gerektirmez; su alan gövde toplam kütle ve kullanılabilir yer değiştirme hacmini değiştirir.",
    ),
    s(
      "Askıda kalma ile dibe oturmayı ayır",
      "Homojen sıvıda tamamı batık, dış kuvvetsiz ve dengedeki cismin ortalama yoğunluğu sıvı yoğunluğuna eşittir. Fk=G, Vb=V olur; cisim askıda kalabilir. Küçük düşey kaymada aynı batık hacim ve aynı yoğunluk devam ettiği için kaldırma yaklaşık değişmez. Yoğunluk tabakalanması veya sıkıştırılabilir cisim durumu ayrı incelenir.",
      "Yoğunluğu sıvıdan büyük cisim serbest bırakıldığında Fk<G ile aşağı hızlanabilir; dibe ulaştığında sıvı altına erişiyorsa N+Fk=G denge bağıntısı kurulur. Cisim yoğunluğu daha küçükken suya zorla tam batırılıp bırakılırsa ilk net kuvvet yukarıdır; yüzeyde yeni kısmi yüzme dengesi oluşur. İlk hareket ile son dengeyi aynı kare gibi yorumlama.",
    ),
    s(
      "Dinamometre gerçek gerilmeyi okur",
      "Havada ağırlığı G olan cisim yukarıdan iple sıvı içinde dengede tutuluyorsa T+Fk=G; dinamometre T=G−Fk okur. Bu görünür ağırlıktır; yerçekimi kuvvetinin veya cismin kütlesinin azalması değildir. Havanın kaldırması ihmal edilmiştir. Tam batık hacim ve sıvı yoğunluğu biliniyorsa ölçüm farkı bağımsız olarak hesaplanabilir.",
      "Cisim çok hafifse tam batırmak için ip aşağı çekmelidir; o zaman denge Fk=G+T olur. Yukarı ip için kullanılan G−Fk ifadesi negatif çıkarsa ip negatif gerilme üretemez; varsayılan düzenek geçersizdir. Şekilde ipin cisme uyguladığı yönü önce çiz. İp kesilince kuvvetler ve cisim konumu zamanla değişeceğinden eski T’yi yeni serbest dengeye taşıma.",
    ),
    s(
      "Tam batık cismin derinliğini değiştirmek",
      "Sabit hacimli cisim homojen, sıkıştırılamaz sıvı içinde tümüyle batıkken daha derine indirilirse üst ve alt basınçlar birlikte artar. Fark ve yer değiştiren hacim aynı kaldığı için Fk değişmez. Aynı basınç artışı, net kaldırmayı artıran yeni bir alt-üst farkı doğurmaz. Bu nedenle 'derinde basınç büyük, kaldırma da büyük' kestirmesi yanlıştır.",
      "Sıkıştırılabilir balon derine inerken hacmi küçülebilir; tabakalı sıvıda çevre yoğunluğu değişebilir. Böyle durumlarda formüldeki Vb veya ρs değiştiği için kaldırma da değişebilir. Bir sıvı değişiminde cisim serbest yüzüyorsa Vb’yi sabit tutma; dışarıdan sabit konumda tam batık tutuluyorsa bu kez Fk=G zorunlu değildir. Hangi değişkenin sabit kaldığını cümleyle belirt.",
    ),
    s(
      "Taşırma kabında başlangıç seviyesi önemlidir",
      "Başlangıçta taşma ağzına kadar dolu kaba batırılan cismin taşırdığı sıvı hacmi, sıvı içinde kalan hacmine eşit olabilir. Taşan sıvının ağırlığı Arşimet kaldırmasına eşittir; serbest yüzen cisimde bu ayrıca cismin ağırlığına eşit olur. Batan ağır cisimde taşan sıvı ağırlığı cismin ağırlığından küçüktür.",
      "Kap başta ağzına kadar dolu değilse ilk yer değiştiren hacmin bir kısmı yalnız sıvı seviyesini yükseltir; her durumda dışarı taşma olmaz. Kap ve içindekileri taşıyan terazinin okuması için, eklenen cisim ağırlığı ile dışarı giden sıvı ağırlığını ve varsa dış ipin taşıdığı kuvveti ayrı izlemek gerekir. Yalnız 'kapta cisim var' bilgisinden toplam yük artışını belirleme.",
    ),
    s(
      "Tekne ve yükte ağırlık hacme çevrilir",
      "Yüzen tekne içindeki metal yük suyu doğrudan kendi hacmi kadar değil, tekneye eklediği ağırlık kadar daha çok yer değiştirir. Yükün katkısı Vek=m/ρs’dir. Metal suya bırakılıp batarsa artık kendi hacmi kadar suyun yerini alır. Metalin yoğunluğu sudan büyük olduğundan bu ikinci hacim daha küçük olabilir; su seviyesi azalabilir.",
      "Yükün kendisi yüzüyorsa suya bırakıldığında onun yer değiştirmesi yine ağırlık/ρsg ile belirlenir ve ideal toplam hacim aynı kalabilir. Cisim eriyor, çözünüyor veya kap su alıyorsa kütle ve hacim bilançosu ayrıca kurulmalıdır. Suda yüzen saf buzun aynı sıvı suya erimesinde seviye değişmemesi aynı mantığın özel örneğidir; tuzlu su ve başka maddeler için sonucu koşulsuz ezberleme.",
    ),
    s(
      "Gazlar da kaldırır, fakat her yükselme Arşimet değildir",
      "Hava da bir akışkandır; yer değiştiren havanın ağırlığı kadar statik kaldırma oluşabilir. Balonun zarı, sepeti ve içindeki gaz dahil toplam ağırlığı havanın kaldırmasından küçükse ilk net kuvvet yukarı olabilir. Yükseldikçe hava yoğunluğu ve balon hacmi değişebileceği için sabit kuvvet varsayımı denetlenir. Kaldırma yönü yerçekimine karşıdır.",
      "Uçak kanadındaki akışa bağlı aerodinamik kuvvet ile durgun su veya havadaki Arşimet kaldırması aynı hesap değildir. Geminin su üzerinde durması için kanat üzerinden hızlı akış zorunlu değildir. Bir örnekte önce durgun akışkan basınç farkı mı, hareketli akış çevresi mi incelendiğini ayır. Bu ünitedeki sayısal model statik sıvı içindeki blokla sınırlıdır.",
    ),
    s(
      "Denge, ilk eğilim ve veri yeterliliğini denetle",
      "Her soruda üç ayrı çizim yardımcıdır: ilk verilen konum, serbest bırakıldıktan sonraki ilk net kuvvet ve son olası denge. Önce G, Fk, ip ve destek oklarını koy; sonra Vb’nin bilinip bilinmediğini sor. Yüzmede G biliniyorsa Fk zaten bulunur; tam batmada Vb ve ρs önceliklidir. Formüle sayı aramadan durum türünü seç.",
      "Çözüm sonunda 0≤Vb≤V, birimlerin N veya m³ olması ve kuvvetlerin yönleri kontrol edilir. İki cismin eşit kaldırma görmesi aynı sıvıda eşit batık hacim gösterir, fakat eşit kütle göstermesi için ikisinin de serbest dengede olması gerekir. Eksik bir şekil, belirtilmemiş ip yönü veya sıvı altına erişim koşulu varsa bunu varsaymadan açıkça belirt.",
    ),
  ],
  examples: [
    ex(
      "Serbest yüzmenin hacim oranı",
      "Ortalama yoğunluğu 600 kg/m³, toplam hacmi 1,5 L olan blok suda serbest yüzüyor. Su 1000 kg/m³, g=10. Vb ve Fk?",
      "Önce toplam kütleyi, ardından denge ve hacmi bul.",
      [
        ["Kütle", "1,5 L=0,0015 m³.", "m=600·0,0015=0,9 kg"],
        [
          "Denge",
          "Serbest yüzmede kaldırma ağırlığı dengeler.",
          "Fk=0,9·10=9 N",
        ],
        [
          "Batık hacim",
          "Sıvı yoğunluğunu kullan.",
          "Vb=9/(1000·10)=0,0009 m³=0,9 L",
        ],
      ],
      "0,9 L ve 9 N",
      "0,9/1,5=0,6=600/1000; oran 1’den küçük.",
      "Bütün 1,5 L hacmi batık kabul etmek 15 N verir ve yüzme dengesini bozar.",
    ),
    ex(
      "Görünür ağırlıktan hacim",
      "Bir cisim havada 36 N, suda tümüyle batıkken yukarıdaki dinamometrede 21 N gösteriyor. Su 1000 kg/m³, g=10. Batık hacmi?",
      "Ölçüm farkını önce kaldırma kuvvetine dönüştür.",
      [
        ["Denge", "İp yukarı çekmektedir.", "Fk=36−21=15 N"],
        ["Hacim", "Arşimet’i Vb için çöz.", "Vb=15/(1000·10)=0,0015 m³"],
        ["Birim", "Litreye çevir.", "Vb=1,5 L"],
      ],
      "1,5 L",
      "15+21=36 N; ağırlık aynı, yalnız ipin payı azalmış.",
      "21 N’yi kaldırma veya cismin yeni gerçek ağırlığı sayma.",
    ),
    ex(
      "Aşağı bağlanan hafif blok",
      "0,4 kg, 1 L blok suya tamamen batırılıyor ve tabana bağlı iple dengeleniyor. Su 1000 kg/m³, g=10. İp gerilmesi ve kesilince yüzmedeki hacim?",
      "İpin yönünü aşağı al; son serbest dengeyi ayrı kur.",
      [
        ["Tam batık", "Bütün 0,001 m³ sıvı içindedir.", "Fk=10 N; G=4 N"],
        ["İp", "Yukarı 10 N’yi ağırlık ve ip dengeler.", "T=10−4=6 N aşağı"],
        [
          "Serbest denge",
          "İp kesilince son dengede Fk=4 N.",
          "Vb=4/10000=0,0004 m³=0,4 L",
        ],
      ],
      "6 N aşağı; son dengede 0,4 L batık",
      "0,4 L toplam 1 L’den küçük olduğu için serbest yüzebilir.",
      "Yukarı ip formülünden negatif T üretmek fiziksel düzenekle çelişir.",
    ),
    ex(
      "Tekneden bırakılan metal",
      "Suda yüzen teknedeki 1,2 kg, hacmi 0,15 L metal suya bırakılıp batıyor. Su 1000 kg/m³; tekne su almıyor, kap taşmıyor. Toplam yer değiştiren sıvı nasıl değişir?",
      "Yük teknedeyken ağırlık, battıktan sonra hacim üzerinden say.",
      [
        [
          "Teknede",
          "Ek yük serbest yüzmeyle taşınır.",
          "V₁=m/ρ=1,2/1000=1,2 L",
        ],
        [
          "Suda",
          "Metal tamamen batınca kendi hacmini yer değiştirir.",
          "V₂=0,15 L",
        ],
        ["Fark", "Aynı kapta yer değiştirme azalır.", "ΔV=0,15−1,2=−1,05 L"],
      ],
      "Yer değiştirme 1,05 L azalır; su seviyesi düşer.",
      "Metal yoğunluğu 8000 kg/m³ olduğundan batma varsayımıyla tutarlıdır.",
      "1,2 kg ile 0,15 L’yi doğrudan çıkarma; önce sıvı yoğunluğu üzerinden eş niceliğe dönüştür.",
    ),
  ],
  recall: [
    {
      prompt: "Formüldeki yoğunluk kime ait?",
      answer: "Çevredeki sıvıya; hacim ise sıvının yerini alan batık hacimdir.",
    },
    {
      prompt: "Aynı cisim yoğun sıvıda serbest yüzünce Fk artar mı?",
      answer: "Dengedeki Fk=mg aynı kalır; batık hacim azalır.",
    },
    {
      prompt: "Derine indirilen sabit hacimli tam batık cisim?",
      answer:
        "Homojen sıkıştırılamaz sıvıda Fk aynı; mutlak basınçlar birlikte artar.",
    },
    {
      prompt: "Aşağı ipli hafif blokta denge?",
      answer: "Fk=G+T; yukarı ipli durumun işaretiyle karıştırma.",
    },
    {
      prompt: "Taşan sıvı ağırlığı ne zaman cismin ağırlığıdır?",
      answer:
        "Başlangıç taşma seviyesindeyken, dış desteksiz serbest yüzmede; bütün batma durumlarında değil.",
    },
  ],
  questions: [
    [
      "Hacmi 3 L olan rijit cisim yoğunluğu 800 kg/m³ sıvıda tamamen batık tutuluyor. g=10 m/s². Kaldırma kaç N?",
      ["24", "30", "24000", "2,4", "80"],
      "3 L=0,003 m³ ve ρ sıvıya ait.",
      "Fk=800·10·0,003=24 N. Cisim kütlesi bu hesap için gerekli değildir. 24000 litreyi m³ sayma, 30 ise yanlışlıkla suyun 1000 yoğunluğunu kullanma sonucudur.",
    ],
    [
      "Kütlesi 0,8 kg, toplam hacmi 2 L olan blok suda serbest yüzüyor. ρsu=1000 kg/m³, g=10. Batık hacim kaç L?",
      ["0,8", "2", "1,2", "8", "0,4"],
      "Serbest denge Fk=mg; sonra Vb=m/ρsu.",
      "Vb=0,8/1000=0,0008 m³=0,8 L. Toplam hacmin 0,4’ü batmıştır; 0,4 hacim oranıdır ve litre cinsinden hacim değildir. 2 L’nin tümünü batık kabul etmek yüzme durumuna uymaz.",
    ],
    [
      "Aynı rijit cisim su ve daha yoğun tuzlu suda ayrı ayrı dış desteksiz, serbest ve durgun yüzüyor. g aynı. Hangisi doğrudur?",
      [
        "Kaldırma aynı, tuzlu suda batık hacim daha küçük",
        "Tuzlu suda kaldırma daha büyük ve batık hacim aynı",
        "Kaldırma ve ağırlık sıfır",
        "Her iki sıvıda bütün hacim mutlaka batık",
        "Tuzlu suda cismin kütlesi azalır",
      ],
      "İki son dengede de Fk=mg.",
      "Cismin m ve g’si aynı olduğundan iki denge kaldırması aynı ağırlıktır. ρs artınca Vb=m/ρs azalır. Sıvı yoğunluğu tek başına Fk’yi büyütür sonucu ancak Vb sabit tutulursa geçerlidir; serbest yüzmede o değişir.",
    ],
    [
      "Havada ağırlığı 28 N olan cisim sıvıda tamamen batık ve yukarıdaki dinamometreyle dengede 16 N gösteriyor. Havanın kaldırması ihmal. Sıvının kaldırması kaç N?",
      ["12", "16", "28", "44", "1,75"],
      "Yukarı kuvvetler T+Fk, aşağı ağırlık.",
      "Fk=G−T=28−16=12 N. 16 N gerilme, 28 N gerçek ağırlıktır. Toplamak yerine çıkarma yapılır çünkü kaldırma ve ip ağırlığı birlikte dengeler; kütle azalmamıştır.",
    ],
    [
      "Ağırlığı 3 N olan 1 L blok, suya tamamen batırılıp tabana bağlı bir iple tutuluyor. ρsu=1000 kg/m³, g=10. İp blok üzerinde hangi kuvveti uygular?",
      ["7 N aşağı", "7 N yukarı", "13 N yukarı", "3 N aşağı", "10 N aşağı"],
      "Tam batık Fk’yi bul ve yönlü denge kur.",
      "Fk=1000·10·0,001=10 N yukarıdır. G=3 N aşağı olduğundan ek 7 N aşağı ip kuvveti gerekir. İp kesilirse başlangıçta yukarı net kuvvet vardır; burada serbest yüzme dengesi çizilmemiştir.",
    ],
    [
      "Sabit hacimli tam batık blok homojen, sıkıştırılamaz sıvıda yüzeye değmeden 0,5 m daha aşağı indiriliyor. g ve yoğunluk değişmiyor. Kaldırma nasıl değişir?",
      [
        "Aynı kalır",
        "İki katına çıkar",
        "Sıfır olur",
        "Mutlaka azalır",
        "Yalnız cismin rengine bağlıdır",
      ],
      "Fk=ρs g Vb; hangi çarpan değişti?",
      "Hiçbir çarpan değişmediği için kaldırma aynı kalır. Alt ve üst yüzey basınçları birlikte artar; fark değişmez. Sıkıştırılabilir balon gibi hacmi değişen başka bir duruma bu sonucu koşulsuz taşıma.",
    ],
    [
      "Ağzına kadar su dolu kaba dış desteksiz bırakılan 0,5 kg cisim durgun serbest yüzüyor. Taşan suyun ağırlığı kaç N? g=10 m/s²; yüzey gerilimi ihmal.",
      ["5", "0,5", "10", "0", "Cismin toplam hacmi olmadan bulunamaz"],
      "Taşan sıvı ağırlığı=Fk; serbest yüzmede Fk=mg.",
      "Fk=0,5·10=5 N ve taşan sıvının ağırlığı da 5 N’dir. Tam toplam hacim verilmesi gerekmez; denge yeterlidir. Kabın başlangıçta taşma seviyesinde olması bu eşit taşma sonucunun önemli koşuludur.",
    ],
    [
      "Suda tamamen batık rijit cismin yoğunluğu 2000 kg/m³, hacmi 0,002 m³. Sıvı cismin altına erişiyor; tabanda dengede. ρsu=1000 kg/m³, g=10. Tabanın destek kuvveti kaç N?",
      ["20", "40", "0", "60", "2"],
      "G=ρcVg, Fk=ρsuVg; N=G−Fk.",
      "G=2000·0,002·10=40 N, Fk=20 N; N=20 N. Dibe oturdu diye kaldırma sıfır değildir; sıvının alt yüzeye erişimi açıkça verilmiştir. Sızdırmaz taban teması farklı koşuldur.",
    ],
    [
      "Aynı homojen sıvıda, aynı g altında iki cisme eşit kaldırma kuvveti etki ediyor. Cisimler dışarıdan tutulabilir ve aynı kütlede olmayabilir. Kesin eşit olan nedir?",
      [
        "Batık hacimleri",
        "Toplam hacimleri",
        "Kütleleri",
        "Yoğunlukları",
        "Bütün yüzey basınçları",
      ],
      "Ortak ρs ve g altında Fk=ρs g Vb.",
      "Batık hacimler eşittir. Toplam hacim ancak ikisinin de tümü batık olmasıyla ilişkilendirilebilir; eşit kütle ise ikisinin de dış desteksiz dengede olmasını gerektirir. Verilmeyen koşulları cümleye ekleme.",
    ],
    [
      "İçinde 2 kg, 0,25 L metal bulunan tekne suda serbest yüzüyor. Metal suya bırakılıp batıyor; tekne su almıyor ve kap taşmıyor. ρsu=1000 kg/m³. Toplam yer değiştiren su hacmindeki değişim?",
      [
        "1,75 L azalır",
        "1,75 L artar",
        "0,25 L artar",
        "Aynı kalır",
        "2,25 L azalır",
      ],
      "Teknedeyken metalin ek yer değiştirmesi m/ρsu.",
      "Teknedeyken 2 kg yük için 2 L ek yer değiştirme gerekir. Batan metal yalnız kendi 0,25 L hacmini yer değiştirir; 0,25−2=−1,75 L. Cismin ağırlığıyla hacmini birimsiz doğrudan karşılaştırma.",
    ],
  ],
};
const waves: Pack = {
  id: "dalgalara-giris",
  topic: "detail-127",
  title: "Dalgalara giriş: kaynak, ortam ve titreşim",
  minutes: 50,
  pages: "147–150",
  paper: "014 Dalgalara Giriş",
  objectives: [
    "Titreşim, tek atma ve periyodik dalgayı ayır; tanecik hareketiyle enerji aktarımını karşılaştır.",
    "Konum ve zaman grafiklerinden genlik, dalga boyu, periyot ve frekansı çıkar.",
    "Ortam ve kaynak sabitlerini koruyarak v=λf ile sınıflandırma sorularını gerekçelendir.",
  ],
  sections: [
    s(
      "Titreşim yerelde, dalga uzayda ilerler",
      "Titreşim bir sistemin denge durumu çevresinde değişmesidir; telin bir noktası yukarı aşağı salınabilir. Dalga ise bu bozunumun ve enerjinin uzayda yayılmasıdır. İpteki işaretli bir boncuk çoğunlukla aynı yatay konum çevresinde kalırken dalga tepesi boncuğu geçip ilerleyebilir. Dalga hızını boncuğun yukarı aşağı titreşim hızıyla özdeşleştirme.",
      "İdeal küçük genlikli mekanik dalga modelinde madde dalgayla beraber uçtan uca sürüklenmez; komşu parçacıklar etkileşerek enerjiyi iletir. Gerçek su dalgalarında küçük net sürüklenme, akıntı veya kırılma oluşabilir; ideal cümleyi bütün gerçek hareketlere mutlak yasa gibi taşıma. Elektromanyetik dalgada salınan nicelikler maddesel boncuklar değil elektrik ve manyetik alanlardır.",
    ),
    s(
      "Tek atma düzenli dalga dizisi değildir",
      "Kaynağın tek kısa hareketi sınırlı bir atma oluşturabilir. Atmanın yüksekliği ve yay boyunca genişliği vardır; tek bir sarsıntıya periyodik kaynak frekansı atamak gerekmez. Kaynak aynı hareketi eşit aralıklarla tekrarlarsa periyodik bir dalga dizisi oluşur. Her dalga biçiminin mutlaka sonsuz süren sinüs olduğu düşünülmemelidir.",
      "Atma genişliği, bozunumun oluştuğu süre ile ortam hızının çarpımıyla ilişkilidir: w=vΔt. Periyodik dalgada bir tam tekrarın uzaydaki uzunluğu λ, kaynağın tekrar süresi T ile λ=vT bağıntısını verir. Bir çizimde yalnız tek tepe görünmesi, kaynağın sürekli periyodik çalışıp çalışmadığını tek başına söylemez; kökün üretim bilgisini oku.",
    ),
    s(
      "Genlik ile tepeden çukura uzaklık farklıdır",
      "Uzanım y, bir parçacığın o andaki denge konumundan işaretli yer değiştirmesidir. Genlik A, bu titreşimin en büyük mutlak uzanımıdır; negatif genlik yerine aşağı yönde negatif uzanım denir. +3 cm tepe ve −3 cm çukur arasındaki toplam fark 6 cm iken genlik 3 cm’dir. Genliğin birimi uzunluktur.",
      "Genliği büyük dalga, aynı ortam ve aynı frekans gibi koşullar altında daha fazla enerji aktarabilir. İdeal doğrusal sinüzoidal ip modelinde ortalama güç A² ile orantılıdır; genel olarak 'enerji genlikle her zaman doğru orantılıdır' denmez. Genlik ile frekans birlikte değişirse yalnız birini karşılaştırarak kesin enerji oranı kurma. Büyük genlikte doğrusal modelin sınırları da değişebilir.",
    ),
    s(
      "Dalga boyu eş fazlı komşuların arasıdır",
      "Periyodik dalgada ardışık iki tepe veya iki çukur arası dalga boyu λ’dır. Denge çizgisinden geçen iki noktanın her çifti bir λ değildir; aynı titreşim evresinde olup olmadıklarına bakılır. İdeal sinüs için tepe ile hemen sonraki çukur arası λ/2’dir. Dört ardışık tepe arasındaki toplam mesafe üç λ’dır; nokta sayısı ile aralık sayısını karıştırma.",
      "Bir anlık y–x grafiğinin yatay ekseni konumdur; buradan uzaysal uzaklık okunur. λ’yı metreye dönüştürmeden Hz ile çarpmak cm/s üretir, m/s değil. İki noktanın aynı yükseklikte görünmesi tek başına aynı faz anlamına gelmez; biri yükselirken diğeri alçalıyor olabilir. Şeklin ölçekli olduğu veya sayısal ekseni bulunduğu belirtilmediyse çizimden cetvelle veri üretme.",
    ),
    s(
      "Periyot ve frekansı ters çevir",
      "Periyot T bir tam titreşim için geçen süredir ve saniye ile ölçülür. Frekans f bir saniyedeki tam titreşim sayısıdır; birimi Hz=s⁻¹’dir. N tam titreşim t sürede oluşuyorsa f=N/t, T=t/N ve fT=1 olur. 4 Hz dört saniye demek değil, saniyede dört tam titreşim demektir.",
      "Aynı noktadaki y–t grafiğinde art arda iki maksimum arasındaki süre T’dir. Bu grafikte yatay tepe aralığı λ olamaz çünkü eksen zaman birimindedir. İlk ve son gözlem tepelerini sayarken aradaki tam dönemleri say; t=0’daki ilk tepe ile t=2 s’deki beşinci tepe arası dört T içerir. Hesaptan sonra fT=1 kontrolü birim ve sayma hatasını yakalar.",
    ),
    s(
      "v=λf bir ilişki, tek başına nedensellik değildir",
      "Dalga deseni bir periyotta bir dalga boyu ilerler; v=λ/T=λf bağıntısı buradan gelir. İdeal, doğrusal ve dağılımsız aynı ortamda dalga sürati ortamın fiziksel özellikleriyle belirlenir. Kaynak frekansı artınca hızın sabit kalması için λ azalır. Eşitliğin sağında f var diye hızın her frekans artışında zorunlu arttığı söylenemez.",
      "Gerilmiş ipte gerilim ve boyca kütle, sığ su yaklaşımında derinlik, seste ortam ve sıcaklık önemli olabilir. Gerçek ortamlarda dağılım nedeniyle hızın frekansa bağlı olabileceği daha ileri modeller vardır; burada dağılımsız okul yaklaşımı açıkça kullanılır. Formülü uygularken neyin sabit tutulduğunu önce yaz. Aynı kaynak farklı ortamda çalışıyorsa bu kez f korunup v ile λ birlikte değişebilir.",
    ),
    s(
      "Sınırdan geçişte kaynak ritmi korunur",
      "Durgun iki ortamın sabit sınırında aynı kaynaktan gelen periyodik dalganın frekansı değişmez; sınır bir taraftan gelen her tekrarın ritmine uyar. Ortam değişimi dalga süratini değiştirebilir, bu durumda λ=v/f değişir. v₂/v₁=λ₂/λ₁ oranı aynı f koşulunda geçerlidir. Periyot da f’nin tersi olarak korunur.",
      "Bir kaynağın frekansını değiştirmek ile dalganın başka ortama geçmesi farklı müdahalelerdir. Kaynak değişiminde aynı ortamın v’si, ortam değişiminde aynı kaynağın f’si kontrol edilir. Hareketli kaynak, hareketli gözlemci veya zamanla değişen sınır gibi Doppler koşulları bu temel modelin dışında tutulur. Sorudaki sabit/sabit değil ayrımı sayılardan daha önce gelir.",
    ),
    s(
      "Mekanik ve elektromanyetik ayrımı ortam gereksinimidir",
      "Ses, yay ve deprem dalgaları mekaniktir; yayılmak için maddesel ortamdaki etkileşimlere ihtiyaç duyar. Elektromanyetik dalgalar boşlukta da yayılabilir. Radyo, mikrodalga, kızılötesi, görünür ışık, morötesi, X ve gama ışınları aynı elektromanyetik ailenin bölgeleridir. Boşluktaki yayılma hızları aynıdır; dalga boyu ve frekansları farklıdır.",
      "Bu spektrumda radyo yönünden gama yönüne frekans genel olarak artar, boşluk dalga boyu azalır. Bölgelerin sınırları kullanılan sınıflamaya göre değişebilir. Radyo iletişimi, termal görüntüleme, görünür görüş ve X ışınıyla görüntüleme farklı uygulamalardır; her elektromanyetik dalgayı göz göremez. Tedavi ve tanı örnekleri aynı işlem değildir; yalnız dalga sınıflandırması öğretimi yapılır.",
    ),
    s(
      "Enine ve boyuna ayrımı iki yönü karşılaştırır",
      "Titreşim doğrultusu yayılma doğrultusuna dikse enine, paralelse boyuna dalga denir. Yatay ipi düşey sallamak enine mekanik dalga, helezon yayı boyu boyunca sıkıştırıp bırakmak boyuna mekanik dalga oluşturabilir. Havada ses boyunadır. Bir dalganın çizimde yukarı kıvrılması bu tanımı tek başına vermez; iki ayrı yön belirtilmelidir.",
      "Deprem dalgalarının farklı türleri enine veya boyuna olabilir. Su yüzeyindeki parçacık hareketi yatay ve düşey bileşenler içerir; basitçe yalnız enine bir nokta hareketi diye genelleme yapılmaz. Hacim içindeki ideal elektromanyetik düzlem dalgalar eninedir. 'Mekanik/elektromanyetik' ve 'enine/boyuna' birbirinin seçenekleri değildir; iki bağımsız sınıflandırma eksenidir.",
    ),
    s(
      "İki grafik, tek boncuk, üç sabit kontrolü",
      "Etkileşimde kaynağın f’sini, ideal ortamın v’sini ve genliği ayrı değiştir. f değişince dalga tepeleri arası sıklaşmayı; v değişince aynı ritimde dalga boyunun uzamasını gözle. Zamanı bir çeyrek periyot ilerletmek dalga desenini λ/4 kaydırırken işaretli boncuğun yalnız düşey konumunu değiştirir. Şekil fiziksel 8 m pencereyi, sayısal sonuç gerçek v/f oranını gösterir.",
      "Bir çözümde ilk soru 'hangi eksen?', ikinci 'kaynak mı ortam mı değişti?', üçüncü 'hangi birim?' olsun. Sonucun λf=v ve fT=1 ilişkilerini sağlaması gerekir. Tepe sayısından frekans üretirken zaman; dalga boyu üretirken mesafe verisi gerekir. Sadece güzel görünen eğri doğru fizik kanıtı değildir; kontrol edilen nicelik ve sonuç birlikte açıklanmalıdır.",
    ),
  ],
  examples: [
    ex(
      "Titreşim sayısından ritim",
      "Kaynak 9 saniyede 18 tam titreşim yapıyor. f ve T nedir?",
      "Toplam süreyi ve tam tekrar sayısını iki karşı oranla kullan.",
      [
        ["Frekans", "Bir saniyeye düşen tekrar sayısını bul.", "f=18/9=2 Hz"],
        ["Periyot", "Bir tekrara düşen süreyi bul.", "T=9/18=0,5 s"],
        ["Kontrol", "Terslik ilişkisini denetle.", "fT=2·0,5=1"],
      ],
      "2 Hz ve 0,5 s",
      "18 titreşim · 0,5 s=9 s.",
      "18/9 sonucunu saniye olarak etiketlemek frekans birimini karıştırır.",
    ),
    ex(
      "Dört tepe, üç aralık",
      "Bir anlık grafikte dört ardışık tepenin ilki x=0,2 m, sonuncusu x=2,0 m. f=5 Hz. λ ve v?",
      "Uçlar arasındaki mesafeyi tepe sayısına değil aralık sayısına böl.",
      [
        [
          "Aralık",
          "Dört tepe üç tam dalga boyu oluşturur.",
          "3λ=2,0−0,2=1,8 m",
        ],
        ["Dalga boyu", "Aralık sayısını kullan.", "λ=1,8/3=0,6 m"],
        ["Sürat", "Frekansla çarp.", "v=0,6·5=3 m/s"],
      ],
      "0,6 m ve 3 m/s",
      "T=0,2 s’de desen 0,6 m ilerler.",
      "Dört tepeyi dört dalga boyu saymak eksik bir aralık üretir.",
    ),
    ex(
      "Aynı ortamda ritmi değiştir",
      "İdeal dağılımsız ortamda v=12 m/s. Kaynak önce 3 Hz, sonra 6 Hz. λ ve v nasıl değişir?",
      "Ortam hızını sabitle, iki λ’yı ayrı hesapla.",
      [
        ["İlk durum", "Kaynak ve ortamı ayrı kullan.", "λ₁=12/3=4 m"],
        ["Yeni durum", "Aynı ortamın süratini koru.", "λ₂=12/6=2 m"],
        ["Yorum", "Frekans iki kat, dalga boyu yarı.", "v₂=6·2=12 m/s"],
      ],
      "Dalga boyu 4 m’den 2 m’ye iner; sürat 12 m/s kalır.",
      "Her iki λf aynı 12 m/s değerini verir.",
      "f arttı diye λ’yı sabit varsaymak ortam hızını yanlış değiştirir.",
    ),
    ex(
      "Aynı kaynak, iki ortam",
      "Sabit 4 Hz kaynak A’da 8 m/s, B’de 14 m/s hızla periyodik dalga oluşturuyor. Sabit sınırda λA, λB ve T?",
      "Frekansı sınırın iki tarafında koru.",
      [
        ["A ortamı", "v/f kullan.", "λA=8/4=2 m"],
        ["B ortamı", "Yeni hızı aynı frekansa böl.", "λB=14/4=3,5 m"],
        ["Zaman", "Kaynağın periyodu iki tarafta aynıdır.", "T=1/4=0,25 s"],
      ],
      "2 m, 3,5 m ve 0,25 s",
      "λB/λA=3,5/2=14/8; aynı kaynakta dalga boyu oranı sürat oranını doğrular.",
      "B’de hızı artıran ortam değişimini kaynak frekansı artışı sanma.",
    ),
  ],
  recall: [
    {
      prompt: "Dalga ilerlerken boncuk ne yapar?",
      answer:
        "İdeal ip modelinde aynı yatay konum çevresinde titreşir; dalga tepesiyle uçtan uca gitmez.",
    },
    {
      prompt: "y–t grafiğinde tepe aralığı?",
      answer:
        "Periyot; y–x grafiğinde aynı evreli ardışık tepe aralığı dalga boyudur.",
    },
    {
      prompt: "Aynı ideal ortamda f artarsa?",
      answer: "v sabitse λ=v/f azalır; kaynak ile ortamı ayır.",
    },
    {
      prompt: "Sabit sınırda başka ortama geçince?",
      answer: "Aynı kaynağın f ve T’si korunur; v ve λ değişebilir.",
    },
    {
      prompt: "Mekanik her zaman enine midir?",
      answer:
        "Hayır; bunlar farklı sınıflandırma eksenleridir, ses mekanik ve havada boyunadır.",
    },
  ],
  questions: [
    [
      "Bir kaynak 8 saniyede 24 tam titreşim yapıyor. Frekans kaç Hz?",
      ["3", "1/3", "24", "8", "192"],
      "f=N/t; tam titreşim sayısını süreye böl.",
      "f=24/8=3 Hz. 1/3 saniye periyottur; frekans olarak yazılamaz. 24 toplam tekrar, 8 toplam süre; çarpımları fiziksel frekans vermez.",
    ],
    [
      "Periyodu 0,4 s olan periyodik kaynağın frekansı kaç Hz?",
      ["2,5", "0,4", "4", "40", "0,25"],
      "fT=1; periyodu frekansa dönüştürmek için tersini al.",
      "f=1/0,4=2,5 Hz. T ile f aynı sayı değildir. 0,25 sonucu ondalık virgülü yanlış okumaktan doğar; 2,5·0,4=1 kontrolü doğru sonucu gösterir.",
    ],
    [
      "Anlık y–x grafiğinde ardışık iki dalga tepesi x=0,3 m ve x=1,1 m konumundadır. Dalga boyu kaç m?",
      ["0,8", "1,4", "0,4", "1,1", "0,3"],
      "Aynı evreli komşu tepelerin konum farkını al.",
      "λ=1,1−0,3=0,8 m. Tepe konumlarını toplama veya farkı ikiye bölme. λ/2 olan uzaklık sinüsoidal dalgada tepe ile hemen sonraki çukur arasındadır.",
    ],
    [
      "İdeal sinüzoidal dalgada denge y=0, maksimum y=+5 cm ve minimum y=−5 cm. Genlik kaç cm?",
      ["5", "10", "−5", "0", "25"],
      "Genlik en büyük mutlak uzanımdır.",
      "A=5 cm; tepe-çukur farkı 10 cm’dir ve genlik değildir. Genlik büyüklük olarak negatif olmaz; −5 cm bir anlık aşağı uzanım değeridir. Grafikte yatay uzunluk hakkında veri yoktur.",
    ],
    [
      "Dalga boyu 0,6 m, frekansı 5 Hz olan periyodik dalganın yayılma sürati kaç m/s?",
      ["3", "0,12", "8,33", "30", "5,6"],
      "v=λf ve metre·s⁻¹ birimini kullan.",
      "v=0,6·5=3 m/s. 0,12 m·s bölme hatasıdır; 8,33 ters oranı kullanır. Bir periyotta 0,6 m ilerler, T=0,2 s olduğundan 0,6/0,2=3 ile doğrulanır.",
    ],
    [
      "Aynı ideal dağılımsız ortamın özellikleri değişmeden kaynak frekansı iki katına çıkarılıyor. Hangisi doğrudur?",
      [
        "Sürat aynı, dalga boyu yarı olur",
        "Sürat iki kat, dalga boyu aynı olur",
        "Sürat ve dalga boyu birlikte iki kat olur",
        "Periyot iki kat olur",
        "Dalga artık mekanik olamaz",
      ],
      "Ortam sürati ile kaynak frekansını ayrı tut.",
      "Verilen modelde v aynı, λ=v/f yarı ve T=1/f yarı olur. Sürati frekansla zorunlu artırmak dalga boyunun değişmesini yok sayar. Dalga sınıfı sırf frekans değişti diye mekanikten elektromanyetiğe dönüşmez.",
    ],
    [
      "4 Hz sabit kaynakla üretilen dalga, sürati 10 m/s olan ortamdan 16 m/s olan başka ortama sabit sınırdan geçiyor. İkinci ortamda dalga boyu kaç m?",
      ["4", "2,5", "6,4", "40", "64"],
      "Sabit sınırda f=4 Hz korunur.",
      "λ₂=16/4=4 m. 2,5 m ilk ortamın dalga boyudur; 6,4 kaynak frekansını hız oranıyla yanlış değiştirmekten doğabilir. Aynı kaynağın T=0,25 s değeri iki ortamda da aynıdır.",
    ],
    [
      "Aşağıdakilerden hangisi boşlukta yayılabilen elektromanyetik dalgadır?",
      [
        "Radyo dalgası",
        "Havadaki ses",
        "İpteki atma",
        "Sismik P dalgası",
        "Durgun su yüzeyindeki dalga",
      ],
      "Maddesel ortam gereksinimini sorgula.",
      "Radyo dalgası elektromanyetiktir ve boşlukta yayılabilir. Ses, ip, deprem P ve su dalgaları maddesel etkileşimlere dayanan mekanik dalgalardır. Mekanik olmak, enine veya boyuna olmayı tek başına belirlemez.",
    ],
    [
      "Yatay doğrultuda sağa yayılan ip dalgasında işaretli nokta düşey doğrultuda titreşiyor. Bu dalga verilen düzende nasıl sınıflanır?",
      [
        "Mekanik ve enine",
        "Mekanik ve boyuna",
        "Elektromanyetik ve enine",
        "Elektromanyetik ve boyuna",
        "Maddesel ortam gerektirmeyen ses",
      ],
      "Titreşim ile yayılma doğrultularının dikliğine bak.",
      "İp maddesel ortam olduğundan mekanik; titreşim düşey, yayılma yatay olduğu için eninedir. Dalganın sağa ilerlemesi parçacığın sağa sürüklendiği anlamına gelmez. Ses veya elektromanyetik sınıfına dönüşmez.",
    ],
    [
      "Bir noktadaki y–t grafiğinde art arda iki maksimum t=0,7 s ve t=1,2 s’de oluşuyor. Bu veriden doğrudan bulunanlar hangisidir?",
      [
        "T=0,5 s ve f=2 Hz",
        "λ=0,5 m ve v=2 m/s",
        "T=1,9 s ve f=0,5 Hz",
        "A=0,5 m ve λ=2 m",
        "T=2 s ve f=0,5 Hz",
      ],
      "Yatay eksen zaman; maksimumlar arasındaki süreyi çıkar.",
      "T=1,2−0,7=0,5 s ve f=1/T=2 Hz. Konum veya dalga sürati verilmediği için λ bulunamaz; genlik için düşey eksen değerleri gerekir. Zaman aralığını metreyle etiketleme.",
    ],
  ],
};
const strings: Pack = {
  id: "yay-dalgalari",
  topic: "detail-128",
  title: "Yay dalgaları: atmayı üret, yansımayı çöz",
  minutes: 55,
  pages: "151–155",
  paper: "015 Yay Dalgaları",
  objectives: [
    "Gerilim ve boyca kütleden ideal yay süratini; kaynak süresinden atma genişliğini bul.",
    "Sabit/serbest uç ile hafif/ağır yay geçişinde yansıma ve iletim yönlerini ayır.",
    "İşaretli süperpozisyonu geçici olarak yorumla; enerji ve sınır koşullarını kontrol et.",
  ],
  sections: [
    s(
      "Atmanın genişliği, genliği ve yönü ayrı",
      "Yay ucunun tek kısa hareketi yerel bir tepe veya çukur atması üretir. Denge çizgisinden en büyük düşey uzaklık genlik; atmanın başlangıcıyla sonu arasındaki yatay mesafe genişliktir. Bir tepe sağa veya sola gidebilir; 'yukarı atma' ifadesi ilerleme yönünü söylemez. İlerleme oku ile uzanım işaretini ayrı göster.",
      "Aynı ideal ortamda v süratiyle Δt süreyle üretilen atmanın genişliği yaklaşık w=vΔt olur. Kaynağı iki kat süre hareket ettirmek aynı süratte genişliği iki kat artırabilir; genlik veya sürati zorunlu değiştirmez. Tek atma için periyodik frekans atamak yerine üretim süresini kullan. Düzenli tekrarlayan dalga dizisinde ise T, f ve λ ayrıca anlam kazanır.",
    ),
    s(
      "İdeal ip süratinde kök oranını koru",
      "Gergin ve düzgün ipte küçük genlikli enine dalga için v=√(F/μ) kullanılır. F gerilim kuvveti, μ=m/L boyca kütledir; birimi kg/m’dir. μ hacimsel yoğunluk kg/m³ değildir. Aynı μ’de F dört kat olursa sürat iki kat; aynı F’de μ dört kat olursa sürat yarı olur. Oranı karekökten çıkarmayı unutma.",
      "Kaynak genliği veya frekansı, gerilim ve boyca kütle sabitken bu ideal modelde sürati değiştirmez. Helezon yayın çekilip uzatılması hem gerilimi hem boyca kütleyi değiştirebilir; yalnız biri değişmiş gibi karşılaştırma yapma. Sürtünme ve doğrusal olmayan büyük titreşimler ayrıca değerlendirilir. Modelde gerilim ve μ bağımsız seçilen ideal parametrelerdir.",
    ),
    s(
      "Hareket eden şekilden noktanın yönünü çıkar",
      "Sağa ilerleyen sabit biçimli bir atmada bir noktaya bir sonraki anda soldaki biçim gelir. Bu nedenle sağa giden eğrinin yükselen sol yamacındaki nokta o anda aşağı, alçalan sağ yamacındaki nokta yukarı hareket eder. Matematik diliyle sağa giden y(x−vt) için zamansal değişim, uzaysal eğimin ters işaretindedir. Kök düzeyinde bunu yan yana iki an çizerek görmek yeterlidir.",
      "Sola giden biçimde aynı ilişki tersine döner; soldaki veya sağdaki yamacın her zaman aynı düşey yönde hareket ettiği ezberlenmez. Tepe anında düzgün biçimdeki noktanın düşey hızı sıfır olabilir; buna rağmen dalga tepesi yatay ilerler. Dalga sürati ile noktanın titreşim hızının farklı olması burada görünür hâle gelir. İdeal ipte madde atmayla birlikte sınırdan geçmez.",
    ),
    s(
      "Sabit uç neden ters yansıtır?",
      "Sabit uç yer değiştiremediği için sınırdaki toplam uzanım sıfır kalır. Gelen tepe, yansıyan çukurla bu koşulu sağlayabilir: yansıyan atma ters döner. İlerleme yönü de sınırdan geriye döner; gelen sağa ise yansıyan sola gider. İdeal kayıpsız uçta aynı ipe dönen atmanın sürat büyüklüğü, genlik büyüklüğü ve genişliği korunur.",
      "Ters dönme enerji işaretinin negatif olması demek değildir; uzanımın işareti değişir. Negatif hız yön kodlayabilir fakat sürat büyüklüğü negatif olmaz. Gerçek duvar bağlantısında kayıp olabilir; ideal korunum ifadesi bu kayıp ihmaline dayanır. Bağlantı anındaki toplam şekli, tamamen ayrılmış gelen/yansıyan atmaların tek başına biçimleriyle karıştırma.",
    ),
    s(
      "Serbest uç yer değiştirebilir",
      "İdeal serbest uçta atma ters dönmeden yansır; tepe yine tepe, çukur yine çukur olarak geri döner. Ucun titreşebilmesi sabit uçtaki sıfır uzanım koşulunu kaldırır. İlerleme yönü yine tersine döner; 'ters dönmedi' ifadesi yönün değişmediği anlamına gelmez. Sürat büyüklüğü aynı ortamda korunur.",
      "İdeal serbest uçta gelen ve yansıyan tepe sınırda üst üste binince toplam uzanım geçici olarak iki kat olabilir. Bu, geri dönen ayrılmış atmanın kalıcı genliğinin iki kat olduğu anlamına gelmez. Halka üzerinde sürtünmesiz kayabilen uç, serbest sınırın okul örneğidir. Ucun ağırlığı veya ek yay etkisi önemliyse gerçek sınır koşulu ayrıca gerekir.",
    ),
    s(
      "Hafiften ağıra geçişte iki ayrı atma oluşur",
      "Aynı gerilimle birleştirilmiş iki ideal ipte μ₂>μ₁ ise ikinci ortam daha yavaştır. Hafif ipten gelen tepenin bir kısmı hafif ipe çukur olarak yansır, bir kısmı ağır ipe tepe olarak iletilir. Yansıyan ilk ortamda kaldığından vyan=vgelen; iletilen için viletilen daha küçüktür. Ara yüzey sabit uçla tamamen aynı değildir çünkü iletim de vardır.",
      "Aynı süreli darbenin iletilen genişliği hız oranıyla küçülür; periyodik kaynak varsa f korunup λ azalır. Tek atmaya kaynak frekansı atamak yerine darbe süresi veya genişlik karşılaştırılır. Genlik ve enerji oranlarını yalnız şekil okundan sayısal üretme. Etkileşimde ideal eş gerilim sınır eşitlikleri kullanılır; bunlar model varsayımı olarak açıklanır, TYT sorusunda verilmeden ileri formül ezberi istenmez.",
    ),
    s(
      "Ağırdan hafife geçişte yansıma düzdür",
      "Aynı gerilimde μ₂<μ₁ olan geçişte iletilen dalga daha hızlıdır. Gelen tepe hem yansıyan tarafta tepe hem iletilen tarafta tepe oluşturur. Yansıyan atma ilk ağır ipte aynı sürat büyüklüğüyle geri döner. İletilen atmanın sürati ve aynı darbe süresindeki genişliği artabilir; periyodik durumda aynı frekansta λ artar.",
      "İletilen uzanım genliği geleninkinden büyük olabilir; bu otomatik enerji artışı değildir. Farklı ipte enerji akısı yalnız uzanım genliğine değil ortamın mekanik özelliklerine de bağlıdır. İdeal sınırdaki toplam enerji yansıyan ve iletilen parçalara dağılır. Ayrıntılı katsayılar yerine temel sınavda önce işaret, yön, aynı/farklı ortam ve v=√(F/μ) oranını güvenli biçimde kullan.",
    ),
    s(
      "Üst üste binmede işaretli toplam al",
      "Doğrusal ipte aynı x ve aynı anda oluşan uzanımlar ytoplam=y₁+y₂ ile toplanır. +4 cm tepe ile −7 cm çukur tam üst üste geldiğinde toplam −3 cm’dir. İki tepe birbirini güçlendirebilir; zıt işaretli parçalar kısmen veya tamamen söndürebilir. Bu işlem büyüklükleri her durumda toplamak değil işaretli toplamdır.",
      "Atmaların genişlikleri farklıysa yalnız tam çakışan noktada verilen y değerleri toplanır; bütün şekil tek bir yükseklik hesabıyla çıkmaz. Tam zıt ve eş biçimli atmalar bir an düz ip görünümü verebilir, fakat ipin parçacıkları o anda hareket ediyor olabilir. Sıfır anlık uzanım sıfır toplam enerji anlamına gelmez; kinetik enerji sürüyor olabilir. Böylece kayıp ile geçici girişim ayrılır.",
    ),
    s(
      "Karşılaşma kalıcı yok olma değildir",
      "İdeal doğrusal ve kayıpsız ortamda atmalar karşılaştıktan sonra biçimlerini koruyarak kendi yönlerinde yoluna devam eder. Üst üste binme anında yeni bir toplam görüntü oluşması, iki atmanın tek yeni atmaya dönüşüp sonsuza kadar o biçimde kalması değildir. Sürtünme veya başka kayıp verilirse genliklerin azalması ayrıca modellenir.",
      "İki atmanın birbirine yaklaşma hızı sorulursa yönlü bağıl hareket düşünülür: aynı ipte zıt yönde v ile ilerleyen merkezlerin uzaklığı 2v ile azalır. Bu, her atmanın ortam süratinin 2v’ye çıktığı anlamına gelmez. Tam örtüşme zamanı için ilk merkez uzaklığı ve her bir sürat açık olmalıdır. Şeklin ölçeksiz genişliğinden zaman üretme.",
    ),
    s(
      "Sınırı seç, önce tahmin et, sonra iki anı karşılaştır",
      "Etkileşimde sabit, serbest, daha ağır ve daha hafif ikinci ip sınırlarını seç. Gelen karede tek tepenin biçimini; sonraki karede yansıyanın işareti ve yönü ile varsa iletilenin hız/genliğini gör. Aynı F ve μ₁ korunurken yalnız sınırı değiştirmek ilk ortamın süratini değiştirmez. Kontroller ideal sınırın sonucunu adım adım açar, otomatik zaman baskısı oluşturmaz.",
      "Sayısal kontrol için v₁, v₂, işaretli yansıma katsayısı ve enerji paylarının toplamı HTML’de de verilir. Bu ileri katsayılar eş gerilimli, doğrusal ve kayıpsız iki ip modeline özeldir; bağlantısı bilinmeyen her yaya evrensel sayısal oran diye uygulanmaz. Sınav çözümünde önce gerekli temel ilişkiyi seç, sayılar yerine oturunca yön, birim ve enerji kontrolü yap.",
    ),
  ],
  examples: [
    ex(
      "Gerilim ve boyca kütle",
      "İdeal gergin ipin μ değeri 0,2 kg/m, gerilimi 20 N. Dalga sürati nedir? Gerilim 80 N olunca?",
      "v=√(F/μ) kullan; gerilim oranının karekökünü kontrol et.",
      [
        [
          "İlk hız",
          "Bölme işlemini kökün içinde yap.",
          "v₁=√(20/0,2)=√100=10 m/s",
        ],
        ["Yeni hız", "μ aynı tutuluyor.", "v₂=√(80/0,2)=√400=20 m/s"],
        ["Oran", "Gerilim dört kat, sürat iki kat.", "v₂/v₁=√4=2"],
      ],
      "10 m/s; sonra 20 m/s",
      "Sürat gerilimle doğrusal artmış olsaydı yanlış 40 m/s çıkardı.",
      "μ’yu hacimsel yoğunluk sanma veya karekökü atlama.",
    ),
    ex(
      "Tek atmanın üretim süresi",
      "İdeal ipte sürat 6 m/s. Kaynak bir atmayı 0,25 saniyede oluşturuyor. Genişlik nedir? Aynı ipte süre 0,5 saniye olursa?",
      "Genişliğe kaynak hareketinin süresini çevir.",
      [
        ["İlk genişlik", "w=vΔt kullan.", "w₁=6·0,25=1,5 m"],
        ["Yeni genişlik", "Ortam hızı değişmedi.", "w₂=6·0,5=3 m"],
        ["Yorum", "İki kat süre iki kat genişliktir.", "w₂/w₁=2"],
      ],
      "1,5 m; sonra 3 m",
      "m/s·s=m; genlik hakkında veri yoktur.",
      "Tek darbe süresini periyot sanıp zorunlu frekans tanımlama.",
    ),
    ex(
      "Sabit uçtan dönüş",
      "+4 cm tepe sağa 3 m/s ile ilerleyip ideal sabit uçtan yansıyor. Ayrılmış yansıyan atmanın işareti, yönü ve sürati? Uca ilk uzaklık 1,8 m ise varış süresi?",
      "Sınır işareti ile yatay yönü ayrı kodla.",
      [
        [
          "Sınır",
          "Sabit uçta toplam uzanım sıfır olmalıdır.",
          "Yansıyan: −4 cm çukur",
        ],
        ["Yolculuk", "Aynı ipe döner; hız büyüklüğü korunur.", "Sola, 3 m/s"],
        ["Süre", "İlk yolun mesafesini sürate böl.", "t=1,8/3=0,6 s"],
      ],
      "−4 cm, sola, 3 m/s; varış 0,6 s",
      "Yansıyanın negatif uzanımı negatif enerji değildir.",
      "Ters dönmeyi yalnız ilerleme oku sanma; hem uzanım hem yön ayrı değişir.",
    ),
    ex(
      "İki ipte hız ve şekil",
      "Aynı 18 N gerilimde μ₁=0,18 kg/m ipten μ₂=0,72 kg/m ipe bir tepe geliyor. Hızlar ve yansıma işareti?",
      "Önce iki ortam hızını bul, sonra hafif→ağır sınırını seç.",
      [
        [
          "İlk ip",
          "Gelen ve yansıyan bu ortamda kalır.",
          "v₁=√(18/0,18)=10 m/s",
        ],
        [
          "İkinci ip",
          "Dört kat μ sürati yarıya indirir.",
          "v₂=√(18/0,72)=5 m/s",
        ],
        [
          "Yön ve işaret",
          "Hafiften ağıra sınırda kısmi ters yansıma vardır.",
          "Yansıyan çukur sola; iletilen tepe sağa",
        ],
      ],
      "Gelen/yansıyan 10 m/s, iletilen 5 m/s; yansıyan çukur.",
      "Aynı süreli iletilen darbenin genişliği ilk darbenin yarısıdır.",
      "İki ip birleşimini tam sabit uç sayıp iletileni yok sayma.",
    ),
  ],
  recall: [
    {
      prompt: "Gerilim dört kat, μ aynı ise?",
      answer: "v=√(F/μ) nedeniyle sürat iki kat.",
    },
    {
      prompt: "Sabit ve serbest uçta tepe?",
      answer:
        "Sabit uçtan çukur, serbest uçtan tepe döner; her ikisinde ilerleme yönü değişir.",
    },
    {
      prompt: "Aynı gerilimde hafiften ağıra?",
      answer:
        "Yansıyan ters, iletilen düz ve daha yavaş; yansıyan ilk ortam süratinde.",
    },
    {
      prompt: "+5 ve −5 cm örtüşme sıfırsa enerji biter mi?",
      answer:
        "Hayır; anlık toplam uzanım sıfır olabilir, parçacık hareketi ve enerji sürebilir.",
    },
    {
      prompt: "Tek atma genişliğinde hangi süre?",
      answer:
        "Üretim süresi Δt; periyodik tekrar verilmediyse periyot diye adlandırılmaz.",
    },
  ],
  questions: [
    [
      "Boyca kütlesi μ=0,25 kg/m olan ideal ip 25 N geriliyor. Küçük enine dalga sürati kaç m/s?",
      ["10", "100", "5", "6,25", "0,1"],
      "v=√(F/μ); bölümü hesapladıktan sonra karekök al.",
      "F/μ=25/0,25=100 m²/s²; karekök 10 m/s. 100 kök alınmamış değerdir, 6,25 çarpma hatasıdır. μ kg/m olduğundan hacimsel yoğunluk gibi davranılmaz.",
    ],
    [
      "Aynı ideal ipte boyca kütle sabitken gerilim 9 katına çıkarılıyor. Dalga sürati kaç katına çıkar?",
      ["3", "9", "81", "1/3", "1"],
      "Hız gerilimin kareköküyle değişir.",
      "v₂/v₁=√(F₂/F₁)=√9=3. Frekans verilmesi gerekmez; bu sürat ortam gerilimi ve μ ile belirlenir. 9 kat sonucu kökü atlamak olur.",
    ],
    [
      "İdeal ipte 4 m/s ile ilerleyen tek atma 0,3 s süren kaynak hareketiyle üretiliyor. Atmanın genişliği kaç m?",
      ["1,2", "13,33", "0,075", "4,3", "3,7"],
      "Genişlik w=vΔt.",
      "w=4·0,3=1,2 m. Tek atmanın üretim süresi kullanılır; düzenli tekrar bilgisi olmadığı için buna zorunlu periyot veya frekans atanmıyor. m/s ile saniye çarpımı metre verir.",
    ],
    [
      "İdeal kayıpsız sabit uca sağa doğru gelen +6 cm tepe atması yansıyor. Ayrılmış yansıyan atma hangisidir?",
      [
        "Sola giden −6 cm çukur",
        "Sağa giden +6 cm tepe",
        "Sola giden +12 cm tepe",
        "Sağa giden −6 cm çukur",
        "Sıfır genlikli ve enerjisiz",
      ],
      "Sabit uçta uzanım işareti ters, yayılma yönü geri olur.",
      "Yansıyan sola gider ve çukurdur; ideal sabit uçta genlik büyüklüğü 6 cm kalır. − işareti enerjiye değil uzanıma aittir. 12 cm serbest uçtaki geçici toplam uzanımla karıştırılmamalıdır.",
    ],
    [
      "İdeal serbest uca sağa gelen tepe atması tamamen yansıyıp ayrıldığında hangi değişim olur?",
      [
        "Tepe olarak sola döner; sürat büyüklüğü aynı kalır",
        "Çukur olarak sola döner; sürat iki kat olur",
        "Tepe olarak sağa gitmeye devam eder",
        "Genliği kalıcı olarak mutlaka iki kat olur",
        "Enerjisi tamamen sıfırlanır",
      ],
      "Serbest uç düz yansıtır, fakat hareket yönünü geri çevirir.",
      "Serbest uçta işaret korunur ve yön sola döner; aynı ipte sürat büyüklüğü aynı kalır. Sınırda gelen/yansıyan üst üste binince iki kat anlık uzanım olabilir; ayrılmış atmanın kalıcı genliği iki kat değildir.",
    ],
    [
      "Aynı gerilim altında μ₂=4μ₁ olan ikinci ipe, ilk hafif ipten bir tepe geliyor. Hangisi doğrudur?",
      [
        "Yansıyan ters; iletilenin sürati ilk ortamın yarısı",
        "Yansıyan düz; iletilenin sürati iki kat",
        "Yansıyan ilk ortamda yarı süratle gider",
        "Hiçbir iletim olmaz",
        "İletilen çukur ve dört kat süratli olur",
      ],
      "Hafif→ağır sınırı ve v∝1/√μ.",
      "v₂/v₁=√(μ₁/μ₂)=1/2. Yansıyan hafif ipte ters çukur, iletilen ağır ipte düz tepedir. Yansıyan ilk ortamda kaldığı için sürat büyüklüğü v₁’dir; arayüz tam sabit uç değildir.",
    ],
    [
      "Aynı gerilimli ağır ipten daha hafif ipe gelen tepe atması için, ideal doğrusal bağlantıda yansıyan atmanın işareti ve iletilenin sürati nasıldır?",
      [
        "Yansıyan tepe; iletilen daha hızlı",
        "Yansıyan çukur; iletilen daha yavaş",
        "Yansıyan çukur; iletilen aynı hızlı",
        "Yansıyan tepe; iletilen mutlaka durur",
        "İletilenin frekansı zorunlu sıfır",
      ],
      "Ağır→hafif sınırında düz yansıma; küçük μ daha büyük sürat.",
      "Yansıyan işareti korur, tepe olur. İletilen daha küçük boyca kütleli ipte √(F/μ) nedeniyle daha hızlıdır. Tek atmada frekans atamak gerekmez; periyodik kaynak varsa sabit sınırda frekans korunur.",
    ],
    [
      "Aynı ideal doğrusal ipte iki atma bir noktada tam örtüşüyor. O noktadaki ayrı uzanımlar +5 cm ve −8 cm. Toplam uzanım kaç cm?",
      ["−3", "13", "3", "−13", "0"],
      "Yukarı ve aşağı işaretli toplanır.",
      "ytoplam=+5+(−8)=−3 cm; aşağı uzanımdır. 13 iki büyüklüğü işaretsiz toplamaktır. Bu anlık toplam atmaların daha sonra tek −3 cm atmaya dönüştüğü anlamına gelmez; ideal modelde yollarına devam ederler.",
    ],
    [
      "İdeal kayıpsız doğrusal ipte eşit biçimli +4 cm ve −4 cm atmalar tam örtüşünce ip o anda düz görünüyor. Hangisi doğrudur?",
      [
        "Anlık uzanım sıfır olabilir; atmalar sonra ilerlemeyi sürdürür",
        "İki atmanın bütün enerjisi kesin sıfırdır",
        "İp artık hiçbir noktada hareket edemez",
        "Atmalar kalıcı olarak yok olur",
        "Ortamın dalga sürati sıfır olur",
      ],
      "Sıfır uzanım ile sıfır hareket/enerjiyi ayır.",
      "Süperpozisyon toplam uzanımı o anda sıfırlar; parçacıkların hızı sıfır olmak zorunda değildir. İdeal modelde atmalar ayrılıp devam eder. Enerji kaybı verilmediği için kalıcı yok olma çıkarılamaz.",
    ],
    [
      "Aynı gerilim ve boyca kütle korunan ideal ipte kaynak frekansı 2 Hz’den 4 Hz’ye çıkarılıyor. İlk dalga boyu 3 m ise yeni dalga boyu kaç m?",
      ["1,5", "3", "6", "12", "0,75"],
      "İpin sürati aynı; λf sabittir.",
      "İlk v=3·2=6 m/s, yeni λ=6/4=1,5 m. f artınca aynı ipte hızın da artması zorunlu değildir; ortam F ve μ değişmediği için sürat sabittir. Genlik bilgisi bu hesabı değiştirmez.",
    ],
  ],
};

const packs = [pressure, buoyancy, waves, strings];
const source = (p: Pack) =>
  `MEBİ TYT Fizik Konu Özetleri, basılı s.${p.pages}; Aurelia TYT Fizik ${p.paper} kopya kağıdı öğretim bölümleri ve gerçek kaynak şekilleriyle karşılaştırılmış özgün anlatım, model ve alıştırmalar. Sorular uygulamaya özgüdür; resmî ÖSYM sorusu veya bütün sınav arşivi değildir.`;
export const forge011PhysicsTopics: Record<string, string> = Object.fromEntries(
  packs.map((p) => [p.id, p.topic]),
);
export const forge011PhysicsGuides: LessonGuide[] = packs.map((p) => ({
  id: p.id,
  minutes: p.minutes,
  objectives: p.objectives,
  sections: p.sections,
  examples: p.examples,
  recall: p.recall,
  source: source(p),
}));
export const forge011PhysicsLessons: Lesson[] = packs.map((p) => ({
  id: p.id,
  subjectId: "tyt-fizik",
  title: txt(p.title),
  minutes: p.minutes,
  objectives: p.objectives.map(txt),
  tags: [p.topic, p.id],
  source: txt(source(p)),
  body: p.sections.map((sec) => ({
    title: txt(sec.title),
    text: txt(sec.paragraphs.join("\n\n")),
  })),
  questions: p.questions.map(([prompt, options, hint, explanation], i) => {
    const shift = (i * 2 + 1) % 5;
    return {
      id: `${p.id}-q${i + 1}`,
      prompt: txt(prompt),
      options: options.map((_, j) => txt(options[(j - shift + 5) % 5])),
      answer: shift,
      hint: txt(hint),
      explanation: txt(explanation),
      skill: p.id,
    };
  }),
}));

const positive = (...values: number[]) => {
  if (!values.every((v) => Number.isFinite(v) && v > 0))
    throw new RangeError("Pozitif sonlu fiziksel değer gerekir.");
};
const nonnegative = (...values: number[]) => {
  if (!values.every((v) => Number.isFinite(v) && v >= 0))
    throw new RangeError("Negatif olmayan sonlu değer gerekir.");
};
export function pressureState(
  forceN: number,
  areaCm2: number,
  depthCm: number,
  density: number,
  surfaceKPa: number,
  gasHigher: boolean,
) {
  positive(areaCm2, density);
  nonnegative(forceN, depthCm, surfaceKPa);
  const areaM2 = areaCm2 / 10000,
    headPa = (density * 10 * depthCm) / 100;
  const gasPa = surfaceKPa * 1000 + (gasHigher ? -headPa : headPa);
  return {
    areaM2,
    solidPa: forceN / areaM2,
    headPa,
    totalPa: surfaceKPa * 1000 + headPa,
    gasPa,
    gasPossible: gasPa >= 0,
  };
}
export function hydraulicState(
  inputN: number,
  a1: number,
  a2: number,
  travelCm: number,
) {
  positive(a1, a2);
  nonnegative(inputN, travelCm);
  return {
    forceN: (inputN * a2) / a1,
    travelCm: (travelCm * a1) / a2,
    inputJ: (inputN * travelCm) / 100,
    outputJ: (((inputN * a2) / a1) * travelCm * a1) / a2 / 100,
  };
}
export function buoyancyState(
  massKg: number,
  volumeL: number,
  fluidDensity: number,
  heldFully: boolean,
) {
  positive(massKg, volumeL, fluidDensity);
  const volumeM3 = volumeL / 1000,
    bodyDensity = massKg / volumeM3,
    weightN = massKg * 10;
  const fullForceN = fluidDensity * volumeM3 * 10;
  const fraction = heldFully ? 1 : Math.min(1, bodyDensity / fluidDensity);
  const forceN = fullForceN * fraction;
  const balance = forceN - weightN;
  const condition = heldFully
    ? "Tam batık, dış kuvvetle tutuluyor"
    : bodyDensity < fluidDensity
      ? "Serbest yüzme"
      : Math.abs(bodyDensity - fluidDensity) < 1e-8
        ? "Askıda denge"
        : "Dibe ulaşınca destek gerekir";
  return {
    volumeM3,
    bodyDensity,
    weightN,
    fullForceN,
    fraction,
    displacedL: fraction * volumeL,
    forceN,
    balance,
    condition,
    supportN: heldFully ? 0 : Math.max(0, -balance),
    holdN: heldFully ? Math.abs(balance) : 0,
    holdDirection:
      balance > 1e-8 ? "aşağı" : balance < -1e-8 ? "yukarı" : "gerekmez",
  };
}
export function waveState(
  speed: number,
  frequency: number,
  amplitudeCm: number,
  quarterSteps: number,
) {
  positive(speed, frequency);
  nonnegative(amplitudeCm);
  if (!Number.isFinite(quarterSteps))
    throw new RangeError("Sonlu zaman adımı gerekir.");
  const wavelength = speed / frequency,
    period = 1 / frequency,
    phase = ((((quarterSteps % 4) + 4) % 4) * Math.PI) / 2;
  return {
    wavelength,
    period,
    elapsed: (quarterSteps * period) / 4,
    shift: (wavelength * (((quarterSteps % 4) + 4) % 4)) / 4,
    phase,
    beadCm: amplitudeCm * Math.sin((2 * Math.PI * 2) / wavelength - phase),
  };
}
export type StringBoundary = "fixed" | "free" | "heavy" | "light";
export function stringState(
  tension: number,
  mu: number,
  boundary: StringBoundary,
) {
  positive(tension, mu);
  if (!["fixed", "free", "heavy", "light"].includes(boundary))
    throw new RangeError("Geçerli sınır gerekir.");
  const speed1 = Math.sqrt(tension / mu),
    ratio = boundary === "heavy" ? 4 : boundary === "light" ? 0.25 : 1;
  const speed2 = speed1 / Math.sqrt(ratio);
  const reflection =
    boundary === "fixed"
      ? -1
      : boundary === "free"
        ? 1
        : (1 - Math.sqrt(ratio)) / (1 + Math.sqrt(ratio));
  const transmission =
    boundary === "fixed" || boundary === "free" ? 0 : 1 + reflection;
  const reflectedEnergy = reflection ** 2,
    transmittedEnergy = Math.sqrt(ratio) * transmission ** 2;
  return {
    speed1,
    speed2,
    mu2: mu * ratio,
    reflection,
    transmission,
    reflectedEnergy,
    transmittedEnergy,
    hasTransmission: transmission > 0,
  };
}
export function pulseProfile(
  x: number,
  center: number,
  width: number,
  amplitude: number,
) {
  if (![x, center, width, amplitude].every(Number.isFinite) || width <= 0)
    throw new RangeError("Sonlu atma ve pozitif genişlik gerekir.");
  const q = (x - center) / (width / 2);
  return Math.abs(q) >= 1 ? 0 : amplitude * Math.cos((q * Math.PI) / 2) ** 2;
}
