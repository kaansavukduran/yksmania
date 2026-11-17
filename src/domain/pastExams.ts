import booklets from "../data/official-booklets.json";
export const officialBooklets = booklets;
export interface PastExamReference {
  id: string;
  bookletId: string;
  test: string;
  question: number;
  page: number;
  answerPage: number;
  answer: string;
  topicIds: string[];
  title: string;
  connection: string;
  solution: string[];
}
// Question bodies/images stay in their official PDFs or the user's local copy.
// Every association below was checked on the question page and answer source.
export const pastExamReferences: PastExamReference[] = [
  {
    id: "2021-TYT-MAT-1",
    bookletId: "2021-tyt",
    test: "Temel Matematik",
    question: 1,
    page: 26,
    answerPage: 45,
    answer: "E",
    topicIds: ["detail-202"],
    title: "Doğru bütünü seçerek oran kurma",
    connection:
      "Rasyonel sayılar: kap kütlesini çıkarma ve kesri sadeleştirme.",
    solution: [
      "Boş kap 280 g. Tam dolu su 400−280=120 g, kısmi su 355−280=75 g.",
      "Doluluk oranı 75/120=5/8’dir. 355/400 kabı da hesaba katacağı için su doluluğunu vermez.",
      "Kontrol: 120×5/8=75; 75+280=355 g. Resmî anahtar E ile eşleşir.",
    ],
  },
  {
    id: "2021-TYT-FEN-8",
    bookletId: "2021-tyt",
    test: "Fen Bilimleri",
    question: 8,
    page: 40,
    answerPage: 45,
    answer: "A",
    topicIds: ["detail-141"],
    title: "Sistematik addan yaygın ada",
    connection:
      "Kimyanın sembolik dili: azot ve hidrojen sembollerini adla eşleştirme.",
    solution: [
      "Verilen addaki azot N, hidrojen H ile gösterilir; tri üç hidrojen belirtir.",
      "NH₃’ün yaygın adı amonyaktır. Formüldeki atom sayısı oranı N:H=1:3’tür.",
      "Sonuç A; resmî anahtar da A’dır. Bu tek ad örneği tüm bileşikler için genel adlandırma kuralı değildir.",
    ],
  },
  {
    id: "2021-TYT-FEN-9",
    bookletId: "2021-tyt",
    test: "Fen Bilimleri",
    question: 9,
    page: 40,
    answerPage: 45,
    answer: "C",
    topicIds: ["detail-146"],
    title: "Dış katmandaki elektronları karşılaştırma",
    connection: "Periyodik sistem: helyumun dış katman istisnası.",
    solution: [
      "Temel halde He’nin dış katmanı 2, N’ninki 5, Mg’ninki 2 elektron içerir.",
      "Bu nedenle N > Mg = He. Helyumu sırf 18. grupta diye sekiz dış elektronlu sayma.",
      "C seçeneği bu ilişkiyi verir ve resmî anahtarla eşleşir.",
    ],
  },
  {
    id: "2018-TYT-FEN-1",
    bookletId: "2018-tyt",
    test: "Fen Bilimleri",
    question: 1,
    page: 34,
    answerPage: 42,
    answer: "E",
    topicIds: ["detail-2", "detail-139"],
    title: "Bilimsel bilgiye ulaşma yolları",
    connection:
      "Bilimsel yöntemle doğrudan; simyadan kimyaya geçişle bağlantılıdır. Doğrudan simya tarihi sorusu değildir.",
    solution: [
      "Deney koşulları sınar, gözlem veri sağlar, akıl yürütme veriler arasında gerekçeli ilişki kurar.",
      "Üçünün de kullanılabilmesi E sonucunu verir; resmî anahtar E’dir.",
      "Kullanılabilirlik, her araştırmanın aynı sabit sırayla ilerlemesi veya üç yolun her seferinde zorunlu birlikte bulunması demek değildir.",
    ],
  },
  {
    id: "2018-TYT-FEN-12",
    bookletId: "2018-tyt",
    test: "Fen Bilimleri",
    question: 12,
    page: 37,
    answerPage: 42,
    answer: "E",
    topicIds: ["detail-139"],
    title: "Mürekkebin bileşenlerini işleviyle eşleştirme",
    connection:
      "Tarihsel ürünlerle bağlantılı uygulama sorusudur; doğrudan simya tarihi sorusu değildir.",
    solution: [
      "Boya veya pigment renk, uygun uçucu çözücü kuruma, bağlayıcı yüzeye tutunma işleviyle değerlendirilir.",
      "Verilen üç işlev birlikte değerlendirilince E sonucu çıkar; resmî anahtar da E’dir.",
      "Bir ürünün tarihsel kullanımı, güncel bileşenlerinin kimyayla incelenmesini engellemez.",
    ],
  },
  {
    id: "2026-ALES2-SAY-4",
    bookletId: "2026-ales2",
    test: "Sayısal",
    question: 4,
    page: 3,
    answerPage: 3,
    answer: "C",
    topicIds: ["detail-202"],
    title: "Ondalık bölmelerde ölçeği koruma",
    connection:
      "Rasyonel sayılarla bağlantılı ondalık işlem; ortak payda ve işlem sırası.",
    solution: [
      "Her bölmede bölen virgülden kurtarılırken bölünen de aynı 10 kuvvetiyle çarpılmalıdır.",
      "İlk bölüm 10, ikinci bölüm 0,1 verir. Aradaki çıkarma 10−0,1=9,9’dur.",
      "C seçeneği. Bu %10 kitapçığında doğru cevap soru sayfasında C olarak verilmiştir.",
    ],
  },
  {
    id: "2026-DGS-SAY-1",
    bookletId: "2026-dgs",
    test: "Sayısal",
    question: 1,
    page: 3,
    answerPage: 3,
    answer: "E",
    topicIds: ["detail-202"],
    title: "Çok katlı kesirde gruplama",
    connection: "Rasyonel sayılar: üst ve alt grupları ayrı bitirip bölme.",
    solution: [
      "Üstte 1/2+5=11/2; altta 1/2+3/5=11/10 bulunur.",
      "(11/2)÷(11/10)=(11/2)×(10/11)=5.",
      "E seçeneği. %10 kitapçığının aynı sayfasındaki cevap E ile eşleşir.",
    ],
  },
  {
    id: "2026-KPSS-GY-33",
    bookletId: "2026-kpss",
    test: "Genel Yetenek",
    question: 33,
    page: 13,
    answerPage: 13,
    answer: "C",
    topicIds: ["detail-208"],
    title: "Kökleri ortak çarpana dönüştürme",
    connection:
      "Köklü sayılar: karekök ve dördüncü dereceden kök, ortak çarpanla sadeleştirme.",
    solution: [
      "√96=4√6 ve ⁴√4=√2; pay 4√12=8√3 olur.",
      "Payda √75−√27=5√3−3√3=2√3. Bölüm 4’tür.",
      "C seçeneği; aynı sayfadaki resmî doğru cevap C’dir. Kök derecesini atlama.",
    ],
  },
  {
    id: "2021-TYT-MAT-5",
    bookletId: "2021-tyt",
    test: "Temel Matematik",
    question: 5,
    page: 27,
    answerPage: 45,
    answer: "C",
    topicIds: ["detail-198", "topic-tyt-mat-faktoriyel-kaynak-033"],
    title: "Katmanlı adetlerden faktöriyel zincirine",
    connection:
      "Faktöriyel: katman adetlerini çarpma ve 11’den 14’e ardışık çarpımı 14!/10! ile yazma.",
    solution: [
      "Verilen katman adetlerinin çarpımı 11·12·13·2·7’dir; her katman sayısı ayrı bir faktöriyel değildir.",
      "2·7=14 birleşince 11·12·13·14 kalır. 14!=14·13·12·11·10! olduğundan çarpım 14!/10!’tır.",
      "Bağımsız sayısal kontrol 132·182=24.024 verir. Resmî soru için C anahtarıyla eşleşir; buradaki öğretim açıklaması resmî kurum çözümü değildir.",
    ],
  },
  {
    id: "2021-TYT-MAT-15",
    bookletId: "2021-tyt",
    test: "Temel Matematik",
    question: 15,
    page: 30,
    answerPage: 45,
    answer: "A",
    topicIds: ["detail-201", "topic-tyt-mat-ebob-ekok-kaynak-034"],
    title: "Bölünebilme koşullarını ortak katta birleştirme",
    connection: "EBOB ve EKOK: 9 ve 5 için ortak kat 45, 9 ve 12 için ortak kat 36 üzerinden rakam koşullarını denetleme.",
    solution: [
      "Üç basamaklı gösterimlerde A sıfır olamaz; AAB=110A+B ve ABA=101A+10B yazılır. İkisinin rakam toplamı da 2A+B’dir; 9’a bölünebilme ortak koşuldur.",
      "5’e bölünen sayı AAB ise B=0 veya 5; ABA ise A=5 olur. Her dalda diğer sayının 12’ye bölünmesini, yani 3 ve 4 koşullarını da koru. A=1…9 ve B=0…9 içindeki 90 çifti bu iki olasılıkla tüketince tek uygun çift A=2, B=5’tir.",
      "Kontrol: 225 hem 9’a hem 5’e; 252 hem 9’a hem 12’ye tam bölünür. A+B=7, resmî anahtar A ile eşleşir. Bu adımlar özgün öğretim açıklamasıdır; resmî kurum çözümü değildir.",
    ],
  },
  {
    "id": "2024-TYT-MAT-3",
    "bookletId": "2024-tyt",
    "test": "Temel Matematik",
    "question": 3,
    "page": 24,
    "answerPage": 43,
    "answer": "A",
    "topicIds": [
      "topic-tyt-mat-dogrusal-denklemler-kaynak-036"
    ],
    "title": "Sabit artış ile katlanmalı örüntüyü ayırma",
    "connection": "Denklem kurmadan önce üretim kuralını belirle. Bu seçili resmî örnek katlanmalıdır; doğrusal 241→81 alıştırması bu sorunun özeti değildir.",
    "solution": [
      "Her yeni katmanda sayı iki katına çıkar: 1, 2, 4, …; ilk üç katman toplamı 7’dir.",
      "12. adım toplamından 10. adım toplamını çıkarınca yalnız 11. ve 12. katman kalır: 2¹⁰+2¹¹=3×2¹⁰=3072.",
      "Resmî A seçeneği 3×2¹⁰’dur. Sabit fark varsayımı kullanılamaz; bu özgün öğretim açıklaması resmî kurum çözümü değildir."
    ]
  },
  {
    "id": "2024-TYT-MAT-8",
    "bookletId": "2024-tyt",
    "test": "Temel Matematik",
    "question": 8,
    "page": 26,
    "answerPage": 43,
    "answer": "A",
    "topicIds": [
      "topic-tyt-mat-basit-esitsizlikler-kaynak-037"
    ],
    "title": "Kâr ve zarar koşullarının ortak aralığı",
    "connection": "Basit eşitsizlikler: aynı maliyetle iki satış koşulunu kesiştir. Resmî b TL’dir; bin TL ölçeği ayrı u=b/1000 değişkenidir.",
    "solution": [
      "Toplam maliyet 18.000+22.000+b=40.000+b TL. Kâr koşulu 2b+30.000>40.000+b olduğundan b>10.000 TL.",
      "Zarar koşulu 3b−20.000<40.000+b olduğundan 2b<60.000 ve b<30.000 TL. Birlikte 10.000<b<30.000.",
      "Merkez 20.000, yarıçap 10.000 TL’dir: |b−20.000|<10.000. Resmî anahtar A’dır. u=b/1000 seçilirse 10<u<30; b=20 TL denmez."
    ]
  },
];
// Selected companion links leave all earlier source records and their topic lists intact.
const sourceCompanionReferences: Record<string, readonly string[]> = {
  "topic-tyt-mat-rasyonel-kaynak-035": ["2021-TYT-MAT-1"],
};
export function pastExamReferencesForTopic(topicId?: string) {
  return pastExamReferences.filter((reference) => Boolean(topicId && (
    reference.topicIds.includes(topicId) ||
    sourceCompanionReferences[topicId]?.includes(reference.id)
  )));
}
export const officialExamArchives = [
  { exam: "TYT / AYT", url: "https://osym.gov.tr/SinavGrubu/Index/2" },
  { exam: "ALES", url: "https://osym.gov.tr/SinavGrubu/Index/5" },
  { exam: "DGS", url: "https://osym.gov.tr/SinavGrubu/Index/8" },
  { exam: "KPSS", url: "https://www.osym.gov.tr/SinavGrubu/Menu/344" },
  { exam: "Diğer ÖSYM sınavları", url: "https://osym.gov.tr/SinavGrubu/Hepsi" },
];
