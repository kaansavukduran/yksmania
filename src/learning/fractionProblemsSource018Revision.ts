import { txt, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { GuideSection, WorkedExample } from "./guides/types";

export const fractionProblemsSource018Summary =
  "Aurelia 018 Kesir Problemleri, içerik 1.1 (19 Kasım 2026), PDF s. 1–10. MEBİ TYT Matematik Konu Özetleri, basılı s. 48 (PDF s. 50). Alıştırmalar özgündür. Geçmiş sınavlardan öğren bölümünde 2023 TYT Temel Matematik 3 kaynak kaydı yer alır.";

const titles = {
  inverse: "Kalan sıfırsa önce kalan oranına bak",
  whole: "Bütün değişirse sabit kalan parçayı izle",
  trial: "Deneme bütününü gerçek miktardan ayır",
  compare: "Bir bütüne kalan eksiği karşılaştır",
  firstMethods: "Parça, kalan ve ortak bütün için yöntem seç",
  lastMethods: "Fark, değişim ve büyüklük için yöntem seç",
};

const headers = [
  "İlk hamle",
  "Geçerli örnek",
  "Yöntemin durduğu yer",
  "Aynı yapıda bir uygulama",
];

export const fractionProblemsSource018Sections: GuideSection[] = [
  {
    title: titles.inverse,
    paragraphs: [
      "Başlangıç x≥0, kullanılan oran r ve son kalan R olsun. Tüketim modelinde 0≤r≤1 ve R=(1−r)x. r<1 ise kalan çarpanı pozitiftir. R≥0 için tek cebirsel aday x=R/(1−r) olur. Birim ve adet koşullarını bu adayda ayrıca denetle.",
      "r=1 iken kalan çarpanı sıfırdır. R=0 ise her x≥0 denklemle uyumludur ve başlangıç tek değer olarak bulunamaz. R>0 verilirse veri tutarsızdır. Örneğin boşalan kaptan önceki hacmi çıkaramayız. 5x/6=13’ün sonucu 78/5 L ise hacim için uygundur, 78/5 tane kapalı kutu ise geçerli bir adet değildir.",
    ],
  },
  {
    title: titles.whole,
    paragraphs: [
      "16 kırmızı ve 24 mavi parçanın kırmızı oranı 16/40=2/5’tir. Yalnız 8 mavi parça eklenirse kırmızı sayı 16, bütün 48 olur. Yeni oran 16/48=1/3’tür. Buradaki oran değişikliği payın artmasından değil, karşılaştırılan bütünün büyümesinden gelir.",
      "Paydaların aynı olması bütünleri aynı yapmaz. 24 parçalık grubun 1/3’ü 8, 45 parçalık başka grubun 1/3’ü 15’tir. Bu parçalar arasındaki fark 7’dir. (1/3−1/3)x=0 hesabı iki farklı grubu tek x ile temsil ettiği için geçersizdir. Önce hangi bütünün kullanıldığını yaz, sonra kesri uygula.",
    ],
  },
  {
    title: titles.trial,
    paragraphs: [
      "Başlangıcın 1/6’sı ve 1/4’ü aynı bütün üzerinden hesaplanıyorsa 12 birimlik deneme bütünü seçebilirsin. Parçalar 2 ve 3, toplamları 5, kalan 7 birimdir. Bu, gerçek kalanın bütüne oranının 7/12 olduğunu gösterir. Kalan gerçekte 42 ise (7/12)x=42, yani x=72 olur. Deneme bütünü yalnız oranı görmeye yarar.",
      "İkinci kesir kalana uygulanıyorsa paydaların EKOK’unu almak her ara adedi tam yapmaz. Önce 12 parçanın 1/4’ü çıkarılırsa 9 kalır. Onun altıda biri 3/2 olur. Tam parçalar gerekiyorsa ikinci kullanımı başlangıcın (3/4)(1/6)=1/8’i olarak yaz. İlk ve ikinci kullanımın sade paydaları 4 ve 8’dir. Her iki kullanımın da tam sayı olması için en küçük pozitif başlangıç 8 parçadır.",
    ],
  },
  {
    title: titles.compare,
    paragraphs: [
      "Her biri 0 ile 1 arasında olan iki kesir 1’e yakınsa açıklarını yazmak işlemi kısaltabilir. 18/19’un açığı 1/19, 30/31’in açığı 1/31’dir. 1/31<1/19 olduğundan 30/31 daha büyüktür. Bir bütünü tamamlamak için daha küçük pay kalan kesir, bütünün daha büyük bir bölümünü doldurur.",
      "Payda büyüdüğü için her zaman daha büyük kesir seçemezsin. Burada iki açığın payı 1 olduğu için onları kolayca sıraladık. İşaretler karışık veya oranlar 1’in üstündeyse genel ortak payda ya da çapraz çarpım yolunu kullan. −30/31 ile −18/19 karşılaştırıldığında, pozitif değerlerin sırası eksi işaretiyle tersine döner.",
    ],
  },
  {
    title: titles.firstMethods,
    paragraphs: [
      "İlk iş, verilen miktarın ne olduğunu ve hangi bütüne ait olduğunu yazmak. Sonra bu miktarı doğrudan hesaplaman mı, yoksa ondan geriye doğru gitmen mi gerektiğine karar ver.",
    ],
    table: {
      headers,
      rows: [
        [
          "Bütünden parçayı bul",
          "108 sayfanın 5/9’u 60 sayfadır.",
          "108 kalan sayfaysa aynı çarpımı doğrudan kullanma.",
          "108 m ipliğin 5/9’u 60 m’dir.",
        ],
        [
          "Parçadan bütüne dön",
          "Deponun 7/10’u 35 L ise 35÷(7/10)=50 L.",
          "35 L bütünse 7/10’u 24,5 L’dir. Bu kez çarpılır.",
          "Etiket fiyatının 3/4’ü 180 TL ise etiket 240 TL’dir.",
        ],
        [
          "Kalan çarpanlarını çarp",
          "Önce 1/5, sonra kalanın 1/4’ü kullanılırsa (4/5)(3/4)=3/5 kalır.",
          "İkisi de başlangıcın kesri olsaydı 1−1/5−1/4=11/20 kalırdı.",
          "75 L’nin 4/5’i ilk filtreden, onun 3/4’ü ikinciden geçerse 45 L çıkar.",
        ],
        [
          "Aynı bütünün ayrı parçalarını topla",
          "200 TL’nin ayrı 1/5’i ve 3/10’u harcanırsa 100 TL kalır.",
          "Aynı payda iki farklı büyüklüğün aynı bütüne ait olduğunu göstermez.",
          "200 g malzemenin 40 g ve 60 g’lık ayrı payları alınırsa 100 g kalır.",
        ],
      ],
    },
  },
  {
    title: titles.lastMethods,
    paragraphs: [
      "Hangi miktarın sabit kaldığını, adımların hangi değere uygulandığını ve sonucun kesirli olup olamayacağını birlikte denetle.",
    ],
    table: {
      headers,
      rows: [
        [
          "Parça farkını ortak bütüne bağla",
          "Aynı x’in 5/6’sı ile 1/2’si arasındaki fark 18 ise x/3=18, x=54.",
          "Farklı bütünden gelen parçalar tek x ile karşılaştırılamaz.",
          "54 cm’lik şeritte 45 cm ile 27 cm işaretleri arası 18 cm’dir.",
        ],
        [
          "Her adımın yeni tabanını kullan",
          "80 önce 1/8 artıp yeni miktarın 1/9’u azalırsa 80·(9/8)·(8/9)=80.",
          "Aynı artış ve azalış oranı birbirini götürmez. 80·(9/8)·(7/8)=78,75.",
          "240 TL’ye önce 1/4 indirim ve yeni fiyata 1/3 artış uygulanırsa fiyat yine 240 TL olur.",
        ],
        [
          "Bir bütüne eksiği karşılaştır",
          "20/21’in açığı 1/21, 24/25’in açığı 1/25’tir. 24/25 büyüktür.",
          "Negatiflere aynı sırayı taşıma. −24/25<−20/21.",
          "İki eşit tanktan %96 dolu olanın açığı, 20/21 dolu tanktan küçüktür.",
        ],
        [
          "Sabit parçayı ve tam adedi denetle",
          "8 işaretli ve 16 işaretsiz parçaya 8 işaretsiz eklenirse işaretli pay 8/32=1/4.",
          "5 kişinin 1/2’si tam kişi adedi olarak 2,5 olamaz.",
          "8 L boya ile 16 L su karışımına 8 L su eklenirse boya oranı 1/4 olur.",
        ],
      ],
    },
  },
];

// The summary keeps the guide's method tables and condenses only the revised sections.
export const fractionProblemsSource018SheetText = new Map<string, string[]>([
  [
    titles.inverse,
    [
      "R=(1−r)x ve x≥0. 0≤r<1 ise x=R/(1−r). r=1, R=0 iken x belirlenemez. r=1, R>0 iken veriler çelişir. Hacim kesirli olabilir, tam nesne adedi olamaz.",
    ],
  ],
  [
    titles.whole,
    [
      "Sabit parça sayısını yeni bütüne böl. 16/40 oranında yalnız bütüne 8 eklenirse 16/48=1/3 olur. Aynı payda, aynı bütün demek değildir.",
    ],
  ],
  [
    titles.trial,
    [
      "Başlangıca bağlı paylar için paydaların EKOK’u deneme bütünü olabilir. Gerçek bütünü verilerle çöz. Ardışık kesirlerde önce payı başlangıcın kesri olarak yaz, sonra tam sayı adedini denetle.",
    ],
  ],
  [
    titles.compare,
    [
      "0 ile 1 arasındaki iki kesrin 1’e açıklarını yaz. Daha küçük açık daha büyük kesir demektir. 30/31>18/19, çünkü 1/31<1/19.",
    ],
  ],
  [
    titles.firstMethods,
    ["İstenen ve bilinen miktarı ayır. Her kesrin bütünü açık olmalı."],
  ],
  [
    titles.lastMethods,
    ["Ortak bütünü, adımların sırasını ve tam sayı koşulunu denetle."],
  ],
]);

export const fractionProblemsSource018Examples: WorkedExample[] = [
  {
    title: "Kalan çarpanlarındaki boşlukları tamamla",
    prompt:
      "Bir paranın önce 2/7’si, sonra kalanın 1/5’i harcanıyor. 400 TL kalıyor. x başlangıç olsun. Önce x·□·□=400 eşitliğindeki çarpanları, sonra x’i bul.",
    strategy:
      "Her aşama için kullanılan kısmı 1’den çıkar. İkinci çarpan ara kalana uygulanır.",
    steps: [
      {
        label: "İlk kalan",
        explanation: "2/7 kullanılırsa 5/7 kalır.",
        expression: "K₁=(5/7)x",
      },
      {
        label: "Son kalan",
        explanation: "Ara miktarın 1/5’i harcanır ve 4/5’i kalır.",
        expression: "(5/7)(4/5)x=(4/7)x=400",
      },
      {
        label: "Başlangıç",
        explanation: "Bilinen 400 TL, başlangıcın 4/7’sidir.",
        expression: "x=400·7/4=700 TL",
      },
    ],
    answer: "Kalan çarpanları 5/7 ve 4/5, başlangıç 700 TL.",
    check:
      "İlk harcama 200 TL, ara kalan 500 TL. İkinci harcama 100 TL ve son kalan 400 TL.",
    pitfall: "İkinci 1/5 kesrini doğrudan 700 TL’ye uygulamak.",
  },
];

export const fractionProblemsSource018Recall = [
  {
    prompt: "Tamamı tüketilmiş ve kalan sıfırsa başlangıç belirlenebilir mi?",
    answer:
      "Hayır. x≥0 için 0·x=0 her başlangıçla uyumludur. Pozitif bir son kalan verildiyse koşullar çelişir.",
  },
  {
    prompt: "Paydaları aynı iki kesirden ne zaman ortak bütün x çıkar?",
    answer:
      "İki parça gerçekten aynı x bütününe aitse. Eşit payda bu koşulu tek başına sağlamaz.",
  },
  {
    prompt: "Yalnız işaretsiz nesneler eklenirse işaretli oranında ne değişir?",
    answer:
      "İşaretli miktar sabit kalır, toplam artar. İşaretli miktar pozitifse grubun içindeki oranı küçülür.",
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
    id: `kesir-problemleri-018-${key}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(`${guidance.steps.join(" ")} ${guidance.check}`),
    skill: "Kesir Problemleri",
    guidance,
  };
}

export const fractionProblemsSource018Practice = [
  practice({
    key: "sifir-kalan-siniri",
    prompt:
      "Başlangıç miktarı N≥0 olan iki ayrı kayıt düşün. İki kayıtta da başlangıç miktarının tamamı kullanılmış. Birinci kayıtta kalan 0, ikinci kayıtta kalan 8 litre yazıyor. Kayıtlar başlangıç miktarını nasıl belirler?",
    options: [
      "Birincide yalnız N=0, ikincide yalnız N=8 olur.",
      "İki kayıtta da başlangıç belirlenemez ama veriler uyumludur.",
      "İki kayıtta da hiçbir başlangıç verilerle uyumlu değildir.",
      "Birincide her N≥0 uyumludur. İkincide veriler çelişir.",
      "Birincide yalnız N=1, ikincide yalnız N=0 olur.",
    ],
    answer: 3,
    hint: "Tamamı kullanılırsa kalan çarpanı kaç olur? İki kayıtta da aynı çarpan denklemini yaz.",
    guidance: {
      knowledge: [
        "Son kalan (1−r)N’dir. Kullanılan oran 1 ise kalan çarpanı 0’dır ve sıfıra bölünmez.",
      ],
      strategy:
        "0·N=0 ile 0·N=8 denklemlerinin mümkünlük durumunu ayrı denetle.",
      steps: [
        "İlk denklem 0·N=0. Her N≥0 bunu sağlar, tek değer çıkmaz.",
        "İkinci denklem 0·N=8. Sol taraf daima 0 olduğundan çözüm yoktur.",
      ],
      optionReasons: [
        "Örneğin N=10 da ilkini sağlar. İkincide 8’den başlanması 8 kaldığı anlamına gelmez.",
        "İkinci kayıt pozitif bir son kalan yazdığı için uyumsuzdur.",
        "İlk kayıt N=0 ve N=3 dâhil her negatif olmayan değeri kabul eder.",
        "İlk kayıtta başlangıç belirlenemez. İkinci kayıtta tam kullanım pozitif kalanla çelişir.",
        "N=1 ilkini sağlar fakat tek değer değildir. N=0 ikinciyi sağlamaz.",
      ],
      commonError:
        "Kalan çarpanı sıfır olduğunda yine bölerek başlangıç değeri bulmaya çalışmak.",
      check: "N=5 ve N=12’nin ikisinde de tam kullanım sonrası sıfır kalır.",
    },
  }),
  practice({
    key: "ardisik-ekok-tam-adet",
    prompt:
      "Pozitif sayıda özdeş taşın önce 1/6’sı, sonra kalanın 1/4’ü ayrılıyor. Her iki aşamada ayrılan taş sayısı tam sayıysa en küçük başlangıç adedi kaçtır?",
    options: ["24", "6", "12", "18", "48"],
    answer: 0,
    hint: "İkinci ayrılan kısmı başlangıcın kesri olarak yaz. En küçük başlangıcı bu iki kesrin sade paydalarıyla denetle.",
    guidance: {
      knowledge: [
        "Tam nesne adedinin p/q’si tam sayıysa ve kesir sadeyse, başlangıç adedi q’nun katı olmalıdır.",
      ],
      strategy:
        "İlk ve ikinci ayrılan taşların başlangıca göre oranlarını ayrı bul, paydaların ortak katını kullan.",
      steps: [
        "İlk grup N/6. Kalan 5N/6 olur.",
        "İkinci grup (1/4)(5N/6)=5N/24. 5 ile 24 aralarında asaldır.",
        "N, 6’nın ve 24’ün katı olmalıdır. En küçük pozitif aday 24’tür.",
      ],
      optionReasons: [
        "24’ten ilk ayrılan 4, ikincisi 5 olur; ikisi tam sayıdır.",
        "6’dan ilk 1 ayrılır; kalan 5’in dörtte biri tam sayı değildir.",
        "12 ilk yazılan paydaların EKOK’udur; ikinci grupta 10/4=5/2 çıkar.",
        "18’den 3 ayrılır, kalanın dörtte biri 15/4’tür.",
        "48 iki tam grup verir, fakat 24 daha küçüktür.",
      ],
      commonError:
        "İkinci kesri kalana uygulamadan iki yazılı paydanın EKOK’unu doğrudan almak.",
      check: "24→20→15. Ayrılan 4 ve 5 ile kalan 15 bütünü verir.",
    },
  }),
  practice({
    key: "bire-yakin-kesirler",
    prompt:
      "İki eşit büyüklükte kutu sırasıyla 28/29 ve 34/35 oranında dolu. Bir bütüne kalan eksiği kullanarak doğru karşılaştırmayı seç.",
    options: [
      "Birinci kutu daha dolu, çünkü 29<35.",
      "İki kutu eşit dolu, çünkü iki kesrin de paydası payından 1 büyük.",
      "Birinci kutu daha dolu, çünkü 1/29<1/35.",
      "İkinci kutu daha dolu, çünkü 1/35>1/29.",
      "İkinci kutu daha dolu, çünkü 1/35<1/29.",
    ],
    answer: 4,
    hint: "Her doluluk oranını 1’den çıkar ve kalan açıkları karşılaştır.",
    guidance: {
      knowledge: [
        "Pozitif ve 1’den küçük doluluk oranında açık, 1’den doluluk oranını çıkararak bulunur.",
      ],
      strategy:
        "Açık kesirleri aynı paya indirgenmiş biçimde karşılaştır; açık küçükse doluluk büyüktür.",
      steps: [
        "İlk açık 1−28/29=1/29.",
        "İkinci açık 1−34/35=1/35.",
        "1/35<1/29 olduğundan ikinci kutu daha doludur.",
      ],
      optionReasons: [
        "Doğrudan yalnız paydaları sıralamak doluluk sırası vermez.",
        "Her iki açığın payı 1, paydaları farklıdır; açıklar eşit değildir.",
        "1/29, 1/35’ten büyüktür.",
        "Sıralama doğru olsa da 1/35>1/29 gerekçesi yanlıştır.",
        "İkinci kutuda tamamlanması gereken oran daha küçüktür.",
      ],
      commonError:
        "Doluluk oranı ile bu oranın 1’e eksiğinin aynı sırada olduğunu varsaymak.",
      check: "34·29=986 ve 28·35=980. Aynı sıralama çapraz çarpımla bulunur.",
    },
  }),
  practice({
    key: "yeni-butun-sabit-pay",
    prompt:
      "14 kırmızı ve 21 beyaz kart bulunan bir kutuya yalnız beyaz kart ekleniyor. Kırmızı kartların bütün kartlara oranının 1/3’e düşmesi için kaç beyaz kart eklenmelidir?",
    options: ["3", "7", "14", "21", "42"],
    answer: 1,
    hint: "Kırmızı kart adedi sabit. 14, yeni bütünün üçte biri olmalı.",
    guidance: {
      knowledge: [
        "Payın değişmemesi oranın değişmemesi anlamına gelmez. Yeni payda toplam güncel kart sayısıdır.",
      ],
      strategy: "Eklenen beyaz sayısına m de ve 14/(35+m)=1/3 eşitliğini çöz.",
      steps: [
        "Başlangıç toplamı 14+21=35. Yeni toplam 35+m.",
        "14/(35+m)=1/3 ise 35+m=42.",
        "Beyaz kart eklemesi m=42−35=7.",
      ],
      optionReasons: [
        "3 yalnız hedef kesrin paydasıdır. 14/38, 1/3 değildir.",
        "14 kırmızı kart 42 kartın 1/3’üdür. Toplamın artışı 7’dir.",
        "14, kutudaki kırmızı adedidir. 14/49=2/7 olur.",
        "21, baştaki beyaz adedidir; 21 beyaz daha eklemek 14/56 verir.",
        "42 yeni toplamdır. Eklenen miktar, yeni toplam ile eski toplam arasındaki farktır.",
      ],
      commonError:
        "Yeni toplamı eklenen kart sayısı sanmak veya yalnız eski beyaz adedini payda yapmak.",
      check: "21+7=28 beyaz ve 14 kırmızı vardır. 14/(14+28)=1/3.",
    },
  }),
  practice({
    key: "kesirli-sonuc-birim",
    prompt:
      "İki kayıtta da başlangıç miktarının 1/4’ü kullanılmış. İlkinde 7 L su, ikincisinde 7 kapalı kutu kaldığı yazıyor. Kutular bütün olarak kullanılıyor. Hangi değerlendirme doğrudur?",
    options: [
      "İki kaydın da başlangıcı 28 birimdir.",
      "İki kayıt da 28/3 birimle uyumludur.",
      "Su için başlangıç 28/3 L olabilir. Kutu kaydı tam adet koşuluyla çelişir.",
      "Su için başlangıç 7 L’dir. Kutular için 9’a yuvarlanır.",
      "İki kayıt da geçersizdir, çünkü kesirli başlangıç hiçbir zaman kullanılamaz.",
    ],
    answer: 2,
    hint: "7 birim, kullanılan miktar mı yoksa kalan mı? Sonucun birimini iki durumda ayrı düşün.",
    guidance: {
      knowledge: [
        "Kalan pay 1−1/4=3/4’tür. Hacim kesirli ölçülebilir; kapalı kutu adedi tam sayı olmalıdır.",
      ],
      strategy:
        "Kalan miktardan önce cebirsel adayı çıkar, sonra bağlama göre kabul et veya ele.",
      steps: [
        "(3/4)N=7, dolayısıyla N=28/3.",
        "28/3 L geçerli bir hacimdir.",
        "28/3 tam sayı değildir; kapalı kutu adedi için çözüm yoktur.",
      ],
      optionReasons: [
        "28’in dörtte biri 7’dir. Soruda 7 kullanılan değil, kalan miktardır.",
        "Hacim uygundur fakat kutular kesirli adet olamaz.",
        "Aynı denklem, sonuçların farklı birim koşulları nedeniyle iki ayrı geçerlilik verir.",
        "7’den başlanırsa 7 kalmaz. 9 kutu da (3/4)·9=27/4 verdiği için 7 kalanı üretmez.",
        "Sürekli ölçümlerde kesirli litre mümkündür.",
      ],
      commonError:
        "Kesirli adet bulunca bağlamı denetlemeden sayıyı yuvarlamak.",
      check: "28/3−7=7/3, yani 28/3’ün dörtte biridir. Bu su için mümkündür.",
    },
  }),
];
