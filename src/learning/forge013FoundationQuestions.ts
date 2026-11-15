import type { Question } from "../domain/model";
import { foundationQuestionSets } from "./forge012FoundationQuestions";

export interface FoundationPracticeSet {
  lessonId: string;
  topicId: string;
  subjectId: string;
  lessonTitle: string;
  questions: Question[];
}

// Original, independently reviewed practice for thirteen existing theory lessons.
// Existing lesson IDs, teaching, models and learner records are retained.
export const foundation013QuestionSets: FoundationPracticeSet[] = [
  {
    lessonId: "sayi-basamaklari",
    topicId: "detail-199",
    subjectId: "tyt-matematik",
    lessonTitle: "Sayı basamakları: rakamdan koşullu denkleme",
    questions: [
      {
        id: "f013-foundation-sayi-basamaklari-1",
        prompt: {
          tr: "Onluk sayı sisteminde 64027 sayısındaki 4 rakamının basamak değeri kaçtır?",
        },
        options: [
          {
            tr: "4000",
          },
          {
            tr: "4",
          },
          {
            tr: "40",
          },
          {
            tr: "400",
          },
          {
            tr: "40000",
          },
        ],
        answer: 0,
        hint: {
          tr: "Rakamın bulunduğu konumu sağdan sola belirle.",
        },
        explanation: {
          tr: "64027=6·10000+4·1000+0·100+2·10+7’dir. 4 binler basamağında olduğundan katkısı 4·1000=4000 olur. Rakamın sayı değeri 4’tür; basamak değeri konumuna göre büyür.",
        },
        skill: "foundation-sayi-basamaklari-1",
      },
      {
        id: "f013-foundation-sayi-basamaklari-2",
        prompt: {
          tr: "A ve B sıfırdan farklı rakamlardır. AB=10 A+B, BA=10 B+A iki basamaklı sayıları tanımlasın. A+B=13 ve AB−BA=27 ise AB kaçtır?",
        },
        options: [
          {
            tr: "58",
          },
          {
            tr: "85",
          },
          {
            tr: "67",
          },
          {
            tr: "76",
          },
          {
            tr: "94",
          },
        ],
        answer: 1,
        hint: {
          tr: "Farkı 9(A−B) olarak aç; iki rakam denklemini birleştir.",
        },
        explanation: {
          tr: "(10 A+B)−(10 B+A)=9(A−B)=27, yani A−B=3. A+B=13 ile toplandığında 2 A=16, A=8 ve B=5 bulunur. AB=85; 85−58=27 ve 8+5=13 iki koşulu da doğrular.",
        },
        skill: "foundation-sayi-basamaklari-2",
      },
      {
        id: "f013-foundation-sayi-basamaklari-3",
        prompt: {
          tr: "0, 3, 7 ve 8 rakamlarından üçü seçilerek üç basamaklı çift sayılar yazılıyor. Her sayının içinde bir rakam en fazla bir kez kullanılabilir. Kaç farklı sayı yazılır?",
        },
        options: [
          {
            tr: "8",
          },
          {
            tr: "12",
          },
          {
            tr: "10",
          },
          {
            tr: "18",
          },
          {
            tr: "24",
          },
        ],
        answer: 2,
        hint: {
          tr: "Son rakamı 0 veya 8 olma durumlarına ayrı ayır.",
        },
        explanation: {
          tr: "Sonu 0 ise yüzler için 3 seçenek, onlar için kalan 2 seçenek vardır: 6 sayı. Sonu 8 ise yüzler 3 veya 7 olabilir; onlar için 0 dahil 2 seçenek kalır: 4 sayı. Ayrık iki durum toplam 10’dur. Baştaki 0 üç basamaklı sayı oluşturmaz.",
        },
        skill: "foundation-sayi-basamaklari-3",
      },
      {
        id: "f013-foundation-sayi-basamaklari-4",
        prompt: {
          tr: "N iki basamaklı bir doğal sayıdır. N’nin onluk yazımının sağına 4 rakamı eklenince oluşan sayı N’den 454 fazla oluyor. N kaçtır?",
        },
        options: [
          {
            tr: "45",
          },
          {
            tr: "54",
          },
          {
            tr: "60",
          },
          {
            tr: "50",
          },
          {
            tr: "64",
          },
        ],
        answer: 3,
        hint: {
          tr: "Sağa rakam eklemek 10 N+4 oluşturur.",
        },
        explanation: {
          tr: "Yeni sayı 10 N+4 olduğundan 10 N+4=N+454 yazılır. 9 N=450 ve N=50 bulunur. Sağa 4 eklenince 504 oluşur; 504−50=454. N+4 işlemi rakam ekleme işlemini temsil etmez.",
        },
        skill: "foundation-sayi-basamaklari-4",
      },
      {
        id: "f013-foundation-sayi-basamaklari-5",
        prompt: {
          tr: "A, B ve C rakam; A sıfırdan farklı olsun. ABC=100 A+10 B+C üç basamaklı sayısında A’nın hemen sağına bir 0 yazılarak A0BC=1000 A+10 B+C oluşturuluyor. Sayı 4500 artarsa A kaçtır?",
        },
        options: [
          {
            tr: "3",
          },
          {
            tr: "4",
          },
          {
            tr: "6",
          },
          {
            tr: "9",
          },
          {
            tr: "5",
          },
        ],
        answer: 4,
        hint: {
          tr: "Yeni ve eski çözümlemeyi çıkar; B ve C terimleri aynı kalır.",
        },
        explanation: {
          tr: "A0BC−ABC=(1000 A+10 B+C)−(100 A+10 B+C)=900 A olur. 900 A=4500’den A=5 çıkar. Onlar ve birler rakamları yerlerini koruduğundan değişime katkı vermez; baştaki A 1–9 aralığındadır.",
        },
        skill: "foundation-sayi-basamaklari-5",
      },
      {
        id: "f013-foundation-sayi-basamaklari-6",
        prompt: {
          tr: "A, B ve C rakam; A ve C sıfırdan farklıdır. ABC=100 A+10 B+C ve CBA=100 C+10 B+A üç basamaklı sayıları için ABC−CBA=396, A+C=10 veriliyor. A·C kaçtır?",
        },
        options: [
          {
            tr: "21",
          },
          {
            tr: "12",
          },
          {
            tr: "16",
          },
          {
            tr: "24",
          },
          {
            tr: "25",
          },
        ],
        answer: 0,
        hint: {
          tr: "Farkta ortadaki rakam iptal olur; A−C bulunur.",
        },
        explanation: {
          tr: "ABC−CBA=99(A−C)=396 olduğundan A−C=4. A+C=10 ile birlikte 2 A=14, A=7 ve C=3 olur. A·C=21. B belirlenmese de istenen çarpım tek değerlidir; bütün sayıyı bulmak zorunda değilsin.",
        },
        skill: "foundation-sayi-basamaklari-6",
      },
      {
        id: "f013-foundation-sayi-basamaklari-7",
        prompt: {
          tr: "A ve B rakam; A sıfırdan farklıdır. A8=10 A+8 ve 4B=40+B iki basamaklı sayıları için A8+4B=105 veriliyor. A+B kaçtır?",
        },
        options: [
          {
            tr: "10",
          },
          {
            tr: "12",
          },
          {
            tr: "11",
          },
          {
            tr: "13",
          },
          {
            tr: "15",
          },
        ],
        answer: 1,
        hint: {
          tr: "Birler sütununda 8+B’nin son rakamı 5 olmalı; eldeyi onlar sütununa taşı.",
        },
        explanation: {
          tr: "8+B=15 gerektiğinden B=7 ve elde 1 vardır. Onlar sütununda A+4+1=10; A=5. Böylece 58+47=105 ve A+B=12. Sadece onlar rakamlarını toplayıp eldeyi atlamak yanlış A üretir.",
        },
        skill: "foundation-sayi-basamaklari-7",
      },
      {
        id: "f013-foundation-sayi-basamaklari-8",
        prompt: {
          tr: "0, 2, 6 ve 9 rakamlarının her biri tam bir kez kullanılarak en büyük ve en küçük dört basamaklı doğal sayılar yazılıyor. Bu iki sayının pozitif farkı kaçtır?",
        },
        options: [
          {
            tr: "6939",
          },
          {
            tr: "7351",
          },
          {
            tr: "7551",
          },
          {
            tr: "7559",
          },
          {
            tr: "8991",
          },
        ],
        answer: 2,
        hint: {
          tr: "En küçük sayıda ilk yere en küçük sıfır olmayan rakamı yerleştir.",
        },
        explanation: {
          tr: "En büyük sayı 9620’dir. En küçük dört basamaklı sayı 2069 olur; 0269 dört basamaklı değildir. Fark 9620−2069=7551. İki sayı da aynı dört rakamı birer kez kullanır ve ilk rakamları sıfır değildir.",
        },
        skill: "foundation-sayi-basamaklari-8",
      },
      {
        id: "f013-foundation-sayi-basamaklari-9",
        prompt: {
          tr: "Bir kitabın sayfaları 1’den 135’e kadar, iki uç da dahil olacak şekilde onluk doğal sayılarla numaralanıyor. Baştaki sıfırlar veya başka sayfa numarası yok. Toplam kaç rakam yazılır?",
        },
        options: [
          {
            tr: "135",
          },
          {
            tr: "270",
          },
          {
            tr: "294",
          },
          {
            tr: "297",
          },
          {
            tr: "405",
          },
        ],
        answer: 3,
        hint: {
          tr: "1–9, 10–99 ve 100–135 aralıklarını ayrı say.",
        },
        explanation: {
          tr: "1–9 için 9 rakam, 10–99 için 90·2=180 rakam gerekir. 100–135 aralığında 135−100+1=36 sayı vardır; bunlar 108 rakam kullanır. Toplam 9+180+108=297. Sayfa sayısını bütün numaralar üç basamaklıymış gibi 3 ile çarpma.",
        },
        skill: "foundation-sayi-basamaklari-9",
      },
      {
        id: "f013-foundation-sayi-basamaklari-10",
        prompt: {
          tr: "AB ve CD iki basamaklı sayılar, ABCD ise bu iki yazımın art arda birleştirilmesiyle oluşan dört basamaklı sayıdır. AB=3·CD ve AB+CD=96 olduğuna göre ABCD kaçtır?",
        },
        options: [
          {
            tr: "2472",
          },
          {
            tr: "7236",
          },
          {
            tr: "7422",
          },
          {
            tr: "9624",
          },
          {
            tr: "7224",
          },
        ],
        answer: 4,
        hint: {
          tr: "Önce CD=x seç; birleştirmede ABCD=100·AB+CD olur.",
        },
        explanation: {
          tr: "CD=x ise AB=3 x; toplam 4 x=96’dan x=24 ve AB=72 bulunur. Birleştirme 100·72+24=7224 yapar. 72 ile 24’ün toplamı 96’dır; bu toplam dört basamaklı birleştirilmiş sayı değildir.",
        },
        skill: "foundation-sayi-basamaklari-10",
      },
    ],
  },
  {
    lessonId: "bolme-bolunebilme",
    topicId: "detail-200",
    subjectId: "tyt-matematik",
    lessonTitle: "Bölme ve bölünebilme: gruplar, kalanlar ve koşullar",
    questions: [
      {
        id: "f013-foundation-bolme-bolunebilme-1",
        prompt: {
          tr: "157 doğal sayısı 12’ye bölündüğünde tam sayı bölüm ve kalan sırasıyla kaçtır?",
        },
        options: [
          {
            tr: "13 ve 1",
          },
          {
            tr: "12 ve 13",
          },
          {
            tr: "13 ve 0",
          },
          {
            tr: "12 ve 1",
          },
          {
            tr: "14 ve 11",
          },
        ],
        answer: 0,
        hint: {
          tr: "157=12 q+r ve 0≤r<12 koşullarını birlikte sağla.",
        },
        explanation: {
          tr: "12·13=156 ve 157−156=1 olduğundan bölüm 13, kalan 1’dir. 157=12·13+1 ve 1<12 birlikte sağlanır. Bölüm 12 seçilirse artan 13 olur; 13 böleni aştığı için bir grup daha çıkarmak gerekir.",
        },
        skill: "foundation-bolme-bolunebilme-1",
      },
      {
        id: "f013-foundation-bolme-bolunebilme-2",
        prompt: {
          tr: "Bir doğal sayının 13 ile bölümünde tam sayı bölüm 6, kalan 11’dir. Bölünen sayı kaçtır?",
        },
        options: [
          {
            tr: "78",
          },
          {
            tr: "89",
          },
          {
            tr: "84",
          },
          {
            tr: "95",
          },
          {
            tr: "143",
          },
        ],
        answer: 1,
        hint: {
          tr: "Bölünen=bölen×bölüm+kalan eşitliğini kur.",
        },
        explanation: {
          tr: "Bölünen 13·6+11=78+11=89’dur. Kalan 11, bölen 13’ten küçük olduğu için işlem geçerlidir. 13 ile 6’yı çarpmak yalnız tam grupları sayar; kalan 11 ayrıca eklenmelidir.",
        },
        skill: "foundation-bolme-bolunebilme-2",
      },
      {
        id: "f013-foundation-bolme-bolunebilme-3",
        prompt: {
          tr: "N doğal sayısının 7 ile bölümünden kalan 4’tür. 3 N+5 sayısının 7 ile bölümünden kalan kaçtır?",
        },
        options: [
          {
            tr: "0",
          },
          {
            tr: "1",
          },
          {
            tr: "3",
          },
          {
            tr: "4",
          },
          {
            tr: "5",
          },
        ],
        answer: 2,
        hint: {
          tr: "N yerine kalan 4’ü koy, çıkan sonucu yeniden 7’ye böl.",
        },
        explanation: {
          tr: "N=7 k+4 yazılırsa 3 N+5=21 k+17=7(3 k+2)+3 olur. Son kalan 3’tür. 3·4+5=17 yalnız ara sonuçtur; kalan 7’den küçük olmalı, bu yüzden 17’yi yeniden 7’ye indiririz.",
        },
        skill: "foundation-bolme-bolunebilme-3",
      },
      {
        id: "f013-foundation-bolme-bolunebilme-4",
        prompt: {
          tr: "a ve b rakam; 4a6b=4000+100 a+60+b dört basamaklı sayısı hem 5’e hem 9’a tam bölünüyor. a’nın alabileceği farklı değerlerin toplamı kaçtır?",
        },
        options: [
          {
            tr: "3",
          },
          {
            tr: "8",
          },
          {
            tr: "10",
          },
          {
            tr: "11",
          },
          {
            tr: "15",
          },
        ],
        answer: 3,
        hint: {
          tr: "5 koşulundan b 0 veya 5; sonra rakam toplamını 9’a denetle.",
        },
        explanation: {
          tr: "b=0 iken rakam toplamı 10+a, 9’un katı olmalı: a=8. b=5 iken 15+a, 9’un katı olmalı: a=3. Geçerli sayılar 4860 ve 4365’tir. Farklı a değerleri 8 ve 3, toplamları 11; bütün rakamlar 0–9 aralığında kalır.",
        },
        skill: "foundation-bolme-bolunebilme-4",
      },
      {
        id: "f013-foundation-bolme-bolunebilme-5",
        prompt: {
          tr: "a bir rakamdır. 7a2=700+10 a+2 üç basamaklı sayısının 4’e tam bölünmesini sağlayan kaç farklı a değeri vardır?",
        },
        options: [
          {
            tr: "2",
          },
          {
            tr: "3",
          },
          {
            tr: "4",
          },
          {
            tr: "10",
          },
          {
            tr: "5",
          },
        ],
        answer: 4,
        hint: {
          tr: "4 için yalnız son iki basamağın oluşturduğu a2 sayısını denetle.",
        },
        explanation: {
          tr: "100’ün katı olan 700’den sonra son iki basamağı incelemek yeterlidir. a2; 12,32,52,72,92 olduğunda 4’e bölünür. Böylece a=1,3,5,7,9 olmak üzere 5 değer vardır. 02 sayısal olarak 2’dir ve 4’e bölünmez.",
        },
        skill: "foundation-bolme-bolunebilme-5",
      },
      {
        id: "f013-foundation-bolme-bolunebilme-6",
        prompt: {
          tr: "a bir rakamdır. 52a=520+a üç basamaklı sayısı 8’e tam bölünüyor. a’nın alabileceği farklı değerlerin toplamı kaçtır?",
        },
        options: [
          {
            tr: "8",
          },
          {
            tr: "0",
          },
          {
            tr: "2",
          },
          {
            tr: "4",
          },
          {
            tr: "16",
          },
        ],
        answer: 0,
        hint: {
          tr: "520’nin 8 ile kalanını bul; a 0–9 aralığında olmalı.",
        },
        explanation: {
          tr: "520=8·65 olduğundan 520+a’nın tam bölünmesi için a da 8’in katı olmalıdır. Rakam aralığında yalnız 0 ve 8 uygundur; toplam 0+8=8. a=16 kat olsa da tek bir rakam olamaz.",
        },
        skill: "foundation-bolme-bolunebilme-6",
      },
      {
        id: "f013-foundation-bolme-bolunebilme-7",
        prompt: {
          tr: "a bir rakamdır. 12a4=1000+200+10 a+4 dört basamaklı sayısı 11’e tam bölünüyor. a kaçtır?",
        },
        options: [
          {
            tr: "0",
          },
          {
            tr: "5",
          },
          {
            tr: "3",
          },
          {
            tr: "6",
          },
          {
            tr: "9",
          },
        ],
        answer: 1,
        hint: {
          tr: "Sağdan başlayan dönüşümlü rakam toplamını kullan.",
        },
        explanation: {
          tr: "Sağdan 4−a+2−1=5−a elde edilir. a 0–9 olduğundan bu değer−4 ile 5 arasındadır; bu aralıkta 11’in tek katı 0’dır. 5−a=0 ⇒a=5; 1254=11·114 ile kontrol edilir.",
        },
        skill: "foundation-bolme-bolunebilme-7",
      },
      {
        id: "f013-foundation-bolme-bolunebilme-8",
        prompt: {
          tr: "Pozitif tam sayı N hem 6’ya hem 10’a tam bölünüyor. N’nin hangi sayıya mutlaka tam bölündüğü söylenebilir?",
        },
        options: [
          {
            tr: "12",
          },
          {
            tr: "20",
          },
          {
            tr: "30",
          },
          {
            tr: "40",
          },
          {
            tr: "60",
          },
        ],
        answer: 2,
        hint: {
          tr: "Ortak asal çarpanı iki kez sayma; ortak katın en küçük zorunlu çarpanlarını kur.",
        },
        explanation: {
          tr: "6=2·3,10=2·5 olduğundan N en az 2·3·5=30 çarpanlarını taşır. 60 için ek bir 2 gerekir ve zorunlu değildir. N=30 iki başlangıç koşulunu sağlar, fakat 12,20,40,60’a bölünmez; yalnız 30 her durumda garantidir.",
        },
        skill: "foundation-bolme-bolunebilme-8",
      },
      {
        id: "f013-foundation-bolme-bolunebilme-9",
        prompt: {
          tr: "A ve B doğal sayılarının 7 ile bölümlerinden kalanlar sırasıyla 5 ve 6’dır. A²+A·B−B ifadesinin 7 ile bölümünden kalan kaçtır?",
        },
        options: [
          {
            tr: "1",
          },
          {
            tr: "2",
          },
          {
            tr: "4",
          },
          {
            tr: "0",
          },
          {
            tr: "6",
          },
        ],
        answer: 3,
        hint: {
          tr: "Her yerde A yerine 5, B yerine 6 kullan; sonucu yeniden kalan aralığına indir.",
        },
        explanation: {
          tr: "A²+A·B−B, 7 bakımından 5²+5·6−6=25+30−6=49 ile aynı kalanı taşır. 49=7·7 olduğundan kalan 0’dır. İşlemlerden sonra sonucun 7’den küçük olması kontrolü yapılır; ara toplamı doğrudan son kalan sayma.",
        },
        skill: "foundation-bolme-bolunebilme-9",
      },
      {
        id: "f013-foundation-bolme-bolunebilme-10",
        prompt: {
          tr: "87 doğal sayısının pozitif tam sayı b ile bölümünde tam sayı bölüm 7, kalan 3’tür. b kaçtır?",
        },
        options: [
          {
            tr: "7",
          },
          {
            tr: "10",
          },
          {
            tr: "11",
          },
          {
            tr: "13",
          },
          {
            tr: "12",
          },
        ],
        answer: 4,
        hint: {
          tr: "87=7 b+3 yaz; sonra kalan 3’ün b’den küçük olduğunu doğrula.",
        },
        explanation: {
          tr: "87−3=84=7 b olduğundan b=12 bulunur. 3<12 kaldığı için işlem geçerlidir; 87=12·7+3. Bölüm 7 ile bölen b farklı niceliklerdir; kalan aralığını kontrol etmeden yalnız denklem çözmek her zaman yeterli olmaz.",
        },
        skill: "foundation-bolme-bolunebilme-10",
      },
    ],
  },
  {
    lessonId: "ebob-ekok",
    topicId: "detail-201",
    subjectId: "tyt-matematik",
    lessonTitle: "EBOB ve EKOK: ortak parça mı, ortak tekrar mı?",
    questions: [
      {
        id: "f013-foundation-ebob-ekok-1",
        prompt: {
          tr: "96 ve 144 pozitif tam sayılarının en büyük ortak böleni kaçtır?",
        },
        options: [
          {
            tr: "48",
          },
          {
            tr: "12",
          },
          {
            tr: "24",
          },
          {
            tr: "36",
          },
          {
            tr: "72",
          },
        ],
        answer: 0,
        hint: {
          tr: "Ortak asal çarpanlarda küçük kuvveti seç veya Öklid yöntemi kullan.",
        },
        explanation: {
          tr: "96=2⁵·3,144=2⁴·3². Ortak bölen için 2’nin küçük üssü 4,3’ün küçük üssü 1 alınır:16·3=48. Kontrol 96/48=2 ve 144/48=3 tam sayıdır; 72 ise 96’yı tam bölmez.",
        },
        skill: "foundation-ebob-ekok-1",
      },
      {
        id: "f013-foundation-ebob-ekok-2",
        prompt: {
          tr: "20 ve 28 pozitif tam sayılarının en küçük ortak katı kaçtır?",
        },
        options: [
          {
            tr: "4",
          },
          {
            tr: "140",
          },
          {
            tr: "56",
          },
          {
            tr: "80",
          },
          {
            tr: "560",
          },
        ],
        answer: 1,
        hint: {
          tr: "Ortak kat iki sayının bütün asal kuvvet gereksinimlerini karşılamalı.",
        },
        explanation: {
          tr: "20=2²·5,28=2²·7; büyük kuvvetlerle EKOK=2²·5·7=140 bulunur. 140/20=7 ve 140/28=5 tam sayıdır. 20·28=560 ortak kattır ama ortak 2² çarpanı iki kez sayıldığı için en küçük değildir.",
        },
        skill: "foundation-ebob-ekok-2",
      },
      {
        id: "f013-foundation-ebob-ekok-3",
        prompt: {
          tr: "a=36 ve b pozitif tam sayıdır. EBOB(a, b)=12, EKOK(a, b)=180 olduğuna göre b kaçtır?",
        },
        options: [
          {
            tr: "48",
          },
          {
            tr: "72",
          },
          {
            tr: "60",
          },
          {
            tr: "90",
          },
          {
            tr: "120",
          },
        ],
        answer: 2,
        hint: {
          tr: "İki pozitif sayı için a·b=EBOB·EKOK kullan.",
        },
        explanation: {
          tr: "36 b=12·180=2160 ⇒b=60. Geri kontrolde EBOB(36,60)=12 ve EKOK(36,60)=180 elde edilir. Çarpım eşitliği adayı verir; bulduğun sayının iki ayrı koşulu da sağladığını doğrulamak gerekir.",
        },
        skill: "foundation-ebob-ekok-3",
      },
      {
        id: "f013-foundation-ebob-ekok-4",
        prompt: {
          tr: "48 m ve 60 m uzunluğundaki iki ip, hiç artmayacak biçimde eşit uzunlukta en büyük parçalara ayrılıyor. Kesim kaybı yoktur. Toplam kaç parça elde edilir?",
        },
        options: [
          {
            tr: "5",
          },
          {
            tr: "8",
          },
          {
            tr: "12",
          },
          {
            tr: "9",
          },
          {
            tr: "108",
          },
        ],
        answer: 3,
        hint: {
          tr: "Önce en büyük parça uzunluğunu bul; sonra her ipin parça sayısını ayrı hesapla.",
        },
        explanation: {
          tr: "Parça boyu her iki uzunluğu tam bölmelidir; en büyüğü EBOB(48,60)=12 m olur. Birinci ip 4, ikinci ip 5 parça verir; toplam 9 parça. 12 cevabı uzunluktur; soru parça adedini istediğinden bölmeleri ayrıca yapmalısın.",
        },
        skill: "foundation-ebob-ekok-4",
      },
      {
        id: "f013-foundation-ebob-ekok-5",
        prompt: {
          tr: "A lambası 8, B lambası 12 dakikada bir yanıyor. İkisi 09.00’da birlikte yanıyor ve bu an 1. ortak yanma sayılıyor. Düzen değişmeden 4. ortak yanma saat kaçta olur?",
        },
        options: [
          {
            tr: "09.24",
          },
          {
            tr: "09.48",
          },
          {
            tr: "10.36",
          },
          {
            tr: "10.48",
          },
          {
            tr: "10.12",
          },
        ],
        answer: 4,
        hint: {
          tr: "Ortak aralık EKOK’tur; ilk an sayıldığı için yalnız 3 aralık geçer.",
        },
        explanation: {
          tr: "EKOK(8,12)=24 dakika. Ortak anlar 09.00,09.24,09.48,10.12’dir; 4. ortak olay için 3·24=72 dakika geçer. Başlangıç ilk sayıldığı için 4 aralık eklemek yerine 3 aralık sayılır; saat/dakika dönüşümü 60 tabanlıdır.",
        },
        skill: "foundation-ebob-ekok-5",
      },
      {
        id: "f013-foundation-ebob-ekok-6",
        prompt: {
          tr: "120 cm×168 cm dikdörtgen, kenarlara paralel eş karelerle kesmeden ve boşluk bırakmadan tamamen kaplanıyor. Karelerin kenarları santimetre cinsinden pozitif tam sayıdır. En az kaç kare gerekir?",
        },
        options: [
          {
            tr: "35",
          },
          {
            tr: "24",
          },
          {
            tr: "49",
          },
          {
            tr: "70",
          },
          {
            tr: "140",
          },
        ],
        answer: 0,
        hint: {
          tr: "En az kare için iki kenarı da bölen en büyük kare kenarı gerekir.",
        },
        explanation: {
          tr: "En büyük kare kenarı EBOB(120,168)=24 cm’dir. Uzunluk yönlerinde 120/24=5 ve 168/24=7 kare olur; toplam 5·7=35. Alan kontrolü 120·168/24²=35’tir. Yalnız alanın bölünmesi değil kenarlara tam uyma koşulu da sağlanır.",
        },
        skill: "foundation-ebob-ekok-6",
      },
      {
        id: "f013-foundation-ebob-ekok-7",
        prompt: {
          tr: "150’den büyük pozitif tam sayı N, 8 ve 12 ile ayrı ayrı bölündüğünde her iki işlemde de 5 kalanını veriyor. En küçük N kaçtır?",
        },
        options: [
          {
            tr: "149",
          },
          {
            tr: "173",
          },
          {
            tr: "157",
          },
          {
            tr: "161",
          },
          {
            tr: "197",
          },
        ],
        answer: 1,
        hint: {
          tr: "N−5 hem 8’in hem 12’nin katıdır; sonra alt sınırı uygula.",
        },
        explanation: {
          tr: "N=EKOK(8,12)·k+5=24 k+5. 150’den büyük olması için 24 k>145; en küçük tam k=7 verir ve N=173 olur. k=6 için 149 alt sınırı sağlamaz. Kontrol 173=8·21+5=12·14+5; 5 iki bölenden de küçüktür.",
        },
        skill: "foundation-ebob-ekok-7",
      },
      {
        id: "f013-foundation-ebob-ekok-8",
        prompt: {
          tr: "a ve b aralarında asal pozitif tam sayılardır. EBOB(a, b)+EKOK(a, b)=211 ise a·b kaçtır?",
        },
        options: [
          {
            tr: "1",
          },
          {
            tr: "105",
          },
          {
            tr: "210",
          },
          {
            tr: "211",
          },
          {
            tr: "422",
          },
        ],
        answer: 2,
        hint: {
          tr: "Aralarında asal olduğunda EBOB 1’dir.",
        },
        explanation: {
          tr: "EBOB=1 olduğundan EKOK=211−1=210. İki pozitif sayı için a·b=EBOB·EKOK=1·210=210 olur. Örneğin 14 ve 15 koşulları sağlar; aralarında asal olmak iki sayının da asal olmasını gerektirmez.",
        },
        skill: "foundation-ebob-ekok-8",
      },
      {
        id: "f013-foundation-ebob-ekok-9",
        prompt: {
          tr: "36 cm×48 cm×60 cm dikdörtgenler prizması, kenarlara paralel eş küplere artıksız ayrılıyor. Kesim kaybı yok; küp kenarları santimetre cinsinden pozitif tam sayı. Küp kenarı en büyük seçilirse kaç küp oluşur?",
        },
        options: [
          {
            tr: "12",
          },
          {
            tr: "24",
          },
          {
            tr: "48",
          },
          {
            tr: "60",
          },
          {
            tr: "120",
          },
        ],
        answer: 3,
        hint: {
          tr: "Küp kenarı üç uzunluğun da ortak böleni olmalı.",
        },
        explanation: {
          tr: "EBOB(36,48,60)=12 cm en büyük küp kenarıdır. Üç yönde 3,4,5 küp sığar; toplam 3·4·5=60 küp oluşur. 12 uzunluk, 60 adettir. Hacim kontrolü 36·48·60/12³=60 sonucunu verir.",
        },
        skill: "foundation-ebob-ekok-9",
      },
      {
        id: "f013-foundation-ebob-ekok-10",
        prompt: {
          tr: "a=2, b=4, c=8 için EBOB(a, b, c)·EKOK(a, b, c) kaçtır?",
        },
        options: [
          {
            tr: "2",
          },
          {
            tr: "8",
          },
          {
            tr: "32",
          },
          {
            tr: "64",
          },
          {
            tr: "16",
          },
        ],
        answer: 4,
        hint: {
          tr: "Üç sayının ortak bölenini ve ortak katını ayrı bul; iki sayılı çarpım kuralını genelleme.",
        },
        explanation: {
          tr: "Üç sayının EBOB’u 2, EKOK’u 8’dir; çarpımları 16 olur. a·b·c=64’tür ve bu sonuç 16’ya eşit değildir. EBOB·EKOK=a·b özelliği iki pozitif sayı içindir; üçüncü sayıyı aynı eşitliğe eklemek geçerli değildir.",
        },
        skill: "foundation-ebob-ekok-10",
      },
    ],
  },
  {
    lessonId: "tarih-zaman",
    topicId: "detail-226",
    subjectId: "tyt-tarih",
    lessonTitle: "Tarih ve zaman: kanıtı sıraya koy",
    questions: [
      {
        id: "f013-foundation-tarih-zaman-1",
        prompt: {
          tr: "İkinci ekibin çalışmasını doğrudan tarih araştırması yapan özellik hangisidir?",
        },
        options: [
          {
            tr: "Doğa olayının insan toplulukları üzerindeki etkisini kaynaklarla incelemesi.",
          },
          {
            tr: "Deprem dalgalarının hızını laboratuvarda yeniden üretmesi.",
          },
          {
            tr: "Sadece yer kabuğundaki fiziksel değişimi ölçmesi.",
          },
          {
            tr: "Geçmişteki her doğa olayını insan etkisinden bağımsız ele alması.",
          },
          {
            tr: "Yalnız olayın gelecekte yinelenme olasılığını hesaplaması.",
          },
        ],
        answer: 0,
        hint: {
          tr: "Araştırmanın merkezinde dalga mı, insanların kararları mı var?",
        },
        explanation: {
          tr: "Tarihsel incelemenin odağı insanların yer, zaman ve koşullar içindeki faaliyetleridir. Göç ve yönetim kararları bu alana girer. Depremin fiziksel mekanizmasını incelemek ise doğa bilimlerinin doğrudan araştırma konusudur; iki çalışma birbirinden yararlanabilir.",
        },
        skill: "tarih-zaman",
        passage: {
          tr: "Bir araştırma ekibi bir depremin dalga hızını ölçüyor. Başka bir ekip aynı depremden sonra kasabanın boşalmasını, vergi kayıtlarını ve yeniden yerleşme kararlarını inceliyor.",
        },
      },
      {
        id: "f013-foundation-tarih-zaman-2",
        prompt: {
          tr: "Bu araştırma sorusuna göre kaynakların konumu hangi seçenekte doğru verilmiştir?",
        },
        options: [
          {
            tr: "Her ikisi de aynı zamanda yazıldığı için doğrudan tanıklıktır.",
          },
          {
            tr: "2024 kitabı daha yeni olduğu için tek birinci el kaynaktır.",
          },
          {
            tr: "İşçi defteri doğrudan tanıklık; 2024 kitabı sonraki araştırma ve yorumdur.",
          },
          {
            tr: "Defter el yazısı olduğu için kaynak kabul edilemez.",
          },
          {
            tr: "Kitap, eski belgeyi yorumladığı için hiçbir kanıt değeri taşımaz.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Belgenin biçimiyle, araştırılan olaya uzaklığını birbirine karıştırma.",
        },
        explanation: {
          tr: "Greve katılanın olay sırasındaki kaydı birinci el tanıklık niteliğindedir. Daha sonra karşılaştırma yapan kitap bu soru için ikinci el araştırmadır. Bu ayrım otomatik doğruluk sıralaması değildir; defterin amacı ve anlatımının güvenilirliği de incelenir.",
        },
        skill: "tarih-zaman",
        passage: {
          tr: "Bir öğrenci, 1910 yılındaki bir grevi araştırıyor. Greve katılmış bir işçinin o günlerde tuttuğu defterle, defteri başka belgelerle karşılaştıran 2024 tarihli bir araştırma kitabını kullanıyor.",
        },
      },
      {
        id: "f013-foundation-tarih-zaman-3",
        prompt: {
          tr: "Birinci el raporla çalışan tarihçi için en uygun işlem hangisidir?",
        },
        options: [
          {
            tr: "Rapor birinci el olduğu için öteki kayıtları geçersiz saymak.",
          },
          {
            tr: "Çelişki bulunduğunda bütün geçmişin araştırılamayacağını kabul etmek.",
          },
          {
            tr: "Sonradan bulunan her kaydı tarihine bakmadan üstün kabul etmek.",
          },
          {
            tr: "Zafer gerçekleştiği için rapordaki bütün sayıları doğru saymak.",
          },
          {
            tr: "Raporun amacını ve anlatımını bağımsız kayıtlarla karşılaştırmak.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Tanıklığın doğrudan olması, yanılma veya yüceltme ihtimalini ortadan kaldırır mı?",
        },
        explanation: {
          tr: "Rapordaki iddia, aynı dönemin bağımsız kayıtlarıyla sınanabilir. Yazarın kendini veya ordusunu yüceltme amacı araştırılır. Birinci el olmak kaynağın konumunu gösterir; içeriğinin her ayrıntısının doğru olduğunu tek başına garanti etmez.",
        },
        skill: "tarih-zaman",
        passage: {
          tr: "Bir komutan, zaferini anlattığı raporda ordusunun hiç kayıp vermediğini yazıyor. Aynı günlere ait bağımsız hastane ve defin kayıtları ise kayıplar gösteriyor.",
        },
      },
      {
        id: "f013-foundation-tarih-zaman-4",
        prompt: {
          tr: "Bu incelemenin öncelikli amacı hangisidir?",
        },
        options: [
          {
            tr: "Yazarın olayları hangi siyasi amaçla anlattığını çözümlemek.",
          },
          {
            tr: "Belgenin kökenini ve özgünlüğünü sınayan dış tenkit yapmak.",
          },
          {
            tr: "Olayları daha geniş bir tarih anlatısında birleştirmek.",
          },
          {
            tr: "Belgenin anlattığı savaşın kesin nedenini tek başına belirlemek.",
          },
          {
            tr: "Bir nüfusun uzun dönemli kentleşme hızını hesaplamak.",
          },
        ],
        answer: 1,
        hint: {
          tr: "İncelenen şey belgenin maddi kimliği mi, anlattığı iddianın yorumu mu?",
        },
        explanation: {
          tr: "Malzeme, imza, tarih ve yazı biçimi belgenin kökenine ilişkin dış tenkit verileridir. Yazarın taraflılığı ve söylediklerinin başka kanıtlarla uyumu ise iç tenkitte öne çıkar. İki işlem birbirini desteklese de burada hedef açıkça özgünlüktür.",
        },
        skill: "tarih-zaman",
        passage: {
          tr: "Bir uzman, bir fermanın kâğıdını, mürekkebini, imzasını ve yazı biçimini inceleyerek belgenin iddia edilen döneme ait olup olmadığını araştırıyor.",
        },
      },
      {
        id: "f013-foundation-tarih-zaman-5",
        prompt: {
          tr: "Sikkelerin basımı ve dolaşımını konu alan ana çalışma hangi yardımcı bilimle en doğrudan ilişkilidir?",
        },
        options: [
          {
            tr: "Kronoloji.",
          },
          {
            tr: "Heraldik.",
          },
          {
            tr: "Etnografya.",
          },
          {
            tr: "Nümizmatik.",
          },
          {
            tr: "Paleografya.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Aynı nesneye birden çok alan yardım edebilir; sorulan ana işleme odaklan.",
        },
        explanation: {
          tr: "Nümizmatik paraları ve sikkeleri basım, kimlik ve dolaşım gibi yönleriyle inceler. Paleografya burada harfleri okumaya destek olabilir; fakat sorunun açıkça sorduğu para basımı ve dolaşımının ana alanı değildir. Nesne ile yapılan işi birlikte oku.",
        },
        skill: "tarih-zaman",
        passage: {
          tr: "Araştırmacı, bir sikke grubunun hangi hükümdar adına basıldığını ve hangi pazarlarda dolaştığını inceliyor. Eski harflerin okunmasında başka bir uzmandan yardım alıyor.",
        },
      },
      {
        id: "f013-foundation-tarih-zaman-6",
        prompt: {
          tr: "Bu iki gelişme hangi seçenekte uygun biçimde ayrılmıştır?",
        },
        options: [
          {
            tr: "İkisi de yalnız tek bir günü anlattığı için olaydır.",
          },
          {
            tr: "Belirli günkü antlaşma olay; uzun süreli şehirleşme olgudur.",
          },
          {
            tr: "Antlaşma olgu; uzun süreli şehirleşme olaydır.",
          },
          {
            tr: "Yazılı belge içeren her gelişme olgudur.",
          },
          {
            tr: "Yer bilgisi bulunan her gelişme olay, bulunmayan her gelişme olgudur.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Somut gelişme ile çok sayıda gelişmenin oluşturduğu süreci ayır.",
        },
        explanation: {
          tr: "Olayın yer ve zamanı daha belirgin bir somut gelişmesi vardır. Şehirleşme ise çok sayıda olayla oluşan uzun süreli değişimi anlatır. Bir olgunun da yeri ve zamanı araştırılabilir; ayrımı yalnız belgenin yazılılığı veya yer adının bulunması belirlemez.",
        },
        skill: "tarih-zaman",
        passage: {
          tr: "Bir antlaşmanın 16 Mayıs günü imzalanması ile bir bölgede birkaç yüzyıla yayılan şehirleşme, iki farklı tarihsel inceleme örneğidir.",
        },
      },
      {
        id: "f013-foundation-tarih-zaman-7",
        prompt: {
          tr: "Eskiden yeniye doğru sıralama hangisidir?",
        },
        options: [
          {
            tr: "MS 60 → MÖ 210 → MÖ 480.",
          },
          {
            tr: "MÖ 210 → MÖ 480 → MS 60.",
          },
          {
            tr: "MÖ 480 → MS 60 → MÖ 210.",
          },
          {
            tr: "MÖ 210 → MS 60 → MÖ 480.",
          },
          {
            tr: "MÖ 480 → MÖ 210 → MS 60.",
          },
        ],
        answer: 4,
        hint: {
          tr: "MÖ bölümünde büyük numara daha eski bir yılı gösterir.",
        },
        explanation: {
          tr: "MÖ yıllarda zaman ilerledikçe yıl numarası küçülür; bu nedenle MÖ 480, MÖ 210’dan eskidir. Her iki MÖ yıl da MS 60’tan öncedir. Yıl sayılarını tek başına küçükten büyüğe dizmek iki farklı tarafı karıştırır.",
        },
        skill: "tarih-zaman",
        passage: {
          tr: "Aynı tarih şeridinde MÖ 480, MÖ 210 ve MS 60 yılları gösterilecektir. MÖ, milattan önceyi; MS, milattan sonrayı ifade eder.",
        },
      },
      {
        id: "f013-foundation-tarih-zaman-8",
        prompt: {
          tr: "MS 1900 ve MS 1901 hangi yüzyıllardadır?",
        },
        options: [
          {
            tr: "1900: 18. yüzyıl; 1901: 19. yüzyıl.",
          },
          {
            tr: "İkisi de 19. yüzyıldadır.",
          },
          {
            tr: "1900: 19. yüzyıl; 1901: 20. yüzyıl.",
          },
          {
            tr: "İkisi de 20. yüzyıldadır.",
          },
          {
            tr: "1900: 20. yüzyıl; 1901: 21. yüzyıl.",
          },
        ],
        answer: 2,
        hint: {
          tr: "1801–1900 ile 1901–2000 aralıklarını yaz.",
        },
        explanation: {
          tr: "Tam yüzlü yıl önceki yüz yıllık bloğun sonudur. 1900, 1801–1900 aralığında; 1901 ise 1901–2000 aralığındadır. Son iki basamağı atıp koşulsuz bir eklemek, 1900 gibi sınır yıllarında hata üretir.",
        },
        skill: "tarih-zaman",
        passage: {
          tr: "Geleneksel tarihlemede MS 1–100 birinci, MS 101–200 ikinci yüzyıldır. Yüzyıl aralıkları bu düzenle sürer.",
        },
      },
      {
        id: "f013-foundation-tarih-zaman-9",
        prompt: {
          tr: "Kaç yıllık zaman aralığı geçmiştir?",
        },
        options: [
          {
            tr: "4 yıl.",
          },
          {
            tr: "2 yıl.",
          },
          {
            tr: "3 yıl.",
          },
          {
            tr: "5 yıl.",
          },
          {
            tr: "6 yıl.",
          },
        ],
        answer: 0,
        hint: {
          tr: "Yıl etiketlerini saymak yerine aralarındaki bir yıllık adımları say.",
        },
        explanation: {
          tr: "Başlangıçlar MÖ 2 → MÖ 1 → MS 1 → MS 2 → MS 3 biçiminde ilerler. Dört bir yıllık aralık vardır. 2+3 toplamından olmayan yıl 0 için bir çıkarmak gerekir. Beş etiket bulunması, beş yıl geçtiği anlamına gelmez.",
        },
        skill: "tarih-zaman",
        passage: {
          tr: "Bu soruda geleneksel MÖ–MS numaralandırması kullanılıyor ve yıl 0 bulunmuyor. MÖ 2 yılının başlangıcından MS 3 yılının başlangıcına kadar geçen süre isteniyor.",
        },
      },
      {
        id: "f013-foundation-tarih-zaman-10",
        prompt: {
          tr: "Bu üç bilgi hangi ayrımı gösterir?",
        },
        options: [
          {
            tr: "Güneş esaslı bütün takvimlerin aynı olayı başlangıç aldığı anlaşılır.",
          },
          {
            tr: "1 Ocak, bütün takvimlerde milat sözcüğünün tanımıdır.",
          },
          {
            tr: "Bir takvim Güneş esaslıysa tarihsel başlangıç olayı bulunamaz.",
          },
          {
            tr: "Takvimin gök hareketi esası, yıl başlangıcı ve dönem başlangıcı farklı özelliklerdir.",
          },
          {
            tr: "Yılın başladığı gün, tek başına takvimin Ay esaslı olduğunu belirler.",
          },
        ],
        answer: 3,
        hint: {
          tr: "“Neye göre yıl?” ile “hangi gün başlar?” aynı soru değildir.",
        },
        explanation: {
          tr: "Yılın astronomik esası, yıl içindeki başlangıç günü ve yılların sayıldığı dönem başlangıcı ayrı ölçütlerdir. 1 Ocak bilgisinden miladın anlamı türetilemez. Benzer biçimde başlangıcı hicretle ilişkili iki takvim mutlaka aynı gök hareketini esas almaz.",
        },
        skill: "tarih-zaman",
        passage: {
          tr: "Bir takvim için “Güneş esaslıdır”, “yılı 1 Ocak’ta başlar” ve “dönem numaralandırması İsa’nın doğumu esasına dayanır” bilgileri ayrı ayrı veriliyor.",
        },
      },
    ],
  },
  {
    lessonId: "insanligin-ilk-donemleri",
    topicId: "detail-227",
    subjectId: "tyt-tarih",
    lessonTitle: "İnsanlığın ilk dönemleri: yerleşimden yazıya",
    questions: [
      {
        id: "f013-foundation-insanligin-ilk-donemleri-1",
        prompt: {
          tr: "Bu bulguların doğrudan desteklediği en sınırlı yorum hangisidir?",
        },
        options: [
          {
            tr: "Bitkisel besinlerin işlenmiş olabileceği.",
          },
          {
            tr: "Topluluğun kesinlikle sulamalı tarım yaptığı.",
          },
          {
            tr: "Halkın tamamının sürekli aynı yerde yaşadığı.",
          },
          {
            tr: "Ürün dağıtımını merkezi bir devletin yönettiği.",
          },
          {
            tr: "Tahılın bütün bölgeye para karşılığı satıldığı.",
          },
        ],
        answer: 0,
        hint: {
          tr: "Yabani tahıl da öğütülebilir; bir sonraki iddia için ek kanıt ara.",
        },
        explanation: {
          tr: "Öğütme taşı ile bitki kalıntıları bitkisel besin işleme yorumunu destekler. Yabani ürünler de işlenebildiğinden tarım, sürekli yerleşim veya devlet örgütü otomatik olarak kanıtlanmaz. Her daha geniş iddia için bağımsız bulgular gerekir.",
        },
        skill: "insanligin-ilk-donemleri",
        passage: {
          tr: "Bir kazıda yabani tahıl kalıntılarıyla birlikte bir öğütme taşı bulunuyor. Henüz ekili tarla, evcilleşmiş bitki veya üretim artığına ilişkin başka veri bulunmamıştır.",
        },
      },
      {
        id: "f013-foundation-insanligin-ilk-donemleri-2",
        prompt: {
          tr: "Yalnız bu bilgiyle hangi sonuç çıkarılabilir?",
        },
        options: [
          {
            tr: "A ile B arasında tam olarak yüz yıl geçtiği.",
          },
          {
            tr: "C’de yaşayanların A’dakilerden daha varlıklı olduğu.",
          },
          {
            tr: "A tabakasının oluşumu, B ve C’den görece daha eskidir.",
          },
          {
            tr: "A’nın kesin bir miladi yılının hesaplanabildiği.",
          },
          {
            tr: "B’deki her nesnenin yapım yerinin bilindiği.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Katman sırası göreli zaman verir; takvim yılı veya eşit süre vermez.",
        },
        explanation: {
          tr: "Bozulmamış birikimde alttaki tabaka genellikle üsttekinden daha eskidir. Verilen koşullar bu göreli sıralamayı kullanmaya izin verir. Derinlikten kesin yıl, her tabaka için eşit süre veya insanların refah düzeyi çıkarılamaz.",
        },
        skill: "insanligin-ilk-donemleri",
        passage: {
          tr: "Bir höyüğün üç tabakasının sonradan karışmadığı ve hiçbir çukurla kesilmediği belirlenmiştir. Aynı yerleşim birikiminde A en altta, B ortada, C en üsttedir.",
        },
      },
      {
        id: "f013-foundation-insanligin-ilk-donemleri-3",
        prompt: {
          tr: "İki bulgu birlikte en çok hangi ilişkiyi destekler?",
        },
        options: [
          {
            tr: "Depolanan ürünün toplumdaki herkese eşit dağıtıldığını.",
          },
          {
            tr: "Her çömlekçinin aynı zamanda hükümdar olduğunu.",
          },
          {
            tr: "İş bölümünün yazıdan sonra bir anda başladığını.",
          },
          {
            tr: "Depo bulunan her yerde zorunlu olarak imparatorluk kurulduğunu.",
          },
          {
            tr: "Ürün fazlasının tarım dışı uzmanlaşmayı destekleyebilmesi.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Besin üreten herkesin aynı işi yapmak zorunda olmaması neyi kolaylaştırır?",
        },
        explanation: {
          tr: "Depolanabilen fazla, bazı kişilerin zanaatta daha sürekli çalışmasını mümkün kılabilir. Çömlek işliği bu uzmanlaşmaya ayrı kanıt sağlar. Fakat depo ve işlikten eşit dağıtım veya belirli bir devlet biçimi sonucu çıkarmak kapsamı aşar.",
        },
        skill: "insanligin-ilk-donemleri",
        passage: {
          tr: "Bir yerleşimde yıllık tüketim ve tohum ihtiyacının üzerinde tahıl depolanabiliyor. Bazı kişilerin sürekli çömlek yapımında çalıştığına ilişkin işlik kalıntıları da bulunuyor.",
        },
      },
      {
        id: "f013-foundation-insanligin-ilk-donemleri-4",
        prompt: {
          tr: "Bu karşılaştırma hangi yorumu destekler?",
        },
        options: [
          {
            tr: "Bütün toplumların aynı tarihte aynı teknolojiyi benimsediğini.",
          },
          {
            tr: "Tarih öncesi ve tarihî dönemlerin başlangıçları bölgelere göre değişebilir.",
          },
          {
            tr: "Taş alet kullanan toplumların kültürünün bulunmadığını.",
          },
          {
            tr: "Yazı kullanan toplumlarda sözlü anlatının tamamen bittiğini.",
          },
          {
            tr: "Maden kullanımının görüldüğü her yerde bütün taş aletlerin yok olduğunu.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Aynı takvim yılı, aynı kültürel ve teknik aşama anlamına gelir mi?",
        },
        explanation: {
          tr: "Yazı ve araç teknolojileri bütün coğrafyalarda eş zamanlı gelişmez. Bu nedenle yerel kanıtla dönemlendirme yapılır. Taş alet kullanımı kültür yokluğu değildir; yeni bir teknoloji de öncekinin bütün kullanımlarını aynı anda sona erdirmez.",
        },
        skill: "insanligin-ilk-donemleri",
        passage: {
          tr: "A bölgesinde metal aletler ve yazılı kayıtlar kullanılırken aynı dönemde B bölgesinde taş aletler ve sözlü aktarım ağırlıktadır.",
        },
      },
      {
        id: "f013-foundation-insanligin-ilk-donemleri-5",
        prompt: {
          tr: "Bu bulgunun getirdiği en uygun sonuç hangisidir?",
        },
        options: [
          {
            tr: "Bütün dünyada önce aynı inancın ortaya çıktığının kanıtlandığı.",
          },
          {
            tr: "Göbeklitepe’de yaşamın her ayrıntısının artık kesin bilindiği.",
          },
          {
            tr: "Tarım ile ortak çalışma arasında hiçbir ilişki bulunamayacağı.",
          },
          {
            tr: "Toplumsal değişim için her yerde zorunlu tek bir sıra kabul edilmemelidir.",
          },
          {
            tr: "Bütün erken yerleşimlerde aynı tarihlerde aynı yapıların yapıldığı.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Bir zorunlu sırayı sınırlamak, bütün yeni sıraları kanıtlamak değildir.",
        },
        explanation: {
          tr: "Bulgu, “her yerde mutlaka önce tarım devleti” iddiasına karşı örnek oluşturabilir. Buradan bütün insanlığın ters sırayı izlediği veya alanın bütün işlevlerinin kesinleştiği çıkmaz. Arkeolojik yorumun kanıt ve belirsizlik sınırı korunmalıdır.",
        },
        skill: "insanligin-ilk-donemleri",
        passage: {
          tr: "Göbeklitepe’de erken anıtsal ve ortak kullanımlı yapılar bulunması, bütün toplumlarda ancak tam gelişmiş tarım devletlerinden sonra büyük ortak yapılar yapılabileceği görüşünü tartışmaya açmıştır.",
        },
      },
      {
        id: "f013-foundation-insanligin-ilk-donemleri-6",
        prompt: {
          tr: "Bu kayıtların işlevi için hangi açıklama en uygundur?",
        },
        options: [
          {
            tr: "Yazının yalnız şiir yazmak için kullanıldığını göstermesi.",
          },
          {
            tr: "Ekonomik ve idari bilgiyi kişisel hafızanın dışında izlemeyi kolaylaştırması.",
          },
          {
            tr: "Kayıt yapılan toplumda hiçbir anlaşmazlık kalmadığını göstermesi.",
          },
          {
            tr: "Her ürünün herkese aynı miktarda dağıtıldığını kesinleştirmesi.",
          },
          {
            tr: "Bütün komşu toplumların aynı gün yazıya geçtiğini göstermesi.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Tabletlerin kaydettiği somut işler hangi ihtiyaca yanıt veriyor?",
        },
        explanation: {
          tr: "Miktar ve borç kayıtları, hesapların daha uzun süre saklanmasını ve denetlenmesini kolaylaştırır. Yazı burada ekonomik-idari ihtiyaçlarla bağlantılıdır. Kaydın bulunması işlemin adil olduğunu veya toplumdaki bütün sorunların çözüldüğünü tek başına kanıtlamaz.",
        },
        skill: "insanligin-ilk-donemleri",
        passage: {
          tr: "Bir Sümer yerleşiminde teslim edilen tahıl miktarını, borcu ve ürün paylarını kaydeden tabletler bulunuyor.",
        },
      },
      {
        id: "f013-foundation-insanligin-ilk-donemleri-7",
        prompt: {
          tr: "Bu örnek ticaretin hangi ek etkisine kanıt sağlar?",
        },
        options: [
          {
            tr: "Ticaretin başlaması için her zaman madeni para gerektiğine.",
          },
          {
            tr: "Tabletlerin bulunduğu her kentin Asurların başkenti olduğuna.",
          },
          {
            tr: "Anadolu halklarının o tarihte aynı anda tek dile geçtiğine.",
          },
          {
            tr: "Bütün ticari anlaşmaların sözlü yapıldığına.",
          },
          {
            tr: "Yazı ve kayıt uygulamalarının toplumlar arasında taşınabilmesine.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Mal dolaşımının yanında hangi bilgi ve teknik dolaşıyor?",
        },
        explanation: {
          tr: "Tüccarların hesap tutma ve sözleşme uygulamaları kültürel aktarımın da aracıdır. Çivi yazılı ticari belgeler, mal ile kayıt tekniğinin bağlantısını gösterir. Ancak bu, herkesin tek dili benimsediği veya tablet bulunan her yerin başkent olduğu anlamına gelmez.",
        },
        skill: "insanligin-ilk-donemleri",
        passage: {
          tr: "Anadolu’daki bir Asur ticaret yerleşiminde ürün teslimi ve borçla ilgili çivi yazılı tabletler ele geçiyor. Tabletler farklı bölgelerden gelen tüccarların ilişkilerini de gösteriyor.",
        },
      },
      {
        id: "f013-foundation-insanligin-ilk-donemleri-8",
        prompt: {
          tr: "Kart hangi Anadolu uygarlığıyla ilişkilendirilmelidir?",
        },
        options: [
          {
            tr: "Urartular.",
          },
          {
            tr: "Lidyalılar.",
          },
          {
            tr: "Hititler.",
          },
          {
            tr: "Frigler.",
          },
          {
            tr: "İyonlar.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Tek bir genel özellik yerine merkez ve kurum kümesini eşleştir.",
        },
        explanation: {
          tr: "Hattuşa, anallar ve Pankuş birlikte Hitit bağlamını verir. Urartular Tuşpa ve su yapılarıyla, Lidyalılar Sardes ve para kullanımıyla ayırt edilir. Pankuş’un varlığı ise modern anlamda bütün halkın eşit oyla yönetime katıldığını göstermez.",
        },
        skill: "insanligin-ilk-donemleri",
        passage: {
          tr: "Bir müze kartında Hattuşa, krallık yıllıkları olan anallar ve Pankuş meclisi birlikte anılıyor.",
        },
      },
      {
        id: "f013-foundation-insanligin-ilk-donemleri-9",
        prompt: {
          tr: "K ve L hangi eşleştirmeyle doğru tamamlanır?",
        },
        options: [
          {
            tr: "K: Urartular; L: Lidyalılar.",
          },
          {
            tr: "K: Lidyalılar; L: Urartular.",
          },
          {
            tr: "K: İyonlar; L: Hititler.",
          },
          {
            tr: "K: Sümerler; L: Frigler.",
          },
          {
            tr: "K: Frigler; L: Asurlar.",
          },
        ],
        answer: 0,
        hint: {
          tr: "Tuşpa ile Sardes’i ayrı siyasi merkezler olarak düşün.",
        },
        explanation: {
          tr: "Tuşpa ve gelişmiş su yapıları Urartu, Sardes ve sikke-ticaret ilişkisi Lidya bağlamındadır. Bir toplumla güçlü bağ kuran özellik, o faaliyetin yalnız o toplumda bulunduğu anlamına gelmez. Bu soruda belirleyici olan özelliklerin merkezlerle birlikte verilmesidir.",
        },
        skill: "insanligin-ilk-donemleri",
        passage: {
          tr: "K kartında Tuşpa çevresindeki su kanalları ve madencilik, L kartında Sardes çevresindeki para kullanımı ve ticaret anlatılıyor.",
        },
      },
      {
        id: "f013-foundation-insanligin-ilk-donemleri-10",
        prompt: {
          tr: "Bu metin için hangi sonuç doğrudan desteklenir?",
        },
        options: [
          {
            tr: "Yazılı hukukta toplumsal statünün hiçbir etkisinin olmadığı.",
          },
          {
            tr: "Bütün cezaların yalnız para ödemesinden oluştuğu.",
          },
          {
            tr: "Derlemenin bulunmasının her hükmün her olayda aynı uygulandığını kanıtladığı.",
          },
          {
            tr: "Kuralların yazılı olması, herkesin aynı hukuki konumda olduğunu göstermez.",
          },
          {
            tr: "Toplumda hiçbir yönetim veya yaptırımın bulunmadığı.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Kayıt biçimi ile hakkın kimler için nasıl uygulandığını ayır.",
        },
        explanation: {
          tr: "Metin açıkça aynı eylem için statüye bağlı farklı ceza öngörüyor. Dolayısıyla yazılılık ile hukuki eşitlik aynı özellik değildir. Ayrıca bir kuralın metinde yer alması, günlük hayattaki bütün uygulamalarını tek başına göstermeye yetmez.",
        },
        skill: "insanligin-ilk-donemleri",
        passage: {
          tr: "Bir eski hukuk derlemesinde aynı yaralama eylemi için mağdurun toplumsal statüsüne göre farklı cezalar yazılıdır.",
        },
      },
    ],
  },
  {
    lessonId: "ortacag-dunya",
    topicId: "detail-228",
    subjectId: "tyt-tarih",
    lessonTitle: "Orta Çağ’da dünya: toprak, ticaret ve güç",
    questions: [
      {
        id: "f013-foundation-ortacag-dunya-1",
        prompt: {
          tr: "Bu ilişki en uygun nasıl tanımlanır?",
        },
        options: [
          {
            tr: "Karşılıklı yükümlülükler içeren feodal bağlılık ilişkisi.",
          },
          {
            tr: "Bütün yurttaşların eşit oy verdiği seçim sistemi.",
          },
          {
            tr: "Bütün toprağın merkez memurlarınca doğrudan işletilmesi.",
          },
          {
            tr: "Sadece para ile yapılan, siyasi bağ içermeyen alışveriş.",
          },
          {
            tr: "Toprakla ilişkisi bulunmayan bağımsız göç örgütü.",
          },
        ],
        answer: 0,
        hint: {
          tr: "Koruma, gelir ve askerî hizmetin nasıl birbirine bağlandığını izle.",
        },
        explanation: {
          tr: "Toprak veya gelir hakkı ile korumanın sadakat ve askerî hizmetle bağlanması feodal ilişkinin örneğidir. Bu, eşit yurttaşlık düzeni veya doğrudan merkez yönetimi değildir. Tarafların hak ve yükümlülükleri bölge ve döneme göre ayrıca incelenir.",
        },
        skill: "ortacag-dunya",
        passage: {
          tr: "Bir Avrupa bölgesinde yerel senyör koruma ve gelir hakkı sağlıyor; ona bağlı soylu savaşçı da sadakat ve askerî hizmet sözü veriyor.",
        },
      },
      {
        id: "f013-foundation-ortacag-dunya-2",
        prompt: {
          tr: "Bu örnek hangi yorumu destekler?",
        },
        options: [
          {
            tr: "Bütün yerel beylerin aynı anda krallığı ortadan kaldırdığını.",
          },
          {
            tr: "Krallıkta hiçbir askerî kuvvet bulunmadığını.",
          },
          {
            tr: "Kralın varlığı, tek başına güçlü merkezî denetim kanıtı değildir.",
          },
          {
            tr: "Her bölgenin bütün zamanlarda aynı yetkiye sahip olduğunu.",
          },
          {
            tr: "Vergi toplanmasının yalnız merkezi memurlarca yapılabildiğini.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Unvanı değil, geliri ve askerî kararı fiilen kimin denetlediğini sor.",
        },
        explanation: {
          tr: "Yerel beylerin mali ve askerî hareket alanı, merkezî gücün sınırlı olabileceğini gösterir. Sadece kral unvanının bulunmasından bütün ülkenin doğrudan denetlendiği çıkarılamaz. Bununla birlikte örnek, krallığın tamamen yok olduğunu da söylemez.",
        },
        skill: "ortacag-dunya",
        passage: {
          tr: "Bir krallıkta hükümdar vardır; fakat yerel beyler gelirleri toplamakta ve sefere katılma şartları için kralla pazarlık yapmaktadır.",
        },
      },
      {
        id: "f013-foundation-ortacag-dunya-3",
        prompt: {
          tr: "Bu iki grup için hangi açıklama doğrudur?",
        },
        options: [
          {
            tr: "Her vassalın tarım yapan serf olduğu.",
          },
          {
            tr: "Her köylünün hükümdarla aynı hukuki yetkiye sahip olduğu.",
          },
          {
            tr: "Serf sözcüğünün her dönemde modern ücretli asker anlamına geldiği.",
          },
          {
            tr: "Askerî hizmetin toprak geliriyle ilişkilendirilemeyeceği.",
          },
          {
            tr: "Serf köylü ile soylu vassalın görev ve statüleri aynı değildir.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Toprakta üretim yükümlülüğü ile soylunun askerî bağlılığını ayır.",
        },
        explanation: {
          tr: "Serf, belirli yükümlülüklerle toprağa ve senyöre bağlı köylü bağlamındadır. Soylu vassalın bağlılığı ise başka hak ve hizmet ilişkileri içerir. Grupları tek ad altında toplamak, toplumsal tabakalaşmanın temel farklarını siler.",
        },
        skill: "ortacag-dunya",
        passage: {
          tr: "Bir malikânede toprağa bağlı köylüler ürün ve çalışma yükümlülükleri taşır. Aynı toplumda senyöre askerî hizmet veren soylu vassallar da vardır.",
        },
      },
      {
        id: "f013-foundation-ortacag-dunya-4",
        prompt: {
          tr: "İki yükümlülük sırasıyla hangi türdedir?",
        },
        options: [
          {
            tr: "Nakdî vergi ve ayni vergi.",
          },
          {
            tr: "Ayni vergi ve emek yükümlülüğü.",
          },
          {
            tr: "Emek yükümlülüğü ve nakdî vergi.",
          },
          {
            tr: "İkisi de yalnız nakdî vergidir.",
          },
          {
            tr: "İkisi de karşılıksız asker maaşıdır.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Ödeme ürünle mi, parayla mı, çalışmayla mı yapılıyor?",
        },
        explanation: {
          tr: "Tahıl gibi ürünle yapılan ödeme ayni vergidir. Belirli bir işte çalışma zorunluluğu emek yükümlülüğüdür. Nakdî vergi ise para ile ödenir; toplumda para kullanılması, her yükümlülüğün nakdî olduğunu göstermez.",
        },
        skill: "ortacag-dunya",
        passage: {
          tr: "Bir yönetici vergiyi para yerine tahıl olarak toplatıyor. Ayrıca bazı köylüler yılın belirli günlerinde yol yapımında çalışmakla yükümlüdür.",
        },
      },
      {
        id: "f013-foundation-ortacag-dunya-5",
        prompt: {
          tr: "İpek Yolu için bu betimlemeden hangi sonuç çıkarılır?",
        },
        options: [
          {
            tr: "Bütün çağlar boyunca tek devletin yönettiği sabit bir çizgi olduğu.",
          },
          {
            tr: "Üzerinde yalnız ipek taşındığı.",
          },
          {
            tr: "Bütün bağlantılarının yalnız denizden geçtiği.",
          },
          {
            tr: "Değişen bağlantılardan oluşan bir ticaret ağı olarak ele alınmalıdır.",
          },
          {
            tr: "Yolun hiçbir siyasi veya kültürel etkisinin bulunmadığı.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Birden çok kol ve değişen güvenlik, tek değişmez yol fikriyle uyuşur mu?",
        },
        explanation: {
          tr: "Verilen farklı kollar ve dönemsel değişim, İpek Yolu’nun ağ niteliğini gösterir. Ticaret, siyasi denetim ve kültürel karşılaşmalar bu ağ üzerinden birlikte gelişebilir. Tek ürün, tek güzergâh ve sürekli tek egemenlik iddiaları veriden çıkmaz.",
        },
        skill: "ortacag-dunya",
        passage: {
          tr: "Bir yolun farklı kolları Çin, Orta Asya, İran, Anadolu ve Akdeniz merkezlerini bağlamaktadır. Kolların güvenlik koşullarına göre zamanla değiştiği bilinmektedir.",
        },
      },
      {
        id: "f013-foundation-ortacag-dunya-6",
        prompt: {
          tr: "Bu coğrafya ve ürün grubu hangi ticaret ağıyla en doğrudan ilişkilidir?",
        },
        options: [
          {
            tr: "Baharat Yolu.",
          },
          {
            tr: "Kürk Yolu.",
          },
          {
            tr: "Kral Yolu.",
          },
          {
            tr: "Sadece Nil iç ulaşımı.",
          },
          {
            tr: "Yalnız Akdeniz tahıl taşımacılığı.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Ürünün adını ve kuzey kuşağını birlikte kullan.",
        },
        explanation: {
          tr: "Kürk Yolu kuzey Avrasya bağlantıları ve deri-post ticaretiyle ayırt edilir. Baharat Yolu Hint Okyanusu ve Güney Asya ürünleriyle, Kral Yolu ise Sardes–Sus bağlantısıyla ilişkilidir. Soruda bir ağın bütün ürünlerinin yalnız bunlar olduğu söylenmiyor.",
        },
        skill: "ortacag-dunya",
        passage: {
          tr: "Kuzey Avrasya’nın orman ve bozkır bağlantılarında samur, tilki ve başka hayvanların deri ve postları taşınmaktadır.",
        },
      },
      {
        id: "f013-foundation-ortacag-dunya-7",
        prompt: {
          tr: "Bu örnek ticaretin hangi sonucunu en iyi gösterir?",
        },
        options: [
          {
            tr: "Bütün toplumların aynı kültüre dönüştüğünü.",
          },
          {
            tr: "Tekniği alan toplumun bütün siyasi bağımsızlığını yitirdiğini.",
          },
          {
            tr: "Yalnız askerî işgal yoluyla kültür aktarılabileceğini.",
          },
          {
            tr: "Yerel uyarlamanın hiçbir zaman yapılamadığını.",
          },
          {
            tr: "Mal değişiminin yanında bilgi ve teknik aktarımına ortam sağlaması.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Tekniğin aktarılmasıyla değişmeden kopyalanmasını birbirinden ayır.",
        },
        explanation: {
          tr: "Ticari ilişkiler insanların teknik ve bilgiyle karşılaşmasını kolaylaştırır. Verilen uyarlama, aktarımın yerel ihtiyaçlara göre dönüşebildiğini de gösterir. Böyle bir temas, bütün kültürün aynılaşması veya siyasi bağımsızlığın kaybı için yeterli kanıt değildir.",
        },
        skill: "ortacag-dunya",
        passage: {
          tr: "Bir tüccar topluluğunun kullandığı kayıt tekniği, uzak pazardaki yerel tüccarlarca kendi dil ve ihtiyaçlarına uyarlanıyor.",
        },
      },
      {
        id: "f013-foundation-ortacag-dunya-8",
        prompt: {
          tr: "Bu karşılaştırmada doğrudan incelenen fark hangisidir?",
        },
        options: [
          {
            tr: "İki ordunun bütün silahlarının aynı malzemeden yapılması.",
          },
          {
            tr: "Her iki ordunun aynı yüzyılda kurulmuş olması.",
          },
          {
            tr: "Askerî hizmetin finansmanı ve bağlılık biçimi.",
          },
          {
            tr: "Savaşların yalnız atlı birliklerle yürütülmesi.",
          },
          {
            tr: "Dinî inançların iki toplumda bütünüyle aynı olması.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Veriler, askerin nasıl geçindiği ve kime nasıl bağlandığıyla ilgili.",
        },
        explanation: {
          tr: "Toprak gelirine bağlı hizmet ile para karşılığı hizmet, askerî örgütlenmenin farklı kaynak ve bağlılık ilişkilerini gösterir. Verilen bilgiler bütün silahları, kuruluş tarihlerini veya inançları karşılaştırmaya yetmez. Aynı “asker” adı kurumların özdeş olduğu anlamına gelmez.",
        },
        skill: "ortacag-dunya",
        passage: {
          tr: "Batı Avrupa’daki soylu savaşçıların hizmeti toprak gelirleriyle; başka bir ordudaki birliklerin hizmeti ise düzenli para ödemesiyle karşılanıyor.",
        },
      },
      {
        id: "f013-foundation-ortacag-dunya-9",
        prompt: {
          tr: "Karttaki iki gelişme için hangi ifade doğrudur?",
        },
        options: [
          {
            tr: "Bölünme ile Batı Roma’nın sona ermesi ayrı tarihlerdeki farklı gelişmelerdir.",
          },
          {
            tr: "Doğu Roma’nın da 476’da aynı anda sona erdiği.",
          },
          {
            tr: "395 ile 476’nın aynı olay için kullanılan iki takvim gösterimi olduğu.",
          },
          {
            tr: "Her iki tarihin bütün dünyada feodaliteyi aynı gün başlattığı.",
          },
          {
            tr: "476’da Avrupa dışındaki bütün devletlerin sona erdiği.",
          },
        ],
        answer: 0,
        hint: {
          tr: "Bir devletin bölünmesi ile bölümlerinden birinin sona ermesini eşitleme.",
        },
        explanation: {
          tr: "395 siyasi bölünmeyi, 476 batıdaki imparatorluk otoritesinin sonunu anlatır. Doğu Roma’nın sonraki varlığı bu ayrımı açık kılar. Okul dönem sınırları da bütün coğrafyaların aynı anda aynı toplumsal düzene geçtiği anlamına gelmez.",
        },
        skill: "ortacag-dunya",
        passage: {
          tr: "Bir ders kartında Roma’nın Doğu ve Batı olarak ayrılması 395, Batı Roma’nın sona ermesi 476 olarak verilmiştir.",
        },
      },
      {
        id: "f013-foundation-ortacag-dunya-10",
        prompt: {
          tr: "Bu ortak özellikten hareketle hangi yöntem doğrudur?",
        },
        options: [
          {
            tr: "İki kurumun bütün görev ve kökenlerini aynı saymak.",
          },
          {
            tr: "Kastın Avrupa’daki bütün toprak sözleşmelerinin adı olduğunu söylemek.",
          },
          {
            tr: "Feodalitenin dünyanın her yerinde aynı uygulandığını varsaymak.",
          },
          {
            tr: "Eşitsizlik ortaklığını belirtip kurumların farklı hak ve bağlılık düzenlerini ayrıca incelemek.",
          },
          {
            tr: "Ortak bir özellik bulunduğunda karşılaştırmayı gereksiz saymak.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Bir benzerlik, iki tarihsel kurumu bütünüyle özdeş yapar mı?",
        },
        explanation: {
          tr: "İki yapıda eşitsizlik bulunması geçerli bir karşılaştırma başlangıcıdır. Ancak kastın doğum ve toplumsal sınırlarıyla feodal bağlılığın toprak-hizmet ilişkileri ayrı incelenir. Tek ortak özellikten bütün kurumun aynı olduğu sonucu çıkarılmaz.",
        },
        skill: "ortacag-dunya",
        passage: {
          tr: "Bir tarihçi, Avrupa’daki feodal toprak ilişkileriyle Hindistan’daki doğum temelli kast ayrımlarını karşılaştırıyor. Her iki örnekte toplumsal eşitsizlik bulunduğunu saptıyor.",
        },
      },
    ],
  },
  {
    lessonId: "ilk-turk-dunyasi",
    topicId: "detail-229",
    subjectId: "tyt-tarih",
    lessonTitle: "İlk ve Orta Çağlarda Türk dünyası: coğrafyadan kuruma",
    questions: [
      {
        id: "f013-foundation-ilk-turk-dunyasi-1",
        prompt: {
          tr: "Bu veri hangi açıklamayı destekler?",
        },
        options: [
          {
            tr: "Konargöçer yaşamın mevsimlik planlama ve kaynak yönetimi içerebildiğini.",
          },
          {
            tr: "Topluluğun hiçbir toplumsal kurala sahip olmadığını.",
          },
          {
            tr: "Her hareketin kalıcı olarak başka ülkeye göç olduğunu.",
          },
          {
            tr: "Toplulukta tarım ve ticaretin hiçbir biçimde görülemeyeceğini.",
          },
          {
            tr: "Her yıl zorunlu olarak yeni bir devlet kurulduğunu.",
          },
        ],
        answer: 0,
        hint: {
          tr: "Düzenli yaylak–kışlak hareketini rastgele dolaşma veya kalıcı göçle eşitleme.",
        },
        explanation: {
          tr: "Verilen düzenli zamanlama, otlak ve sürü yönetiminin planlandığını gösterir. Konargöçerlik kurumsuzluk değildir. Bu mevsimlik hareket, ana yurttan kalıcı ayrılmayla aynı olmadığı gibi ticaret veya bazı tarımsal faaliyetlerin bulunmasını da dışlamaz.",
        },
        skill: "ilk-turk-dunyasi",
        passage: {
          tr: "Bir bozkır topluluğu sürülerini yazın yüksek ve serin otlaklara, kışın daha korunaklı alanlara götürüyor. Güzergâhları ve kullanım zamanları düzenli olarak belirleniyor.",
        },
      },
      {
        id: "f013-foundation-ilk-turk-dunyasi-2",
        prompt: {
          tr: "Bu iki bilgi birlikte nasıl yorumlanmalıdır?",
        },
        options: [
          {
            tr: "Kağanın kendisinin Tanrı sayıldığını kesinleştirir.",
          },
          {
            tr: "Hükümdarın istediği her kurala tek başına aykırı davranabileceğini gösterir.",
          },
          {
            tr: "İlahî meşruiyet anlayışı, yönetim sorumluluğunu ve kural bağlılığını ortadan kaldırmaz.",
          },
          {
            tr: "Törenin yalnız halk için geçerli olduğunu gösterir.",
          },
          {
            tr: "Yönetme hakkının bütün halkın genel oyuyla verildiğini gösterir.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Yetkinin kaynağı ile yetkinin kullanım sınırlarını ayrı oku.",
        },
        explanation: {
          tr: "Kut, hükümdarlık yetkisinin meşruiyet kaynağına ilişkin inançtır. Töre ve halka karşı görevler bu yetkinin kullanımına ilişkin beklentilerdir. Bu yüzden kut anlayışından kağanın tanrılığı veya sınırsız keyfî yetkisi sonucu çıkarılamaz.",
        },
        skill: "ilk-turk-dunyasi",
        passage: {
          tr: "Bir kağanın yönetme hakkının Tanrı’dan geldiğine inanılıyor. Aynı toplumda kağanın töreye uyması ve halkın güvenliğini sağlaması bekleniyor.",
        },
      },
      {
        id: "f013-foundation-ilk-turk-dunyasi-3",
        prompt: {
          tr: "Kurultayın varlığına ilişkin hangi yorum uygundur?",
        },
        options: [
          {
            tr: "Bütün yetişkinlerin eşit oy kullandığı modern parlamento bulunduğunu kanıtlar.",
          },
          {
            tr: "Mecliste görüşülen her işin yalnız ticaretle ilgili olduğunu gösterir.",
          },
          {
            tr: "Hükümdarlık kurumunun bulunmadığını gösterir.",
          },
          {
            tr: "Boy beylerinin toplumda hiçbir rolünün olmadığını kanıtlar.",
          },
          {
            tr: "Danışma ve siyasi görüşme kurumu bulunduğunu gösterir.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Tarihsel meclisi bugünkü yurttaşlık ve genel oy kurumuyla özdeşleştirme.",
        },
        explanation: {
          tr: "Kurultay siyasi ve askerî meselelerin görüşüldüğü bir kurumdur. Katılanların kimliği verilmiş, bütün halkın eşit oy hakkı verildiği söylenmemiştir. Danışma mekanizması ile modern temsilî demokrasi aynı tarihsel iddia değildir.",
        },
        skill: "ilk-turk-dunyasi",
        passage: {
          tr: "Bir mecliste kağan, hatun ve boy beyleri siyasi ve askerî konuları görüşüyor. Kararların uygulanmasında ayrıca yönetim görevlileri çalışıyor.",
        },
      },
      {
        id: "f013-foundation-ilk-turk-dunyasi-4",
        prompt: {
          tr: "Bu yapı için hangi açıklama en uygundur?",
        },
        options: [
          {
            tr: "Batı yöneticisinin her durumda merkezden bütünüyle bağımsız olduğu.",
          },
          {
            tr: "İkili yönetim paylaşımı vardır; bu bilgi başlangıçtan iki bağımsız devlet bulunduğunu göstermez.",
          },
          {
            tr: "İki bölgenin mutlaka farklı dil kullandığı.",
          },
          {
            tr: "Kağanın doğuda hiçbir yönetim yetkisinin bulunmadığı.",
          },
          {
            tr: "Yapının bugünkü federal devletlerle her bakımdan aynı olduğu.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Metindeki “kağana bağlı” koşulunu atlama.",
        },
        explanation: {
          tr: "Doğu-batı yönetim paylaşımı ikili teşkilatın örneğidir. Batıdaki görevlinin merkeze bağlı olduğu açıkça belirtildiği için iki bağımsız devlet sonucu çıkmaz. Yerel hareket alanı ile siyasi bağımsızlık ayrı düzeylerdir.",
        },
        skill: "ilk-turk-dunyasi",
        passage: {
          tr: "Geniş bir ülkenin doğusunu kağan, batısını kağana bağlı bir hanedan üyesi yönetmektedir.",
        },
      },
      {
        id: "f013-foundation-ilk-turk-dunyasi-5",
        prompt: {
          tr: "Bu eşleştirmeler hangi sırayı verir?",
        },
        options: [
          {
            tr: "Uygur Kağanlığı → Asya Hun kuruluşu → I. Kök Türk kuruluşu.",
          },
          {
            tr: "II. Kök Türk kuruluşu → Uygur Kağanlığı → Asya Hun kuruluşu.",
          },
          {
            tr: "I. Kök Türk kuruluşu → Avrupa Hun kuruluşu → II. Kök Türk kuruluşu.",
          },
          {
            tr: "I. Kök Türk kuruluşu → II. Kök Türk yeniden kuruluşu → Uygur Kağanlığı.",
          },
          {
            tr: "Asya Hun kuruluşu → I. Kök Türk kuruluşu → Avrupa Hun kuruluşu.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Aynı coğrafyada farklı dönem ve siyasi oluşumlar bulunabilir.",
        },
        explanation: {
          tr: "552 Bumin ve I. Kök Türk, 682 Kutluk/İlteriş ve II. Kök Türk, 744 Uygur Kağanlığı ile eşleşir. Bu sırayı tek hanedanın hiç kesintisiz yönetimi gibi görmek yerine kuruluş ve yeniden örgütlenme ayrımlarıyla okumak gerekir.",
        },
        skill: "ilk-turk-dunyasi",
        passage: {
          tr: "Bir tarih kartı hazırlayan öğrenci 552’yi Bumin Kağan, 682’yi Kutluk/İlteriş Kağan, 744’ü Uygur Kağanlığı ile ilişkilendiriyor.",
        },
      },
      {
        id: "f013-foundation-ilk-turk-dunyasi-6",
        prompt: {
          tr: "Bu metinleri kullanan araştırmacının yaklaşımı nasıl olmalıdır?",
        },
        options: [
          {
            tr: "Taşa yazıldığı için her cümlesini yorum gerektirmeyen mutlak gerçek saymak.",
          },
          {
            tr: "Dönemin doğrudan siyasi kaydı olarak kullanıp yazdıranların amaç ve bağlamını incelemek.",
          },
          {
            tr: "Yönetici anlatısı olduğu için hiçbir tarihsel değeri olmadığını düşünmek.",
          },
          {
            tr: "Yazıtları yalnız 20. yüzyıl olaylarını anlatan kaynak saymak.",
          },
          {
            tr: "Metinde halk adı bulunduğu için bütün çağlarda aynı devletin sürdüğünü kabul etmek.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Birinci el olmakla eleştirel karşılaştırmaya ihtiyaç duymayı birlikte düşün.",
        },
        explanation: {
          tr: "Orhun yazıtları II. Kök Türk döneminin 8. yüzyıl siyasi dünyası için doğrudan kaynaklardır. Hükümdar hitabı ve amacı, anlatımın değerlendirilmesinde önem taşır. Doğrudan kaynak, eleştiriden bağımsız kaynak demek değildir.",
        },
        skill: "ilk-turk-dunyasi",
        passage: {
          tr: "8. yüzyıldaki Orhun yazıtlarında kağanın yönetimi, halka hitabı ve devletin yaşadığı güçlükler anlatılıyor.",
        },
      },
      {
        id: "f013-foundation-ilk-turk-dunyasi-7",
        prompt: {
          tr: "Bu bulguların desteklediği yorum hangisidir?",
        },
        options: [
          {
            tr: "Bütün Türk topluluklarının aynı gün yerleşik yaşama geçtiği.",
          },
          {
            tr: "Uygurlardan önce hiçbir Türk topluluğunun tarım yapmadığı.",
          },
          {
            tr: "Bulunan her yazının aynı hükümdar tarafından yazıldığı.",
          },
          {
            tr: "Yerleşik hayatın toplumdaki bütün askerî faaliyetleri bitirdiği.",
          },
          {
            tr: "Yerleşik üretim ve şehirli kültür faaliyetlerinin bu yerleşimde geliştiği.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Belirli bir yerleşimin kanıtını bütün toplulukların tarihiyle eşitleme.",
        },
        explanation: {
          tr: "Kanallar, konutlar, belgeler ve ticaret izleri birlikte yerleşik ve şehirli faaliyetleri destekler. Ancak verinin coğrafi kapsamı sınırlıdır. Bundan önce hiç tarım bulunmadığı veya bütün Türklerin aynı anda aynı yaşam biçimine geçtiği sonucu çıkarılamaz.",
        },
        skill: "ilk-turk-dunyasi",
        passage: {
          tr: "Bir Uygur yerleşiminde sulama kanalları, konutlar, yazılı belgeler ve ticaret izleri görülüyor.",
        },
      },
      {
        id: "f013-foundation-ilk-turk-dunyasi-8",
        prompt: {
          tr: "İki bilgi birlikte hangi ayrımı gösterir?",
        },
        options: [
          {
            tr: "840’tan sonra bütün Uygurların ortadan kalktığını.",
          },
          {
            tr: "Turfan’ın 840’tan önce hiç yerleşim görmediğini.",
          },
          {
            tr: "Bir siyasi hâkimiyetin sona ermesiyle topluluğun ve kültürün sona ermesi aynı şey değildir.",
          },
          {
            tr: "Kültürel faaliyetin ancak tek bir devlet kesintisiz yaşarsa mümkün olduğunu.",
          },
          {
            tr: "Merkezî hâkimiyet kaybının hiç yaşanmadığını.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Devletin siyasi ömrü ile insanların kültürel sürekliliği ayrı izlenebilir.",
        },
        explanation: {
          tr: "840 bozkır merkezli siyasi düzen için bir kırılmadır. Sonraki yerleşimlerde süren faaliyetler halkın ve kültürün tek bir devletin son tarihiyle bitmediğini gösterir. Bu süreklilik, siyasi hâkimiyet kaybını da yok saydırmaz.",
        },
        skill: "ilk-turk-dunyasi",
        passage: {
          tr: "Uygur Kağanlığı 840’ta merkezî bozkır hâkimiyetini kaybediyor. Uygur topluluklarının daha sonra Turfan ve Kansu çevresinde kültürel faaliyetleri sürüyor.",
        },
      },
      {
        id: "f013-foundation-ilk-turk-dunyasi-9",
        prompt: {
          tr: "Bu düzenin doğrudan gösterdiği özellik hangisidir?",
        },
        options: [
          {
            tr: "Askerî teşkilatta sayısal kademelendirme ve komuta düzeni bulunduğu.",
          },
          {
            tr: "Bütün askerlerin yalnız piyade olduğu.",
          },
          {
            tr: "Bütün yurttaşların yöneticiyi eşit oyla seçtiği.",
          },
          {
            tr: "Ordunun her arazi ve savaşta kesin zafer kazanacağı.",
          },
          {
            tr: "Bütün devlet gelirlerinin yalnız tarımdan sağlandığı.",
          },
        ],
        answer: 0,
        hint: {
          tr: "Verilen sayılar ve komutan ilişkileri hangi alanı düzenliyor?",
        },
        explanation: {
          tr: "Onlu teşkilat birliklerin kademelendirilmesi ve komuta ilişkileriyle ilgilidir. Bu bilgi tek başına silah türünü, bütün gelir kaynaklarını veya savaştaki başarıyı belirlemez. Teşkilatlanma, askerî kapasitenin unsurlarından biridir; zafer garantisi değildir.",
        },
        skill: "ilk-turk-dunyasi",
        passage: {
          tr: "Bir orduda birlikler on, yüz, bin ve on bin kişilik kademelerle örgütleniyor; komutanlar arasında belirli görev ilişkileri kuruluyor.",
        },
      },
      {
        id: "f013-foundation-ilk-turk-dunyasi-10",
        prompt: {
          tr: "Bu örnek hangi açıklamayı destekler?",
        },
        options: [
          {
            tr: "Komşularla bütün ilişkilerin yalnız savaştan oluştuğunu.",
          },
          {
            tr: "Ticaret yapan devletlerin hiçbir konuda rekabet edemeyeceğini.",
          },
          {
            tr: "Hayvancılık yapan toplulukların tahıla ihtiyaç duymadığını.",
          },
          {
            tr: "Ekonomik tamamlayıcılık ile siyasi rekabet aynı ilişkide birlikte bulunabilir.",
          },
          {
            tr: "Yol denetiminin hiçbir ekonomik çıkar sağlamadığını.",
          },
        ],
        answer: 3,
        hint: {
          tr: "İş birliği ile rekabeti birbirini dışlayan tek seçenekler gibi görme.",
        },
        explanation: {
          tr: "Ürünlerin birbirini tamamlaması alışverişi desteklerken yol geliri ve stratejik denetim rekabet yaratabilir. İki ilişki biçimi aynı dönemde birlikte bulunabilir. Tarihi yalnız sürekli savaş veya kesintisiz dostluk ikilemine indirgemek veriyi eksiltir.",
        },
        skill: "ilk-turk-dunyasi",
        passage: {
          tr: "Bir Türk devletiyle komşu yerleşik topluluk arasında hayvansal ürünler, tahıl ve zanaat ürünleri değiştiriliyor. İki taraf aynı zamanda ticaret güzergâhlarının denetimi için rekabet ediyor.",
        },
      },
    ],
  },
  {
    lessonId: "islam-medeniyetinin-dogusu",
    topicId: "detail-230",
    subjectId: "tyt-tarih",
    lessonTitle: "İslam medeniyetinin doğuşu: olay, kurum ve kültür",
    questions: [
      {
        id: "f013-foundation-islam-medeniyetinin-dogusu-1",
        prompt: {
          tr: "Hicretin yalnız yer değiştirme olarak görülmemesi neden uygundur?",
        },
        options: [
          {
            tr: "Yeni siyasi ve toplumsal örgütlenmenin de dönüm noktası olduğu için.",
          },
          {
            tr: "Aynı gün bütün Arabistan’ın tek inancı benimsediği için.",
          },
          {
            tr: "Hicretin 632’deki vefatla aynı olay olduğu için.",
          },
          {
            tr: "Medine’de bütün grupların aynı kökenden geldiğini gösterdiği için.",
          },
          {
            tr: "Hicret sırasında modern genel oy sisteminin kurulduğu için.",
          },
        ],
        answer: 0,
        hint: {
          tr: "Göçten sonra verilen kurum ve ilişki değişimlerine bak.",
        },
        explanation: {
          tr: "Dayanışma ve ortak savunmanın düzenlenmesi, hicretin toplumsal-siyasi boyutunu gösterir. Veriler yalnız mekânsal bir hareketten fazlasını anlatır. Bununla birlikte bütün grupların aynı dini veya kökeni benimsediği sonucu çıkarılamaz.",
        },
        skill: "islam-medeniyetinin-dogusu",
        passage: {
          tr: "Mekke’den Medine’ye 622’de hicret ediliyor. Medine’de dayanışma, ortak savunma ve farklı grupların birlikte yaşamını düzenleme girişimleri gelişiyor.",
        },
      },
      {
        id: "f013-foundation-islam-medeniyetinin-dogusu-2",
        prompt: {
          tr: "Bu iki grup sırasıyla hangi kavramlarla anılır?",
        },
        options: [
          {
            tr: "Ensar ve mevali.",
          },
          {
            tr: "Mevali ve muhacir.",
          },
          {
            tr: "Muhacir ve ensar.",
          },
          {
            tr: "Kadı ve halife.",
          },
          {
            tr: "Hadari ve divan.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Gelen toplulukla, gelenlere yardım eden topluluğu ayır.",
        },
        explanation: {
          tr: "Muhacir bu bağlamda Mekke’den hicret eden Müslümanları, ensar onlara yardım eden Medineli Müslümanları anlatır. Mevali burada farklı bir toplumsal kavramdır; muhacir veya ensarın eş anlamlısı değildir.",
        },
        skill: "islam-medeniyetinin-dogusu",
        passage: {
          tr: "622’de Mekke’den Medine’ye gelen Müslümanlar ile onlara yardım eden Medineli Müslümanlar, dayanışma ilişkisi kuruyor.",
        },
      },
      {
        id: "f013-foundation-islam-medeniyetinin-dogusu-3",
        prompt: {
          tr: "Yalnız bu bilgiye dayanılarak hangi yargıya ulaşılabilir?",
        },
        options: [
          {
            tr: "Bütün grupların aynı dini benimsediğine.",
          },
          {
            tr: "Bütün grupların aynı kabileden geldiğine.",
          },
          {
            tr: "Şehirde ekonomik faaliyetin sona erdiğine.",
          },
          {
            tr: "Sözleşme bulunan yerde bütün anlaşmazlıkların kesin bittiğine.",
          },
          {
            tr: "Farklı gruplar arasında ortak düzen kurmaya yönelik bir girişim bulunduğuna.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Birlikte yaşama yükümlülüğü ile aynı inancı benimsemeyi eşitleme.",
        },
        explanation: {
          tr: "Sözleşme farklı grupların ilişkilerini ve ortak savunmayı düzenlemektedir. Bu, ortak siyasi-toplumsal düzen girişimidir. Ancak tarafların inanç veya köken bakımından aynılaşması, metnin varlığından otomatik olarak çıkmaz.",
        },
        skill: "islam-medeniyetinin-dogusu",
        passage: {
          tr: "Bir sözleşme, Medine’de farklı grupların birlikte yaşaması ve ortak savunması hakkında yükümlülükler belirliyor.",
        },
      },
      {
        id: "f013-foundation-islam-medeniyetinin-dogusu-4",
        prompt: {
          tr: "Hudeybiye’nin sonucunu anlatan uygun ifade hangisidir?",
        },
        options: [
          {
            tr: "Mekke aynı antlaşma günü askerî olarak fethedilmiştir.",
          },
          {
            tr: "Şehir fethi olmadan da diplomatik bir kazanım doğurabilmiştir.",
          },
          {
            tr: "Hudeybiye, bütün seferlerin sona erdiği son olaydır.",
          },
          {
            tr: "Antlaşma yapılması iki tarafın aynı yöneticiyi seçtiğini gösterir.",
          },
          {
            tr: "Hudeybiye, hicretin diğer adıdır.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Siyasi muhataplık ve barış ortamı, toprak alınmasından farklı sonuçlardır.",
        },
        explanation: {
          tr: "Antlaşmanın diplomatik değeri siyasi muhataplık ve iletişim ortamıyla ilgilidir. Mekke’nin fethi ayrı tarihteki gelişmedir. Bir sonucun önemli olması için mutlaka aynı gün yeni bir şehrin alınması gerekmez; olay türlerini ayırmak kronoloji hatasını önler.",
        },
        skill: "islam-medeniyetinin-dogusu",
        passage: {
          tr: "628 Hudeybiye bir antlaşmadır. Mekke’nin fethi ise 630’da gerçekleşmiştir. Antlaşma, Müslümanların siyasi muhatap olarak kabul edilmesi ve barış ortamı bakımından önemlidir.",
        },
      },
      {
        id: "f013-foundation-islam-medeniyetinin-dogusu-5",
        prompt: {
          tr: "Bu kartın koruduğu ayrım hangisidir?",
        },
        options: [
          {
            tr: "İki işlem de yalnız Hz. Ali döneminde yapılmıştır.",
          },
          {
            tr: "Derleme ve çoğaltma farklı devletlerin aynı merkez adıdır.",
          },
          {
            tr: "Çoğaltma bir metnin hiç bulunmadığını gösterir.",
          },
          {
            tr: "Bir metni bir araya getirmek ile nüshalarını üretip dağıtmak farklı işlemlerdir.",
          },
          {
            tr: "Derleme işlemi bütün siyasi kurumların ortadan kaldırılmasıdır.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Aynı eser üzerinde farklı amaç ve aşamalar bulunabilir.",
        },
        explanation: {
          tr: "Derleme metnin bir araya getirilmesi, çoğaltma ise mevcut metnin nüshalarının üretilip dağıtılmasıyla ilgilidir. İki işlemi tek fiil veya tek halife altında toplamak, kaynaklardaki temel dönem ayrımını kaybettirir.",
        },
        skill: "islam-medeniyetinin-dogusu",
        passage: {
          tr: "Bir bilgi kartında Kur’an’ın derlenmesi Hz. Ebu Bekir dönemiyle, nüshalarının çoğaltılarak merkezlere gönderilmesi Hz. Osman dönemiyle ilişkilendiriliyor.",
        },
      },
      {
        id: "f013-foundation-islam-medeniyetinin-dogusu-6",
        prompt: {
          tr: "Bu iki işlev sırasıyla hangi kavramlarla eşleştirilir?",
        },
        options: [
          {
            tr: "Kadı ve beytülmal.",
          },
          {
            tr: "Beytülmal ve kadı.",
          },
          {
            tr: "Ensar ve muhacir.",
          },
          {
            tr: "Gazve ve seriyye.",
          },
          {
            tr: "Mevali ve hadari.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Maliye işleviyle yargı işlevini birbirinden ayır.",
        },
        explanation: {
          tr: "Beytülmal kamu hazinesi ve mali işlerle, kadı ise yargı işleriyle ilişkilidir. Bu kurumlar toprak ve nüfus büyürken artan yönetim ihtiyaçlarını anlamaya yardım eder. Bir kurum adını bütün devlet işlerinin tek karşılığı saymak yanlıştır.",
        },
        skill: "islam-medeniyetinin-dogusu",
        passage: {
          tr: "Genişleyen devletin gelir ve giderlerini izleyen kamu hazinesi ile anlaşmazlıkları yargılayan görevli ayrı kurumlar olarak düzenleniyor.",
        },
      },
      {
        id: "f013-foundation-islam-medeniyetinin-dogusu-7",
        prompt: {
          tr: "Uygulama öncelikle hangi değişimle ilişkilidir?",
        },
        options: [
          {
            tr: "Bütün yurttaşların eşit oyla yönetime katılmasıyla.",
          },
          {
            tr: "Şehirlerin bağımsız bilim kurumuna dönüşmesiyle.",
          },
          {
            tr: "Bütün devlet gelirlerinin kaldırılmasıyla.",
          },
          {
            tr: "Dinî metinlerin ilk kez çoğaltılmasıyla.",
          },
          {
            tr: "Yönetimin hanedanlaşmasıyla.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Veliahtın aynı aileden belirlenmesi, iktidarın aktarılışını nasıl değiştirir?",
        },
        explanation: {
          tr: "Oğlun veliaht gösterilmesi iktidarın hanedan içinde aktarılmasını hedefler. Bu nedenle uygulamanın doğrudan bağlamı hanedanlaşmadır. Modern genel oyla seçim veya bilimsel kurumlaşma, verilen uygulamanın açıklamadığı farklı konulardır.",
        },
        skill: "islam-medeniyetinin-dogusu",
        passage: {
          tr: "Bir yönetimde hükümdar kendi oğlunu veliaht belirleyerek yönetimin aynı aile içinde sürmesini hedefliyor. Emevi dönemi karşılaştırmasında bu uygulama öne çıkarılıyor.",
        },
      },
      {
        id: "f013-foundation-islam-medeniyetinin-dogusu-8",
        prompt: {
          tr: "Bu tanıma uygun olan kişi hangisidir?",
        },
        options: [
          {
            tr: "Arap kökenli olmayan her gayrimüslim.",
          },
          {
            tr: "Kökeni ne olursa olsun her Medineli yardımcı.",
          },
          {
            tr: "Müslüman olmuş, Arap kökenli olmayan bir kişi.",
          },
          {
            tr: "Yargı işleriyle görevlendirilmiş her kadı.",
          },
          {
            tr: "Mekke’den hicret eden bütün Müslümanların ortak unvanı.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Tanımdaki din ve köken koşullarının ikisini de kontrol et.",
        },
        explanation: {
          tr: "Burada iki koşul birlikte verilmiştir: Arap kökenli olmama ve Müslüman olma. Gayrimüslim, ensar, muhacir veya kadı bunların eş anlamlısı değildir. Tarihsel mevali kavramının her bağlamı bu tek okul tanımına indirgenmemeli; soru kapsamı açık tutulmuştur.",
        },
        skill: "islam-medeniyetinin-dogusu",
        passage: {
          tr: "Bu ders bağlamında mevali sözcüğü, Emevi yönetimi altındaki Arap olmayan Müslümanlar için kullanılmaktadır.",
        },
      },
      {
        id: "f013-foundation-islam-medeniyetinin-dogusu-9",
        prompt: {
          tr: "Bu durum hangi yorumu destekler?",
        },
        options: [
          {
            tr: "Medeniyet birikimi, tek bir hanedanın siyasi ömründen daha geniş olabilir.",
          },
          {
            tr: "750’de bütün İslam dünyasında kültürel üretimin bittiğini.",
          },
          {
            tr: "Endülüs’teki bütün yapıların Şam’la aynı siyasi tarihe sahip olduğunu.",
          },
          {
            tr: "Bilimsel faaliyetin yalnız savaş zamanında yapılabildiğini.",
          },
          {
            tr: "Hanedan değişiminin her dil ve geleneği aynı anda yok ettiğini.",
          },
        ],
        answer: 0,
        hint: {
          tr: "Siyasi yönetim ile kültürel birikimin sürelerini ayrı izle.",
        },
        explanation: {
          tr: "Farklı siyasi merkezlerde süren faaliyetler, medeniyetin yalnız bir hanedandan ibaret olmadığını gösterir. Şam’daki yönetim değişimi başka bölgelerdeki bütün siyasi ve kültürel yaşamı aynı gün sona erdirmez. Süreklilik ile siyasi değişim birlikte bulunabilir.",
        },
        skill: "islam-medeniyetinin-dogusu",
        passage: {
          tr: "Şam merkezli Emevi yönetimi 750’de sona eriyor. Sonraki dönemde Abbasi merkezlerinde ve Endülüs’te bilim, sanat ve öğretim faaliyetleri sürüyor.",
        },
      },
      {
        id: "f013-foundation-islam-medeniyetinin-dogusu-10",
        prompt: {
          tr: "Ders terminolojisinde bu iki sefer sırasıyla nasıl adlandırılır?",
        },
        options: [
          {
            tr: "Gazve ve seriyye.",
          },
          {
            tr: "Hicret ve mevali.",
          },
          {
            tr: "Beytülmal ve kadılık.",
          },
          {
            tr: "Seriyye ve gazve.",
          },
          {
            tr: "Ensar ve muhacir.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Ayırıcı koşul, sefere bizzat katılımın bulunup bulunmamasıdır.",
        },
        explanation: {
          tr: "Hz. Muhammed’in bizzat katılmayıp komutan görevlendirdiği sefer seriyye, bizzat katıldığı sefer gazve bağlamındadır. Sorudaki belirleyici, tarafların etnik kökeni veya seferin kesin zaferle bitmesi değil, verilen katılım koşuludur.",
        },
        skill: "islam-medeniyetinin-dogusu",
        passage: {
          tr: "Bir komutanın yönettiği sefere Hz. Muhammed bizzat katılmıyor. Bir başka sefere ise bizzat katılıyor.",
        },
      },
    ],
  },
  {
    lessonId: "turklerin-islamiyeti-kabulu",
    topicId: "detail-231",
    subjectId: "tyt-tarih",
    lessonTitle: "Türklerin İslamiyeti kabulü: temas, tercih ve değişim",
    questions: [
      {
        id: "f013-foundation-turklerin-islamiyeti-kabulu-1",
        prompt: {
          tr: "Bu kanıttan hangi sonuç doğrudan çıkarılabilir?",
        },
        options: [
          {
            tr: "Belirli bir kişinin askerî-idari ilişkiye katıldığı.",
          },
          {
            tr: "Bütün Türk topluluklarının aynı gün Müslüman olduğu.",
          },
          {
            tr: "Topluluğun resmî dilinin kesinlikle değiştiği.",
          },
          {
            tr: "Komutanın bağımsız bir devlet kurduğu.",
          },
          {
            tr: "Halkın tamamının aynı siyasi tercihi yaptığı.",
          },
        ],
        answer: 0,
        hint: {
          tr: "Kişiye ait veriyi bütün topluluğa genişletme.",
        },
        explanation: {
          tr: "Kanıt, adı geçen komutanın görevi ve ilişkisiyle sınırlıdır. Bireysel görev, topluluğun bütün inanç ve dil tercihleri için yeterli değildir. İlk temas, hizmet, hükümdarın tercihi ve resmî kabul ayrı kanıt düzeylerinde incelenir.",
        },
        skill: "turklerin-islamiyeti-kabulu",
        passage: {
          tr: "Bir Türk komutan Abbasi ordusunda görev alıyor. Aynı tarihte mensup olduğu topluluğun bütün bireylerinin inancı hakkında bir kayıt bulunmuyor.",
        },
      },
      {
        id: "f013-foundation-turklerin-islamiyeti-kabulu-2",
        prompt: {
          tr: "Bu kronolojiye uygun eşleştirme hangisidir?",
        },
        options: [
          {
            tr: "Talas: Emevi–Bizans karşılaşması ve Hun desteği.",
          },
          {
            tr: "Talas: Karahanlı–Gazneli karşılaşması.",
          },
          {
            tr: "Talas: Abbasi–Tang karşılaşması ve Karluk desteği.",
          },
          {
            tr: "Talas: Türkiye Selçuklu–Moğol karşılaşması.",
          },
          {
            tr: "Talas: Büyük Selçuklu–Bizans karşılaşması.",
          },
        ],
        answer: 2,
        hint: {
          tr: "751’in hangi yönetim değişiminden sonra geldiğini kontrol et.",
        },
        explanation: {
          tr: "750’den sonra Abbasi yönetimi başladığı için 751 Talas, Abbasi–Tang bağlamındadır. Karlukların desteği bu karşılaşmadaki rolü ifade eder. Emeviler veya sonraki Selçuklu ve Gazneli savaşlarıyla eşleştirme dönem ve taraf hatasıdır.",
        },
        skill: "turklerin-islamiyeti-kabulu",
        passage: {
          tr: "Abbasiler 750’de yönetime geliyor. 751 Talas Savaşı’nda Abbasi ordusu ile Tang kuvvetleri karşılaşıyor; Karluklar Abbasi tarafını destekliyor.",
        },
      },
      {
        id: "f013-foundation-turklerin-islamiyeti-kabulu-3",
        prompt: {
          tr: "Hangi yorum bu iki bilgiyle bağdaşır?",
        },
        options: [
          {
            tr: "Talas’tan önce Türklerle Müslümanların hiç karşılaşmadığı.",
          },
          {
            tr: "751’de bütün Türklerin tek kararla din değiştirdiği.",
          },
          {
            tr: "Dinî yayılmanın yalnız bir gün içinde tamamlanabildiği.",
          },
          {
            tr: "Savaşın siyasi etkisinin hiçbir zaman bulunmadığı.",
          },
          {
            tr: "Askerî ittifak ve yakınlaşma, bütün toplulukların anlık toplu kabulüyle aynı değildir.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Bir dönüm noktası ile uzun süreli sürecin tamamlanmasını ayır.",
        },
        explanation: {
          tr: "Yakınlaşma bir etkiyi, sonraki yüzyıllarda yayılma ise farklı hızlarda ilerleyen süreci gösterir. Savaşın önemi bütün toplulukların aynı anda karar verdiği anlamına gelmez. Öncesindeki temasların varlığı da ayrıca değerlendirilmelidir.",
        },
        skill: "turklerin-islamiyeti-kabulu",
        passage: {
          tr: "Talas Savaşı’nın Türklerle Müslümanlar arasındaki yakınlaşmayı desteklediği, farklı Türk topluluklarında İslamiyet’in yayılmasının sonraki yüzyıllarda da sürdüğü belirtiliyor.",
        },
      },
      {
        id: "f013-foundation-turklerin-islamiyeti-kabulu-4",
        prompt: {
          tr: "Ticaretin İslamiyet’in tanınmasını kolaylaştırması hangi mekanizmayla açıklanabilir?",
        },
        options: [
          {
            tr: "Mal satan herkesin zorunlu olarak aynı dini benimsemesiyle.",
          },
          {
            tr: "Tekrarlanan karşılaşma ve güven ilişkilerinin bilgi aktarımına ortam sağlamasıyla.",
          },
          {
            tr: "Alışveriş yapılabilmesi için bütün dillerin kaldırılmasıyla.",
          },
          {
            tr: "Her tüccarın bağımsız bir devlet kurmasıyla.",
          },
          {
            tr: "Ticaretin siyasi ve kültürel temasları tamamen durdurmasıyla.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Bir etkenin kabulü nasıl kolaylaştırabildiğini, zorunlu sonuç iddiasından ayır.",
        },
        explanation: {
          tr: "Düzenli karşılaşmalar yeni inançların tanınmasını ve iletişimi kolaylaştırabilir. Bu, bir kolaylaştırma mekanizmasıdır; bütün tüccarların din değiştirmesini gerektiren bir yasa değildir. Ekonomik, siyasi ve yerel etkenler birlikte değerlendirilir.",
        },
        skill: "turklerin-islamiyeti-kabulu",
        passage: {
          tr: "Tüccarlar iki bölge arasında düzenli yolculuk yapıyor. Mal alışverişiyle birlikte dil, inanç ve gündelik uygulamalar hakkında iletişim kuruyorlar.",
        },
      },
      {
        id: "f013-foundation-turklerin-islamiyeti-kabulu-5",
        prompt: {
          tr: "Bu değişim kabul sürecini nasıl etkileyebilir?",
        },
        options: [
          {
            tr: "Bütün halkların modern anlamda eksiksiz eşitliğe ulaştığını kanıtlar.",
          },
          {
            tr: "Devletin resmî dilinin otomatik olarak Türkçe olduğunu gösterir.",
          },
          {
            tr: "Bütün insanların aynı gün inanç değiştirdiğini kesinleştirir.",
          },
          {
            tr: "Katılım önündeki bazı siyasi ve toplumsal engelleri azaltabilir.",
          },
          {
            tr: "Ticaret ve öğretimin süreçte hiçbir etkisi kalmadığını gösterir.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Engelin azalması ile bütün sonuçların tamamlanmasını aynı sayma.",
        },
        explanation: {
          tr: "Daha kapsayıcı görev ve ilişki olanakları, yakınlaşmanın önündeki bazı engelleri azaltabilir. Verilen karşılaştırma bunu destekler. Ancak buradan eksiksiz modern eşitlik, otomatik dil değişimi veya herkesi kapsayan anlık kabul sonucu çıkarılamaz.",
        },
        skill: "turklerin-islamiyeti-kabulu",
        passage: {
          tr: "Bir karşılaştırmada Arap olmayan Müslümanlara görev verilmesinin kolaylaştığı ve dışlayıcı uygulamaların bazı alanlarda azaldığı belirtiliyor.",
        },
      },
      {
        id: "f013-foundation-turklerin-islamiyeti-kabulu-6",
        prompt: {
          tr: "Soru hangi yapıyı hedeflemektedir?",
        },
        options: [
          {
            tr: "Tuna Bulgarları.",
          },
          {
            tr: "Karahanlılar.",
          },
          {
            tr: "Türkiye Selçukluları.",
          },
          {
            tr: "Avrupa Hunları.",
          },
          {
            tr: "I. Kök Türkler.",
          },
        ],
        answer: 1,
        hint: {
          tr: "“İlk” ifadesini verilen bölge ve hükümdar koşullarıyla birlikte oku.",
        },
        explanation: {
          tr: "Orta Asya ve Satuk Buğra Han koşulları Karahanlıları belirler. Bu kapsamlı ifade, bölge veya resmî kabul ölçütü belirtilmeyen bütün “ilk” sorularının tek yanıtı sayılmaz. Devletin kuruluşu ile hükümdarın dinî kabulü de ayrı tarihlerdir.",
        },
        skill: "turklerin-islamiyeti-kabulu",
        passage: {
          tr: "Bir soru açıkça “Orta Asya’daki ilk Müslüman Türk devleti bağlamında ele alınan siyasi yapı”yı soruyor; hükümdar olarak Satuk Buğra Han ipucunu veriyor.",
        },
      },
      {
        id: "f013-foundation-turklerin-islamiyeti-kabulu-7",
        prompt: {
          tr: "Bu iki bilgi hangi tarihsel ayrımı korur?",
        },
        options: [
          {
            tr: "Devlet kurulunca her bireyin aynı dini benimsemek zorunda olduğunu.",
          },
          {
            tr: "840’ın bütün Türkler için ortak resmî kabul tarihi olduğunu.",
          },
          {
            tr: "Karahanlıların İslamiyet öncesinde hiçbir siyasi varlığı bulunmadığını.",
          },
          {
            tr: "Hükümdarın tercihi ile kuruluş tarihinin her durumda aynı gün olduğunu.",
          },
          {
            tr: "Devletin siyasi kuruluşu ile dinî kabulü aynı olay olmak zorunda değildir.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Bir siyasi yapının varlığı ve dinî dönüşümü farklı kanıtlarla tarihlenebilir.",
        },
        explanation: {
          tr: "Kuruluş ve dinî dönüşüm farklı süreçlerdir. Verilen tarihler bu ayrımı doğrudan gösterir. Bir devletin daha sonra Müslüman bir yönetim kimliği kazanması, onun önceki siyasi varlığını yok saymayı gerektirmez.",
        },
        skill: "turklerin-islamiyeti-kabulu",
        passage: {
          tr: "Karahanlı Devleti’nin kuruluşu 840 ile, Satuk Buğra Han’ın İslamiyet’i benimsemesi ise daha sonraki bir dönemle ilişkilendiriliyor.",
        },
      },
      {
        id: "f013-foundation-turklerin-islamiyeti-kabulu-8",
        prompt: {
          tr: "Bu kart hangi örnekle ilişkilendirilmelidir?",
        },
        options: [
          {
            tr: "Tuna Bulgarlarının 751’deki Talas katılımıyla.",
          },
          {
            tr: "Türkiye Selçuklularının 1077’deki kuruluşuyla.",
          },
          {
            tr: "İdil Bulgarlarının resmî kabul bağlamıyla.",
          },
          {
            tr: "I. Kök Türklerin 552’deki kuruluşuyla.",
          },
          {
            tr: "Gaznelilerin 1040 Dandanakan zaferiyle.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Volga’nın diğer adı olan İdil, coğrafi kapsamı belirliyor.",
        },
        explanation: {
          tr: "İdil/Volga, Almış ve 922 Abbasi heyeti birlikte İdil Bulgarlarının resmî kabul bağlamını verir. Bu tarih ilk Müslüman bireyin kesin tarihi olarak kullanılmaz. Tuna Bulgarlarıyla veya başka devletlerin kuruluş tarihleriyle karıştırılmamalıdır.",
        },
        skill: "turklerin-islamiyeti-kabulu",
        passage: {
          tr: "Bir araştırma kartında Volga/İdil sahası, Almış ve 922’de gelen Abbasi heyeti belirtiliyor.",
        },
      },
      {
        id: "f013-foundation-turklerin-islamiyeti-kabulu-9",
        prompt: {
          tr: "Bu iki veri birlikte hangi yorumu destekler?",
        },
        options: [
          {
            tr: "Kültürel süreklilik ile değişim aynı süreçte birlikte bulunabilir.",
          },
          {
            tr: "Din değişiminin bütün önceki dili ve kültürü bir anda sildiğini.",
          },
          {
            tr: "Yeni dinî çerçevenin hiçbir kurumsal etkisi olmadığını.",
          },
          {
            tr: "Türklerin daha önce hiçbir yazılı kültürünün bulunmadığını.",
          },
          {
            tr: "Türkçe kullanımıyla yeni kurumların birbirini zorunlu olarak dışladığını.",
          },
        ],
        answer: 0,
        hint: {
          tr: "Eski unsurun devamını ve yeni unsurun eklenmesini ayrı kanıtla göster.",
        },
        explanation: {
          tr: "Türkçenin sürmesi devamlılığa, yeni içerik ve kurumlar değişime kanıttır. Bir kültürde bu ikisi aynı anda bulunabilir. Verilen örnek ne önceki her şeyin silindiğini ne de hiçbir şeyin değişmediğini destekler.",
        },
        skill: "turklerin-islamiyeti-kabulu",
        passage: {
          tr: "Karahanlı çevresinde Türkçe eser üretimi sürerken yeni dinî içerikler ve medrese gibi kurumlar yaygınlaşıyor.",
        },
      },
      {
        id: "f013-foundation-turklerin-islamiyeti-kabulu-10",
        prompt: {
          tr: "Bu karşılaştırma için en uygun ifade hangisidir?",
        },
        options: [
          {
            tr: "İki inanç sisteminin bütün kurallarının tamamen özdeş olduğu kanıtlanmıştır.",
          },
          {
            tr: "Hükümdarlık fikri din değişimiyle aynı anda ortadan kalkmıştır.",
          },
          {
            tr: "Önceki bütün kurumlar hiçbir iz bırakmadan yok olmuştur.",
          },
          {
            tr: "Önceki bir meşruiyet unsuru yeni inanç çerçevesinde yeniden yorumlanmıştır.",
          },
          {
            tr: "Meşruiyet düşüncesi hiçbir tarihsel değişimden etkilenmemiştir.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Benzer dayanak ile bütünüyle aynı sistem olmayı ayır.",
        },
        explanation: {
          tr: "İlahî meşruiyet düşüncesinde bir devamlılık vardır; fakat yeni inanç çerçevesi ve kurumlar yorumu değiştirir. Bir benzerlik, iki dinin veya bütün hukuk düzenlerinin özdeş olduğunu göstermez. Süreklilik ve dönüşüm iki ayrı kanıtla kurulmalıdır.",
        },
        skill: "turklerin-islamiyeti-kabulu",
        passage: {
          tr: "İslamiyet öncesi kut anlayışında hükümdarlık ilahî dayanakla açıklanır. İslamiyet sonrasında bu meşruiyet Allah’ın takdiri çerçevesinde yorumlanırken yeni hukuk ve kurum etkileri de görülür.",
        },
      },
    ],
  },
  {
    lessonId: "selcuklu-yerlesme-devletlesme",
    topicId: "detail-232",
    subjectId: "tyt-tarih",
    lessonTitle: "Selçuklu Türkiyesi: yerleşme, kurum ve dönüm noktaları",
    questions: [
      {
        id: "f013-foundation-selcuklu-yerlesme-devletlesme-1",
        prompt: {
          tr: "Bu gelişmelerin işlevlerini doğru ayıran ifade hangisidir?",
        },
        options: [
          {
            tr: "Askerî dönüm noktası, siyasi kuruluş ve kalıcılığı güçlendiren gelişme farklı aşamalardır.",
          },
          {
            tr: "Üçü de aynı savaşın farklı adlarıdır.",
          },
          {
            tr: "1071, Türkiye Selçuklu Devleti’nin resmî son tarihidir.",
          },
          {
            tr: "1077, Moğollara karşı Kösedağ zaferinin tarihidir.",
          },
          {
            tr: "1176, Anadolu’ya ilk insan yerleşiminin tarihidir.",
          },
        ],
        answer: 0,
        hint: {
          tr: "Aynı çizgide bulunmak, üç olayın aynı şeyi anlatması değildir.",
        },
        explanation: {
          tr: "Malazgirt yerleşim sürecini hızlandıran askerî dönüm noktası, 1077 ayrı devlet kuruluşu, Miryokefalon ise Anadolu’daki kalıcılığı güçlendiren gelişmedir. Her tarih aynı siyasi veya askerî işlevin yerine kullanılamaz.",
        },
        skill: "selcuklu-yerlesme-devletlesme",
        passage: {
          tr: "Bir çizelgede 1071 Malazgirt Zaferi, 1077 Türkiye Selçuklu Devleti’nin kuruluşu ve 1176 Miryokefalon Zaferi gösteriliyor.",
        },
      },
      {
        id: "f013-foundation-selcuklu-yerlesme-devletlesme-2",
        prompt: {
          tr: "Bu bilgiler hangi karışıklığı önler?",
        },
        options: [
          {
            tr: "Bizans ile Moğolların farklı siyasi güçler olduğunu düşünmeyi.",
          },
          {
            tr: "Bir savaşla devlet kuruluşunun farklı olabileceğini kabul etmeyi.",
          },
          {
            tr: "Büyük Selçuklu ile Türkiye Selçuklularını tek kuruluş ve tek olay gibi görmeyi.",
          },
          {
            tr: "1071’in 1077’den önce geldiğini fark etmeyi.",
          },
          {
            tr: "Anadolu’nun farklı topluluklara ev sahipliği yaptığını düşünmeyi.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Devlet adı, yönetici ve tarihi birlikte kontrol et.",
        },
        explanation: {
          tr: "Alp Arslan’ın Malazgirt’i Büyük Selçuklu bağlamındadır. Türkiye Selçuklu kuruluşu ayrı yönetici ve tarihle ilişkilidir. “Selçuklu” ortak adı, bu iki siyasi yapının bütün gelişmelerini tek olay veya tek kuruluş hâline getirmez.",
        },
        skill: "selcuklu-yerlesme-devletlesme",
        passage: {
          tr: "1071 Malazgirt’te Alp Arslan ile Bizans İmparatoru Romen Diyojen karşılaşmıştır. Türkiye Selçuklu Devleti ise Kutalmışoğlu Süleyman Şah ve 1077 ile ilişkilendirilir.",
        },
      },
      {
        id: "f013-foundation-selcuklu-yerlesme-devletlesme-3",
        prompt: {
          tr: "Bu tabloya uygun eşleştirme hangisidir?",
        },
        options: [
          {
            tr: "Saltuklular: Konya; Çaka Beyliği: Erzurum ve iç kara savunması.",
          },
          {
            tr: "Saltuklular: İzmir; Çaka Beyliği: Sivas ve medrese.",
          },
          {
            tr: "Saltuklular: Sardes; Çaka Beyliği: Hattuşa ve Pankuş.",
          },
          {
            tr: "Saltuklular: Tuşpa; Çaka Beyliği: Bağdat ve halifelik.",
          },
          {
            tr: "Saltuklular: Erzurum; Çaka Beyliği: İzmir ve denizcilik.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Denizcilik ipucunu kıyı merkeziyle; Saltukluları kuzeydoğu Anadolu’yla eşleştir.",
        },
        explanation: {
          tr: "Erzurum Saltuklu, İzmir çevresindeki denizcilik Çaka Beyliği bağlamındadır. İlk beylikler aynı coğrafi dönüşüme katkı sunsa da ayrı siyasi kimliklerdir. Bütün merkezleri Konya’ya veya bütün faaliyetleri Türkiye Selçuklularına atfetmek yanlıştır.",
        },
        skill: "selcuklu-yerlesme-devletlesme",
        passage: {
          tr: "Bir tablo ilk Anadolu beyliklerini merkezleriyle eşleştirecektir. Saltuklular için Erzurum, Çaka Beyliği için İzmir ve denizcilik bilgileri verilmiştir.",
        },
      },
      {
        id: "f013-foundation-selcuklu-yerlesme-devletlesme-4",
        prompt: {
          tr: "Bu örneklerden hangi sonuç çıkarılabilir?",
        },
        options: [
          {
            tr: "Bütün eserlerin tek bir Türkiye Selçuklu hükümdarınca yaptırıldığı.",
          },
          {
            tr: "İlk Anadolu beyliklerinin farklı öğretim, sağlık ve mimari katkıları vardır.",
          },
          {
            tr: "Medrese ile darüşşifanın bütün işlevlerinin aynı olduğu.",
          },
          {
            tr: "Mimari eser bulunan her yerde bütün nüfusun aynı anda yerleştiği.",
          },
          {
            tr: "Beylikler arasında hiçbir siyasi veya kültürel fark bulunmadığı.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Eseri yaptıran siyasi yapıyla, eserin işlevini ayrı ayrı oku.",
        },
        explanation: {
          tr: "İki farklı beylik ve iki farklı eser kümesi, katkıların tek siyasi yapıya indirgenemeyeceğini gösterir. Medrese öğretim, darüşşifa sağlık bağlamındadır. Mimari kanıt belirli kurumları gösterir; bütün toplumun tek anda aynılaştığını göstermez.",
        },
        skill: "selcuklu-yerlesme-devletlesme",
        passage: {
          tr: "Bir sergi kartı Yağıbasan Medresesi’ni Danişmentlilerle, Divriği Ulu Camii ve Darüşşifası’nı Mengüceklilerle ilişkilendiriyor.",
        },
      },
      {
        id: "f013-foundation-selcuklu-yerlesme-devletlesme-5",
        prompt: {
          tr: "Bu yaklaşımın vurgusu hangisidir?",
        },
        options: [
          {
            tr: "Bütün değişimlerin tek bir savaş gününde tamamlandığı.",
          },
          {
            tr: "Yapıların üretim ve insan ilişkilerinden bağımsız olduğu.",
          },
          {
            tr: "Göçlerin her bölgede aynı tarihte ve tek nedenle gerçekleştiği.",
          },
          {
            tr: "Yerleşmenin yalnız askerî zaferle değil, ekonomik ve kurumsal ağlarla da güçlendiği.",
          },
          {
            tr: "Yerel topluluklarla hiç etkileşim kurulmadığı.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Listede savaş dışındaki hangi kalıcılık araçları var?",
        },
        explanation: {
          tr: "Üretim, pazar ve kurumlar yerleşmenin sürmesini sağlayan farklı bağlantıları gösterir. Askerî başarı önemli olabilir; fakat tek başına bütün toplumsal dönüşümü açıklamaz. Kalıcılık, göç ve yerel etkileşimle birlikte uzun süre içinde incelenmelidir.",
        },
        skill: "selcuklu-yerlesme-devletlesme",
        passage: {
          tr: "Bir bölgede göçmenlerin üretime katılması, pazarların gelişmesi, köprüler, camiler ve medreselerin kurulması Anadolu’daki kalıcılık süreciyle birlikte inceleniyor.",
        },
      },
      {
        id: "f013-foundation-selcuklu-yerlesme-devletlesme-6",
        prompt: {
          tr: "Bu gelişmenin doğrudan gösterdiği ilişki hangisidir?",
        },
        options: [
          {
            tr: "Konya’nın Bizans’ın başkenti hâline gelmesi.",
          },
          {
            tr: "Askerî-siyasi baskının yönetim merkezinin değişmesiyle bağlantılı olabilmesi.",
          },
          {
            tr: "Bütün Haçlı kuvvetlerinin Moğol ordularıyla aynı siyasi yapı olması.",
          },
          {
            tr: "Türkiye Selçuklu Devleti’nin Malazgirt’ten önce kurulması.",
          },
          {
            tr: "İznik’in kaybedilmesinin Anadolu’daki bütün Türk varlığını aynı gün bitirmesi.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Merkez değişimini baskının etkisiyle ilişkilendir; devletin bütünüyle sonuyla eşitleme.",
        },
        explanation: {
          tr: "Verilen sıra, askerî ve siyasi koşulların yönetim merkezini etkileyebildiğini gösterir. İznik’in kaybı ile Konya’nın öne çıkması aynı devletin değişen koşullarına aittir. Bu gelişme bütün varlığın aynı gün sona erdiği anlamına gelmez.",
        },
        skill: "selcuklu-yerlesme-devletlesme",
        passage: {
          tr: "I. Haçlı Seferi sürecinde İznik’in kaybından sonra Türkiye Selçuklularında Konya merkezli dönem önem kazanıyor.",
        },
      },
      {
        id: "f013-foundation-selcuklu-yerlesme-devletlesme-7",
        prompt: {
          tr: "Bu eşleştirmelerin sağladığı temel doğruluk hangisidir?",
        },
        options: [
          {
            tr: "İki savaşın da Bizans’a karşı aynı gün yapıldığının gösterilmesi.",
          },
          {
            tr: "Her iki savaşın Türkiye Selçuklularının kuruluşundan önce olduğunun gösterilmesi.",
          },
          {
            tr: "Kösedağ’ın bir Haçlı devletinin adı olarak tanınması.",
          },
          {
            tr: "Yassıçemen’in 1308’deki resmî sonla aynı olay sayılması.",
          },
          {
            tr: "Farklı rakiplerle farklı tarihlerdeki mücadelelerin ayrılması.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Savaş adıyla birlikte tarafı ve yılı da denetle.",
        },
        explanation: {
          tr: "Yassıçemen Harzemşah, Kösedağ Moğol bağlamındadır; tarihler de farklıdır. Rakipleri yalnız “dış güç” diye tek gruba indirgemek neden ve sonuçları karıştırır. Aynı savaş veya aynı siyasi gelişme olarak kullanılamazlar.",
        },
        skill: "selcuklu-yerlesme-devletlesme",
        passage: {
          tr: "Bir öğrenci 1230 Yassıçemen’i Harzemşahlarla, 1243 Kösedağ’ı Moğollarla mücadele bağlamına yerleştiriyor.",
        },
      },
      {
        id: "f013-foundation-selcuklu-yerlesme-devletlesme-8",
        prompt: {
          tr: "Bu iki tarih nasıl yorumlanmalıdır?",
        },
        options: [
          {
            tr: "1243 ile 1308 aynı yılın iki farklı yazımıdır.",
          },
          {
            tr: "Devlet 1308’e kadar sürdüğüne göre Kösedağ’ın hiçbir etkisi yoktur.",
          },
          {
            tr: "Zayıflama ve bağlılık süreciyle siyasi son aynı gün gerçekleşmek zorunda değildir.",
          },
          {
            tr: "Kösedağ bir kuruluş zaferidir.",
          },
          {
            tr: "Bütün beylikler ancak 1308’den yüz yıl sonra ortaya çıkabilir.",
          },
        ],
        answer: 2,
        hint: {
          tr: "Bir kırılmanın etkisiyle devletin son tarihini ayrı tut.",
        },
        explanation: {
          tr: "Kösedağ merkezî otoritenin zayıflaması için dönüm noktasıdır; bu, devletin aynı gün resmen son bulduğu demek değildir. 1308’in ayrı son tarih olması 1243’ün siyasi etkisini de ortadan kaldırmaz. Süreç ve son birbirini tamamlayan farklı bilgilerdir.",
        },
        skill: "selcuklu-yerlesme-devletlesme",
        passage: {
          tr: "1243 Kösedağ yenilgisi Türkiye Selçuklu merkezî gücünü sarsıyor. Devletin siyasi varlığının sonu için ise 1308 ayrı tarih olarak veriliyor.",
        },
      },
      {
        id: "f013-foundation-selcuklu-yerlesme-devletlesme-9",
        prompt: {
          tr: "Bu iki uygulama sırasıyla hangi kavramlarla ilişkilidir?",
        },
        options: [
          {
            tr: "İkta ve vakıf.",
          },
          {
            tr: "Vakıf ve atabeylik.",
          },
          {
            tr: "Medrese ve darüşşifa.",
          },
          {
            tr: "Kurultay ve muhacirlik.",
          },
          {
            tr: "Kervansaray ve gazve.",
          },
        ],
        answer: 0,
        hint: {
          tr: "Hizmet karşılığı gelir tahsisiyle sosyal hizmet için gelir ayırmayı karşılaştır.",
        },
        explanation: {
          tr: "İkta belirli kamu gelirlerinin hizmet karşılığında tahsisi, vakıf ise gelirin belirli dinî-sosyal hizmetlerin devamına ayrılması bağlamındadır. İktayı modern özel toprak mülkiyetinin her bakımdan aynısı saymak veya vakfı yalnız bina adı sanmak doğru değildir.",
        },
        skill: "selcuklu-yerlesme-devletlesme",
        passage: {
          tr: "Bir yönetim bazı kamu gelirlerini hizmet karşılığında tahsis ediyor. Başka bir düzenlemede ise gelirler eğitim ve sağlık kurumlarının sürdürülmesine ayrılıyor.",
        },
      },
      {
        id: "f013-foundation-selcuklu-yerlesme-devletlesme-10",
        prompt: {
          tr: "Hangi kart belirtilen tarih aralığının dışında kalır?",
        },
        options: [
          {
            tr: "1077 Türkiye Selçuklu kuruluşu.",
          },
          {
            tr: "1176 Miryokefalon.",
          },
          {
            tr: "1243 Kösedağ.",
          },
          {
            tr: "1277 Konya’daki Türkçe kararı.",
          },
          {
            tr: "1077 ve 1176 kartlarının ikisi.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Olayın doğru bilgi olmasıyla istenen aralığa uyması ayrı koşullardır.",
        },
        explanation: {
          tr: "1277, aralığın üst sınırı olan 1245’ten sonradır. Diğer üç tarih 1070–1245 içindedir. Bu örnekte bir kart tarihsel olarak doğru olsa da etkinliğin dönem koşuluna uymaz; önce tarih aralığı açık bir filtre olarak uygulanmalıdır.",
        },
        skill: "selcuklu-yerlesme-devletlesme",
        passage: {
          tr: "Bir kronoloji etkinliğinin aralığı 1070–1245 olarak belirlenmiştir. Kartlar 1077 kuruluş, 1176 Miryokefalon, 1243 Kösedağ ve 1277 Konya’daki Türkçe kararıdır.",
        },
      },
    ],
  },
  {
    lessonId: "birinci-dereceden-denklemler",
    topicId: "detail-203",
    subjectId: "tyt-matematik",
    lessonTitle: "Birinci dereceden denklemler: eşitliği koru, çözümü doğrula",
    questions: [
      {
        id: "f013-foundation-birinci-dereceden-denklemler-1",
        prompt: {
          tr: "x gerçek sayı olmak üzere 5−2(x−3)=3x+1 denkleminin kökü kaçtır?",
        },
        options: [
          {
            tr: "2",
          },
          {
            tr: "−2",
          },
          {
            tr: "1",
          },
          {
            tr: "3",
          },
          {
            tr: "10",
          },
        ],
        answer: 0,
        hint: {
          tr: "−2’yi parantezin iki terimine de dağıt; sonra x’li terimleri bir araya getir.",
        },
        explanation: {
          tr: "Sol taraf 5−2x+6=11−2x olur. 11−2x=3x+1 eşitliğinde iki tarafa 2x ekleyip 1 çıkarırsak 10=5x, dolayısıyla x=2 bulunur. İlk denklemde sol taraf 5−2(2−3)=7, sağ taraf 3·2+1=7’dir. Eksi işareti parantezin tamamını etkiler.",
        },
        skill: "algebra-birinci-dereceden-denklemler-1",
      },
      {
        id: "f013-foundation-birinci-dereceden-denklemler-2",
        prompt: {
          tr: "x gerçek sayı olmak üzere (2x−1)/3−(x+2)/4=2 denklemini sağlayan x kaçtır?",
        },
        options: [
          {
            tr: "2",
          },
          {
            tr: "34/5",
          },
          {
            tr: "22/5",
          },
          {
            tr: "6",
          },
          {
            tr: "10",
          },
        ],
        answer: 1,
        hint: {
          tr: "İki tarafın tamamını 12 ile çarp; ikinci payın önündeki eksiyi koru.",
        },
        explanation: {
          tr: "Ortak payda 12 ile iki taraf çarpılınca 4(2x−1)−3(x+2)=24 olur. Buradan 8x−4−3x−6=24, yani 5x=34 ve x=34/5 çıkar. Kontrol: ilk kesir 21/5, ikinci kesir 11/5 olduğundan fark 10/5=2’dir. Sağdaki 2 de 12 ile çarpılır.",
        },
        skill: "algebra-birinci-dereceden-denklemler-2",
      },
      {
        id: "f013-foundation-birinci-dereceden-denklemler-3",
        prompt: {
          tr: "x gerçek sayı, x≠2 olmak üzere (x+5)/(x−2)=4 denkleminin çözüm kümesi hangisidir?",
        },
        options: [
          {
            tr: "{2}",
          },
          {
            tr: "{3}",
          },
          {
            tr: "{13/3}",
          },
          {
            tr: "{13}",
          },
          {
            tr: "∅",
          },
        ],
        answer: 2,
        hint: {
          tr: "Başlangıçtaki x≠2 koşulunu sakla; yalnız izinli alanda x−2 ile çarp.",
        },
        explanation: {
          tr: "x≠2 iken iki tarafı x−2 ile çarpmak geçerlidir: x+5=4x−8. Böylece 3x=13 ve x=13/3 bulunur. Bu değer 2 değildir. İlk ifadede pay 28/3, payda 7/3 olduğundan oran 4’tür; yasak değer 2 hiçbir aşamada çözüme eklenmez.",
        },
        skill: "algebra-birinci-dereceden-denklemler-3",
      },
      {
        id: "f013-foundation-birinci-dereceden-denklemler-4",
        prompt: {
          tr: "x’in başlangıç alanı bütün gerçek sayılar olsun. 6(x−2)=6x−12 denkleminin çözüm kümesi hangisidir?",
        },
        options: [
          {
            tr: "∅",
          },
          {
            tr: "{0}",
          },
          {
            tr: "{2}",
          },
          {
            tr: "ℝ",
          },
          {
            tr: "{−2}",
          },
        ],
        answer: 3,
        hint: {
          tr: "Parantez açıldıktan sonra iki taraftaki x terimlerini çıkar; sabit eşitliği değerlendir.",
        },
        explanation: {
          tr: "Parantez açıldığında 6x−12=6x−12 elde edilir. İki taraftan 6x çıkarınca −12=−12, eşdeğer olarak 0x=0 kalır. Bu doğru eşitlikte x sonucu değiştirmez; başlangıç alanındaki bütün gerçekler çözümdür. Sıfıra bölerek tek kök üretilemez.",
        },
        skill: "algebra-birinci-dereceden-denklemler-4",
      },
      {
        id: "f013-foundation-birinci-dereceden-denklemler-5",
        prompt: {
          tr: "x’in başlangıç alanı bütün gerçek sayılar olsun. 4(x+1)=4x−3 denkleminin çözüm kümesi hangisidir?",
        },
        options: [
          {
            tr: "ℝ",
          },
          {
            tr: "{0}",
          },
          {
            tr: "{−3/4}",
          },
          {
            tr: "{−7}",
          },
          {
            tr: "∅",
          },
        ],
        answer: 4,
        hint: {
          tr: "Bilinmeyenli terimler yok olursa kalan sabit cümle doğru mu, yanlış mı?",
        },
        explanation: {
          tr: "Sol taraf 4x+4 olduğundan 4x+4=4x−3 yazılır. İki taraftan 4x çıkarılınca 4=−3, yani 0x=−7 kalır. Hiçbir gerçek x bu yanlış sabit eşitliği sağlayamaz. Bu nedenle çözüm kümesi boştur; −7 kalan sabittir, denklemin kökü değildir.",
        },
        skill: "algebra-birinci-dereceden-denklemler-5",
      },
      {
        id: "f013-foundation-birinci-dereceden-denklemler-6",
        prompt: {
          tr: "k gerçek bir parametre, x gerçek bir bilinmeyendir. (k+2)x=k+2 denklemi için hangi sınıflandırma doğrudur?",
        },
        options: [
          {
            tr: "k=−2 ise ÇK=ℝ; k≠−2 ise ÇK={1}.",
          },
          {
            tr: "Her k için yalnız ÇK={1}.",
          },
          {
            tr: "k=−2 ise ÇK=∅; k≠−2 ise ÇK={1}.",
          },
          {
            tr: "k=−2 ise ÇK={0}; k≠−2 ise ÇK=ℝ.",
          },
          {
            tr: "Her k için ÇK=∅.",
          },
        ],
        answer: 0,
        hint: {
          tr: "k+2’ye bölmeden önce k+2=0 olasılığını ayrı incele.",
        },
        explanation: {
          tr: "k=−2 iken denklem 0x=0 olur; her gerçek x çözümdür. k≠−2 iken k+2 sıfır değildir ve iki tarafı bu katsayıya bölünce x=1 bulunur. Tek bir bölme formülünü bütün k değerlerine uygulamak, katsayının sıfır olduğu özdeşlik durumunu kaybettirir.",
        },
        skill: "algebra-birinci-dereceden-denklemler-6",
      },
      {
        id: "f013-foundation-birinci-dereceden-denklemler-7",
        prompt: {
          tr: "k gerçek bir parametre, x gerçek bir bilinmeyendir. (k−4)x=8 denkleminin hiç çözümü olmaması için k kaç olmalıdır?",
        },
        options: [
          {
            tr: "−4",
          },
          {
            tr: "4",
          },
          {
            tr: "0",
          },
          {
            tr: "2",
          },
          {
            tr: "8",
          },
        ],
        answer: 1,
        hint: {
          tr: "Sağ taraf sıfır değil. Sol taraf hangi parametrede her x için sıfır kalır?",
        },
        explanation: {
          tr: "k=4 için sol taraf 0x olur ve 0=8 çelişkisi çıkar; hiçbir x çözüm değildir. k≠4 için k−4 sıfır değildir ve x=8/(k−4) tek gerçek çözümü verir. Dolayısıyla çözümü olmayan tek parametre 4’tür; özel durumu bölmeden önce ayırmak gerekir.",
        },
        skill: "algebra-birinci-dereceden-denklemler-7",
      },
      {
        id: "f013-foundation-birinci-dereceden-denklemler-8",
        prompt: {
          tr: "x gerçek sayı olmak üzere (x−3)/(x−3)=1 denkleminin çözüm kümesi hangisidir? Başlangıçtaki payda sıfır olamaz.",
        },
        options: [
          {
            tr: "ℝ",
          },
          {
            tr: "∅",
          },
          {
            tr: "ℝ∖{3}",
          },
          {
            tr: "{3}",
          },
          {
            tr: "{1}",
          },
        ],
        answer: 2,
        hint: {
          tr: "Sadeleştirme sonrası özdeşlik çıkması, ilk ifadenin yasak değerini geri getirmez.",
        },
        explanation: {
          tr: "İlk ifade x=3 için tanımsızdır; önce x≠3 yazılır. Bu alan içindeki her x için pay ve payda aynı sıfır olmayan sayı olduğundan bölüm 1’dir. Böylece bütün izinli gerçekler çözüm olur: ℝ∖{3}. 3’ü denkleme koyup 0/0=1 demek geçersizdir.",
        },
        skill: "algebra-birinci-dereceden-denklemler-8",
      },
      {
        id: "f013-foundation-birinci-dereceden-denklemler-9",
        prompt: {
          tr: "Bir etkinlikte yalnız yetişkin ve öğrenci bileti satılıyor. Yetişkin bileti 90 TL, öğrenci bileti 60 TL’dir. Toplam 16 bilet için 1200 TL ödendiğine göre yetişkin bileti sayısı kaçtır?",
        },
        options: [
          {
            tr: "4",
          },
          {
            tr: "6",
          },
          {
            tr: "10",
          },
          {
            tr: "8",
          },
          {
            tr: "12",
          },
        ],
        answer: 3,
        hint: {
          tr: "Yetişkin sayısı a ise öğrenci sayısı 16−a olur; her grubun ücretini ayrı yaz.",
        },
        explanation: {
          tr: "a yetişkin bileti sayısı olsun. Öğrenci sayısı 16−a olduğundan 90a+60(16−a)=1200 kurulur. 30a+960=1200, buradan a=8 bulunur. Kalan 8 bilet öğrencidir; 8·90+8·60=1200 TL ve 8+8=16 koşulları birlikte sağlanır.",
        },
        skill: "algebra-birinci-dereceden-denklemler-9",
      },
      {
        id: "f013-foundation-birinci-dereceden-denklemler-10",
        prompt: {
          tr: "Bir sayı örüntüsünün 1. terimi 4’tür. Her yeni terim bir öncekinden 5 fazladır. Değeri 89 olan terimin pozitif tam sayı sıra numarası kaçtır?",
        },
        options: [
          {
            tr: "17",
          },
          {
            tr: "19",
          },
          {
            tr: "21",
          },
          {
            tr: "85",
          },
          {
            tr: "18",
          },
        ],
        answer: 4,
        hint: {
          tr: "1. terimden n. terime geçerken n−1 kez artış yapılır.",
        },
        explanation: {
          tr: "n. terim 4+5(n−1) biçimindedir; n=1 yazınca başlangıçtaki 4 geri gelir. 4+5(n−1)=89 ise 5(n−1)=85, n−1=17 ve n=18 bulunur. Kontrol: 4+17·5=89. Artış sayısı 17’dir; terim numarası ilk terim de sayıldığı için 18’dir.",
        },
        skill: "algebra-birinci-dereceden-denklemler-10",
      },
    ],
  },
  {
    lessonId: "basit-esitsizlikler",
    topicId: "detail-204",
    subjectId: "tyt-matematik",
    lessonTitle: "Basit eşitsizlikler: yön, sınır ve çözüm aralığı",
    questions: [
      {
        id: "f013-foundation-basit-esitsizlikler-1",
        prompt: {
          tr: "x gerçek sayı olmak üzere −4x+7≤19 eşitsizliğinin çözüm kümesi hangisidir?",
        },
        options: [
          {
            tr: "[−3,∞)",
          },
          {
            tr: "(−∞,−3]",
          },
          {
            tr: "(−3,∞)",
          },
          {
            tr: "(−∞,3]",
          },
          {
            tr: "[3,∞)",
          },
        ],
        answer: 0,
        hint: {
          tr: "Önce 7 çıkar; sonra negatif −4’e bölerken eşitsizlik yönünü ters çevir.",
        },
        explanation: {
          tr: "İki taraftan 7 çıkarınca −4x≤12 olur. Negatif −4’e bölme yönü değiştirdiğinden x≥−3, yani [−3,∞) elde edilir. Uç x=−3 için eşitlik sağlanır; x=0 içeridedir, x=−4 ise 23≤19 yanlış olduğu için dışarıda kalır.",
        },
        skill: "algebra-basit-esitsizlikler-1",
      },
      {
        id: "f013-foundation-basit-esitsizlikler-2",
        prompt: {
          tr: "−5<2−3x≤11 bileşik eşitsizliğini sağlayan kaç farklı tam sayı x vardır?",
        },
        options: [
          {
            tr: "4",
          },
          {
            tr: "6",
          },
          {
            tr: "5",
          },
          {
            tr: "7",
          },
          {
            tr: "8",
          },
        ],
        answer: 1,
        hint: {
          tr: "İki sınırı birlikte çöz; negatif −3’e bölünce iki yönü de değiştir ve uçları yeniden sırala.",
        },
        explanation: {
          tr: "Üç taraftan 2 çıkarınca −7<−3x≤9 olur. −3’e bölünce 7/3>x≥−3, küçükten büyüğe −3≤x<7/3 yazılır. Tam sayılar −3,−2,−1,0,1,2 olmak üzere altıdır. Sol −3 dahildir; sağdaki 7/3 açık uçtur ve 3 aralıkta değildir.",
        },
        skill: "algebra-basit-esitsizlikler-2",
      },
      {
        id: "f013-foundation-basit-esitsizlikler-3",
        prompt: {
          tr: "x gerçek sayı için x>−2 ve x≤5 koşulları birlikte sağlanıyor. Çözüm kümesinin aralık gösterimi hangisidir?",
        },
        options: [
          {
            tr: "[−2,5]",
          },
          {
            tr: "(−2,5)",
          },
          {
            tr: "(−2,5]",
          },
          {
            tr: "[−2,5)",
          },
          {
            tr: "ℝ",
          },
        ],
        answer: 2,
        hint: {
          tr: "“Ve” iki koşulun kesişimidir; −2 ile 5 uçlarını ayrı denetle.",
        },
        explanation: {
          tr: "İlk koşul −2’nin sağını, ikinci koşul 5’i de içeren sol tarafı seçer. İkisinin ortak bölgesi −2<x≤5, yani (−2,5] olur. −2 ilk koşulu sağlamaz ve dışlanır; 5 her iki koşulu da sağladığından dahil edilir. Birleşim almak fazladan değerler üretir.",
        },
        skill: "algebra-basit-esitsizlikler-3",
      },
      {
        id: "f013-foundation-basit-esitsizlikler-4",
        prompt: {
          tr: "x gerçek sayı için x<−3 veya x≥2 koşulunu sağlayan çözüm kümesi hangisidir? “Veya”, koşullardan en az birinin sağlanması anlamındadır.",
        },
        options: [
          {
            tr: "[−3,2)",
          },
          {
            tr: "(−3,2]",
          },
          {
            tr: "(−∞,−3]∪(2,∞)",
          },
          {
            tr: "(−∞,−3)∪[2,∞)",
          },
          {
            tr: "∅",
          },
        ],
        answer: 3,
        hint: {
          tr: "“Veya” için iki ayrı bölgeyi birleştir; arada kalan değerler şartlardan hiçbirini sağlamayabilir.",
        },
        explanation: {
          tr: "x<−3 koşulu (−∞,−3), x≥2 koşulu [2,∞) verir. En az biri yeterli olduğu için çözüm bu aralıkların birleşimidir. −3 dışarıda, 2 içeridedir. Örneğin 0 hiçbir koşulu sağlamaz; iki sınır arasını almak bu nedenle yanlış olur.",
        },
        skill: "algebra-basit-esitsizlikler-4",
      },
      {
        id: "f013-foundation-basit-esitsizlikler-5",
        prompt: {
          tr: "a=0 ve x gerçek sayı olsun. ax−1<2 ile ax−1≥2 eşitsizliklerinin çözüm kümeleri sırasıyla hangisidir?",
        },
        options: [
          {
            tr: "∅ ve ℝ",
          },
          {
            tr: "ℝ ve ℝ",
          },
          {
            tr: "∅ ve ∅",
          },
          {
            tr: "{3} ve {3}",
          },
          {
            tr: "ℝ ve ∅",
          },
        ],
        answer: 4,
        hint: {
          tr: "a yerine 0 koy; x kaybolduğunda kalan iki sabit karşılaştırmanın doğruluğuna bak.",
        },
        explanation: {
          tr: "a=0 için ilk eşitsizlik −1<2 olur ve her gerçek x için doğrudur; çözümü ℝ’dir. İkincisi −1≥2 biçimine dönüşür ve hiçbir x için doğru değildir; çözümü ∅’dir. Sıfır katsayıya bölünemez; x içermeyen doğru/yanlış cümle ayrı değerlendirilir.",
        },
        skill: "algebra-basit-esitsizlikler-5",
      },
      {
        id: "f013-foundation-basit-esitsizlikler-6",
        prompt: {
          tr: "a<0 olan gerçek bir parametre ve gerçek bilinmeyen x için ax+4<10 eşitsizliğinin çözümü hangisidir?",
        },
        options: [
          {
            tr: "x>6/a",
          },
          {
            tr: "x<6/a",
          },
          {
            tr: "x≥6/a",
          },
          {
            tr: "x=6/a",
          },
          {
            tr: "Her gerçek x",
          },
        ],
        answer: 0,
        hint: {
          tr: "Önce 4 çıkar; a’nın negatif olması bölme yönünü belirler ve a=0 olasılığını zaten dışlar.",
        },
        explanation: {
          tr: "ax+4<10 ifadesinden ax<6 elde edilir. a<0 verildiği için a sıfır değildir; negatif a’ya bölünce yön ters döner ve x>6/a olur. Sınır x=6/a için sol taraf 10’a eşit olur, sıkı < koşulunu sağlamaz. Eşitliği dahil etmek çözüm kümesini değiştirir.",
        },
        skill: "algebra-basit-esitsizlikler-6",
      },
      {
        id: "f013-foundation-basit-esitsizlikler-7",
        prompt: {
          tr: "Bir atölyenin tek seferlik sabit ücreti 45 TL, seçilen her etkinliğin ücreti 22 TL’dir. Toplam bütçe 200 TL’yi aşmayacak. Etkinlik sayısı negatif olmayan tam sayı olduğuna göre en çok kaç etkinlik seçilebilir?",
        },
        options: [
          {
            tr: "5",
          },
          {
            tr: "7",
          },
          {
            tr: "6",
          },
          {
            tr: "8",
          },
          {
            tr: "9",
          },
        ],
        answer: 1,
        hint: {
          tr: "45+22n≤200 kur; gerçek sayı sınırını bulduktan sonra uygun en büyük tam sayıyı seç.",
        },
        explanation: {
          tr: "Bütçeyi aşmama koşulu 45+22n≤200’dür. 22n≤155 ve n≤155/22≈7,045 bulunur. n negatif olmayan tam sayı olduğundan en büyük değer 7’dir. Kontrol: 7 etkinlik 199 TL, 8 etkinlik 221 TL tutar; ilk değer bütçeye uyar, komşusu sınırı aşar.",
        },
        skill: "algebra-basit-esitsizlikler-7",
      },
      {
        id: "f013-foundation-basit-esitsizlikler-8",
        prompt: {
          tr: "Tam sayı x için x>−7/2 ve x≤5/2 koşulları birlikte sağlanıyor. x’in alabileceği en küçük değer kaçtır?",
        },
        options: [
          {
            tr: "−4",
          },
          {
            tr: "−7/2",
          },
          {
            tr: "−3",
          },
          {
            tr: "−2",
          },
          {
            tr: "2",
          },
        ],
        answer: 2,
        hint: {
          tr: "Alt sınır −3,5’tir; sıradan yuvarlamak yerine sıkı eşitsizliği sağlayan ilk tam sayıyı bul.",
        },
        explanation: {
          tr: "Koşullar −3,5<x≤2,5 aralığını verir. Alt sınıra en yakın izinli tam sayı −3’tür; −4, −3,5’ten küçük olduğu için ilk koşulu sağlamaz. −3 üst sınırı da sağlar. −7/2 hem tam sayı değildir hem sıkı alt sınır olduğundan çözüme alınamaz.",
        },
        skill: "algebra-basit-esitsizlikler-8",
      },
      {
        id: "f013-foundation-basit-esitsizlikler-9",
        prompt: {
          tr: "0<a<b<4 olan gerçek sayılar için aşağıdaki sıralamalardan hangisi her zaman doğrudur?",
        },
        options: [
          {
            tr: "1/a<1/b<1/4",
          },
          {
            tr: "1/a>1/b ve 1/b<1/4",
          },
          {
            tr: "1/a<1/b ve 1/b>1/4",
          },
          {
            tr: "1/a>1/b>1/4",
          },
          {
            tr: "1/a=1/b>1/4",
          },
        ],
        answer: 3,
        hint: {
          tr: "Bütün sayılar pozitiftir ve paydalar sıfır değildir; aynı pozitif aralıkta ters alma sırayı değiştirir.",
        },
        explanation: {
          tr: "0<a<b<4 koşulunda her sayının tersi tanımlıdır. Pozitif sayılarda küçük sayının tersi daha büyüktür; a<b için 1/a>1/b, b<4 için 1/b>1/4 olur. Birleştirince 1/a>1/b>1/4 elde edilir. Sıfırı içeren veya zıt işaretli durumlara bu kural koşulsuz taşınamaz.",
        },
        skill: "algebra-basit-esitsizlikler-9",
      },
      {
        id: "f013-foundation-basit-esitsizlikler-10",
        prompt: {
          tr: "−5<a<−2 olan gerçek sayı a için a²’nin alabileceği değerlerin aralığı hangisidir?",
        },
        options: [
          {
            tr: "(−25,−4)",
          },
          {
            tr: "(−5,−2)",
          },
          {
            tr: "[4,25]",
          },
          {
            tr: "(0,25)",
          },
          {
            tr: "(4,25)",
          },
        ],
        answer: 4,
        hint: {
          tr: "Aralık bütünüyle negatiftir. Önce 2<|a|<5 ilişkisini kur; sonra pozitif büyüklüklerin karesini al.",
        },
        explanation: {
          tr: "−5<a<−2 için a negatiftir ve 2<|a|<5 olur. Pozitif sayılarda kare alma sırayı korur; 4<a²<25 bulunur. Her iki başlangıç ucu da dışlandığından 4 ve 25 dahil değildir. Negatif aralıkta doğrudan aynı sırayla kare almak yön hatası üretir.",
        },
        skill: "algebra-basit-esitsizlikler-10",
      },
    ],
  },
  {
    lessonId: "katman-elektron-dizilimi",
    topicId: "detail-147",
    subjectId: "tyt-kimya",
    lessonTitle: "Katman elektron dizilimi: say, dağıt ve kontrol et",
    questions: [
      {
        id: "f013-foundation-katman-elektron-dizilimi-1",
        prompt: {
          tr: "Atom numarası 12 olan Mg²⁺ iyonunun temel hâl elektron sayısı, katman dağılımı ve proton sayısı sırasıyla hangisidir?",
        },
        options: [
          {
            tr: "10 elektron; 2,8; 12 proton",
          },
          {
            tr: "14 elektron; 2,8,4; 12 proton",
          },
          {
            tr: "10 elektron; 2,8; 10 proton",
          },
          {
            tr: "12 elektron; 2,8,2; 12 proton",
          },
          {
            tr: "12 elektron; 2,8,2; 10 proton",
          },
        ],
        answer: 0,
        hint: {
          tr: "İyonun +2 yükünü e=Z−q bağıntısına işaretiyle koy.",
        },
        explanation: {
          tr: "Mg²⁺ iki elektron vermiştir: e=12−(+2)=10 ve temel hâl katman dağılımı 2,8 olur. Çekirdekteki 12 proton kimyasal iyonlaşmayla değişmez. On elektron görmek atom numarasının 10 olduğu anlamına gelmez; yük bilgisi korunmalıdır.",
        },
        skill: "foundation-shells-1",
      },
      {
        id: "f013-foundation-katman-elektron-dizilimi-2",
        prompt: {
          tr: "Atom numarası 17 olan klor bir elektron alıp Cl⁻ oluyor. Bu iyon için doğru elektron sayısı ve temel hâl katman dağılımı hangisidir?",
        },
        options: [
          {
            tr: "16 elektron; 2,8,6",
          },
          {
            tr: "18 elektron; 2,8,8",
          },
          {
            tr: "17 elektron; 2,8,7",
          },
          {
            tr: "18 elektron; 2,8,7,1",
          },
          {
            tr: "16 elektron; 2,8,8",
          },
        ],
        answer: 1,
        hint: {
          tr: "Negatif iyon elektron almıştır; işaretli yük q=−1 olur.",
        },
        explanation: {
          tr: "e=17−(−1)=18 bulunur; seçili basit iyonun temel hâl dağılımı 2,8,8’dir. Elektron alımı proton sayısını veya element kimliğini değiştirmez. 2,8,7,1 dağılımının toplamı 18 olsa da verilen temel hâl koşulunu sağlamaz; toplam tek başına yeterli değildir.",
        },
        skill: "foundation-shells-2",
      },
      {
        id: "f013-foundation-katman-elektron-dizilimi-3",
        prompt: {
          tr: "X²⁺ iyonunun temel hâl katman dağılımı 2,8,8 olarak veriliyor. X nötr atomunun temel hâl dağılımı ve elementin periyodu hangisidir?",
        },
        options: [
          {
            tr: "2,8,8; 3. periyot",
          },
          {
            tr: "2,8,6; 3. periyot",
          },
          {
            tr: "2,8,8,2; 4. periyot",
          },
          {
            tr: "2,8,10; 3. periyot",
          },
          {
            tr: "2,8,8,1; 4. periyot",
          },
        ],
        answer: 2,
        hint: {
          tr: "Önce iyonun elektronlarını topla; sonra pozitif yükü ekleyip Z’yi bul.",
        },
        explanation: {
          tr: "İyonun elektron sayısı 18, yükü +2 olduğundan Z=e+q=18+2=20 olur. Nötr Ca atomunun temel hâl dağılımı 2,8,8,2 ve periyodu 4’tür. İyonun üç dolu katmanı elementin periyodunu 3’e indirmez.",
        },
        skill: "foundation-shells-3",
      },
      {
        id: "f013-foundation-katman-elektron-dizilimi-4",
        prompt: {
          tr: "Z=19 olan nötr potasyum atomunun temel hâl dağılımı için 2,8,9 öneriliyor. Toplamın 19 olması bu öneriyi doğrular mı?",
        },
        options: [
          {
            tr: "Evet; doğru toplam her zaman temel hâli kanıtlar.",
          },
          {
            tr: "Evet; M katmanı dolmadan N katmanında elektron bulunamaz.",
          },
          {
            tr: "Hayır; potasyum nötrken yalnız 18 elektron taşır.",
          },
          {
            tr: "Hayır; temel hâl dağılımı 2,8,8,1’dir.",
          },
          {
            tr: "Hayır; 19 elektron hiçbir katmana dağıtılamaz.",
          },
        ],
        answer: 3,
        hint: {
          tr: "Katmanın kuramsal kapasitesi ile temel hâl yerleşme sırasını ayrı denetle.",
        },
        explanation: {
          tr: "2+8+9 toplamı 19’dur ama toplam denetimi temel hâl koşulunu tek başına sağlamaz. İlk 20 nötr atom kapsamında potasyum 2,8,8,1 biçimindedir. M katmanının kuramsal kapasitesinin 18 olması, potasyumda önce bu katmanın tamamen dolmasını gerektirmez.",
        },
        skill: "foundation-shells-4",
      },
      {
        id: "f013-foundation-katman-elektron-dizilimi-5",
        prompt: {
          tr: "Bir katmanın kuramsal kapasitesi 2n² ile veriliyor. n=3 katmanının kapasitesi ile Z=20 nötr Ca atomunun temel hâlinde bu katmanda bulunan elektron sayısı sırasıyla nedir?",
        },
        options: [
          {
            tr: "8 kapasite; 18 elektron",
          },
          {
            tr: "18 kapasite; 18 elektron",
          },
          {
            tr: "8 kapasite; 8 elektron",
          },
          {
            tr: "32 kapasite; 2 elektron",
          },
          {
            tr: "18 kapasite; 8 elektron",
          },
        ],
        answer: 4,
        hint: {
          tr: "Önce n=3 için kapasiteyi hesapla; sonra Ca’nın 2,8,8,2 dağılımını kullan.",
        },
        explanation: {
          tr: "Kapasite 2×3²=18 elektrondur. Nötr temel hâl Ca dağılımı 2,8,8,2 olduğundan üçüncü katmanda 8 elektron bulunur. En çok sığabilecek sayı ile belirli bir atomun temel hâlinde gerçekten bulunan sayı farklıdır.",
        },
        skill: "foundation-shells-5",
      },
      {
        id: "f013-foundation-katman-elektron-dizilimi-6",
        prompt: {
          tr: "Z=2 olan nötr He atomunun temel hâl katman dağılımı 2’dir. Periyot ve IUPAC 1–18 grup numarası hangi seçenekte doğru verilmiştir?",
        },
        options: [
          {
            tr: "1. periyot; 18. grup",
          },
          {
            tr: "1. periyot; 2. grup",
          },
          {
            tr: "2. periyot; 18. grup",
          },
          {
            tr: "2. periyot; 2. grup",
          },
          {
            tr: "1. periyot; 1. grup",
          },
        ],
        answer: 0,
        hint: {
          tr: "Helyum, son katmanda iki elektron kuralının grup eşleştirmesinde özel durumdur.",
        },
        explanation: {
          tr: "He’nin dolu tek katmanı vardır; bu yüzden 1. periyottadır. İlk katmanı iki elektronla tam dolduğu için soy gazlar arasında 18. grupta yer alır. Dış katmanda iki elektron var diye He’yi 2. gruba yerleştirmek ana grup eşleştirmesinin istisnasını atlar.",
        },
        skill: "foundation-shells-6",
      },
      {
        id: "f013-foundation-katman-elektron-dizilimi-7",
        prompt: {
          tr: "Ne nötr atomu için Z=10, Na⁺ için Z=11, Mg²⁺ için Z=12 veriliyor. Bu üç tanecik için hangi açıklama doğrudur?",
        },
        options: [
          {
            tr: "Üçü aynı elementtir; çünkü elektron sayıları eşittir.",
          },
          {
            tr: "Üçü de 10 elektron taşıyabilir; proton sayıları ve element kimlikleri farklıdır.",
          },
          {
            tr: "Mg²⁺ oluşurken proton sayısı 10’a düşmüştür.",
          },
          {
            tr: "Na⁺ oluşurken çekirdeğe bir proton eklenmiştir.",
          },
          {
            tr: "Ne nötr olduğu için elektron taşımaz.",
          },
        ],
        answer: 1,
        hint: {
          tr: "Her birinde e=Z−q hesapla; elektron eşitliğini proton eşitliği sayma.",
        },
        explanation: {
          tr: "Ne için e=10; Na⁺ için e=11−1=10; Mg²⁺ için e=12−2=10 bulunur. Katman dağılımları 2,8 olan bu türler izoelektroniktir. Proton sayıları 10,11,12 olarak farklı kaldığından aynı elemente dönüşmüş sayılmazlar.",
        },
        skill: "foundation-shells-7",
      },
      {
        id: "f013-foundation-katman-elektron-dizilimi-8",
        prompt: {
          tr: "Nötr bir atomun uyarılmış hâli için katman dağılımı 2,7,1,1 olarak veriliyor. Atom numarası ve elementin nötr temel hâlden belirlenen periyodu hangisidir?",
        },
        options: [
          {
            tr: "Z=11; 4. periyot",
          },
          {
            tr: "Z=10; 3. periyot",
          },
          {
            tr: "Z=11; 3. periyot",
          },
          {
            tr: "Z=12; 4. periyot",
          },
          {
            tr: "Z=18; 3. periyot",
          },
        ],
        answer: 2,
        hint: {
          tr: "Uyarılmada toplam elektron değişmez; periyodu uyarılmış hâlin katman sayısından okuma.",
        },
        explanation: {
          tr: "Dağılım toplamı 2+7+1+1=11 elektrondur. Atom nötr olduğundan Z=11, yani Na’dır; nötr temel hâli 2,8,1 ve periyodu 3’tür. Uyarılmış bir elektronun daha yüksek katmanda bulunması elementi periyodik tabloda başka satıra taşımaz.",
        },
        skill: "foundation-shells-8",
      },
      {
        id: "f013-foundation-katman-elektron-dizilimi-9",
        prompt: {
          tr: "X⁻ iyonunun temel hâl katman dağılımı 2,8,8. X’in nötr atomu için temel hâl dağılımı ve IUPAC grup numarası hangisidir?",
        },
        options: [
          {
            tr: "2,8,8; 18. grup",
          },
          {
            tr: "2,8,8,1; 1. grup",
          },
          {
            tr: "2,8,6; 16. grup",
          },
          {
            tr: "2,8,7; 17. grup",
          },
          {
            tr: "2,8,7; 7. grup",
          },
        ],
        answer: 3,
        hint: {
          tr: "İyonda 18 elektron var; −1 yükten nötr atomun Z değerini geri bul.",
        },
        explanation: {
          tr: "Z=e+q=18+(−1)=17 olur. Nötr Cl’nin temel hâli 2,8,7’dir; yedi değerlik elektronu IUPAC 17. gruba karşılık gelir. İyonun sekiz dış elektronu nötr elementin grup adresini değiştirmez; 7A ile 17 sayımları da karıştırılmamalıdır.",
        },
        skill: "foundation-shells-9",
      },
      {
        id: "f013-foundation-katman-elektron-dizilimi-10",
        prompt: {
          tr: "Modern atom yaklaşımıyla kullanılan basitleştirilmiş katman çizimleri hakkında hangi ifade uygundur?",
        },
        options: [
          {
            tr: "Her elektron her anda çizilmiş çemberin tam üzerinde bulunmak zorundadır.",
          },
          {
            tr: "Bir katman çizimi elektronun kesin konumunu ve hızını birlikte verir.",
          },
          {
            tr: "Elektronun enerji alması elementin proton sayısını zorunlu değiştirir.",
          },
          {
            tr: "Aynı elektron sayılı her iyon aynı elementtir.",
          },
          {
            tr: "Çizilen çember ve noktalar sayımı kolaylaştırır; elektronların kesin dairesel yollarını göstermez.",
          },
        ],
        answer: 4,
        hint: {
          tr: "Modelin sayım işlevi ile modern atomdaki konum betimlemesini ayır.",
        },
        explanation: {
          tr: "Katman çizimleri enerji düzeyi ve elektron sayısını basitleştirir; gerçek, kesin dairesel yörüngelerin fotoğrafı değildir. Modern betimlemede orbitaller olasılık dağılımlarıyla kullanılır. Uyarılma ve iyonlaşma da proton sayısını değiştiren bir nükleer dönüşümle eşitlenmez.",
        },
        skill: "foundation-shells-10",
      },
    ],
  },
];

export const foundation013QuestionsByLesson: Record<string, Question[]> =
  Object.fromEntries(
    foundation013QuestionSets.map((pack) => [pack.lessonId, pack.questions]),
  );

// Exact application titles captured from the accepted 0.12 source. This pure
// payload can also be read by browser tests without importing the app's JSON graph.
const earlierFoundationTitles: Record<string, string> = {
  karbohidratlar: "Karbohidratlar: birim, bağ ve görev",
  lipitler: "Lipitler: depo, zar ve düzenleyici yapı",
  vitaminler: "Vitaminler: çözünürlük, düzenleme ve sınırlar",
};
export const allFoundationPracticeSets: FoundationPracticeSet[] = [
  ...foundationQuestionSets.map((pack) => ({
    ...pack,
    lessonTitle: earlierFoundationTitles[pack.lessonId],
  })),
  ...foundation013QuestionSets,
];
