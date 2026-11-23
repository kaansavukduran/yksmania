import type { LessonGuide, WorkedExample } from "./guides/types";

export const statisticsSource037Supplement: LessonGuide["sections"] = [
  {
    title: "Bilinmeyen frekansı toplam denklemine yaz",
    paragraphs: [
      "2 değeri üç kez, 5 değeri x kez, 8 değeri bir kez görülüyor ve ortalama 4. Toplam 14+5x, adet 4+x. 14+5x=4(4+x) ⇒ x=2. x bir frekans olduğu için negatif veya kesirli olamaz.",
      "Sıralı liste 2,2,2,5,5,8. Ortanca (2+5)/2=3,5, mod 2, açıklık 8−2=6. Toplamı 24, adedi 6 olarak geri koy. Ortalama 24/6=4 olur.",
    ],
  },
  {
    title: "Ham ölçümleri eş genişlikli sınıflara ayır",
    paragraphs: [
      "Okul kuralında genişlik, açıklık/sınıf sayısını kesin aşan en küçük tam sayı. 2,3,3,5,6,7,8,8,10,11 verisinin açıklığı 9. Üç sınıf için 9/3=3 ve genişlik 4. En küçük gözlem 2 olduğundan [2,6), [6,10), [10,14) sınıflarını kullan.",
      "Frekanslar sırayla 4,4,2. 6 yalnız ikinci sınıfa girer, sınıfların sol ucu dahil ve sağ ucu dışarıdadır. Sütunlar bitişik ve eş genişliktedir. Bu kurulumda yükseklik adet. Alanlar da adetle aynı oranda değişir.",
      "En az 6 olan 6/10 gözlem tablodan kesin çıkar. Eşik 7 olursa ikinci sınıfın hangi gözlemlerinin 7 ve üstü olduğu, yalnız aralık frekanslarından belirlenemez. Aynı sınıf içindeki değerleri orta noktaya yığarak bulunan ortalama ancak yaklaşık olur.",
    ],
  },
  {
    title: "Verinin biçimine göre grafik ve karşılaştırma seç",
    paragraphs: [
      "Süre veya uzunluk ölçümdür. Yuvarlanmış süre kayıtları asıl süreyi kesikli yapmaz. Bir haftanın sıcaklık değişimi için çizgi, farklı kulüplerin adetleri için sütun, aynı bütçenin payları için daire, sayısal ölçüm aralıkları için histogram kullan.",
      "Eş aralıklı dört anda A=2,4,6,8, B=5,5,5,5, C=1,1,9,9 ölçülsün. Ortalamaları 5, açıklıkları 6,0,8. Ortak zaman ölçeğinde A sürekli aynı artışla ilerler, B sabittir, C bir kez 8 birim artar. Aynı ortalama, aynı dağılım veya zaman davranışı anlamına gelmez.",
      "100’den 101’e artış 1, 2’den 6’ya artış 4. Yüksek son değer ile daha büyük değişimi birbirine karıştırma. Daire grafiğinde pay 6/24 ise açı 90° ve bütün dilimler aynı toplamı paylaşıyorsa toplam 360°.",
    ],
  },
];

export const statisticsSource037Examples: WorkedExample[] = [
  {
    title: "Bilinmeyen tekrar adedini bul ve sıralamayı kontrol et",
    prompt:
      "1 değeri üç kez, 4 değeri x kez ve 7 değeri bir kez gözleniyor. Ortalama 3. Frekans x ile ortanca nedir?",
    strategy: "Ortalama ifadesinde toplam değeri ve gözlem adedini ayrı yaz.",
    steps: [
      {
        label: "Toplam",
        expression: "1·3+4x+7=10+4x",
        explanation: "Her değerin toplam katkısı, değeri çarpı frekansı.",
      },
      {
        label: "Adet ve denklem",
        expression: "10+4x=3(4+x) ⇒ x=2",
        explanation: "Adet 3+x+1. Bulunan frekans sıfırdan büyük tam sayı.",
      },
      {
        label: "Orta sıralar",
        expression: "(1+4)/2=2,5",
        explanation: "1,1,1,4,4,7 sırasındaki üçüncü ve dördüncü değer alınır.",
      },
    ],
    answer: "x=2, ortanca 2,5.",
    check: "Toplam 18 ve adet 6. 18/6=3.",
    pitfall: "Üç farklı değer var diye toplamı 3’e bölmek.",
  },
  {
    title: "Sınıf sınırı ve tam sayı genişliğiyle histogram kur",
    prompt:
      "4,5,7,7,9,10,12,13 ölçümlerini üç eş sınıfa ayır. Açıklık/sınıf sayısını kesin aşan en küçük tam sayı genişliği kullan. Sınıflar ve frekanslar nedir?",
    strategy: "Açıklığı bul, genişliği seç, her değeri bir kez yaz.",
    steps: [
      {
        label: "Genişlik",
        expression: "(13−4)/3=3 ⇒ genişlik 4",
        explanation: "3 tam olarak bölünse de genişlik kesin büyük olmalı.",
      },
      {
        label: "Sınırlar",
        expression: "[4,8), [8,12), [12,16)",
        explanation:
          "İç sınır bir sonraki sınıfa girer. Son üst sınır 16 dahil değildir.",
      },
      {
        label: "Sayım",
        expression: "4, 2, 2",
        explanation:
          "İlk sınıfta 4,5,7,7, ikinci sınıfta 9,10, üçüncüde 12,13 var.",
      },
    ],
    answer: "Genişlik 4, frekanslar 4, 2, 2.",
    check: "Toplam 8 ölçüm. Örneğin 12 yalnız üçüncü sınıfta.",
    pitfall:
      "8 veya 12 gibi bir sınır değerini iki komşu sınıfta birden saymak.",
  },
];

export const statisticsSource037Recall = [
  {
    prompt: "Genişlik için bölüm tam 3 çıkarsa ne yapılır?",
    answer:
      "Kesin büyük en küçük tam sayı 4’tür. Bu, derste belirtilen eş genişlikli okul yöntemi.",
  },
  {
    prompt: "Aynı aralık frekansıyla farklı iki ortalama mümkün mü?",
    answer:
      "Evet. [5,10) aralığındaki dört değer 5,5,5,5 veya 9,9,9,9 olabilir. Ortalamalar 5 ve 9.",
  },
];

export const statisticsSource037QuickText = new Map<string, string[]>([
  [
    "Bilinmeyen frekansı toplam denklemine yaz",
    [
      "Σ(değer×frekans)=ortalama×Σfrekans. Bilinmeyen frekans sıfır veya pozitif tam sayı olmalı. Bulunca listeyi sıralayıp ortanca, mod ve açıklığı yeniden hesapla.",
    ],
  ],
  [
    "Ham ölçümleri eş genişlikli sınıflara ayır",
    [
      "MEB eş sınıf örneğinde genişlik > açıklık/sınıf sayısı, bu koşulu sağlayan en küçük tam sayı. [a,b) sol ucu alır, sağ ucu almaz. Frekansların toplamı gözlem adedi. Sınıf içindeki eşikle kesin oran bulmak için ham veriye dön.",
    ],
  ],
  [
    "Verinin biçimine göre grafik ve karşılaştırma seç",
    [
      "Zaman için çizgi, ayrı kategoriler için sütun, aynı bütünün payları için daire, nicel aralık için histogram. Ortak ölçek kullan. Seviye, artış ve toplam yayılım farklı ölçülür.",
    ],
  ],
]);
