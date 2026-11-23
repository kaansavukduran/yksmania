import { txt, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { GuideSection, WorkedExample } from "./guides/types";

export const poolProblemsSource025Summary =
  "Aurelia 025 İşçi–Havuz Problemleri, içerik 1.2 (19 Kasım 2026), PDF s. 1–10. MEB Fen Lisesi Matematik 9, basılı s. 187, problem kurma adımları. MEBİ TYT Matematik, PDF s. 52, ortak iş hızı. OGM Problemler Video Ders Notu, PDF s. 12–15. Geçmiş sınavlardan öğren bölümünde 2013 YGS Temel Matematik, soru 37 bulunur.";

const titles = {
  limits: "Su bitince çıkış debisini yeniden belirle",
  changes: "Taşma ve musluk değişimini zaman çizelgesine koy",
  leak: "Ölçülen hızın hangi aralıkta geçerli olduğunu bul",
  layers: "Kesit değiştiğinde katmanların hacmini ayrı hesapla",
  graph: "Grafiğin devamı için yeni koşulu denetle",
  flowMethods: "Kalan hacim, işaret ve zaman yöntemleri",
  checkMethods: "Kaçak, kesit ve grafik yöntemleri",
};

const headers = [
  "Yöntem",
  "Geçerli örnek",
  "Koşul değişirse",
  "Başka bir kullanım",
];

export const poolProblemsSource025Sections: GuideSection[] = [
  {
    title: titles.limits,
    paragraphs: [
      "Çıkış üzerinde yazan debi, suya eriştiği sürece çekebildiği miktarı gösterir. İçeride 36 L varken giriş 4 L/dk, tabandaki çıkış en çok 10 L/dk ise su ilk 6 dakikada biter. Ancak çıkışın gelen suyu birikmeden çekebildiği açıkça verilirse, bundan sonra 4 L/dk su çıkar ve hacim sıfırda kalır.",
      "Örneğin 8 dakika sonunda gerçek çıkış 6·10+2·4=68 L’dir. Başlangıç suyu ve giren su da 36+8·4=68 L eder. Başka bir çıkış önce suyun belli bir seviyeye ulaşmasını gerektiriyorsa sonraki davranışı o kurala göre incele.",
    ],
  },
  {
    title: titles.changes,
    paragraphs: [
      "90 L’lik tank 50 L suyla başlıyor. Net 10 L/dk su geldiğinde dördüncü dakikada dolar. Akış 7. dakikaya kadar sürerse bu arada 3·10=30 L taşar ve içeride 90 L kalır.",
      "7. dakikada giriş kapanıp çıkış 6 L/dk olursa sonraki 2 dakikanın başlangıcı 90 L’dir. 9. dakikada 78 L kalır. İlk denklemi sınırdan sonra uzatmak 120 L verir ve taşan suyu sonraki evreye yanlış taşır. Musluğun açılışı veya kapanışı kadar ilk boşalma ve ilk taşma da bir evrenin sonu olabilir.",
    ],
  },
  {
    title: titles.leak,
    paragraphs: [
      "Giriş debisini çıkışsız ölçümde hacim artışı bölü süre ile bul. Aynı girişle, kaçağın sabit ve sürekli açık olduğu bilinen aralıkta net artışı da aynı birimle hesapla. Aradaki fark o aralıktaki kaçak hızıdır. Ölçüm başlangıçları farklıysa her biri için kendi hacim değişimini kullan.",
      "Deliğin 120 L seviyesinde olduğu ve üstünde 8 L/dk ile akıttığı biliniyorsa 200 L’den 120 L’ye iniş 10 dakika sürer. Delik tek başına alttaki 120 L’yi çıkaramaz. Toplam ölçüm süresinin bir bölümünde kaçak kapalıysa tüm süreden bulduğun fark ortalama kayıptır. Kaçağın etkin süresini bilmeden açıkkenki sabit debisini ayıramazsın.",
    ],
  },
  {
    title: titles.layers,
    paragraphs: [
      "Sabit yatay kesitte yükseklik artışı, yeni hacmin kesit alanına bölünmesiyle bulunur. Kesit değişiyorsa her katmanın kendi alanını kullan. Örneğin boş bir kabın ilk 1 m’sinde kesit 3 m², üstünde 5 m² olsun. 4 m³ suyun 3 m³’ü ilk katmanı doldurur. Kalan 1 m³ üstte 1/5 m yükselir ve toplam yükseklik 1,2 m olur.",
      "Hacim 4 m³ diye tüm suyu 3 m²’ye bölmek ilk alanı üst katmanda da kullanır. Alanın katman içinde de değiştiği bir kapta, taban alanı tek başına yeterli veri vermez. Yükseklik değişimi mi hacim değişimi mi istendiğini önce belirle.",
    ],
  },
  {
    title: titles.graph,
    paragraphs: [
      "Zaman–hacim grafiğinde iki noktayı birleştiren eğimin birimi L/dk olabilir. Zaman–yükseklik grafiğinde ise eğim m/dk gibi uzunluk/zaman birimindedir. Sabit kesitte yükseklik hızını alanla çarparak hacimsel debiyi bulabilirsin.",
      "Örneğin hacim 2. dakikada 30 L, 6. dakikada 50 L ise bu aralıkta ortalama net 5 L/dk’dır. Daha sonra hız bu değerde kalırsa 70 L’ye 10. dakikada ulaşılır. 6. dakikada 5 L/dk’lık bir çıkış açılır ve giriş 5 L/dk olarak sürerse hacim 50 L’de kalır. Aynı ölçümler iki farklı devamı destekler.",
    ],
  },
  {
    title: titles.flowMethods,
    paragraphs: [
      "Kapasiteyi, hedef hacmi ve başlangıç anını yaz. Kullanacağın hıza hangi aralıkta güvenebildiğini seç.",
    ],
    table: {
      headers,
      rows: [
        [
          "Kalan hacim ve sabit net hız",
          "120 L kapasite, başlangıç 30 L, net 15 L/dk. Eksik 90 L ve süre 6 dk.",
          "3. dakikada hız 9’a düşerse 45 L daha gerekir. Süre 3+5=8 dk.",
          "30’u tamamlanmış 120 sayfalık tarama, dakikada 15 sayfayla 6 dk sürer.",
        ],
        [
          "Aynı anda giriş ve çıkış",
          "14 L/dk giriş ve 9 L/dk çıkış, su varken 5 L/dk net artış verir.",
          "Çıkış 17 L/dk olursa 24 L su 8 dk’da tükenir. Sonraki gerçekleşen çıkış suya erişime bağlıdır.",
          "Dakikada 14 mesaj gelip 9’u işleniyorsa kuyruk dakikada 5 mesaj büyür.",
        ],
        [
          "Açılma ve kapanma anları",
          "İlk 3 dk giriş 8 L/dk, sonra 6 L/dk daha eklenir. Beş dakikada 3·8+2·14=52 L gelir.",
          "İlk giriş aynı anda kapanırsa son iki dakika 6 L/dk ile geçer. Toplam 36 L gelir.",
          "Bir tarayıcı 3 dk tek çalışıp kapanırsa toplam çıktı hesabına çalışma süresi olarak yalnız ilk 3 dk girer.",
        ],
      ],
    },
  },
  {
    title: titles.checkMethods,
    paragraphs: [
      "Su miktarını ya da yüksekliği açıklayan bağıntıyı seç. Çıkarımı gözlenen aralığın dışına taşıyabilmek için akış ve biçim koşullarını denetle.",
    ],
    table: {
      headers,
      rows: [
        [
          "Kaçağı ölçüm farkından bul",
          "Sabit giriş 13, ölçülen net artış 11 L/dk ise açık kaldığı aralıkta kaçak 2 L/dk.",
          "Kaçak ölçümün yalnız son yarısında açıksa 2 L/dk ortalamadır. Açıkken sabit hız 4 L/dk olur.",
          "Dakikada 13 kutu eklenip stok 11 artıyorsa aynı aralıkta dakikada 2 kutu alınmıştır.",
        ],
        [
          "Debiden yüksekliğe geç",
          "Yatay kesit 4 m², giriş 2 m³/dk. İlk dolumda yükseklik hızı 1/2 m/dk.",
          "Bir üst katmanda kesit 8 m² ise aynı giriş orada 1/4 m/dk yükseltir.",
          "6 m³ malzeme, 2 m² yatay kesitli dik kutuyu 3 m yüksekliğe kadar doldurur.",
        ],
        [
          "Grafiği doğru aralıkta uzat",
          "0–4 dk’da hacim 20 L’den 60 L’ye çıkmışsa ortalama 10 L/dk.",
          "60 L tankın kapasitesiyse hacim grafiği 60’ın üstüne çıkamaz. Sonraki su, taşma varsa dışarı gider.",
          "Doluluk grafiğinin eğimi tank/dk ise L/dk için tank kapasitesiyle çarp.",
        ],
      ],
    },
  },
];

export const poolProblemsSource025SheetText = new Map<string, string[]>([
  [
    titles.limits,
    [
      "Nominal çıkışı su varken kullan. Tank boşsa çıkış, verilen anında çekme modelinde en çok gelen suyu alabilir.",
    ],
  ],
  [
    titles.changes,
    [
      "Yeni evreyi önceki evrenin gerçek hacminden başlat. Sınırda oluşan taşmayı sonraki evrenin suyuna ekleme.",
    ],
  ],
  [
    titles.leak,
    [
      "Sabit kaçak = aynı girişin debisi − net artış. Delik yüksekliği ve açık kalma süresi, sonucun kullanılacağı aralığı belirler.",
    ],
  ],
  [
    titles.layers,
    [
      "Her sabit kesit katmanında ek yükseklik = ek hacim / alan. Kesit değişmeden önceki hacmi ilk alana yaz.",
    ],
  ],
  [
    titles.graph,
    [
      "İki noktanın eğimi gözlenen aralığın ortalamasıdır. Uzatmadan önce ekseni, akışı, boşalma ve taşma anlarını denetle.",
    ],
  ],
  [
    titles.flowMethods,
    [
      "Kalan hacim / net debi. Her musluk yalnız etkin olduğu aralıkta hesaba katılır.",
    ],
  ],
  [
    titles.checkMethods,
    [
      "Kaçak için ölçüm aralığına, seviye için yatay kesite, grafiğin devamı için sonraki akışa bak.",
    ],
  ],
]);

export const poolProblemsSource025Examples: WorkedExample[] = [
  {
    title: "Kalan hacimden süreyi tamamla",
    prompt:
      "600 L’lik tankın dörtte biri dolu. Giriş 20 L/dk, taban çıkışı 5 L/dk. İkisi de sabit açıkken süreyi bul.",
    strategy:
      "Çözümü açmadan önce başlangıç hacmini ve kullanılacak debiyi ayrı yaz.",
    steps: [
      { label: "Başlangıç", explanation: "600/4=150 L su var." },
      { label: "Kalan", explanation: "600−150=450 L eksiği var." },
      {
        label: "Süre",
        explanation: "Net 20−5=15 L/dk olduğu için kalan hacmi 15’e böl.",
        expression: "450/15=30 dk",
      },
    ],
    answer: "Tank 30 dakikada dolar.",
    check: "150+30·20−30·5=600 L. Tank payıyla (3/4)÷(15/600)=30 dk.",
    pitfall:
      "Sadece girişin 20 L/dk debisini veya tankın tüm kapasitesini kullanmak.",
  },
  {
    title: "Eşit ölçüm sürelerinden farklı debiler çıkar",
    prompt:
      "450 L’lik tank kaçak kapalıyken 90 L’den, kaçak açıkken 210 L’den 12’şer dakikada doluyor. İki ölçümde giriş aynı ve sabit. Açık ölçümün tamamında kaçak da sabit. Kaçak hızı nedir?",
    strategy: "Her ölçümün hacim farkını kendi süresine böl.",
    steps: [
      {
        label: "Giriş debisi",
        explanation: "Kaçak yokken 12 dakikada 450−90=360 L geldi.",
        expression: "360/12=30 L/dk",
      },
      {
        label: "Açık kaçakla net artış",
        explanation: "İkinci ölçümde hacim 450−210=240 L arttı.",
        expression: "240/12=20 L/dk",
      },
      {
        label: "Hız farkı",
        explanation:
          "Kaçak aynı aralıkta giriş ile net artış arasındaki farktır.",
        expression: "30−20=10 L/dk",
      },
    ],
    answer: "Ölçüm sırasında kaçak 10 L/dk.",
    check:
      "210+12·(30−10)=450 L. Bu ölçüm, daha düşük bir seviyede deliğin çalışacağını tek başına göstermez.",
    pitfall:
      "Her iki ölçümde 12 dk sürdü diye hacim değişimlerini eşit saymak.",
  },
];

export const poolProblemsSource025Recall = [
  {
    prompt:
      "7 L/dk giriş, 11 L/dk kapasitede taban çıkışı var. Boş tankta çıkış gelen suyu anında çekebiliyorsa gerçekleşen çıkış kaç L/dk?",
    answer:
      "7 L/dk. Tankta önceki sudan kalmadığı için çıkış yalnız gelen suyu alır.",
  },
  {
    prompt:
      "Suyu belli bir seviyeye kadar boşaltabilen yan delik için dolu tank hacmini kaçak debisine bölmek neden yetmez?",
    answer:
      "Delik seviyesinin altındaki su çıkmaz. Düşen hacim, dolu hacimden delik seviyesindeki hacmin çıkarılmasıyla bulunur.",
  },
  {
    prompt:
      "Zaman–hacim grafiğindeki iki noktadan bulunan eğim, dolma saatini hangi koşulla verir?",
    answer:
      "Hacim hedefi bilinir ve aynı pozitif net hız ikinci noktadan hedefe kadar sürerse.",
  },
];

type PracticeInput = {
  key: string;
  prompt: string;
  options: [string, string, string, string, string];
  answer: number;
  hint: string;
  guidance: QuestionGuidance;
};

function practice({
  key,
  prompt,
  options,
  answer,
  hint,
  guidance,
}: PracticeInput): Question {
  return {
    id: `havuz-problemleri-025-${key}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(`${guidance.steps.join(" ")} ${guidance.check}`),
    skill: "İşçi–Havuz Problemleri",
    guidance,
  };
}

export const poolProblemsSource025Practice: Question[] = [
  practice({
    key: "bosalma-sonrasi-gercek-cikis",
    prompt:
      "500 L’lik tankta başlangıçta 84 L su var. Giriş 7 L/dk. Tabandaki çıkış en çok 11 L/dk çekebiliyor ve tank boşken gelen suyu birikmeden dışarı alıyor. Otuz dakika sonunda içeride kalan ve otuz dakika boyunca gerçekten çıkan su sırasıyla kaç litredir?",
    options: [
      "0 L ve 330 L",
      "0 L ve 294 L",
      "0 L ve 84 L",
      "36 L ve 294 L",
      "0 L ve 231 L",
    ],
    answer: 1,
    hint: "İlk boşalma anını bul. Bu andan sonra çıkış yalnız o anda gelen suyu alır.",
    guidance: {
      knowledge: [
        "Son hacim + gerçek çıkış, başlangıç hacmi ve giren su toplamına eşittir. Bu soruda taşma olmaz.",
      ],
      strategy:
        "Önce ilk boşalma anını bul ve çıkışın iki evredeki miktarını ayrı hesapla.",
      steps: [
        "Su varken net 7−11=−4 L/dk. 84 L, 84/4=21 dakikada biter.",
        "İlk 21 dakikada 21·11=231 L çıkar. Son 9 dakikada 9·7=63 L daha çıkar.",
        "İçeride 0 L kalır. Gerçek çıkış toplamı 231+63=294 L.",
      ],
      optionReasons: [
        "330 L, 11 L/dk’nın bütün süre sürdüğünü varsayar. Tank boşalınca giriş yalnız 7 L/dk sağlar.",
        "İlk 21 dakikada 231 L, son 9 dakikada 63 L çıkar. Son hacim sıfırdır.",
        "84 L başlangıç suyudur. Otuz dakika boyunca alınan 210 L de dışarı çıkar.",
        "294 L çıkıştan sonra 84+210−294=0 L kalır. 36 L karşılanamayan çıkış kapasitesidir.",
        "231 L yalnız ilk boşalma anına kadar çıkan sudur. Sonraki 63 L de sayılmalıdır.",
      ],
      commonError:
        "Nominal çıkışı su tükendikten sonra da 11 L/dk saymak ya da boşalınca tüm akışı durdurmak.",
      check: "Toplam su 84+30·7=294 L. Hepsi çıktığında 0 L kalır.",
    },
  }),
  practice({
    key: "yan-kacak-sinirinda-dur",
    prompt:
      "600 L’lik tankı aynı sabit giriş, delik kapalıyken boş durumdan 24 dakikada dolduruyor. Delik açıkken 240 L’den tam doluya yine 24 dakikada ulaşılıyor. Kaçak 180 L’nin üstünde sabit, o seviyede ve altında duruyor. Dolu tankta giriş kapatılırsa kaç dakika sonra kaçak durur ve kaç litre su kalır?",
    options: [
      "24 dk ve 180 L",
      "36 dk ve 240 L",
      "42 dk ve 180 L",
      "42 dk ve 0 L",
      "60 dk ve 0 L",
    ],
    answer: 2,
    hint: "Açık ve kapalı ölçümler için hacim farklarını ayrı yaz. Daha sonra delik seviyesine ne kadar hacim kaldığını bul.",
    guidance: {
      knowledge: [
        "Çıkışın durduğu seviyeye kadar geçen süre, o seviyenin üstündeki hacim farkıyla hesaplanır.",
      ],
      strategy:
        "İki ölçümden giriş ve net debiyi bul. Kaçağın etkin olduğu hacmi onun hızına böl.",
      steps: [
        "Giriş 600/24=25 L/dk. Delik açık ölçümde 600−240=360 L artış var, net hız 15 L/dk.",
        "Ölçüm boyunca hacim 180 L’nin üstünde. Kaçak 25−15=10 L/dk.",
        "Giriş kapatılınca 600−180=420 L çıkar. Bu 42 dk sürer, sonra 180 L kalır.",
      ],
      optionReasons: [
        "24 dakikada delik tek başına 240 L çıkarır, 360 L kalır. Durma seviyesine ulaşmamıştır.",
        "36 dakikada 240 L kalır. Delik 180 L’ye ulaşana kadar çalışır.",
        "420 L, 10 L/dk ile 42 dakikada çıkar. Alt sınır 180 L’dir.",
        "42 dakika bulunmuş olsa da 420 L çıkınca tankta 180 L kalır.",
        "600/10 tüm suyun çıkabildiği başka bir modelin süresidir. Burada delik daha önce durur.",
      ],
      commonError:
        "Kaçak hızını ölçtükten sonra deliğin tankı tamamen boşaltabileceğini varsaymak.",
      check: "600−42·10=180 L. Bu hacimde kaçak durur.",
    },
  }),
  practice({
    key: "gecikmeli-giris-eszamanli-kapanis",
    prompt:
      "420 L’lik tankta başlangıçta 60 L var. Yalnız A girişi ilk 10 dk boyunca 12 L/dk su veriyor. 10. dakikada A kapanıyor, 18 L/dk veren B ve 3 L/dk çeken taban çıkışı birlikte açılıyor. Tam doluma kadar debiler sabit. Tank başlangıçtan kaç dakika sonra dolar?",
    options: ["16 dk", "18 dk", "24 dk", "26 dk", "30 dk"],
    answer: 3,
    hint: "Onuncu dakikadaki suyu hesapla. Bu andan sonra yalnız B ve çıkış açık.",
    guidance: {
      knowledge: [
        "Bir musluk kapandıktan sonra sonraki evrenin net debisine girmez.",
      ],
      strategy:
        "İlk evrenin son hacmini kullanarak ikinci evreyi başlat. En son süreleri topla.",
      steps: [
        "Onuncu dakikada 60+10·12=180 L su vardır.",
        "Sonraki net debi 18−3=15 L/dk. Kalan 420−180=240 L için 240/15=16 dk gerekir.",
        "Başlangıçtan geçen süre 10+16=26 dk.",
      ],
      optionReasons: [
        "16 dk yalnız B ve çıkışın açık olduğu ikinci evrenin süresidir.",
        "18. dakikada ikinci evre 8 dk sürmüştür. Hacim 180+8·15=300 L.",
        "24. dakikadaki hacim 180+14·15=390 L. Hedefe 30 L eksik.",
        "10 dk ilk evre ve 16 dk ikinci evre ile hacim 420 L’ye ulaşır.",
        "30. dakikadan önce, ikinci evrenin 16. dakikasında tam dolum gerçekleşmiştir.",
      ],
      commonError:
        "A’nın kapanmasını gözden kaçırmak veya ikinci evrenin süresini toplam süre diye vermek.",
      check: "60+10·12+16·(18−3)=420 L ve ilk 10 dakikada tank dolu değildir.",
    },
  }),
  practice({
    key: "iki-kesitli-kapta-yukseklik",
    prompt:
      "Boş bir kabın yatay kesit alanı tabandan 0,6 m yüksekliğe kadar 2 m², bu seviyenin üstünde 4 m²’dir. Kaba 1,6 m³ su veriliyor ve taşma olmuyor. Su yüksekliği kaç metredir?",
    options: ["0,4 m", "0,5 m", "0,8 m", "1,0 m", "0,7 m"],
    answer: 4,
    hint: "0,6 m’ye kadar kaç m³ su sığar? Yalnız o hacmi aşan suyu 4 m²’ye böl.",
    guidance: {
      knowledge: [
        "Bir katmanın hacmi, yatay kesiti sabitse kesit alanı ile dolan yüksekliğin çarpımıdır.",
      ],
      strategy:
        "İlk katmanın kapasitesini çıkar ve kalan hacmin üst katta yaptığı yükselmeyi bul.",
      steps: [
        "İlk katman 2·0,6=1,2 m³ alır. Üstte 1,6−1,2=0,4 m³ su kalır.",
        "Bu su 4 m² kesitte 0,4/4=0,1 m yükselir.",
        "Toplam yükseklik 0,6+0,1=0,7 m.",
      ],
      optionReasons: [
        "0,4 m, üst kesiti bütün kaba uygular. Gerçekte bu seviyede 2·0,4=0,8 m³ su vardır.",
        "0,5 m seviyesinde alt katmanda 1 m³ su vardır. Verilen hacim 1,6 m³’tür.",
        "0,8 m için alt katmandan sonra 4·0,2=0,8 m³ daha gerekir. Toplam 2 m³ olur.",
        "1,0 m için 1,2+4·0,4=2,8 m³ su gerekir.",
        "0,7 m için 2·0,6+4·0,1=1,6 m³ su yeter.",
      ],
      commonError:
        "Hacmin tümünü, kabın yalnız bir katmanının kesit alanına bölmek.",
      check: "0,7 m seviyesi, 1,2 m³ alt katman ve 0,4 m³ üst katman verir.",
    },
  }),
  practice({
    key: "iki-grafik-ayni-baslangic",
    prompt:
      "500 L’lik tankta t=0’da 80 L, 4. dakikada 200 L su var. İlk aralıkta yalnız sabit bir giriş çalışıyor. A planında giriş aynı hızla sürüyor. B planında aynı giriş sürerken 4. dakikada 20 L/dk çeken bir çıkış açılıyor. İki planda tam dolum başlangıçtan sırasıyla kaçıncı dakikadadır?",
    options: [
      "14. dk ve 34. dk",
      "10. dk ve 30. dk",
      "14. dk ve 14. dk",
      "14. dk ve 30. dk",
      "34. dk ve 14. dk",
    ],
    answer: 0,
    hint: "İlk iki noktadan girişin hızını bul. 4. dakikadan sonra iki planın net hızlarını ayrı yaz.",
    guidance: {
      knowledge: [
        "Zaman–hacim grafiğinde net debi, hacim farkının geçen süreye bölümüdür.",
      ],
      strategy:
        "İlk dört dakikanın eğimini bul. Sonraki iki doğrunun hedef hacmi kestiği zamanları hesapla.",
      steps: [
        "Giriş (200−80)/4=30 L/dk. Dördüncü dakikada 500−200=300 L eksik.",
        "A planında ek süre 300/30=10 dk. Başlangıçtan 4+10=14 dk.",
        "B planında net 30−20=10 L/dk. Ek süre 30 dk, başlangıçtan 4+30=34 dk.",
      ],
      optionReasons: [
        "A için 4+10, B için 4+30 başlangıçtan geçen süreleri verir.",
        "10 ve 30 yalnız dördüncü dakikadan sonraki ek sürelerdir.",
        "14 ve 14 iki plandaki ilk eğimi aynı şekilde uzatır. B’de çıkış açılınca eğim azalır.",
        "B için 30 dk dördüncü dakikadan sonra geçer. Başlangıçtan toplam 34 dk’dır.",
        "B planında çıkış dolumu yavaşlatır. Bu nedenle daha kısa süre B’ye ait olamaz.",
      ],
      commonError:
        "Başlangıç ölçümleri aynı olduğu için iki grafiğin devamını da aynı almak.",
      check: "A: 200+10·30=500. B: 200+30·10=500. İkisine de ilk 4 dk eklenir.",
    },
  }),
  practice({
    key: "tasmanin-sonraki-evreye-etkisi",
    prompt:
      "370 L’lik taşabilir bir tankta başlangıçta 250 L su var. Giriş 24 L/dk, taban çıkışı 4 L/dk. İlk 10 dakika ikisi de açık. Sonra giriş kapanıyor ve çıkış 20 dakika daha çalışıyor. Tank doluyken fazla su üstten taşar. Son hacim ve toplam taşan hacim sırasıyla nedir?",
    options: [
      "290 L ve 0 L",
      "290 L ve 80 L",
      "370 L ve 80 L",
      "290 L ve 120 L",
      "210 L ve 80 L",
    ],
    answer: 1,
    hint: "İlk evrede tank ne zaman dolar? Giriş kapanırken tankta en çok kapasitesi kadar su bulunur.",
    guidance: {
      knowledge: [
        "Tam dolduktan sonra giren ve taban çıkışıyla alınmayan su taşar.",
      ],
      strategy:
        "İlk evrede tam dolma süresini ve taşmayı ayrı bul. İkinci evreyi 370 L’den başlat.",
      steps: [
        "İlk net artış 24−4=20 L/dk. Kapasiteye eksik 370−250=120 L, tank 6 dakikada dolar.",
        "İlk evrenin kalan 4 dakikasında 4·20=80 L üstten taşar. İçeride 370 L vardır.",
        "Giriş kapanınca tabandan 20·4=80 L daha çıkar. Son hacim 370−80=290 L.",
      ],
      optionReasons: [
        "Son hacim 290 L olsa da ilk evrenin son 4 dakikasında 80 L taşar.",
        "İlk evrenin taşması 80 L, sonraki 20 dakikanın taban çıkışı 80 L. Tankta 290 L kalır.",
        "370 L girişin kapandığı andaki hacimdir. Sonrasında 80 L daha çıkar.",
        "120 L tank dolana kadar eklenen sudur. Taşma, dolduktan sonra başlar.",
        "210 L, taşan 80 L’yi dolu tankın hacminden bir daha çıkarmış olur.",
      ],
      commonError:
        "Taşan suyu ikinci evrenin başında tankta saymak veya fiziksel hacimden ikinci kez çıkarmak.",
      check: "250+10·24−30·4−80=290 L.",
    },
  }),
];
