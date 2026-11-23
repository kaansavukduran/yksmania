import { txt, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { GuideSection, WorkedExample } from "./guides/types";

const titles = {
  triple: "Üç grupta önce ortak üçlüyü yerleştir",
  complement: "Bir koşulun sağlanmadığı durumları seç",
  subsets: "Zorunlu ve yasak elemanları önce ayır",
  wording: "Soru kişi mi, kayıt mı sayıyor?",
};

export const setsSource029Sections: GuideSection[] = [
  {
    title: titles.triple,
    paragraphs: [
      "Üç kümeli Venn şeması sekiz ayrık bölge içerir. Bir kişi A, B ve C’nin üçünde de olabilir, ikisinde, birinde veya hiçbirinde olabilir. Önce A∩B∩C sayısını ortaya yaz. A∩B sayısı verilmişse üçünde birden olanlar da A ve B’dedir. Buna karşı yalnız A ve B sözü C’yi dışarıda bırakır.",
      "Örneğin s(A∩B)=9 ve s(A∩B∩C)=2 ise yalnız A ve B’de 7 kişi vardır. Öteki iki çift için aynı çıkarma yapılır. A’nın toplamından yalnız A–B, yalnız A–C ve üçlü bölgeleri birer kez çıkarınca yalnız A kalır.",
      "Birleşimde üç kümenin toplamından üç ikili kesişimi çıkar, üçlü kesişimi bir kez geri ekle. Üçünde birden olan bir kişi ilk toplamda üç kez sayılmış ve ikili kesişimlerle üç kez çıkarılmıştır. Geri ekleme onu birleşimde bir kez tutar.",
      "Soruda yalnız ikili bölgeler verilmişse üçlüyü bu sayılardan tekrar çıkarma. Bölgenin sayısı negatif çıkarsa sayılar o okuma biçiminde mümkün değildir. Sekiz bölgenin toplamı evreni vermelidir. Evrenin sayısı bilinmiyorsa dışarıda kaç kişinin kaldığı belirlenemez.",
    ],
  },
  {
    title: titles.complement,
    paragraphs: [
      "A veya B koşulunun sağlanmaması, iki koşulun da sağlanmamasıdır. Bu yüzden (A∪B)′=A′∩B′. A ve B koşulunun birlikte sağlanmaması için koşullardan en az birinin eksik olması yeterlidir. Bu da (A∩B)′=A′∪B′ verir.",
      "E={1,2,3,4,5,6}, A={1,3}, B={3,4,5} olsun. Birleşimde 1, 3, 4, 5 var. Birleşimin dışında 2 ve 6 kalır. Ayrı ayrı tümleyenler A′={2,4,5,6} ve B′={1,2,6} olduğundan A′∩B′ de {2,6} çıkar. İki yöntem aynı elemanları seçer.",
      "Yalnız bir koşulu sağlayanları bulurken ortak bölgeyi ayır. Bu bölge (A∖B)∪(B∖A) ile yazılır. Ayrı bir üçüncü ölçüt gerektiğinde önce iki tekil bölgeyi birleştir, sonra sonucu o ölçütün kümesiyle kesiştir.",
    ],
  },
  {
    title: titles.subsets,
    paragraphs: [
      "Her serbest eleman iki seçenek verir. Zorunlu eleman baştan alınır, yasak eleman baştan dışarıda kalır. Beş farklı karttan a zorunluysa dört karar serbesttir ve 16 alt küme oluşur. b de yasaksa üç karar serbesttir ve 8 olur.",
      "Öz alt küme sayarken tam kümeyi yalnız geçerli seçenekler arasında gerçekten varsa çıkar. Bir eleman yasak olduğunda tam küme o elemanı içerdiği için zaten elenmiştir. Bir kart hem zorunlu hem yasaksa hiçbir seçim koşulları birlikte sağlayamaz.",
    ],
  },
  {
    title: titles.wording,
    paragraphs: [
      "En az bir gruba katılan herkes birleşimdedir. İki grupta yalnız birine katılanlar iki tekil bölgede yer alır. Üç grup varsa üç tekil ve üç ikili bölge vardır. Bir kişiyi kaç kez kaydettiğini anlamak için birim yaz. İki etkinlikte 18 ayrı kişi var ve 4’ü her ikisine katılmışsa toplam katılım kaydı 18+4=22’dir.",
      "Benzer biçimde yalnız bir kulüpte 13, iki kulüpte 5 ve hiçbirinde 2 kişi varsa evren 20 kişidir. En az bir kulübe üye 18 kişi olduğu hâlde 13+2·5=23 üyelik kaydı vardır.",
    ],
    table: {
      headers: ["Sorulan", "İlk işlem", "Kontrol"],
      rows: [
        [
          "Tam iki grup",
          "Yalnız ikilileri topla",
          "Üçlü gruptakiler dışarıda mı?",
        ],
        [
          "En az bir grup",
          "Dış bölgeyi ayır",
          "Her kişi bir kez sayılıyor mu?",
        ],
        [
          "Birleşimin tümleyeni",
          "Birleşime girmeyenleri seç",
          "İki koşul da sağlanmıyor mu?",
        ],
        [
          "Zorunlu ve yasaklı alt küme",
          "Serbest kararları say",
          "Tam küme zaten elendi mi?",
        ],
      ],
    },
  },
];

export const setsSource029Examples: WorkedExample[] = [
  {
    title: "Aynı kişiyi üç grubun toplamında izle",
    prompt:
      "45 kişiden A’da 24, B’de 20, C’de 17 kişi var. A∩B’de 9, A∩C’de 8, B∩C’de 6 ve üçünde 2 kişi var. Tam iki grupta ve hiçbirinde kaçar kişi bulunur?",
    strategy: "Üçlü bölgeyi ayır, ardından yalnız ikilileri bul.",
    steps: [
      {
        label: "Yalnız ikililer",
        expression: "9−2=7; 8−2=6; 6−2=4",
        explanation: "Her ikili kesişim üçlüdeki iki kişiyi içerir.",
      },
      {
        label: "Yalnız bir grup",
        expression: "24−7−6−2=9; 20−7−4−2=7; 17−6−4−2=5",
        explanation: "Her kümede bilinen ayrık iç bölgeleri çıkar.",
      },
      {
        label: "Birleşim ve dışarı",
        expression: "9+7+5+7+6+4+2=40; 45−40=5",
        explanation:
          "En az bir grupta olanları bir kez say. Evrenin kalanında hiçbir gruba girmeyenler var.",
      },
    ],
    answer: "Tam iki grupta 17, hiçbirinde 5 kişi.",
    check: "24+20+17−9−8−6+2=40, ayrık bölgelerin birleşimine eşit.",
    pitfall:
      "İkili kesişimleri doğrudan toplayıp üçlüdeki kişileri tam iki gruba katmak.",
  },
  {
    title: "Yasak kart varsa tam kümeyi tekrar çıkarma",
    prompt:
      "E={a,b,c,d,e,f,g,h} sekiz farklı kartı göstersin. a ve b seçilmek zorunda, c, d ve e seçilemez. Bu koşulları kaç öz alt küme sağlar?",
    strategy: "Sabit kararları işaretle, serbest elemanları say.",
    steps: [
      {
        label: "Sabitler",
        expression: "8−2−3=3",
        explanation:
          "Beş kartın alınması veya dışarıda kalması verilmiştir. Üç kart için karar serbesttir.",
      },
      {
        label: "Her kararı say",
        expression: "2³=8",
        explanation: "Her serbest kart alınabilir veya dışarıda bırakılabilir.",
      },
      {
        label: "Öz olma koşulu",
        expression: "8 geçerli öz alt küme",
        explanation:
          "Yasak üç kart her seçimde eksik kalır. Bu nedenle sekiz seçimin hiçbiri tam küme olamaz.",
      },
    ],
    answer: "8 öz alt küme.",
    check:
      "Serbest kartlardan sırasıyla 0, 1, 2 ve 3 kart alınırsa sayılar 1, 3, 3 ve 1 olur. Toplam 8.",
    pitfall:
      "Öz alt küme dendiği için her koşulda otomatik olarak bir çıkarmak.",
  },
];

export const setsSource029Recall = [
  {
    prompt: "Üç kişilik ortak üçlü, s(A∩B) hesabına girer mi?",
    answer:
      "Evet. A ve B’nin her ikisinde olduğu için üç kişi de s(A∩B)’ye dahildir. Yalnız A ve B denirse çıkarılırlar.",
  },
  {
    prompt: "Birleşimden üç ikili kesişimi çıkarınca üçlü neden geri eklenir?",
    answer:
      "Üç grupta olan kişi önce üç kez eklenir ve üç kez çıkarılır. Bir kez geri eklenerek birleşimde kalır.",
  },
  {
    prompt: "(A∩B)′ koşulunu cümleyle nasıl okursun?",
    answer:
      "A ve B’de aynı anda bulunmamak. A dışında veya B dışında olmak yeterlidir, dolayısıyla A′∪B′.",
  },
  {
    prompt:
      "Yasak bir eleman varsa öz alt küme sayarken tam kümeyi çıkarır mısın?",
    answer:
      "Tam küme zaten yasak elemanı içerdiği için geçerli seçimlere hiç girmez. Serbest kararların verdiği sayı korunur.",
  },
];

type PracticeInput = {
  id: string;
  prompt: string;
  options: [string, string, string, string, string];
  answer: number;
  hint: string;
  guidance: QuestionGuidance;
};

function practice({
  id,
  prompt,
  options,
  answer,
  hint,
  guidance,
}: PracticeInput): Question {
  return {
    id: `kumeler-029-${id}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(`${guidance.steps.join(" ")} ${guidance.check}`),
    skill: "kumeler",
    guidance,
  };
}

export const setsSource029Practice: Question[] = [
  practice({
    id: "uc-grupta-yalniz-ikili",
    prompt:
      "Bir okulda A∩B’de 11, A∩C’de 9, B∩C’de 8 öğrenci var. 4 öğrenci üçünde birden. Tam iki gruba katılan kaç öğrenci var?",
    options: ["28", "24", "12", "16", "20"],
    answer: 3,
    hint: "Her ikili kesişimden tam üç gruptakileri ayrı çıkar.",
    guidance: {
      knowledge: ["A∩B, C’de de bulunanları kapsar."],
      strategy: "Üç ikili kesişimi ayrık ikili bölgelere dönüştür.",
      steps: [
        "Yalnız A ve B 11−4=7, yalnız A ve C 9−4=5, yalnız B ve C 8−4=4.",
        "7+5+4=16 öğrenci tam iki grupta.",
      ],
      optionReasons: [
        "Kesişimler doğrudan toplanmış ve üçlü üç kez sayılmış.",
        "Üçlü toplamdan yalnız bir kez çıkarılmış.",
        "Üçlü kişileri üç ikiliden çıkardıktan sonra bir kez daha çıkarmak 12 verir.",
        "Yalnız ikili üç bölgenin toplamı 16’dır.",
        "Bu, 16 tam iki üye ile 4 tam üç üyenin, yani en az iki üyeliğin toplamıdır.",
      ],
      commonError:
        "Üçlü kesişimi yalnız bir kez çıkarıp diğer ikili sayıları olduğu gibi kullanmak.",
      check: "16+3·4=28, kapsayıcı üç ikili kesişimin toplamını verir.",
    },
  }),
  practice({
    id: "yalniz-ikililer-verildiginde",
    prompt:
      "Evrendeki 42 kişinin 18’i A’da, 15’i B’de, 14’ü C’dedir. Yalnız A ve B’de 4, yalnız A ve C’de 3, yalnız B ve C’de 2, üçünde birden 2 kişi vardır. Hiçbir gruba katılmayan kaç kişi var?",
    options: ["8", "4", "6", "10", "13"],
    answer: 0,
    hint: "Verilen ikililer zaten üçlüyü dışarıda bırakıyor. Tek bölgeleri bul.",
    guidance: {
      knowledge: [
        "A’nın toplamı yalnız A, iki ilgili ikili ve üçlü bölgeden oluşur.",
      ],
      strategy: "Ayrık yedi iç bölgeyi topla ve evrenden çıkar.",
      steps: [
        "Yalnız A 18−4−3−2=9, yalnız B 15−4−2−2=7, yalnız C 14−3−2−2=7.",
        "Birleşim 9+7+7+4+3+2+2=34. Dışarıda 42−34=8 kişi var.",
      ],
      optionReasons: [
        "Yedi iç bölgenin toplamı 34’tür ve 42−34=8.",
        "18+15+14−4−3−2=38 hesabı üçlüdeki kişileri hâlâ üç kez sayar. 42−38 yanlışlıkla 4 verir.",
        "Üçlüdeki iki kişiyi birleşime ikinci kez eklemek dışarıda 6 gösterir.",
        "Üçlüdeki iki kişiyi birleşim dışında bırakmak dışarıda 10 gösterir.",
        "Yalnız A–C ve yalnız B–C’deki 3+2 kişiyi birleşimden eksik saymak dışarıda 8+5=13 gösterir.",
      ],
      commonError: "Yalnız ikili sayıları kapsayıcı ikili sayılar sanmak.",
      check: "Kapsayıcı ikililer 6, 5, 4 olur. 18+15+14−6−5−4+2=34.",
    },
  }),
  practice({
    id: "yalniz-ve-hicbiri",
    prompt:
      "48 kişiden 27’si müzik, 22’si tiyatro etkinliğine katılıyor. 11 kişi iki etkinliğe de katılıyor. Yalnız bir etkinliğe katılan ve hiçbirine katılmayan kişi sayıları sırasıyla kaçtır?",
    options: ["38 ve 10", "27 ve 0", "16 ve 10", "27 ve 11", "27 ve 10"],
    answer: 4,
    hint: "Yalnız birinde = yalnız müzik + yalnız tiyatro. Birleşimde ortadaki 11 kişiyi bir kez say.",
    guidance: {
      knowledge: ["Birleşimde ortaklar sayılır, tam bir üyelikte sayılmaz."],
      strategy: "Dört Venn bölgesini ayrı oluştur.",
      steps: [
        "Yalnız müzik 27−11=16, yalnız tiyatro 22−11=11. Tam birinde 27 kişi.",
        "Birleşim 16+11+11=38. Dışarıda 48−38=10 kişi.",
      ],
      optionReasons: [
        "38, yalnız birinde olanlar değil, en az birinde olanların sayısıdır.",
        "Hiçbirinde olmayanların sayısı 48−38=10’dur.",
        "16 yalnız müziktekileri sayar, yalnız tiyatrodaki 11’i dışarıda bırakır.",
        "11 ortak bölgenin sayısıdır, dış bölgenin sayısı değildir.",
        "İki tek bölgenin toplamı 27, dış bölge 10’dur.",
      ],
      commonError: "En az birinde ile tam birinde ifadelerini aynı okumak.",
      check: "16+11 ortak+11 yalnız tiyatro+10 dışarı=48.",
    },
  }),
  practice({
    id: "uc-sabit-karar",
    prompt:
      "Yedi farklı elemanı olan E kümesinin alt kümelerinde a ve b bulunmalı, üçüncü bir eleman olan c bulunmamalıdır. Bu koşulları sağlayan kaç öz alt küme vardır?",
    options: ["15", "8", "16", "32", "64"],
    answer: 2,
    hint: "Yasak eleman olduğunda E bu koşullarla hiç oluşabilir mi?",
    guidance: {
      knowledge: ["Her serbest eleman seçime girer veya girmez."],
      strategy:
        "Sabit kararları çıkar, tam kümenin geçerli olup olmadığını denetle.",
      steps: [
        "Üç ayrı elemanın kararı sabit. 7−3=4 eleman serbest.",
        "2⁴=16 seçim var. c her seçimde eksik olduğundan hepsi öz alt küme.",
      ],
      optionReasons: [
        "16’dan 1 çıkarmak, listede zaten bulunmayan E’yi çıkarır.",
        "8, dört serbest eleman yerine üçünü sayar.",
        "Dört serbest karar 16 geçerli seçim üretir. Hepsinde c eksik.",
        "32 için beş elemanın serbest olması gerekir.",
        "64 için altı elemanın serbest olması gerekir.",
      ],
      commonError: "Öz alt küme için sayımdan her zaman bir çıkarmak.",
      check: "Serbestlerin tamamı seçilirse dahi oluşan küme E∖{c} olur.",
    },
  }),
  practice({
    id: "kesisimin-tumleyeni",
    prompt:
      "E={1,2,3,4,5,6,7}, A={1,2,5,7} ve B={2,4,5} olduğuna göre (A∩B)′ nedir?",
    options: ["{3,6}", "{1,3,4,6,7}", "{2,5}", "{1,4,7}", "{1,2,4,5,7}"],
    answer: 1,
    hint: "Önce iki kümede de olanları bul. Ardından E’de kalanları yaz.",
    guidance: {
      knowledge: [
        "A∩B ortak elemanlar, X′ ise belirlenen E’de X’in dışında kalanlardır.",
      ],
      strategy: "Kesişimi ve tümleyeni iki ayrı işlemde yap.",
      steps: ["A∩B={2,5}.", "E’den 2 ve 5’i çıkar. (A∩B)′={1,3,4,6,7}."],
      optionReasons: [
        "Bu, iki kümenin de dışında kalanları verir ve (A∪B)′ olur.",
        "Kesişimdeki 2 ve 5 dışındaki bütün E elemanları var.",
        "Bu yalnız kesişimin kendisidir.",
        "Bu tam bir kümede bulunanlardır. 3 ve 6 da ikisinde birlikte bulunmadığından kalmalı.",
        "Bu A∪B’nin elemanlarıdır.",
      ],
      commonError:
        "Kesişimin tümleyeni ile birleşimin tümleyenini aynı sanmak.",
      check: "A′={3,4,6}, B′={1,3,6,7}. Birleşimleri {1,3,4,6,7} olur.",
    },
  }),
  practice({
    id: "kisi-ve-kayit-sayisi",
    prompt:
      "Bir kulüpte her üye seramik, tiyatro veya her ikisini seçmiştir. Toplam 21 farklı üye var. 6 üye iki etkinliği de seçmiş. Kulüp her seçilen etkinlik için bir kayıt açıyor. Kaç kayıt açılır?",
    options: ["15", "21", "27", "33", "42"],
    answer: 2,
    hint: "21 kişinin her birinin ilk kaydı var. Kimlerin bir kaydı daha var?",
    guidance: {
      knowledge: [
        "Ayrı kişi sayısında ortak üyeler bir kez, etkinlik kayıtlarında iki kez sayılır.",
      ],
      strategy: "Tam bir etkinlik ile iki etkinlik seçenlerin kayıtlarını say.",
      steps: [
        "Tam birini 21−6=15 üye seçmiştir. Her biri bir kayıt açtırır.",
        "6 üyenin 12 kaydı vardır. Toplam 15+12=27.",
      ],
      optionReasons: [
        "15 tek etkinlik kayıtlarıdır ve iki etkinlik kayıtlarını dışarıda bırakır.",
        "21 kişi sayısıdır. Altı üyenin ikinci kaydı eksik.",
        "15 tek kayıt ve 12 çift etkinlik kaydı 27 yapar.",
        "21’in içinde ortak üyelerin ilk kaydı vardır. Bir daha 12 eklemek onları üç kez sayar.",
        "Bu sonuç bütün 21 üyenin iki etkinliğe de girdiğini varsayar.",
      ],
      commonError: "Birleşim büyüklüğünü etkinlik kayıtlarının toplamı sanmak.",
      check:
        "Her üyeye bir kayıt verince 21, iki etkinlik seçenlere ek altı kayıtla 27 elde edilir.",
    },
  }),
  practice({
    id: "iki-kosul-ve-ayri-filtre",
    prompt:
      "E={1,2,3,4,5,6,7,8}, A={2,4,6,8} ve B={3,6} olsun. Önce A ile B’nin yalnız birine ait elemanları seç, sonra yalnız 3’ten büyük olanları tut. Hangi küme kalır?",
    options: ["{4,8}", "{4,6,8}", "{3,4,8}", "{2,4,8}", "{6}"],
    answer: 0,
    hint: "Önce 6’nın iki kümede birden olduğunu işaretle. En son büyüklük koşulunu uygula.",
    guidance: {
      knowledge: [
        "Yalnız bir kümeye ait olmak, iki fark bölgesinden birinde olmaktır.",
      ],
      strategy: "Önce tek bölgeleri birleştir, sonra üçüncü koşulla kesiştir.",
      steps: [
        "A∖B={2,4,8}, B∖A={3}. Birleşince {2,3,4,8}.",
        "3’ten büyük olanlar 4 ve 8. Sonuç {4,8}.",
      ],
      optionReasons: [
        "İki koşul da 4 ve 8 için sağlanır.",
        "6 iki kümeye birden aittir, yalnız birinde yer almaz.",
        "3, 3’ten büyük değildir.",
        "2, 3’ten büyük değildir.",
        "6 her iki kümededir ve ilk adımda elenir.",
      ],
      commonError: "A∪B’yi kullanıp ortak öğeyi de almak.",
      check:
        "4 ve 8 A’da ve B dışında. 2 ve 3 büyüklük koşulunda, 6 tek üyelik koşulunda elenir.",
    },
  }),
];

export const setsSource029Summary =
  "Aurelia 029 Kümeler, biçim 5 ve içerik 5.1 (19 Kasım 2026), PDF s. 1–12. MEBİ TYT Matematik Konu Özetleri PDF s. 66–70. MEB/OGM Matematik 9, Kümelerde İşlemler, web s. 12. OGM Kümeler Video Ders Notu PDF s. 1–11. 2018 TYT Temel Matematik 13 kitapçığı ve anahtarı Geçmiş Sınavlar’da açılabilir.";

export const setsSource029SheetText = new Map<string, string[]>([
  [
    titles.triple,
    [
      "Orta bölgeye üçlüyü yaz. Kapsayıcı ikililerin her birinden üçlüyü çıkar. Yalnız iki kümeye ait üç bölgenin sayılarını bul.",
      "Kapsayıcı sayılarla s(A∪B∪C)=s(A)+s(B)+s(C)−s(A∩B)−s(A∩C)−s(B∩C)+s(A∩B∩C). Dışarı, evren eksi birleşimdir.",
    ],
  ],
  [
    titles.complement,
    [
      "(A∪B)′=A′∩B′ ve (A∩B)′=A′∪B′. Tümleyenleri aynı E içinde al.",
      "Yalnız birinde olanlar (A∖B)∪(B∖A). Ek koşulu bu sonuçla kesiştir.",
    ],
  ],
  [
    titles.subsets,
    [
      "Serbest n eleman 2ⁿ seçim verir. Zorunlu ve yasak elemanları önce ayır.",
      "Tam küme geçerliyse öz alt küme sayısında bir çıkar. Yasak eleman tam kümeyi zaten dışlar. Çelişen iki koşul varsa sıfır seçim var.",
    ],
  ],
  [
    titles.wording,
    [
      "Yalnız birinde, tam ikisinde, en az birinde ve hiçbirinde ifadeleri farklı bölgeleri seçer.",
      "İki etkinlik kayıtlarında ortak üye iki kez, farklı kişi sayımında bir kez görünür.",
    ],
  ],
]);
