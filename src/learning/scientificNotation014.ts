import { txt, type Question } from "../domain/model";
import type { QuestionGuidance } from "../domain/questionHelpModel";
import type { GuideSection, WorkedExample } from "./guides/types";

export const scientificNotationSections: GuideSection[] = [
  {
    title: "Birbirini izleyen büyütmeleri çarp",
    paragraphs: [
      "Büyütme katsayısı, sonraki uzunluğun önceki uzunluğa oranıdır. Bir görüntü önce 5 katına, sonra oluşan görüntü 25 katına çıkarılırsa toplam oran 5·25=125 olur. İki katsayının birimi yoktur. Bu yüzden 3,2×10⁻³ mm genişliğindeki bir çizgi 125 ile çarpıldığında sonuç 0,4 mm olur.",
      "Aşama aşama kontrol et. 0,0032 mm ilk çarpımdan sonra 0,016 mm, ikinci çarpımdan sonra 0,4 mm olur. 5+25 toplarsan 30 kat bulur ve ikinci büyütmeyi ilk görüntüye uygulamamış olursun. Şemadaki kutular işlem sırasını gösterir. Fiziksel uzunluğu kutunun içindeki değerden oku.",
    ],
  },
  {
    title: "Bir çözüm yolunu seçmeden önce koşulunu ara",
    paragraphs: [
      "Olağan sayıyı kısaltmak için ilk sıfır olmayan rakamı bul. Katsayı aralık dışındaysa virgülü taşıdığın kadar üssü ters yönde değiştir. Çarpım ve bölümde katsayıları ayrı işle. Bölenin üssü negatifse 5−(−3)=8 gibi parantezle yaz. Toplama ve çıkarmada sayıları önce aynı 10 kuvvetiyle ifade et. Bir birim dönüşümü gerekiyorsa niceliğin birimini her adımda yaz.",
      "Yalnız pozitif ve standart biçimde olan iki sayıda büyük üs tek başına daha büyük sayıyı gösterir. 0,004×10⁷=4×10⁴ iken 7×10⁵ daha büyüktür. İlk ifadenin 7 üssünü doğrudan karşılaştırmak yanıltır. İki negatif sayıda önce büyüklükleri karşılaştır ve sıralamayı ters çevir. ‘En az 10⁶’ ifadesinde 10⁶ sınırı dahildir. ‘En çok 10⁻³’ ifadesinde 10⁻³ sınırı dahildir.",
    ],
    table: {
      headers: ["Yöntem", "Geçerli yol", "Sık hata", "Başka bir örnek"],
      rows: [
        ["Olağan sayıdan gösterime", "0,00068 = 6,8×10⁻⁴", "Üssü pozitif yazmak 68.000 verir.", "0,00068 m = 0,68 mm"],
        ["Katsayıyı normalleştir", "0,54×10⁶ = 5,4×10⁵", "Katsayı büyürken üs aynı kalırsa sayı 10 kat büyür.", "54 milyon = 5,4×10⁷"],
        ["Çarpma ve bölme", "(9×10⁴) ÷ (3×10⁻³) = 3×10⁷", "Üsleri toplamak 3×10¹ verir.", "Her biri 4×10² g olan 6×10³ kutunun toplam kütlesi 2,4×10³ kg’dır."],
        ["Aynı ölçekle topla", "4,8×10⁸ + 3×10⁷ = 5,1×10⁸", "İkinci terimi 3×10⁸ saymak onu 10 kat büyütür.", "480 milyon + 30 milyon = 510 milyon"],
        ["İşareti ve katsayıyı kontrol et", "2,3×10⁶ > 8,7×10⁵", "Standart dışı 0,002×10⁶ için büyük üs kuralı geçmez.", "−2.300.000 < −870.000"],
        ["Birimi dönüştür", "6,4×10⁶ mm = 6,4×10³ m", "Alanı uzunluk çarpanıyla dönüştürmek yanlıştır.", "6,4×10⁶ mm² = 6,4 m²"],
      ],
    },
  },
  {
    title: "İlk bozulan eşitliği bulup yeniden dene",
    paragraphs: [
      "Bir sonuç beklediğinden çok farklıysa ilk adımı denetle. 2,6×10⁵+9×10⁴ için (2,6+9)×10⁹ yazmak iki farklı ölçeği aynı sayar ve çarpım kuralını toplama işlemine taşır. İlk doğru dönüşüm 9×10⁴=0,9×10⁵’tir. (2,6+0,9)×10⁵=3,5×10⁵ sonucu, 260.000+90.000=350.000 işlemiyle doğrulanır.",
      "Aynı onarımı yeni sayılarla uygula. 7,3×10⁵+2×10⁴ ifadesini çözmeden önce ikinci terimin ortak ölçekte kaç yüz binlik olduğunu tahmin et. 2×10⁴=0,2×10⁵ olduğu için toplam 7,5×10⁵’tir. Hatalı sonucun işlem türünden, sıralamadan ya da birimden kaynaklandığını bulursan bir sonraki denemede hangi adımı kontrol edeceğini bilirsin.",
    ],
  },
];

export const scientificNotationExamples: WorkedExample[] = [
  {
    title: "Önce farkı, sonra bölümü hesapla",
    prompt: "(3,6×10⁶ − 8,5×10⁵) ÷ (5×10²) işlemini standart bilimsel gösterimle yaz.",
    strategy: "Parantezde ortak ölçek kur. Bölümden sonra katsayı aralığını denetle.",
    steps: [
      { label: "Ölçeği eşitle", explanation: "İkinci terimi milyon ölçeğine getir.", expression: "8,5×10⁵ = 0,85×10⁶" },
      { label: "Farkı bul", explanation: "Aynı ölçeğin katsayılarını çıkar.", expression: "(3,6 − 0,85)×10⁶ = 2,75×10⁶" },
      { label: "Böl", explanation: "Katsayıları böl ve üsleri çıkar.", expression: "(2,75 ÷ 5)×10⁶⁻² = 0,55×10⁴" },
      { label: "Normalleştir", explanation: "Katsayı 1’den küçük. Katsayıyı 10 ile çarparken üssü 1 azalt.", expression: "0,55×10⁴ = 5,5×10³" },
    ],
    answer: "5,5×10³",
    check: "3.600.000 − 850.000 = 2.750.000. Bu farkın 500’e bölümü 5.500’dür.",
    pitfall: "Bölüm kuralını parantez içindeki iki terimin üslerine uygulamak.",
  },
  {
    title: "İki boşluğu aynı üs tamamlar",
    prompt: "0,0062×10⁸ ifadesinde önce 0,0062=6,2×10ⁿ, sonra 6,2×10ⁿ×10⁸ yaz. İki yerdeki n kaçtır?",
    strategy: "Önce 0,0062’yi tek başına ele al. 10⁸ çarpanı onun üssü değildir.",
    steps: [
      { label: "Katsayıyı bul", explanation: "İlk sıfır olmayan rakam 6’dır. Virgülü üç basamak sağa taşıyınca 6,2 olur." },
      { label: "Geri çarp", explanation: "6,2’yi başlangıç değerine döndürmek için binde biriyle çarp.", expression: "n=−3" },
      { label: "Çarpanları birleştir", explanation: "Aynı tabanın çarpımında iki üssü topla.", expression: "6,2×10⁻³×10⁸ = 6,2×10⁵" },
    ],
    answer: "İki yerde de n=−3. Sonuç 6,2×10⁵’tir.",
    check: "0,0062×100.000.000=620.000.",
    pitfall: "İlk boşluğa −3, ikinci boşluğa toplam üs 5 yazmak.",
  },
  {
    title: "Hedef ölçeğe kaç basamak kaldığını bul",
    prompt: "10⁻³ ölçeğini 10⁻²¹ seviyesine indirmek için 10⁻ᵏ ile çarpılacak. Pozitif k kaç olmalı?",
    strategy: "Önce başlangıç üssüyle hedef üs arasındaki farkı bul.",
    steps: [
      { label: "Çarpımı yaz", explanation: "10⁻³ ile 10⁻ᵏ çarpılınca üsler toplanır.", expression: "−3 + (−k) = −21" },
      { label: "Gereken çarpanı bul", explanation: "Hedef üsten başlangıç üssünü çıkar.", expression: "−21 − (−3) = −18" },
      { label: "Sembolü denetle", explanation: "Aranan değer k’dir. Çarpanın üssü ise −k’dir.", expression: "−k=−18, k=18" },
    ],
    answer: "k=18. Uygulanacak çarpan 10⁻¹⁸’dir.",
    check: "−3−18=−21. Hedef 10⁻²⁰ olsaydı 17 basamak gerekirdi.",
    pitfall: "Hedef 21 basamak küçük diye başlangıç değerinin zaten 3 basamak küçük olduğunu unutmak.",
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

function practice({ key, prompt, options, answer, hint, guidance }: PracticeInput): Question {
  return {
    id: `bilimsel-gosterim-katsayi-014-${key}`,
    prompt: txt(prompt),
    options: options.map(txt),
    answer,
    hint: txt(hint),
    explanation: txt(`${guidance.steps.join(" ")} ${guidance.check}`),
    skill: "Bilimsel Gösterim ve Katsayı",
    guidance,
  };
}

export const scientificNotationPractice = [
  practice({
    key: "bolum",
    prompt: "(6,4×10⁵) ÷ (2×10⁻³) işleminin standart bilimsel gösterimi nedir?",
    options: ["3,2×10²", "3,2×10⁻⁸", "3,2×10⁸", "12,8×10⁸", "32×10⁷"],
    answer: 2,
    hint: "Bölenin üssünü çıkar: 5−(−3).",
    guidance: {
      knowledge: ["Bölmede 10’un üsleri çıkarılır. Negatif sayıyı çıkarmak, ters işaretlisini eklemektir."],
      strategy: "Katsayı bölümünü ve üs farkını ayrı hesapla.",
      steps: ["6,4÷2=3,2.", "5−(−3)=8.", "Sonuç 3,2×10⁸. Katsayı 1 ile 10 arasındadır."],
      optionReasons: ["5+(−3)=2 çarpım için kullanılır.", "Üs farkının işareti ters çevrilmiş.", "Katsayı bölümü 3,2 ve üs farkı 8.", "Katsayılar bölünmesi gerekirken çarpılmış.", "Sayı eşit olsa da 32 standart katsayı olamaz."],
      commonError: "Bölenin üssündeki eksiyi gözden kaçırmak.",
      check: "Bölen 0,002’dir. Pozitif bir sayıyı 1’den küçük bir sayıya bölmek sonucu büyütür.",
    },
  }),
  practice({
    key: "sirala",
    prompt: "A=5×10⁻⁷, B=8×10⁻⁸ ve C=1,6×10⁻⁶ sayılarını küçükten büyüğe sırala.",
    options: ["B < A < C", "C < A < B", "A < B < C", "B < C < A", "C < B < A"],
    answer: 0,
    hint: "Üç sayıyı 10⁻⁷ ölçeğinde yaz.",
    guidance: {
      knowledge: ["Aynı pozitif çarpanı taşıyan ifadelerde katsayıların sırası sayıların sırasını verir."],
      strategy: "Üç sayıyı karşılaştırılabilir tek bir ölçekte ifade et.",
      steps: ["B=0,8×10⁻⁷ ve C=16×10⁻⁷.", "Bu ölçekte B, A ve C sırasıyla 0,8, 5 ve 16’dır.", "Küçükten büyüğe B < A < C."],
      optionReasons: ["0,8 < 5 < 16 sırasını korur.", "Doğru sıralamayı tersine çevirir.", "B’nin ortak katsayısı 0,8, A’nınki 5’tir.", "C’nin ortak katsayısı 16, A’nınki 5’tir.", "En büyük olan C, ilk sıraya alınmış."],
      commonError: "−8, −7 ve −6’daki büyüklüğü eksi işaretini unutarak karşılaştırmak.",
      check: "Pozitif üç sayı standart yazılmıştır. Üsler de −8 < −7 < −6 sırasındadır.",
    },
  }),
  practice({
    key: "sinir",
    prompt: "Bir arşivde 5×10⁴ klasör var. Her klasör 2×10⁵ bayt kaplıyor. Arşivin toplam boyutunun standart bilimsel gösterimi nedir?",
    options: ["7×10⁹ bayt", "1×10⁹ bayt", "1×10²¹ bayt", "10×10⁹ bayt", "1×10¹⁰ bayt"],
    answer: 4,
    hint: "Çarpımdan sonra katsayının tam 10 olduğuna dikkat et.",
    guidance: {
      knowledge: ["Toplam bayt sayısı, klasör sayısı ile klasör başına bayt sayısının çarpımıdır. Standart katsayı 10’a eşit olamaz."],
      strategy: "Önce çarpımı bul, ardından ara katsayıyı normalleştir.",
      steps: ["5·2=10 ve 4+5=9, bu yüzden toplam 10×10⁹ bayttır.", "10=1×10 ile bir 10 çarpanını üsse aktar.", "Standart sonuç 1×10¹⁰ bayttır."],
      optionReasons: ["Katsayıları çarpmak yerine toplamış.", "Katsayı küçülürken üs artırılmamış.", "4+5 yerine 4·5 alınmış. Bu hatadan sonra 10×10²⁰ ifadesi 1×10²¹ yapılmış.", "Ara sonuç sayıca aynı; katsayı 10 olduğu için istenen biçimde değil.", "10 katsayısı 1’e inerken üs 9’dan 10’a çıkar."],
      commonError: "Standart katsayı aralığına 10’u dahil etmek.",
      check: "50.000·200.000=10.000.000.000 bayt.",
    },
  }),
  practice({
    key: "birim",
    prompt: "540.000 mm ve 2,8×10⁴ mm uzunluğundaki iki kablo uç uca bağlanıyor. 1 m=10³ mm olduğuna göre toplam uzunluk kaç metredir?",
    options: ["568.000 m", "568 m", "56,8 m", "820 m", "512 m"],
    answer: 1,
    hint: "Önce toplama için ortak ölçeğe getir, sonra milimetreyi metreye dönüştür.",
    guidance: {
      knowledge: ["Aynı niceliği daha büyük birimle yazınca sayı küçülür. 1.000 mm, 1 m’dir."],
      strategy: "Toplamı milimetre olarak bul. Son adımda 1.000’e böl.",
      steps: ["540.000 mm=5,4×10⁵ mm, ikinci kablo 0,28×10⁵ mm.", "Toplam (5,4+0,28)×10⁵=5,68×10⁵ mm.", "5,68×10⁵ ÷ 10³ = 5,68×10² m = 568 m."],
      optionReasons: ["Milimetre sonucu metre diye yazılmış.", "Toplam 568.000 mm, yani 568 m.", "1.000 yerine 10.000’e bölünmüş.", "İkinci kablo 28 m iken 280 m alınmış.", "İkinci kablo toplam yerine farkta kullanılmış."],
      commonError: "Sayıları toplarken ölçeği, cevabı yazarken birimi unutmak.",
      check: "Kablolar ayrı ayrı 540 m ve 28 m’dir. Toplam 568 m olmalıdır.",
    },
  }),
  practice({
    key: "iki-carpan",
    prompt: "4,8×10⁻³ mm uzunluğundaki bir görüntü önce 5 katına, sonra oluşan görüntü 20 katına çıkarılıyor. Son görüntünün uzunluğu kaç mm olur?",
    options: ["0,12 mm", "0,024 mm", "0,048 mm", "0,48 mm", "4,8 mm"],
    answer: 3,
    hint: "İkinci çarpan, ilk aşamanın sonucuna uygulanır.",
    guidance: {
      knowledge: ["Art arda uygulanan oranlar çarpılır. Büyütme katsayıları birimsizdir."],
      strategy: "5 ve 20’yi çarpıp başlangıç uzunluğuna uygula.",
      steps: ["Toplam oran 5·20=100’dür.", "100=10² olduğu için başlangıç üssüne 2 ekle.", "4,8×10⁻¹ mm=0,48 mm."],
      optionReasons: ["5 ve 20 toplanarak 25 kat alınmış.", "İlk aşama hesaplanmış, ikinci aşama eksik.", "Toplam oran 100 yerine 10 alınmış.", "İlk uzunluk 100 ile çarpılırsa 0,48 mm olur.", "Toplam oran 100 yerine 1.000 alınmış."],
      commonError: "İki büyütmenin başlangıçtan ölçüldüğünü varsayıp katsayıları toplamak.",
      check: "0,0048·5=0,024 mm ve 0,024·20=0,48 mm.",
    },
  }),
  practice({
    key: "onarim",
    prompt: "Deniz, 2×10⁵+4×10⁴ için (2+4)×10⁹ yazıyor. Hangi seçenek Deniz’in ilk adımını düzeltir ve hem onun toplamını hem de 3×10⁵+7×10⁴ toplamını doğru verir?",
    options: [
      "Üsleri topla. Sonuçlar 6×10⁹ ve 1×10¹⁰.",
      "Katsayıları doğrudan topla. Sonuçlar 6×10⁵ ve 1×10⁶.",
      "4×10⁴ = 0,4×10⁵ yaz. Sonuçlar 2,4×10⁵ ve 3,7×10⁴.",
      "4×10⁴ = 0,04×10⁵ yaz. Sonuçlar 2,04×10⁵ ve 3,07×10⁵.",
      "4×10⁴ = 0,4×10⁵ yaz. Sonuçlar 2,4×10⁵ ve 3,7×10⁵.",
    ],
    answer: 4,
    hint: "Toplamanın ilk adımı iki terimi aynı 10 kuvvetine getirmektir.",
    guidance: {
      knowledge: ["Üsleri toplama kuralı aynı tabanlı kuvvetler çarpıldığında geçerlidir."],
      strategy: "İlk yanlış adım farklı ölçekleri birleştiriyor. Her toplamda ikinci terimi 10⁵ ölçeğine getir.",
      steps: ["4×10⁴=0,4×10⁵. Deniz’in toplamı (2+0,4)×10⁵=2,4×10⁵.", "7×10⁴=0,7×10⁵.", "Yeni toplam (3+0,7)×10⁵=3,7×10⁵."],
      optionReasons: ["Her iki toplamda da üsler çarpım kuralıyla toplanmış.", "Her iki hesapta küçük terim, büyük ölçekle yazılmış gibi sayılmış.", "Deniz’in toplamı doğru. Yeni toplamın ölçeği 10⁵ kalmalıydı.", "Her iki hesapta katsayı bir basamak fazla küçülmüş.", "İki ortak ölçek doğru. Katsayılar sırasıyla 2+0,4 ve 3+0,7."],
      commonError: "Üsler farklı olduğunda katsayıları hemen toplamak.",
      check: "200.000+40.000=240.000 ve 300.000+70.000=370.000.",
    },
  }),
  practice({
    key: "alt-sinir",
    prompt: "Bir ölçüm aracının kabul ettiği değerler en az 10⁻⁴ ve en çok 10⁻² metredir. Alt sınırda bulunan kabul edilebilir ölçüm hangisidir?",
    options: ["9×10⁻⁵ m", "1×10⁻⁴ m", "1×10⁻³ m", "1×10⁻² m", "1×10⁻¹ m"],
    answer: 1,
    hint: "‘En az’ ifadesi tam sınırdaki sayıyı da kapsar.",
    guidance: {
      knowledge: ["‘En az’ alt sınırı dahil eder. ‘En çok’ üst sınırı dahil eder."],
      strategy: "Önce hangi sınırın istendiğini belirle, sonra eşit olan değeri seç.",
      steps: ["Kabul aralığı 10⁻⁴ ≤ uzunluk ≤ 10⁻² metredir.", "Alt sınır 10⁻⁴=1×10⁻⁴ m ve dahildir."],
      optionReasons: ["0,00009 m alt sınırdan küçük.", "0,0001 m tam alt sınırdır.", "0,001 m aralıkta ama alt sınırda değil.", "0,01 m dahil olan üst sınırdır.", "0,1 m üst sınırı aşar."],
      commonError: "‘En az’ ifadesini ‘daha büyük’ diye okuyup eşitliği dışarıda bırakmak.",
      check: "Olağan yazımla aralık 0,0001 m ile 0,01 m arasındadır ve iki uç da dahildir.",
    },
  }),
];
