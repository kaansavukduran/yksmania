import { txt, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { GuideSection, WorkedExample } from "./guides/types";

const titles = {
  implications: "Koşullu önermenin dört biçimini ayır",
  proof: "Tanımdan genel ispata ilerle",
  counterexample: "Genel iddiayı geçerli bir karşı örnekle çürüt",
  scope: "En dış bağlaç ve niceleyiciden başla",
};

export const logicSource031Sections: GuideSection[] = [
  {
    title: titles.implications,
    paragraphs: [
      "p→q ifadesinde p varsayılan koşuldur ve hipotez veya öncül adıyla anılır. q bu koşuldan çıkması beklenen yargıdır ve hüküm veya sonuç adıyla anılır. Önermenin yanlış olduğu tek durum p’nin doğru, q’nun yanlış olmasıdır.",
      "Karşıt q→p biçiminde yerleri değiştirir. Ters p′→q′ biçiminde aynı yerlerdeki iki önermenin değilini alır. Karşıt ters q′→p′ ikisini birlikte yapar. MEB Matematik 9 bu adları kullanır. Adı seçmeden önce hangi iki sembolün yer ve işaret değiştirdiğini yaz.",
      "p→q ile q′→p′ denktir. İkisi de aynı p=1, q=0 satırında yanlıştır. q→p ile p′→q′ da birbirine denktir ve p=0, q=1 satırında yanlıştır. İki eşdeğer çifti birbiriyle karıştırma.",
    ],
    table: {
      headers: ["Adı", "Biçimi", "Yanlış olduğu satır"],
      rows: [
        ["İlk koşul", "p→q", "p=1, q=0"],
        ["Karşıt", "q→p", "p=0, q=1"],
        ["Ters", "p′→q′", "p=0, q=1"],
        ["Karşıt ters", "q′→p′", "p=1, q=0"],
      ],
    },
  },
  {
    title: titles.proof,
    paragraphs: [
      "Tanım bir kavramın hangi koşulları taşıdığını açıklar. Çift tam sayı, k bir tam sayı olmak üzere 2k biçiminde yazılabilen sayıdır. Aksiyom seçilen matematik sisteminde ispatlanması gerekmeyen bir başlangıç kabulüdür. Teorem, kabul edilen sonuç ve tanımlardan gerekçeleriyle çıkarılan genel önermedir.",
      "İspat bir dizi değer denemekle tamamlanmaz. “n çift ise n² çifttir” cümlesinde öncül n’nin çift olması, hüküm n²’nin çift olması. Herhangi bir çift n al ve n=2k yaz. n²=4k²=2(2k²). k tam sayı olduğundan 2k² tam sayıdır ve tanım gereği n² çifttir.",
      "Başta n²=2m yazarak m’nin tam sayı olduğunu varsayarsan hükmü peşinen kabul etmiş olursun. İspatın başlangıcı hipotezdir. Hükme ulaşmayı sağlayan adım, parantez içindeki niceliğin tam sayı olduğunu göstermektir.",
    ],
  },
  {
    title: titles.counterexample,
    paragraphs: [
      "“Bütün A nesneleri B özelliğini taşır” iddiasını çürütmek için A’dan olup B özelliği taşımayan bir nesne bul. “Bütün tek pozitif tam sayılar asaldır” için 9 tek ve pozitiftir, fakat 9=3·3 olduğu için asal değildir. 2 asal olsa da tek olmadığı için bu önermeye karşı örnek olamaz.",
      "“2’den büyük bütün asal sayılar tektir” iddiasında başlangıç kümesi 2’den büyük asal sayılardır. n>2 çiftse 2’ye tam bölünür ve 2, n’nin 1 ile kendisi dışındaki bir bölenidir. Dolayısıyla n asal olamaz. Örnek seçmek, dönüşümün bozulduğu yeri gösterir. Tanımla yürüyen genel akıl yürütme, uygun bütün sayıları kapsar.",
    ],
  },
  {
    title: titles.scope,
    paragraphs: [
      "Dış koşullu önerme yanlışsa sol parça doğru, sağ parça yanlıştır. Sağ parça da bir koşulsa onun öncülünü 1, sonucunu 0 yap. Elde ettiğin değerleri sol parçaya yerleştir. Son adımda tüm ifadeyi başlangıçtaki parantezlerle geri hesapla.",
      "“Her x için bir y var” cümlesinde y, x’e göre değişebilir. Doğal sayılarda ∀x ∃y (x<y) doğrudur, çünkü y=x+1 seçilebilir. ∃y ∀x (x<y) aynı y’nin bütün doğal sayılardan büyük olmasını ister. Seçilen her y için x=y olduğunda y’den küçük olma şartı bozulur.",
      "“Her denek A veya B koşulunu sağlıyor” cümlesini değillerken önce “en az bir denek”, sonra “ne A ne B koşulunu sağlıyor” yaz. Parantez içinde (A∨B)′=A′∧B′ olduğundan örnek denek ne A koşulunu ne B koşulunu sağlar.",
    ],
  },
];

export const logicSource031Examples: WorkedExample[] = [
  {
    title: "İki çift sayının farkını tanımdan çıkar",
    prompt:
      "Herhangi iki çift tam sayı a ve b için a−b’nin çift olduğunu ispatla.",
    strategy: "İki sayı için ayrı tam sayı katsayıları kullan.",
    steps: [
      {
        label: "Hipotez",
        expression: "a=2k, b=2m",
        explanation:
          "k ve m birer tam sayıdır. a ile b’nin aynı sayı olması gerekmez.",
      },
      {
        label: "Çıkar",
        expression: "a−b=2k−2m=2(k−m)",
        explanation: "İki terimde de bulunan 2 ortak çarpanını ayır.",
      },
      {
        label: "Hüküm",
        expression: "k−m∈ℤ",
        explanation:
          "Tam sayılar çıkarma altında kapalıdır, bu nedenle a−b çift tanımına uyar.",
      },
    ],
    answer: "a−b çifttir.",
    check: "a=−4, b=6 için fark −10=2·(−5). Genel ispat negatifleri de kapsar.",
    pitfall:
      "Yalnız bir sayı çiftiyle kontrol edip tüm olasılıkları ispatlanmış saymak.",
  },
  {
    title: "Koşulu çevirince karşı örnek ortaya çıkar",
    prompt:
      "n tam sayı, p n’nin 8 ile, q n’nin 4 ile bölünmesi. p→q, q→p, p′→q′, q′→p′ biçimlerinden hangileri bütün n’ler için doğrudur?",
    strategy:
      "İlk biçimin ispatını yaz. Sonra 4’ün katı olup 8’in katı olmayan bir n dene.",
    steps: [
      {
        label: "İlk biçim",
        expression: "n=8k=4(2k)",
        explanation: "8’in katı her tam sayı 4’ün de katıdır. p→q geneldir.",
      },
      {
        label: "Karşıt ve ters",
        expression: "n=4 ⇒ p=0, q=1",
        explanation:
          "q→p biçimi 1→0. p′→q′ biçimi de 1→0. Aynı sayı ikisini çürütür.",
      },
      {
        label: "Karşıt ters",
        expression: "q′→p′",
        explanation:
          "İlk biçimle denktir. 4’ün katı olmayan bir sayı 8’in katı olamaz.",
      },
    ],
    answer: "p→q ve q′→p′.",
    check: "n=−4 de karşıt ve tersi çürütür. 0, iki sayının da katıdır.",
    pitfall:
      "Sembollerin yerini değiştirmek ile değilini almayı aynı dönüşüm sanmak.",
  },
];

export const logicSource031Recall = [
  {
    prompt: "p→q’nun karşıtı ve tersi nasıl ayrılır?",
    answer:
      "Karşıt q→p ile yeri değiştirir. Ters p′→q′ ile iki önermenin değilini aynı yerde alır.",
  },
  {
    prompt: "Bir sayının çift olması ispatta nasıl kullanılır?",
    answer:
      "Çift n, bir k tam sayısı için n=2k olarak yazılır. Sonucun da bir tam sayının iki katı olduğunu göster.",
  },
  {
    prompt: "Bir koşullu önermeyi çürüten karşı örnek hangi iki koşulu sağlamalı?",
    answer:
      "Öncülün koşulunu ve tanım evrenini sağlamalı, hükmü yanlış yapmalı.",
  },
  {
    prompt: "∀x ∃y ifadesinde y’ye x’ten bağımsız tek değer vermek gerekir mi?",
    answer:
      "Her x için ayrı bir y seçilebilir. Tek y’nin her x’te çalışması ∃y ∀x ifadesidir.",
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
    id: `mantik-onerme-031-${id}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(`${guidance.steps.join(" ")} ${guidance.check}`),
    skill: "mantik-onerme",
    guidance,
  };
}

export const logicSource031Practice: Question[] = [
  practice({
    id: "dis-kosuldan-iceri",
    prompt:
      "(p→q)→(q→r) bileşik önermesi yanlışsa (p,q,r) doğruluk değerleri sırasıyla nedir?",
    options: [
      "(1,0,1)",
      "(0,1,0) veya (1,1,0)",
      "(0,0,1) veya (1,0,1)",
      "(1,1,1)",
      "(0,0,0)",
    ],
    answer: 1,
    hint: "Dıştaki → yanlışsa soldaki p→q doğru, sağdaki q→r yanlış olmalı.",
    guidance: {
      knowledge: ["Bir koşul yalnız 1→0 olduğunda yanlıştır."],
      strategy: "Sağ koşulu önce çöz, q’yu sol koşula koy.",
      steps: [
        "q→r yanlış olduğundan q=1 ve r=0.",
        "p→1, p’nin iki değeri için de doğrudur. İki olası üçlü (0,1,0), (1,1,0).",
      ],
      optionReasons: [
        "q=0 olduğunda sağ koşul doğru olur.",
        "İki durumda sol doğru, sağ yanlış. Dış koşul 1→0.",
        "q=0 olan iki durumda da q→r doğru.",
        "r=1 olduğundan sağ koşul doğru.",
        "q=0 ile r=0 sağ koşulu 0→0 ve doğrudur.",
      ],
      commonError: "Sol önermenin doğru olmasından p’yi zorunlu 1 sanmak.",
      check: "q=1, r=0 ile dış ifade (p→1)→0, yani 1→0.",
    },
  }),
  practice({
    id: "karsit-ve-tersin-satiri",
    prompt:
      "p→q koşulunun karşıtı ve tersi, hangi (p,q) satırında birlikte yanlış olur?",
    options: [
      "(1,1)",
      "(1,0)",
      "(0,0)",
      "(0,1)",
      "İki biçim aynı satırda yanlış olamaz.",
    ],
    answer: 3,
    hint: "Karşıtı q→p, tersi p′→q′ yaz. İki ifadede de öncül 1 ve sonuç 0 arıyorsun.",
    guidance: {
      knowledge: ["Karşıt ve ters birbirinin karşıt tersidir."],
      strategy: "Önce q→p’nin yanlışlık koşulunu çöz, diğerine yerleştir.",
      steps: ["q→p yanlışsa q=1 ve p=0.", "p′=1 ve q′=0 olur. Ters de 1→0."],
      optionReasons: [
        "q→p ifadesi 1→1, tersi 0→0. İkisi de doğru.",
        "İlk koşul bu satırda yanlıştır. Karşıt 0→1 ve ters 0→1 doğrudur.",
        "Karşıt 0→0, ters 1→1. İkisi de doğru.",
        "q→p ve p′→q′ birlikte 1→0 olur.",
        "Her iki biçim için p=0, q=1 ortak yanlış satırdır.",
      ],
      commonError:
        "İlk önermenin yanlış olduğu satırı karşıt ve ters için de kullanmak.",
      check: "İki biçim (p,q)=(0,1) için 0, diğer üç satırda 1 verir.",
    },
  }),
  practice({
    id: "tek-sayilarin-toplami",
    prompt:
      "a ve b tek tam sayılar. a+b’nin çift olduğunu bütün olası a ve b için gösteren adım hangisidir?",
    options: [
      "a=2k+1, b=2m+1 ⇒ a+b=2(k+m+1); k,m∈ℤ.",
      "a=1, b=3 ⇒ a+b=4.",
      "a=2k, b=2m ⇒ a+b=2(k+m).",
      "a+b çift dendiği için a+b=2k yazılır.",
      "a ve b aynı tek sayı alınır, sonuç 2a olur.",
    ],
    answer: 0,
    hint: "Her tek tam sayı, k tam sayı iken 2k+1 biçiminde yazılır.",
    guidance: {
      knowledge: ["Çift sayı ikiyle çarpılan bir tam sayıdır."],
      strategy:
        "a ve b’yi tek tanımıyla ayrı yaz, toplamda 2 ortak çarpanını çıkar.",
      steps: [
        "a=2k+1 ve b=2m+1, k ve m tam sayı.",
        "a+b=2(k+m+1). Parantez içi tam sayı olduğundan sonuç çifttir.",
      ],
      optionReasons: [
        "Değişkenler ayrı ve serbest, sonuç çift tanımını sağlıyor.",
        "Bu tek deneme doğrudur fakat diğer tam sayıları kapsamaz.",
        "Bu adım hipotezi çift sayılarla değiştirir.",
        "İspatlanacak çiftliği başlangıçta varsayar.",
        "a=b özel durumu kapsanır. a≠b olanları ele almaz.",
      ],
      commonError:
        "Bir örneği veya özel durumu bütün sayılar için yeterli görmek.",
      check:
        "a=−3 ve b=7 de a+b=4 verir. Genel formül örneklerle sınırlı değildir.",
    },
  }),
  practice({
    id: "evren-icinde-karsi-ornek",
    prompt:
      "“Her tek pozitif tam sayı asaldır.” önermesini hangi sayı tek başına çürütür?",
    options: ["2", "−9", "3", "4", "15"],
    answer: 4,
    hint: "Seçilen sayı öncülü sağlamalı ama asal olmamalı.",
    guidance: {
      knowledge: [
        "Asal sayı 1’den büyük ve yalnız 1 ile kendisine bölünebilen pozitif tam sayıdır.",
      ],
      strategy: "Tek ve pozitif adaylar arasında asal olmayanı bul.",
      steps: [
        "2, −9 ve 4 öncülü sağlamaz. 3 ise tek, pozitif ve asal.",
        "15 tek, pozitif ve 15=3·5. Dolayısıyla genel önerme için karşı örnektir.",
      ],
      optionReasons: [
        "2 çift, bu yüzden öncülü sağlamaz.",
        "−9 pozitif değildir.",
        "3 öncülü ve hükmü birlikte sağlar.",
        "4 çift olduğu için öncülü sağlamaz.",
        "15 tek ve pozitif, 3 ve 5’e bölündüğünden asal değildir.",
      ],
      commonError:
        "Yalnız hükmü bozan, ancak öncülün alanı dışında kalan bir sayı seçmek.",
      check: "n=15 için ‘tek ve pozitif’ doğru, ‘asal’ yanlış.",
    },
  }),
  practice({
    id: "degillemede-iki-kosul",
    prompt:
      "“Her öğrenci resim veya müzik kursundan en az birine katılır.” önermesinin değili hangisidir?",
    options: [
      "Hiçbir öğrenci iki kursa birlikte katılmaz.",
      "En az bir öğrenci iki kurstan hiçbirine katılmaz.",
      "İki kursun da dışında kalan öğrenci yoktur.",
      "En az bir öğrenci yalnız bir kursa katılır.",
      "Her öğrenci kurslardan en az birinin dışında kalır.",
    ],
    answer: 1,
    hint: "Önce ‘her öğrenci’nin değilini, sonra ‘resim veya müzik’in değilini yaz.",
    guidance: {
      knowledge: ["∀ ifadesinin değili ∃ ile yazılır. (R∨M)′=R′∧M′."],
      strategy:
        "Bir öğrencinin iki katılım koşulunu da sağlamamasını ifade et.",
      steps: [
        "En az bir öğrenci için R∨M yanlış olmalı.",
        "Seçilen öğrenci R’ye de M’ye de katılmaz.",
      ],
      optionReasons: [
        "Bütün öğrenciler bir kurs seçse ve hiçbiri ikisini birlikte seçmese ilk önerme doğru kalabilir.",
        "Bir öğrenci iki kursun da dışındaysa ‘her öğrenci’ iddiası bozulur.",
        "Hiçbir öğrencinin iki kursun da dışında olmaması ilk önerme ile denktir.",
        "Yalnız birine katılmak ilk koşulu sağlar.",
        "Örneğin bütün öğrenciler yalnız müziğe katılıyorsa hepsi resim kursunun dışında kalır. İlk önerme de doğru kalır.",
      ],
      commonError:
        "Bir kişide iki katılımın da yanlış olmasını, iki katılımın birlikte olmamasıyla karıştırmak.",
      check:
        "Resim=0 ve müzik=0 olan tek öğrenci varken tüm sınıf için ilk cümle yanlıştır.",
    },
  }),
  practice({
    id: "niceleyicinin-sirasi",
    prompt:
      "x ve y herhangi bir tam sayı olabilir. I: ∀x ∃y (x+y=0). II: ∃y ∀x (x+y=0). Hangileri doğrudur?",
    options: [
      "Yalnız I",
      "Yalnız II",
      "I ve II",
      "İkisi de yanlış",
      "x=0 koşulu verilmeden karar verilemez.",
    ],
    answer: 0,
    hint: "I’de y’yi her x için değiştirebilirsin. II’de aynı y bütün x’lerde çalışmalı.",
    guidance: {
      knowledge: ["Bir tam sayının toplamsal karşıtı yine bir tam sayıdır."],
      strategy: "I için seçim yap. II için iki farklı x zorunlu kıl.",
      steps: [
        "Her x’e y=−x seç. I doğru.",
        "II için x=0 iken y=0 gerekir, x=1 iken y=−1 gerekir. Tek y ikisini sağlayamaz.",
      ],
      optionReasons: [
        "I değişebilir y ile doğru. II’nin istediği ortak y yok.",
        "II için x=0 ve x=1 farklı y ister.",
        "I doğru olsa da II için tek y mümkün değildir.",
        "I için her x’in tam sayı karşıtı var.",
        "x evrende değişir. Her x için tanımlı y=−x var.",
      ],
      commonError:
        "∀ ile ∃ yer değiştirince seçimin bağımsız kalacağını sanmak.",
      check: "x=−4 için y=4, x=5 için y=−5. Aynı y gerekmez.",
    },
  }),
  practice({
    id: "hipotez-hukum-yer-degisimi",
    prompt:
      "n bir tam sayı. p, n’nin 10 ile; q, n’nin 5 ile bölünmesi olsun. Hangi önerme ve tam sayı doğru bir karşı örnek oluşturur?",
    options: [
      "n=10, p→q için karşı örnek.",
      "n=5, q→p için karşı örnek.",
      "n=0, q′→p′ için karşı örnek.",
      "n=1, p′→q′ için karşı örnek.",
      "n=20, q→p için karşı örnek.",
    ],
    answer: 1,
    hint: "q→p’yi yanlış yapmak için 5 ile bölünen ve 10 ile bölünmeyen sayı seç.",
    guidance: {
      knowledge: ["Karşı örnek öncülü doğru, sonucu yanlış yapar."],
      strategy:
        "Verilen n için iki bölünebilme sonucunu yaz ve önerme biçimine yerleştir.",
      steps: [
        "n=5 için p=0 ve q=1.",
        "q→p biçimi 1→0 olur. n=5 karşıt biçimi çürütür.",
      ],
      optionReasons: [
        "n=10 iki sayıya da bölünür. p→q doğru.",
        "n=5, q’yu doğru, p’yi yanlış yapar.",
        "0 her iki bölenle bölünür. q′→p′, 0→0 olur.",
        "1 hiçbirine bölünmez. p′→q′, 1→1 olur.",
        "20 iki sayının da katıdır. q→p doğru.",
      ],
      commonError:
        "Öncül ve sonucu yanlış yapmanın koşulu yanlış yaptığına inanmak.",
      check: "p→q geneldir, çünkü 10k=5(2k). Bu ispat q→p için kullanılamaz.",
    },
  }),
  practice({
    id: "tanim-ve-hipotez",
    prompt:
      "“Bir tam sayı 6 ile bölünürse 3 ile de bölünür.” önermesinin hipotezini ve ispatın ilk geçerli adımını hangi seçenek birlikte doğru verir?",
    options: [
      "Hipotez 3’e bölünmesidir. n=3k yazılır.",
      "Hipotez 6’ya bölünmesidir. n=6 bir örnek olduğu için ispat tamamdır.",
      "Hipotez 6’ya bölünmesidir. k∈ℤ için n=6k=3(2k) yazılır.",
      "Hipotez hem 3’e hem 6’ya bölünmesidir. Sonuç zaten bilinir.",
      "Hipotez n’nin tam sayı olmasıdır. Her n için n=6k yazılır.",
    ],
    answer: 2,
    hint: "Koşulun solunu varsay. Bölünebilmenin tanımı tam sayı katsayısı gerektirir.",
    guidance: {
      knowledge: [
        "n’nin 6’ya bölünmesi, n=6k olacak bir tam sayı k bulunmasıdır.",
      ],
      strategy: "Hipotezi cebirsel biçime çevirip hükmün tanımına ulaş.",
      steps: [
        "İlk koşul n’nin 6’ya bölünmesi. n=6k ve k∈ℤ.",
        "n=3(2k), 2k tam sayı. Böylece 3’e bölünme hükmü çıkar.",
      ],
      optionReasons: [
        "3’e bölünme verilen koşul değil, çıkarılacak hükümdür.",
        "n=6 tek örnektir. Bütün 6 katlarını kapsamaz.",
        "Doğru öncülü kullanır ve çarpan 2k’nın tam sayı olmasını korur.",
        "İspatlanacak özelliği hipoteze eklemek sonucu baştan varsayar.",
        "Her tam sayı 6’nın katı değildir. Örneğin 1, 6k biçiminde yazılamaz.",
      ],
      commonError:
        "Verilen koşul ile ispatlanacak sonucu birbirinin yerine kullanmak.",
      check:
        "k=−2 için n=−12=3(−4) olur. Genel adım tüm k∈ℤ değerleri için geçerlidir.",
    },
  }),
];

export const logicSource031Summary =
  "Aurelia 031 Mantık ve Önermeler, biçim 5 ve içerik 5.2 (19 Kasım 2026), fiziksel s. 1–17. MEB Matematik 9, karşıt, ters ve karşıt ters, web s. 19 ve basılı s. 31. MEB 2026 YKS kapsam belgesi PDF s. 125, 9.1.1.3 ve 9.1.1.5. 2025 TYT Temel Matematik 11 gerçek kitapçığı ve anahtarı Geçmiş Sınavlar’da açılır.";

export const logicSource031SheetText = new Map<string, string[]>([
  [
    titles.implications,
    [
      "p→q yalnız p=1, q=0 iken yanlış. Karşıt q→p, ters p′→q′, karşıt ters q′→p′.",
      "İlk koşul karşıt tersine, karşıt ise terse denktir.",
    ],
  ],
  [
    titles.proof,
    [
      "Hipotezden başla, tanımın cebirsel biçimini yaz. Çift sayıda n=2k, tek sayıda n=2k+1 ve k∈ℤ.",
      "Hükme ulaşırken parantez içindeki yeni niceliğin tam sayı olduğunu göster.",
    ],
  ],
  [
    titles.counterexample,
    [
      "Genel koşulu çürütmek için öncülü sağlayan ve hükmü yanlış yapan bir örnek yeter.",
      "Evreni kontrol et. Pozitif tam sayı iddiasına negatif örnek uygulanmaz.",
    ],
  ],
  [
    titles.scope,
    [
      "Dış koşul yanlışsa önce sol parçayı 1, sağ parçayı 0 yap. İç bağlaçları sonra çöz.",
      "∀x ∃y’de y, x’e bağlı seçilebilir. ∃y ∀x aynı y’yi ister.",
    ],
  ],
]);
