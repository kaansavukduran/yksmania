import { txt, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { GuideSection, WorkedExample } from "./guides/types";

export const interestProblemsSource022Summary =
  "Aurelia 022 Faiz Problemleri, içerik 1.2 (19 Kasım 2026), PDF s. 1–8. OGM Fen Lisesi Matematik 9, Denklemler ve Eşitsizlikler, basılı s. 198–199. Geçmiş sınavlardan öğren bölümünde 2013 ALES İlkbahar Sayısal-1, soru 20 bulunur.";

const titles = {
  units: "Gün ve dönem hesabında verilen birimi kullan",
  reverse: "Ters soruda çarpanın sıfır olup olmadığını kontrol et",
  compare: "Getirileri oranla veya farkla karşılaştır",
  split: "İki yatırımın döneme ait katsayılarını karşılaştır",
  firstMethods: "Zamanı, ters işlemi ve ortak çarpanı seç",
  lastMethods: "Para paylaşımı ile yeniden yatırmayı ayır",
};

const headers = [
  "Yöntem",
  "Geçerli örnek",
  "Yöntemin sınırı",
  "Başka bir kullanım",
];

export const interestProblemsSource022Sections: GuideSection[] = [
  {
    title: titles.units,
    paragraphs: [
      "Yıllık bir oran için 18 gün, yılın kabul edilen gün sayısına bölünür. Aynı 7.300 TL ve yıllık %20 basit faizle 360 günlük yılda F=7.300·0,20·18/360=73 TL, 365 günlük yılda F=72 TL olur. Farkı yaratan gün hesabı kuralıdır.",
      "Oran aylıksa 4 ay için zaman 4 aylık dönemdir. Örneğin 1.250 TL, aylık %2 basit faizle 4 ayda 1.250·0,02·4=100 TL getirir. Bu soruda 4/12 yazarsan yıllık bir oran varmış gibi dönüştürmüş olursun. Aylık oranla aylık bileşik faiz uygulanıyorsa her ay yeni bakiye geçerlidir.",
    ],
  },
  {
    title: titles.reverse,
    paragraphs: [
      "Aradığın nicelik x ise basit faiz eşitliğini ax=F biçimine getir. a sıfırdan farklıysa x=F/a. a=0 ve F=0 ise verilen faizle tek bir x bulunamaz. a=0 iken pozitif F verilmişse hiçbir x bu eşitliği sağlayamaz.",
      "Son tutar S verilirse F yerine S’yi yazma. Basit faizde S=P(1+rt); son tutardan başlangıç bulunurken S’yi 1+rt’ye böl. Faiz F ayrıca verilirse S−F de anaparayı verir. Böylece bir soruda iki farklı para tutarı için doğru çarpan seçilir.",
    ],
  },
  {
    title: titles.compare,
    paragraphs: [
      "Aynı anapara ve zaman için F₁/F₂=r₁/r₂ eşitliği, ortak P·t ve paydadaki F₂ sıfır değilse kullanılabilir. P veya t değişirse oranların yanında değişen çarpanları da tut. Aynı anapara için süreler farklıysa getirilerin oranı r₁t₁/(r₂t₂) olur.",
      "Aynı P ve t ile oran farkı biliniyorsa iki denklemi çıkarabilirsin. F₁−F₂=P·t·(r₁−r₂). İkinci getiri sıfır olsa bile bu eşitlik geçerlidir. Örneğin 18 ayda iki faiz 156 ve 0 TL, oran farkı 4 yüzde puansa P=156/(1,5·0,04)=2.600 TL.",
    ],
  },
  {
    title: titles.split,
    paragraphs: [
      "Toplam P TL’nin x TL’si ilk kola, P−x TL’si ikinci kola ayrılsın. Her kol için kendi oranını süresiyle çarp: α=r₁t₁, β=r₂t₂. Toplam faiz F=αx+β(P−x) olur. Büyük yıllık oran, daha kısa bekleme süresinde daha küçük faiz katsayısı verebilir.",
      "Örneğin ilk kolda yıllık %12 ile 3 ay, ikinci kolda yıllık %10 ile 6 ay olsun. Katsayılar 0,03 ve 0,05. Toplam 9.000 TL’nin tamamı ikinci kolda 450 TL faiz getirir. Gerçek faiz 390 TL ise ilk kola geçen her TL getiriyi 0,02 TL azaltmıştır. Bu kola ayrılan miktar (450−390)/0,02=3.000 TL.",
      "0≤x≤P olduğu için toplam getiri P·min(α,β) ile P·max(α,β) arasında olmalı. Katsayılar eşitse her paylaşım aynı Pα getirisini verir. Bildirilen faiz bu değere eşitse paylaşım belirlenemez; farklıysa uygun paylaşım yoktur.",
    ],
  },
  {
    title: titles.firstMethods,
    paragraphs: [
      "Faiz formülünü seçmeden önce para tutarının türünü, dönem birimini ve sadeleştirilecek çarpanı belirt.",
    ],
    table: {
      headers,
      rows: [
        [
          "Sabit anaparada zamanı eşitle",
          "4.200 TL, yıllık %10 ve 6 ay: 4.200·0,10·6/12=210 TL.",
          "Oran aylık %10 ise 6 ayda basit faiz 4.200·0,10·6=2.520 TL olur.",
          "Bir borcun 1.800 TL’si yıllık %12 ile 5 ay tutulursa faiz maliyeti 90 TL.",
        ],
        [
          "Bilinmeyeni yalnız bırak",
          "6.000 TL, 4 ay, 240 TL faiz: r=240/(6.000·4/12)=0,12.",
          "Süre sıfırsa ve faiz de sıfırsa oran bu eşitlikten belirlenmez.",
          "12 ayda 420 TL faiz ve 4.620 TL son borç verilirse başlangıç borcu 4.200 TL.",
        ],
        [
          "Ortak anapara ve süreyi kontrol et",
          "Aynı P ile %12 ve %8 oranları birer yıl için 3:2 faiz oranı verir.",
          "İlk süre yarım, ikinci süre bir yılsa katsayılar 0,06 ve 0,08. Faiz oranı 3:4 olur.",
          "Aynı borcun iki maliyetini karşılaştırırken de aynı P ve t ortak çarpandır.",
        ],
      ],
    },
  },
  {
    title: titles.lastMethods,
    paragraphs: [
      "Bir para iki kola ayrıldığında getirileri topla. Aynı para ardışık dönemlere giriyorsa her dönemin tabanını izle.",
    ],
    table: {
      headers,
      rows: [
        [
          "Payları aynı toplamda tut",
          "2.000 TL’nin yarısı 0,04, yarısı 0,06 katsayıyla 40+60=100 TL getirir.",
          "İki katsayı da 0,05 olsaydı 100 TL getiriyi sağlayan tek bir dağılım bulunmazdı.",
          "Bir borcun iki ayrı parçasının faiz maliyetleri hesaplandığında iki tutar toplanır.",
        ],
        [
          "Faiz bakiyeye katılırsa yeni tabanı yaz",
          "4.000 TL önce %10, faizli bakiye sonra %15 kazanırsa son tutar 4.000·1,10·1,15=5.060 TL.",
          "İki yıl da ilk anapara üzerinden hesaplanırsa son tutar 4.000·(1+0,10+0,15)=5.000 TL olur.",
          "1.200 TL etiketin %15 artması 1.380 TL fiyat verir. Faiz modeli için para ve dönem koşulu ayrıca belirtilir.",
        ],
      ],
    },
  },
];

export const interestProblemsSource022SheetText = new Map<string, string[]>([
  [
    titles.units,
    [
      "Oran yıllıksa ay/12 veya sorudaki gün/yıl kullan. Oran aylıksa süreyi ay cinsinden tut.",
      "360 ve 365 farklı gün hesabı koşullarıdır. Sorudaki kuralı kullan.",
    ],
  ],
  [
    titles.reverse,
    [
      "Bilinen F için ax=F. a≠0 ise x=F/a. a=0 iken F=0 tek x vermez, pozitif F koşulu sağlanamaz.",
      "Son tutar S için P=S/(1+rt), bilinen faizden P=S−F.",
    ],
  ],
  [
    titles.compare,
    [
      "Yalnız ortak çarpanı sadeleştir. Aynı P,t ve F₂≠0 iken F₁/F₂=r₁/r₂.",
      "Aynı P,t ile F₁−F₂=Pt(r₁−r₂). Sıfır gelire bölmek gerekmez.",
    ],
  ],
  [
    titles.split,
    [
      "F=αx+β(P−x), α=r₁t₁, β=r₂t₂, 0≤x≤P. Sınırlar P·min(α,β) ve P·max(α,β).",
      "Katsayılar eşitse F=Pα gerekli. Eşitse her x, uyuşmazsa hiçbir x.",
    ],
  ],
  [
    titles.firstMethods,
    [
      "Zaman birimini eşitle, F ile S’yi ayır, böleceğin çarpanın ortak ve sıfır dışı olduğunu kontrol et.",
    ],
  ],
  [
    titles.lastMethods,
    [
      "Ayrı kolların getirilerini topla. Faiz yeniden işletiliyorsa dönem çarpanlarını sırayla uygula.",
    ],
  ],
]);

export const interestProblemsSource022Examples: WorkedExample[] = [
  {
    title: "Son borçtan anaparaya giden adımı tamamla",
    prompt:
      "9 aylık, yıllık %16 basit faizli bir borcun vade sonu tutarı 8.960 TL’dir. F=P·0,16·9/12 ve S=P+F veriliyor. 8.960=P(1+…) eşitliğini tamamlayıp ilk borcu bul.",
    strategy:
      "Çözümü açmadan önce dokuz aylık katsayıyı çıkar. Son tutar denkleminde başlangıç parasının da bulunduğunu kontrol et.",
    steps: [
      {
        label: "Süre katsayısı",
        explanation:
          "Yıllık faiz 9/12 yıl için 0,16·9/12=0,12 katsayısına dönüşür.",
      },
      {
        label: "Son tutar",
        explanation: "Başlangıç tutarı ile faizi aynı denklemde topla.",
        expression: "8.960=P+0,12P=1,12P",
      },
      {
        label: "İlk borç",
        explanation: "8.960’ı 1,12’ye böl.",
        expression: "P=8.000 TL",
      },
    ],
    answer: "İlk borç 8.000 TL.",
    check: "Faiz 8.000·0,12=960 TL, son tutar 8.000+960=8.960 TL.",
    pitfall: "8.960 TL’yi yalnız faiz gibi 0,12’ye bölmek.",
  },
  {
    title: "OGM ile çalışma · Aylık oranı kendi süresiyle kullan",
    prompt:
      "12.000 TL’nin dörtte biri yıllık %8 basit faizle 6 ay, bir başka dörtte biri yıllık %12 ile 4 ay tutuluyor. Kalan para aylık %2 basit faizle yatırılacak. Toplam faizin 720 TL olması için son parça kaç ay kalmalı?",
    strategy:
      "Her kola kendi zaman birimini uygula. İlk iki getiriyi toplam hedeften çıkar.",
    steps: [
      {
        label: "Parayı ayır",
        explanation: "İlk iki kol 3.000’er TL, son kol 6.000 TL.",
      },
      {
        label: "İlk iki faiz",
        explanation: "Yıllık oranlara ay/12 uygula.",
        expression: "3.000·0,08·6/12+3.000·0,12·4/12=120+120=240 TL",
      },
      {
        label: "Son kolun süresi",
        explanation:
          "Son koldan 720−240=480 TL gerekiyor. Aylık faiz 6.000·0,02=120 TL.",
        expression: "120·ay=480 ⇒ ay=4",
      },
    ],
    answer: "Son parça 4 ay kalmalı.",
    check: "120+120+6.000·0,02·4=720 TL. Bütün anaparalar 12.000 TL.",
    pitfall:
      "Aylık %2’nin zamanını yıl cinsinden yazarak son kolun getirisini küçültmek.",
  },
];

export const interestProblemsSource022Recall = [
  {
    prompt: "Faiz için ax=0 ve a=0 ise x hakkında ne bilirsin?",
    answer: "Verilen faiz eşitliği x’i tek değer olarak belirlemez.",
  },
  {
    prompt:
      "Aynı süre ve anaparada ikinci faiz sıfırsa iki faizle nasıl ilişki kurarsın?",
    answer: "Sıfıra bölmek yerine F₁−F₂=P·t·(r₁−r₂) farkını kullanabilirsin.",
  },
  {
    prompt:
      "İki yatırımın eşit getiri katsayısı için toplam faiz paylaşımı belirler mi?",
    answer:
      "Toplam, anapara çarpı ortak katsayıysa bütün paylaşımlar uygundur. Farklı bir faiz verilmişse hiçbir paylaşım uygun değildir.",
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
    id: `faiz-problemleri-022-${key}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(`${guidance.steps.join(" ")} ${guidance.check}`),
    skill: "Faiz Problemleri",
    guidance,
  };
}

export const interestProblemsSource022Practice: Question[] = [
  practice({
    key: "iki-gun-kurali",
    prompt:
      "3.650 TL yıllık %12 basit faizle 30 gün tutuluyor. Yılın 360 gün ve 365 gün kabul edildiği iki ayrı modelde faizler sırasıyla kaç TL’dir?",
    options: [
      "36 TL ve 36,50 TL",
      "36,50 TL ve 36 TL",
      "36,50 TL ve 36,50 TL",
      "36 TL ve 36 TL",
      "438 TL ve 438 TL",
    ],
    answer: 1,
    hint: "İki hesapta yalnız 30 günün yıla çevrilmesindeki payda değişir.",
    guidance: {
      knowledge: [
        "Yıllık oranla gün hesabında t=geçen gün/yılın verilen gün sayısı.",
      ],
      strategy:
        "Yıllık faizi bir kez hesapla. Sonra 30/360 ve 30/365 ile ayrı çarp.",
      steps: [
        "Bir yıllık faiz 3.650·0,12=438 TL.",
        "360 günlük yılda 438·30/360=36,50 TL.",
        "365 günlük yılda 438·30/365=36 TL.",
      ],
      optionReasons: [
        "İki sonuç ters sırada verilmiş. 360’a bölünen faiz daha büyüktür.",
        "Aynı yıllık kazancın 30/360’ı 36,50 TL, 30/365’i 36 TL’dir.",
        "İkinci hesapta da 360 günlük yıl kullanılmış.",
        "İlk hesapta da 365 günlük yıl kullanılmış.",
        "438 TL bir yıllık faizdir. 30 gün için zaman katsayısı gerekir.",
      ],
      commonError:
        "Yıllık faiz oranı aynı olduğu için iki gün kuralının faizini eşit almak.",
      check: "36,50·360=36·365=13.140. Her iki çarpım da 438·30 değeridir.",
    },
  }),
  practice({
    key: "farkli-sure-iki-kol",
    prompt:
      "18.000 TL’nin bir kısmı yıllık %18 basit faizle 3 ay, kalanı yıllık %8 basit faizle 9 ay tutuluyor. Toplam faiz 990 TL ise yıllık %18’lik kola başlangıçta kaç TL ayrılmıştır?",
    options: ["3.000 TL", "4.500 TL", "9.000 TL", "6.000 TL", "12.000 TL"],
    answer: 3,
    hint: "Her kol için yıllık oranı kendi süresiyle çarp. Sonra x ve 18.000−x ile iki faizi topla.",
    guidance: {
      knowledge: [
        "Karşılaştırılan katsayı, sürenin yıllık oranla birlikte oluşturduğu r·t değeridir.",
      ],
      strategy:
        "Kısa süreli kol x ise toplam faizi 0,045x+0,06(18.000−x) olarak kur.",
      steps: [
        "İlk kol 0,18·3/12=0,045, ikinci kol 0,08·9/12=0,06 faiz katsayısına sahip.",
        "990=0,045x+0,06(18.000−x)=1.080−0,015x.",
        "0,015x=90 ve x=6.000 TL.",
      ],
      optionReasons: [
        "3.000 TL ayrılırsa toplam 1.080−45=1.035 TL olur.",
        "4.500 TL ayrılırsa toplam 1.080−67,50=1.012,50 TL olur.",
        "İki kola 9.000’er TL ayrılırsa toplam 945 TL olur.",
        "İlk kol 270 TL, ikinci kol 720 TL getirir. Toplam 990 TL.",
        "12.000 TL ikinci kola ayrılan tutardır.",
      ],
      commonError:
        "İki sürenin farklı etkisini göz ardı edip yıllık oranları doğrudan karşılaştırmak.",
      check: "6.000·0,045+12.000·0,06=270+720=990 TL. Anaparalar 18.000 TL.",
    },
  }),
  practice({
    key: "esit-katsayi-iki-rapor",
    prompt:
      "8.000 TL, yıllık %12 ile 6 ay ve yıllık %8 ile 9 ay süren iki basit faiz koluna paylaştırılıyor. İlk raporda toplam faiz 480 TL, ikinci bir raporda 500 TL yazıyor. Bu iki tutarı sağlayan paylaştırma sayıları sırasıyla nasıldır?",
    options: [
      "İkisi için de tek paylaşım.",
      "İkisi için de her paylaşım.",
      "İlki için tek paylaşım, ikincisi için hiç yok.",
      "İlki için hiç yok, ikincisi için her paylaşım.",
      "İlki için her paylaşım, ikincisi için hiç yok.",
    ],
    answer: 4,
    hint: "İki r·t katsayısını bulup x ve 8.000−x içeren toplam faiz eşitliğinde karşılaştır.",
    guidance: {
      knowledge: [
        "Etkin faiz katsayıları eşitse iki kolun birim anaparaya getirisi eşittir.",
      ],
      strategy:
        "Toplam denklemde x’li terimlerin birbirini götürüp götürmediğine bak.",
      steps: [
        "İlk katsayı 0,12·6/12=0,06. İkinci katsayı 0,08·9/12=0,06.",
        "Toplam faiz 0,06x+0,06(8.000−x)=480 TL. Pay değişse de 480 TL elde edilir.",
        "500 TL hiçbir paylaşımda oluşmaz.",
      ],
      optionReasons: [
        "Her iki denklemde x’in katsayısı 0’dır. Tek bir paylaşım seçilemez.",
        "Her paylaşım yalnız 480 TL verir. 500 TL’yi vermez.",
        "480 TL için örneğin 2.000/6.000 ve 3.000/5.000 payları ikisi de çalışır.",
        "Her paylaşım 480 TL’ye uyar. 500 TL’ye uyan paylaşım yoktur.",
        "480 TL her paya uyar, 500 TL ortak katsayının izin verdiği tek toplamdan farklıdır.",
      ],
      commonError:
        "Oranlar farklı yazıldığı için süreyi kontrol etmeden payın tek olduğunu düşünmek.",
      check: "2.000·0,06+6.000·0,06=480. 3.000·0,06+5.000·0,06 da 480.",
    },
  }),
  practice({
    key: "sifir-getiriyi-bolme",
    prompt:
      "Aynı pozitif anapara, 18 ay için iki ayrı basit faiz seçeneğiyle karşılaştırılıyor. İlk seçenekte 225 TL faiz, ikinci seçenekte 0 TL faiz var. İlk yıllık oran ikinci orandan 5 yüzde puan yüksek. Anapara kaç TL’dir?",
    options: ["1.500 TL", "2.250 TL", "3.000 TL", "4.500 TL", "6.000 TL"],
    answer: 2,
    hint: "İkinci getiri sıfır olduğundan faizlerin oranını kurma. İki faiz eşitliğinin farkını kullan.",
    guidance: {
      knowledge: [
        "Aynı P ve t için faiz farkı, P·t ile ondalık oran farkının çarpımıdır.",
      ],
      strategy:
        "5 yüzde puanı 0,05 oran farkı olarak yaz ve zamanı yıla çevir.",
      steps: [
        "Oran farkı 5/100=0,05 ve süre 18/12=1,5 yıl.",
        "225−0=P·0,05·1,5=0,075P.",
        "P=225/0,075=3.000 TL.",
      ],
      optionReasons: [
        "Bu anapara 18 ayda 112,50 TL faiz farkı verir.",
        "Bu değer 18 ay yerine 2 yıl kullanmaktan çıkar.",
        "3.000·0,05·1,5=225 TL faiz farkı elde edilir.",
        "4.500 TL, 18 ayı 1 yıl alırsan çıkar.",
        "6.000 TL, 18 ayı 9 ay gibi ele alırsan çıkar.",
      ],
      commonError: "225/0 oranını kurmaya çalışmak veya 18 ayı bir yıl saymak.",
      check:
        "İkinci faiz sıfır ve P,t pozitif olduğu için ikinci oran %0. İlk %5 ile 225 TL verir.",
    },
  }),
  practice({
    key: "degisen-sure-karsilastirma",
    prompt:
      "Aynı anapara için A seçeneği yıllık %9 ile 8 ay, B seçeneği yıllık %18 ile 4 ay basit faiz veriyor. B’nin süresi 6 aya çıkarılırsa B’nin yeni faizi A’nın faizinin kaç katı olur?",
    options: ["3/2", "1", "4/3", "2", "3"],
    answer: 0,
    hint: "Yalnız B’nin süre katsayısı değişiyor. Son durumda iki faiz katsayısını hesapla.",
    guidance: {
      knowledge: [
        "Sabit anapara ve oranda basit faiz süreyle doğru orantılıdır.",
      ],
      strategy:
        "İlk durumda oran ile süre çarpımlarını kıyasla. B uzayınca yalnız B’nin katsayısını güncelle.",
      steps: [
        "A’da 0,09·8/12=0,06 katsayısı var.",
        "B’nin katsayısı 4 ayda 0,06, 6 ayda 0,18·6/12=0,09 olur.",
        "Yeni B/A=0,09/0,06=3/2.",
      ],
      optionReasons: [
        "B’nin yeni faizi, A’nın faizinin bir buçuk katı.",
        "Getiriler B’nin ilk süresi 4 ayken eşittir.",
        "B’nin süresi 4’ten 6’ya çıkınca süre çarpanı 6/4’tür.",
        "18/9 yalnız yıllık oranları karşılaştırır; bekleme süreleri farklıdır.",
        "Süre artışı getiriyi 6/4 katına çıkarır. 3 katına çıkarmaz.",
      ],
      commonError:
        "Süre değiştiği halde önceki eşitliği korumak veya sadece yıllık oranları kıyaslamak.",
      check:
        "6.000 TL seçilirse A 360 TL, yeni B 540 TL faiz verir. 540/360=3/2.",
    },
  }),
  practice({
    key: "donem-degisen-yeniden-yatirma",
    prompt:
      "6.000 TL için ilk yıl %12, ikinci yıl %25 faiz var. Bir modelde iki yılın faizi ilk anapara üzerinden hesaplanıyor. Diğer modelde ilk yılın faizi bakiyeye eklenerek ikinci yıl yeniden işletiliyor. İki modelin toplam faizleri arasındaki fark kaç TL’dir?",
    options: ["0 TL", "72 TL", "180 TL", "2.220 TL", "2.400 TL"],
    answer: 2,
    hint: "İlk yılın faizi iki modelde aynı. İkinci yılda yüzde uygulanan tutar ne kadar değişiyor?",
    guidance: {
      knowledge: [
        "Faiz yeniden yatırıldığında yeni dönemde ilk faizin kendisi de faiz getirir.",
      ],
      strategy:
        "İlk yıldaki ortak faizi bul. İkinci yılda ona uygulanan ek getiriyi hesapla.",
      steps: [
        "İlk yıl iki modelde 6.000·0,12=720 TL faiz var.",
        "İkinci modelde bu 720 TL de %25 kazanır: 720·0,25=180 TL.",
        "İki yıllık toplam faiz farkı 180 TL.",
      ],
      optionReasons: [
        "Faiz tabanları ilk yılda aynıdır. Yeniden yatırma yüzünden ikinci yılda değişir.",
        "İlk yılın 720 TL faizi, ikinci yılda %25 ile değerlendirilir.",
        "Ortak anapara ile ortak ilk yıl faizi dışında 720 TL’nin ikinci yıl getirisi farkı oluşturur.",
        "2.220 TL ilk anaparayı sabit tutan modelin toplam faizidir.",
        "2.400 TL yeniden yatırılan modelin toplam faizidir.",
      ],
      commonError:
        "Bileşik modelde ikinci yılın faizini de ilk anapara üzerinden hesaplamak.",
      check:
        "6.000(1+0,12+0,25)=8.220 TL, 6.000·1,12·1,25=8.400 TL, fark 180 TL.",
    },
  }),
];
