import { txt, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { GuideSection, WorkedExample } from "./guides/types";

export const mixtureProblemsSource023Summary =
  "Aurelia 023 Karışım Problemleri, içerik 1.2 (19 Kasım 2026), PDF s. 1–10. MEBİ TYT Matematik Konu Özetleri, basılı s. 53 (PDF s. 55). OGM Problemler Video Ders Notu, PDF s. 27–29. OGM Defterim Matematik 9, basılı s. 195–196. Geçmiş sınavlardan öğren bölümünde 2013 ALES İlkbahar Sayısal-1, soru 18 bulunur.";

const titles = {
  operations: "Eşit miktar çıkınca hangi bileşenin gittiğini yaz",
  targetMass: "Hedef yüzde iki kütlenin oranını belirler",
  unknownRate: "Bilinmeyen derişimi toplam bileşenden geri bul",
  value: "Birim fiyatı toplam bedelden geri kur",
  firstMethods: "Birleştirme ve eklemede iki kütleyi izle",
  lastMethods: "Çıkarma, ters soru ve bedel için koşulu seç",
};

const headers = [
  "Yöntem",
  "Geçerli örnek",
  "Yöntemin sınırı",
  "Başka bir kullanım",
];

export const mixtureProblemsSource023Sections: GuideSection[] = [
  {
    title: titles.operations,
    paragraphs: [
      "200 g %30 şekerli karışımda 60 g şeker bulunur. Yalnız 40 g su buharlaşırsa şeker 60 g kalır, toplam 160 g olur. Aynı 40 g homojen olarak dökülürse çıkan parça 12 g şeker taşır. Son toplam yine 160 g, şeker 48 g olur.",
      "Dökülen parçanın yerine 40 g saf su konursa şeker 48 g kalıp toplam yeniden 200 g olur. Aynı miktarın üç farklı işlemdeki etkisini tablodan kontrol et.",
    ],
    table: {
      headers: [
        "40 g için işlem",
        "Kalan şeker",
        "Son toplam",
        "Şeker yüzdesi",
      ],
      rows: [
        ["Yalnız su buharlaşır", "60 g", "160 g", "%37,5"],
        ["Homojen karışım dökülür", "48 g", "160 g", "%30"],
        ["Homojen karışım dökülür, yerine su konur", "48 g", "200 g", "%24"],
      ],
    },
  },
  {
    title: titles.targetMass,
    paragraphs: [
      "Düşük derişim a, yüksek derişim b, hedef h olsun. a, b ve h ondalık kesir olarak yazılsın. Kütleler sırasıyla x ve y ise ax+by=h(x+y). Aynı terimleri toplayınca (h−a)x=(b−h)y çıkar. İki kütle de pozitif ve a<h<b ise x/y=(b−h)/(h−a). Yüzdeleri 10, 40 gibi yazarsan ortak 100 paydası sadeleşir ve aynı kütle oranı çıkar.",
      "%10 ve %40 karışımla %20 hedeflenirse düşük derişimli kütlenin yükseğe oranı (40−20)/(20−10)=2’dir. Toplam 150 g istenirse kütleler 100 g ve 50 g olur. Denetim: 10 g ve 20 g çözünen, toplam 150 g içinde %20 yapar.",
      "Başlangıç derişimleri farklı ve ikisinden de pozitif kütle katılıyorsa hedef arada kalır. Uç derişime ancak öteki karışımın payı sıfıra inebiliyorsa ulaşılır. İki başlangıç derişimi eşitse her pozitif paylaşım aynı derişimi verir. Hedef farklıysa çözüm yoktur.",
    ],
  },
  {
    title: titles.unknownRate,
    paragraphs: [
      "Bir karışımın başlangıç derişimi bilinmiyorsa önce son toplam kütlede gereken çözüneni bul. Bilinen karışımdan gelen çözüneni çıkar. Kalan bileşen kütlesini bilinmeyen karışımın başlangıç kütlesine böl.",
      "Şeker oranı bilinmeyen 60 g karışım, 40 g %30 şekerli suyla %24 hedefini veriyorsa toplamda 24 g şeker gerek. Bilinen 40 g karışım 12 g şeker taşır. İlk 60 g’da 12 g şeker vardır, yani %20. Eğer hedef toplam 10 g şeker gerektirseydi, bilinen karışım tek başına 12 g taşıdığı için hedef tutmazdı.",
      "Geri hesaplanan bileşen kütlesi 0 ile ilgili karışımın toplam kütlesi arasında olmalıdır. Yüzdeyi bulmak için ilgili toplam kütle pozitif olmalı.",
    ],
  },
  {
    title: titles.value,
    paragraphs: [
      "Birim bedel TL/kg ise her ürünün değeri kendi kilogramı ile birim bedelinin çarpımıdır. Bir ürünün fiyatı bilinmiyorsa hedef toplam bedelden bilinen ürünlerin bedelini çıkar. Farkı yalnız bilinmeyen ürünün kilogramına böl.",
      "15 kg karışımın birim bedeli 42 TL/kg. Bunun 5 kg’ı 30 TL/kg, öteki 10 kg’ın birim bedeli bilinmiyor. Toplam 630 TL, bilinen kısım 150 TL. Kalan 480 TL, 10 kg’ın değeri olduğundan aranan fiyat 48 TL/kg. Biri gram, diğeri kilogram verilirse önce ortak ölçüye çevir. Litreyi kütleye çevirmek için yoğunluk bilgisi gerekir.",
    ],
  },
  {
    title: titles.firstMethods,
    paragraphs: [
      "Her adımda S ile seçilen bileşenin kütlesini, T ile karışımın toplam kütlesini göster.",
    ],
    table: {
      headers,
      rows: [
        [
          "İki payı ve iki toplamı topla",
          "60 g %10 ve 60 g %30 birleşince (6+18)/120=%20.",
          "90 g %10 ve 30 g %30 için (9+9)/120=%15. Düz ortalama bu kütlelerde geçmez.",
          "2 kg %10 ve 6 kg %30 birleşirse 0,2+1,8=2 kg çözünen, toplam 8 kg. Son oran %25.",
        ],
        [
          "Yalnız çözücü değişiyorsa S sabit",
          "120 g %25 karışımdan yalnız 20 g su çıkarsa 30/100=%30.",
          "20 g homojen karışım çıkarsa 5 g çözünen de gider. 25/100=%25.",
          "1,2 kg %25 çözeltiden 200 g su giderse toplam 1 kg, çözünen 0,3 kg kalır.",
        ],
        [
          "Saf bileşeni iki yere ekle",
          "80 g %25 şekerli karışıma 20 g şeker eklenirse (20+20)/(80+20)=%40.",
          "20 g saf su eklenirse şeker 20 g kalır ve oran %20 olur.",
          "100 g %20 şekerli hamura 25 g saf şeker katılırsa kayıp olmadığında 45/125=%36.",
        ],
      ],
    },
  },
  {
    title: titles.lastMethods,
    paragraphs: [
      "Dökmeden sonra yerine konan maddeyi ayrı yaz. Ters soruda aranan kütle, yüzde veya birim bedel olabilir.",
    ],
    table: {
      headers,
      rows: [
        [
          "Önce homojen çıkar, sonra ekle",
          "120 g %40 şekerli karışımdan 30 g dökülür. Şeker 48−12=36 g. 30 g su eklenince 36/120=%30.",
          "Yerine 30 g şeker konursa 66/120=%55. Aynı son toplamla iki farklı oran oluşur.",
          "Yeni bir dökmede ilk yüzde yerine bir önceki adımın yüzdesini kullan.",
        ],
        [
          "Hedefte S=h·T yaz",
          "180 g %10 ile 60 g %30 birleşince (18+18)/240=%15. Hedef %15 ise kütle oranı 3:1’dir.",
          "Hedef %20 olsaydı aynı iki derişim için kütleler eşit olurdu.",
          "80 g bilinmeyen ile 20 g %50 birleşip %30 olursa ilk 80 g’da 20 g bileşen vardır. Oranı %25.",
        ],
        [
          "Birim bedeli kendi ağırlığıyla hesapla",
          "4 kg 30 TL/kg ve 6 kg 50 TL/kg için toplam 420 TL, ortalama 42 TL/kg.",
          "Kütleler 5’er kg olsaydı ortalama 40 TL/kg olurdu.",
          "2 parça 15 TL/adet ve 3 parça 25 TL/adet toplam 105 TL. Ortalama 21 TL/adet.",
        ],
      ],
    },
  },
];

export const mixtureProblemsSource023SheetText = new Map<string, string[]>([
  [
    titles.operations,
    [
      "Yalnız su kaybında çözünen sabit. Homojen dökmede toplam ve çözünen aynı oranda azalır. Sonra eklenen maddeyi ayrı yaz.",
    ],
  ],
  [
    titles.targetMass,
    [
      "a<b ve a<h<b ise düşük kütle/yüksek kütle = (b−h)/(h−a). Çözünen ile toplam kütle korunmalı.",
      "İki pozitif kütlede, derişimler farklıysa uç değerler elde edilemez. Derişimler eşitse yalnız o ortak hedef mümkün.",
    ],
  ],
  [
    titles.unknownRate,
    [
      "Bilinmeyen gruptaki bileşen = hedefteki toplam bileşen − bilinen gruptaki bileşen. Bu kütleyi bilinmeyen grubun toplamına böl.",
      "Bileşen kütlesi 0 ile o grubun toplamı arasında olmalı.",
    ],
  ],
  [
    titles.value,
    [
      "Toplam bedel = birim bedel · toplam kütle. Bilinen kısımların bedelini toplamdan çıkar, bilinmeyen kısmın kilogramına böl.",
    ],
  ],
  [
    titles.firstMethods,
    [
      "Birleştirmede S ve T ayrı toplanır. Saf su yalnız T’yi, saf bileşen S ve T’yi değiştirir.",
    ],
  ],
  [
    titles.lastMethods,
    [
      "Dökmede son derişimi takip et. Ters soruda arananın gram, yüzde veya TL/kg olduğunu belirt.",
    ],
  ],
]);

export const mixtureProblemsSource023Examples: WorkedExample[] = [
  {
    title: "Saf su eklendiğinde iki kütle satırını tamamla",
    prompt:
      "150 g %16 şekerli suya 50 g saf su ekle. İlk şeker = 150·… = … g. Son toplam = … g. Son şeker yüzdesi = 100·…/…. Boşlukları doldur.",
    strategy:
      "Çözümü açmadan önce yeni gelen 50 gramın şeker taşıyıp taşımadığını yaz.",
    steps: [
      { label: "İlk şeker", explanation: "150·0,16=24 g şeker." },
      {
        label: "Son toplam",
        explanation:
          "50 g saf su eklenince toplam 200 g olur. Şeker 24 g kalır.",
      },
      {
        label: "Yüzde",
        explanation: "Kalan şekeri yeni toplama böl.",
        expression: "100·24/200=12",
      },
    ],
    answer: "Son şeker yüzdesi %12.",
    check:
      "200 g’ın %12’si 24 g. 50 g saf şeker eklenseydi (24+50)/200=%37 olurdu.",
    pitfall:
      "Şekerun kütlesi sabit kaldığı için yüzdesinin de sabit kalacağını düşünmek.",
  },
  {
    title: "Gramla verilen kütleyi fiyat hesabına kat",
    prompt:
      "750 g bir ürünün birim bedeli 48 TL/kg. İkinci üründen 1,25 kg var ve birim bedeli 64 TL/kg. Karışımın kilogram başına ortalama bedeli kaç TL’dir?",
    strategy:
      "Her birim fiyatı kendi kilogramıyla çarp. İki bedeli ortak paydaya böl.",
    steps: [
      { label: "Ortak birim", explanation: "750 g = 0,75 kg. Toplam 2 kg." },
      {
        label: "İki bedel",
        explanation: "Birinci bedel 0,75·48=36 TL, ikinci 1,25·64=80 TL.",
      },
      {
        label: "Kilogram başına",
        explanation: "Toplam bedel 116 TL. 2 kg’a böl.",
        expression: "116/2=58 TL/kg",
      },
    ],
    answer: "Ortalama bedel 58 TL/kg.",
    check:
      "58·2=116 TL. Kütlesi daha büyük olan 64 TL/kg’lık parçaya daha yakındır.",
    pitfall:
      "750 gramı 750 kilogram gibi kullanmak veya fiyatları düz ortalamak.",
  },
];

export const mixtureProblemsSource023Recall = [
  {
    prompt:
      "İki farklı derişimin tam ortası hedefleniyorsa iki kütle nasıl ilişkilidir?",
    answer:
      "İki kütle eşit olmalı. Hedef ortadan uzaklaşırsa iki derişime olan uzaklıkların ters oranı kullanılır.",
  },
  {
    prompt:
      "Geri hesaplanan ilk çözünen kütlesi o karışımın kendi toplamından büyükse ne olur?",
    answer:
      "İlk yüzde %100’ü aşar. Verilen iki bileşenli modelde uygun karışım yoktur.",
  },
  {
    prompt:
      "İki kez homojen karışım dökerken ikinci çıkarılan çözünen nasıl bulunur?",
    answer:
      "İlk işlemin sonunda oluşan derişimi, ikinci dökülen toplam kütleyle çarp.",
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
    id: `karisim-problemleri-023-${key}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(`${guidance.steps.join(" ")} ${guidance.check}`),
    skill: "Karışım Problemleri",
    guidance,
  };
}

export const mixtureProblemsSource023Practice: Question[] = [
  practice({
    key: "hedeften-iki-kutle",
    prompt:
      "%12 şekerli su ile %40 şekerli sudan toplam 240 g %33 şekerli su hazırlanacak. %12’lik ve %40’lık karışımlardan sırasıyla kaç gram kullanılmalı?",
    options: [
      "120 g ve 120 g",
      "180 g ve 60 g",
      "80 g ve 160 g",
      "60 g ve 180 g",
      "48 g ve 192 g",
    ],
    answer: 3,
    hint: "Son toplamdan gereken şekeri bul. İki başlangıç kütlesinin toplamı 240 g olmalı.",
    guidance: {
      knowledge: [
        "Aynı bileşen için başlangıçlardaki şeker kütleleri toplanır.",
      ],
      strategy:
        "%12’lik miktarı x, %40’lık miktarı 240−x yaz. Toplam şekeri hedef kütleye eşitle.",
      steps: [
        "Hedef şeker 240·0,33=79,2 g.",
        "0,12x+0,40(240−x)=79,2 ⇒ 96−0,28x=79,2.",
        "x=16,8/0,28=60 g. Diğer kütle 180 g.",
      ],
      optionReasons: [
        "Eşit kütlede hedef, %12 ile %40’ın ortası olan %26 olur.",
        "Bu sıralama düşük derişimli karışımı daha ağır yapar ve %19 verir.",
        "Bu seçim 9,6+64=73,6 g şeker verir. Hedef 79,2 g gerekiyordu.",
        "60·0,12+180·0,40=79,2 g. Toplam 240 g.",
        "48·0,12+192·0,40=82,56 g. Hedef şekeri aşar.",
      ],
      commonError:
        "Hedef %33 tam orta olmadığı halde iki kütleyi eşit varsaymak.",
      check:
        "Düşük/yüksek kütle oranı (40−33)/(33−12)=7/21=1/3. 60/180 de 1/3.",
    },
  }),
  practice({
    key: "bilinmeyen-yuzde-sinir",
    prompt:
      "Şeker oranı bilinmeyen 90 g A karışımı, 60 g %35 şekerli karışımla birleştiriliyor. A saf su da olabilir. Hedefin %26 ve %12 olduğu iki ayrı denemede A’nın şeker yüzdesi ne olabilir?",
    options: [
      "İlkinde %20, ikincisi mümkün değil.",
      "İlkinde %20, ikincisinde %0.",
      "İlkinde %26, ikincisinde %12.",
      "İlkinde %30, ikincisi mümkün değil.",
      "İki hedef de mümkün değil.",
    ],
    answer: 0,
    hint: "Her hedef için 150 gramda toplam kaç gram şeker gerektiğini bul. Bilinen kaptan gelen şekeri çıkar.",
    guidance: {
      knowledge: ["Bir karışımın taşıdığı şeker kütlesi negatif olamaz."],
      strategy:
        "Hedef şekerden bilinen 21 gramı çıkar. Kalan şekerin 90 gramdaki yüzdesini bul.",
      steps: [
        "60 g %35’lik karışımdan 21 g şeker gelir. Son toplam 150 g.",
        "%26 için 39 g gerekir. A’da 39−21=18 g, yani 18/90=%20.",
        "%12 için yalnız 18 g gerekir. Bilinen kap zaten 21 g taşıdığından hedef mümkün değildir.",
      ],
      optionReasons: [
        "İlk hedef 18 g şekerle sağlanır. İkinci hedef, bilinen kaptan gelen şekerden daha azını ister.",
        "A %0 olsa bile 21/150=%14 olur. %12’ye ulaşılamaz.",
        "Verilen yüzdeler son karışımın hedefleridir. A’nın derişimi ayrı hesaplanır.",
        "A %30 olsa toplam şeker 27+21=48 g, derişim %32 olur.",
        "18 g şeker taşıyan 90 g A ile ilk hedef sağlanır.",
      ],
      commonError:
        "Negatif bileşen kütlesini geçerli oran saymak veya %0 seçip hedefi yeniden kontrol etmemek.",
      check:
        "İlk denemede (18+21)/150=%26. İkinci denemenin erişilebilir en düşük şeker yüzdesi %14’tür.",
    },
  }),
  practice({
    key: "ayni-miktar-uc-islem",
    prompt:
      "Her biri 180 g ve %25 şekerli üç homojen karışım var. A’dan yalnız 36 g su buharlaşıyor. B’den 36 g homojen karışım dökülüyor. C’den 36 g homojen karışım dökülüp yerine 36 g saf su konuyor. Son şeker yüzdeleri A, B, C sırasıyla nedir?",
    options: [
      "%25, %25 ve %20",
      "%31,25, %25 ve %20",
      "%31,25, %31,25 ve %25",
      "%25, %20 ve %31,25",
      "%31,25, %25 ve %25",
    ],
    answer: 1,
    hint: "Üç kapta da ilk şeker miktarı aynı. Her işlemde şekerin da çıkıp çıkmadığını ve son toplamı ayrı yaz.",
    guidance: {
      knowledge: [
        "Yalnız su uçunca şeker korunur. Homojen dökülen kısım da ilk karışımın şeker yüzdesini taşır.",
      ],
      strategy: "Şeker ve toplam kütleyi üç ayrı satırda hesapla.",
      steps: [
        "İlk şeker 180·0,25=45 g. A’da şeker 45 g, toplam 144 g. Son yüzde %31,25.",
        "B ve C’de 36·0,25=9 g şeker gider. B’de 36 g şeker ve 144 g toplamla yüzde %25.",
        "C’de saf su, toplamı 180 g’a çıkarır. 36/180=%20.",
      ],
      optionReasons: [
        "A’da şeker sabit ve toplam azalıyor. %25’te kalmaz.",
        "A’da 45/144, B’de 36/144, C’de 36/180 oranları kullanılır.",
        "B’de dökülen parça 9 g şeker taşır. A ve B’nin son şeker kütleleri eşit olmaz.",
        "B’nin oranı homojen dökmede değişmez. C’de su eklenince oran düşer.",
        "C’ye eklenen saf su, çözüneni artırmadan paydayı büyütür ve yüzdeyi %20 yapar.",
      ],
      commonError:
        "Eşit miktar çıktığı için üç işlemin de aynı maddeyi götürdüğünü düşünmek.",
      check:
        "A ve B aynı son toplamda farklı şeker taşır. B ve C aynı şekeri farklı son toplamda taşır.",
    },
  }),
  practice({
    key: "iki-kez-farkli-yerine-koy",
    prompt:
      "200 g %40 şekerli karışımdan 50 g homojen karışım dökülüp yerine 50 g saf su konuyor. Karışım yeniden homojen olduktan sonra yine 50 g dökülüp bu kez yerine 50 g saf şeker konuyor. Son şeker yüzdesi kaçtır?",
    options: ["%30", "%41,25", "%45", "%47,5", "%55"],
    answer: 3,
    hint: "İkinci dökmede ilk %40’ı kullanma. İlk işlemden sonra yeni karışımın yüzdesini bul.",
    guidance: {
      knowledge: [
        "Her homojen dökme o andaki karışımın derişimine göre bileşen götürür.",
      ],
      strategy:
        "İki dökmeyi ve iki eklemeyi sırayla yaz. Her dökme öncesinde şeker gramını kontrol et.",
      steps: [
        "İlk 80 g şekerden 50·0,40=20 g çıkar. Saf suyla toplam 200 g’a döner, şeker 60 g.",
        "Yeni oran 60/200=%30. İkinci dökmede 50·0,30=15 g şeker çıkar.",
        "45 g şekere 50 g saf şeker eklenir. Son oran 95/200=%47,5.",
      ],
      optionReasons: [
        "Bu, yalnız ilk işlemin sonundaki yüzdedir.",
        "İşlemler ters sırada yapılsaydı önce %55, sonra %41,25 olurdu.",
        "İkinci dökmede de ilk %40’ı kullanıp 20 g şeker çıkarmak %45 verir.",
        "İkinci dökmeden sonra kalan 45 g’a 50 g şeker eklenir. Toplam 200 g.",
        "%55, yalnız ilk karışımdan döküp yerine saf şeker koyma sonucudur.",
      ],
      commonError:
        "İkinci dökmede karışımın güncellenen yüzdesi yerine ilk yüzdeyi kullanmak.",
      check:
        "Her işlemden sonra toplam 200 g. İlkinde 60 g, ikincisinde 95 g şeker var.",
    },
  }),
  practice({
    key: "toplam-bedelden-birim-fiyat",
    prompt:
      "25 kg karışımın ortalama bedeli 42 TL/kg. Karışımın 5 kg’ı 30 TL/kg, 10 kg’ı 40 TL/kg değerinde. Kalan kısmın birim bedeli kaç TL/kg’dır?",
    options: ["40 TL/kg", "42 TL/kg", "45 TL/kg", "48 TL/kg", "50 TL/kg"],
    answer: 4,
    hint: "Toplam TL tutarından iki bilinen kısmın tutarını çıkar. Kalan bedeli kendi kilogramına böl.",
    guidance: {
      knowledge: [
        "Kilogram ile TL/kg çarpılırsa o kısmın toplam TL bedeli bulunur.",
      ],
      strategy:
        "Hedef toplamla bilinen toplam arasında kalan TL’nin hangi kütleye ait olduğunu bul.",
      steps: [
        "25·42=1.050 TL toplam bedel. Bilinen ürünler 5·30+10·40=550 TL.",
        "Kalan 25−5−10=10 kg, bedeli 1.050−550=500 TL.",
        "500/10=50 TL/kg.",
      ],
      optionReasons: [
        "Bu, verilen ikinci kısmın birim bedelidir. Kalan 10 kg da bu fiyatta olursa toplam 950 TL olur.",
        "42 TL/kg tüm karışımın ortalaması. Kalan parça da bu değerde olsaydı toplam 970 TL olurdu.",
        "45 TL/kg için toplam 1.000 TL olur ve 1.050 TL hedefi tutmaz.",
        "48 TL/kg için toplam 1.030 TL olur ve 1.050 TL hedefi tutmaz.",
        "Kalan kısmın 500 TL bedeli, 10 kg’a bölününce 50 TL/kg olur.",
      ],
      commonError:
        "Kalan kısmın bedelini toplam 25 kg’a bölmek veya birim fiyatları ağırlıksız toplamak.",
      check: "(5·30+10·40+10·50)/25=42 TL/kg.",
    },
  }),
  practice({
    key: "su-hedefinde-saf-tuz",
    prompt:
      "Yalnız su ve tuz içeren 180 g karışımın %10’u tuz. Kaç gram saf tuz eklenirse suyun kütlece yüzdesi %75 olur? Eklenen tuzun tamamı karışıma katılıyor.",
    options: ["18 g", "27 g", "36 g", "45 g", "54 g"],
    answer: 2,
    hint: "Eklenen madde su taşımıyor. İlk su kütlesini bul ve bu kütleyi yeni toplamın %75’i yap.",
    guidance: {
      knowledge: [
        "İki bileşende tuz ve su yüzdeleri toplamı %100. Saf tuz eklemek su kütlesini değiştirmez.",
      ],
      strategy: "Sabit suyu yeni toplamın %75’ine eşitle. İlk toplamı çıkar.",
      steps: [
        "İlk su 180·0,90=162 g. Eklenen tuz x g olursa su yine 162 g, toplam 180+x.",
        "162=0,75(180+x) ⇒ 180+x=216 g.",
        "Eklenecek miktar 216−180=36 g.",
      ],
      optionReasons: [
        "18 g başlangıçtaki tuzdur. Bu kadar tuz eklenirse su 162/198 olur ve %75’ten büyüktür.",
        "27 g eklenirse 162/207 oranı %75’ten büyüktür.",
        "162/216=0,75. Toplam 36 g büyümelidir.",
        "45 g eklenirse su 162/225=%72’ye düşer.",
        "54 g eklenirse su 162/234 olur ve %75’ten küçüktür.",
      ],
      commonError:
        "Sorulan su yüzdesini tuz yüzdesi sanmak veya eklenen tuzu toplamdan dışlamak.",
      check: "Son tuz 18+36=54 g. 54/216=%25, su oranı %75.",
    },
  }),
];
